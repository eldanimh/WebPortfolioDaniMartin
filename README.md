<div align="center">

# Daniel Martín Hurtado · Portfolio

**Mi carta de presentación en la web: proyectos, experiencia y quién soy.**

[![Web](https://img.shields.io/badge/web-danimh.dev-6633ee?style=for-the-badge)](https://danimh.dev)
[![Astro](https://img.shields.io/badge/Astro-7-ff5d01?style=for-the-badge&logo=astro&logoColor=white)](https://astro.build)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![AWS](https://img.shields.io/badge/AWS-S3%20%2B%20CloudFront-ff9900?style=for-the-badge&logo=amazonaws&logoColor=white)](https://aws.amazon.com)

![Vista previa del portfolio](docs/preview.webp)

</div>

## Sobre el proyecto

Portfolio personal de **Daniel Martín Hurtado**, estudiante de Ingeniería de Telecomunicaciones (especialidad Audio y Multimedia), apasionado por las redes, la telemática y **Python**.

Es una web estática, rápida y siempre en **modo oscuro**, disponible en **español e inglés**, pensada para cargar al instante y verse bien en cualquier dispositivo. Está desplegada de forma automática en AWS cada vez que subo cambios.

## Características

- **Bilingüe (español / inglés)** con selector `ES | EN` en la cabecera:
  - Español en [danimh.dev](https://danimh.dev) e inglés en [danimh.dev/en/](https://danimh.dev/en/).
  - **Detección automática** del idioma del dispositivo al entrar en la portada.
  - La elección manual se **recuerda durante un año** y tiene prioridad sobre el idioma del dispositivo.
- **Fondo animado** con auroras de color y textura de grano, que se detiene si el dispositivo tiene activado *Reducir movimiento*.
- **Modo oscuro permanente**, independiente de la configuración del dispositivo.
- **Diseño responsive**, de móvil a escritorio, adaptado a la Dynamic Island y al notch del iPhone (`viewport-fit=cover` y áreas seguras).
- **Secciones**: presentación, proyectos, experiencia laboral y sobre mí.
- **Contacto directo** por correo (con asunto en el idioma de la página), LinkedIn y GitHub, y descarga del CV en PDF en cada idioma.
- **SEO internacional**: `lang` en cada página, enlaces `hreflang`, `og:locale` y sitemap con las dos versiones.
- **Metadatos Open Graph** para que se vea bien al compartir el enlace.
- **Accesibilidad**: `aria-label` traducidos, `aria-current` en el idioma activo y textos alternativos en las imágenes.
- **Página 404** propia, en los dos idiomas.
- **Imágenes optimizadas** con `astro:assets` y `sharp`.
- **100 en PageSpeed Insights**: sin JavaScript de terceros, y la detección de idioma se hace en el servidor.
- **Despliegue continuo** con GitHub Actions hacia S3 y CloudFront.

## Stack

| Área            | Tecnología                                                                  |
| :-------------- | :-------------------------------------------------------------------------- |
| Framework       | [Astro](https://astro.build)                                                |
| Idiomas         | [i18n de Astro](https://docs.astro.build/en/guides/internationalization/) + diccionario propio |
| Estilos         | [Tailwind CSS 4](https://tailwindcss.com) y [Flowbite](https://flowbite.com) |
| Tipografía      | [Onest Variable](https://fontsource.org/fonts/onest)                        |
| Imágenes        | `astro:assets` + [sharp](https://sharp.pixelplumbing.com)                   |
| SEO             | [@astrojs/sitemap](https://docs.astro.build/en/guides/integrations-guide/sitemap/) y `robots.txt` |
| Hosting         | AWS S3 + CloudFront + CloudFront Functions                                  |
| CI/CD           | GitHub Actions con autenticación OIDC (sin claves guardadas)                |
| Dominio y DNS   | [danimh.dev](https://danimh.dev), con DNS en Cloudflare                     |

## Estructura

```text
/
├── .github/workflows/          # Despliegue automático a AWS
├── infra/                      # CloudFront Function (no forma parte de la web)
├── public/                     # CV (es/en), favicon, imagen Open Graph y robots.txt
├── src/
│   ├── assets/                 # Imágenes optimizadas por Astro
│   ├── components/
│   │   ├── Home.astro          # ⭐ Toda la portada; la comparten las dos páginas
│   │   ├── Header.astro        # Menú y selector ES | EN
│   │   ├── Footer.astro
│   │   ├── Projects.astro      # Datos de los proyectos en los dos idiomas
│   │   ├── Experience.astro    # Datos de la experiencia en los dos idiomas
│   │   ├── ExperienceItems.astro
│   │   └── ...                 # SocialPill, SectionContainer, Badge
│   ├── i18n/
│   │   ├── ui.ts               # Diccionario de textos en español e inglés
│   │   └── utils.ts            # getLangFromUrl() y useTranslations()
│   ├── icons/                  # Iconos SVG como componentes
│   ├── layouts/                # Layout base (head, SEO, hreflang, fondo animado)
│   ├── pages/
│   │   ├── index.astro         # danimh.dev/     → <Home /> en español
│   │   ├── en/index.astro      # danimh.dev/en/  → <Home /> en inglés
│   │   └── 404.astro           # Página de error
│   └── styles/                 # Tailwind, Flowbite y colores propios
└── astro.config.mjs            # Idiomas, sitemap y Tailwind
```

## Idiomas

Las dos páginas (`pages/index.astro` y `pages/en/index.astro`) muestran el mismo componente `Home.astro`. Cada componente averigua el idioma por su cuenta a partir de la URL (`Astro.url`), así que nadie tiene que pasárselo.

Hay dos tipos de texto, y cada uno se guarda en un sitio:

| Tipo | Ejemplo | Dónde se guarda |
| :--- | :------ | :-------------- |
| Textos de la interfaz | Menú, títulos de sección, botones | [src/i18n/ui.ts](src/i18n/ui.ts), y se usan con `t("clave")` |
| Contenido | Descripción de un proyecto o de una experiencia | Junto a sus datos, como `{ es: "...", en: "..." }` |

```astro
---
import { getLangFromUrl, useTranslations } from "../i18n/utils";

const lang = getLangFromUrl(Astro.url);
const t = useTranslations(lang);
---

<h2>{t("section.projects")}</h2>
<p set:html={t("hero.description")} /> <!-- para textos con HTML, como <strong> o <span> -->
```

### Añadir un texto nuevo

1. Añade la clave en `es` y en `en` dentro de [ui.ts](src/i18n/ui.ts).
2. Úsala con `{t("mi.clave")}`. Si falta la traducción al inglés, se muestra la española.

### Añadir un idioma nuevo

1. Añade el código en `locales` de [astro.config.mjs](astro.config.mjs).
2. Añade el idioma en `languages` y sus textos en `ui` dentro de [ui.ts](src/i18n/ui.ts). El selector de la cabecera lo muestra automáticamente.
3. Crea `src/pages/<código>/index.astro` con `<Home />`.
4. Añade su versión en los datos de proyectos y experiencia.

### Detección automática del idioma

Se hace en una **CloudFront Function** (evento *Viewer Request*), antes de servir la página. Así no hay parpadeo ni JavaScript extra en el navegador:

- Solo se aplica a la portada (`/`). Los enlaces directos a `/en/` o `/` se respetan siempre.
- Si existe la cookie `lang`, se respeta lo que el visitante eligió.
- Si no, se mira la cabecera `Accept-Language`: si el idioma preferido es español, o si la cabecera no viene (como pasa con el buscador de Google), se queda en español. Con cualquier otro idioma, se redirige a `/en/` con un **302**.
- Al pulsar `ES` o `EN`, un pequeño script del [Header](src/components/Header.astro) guarda la cookie `lang` durante un año.

La misma función resuelve las rutas de las subcarpetas en S3: `/en/` sirve `/en/index.html`, y `/en` redirige a `/en/` con un 301.

El código está en [infra/cloudfront-function.js](infra/cloudfront-function.js). No forma parte de la web (no se publica ni lo descarga el navegador); es una copia de la función que está en AWS.

> ⚠️ Cambiar este archivo no actualiza CloudFront. Si lo modificas, pega el código en **CloudFront → Functions → `index-rewrite`** y vuelve a publicarla.

## Puesta en marcha

Requiere **Node.js 22.12 o superior**.

```sh
git clone https://github.com/eldanimh/WebPortfolioDaniMartin.git
cd WebPortfolioDaniMartin
pnpm install
pnpm dev
```

La web quedará disponible en `http://localhost:4321` (español) y `http://localhost:4321/en/` (inglés).

> En local no hay detección automática del idioma, porque esa parte solo existe en CloudFront. El selector `ES | EN` sí funciona.

| Comando           | Acción                                    |
| :---------------- | :---------------------------------------- |
| `pnpm install`    | Instala las dependencias                  |
| `pnpm dev`        | Servidor de desarrollo en `localhost:4321` |
| `pnpm build`      | Genera la versión de producción en `dist/` |
| `pnpm preview`    | Previsualiza la build en local            |

## Despliegue

Cada `push` a `main` ejecuta el workflow de [deploy.yml](.github/workflows/deploy.yml):

1. Instala dependencias y construye el sitio.
2. Se autentica en AWS mediante **OIDC**, sin secretos de larga duración.
3. Sube los archivos con hash (`_astro/`) a S3 con caché inmutable de un año.
4. Sube el resto con revalidación constante.
5. Invalida la caché de CloudFront para que los cambios se vean al momento.

```text
Visitante → Cloudflare (solo DNS) → CloudFront → CloudFront Function (idioma y rutas) → S3
```

> Los archivos de `public/` se publican tal cual en la URL. Usa nombres sin tildes, `ñ` ni espacios (por ejemplo, `daniel-martin-hurtado-cv-es.pdf`). macOS guarda las tildes de los nombres de archivo de otra forma, y la URL no encontraría el archivo.

## Contacto

- Web: [danimh.dev](https://danimh.dev)
- Correo: [dani@danimh.dev](mailto:dani@danimh.dev)
- LinkedIn: [daniel-martin-hurtado](https://www.linkedin.com/in/daniel-martin-hurtado/)
- GitHub: [@eldanimh](https://github.com/eldanimh)

## Licencia

El código de este proyecto se distribuye bajo la licencia [MIT](LICENSE).

El contenido personal (textos, fotografías, logotipos y CV) **no** está cubierto por esta licencia y no se puede reutilizar sin mi permiso.

---

<div align="center">

Hecho con cariño y mucho café por **Daniel Martín Hurtado**

</div>
