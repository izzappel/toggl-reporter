import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Map, List } from 'immutable';
import wrike from '../../../../wrike';
import utils from '../../../../utils';
import momentUtils from '../../../../momentUtils';
const Timelog = require('../../../../model/Timelog');


import TimeEntryRow from '../../components/TimeEntryRow';
import Loader from '../../components/Loader';
import { Table, Header, Body, Row, Cell, HeaderCell } from '../../components/Table';

function groupByTask(timelogs) {
  return timelogs.groupBy(timelogs => timelogs.get('taskId'));
}

function createReportData(timelogGroups) {
  return timelogGroups.map(createReportDataForGroup);
}

function createReportDataForGroup(group) {
  const totalDurationForGroup = calculateDurationForGroup(group);

  return new Timelog({
    task: group.first().get('task'),
    hours: totalDurationForGroup,
  });
}

function calculateDurationForGroup(group) {
  return group.valueSeq().reduce((totalDuration, timelog) => { return totalDuration + timelog.get('hours')}, 0);
}

function sortByTask(timelogs) {
  return timelogs.sort((timelog1, timelog2) => timelog1.getTaskTitle().localeCompare(timelog2.getTaskTitle()));
}

class WrikeList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoading: true,
			timelogs: new List()
		};
	}

	componentWillMount() {
		this.loadTimelogs(this.props.day);
	}

	componentWillReceiveProps(nextProps) {
		this.loadTimelogs(nextProps.day);
	}

	loadTimelogs(day) {
		wrike
			.getTimelogs(day)
			.then(timelogs => this.onTimelogsLoaded(timelogs));

		this.setState({ isLoading: true });
	}

	onTimelogsLoaded(timelogs) {
		const timelogsPerGroup =
			sortByTask(
				createReportData(
					groupByTask(timelogs)
				)
			);

		this.setState({
			isLoading: false,
			timelogs: timelogsPerGroup,
		});
	}

	render() {
		if (this.state.isLoading) {
			return <Loader />;
		}

		const timelogs = this.state.timelogs
			.valueSeq()
			.map((timelog, index) =>
				<Row key={index}>
					<Cell>{timelog.getTaskTitle()}</Cell>
					<Cell align="right">{momentUtils.getDurationInHoursAsString(timelog.get('hours'))}</Cell>
				</Row>);

		const total = this.state.timelogs
			.valueSeq()
			.reduce((total, timelog) => total + timelog.get('hours'), 0);

		return (
			<Table>
				<Header>
					<Row>
						<HeaderCell>Task</HeaderCell>
						<HeaderCell align="right">Duration</HeaderCell>
					</Row>
				</Header>
				<Body>
					{timelogs}
					<Row highlighted>
						<Cell>
							Total
						</Cell>
						<Cell align="right">
							{momentUtils.getDurationInHoursAsString(total)}
						</Cell>
					</Row>
				</Body>
			</Table>
		);
	}
}

WrikeList.defaultProps = {
	day: moment().startOf('day'),
};

WrikeList.propTypes = {
	day: PropTypes.object,
};

export default WrikeList;
