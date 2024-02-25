import {Component, inject} from '@angular/core';
import {CreationService} from "../../services/creation.service";
import {Location, NgFor} from "@angular/common";
import {Router} from "@angular/router";
import {SpacerComponent} from '../../../utils/components/spacer/spacer.component';

@Component({
    selector: 'app-nindo-exemples',
    templateUrl: './nindo-exemples.component.html',
    styleUrls: ['./nindo-exemples.component.scss'],
    standalone: true,
    imports: [SpacerComponent, NgFor]
})
export class NindoExemplesComponent {

    exemples = [
        {
            title: 'Autorité',
            description: "L’ordre et la loi sont un devoir dans ce monde si instable."
        },
        {
            title: 'Coeur sans limite',
            description: "Personne dans le besoin ne sera laissé pour compte."
        },
        {
            title: 'Désir brûlant',
            description: "Pourquoi vivre si on ne peut pas faire des choses intéressantes ?"
        },
        {
            title: 'Doctrine',
            description: "Vivre pour le code, mourir pour le code."
        },
        {
            title: 'Évolution',
            description: "S'adapter, plutôt que rester prisonnier du passé."
        },
        {
            title: 'Harmonie',
            description: "Paix et frugalité, c’est la devise du sage."
        },
        {
            title: 'Héroïsme',
            description: "Le courage fleurit en bravant l’inconnu."
        },
        {
            title: 'Indomptable',
            description: "Un cœur pur ne connaît ni peur ni défaite."
        },
        {
            title: 'Konoha',
            description: "Le village nous protège, nous le protégeons à notre tour."
        },
        {
            title: 'L’ordre du monde',
            description: "La logique et l’efficacité, au-dessus de tout."
        },
        {
            title: 'Marionnette',
            description: "Vivre et mourir pour une personne."
        },
        {
            title: 'Promesse',
            description: "Envers moi-même ou d’autres, rien n’arrêtera sa réalisation."
        },
        {
            title: 'Puissance',
            description: "Seuls les puissants sont maîtres de leur destinée."
        },
        {
            title: 'Révolution',
            description: "Réduire en cendres le statu quo et changer le monde."
        },
        {
            title: 'Sur la lame d’un kunaï',
            description: "Entre la lumière et les ténèbres, se trouve la vérité."
        },
        {
            title: 'Trésor génétique',
            description: "Les traditions et la génétique séculaire du clan sont inestimables."
        },
        {
            title: 'Voie du sacrifice',
            description: "Obéir aux ordres même si le chemin est celui du carnage."
        },
        {
            title: 'Volonté du feu',
            description: "La vie est précieuse et nous devons l’aider à grandir."
        }
    ];
    backUrl = inject(Location).path().split('/').slice(0, -1).join('/')

    constructor(protected creationService: CreationService, protected router: Router) {
    }
}