# Estados UI (vacío, error, permisos) — MVP

!!! info "Estado"
    **Versión:** v0.1  
    **Última actualización:** 2026-02-03  
    **Responsable:** UI_UX / QA_Test  
    **Nivel:** Interno

## Convenciones de mensajes
- Siempre texto corto + acción.
- No mostrar errores técnicos crudos al usuario.
- “Reintentar” disponible cuando sea red/timeouts.

---

## 1) Global

### Sin conexión / timeout
**Mensaje:** “No pudimos conectarnos. Reintentá.”  
**Acción:** Botón “Reintentar” + “Volver”.

### Error inesperado (500)
**Mensaje:** “Ocurrió un problema. Probá de nuevo en unos minutos.”  
**Acción:** “Reintentar”.

### Sin permiso (403)
**Mensaje:** “No tenés permiso para realizar esta acción.”  
**Acción:** “Volver”.

---

## 2) Home
### Sin espacios asignados
**Mensaje:** “No tenés espacios asignados. Contactá al programa.”  
**Acción:** “Cerrar sesión” (opcional).

---

## 3) Documentos
### Vacío
**Mensaje:** “No hay documentos disponibles.”  
**Acción:** “Volver”.

---

## 4) Mensajes
### Vacío
**Mensaje:** “No hay mensajes por ahora.”  
**Acción:** “Volver”.

---

## 5) Nómina
### Vacío
**Mensaje:** “Todavía no cargaste personas.”  
**Acción:** “+ Alta rápida”.

### Duplicado probable (409 o warning)
**Mensaje:** “Esta persona podría existir ya en el espacio.”  
**Acción:** “Ver coincidencias” (opcional) / “Continuar”.

---

## 6) Prestación alimentaria
### Sin datos
**Mensaje:** “No hay información disponible para este período.”  
**Acción:** “Volver”.

---

## 7) Formación
### Vacío
**Mensaje:** “No hay actividades cargadas.”  
**Acción:** “Crear actividad”.

---

## 8) Rendiciones
### Vacío
**Mensaje:** “No hay rendiciones cargadas.”  
**Acción:** “Volver” (o “Crear” si se habilita).

### No puede presentar (sin adjuntos)
**Mensaje:** “Para presentar la rendición debés adjuntar al menos 1 comprobante.”  
**Acción:** “Adjuntar comprobante”.
