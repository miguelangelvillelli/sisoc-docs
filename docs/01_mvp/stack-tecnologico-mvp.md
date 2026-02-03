# Stack tecnológico propuesto — MVP App móvil (PWA) sobre SISOC

!!! info "Estado"
    **Versión:** v0.1  
    **Última actualización:** 2026-02-03  
    **Responsable:** ARQ_Nav / DEV_Impl / UI_UX  
    **Nivel:** Interno

## Objetivo
Definir un stack tecnológico **simple, consistente y de bajo riesgo** para entregar el **MVP** de acceso móvil para espacios comunitarios, **integrado a SISOC existente** (MySQL + backoffice Django), evitando cambios destructivos.

---

## Resumen ejecutivo (decisión propuesta)
Para el MVP se propone implementar una **PWA (web mobile-first)** como “app móvil”, consumiendo una **API móvil** expuesta por el backoffice Django.

- **Frontend (PWA):** React + TypeScript + Vite + Tailwind (+ shadcn/ui)
- **Backend (API):** Django (DRF o endpoints Django) + RBAC server-side + auditoría
- **BD:** MySQL existente (SISOC) + tablas nuevas solo si faltan módulos (bajo ADR)
- **Infra:** mismo entorno SISOC (si es viable) o un servicio separado con despliegue controlado

---

## Alcance del MVP (contexto)
La PWA cubre módulos:
- Home (Hub)
- Información institucional + documentos
- Mensajes operativos
- Nómina (ABM mínimo)
- Prestación alimentaria (solo lectura)
- Formación (ABM mínimo)
- Rendiciones (lista/detalle + adjuntar + presentar)

**Regla:** la PWA **no accede directo a MySQL**. Todo va por API.

---

## Frontend (PWA)

### Lenguaje y framework
- **TypeScript** (preferido) para tipado fuerte y reducción de errores
- **React** para UI
- **Vite** para bundling rápido y DX ágil

### Estilos y componentes
- **Tailwind CSS** como base de estilos utilitarios (consistencia y velocidad)
- **shadcn/ui** como kit de componentes reutilizables (formularios, dialogs, tabs, etc.)
- Tokens UI alineados con UX (colores, spacing, tipografías)

### PWA (capa “instalable”)
Incluye:
- `manifest.webmanifest` (nombre, íconos, theme color, modo standalone)
- `service worker` (mínimo para instalabilidad y cache básico)
- HTTPS (requisito para PWA)

**Nota MVP:** offline “real” y sync avanzado quedan como evolución, salvo que se requiera.

### Navegación y estados
- Router (React Router)
- Manejo estándar de estados:
  - loading / empty / error
  - 401/403/404
  - validaciones 400
- RBAC aplicado en backend (la UI solo refleja permisos)

---

## Backend (API móvil)

### Framework
- **Django** (reutilizando SISOC) + opción **Django REST Framework** si ya está disponible o es conveniente.

### API
- Base path sugerido: `/api/mobile/v1/`
- Contratos definidos en: `docs/05_api/contratos-v0.md`
- Autenticación (propuesta):
  - JWT Bearer (a confirmar con equipo SISOC)
- RBAC server-side:
  - roles: referente, interno, operador, admin, org_user (si aplica)

### Auditoría y trazabilidad
- Registro de eventos mínimos:
  - login, lectura de recursos sensibles, alta/edición de persona, upload, submit rendición, etc.
- Referencia: `docs/02_roles_y_accesos/auditoria-trazabilidad.md`

---

## Datos e integración SISOC

### Fuente de verdad
- Entidades ya existentes (Espacio, jurisdicción, etc.) se consumen desde SISOC.
- Para módulos inexistentes se habilita creación controlada de tablas nuevas (según ADR).

### Base de datos
- **MySQL existente** como fuente principal.
- Cambios o tablas nuevas:
  - solo con migraciones Django
  - con aprobación del equipo SISOC
  - sin romper procesos web existentes

---

## Storage de archivos (documentos y comprobantes)
Para MVP:
- Reutilizar storage SISOC si existe.
- Si no existe, usar mecanismo controlado por Django (MEDIA) con descarga autenticada o URL firmada.

Referencia: ADR propuesto `ADR-0005-storage-archivos.md`

---

## Hosting / Deploy (propuesta)
- Repositorio GitHub (documentación ya publicada en GitHub Pages).
- Para la PWA:
  - hosting web (Nginx / static) o servicio dedicado
- Para API:
  - dentro del backoffice Django o servicio separado (a confirmar por equipo SISOC)

---

## Seguridad (mínimo)
- Autenticación definida (JWT o sessions a confirmar)
- HTTPS obligatorio
- Validación server-side de permisos
- Límite de tamaño/tipos de archivos en uploads
- No exponer rutas internas ni datos sensibles

Referencia: `docs/07_seguridad/baseline.md`

---

## Criterios de éxito (MVP)
- Acceso móvil instalable (PWA) y navegación completa por módulos MVP
- API estable con RBAC server-side
- Rendiciones: adjuntar + presentar con estados básicos
- Nómina: alta/edición/listado con paginación
- No se rompe SISOC web existente

---

## Preguntas para cierre (reunión técnica)
- ¿Auth actual en SISOC permite JWT o se prefiere sessions?
- ¿Qué módulos ya existen (nómina/rendiciones/documentos/mensajes/formación)?
- ¿Dónde se guardan archivos hoy (si existe)?
- ¿Entorno staging disponible para pruebas?

Referencia: `docs/00_intro/preguntas-reunion-sisoc.md`
