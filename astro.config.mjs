// @ts-check
import { defineConfig } from 'astro/config';
import remarkDirective from 'remark-directive';
import remarkLayers from './src/lib/remark-layers.mjs';
import remarkGlossary from './src/lib/remark-glossary.mjs';
import languages from './config/languages.json' with { type: 'json' };
import site from './config/site.json' with { type: 'json' };

const defaultLanguage = languages.find((language) => language.default) ?? languages[0];

// Phase Zero is a fully static site. Every page for every language is generated
// at build time so that search engines, screen readers and browsers without
// JavaScript all get the complete text on the first response.
export default defineConfig({
  site: site.url,
  output: 'static',
  trailingSlash: 'never',
  i18n: {
    defaultLocale: defaultLanguage.code,
    locales: languages.map((language) => language.code),
    routing: {
      // Every language lives under its own prefix, including the default one,
      // so that no language is treated as more canonical than another.
      prefixDefaultLocale: true,
    },
  },
  markdown: {
    // The two content layers, :::detail and :::spoiler, are parsed as
    // directives and rendered as real disclosure elements.
    remarkPlugins: [remarkDirective, remarkLayers, remarkGlossary],
  },
  build: {
    /* Every address this site writes is without a trailing slash, which is
       what trailingSlash above declares. The directory format contradicts it
       on the host the site is published to: Cloudflare Pages serves a
       directory index only at the path with the slash, and answers the path
       without one with a 308 to it. Every canonical link, every hreflang and
       every line of the sitemap pointed at a redirect, and each page then
       declared a canonical that redirected back to the page declaring it.

       The file format writes en/timeline.html instead of en/timeline/index.html,
       and Cloudflare serves that at /en/timeline directly. Checked against the
       one file that was already shaped this way: the Google verification file
       in public/ answers 200 at its extensionless path. */
    format: 'file',
  },
  devToolbar: { enabled: false },
});
