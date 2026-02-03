# Copilot Instructions — Base Organizacional
Estas reglas se aplican a todos los repos itorios de la organización para mantener consistencia y calidad en el código.
## Estilo
- Commits: feat:, fix:, refactor:, test:, docs:, chore:
- Ramas: feature/<tema>, fix/<issue-id>

## Backend
- Logs estructurados, manejo de errores consistente, idempotencia cuando aplique.
- Tests obligatorios en endpoints/servicios nuevos.

## Frontend
- Next JS o React + Tailwind si corresponde; accesibilidad (WCAG); estados loading/empty/error.

## Datos
- Migraciones forward/back; índices con justificación; seeds reproducibles.

## Seguridad
- Nunca secrets en el repo; validación de inputs; sanitización.

## Done
- Código y tests en verde + docs mínimas actualizadas.
