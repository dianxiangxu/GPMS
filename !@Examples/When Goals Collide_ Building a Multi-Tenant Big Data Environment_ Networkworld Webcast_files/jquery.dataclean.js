/*
	Data Clean jQuery plugin for Central Registration
	Copyright (c) 2013 Cliff Bryant (idgenterprise.com)
	Version: 1.0
*/

String.prototype.Utf8Length = (function() {
	// @link https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/String/charAt#Example_3.3A.C2.A0Fixing_charAt_to_support_non-Basic-Multilingual-Plane_%28BMP%29.C2.A0characters
	var getWholeCharAndI = function(str, i) {
	    var code = str.charCodeAt(i);
	    if (isNaN(code)) {
	        return ''; // Position not found
	    }
	    if (code < 0xD800 || code > 0xDFFF) {
	        return [str.charAt(i), i]; // Normal character, keeping 'i' the same
	    }
	    if (0xD800 <= code && code <= 0xDBFF) { // High surrogate (could change last hex to 0xDB7F to treat high private surrogates as single characters)
	        if (str.length <= (i+1))  {
	            throw 'High surrogate without following low surrogate';
	        }
	        var next = str.charCodeAt(i+1);
	        if (0xDC00 > next || next > 0xDFFF) {
	            throw 'High surrogate without following low surrogate';
	        }
	        return [str.charAt(i)+str.charAt(i+1), i+1];
	    }
	    // Low surrogate (0xDC00 <= code && code <= 0xDFFF)
	    if (i === 0) {
	        throw 'Low surrogate without preceding high surrogate';
	    }
	    var prev = str.charCodeAt(i-1);
	    if (0xD800 > prev || prev > 0xDBFF) { // (could change last hex to 0xDB7F to treat high private surrogates as single characters)
	        throw 'Low surrogate without preceding high surrogate';
	    }
	    return [str.charAt(i+1), i+1]; // Return the next character instead (and increment)
	};
	return function() {
		var Utf8Length = 0;
		for (var i = 0, c; i < this.length; i++) {
			++Utf8Length;
		    var arr = getWholeCharAndI(this, i); // Adapt this line at the top of each loop, passing in the whole string and the current iteration and returning an array with the individual character and 'i' value (only changed if a surrogate pair)
		    i = arr[1];
		}
		return Utf8Length;
	};
	
}());

IDG = window.IDG || {};
IDG.dataClean = (function() {
	
	var dialogHtmlSingular = ' invalid character was removed.';
	var dialogHtmlPlural = ' invalid characters were removed.';
	var buttonPaneHtml = '<div id="divDataCleanButtonPane">Do not display this dialog, when invalid characters are removed.</div><input id="chkDataCleanDialog" type="checkbox"></input>';
	var displayDialog = null;
	var dataCleanCookie = '_dcdlg';
	var includes = [ 011, 012, 015 ];  // tab, linefeed, carriage return
	var excludes = [];  // 4/9/13 don't exclude pipe (|)
	//var excludes = [ 0174 ];  // 4/26/13 use pipe (|) char for testing
	var context = null;	
	
	var cleanData = function(includes, excludes) {
		var value = context.val()
		var newVal = clean(value, includes, excludes);
		//var removed = value.length - newVal.length;
		var removed = value.Utf8Length() - newVal.Utf8Length();
		if (removed > 0) {
			context.val(newVal);
			if (displayDialog != null) {
				displayDialog(removed);
			}
		}
	};

	var clean = function(value, includes, excludes) {
		var newVal = '';
		for (var i = 0; i < value.length; ++i) {
			var c = value.charCodeAt(i);
			if (isValid(c, includes, excludes)) {
				newVal += value.charAt(i);
			}
		}
		// trim the string before returning the value.
		return $.trim(newVal);
	}

	var isValid = function(c, includes, excludes) {
		for (var i = 0; i < includes.length; ++i) {
			if (c == includes[i]) return true;
		}
		if (c < 040 || c > 0176) return false;
		for (var i = 0; i < excludes.length; ++i) {
			if (c == excludes[i]) return false;
		}
		return true;
	};

	return {
		init: function($, showDlg) {
			
			// clean a single line text field.
			$.fn.cleanSingle = function(eventObj) {
				context = $(this);
				cleanData([], excludes, showDlg);
			};
		
			// clean a multi-line text field.
			// allow tab & newline characters.
			$.fn.cleanMulti = function(eventObj) {
				context = $(this);
				cleanData(includes, excludes);		
			};
		
			if (showDlg) {
		
				displayDialog = function(removed) {
					var c = $.cookie(dataCleanCookie);
				    if (c == null || c == 's') {
						// clear the checkbox
						$('#chkDataCleanDialog').removeAttr('checked');
			            $("#dataCleanDialog").html('' + removed + (removed == 1 ? dialogHtmlSingular : dialogHtmlPlural)).dialog('open');
				    }
				};
				
			    $('<div id="dataCleanDialog"/>').dialog({
			    	title: 'Data Cleaning Dialog',
			    	modal: true,
			    	autoOpen: false,
			    	buttons: {
			    		Ok: function() { $(this).dialog('close'); }
			    	},
			    	dialogClass: 'data-clean-class',
			    	create: function() {
			    		var div = $('#divDataCleanButtonPane');
			    		if (div.length == 0) {
				    		$('.data-clean-class .ui-dialog-buttonpane').prepend(buttonPaneHtml); 
			    		}
			    	},
			    	beforeclose: function() { 
			    		var value = ($('#chkDataCleanDialog').is(':checked') ? 'h' : 's');
			    		$.removeCookie(dataCleanCookie);
					    $.cookie(dataCleanCookie, value); 
					    return true;
			    	}
			    });	
			}		
		},
		
		cleanGridCell: function(oldValue, cellCallback) {
			var newValue = clean(oldValue, includes, excludes);
			var removed = oldValue.Utf8Length() - newValue.Utf8Length();
			if (removed > 0) {
				cellCallback.call(null, newValue);			
				if (displayDialog != null) {
					displayDialog(removed);
				}
			}
		},
		
		cleanMceBody: function(inst) {
			var oldValue = inst.getBody().innerHTML;
			var newValue = clean(oldValue, includes, excludes);
			var removed = oldValue.Utf8Length() - newValue.Utf8Length();
			if (removed > 0) {
				inst.getBody().innerHTML = newValue;			
				if (displayDialog != null) {
					displayDialog(removed);
				}
			}			
		}
	};
}());
