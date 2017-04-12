import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import momentUtils from '../../../../momentUtils';

import TimeEntry from '../TimeEntry';

const Title = styled.div`
  font-weight: bold;
	font-family: Arial;
`;

function GroupedTimeEntry({ description, duration, project, timeEntries }) {
	return (
		<div>
			<Title>{description} / {momentUtils.getDurationInSecondsAsString(duration)} / {project}</Title>
			<ul>
				{timeEntries.map((timeEntry, index) =>
					<li
						key={timeEntry.get('id')}
					>
						<TimeEntry
							description={timeEntry.get('description')}
							duration={timeEntry.get('duration')}
						/>
					</li>)}
			</ul>
		</div>
	);
}

GroupedTimeEntry.propTypes = {
	description: PropTypes.string.isRequired,
	duration: PropTypes.number.isRequired,
	project: PropTypes.string.isRequired,
	timeEntries: PropTypes.object.isRequired,
};

export default GroupedTimeEntry;
