module.exports = {
  defaultSeverity: 'error',
  extends: [
    'stylelint-config-recommended',
    'stylelint-config-standard'
  ],
  plugins: [
    'stylelint-scss',
    'stylelint-order'
  ],
  rules: {
    // 因已用autoprefixer添加供应商前缀，所以以下6项规则禁止
    'media-feature-name-no-vendor-prefix': true, // 禁止媒体特性属性名添加供应商前缀
    'at-rule-no-vendor-prefix': true, // 禁止AT规则添加供应商前缀
    'selector-no-vendor-prefix': true, // 禁止选择器添加供应商前缀
    'property-no-vendor-prefix': true, // 禁止属性添加供应商前缀
    'value-no-vendor-prefix': true, // 禁止值添加供应商前缀
    'order/properties-alphabetical-order': null,
    'selector-pseudo-class-no-unknown': [true, {
      'ignorePseudoClasses': ['global', 'local']
    }],
    'order/properties-order': [
      'font-family',
      'font-size',
      'font-weight',
      'text-align',
      'text-justify',
      'text-indent',
      'text-overflow',
      'text-decoration',
      'white-space',
      'color',
      'width',
      'min-width',
      'max-width',
      'height',
      'min-height',
      'max-height',
      'margin',
      'margin-top',
      'margin-right',
      'margin-bogttom',
      'margin-left',
      'padding',
      'padding-top',
      'padding-right',
      'padding-bottom',
      'padding-left',
      'float',
      'clear',
      'overflow',
      'overflow-x',
      'overflow-y',
      'background',
      'background-position',
      'background-repeat',
      'background-size',
      'background-color',
      'background-clip',
      'border',
      'border-style',
      'border-width',
      'border-color',
      'border-top-style',
      'border-top-width',
      'border-top-color',
      'border-right-style',
      'border-right-width',
      'border-right-color',
      'border-bottom-style',
      'border-bottom-width',
      'border-bottom-color',
      'border-left-style',
      'border-left-width',
      'border-left-color',
      'border-radius',
      'opacity',
      'filter',
      'list-style',
      'outline',
      'visibility',
      'box-shadow',
      'text-shadow',
      'resize',
      'transition',
      'position',
      'top',
      'bottom',
      'right',
      'left',
      'z-index',
      'display',
      'flex-direction',
      'justify-content',
      'align-items'
    ],
  }
};
