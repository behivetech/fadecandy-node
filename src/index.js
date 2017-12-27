// Vendor Libs
import React, {Component} from 'react';
import {render} from 'react-dom';

// Components
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

export default class Root extends Component {
	render() {
		return (
			<MuiThemeProvider>
				<div>Working</div>
			</MuiThemeProvider>
		);
	}
}

render(<Root />, document.getElementById('app'));
