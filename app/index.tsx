// app/index.tsx
import { FontAwesome } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    Dimensions,
    Image,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

const { height } = Dimensions.get('window');

export default function LoginScreen() {
    const router = useRouter();
    const [telefono, setTelefono] = useState('');
    const [contrasena, setContrasena] = useState('');

    // --- NUEVO: Estado para controlar la visibilidad de la contraseña ---
    // SIMILITUD ANGULAR: public isPasswordVisible: boolean = false;
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1 }}
        >
            <ScrollView contentContainerStyle={{ flexGrow: 1 }} bounces={false}>
                <View style={styles.container}>

                    {/* HEADER (Mantenemos la UI anterior) */}
                    <View style={styles.headerContainer}>
                        <Image
                            source={require('@/assets/images/logo.png')}
                            style={styles.headerImage}
                        />
                    </View>

                    {/* FORMULARIO */}
                    <View style={styles.formContainer}>
                        <Text style={styles.welcomeText}>¡Bienvenido!</Text>

                        {/* Input Teléfono (Mantenemos la UI anterior) */}
                        <View style={styles.inputGroup}>
                            <FontAwesome name="phone" size={20} color="#666" style={styles.inputIcon} />
                            <TextInput
                                style={styles.input}
                                placeholder="Número de teléfono"
                                keyboardType="phone-pad"
                                value={telefono}
                                onChangeText={setTelefono}
                            />
                        </View>

                        {/* --- MODIFICADO: Input Contraseña con Botón Visibilidad --- */}
                        <View style={styles.inputGroup}>
                            <FontAwesome name="lock" size={20} color="#666" style={styles.inputIcon} />
                            <TextInput
                                style={styles.input}
                                placeholder="Contraseña"

                                // SIMILITUD ANGULAR: <input [type]="isPasswordVisible ? 'text' : 'password'">
                                // React Native controla el enmascarado con este booleano.
                                secureTextEntry={!isPasswordVisible} // ¡Se niega la visibilidad para enmascarar!

                                value={contrasena}
                                onChangeText={setContrasena}
                            />

                            {/* BOTÓN "OJITO" */}
                            <TouchableOpacity
                                style={styles.visibilityToggle}
                                onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                            >
                                <FontAwesome
                                    // SIMILITUD ANGULAR: *ngIf="isPasswordVisible" show 'eye', else 'eye-slash'
                                    // Aquí usamos un operador ternario para cambiar el nombre del icono dinámicamente.
                                    name={isPasswordVisible ? 'eye' : 'eye-slash'}
                                    size={20}
                                    color="#666"
                                />
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity onPress={() => router.replace('/(tabs)')} style={styles.buttonContainer}>
                            <LinearGradient
                                colors={['#3db9f3', '#1b8edb', '#1474f1']}
                                style={styles.gradientButton}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                            >
                                <Text style={styles.buttonText}>INICIAR SESIÓN</Text>
                            </LinearGradient>
                        </TouchableOpacity>

                        <Text style={styles.orText}>O continúa con</Text>

                        <TouchableOpacity style={styles.googleButton}>
                            <Image
                                source={{ uri: 'https://img.icons8.com/color/48/000000/google-logo.png' }}
                                style={styles.googleIcon}
                            />
                            <Text style={styles.googleButtonText}>Continua con Google</Text>
                        </TouchableOpacity>

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
    headerContainer: { height: height * 0.4, width: '100%', overflow: 'hidden' },
    headerImage: { width: '100%', height: '100%' },
    logoOverlay: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(76, 102, 159, 0.3)' },
    logoText: { color: 'white', fontSize: 24, fontWeight: 'bold', marginTop: 10, letterSpacing: 2 },
    formContainer: { flex: 1, paddingHorizontal: 30, paddingTop: 30, marginTop: -20, backgroundColor: 'white', borderTopLeftRadius: 30, borderTopRightRadius: 30 },
    welcomeText: { fontSize: 24, fontWeight: 'bold', color: '#333', marginBottom: 25 },
    inputGroup: { flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#EEE', marginBottom: 20 },
    inputIcon: { marginRight: 10 },

    // El TextInput mantiene 'flex: 1' para ocupar el espacio central y empujar el ojo al final.
    input: { flex: 1, height: 50, fontSize: 16 },

    buttonContainer: { marginTop: 20, shadowColor: "#000", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 4.65, elevation: 8 },
    gradientButton: { paddingVertical: 15, borderRadius: 25, alignItems: 'center' },
    buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold', letterSpacing: 1 },
    orText: { textAlign: 'center', color: '#999', marginVertical: 20 },
    googleButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#EEE', paddingVertical: 12, borderRadius: 25, marginBottom: 20 },
    googleIcon: { width: 22, height: 22 },
    googleButtonText: { marginLeft: 10, fontSize: 16, color: '#444', fontWeight: '500' },
    footer: { flexDirection: 'row', justifyContent: 'center', marginTop: 10, marginBottom: 30 },
    footerText: { color: '#666', fontSize: 15 },
    linkText: { color: '#4c669f', fontSize: 15, fontWeight: 'bold' },

    // --- NUEVO ESTILO: Botón Visibilidad ---
    visibilityToggle: {
        padding: 10, // Aumenta el área de clic
        marginRight: -10, // Compensa el padding para alineación visual
    },
});