import React, { useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Button from '@/components/Button';
import Header from '@/components/Header';
import { GradientView, Text, View } from '@/components/Themed';
import { getTheme } from '@/constants/Theme';

interface Pet {
    id: string;
    name: string;
    breed: string;
    age: string;
    size: string;
    type: 'dog' | 'cat';
    image: string;
}

const AdotarScreen = () => {
    const theme = getTheme();
    const styles = createStyles(theme);
    const [selectedFilter, setSelectedFilter] = useState<'all' | 'dog' | 'cat'>('all');
    
    // Mock data - será substituído pela API
    const mockPets: Pet[] = [
        {
            id: '1',
            name: 'Rex 🐕',
            breed: 'Labrador Mix',
            age: '2 anos',
            size: 'Grande',
            type: 'dog',
            image: 'https://via.placeholder.com/200x200'
        },
        {
            id: '2',
            name: 'Mimi 🐱',
            breed: 'Siamês',
            age: '1 ano',
            size: 'Pequeno',
            type: 'cat',
            image: 'https://via.placeholder.com/200x200'
        },
        {
            id: '3',
            name: 'Bela 🐕',
            breed: 'SRD (Vira-lata)',
            age: '3 anos',
            size: 'Médio',
            type: 'dog',
            image: 'https://via.placeholder.com/200x200'
        },
        {
            id: '4',
            name: 'Félix 🐱',
            breed: 'Persa',
            age: '6 meses',
            size: 'Pequeno',
            type: 'cat',
            image: 'https://via.placeholder.com/200x200'
        },
    ];

    const filteredPets = mockPets.filter(pet => 
        selectedFilter === 'all' || pet.type === selectedFilter
    );

    const handleAdoption = (pet: Pet) => {
        console.log('Iniciando processo de adoção para:', pet.name);
        // Aqui será implementada a lógica de adoção
    };

    const FilterTab = ({ filter, label, emoji }: { filter: 'all' | 'dog' | 'cat'; label: string; emoji: string }) => (
        <TouchableOpacity
            style={[
                styles.filterTab,
                selectedFilter === filter && styles.activeFilterTab
            ]}
            onPress={() => setSelectedFilter(filter)}
        >
            <Text style={styles.filterEmoji}>{emoji}</Text>
            <Text style={[
                styles.filterText,
                selectedFilter === filter && styles.activeFilterText
            ]}>
                {label}
            </Text>
        </TouchableOpacity>
    );

    const PetCard = ({ pet }: { pet: Pet }) => (
        <View style={styles.petCard}>
            <View style={styles.petImagePlaceholder}>
                <Text style={styles.petTypeEmoji}>
                    {pet.type === 'dog' ? '🐕' : '🐱'}
                </Text>
                <Text style={styles.imagePlaceholder}>Foto em breve</Text>
            </View>
            <View style={styles.petInfo}>
                <Text style={styles.petName}>{pet.name}</Text>
                <Text style={styles.petBreed}>{pet.breed}</Text>
                <Text style={styles.petDetails}>🎂 {pet.age}</Text>
                <Text style={styles.petDetails}>📏 Porte {pet.size}</Text>
                
                <Button
                    title="💝 Adotar"
                    onPress={() => handleAdoption(pet)}
                    variant="primary"
                    style={styles.adoptButton}
                />
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.safeArea} edges={['top']}>
            <Header title="🐾 CAPRA" />
            
            <GradientView style={styles.container}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.header}>
                        <Text style={styles.title}>🏠 Pets para Adoção</Text>
                        <Text style={styles.subtitle}>
                            Encontre seu novo melhor amigo! Todos estão esperando por uma família amorosa.
                        </Text>
                    </View>
                    
                    {/* Filtros */}
                    <View style={styles.filterContainer}>
                        <FilterTab filter="all" label="Todos" emoji="🐾" />
                        <FilterTab filter="dog" label="Cães" emoji="🐕" />
                        <FilterTab filter="cat" label="Gatos" emoji="🐱" />
                    </View>

                    {/* Lista de Pets */}
                    <View style={styles.petsGrid}>
                        {filteredPets.map((pet) => (
                            <PetCard key={pet.id} pet={pet} />
                        ))}
                    </View>
                    
                    {filteredPets.length === 0 && (
                        <View style={styles.emptyState}>
                            <Text style={styles.emptyEmoji}>😿</Text>
                            <Text style={styles.emptyText}>
                                Ops! Não encontramos pets nesta categoria.
                                {'\n'}Que tal olhar em "Todos"?
                            </Text>
                        </View>
                    )}
                </ScrollView>
            </GradientView>
        </SafeAreaView>
    );
};

