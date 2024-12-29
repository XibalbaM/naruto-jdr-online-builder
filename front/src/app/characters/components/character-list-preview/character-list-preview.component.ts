import {Component, Input, OnInit} from '@angular/core';
import Character, {SharedCharacter} from "../../../app/models/character.interface";
import Environment from "../../../../environments/environment.interface";
import {DataService} from "../../../app/services/data.service";
import {CharacterToReamingXpPipe} from '../../../utils/pipes/character-to-reaming-xp.pipe';
import {IdToDataPipe} from '../../../utils/pipes/id-to-data.pipe';
import {RouterLink} from '@angular/router';
import {NgClass, NgIf, NgOptimizedImage} from '@angular/common';
import {ImageFallbackDirective} from "../../../utils/directives/image-fallback.directive";

@Component({
    selector: 'app-character-list-preview',
    templateUrl: './character-list-preview.component.html',
    styleUrls: ['./character-list-preview.component.scss'],
    standalone: true,
    imports: [NgIf, RouterLink, NgClass, IdToDataPipe, CharacterToReamingXpPipe, NgOptimizedImage, ImageFallbackDirective]
})
export class CharacterListPreviewComponent implements OnInit {

    @Input() character!: Character | SharedCharacter;
    @Input() link?: string = undefined;
    isPredrawnRender = false;
    predrawnCharacter = this.character as SharedCharacter;
    protected readonly Math = Math;

    constructor(protected env: Environment, protected dataService: DataService) {
    }

    ngOnInit() {
        this.isPredrawnRender = !!(this.character as SharedCharacter).owner;
        this.predrawnCharacter = this.character as SharedCharacter;
    }
}
