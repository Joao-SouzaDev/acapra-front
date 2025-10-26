import { LinearGradient } from 'expo-linear-gradient';
import { Link, Stack } from 'expo-router';
import { Platform, StyleSheet } from 'react-native';

import Button from '@/components/Button';
import { Text, View } from '@/components/Themed';
import { getTheme } from '@/constants/Theme';

export default function NotFoundScreen() {
  const theme = getTheme();
  const styles = createStyles(theme);

  return (
    <>
      <Stack.Screen options={{ title: '🐕 Página Perdida!' }} />
      <LinearGradient
        colors={[theme.colors.backgroundGradientStart, theme.colors.backgroundGradientEnd]}
        style={styles.container}
      >
        <View style={styles.content}>
          {/* Emoji gigante de cachorro perdido */}
          <Text style={styles.lostPetEmoji}>🐕‍🦺</Text>
          
          <Text style={styles.title}>Ops! Esta página fugiu!</Text>
          
          <Text style={styles.subtitle}>
            Parece que esta página saiu para passear e se perdeu... 
            {'\n'}Como nossos peludinhos às vezes fazem! 🐾
          </Text>

          <View style={styles.messageBox}>
            <Text style={styles.message}>
              📍 <Text style={styles.highlight}>PÁGINA PERDIDA</Text> {'\n\n'}
              🏷️ <Text style={styles.highlight}>Nome:</Text> "404 - Not Found" {'\n'}
              🎂 <Text style={styles.highlight}>Idade:</Text> Alguns segundos {'\n'}
              📏 <Text style={styles.highlight}>Porte:</Text> Pequeno erro {'\n'}
              🎨 <Text style={styles.highlight}>Cor:</Text> Invisível {'\n\n'}
              💔 <Text style={styles.highlight}>Comportamento:</Text> Muito tímida, se esconde quando alguém tenta acessá-la
              {'\n\n'}
              ❤️ Se você encontrou esta página, por favor nos ajude a levá-la de volta para casa!
            </Text>
          </View>

          <View style={styles.actionButtons}>
            <Link href="/" asChild>
              <Button 
                title="🏠 Voltar para Casa" 
                onPress={() => {}} 
                variant="primary"
                style={styles.homeButton}
              />
            </Link>
            
            <Link href="/(tabs)/doar" asChild>
              <Button 
                title="💝 Adotar um Pet de Verdade" 
                onPress={() => {}} 
                variant="secondary"
                style={styles.adoptButton}
              />
            </Link>
          </View>

          <Text style={styles.footer}>
            🐾 CAPRA - Cuidando também das páginas perdidas desde 2024
          </Text>
        </View>
      </LinearGradient>
    </>
  );
}

const createStyles = (theme: any) => StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing.xl,
    backgroundColor: 'transparent',
  },
  lostPetEmoji: {
    fontSize: 80,
    marginBottom: theme.spacing.lg,
    ...Platform.select({
      web: {
        fontSize: 100,
      },
    }),
  },
  title: {
    fontSize: theme.fonts.xxxlarge,
    fontWeight: theme.fontWeights.extrabold,
    color: theme.colors.primary,
    textAlign: 'center',
    marginBottom: theme.spacing.md,
    ...Platform.select({
      web: {
        fontSize: theme.fonts.xxxlarge + 8,
      },
    }),
  },
  subtitle: {
    fontSize: theme.fonts.large,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    marginBottom: theme.spacing.xl,
    lineHeight: 24,
  },
  messageBox: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.xl,
    borderWidth: 2,
    borderColor: theme.colors.primary,
    maxWidth: 400,
    ...theme.shadows.medium,
  },
  message: {
    fontSize: theme.fonts.medium,
    color: theme.colors.textPrimary,
    lineHeight: 22,
    textAlign: 'left',
  },
  highlight: {
    fontWeight: theme.fontWeights.bold,
    color: theme.colors.primary,
  },
  actionButtons: {
    width: '100%',
    maxWidth: 300,
    gap: theme.spacing.md,
    backgroundColor: 'transparent',
  },
  homeButton: {
    backgroundColor: theme.colors.primary,
  },
  adoptButton: {
    backgroundColor: theme.colors.secondary,
  },
  footer: {
    fontSize: theme.fonts.small,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    marginTop: theme.spacing.xl,
    fontStyle: 'italic',
  },
});
