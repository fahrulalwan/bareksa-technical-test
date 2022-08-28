import "./App.css";
import { lazy, Suspense, useEffect, useState } from "react";
import axios from "axios";
import { Dayjs } from "dayjs";
import Container from "./container/Container";
import Loading from "./components/Loading";
import APP_URL from "./shared/const/app-url.const";
import ResponseModel from "./shared/model/response.model";
import OrderModel from "./shared/model/order.model";

const ConversionChart = lazy(() => import("./components/ConversionChart"));
const Calendar = lazy(() => import("./components/Calendar/index"));
const OrderTable = lazy(() => import("./components/OrderTable/index"));

function App() {
  const [response, setResponse] = useState<ResponseModel | null>(null);
  const [filteredOrders, setFilteredOrders] = useState<OrderModel[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchData() {
    const res = await axios.get(APP_URL);
    setResponse(new ResponseModel().convert(res.data));
    setLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, []);

  function filterOrders(params: (Dayjs | null)[]) {
    let [startDate, endDate] = params;

    if (startDate && endDate) {
      startDate = startDate
        .set("hour", 0)
        .set("minute", 0)
        .set("second", 0)
        .set("millisecond", 0);
      endDate = endDate
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
              (endDate?.toDate().valueOf() || NaN)
        ) || [];

      console.log("newResponse", newResponse);

      setFilteredOrders(newResponse);
    }
  }

  return (
    <Container>
      {loading ? (
        <Loading />
      ) : (
        <Suspense fallback={<Loading />}>
          <section className="flex flex-col space-x-4 md:flex-row">
            <ConversionChart orders={response} />
          </section>
          <section className="mt-4 flex flex-col space-x-2 md:flex-row">
            <Calendar onFilter={(data) => filterOrders(data)} />
            <OrderTable
              orders={
                filteredOrders.length
                  ? filteredOrders.slice(0, 5)
                  : response?.data.orders.slice(0, 5) || []
              }
            />
          </section>
        </Suspense>
      )}
    </Container>
  );
}

export default App;
