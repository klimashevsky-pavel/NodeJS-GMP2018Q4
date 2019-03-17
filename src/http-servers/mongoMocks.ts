import { City } from 'interfaces/City';

const cities: City[] = [
    {
        name: 'Moscow',
        country: 'Russia',
        capital: true,
        location: {
            lat: 55.755825,
            long: 37.617298
        }
    },
    {
        name: 'New-York',
        country: 'USA',
        capital: false,
        location: {
            lat: 40.713051,
            long: -74.007233
        }
    },
    {
        name: 'Shanghai',
        country: 'China',
        capital: false,
        location: {
            lat: 31.230391,
            long: 121.473701
        }
    },
    {
        name: 'Tokyo',
        country: 'Japan',
        capital: true,
        location: {
            lat: 35.689487,
            long: 139.691711
        }
    },
    {
        name: 'Mumbai',
        country: 'India',
        capital: false,
        location: {
            lat: 19.075983,
            long: 72.877655
        }
    }
];

export default cities;
