# No Hello

Hello!

https://nohello.net/

## Translators

We've added language support to the site, but are still working out the best workflow for people to submit translations. (There's a small amount of manual work required on the code side!)

If you'd like to submit a translation, you can find us on [Transifex](https://www.transifex.com/nohello/nohellodotnet/). I _think_ you can suggest translations directly on their site without needing an invite to the organisation, but I'm not sure exactly. Let us know! Let's figure it out.

Either way, open an issue on our GitHub repo, and we'll work out the best way to proceed :)

## Programmers

This project is a [Eleventy](https://www.11ty.dev/) site. If you've used a static site generator before, you're pretty much good to go. If not, take a look through the [Eleventy documentation](https://www.11ty.dev/docs/) to get up to speed.

### Getting Started

It's a JavaScript site, so you'll need `node` installed. Using [nvm](https://github.com/nvm-sh/nvm) will make sure you're using the right version.

```sh
# git clone, etc
yarn        # install dependencies
yarn serve  # run development server
```

Then open [localhost:8123](http://localhost:8123/) in your browser, and you should be ready to disco.

### Making Changes

Unit tests are via Mocha. Nothing too fancy there.

We use UI tests via [Playwright](https://playwright.dev/). To ensure consistency, the snapshots are taken with a Linux container. To run this locally for convenience, you'll need two things installed: [Docker](https://docs.docker.com/desktop/mac/install/) and [act](https://github.com/nektos/act).

Available commands:

```sh
yarn check-snapshots  # do your snapshots match?
yarn update-snapshots # if not, update your snapshots!
```

### Translations

- we use [Transifex](https://www.transifex.com/)
- we use [Transifex CLI](https://github.com/transifex/cli/releases) (currently no `brew` package!)
- the base language is English

Changed base strings? `yarn strings:push`. Updated translations? `yarn strings:pull`.
