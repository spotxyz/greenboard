import React, { Component } from 'react';

import RehypeReact from 'rehype-react';

import Pre from './pre';

const renderAst = (codeBlocks, elementsRendered, updateRendered, selectedLanguage) => {
  return new RehypeReact({
    createElement: React.createElement,
    components: {
      'pre': Pre(codeBlocks, elementsRendered, updateRendered, selectedLanguage)
    },
  }).Compiler;
}

export default class Contents extends Component {
  constructor(props) {
    super(props)
    this.codeBlocksRendered = []
    this.renderedCodeBlock = this.renderedCodeBlock.bind(this)
  }

  renderedCodeBlock(index) {
    this.codeBlocksRendered.push(index)
  }

  componentDidMount() {
    this.codeBlocksRendered = []
  }

  componentDidUpdate() {
    this.codeBlocksRendered = []
  }

  render() {
    const { htmlAst } = this.props
    const language = 'shell'
    const codeBlocks = []
    return (
      <div className="content">
        {renderAst(codeBlocks, this.codeBlocksRendered, this.renderedCodeBlock, language)(htmlAst)}
      </div>
    )
  }
}
