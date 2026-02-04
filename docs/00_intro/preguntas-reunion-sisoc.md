# Preguntas para reunión SISOC (integración app móvil MVP)

!!! info "Estado"
    **Versión:** v0.2  
    **Última actualización:** 2026-02-03  
    **Responsable:** ARQ_Nav / DEV_Impl / PLAN_Vibe  
    **Nivel:** Interno

## Objetivo
Cerrar definiciones técnicas y funcionales para integrar el MVP móvil con SISOC existente (MySQL + Django) **sin tocar de forma destructiva** el sistema.
Este documento está orientado a destrabar decisiones por sprint (qué nos bloquea y qué necesitamos confirmar).

---

## A) Identidad del Espacio (clave para todo) — *Bloquea Sprint 1*
- ¿Cuál es la entidad fuente de verdad del “Espacio/Centro/Comedor” en SISOC (nombre del modelo/tablas)?
- ¿Cuál es su identificador principal (id/código)? ¿Es estable?
- ¿Cómo se relaciona con jurisdicción (provincia/municipio) y con “organización” si existe?
- ¿Existe estado institucional del espacio (activo/suspendido/etc.)?

**Salida esperada**

  - Confirmar **space_id real** (tipo y nombre de campo) + tabla/modelo.
  - Lista de campos que vamos a exponer en “Perfil del espacio”.
  - Catálogo real de “estado institucional del espacio”.

---

## B) Usuarios y autenticación (para app móvil) — *Bloquea Sprint 1*
- ¿SISOC ya tiene usuarios para “espacios” o solo para técnicos?
- ¿Se puede reutilizar auth existente (Django auth) para cuentas de espacios?
- ¿Cómo se asigna un usuario a un espacio? (FK / tabla intermedia)
- ¿Se usa JWT/Session/OAuth? ¿Hay algún estándar ya implementado?
- ¿Se requiere 2FA o verificación por SMS/Email?

**Salida esperada**

- Decisión: **JWT vs Session** (y por qué).
  - Endpoints necesarios:
      - `POST /auth/login` (si aplica)
      - `POST /auth/refresh` (si aplica)
      - `GET /me`
  - Definición de **roles reales** y cómo se vinculan a permisos (RBAC).

---

## C) Nóminas / Personas — *Bloquea Sprint 2*
- ¿Existe hoy una tabla/modelo de “personas asistidas” vinculadas a un espacio?
    - Si existe: ¿qué campos ya tienen? ¿DNI es obligatorio?
    - Si NO existe: ¿prefieren que nómina sea tabla nueva o ya hay un módulo similar?
- ¿Hay reglas actuales de deduplicación o validación?

**Salida esperada**

- Confirmar si **nómina existe** (reutilizar) o si se **crea**.
- Campos mínimos MVP: nombre, apellido, (doc opcional), teléfono opcional, activa/inactiva.
- Regla de duplicados: por documento, por nombre+apellido, etc.
- Volumen típico por espacio (para paginación/performance).

---

## D) Prestación alimentaria (solo visualización en MVP) — *Bloquea Sprint 4*
- ¿Qué datos existen hoy para mostrar “estado”, “período”, “observaciones” y “historial”?
- ¿Cómo se representa el “período” (mes/año, rango, liquidación)?
- ¿Qué estados manejan hoy? (para mapear a `vigente`, `en_revision`, `observada`, `suspendida`, `sin_datos`)
- ¿Qué información NO debe mostrarse al espacio (sensibilidad)?

**Salida esperada**

- Definir exactamente qué campos se exponen en móvil (solo lectura).
- Catálogo real de estados + mapeo a estados MVP.
- Confirmar fuente de datos (tabla/modelo) y endpoint(s) propuestos.

---

## E) Rendiciones y comprobantes — *Bloquea Sprint 3*
- ¿Existe hoy un módulo de rendiciones en SISOC? ¿Cómo guarda comprobantes?
- Si existe: ¿dónde se almacenan archivos (filesystem, S3, etc.)?
- Si NO existe: ¿aprueban crear tablas nuevas para:
    - rendición (estado, período)
    - comprobantes (archivo, estado, motivo)
- ¿Hay estados actuales para rendición (borrador/presentada/observada/aprobada/rechazada) o se definen nuevos?
- ¿Quién revisa y aprueba (roles internos)?

**Salida esperada**

- Confirmar si “rendiciones” existe o se crea.
- Estados reales de rendición y reglas de transición (presentar, observar, aprobar).
- Storage de comprobantes + mecanismo de descarga (URL firmada / endpoint).
- Límite de archivos: tamaño máximo, tipos permitidos.

---

## F) Documentos/convenios y mensajes operativos — *Bloquea Sprint 1*
- ¿Dónde viven hoy los convenios/documentos del espacio?
- ¿Se guardan como archivo o link?
- ¿Existe un mecanismo de “mensajes operativos” o news dentro de SISOC?
- ¿Se necesita segmentar mensajes por espacio/jurisdicción?

**Salida esperada**

- Confirmar si existe “Documentos” y “Mensajes”.
- Si no existe mensajes: decisión MVP (tabla simple nueva / banner / módulo existente).
- Definición de segmentación (por espacio, municipio, provincia).

---

## G) Auditoría y trazabilidad — *Recomendado cerrar antes de Sprint 2/3*
- ¿SISOC ya tiene tabla/log de auditoría?
- Si existe: ¿cómo registrar eventos nuevos (`persona_create`, `rendicion_submit`, etc.)?
- ¿Requisitos de retención de logs?

**Salida esperada**

- Confirmar si se reutiliza auditoría existente o se implementa módulo mínimo.
- Lista mínima de eventos a registrar en MVP.

---

## H) Performance y escalabilidad (mínimo) — *Impacta Sprint 1–4*
- ¿Volumen estimado de espacios y de personas por espacio?
- ¿Hay índices actuales para búsquedas por nombre/documento?
- ¿Hay caché (Redis) o paginación en endpoints existentes?

**Salida esperada**

- Reglas de paginación (`page`, `page_size`, máximo `page_size`).
- Recomendaciones/limitaciones sobre queries (búsqueda, filtros).
- Si se permite caching server-side en endpoints críticos.

---

## I) Entornos y despliegue — *Bloquea ejecución sostenida*
- ¿Hay ambiente dev/staging para probar la API móvil?
- ¿Cómo se gestionan migraciones (Django migrations) en producción?
- ¿Quién aprueba cambios en modelos/tablas?

**Salida esperada**

- URL de entorno de prueba + credenciales de prueba (si aplica).
- Proceso de aprobación para cambios (modelo, migrations, endpoints).
- Ventana/ritual de despliegue.

---

## Resultado esperado de la reunión (resumen)
- Identificador único del espacio confirmado (space_id real)
- Estrategia de autenticación para usuarios “espacio”
- Confirmación: qué existe vs qué creamos (nómina/rendiciones/mensajes/documentos)
- Mapeo de estados reales a catálogos MVP
- Definición del storage de archivos (documentos y comprobantes)

---

## Registro de decisiones (para completar en vivo)
- Auth decidido: ________
- Roles reales confirmados: ________
- Entidades confirmadas (sí/no): documentos ___ mensajes ___ nómina ___ rendiciones ___ prestación ___
- Storage archivos: ________
- Base path API: ________
- Mapeo de estados (prestación/rendición): ________
