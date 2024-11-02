import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
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
export class PrivacySelectorComponent implements OnInit {
    shareStatuses = [
        {name: 'Public', value: 'public', description: 'Tous les utilisateurs peuvent voir ce personnage.'},
        {name: 'Non référencé', value: 'not-referenced', description: 'Seuls les utilisateurs ayant le lien peuvent voir ce personnage.'},
        {name: 'Privé', value: 'private', description: 'Seul le propriétaire du personnage peut le voir.'},
        {name: 'Prétiré', value: 'predrawn', description: 'Ce personnage est un prétiré.'}
    ]

    @Input() privacy: "private" | "not-referenced" | "public" | "predrawn" = "private";
    disabled = this.privacy === "predrawn";
    @Output() privacyChange = new EventEmitter<"private" | "not-referenced" | "public">();

    ngOnInit() {
        this.disabled = this.privacy === "predrawn";
    }

    setPrivacy(privacy: "private" | "not-referenced" | "public") {
        if (privacy === this.privacy) {
            return;
        }
        this.privacy = privacy;
        this.privacyChange.emit(privacy);
    }

    shareStatusDescription() {
        return this.shareStatuses.find((status) => status.value === this.privacy)?.description;
    }
}
