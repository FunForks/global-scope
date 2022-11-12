// Showing `globalThis` is easy, but in a browser it will
// contain hundreds of key-value pairs.
//
// console.log("globalThis:", Object.keys(globalThis));
//
// It is more meaningful just to show which of the variables
// that are set in this script have been saved as globals.
// See the function at the end for details.
console.log("custom globals before:", getCustomGlobals());

const aLocalConst = "I'm a constant"
let aLocalLet = "I'm a let variable"
var aVar = "I'm a var"
anUndeclaredVariable = "I'm undeclared"

function createScope() {
  anUndeclaredVariableInAFunction = "I don't exist outside my function"
}

// console.log("globalThis:", Object.keys(globalThis));
console.log("custom globals after:", getCustomGlobals());
console.log("")

console.log("aLocalConst:", aLocalConst);
console.log("aLocalLet:", aLocalLet);
console.log("aVar:", aVar);

// The following line will cause an error
console.log("anUndeclaredVariableInAFunction:", anUndeclaredVariableInAFunction);



function getCustomGlobals() {
  const customVariableNames = [
    "aLocalConst",
    "aLocalLet",
    "aVar",
    "anUndeclaredVariable",
    "anUndeclaredVariableInAFunction"
  ]

  const customGlobalNames = Object.keys(globalThis)
                                  .filter(variableName => (
                                    customVariableNames.includes(variableName)
                                  ))
  
  function getKeyAndValue(output, key){
    return output + `
    ${key}: ${globalThis[key]}`
  }

  const keysAndValues = customGlobalNames.reduce(getKeyAndValue, "")

  return keysAndValues
}


/* OUTPUT IN VS CODE WHEN YOU RUN node scope.js
custom globals before: 
custom globals after: 
    anUndeclaredVariable: I'm undeclared

aLocalConst: I'm a constant
aLocalLet: I'm a let variable
aVar: I'm a var
console.log("anUndeclaredVariableInAFunction:", anUndeclaredVariableInAFunction);
                                                ^
ReferenceError: anUndeclaredVariableInAFunction is not defined
*/

/* OUTPUT IN THE CONSOLE IN CHROME WHEN YOU LOAD index.html
custom globals before: 
    aVar: undefined
custom globals after: 
    aVar: I'm a var
    anUndeclaredVariable: I'm undeclared

aLocalConst: I'm a constant
aLocalLet: I'm a let variable
aVar: I'm a var
Uncaught ReferenceError: anUndeclaredVariableInAFunction is not defined
*/

/* OUTPUT IN THE CONSOLE IN FIREFOX WHEN YOU LOAD index.html
custom globals before: 
    aVar: undefined
custom globals after: 
    aVar: I'm a var
    anUndeclaredVariable: I'm undeclared
<empty string>
aLocalConst: I'm a constant
aLocalLet: I'm a let variable
aVar: I'm a var
Uncaught ReferenceError: anUndeclaredVariableInAFunction is not defined
*/