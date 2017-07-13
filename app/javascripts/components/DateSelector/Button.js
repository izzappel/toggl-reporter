import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
	border: none;
	outline: none;
	margin: 5px;
	padding: 10px;
	color: ${props => props.theme.colors.main};
	cursor: pointer;
	background-color: white;
	font-size: 1em;
`;

export default Button;
