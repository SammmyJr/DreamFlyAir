"use server";

import styles from "./page.module.css";

import { CalendarIcon, SewingPinFilledIcon, MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { Increment, Input } from "@/components/form";
import { Deal } from "@/components/ui";
import Image from "next/image";

import FlightCalendar from "./_options/FlightCalendar";
import { getFlights } from "./actions";
import Airports from "./_components/Airports";
import HomeForm from "./_components/HomeForm";

const magIcon = <SewingPinFilledIcon width="24px" height="24px" />;
const calIcon = <CalendarIcon width="24px" height="24px" />;

export default async function Home() {
  const flights = await getFlights();

  return (
    <main className={styles.main}>
      <h1 className={styles.heading}>Your Destination Awaits</h1>
      <Image
        className="background"
        src="/images/pietro.webp"
        alt=""
        width={3461}
        height={2306}
        priority
      />

      <div className={styles.card}>
        <HomeForm className={styles.form}>
          {/* <Form action="/booking/flight" className={styles.form}> */}
          <div className={styles.formRow}>
            <Input name="location" label="From" icon={magIcon} placeholder="Current">
              <Airports />
            </Input>

            <Input name="destination" label="To" icon={magIcon} placeholder="Where?">
              <Airports />
            </Input>

            <Input name="date" label="Date" placeholder="When?" icon={calIcon} disabled>
              <FlightCalendar />
            </Input>
          </div>

          <div className={styles.itemRow}>
            <span className={styles.itemRow}>
              <Increment name="adult" label="Adults" />
              <Increment name="children" label="Children" />
              <Increment name="infant" label="Infants" />
            </span>

            <button className={styles.submit} type="submit">
              <MagnifyingGlassIcon width="24px" height="24px" />
            </button>
          </div>
        </HomeForm>

        {/* </Form> */}
      </div>

      <section className={styles.featuredContainer}>
        <h2 className={styles.featuredHeading}>Featured deals</h2>
        <div className={styles.featured}>
          {flights.map(flight => (
            <Deal key={flight.id} flight={flight} />
          ))}
        </div>
      </section>
    </main>
  );
}
