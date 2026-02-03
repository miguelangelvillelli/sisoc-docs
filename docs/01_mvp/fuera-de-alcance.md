# Fuera de alcance — MVP App móvil (SISOC · Legajo de Espacio)

!!! info "Estado"
    **Versión:** v0.1  
    **Última actualización:** 2026-02-03  
    **Responsable:** PLAN_Vibe / ARQ_Nav  
    **Nivel:** Interno

## Objetivo
Aclarar explícitamente qué **no se implementa** en el MVP para evitar desvíos, cambios de alcance y expectativas incorrectas.

---

## No incluido en el MVP (v0)

### 1) Gestión avanzada por organización (multi-espacio)
- “Usuario organización” con vista consolidada de múltiples espacios.
- Gestión de convenios/relaciones entre una organización y varios espacios.
- Panel comparativo entre espacios.

> Se documenta como evolución (ver ADR-0002).

---

### 2) Flujos complejos de aprobación y circuitos multi-actor
- Circuitos completos de revisión con múltiples instancias y roles (más allá del estado MVP).
- Bandejas de trabajo avanzadas para técnicos/administración central dentro de la app móvil.
- Reglas de “re-trabajo” sofisticadas (versionado, historial por adjunto, etc.).

> En el MVP: el espacio **presenta** y **visualiza estado/observaciones**.

---

### 3) Operación offline (sin conexión)
- Carga y sincronización offline de nóminas, adjuntos o actividades.
- Cola de reintentos y resolución de conflictos de sincronización.

> En MVP: requiere conectividad (con manejo de errores y reintento simple).

---

### 4) Notificaciones push y campañas automatizadas
- Push notifications (Firebase/APNs) y reglas de disparo.
- Segmentación avanzada por jurisdicción/estado/módulo.

> En MVP: se resuelve con “Mensajes” dentro de la app.

---

### 5) Firma digital / validaciones legales avanzadas
- Firma digital de convenios, actas u otros documentos.
- Validación documental legal (OCR, detección fraude, etc.).

---

### 6) Integraciones externas adicionales
- Integración con RENAPER u otros servicios externos desde la app.
- Integraciones con WhatsApp Business API / bots / IVR.

---

### 7) Analítica avanzada / tableros en móvil
- KPIs, gráficos avanzados, dashboards completos dentro de la app.
- Exportaciones avanzadas (PDF/Excel) desde la app.

> En MVP: la app es operativa y de consulta; BI queda para backoffice SISOC.

---

### 8) Gestión completa de usuarios (IAM) desde móvil
- Alta/baja de usuarios compleja, recuperación avanzada, 2FA obligatorio, etc.
- Administración completa de roles/grupos desde el celular.

> En MVP: mínimo necesario para operar (según definición de auth con SISOC).

---

## Qué sí incluye el MVP (para contraste)
- Acceso + selección de espacio (si aplica)
- Home (Hub)
- Información institucional + documentos
- Mensajes operativos
- Nómina mínima (CRUD básico)
- Prestación alimentaria (solo lectura)
- Formación (ABM básico + participantes)
- Rendiciones (adjuntar + presentar + ver estados)

---

## Pendientes para reunión
- Confirmar qué módulos existen ya en SISOC y cuáles se crean.
- Confirmar limitaciones de storage y visualización de archivos en móvil.
