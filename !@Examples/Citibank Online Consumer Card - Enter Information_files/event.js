var Event = function () {
	
	// cache of wrapped event functions.
	var listeners = [];
	
	return {
		/**
		 * Appends an event handler
		 *
		 * @param {Object}   el        The html element to attach the
		 *                             event to
		 * @param {String}   eventType	The type of event to attach
		 * @param {Function} fn        The method the event invokes
		 * @return {boolean} True if the action was successful,
		 *                        false if one or more of the elements
		 *                        could not have the event attached to it.
		 */
		addEvent: function(el, eventType, fn, scope) {
			if (this._isCollection(el)) {
				// we've been passed an array of elements or ids to use.
				var isOk = true;
				for (var i=0; i< el.length; ++i) {
						isOk = ( this.addEvent(el[i], eventType, fn, scope) && isOk );
				}
				return isOk;
			
			}
			else if (typeof el == "string") {
				// element we're adding to is the name, not the object.
				el = document.getElementById(el);
			}
			
			// failsafe incase we haven't transformed from a string. 
			if (!el) {
					return false;
			}
			
			var wrappedFn = function(e) {
				return fn.call(el,e,scope);
			};

			var li = [el, eventType, fn, wrappedFn, scope];
			var index = listeners.length;
			// cache the function name so we can try to unload the wrapped function by the incoming name
			listeners[index] = li;
			
			if (el.addEventListener) {
				el.addEventListener(eventType, wrappedFn, false);
			} else if (el.attachEvent) {
				el.attachEvent("on"+eventType, wrappedFn);
			}
			wrappedFn = null;
			return true;
		}, // addEvent
		removeEvent: function(el, eventType, fn) {
			if (this._isCollection(el)) {
				// we've been passed an array of elements or ids to use.
				var isOk = true;
				for (var i=0; i< el.length; ++i) {
						isOk = ( this.removeEvent(el[i], eventType, fn) && isOk );
				}
				return isOk;
			
			}
			else if (typeof el == "string") {
				// element we're adding to is the name, not the object.
				el = document.getElementById(el);
			}

			// Get wrapped function by looking up original function in the cache.
			var cacheItem = null;
			var index = this._getCacheIndex(el, eventType, fn);

			if (index >= 0) {
					cacheItem = listeners[index];
			}

			// if the event function isn't cached, we can't remove it.
			if (!el || !cacheItem) {
					return false;
			}
			
			var cachedFunction = cacheItem[3];
			
			if (el.removeEventListener) {
					el.removeEventListener(eventType, cachedFunction, false);
			} else if (el.detachEvent) {
					el.detachEvent("on" + eventType, cachedFunction);
			}
			
			// removed the wrapped handler
			delete listeners[index][3];
			delete listeners[index][2];
			delete listeners[index];
			
			return true;
		}, // removeEvent
		stopEvent: function(ev) {
				this.stopPropagation(ev);
				this.preventDefault(ev);
		},
		
		/**
		* Stop an event from firing
		*/
		stopPropagation: function(ev) {
				if (ev.stopPropagation) {
						ev.stopPropagation();
				} else {
						ev.cancelBubble = true;
				}
		},
		preventDefault: function(ev) {
				if (ev.preventDefault) {
						ev.preventDefault();
				} else {
						ev.returnValue = false;
				}
		},		
		getPageX: function(el) {
			return this.getPageXY(el).pageX;
		},
		
		getPageY: function(el) {
			return this.getPageXY(el).pageY;
		},
		
		getPageXY: function(elem) {
			var offsetTrail = elem;
			var offsetLeft = 0;
			var offsetTop = 0;
			while (offsetTrail) {
					offsetLeft += offsetTrail.offsetLeft;
					offsetTop += offsetTrail.offsetTop;
					offsetTrail = offsetTrail.offsetParent;
			}
			if (navigator.userAgent.indexOf("Mac") != -1 && 
					typeof document.body.leftMargin != "undefined") {
					offsetLeft += document.body.leftMargin;
					offsetTop += document.body.topMargin;
			}
			return {pageX:offsetLeft, pageY:offsetTop};
		},
		removeAllEvents: function(el,obj) {
			
			if (listeners && listeners.length > 0) {
				for (var i = 0; i < listeners.length; ++i) {
					var l = listeners[i];
					if (l) {
						obj.removeEvent(l[0], l[1],l[2]);
					}
				}
				listeners = null;
			}
		},
		getListeners: function() {
			return listeners;
		},
		/**
		 * @private
		 * Locating the saved event handler data by function ref
		 */
		_getCacheIndex: function(el, sType, fn) {
				for (var i=0; i< listeners.length; ++i) {
						var li = listeners[i];
						if ( li           &&
								 li[2] == fn  &&
								 li[0] == el  &&
								 li[1] == sType ) {
								return i;
						}
				}

				return -1;
		},		
		/**
		* Tests for collections/arrays.
		*
		* @param {Object}	obj	The object to test.
		* @return {boolean}	True if valid collection.
		* @private
		*/
		_isCollection: function(obj) {
			return ( obj										&& // o is something
							 obj.length							&& // o is indexed
							 typeof obj != "string"	&& // o is not a string
							 !obj.tagName						&& // o is not an HTML element
							 !obj.alert							&& // o is not a window
							 typeof obj[0] != "undefined");
		} // _isCollection */
	};
} ();

//Event.addEvent(window,"unload",Event.removeAllEvents,Event);
