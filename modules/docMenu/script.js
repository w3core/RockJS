function module_docMenu(e,n){var r=this,i=e.value([{'section':1,'id':'1','title':'Introduction','anchor':'#\/doc\/1'},{'section':2,'id':'2','title':'Lineaments','anchor':'#\/doc\/2'},{'section':3,'id':'3','title':'Requirements','anchor':'#\/doc\/3'},{'section':4,'id':'4','title':'Installation','anchor':'#\/doc\/4'},{'section':5,'id':'5','title':'Quick Start Guide','anchor':'#\/doc\/5','children':[{'section':5,'id':'5.1','title':'CLI','anchor':'#\/doc\/5.1'},{'section':5,'id':'5.2','title':'Project configuration','anchor':'#\/doc\/5.2'},{'section':5,'id':'5.3','title':'Hello World!','anchor':'#\/doc\/5.3'}]},{'section':6,'id':'6','title':'Events system','anchor':'#\/doc\/6','children':[{'section':6,'id':'6.1','title':'Event body','anchor':'#\/doc\/6.1'},{'section':6,'id':'6.2','title':'Event prefix','anchor':'#\/doc\/6.2'},{'section':6,'id':'6.3','title':'Event methods','anchor':'#\/doc\/6.3'},{'section':6,'id':'6.4','title':'Usage example','anchor':'#\/doc\/6.4'}]},{'section':7,'id':'7','title':'Module','anchor':'#\/doc\/7','children':[{'section':7,'id':'7.1','title':'$O object structure','anchor':'#\/doc\/7.1'},{'section':7,'id':'7.2','title':'Compositions and naming features','anchor':'#\/doc\/7.2'}]},{'section':8,'id':'8','title':'Module manager','anchor':'#\/doc\/8','children':[{'section':8,'id':'8.1','title':'$R.module.make(id, name, options, callback)','anchor':'#\/doc\/8.1','children':[{'section':8,'id':'8.1.1','title':'Component instance structure','anchor':'#\/doc\/8.1.1'}]},{'section':8,'id':'8.2','title':'$R.module.getById(id)','anchor':'#\/doc\/8.2'},{'section':8,'id':'8.3','title':'$R.module.getInstanceById(id, name, options, callback)','anchor':'#\/doc\/8.3'},{'section':8,'id':'8.4','title':'$R.module.getByName(name)','anchor':'#\/doc\/8.4'},{'section':8,'id':'8.5','title':'$R.module.all()','anchor':'#\/doc\/8.5'},{'section':8,'id':'8.6','title':'$R.module.group()','anchor':'#\/doc\/8.6','children':[{'section':8,'id':'8.6.1','title':'$R.module.group().push(module, DOMNode)','anchor':'#\/doc\/8.6.1'},{'section':8,'id':'8.6.2','title':'$R.module.group().eject(module)','anchor':'#\/doc\/8.6.2'},{'section':8,'id':'8.6.3','title':'$R.module.group().show(options)','anchor':'#\/doc\/8.6.3'},{'section':8,'id':'8.6.4','title':'$R.module.group().hide(options)','anchor':'#\/doc\/8.6.4'},{'section':8,'id':'8.6.5','title':'$R.module.group().request(options)','anchor':'#\/doc\/8.6.5'}]}]},{'section':9,'id':'9','title':'Layout','anchor':'#\/doc\/9'},{'section':10,'id':'10','title':'Page','anchor':'#\/doc\/10','children':[{'section':10,'id':'10.1','title':'$R.page.make(name)','anchor':'#\/doc\/10.1','children':[{'section':10,'id':'10.1.1','title':'Page constructor structure','anchor':'#\/doc\/10.1.1'},{'section':10,'id':'10.1.2','title':'Page instance structure','anchor':'#\/doc\/10.1.2'}]},{'section':10,'id':'10.2','title':'$R.page.all()','anchor':'#\/doc\/10.2'},{'section':10,'id':'10.3','title':'$R.page.define(name)','anchor':'#\/doc\/10.3'},{'section':10,'id':'10.4','title':'$R.page.defined()','anchor':'#\/doc\/10.4'},{'section':10,'id':'10.5','title':'$R.page.get(name)','anchor':'#\/doc\/10.5'},{'section':10,'id':'10.6','title':'$R.page.url(name, options)','anchor':'#\/doc\/10.6'}]},{'section':11,'id':'11','title':'Routing','anchor':'#\/doc\/11','children':[{'section':11,'id':'11.1','title':'Route as a string','anchor':'#\/doc\/11.1','children':[{'section':11,'id':'11.1.1','title':'Named segments','anchor':'#\/doc\/11.1.1'},{'section':11,'id':'11.1.2','title':'Optional segments','anchor':'#\/doc\/11.1.2'},{'section':11,'id':'11.1.3','title':'Wildcards','anchor':'#\/doc\/11.1.3'}]},{'section':11,'id':'11.2','title':'Route as a regular expression','anchor':'#\/doc\/11.2'}]},{'section':12,'id':'12','title':'Server tags','anchor':'#\/doc\/12'},{'section':13,'id':'13','title':'Embedding','anchor':'#\/doc\/13'},{'section':14,'id':'14','title':'Templating and Precaching','anchor':'#\/doc\/14'},{'section':15,'id':'15','title':'System Events','anchor':'#\/doc\/15','children':[{'section':15,'id':'15.1','title':'pageShow event','anchor':'#\/doc\/15.1'},{'section':15,'id':'15.2','title':'pageHide event','anchor':'#\/doc\/15.2'},{'section':15,'id':'15.3','title':'pageCreate event','anchor':'#\/doc\/15.3'},{'section':15,'id':'15.4','title':'componentShow event','anchor':'#\/doc\/15.4'},{'section':15,'id':'15.5','title':'componentHide event','anchor':'#\/doc\/15.5'},{'section':15,'id':'15.6','title':'componentRequest event','anchor':'#\/doc\/15.6'},{'section':15,'id':'15.7','title':'componentCreate event','anchor':'#\/doc\/15.7'},{'section':15,'id':'15.8','title':'componentLoad event','anchor':'#\/doc\/15.8'},{'section':15,'id':'15.9','title':'titleChange event','anchor':'#\/doc\/15.9'},{'section':15,'id':'15.10','title':'bootComplete event','anchor':'#\/doc\/15.10'},{'section':15,'id':'15.11','title':'resolvePageShow event','anchor':'#\/doc\/15.11'},{'section':15,'id':'15.12','title':'error event','anchor':'#\/doc\/15.12'},{'section':15,'id':'15.13','title':'initConfig event','anchor':'#\/doc\/15.13'},{'section':15,'id':'15.14','title':'initCOM event','anchor':'#\/doc\/15.14'},{'section':15,'id':'15.15','title':'initCOMMap event','anchor':'#\/doc\/15.15'}]},{'section':16,'id':'16','title':'Bootstrap and loading progress','anchor':'#\/doc\/16','children':[{'section':16,'id':'16.1','title':'map.js','anchor':'#\/doc\/16.1'},{'section':16,'id':'16.2','title':'inc.js','anchor':'#\/doc\/16.2'},{'section':16,'id':'16.3','title':'$R.progressBar','anchor':'#\/doc\/16.3','children':[{'section':16,'id':'16.3.1','title':'$R.progressBar.show()','anchor':'#\/doc\/16.3.1'},{'section':16,'id':'16.3.2','title':'$R.progressBar.hide()','anchor':'#\/doc\/16.3.2'},{'section':16,'id':'16.3.3','title':'$R.progressBar.setMessage(msg)','anchor':'#\/doc\/16.3.3'},{'section':16,'id':'16.3.4','title':'$R.progressBar.setCompleteMessage(msg)','anchor':'#\/doc\/16.3.4'},{'section':16,'id':'16.3.5','title':'$R.progressBar.pushStep(id, amount)','anchor':'#\/doc\/16.3.5'},{'section':16,'id':'16.3.6','title':'$R.progressBar.doStep(id, amount)','anchor':'#\/doc\/16.3.6'},{'section':16,'id':'16.3.7','title':'$R.progressBar.setStepCallback(fn)','anchor':'#\/doc\/16.3.7'},{'section':16,'id':'16.3.8','title':'$R.progressBar.setCompleteCallback(fn)','anchor':'#\/doc\/16.3.8'},{'section':16,'id':'16.3.9','title':'$R.progressBar.destroy()','anchor':'#\/doc\/16.3.9'},{'section':16,'id':'16.3.10','title':'$R.progressBar.auto(bool)','anchor':'#\/doc\/16.3.10'},{'section':16,'id':'16.3.11','title':'$R.progressBar.isAuto()','anchor':'#\/doc\/16.3.11'},{'section':16,'id':'16.3.12','title':'$R.progressBar.node','anchor':'#\/doc\/16.3.12'},{'section':16,'id':'16.3.13','title':'Progress Bar UI customisation','anchor':'#\/doc\/16.3.13'}]},{'section':16,'id':'16.4','title':'$R.bootProgress','anchor':'#\/doc\/16.4'}]},{'section':17,'id':'17','title':'Content delivery','anchor':'#\/doc\/17','children':[{'section':17,'id':'17.1','title':'$R.xhr()','anchor':'#\/doc\/17.1','children':[{'section':17,'id':'17.1.1','title':'$R.xhr(options)','anchor':'#\/doc\/17.1.1'},{'section':17,'id':'17.1.2','title':'$R.xhr(url, options)','anchor':'#\/doc\/17.1.2'},{'section':17,'id':'17.1.3','title':'$R.xhr(url, callback)','anchor':'#\/doc\/17.1.3'}]},{'section':17,'id':'17.2','title':'$R.inject(url, callback)','anchor':'#\/doc\/17.2'},{'section':17,'id':'17.3','title':'$R.include(type, url, callback, skipErrors)','anchor':'#\/doc\/17.3'},{'section':17,'id':'17.4','title':'$R.include_once(type, url, callback, skipErrors)','anchor':'#\/doc\/17.4'}]},{'section':18,'id':'18','title':'Logging and Mobile debugging','anchor':'#\/doc\/18','children':[{'section':18,'id':'18.1','title':'$R.log(title, value)','anchor':'#\/doc\/18.1'},{'section':18,'id':'18.2','title':'$R.error(code, message, target, dump)','anchor':'#\/doc\/18.2','children':[{'section':18,'id':'18.2.1','title':'$R.error.type(code)','anchor':'#\/doc\/18.2.1'},{'section':18,'id':'18.2.2','title':'$R.error.code(string)','anchor':'#\/doc\/18.2.2'}]},{'section':18,'id':'18.3','title':'$R.errors()','anchor':'#\/doc\/18.3'}]}]),d=e.value('<ol> ~~ for (var i in this.children){ ~~ <li ~~active(this.children[i])?\'class="active"\':\'\'~~><a href="~~this.children[i].anchor~~">~~this.children[i].title~~<\/a> ~~if(this.children[i].children) {~~ ~~compile(this.children[i].children)~~ ~~}~~ <\/li> ~~}~~ <\/ol>'),o=[],t=[];this.html=String('<div class="menu header"><ol><li><a href="https:\/\/github.com\/w3core\/RockJS\/releases" target="_blank">v3.0.2<\/a><\/li><li><a href="https:\/\/github.com\/w3core\/RockJS" target="_blank">GitHub<\/a><\/li><li><a href="https:\/\/github.com\/w3core\/RockJS\/archive\/master.zip">Download<\/a><\/li><li><a class="active" href="#\/doc">Documentation<\/a><\/li><\/ol><\/div><div class="menu toc"><\/div><div class="footer"><p>Super-powered by <a href="https:\/\/github.com\/w3core" target="_blank">W3Core<\/a>&nbsp;<a href="https:\/\/github.com\/w3core\/RockJS" target="_blank">RockJS<\/a> &copy;2010-2017<\/p><p>Code licensed under the <a href="https:\/\/github.com\/w3core\/RockJS\/blob\/master\/LICENSE.txt" target="_blank">The BSD License<\/a><\/p><p>Documentation licensed under <a href="https:\/\/creativecommons.org\/licenses\/by\/4.0\/" target="_blank">CC BY 4.0<\/a><\/p><\/div>');this.css=String('#this{display:flex;flex-direction:column;font-size:.875em;min-height:100%;background-color:rgba(32,34,37,.95);box-shadow:0 0 .4em #000}#this>*{flex-grow:0;flex-shrink:0}#this .toc{flex-grow:1;flex-shrink:1}#this .menu ol{list-style:none;padding:0;margin:0}#this .menu ol a{display:block;padding:.5em 1em;white-space:nowrap;overflow:hidden}#this .menu ol a:hover{background:rgba(0,0,0,.2)}#this .menu>ol>li>a{border-top:1px solid rgba(255,255,255,.1);border-bottom:1px solid rgba(0,0,0,.4)}#this .menu>ol>li>a:hover{background:rgba(0,0,0,.1)}#this .menu>ol li:last-child>a{border-bottom:1px solid rgba(0,0,0,.4)}#this .menu>ol li:last-child>a{box-shadow:inset 0 -.5em 1em -.5em rgba(0,0,0,.4)}#this .menu>ol ol{display:none;padding:0;background:rgba(0,0,0,.1)}#this .menu>ol ol a{color:#abb2bf}#this .menu>ol ol a:hover{color:#98c379}#this .menu>ol li.active>ol{display:block;box-shadow:inset 0 .5em 1em -.5em #000}#this .menu .active>a{color:#fff}#this .footer{font-size:.89em;padding:2em 1em 1em;text-shadow:0 -1px #000;white-space:nowrap}#this .footer p{margin:0;padding:.1em 0}#this .header,#this .footer{display:none}@media (max-width:800px){#this .header{display:block;background:rgba(0,0,0,.2)}}@media (max-width:599px){#this .footer{display:block}}');this.node='toc';this.onShow=function(r){o=[];var l=r._?String(r._).split('.'):['1'];while(l.length){o.push(l.join('.'));l.pop()};if(o.length){var h=o[0].split('.'),a=i;t=[];while(h.length){var d=h.shift()*1-1;if(!a[d])break;t.push(a[d]);a=a[d].children}};var s=[];for(var d=t.length-1;d>=0;d--){s.push(t[d].title)};s.push('RockJS Documentation');e.page.get().title(s.join(' - '));n.node.toc.innerHTML=c(i)};function c(t){return e.template(d,{children:t},{compile:c,active:function(e){return o.indexOf(''+e.id)>=0}})}};