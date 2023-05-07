/**
 * Class representing a user.
 * @class User
 */
export default class User {
  _id!: number;
  email!: string;
  username?: string;
  profileImage?: string;
  isAdmin!: boolean;
  groups: {_id: String, name: String, role: String}[] = [];

  constructor(user: User) {
    Object.assign(this, user);
  }
}
