import { describe, test, expect } from "vitest";
import { parseVariableAssignments } from "../../utils/parsers/variableParser.js";

describe("Variable Assignment Parser", () => {
  test("parses a single assignment", () => {
    const input = "@@variableName = variable_value";
    const result = parseVariableAssignments(input);
    expect(result).toEqual({ variableName: "variable_value" });
  });

  test("parses multiple assignments", () => {
    const input = `
      @@first = one
      @@second= two
      @@third = three
    `;
    const result = parseVariableAssignments(input);
    expect(result).toEqual({
      first: "one",
      second: "two",
      third: "three",
    });
  });

  test("ignores lines without the @@ prefix", () => {
    const input = `
      Some random text
      @@valid = yes
      Not an assignment
    `;
    const result = parseVariableAssignments(input);
    expect(result).toEqual({
      valid: "yes",
    });
  });

  test("handles values with equals signs", () => {
    const input = "@@var = value=with=equals";
    const result = parseVariableAssignments(input);
    expect(result).toEqual({
      var: "value=with=equals",
    });
  });

  test("handles extra spaces around key and value", () => {
    const input = "   @@key    =     value    ";
    const result = parseVariableAssignments(input);
    expect(result).toEqual({
      key: "value",
    });
  });

  test("returns an empty object if no valid assignments are present", () => {
    const input = "This is not a variable assignment";
    const result = parseVariableAssignments(input);
    expect(result).toEqual({});
  });
});
