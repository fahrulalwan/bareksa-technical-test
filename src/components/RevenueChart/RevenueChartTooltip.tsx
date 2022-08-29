import OrderModel from "../../shared/model/order.model";

interface RevenueChartTooltipProps {
  active?: boolean;
  payload?: { payload?: OrderModel }[];
}

const defaultProps: RevenueChartTooltipProps = {
  active: false,
  payload: [],
};

function RevenueChartTooltip({
  active,
  payload: response,
}: RevenueChartTooltipProps) {
  if (active) {
    const { payload } = response?.[0] || { payload: null };
    return (
      <div
        className="space-y-3 rounded-lg bg-white/90 p-3 drop-shadow-md"
        tabIndex={-1}
      >
        <p className="text-xs font-bold">
          {payload?.dueDate?.format("DD MMMM YYYY")}
        </p>
        <div className="text-xs">
          <p>Conversion Revenue:</p>
          <p className="font-bold">${payload?.conversionRevenue}</p>
        </div>
      </div>
    );
  }

  return null;
}

RevenueChartTooltip.defaultProps = defaultProps;

export default RevenueChartTooltip;
