# Implementación de Geolocalización en GYMPAS MT

> **Sistema de geolocalización para socios**: Geocoding automático con ajuste manual mediante mapa interactivo

---

## 📍 Resumen Ejecutivo

GYMPAS MT implementa un sistema de geolocalización completo que permite:
- **Geocoding automático** cuando el usuario completa la dirección
- **Ajuste manual** mediante marcador arrastrable en mapa interactivo
- **Visualización** de la ubicación de cada socio en el mapa
- **Almacenamiento** de coordenadas para futuros análisis de proximidad

---

## 🗺️ Librería Utilizada: Leaflet

### ¿Por qué Leaflet?

**Leaflet** es una librería JavaScript open-source para mapas interactivos.

#### Ventajas sobre alternativas:
| Aspecto | Leaflet | Google Maps | Mapbox |
|---------|---------|-------------|--------|
| **Costo** | ✅ Gratuito | ❌ $200/mes+ | ⚠️ Limitado |
| **Open Source** | ✅ Sí | ❌ No | ⚠️ Parcial |
| **Dependencias** | ✅ Ninguna externa | ❌ API Key | ❌ Token |
| **Peso** | ✅ ~39KB | ❌ ~200KB+ | ❌ ~150KB+ |
| **Privacidad** | ✅ Total | ⚠️ Google Analytics | ⚠️ Tracking |
| **Personalización** | ✅ Total | ⚠️ Limitada | ✅ Buena |

**Decisión**: Leaflet + OpenStreetMap por ser gratuito, sin dependencias externas y totalmente personalizable.

---

## 📦 Stack de Geolocalización

### Frontend (React)
```json
{
  "leaflet": "1.9.4",
  "react-leaflet": "4.2.1",
  "leaflet.markercluster": "1.5.3"
}
```

### Backend (Python)
- **Servicio de Geocoding**: Nominatim (OpenStreetMap)
- **Librería HTTP**: `requests` 2.31.0
- **Sin dependencias adicionales** (no se usa `geopy` - implementación custom)

### Tiles Map Provider
- **OpenStreetMap**: Mapas gratuitos sin API key
- URL: `https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`

---

## 🏗️ Arquitectura de la Solución

```
┌─────────────────────────────────────────────────────────┐
│                    FRONTEND (React)                     │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  ┌──────────────────────────────────────────────────┐  │
│  │  MemberFormPage (Formulario de Socio)            │  │
│  │  - Campos de dirección (calle, número, ciudad)   │  │
│  │  - Watch de campos con debounce (800ms)          │  │
│  │  - Trigger geocoding automático                  │  │
│  └──────────────┬───────────────────────────────────┘  │
│                 │                                        │
│                 ↓                                        │
│  ┌──────────────────────────────────────────────────┐  │
│  │  geocode.ts (Servicio)                           │  │
│  │  - buildGeocodingQuery() → String                │  │
│  │  - geocodeAddress(address) → {lat, lon}          │  │
│  └──────────────┬───────────────────────────────────┘  │
│                 │                                        │
│                 │ POST /api/v1/geocode/                 │
│                 ↓                                        │
└─────────────────────────────────────────────────────────┘
                  │
                  │ HTTP Request
                  ↓
┌─────────────────────────────────────────────────────────┐
│                    BACKEND (Django)                     │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  ┌──────────────────────────────────────────────────┐  │
│  │  /api/v1/geocode/ (Endpoint Proxy)               │  │
│  │  - Recibe: { "address": "Calle 123, Buenos Aires"}│ │
│  │  - Valida address                                 │  │
│  │  - Añade User-Agent (requerido por Nominatim)    │  │
│  └──────────────┬───────────────────────────────────┘  │
│                 │                                        │
│                 │ GET con User-Agent                     │
│                 ↓                                        │
│  ┌──────────────────────────────────────────────────┐  │
│  │  Nominatim API (OpenStreetMap)                   │  │
│  │  https://nominatim.openstreetmap.org/search      │  │
│  │  - q: address                                     │  │
│  │  - format: json                                   │  │
│  │  - limit: 1                                       │  │
│  └──────────────┬───────────────────────────────────┘  │
│                 │                                        │
│                 │ Response                               │
│                 ↓                                        │
│  ┌──────────────────────────────────────────────────┐  │
│  │  Parse y retorna:                                 │  │
│  │  { "lat": -34.603, "lon": -58.381,               │  │
│  │    "display_name": "..." }                        │  │
│  └──────────────────────────────────────────────────┘  │
│                                                          │
└─────────────────────────────────────────────────────────┘
                  │
                  │ Response JSON
                  ↓
┌─────────────────────────────────────────────────────────┐
│                    FRONTEND (React)                     │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  ┌──────────────────────────────────────────────────┐  │
│  │  AddressMap Component (Leaflet)                  │  │
│  │  - Muestra mapa con marcador en (lat, lon)       │  │
│  │  - Marcador DRAGGABLE para ajuste manual         │  │
│  │  - onDragEnd → actualiza coords                  │  │
│  │  - Tiles: OpenStreetMap gratuitos                │  │
│  └──────────────────────────────────────────────────┘  │
│                                                          │
└─────────────────────────────────────────────────────────┘
                  │
                  │ onSubmit (save member)
                  ↓
┌─────────────────────────────────────────────────────────┐
│                  DATABASE (PostgreSQL)                  │
├─────────────────────────────────────────────────────────┤
│  Member Table:                                          │
│  - latitude: FLOAT (ej: -34.603722)                    │
│  - longitude: FLOAT (ej: -58.381592)                   │
│  - street, city, state, postal_code, country           │
└─────────────────────────────────────────────────────────┘
```

