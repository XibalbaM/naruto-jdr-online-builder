import {Component, computed, effect, Injector, signal, WritableSignal} from '@angular/core';
import {ArrowRightComponent} from "../../../utils/components/arrow-right/arrow-right.component";
import {NgForOf, NgOptimizedImage} from "@angular/common";
import Auth from "../../../app/models/auth.model";
import {Router, RouterLink} from "@angular/router";
import AdminService from "../../services/admin.service";
import {DataService} from "../../../app/services/data.service";
import {FormsModule} from "@angular/forms";
import {removeAccents} from "naruto-jdr-online-builder-common/src/utils/text.utils";
import CustomSkill from "../../../app/models/skill.interface";

let filterMem: "Toutes" | "Communes" | "Combat" | "Terrain" | "Clan" = "Toutes";

@Component({
  selector: 'app-skills',
  standalone: true,
    imports: [
        ArrowRightComponent,
        NgForOf,
        RouterLink,
        FormsModule,
        NgOptimizedImage
    ],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.scss'
})
export class SkillsComponent {

    skills = computed(() => [...this.dataService.commonSkills, ...this.dataService.customSkills]);
    filter: WritableSignal<"Toutes" | "Communes" | "Combat" | "Terrain" | "Clan"> = signal(filterMem);
    search = signal<string>('')
    filteredSkills = computed(() =>
        this.skills()
            .filter(skill => this.filter() === "Toutes" || (this.filter() === "Communes" && !skill.hasOwnProperty('type')) || (this.filter() === "Combat" && (skill as CustomSkill).type === "combat") || (this.filter() === "Terrain" && (skill as CustomSkill).type === "terrain") || (this.filter() === "Clan" && (skill as CustomSkill).type === "clan"))
            .filter(skill => removeAccents(skill.name.toLowerCase()).includes(removeAccents(this.search().toLowerCase())))
            .sort((a, b) => a.name.localeCompare(b.name))
    );

    constructor(private auth: Auth, private injector: Injector, private router: Router,
                protected adminService: AdminService, protected dataService: DataService) {
        effect(() => {
            filterMem = this.filter();
        });
    }

    ngOnInit() {
        this.auth.userObservableOnceLoaded(this.injector).subscribe((user) => {
            if (!user.isAdmin) {
                this.router.navigate(['/']);
            }
        });
    }
}
