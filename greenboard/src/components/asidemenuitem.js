import React, { Component } from 'react';

export default class AsideMenuItem extends Component {
  render() {
    const { link } = this.props
    const sublinks = link.children
    return (
      <li>
        <a href={`#${link.id}`} className="link">{link.textNode}</a>
        <ul>
          {sublinks.map((sublink) => (
            <li key={sublink.id}>
              <a href={`#${sublink.id}`} className="link">{sublink.textNode}</a>
            </li>
          ))}
        </ul>
      </li>
    )
  }
}
