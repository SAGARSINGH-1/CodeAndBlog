import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import conf from '../conf/conf.js'
import { Client, Account, ID, Query,Avatars,Locale } from 'appwrite'
import Service from './config';

export class AuthService {
    client = new Client();
    account;
    avatars;
    Locale;

    notify = (message) => { toast.success(message, { position: "bottom-right", autoClose: 2000, }); }
    notifywar = (message) => { toast.console.warn(); (message, { position: "bottom-right", autoClose: 2000, }); }
    notifyer = (message) => { toast.error(message, { position: "bottom-right", autoClose: 2000, }); }


    // **EndPoints to connect to the right Appwrite server and project.
    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId)
        this.avatars = new Avatars(this.client);
        this.account = new Account(this.client)
        this.Locale = new Locale(this.client)
    }

    // **Create a new user account
    async createAccount({ email, password, name }) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if (userAccount) {
                await Service.createUser(userAccount.$id, name,email);
                this.notify("Account created successfully!");
                return this.login({ email, password });
            } else {
                this.notifywar("Account creation failed. Please try again.");
                return userAccount;
            }
        } catch (error) {
            this.notifyer(`${error.message}`);
            throw error;
        }
    }


    //** Delete a user account

    async deleteAccount(userid) {
        try {
            const result = await this.account.updateStatus(userid);
            if (result) {
                // await Service.deleteUser(userid);
                this.notify("Account deleted successfully!");
            }
            return result;
        } catch (error) {
            this.notifyer(`${error.message}`);
            throw error;
        }
    }


    // **Create a login session
    async login({ email, password }) {
        try {
            const result = await this.account.createEmailSession(email, password);
            if (result) {
                this.notify("Login successfully!");
            }
            return result;
        } catch (error) {
            this.notifyer(`${error.message}`);
            throw error;
        }
    }

    // **Get the current user
    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.log("\n\nUser Not Registered yet please Signup \n\n\n", error);
        }
        return null;
    }

    // **Logout the current user
    async logout() {
        try {
            const result = await this.account.deleteSessions();
            if (result) {
                this.notify("Logout successfully!");
            }
            return result;
        } catch (error) {
            this.notifyer(`${error.message}`);
            throw error;
        }
    }

    // **Login with Google
    async googleauth() {
        try {
            const result = this.account.createOAuth2Session('google', "https://localhost:5173", "https://localhost:5173");

            if (result) {
                this.notify("Login successfully!");
            }
            return result;
        } catch (error) {
            this.notifyer(`${error.message}`);
            throw error;
        }
    }

    // **Used to recover password and Send Verification Link to the user's email
    async PasswordRecovery(email) {
        try {
            const result = await this.account.createRecovery(email, "http://localhost:5173/password-reset", "http://localhost:5173/password-reset");
            if (result) {
                this.notify("Reset Password Link Sent to your Email!");
            }
            return result;
        } catch (error) {
            this.notifyer(`${error.message}`);
            throw error;
        }
    }

    // **Used to reset password
    async ResetPassword(userId, secret, password, passwordAgain) {

        try {
            const result = await this.account.updateRecovery(secret, userId, password, passwordAgain);
            if (result) {
                this.notify("Password Reset Successfully!");
            }
        } catch (error) {
            this.notifyer(`${error.message}`);
            throw error;
        }
    }


    // **Implement Email Verification and send email
    async createVerification() {
        try {
            const result = await this.account.createVerification("http://localhost:5173/setting", "http://localhost:5173/setting");
            if (result) {
                this.notify("Verification link has been sent to your email!");
            }
        } catch (error) {
            this.notifyer(`Error sending verification link: ${error.message}`);
            throw error;
        }
    }

    // **Verify Email Verification 
    async updateVerification(userId, secret) {
        try {
            const result = await this.account.updateVerification(secret, userId, "http://localhost:5173/setting");
            if (result) {
                this.notify("Email verification successful!");
            }
        } catch (error) {
            this.notifyer(`Error verifying email: ${error.message}`);
            throw error;
        }
    }


    // **To get user awatar
    async getAvtar(countryCode) {
        try {
            const avtar = this.avatars.getFlag(countryCode);
            if (avtar) {
                return avtar;
            }
        } catch (error) {
            throw error;
        }
    }

    // **To get user locale Address
    async getLocale() {
        try {
            const locale = await this.Locale.get();
            if (locale) {
                return locale;
            }
        } catch (error) {
            throw error;
        }
    }


}

const authService = new AuthService();
export default authService;
