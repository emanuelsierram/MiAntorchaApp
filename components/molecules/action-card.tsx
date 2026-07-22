import { CircularIcon } from '@/components/atoms/circular-icon'; // Ajusta la ruta según tu estructura
import { IconSymbol } from '@/components/atoms/icon-symbol';
import { useThemeColor } from '@/src/hooks/use-theme-color';
import { useColorScheme } from '@/src/hooks/use-color-scheme';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// 1. Definimos la interfaz (Contratos claros, similar a Java/Angular)
interface ActionCardProps {
    title: string;
    subtitle?: string;
    leftIconName: React.ComponentProps<typeof IconSymbol>['name'];
    onPress: () => void;
    showArrow?: boolean;
    noIconBackground?: boolean;
    iconColor?: string;
    flat?: boolean;
    rightElement?: React.ReactNode;
    titleColor?: string;
    iconBgColor?: string;
}

export function ActionCard({
    title,
    subtitle,
    leftIconName,
    onPress,
    showArrow = true,
    noIconBackground = false,
    iconColor,
    flat = false,
    rightElement,
    titleColor,
    iconBgColor
}: ActionCardProps) {
    
    const tintColor = useThemeColor({}, 'tint');
    const colorScheme = useColorScheme();
    const isDark = colorScheme === 'dark';

    const cardBg = flat ? 'transparent' : (isDark ? '#1E293B' : '#ffffff');
    const cardBorder = flat ? 'transparent' : (isDark ? '#334155' : '#F1F5F9');
    const resolvedTitleColor = titleColor || (isDark ? '#F8FAFC' : '#1A1A24');
    const subtitleColor = isDark ? '#94A3B8' : '#6E6E78';
    const rightIconBg = flat ? 'transparent' : (isDark ? '#0F172A' : '#FFFFFF');

    const resolvedIconColor = iconColor || (noIconBackground ? tintColor : '#FFFFFF');
    const resolvedIconBgColor = iconBgColor || tintColor;

    return (
        // TouchableOpacity actúa como el contenedor principal y permite la interacción
        <TouchableOpacity
            style={[
                styles.cardContainer, 
                { backgroundColor: cardBg, borderColor: cardBorder },
                flat && styles.flatCardContainer
            ]}
            onPress={onPress}
            activeOpacity={0.8}
        >
            {/* Átomo Izquierdo: Tu CircularIcon o Icono sin fondo */}
            {noIconBackground ? (
                <View style={[
                    styles.leftIconOverrides, 
                    flat && styles.flatLeftIcon, 
                    { justifyContent: 'center', alignItems: 'center' }
                ]}>
                    <IconSymbol
                        name={leftIconName}
                        size={flat ? 24 : 28}
                        color={resolvedIconColor}
                    />
                </View>
            ) : (
                <CircularIcon
                    name={leftIconName}
                    size={30}
                    iconColor={resolvedIconColor}
                    backgroundColor={resolvedIconBgColor} // Azul característico o personalizado
                    style={styles.leftIconOverrides}
                />
            )}

            {/* Centro: Contenedor de Textos */}
            <View style={styles.textContainer}>
                <Text style={[styles.title, { color: resolvedTitleColor }, flat && styles.flatTitle]}>{title}</Text>
                {!!subtitle && <Text style={[styles.subtitle, { color: subtitleColor }, flat && styles.flatSubtitle]}>{subtitle}</Text>}
            </View>

            {/* Elemento adicional a la derecha */}
            {rightElement !== undefined && (
                <View style={styles.rightElementContainer}>
                    {rightElement}
                </View>
            )}

            {/* Átomo Derecho: Botón de flecha */}
            {showArrow && (
                <View style={[styles.rightActionIcon, { backgroundColor: rightIconBg }, flat && styles.flatRightActionIcon]}>
                    <IconSymbol name="chevron.right" size={flat ? 22 : 30} color={tintColor} />
                </View>
            )}
        </TouchableOpacity>
    );
}

// 2. Estilos (React Native usa Flexbox por defecto)
const styles = StyleSheet.create({
    cardContainer: {
        flexDirection: 'row',        // Alinea los elementos en fila (horizontal)
        alignItems: 'center',        // Centra los elementos verticalmente
        borderRadius: 16,            // Bordes redondeados de la tarjeta
        padding: 16,                 // Espaciado interno
        marginVertical: 8,           // Separación entre tarjetas
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 15,
        elevation: 4,
        borderWidth: 1,
    },
    flatCardContainer: {
        paddingVertical: 6,
        paddingHorizontal: 0,
        marginVertical: 1,
        borderWidth: 0,
        shadowOpacity: 0,
        shadowRadius: 0,
        elevation: 0,
        borderRadius: 0,
    },
    leftIconOverrides: {
        // Tu CircularIcon original tiene width/height 40 y borderRadius 8.
        // Con estas propiedades sobrescribimos esos valores para hacerlo un círculo perfecto más grande.
        width: 48,
        height: 48,
        borderRadius: 24,
    },
    flatLeftIcon: {
        width: 36,
        height: 36,
        borderRadius: 18,
    },
    textContainer: {
        flex: 1,                     // Toma todo el espacio disponible entre los dos iconos
        paddingHorizontal: 12,
    },
    title: {
        fontSize: 16,
        fontWeight: '700',           // Negrita
        marginBottom: 4,
    },
    flatTitle: {
        fontSize: 15,
        fontWeight: '600',
        marginBottom: 2,
    },
    subtitle: {
        fontSize: 14,
        lineHeight: 20,              // Mejora la legibilidad en textos de varias líneas
    },
    flatSubtitle: {
        fontSize: 12,
        lineHeight: 16,
    },
    rightActionIcon: {
        width: 32,
        height: 32,
        borderRadius: 8,             // Cuadrado con bordes redondeados
        alignItems: 'center',
        justifyContent: 'center',
    },
    flatRightActionIcon: {
        width: 24,
        height: 24,
        borderRadius: 0,
    },
    rightElementContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 6,
    }
});