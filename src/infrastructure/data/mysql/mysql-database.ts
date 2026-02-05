import { DataSource } from 'typeorm';
import { PostEntity } from './entities';

export interface MySQLOptions {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
}

export class MySQLDatabase {

  private static dataSource: DataSource | null = null;

  static async connect(options: MySQLOptions): Promise<DataSource> {
    
    if (this.dataSource?.isInitialized) {
      return this.dataSource;
    }

    this.dataSource = new DataSource({
      type: 'mysql',
      host: options.host,
      port: options.port,
      username: options.username,
      password: options.password,
      database: options.database,
      synchronize: true,
      logging: ['error'],

      entities: [
        PostEntity
      ],

      extra: {
        connectionLimit: 10,
      },
    });

    await this.initializeWithRetry();

    console.log('Database connected successfully');
    return this.dataSource;
  }

  private static async initializeWithRetry(
    retries = 5,
    delayMs = 5000
  ): Promise<void> {
    for (let attempt = 1; attempt <= retries; attempt++) {
      try {
        await this.dataSource!.initialize();
        return;
      } catch (error) {
        console.error(`DB connection failed (attempt ${attempt})`, error);

        if (attempt === retries) {
          throw new Error('Database connection failed after multiple attempts');
        }

        await this.delay(delayMs);
      }
    }
  }

  private static delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  static getDataSource(): DataSource {
    if (!this.dataSource?.isInitialized) {
      throw new Error('DataSource not initialized. Call connect() first.');
    }
    return this.dataSource;
  }
}
