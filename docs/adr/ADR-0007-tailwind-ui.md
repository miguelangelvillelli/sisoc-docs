# ADR-0007 · UI: Tailwind como base de estilos (MVP)

!!! info "Estado"
    **ID:** ADR-0007  
    **Título:** Tailwind como base de estilos (MVP)  
    **Estado:** Propuesto  
    **Fecha:** 2026-02-03  
    **Responsable:** UI_UX / DEV_Impl  
    **Nivel:** Interno

## Contexto
El MVP requiere construir múltiples pantallas con estados (loading/empty/error), responsive y consistencia visual.  
Crear un sistema de estilos/components desde cero implica tiempos altos, riesgo de inconsistencia y deuda visual.

## Decisión
Se adopta Tailwind como base de estilos para el MVP:
- estilos utilitarios con tokens definidos (colores, spacing, tipografía),
- componentes funcionales mínimos (botones, cards, listas, formularios) construidos sobre esos tokens,
- soporte de dark mode bajo configuración estándar.

## Alternativas
- CSS manual + componentes desde cero: mayor costo inicial y riesgo de divergencia.
- Librería UI completa: puede acelerar, pero condiciona look&feel y requiere evaluación (no MVP).

## Consecuencias
- Mayor velocidad y consistencia en MVP.
- Menor CSS disperso y menor deuda visual inicial.
- UX define patrones/tokens; dev implementa rápido con utilidades.
