import conf from '../Components/conf/conf';
import { Client, Account, ID, Databases } from "appwrite";

export class AuthService {
    client = new Client();
    account;
    database;

    constructor() {
        this.client
            .setEndpoint(conf.appWriteUrl) 
            .setProject(conf.appWriteProjectId);

        this.account = new Account(this.client);
        this.database = new Databases(this.client);
    }

    // Create a new user account and save it in the database
    async createAccount({ email, password, name, phone, city, company, work, role, address, gender, languages, type }) {
        try {
            console.log("Starting account creation...");
            
            const userId = `user_${Date.now()}`; // Unique user ID
            console.log("Generated User ID:", userId);
            
            const userAccount = await this.account.create(userId, email, password, name);
            console.log("User account response:", userAccount);
    
            if (!userAccount) throw new Error("Account creation failed");
    
            await this.login({ email, password });
    
            const user = await this.getCurrentUser();
            console.log("Logged in user:", user);
    
            if (!user) throw new Error("User login failed");
    
            await this.database.createDocument(
                conf.appWriteDatabaseId,
                conf.appwriteCollectionId,
                user.$id,
                { name, email, phone, city, company, work, role, address, gender, languages, type, resumeFileId: "" }
            );
    
            return user;
        } catch (error) {
            console.error("Error creating account:", error);
            throw error;
        }
    }
    
    

    // Log in a user
    async login({ email, password }) {
        try {
            await this.account.createEmailPasswordSession(email, password);
            return await this.getCurrentUser();
        } catch (error) {
            console.error("Error logging in:", error);
            throw error;
        }
    }

    // Get the currently logged-in user
    async getCurrentUser() {
        try {
            const user = await this.account.get();
            console.log("Fetched user:", user);
            return user;
        } catch (error) {
            console.error("Error fetching current user:", error);
            return null;
        }
    }
    

    // Log out the user
    async logout() {
        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.error("Error logging out:", error);
            throw error;
        }
    }
}

// Create an instance of AuthService
const authService = new AuthService();
export default authService;