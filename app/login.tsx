import { FontAwesome } from '@expo/vector-icons';
import React, { useRef, useState } from 'react';
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
import { usePinLogin } from '../src/hooks/use-pin-login';

const { height } = Dimensions.get('window');

export default function LoginScreen() {
    const [telefono, setTelefono] = useState('');
    const { pin, setPin, loading } = usePinLogin(telefono);
    // Referencia para controlar el teclado del PIN oculto
// --- SOLUCIÓN: Agregamos <TextInput> para tipar correctamente la referencia ---
    const pinInputRef = useRef<TextInput>(null);
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
                                editable={!loading}
                            />
                        </View>

                        {/* --- NUEVO: Input PIN de 4 dígitos estilo Nequi --- */}
                        <Text style={styles.pinLabel}>Ingresa tu PIN de 4 dígitos</Text>
                        
                        <TouchableOpacity 
                            activeOpacity={1} 
                            style={styles.pinContainer} 
                            onPress={() => pinInputRef.current?.focus()}
                        >
                            {[0, 1, 2, 3].map((index) => (
                                <View 
                                    key={index} 
                                    style={[
                                        styles.pinBox, 
                                        pin.length === index && styles.pinBoxActive // Resalta el cuadro actual
                                    ]}
                                >
                                    <Text style={styles.pinText}>
                                        {/* Si hay un número en esta posición, dibuja un punto o el número oculto */}
                                        {pin[index] ? '•' : ''}
                                    </Text>
                                </View>
                            ))}

                            {/* Input oculto que captura realmente los números */}
                            <TextInput
                                ref={pinInputRef}
                                style={styles.hiddenPinInput}
                                value={pin}
                                onChangeText={(text) => {
                                    // Filtramos para asegurar que solo sean números y máximo 4
                                    const numericValue = text.replace(/[^0-9]/g, '');
                                    if (numericValue.length <= 4) {
                                        setPin(numericValue);
                                    }
                                }}
                                keyboardType="number-pad"
                                maxLength={4}
                                editable={!loading}
                                autoFocus={false}
                            />
                        </TouchableOpacity>

                        {/* Texto de carga dinámico mientras procesa el autologin */}
                        {loading && (
                            <Text style={styles.loadingText}>Iniciando sesión...</Text>
                        )}
                        
                        {/* El texto "O continúa con" y lo de Google queda igual abajo... */}

                        
                      {/*  <View style={styles.footer}>
                            <Text style={styles.footerText}>¿No tienes cuenta? </Text>
                            <TouchableOpacity>
                                <Text style={styles.linkText}>Regístrate</Text>
                            </TouchableOpacity>
                        </View>*/}

                        <Text style={styles.orText}>O</Text>

                        <TouchableOpacity style={styles.googleButton}>
                            <Image
                                source={{ uri: 'https://img.icons8.com/color/48/000000/google-logo.png' }}
                                style={styles.googleIcon}
                            />
                            <Text style={styles.googleButtonText}>Continua con Google</Text>
                        </TouchableOpacity>
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

    orText: { textAlign: 'center', color: '#999', marginVertical: 20 },
    googleButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#EEE', paddingVertical: 12, borderRadius: 25, marginBottom: 20 },
    googleIcon: { width: 22, height: 22 },
    googleButtonText: { marginLeft: 10, fontSize: 16, color: '#444', fontWeight: '500' },
    footer: { flexDirection: 'row', justifyContent: 'center', marginTop: 10, marginBottom: 30 },
    footerText: { color: '#666', fontSize: 15 },
    linkText: { color: '#4c669f', fontSize: 15, fontWeight: 'bold' },

    // --- NUEVOS ESTILOS PARA EL PIN ---
    pinLabel: {
        fontSize: 14,
        color: '#666',
        textAlign: 'center',
        marginBottom: 10,
        marginTop: 10,
        fontWeight: '600'
    },
    pinContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        marginBottom: 25,
        position: 'relative', // Para contener el input oculto
    },
    pinBox: {
        width: 55,
        height: 60,
        borderWidth: 2,
        borderColor: '#E0E0E0',
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F9F9F9',
    },
    pinBoxActive: {
        borderColor: '#4A69BD', // El color de tu marca cuando está activo
        backgroundColor: '#FFF',
    },
    pinText: {
        fontSize: 28,
        color: '#333',
    },
    hiddenPinInput: {
        position: 'absolute',
        opacity: 0,
        width: '100%',
        height: '100%',
        zIndex: 1,
    },
    loadingText: {
        textAlign: 'center',
        color: '#4A69BD',
        fontWeight: 'bold',
        marginBottom: 15,
    },
});