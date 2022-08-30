import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useCallback, useEffect, useRef, useState } from "react";
import OrderModel from "../../shared/model/order.model";
import RevenueChartTooltip from "./RevenueChartTooltip";

interface RevenueChartProps {
  orders?: OrderModel[];
}

const defaultProps: RevenueChartProps = {
  orders: [],
};

function RevenueChart({ orders }: RevenueChartProps) {
  const [formattedOrders, setFormattedOrders] = useState<OrderModel[]>([]);

  const ref = useRef<HTMLDivElement>(null);

  const formatOrders = useCallback(() => {
    const sortedOrders = (orders || [])
      .sort((a, b) => (a.dueDate?.valueOf() || 0) - (b.dueDate?.valueOf() || 0))
      .reduce((acc, futureModel, index) => {
        if (!index) {
          acc.push(futureModel);

          return acc;
        }

        const currentModel = acc[acc.length - 1];

        if (
          currentModel.dueDate?.format("YYYY-MM-DD") ===
          futureModel.dueDate?.format("YYYY-MM-DD")
        ) {
          currentModel.conversionRevenue += futureModel.conversionRevenue;

          return acc;
        }

        acc.push(futureModel);
        return acc;
      }, [] as OrderModel[]);

    setFormattedOrders(sortedOrders);
  }, [orders]);

  useEffect(() => {
    return formatOrders;
  }, [formatOrders]);

  return (
    <div className="flex-1 rounded border p-4">
      <div className="flex items-center justify-between">
        <p className="text-xl font-extrabold">Revenue</p>

        <button
          type="button"
          className="ml-5 inline-flex items-center rounded border px-3 py-2 hover:bg-gray-200 active:bg-gray-300"
        >
          <span className="text-sm font-semibold">
            {formattedOrders?.at(0)?.dueDate?.format?.("MMM")} -{" "}
            {formattedOrders
              ?.at(formattedOrders.length - 1)
              ?.dueDate?.format?.("MMM YYYY")}
          </span>
          <img src="/icon/calendar.svg" alt="calendar" className="ml-2" />
        </button>
      </div>

      <div ref={ref} className="mt-5">
        <ResponsiveContainer
          width="100%"
          height="100%"
          minWidth={200}
          minHeight={200}
          debounce={200}
        >
          <AreaChart data={formattedOrders}>
            <defs>
              <linearGradient id="greenGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="1%" stopColor="#789764" stopOpacity={0.65} />
                <stop offset="99%" stopColor="#FFFFFF" />
              </linearGradient>
            </defs>
            <XAxis type="category" dataKey="dueDate" />
            <YAxis type="number" dataKey="conversionRevenue" />
            <CartesianGrid horizontal={false} stroke="#E5E5E5" />
            <Tooltip
              content={(param) => (
                <RevenueChartTooltip
                  active={param.active}
                  payload={param.payload}
                />
              )}
            />
            <Area
              type="basis"
              dataKey="conversionRevenue"
              stroke="#789764"
              strokeWidth={2}
              fillOpacity={1}
              fillRule="nonzero"
              fill="url(#greenGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-2">
        <p className="text-xs font-semibold tracking-wide text-[#9C9C9C]">
          Total Revenue
        </p>
        <p
          className="text-2xl font-bold text-[#333333]"
          id="revenueChart-total"
        >
          $
          {formattedOrders?.reduce(
            (acc, curr) => acc + curr.conversionRevenue,
            0
          )}
        </p>
        <div className="mt-1 flex items-center text-xs font-medium text-[#5F9F2F]">
          <img
            src="/icon/arrow-up.svg"
            alt="increased revenue"
            className="mr-1.5"
          />
          7.00%
        </div>
      </div>
    </div>
  );
}

RevenueChart.defaultProps = defaultProps;

export default RevenueChart;
