import React from 'react';
import styled, { keyframes } from 'styled-components';

const stretchdelay = keyframes`
	0%, 40%, 100% { 
		transform: scaleY(0.4);
		-webkit-transform: scaleY(0.4);
	}  20% { 
		transform: scaleY(1.0);
		-webkit-transform: scaleY(1.0);
	}
`;

const Spinner = styled.div`
	margin: 100px auto;
  width: 50px;
  height: 40px;
  text-align: center;
  font-size: 10px;
	
	> div {
		background-color: blue;
		height: 100%;
		width: 6px;
		display: inline-block;
		
		animation: ${stretchdelay} 1.2s infinite ease-in-out;
	}
`;

const Rect1 = styled.div``;
const Rect2 = styled.div`
  animation-delay: -1.1s;
`;
const Rect3 = styled.div`
  animation-delay: -1.0s;
`;
const Rect4 = styled.div`
  animation-delay: -0.9s;
`;
const Rect5 = styled.div`
  animation-delay: -0.8s;
`;

function Loader() {
	return (
		<Spinner>
			<Rect1 />
			<Rect2 />
			<Rect3 />
			<Rect4 />
			<Rect5 />
		</Spinner>
	);
}

export default Loader;
