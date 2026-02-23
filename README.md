# @shevky/base

Shared base utilities and types used across Shevky core and plugins.

## What is this?

This package provides small, stable utilities and shared TypeScript types
that other Shevky packages depend on. It is published as ESM and includes
type definitions.

## Install

```bash
npm install @shevky/base
```

## Usage

```js
import { plugin } from "@shevky/base";

// schema helpers
plugin.isSchemaType("job-listing"); // true
plugin.schema.JOB_LISTING; // "job-listing"
```

## Plugin API Quick Reference

- Hooks: `dist:clean`, `assets:copy`, `content:load`, `content:ready`, `page:meta`
- Schema types:
  - `post`
  - `job-post`
  - `job-listing`
  - `page`
  - `home`
  - `about`
  - `contact`
  - `help`
  - `faq`
  - `press`
  - `collection`
  - `policy`
- Collection types: `tag`, `category`, `series`

## License

MIT
