# Minuta — Reunión UX (prototipos Figma) · App móvil Legajo de Espacio (MVP)

!!! info "Estado"
    **Versión:** v0.1  
    **Última actualización:** 2026-02-03  
    **Responsable:** UI_UX / PLAN_Vibe  
    **Nivel:** Interno

## Objetivo de la reunión
Salir con un **prototipo navegable en Figma** (MVP) y un set mínimo de definiciones para que el equipo técnico pueda estimar e implementar sin inventar.

---

## Participantes
- UX: (Nombre)
- Producto/Operación: (Nombre)
- Equipo técnico: (si aplica)

---

## Alcance UX a definir (MVP)
La app móvil incluye estas secciones:
- Acceso: Login (si aplica) + Selector de espacio (si multi-espacio)
- Home (Hub)
- Información institucional (perfil + documentos)
- Mensajes operativos (lista + detalle)
- Nómina (lista + detalle + alta rápida + editar)
- Rendiciones (lista + detalle + adjuntar comprobante + presentar)
- Formación (lista + crear/editar + participantes)
- Prestación alimentaria (lectura: estado + historial)

---

## Entregables que necesitamos de UX (salida de la reunión)

### 1) Prototipo navegable (Figma)
Debe estar “clickeable” para:
- entrar (login/selector si aplica),
- navegar desde Home a cada módulo,
- volver, cancelar, confirmar, etc.

### 2) Kit de componentes (mínimo)
- Header con nombre del espacio + menú/back
- Cards/botones del Home
- List item (para personas/documentos/mensajes/rendiciones)
- Filtros + buscador (nómina)
- Empty state / error state / sin permiso
- Modal de confirmación (presentar rendición / baja persona)
- Upload/Adjuntar (rendiciones)

### 3) Estados de UI (obligatorio)
Definir visual y copy para:
- Loading (skeleton o spinner)
- Empty (no hay datos)
- Error de red
- Error 401/403/404
- Validación de formulario (400 con campos)
- Estado “sin espacios asignados”
- Estado “acción solo web” (si import CSV u otra cosa queda fuera)

### 4) Copy / Microcopy base
- Mensajes claros para usuario no técnico (referentes).
- Textos estándar:
  - “No pudimos conectarnos. Reintentá.”
  - “No tenés permisos para esta acción.”
  - “No hay información disponible.”
  - “¿Confirmás presentar la rendición? Luego no vas a poder editar.”

### 5) Navegación: decisiones rápidas
- ¿Bottom navigation (tabs) o Home tipo Hub?
  - Recomendación MVP: **Home (Hub)** + navegación simple.
- ¿Ocultar módulos sin permiso o mostrar deshabilitado?
  - Recomendación: **ocultar** si no aplica; mostrar “solo lectura” cuando corresponda.

---

## Preguntas clave para UX (para cerrar hoy)
- ¿Qué priorizamos visualmente en el Home? (ej: Rendiciones + Mensajes arriba)
- ¿Cómo se resuelven “estados” en tarjetas? (badges: “observada”, “nuevo”)
- Nómina:
  - ¿Alta rápida es modal o pantalla?
  - ¿Edición desde detalle o directo en formulario?
- Rendiciones:
  - ¿Adjuntar archivo desde detalle o pantalla dedicada?
  - ¿Cómo se muestra “observaciones” del técnico?
- Documentos:
  - ¿Abrir dentro de app o descargar?
- Accesibilidad:
  - tamaño de letra mínimo, contraste, botones grandes

---

## Material que UX debe tomar como base
- Wireframes textuales: `docs/08_wireflows/pantallas-mvp.md`
- Plan de sprints: `docs/01_mvp/plan-sprints.md`
- RBAC: `docs/02_roles_y_accesos/rbac.md`

---

## Resultados / decisiones (para completar en reunión)
- Navegación definida: (Hub / Tabs)
- Pantallas confirmadas: (lista)
- Estados UI confirmados: (lista)
- Definición de componentes: (lista)
- Pendientes para técnico: (lista)

---

## Pendientes / acciones
- UX entrega link Figma + export de assets si aplica
- Equipo técnico valida consistencia con RBAC y contratos
- Próxima reunión (técnica): viernes — cerrar auth + modelos reales SISOC + storage archivos
