import Joi from "joi";
import { Request, Response, NextFunction } from "express";
import { expect } from "chai";
import SchemaValidator from "@/middlewares/schema-validator";

const schemaValidation = (req: Request): Joi.ValidationResult => {
  const schema = Joi.object().keys({
    i: Joi.string().required(),
  });
  return schema.validate(req.query);
};

describe("schema-validator", () => {
  it("should validate and return status 400", () => {
    let status: number | null = null;
    let json: any = null;

    const req = ({
      query: {},
    } as unknown) as Request;
    const res = ({
      status: (arg: number) => {
        status = arg;
        return {
          json: (arg: any) => {
            json = arg;
          },
        };
      },
    } as unknown) as Response;
    const next = ({} as unknown) as NextFunction;

    SchemaValidator(schemaValidation)(req, res, next);

    expect(status).to.equal(400);
    expect(json).to.be.not.null;
    expect(json.error).to.equal('"i" is required');
  });

  it("should call next when not exists errors", () => {
    let nextCalled = false;

    const req = ({
      query: { i: "test" },
    } as unknown) as Request;
    const res = ({} as unknown) as Response;
    const next = () => {
      nextCalled = true;
      return;
    };

    SchemaValidator(schemaValidation)(req, res, next);

    expect(nextCalled).to.equal(true);
  });
});
