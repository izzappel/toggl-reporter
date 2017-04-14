import React from 'react';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';
import styled from 'styled-components';
import 'react-dates/lib/css/_datepicker.css';


import Title from './components/Title';
import DateSelector from './components/DateSelector';
import TogglList from './components/TogglList';
import WrikeList from './components/WrikeList';

const Left = styled.div`
	float: left;
	width: 46%;
`;
const Right = styled.div`
	float: right;
	width: 46%;
`;

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			date: moment(),
		};
	}

	render() {
		return (
			<div>
				<Title>Toggl Reporter</Title>
				<DateSelector
					onDateChange={date => this.setState({ date })}
				/>
				<div>
					<Left>
						<TogglList
							startDate={moment(this.state.date).startOf('day')}
							endDate={moment(this.state.date).endOf('day')}
						/>
					</Left>
					<Right>
						<WrikeList
							day={moment(this.state.date).startOf('day')}
						/>
					</Right>
				</div>
			</div>
		);
	}
}

export default App;
