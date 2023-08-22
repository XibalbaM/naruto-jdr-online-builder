import {AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import Character from "../../../app/models/character.model";
import {ActivatedRoute, Router} from "@angular/router";
import Auth from "../../../app/models/auth.model";
import {DataService} from "../../../app/services/data.service";
import Skill from "../../../app/models/skill.model";
import {IdToDataPipe} from "../../../shared/pipes/id-to-data.pipe";
import ChakraSpe from "../../../app/models/chakra-spe.model";
import Environment from "../../../../environments/environment.interface";
import {BehaviorSubject, combineLatest} from "rxjs";
import {CharacterService} from "../../services/character.service";
import {NotificationService} from "../../../app/services/notification.service";
import Base from "../../../app/models/base.model";

@Component({
    selector: 'app-edit',
    templateUrl: './edit.component.html',
    styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit, AfterViewInit {

    $character: BehaviorSubject<Character> = new BehaviorSubject<Character>(new Character());
    commonSkills: { skill: Skill, level: number }[] = [];
    uncommonSkills: { skill: Skill, level: number }[] = [];
    chakraSpes: { chakraSpe: ChakraSpe, level: number }[] = [];
    shouldTruncNotes: boolean = false;
    notes!: string;

    constructor(private activeRoute: ActivatedRoute, protected router: Router, protected auth: Auth,
                protected dataService: DataService, private idToData: IdToDataPipe, private changeDetectorRef: ChangeDetectorRef,
                protected env: Environment, private characterService: CharacterService, private notificationService: NotificationService) {
    }

    ngOnInit() {
        combineLatest([this.activeRoute.paramMap, this.auth.userObservableOnceLoaded()]).subscribe(([params, user]) => {
            if (params.get('characterId') && user?.characters.find((character: Character) => character._id === params.get('characterId'))) {
                this.$character.subscribe((character) => {
                    const skills = character.skills.filter(skill => skill.level > 0).map((data: { skill: string, level: number }) => {
                        return {
                            skill: this.idToData.transform(data.skill, this.dataService.skills.value)!,
                            level: data.level
                        }
                    });
                    this.commonSkills = skills.filter((data: { skill: Skill, level: number }) => data.skill.type === 'common');
                    this.uncommonSkills = skills.filter((data: { skill: Skill, level: number }) => data.skill.type !== 'common');
                    this.chakraSpes = character.chakraSpes.filter(chakraSpe => chakraSpe.level > 0).map((data: { spe: string, level: number }) => {
                        return {
                            chakraSpe: this.idToData.transform(data.spe, this.dataService.chakraSpes.value)!,
                            level: data.level
                        }
                    });
                });
                this.$character.next(user?.characters.find((character: Character) => character._id === params.get('characterId'))!);
                this.notes = this.$character.value.notes.replaceAll("\n", "<br />");
            } else {
                this.router.navigate(['/personnages']);
            }
        });
    }

    ngAfterViewInit() {
        const notes = document.getElementById('notes')!;
        const lineHeight = parseInt(window.getComputedStyle(notes).lineHeight);
        const maxHeight = lineHeight * 8;
        this.shouldTruncNotes = notes.scrollHeight > maxHeight;
        this.changeDetectorRef.detectChanges();
    }

    increaseBaseLevel(base: Base, currentLevel: number) {
        if (currentLevel < this.idToData.transform(this.$character.getValue().rank, this.dataService.ranks.value)!.maxBase) {
            this.setBaseLevel(base, currentLevel + 1);
        }
    }

    decreaseBaseLevel(base: Base, currentLevel: number) {
        if (this.canBaseLevelReduced({base, level: currentLevel})) {
            this.setBaseLevel(base, currentLevel - 1);
        }
    }

    setSkillLevel(skill: Skill, level: number) {
        if (level <= 0 || level > this.$character.getValue().bases.find((base) => base.base === skill.base)!.level + 2) {
            return;
        }
        this.characterService.setSkillLevel(this.$character.getValue()._id, skill._id, level).subscribe((success) => {
            if (success) {
                const character = this.$character.getValue();
                character.skills.find((data) => data.skill === skill._id)!.level = level;
                this.$character.next(character);
            } else
                this.notificationService.showNotification('Une erreur est survenue', 'Une erreur est survenue lors de la modification du niveau de la compétence, si le problème persiste, contactez nous');
        });
    }

    setBaseLevel(base: Base, level: number) {
        this.characterService.setBaseLevel(this.$character.getValue()._id, base._id, level).subscribe((success) => {
            if (success) {
                const character = this.$character.getValue();
                character.bases.find((data) => data.base === base._id)!.level = level;
                this.$character.next(character);
            } else
                this.notificationService.showNotification('Une erreur est survenue', 'Une erreur est survenue lors de la modification du niveau de la base, si le problème persiste, contactez nous');
        });
    }

    setNindoPoints(nindo: number) {
        if (nindo < 0) {
            return;
        }
        this.characterService.setNindoPoints(this.$character.getValue()._id, nindo).subscribe((success) => {
            if (success) {
                const character = this.$character.getValue();
                character.nindoPoints = nindo;
                this.$character.next(character);
            } else
                this.notificationService.showNotification('Une erreur est survenue', 'Une erreur est survenue lors de la modification du nombre de points de nindo, si le problème persiste, contactez nous');
        });
    }

    getBaseLevelBySkill(skill: Skill) {
        return this.$character.getValue().bases.find((base) => base.base === skill.base)!.level;
    }

    canBaseLevelReduced(data: {base: Base, level: number}): boolean {
        if (data.level <= 1) {
            return false;
        }
        const character = this.$character.getValue();
        const skill = character.skills
            .filter(skill => skill.level > 0)
            .map((skill: { skill: string, level: number }) => {
                return {
                    skill: this.idToData.transform(skill.skill, this.dataService.skills.value)!,
                    level: skill.level
                }
            })
            .filter((skill: { skill: Skill, level: number }) => skill.skill.base === data.base._id)
            .map((skill: { skill: Skill, level: number }) => skill.level)
            .sort((a, b) => b - a)[0];
        return data.level > skill - 2;
    }

    protected readonly Math = Math;

    changeSpe() {
        const character = this.$character.getValue();
        character.chakraSpes[0].level += 1;
        this.$character.next(character);
    }
}