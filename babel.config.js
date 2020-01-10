module.exports = {
  // babel.config.js 跟 .babelrc 的原理是一样的，只是JavaScript文件更灵活，所以babel7建议使用 babel.config.js
  presets: [
    [
      '@babel/preset-env',
      {
        // 我们目前的配置,babel会把ES6模块定义转为CommonJS定义，但webpack自己可以处理import和export,而且webpack处理import时会做代码优化，把没用到的部分代码删除掉。因此我们通过babel提供的modules: false选项把ES6模块转为CommonJS模块的功能给关闭掉
        modules: false,
        useBuiltIns: 'usage',
        // 默认情况下，对corejs的polyfill，只会注入那些stabled的ES特性，还处于proposal状态的polyfill则不会注入。
        // 如果需要注入proposals的polyfill，则可以考虑将corejs的proposals: true
        corejs: { version: 3, proposals: true },
      },
    ],
    '@babel/preset-react',
  ],
  plugins: [
    'react-hot-loader/babel',
    '@babel/plugin-proposal-optional-chaining',
    '@babel/plugin-proposal-nullish-coalescing-operator',
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    ['@babel/plugin-proposal-class-properties', { loose: true }],
    [
      '@babel/plugin-transform-runtime',
      {
        regenerator: false,
      },
    ],
  ],
};
