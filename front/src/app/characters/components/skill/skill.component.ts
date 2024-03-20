import {Component, Injector, OnInit} from '@angular/core';
import Character from "../../../app/models/character.model";
import {ActivatedRoute, Router} from "@angular/router";
import Auth from "../../../app/models/auth.model";
import {DataService} from "../../../app/services/data.service";
import {combineLatest} from "rxjs";
import Base from "../../../app/models/base.model";
import {CharacterService} from "../../services/character.service";
import {NotificationService} from "../../../app/services/notification.service";
import {Title} from "@angular/platform-browser";
import {IdToDataPipe} from "../../../utils/pipes/id-to-data.pipe";
import {SkillToTypeNamePipe} from '../../pipes/skill-type-to-type-name.pipe';
import {NgIf} from '@angular/common';
import {SpacerComponent} from '../../../utils/components/spacer/spacer.component';
import {CustomSkill, Skill} from "../../../app/models/skill.model";
import {NgxMarkdownItModule} from "ngx-markdown-it";

@Component({
    selector: 'app-skill',
    templateUrl: './skill.component.html',
    styleUrls: ['./skill.component.scss'],
    standalone: true,
    imports: [SpacerComponent, NgxMarkdownItModule, NgIf, SkillToTypeNamePipe]
})
export class SkillComponent implements OnInit {
    skill!: Skill;
    isSkillRemovable!: boolean;
    skillLevel: number = 0;
    base!: Base;
    baseLevel: number = 0;
    character!: Character;

    constructor(private router: Router, private route: ActivatedRoute, private auth: Auth, protected dataService: DataService,
                private characterService: CharacterService, private notificationService: NotificationService, private title: Title,
                private idToData: IdToDataPipe) {
    }

    ngOnInit() {

        const user = this.auth.user!;
        combineLatest([this.route.paramMap, this.route.data]).subscribe(([params, routeData]) => {
            const isCommon = routeData['skillType'] === 'common';
            const skills = isCommon ? this.dataService.commonSkills : this.dataService.customSkills;
            if (params.get('id') && params.get('characterId') && user.characters.find((character) => character._id === params.get('characterId')) && skills.find((base) => base._id === params.get('id'))) {
                this.character = (user.characters.find((character) => character._id === params.get('characterId'))!);
                this.skill = skills.find((skill) => skill._id === params.get('id'))!;
                this.isSkillRemovable = !isCommon && (this.skill as CustomSkill).type !== "clan";
                this.base = this.dataService.bases.find((base) => base._id === this.skill.base)!;
                if (isCommon) {
                    this.skillLevel = this.character.commonSkills[Number(this.skill._id)] || 0;
                } else {
                    this.skillLevel = this.character.customSkills.find((skillWithLevel) => skillWithLevel.skill === this.skill._id)?.level || 0;
                }
                this.baseLevel = this.character.bases[this.base._id] || 0;
                this.title.setTitle(`${this.character.firstName} ${this.idToData.transform(this.character.clan, this.dataService.clans)?.name}, Compétence ${this.skill.name} — Fiche de personnage — Naruto jdr`);
            } else {
                this.router.navigate(['/personnages']);
            }
        });
    }

    remove() {
        if (this.isSkillRemovable) {
            this.characterService.removeSkill(this.skill._id, this.character._id).subscribe((success) => {
                if (success)
                    this.router.navigate(['/personnages', this.auth.user!.characters[0]._id]);
                else
                    this.notificationService.showNotification('Erreur', 'Une erreur est survenue lors de la suppression de la compétence. Réessayez plus tard.')
            });
        }
    }
}