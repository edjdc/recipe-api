import { Request, Response, NextFunction } from "express";
import { expect } from "chai";
import ErrorHandler from "@/middlewares/error-handler";

describe("error-handler", () => {
  it("should return status 500", () => {
    let json: any = null;
    const err = new Error("test");
    const req = ({} as unknown) as Request;
    const res = ({
      statusCode: null,
      json: (arg: any) => {
        json = arg;
      },
    } as unknown) as Response;
    const next = ({} as unknown) as NextFunction;
    ErrorHandler(err, req, res, next);

    expect(res.statusCode).to.equal(500);
    expect(json).to.be.not.null;
    expect(json.error).to.equal("Internal Server Error");
  });
});
