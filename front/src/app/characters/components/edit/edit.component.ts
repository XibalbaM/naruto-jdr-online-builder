import {AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, computed, effect, OnInit, signal} from '@angular/core';
import Character from "../../../app/models/character.model";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import Auth from "../../../app/models/auth.model";
import {DataService} from "../../../app/services/data.service";
import {IdToDataPipe} from "../../../utils/pipes/id-to-data.pipe";
import Environment from "../../../../environments/environment.interface";
import {combineLatest, every, merge, Observable, take, tap} from "rxjs";
import {CharacterService} from "../../services/character.service";
import {NotificationService} from "../../../app/services/notification.service";
import Base from "../../../app/models/base.model";
import {Title} from "@angular/platform-browser";
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
import {CharacterToReamingXpPipe} from '../../../utils/pipes/character-to-reaming-xp.pipe';
import {SkillItemComponent} from '../skill-item/skill-item.component';
import {BgComponent} from '../../../utils/components/bg/bg.component';
import {PlusSymbolComponent} from '../../../utils/components/plus-symbol/plus-symbol.component';
import {MinusSymbolComponent} from '../../../utils/components/minus-symbol/minus-symbol.component';
import {SpacerComponent} from '../../../utils/components/spacer/spacer.component';
import {SpacerGraphicalComponent} from '../../../utils/components/spacer-graphical/spacer-graphical.component';
import {ArrowRightComponent} from '../../../utils/components/arrow-right/arrow-right.component';
import {AsyncPipe, JsonPipe, NgClass, NgFor, NgIf} from '@angular/common';
import {CustomSkill, Skill} from "../../../app/models/skill.model";
import {NgxMarkdownItModule} from "ngx-markdown-it";

