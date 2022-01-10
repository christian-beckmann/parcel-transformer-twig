# parcel-transformer-twig

Parcel v2 transformer plugin for twig (twig.js).

Inspired of Parcel v1 plugin [parcel-plugin-twig](https://github.com/arnorhs/parcel-plugin-twig) 

## Installation

```sh
npm i -D christian-beckmann/parcel-transformer-twig
```

## Configuration

.parcelrc [Parcel Configuration](https://parceljs.org/features/plugins/#.parcelrc)

```json
{
  "extends": ["@parcel/config-default"],
  "transformers": {
    "*.twig": ["@christian-beckmann/parcel-transformer-twig"]
  }
}
```

Reference [Parcel plugin configuration](https://parceljs.org/features/plugins/)

## Customization

You can add custom options for ejs templating engine using a `.twigrc`, `.twigrc.js` file.

For more information on customization options, see [twig.js](https://github.com/twigjs/twig.js)

### Watching subfolder *.twig files

To watch included/embedded files, parcel needs to know the folder (because twig.js doesn't inform parcel about the included files).

.twigrc

```json
{
  "watchFolder": "./src"
}
```
