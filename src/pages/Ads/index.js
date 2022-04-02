import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { PageContainer } from '../../components/MainComponents'
import { AdsContainer } from './style'
import useApi from '../../helpers/OlxApi'
import AdItem from '../../components/partials/AdItem'

let timer
export default () => {
	const api = useApi()
	const navigate = useNavigate()

	const useQueryStr = () => {
		return new URLSearchParams(useLocation().search)
	}
	const query = useQueryStr()
	const [q, setQ] = useState(query.get('q') != null ? query.get('q') : '')
	const [cat, setCat] = useState(query.get('cat') != null ? query.get('cat') : '')
	const [state, setState] = useState(query.get('state') != null ? query.get('state') : '')

	const [adsTotal, setAdsTotal] = useState(0)
	const [stateList, setStateList] = useState([])
	const [categories, setCategories] = useState([])
	const [adsList, setAdsList] = useState([])
	const [resultOpacity, setResultOpacity] = useState(1)
	const [loading, setLoading] = useState(true)
	const [pageCount, setPageCount] = useState(0)
	const [currentPage, setCurrentPage] = useState(1)

	const getAdsList = async () => {
		setLoading(true)
		let offset = (currentPage - 1) * 12
		const json = await api.getAds({
			sort: 'desc',
			limit: 12,
			q,
			cat,
			state,
			offset
		})
		setAdsList(json.ads)
		setAdsTotal(json.total)
		setResultOpacity(1)
		setLoading(false)
	}

	useEffect(() => {
		const getStates = async () => {
			const slist = await api.getStates()
			setStateList(slist)
		}
		getStates()
	}, [])

	useEffect(() => {
		const getCategories = async () => {
			const clist = await api.getCategories()
			setCategories(clist)
		}
		getCategories()
	}, [])

	useEffect(() => {
		let queryStr = []
		if(q) {
			queryStr.push(`q=${q}`)
		}
		if(cat) {
			queryStr.push(`cat=${cat}`)
		}
		if(state) {
			queryStr.push(`state=${state}`)
		}
		navigate(`?${queryStr.join('&')}`, { replace: true })

		if(timer) {
			clearTimeout(timer)
		}
		timer = setTimeout(getAdsList, 2000)
		setResultOpacity(0.3)
		setCurrentPage(1)
	}, [q, cat, state])

	useEffect(() => {
		if(adsList.length > 0) {
			setPageCount(Math.ceil(adsTotal / adsList.length))
		} else {
			setPageCount(0)
		}
	}, [adsTotal])

	let pagination = []
	for(let i = 1; i <= pageCount; i++) {
		pagination.push(i)
	}

	useEffect(() => {
		setResultOpacity(0.3)
		getAdsList()
	}, [currentPage])

 return (
	<PageContainer>
		<AdsContainer>
			<div className="leftSide">
				<form method="GET">
					<input 
						type="text"
						name="q" 
						placeholder="O que você procura?"
						value={ q }
						onChange={ e => setQ(e.target.value) } />

					<div className="filterName">Estado:</div>
					<select 
						name="state" 
						value={ state }
						onChange={ e => setState(e.target.value) }>
						<option value=""></option>
						{stateList.map((item, key) => (
							<option key={key} value={item.name}>{item.name}</option>
						))}
					</select>

					<div className="filterName">Categoria:</div>
					<ul>
						{categories.map((item, key) => (
							<li 
								key={key} 
								className={cat == item.slug ? 'categoryItem active' : 'categoryItem'}
								onClick={() => setCat(item.slug)}>
								<img src={item.img} alt="" />
								<span>{item.name}</span>
							</li>
						))}
					</ul>
				</form>
			</div>
			<div className="rightSide">
				<h2>Resultados</h2>
				{loading && adsList.lenght === 0 && <div className="listWarning">Carregando...</div>}
				{!loading && adsList.length === 0 && <div className="listWarning">Não encontramos resultados.</div>}
				<div className="list" style={{ opacity: resultOpacity }}>
					{adsList.map((item, key) => (
						<AdItem key={key} data={item}/>
					))}
				</div>

				<div className="pagination">
					{pagination.map((item, key) =>(
						<div 
							key={key}
						 	className={item === currentPage ? 'pagItem active' : 'pagItem'}
							onClick={() => setCurrentPage(item)}>
								{item}
							</div>
					))}
				</div>
			</div>
		</AdsContainer>
	</PageContainer>
 )   
}