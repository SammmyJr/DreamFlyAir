"use client";
import styles from "./payment.module.css";
import { useSeatStore } from "@/stores/seatStore";
import { useBaggageStore } from "@/stores/baggageStore";
import Continue from "../_components/Continue";

export default function Baggage() {

  const tickets = useSeatStore(tickets => tickets.selectedSeats);
  const baggageDepart = useBaggageStore(baggage => baggage.depart);
  const baggageReturn = useBaggageStore(baggage => baggage.return);

  const mockData = {
    drinks: [
      { name: "Whisky", count: 3, price: 120 },
      { name: "Beer", count: 16, price: 460 },
    ],
    food: [{ name: "Wagyu Burger", count: 99, price: 69 }],
  };
  const ticketTotal = tickets.reduce((sum, ticket) => sum + ticket.price, 0);
  const baggageTotal = baggageDepart.reduce((sum, bag) => sum + bag.price, 0) + baggageReturn.reduce((sum, bag) => sum + bag.price, 0);
  // const drinksTotal = mockData.drinks.reduce((sum, drink) => sum + drink.price, 0);
  // const foodTotal = mockData.drinks.reduce((sum, food) => sum + food.price, 0);

  const drinksTotal = 0;
  const foodTotal = 0;

  // No idea what the tax should be lol
  const taxTotal = (((ticketTotal + drinksTotal + baggageTotal + foodTotal) / 100) * 12).toFixed(2);

  const finalTotal = parseFloat((ticketTotal + drinksTotal + foodTotal + baggageTotal + parseFloat(taxTotal)).toFixed(2));

  return (
    <div className={styles.splitSection}>
      <section className={styles.details}>
        <div>
          <div className={styles.detailBreakup}>
            <h1 className={styles.heading2}>Tickets</h1>
            <h1 className={styles.heading2}>${ticketTotal.toFixed(2)}</h1>
          </div>
          {tickets.map((ticket, index) => (
            <div key={index} className={styles.detailsItem}>
              <p>{ticket.type}</p>
              <p>{ticket.seatId}</p>
              <p>${ticket.price}</p>
            </div>
          ))}
        </div>

        <div>
          <div className={styles.detailBreakup}>
            <h1 className={styles.heading2}>Baggage</h1>
            <h1 className={styles.heading2}>${baggageTotal}</h1>
          </div>
          <h2>Departing</h2>
          {baggageDepart.map((baggage, index) => (
            <div key={index} className={styles.detailsItem}>
              <p>{baggage.type}</p>
              <p>{baggage.weight} kg</p>
              <p>${baggage.price}</p>
            </div>
          ))}
          <h2>Returning</h2>
          {baggageReturn.map((baggage, index) => (
            <div key={index} className={styles.detailsItem}>
              <p>{baggage.type}</p>
              <p>{baggage.weight} kg</p>
              <p>${baggage.price}</p>
            </div>
          ))}
        </div>

        {/* <div>
          <div className={styles.detailBreakup}>
            <h1 className={styles.heading2}>Beverages</h1>
            <h2 className={styles.heading2}>$100</h2>
          </div>
          {mockData.food.map((food, index) => (
            <div key={index} className={styles.detailsItem}>
              <p>{food.name}</p>
              <p>x{food.count}</p>
              <p>${food.price}</p>
            </div>
          ))}
        </div>

        <div>
          <div className={styles.detailBreakup}>
            <h1 className={styles.heading2}>Food</h1>
            <h1 className={styles.heading2}>$100</h1>
          </div>
          {mockData.drinks.map((drink, index) => (
            <div key={index} className={styles.detailsItem}>
              <p>{drink.name}</p>
              <p>x{drink.count}</p>
              <p>${drink.price}</p>
            </div>
          ))}
        </div> */}

        <div className={styles.detailBreakup}>
          <h1 className={styles.heading2}>Tax</h1>
          <h1 className={styles.heading2}>${taxTotal}</h1>
        </div>

        <div className={styles.detailBreakup}>
          <h1 className={styles.heading1}>Total</h1>
          <h1 className={styles.heading1}>${finalTotal}</h1>
        </div>
      </section>

      <section className={styles.payment}>
        <h2 className={styles.heading2}>Payment</h2>
        <p>Payment amount</p>
        <h1>${finalTotal}</h1>
        <form action="uhhh" className={styles.paymentForm}>
          <label className={styles.paymentDetails}>
            <p>Name on card</p>
            <input type="text" name="name" />
          </label>

          <label className={styles.paymentDetails}>
            <p>Card number</p>
            <input type="text" name="card" />
          </label>

          <div className={styles.expiryAndCode}>
            <div>
              <p>Expiry Date</p>
              <input type="input" name="expiry" placeholder="MM / YY" />
            </div>

            <div>
              <p>Security Code</p>
              <input type="password" name="code" />
            </div>
          </div>

          <label className={styles.paymentDetails}>
            <p>ZIP/Postal code</p>
            <input type="text" name="zip" />
          </label>

          <Continue price={finalTotal} link="./pass" />                  
        </form>
      </section>
    </div>
  );
}
