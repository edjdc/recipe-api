import request from "supertest";
import chai, { expect } from "chai";
import chaiAsPromised from "chai-as-promised";
import sinon from "sinon";

import GiphyClient, { GiphyResponse } from "@/clients/giphy.client";
import RecipePuppyClient, { RecipePuppy } from "@/clients/recipe-puppy.client";
import server from "@/server";
import ResponseError from "@/utils/response-error";

chai.use(chaiAsPromised);

const app = request(server());

let sandbox: sinon.SinonSandbox | null = null;

describe("IT - Recipe", () => {
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

    const res = await app.get("/recipes").query({ i: "garlic,onions,anchovies" });

    expect(res).to.be.not.null;
    expect(res.status).to.equal(200);
    expect(res.body).to.be.not.null;
    expect(res.body.keywords).to.have.ordered.members(["garlic", "onions", "anchovies"]);
    expect(res.body.recipes).to.have.deep.members([
      {
        title: "Dashi Basic Korean Kelp Stock Recipe",
        ingredients: ["anchovies", "garlic", "onions"],
        link: "http://www.grouprecipes.com/508/dashi-basic-korean-kelp-stock.html",
        gif: "https://media3.giphy.com/media/QM5GJO6J8lDfa/giphy.gif",
      },
    ]);
  });

  it("should return empty recipes when ingredients are not informed", async () => {
    const res = await app.get("/recipes").query({});

    expect(res).to.be.not.null;
    expect(res.status).to.equal(200);
    expect(res.body).to.be.not.null;
    expect(res.body.keywords).to.have.ordered.members([]);
    expect(res.body.recipes).to.have.deep.members([]);
  });

  it("should return bad request when are informed more than 3 ingredients", async () => {
    const res = await app.get("/recipes").query({ i: "potato,salt,tomato,garlic" });

    expect(res).to.be.not.null;
    expect(res.status).to.equal(400);
    expect(res.body).to.be.not.null;
    expect(res.body.error).to.equal('"i" must contain less than or equal to 3 items');
  });

  it("should return error when RecipePuppy API request failed", async () => {
    sandbox!.stub(RecipePuppyClient, "getRecipes");
    (RecipePuppyClient.getRecipes as any).rejects(new ResponseError("RecipePuppy API request failed"));

    const res = await app.get("/recipes").query({ i: "garlic,onions" });

    expect(res).to.be.not.null;
    expect(res.status).to.equal(400);
    expect(res.body).to.be.not.null;
    expect(res.body.error).to.equal("RecipePuppy API request failed");
  });

  it("should return error when Giphy API request failed", async () => {
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
    (GiphyClient.getGifs as any).rejects(new ResponseError("Giphy API request failed"));

    const res = await app.get("/recipes").query({ i: "garlic,onions" });

    expect(res).to.be.not.null;
    expect(res.status).to.equal(400);
    expect(res.body).to.be.not.null;
    expect(res.body.error).to.equal("Giphy API request failed");
  });
});
