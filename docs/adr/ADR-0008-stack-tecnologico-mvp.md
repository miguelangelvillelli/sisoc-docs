# ADR-0004 · Stack tecnológico MVP (PWA + API SISOC)

!!! info "Estado"
    **Versión:** v0.1  
    **Fecha:** 2026-02-04  
    **Responsable:** Miguel Ángel Villelli  
    **Alcance:** MVP Legajo de Espacio  
    **Decisión:** Aprobación en reunión técnica (viernes)

## Contexto
Se requiere entregar un MVP **mobile-first** para espacios comunitarios que funcione como **consumer** de SISOC (Django + MySQL), minimizando cambios disruptivos y acelerando la salida a producción.

Hay restricción operativa/administrativa para publicar apps en stores (Android/iOS) en plazos cortos.

## Decisión
Se adopta el siguiente stack para el MVP:

- **Frontend:** PWA (React + TypeScript + Vite)
- **UI/Estilos:** TailwindCSS + shadcn/ui (tokens adaptados a identidad institucional)
- **Backend:** Django REST Framework (DRF) sobre SISOC
- **DB:** MySQL existente de SISOC
- **Integración y seguridad:** **API como única vía** (sin acceso directo a DB desde la app)
- **Autenticación (pendiente de confirmación):** JWT Bearer (preferido) o sesión Django (alternativa)

## Justificación
La PWA evita la burocracia y tiempos de publicación en stores, permitiendo distribución por link e instalación mediante manifest.

React + TS + Vite aceleran el ciclo de desarrollo (DX) y reducen errores en UI mediante tipado, habilitando paralelización por pantallas/componentes.

TailwindCSS + shadcn/ui permiten:

- velocidad de implementación (MVP),
- consistencia entre pantallas,
- reducción de deuda de CSS,
- componentes accesibles y editables (no “caja negra”),
- alineación con Figma mediante tokens/paleta/typography.

DRF y MySQL SISOC aprovechan lo existente, reduciendo duplicación de datos y asegurando trazabilidad/roles (RBAC) en el backend.

## Reglas / Guardrails
- La PWA **no** accede directo a MySQL. Todo acceso pasa por **API**.
- 
- Se reutilizan tablas/modelos existentes cuando aplique.
- Se crean tablas nuevas solo si:
    - el dato no existe en el esquema actual, o
    - el esquema actual no soporta trazabilidad / adjuntos / estados requeridos por el MVP.
- Las validaciones de permisos son server-side (RBAC).

## Consecuencias

- Se acelera el time-to-MVP y se reduce el riesgo administrativo de despliegue.
- Se requiere una curva de aprendizaje (React/PWA) en parte del equipo.
- El éxito del MVP depende de exponer/ajustar endpoints en SISOC con contratos claros.

## Riesgos y mitigación
**R1: Curva de aprendizaje React**

- Mitigación: arquitectura simple por pantallas, componentes shadcn/ui, tareas chicas, revisión y checklist de calidad.

**R2: Desalineación Figma ↔ implementación**

- Mitigación: design system MVP basado en shadcn/ui + tokens; evitar layouts/animaciones complejas en MVP.

**R3: Endpoints/datos faltantes**

- Mitigación: Sprint 0 de inventario + mapeo; priorizar read-only primero; ADR para cualquier agregado de modelo/tabla.

## Alternativas consideradas

- **App nativa (Android/iOS):** descartada para MVP por tiempos y burocracia de publicación + doble stack.
- **CSS “a medida” sin framework:** descartado por tiempo y riesgo de inconsistencias/deuda.
- **Material UI / otras librerías cerradas:** posibles, pero se prioriza shadcn/ui por control y facilidad de adaptación.

## Pendientes de cierre (viernes)

- Confirmar método de autenticación (JWT vs sesión).
- Confirmar storage de adjuntos/comprobantes (filesystem vs bucket).
- Definir segmentación de “Mensajes operativos” (general vs por espacio/jurisdicción).
