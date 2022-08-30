import { render } from "@testing-library/react";
import OrderTable from "../components/OrderTable";
import responseMock from "../../__mock__/api.mock.json";
import OrderModel from "../shared/model/order.model";

describe("OrderTable", () => {
  test("no error occured when no data provided", () => {
    const component = render(<OrderTable />);

    expect(component).toBeTruthy();
  });

  test("renders successfully", () => {
    const mockModel = responseMock.data.orders.map((each) =>
      new OrderModel().convert(each)
    );

    const component = render(<OrderTable orders={mockModel} />);

    expect(component).toBeTruthy();
  });
});
