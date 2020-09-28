import request from "supertest";
import { expect } from "chai";

import server from "@/server";

const app = request(server());

describe("IT - Monitor", () => {
  it("should get health", async () => {
    const res = await app.get("/health");
    expect(res.status).to.equal(200);
    expect(res.body.status).to.equal("UP");
  });
  it("should get metrics", async () => {
    const res = await app.get("/metrics");
    expect(res.status).to.equal(200);
  });
});
