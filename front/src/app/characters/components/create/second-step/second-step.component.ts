import {Component, OnDestroy, OnInit} from '@angular/core';
import {CreationService} from "../../../services/creation.service";
import {Router} from "@angular/router";

@Component({
	selector: 'app-second-step',
	templateUrl: './second-step.component.html',
	styleUrls: ['./second-step.component.scss']
})
export class SecondStepComponent implements OnInit, OnDestroy {
	nindo: string = this.creationService.character.nindo || '';
	story: string = this.creationService.character.notes || '';

	constructor(protected creationService: CreationService, private router: Router) {}

	ngOnInit(): void {
		if (this.creationService.step !== 2) {
			this.router.navigate(['/personnages/creation/' + this.creationService.step]);
		}
	}

    ngOnDestroy(): void {
        this.creationService.character.nindo = this.nindo;
        this.creationService.character.notes = this.story;
    }

	back() {
		this.router.navigateByUrl("/personnages/creation/" + --this.creationService.step)
	}

	submit() {
		if (this.nindo) {
			this.creationService.stepTwo(this.nindo, this.story);
			this.router.navigateByUrl('/personnages/creation/' + this.creationService.step);
		}
	}
}