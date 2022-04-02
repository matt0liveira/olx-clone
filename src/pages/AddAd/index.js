import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import MaskedInput from 'react-text-mask'
import createNumberMask from 'text-mask-addons/dist/createNumberMask'
import { ErrorMessage, PageContainer, PageTitle } from '../../components/MainComponents'
import { LoginContainer } from './style'
import useApi from '../../helpers/OlxApi'

export default () => {
	const api = useApi()
	const navigate = useNavigate()

	const [title, seTitle] = useState('')
	const [category, setCategory] = useState('')
	const [categories, setCategories] = useState([])
	const [price, setPrice] = useState('')
	const [priceNegotiable, setPriceNegotiable] = useState(false)
	const [desc, setDesc] = useState('')
	const [disabled, setDisabled] = useState(false)
	const [error, setError] = useState('')
	const fileField = useRef()

	useEffect(() => {
		const getCategories = async () => {
			const cats = await api.getCategories()
			setCategories(cats)
		}
		getCategories()
	}, [])

	const handleSubmit = async e => {
		e.preventDefault()
		setDisabled(true)
		setError('')
		let errors = []

		if(!title.trim()) {
			errors.push('Sem título')
		}

		if(!category) {
			errors.push('Sem categoria')
		}

		if(errors.length === 0) {
			const fData = new FormData()
			fData.append('title', title)
			fData.append('cat', category)
			fData.append('price', price)
			fData.append('priceneg', priceNegotiable)
			fData.append('desc', desc)

			if(fileField.current.files.length > 0) {
				for(let i = 0; i < fileField.current.files.length; i++) {
					fData.append('img', fileField.current.files[i])
				}
			}

			const json = await api.addAd(fData)

			if(!json.error) {
				navigate(`/ad/${json.id}`)
				return
			} else {
				setError(json.error)
			}
		} else {
			setError(errors.join("\n"))
		}
		setDisabled(false)
	}

	const priceMask = createNumberMask({
		prefix: 'R$ ',
		includeThousandsSeparator: true,
		thousandsSeparatorSymbol: '.',
		allowDecimal: true,
		decimalSymbol: ','
	})

 return (
	 <PageContainer>
		 <PageTitle>Postar um anúncio</PageTitle>
		 <LoginContainer>
		 		{error &&
					<ErrorMessage>{ error }</ErrorMessage>
				}
			 <form onSubmit={ handleSubmit }>
				 <label className="area">
					 <div className="area--title">Título</div>
					 <div className="area--input">
						 <input 
						 	type="text" 
							name="title"
							value={ title }
							onChange={ e => seTitle(e.target.value) }
							disabled={ disabled }
							required />
					 </div>
				 </label>

				 <label className="area">
					 <div className="area--title">Categoria</div>
					 <div className="area--input">
						 <select 
						 	name="category"
							disabled={disabled}
							onChange={ e => setCategory(e.target.value) }
							required>
								<option value=""></option>
								{categories && categories.map(item => (
									<option key={item._id} value={item._id}>{item.name}</option>
								))}
							</select>
						</div>
				 </label>

				 <label className="area">
					 <div className="area--title">Preço</div>
					 <div className="area--input">
						 <MaskedInput
						 		mask={priceMask}
								placeholder="R$ "
								disabled={disabled || priceNegotiable}
								value={ price }
								onChange={ e => setPrice(e.target.value) } />
					 </div>
				 </label>

				 <label className="area">
					 <div className="area--title">Preço negociável</div>
					 <div className="area--input">
						 <input 
						 	type="checkbox" 
							name="priceNegotiable"
							checked={ priceNegotiable }
							onChange={ () => setPriceNegotiable(!priceNegotiable) }
							disabled={ disabled } />
					 </div>
				 </label>

				 <label className="area">
					 <div className="area--title">Descrição</div>
					 <div className="area--input">
						 <textarea 
						 	type="text" 
							name="desc"
							value={ desc }
							onChange={ e => setDesc(e.target.value) }
							disabled={ disabled }
							required />
					 </div>
				 </label>

				 <label className="area">
					 <div className="area--title">Imagens (1 ou mais)</div>
					 <div className="area--input">
						 <input 
						 	type="file"
						 	disabled={ disabled }
							multiple
							ref={ fileField } />
					 </div>
				 </label>

				 <label className="area">
					 <div className="area--title"></div>
					 <div className="area--input">
						 <button type="submit" disabled={ disabled }>Adicionar anúncio</button>
					 </div>
				 </label>
			 </form>
		 </LoginContainer>
	 </PageContainer>
 )   
}