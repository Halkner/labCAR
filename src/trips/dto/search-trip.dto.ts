import { IsString } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class SearchTripDto{

    @ApiProperty()
    @IsString()
    readonly current_address: string;
}