/**
 * Module script __NAME__
 *
 * COM structure
 * -------------------
 *
 * The list of available properties that can be processed by system:
 *
 * @property html {string|boolean}
 * COM HTML markup that can be showed straight away. Can be preprocessed by
 * constructor if it needed.
 * The "index.html" file will be loaded by system if this property will defined
 * as (boolean) true.
 *
 * @property css {string|boolean}
 * COM CSS styles that can be showed straight away. Can be preprocessed by
 * constructor if it needed.
 * The "style.css" file will be loaded by system if this property will defined
 * as (boolean) true
 *
 * @property node {string|object}
 * This property allows to define the list of nodes in HTML template that will
 * be used by component. This property can to be presented as string in special
 * format or as object. This nodes will available from this property for
 * internal usage when the instance of component will created.
 * Definition as string format:
 *   "propName1: selector2; propName2: selector2; propName3asClassName"
 * Definition as object format:
 *   {
 *    propName1: "selector2",
 *    propName2: "selector2",
 *    propName3asClassName: true
 *   }
 *
 * @property onCreate {function}
 * The method that will be executed when component instance will created
 *
 * @property onRequest {function}
 * The method for some exclusive requests, such as COM->COM or system->COM
 *
 * @property onShow {function}
 * The method that will be executed when the page that contains this COM will be shown
 *
 * @property onHide {function}
 * The method that will be executed when the page that contains this COM will be hided
 *
 * @param $R {object} System namespace
 *
 * @param $O {object}
 * COM instance options:
 *   DOM {node} The COM instance DOM sandbox
 *   node {object} The object of named DOM nodes. See @property node
 *   id {string|null} The COM instance ID
 *   name {string} The COM name
 *   options {object} The COM instance options
 *   template (id, DOM) {function} Returns (string) template that was defined in component DOM or in document.body
 *     Template definition format: <script type="text/template" id="{id}"> {template} </script>
 *     @param id {string} Template identifier
 *     @param DOM {node|undefined} Optional parameter. Default: @param DOM
 *   spin {spinner} The COM spinner object
 *   stylesheet {style} The COM stylesheet node
 *   type {string} The COM type (module/layout/etc.)
 *   isReady {function} Returns (boolean) COM current ready state
 *   isVisible {function} Returns (boolean) COM current visibility state
 *   extractNodes (dom, def) {function} Returns (object) DOM nodes
 *     @param dom {node} The DOM node that contains nodes which arelisted in @param str
 *     @param def {string|object} Same as @property node
 *
 * @returns {COM __NAME__}
 */
function __NAME__ ($R, $O)
 {
  this.html = String(/*[include src="index.html" format="STRING"]*/);
  this.css = String(/*[include src="style.css" format="STRING"]*/);
  //this.node = 'wait; error; empty; data; list; item';
 }