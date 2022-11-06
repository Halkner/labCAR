import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query } from '@nestjs/common';
import { DriversService } from './drivers.service';
import { CreateDriverDto } from './dto/create-driver.dto';
import { UpdateDriverDto } from './dto/update-driver.dto';
import { ApiTags } from '@nestjs/swagger'

@Controller('drivers')
export class DriversController {
    constructor(private readonly driversService: DriversService) {}

    @ApiTags('Drivers')
    @Get()
    findAll(@Query('page') page, @Query('limit') limit){
        return this.driversService.findAll(page, limit);
    }

    @ApiTags('Drivers')
    @Get('/driverName/:name')
    findMany(@Param('name') name: string){
        return this.driversService.findMany(name);
    }

    @ApiTags('Drivers')
    @Get(':id')
    findOne(@Param('id') id:string){
        return this.driversService.findOne(id);
    }

    @ApiTags('Drivers')
    @Post()
    create(@Body() createDriverDto: CreateDriverDto){
        return this.driversService.create(createDriverDto);
    }

    @ApiTags('Drivers')
    @Put(':id')
    update(@Param('id') id: string, @Body() updateDriverDto: UpdateDriverDto){
        return this.driversService.update(id, updateDriverDto);
    }

    @ApiTags('Drivers')
    @Patch('/blockStatus/:id')
    handleBlock(@Param('id') id: string){
        return this.driversService.handleBlock(id);
    }
    
    @ApiTags('Drivers')
    @Delete(':id')
    remove(@Param('id') id:string){
        return this.driversService.remove(id);
    }
}
