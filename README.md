# Natighatan

Personal writing site powered by Jekyll and the [Minimal Mistakes theme](https://mmistakes.github.io/minimal-mistakes/).

## Writing a post

Create a Markdown file in `_posts/` using this naming pattern:

```text
YYYY-MM-DD-short-title.md
```

Add front matter at the top:

```yaml
---
title: "A post title"
date: 2026-10-31
categories:
  - Essays
tags:
  - writing
---
```

Then write the post below the closing `---`. The site will generate the post page, archives, tags, and categories automatically.

## Run locally

Install Ruby and Bundler, then run:

```shell
bundle install
bundle exec jekyll serve --livereload
```

Open `http://localhost:4000` in a browser. Changes to posts and pages will be regenerated while the server is running.

## Publish

Commit and push changes to the configured GitHub Pages branch. GitHub Pages will build and publish the site at:

<https://natighatan.github.io>

The build may take a short time before the updated site is visible.

## Main files

- `_posts/` — published writing
- `_pages/` — About and archive pages
- `_config.yml` — site identity and theme configuration
- `_data/navigation.yml` — top navigation
- `assets/` — images and other static assets
