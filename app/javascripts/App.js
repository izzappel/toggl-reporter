import React from 'react';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';

import Title from './components/Title';
import DailyList from './modules/DailyList';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			date: moment(),
			focused: false,
		};
	}

	render() {
		return (
			<div>
				<Title>Toggl Reporter</Title>
				<SingleDatePicker
					date={this.state.date} // momentPropTypes.momentObj or null
					onDateChange={date => this.setState({ date })} // PropTypes.func.isRequired
					focused={this.state.focused} // PropTypes.bool
					onFocusChange={({ focused }) => this.setState({ focused })} // PropTypes.func.isRequired
					isOutsideRange={() => false}
				/>
				<DailyList day={this.state.date} />
			</div>
		);
	}
}

export default App;
