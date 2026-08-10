/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://svargasanctuary.com',
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      { userAgent: '*', allow: '/' },
    ],
  },
  exclude: ['/api/*'],
  alternateRefs: [
    { href: process.env.NEXT_PUBLIC_SITE_URL || 'https://svargasanctuary.com', hreflang: 'id' },
    { href: (process.env.NEXT_PUBLIC_SITE_URL || 'https://svargasanctuary.com') + '/en', hreflang: 'en' },
  ],
  transform: async (config, path) => {
    return {
      loc: path,
      changefreq: 'weekly',
      priority: path === '/' || path === '/id' || path === '/en' ? 1.0 : 0.7,
    };
  },
};
