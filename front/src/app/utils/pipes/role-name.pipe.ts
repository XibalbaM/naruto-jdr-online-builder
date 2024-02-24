import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'roleName',
    standalone: true
})
export class RoleNamePipe implements PipeTransform {

    transform(value: string): string {
        switch (value) {
            case 'admin':
                return 'Admin';
            case 'player':
                return 'Joueur-euse';
            case 'sensei':
                return 'Sensei';
            default:
                return 'Aucun rôle';
        }
    }
}
