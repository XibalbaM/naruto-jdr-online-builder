import { Pipe, PipeTransform } from '@angular/core';
import User from "../../app/models/user.model";

@Pipe({
  name: 'roles'
})
export class RolesPipe implements PipeTransform {

  /**
   * Transform a user into a list of roles.
   * @param user The user to transform.
   */
  transform(user: User): String[] {

    const roles: string[] = [];

    if (user.groups.find(group => group.role === 'player')) {
      roles.push('Joueur-euse');
    }
    if (user.groups.find(group => group.role === 'sensei')) {
      roles.push('Sensei');
    }
    if (user.isAdmin) {
      roles.push('Admin');
    }
    if (roles.length === 0) {
      roles.push("Aucun rôle");
    }

    return roles;
  }
}
