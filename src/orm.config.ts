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
        host: 'localhost',
        port: 3306,
        username: 'ukseung',
        password: 'flqqka!#%24',
        database: 'TestDB',
        entities: commonConf.ENTITIES,
        synchronize: commonConf.SYNCRONIZE,
        logging: true,
        migrations: commonConf.MIGRATIONS,
        migrationsRun: commonConf.MIGRATIONS_RUN
    }

    return ormconfig
}

export { ormConfig }