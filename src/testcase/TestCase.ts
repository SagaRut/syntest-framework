import { Evaluation } from "../search/objective/Evaluation";
import { ConstructorCall } from "./statements/action/ConstructorCall";
import { prng } from "../util/prng";
import { getLogger } from "../util/logger";
import { Sampler } from "../search/sampling/Sampler";
import { Stringifier } from "../testbuilding/Stringifier";

/**
 * TestCase class
 *
 * @author Dimitri Stallenberg
 */
export class TestCase {
  private _root: ConstructorCall;
  private evaluation: Evaluation;
  private crowdingDistance: number;
  private rank: number;
  private _id: string;

  /**
   * Constructor
   * @param root the root of the tree chromosome of the individual
   * @param evaluation
   */
  constructor(root: ConstructorCall) {
    this._root = root;

    this.evaluation = new Evaluation();
    this.crowdingDistance = 0;
    this.rank = 0;
    this._id = prng.uniqueId(20);
    getLogger().debug(`Created individual: ${this._id}`);
  }

  mutate(sampler: Sampler) {
    getLogger().debug(`Mutating individual: ${this._id}`);
    return new TestCase(this._root.mutate(sampler, 0));
  }

  hashCode(stringifier: Stringifier): number {
    const string = stringifier.stringifyIndividual(this, `${this.id}`);
    let hash = 0;
    for (let i = 0; i < string.length; i++) {
      const character = string.charCodeAt(i);
      hash = (hash << 5) - hash + character;
      hash = hash & hash; // Convert to 32bit integer
    }
    return hash;
  }

  setEvaluation(evaluation: any) {
    this.evaluation = evaluation;
  }

  getEvaluation(): Evaluation {
    return this.evaluation;
  }

  getCrowdingDistance() {
    return this.crowdingDistance;
  }

  setCrowdingDistance(value: number) {
    this.crowdingDistance = value;
  }

  setRank(value: number) {
    this.rank = value;
  }

  getRank() {
    return this.rank;
  }

  get id(): string {
    return this._id;
  }
  get root(): ConstructorCall {
    return this._root;
  }

  copy(): TestCase {
    const copy = this.root.copy();
    for (let index = 0; index < this.root.getChildren().length; index++) {
      copy.setChild(index, this.root.getChildren()[index].copy());
    }

    return new TestCase(copy);
  }
}
