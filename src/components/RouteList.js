import React from "react"
import { Routes, Route } from 'react-router-dom'
import RequireAuth from './RequireAuth'
import About from "../pages/About"
import AdPage from "../pages/AdPage"
import Home from "../pages/Home/"
import NotFound from "../pages/NotFound"
import SignIn from "../pages/SignIn"
import SignUp from "../pages/SignUp"
import AddAd from '../pages/AddAd'
import Ads from "../pages/Ads"
import MyAccount from "../pages/MyAccount"

export default () => {
  return (
		<Routes>
			<Route exact path="/" element={ <Home /> } />
			<Route exact path="/sobre" element={ <About /> } />
			<Route exact path="/signin" element={ <SignIn /> } />
			<Route exact path="/signup" element={ <SignUp /> } />
			<Route exact path="/ad/:id" element={ <AdPage /> } />
			<Route exact path="/ads" element={ <Ads /> } />
			<Route exact path="/my-account" element={ 
				<RequireAuth private>
					<MyAccount /> 
				</RequireAuth>
			} />
			<Route exact path="/post-an-ad" element={
				<RequireAuth private>
					<AddAd /> 
				</RequireAuth>
			} />
			<Route exact path="*" element={ <NotFound /> } />
		</Routes>
	)
}