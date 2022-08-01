import { Reservation } from "./Models/Reservation.js"
import { Trip } from "./Models/Trip.js"
import { EventEmitter } from "./Utils/EventEmitter.js"
import { isValidProp } from "./Utils/isValidProp.js"



class AppState extends EventEmitter {
  /** @type {import('./Models/Value').Value[]} */
  values = []

  /** @type {import('./Models/Trip').Trip[]} */
  trips = [
    new Trip({
      trip: 'Hawaii',
      date: '07-30-2022'
    })
  ]

  /** @type {import('./Models/Reservation').Reservation[]} */
  reservations = [
    new Reservation({
      type: 'Hotel',
      name: 'Billy Bob',
      confirmation: 'BBAP2022',
      address: 'Meridian, Idaho 83605',
      date: '07-30-2022',
      cost: 500,
      note: 'Window seat please',
      tripId: '62e2cdf8de3691bbde7e24b7'
    })
  ]
}


export const ProxyState = new Proxy(new AppState(), {
  get(target, prop) {
    isValidProp(target, prop)
    return target[prop]
  },
  set(target, prop, value) {
    isValidProp(target, prop)
    target[prop] = value
    target.emit(prop, value)
    return true
  }
})

