import {Component, OnInit} from '@angular/core';
import Character from "../../../app/models/character.interface";
import {ActivatedRoute, Router} from "@angular/router";
import Auth from "../../../app/models/auth.model";
import {DataService} from "../../../app/services/data.service";
import {combineLatest} from "rxjs";
import {CharacterService} from "../../services/character.service";
import {NotificationService} from "../../../app/services/notification.service";
import {Title} from "@angular/platform-browser";
import {IdToDataPipe} from "../../../utils/pipes/id-to-data.pipe";
import {SkillToTypeNamePipe} from '../../pipes/skill-type-to-type-name.pipe';
import {NgIf} from '@angular/common';
import {SpacerComponent} from '../../../utils/components/spacer/spacer.component';
import CustomSkill from "../../../app/models/skill.interface";
import Base from "naruto-jdr-online-builder-common/src/interfaces/base.interface";
import Skill from "naruto-jdr-online-builder-common/src/interfaces/skill.interface";
import {MarkdownComponent} from "../../../utils/components/markdown/markdown.component";

@Component({
    selector: 'app-skill',
    templateUrl: './skill.component.html',
    styleUrls: ['./skill.component.scss'],
    standalone: true,
    imports: [SpacerComponent, NgIf, SkillToTypeNamePipe, MarkdownComponent]
})
export class SkillComponent implements OnInit {
    isCommon!: boolean;
    skill!: Skill | CustomSkill;
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
            this.isCommon = routeData['skillType'] === 'common';
            const skills = this.isCommon ? this.dataService.commonSkills : this.dataService.customSkills;
            if (params.get('id') && params.get('characterId') && user.characters.find((character) => character._id === params.get('characterId')) && skills.find((skill) => skill._id == params.get('id'))) {
                this.character = (user.characters.find((character) => character._id === params.get('characterId'))!);
                this.skill = skills.find((skill) => skill._id == params.get('id'))!;
                this.base = this.dataService.bases.find((base) => base._id === this.skill.base)!;
                if (this.isCommon) {
                    this.skillLevel = this.character.commonSkills[Number(this.skill._id)] || 0;
                } else {
                    this.skillLevel = this.character.customSkills.find((skillWithLevel) => skillWithLevel.skill === this.skill._id)?.level || 0;
                }
                this.baseLevel = this.character.bases[this.base._id] || 0;
                this.title.setTitle(`${this.character.firstName} ${this.idToData.transform(this.character.clan, this.dataService.clans)?.name}, Compétence ${this.skill.name} — Fiche de personnage — Ninjadex`);
            } else {
                this.router.navigate(['/personnages']);
            }
        });
    }

    remove() {
        if (this.isSkillRemovable(this.skill)) {
            this.characterService.removeSkill(this.skill._id, this.character._id).subscribe((success) => {
                if (success)
                    this.router.navigate(['/personnages', this.character._id]);
                else
                    this.notificationService.showNotification('Erreur', 'Une erreur est survenue lors de la suppression de la compétence. Réessayez plus tard.')
            });
        }
    }

    isSkillRemovable(skill: Skill | CustomSkill): skill is CustomSkill {
        return !this.isCommon && (this.skill as CustomSkill).type !== "clan";
    }
}