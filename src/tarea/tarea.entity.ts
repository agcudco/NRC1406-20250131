import { Proyecto } from "src/proyecto/proyecto.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('tarea')
export class Tarea {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;

    @Column()
    descripcion: string;

    @Column({ nullable: true, default: 'Pendiente' })
    estado?: string;

    @Column()
    fechaInicio: Date;

    @Column()
    fechaFin: Date;

    @CreateDateColumn()
    fechaCreacion: Date;

    @UpdateDateColumn()
    fechaActualizacion: Date;

    @ManyToOne(() => Proyecto, p => p.tareas, { onDelete: 'RESTRICT' })
    proyecto: Proyecto;
}