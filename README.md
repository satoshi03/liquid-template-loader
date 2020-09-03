# Liquid Template Loader

Liquid template engine (see http://github.com/shopify/liquid) for webpack loader.

This loader was ported from liquid-loader (see https://github.com/azeeson/liquid-loader).

## Getting Started

To begin, you'll need to install `liquid-template-loader`.

```
npm install --save-dev liquid-template-loader
```

** index.html **

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Document</title>
</head>
<body>
  <p>Hi {{ name }}</p>
</body>
</html>
```

** webapck.config.js **

```js
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  module: {
    rules: [
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader'
          },
          {
            loader: 'liquid-template-loader',
            options: {
              data: {
                'name': 'satoshi'
              },
            }
          }
        ]
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: __dirname + 'index.html',
    })
  ]
}
```

## Usage

### Add filters

```js
options: {
  ...
  filters: {
    myFilter: input => {
      return String(input).toUpperCase()
    }
  }
}

```

### Add tags

```js
options: {
  ...
  tags: {
    myTag: class MyTag extends Liquid.Tag {
      render () {
        return 'Hello World';
      }
    }
  }
}
```

For detail implementaion, you can see https://github.com/docs/liquid/tree/master/lib/liquid/tags.

## License

[MIT](./LICENSE)
