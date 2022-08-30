import { render, screen } from "@testing-library/react";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import App from "../App";
import Loading from "../components/Loading";
import ResponseModel from "../shared/model/response.model";
import APP_URL from "../shared/const/app-url.const";
import responseMock from "../../__mock__/api.mock.json";

const axiosInstance = axios.create();

describe("App", () => {
  const renderComponent = () => render(<App />);

  let mock: MockAdapter;

  beforeAll(() => {
    mock = new MockAdapter(axiosInstance);
  });

  afterEach(() => {
    mock.reset();
  });

  test("should render loading", async () => {
    await render(<Loading />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  describe("when api is available", () => {
    test("renders loading, then successfully renders app", async () => {
      renderComponent();

      mock.onGet(APP_URL).reply(200, responseMock);

      let error = null;
      try {
        const result = await axiosInstance.get<ResponseModel>(APP_URL);

        expect(mock.history.get[0].url).toEqual(APP_URL);
        expect(result.data).toEqual(responseMock);
      } catch (e) {
        error = e;
      }

      expect(error).toBeFalsy();
    });
  });

  describe("when api is not available", () => {
    test("renders loading, then error", async () => {
      mock.onGet(APP_URL).reply(404);

      let error;
      let apiResponse;

      try {
        apiResponse = await axiosInstance.get<ResponseModel>(APP_URL);
      } catch (e) {
        error = e;
      }

      expect(mock.history.get[0].url).toEqual(APP_URL);
      expect(apiResponse).toBeFalsy();
      expect(error).toBeTruthy();
    });
  });
});
