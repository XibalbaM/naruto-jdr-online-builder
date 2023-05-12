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
  groups: {_id: string, name: string, role: string}[] = [];

  constructor(user: User) {
    Object.assign(this, user);
  }
}
