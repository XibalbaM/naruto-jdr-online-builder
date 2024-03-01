import {Pipe, PipeTransform} from '@angular/core';
import User from "../../app/models/user.model";
import {RoleNamePipe} from "./role-name.pipe";

@Pipe({
    name: 'roles',
    standalone: true,
    pure: false
})
export class RolesPipe implements PipeTransform {

    constructor(private roleNamePipe: RoleNamePipe) {
    }

    /**
     * Transform a user into a list of roles.
     * @param user The user to transform.
     */
    transform(user: User): String[] {

        const roles: string[] = [];

        if (user.groups.find(group => group.role === 'player')) {
            roles.push(this.roleNamePipe.transform('player'));
        }
        if (user.groups.find(group => group.role === 'sensei')) {
            roles.push(this.roleNamePipe.transform('sensei'));
        }
        if (user.isAdmin) {
            roles.push(this.roleNamePipe.transform('admin'));
        }
        if (roles.length === 0) {
            roles.push(this.roleNamePipe.transform('none'));
        }

        return roles;
    }
}
