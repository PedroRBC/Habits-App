import { Alert, Text, View } from 'react-native';

import { useState } from 'react';
import { Input } from '../Controllers/Input';
import { Button } from '../Controllers/Button';

import auth from "@react-native-firebase/auth"
import firestore from "@react-native-firebase/firestore"

function isEmail(input) {
    let IsEmailRegExp = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/gi
    return IsEmailRegExp.test(input);
}

export function AccountForm() {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    function handleNewAccount() {
        if (username.length < 4) { return Alert.alert('Cadastro', 'Nome curto demais.') }
        if (!isEmail(email)) { return Alert.alert('Cadastro', 'Email invalido.') }
        if (password.length < 6) { return Alert.alert('Cadastro', 'Senha curta demais.') }
        setIsLoading(true);
        auth()
            .createUserWithEmailAndPassword(email, password)
            .then(user => {
                firestore()
                    .collection('users')
                    .doc(user.user.uid)
                    .set({
                        username,
                        email,
                        description: '',
                        avatar_url: user.user.photoURL || 'default',
                    })
            })
            .catch((err) => {
                if (err.code == 'auth/email-already-in-use') {
                    Alert.alert('Cadastro', 'Email já esta Cadastrado')
                } else {
                    console.log(err)
                }
            })
            .finally(() => setIsLoading(false))
    }

    return (
        <View>
            <Text className='text-3xl mb-6 self-start font- text-white' >Cadastrar</Text>
            <Input autoComplete='username-new' placeholder="Nome de Usuário" onChangeText={setUsername} />
            <Input autoComplete='email' placeholder="E-mail" onChangeText={setEmail} />
            <Input autoComplete='password-new' placeholder="Senha" secureTextEntry onChangeText={setPassword} />
            <Button title="Cadastrar" isLoading={isLoading} onPress={handleNewAccount} />
        </View>
    );
}