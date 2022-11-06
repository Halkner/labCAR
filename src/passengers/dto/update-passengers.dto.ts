import { IsString, MaxLength, MinLength } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePassengersDto {

    @ApiProperty()
    @IsString()
    @MinLength(11)
    @MaxLength(14)
    readonly cpf: string;

    @ApiProperty()
    @IsString()
    @MaxLength(50)
    readonly name: string;

    @ApiProperty()
    @IsString()
    @MinLength(10)
    @MaxLength(10)
    readonly birthDate: string;

    @ApiProperty()
    @IsString()
    @MinLength(4)
    @MaxLength(50)
    readonly address: string;
}
