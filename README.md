# Understanding Global Scope

This repository shows how different node environments treat global variables differently.

To test:
1. Run `node scope.js` in a Terminal window
2. Open `index.html` in a browser.

Browsers will treat as a global any variable that is declared with `var` _outside_ any function block. This will _not_ happen if you run the `scope.js` script directly with Node from the Command Line.

Browsers will recognise that such a variable has been declared _even before_ it is assigned a value.

**Both** Node and browsers will treat as a global any variable that is _not declared_ with `const`, `let` or `var` _outside_ a function block.