import {Component, computed, Injector, OnInit, signal, WritableSignal} from '@angular/core';
import {zip} from "rxjs";
import Auth from "../../../app/models/auth.model";
import {Router, RouterLink} from "@angular/router";
import AdminService from "../../services/admin.service";
import {FormsModule} from "@angular/forms";
import {NgForOf, NgOptimizedImage} from "@angular/common";
import {BgComponent} from "../../../utils/components/bg/bg.component";
import {ArrowRightComponent} from "../../../utils/components/arrow-right/arrow-right.component";
import {SpacerComponent} from "../../../utils/components/spacer/spacer.component";
import Character from "../../../app/models/character.interface";
import {fullName} from "naruto-jdr-online-builder-common/src/utils/character.utils";
import {removeAccents} from "naruto-jdr-online-builder-common/src/utils/text.utils";
import {DataService} from "../../../app/services/data.service";
import {CharacterPreviewComponent} from "../../../characters/components/create/character-preview/character-preview.component";
import {CharacterListPreviewComponent} from "../../../characters/components/character-list-preview/character-list-preview.component";

@Component({
  selector: 'app-add-predrawn',
  standalone: true,
    imports: [
        FormsModule,
        NgForOf,
        NgOptimizedImage,
        BgComponent,
        RouterLink,
        ArrowRightComponent,
        SpacerComponent,
        CharacterPreviewComponent,
        CharacterListPreviewComponent
    ],
  templateUrl: './add-predrawn.component.html',
  styleUrl: './add-predrawn.component.scss'
})
export class AddPredrawnComponent implements OnInit {

    filter: WritableSignal<"-"> = signal("-");

    characters = signal<Character[]>([])
    search = signal<string>('')
    filteredCharacters = computed(() =>
        this.characters().filter(character => removeAccents(fullName(character, this.dataService.clans)).toLowerCase().includes(this.search().toLowerCase())).filter(user => {
            //TODO
            return true;
        })
    )

    constructor(private auth: Auth, private injector: Injector, private router: Router,
                protected adminService: AdminService, private dataService: DataService) {
    }

    ngOnInit() {
        zip(this.auth.userObservableOnceLoaded(this.injector), this.adminService.getAllCharacters()).subscribe(([user, characters]) => {
            if (user.isAdmin) {
                this.characters.set(characters.filter(character => character.shareStatus !== "predrawn"));
            } else {
                this.router.navigate(['/']);
            }
        });
    }
}