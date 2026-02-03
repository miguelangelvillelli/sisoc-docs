# Análisis Multi-Rol del Proyecto SISOC MVP

!!! info "Documento de análisis"
    **Fecha:** 2026-02-04  
    **Responsable:** Equipo completo SISOC  
    **Estado:** Documento de análisis y planificación inicial  
    **Nivel:** Interno

---

## Resumen ejecutivo

Después de revisar toda la documentación del proyecto SISOC (Legajo de Espacio - MVP), cada rol del equipo ha analizado el proyecto desde su perspectiva especializada. Este documento consolida el análisis, observaciones críticas y planificación propuesta por cada rol.

**Proyecto:** Sistema móvil (app) para espacios comunitarios que gestionen información institucional, nóminas, prestación alimentaria, formación y rendiciones, consumiendo backend Django + MySQL existente (SISOC).

**Contexto:** MVP mobile-first para generar valor rápido en territorio, con enfoque en usabilidad, seguridad y trazabilidad.

---

## 1️⃣ PLAN_Vibe — Orquestador de Sesión

### 🎯 Opinión general
Este proyecto está **bien estructurado** desde la planificación inicial:
- Alcance MVP claro con ADR de decisiones
- User stories con criterios BDD bien definidos
- Roadmap por horizontes evitando feature creep
- Documentación viva (MkDocs) como single source of truth

**Riesgos identificados:**
1. **Dependencias externas no confirmadas**: integración con SISOC existente (schema real, endpoints, autenticación)
2. **Ambigüedad en "Prestación alimentaria"**: solo visualización vs carga mínima
3. **Usuario organización**: concepto propuesto pero sin decisión firme
4. **Storage de archivos**: sin estrategia definida (filesystem/S3/otro)

### 📋 Propuesta de planificación (iteración por valor)

#### **Sprint 0 — Fundación (2 semanas)**
**Objetivo:** Resolver dependencias críticas y establecer base técnica.

**Hitos:**
- ✅ Reunión técnica con equipo SISOC: confirmar schema, endpoints reales, autenticación
- ✅ Definir estrategia de storage (ADR-0005)
- ✅ Setup de entorno dev (repo, CI/CD mínimo, linting, tests)
- ✅ Diseño de arquitectura C4 (contexto + containers + componentes)
- ✅ Spike técnico: API Django + mobile (React Native/Flutter) + autenticación JWT
- ✅ Setup de auditoría base (log events)

**Entregables:**
- ADR actualizados con decisiones confirmadas
- Diagrama arquitectónico
- Repo con estructura base funcional
- Ambiente de desarrollo listo

---

#### **Sprint 1 — Acceso + Contexto (2 semanas)**
**Objetivo:** Usuario se autentica, ve su contexto y accede al Home.

**Features:**
- US-0001: Ver contexto usuario (`GET /me`)
- US-0002: Selector de espacio (si multi-espacio)
- US-0101: Home con navegación a módulos
- Setup de RBAC base (middleware/decoradores)

**Criterio de éxito:**
- Usuario autentica → ve su espacio → navega a Home → ve módulos disponibles

---

#### **Sprint 2 — Información institucional + Mensajes (2 semanas)**
**Objetivo:** Valor visible mínimo (consulta).

**Features:**
- US-0201: Ver perfil del espacio
- US-0202: Listar documentos
- US-0203: Abrir/descargar documento
- US-0301: Listar mensajes operativos
- US-0302: Ver detalle mensaje

**Criterio de éxito:**
- Usuario ve información básica del espacio y accede a documentos institucionales

---

#### **Sprint 3 — Nóminas (lectura + alta básica) (2 semanas)**
**Objetivo:** Primera funcionalidad de gestión (alta/edición).

**Features:**
- US-0401: Listar nómina con búsqueda y filtros
- US-0402: Ver detalle persona
- US-0403: Alta rápida persona
- US-0404: Editar persona
- Auditoría: `persona_create`, `persona_update`

**Criterio de éxito:**
- Referente puede crear y editar personas desde el teléfono

---

#### **Sprint 4 — Prestación alimentaria + Formación (2 semanas)**
**Objetivo:** Módulos de visualización + gestión liviana.

**Features:**
- Prestación alimentaria (solo visualización):
  - Ver estado y período
  - Ver detalle período
  - Historial
- Formación:
  - Crear actividad
  - Asociar participantes desde nómina
  - Ver listado y detalle

**Criterio de éxito:**
- Usuario visualiza prestaciones y crea/gestiona actividades de formación

---

#### **Sprint 5 — Rendiciones (2 semanas)**
**Objetivo:** Completar MVP funcional.

**Features:**
- Crear rendición (borrador)
- Adjuntar comprobantes
- Presentar rendición
- Ver observaciones y responder

**Criterio de éxito:**
- Referente puede presentar rendición completa con comprobantes desde móvil

---

#### **Sprint 6 — Pulido + QA final (1-2 semanas)**
**Objetivo:** UX, performance, seguridad, smoke tests.

**Tareas:**
- Refinamiento UX (estados vacíos, errores, loading)
- Performance (lazy loading, cache, paginación)
- Smoke tests (plan QA)
- Revisión de seguridad (SEC_Shield)
- Deploy a ambiente de piloto

**Criterio de éxito:**
- App lista para piloto controlado con espacios seleccionados

---

### 🔄 Estrategia de iteración
- **Checkpoints cada 20-40 min** en sesiones de vibe coding
- **Demo al final de cada sprint** con stakeholders (show & tell)
- **WIP limitado**: 1-2 features en paralelo máximo
- **Decisiones no resueltas**: abrir ADR, escalar y no bloquear sprint

---

## 2️⃣ ARQ_Nav — Arquitecto Navegador

### 🏗️ Opinión general
El proyecto tiene **bases sólidas** de arquitectura:
- Separación clara cliente-servidor (app móvil → API Django → MySQL)
- Decisión correcta de no acceso directo a BD desde móvil
- Concepto de auditoría y RBAC desde el diseño

**Alertas arquitectónicas:**
1. **Falta diagrama C4**: necesario para alinear al equipo
2. **Dependencia crítica no confirmada**: schema real de SISOC
3. **Storage de archivos sin definir**: puede ser bloqueante para rendiciones
4. **Autenticación ambigua**: JWT vs Session Django

### 📐 Plan arquitectónico (C4 - propuesta)

#### **Nivel 1 — Contexto**
```
[Usuario Espacio] ─── usa ──→ [App Móvil SISOC]
                                    ↓
                              consume API
                                    ↓
                            [Backend Django SISOC]
                                    ↓
                            accede a datos
                                    ↓
                              [Base de datos MySQL]
                                    ↓
                            almacena archivos
                                    ↓
                        [Storage: S3/Filesystem]
```

#### **Nivel 2 — Containers**
- **App Móvil (React Native/Flutter)**
  - UI/UX + navegación
  - Almacenamiento local mínimo (token, cache)
  - Comunicación vía HTTPS (API REST)

