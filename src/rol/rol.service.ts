import { Injectable } from "@nestjs/common";
import { Rol } from "./rol.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class RolService {

    constructor(
        @InjectRepository(Rol)
        private readonly rolRepository: Repository<Rol>
    ) { }

    findAll(): Promise<Rol[]> {
        return this.rolRepository.find(); //find -> SELECT * FROM rol
    }

    findById(id: number): Promise<Rol | null> {
        return this.rolRepository.findOne({ where: { id } }); //findOne -> SELECT * FROM rol WHERE id = id
    }

    create(rol: Partial<Rol>): Promise<Rol> {
        const rolEntity = this.rolRepository.create(rol); //create -> new Rol(rol)
        return this.rolRepository.save(rolEntity); //save -> INSERT INTO rol (nombre, descripcion, fecha_creacion, fecha_actualizacion) VALUES (rol.nombre, rol.descripcion, rol.fechaCreacion, rol.fechaActualizacion)
    }

    async update(id: number, rol: Partial<Rol>): Promise<Rol | null> {
        await this.rolRepository.update(id, rol); //update -> UPDATE rol SET nombre = rol.nombre, descripcion = rol.descripcion, fecha_creacion = rol.fechaCreacion, fecha_actualizacion = rol.fechaActualizacion WHERE id = id
        return this.findById(id);
    }

    async delete(id: number): Promise<void> {
        await this.rolRepository.delete(id); //delete -> DELETE FROM rol WHERE id = id
    }
}