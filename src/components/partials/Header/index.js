import React from 'react'
import { Link } from 'react-router-dom'
import { HeaderContainer } from './style'
import { doLogout, isLogged } from '../../../helpers/AuthHandler'

export default () => {
	const logged = isLogged()

	const handleLogout = () => {
		doLogout()
		window.location.href = '/'
	}
	return (
		<HeaderContainer>
			<div className="container">
				<div className="logo">
					<Link to="/">
						<span className="logo-1">O</span>
						<span className="logo-2">L</span>
						<span className="logo-3">X</span>
					</Link>
				</div>

				<nav>
					<ul>
						{logged &&
							<>
								<li><Link to="/post-an-ad" className="button">Poste um anúncio</Link></li>
								<li><Link to="/my-account">Minha conta</Link></li>
								<li><button onClick={ handleLogout }>Sair</button></li>
							</>
						}

						{!logged &&
						<>
							<li><Link to="/signin">Login</Link></li>
							<li><Link to="/signup">Cadastrar</Link></li>
						</>
						}
					</ul>
				</nav>
			</div>
		</HeaderContainer>
	)
}