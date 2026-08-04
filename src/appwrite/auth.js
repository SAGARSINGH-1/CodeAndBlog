// src/appwrite/auth.js  (kept at the same path/filename so existing imports don't break)
import toast from 'react-hot-toast';
import api from '../lib/api.js';

export class AuthService {
    notify = (message) => { toast.success(message); }
    notifywar = (message) => { toast(message, { icon: '⚠️' }); }
    notifyer = (message) => { toast.error(message); }

    // **Create a new user account
    async createAccount({ email, password, name }) {
        try {
            const { data } = await api.post('/auth/signup', { email, password, name });
            localStorage.setItem('authToken', data.token);
            this.notify("Account created successfully!");
            return data.user;
        } catch (error) {
            this.notifyer(error?.response?.data?.message || error.message);
            throw error;
        }
    }

    // **Delete a user account
    async deleteAccount(userid) {
        try {
            const result = await api.delete(`/users/${userid}`);
            if (result) {
                localStorage.removeItem('authToken');
                this.notify("Account deleted successfully!");
            }
            return result.data;
        } catch (error) {
            this.notifyer(error?.response?.data?.message || error.message);
            throw error;
        }
    }

    // **Create a login session
    async login({ email, password }) {
        try {
            const { data } = await api.post('/auth/login', { email, password });
            localStorage.setItem('authToken', data.token);
            this.notify("Login successfully!");
            return data.user;
        } catch (error) {
            this.notifyer(error?.response?.data?.message || error.message);
            throw error;
        }
    }

    // **Get the current user
    async getCurrentUser() {
        try {
            const token = localStorage.getItem('authToken');
            if (!token) return null;
            const { data } = await api.get('/auth/me');
            return data.user;
        } catch (error) {
            console.log("\n\nUser Not Registered yet please Signup \n\n\n", error);
        }
        return null;
    }

    // **Logout the current user
    async logout() {
        try {
            localStorage.removeItem('authToken');
            this.notify("Logout successfully!");
            return true;
        } catch (error) {
            this.notifyer(error.message);
            throw error;
        }
    }

    // **Login with Google
    // NOTE: this is not implemented. Appwrite handled Google OAuth for you;
    // MongoDB has no equivalent. To keep this feature you'd need to add
    // Passport.js + the Google OAuth 2.0 strategy on the backend, which is
    // a separate piece of work from this migration. Calling this for now
    // will just warn and no-op.
    async googleauth() {
        this.notifywar("Google login isn't wired up yet on the new backend.");
        return null;
    }

    // **Used to recover password and Send Verification Link to the user's email
    async PasswordRecovery(email) {
        try {
            const { data } = await api.post('/auth/forgot-password', { email });
            this.notify(data.message || "Reset Password Link Sent to your Email!");
            return data;
        } catch (error) {
            this.notifyer(error?.response?.data?.message || error.message);
            throw error;
        }
    }

    // **Used to reset password
    // NOTE: signature kept the same as the Appwrite version, but only
    // `secret` (the reset token from the emailed link) and `password` are
    // actually used now - there's no `userId` param needed anymore.
    async ResetPassword(userId, secret, password, passwordAgain) {
        try {
            const { data } = await api.post(`/auth/reset-password/${secret}`, { password });
            this.notify(data.message || "Password Reset Successfully!");
            return data;
        } catch (error) {
            this.notifyer(error?.response?.data?.message || error.message);
            throw error;
        }
    }

    // **Implement Email Verification and send email
    async createVerification() {
        try {
            const { data } = await api.get('/auth/send-verification');
            this.notify(data.message || "Verification link has been sent to your email!");
            return data;
        } catch (error) {
            this.notifyer(`Error sending verification link: ${error?.response?.data?.message || error.message}`);
            throw error;
        }
    }

    // **Verify Email Verification
    async updateVerification(userId, secret) {
        try {
            const { data } = await api.post(`/auth/verify-email/${secret}`);
            this.notify(data.message || "Email verification successful!");
            return data;
        } catch (error) {
            this.notifyer(`Error verifying email: ${error?.response?.data?.message || error.message}`);
            throw error;
        }
    }

    // **To get user avatar
    // NOTE: Appwrite's Avatars.getFlag() generated country flag images for you.
    // There's no MongoDB equivalent - if you still want flags, use a small
    // npm package like `flag-icons` or `country-flag-icons` on the frontend instead.
    async getAvtar(countryCode) {
        this.notifywar("Avatar/flag generation isn't available in the new backend.");
        return null;
    }

    // **To get user locale Address
    // NOTE: same story as getAvtar - Appwrite's Locale service is gone.
    // If you need country/locale detection, a frontend library or a free
    // IP-geolocation API would replace this.
    async getLocale() {
        this.notifywar("Locale detection isn't available in the new backend.");
        return null;
    }
}

const authService = new AuthService();
export default authService;
