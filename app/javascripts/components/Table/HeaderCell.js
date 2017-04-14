import React from 'react';
import styled from 'styled-components';

const HeaderCell = styled.th`
	font-weight: bold;
	text-align: ${props => props.align ? props.align : 'left'};
	padding: 5px 0;
`;

export default HeaderCell;
