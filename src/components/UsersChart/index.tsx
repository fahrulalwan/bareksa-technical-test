import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import UserCategoryModel from "../../shared/model/user-category.model";
import splitCamelCaseToString from "../../shared/util/split-camel-case-to-capital.util";
import UsersChartTooltip from "./UsersChartTooltip";
import UsersChartLegend from "./UsersChartLegend";

interface UsersChartProps {
  userCategory?: UserCategoryModel | Record<string, any>;
}

const defaultProps: UsersChartProps = {
  userCategory: {},
};

const pieColors = ["#5C8F94", "#EBA45E", "#725E9C", "#E4EAEB"];

function Index({ userCategory }: UsersChartProps) {
  const formattedCategory = Object.entries(userCategory || {}).map(
    ([key, value]) => ({
      name: splitCamelCaseToString(key),
      value,
    })
  );

  return (
    <div className="rounded border p-4">
      <div className="flex items-center justify-between">
        <p className="text-xl font-extrabold">Users</p>

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
              data={formattedCategory}
              cx="50%"
              cy="50%"
              strokeWidth={0}
              dataKey="value"
              legendType="circle"
            >
              {formattedCategory.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={pieColors[index % pieColors.length]}
                  height={entry.value}
                />
              ))}
            </Pie>
            <Tooltip content={<UsersChartTooltip />} offset={-30} />
            <Legend
              verticalAlign="bottom"
              content={<UsersChartLegend />}
              iconSize={10}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

Index.defaultProps = defaultProps;

export default Index;
