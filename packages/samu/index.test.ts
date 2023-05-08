import { describe, it } from "vitest";
import { default as rescue } from "./index";
import { NextFunction, Request, Response } from "express";

class FooError extends Error {}
class BarError extends FooError {}
class BazError extends Error {}

describe.concurrent("rescue(async (req, res, next) => { })", () => {
  it("passes all arguments to the handler", async ({ expect }) => {
    const expectedReq = "req" as unknown as Request;
    const expectedRes = "res" as unknown as Response;
    const expectedNext: NextFunction = (_err) => {};

    let actualReq;
    let actualRes;
    let actualNext;

    const routeHandler = rescue(async (req, res, next) => {
      actualReq = req;
      actualRes = res;
      actualNext = next;
    });

    await routeHandler(expectedReq, expectedRes, expectedNext);

    expect(actualReq).toEqual(expectedReq);
    expect(actualRes).toEqual(expectedRes);
    expect(actualNext).toEqual(expectedNext);
  });

  it("calls next function when an exception is thrown", async ({ expect }) => {
    const req = null as unknown as Request;
    const res = null as unknown as Response;

    let actualErr;

    const next: NextFunction = (err) => {
      actualErr = err;
    };

    const routeHandler = rescue((_req, _res, _next) => {
      throw new FooError();
    });

    await routeHandler(req, res, next);

    expect(actualErr).toBeInstanceOf(FooError);
  });
});

describe.concurrent("rescue.from(err, async (req, res, next) => { })", () => {
  it("passess all arguments to the handlers", async ({ expect }) => {
    const expectedErr = new FooError();
    const expectedReq = "req" as unknown as Request;
    const expectedRes = "res" as unknown as Response;
    const expectedNext: NextFunction = (_err) => {};

    let actualErr;
    let actualReq;
    let actualRes;
    let actualNext;

    const errorHandler = rescue.from(FooError, async (err, req, res, next) => {
      actualErr = err;
      actualReq = req;
      actualRes = res;
      actualNext = next;
    });

    await errorHandler(expectedErr, expectedReq, expectedRes, expectedNext);

    expect(actualErr).toEqual(expectedErr);
    expect(actualReq).toEqual(expectedReq);
    expect(actualRes).toEqual(expectedRes);
    expect(actualNext).toEqual(expectedNext);
  });

  it("calls handlers when error is an instance of given class", async ({
    expect,
  }) => {
    const req = null as unknown as Request;
    const res = null as unknown as Response;
    const next: NextFunction = (_err) => {
      throw new Error("should not be called");
    };

    let actualErr1;
    let actualErr2;

    const errorHandler1 = rescue.from(FooError, (err, _req, _res, _next) => {
      actualErr1 = err;
    });

    await errorHandler1(new FooError(), req, res, next);

    const errorHandler2 = rescue.from(
      FooError,
      async (err, _req, _res, _next) => {
        actualErr2 = err;
      }
    );

    await errorHandler2(new BarError(), req, res, next);

    expect(actualErr1).toBeInstanceOf(FooError);
    expect(actualErr2).toBeInstanceOf(BarError);
  });

  it("calls next when error is not an instance of given class", async ({
    expect,
  }) => {
    const req = null as unknown as Request;
    const res = null as unknown as Response;

    let actualErr;

    const next: NextFunction = (err) => {
      actualErr = err;
    };

    const errorHandler = rescue.from(FooError, () => {
      throw new Error("should not be called");
    });

    await errorHandler(new BazError(), req, res, next);

    expect(actualErr).toBeInstanceOf(BazError);
  });
});
