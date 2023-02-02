import { Text, View, ScrollView, Alert, RefreshControl } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { useState, useCallback, useContext, useEffect } from "react";
import dayjs from "dayjs";

import { generateDates } from '../utils/generate-dates'

const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S']
const datesYearStart = generateDates()
const minSummaryDates = 18 * 5;
const amountOfDaysToFill = minSummaryDates - datesYearStart.length;

import firestore, { FirebaseFirestoreTypes } from '@react-native-firebase/firestore'


import { HabitDay, DAY_SIZE } from "../components/Views/HabitDay";
import { Header } from "../components/Views/Header";
import { Loading } from "../components/Views/Loading";
import { AddButton } from "../components/Controllers/AddButton";
import FireBaseContext from "../contexts/firebase";


type Summary = {
    id: string,
    date: FirebaseFirestoreTypes.Timestamp,
    amount: number,
    completed: number,
}[]


export function HomeScreen() {
    const [loading, setLoading] = useState(true)
    const { user } = useContext(FireBaseContext)
    const [summary, setSummary] = useState<Summary>([])
    const { navigate } = useNavigation();

    useEffect(() => {
        setLoading(true)
        const subscribe = firestore()
            .collection('users')
            .doc(user.uid)
            .collection('marked_dates')
            .onSnapshot(querySnapshot => {
                const data = querySnapshot.docs.map(doc => {
                    let data = doc.data()
                    return {
                        id: doc.id,
                        date: data.date,
                        amount: data.amount.length,
                        completed: data.completed.length
                    }
                }) as Summary

                setSummary(data)
                setLoading(false);
            })

        return () => subscribe();
    }, [])

    if (loading) {
        return <Loading />
    };

    return (
        <View className="flex-1 bg-background px-8 pt-16">
            <Header />

            <View className="flex-row mt-6 mb-2">
                {
                    weekDays.map((weekDay, i) => (
                        <Text
                            key={`${weekDay}-${i}`}
                            className="text-zinc-400 text-xl font-bold text-center mx-1"
                            style={{ width: DAY_SIZE }}
                        >
                            {weekDay}
                        </Text>
                    ))
                }
            </View>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 50 }}
            >
                {summary &&
                    <View className='flex-row flex-wrap'>
                        {
                            datesYearStart.map(date => {
                                const dayWithHabits = summary.find(day => {
                                    return dayjs(date).isSame(day.date.toDate(), 'day')
                                })
                                const FireStoreDate = dayWithHabits ? dayWithHabits.date : firestore.Timestamp.fromDate(date)
                                return (
                                    <HabitDay
                                        key={date.toISOString()}
                                        date={date}
                                        amount={dayWithHabits?.amount}
                                        completed={dayWithHabits?.completed}
                                        onPress={() => navigate('habit', { date: FireStoreDate.toDate().toISOString() })}
                                    />
                                )
                            })
                        }

                        {
                            amountOfDaysToFill > 0 && Array
                                .from({ length: amountOfDaysToFill })
                                .map((_, index) => (
                                    <View
                                        key={index}
                                        className="bg-zinc-900 rounded-lg border-2 m-1 border-zinc-800 opacity-40"
                                        style={{ width: DAY_SIZE, height: DAY_SIZE }}
                                    />
                                ))
                        }

                    </View>}
            </ScrollView>
            <AddButton />
        </View>
    )
}