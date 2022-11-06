import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { readFileSync, writeFileSync } from 'fs';
import { CreateTripDto } from './dto/create-trip.dto';
import { v4 as uuidv4 } from 'uuid';
import { SearchTripDto } from './dto/search-trip.dto';
import { Trip } from './entity/trip.entity';
import { Passenger } from 'src/passengers/entity/passenger.entity';

@Injectable()
export class TripsService {

  requestTrip(createTripDto: CreateTripDto) {
    const tripsInFile = readFileSync('./src/database/trips.json').toString();
    const trips = JSON.parse(tripsInFile);

    const passengersInFile = readFileSync('./src/database/passengers.json').toString();
    const passengers = JSON.parse(passengersInFile);

    const distance = (Math.random() * 20).toFixed(1);

    const passengerExists = passengers.find((p: Passenger) => createTripDto.passenger_id === p.id)

    if(!passengerExists){
      throw new HttpException('Passenger ID does not exists', HttpStatus.NOT_FOUND)
    }

    const trip: Trip = {
      trip_id: uuidv4(),
      passengerInfo: { ...createTripDto, distance: distance },
      trip_status: 'CREATED',
    };

    writeFileSync(
      './src/database/trips.json',
      JSON.stringify([...trips, trip]),
    );

    return trip;
  }

  searchNearbyTrips(searchTripDto: SearchTripDto) {
    const tripsInFile = readFileSync('./src/database/trips.json').toString();
    const trips: Trip[] = JSON.parse(tripsInFile);

    const nearbyTrips = trips.flatMap((trip: Trip) => {
      if (Number(trip.passengerInfo.distance) <= 10) {
        return trip;
      } else {
        return [];
      }
    });

    const allNearbyTrips = {
      ...searchTripDto,
      nearbyTrips,
    };

    return allNearbyTrips;
  }
}
