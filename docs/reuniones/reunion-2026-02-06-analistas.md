# Sprint 0 — Tareas y responsables (Trello)

!!! info "Estado"
    **Versión:** v0.1  
    **Última actualización:** 2026-02-04  
    **Responsable:** Dirección / Equipo SISOC  
    **Nivel:** Interno

## Objetivo
Dejar listo el proyecto para arrancar Sprint 1 sin bloqueos:
documentación viva + decisiones técnicas mínimas + prototipo UX + setup de repo/infra.

---

## Roles y responsables (para Trello)
- **PO / Coordinación general:** Miguel Angel Villelli  
- **UX / Prototipos Figma:** Florencia Sanpaulo  
- **Validación política / alcance / plazos:** Martín Lepera  
- **Analista funcional (SISOC / datos / procesos):** Camilo (a confirmar)  
- **Backend / API (Django DRF / RBAC / endpoints):** Equipo dev (Mati / Román / a definir)  
- **Frontend PWA (React):** Pablo (con apoyo inicial de Miguel)  
- **Infra / DevOps / ambientes / acceso restringido:** Nacho  
- **Revisión documentación (PR/merge):** Miguel (revisor principal) + suplente (a definir)


---

## Backlog Sprint 0 (Trello)

### Infra / DevOps
- [ ] **[S0-01] Repositorio GitHub + ramas + permisos** (Owner: Miguel)  
  - Definir estrategia de ramas (`main` + `gh-pages`)  
  - Definir revisores obligatorios (PR)  
- [ ] **[S0-02] Acceso restringido al sitio** (Owner: Nacho)  
  - Definir alternativa: GitHub Pages (limitado) vs. hosting privado (AS / VPN / Basic Auth)  
  - Propuesta y decisión documentada
- [ ] **[S0-03] Ambientes dev/staging para API mobile** (Owner: Nacho / equipo backend)  
  - URL / DNS / certificados  
  - Variables de entorno / secretos
- [ ] **[S0-04] CI mínimo** (Owner: Nacho / equipo)  
  - Build/validación docs (mkdocs build)  
  - (Opcional) lint markdown

### Documentación (MkDocs)
- [ ] **[S0-05] Ajustes de MkDocs Material** (Owner: Miguel)  
  - Dark/light mode  
  - Flecha “back to top” (navigation.top)  
  - Mermaid (si se usa) o alternativa (imágenes)
- [ ] **[S0-06] Minuta reunión UX (04/02)** (Owner: Miguel)  
  - Decisiones y pendientes
- [ ] **[S0-07] Preparar paquete “Reunión Técnica”** (Owner: Miguel)  
  - Agenda + lista de preguntas (integración SISOC)
- [ ] **[S0-08] Glosario v0.2** (Owner: Miguel + UX)  
  - Términos: PWA, RBAC, CTA, Hub, mensajes operativos, etc.

### UX (Figma)
- [ ] **[S0-09] Wireflow / navegación final MVP** (Owner: Florencia)  
  - Home (hub) + módulos  
  - Selector de espacio si multi-espacio  
- [ ] **[S0-10] Mockups low-fi + prototipo clickeable** (Owner: Florencia)  
  - Pantallas clave por módulo  
  - Estados vacíos / error / loading
- [ ] **[S0-11] Sistema UI inicial** (Owner: Florencia)  
  - Tipografía, paleta, componentes base (alineado a stack: Tailwind + shadcn)

### Análisis / Funcional
- [ ] **[S0-12] “Existe vs se crea” por módulo (SISOC)** (Owner: Camilo / Miguel)  
  - Nómina / rendiciones / mensajes / documentos  
- [ ] **[S0-13] Confirmar entidad e ID de Espacio** (Owner: equipo SISOC)  
  - Modelos/tablas y relaciones
- [ ] **[S0-14] Definición mínima de permisos RBAC** (Owner: backend + Miguel)  
  - Referente/Interno/Operador/Admin/Org  
- [ ] **[S0-15] Contratos API v0 — revisión** (Owner: backend + Miguel)  
  - Endpoints mínimos + paginación  
  - Estrategia de archivos (descarga/URL firmada)

### Desarrollo (Preparación Sprint 1)
- [ ] **[S0-16] Skeleton PWA** (Owner: Pablo)  
  - Layout base + navegación + placeholders  
- [ ] **[S0-17] Skeleton API mobile** (Owner: backend)  
  - `/api/mobile/v1/health` + `/me` + auth placeholder
- [ ] **[S0-18] Plan Sprint 1 validado** (Owner: Miguel + equipo)  
  - Orden de módulos y entregables

---

## Definición de “Done” Sprint 0
- Docs publicados + estructura estable
- Prototipo UX navegable en Figma (v0)
- Decisión de stack (PWA React + Tailwind + shadcn) confirmada
- Lista de preguntas para SISOC cerrada y lista para reunión
- Ambientes/devops en camino (o decisión tomada con alternativa)
