JSON.__parse = JSON.parse;
JSON.parse = function (msg) {
  return (msg instanceof Object) ? msg : this.__parse(msg);
};

(function () {//new Date(string) doesn't work in IE8
  var D = new Date('2011-06-02T09:34:29+02:00');
  if (!D || +D !== 1307000069000) {
    Date.fromISO = function (s) {
      var day, tz,
              rx = /^(\d{4}\-\d\d\-\d\d([tT ][\d:\.]*)?)([zZ]|([+\-])(\d\d):(\d\d))?$/,
              p = rx.exec(s) || [];
      if (p[1]) {
        day = p[1].split(/\D/);
        for (var i = 0, L = day.length; i < L; i++) {
          day[i] = parseInt(day[i], 10) || 0;
        }
        ;
        day[1] -= 1;
        day = new Date(Date.UTC.apply(Date, day));
        if (!day.getDate()) return NaN;
        if (p[5]) {
          tz = (parseInt(p[5], 10) * 60);
          if (p[6]) tz += parseInt(p[6], 10);
          if (p[4] == '+') tz *= -1;
          if (tz) day.setUTCMinutes(day.getUTCMinutes() + tz);
        }
        return day;
      }
      return NaN;
    }
  }
  else {
    Date.fromISO = function (s) {
      return new Date(s);
    }
  }
})();

(function () {
  var activate = $.fn.tab.Constructor.prototype.activate;
  $.fn.tab.Constructor.prototype.activate = function () {
    activate.apply(this, arguments);

    this.element.attr('aria-selected', true);
    this.element.parent().siblings().find(' > a').attr('aria-selected', false);
  }
})();

