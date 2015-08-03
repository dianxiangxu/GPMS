var Overlay = (function(){
	
	var overlayWindow, overlayBackdrop, element, elementParent;
	var is_open = false;
	var subscriptions = [];

	function init() {
		overlayWindow = $("#overlay .window");
		overlayBackdrop = $("#overlay .backdrop");
		overlayCloseButton = $("#overlay .closeButton");
	}

	function show(el) {
		if (typeof(el)==undefined) return close();
		if (isOpen()) {
			swap(el);
		} else {
			open(el);
		}
	}

	function open(el) {
		is_open = true;
		element = $(el);
		elementParent = element.parent();
		overlayWindow.append(element);
		$("body").addClass("overlayactive");
		TweenLite.fromTo("#overlay", 0.3, {autoAlpha:0}, {autoAlpha:1});
		overlayBackdrop.on("click", close);
		overlayCloseButton.on("click", close);
		
		$('.validation').html('');
		$('.validation').hide();
	}

	function swap(el) {
		var finish = function(){
			TweenLite.set(element, {autoAlpha:1});
			elementParent.append(element);
			element = $(el);
			elementParent = element.parent();
			overlayWindow.append(element);
			TweenLite.fromTo(element, 0.3, {autoAlpha:0}, {autoAlpha:1});
		};
		TweenLite.to(element, 0.3, {autoAlpha:0, onComplete:finish});
	}

	function close() {
		var finish = function(){
			$("body").removeClass("overlayactive");
			elementParent.append(element);
			is_open = false;
			broadcast("close");
		};
		overlayBackdrop.off("click", close);
		overlayCloseButton.off("click", close);
		TweenLite.to("#overlay", 0.3, {autoAlpha:0, onComplete:finish});
	}

	function isOpen() {
		return is_open;
	}

	function on(name, callback) {
		subscriptions.push({"name":name, "callback":callback});
		return [name, callback];
	}

	function off(args) {
		for(x=0;x<subscriptions.length;x++){
   			if(subscriptions[x].name == args[0], subscriptions[x].callback == args[1]) subscriptions.splice(x, 1);
    	}
    }

	function broadcast(name, args){
		var temp = [];
		if(subscriptions.length > 0){
			for(var x=0;x<subscriptions.length;x++) {
				if(subscriptions[x].name == name) temp.push({"fn":subscriptions[x].callback});
			}
			for(x=0;x<temp.length;x++){
				temp[x].fn.apply(this,[args]);
			}
		}
	}

	return {
		init	: init,
		show	: show,
		isOpen 	: isOpen,
		close	: close,
		on 		: on,
		off 	: off
	}

})(jQuery);

$(window).ready(function(){
	Overlay.init();
});