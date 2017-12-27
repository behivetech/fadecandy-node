// Vendor Components
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {get, isEmpty, isEqual} from 'lodash';

// Styles
import './index.scss';

// Actions
import * as overlayActions from '../../actions/overlay-actions';
import {routerChanged} from '../../actions/services-data-actions';

// Components
import MainHeader from './MainHeader';

class Main extends Component {

    componentWillReceiveProps(nextProps) {
        const {routerChanged, routerParams} = this.props;
        const {routerParams: nextRouterParams} = nextProps;

        if (!isEqual(routerParams, nextRouterParams)) {
            routerChanged(routerParams, nextRouterParams);
        }
    }

    render() {
        return (
            <div className="main" {...this.getProps()}>
                <MainHeader />
                <div className="main--content">
                    {this.props.children || <h1>React Starter is working</h1>}
                </div>
            </div>
        );
    }
}

Main.propTypes = {
    children: PropTypes.node,
    closeAllOverlays: PropTypes.func.isRequired,
    overlays: PropTypes.object,
    routerChanged: PropTypes.func.isRequired,
    routerParams: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        overlays: state.overlays,
        routerParams: get(state, 'router.params')
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(Object.assign({}, overlayActions, {routerChanged}), dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
