"use client";
import styles from "./pass.module.css";
import { useSeatStore } from "@/stores/seatStore";
import { useFlightStore } from "@/stores/flightStore";
import { usePassengerStore } from "@/stores/passengerStore";

export default function Baggage() {
  // const tickets = mockData

  const tickets = useSeatStore(tickets => tickets.selectedSeats);
  console.log(tickets)

  const start = useFlightStore(state => state.departFlight);
  const end = useFlightStore(state => state.returnFlight);

  const passengers = [
    ...(usePassengerStore(state => state.adult) ?? []),
    ...(usePassengerStore(state => state.child) ?? []),
    ...(usePassengerStore(state => state.infant) ?? [])
  ];

  const departDate = start?.departure.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

  const departTime = start?.departure.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });

  const arriveDate = end?.arrival.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

  const arriveTime = end?.arrival.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });

  
  return (
    <div className={styles.passContainer}>
      {tickets.map((ticket, index) => 
        (
          <div key={index} className={styles.passTicket}>
            <div className={styles.passFlight}>
              <div>
                <h1>{start?.id.split("-")[0]}</h1>
                <h2>{start?.location}</h2>
                <p>{departDate}</p>
                <p>{departTime}</p>
              </div>
              <div>
                <h1>{end?.id.split("-")[0]}</h1>
                <h2>{end?.location}</h2>
                <p>{arriveDate}</p>
                <p>{arriveTime}</p>
              </div>
            </div>
            <div className={styles.passDetails}>
              <div>
                <h3>Class</h3>
                <p>{ticket.type}</p>
              </div>
              <div>
                <h3>Passenger</h3>
                <p>{passengers[index]?.type}</p>
              </div>
            </div>
            <div className={styles.passDetails}>
              <div>
                <h3>Seat</h3>
                <p>{ticket.seatId}</p>
              </div>
              <div>
                <h3>Gate</h3>
                <p>5B</p>
              </div>
              <div>
                <h3>Terminal</h3>
                <p>X</p>
              </div>
            </div>
            <div className={styles.passBarcode}>
              {end?.id.split("-")[1]}
            </div>
          </div>
        )
      )}
    </div>
  );
}
