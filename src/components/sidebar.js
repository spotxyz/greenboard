import React, { Component } from 'react';

import AsideMenu from './asidemenu';
import MobileSelectMenu from './mobileselectmenu';
import SearchBar from './searchbar';

export default class SideBar extends Component {
  render() {
    const { ast, logoUrl, search, darkMode } = this.props
    return (
      <div className={`sidebar ${darkMode ? "dark" : ""}`}>
        <img className="logo" src={logoUrl} alt="Logo" />
        {search && <SearchBar ast={ast}/>}
        <AsideMenu ast={ast} />
        {/* <FooterLinks footer={footer}/> */}
        <MobileSelectMenu ast={ast}/>
      </div>
    )
  }
}
