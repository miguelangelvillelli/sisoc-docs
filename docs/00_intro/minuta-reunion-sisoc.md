# Minuta reunión SISOC — Integración App móvil (MVP)

!!! info "Estado"
    **Versión:** v0.1  
    **Fecha reunión:** AAAA-MM-DD  
    **Horario:** HH:MM–HH:MM  
    **Responsable minuta:** ________  
    **Nivel:** Interno

## Participantes
- SISOC: ________
- Equipo App móvil: ________
- Otros: ________

## Objetivo
Cerrar definiciones técnicas/funcionales mínimas para ejecutar el MVP móvil integrado a SISOC (Django + MySQL), sin cambios destructivos.

---

# 1) Decisiones cerradas (lo más importante)

## 1.1 Autenticación
- Esquema: **JWT / Session / OAuth / Otro: ________**
- Endpoints:
  - Login: ________
  - Refresh: ________
  - Perfil/Contexto (`/me`): ________
- Expiración token/sesión: ________
- Consideraciones (CSRF / 2FA / etc.): ________

**Acción inmediata**
- Owner: ________  
- Fecha: ________  
- Nota: ________

---

## 1.2 Identidad del espacio (space_id)
- Modelo/tabla “espacio”: ________
- `space_id` real:
  - tipo (int/uuid): ________
  - nombre de campo/PK: ________
- Campos disponibles para “Perfil del espacio” (mínimo MVP):
  - nombre: ___
  - dirección/localidad: ___
  - provincia/municipio: ___
  - estado institucional: ___
  - contactos: ___

**Acción inmediata**
- Owner: ________  
- Fecha: ________  
- Nota: ________

---

## 1.3 Roles y permisos (RBAC real)
- Roles reales existentes: ________
- Asignación usuario→espacio:
  - FK / tabla intermedia / lógica: ________
- Permisos por rol (mínimo MVP):
  - ver perfil/doc/mensajes: ________
  - nómina crear/editar/baja: ________
  - rendiciones adjuntar/presentar: ________

**Acción inmediata**
- Owner: ________  
- Fecha: ________  
- Nota: ________

---

# 2) Confirmación por módulo (existe vs se crea)

## 2.1 Documentos / convenios
- ¿Existe módulo? **Sí/No**
- Fuente (modelo/tabla): ________
- Storage archivos: filesystem / S3 / otro: ________
- Acceso: URL pública / URL firmada / endpoint descarga: ________
- Tipos permitidos / límites: ________

Decisión: ________  
Pendiente/Acción: Owner ___ / Fecha ___

---

## 2.2 Mensajes operativos
- ¿Existe módulo? **Sí/No**
- Segmentación: espacio / municipio / provincia / otro: ________
- Campos: título / fecha / cuerpo / leído: ________

Decisión: ________  
Pendiente/Acción: Owner ___ / Fecha ___

---

## 2.3 Nómina
- ¿Existe módulo? **Sí/No**
- Fuente (modelo/tabla): ________
- Campos disponibles: ________
- DNI obligatorio: **Sí/No**
- Duplicados: regla actual: ________
- Volumen típico por espacio: ________

Decisión: ________  
Pendiente/Acción: Owner ___ / Fecha ___

---

## 2.4 Rendiciones y comprobantes
- ¿Existe módulo? **Sí/No**
- Fuente (modelo/tabla): ________
- Estados reales rendición: ________
- ¿Quién revisa/aprueba?: ________
- Adjuntos:
  - Storage: ________
  - Tipos/tamaño máximos: ________
  - Estados adjunto (cargado/validado/invalidado) y motivo: ________

Decisión: ________  
Pendiente/Acción: Owner ___ / Fecha ___

---

## 2.5 Prestación alimentaria (solo lectura)
- ¿Existe dato usable para el espacio? **Sí/No**
- Fuente (modelo/tabla): ________
- Campos que se pueden exponer (MVP): ________
- Estados reales: ________
- Sensibilidad / datos prohibidos: ________

Decisión: ________  
Pendiente/Acción: Owner ___ / Fecha ___

---

# 3) Contratos API — decisiones de endpoints
> Completar con nombres reales definidos por SISOC (si cambian los propuestos)

- Base path API: ________
- `GET /me`: Sí/No — Detalle: ________
- Perfil del espacio: endpoint real: ________
- Documentos: endpoint real: ________
- Mensajes: endpoint real: ________
- Nómina: endpoints reales: ________
- Rendiciones/adjuntos/presentación: endpoints reales: ________
- Prestación: endpoint real: ________

**Acción**
- Actualizar `docs/05_api/contratos-v0.md` con nombres reales.  
  Owner: ________ / Fecha: ________

---

# 4) Performance y operación
- Paginación estándar: `page` / `page_size` (máximo): ________
- Volúmenes estimados:
  - espacios: ________
  - personas por espacio: ________
  - documentos: ________
  - mensajes: ________
  - rendiciones: ________
- Índices existentes / recomendados: ________
- Cache permitido (Redis u otro): Sí/No — Detalle: ________

**Acción**
- Ajustar contratos y UI según volúmenes.  
  Owner: ________ / Fecha: ________

---

# 5) Entornos y despliegue
- Dev/Staging URL: ________
- Credenciales de prueba: ________
- Política de migrations en prod: ________
- Proceso de aprobación de cambios: ________

**Acción**
- Crear acceso entorno de prueba para el equipo app.  
  Owner: ________ / Fecha: ________

---

# 6) Lista de pendientes (backlog post-reunión)
| # | Pendiente | Prioridad | Owner | Fecha |
|---|----------|-----------|-------|------|
| 1 |          | Alta/Media/Baja |       |      |
| 2 |          | Alta/Media/Baja |       |      |
| 3 |          | Alta/Media/Baja |       |      |

---

## Próximos pasos acordados
- [ ] Actualizar contratos API v0
- [ ] Ajustar RBAC según roles reales
- [ ] Confirmar alcance de Sprint 1 y cerrar bloqueantes
- [ ] Ejecutar Sprint 1

Firma/ok: ______________________
