import { Rol } from "src/rol/rol.entity";
import { Column, CreateDateColumn, Entity, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'users' })
export class Usuario {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true, length: 10 })
    cedula: string;

    @Column()
    nombre: string;

    @Column()
    apellido: string;

    @Column({ unique: true })
    email: string;

    @Column()
    fechaNacimiento: Date;

    @CreateDateColumn()
    fechaCreacion: Date;

    @UpdateDateColumn()
    fechaActualizacion: Date;

    @ManyToMany(() => Rol, (rol) => rol.usuarios)
    roles: Rol[];
}