import request from "supertest";
import { expect } from "chai";

import server from "@/server";

const app = request(server());

describe("IT - Error", () => {
  it("should get 404", async () => {
    const res = await app.get("/not-implemented-route");
    expect(res.status).to.equal(404);
    expect(res.text).to.equal("Not Found");
  });
});
