const siteUrl =
  process.env.NODE_ENV === 'production'
    ? process.env.SITE_URL || process.env.URL || 'https://teridocoaching.com'
    : 'http://localhost:8080';

export default {
  name: "Terido Coaching",
  description: "Professional coaching services for personal and business development",
  url: siteUrl,
  lang: 'en',
  author: {
    name: 'Terido Coaching',
    email: 'info@teridocoaching.com'
  },
  buildTime: new Date()
};