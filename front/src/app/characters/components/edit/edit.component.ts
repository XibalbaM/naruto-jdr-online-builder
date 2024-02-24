import {AfterViewInit, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import Character from "../../../app/models/character.model";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import Auth from "../../../app/models/auth.model";
import {DataService} from "../../../app/services/data.service";
import Skill from "../../../app/models/skill.model";
import {IdToDataPipe} from "../../../shared/pipes/id-to-data.pipe";
import Environment from "../../../../environments/environment.interface";
import {BehaviorSubject, combineLatest, every, merge, Observable, take} from "rxjs";
import {CharacterService} from "../../services/character.service";
import {NotificationService} from "../../../app/services/notification.service";
import Base from "../../../app/models/base.model";
import {Title} from "@angular/platform-browser";
import ChakraSpe from "../../../app/models/chakra-spe.model";
import {CharacterToSkillReinforcementPipe} from '../../pipes/character-to-skill-reinforcement.pipe';
import {CharacterToInterceptionsPipe} from '../../pipes/character-to-interceptions.pipe';
import {CharacterToSkillTotalLevelPipe} from '../../pipes/character-to-skill-total-level.pipe';
import {CharacterToSkillNaturalLevelPipe} from '../../pipes/character-to-skill-natural-level.pipe';
import {CharacterToChakraRegenPipe} from '../../pipes/character-to-chakra-regen.pipe';
import {CharacterToChakraSpeAmountPipe} from '../../pipes/character-to-chakra-spe-amount.pipe';
import {CharacterToBaseLevelPipe} from '../../pipes/character-to-base-level.pipe';
import {CharacterToChakraControlPipe} from '../../pipes/character-to-chakra-control.pipe';
import {CharacterToMaxChakraSpesPipe} from '../../pipes/character-to-max-chakra-spes.pipe';
import {CharacterToMaxChakraPipe} from '../../pipes/character-to-max-chakra.pipe';
import {CharacterToMaxSkillCountPipe} from '../../pipes/character-to-max-skill-count.pipe';
import {CharacterToReamingXpPipe} from '../../../shared/pipes/character-to-reaming-xp.pipe';
import {NgxMarkdownItModule} from 'ngx-markdown-it';
import {SkillItemComponent} from '../skill-item/skill-item.component';
import {BgComponent} from '../../../shared/components/bg/bg.component';
import {PlusSymbolComponent} from '../../../shared/components/plus-symbol/plus-symbol.component';
import {MinusSymbolComponent} from '../../../shared/components/minus-symbol/minus-symbol.component';
import {SpacerComponent} from '../../../shared/components/spacer/spacer.component';
import {SpacerGraphicalComponent} from '../../../shared/components/spacer-graphical/spacer-graphical.component';
import {ArrowRightComponent} from '../../../shared/components/arrow-right/arrow-right.component';
import {AsyncPipe, NgClass, NgFor, NgIf} from '@angular/common';

@Component({
    selector: 'app-edit',
    templateUrl: './edit.component.html',
    styleUrls: ['./edit.component.scss'],
    standalone: true,
    imports: [NgIf, RouterLink, ArrowRightComponent, NgClass, SpacerGraphicalComponent, NgFor, SpacerComponent, MinusSymbolComponent, PlusSymbolComponent, BgComponent, SkillItemComponent, NgxMarkdownItModule, AsyncPipe, IdToDataPipe, CharacterToReamingXpPipe, CharacterToMaxSkillCountPipe, CharacterToMaxChakraPipe, CharacterToMaxChakraSpesPipe, CharacterToChakraControlPipe, CharacterToBaseLevelPipe, CharacterToChakraSpeAmountPipe, CharacterToChakraRegenPipe, CharacterToSkillNaturalLevelPipe, CharacterToSkillTotalLevelPipe, CharacterToInterceptionsPipe, CharacterToSkillReinforcementPipe]
})
export class EditComponent implements OnInit, AfterViewInit {

    $character: BehaviorSubject<Character> = new BehaviorSubject<Character>(new Character());
    commonSkills: { skill: Skill, level: number }[] = [];
    uncommonSkills: { skill: Skill, level: number }[] = [];
    shouldTruncNotes: boolean = false;
    notes!: string;
    characterChakraSpes: { chakraSpe: ChakraSpe, number: number }[] = [];
    protected readonly name = name;
    protected readonly Math = Math;

    constructor(private activeRoute: ActivatedRoute, protected router: Router, protected auth: Auth,
                protected dataService: DataService, private idToData: IdToDataPipe, private changeDetectorRef: ChangeDetectorRef,
                protected env: Environment, private characterService: CharacterService, private notificationService: NotificationService,
                private title: Title) {
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
            this.decreaseSkillLevelsIfNeeded({base, level: currentLevel}).subscribe((success) => {
                if (success)
                    this.setBaseLevel(base, currentLevel - 1);
                else
                    this.notificationService.showNotification('Une erreur est survenue', 'Une erreur est survenue lors de la modification du niveau de la base, si le problème persiste, contactez nous');
            });
        }
    }

    decreaseSkillLevelsIfNeeded(data: { base: Base, level: number }): Observable<boolean> {
        const character = this.$character.getValue();
        const skillsToDecrease = character.skills
            .filter(skill => skill.level > 0)
            .map((skill: { skill: string, level: number }) => {
                return {
                    skill: this.idToData.transform(skill.skill, this.dataService.skills.value)!,
                    level: skill.level
                }
            })
            .filter((skill: { skill: Skill, level: number }) => skill.skill.base === data.base._id)
            .filter((skill: { skill: Skill, level: number }) => skill.level >= data.level + 2);
        const requests = merge(...skillsToDecrease.map((skill: { skill: Skill, level: number }) => {
            return this.characterService.setSkillLevel(character._id, skill.skill._id, skill.level - 1);
        }))
        return requests.pipe(
            every((success: boolean) => success)
        );
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

    canBaseLevelReduced(data: { base: Base, level: number }): boolean {
        return data.level > 1;
    }

    ngOnInit() {
        combineLatest([this.activeRoute.paramMap, this.auth.userObservableOnceLoaded()]).pipe(take(1)).subscribe(([params, user]) => {
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
                });
                this.$character.next(user?.characters.find((character: Character) => character._id === params.get('characterId'))!);
                this.notes = this.$character.value.notes || "Pas encore de notes.";
                this.$character.getValue().chakraSpes.forEach((chakraSpe) => {
                    const chakraSpeData = this.characterChakraSpes.slice().sort((a, b) => b.number - a.number).find(spe => spe.chakraSpe._id === chakraSpe);
                    if (chakraSpeData) {
                        this.characterChakraSpes.push({chakraSpe: chakraSpeData.chakraSpe, number: chakraSpeData.number + 1});
                    } else {
                        this.characterChakraSpes.push({chakraSpe: this.idToData.transform(chakraSpe, this.dataService.chakraSpes.value)!, number: 1});
                    }
                });
                this.title.setTitle(`${this.$character.getValue().firstName} ${this.idToData.transform(this.$character.getValue().clan, this.dataService.clans.getValue())?.name}, Fiche de personnage — Naruto jdr`)
            } else {
                this.router.navigate(['/personnages']);
            }
        });
    }
}