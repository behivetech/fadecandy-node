/* global Config */

// Vendor Components
import React, {Component} from 'react';
import {Link} from 'react-router';

// Components
import MainNav from './main-nav';
import LoggedInDropdown from '../../components-app/logged-in-dropdown';

// Styles
import './main-header.scss';

const getHeaderImage = () => {
    const baseUrl = Config.base.baseUrl || '/';
    const logoImage = (Config.base.matureContent) ? 'metacloud-logo-adult.svg' : 'metacloud-logo.svg';

    return `${baseUrl}images/${logoImage}`;
};

export default class MainHeader extends Component {
    render() {
        return (
            <header className="main-header">
                <Link className="main-header--link" to="/">
                    <img className="main-header--metacloud-logo" src={getHeaderImage()} title="metacloud" />
                </Link>
                <LoggedInDropdown className="main-header--logged-in" />
                <MainNav />
            </header>
        );
    }
}
