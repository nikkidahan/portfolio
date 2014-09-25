/**
 * Scroll-To-Top (version 0.9) Plugin for jQuery (1.4+)
 * Copyright (c) 2012 iifksp@swordair.com
 * http://www.swordair.com/blog
 * MIT license
 * Demo: http://www.swordair.com/demos/jquery-plugin-scroll-to-top/
 */
(function($){
	$.fn.scrollToTop = function(method){
		var defaults = {
			duration : 300,						// scroll duration
			is_fixed : true,					// if false, all params below will be ignored
				top_blank : 100,				// max height from top
				is_scrollstop : true,			// use scroll stop event or not
					scrollstop_latency : 300,	// latency for scroll stop event
				btm_position : 100				// for absolute position, valid for IE6-
		}
		var settings = {}
		
		/* publick methods */
		var methods = {
			init : function(options){
				settings = $.extend({}, defaults, options);
				
				/* special event 'scrollstop' */
				if(settings.is_fixed && settings.is_scrollstop){
					var uid = 'uid' + (+new Date());
					$.event.special.scrollstop = {
						setup: function() {
							var timer;
							var handler = function(evt) {
								var _self = this;
								var _args = arguments;
								if (timer) {
									clearTimeout(timer);
								}				
								timer = setTimeout( function(){
										timer = null;
										evt.type = 'scrollstop';
										$.event.handle.apply(_self, _args);
								}, settings.scrollstop_latency);
							};
							$(this).bind('scroll', handler).data(uid, handler);
						},
						teardown: function() {
							$(this).unbind('scroll', $(this).data(uid) );
						}
					};
				}
				
				return this.each(function(){
					var	$element = $(this),
						element = this;
					if(settings.is_fixed){
						var scrollEvent = settings.is_scrollstop ? 'scrollstop' : 'scroll';
						$(window).bind(scrollEvent,{elm : $element}, helpers.scrollToTop);
						$(window).trigger(scrollEvent, [$element]);
					}
					$element.click(function(){
						$('body,html').animate({scrollTop:0},settings.duration);
						return false;
					});
				});
			}
		}
		
		/* private methods */
		var helpers = {
			scrollToTop : function(event, param1){
				var $elm = param1 ? param1 : event.data.elm;
				var winTop = $(window).scrollTop();
				if(winTop > settings.top_blank){
					if($elm.css('position') != 'fixed'){
						winHeight = $(window).height();
						var absTop = winTop + winHeight - settings.btm_position + $elm.height();
						$elm.css('top',absTop);
					}
					$elm.fadeIn();
				}else{
					$elm.hide();
				}
			}
		}
		
		if(methods[method]){
			return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
		} else if(typeof method === 'object' || !method){
			return methods.init.apply(this, arguments);
		} else{
			$.error( '[scrollToTop] : Method "' +  method + '" does not exist');
		}
	}
})(jQuery);