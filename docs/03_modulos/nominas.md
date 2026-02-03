# Nóminas (MVP)

!!! info "Estado"
    **Versión:** v0.1  
    **Última actualización:** 2026-02-03  
    **Responsable:** Equipo SISOC  
    **Nivel:** Interno

## Objetivo del módulo
Permitir que el espacio comunitario gestione la **nómina de personas asistidas** de forma simple desde el teléfono:
- alta y edición básica,
- visualización y búsqueda,
- carga masiva (CSV) como alternativa operativa,
manteniendo trazabilidad y reglas mínimas de calidad de datos.

## Alcance MVP
Entra en MVP:
- Alta individual de persona asistida (registro mínimo)
- Edición de datos básicos
- Búsqueda / listado
- Marcado de “participa en” (prestación alimentaria / formación) como atributos operativos
- Importación CSV (carga masiva) con validaciones y reporte de errores
- Historial de cambios (auditoría)

Fuera de alcance (Release 2):
- Validaciones avanzadas contra padrones externos
- Detección sofisticada de duplicados entre espacios/organizaciones
- Flujos complejos de verificación documental (más allá de campos básicos)
- Segmentaciones y analítica avanzada

## Definiciones
- **Persona**: individuo registrado por el espacio.
- **Nómina del espacio**: conjunto de personas asociadas al espacio.
- **Participación**: relación de la persona con prestaciones (alimentaria) y/o actividades (formación).

## Roles y permisos (RBAC)
- **Referente del espacio**: Ver / Crear / Editar / Importar
- **Usuario interno del espacio**: Ver / Crear / Editar (si el referente delega)
- **Operador territorial / Técnico**: Ver / Validar (según proceso institucional)
- **Administrador central**: Ver / Administrar
- **Usuario de organización (propuesto)**: Ver

## Datos mínimos (MVP)
Campos recomendados (mínimos operativos):
- **Nombre**
- **Apellido**
- **Documento** (tipo + número) *(opcional si la operación decide no forzarlo en MVP)*
- **Fecha de nacimiento** *(opcional)*
- **Género** *(opcional)*
- **Teléfono** *(opcional)*
- **Domicilio / barrio** *(opcional, formato libre en MVP)*
- **Observaciones** *(opcional)*
- Flags:
  - **Asistencia alimentaria** (sí/no)
  - **Participa en formación** (sí/no)
  - **Activo** (sí/no)

!!! warning "Decisión operativa"
    En MVP se recomienda **no bloquear el alta** por falta de DNI para evitar fricción en territorio.
    Si se requiere DNI obligatorio, dejarlo explícito en “Estados y reglas”.

## Reglas de negocio (MVP)
- No se permite crear una persona completamente vacía: **nombre + apellido** como mínimo.
- Si se ingresa **documento**, debe ser numérico y con longitud razonable (regla flexible).
- Una persona puede estar asociada a **alimentación**, a **formación**, o a ambas.
- **Activo = No** oculta a la persona de listados principales (pero permanece en historial/registro).

### Duplicados (regla mínima MVP)
Se implementa detección “sana” sin complicar:
- Si hay **documento**: advertir si existe otra persona con mismo documento **en el mismo espacio**.
- Si no hay documento: advertir duplicado probable si coincide **nombre + apellido + fecha nacimiento** (si existe).
- El sistema muestra advertencia y permite continuar (salvo regla institucional distinta).

> Nota: deduplicación entre espacios/organización queda para Release 2.

## Flujos y pantallas (wireflow)
### 1) Listado
- Buscador por nombre/apellido/documento
- Filtros: Activo / Inactivo; Alimentación; Formación
- CTA: “Agregar persona”
- CTA: “Importar CSV” (solo referente)

### 2) Alta / Edición individual
- Formulario simple (mobile-first)
- Sección “Participación”: Alimentación / Formación
- Guardar

### 3) Detalle de persona
- Datos básicos
- Participación
- Historial de cambios (resumen: “editado por X en fecha Y”)

### 4) Importación CSV (referente)
- Descargar plantilla CSV
- Subir archivo
- Vista de resultados:
  - filas importadas OK
  - filas con error (con motivo)
  - filas con duplicado probable (con advertencia)

## Importación CSV (MVP)
### Plantilla
Columnas sugeridas:
- nombre
- apellido
- tipo_documento (DNI/OTRO)
- numero_documento
- fecha_nacimiento (YYYY-MM-DD)
- telefono
- participa_alimentacion (SI/NO)
- participa_formacion (SI/NO)
- activo (SI/NO)
- observaciones

### Reglas de validación CSV
- nombre y apellido obligatorios
- fecha_nacimiento formato válido si viene informada
- participa_alimentacion / participa_formacion / activo deben ser SI/NO
- documento numérico si existe
- reportar errores por fila con motivo claro

!!! tip "Estrategia MVP"
    Si el CSV se complica en mobile, se habilita como flujo “asistido”:
    el referente puede cargar desde una PC o desde el backoffice, manteniendo el mismo contrato.

## Auditoría y trazabilidad (eventos mínimos)
- `nomina_view_list`
- `persona_create`
- `persona_update`
- `persona_deactivate` (si aplica)
- `nomina_import_start`
- `nomina_import_result` (ok / error / warnings)
- `nomina_export_template_download` (si existe descarga)

## Criterios de aceptación (BDD)

**Escenario: listar y buscar**
- Dado un usuario con permiso de ver nómina
- Cuando ingresa al módulo Nóminas
- Entonces ve el listado de personas activas y un buscador

**Escenario: alta mínima**
- Dado un referente o usuario interno con permiso
- Cuando carga nombre y apellido y guarda
- Entonces se crea la persona y se registra auditoría `persona_create`

**Escenario: editar datos**
- Dado que existe una persona
- Cuando el usuario edita un campo permitido y guarda
- Entonces se actualiza la persona y se registra `persona_update`

**Escenario: advertencia por duplicado (con documento)**
- Dado que existe una persona con el mismo documento en el espacio
- Cuando intento crear otra con ese documento
- Entonces el sistema muestra advertencia de duplicado probable

**Escenario: importar CSV con errores**
- Dado un referente con permiso de importar
- Cuando sube un CSV con filas inválidas
- Entonces el sistema muestra un reporte de filas rechazadas con motivos

**Escenario: importar CSV exitoso**
- Dado un referente con permiso de importar
- Cuando sube un CSV válido
- Entonces se crean/actualizan las personas y se registra `nomina_import_result` con resultado OK

## Alertas y notificaciones (opcional MVP)
- “Recordatorio: actualizá tu nómina” (frecuencia configurable)
- “Se detectaron duplicados probables” (post importación)

## Evolución (Release 2)
- Deduplicación avanzada (entre espacios / por organización)
- Validación documental y flujos de verificación
- Segmentación por grupos familiares / hogar
- Integración con padrones externos (si aplica)
