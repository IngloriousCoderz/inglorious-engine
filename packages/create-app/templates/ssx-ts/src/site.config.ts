import { SiteConfig } from "@inglorious/ssx"

const siteConfig: SiteConfig = {
  title: "My SSX App",
  meta: {
    description: "Built with @inglorious/ssx",
  },
  // SSX includes image optimization by default
  vite: {
    server: {
      port: 3000,
    },
  },
}

export default siteConfig
