# Agenda — Reunión técnica (viernes) · MVP App PWA “Legajo de Espacio”

!!! info "Estado"
    **Versión:** v0.1  
    **Última actualización:** 2026-02-04  
    **Responsable:** Equipo SISOC  
    **Nivel:** Interno

## Objetivo de la reunión
Cerrar definiciones técnicas y de modelo de datos para implementar el **MVP PWA** como **consumer** de SISOC (MySQL + Django), sin accesos directos a BD desde el cliente y con contratos de API claros.

## Resultado esperado (DoR de desarrollo)
- Estrategia de **autenticación** definida (JWT/session) + alcance de roles para “espacios”
- Identificador único del **Espacio** confirmado y estable (tabla/modelo + key)
- Confirmación: qué módulos **ya existen** vs qué debemos **crear/extender**
- Mapeo de **estados reales** (prestación / rendición) a catálogos MVP
- Definición de **storage** de archivos (comprobantes/documentos) y URLs (firmadas o directas)
- Aprobación del **contrato API v0** (o lista de cambios)

---

## Participantes
- Equipo técnico SISOC (analistas + dev)
- UX (si participa para validar implicancias)
- Dirección (para definición de alcance MVP)

---

## Pre-lectura (10 min)
- `01_mvp/alcance-mvp.md`
- `00_intro/preguntas-reunion-sisoc.md`
- `05_api/contratos-v0.md`
- `04_datos/estados-y-reglas.md`

---

## Agenda (90 min sugeridos)

### 1) Contexto (10 min)
- Confirmar objetivo MVP y restricciones:
  - PWA (React + TS + Vite)
  - App “consumer” de SISOC (sin backoffice propio)
  - La PWA **no accede** a MySQL directo, solo vía API

### 2) Identidad del Espacio (15 min)
- Fuente de verdad: modelo/tablas de Espacio/Centro/Comedor
- Primary key (estable) + relaciones:
  - jurisdicción (provincia/municipio)
  - organización (si aplica)
- Estado institucional del espacio (si existe)

### 3) Usuarios y autenticación (20 min)
- ¿Existen usuarios “espacio” hoy o solo técnicos?
- Mapeo usuario ↔ espacio (FK / tabla intermedia)
- Propuesta preferida:
  - JWT Bearer (ideal para PWA)
  - Session (si hay razones fuertes)
- Definir login/refresh y vida de tokens
- ¿Se requiere 2FA o verificación?

### 4) Módulos del MVP: existe vs se crea (25 min)

**Información institucional**

- ¿Qué campos exactos de “Ficha del espacio” mostramos?
- Documentos/convenios: ¿ya existe repositorio? ¿download/view?

**Mensajes operativos**

- ¿Existe módulo? Si no: definir tabla mínima + segmentación (general / por espacio / por jurisdicción)
- Autor (admin central) + estados (borrador/publicado) si aplica
- “no leídos” (tracking mínimo) ¿sí/no?

**Nóminas**

- ¿Existe tabla de personas por espacio?
- Campos base y reglas (DNI obligatorio o no)
- Importación CSV: ¿se mantiene web-only o se habilita en móvil?

**Prestación alimentaria (solo lectura)**

- ¿Qué datos existen para status/period/observaciones/historial?
- Qué NO mostrar (sensibilidad)

**Rendiciones y comprobantes**

- ¿Existe módulo? ¿Dónde guarda archivos?
- Si no existe: tablas mínimas + estados + reglas de presentación

### 5) Storage / Archivos / Seguridad (10 min)

- Archivos: filesystem/S3/otro
- URLs firmadas + expiración (si aplica)
- Límite de tamaño y tipos permitidos
- Auditoría mínima de eventos

### 6) Contratos API v0 (10 min)

- Validar endpoints propuestos
- Ajustes de naming y IDs reales
- Paginación, filtros, respuestas estándar

---

## Lista de decisiones a registrar (checklist)
- [ ] Auth definida (JWT/session) + endpoints
- [ ] ID de espacio confirmado (tabla + campo)
- [ ] “Mensajes operativos” confirmado (existe/crear) + segmentación
- [ ] Nómina confirmado (existe/crear) + campos obligatorios
- [ ] Prestación: dataset visible al espacio + estados
- [ ] Rendiciones: estados + storage + si existe módulo
- [ ] Auditoría mínima y retención
- [ ] Aprobación de contratos API v0 (con cambios)

---

## Pendientes (si no entra en la reunión)
- Integración analítica / métricas
- Push notifications (release 2)
- SSO / 2FA / validaciones avanzadas
- Dashboard organización multi-espacio (release 2)
