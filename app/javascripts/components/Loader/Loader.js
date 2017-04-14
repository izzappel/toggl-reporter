import React from 'react';
import styled, { keyframes } from 'styled-components';

const loader = keyframes`
  50% {
    transform: translateY(-10px);
    background-color: #1b98e0;
	}
`;

const LoaderContainer = styled.div`
  filter: url('#goo');
  width: 100px;
  margin: 0 auto;
  position: relative;
  top: 50px;
`;

const animationTempo = 0.6;

const LoaderDiv = styled.div`
	float: left;
	height: 20px;
	width: 20px;
	border-radius: 100%;
	background-color: ${props => props.theme.colors.main};
	animation: ${loader} ${animationTempo}s infinite;
`;

const calculateAnimationDelay = numberOfLoader => numberOfLoader * animationTempo / 5;

const Loader1 = styled(LoaderDiv)`
	animation-delay: ${calculateAnimationDelay(1)}s;
`;
const Loader2 = styled(LoaderDiv)`
	animation-delay: ${calculateAnimationDelay(2)}s;
`;
const Loader3 = styled(LoaderDiv)`
	animation-delay: ${calculateAnimationDelay(3)}s;
`;
const Loader4 = styled(LoaderDiv)`
	animation-delay: ${calculateAnimationDelay(4)}s;
`;
const Loader5 = styled(LoaderDiv)`
	animation-delay: ${calculateAnimationDelay(5)}s;
`;

function Loader() {
	return (
		<div>
			<svg xmlns="http://www.w3.org/2000/svg" version="1.1">
				<defs>
					<filter id="goo">
						<feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
						<feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 35 -10" result="goo" />
						<feBlend in="SourceGraphic" in2="goo" operator="atop" />
					</filter>
				</defs>
			</svg>
			<LoaderContainer>
				<Loader1 />
				<Loader2 />
				<Loader3 />
				<Loader4 />
				<Loader5 />
			</LoaderContainer>
		</div>
	);
}

export default Loader;
