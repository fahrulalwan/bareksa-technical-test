import { useEffect, useState } from "react";
import { Dayjs } from "dayjs";

interface CalendarDateListProps {
  activeDate: Dayjs;
  dateRange: (Dayjs | null)[];
  onChangeDateRange: (instance: (Dayjs | null)[]) => void;
}

const Days = ["S", "M", "T", "W", "T", "F", "S"];

function CalendarDateList({
  onChangeDateRange,
  dateRange,
  activeDate,
}: CalendarDateListProps) {
  const [dateList, setDateList] = useState<Array<number | null>>([]);

  useEffect(() => {
    const firstDayOfMonth = activeDate.startOf("month").day();

    const dateMonthSize = firstDayOfMonth + activeDate.daysInMonth();

    const monthDateRange = Array.from({ length: dateMonthSize }).map(
      (_, index) => {
        const startingDate = index + 1;

        if (startingDate <= firstDayOfMonth) {
          return null;
        }

        return startingDate - firstDayOfMonth;
      }
    );

    setDateList(monthDateRange);
  }, [activeDate, setDateList]);

  function assignDateRange(date: number | null) {
    if (!date) {
      return;
    }

    const newData = activeDate.set("date", date);

    let futureState: Array<Dayjs | null> = [null, null];

    if (dateRange[0] && dateRange[1]) {
      futureState = [newData, null];
    } else if (!dateRange[0]) {
      futureState = [newData, null];
    } else if (!dateRange[1]) {
      futureState = [dateRange[0], newData].sort(
        (a, b) =>
          (a?.toDate().valueOf() || NaN) - (b?.toDate().valueOf() || NaN)
      );
    }

    onChangeDateRange(futureState);
  }

  return (
    <>
      <ul className="mt-2 flex items-center border-b text-xs font-semibold text-[#9C9C9C]">
        {Days.map((day, index) => (
          <li className="p-5 text-center" key={String(index)}>
            {day}
          </li>
        ))}
      </ul>

      <div className="my-5 grid grid-cols-7 text-center font-semibold text-[#333333]">
        {dateList.map((each, index) => {
          const isStartDate =
            activeDate.year() === dateRange[0]?.year() &&
            activeDate.month() === dateRange[0]?.month() &&
            each === dateRange[0]?.date();

          const isEndDate =
            activeDate.year() === dateRange[1]?.year() &&
            activeDate.month() === dateRange[1]?.month() &&
            each === dateRange[1]?.date();

          const dateInstance = each ? activeDate.set("date", each) : null;

          const isWithinRange =
            (dateInstance?.toDate().valueOf() || NaN) >=
              (dateRange[0]?.toDate().valueOf() || NaN) &&
            (dateInstance?.toDate().valueOf() || NaN) <=
              (dateRange[1]?.toDate().valueOf() || NaN);

          const isRangeSelected = isStartDate || isEndDate;

          return (
            <button
              key={activeDate.year() + activeDate.month() + index}
              disabled={!each}
              onClick={() => assignDateRange(each)}
              type="button"
              className="relative"
            >
              <span
                className={`mx-auto block ${
                  isWithinRange &&
                  `after:absolute after:inset-y-0 ${
                    isStartDate ? "after:right-0" : "after:left-0"
                  } after:z-[-10] after:bg-[#E0DBEB]`
                } ${
                  isWithinRange && isRangeSelected
                    ? "after:w-1/2"
                    : "after:w-full"
                } ${
                  (index % 7 === 0 || each === 1) &&
                  !isStartDate &&
                  "after:rounded-l-full"
                } ${
                  (index % 7 === 6 || index === dateList.length - 1) &&
                  !isEndDate &&
                  "after:rounded-r-full"
                }`}
              >
                <span
                  className={`z-10 mx-auto flex h-10 w-10 items-center justify-center rounded-full ${
                    isRangeSelected
                      ? "bg-[#8772B0] text-white"
                      : `text-[#333333] ${
                          each && "hover:bg-gray-200 active:bg-gray-300"
                        }`
                  }`}
                >
                  {each}
                </span>
              </span>
            </button>
          );
        })}
      </div>
    </>
  );
}

export default CalendarDateList;
