import { Client, ID, Databases, Storage, Query } from "appwrite";
import conf from '/conf/conf.js'


export class Service {
  client = new Client();
  databases;
  bucket;

  constructor (){
    this.client.setEndpoint(conf.appwriteUrl).setProject(conf.appwriteProjectId);
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  // create document/post
  async createPost({title,slug,content,featuredImage,status,userId}){
    try {
      return await this.databases.createDocument(conf.appwriteDatabaseId,conf.appwriteCollectionId,slug,{
        title,
        content,
        featuredImage,
        status,
        userId
      });

    } catch(error) {
      console.log("App write service :: createPost :: error",error);
    }
    return null;
  }

  // update post with document id as slug
  async updatePost(slug,{title,content,featuredImage,status}){
    try {
      return await this.databases.updateDocument(conf.appwriteDatabaseId,conf.appwriteCollectionId,slug,{
        title,
        content,
        featuredImage,
        status
      });
    } catch(error) {
      console.log("App write service :: updatePost :: error",error);
    }
    return null;
  }
  
  // delete post
  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(conf.appwriteDatabaseId,conf.appwriteCollectionId,slug);
      return true;

    } catch(error) {
      console.log("App write service :: deletePost :: error",error);
      return false;
    }
  }

  // get post
  async getPost(slug){
    try {
      return await this.databases.getDocument(conf.appwriteDatabaseId,conf.appwriteCollectionId,slug);

    } catch(error) {
      console.log("App write service :: getPost :: error",error);
      return false;
    }
  }

  // get all posts which are active
  async getAllPosts(queries = [Query.equal("status","active")]){
    try {
      return await this.databases.listDocuments(conf.appwriteDatabaseId,conf.appwriteCollectionId,queries);
    } catch(error) {
      console.log("App write service :: getAllPosts :: error",error);
      return false;
    }
  }

  // Storage / bucket methods

  // upload file
  async uploadFile(file){
    try {
     return await this.bucket.createFile(conf.appwriteBucketId,ID.unique(),file);
    } catch(error) {
      console.log("App write service :: uploadFile :: error",error);
      return false;
    }
  }

  // delete file
  async deleteFile(fileID){
    try {
      return await this.bucket.deleteFile(conf.appwriteBucketId,fileID);
    } catch(error) {
      console.log("App write service :: deleteFile :: error",error);
    }
  }

  // get filepreview
   getFilePreview(fileId){
    return this.bucket.getFilePreview(conf.appwriteBucketId,fileId);
  }
}

const service = new Service();

export default service;