function IdeaScaleController(window, document, undefined, options) {
  function escapeForAttr(value) {
    return value.replace(/"/g, '&quot;');
  }

  var uniqueIdFeed = 0;
  var globalVariablesObj = {};
  this.globalVariablesObj = globalVariablesObj;

  function uniqueId() {
    return 'uid-' + new Date().getTime() + '-' + ++uniqueIdFeed;
  }

  this.uniqueId = uniqueId;

  function setReturnUrl() {
    var action = $('head').attr('data-return-url-update-action');
    if (!action) {
      return;
    }

    $.ajax({
      url: action,
      type: 'POST',
      data: { url: window.location.href },
      async: false
    });
  }

  options = $.extend(true, {
    alertMsgTop: '0px',
    alertMsgFilter: function (msg) {
    },
    actionInterceptors: {
      'dropdown-menu-open': function (trigger) {
        return !$(trigger).closest('.dropdown').hasClass('open');
      },
      'close-announcement': function () {
        $('#universal-announcement').fadeOut();
      }
    },
    inProgressHandlers: {},
    jsonParamProviders: {},
    jsonResponseHandlers: {
      'reload-page': function () {
        reloadPage();
      },
      'redirect-to-page': function (trigger) {
        window.location = trigger.attr('data-redirect-url');
      },
      'remove-row': function (trigger) {
        trigger.closest('tr').fadeOut('slow', function () {
          $(this).remove();
        });
      },
      'remove-item': function (trigger) {
        trigger.closest('li').fadeOut('slow', function () {
          $(this).remove();
        });
      },
      'item-updated': function (trigger, json) {
        var oldItem = trigger.closest('li');
        var newItem = $($.trim(json.data.html));
        newItem.insertBefore(oldItem);
        oldItem.remove();
        newItem.initializeFeatures();
      },
      'wait-and-click-again': function (trigger) {
        setTimeout(function () {
          trigger.trigger('click');
        }, 1000);
      },
      'add-after': function (trigger, json) {
        var newItem = trigger.siblings("#ajaxHtmlFragmentContainer").html(json.data.html);
        newItem.initializeFeatures();

      }
    },
    customAjaxLinkHandler : {
      'shape-shifter' : function (trigger, response) {
        trigger.replaceWith("<div>" + response + "</div>");
      }
    },
    customFormLinkUpdateHandler : {},
    featureInitializations: {
      'update-msg-indicator': function (container) {
        $('#utb-msg-indicator').find('> strong').replaceWith(container.find('[data-msg-indicator]').attr('data-msg-indicator'));
      },
      'alert-message': function (container) {
        var alertMessages = container.hasClass('alert-message') ? container : container.find('.alert-message');

        alertMessages.each(function () {
          var msgBoard = $(this);
          if (msgBoard.hasClass('hidden') || msgBoard.find('.action-taken').length > 0) {
            return;
          }

          popupMessage(msgBoard);
        });
      },
      'close-alert-message': function (container) {
        container.find('.close-alert-message').click(function () {
          var trigger = $(this);
          trigger.unbind('click');
          withdrawMessage(trigger.closest('.alert-message'), null);
          return false;
        });
      },
      'inline-help': function (container) {
        //todo-pp-v3 fix issues:
        //1) don't go to # when clicking it
        //2) the width should be more flexible. For instance, in signup page, the Hide My Identity popover right now is too narrow
        //3) should close automatically when clicking away
        //4) it should not be covered by the topbar (can't use z-index, since alert-message must have a lower z-index than the topbar)
        container.find('.inline-help').each(function () {
          var title = $(this).attr("data-help-title");
          var content = $(this).attr("data-help-content");
          var placement = $(this).attr("data-help-placement");

          $(this).popover({html: true, title: title, content: content, placement: placement});
        });
      },
      'popover': function (container) {
        container.find(".popover-element").each(function () {
          var elem = $(this);
          var popoverPlacement = (elem.data("popover-placement") == undefined) ? "top" : elem.data("popover-placement");
          var popoverTrigger = (elem.data("popover-trigger") == undefined) ? "click" : elem.data("popover-trigger");
          var title = (elem.data("popover-title") == undefined) ? "" : elem.data("popover-title");
          var popoverContent = $("#" + elem.data("popover-content-id")).clone();

          if (popoverContent == undefined) {
            popoverContent = elem.data("popover-content");
          } else {
            popoverContent.show();
            popoverContent.initializeFeatures();
          }

          var parentClassName = (elem.data("popover-parent-class") != undefined) ? elem.data("popover-parent-class") : "";

          var popover = elem.popover({
            container: "body",
            html: true,
            title: title,
            content: popoverContent,
            placement: popoverPlacement,
            trigger: popoverTrigger,
            template: '<div class="popover '+parentClassName+'" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
          });

          if($(elem.data("popover-close-button"))) {
            popoverContent.find("#" + elem.data("popover-close-button")).on("click", function() {
              elem.popover("hide");
              return false;
            });
          }

          elem.on("show.bs.popover", function () {
            if (elem.data("popover-group")) {
              $("[data-popover-group='" + elem.data("popover-group") + "']").not(elem).popover("hide");
            }

            if(elem.data("popover-show-callback")) {
              options.popoverEventHandlers[elem.data("popover-show-callback")](elem, popoverContent);
            }
          });

          elem.on("shown.bs.popover", function() {
            if(elem.data("popover-shown-callback")) {
              options.popoverEventHandlers[elem.data("popover-shown-callback")](elem, popoverContent);
            }
          });
          elem.on("hide.bs.popover", function() {
            if(elem.data("popover-hide-callback")) {
              options.popoverEventHandlers[elem.data("popover-hide-callback")](elem, popoverContent);
            }
          });
          elem.on("hidden.bs.popover", function() {
            if(elem.data("popover-hidden-callback")) {
              options.popoverEventHandlers[elem.data("popover-hidden-callback")](elem, popoverContent);
            }
          });
        });
      },
      'tooltip': function (container) {
        container.tooltip({selector: "[rel=tooltip]", delay: 200});
      },
      'auto-click': function (container) {
        var targets = container.find('[data-auto-click]');

        var listener = targets.attr('data-click-listener');
        if (listener) {
          options.clickListeners[listener](targets);//because triggered click won't bubble up, we have to call the listener manually
        }

        targets.click(function () {
          window.location = $(this).attr('href');
        });

        targets.trigger('click');

        //Keep the data attribute for a little while,
        //so that any other features that might trigger automatic click
        //can know there's already an auto-click. 2 seconds should be enough
        setTimeout(function () {
          targets.removeAttr('data-auto-click');
        }, 2000);
      },
      'observe-event': function (container) {
        container.find("[data-observe-event]").each(function () {
          var elem = $(this);
          var events = elem.data("observe-event").split(" ");
          for(var i = 0; i < events.length; i++ ) {
            var listener;
            if(elem.data("observe-on-"+ events[i])) {
              listener = options.eventListeners[elem.data("observe-on-"+ events[i])];
            } else {
              listener = options.eventListeners[elem.data("observe-on-event")];
            }
            elem.on(events[i], listener);
          }
        });
      },

      'collapse-expand': function (container) {
        container.find('.collapse-expand').click(
                function () {
                  var link = $(this);
                  var text = link.html();
                  var altText = link.attr('data-alt-text');
                  options.collapseExpandHandlers[link.attr('data-collapse-expand-type')](link);
                  link.html(altText);
                  link.attr('data-alt-text', text);
                  return false;
                }).filter('[data-target-collapsed="true"]').trigger('click');
      },
      'json-link': function (container) {
        container.find('.json-link').click(function () {
          var trigger = $(this);

          if (trigger.hasClass('disabled') || trigger.attr('on-hold')) {
            return false;
          }

          var interceptorKey = trigger.attr('data-action-interceptor');
          var interceptor = interceptorKey === undefined ? undefined : options.actionInterceptors[interceptorKey];
          if (interceptor !== undefined && interceptor(trigger) === false) {
            return false;
          }

          var confirmMsg = trigger.attr('data-confirm');
          if (confirmMsg && !confirm(confirmMsg)) {
            return false;
          }

          trigger.attr('on-hold', true);

          var inProgressHandlerKey = trigger.attr('data-in-progress-handler');
          var inProgressHandler = inProgressHandlerKey === undefined ? undefined : options.inProgressHandlers[inProgressHandlerKey];
          if (inProgressHandler !== undefined) {
            try {
              inProgressHandler.on(trigger);
            } catch (ex) {
              var msg = 'error happened on ' + inProgressHandlerKey;
              if (typeof(isDevEnv) !== 'undefined') {
                alert(msg);
              }

              throw msg;
            }
          }

          function reEnable() {
            trigger.removeAttr('on-hold');

            if (inProgressHandler !== undefined) {
              inProgressHandler.off(trigger);
            }
          }

          var method = trigger.attr('data-action-method');
          if (!method) {
            method = 'POST';
          }

          var params = 'target-content-type=json';
          if (trigger.attr('data-param-provider')) {
            params = params + '&' + options.jsonParamProviders[trigger.attr('data-param-provider')](trigger);
          }

          $.ajax({
            type: method,
            cache: false,
            url: getActionUrl(trigger),
            data: params,
            success: function (json) {
              var customHandler = trigger.attr('data-json-handler-' + json.type);
              if (customHandler !== undefined) {
                try {
                  if (options.jsonResponseHandlers[customHandler](trigger, json) !== false) {
                    //Returning false from the jsonResponseHandler would prevent auto re-enabling.
                    //This is useful if there are ajax requests made in the handler, or the disabled UI elements have been removed from DOM
                    //If we do this, it will be the handler's responsibility to re-enable the UI elements, if necessary
                    reEnable();
                  }
                } catch (ex) {
                  if (typeof(isDevEnv) !== 'undefined') {
                    alert(ex);
                  }

                  throw ex;
                }

                return;
              }

              if (json.type === 'redirect') {
                window.location = json.data.url;
                return;
              }

              if (json.type === 'reload') {
                reloadPage();
                return;
              }

              reEnable();

              handleGenericJSONResponse(json);
            },
            error: function (request, textStatus) {
              reEnable();

              handleAjaxError(textStatus);
            }
          });

          return false;
        });
      },
      'smart-json-form': function (container) {
        container.find('.smart-json-form').andSelf().filter('.smart-json-form').submit(function () {
          sendSmartJsonForm($(this));
          return false;
        }).find('[type="submit"]').click(function () {
          var trigger = $(this);
          var name = trigger.attr('name');
          if (!name) {
            return;
          }

          var form = trigger.closest('form');
          form.find('input[data-submit-name]').remove();
          form.append('<' + 'input data-submit-name="1" type="hidden" name="' + name + '" />');
        }).filter('.disabled-when-loading').removeAttr('disabled');
      },
      'go-to-first-field-with-error': goToFirstFieldWithError,
      'ajax-form-update': function (container) {
        container.find('[data-form-update-target-id]').bind('submit', function () {
          var form = $(this);

          form.find('.tiny-mce-area').each(function () {
            $(this).val(tinymce.get(this.id).getContent());
          });

          var confirmMsg = form.attr('data-confirm');
          if (confirmMsg && !confirm(confirmMsg)) {
            return false;
          }

          $('#' + form.attr('data-form-update-target-id')).parent().load(getActionUrl(form), form.serializeArray(),
                  function (responseText, textStatus) {
                    if (textStatus !== 'success' && textStatus !== 'notmodified') {
                      alert('Oops, something went wrong!\nPlease refresh the page and try again.');
                      return;
                    }
                    if(form.attr('reload-dependent-placeholder') != undefined) {
                      $('.' + form.attr('reload-dependent-placeholder')).html("");
                      $('.' + form.attr('reload-dependent-placeholder')).load(form.attr('reload-dependent-url'));
                    }
                    $(this).initializeFeatures();

                    var customHandler = form.data('ajax-form-update-handler');
                    if(customHandler != undefined) {
                      options.customFormLinkUpdateHandler[customHandler](form, responseText);
                    }

                  });
          return false;
        });
      },
      'reload-page-on-load': function () {
        reloadPage();
      },
      'ajax-link-update': function (container) {
        container.find('[data-link-update-container-id]').on('click dropdown-trigger-ajax-link-update', function (e) {
          e.preventDefault();

          var trigger = $(this);

          var interceptorKey = trigger.attr('data-action-interceptor');
          var interceptor = interceptorKey === undefined ? undefined : options.actionInterceptors[interceptorKey];
          if (interceptor !== undefined && interceptor(trigger) === false) {
            return;
          }

          var updateTargetContainer = $('#' + trigger.attr('data-link-update-container-id'));
          if (trigger.attr('data-clear-before-update') !== undefined) {
            updateTargetContainer.html('');
          }
          updateTargetContainer.addClass('loading');

          var method = trigger.attr('data-action-method');
          if (!method) {
            method = 'GET';
          }

          $.ajax({
            type: method,
            cache: false,
            url: getActionUrl(trigger),
            success: function (response) {
              updateTargetContainer.removeClass('loading').html(response).initializeFeatures();

              if (trigger.attr('data-auto-scroll-off') === undefined) {
                scrollIntoView(updateTargetContainer, null);
              }
            },
            error: function () {
              alert('Oops, something went wrong!\nPlease refresh the page and try again.');
            }
          });
        }).filter('[data-link-update-trigger-click]').trigger('click');
      },
      'ajax-link' : function (container) {
        container.find('.ajax-link').click(function (e){
          e.preventDefault();
          var trigger = $(this);

          var updateTargetContainer = $(trigger.attr('data-link-container-id'));

          var method = trigger.attr('data-action-method');
          if (!method) {
            method = 'GET';
          }

          $.ajax({
            type: method,
            cache: false,
            url: getActionUrl(trigger),
            success: function (response) {

              if (updateTargetContainer != undefined) {
                updateTargetContainer.removeClass('loading').html(response).initializeFeatures();

                if (trigger.attr('data-auto-scroll-off') === undefined) {
                  scrollIntoView(updateTargetContainer, null);
                }
              }

              var customHandler = trigger.attr('data-link-response-handler');
              if(customHandler != undefined) {
                options.customAjaxLinkHandler[customHandler](trigger, response);
              } else {
                trigger.html(response).initializeFeatures();
              }
            },
            error: function () {
              alert('Oops, something went wrong!\nPlease refresh the page and try again.');
            }
          });
        });
      },
      'dropdown-for-ajax-link-update': function (container) {
        container.find('.dropdown-for-ajax-link-update').parent().on('show.bs.dropdown', function () {
          $(this).find('.dropdown-for-ajax-link-update').trigger('dropdown-trigger-ajax-link-update');
        })
      },
      'ajax-form-update-target': function (container) {
        container.find('[data-form-update-target-id]').bind('submit', function () {
          var form = $(this);
          $('#' + form.attr('data-form-update-target-id')).addClass('loading').load(getActionUrl(form), form.serializeArray(),
                  function (responseText, textStatus) {
                    if (textStatus !== 'success' && textStatus !== 'notmodified') {
                      alert('Oops, something went wrong!\nPlease refresh the page and try again.');
                      return;
                    }

                    var updateTargetContainer = $('#' + form.attr('data-form-update-target-id'));
                    updateTargetContainer.removeClass('loading').initializeFeatures();
                  });
          return false;
        });
      },
      'embed-screencast': function () {
        //override this
      },
      'update-content': function () {
        $('[data-content-container-id]').each(function () {
          var trigger = $(this);
          var container = $('#' + trigger.attr('data-content-container-id'));
          container.html(trigger.attr('data-content'));
          markAsChanged(container);
        })
      },
      'click-bubble-off': function () {
        $('.click-bubble-off').click(function (e) {
          e.stopPropagation();
        });
      },
      'placeholder-polyfill': function () {
        $('[placeholder]').bind('focus',
                function () {
                  var input = $(this);

                  if ($.trim(input.val()) === input.attr('placeholder')) {
                    input.val('');
                    input.removeClass('with-placeholder-text');
                  }
                }).
                bind('blur',
                function () {
                  var input = $(this);
                  if ($.trim(input.val())) {
                    return;
                  }

                  input.val(input.attr('placeholder'));
                  input.addClass('with-placeholder-text');
                }).
                trigger('blur');
      },
      'auto-submit-on-change': function (container) {
        container.find('.auto-submit-on-change').on('change', function () {
          $(this.form).trigger('submit');
        });
      },
      'ajax-call-on-change': function (container) {
        container.find('.ajax-call-on-change').bind('change', function () {
          var trigger = $(this);

          var updateTargetContainer = $('#' + trigger.attr('data-change-update-container-id'));
          if (trigger.attr('data-clear-before-update') !== undefined) {
            updateTargetContainer.html('');
          }
          updateTargetContainer.addClass('loading');

          var method = trigger.attr('data-action-method');
          if (!method) {
            method = 'GET';
          }

          var url = trigger.attr('data-action-url') + trigger.val();

          $.ajax({
            type: method,
            cache: false,
            url: url,
            success: function (response) {
              updateTargetContainer.removeClass('loading').html(response.data.html).initializeFeatures();

              if (trigger.attr('data-auto-scroll-off') === undefined) {
                scrollIntoView(updateTargetContainer, null);
              }
            },
            error: function () {
              alert('Oops, something went wrong!\nPlease refresh the page and try again.');
            }
          });
        });
      },
      'conditional-field': function (container) {
        var duration = 0;
        container.find('[data-depending-field-id]').each(function () {
          var field = $(this);
          $('#' + field.attr('data-depending-field-id')).bind('change',
                  function () {
                    var match = (this.type === 'checkbox')//notice we don't do radio buttons because change event is not fired when radio input is unselected
                            ? (this.checked ? 'true' : 'false') === field.attr('data-depending-field-checked')
                            : (field.attr('data-depending-field-value').split(',').length > 1) ? ($.inArray(this.value, field.attr('data-depending-field-value').split(',')) > -1) : this.value === field.attr('data-depending-field-value');

                    if (field.attr('data-depending-negative')) {
                      match = !match;
                    }

                    if (match) {
                      field.slideDown(duration);
                    }
                    else {
                      field.slideUp(duration);
                    }
                  }).trigger('change');
        });
        duration = 200;
      },
      'placeholder-text': function () {
        $('[data-placeholder-text]').bind('focus',
                function () {
                  var input = $(this);

                  if ($.trim(input.val()) === input.attr('data-placeholder-text')) {
                    input.val('');
                    input.removeClass('with-placeholder-text');
                  }
                }).
                bind('blur',
                function () {
                  var input = $(this);
                  if ($.trim(input.val())) {
                    return;
                  }

                  input.val(input.attr('data-placeholder-text'));
                  input.addClass('with-placeholder-text');
                }).
                trigger('blur');
      },
      'conditional-fields-by-radio-group': function (container) {
        var duration = 0;
        container.find('[data-depending-radio-group-name]').each(function () {
          var fields = $(this);
          fields.closest('form').find('input[type="radio"][name=' + fields.attr('data-depending-radio-group-name') + ']').
                  bind('change', function () {
                    if (!this.checked) {
                      return;
                    }

                    if (this.value == fields.attr('data-depending-radio-group-value')) {
                      fields.slideDown(duration);
                    } else {
                      fields.slideUp(duration);
                    }
                  }).trigger('change');
        });
        duration = 200;
      },
      'make-switch': function (container) {
        container.find('.is-switch').bootstrapSwitch();
      },
      'tag-editing': function (container) {
        enableTagEditor(container.find('.tag-editor'));
      },
      'ideabuzz-challenge-tag-editing': function(container) {
        enableTagEditorCommon("/a/buzz/challenge/tag/autocomplete", container.find('.tag-editor'));
      },
      'predefined-tag-editing': function (container) {
        enablePredefinedTagEditor(container.find('.tag-editor'), container.find('#hybrid-tag-enabled').val());
      },
      'public-tags-editor': function (container) {
        container.find('.public-tags-editor').each(function () {
          var target = $(this);
          if (target.attr('data-predefined-tags')) {
            enablePredefinedTagEditor(target, target.attr('data-hybrid-tags') === '1');
          } else {
            enableTagEditor(target);
          }
        });
      },
      'moderator-tags-editor': function(container) {
        enableModeratorTagEditor(container.find('.moderator-tags-editor'));
      },
      'auto-grow-textarea': function (container) {
        container.find('textarea.auto-grow-textarea').each(function () {
          var $this = $(this),
                  minHeight = $this.height(),
                  lineHeight = $this.css('lineHeight');

          var shadow = $('<div></div>').css({
            position: 'absolute',
            top: -10000,
            left: -10000,
            width: $(this).width() - parseInt($this.css('paddingLeft')) - parseInt($this.css('paddingRight')),
            fontSize: $this.css('fontSize'),
            fontFamily: $this.css('fontFamily'),
            lineHeight: $this.css('lineHeight'),
            resize: 'none'
          }).appendTo(document.body);

          var update = function () {

            var times = function (string, number) {
              for (var i = 0, r = ''; i < number; i++) r += string;
              return r;
            };

            var val = this.value.replace(/</g, '&lt;')
                    .replace(/>/g, '&gt;')
                    .replace(/&/g, '&amp;')
                    .replace(/\n$/, '<br/>&nbsp;')
                    .replace(/\n/g, '<br/>')
                    .replace(/ {2,}/g, function (space) {
                      return times('&nbsp;', space.length - 1) + ' '
                    });

            shadow.html(val);
            $(this).css('height', Math.max(shadow.height(), minHeight));

          };

          $(this).change(update).keyup(update).keydown(update);

          update.apply(this);

        });
      },
      'modal-open-default': function (container) {
        container.find('.modal-open-default').modal();
      },
      'sortable-auto-save': function (container) {
        container.find('.sortable-auto-save').sortable({
          stop: function () {
            var form = $(this).closest("form");
            $.ajax({
              url: form.attr('action'),
              type: 'POST',
              data: form.serializeArray()
            });
          }
        });
      },
      'simple-sortable': function (container) {
        container.find('.simple-sortable').sortable();
      },
      'date-picker': function (container) {
        container.find('.date-field').datetimepicker({minView: 2, format: 'mm/dd/yyyy'});
      },
      'time-picker': function (container) {
        container.find('.time-field').datetimepicker({format: 'mm/dd/yyyy HH:ii P'});
      },
      'tiny-mce': function (container) {
        var plugins = container.find('[data-tiny-mce-source-editing]').attr('data-tiny-mce-source-editing') === '1' ? ['code'] : [];

        container.find('.tiny-mce-area').each(function () {
          tinymce.init({selector: '#' + this.id, plugins: plugins, relative_urls: false});
        });
      },
      'append-select-option-to-opener': function (container) {
        if (window.opener == null) {
          return;
        }

        var appended = false;

        container.find('[data-opener-select-id]').each(function () {
          var info = $(this);
          var openerDoc = window.opener.document;
          var select = openerDoc.getElementById(info.attr('data-opener-select-id'));
          var option = openerDoc.createElement('option');
          option.value = info.attr('data-option-value');
          option.innerHTML = info.attr('data-option-name');
          select.appendChild(option);
          option.selected = true;

          appended = true;
        });

        if (appended) {
          window.close();
        }
      },
      'revealed-by-hash': function (container) {
        container.find('.revealed-by-hash').each(function () {
          var target = $(this);
          var id = target.attr('id');

          function revealTarget() {
            target.slideDown();
            $('a.hide-after-target-revealed[href$="#' + id + '"]').hide();
            scrollIntoView(target);
          }

          if (window.location.hash === '#' + id) {
            revealTarget();
          }
          else {
            $('a[href$="#' + id + '"]').click(revealTarget);
          }
        });
      },
      'sudo-admin': function (container) {

        var url = container.find(".sudo-admin").data("admin-url");

        redirect(url, '#redirect-timer', 2);
      },
      'social-auth-widget': function (container) {
        var placeholder = container.find('.social-auth-widget-placeholder');
        if (placeholder.length !== 1) {
          return;
        }

        var placeholderId = placeholder.get(0).id;
        if (!placeholderId) {
          placeholderId = uniqueId();
          placeholder.attr('id', placeholderId);
        }

        if (typeof(window.socialAuth) === 'undefined') {
          window.socialAuth = {};
        }

        socialAuth.placeholderId = placeholderId;

        if (typeof(socialAuth.ready) === 'undefined') {
          var script = document.createElement('script');
          script.type = 'text/javascript';
          script.src = document.location.protocol + '//' + placeholder.attr('data-social-auth-app-domain')
                  + '/javascript/social-auth.js?ts=' + new Date().getTime();
          document.body.appendChild(script);
        } else {
          socialAuth.renderWidget();
        }
      },
      'captcha': function (container) {
        require(["recaptcha"], function () {
          container.find('[data-recaptcha-key]').each(function () {
            var id = uniqueId();
            var recaptcha = $(this);
            var captchatheme = 'custom';
            if(recaptcha.attr('data-recaptcha-theme')) {
              captchatheme = recaptcha.attr('data-recaptcha-theme');
            }
            recaptcha.attr('id', id);
            recaptcha.find('.recaptcha_image').attr('id', 'recaptcha_image');
            Recaptcha.create(recaptcha.attr('data-recaptcha-key'), id, {
              theme: captchatheme,
              lang: recaptcha.attr('data-recaptcha-lang')
            });
          });
        });
      },
      'set-return-url': function () {
        setReturnUrl();
      },
      'rich-dropdown': function (container) {
        container.find('.rich-dropdown').each(function () {
          var select = $(this);
          select.css('width', select.parent().width());
          select.select2();
        });
      },
      'character-counter': function (container) {
        container.find('.character-counter').each(function () {
          var counter = $(this);
          var input = counter.closest('.form-group').find('input[type="text"], textarea');
          var counterId = uniqueId();
          counter.find('span').attr('id', counterId);
          input.NobleCount('#' + counterId, {
            on_negative: 'too-many',
            on_positive: 'more-left',
            max_chars: input.attr('data-maxlength')
          });
        })
      },
      'file-upload-widget': function (container) {
        //*** Notice that the following logic is only for standard file input. It will need modification if the file input is in multiple mode.
        container.find('.fuw-input').keypress(function(e) {
          //Prevent Enter key from submitting the form in IE
          if (e.which == '13') {
            e.preventDefault();
            $(this).click();
          }
        }).focus(function () {
          $(this).parent().addClass('focus-in');
        }).blur(function () {
          $(this).parent().removeClass('focus-in');
        }).each(function () {
          var jqXHR = null;
          var uploadLimit = parseInt($(this).data("upload-limit-mb")) * 1000000;
          if (isNaN(uploadLimit)) {
            uploadLimit = undefined;
          }
          $(this).fileupload({
            dataType: 'json',
            autoUpload: false,
            maxFileSize: uploadLimit, // 10 MB
            minFileSize: undefined // No minimal file size
          }).on('fileuploadprocessalways', function (e, data) {
            var currentFile = data.files[data.index];
            if (data.files.error && currentFile.error) {
              showError(data.fileInput.attr('data-msg-upload-size-limit-exceeded'));
            }
          }).on("fileuploadadd", function (e, data) {
            if (jqXHR !== null) {
              jqXHR.abort();
            }
          }).on("fileuploadprocessdone", function (e, data) {
            withdrawMessage($('.alert-message'), null);
            var widget = $(this).closest('.file-upload-widget');
            widget.closest('form').find('[type="submit"]').prop('disabled', true);
            widget.find('input[type="hidden"]').val('');
            widget.find('.fuw-result').removeClass('fuw-done');
            widget.find('.fuw-info').text(data.fileInput.attr('data-msg-upload-in-progress'));
            widget.find('.fuw-progress').css('width', '100%');

            jqXHR = data.submit();
          }).on("fileuploadprogressall", function (e, data) {
            $(this).closest('.file-upload-widget').find('.fuw-progress').css('width', parseInt(data.loaded / data.total * 100, 10) + '%');
          }).on("fileuploaddone", function (e, data) {
            if (data.result && data.result.responseCode == 1) {
              showError(data.result.responseMsg);
              var widget = $(this).closest('.file-upload-widget');
              widget.closest('form').find('[type="submit"]').prop('disabled', false);
              widget.find('.fuw-info').text('');
              widget.find('.fuw-progress').css('width', 0);
              return;
            }
            var widget = $(this).closest('.file-upload-widget');
            widget.closest('form').find('[type="submit"]').prop('disabled', false);

            var filename = data.files[0].name;
            var tmpFilename = data.result.file.name;

            if (widget.hasClass('multiple')) {
              $('<div class="file-upload-added"><a href="#">x</a>' + filename + '</div>').insertBefore(widget).
                      append('<input type="hidden" name="filename" value="' + tmpFilename + '"/>').find('a').click(function () {
                        $(this).closest('.file-upload-added').remove();
                        return false;
                      });
              widget.find('.fuw-info').text('');
              widget.find('.fuw-progress').css('width', 0);
              return;
            }

            widget.find('input[type="hidden"]').val(tmpFilename);
            widget.find('.fuw-info').text(filename);
            widget.find('.fuw-result').addClass('fuw-done');
          }).on("fileuploadfail", function (e, data) {
            if (data.errorThrown === 'abort') {
              return;
            }

            showError(data.fileInput.attr("data-msg-upload-error-unknown"));

            var widget = $(this).closest('.file-upload-widget');
            widget.closest('form').find('[type="submit"]').prop('disabled', false);
            widget.find('.fuw-info').text('');
            widget.find('.fuw-progress').css('width', 0);
          });
        });
      },
      'sticky-tabs': function (container) {
        container.find('.sticky-tabs').find('.nav-tabs').stickyTabs();
      },
      'geo-enabled': function () {
        if (!navigator.geolocation) {
          return;
        }

        navigator.geolocation.getCurrentPosition(function (position) {
          var data = "latitude=" + position.coords.latitude +
                  "&longitude=" + position.coords.longitude +
                  "&accuracy=" + position.coords.accuracy;

          //firefox returns 0 for altitude and altitudeAccuracy
          if (position.coords.altitude !== null && !isNaN(position.coords.altitude) && position.coords.altitude !== 0) {
            data += "&altitude=" + position.coords.altitude;
          }

          if (position.coords.altitudeAccuracy !== null && !isNaN(position.coords.altitudeAccuracy) && position.coords.altitudeAccuracy !== 0) {
            data += "&altitudeAccuracy=" + position.coords.altitudeAccuracy;
          }

          if (position.coords.heading !== null && !isNaN(position.coords.heading)) {
            data += "&heading=" + position.coords.heading;
          }

          if (position.coords.speed !== null && !isNaN(position.coords.speed)) {
            data += "&speed=" + position.coords.speed;
          }

          $.ajax({
            type: "POST",
            url: "/a/location",
            data: data
          });
        }, function () {
          //ignore errors
        }, { maximumAge: 600000/*, timeout: 3*/ });
      },
      'form-revealer': function (container) {
        container.find('.form-revealer').click(function () {
          var target = $(this);
          target.parent().find('form').removeClass('hidden');
          target.remove();
        });
      },
      'droptabs': function (container) {
        container.find('.droptabs').each(function () {
          var target = $(this);
          target.droptabs({dropdownLabel: target.attr('data-droptabs-dropdown-label')});
        });
      },
      'droptabs-in-tab': function (container) {
        container.find('[data-droptabs-in-tab]').each(function () {
          var droptabs = $(this);

          $('[href="#' + droptabs.closest('.tab-pane').attr('id') + '"]').on('shown.bs.tab', function () {
            droptabs.trigger('shown.droptabs')
          });
        });
      },
      'accessibility': function (container) {
        container.find('.nav-tabs, .nav-pills').find(' > li > a').each(function () {
          var tab = $(this);
          tab.attr('aria-selected', tab.parent().hasClass('active'));
        });

        //Close the dropdown when it looses focus.
        container.find('[data-toggle="dropdown"]').parent().focusout(function () {
          var dropdown = $(this);
          setTimeout(function () {
            if (dropdown.has(document.activeElement).length == 0 && dropdown.is('.open')) {
              dropdown.children('[data-toggle="dropdown"]').dropdown('toggle');
            }
          }, 200);//Need timeout to make document.activeElement return the next focused element. otherwise it would be <body>. 0 would work for most browsers. But for safari, we need a little longer
        });
      },
      'slidable-dropdown': function (container) {
        var $body = $(document.body);
        container.find('.slidable-dropdown').on('show.bs.dropdown', function (e) {
          $body.addClass('shown-slidable-dropdown');
          var dropdown = $(e.target);
          if (dropdown.hasClass('pull-right') || dropdown.parent().hasClass('pull-right')) {
            $body.addClass('shown-slidable-dropdown-right');
          }
          $('<div class="slidable-backdrop"></div>').appendTo(e.target);
        }).on('hide.bs.dropdown', function () {
          $body.removeClass('shown-slidable-dropdown shown-slidable-dropdown-right').addClass('hiding-slidable-dropdown');
          setTimeout(function () {//wait for the transition to complete
            $body.removeClass('hiding-slidable-dropdown');
          }, 300);
          $('.slidable-backdrop').remove();
        });
      },
      'subdomain-checker': function (container) {
        container.find('[data-subdomain-checker-url]').bind('change', function () {
          var field = $(this);
          var form = field.closest('form');
          var original = form.attr('action');
          form.attr('action', '#' + field.attr('data-subdomain-checker-url'));
          sendSmartJsonForm(form);
          form.attr('action', original);
        });
      },
      'checkbox-btn-group': function (container) {
        //We made this feature instead of using bootstrap's data-toggle="buttons" function, because it has a bug:
        //when you press space key, the button's active status is switched, but the checkbox input is not checked/unchecked
        container.find('.checkbox-btn-group').find('input[type="checkbox"]').change(function () {
          $(this).closest('label').toggleClass('active', this.checked);
        }).on('focus blur', function (e) {
          $(this).closest('label').toggleClass('focus', /^focus(in)?$/.test(e.type));
        });
      },
      'fetch-content-on-page-load': function (container) {
        container.find("[data-fetched-content-holder-id]").each(function () {
          var trigger = $(this);
          var contentHolder = $("#" + $(this).data("fetched-content-holder-id"));
          var url = $(this).data("fetch-content-url");
          var loadingIcon = "#" + $(this).data("fetching-content-icon-id");


          $.ajax({
            type: 'GET',
            cache: false,
            url: url,
            success: function (response) {
              if ($(loadingIcon)) {
                $(loadingIcon).hide();
              }

              var customHandler = trigger.attr('data-fetched-content-response-handler');
              if(customHandler != undefined) {
                options.customAjaxLinkHandler[customHandler](trigger, response);
              } else {
                contentHolder.html(response).initializeFeatures();
                $(contentHolder).initializeFeatures();
              }
            },
            error: function () {
              alert('Oops, something went wrong!\nPlease refresh the page and try again.');
            }
          });
        });
      }
    },
    eventListeners: {
      'load-stage-config-form': function () {
        var element = $(this);
        if(element.is(":disabled") || parseInt($('#functionId').val()) == parseInt($('#stage-configuration-container').data("configuration-for"))) {
          return;
        }
        $('#stage-configuration-container').data("configuration-for", element.val());
        $('#stage-configuration-container').html('');
        var url = element.data("config-form-url") + element.val();
        $.get(url, function (data) {
          $('#stage-configuration-container').html(data).initializeFeatures();
        });
      },
      'load-feed-config-form': function (event) {
        var element = $(this);
        if(element.is(":disabled") || parseInt($('#sourceTypeID').val()) == parseInt($('#feed-configuration-container').data("configuration-for"))) {
          return;
        }
        $('#feed-configuration-container').data("configuration-for", element.val());
        $('#feed-configuration-container').html('');
        var url = element.data("config-form-url") + element.val();
        $.get(url, function (data) {
          $('#feed-configuration-container').html(data).initializeFeatures();
        });
      },
      'observe-fund-input': function (event) {

        if(event.type == "focus") {
          var input = $(this);
            globalVariablesObj["observerMemberFund"] = setInterval(function () {
            observeFundForm (input);
          }, 500);
        } else {
          clearInterval(globalVariablesObj["observerMemberFund"]);
        }

        function observeFundForm(input) {
          var submitButton = $("#"+input.data("target-id"));
          if(input.data("is-popover") != undefined){
            var triggerId = input.data("trigger-id")
            var contextId = $("#"+triggerId).attr("aria-describedby");
            submitButton = $("#"+input.data("target-id"), $("#"+ contextId));
          }

          if(isValidateInput(input.val())) {
            submitButton.removeAttr('disabled');
          } else {
            submitButton.attr('disabled','disabled');
          }
        }

        function isValidateInput(inputValue) {
          var decimalRegex = /(?=.)^\$?([0-9]+)?(\.*[0-9]{1,2})?$/i;
          if (inputValue.length == 0 || inputValue.match(decimalRegex) == null) {
            return false;
          } else {
            return (inputValue > 0) ? true : false;
          }
        }
      },
      'check-estimate-form': function (event) {
        if(event.type == "focus") {
          var form = $(this).parents("form");
          globalVariablesObj["observe"] = setInterval(function () {
            observeEstimateForm (form);
            }, 100);
        } else {
          clearInterval(globalVariablesObj["observe"]);
        }

        function observeEstimateForm (form) {
          validateEstimateForm(form);
          if (hasError(form) || !isComplete(form)) {
            form.find("#estimate-finish button").attr('disabled','disabled');
          } else {
            form.find("#estimate-finish button").removeAttr('disabled');
          }
        }

        function isComplete(form) {
          var siblings = form.find("input[type='text']");
          for (var i = 0; i < siblings.length; i++) {
            if ($(siblings[i]).val().length == 0) {
              return false;
            }
          }
          return true;
        }

        function hasError(form) {
          return form.find(".has-error").length > 0
        }
        function inputHasError(inputField) {
          return inputField.parents(".form-group").hasClass('has-error')
        }

        function validateEstimateForm(form) {
          var highCostEstimate = form.find("input[name='highCostEstimate']");
          var mediumCostEstimate = form.find("input[name='mediumCostEstimate']");
          var lowCostEstimate = form.find("input[name='lowCostEstimate']");
          var highValueEstimate = form.find("input[name='highValueEstimate']");
          var mediumValueEstimate = form.find("input[name='mediumValueEstimate']");
          var lowValueEstimate = form.find("input[name='lowValueEstimate']");

          validateDataType(highCostEstimate);
          validateDataType(mediumCostEstimate);
          validateDataType(lowCostEstimate);
          validateDataType(highValueEstimate);
          validateDataType(mediumValueEstimate);
          validateDataType(lowValueEstimate);

          if (!inputHasError(mediumCostEstimate)) {
            validateHighAndLowValue(highCostEstimate, mediumCostEstimate);
          }

          if (!inputHasError(lowCostEstimate)) {
            validateHighAndLowValue(mediumCostEstimate, lowCostEstimate);
          }

          if (!inputHasError(mediumValueEstimate)) {
            validateHighAndLowValue(highValueEstimate, mediumValueEstimate);
          }

          if (!inputHasError(lowValueEstimate)) {
            validateHighAndLowValue(mediumValueEstimate, lowValueEstimate);
          }
        }

        function validateHighAndLowValue(highValueInputElement, lowValueInputElement) {
          if (parseFloat(highValueInputElement.val()) < parseFloat(lowValueInputElement.val())) {
            addErrorClass(lowValueInputElement);
          } else {
            removeErrorClass(lowValueInputElement);
          }
        }

        function validateDataType(inputElement) {
          var decimalRegex = /(?=.)^\$?([0-9]+)?(\.[0-9]{1,2})?$/i;
          if (inputElement.val().length > 0 && inputElement.val().match(decimalRegex) == null) {
            addErrorClass(inputElement);
          } else {
            removeErrorClass(inputElement);
          }
        }

        function addErrorClass(inputElement) {
          inputElement.parents(".form-group").addClass("has-error");
        }

        function removeErrorClass(inputElement) {
          if (inputElement.parents(".form-group").hasClass("has-error")) {
            inputElement.parents(".form-group").removeClass("has-error");
          }
        }
      },

      'filter-number-key': function (event) {
        if ((event.which != 46 || $(this).val().indexOf('.') != -1) && (event.which < 48 || event.which > 57)) {
          if (event.keyCode !== 8 && event.keyCode !== 46 && event.keyCode !== 9){
            event.preventDefault();
          }
        }

        var text = $(this).val();

        if ((text.indexOf('.') != -1) && (text.substring(text.indexOf('.')).length > 2)) {
          if (event.keyCode !== 8 && event.keyCode !== 46 ){
            event.preventDefault();
          }
        }
      }
    },
    collapseExpandHandlers: {
      'single-list': function (trigger) {
        var target = $('#' + trigger.attr('data-target-id'));
        target.stop(true, true);

        if (target.hasClass('collapsed')) {
          target.slideDown(function () {
            target.removeClass('collapsed');
          });
        }
        else {
          target.slideUp(function () {
            target.addClass('collapsed');
          });
        }
      }
    },

    popoverEventHandlers: {},
    clickListeners: {
      'set-return-url': function () {
        setReturnUrl();
      }
    }
  }, options);

  function redirect(url, selector, inseconds) {
    if (inseconds > 0) {
      $(selector).empty();
      $(selector).append(inseconds);
      setTimeout(function () {
        redirect(url, selector, inseconds - 1);
      }, 1000);

      return;
    }

    window.location = url;
  }

  this.redirect = redirect;

  function replaceParams(string, replacements) {
    return string.replace(/\{(\d+)\}/g, function() {
      return replacements[arguments[1]];
    });

    String.format.apply(string, replacements);
  }

  function enableTagEditorCommon(autoCompleteUrl, tagEditor) {
    var ajaxCall = {
      url: autoCompleteUrl,
      type: 'GET',
      params: {
        contentType: 'application/json; charset=utf-8'
      },
      dataType: 'json',
      data: function (term, page) { // page is the one-based page number tracked by Select2
        return {
          term: term, //search term,
          campaignId: tagEditor.closest('form').find('[name="discussionID"]').val()
        };
      },
      results: function (data) {
        var tags = [];
        for (var x = 0; x < data.length; x++) {
          tags.push({id: data[x].value, text: data[x].value});
        }
        return {results: JSON.parse(JSON.stringify(tags))};
      }
    };

    tagEditor.select2({
      multiple: true, tags: true, minimumInputLength: 2, tokenSeparators: [",", " "], createSearchChoice: function (term, data) {
        if ($(data).filter(function () {
          return this.text.localeCompare(term) === 0;
        }).length === 0) {
          return {
            id: term,
            text: term
          };
        }
      }, placeholder: (tagEditor.attr("data-add-tags-msg") ? tagEditor.attr("data-add-tags-msg") : "Add Tags"), closeOnSelect: false, width: "100%", ajax: ajaxCall,

      formatNoMatches: function () {
        return tagEditor.attr("data-format-no-matches-msg");
      },

      formatInputTooShort: function (input, min) {
        var msg = tagEditor.attr("data-format-input-too-short-msg");
        msg = msg ? msg : "";
        var n = min - input.length;
        var args = [n];
        return replaceParams(msg, args);
      },
      formatInputTooLong: function (input, max) {
        var msg = tagEditor.attr("data-format-input-too-long-msg");
        msg = msg ? msg : "";
        var n = input.length - max;
        var args = [n];
        return replaceParams(msg, args);
      },
      formatSelectionTooBig: function (limit) {
        var msg = tagEditor.attr("data-format-selection-too-big-msg");
        msg = msg ? msg : "";
        var args = [limit];
        replaceParams(msg, args);
      },
      formatLoadMore: function (pageNumber) {
        return tagEditor.attr("data-format-load-more-msg");
      },
      formatSearching: function () {
        return tagEditor.attr("data-format-searching-msg");
      }

    });

    tagEditor.on("change", function(){
      tagEditor.select2("search","");
    });

    if (tagEditor.val()) {
      var data = tagEditor.val().split(',');
      var tags = [];
      for (var x = 0; x < data.length; x++) {
        tags.push({id: data[x], text: data[x]});
      }
      tagEditor.select2("data", JSON.parse(JSON.stringify(tags)));
    }
  }

  this.enableTagEditorCommon = enableTagEditorCommon;

  function enableTagEditor(tagEditor) {
    enableTagEditorCommon("/a/idea/tag/autocomplete", tagEditor);
  }

  function enablePredefinedTagEditor(tagEditor, hybridTagEnabled) {
    var isHybridTagEnabled = (hybridTagEnabled === "true" || hybridTagEnabled);
    var ajaxCall = {
      url: "/a/idea/predefinedTag/autocomplete",
      type: 'GET',
      params: {
        contentType: 'application/json; charset=utf-8'
      },
      dataType: 'json',
      data: function (term, page) { // page is the one-based page number tracked by Select2
        return {
          term: term, //search term,
          selectedTags: JSON.stringify(tagEditor.select2("val")),
          campaignId: tagEditor.closest('form').find('[name="discussionID"]').val()
        };
      },
      results: function (data) {
        var tags = [];
        for (var x = 0; x < data.length; x++) {
          tags.push({id: data[x].value, text: data[x].value});
        }
        return {results: JSON.parse(JSON.stringify(tags))};
      }
    };

    if (isHybridTagEnabled == true) {
      tagEditor.select2({
        multiple: true, tags: true, tokenSeparators: [",", " "], createSearchChoice: function (term, data) {
          if ($(data).filter(function () {
            return this.text.localeCompare(term) === 0;
          }).length === 0) {
            return {
              id: term,
              text: term
            };
          }
        }, placeholder: (tagEditor.attr("data-add-tags-msg") ? tagEditor.attr("data-add-tags-msg") : "Select Predefined Tags"), closeOnSelect: false, width: "100%", ajax: ajaxCall,
        formatNoMatches: function () {
          return tagEditor.attr("data-format-no-matches-msg");
        },

        formatInputTooShort: function (input, min) {
          var msg = tagEditor.attr("data-format-input-too-short-msg");
          msg = msg ? msg : "";
          var n = min - input.length;
          var args = [n];
          return replaceParams(msg, args);
        },
        formatInputTooLong: function (input, max) {
          var msg = tagEditor.attr("data-format-input-too-long-msg");
          msg = msg ? msg : "";
          var n = input.length - max;
          var args = [n];
          return replaceParams(msg, args);
        },
        formatSelectionTooBig: function (limit) {
          var msg = tagEditor.attr("data-format-selection-too-big-msg");
          msg = msg ? msg : "";
          var args = [limit];
          replaceParams(msg, args);
        },
        formatLoadMore: function (pageNumber) {
          return tagEditor.attr("data-format-load-more-msg");
        },
        formatSearching: function () {
          return tagEditor.attr("data-format-searching-msg");
        }
      });
    } else {
      tagEditor.select2({
        multiple: true, placeholder: (tagEditor.attr("data-add-tags-msg") ? tagEditor.attr("data-add-tags-msg") : "Select Predefined Tags"), closeOnSelect: false, width: "100%", ajax: ajaxCall,
        formatNoMatches: function () {
          return tagEditor.attr("data-format-no-matches-msg");
        },

        formatInputTooShort: function (input, min) {
          var msg = tagEditor.attr("data-format-input-too-short-msg");
          msg = msg ? msg : "";
          var n = min - input.length;
          var args = [n];
          return replaceParams(msg, args);
        },
        formatInputTooLong: function (input, max) {
          var msg = tagEditor.attr("data-format-input-too-long-msg");
          msg = msg ? msg : "";
          var n = input.length - max;
          var args = [n];
          return replaceParams(msg, args);
        },
        formatSelectionTooBig: function (limit) {
          var msg = tagEditor.attr("data-format-selection-too-big-msg");
          msg = msg ? msg : "";
          var args = [limit];
          replaceParams(msg, args);
        },
        formatLoadMore: function (pageNumber) {
          return tagEditor.attr("data-format-load-more-msg");
        },
        formatSearching: function () {
          return tagEditor.attr("data-format-searching-msg");
        }
      });
    }

    tagEditor.on("change", function () {
      tagEditor.select2("search", "");
    });

    if (tagEditor.val()) {
      var data = tagEditor.val().split(',');
      var tags = [];
      for (var x = 0; x < data.length; x++) {
        tags.push({id: data[x], text: data[x]});
      }
      tagEditor.select2("data", JSON.parse(JSON.stringify(tags)));
    }
  }

  function enableModeratorTagEditor(tagEditor) {
    var ajaxCall = {
      url: "/a/idea/moderator/tags/autocomplete",
      type: 'GET',
      params: {
        contentType: 'application/json; charset=utf-8'
      },
      dataType: 'json',
      data: function (term, page) { // page is the one-based page number tracked by Select2
        return {
          term: term, //search term,
          selectedTags: JSON.stringify(tagEditor.select2("val")),
          campaignId: tagEditor.closest('form').find('[name="discussionID"]').val()
        };
      },
      results: function (data) {
        var tags = [];
        for (var x = 0; x < data.length; x++) {
          tags.push({id: data[x].value, text: data[x].value});
        }
        return {results: JSON.parse(JSON.stringify(tags))};
      }
    };

    tagEditor.select2({
      multiple: true, placeholder: (tagEditor.attr("data-add-tags-msg") ? tagEditor.attr("data-add-tags-msg") : "Select Moderator Tags"), closeOnSelect: false, width: "100%", ajax: ajaxCall,
      formatNoMatches: function () {
        return tagEditor.attr("data-format-no-matches-msg");
      },

      formatInputTooShort: function (input, min) {
        var msg = tagEditor.attr("data-format-input-too-short-msg");
        msg = msg ? msg : "";
        var n = min - input.length;
        var args = [n];
        return replaceParams(msg, args);
      },
      formatInputTooLong: function (input, max) {
        var msg = tagEditor.attr("data-format-input-too-long-msg");
        msg = msg ? msg : "";
        var n = input.length - max;
        var args = [n];
        return replaceParams(msg, args);
      },
      formatSelectionTooBig: function (limit) {
        var msg = tagEditor.attr("data-format-selection-too-big-msg");
        msg = msg ? msg : "";
        var args = [limit];
        replaceParams(msg, args);
      },
      formatLoadMore: function (pageNumber) {
        return tagEditor.attr("data-format-load-more-msg");
      },
      formatSearching: function () {
        return tagEditor.attr("data-format-searching-msg");
      }
    });

    tagEditor.on("change", function(){
      tagEditor.select2("search","");
    });

    if (tagEditor.val()) {
      var data = tagEditor.val().split(',');
      var tags = [];
      for (var x = 0; x < data.length; x++) {
        tags.push({id: data[x], text: data[x]});
      }
      tagEditor.select2("data", JSON.parse(JSON.stringify(tags)));
    }
  }


  function reloadPage() {
    window.location.reload();
  }

  this.reloadPage = reloadPage;

  this.scrollAndFocus = function (scrollTarget, focusTarget) {
    scrollIntoView(scrollTarget, function () {
      focusTarget.focus();
    });
  };

  function notifyChange(container) {
    var changedItem = $(container).find('[role="alert"]');
    scrollIntoView(changedItem, function () {
      highlightChange(changedItem.removeAttr('role'));
    });
  }

  this.notifyChange = notifyChange;

  function highlightChange(target) {
    target.effect('highlight', 500);
  }

  this.highlightChange = highlightChange;

  function openWindow(url, width, height) {
    var screenX = typeof window.screenX != 'undefined' ? window.screenX : window.screenLeft,
            screenY = typeof window.screenY != 'undefined' ? window.screenY : window.screenTop,
            outerWidth = typeof window.outerWidth != 'undefined' ? window.outerWidth : document.body.clientWidth,
            outerHeight = typeof window.outerHeight != 'undefined' ? window.outerHeight : (document.body.clientHeight - 22),
            left = parseInt(screenX + ((outerWidth - width) / 2), 10),
            top = parseInt(screenY + ((outerHeight - height) / 2.5), 10),
            features = (
                    'width=' + width + ',height=' + height + ',left=' + left + ',top=' + top
                    );

    window.open(url, '_blank', features);
  }

  this.openWindow = openWindow;

  function unique(arr) {
    var hash = {}, result = [];
    for (var i = 0, l = arr.length; i < l; ++i) {
      if (!hash.hasOwnProperty(arr[i])) {
        hash[ arr[i] ] = true;
        result.push(arr[i]);
      }
    }
    return result;
  }

  function scrollIntoView(object, callback) {
    if (object.length === 0) {
      return;
    }

    $('html,body').animate({scrollTop: object.first().offset().top - $(window).height() / 2}, 'slow', callback);
  }

  function scrollFocus(target) {
    scrollIntoView(target, function () {
      target.focus()
    });
  }

  this.scrollIntoView = scrollIntoView;

  function disableSubmitButton(form) {
    setTimeout(function () {
      form.find('[type="submit"], .submit[type="button"]').attr('disabled', 'disabled').addClass('awaiting-response');
    }, 0);
  }
  this.disableSubmitButton = disableSubmitButton;

  function markAsChanged(target) {
    target.attr("role", "alert");
    setTimeout(function () {
      target.removeAttr("role");
    }, 0);
  }

  this.markAsChanged = markAsChanged;

  function formatMessage(message) {
    options.alertMsgFilter(message);

    var result = '<button type="button" class="close close-alert-message" aria-label="' +
            escapeForAttr($(document.body).attr('data-msg-dismiss-alert')) + '">&times;</button>';

    result += message.text;

    var action = message.action;
    if (action) {
      result += "&nbsp;<a href=\"" + action.url + "\"";
      if (action.title) {
        result += " title=\"" + action.title + '"';
      }
      if (action.actionClass) {
        result += ' class="' + action.actionClass + '"';
      }
      var actionAttrs = action.actionAttrs;
      if (actionAttrs) {
        for (var key in actionAttrs) {
          result += ' ' + key + '="' + actionAttrs[key] + '"';
        }
      }

      result += ">" + action.text + "</a>";
    }

    return result;
  }

  var ALERT_ANIMATION_SPEED = 200;
  var ALERT_ORIGINAL_STATE = {opacity: 0, top: '0px'};
  var ALERT_POPPED_UP_FLAG = 'alert-popped-up';

  function popupMessage(target) {
    target.addClass(ALERT_POPPED_UP_FLAG);
    target.css(ALERT_ORIGINAL_STATE);
    var top = options.alertMsgTop;
    if ($.isFunction(top)) {
      top = top();
    }
    target.animate({opacity: 1, top: top}, ALERT_ANIMATION_SPEED);

    markAsChanged(target);

    document.documentElement.focus();//fix for IE9

    target.focus();
  }

  function withdrawMessage(target, callback) {
    target.animate(ALERT_ORIGINAL_STATE, ALERT_ANIMATION_SPEED, function () {
      target.removeClass(ALERT_POPPED_UP_FLAG).addClass('hidden');
      if (callback) {
        callback();
      }
    });
  }

  this.withdrawMessage = withdrawMessage;

  function inform(message) {
    var msgBoard = $('.alert-message');

    function doInform() {
      msgBoard.empty().
              css(ALERT_ORIGINAL_STATE).
              append(formatMessage(message)).
              removeClass('hidden alert-success alert-warning alert-danger').
              addClass('alert-' + message.typeBS3);

      msgBoard.initializeFeatures();
    }

    if (msgBoard.hasClass(ALERT_POPPED_UP_FLAG)) {
      withdrawMessage(msgBoard, doInform);
    } else {
      doInform();
    }
  }

  this.inform = inform;

  function showMessage(text, cssClass) {
    inform({text: text, typeBS3: cssClass});
  }

  function showError(msg) {
    showMessage(msg, "danger");
  }
  this.showError = showError;

  function showWarning(msg) {
    showMessage(msg, "warning");
  }

  this.showWarning = showWarning;

  function showSuccess(msg) {
    showMessage(msg, "success");
  }
  this.showSuccess = showSuccess;

  function clearValidationErrors(form) {
    form.find(".form-group, .switch-group").removeClass('has-error');
    form.find("[data-role='field-error']").remove();
  }
  this.clearValidationErrors = clearValidationErrors;

  function goToFirstFieldWithError(container) {
    var firstFieldContain = container.find('.has-error:first');

    if (firstFieldContain.length === 0) {
      return;
    }

    function focusField() {
      scrollFocus(firstFieldContain.find('label:first'));
    }

    if (firstFieldContain.hasClass('reloaded-after-submission')) {
      firstFieldContain.addClass('awaiting-reload');
      var focusOnReload = function () {
        if (firstFieldContain.hasClass('awaiting-reload')) {
          setTimeout(focusOnReload, 200);
          return;
        }

        focusField();//Only focus after the field is reloaded, otherwise the screen reader would read the old stuff
      };
      setTimeout(focusOnReload, 200);
    } else {
      focusField();
    }
  }

  function handleValidationErrors(form, errors) {
    clearValidationErrors(form);
    var isHorizontal = form.hasClass('form-horizontal');

    for (var i = 0; i < errors.length; i++) {
      var error = errors[i];
      var field = form.find("[name='" + error.property + "']");
      var fieldContainer = field.closest(".form-group, .switch-group").addClass('has-error');
      var errorContainer = fieldContainer;

      if (isHorizontal && !fieldContainer.hasClass('switch-group')) {
        var parent = field.parent();

        while (parent.get(0) !== fieldContainer.get(0)) {
          var nextParent = parent.parent();

          if (nextParent.get(0) === fieldContainer.get(0) && parent.attr('class').indexOf('col-') === 0) {
            errorContainer = parent;
            break;
          }

          parent = nextParent;
        }
      }

      for (var j = 0; j < error.messages.length; j++) {
        var message = error.messages[j];
        errorContainer.append('<span data-role="field-error" class="help-block" role="alert"><span class="glyphicon glyphicon-info-sign" aria-hidden="true"></span> ' + message + '</span>');
      }
    }

    goToFirstFieldWithError(form);
  }

  this.handleValidationErrors = handleValidationErrors;

  function sendSmartJsonForm(form) {
    if (form.attr('on-hold')) {
      return false;
    }

    var confirmMsg = form.attr('data-confirm');
    if (confirmMsg && !confirm(confirmMsg)) {
      return false;
    }

    form.attr('on-hold', true);

    function reEnable() {
      form.removeAttr('on-hold');
    }

    $.ajax({
      type: form.attr('method').toUpperCase(),
      url: getActionUrl(form),
      data: form.serialize(),
      success: function (json) {
        var mathCaptcha = form.find('[data-math-captcha-reload-url]');
        if (mathCaptcha.length > 0) {
          mathCaptcha.each(function () {
            var label = $(this);

            setTimeout(function () {
              label.load(label.attr('data-math-captcha-reload-url'), { 'dummy': 1 }, function () {
                label.closest(".form-group, .switch-group").removeClass('awaiting-reload').find('input').val('');
              });
            }, 100);
          });
        }

        if (typeof(Recaptcha) !== "undefined") {
          try {
            if (Recaptcha.get_challenge() && form.find('.captcha').length > 0) {
              Recaptcha.reload_internal('t');//pass 't' to prevent Recaptcha from messing with the focus
            }
          } catch (ignored) {
          }
        }

        var data = json.data;

        if (json.type === 'errors') {
          handleValidationErrors(form, data.errors);
          reEnable();
          return;
        }

        clearValidationErrors(form);

        var customHandler = form.attr('data-json-handler-' + json.type);
        if (customHandler !== undefined) {
          try {
            if (options.jsonResponseHandlers[customHandler](form, json) !== false) {
              //Returning false from the jsonResponseHandler would prevent auto re-enabling.
              //This is useful if there are ajax requests made in the handler, or the disabled UI elements have been removed from DOM
              //If we do this, it will be the handler's responsibility to re-enable the UI elements, if necessary
              reEnable();
            }
          } catch (ex) {
            if (typeof(isDevEnv) !== 'undefined') {
              alert(ex);
            }

            throw ex;
          }

          return;
        }

        if (json.type === 'redirect') {
          window.location = data.url;
          return;
        }

        if (json.type === 'reload') {
          reloadPage();
          return;
        }

        reEnable();

        handleGenericJSONResponse(json);
      },
      error: function (request, textStatus) {
        reEnable();

        handleAjaxError(textStatus);
      }
    });

    return false;
  }

  this.sendSmartJsonForm = sendSmartJsonForm;

  //we can use # as url url prefix to make sure that the form can only be processed when javascript is enabled
  function getActionUrl(target) {
    var actionUrl = target.attr('data-action-url');

    if (!actionUrl) {
      switch (target.get(0).tagName.toLowerCase()) {
        case 'form':
          actionUrl = target.attr('action');
          if (actionUrl) {
            break;
          }

          actionUrl = window.location.href;
          break;
        case 'a':
          actionUrl = target.attr('href');
          break;
        default:
          break;
      }
    }

    return actionUrl.charAt(0) === '#' ? actionUrl.substring(1) : actionUrl;
  }

  this.getActionUrl = getActionUrl;

  function handleGenericJSONResponse(json) {
    if (!json.data) {
      return;
    }

    var data = json.data;

    if (json.type === 'redirect') {
      window.location = data.url;
      return;
    }

    if (data.message) {
      inform(data.message);
    }
    else if (data.text) {
      inform(data);
    }
  }

  this.handleGenericJSONResponse = handleGenericJSONResponse;

  function handleAjaxError(textStatus) {
    inform({ text: "Unable to perform request (" + textStatus + ")", typeBS3: 'danger' });
  }

  this.handleAjaxError = handleAjaxError;

  $.fn.initializeFeatures = function () {
    var containerFeatures = this.attr('data-features');

    //We aggregate all features to avoid duplication initialization. The price is that all featureInitialization functions will be called on the outermost DOM element (the element on which initializeFeatures is called) instead the ones on which data-features attribute is declared.
    //We trade it for code maintainability. Besides, it might even be faster than having to check and exclude features already initialized on the ancestor nodes
    var allFeatures = containerFeatures === undefined ? '' : containerFeatures;

    this.find('[data-features]').each(function () {
      allFeatures += ' ' + $(this).attr('data-features');
    });

    allFeatures = $.trim(allFeatures + ' alert-message json-link accessibility slidable-dropdown').replace(/\s{2,}/g, ' ');//alert-message and json-link are default features

    var featureArray = unique(allFeatures.split(' '));

    for (var i = 0, len = featureArray.length; i < len; ++i) {
      var feature = featureArray[i];
      try {
        options.featureInitializations[feature](this);
      } catch (ex) {
        if (typeof(isDevEnv) !== 'undefined') {
          alert(feature + ': ' + ex);
        }

        throw ex;
      }
    }

    return this;
  };

  this.initialize = function () {
    $(function () {
      $(document.documentElement).initializeFeatures();

      $(document).click(function (e) {
        var target = e.target;
        if (target.tagName.toUpperCase() !== 'A') {
          return;
        }

        var $target = $(target);
        var listener = $target.attr('data-click-listener');
        if (!listener) {
          return;
        }

        options.clickListeners[listener]($target);
      });
    });
  };

  window.validateUSZip = function (url, field) {//todo-pp-v3 refactor to remove this global function
    $('input[name=' + field.name + ']').siblings('select[name=' + field.name + '_district]').detach();
    if (field.value.length != 5) {
      return;
    }

    $.ajax({
      field: field,
      type: "GET",
      url: url + field.value,
      success: function (msg) {
        $('input[name=' + field.name + ']').after(msg);
      },
      error: function () {
        showWarning(getMsgOops());
      }
    });
  };

  /**
   * jQuery Plugin: Sticky Tabs
   *
   * @author Aidan Lister <aidan@php.net>
   * @version 1.0.1
   */
  (function ($) {
    $.fn.stickyTabs = function () {
      var context = this;

      // Show the tab corresponding with the hash in the URL, or the first tab.
      var showTabFromHash = function () {
        var hash = window.location.hash;
        var tab = $(hash ? 'a[href="' + hash + '"]' : 'li.active > a', context);
        tab.tab('show');

        if (hash) {
          scrollIntoView(tab);
        }
      };

      // Set the correct tab when the page loads
      showTabFromHash(context);

      // Set the correct tab when a user uses their back/forward button
      $(window).bind('hashchange', showTabFromHash);

      // Change the URL when tabs are clicked

      if (typeof(history.pushState) !== 'undefined') {
        $('a', context).on('click', function () {
          history.pushState(null, null, this.href);
        });
      }

      return this;
    };
  }(jQuery));
}



/**
 * Cookie plugin
 *
 * Copyright (c) 2006 Klaus Hartl (stilbuero.de)
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 */

/**
 * Create a cookie with the given name and value and other optional parameters.
 *
 * @example $.cookie('the_cookie', 'the_value');
 * @desc Set the value of a cookie.
 * @example $.cookie('the_cookie', 'the_value', { expires: 7, path: '/', domain: 'jquery.com', secure: true });
 * @desc Create a cookie with all available options.
 * @example $.cookie('the_cookie', 'the_value');
 * @desc Create a session cookie.
 * @example $.cookie('the_cookie', null);
 * @desc Delete a cookie by passing null as value. Keep in mind that you have to use the same path and domain
 *       used when the cookie was set.
 *
 * @param String name The name of the cookie.
 * @param String value The value of the cookie.
 * @param Object options An object literal containing key/value pairs to provide optional cookie attributes.
 * @option Number|Date expires Either an integer specifying the expiration date from now on in days or a Date object.
 *                             If a negative value is specified (e.g. a date in the past), the cookie will be deleted.
 *                             If set to null or omitted, the cookie will be a session cookie and will not be retained
 *                             when the the browser exits.
 * @option String path The value of the path atribute of the cookie (default: path of page that created the cookie).
 * @option String domain The value of the domain attribute of the cookie (default: domain of page that created the cookie).
 * @option Boolean secure If true, the secure attribute of the cookie will be set and the cookie transmission will
 *                        require a secure protocol (like HTTPS).
 * @type undefined
 *
 * @name $.cookie
 * @cat Plugins/Cookie
 * @author Klaus Hartl/klaus.hartl@stilbuero.de
 */

/**
 * Get the value of a cookie with the given name.
 *
 * @example $.cookie('the_cookie');
 * @desc Get the value of a cookie.
 *
 * @param String name The name of the cookie.
 * @return The value of the cookie.
 * @type String
 *
 * @name $.cookie
 * @cat Plugins/Cookie
 * @author Klaus Hartl/klaus.hartl@stilbuero.de
 */
jQuery.cookie = function (name, value, options) {
  if (typeof value != 'undefined') { // name and value given, set cookie
    options = options || {};
    if (value === null) {
      value = '';
      options.expires = -1;
    }
    var expires = '';
    if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
      var date;
      if (typeof options.expires == 'number') {
        date = new Date();
        date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
      } else {
        date = options.expires;
      }
      expires = '; expires=' + date.toUTCString(); // use expires attribute, max-age is not supported by IE
    }
    // CAUTION: Needed to parenthesize options.path and options.domain
    // in the following expressions, otherwise they evaluate to undefined
    // in the packed version for some reason...
    var path = options.path ? '; path=' + (options.path) : '';
    var domain = options.domain ? '; domain=' + (options.domain) : '';
    var secure = options.secure ? '; secure' : '';
    document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
  } else { // only name given, get cookie
    var cookieValue = null;
    if (document.cookie && document.cookie != '') {
      var cookies = document.cookie.split(';');
      for (var i = 0; i < cookies.length; i++) {
        var cookie = jQuery.trim(cookies[i]);
        // Does this cookie string begin with the name we want?
        if (cookie.substring(0, name.length + 1) == (name + '=')) {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  }
};