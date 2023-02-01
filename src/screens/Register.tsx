
import { View, KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { getBottomSpace } from 'react-native-iphone-x-helper';

import registerAnimation from '../assets/animations/register.json';

import { Lottie } from '../components/Animations/Lottie';

import { AccountForm } from '../components/Forms/AccountForm';
export function Register() {
    const navigation = useNavigation();
    const paddingBottom = getBottomSpace() + 48

    return (
        <View className='flex-1 bg-background pt-6 px-6'>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: paddingBottom }}
                    className='w-full' >
                    <Lottie source={registerAnimation} />
                    <Text className='text-sm font-regular text-white text-center mt-3 mb-6' >Conte conosco, estamos aqui para ajudar.</Text>
                    <AccountForm />

                    <TouchableOpacity className='flex-row items-center justify-center mt-8' onPress={() => navigation.goBack()}>
                        <MaterialIcons name="arrow-back" size={24} color="#6100FF" />
                        <Text className='text-sm font-bold text-white ml-1' >Eu já tenho uma conta</Text>
                    </TouchableOpacity>
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    );
}