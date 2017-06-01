import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Map, List } from 'immutable';
import toggl from '../../../../toggl';
import utils from '../../../../utils';
import momentUtils from '../../../../momentUtils';

class Flextime extends React.Component {
	constructor(props) {
		super(props);
		this.startOfDeepImpact = moment('2017-01-09', 'YYYY-MM-DD');

		this.state = {
			isLoading: true,
			timeEntries: new List(),
			flextime: 0,
		};
	}

	componentWillMount() {
		this.loadFlextime();
	}

	loadFlextime() {
		const today = momentUtils.getToday().endOf('day');
		toggl
			.getTimeEntries(this.startOfDeepImpact.toISOString(), today.toISOString())
			.then(timeEntries => this.onTimeEntriesLoaded(timeEntries));
	}

	onTimeEntriesLoaded(timeEntries) {
		const flextime = utils.calculateFlextime(timeEntries);

		this.setState({
			isLoading: false,
			timeEntries: timeEntries,
			flextime: flextime,
		});
	}

	render() {
		const flextimeAsString = momentUtils.getDurationInSecondsAsString(this.state.flextime);
		return <div>Flextime: {flextimeAsString}</div>;
	}
}

export default Flextime;
