+++
title = "Configuration"
description = ""
weight = 2
+++

{{< lead >}}
Customize and tweak Ace using a number of configuration options.
{{< /lead >}}


## Page ordering

By default, pages are sorted on the weight assigned to them in their <code>frontmatter</code>. This is set in <code>config.toml</code>, using <code>orderSectionsby = "weight"</code>. Change this to <code>"title"</code> to sort pages alphabetically based on their title instead. Alternatively, do not assign a weight to any pages and it will also sort them alphabetically on their title.


## Table of contents

By default, a table of contents (ToC) is generated for each page in the right side menu. This can be disabled using:

{{< code >}}
toc = false
{{< /code >}}

in the <code>config.toml</code> or the <code>frontmatter</code> (a page's markdown file) for a page-wide or page-specific disabling of the ToC respectively.


## Logo

An optional site logo can be specified:

{{< code >}}
site_logo = /logo.svg
{{< /code >}}


## Google Analytics

Enable Google Analytics by adding your GA tracking ID to the <code>config.toml</code> file, at:
{{< code >}}
googleAnalytics = "XX-XXXXXXXXX-X"
{{< /code >}}
Where <code>XX-XXXXXXXXX-X</code> is your tracking ID.


## Read more navigation

In <code>config.toml</code> or a page's <code>frontmatter</code>, set <code>disableReadmoreNav = true</code> to disable the prev/next buttons at the bottom of every page.


## Search

Disable search by setting <code>disableSearch = true</code> in <code>config.toml</code>.

The local search feature is based on the content of `index.json`, which is generated based on a configurable template.
Search results are presented as a drop-down list attached to the search input field while typing.


## Custom CSS

You can override the built-in css by using your own. Just put your own css files in the `static` directory of your website (the one in the theme directory also works but is not recommended) and modify the `custom_css` parameter in your config file. The path referenced in the parameter should be relative to the `static` folder. These css files will be added through the `header` partial after the built-in css file.

For example, if your css files are `static/css/custom.css` and `static/css/custom2.css` then add the following to the config file:

```
    [params]
      custom_css = ["css/custom.css","css/custom2.css"]
```
