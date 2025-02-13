import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Usuario } from "./usuario.entity";
import { UsuarioController } from "./usuario.controller";
import { UsuarioService } from "./usuario.service";
import { Rol } from "src/rol/rol.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Usuario,Rol])],
    controllers: [UsuarioController],
    providers: [UsuarioService]
})
export class UsuarioModule { }