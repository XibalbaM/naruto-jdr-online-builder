import {Component, computed, OnInit, signal} from '@angular/core';
import {ArrowRightComponent} from "../../../utils/components/arrow-right/arrow-right.component";
import {NgForOf} from "@angular/common";
import {RouterLink} from "@angular/router";
import {SpacerComponent} from "../../../utils/components/spacer/spacer.component";
import {SharedCharacter} from "../../../app/models/character.interface";
import {PredrawnService} from "../../../app/services/predrawn.service";
import {CharacterListPreviewComponent} from "../../../characters/components/character-list-preview/character-list-preview.component";

@Component({
  selector: 'app-predrawns',
  standalone: true,
    imports: [
        ArrowRightComponent,
        NgForOf,
        RouterLink,
        SpacerComponent,
        CharacterListPreviewComponent
    ],
  templateUrl: './predrawns.component.html',
  styleUrl: './predrawns.component.scss'
})
export class PredrawnsComponent implements OnInit {

    predrawns = signal<SharedCharacter[]>([]);
    predrawnsCount = computed(() => this.predrawns().length);

    constructor(private predrawnService: PredrawnService) { }

    ngOnInit() {
        this.predrawnService.getPredrawnCharacters().subscribe((predrawns) => {
            this.predrawns.set(predrawns);
        })
    }
}
