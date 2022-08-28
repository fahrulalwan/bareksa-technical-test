import OrderModel from "../shared/model/order.model";

interface OrderTableProps {
  orders: OrderModel[];
}

function OrderTable({ orders }: OrderTableProps) {
  return <div className="flex-1 rounded border px-4 py-5">asd</div>;
}

export default OrderTable;
