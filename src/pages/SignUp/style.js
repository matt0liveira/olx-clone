import styled from 'styled-components'

export const LoginContainer = styled.div`
   form {
		 background-color: #fff;
		 border-radius: 3px;
		 box-shadow: 0px 0px 3px #999;
		 padding: 10px;

		 .area {
			 display: flex;
			 align-items: center;
			 padding: 10px;
			 max-width: 500px;

			 .area--title {
				width: 200px;
				text-align: right;
				padding-right: 20px;
				font-weight: bold;
				font-size: 14px;
			 }

			 .area--input {
					flex: 1;

					input {
						width: 100%;
						font-size: 14px;
						padding: 5px;
						border: 1px solid #ddd;
						border-radius: 3px;
						outline: none;
						transition: all ease .4s;

						&:focus {
							border-color: #333;
							color: #333;
						}
					}

					input[type="checkbox"] {
						width: 5%;
					}
			 }

			 button[type="submit"] {
				 background-color: #0089ff;
				 border: 0;
				 outline: none;
				 padding: 5px 10px;
				 border-radius: 4px;
				 color: #fff;
				 font-size: 15px;
				 cursor: pointer;	

				 &:hover {
					 background-color: #006fce;
				 }
			 }
		 }
	 }

   @media (max-width: 600px) {
    form {
      .area {
        flex-direction: column;

        .area--title {
          width: 100%;
          text-align: left;
          margin-bottom: 10px;
        }

        .area--input {
          width: 100%;

          button {
            width: 100%;
            padding: 10px;
          }
        }
      }
    }
  }
`