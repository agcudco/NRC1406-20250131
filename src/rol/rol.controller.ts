import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { RolService } from "./rol.service";
import { Rol } from "./rol.entity";

@Controller('roles')
export class RolController {

    constructor(private readonly rolService: RolService) { }

    @Get()//http://localhost:3000/roles
    async findAll() {
        return this.rolService.findAll();
    }


    @Get(':id') //http://localhost:3000/roles/1
    async findById(@Param('id') id: number):Promise<Rol | null> {
        return this.rolService.findById(id);
    }

    @Post() //http://localhost:3000/roles
    async create(@Body() rol: Partial<Rol>): Promise<Rol> {
        return this.rolService.create(rol);
    }

    @Put(':id') //http://localhost:3000/roles/1
    async update(@Param('id') id: number, @Body() rol: Partial<Rol>): Promise<Rol | null> {
        return this.rolService.update(id, rol);
    }

    @Delete(':id') //http://localhost:3000/roles/1
    async delete(@Param('id') id: number): Promise<void> {
        return this.rolService.delete(id);
    }

}