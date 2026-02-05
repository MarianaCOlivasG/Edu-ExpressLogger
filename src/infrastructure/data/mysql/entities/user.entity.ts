import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class UserEntity {
    
    @PrimaryGeneratedColumn('uuid')
    uid: string;

    @Column({ type: 'varchar' })
    name: string;

    @Column({ type: 'varchar', unique: true })
    email: string;

    @Column({ type: 'varchar', unique: true })
    username: string;
  
    @Column({ type: 'varchar' })
    password?: string;

    @Column({ type: 'bool', default: true })
    is_active: boolean;

}