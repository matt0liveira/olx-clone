import React, { useEffect, useState } from 'react'
import { ErrorMessage, PageContainer, PageTitle } from '../../components/MainComponents'
import { LoginContainer } from './style'
import useApi from '../../helpers/OlxApi'
import { doLogin } from '../../helpers/AuthHandler'

export default () => {
	const api = useApi()

	const [name, setName] = useState('')
	const [uf, setUf] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [confirmPass, setConfirmPass] = useState('')
	const [disabled, setDisabled] = useState(false)
	const [error, setError] = useState('')

	const [ufList, setUfList] = useState([])
	useEffect(() => {
		const getStates = async () => {
			const uflist = await api.getStates()
			setUfList(uflist)
		}
		getStates()
	}, [])

	const handleSubmit = async e => {
		e.preventDefault()
		setDisabled(true)
		setError('')

		if(password !== confirmPass) {
			setError("Campos 'Senha' e 'Confirmar senha' devem ser iguais!")
			setDisabled(false)
			return
		}
		
		const json = await api.register(name, uf, email, password)
		if(json.error) {
			setError(json.error)
		} else {
			doLogin(json.token)
			window.location.href = '/'
		}
		setDisabled(false)
	}

 return (
	 <PageContainer>
		 <PageTitle>Cadastro</PageTitle>
		 <LoginContainer>
		 		{error &&
					<ErrorMessage>{ error }</ErrorMessage>
				}
			 <form onSubmit={ handleSubmit }>
			 	<label className="area">
					<div className="area--title">Nome completo</div>
					<div className="area--input">
						<input 
						type="text"
						name="name"
						value={ name }
						onChange={ e => setName(e.target.value) }
						disabled={ disabled }
						required />
					</div>
				 </label>

				 <label className="area">
					 <div className="area--title">Estado</div>
					 <div className="area--input">
						 <select name="uf" id="uf" required value={ uf } onChange={ e => setUf(e.target.value) }>
							<option value=""></option>
							{ufList.map((item, key) => (
								<option value={item._id} key={key}>{item.name}</option>
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
							value={ email }
							onChange={ e => setEmail(e.target.value) }
							disabled={ disabled }
							required />
					 </div>
				 </label>

				 <label className="area">
					 <div className="area--title">Senha</div>
					 <div className="area--input">
						 <input 
						 	type="password" 
							name="password"
							value={ password }
							onChange={ e => setPassword(e.target.value) }
							disabled={ disabled }
							required />
					 </div>
				 </label>

				 <label className="area">
					 <div className="area--title">Confirmar senha</div>
					 <div className="area--input">
						 <input 
						 	type="password" 
							name="confirmPass"
							value={ confirmPass }
							onChange={ e => setConfirmPass(e.target.value) }
							disabled={ disabled }
							required />
					 </div>
				 </label>

				 <label className="area">
					 <div className="area--title"></div>
					 <div className="area--input">
						 <button type="submit" disabled={ disabled }>Fazer cadastro</button>
					 </div>
				 </label>
			 </form>
		 </LoginContainer>
	 </PageContainer>
 )   
}