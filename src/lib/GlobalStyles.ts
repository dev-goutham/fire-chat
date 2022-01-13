import { createGlobalStyle } from 'styled-components'
import reset from 'styled-reset'

const GlobalStyles = createGlobalStyle`
  ${reset}

  body {
    font-family: 'Quicksand', sans-serif;
    color: var(--text-color-black);
  }

  :root{
    --background-white: #f8f8f8;
    --primary-color: #23b8f6;
    --secondary-color: #85e7b4;
    --text-color-black: #333;
    --text-color-white: #f2f2f2;
  }
`

export default GlobalStyles
