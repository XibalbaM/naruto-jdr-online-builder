import {Component, Input} from '@angular/core';
import Character from "../../../../app/models/character.interface";
import Environment from "../../../../../environments/environment.interface";
import {DataService} from "../../../../app/services/data.service";
import {IdToDataPipe} from '../../../../utils/pipes/id-to-data.pipe';
import {SpacerGraphicalComponent} from '../../../../utils/components/spacer-graphical/spacer-graphical.component';
import {NgIf, NgOptimizedImage} from '@angular/common';
import {ImageFallbackDirective} from "../../../../utils/directives/image-fallback.directive";

@Component({
    selector: 'app-character-preview',
    templateUrl: './character-preview.component.html',
    styleUrls: ['./character-preview.component.scss'],
    standalone: true,
    imports: [NgIf, SpacerGraphicalComponent, IdToDataPipe, NgOptimizedImage, ImageFallbackDirective]
})
export class CharacterPreviewComponent {

    @Input() character!: Partial<Character>;

    constructor(protected env: Environment, protected dataService: DataService) {
    }
}
