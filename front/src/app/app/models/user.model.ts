/**
 * Class representing a user.
 * @class User
 */
export default class User {
  id!: number;
  email!: string;
  username?: string;
  profileImage: string = 'assets/images/default-pp.svg';

  constructor(user: User) {
    Object.assign(this, user);
  }
}
