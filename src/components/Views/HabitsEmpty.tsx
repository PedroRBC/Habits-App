import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import colors from "tailwindcss/colors";
import { Feather } from "@expo/vector-icons";



export function HabitsEmpty() {
    const { navigate } = useNavigation();

    return <View>
        <Text className="text-zinc-400 text-base" >
            Você ainda não está monitorando nenhum hábito Neste Dia.
        </Text>

        <TouchableOpacity
            className="w-full h-14 flex-row items-center justify-center bg-violet-600 rounded-md mt-12"
            activeOpacity={0.7}
            onPress={() => navigate('new')}
        >

            <Feather
                name='plus-circle'
                size={20}
                color={colors.white}
            />

            <Text className="font-semibold text-base text-white ml-2" >
                Criar Hábito
            </Text>
        </TouchableOpacity>

    </View>




}