---

## 💾 Almacenamiento de Coordenadas

### Modelo de Datos (Backend)

```python
# apps/members/models.py

class Member(TenantScopedModel):
    # ... otros campos ...
    
    # Address (desglosada para geolocalización)
    street = models.CharField(max_length=100, blank=True)
    street_number = models.CharField(max_length=10, blank=True)
    floor = models.CharField(max_length=10, blank=True)
    apartment = models.CharField(max_length=10, blank=True)
    neighborhood = models.CharField(max_length=100, blank=True)
    city = models.CharField(max_length=100, blank=True)
    state = models.CharField(max_length=100, blank=True)
    postal_code = models.CharField(max_length=20, blank=True)
    country = models.CharField(max_length=50, default='Argentina')
    
    # Geolocation (calculated from address or manually adjusted)
    latitude = models.FloatField(null=True, blank=True)
    longitude = models.FloatField(null=True, blank=True)
```

### Tipo de Datos
- **Tipo**: `FloatField` (Python `float` / PostgreSQL `DOUBLE PRECISION`)
- **Precisión**: 6-8 decimales (suficiente para ~1 metro de precisión)
- **Nullable**: Sí (puede no tener ubicación)
- **Ejemplo**: 
  - `latitude`: `-34.603722`
  - `longitude`: `-58.381592`

### Alternativas consideradas:
| Opción | Pros | Contras | Decisión |
|--------|------|---------|----------|
| **FloatField** ✅ | Simple, soportado universalmente | Menos preciso que Decimal | **Elegido** (precisión suficiente) |
| DecimalField | Máxima precisión | Más pesado en storage | Overkill para este caso |
| PostGIS PointField | Queries geoespaciales nativos | Requiere extensión PostGIS | No necesario por ahora |

---

## 🔄 Flujo de Geocoding

### 1. Geocoding Automático (Happy Path)

```typescript
// Frontend: MemberFormPage.tsx

// Watch address fields
const watchStreet = watch('street')
const watchStreetNumber = watch('street_number')
const watchCity = watch('city')
const watchState = watch('state')

useEffect(() => {
  // Debounce 800ms
  const timeoutId = setTimeout(async () => {
    // Validar que tengamos mínimo calle + ciudad
    if (!watchStreet || !watchCity) return
    
    // Construir query
    const query = buildGeocodingQuery({
      street: watchStreet,
      streetNumber: watchStreetNumber,
      city: watchCity,
      state: watchState,
      country: 'Argentina',
    })
    
    // Mínimo 10 caracteres
    if (query.length < 10) return
    
    setIsGeocoding(true)
    try {
      const result = await geocodeAddress(query)
      if (result) {
        setLatitude(result.lat)
        setLongitude(result.lon)
      }
    } catch (err) {
      console.error('Geocoding failed:', err)
    } finally {
      setIsGeocoding(false)
    }
  }, 800)
  
  return () => clearTimeout(timeoutId)
}, [watchStreet, watchStreetNumber, watchCity, watchState])
```

**Desglose del flujo**:
1. Usuario escribe en campos de dirección
2. Debounce de 800ms (evita llamadas excesivas)
3. Se construye string: `"Av. Corrientes 1234, Buenos Aires, Argentina"`
4. Se envía a `/api/v1/geocode/`
5. Backend consulta Nominatim
6. Se reciben coordenadas
7. Se actualizan estados `latitude` y `longitude`
8. El mapa se actualiza automáticamente (reactive)

### 2. Ajuste Manual (Override)

