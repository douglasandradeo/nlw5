/*
* Para criação das migrations, basta usar o terminal com o seguinte código:
* 
* yarn typeorm migration:create -n nomedamigration
* 
* * Para funcionar, é necessário criar um script dentro do arquivo "package.json": 
* "typeorm": "ts-node-dev node_modules/typeorm/cli.js", também criar dentro do arquivo
* "ormconfig.json" o caminho da pasta "migrations" e
* o caminho "migrationsDir".
*/

import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateSettings1619007393756 implements MigrationInterface {

    // toda vez que for rodado "yarn typeorm migration:run", executará todo método "up"
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "settings",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true
                    },
                    {
                        name: "username",
                        type: "varchar"
                    },
                    {
                        name: "chat",
                        type: "boolean",
                        default: true
                    },
                    {
                        name: "updated_at",
                        type: "timestamp",
                        default: "now()"
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()"
                    }
                ]
            })
        );
    }

    // toda vez que for rodado "yarn typeorm migration:revert", executará todo método "down",
    // desfazendo a estrutura
    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("settings");
        
    }

}
