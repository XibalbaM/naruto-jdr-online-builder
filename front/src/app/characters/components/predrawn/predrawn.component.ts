import {Component, OnInit} from '@angular/core';
import Auth from "../../../app/models/auth.model";
import {PredrawnService} from "../../../app/services/predrawn.service";
import Character from "../../../app/models/character.model";
import {DataService} from "../../../app/services/data.service";
import {IdToDataPipe} from '../../../utils/pipes/id-to-data.pipe';
import {SpacerComponent} from '../../../utils/components/spacer/spacer.component';
import {PredrawnPreviewComponent} from '../predrawn-preview/predrawn-preview.component';
import {NgFor} from '@angular/common';
import {SpacerGraphicalComponent} from '../../../utils/components/spacer-graphical/spacer-graphical.component';
import {RouterLink} from '@angular/router';
import {ModalComponent} from '../../../utils/components/modal/modal.component';

@Component({
    selector: 'app-predrawn',
    templateUrl: './predrawn.component.html',
    styleUrls: ['./predrawn.component.scss'],
    standalone: true,
    imports: [ModalComponent, RouterLink, SpacerGraphicalComponent, NgFor, PredrawnPreviewComponent, SpacerComponent, IdToDataPipe]
})
export class PredrawnComponent implements OnInit {

    characters?: Character[];
    characterToAdd?: Character;

    constructor(protected auth: Auth, protected predrawnService: PredrawnService, protected dataService: DataService) {
    }

    ngOnInit() {
        this.predrawnService.getPredrawnCharacters().subscribe((characters) => {
            this.characters = characters;
        });
    }

    takePredrawn(character: string) {
        this.predrawnService.takePredrawnCharacter(character);
    }
}