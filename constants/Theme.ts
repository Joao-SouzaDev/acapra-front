import { Dimensions } from 'react-native';
import Colors from './Colors';

const { width, height } = Dimensions.get('window');

export const theme = {
  colors: Colors, // Sempre modo claro
  
  // Font sizes (baseado no ACAPRA)
  fonts: {
    small: 12,
    regular: 14,
    medium: 16,
    large: 20,
    xlarge: 24,
    xxlarge: 32,
    xxxlarge: 42,
  },
  
  // Font weights
  fontWeights: {
    regular: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
    extrabold: '800' as const,
  },
  
  // Spacing (sistema consistente)
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  
  // Border radius
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
  },
  
  // Screen dimensions
  dimensions: {
    width,
    height,
  },
  
  // Shadows (para consistência visual)
  shadows: {
    small: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    medium: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 8,
      elevation: 5,
    },
    large: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.2,
      shadowRadius: 16,
      elevation: 10,
    },
  },
};

// Função simplificada - sempre retorna o tema claro
export const getTheme = () => theme;

export default theme;