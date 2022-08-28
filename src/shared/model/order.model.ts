export default class OrderModel {
  orderId: string;

  startDate?: Date;

  dueDate?: Date;

  fullName: string;

  location: string;

  status: string;

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
    this.startDate = new Date(dto.start_date);
    this.dueDate = new Date(dto.due_date);
    this.fullName = dto.full_name;
    this.location = dto.location;
    this.status = dto.status;
    this.conversionItem = dto.conversion_item;
    this.conversionRevenue = dto.conversion_revenue;

    return this;
  }
}
