function module_docFooter(e,t){this.html=String('<p>Super-powered by <a href="https:\/\/github.com\/w3core" target="_blank">W3Core<\/a>&nbsp;<a href="https:\/\/github.com\/w3core\/RockJS" target="_blank">RockJS<\/a> &copy;2010-2017<\/p><p>Code licensed under the <a href="https:\/\/github.com\/w3core\/RockJS\/blob\/master\/LICENSE.txt" target="_blank">The BSD License<\/a><\/p><p>Documentation licensed under <a href="https:\/\/creativecommons.org\/licenses\/by\/4.0\/" target="_blank">CC BY 4.0<\/a><\/p><a class="back" href="#">Back to top<\/a>');this.css=String('@media (max-width:599px){#this p{display:none}#this .back{position:absolute;display:block;right:1em;bottom:1em;width:3em;height:3em;line-height:3em;overflow:hidden;border-radius:50%;text-align:center;color:transparent;background:rgba(40, 44, 52, .95);box-shadow:0 0 .5em #000;transition:transform .3s;transform:scale(1);will-change:transform}#this .back.invisible{transform:scale(0)}#this .back:before{content:"\u25b4";display:block;font-size:2em;color:#fff;text-shadow:-2px 1px 0 #000}#this .back:hover{box-shadow:0 0 .2em #000} #this .back:hover:before{color:#98c379}#this .back:active{box-shadow:inset 0 0 1em #000, 0 0 1em rgba(255, 255, 255, .2)}#this .back:active:before{color:#31a0e7}} @media (min-width:600px){#this{position:relative;padding:.4em 8em .4em 1.1em;font-size:.8125em;background:rgba(0,0,0,.2)}#this *{vertical-align:baseline}#this p{display:inline-block;white-space:nowrap;margin:.3em .3em .3em 0;padding:0}#this p:first-child{display:block}#this .back{position:absolute;line-height:0;right:1em;top:50%}}');this.node='back';this.onCreate=function(){if(t.node.back){e.tools.on('click',t.node.back,function(t){e.tools.each(document.querySelectorAll('main, content, .markdown-preview'),function(e){e.scrollTop=0});e.vibrate();t.preventDefault()});e.on('content.scroll',function(o){e.tools[(o.target.scrollTop<50?'add':'remove')+'Class'](t.node.back,'invisible')})}}};