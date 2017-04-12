import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { List } from 'immutable';
import toggl from '../../../../toggl';
import utils from '../../../../utils';

import GroupedTimeEntry from '../../components/GroupedTimeEntry';
import Loader from '../../components/Loader';

class DailyList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoading: true,
			timeEntries: new List()
		};
	}

	componentWillMount() {
		const startOfDay = moment(this.props.day).startOf('day');
		const endOfDay = moment(startOfDay).endOf('day');
		this.loadTimeEntries(startOfDay, endOfDay);
	}

	componentWillReceiveProps(nextProps) {
		const startOfDay = moment(nextProps.day).startOf('day');
		const endOfDay = moment(startOfDay).endOf('day');
		this.loadTimeEntries(startOfDay, endOfDay);
	}

	loadTimeEntries(startDate, endDate) {
		const promise = toggl.getTimeEntries(startDate.toISOString(), endDate.toISOString());
		promise.then((timeEntries) => {
			const timeEntriesPerGroup =
				utils.sortTimeEntriesByDescription(
					utils.groupTimeEntriesByDescription(timeEntries)
				);

			this.setState({
				isLoading: false,
				timeEntries: timeEntriesPerGroup,
			});
		});
	}

	render() {
		if (this.state.isLoading) {
			return <Loader />;
		}

		return (
			<div>{this.state.timeEntries.map((timeEntry, index) =>
				<GroupedTimeEntry
					key={index}
					description={timeEntry.get('description')}
					duration={timeEntry.get('duration')}
					project={timeEntry.getIn(['project', 'name'])}
					timeEntries={timeEntry.get('timeEntries')}
				/>)}</div>
		);
	}
}

DailyList.defaultProps = {
	day: moment().startOf('day')
};

DailyList.propTypes = {
	day: PropTypes.object,
};

export default DailyList;
