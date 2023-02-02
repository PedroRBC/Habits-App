import { useContext, useState } from "react";
import { Alert, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import firestore from '@react-native-firebase/firestore';
import analytics from '@react-native-firebase/analytics';
import { BackButton } from "../components/Views/BackButton";
import { CheckBox } from "../components/Views/CheckBox";
import { Feather } from "@expo/vector-icons";
import colors from "tailwindcss/colors";
import FireBaseContext from "../contexts/firebase";
import dayjs from "dayjs";

const avaiableWeekDays = ['Domingo', 'Segunda-feria', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado']

export function NewScreen() {
    const [weekDays, setWeekDays] = useState<number[]>([]);
    const [title, setTitle] = useState('')
    const { user } = useContext(FireBaseContext)


    function handleToggleWeekDay(weekDayIndex: number) {
        if (weekDays.includes(weekDayIndex)) {
            setWeekDays(prevState => prevState.filter(weekDay => weekDay !== weekDayIndex))
        } else {
            setWeekDays(prevState => [...prevState, weekDayIndex])
        }
    }

    async function handleCreateNewHabit() {
        try {
            if (!title.trim() || weekDays.length === 0) {
                return Alert.alert('Novo Hábito', 'Informe o nome do hábito e escolha a periodicidade.')
            }
            const today = firestore.Timestamp.fromDate(dayjs().startOf('day').toDate())
            firestore()
                .collection('users')
                .doc(user.uid)
                .collection('habits')
                .add({
                    title,
                    avaliable_days: weekDays,
                    created_at: today
                })
            analytics()
                .logEvent('newHabit', {
                    weekDays: weekDays,
                })

            setTitle('')
            setWeekDays([]);
            Alert.alert('Novo hábito', 'Hábito criado com sucesso!')
        } catch (err) {
            console.error(err);
            Alert.alert('Ops', 'Não foi possível criar o novo hábito')
        }
    }

    return (
        <View className="flex-1 bg-background px-8 pt-16">
            <ScrollView showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 100 }}
            >

                <BackButton />

                <Text className="mt-6 text-white font-extrabold text-3xl" >
                    Criar hábito
                </Text>


                <Text className="mt-6 text-white font-semibold text-base" >
                    Qual seu comprometimento?
                </Text>

                <TextInput className="h-12 pl-4 rounded-lg mt-3 bg-zinc-900 text-white border-2 border-zinc-800 focus:border-green-600"
                    placeholder="ex.: Ler, Estudar, Dormir bem, etc... "
                    placeholderTextColor={colors.zinc[400]}
                    onChangeText={setTitle}
                    value={title}
                />

                <Text className="font-semibold mt-4 mb-3 text-white text-base">
                    Qual a recorrência?
                </Text>

                {
                    avaiableWeekDays.map((weekDay, i) => (
                        <CheckBox key={`${weekDay}-${i}`} title={weekDay}
                            checked={weekDays.includes(i)}
                            onPress={() => { handleToggleWeekDay(i) }}
                        />
                    ))
                }

                <TouchableOpacity
                    className="w-full h-14 flex-row items-center justify-center bg-green-600 rounded-md mt-6"
                    activeOpacity={0.7}
                    onPress={handleCreateNewHabit}
                >
                    <Feather
                        name='check'
                        size={20}
                        color={colors.white}
                    />

                    <Text className="font-semibold text-base text-white ml-2" >
                        Confirmar
                    </Text>
                </TouchableOpacity>

            </ScrollView>
        </View>
    )
}