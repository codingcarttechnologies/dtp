import { DataPointModel } from "../../telemetry-services/models/data.point.model";
import { SetPointModel } from "../../telemetry-services/models/setpoint.model";

export function setPointCheck(setPoint: SetPointModel, measurements: DataPointModel[]) {
  if(!setPoint.conditions || setPoint.conditions.length == 0)
    return {normal: true, parameterName: ''};

  let triggerConditions = 0;

  setPoint.conditions.forEach(condition => {
    let measurement = measurements.find(m => m.sourceId === condition.parameterName);

    switch (condition.comparisonOperator) {
      case "GREATER_THAN":
        if (measurement && measurement.value >= condition.limit) {
          triggerConditions++;
        }

        break;

      case "LESS_THAN":
        if (measurement && measurement.value <= condition.limit) {
          triggerConditions++;
        }

        break;

      default:
        if (measurement && measurement.value !== condition.limit) {
          triggerConditions++;
        }
        break;
    }
  });

  let p = setPoint.conditions[0].parameterName.toLowerCase();

  return {normal: triggerConditions != setPoint.conditions.length, parameterName: p};
}
