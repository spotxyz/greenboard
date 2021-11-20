import React, { Component } from 'react';

import { getLinks } from '../utils/htmlAst';
import AsideMenuItem from './asidemenuitem';

export default class AsideMenu extends Component {
  render() {
    const { ast } = this.props
    const links = getLinks(ast)
    return (
      <ul className="aside-menu">
        {links.map((link) =>
          <AsideMenuItem
            key={link.id}
            link={link}
          />
        )}
      </ul>
    )
  }
}
