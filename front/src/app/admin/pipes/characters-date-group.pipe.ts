import {Pipe, PipeTransform} from '@angular/core';
import User from "../../app/models/user.interface";

type UsersDateGroup = {
    monthYear: string,
    days: {
        day: string,
        users: User[]
    }[]
}[];

@Pipe({
    name: 'usersDateGroup',
    standalone: true
})
export class UsersDateGroupPipe implements PipeTransform {

    transform(characters: User[]): UsersDateGroup {
        let charactersDateGroup: UsersDateGroup = [];
        characters.forEach(character => {
            let date = new Date(character.createdAt);
            let monthYear = date.toLocaleString('fr-FR', {month: 'long', year: 'numeric'});
            let day = date.toLocaleString('fr-FR', {day: 'numeric', weekday: 'long'});

            let monthYearIndex = charactersDateGroup.findIndex(group => group.monthYear === monthYear);
            if (monthYearIndex === -1) {
                charactersDateGroup.push({monthYear, days: [{day, users: [character]}]});
            } else {
                let dayIndex = charactersDateGroup[monthYearIndex].days.findIndex(dayGroup => dayGroup.day === day);
                if (dayIndex === -1) {
                    charactersDateGroup[monthYearIndex].days.push({day, users: [character]});
                } else {
                    charactersDateGroup[monthYearIndex].days[dayIndex].users.push(character);
                }
            }
        });
        return charactersDateGroup;

    }
}