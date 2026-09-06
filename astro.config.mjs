// @ts-check
import { defineConfig } from 'astro/config';
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
  build: {
    format: 'directory',
  },
  devToolbar: { enabled: false },
});
