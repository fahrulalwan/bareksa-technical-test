import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import dayjs from "dayjs";
import Calendar from "../components/Calendar";
import CalendarDateToggle from "../components/Calendar/CalendarDateToggle";
import generateRandomNumbers from "../shared/util/generate-random-numbers.util";

describe("Calendar", () => {
  test("renders successfully", () => {
    const component = render(<Calendar onFilter={jest.fn} />);

    expect(component).toBeTruthy();
  });

  test("filter button disabled initially", async () => {
    render(<Calendar onFilter={jest.fn} />);

    fireEvent.click(screen.getByText("Filter"));

    await waitFor(() => screen.getByText("Filter"));

    expect(screen.getByText("Filter")).toBeDisabled();
  });

  describe("month date manipulation", () => {
    test("will go to next month if clicked", () => {
      const today = dayjs();

      const handleChange = jest.fn();

      const { container, getByText } = render(
        <CalendarDateToggle activeDate={today} onChangeDate={handleChange} />
      );

      const nextMonth = today.add(1, "month");

      const prevMonthButton = container.querySelector("#calendar-next-month");

      expect(prevMonthButton).toBeTruthy();

      fireEvent.click(prevMonthButton!);
      expect(handleChange).toHaveBeenCalledTimes(1);

      setTimeout(() => {
        const nextMonthInstance = getByText(nextMonth.format("MMMM"));
        expect(nextMonthInstance).toEqual(nextMonth);
      }, 500);
    });

    test("will go to previous month if clicked", () => {
      const today = dayjs();

      const handleChange = jest.fn();

      const { container, getByText } = render(
        <CalendarDateToggle activeDate={today} onChangeDate={handleChange} />
      );

      const prevMonth = today.subtract(1, "month");

      const prevMonthButton = container.querySelector("#calendar-prev-month");

      expect(prevMonthButton).toBeTruthy();

      fireEvent.click(prevMonthButton!);
      expect(handleChange).toHaveBeenCalledTimes(1);

      setTimeout(() => {
        const prevMonthInstance = getByText(prevMonth.format("MMMM"));
        expect(prevMonthInstance).toEqual(prevMonth);
      }, 500);
    });
  });

  describe("year date manipulation", () => {
    test("will go to next year if clicked", () => {
      const today = dayjs();

      const handleChange = jest.fn();

      const { container, getByText } = render(
        <CalendarDateToggle activeDate={today} onChangeDate={handleChange} />
      );

      const nextYear = today.add(1, "year");

      const nextYearButton = container.querySelector("#calendar-next-year");

      expect(nextYearButton).toBeTruthy();

      fireEvent.click(nextYearButton!);
      expect(handleChange).toHaveBeenCalledTimes(1);

      setTimeout(() => {
        const nextYearInstance = getByText(nextYear.format("YYYY"));
        expect(nextYearInstance).toEqual(nextYear);
      }, 500);
    });

    test("will go to previous year if clicked", () => {
      const today = dayjs();

      const handleChange = jest.fn();

      const { container, getByText } = render(
        <CalendarDateToggle activeDate={today} onChangeDate={handleChange} />
      );

      const prevYear = today.subtract(1, "year");

      const prevYearButton = container.querySelector("#calendar-prev-year");

      expect(prevYearButton).toBeTruthy();

      fireEvent.click(prevYearButton!);
      expect(handleChange).toHaveBeenCalledTimes(1);

      setTimeout(() => {
        const prevYearInstance = getByText(prevYear.format("YYYY"));
        expect(prevYearInstance).toEqual(prevYear);
      }, 500);
    });
  });

  describe("when onFilter is called", () => {
    const today = dayjs();

    const handleChange = jest.fn();

    test("should emit data if start date and end date is selected", async () => {
      const component = render(<Calendar onFilter={handleChange} />);

      let selector1;
      let selector2;

      while (!selector1 && !selector2) {
        const randomNumber1 = generateRandomNumbers(1, today.daysInMonth());
        const randomNumber2 = generateRandomNumbers(1, today.daysInMonth());

        if (randomNumber1 === randomNumber2) {
          // eslint-disable-next-line no-continue
          continue;
        }

        selector1 = component.getByText(
          generateRandomNumbers(1, today.daysInMonth())
        );

        selector2 = component.getByText(
          generateRandomNumbers(1, today.daysInMonth())
        );

        fireEvent.click(screen.getByText(selector1.innerHTML));
        fireEvent.click(screen.getByText(selector2.innerHTML));
      }

      fireEvent.click(screen.getByText("Filter"));

      await waitFor(() => screen.getByText("Filter"));

      expect(handleChange).toHaveBeenCalledTimes(1);
    });

    test("should not emit data if only start date is selected", async () => {
      const component = render(<Calendar onFilter={handleChange} />);

      expect(component).toBeTruthy();

      fireEvent.click(screen.getByText("Filter"));

      await waitFor(() => screen.getByText("Filter"));

      expect(screen.getByText("Filter")).toBeDisabled();

      expect(handleChange).not.toHaveBeenCalled();
    });
  });
});
