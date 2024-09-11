import { Client, Databases, Account,ID } from "appwrite";
import conf from '/conf/config.js'

export class AuthService {
  // user/client and their respective accounts
  client = new Client();
  account;

  // account or user is created every time the object is used
  constructor () {
    this.client.setEndpoint(conf.appwriteUrl).setProject(conf.appwriteProjectId);
    this.account = new Account(this.client);
  }

  // sign up
  async signUp ({email,password,name}){
    try {
      const userAccount = await this.account.create(ID.unique(),email,password,name);
      if(userAccount) {
        // if user account is already there then directly login
        this.login(email,password);
      } else {
        // create a account
        return userAccount;
      }

    } catch(error) {
      console.log("App write service :: signUp :: error",error);
      throw error;
    }
  }

  // login
  async login({email,password}){
    try {
      const userAccount = await this.account.createEmailPasswordSession(email,password);
      if (userAccount) {
        return userAccount;
      } else {
        console.log("user not defined");
        return null;
      }
    } catch(error) {
      console.log("App write service :: login :: error",error);
      throw error;
    }
  }

  // check whether user is already logged in and who is that user
  async getCurrentUser() {
    try {
      return await this.account.get(); 
    } catch (error) {
      console.log("App write service :: getCurrentUser :: error",error);
    }
    // if did not get the user
    return null;
  }

  // logout
  async logout() {
    try {
      // delete all sessions from current user in all devices
      // one also can be implemented via deleteSession()
      await this.account.deleteSessions();
    } catch (error) {
      console.log("App write service :: logout :: error",error);
    }
  }
}

const authService = new AuthService();

export default authService