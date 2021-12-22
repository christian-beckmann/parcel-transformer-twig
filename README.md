# parcel-transformer-twig

Parcel v2 transformer plugin for twig (twig.js).

Inspired of Parcel v1 plugin [parcel-plugin-twig](https://github.com/arnorhs/parcel-plugin-twig) 

## Installation

```sh
npm i -D parcel-transformer-twig
```

## Configuration

.parcelrc

```json
{
  "extends": ["@parcel/config-default"],
  "transformers": {
    "*.twig": ["parcel-transformer-twig"]
  }
}
```

Reference [Parcel plugin configuration](https://v2.parceljs.org/configuration/plugin-configuration/)

## Customization

You can add custom options for ejs templating engine using a `.twigrc`, `.twigrc.js` file.

For more information on customization options, see [twig.js](https://github.com/twigjs/twig.js)
