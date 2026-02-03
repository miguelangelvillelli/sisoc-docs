# RBAC (Roles y permisos)

!!! info "Estado"
    **Versión:** v0.2  
    **Última actualización:** 2026-02-03  
    **Responsable:** Equipo SISOC  
    **Nivel:** Interno

## Roles (v0)
- **Referente del espacio (Administrador)**: administra usuarios internos del espacio y gestiona la operación.
- **Usuario interno del espacio**: opera funcionalidades delegadas por el referente.
- **Operador territorial / Técnico**: acompaña, valida y visualiza información operativa según asignación territorial.
- **Administrador central**: administración y supervisión con alcance nacional/provincial/municipal según perfil.
- **Usuario de organización (propuesto)**: visualiza (y eventualmente opera) múltiples espacios asociados a una misma organización.

## Principios de permisos
- **Mínimo privilegio**: cada rol ve y hace solo lo necesario.
- **Trazabilidad obligatoria**: acciones relevantes se auditan (ver “Auditoría y trazabilidad”).
- **Alcance territorial**: operador/administrador central deben estar acotados por jurisdicción.
- **Delegación**: el **referente** puede habilitar o restringir acciones del **usuario interno** dentro del espacio.

## Permisos por módulo (resumen)

| Módulo | Referente | Usuario interno | Operador territorial | Admin central | Usuario organización |
|---|---|---|---|---|---|
| Información institucional | Ver | Ver | Ver | Ver/Administrar | Ver |
| Nóminas | Ver/Crear/Editar/Importar | Ver/Crear/Editar (delegado) | Ver/Validar (según proceso) | Ver/Administrar | Ver |
| Prestación alimentaria (MVP) | Ver | Ver (delegado) | Ver/Administrar (interno) | Ver/Administrar | Ver |
| Formación | Ver/Crear/Editar | Ver/Crear/Editar (delegado) | Ver/Validar (según proceso) | Ver/Administrar | Ver |
| Rendiciones | Crear/Adjuntar/Presentar | Crear/Adjuntar (delegado) | Ver/Observar | Ver/Aprobar | Ver |

### Notas por módulo (MVP)

**Prestación alimentaria (MVP)**
- En MVP el espacio **solo visualiza** (no registra carga).
- La administración/actualización de estados y datos se realiza en herramientas internas del Programa (backoffice).
- Se audita la visualización y (si existe) el contacto a soporte.

!!! danger "Alerta de evolución (Release 2)"
    Si se habilita **carga mínima** por parte del espacio en Prestación alimentaria, se debe:
    - abrir ADR específico,
    - revisar permisos (quién carga / quién valida / quién aprueba),
    - reforzar auditoría (alta/edición),
    - definir validaciones y estados, y
    - ajustar UX para evitar carga pesada.

## Reglas de interpretación (para evitar ambigüedad)
- **Ver**: acceso de lectura a listado + detalle dentro del alcance del rol.
- **Crear/Editar**: alta o modificación de registros del espacio (con trazabilidad).
- **Importar**: carga masiva (CSV u otro mecanismo definido) con validaciones y reporte de errores.
- **Validar / Observar / Aprobar**: acciones del circuito institucional (típicamente no disponibles al usuario del espacio en app).

## Checklist mínimo de cumplimiento (RBAC + trazabilidad)
- Cada endpoint/pantalla debe mapear a un permiso.
- Cada acción relevante debe generar evento de auditoría.
- Cada rol debe estar acotado por alcance (espacio / organización / jurisdicción).
