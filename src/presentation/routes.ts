import { Router } from "express";
import { PostRoutes } from "./posts/routes";


export class AppRoutes {

    static get routes(): Router {

        const router = Router();

        router.use('/api/v1/posts', PostRoutes.routes );


        return router;
    }


}