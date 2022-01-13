import styled from 'styled-components'

const StyledLogin = styled.div`
	display: grid;
	place-items: center;
	background-color: var(--background-white);
	height: 100vh;
	width: 100vw;
	position: relative;

	.card {
		background-color: white;
		padding: 3.5rem 5rem;
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
		border-radius: 10px;
		text-align: center;

		& > * + * {
			margin-top: 20px;
		}
	}

	img {
		object-fit: contain;
		height: 100px;
	}

	button {
		width: 100%;
		border: none;
		outline: none;
		padding: 15px 0;
		border-radius: 10px;
		background-color: var(--primary-color);
		color: var(--text-color-white);
		font-size: 1.25em;
		cursor: pointer;
		&:hover,
		&:focus {
			opacity: 0.8;
		}

		.error {
			font-size: 0.75rem;
			color: red;
		}
	}
`

export default StyledLogin
