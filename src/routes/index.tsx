import analytics from '@react-native-firebase/analytics';
import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native'
import { AuthRoutes } from './auth.routes'
import { AppRoutes } from './app.routes'
import { useContext, useRef, useState } from 'react'
import { Loading } from '../components/Views/Loading';
import FireBaseContext from '../contexts/firebase';

export function Routes() {
    const { user, initialize } = useContext(FireBaseContext)
    const navigationRef = useNavigationContainerRef();
    const routeNameRef = useRef<any>();

    if (initialize) {
        return <Loading />
    }

    return (
        <NavigationContainer
            ref={navigationRef}
            onReady={() => {
                routeNameRef.current = navigationRef.getCurrentRoute().name;
            }}
            onStateChange={async () => {
                const previousRouteName = routeNameRef.current;
                const currentRouteName = navigationRef.current.getCurrentRoute().name;
                if (currentRouteName !== previousRouteName) {
                    analytics()
                        .logScreenView({
                            screen_name: currentRouteName,
                            screen_class: currentRouteName
                        })
                }
                routeNameRef.current = currentRouteName;
            }}
        >
            {user ? <AppRoutes /> : <AuthRoutes />}
        </NavigationContainer>
    )
}