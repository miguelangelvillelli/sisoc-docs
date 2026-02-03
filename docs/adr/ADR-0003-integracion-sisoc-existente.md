# ADR-0003 · Integración con SISOC existente (API sobre Django)

**Fecha:** 2026-02-03  
**Estado:** Propuesto  
**Decisor/es:** Dirección + Equipo SISOC  

## Contexto
Existe SISOC web con MySQL y backoffice Django. Se incorpora canal móvil para espacios comunitarios.

## Decisión
La app móvil consumirá información exclusivamente mediante endpoints del backoffice Django (API).
No se habilita acceso directo a MySQL desde clientes móviles.

## Consecuencias
- Seguridad: RBAC y auditoría centralizados
- Evolución: cambios de BD no rompen clientes si se mantiene contrato API
- Performance: se controla desde servidor (paginación/caché)
- Desarrollo: se agregan vistas/endpoints específicos para el MVP
