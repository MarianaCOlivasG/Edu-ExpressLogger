import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { AuditableEntity } from "./auditable.entity";

@Entity('posts')
export class PostEntity extends AuditableEntity {
    
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar' })
    title: string;

    @Column({ type: 'varchar', unique: true })
    body: string;

    @Column({ type: 'bool', default: false })
    is_deleted: boolean;

}