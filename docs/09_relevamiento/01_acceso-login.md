# 01 — Ficha de relevamiento — Acceso / Login

!!! info "Metadatos"
    **Fecha:** AAAA-MM-DD  
    **Fuente:** Captura UI (Login) + Relevamiento  
    **Versión:** v0.2  
    **Owner:** Producto (SISOC) + UX  

## 1) Objetivo
Permitir el acceso a la plataforma desde el teléfono de forma simple y segura, autenticando contra SISOC y aplicando permisos (RBAC) del lado del servidor.

## 2) Pantalla actual (según captura)
Estructura general: **card centrada** con branding, campos y CTA.

### 2.1 Encabezado / branding
- **Avatar / ícono** con letra (ej: “S”) dentro de un cuadrado con borde redondeado.
- Título: **SISOC**
- Subtítulo: **Legajo de Espacio**
- **Toggle modo oscuro/claro** (ícono luna) en esquina superior derecha.

### 2.2 Formulario
- Label: **Usuario**
  - Input con placeholder: **“Ingresá tu usuario”**
- Label: **Contraseña**
  - Input con placeholder: **“Ingresá tu contraseña”**
- CTA principal: botón **“Ingresar”** (ancho completo)

### 2.3 Caja “Demo”
- Bloque informativo debajo del botón:
  - “**Demo: usuario: demo / contraseña: demo**”
- Nota: este bloque debe existir **solo en ambiente demo/dev** (no en prod).

### 2.4 Pie
- Texto inferior: “**SISOC · MVP Legajo de Espacio · 2026**”

## 3) Controles y comportamiento (UX)
- El CTA “Ingresar” debe estar **deshabilitado** si falta usuario o contraseña (recomendado).
- Al enviar:
  - estado loading: “Ingresando…” + deshabilitar inputs/CTA
  - error: mensaje claro y visible (sin tecnicismos)
- En móvil: teclado correcto
  - Usuario: `text` (o `email` si corresponde)
  - Contraseña: `password`

## 4) Datos a confirmar con SISOC (técnico/negocio)
- ¿Qué es “Usuario”?
  - DNI / email / username SISOC / otro (TBD)
- ¿Existe recuperación de contraseña?
  - Si existe, agregar link “¿Olvidaste tu contraseña?”
- Tipo de autenticación:
  - JWT Bearer (recomendado PWA) vs Session Django (TBD)

## 5) Reglas de negocio post-login
- Login OK → evaluar espacios asignados:
  - 0 espacios → pantalla “Sin espacios asignados” + orientación
  - 1 espacio → Home (Hub)
  - >1 espacio → Selector de espacio
- Permisos (RBAC) se aplican server-side.

## 6) Errores y mensajes
- **401** credenciales inválidas → “Usuario o contraseña incorrectos.”
- **403** sin permisos / usuario bloqueado → “No tenés permisos para acceder.”
- **Sin red / timeout** → “No pudimos conectarnos. Reintentá.”
- **500** servidor → “Ocurrió un problema. Probá de nuevo.”

## 7) Seguridad mínima
- No loguear contraseñas ni tokens.
- HTTPS obligatorio.
- Rate limit / lockout por intentos fallidos (si SISOC lo soporta) (TBD).

## 8) Auditoría mínima (eventos)
- `auth_login_attempt`
- `auth_login_success`
- `auth_login_failed` (motivo)
- `auth_logout` (si aplica)

## 9) Fuera de alcance (Release 2)
- 2FA (SMS/Email) si no existe hoy.
- Login biométrico.
- Autoregistro.

## 10) Pendientes (TBD) — para cerrar en reunión técnica
- Identificador exacto de “Usuario”
- Estrategia de auth (JWT/Session)
- Recupero de contraseña
- Política de expiración / refresh
- Visibilidad del bloque “Demo” por ambiente
