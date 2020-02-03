const {create, define} = require('./cjs');

class CPoint2D {
  x = 0;
  y = 0;
  get coords() {
    return [this.x, this.y];
  }
}

class CPoint2DArgs {
  constructor({x, y}) {
    this.x = x;
    this.y = y;
  }
  get coords() {
    return [this.x, this.y];
  }
}

class CPoint3D extends CPoint2D {
  x = 0;
  y = 0;
  z = 0;
  get coords() {
    return [this.x, this.y, this.z];
  }
}

class CPoint3DArgs extends CPoint2DArgs {
  constructor({x, y, z}) {
    super({x, y});
    this.z = z;
  }
  get coords() {
    return [this.x, this.y, this.z];
  }
}

const RPoint2D = define({
  x: 0,
  y: 0,
  get cords() {
    return [this.x, this.y];
  }
});

const RPoint3D = define(RPoint2D, {
  z: 0,
  get cords() {
    return [this.x, this.y, this.z];
  }
});

const benchmark = {
  class: {
    create() {
      const out = [];
      for (let i = 0; i < 1000; i++)
        out.push(new CPoint2D);
      return out;
    },
    createArgs() {
      const out = [];
      for (let i = 0; i < 1000; i++)
        out.push(new CPoint2DArgs({x: 1, y: 2}));
      return out;
    },
    createExtend() {
      const out = [];
      for (let i = 0; i < 1000; i++)
        out.push(new CPoint3D);
      return out;
    },
    createExtendArgs() {
      const out = [];
      for (let i = 0; i < 1000; i++)
        out.push(new CPoint3DArgs({x: 1, y: 2, z: 3}));
      return out;
    },
    createPartialDefaults() {
      const out = [];
      const defaults = {x: 0, y: 0, z: 0};
      for (let i = 0; i < 1000; i++)
        out.push(new CPoint3DArgs({...defaults, x: i}));
      return out;
    },
    copy() {
      const out = [];
      const original = new CPoint2D;
      original.x = 1;
      original.y = 2;
      for (let i = 0; i < 1000; i++)
        out.push(Object.assign(new CPoint2D, original));
      return out;
    },
    copyExtend() {
      const out = [];
      const original = new CPoint3D;
      original.x = 1;
      original.y = 2;
      original.z = 3;
      for (let i = 0; i < 1000; i++)
        out.push(Object.assign(new CPoint3D, original));
      return out;
    },
    getCoords() {
      const out = [];
      for (let i = 0; i < 1000; i++)
        out.push((new CPoint3D).coords);
      return out;
    },
    getCoordsArgs() {
      const out = [];
      for (let i = 0; i < 1000; i++)
        out.push((new CPoint3DArgs({x: 0, y: 0, z: 0})).coords);
      return out;
    }
  },
  record: {
    create() {
      const out = [];
      for (let i = 0; i < 1000; i++)
        out.push(new RPoint2D);
      return out;
    },
    createArgs() {
      const out = [];
      for (let i = 0; i < 1000; i++)
        out.push(create(RPoint2D, {x: 1, y: 2}));
      return out;
    },
    createExtend() {
      const out = [];
      for (let i = 0; i < 1000; i++)
        out.push(new RPoint3D);
      return out;
    },
    createExtendArgs() {
      const out = [];
      for (let i = 0; i < 1000; i++)
        out.push(create(RPoint3D, {x: 1, y: 2, z: 3}));
      return out;
    },
    createPartialDefaults() {
      const out = [];
      for (let i = 0; i < 1000; i++)
        out.push(create(RPoint3D, {x: i}));
      return out;
    },
    copy() {
      const out = [];
      const original = create(RPoint2D, {x: 1, y: 2});
      for (let i = 0; i < 1000; i++)
        out.push(create(RPoint2D, original));
      return out;
    },
    copyExtend() {
      const out = [];
      const original = create(RPoint3D, {x: 1, y: 2, z: 3});
      for (let i = 0; i < 1000; i++)
        out.push(create(RPoint3D, original));
      return out;
    },
    getCoords() {
      const out = [];
      for (let i = 0; i < 1000; i++)
        out.push((new RPoint3D).coords);
      return out;
    },
    getCoordsArgs() {
      const out = [];
      for (let i = 0; i < 1000; i++)
        out.push((new RPoint3D).coords);
      return out;
    }
  }
};

const bench = name => {
  let i = 0, result = [];
  const method = name.split('.').reduce((o, k) => o[k], benchmark);
  // warm up invokes
  while (i++ < 100)
    method();
  // benchmark
  console.time(name);
  result = method();
  console.timeEnd(name);
  return result;
};

setTimeout(() => {
  let result = null;
  console.log('');
  result = bench('class.create');
  result = bench('record.create');
  console.log('');
  result = bench('class.createArgs');
  result = bench('record.createArgs');
  console.log('');
  result = bench('class.createExtend');
  result = bench('record.createExtend');
  console.log('');
  result = bench('class.createExtendArgs');
  result = bench('record.createExtendArgs');
  console.log('');
  result = bench('class.createPartialDefaults');
  result = bench('record.createPartialDefaults');
  console.log('');
  result = bench('class.copy');
  result = bench('record.copy');
  console.log('');
  result = bench('class.copyExtend');
  result = bench('record.copyExtend');
  console.log('');
  result = bench('class.getCoords');
  result = bench('record.getCoords');
  console.log('');
  result = bench('class.getCoordsArgs');
  result = bench('record.getCoordsArgs');
  console.log('');
  return result;
});
