const conf = {
    appwriteUrl: String(import.meta.env.VITE_APPWRITE_URL),
    appwriteProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appwriteDatabaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appwriteCollectionId_1: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID_1),
    appwriteCollectionId_2: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID_2),
    appwriteCollectionId_3: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID_3),
    appwriteBucketId: String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
    appwriteBucketId_Profile: String(import.meta.env.VITE_APPWRITE_BUCKET_ID_PROFILE),
}


export default conf