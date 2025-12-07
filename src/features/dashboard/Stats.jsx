import {
  Banknote,
  Briefcase,
  Calendar,
  CalendarDays,
  ChartBar,
  DollarSign,
} from "lucide-react";
import Stat from "./Stat";
import { formatCurrency } from "../../utils/helpers";

function Stats({ bookings, confirmedStays, numOfDays, numOfCabins }) {
  const numBookings = bookings.length;
  const sales = bookings.reduce((acc, cur) => acc + cur.totalPrice, 0);
  const checkins = confirmedStays.length;
  const occupation =
    confirmedStays.reduce((cur, acc) => cur + acc.numOfNights, 0) /
    (numOfDays * numOfCabins);
  return (
    <>
      <Stat
        title="Bookings"
        color="blue"
        icon={<Briefcase />}
        value={numBookings}
      />

      <Stat
        title="Sales"
        color="green"
        icon={<Banknote />}
        value={formatCurrency(sales)}
      />

      <Stat
        title="Check ins"
        color="indigo"
        icon={<CalendarDays />}
        value={checkins}
      />

      <Stat
        title="Occupancy Rate"
        color="yellow"
        icon={<ChartBar />}
        value={Math.round(occupation * 100) + "%"}
      />
    </>
  );
}

export default Stats;
