import { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import CalendarDateToggle from "./CalendarDateToggle";
import CalendarDateList from "./CalendarDateList";

interface CalendarProps {
  onFilter: (dateRange: (Dayjs | null)[]) => void;
}

function Calendar({ onFilter }: CalendarProps) {
  const [activeDate, setActiveDate] = useState<Dayjs>(dayjs());
  const [selectedDateRange, setSelectedDateRange] = useState<(Dayjs | null)[]>(
    []
  );

  function updateDate(instance: Dayjs) {
    setActiveDate(instance);
  }

  return (
    <div className="rounded border px-4 py-5">
      <div className="flex items-center justify-between space-x-10">
        <CalendarDateToggle
          activeDate={activeDate}
          onChangeDate={(instance) => updateDate(instance)}
        />
      </div>

      <CalendarDateList
        activeDate={activeDate}
        dateRange={selectedDateRange}
        onChangeDateRange={(date) => setSelectedDateRange(date)}
      />

      <div className="mt-5 flex justify-center space-x-3">
        <button
          type="button"
          className="w-28 rounded-md border border-[#E5E5E5] py-1.5 font-semibold"
        >
          Cancel
        </button>
        <button
          type="button"
          disabled={selectedDateRange.every((each) => !each)}
          onClick={() => onFilter(selectedDateRange)}
          className="w-28 rounded-md border bg-[#82C341] py-1.5 font-semibold"
        >
          Filter
        </button>
      </div>
    </div>
  );
}

export default Calendar;
