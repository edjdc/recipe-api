import chai, { expect } from "chai";
import chaiAsPromised from "chai-as-promised";
import axios, { AxiosResponse } from "axios";
import sinon from "sinon";

import GiphyClient, { GiphyResponse } from "@/clients/giphy.client";

chai.use(chaiAsPromised);

let sandbox: sinon.SinonSandbox | null = null;

describe("giphy.client", () => {
  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });
  afterEach(() => {
    sandbox!.restore();
  });

  it("should get gifs", async () => {
    sandbox!.stub(axios, "get");
    (axios.get as any).returns(
      Promise.resolve({
        data: {
          data: [
            {
              images: {
                original: {
                  url: "https://media3.giphy.com/media/QM5GJO6J8lDfa/giphy.gif",
                },
              },
            },
          ],
        },
      } as AxiosResponse<GiphyResponse>),
    );

    const result = await GiphyClient.getGifs({ q: "teste", limit: 1 });
    expect(result).to.be.not.null;
    expect(result.data).to.be.not.null;

    if (result.data) {
      expect(result.data[0].images.original.url).to.equal("https://media3.giphy.com/media/QM5GJO6J8lDfa/giphy.gif");
    }
  });

  it("should rejected when Giphy API request failed", async () => {
    sandbox!.stub(axios, "get");
    (axios.get as any).rejects(new Error("Request failed"));
    await expect(GiphyClient.getGifs({ q: "teste", limit: 1 })).to.be.rejectedWith("Giphy API request failed");
  });
});
