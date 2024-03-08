import {Component, computed, OnInit, signal} from '@angular/core';
import Auth from "../../../app/models/auth.model";
import {PredrawnService} from "../../../app/services/predrawn.service";
import Character from "../../../app/models/character.model";
import {DataService} from "../../../app/services/data.service";
import {IdToDataPipe} from '../../../utils/pipes/id-to-data.pipe';
import {SpacerComponent} from '../../../utils/components/spacer/spacer.component';
import {PredrawnPreviewComponent} from '../predrawn-preview/predrawn-preview.component';
import {NgClass, NgFor, NgOptimizedImage} from '@angular/common';
import {SpacerGraphicalComponent} from '../../../utils/components/spacer-graphical/spacer-graphical.component';
import {RouterLink} from '@angular/router';
import {ModalComponent} from '../../../utils/components/modal/modal.component';
import {BgComponent} from "../../../utils/components/bg/bg.component";
import {FormsModule} from "@angular/forms";

@Component({
    selector: 'app-predrawn',
    templateUrl: './predrawn.component.html',
    styleUrls: ['./predrawn.component.scss'],
    standalone: true,
    imports: [ModalComponent, RouterLink, SpacerGraphicalComponent, NgFor, PredrawnPreviewComponent, SpacerComponent, IdToDataPipe, BgComponent, NgClass, NgOptimizedImage, FormsModule]
})
export class PredrawnComponent implements OnInit {

    predrawns = signal<Character[]>([])
    characters = computed(() => this.predrawns().filter((character) => {
        if (this.currentRank() !== "Tous" && !this.idToDataPipe.transform(character.rank, this.dataService.ranks)!.name.startsWith(this.currentRank())) {
            return false;
        }
        let name = character.firstName + " " + this.idToDataPipe.transform(character.clan, this.dataService.clans)!.name;
        return !(this.search() && !name.toLowerCase().includes(this.search().toLowerCase()));

    }));
    ranks = computed(() => ["Tous", ...new Set(this.dataService.ranks.map((rank) => rank.name.split(",")[0]))]);
    currentRank = signal("Tous");
    search = signal("");

    constructor(protected auth: Auth, protected predrawnService: PredrawnService, protected dataService: DataService,
                private idToDataPipe: IdToDataPipe) {
    }

    ngOnInit() {
        this.predrawnService.getPredrawnCharacters().subscribe((characters) => {
            this.predrawns.set(characters);
        });
    }
}