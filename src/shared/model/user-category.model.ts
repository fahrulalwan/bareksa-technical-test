export default class UserCategoryModel {
  riskAverse: number;

  conservative: number;

  moderate: number;

  riskTaker: number;

  constructor() {
    this.riskAverse = 0;
    this.conservative = 0;
    this.moderate = 0;
    this.riskTaker = 0;
  }

  convert(dto: Record<string, string>): UserCategoryModel {
    this.riskAverse = Number(dto.risk_averse);
    this.conservative = Number(dto.conservative);
    this.moderate = Number(dto.moderate);
    this.riskTaker = Number(dto.risk_taker);

    return this;
  }
}
