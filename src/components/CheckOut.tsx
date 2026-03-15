import { BsCalendar } from "react-icons/bs";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../style/datepicker.css";

/** Check-out date picker; state is local (could be lifted to context for booking flow). */
export default function CheckOut() {
  const [endDate, setEndDate] = useState<Date | null>(null);

  return (
    <div className="relative flex items-center justify-end h-full w-full min-w-0">
      <div className="absolute z-10 pr-8">
        <div>
          <BsCalendar className="text-accent text-base" />
        </div>
      </div>
      <DatePicker
        className="w-full h-full"
        selected={endDate}
        placeholderText="Check out"
        onChange={(date) => setEndDate(date)}
        popperPlacement="bottom-start"
      />
    </div>
  );
}
