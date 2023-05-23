module.exports = {
    extends: ["stylelint-config-standard", "stylelint-prettier/recommended", "stylelint-config-rational-order",],
    plugins: ["stylelint-scss"],
    customSyntax: "postcss-scss",
    rules: {
        "selector-class-pattern": null,
        "at-rule-no-unknown": null,
        "scss/at-rule-no-unknown": true,
        "selector-pseudo-class-no-unknown": [true, { ignorePseudoClasses: ["global", "local"] }],
    },
};
