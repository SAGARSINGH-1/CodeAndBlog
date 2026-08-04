// Auth service — talks to Express API (folder name kept for existing imports)
import toast from 'react-hot-toast';
import api from '../lib/api.js';

export class AuthService {
  notify = (message) => toast.success(message);
  notifyer = (message) => toast.error(message);

  async createAccount({ email, password, name }) {
    try {
      const { data } = await api.post('/auth/signup', { email, password, name });
      localStorage.setItem('authToken', data.token);
      this.notify('Account created successfully!');
      return data.user;
    } catch (error) {
      this.notifyer(error?.response?.data?.message || error.message);
      throw error;
    }
  }

  async deleteAccount(userid) {
    try {
      const result = await api.delete(`/users/${userid}`);
      localStorage.removeItem('authToken');
      this.notify('Account deleted successfully!');
      return result.data;
    } catch (error) {
      this.notifyer(error?.response?.data?.message || error.message);
      throw error;
    }
  }

  async login({ email, password }) {
    try {
      const { data } = await api.post('/auth/login', { email, password });
      localStorage.setItem('authToken', data.token);
      this.notify('Login successfully!');
      return data.user;
    } catch (error) {
      this.notifyer(error?.response?.data?.message || error.message);
      throw error;
    }
  }

  async getCurrentUser() {
    try {
      if (!localStorage.getItem('authToken')) return null;
      const { data } = await api.get('/auth/me');
      return data.user;
    } catch {
      return null;
    }
  }

  async logout() {
    localStorage.removeItem('authToken');
    this.notify('Logout successfully!');
    return true;
  }

  async PasswordRecovery(email) {
    try {
      const { data } = await api.post('/auth/forgot-password', { email });
      this.notify(data.message || 'If that account exists, a reset link has been sent.');
      return data;
    } catch (error) {
      this.notifyer(error?.response?.data?.message || error.message);
      throw error;
    }
  }

  async ResetPassword(_userId, secret, password) {
    try {
      const { data } = await api.post(`/auth/reset-password/${secret}`, { password });
      this.notify(data.message || 'Password reset successfully!');
      return data;
    } catch (error) {
      this.notifyer(error?.response?.data?.message || error.message);
      throw error;
    }
  }

  async createVerification() {
    try {
      const { data } = await api.get('/auth/send-verification');
      this.notify(data.message || 'Verification link has been sent to your email!');
      return data;
    } catch (error) {
      this.notifyer(error?.response?.data?.message || error.message);
      throw error;
    }
  }

  async updateVerification(_userId, secret) {
    try {
      const { data } = await api.post(`/auth/verify-email/${secret}`);
      this.notify(data.message || 'Email verification successful!');
      return data;
    } catch (error) {
      this.notifyer(error?.response?.data?.message || error.message);
      throw error;
    }
  }
}

const authService = new AuthService();
export default authService;
