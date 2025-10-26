import { getTheme } from '@/constants/Theme';
import React from 'react';
import { ActivityIndicator, StyleSheet, Text, TextStyle, TouchableOpacity, ViewStyle } from 'react-native';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const Button: React.FC<ButtonProps> = ({ 
  title, 
  onPress, 
  variant = 'primary', 
  disabled = false, 
  loading = false,
  style,
  textStyle 
}) => {
  const theme = getTheme();
  
  const buttonStyles = [
    styles.button,
    variant === 'primary' && {
      backgroundColor: theme.colors.primary,
    },
    variant === 'secondary' && {
      backgroundColor: theme.colors.white,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    disabled && styles.disabledButton,
    style,
  ];

  const textStyles = [
    styles.text,
    {
      fontSize: theme.fonts.medium,
      fontWeight: theme.fontWeights.semibold,
    },
    variant === 'primary' && {
      color: theme.colors.white,
    },
    variant === 'secondary' && {
      color: theme.colors.textPrimary,
    },
    disabled && { color: theme.colors.gray },
    textStyle,
  ];

  return (
    <TouchableOpacity
      style={buttonStyles}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator 
          color={variant === 'primary' ? theme.colors.white : theme.colors.primary} 
        />
      ) : (
        <Text style={textStyles}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 100,
  },
  disabledButton: {
    opacity: 0.5,
  },
  text: {
    textAlign: 'center',
  },
});

export default Button;