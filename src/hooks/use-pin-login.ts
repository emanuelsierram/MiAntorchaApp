import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { AuthService } from '../services/auth.services';

export const usePinLogin = (telefono: string) => {
    const router = useRouter();
    const [pin, setPin] = useState('');
    const [loading, setLoading] = useState(false);

    // Efecto para escuchar cuando el PIN llega a 4 dígitos e iniciar sesión automáticamente
    useEffect(() => {
        if (pin.length === 4) {
            handleLogin();
        }
    }, [pin]);

    const handleLogin = async () => {
        if (!telefono) {
            Alert.alert('Atención', 'Por favor ingresa tu teléfono primero.');
            setPin(''); // Limpiamos el PIN si falta el teléfono
            return;
        }

        setLoading(true);

        try {
            const token = await AuthService.login({
                usuario: telefono,
                contrasena: pin // Enviamos el PIN al backend donde antes iba la contraseña
            });

            console.log('Token recibido:', token);
            router.replace('/(tabs)');

        } catch (error) {
            let errorMessage = 'Ocurrió un error al conectar con el servidor.';
            if (error instanceof Error) {
                errorMessage = error.message;
            }
            Alert.alert('Error al iniciar sesión', errorMessage);
            setPin(''); // Limpiamos los cuadritos para que intente de nuevo
        } finally {
            setLoading(false);
        }
    };

    return { pin, setPin, loading };
};