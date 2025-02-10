import { Body, Controller, Get, Post } from "@nestjs/common"
import { UsuarioService } from "./usuario.service";
import { Usuario } from "./usuario.entity";

@Controller('usuario')
export class UsuarioController {

    constructor(private readonly usurioService: UsuarioService) { }

    @Get()
    async getUsuarios() {
        return await this.usurioService.findAll();
    }

    @Post()
    async create(@Body() data: Partial<Usuario>): Promise<Usuario> {
        return await this.usurioService.create(data);
    }
}