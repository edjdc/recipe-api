import { Request } from "express";
import { expect } from "chai";
import RecipeSchema from "@/api/schemas/recipe.schema";

describe("recipe.schema", () => {
  it("should validate max ingredients", () => {
    const req = ({
      query: {
        i: "1,2,3,4",
      },
    } as unknown) as Request;
    const { error, value } = RecipeSchema.getRecipe(req);
    expect(error).to.be.not.null;
    if (error) {
      expect(error.details).to.be.not.null;
      expect(error.details[0].message).to.equal('"i" must contain less than or equal to 3 items');
    }
  });
});
