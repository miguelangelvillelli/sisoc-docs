# ADR-0006 · Estrategia de integración: reutilizar módulos SISOC vs crear nuevos (MVP)

!!! info "Estado"
    **ID:** ADR-0006  
    **Título:** Reutilizar módulos existentes vs crear nuevos (MVP)  
    **Estado:** Propuesto  
    **Fecha:** 2026-02-03  
    **Responsable:** ARQ_Nav / DEV_Impl  
    **Nivel:** Interno

## Contexto
SISOC ya opera para técnicos (web) con BD MySQL y backoffice Django.
El MVP móvil introduce vistas/operaciones para “usuarios de espacios”:
- info institucional
- documentos/mensajes
- nómina
- rendiciones
- formación
- prestación (lectura)

No sabemos aún qué módulos existen en SISOC y cuáles faltan.  
Debemos evitar cambios destructivos y minimizar riesgo en producción.

**Drivers**
- Bajo riesgo (no romper SISOC)
- Velocidad MVP
- Coherencia de datos (fuente de verdad)
- Control de permisos (RBAC)

---

## Decisión
**Se decide (propuesto):**
1) **Reutilizar** entidades/módulos existentes de SISOC siempre que:
   - estén activos,
   - tengan modelo de datos suficiente,
   - permitan exponer la info al espacio sin violar políticas.
2) Si un módulo **no existe** o no sirve para el MVP, se permite crear tablas/modelos **nuevos** en Django, con:
   - migraciones controladas,
   - claves foráneas hacia `Espacio`,
   - auditoría mínima,
   - endpoints en `/api/mobile/v1/`.

**Regla del MVP:** la app móvil consume exclusivamente la API; no se crean accesos directos a MySQL desde móvil.

---

## Alternativas consideradas

### Opción A — Todo nuevo (descartada)
- **Pros:** control total del diseño.
- **Contras:** duplicación de datos; mayor tiempo; mayor riesgo funcional.

### Opción B — Todo reutilizado (ideal si existe)
- **Pros:** menos dev.
- **Contras:** si SISOC no tiene el módulo, bloquea el MVP.

### Opción C — Híbrido (recomendada)
- Reutilizar lo existente + crear solo lo faltante.

---

## Consecuencias

### Positivas
- Evita rehacer lo que ya está.
- Permite avanzar aunque falten módulos.
- Mantiene una “fuente de verdad” clara por entidad.

### Negativas / costos
- Hay que mapear modelos reales y nombres de tablas.
- Puede requerir refactors o vistas específicas para móvil.

### Impactos
- **Backend:** capa de servicios/adaptadores (SISOC → API móvil).
- **Datos:** mapeo de IDs reales y relaciones.
- **QA:** pruebas de regresión para no romper flujos existentes.

---

## Criterios de éxito / validación
- No se rompe funcionalidad web existente (técnicos).
- La app puede operar el MVP con datos reales o staging.
- Las entidades clave (Espacio, Usuario, etc.) tienen IDs estables.

---

## Pendientes (reunión viernes)
- Qué módulos existen: nómina, rendiciones, documentos, mensajes, formación, prestación.
- Identificador único del espacio y relaciones.
- Política de cambios en BD / aprobación de migraciones.

---

## Referencias
- Preguntas reunión SISOC: `docs/00_intro/preguntas-reunion-sisoc.md`
- Contratos API: `docs/05_api/contratos-v0.md`
- RBAC: `docs/02_roles_y_accesos/rbac.md`
- Integración existente: `docs/adr/ADR-0003-integracion-sisoc-existente.md`