```typescript
// Frontend: AddressMap.tsx

const handlePositionChange = (lat: number, lng: number) => {
  if (!readOnly && onPositionChange) {
    onPositionChange(lat, lng)
  }
}

// Marker draggable
<Marker 
  position={[latitude, longitude]}
  draggable={!readOnly}
  eventHandlers={{
    dragend: (e) => {
      const pos = e.target.getLatLng()
      handlePositionChange(pos.lat, pos.lng)
    }
  }}
/>
```

**Flujo**:
1. Usuario arrastra el marcador azul
2. Evento `dragend` captura nueva posición
3. Se actualizan estados `latitude` y `longitude`
4. Al guardar, se envían las coordenadas ajustadas manualmente

---

## 🎨 Componente `AddressMap`

### Características

```tsx
<AddressMap
  latitude={latitude}
  longitude={longitude}
  onPositionChange={handleMapPositionChange}
  address={addressString}
  readOnly={false}
  isGeocoding={isGeocoding}
  height="240px"
/>
```

**Props**:
- `latitude`, `longitude`: Coordenadas actuales
- `onPositionChange`: Callback cuando el usuario arrastra el marcador
- `address`: String para mostrar en popup
- `readOnly`: Si es `true`, el marcador no es arrastrable
- `isGeocoding`: Muestra overlay de "Buscando ubicación..."
- `height`: Altura del mapa

**Funcionalidades**:
- ✅ Mapa interactivo con zoom y pan
- ✅ Marcador arrastrable
- ✅ Popup con dirección y coordenadas
- ✅ Loader mientras geocodifica
- ✅ Helper text: "Arrastrá el marcador para ajustar"
- ✅ Centro por defecto: Buenos Aires (-34.603, -58.381)
- ✅ Zoom automático cuando hay coordenadas válidas

---

## 🔧 Backend: Proxy de Geocoding

### Endpoint

```python
# apps/core/views.py

@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def geocode(request):
    """
    Geocode an address using Nominatim (OpenStreetMap).
    
    This is a proxy endpoint to avoid CORS issues and to comply with
    Nominatim's usage policy (requires User-Agent identification).
    """
    address = request.data.get('address')
    
    if not address:
        return Response(
            {'error': 'Address is required'},
            status=400
        )
    
    url = "https://nominatim.openstreetmap.org/search"
    params = {
        "q": address,
        "format": "json",
        "limit": 1,
    }
    headers = {
        "User-Agent": "gympas-saas/1.0 (https://gympas.com)"
    }
    
    try:
        response = requests.get(url, params=params, headers=headers, timeout=10)
        response.raise_for_status()
        data = response.json()
        
        if data and len(data) > 0:
            result = data[0]
            return Response({
                'lat': float(result.get('lat')),
                'lon': float(result.get('lon')),
                'display_name': result.get('display_name', ''),
            })
        else:
            return Response(
                {'error': 'No results found for the given address'},
                status=404
            )
            
    except requests.exceptions.Timeout:
        return Response(
            {'error': 'Geocoding service timeout'},
            status=504
        )
    except requests.exceptions.RequestException as e:
        return Response(
            {'error': 'Geocoding service unavailable'},
            status=503
        )
```

### ¿Por qué un Proxy?

**Razones**:
1. **CORS**: Nominatim requiere que las requests vengan del mismo dominio o con CORS habilitado
2. **User-Agent**: Nominatim requiere identificación del User-Agent (política de uso justo)
3. **Rate Limiting**: Podemos implementar cache o rate limiting en el backend
4. **Seguridad**: No exponemos API keys en el frontend
5. **Logging**: Podemos loguear todas las requests de geocoding

---

## 🛠️ Construcción de Query de Geocoding

```typescript
// lib/geocode.ts

export function buildGeocodingQuery(parts: {
  street?: string
  streetNumber?: string
  city?: string
  state?: string
  country?: string
}): string {
  const { street, streetNumber, city, state, country = 'Argentina' } = parts
  
  const addressParts: string[] = []
  
  if (street && streetNumber) {
    addressParts.push(`${street} ${streetNumber}`)
  } else if (street) {
    addressParts.push(street)
  }
  
  if (city) {
    addressParts.push(city)
  }
  
  if (state) {
    addressParts.push(state)
  }
  
  if (country) {
    addressParts.push(country)
  }
  
  return addressParts.join(', ')
}
```

**Ejemplos de queries generadas**:
```
"Av. Corrientes 1234, Buenos Aires, CABA, Argentina"
"San Martin 567, Córdoba, Argentina"
"Belgrano 890, Rosario, Santa Fe, Argentina"
```

---

## 🎯 Casos de Uso

