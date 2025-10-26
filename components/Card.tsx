import { getTheme } from '@/constants/Theme';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native';
import Button from './Button';

interface CardProps {
  title: string;
  description?: string;
  children?: React.ReactNode;
  onPress?: () => void;
  style?: ViewStyle;
  buttonTitle?: string;
  onButtonPress?: () => void;
}

export const Card: React.FC<CardProps> = ({ 
  title,
  description,
  children,
  onPress,
  style,
  buttonTitle,
  onButtonPress,
}) => {
  const theme = getTheme();
  
  const styles = createStyles(theme);

  const CardContent = (
    <View style={[styles.card, style]}>
      <Text style={styles.title}>{title}</Text>
      
      {description && (
        <Text style={styles.description}>{description}</Text>
      )}
      
      {children}
      
      {buttonTitle && onButtonPress && (
        <Button
          title={buttonTitle}
          onPress={onButtonPress}
          variant="primary"
          style={styles.button}
        />
      )}
    </View>
  );

  if (onPress) {
    return (
      <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
        {CardContent}
      </TouchableOpacity>
    );
  }

  return CardContent;
};

const createStyles = (theme: any) => StyleSheet.create({
  card: {
    backgroundColor: theme.colors.white,
    borderWidth: 2,
    borderColor: theme.colors.border,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.md,
    ...theme.shadows.small,
  },
  title: {
    fontSize: theme.fonts.large,
    fontWeight: theme.fontWeights.bold,
    color: theme.colors.secondary,
    marginBottom: theme.spacing.sm,
  },
  description: {
    fontSize: theme.fonts.regular,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.md,
    lineHeight: 22,
  },
  button: {
    backgroundColor: theme.colors.secondary,
    marginTop: theme.spacing.sm,
  },
});

export default Card;