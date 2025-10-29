import React, { useState } from 'react';
import {
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

import { Text, View } from '@/components/Themed';
import { AdoptionRequest } from '@/interfaces';
import { getTheme } from '@/constants/Theme';
import { createSharedStyles, createModalStyles } from '@/styles/shared';

// Mock history data
const adoptionHistory: AdoptionRequest[] = [
  {
    id: '101',
    petId: '10',
    petName: 'Bella',
    userId: '5',
    userName: 'Ana Paula',
    userEmail: 'ana@example.com',
    status: 'completed',
    requestDate: '2025-10-10',
    notes: 'Adoção realizada com sucesso. Pet adaptado ao novo lar.',
  },
  {
    id: '102',
    petId: '11',
    petName: 'Max',
    userId: '6',
    userName: 'Pedro Santos',
    userEmail: 'pedro@example.com',
    status: 'completed',
    requestDate: '2025-09-25',
    notes: 'Família com experiência em cachorros de grande porte.',
  },
  {
    id: '103',
    petId: '12',
    petName: 'Luna',
    userId: '7',
    userName: 'Carla Oliveira',
    userEmail: 'carla@example.com',
    status: 'completed',
    requestDate: '2025-09-15',
    notes: 'Adoção concluída. Pet está se adaptando bem.',
  },
  {
    id: '104',
    petId: '13',
    petName: 'Zeus',
    userId: '8',
    userName: 'Roberto Lima',
    userEmail: 'roberto@example.com',
    status: 'rejected',
    requestDate: '2025-09-10',
    notes: 'Solicitação rejeitada - não possuía condições adequadas.',
  },
  {
    id: '105',
    petId: '14',
    petName: 'Mel',
    userId: '9',
    userName: 'Julia Costa',
    userEmail: 'julia@example.com',
    status: 'completed',
    requestDate: '2025-08-30',
    notes: 'Família amorosa. Pet está muito feliz no novo lar.',
  },
];

export default function AdoptionHistory() {
  const theme = getTheme();
  const router = useRouter();
  const sharedStyles = createSharedStyles(theme);
  const modalStyles = createModalStyles(theme);
  const styles = createStyles(theme);

  const [selectedHistory, setSelectedHistory] = useState<AdoptionRequest | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return theme.colors.success;
      case 'rejected':
        return theme.colors.error;
      default:
        return theme.colors.gray;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Concluído';
      case 'rejected':
        return 'Rejeitado';
      default:
        return status;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return '✓';
      case 'rejected':
        return '✗';
      default:
        return '•';
    }
  };

  const openHistoryDetail = (history: AdoptionRequest) => {
    setSelectedHistory(history);
    setShowDetailModal(true);
  };

  // Group by month/year
  const groupedHistory = adoptionHistory.reduce((acc, item) => {
    const date = new Date(item.requestDate);
    const monthYear = date.toLocaleDateString('pt-BR', { year: 'numeric', month: 'long' });
    if (!acc[monthYear]) {
      acc[monthYear] = [];
    }
    acc[monthYear].push(item);
    return acc;
  }, {} as Record<string, AdoptionRequest[]>);

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
            <Text style={styles.headerTitle}>📜 Histórico de Adoções</Text>
            <Text style={styles.headerSubtitle}>
              Total: {adoptionHistory.length} registro{adoptionHistory.length !== 1 ? 's' : ''}
            </Text>
          </View>

          {/* Statistics Cards */}
          <View style={styles.statsContainer}>
            <View style={[styles.statCard, { borderLeftColor: theme.colors.success }]}>
              <Text style={styles.statNumber}>
                {adoptionHistory.filter((h) => h.status === 'completed').length}
              </Text>
              <Text style={styles.statLabel}>Concluídas</Text>
            </View>
            <View style={[styles.statCard, { borderLeftColor: theme.colors.error }]}>
              <Text style={styles.statNumber}>
                {adoptionHistory.filter((h) => h.status === 'rejected').length}
              </Text>
              <Text style={styles.statLabel}>Rejeitadas</Text>
            </View>
          </View>

          {/* History Timeline */}
          <View style={styles.timelineContainer}>
            {Object.entries(groupedHistory).map(([monthYear, items]) => (
              <View key={monthYear} style={styles.monthSection}>
                <Text style={styles.monthTitle}>{monthYear}</Text>
                {items.map((item) => (
                  <TouchableOpacity
                    key={item.id}
                    style={styles.historyCard}
                    onPress={() => openHistoryDetail(item)}
                    activeOpacity={0.7}
                  >
                    <View style={styles.timelineIndicator}>
                      <View
                        style={[
                          styles.timelineDot,
                          { backgroundColor: getStatusColor(item.status) },
                        ]}
                      >
                        <Text style={styles.timelineDotIcon}>{getStatusIcon(item.status)}</Text>
                      </View>
                      <View style={styles.timelineLine} />
                    </View>

                    <View style={styles.historyContent}>
                      <View style={styles.historyHeader}>
                        <Text style={styles.petName}>🐾 {item.petName}</Text>
                        <View
                          style={[
                            styles.statusBadge,
                            { backgroundColor: getStatusColor(item.status) },
                          ]}
                        >
                          <Text style={styles.statusText}>{getStatusLabel(item.status)}</Text>
                        </View>
                      </View>

                      <Text style={styles.userName}>👤 {item.userName}</Text>
                      <Text style={styles.historyDate}>📅 {item.requestDate}</Text>

                      {item.notes && (
                        <Text style={styles.historyNotes} numberOfLines={2}>
                          {item.notes}
                        </Text>
                      )}
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            ))}
          </View>
        </ScrollView>

        {/* Detail Modal */}
        {selectedHistory && (
          <Modal
            visible={showDetailModal}
            transparent={true}
            animationType="fade"
            onRequestClose={() => setShowDetailModal(false)}
          >
            <TouchableOpacity
              style={modalStyles.overlay}
              activeOpacity={1}
              onPress={() => setShowDetailModal(false)}
            >
              <TouchableOpacity activeOpacity={1} onPress={(e) => e.stopPropagation()}>
                <View style={styles.modalContent}>
                  <LinearGradient
                    colors={[theme.colors.backgroundGradientStart, theme.colors.backgroundGradientEnd]}
                    style={styles.modalGradient}
                  >
                    <ScrollView showsVerticalScrollIndicator={false}>
                      <View style={styles.modalHeader}>
                        <Text style={styles.modalTitle}>Detalhes do Histórico</Text>
                        <TouchableOpacity
                          style={modalStyles.closeButton}
                          onPress={() => setShowDetailModal(false)}
                        >
                          <Text style={modalStyles.closeButtonText}>✕</Text>
                        </TouchableOpacity>
                      </View>

                      <View style={styles.modalBody}>
                        <View style={styles.detailSection}>
                          <Text style={styles.detailLabel}>Pet</Text>
                          <Text style={styles.detailValue}>🐾 {selectedHistory.petName}</Text>
                        </View>

                        <View style={styles.detailSection}>
                          <Text style={styles.detailLabel}>Adotante</Text>
                          <Text style={styles.detailValue}>👤 {selectedHistory.userName}</Text>
                          <Text style={styles.detailSubvalue}>{selectedHistory.userEmail}</Text>
                        </View>

                        <View style={styles.detailSection}>
                          <Text style={styles.detailLabel}>Data</Text>
                          <Text style={styles.detailValue}>📅 {selectedHistory.requestDate}</Text>
                        </View>

                        <View style={styles.detailSection}>
                          <Text style={styles.detailLabel}>Status Final</Text>
                          <View
                            style={[
                              styles.statusBadgeLarge,
                              { backgroundColor: getStatusColor(selectedHistory.status) },
                            ]}
                          >
                            <Text style={styles.statusTextLarge}>
                              {getStatusLabel(selectedHistory.status)}
                            </Text>
                          </View>
                        </View>

                        {selectedHistory.notes && (
                          <View style={styles.detailSection}>
                            <Text style={styles.detailLabel}>Observações</Text>
                            <Text style={styles.detailValue}>{selectedHistory.notes}</Text>
                          </View>
                        )}
                      </View>
                    </ScrollView>
                  </LinearGradient>
                </View>
              </TouchableOpacity>
            </TouchableOpacity>
          </Modal>
        )}
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
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: theme.spacing.lg,
    gap: theme.spacing.md,
    marginBottom: theme.spacing.xl,
    backgroundColor: 'transparent',
  },
  statCard: {
    flex: 1,
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    borderLeftWidth: 4,
    alignItems: 'center',
    ...theme.shadows.medium,
  },
  statNumber: {
    fontSize: theme.fonts.xxxlarge,
    fontWeight: theme.fontWeights.bold,
    color: theme.colors.primary,
    marginBottom: theme.spacing.xs,
  },
  statLabel: {
    fontSize: theme.fonts.small,
    color: theme.colors.textSecondary,
    fontWeight: theme.fontWeights.medium,
  },
  timelineContainer: {
    paddingHorizontal: theme.spacing.lg,
    paddingBottom: theme.spacing.xl,
    backgroundColor: 'transparent',
  },
  monthSection: {
    marginBottom: theme.spacing.xl,
    backgroundColor: 'transparent',
  },
  monthTitle: {
    fontSize: theme.fonts.large,
    fontWeight: theme.fontWeights.bold,
    color: theme.colors.primary,
    marginBottom: theme.spacing.md,
    textTransform: 'capitalize',
  },
  historyCard: {
    flexDirection: 'row',
    marginBottom: theme.spacing.md,
    backgroundColor: 'transparent',
  },
  timelineIndicator: {
    alignItems: 'center',
    marginRight: theme.spacing.md,
    backgroundColor: 'transparent',
  },
  timelineDot: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timelineDotIcon: {
    fontSize: 16,
    color: theme.colors.white,
    fontWeight: theme.fontWeights.bold,
  },
  timelineLine: {
    flex: 1,
    width: 2,
    backgroundColor: theme.colors.border,
    marginTop: theme.spacing.xs,
  },
  historyContent: {
    flex: 1,
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    ...theme.shadows.medium,
  },
  historyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
    backgroundColor: 'transparent',
  },
  petName: {
    fontSize: theme.fonts.large,
    fontWeight: theme.fontWeights.bold,
    color: theme.colors.textPrimary,
    flex: 1,
  },
  statusBadge: {
    paddingVertical: theme.spacing.xs,
    paddingHorizontal: theme.spacing.sm,
    borderRadius: theme.borderRadius.md,
  },
  statusText: {
    fontSize: theme.fonts.small,
    color: theme.colors.white,
    fontWeight: theme.fontWeights.semibold,
  },
  userName: {
    fontSize: theme.fonts.medium,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.xs,
  },
  historyDate: {
    fontSize: theme.fonts.small,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.xs,
  },
  historyNotes: {
    fontSize: theme.fonts.small,
    color: theme.colors.textSecondary,
    fontStyle: 'italic',
    marginTop: theme.spacing.xs,
  },
  modalContent: {
    width: Platform.select({ web: 450, default: 350 }),
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
  detailSection: {
    marginBottom: theme.spacing.lg,
    backgroundColor: 'transparent',
  },
  detailLabel: {
    fontSize: theme.fonts.small,
    color: theme.colors.textSecondary,
    fontWeight: theme.fontWeights.semibold,
    marginBottom: theme.spacing.xs,
    textTransform: 'uppercase',
  },
  detailValue: {
    fontSize: theme.fonts.medium,
    color: theme.colors.textPrimary,
    fontWeight: theme.fontWeights.medium,
  },
  detailSubvalue: {
    fontSize: theme.fonts.small,
    color: theme.colors.textSecondary,
    marginTop: theme.spacing.xs,
  },
  statusBadgeLarge: {
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    alignSelf: 'flex-start',
  },
  statusTextLarge: {
    fontSize: theme.fonts.medium,
    color: theme.colors.white,
    fontWeight: theme.fontWeights.bold,
  },
});
