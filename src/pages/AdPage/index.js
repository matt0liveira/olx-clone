import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { PageContainer } from '../../components/MainComponents'
import { AdPageContainer, BreadCrumb, FakeDiv, OthersContainer } from './style'
import useApi from '../../helpers/OlxApi'
import { Slide } from 'react-slideshow-image'
import 'react-slideshow-image/dist/styles.css'
import AdItem from '../../components/partials/AdItem/'

export default () => {
	const { id } = useParams()
	const api = useApi()

	const [loading, setLoading] = useState(true)
	const [adInfo, setAdInfo] = useState({})

	useEffect(() => {
		const getAdInfo = async (id) => {
			const json = await api.getAd(id, true)
			setAdInfo(json)
			setLoading(false)
		}
		getAdInfo(id)
	}, [])

	const formatDate = date => {
		let cDate = new Date(date)
		let months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']
		let cDay = cDate.getDate()
		let cMonth = cDate.getMonth()
		let cYear = cDate.getFullYear()

		return `${cDay} de ${months[cMonth]} de ${cYear}`
	}

	return (
		<PageContainer>
			{adInfo.category &&
				<BreadCrumb>
					Você está aqui:
					<Link to="/">Home</Link>
					/
					<Link to={`/ads?state=${adInfo.stateName}`}>{adInfo.stateName}</Link>
					/
					<Link to={`/ads?state=${adInfo.stateName}&cat=${adInfo.category.slug}`}>{adInfo.category.name}</Link>
					/
					{adInfo.title}
				</BreadCrumb>
			}

			<AdPageContainer>
				<div className="leftSide">
					<div className="box">
						<div className="adImg">
							{loading && <FakeDiv height={300} />}
							{adInfo.images && 
								<Slide>
									{adInfo.images.map((item, key) => (
										<div key={key} className="each-slide">
											<img src={item} alt="" />
										</div>
									))}
								</Slide>
							}
						</div>
						<div className="adInfo">
							<div className="adName">
								{loading && <FakeDiv height={30} />}
								{adInfo.title && <h2>{adInfo.title}</h2>}
								{adInfo.dateCreated && 
									<small>Criado em {formatDate(adInfo.dateCreated)}</small>
								}
							</div>
							<div className="adDescription">
								{loading && <FakeDiv height={100} />}
								{adInfo.description}
								<hr />

								{adInfo.views && 
									<small>{adInfo.views}</small>
								}
							</div>
						</div>
					</div>
				</div>
				<div className="rightSide">
					<div className="box box--padding">
						{loading && <FakeDiv />}
						{adInfo.priceNegotiable && "Preço negociável"}
						{!adInfo.priceNegotiable && adInfo.price && 
							<div className="price">
								Preço: <span>R$ {adInfo.price}</span>
							</div>
						}
					</div>
					{loading && <FakeDiv height={50} />}
					{adInfo.userInfo && 
						<>
							<a href={`mailto:${adInfo.userInfo.email}`} target="_black" className="contactSellerLink">
								Fale com o vendedor
							</a>
							<div className="createdBy box box--padding">
								<strong>{adInfo.userInfo.name}</strong>
								<small>E-mail: {adInfo.userInfo.email}</small>
							</div>
						</>
					}
				</div>
			</AdPageContainer>

			<OthersContainer>	
				{adInfo.others && 
					<>
						<h2>Outras ofertas do vendedor</h2>
						<div className="list">
							{adInfo.others.map((item, key) => (
								<AdItem key={key} data={item} />
							))}
						</div>
					</>
				}
			</OthersContainer>
		</PageContainer>
	)
}