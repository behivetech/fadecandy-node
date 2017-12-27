// Vendor Libs
import React, {Component} from 'react';

//Components
import {IndexLink, Link} from 'react-router';
import Dropdown from '../../components-core/dropdown';
import Permissions from '../../components-core/permissions';

// Styles
import './main-nav.scss';

export default class MainNav extends Component {

    getLinkProps() {
        return {
            activeClassName: 'main-nav--link_active',
            className: 'main-nav--link button'
        };
    }

    getDropdownProps() {
        return {
            className: 'main-nav--settings',
            dropdownRenderer: this.renderDropdownItems
        };
    }

    renderDropdownItems = () => {
        return (
            <ul>
                <li><Link to="/admin/users">List Users</Link></li>
                <li><Link to="/networks">Networks</Link></li>
                <li><Link to="/map-external-networks">Map External Networks</Link></li>
                <li><Link to="/rules">Rules</Link></li>
            </ul>
        );
    }

    render() {
        return (
            <nav className="main-nav">
                <IndexLink {...this.getLinkProps()} to="/">Home</IndexLink>
                <Link {...this.getLinkProps()} to="/media-items">Media Items/Mapping</Link>
                <Link {...this.getLinkProps()} to="/movies-and-programs">Movies and Programs</Link>
                <Permissions adminOnly><Dropdown {...this.getDropdownProps()}>Admin</Dropdown></Permissions>
            </nav>
        );
    }
}
