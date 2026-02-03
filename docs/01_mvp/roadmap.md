# Roadmap — App móvil Legajo de Espacio (SISOC · PNUD)

!!! info "Estado"
    **Versión:** v0.1  
    **Última actualización:** 2026-02-03  
    **Responsable:** PLAN_Vibe / ARQ_Nav / DEV_Impl  
    **Nivel:** Interno

## Objetivo
Ordenar la evolución del producto desde el MVP hacia versiones posteriores, manteniendo una línea clara:
- primero entregar valor (consulta + operaciones mínimas),
- luego ampliar capacidades (organizaciones, offline, notificaciones, etc.).

---

## Horizonte 0 — MVP (v0)
**Enfoque:** acceso + consulta + operación mínima.

Incluye:
- Home (Hub)
- Información institucional + documentos
- Mensajes operativos
- Nómina mínima
- Prestación alimentaria (lectura)
- Formación (básico)
- Rendiciones (adjuntar + presentar)

**Salida esperada:** piloto controlado con espacios seleccionados.

---

## Horizonte 1 — MVP+ (v1)
**Enfoque:** robustez operativa + mejoras UX + performance.

Posibles mejoras:
- Normalización y refinamiento de RBAC (sub-permisos por acción)
- Mejoras de archivos:
  - preview en app (si aplica)
  - URLs firmadas con expiración
  - compresión de imágenes antes de subir
- Auditoría más completa (eventos y trazabilidad por módulo)
- Mejoras de búsqueda y filtros en nómina
- Mejoras de estados UI (vacío/error/sin permiso) consistentes en toda la app
- Paginación y performance con estándares (page_size, límites, índices)

---

## Horizonte 2 — Operación ampliada (v2)
**Enfoque:** escalar operación y reducir fricción.

Posibles mejoras:
- Notificaciones push (recordatorios de rendición, mensajes críticos)
- Bandeja de “pendientes” del espacio (tareas recomendadas)
- Reporte simple desde móvil (descarga de constancias/estado)
- Mejoras de formación:
  - plantillas de actividades
  - evidencia / adjuntos por actividad (si se define)

---

## Horizonte 3 — Organizaciones y multi-espacio (v3)
**Enfoque:** habilitar operación a través de organizaciones.

Posibles mejoras:
- Usuario organización:
  - vista consolidada por múltiples espacios
  - navegación multi-espacio
  - reporting básico transversal
- Segmentación de mensajes/documentos por organización/jurisdicción
- Roles jerárquicos (org_admin, org_operator)

> Ver ADR-0002.

---

## Horizonte 4 — Offline / Territorio (v4)
**Enfoque:** operar con conectividad limitada.

Posibles mejoras:
- Modo offline (cola de operaciones)
- Sincronización y manejo de conflictos
- Evidencia y adjuntos offline con subida diferida

---

## Horizonte 5 — Integraciones y automatización (v5)
**Enfoque:** interoperabilidad y automatizaciones.

Posibles mejoras:
- Integraciones externas (según políticas)
- Automatización de comunicaciones (reglas)
- Webhooks y/o eventos para otras áreas

---

## Dependencias transversales (para todo el roadmap)
- Confirmación del modelo de datos real SISOC y su evolución
- Estrategia de autenticación y provisioning de usuarios de espacios
- Estrategia de storage de archivos y seguridad (URLs firmadas, permisos)
- Gobernanza de datos y auditoría

---

## Próximo hito inmediato
- Reunión UX: prototipo navegable MVP + estados UI
- Reunión técnica: cierre de decisiones (auth, space_id, módulos existentes) y ajuste de contratos API v0
