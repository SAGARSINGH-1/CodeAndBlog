// Post / user / comment service — Express API (path kept for existing imports)
import toast from 'react-hot-toast';
import api from '../lib/api.js';

export class Service {
  notify = (message) => toast.success(message);
  notifyer = (message) => toast.error(message);

  async createPost({ title, slug, content, featuredImage, featuredImageUrl, status }) {
    try {
      const { data } = await api.post('/posts', {
        title,
        slug,
        content,
        featuredImage: featuredImage || null,
        featuredImageUrl: featuredImageUrl || null,
        status: status || 'active',
      });
      this.notify('Post created successfully!');
      return data;
    } catch (error) {
      this.notifyer(error?.response?.data?.message || error.message);
      throw error;
    }
  }

  async updatePost(slug, { title, content, featuredImage, featuredImageUrl, status }) {
    try {
      const { data } = await api.put(`/posts/${slug}`, {
        title,
        content,
        featuredImage,
        featuredImageUrl,
        status,
      });
      this.notify('Post updated successfully!');
      return data;
    } catch (error) {
      this.notifyer(error?.response?.data?.message || error.message);
      throw error;
    }
  }

  async deletePost(slug) {
    try {
      const { data } = await api.delete(`/posts/${slug}`);
      this.notify('Post deleted successfully!');
      return data;
    } catch (error) {
      this.notifyer(error?.response?.data?.message || error.message);
      throw error;
    }
  }

  async getPost(slug) {
    const { data } = await api.get(`/posts/${slug}`);
    return data;
  }

  /** @param {{ status?: string, userid?: string }} filters */
  async getPosts(filters = { status: 'active' }) {
    const { data } = await api.get('/posts', { params: filters });
    return data; // { documents, total }
  }

  async uploadFile(file) {
    try {
      const formData = new FormData();
      formData.append('image', file);
      const { data } = await api.post('/posts/upload', formData);
      return data; // { $id, url } from Cloudinary upload response shape
    } catch (error) {
      this.notifyer(error?.response?.data?.message || error.message || 'Image upload failed');
      throw error;
    }
  }

  async deleteFile(fileId) {
    if (!fileId) return true;
    try {
      const encoded = String(fileId).split('/').map(encodeURIComponent).join('/');
      await api.delete(`/posts/upload/${encoded}`);
      return true;
    } catch (error) {
      this.notifyer(error?.response?.data?.message || error.message);
      return false;
    }
  }

  /** Prefer full Cloudinary URL; pass-through otherwise */
  getFilePreview(fileIdOrUrl) {
    if (!fileIdOrUrl) return null;
    return fileIdOrUrl;
  }

  async createComment({ postid, comment }) {
    try {
      const { data } = await api.post('/comments', { postid, comment });
      this.notify('Comment added successfully!');
      return data;
    } catch (error) {
      this.notifyer(error?.response?.data?.message || error.message);
      throw error;
    }
  }

  async getComments(postid) {
    const { data } = await api.get(`/comments/${postid}`);
    return data;
  }

  async deleteUser(userid) {
    try {
      const { data } = await api.delete(`/users/${userid}`);
      this.notify('User deleted');
      return data;
    } catch (error) {
      this.notifyer(error?.response?.data?.message || error.message);
      throw error;
    }
  }

  async getUser(userid) {
    if (!userid) return null;
    try {
      const { data } = await api.get(`/users/${userid}`);
      return data;
    } catch (error) {
      console.warn('getUser failed:', error?.response?.data?.message || error.message);
      return null;
    }
  }

  async updateUserProfile(userid, updateData) {
    try {
      const { data } = await api.put(`/users/${userid}`, updateData);
      return data;
    } catch (error) {
      this.notifyer(error?.response?.data?.message || error.message);
      throw error;
    }
  }

  async updateArticleProfileId(userid, updateData) {
    try {
      const { data } = await api.patch(`/users/${userid}/articles-profile-image`, updateData);
      return data;
    } catch (error) {
      this.notifyer(error?.response?.data?.message || error.message);
      throw error;
    }
  }

  async uploadProfileImage(file, id) {
    try {
      const formData = new FormData();
      formData.append('image', file);
      const { data } = await api.post(`/users/${id}/profile-image`, formData);
      this.notify('Profile updated successfully');
      return data;
    } catch (error) {
      this.notifyer(error?.response?.data?.message || 'Profile image upload failed');
      throw error;
    }
  }

  getProfilePreview(fileIdOrUrl) {
    return this.getFilePreview(fileIdOrUrl);
  }

  async deleteProfile(fileId) {
    return this.deleteFile(fileId);
  }
}

const service = new Service();
export default service;
