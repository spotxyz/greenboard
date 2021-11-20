import React, { Component } from 'react';

export default class AsideMenuItem extends Component {
  render() {
    const { link } = this.props
    const sublinks = link.children
    return (
      <li className="aside-menu__list-item">
        <a href={`#${link.id}`} className="link">{link.textNode}</a>
        <ul className="sublist-menu">
          {sublinks.map((sublink) => (
            <li key={sublink.id} className="sublist-menu__list-item">
              <a href={`#${sublink.id}`} className="link">{sublink.textNode}</a>
            </li>
          ))}
        </ul>
      </li>
    )
  }
}
