export interface AdoptionRequest {
  id: string;
  petId: string;
  petName: string;
  userId: string;
  userName: string;
  userEmail: string;
  status: 'pending' | 'approved' | 'rejected' | 'completed';
  requestDate: string;
  notes?: string;
}
