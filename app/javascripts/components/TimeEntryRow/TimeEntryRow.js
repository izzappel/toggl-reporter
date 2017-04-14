import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import momentUtils from '../../../../momentUtils';
import config from '../../../../config';

import { Row, Cell } from '../Table';

function TimeEntryRow({ description, duration, project, timeEntries }) {
	const isPrivate = config.privateProjects.includes(project);

	return (
		<Row ignored={isPrivate}>
			<Cell>{project}</Cell>
			<Cell>{description}</Cell>
			<Cell align="right">{momentUtils.getDurationInSecondsAsString(duration)}</Cell>
		</Row>
	);
}

TimeEntryRow.propTypes = {
	description: PropTypes.string.isRequired,
	duration: PropTypes.number.isRequired,
	project: PropTypes.string.isRequired,
};

export default TimeEntryRow;
