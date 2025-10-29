import React from 'react';
import { Platform, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

import { Text, View } from '@/components/Themed';
import { getTheme } from '@/constants/Theme';
import { createSharedStyles } from '@/styles/shared';

export default function AdminDashboard() {
  const theme = getTheme();
  const router = useRouter();
  const sharedStyles = createSharedStyles(theme);
  const styles = createStyles(theme);

  const adminCards = [
    {
      title: 'Usuários',
      icon: '👥',
      description: 'Gerenciar usuários do sistema',
      route: '/admin/users',
      color: theme.colors.primary,
    },
    {
      title: 'Pets',
      icon: '🐾',
      description: 'Cadastrar e gerenciar pets',
      route: '/admin/pets',
      color: theme.colors.secondary,
    },
    {
      title: 'Solicitações',
      icon: '📋',
      description: 'Gerenciar solicitações de adoção',
      route: '/admin/requests',
      color: '#6c44ff',
    },
    {
      title: 'Histórico',
      icon: '📜',
      description: 'Visualizar histórico de adoções',
      route: '/admin/history',
      color: '#9D7FFF',
    },
  ];

  return (
    <SafeAreaView style={sharedStyles.safeArea} edges={['top']}>
      <LinearGradient
        colors={[theme.colors.backgroundGradientStart, theme.colors.backgroundGradientEnd]}
        style={styles.gradient}
      >
        <ScrollView style={sharedStyles.container}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerEmoji}>🔐</Text>
            <Text style={styles.headerTitle}>Painel Administrativo</Text>
            <Text style={styles.headerSubtitle}>CAPRA</Text>
          </View>

          {/* Admin Cards Grid */}
          <View style={styles.cardsContainer}>
            {adminCards.map((card, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.card, { borderLeftColor: card.color }]}
                onPress={() => router.push(card.route as any)}
                activeOpacity={0.8}
              >
                <View style={styles.cardContent}>
                  <Text style={styles.cardIcon}>{card.icon}</Text>
                  <View style={styles.cardTextContainer}>
                    <Text style={styles.cardTitle}>{card.title}</Text>
                    <Text style={styles.cardDescription}>{card.description}</Text>
                  </View>
                  <Text style={styles.cardArrow}>→</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {/* Back Button */}
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.push('/(tabs)')}
          >
            <Text style={styles.backButtonText}>← Voltar para Home</Text>
          </TouchableOpacity>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
}

const createStyles = (theme: any) => StyleSheet.create({
  gradient: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    paddingVertical: theme.spacing.xl,
    paddingHorizontal: theme.spacing.lg,
    backgroundColor: 'transparent',
  },
  headerEmoji: {
    fontSize: 48,
    marginBottom: theme.spacing.sm,
  },
  headerTitle: {
    fontSize: theme.fonts.xxlarge,
    fontWeight: theme.fontWeights.bold,
    color: theme.colors.primary,
    marginBottom: theme.spacing.xs,
  },
  headerSubtitle: {
    fontSize: theme.fonts.large,
    color: theme.colors.textSecondary,
  },
  cardsContainer: {
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.md,
    backgroundColor: 'transparent',
  },
  card: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.lg,
    marginBottom: theme.spacing.lg,
    borderLeftWidth: 4,
    ...theme.shadows.medium,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing.lg,
    backgroundColor: 'transparent',
  },
  cardIcon: {
    fontSize: 40,
    marginRight: theme.spacing.md,
  },
  cardTextContainer: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  cardTitle: {
    fontSize: theme.fonts.large,
    fontWeight: theme.fontWeights.bold,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.xs,
  },
  cardDescription: {
    fontSize: theme.fonts.regular,
    color: theme.colors.textSecondary,
  },
  cardArrow: {
    fontSize: 24,
    color: theme.colors.primary,
    fontWeight: theme.fontWeights.bold,
  },
  backButton: {
    alignItems: 'center',
    paddingVertical: theme.spacing.xl,
    paddingHorizontal: theme.spacing.lg,
    marginTop: theme.spacing.lg,
  },
  backButtonText: {
    fontSize: theme.fonts.medium,
    color: theme.colors.primary,
    fontWeight: theme.fontWeights.semibold,
  },
});
