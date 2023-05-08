# @fykit/samu

> **Note**
> Formerly `express-rescue`.

> **Warning**
> Work in progress.

## Tests

```txt
 ✓ |samu| index.test.ts
   ✓ rescue(async (req, res, next) => { })
     ✓ passes all arguments to the handler
     ✓ calls next function when an exception is thrown
   ✓ rescue.from(err, async (req, res, next) => { })
     ✓ passess all arguments to the handlers
     ✓ calls handler when error is an instance of given class
     ✓ calls next when error is not an instance of given class
```