- **Backend Django**
  - API REST endpoints (`/api/mobile/v1/...`)
  - RBAC (permisos por rol y alcance)
  - Auditoría (registro de eventos)
  - Validaciones de negocio
  - Integración con storage

- **MySQL**
  - Esquema existente SISOC + extensiones MVP
  - Transacciones ACID
  - Índices en campos de búsqueda

- **Storage (S3 o equivalente)**
  - Archivos: documentos, comprobantes
  - URLs firmadas con expiración
  - Validación de tipo/tamaño

#### **Nivel 3 — Componentes clave (Backend Django)**
```
API Layer (views/endpoints)
    ↓
Business Logic (services)
    ↓
Data Access (models/repositories)
    ↓
Audit Service (event logging)
    ↓
RBAC Service (permissions)
    ↓
Storage Service (file handling)
```

### 🎯 Decisiones arquitectónicas críticas (para Sprint 0)

#### **1. Autenticación**
**Propuesta:** JWT Bearer Token
- **Pro:** estándar para móvil, stateless, fácil renovación
- **Contra:** requiere refresh token y manejo de expiración
- **Alternativa:** Session Django (más complejo en móvil por cookies/CSRF)

**ADR:** ADR-0004 (Auth móvil) — confirmar con equipo

#### **2. Storage de archivos**
**Propuesta:** S3 (o compatible: MinIO, Google Cloud Storage)
- **Pro:** escalable, URLs firmadas, backup automático
- **Contra:** costo, dependencia externa
- **Alternativa:** Filesystem + Nginx (más simple, menos escalable)

**ADR:** ADR-0005 (Storage archivos) — confirmar con equipo

#### **3. Schema extensión**
**Propuesta:** reutilizar máximo existente, agregar tablas solo si no existen:
- `usuario_espacio` (si no hay relación user-space-role)
- `persona` (nómina, si no existe)
- `actividad_formacion` (si no existe)
- `rendicion` + `comprobante` (si no existen)
- `mensaje_operativo` (si no existe)
- `audit_event` (si no existe mecanismo de auditoría)

**ADR:** ADR-0003 (Integración SISOC existente) — actualizar con decisiones reales

#### **4. API contract**
**Propuesta:** REST + JSON, paginación estándar (`page`, `page_size`, `total`)
- Base path: `/api/mobile/v1/`
- Versionado explícito para evolución sin romper clientes
- Respuestas estandarizadas (error codes, metadata)

**Contrato:** `05_api/contratos-v0.md` — confirmar endpoints reales

---

### 🔥 Riesgos técnicos y mitigaciones

| Riesgo | Probabilidad | Impacto | Mitigación |
|--------|--------------|---------|------------|
| Schema SISOC no compatible | Media | Alto | Reunión técnica Sprint 0, spike de integración |
| Storage no definido | Alta | Alto | Decisión en Sprint 0, priorizar S3 o equivalente |
| Performance con nóminas grandes | Media | Medio | Paginación, índices, lazy loading |
| Conflictos multi-espacio | Baja | Medio | Selector de espacio + cache de contexto |
| Falla de red en territorio | Alta | Alto | Mensajes claros, retry automático, validación offline (Release 2) |

---

### 📊 Interfaces y contratos críticos (para DEV_Impl)

**Endpoints clave Sprint 0-1:**
- `POST /auth/login` → JWT token
- `POST /auth/refresh` → nuevo token
- `GET /me` → contexto usuario (rol + espacios)

**Endpoints Sprint 2:**
- `GET /spaces/{space_id}/profile`
- `GET /spaces/{space_id}/documents`
- `GET /spaces/{space_id}/messages`

**Endpoints Sprint 3:**
- `GET /spaces/{space_id}/persons` (paginado, búsqueda, filtros)
- `POST /spaces/{space_id}/persons`
- `PUT /spaces/{space_id}/persons/{person_id}`

**Endpoints Sprint 4:**
- `GET /spaces/{space_id}/benefits` (prestación alimentaria)
- `POST /spaces/{space_id}/activities` (formación)

**Endpoints Sprint 5:**
- `POST /spaces/{space_id}/claims` (rendiciones)
- `POST /spaces/{space_id}/claims/{claim_id}/attachments`

---

## 3️⃣ DB_Model — Especialista en Modelo de Datos

### 🗄️ Opinión general
El modelo conceptual está **bien pensado** para MVP:
- Entidades claras (Espacio, Persona, Actividad, Rendición, Comprobante)
- Relaciones simples (1:N, N:N via tabla intermedia)
- Auditoría contemplada desde el diseño

**Alertas de datos:**
1. **Schema real desconocido**: nombres de tablas, PKs, FKs reales de SISOC
2. **Índices no definidos**: búsquedas por nombre/apellido/documento pueden ser lentas
3. **Sin estrategia de migraciones**: forward/backward, seeds
4. **Cardinalidad no estimada**: ¿cuántas personas por espacio? ¿cuántos comprobantes por rendición?

### 📋 Propuesta de modelo (extensión SISOC existente)

#### **Entidades nuevas sugeridas (si no existen)**

##### **UsuarioEspacio**
```sql
CREATE TABLE usuario_espacio (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,  -- FK a auth_user
  espacio_id INT NOT NULL,  -- FK a espacios (existente)
  rol ENUM('referente', 'interno') NOT NULL,
  activo BOOLEAN DEFAULT TRUE,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY (user_id, espacio_id),
  INDEX idx_user (user_id),
  INDEX idx_espacio (espacio_id)
);
```

##### **Persona (Nómina)**
```sql
CREATE TABLE persona (
  id INT PRIMARY KEY AUTO_INCREMENT,
  espacio_id INT NOT NULL,  -- FK a espacios
  nombre VARCHAR(100) NOT NULL,
  apellido VARCHAR(100) NOT NULL,
  tipo_documento VARCHAR(10),  -- 'DNI', 'OTRO'
  numero_documento VARCHAR(20),
  fecha_nacimiento DATE,
  genero VARCHAR(20),
  telefono VARCHAR(20),
  domicilio TEXT,
  observaciones TEXT,
  participa_alimentacion BOOLEAN DEFAULT FALSE,
  participa_formacion BOOLEAN DEFAULT FALSE,
  activo BOOLEAN DEFAULT TRUE,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  created_by INT,  -- FK a auth_user
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  updated_by INT,
  INDEX idx_espacio (espacio_id),
  INDEX idx_nombre_apellido (nombre, apellido),
  INDEX idx_documento (tipo_documento, numero_documento),
  INDEX idx_activo (activo)
);
```

