
import { NavigationContainer } from '@react-navigation/native'
import { AuthRoutes } from './auth.routes'
import { AppRoutes } from './app.routes'
import { useContext } from 'react'
import FireBaseContext from '../contexts/firebase'


export function Routes() {
    const user = useContext(FireBaseContext)

    return (
        <NavigationContainer  >
            {user ? <AppRoutes /> : <AuthRoutes />}
        </NavigationContainer>
    )
}