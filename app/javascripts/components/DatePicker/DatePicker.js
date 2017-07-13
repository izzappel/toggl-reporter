import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';
import './styles.sass';

class DatePicker extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			date: props.date || moment(),
			focused: false,
		};
	}

	componentWillReceiveProps(nextProps) {
		this.setState({ date: nextProps.date });
	}

	onDateChange(date) {
		this.setState({ date });
		this.props.onDateChange(date);
	}

	render() {
		return (
				<SingleDatePicker
					date={this.state.date}
					onDateChange={date => this.onDateChange(date)}
					focused={this.state.focused}
					onFocusChange={({ focused }) => this.setState({ focused })}
					isOutsideRange={() => false}
				/>
		);
	}
}

DatePicker.propTypes = {
	date: PropTypes.object,
	onDateChange: PropTypes.func.isRequired,
};

export default DatePicker;
