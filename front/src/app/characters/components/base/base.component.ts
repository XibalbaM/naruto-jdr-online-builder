import {Component, OnInit} from '@angular/core';
import Base from "../../../app/models/base.model";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import Auth from "../../../app/models/auth.model";
import {DataService} from "../../../app/services/data.service";
import {combineLatest} from "rxjs";
import {Title} from "@angular/platform-browser";
import {IdToDataPipe} from "../../../utils/pipes/id-to-data.pipe";
import {LongArrowLeftComponent} from '../../../utils/components/long-arrow-left/long-arrow-left.component';
import {LongArrowRightComponent} from '../../../utils/components/long-arrow-right/long-arrow-right.component';
import {AsyncPipe, NgIf, TitleCasePipe} from '@angular/common';
import {NgxMarkdownItModule} from 'ngx-markdown-it';
import {SpacerComponent} from '../../../utils/components/spacer/spacer.component';

@Component({
    selector: 'app-base',
    templateUrl: './base.component.html',
    styleUrls: ['./base.component.scss'],
    standalone: true,
    imports: [SpacerComponent, NgxMarkdownItModule, NgIf, RouterLink, LongArrowRightComponent, LongArrowLeftComponent, AsyncPipe, TitleCasePipe, IdToDataPipe]
})
export class BaseComponent implements OnInit {
    base!: Base;
    baseLevel: number = 0;
    previousBase!: string;
    nextBase!: string;

    constructor(private router: Router, private route: ActivatedRoute, private auth: Auth,
                protected dataService: DataService, private title: Title, private idToData: IdToDataPipe) {
    }

    ngOnInit() {
        combineLatest([this.route.paramMap, this.auth.userObservableOnceLoaded()]).subscribe(([params, user]) => {
            if (params.get('id') && params.get('characterId') && user.characters.find((character) => character._id === params.get('characterId')) && this.dataService.bases.getValue().find((base) => base._id === params.get('id'))) {
                const character = (user.characters.find((character) => character._id === params.get('characterId'))!);
                this.base = this.dataService.bases.getValue().find((base) => base._id === params.get('id'))!;
                this.baseLevel = character.bases.find((baseWithLevel) => baseWithLevel.base === this.base._id)?.level || 0;
                const baseIds = character.bases.map((baseWithLevel) => baseWithLevel.base);
                this.previousBase = baseIds[(baseIds.indexOf(this.base._id) - 1) < 0 ? baseIds.length - 1 : (baseIds.indexOf(this.base._id) - 1)];
                this.nextBase = baseIds[(baseIds.indexOf(this.base._id) + 1) % this.dataService.bases.getValue().length];
                this.title.setTitle(`${character.firstName} ${this.idToData.transform(character.clan, this.dataService.clans.getValue())?.name}, Base ${this.base.fullName} — Fiche de personnage — Naruto jdr`);
            } else {
                this.router.navigate(['/personnages']);
            }
        });
    }
}