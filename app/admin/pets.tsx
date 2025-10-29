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
import { Pet } from '@/interfaces';
import { getTheme } from '@/constants/Theme';
import { createSharedStyles, createModalStyles } from '@/styles/shared';

// Mock data
const initialPets: Pet[] = [
  {
    id: '1',
    name: 'Rex',
    breed: 'Golden Retriever',
    age: '3 anos',
    size: 'Grande',
    type: 'dog',
    image: '🐕',
  },
  {
    id: '2',
    name: 'Mimi',
    breed: 'Siamês',
    age: '2 anos',
    size: 'Pequeno',
    type: 'cat',
    image: '🐱',
  },
  {
    id: '3',
    name: 'Thor',
    breed: 'Labrador',
    age: '5 anos',
    size: 'Grande',
    type: 'dog',
    image: '🐶',
  },
];

export default function PetsManagement() {
  const theme = getTheme();
  const router = useRouter();
  const sharedStyles = createSharedStyles(theme);
  const modalStyles = createModalStyles(theme);
  const styles = createStyles(theme);

  const [pets, setPets] = useState<Pet[]>(initialPets);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newPet, setNewPet] = useState({
    name: '',
    breed: '',
    age: '',
    size: 'Médio',
    type: 'dog' as 'dog' | 'cat',
  });

  const handleCreatePet = () => {
    if (!newPet.name.trim() || !newPet.breed.trim() || !newPet.age.trim()) {
      Alert.alert('Atenção', 'Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    const pet: Pet = {
      id: Date.now().toString(),
      name: newPet.name,
      breed: newPet.breed,
      age: newPet.age,
      size: newPet.size,
      type: newPet.type,
      image: newPet.type === 'dog' ? '🐕' : '🐱',
    };

    setPets([...pets, pet]);
    setNewPet({ name: '', breed: '', age: '', size: 'Médio', type: 'dog' });
    setShowCreateModal(false);
    Alert.alert('Sucesso!', 'Pet cadastrado com sucesso.');
  };

  const handleDeletePet = (petId: string) => {
    Alert.alert(
      'Confirmar exclusão',
      'Deseja realmente excluir este pet?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: () => {
            setPets(pets.filter((p) => p.id !== petId));
            Alert.alert('Sucesso!', 'Pet excluído.');
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
            <Text style={styles.headerTitle}>🐾 Gerenciar Pets</Text>
            <Text style={styles.headerSubtitle}>
              Total: {pets.length} pet{pets.length !== 1 ? 's' : ''}
            </Text>
          </View>

          {/* Create Button */}
          <View style={styles.actionContainer}>
            <Button
              title="+ Cadastrar Novo Pet"
              onPress={() => setShowCreateModal(true)}
              variant="primary"
            />
          </View>

          {/* Pets List */}
          <View style={styles.listContainer}>
            {pets.map((pet) => (
              <View key={pet.id} style={styles.petCard}>
                <View style={styles.petInfo}>
                  <Text style={styles.petImage}>{pet.image}</Text>
                  <View style={styles.petDetails}>
                    <Text style={styles.petName}>{pet.name}</Text>
                    <Text style={styles.petBreed}>{pet.breed}</Text>
                    <Text style={styles.petMeta}>
                      {pet.age} • {pet.size}
                    </Text>
                  </View>
                </View>
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => handleDeletePet(pet.id)}
                >
                  <Text style={styles.deleteButtonText}>🗑️</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </ScrollView>

        {/* Create Pet Modal */}
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
                  <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.modalHeader}>
                      <Text style={styles.modalTitle}>Cadastrar Novo Pet</Text>
                      <TouchableOpacity
                        style={modalStyles.closeButton}
                        onPress={() => setShowCreateModal(false)}
                      >
                        <Text style={modalStyles.closeButtonText}>✕</Text>
                      </TouchableOpacity>
                    </View>

                    <View style={styles.modalBody}>
                      <View style={sharedStyles.inputContainer}>
                        <Text style={sharedStyles.inputLabel}>Nome *</Text>
                        <TextInput
                          style={sharedStyles.input}
                          placeholder="Digite o nome do pet"
                          placeholderTextColor={theme.colors.grayDark}
                          value={newPet.name}
                          onChangeText={(text) => setNewPet({ ...newPet, name: text })}
                        />
                      </View>

                      <View style={sharedStyles.inputContainer}>
                        <Text style={sharedStyles.inputLabel}>Raça *</Text>
                        <TextInput
                          style={sharedStyles.input}
                          placeholder="Digite a raça"
                          placeholderTextColor={theme.colors.grayDark}
                          value={newPet.breed}
                          onChangeText={(text) => setNewPet({ ...newPet, breed: text })}
                        />
                      </View>

                      <View style={sharedStyles.inputContainer}>
                        <Text style={sharedStyles.inputLabel}>Idade *</Text>
                        <TextInput
                          style={sharedStyles.input}
                          placeholder="Ex: 3 anos, 6 meses"
                          placeholderTextColor={theme.colors.grayDark}
                          value={newPet.age}
                          onChangeText={(text) => setNewPet({ ...newPet, age: text })}
                        />
                      </View>

                      <View style={sharedStyles.inputContainer}>
                        <Text style={sharedStyles.inputLabel}>Tamanho</Text>
                        <View style={styles.sizeButtons}>
                          {['Pequeno', 'Médio', 'Grande'].map((size) => (
                            <TouchableOpacity
                              key={size}
                              style={[
                                styles.sizeButton,
                                newPet.size === size && styles.sizeButtonActive,
                              ]}
                              onPress={() => setNewPet({ ...newPet, size })}
                            >
                              <Text
                                style={[
                                  styles.sizeButtonText,
                                  newPet.size === size && styles.sizeButtonTextActive,
                                ]}
                              >
                                {size}
                              </Text>
                            </TouchableOpacity>
                          ))}
                        </View>
                      </View>

                      <View style={sharedStyles.inputContainer}>
                        <Text style={sharedStyles.inputLabel}>Tipo</Text>
                        <View style={styles.typeButtons}>
                          <TouchableOpacity
                            style={[
                              styles.typeButton,
                              newPet.type === 'dog' && styles.typeButtonActive,
                            ]}
                            onPress={() => setNewPet({ ...newPet, type: 'dog' })}
                          >
                            <Text style={styles.typeEmoji}>🐕</Text>
                            <Text
                              style={[
                                styles.typeButtonText,
                                newPet.type === 'dog' && styles.typeButtonTextActive,
                              ]}
                            >
                              Cachorro
                            </Text>
                          </TouchableOpacity>

                          <TouchableOpacity
                            style={[
                              styles.typeButton,
                              newPet.type === 'cat' && styles.typeButtonActive,
                            ]}
                            onPress={() => setNewPet({ ...newPet, type: 'cat' })}
                          >
                            <Text style={styles.typeEmoji}>🐱</Text>
                            <Text
                              style={[
                                styles.typeButtonText,
                                newPet.type === 'cat' && styles.typeButtonTextActive,
                              ]}
                            >
                              Gato
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </View>

                      <Button title="Cadastrar Pet" onPress={handleCreatePet} variant="primary" />
                    </View>
                  </ScrollView>
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
  petCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
    ...theme.shadows.medium,
  },
  petInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    backgroundColor: 'transparent',
  },
  petImage: {
    fontSize: 48,
    marginRight: theme.spacing.md,
  },
  petDetails: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  petName: {
    fontSize: theme.fonts.large,
    fontWeight: theme.fontWeights.bold,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.xs,
  },
  petBreed: {
    fontSize: theme.fonts.medium,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.xs,
  },
  petMeta: {
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
    maxHeight: '85%',
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
  sizeButtons: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
    backgroundColor: 'transparent',
  },
  sizeButton: {
    flex: 1,
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.sm,
    borderRadius: theme.borderRadius.md,
    borderWidth: 2,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.white,
    alignItems: 'center',
  },
  sizeButtonActive: {
    borderColor: theme.colors.primary,
    backgroundColor: theme.colors.primary,
  },
  sizeButtonText: {
    fontSize: theme.fonts.small,
    color: theme.colors.textSecondary,
    fontWeight: theme.fontWeights.medium,
  },
  sizeButtonTextActive: {
    color: theme.colors.white,
    fontWeight: theme.fontWeights.bold,
  },
  typeButtons: {
    flexDirection: 'row',
    gap: theme.spacing.md,
    backgroundColor: 'transparent',
  },
  typeButton: {
    flex: 1,
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.sm,
    borderRadius: theme.borderRadius.md,
    borderWidth: 2,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.white,
    alignItems: 'center',
  },
  typeButtonActive: {
    borderColor: theme.colors.primary,
    backgroundColor: theme.colors.primary,
  },
  typeEmoji: {
    fontSize: 32,
    marginBottom: theme.spacing.xs,
  },
  typeButtonText: {
    fontSize: theme.fonts.small,
    color: theme.colors.textSecondary,
    fontWeight: theme.fontWeights.medium,
  },
  typeButtonTextActive: {
    color: theme.colors.white,
    fontWeight: theme.fontWeights.bold,
  },
});
