import { createNativeStackNavigator } from '@react-navigation/native-stack';

const { Navigator, Screen } = createNativeStackNavigator();

import { SingIn } from '../screens/SingIn';
import { Register } from '../screens/Register';

export function AuthRoutes() {
    return (
        <Navigator screenOptions={{ headerShown: false }} >
            <Screen name='singIn' component={SingIn} />
            <Screen name="register" component={Register} options={{ animation: 'slide_from_right' }} />
        </Navigator>
    )
}