##### **ActividadFormacion**
```sql
CREATE TABLE actividad_formacion (
  id INT PRIMARY KEY AUTO_INCREMENT,
  espacio_id INT NOT NULL,
  titulo VARCHAR(200) NOT NULL,
  descripcion TEXT,
  fecha DATE NOT NULL,
  horario TIME,
  lugar VARCHAR(200),
  responsable VARCHAR(100),
  estado ENUM('planificada', 'finalizada', 'cancelada') DEFAULT 'planificada',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  created_by INT,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  updated_by INT,
  INDEX idx_espacio (espacio_id),
  INDEX idx_fecha (fecha),
  INDEX idx_estado (estado)
);
```

##### **ActividadParticipante (tabla intermedia)**
```sql
CREATE TABLE actividad_participante (
  id INT PRIMARY KEY AUTO_INCREMENT,
  actividad_id INT NOT NULL,  -- FK a actividad_formacion
  persona_id INT NOT NULL,  -- FK a persona
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY (actividad_id, persona_id),
  INDEX idx_actividad (actividad_id),
  INDEX idx_persona (persona_id)
);
```

##### **Rendicion**
```sql
CREATE TABLE rendicion (
  id INT PRIMARY KEY AUTO_INCREMENT,
  espacio_id INT NOT NULL,
  periodo VARCHAR(20) NOT NULL,  -- 'YYYY-MM' o rango
  estado ENUM('borrador', 'presentada', 'observada', 'aprobada', 'rechazada') DEFAULT 'borrador',
  observaciones TEXT,
  fecha_presentacion DATETIME,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  created_by INT,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  updated_by INT,
  INDEX idx_espacio (espacio_id),
  INDEX idx_periodo (periodo),
  INDEX idx_estado (estado)
);
```

##### **Comprobante**
```sql
CREATE TABLE comprobante (
  id INT PRIMARY KEY AUTO_INCREMENT,
  rendicion_id INT NOT NULL,  -- FK a rendicion
  archivo_ref VARCHAR(500) NOT NULL,  -- path/url/key de storage
  archivo_nombre VARCHAR(200),
  archivo_tipo VARCHAR(50),  -- 'application/pdf', 'image/jpeg', etc.
  archivo_tamano INT,  -- bytes
  estado ENUM('cargado', 'invalidado', 'validado') DEFAULT 'cargado',
  motivo_invalidacion TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  created_by INT,
  INDEX idx_rendicion (rendicion_id),
  INDEX idx_estado (estado)
);
```

##### **AuditEvent (auditoría)**
```sql
CREATE TABLE audit_event (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  evento VARCHAR(100) NOT NULL,  -- 'persona_create', 'rendicion_submit', etc.
  usuario_id INT,  -- FK a auth_user
  espacio_id INT,  -- contexto
  entidad_tipo VARCHAR(50),  -- 'persona', 'rendicion', etc.
  entidad_id INT,
  metadata JSON,  -- datos adicionales del evento
  timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_evento (evento),
  INDEX idx_usuario (usuario_id),
  INDEX idx_espacio (espacio_id),
  INDEX idx_timestamp (timestamp)
);
```

---

### 🔍 Índices críticos (para performance)

| Tabla | Índice | Justificación |
|-------|--------|---------------|
| persona | `(espacio_id, activo)` | Listado de personas activas por espacio |
| persona | `(nombre, apellido)` | Búsqueda por nombre |
| persona | `(tipo_documento, numero_documento)` | Detección duplicados |
| actividad_formacion | `(espacio_id, fecha)` | Listado cronológico |
| rendicion | `(espacio_id, estado)` | Filtrado por estado |
| comprobante | `(rendicion_id)` | Carga de adjuntos |
| audit_event | `(timestamp, evento)` | Consultas de auditoría |

---

### 🔥 Hot spots y métricas (para PERF_Tune)

| Hot spot | Cardinalidad estimada | Mitigación |
|----------|----------------------|------------|
| Listado de personas | 50-500 por espacio | Paginación (page_size=20), índice en `activo` |
| Búsqueda por nombre | N/A | Índice compuesto `(nombre, apellido)`, LIKE optimizado |
| Carga de comprobantes | 5-20 por rendición | Eager loading, JOIN optimizado |
| Auditoría | Alta (crecimiento continuo) | Particionamiento por mes (Release 2), retención 1 año |

---

### 📦 Migraciones (estrategia)

**Sprint 0:**
1. Confirmar schema existente SISOC
2. Crear script de migración inicial (Django migrations)
3. Seeds mínimos:
   - Espacios de prueba (3-5)
   - Usuarios de prueba (referente, interno, operador)
   - Personas de prueba (10-20 por espacio)
   - Mensajes operativos (3-5)

**Forward:**
- Cada nueva tabla con `IF NOT EXISTS`
- Columnas nuevas con `ALTER TABLE ADD COLUMN` (no destructivo)

**Backward:**
- DROP TABLE solo en dev
- En prod: marcar deprecated, eliminar en Release siguiente

---

## 4️⃣ DEV_Impl — Implementador Guiado

### 💻 Opinión general
El proyecto tiene **historias bien definidas** con criterios BDD, lo cual facilita implementación incremental. La separación en sprints es pragmática.

**Alertas de desarrollo:**
1. **Falta setup de repo**: estructura de carpetas, linting, tests
2. **Tech stack no definido**: ¿React Native? ¿Flutter? ¿Expo?
3. **Backend existente**: ¿cómo se extiende? ¿Django apps? ¿blueprints?
4. **Sin CI/CD**: necesario para iteración rápida

### 🛠️ Propuesta de stack técnico

#### **Backend (Django)**
- Django 4.2+ (LTS)
- Django REST Framework (DRF) para API
- JWT: `djangorestframework-simplejwt`
- MySQL: `mysqlclient` o `PyMySQL`
- Storage: `django-storages` + boto3 (si S3)
- Auditoría: middleware custom + modelo `AuditEvent`
- Tests: `pytest-django`
- Linting: `black`, `flake8`, `mypy`

#### **Mobile**
- **Opción A (recomendada):** React Native + Expo
  - Pro: comunidad grande, hot reload, fácil deploy
  - Contra: bundle size, performance en listas grandes
- **Opción B:** Flutter
  - Pro: performance nativa, UI consistente
  - Contra: curva de aprendizaje, ecosistema más chico

**Decisión:** definir en Sprint 0 con equipo

#### **CI/CD**
- GitHub Actions o GitLab CI
- Pipeline mínimo:
  - Lint (backend + mobile)
  - Tests unitarios
  - Build (mobile)
  - Deploy a staging (backend)

---

### 📂 Estructura de repo sugerida

