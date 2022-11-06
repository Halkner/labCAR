import {
  Injectable,
  HttpException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { readFileSync, writeFileSync } from 'fs';
import { CreateDriverDto } from './dto/create-driver.dto';
import { UpdateDriverDto } from './dto/update-driver.dto';
import { Driver } from './entity/driver.entity';
import { v4 as uuidv4 } from 'uuid';
import { validateAge } from 'src/utils/validateAge';

@Injectable()
export class DriversService {
  findAll(page: number, limit: number) {
    const indiceInicial = page * limit;
    const indiceFinal = indiceInicial + limit;

    const driversInFile = readFileSync(
      './src/database/drivers.json',
    ).toString();
    const drivers = JSON.parse(driversInFile);

    if (drivers.length > indiceInicial) {
      if (drivers.length > indiceFinal) {
        return drivers.slice(indiceInicial, indiceFinal);
      } else {
        return drivers.slice(indiceInicial, drivers.length - 1);
      }
    } else {
      return [];
    }
  }

  findMany(name: string){
    const driversInFile = readFileSync(
      './src/database/drivers.json',
    ).toString();
    const drivers = JSON.parse(driversInFile);

    const findDrivers = drivers.flatMap((driver: Driver) => {
      if (driver.name.includes(name)) {
        return driver;
      } else {
        return [];
      }
    });

    return findDrivers;
  }

  findOne(id: string) {
    const driversInFile = readFileSync(
      './src/database/drivers.json',
    ).toString();
    const drivers = JSON.parse(driversInFile);

    const selectedDriver = drivers.find((d: Driver) => d.id === id);

    if (!selectedDriver) {
      throw new HttpException(`Driver ID not found`, HttpStatus.NOT_FOUND);
    }

    return selectedDriver;
  }

  create(createDriverDto: CreateDriverDto) {

    const age = validateAge(createDriverDto.birthDate);

    if(age < 18){
      throw new HttpException('Driver does not meet minimum age requirements', HttpStatus.FORBIDDEN);
    }

    const driversInFile = readFileSync(
      './src/database/drivers.json',
    ).toString();
    const drivers = JSON.parse(driversInFile);

    const driver = {
      id: uuidv4(),
      ...createDriverDto,
      isBlocked: false,
    };

    writeFileSync(
      './src/database/drivers.json',
      JSON.stringify([...drivers, driver]),
    );

    return driver;
  }

  update(id: string, updateDriverDto: UpdateDriverDto) {
    const driversInFile = readFileSync(
      './src/database/drivers.json',
    ).toString();
    const drivers = JSON.parse(driversInFile);

    const indexDriver = drivers.findIndex((d: Driver) => d.id === id);

    if (indexDriver === -1) {
      throw new NotFoundException(`Driver ID ${id} not found`);
    }

    drivers[indexDriver] = { id: id, ...updateDriverDto };
    writeFileSync('./src/database/drivers.json', JSON.stringify(drivers));

    return drivers[indexDriver];
  }

  handleBlock(id: string) {
    const driversInFile = readFileSync(
      './src/database/drivers.json',
    ).toString();
    const drivers = JSON.parse(driversInFile);

    const indexDriver = drivers.findIndex((d: Driver) => d.id === id);

    const driverBlockStatus = !drivers[indexDriver].isBlocked;

    drivers[indexDriver] = {
      ...drivers[indexDriver],
      isBlocked: driverBlockStatus,
    };
    writeFileSync('./src/database/drivers.json', JSON.stringify(drivers));
  }

  remove(id: string) {
    const driversInFile = readFileSync(
      './src/database/drivers.json',
    ).toString();
    const drivers = JSON.parse(driversInFile);

    const indexDriver = drivers.findIndex((d: Driver) => d.id === id);

    if (indexDriver >= 0) {
      drivers.splice(indexDriver, 1);
      writeFileSync('./src/database/drivers.json', JSON.stringify(drivers));
    } else {
      throw new NotFoundException(`Driver ID ${id} not found`);
    }
  }
}
