# MVP One Pager — App móvil Legajo de Espacio (SISOC / PNUD)

!!! info "Estado"
    **Versión:** v0.1  
    **Última actualización:** 2026-02-03  
    **Responsable:** PLAN_Vibe / DOCS_Scribe  
    **Nivel:** Interno

## Objetivo del MVP
Entregar una **app móvil** para referentes de espacios comunitarios (y usuarios internos) que centralice información útil y habilite **gestiones mínimas** sobre su relación con el programa (SISOC/PNUD), consumiendo SISOC existente (MySQL + Django) mediante una API móvil.

## Usuarios (MVP)
- **Referente del espacio (admin del espacio):** opera el espacio y administra usuarios internos del espacio.
- **Usuario interno del espacio:** carga/actualiza información delegada por el referente.
- **Operador territorial / Técnico:** visualiza y valida información según asignación.
- **Administrador central:** supervisa y administra con alcance territorial.
- **Usuario de organización (evolución):** un usuario que ve/gestiona múltiples espacios asociados a una organización (no MVP, documentado como decisión evolutiva).

## Módulos incluidos (MVP)
- **Home (Hub)**: acceso a módulos y badges (mensajes, observaciones).
- **Información institucional**: perfil del espacio + documentos/convenios.
- **Mensajes operativos**: listado + detalle.
- **Nómina**: listado + alta rápida + edición + (opcional) import CSV según definición.
- **Prestación alimentaria**: visualización de estado y observaciones (solo lectura en MVP).
- **Formación**: listado + crear/editar + participantes (desde nómina).
- **Rendiciones**: listado + detalle + adjuntar comprobantes + presentar (según rol y reglas).

## Fuera de alcance (MVP)
- Gestión avanzada de organizaciones (multi-espacio por organización).
- Flujos complejos de aprobación con múltiples niveles (más allá de estados MVP).
- Tableros/BI y analítica avanzada en la app.
- Notificaciones push (puede dejarse como evolución).
- Acceso directo de la app a MySQL (prohibido: todo via API Django).

## Definición de “MVP listo” (criterios globales)
- Un usuario del espacio puede **acceder**, seleccionar espacio (si aplica) y ver el **Home**.
- El usuario puede **consultar** información institucional, documentos y mensajes.
- El usuario puede **gestionar nómina mínima** (alta rápida + editar) con validaciones.
- El usuario puede **adjuntar comprobantes** en una rendición y, si es referente, **presentarla**.
- Todo evento relevante queda auditado en backend (alta/edición/persona, carga de archivo, submit rendición, etc.).

## Riesgos / dependencias (a cerrar en reuniones)
- **Autenticación real** para usuarios de espacios: JWT vs Session y provisioning de cuentas.
- Identificador único del **Espacio** y su relación con jurisdicción/organización.
- Confirmación de existencia de módulos/tablas en SISOC (nómina, rendiciones, mensajes, documentos).
- Storage de archivos (comprobantes/documentos): dónde se guardan y cómo se sirven URLs.
- Reglas de visibilidad de “Prestación alimentaria” (qué se muestra y qué no).

## Entregables para UX y Dev
- Prototipo navegable en Figma con flujos end-to-end y estados (loading/vacío/error/sin permiso).
- Contratos API v0 para alinear endpoints, paginación y permisos server-side.
- Plan QA smoke y criterios de aceptación por historia.

