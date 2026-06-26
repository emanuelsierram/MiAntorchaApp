// app/index.tsx
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

import { Button } from '@/components/atoms/Button';
import { InputGroup } from '@/components/molecules/InputGroup';
import { IconButton } from '@/components/molecules/IconButton';
import { Header } from '@/components/organisms/Header';

export default function LoginScreen() {
    const router = useRouter();
    const [telefono, setTelefono] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1 }}
        >
            <ScrollView contentContainerStyle={{ flexGrow: 1 }} bounces={false}>
                <View style={styles.container}>

                    {/* HEADER (Organismo) */}
                    <Header />

                    {/* FORMULARIO */}
                    <View style={styles.formContainer}>
                        <Text style={styles.welcomeText}>¡Bienvenido!</Text>

                        {/* Input Teléfono (Molécula) */}
                        <InputGroup
                            leftIconName="phone"
                            placeholder="Número de teléfono"
                            keyboardType="phone-pad"
                            value={telefono}
                            onChangeText={setTelefono}
                        />

                        {/* Input Contraseña con Botón Visibilidad (Molécula) */}
                        <InputGroup
                            leftIconName="lock"
                            placeholder="Contraseña"
                            secureTextEntry={!isPasswordVisible}
                            value={contrasena}
                            onChangeText={setContrasena}
                            rightIconName={isPasswordVisible ? 'eye' : 'eye-slash'}
                            onRightIconPress={() => setIsPasswordVisible(!isPasswordVisible)}
                        />

                        {/* Botón de Inicio de Sesión (Átomo) */}
                        <Button
                            title="INICIAR SESIÓN"
                            onPress={() => router.replace('/(tabs)')}
                            variant="primary"
                            style={styles.buttonContainer}
                        />

                        <Text style={styles.orText}>O continúa con</Text>

                        {/* Botón de Google (Molécula) */}
                        <IconButton
                            label="Continua con Google"
                            iconSource={{ uri: 'https://img.icons8.com/color/48/000000/google-logo.png' }}
                            onPress={() => alert('Iniciar sesión con Google')}
                        />

                        <View style={styles.footer}>
                            <Text style={styles.footerText}>¿No tienes cuenta? </Text>
                            <TouchableOpacity>
                                <Text style={styles.linkText}>Regístrate</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    formContainer: { flex: 1, paddingHorizontal: 30, paddingTop: 30, marginTop: -20, backgroundColor: 'white', borderTopLeftRadius: 30, borderTopRightRadius: 30 },
    welcomeText: { fontSize: 24, fontWeight: 'bold', color: '#333', marginBottom: 25 },
    buttonContainer: { marginTop: 20 },
    orText: { textAlign: 'center', color: '#999', marginVertical: 20 },
    footer: { flexDirection: 'row', justifyContent: 'center', marginTop: 10, marginBottom: 30 },
    footerText: { color: '#666', fontSize: 15 },
    linkText: { color: '#4c669f', fontSize: 15, fontWeight: 'bold' },
});