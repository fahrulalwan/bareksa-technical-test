interface UsersChartTooltipProps {
  active?: boolean;
  payload?: { payload: { payload: { name: string; value: number } } }[];
}

const defaultProps: UsersChartTooltipProps = {
  active: false,
  payload: [],
};

function UsersChartTooltip({
  active,
  payload: response,
}: UsersChartTooltipProps) {
  if (active) {
    const { value } = response?.[0].payload.payload || {};
    return (
      <div className="relative space-y-3 rounded-md bg-white/95 p-2 drop-shadow-md after:absolute after:top-full after:left-1/2 after:-translate-y-1/2 after:-translate-x-1/2 after:rotate-45 after:bg-white after:p-1.5">
        <p className="text-sm">{value}</p>
      </div>
    );
  }

  return null;
}

UsersChartTooltip.defaultProps = defaultProps;

export default UsersChartTooltip;
