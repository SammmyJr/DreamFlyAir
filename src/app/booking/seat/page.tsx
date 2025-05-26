'use client';

import styles from "./seat.module.css";
import SeatBooking from "components/seat/SeatBooking";
import { useFlightStore } from "@/stores/flightStore";

export default function SeatPage() {
  // Pre-determined booked seats that are unavailable
  const bookedSeats = ["1A", "1F", "3C", "3D", "5A", "5B", "7E", "7F", "9B", "9E"];

  const departFlight = useFlightStore(state => state.departFlight);



  const date = departFlight?.departure;
  const departureTime = date
    ? date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }) + ' • ' + date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    })
    : '';

  //add this later
  const start = departFlight?.location;
  const end = departFlight?.destination;

  const departFlightCode = departFlight?.id.split("-")[0];

  const getLocationName = (locId: string | undefined) => {
    switch (locId) {
      case "SYD": return "Sydney";
      case "MEL": return "Melbourne";
      case "BNE": return "Brisbane";
      case "PER": return "Perth";
      case "ADL": return "Adelaide";
      case "CBR": return "Canberra";
      case "HBA": return "Hobart";
      case "OOL": return "Gold Coast";
      case "CNS": return "Cairns";
    }
  }
  return (
    <section className={styles.container}>
      <h1 className={styles.title}>Seat Selection</h1>
      <div className={styles.flightDetails}>
        <p>
          Flight: {departFlightCode} • {getLocationName(start)} ({start}) → {getLocationName(end)} ({end}) • {departureTime}
        </p>
      </div>
      <div className={styles.flightInfo}>
        <span className={styles.seats}>
          <span className={styles.firstClass}></span>First Class $49.99
        </span>
        <span className={styles.seats}>
          <span className={styles.business}></span>Business $39.99
        </span>
        <span className={styles.seats}>
          <span className={styles.economy}></span>Economy $29.99
        </span>
        <span className={styles.seats}>
          <span className={styles.selected}></span>Selected
        </span>
        <span className={styles.seats}>
          <span className={styles.unavailable}></span>Unavailable
        </span>
      </div>

      <SeatBooking rows={30} bookedSeats={bookedSeats} />
    </section>
  );
}
