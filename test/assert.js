const assert = require('assert');
const rest = require('tea-rest');
const helper = require('../')(rest);

/* global describe it */
describe('open-rest-helper-assert', () => {
  describe('equal', () => {
    it('Keypath type error', (done) => {
      assert.throws(() => {
        // helper.equal({})(ctx);
        helper.equal({});
      }, (err) => {
        assert.ok(err instanceof Error);
        assert.equal('Gets the value at path of object.', err.message);
        done();
      });
    });
    it('obj type error', (done) => {
      assert.throws(() => {
        helper.equal('hooks.user.id', 'hello world');
      }, (err) => {
        assert.ok(err instanceof Error);
        assert.equal('Fixed value or path of req object', err.message);
        done();
      });
    });

    it('obj validate error', (done) => {
      assert.throws(() => {
        helper.equal('hooks.user.id', { name: 'Stone' });
      }, (err) => {
        assert.ok(err instanceof Error);
        assert.equal('Argument obj contains at least fixed, path one of them.', err.message);
        done();
      });
    });

    it('error type error', (done) => {
      assert.throws(() => {
        helper.equal('hooks.user.id', { fixed: 2 }, 22);
      }, (err) => {
        assert.ok(err instanceof Error);
        assert.equal('The error is called next when assert faild.', err.message);
        done();
      });
    });

    it('fixed compare equal', (done) => {
      const equal = helper.equal('hooks.user.id', { fixed: 1 }, Error('Hello'));

      const ctx = {
        hooks: {
          user: { id: 1 },
        },
      };

      equal(ctx, () => {
        assert.equal(null, ctx.body);
        done();
      });
    });

    it('fixed compare not equal', (done) => {
      const equal = helper.equal('hooks.user.id', { fixed: 1 }, Error('Hello'));
      const ctx = {
        hooks: {
          user: { id: 2 },
        },
        res: {
          badRequest: ({
            error = null, message = null,
          }) => {
            const { errors } = error;
            assert.deepEqual([{
              package: 'tea-rest-helper-assert',
              method: 'equal',
              message: 'Hello',
            }], errors);
            assert.equal('Hello', message);
            done();
          },
        },
      };
      equal(ctx);
    });
    it('Keypath compare equal', (done) => {
      const equal = helper.equal('hooks.user.id', { path: 'params.userId' }, Error('Hello'));
      const ctx = {
        hooks: {
          user: { id: 1 },
        },
        params: {
          userId: 1,
        },
      };
      equal(ctx, () => {
        assert.equal(null, ctx.body);
        done();
      });
    });
    it('Keypath compare not equal', (done) => {
      const equal = helper.equal('hooks.user.id', { path: 'params.userId' }, Error('Hello'));
      const ctx = {
        hooks: {
          user: { id: 2 },
        },
        params: {
          userId: 1,
        },
        res: {
          badRequest: ({
            error = null, message = null,
          }) => {
            const { errors } = error;
            assert.deepEqual([{
              package: 'tea-rest-helper-assert',
              method: 'equal',
              message: 'Hello',
            }], errors);
            assert.equal('Hello', message);
            done();
          },
        },
      };
      equal(ctx);
    });
  });

  describe('notEqual', () => {
    it('Keypath type error', (done) => {
      assert.throws(() => {
        helper.notEqual({});
      }, (err) => {
        assert.ok(err instanceof Error);
        assert.equal('Gets the value at path of object.', err.message);
        done();
      });
    });

    it('obj type error', (done) => {
      assert.throws(() => {
        helper.notEqual('hooks.user.id', 'hello world');
      }, (err) => {
        assert.ok(err instanceof Error);
        assert.equal('Fixed value or path of req object', err.message);
        done();
      });
    });

    it('obj validate error', (done) => {
      assert.throws(() => {
        helper.notEqual('hooks.user.id', { name: 'Stone' });
      }, (err) => {
        assert.ok(err instanceof Error);
        assert.equal('Argument obj contains at least fixed, path one of them.', err.message);
        done();
      });
    });

    it('error type error', (done) => {
      assert.throws(() => {
        helper.notEqual('hooks.user.id', { fixed: 2 }, 22);
      }, (err) => {
        assert.ok(err instanceof Error);
        assert.equal('The error is called next when assert faild.', err.message);
        done();
      });
    });

    it('fixed compare equal', (done) => {
      const notEqual = helper.notEqual('hooks.user.id', { fixed: 1 }, Error('Hello'));
      const ctx = {
        hooks: {
          user: { id: 1 },
        },
        res: {
          badRequest: ({
            error = null, message = null,
          }) => {
            const { errors } = error;
            assert.deepEqual([{
              package: 'tea-rest-helper-assert',
              method: 'notEqual',
              message: 'Hello',
            }], errors);
            assert.equal('Hello', message);
            done();
          },
        },
      };
      notEqual(ctx);
    });

    it('fixed compare not equal', (done) => {
      const notEqual = helper.notEqual('hooks.user.id', { fixed: 1 }, Error('Hello'));
      const ctx = {
        hooks: {
          user: { id: 2 },
        },
      };
      notEqual(ctx, () => {
        assert.equal(null, ctx.body);
        done();
      });
    });

    it('Keypath compare equal', (done) => {
      const notEqual = helper.notEqual('hooks.user.id', { path: 'params.userId' }, Error('Hello'));
      const ctx = {
        hooks: {
          user: { id: 1 },
        },
        params: {
          userId: 1,
        },
        res: {
          badRequest: ({
            error = null, message = null,
          }) => {
            const { errors } = error;
            assert.deepEqual([{
              package: 'tea-rest-helper-assert',
              method: 'notEqual',
              message: 'Hello',
            }], errors);
            assert.equal('Hello', message);
            done();
          },
        },
      };
      notEqual(ctx);
    });

    it('Keypath compare not equal', (done) => {
      const notEqual = helper.notEqual('hooks.user.id', { path: 'params.userId' }, Error('Hello'));
      const ctx = {
        hooks: {
          user: { id: 2 },
        },
        params: {
          userId: 1,
        },
      };
      notEqual(ctx, () => {
        assert.equal(null, ctx.body);
        done();
      });
    });
  });

  describe('has', () => {
    it('obj type error', (done) => {
      assert.throws(() => {
        helper.has('hello');
      }, (err) => {
        assert.ok(err instanceof Error);
        assert.equal('Argument obj1 is fixed value or path of req object', err.message);
        done();
      });
    });

    it('obj2 type error', (done) => {
      assert.throws(() => {
        helper.has({ path: 'hooks.user.id' }, 'hello world');
      }, (err) => {
        assert.ok(err instanceof Error);
        assert.equal('Argument obj2 is fixed value or path of req object', err.message);
        done();
      });
    });

    it('obj1 validate error', (done) => {
      assert.throws(() => {
        helper.has({ name: 'hooks.user.id' });
      }, (err) => {
        assert.ok(err instanceof Error);
        assert.equal('Argument obj1 contains at least fixed, path one of them.', err.message);
        done();
      });
    });

    it('obj2 validate error', (done) => {
      assert.throws(() => {
        helper.has({ path: 'hooks.user.id' }, { name: 'hello world' });
      }, (err) => {
        assert.ok(err instanceof Error);
        assert.equal('Argument obj2 contains at least fixed, path one of them.', err.message);
        done();
      });
    });

    it('error type error', (done) => {
      assert.throws(() => {
        helper.has({ path: 'hooks.user.id' }, { fixed: [2, 3, 5] }, 22);
      }, (err) => {
        assert.ok(err instanceof Error);
        assert.equal('The error is called next when assert faild.', err.message);
        done();
      });
    });

    it('fixed compare has true', (done) => {
      const has = helper.has({ path: 'hooks.user.id' }, { fixed: [1, 2, 3] }, Error('Hello'));
      const ctx = {
        hooks: {
          user: { id: 1 },
        },
      };
      has(ctx, () => {
        assert.equal(null, ctx.body);
        done();
      });
    });

    it('fixed compare not has', (done) => {
      const has = helper.has({ path: 'hooks.user.id' }, { fixed: [1, 2, 3] }, Error('Hello'));
      const ctx = {
        hooks: {
          user: { id: 4 },
        },
        res: {
          badRequest: ({
            error = null, message = null,
          }) => {
            const { errors } = error;
            assert.deepEqual([{
              package: 'tea-rest-helper-assert',
              method: 'has',
              message: 'Hello',
            }], errors);
            assert.equal('Hello', message);
            done();
          },
        },
      };
      has(ctx);
    });

    it('Keypath compare has', (done) => {
      const has = helper.has({ path: 'hooks.user.id' }, { path: 'params.users' }, Error('Hello'));
      const ctx = {
        hooks: {
          user: { id: 1 },
        },
        params: {
          users: '1,2,3',
        },
      };
      has(ctx, () => {
        assert.equal(null, ctx.body);
        done();
      });
    });


    it('Keypath compare not has', (done) => {
      const has = helper.has({ path: 'hooks.user.id' }, { path: 'params.users' }, Error('Hello'));
      const ctx = {
        hooks: {
          user: { id: 4 },
        },
        params: {
          users: '1,2,3',
        },
        res: {
          badRequest: ({
            error = null, message = null,
          }) => {
            const { errors } = error;
            assert.deepEqual([{
              package: 'tea-rest-helper-assert',
              method: 'has',
              message: 'Hello',
            }], errors);
            assert.equal('Hello', message);
            done();
          },
        },
      };
      has(ctx);
    });


    it('Keypath compare not has obj1 isnt number false', (done) => {
      const has = helper.has({ path: 'hooks.user.id' }, { path: 'params.users' }, Error('Hello'));
      const ctx = {
        hooks: {
          user: { id: '4' },
        },
        params: {
          users: '1,2,3',
        },
        res: {
          badRequest: ({
            error = null, message = null,
          }) => {
            const { errors } = error;
            assert.deepEqual([{
              package: 'tea-rest-helper-assert',
              method: 'has',
              message: 'Hello',
            }], errors);
            assert.equal('Hello', message);
            done();
          },
        },
      };
      has(ctx);
    });

    it('obj1 is fixed value compare true', (done) => {
      const has = helper.has({ fixed: '2' }, { path: 'params.users' }, Error('Hello'));
      const ctx = {
        params: {
          users: '1,2,3',
        },
      };
      has(ctx, () => {
        assert.equal(null, ctx.body);
        done();
      });
    });

    it('obj1 is fixed value compare obj2 is map true', (done) => {
      const has = helper.has({ fixed: 2 }, { path: 'params.users' }, Error('Hello'));
      const users = new Map();
      users.set(2, {});
      const ctx = {
        params: {
          users,
        },
      };
      has(ctx, () => {
        assert.equal(null, ctx.body);
        done();
      });
    });

    it('obj1 is fixed value compare obj2 is map false', (done) => {
      const has = helper.has({ fixed: '2' }, { path: 'params.users' }, Error('Hello'));
      const users = new Map();
      users.set(5, {});
      const ctx = {
        params: {
          users,
        },
        res: {
          badRequest: ({
            error = null, message = null,
          }) => {
            const { errors } = error;
            assert.deepEqual([{
              package: 'tea-rest-helper-assert',
              method: 'has',
              message: 'Hello',
            }], errors);
            assert.equal('Hello', message);
            done();
          },
        },
      };
      has(ctx);
    });

    it('Keypath compare not has obj1 isnt number true', (done) => {
      const has = helper.has({ path: 'hooks.user.id' }, { path: 'params.users' }, Error('Hello'));
      const ctx = {
        hooks: {
          user: { id: '3' },
        },
        params: {
          users: '1,2,3',
        },
      };
      has(ctx, () => {
        assert.equal(null, ctx.body);
        done();
      });
    });

    it('Keypath compare not has obj1 is string', (done) => {
      const has = helper.has({ path: 'hooks.user.id' }, { path: 'params.users' }, Error('Hello'));
      const ctx = {
        hooks: {
          user: { id: 4 },
        },
        params: {
          users: '1,2,3',
        },
        res: {
          badRequest: ({
            error = null, message = null,
          }) => {
            const { errors } = error;
            assert.deepEqual([{
              package: 'tea-rest-helper-assert',
              method: 'has',
              message: 'Hello',
            }], errors);
            assert.equal('Hello', message);
            done();
          },
        },
      };
      has(ctx);
    });

    it('Keypath compare not has obj1 is string, obj2 is array', (done) => {
      const has = helper.has({ path: 'hooks.user.id' }, { path: 'params.users' }, Error('Hello'));
      const ctx = {
        hooks: {
          user: { id: 4 },
        },
        params: {
          users: [1, 2, 3],
        },
        res: {
          badRequest: ({
            error = null, message = null,
          }) => {
            const { errors } = error;
            assert.deepEqual([{
              package: 'tea-rest-helper-assert',
              method: 'has',
              message: 'Hello',
            }], errors);
            assert.equal('Hello', message);
            done();
          },
        },
      };
      has(ctx);
    });

    it('Keypath compare not has obj1 is string, obj2 is Set false', (done) => {
      const has = helper.has({ path: 'hooks.user.id' }, { path: 'params.users' }, Error('Hello'));
      const ctx = {
        hooks: {
          user: { id: 4 },
        },
        params: {
          users: new Set([1, 2, 3]),
        },
        res: {
          badRequest: ({
            error = null, message = null,
          }) => {
            const { errors } = error;
            assert.deepEqual([{
              package: 'tea-rest-helper-assert',
              method: 'has',
              message: 'Hello',
            }], errors);
            assert.equal('Hello', message);
            done();
          },
        },
      };
      has(ctx);
    });

    it('Keypath compare not has obj1 is string, obj2 is Set true', (done) => {
      const has = helper.has({ path: 'hooks.user.id' }, { path: 'params.users' }, Error('Hello'));
      const ctx = {
        hooks: {
          user: { id: 2 },
        },
        params: {
          users: new Set([1, 2, 3]),
        },
      };
      has(ctx, () => {
        assert.equal(null, ctx.body);
        done();
      });
    });

    it('Keypath compare not has obj1 is string, obj2 is Set false', (done) => {
      const has = helper.has({ path: 'hooks.user.id' }, { path: 'params.users' }, Error('Hello'));
      const ctx = {
        hooks: {
          user: { id: 5 },
        },
        params: {
          users: new Set([1, 2, 3]),
        },
        res: {
          badRequest: ({
            error = null, message = null,
          }) => {
            const { errors } = error;
            assert.deepEqual([{
              package: 'tea-rest-helper-assert',
              method: 'has',
              message: 'Hello',
            }], errors);
            assert.equal('Hello', message);
            done();
          },
        },
      };
      has(ctx);
    });

    it('Keypath compare not has obj1 is string, obj2 is object true', (done) => {
      const has = helper.has({ path: 'hooks.user.id' }, { path: 'params.users' }, Error('Hello'));
      const ctx = {
        hooks: {
          user: { id: 'name' },
        },
        params: {
          users: { name: 'Redstone' },
        },
      };
      has(ctx, () => {
        assert.equal(null, ctx.body);
        done();
      });
    });

    it('Keypath compare not has obj1 is string, obj2 is object false', (done) => {
      const has = helper.has({ path: 'hooks.user.id' }, { path: 'params.users' }, Error('Hello'));
      const ctx = {
        hooks: {
          user: { id: 'age' },
        },
        params: {
          users: { name: 'Redstone' },
        },
        res: {
          badRequest: ({
            error = null, message = null,
          }) => {
            const { errors } = error;
            assert.deepEqual([{
              package: 'tea-rest-helper-assert',
              method: 'has',
              message: 'Hello',
            }], errors);
            assert.equal('Hello', message);
            done();
          },
        },
      };
      has(ctx);
    });

    it('Keypath compare not has obj1 is string, obj2 is null', (done) => {
      const has = helper.has({ path: 'hooks.user.id' }, { path: 'params.users' }, Error('Hello'));
      const ctx = {
        hooks: {
          user: { id: 'age' },
        },
        params: {
          users: null,
        },
        res: {
          badRequest: ({
            error = null, message = null,
          }) => {
            const { errors } = error;
            assert.deepEqual([{
              package: 'tea-rest-helper-assert',
              method: 'has',
              message: 'Hello',
            }], errors);
            assert.equal('Hello', message);
            done();
          },
        },
      };
      has(ctx);
    });
  });

  describe('notHas', () => {
    it('obj type error', (done) => {
      assert.throws(() => {
        helper.notHas('hello');
      }, (err) => {
        assert.ok(err instanceof Error);
        assert.equal('Argument obj1 is fixed value or path of req object', err.message);
        done();
      });
    });

    it('obj2 type error', (done) => {
      assert.throws(() => {
        helper.notHas({ path: 'hooks.user.id' }, 'hello world');
      }, (err) => {
        assert.ok(err instanceof Error);
        assert.equal('Argument obj2 is fixed value or path of req object', err.message);
        done();
      });
    });

    it('obj1 validate error', (done) => {
      assert.throws(() => {
        helper.notHas({ name: 'hooks.user.id' });
      }, (err) => {
        assert.ok(err instanceof Error);
        assert.equal('Argument obj1 contains at least fixed, path one of them.', err.message);
        done();
      });
    });

    it('obj2 validate error', (done) => {
      assert.throws(() => {
        helper.notHas({ path: 'hooks.user.id' }, { name: 'hello world' });
      }, (err) => {
        assert.ok(err instanceof Error);
        assert.equal('Argument obj2 contains at least fixed, path one of them.', err.message);
        done();
      });
    });

    it('error type error', (done) => {
      assert.throws(() => {
        helper.notHas({ path: 'hooks.user.id' }, { fixed: [2, 3, 5] }, 22);
      }, (err) => {
        assert.ok(err instanceof Error);
        assert.equal('The error is called next when assert faild.', err.message);
        done();
      });
    });

    it('fixed compare nothas true', (done) => {
      const notHas = helper.notHas({ path: 'hooks.user.id' }, { fixed: [1, 2, 3] }, Error('Hello'));
      const ctx = {
        hooks: {
          user: { id: 4 },
        },
      };
      notHas(ctx, () => {
        assert.equal(null, ctx.body);
        done();
      });
    });

    it('fixed compare notHas false', (done) => {
      const notHas = helper.notHas({ path: 'hooks.user.id' }, { fixed: [1, 2, 3] }, Error('Hello'));
      const ctx = {
        hooks: {
          user: { id: 1 },
        },
        res: {
          badRequest: ({
            error = null, message = null,
          }) => {
            const { errors } = error;
            assert.deepEqual([{
              package: 'tea-rest-helper-assert',
              method: 'notHas',
              message: 'Hello',
            }], errors);
            assert.equal('Hello', message);
            done();
          },
        },
      };
      notHas(ctx);
    });

    it('Keypath compare notHas true', (done) => {
      const notHas = helper.notHas({
        path: 'hooks.user.id',
      }, {
        path: 'params.users',
      }, Error('Hello'));
      const ctx = {
        hooks: {
          user: { id: 4 },
        },
        params: {
          users: '1,2,3',
        },
      };
      notHas(ctx, () => {
        assert.equal(null, ctx.body);
        done();
      });
    });

    it('Keypath compare notHas false', (done) => {
      const notHas = helper.notHas({
        path: 'hooks.user.id',
      }, {
        path: 'params.users',
      }, Error('Hello'));
      const ctx = {
        hooks: {
          user: { id: 2 },
        },
        params: {
          users: [1, 2, 3],
        },
        res: {
          badRequest: ({
            error = null, message = null,
          }) => {
            const { errors } = error;
            assert.deepEqual([{
              package: 'tea-rest-helper-assert',
              method: 'notHas',
              message: 'Hello',
            }], errors);
            assert.equal('Hello', message);
            done();
          },
        },
      };
      notHas(ctx);
    });
  });

  describe('exists', () => {
    it('keyPath type error', (done) => {
      assert.throws(() => {
        helper.exists({});
      }, (err) => {
        assert.ok(err instanceof Error);
        assert.equal('Gets the value at path of object.', err.message);
        done();
      });
    });

    it('error defaultValue', (done) => {
      const exists = helper.exists('hooks.users');
      const ctx = {
        hooks: {
          user: { id: 2, isDelete: 'no' },
        },
        params: {
          users: [1, 2, 3],
        },
        res: {
          badRequest: ({
            error = null, message = null,
          }) => {
            const { errors } = error;
            assert.deepEqual([{
              package: 'tea-rest-helper-assert',
              method: 'exists',
              message: 'Resource not found.',
            }], errors);
            assert.equal('Resource not found.', message);
            done();
          },
        },
      };
      exists(ctx);
    });

    it("assert exists true, isDelete 'no'", (done) => {
      const exists = helper.exists('hooks.user', Error('hello world'));
      const ctx = {
        hooks: {
          user: { id: 2, isDelete: 'no' },
        },
        params: {
          users: [1, 2, 3],
        },
      };
      exists(ctx, () => {
        assert.equal(null, ctx.body);
        done();
      });
    });

    it('assert exists false', (done) => {
      const exists = helper.exists('hooks.user', Error('hello world'));
      const ctx = {
        hooks: {
        },
        params: {
          users: [1, 2, 3],
        },
        res: {
          badRequest: ({
            error = null, message = null,
          }) => {
            const { errors } = error;
            assert.deepEqual([{
              package: 'tea-rest-helper-assert',
              method: 'exists',
              message: 'hello world',
            }], errors);
            assert.equal('hello world', message);
            done();
          },
        },
      };
      exists(ctx);
    });

    it("assert exists true isDelete 'yes'", (done) => {
      const exists = helper.exists('hooks.user', Error('hello world'));
      const ctx = {
        hooks: {
          user: { id: 2, isDelete: 'yes' },
        },
        params: {
          users: [1, 2, 3],
        },
        res: {
          badRequest: ({
            error = null, message = null,
          }) => {
            const { errors } = error;
            assert.deepEqual([{
              package: 'tea-rest-helper-assert',
              method: 'exists',
              message: 'hello world',
            }], errors);
            assert.equal('hello world', message);
            done();
          },
        },
      };
      exists(ctx);
    });
  });
});
