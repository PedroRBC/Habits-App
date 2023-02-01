import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { createContext, PropsWithChildren, useEffect, useState } from 'react'

const FireBaseContext = createContext<FirebaseAuthTypes.User | null>(null);

export const FireBaseProvider = ({ children }: PropsWithChildren) => {
    const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(setUser);
        return subscriber;
    }, [])

    return <FireBaseContext.Provider value={user}>

        {children}

    </FireBaseContext.Provider>
}

export default FireBaseContext;