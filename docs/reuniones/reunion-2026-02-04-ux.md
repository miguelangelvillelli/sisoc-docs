# Minuta de reunión — SISOC · Plataforma móvil para Centros (MVP)

!!! info "Estado"
    **Versión:** v0.2  
    **Última actualización:** 2026-02-04  
    **Responsable:** Equipo SISOC  
    **Nivel:** Interno

## Datos de la reunión
- **Fecha:** 2026-02-04
- **Tema:** Alineación UX + enfoque MVP + stack propuesto + plan de trabajo
- **Formato:** Reunión remota (video)
- **Referencia:** Video “2026 02 04 Reunion UX”

## Asistentes
- **Subsecretario:** Martín Lepera
- **Equipo de UX:** Florencia Sanpaulo
- **Director Nacional:** Miguel Angel Villelli

---

## Objetivo
Alinear el MVP de una **plataforma móvil** para que cada **espacio/centro** (y potencialmente organizaciones) pueda acceder desde el teléfono a información útil vinculada al Programa, utilizando como fuente SISOC (sin backoffice nuevo) y definiendo un enfoque de UX simple, usable y escalable.

---

## Resumen ejecutivo
Se acordó que el producto será **mobile-first** y **consumidor** de SISOC: la app no tendrá backoffice propio y se alimentará de la base y backoffice existentes. El MVP se compone de módulos: información institucional, documentos/convenios, canales de contacto, mensajes operativos, nóminas, prestación alimentaria (principalmente lectura), formación y rendiciones.

Se prioriza **usabilidad y simplicidad** por sobre estética sofisticada. UX desarrollará prototipos interactivos en Figma para validar navegación y pantallas.

A nivel tecnología se impulsa **PWA** para evitar el proceso burocrático de tiendas (Play Store / iOS), con instalación opcional desde el navegador vía manifest. Se propuso stack de frontend React + TypeScript + Vite + Tailwind + shadcn/ui (customizable a Poncho / identidad institucional).

---

## Puntos tratados

### 1) Naming / Identidad del producto

- Se remarcó la necesidad de **ponerle un nombre** al producto para identificarlo como “producto”.
- Se planteó evitar el concepto “legajo” como nombre visible (para no confundir).
- Se definió criterio comunicacional: hacia autoridades se hablará de **“Centro de Familia”** (evitar discusiones internas de nomenclatura).
- Se busca que “SISOC” figure como marca/familia, pero el producto puede tener identidad propia dentro de la misma familia.

### 2) Concepto clave: “Consumer” de SISOC

- La solución será un **consumer**: **sin backoffice nuevo**, consumiendo endpoints/datos expuestos por SISOC.
- Se sostuvo que gran parte del MVP es **organizar y mostrar información existente** (alto porcentaje lectura).

### 3) Alcance MVP (módulos)

Se reafirmó como núcleo del MVP:
- Información institucional (ficha del espacio)
- Documentos / convenios vigentes (PDF/link)
- Canales de contacto (botón WhatsApp por dupla técnica según espacio)
- Mensajes operativos (comunicación oficial dentro de la app)
- Nóminas
- Prestación alimentaria (en principio lectura)
- Formación
- Rendiciones y comprobantes

### 4) RBAC (Roles y accesos)

- Se destacó RBAC como clave del acceso:
    - roles y permisos por módulo (ver/editar/listar/importar/exportar)
- Se reafirmó que Django/SISOC ya tiene base para RBAC (grupos/permisos) y que hay que “enganchar” el consumo desde el frontend.

### 5) Organizaciones vs Espacios (multi-espacio)

- Se planteó que puede haber usuarios “organización” que operen múltiples espacios.
- Se acordó como patrón:
    - si el usuario tiene **más de un espacio**, debe haber **selector desplegable** para elegir el espacio con el que se trabaja.
- Se discutió que, a futuro, organizaciones pueden requerir vistas agregadas/dashboards, pero para MVP se propone iniciar simple e iterar.

### 6) Nóminas: complejidad y propuesta

- Se expuso complejidad: nómina por comedor/espacio y nómina por actividades, y diferencias por organización.
- Propuesta acordada como línea: **una nómina única** con campos/flags (por ejemplo, “asiste a alimentación” / “participa en actividades”), con filtros/exportación según necesidad.

### 7) Decisión tecnológica: PWA vs nativo

- Se acordó preferencia por **PWA**:
    - evita publicación en stores y trámites con Innovación
    - permite “instalar” desde navegador (manifest) y ejecución fullscreen tipo app
- Se acordó discutirlo igual con equipo técnico para confirmación final.

### 8) Framework de UI / diseño

- Se propone usar **Tailwind** por velocidad MVP y compatibilidad con React.
- Se propuso librería **shadcn/ui** (customizable) sobre Tailwind.
- Se remarcó que comunicación puede exigir identidad (Poncho/colores/tipografías), y que esto se puede parametrizar.

### 9) Plan de trabajo / organización

- Se planteó paralelizar:
    - UX avanza prototipos Figma
    - Equipo técnico expone endpoints y define mapping de datos
- Se conversó de armado de equipo:
    - Front (PWA/React): posibilidad de que lo haga Miguel o Pablo con apoyo
    - Back (endpoints/DRF): Mati como back + soporte analista (Camilo) para detalle
- Se propuso foco: cerrar documentación funcional en la semana siguiente y comenzar desarrollo luego.

### 10) Innovación / infraestructura

- Se mencionó reunión con Nacho + Edu Vivas (arquitecto) para encuadre de necesidades hacia Innovación.
- Regla de oro reafirmada: **la PWA no accede directo a MySQL**, todo vía API.

---

## Decisiones y acuerdos (para dejar fijados)

- **D1:** La solución es un **consumer de SISOC** (sin backoffice nuevo).
- **D2:** Enfoque **mobile-first** (100% pensado para móvil y responsive).
- **D3:** Preferencia por **PWA** (evitar stores por tiempos administrativos).
- **D4:** UI basada en **Tailwind + shadcn/ui** (customizable a identidad institucional).
- **D5:** Multi-espacio: si aplica, **selector de espacio** para organizaciones.
- **D6:** Nómina: línea preferida **una sola nómina** con flags/filtros.

---

## Pendientes / preguntas para reunión técnica (viernes)

- Confirmar **modelo/ID real de Espacio** en SISOC.
- Confirmar usuarios para espacios: ¿existen? ¿se crean? ¿flujo de alta?
- Definir auth final: ¿JWT? ¿sesión? ¿refresh?
- Confirmar existencia real de módulos (nómina/rendiciones/mensajes/docs) y sus tablas.
- Confirmar **storage de PDFs/comprobantes** (filesystem/S3/AS) y reglas de descarga.
- Definir segmentación de mensajes: generales vs por espacio/jurisdicción.
- Definir catálogo real de estados (prestación/rendición/espacio) y mapeo a UI.
- Definir límites de archivos (tamaño/tipo/cantidad) y validación.
- Confirmar entorno dev/staging y política de migraciones.

---

## Próximos pasos

- UX: prototipo Figma navegable con pantallas MVP y estados principales.
- Equipo técnico: validar stack PWA + contratos API v0 + data mapping real.
- Dirección: definir naming/producto para presentación (evitar “legajo” como etiqueta pública si aplica).
- Preparar minuta/requerimiento preliminar a Innovación con necesidades mínimas.

## Cierre
Se acuerda continuar con validación técnica el viernes, y con avance de prototipos UX en paralelo.
