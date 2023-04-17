import userModel from "../models/user.model.js";

/**
 * Get the username from the email
 *
 * Get the user from the database and return its username if it exists, else return "Ninja Sans Nom"
 * @param email The email of the user
 * @returns The username of the user
 */
export async function getUserNameFromEmail(email: string): Promise<string> {
  const user = await userModel.findOne({email: email});
  if (user && user.username) return user.username;
  else return "Ninja Sans Nom";
}