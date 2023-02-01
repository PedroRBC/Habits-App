import { useEffect, useState, useContext } from "react";
import firestore from '@react-native-firebase/firestore'
import { Alert, ScrollView, Text, View } from "react-native";
import { useRoute } from "@react-navigation/native";
import { BackButton } from "../components/Views/BackButton";
import { generateProgress } from '../utils/generate-progress'
import dayjs from 'dayjs'
import { ProgressBar } from "../components/Views/ProgressBar";
import { CheckBox } from "../components/Views/CheckBox";
import { Loading } from "../components/Views/Loading";
import { HabitsEmpty } from "../components/Views/HabitsEmpty";
import clsx from "clsx";
import FireBaseContext from "../contexts/firebase";

interface Params {
    date: string;
}

interface possibleHabitsProps {
    id: string,
    title: string,
    created_at: string,
}

export function HabitScreen() {
    const [loading, setLoading] = useState(true)
    const user = useContext(FireBaseContext)
    const [possibleHabits, setPossibleHabits] = useState<possibleHabitsProps[]>([])
    const [completedHabits, setCompletedHabits] = useState<string[]>([]);
    const route = useRoute();
    const { date } = route.params as Params;
    const parsedDate = dayjs(date)
    const isPastDate = parsedDate.endOf('day').isBefore(new Date())
    const dayOfWeek = parsedDate.format('dddd')
    const dayAndMonth = parsedDate.format('DD/MM')
    const weekDay = parsedDate.get("day");
    const fireStoreDate = parsedDate.toDate()
    const today = firestore.Timestamp.fromDate(dayjs().startOf('day').toDate())
    const habitsProgress = possibleHabits?.length ? generateProgress(possibleHabits.length, completedHabits.length) : 0
    const markedDaysReference = firestore()
        .collection('users')
        .doc(user.uid)
        .collection('marked_dates')

    async function handleToggleHabit(habitId: string) {
        try {
            markedDaysReference
                .where('date', '==', today)
                .get().then(querySnapshot => {
                    let [day] = querySnapshot.docs.map(day => {
                        let data = day.data()
                        if (!data) return data

                        if (data.completed.includes(habitId)) {
                            markedDaysReference
                                .doc(day.id)
                                .update({
                                    completed: firestore.FieldValue.arrayRemove(habitId)
                                })
                        } else {
                            markedDaysReference
                                .doc(day.id)
                                .update({
                                    completed: firestore.FieldValue.arrayUnion(habitId)
                                })
                        }

                        return day.data()
                    })
                    if (!day) {
                        console.log('n')
                        markedDaysReference
                            .add({
                                date: today,
                                amount: possibleHabits.map(habits => { return habits.id }),
                                completed: [habitId]
                            })
                    }
                })

            if (completedHabits.includes(habitId)) {
                setCompletedHabits(prevState => prevState.filter(habit => habit !== habitId))
            } else {
                setCompletedHabits(prevState => [...prevState, habitId])
            }

        } catch (err) {
            console.error(err)
            Alert.alert('Ops', 'Não foi possível atualizar o Hábito.')

        }
    }

    useEffect(() => {
        setLoading(true)
        const subscribePossible = firestore()
            .collection('users')
            .doc(user.uid)
            .collection('habits')
            .where('created_at', '<=', fireStoreDate)
            .where('avaliable_days', 'array-contains', weekDay)
            .onSnapshot(querySnapshot => {
                const data = querySnapshot.docs.map(doc => {
                    let data = doc.data()
                    return {
                        id: doc.id,
                        title: data.title,
                        created_at: data.created_at
                    }
                }) as possibleHabitsProps[];
                setPossibleHabits(data)
                setLoading(false)
            })
        return () => subscribePossible();
    }, [])

    useEffect(() => {
        setLoading(true)
        const subscribeCompleted = firestore()
            .collection('users')
            .doc(user.uid)
            .collection('marked_dates')
            .where('date', '==', fireStoreDate)
            .onSnapshot(querySnapshot => {
                const [data] = querySnapshot.docs.map(doc => {
                    return doc.data().completed
                })
                if (data == undefined) {
                    setCompletedHabits([])
                } else {
                    setCompletedHabits(data)
                }
                setLoading(false)
            })
        return () => subscribeCompleted();
    }, [])

    if (loading) {
        return <Loading />
    }

    return (
        <View className="flex-1 bg-background px-8 pt-16">
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 100 }}
            >
                <BackButton />

                <Text className="mg-6 text-zinc-400 font-semibold text-base lowercase">
                    {dayOfWeek}
                </Text>

                <Text className="text-white font-extrabold text-3xl">
                    {dayAndMonth}
                </Text>

                <ProgressBar progress={habitsProgress} />

                <View className={clsx("mt-6", {
                    ["opacity-40"]: isPastDate
                })}>
                    {
                        possibleHabits.length != 0 ?
                            possibleHabits.map(habit => <CheckBox
                                key={habit.id}
                                title={habit.title}
                                onPress={() => { handleToggleHabit(habit.id) }}
                                disabled={isPastDate}
                                checked={completedHabits.includes(habit.id)} />) : (!isPastDate && <HabitsEmpty />)
                    }
                </View>
                {
                    isPastDate && <Text className="text-white text-lg mt-10 text-center" >
                        So é possível atualizar os hábitos da data atual.
                    </Text>
                }
            </ScrollView>

        </View>
    )
}