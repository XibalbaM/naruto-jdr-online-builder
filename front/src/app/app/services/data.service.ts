import {Injectable} from '@angular/core';
import {ApiService} from "./api.service";
import Village from "../models/village.model";
import {HttpHeaders} from "@angular/common/http";
import Base from "../models/base.model";
import Clan from "../models/clan.model";
import Road from "../models/road.model";
import Skill from "../models/skill.model";
import {BehaviorSubject} from "rxjs";
import Rank from "../models/rank.model";
import ChakraSpe from "../models/chakra-spe.model";

@Injectable({
    providedIn: 'root'
})
export class DataService {

    /**
     * The list of all datas to keep up to date with the API
     * Using a list of BehaviorSubject to be able to subscribe to the data and to do a foreach on it
     */
    datas = {
        villages: new BehaviorSubject<Village[]>([]),
        bases: new BehaviorSubject<Base[]>([]),
        clans: new BehaviorSubject<Clan[]>([]),
        roads: new BehaviorSubject<Road[]>([]),
        skills: new BehaviorSubject<Skill[]>([]),
        ranks: new BehaviorSubject<Rank[]>([]),
        chakraSpes: new BehaviorSubject<ChakraSpe[]>([]),
    }

    constructor(private apiService: ApiService) {
    }

    /**
     * Initialize the data service by getting all the data from the API and then updating it every 2 hours
     */
    init(): void {
        this.addData();
        setInterval(this.addData, 1000 * 60 * 60 * 2);
    }

    /**
     * Call {@link fetchData} for each dataId in {@link datas}
     */
    addData() {
        for (const dataId in this.datas) {
            this.fetchData(dataId as keyof typeof DataService.prototype.datas);
        }
    }

    /**
     * Call the API to get the data and update the local storage
     *
     * If the data is already in the local storage, it will send the etag to the API to check if the data has changed
     *
     * If the data has changed, it will update the local storage and send the new data to the BehaviorSubject
     *
     * If the data hasn't changed, it will send the data from the local storage to the BehaviorSubject
     * @param dataId
     */
    fetchData(dataId: keyof typeof DataService.prototype.datas) {
        const headers = new HttpHeaders();
        const currentDatas = localStorage.getItem(dataId);
        if (currentDatas && JSON.parse(currentDatas).etag && JSON.parse(currentDatas).data) {
            headers.set('If-None-Match', JSON.parse(currentDatas).etag);
        }
        this.apiService.doRequest<any[]>('get', '/' + dataId, undefined, false, headers).subscribe((response) => {
            if (response.status === 304) {
                this.datas[dataId].next(JSON.parse(currentDatas!).data);
            } else if (response.status === 200 && response.headers.get('Etag') && response.body) {
                const data = (response.body).sort((a, b) => (a.name ?? a._id).localeCompare((b.name ?? b._id)));
                const storedData = {
                    etag: response.headers.get('Etag')!,
                    data: data
                }
                localStorage.setItem(dataId, JSON.stringify(storedData));
                this.datas[dataId].next(data);
            } else {
                console.error('Error while getting data from API : ', response.body);
                localStorage.removeItem(dataId);
            }
        });
    }

    get villages(): BehaviorSubject<Village[]> {
        return this.datas.villages;
    }

    get bases(): BehaviorSubject<Base[]> {
        return this.datas.bases;
    }

    get clans(): BehaviorSubject<Clan[]> {
        return this.datas.clans;
    }

    get roads(): BehaviorSubject<Road[]> {
        return this.datas.roads;
    }

    get skills(): BehaviorSubject<Skill[]> {
        return this.datas.skills;
    }

    get ranks(): BehaviorSubject<Rank[]> {
        return this.datas.ranks;
    }

    get chakraSpes(): BehaviorSubject<ChakraSpe[]> {
        return this.datas.chakraSpes;
    }
}
