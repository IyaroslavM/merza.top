include('js/switcher.js')
include('js/uCarousel.js')
include('js/forms.js')
include('js/jquery.fancybox-1.3.4.pack.js')
include('js/uScroll.js')
include('js/sImg.js')


$(window).load(function(){
	var nav=$('nav')
		,nav_img=$('>img',nav)
		,content=$('#content')
		,splsh_gallery=$('#splash-gallery')
		
	$('.carousel')
		.uCarousel({
			axis:'x'
			,show:4
			,duration:600
			,pageStep:4
			,easing:'easeInOutQuad'
			,buttonClass:'gallery-btn'
		})
	
	$('.carousel a').fancybox()
	
	if($.browser.msie)
		$('>ul>li',nav)
			.click(function(){
				var a=$('a',this)
				if(a.length)
					location.hash=a.attr('href')				
			})
	
	splsh_gallery
		.sImg()
		.navs(function(n,_){			
			splsh_gallery.sImg(_.href)
		})
		.navs()
	
	$('.splash-btns a')
		.click(function(){			
			splsh_gallery.navs($(this).is('.next')?'next':'prev')
			return false
		})
		.on('mouseenter',function(){
			$(this)
				.stop()
				.animate({
					opacity:1
				})
		})
		.on('mouseleave',function(){
			$(this)
				.stop()
				.animate({
					opacity:.6
				})
		})
		.trigger('mouseleave')
	
	$('.scroll')
		.uScroll({
			axis:'y'
			,step:80
			,mousewheel:true
			,duration:600
			,easing:'easeInOutSine'
		})
	var tmr
		,btns=$('.splash-btns')
	$(window).resize(function(){
		clearTimeout(tmr)
		tmr=setTimeout(function(){
			btns[document.body.offsetWidth<1170?'addClass':'removeClass']('compact')			
		},10)
	}).trigger('resize')
		
	$('nav li>ul').each(function(){
		var ul=$(this).css({opacity:0}).hide()
			,li=ul.parent()
			,a=$('>a',li)
			,tmr
		li.children()
			.on('mouseenter',function(){
				clearTimeout(tmr)
				li.addClass('_hover')
				ul
					.show()
					.stop()
					.animate({
						opacity:1
					})
			})
			.on('mouseleave',function(){
				tmr=setTimeout(function(){
					li.removeClass('_hover')
					ul
						.stop()
						.animate({
							opacity:0
						},{
							complete:function(){
								ul.hide()
							}
						})
				},400)
			})
	})
	
	
	content
		.tabs({
			empty:'#!/splash'
			,actFu:function(_){
				content
					.stop()
					.animate({
						bottom:-453
					},{
						duration:500
						,easing:'easeInOutExpo'
						,complete:function(){
							_.prev&&_.prev.hide()
							if(_.curr)
								_.curr.show()
								,content
									.stop()
									.animate({
										bottom:0
									},{
										duration:500
										,easing:'easeInOutExpo'
									})
						}
					})
			}
		})
		
	
	nav
		.navs({
			useHash:true
			,defHash:'#!/splash'
		})
		.navs(function(n){			
			if(n==='#!/splash'||n==='close')
				content.tabs(n)
				,s_splsh()
			else
				s_subs()
				,content.tabs(n)
			if(n==='#!/contacts')
				googleMap()
		})
	
	function s_splsh(){
		if(!s_subs.ready)
			return false
		s_subs.ready=false
		
		$.when(content)
			.then(function(){
				$('h1')
					.stop()
					.animate({
						top:322
					},{
						duration:600
						,easing:'easeInOutSine'
					})
					
				nav
					.stop()
					.animate({
						top:319
					},{
						duration:600
						,easing:'easeInOutSine'
					})
			})
			
			$('.splash-btns a.prev,.splash-btns a.next')
				.fadeIn()
	}
	
	function s_subs(){
		if(s_subs.ready)
			return false
		s_subs.ready=true
		
		$('h1')
			.stop()
			.animate({
				top:93
			},{
				duration:600
				,easing:'easeInOutSine'
			})
			
		nav
			.stop()
			.animate({
				top:89
			},{
				duration:600
				,easing:'easeInOutSine'
			})
		
		$('.splash-btns a.prev,.splash-btns a.next')
			.fadeOut()
	}
	
	// $(window).on('hashchange',function(){
		// moveTo($('>ul>li.active',nav))
	// })
		
	// moveTo($('>ul>li.active',nav))
	
	function googleMap(){
		if(googleMap.ready)
			return false
		googleMap.ready=true
		var cssPath='.google_map'
			,holder=$(cssPath)
			,src='http://maps.google.com/maps?f=q&amp;source=s_q&amp;hl=en&amp;geocode=&amp;q=Brooklyn,+New+York,+NY,+United+States&amp;aq=0&amp;sll=37.0625,-95.677068&amp;sspn=61.282355,146.513672&amp;ie=UTF8&amp;hq=&amp;hnear=Brooklyn,+Kings,+New+York&amp;ll=40.649974,-73.950005&amp;spn=0.01628,0.025663&amp;z=14&amp;iwloc=A&amp;output=embed'
			,str='<iframe class="blo" width="'+holder.width()+'" height="'+holder.height()+'" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="'+src+'"></iframe>'
		holder.html(str)
	}
	
	$('#gspinner').fadeOut(function(){
		$('body').css({overflow:'auto'})
	})
})

