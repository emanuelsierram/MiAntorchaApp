import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useCustomTheme, ThemeSetting } from '@/src/context/theme-context';
import { Icon } from '@/components/atoms/Icon';

export function ModoApariencia() {
  const { themeSetting, colorScheme, setThemeSetting } = useCustomTheme();
  const isDark = colorScheme === 'dark';

  const cardBg = isDark ? '#1E293B' : '#FFFFFF';
  const cardBorder = isDark ? '#334155' : '#F1F5F9';
  const textColor = isDark ? '#F8FAFC' : '#1E293B';
  const subTextColor = isDark ? '#94A3B8' : '#64748B';
  const descBg = isDark ? '#0F172A' : '#F8FAFC';
  const descBorder = isDark ? '#334155' : '#E2E8F0';

  const themeOptions: { key: ThemeSetting; label: string; icon: string; desc: string }[] = [
    { 
      key: 'light', 
      label: 'Claro', 
      icon: 'weather-sunny',
      desc: 'Forza el aspecto claro en la aplicación.'
    },
    { 
      key: 'dark', 
      label: 'Oscuro', 
      icon: 'weather-night',
      desc: 'Forza el aspecto oscuro en la aplicación.'
    },
    { 
      key: 'system', 
      label: 'Sistema', 
      icon: 'brightness-auto',
      desc: 'Sigue el tema configurado en tu móvil.'
    }
  ];

  return (
    <View style={[styles.card, { backgroundColor: cardBg, borderColor: cardBorder }]}>
      {/* Cabecera del organismo */}
      <View style={styles.header}>
        <View style={[styles.headerIcon, { backgroundColor: isDark ? 'rgba(59, 130, 246, 0.15)' : 'rgba(20, 80, 184, 0.1)', justifyContent: 'center', alignItems: 'center' }]}>
          <Icon family="MaterialCommunityIcons" name="palette" size={22} color={isDark ? '#3B82F6' : '#1450B8'} />
        </View>
        <View style={styles.headerText}>
          <Text style={[styles.title, { color: textColor }]}>Modo de apariencia</Text>
          <Text style={[styles.subtitle, { color: subTextColor }]}>Elige cómo se ve la aplicación</Text>
        </View>
      </View>

      {/* Grid de opciones */}
      <View style={styles.grid}>
        {themeOptions.map((opt) => {
          const isSelected = themeSetting === opt.key;
          const activeColor = isDark ? '#3B82F6' : '#1450B8';
          const activeBtnBg = isDark ? 'rgba(59, 130, 246, 0.05)' : 'rgba(20, 80, 184, 0.02)';
          const btnBg = isSelected ? activeBtnBg : (isDark ? '#0F172A' : '#F8FAFC');
          const btnBorder = isSelected ? activeColor : (isDark ? '#334155' : '#E2E8F0');
          const btnTextColor = isSelected ? activeColor : textColor;
          const iconColor = isSelected ? activeColor : subTextColor;

          return (
            <TouchableOpacity
              key={opt.key}
              style={[
                styles.button, 
                { 
                  backgroundColor: btnBg, 
                  borderColor: btnBorder,
                  borderWidth: 1.5
                }
              ]}
              onPress={() => setThemeSetting(opt.key)}
              activeOpacity={0.8}
            >
              {/* Checkbadge absoluto */}
              {isSelected && (
                <View style={styles.checkBadge}>
                  <Icon family="Ionicons" name="checkmark-circle" size={16} color={activeColor} />
                </View>
              )}
              <Icon family="MaterialCommunityIcons" name={opt.icon} size={28} color={iconColor} />
              <Text style={[styles.btnText, { color: btnTextColor }]}>{opt.label}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Descripción inferior del tema */}
      <View style={[styles.descCard, { backgroundColor: descBg, borderColor: descBorder }]}>
        <Icon family="MaterialCommunityIcons" name={themeOptions.find(o => o.key === themeSetting)?.icon || 'palette'} size={18} color={isDark ? '#3B82F6' : '#1450B8'} style={{ marginRight: 8 }} />
        <Text style={[styles.descText, { color: subTextColor }]}>
          {themeOptions.find(o => o.key === themeSetting)?.desc}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 24,
    borderWidth: 1,
    padding: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    marginRight: 12,
  },
  headerText: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
  },
  subtitle: {
    fontSize: 13,
    marginTop: 2,
  },
  grid: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  button: {
    flex: 1,
    height: 80,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    position: 'relative',
  },
  checkBadge: {
    position: 'absolute',
    top: 6,
    right: 6,
    zIndex: 2,
  },
  btnText: {
    fontSize: 13,
    fontWeight: '600',
  },
  descCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
  },
  descText: {
    fontSize: 12,
    flex: 1,
  },
});
