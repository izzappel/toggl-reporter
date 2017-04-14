import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import DatePicker from '../DatePicker';
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

	onDateChange(date) {
		this.props.onDateChange(date);
		this.setState({ date });
	}

	onNext() {
		const newDate = moment(this.state.date).add(1, 'day');
		this.onDateChange(newDate);
	}

	onPrevious() {
		const newDate = moment(this.state.date).subtract(1, 'day');
		this.onDateChange(newDate);
	}

	render() {
		return (
			<Container>
				<Button onClick={() => this.onPrevious()}>
					<MaterialIcon icon="arrow_back"/>
				</Button>
				<DatePicker
					date={this.state.date}
					onDateChange={date => this.onDateChange(date)}
				/>
				<Button onClick={() => this.onNext()}>
					<MaterialIcon icon="arrow_forward"/>
				</Button>
			</Container>
		);
	}
}

DatePicker.propTypes = {
	onDateChange: PropTypes.func.isRequired,
};

export default DateSelector;
