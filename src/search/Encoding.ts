import { ExecutionResult } from "./ExecutionResult";
import { ObjectiveFunction } from "./objective/ObjectiveFunction";

/**
 * Encoding of the search problem.
 *
 * @author Mitchell Olsthoorn
 */
export interface Encoding {
  /**
   * Store the distance to an objective for this encoding.
   *
   * @param objectiveFunction The objective
   * @param distance The distance
   */
  setDistance(
    objectiveFunction: ObjectiveFunction<Encoding>,
    distance: number
  ): void;

  /**
   * Return the execution result.
   */
  getExecutionResult(): ExecutionResult;

  /**
   * Store the execution result.
   *
   * @param executionResult The execution result to store
   */
  setExecutionResult(executionResult: ExecutionResult);

  /**
   * Return the length of the encoding/chromosome
   */
  getLength(): number;
}
