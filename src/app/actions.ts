"use server";

import flightReviver from "@/utils/flightReviver";
import Flight from "@/types/Flight";
import Airport from "@/types/Airport";
import { sql } from "@/database";
import path from "path";

export async function getFlights(): Promise<Array<Flight>> {
  const flights = await sql`
  SELECT 
    flight_id AS id,
    source_airport_id AS location,
    destination_airport_id AS destination,
    departure_time AS departure,
    arrival_time AS arrival,
    plane_type_id AS plane,
    price AS price
  FROM flight_details
  ORDER BY RANDOM()
  LIMIT 6
  `;

  return flights.map((row) => ({
    ...row,
    departure: new Date(row.departure),
    arrival: new Date(row.arrival),
  })) as Array<Flight>
  // const data = await fetch(process.env.API_URL!, { cache: "force-cache" });
  // const text = await data.text();
  // return await JSON.parse(text, flightReviver);
}

export async function getAirports(): Promise<Array<Airport>> {
  const url = `${process.env.API_URL}/airport`;
  const data = await fetch(url, { cache: "force-cache" });
  return await data.json();
}
