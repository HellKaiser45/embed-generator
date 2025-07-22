# Qwik City static-site app with tailwind based ui ⚡️

- [Qwik Docs](https://qwik.dev/)
- [DaisyUI](https://daisyui.com/)
- [tailwindcss](https://tailwindcss.com/docs/installation/using-vite)

---

## Add Integrations and deployment

Use the `bun qwik add` command to add additional integrations. Some examples of integrations includes: Cloudflare, Netlify or Express Server, and the [Static Site Generator (SSG)](https://qwik.dev/qwikcity/guides/static-site-generation/).

```shell
bun qwik add # or `bun qwik add`
```

## Development

Development mode uses [Vite's development server](https://vitejs.dev/). The `dev` command will server-side render (SSR) the output during development.

```shell
npm start # or `bun start`
```

> Note: during dev mode, Vite may request a significant number of `.js` files. This does not represent a Qwik production build.

## Preview

The preview command will create a production build of the client modules, a production build of `src/entry.preview.tsx`, and run a local server. The preview server is only for convenience to preview a production build locally and should not be used as a production server.

```shell
bun preview # or `bun preview`
```

## Production

```shell
bun run qwik add static
```

Select Adapter: Static site (.html files). Done!

The adapters/static/vite.config.ts file also includes the SSG config, which would be custom for each implementation.

The URL origin, which is a combination of the scheme (protocol) and hostname (domain). For example, <https://qwik.dev> has the protocol https:// and domain qwik.dev. However, the origin does not include a pathname.

The origin is used to provide a full URL during Static Site Generation (SSG), and to simulate a complete URL rather than just the pathname. For example, in order to render a correct canonical tag URL or URLs within the sitemap.xml, the origin must be provided too.

If the site also starts with a pathname other than /, please use the base option in the Vite config options (the basePathname option in the Qwik City config options is deprecated).

The production build will generate client and server modules by running both client and server build commands. The build command will use Typescript to run a type check on the source code.

```shell
bun build # or `bun build`
```
