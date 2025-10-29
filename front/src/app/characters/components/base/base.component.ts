import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {DataService} from "../../../app/services/data.service";
import {Title} from "@angular/platform-browser";
import {IdToDataPipe} from "../../../utils/pipes/id-to-data.pipe";
import {LongArrowLeftComponent} from '../../../utils/components/long-arrow-left/long-arrow-left.component';
import {LongArrowRightComponent} from '../../../utils/components/long-arrow-right/long-arrow-right.component';
import {NgIf, TitleCasePipe} from '@angular/common';
import {SpacerComponent} from '../../../utils/components/spacer/spacer.component';
import Base from "naruto-jdr-online-builder-common/src/interfaces/base.interface";
import {MarkdownComponent} from "../../../utils/components/markdown/markdown.component";
import Character from "../../../app/models/character.interface";
import {Observable} from "rxjs";
import {CharacterService} from "../../services/character.service";
import {fullName} from "naruto-jdr-online-builder-common/src/utils/character.utils";

@Component({
    selector: 'app-base',
    templateUrl: './base.component.html',
    styleUrls: ['./base.component.scss'],
    standalone: true,
    imports: [SpacerComponent, NgIf, RouterLink, LongArrowRightComponent, LongArrowLeftComponent, TitleCasePipe, IdToDataPipe, MarkdownComponent]
})
export class BaseComponent implements OnInit {
    base!: Base;
    baseLevel: number = 0;
    previousBase!: number;
    nextBase!: number;

    constructor(private router: Router, private route: ActivatedRoute, protected dataService: DataService,
                private title: Title, private idToData: IdToDataPipe, private characterService: CharacterService) {
    }

    ngOnInit() {
        this.route.paramMap.subscribe(params => {
            if (!params.get('id') || !params.get('characterId') || !this.dataService.bases.find((base) => base._id === Number(params.get('id')))) {
                this.router.navigate(['/personnages']);
                return;
            }
            let baseId = Number(params.get('id'));
            let {character, editable} = this.characterService.resolveCharacter(params.get('characterId')!);
            if (editable) {
                this.setup(character as Character, baseId);
            } else {
                (character as Observable<Character>).subscribe((character) => {
                    if (character) {
                        this.setup(character, baseId);
                    } else {
                        this.router.navigate(['/personnages']);
                    }
                });
            }
        });
    }

    setup(character: Character, baseId: number) {
        this.base = this.dataService.bases.find((base) => base._id === baseId)!;
        this.baseLevel = character.bases[this.base._id] || 0;
        this.previousBase = this.base._id === 0 ? character.bases.length - 1 : this.base._id - 1;
        this.nextBase = this.base._id === character.bases.length - 1 ? 0 : this.base._id + 1;
        this.title.setTitle(`${fullName(character, this.dataService.clans)}, Base ${this.base.fullName} — Fiche de personnage — Ninjadex`);
    }
}