if (top !== self) {
  top.location = document.location;
}

(function (window, document, undefined) {
  function updateIdeaStage(ideas, stage) {
    var headerStageElement = ideas.children('header').find('.idea-stage');

    headerStageElement.removeClass()
            .addClass('idea-stage')
            .addClass(stage.cssClass)
            .attr('title', stage.name)
            .find('em').html(stage.shortName);
    if(stage.stageOrderCssClass) {
      headerStageElement.addClass(stage.stageOrderCssClass);
    }
  }

  var controller = new IdeaScaleController(window, document, undefined, {
    alertMsgTop: function () {
      return $('#universal-top-bar').outerHeight() + 'px';
    },
    actionInterceptors: {
      'comment-form': function (trigger) {
        var form = trigger.closest('li').children('.comment-form');
        if (form.length === 0) {
          return true;
        }

        focusCommentForm(form);
        return false;
      },
      'attachment-form': function (trigger) {
        var form = trigger.closest('li').children('.attachment-form');
        if (form.length === 0) {
          return true;
        }

        focusAttachmentForm(form);
        return false;
      }
    },
    jsonResponseHandlers: {
      'visitor-joined': function () {
        controller.reloadPage();
      },
      'anonymous-joined': function () {
        window.location = $('#community-login-link').attr('href');
      },
      'update-container': function (trigger, json) {
        var old = trigger.closest('div');
        old.after(json.data.html);
        var updated = old.next();
        old.remove();

        updated.initializeFeatures();
      },
      'idea-form-redirect': function (form, json) {
        if (form.hasClass('form-state')) {
          form.sisyphus({ action: 'release' });
        }
        window.location = json.data.url;
        return false;
      },
      'author-banned': function (trigger, json) {
        controller.inform(json.data);

        $([trigger.parent(), trigger.parent().siblings('.idea-action-email-author')]).fadeOut(600, function () {
          $(this).remove();
        });
      },
      'idea-voted': function (trigger, json) {
        gaTrack(trigger);

        var old = trigger.closest('.stage-details');
        old.after(json.data.html);
        var updated = old.next();
        old.remove();

        updated.initializeFeatures();

        var scoreBars = updated.find('.up-down-votes > div');

        if (scoreBars.length === 0) {
          updated.find('.vote-number').pulse(
                  {opacity: [0, 1]},
                  {
                    times: 2,
                    duration: 125,
                    complete: function () {
                      removeFilterForIE($(this));
                    }
                  });
        }
        else {
          scoreBars.each(function () {
            var bar = $(this);
            var oldBar = old.find('.up-down-votes > div.' + (bar.hasClass('up-votes') ? 'up-votes' : 'down-votes'));

            var width = bar.css('width');
            bar.css('width', oldBar.css('width')).animate({ width: width }, 'fast');
          });
        }

        controller.markAsChanged(updated);
        updated.find('.vote-number').focus();

        var voteActivities = $('[data-vote-activities-action]');
        if (voteActivities.length > 0) {
          voteActivities.load(voteActivities.attr("data-vote-activities-action"), {},
                  function (responseText, textStatus) {
                    if (textStatus !== 'success') {
                      return;
                    }

                    $(this).initializeFeatures();
                  });
        }

        return false;
      },
      'comment-posted': function (form, json) {
        gaTrack(form);

        var newList = $($.trim(json.data.html));
        var item = newList.find('li');
        var existingList;

        var formContainer = form.closest('.comment-form');
        var isTrackerChecked = form.find("input[name = 'addTracker']").prop("checked");
        if (newList.find('ol').hasClass('child-comments')) {
          var commentItem = formContainer.closest('li');
          existingList = commentItem.find('.child-comments');

          if (existingList.length === 1) {
            item.appendTo(existingList);
          }
          else {
            newList.appendTo(commentItem.find('.comment'));
          }
          form.parents("section[id='idea-tab-comments']").children("div[class='comment-form']").find("input[name = 'addTracker']").prop("checked", isTrackerChecked);
          formContainer.remove();
        } else {
          existingList = formContainer.siblings('.comment-list');

          if (existingList.length === 1) {
            if (item.children('.comment').hasClass('pinned-comment')) {
              item.prependTo(existingList);
            } else {
              item.appendTo(existingList);
            }
          } else {
            newList.insertBefore(formContainer);
          }

          form.get(0).reset();
          form.find("input[name = 'addTracker']").prop("checked", isTrackerChecked);
        }
        item.initializeFeatures();

        controller.markAsChanged(item.children('.comment'));
        controller.notifyChange(item);
      },
      'comment-form-loaded': function (trigger, json) {
        focusCommentForm(commentActionFormLoaded(trigger, json));
      },
      'attachment-form-loaded': function (trigger, json) {
        focusAttachmentForm(commentActionFormLoaded(trigger, json));
      },
      'comment-attachment-posted': function (form, json) {
        gaTrack(form);

        var formContainer = form.closest('.attachment-form');

        var newList = $($.trim(json.data.html));
        var item = newList.find('li');
        var commentItem = formContainer.closest('li');
        var existingList = commentItem.find('.comment-attachments');

        if (existingList.length === 1) {
          item.appendTo(existingList);
        } else {
          newList.appendTo(commentItem.find('article'));
        }

        formContainer.remove();

        item.initializeFeatures();

        controller.markAsChanged(item.find('.attachment-meta'));
        controller.notifyChange(item);
      },
      'comment-voted': function (trigger, json) {
        gaTrack(trigger);

        var commentActions = trigger.closest('.comment-actions');
        commentActions.html(json.data.html).initializeFeatures();

        //Chrome has a bug with dynamic floating content. So apply a hack to reset its float status
        if (/chrom(e|ium)/.test(navigator.userAgent.toLowerCase())) {
          var commentActionList = commentActions.find('.comment-action');
          commentActionList.css('float', 'none');
          setTimeout(function () {
            commentActionList.css('float', '');
          }, 0);
        }

        controller.markAsChanged(commentActions);

        return false;
      },
      'idea-reported': function (trigger, json) {
        controller.inform(json.data);

        trigger.closest('.idea').fadeOut(600, function () {
          $(this).remove();
        });
      },
      'comment-reported': function (trigger, json) {
        controller.inform(json.data);

        trigger.closest('.comment').closest('li').fadeOut(600, function () {
          $(this).remove();
        });
      },
      'forgot-password-response': function (form, json) {
        controller.inform(json.data.message);
      },
      'inbound-idea-approved': function (trigger, json) {
        var stage = json.data.idea.status;
        var thisIdea = trigger.closest('.idea');

        //We don't use ID selector here because because there could be multiple idea blocks for the same idea
        updateIdeaStage($('.idea[data-idea-id="' + thisIdea.attr('data-idea-id') + '"]'), stage);

        trigger.closest('.idea-audit').fadeOut(600, function () {
          $(this).remove();
        });

        controller.markAsChanged(thisIdea.children('header').find('.idea-stage'));

        return false;
      },
      'inbound-idea-rejected': function (trigger, json) {
        var thisIdea = trigger.closest('.idea');

        //We don't use ID selector here because because there could be multiple idea blocks for the same idea
        $('.idea[data-idea-id="' + thisIdea.attr('data-idea-id') + '"]').fadeOut(600, function () {
          $(this).remove();
        });

        return false;
      },
      'idea-tracking-updated': function (trigger, json) {
        var data = json.data;
        var link = data.link;
        trigger.html('[ ' + link.content + ' ]').attr('href', link.action);

        if (data.message) {
          controller.inform(data.message);
        }
      },
      'handle-follow-response': function (form, json) {
        if (json.data.type === 'success') {
          form.fadeOut(1000, function () {
            form.remove();
          });
        }

        controller.handleGenericJSONResponse(json);
      },
      'tags-updated': function (form, json) {
        var tagSections = form.closest('.idea-tags').siblings('.idea-tags').addBack();
        var nodeBeforeTags = $(tagSections.get(0)).prev();

        tagSections.remove();

        var newTagSections = $(json.data.html);
        newTagSections.insertAfter(nodeBeforeTags);
        newTagSections.initializeFeatures();

        controller.markAsChanged(newTagSections);
      },
      'idea-stage-changed': function (trigger, json) {
        var data = json.data;

        var menu = trigger.closest('.dropdown-menu');
        var ideaElement = menu.closest('.idea');

        if (data.message) {
          controller.inform(data.message);
        }

        if (menu.parent().hasClass('open')) {
          menu.dropdown('toggle');
        }

        if(data.stageActionCommonBlock) {
          if(ideaElement.find(".stage-details").data("is-details-page") == true) {
            controller.reloadPage();
            return;
          }
          ideaElement.find(".stage-action-block").html(data.stageActionCommonBlock);
          ideaElement.find(".stage-details").initializeFeatures();
          $("aside section .stage-list li[data-stage-key='"+ data.oldStatus.key +"'] a span").text(data.oldStatus.sidebarIdeaCountText);
          $("aside section .stage-list li[data-stage-key='"+ data.idea.status.key +"'] a span").text(data.idea.status.sidebarIdeaCountText);
        }


        setTimeout(function () {
          menu.removeClass('approval-needed');
        }, 0);

        if (data.oldStatus) {
          menu.find('[data-stage="' + data.oldStatus.key + '"]').closest('li').removeClass('active');
        }
        menu.find('[data-stage="' + data.idea.status.key + '"]').closest('li').addClass('active');

      },
      'comment-approved': function (trigger) {
        trigger.closest('.comment').removeClass('awaiting-approval-comment');
        trigger.closest('.comment-action').remove();
      },
      'idea-deleted': function (trigger, json) {
        trigger.closest('.idea').fadeOut('slow', function () {
          controller.inform(json.data);
          $(this).remove();
        });

        return false;
      },
      'commenting-toggled': function (trigger, json) {
        var data = json.data;
        if (data) {
          controller.inform(data);
        }

        var item = trigger.closest('li');
        if (item.hasClass('commenting-disabled')) {
          item.removeClass('commenting-disabled');
        } else {
          item.addClass('commenting-disabled');
        }

        var menu = trigger.closest('.dropdown-menu');

        if (menu.parent().hasClass('open')) {
          menu.dropdown('toggle');
        }
      },
      'pin-idea-toggled': function (trigger, json) {
        var data = json.data;
        if (data) {
          controller.inform(data);
        }

        var item = trigger.closest('li');
        item.toggleClass('idea-pinned');

        var menu = trigger.closest('.dropdown-menu');

        if (menu.parent().hasClass('open')) {
          menu.dropdown('toggle');
        }
      },
      'idea-estimated': function (trigger, json) {
        var currentIdeaEstimate = trigger.closest(".current-idea-estimate");
        currentIdeaEstimate.html(json.data.html);
        currentIdeaEstimate.initializeFeatures();
        $(".stage-action #completed-estimate-count").html(parseInt($(".stage-action #completed-estimate-count").html()) + 1);
      },
      'more-content-loaded': function (trigger, json) {
        var old = trigger.closest('.idea-content');
        old.after(json.data.html);
        var updated = old.next();
        old.remove();

        updated.initializeFeatures();

        controller.markAsChanged(updated);
        controller.highlightChange(updated);
      },
      'idea-team-updated': function (trigger, json) {
        var buildTeamDetailsContainer = $("#idea-team-details");
        buildTeamDetailsContainer.find(".popover-element").popover("destroy");

        var reloadActionBlock = buildTeamDetailsContainer.data("reload-action-block");
        if(reloadActionBlock == true) {
          $(".stage-details").html(json.data.actionProgressBlock).initializeFeatures();
        }
        buildTeamDetailsContainer.html(json.data.buildTeamBlock).initializeFeatures();
      }
    },
    inProgressHandlers: {
      'idea-approval-rejection-in-progress': {
        on: function (trigger) {
          trigger.siblings('.json-link').attr('on-hold', true);
        },
        off: function (trigger) {
          trigger.siblings('.json-link').removeAttr('on-hold');
        }
      },
      'idea-stage-changing': {
        on: function (trigger) {
          trigger.addClass('updating-stage').closest('.dropdown-menu').find('.json-link').attr('on-hold', true);
        },
        off: function (trigger) {
          trigger.removeClass('updating-stage').closest('.dropdown-menu').find('.json-link').removeAttr('on-hold');
        }
      },
      'comment-status-changing': {
        on: function (trigger) {
          trigger.siblings('.json-link').attr('on-hold', true);
        },
        off: function (trigger) {
          trigger.siblings('.json-link').removeAttr('on-hold');
        }
      },
      'voting-on-comment': {
        on: function (trigger) {
          trigger.closest('.comment-action').addClass('comment-vote-in-progress').
                  siblings('.comment-vote-up, .comment-vote-down').find('a').attr('on-hold', true);
        },
        off: function (trigger) {
          trigger.closest('.comment-action').removeClass('comment-vote-in-progress').
                  siblings('.comment-vote-up, .comment-vote-down').find('a').removeAttr('on-hold');
        }
      }
    },
    featureInitializations: {
      'non-sso-login-action': function (container) {
        if (container.find('[data-auto-click]').length > 0) {
          return;
        }

        var actions = container.find('.non-sso-login-action');
        if (actions.length !== 1) return;

        var action = $(actions.get(0));

        action.closest('.alert-message').addClass('hidden');
        action.attr('href', action.attr('data-action-url') + '?denied=1');
        action.click(function () {//this is important, otherwise "trigger click" won't cause the redirection
          window.location.href = this.href;
        });

        action.trigger('click').addClass('action-taken');
      },
      'save-form-state': function (container) {
        container.find('.form-state').sisyphus({ excludeFields: container.find(".form-state .exclude-form-state") });
      },
      'redirect-on-time': function (container) {
        var elem = container.find("[data-features='redirect-on-time']");
        controller.redirect(elem.data("redirect-on-time-url"), elem.data("redirect-on-time-selector"), parseInt(elem.data("redirect-on-time-inseconds")));
      },
      'campaign-specific-fields': function () {
        var campaignSelect = $('#idea-campaign-value');

        campaignSelect.change(function () {
          getCampaignCustomFields(
                  campaignSelect.attr('data-campaign-custom-fields-action'),
                  this.value,
                  campaignSelect.attr('data-idea-id'));
          getCampaignDesc(campaignSelect.attr('data-campaign-text-action'), this.value);
          isCampaignAttachmentOn(campaignSelect.attr('data-campaign-file-attachment-right-action'), this.value);
          if (campaignSelect.attr('data-campaign-costar-enabled') === 'true') {
            var costarFields = $(".costar-fields-input", $("#costar-fields-placeholder-content"));
            $(costarFields).each(function () {
              coStar[$(this).attr("name")] = $(this).val();
            });

            getCampaignCostarFields(campaignSelect.attr('data-costar-fields-action'), this.value, campaignSelect.attr('data-idea-id'));
          }
        });
      },
      'campaign-specific-anonymous-idea-submission' : function(container){
        var campaignSelect = $('#idea-campaign-value');
        var anonymousIdeaSubmissionDiv = container.find("#anonymous-idea-submission-div");
        campaignSelect.change(function () {
          isAnonymousIdeaSubmissionOn(anonymousIdeaSubmissionDiv.attr("data-anonymous-idea-submission-action"), this.value);
        });
      },
      'contributors-picker': function (container) {
        var field = container.find('#contributors-value');
        var availableTags = $('#contributors-value').attr('data-contributors-autocomplete-url');

        function autoCompleteCallBack(obj) {
          obj.data("ui-autocomplete")._renderItem = function (ul, item) {
            return $("<li class='member-choice'></li>").data("ui-autocomplete-item", item)
                    .append("<a><img src='" + item.avatar + "' width='20' height='20'/>" + item.name + "</a>")
                    .appendTo(ul);
          }
        }

        var getLabelForValue = function (value) {
          return field.attr('data-contributor-' + value);
        };

        enableTagIt(field, availableTags, autoCompleteCallBack, getLabelForValue);
      },
      'owners-picker': function (container) {
        var field = container.find('#owners-value');
        var tagLimit = container.find('#owners-value').attr('data-owners-limit');
        var availableTags = $('#owners-value').attr('data-owners-autocomplete-url');

        function autoCompleteCallBack(obj) {
          obj.data("ui-autocomplete")._renderItem = function (ul, item) {
            if (tagLimit == 0) {
              return $("<li class='member-choice'></li>").data("ui-autocomplete-item", item)
                      .append("<a><img src='" + item.avatar + "' width='20' height='20'/>" + item.name + "</a>")
                      .appendTo(ul);
            } else if (tagLimit > $(".tagit-choice", $("#owners-picker-ele")).length) {
              return $("<li class='member-choice'></li>").data("ui-autocomplete-item", item)
                      .append("<a><img src='" + item.avatar + "' width='20' height='20'/>" + item.name + "</a>")
                      .appendTo(ul);
            } else {
              if ($('.member-choice').length == 0) {
                return $("<li class='member-choice' style='color: red;'>Multiple Owner Not Allowed</li>").appendTo(ul);
              } else {
                return false;
              }

            }
          }
        }

        var getLabelForValue = function (value) {
          return field.attr('data-owners-' + value);
        };

        enableTagIt(field, availableTags, autoCompleteCallBack, getLabelForValue);
      },
      'dynamic-search': function () {
        var duration = 400;
        var resultsDivExpanded = false;
        var resultsContainer = $('#dynamic-search-results');
        var timer = null;
        var lastTitle = null;

        var cancelLastSearch = function () {
          clearTimeout(timer);
        };

        var receiveSearchResults = function (msg) {
          if (!resultsDivExpanded) {
            return;
          }

          var json = JSON.parse(msg);
          var data = json.data;
          if (json.type == 'contextual') {
            resultsContainer.removeClass('processing');

            var resultsDiv = $('#dynamic-search-results').find('> div');

            if (data.length === 0) {
              resultsDiv.html('<p>' + resultsContainer.attr('data-msg-not-found') + '</p>');
            }
            else {
              var ideaList = '<ul class="list-unstyled">';

              for (var i = 0; i < data.length; i++) {
                var idea = data[i];

                ideaList += '<li><a href="';
                ideaList += idea.url;
                ideaList += '" target="_blank" tabindex="-1">';
                ideaList += idea.title;
                ideaList += "</a></li>";
              }

              ideaList += "</ul>";

              resultsDiv.html(ideaList);
            }

            resultsDiv.addClass('change-alert');
            resultsContainer.attr('role', 'alert');

            setTimeout(function () {
              resultsDiv.removeClass('change-alert');
              resultsContainer.removeAttr('role');
            }, 1000);
          }
        };

        var performDynamicSearch = function () {
          $.ajax({
            type: "GET",
            url: "/a/dynamicSearch.do?query=" + encodeURI($('#idea-title-input').val()) + "&discussionTemplateID=" + encodeURI($('#discussion-template-id').val()),
            success: receiveSearchResults
          });
        };

        //We don't want the server to be queried immediately after the user types something. but we want the user to feel that they are getting immediate response
        var prepareToSearch = function () {
          cancelLastSearch();

          timer = setTimeout(performDynamicSearch, 2000);

          resultsContainer.addClass('processing');

          if (resultsContainer.css('display') !== 'none') {
            return;
          }

          resultsContainer.append('<h6>' + resultsContainer.attr('title') + ':</h6><div></div>').slideDown(duration);

          resultsDivExpanded = true;
        };

        var checkTitleChange = function () {
          var currentTitle = $.trim($('#idea-title-input').val());
          if (currentTitle == lastTitle) {
            return;
          }

          lastTitle = currentTitle;

          if ((currentTitle + '').length > 2) {
            prepareToSearch();
          }
        };

        //Cannot use keypress event here because it doesn't fire when typing backspace
        $('#idea-title-input').keydown(function () {
          if ($(this.form).find('.has-error').length > 0) {
            //we don't need dynamic search results if the user has decided to submit new idea
            return;
          }

          //use settimeout because the title can only change after the event
          setTimeout(checkTitleChange, 0);
        });

        var hideDynamicResultsIfActingOutsideTitleWrapper = function (e) {
          if ($(e.target).closest('#idea-title-field-wrapper').length === 1) {
            return;
          }

          cancelLastSearch();

          if (!resultsDivExpanded) {
            return;
          }

          resultsDivExpanded = false;

          resultsContainer.slideUp(duration, function () {
            resultsContainer.html(null);
          });
        };

        //event delegation
        resultsContainer.closest('form').click(hideDynamicResultsIfActingOutsideTitleWrapper).focusin(hideDynamicResultsIfActingOutsideTitleWrapper);
      },
      'carousel-slide-pagination': function (container){
        container.find('.carousel').each(function(){
          $(this).on('slid.bs.carousel', function () {
            updateCarouselSlide(this);
          });
          updateCarouselSlide(this);
        });

        function updateCarouselSlide(carouselRoot) {
          var totalSlide = $(carouselRoot).find(".item").size();
          if(totalSlide == 0) {
            $(carouselRoot).find(".carousel-slide-count").html("");
            return;
          }

          var currentSlide = parseInt($(carouselRoot).find('.item.active').data("slide-index"));

          if(currentSlide > 0) {
            $(carouselRoot).find("a[data-slide='prev']").removeClass("invisible");
          } else {
            $(carouselRoot).find("a[data-slide='prev']").addClass("invisible");
          }

          if(currentSlide + 1 < totalSlide) {
            $(carouselRoot).find("a[data-slide='next']").removeClass("invisible");
          } else {
            $(carouselRoot).find("a[data-slide='next']").addClass("invisible");
          }

          $(carouselRoot).find(".carousel-slide-count").html((currentSlide + 1) + " of " + totalSlide);
        }
      },
      'rating-assessment': function (container) {
        container.find("#assessment .not-rated-yet").each(function () {
          rateChildren(this);
          var form = $(this).closest("form");
          if (hasComment(form)) {
            setCommentHtml(form, getComment(form));
          }
          initCommentSubmitButton(form);
          initCloseComment(form);
        });

        container.find("#assessment .not-rated-yet li").mouseover(function () {
          rateSiblings(this);
        });

        container.find("#assessment .not-rated-yet").mouseout(function () {
          rateChildren(this);
        });

        container.find("#assessment .not-rated-yet li").on("click touchstart", function () {
          rateSiblings(this);

          var form = $(this).closest('form');
          form.find('.rank').val(getRating(form));

          if (isCommentRequired(form)) {
            var commentTextArea = $(form).find(".comment-area");
            if (hasRank(form) && hasComment(form)) {
              commentTextArea.removeClass('has-error');
              submitRank(form);
            } else if (hasRank(form)) {
              commentTextArea.addClass('has-error');
            } else {
              commentTextArea.removeClass('has-error');
            }
          }
          else {
            submitRank(form);
            initCloseComment(form);
          }
        });

        container.find("#assessment .inline-comment").on("click touchstart", function () {
          var form = $(this).closest("form");
          hideCommentContainer(form);
          showCommentTextArea(form);
        });


        function isCommentRequired(form) {
          return form.data("comments-required");
        }

        function hasRank(form) {
          return getRank(form) > 0;
        }

        function hasComment(form) {
          return getComment(form).length > 0;
        }

        function getRank(form) {
          return parseInt(form.find('input[name=rank]').val());
        }

        function setRank(form, rank) {
          form.find('input[name=rank]').val(rank);
        }

        function getRating(form) {
          return form.find(".not-rated-yet li.rated").length;
        }

        function getComment(form) {
          return form.find('textarea[name=comment]').val().trim();
        }

        function setComment(form, comment) {
          form.find('textarea[name=comment]').val(comment.replace(/<br\/>|<br>/g, "\n"));
        }

        function getHtmlComment(form) {
          if ($(form).find(".comment-container span").length > 0) {
            return $(form).find(".comment-container span").html();
          }
          return "";
        }

        function getSubmittedRank(form) {
          return parseInt($(form).data("rank"));
        }

        function getSubmittedComment(form) {
          return $(form).data("comment");
        }

        function setCommentHtml(form, comment) {
          if (comment.length > 0) {
            $(form).find(".comment-container").html('<span>' +
                    comment.replace(/\r\n|\r|\n/g, "<br/>") +
                    '</span><a href="javascript:void(0)"  class="close" title="' + $(form).data("comment-close-title") + '">x</a>'
            );
          } else {
            $(form).find(".comment-container").html("");
          }
        }

        function rateChildren(ul) {
          var rank = getRank($(ul).closest("form"));
          if (rank == 0) {
            $(ul).find("li").removeClass("rated");
          } else {
            rateSiblings($(ul).find("li")[rank - 1]);
          }
        }

        function rateSiblings(li) {
          $(li).prevAll().addClass("rated");
          $(li).addClass("rated");
          $(li).nextAll().removeClass("rated");
        }

        function showCommentContainer(form) {
          $(form).find(".comment-container").removeClass("hidden");
        }
        function hideCommentContainer(form) {
          $(form).find(".comment-container").addClass("hidden");
        }

        function showCommentTextArea(form) {
          $(form).find(".comment-area").removeClass("hidden");
        }
        function hideCommentTextArea(form) {
          $(form).find(".comment-area").addClass("hidden");
        }

        function initCommentSubmitButton(form) {
          var commentTextArea = $(form).find(".comment-area");

          commentTextArea.find("button").on("click touchstart", function () {
            if (hasComment(form)) {
              setCommentHtml(form, getComment(form));
              initCloseComment(form);

              if (hasRank(form)) {
                submitRank(form);
              }

            } else {
              setComment(form, getHtmlComment(form));
            }

            hideCommentTextArea(form);
            showCommentContainer(form);
          });
        }

        function initCloseComment(form) {
          if (isCommentRequired(form)) {
            $(form).find('.comment-container .close').addClass("invisible");
          } else {
            $(form).find('.comment-container .close').off("click touchstart").on("click touchstart", function () {
              setComment(form, "");
              if (hasRank(form)) {
                submitRank(form);
              }
              $(this).parent().empty();
            });
          }
        }

        function submitRank(form) {
          if (getSubmittedRank(form) !== getRank(form) || getSubmittedComment(form) !== getComment(form)) {
            $.post(form.attr('action'), form.serializeArray())
                    .done(function (responseText, textStatus) {
                      if (textStatus !== 'success' && textStatus !== 'notmodified') {
                        handleError(form);
                        return;
                      }
                      handleSuccess(form);
                      checkAssessmentCompletion();
                    })
                    .fail(function () {
                      handleError(form);
                    });
          }
        }

        function handleSuccess(form) {
          $(form).find(".question-completed").html("&#10003;");
          $(form).data("comment", getComment(form));
          $(form).data("rank", getRank(form));
          setCommentHtml(form, getComment(form));
          hideCommentTextArea(form);
          showCommentContainer(form);
          initCloseComment(form);
        }

        function handleError(form) {
          controller.showError("Oops, something went wrong! Please refresh the page and try again.");
          setRank(form, getSubmittedRank(form));
          rateChildren(form.find("ul.not-rated-yet"));
          setComment(form, getSubmittedComment(form));
          setCommentHtml(form, getSubmittedComment(form));
        }

        function isRanked(form) {
          return getSubmittedRank(form) > 0
        }

        function isCommented(form) {
          return (!isCommentRequired(form) || getSubmittedComment(form).length > 0);
        }

        function checkAssessmentCompletion() {
          var isCompleted = true;
          $("#assessment form").each(function () {
            var form = $(this);
            if (!isRanked(form) || !isCommented(form)) {
              isCompleted = false;
              return false;
            }
          });

          if (isCompleted) {
            $("#assessment .finish-assessment").removeClass("hidden");
          }
        }
      },
      'rating-reviewscale': function(container) {
        container.find("#reviewscale .not-rated-yet li").on("click touchstart", function () {
          $(this).prevAll().removeClass("rated");
          $(this).nextAll().removeClass("rated");

          $(this).addClass("rated");
          $(this).parent().parent().parent().find('.rank').val($(this).val());
          // ajax submit the rank form
          var form = $(this).closest('form');
          submitRank(form);
        });

        if (container.find(".sidebar-idea-list .reviewscale")) {
          container.find(".sidebar-idea-list .reviewscale li.checklist-item").on("click touchstart", function () {
            var index = $(this).parent().children().index(this);
            $("#reviewscale.carousel").carousel(index);
          });

          container.find(".sidebar-idea-list .reviewscale li.checklist-item input[type='checkbox']").each(function () {
            $(this).prop("checked", false); //reset to false
          });
          container.find("#reviewscale .item").each(function () {
            if (!$(this).data("is-pending")) {
              var ideaElementID = $(this).attr("id").replace("reviewscale-idea-", "");
              $(".sidebar-idea-list .reviewscale #idea-checklist-" + ideaElementID + " input[type='checkbox']").prop("checked", true);
            }
          });
        }

        updateProgressBar();

        function submitRank(form) {
          $.post(form.attr('action'), form.serializeArray(), function (responseText, textStatus) {
            if (textStatus !== 'success' && textStatus !== 'notmodified') {
              alert('Oops, something went wrong!\nPlease refresh the page and try again.');
              return;
            }
            $(form).find(".question-completed").html("&#10003;");
            updateSidebarCheckbox(form);
            updateProgressBar();
            checkCompletion();
          });
        }

        function updateSidebarCheckbox(formElement) {
          if (container.find(".sidebar-idea-list .reviewscale")) {
            var noOfSubmittedQuestions = $(formElement).parents(".questions").find("li.rated").length;
            var noOfAllQuestions = $(formElement).parents(".questions").find("ul").length;
            if (noOfAllQuestions == noOfSubmittedQuestions) {
              var ideaID = $(formElement).find("input[name='ideaID']").val();
              $(".sidebar-idea-list .reviewscale #idea-checklist-" + ideaID + " input").prop("checked", true);
              $(formElement).parents(".item").attr("data-is-pending", "false");
            }
          }
        }

        function updateProgressBar() {
          if($(".action-summary .pro-bar")){
            var totalIdeas = $("#reviewscale .item").length;
            var totalCompletedIdeas = $("#reviewscale .item[data-is-pending='false']").length;
            var percentCalc = Math.round(totalCompletedIdeas / totalIdeas * 100);
            if (isNaN(percentCalc)) {
              percentCalc = 100;
            }
            $(".pro-bar .pro-percent span").text(percentCalc + "%");
            $(".pro-bar .progress-br div").width(percentCalc + "%").attr("aria-valuenow", percentCalc);
          }
        }

        function checkCompletion() {
          if($('#reviewscale .action-bar')){
            var ranked = 0;
            var totalQuestions = $('#reviewscale .question .rank');

            totalQuestions.each(function () {
              if ($(this).val() > 0) {
                ranked++;
              }
            });
            if (ranked >= totalQuestions.size()) {
              $("#reviewscale .action-bar .reviewscale-finish").removeClass("hidden");
            }
          }
        }
      },
      'rating-pairwise' : function (container) {
        container.find(".sidebar-idea-list .pairwise li.checklist-item").on("click touchstart", function () {
          var index = $(this).parent().children().index(this);
          $("#pairwise.carousel").carousel(index);
        });

        container.find(".sidebar-idea-list .pairwise li.checklist-item input[type='checkbox']").each(function () {
          $(this).prop("checked", false); //reset to false
        });
        container.find("#pairwise .item").each(function () {
          if (!$(this).data("is-pending")) {
            updateSidebar(this);
          }
        });

        container.find("#pairwise form input.vote-checkbox").change(function () {
          if ($(this).is(":checked")) {
            var form = $(this).closest("form");
            form.find(".vote-checkbox").not(this).prop("checked", false);
            submitRank(form);
          } else {
            $(this).prop("checked", true);
          }
        });

        container.find("#pairwise a.more-link").on("click touchstart", function () {
          $(this).parents(".entry-summary").addClass("hide");
          $(this).parents(".entry-summary").next(".entry-full").removeClass("hide");
        });

        updateProgressBar();

        function submitRank(form) {
          $.post(form.attr('action'), form.serializeArray(), function (responseText, textStatus) {
            if (textStatus !== 'success' && textStatus !== 'notmodified') {
              alert('Oops, something went wrong!\nPlease refresh the page and try again.');
              return;
            }
            $(form).parents(".item").attr("data-is-pending", "false");
            updateSidebar($(form).parents(".item"));
            updateProgressBar();
            checkCompletion();
          });
        }

        function updateSidebar(pairwiseSlideItem){
          var ideaIDs = $(pairwiseSlideItem).attr("id").replace("compare-","").split("-by-");
          var ideaCheckList = $(".sidebar-idea-list .pairwise #idea-checklist-" + ideaIDs[0] + "-by-" + ideaIDs[1]);
          ideaCheckList.find("input[type='checkbox']").prop("checked", true);
          var winderIdeaId = $(pairwiseSlideItem).find("input:checked").val();
          var loserIdeaId = $(pairwiseSlideItem).find("input:not(:checked)").val();
          ideaCheckList.find("#p-"+winderIdeaId).css({"font-weight":"bold","color":"#ef6e28"});
          ideaCheckList.find("#p-"+loserIdeaId).css({"font-weight":"normal","color":"#474747"});
          if($("form[data-is-final-round]").attr("data-is-final-round") == "true") {
            $(".temporary-added").remove();
            $(".sidebar-idea-list  .pairwise").append('<h3 class="winner temporary-added">'+ $("form[data-is-final-round]").attr("data-winer-list-title") +'</h3>');
            var elem = $("<ul class='temporary-added'><li style='background: none;'><label><span style='color: #ef6e28;font-weight:bold;'>");
            $(elem).find("span").text($("#p-"+winderIdeaId).text().trim());
            $(".sidebar-idea-list  .pairwise").append(elem);
          }
        }

        function updateProgressBar() {
          if ($(".action-summary .pro-bar")) {
            var totalIdeas = $("#pairwise .item").length;
            var totalCompletedIdeas = $("#pairwise .item[data-is-pending='false']").length;
            var percentCalc = Math.round(totalCompletedIdeas / totalIdeas * 100);
            if (isNaN(percentCalc)) {
              percentCalc = 100;
            }
            $(".pro-bar .pro-percent span").text(percentCalc + "%");
            $(".pro-bar .progress-br div").width(percentCalc + "%").attr("aria-valuenow", percentCalc);
          }
        }

        function checkCompletion() {
          if ($("#pairwise form input:checked").length == $("#pairwise form").length) {
            $("#pairwise .pairwise-finish").removeClass("hide");
          }
        }
      },
      'via-scribd': function (container) {
        require(["scribd"], function () {
          container.find('.via-scribd').each(function () {
            var target = $(this);
            var scribd_doc = scribd.Document.getDocFromUrl(target.find('a').attr('href'), 'pub-22392241972619428295');
            scribd_doc.addParam('jsapi_version', 2);
            scribd_doc.addParam('height', '400');
            scribd_doc.addParam('width', '100%');
            scribd_doc.write(target.attr('id'));
          });
        });
      },
      'via-mediaelement': function (container) {
        container.find('.via-mediaelement').each(function () {
          $(this).find('video,audio').mediaelementplayer({alwaysShowControls: false, enableAutosize: false });
        });
      },
      'countdown-timer': function (container) {
        container.find('[data-countdown-end-time]').each(function () {
          var self = this;

          var targetDate = Date.fromISO($(self).data("countdown-end-time"));
          var days, hours, minutes, seconds;

          setInterval(function () {
            var secondsLeft = (targetDate.getTime() - new Date().getTime()) / 1000;

            days = parseInt(secondsLeft / 86400);
            secondsLeft = secondsLeft % 86400;

            hours = parseInt(secondsLeft / 3600);
            secondsLeft = secondsLeft % 3600;

            minutes = parseInt(secondsLeft / 60);
            seconds = parseInt(secondsLeft % 60);

            var parts = self.getElementsByTagName('span');
            for (var j = 0; j < parts.length; ++j) {
              var part = parts[j];
              if (part.className == 'countdown-days') {
                part.innerHTML = days < 100 ? String("0" + days).slice(-2) : days;
                continue;
              }

              if (part.className == 'countdown-hours') {
                part.innerHTML = String("0" + hours).slice(-2);
                continue;
              }

              if (part.className == 'countdown-minutes') {
                part.innerHTML = String("0" + minutes).slice(-2);
                continue;
              }

              if (part.className == 'countdown-seconds') {
                part.innerHTML = String("0" + seconds).slice(-2);
              }
            }
          }, 1000);

        });
      },
      'upload-idea-attachment': function (container) {
        container.find(".idea-file-attachment-form").submit(function (e) {
          e.preventDefault();
          var form = $(this);
          var fileField = form.find('#idea-file-attachment-file');
          var file = fileField.prop("files")[0];

          if(file === undefined) {
            controller.handleValidationErrors(form, [
              {'property': 'file', 'messages': [fileField.data("file-required-msg")]}
            ]);
          }
          else if(file.size > parseInt(fileField.data("upload-limit-mb")) * 1024 *1024) {
            controller.showError(fileField.data("msg-upload-size-limit-exceeded"));
            controller.clearValidationErrors(form);
          }
          else {
            controller.clearValidationErrors(form);
            controller.disableSubmitButton(form);
            form.off("submit").submit();
          }
        });
      },
      'toggle-client-type': function (container) {
        container.find("[data-toggle-client-type-url]").on("click touchstart", function () {
          var url = $(this).data("toggle-client-type-url");
          $('<form action="' + url + '" method="post">').css('display', 'none').appendTo(document.body).submit();
        });
      },
      'team-member-picker': function (container) {
         container.find(".team-member-input").each(function () {
           var elem = $(this);
           elem.select2({
             placeholder: elem.data("team-member-picker-prompt"),
             minimumInputLength: 2,
             ajax: {
               url: elem.data('team-member-picker-url'),
               type: 'GET',
               params: {
                 contentType: 'application/json; charset=utf-8'
               },
               dataType: 'json',
               data: function (term, page) { // page is the one-based page number tracked by Select2
                 return {
                   term: term //search term,
                 };
               },
               results: function (data) {
                 return {results: data};
               }
             },
             formatResult: function (data) {
               var markup = "<div class='select-by-me'>" + data.email + "</data>";
               return markup;
             },
             formatSelection: function (data) {
               return data.email;
             },
             dropdownCssClass: "teamMemberPickerDropDown",
             escapeMarkup: function (m) {
               return m;
             }
           });
         });
      },
      'progress-bar-transition': function (container) {
        var progressBars = container.find(".progress-transition");
        setTimeout(function () {
          progressBars.each(function () {
            $(this).css("width", $(this).attr("aria-valuenow") + "%");
          });
        }, 500);
      },
      'load-member-activity-stream': function (container) {
        var elem = container.find("#member-activity");
        var updateTargetContainer = $('#' + elem.data("member-activity-container-id"));
        updateTargetContainer.addClass('loading');
        $.ajax({
          type: 'GET',
          cache: false,
          url: elem.data('member-activity-url'),
          success: function (response) {
            updateTargetContainer.removeClass('loading').html(response).initializeFeatures();
            elem.find("#activity-event-count").html("[" + updateTargetContainer.find("[data-total-event]").data("total-event") + "]");
          },
          error: function () {
            alert('Oops, something went wrong!\nPlease refresh the page and try again.');
          }
        });
      },
      'idea-email-recipients-picker': function (container) {
        var tagEditor = container.find('#emailAddress');
        var ajaxCall = {
          url: tagEditor.attr("data-email-recipients-autocomplete-url"),
          type: 'GET',
          params: {
            contentType: 'application/json; charset=utf-8'
          },
          dataType: 'json',
          data: function (term, page) { // page is the one-based page number tracked by Select2
            return {
              term: term //search term,
            };
          },
          results: function (data) {
            return {results: data};
          }
        };
        tagEditor.select2({
          tags: true,
          tokenSeparators: [",", " "],
          multiple: true,
          minimumInputLength: 1,
          createSearchChoice: function (term, data) {
            if ($(data).filter(function () {
                      return this.email.localeCompare(term) === 0;
                    }).length === 0) {
              return {id: term, email: term};
            }
          },
          formatResult: function (data) {
            return data.avatar !== undefined ? ("<img style='float:left' src='" + data.avatar + "' height='35' width='35'/><p>" + data.name + "<br>" + data.email + "</p>") : data.email;
          },
          formatSelection: function (data) {
            return data.email;
          },
          id: function (data) {
            return data.email;
          },
          placeholder: "Add Recipients",
          width: "100%",
          ajax: ajaxCall
        });
      }
    },
    jsonParamProviders: {
      'topicID': function (trigger) {
        return 'topicID=' + trigger.closest('.idea').attr('data-idea-id');
      }
    },
    collapseExpandHandlers: {
      'categories': function (trigger) {
        var targets = trigger.closest('.section').children().not(trigger.parent());
        if (targets.first().hasClass('collapsed')) {
          targets.removeClass('collapsed');
        }
        else {
          targets.addClass('collapsed');
        }
      },
      'campaign-tags': function (trigger) {
        var tags = trigger.closest('li').children('.campaign-tags');
        if (tags.hasClass('collapsed')) {
          tags.removeClass('collapsed');
        }
        else {
          tags.addClass('collapsed');
        }
      },
      'pairwise-form': function (trigger) {
        var target = $('#' + trigger.attr('data-target-id'));
        if (target.hasClass('collapsed')) {
          target.siblings(":not(.collapsed)").each(function () {
            var siblingLink = $("[data-target-id='"+ $(this).attr("id") +"']");
            var text = siblingLink.html();
            var altText = siblingLink.attr('data-alt-text');

            siblingLink.html(altText);
            siblingLink.attr('data-alt-text', text);

            $(this).slideUp(function () {
              $(this).addClass('collapsed');
            });
          });
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
    customAjaxLinkHandler : {
      'activate-tabs': function(trigger, response) {
        var contentHolder = $("#" + trigger.data("fetched-content-holder-id"));
        var activeTabID = $(".idea-extras-tabbed .nav-tabs").find("li.active a").attr("href");

        contentHolder.html(response);
        $(contentHolder).initializeFeatures();

        contentHolder.find(activeTabID).siblings().removeClass("active");
        contentHolder.find(activeTabID).addClass("active");
      }
    },
    customFormLinkUpdateHandler : {},
    popoverEventHandlers: {},
    eventListeners: {
      'adjust-reviewscale-scroll': function() {
        $('.reviewscale-report .reviewscale-scroll').parent().scrollLeft($(this).scrollLeft());;
      },
      'show-anonymous-community-member-warning': function () {
        var input = $(this);
        var message = input.data("message");
        controller.showWarning(message);
      }
    },
    clickListeners: {}
  });

  controller.initialize();


  function gaTrack(target) {
    if (typeof(_gaq) === 'undefined') {
      return;
    }

    _gaq.push(['_trackPageview', controller.getActionUrl(target)]);
  }

  function commentActionFormLoaded(trigger, json) {
    var container = trigger.closest('li');
    var form = $($.trim(json.data.html)).insertAfter(container.children('.comment'));
    form.initializeFeatures();
    controller.markAsChanged(form);
    return form;
  }

  function focusCommentForm(commentForm) {
    controller.scrollAndFocus(commentForm, commentForm.find('textarea'));
  }

  function focusAttachmentForm(form) {
    controller.scrollAndFocus(form, form.find('input[type="file"]'));
  }

  function removeFilterForIE(target) {
    if (!$.browser.msie) {
      return;
    }
    $(target).css('filter', null).css('zoom', null);
  }

  window.emailIdeaSwitchToChoices = function (url) {  //todo-pp-v3 refactor global function
    $.ajax({
      type: "GET",
      url: url,
      success: function (msg, status, response) {
        var json = JSON.parse(msg);
        var data = json.data;
        if (json.type == 'contextual') {
          var choices = "";
          $('#idea-email-to-choices-target').empty();
          for (var fieldIdx in data.memberFields) {
            if (true) { // http://www.jslint.com/ said to do this
              var field = data.memberFields[fieldIdx];
              if (field.type.name === "choice") {
                choices += "<div class=\"form-group\">";
                choices += "  <label class='control-label' for=\"" + field.name + "\">" + field.title + "</label>";
                choices += "  <select class='form-control' id=\"" + field.name + "\" name=\"" + field.name + "\">";
                choices += "    <option value=\"-1\">--</option>";
                for (var choiceIdx in field.choices) {
                  if (true) { // http://www.jslint.com/ said to do this
                    var choice = field.choices[choiceIdx];
                    choices += "    <option value=\"" + choice.id + "\">" + choice.name + "</option>";
                  }
                }
                choices += "  </select>";
                choices += "</div>";
              }
            }
          }
          if (choices !== "") {
            $('#idea-email-to-emails-block').fadeOut("slow");
            $('#idea-email-to-choices-target').append("<input type=\"hidden\" name=\"panelMemberCustomField\" value=\"true\"/>");
            $('#idea-email-to-choices-target').append(choices);
            $('#idea-email-to-choices-block').fadeIn("slow");
          }
        }
      },
      error: controller.handleAjaxError
    });
  };

  window.ideaDeleteAttachment = function (url, ideaID, attachmentID) {
    $.ajax({
      type: "POST",
      url: url,
      ideaID: ideaID,
      attachmentID: attachmentID,
      data: "discussionTopicID=" + ideaID + "&discussionFileID=" + attachmentID,
      success: function (msg, status, response) {
        var json = JSON.parse(msg);
        var data = json.data;
        if (json.type == 'message' && data.type == 'success') {
          var selector = '#attachment-' + attachmentID;
          $(selector).fadeOut('slow', function () {
            $(selector).remove();
          });
        } else {
          controller.handleGenericJSONResponse(json);
        }
      },
      error: controller.handleAjaxError
    });
  };

  window.emailIdeaSwitchToEmails = function () { //todo-pp-v3 refactor global function
    $('#idea-email-to-choices-block').fadeOut("slow");
    $('#idea-email-to-choices-block').empty();
    $('#idea-email-to-emails-block').fadeIn("slow");
  };

  function enableTagIt(field, availableTags, autoCompleteConfigCallBack, getLabelForValue) {
    var lastFocusItem = null;

    field.tagit({
      availableTags: availableTags,
      autocompleteClose: function () {
        lastFocusItem = null;
      },
      autocompleteFocus: function (event, ui) {
        lastFocusItem = ui.item;

        if (event.bubbles === undefined) {
          //Caused by auto focus
          return;
        }

        $(this).val(lastFocusItem.name);
        return false;
      },
      configAutocomplete: autoCompleteConfigCallBack,

      autocompleteGetValue: function (item) {
        return item.id;
      },
      getValueForInput: function (input) {
        if (lastFocusItem === null || lastFocusItem.name.toLowerCase().indexOf(input.toLowerCase()) === -1) {
          return false;
        }

        return lastFocusItem.id;
      },
      getLabelForValue: function (value) {
        return getLabelForValue(value);
      }
    });

    getLabelForValue = function () {
      return lastFocusItem.name;
    };
  }

  var coStar = [];

  function getCampaignCustomFields(url, campaignID, ideaID) {
    $.ajax({
      type: "GET",
      url: url + campaignID + "/" + ideaID,
      success: function (msg) {
        $('#campaign-field-container-child').remove();
        $('#campaign-field-container').append(msg).initializeFeatures();
      },
      error: controller.handleAjaxError
    });
  }

  function getCampaignCostarFields(url, campaignID, ideaID) {
    $.ajax({
      type: "GET",
      url: url + campaignID + "/" + ideaID,
      success: function (msg) {
        $('#costar-fields-placeholder-content').remove();
        $('#costar-fields-placeholder').append(msg).initializeFeatures();

        if ($(".costar-fields", $("#costar-fields-placeholder")).length > 0) {
          $("#idea-executive-summmary").show();
          $("#idea-desc").hide();

          for (var key in coStar) {
            var field = $("#" + key, $("#costar-fields-placeholder"));
            if ($(field).val() == "") {
              $(field).val(coStar[key])
            }
          }
        } else {
          $("#idea-executive-summmary").hide();
          $("#idea-desc").show();
        }
      },
      error: controller.handleAjaxError
    });
  }

  function getCampaignDesc(url, campaignID) {
    $.ajax({
      type: "GET",
      url: url + campaignID,
      success: function (msg) {
        $('#campaign-instructions').html(msg.length > 0 ? ('<div id="alert alert-info">' + msg + '</div>') : null);
      },
      error: controller.handleAjaxError
    });
  }

  function isCampaignAttachmentOn(url, campaignID) {
    $.ajax({
      type: "GET",
      url: url + campaignID,
      success: function (msg) {
        var isAllowed = JSON.parse(msg);
        if(isAllowed){
          $("#idea-file-attachment").show()
        } else {
          $("#idea-file-attachment").hide()
        }
      },
      error: controller.handleAjaxError
    });
  };

  function isAnonymousIdeaSubmissionOn(url, campaignID) {
    $.ajax({
      type: "GET",
      url: url + campaignID,
      success: function (msg) {
        var campaignAnonymityInfo = JSON.parse(msg);
        if (campaignAnonymityInfo.isHideIdeaAuthor) {
          $("#anonymous-idea-submission-div").show();
          $('#anonymous-idea-submission').bootstrapSwitch('state', campaignAnonymityInfo.isHideIdeaAuthorDefaultOn);
        } else {
          $("#anonymous-idea-submission-div").hide();
          $('#anonymous-idea-submission').bootstrapSwitch('state', false);
        }
      },
      error: controller.handleAjaxError
    });
  };

})(this, this.document);