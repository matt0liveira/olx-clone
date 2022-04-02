import styled from 'styled-components'

export const MyAccountContainer = styled.div `
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

						input, select {
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
				}
    }
}

	h2 {
    font-size: 20px;
	}

	.list {
    display: flex;
    flex-wrap: wrap;

    .adItem {
        width: 25%;
    }
	}

	.itemActionEdit {
		margin-top: 10px;
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

    .list .adItem {
      width: 50%;
    }
  }
`

export const BtnPrimary = styled.button`
	width: ${props => props.width}%;
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
`

export const ModalWindow = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	bottom: 0;
	right: 0;
	background-color: rgba(0, 0, 0, 0.8);
	z-index: -1;
	opacity: 0;

	&.active {
		z-index: 1;
		opacity: 1;
	}
`

export const ModalEdit = styled.div`
	width: auto;
	height: 500px;
  overflow-y: auto;
  overflow-x: hidden;
	position: fixed;
	left: 50%;
	top: 50%;
	transform: translate(-50%, 200%);
	background-color: #fff;
	border-radius: 5px;
	z-index: -1;
	transition: all .4s ease;

	&.active {
		transform: translate(-50%, -50%);
		z-index: 2;
	}

	form {
		width: 85%;
		margin: 0 auto;
		border-radius: 3px;
    padding: 10px;

		.btnCloseModal {
			width: 30px;
			height: 30px;
			background-color: #ff0000;
			color: #fff;
			border: 0;
			font-size: 16px;
			text-align: center;
			font-weight: bold;
			border-radius: 50%;
			position: absolute;
			right: -1%;
			top: -2%;
			cursor: pointer;
		}

		.area {
			display: flex;
			align-items: center;
			padding: 10px;

			.area--title {
				 width: 150px;
				 text-align: right;
				 padding-right: 20px;
				 font-weight: bold;
				 font-size: 14px;
			}

			.area--input {
					flex: 1;

					input, select, textarea {
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

					textarea {
						height: 100px;
						resize: none;
					}
			}
	}

  @media (max-width: 600px) {
    .area {
      flex-direction: column;

      .area--title {
        width: 100%;
        text-align: left;
        margin-bottom: 10px;
      }

      .area--input {
        width: 100%;

        textarea {
          height: auto;
        }

        button {
          width: 100%;
          padding: 10px;
        }
      }
    }
  }
`