/* eslint-disable func-names */
/* eslint-disable no-param-reassign */
import * as memoizee from 'memoizee';

export function Memoize() {
  return (target: any, key: string, descriptor: any) => {
    const oldFunction = descriptor.value;
    const newFunction = memoizee(oldFunction);
    descriptor.value = function (...args: any) {
      return newFunction.apply(this, args);
    };
  };
}
