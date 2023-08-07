export interface IUser {
    uid?: string;
    email: string;
    name: string;
    favoriteDriver: string;
    favoriteConstructor: string;
    favoriteCircuit: string;
    emailVerified?: boolean;
    profilePictureUrl?:string,
 
    // Add more properties as needed
  }
  