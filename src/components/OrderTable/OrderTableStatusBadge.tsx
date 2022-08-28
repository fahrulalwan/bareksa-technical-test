import { OrderStatus } from "../../shared/model/order.model";

interface OrderTableStatusBadgeProps {
  status: OrderStatus;
}

function OrderTableStatusBadge({ status }: OrderTableStatusBadgeProps) {
  let styling;

  switch (status) {
    case "Pending":
      styling = "bg-[#E59849]";
      break;
    case "Completed":
      styling = "bg-[#789764]";
      break;
    case "Canceled":
      styling = "bg-[#D66D4B]";
      break;
    default:
      styling = "";
  }

  return (
    <span
      className={`inline-block w-24 rounded-md py-1 text-center text-xs font-light tracking-wide text-white ${styling}`}
    >
      {status}
    </span>
  );
}

export default OrderTableStatusBadge;
