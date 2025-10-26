import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Platform, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Button from '@/components/Button';
import { Text, View } from '@/components/Themed';
import { getTheme } from '@/constants/Theme';
import { useRouter } from 'expo-router';

export default function AboutScreen() {
  const theme = getTheme();
  const router = useRouter();

  const styles = createStyles(theme);

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <Text style={styles.title}>Sobre a CAPRA</Text>
        
        <Text style={styles.text}>
          A CAPRA é uma organização dedicada ao resgate e adoção de animais abandonados.
          {'\n\n'}
          Trabalhamos incansavelmente para dar uma segunda chance a cães e gatos que precisam de um lar amoroso.
          {'\n\n'}
          Nossa missão é conectar animais resgatados com famílias que possam oferecer amor, cuidado e um lar permanente.
          {'\n\n'}
          🐕 Mais de 200 animais resgatados
          {'\n'}
          🏠 Mais de 150 adoções realizadas
          {'\n'}
          ❤️ Amor e dedicação em cada resgate
        </Text>

        <View style={styles.buttonContainer}>
          <Button
            title="Adotar um Pet"
            onPress={() => {
              console.log('Navigating to adoption');
              router.back();
            }}
            variant="primary"
            style={styles.adoptButton}
          />
          
          <Button
            title="Fazer Doação"
            onPress={() => {
              router.back();
              router.push('/(tabs)/two');
            }}
            variant="secondary"
            style={styles.donateButton}
          />
        </View>
      </ScrollView>

      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </SafeAreaView>
  );
}

const createStyles = (theme: any) => StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.primary,
  },
  container: {
    flex: 1,
    backgroundColor: theme.colors.backgroundGradientStart,
  },
  content: {
    padding: theme.spacing.xl,
    alignItems: 'center',
  },
  title: {
    fontSize: theme.fonts.xxxlarge,
    fontWeight: theme.fontWeights.bold,
    color: theme.colors.primary,
    marginBottom: theme.spacing.lg,
    textAlign: 'center',
  },
  text: {
    fontSize: theme.fonts.large,
    color: theme.colors.textSecondary,
    lineHeight: 28,
    textAlign: 'center',
    marginBottom: theme.spacing.xl,
  },
  buttonContainer: {
    width: '100%',
    gap: theme.spacing.md,
    marginTop: theme.spacing.lg,
  },
  adoptButton: {
    backgroundColor: theme.colors.primary,
  },
  donateButton: {
    backgroundColor: theme.colors.secondary,
  },
});
