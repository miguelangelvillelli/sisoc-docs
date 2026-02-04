# Fuera de alcance (Release 2+)

!!! info "Estado"
    **Versión:** v0.2  
    **Última actualización:** 2026-02-04  
    **Responsable:** Equipo SISOC  
    **Nivel:** Interno

!!! warning "Regla"
    Todo lo que figure en esta página queda **excluido del MVP**.  
    Solo puede incorporarse antes del corte si existe **ADR** aprobado (impacto + costo + riesgo + fecha).

## Propósito
Proteger el MVP de “creep” de alcance. Esta lista define lo que **no** vamos a construir en esta etapa para asegurar entrega rápida, estable y auditable.

---

## 1) Identidad, autenticación y seguridad (no MVP)
- **Registro/alta autónoma** de usuarios del espacio (self-service).
- **Recupero de contraseña** avanzado (por SMS/Email) si no existe en SISOC.
- **2FA / MFA** (doble factor).
- **SSO** (OAuth/SAML/IdP corporativo).
- Gestión avanzada de sesiones (revocación por dispositivo, “cerrar sesiones” desde app).

## 2) Offline-first y operación sin conectividad (no MVP)
- Operación completa sin internet (caché, colas de sincronización, resolución de conflictos).
- Modo “descarga previa” de documentos para lectura offline.
- Estrategias avanzadas de resiliencia (sync incremental, merge inteligente, etc.).

## 3) Información institucional y convenios (no MVP)
- **Firma digital** dentro de la app.
- Flujos complejos de **alta/baja/renovación** de convenios desde la app.
- **Gestión documental avanzada**:
  - versionado legal,
  - circuitos múltiples,
  - aprobaciones internas complejas,
  - comparador de versiones.
- Redacción/edición de documentos desde la app.

## 4) Mensajes operativos (no MVP)
- Chat bidireccional tipo mensajería (conversación y seguimiento tipo ticket).
- Segmentación avanzada + campañas (reglas complejas por perfil).
- Adjuntar evidencias en mensajes, respuestas del espacio, derivaciones.
- Push notifications completas (FCM/APNs) si no están resueltas por infraestructura.

## 5) Nóminas (no MVP)
- Validación online contra RENAPER u otros servicios (si aplica).
- Dedupe avanzado multi-espacio y prevención de duplicación inter-jurisdiccional (si no existe ya).
- Historial completo por persona (altas/bajas con timeline detallado).
- Carga masiva sofisticada (plantillas múltiples, mapeo interactivo de columnas, reintentos).
- Módulos de “familias”, “grupos convivientes”, relaciones complejas.

## 6) Prestación alimentaria (no MVP)
- Carga/gestión de prestación desde el espacio si no existe en SISOC.
- Exposición de información sensible (montos, detalles de liquidación, datos no autorizados).
- Simuladores, previsiones, conciliaciones y reportes avanzados.

## 7) Formación (no MVP)
- Catálogo completo de cursos con inscripción, cupos, certificados.
- Evaluaciones, asistencia por sesión, tracking detallado.
- Integración con plataformas e-learning (Moodle, Classroom, etc.).
- Certificación digital/credenciales.

## 8) Rendiciones y comprobantes (no MVP)
- OCR / lectura automática de comprobantes.
- Validaciones contables complejas (reglas tributarias, conciliación avanzada).
- Flujos de aprobación multi-etapa con circuitos largos y roles múltiples.
- Gestión avanzada de archivos:
  - versionado de adjuntos,
  - expiración con URLs firmadas complejas,
  - repositorio documental completo.
- Firma digital de rendición y/o actas dentro de la app.

## 9) UX/UI y producto (no MVP)
- Diseño visual final “high fidelity” completo (si el MVP sale con UI base).
- Personalización por provincia/municipio/organización (branding por tenant).
- Accesibilidad AA completa con auditoría formal (se aplica “mínimos razonables” en MVP).

## 10) Analítica y tableros (no MVP)
- Dashboards avanzados para espacios.
- KPIs complejos, reportes exportables, BI, cubos, etc.
- Alertas automáticas basadas en reglas avanzadas.

## 11) Integraciones e infraestructura (no MVP)
- Microservicios nuevos / arquitectura distribuida si no es necesaria.
- Nueva base de datos independiente “solo para móvil” (salvo extensión aprobada).
- Integraciones externas adicionales (WhatsApp API, SMS masivo, proveedores, etc.) sin ADR.
- Multi-ambiente formal completo (dev/stg/prod) si hoy no existe (se define mínimo operativo).

---

## Notas operativas
- “Fuera de alcance” no significa “no se hace nunca”: significa **no en esta etapa**.
- Si aparece un pedido urgente, se responde con:
  - **¿Está en alcance MVP?**
  - si no, **ADR** con impacto en plazo/costo/riesgo y decisión explícita.
