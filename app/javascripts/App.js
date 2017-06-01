import React from 'react';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';
import styled from 'styled-components';
import 'react-dates/lib/css/_datepicker.css';


import Title from './components/Title';
import DateRangePicker from './components/DatePicker/DateRangePicker';
import DateSelector from './components/DateSelector';
import TogglList from './components/TogglList';
import WrikeList from './components/WrikeList';
import Flextime from './components/Flextime';

const Body = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	height: calc(100% - 40px);
  margin: 20px;
`;
const TwoColumns = styled.div`
	display: flex;
	width: 100%;
	justify-content: space-between;
`;
const Left = styled.div`
	width: 46%;
`;
const Right = styled.div`
	width: 46%;
`;
const Footer = styled.div`
	margin-top: 100px;
	width: 100%;
`;

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			date: moment(),
			startDate: moment(),
			endDate: moment(),
		};
	}

	render() {
		return (
			<Body>
				<div>
					<Title>Toggl Reporter</Title>
					<DateSelector
						onDateChange={date => this.setState({ date })}
					/>
					<DateRangePicker
						startDate={this.state.startDate}
						endDate={this.state.endDate}
						onDatesChange={({ startDate, endDate }) => this.setState({ startDate, endDate })}
					/>
					<TwoColumns>
						<Left>
							<TogglList
								startDate={moment(this.state.startDate).startOf('day')}
								endDate={moment(this.state.endDate).endOf('day')}
							/>
						</Left>
						<Right>
							<WrikeList
								day={moment(this.startDate).startOf('day')}
							/>
						</Right>
					</TwoColumns>
				</div>
				<Footer>
					<Flextime />
				</Footer>
			</Body>
		);
	}
}

export default App;
