// @flow
import { describe, it } from 'flow-typed-test';
import BN from 'bn.js';

describe('BN main usages', () => {
  it('supports different constructors', () => {
    new BN(2);
    new BN('2');
    new BN('dead', 'hex');
    new BN('dead', 16);
    new BN('dead', 'hex', 'le');

    new BN([1, 2, 3, 4]);
    new BN([1, 2, 3, 4], 'le');
    new BN(Buffer.from('dead', 'hex'));
    new BN(new BN('dead', 'hex'));
  });

  it('prevents invalid constructors', () => {
    // $FlowExpectedError[incompatible-call]
    new BN({});

    // $FlowExpectedError[incompatible-call]
    new BN('dead', 'dec', 'le');

    // $FlowExpectedError[incompatible-call]
    new BN('dead', 'hex', 'le', {});
  });

  it('handles arithmetics', () => {
    const a = new BN(21);
    const b = new BN(42);

    new BN(21)
      .neg()
      .abs()
      .iadd(a)
      .sub(b)
      .mul(a)
      .muln(20)
      .sqr()
      .pow(b)
      .div(a)
      .mod(b)
      .addn(21);
  });

  it('handles bit operations', () => {
    const a = new BN(21);
    const b = new BN(42);

    new BN(21)
      .or(a)
      .iand(b)
      .xor(a)
      .setn(2, true)
      .shln(4)
      .maskn(21)
      .ishrn(4, 1, {
        words: [],
        length: 0,
      })
      .ushln(128);
  });

  it('handles reduction', () => {
    const a = new BN(21);

    new BN(21)
      .gcd(a)
      .egcd(a)
      .invm(a);
  });

  it('handles fast reduction', () => {
    BN.red(new BN(21));
    BN.red('p224');
    BN.mont(new BN(21));

    const red = BN.red('p192');

    const a = new BN(128).toRed(red);
    const b = new BN(64).toRed(red);

    a.redAdd(b)
      .redSub(b)
      .redInvm()
      .redNeg();
  });

  it('prevents calling functions with wrong input types', () => {
    const a = new BN(21);

    // $FlowExpectedError[incompatible-call]
    a.lt(2);

    // $FlowExpectedError[incompatible-call]
    a.ltn(new BN(2));

    // $FlowExpectedError[incompatible-call]
    a.mul(2);

    // $FlowExpectedError[incompatible-call]
    a.muln(new BN(2));
  });

  it('handles utilities', () => {
    const a = new BN();

    a.clone().toString();
    a.toString(16);
    a.toNumber();
    a.toArray('le', 8);
    a.toBuffer('be', 8);
    a.toArrayLike(Buffer, 'le', 8);
    a.zeroBits();
    a.byteLength();
    a.cmp(new BN(2));
    a.ltn(2);
    a.gte(new BN(2));
    a.toTwos(8);
    a.toRed(BN.red('p192')).fromRed();
  });

  it('prevents invalid utilities usage', () => {
    const a = new BN();

    // $FlowExpectedError[incompatible-call]
    a.toString('dec');

    // $FlowExpectedError[incompatible-call]
    a.toArray('other');

    // $FlowExpectedError[incompatible-call]
    a.toArrayLike(Object, 'le', 8);

    // $FlowExpectedError[incompatible-call]
    a.cmp(0);
  });
});
