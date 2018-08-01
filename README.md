# Automizer

### A JavaScript synchronous functional executor
#### Fully synchronous function chaining, *without* ``Promise.then()``.

> This package is registered under the [MIT Lisence](https://opensource.org/licenses/MIT).

### Introduction

There's a common problem when working with functionality spanning over multiple external data-sources,
and every request dependent on the previous to function correctly.

What you usually end up with when tackling this problem is *large, nested trees of promises*,
*unreadable execution calls* or whacky ``Promise.all`` workarounds.

### Automizer to the rescue!

Automizer makes function chaining avaliable in a "schema"-like way.
We do this to create flat, readable and maintainable chains in an effort to automate tasks.

##### Run any chain of functions, passing values like ``Promise.then()``.

```javascript

var automizer = new Automizer()

automizer.add(
  fn => 
    fn(getData('https://www.userData.com/'))
  },
  (fn, state) =>
    fn(getData(state.history))
  },
  (fn, state) => {
    createReport(state)
    fn()
  }
)

automizer.run()

```
Starting off, each function has two parameters.
``fn``, the return function, used as a callback

###### There's no *theoretical* limit to the length of the function chain.
Initially, ``state`` is empty, but through calling ``fn()`` with an argument, the next function may utilize the previous result.

### API specification

Initialize a new Automizer module using the 'new' keyword ``new Automizer()``.

```javascript
// Populate the execution store with
// a chain of functions as arguments.
Automizer.prototype.add(...functions)

// Run 
Automizer.prototype.run()
    
// Iterate to next execution index
Automizer.prototype.next()
    
// Reset execution index
Automizer.prototype.reset()
    
// Clear internal store
Automizer.prototype.clear()
    
// Run store from the start
Automizer.prototype.retry()

```

Extended version will be uploaded at a later time.