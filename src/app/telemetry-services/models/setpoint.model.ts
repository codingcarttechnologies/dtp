export class SetPointModel {
  public id: number;
  public name: string;
  public warningMessage: string;
  public conditions: SetPointConditionModel[] = [];
  public unit: string;
}

export class SetPointConditionModel {
  public parameterName: string;
  public comparisonOperator: string;
  public limit: number;
}
