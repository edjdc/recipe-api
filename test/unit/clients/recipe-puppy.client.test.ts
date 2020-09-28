import chai, { expect } from "chai";
import chaiAsPromised from "chai-as-promised";
import axios, { AxiosResponse } from "axios";
import sinon from "sinon";
import RecipePuppyClient, { RecipePuppyResponse } from "@/clients/recipe-puppy.client";

chai.use(chaiAsPromised);

let sandbox: sinon.SinonSandbox | null = null;

describe("recipe-puppy.client", () => {
  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });
  afterEach(() => {
    sandbox!.restore();
  });

  it("should get recipes", async () => {
    sandbox!.stub(axios, "get");
    (axios.get as any).returns(
      Promise.resolve({
        data: {
          results: [
            {
              title: "Dashi Basic Korean Kelp Stock Recipe",
              ingredients: "garlic,onions,anchovies",
              href: "http://www.grouprecipes.com/508/dashi-basic-korean-kelp-stock.html",
            },
          ],
        },
      } as AxiosResponse<RecipePuppyResponse>),
    );

    const result = await RecipePuppyClient.getRecipes({ i: "garlic,onions,anchovies" });
    expect(result).to.be.not.null;
  });

  it("should rejected when RecipePuppy API request failed", async () => {
    sandbox!.stub(axios, "get");
    (axios.get as any).rejects(new Error("Request failed"));
    await expect(RecipePuppyClient.getRecipes({ i: "garlic,onions,anchovies" })).to.be.rejectedWith(
      "RecipePuppy API request failed",
    );
  });
});