;(function($){var c=['DOMMouseScroll','mousewheel'];$.event.special.mousewheel={setup:function(){if(this.addEventListener)for(var i=c.length;i;)this.addEventListener(c[--i],handler,false);else this.onmousewheel=handler},teardown:function(){if(this.removeEventListener)for(var i=c.length;i;)this.removeEventListener(c[--i],handler,false);else this.onmousewheel=null}};$.fn.extend({mousewheel:function(a){return a?this.bind("mousewheel",a):this.trigger("mousewheel")},unmousewheel:function(a){return this.unbind("mousewheel",a)}});function handler(a){var b=[].slice.call(arguments,1),delta=0,returnValue=true;a=$.event.fix(a||window.event);a.type="mousewheel";if(a.originalEvent.wheelDelta)delta=a.originalEvent.wheelDelta/120;if(a.originalEvent.detail)delta=-a.originalEvent.detail/3;b.unshift(a,delta);return $.event.handle.apply(this,b)}})(jQuery);

eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('h.i[\'V\']=h.i[\'y\'];h.M(h.i,{B:\'C\',y:9(x,t,b,c,d){6 h.i[h.i.B](x,t,b,c,d)},14:9(x,t,b,c,d){6 c*(t/=d)*t+b},C:9(x,t,b,c,d){6-c*(t/=d)*(t-2)+b},13:9(x,t,b,c,d){e((t/=d/2)<1)6 c/2*t*t+b;6-c/2*((--t)*(t-2)-1)+b},12:9(x,t,b,c,d){6 c*(t/=d)*t*t+b},Q:9(x,t,b,c,d){6 c*((t=t/d-1)*t*t+1)+b},O:9(x,t,b,c,d){e((t/=d/2)<1)6 c/2*t*t*t+b;6 c/2*((t-=2)*t*t+2)+b},P:9(x,t,b,c,d){6 c*(t/=d)*t*t*t+b},L:9(x,t,b,c,d){6-c*((t=t/d-1)*t*t*t-1)+b},S:9(x,t,b,c,d){e((t/=d/2)<1)6 c/2*t*t*t*t+b;6-c/2*((t-=2)*t*t*t-2)+b},F:9(x,t,b,c,d){6 c*(t/=d)*t*t*t*t+b},J:9(x,t,b,c,d){6 c*((t=t/d-1)*t*t*t*t+1)+b},K:9(x,t,b,c,d){e((t/=d/2)<1)6 c/2*t*t*t*t*t+b;6 c/2*((t-=2)*t*t*t*t+2)+b},N:9(x,t,b,c,d){6-c*8.A(t/d*(8.g/2))+c+b},R:9(x,t,b,c,d){6 c*8.n(t/d*(8.g/2))+b},X:9(x,t,b,c,d){6-c/2*(8.A(8.g*t/d)-1)+b},11:9(x,t,b,c,d){6(t==0)?b:c*8.j(2,10*(t/d-1))+b},15:9(x,t,b,c,d){6(t==d)?b+c:c*(-8.j(2,-10*t/d)+1)+b},16:9(x,t,b,c,d){e(t==0)6 b;e(t==d)6 b+c;e((t/=d/2)<1)6 c/2*8.j(2,10*(t-1))+b;6 c/2*(-8.j(2,-10*--t)+2)+b},E:9(x,t,b,c,d){6-c*(8.q(1-(t/=d)*t)-1)+b},G:9(x,t,b,c,d){6 c*8.q(1-(t=t/d-1)*t)+b},H:9(x,t,b,c,d){e((t/=d/2)<1)6-c/2*(8.q(1-t*t)-1)+b;6 c/2*(8.q(1-(t-=2)*t)+1)+b},I:9(x,t,b,c,d){f s=1.l;f p=0;f a=c;e(t==0)6 b;e((t/=d)==1)6 b+c;e(!p)p=d*.3;e(a<8.u(c)){a=c;f s=p/4}m f s=p/(2*8.g)*8.v(c/a);6-(a*8.j(2,10*(t-=1))*8.n((t*d-s)*(2*8.g)/p))+b},T:9(x,t,b,c,d){f s=1.l;f p=0;f a=c;e(t==0)6 b;e((t/=d)==1)6 b+c;e(!p)p=d*.3;e(a<8.u(c)){a=c;f s=p/4}m f s=p/(2*8.g)*8.v(c/a);6 a*8.j(2,-10*t)*8.n((t*d-s)*(2*8.g)/p)+c+b},U:9(x,t,b,c,d){f s=1.l;f p=0;f a=c;e(t==0)6 b;e((t/=d/2)==2)6 b+c;e(!p)p=d*(.3*1.5);e(a<8.u(c)){a=c;f s=p/4}m f s=p/(2*8.g)*8.v(c/a);e(t<1)6-.5*(a*8.j(2,10*(t-=1))*8.n((t*d-s)*(2*8.g)/p))+b;6 a*8.j(2,-10*(t-=1))*8.n((t*d-s)*(2*8.g)/p)*.5+c+b},W:9(x,t,b,c,d,s){e(s==w)s=1.l;6 c*(t/=d)*t*((s+1)*t-s)+b},Y:9(x,t,b,c,d,s){e(s==w)s=1.l;6 c*((t=t/d-1)*t*((s+1)*t+s)+1)+b},Z:9(x,t,b,c,d,s){e(s==w)s=1.l;e((t/=d/2)<1)6 c/2*(t*t*(((s*=(1.D))+1)*t-s))+b;6 c/2*((t-=2)*t*(((s*=(1.D))+1)*t+s)+2)+b},z:9(x,t,b,c,d){6 c-h.i.r(x,d-t,0,c,d)+b},r:9(x,t,b,c,d){e((t/=d)<(1/2.k)){6 c*(7.o*t*t)+b}m e(t<(2/2.k)){6 c*(7.o*(t-=(1.5/2.k))*t+.k)+b}m e(t<(2.5/2.k)){6 c*(7.o*(t-=(2.17/2.k))*t+.18)+b}m{6 c*(7.o*(t-=(2.19/2.k))*t+.1a)+b}},1b:9(x,t,b,c,d){e(t<d/2)6 h.i.z(x,t*2,0,c,d)*.5+b;6 h.i.r(x,t*2-d,0,c,d)*.5+c*.5+b}});',62,74,'||||||return||Math|function|||||if|var|PI|jQuery|easing|pow|75|70158|else|sin|5625||sqrt|easeOutBounce|||abs|asin|undefined||swing|easeInBounce|cos|def|easeOutQuad|525|easeInCirc|easeInQuint|easeOutCirc|easeInOutCirc|easeInElastic|easeOutQuint|easeInOutQuint|easeOutQuart|extend|easeInSine|easeInOutCubic|easeInQuart|easeOutCubic|easeOutSine|easeInOutQuart|easeOutElastic|easeInOutElastic|jswing|easeInBack|easeInOutSine|easeOutBack|easeInOutBack||easeInExpo|easeInCubic|easeInOutQuad|easeInQuad|easeOutExpo|easeInOutExpo|25|9375|625|984375|easeInOutBounce'.split('|'),0,{}))

