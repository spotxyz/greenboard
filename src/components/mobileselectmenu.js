import React, { Component } from 'react';

import { getLinks } from '../utils/htmlAst';

export default class MobileSelectMenu extends Component {
  constructor(props) {
    super(props)
    this.links = getLinks(this.props.ast)
    this.linkSelected = this.linkSelected.bind(this)
  }

  linkSelected(e) {
    const value = e.target.value
    window.location.hash = value
  }

  render() {
    return (
      <div className="mobile-select-menu-cont">
        <select className="mobile-select-menu" onInput={this.linkSelected}>
          {this.links.map((link) => (
            <React.Fragment key={link.id}>
              <option value={link.id}>{link.textNode}</option>
              {link.children.map((sublink) => <option key={sublink.id} value={sublink.id}>{sublink.textNode}</option>)}
            </React.Fragment>
          ))}
        </select>
      </div>
    )
  }
}
