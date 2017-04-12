import React from 'react';
import PropTypes from 'prop-types';
import momentUtils from '../../../../momentUtils';

import Span from '../Span';

function TimeEntry({ description, duration }) {
	return (
		<Span>{description} / {momentUtils.getDurationInSecondsAsString(duration)}</Span>
	);
}

TimeEntry.propTypes = {
  description: PropTypes.string.isRequired,
  duration: PropTypes.number.isRequired
};

export default TimeEntry;
