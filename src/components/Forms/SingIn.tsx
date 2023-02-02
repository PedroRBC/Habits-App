import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { Alert, Text, View } from "react-native";
import { Button } from "../Controllers/Button";
import { FooterButton } from "../Controllers/FooterButton";
import { Input } from "../Controllers/Input";

import auth from "@react-native-firebase/auth";
import analytics from '@react-native-firebase/analytics';

function isEmail(input) {
    let IsEmailRegExp = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/gi
    return IsEmailRegExp.test(input);
}

export function SignInForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const navigation = useNavigation()

    function handleSignIn() {
        if (!isEmail(email)) { return Alert.alert('Login', 'Email invalido.') }
        if (password.length < 6) { return Alert.alert('Login', 'Senha curta demais.') }
        setIsLoading(true);
        auth()
            .signInWithEmailAndPassword(email, password)
            .then(() => {
                analytics().logLogin({ method: 'email' })
            })
            .catch(err => {
                setIsLoading(false);
                if (err.code == 'auth/wrong-password') {
                    Alert.alert('Login', 'Senha incorreta')
                } else if (err.code == 'auth/user-not-found') {
                    Alert.alert('Login', 'Não existe nenhuma conta com este E-mail.')
                } else {
                    console.log(err)
                }
            })
    }

    function handleForgotPassword() {
        if (email.length == 0) { return Alert.alert('Redefinir senha', 'Escreva o email que quer redefinir.') }
        auth()
            .sendPasswordResetEmail(email)
            .then(() => Alert.alert('Redefinir senha', 'Enviamos um e-mail para você'))
            .catch(err => console.log(err))
    }

    return (
        <View>
            <Text className="text-white text-3xl self-start font-bold mt-3 mb-6" >Entrar</Text>
            <Input autoComplete="email" placeholder="E-mail" onChangeText={setEmail} />
            <Input autoComplete="password" placeholder="Senha" secureTextEntry onChangeText={setPassword} />
            <Button title="Entrar" onPress={handleSignIn} isLoading={isLoading} />
            <View className="flex-row justify-between items-center mt-12" >
                <FooterButton title="Criar conta" icon="person-add" onPress={() => navigation.navigate('register')} />
                <FooterButton title="Redefinir senha" icon="email" onPress={handleForgotPassword} />
            </View>
        </View>
    )
}