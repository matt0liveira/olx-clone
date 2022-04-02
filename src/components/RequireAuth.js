import { Navigate } from 'react-router-dom'
import { isLogged } from '../helpers/AuthHandler'


export default ({ children, ...rest }) => {
    const logged = isLogged()
    const auth = (rest.private && !logged ? false : true)
    if(!auth) {
        return <Navigate to="/signin" />
    }
    return children
}