# Catálogos y estados (MVP)

!!! info "Estado"
    **Versión:** v0.1  
    **Última actualización:** 2026-02-03  
    **Responsable:** DB_Model / ARQ_Nav  
    **Nivel:** Interno

## Objetivo
Definir un set único de **estados/catálogos** para alinear UX, API, QA y backoffice.
Los estados reales de SISOC se mapearán a estos catálogos.

---

## 1) Estado del espacio (SpaceStatus)
- `activo`
- `suspendido`
- `en_revision`
- `sin_datos`

**Reglas UI:**
- `sin_datos`: mostrar mensaje “faltan datos del espacio” sin bloquear navegación.
- `suspendido`: mostrar badge y mensaje contextual; qué módulos quedan disponibles se define por política.

---

## 2) Prestación alimentaria (BenefitStatus)
- `vigente`
- `en_revision`
- `observada`
- `suspendida`
- `sin_datos`

**Reglas UI:**
- Siempre mostrar **período** y **mensaje/observación** si existe.
- No mostrar montos/detalles sensibles hasta confirmación de alcance.

---

## 3) Rendición (ClaimStatus)
- `borrador`
- `presentada`
- `observada`
- `aprobada`
- `rechazada`

**Reglas UI:**
- `borrador`: permite adjuntar y editar.
- `presentada`: bloquea cambios (solo lectura).
- `observada`: habilita adjuntar nuevamente (según política) y muestra observaciones.
- `aprobada/rechazada`: solo lectura.

---

## 4) Comprobante (AttachmentStatus)
- `cargado`
- `validado`
- `invalidado`

**Reglas UI:**
- `invalidado` debe mostrar motivo en el detalle de rendición.

---

## 5) Actividad de formación (ActivityStatus)
- `planificada`
- `finalizada`
- `cancelada`

**Reglas UI:**
- Solo editar contenido cuando `planificada` (MVP).
- `finalizada/cancelada`: solo lectura.

---

## 6) Persona en nómina (PersonStatus)
- `activa`
- `inactiva`

**Reglas UI:**
- Cambio de estado requiere confirmación (“¿dar de baja?” / “¿reactivar?”).

---

## Pendientes para reunión (mapeo real SISOC)
- Tabla/modelo fuente para cada estado.
- Estados existentes y su correspondencia con catálogos MVP.
- Reglas de transición (qué estados pueden pasar a cuáles y quién lo hace).

