import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import analytics from '@react-native-firebase/analytics';
import { createContext, PropsWithChildren, useEffect, useState } from 'react'

type ContextProps = {
    user: FirebaseAuthTypes.User | null,
    initialize: boolean
}

const FireBaseContext = createContext<ContextProps>({
    user: null,
    initialize: true
});

export const FireBaseProvider = ({ children }: PropsWithChildren) => {
    const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
    const [initialize, setInitialize] = useState(true);

    function userInit(user) {
        setUser(user);
        if (initialize) setInitialize(false)
    }

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(userInit);
        return subscriber;
    }, [])

    if (user) {
        firestore()
            .collection('users')
            .doc(user.uid)
            .get()
            .then(userData => {
                analytics()
                    .setUserId(user.uid);
                analytics()
                    .setUserProperty('username', userData.data().username);
                analytics()
                    .setAnalyticsCollectionEnabled(true)
            })
    }
    return <FireBaseContext.Provider value={{
        user,
        initialize
    }}>

        {children}

    </FireBaseContext.Provider>
}

export default FireBaseContext;