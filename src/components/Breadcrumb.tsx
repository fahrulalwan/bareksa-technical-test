import dayjs from "dayjs";

interface BreadcrumbProps {
  date?: Date;
}

const defaultProps: BreadcrumbProps = {
  date: new Date(),
};

function Breadcrumb({ date }: BreadcrumbProps) {
  return (
    <div className="flex justify-end bg-[#F5F5F5] px-6 py-5">
      <span className="font-semibold text-[#333333]">
        {dayjs(date).format("D MMMM YYYY")}
      </span>
    </div>
  );
}

Breadcrumb.defaultProps = defaultProps;

export default Breadcrumb;