```
sisoc/
├── backend/
│   ├── sisoc/                 # Django project
│   │   ├── settings/
│   │   ├── urls.py
│   │   └── wsgi.py
│   ├── apps/
│   │   ├── mobile_api/        # API endpoints MVP
│   │   ├── spaces/            # Espacios (extensión)
│   │   ├── persons/           # Nóminas
│   │   ├── activities/        # Formación
│   │   ├── claims/            # Rendiciones
│   │   ├── audit/             # Auditoría
│   │   └── rbac/              # RBAC middleware
│   ├── tests/
│   ├── requirements.txt
│   └── manage.py
├── mobile/
│   ├── src/
│   │   ├── screens/           # Pantallas por módulo
│   │   ├── components/        # Componentes reutilizables
│   │   ├── services/          # API client
│   │   ├── navigation/        # React Navigation
│   │   ├── store/             # State management (Redux/Zustand)
│   │   └── utils/
│   ├── App.js
│   ├── package.json
│   └── app.json
├── docs/                      # MkDocs (actual)
├── .github/
│   └── workflows/
│       ├── backend-ci.yml
│       └── mobile-ci.yml
└── README.md
```

---

### 🔧 Implementación por sprint (detalle técnico)

#### **Sprint 0 — Setup**
**Backend:**
1. Setup Django project + apps
2. Configurar DRF + JWT
3. Middleware RBAC base
4. Modelo `AuditEvent` + service
5. Tests de integración mínimos

**Mobile:**
1. Init proyecto (Expo/RN)
2. Setup navegación (React Navigation)
3. API client (Axios + interceptors)
4. State management (Redux Toolkit o Zustand)
5. Theme + design system (Tailwind RN / NativeBase)

**Entregable:** repo funcional, login básico (mock), navegación base

---

#### **Sprint 1 — Acceso + Contexto**
**Backend:**
- Endpoint `POST /auth/login` (JWT)
- Endpoint `POST /auth/refresh`
- Endpoint `GET /me` (contexto usuario)
- Middleware RBAC (decorador `@permission_required`)
- Tests: autenticación + contexto

**Mobile:**
- Pantalla Login
- Servicio de autenticación (store token)
- Pantalla Home (navegación a módulos)
- Selector de espacio (si multi-espacio)
- Tests: flujo login → Home

**Commit messages:**
- `feat(auth): add JWT login endpoint`
- `feat(mobile): add Login screen with auth flow`
- `test(auth): add integration tests for login`

---

#### **Sprint 2 — Información institucional + Mensajes**
**Backend:**
- `GET /spaces/{space_id}/profile`
- `GET /spaces/{space_id}/documents`
- `GET /spaces/{space_id}/messages`
- RBAC: verificar acceso al espacio
- Auditoría: `info_view_profile`, `message_view_list`

**Mobile:**
- Pantalla Información institucional
- Pantalla Documentos (lista + detalle)
- Pantalla Mensajes (lista + detalle)
- Manejo de estados: loading, empty, error

**Tests:**
- Backend: permisos, datos correctos
- Mobile: render, navegación

---

#### **Sprint 3 — Nóminas**
**Backend:**
- `GET /spaces/{space_id}/persons` (paginado, búsqueda, filtros)
- `POST /spaces/{space_id}/persons`
- `PUT /spaces/{space_id}/persons/{person_id}`
- Validaciones: nombre+apellido obligatorios, duplicados
- Auditoría: `persona_create`, `persona_update`

**Mobile:**
- Pantalla Lista de nómina (búsqueda + filtros)
- Pantalla Alta/Edición persona
- Pantalla Detalle persona
- Validaciones frontend (mínimas)

**Tests:**
- Backend: CRUD completo, duplicados, permisos
- Mobile: formularios, búsqueda

---

#### **Sprint 4 — Prestación + Formación**
**Backend:**
- `GET /spaces/{space_id}/benefits` (prestación alimentaria)
- `POST /spaces/{space_id}/activities` (formación)
- `GET /spaces/{space_id}/activities`
- `PUT /spaces/{space_id}/activities/{activity_id}`
- `POST /spaces/{space_id}/activities/{activity_id}/participants`

**Mobile:**
- Pantalla Prestación alimentaria (solo lectura)
- Pantalla Lista actividades
- Pantalla Crear/Editar actividad
- Pantalla Gestión participantes

**Tests:**
- Backend: estados, participantes
- Mobile: flujos completos

---

#### **Sprint 5 — Rendiciones**
**Backend:**
- `POST /spaces/{space_id}/claims`
- `POST /spaces/{space_id}/claims/{claim_id}/attachments`
- `PUT /spaces/{space_id}/claims/{claim_id}/submit`
- Storage: upload de archivos (S3 o filesystem)
- Validaciones: tipo/tamaño archivo, mínimo de adjuntos

**Mobile:**
- Pantalla Lista rendiciones
- Pantalla Detalle rendición
- Pantalla Adjuntar comprobante (camera + gallery)
- Presentar rendición (confirm dialog)

**Tests:**
- Backend: upload, estados, permisos
- Mobile: cámara, selección archivos

---

#### **Sprint 6 — Pulido + QA**
**Refinamiento:**
- UX: estados vacíos con ilustraciones/mensajes amigables
- Performance: lazy loading, cache de listados
- Seguridad: rate limiting, validaciones adicionales
- Tests: smoke tests (plan QA)

**Deploy:**
- Backend: staging + prod (gunicorn + nginx)
- Mobile: build release (APK/IPA), TestFlight/Google Play beta

---

### 📏 Estándares de código

#### **Backend (Python/Django)**
- PEP 8 (black formatter)
- Type hints (mypy)
- Docstrings en funciones públicas
- Commits semánticos: `feat`, `fix`, `refactor`, `test`, `docs`

#### **Mobile (JavaScript/TypeScript)**
- ESLint + Prettier
- TypeScript (si se adopta)
- Componentes funcionales + hooks
- PropTypes o TypeScript interfaces

---

## 5️⃣ QA_Test — Pruebas y Calidad

### 🧪 Opinión general
El proyecto tiene **criterios de aceptación BDD** bien definidos, lo cual facilita la generación de tests. La cobertura debe ser pragmática (no 100% pero sí crítica).

**Alertas de QA:**
1. **Sin plan de tests automatizados**: unitarios, integración, E2E
2. **Sin ambiente de staging**: necesario para QA manual
3. **Sin datos de prueba realistas**: seeds limitados
4. **Performance no medida**: latencia, throughput

### 🎯 Estrategia de testing (por capa)

#### **1. Tests unitarios (backend)**
**Qué cubrir:**
- Modelos: validaciones, métodos custom
- Services: lógica de negocio (duplicados, estados)
- Serializers: validaciones, transformaciones

**Herramientas:**
- `pytest-django`
- Factories: `factory_boy`
- Coverage: `pytest-cov` (objetivo: 70%+ en critical paths)

**Ejemplo:**
```python
# tests/persons/test_person_creation.py
def test_create_person_with_duplicate_document(api_client, space, referente_user):
    # Dado que existe una persona con DNI 12345678
    Person.objects.create(space=space, nombre="Juan", apellido="Pérez", numero_documento="12345678")
    
    # Cuando intento crear otra con mismo DNI
    response = api_client.post(f"/api/mobile/v1/spaces/{space.id}/persons", {
        "nombre": "María",
        "apellido": "González",
        "numero_documento": "12345678"
    })
    
    # Entonces el sistema advierte duplicado
    assert response.status_code == 409  # Conflict
    assert "duplicado" in response.json()["error"]["message"]
```

