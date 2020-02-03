# basic-record

[![Build Status](https://travis-ci.com/WebReflection/basic-record.svg?branch=master)](https://travis-ci.com/WebReflection/basic-record) [![Coverage Status](https://coveralls.io/repos/github/WebReflection/basic-record/badge.svg?branch=master)](https://coveralls.io/github/WebReflection/basic-record?branch=master)

A 25 LOC utility to define and create records via objects literals.

Each `Record` class will have an `implements(Record)` method that returns `true` if the passed `Record` was used during class definition.

```js
const {create, define} = require('basic-record');

// define a Record class through one or more arguments
const Point2D = define({x: 0, y: 0});

// define mixins by passing records and/or literals
const Point3D = define(Point2D, {z: 0});

// create an instance via new Record or create(Record)
const p2d = create(Point2D);
console.assert(
  p2d.x === 0                           &&
  p2d.y === 0                           &&
  Point2D.implements(Point2D) === true  &&
  Point2D.implements(Point3D) === false // Point2D is not Point3D
);

// optionally pass an `init` object to assign its values
const p3d = create(Point3D, {y: 123, z: 9});
const {constructor} = p3d;
console.assert(
  p3d.x === 0                               &&
  p3d.y === 123                             &&
  p3d.z === 9                               &&
  constructor.implements(Point3D) === true  &&
  constructor.implements(Point2D) === true  // Point3D is also Point2D
);
```


### Use cases & Benchmark

The peculiarity of records is their ability to define every default value directly through their prototype.
The benefits are seen particularly in creation of many default objects, but also assignment of partial properties, as opposite of guarding each received property, or argument, with a default value.

The [benchmark](./benchmark.js) file reflects these goals, underlying where it's easier, and faster, to use records instead of regular classes instances.


#### Results:

```
class.create: 0.299ms
record.create: 0.023ms

class.createArgs: 0.016ms
record.createArgs: 0.073ms

class.createExtend: 0.443ms
record.createExtend: 0.02ms

class.createExtendArgs: 0.014ms
record.createExtendArgs: 0.061ms

class.createPartialDefaults: 0.056ms
record.createPartialDefaults: 0.044ms

class.copy: 0.256ms
record.copy: 0.058ms

class.copyExtend: 0.528ms
record.copyExtend: 0.063ms

class.getCoords: 0.455ms
record.getCoords: 0.009ms

class.getCoordsArgs: 0.018ms
record.getCoordsArgs: 0.007ms
```
