import Slugger from 'github-slugger';
import _ from 'lodash';

export const parseCodeBlocks = (ast) => {
  let codeBlock = {}
  const codeBlocks = []
  ast.children.forEach((e) => {
    if (_.includes(["h1", "h2", "h3"], e.tagName)) {
      if (!_.isEmpty(codeBlock)) {
        codeBlocks.push(codeBlock)
      }
      codeBlock = {}
    } else if (_.includes(["pre"], e.tagName)) {
      let property = fetchChildType(e)
      if (property !== "language-json") {
        codeBlock[property] = e
      }
    }
  })
  return codeBlocks
}

const fetchChildType = (code_block) => {
  if (code_block.children[0].properties.className === undefined)
    return false
  return code_block.children[0].properties.className[0]
}

export const remarkHeaders = (ast) => {
  const slugger = new Slugger()

  const newChildren = ast.children.map((element) => {
    if (element.tagName === "h1" || element.tagName === "h2") {
      const id = slugger.slug(element.children[0].value);
      return {
        ...element,
        properties: {
          id,
          className: "remarked-linked-header"
        },
        children: [
          {
            "type": "element",
            "tagName": "a",
            "properties": {
              "href": `#${id}`,
              "ariaHidden": true,
              "className": [
                "anchor"
              ],
            },
          },
          ...element.children
        ]
      }
    }
    return element
  })
  return {
    ...ast,
    children: newChildren
  }
}

export const getLinks = (ast) => {
  const headers = ast.children.filter(el => el.type === 'element' && _.includes(['h1', 'h2'], el.tagName));

  const beautified = headers.map((header) => {
    const link = {};
    link.tagName = header.tagName;
    link.textNode = header.children[1] ? header.children[1].value : '';
    link.id = header.properties.id;
    return link;
  });

  let h2s, h1Element
  const merged = []
  beautified.forEach((heading, index) => {
    if (heading.tagName === "h1") {
      if (h2s !== undefined) {
        merged.push({
          ...h1Element,
          children: h2s
        })
      }
      h2s = []
      h1Element = heading
    } else if (heading.tagName === "h2") {
      h2s.push(heading)
    }
  })
  if (h2s !== undefined) {
    merged.push({
      ...h1Element,
      children: h2s
    })
  }
  return merged
}

export const getSearchableData = (ast) => {
  const searchData = []
  let searchHeader = {}
  ast.children.forEach((e, i) => {
    if (_.includes(["h1", "h2"], e.tagName)) {
      searchHeader = {
        heading: e.children[1].value,
        id: e.properties.id,
      }
    } else if (_.includes(["p", "h3"], e.tagName)) {
      searchData.push({
        id: i,
        searchHeader,
        data: {
          type: e.tagName,
          text: e.children[0].value
        }
      })
    }
  })
  return searchData
}
