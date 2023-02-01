import { ActivityIndicator, Text, TouchableOpacity, TouchableOpacityProps } from "react-native";
import colors from "tailwindcss/colors";


type Props = TouchableOpacityProps & {
    title: string;
    isLoading?: boolean;
};

export function Button({ title, isLoading = false, ...rest }: Props) {
    return (
        <TouchableOpacity
            {...rest}
            disabled={isLoading}
            activeOpacity={0.7}
            className="w-full h-14 rounded-xl justify-center items-center bg-violet-700"
        >
            {isLoading ? <ActivityIndicator color={colors.white} /> : <Text className="text-sm text-white font-semibold" >{title}</Text>}
        </TouchableOpacity>
    )
}