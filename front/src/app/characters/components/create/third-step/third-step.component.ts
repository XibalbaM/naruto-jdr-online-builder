import {Component, OnDestroy, OnInit} from '@angular/core';
import {CreationService} from "../../../services/creation.service";
import {Router} from "@angular/router";
import {DataService} from "../../../../app/services/data.service";
import {NotificationService} from "../../../../app/services/notification.service";
import {IdToDataPipe} from "../../../../utils/pipes/id-to-data.pipe";
import {ReCaptchaV3Service} from "ngx-captcha";
import Environment from "../../../../../environments/environment.interface";
import {LongArrowRightComponent} from '../../../../utils/components/long-arrow-right/long-arrow-right.component';
import {SpacerComponent} from '../../../../utils/components/spacer/spacer.component';
import {CharacterPreviewComponent} from '../character-preview/character-preview.component';
import {LongArrowLeftComponent} from '../../../../utils/components/long-arrow-left/long-arrow-left.component';
import {NgClass, NgFor, NgIf} from '@angular/common';
import {CustomSkill, Skill} from "../../../../app/models/skill.model";

@Component({
    selector: 'app-third-step',
    templateUrl: './third-step.component.html',
    styleUrls: ['./third-step.component.scss'],
    standalone: true,
    imports: [NgIf, LongArrowLeftComponent, CharacterPreviewComponent, SpacerComponent, NgFor, NgClass, LongArrowRightComponent, IdToDataPipe]
})
export class ThirdStepComponent implements OnInit, OnDestroy {
    clanSkillsIds: string[] = this.creationService.character.road
        ? this.idToData.transform(this.creationService.character.road, this.dataService.roads.getValue())?.line.skills || []
        : this.idToData.transform(this.creationService.character.clan, this.dataService.clans.getValue())?.line.skills || [];
    clanSkills: CustomSkill[] = this.dataService.customSkills.getValue().filter(skill => this.clanSkillsIds.includes(skill._id));
    uncommonSkills: CustomSkill[] = this.dataService.customSkills.getValue().filter(skill => skill.type !== 'clan').filter(skill => !this.clanSkillsIds.includes(skill._id));
    skillIds: string[] = this.creationService.tempSkillIds.length > 0 ? this.creationService.tempSkillIds : [...this.clanSkillsIds];

    constructor(protected creationService: CreationService, private router: Router, protected dataService: DataService,
                private notificationService: NotificationService, private idToData: IdToDataPipe, private captchaService: ReCaptchaV3Service,
                private env: Environment) {
    }

    ngOnInit(): void {
        if (this.creationService.step !== 3) {
            this.router.navigate(['/personnages/creation/' + this.creationService.step]);
        }
    }

    ngOnDestroy() {
        this.creationService.tempSkillIds = this.skillIds;
    }

    back() {
        this.router.navigateByUrl("/personnages/creation/" + --this.creationService.step)
    }

    submit() {
        if (this.skillIds.length === 5) {
            this.captchaService.execute(this.env.recaptchaSiteKey, 'character_creation', (token) => {
                this.creationService.stepThree(this.skillIds, token).subscribe(({success, id}) => {
                    if (success) {
                        this.router.navigateByUrl("/personnages/" + id);
                    } else {
                        this.notificationService.showNotification("Erreur", "Une erreur est survenue lors de la création du personnage.");
                    }
                });
            }, {}, () => {
                this.notificationService.showNotification("Erreur", "Une erreur est survenue lors de la validation du captcha. Réessayez dans quelques secondes ou contactez nous !");
            })
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