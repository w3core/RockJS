(new function($R){

  var $F = new Format;

  /**
   * Provides default text formating function
   */
  function Format () {
    var that = this;

    // ~~ quote(this.title) ~~
    that.quote = function quote (s) {
      //TODO: implementation
      return s;
    }
  }

  /**
   * @param tpl {String} Template content
   * @param data {Object} Rendering data
   * @param mixins {Object} Custom mixin functions
   * 
   * @returns {String}
   */
  function template (tpl, data, mixins) {
    var self = arguments.callee;
    if (!self.cache) self.cache = {};
    if (typeof self.cache[tpl] != 'string') {
      var re = /(~~)([^\1]+?)?\1/g, reExp = /(^( )?(if|for|else|switch|case|break|{|}))(.*)?/g, code = 'var r=[];\n', cursor = 0, match;
      var add = function(line, js) {
        js? (code += line.match(reExp) ? line + '\n' : 'r.push(' + line + ');\n') :
            (code += line != '' ? 'r.push("' + line.replace(/"/g, '\\"') + '");\n' : '');
        return add;
      }
      while(match = re.exec(tpl)) {
        add(tpl.slice(cursor, match.index))(match[2], true);
        cursor = match.index + match[0].length;
      }
      add(tpl.substr(cursor, tpl.length - cursor));
      code += 'return r.join("");';
      self.cache[tpl] = code;
    }

    var args = {key:['$F'], val:[$F]};
    if (mixins && typeof mixins == OBJECT) {
      for (var i in mixins) {
        args.key.push(i);
        args.val.push(mixins[i]);
      }
    }
    args.key.push(self.cache[tpl].replace(/[\r\t\n]/g, ''));

    return (Function.apply(null, args.key)).apply(data, args.val);
  }

  $R.template = template;

}($R));