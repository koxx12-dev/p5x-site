## Unnamed p5x site

a quite WIP site all about Persona 5: The phantom X

Any contributions appreciated

# Project structure
- [`assets`](/assets/) - Generic images that should be handled via @responsive-images
- [`data`](/data/) - Customizable data about characters/palaces/weapons/items etc
- [`src`](/src/) - The actual source code
- [`content-collection.ts`](/content-collections.ts) - Config for `@content-collections`, used to nicely package above mentioned data

# Basic Setup
Install [`pnpm`](https://pnpm.io/installation)

run `pnpm install`

# Development Server
run `pnpm dev` and pray it doesn't crash

due to an [`issue`](https://github.com/sdorra/content-collections/issues/602) with [`@content-collections`](https://github.com/sdorra/content-collections) you may need to restart the vite dev server or save [`content-collection.ts`](/content-collections.ts) to reload [`data`](/data/)

# Future thingies
A non-exhaustive list of thingies i may or may not add later
- synergy/confidant/social link page
- weapons for thieves
- banner/event timeline (paimon.moe eque as it looks really cool)
- prerendeirng with astro or full on SSR with solidstart/astro (would require a server tho)

# Star history
[![Star History Chart](https://api.star-history.com/svg?repos=koxx12-dev/p5x-site&type=Date)](https://www.star-history.com/#koxx12-dev/p5x-site&Date)

# Contributors
<a href="https://github.com/koxx12-dev/p5x-site/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=koxx12-dev/p5x-site" />
</a>

Made with [contrib.rocks](https://contrib.rocks).
