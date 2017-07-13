import React from 'react';
import styled from 'styled-components';

const Cell = styled.td`
	text-align: ${props => props.align ? props.align : 'left' };
	padding: 5px 0;
`;

export default Cell;
