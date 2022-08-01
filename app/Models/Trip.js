import { ProxyState } from "../AppState.js"
import { generateId } from "../Utils/generateId.js"

export class Trip {
    constructor(data) {
        this.id = data.id || generateId()
        this.trip = data.trip
        this.date = new Date(data.date)
        this.note = data.note
    }

    get Template() {
        return `
        <!-- NOTE trip template -->
        <section class="bg-white rounded elevation-2 mt-5 p-3">
                <div class="row">
                    <div class="d-inline-flex d-flex justify-content-between">
                        <h3>${this.trip}</h3>
                        <h4>${this.date.toLocaleDateString('en-US')}</h4>
                        <p class="text-danger p-1 selectable" onclick="app.tripsController.deleteTrip('${this.id}')"><b>X</b></p>
                    </div>
                </div>
                  
                  <div class="row d-flex align-items-center p-3 mt-3 text-light bg-secondary">
                    <p class="col-2 text-center m-0"><b>Type</b></p>
                    <p class="col-2 text-center m-0"><b>Company</b></p>
                    <p class="col-2 text-center m-0"><b>Confirmation #</b></p>
                    <p class="col-2 text-center m-0"><b>Address</b></p>
                    <p class="col-2 text-center m-0"><b>Date</b></p>
                    <p class="col-2 text-center m-0"><b>Cost</b></p>
                  </div>
                </div>
            
        
            <section id="reservation" class="row py-2">

              ${this.Reservations}

            </section>
            
        <!-- NOTE reservation template -->
        <div class="row mt-5">
        <div class="col-12">
          <form class="row "
            onsubmit="app.reservationsController.createReservation('${this.id}')">
            <div class="col-2 justify-content-center d-flex">
              <select class="form-control" name="type" id="type" required>
                <option value="🛩 Travel">🛩 Travel</option>
                <option value="🚗 Car Rental">🚗 Car Rental</option>
                <option value="🏢 Hotel">🏢 Hotel</option>
                <option value="🎡 Entertainment">🎡 Entertainment</option>
              </select>
            </div>
      
            <div class="col-2 justify-content-center d-flex">     
              <input name="name" id="name" minlength="3" maxlength="15" type="text" placeholder="Company"
                class="text-center p-1" required>
            </div>
      
            <div class="col-2 justify-content-center d-flex">     
              <input name="confirm" id="confirm" minlength="3" type="text" placeholder="Confirmation"
                class="text-center p-1" required>
            </div>
      
            <div class="col-2 justify-content-center d-flex">     
              <input name="address" id="address" minlength="3" type="text" placeholder="Address"
                class="text-center p-1" required>
            </div>
      
            <div class="col-2 justify-content-center d-flex">     
              <input name="date" id="date" minlength="3" maxlength="15" type="date" placeholder="Date"
                class="text-center p-1" required>
            </div>
      
            <div class="col-2 justify-content-center d-flex">
              <input name="cost" id="cost" maxlength="15" type="number" placeholder="Cost"
                class="text-center p-1" required>
            </div>
      
            

            <div class="col-12 justify-content-end d-flex mt-5">
              <button class="col-1 btn btn-primary text-white">Add</button>
            </div>
      
            
      
            </div>
        </form>
        <div class="col-12 justify-content-start d-flex">
                <div class="col-4">
                  <label for="note" class="form-label">Trip Notes</label>
                  <textarea rows="3" name="note" id="note" class="form-control"
                     placeholder="Type your trip notes here" onblur="app.tripsController.editTrip('${this.id}')">${this.note}</textarea>
                </div>
            </div>
        </div>

        <div class="col-12 justify-content-end d-flex fw-bold mt-4">
            Trip Total: $${this.TripTotal}
        </div>

      </div>
      
      </section>
       
        `
    }

    get Reservations() {
        let template = ''
        let reservations = ProxyState.reservations.filter(reservation => reservation.tripId == this.id)
        reservations.forEach(reservation => template += reservation.Template)
        if (template) {
            return template
        } else {
            return '<p>no items yet</p>'
        }
    }

    get TripTotal() {
        let total = 0
        let reservations = ProxyState.reservations.filter(reservation => reservation.tripId == this.id)
        reservations.forEach(reservation => total += reservation.cost)
        return total
    }
}