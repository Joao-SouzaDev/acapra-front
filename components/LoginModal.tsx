import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import {
    Alert,
    Dimensions,
    KeyboardAvoidingView,
    Modal,
    Platform,
    ScrollView,
    StyleSheet,
    TextInput,
    TouchableOpacity,
} from 'react-native';

import Button from '@/components/Button';
import { Text, View } from '@/components/Themed';
import { getTheme } from '@/constants/Theme';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

interface LoginModalProps {
  visible: boolean;
  onClose: () => void;
  onLogin?: (email: string, password: string) => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ 
  visible, 
  onClose, 
  onLogin 
}) => {
  const theme = getTheme();
  const styles = createStyles(theme);
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Atenção', 'Por favor, preencha todos os campos.');
      return;
    }

    if (!isValidEmail(email)) {
      Alert.alert('E-mail inválido', 'Por favor, insira um e-mail válido.');
      return;
    }

    setIsLoading(true);
    
    try {
      // Simular chamada de API
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      if (onLogin) {
        onLogin(email, password);
      } else {
        // Mock login - apenas para demonstração
        Alert.alert(
          'Login realizado! 🎉', 
          `Bem-vindo(a), ${email}!\nVocê agora pode gerenciar adoções e doações.`,
          [{ text: 'OK', onPress: handleClose }]
        );
      }
    } catch (error) {
      Alert.alert('Erro', 'Falha ao fazer login. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setEmail('');
    setPassword('');
    setIsLoading(false);
    setShowPassword(false);
    onClose();
  };

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={handleClose}
    >
      {/* Overlay com blur simulado */}
      <TouchableOpacity 
        style={styles.overlay} 
        activeOpacity={1} 
        onPress={handleClose}
      >
        <KeyboardAvoidingView 
          style={styles.modalContainer}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <TouchableOpacity activeOpacity={1} onPress={(e) => e.stopPropagation()}>
            <View style={styles.modalContent}>
              <LinearGradient
                colors={[theme.colors.backgroundGradientStart, theme.colors.backgroundGradientEnd]}
                style={styles.gradient}
              >
                <ScrollView 
                  contentContainerStyle={styles.scrollContent}
                  keyboardShouldPersistTaps="handled"
                  showsVerticalScrollIndicator={false}
                >
            {/* Header compacto */}
            <View style={styles.header}>
              <View style={styles.titleSection}>
                <Text style={styles.logo}>🐾</Text>
                <Text style={styles.title}>Login CAPRA</Text>
              </View>
              <TouchableOpacity 
                style={styles.closeButton}
                onPress={handleClose}
              >
                <Text style={styles.closeButtonText}>✕</Text>
              </TouchableOpacity>
            </View>

            {/* Formulário */}
            <View style={styles.form}>
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>E-mail</Text>
                <TextInput
                  style={styles.input}
                  placeholder="seu@email.com"
                  placeholderTextColor={theme.colors.grayDark}
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Senha</Text>
                <View style={styles.passwordContainer}>
                  <TextInput
                    style={[styles.input, styles.passwordInput]}
                    placeholder="••••••••"
                    placeholderTextColor={theme.colors.grayDark}
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!showPassword}
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                  <TouchableOpacity 
                    style={styles.eyeButton}
                    onPress={() => setShowPassword(!showPassword)}
                  >
                    <Text style={styles.eyeIcon}>
                      {showPassword ? '👁️' : '🙈'}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              <TouchableOpacity style={styles.forgotPassword}>
                <Text style={styles.forgotPasswordText}>
                  Esqueceu sua senha?
                </Text>
              </TouchableOpacity>
            </View>

            {/* Botões */}
            <View style={styles.buttonContainer}>
              <Button
                title={isLoading ? "Entrando..." : "Entrar"}
                onPress={handleLogin}
                variant="primary"
                disabled={isLoading}
                loading={isLoading}
                style={styles.loginButton}
              />
              
              <TouchableOpacity 
                style={styles.createAccount}
                onPress={() => {
                  Alert.alert(
                    'Criar Conta', 
                    'Funcionalidade em desenvolvimento!\nEm breve você poderá criar sua conta.'
                  );
                }}
              >
              </TouchableOpacity>
            </View>
                </ScrollView>
              </LinearGradient>
            </View>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </TouchableOpacity>
    </Modal>
  );
};

const createStyles = (theme: any) => StyleSheet.create({
  // Overlay que desfoca o fundo
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.lg,
  },
  // Container do modal compacto
  modalContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    maxWidth: 400,
    width: '100%',
  },
  // Conteúdo do modal
  modalContent: {
    width: '100%',
    maxHeight: screenHeight * 0.85,
    borderRadius: theme.borderRadius.xl,
    overflow: 'hidden',
    ...theme.shadows.large,
  },
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: theme.spacing.md,
    backgroundColor: 'transparent',
  },
  titleSection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  logo: {
    fontSize: 28,
    marginRight: theme.spacing.sm,
  },
  title: {
    fontSize: theme.fonts.large,
    fontWeight: theme.fontWeights.bold,
    color: theme.colors.primary,
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: theme.colors.grayLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    fontWeight: theme.fontWeights.bold,
  },
  form: {
    backgroundColor: 'transparent',
    marginBottom: theme.spacing.md,
  },
  inputContainer: {
    marginBottom: theme.spacing.md,
    backgroundColor: 'transparent',
  },
  inputLabel: {
    fontSize: theme.fonts.medium,
    fontWeight: theme.fontWeights.semibold,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.sm,
  },
  input: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.md,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.md,
    fontSize: theme.fonts.medium,
    color: theme.colors.textPrimary,
    borderWidth: 2,
    borderColor: theme.colors.border,
    ...theme.shadows.small,
  },
  passwordContainer: {
    position: 'relative',
  },
  passwordInput: {
    paddingRight: 50,
  },
  eyeButton: {
    position: 'absolute',
    right: 12,
    top: 12,
    padding: 4,
  },
  eyeIcon: {
    fontSize: 20,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginTop: theme.spacing.sm,
  },
  forgotPasswordText: {
    fontSize: theme.fonts.small,
    color: theme.colors.primary,
    fontWeight: theme.fontWeights.medium,
  },
  buttonContainer: {
    backgroundColor: 'transparent',
    marginBottom: theme.spacing.xl,
  },
  loginButton: {
    backgroundColor: theme.colors.primary,
    marginBottom: theme.spacing.lg,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: theme.spacing.lg,
    backgroundColor: 'transparent',
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: theme.colors.border,
  },
  dividerText: {
    paddingHorizontal: theme.spacing.md,
    fontSize: theme.fonts.small,
    color: theme.colors.textSecondary,
  },
  registerButton: {
    backgroundColor: theme.colors.white,
    borderWidth: 2,
    borderColor: theme.colors.primary,
  },
  footer: {
    alignItems: 'center',
    paddingBottom: theme.spacing.xl,
    backgroundColor: 'transparent',
  },
  footerText: {
    fontSize: theme.fonts.small,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    lineHeight: 18,
  },
  linkText: {
    color: theme.colors.primary,
    fontWeight: theme.fontWeights.semibold,
  },
  createAccount: {
    alignItems: 'center',
    marginTop: theme.spacing.md,
  },
  createAccountText: {
    fontSize: theme.fonts.small,
    color: theme.colors.textSecondary,
  },
  createAccountLink: {
    color: theme.colors.primary,
    fontWeight: theme.fontWeights.semibold,
  },
});

export default LoginModal;