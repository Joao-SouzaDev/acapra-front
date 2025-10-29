import React, { useState } from 'react';
import {
  Alert,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

import Button from '@/components/Button';
import { Text, View } from '@/components/Themed';
import { User } from '@/interfaces';
import { getTheme } from '@/constants/Theme';
import { createSharedStyles, createModalStyles } from '@/styles/shared';

// Mock data
const initialUsers: User[] = [
  { id: '1', email: 'admin@capra.com', name: 'Administrador', avatar: '👤' },
  { id: '2', email: 'joao@example.com', name: 'João Silva', avatar: '🧑' },
  { id: '3', email: 'maria@example.com', name: 'Maria Santos', avatar: '👩' },
];

export default function UsersManagement() {
  const theme = getTheme();
  const router = useRouter();
  const sharedStyles = createSharedStyles(theme);
  const modalStyles = createModalStyles(theme);
  const styles = createStyles(theme);

  const [users, setUsers] = useState<User[]>(initialUsers);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newUser, setNewUser] = useState({ name: '', email: '' });

  const handleCreateUser = () => {
    if (!newUser.name.trim() || !newUser.email.trim()) {
      Alert.alert('Atenção', 'Por favor, preencha todos os campos.');
      return;
    }

    const user: User = {
      id: Date.now().toString(),
      name: newUser.name,
      email: newUser.email,
      avatar: '👤',
    };

    setUsers([...users, user]);
    setNewUser({ name: '', email: '' });
    setShowCreateModal(false);
    Alert.alert('Sucesso!', 'Usuário criado com sucesso.');
  };

  const handleDeleteUser = (userId: string) => {
    Alert.alert(
      'Confirmar exclusão',
      'Deseja realmente excluir este usuário?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: () => {
            setUsers(users.filter((u) => u.id !== userId));
            Alert.alert('Sucesso!', 'Usuário excluído.');
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={sharedStyles.safeArea} edges={['top']}>
      <LinearGradient
        colors={[theme.colors.backgroundGradientStart, theme.colors.backgroundGradientEnd]}
        style={styles.gradient}
      >
        <ScrollView style={sharedStyles.container}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
              <Text style={styles.backButtonText}>← Voltar</Text>
            </TouchableOpacity>
            <Text style={styles.headerTitle}>👥 Gerenciar Usuários</Text>
            <Text style={styles.headerSubtitle}>
              Total: {users.length} usuário{users.length !== 1 ? 's' : ''}
            </Text>
          </View>

          {/* Create Button */}
          <View style={styles.actionContainer}>
            <Button
              title="+ Criar Novo Usuário"
              onPress={() => setShowCreateModal(true)}
              variant="primary"
            />
          </View>

          {/* Users List */}
          <View style={styles.listContainer}>
            {users.map((user) => (
              <View key={user.id} style={styles.userCard}>
                <View style={styles.userInfo}>
                  <Text style={styles.userAvatar}>{user.avatar}</Text>
                  <View style={styles.userDetails}>
                    <Text style={styles.userName}>{user.name}</Text>
                    <Text style={styles.userEmail}>{user.email}</Text>
                  </View>
                </View>
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => handleDeleteUser(user.id)}
                >
                  <Text style={styles.deleteButtonText}>🗑️</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </ScrollView>

        {/* Create User Modal */}
        <Modal
          visible={showCreateModal}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setShowCreateModal(false)}
        >
          <TouchableOpacity
            style={modalStyles.overlay}
            activeOpacity={1}
            onPress={() => setShowCreateModal(false)}
          >
            <TouchableOpacity activeOpacity={1} onPress={(e) => e.stopPropagation()}>
              <View style={styles.modalContent}>
                <LinearGradient
                  colors={[theme.colors.backgroundGradientStart, theme.colors.backgroundGradientEnd]}
                  style={styles.modalGradient}
                >
                  <View style={styles.modalHeader}>
                    <Text style={styles.modalTitle}>Criar Novo Usuário</Text>
                    <TouchableOpacity
                      style={modalStyles.closeButton}
                      onPress={() => setShowCreateModal(false)}
                    >
                      <Text style={modalStyles.closeButtonText}>✕</Text>
                    </TouchableOpacity>
                  </View>

                  <View style={styles.modalBody}>
                    <View style={sharedStyles.inputContainer}>
                      <Text style={sharedStyles.inputLabel}>Nome</Text>
                      <TextInput
                        style={sharedStyles.input}
                        placeholder="Digite o nome"
                        placeholderTextColor={theme.colors.grayDark}
                        value={newUser.name}
                        onChangeText={(text) => setNewUser({ ...newUser, name: text })}
                      />
                    </View>

                    <View style={sharedStyles.inputContainer}>
                      <Text style={sharedStyles.inputLabel}>E-mail</Text>
                      <TextInput
                        style={sharedStyles.input}
                        placeholder="usuario@email.com"
                        placeholderTextColor={theme.colors.grayDark}
                        value={newUser.email}
                        onChangeText={(text) => setNewUser({ ...newUser, email: text })}
                        keyboardType="email-address"
                        autoCapitalize="none"
                      />
                    </View>

                    <Button title="Criar Usuário" onPress={handleCreateUser} variant="primary" />
                  </View>
                </LinearGradient>
              </View>
            </TouchableOpacity>
          </TouchableOpacity>
        </Modal>
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
    paddingVertical: theme.spacing.lg,
    paddingHorizontal: theme.spacing.lg,
    backgroundColor: 'transparent',
  },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: theme.spacing.md,
  },
  backButtonText: {
    fontSize: theme.fonts.medium,
    color: theme.colors.primary,
    fontWeight: theme.fontWeights.semibold,
  },
  headerTitle: {
    fontSize: theme.fonts.xxlarge,
    fontWeight: theme.fontWeights.bold,
    color: theme.colors.primary,
    marginBottom: theme.spacing.xs,
  },
  headerSubtitle: {
    fontSize: theme.fonts.medium,
    color: theme.colors.textSecondary,
  },
  actionContainer: {
    paddingHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
    backgroundColor: 'transparent',
  },
  listContainer: {
    paddingHorizontal: theme.spacing.lg,
    paddingBottom: theme.spacing.xl,
    backgroundColor: 'transparent',
  },
  userCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
    ...theme.shadows.medium,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    backgroundColor: 'transparent',
  },
  userAvatar: {
    fontSize: 32,
    marginRight: theme.spacing.md,
  },
  userDetails: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  userName: {
    fontSize: theme.fonts.medium,
    fontWeight: theme.fontWeights.semibold,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.xs,
  },
  userEmail: {
    fontSize: theme.fonts.small,
    color: theme.colors.textSecondary,
  },
  deleteButton: {
    padding: theme.spacing.sm,
  },
  deleteButtonText: {
    fontSize: 24,
  },
  modalContent: {
    width: Platform.select({ web: 400, default: 340 }),
    maxWidth: '90%',
    borderRadius: theme.borderRadius.xl,
    overflow: 'hidden',
    ...theme.shadows.large,
  },
  modalGradient: {
    padding: theme.spacing.lg,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
    backgroundColor: 'transparent',
  },
  modalTitle: {
    fontSize: theme.fonts.large,
    fontWeight: theme.fontWeights.bold,
    color: theme.colors.primary,
  },
  modalBody: {
    backgroundColor: 'transparent',
  },
});
