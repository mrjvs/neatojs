# ⚡@neato/config

Load complex configuration from many sources on runtime with type-safety. Check the documentation for more info.


## 🔥Features
- Strictly typed OR loosly typed configurations.
- Complex object configuration.
- Load (partial) configuration from many inputs:
  - From files: `.json`, `.env`.
  - From environment variables.
  - From directory structure (used for i.e docker secrets).
  - From CLI arguments.
- Validate from a Zod or joi schema.


## 🍄Installation / usage

> **Visit the [documentation](https://neatojs.com/docs/config/guide/getting-started) on how to install.**

```sh
npm install @neato/config
```


## 📖Documentation

**Visit the [website](https://neatojs.com/docs/config) for documentation.**


## 🧬 Running locally for development

```sh
npm i -g pnpm # install PNPM if you don't have it already
pnpm i # install dependencies of the entire repo

pnpm -C packages/config run dev # run library dev script in directory
```
