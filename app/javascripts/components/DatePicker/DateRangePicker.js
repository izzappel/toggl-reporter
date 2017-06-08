import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { DateRangePicker } from 'react-dates';
import './styles.sass';

class DatePicker extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			startDate: props.startDate || moment(),
			endDate: props.endDate || moment(),
			focused: null,
		};
	}

	componentWillReceiveProps(nextProps) {
		this.setState({ startDate: nextProps.startDate, endDate: nextProps.endDate });
	}

	onDatesChange({ startDate, endDate }) {
		this.setState({ startDate, endDate });
		this.props.onDatesChange({ startDate, endDate });
	}

	render() {
		return (
			<DateRangePicker
				startDate={this.state.startDate}
				endDate={this.state.endDate}
				onDatesChange={({ startDate, endDate }) => this.onDatesChange({ startDate, endDate })}
				focusedInput={this.state.focused}
				onFocusChange={(focused) => this.setState({ focused })}
				isOutsideRange={() => false}
				minimumNights={0}
			/>
		);
	}
}

DatePicker.propTypes = {
	startDate: PropTypes.object,
	endDate: PropTypes.object,
	onDatesChange: PropTypes.func.isRequired,
};

export default DatePicker;
