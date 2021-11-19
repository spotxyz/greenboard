module.exports = {
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `data`,
      },
    },
    {
      resolve: `gatsby-greenboard`,
      options: {}
    }
  ],
}
