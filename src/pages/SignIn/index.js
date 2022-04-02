import React, { useState } from 'react'
import { ErrorMessage, PageContainer, PageTitle } from '../../components/MainComponents'
import { LoginContainer } from './style'
import useApi from '../../helpers/OlxApi'
import { doLogin } from '../../helpers/AuthHandler'

export default () => {
	const api = useApi()

	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [rememberPass, setRememberPass] = useState('')
	const [disabled, setDisabled] = useState(false)
	const [error, setError] = useState('')

	const handleSubmit = async e => {
		e.preventDefault()
		setDisabled(true)
		setError('')
		const json = await api.login(email, password)
		if(json.error) {
			setError(json.error)
		} else {
			doLogin(json.token, rememberPass)
			window.location.href = '/'
		}
		setDisabled(false)
	}

 return (
	 <PageContainer>
		 <PageTitle>Login</PageTitle>
		 <LoginContainer>
		 		{error &&
					<ErrorMessage>{ error }</ErrorMessage>
				}
			 <form onSubmit={ handleSubmit }>
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
					 <div className="area--title">Lembrar senha</div>
					 <div className="area--input">
						 <input 
						 	type="checkbox" 
							name="rememberPass"
							checked={ rememberPass }
							onChange={ () => setRememberPass(!rememberPass) }
							disabled={ disabled } />
					 </div>
				 </label>

				 <label className="area">
					 <div className="area--title"></div>
					 <div className="area--input">
						 <button type="submit" disabled={ disabled }>Fazer login</button>
					 </div>
				 </label>
			 </form>
		 </LoginContainer>
	 </PageContainer>
 )   
}