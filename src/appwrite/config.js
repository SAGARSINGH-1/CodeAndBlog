import conf from '../conf/conf.js'
import { Client, ID, Databases, Storage, Query } from 'appwrite'
import { ToastContainer, toast } from 'react-toastify';

export class Service {
    client = new Client();
    databases;
    bucket;

    notify = (message) => { toast.success(message, { position: "bottom-right", autoClose: 2000,});}
    notifywar = (message) => { toast.console.warn();(message, { position: "bottom-right", autoClose: 2000,});}
    notifyer  = (message) => { toast.error(message, { position: "bottom-right", autoClose: 2000,});}

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId)
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost({ title, slug, content, featuredImage, status, userid,name }) {
        try {
            const result =  await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userid,
                    name,
                }
            );
            if (result) {
                this.notify("Post created successfully!");
            }
        } catch (error) {
           this.notifyer(`${error.message}`);
            throw error
        }
    }

    async updatePost(slug, { title, content, featuredImage, status }) {
        try {
            const result = await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                }
            );
            if (result) {
                this.notify("Post Updated successfully!");
            }
        } catch (error) {
           this.notifyer(`${error.message}`);
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
           this.notifyer(`${error.message}`);
            throw error
        }
    }

    async getPost(slug) {
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

    async uploadFile(file) {
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

    async deleteFile(fileId) {
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