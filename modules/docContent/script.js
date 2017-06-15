function module_docContent(t,o){this.html=String();this.css=String('.markdown-preview{padding:2em;font-size:1.2em;color:#abb2bf;overflow:auto;background-color:#282c34}.markdown-preview>:first-child{margin-top:0}.markdown-preview h1,.markdown-preview h2,.markdown-preview h3,.markdown-preview h4,.markdown-preview h5,.markdown-preview h6{line-height:1.2;margin-top:1.5em;margin-bottom:.5em;color:#fff}.markdown-preview h1{font-size:2.4em;font-weight:300}.markdown-preview h2{font-size:1.8em;font-weight:400}.markdown-preview h3{font-size:1.5em;font-weight:500}.markdown-preview h4{font-size:1.2em;font-weight:600}.markdown-preview h5{font-size:1.1em;font-weight:600}.markdown-preview h6{font-size:1em;font-weight:600}.markdown-preview strong{color:#fff}.markdown-preview del{color:#7c879c}.markdown-preview a,.markdown-preview a code{color:#528bff}.markdown-preview img{max-width:100%}.markdown-preview>p{margin-top:0;margin-bottom:1.5em}.markdown-preview>ul,.markdown-preview>ol{margin-bottom:1.5em}.markdown-preview blockquote{margin:1.5em 0;font-size:inherit;color:#7c879c;border-color:#4b5362;border-width:4px}.markdown-preview hr{margin:3em 0;border-top:2px dashed #4b5362;background:none}.markdown-preview table{margin:1.5em 0}.markdown-preview th{color:#fff}.markdown-preview th,.markdown-preview td{padding:.66em 1em;border:1px solid #4b5362}.markdown-preview pre,.markdown-preview code{color:#fff;background-color:#3a3f4b}.markdown-preview pre,.markdown-preview pre.editor-colors{margin:1.5em 0;padding:1em;font-size:.92em;border-radius:3px;background-color:#31363f}.markdown-preview kbd{color:#fff;border-width:1px 1px 2px;border-style:solid;border-color:#4b5362 #4b5362 #3e4451;background-color:#3a3f4b}.scrollbars-visible-always .markdown-preview pre.editor-colors .vertical-scrollbar,.scrollbars-visible-always .markdown-preview pre.editor-colors .horizontal-scrollbar{visibility:hidden}.scrollbars-visible-always .markdown-preview pre.editor-colors:hover .vertical-scrollbar,.scrollbars-visible-always .markdown-preview pre.editor-colors:hover .horizontal-scrollbar{visibility:visible}.markdown-preview del{text-decoration:none;position:relative}.markdown-preview del:after{border-bottom:1px solid black;content:"";left:0;position:absolute;right:0;top:50%}.markdown-preview .flash{animation:flash 1s ease-out 1;outline:transparent solid 1px}.markdown-preview .flash:not(li){display:block}.markdown-themeable-pdf-page-break{border-top:2px dotted #0098ff}.markdown-themeable-pdf-page-break span{opacity:.35}.bracket-matcher .region{border-bottom:1px dotted lime;position:absolute}.spell-check-misspelling .region{border-bottom:2px dotted rgba(255,51,51,.75)}.spell-check-corrections{width:25em!important}pre.editor-colors{background-color:#282c34;color:#abb2bf}pre.editor-colors .line.cursor-line{background-color:rgba(153,187,255,.04)}pre.editor-colors .invisible{color:#abb2bf}pre.editor-colors .cursor{border-left:2px solid #528bff}pre.editor-colors .selection .region{background-color:#3e4451}pre.editor-colors .bracket-matcher .region{border-bottom:1px solid #528bff;box-sizing:border-box}pre.editor-colors .invisible-character{color:rgba(171,178,191,.15)}pre.editor-colors .indent-guide{color:rgba(171,178,191,.15)}pre.editor-colors .wrap-guide{background-color:rgba(171,178,191,.15)}pre.editor-colors .find-result .region.region.region,pre.editor-colors .current-result .region.region.region{border-radius:2px;background-color:rgba(82,139,255,.24);transition:border-color .4s}pre.editor-colors .find-result .region.region.region{border:2px solid transparent}pre.editor-colors .current-result .region.region.region{border:2px solid #528bff;transition-duration:.1s}pre.editor-colors .gutter .line-number{color:#636d83;-webkit-font-smoothing:antialiased}pre.editor-colors .gutter .line-number.cursor-line{color:#abb2bf;background-color:#2c313a}pre.editor-colors .gutter .line-number.cursor-line-no-selection{background-color:transparent}pre.editor-colors .gutter .line-number .icon-right{color:#abb2bf}pre.editor-colors .gutter:not(.git-diff-icon) .line-number.git-line-removed.git-line-removed:before{bottom:-3px}pre.editor-colors .gutter:not(.git-diff-icon) .line-number.git-line-removed:after{content:"";position:absolute;left:0;bottom:0;width:25px;border-bottom:1px dotted rgba(224,82,82,.5);pointer-events:none}pre.editor-colors .gutter .line-number.folded,pre.editor-colors .gutter .line-number:after,pre.editor-colors .fold-marker:after{color:#abb2bf}.syntax--comment{color:#5c6370;font-style:italic}.syntax--comment .syntax--markup.syntax--link{color:#5c6370}.syntax--entity.syntax--name.syntax--type{color:#e5c07b}.syntax--entity.syntax--other.syntax--inherited-class{color:#98c379}.syntax--keyword{color:#c678dd}.syntax--keyword.syntax--control{color:#c678dd}.syntax--keyword.syntax--operator{color:#abb2bf}.syntax--keyword.syntax--other.syntax--special-method{color:#61afef}.syntax--keyword.syntax--other.syntax--unit{color:#d19a66}.syntax--storage{color:#c678dd}.syntax--storage.syntax--type.syntax--annotation,.syntax--storage.syntax--type.syntax--primitive{color:#c678dd}.syntax--storage.syntax--modifier.syntax--package,.syntax--storage.syntax--modifier.syntax--import{color:#abb2bf}.syntax--constant{color:#d19a66}.syntax--constant.syntax--variable{color:#d19a66}.syntax--constant.syntax--character.syntax--escape{color:#56b6c2}.syntax--constant.syntax--numeric{color:#d19a66}.syntax--constant.syntax--other.syntax--color{color:#56b6c2}.syntax--constant.syntax--other.syntax--symbol{color:#56b6c2}.syntax--variable{color:#e06c75}.syntax--variable.syntax--interpolation{color:#be5046}.syntax--variable.syntax--parameter{color:#abb2bf}.syntax--string{color:#98c379}.syntax--string.syntax--regexp{color:#56b6c2}.syntax--string.syntax--regexp .syntax--source.syntax--ruby.syntax--embedded{color:#e5c07b}.syntax--string.syntax--other.syntax--link{color:#e06c75}.syntax--punctuation.syntax--definition.syntax--comment{color:#5c6370}.syntax--punctuation.syntax--definition.syntax--method-parameters,.syntax--punctuation.syntax--definition.syntax--function-parameters,.syntax--punctuation.syntax--definition.syntax--parameters,.syntax--punctuation.syntax--definition.syntax--separator,.syntax--punctuation.syntax--definition.syntax--seperator,.syntax--punctuation.syntax--definition.syntax--array{color:#abb2bf}.syntax--punctuation.syntax--definition.syntax--heading,.syntax--punctuation.syntax--definition.syntax--identity{color:#61afef}.syntax--punctuation.syntax--definition.syntax--bold{color:#e5c07b;font-weight:bold}.syntax--punctuation.syntax--definition.syntax--italic{color:#c678dd;font-style:italic}.syntax--punctuation.syntax--section.syntax--embedded{color:#be5046}.syntax--punctuation.syntax--section.syntax--method,.syntax--punctuation.syntax--section.syntax--class,.syntax--punctuation.syntax--section.syntax--inner-class{color:#abb2bf}.syntax--support.syntax--class{color:#e5c07b}.syntax--support.syntax--type{color:#56b6c2}.syntax--support.syntax--function{color:#56b6c2}.syntax--support.syntax--function.syntax--any-method{color:#61afef}.syntax--entity.syntax--name.syntax--function{color:#61afef}.syntax--entity.syntax--name.syntax--class,.syntax--entity.syntax--name.syntax--type.syntax--class{color:#e5c07b}.syntax--entity.syntax--name.syntax--section{color:#61afef}.syntax--entity.syntax--name.syntax--tag{color:#e06c75}.syntax--entity.syntax--other.syntax--attribute-name{color:#d19a66}.syntax--entity.syntax--other.syntax--attribute-name.syntax--id{color:#61afef}.syntax--meta.syntax--class{color:#e5c07b}.syntax--meta.syntax--class.syntax--body{color:#abb2bf}.syntax--meta.syntax--method-call,.syntax--meta.syntax--method{color:#abb2bf}.syntax--meta.syntax--definition.syntax--variable{color:#e06c75}.syntax--meta.syntax--link{color:#d19a66}.syntax--meta.syntax--require{color:#61afef}.syntax--meta.syntax--selector{color:#c678dd}.syntax--meta.syntax--separator{background-color:#373b41;color:#abb2bf}.syntax--meta.syntax--tag{color:#abb2bf}.syntax--underline{text-decoration:underline}.syntax--none{color:#abb2bf}.syntax--invalid.syntax--deprecated{color:#523d14!important;background-color:#e0c285!important}.syntax--invalid.syntax--illegal{color:#fff!important;background-color:#e05252!important}.syntax--markup.syntax--bold{color:#d19a66;font-weight:bold}.syntax--markup.syntax--changed{color:#c678dd}.syntax--markup.syntax--deleted{color:#e06c75}.syntax--markup.syntax--italic{color:#c678dd;font-style:italic}.syntax--markup.syntax--heading{color:#e06c75}.syntax--markup.syntax--heading .syntax--punctuation.syntax--definition.syntax--heading{color:#61afef}.syntax--markup.syntax--link{color:#56b6c2}.syntax--markup.syntax--inserted{color:#98c379}.syntax--markup.syntax--quote{color:#d19a66}.syntax--markup.syntax--raw{color:#98c379}.syntax--source.syntax--c .syntax--keyword.syntax--operator{color:#c678dd}.syntax--source.syntax--cpp .syntax--keyword.syntax--operator{color:#c678dd}.syntax--source.syntax--cs .syntax--keyword.syntax--operator{color:#c678dd}.syntax--source.syntax--css .syntax--property-name,.syntax--source.syntax--css .syntax--property-value{color:#828997}.syntax--source.syntax--css .syntax--property-name.syntax--support,.syntax--source.syntax--css .syntax--property-value.syntax--support{color:#abb2bf}.syntax--source.syntax--gfm .syntax--markup{-webkit-font-smoothing:auto}.syntax--source.syntax--gfm .syntax--link .syntax--entity{color:#61afef}.syntax--source.syntax--go .syntax--storage.syntax--type.syntax--string{color:#c678dd}.syntax--source.syntax--ini .syntax--keyword.syntax--other.syntax--definition.syntax--ini{color:#e06c75}.syntax--source.syntax--java .syntax--storage.syntax--modifier.syntax--import{color:#e5c07b}.syntax--source.syntax--java .syntax--storage.syntax--type{color:#e5c07b}.syntax--source.syntax--java .syntax--keyword.syntax--operator.syntax--instanceof{color:#c678dd}.syntax--source.syntax--java-properties .syntax--meta.syntax--key-pair{color:#e06c75}.syntax--source.syntax--java-properties .syntax--meta.syntax--key-pair>.syntax--punctuation{color:#abb2bf}.syntax--source.syntax--js .syntax--keyword.syntax--operator{color:#56b6c2}.syntax--source.syntax--js .syntax--keyword.syntax--operator.syntax--delete,.syntax--source.syntax--js .syntax--keyword.syntax--operator.syntax--in,.syntax--source.syntax--js .syntax--keyword.syntax--operator.syntax--of,.syntax--source.syntax--js .syntax--keyword.syntax--operator.syntax--instanceof,.syntax--source.syntax--js .syntax--keyword.syntax--operator.syntax--new,.syntax--source.syntax--js .syntax--keyword.syntax--operator.syntax--typeof,.syntax--source.syntax--js .syntax--keyword.syntax--operator.syntax--void{color:#c678dd}.syntax--source.syntax--json .syntax--meta.syntax--structure.syntax--dictionary.syntax--json>.syntax--string.syntax--quoted.syntax--json{color:#e06c75}.syntax--source.syntax--json .syntax--meta.syntax--structure.syntax--dictionary.syntax--json>.syntax--string.syntax--quoted.syntax--json>.syntax--punctuation.syntax--string{color:#e06c75}.syntax--source.syntax--json .syntax--meta.syntax--structure.syntax--dictionary.syntax--json>.syntax--value.syntax--json>.syntax--string.syntax--quoted.syntax--json,.syntax--source.syntax--json .syntax--meta.syntax--structure.syntax--array.syntax--json>.syntax--value.syntax--json>.syntax--string.syntax--quoted.syntax--json,.syntax--source.syntax--json .syntax--meta.syntax--structure.syntax--dictionary.syntax--json>.syntax--value.syntax--json>.syntax--string.syntax--quoted.syntax--json>.syntax--punctuation,.syntax--source.syntax--json .syntax--meta.syntax--structure.syntax--array.syntax--json>.syntax--value.syntax--json>.syntax--string.syntax--quoted.syntax--json>.syntax--punctuation{color:#98c379}.syntax--source.syntax--json .syntax--meta.syntax--structure.syntax--dictionary.syntax--json>.syntax--constant.syntax--language.syntax--json,.syntax--source.syntax--json .syntax--meta.syntax--structure.syntax--array.syntax--json>.syntax--constant.syntax--language.syntax--json{color:#56b6c2}.syntax--source.syntax--ruby .syntax--constant.syntax--other.syntax--symbol>.syntax--punctuation{color:inherit}.syntax--source.syntax--python .syntax--keyword.syntax--operator.syntax--logical.syntax--python{color:#c678dd}.syntax--source.syntax--python .syntax--variable.syntax--parameter{color:#d19a66}@media (min-width:800px){.markdown-preview,.markdown-preview *{user-select:auto}}content{overflow:hidden!important;padding:0!important}.markdown-preview{font-size:inherit;padding:1em;overflow:auto;height:100%}.markdown-preview code{font-size:1.1em;padding:.2em .5em .3em;border-radius:.2em;line-height:2;word-wrap:break-word;color:#98c379;background:#353941}.markdown-preview pre.editor-colors{font-size:1.1em;overflow:auto;padding:1em 1.2em;border-radius:.3em;background:#353941}.markdown-preview img{display:block;margin:0 auto;border-radius:.2em;max-width:100%}.markdown-preview blockquote{border-left:.3em solid #404651;margin:1em 0;padding:0 1em;color:#576879}.markdown-preview .table-wrapper{display:inline-block;max-width:100%;position:relative;margin-bottom:1em;overflow:auto;border:1px solid rgba(255,255,255,.1);border-radius:.2em}@media (max-height:400px){.markdown-preview .table-wrapper{max-height:300px}}.markdown-preview table tr>* *+*{margin-left:.4em}.markdown-preview table{border-collapse:collapse;margin:0}.markdown-preview table thead{background:rgba(0,0,0,.2)}.markdown-preview table th{padding:.8em 1em;font-weight:normal;color:#fff;border:0 none}.markdown-preview table td{padding:.5em 1em;vertical-align:top;border:0 none}.markdown-preview table tbody tr:nth-child(even){background:rgba(0,0,0,.1)}');var n={};this.onCreate=function(){t.tools.addClass(o.DOM,'markdown-preview');t.tools.on('scroll',o.DOM,function(o){t.emit('content.scroll',null,o.target)})};this.onShow=function(a){var e=a._?String(a._).split('.'):['1'],r=e[0];if(n[r])o.DOM.innerHTML=n[r];else{t.xhr('doc/'+r+'.html',function(t,a){if(a.status==200){n[r]=t;o.DOM.innerHTML=n[r];setTimeout(function(){var t=document.getElementById('/doc/'+e.join('.'));if(t)t.scrollIntoView()},0)}})}}};