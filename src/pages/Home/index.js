import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { PageContainer } from '../../components/MainComponents'
import { HomeContainer, SearchContainer } from './style'
import useApi from '../../helpers/OlxApi'
import AdItem from '../../components/partials/AdItem'

export default () => {
	const api = useApi()

	const [stateList, setStateList] = useState([])
	const [categories, setCategories] = useState([])
	const [adsList, setAdsList] = useState([])

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
		const getRecentAds = async () => {
			const json = await api.getAds({
				sort: 'desc',
				limit: 8
			})
			setAdsList(json.ads)
		}
		getRecentAds()
	}, [])

 return (
	 <>
	 	<SearchContainer>
			<PageContainer>
				<div className="searchBox">
					<form method="GET" action="/ads">
						<input type="search" name="q" placeholder="O que você procura?" />
						<select name="state" id="state">
							{stateList.map((item, key) => (
								<option value={item.name} key={key}>{item.name}</option>
							))}
						</select>
						<button>Pesquisar</button>
					</form>
				</div>

				<div className="categoryList">
					{categories.map((item, key) => (
						<Link key={key} to={`/ads?cat=${item.slug}`} className="categoryItem">
							<img src={item.img} alt="" />
							<span>{item.name}</span>
						</Link>
					))}
				</div>
			</PageContainer>
		</SearchContainer>

		<PageContainer>
			<HomeContainer>
				<h2>Anúncios recentes</h2>
				<div className="list">
					{adsList.map((item, key) => (
						<AdItem key={key} data={item}></AdItem>
					))}
				</div>

				<Link to="/ads" className="seeAllLink">Ver todos</Link>

				<hr />

				Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repudiandae deserunt quos quidem ratione accusamus laborum, aliquam nesciunt necessitatibus dolor dolorum tempore voluptas quisquam nihil placeat maiores consequatur eaque minima pariatur.
			</HomeContainer>
		</PageContainer>
	 </>
 )   
}