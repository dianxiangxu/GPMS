/* 20140814RF */
// NOTE: version 1.4 (citiTextBlur-jquery1.4.js) requires jquery.caret plugin

var maskFlag = true;

var blurring = (function(window, $, parent, undefined) {

    var masks = (function(undefined) {
        /**********************************************************************
        ** Class: mask
        ** Description: The mask class is used to put a mask character over
        **              specific parts of a String
        ** Parameters:
        **     * exp - the reqular expression that will be used to parse the
        **             input String
        **     * maskClass - a character class determining which characters will
        **                   be replaced by the mask character
        **     * pos - an array of 1-based indicies into the paranthesized
        **             groups of the regular expression (exp). Any groups who's
        **             indicies are included in this array will have the mask
        **             replace characters that are in the maskClass. In other
        **             words, including a group's index in this array will cause
        **             it to be masked
        */
        var mask = function(exp,maskClass,pos) {
            this.expression = exp;
            this.replacePositions = pos;
            
            if (typeof maskClass !== 'undefined') {
                this.maskClass = maskClass;
            }
        };
        mask.prototype.maskCharacter = '*';
        mask.prototype.maskClass = /./g;
        
        mask.prototype.replaceAll = function(str, c) {
            if (typeof str === 'string') {
                var reg = this.maskClass;
                var cha = (typeof c !== 'undefined')? c: this.maskCharacter;
                var test = this.replacePositions;
                return str.replace(this.expression, function() {
                    var ps = Array.prototype.slice.call(arguments, 1, -2);
                    var result = [];
                    for (var i = 0, j = 0, len = ps.length; i < len; ++i) {
                        if (typeof test === 'undefined' || i == (test[j]-1)) {
                            result.push(ps[i].replace(reg, cha));
                            j++;
                        } else {
                            result.push(ps[i]);
                        }
                    }
                    return result.join('');
                });
            }
        };
        
        
        mask.prototype.applyMask = function(str, c) {
            if (typeof str !== 'undefined') {
                return this.replaceAll(str, c);
            }
        };
        
        
        var maskTypes = {
            "full": new mask(/^(.*)$/, /./g),
            "phone": new mask(/^([(]*\d{3}[). -]*\d{3}[\-. ]*)(\d{4})$/,
                /\d/g, [1]),
            "email": new mask(/^([a-zA-Z0-9._%+-]{1})([a-zA-Z0-9._%+-]{0,2}|[a-zA-Z0-9._%+-]*?)([a-zA-Z0-9._%+-]{0,1})(@\w+\.\w+)$/,
                              /[a-zA-Z0-9._%+-]/g, [2]),
            "cardaccount": new mask(/^(\d{4}[ .-]*\d{4}[ .-]*\d{4}[ .-]*)(\d{4})$/,
                /\d/g, [1]),
            "genericaccount": new mask(/^([a-zA-Z0-9 ._-]*)([a-zA-Z0-9 ._-]{4})$/,
                /[a-zA-Z0-9._\- ]/g, [1]),
            "social": new mask(/^(\d{3}[ .-]*\d{2}[ .-]*)(\d{4})$/,
                /\d/g, [1]),
            "userid": (function() {
                var user = new mask(/^([a-zA-Z0-9._@%+-]{1})([a-zA-Z0-9._@%+-]*?)([a-zA-Z0-9._@%+-]{1})$/,
                    /[a-zA-Z0-9._@%+-]/g, [2]);
                // Custom applyMask for the user id. Call the default for <= 6 length
                user.applyMask = function(str, c) {
                    if (str.length <= 6) {
                        return mask.prototype.applyMask.apply(this, [str, c]);
                    }
                    else {
                        var savedRX = this.expression;
                        this.expression = /^([a-zA-Z0-9._@%+-]{2})([a-zA-Z0-9._@%+-]*?)([a-zA-Z0-9._@%+-]{2})$/;
                        var result = mask.prototype.applyMask.apply(this, [str, c]);
                        this.expression = savedRX;
                        return result;
                    }
                };
                return user;
            }()),
            // [CM] password_pg masking type
             "genericaccount_pg": new mask(/^([a-zA-Z0-9 ._-]*)([a-zA-Z0-9 ._-]{4})$/,
                                            /[a-zA-Z0-9._\- ]/g, [1]),
            "password_pg": new mask(/^(.*)$/, /./g)
        };
        
        return maskTypes;
    }());
    
    parent.hasMask = function(type) {
        return (type in masks);
    };
    
    parent.maskField = function(type, val, c) {
        if (masks[type]) {
            var res = masks[type].applyMask(val, c);
            if (res !== null && res !== "") {
                return res;
            }
        }
    };

    return parent;
}(window, window.jQuery, window.blurring || {} ));



