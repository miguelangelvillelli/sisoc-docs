# 04 · Información institucional (Perfil del espacio)

!!! info "Estado"
    **Versión:** v0.1  
    **Última actualización:** 2026-02-05  
    **Responsable:** UX + Analista Funcional  
    **Nivel:** Interno (relevamiento)

## Objetivo
Permitir que el **espacio comunitario** vea, de forma simple desde el teléfono, su **ficha institucional** y acceda a:
- **Documentos** asociados (convenios, reglamentos, etc.)
- **Mensajes operativos** del programa
- **Canales de contacto** habilitados

## Ubicación en el flujo
Desde **03 · Home (Hub)** → tarjeta “Información Institucional”.

## Pantalla / UI (según mock)
### Encabezado
- Flecha “volver” (navega a Home/Hub)
- Título: **Perfil del Espacio**

### Card principal (Ficha del espacio)
Muestra:
- **Nombre del espacio**
- **Badge de estado** (ej.: “Activo”)
- **Dirección**
- **Localidad**
- **Provincia**

### Sección “Contacto”
Muestra (si existe):
- **Email** (tap abre mailto)
- **Teléfono** (tap abre dialer / WhatsApp según criterio definido)

### Accesos directos (botones)
- **Documentos** → abre pantalla `06 · Documentos (lista)`
- **Mensajes** → abre pantalla `07 · Mensajes (lista)`

> Nota: estos botones son navegación interna del módulo, no acciones de edición.

## Acciones del usuario
- Volver a Home (flecha atrás)
- Tocar **Documentos**
- Tocar **Mensajes**
- Tocar email / teléfono (si están habilitados)

## Reglas de negocio
- La ficha es **solo lectura** en MVP.
- Mostrar **solo datos necesarios** (evitar datos sensibles).
- El estado del espacio se muestra si el sistema lo provee (catálogo a confirmar).
- Los accesos a Documentos/Mensajes dependen de RBAC.

## Estados de pantalla
### Cargando
- Skeleton/loader en card principal y en contacto.

### Sin datos parciales
- Si falta dirección/localidad/provincia: mostrar “—” o “Sin datos” (sin romper layout).
- Si no hay contactos: mostrar bloque “Contacto” con mensaje “No hay canales de contacto disponibles”.

### Sin permiso (403)
- Mensaje claro: “No tenés permisos para ver esta información”.
- CTA: “Volver”.

### No encontrado (404)
- Mensaje: “No encontramos el espacio. Contactá al programa.”
- CTA: “Volver”.

### Error de red/servidor
- Mensaje: “No pudimos cargar la información. Reintentá.”
- CTA: “Reintentar”.

## Permisos (RBAC)
- **Referente del espacio**: Ver
- **Usuario interno del espacio**: Ver
- **Operador territorial / Técnico**: Ver (según asignación)
- **Administrador central**: Ver / Administrar (si aplica al backoffice)
- **Usuario organización** (si se implementa): Ver (con selector de espacio)

## Datos requeridos (contrato conceptual)
**Space (Espacio)**
- id (obligatorio)
- nombre (obligatorio)
- estado (opcional)
- direccion (opcional)
- localidad (opcional)
- provincia (opcional)
- contacto_email (opcional)
- contacto_tel (opcional)
- contacto_whatsapp (opcional / derivable)

## Endpoints (placeholder a confirmar con equipo técnico)
- `GET /api/app/space/me`  
  Devuelve ficha del espacio asociado al usuario/espacio seleccionado.

> Si existe “selector de espacio”, el endpoint puede ser:
- `GET /api/app/spaces/{space_id}`

## Auditoría / trazabilidad (eventos mínimos)
- `institucional_view_profile`
- `institucional_click_documents`
- `institucional_click_messages`
- `institucional_click_contact_email` (opcional)
- `institucional_click_contact_phone` (opcional)

## Criterios de aceptación (mínimos)
- Dado un usuario autenticado con permiso de ver,
  cuando ingresa a “Información institucional”,
  entonces visualiza nombre del espacio y estado (si existe), y los campos básicos disponibles.

- Dado que el usuario toca “Documentos”,
  cuando navega,
  entonces llega a la lista de documentos del espacio.

- Dado que el usuario toca “Mensajes”,
  cuando navega,
  entonces llega a la lista de mensajes del programa para ese espacio.

## Dependencias / Pendientes para cerrar
- Confirmar **catálogo de estados** del espacio (activo/suspendido/etc.)
- Confirmar **qué canal abre el teléfono** (dialer vs WhatsApp) y prioridad.
- Definir si “Usuario organización” ve la ficha del espacio seleccionado o una vista consolidada.

## Referencias
- `docs/09_relevamiento/03_home-hub.md`
- `docs/09_relevamiento/06_documentos-lista.md`
- `docs/09_relevamiento/07_mensajes-lista.md`
