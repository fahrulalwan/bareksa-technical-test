import { render } from "@testing-library/react";
import RevenueChart from "../components/RevenueChart";
import responseMock from "../../__mock__/api.mock.json";
import OrderModel from "../shared/model/order.model";

describe("RevenueChart", () => {
  test("renders successfully", () => {
    const mockModel = responseMock.data.orders.map((each) =>
      new OrderModel().convert(each)
    );

    const component = render(<RevenueChart orders={mockModel} />);

    expect(component).toBeTruthy();
  });

  test("total revenue sum correctly", async () => {
    const mockModel = responseMock.data.orders.map((each) =>
      new OrderModel().convert(each)
    );

    const component = await render(<RevenueChart orders={mockModel} />);

    const sumRevenue = mockModel.reduce(
      (acc, curr) => acc + curr.conversionRevenue,
      0
    );

    setTimeout(() => {
      const total = component.container.querySelector("#revenueChart-total");
      expect(total?.innerHTML).toEqual(`$${sumRevenue}`);
    }, 1000);
  });
});
