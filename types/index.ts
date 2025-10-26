// Props para componentes
export interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
  loading?: boolean;
  style?: any;
  textStyle?: any;
}

export interface CardProps {
  title: string;
  description?: string;
  children?: React.ReactNode;
  onPress?: () => void;
  style?: any;
  buttonTitle?: string;
  onButtonPress?: () => void;
}

export interface HeaderProps {
  onLoginPress?: () => void;
  title?: string;
}

export interface LoginModalProps {
  visible: boolean;
  onClose: () => void;
  onLogin?: (email: string, password: string) => void;
}

// Tipos de tema
export interface ThemeColors {
  primary: string;
  primaryDark: string;
  primaryLight: string;
  secondary: string;
  secondaryDark: string;
  secondaryLight: string;
  background: string;
  backgroundGradientStart: string;
  backgroundGradientEnd: string;
  text: string;
  textPrimary: string;
  textSecondary: string;
  textLight: string;
  white: string;
  black: string;
  gray: string;
  grayLight: string;
  grayDark: string;
  border: string;
  tint: string;
  tabIconDefault: string;
  tabIconSelected: string;
  success: string;
  error: string;
  warning: string;
  info: string;
}

export interface Theme {
  colors: ThemeColors;
  fonts: {
    small: number;
    regular: number;
    medium: number;
    large: number;
    xlarge: number;
    xxlarge: number;
    xxxlarge: number;
  };
  fontWeights: {
    regular: '400';
    medium: '500';
    semibold: '600';
    bold: '700';
    extrabold: '800';
  };
  spacing: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
    xxl: number;
  };
  borderRadius: {
    sm: number;
    md: number;
    lg: number;
    xl: number;
  };
  dimensions: {
    width: number;
    height: number;
  };
  shadows: {
    small: object;
    medium: object;
    large: object;
  };
}