import { Router } from "express";
import { PostRoutes } from "./posts/routes";
import { AuthRoutes } from "./auth/routes";


export class AppRoutes {

    static get routes(): Router {

        const router = Router();

        router.use('/api/v1/auth', AuthRoutes.routes );
        router.use('/api/v1/posts', PostRoutes.routes );


        return router;
    }


}