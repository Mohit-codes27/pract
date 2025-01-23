import { use } from 'react';
import conf from '../Components/conf/conf';


import { Client, Account, ID } from "appwrite";

export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appWriteUrl)
            .setProject(conf.appWriteProjectId);
        this.account = new Account(this.client);
    }

    async createAccount({ email, password, name, phone }) {
        try {
            // Step 1: Create the user account
            const userAccount = await this.account.create(ID.unique(), email, password, name);
    
            if (userAccount) {
                // Step 2: Log in the user
                return this.login({ email, password, phone });
            }
        } catch (error) {
            throw error;
        }
    }

    async login({ email, password, phone }) {
        try {
            await this.account.createEmailPasswordSession(email, password);
            await this.account.updatePrefs({ phone });
    
                // Step 4: Fetch and return the user data
                const userData = await this.getCurrentUser();

                return{
                    userData,
                };

        } catch (error) {
            return error;
        }
    }
    
    

    async getPhone() {
        try {
            const userData = await this.getCurrentUser();
            return (
                userData.prefs.phone
            ); // Access phone from preferences
        } catch (error) {
            throw error;
        }
    }
    
    

// async login(loginDetail) {
//     try {
//         const session = await this.account.createEmailPasswordSession(loginDetail.email, loginDetail.password);
//         const userData = await this.getCurrentUser();
//         return { session, userData };
//     } catch (error) {
//         return error;
//     }
// }

    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Appwrite service :: getCurrentUser :: error", error)
        }
        return null;
    }

    async logout() {
        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.log("Appwrite service :: logout :: error", error)
        }
    }
}

const authService = new AuthService();

export default authService;

