import { ProxyState } from "../AppState.js";
import { tripsService } from "../Services/TripsService.js";
import { Pop } from "../Utils/Pop.js";
import { loadState, saveState } from "../Utils/LocalStorage.js";



function _draw() {
    let template = ''
    let trips = ProxyState.trips.sort((a, b) => a.date - b.date)
    console.log(trips);
    trips.forEach(t => template += t.Template)
    // console.log(template);
    document.getElementById('trips').innerHTML = template
}


export class TripsController {
    constructor() {
        ProxyState.on('trips', _draw)
        ProxyState.on('reservations', _draw)
        ProxyState.on('trips', saveState)
        ProxyState.on('reservations', saveState)
        loadState()
        _draw()
    }

    createTrip() {
        window.event.preventDefault()
        console.log('creating trip');
        let form = window.event.target
        let newTrip = {
            trip: form.trip.value,
            date: form.date.value,
        }
        tripsService.createTrip(newTrip)
        Pop.toast('Trip Created', 'success')
        form.reset()
    }



    deleteTrip(id) {
        if (window.confirm('are you sure you want to delete this?')) {
            console.log('deleteing', id);
            tripsService.deleteTrip(id)
        }
    }

    editTrip(id) {
        console.log(window.event.target)
        let newText = window.event.target.value
        tripsService.editTrip(id, newText)
    }

}