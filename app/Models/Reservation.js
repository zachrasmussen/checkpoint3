import { generateId } from "../Utils/generateId.js"



export class Reservation {
    constructor(data) {
        this.id = data.id || generateId()
        this.type = data.type
        this.name = data.name
        this.confirm = data.confirm
        this.address = data.address
        this.date = new Date(data.date)
        this.cost = data.cost
        this.tripId = data.tripId
    }

    get Template() {
        return `
    
        <div class="col-12 row mt-2 text-center text-dark d-flex pt-2">
            <p class="col-2">${this.type}</p>
            <p class="col-2">${this.name}</p>
            <p class="col-2">${this.confirm}</p>
            <p class="col-2">${this.address}</p>
            <p class="col-2">${this.date.toLocaleDateString('en-US')}</p>
            <p class="col-1 text-end p-0">$${this.cost}</p>
            <i class="col-1 text-end p-0 text-danger mdi mdi-delete-forever selectable" onclick="app.reservationsController.deleteReservation('${this.id}')"></i>
        </div >
    
            `
    }
}
