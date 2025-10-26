import { getTheme } from '@/constants/Theme';
import { useRouter } from 'expo-router';
import React from 'react';
import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface HeaderProps {
  onLoginPress?: () => void;
  title?: string;
}

export const Header: React.FC<HeaderProps> = ({ 
  onLoginPress,
  title = '🐾 CAPRA'
}) => {
  const theme = getTheme();
  const router = useRouter();

  const styles = createStyles(theme);

  // No mobile, não mostrar o header (já temos navegação nas tabs)
  if (Platform.OS !== 'web') {
    return null;
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.push('/')}>
        <Text style={styles.logo}>{title}</Text>
      </TouchableOpacity>
      
      <View style={styles.menu}>
        <TouchableOpacity onPress={() => router.push('/(tabs)')}>
          <Text style={styles.menuItem}>Home</Text>
        </TouchableOpacity>
        
        <TouchableOpacity onPress={() => router.push('/(tabs)/two')}>
          <Text style={styles.menuItem}>Doações</Text>
        </TouchableOpacity>
        
        <TouchableOpacity onPress={() => router.push('/modal')}>
          <Text style={styles.menuItem}>Mais Info</Text>
        </TouchableOpacity>
        
        {onLoginPress && (
          <TouchableOpacity 
            style={styles.loginButton}
            onPress={onLoginPress}
          >
            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const createStyles = (theme: any) => StyleSheet.create({
  container: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    ...Platform.select({
      web: {
        paddingHorizontal: theme.spacing.xl + 16,
      },
    }),
  },
  logo: {
    color: theme.colors.white,
    fontSize: theme.fonts.large,
    fontWeight: theme.fontWeights.extrabold,
  },
  menu: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.lg,
  },
  menuItem: {
    color: theme.colors.white,
    fontSize: theme.fonts.regular,
    fontWeight: theme.fontWeights.medium,
  },
  loginButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: theme.colors.white,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
  },
  loginButtonText: {
    color: theme.colors.white,
    fontWeight: theme.fontWeights.semibold,
  },
});

export default Header;