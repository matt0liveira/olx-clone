import React, { useEffect, useRef, useState } from 'react'
import { ErrorMessage, PageContainer, PageTitle } from '../../components/MainComponents'
import { BtnPrimary, ModalWindow, ModalEdit, MyAccountContainer } from './style'
import useApi from '../../helpers/OlxApi'
import { Link, useNavigate } from 'react-router-dom'
import { Item } from '../../components/partials/AdItem/style'

export default () => {
	const api = useApi()
  const navigate = useNavigate()
	const [states, setStates] = useState([])
  const [userInfo, setUserInfo] = useState({
    ads: [],
    name: '',
    email: '',
    state: ''
  })
	const [clickedAd, setClickedAd] = useState({
    id: '',
		title: '',
		category: '',
		price: '',
		priceNegotiable: false,
		description: '',
		images: []
	})
  const newImg = []
  const [cats, setCats] = useState([])
  const [error, setError] = useState('')
  const [disabled, setDisabled] = useState(false)

	const modalBackground = useRef()
	const modalEdit = useRef()
  const fileField = useRef()

	useEffect(() => {
		const getUserInfo = async () => {
			const json = await api.getUserInfo()
      setUserInfo(json)
		}
		getUserInfo()
	}, [])

	useEffect(() => {
		const getStates = async () => {
			const states = await api.getStates()
			setStates(states)
		}
		getStates()
	}, [])

	useEffect(() => {
		const getCategories = async () => {
			const cats = await api.getCategories()
			setCats(cats)
		}
		getCategories()
	}, [])

	const handleSubmitUser = async e => {
		e.preventDefault()
		setDisabled(true)
    setError('')

    const json = await api.editUserInfo(userInfo.name, userInfo.email, userInfo.state)
    if(!json.error) {
      window.location.reload()
    } else {
      setError(json.error)
    }

    setDisabled(false)
	}

	const handleOpenModal = (e) => {
		e.preventDefault()
		modalBackground.current.classList.add('active')
		modalEdit.current.classList.add('active')
	}

	const handleCloseModal = (e) => {
		e.preventDefault()
		modalBackground.current.classList.remove('active')
		modalEdit.current.classList.remove('active')
	}

	const handleOutsideClick = (e) => {
		if(!modalEdit.current.contains(e.target)) {
			modalBackground.current.classList.remove('active')
			modalEdit.current.classList.remove('active')
		}
	}

  const handleSubmitAd = async e => {
    e.preventDefault()
    setDisabled(true)
    setError('')

    if(fileField.current.files.length > 0) {
      for(let i = 0; i < fileField.current.files.length; i++) {
        newImg.push(fileField.current.files[i])
      }
    }

    const json = await api.editAd(
      clickedAd.id,
      clickedAd.title,
      clickedAd.category,
      clickedAd.price,
      clickedAd.priceNegotiable,
      clickedAd.description,
      clickedAd.images,
      newImg
    )
    if(!json.error) {
      navigate(`/ad/${clickedAd.id}`)
      return
    } else {
      setError(json.error)
    }

    setDisabled(false)
  }

	return (
		<PageContainer>
			<MyAccountContainer>
				<PageTitle>Minha conta</PageTitle>
				<form onSubmit={handleSubmitUser}>
          {error &&
            <ErrorMessage>{error}</ErrorMessage>
          }
					<label className="area">
						<div className="area--title">Nome</div>
						<div className="area--input">
							<input
								type="text"
								name="name"
								value={userInfo.name}
								disabled={disabled}
								onChange={e => setUserInfo({
                  name: e.target.value,
                  email: userInfo.email,
                  state: userInfo.state,
                  ads: userInfo.ads
                })} />
						</div>
					</label>

					<label className="area">
						<div className="area--title">Estado</div>
						<div className="area--input">
							<select
								name="states"
								id="states"
								value={userInfo.state}
                disabled={disabled}
								onChange={e => setUserInfo({
                  name: userInfo.name,
                  email: userInfo.email,
                  state: e.target.value,
                  ads: userInfo.ads
                })}>
								<option value=""></option>
								{states.map((item, key) => (
									<option key={key} value={item.name}>{item.name}</option>
								))}
							</select>
						</div>
					</label>

          <label className="area">
						<div className="area--title">E-mail</div>
						<div className="area--input">
							<input
								type="email"
								name="email"
								value={userInfo.email}
								disabled={disabled}
								onChange={e => setUserInfo({
                  name: userInfo.name,
                  email: e.target.value,
                  state: userInfo.state,
                  ads: userInfo.ads
                })} />
						</div>
					</label>

					<label className="area">
						<div className="area--title"></div>
						<div className="area--input">
							<BtnPrimary>Alterar informações</BtnPrimary>
						</div>
					</label>
				</form>

				<br />

				<h2>Meus anúncios</h2>
				<div className="list">
					{userInfo.ads.map((item, key) => (
						<Item className="adItem" key={key} onClick={() => setClickedAd(item)}>
							<Link to={`/ad/${item.id}`}>
								<div className="itemImg">
									<img src={`http://alunos.b7web.com.br:501/media/${item.images[0].url}`} alt="" />
								</div>

								<div className="itemName">
									{item.title}
								</div>

								<div className="itemPrice">
									{item.priceNegotiable && "Preço negociável"}
									{!item.priceNegotiable && "R$ " + item.price}
								</div>

								<div className="itemActionEdit">
									<BtnPrimary width={100} onClick={handleOpenModal}>Editar</BtnPrimary>
								</div>
							</Link>
						</Item>
					))}
				</div>

			</MyAccountContainer>

			<ModalWindow ref={modalBackground} onClick={handleOutsideClick}>
				<ModalEdit ref={modalEdit}>
					<form onSubmit={handleSubmitAd} encType="multipart/form-data">
						<button className="btnCloseModal" onClick={handleCloseModal}>x</button>
						<h2>Editar anúncio</h2>

						<label className="area">
							<div className="area--title">Título</div>
							<div className="area--input">
								<input
								type="text"
								name="title"
								value={ clickedAd.title }
                disabled={disabled}
								onChange={e => setClickedAd({
                  id: clickedAd.id,
									title: e.target.value,
									category: clickedAd.category,
									price: clickedAd.price,
									priceNegotiable: clickedAd.priceNegotiable,
									description: clickedAd.description,
									images: clickedAd.images,
								})} />
							</div>
						</label>

						<label className="area">
							<div className="area--title">Categoria</div>
							<div className="area--input">
								<select
									name="category"
									value={clickedAd.category}
                  disabled={disabled}
									onChange={e => setClickedAd({
                    id: clickedAd.id,
										title: clickedAd.title,
										category: e.target.value,
										price: clickedAd.price,
										priceNegotiable: clickedAd.priceNegotiable,
										description: clickedAd.description,
										images: clickedAd.images,
									})}>
									<option value=""></option>
									{cats.map((item, key) => (
										<option key={key} value={item.slug}>{item.name}</option>
									))}
								</select>
							</div>
						</label>

						<label className="area">
							<div className="area--title">Preço</div>
							<div className="area--input">
							<input
                name="price"
								placeholder="R$ "
								disabled={disabled || clickedAd.priceNegotiable}
								value={ clickedAd.price }
								onChange={e => setClickedAd({
                  id: clickedAd.id,
									title: clickedAd.title,
									category: clickedAd.category,
									price: e.target.value,
									priceNegotiable: clickedAd.priceNegotiable,
									description: clickedAd.description,
									images: clickedAd.images,
								})} />
							</div>
						</label>

						<label className="area">
							<div className="area--title">Preço negociável</div>
							<div className="area--input">
								<input
									type="checkbox"
									name="priceNegotiable"
									checked={clickedAd.priceNegotiable ? true : false}
                  disabled={disabled}
									onChange={() => setClickedAd({
                    id: clickedAd.id,
										title: clickedAd.title,
										category: clickedAd.category,
										price: clickedAd.price,
										priceNegotiable: !clickedAd.priceNegotiable,
										description: clickedAd.description,
										images: clickedAd.images,
									})}
									value={clickedAd.priceNegotiable} />
							</div>
						</label>

						<label className="area">
							<div className="area--title">Descrição</div>
							<div className="area--input">
								<textarea
								name="description"
								value={ clickedAd.description }
                disabled={disabled}
								onChange={e => setClickedAd({
                    id: clickedAd.id,
										title: clickedAd.title,
										category: clickedAd.category,
										price: clickedAd.price,
										priceNegotiable: clickedAd.priceNegotiable,
										description: e.target.value,
										images: clickedAd.images,
									})} />
							</div>
						</label>

						<label className="area">
							<div className="area--title">Imagens (1 ou mais)</div>
							<div className="area--input">
								<input
                type="file"
                name="image"
                multiple
                ref={ fileField }
                disabled={disabled} />
							</div>
						</label>

						<label className="area">
							<div className="area--title"></div>
							<div className="area--input">
								<BtnPrimary type="submit" disabled={disabled}>Editar</BtnPrimary>
							</div>
						</label>
					</form>
				</ModalEdit>
			</ModalWindow>
		</PageContainer>
	)
}
