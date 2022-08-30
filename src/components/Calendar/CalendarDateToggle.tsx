import { Dayjs } from "dayjs";

interface CalendarDateToggleProps {
  activeDate: Dayjs;
  onChangeDate: (instance: Dayjs) => void;
}

function CalendarDateToggle({
  activeDate,
  onChangeDate,
}: CalendarDateToggleProps) {
  function setPreviousMonth() {
    onChangeDate(activeDate.subtract(1, "month"));
  }

  function setNextMonth() {
    onChangeDate(activeDate.add(1, "month"));
  }

  function setPreviousYear() {
    onChangeDate(activeDate.subtract(1, "year"));
  }

  function setNextYear() {
    onChangeDate(activeDate.add(1, "year"));
  }

  return (
    <>
      <div className="inline-flex items-center justify-between space-x-2">
        <button
          id="calendar-prev-month"
          type="button"
          onClick={setPreviousMonth}
          className="rounded text-[#333333] hover:bg-gray-200 hover:text-[#5F9F2F] active:bg-gray-300"
        >
          <svg
            className="stroke-current"
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M20 24L12 16L20 8"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <span className="w-24 text-center font-semibold text-[#333333]">
          {activeDate.format("MMMM")}
        </span>

        <button
          id="calendar-next-month"
          type="button"
          onClick={setNextMonth}
          className="rounded text-[#333333] hover:bg-gray-200 hover:text-[#5F9F2F] active:bg-gray-300"
        >
          <svg
            className="stroke-current"
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 24L20 16L12 8"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      <div className="inline-flex items-center justify-between space-x-2">
        <button
          id="calendar-prev-year"
          onClick={setPreviousYear}
          type="button"
          className="rounded text-[#333333] hover:bg-gray-200 hover:text-[#5F9F2F] active:bg-gray-300"
        >
          <svg
            className="stroke-current"
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M20 24L12 16L20 8"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <span className="w-12 text-center font-semibold text-[#333333]">
          {activeDate.format("YYYY")}
        </span>

        <button
          id="calendar-next-year"
          type="button"
          onClick={setNextYear}
          className="rounded text-[#333333] hover:bg-gray-200 hover:text-[#5F9F2F] active:bg-gray-300"
        >
          <svg
            className="stroke-current"
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 24L20 16L12 8"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </>
  );
}

export default CalendarDateToggle;
