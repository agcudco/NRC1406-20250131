import { Injectable, NotFoundException } from "@nestjs/common";
import { Repository } from "typeorm";
import { Usuario } from "./usuario.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Rol } from "src/rol/rol.entity";

@Injectable()
export class UsuarioService {

    constructor(
        @InjectRepository(Usuario)
        private readonly usuarioRepository: Repository<Usuario>,
        @InjectRepository(Rol)
        private readonly rolRepository: Repository<Rol>
    ) { }

    findAll(): Promise<Usuario[]> {
        return this.usuarioRepository.find({ relations: ['roles'] });
    }

    async findOne(id: number): Promise<Usuario> {
        const user = await this.usuarioRepository.findOne({
            where: { id },
            relations: ['roles']
        });
        if (!user) {
            throw new NotFoundException(`No existe el usuario con id: ${id}`);
        }
        return user;
    }

    create(usuario: Partial<Usuario>): Promise<Usuario> {
        const temp = this.usuarioRepository.create(usuario);
        return this.usuarioRepository.save(temp);
    }

    async update(id: number, usuario: Partial<Usuario>): Promise<Usuario | null> {
        await this.usuarioRepository.update({ id }, usuario);
        return this.findOne(id);
    }

    async delet(id: number): Promise<void> {
        await this.usuarioRepository.delete({ id });
    }


    async asignarRoles(userId: number, rolId: number): Promise<Usuario> {
        const user = await this.usuarioRepository.findOne({
            where: { id: userId },
            relations: ['roles']
        });
        if (!user) {
            throw new NotFoundException(`No existe el usuario con id: ${userId}`);
        }

        const role = await this.rolRepository.findOne({
            where: { id: rolId }
        });

        if (!role) {
            throw new NotFoundException(`No existe el rol con id: ${rolId}`);
        }

        //verifico si tiene asignado el rol
        if (user.roles.find(r => r.id === role.id)) {
            return user;
        }

        user.roles.push(role);
        return await this.usuarioRepository.save(user);
    }

}