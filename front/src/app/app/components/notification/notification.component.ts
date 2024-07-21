import {Component, effect} from "@angular/core";
import {Subscription, timer} from "rxjs";
import {NotificationService} from "../../services/notification.service";
import {animate, style, transition, trigger} from "@angular/animations";
import {AsyncPipe, NgIf, NgOptimizedImage} from "@angular/common";

@Component({
    selector: "app-notification",
    templateUrl: "./notification.component.html",
    styleUrls: ["./notification.component.scss"],
    animations: [
        trigger("appear", [
            transition("void => *", [
                style({
                    transform: "translateY(-100%)",
                    opacity: 0,
                }),
                animate("300ms ease-in-out", style({
                    transform: "translateY(0)",
                    opacity: 1,
                })),
            ]),
            transition("* => void", [
                style({
                    transform: "translateY(0)",
                    opacity: 1,
                }),
                animate("300ms ease-in-out", style({
                    transform: "translateY(-100%)",
                    opacity: 0,
                })),
            ]),
        ]),
    ],
    standalone: true,
    imports: [NgIf, AsyncPipe, NgOptimizedImage],
})
export class NotificationComponent {
    private timeout?: Subscription;
    notification = this.notificationService.notification;

    constructor(private notificationService: NotificationService) {
        effect(() => {
            if (this.notification()) {
                if (this.timeout) {
                    this.timeout.unsubscribe();
                }
                this.timeout = timer(15000).subscribe(() => this.notificationService.hideNotification());
            } else {
                if (this.timeout) {
                    this.timeout.unsubscribe();
                }
            }
        });
    }

    close() {
        this.notificationService.hideNotification();
    }
}
