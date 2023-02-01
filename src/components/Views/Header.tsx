import { View, TouchableOpacity, Text, Image } from "react-native";
import { Feather } from "@expo/vector-icons";
import colors from 'tailwindcss/colors'
import { useNavigation } from '@react-navigation/native'
import auth from '@react-native-firebase/auth'
import Logo from '../../assets/logo.svg'



interface HeaderProps {
    avatar: string,
    id: string
}

export function Header() {
    function handleSignOut() {
        auth()
            .signOut();
    }
    return (
        <View className="w-full flex-row items-center justify-between">
            <Logo />
            <TouchableOpacity
                activeOpacity={0.7}
                className="mr-2 border-2 border-violet-500 bg-zinc-900 p-3 rounded-xl"
                onPress={handleSignOut}
            >
                <Feather name="log-out" color={colors.zinc[300]} size={30} />
            </TouchableOpacity>
        </View>
    )
}