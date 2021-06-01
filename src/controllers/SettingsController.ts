import { Request, Response } from "express";
import { SettingsService } from "../services/SettingsService";

class SettingsController {
    async create(req: Request, res: Response) {
        const { username, chat } = req.body;
 
        const settingsService = new SettingsService();

        try {
            const settings = await settingsService.create({ username, chat });
            return res.json(settings);
        } catch(err) {
            // erros encontrados no sistema devido a regras do negócio
            return res.status(400).json({
                message: err.message,
            });
            
            // caso seja erros fora da aplicação, é usado código 500
        }
    }
    
    async findByUsername(req: Request, res: Response) {
        const { username } = req.params

        const settingsService = new SettingsService();

        const settings = await settingsService.findByUsername(username)

        return res.json(settings)
    }
    
    async update(req: Request, res: Response) {
        const { username } = req.params
        const { chat } = req.body

        const settingsService = new SettingsService();

        const settings = await settingsService.update(username, chat)

        return res.json(settings)
    }
}

export { SettingsController };