import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";

export type ProductNavigationProps = {
    id?: string;
}

export type OrderNavigationProps = {
    id: string;
}

export declare global {
    namespace ReactNavigation {
        interface RootParamList {
            home: undefined;
            signIn: undefined;
            register: undefined;
            new: undefined;
            habit: {
                date: string;
            },
        }
    }
}