/**************************************************************************
*** Plugin name: citiTextBlur
***
*** Use: Call the plugin on a form element. It will initialize the children
***      elements for masking if they have one of the indicated classes. The
***      class on the element determines the masking "type"
***
*** Classes:
***    cB-full - full masking
***    cB-phone - phone number masking
***    cB-email - email address masking
***    cB-card - 16 digit card number masking
***    cB-account - other account number masking
***    cB-SSN - social security masking
***    cB-userID - user id masking
*** 
***    [CM]
***    cB-password_pg - full masking, including when editing
***    cB-account_pg - full masking when editing, account masking after  
***
***
***************************************************************************/
(function($, flag, undefined) {
    $.fn.selectRange = function(start, end) {
        return this.each(function() {
            if (this.setSelectionRange) {                
                this.setSelectionRange(start, end);
            } else if (this.createTextRange) {                
                var range = this.createTextRange();
                range.collapse(true);
                range.moveEnd('character', end);
                range.moveStart('character', start);
                range.select();
            }
        });
    };

    var defaults = {
        'type': 'full',
        'clear': false,
        'encodeHidden': false,
        'whileTyping': false,
        'whileTypingDelay': 1,
        'character': '*'
    };
    
    var selectors = {
        'full': '.cB-full',
        'phone': '.cB-phone',
        'email': '.cB-email',
        'cardaccount': '.cB-card',
        'genericaccount': '.cB-account',
        'social': '.cB-SSN',
        'userid': '.cB-userID',
        // [CM]
        'password_pg': '.cB-password_pg',
        'genericaccount_pg': '.cB-account_pg'
    };
    var selArr = [];
    for (var prop in selectors) {
        selArr.push(selectors[prop]);
    }
    var selector = selArr.join(',');
    
    var supportedTags = [
        {"name": "input"},
        {"name": "select"}
    ];
    for (var i = 0, len = supportedTags.length; i < len; ++i) {
        var tempArr = [];
        for (var prop in selectors) {
            tempArr.push(supportedTags[i].name+selectors[prop]);
        }
        supportedTags[i].selector = tempArr.join(',');
    }
 
    var eventHandlers = {
        "selectChange": function(evt, el) {
            var data = getPluginData(el);
            var storedValue = data.dataElement.val();
            var selected = el.children(':selected');
            
            if (data.masked === true) {
                var previous;
                el.children('option').each(function() {
                    var self = $(this);
                    if (self.val() === storedValue) {
                        previous = self;
                    }
                });
                if (typeof previous !== 'undefined') {
                    previous.attr('selected', 'selected');
                }
                clearMaskFromField(el);
                selected.attr('selected', 'selected');
            }
            data.dataElement.val(selected.val());
            data.dataElement.data('origText', selected.text());
        },
        "inputFocus": function(evt, el) {                       
            // [CM]
            if (checkForClassName(el, 'cB-account_pg') || checkForClassName(el, 'cB-password_pg')) {                
                reapplyFullMaskToField(el);
                // Following function call left in, in case requirements are changed yet again. 
                // clearValueFromField(el);                
                evt.stopPropagation();
            }
            else {
                clearMaskFromField(el, $.fn.citiTextBlur.tabbing);
                $.fn.citiTextBlur.tabbing = false;
                evt.stopPropagation();
            }            
        },
        "selectFocus": function(evt, el) {
            var data = getPluginData(el);
            var storedValue = data.dataElement.val();
            var selected = el.children(':selected');
            
            if (selected.val() != storedValue) {
                var previous;
                el.children('option').each(function() {
                    var self = $(this);
                    if (self.val() === storedValue) {
                        previous = self;
                    }
                });
                if (typeof previous !== 'undefined') {
                    previous.attr('selected', 'selected');
                }
                clearMaskFromField(el);
                selected.attr('selected', 'selected');
            } else {
                clearMaskFromField(el);
            }
            $.fn.citiTextBlur.tabbing = false;
            evt.stopPropagation();
        },
        "selectBlur": function(evt, el) {
            if (!selectIgnoreRegex.test(el.children(':selected').text())) {
                applyMaskToField(el);
                evt.stopPropagation();
            }
        },
        "inputBlur": function(evt, el) {            
            if (!selectIgnoreRegex.test(el.val())) {
                applyMaskToField(el);
                evt.stopPropagation();
            }
        },
        "inputChange": function(evt, el) {
            var data = getPluginData(el),
                value = el.val(),
                storedValue = data.dataElement.val();
            if (data.masked === false) {
                if (value !== storedValue) {
                    data.setValue(el, value);
                }
            }
        },
        "inputKeyup": function(evt, el) {
            // [CM]
            if (checkForClassName(el, 'cB-account_pg') || checkForClassName(el, 'cB-password_pg')) {
                storeCursorPosition(el);
                evt.stopPropagation();
            }
            else {
                el.trigger('change');
            }
        },
        "keyDown": function(evt) {            
            if (evt.which === 9) {
                $.fn.citiTextBlur.tabbing = true;
            }            
        },
        "ready": function(el, evt) {
            var data = getPluginData(el),
                value = el.val(),
                storedValue = data.dataElement.val();
            
            if (value === '' && storedValue !== '') {
                data.setVisual(el, storedValue);
            }
            
            if (!data.masked) {
                applyMaskToField(el);
            }
        },
        // [CM]
        "inputKeyPress": function(evt, el) {                        
            if (isCharacterKeyPress(evt)) {                
                var maxLength = (typeof el.attr('maxLength') === "undefined" ? Number.MAX_VALUE : el.attr('maxLength'));
                var selectionLength = cursorPositionMap.end - cursorPositionMap.start;
                var curValueLength = el.val().length;
                
                if (curValueLength - selectionLength < maxLength) {
                    applyActiveMaskToChar(el, String.fromCharCode(evt.which));                
                    evt.preventDefault();
                }
            }
            else if (evt.which === 13) {
                applyMaskToField(el);
            }
            storeCursorPosition(el);            
            evt.stopPropagation();                            
        },
        "inputKeyDown": function(evt, el) {            
            var keyCode = evt.which || evt.keyCode;
            // BACKSPACE or DELETE
            if (keyCode === 8 || keyCode === 46) {                
                removeCharFromActiveMask(el, keyCode);
                evt.preventDefault();  
            }
            storeCursorPosition(el);
            evt.stopPropagation();
        },            
        "inputClick": function(evt, el) {            
            storeCursorPosition(el);                        
            evt.stopPropagation();
        },       
        "inputPaste": function(evt, et) {
            evt.preventDefault();
        }
    };
 
    var valueGetters = {
        "getValue": function(el) {
            var data = getPluginData(el),
                value = data.dataElement.val();
            if (data.encodeHidden) {
                value = Base64.decode(value);
            }
            return value;
        },
        "getValueselect": function(el) {
            var data = getPluginData(el),
                text = data.dataElement.data('origText');
                
            if (data.encodeHidden) {
                //text = encryptValue(text);
            }    
            
            return text;
        },
        
        "getVisual": function(el) {
            var node = el.attr('nodeName').toLowerCase();
                
            if (node === 'input') {
                return el.val();
            } else if (node === 'select') {
                return el.children(':selected').text();
            }
        }
    };
    var valueSetters = {
        "setValue": function(el, value) {
            var data = getPluginData(el),
                initValue = value;
            if (data.encodeHidden) {
                value = Base64.encode(value);
            }
            data.dataElement.val(value);
            return initValue;
        },
        "setValueselect": function(el, value) {
            var data = getPluginData(el),
                value = el.children(':selected').val(),
                text = el.children(':selected').text();
                
            if (data.encodeHidden) {
                value = Base64.encode(value);
                //text = encryptValue(text);
            }
            
            data.dataElement.data('origText', text);
            data.dataElement.val(value);
            return text;
        },
        "setVisual": function(el, value, clear) {
            var data = getPluginData(el);
            if (clear !== true) {
                el.val(value);
            } else {
                el.val('');
                data.dataElement.val('');
            }
        },
        "setVisualselect": function(el, value, clear) {
            var data = getPluginData(el),
                text = data.dataElement.data('origText');
            
            if (data.encodeHidden) {
                //text = encryptValue(text);
            }
            if (clear !== true) {
                el.children(':selected').text(value);
            } else {
                el.children(':selected').text(text);
                el.val('0');
                el.trigger('change');
            }
        }
    };
    
    function focusinSupported() {
        var el = document.createElement('input'),
            eventName = 'onfocusin',
            isSupported = (eventName in el);
        if (!isSupported) {
            el.setAttribute(eventName, 'return;');
            isSupported = typeof el[eventName] === 'function';
        }
        el = null;
        return isSupported;
    }
    
    var selectIgnoreRegex = /^(MM|DD|YY|YYYY|AA|AAAA|Select One:|Selecciona Una:)$/i;

    
    var methods = {
        'init': function(options) {
            var opts = $.extend({}, defaults, options),
                focusEvent = (focusinSupported())? 'focusin': 'focus';
            // Make sure the 'type' is supported. If not, resort to the default
            if (blurring.hasMask(opts.type) === false) {
                opts.type = defaults.type;
            }
            
            return this.each(function() {
                var self = $(this),
                    data = getPluginData(self);
                
                if (data.initialized !== true) {
                
                    /*
                    ** If this is a form, delegate all types to the form
                    ** Else If this is an input bind events input
                    **
                    */
                	   if (self[0].nodeName.toLowerCase() === 'form') {
                        
                        // Configure all of the elements
                        var elements = self.find(selector);
                        elements.each(function() {
                            var el = elementSetOpts($(this), opts);
                            
                            if (el.is('input') && !selectIgnoreRegex.test(el.val())) {
                                applyMaskToField(el);
                            } else if (el.is('select') && !selectIgnoreRegex.test(el.children(':selected').text())) {
                                applyMaskToField(el);
                            }
                            
                            if (typeof eventHandlers[el.attr('tagName').toLowerCase()+'Blur'] !== 'undefined') {
                                el.bind('blur.citiTextBlur', function(evt) {
                                    eventHandlers[el.attr('tagName').toLowerCase()+'Blur'](evt, el);
                                });
                            }
                            if (typeof eventHandlers[el.attr('tagName').toLowerCase()+'Focus'] !== 'undefined') {
                                el.bind(focusEvent+'.citiTextBlur', function(evt) {
                                    eventHandlers[el.attr('tagName').toLowerCase()+'Focus'](evt, el);
                                });
                            }
                            if (typeof eventHandlers[el.attr('tagName').toLowerCase()+'Change'] !== 'undefined') {
                                el.bind('change.citiTextBlur', function(evt) {
                                    eventHandlers[el.attr('tagName').toLowerCase()+'Change'](evt, el);
                                });
                            }
                            if (typeof eventHandlers[el.attr('tagName').toLowerCase()+'Keyup'] !== 'undefined') {
                                el.bind('keyup.citiTextBlur', function(evt) {
                                    eventHandlers[el.attr('tagName').toLowerCase()+'Keyup'](evt, el);
                                });
                            }                            

                            el.bind('keydown.citiTextBlur', eventHandlers['keyDown']);
                            $(document).ready(function(evt) {
                                eventHandlers['ready'](el, evt);
                            });

                            // [CM]
                            // additional event handlers required for password_pg and account_pg fields
                            if (checkForClassName(el, 'cB-account_pg') || checkForClassName(el, 'cB-password_pg')) { 
                                if (typeof eventHandlers[el.attr('tagName').toLowerCase()+'KeyPress'] !== 'undefined') {
                                    el.bind('keypress.citiTextBlur', function(evt) {
                                        eventHandlers[el.attr('tagName').toLowerCase()+'KeyPress'](evt, el);
                                    });
                                } 
                                if (typeof eventHandlers[el.attr('tagName').toLowerCase()+'KeyDown'] !== 'undefined') {
                                    el.bind('keydown.citiTextBlur', function(evt) {
                                        eventHandlers[el.attr('tagName').toLowerCase()+'KeyDown'](evt, el);
                                    });
                                }                               
                                if (typeof eventHandlers[el.attr('tagName').toLowerCase()+'Click'] !== 'undefined') {                               
                                    el.bind('click.citiTextBlur', function(evt) {
                                        eventHandlers[el.attr('tagName').toLowerCase()+'Click'](evt, el);
                                    });
                                }                                
                                if (typeof eventHandlers[el.attr('tagName').toLowerCase()+'Paste'] !== 'undefined') {                                 
                                    el.bind('paste.citiTextBlur', function(evt) {
                                        eventHandlers[el.attr('tagName').toLowerCase()+'Paste'](evt, el);
                                    });
                                }
                            }            
                        });
                    
                    } else if (self.attr('tagName').toLowerCase() === 'input' ||
                               self.attr('tagName').toLowerCase() === 'select') {
                        
                        self = elementSetOpts(self, opts);
                        
                        if (self.is('input') && !selectIgnoreRegex.test(self.val())) {
                            applyMaskToField(self);
                        } else if (self.is('select') && !selectIgnoreRegex.test(self.children(':selected').text())) {
                            applyMaskToField(self);
                        }
                        
                        if (typeof eventHandlers[self.attr('tagName').toLowerCase()+'Blur'] !== 'undefined') {
                            self.bind('blur.citiTextBlur', function(evt) {
                                eventHandlers[self.attr('tagName').toLowerCase()+'Blur'](evt, self);
                            });
                        }
                        if (typeof eventHandlers[self.attr('tagName').toLowerCase()+'Focus'] !== 'undefined') {
                            self.bind(focusEvent+'.citiTextBlur', function(evt) {
                                eventHandlers[self.attr('tagName').toLowerCase()+'Focus'](evt, self);
                            });
                        }
                        if (typeof eventHandlers[self.attr('tagName').toLowerCase()+'Change'] !== 'undefined') {
                            self.bind('change.citiTextBlur', function(evt) {
                                eventHandlers[self.attr('tagName').toLowerCase()+'Change'](evt, self);
                            });
                        }
                        if (typeof eventHandlers[self.attr('tagName').toLowerCase()+'Keyup'] !== 'undefined') {
                            self.bind('keyup.citiTextBlur', function(evt) {
                                eventHandlers[self.attr('tagName').toLowerCase()+'Keyup'](evt, self);
                            });
                        }
                        self.bind('keydown.citiTextBlur', eventHandlers['keyDown']);
                        $(document).ready(function(evt) {
                            eventHandlers['ready'](self, evt);
                        });

                        // [CM]
                        // additional event handlers required for password_pg and account_pg fields
                        if (self.hasClass('cB-account_pg') || self.hasClass('cB-password_pg')) { 
                            if (typeof eventHandlers[self.attr('tagName').toLowerCase()+'KeyPress'] !== 'undefined') {
                                self.bind('keypress.citiTextBlur', function(evt) {
                                    eventHandlers[self.attr('tagName').toLowerCase()+'KeyPress'](evt, self);
                                });
                            }
                            if (typeof eventHandlers[self.attr('tagName').toLowerCase()+'KeyDown'] !== 'undefined') {
                                self.bind('keydown.citiTextBlur', function(evt) {
                                    eventHandlers[self.attr('tagName').toLowerCase()+'KeyDown'](evt, self);
                                });
                            }                                                       
                            if (typeof eventHandlers[self.attr('tagName').toLowerCase()+'Click'] !== 'undefined') {                               
                                self.bind('click.citiTextBlur', function(evt) {
                                    eventHandlers[self.attr('tagName').toLowerCase()+'Click'](evt, self);
                                });
                            }                                
                            if (typeof eventHandlers[self.attr('tagName').toLowerCase()+'Paste'] !== 'undefined') {                                 
                                self.bind('paste.citiTextBlur', function(evt) {
                                    eventHandlers[self.attr('tagName').toLowerCase()+'Paste'](evt, self);
                                });
                            }
                        }
                    
                    } else {
                        $.error('Object type "' + self.get(0).tagName +
                                '" is not supported by jQuery.citiTextBlur');
                    }

                    data.initialized = true;                    
                    setPluginData(self, data);
                    
                } else {
                 
                    if (typeof data['origElement-citiTextBlur'] !== 'undefined') {
                        self = data['origElement-citiTextBlur'];
                        data = getPluginData(self);
                    }
                    
                    setPluginData(self, options);
                }
            });
        },
        update: function() {
            return this.each(function() {
                var self = $(this),
                    data = getPluginData(self);
                    
                if (typeof data['origElement-citiTextBlur'] !== 'undefined') {
                    self = data['origElement-citiTextBlur'];
                    data = getPluginData(self);
                }
                
                self.trigger('change');
                self.trigger('blur');
            });
        },
        'actualData': function() {
            var self = $(this);
            var data = getPluginData(self);
            if (data.initialized === true) {
            
                var objectData = self.serializeArray();
                
                return objectData;
            }
        },
        'makeSelectWidget': function(widgetType) {
            var self = $(this);
            var data = getPluginData(self);
            if (typeof data['origElement-citiTextBlur'] !== 'undefined') {
                self = data['origElement-citiTextBlur'];
                data = getPluginData(self);
            }
            
            if (typeof $()[widgetType] !== 'undefined' && typeof self.data(widgetType) !== 'undefined') {
                self[widgetType]({
                    open: function(evt, object) {
                            self.trigger('focus');
                            self[widgetType]();
                    },
                    close: function(evt, object) {
                        self.trigger('blur');
                        self[widgetType]();
                        evt.stopPropagation();
                    },
                    change: function(evt, object) {
                        self[widgetType]();
                    }
                });
                
                self.siblings().find('.ui-'+widgetType).bind('blur', function(evt) {
                    self.trigger('blur');
                    self[widgetType]();
                }).bind('focus', function(evt) {
                    self.trigger('focus');
                    self[widgetType]();
                });
            }
        }
    };
    
    var staticMethods = {
        "decrypt": function(value) {
            return Base64.decode(value);
        }
    };
    
    var getPluginData = function(el) {
        return el.data('citiTextBlur') || {};
    };
    var setPluginData = function(el, data) {
        el.data('citiTextBlur', $.extend(getPluginData(el), data));
    };
    
    function IEClone(el, id, name) {
        var div = document.createElement('div'),
            el = el[0] || el,
            sIndex = el.selectedIndex,
            newName = name+'-citiTextBlur',
            newId = id+'-citiTextBlur',
            regex = new RegExp('\s?name=[\'"]?'+name);
        
        el.id = newId;
        div.appendChild(el.cloneNode(true));
        
        div.innerHTML = div.innerHTML.replace(regex, '$&-citiTextBlur');
        
        if (div.firstChild.childNodes.length > 0) {
            div.firstChild.selectedIndex = sIndex;
            return div.innerHTML;
        } else {
            return div.childNodes[0];
        }
    };
    
    var swapForHidden = function(el, data) {
        var dup, copy,
            name = el.attr('name'),
            id = el.attr('id'),
            parent = el.parent(),
            sib = el.prev();
    
        try {
            dup = document.createElement('<input name="'+name+'">');
            dup.id = id;
            dup.type = 'hidden';
            dup = $(dup);
            
            el.remove();
            copy = IEClone(el, id, name);
            copy = $(copy);
            if (sib.length > 0) {
                copy.insertAfter(sib);
            }
            else {
                parent.prepend(copy);
            }
            el = copy;
            setPluginData(el, data);
            
        } catch(e){
            dup = $(document.createElement('input'));
            dup.attr({
                'id': el.attr('id'),
                'name': el.attr('name'),
                'type': 'hidden'
            });
            el.attr({
                'id': el.attr('id')+'-citiTextBlur',
                'name': el.attr('name')+'-citiTextBlur'
            });
        }
        // prevent the masking element from being included in the form get/post
        parent.append(dup);
        return [dup, copy];
    };
    var getBlurType = function(el) {
        for (var i in selectors) {
            if (checkForClassName(el, selectors[i].slice(1))) {
                return i;
            }
        }
    };
    var applyMaskToField = function(el, method) {                
        var data = getPluginData(el);        
        // [CM]        
        if (checkForClassName(el, 'cB-account_pg') || checkForClassName(el, 'cB-password_pg')) {
                    
            // Store the original value
            var value = "";                                
            if (typeof data.activeMaskedValue !== "undefined") {
                                              
                value = $.trim(data.setValue(el, data.activeMaskedValue));
            }
            else {
                value = $.trim(data.setValue(el, el.val()));                
            }                                    
                       
            // Retrieve the masked value and set it
            var maskedValue = blurring.maskField(data.type, value, data.character);            
            if (typeof maskedValue === 'string') {
                data.setVisual(el, maskedValue);
                
                // Set the masked flag to true
                data.masked = true;
                data.activeMaskedValue = value;                
                setPluginData(el, data);
            }
            else {
                data.activeMaskedValue = value;
                setPluginData(el, data);
            }            
        }
        else {            
            // Only apply the mask if not already masked
            if (data.masked === false) {
                // Store the original value
                var value = $.trim(data.setValue(el, el.val()));
                
                // Retrieve the masked value and set it
                var maskedValue = blurring.maskField(data.type, value, data.character);
                if (typeof maskedValue === 'string' && !selectIgnoreRegex.test(value)) {
                    data.setVisual(el, maskedValue);
                    
                    // Set the masked flag to true
                    data.masked = true;
                    setPluginData(el, data);
                }
            }
        }
    };
    
    var clearMaskFromField = function(el, select) {
        var data = getPluginData(el);
        if (data.masked === true) {
            // [CM]
            // get cursor position before changing value in field                    
            var cursorPositionMap = el.caret();

            // Get the original value
            var value = data.getValue(el);
            // Set the original value, or clear if the option is true
            data.setVisual(el, value, data.clear);

            // [CM]
            // reset cursor to stored position            
            
            if (!el.is('select')) {
                el.caret(cursorPositionMap);        
            }
            

            // [CM]
            // following code commented out as it contradicts 
            // the change to reset the cursor to the stored position
            /*
            if (el.is('input')) {
                if (select) {
                    el.selectRange(0, value.length);
                } else {                                
                    el.selectRange(value.length, value.length);
                    el.selectRange(0,0);
                }
            }
            */
            
            // Set masked to false
            data.masked = false;
            setPluginData(el, data);
        }
    };

    // [CM]
    // additional variables and functions for use with account_pg and password_pg fields
    var cursorPositionMap = {start:0, end:0};    

    function isCharacterKeyPress(evt) {
        if (typeof evt.which == "undefined") {
            // This is IE, which only fires keypress events for printable keys
            return true;
        } else if (typeof evt.which == "number" && evt.which > 0) {
            // In other browsers except old versions of WebKit, evt.which is
            // only greater than zero if the keypress is a printable key.
            // We need to filter out enter/return, backspace and ctrl/alt/meta key combinations
            return evt.which !== 13 && !evt.ctrlKey && !evt.metaKey && !evt.altKey && evt.which != 8;
        }
        return false;
    }

    var storeCursorPosition = function(el) {
        cursorPositionMap.start = el.caret().start;
        cursorPositionMap.end = el.caret().end;        
    }

    var reapplyFullMaskToField = function(el) {        
        // initialize values
        var data = getPluginData(el);
        var trueTextArray = data.getValue(el).split("");        
        storeCursorPosition(el);

        // update mask field
        el.val((new Array(trueTextArray.length + 1)).join(data.character));
        
        el.caret({start: cursorPositionMap.start, end:cursorPositionMap.end});        
        data.activeMaskedValue = trueTextArray.join("");

        setPluginData(el, data);
    }    

    var clearValueFromField = function(el) {
        var data = getPluginData(el);                
        el.val("");
        data.activeMaskedValue = "";        
        storeCursorPosition(el);

        setPluginData(el, data);
    }

    var applyActiveMaskToChar = function(el, char) {
        // initialize values
        var data = getPluginData(el);                        
        var trueTextArray = data.activeMaskedValue.split("");
        //update based on char
        trueTextArray.splice(cursorPositionMap.start, cursorPositionMap.end - cursorPositionMap.start, char);                    
    
        // update mask field and data
        el.val((new Array(trueTextArray.length + 1)).join(data.character));        
        
        // move the cursor to correct position after updating field value        
        var newCursorPos = cursorPositionMap.start + 1;
        el.caret({start: newCursorPos, end: newCursorPos});        
        storeCursorPosition(el);

        data.activeMaskedValue = trueTextArray.join("");
        setPluginData(el, data);
    };

    var removeCharFromActiveMask = function(el, keyCode) {        
        // initialize values
        var data = getPluginData(el);                
        var trueTextArray = data.activeMaskedValue.split("");        
        var cursorOffset = 0;

        // need to re-confirm cursor position, because of browsers differences with click event
        storeCursorPosition(el);
        
        // BACKSPACE
        if (keyCode === 8) {
            // normal backspace                        
            if (cursorPositionMap.start === cursorPositionMap.end && cursorPositionMap.start > 0 ) {

                trueTextArray.splice(cursorPositionMap.start - 1, 1);                            
                cursorOffset = -1; 
            }
            // backspace on highlighted selection
            else if (cursorPositionMap.start !== cursorPositionMap.end) {
                trueTextArray.splice(cursorPositionMap.start, cursorPositionMap.end - cursorPositionMap.start);                
            }
        }
        // DELETE
        else if (keyCode === 46) {            
            // normal delete
            if (cursorPositionMap.start === cursorPositionMap.end && cursorPositionMap.start < trueTextArray.length) {
                trueTextArray.splice(cursorPositionMap.start, 1);                                                           
            }
            // delete on highlighted selection
            else if (cursorPositionMap.start !== cursorPositionMap.end) {
                trueTextArray.splice(cursorPositionMap.start, cursorPositionMap.end - cursorPositionMap.start);                                
            }
        }

        //update mask field and data
        el.val((new Array(trueTextArray.length + 1)).join(data.character));        

        // move the cursor to correct position after updating field value
        var newCursorPos = cursorPositionMap.start + cursorOffset;
        el.caret({start: newCursorPos, end: newCursorPos});
        data.activeMaskedValue = trueTextArray.join("");
        setPluginData(el, data);        
    }
    
    
    var elementSetOpts = function(el, opts) {
        var data = getPluginData(el);
        
        if (data.initialized !== true) {
        
            var dups = swapForHidden(el, data),
                dup = dups[0],
                optEls = el.children('option'),
                value = valueGetters.getVisual(el);
                
            if (dups[1]) {
                el = dups[1];
            }
                            
            // determine which getters and setters to use
            var setter;
            var setterVisual;
            var getter;
            if (typeof valueSetters['setValue'+el.attr('tagName').toLowerCase()] !== 'undefined') {
                setter = valueSetters['setValue'+el.attr('tagName').toLowerCase()];
            } else {
                setter = valueSetters['setValue'];
            }
            if (typeof valueSetters['setVisual'+el.attr('tagName').toLowerCase()] !== 'undefined') {
                setterVisual = valueSetters['setVisual'+el.attr('tagName').toLowerCase()];
            } else {
                setterVisual = valueSetters['setVisual'];
            }
            if (typeof valueGetters['getValue'+el.attr('tagName').toLowerCase()] !== 'undefined') {
                getter = valueGetters['getValue'+el.attr('tagName').toLowerCase()];
            } else {
                getter = valueGetters['getValue'];
            }

            setPluginData(el, $.extend({}, opts, {
                'initialized': true,
                'type': getBlurType(el),
                'masked': false,
                'dataElement': dup,
                'getValue': getter,
                'setValue': setter,
                'setVisual': setterVisual
            }));
            setPluginData(dup, {
                'initialized': true,
                'origElement-citiTextBlur': el
            });
            
            // Decrypt value if set initially
            if (optEls.length > 0) {
                optEls.each(function() {
                    var self = $(this),
                        text = self.text();
                    //self.text(Base64.decode(text));
                });
            } else {
                if (value !== '' && value !== null && !selectIgnoreRegex.test(value)) {
                    dup.val(value);
                    setterVisual(el, Base64.decode(value));
                }
            }
            
            return el;
        }
    };

    // [CM]
    // replacement for jQuery's hasClass() function, because of a conflict with some old citi library file (ApplyCommon.js)
    function checkForClassName(el, className) {
        return (el.attr("class").indexOf(className) != -1);
    }
    
    var Base64 = {
        // private property
        _keyStr : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
     
        // public method for encoding
        encode : function (input) {
        
            var output = "";
            var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
            var i = 0;
     
            input =  unescape(encodeURIComponent( input ));
     
            while (i < input.length) {
     
                chr1 = input.charCodeAt(i++);
                chr2 = input.charCodeAt(i++);
                chr3 = input.charCodeAt(i++);
     
                enc1 = chr1 >> 2;
                enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                enc4 = chr3 & 63;
     
                if (isNaN(chr2)) {
                    enc3 = enc4 = 64;
                } else if (isNaN(chr3)) {
                    enc4 = 64;
                }
     
                output = output +
                this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) +
                this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);
     
            }
     
            return output;
        },
     
        // public method for decoding
        decode : function (input) {
            var output = "";
            var chr1, chr2, chr3;
            var enc1, enc2, enc3, enc4;
            var i = 0;
            var storedInput = input;
     
            input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
     
            while (i < input.length) {
     
                enc1 = this._keyStr.indexOf(input.charAt(i++));
                enc2 = this._keyStr.indexOf(input.charAt(i++));
                enc3 = this._keyStr.indexOf(input.charAt(i++));
                enc4 = this._keyStr.indexOf(input.charAt(i++));
     
                chr1 = (enc1 << 2) | (enc2 >> 4);
                chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                chr3 = ((enc3 & 3) << 6) | enc4;
     
                output = output + String.fromCharCode(chr1);
     
                if (enc3 != 64) {
                    output = output + String.fromCharCode(chr2);
                }
                if (enc4 != 64) {
                    output = output + String.fromCharCode(chr3);
                }
     
            }
     
            try {
                output = decodeURIComponent(escape(output));
            } catch (e) {
                output = storedInput;
            }
     
            return output;
     
        } 
    };
    
    
    var encryptValue = function(value) { 
        var output = "";
        if (!value) return;
        
        output = Base64.encode(value);
        return output;
    };
    
    $.fn.citiTextBlur = function(method) {
    
        if (!flag) {
            return;
        } else if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method "' + method + '" does not exist on jQuery.citiTextBlur');
        }
    };
    $.citiTextBlur = function(method) {
        if (!flag) {
            return;
        } else if (staticMethods[method]) {
            return staticMethods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else {
            $.error('Method "' + method + '" does not exist on jQuery.citiTextBlur');
        }
    };
}(jQuery, maskFlag))