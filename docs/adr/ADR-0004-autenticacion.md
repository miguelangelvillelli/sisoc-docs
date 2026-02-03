# ADR-0004 · Autenticación para App Móvil (MVP)

!!! info "Estado"
    **ID:** ADR-0004  
    **Título:** Autenticación para App Móvil (MVP)  
    **Estado:** Propuesto  
    **Fecha:** 2026-02-03  
    **Responsable:** ARQ_Nav / DEV_Impl / SEC_Shield  
    **Nivel:** Interno

## Contexto
El MVP requiere que referentes/usuarios internos de los espacios accedan a una app móvil para consultar y operar funciones (nómina, rendiciones, etc.).  
SISOC ya existe como webapp para técnicos, con backoffice Django y BD MySQL. La autenticación actual podría estar orientada a usuarios internos/técnicos.  
Necesitamos una estrategia de auth consistente para móvil, que no rompa el esquema existente y habilite RBAC server-side con trazabilidad.

**Drivers (qué importa más)**
- Seguridad (control de acceso)
- Rapidez para MVP (time-to-market)
- Reutilización de infraestructura existente (Django)
- Mantenibilidad (evitar doble auth)
- Experiencia de usuario simple (móvil)

---

## Decisión
**Se decide (propuesto):** implementar autenticación para la app móvil mediante **JWT Bearer**, emitido por el backoffice Django, con refresh token si aplica.

- La app enviará `Authorization: Bearer <token>` a `/api/mobile/v1/*`.
- Los permisos se aplican server-side (RBAC).
- La API expone `GET /me` para contexto de usuario y scope (space_id, rol, jurisdicción).

**Alcance de la decisión**
- Aplica a: API móvil (`/api/mobile/v1/`) y pantallas de acceso (login/selector/hub).
- No aplica a: autenticación web interna existente (técnicos) salvo decisión explícita de unificar.

---

## Alternativas consideradas

### Opción A — JWT Bearer (recomendada)
- **Pros:** estándar para móvil; no depende de cookies/CSRF; desacopla UI; simple de testear.
- **Contras:** requiere endpoints de emisión/refresh; gestión de expiración y revocación.

### Opción B — Session + Cookies (reutilizar login web)
- **Pros:** reutiliza Django session.
- **Contras:** menos ideal en móvil; CSRF; manejo de cookies; más fricción.

### Opción C — OAuth / SSO corporativo
- **Pros:** robusto a largo plazo.
- **Contras:** demasiado pesado para MVP; requiere infraestructura extra.

---

## Consecuencias

### Positivas
- Flujo móvil claro y compatible con RBAC server-side.
- Facilita instrumentación y auditoría por request (user_id/space_id).

### Negativas / costos
- Implementar refresh/expiración y política de sesión.
- Definir provisioning de usuarios “espacio” (alta, vinculación a space_id).

### Impactos
- **UX:** pantalla de login y estados de sesión.
- **Backend:** endpoints auth, middleware de permisos, `GET /me`.
- **QA:** smoke de login, expiración, roles.
- **Seguridad:** política de expiración, rotación refresh, rate limit (si aplica).

---

## Criterios de éxito / validación
- Un usuario con rol de espacio puede loguear y consumir `GET /me`.
- Un usuario sin permisos recibe 403 consistentemente.
- Tokens expiran y el refresh funciona (si se implementa).

---

## Pendientes / preguntas abiertas (reunión viernes)
- ¿SISOC ya usa JWT en algún módulo o solo sessions?
- ¿Cómo se crean/provisionan usuarios de espacios?
- ¿Se exige 2FA/OTP? (probablemente no en MVP)
- ¿Cómo se revoca acceso ante baja/cambio?

---

## Referencias
- RBAC: `docs/02_roles_y_accesos/rbac.md`
- Contratos API: `docs/05_api/contratos-v0.md`
- Plan QA: `docs/06_calidad/plan-qa-smoke.md`
- Integración SISOC: `docs/adr/ADR-0003-integracion-sisoc-existente.md`
