interface ConversionChartLegendProps {
  iconSize?: number;
  payload?: { color: string; type: string; value: number }[];
}

const defaultProps: ConversionChartLegendProps = {
  iconSize: 0,
  payload: {} as any,
};

function ConversionChartLegend({
  payload,
  iconSize,
}: ConversionChartLegendProps) {
  return (
    <ul className="flex flex-wrap justify-center">
      {payload?.map((entry, index) => (
        <li
          key={`item-${index}`}
          className="inline-flex items-center px-3 py-1"
        >
          <span
            className="mr-3 inline-block rounded-full"
            style={{
              backgroundColor: entry.color,
              width: iconSize,
              height: iconSize,
            }}
          />
          <span className="text-xs font-semibold text-[#9C9C9C]">
            {entry.value}
          </span>
        </li>
      ))}
    </ul>
  );
}

ConversionChartLegend.defaultProps = defaultProps;

export default ConversionChartLegend;
