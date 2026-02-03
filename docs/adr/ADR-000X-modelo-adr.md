# ADR-0000 · Plantilla (copiar y usar)

!!! info "Estado"
    **ID:** ADR-0000  
    **Título:** (Decisión corta y concreta)  
    **Estado:** Propuesto | Aceptado | Reemplazado | Deprecated  
    **Fecha:** 2026-02-03  
    **Responsable:** (Rol/Equipo)  
    **Nivel:** Interno

## Contexto
Describir en 5–10 líneas:
- cuál es el problema o necesidad,
- qué restricción existe (SISOC ya existe, MySQL+Django, tiempos del MVP, etc.),
- qué se quiere lograr.

**Drivers (qué importa más)**
- (Ej) Seguridad / RBAC
- (Ej) Time-to-market (MVP rápido)
- (Ej) Mantenibilidad
- (Ej) Performance / escalabilidad
- (Ej) Simplicidad operativa

---

## Decisión
Explicar claramente qué se decide y qué implica.

**Se decide:**
- (Ej) La app móvil consumirá datos **solo vía API Django** (`/api/mobile/v1/`) y **no** accederá directo a MySQL.
- (Ej) Se usará JWT para autenticación (si aplica).

**Alcance de la decisión**
- Aplica a: (módulos / pantallas / endpoints)
- No aplica a: (lo que queda afuera)

---

## Alternativas consideradas
### Opción A — (nombre)
- Descripción breve
- Pros / Contras (2–3 bullets max)
- Motivo por el que se descarta o se deja como evolución

### Opción B — (nombre)
- Ídem

---

## Consecuencias
### Positivas
- (Ej) Permite RBAC server-side y auditoría consistente
- (Ej) Reduce riesgo de cambios destructivos sobre SISOC

### Negativas / costos
- (Ej) Requiere construir endpoints nuevos
- (Ej) Puede necesitar cache/paginación para performance

### Impactos
- **UX:** (qué cambia en pantallas/flujo)
- **Backend:** (qué hay que implementar)
- **Datos:** (tablas nuevas / mapeos / migraciones)
- **QA:** (tests nuevos / smoke)
- **Seguridad:** (consideraciones: permisos, storage, logs)

---

## Criterios de éxito / validación
- (Ej) Smoke pasa end-to-end para el flujo X
- (Ej) No hay accesos directos a BD desde móvil
- (Ej) Auditoría registra eventos críticos

---

## Pendientes / preguntas abiertas
- (Ej) ¿Cómo se provisionan usuarios de espacios?
- (Ej) ¿Dónde se almacenan comprobantes y cómo se sirven URLs?

---

## Referencias
- RBAC: `docs/02_roles_y_accesos/rbac.md`
- Catálogos/estados: `docs/04_datos/catalogos.md`
- Contratos API: `docs/05_api/contratos-v0.md`
- Plan de sprints: `docs/01_mvp/plan-sprints.md`