const createStyles = (theme: any) => StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: theme.colors.primary,
    },
    container: {
        flex: 1,
        backgroundColor: 'transparent',
    },
    header: {
        alignItems: 'center',
        paddingVertical: theme.spacing.xl,
        paddingHorizontal: theme.spacing.lg,
        backgroundColor: 'transparent',
    },
    title: {
        fontSize: theme.fonts.xxxlarge,
        fontWeight: theme.fontWeights.bold,
        color: theme.colors.primary,
        marginBottom: theme.spacing.sm,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: theme.fonts.large,
        color: theme.colors.textSecondary,
        textAlign: 'center',
        lineHeight: 24,
    },
    filterContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginHorizontal: theme.spacing.lg,
        marginBottom: theme.spacing.xl,
        backgroundColor: theme.colors.white,
        borderRadius: theme.borderRadius.xl,
        padding: 4,
        ...theme.shadows.medium,
    },
    filterTab: {
        flex: 1,
        paddingVertical: theme.spacing.md,
        alignItems: 'center',
        borderRadius: theme.borderRadius.lg,
        backgroundColor: 'transparent',
    },
    activeFilterTab: {
        backgroundColor: theme.colors.primary,
    },
    filterEmoji: {
        fontSize: 18,
        marginBottom: 4,
    },
    filterText: {
        fontSize: theme.fonts.medium,
        color: theme.colors.textSecondary,
        fontWeight: theme.fontWeights.medium,
    },
    activeFilterText: {
        color: theme.colors.white,
        fontWeight: theme.fontWeights.bold,
    },
    petsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        paddingHorizontal: theme.spacing.lg,
        backgroundColor: 'transparent',
    },
    petCard: {
        backgroundColor: theme.colors.white,
        borderRadius: theme.borderRadius.lg,
        padding: theme.spacing.md,
        marginBottom: theme.spacing.lg,
        width: '48%',
        ...theme.shadows.medium,
    },
    petImagePlaceholder: {
        height: 120,
        backgroundColor: theme.colors.backgroundGradientStart,
        borderRadius: theme.borderRadius.md,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: theme.spacing.md,
        borderWidth: 2,
        borderColor: theme.colors.primary,
        borderStyle: 'dashed',
    },
    petTypeEmoji: {
        fontSize: 40,
        marginBottom: 8,
    },
    imagePlaceholder: {
        color: theme.colors.textSecondary,
        fontSize: theme.fonts.small,
        textAlign: 'center',
    },
    petInfo: {
        flex: 1,
        backgroundColor: 'transparent',
    },
    petName: {
        fontSize: theme.fonts.large,
        fontWeight: theme.fontWeights.bold,
        color: theme.colors.primary,
        marginBottom: 4,
    },
    petBreed: {
        fontSize: theme.fonts.medium,
        color: theme.colors.textSecondary,
        fontWeight: theme.fontWeights.medium,
        marginBottom: 6,
    },
    petDetails: {
        fontSize: theme.fonts.small,
        color: theme.colors.textSecondary,
        marginBottom: 3,
    },
    adoptButton: {
        backgroundColor: theme.colors.primary,
        marginTop: theme.spacing.md,
    },
    emptyState: {
        alignItems: 'center',
        paddingVertical: theme.spacing.xxl,
        backgroundColor: 'transparent',
    },
    emptyEmoji: {
        fontSize: 60,
        marginBottom: theme.spacing.lg,
    },
    emptyText: {
        fontSize: theme.fonts.large,
        color: theme.colors.textSecondary,
        textAlign: 'center',
        lineHeight: 24,
    },
});

export default AdotarScreen;