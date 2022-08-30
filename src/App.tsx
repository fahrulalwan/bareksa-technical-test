import "./App.css";
import { lazy, Suspense, useCallback, useEffect, useState } from "react";
import axios from "axios";
import { Dayjs } from "dayjs";
import Container from "./container/Container";
import Loading from "./components/Loading";
import APP_URL from "./shared/const/app-url.const";
import ResponseModel from "./shared/model/response.model";
import OrderModel from "./shared/model/order.model";

const ConversionChart = lazy(
  () => import("./components/ConversionChart/index")
);
const UsersChart = lazy(() => import("./components/UsersChart/index"));
const RevenueChart = lazy(() => import("./components/RevenueChart/index"));
const Calendar = lazy(() => import("./components/Calendar/index"));
const OrderTable = lazy(() => import("./components/OrderTable/index"));

function App() {
  const [response, setResponse] = useState<ResponseModel | null>(null);
  const [filteredOrders, setFilteredOrders] = useState<OrderModel[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(() => {
    axios
      .get<ResponseModel>(APP_URL)
      .then(({ data }) => {
        const responseModel = new ResponseModel().convert(data);

        setResponse(responseModel);
        setFilteredOrders(responseModel.data.orders);
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => fetchData, [fetchData]);

  function filterOrders(params: (Dayjs | null)[]) {
    let [startDate, dueDate] = params;

    if (startDate && dueDate) {
      startDate = startDate
        .set("hour", 0)
        .set("minute", 0)
        .set("second", 0)
        .set("millisecond", 0);
      dueDate = dueDate
        .set("hour", 0)
        .set("minute", 0)
        .set("second", 0)
        .set("millisecond", 0);

      const newResponse =
        response?.data.orders.filter(
          (each) =>
            (each.startDate?.valueOf() || NaN) >=
              (startDate?.toDate().valueOf() || NaN) &&
            (each.dueDate?.valueOf() || NaN) >=
              (dueDate?.toDate().valueOf() || NaN)
        ) || [];

      setFilteredOrders(newResponse);
    } else {
      setFilteredOrders(response?.data.orders || []);
    }
  }

  return (
    <Container>
      {loading ? (
        <Loading />
      ) : (
        <Suspense fallback={<Loading />}>
          <section className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
            <ConversionChart orders={response?.data.orders} />
            <UsersChart userCategory={response?.data.userCategory} />
            <RevenueChart orders={response?.data.orders} />
          </section>
          <section className="mt-4 flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
            <Calendar onFilter={(data) => filterOrders(data)} />
            <OrderTable orders={filteredOrders.slice(0, 5)} />
          </section>
        </Suspense>
      )}
    </Container>
  );
}

export default App;
