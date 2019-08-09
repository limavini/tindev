import React, { useState, useEffect } from 'react';
import { Platform, KeyboardAvoidingView, Text, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';
import logo from "../assets/logo.png";
import AsyncStorage from "@react-native-community/async-storage";
import api from "../services/api";

const Login = ({ navigation }) => {

    const [user, setUser] = useState('');

    useEffect(() => {AsyncStorage.getItem('user').then(user => {
        if (user) {
            navigation.navigate('Main', { user });
        }
    })}, []);

    const handleLogin = async () => {
        const response = await api.post('/devs', {username: user});
        const { _id } = response.data;
        await AsyncStorage.setItem('user', _id);
        navigation.navigate('Main', { user: _id });
    };



    return (
        <KeyboardAvoidingView 
        behavior="padding"
        enabled={Platform.OS === 'ios'}
        style={styles.container}>
            <Image source={logo}/>

            <TextInput 
                placeholder="Digite seu usuário no Github"
                placeholderTextColor="#999"
                autoCorrect={false}
                keyboardAv
                autoCapitalize="none"
                style={styles.input}
                onChangeText={setUser}
             />
             <TouchableOpacity onPress={handleLogin} style={styles.button}><Text style={styles.buttonText}>Enviar</Text></TouchableOpacity>
        </KeyboardAvoidingView>
        
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 30
    },
    input: {
        height: 46,
        alignSelf: 'stretch',
        backgroundColor: '#FFF',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 4,
        marginTop: 20,
        paddingHorizontal: 15,
    },
    button: {
        height: 46,
        alignSelf: 'stretch',
        backgroundColor: '#DF4742',
        marginTop: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16,
    }
})

export default Login;