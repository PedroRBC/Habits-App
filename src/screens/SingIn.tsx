import { KeyboardAvoidingView, Text, View, Platform, ScrollView } from "react-native";
import { getBottomSpace } from 'react-native-iphone-x-helper';

import signInAnimation from '../assets/animations/signin.json';

import { SignInForm } from "../components/Forms/SingIn";
import { Lottie } from "../components/Animations/Lottie";

export function SingIn() {
    const paddingBottom = getBottomSpace() + 48
    return (
        <View className="flex-1 bg-background pt-6 px-6" >
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: paddingBottom }}
                    className="w-full"
                >
                    <Lottie source={signInAnimation} />
                    <Text className="font-regular text-sm text-center mt-3 mb-6 text-white"
                    >Conte conosco, e vamos turbinar seus Hábitos!</Text>
                    <SignInForm />
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    );
}