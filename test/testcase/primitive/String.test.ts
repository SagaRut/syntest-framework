import * as chai from "chai";
import {
  guessCWD,
  loadConfig,
  processConfig,
  Sampler,
  setupLogger,
  setupOptions,
  StringStatement,
} from "../../../src";

const expect = chai.expect;

describe("StringStatement", () => {
  before(async () => {
    await guessCWD(null);
    await setupOptions("", "");
    await loadConfig();
    await processConfig({}, "");
    await setupLogger();
  });

  it("Add mutation increases statement's length by one", () => {
    const statement = StringStatement.getRandom();
    const mutated = statement.addMutation();

    expect(statement.value.length + 1 === mutated.value.length);
  });

  it("Remove mutation decreases statement's length by one", () => {
    const statement = StringStatement.getRandom();
    const mutated = statement.removeMutation();

    expect(statement.value.length - 1 === mutated.value.length);
  });

  it("Replace mutation doesnt affect statement's length", () => {
    const statement = StringStatement.getRandom();
    const mutated = statement.replaceMutation();

    expect(statement.value.length === mutated.value.length);
  });

  it("Delta mutation doesnt affect statement's length", () => {
    const statement = StringStatement.getRandom();
    const mutated = statement.deltaMutation();

    expect(statement.value.length - 1 === mutated.value.length);
  });

  it("Copy gives exact same value", () => {
    const statement = StringStatement.getRandom();
    const copy = statement.copy();

    expect(statement.value).to.equal(copy.value);
  });

  it("Mutate gives exact other value", () => {
    const mockedSampler = <Sampler>{};
    const statement = StringStatement.getRandom();
    const mutation = statement.mutate(mockedSampler as Sampler, 0);

    expect(statement.value != mutation.value);
  });
});
