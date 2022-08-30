import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { useCallback, useEffect, useState } from "react";
import OrderModel from "../../shared/model/order.model";
import ConversionChartLegend from "./ConversionChartLegend";
import ConversionChartTooltip from "./ConversionChartTooltip";

interface ConversionChartProps {
  orders?: OrderModel[];
}

const defaultProps: ConversionChartProps = {
  orders: [],
};

const pieColors = ["#5C8F94", "#EBA45E", "#725E9C", "#E4EAEB"];

function ConversionChart({ orders }: ConversionChartProps) {
  const [formattedOrders, setFormattedOrders] = useState<
    { name: string; value: number }[]
  >([]);

  const formatOrders = useCallback(() => {
    const formattedArrayOrders = (orders || []).reduce((acc, curr) => {
      if (!acc[curr.conversionItem]) {
        acc[curr.conversionItem] = 0;
      }

      if (Object.hasOwn(acc, curr.conversionItem)) {
        acc[curr.conversionItem] += curr.conversionRevenue;
      }
      return acc;
    }, {} as Record<string, number>);

    const arrayedOrders = Object.entries<number>(formattedArrayOrders).map(
      ([key, value]) => ({
        name: key,
        value,
      })
    );

    setFormattedOrders(arrayedOrders);
  }, [orders]);

  useEffect(() => formatOrders(), [formatOrders]);

  return (
    <div className="rounded border p-4">
      <div className="flex items-center justify-between">
        <p className="text-xl font-extrabold">Conversion</p>

        <button
          type="button"
          className="ml-5 rounded border p-2 hover:bg-gray-200 active:bg-gray-300"
        >
          <img src="/icon/menu-more.svg" alt="more" />
        </button>
      </div>

      <div className="mt-3">
        <ResponsiveContainer
          width="100%"
          height="100%"
          minWidth={300}
          minHeight={300}
          debounce={200}
        >
          <PieChart className="mx-auto">
            <Pie
              data={formattedOrders}
              cx="50%"
              cy="50%"
              strokeWidth={0}
              dataKey="value"
              legendType="circle"
            >
              {formattedOrders?.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={pieColors[index % pieColors.length]}
                  height={Number(entry.value)}
                />
              ))}
            </Pie>
            <Tooltip content={<ConversionChartTooltip />} offset={-30} />
            <Legend
              verticalAlign="bottom"
              content={<ConversionChartLegend />}
              iconSize={10}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

ConversionChart.defaultProps = defaultProps;

export default ConversionChart;
