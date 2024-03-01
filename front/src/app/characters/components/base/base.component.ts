import {Component, inject, Injector, OnInit} from '@angular/core';
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
import {SpacerComponent} from '../../../utils/components/spacer/spacer.component';
import {NgxMarkdownItModule} from "ngx-markdown-it";

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
    previousBase!: number;
    nextBase!: number;

    constructor(private router: Router, private route: ActivatedRoute, private auth: Auth,
                protected dataService: DataService, private title: Title, private idToData: IdToDataPipe) {
    }

    ngOnInit() {
        combineLatest([this.route.paramMap, this.auth.userObservableOnceLoaded(inject(Injector))]).subscribe(([params, user]) => {
            if (params.get('id') && params.get('characterId') && user.characters.find((character) => character._id === params.get('characterId')) && this.dataService.bases.find((base) => base._id === Number(params.get('id')))) {
                const character = (user.characters.find((character) => character._id === params.get('characterId'))!);
                this.base = this.dataService.bases.find((base) => base._id === Number(params.get('id')))!;
                this.baseLevel = character.bases[this.base._id] || 0;
                this.previousBase = this.base._id === 0 ? character.bases.length - 1 : this.base._id - 1;
                this.nextBase = this.base._id === character.bases.length - 1 ? 0 : this.base._id + 1;
                this.title.setTitle(`${character.firstName} ${this.idToData.transform(character.clan, this.dataService.clans)?.name}, Base ${this.base.fullName} — Fiche de personnage — Naruto jdr`);
            } else {
                this.router.navigate(['/personnages']);
            }
        });
    }
}