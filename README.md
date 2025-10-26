# CAPRA - React Native App

Aplicativo mobile/web para adoção de animais CAPRA, desenvolvido com Expo Router e inspirado no design do repositório [ACAPRA](https://github.com/Joao-SouzaDev/capra-front).

## 🚀 Tecnologias

- **React Native** - Framework para desenvolvimento mobile
- **Expo Router** - Sistema de roteamento moderno
- **TypeScript** - Tipagem estática
- **Expo Linear Gradient** - Gradientes nativos
- **React Native Safe Area Context** - Suporte para área segura

## 🎨 Design - Estilo ACAPRA

O projeto usa o mesmo esquema de cores do design ACAPRA original:
- **Cor Primária**: #8A5EFF (Roxo)
- **Cor Secundária**: #6c44ff
- **Background**: Gradiente de #f5f5ff para #e6e6fa
- **Componentes**: Baseados no sistema de design ACAPRA

## 📱 Estrutura do Projeto

```
capra-front/
├── app/                     # Rotas do Expo Router
│   ├── (tabs)/             # Tab Navigation
│   │   ├── index.tsx       # Home Screen (Hero Section)
│   │   └── doar.tsx        # Donations Screen
│   ├── info.tsx            # About/Info Screen
│   └── _layout.tsx         # Root Layout
├── components/             # Componentes reutilizáveis
│   ├── Button.tsx          # Botão estilo ACAPRA
│   ├── Card.tsx            # Card component
│   ├── Header.tsx          # Header de navegação
│   ├── Themed.tsx          # Componentes com tema
│   └── ...
├── constants/              # Constantes e temas
│   ├── Colors.ts          # Paleta ACAPRA
│   └── Theme.ts           # Sistema de tema completo
└── assets/                # Imagens e recursos
```

## 🧩 Funcionalidades Implementadas

- ✅ Tela inicial com hero section inspirada no ACAPRA
- ✅ Sistema de cores roxo (#8A5EFF) idêntico ao ACAPRA
- ✅ Navegação com tabs (Home, Doações)
- ✅ Header responsivo com navegação
- ✅ Tela de doações com cartões
- ✅ Modal informativo sobre a organização
- ✅ Componentes modulares e reutilizáveis
- ✅ Tema claro unificado (modo escuro removido)
- ✅ Design responsivo
- ✅ Header escondido no mobile (apenas tabs)

## 🎯 Componentes Principais

### Button Component
Botão reutilizável com variantes primary e secondary:
```tsx
<Button
  title="Faça uma doação"
  onPress={handlePress}
  variant="primary"
/>
```

### Header Component
Cabeçalho com navegação inspirado no ACAPRA:
```tsx
<Header 
  onLoginPress={() => setLoginVisible(true)}
  title="🐾 CAPRA"
/>
```

### Card Component
Cards para doações e informações:
```tsx
<Card
  title="Doação R$50,00"
  description="Ajude com ração e cuidados"
  buttonTitle="DOAR"
  onButtonPress={handleDonation}
/>
```

## 🛠️ Comandos

```bash
# Instalar dependências
npm install

# Iniciar desenvolvimento
npm start

# Web
npm run web

# iOS
npm run ios

# Android
npm run android
```

## 🎨 Sistema de Tema

O tema está centralizado e simplificado (apenas modo claro):

```typescript
// constants/Colors.ts - Paleta ACRAPRA unificada
export default {
  primary: '#8A5EFF',      // Roxo principal
  secondary: '#6c44ff',     // Roxo secundário
  background: '#fff',       // Fundo branco
  text: '#000',            // Texto preto
  // ... outras cores
}

// constants/Theme.ts - Sistema completo
export const getTheme = () => theme; // Sempre modo claro
```

## 📱 Navegação

### Estrutura de Rotas:
```
🏠 Home (/(tabs)/) → Hero section com animais para adoção
├── 💝 Doações (/(tabs)/doar) → Opções de doação e PIX
└── ℹ️ Sobre (/info) → Informações da CAPRA
```

### Comportamento por Plataforma:
- **Web/Desktop**: Header completo com menu de navegação
- **Mobile**: Apenas tabs inferiores (header escondido)

## ✨ Melhorias Recentes

- ✅ **Rotas semânticas**: `two.tsx` → `doar.tsx`, `modal.tsx` → `info.tsx`
- ✅ **Modo escuro removido**: Interface simplificada apenas modo claro
- ✅ **Header responsivo**: Escondido no mobile, visível no desktop
- ✅ **Navegação otimizada**: Tabs para mobile, header para desktop

## 🔮 Próximos Passos

- [ ] Integração com API backend
- [ ] Autenticação de usuários
- [ ] Listagem de animais para adoção
- [ ] Sistema de favoritos
- [ ] Notificações push
- [ ] Compartilhamento social
- [ ] Implementação do modo escuro (opcional)

## 📄 Créditos

Design e sistema de cores inspirados no repositório [ACAPRA](https://github.com/Joao-SouzaDev/capra-front) de João Souza.

## 📄 Licença

Este projeto está licenciado sob a licença MIT.