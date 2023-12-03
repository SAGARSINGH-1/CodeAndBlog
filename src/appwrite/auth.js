import React from 'react';
import { ToastContainer, toast } from 'react-toastify';

import conf from '../conf/conf.js'
import { Client, Account, ID } from 'appwrite'

export class AuthService {
    client = new Client();
    account;

   notify = (message) => { toast.success(message, { position: "bottom-right", autoClose: 2000,});}
   notifywar = (message) => { toast.console.warn();(message, { position: "bottom-right", autoClose: 2000,});}
   notifyer  = (message) => { toast.error(message, { position: "bottom-right", autoClose: 2000,});}


    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId)
        this.account = new Account(this.client)
    }

    async createAccount({ email, password, name }) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if (userAccount) {
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

    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.log("\n\nUser Not Registered yet please Signup \n\n\n",error);
        }
        return null;
    }

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
    
    async googleauth(){
        try {
            const result = this.account.createOAuth2Session('google', 'https://code-and-blog.vercel.app/home', 'https://code-and-blog.vercel.app/home');
            if (result) {
                this.notify("Login successfully!");
            }
            return result;
        } catch (error) {
            this.notifyer(`${error.message}`);
            throw error;
        }
    
    }

}

const authService = new AuthService();
export default authService;