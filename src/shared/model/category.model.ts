import UserCategoryModel from "./user-category.model";
import OrderModel from "./order.model";

export default class CategoryModel {
  userCategory: UserCategoryModel;

  orders: OrderModel[];

  constructor() {
    this.userCategory = new UserCategoryModel();
    this.orders = [];
  }

  convert(dto: Record<string, any>): CategoryModel {
    this.userCategory = new UserCategoryModel().convert(dto.user_category);
    this.orders = (dto.orders as any[]).map((each) =>
      new OrderModel().convert(each)
    );
    return this;
  }
}
