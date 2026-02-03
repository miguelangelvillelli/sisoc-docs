# Plan QA Smoke (MVP)

!!! info "Estado"
    **Versión:** v0.1  
    **Última actualización:** 2026-02-03  
    **Responsable:** QA_Test  
    **Nivel:** Interno

## Objetivo
Definir un set mínimo de pruebas **smoke** para validar que el MVP:
- funciona de punta a punta en los flujos críticos,
- no rompe por permisos (RBAC),
- mantiene trazabilidad (auditoría),
- responde bien ante errores comunes (archivos, estados, datos faltantes).

## Alcance
Incluye pruebas de:
- acceso y navegación base,
- Nóminas (alta + búsqueda + import CSV),
- Prestación alimentaria (solo visualización),
- Rendiciones (borrador → adjuntar → presentar → observada → corregir → re-presentar),
- checks mínimos de seguridad y performance percibida.

Fuera de alcance en smoke (se testea en suites posteriores):
- pruebas exhaustivas de compatibilidad multi-dispositivo,
- pruebas de carga/performance a gran escala,
- automatización completa E2E (se puede sumar después).

---

## Precondiciones (setup)
- Usuarios disponibles:
  - Referente del espacio (Administrador)
  - Usuario interno (delegado)
  - Operador territorial / Técnico
  - Administrador central
  - (Opcional) Usuario de organización (propuesto)
- Un espacio con datos de prueba:
  - al menos 5 personas en nómina
  - al menos 1 rendición en borrador
  - al menos 1 rendición observada (si se puede simular)
  - información de prestación alimentaria (un período con datos + un período sin datos)
- Dispositivos:
  - 1 Android gama media/baja
  - 1 navegador desktop (para validar backoffice/soporte si aplica)

---

## Smoke suite (flujos críticos)

### S1 — Login + navegación base
**Rol:** Referente  
**Pasos:**
- Ingresar al sistema
- Ver Home/Dashboard
- Navegar a: Información institucional, Nóminas, Prestación alimentaria, Rendiciones
**Esperado:**
- La navegación responde sin errores
- Se carga contenido (o estado “sin datos” donde corresponda)
- No hay pantallas en blanco
**Auditoría mínima:**
- evento de login (si existe)
- `*_view_list` al entrar a cada módulo

---

### S2 — RBAC: permisos correctos por rol
**Rol:** Usuario interno (delegado)  
**Pasos:**
- Entrar a Nóminas y crear/editar una persona
- Entrar a Rendiciones y adjuntar comprobante
- Intentar “Presentar rendición”
**Esperado:**
- Puede crear/editar persona (si delegado)
- Puede adjuntar comprobante (si delegado)
- **No** puede presentar rendición (solo referente)
- Mensajes de error/permiso claros (sin 500)
**Auditoría mínima:**
- `persona_create` / `persona_update`
- `comprobante_upload`
- intento bloqueado de presentación (si se registra)

---

### S3 — Nóminas: alta individual + búsqueda
**Rol:** Referente  
**Pasos:**
- Crear persona con mínimos (nombre+apellido)
- Editar persona (agregar flags de participación)
- Buscar por apellido y verificar resultado
- Marcar persona como inactiva (si se implementa)
**Esperado:**
- Alta y edición exitosas
- Búsqueda devuelve resultados correctos
- Inactiva no aparece en listados principales (si aplica)
**Auditoría mínima:**
- `persona_create`, `persona_update`, `persona_deactivate` (si aplica)

---

### S4 — Nóminas: importación CSV (OK + errores)
**Rol:** Referente  
**Pasos:**
- Descargar plantilla CSV (si existe)
- Importar CSV válido con 3 filas nuevas
- Importar CSV con 2 filas inválidas (sin apellido, fecha inválida, SI/NO incorrecto)
- Importar CSV con duplicado probable (mismo documento dentro del espacio)
**Esperado:**
- CSV válido: crea registros y muestra resumen OK
- CSV inválido: muestra reporte por fila con motivo
- Duplicado probable: muestra advertencia, no rompe el proceso
**Auditoría mínima:**
- `nomina_import_start`, `nomina_import_result`
- `nomina_export_template_download` (si existe)

---

### S5 — Prestación alimentaria: visualización (con datos + sin datos)
**Rol:** Referente  
**Pasos:**
- Entrar a Prestación alimentaria (período con datos)
- Ver listado/resumen
- Abrir detalle
- Cambiar a período sin datos
**Esperado:**
- Con datos: muestra estado + período + observaciones (si aplica)
- Sin datos: muestra estado `sin_datos` y mensaje claro
- No hay acciones de carga en MVP (solo ver)
**Auditoría mínima:**
- `prestacion_view_list`, `prestacion_view_detail`

---

### S6 — Rendiciones: flujo principal (borrador → adjuntar → presentar)
**Rol:** Referente  
**Pasos:**
- Crear rendición (borrador) para período X
- Intentar presentar sin comprobantes
- Adjuntar 1 comprobante válido (PDF/JPG/PNG)
- Presentar rendición
**Esperado:**
- Presentar sin comprobantes: bloquea y explica (“adjuntá al menos 1 comprobante”)
- Con 1 comprobante: pasa a `presentada`
**Auditoría mínima:**
- `rendicion_create`, `comprobante_upload`, `rendicion_submit`

---

### S7 — Rendiciones: validación de archivos (errores)
**Rol:** Referente  
**Pasos:**
- Subir archivo no permitido (ej. `.exe` o `.zip`)
- Subir archivo > 10MB
- Adjuntar más de 20 archivos (si se puede simular rápido)
**Esperado:**
- Formato no permitido: rechazo con mensaje claro
- >10MB: rechazo con mensaje claro
- >20 archivos: bloqueo con mensaje claro
**Auditoría mínima:**
- `comprobante_upload` solo si se acepta; si se rechaza, registrar error de validación (si aplica)

---

### S8 — Rendiciones: observada → corregir → re-presentar
**Rol:** Referente  
**Precondición:** existe rendición en estado `observada` con observación.  
**Pasos:**
- Abrir rendición observada y leer motivo
- Reemplazar/adjuntar comprobante corregido
- Re-presentar rendición
**Esperado:**
- Se ve observación clara
- Se puede adjuntar/reemplazar
- Se puede re-presentar y vuelve a `presentada`
**Auditoría mínima:**
- `comprobante_upload`
- `rendicion_submit` (re-presentación)

---

## Checks mínimos no funcionales (rápidos)
- **Mensajes de error**: no mostrar errores técnicos crudos al usuario final.
- **Performance percibida**: cada pantalla crítica carga en tiempo razonable en red 4G (sin congelarse).
- **Offline / mala señal**: si no hay soporte offline, al menos mostrar mensaje “sin conexión” y no perder datos.
- **Seguridad básica**: no exponer datos de otros espacios; endpoints respetan RBAC.

---

## Criterio de salida (Go/No-Go)
Se considera “OK para MVP” si:
- pasan S1, S2, S3, S5, S6 (obligatorias),
- S4, S7, S8 sin fallas críticas,
- no hay defectos críticos (crash, pérdida de datos, bypass de permisos, corrupción de estados).

## Registro de evidencias
- Capturas de pantallas clave (por flujo)
- Log de auditoría (muestra de eventos)
- Reporte breve de hallazgos y decisiones (con link a ADR si aplica)
