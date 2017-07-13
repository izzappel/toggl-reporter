import React from 'react';
import styled from 'styled-components';

const Row = styled.tr`
	color: ${(props) => {
		if (props.ignored) {
			return props.theme.colors.grey;
		}

		if (props.highlighted) {
			return props.theme.colors.main;
		}

		return 'inherit';
	}}
	font-weight: ${props => props.highlighted ? 'bold' :  'normal'}
`;

export default Row;
