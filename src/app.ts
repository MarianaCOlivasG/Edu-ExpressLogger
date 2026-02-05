import { envs } from "./config/envs";
import { MySQLDatabase } from "./infrastructure/data/mysql";
import { AppRoutes } from "./presentation/routes";
import { Server } from "./presentation/server";


(async () => {

    try {
        await MySQLDatabase.connect({
            host: envs.DB_HOST,
            port: envs.DB_PORT,
            username: envs.DB_USERNAME,
            password: envs.DB_PASSWORD ?? '',
            database: envs.DB_NAME,
        });



        const serverInstance = new Server({
            host: envs.HOST,
            port: envs.PORT,
            routes: () => AppRoutes.routes 
        });


        // Inciar server
        await serverInstance.start();


   
    } catch (error) {
        console.error("Failed to connect to the database:", error);
        process.exit(1);
    }

})();
