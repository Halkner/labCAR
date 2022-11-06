import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { readFileSync, writeFileSync } from 'fs';
import { CreatePassengerDto } from './dto/create-passenger.dto';
import { Passenger } from './entity/passenger.entity';
import { v4 as uuidv4 } from 'uuid';
import { UpdatePassengersDto } from './dto/update-passengers.dto';
import { validateAge } from 'src/utils/validateAge';

@Injectable()
export class PassengersService {
  findAll(page: number, limit: number) {
    const indiceInicial = page * limit;
    const indiceFinal = indiceInicial + limit;

    const passengersInFile = readFileSync(
      './src/database/passengers.json',
    ).toString();
    const passengers = JSON.parse(passengersInFile);

    if (passengers.length > indiceInicial) {
      if (passengers.length > indiceFinal) {
        return passengers.slice(indiceInicial, indiceFinal);
      } else {
        return passengers.slice(indiceInicial, passengers.length - 1);
      }
    } else {
      return [];
    }
  }

  findMany(name: string){
    const passengersInFile = readFileSync(
      './src/database/passengers.json',
    ).toString();
    const passengers = JSON.parse(passengersInFile);

    const findPassengers = passengers.flatMap((passenger: Passenger) => {
      if (passenger.name.includes(name)) {
        return passenger;
      } else {
        return [];
      }
    });

    return findPassengers;
  }

  findOne(id: string) {
    const passengersInFile = readFileSync(
      './src/database/passengers.json',
    ).toString();
    const passengers = JSON.parse(passengersInFile);

    const selectedPassenger = passengers.find((d: Passenger) => d.id === id);

    if (!selectedPassenger) {
      throw new HttpException(`Passenger ID not found`, HttpStatus.NOT_FOUND);
    }

    return selectedPassenger;
  }

  create(createPassengerDto: CreatePassengerDto) {

    const age = validateAge(createPassengerDto.birthDate);

    if(age < 18){
      throw new HttpException('Passenger does not meet minimum age requirements', HttpStatus.FORBIDDEN);
    }


    const passengersInFile = readFileSync(
      './src/database/passengers.json',
    ).toString();
    const passengers = JSON.parse(passengersInFile);

    const passenger = {
      id: uuidv4(),
      ...createPassengerDto,
    };

    writeFileSync(
      './src/database/passengers.json',
      JSON.stringify([...passengers, passenger]),
    );

    return passenger;
  }

  update(id: string, updatePassengerDto: UpdatePassengersDto) {
    const passengersInFile = readFileSync(
      './src/database/passengers.json',
    ).toString();
    const passengers = JSON.parse(passengersInFile);

    const indexPassenger = passengers.findIndex((d: Passenger) => d.id === id);

    if (indexPassenger === -1) {
      throw new NotFoundException(`Passenger ID ${id} not found`);
    }

    passengers[indexPassenger] = { id: id, ...updatePassengerDto };
    writeFileSync('./src/database/passengers.json', JSON.stringify(passengers));

    return passengers[indexPassenger];
  }

  remove(id: string) {
    const passengersInFile = readFileSync(
      './src/database/passengers.json',
    ).toString();
    const passengers = JSON.parse(passengersInFile);

    const indexPassenger = passengers.findIndex((d: Passenger) => d.id === id);

    if (indexPassenger >= 0) {
      passengers.splice(indexPassenger, 1);
      writeFileSync(
        './src/database/passengers.json',
        JSON.stringify(passengers),
      );
    } else {
      throw new NotFoundException(`Passenger ID ${id} not found`);
    }
  }
}
