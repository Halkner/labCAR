import { Body, Controller, Post } from '@nestjs/common';
import { CreateTripDto } from './dto/create-trip.dto';
import { SearchTripDto } from './dto/search-trip.dto';
import { TripsService } from './trips.service';
import { ApiTags } from '@nestjs/swagger'

@Controller('trips')
export class TripsController {
    constructor(private readonly tripsService: TripsService){}

    @ApiTags('Trips')
    @Post()
    requestTrip(@Body() createTripDto: CreateTripDto){
        return this.tripsService.requestTrip(createTripDto);
    }

    @ApiTags('Trips')
    @Post('/nearby')
    searchNearbyTrips(@Body() searchTripDto: SearchTripDto){
        return this.tripsService.searchNearbyTrips(searchTripDto);
    }

}