### 1. Crear Socio con Dirección Completa
1. Usuario completa: Calle, Número, Ciudad
2. Después de 800ms sin escribir → Geocoding automático
3. Mapa muestra marcador en ubicación encontrada
4. Usuario puede ajustar arrastrando el marcador
5. Al guardar, se almacenan `latitude` y `longitude`

### 2. Crear Socio sin Dirección Completa
1. Usuario solo completa Calle (sin número o ciudad)
2. No se triggearea geocoding (query muy corto)
3. Mapa muestra centro por defecto (Buenos Aires)
4. Se guarda sin coordenadas (`latitude=null`, `longitude=null`)

### 3. Editar Socio con Coordenadas Existentes
1. Al cargar formulario, se setean `latitude` y `longitude`
2. Mapa muestra marcador en ubicación existente
3. Usuario puede actualizar dirección → Re-geocoding automático
4. O ajustar manualmente arrastrando marcador

### 4. Visualizar Ubicación (Read-Only)
1. En vista de detalle de socio
2. `AddressMap` con `readOnly={true}`
3. Marcador no arrastrable
4. Solo visualización

---

## 🚀 Mejoras Futuras

### Features Posibles

1. **Clustering de Socios**
   - Ya tenemos `leaflet.markercluster` instalado
   - Mapa con todos los socios del gimnasio
   - Clusters visuales por zona

2. **Análisis de Proximidad**
   - Calcular distancia socio → gimnasio
   - Filtrar socios por radio (ej: 5km)
   - Rutas óptimas para distribución de materiales

3. **Heatmap de Densidad**
   - Zonas con mayor concentración de socios
   - Planificación de nuevas sucursales

4. **Geocoding Reverse**
   - Click en mapa → obtener dirección
   - Autocompletar campos de dirección

5. **Cache de Geocoding**
   - Redis cache de addresses ya geocodificadas
   - Reducir llamadas a Nominatim

6. **Migración a PostGIS** (si escala)
   - Queries geoespaciales nativas: `ST_Distance`, `ST_DWithin`
   - Índices espaciales para búsquedas rápidas

---

## 📊 Métricas y Limitaciones

### Performance Actual
- **Debounce**: 800ms (óptimo para UX)
- **Timeout**: 10 segundos (Nominatim puede ser lento)
- **Precisión**: ~1 metro (suficiente para direcciones urbanas)

### Limitaciones de Nominatim
- **Rate Limit**: 1 request/segundo (política de uso justo)
- **No garantía de uptime**: Servicio gratuito sin SLA
- **Cobertura**: Mejor en ciudades grandes, variable en zonas rurales

### Mitigaciones
- ✅ Debounce evita requests excesivas
- ✅ Timeout maneja casos lentos
- ✅ Marcador draggable permite corrección manual
- ✅ Coordenadas opcionales (no bloquea el guardado)

---

## 🔐 Privacidad y Seguridad

### Datos Enviados a Nominatim
- **Solo la dirección**: No se envían datos personales
- **No tracking**: OpenStreetMap no hace tracking de usuarios
- **User-Agent genérico**: "gympas-saas/1.0"

### Almacenamiento
- **Coordenadas en DB**: Asociadas al socio (scoped por tenant)
- **No se comparten**: Cada tenant ve solo sus socios
- **GDPR compliant**: Coordenadas son datos personales (incluidos en exportaciones/eliminaciones)

---

## 📝 Código Relevante

### Archivos Clave

**Frontend**:
- `src/components/ui/AddressMap.tsx` - Componente Leaflet del mapa
- `src/lib/geocode.ts` - Servicio de geocoding
- `src/features/members/pages/MemberFormPage.tsx` - Formulario con geocoding automático

**Backend**:
- `apps/core/views.py` - Endpoint `/api/v1/geocode/`
- `apps/members/models.py` - Campos `latitude` y `longitude`
- `apps/core/urls/geocode.py` - Ruta del endpoint

---

## 🎓 Recursos

### Documentación
- **Leaflet**: https://leafletjs.com/
- **React-Leaflet**: https://react-leaflet.js.org/
- **Nominatim**: https://nominatim.org/release-docs/latest/
- **OpenStreetMap**: https://www.openstreetmap.org/

### Alternativas Evaluadas
- ❌ **Google Maps**: $200+/mes, vendor lock-in
- ❌ **Mapbox**: Limitado en plan gratuito
- ❌ **Here Maps**: Requiere cuenta enterprise
- ✅ **Leaflet + OSM**: Ganador por costo $0 y flexibilidad

---

**Implementación**: Completada y en producción  
**Mantenedor**: GYMPAS MT Team  
**Última actualización**: Enero 2026
