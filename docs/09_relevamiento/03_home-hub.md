# 03 — Ficha de relevamiento — Home (Hub)

!!! info "Metadatos"
    **Fecha:** AAAA-MM-DD  
    **Reunión / Taller:** Relevamiento Territorio — Home (Hub)  
    **Participantes:** {Territorio: ___} · {UX: ___} · {Producto: ___} · {Tech: ___}  
    **Versión:** v0.1  
    **Owner:** Producto (SISOC) + UX  

## 1) Objetivo del módulo
Brindar una pantalla inicial **simple y usable** que permita al referente/usuario del espacio:
- confirmar “dónde está parado” (espacio seleccionado + estado),
- acceder rápido a los módulos del MVP,
- ver alertas mínimas (pendientes) sin tener que navegar.

## 2) Usuarios y contexto de uso
- Roles: Referente del espacio, Usuario interno del espacio, (opcional) Usuario de organización con selector.
- Contexto: uso en teléfono, tiempo corto, conectividad irregular.
- Prioridad UX: botones grandes, textos claros, bajo esfuerzo cognitivo.

## 3) Contenido a mostrar (campos)

### 3.1 Datos visibles (arriba del todo)
| Campo | Fuente (SISOC) | Sensible (Sí/No) | Obligatorio | Observaciones |
|------|-----------------|------------------|-------------|---------------|
| Nombre del espacio | Space.nombre | No | Sí | Mostrar siempre |
| Nombre del usuario (saludo) | User.nombre | No | Sí | “Hola, {Nombre}” |
| Rol/Tipo (referente / usuario interno / organización) | RBAC/claims | No | Sí | Puede ser discreto |
| Selector de espacio (si multi-espacio) | Relación user↔spaces | No | Condicional | Si tiene >1 |

### 3.2 Accesos directos (cards / tiles)
| Item | Fuente | Sensible | Obligatorio | Observaciones |
|------|--------|----------|-------------|---------------|
| Información institucional | N/A | No | Sí | Acceso a ficha/docs/contacto |
| Nóminas | N/A | No | Sí | Gestión personas |
| Prestación alimentaria | N/A | Depende | Sí | Solo lectura en MVP (a confirmar) |
| Formación | N/A | No | Sí | Actividades/participantes |
| Rendiciones | N/A | No | Sí | Estados + adjuntos |
| Mensajes | N/A | No | Sí | Comunicaciones oficiales |

### 3.3 Contadores/Badges (pendientes a validar)
| Badge | Definición | Fuente (SISOC) | Se muestra cuándo | Observaciones |
|------|------------|----------------|-------------------|---------------|
| Mensajes sin leer | cantidad no leídos | mensajes + read_state | si > 0 | opcional MVP |
| Rendiciones observadas | cantidad “observada” | rendiciones.estado | si > 0 | opcional MVP |
| Rendición pendiente de presentar | existe borrador / falta adjuntos | rendiciones + reglas | si aplica | opcional MVP |
| Prestación observada/suspendida | estado actual | prestación.estado | si != “vigente” | opcional MVP |

## 4) Acciones del usuario (CTA)
- CTA principal: entrar a un módulo (tap en card).
- CTAs secundarios:
  - abrir selector de espacio (si aplica),
  - ver “información del espacio” (si se muestra bloque abajo),
  - abrir menú (perfil/salir).
- Acciones fuera de alcance (MVP):
  - edición institucional desde el espacio,
  - analítica/dashboards avanzados.

## 5) Reglas de negocio
- RBAC: el Home muestra solo módulos habilitados para el rol.
- Si el usuario es “organización”:
  - si tiene 1 espacio → entra directo,
  - si tiene >1 espacio → debe seleccionar espacio antes de operar.
- Contadores:
  - definir si son “best effort” (no bloquean) para evitar complejidad.

## 6) Flujos y navegación
- Entrada:
  - Login exitoso → (si multi-espacio) Selector → Home.
- Salidas:
  - Home → cada módulo.
- “Volver”:
  - desde un módulo vuelve a Home (o al nivel anterior del módulo).

## 7) Estados de pantalla
- Cargando: skeleton para cards + header.
- Vacío (raro): si no hay módulos habilitados → “No tenés accesos asignados. Contactá al programa.”
- Error:
  - 401 → volver a login
  - 403 → “No tenés permisos”
  - red/offline → “No pudimos conectarnos. Reintentá.”
- Offline:
  - Home puede mostrar layout, pero contadores y datos del espacio quedan en “—”.

## 8) Notificaciones (si aplica)
- In-app badge para:
  - nuevo mensaje,
  - rendición observada,
  - cambio de estado de prestación (si se muestra).
- Push: solo si se habilita más adelante (Release 2) o si innovación lo aprueba.

## 9) Auditoría mínima (eventos)
- `home_view`
- `module_open` (module_id)
- `space_switch` (space_id) — si aplica
- `logout` — si existe

## 10) Fuera de alcance explícito (Release 2)
- Dashboard con métricas (asistencia, actividad, gasto, etc.)
- Personalización por espacio (logo/portada)
- Centro de ayuda avanzado / tickets (si se decide)

## 11) Decisiones y pendientes (TBD)
- ¿Se muestra “Información del espacio” en el Home (bloque inferior) o solo en módulo institucional?
- ¿Badges entran en MVP o se dejan para R2?
- ¿Se permite “Instalar app (PWA)” desde Home con un banner guía?
- Responsable / fecha:
  - Badges: {TBD} — {fecha}
  - Bloque “Información del espacio”: {TBD} — {fecha}
    