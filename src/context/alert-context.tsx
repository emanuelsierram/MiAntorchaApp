import React, { createContext, useContext, useState } from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { IconSymbol } from '@/components/atoms/icon-symbol';

interface AlertOptions {
  title: string;
  text: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void | Promise<void>;
  onCancel?: () => void;
}

interface AlertContextProps {
  showAlert: (options: AlertOptions) => void;
}

const AlertContext = createContext<AlertContextProps | undefined>(undefined);

export function useAlert() {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error('useAlert debe utilizarse dentro de un AlertProvider');
  }
  return context;
}

export function AlertProvider({ children }: { children: React.ReactNode }) {
  const [visible, setVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [confirmText, setConfirmText] = useState('Aceptar');
  const [cancelText, setCancelText] = useState('Cancelar');
  const [onConfirmCallback, setOnConfirmCallback] = useState<(() => void) | null>(null);
  const [onCancelCallback, setOnCancelCallback] = useState<(() => void) | null>(null);

  const showAlert = (options: AlertOptions) => {
    setTitle(options.title);
    setText(options.text);
    if (options.confirmText) setConfirmText(options.confirmText);
    if (options.cancelText) setCancelText(options.cancelText);
    
    setOnConfirmCallback(() => () => {
      setVisible(false);
      options.onConfirm();
    });

    setOnCancelCallback(() => () => {
      setVisible(false);
      if (options.onCancel) {
        options.onCancel();
      }
    });

    setVisible(true);
  };

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}
      
      <Modal
        visible={visible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setVisible(false)}
      >
        <View style={styles.overlay}>
          <View style={styles.alertCard}>
            {/* Icono de Advertencia SweetAlert Style */}
            <View style={styles.warningCircle}>
              <Text style={styles.warningText}>!</Text>
            </View>

            <Text style={styles.titleText}>{title}</Text>
            <Text style={styles.messageText}>{text}</Text>

            {/* Fila de Botones */}
            <View style={styles.buttonContainer}>
              <TouchableOpacity 
                style={[styles.button, styles.cancelButton]} 
                onPress={onCancelCallback || undefined}
                activeOpacity={0.7}
              >
                <Text style={styles.cancelButtonText}>{cancelText}</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={[styles.button, styles.confirmButton]} 
                onPress={onConfirmCallback || undefined}
                activeOpacity={0.7}
              >
                <Text style={styles.confirmButtonText}>{confirmText}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </AlertContext.Provider>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  alertCard: {
    width: '100%',
    maxWidth: 340,
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 28,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
  },
  warningCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 3,
    borderColor: '#F59E0B', // Amarillo/Naranja advertencia
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  warningText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#F59E0B',
    lineHeight: 44,
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1E293B',
    textAlign: 'center',
    marginBottom: 12,
  },
  messageText: {
    fontSize: 14,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 24,
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
    gap: 12,
  },
  button: {
    flex: 1,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButton: {
    backgroundColor: '#F1F5F9',
  },
  cancelButtonText: {
    color: '#475569',
    fontWeight: '600',
    fontSize: 14,
  },
  confirmButton: {
    backgroundColor: '#1450B8',
  },
  confirmButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 14,
  }
});
