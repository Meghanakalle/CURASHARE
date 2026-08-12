export type UserRole = 'donor' | 'patient' | 'pharmacy' | 'ngo' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  avatar?: string;
  verified: boolean;
  licenseNumber?: string; // For Pharmacy
  hospitalName?: string; // For Patient / Doctor
  organizationName?: string; // For NGO
  createdAt: string;
  stats?: {
    donationsCount?: number;
    requestsCount?: number;
    medicinesSavedCount?: number;
    deliveriesCount?: number;
  };
}

export type MedicineForm = 'strip' | 'bottle' | 'box' | 'syrup' | 'injection' | 'inhaler';
export type MedicineCondition = 'unopened' | 'sealed_box' | 'intact_strip' | 'damaged_packaging';
export type DonationStatus = 'pending_verification' | 'approved' | 'rejected' | 'in_pharmacy' | 'allocated' | 'delivered';

export interface VerificationResult {
  aiApproved: boolean;
  confidenceScore: number;
  extractedName: string;
  extractedBrand: string;
  extractedManufacturer: string;
  extractedBatchNumber: string;
  extractedExpiryDate: string;
  expiryDaysRemaining: number;
  expiryStatus: 'valid' | 'expiring_soon' | 'expired'; // >90 days: valid, 60-90 days: warning, <60 days or past: invalid
  damageFlag: boolean;
  damageReason?: string;
  fraudFlag: boolean;
  fraudReason?: string;
  analysisSummary: string;
}

export interface Medicine {
  id: string;
  name: string;
  brand: string;
  manufacturer: string;
  batchNumber: string;
  expiryDate: string;
  quantity: number; // e.g. 10 tablets, 2 bottles
  unit: string; // e.g. "tablets", "bottles", "strips"
  category: string; // Antibiotic, Painkiller, Diabetes, Cardiac, Vitamins, Gastro, Respiratory
  form: MedicineForm;
  condition: MedicineCondition;
  donorId: string;
  donorName: string;
  donorRole: UserRole;
  donorCity: string;
  imageUrl: string;
  prescriptionRequired: boolean;
  status: DonationStatus;
  verification?: VerificationResult;
  qrCode: string;
  assignedPharmacyId?: string;
  assignedPharmacyName?: string;
  assignedPharmacyAddress?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Prescription {
  id: string;
  patientId: string;
  patientName: string;
  doctorName: string;
  hospitalName: string;
  extractedMedicines: string[];
  issueDate: string;
  validUntil: string;
  imageUrl: string;
  verified: boolean;
  aiVerificationNotes?: string;
  createdAt: string;
}

export type DeliveryStatus = 'matching' | 'reserved' | 'assigned_driver' | 'picked_up' | 'out_for_delivery' | 'delivered' | 'cancelled';

export interface MedicineRequest {
  id: string;
  patientId: string;
  patientName: string;
  patientPhone: string;
  deliveryAddress: string;
  city: string;
  medicineId: string;
  medicineName: string;
  quantityRequested: number;
  prescriptionId?: string;
  priority: 'urgent' | 'high' | 'normal';
  status: DeliveryStatus;
  pharmacyId: string;
  pharmacyName: string;
  deliveryPartnerId?: string;
  deliveryPartnerName?: string;
  driverPhone?: string;
  etaMinutes?: number;
  qrCode: string;
  currentLat?: number;
  currentLng?: number;
  createdAt: string;
  updatedAt: string;
}

export interface NotificationItem {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  link?: string;
  createdAt: string;
}

export interface FraudLog {
  id: string;
  userId: string;
  userName: string;
  userRole: UserRole;
  incidentType: 'Expired Medicine Upload' | 'Fake Prescription' | 'Duplicate Image Upload' | 'Tampered Package' | 'Suspicious Frequency';
  details: string;
  timestamp: string;
  riskLevel: 'high' | 'medium' | 'low';
  resolved: boolean;
}

export interface AdminAnalytics {
  totalUsers: number;
  totalDonations: number;
  totalApprovedDonations: number;
  totalRequestsFulfilled: number;
  wasteReducedKg: number;
  estimatedCostSavedINR: number;
  activePharmacies: number;
  activeNGOs: number;
  categoryDistribution: { name: string; count: number; color: string }[];
  monthlyDonations: { month: string; donations: number; requests: number }[];
  fraudAttemptsBlocked: number;
}
