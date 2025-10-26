/**
 * CAPRA Themed Components - Baseado no estilo ACAPRA
 * https://github.com/Joao-SouzaDev/capra-front
 * Modo claro apenas
 */

import { LinearGradient } from 'expo-linear-gradient';
import { Text as DefaultText, View as DefaultView } from 'react-native';

import Colors from '@/constants/Colors';
import { getTheme } from '@/constants/Theme';

type ThemeProps = {
  color?: string;
};

export type TextProps = ThemeProps & DefaultText['props'];
export type ViewProps = ThemeProps & DefaultView['props'];

export function useThemeColor(
  props: { color?: string },
  colorName: keyof typeof Colors
) {
  const colorFromProps = props.color;

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[colorName];
  }
}

export function Text(props: TextProps) {
  const { style, color, ...otherProps } = props;
  const textColor = useThemeColor({ color }, 'text');

  return <DefaultText style={[{ color: textColor }, style]} {...otherProps} />;
}

export function View(props: ViewProps) {
  const { style, color, ...otherProps } = props;
  const backgroundColor = useThemeColor({ color }, 'background');

  return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />;
}

// Componente de gradiente baseado no ACAPRA
export function GradientView(props: ViewProps) {
  const theme = getTheme();
  const { style, ...otherProps } = props;

  return (
    <LinearGradient
      colors={[theme.colors.backgroundGradientStart, theme.colors.backgroundGradientEnd]}
      style={style}
      {...otherProps}
    />
  );
}
