import {Component, OnInit} from "@angular/core";
import {BehaviorSubject, Subscription, timer} from "rxjs";
import {NotificationService} from "../../services/notification.service";
import {animate, style, transition, trigger} from "@angular/animations";

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
})
export class NotificationComponent implements OnInit {
    $notification!: BehaviorSubject<{ title: string, content: string } | undefined>;
    private timeout?: Subscription;

    constructor(private notificationService: NotificationService) {
    }

    ngOnInit() {
        this.$notification = this.notificationService.$notification;
        this.$notification.subscribe((value) => {
            if (value) {
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
