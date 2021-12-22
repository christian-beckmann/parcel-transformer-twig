const Twig = require('twig'); // Twig module
const twig = Twig.twig;       // Render function
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
  async transform({asset, config}) {
    const source = await asset.getCode();

    const twigConfig = config || {};

    asset.type = 'html';
    let options = {
      // path: asset.filePath,
      async: false,
      debug: false,
      trace: false,
      ...twigConfig,
      data: source,
    }

    // config special functions, filters or extend
    const {
      functions,
      filters,
      extend
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

    // asset.setCode(Twig.twig(options).render()); // if path: asset.filePath
    asset.setCode(Twig.twig(options).render(options.data));

    return [asset];
  },
});
