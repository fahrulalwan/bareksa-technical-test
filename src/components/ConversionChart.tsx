interface ConversionChartProps {
  orders?: any;
}

const defaultProps: ConversionChartProps = {
  orders: null,
};

function ConversionChart({ orders }: ConversionChartProps) {
  console.log("data", orders);

  return (
    <div className="rounded border p-4">
      <div className="flex items-center justify-between">
        <p className="text-xl font-extrabold">Conversion</p>

        <button
          type="button"
          className="ml-5 rounded border p-2 hover:bg-gray-200"
        >
          <img src="/icon/menu-more.svg" alt="more" />
        </button>
      </div>
    </div>
  );
}

ConversionChart.defaultProps = defaultProps;

export default ConversionChart;
