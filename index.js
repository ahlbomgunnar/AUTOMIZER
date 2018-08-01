'use strict'

var Automizer = function(delay) {
  this.index = 0
  this.store = []
  this.state = {}
  this.defaultDelay = delay || 3000
}

Automizer.prototype = {
  add: function(...functions) {
    functions.forEach(fn => this.store.push({fn:fn}))
    console.log('STORE=>', this.store)
  },
  run: function(index) {
    (index || index === 0) && (this.index = index)
    this.next()
  },
  next: function(state) {
    var self = this,
    i = this.index++,
    at = this.store[i],
    next = this.store[this.index]
    this.state = state
    if(!at) return
    at.fn(function(newState) {
      console.log('Automizer('+this.index+'):', newState)
      self.next(newState)        
    }, this.state)
  },
  reset: function() {
    this.index = 0
  },
  clear: function() {
    this.store.length = 0
  },
  retry: function() {
    this.reset()
    this.run()
  }
}

module.exports = Automizer