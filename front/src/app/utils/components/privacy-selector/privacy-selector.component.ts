import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-privacy-selector',
  standalone: true,
    imports: [
        NgClass
    ],
  templateUrl: './privacy-selector.component.html',
  styleUrl: './privacy-selector.component.scss'
})
export class PrivacySelectorComponent {

    @Input() privacy: "private" | "not-referenced" | "public" = "private";
    @Output() privacyChange = new EventEmitter<"private" | "not-referenced" | "public">();

    setPrivacy(privacy: "private" | "not-referenced" | "public") {
        if (privacy === this.privacy) {
            return;
        }
        this.privacy = privacy;
        this.privacyChange.emit(privacy);
    }
}
