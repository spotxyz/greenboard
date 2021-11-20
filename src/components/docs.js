import React, { Component } from 'react';

import { remarkHeaders } from '../utils/htmlAst';
import Contents from './contents';
import SideBar from './sidebar';

export default class Docs extends Component {
  constructor(props) {
    super(props)
    this.state = {
      darkMode: false
    }
    this.updateMode = this.updateMode.bind(this)
  }

  setLang(lang) {
    this.setState({ selected: lang });
  }

  updateMode() {
    this.setState(prevState => ({
      darkMode: !prevState.darkMode
    }))
  }

  render() {
    const { docs } = this.props
    const { darkMode } = this.state
    const ast = remarkHeaders(docs.htmlAst)
    const logoUrl = docs.frontmatter.attachments[0].publicURL
    const { search } = docs.frontmatter

    return (
      <div className="greenboard">
        <SideBar darkMode={darkMode} ast={ast} logoUrl={logoUrl} search={search} />
        <div className={`container ${darkMode ? "dark" : ""}`}>
          <Contents htmlAst={ast} />
        </div>
        {/* <DarkModeSwitch darkMode={darkMode} updateMode={this.updateMode} /> */}
      </div>
    )
  }
}
