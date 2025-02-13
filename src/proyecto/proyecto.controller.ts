import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { ProyectoService } from "./proyecto.service";
import { Proyecto } from "./proyecto.entity";
import { Tarea } from "src/tarea/tarea.entity";

@Controller('proyectos')
export class ProyectoController {
    constructor(
        private readonly service: ProyectoService
    ) { }

    @Get()
    async obtenerTodos(): Promise<Proyecto[]> {
        return await this.service.obtenerTodos();
    }

    @Get(':id')
    async buscarPorId(@Param('id', ParseIntPipe) id: number): Promise<Proyecto> {
        return await this.service.findOne(id);
    }

    @Post()
    async crear(@Body() data: Partial<Proyecto>): Promise<Proyecto> {
        return await this.service.create(data);
    }

    @Put(':id')
    async actualizar(
        @Param('id', ParseIntPipe) id: number,
        @Body() data: Partial<Proyecto>
    ): Promise<Proyecto> {
        return await this.service.update(id, data);
    }

    @Delete(':id')
    async eliminar(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return await this.service.delete(id);
    }

    @Post(':id/tareas')
    async agregarTarea(
        @Param('id', ParseIntPipe) id: number,
        @Body() dataTask: Partial<Tarea>
    ): Promise<Proyecto> {
        return await this.service.agregarTarea(id, dataTask);
    }
}