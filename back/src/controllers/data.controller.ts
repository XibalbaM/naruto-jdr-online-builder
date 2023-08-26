import {Model} from "mongoose";
import crypto from 'crypto';
import {Request, Response} from "express";

import DataService from "../services/data.service.js";

export default class DataController {
    private dataService: DataService;

    constructor(model: Model<any>, modelToClass: (model: any) => any) {
        this.dataService = new DataService(model, modelToClass);
    }

    /**
     * Generate an ETag for a given data, used by client to check if data has changed
     * @param data Data to generate ETag from
     * @private
     */
    private getETag(data: any) {
        const hash = crypto.createHash('sha256');
        hash.update(JSON.stringify(data));
        return hash.digest('hex');
    }

    /**
     * If client passed an If-None-Match header, check if data has changed and send 304 if not
     *
     * Otherwise, send data with ETag
     *
     * Send cache-control header to tell client to cache data for 1 hour
     * @param req The request
     * @param res The response
     * @param data The data to send
     * @private
     */
    private sendDataOr304(req: Request, res: Response, data: any) {
        const ifNoneMatch = req.header("If-None-Match");
        res.set('Cache-Control', `public, max-age=${60 * 60}`);
        if (ifNoneMatch) {
            const etag = this.getETag(data);
            if (etag === ifNoneMatch) {
                return res.status(304).json({message: "Not modified"});
            }
        }
        res.set("ETag", this.getETag(data));
        res.status(200).json(data);
    }

    getAll = (req: Request, res: Response) => {
        this.dataService.getAll().then((data) => this.sendDataOr304(req, res, data)).catch((err) => res.status(500).json({error: "Internal server error"}));
    }

    get = (req: Request, res: Response) => {
        this.dataService.get(req.params.id).then((data) => {
            if (data) this.sendDataOr304(req, res, data);
            else res.status(404).json({error: "Not found"});
        }).catch((err) => {
            res.status(500).json({error: "Internal server error"});
        });
    }

    create = (req: Request, res: Response) => {
        this.dataService.create(req.body.data).then((data) => res.status(201).json(data)).catch((err) => res.status(500).json({error: "Internal server error"}));
    }

    update = (req: Request, res: Response) => {
        this.dataService.update(req.params.id, req.body.data).then(() => res.status(200).json({message: "Successfully updated"})).catch((err) => res.status(500).json({error: "Internal server error"}));
    }

    delete = (req: Request, res: Response) => {
        this.dataService.delete(req.params.id).then(() => res.status(200).json({message: "Successfully deleted"})).catch((err) => {
            res.status(500).json({error: "Internal server error"});
            console.error(err);
        });
    }
}