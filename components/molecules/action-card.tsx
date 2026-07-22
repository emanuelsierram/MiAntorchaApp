import { CircularIcon } from '@/components/atoms/circular-icon'; // Ajusta la ruta según tu estructura
import { IconSymbol } from '@/components/atoms/icon-symbol';
import { useThemeColor } from '@/src/hooks/use-theme-color';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// 1. Definimos la interfaz (Contratos claros, similar a Java/Angular)
interface ActionCardProps {
    title: string;
    subtitle: string;
    leftIconName: React.ComponentProps<typeof IconSymbol>['name'];
    onPress: () => void;
}

export function ActionCard({
    title,
    subtitle,
    leftIconName,
    onPress
}: ActionCardProps) {
    
    const tintColor = useThemeColor({}, 'tint');

    return (
        // TouchableOpacity actúa como el contenedor principal y permite la interacción
        <TouchableOpacity
            style={styles.cardContainer}
            onPress={onPress}
            activeOpacity={0.8}
        >
            {/* Átomo Izquierdo: Tu CircularIcon */}
            <CircularIcon
                name={leftIconName}
                size={30}
                iconColor="#FFFFFF"
                backgroundColor={tintColor} // Azul característico de la imagen
                style={styles.leftIconOverrides}
            />

            {/* Centro: Contenedor de Textos */}
            <View style={styles.textContainer}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.subtitle}>{subtitle}</Text>
            </View>

            {/* Átomo Derecho: Botón de flecha */}
            <View style={styles.rightActionIcon}>
                <IconSymbol name="chevron.right" size={30} color={tintColor} />
            </View>
        </TouchableOpacity>
    );
}

// 2. Estilos (React Native usa Flexbox por defecto)
const styles = StyleSheet.create({
    cardContainer: {
        flexDirection: 'row',        // Alinea los elementos en fila (horizontal)
        alignItems: 'center',        // Centra los elementos verticalmente
        backgroundColor: '#ffffff',  // Fondo azul muy claro
        borderRadius: 16,            // Bordes redondeados de la tarjeta
        padding: 16,                 // Espaciado interno
        marginVertical: 8,           // Separación entre tarjetas
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 15,
        elevation: 4,
        borderWidth: 1,
        borderColor: '#F1F5F9',
    },
    leftIconOverrides: {
        // Tu CircularIcon original tiene width/height 40 y borderRadius 8.
        // Con estas propiedades sobrescribimos esos valores para hacerlo un círculo perfecto más grande.
        width: 48,
        height: 48,
        borderRadius: 24,
    },
    textContainer: {
        flex: 1,                     // Toma todo el espacio disponible entre los dos iconos
        paddingHorizontal: 12,
    },
    title: {
        fontSize: 16,
        fontWeight: '700',           // Negrita
        color: '#1A1A24',            // Texto oscuro (no completamente negro para suavizar lectura)
        marginBottom: 4,
    },
    subtitle: {
        fontSize: 14,
        color: '#6E6E78',            // Gris para el subtítulo
        lineHeight: 20,              // Mejora la legibilidad en textos de varias líneas
    },
    rightActionIcon: {
        width: 32,
        height: 32,
        backgroundColor: '#FFFFFF',  // Fondo blanco del icono derecho
        borderRadius: 8,             // Cuadrado con bordes redondeados
        alignItems: 'center',
        justifyContent: 'center',
    },
});