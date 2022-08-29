import OrderModel from "../../shared/model/order.model";
import OrderTableStatusBadge from "./OrderTableStatusBadge";

interface OrderTableProps {
  orders?: OrderModel[];
}

const defaultProps: OrderTableProps = {
  orders: [],
};

function OrderTable({ orders }: OrderTableProps) {
  return (
    <div className="flex-1 overflow-x-auto px-4 py-5">
      <h2 className="text-2xl font-bold text-[#333333]">Orders</h2>

      <div className="overflow-x-auto">
        <table className="mt-6 w-full table-fixed text-left font-encode text-sm">
          <thead>
            <tr className="border-b-2 border-black/25">
              <th className="w-28 bg-[#F8F8F8] py-4 px-2 font-semibold text-[#333333]">
                Order Number
              </th>
              <th className="w-40 bg-[#F8F8F8] py-4 px-2 font-semibold text-[#333333]">
                Status
              </th>
              <th className="w-56 bg-[#F8F8F8] py-4 px-2 font-semibold text-[#333333]">
                Operator
              </th>
              <th className="w-56 bg-[#F8F8F8] py-4 px-2 font-semibold text-[#333333]">
                Location
              </th>
              <th className="w-32 bg-[#F8F8F8] py-4 px-2 font-semibold text-[#333333]">
                Start Date
              </th>
              <th className="w-32 bg-[#F8F8F8] py-4 px-2 font-semibold text-[#333333]">
                Due Date
              </th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {orders?.map((each) => (
              <tr key={each.orderId} className="hover:bg-[#EFF7FF]">
                <td className="py-4 px-2">#{each.orderId.substring(32)}</td>
                <td className="py-4 px-2">
                  <OrderTableStatusBadge status={each.status} />
                </td>
                <td className="py-4 px-2">{each.fullName}</td>
                <td className="py-4 px-2">{each.location}</td>
                <td className="py-4 px-2">
                  {each.startDate?.format("DD/MM/YY HH:mm")}
                </td>
                <td className="py-4 px-2">
                  {each.dueDate?.format("DD/MM/YY HH:mm")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

OrderTable.defaultProps = defaultProps;

export default OrderTable;
