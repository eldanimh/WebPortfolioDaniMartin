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

Es una web estática, rápida y siempre en **modo oscuro**, pensada para cargar al instante y verse bien en cualquier dispositivo. Está desplegada de forma automática en AWS cada vez que subo cambios.

## Características

- **Modo oscuro permanente**, independiente de la configuración del dispositivo.
- **Diseño responsive**, de móvil a escritorio.
- **Secciones**: presentación, proyectos, experiencia laboral y sobre mí.
- **Contacto directo** por correo, LinkedIn y GitHub, y descarga del CV en PDF.
- **Metadatos SEO y Open Graph** para que se vea bien al compartir el enlace.
- **Imágenes optimizadas** con `astro:assets` y `sharp`.
- **Despliegue continuo** con GitHub Actions hacia S3 y CloudFront.

## Stack

| Área            | Tecnología                                                                  |
| :-------------- | :-------------------------------------------------------------------------- |
| Framework       | [Astro](https://astro.build)                                                |
| Estilos         | [Tailwind CSS 4](https://tailwindcss.com) y [Flowbite](https://flowbite.com) |
| Tipografía      | [Onest Variable](https://fontsource.org/fonts/onest)                        |
| Imágenes        | `astro:assets` + [sharp](https://sharp.pixelplumbing.com)                   |
| Hosting         | AWS S3 + CloudFront                                                         |
| CI/CD           | GitHub Actions con autenticación OIDC (sin claves guardadas)                |
| Dominio         | [danimh.dev](https://danimh.dev)                                            |

## Estructura

```text
/
├── .github/workflows/   # Despliegue automático a AWS
├── public/              # CV, favicon e imagen Open Graph
├── src/
│   ├── assets/          # Imágenes optimizadas por Astro
│   ├── components/      # Header, Footer, Projects, Experience, SocialPill...
│   ├── icons/           # Iconos SVG como componentes
│   ├── layouts/         # Layout base (head, SEO, modo oscuro)
│   ├── pages/           # index.astro
│   └── styles/          # Tailwind y estilos globales
└── astro.config.mjs
```

## Puesta en marcha

Requiere **Node.js 22.12 o superior**.

```sh
git clone https://github.com/eldanimh/WebPortfolioDaniMartin.git
cd WebPortfolioDaniMartin
pnpm install
pnpm dev
```

La web quedará disponible en `http://localhost:4321`.

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
