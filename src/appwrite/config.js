import conf from "../Components/conf/conf";
import { Client, ID, Databases, Storage } from "appwrite";

export class Service {
    client = new Client();
    databases;
    storage;

    constructor() {
        this.client
            .setEndpoint(conf.appWriteUrl)
            .setProject(conf.appWriteProjectId);
        this.databases = new Databases(this.client);
        this.storage = new Storage(this.client);
    }

    // Upload Resume File to Storage
    async uploadResume(file) {
        try {
            const uploadedFile = await this.storage.createFile(
                conf.appWriteBucketId,
                ID.unique(),
                file
            );
            return uploadedFile.$id; // Return File ID
        } catch (error) {
            console.log("Error uploading resume:", error);
            return null;
        }
    }

    // Get Resume File URL
    getResumeUrl(fileId) {
        return this.storage.getFileView(conf.appWriteBucketId, fileId);
    }

    // Delete Resume File
    async deleteResume(fileId) {
        try {
            await this.storage.deleteFile(conf.appWriteBucketId, fileId);
            return true;
        } catch (error) {
            console.log("Error deleting file:", error);
            return false;
        }
    }

    // Save Resume File ID to User Database
    async updateUserResume(userId, fileId) {
        try {
            return await this.databases.updateDocument(
                conf.appWriteDatabaseId,
                conf.appWriteCollectionId,
                userId,
                { resumeFileId: fileId }
            );
        } catch (error) {
            console.log("Error updating user resume:", error);
            return null;
        }
    }
}

const service = new Service();
export default service;