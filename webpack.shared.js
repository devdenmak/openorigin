/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable @typescript-eslint/no-var-requires */
const svg = require('@neodx/svg/webpack')

const webpackConfig = (config, options) => {
  const { isServer } = options

  config.resolve.alias['@'] = __dirname

  if (!isServer) {
    config.plugins.push(
      svg({
        root: 'app/src/app/icons',
        output: 'public/sprites',
        group: true,
        fileName: '{name}.{hash:8}.svg',

        metadata: {
          path: 'app/src/app/icons/sprite.gen.ts',
          runtime: {
            size: true,
            viewBox: true,
          },
        },

        resetColors: {
          replaceUnknown: 'currentColor',
          replace: [
            {
              from: ['white'],
              to: '#fff',
            },
          ],
        },
      }),
    )
  }

  return config
}

module.exports = webpackConfig
