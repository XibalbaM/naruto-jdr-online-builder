import {Injectable, signal} from '@angular/core';
import {ApiService} from "./api.service";
import Village from "../models/village.interface";
import {HttpHeaders} from "@angular/common/http";
import Clan from "../models/clan.interface";
import Road from "../models/road.interface";
import Rank from "../models/rank.interface";
import ChakraSpe from "../models/chakra-spe.interface";
import CustomSkill from "../models/skill.interface";
import Base from "common/src/interfaces/base.interface";
import Skill from "common/src/interfaces/skill.interface";

@Injectable({
    providedIn: 'root'
})
export class DataService {

    /**
     * The list of all datas to keep up to date with the API
     * Using a list of Signals to be able to subscribe to the data and to do a foreach on it
     */
    datas = {
        villages: signal<Village[]>([]),
        bases: signal<Base[]>([]),
        clans: signal<Clan[]>([]),
        roads: signal<Road[]>([]),
        "skills/common": signal<Skill[]>([]),
        "skills/custom": signal<CustomSkill[]>([]),
        ranks: signal<Rank[]>([]),
        chakraSpes: signal<ChakraSpe[]>([]),
    }

    constructor(private apiService: ApiService) {
    }

    get villages(): Village[] {
        return this.datas.villages();
    }

    get bases(): Base[] {
        return this.datas.bases();
    }

    get clans(): Clan[] {
        return this.datas.clans();
    }

    get roads(): Road[] {
        return this.datas.roads();
    }

    get commonSkills(): Skill[] {
        return this.datas["skills/common"]();
    }

    get customSkills(): CustomSkill[] {
        return this.datas["skills/custom"]();
    }

    get ranks(): Rank[] {
        return this.datas.ranks();
    }

    get chakraSpes(): ChakraSpe[] {
        return this.datas.chakraSpes();
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
     * If the data has changed, it will update the local storage and send the new data to the Signal
     *
     * If the data hasn't changed, it will send the data from the local storage to the Signal
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
                this.datas[dataId].set(JSON.parse(currentDatas!).data);
            } else if (response.status === 200 && response.headers.get('Etag') && response.body) {
                const data = (response.body).sort((a, b) => {
                    if (dataId in ['chakraSpes', 'clan', 'road', 'skill/common', 'skill/custom', 'village']) {
                        return a.name.localeCompare(b.name);
                    } else {
                        if (typeof a._id === 'string') {
                            return a._id.localeCompare(b._id);
                        } else {
                            return a._id - b._id;
                        }
                    }
                });
                const storedData = {
                    etag: response.headers.get('Etag')!,
                    data: data
                }
                localStorage.setItem(dataId, JSON.stringify(storedData));
                this.datas[dataId].set(data);
            } else {
                console.error('Error while getting data from API : ', response.body);
                localStorage.removeItem(dataId);
            }
        });
    }
}
