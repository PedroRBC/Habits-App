
import { TextInput, TextInputProps } from 'react-native';
import colors from "tailwindcss/colors";

export function Input({ ...rest }: TextInputProps) {
    return <TextInput
        {...rest}
        placeholderTextColor={colors.zinc[400]}
        className="w-full h-14 bg-zinc-500 rounded-xl  text-sm pt-1 pl-3 mb-3 font-bold border border-zinc-400 "
    />
}