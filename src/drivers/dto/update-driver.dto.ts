import { IsString, MaxLength, MinLength } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class UpdateDriverDto {
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
    readonly birthDate: string;

    @ApiProperty()
    @IsString()
    @MinLength(7)
    @MaxLength(8)
    readonly licensePlate: string;

    @ApiProperty()
    @IsString()
    @MaxLength(30)
    readonly vModel: string;
}
