# Contexto técnico e integración

!!! info "Estado"
    **Versión:** v0.1  
    **Última actualización:** 2026-02-03  
    **Responsable:** ARQ_Nav / DEV_Impl  
    **Nivel:** Interno

## Contexto
SISOC ya existe como aplicación web para técnicos del Programa, con:

- Base de datos existente (**MySQL**) con información de comedores/espacios
- Backoffice existente (**Django**) que opera sobre esa base y concentra la lógica operativa

El MVP de app móvil para espacios comunitarios se implementa como una **extensión** del ecosistema SISOC.

## Principio clave
La app móvil **no accede directo a la base MySQL**.
Todo consumo y escritura se realiza mediante el **backoffice Django (API)** para garantizar:

- RBAC real (del lado servidor)
- Auditoría y trazabilidad
- Validaciones y estados coherentes
- Control de performance (paginación, filtros, caché)
- Evolución sin romper clientes

## Estrategia de integración (v0)
- Exponer endpoints específicos (DRF u otra capa API en Django) para el MVP:
- 
  - lectura (información institucional, prestación alimentaria, listados)
  - escritura controlada (nóminas, rendiciones) según permisos
- Reutilizar tablas existentes donde aplique.
- Crear tablas nuevas solo si:
  
  - el dato no existe en el esquema actual, o
  - el esquema actual no soporta trazabilidad/adjuntos/estados del MVP

## Compatibilidad y migraciones
- Evitar cambios destructivos en tablas existentes.
- Si se requieren agregados, preferir:
  
  - tablas nuevas relacionadas
  - vistas SQL (MySQL VIEW) para lecturas optimizadas
  - índices para búsquedas críticas

## Implicancias para el MVP
- Información institucional: principalmente **lectura** desde datos ya existentes.
- Prestación alimentaria (MVP): **lectura** (solo visualización).
- Nóminas: puede ser:
  - lectura/escritura si ya existe módulo en backoffice, o
  - nuevo submódulo que persiste y se asocia a “espacio”.
- Rendiciones: casi seguro requiere componentes específicos (archivos, estados, trazabilidad).
