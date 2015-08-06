let {
  Loader, main, unload, parseStack, generateMap, resolve, join,
  Require, Module
} = require('toolkit/loader');

exports['test custom require and caching'] = function(assert) {
  const loader = Loader({
    require: (require, id) => {
      // Just load it normally
      return require(id);
    }
  });
  const require = Require(loader, module);

  let data = require('./fixtures/loader/json/manifest.json');
  assert.equal(data.version, '1.0.1', 'has initial value');
  data.version = '2.0.0';
  let newdata = require('./fixtures/loader/json/manifest.json');
  assert.equal(newdata.version, '2.0.0',
    'JSON objects returned should be cached and the same instance');
};
