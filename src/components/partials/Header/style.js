import styled from 'styled-components'

export const HeaderContainer = styled.header `
 height: 60px;
 background-color: #fff;
 border-bottom: 1px solid #ccc;
 
 .container {
	 max-width: 1000px;
	 margin: auto;
	 display: flex;
 }

 a {
	 text-decoration: none;
 }

 .logo {
	 height: 60px;
	 flex: 1;
	 display: flex;
	 align-items: center;

	 .logo-1, .logo-2, .logo-3 {
		font-size: 27px;
		font-weight: bold;
	 }

	 .logo-1 { color: #ff0000 };
	 .logo-2 { color: #00ff00 };
	 .logo-3 { color: #0000ff };
 }

 nav {
	 padding: 10px 0;

	 ul, li {
		 margin: 0;
		 padding: 0;
		 list-style: none;
	 }

	 ul {
		 height: 40px;
		 display: flex;
		 align-items: center;
	 }

	 li {
		 margin: 0 20px;

		 a, button {
			color: #000;
			font-size 14px;
			border: none;
			background: none;
			cursor: pointer;
			outline: none;
			

			 &:hover {
				 color: #999;
			 }

			 &.button {
				 background-color: #ff8100;
				 border-radius: 4px;
				 color: #fff;
				 padding: 5px 10px;

				 &:hover {
					 background-color: #e57706;
				 }
			 }
		 }
	 }
 }

 @media (max-width: 600px) {
    & {
      height: auto;
    }

    .container {
        flex-direction: column;
    }

    .logo {
      justify-content: center;
      margin: 20px 0;
    }

    nav ul {
      flex-direction: column;
      height: auto;
    }

    nav li {
      margin: 10px 20px;
    }
  }
`