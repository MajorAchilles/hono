// {
//   "extends": "amlan"
// }

module.exports = {
  extends: "amlan",
  rules: {
    "arrow-body-style": "off",
    "no-plusplus": "off",
    "no-console": "off",
    "import/prefer-default-export": "off",
    "comma-dangle": ["error", "never"],
    indent: ["error", 2, { SwitchCase: 1 }],
    "max-len": ["error", 120, 2, { ignoreComments: true }],
    quotes: ["error", "double"]
  }
};
