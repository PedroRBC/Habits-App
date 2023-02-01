import { Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import colors from 'tailwindcss/colors';

type Props = TouchableOpacityProps & {
    title: string;
    icon: keyof typeof MaterialIcons.glyphMap;
}

export function FooterButton({ title, icon, ...rest }: Props) {

    return (
        <TouchableOpacity className='flex-row items-center justify-center'  {...rest}>
            <MaterialIcons name={icon} size={24} color={colors.white} />
            <Text className='text-sm font-bold ml-2 text-white ' >{title}</Text>
        </TouchableOpacity>
    );
}