import {Component, Input} from '@angular/core';
import Character from "../../../app/models/character.model";
import Environment from "../../../../environments/environment.interface";
import {DataService} from "../../../app/services/data.service";
import {IdToDataPipe} from '../../../utils/pipes/id-to-data.pipe';
import {AsyncPipe, NgIf} from '@angular/common';

@Component({
    selector: 'app-predrawn-preview',
    templateUrl: './predrawn-preview.component.html',
    styleUrls: ['./predrawn-preview.component.scss'],
    standalone: true,
    imports: [NgIf, AsyncPipe, IdToDataPipe]
})
export class PredrawnPreviewComponent {

    @Input() character!: Character;

    constructor(protected env: Environment, protected dataService: DataService) {
    }
}