import {Component, OnInit} from '@angular/core';
import Auth from "../../../app/models/auth.model";
import {ActivatedRoute, Router} from "@angular/router";
import Character from "../../../app/models/character.interface";
import {Title} from "@angular/platform-browser";
import {IdToDataPipe} from "../../../utils/pipes/id-to-data.pipe";
import {DataService} from "../../../app/services/data.service";
import {CharacterService} from "../../services/character.service";
import {NotificationService} from "../../../app/services/notification.service";
import {BackNavbarService} from "../../../app/services/back-navbar.service";
import {AutosizeModule} from 'ngx-autosize';
import {FormsModule} from '@angular/forms';

let noteTemp: Map<string, string | undefined> = new Map<string, string>();

@Component({
    selector: 'app-notes',
    templateUrl: './notes.component.html',
    styleUrls: ['./notes.component.scss'],
    standalone: true,
    imports: [FormsModule, AutosizeModule]
})
export class NotesComponent implements OnInit {

    character!: Character;
    notes!: string;

    constructor(private auth: Auth, private route: ActivatedRoute, private title: Title,
                private idToData: IdToDataPipe, private dataService: DataService, private router: Router,
                private characterService: CharacterService, private notificationService: NotificationService, private backNavbarService: BackNavbarService) {
    }

    ngOnInit() {
        this.route.paramMap.subscribe(params => {
            const user = this.auth.user!;
            if (params.get('characterId') && user.characters.find((character) => character._id === params.get('characterId'))) {
                this.character = (user.characters.find((character) => character._id === params.get('characterId'))!);
                this.notes = noteTemp.get(this.character._id) || this.character.notes;
                this.title.setTitle(`${this.character.firstName} ${this.idToData.transform(this.character.clan, this.dataService.clans)?.name}, Notes — Fiche de personnage — Ninjadex`);
            } else {
                this.router.navigate(['/personnages']);
            }
        });
    }

    submit() {
        if (this.character.notes !== this.notes) {
            this.characterService.setNotes(this.character._id, this.notes).subscribe((success) => {
                if (success)
                    this.goBack();
                else
                    this.notificationService.showNotification("Erreur", "Impossible de modifier les notes du personnage.");
            });
        }
    }

    goBack() {
        noteTemp.delete(this.character._id);
        this.router.navigate(['/personnages', this.character._id]);
    }

    goToFormatHelp() {
        noteTemp.set(this.character._id, this.notes);
        this.backNavbarService.backUrl = this.router.url;
        this.backNavbarService.text = "Notes"
        this.router.navigate(['/mise-en-forme']);
    }
}