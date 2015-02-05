module.exports = {
  list: [],


  add: function(observer) {
    return this.list.push(observer);
  },


  get: function(index) {
    return this.list[index] || false;
  },


  remove: function(index) {
    return this.list.splice(index, 1);
  },


  notify: function(context) {
    for (var i = this.list.length - 1; i >= 0; i--) {
      var observer = this.list.get(i);

      if(observer && observer.update) {
        observer.update(context);
      }
    };
  }
}