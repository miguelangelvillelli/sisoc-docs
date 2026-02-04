# Roadmap (MVP → Release 2)

!!! info "Estado"
    **Versión:** v0.2  
    **Última actualización:** 2026-02-04  
    **Responsable:** PLAN_Vibe / Equipo SISOC  
    **Nivel:** Interno

!!! warning "Regla"
    Este roadmap es una guía de planificación.  
    Los cambios de alcance se gestionan con **ADR** y se validan en comité (UX + Técnica + Operación).

## Objetivo
Planificar una evolución ordenada desde un **MVP móvil** (valor inmediato) hacia una versión ampliada (Release 2) sin romper SISOC existente y sosteniendo trazabilidad, seguridad y performance.

---

## Fase 0 — Alineación y cierre de definiciones (semana 0)
**Entrega**

- Minuta de reunión SISOC (integración) y decisiones clave cerradas:
    - Identificador único de espacio
    - Estrategia de autenticación (A/B)
    - Qué existe vs qué se crea (nómina, rendiciones, mensajes, documentos)
    - Storage de archivos y reglas de descarga
    - Catálogo de estados reales (prestación, rendición, espacio)

**Artefactos**

- Preguntas respondidas en `00_intro/preguntas-reunion-sisoc.md`
- ADRs nuevos si corresponde (ej. auth, tablas nuevas, storage)

---

## Fase 1 — UX MVP (wireframes → prototipo) (semana 1)
**Entrega**

- Prototipo Figma low-fi → mid-fi (navegable) para:
    - Home (Hub) + selector de espacio
    - Info institucional + documentos + mensajes
    - Nómina (lista/detalle/alta/editar)
    - Prestación (lectura)
    - Formación
    - Rendiciones + adjuntos + submit

**Definiciones UX**

- Estados UI mínimos (vacío, error, loading, sin permisos)
- Copy “en claro” (mensajes y errores)
- Componentes base (design tokens simples)

---

## Fase 2 — Backend API móvil (v0) + RBAC + auditoría mínima (semanas 1–2)
**Entrega**

- Endpoints v0 operativos (según `05_api/contratos-v0.md`)
- RBAC server-side por rol y alcance
- Auditoría de eventos críticos (mínimos)
- Paginación + límites + validaciones
- Integración segura con MySQL existente (sin acceso directo desde app)

**Hitos**

- `/me` + scope resuelto
- Documentos/mensajes en lectura
- Nómina CRUD básico (según reglas)
- Rendiciones: lista + detalle + adjuntos + submit (si aplica)

---

## Fase 3 — App MVP (PWA o React Native) + integración end-to-end (semanas 2–4)
**Entrega**

- App navegable end-to-end con módulos MVP
- Manejo de sesión, permisos y errores
- Subida/descarga de archivos (según política)
- Métricas mínimas (logs técnicos, performance básica)

**Hitos**

- Flujo completo: login → home → módulo → operación → confirmación
- Experiencia estable en Android (objetivo primario)

---

## Fase 4 — QA + hardening + piloto controlado (semanas 4–5)
**Entrega**

- Smoke + regresión mínima (`06_calidad/plan-qa-smoke.md`)
- Corrección de issues críticos
- Ajustes de performance (paginación, caché donde aplique)
- Piloto con grupo reducido de espacios

**Hitos**

- Criterios de aceptación validados por módulo
- Check de seguridad mínimo (roles, archivos, permisos)

---

## Fase 5 — MVP Release (semanas 5–6)
**Entrega**

- Publicación controlada (wave 1)
- Manual operativo corto (cómo usar, soporte, escalamiento)
- Monitoreo + canal de feedback

---

# Release 2 (líneas de evolución)

## Release 2.1 — Operación y comunicación avanzada

- Notificaciones push reales (si se aprueba)
- Segmentación de mensajes por jurisdicción/espacio
- Mensajes “accionables” (ej. confirmar lectura, responder simple)

## Release 2.2 — Documentación y convenios (circuitos)

- Flujos de renovación de convenios (si aplica)
- Gestión documental avanzada (versionado/circuitos)
- Firma digital (si se aprueba)

## Release 2.3 — Nómina y datos (calidad)

- Importación masiva avanzada
- Dedupe mejorado (y reglas inter-espacio si aplica)
- Modelos ampliados (familias/grupos) si el programa lo requiere

## Release 2.4 — Rendiciones (automatización)

- Validaciones contables más ricas
- OCR / extracción básica de datos (si es viable)
- Circuitos multi-etapa de aprobación

## Release 2.5 — Offline-first (si es requisito real)

- Modo sin conexión con sync + resolución de conflictos
- Descarga previa de documentos
- Estrategia completa de resiliencia

---

## Riesgos y dependencias (a vigilar)

- Definición de auth + gestión de usuarios de espacios (depende de SISOC)
- Existencia real de módulos en SISOC (nómina/rendiciones/mensajes/documentos)
- Políticas de exposición de información (prestación y documentos)
- Storage y distribución de archivos (seguridad, links firmados, tamaños)
- Capacidad del equipo para sostener UX + backend + app en paralelo

## Indicadores de avance (mínimos)

- % endpoints v0 implementados
- % pantallas MVP conectadas a backend real
- tiempo promedio de carga en listas (paginadas)
- cantidad de issues críticos abiertos/cerrados por sprint
- feedback de piloto (usabilidad + comprensión)
