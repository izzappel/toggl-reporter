import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Map, List } from 'immutable';
import toggl from '../../../../toggl';
import utils from '../../../../utils';
import momentUtils from '../../../../momentUtils';

import TimeEntryRow from '../../components/TimeEntryRow';
import Loader from '../../components/Loader';
import { Table, Header, Body, Row, Cell, HeaderCell } from '../../components/Table';

class TogglList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoading: true,
			timeEntries: new List()
		};
	}

	componentWillMount() {
		this.loadTimeEntries(this.props.startDate, this.props.endDate);
	}

	componentWillReceiveProps(nextProps) {
		this.loadTimeEntries(nextProps.startDate, nextProps.endDate);
	}

	loadTimeEntries(startDate, endDate) {
		toggl
			.getTimeEntries(startDate.toISOString(), endDate.toISOString())
			.then(timeEntries => this.onTimeEntriesLoaded(timeEntries));

		this.setState({ isLoading: true });
	}

	onTimeEntriesLoaded(timeEntries) {
		const timeEntriesPerGroup =
			utils.sortTimeEntriesByDescription(
				utils.groupTimeEntriesByDescription(timeEntries)
			);

		this.setState({
			isLoading: false,
			timeEntries: timeEntriesPerGroup,
		});
	}

	render() {
		if (this.state.isLoading) {
			return <Loader />;
		}

		const timeEntries = this.state.timeEntries
			.valueSeq()
			.map((timeEntry, index) =>
				<TimeEntryRow
					key={index}
					description={timeEntry.get('description')}
					duration={timeEntry.getDuration()}
					project={timeEntry.getProjectName()}
				/>);

		const total = this.state.timeEntries
			.valueSeq()
			.reduce((total, timeEntry) => total + timeEntry.getBillableDuration(), 0);

		return (
			<Table>
				<Header>
					<Row>
						<HeaderCell>Project</HeaderCell>
						<HeaderCell>Task</HeaderCell>
						<HeaderCell align="right">Duration</HeaderCell>
					</Row>
				</Header>
				<Body>
					{timeEntries}
					<Row highlighted>
						<Cell colSpan="2">
							Total
						</Cell>
						<Cell align="right">
							{momentUtils.getDurationInSecondsAsString(total)}
						</Cell>
					</Row>
				</Body>
			</Table>
		);
	}
}

TogglList.defaultProps = {
	startDate: moment().startOf('day'),
	endDate: moment().endOf('day'),
};

TogglList.propTypes = {
	startDate: PropTypes.object,
	endDate: PropTypes.object,
};

export default TogglList;
