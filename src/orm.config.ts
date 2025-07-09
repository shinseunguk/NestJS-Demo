import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { Migration } from "typeorm";
import { Cat } from "./domain/cats.entity";
import { User } from "./domain/user.entity";

function ormConfig(): TypeOrmModuleOptions {
    const commonConf = {
        SYNCRONIZE: false,
        ENTITIES: [__dirname + '/domain/*.entity{.ts,.js}'],
        MIGRATIONS: [__dirname + '/migrations/**/*{.ts,.js}'],
        CLI: {
            migrationsDir: 'src/migrations',
        },
        MIGRATIONS_RUN: false,
    };

    const ormconfig: TypeOrmModuleOptions = {
        type: 'mysql',
        host: process.env.DB_HOST || 'localhost',
        port: parseInt(process.env.DB_PORT || '3306'),
        username: process.env.DB_USERNAME || 'ukseung',
        password: process.env.DB_PASSWORD || 'flqqka!#%24',
        database: process.env.DB_DATABASE || 'TestDB',
        entities: commonConf.ENTITIES,
        synchronize: commonConf.SYNCRONIZE,
        logging: true,
        migrations: commonConf.MIGRATIONS,
        migrationsRun: commonConf.MIGRATIONS_RUN
    }

    return ormconfig
}

export { ormConfig }