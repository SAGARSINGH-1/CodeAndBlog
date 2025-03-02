import conf from '../conf/conf.js'
import { Client, ID, Databases, Storage, Query } from 'appwrite'
import toast from 'react-hot-toast';

export class Service {
    client = new Client();
    databases;
    bucket;

    // tost handling
    notify = (message) => { toast.success(message); }
    notifywar = (message) => { toast(message, { icon: '⚠️' }); }
    notifyer = (message) => { toast.error(message); }

    // EndPoints to connect to the right Appwrite server and project.
    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId)
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
        // this.profileBucket = new Storage(this.client);
    }



    // **Create a new user post/blog
    async createPost({ title, slug, content, featuredImage, status, userid, name }) {
        function generateUniqueID() {
            const timestamp = Date.now().toString(36); // Convert timestamp to base36
            const randomString = Math.random().toString(36).substring(2, 8); // Use a shorter random string
            const uniqueID = `${timestamp}${randomString}`;
            return uniqueID;
        }

        try {
            const postid = generateUniqueID();
            const result = await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId_1,
                slug,
                {
                    postid,
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
                return title;
            }
        } catch (error) {
            this.notifyer(`${error.message}`);
            throw error
        }
    }

    // **Update a user post/blog which is already created
    async updatePost(slug, { title, content, featuredImage, status }) {
        try {
            const result = await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId_1,
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


    // **Delete a user post/blog which is already created
    async deletePost(slug) {
        try {
            const result = await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId_1,
                slug
            );
            this.notify("Post Deleted successfully!");
            if (result) {
                this.notify("Post created successfully!");
            }
            return result;
        } catch (error) {
            this.notifyer(`${error.message}`);
            throw error
        }
    }

    // **Get a user post/blog which is already created
    async getPost(slug) {
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId_1,
                slug
            );
        } catch (error) {
            throw error;
        }
    }

    // **Get all user post/blog which is already created and having an status active
    async getPosts(quries = [Query.equal('status', 'active')]) {
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId_1,
                quries,
                // add pagination here 
            );
        } catch (error) {
            throw error;
        }
    }


    // **Upload files to the Appwrite storage
    async uploadFile(file) {
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            );
        } catch (error) {
            this.notifyer(`${error.message}`);
        }
    }

    // **Delete files from the Appwrite storage
    async deleteFile(fileId) {
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            );
            return true;
        } catch (error) {
            this.notifyer(`${error.message}`);
        }
    }

    // **Get file preview from the Appwrite storage
    getFilePreview(fileId) {
        return this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileId,
        );
    }

    //  **Create a comment on the post with its id
    async createComment({ name, postid, userid, comment }) {
        try {
            const documentID = ID.unique();
            const result = this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId_2,
                documentID,
                {
                    postid,
                    name,
                    userid,
                    comment,
                }
            );
            if (result) {
                this.notify("Comment Added successfully!");
            }
        } catch (error) {
            this.notify(`${error.message}`);
        }
    }


    // **Get all comments on the post with its id
    async getComments(postid, queries = [Query.equal('postid', postid)]) {
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId_2,
                queries,
                // add pagination here 
            );
        } catch (error) {
            throw error;
        }
    }


    // **Create a user account document in the database
    async createUser(userid, name, email) {
        try {
            const result = await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId_3,
                userid,
                {
                    userid,
                    name,
                    email,
                }
            );
            if (result) {
                this.notify("User added");
            }
        } catch (error) {
            throw error;
        }
    }

    // **Delete a user account document from the database
    async deleteUser(userid) {
        try {
            const result = await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId_3,
                userid,
            );
            if (result) {
                this.notify("User deleted from database");
            }
            return result;
        } catch (error) {
            this.notifyer(`${error.message}`);
            throw error;
        }
    }


    // **Get a user account document from the database
    async getUser(userid) {
        try {
            const data = await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId_3,
                userid,
            );
            if (data) {
                return data;
            }
        } catch (error) {
            this.notifyer(`${error.message}`);
        }
    }

    // Update user : 
    async updateUserProfile(userid, updateData) {
        try {
            const result = await this.databases.updateDocument(
                conf.appwriteDatabaseId, // Your database ID
                conf.appwriteCollectionId_3, // Your user collection ID
                userid, // ✅ This must be the correct user ID
                updateData
            );
            return result;
        } catch (error) {
            this.notifyer(`Error updating profile: ${error.message}`);
            throw error;
        }
    }

    // Updataing all the documents of userid given to set a profileImageId which is changed
    async updateArticleProfileId(userid, updateData) {
        try {
            // Fetch all articles where userId matches
            const articles = await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId_1, // Article Collection ID
                [
                    Query.equal("userid", userid) // Find all articles of the user
                ]
            );

            // Update profileImageId for all matching articles
            const updatePromises = articles.documents.map(article =>
                this.databases.updateDocument(
                    conf.appwriteDatabaseId,
                    conf.appwriteCollectionId_1,
                    article.$id,
                    updateData
                )
            );

            // Wait for all updates to complete
            const results = await Promise.all(updatePromises);
            return results;
        } catch (error) {
            this.notifyer(`Error updating articles: ${error.message}`);
            throw error;
        }
    }



    // To store profie picture in the 2nd bucket
    async uploadProfileImage(file, id) {
        try {
            const uploadedFile = await this.bucket.createFile(
                conf.appwriteBucketId_Profile,
                ID.unique(),
                file
            );
            if (uploadedFile) {
                this.notify("Profile updated successfully");
            }
            return uploadedFile;
        } catch (error) {
            this.notifywar("File upload error please try again after some time.", error);
        }
    }

    // To get the profie picture from the 2nd bucket
    getProfilePreview(fileId) {
        return this.bucket.getFilePreview(
            conf.appwriteBucketId_Profile,
            fileId,
        );
    }

    async deleteProfile(fileId) {
        try {
            const isdeleted = this.bucket.deleteFile(
                conf.appwriteBucketId_Profile,
                fileId
            );
            if (isdeleted) {
                return true
            }
        } catch (error) {
            this.notifyer(`${error.message}`);
        }
    }

}

const service = new Service();

export default service;