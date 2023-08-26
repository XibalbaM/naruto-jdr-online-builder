import {Component, OnInit} from '@angular/core';
import {CreationService} from "../../../services/creation.service";
import {Router} from "@angular/router";
import {DataService} from "../../../../app/services/data.service";
import Skill from "../../../../app/models/skill.model";
import {NotificationService} from "../../../../app/services/notification.service";
import {IdToDataPipe} from "../../../../shared/pipes/id-to-data.pipe";

@Component({
	selector: 'app-third-step',
	templateUrl: './third-step.component.html',
	styleUrls: ['./third-step.component.scss']
})
export class ThirdStepComponent implements OnInit {
    clanSkills: string[] = !this.creationService.character.road
        ? this.idToData.transform(this.creationService.character.clan, this.dataService.clans.getValue())?.line.skills || []
        : [];
	uncommonSkills: Skill[] = this.dataService.skills.getValue().filter(skill => skill.type !== 'common' && skill.type !== 'clan').filter(skill => !this.clanSkills.includes(skill._id));
	skillIds: string[] = [
        ...(this.creationService.character.skills.map(skill => skill.skill) || []),
        ...this.clanSkills
    ];

	constructor(protected creationService: CreationService, private router: Router, protected dataService: DataService,
                private notificationService: NotificationService, private idToData: IdToDataPipe) {
	}

	ngOnInit(): void {
		if (this.creationService.step !== 3) {
			this.router.navigate(['/personnages/creation/' + this.creationService.step]);
		}
	}

	back() {
		this.router.navigateByUrl("/personnages/creation/" + --this.creationService.step)
	}

	submit() {
		if (this.skillIds.length === 5) {
			this.creationService.stepThree(this.skillIds).subscribe(({success, id}) => {
				if (success) {
					this.router.navigateByUrl("/personnages/" + id);
				} else {
					this.notificationService.showNotification("Erreur", "Une erreur est survenue lors de la création du personnage.");
				}
			});
		}
	}

	addSkill(skill: Skill) {
		if (!this.skillIds.includes(skill._id)) {
			if (5 - this.skillIds.length > 0) {
				this.skillIds.push(skill._id);
			}
		} else {
			this.skillIds = this.skillIds.filter(id => id !== skill._id);
		}
	}
}