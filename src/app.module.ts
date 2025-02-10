import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rol } from './rol/rol.entity';
import { RolModule } from './rol/rol.module';
import { Usuario } from './usuario/usuario.entity';
import { UsuarioModule } from './usuario/usuario.module';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'admin**123',
      database: 'api-usuarios',
      entities: [Rol, Usuario],
      synchronize: true
    }),
    RolModule,
    UsuarioModule
  ]
})
export class AppModule { }