---

#### **2. Tests de integración (backend)**
**Qué cubrir:**
- Endpoints completos (request → response)
- RBAC: permisos correctos por rol
- Auditoría: eventos registrados
- Estados: transiciones válidas

**Herramientas:**
- DRF TestClient
- Fixtures con datos realistas

**Ejemplo:**
```python
def test_referente_can_create_person_but_interno_cannot(api_client, space):
    # Caso 1: referente puede crear
    api_client.force_authenticate(user=referente_user)
    response = api_client.post(f"/api/mobile/v1/spaces/{space.id}/persons", {...})
    assert response.status_code == 201
    
    # Caso 2: usuario interno sin permiso no puede
    api_client.force_authenticate(user=interno_user_without_permission)
    response = api_client.post(f"/api/mobile/v1/spaces/{space.id}/persons", {...})
    assert response.status_code == 403
```

---

#### **3. Tests E2E (mobile)**
**Qué cubrir:**
- Flujos críticos end-to-end:
  - Login → Home → Ver nómina
  - Login → Crear persona → Ver en lista
  - Login → Crear rendición → Adjuntar → Presentar

**Herramientas:**
- Detox (React Native)
- Appium (alternativa cross-platform)

**Ejemplo (pseudocódigo Detox):**
```javascript
describe('Nómina - Alta persona', () => {
  beforeAll(async () => {
    await device.launchApp();
    await login('referente@test.com', 'password');
  });

  it('debe permitir crear persona desde nómina', async () => {
    await element(by.id('home-nomina-button')).tap();
    await element(by.id('add-person-button')).tap();
    await element(by.id('nombre-input')).typeText('Juan');
    await element(by.id('apellido-input')).typeText('Pérez');
    await element(by.id('save-button')).tap();
    
    await expect(element(by.text('Juan Pérez'))).toBeVisible();
  });
});
```

---

#### **4. Smoke tests (manual) — Plan QA**
Ver `06_calidad/plan-qa-smoke.md` — cubrir:
- Acceso y contexto
- Navegación completa
- CRUD de cada módulo (happy path)
- Estados vacíos
- Errores (red, permisos)

---

### 📊 Cobertura objetivo

| Componente | Cobertura objetivo | Prioridad |
|------------|-------------------|-----------|
| Backend models | 80%+ | Alta |
| Backend services | 75%+ | Alta |
| Backend views (endpoints) | 70%+ | Alta |
| Mobile screens críticas | 60%+ | Media |
| Mobile components | 50%+ | Baja |

---

### 🐛 Estrategia de bugs

**Proceso:**
1. Bug reportado → ticket en backlog
2. FIX_Bug analiza: reproduce, captura contexto, identifica causa raíz
3. Parche mínimo + test de regresión
4. Deploy a staging → QA valida → prod

**Prioridad:**
- **P0 (bloqueante):** no se puede autenticar, no se puede presentar rendición → fix inmediato
- **P1 (crítico):** error en CRUD, permisos incorrectos → fix en 24-48h
- **P2 (menor):** UX mejorable, typos → fix en próximo sprint
- **P3 (nice-to-have):** mejoras visuales → backlog

---

## 6️⃣ SEC_Shield — Seguridad Aplicada

### 🔒 Opinión general
El proyecto contempla **RBAC y auditoría desde el diseño**, lo cual es excelente. Sin embargo, faltan controles específicos de seguridad.

**Alertas de seguridad:**
1. **Autenticación no confirmada**: JWT sin refresh puede exponer tokens largos
2. **Sin rate limiting**: endpoints expuestos a abuso
3. **Archivos sin validación robusta**: tipos MIME, magic bytes, tamaño
4. **Secretos en repo**: riesgo si no se usa `.env` correctamente
5. **Sin HTTPS forzado**: comunicación en claro (dev)
6. **CORS no configurado**: puede bloquear o exponer API

### 🛡️ Baseline de seguridad (MVP)

#### **1. Autenticación y autorización**
✅ **Implementar:**
- JWT con refresh token (expiración corta: 15min access, 7d refresh)
- Middleware RBAC: decorador `@permission_required('space.view_persons')`
- Validar `space_id` en cada request (evitar IDOR: acceso a espacio ajeno)

❌ **Evitar:**
- Tokens en URL (query params)
- Permisos solo en frontend (siempre validar server-side)

**Test de seguridad:**
```python
def test_user_cannot_access_other_space_persons(api_client, user_space_a, space_b):
    api_client.force_authenticate(user=user_space_a)
    response = api_client.get(f"/api/mobile/v1/spaces/{space_b.id}/persons")
    assert response.status_code == 403  # Forbidden
```

---

#### **2. Validación de inputs**
✅ **Implementar:**
- Sanitización de strings (evitar inyección SQL: usar ORM siempre)
- Validación de formatos: email, teléfono, documento (regex)
- Límites de longitud: nombre (100), observaciones (500), etc.
- Validación de archivos:
  - Tipo: solo PDF, JPG, PNG (validar magic bytes, no solo extensión)
  - Tamaño: máx 10MB
  - Nombre: sanitizar (evitar path traversal)

**Ejemplo:**
```python
from magic import from_buffer

def validate_file_upload(file):
    # Validar tamaño
    if file.size > 10 * 1024 * 1024:  # 10MB
        raise ValidationError("Archivo muy grande")
    
    # Validar tipo (magic bytes)
    mime = from_buffer(file.read(1024), mime=True)
    if mime not in ['application/pdf', 'image/jpeg', 'image/png']:
        raise ValidationError("Tipo de archivo no permitido")
    
    # Sanitizar nombre
    safe_name = secure_filename(file.name)
    return safe_name
```

---

#### **3. Manejo de secretos**
✅ **Implementar:**
- Variables de entorno (`.env` + `.env.example`)
- NO commitear:
  - `SECRET_KEY`
  - `DATABASE_PASSWORD`
  - `AWS_SECRET_ACCESS_KEY`
  - `JWT_SECRET`
- Usar `python-decouple` o `django-environ`
- Rotar secretos cada 90 días (política)

**`.env.example`:**
```
SECRET_KEY=your-secret-key-here
DATABASE_URL=mysql://user:password@localhost:3306/sisoc
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
JWT_SECRET_KEY=
```

---

