import {effect, Injectable, signal} from "@angular/core";
import {NotificationService} from "../../app/services/notification.service";
import {ApiService} from "../../app/services/api.service";
import User from "../../app/models/user.interface";
import {map, Observable} from "rxjs";
import Base from "naruto-jdr-online-builder-common/src/interfaces/base.interface";
import Skill from "naruto-jdr-online-builder-common/src/interfaces/skill.interface";
import CustomSkill from "../../app/models/skill.interface";

@Injectable({
    providedIn: 'root'
})
export default class AdminService {
    readonlyMode = signal(!localStorage.getItem('editMode') || localStorage.getItem('editMode') === 'true');
    constructor(private notificationService: NotificationService, private apiService: ApiService) {
        effect(() => {
            localStorage.setItem('editMode', String(this.readonlyMode()));
            this.notificationService.showNotification("Mode lecture seule" + (this.readonlyMode() ? " activé" : " désactivé"), "Le mode lecture seule a été " + (this.readonlyMode() ? "activé" : "désactivé") + ".");
        }, {allowSignalWrites: true});
    }

    getAllUsers(): Observable<User[]> {
        return this.apiService.doRequest<{users: User[]}>('GET', '/admin/users').pipe(
            map(response => response.body?.users || [])
        );
    }

    getUser(userId: string): Observable<User | undefined> {
        return this.apiService.doRequest<{user?: User}>('GET', `/admin/users/${userId}`).pipe(
            map(response => response.body?.user)
        );
    }

    sendEmail(userId: string): Observable<boolean> {
        return this.apiService.doRequest<void>('GET', '/admin/users/' + userId + '/email').pipe(
            map(data => data.status === 200)
        );
    }

    disconnectDiscord(userId: string): Observable<boolean> {
        return this.apiService.doRequest<void>('DELETE', '/admin/users/' + userId + '/discord').pipe(
            map(data => data.status === 200)
        );
    }

    deleteUser(userId: string): Observable<boolean> {
        return this.apiService.doRequest<void>('DELETE', `/admin/users/${userId}`).pipe(
            map(data => data.status === 200)
        );
    }

    updateBase(baseId: number, base: Base): Observable<boolean> {
        // @ts-ignore
        delete base._id;
        return this.apiService.doRequest<void>('PUT', `/bases/${baseId}`, {data: base}).pipe(
            map(data => data.status === 200)
        );
    }

    updateCommonSkill(skillId: number, skill: Omit<Skill, "_id">): Observable<boolean> {
        return this.apiService.doRequest<void>('PUT', `/skills/common/${skillId}`, {data: skill}).pipe(
            map(data => data.status === 200)
        );
    }

    updateCustomSkill(skillId: string, skill: Omit<CustomSkill, "_id">): Observable<boolean> {
        return this.apiService.doRequest<void>('PUT', `/skills/custom/${skillId}`, {data: skill}).pipe(
            map(data => data.status === 200)
        );
    }
}