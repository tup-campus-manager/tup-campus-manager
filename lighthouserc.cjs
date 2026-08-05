module.exports = {
  ci: {
    collect: {
      url: ['http://localhost:4173'],
      startServerCommand: 'npm run preview',
    },
    upload: {
      target: 'filesystem',
      outputDir: './lighthouse-report',
    },
  },
}