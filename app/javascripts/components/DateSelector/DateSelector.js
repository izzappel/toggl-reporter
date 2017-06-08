import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import { DateRangePicker } from '../DatePicker';
import MaterialIcon from '../MaterialIcon';

import Container from './Container';
import Button from './Button';

class DateSelector extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			date: moment(),
		};
	}

	onDatesChange(startDate, endDate) {
		this.props.onDatesChange(startDate, endDate);
		this.setState({ startDate, endDate })
	}

	onNext() {
		const newStartDate = moment(this.state.startDate).add(1, 'day');
		const newEndDate = moment(this.state.endDate).add(1, 'day');
		this.onDatesChange(newStartDate, newEndDate);
	}

	onPrevious() {
		const newStartDate = moment(this.state.startDate).subtract(1, 'day');
		const newEndDate = moment(this.state.endDate).subtract(1, 'day');
		this.onDatesChange(newStartDate, newEndDate);
	}

	render() {
		return (
			<Container>
				<Button onClick={() => this.onPrevious()}>
					<MaterialIcon icon="arrow_back" />
				</Button>
				<DateRangePicker
					startDate={this.state.startDate}
					endDate={this.state.endDate}
					onDatesChange={({ startDate, endDate }) => this.onDatesChange(startDate, endDate)}
				/>
				<Button onClick={() => this.onNext()}>
					<MaterialIcon icon="arrow_forward" />
				</Button>
			</Container>
		);
	}
}

DateSelector.propTypes = {
	onDatesChange: PropTypes.func.isRequired,
};

export default DateSelector;
