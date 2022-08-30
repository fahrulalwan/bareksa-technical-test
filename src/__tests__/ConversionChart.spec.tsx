import { render } from "@testing-library/react";
import ConversionChart from "../components/ConversionChart";
import responseMock from "../../__mock__/api.mock.json";
import OrderModel from "../shared/model/order.model";

describe("ConversionChart", () => {
  test("renders successfully", () => {
    const mockModel = responseMock.data.orders.map((each) =>
      new OrderModel().convert(each)
    );

    const component = render(<ConversionChart orders={mockModel} />);

    expect(component).toBeTruthy();
  });
});
