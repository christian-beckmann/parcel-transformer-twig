const glob = require("glob");
const Twig = require('twig'); // Twig module
const {Transformer} = require('@parcel/plugin');

module.exports = new Transformer({
  async loadConfig({config}) {
    const {contents, filePath} =
    (await config.getConfig(['.twigrc', '.twigrc.js'])) || {};

    if (contents) {
      if (filePath.endsWith('.js')) {
        config.invalidateOnStartup();
      }
      config.invalidateOnFileChange(filePath);
    } else {
      config.invalidateOnFileCreate({
        fileName: '.twigrc' || '.twigrc.js',
        aboveFilePath: config.searchPath,
      });
    }

    return contents;
  },
  async transform({asset, config, logger}) {
    // const source = await asset.getCode();

    const twigConfig = config || {};

    asset.type = 'html';
    let options = {
      path: asset.filePath,
      // data: source,
      async: false,
      debug: false,
      trace: false,
      ...twigConfig,
    }

    // IMPORTANT: cache false, it rerenders included/embedded files
    Twig.cache(false);

    // config special functions, filters or extend
    const {
      functions,
      filters,
      extend,
      watchFolder
    } = twigConfig;

    if (functions) {
      Object.keys(functions).forEach(function (key) {
        Twig.extendFunction(key, functions[key])
      })
    }

    if (filters) {
      Object.keys(filters).forEach(function (key) {
        Twig.extendFilter(key, filters[key])
      })
    }

    if (extend) {
      Twig.extend(extend)
    }

    // watch
    if (watchFolder) {
      glob(watchFolder + '/**/*.twig', {}, (err, files) => {
        if (err) return;

        files.map(file => {
          asset.invalidateOnFileChange(file);
          // logger.info({message: file})
        });
      })
    }

    // filePath
    let resultFile = Twig.twig(options).render();
    asset.setCode(resultFile); // if path: asset.filePath

    // todo asset.invalidateOnFileChange puts watcher of included/embedded files to parcel

    return [asset];
  },
});
