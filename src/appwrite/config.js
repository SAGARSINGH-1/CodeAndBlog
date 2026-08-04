// src/appwrite/config.js  (kept at the same path/filename so existing imports don't break)
import toast from 'react-hot-toast';
import api from '../lib/api.js';

export class Service {
    notify = (message) => { toast.success(message); }
    notifywar = (message) => { toast(message, { icon: '⚠️' }); }
    notifyer = (message) => { toast.error(message); }

    // **Create a new user post/blog
    async createPost({ title, slug, content, featuredImage, featuredImageUrl, status, userid, name }) {
        try {
            const { data } = await api.post('/posts', {
                title, slug, content, featuredImage, featuredImageUrl, status, userid, name,
            });
            this.notify("Post created successfully!");
            return data;
        } catch (error) {
            this.notifyer(error?.response?.data?.message || error.message);
            throw error;
        }
    }

    // **Update a user post/blog which is already created
    async updatePost(slug, { title, content, featuredImage, featuredImageUrl, status }) {
        try {
            const { data } = await api.put(`/posts/${slug}`, { title, content, featuredImage, featuredImageUrl, status });
            this.notify("Post Updated successfully!");
            return data;
        } catch (error) {
            this.notifyer(error?.response?.data?.message || error.message);
            throw error;
        }
    }

    // **Delete a user post/blog which is already created
    async deletePost(slug) {
        try {
            const { data } = await api.delete(`/posts/${slug}`);
            this.notify("Post Deleted successfully!");
            return data;
        } catch (error) {
            this.notifyer(error?.response?.data?.message || error.message);
            throw error;
        }
    }

    // **Get a user post/blog which is already created
    async getPost(slug) {
        try {
            const { data } = await api.get(`/posts/${slug}`);
            return data;
        } catch (error) {
            throw error;
        }
    }

    // **Get all user post/blog which is already created and having status active
    // NOTE (breaking change): the old signature took an Appwrite `Query` array,
    // e.g. getPosts([Query.equal('status', 'active')]).
    // The new signature takes a plain filter object instead, e.g.:
    //   getPosts({ status: 'active' })
    //   getPosts({ userid: someUserId })
    // Update any call sites in your pages that still import/use `Query`.
    async getPosts(filters = { status: 'active' }) {
        try {
            const { data } = await api.get('/posts', { params: filters });
            return data; // { documents: [...], total }
        } catch (error) {
            throw error;
        }
    }

    // **Upload files (post featured images)
    async uploadFile(file) {
        try {
            const formData = new FormData();
            formData.append('image', file);
            const { data } = await api.post('/posts/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            return data; // { $id, url } - $id kept for compatibility with existing code
        } catch (error) {
            this.notifyer(error?.response?.data?.message || error.message);
        }
    }

    // **Delete files
    async deleteFile(fileId) {
        try {
            await api.delete(`/posts/upload/${fileId}`);
            return true;
        } catch (error) {
            this.notifyer(error?.response?.data?.message || error.message);
        }
    }

    // **Get file preview
    // NOTE: Cloudinary URLs returned by uploadFile() are already full public
    // URLs, so this just passes the URL through. Prefer storing/using the
    // `url` field returned by uploadFile()/uploadProfileImage() directly
    // going forward instead of round-tripping through an ID.
    getFilePreview(fileIdOrUrl) {
        if (typeof fileIdOrUrl === 'string' && fileIdOrUrl.startsWith('http')) {
            return fileIdOrUrl;
        }
        this.notifywar("getFilePreview now expects the full image URL returned by uploadFile().");
        return fileIdOrUrl;
    }

    // **Create a comment on the post with its id
    async createComment({ name, postid, userid, comment }) {
        try {
            const { data } = await api.post('/comments', { postid, comment });
            this.notify("Comment Added successfully!");
            return data;
        } catch (error) {
            this.notifyer(error?.response?.data?.message || error.message);
        }
    }

    // **Get all comments on the post with its id
    async getComments(postid) {
        try {
            const { data } = await api.get(`/comments/${postid}`);
            return data; // { documents: [...], total }
        } catch (error) {
            throw error;
        }
    }

    // **Create a user account document
    // NOTE: signup now creates the user record in one step on the backend,
    // so this is a no-op kept only for compatibility with old call sites.
    async createUser(userid, name, email) {
        return { userid, name, email };
    }

    // **Delete a user account document
    async deleteUser(userid) {
        try {
            const { data } = await api.delete(`/users/${userid}`);
            this.notify("User deleted from database");
            return data;
        } catch (error) {
            this.notifyer(error?.response?.data?.message || error.message);
            throw error;
        }
    }

    // **Get a user account document
    async getUser(userid) {
        try {
            const { data } = await api.get(`/users/${userid}`);
            return data;
        } catch (error) {
            this.notifyer(error?.response?.data?.message || error.message);
        }
    }

    // Update user profile fields
    async updateUserProfile(userid, updateData) {
        try {
            const { data } = await api.put(`/users/${userid}`, updateData);
            return data;
        } catch (error) {
            this.notifyer(`Error updating profile: ${error?.response?.data?.message || error.message}`);
            throw error;
        }
    }

    // Propagate a user's new avatar onto all of their articles
    async updateArticleProfileId(userid, updateData) {
        try {
            const { data } = await api.patch(`/users/${userid}/articles-profile-image`, updateData);
            return data;
        } catch (error) {
            this.notifyer(`Error updating articles: ${error?.response?.data?.message || error.message}`);
            throw error;
        }
    }

    // Store profile picture
    async uploadProfileImage(file, id) {
        try {
            const formData = new FormData();
            formData.append('image', file);
            const { data } = await api.post(`/users/${id}/profile-image`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            this.notify("Profile updated successfully");
            return data; // { $id, url }
        } catch (error) {
            this.notifywar("File upload error please try again after some time.");
        }
    }

    // Get profile picture preview
    getProfilePreview(fileIdOrUrl) {
        return this.getFilePreview(fileIdOrUrl);
    }

    async deleteProfile(fileId) {
        try {
            await api.delete(`/posts/upload/${fileId}`);
            return true;
        } catch (error) {
            this.notifyer(error?.response?.data?.message || error.message);
        }
    }
}

const service = new Service();
export default service;
