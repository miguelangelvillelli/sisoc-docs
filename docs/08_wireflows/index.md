# Wireflows (MVP) — Mapa visual de pantallas y flujos

!!! info "Estado"
    **Versión:** v0.1  
    **Última actualización:** 2026-02-03  
    **Responsable:** UI_UX / ARQ_Nav  
    **Nivel:** Interno

## Objetivo
Tener una referencia visual rápida para:
- alinear expectativas del MVP (qué se construye / qué no),
- validar con SISOC existente (qué se reutiliza),
- orientar desarrollo (pantallas + endpoints + estados).

---

## Alcance del MVP (pantallas)
- Home (hub)
- Información institucional (perfil + documentos)
- Mensajes operativos (lista + detalle)
- Nómina (lista + alta + edición + import CSV si aplica)
- Prestación alimentaria (solo lectura)
- Formación (lista + alta/edición + participantes)
- Rendiciones (lista + detalle + adjuntos + presentar)

---

## Documentos de esta sección
- **Wireflow MVP (end-to-end):** flujo completo de navegación y puntos de decisión
- **Pantallas MVP:** descripción de cada pantalla (datos, acciones, vacíos, errores, permisos)

---

## Criterios (UX) para el MVP
- Siempre mostrar el **contexto del espacio** (nombre) en header o menú
- Acciones críticas con confirmación:
  - “Presentar rendición”
  - “Dar de baja/activar persona”
- Estados “sin datos” deben mostrarse como mensaje claro, no error técnico
- Listados grandes siempre con:
  - búsqueda simple
  - paginación
  - “estado vacío” (no hay resultados)

---

## Pendientes para reunión SISOC
- Autenticación real (JWT / session / SSO) y flujo de login
- Si un usuario puede tener **más de un espacio** (selección de espacio)
- Confirmar si “Importación CSV” de nómina se hace desde móvil o solo web
- Confirmar dónde viven documentos / adjuntos hoy (storage)
