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

    async createAccount({
        email,
        password,
        name,
        phone,
        city,
        company,
        work,
        role,
        address,
        gender,
        languages,
        type,
    }) {
        try {
            // Step 1: Create the user account
            const userAccount = await this.account.create(ID.unique(), email, password, name);

            if (userAccount) {
                // Step 2: Log in the user
                await this.login({ email, password });

                // Step 3: Save additional user data as preferences
                await this.account.updatePrefs({
                    phone,
                    city,
                    company,
                    work,
                    role,
                    address,
                    gender,
                    languages,
                    type,
                });

                // Step 4: Fetch and return the user data
                const userData = await this.getCurrentUser();
                return userData;
            }
        } catch (error) {
            throw error;
        }
    }

    async login({ email, password }) {
        try {
            // Create a session for the user
            await this.account.createEmailPasswordSession(email, password);

            // Fetch and return the user data
            const userData = await this.getCurrentUser();
            return userData;
        } catch (error) {
            throw error;
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.error("AuthService :: getCurrentUser :: error", error);
            throw error;
        }
    }

    async getPhone() {
        try {
            const userData = await this.getCurrentUser();
            return userData.prefs.phone; // Access phone from preferences
        } catch (error) {
            throw error;
        }
    }

    async logout() {
        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.error("AuthService :: logout :: error", error);
            throw error;
        }
    }
}

const authService = new AuthService();

export default authService;
