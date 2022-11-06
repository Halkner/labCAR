import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { CreatePassengerDto } from './dto/create-passenger.dto';
import { UpdatePassengersDto } from './dto/update-passengers.dto';
import { PassengersService } from './passengers.service';
import { ApiTags } from '@nestjs/swagger'

@Controller('passengers')
export class PassengersController {
    constructor(private readonly passengersService: PassengersService ) {}

    @ApiTags('Passengers')
    @Get()
    findAll(@Query('page') page, @Query('limit') limit){
        return this.passengersService.findAll(page, limit);
    }

    @ApiTags('Passengers')
    @Get(':id')
    findOne(@Param('id') id:string){
        return this.passengersService.findOne(id);
    }

    @ApiTags('Passengers')
    @Get('/passengerName/:name')
    findMany(@Param('name') name: string){
        return this.passengersService.findMany(name);
    }

    @ApiTags('Passengers')
    @Post()
    create(@Body() createPassengerDto: CreatePassengerDto){
        return this.passengersService.create(createPassengerDto);
    }

    @ApiTags('Passengers')
    @Put(':id')
    update(@Param('id') id: string, @Body() updatePassengersDto: UpdatePassengersDto){
        return this.passengersService.update(id, updatePassengersDto);
    }

    @ApiTags('Passengers')
    @Delete(':id')
    remove(@Param('id') id:string){
        return this.passengersService.remove(id);
    }
}