@Component({
    selector: 'app-edit',
    templateUrl: './edit.component.html',
    styleUrls: ['./edit.component.scss'],
    standalone: true,
    imports: [NgIf, NgxMarkdownItModule, RouterLink, ArrowRightComponent, NgClass, SpacerGraphicalComponent, NgFor, SpacerComponent, MinusSymbolComponent, PlusSymbolComponent, BgComponent, SkillItemComponent, AsyncPipe, IdToDataPipe, CharacterToReamingXpPipe, CharacterToMaxSkillCountPipe, CharacterToMaxChakraPipe, CharacterToMaxChakraSpesPipe, CharacterToChakraControlPipe, CharacterToBaseLevelPipe, CharacterToChakraSpeAmountPipe, CharacterToChakraRegenPipe, CharacterToSkillNaturalLevelPipe, CharacterToSkillTotalLevelPipe, CharacterToInterceptionsPipe, CharacterToSkillReinforcementPipe, JsonPipe],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditComponent implements OnInit, AfterViewInit {

    character = signal(new Character(), {equal: () => false});
    commonSkills = computed(() =>
        this.character().commonSkills.map((level, id) => ({skill: this.idToData.transform(id, this.dataService.commonSkills.getValue())!, level}))
    );
    uncommonSkills = computed(() =>
        this.character().customSkills.map(skill => ({skill: this.idToData.transform(skill.skill, this.dataService.customSkills.getValue())!, level: skill.level}))
    );
    bases = computed(() =>
        this.dataService.bases.getValue().map((base) => ({base, level: this.character().bases[base._id]}))
    );
    shouldTruncNotes = signal(false);
    notes = computed(() => this.character().notes || "Pas encore de notes.");
    chakraSpes = computed(() => {
        let map = this.character().chakraSpes.reduce((acc: { [key: string]: number }, spe) => {
            acc[spe] = (acc[spe] || 0) + 1;
            return acc;
        }, {});
        return Object.entries(map).map(([chakraSpe, number]) => ({chakraSpe: this.idToData.transform(chakraSpe, this.dataService.chakraSpes.getValue())!, number}));
    });
    protected readonly Math = Math;

    constructor(private activeRoute: ActivatedRoute, protected router: Router, protected auth: Auth,
                protected dataService: DataService, private idToData: IdToDataPipe, private changeDetectorRef: ChangeDetectorRef,
                protected env: Environment, private characterService: CharacterService, private notificationService: NotificationService,
                private title: Title) {
        effect(() => {
            this.title.setTitle(`${this.character().firstName} ${this.idToData.transform(this.character().clan, this.dataService.clans.getValue())?.name}, Fiche de personnage — Naruto jdr`)
        });
    }

    ngAfterViewInit() {
        const notes = document.getElementById('notes')!;
        const lineHeight = parseInt(window.getComputedStyle(notes).lineHeight);
        const maxHeight = lineHeight * 8;
        this.shouldTruncNotes.set(notes.scrollHeight > maxHeight);
        this.changeDetectorRef.detectChanges();
    }

    increaseBaseLevel(base: Base, currentLevel: number) {
        if (currentLevel < this.idToData.transform(this.character().rank, this.dataService.ranks.value)!.maxBase) {
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
        const commonSkillsToDecrease = this.character().commonSkills
            .filter(level => level > 1)
            .map((level, id) => ({skill: this.idToData.transform(id, this.dataService.commonSkills.value)!, level}))
            .filter((skill: { skill: Skill, level: number }) => skill.skill.base === data.base._id)
            .filter((skill: { skill: Skill, level: number }) => skill.level >= data.level + 2);
        const customSkillsToDecrease = this.character().customSkills
            .filter(skill => skill.level > 1)
            .map((skill: { skill: string, level: number }) => ({skill: this.idToData.transform(skill.skill, this.dataService.customSkills.value)!, level: skill.level}))
            .filter((skill: { skill: Skill, level: number }) => skill.skill.base === data.base._id)
            .filter((skill: { skill: Skill, level: number }) => skill.level >= data.level + 2);
        const requests = merge(...[...commonSkillsToDecrease, ...customSkillsToDecrease].map((skill) => {
            return this.characterService.setSkillLevel(this.character()._id, skill.skill._id, skill.level - 1);
        }))
        return requests.pipe(
            every((success: boolean) => success),
            tap((success) => {
                if (success && (customSkillsToDecrease.length > 0 || commonSkillsToDecrease.length > 0)) {
                    this.character.update(character => {
                        commonSkillsToDecrease.forEach((skill) => {
                            character.commonSkills[Number(skill.skill._id)] = skill.level - 1;
                        });
                        customSkillsToDecrease.forEach((skill) => {
                            character.customSkills.find((data) => data.skill === skill.skill._id)!.level = skill.level - 1;
                        });
                        return character;
                    });
                }
            })
        );
    }

    setSkillLevel(skill: Skill, level: number) {
        if (level <= 0 || level > this.character().bases[skill.base] + 2) {
            return;
        }
        this.characterService.setSkillLevel(this.character()._id, skill._id, level).subscribe((success) => {
            if (success) {
                this.character.update(character => {
                    if (skill instanceof CustomSkill)
                        character.customSkills.find((data) => data.skill === skill._id)!.level = level;
                    else
                        character.commonSkills[Number(skill._id)] = level;
                    return character;
                });
            } else
                this.notificationService.showNotification('Une erreur est survenue', 'Une erreur est survenue lors de la modification du niveau de la compétence, si le problème persiste, contactez nous');
        });
    }

    setBaseLevel(base: Base, level: number) {
        this.characterService.setBaseLevel(this.character()._id, base._id, level).subscribe((success) => {
            if (success) {
                this.character.update(character => {
                    character.bases[base._id] = level;
                    return character;
                })
                this.auth.user!.characters.find((character) => character._id === character._id)!.bases = this.character().bases;
                this.auth.userObservable().next(this.auth.user);
            } else
                this.notificationService.showNotification('Une erreur est survenue', 'Une erreur est survenue lors de la modification du niveau de la base, si le problème persiste, contactez nous');
        });
    }

    setNindoPoints(nindo: number) {
        if (nindo < 0) {
            return;
        }
        this.characterService.setNindoPoints(this.character()._id, nindo).subscribe((success) => {
            if (success) {
                this.character.update(character => {character.nindoPoints = nindo; return character;});
            } else
                this.notificationService.showNotification('Une erreur est survenue', 'Une erreur est survenue lors de la modification du nombre de points de nindo, si le problème persiste, contactez nous');
        });
    }

    getBaseLevelBySkill(skill: Skill) {
        return this.bases().find((base) => base.base._id === skill.base)!.level;
    }

    canBaseLevelReduced(data: { base: Base, level: number }): boolean {
        return data.level > 1;
    }

    ngOnInit() {
        combineLatest([this.activeRoute.paramMap, this.auth.userObservableOnceLoaded()]).pipe(take(1)).subscribe(([params, user]) => {
            if (params.get('characterId') && user?.characters.find((character: Character) => character._id === params.get('characterId'))) {
                this.character.set(user?.characters.find((character: Character) => character._id === params.get('characterId'))!);
            } else {
                this.router.navigate(['/personnages']);
            }
        });
    }
}