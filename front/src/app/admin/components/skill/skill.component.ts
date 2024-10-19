import {Component, computed, Injector, signal} from '@angular/core';
import {AutosizeModule} from "ngx-autosize";
import {FormsModule} from "@angular/forms";
import CustomSkill from "../../../app/models/skill.interface";
import Skill from "naruto-jdr-online-builder-common/src/interfaces/skill.interface";
import {DataService} from "../../../app/services/data.service";
import Auth from "../../../app/models/auth.model";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {IdToDataPipe} from "../../../utils/pipes/id-to-data.pipe";
import {SpacerComponent} from "../../../utils/components/spacer/spacer.component";
import {DatePipe} from "@angular/common";
import {SkillToTypeNamePipe} from "../../../characters/pipes/skill-type-to-type-name.pipe";
import AdminService from "../../services/admin.service";
import {SkillVillageListToStringPipe} from "../../pipes/skill-village-list-to-string.pipe";

@Component({
  selector: 'app-skill',
  standalone: true,
    imports: [
        AutosizeModule,
        FormsModule,
        SpacerComponent,
        DatePipe,
        SkillToTypeNamePipe,
        RouterLink,
        SkillVillageListToStringPipe
    ],
  templateUrl: './skill.component.html',
  styleUrl: './skill.component.scss'
})
export class SkillComponent {

    skill = signal<Skill | CustomSkill>(this.dataService.commonSkills[0]);
    base = computed(() => this.dataService.bases[this.skill().base]);

    constructor(private auth: Auth, private injector: Injector, private router: Router, private dataService: DataService,
                private activatedRoute: ActivatedRoute, private idToDataPipe: IdToDataPipe, protected adminService: AdminService) {
    }

    ngOnInit() {
        this.auth.userObservableOnceLoaded(this.injector).subscribe((user) => {
            let id = this.activatedRoute.snapshot.paramMap.get('id')!;
            let skill: Skill | CustomSkill | undefined;
            if (id.length < 10) {
                skill = this.dataService.commonSkills[Number(id)];
            } else {
                skill = this.idToDataPipe.transform(id, this.dataService.customSkills);
            }
            if (user.isAdmin && skill) {
                this.skill.set(skill);
            } else {
                this.router.navigate(['/']);
            }
        });
    }
}
