// webpack doesnt support ESM loaders, so its dont this way
module.exports = function GuiderWebpackLoader(source) {
  const callback = this.async();
  void import('./dist/loader.js').then((mod) =>
    mod.default.call(this, source, callback),
  );
};
