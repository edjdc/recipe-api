import chai, { expect } from "chai";
import chaiAsPromised from "chai-as-promised";
import sinon from "sinon";

import GiphyClient, { GiphyResponse } from "@/clients/giphy.client";
import RecipePuppyClient, { RecipePuppy } from "@/clients/recipe-puppy.client";
import RecipeService, { Recipe } from "@/services/recipe.service";
import ResponseError from "@/utils/response-error";

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

    sandbox!.stub(GiphyClient, "getGifs");
    (GiphyClient.getGifs as any).returns(
      Promise.resolve({
        data: [
          {
            images: {
              original: {
                url: "https://media3.giphy.com/media/QM5GJO6J8lDfa/giphy.gif",
              },
            },
          },
        ],
      } as GiphyResponse),
    );

    const result = await RecipeService.getRecipes({ ingredients: "garlic,onions,anchovies" });

    expect(result).to.be.not.null;
    expect(result.length).to.equal(1);
    expect(result[0].title).to.equal("Dashi Basic Korean Kelp Stock Recipe");
    expect(result[0].ingredients).to.have.ordered.members(["anchovies", "garlic", "onions"]);
    expect(result[0].link).to.equal("http://www.grouprecipes.com/508/dashi-basic-korean-kelp-stock.html");
    expect(result[0].gif).to.equal("https://media3.giphy.com/media/QM5GJO6J8lDfa/giphy.gif");
  });

  it("should reject when RecipePuppyClient.getRecipes failed", async () => {
    sandbox!.stub(RecipePuppyClient, "getRecipes");
    (RecipePuppyClient.getRecipes as any).rejects(new ResponseError("RecipePuppyClient API request failed"));

    await expect(RecipeService.getRecipes({ ingredients: "garlic,onions,anchovies" })).to.be.rejected;
  });

  it("should reject when RecipePuppyClient.getRecipes failed", async () => {
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

    sandbox!.stub(GiphyClient, "getGifs");
    (GiphyClient.getGifs as any).rejects(new ResponseError("GiphyClient API request failed"));

    await expect(RecipeService.getRecipes({ ingredients: "garlic,onions,anchovies" })).to.be.rejected;
  });
});
