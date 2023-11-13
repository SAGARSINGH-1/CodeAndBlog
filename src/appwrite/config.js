import conf from '../conf/conf.js'
import { Client, ID, Databases, Storage, Query } from 'appwrite'

export class Service {
    client = new Client();
    databases;
    bucket;

    notify = (message) => { toast.success(message, { autoClose: 2000,});}
    notifywar = (message) => { toast.console.warn();(message, { autoClose: 2000,});}
    notifyer  = (message) => { toast.error(message, { autoClose: 2000,});}

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId)
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async creatPost({ tittle, slug, content, featuredImage, status, userId }) {
        try {
            const result =  await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    tittle,
                    content,
                    featuredImage,
                    status,
                    userId,
                }
            );
            if (result) {
                this.notify("Post created successfully!");
            }
        } catch (error) {
            this.notifyer("An error occurred, Please try again!");
            throw error
        }
    }

    async updatePost(slug, { tittle, content, featuredImage, status }) {
        try {
            const result = await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    tittle,
                    content,
                    featuredImage,
                    status,
                }
            );
            if (result) {
                this.notify("Post Updated successfully!");
            }
        } catch (error) {
            this.notifyer("An error occurred, Please try again!");
            throw error
        }
    }


    async deletePost(slug) {
        try {
            this.notify("Post Deleted successfully!");
            const result = await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            );
             if (result) {
                this.notify("Post created successfully!");
            }
            return result;
        } catch (error) {
            this.notifyer("An error occurred, Please try again!");
            throw error
        }
    }

    async getPosts(slug) {
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            );
        } catch (error) {
            throw error;
        }
    }

    async getPosts(quries = [Query.equal('status', 'active')]) {
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                quries,
                // add pagination here 
            );
        } catch (error) {
            throw error;
        }
    }


    // Upload files 

    async uploadFiles(file) {
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            );
        } catch (error) {
            throw error;
        }
    }

    async deletedFiles(fileId) {
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            );
            return true;
        } catch (error) {
            throw error;
        }
    }

    getFilePreview(fileId) {
        return this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileId,
        );
    }

}

const service = new Service();

export default service;