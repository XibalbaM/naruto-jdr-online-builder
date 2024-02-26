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
    static getETag(data: any) {
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
    static sendDataOr304(req: Request, res: Response, data: any) {
        const ifNoneMatch = req.header("If-None-Match");
        res.set('Cache-Control', `public, max-age=${60 * 60}`);
        if (ifNoneMatch) {
            const etag = this.getETag(data);
            if (etag === ifNoneMatch) {
                return res.sendStatus(304);
            }
        }
        res.set("ETag", DataController.getETag(data));
        res.status(200).json(data);
    }

    getAll = async (req: Request, res: Response) => {
        try {
            DataController.sendDataOr304(req, res, await this.dataService.getAll())
        } catch (ignored) {
            console.error(ignored);
            res.status(500).json({error: "Internal server error"});
        }
    }

    get = async (req: Request, res: Response) => {
        try {
            let data = await this.dataService.get(req.params.id);
            if (data) DataController.sendDataOr304(req, res, data);
            else res.status(404).json({error: "Not found"});
        } catch (ignored) {
            console.error(ignored);
            res.status(500).json({error: "Internal server error"});
        }
    }

    create = async (req: Request, res: Response) => {
        try {
            res.status(201).json(await this.dataService.create(req.body.data))
        } catch(ignored) {
            console.error(ignored);
            res.status(500).json({error: "Internal server error"})
        }
    }

    update = async (req: Request, res: Response) => {
        try {
            await this.dataService.update(req.params.id, req.body.data)
            res.status(200).json({message: "Successfully updated"});
        } catch(ignored) {
            console.error(ignored);
            res.status(500).json({error: "Internal server error"});
        }
    }

    delete = async (req: Request, res: Response) => {
        try {
            await this.dataService.delete(req.params.id)
            res.status(200).json({message: "Successfully deleted"})
        } catch (err) {
            console.error(err);
            res.status(500).json({error: "Internal server error"});
        }
    }
}