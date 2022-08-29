import dayjs, { Dayjs } from "dayjs";

export type OrderStatus = "Pending" | "Completed" | "Canceled" | "";

export default class OrderModel {
  orderId: string;

  startDate?: Dayjs;

  dueDate?: Dayjs;

  fullName: string;

  location: string;

  status: OrderStatus;

  conversionItem: string;

  conversionRevenue: number;

  constructor() {
    this.orderId = "";
    this.startDate = undefined;
    this.dueDate = undefined;
    this.fullName = "";
    this.location = "";
    this.status = "";
    this.conversionItem = "";
    this.conversionRevenue = 0;
  }

  convert(dto: Record<string, any>): OrderModel {
    this.orderId = dto.order_id;
    this.startDate = dayjs(new Date(dto.start_date));
    this.dueDate = dayjs(new Date(dto.due_date));
    this.fullName = dto.full_name;
    this.location = dto.location;
    this.status = dto.status;
    this.status = (this.status[0].toUpperCase() +
      this.status.slice(1)) as OrderStatus;
    this.conversionItem = dto.conversion_item;
    this.conversionRevenue = Number(dto.conversion_revenue);

    return this;
  }
}
