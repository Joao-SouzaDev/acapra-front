import React, { useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Button from '@/components/Button';
import Card from '@/components/Card';
import Header from '@/components/Header';
import LoginModal from '@/components/LoginModal';
import { Text, View } from '@/components/Themed';
import { getTheme } from '@/constants/Theme';

export default function DonationsScreen() {
  const theme = getTheme();
  const [loginVisible, setLoginVisible] = useState(false);

  const styles = createStyles(theme);

  const donations = [
    {
      id: 1,
      title: 'Doação Única R$50,00',
      description: 'Ajude com ração e cuidados veterinários básicos para nossos peludinhos.',
      value: '50,00',
    },
    {
      id: 2,
      title: 'Doação Única R$100,00',
      description: 'Contribua com medicamentos e tratamentos especiais.',
      value: '100,00',
    },
    {
      id: 3,
      title: 'Doação Mensal R$30,00',
      description: 'Seja um padrinho/madrinha e ajude mensalmente.',
      value: '30,00',
    },
  ];

  const handleDonation = (donation: any) => {
    console.log('Doação selecionada:', donation);
    // Lógica de doação aqui
  };

  const handleLogin = () => {
    setLoginVisible(true);
  };

  const handleLoginSubmit = (email: string, password: string) => {
    console.log('Login nas Doações:', { email, password });
    setLoginVisible(false);
    // Implementar lógica de login real
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <Header 
        onLoginPress={handleLogin}
        title="🐾 CAPRA"
      />
      
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Doe para Nossos Peludinhos</Text>
          <Text style={styles.subtitle}>Ajude com doações para garantir conforto e cuidado.</Text>
        </View>
        
        <View style={styles.cardsContainer}>
          {donations.map((donation) => (
            <Card
              key={donation.id}
              title={donation.title}
              description={donation.description}
              buttonTitle="DOAR"
              onButtonPress={() => handleDonation(donation)}
            />
          ))}
        </View>
        
        <View style={styles.pixSection}>
          <Text style={styles.pixTitle}>Ou doe via PIX:</Text>
          <Button
            title="PIX: capra@example.com"
            onPress={() => console.log('PIX copiado')}
            variant="secondary"
            style={styles.pixButton}
          />
        </View>
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
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.primary,
  },
  container: {
    flex: 1,
    backgroundColor: theme.colors.backgroundGradientStart,
  },
  header: {
    alignItems: 'center',
    paddingVertical: theme.spacing.xl,
    paddingHorizontal: theme.spacing.lg,
  },
  title: {
    fontSize: theme.fonts.xxxlarge,
    fontWeight: theme.fontWeights.bold,
    color: theme.colors.secondary,
    marginBottom: theme.spacing.sm,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: theme.fonts.large,
    color: theme.colors.textSecondary,
    textAlign: 'center',
  },
  cardsContainer: {
    paddingHorizontal: theme.spacing.lg,
    paddingBottom: theme.spacing.lg,
  },
  pixSection: {
    alignItems: 'center',
    paddingVertical: theme.spacing.xl,
  },
  pixTitle: {
    fontSize: theme.fonts.large,
    fontWeight: theme.fontWeights.medium,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.md,
  },
  pixButton: {
    backgroundColor: theme.colors.secondary,
    paddingHorizontal: theme.spacing.xl,
  },
});
