import { Text, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import colors from "tailwindcss/colors";
import { useNavigation } from '@react-navigation/native'

export function AddButton() {
    const { navigate } = useNavigation();

    return (
        <TouchableOpacity
            onPress={() => { navigate('new') }}
            activeOpacity={0.7}
            className='absolute flex-row h-14 px-5 border border-violet-500 rounded-xl items-center bottom-5 right-6 bg-zinc-900 '
        >
            <Text className="text-white mr-4 font-semibold text-base">
                Novo
            </Text>
            <Feather
                name='plus'
                color={colors.violet[500]}
                size={20}

            />

        </TouchableOpacity>
    )

}