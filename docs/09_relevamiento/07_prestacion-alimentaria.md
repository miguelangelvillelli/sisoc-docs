# 07 · Prestación alimentaria (MVP)

!!! info "Estado"
    **Versión:** v0.1  
    **Última actualización:** 2026-02-05  
    **Responsable:** Equipo SISOC (Territorio + Técnica)  
    **Nivel:** Interno

## Objetivo del módulo
Permitir que el espacio comunitario consulte, desde el teléfono, el **estado de la prestación alimentaria** del período vigente y el **historial por períodos**, con mensajes claros y sin exposición de información sensible.

## Alcance MVP
Entra en MVP:
- Visualizar **Período actual** (mes/año) + estado.
- Visualizar **fechas inicio/fin** del período (si están disponibles).
- Acceso a **Historial de períodos**.
- Ver **detalle de un período** (solo lectura).
- Mostrar **mensajes informativos/observaciones** (si aplica), en lenguaje simple.

Fuera de alcance (Release 2):
- Gestión/edición del estado desde la app del espacio.
- Carga de rendición o adjuntos desde este módulo (va por “Rendiciones”).
- Detalle financiero (montos, transferencias, movimientos).
- Reglas complejas de negocio visibles (validaciones internas).

## Usuarios y permisos (RBAC)
- **Referente del espacio**: Ver
- **Usuario interno del espacio**: Ver
- **Operador territorial / Técnico**: Ver (según jurisdicción/asignación)
- **Administrador central**: Ver / Administrar (si existe backoffice SISOC)

## Datos a definir con Territorio (checklist)
- ¿Qué “estado” ve el espacio? (catálogo final)
- ¿Se muestra “motivo” cuando está Observado/Suspendido?
- ¿Se muestra “faltan comprobantes” como texto fijo o viene de SISOC?
- ¿Fechas inicio/fin existen en SISOC o se derivan?

## Reglas UI mínimas
- Siempre mostrar un bloque “Información” aclarando:
  - “El estado es gestionado por SISOC” y canal de consulta (referente).
- Si no hay datos del período:
  - mostrar estado “Sin información” + texto de orientación.

## Flujos y pantallas
- Pantalla A: **Prestación alimentaria (Período actual)** → (CTA) Ver historial
- Pantalla B: **Historial de períodos** → (tap) abrir período
- Pantalla C: **Detalle del período** (solo lectura)

## Auditoría y trazabilidad (eventos mínimos)
- `pa_view_current_period`
- `pa_view_history`
- `pa_view_period_detail` (period_id)

## Criterios de aceptación (BDD)

**Escenario: ver período actual**
- Dado un usuario con permiso de ver prestación alimentaria  
- Cuando ingresa al módulo “Prestación Alimentaria”  
- Entonces visualiza el período actual, estado y fechas (si existen)

**Escenario: ver historial**
- Dado que existen períodos anteriores  
- Cuando el usuario toca “Ver Historial”  
- Entonces ve la lista de períodos con su estado

**Escenario: ver detalle de período**
- Dado que el usuario selecciona un período del historial  
- Cuando abre el período  
- Entonces visualiza el detalle en modo solo lectura
