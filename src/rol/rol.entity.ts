import { Usuario } from "src/usuario/usuario.entity";
import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'rol' })
export class Rol {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;

    @Column({ nullable: true })
    descripcion?: string;

    @Column({ type: 'char', length: 1, default: 'A' })
    estado: string; //activo:A, inactivo:I

    @CreateDateColumn({ name: 'fecha_creacion' })
    fechaCreacion: Date;

    @UpdateDateColumn({ name: 'fecha_actualizacion' })
    fechaActualizacion: Date;

    @ManyToMany(() => Usuario, (usuario) => usuario.roles)
    @JoinTable({ name: 'rol_usuario' })
    usuarios: Usuario[];

}