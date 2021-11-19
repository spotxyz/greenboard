const fs = require('fs')
const path = require('path')

let options = {
  path: 'data',
  prefix: '/',
};

exports.onPreInit = ({ reporter }, pluginOptions) => {
  options = { ...options, ...pluginOptions };

  // Make sure the directory exists
  if (!fs.existsSync(options.path)) {
    reporter.panic(`Directory not found - Make sure that "${options.path}" is a directory and it exists.`)
  }
}

// Creating a page with  docs/index.md file
exports.createPages = async ({ actions, graphql, reporter }) => {
  const result = await graphql(`
    query {
      allMarkdownRemark(filter: {
        fileAbsolutePath: { regex: "/${options.path}/" }
      }) {
        edges {
          node {
            fileAbsolutePath
            frontmatter {
              title
            }
          }
        }
      }
    }
  `)
  console.log(JSON.stringify(result));

  if (result.errors) {
    reporter.panic("Missing required parameters (Make sure your markdown has title)")
    return
  }

  result.data.allMarkdownRemark.edges.forEach(({ node }) => {
    const basePath = path.posix.join(options.prefix, node.fileAbsolutePath.slice(options.path.length, -3))
    const docTemplate = require.resolve(`./src/templates/docs.jsx`)

    actions.createPage({
      path: basePath,
      component: docTemplate,
      context: {
        fileAbsolutePath: node.fileAbsolutePath,
      },
    })
  });

}
