import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { HomeScreen } from '../screens/Home';
import { NewScreen } from '../screens/New';
import { HabitScreen } from '../screens/Habit';

const { Navigator, Screen } = createNativeStackNavigator();

export function AppRoutes() {
    return (
        <Navigator screenOptions={{ headerShown: false }} >
            <Screen
                name='home'
                component={HomeScreen}
            />

            <Screen
                name='new'
                component={NewScreen}
                options={{ animation: 'slide_from_right' }}
            />

            <Screen
                name='habit'
                component={HabitScreen}
                options={{ animation: 'slide_from_right' }}
            />

        </Navigator>
    )
}