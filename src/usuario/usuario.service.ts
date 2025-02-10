import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { Usuario } from "./usuario.entity";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class UsuarioService {

    constructor(
        @InjectRepository(Usuario)
        private readonly usuarioRepository: Repository<Usuario>
    ) { }

    findAll(): Promise<Usuario[]> {
        return this.usuarioRepository.find();
    }

    findOne(id: number): Promise<Usuario | null> {
        return this.usuarioRepository.findOne({ where: { id } });
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
}