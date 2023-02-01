import { TouchableOpacity, Dimensions, TouchableOpacityProps } from "react-native";
import { generateProgress } from "../../utils/generate-progress";
import clsx from "clsx";
import dayjs from "dayjs";
const WEEK_DAYS = 7;
const SCREEN_HORIZONTAL_PADDING = (32 * 2) / 5

export const DAY_MARGIN_BETWEEN = 8;
export const DAY_SIZE = (Dimensions.get('screen').width / WEEK_DAYS) - (SCREEN_HORIZONTAL_PADDING + 5)

interface Props extends TouchableOpacityProps {
    amount?: number;
    completed?: number;
    date: Date;
}

export function HabitDay({ amount = 0, completed = 0, date, ...rest }: Props) {
    const today = dayjs().startOf('day').toDate();
    const HabitsProgress = amount > 0 ? generateProgress(amount, completed) : 0;
    const isCurrentDay = dayjs(date).isSame(today)

    return (
        <TouchableOpacity
            className={clsx("rounded-lg border-2 m-1", {
                ["bg-zinc-900 border-zinc-800"]: HabitsProgress === 0,
                ["bg-violet-900 border-violet-700"]: HabitsProgress > 0 && HabitsProgress < 20,
                ["bg-violet-800 border-violet-600"]: HabitsProgress >= 20 && HabitsProgress < 40,
                ["bg-violet-700 border-violet-500"]: HabitsProgress >= 40 && HabitsProgress < 60,
                ["bg-violet-600 border-violet-500"]: HabitsProgress >= 60 && HabitsProgress < 80,
                ["bg-violet-500 border-violet-400"]: HabitsProgress >= 80,
                ["border-white border-2"]: isCurrentDay
            })}
            style={{ width: DAY_SIZE, height: DAY_SIZE }}
            activeOpacity={0.7}
            {...rest}
        />
    )
}