#### **4. HTTPS y CORS**
✅ **Implementar:**
- HTTPS forzado en producción (Nginx + Let's Encrypt)
- CORS configurado:
  - Permitir solo dominios conocidos (app móvil: wildcard limitado)
  - Métodos: `GET, POST, PUT, DELETE`
  - Headers: `Authorization, Content-Type`

**Django settings:**
```python
CORS_ALLOWED_ORIGINS = [
    "https://app.sisoc.gob.ar",  # producción
    "http://localhost:19006",  # Expo dev
]
SECURE_SSL_REDIRECT = True  # forzar HTTPS
SECURE_HSTS_SECONDS = 31536000  # HSTS
```

---

#### **5. Rate limiting**
✅ **Implementar:**
- Límite por IP/usuario:
  - Login: 5 intentos / 5 min
  - API general: 100 req / min
  - Upload: 10 archivos / hora

**Herramientas:**
- `django-ratelimit`
- Nginx rate limiting (complementario)

**Ejemplo:**
```python
from django_ratelimit.decorators import ratelimit

@ratelimit(key='user', rate='100/m', method='ALL')
@permission_required('space.view_persons')
def list_persons(request, space_id):
    ...
```

---

#### **6. Logs y monitoreo**
✅ **Implementar:**
- Logging de eventos de seguridad:
  - Login fallido (3 intentos → alerta)
  - Acceso denegado (403)
  - Upload de archivo rechazado
- NO loguear:
  - Passwords (nunca)
  - Tokens completos (solo últimos 4 chars)
  - Datos sensibles (DNI completo: enmascarar)

**Ejemplo:**
```python
import logging
logger = logging.getLogger('security')

# Login fallido
logger.warning(f"Login failed for user {username} from {ip}")

# Acceso denegado
logger.warning(f"Access denied: user {user.id} tried to access space {space_id}")
```

---

### 🔍 Checklist OWASP Top 10 (MVP)

| Riesgo OWASP | Mitigación MVP | Estado |
|--------------|----------------|--------|
| A01 — Broken Access Control | RBAC + validación server-side | ✅ Diseñado |
| A02 — Cryptographic Failures | HTTPS + JWT + secrets en .env | ⚠️ Pendiente config |
| A03 — Injection | ORM (no SQL raw) + sanitización | ✅ Por defecto Django |
| A04 — Insecure Design | Arquitectura revisada (ARQ_Nav) | ✅ Diseñado |
| A05 — Security Misconfiguration | Settings prod separados, debug=False | ⚠️ Pendiente deploy |
| A06 — Vulnerable Components | Dependencias actualizadas, Dependabot | ⚠️ Pendiente setup |
| A07 — Identification/Authentication Failures | JWT + refresh + rate limit login | ⚠️ Pendiente implementar |
| A08 — Software/Data Integrity Failures | Validación de archivos (magic bytes) | ⚠️ Pendiente implementar |
| A09 — Logging/Monitoring Failures | Logs de seguridad + auditoría | ✅ Diseñado |
| A10 — Server-Side Request Forgery | No aplica en MVP (no hay SSRF) | N/A |

---

## 7️⃣ UI_UX — Frontend y Accesibilidad

### 🎨 Opinión general
El proyecto tiene **wireflows y pantallas definidas** (`08_wireflows/`), lo cual es una base sólida. La decisión de **mobile-first** es acertada dado el público objetivo (territorio, espacios comunitarios).

**Alertas de UX:**
1. **Sin prototipo navegable**: recomendado para validación temprana con usuarios reales
2. **Estados vacíos no especificados visualmente**: solo textos (faltan ilustraciones/íconos)
3. **Accesibilidad no evaluada**: WCAG no mencionado
4. **Carga de archivos desde móvil**: UX crítica (cámara vs galería vs documentos)

### 📱 Propuesta de design system (MVP)

#### **1. Librería de componentes**
**Recomendación:** Tailwind CSS + componentes nativos (React Native)
- **Alternativa:** NativeBase / React Native Paper

**Componentes base:**
- Botones (primario, secundario, outline, disabled)
- Inputs (text, number, date, search)
- Cards (info, list item, empty state)
- Modals / Bottom sheets
- Loaders (spinner, skeleton)
- Alerts (success, error, warning, info)
- Badges (contadores, estados)

---

#### **2. Paleta de colores (sugerencia)**
```
Primario: #0066CC (azul institucional)
Secundario: #00A86B (verde acción)
Error: #DC3545
Warning: #FFC107
Success: #28A745
Gris claro: #F8F9FA (backgrounds)
Gris medio: #6C757D (textos secundarios)
Negro: #212529 (textos principales)
```

---

#### **3. Tipografía**
- **Familia:** Inter / Roboto (legible en móvil)
- **Tamaños:**
  - Títulos: 24px (bold)
  - Subtítulos: 18px (semibold)
  - Body: 16px (regular)
  - Caption: 14px (regular, gris medio)

---

#### **4. Estados UI (críticos)**

##### **Loading**
- Spinner centrado con texto "Cargando..."
- Skeleton screens en listados (mejor UX que spinner)

##### **Empty (vacío)**
- Ilustración simple o ícono grande
- Mensaje claro: "Aún no hay [recurso]"
- CTA sugerida: "Agregar [recurso]" o "Contactar soporte"

**Ejemplo (Nómina vacía):**
```
[Ícono de personas]
"Aún no hay personas en la nómina"
[Botón: Agregar persona]
```

##### **Error**
- Ícono de alerta
- Mensaje amigable (NO técnico):
  - ❌ "Error 500: Internal server error"
  - ✅ "No pudimos conectarnos. Revisá tu conexión y volvé a intentar."
- Botón "Reintentar"

##### **Sin permiso**
```
[Ícono de candado]
"No tenés permiso para ver esta sección"
[Botón: Volver]
```

---

#### **5. Navegación**

##### **Estructura:**
```
Bottom Tab Navigator (Home nivel superior):
- Home (hub de módulos)
- Perfil/Configuración (secundario)

Stack Navigators (por módulo):
- Información institucional → Documentos → Detalle
- Nómina → Lista → Detalle → Editar
- Formación → Lista → Crear/Editar → Participantes
- Rendiciones → Lista → Detalle → Adjuntar
```

##### **Header:**
- Nombre del espacio (siempre visible)
- Botón "Volver" (< izquierda)
- Acciones contextuales (derecha: ej. "Agregar")

---

#### **6. Formularios (mobile-first)**

**Principios:**
- Inputs grandes (min 48px altura)
- Labels claros encima del input
- Validación en tiempo real (sutil, sin bloquear)
- Mensajes de error debajo del campo (rojo, 14px)
- Teclado correcto según campo:
  - Nombre: texto autocapitalizado
  - Documento: numérico
  - Email: email keyboard
  - Teléfono: tel keyboard

**Ejemplo (Alta persona):**
```
Agregar persona

Nombre *
[Input: Juan                    ]

Apellido *
[Input: Pérez                   ]

Documento (opcional)
Tipo: [Dropdown: DNI ▼]
Número: [Input: 12345678        ]

Participa en:
☑ Prestación alimentaria
☐ Formación

[Botón primario: Guardar]
[Botón secundario: Cancelar]
```

---

#### **7. Carga de archivos (crítico para Rendiciones)**

**Flujo UX:**
1. Usuario toca "Adjuntar comprobante"
2. Bottom sheet con opciones:
   - 📷 Tomar foto
   - 🖼️ Elegir de galería
   - 📄 Seleccionar archivo
3. Preview antes de confirmar
4. Barra de progreso (upload asíncrono)
5. Confirmación: "Archivo adjuntado ✓"

**Validaciones visibles:**
- Tamaño: "Máx. 10MB"
- Tipo: "Solo PDF, JPG o PNG"
- Si falla: mensaje claro + opción de reintentar

---

#### **8. Accesibilidad (WCAG 2.1 AA — básico MVP)**

✅ **Implementar:**
- Contraste mínimo 4.5:1 (textos sobre fondos)
- Tamaño de toque: mín 44x44px (botones/links)
- Labels descriptivos en inputs
- Screen reader support (iOS VoiceOver, Android TalkBack):
  - `accessibilityLabel` en botones
  - `accessibilityHint` en acciones no obvias
- Navegación por teclado (si se soporta teclado externo)

**Ejemplo:**
```jsx
<TouchableOpacity
  accessibilityLabel="Agregar persona a la nómina"
  accessibilityHint="Abre el formulario para crear una nueva persona"
  onPress={handleAddPerson}
>
  <Text>Agregar persona</Text>
</TouchableOpacity>
```

---

#### **9. Microcopys (UX writing)**

**Principios:**
- Claro, conciso, amigable
- Evitar jerga técnica
- Tono institucional pero cercano (vos/usted según política)

**Ejemplos:**

| Situación | Microcopy propuesto |
|-----------|---------------------|
| Login fallido | "Usuario o contraseña incorrectos. Volvé a intentar." |
| Sin conexión | "No pudimos conectarnos. Revisá tu conexión y reintentá." |
| Rendición presentada | "Rendición presentada con éxito. Te avisaremos si hay observaciones." |
| Documento no encontrado | "Este documento no está disponible. Contactá a tu técnico territorial." |
| Persona creada | "Persona agregada a la nómina ✓" |

---

## 8️⃣ FIX_Bug — Cazador de Errores

### 🐛 Opinión general
Aún no hay bugs (proyecto nuevo), pero es crítico establecer **proceso de debugging** desde Sprint 0.

### 🔧 Propuesta de workflow de bugs

#### **1. Reproducción**
- Usuario/QA reporta bug con:
  - Pasos para reproducir
  - Resultado esperado vs actual
  - Screenshots/video
  - Contexto: versión app, OS, usuario/rol
- FIX_Bug intenta reproducir en dev

#### **2. Captura de contexto**
- Stack trace (logs backend)
- Estado de la app (Redux/Zustand state)
- Request/response API (network inspector)
- Datos involucrados (IDs, payload)

#### **3. Causa raíz**
- Análisis: ¿frontend? ¿backend? ¿datos?
- Identificar origen: validación, lógica, permisos, etc.

#### **4. Parche mínimo**
- Fix con cambio mínimo seguro
- Test de regresión (evitar re-ocurrencia)
- Commit: `fix(nomina): validate documento format before save`

#### **5. Verificación**
- Deploy a staging
- QA valida fix
- Deploy a prod

---

### 🔥 Bugs comunes anticipados (MVP)

| Bug probable | Causa | Mitigación preventiva |
|--------------|-------|----------------------|
| Login infinito | Token no se guarda | Test: verificar storage |
| Listado vacío (falso) | Paginación incorrecta | Test: mock con datos |
| Upload falla silencioso | Error no capturado | Logs + try/catch en upload |
| Permisos inconsistentes | RBAC no valida en endpoint | Test de permisos por endpoint |
| Crash en foto (iOS) | Permiso de cámara no solicitado | Verificar permisos en mount |

---

## 9️⃣ PERF_Tune — Desempeño

### ⚡ Opinión general
El proyecto aún no tiene código, pero se pueden anticipar **cuellos de botella** y optimizar desde el diseño.

### 🎯 Hot spots anticipados

#### **1. Backend**
| Hot spot | Problema | Solución |
|----------|----------|----------|
| Listado de personas (500+) | Query lenta sin índices | Índice en `(espacio_id, activo)`, paginación |
| Búsqueda por nombre | LIKE sin índice | Índice en `(nombre, apellido)` |
| Carga de comprobantes (N+1) | Query por cada comprobante | `select_related` / `prefetch_related` |
| Auditoría masiva | Inserts lentos | Bulk insert, async celery (Release 2) |

#### **2. Mobile**
| Hot spot | Problema | Solución |
|----------|----------|----------|
| Lista de 500 personas | Render lento | FlatList + `getItemLayout` + memo |
| Imágenes grandes | App pesada | Compresión antes de upload |
| Re-renders innecesarios | Estado global cambia | React.memo + selectores |

---

### 📊 Métricas objetivo (MVP)

| Métrica | Objetivo | Herramienta |
|---------|----------|-------------|
| API response time (p95) | < 500ms | New Relic / Datadog |
| Listado nómina (100 items) | < 300ms | Chrome DevTools |
| Upload archivo (5MB) | < 10s | Monitor manual |
| App bundle size (Android) | < 30MB | Expo build |
| Tiempo de login | < 2s | Manual |

---

### 🔧 Optimizaciones Sprint 6

**Backend:**
- Query profiling (Django Debug Toolbar)
- Índices verificados (EXPLAIN ANALYZE)
- Cache de listados frecuentes (Redis, opcional MVP)

**Mobile:**
- Lazy loading de imágenes (react-native-fast-image)
- Memoización de componentes pesados
- Bundle size optimization (tree shaking)

---

## 🔟 DOCS_Scribe — Documentación Viva

### 📝 Opinión general
La documentación actual es **excelente**:
- MkDocs bien estructurado
- ADRs para decisiones importantes
- Historias con criterios BDD
- Wireflows y contratos API

**Áreas de mejora:**
1. **README del repo**: aún no existe (necesario para onboarding)
2. **Getting started**: instrucciones de setup local
3. **Changelog**: no existe (necesario para releases)
4. **API docs**: contrato v0 bueno, pero falta Swagger/OpenAPI
5. **Runbooks**: cómo debuggear problemas comunes

---

### 📚 Documentación a crear (Sprint 0)

#### **1. README.md (root)**
```markdown
# SISOC — Legajo de Espacio (MVP)

Sistema móvil para espacios comunitarios del programa SISOC.

## Tech stack
- Backend: Django 4.2 + DRF + MySQL
- Mobile: React Native + Expo
- Docs: MkDocs

## Quick start

### Backend
```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env  # configurar variables
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

### Mobile
```bash
cd mobile
npm install
npm start  # Expo dev server
```

### Docs
```bash
cd docs
pip install -r requirements.txt
mkdocs serve
```

## Contribuir
Ver [CONTRIBUTING.md](CONTRIBUTING.md)

## License
[Definir]
```

---

#### **2. CONTRIBUTING.md**
```markdown
# Guía de contribución

## Workflow
1. Branch desde `develop`: `git checkout -b feat/nombre-feature`
2. Commits semánticos: `feat`, `fix`, `refactor`, `test`, `docs`
3. Tests pasan: `pytest` (backend) + `npm test` (mobile)
4. PR a `develop` con descripción clara
5. Review por al menos 1 persona del equipo
6. Merge por maintainer

## Estándares
- Backend: black + flake8 + mypy
- Mobile: ESLint + Prettier
- Commits: conventional commits

## Tests
- Unitarios: obligatorios en backend (services, models)
- Integración: obligatorios en endpoints críticos
- E2E: recomendados en flujos principales

## Documentación
- ADRs para decisiones arquitectónicas
- Actualizar docs/ al cambiar contratos
- README de cada módulo/app
```

---

#### **3. CHANGELOG.md**
```markdown
# Changelog

## [Unreleased]

## [0.1.0] — 2026-03-XX (Sprint 6)
### Added
- Acceso y contexto de usuario
- Información institucional y documentos
- Mensajes operativos
- Nóminas (CRUD + búsqueda)
- Prestación alimentaria (visualización)
- Formación (actividades + participantes)
- Rendiciones (crear + adjuntar + presentar)

### Security
- RBAC implementado
- JWT autenticación
- Validación de archivos

### Known issues
- [Link a GitHub Issues]
```

---

#### **4. API Documentation (Swagger/OpenAPI)**
**Herramienta:** `drf-spectacular`

**Setup:**
```python
# settings.py
INSTALLED_APPS += ['drf_spectacular']

REST_FRAMEWORK = {
    'DEFAULT_SCHEMA_CLASS': 'drf_spectacular.openapi.AutoSchema',
}

# urls.py
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView

urlpatterns += [
    path('api/schema/', SpectacularAPIView.as_view(), name='schema'),
    path('api/docs/', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),
]
```

**Resultado:** Docs interactivas en `/api/docs/`

---

#### **5. Runbooks (troubleshooting)**
**docs/runbooks/troubleshooting.md:**
```markdown
# Troubleshooting

## Backend

### Error: "No module named 'mysqlclient'"
**Causa:** Dependencia de MySQL no instalada
**Solución:**
```bash
# macOS
brew install mysql
pip install mysqlclient

# Ubuntu
sudo apt-get install libmysqlclient-dev
pip install mysqlclient
```

### Error: "Access denied for user"
**Causa:** Credenciales incorrectas en .env
**Solución:** Verificar DATABASE_URL en .env

## Mobile

### Error: "Unable to resolve module"
**Causa:** Cache corrupto
**Solución:**
```bash
npm start -- --reset-cache
```

### App no se conecta a API local
**Causa:** Expo usa red diferente
**Solución:** Usar IP local en API_BASE_URL (no localhost)
```

---

## 📋 Plan de Acción Consolidado

### 🎯 Hitos críticos (roadmap ejecutivo)

| Hito | Fecha objetivo | Entregables clave |
|------|----------------|-------------------|
| **Sprint 0** | Semana 1-2 | Decisiones técnicas + setup repo + arquitectura C4 |
| **Sprint 1** | Semana 3-4 | Login + Home + contexto de usuario |
| **Sprint 2** | Semana 5-6 | Info institucional + Mensajes |
| **Sprint 3** | Semana 7-8 | Nóminas (CRUD) |
| **Sprint 4** | Semana 9-10 | Prestación + Formación |
| **Sprint 5** | Semana 11-12 | Rendiciones completas |
| **Sprint 6** | Semana 13-14 | QA + pulido + deploy piloto |
| **Piloto** | Semana 15+ | Espacios seleccionados en producción |

---

### ⚠️ Dependencias críticas (Sprint 0 — bloqueantes)

1. **Reunión técnica con SISOC**
   - Confirmar schema real (tablas, campos, PKs/FKs)
   - Confirmar estrategia de autenticación
   - Confirmar endpoints existentes (si hay)
   - Definir storage de archivos

2. **Decisiones de tech stack**
   - Backend: confirmar Django + versión + extensiones
   - Mobile: decidir React Native vs Flutter
   - Storage: decidir S3 vs filesystem

3. **Setup de infraestructura**
   - Repo GitHub/GitLab + permisos
   - CI/CD mínimo
   - Ambientes: dev, staging, prod
   - Base de datos: dev local + staging

---

### 🚀 Próximos pasos inmediatos (semana 1)

**Día 1-2:**
- [ ] Agendar reunión técnica con equipo SISOC (ARQ_Nav + DB_Model + DEV_Impl)
- [ ] Crear repo y estructura de carpetas (DEV_Impl)
- [ ] Setup MkDocs en CI (DOCS_Scribe)

**Día 3-4:**
- [ ] Reunión técnica: confirmar dependencias críticas
- [ ] Actualizar ADRs con decisiones reales (DOCS_Scribe)
- [ ] Spike: prueba de concepto Django + React Native + JWT (DEV_Impl)

**Día 5:**
- [ ] Diagrama C4 (ARQ_Nav)
- [ ] Modelo de datos inicial (DB_Model)
- [ ] Plan de seguridad baseline (SEC_Shield)

**Semana 2:**
- [ ] Setup completo: backend + mobile + CI/CD (DEV_Impl)
- [ ] Migraciones iniciales (DB_Model)
- [ ] README + CONTRIBUTING (DOCS_Scribe)
- [ ] Kickoff Sprint 1

---

## 💬 Conclusión del equipo

### ✅ Fortalezas del proyecto
1. **Documentación sólida**: MkDocs + ADRs + historias BDD
2. **Alcance claro**: MVP bien definido, fuera de scope explícito
3. **Enfoque en valor**: mobile-first para territorio
4. **Equipo completo**: roles especializados cubriendo todas las áreas

### ⚠️ Riesgos principales
1. **Dependencias externas**: integración con SISOC existente (schema, API, auth)
2. **Ambigüedades técnicas**: storage, tech stack móvil, autenticación
3. **Complejidad operativa**: RBAC + auditoría + multi-espacio
4. **UX en territorio**: conectividad limitada, usuarios con baja alfabetización digital

### 🎯 Recomendaciones finales
1. **Priorizar Sprint 0**: resolver dependencias críticas antes de codificar
2. **Iteración corta**: sprints de 2 semanas con demos constantes
3. **Validación temprana**: prototipo navegable + testing con usuarios reales
4. **Documentación viva**: mantener docs actualizados sprint a sprint
5. **Seguridad desde el diseño**: no postergar controles críticos

---

**Equipo SISOC — Listos para comenzar 🚀**

