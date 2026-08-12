import { User, UserRole, Medicine, Prescription, MedicineRequest, NotificationItem, FraudLog, AdminAnalytics, VerificationResult } from '../types';

export const api = {
  // Auth
  async login(email: string, password?: string, role?: UserRole) {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password: password || 'password123', role }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Login failed');
      return data;
    } catch (e: any) {
      throw new Error(e.message || 'Login request failed');
    }
  },

  async register(userData: Partial<User> & { password?: string }) {
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Registration failed');
      return data;
    } catch (e: any) {
      throw new Error(e.message || 'Registration failed');
    }
  },

  async verifyOtp(email: string, otp: string) {
    const res = await fetch('/api/auth/verify-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, otp }),
    });
    return res.json();
  },

  // AI OCR & Expiry Scan
  async verifyMedicineAI(payload: {
    imageBase64?: string;
    medicineName?: string;
    brandName?: string;
    batchNumber?: string;
    expiryDate?: string;
    condition?: string;
    form?: string;
    filename?: string;
  }): Promise<{ success: boolean; result: VerificationResult }> {
    const res = await fetch('/api/ai/verify-medicine', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    return res.json();
  },

  async verifyPrescriptionAI(imageBase64: string, filename?: string) {
    const res = await fetch('/api/ai/verify-prescription', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ imageBase64, filename }),
    });
    return res.json();
  },

  // Medicines / Donations
  async getDonations(): Promise<Medicine[]> {
    const res = await fetch('/api/donations');
    return res.json();
  },

  async getMedicines(): Promise<{ medicines: Medicine[] }> {
    const res = await fetch('/api/donations');
    const data = await res.json();
    return { medicines: Array.isArray(data) ? data : [] };
  },

  async createDonation(medicineData: Partial<Medicine>): Promise<{ success: boolean; medicine: Medicine }> {
    const res = await fetch('/api/donations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(medicineData),
    });
    return res.json();
  },

  async approveDonation(id: string) {
    const res = await fetch(`/api/donations/${id}/approve`, { method: 'PUT' });
    return res.json();
  },

  async rejectDonation(id: string) {
    const res = await fetch(`/api/donations/${id}/reject`, { method: 'PUT' });
    return res.json();
  },

  // Requests / Orders
  async getRequests(): Promise<{ requests: MedicineRequest[] }> {
    const res = await fetch('/api/requests');
    const data = await res.json();
    return { requests: Array.isArray(data) ? data : [] };
  },

  async createRequest(reqData: Partial<MedicineRequest>): Promise<{ success: boolean; request: MedicineRequest }> {
    const res = await fetch('/api/requests', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(reqData),
    });
    return res.json();
  },

  async updateDeliveryStatus(id: string, status: string, etaMinutes?: number) {
    const res = await fetch(`/api/requests/${id}/status`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status, etaMinutes }),
    });
    return res.json();
  },

  async updateRequestStatus(id: string, status: string, etaMinutes?: number) {
    return this.updateDeliveryStatus(id, status, etaMinutes);
  },

  // Analytics & Admin
  async getAdminStats(): Promise<AdminAnalytics> {
    const res = await fetch('/api/admin/stats');
    return res.json();
  },

  async getStats(): Promise<AdminAnalytics> {
    return this.getAdminStats();
  },

  async getFraudLogs(): Promise<FraudLog[]> {
    const res = await fetch('/api/admin/fraud-logs');
    return res.json();
  },

  async getNotifications(): Promise<NotificationItem[]> {
    const res = await fetch('/api/notifications');
    return res.json();
  },
};
