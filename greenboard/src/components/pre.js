import React from 'react';

import Code from './code';

export default function PreContainer(codeBlocks, elementsRendered, updateRendered, selectedLanguage) {
  return (props) => {
    const codeLanguage = props.children[0].props.className;
    const language = codeLanguage?.split('-')[1];

    return (
      <Code
        code={getCodeFromAst(props)}
        language={language}
      />)
  }
}

const getCodeFromAst = (ast) => {
  return ast.children[0].props.children[0] || false
}
