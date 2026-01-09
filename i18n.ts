import { defineConfig } from "next-intl/config"

export default defineConfig({
  locales: ["en", "bn"],
  defaultLocale: "en",
  pathnames: {
    "/": "/",
    "/items": "/items",
    "/items/[slug]": "/items/[slug]",
    "/about": "/about",
    "/terms": "/terms",
    "/cart": "/cart",
  },
})
