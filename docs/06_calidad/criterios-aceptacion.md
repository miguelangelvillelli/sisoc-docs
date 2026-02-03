# Criterios de aceptación (MVP) + Definition of Done

!!! info "Estado"
    **Versión:** v0.1  
    **Última actualización:** 2026-02-03  
    **Responsable:** QA_Test / AS_Bro  
    **Nivel:** Interno

## Objetivo
Unificar el formato y el estándar mínimo para:
- escribir historias/funcionalidades del MVP,
- validar que “está hecho” (DoD),
- asegurar coherencia entre UX, API, seguridad y trazabilidad.

---

## Formato estándar (BDD)
Cada funcionalidad crítica debe tener escenarios BDD en este formato:

**Escenario: <nombre claro>**
- Dado <precondiciones>
- Cuando <acción del usuario o sistema>
- Entonces <resultado observable>
- Y <condiciones adicionales (si aplica)>

### Reglas
- Los “Entonces” deben ser verificables en pantalla o por respuesta API.
- Si hay permisos, debe existir escenario “permiso insuficiente”.
- Si hay estados, debe existir escenario “estado inválido”.
- Si hay archivos, debe existir escenario “archivo inválido”.

---

## Criterios transversales (aplican a todo el MVP)

### RBAC (roles y permisos)
- Ningún rol ve datos de otro espacio si no corresponde.
- Acciones restringidas deben bloquearse con mensaje claro (no 500).
- Debe existir trazabilidad de intentos y acciones relevantes según módulo.

### Auditoría
Para cada acción relevante se registra:
- quién (usuario/rol)
- qué (evento)
- cuándo (timestamp)
- sobre qué (id de espacio, entidad afectada)
- resultado (ok/error)

### UX
- Mobile-first: pantallas sin overflow, botones grandes, textos claros.
- Estados vacíos: “sin datos” con explicación y acción sugerida.
- Errores: mensajes simples, sin jerga técnica.

### Datos
- Validaciones mínimas aplicadas (campos obligatorios, formatos, límites).
- No se pierde información ante fallas previsibles (subida de archivo, mala conexión).

### Seguridad
- Sin secretos en repositorio.
- Controles de acceso del lado servidor (no confiar en front).
- Manejo seguro de archivos (tipo/tamaño), evitando ejecución o formatos peligrosos.

---

## Criterios por módulo (MVP)

## Nóminas
**Escenario: alta mínima**
- Dado un usuario con permiso de crear
- Cuando completa nombre y apellido y guarda
- Entonces la persona se crea y aparece en el listado

**Escenario: búsqueda**
- Dado que existen personas cargadas
- Cuando busco por apellido o documento
- Entonces el listado muestra coincidencias correctas

**Escenario: duplicado probable (documento)**
- Dado que existe una persona con el mismo documento en el espacio
- Cuando intento crear otra con ese documento
- Entonces el sistema muestra advertencia de duplicado probable

**Escenario: import CSV con errores**
- Dado un referente con permiso de importar
- Cuando sube un CSV con filas inválidas
- Entonces se muestra reporte por fila con motivo

---

## Prestación alimentaria (solo visualización en MVP)
**Escenario: ver listado**
- Dado un usuario con permiso de ver
- Cuando ingresa al módulo
- Entonces ve estado y período (o `sin_datos`)

**Escenario: ver detalle**
- Dado un período con información
- Cuando abre el detalle
- Entonces visualiza estado, período, resumen y observaciones

**Escenario: período sin datos**
- Dado que el período no tiene información
- Cuando abre el módulo
- Entonces visualiza `sin_datos` y mensaje claro

---

## Rendiciones
**Escenario: crear borrador**
- Dado un usuario con permiso
- Cuando crea rendición para período X y guarda
- Entonces queda en `borrador`

**Escenario: presentar sin comprobantes**
- Dado un referente y una rendición en `borrador`
- Cuando intenta presentar sin adjuntos
- Entonces el sistema bloquea y solicita adjuntar al menos 1 comprobante

**Escenario: adjuntar comprobante válido**
- Dado una rendición en `borrador` u `observada`
- Cuando sube un PDF/JPG/PNG ≤ 10MB
- Entonces el comprobante queda `cargado`

**Escenario: adjuntar archivo inválido**
- Dado una rendición en estado editable
- Cuando sube un archivo > 10MB o tipo no permitido
- Entonces el sistema rechaza con mensaje claro

**Escenario: re-presentar observada**
- Dado una rendición `observada` con motivo
- Cuando corrige adjuntos y re-presenta
- Entonces vuelve a `presentada`

---

## Definition of Done (DoD) — MVP
Se considera “terminado” cuando:

### Funcional
- Implementación cumple criterios BDD
- Manejo de estados y errores cubierto
- Permisos (RBAC) validados por rol

### Calidad
- Smoke suite pasa (ver “Plan QA Smoke”)
- No hay bugs críticos (crash, pérdida de datos, bypass de permisos)

### Documentación
- Página del módulo actualizada (docs)
- Estados y reglas actualizados si aplica
- ADR creado si hubo decisión relevante o cambio de alcance

### Seguridad y trazabilidad
- Eventos mínimos de auditoría generados
- Validaciones de archivos aplicadas (tipo/tamaño/cantidad)
- No hay secretos ni credenciales en repo

---

## Definition of Ready (DoR) — para comenzar desarrollo
Una historia está “lista para desarrollar” si:
- tiene descripción clara,
- tiene escenarios BDD mínimos,
- define roles/permisos,
- define estados afectados,
- define datos a mostrar/cargar,
- define errores esperables.