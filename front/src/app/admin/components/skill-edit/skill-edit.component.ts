import {Component, computed, Injector, signal, WritableSignal} from '@angular/core';
import CustomSkill from "../../../app/models/skill.interface";
import Auth from "../../../app/models/auth.model";
import {ActivatedRoute, Router} from "@angular/router";
import {DataService} from "../../../app/services/data.service";
import {IdToDataPipe} from "../../../utils/pipes/id-to-data.pipe";
import AdminService from "../../services/admin.service";
import Skill from "naruto-jdr-online-builder-common/src/interfaces/skill.interface";
import {SpacerComponent} from "../../../utils/components/spacer/spacer.component";
import {NgForOf, NgIf} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ToggleComponent} from "../../../utils/components/toggle/toggle.component";
import {AutosizeModule} from "ngx-autosize";
import {NotificationService} from "../../../app/services/notification.service";

@Component({
  selector: 'app-skill-edit',
  standalone: true,
    imports: [
        SpacerComponent,
        ReactiveFormsModule,
        FormsModule,
        NgForOf,
        NgIf,
        ToggleComponent,
        AutosizeModule
    ],
  templateUrl: './skill-edit.component.html',
  styleUrl: './skill-edit.component.scss'
})
export class SkillEditComponent {

    isCommon = signal(true);
    skill = signal<Skill | CustomSkill>(this.dataService.commonSkills[0]);
    name = signal('');
    base = signal(0);
    type = signal<"combat" | "terrain" | "clan">("combat");
    villages: WritableSignal<string[]> = signal([]);
    description = signal('');
    isByDefault = computed(() => this.villages().length === 0);
    changed = computed(() => {
        let skill = this.skill();
        return skill.name !== this.name()
            || skill.base !== this.base()
            || ((skill as CustomSkill).villages || []).some(v => !this.villages().includes(v))
            || this.villages().some(v => !((skill as CustomSkill).villages || []).includes(v))
            || skill.description !== this.description()
            || (!this.isCommon() && (skill as CustomSkill).type !== this.type());
    })

    constructor(private auth: Auth, private injector: Injector, private router: Router, protected dataService: DataService,
                private activatedRoute: ActivatedRoute, private idToDataPipe: IdToDataPipe, protected adminService: AdminService,
                private notificationService: NotificationService) {
    }

    ngOnInit() {
        this.auth.userObservableOnceLoaded(this.injector).subscribe((user) => {
            let id = this.activatedRoute.snapshot.paramMap.get('id')!;
            let skill: Skill | CustomSkill | undefined;
            if (id.length < 10) {
                skill = this.dataService.commonSkills[Number(id)];
                this.isCommon.set(true);
            } else {
                skill = this.idToDataPipe.transform(id, this.dataService.customSkills);
                this.isCommon.set(false);
            }
            if (user.isAdmin && skill) {
                this.skill.set(skill);
                this.name.set(skill.name);
                this.base.set(skill.base);
                if (!this.isCommon())
                    this.type.set((skill as CustomSkill).type);
                this.villages.set((skill as CustomSkill).villages || []);
                this.description.set(skill.description);
            } else {
                this.router.navigate(['/']);
            }
        });
    }

    addVillage(village: string) {
        this.villages.update(villages => [...villages, village]);
    }
    removeVillage(village: string) {
        this.villages.update(villages => villages.filter(v => v !== village));
    }

    save() {
        if (this.isCommon()) {
            let skill = {
                name: this.name(),
                base: this.base(),
                villages: this.villages(),
                description: this.description()
            } as Omit<Skill, "_id">
            this.adminService.updateCommonSkill(this.skill()._id as number, skill).subscribe((success) => {
                if (!success) {
                    this.notificationService.showNotification("Erreur",`La compétence ${skill.name} n'a pas pu être modifiée.`);
                } else {
                    this.dataService.datas["skills/common"].update(skills => {
                        return skills.map(s => s._id === this.skill()._id ? {...s, ...skill} : s);
                    })
                    this.notificationService.showNotification("Compétence modifiée", `La compétence ${skill.name} a bien été modifiée.`);
                    this.router.navigate(['/admin/competences']);
                }
            });
        } else {
            let skill = {
                name: this.name(),
                base: this.base(),
                villages: this.villages(),
                description: this.description(),
                type: this.type()
            } as Omit<CustomSkill, "_id">
            this.adminService.updateCustomSkill(this.skill()._id as string, skill).subscribe((success) => {
                if (!success) {
                    this.notificationService.showNotification("Erreur",`La compétence ${skill.name} n'a pas pu être modifiée.`);
                } else {
                    this.dataService.datas["skills/custom"].update(skills => {
                        return skills.map(s => s._id === this.skill()._id ? {...s, ...skill} : s);
                    })
                    this.notificationService.showNotification("Compétence modifiée", `La compétence ${skill.name} a bien été modifiée.`);
                    this.router.navigate(['/admin/competences']);
                }
            });
        }
    }
}
