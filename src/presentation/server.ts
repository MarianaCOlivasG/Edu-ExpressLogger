

import express, { Express, Router } from 'express';
import path from 'path';
import http from 'http';
import cors from 'cors';
import morgan from 'morgan';
import { errorMiddleware } from './middlewares/error.middleware';
import { setupSwagger } from '../infrastructure/swagger/swagger';

interface Options {
    port?: number;
    host?: string;
    routes: () => Router
}

export class Server {


    public readonly app: Express = express();
    public readonly port: number;
    public readonly host: string;
    private readonly routesFactory: () => Router;
    private readonly server = http.createServer(this.app);

    constructor(options: Options) {
        const { host = '127.0.0.1', port = 3500, routes } = options;
        this.host = host;
        this.port = port;
        this.routesFactory = routes;
    }

    async start() {

        try {
            // Middleware
            this.app.use(express.json());
            this.app.use(express.urlencoded({ extended: true }));

            setupSwagger(this.app)
            
            this.app.use(cors());

            this.app.use(morgan('dev'));

            this.app.use(express.static(path.resolve(__dirname, './public')));

            // Rutas
            this.app.use(this.routesFactory());


            // Manejo de errores
            // this.app.use((err: any, _req: any, res: any, _next: any) => {
            //     console.log('MIDLEWARE PARA ERRORES');
            //     res.status(500).json({ status: false, message: err.message || 'Error inesperado' });
            // });

            this.app.use(errorMiddleware);

            this.server.listen(this.port, this.host, () => {
                console.log(`Server is running on HOST ${this.host} - PORT ${this.port}`);
            });
            
        } catch (error) {
            console.error("Failed to start the server:", error);
            process.exit(1);
        }
    }

}