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
import { AdoptionRequest } from '@/interfaces';
import { getTheme } from '@/constants/Theme';
import { createSharedStyles, createModalStyles } from '@/styles/shared';

// Mock data
const initialRequests: AdoptionRequest[] = [
  {
    id: '1',
    petId: '1',
    petName: 'Rex',
    userId: '2',
    userName: 'João Silva',
    userEmail: 'joao@example.com',
    status: 'pending',
    requestDate: '2025-10-20',
    notes: 'Tenho experiência com cachorros grandes',
  },
  {
    id: '2',
    petId: '2',
    petName: 'Mimi',
    userId: '3',
    userName: 'Maria Santos',
    userEmail: 'maria@example.com',
    status: 'approved',
    requestDate: '2025-10-18',
    notes: 'Tenho um quintal grande e seguro',
  },
  {
    id: '3',
    petId: '3',
    petName: 'Thor',
    userId: '2',
    userName: 'João Silva',
    userEmail: 'joao@example.com',
    status: 'completed',
    requestDate: '2025-10-15',
    notes: 'Adoção concluída com sucesso',
  },
];

export default function RequestsManagement() {
  const theme = getTheme();
  const router = useRouter();
  const sharedStyles = createSharedStyles(theme);
  const modalStyles = createModalStyles(theme);
  const styles = createStyles(theme);

  const [requests, setRequests] = useState<AdoptionRequest[]>(initialRequests);
  const [selectedRequest, setSelectedRequest] = useState<AdoptionRequest | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected' | 'completed'>('all');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return theme.colors.warning;
      case 'approved':
        return theme.colors.info;
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
      case 'pending':
        return 'Pendente';
      case 'approved':
        return 'Aprovado';
      case 'completed':
        return 'Concluído';
      case 'rejected':
        return 'Rejeitado';
      default:
        return status;
    }
  };

  const handleUpdateStatus = (requestId: string, newStatus: AdoptionRequest['status']) => {
    setRequests(
      requests.map((req) =>
        req.id === requestId ? { ...req, status: newStatus } : req
      )
    );
    setShowDetailModal(false);
    Alert.alert('Sucesso!', `Status atualizado para: ${getStatusLabel(newStatus)}`);
  };

  const openRequestDetail = (request: AdoptionRequest) => {
    setSelectedRequest(request);
    setShowDetailModal(true);
  };

  const filteredRequests = filter === 'all' 
    ? requests 
    : requests.filter((req) => req.status === filter);

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
            <Text style={styles.headerTitle}>📋 Solicitações de Adoção</Text>
            <Text style={styles.headerSubtitle}>
              Total: {filteredRequests.length} solicitaç{filteredRequests.length !== 1 ? 'ões' : 'ão'}
            </Text>
          </View>

          {/* Filter Tabs */}
          <View style={styles.filterContainer}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {[
                { key: 'all', label: 'Todas' },
                { key: 'pending', label: 'Pendentes' },
                { key: 'approved', label: 'Aprovadas' },
                { key: 'completed', label: 'Concluídas' },
                { key: 'rejected', label: 'Rejeitadas' },
              ].map((tab) => (
                <TouchableOpacity
                  key={tab.key}
                  style={[
                    styles.filterTab,
                    filter === tab.key && styles.filterTabActive,
                  ]}
                  onPress={() => setFilter(tab.key as any)}
                >
                  <Text
                    style={[
                      styles.filterTabText,
                      filter === tab.key && styles.filterTabTextActive,
                    ]}
                  >
                    {tab.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Requests List */}
          <View style={styles.listContainer}>
            {filteredRequests.length === 0 ? (
              <View style={styles.emptyState}>
                <Text style={styles.emptyEmoji}>📭</Text>
                <Text style={styles.emptyText}>Nenhuma solicitação encontrada</Text>
              </View>
            ) : (
              filteredRequests.map((request) => (
                <TouchableOpacity
                  key={request.id}
                  style={styles.requestCard}
                  onPress={() => openRequestDetail(request)}
                  activeOpacity={0.7}
                >
                  <View style={styles.requestHeader}>
                    <Text style={styles.petName}>🐾 {request.petName}</Text>
                    <View
                      style={[
                        styles.statusBadge,
                        { backgroundColor: getStatusColor(request.status) },
                      ]}
                    >
                      <Text style={styles.statusText}>{getStatusLabel(request.status)}</Text>
                    </View>
                  </View>
                  <View style={styles.requestInfo}>
                    <Text style={styles.userName}>👤 {request.userName}</Text>
                    <Text style={styles.requestDate}>📅 {request.requestDate}</Text>
                  </View>
                </TouchableOpacity>
              ))
            )}
          </View>
        </ScrollView>

        {/* Detail Modal */}
        {selectedRequest && (
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
                        <Text style={styles.modalTitle}>Detalhes da Solicitação</Text>
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
                          <Text style={styles.detailValue}>🐾 {selectedRequest.petName}</Text>
                        </View>

                        <View style={styles.detailSection}>
                          <Text style={styles.detailLabel}>Solicitante</Text>
                          <Text style={styles.detailValue}>👤 {selectedRequest.userName}</Text>
                          <Text style={styles.detailSubvalue}>{selectedRequest.userEmail}</Text>
                        </View>

                        <View style={styles.detailSection}>
                          <Text style={styles.detailLabel}>Data da Solicitação</Text>
                          <Text style={styles.detailValue}>📅 {selectedRequest.requestDate}</Text>
                        </View>

                        <View style={styles.detailSection}>
                          <Text style={styles.detailLabel}>Status Atual</Text>
                          <View
                            style={[
                              styles.statusBadgeLarge,
                              { backgroundColor: getStatusColor(selectedRequest.status) },
                            ]}
                          >
                            <Text style={styles.statusTextLarge}>
                              {getStatusLabel(selectedRequest.status)}
                            </Text>
                          </View>
                        </View>

                        {selectedRequest.notes && (
                          <View style={styles.detailSection}>
                            <Text style={styles.detailLabel}>Observações</Text>
                            <Text style={styles.detailValue}>{selectedRequest.notes}</Text>
                          </View>
                        )}

                        <View style={styles.actionsSection}>
                          <Text style={styles.actionsTitle}>Atualizar Status</Text>
                          <View style={styles.actionButtons}>
                            <TouchableOpacity
                              style={[styles.actionButton, { backgroundColor: theme.colors.info }]}
                              onPress={() => handleUpdateStatus(selectedRequest.id, 'approved')}
                            >
                              <Text style={styles.actionButtonText}>✓ Aprovar</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                              style={[styles.actionButton, { backgroundColor: theme.colors.error }]}
                              onPress={() => handleUpdateStatus(selectedRequest.id, 'rejected')}
                            >
                              <Text style={styles.actionButtonText}>✗ Rejeitar</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                              style={[styles.actionButton, { backgroundColor: theme.colors.success }]}
                              onPress={() => handleUpdateStatus(selectedRequest.id, 'completed')}
                            >
                              <Text style={styles.actionButtonText}>✓✓ Concluir</Text>
                            </TouchableOpacity>
                          </View>
                        </View>
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
  filterContainer: {
    paddingHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
    backgroundColor: 'transparent',
  },
  filterTab: {
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.lg,
    marginRight: theme.spacing.sm,
    borderRadius: theme.borderRadius.lg,
    backgroundColor: theme.colors.white,
    borderWidth: 2,
    borderColor: theme.colors.border,
  },
  filterTabActive: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  filterTabText: {
    fontSize: theme.fonts.small,
    color: theme.colors.textSecondary,
    fontWeight: theme.fontWeights.medium,
  },
  filterTabTextActive: {
    color: theme.colors.white,
    fontWeight: theme.fontWeights.bold,
  },
  listContainer: {
    paddingHorizontal: theme.spacing.lg,
    paddingBottom: theme.spacing.xl,
    backgroundColor: 'transparent',
  },
  requestCard: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
    ...theme.shadows.medium,
  },
  requestHeader: {
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
  requestInfo: {
    backgroundColor: 'transparent',
  },
  userName: {
    fontSize: theme.fonts.medium,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.xs,
  },
  requestDate: {
    fontSize: theme.fonts.small,
    color: theme.colors.textSecondary,
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
  actionsSection: {
    marginTop: theme.spacing.lg,
    paddingTop: theme.spacing.lg,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    backgroundColor: 'transparent',
  },
  actionsTitle: {
    fontSize: theme.fonts.medium,
    fontWeight: theme.fontWeights.bold,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.md,
  },
  actionButtons: {
    gap: theme.spacing.sm,
    backgroundColor: 'transparent',
  },
  actionButton: {
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
  },
  actionButtonText: {
    fontSize: theme.fonts.medium,
    color: theme.colors.white,
    fontWeight: theme.fontWeights.bold,
  },
});
