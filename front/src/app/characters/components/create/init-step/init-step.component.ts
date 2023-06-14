import {Component, OnInit} from '@angular/core';
import {CreationService} from "../../../services/creation.service";
import {Route, Router} from "@angular/router";

@Component({
  selector: 'app-init-step',
  templateUrl: './init-step.component.html',
  styleUrls: ['./init-step.component.scss']
})
export class InitStepComponent implements OnInit {

  oldStep = this.creationService.beginCreation();
  creating = !!this.oldStep;

  constructor(private creationService: CreationService, private router: Router) { }

  ngOnInit() {
    if (!this.creating) {
      this.router.navigate(['/personnages/creation/1']);
    }
  }

  forceCreation() {
    this.creationService.beginCreation(true);
    this.router.navigate(['/personnages/creation/1']);
  }

  resumeCreation() {
    this.router.navigate(['/personnages/creation/' + this.oldStep]);
  }
}
