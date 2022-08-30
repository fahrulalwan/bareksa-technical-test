import { render } from "@testing-library/react";
import UsersChart from "../components/UsersChart";
import UserCategoryModel from "../shared/model/user-category.model";

describe("UsersChart", () => {
  test("renders successfully without data", () => {
    const component = render(<UsersChart />);

    expect(component).toBeTruthy();
  });

  test("renders Chart", () => {
    const mockModel = new UserCategoryModel();
    mockModel.conservative = 250;
    mockModel.moderate = 250;
    mockModel.riskAverse = 250;
    mockModel.riskTaker = 250;

    const component = render(<UsersChart userCategory={mockModel} />);

    expect(component).toBeTruthy();
  });
});
