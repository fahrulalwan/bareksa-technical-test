import CategoryModel from "./category.model";

export default class ResponseModel {
  code: number;

  data: CategoryModel;

  constructor() {
    this.code = 0;
    this.data = new CategoryModel();
  }

  convert(dto: Record<string, any>): ResponseModel {
    this.code = dto.code;
    this.data = new CategoryModel().convert(dto.data);
    return this;
  }
}
