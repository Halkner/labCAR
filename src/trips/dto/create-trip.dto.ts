import { IsString, MaxLength, MinLength } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class CreateTripDto{

    @ApiProperty()
    @IsString()
    readonly passenger_id: string;

    @ApiProperty()
    @IsString()
    @MinLength(4)
    @MaxLength(50)
    readonly passengerOrigin: string;

    @ApiProperty()
    @IsString()
    @MinLength(4)
    @MaxLength(50)
    readonly passengerDestiny: string;
}