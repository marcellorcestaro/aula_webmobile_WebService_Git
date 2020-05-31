import { Controller, Get, Post, Put, Param, Body, Delete, UseGuards } from '@nestjs/common';
import { ComputerService } from './computer.service';
import { Computer } from './computer.entity';
import { DeleteResult } from 'typeorm';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('computer')
export class ComputerController {
    constructor(
        private computerService: ComputerService
    ){ }

    @UseGuards(JwtAuthGuard)
    @Get()
    public async get(): Promise<Computer[]>{
        return await this.computerService.readAll();
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    public async getOne(@Param('id') id: number): Promise<Computer> {
        return await this.computerService.readOne(id);
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    public async post(@Body() newComputer: Computer): Promise<Computer> {
        return await this.computerService.create(newComputer);
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id')
    public async put(@Param('id') id: number, @Body() payloadUpdate: Computer): Promise<Computer> {
        return await this.computerService.update(id, payloadUpdate);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    public async delete(@Param('id') id: number): Promise<DeleteResult> {
        return await this.computerService.delete(id);
    }
}
