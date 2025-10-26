import React, { useState } from 'react';
import { ImageBackground, Platform, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Button from '@/components/Button';
import Header from '@/components/Header';
import LoginModal from '@/components/LoginModal';
import { Text, View } from '@/components/Themed';
import { getTheme } from '@/constants/Theme';
import { createSharedStyles } from '@/styles/shared';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const theme = getTheme();
  const router = useRouter();
  const [loginVisible, setLoginVisible] = useState(false);

  const sharedStyles = createSharedStyles(theme);
  const customStyles = createStyles(theme);
  const styles = { ...sharedStyles, ...customStyles };

  const handleLogin = () => {
    setLoginVisible(true);
  };

  const handleLoginSubmit = (email: string, password: string) => {
    console.log('Login na Home:', { email, password });
    setLoginVisible(false);
    // Implementar lógica de login real
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
        <Header 
          onLoginPress={handleLogin}
          title="🐾 CAPRA"
        />
        
        <ImageBackground
          source={{ 
            uri: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=800&h=600&fit=crop' 
          }}
          style={styles.mainSection}
          resizeMode="cover"
        >
          <View style={styles.overlay} />
          
          <View style={styles.content}>
            <Text style={styles.subtitle}>Você tem amor para dar?</Text>
            <Text style={styles.title}>Ajude um{'\n'}animal</Text>
            
            <View style={styles.buttonContainer}>
              <Button
                title="Faça uma doação →"
                onPress={() => router.push('/(tabs)/doar')}
                variant="primary"
                style={styles.primaryButton}
              />
              <Button
                title="Adote →"
                onPress={() => router.push('/adotar')}
                variant="secondary"
                style={styles.secondaryButton}
              />
            </View>
            
            <View style={styles.infoCard}>
              <Text style={styles.infoText}>Quem nós somos?</Text>
              <TouchableOpacity 
                style={styles.infoButton}
                onPress={() => router.push('/info')}
              >
                <Text style={styles.infoButtonText}>Saiba mais →</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      </ScrollView>

      <LoginModal
        visible={loginVisible}
        onClose={() => setLoginVisible(false)}
        onLogin={handleLoginSubmit}
      />
    </SafeAreaView>
  );
}

const createStyles = (theme: any) => StyleSheet.create({
  // Estilos específicos da tela inicial
  scrollContent: {
    flexGrow: 1,
  },
  mainSection: {
    flex: 1,
    minHeight: Platform.select({ web: 600, default: 500 }),
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    maxWidth: Platform.select({ web: '50%', default: '90%' }),
    paddingHorizontal: theme.spacing.xl,
    paddingVertical: theme.spacing.xxl,
    zIndex: 2,
  },
  subtitle: {
    fontSize: theme.fonts.large,
    color: theme.colors.white,
    marginBottom: theme.spacing.sm,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  title: {
    fontSize: Platform.select({ web: 56, default: 42 }),
    fontWeight: theme.fontWeights.extrabold,
    color: theme.colors.white,
    lineHeight: Platform.select({ web: 67, default: 50 }),
    marginBottom: theme.spacing.xl,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  buttonContainer: {
    flexDirection: Platform.select({ web: 'row', default: 'column' }),
    gap: theme.spacing.md,
    marginBottom: theme.spacing.xl,
  },
  primaryButton: {
    minWidth: Platform.OS === 'web' ? 180 : undefined,
    width: Platform.OS === 'web' ? undefined : '100%',
  },
  secondaryButton: {
    minWidth: Platform.OS === 'web' ? 140 : undefined,
    width: Platform.OS === 'web' ? undefined : '100%',
  },
  infoCard: {
    flexDirection: Platform.select({ web: 'row', default: 'column' }),
    alignItems: 'center',
    backgroundColor: theme.colors.primary,
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.xl,
    borderRadius: theme.borderRadius.lg,
    gap: theme.spacing.md,
    alignSelf: 'flex-start',
  },
  infoText: {
    color: theme.colors.white,
    fontSize: theme.fonts.medium,
  },
  infoButton: {
    backgroundColor: theme.colors.white,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
  },
  infoButtonText: {
    color: theme.colors.primary,
    fontWeight: theme.fontWeights.semibold,
  },
});
