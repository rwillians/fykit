"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rescueFrom = exports.rescue = void 0;
function rescue(handler) {
    return async (req, res, next) => {
        try {
            await Promise.resolve(handler(req, res, next));
        }
        catch (e) {
            next(e);
        }
    };
}
exports.rescue = rescue;
function rescueFrom(handleableError, handler) {
    return async (err, req, res, next) => {
        if (!(err instanceof handleableError))
            return next(err);
        await Promise.resolve(handler(err, req, res, next));
    };
}
exports.rescueFrom = rescueFrom;
rescue.from = rescueFrom;
exports.default = rescue;
