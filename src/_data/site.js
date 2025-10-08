export default {
  name: "Terido Coaching",
  description: "Professional coaching services for personal and business development",
  url: process.env.NODE_ENV === 'production' ? 'https://teridocoaching.com' : 'http://localhost:8080',
  lang: 'en',
  author: {
    name: 'Terido Coaching',
    email: 'info@teridocoaching.com'
  },
  buildTime: new Date()
};