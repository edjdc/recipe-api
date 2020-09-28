import chai, { expect } from "chai";
import chaiAsPromised from "chai-as-promised";
import sinon from "sinon";

import RecipePuppyClient, { RecipePuppy } from "@/clients/recipe-puppy.client";
import RecipeService, { Recipe } from "@/services/recipe.service";

chai.use(chaiAsPromised);

let sandbox: sinon.SinonSandbox | null = null;

describe("recipe.service", () => {
  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });
  afterEach(() => {
    sandbox!.restore();
  });

  it("should get recipes", async () => {
    sandbox!.stub(RecipePuppyClient, "getRecipes");
    (RecipePuppyClient.getRecipes as any).returns(
      Promise.resolve([
        {
          title: "Dashi Basic Korean Kelp Stock Recipe",
          ingredients: "garlic,onions,anchovies",
          href: "http://www.grouprecipes.com/508/dashi-basic-korean-kelp-stock.html",
        },
      ] as Array<RecipePuppy>),
    );

    const result = await RecipeService.getRecipes({ ingredients: "garlic,onions,anchovies" });

    expect(result).to.be.not.null;
    expect(result.length).to.equal(1);
    expect(result[0].title).to.equal("Dashi Basic Korean Kelp Stock Recipe");
    expect(result[0].ingredients).to.have.ordered.members(["anchovies", "garlic", "onions"]);
    expect(result[0].link).to.equal("http://www.grouprecipes.com/508/dashi-basic-korean-kelp-stock.html");
  });

  it("should reject when RecipePuppyClient.getRecipes failed", async () => {
    sandbox!.stub(RecipePuppyClient, "getRecipes");
    (RecipePuppyClient.getRecipes as any).rejects(new Error("RecipePuppyClient API request failed"));

    await expect(RecipeService.getRecipes({ ingredients: "garlic,onions,anchovies" })).to.be.rejected;
  });
});
