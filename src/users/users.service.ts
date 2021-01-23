import { Injectable  } from '@nestjs/common';

const people2 = require('../users/people');
const people = [{
        name: 'Oluyemi', position: {lat:41.238553, lng: -80.8258473}
    }, {name: 'kenny', position:{lat:41.23, lng:-80.815}}];

// 41.2344221,-80.8154618,

@Injectable()
export class UsersService {    

    getAllUsers(){   
        console.log('UsersService - getAllusers()')     
        return people.map( (person, index) => ({
            name: person.name,
            position: person.position,
        }));
    }


    postLocation(user) {
        console.log('running postLocation on server user=' + JSON.stringify(user, null,3));
        const Pusher = require('pusher');
        const {lat, lng} = user.position

        people.forEach( (person, index) => {
            if (person.position.lat === user.position.lat) {
                people[index] = { ...person, position: { lat, lng } };
                console.log('foreach person people =' + people[index]);
                return  {person: people[index], people}
            }
        })
    }
}