import getOwnPropertyDescriptors from '@ungap/get-own-property-descriptors';
const {assign, defineProperties} = Object;
export function create(Record, init) {
  return arguments.length < 2 ? new Record : assign(new Record, init);
};
export function define() {
  function Record() {}
  const records = [Record];
  const {prototype} = Record;
  for (let i = 0, {length} = arguments; i < length; i++) {
    const curr = arguments[i];
    if (typeof curr === 'function') {
      defineProperties(prototype, getOwnPropertyDescriptors(curr.prototype));
      records.push(curr);
    }
    else
      defineProperties(prototype, getOwnPropertyDescriptors(curr));
  }
  defineProperties(prototype, {constructor: {
    writable: false,
    value: Record
  }});
  return defineProperties(Record, {implements: {
    value: Record => records.includes(Record)
  }});;
};
