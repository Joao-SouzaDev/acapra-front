import { Theme } from '@/types';
import { Platform, StyleSheet } from 'react-native';

/**
 * Estilos compartilhados para evitar duplicação de código
 * Baseado no tema ACAPRA
 */
export const createSharedStyles = (theme: Theme) => {
  return StyleSheet.create({
    // Container principal das telas
    safeArea: {
      flex: 1,
      backgroundColor: theme.colors.primary,
    },
    
    container: {
      flex: 1,
      backgroundColor: 'transparent',
    },

    // Headers de seções
    header: {
      alignItems: 'center',
      paddingVertical: theme.spacing.xl,
      paddingHorizontal: theme.spacing.lg,
      backgroundColor: 'transparent',
    },

    // Títulos principais
    title: {
      fontSize: theme.fonts.xxxlarge,
      fontWeight: theme.fontWeights.bold,
      color: theme.colors.primary,
      marginBottom: theme.spacing.sm,
      textAlign: 'center',
    },

    // Subtítulos
    subtitle: {
      fontSize: theme.fonts.large,
      color: theme.colors.textSecondary,
      textAlign: 'center',
      lineHeight: 24,
    },

    // Container de conteúdo com scroll
    scrollContent: {
      paddingHorizontal: theme.spacing.lg,
      paddingVertical: theme.spacing.md,
    },

    // Cards base
    card: {
      backgroundColor: theme.colors.white,
      borderRadius: theme.borderRadius.lg,
      padding: theme.spacing.md,
      marginBottom: theme.spacing.lg,
      ...theme.shadows.medium,
    },

    // Containers de botões
    buttonContainer: {
      backgroundColor: 'transparent',
      marginBottom: theme.spacing.xl,
    },

    // Botões primários
    primaryButton: {
      backgroundColor: theme.colors.primary,
    },

    // Botões secundários  
    secondaryButton: {
      backgroundColor: theme.colors.secondary,
    },

    // Inputs de formulário
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

    // Labels de input
    inputLabel: {
      fontSize: theme.fonts.medium,
      fontWeight: theme.fontWeights.semibold,
      color: theme.colors.textPrimary,
      marginBottom: theme.spacing.sm,
    },

    // Container de input
    inputContainer: {
      marginBottom: theme.spacing.md,
      backgroundColor: 'transparent',
    },

    // Seções centralizadas
    centeredSection: {
      alignItems: 'center',
      paddingVertical: theme.spacing.xl,
      backgroundColor: 'transparent',
    },

    // Texto de informação
    infoText: {
      fontSize: theme.fonts.medium,
      color: theme.colors.textSecondary,
      textAlign: 'center',
      lineHeight: 22,
    },

    // Links
    linkText: {
      color: theme.colors.primary,
      fontWeight: theme.fontWeights.semibold,
    },

    // Estado vazio
    emptyState: {
      alignItems: 'center',
      paddingVertical: theme.spacing.xxl,
      backgroundColor: 'transparent',
    },

    emptyEmoji: {
      fontSize: 60,
      marginBottom: theme.spacing.lg,
    },

    emptyText: {
      fontSize: theme.fonts.large,
      color: theme.colors.textSecondary,
      textAlign: 'center',
      lineHeight: 24,
    },

    // Row layouts
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: 'transparent',
    },

    rowSpaceBetween: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: 'transparent',
    },

    // Text styles
    boldText: {
      fontWeight: theme.fontWeights.bold,
    },

    mediumText: {
      fontWeight: theme.fontWeights.medium,
    },

    primaryColorText: {
      color: theme.colors.primary,
    },

    secondaryColorText: {
      color: theme.colors.textSecondary,
    },

    // Shadows padrão
    shadowSmall: {
      ...theme.shadows.small,
    },

    shadowMedium: {
      ...theme.shadows.medium,
    },

    shadowLarge: {
      ...theme.shadows.large,
    },
  });
};

/**
 * Estilos específicos para modais
 */
export const createModalStyles = (theme: Theme) => {
  return StyleSheet.create({
    overlay: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      justifyContent: 'center',
      alignItems: 'center',
      padding: theme.spacing.lg,
    },

    modalContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      maxWidth: 400,
      width: '100%',
    },

    modalContent: {
      width: '100%',
      borderRadius: theme.borderRadius.xl,
      overflow: 'hidden',
      ...theme.shadows.large,
    },

    modalHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: theme.spacing.md,
      backgroundColor: 'transparent',
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
  });
};

/**
 * Estilos para navegação e filtros
 */
export const createNavigationStyles = (theme: Theme) => {
  return StyleSheet.create({
    filterContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginHorizontal: theme.spacing.lg,
      marginBottom: theme.spacing.xl,
      backgroundColor: theme.colors.white,
      borderRadius: theme.borderRadius.xl,
      padding: 4,
      ...theme.shadows.medium,
    },

    filterTab: {
      flex: 1,
      paddingVertical: theme.spacing.md,
      alignItems: 'center',
      borderRadius: theme.borderRadius.lg,
      backgroundColor: 'transparent',
    },

    activeFilterTab: {
      backgroundColor: theme.colors.primary,
    },

    filterText: {
      fontSize: theme.fonts.medium,
      color: theme.colors.textSecondary,
      fontWeight: theme.fontWeights.medium,
    },

    activeFilterText: {
      color: theme.colors.white,
      fontWeight: theme.fontWeights.bold,
    },
  });
};

/**
 * Estilos responsivos baseados na plataforma
 */
export const createResponsiveStyles = (theme: Theme) => {
  return StyleSheet.create({
    // Container responsivo
    responsiveContainer: {
      ...Platform.select({
        web: {
          maxWidth: 1200,
          alignSelf: 'center',
          width: '100%',
        },
        default: {
          flex: 1,
        },
      }),
    },

    // Padding responsivo
    responsivePadding: {
      paddingHorizontal: Platform.select({
        web: theme.spacing.xxl,
        default: theme.spacing.lg,
      }),
    },

    // Grid responsivo
    gridContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      paddingHorizontal: theme.spacing.lg,
      backgroundColor: 'transparent',
    },

    // Item do grid (2 colunas no mobile, 3-4 no tablet/desktop)
    gridItem: {
      width: Platform.select({
        web: '30%',
        default: '48%',
      }),
      marginBottom: theme.spacing.lg,
    },
  });
};