import { Module } from '@nestjs/common';
import { DriversModule } from './drivers/drivers.module';
import { PassengersController } from './passengers/passengers.controller';
import { PassengersService } from './passengers/passengers.service';
import { PassengersModule } from './passengers/passengers.module';
import { TripsService } from './trips/trips.service';
import { TripsController } from './trips/trips.controller';
import { TripsModule } from './trips/trips.module';

@Module({
  imports: [DriversModule, PassengersModule, TripsModule],
  controllers: [PassengersController, TripsController],
  providers: [PassengersService, TripsService],
})
export class AppModule {}
