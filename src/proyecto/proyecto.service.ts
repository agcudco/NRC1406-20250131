import { Injectable, NotFoundException } from "@nestjs/common";
import { Repository } from "typeorm";
import { Proyecto } from "./proyecto.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Tarea } from "src/tarea/tarea.entity";

@Injectable()
export class ProyectoService {

    constructor(
        @InjectRepository(Proyecto)
        private readonly proyectoRep: Repository<Proyecto>,
        @InjectRepository(Tarea)
        private readonly tareaRep: Repository<Tarea>
    ) { }

    async obtenerTodos(): Promise<Proyecto[]> {
        return await this.proyectoRep.find({ relations: ['tareas'] });
    }

    async findOne(id: number): Promise<Proyecto> {
        const project = await this.proyectoRep.findOne({
            where: { id },
            relations: ['tareas']
        });
        if (!project) {
            throw new NotFoundException(`No existe el proyecto con id: ${id}`);
        }
        return project;
    }

    async create(data: Partial<Proyecto>): Promise<Proyecto> {
        const project = this.proyectoRep.create(data);
        return await this.proyectoRep.save(project);
    }

    async update(id: number, data: Partial<Proyecto>): Promise<Proyecto> {
        await this.proyectoRep.update(id, data);
        return this.findOne(id);
    }

    async delete(id: number): Promise<void> {
        const project = await this.findOne(id);
        await this.proyectoRep.remove(project);
    }

    async agregarTarea(projectId: number, data: Partial<Tarea>): Promise<Proyecto> {
        const project = await this.findOne(projectId);
        const task = this.tareaRep.create(data);
        task.proyecto = project;
        await this.tareaRep.save(task);
        return this.findOne(projectId);
    }

}