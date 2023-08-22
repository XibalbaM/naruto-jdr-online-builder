import {Component, OnInit} from '@angular/core';
import Character from "../../../app/models/character.model";
import Skill from "../../../app/models/skill.model";
import {ActivatedRoute, Router} from "@angular/router";
import Auth from "../../../app/models/auth.model";
import {DataService} from "../../../app/services/data.service";
import {combineLatest} from "rxjs";
import Base from "../../../app/models/base.model";
import {CharacterService} from "../../services/character.service";
import {NotificationService} from "../../../app/services/notification.service";

@Component({
  selector: 'app-skill',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.scss']
})
export class SkillComponent implements OnInit {
    skill!: Skill;
    skillLevel: number = 0;
    base!: Base;
    baseLevel: number = 0;
    character!: Character;

    constructor(private router: Router, private route: ActivatedRoute, private auth: Auth, protected dataService: DataService,
                private characterService: CharacterService, private notificationService: NotificationService) {
    }

    ngOnInit() {
        combineLatest([this.route.paramMap, this.auth.userObservableOnceLoaded()]).subscribe(([params, user]) => {
            if (params.get('id') && params.get('characterId') && user.characters.find((character) => character._id === params.get('characterId')) && this.dataService.skills.getValue().find((base) => base._id === params.get('id'))) {
                this.character = (user.characters.find((character) => character._id === params.get('characterId'))!);
                this.skill = this.dataService.skills.getValue().find((skill) => skill._id === params.get('id'))!;
                this.base = this.dataService.bases.getValue().find((base) => base._id === this.skill.base)!;
                this.skillLevel = this.character.skills.find((skillWithLevel) => skillWithLevel.skill === this.skill._id)?.level || 0;
                this.baseLevel = this.character.bases.find((baseWithLevel) => baseWithLevel.base === this.base._id)?.level || 0;
            } else {
                this.router.navigate(['/personnages']);
            }
        });
    }

    remove() {
        if (this.skill.type !== 'common') {
            this.characterService.removeSkill(this.skill._id, this.character._id).subscribe((success) => {
                if (success)
                    this.router.navigate(['/personnages', this.auth.user!.characters[0]._id]);
                else
                    this.notificationService.showNotification('Erreur', 'Une erreur est survenue lors de la suppression de la compétence. Réessayez plus tard.')
            });
        }
    }
}