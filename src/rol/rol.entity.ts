import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({name: 'rol'})
export class Rol{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;

    @Column({nullable: true})
    descripcion?: string;

    @Column({type: 'char', length: 1,default: 'A'})
    estado:string; //activo:A, inactivo:I

    @CreateDateColumn({name: 'fecha_creacion'})
    fechaCreacion: Date;

    @UpdateDateColumn({name: 'fecha_actualizacion'})
    fechaActualizacion: Date;

}