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
