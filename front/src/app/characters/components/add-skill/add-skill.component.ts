import {ChangeDetectionStrategy, Component, computed, effect, Injector, OnInit, signal} from '@angular/core';
import {SpacerComponent} from "../../../utils/components/spacer/spacer.component";
import {CustomSkill} from "../../../app/models/skill.model";
import {NgForOf} from "@angular/common";
import {DataService} from "../../../app/services/data.service";
import {Title} from "@angular/platform-browser";
import {ActivatedRoute, Router} from "@angular/router";
import Character from "../../../app/models/character.model";
import {IdToDataPipe} from "../../../utils/pipes/id-to-data.pipe";
import {combineLatest} from "rxjs";
import Auth from "../../../app/models/auth.model";
import {CharacterToMaxSkillCountPipe} from "../../pipes/character-to-max-skill-count.pipe";
import {CharacterService} from "../../services/character.service";
import {NotificationService} from "../../../app/services/notification.service";

@Component({
    selector: 'app-add-skill',
    standalone: true,
    imports: [
        SpacerComponent,
        NgForOf,
        CharacterToMaxSkillCountPipe
    ],
    templateUrl: './add-skill.component.html',
    styleUrl: './add-skill.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddSkillComponent implements OnInit {

    character = signal(new Character(), {equal: () => false});
    skills = computed(() => this.dataService.customSkills.filter(skill => !this.character().customSkills.find(s => s.skill === skill._id)));
    reamingSkills = computed(() => this.characterToMaxSkillCount.transform(this.character()) - this.character().customSkills.length);
    moreThanOneSkill = computed(() => this.reamingSkills() > 1);

    constructor(private dataService: DataService, private title: Title, private route: ActivatedRoute, private router: Router,
                private idToData: IdToDataPipe, private auth: Auth, private characterToMaxSkillCount: CharacterToMaxSkillCountPipe,
                private injector: Injector, private characterService: CharacterService, private notification: NotificationService) {
        effect(() => {
            this.title.setTitle(`${this.character().firstName} ${this.idToData.transform(this.character().clan, this.dataService.clans)?.name}, Spécialisations de chakra — Fiche de personnage — Ninjadex`);
        });
    }

    ngOnInit() {
        combineLatest([this.route.paramMap, this.auth.userObservableOnceLoaded(this.injector)]).subscribe(([params, user]) => {
            const character = user.characters.find((character) => character._id === params.get('characterId'));
            if (character) {
                this.character.set(character);
                if (this.reamingSkills() > 0) {
                    return
                }
            }
            this.router.navigate(['/personnages']);
        });
    }

    addSkill(skill: CustomSkill) {
        this.characterService.setSkillLevel(this.character()._id, skill._id, 1).subscribe((success) => {
            if (success) {
                this.notification.showNotification("Compétence ajoutée", `La compétence ${skill.name} a bien été ajoutée à ${this.character().firstName}.`);
                if (this.moreThanOneSkill()) {
                    this.character.set(this.auth.user!.characters.find((character) => character._id === this.character()._id)!);
                } else {
                    this.router.navigate(['/personnages', this.character()._id]);
                }
            } else {
                this.notification.showNotification("Erreur lors de l'ajout de la compétence", `Une erreur est survenue lors de l'ajout de la compétence ${skill.name} à ${this.character().firstName}. Réessayez ou, si le problème persiste, contactez nous sur discord.`);
            }
        });
    }
}
