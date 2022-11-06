export class Trip{
    trip_id: string;
    passengerInfo: {
        passenger_id: string;
        passengerOrigin: string;
        passengerDestiny: string;
        distance: string;
    }
    trip_status: 'CREATED' | 'ACCEPTED' | 'REFUSED';
}