;(function(d){d.each(['backgroundColor','borderBottomColor','borderLeftColor','borderRightColor','borderTopColor','color','outlineColor'],function(i,b){d.fx.step[b]=function(a){if(a.state==0){a.start=getColor(a.elem,b);a.end=getRGB(a.end)}a.elem.style[b]="rgb("+[Math.max(Math.min(parseInt((a.pos*(a.end[0]-a.start[0]))+a.start[0]),255),0),Math.max(Math.min(parseInt((a.pos*(a.end[1]-a.start[1]))+a.start[1]),255),0),Math.max(Math.min(parseInt((a.pos*(a.end[2]-a.start[2]))+a.start[2]),255),0)].join(",")+")"}});function getRGB(a){var b;if(a&&a.constructor==Array&&a.length==3)return a;if(b=/rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(a))return[parseInt(b[1]),parseInt(b[2]),parseInt(b[3])];if(b=/rgb\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*\)/.exec(a))return[parseFloat(b[1])*2.55,parseFloat(b[2])*2.55,parseFloat(b[3])*2.55];if(b=/#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(a))return[parseInt(b[1],16),parseInt(b[2],16),parseInt(b[3],16)];if(b=/#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/.exec(a))return[parseInt(b[1]+b[1],16),parseInt(b[2]+b[2],16),parseInt(b[3]+b[3],16)];if(b=/rgba\(0, 0, 0, 0\)/.exec(a))return e['transparent'];return e[d.trim(a).toLowerCase()]}function getColor(a,b){var c;do{c=d.curCSS(a,b);if(c!=''&&c!='transparent'||d.nodeName(a,"body"))break;b="backgroundColor"}while(a=a.parentNode);return getRGB(c)};var e={aqua:[0,255,255],azure:[240,255,255],beige:[245,245,220],black:[0,0,0],blue:[0,0,255],brown:[165,42,42],cyan:[0,255,255],darkblue:[0,0,139],darkcyan:[0,139,139],darkgrey:[169,169,169],darkgreen:[0,100,0],darkkhaki:[189,183,107],darkmagenta:[139,0,139],darkolivegreen:[85,107,47],darkorange:[255,140,0],darkorchid:[153,50,204],darkred:[139,0,0],darksalmon:[233,150,122],darkviolet:[148,0,211],fuchsia:[255,0,255],gold:[255,215,0],green:[0,128,0],indigo:[75,0,130],khaki:[240,230,140],lightblue:[173,216,230],lightcyan:[224,255,255],lightgreen:[144,238,144],lightgrey:[211,211,211],lightpink:[255,182,193],lightyellow:[255,255,224],lime:[0,255,0],magenta:[255,0,255],maroon:[128,0,0],navy:[0,0,128],olive:[128,128,0],orange:[255,165,0],pink:[255,192,203],purple:[128,0,128],violet:[128,0,128],red:[255,0,0],silver:[192,192,192],white:[255,255,255],yellow:[255,255,0],transparent:[255,255,255]}})(jQuery);

function include(url){document.write('<script type="text/javascript" src="'+url+'"></script>')}