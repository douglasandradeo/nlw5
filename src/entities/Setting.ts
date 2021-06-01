// dispobiliza quatro versões para escolha (v1, v3, v4 e v5)
import { v4 as uuid } from "uuid" // o código "as uuid" serviu para nomear a versão v4 como "uuid" para melhor compreensão

import { Column, CreateDateColumn, Entity, UpdateDateColumn, PrimaryColumn } from "typeorm";

@Entity("settings")
class Setting {
    /*caso utilizassemos nomes diferentes, poderíamos nomear da seguinte forma dentro dos parênteses: {name: "id"}*/
    @PrimaryColumn()
    id: string;
    
    @Column()
    username: string;

    @Column()
    chat: boolean;

    @UpdateDateColumn()
    updated_at: Date;

    @CreateDateColumn()
    created_at: Date;

    constructor() {
        if(!this.id) {
            this.id = uuid();
        }
    }

}

export { Setting }


