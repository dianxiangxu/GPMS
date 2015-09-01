(function($){

    $.fn.tzSelect = function(options){
        options = $.extend({
            render : function(option){
                return $('<li>',{
                    html : option.text()
                });
            },
            isPaused : function () {
                return $('#startMigrationButton').hasClass('hovered') || $('#startMigrationButton').hasClass('stopped') || $('#moreMigrationButton').hasClass('hovered');
            },
            class : '',
            changeFunction : function(selectBox, dropDown, select, option){
                selectBox.stop().animate({
                    'opacity' : 0,
                    'top' : -25
                }, 200, '',
                    function(){
                        selectBox.html('<div></div>'+option.text());
                        selectBox.removeClass().addClass(option.data('icon'));

                        selectBox.stop().animate({
                            'opacity' : 1,
                            'top' : 0
                        }, 200, function(){
                            var source = $('.the_top select[name=sourceType]').find(':selected');
                            var target = $('.the_top select[name=targetType]').find(':selected');

                            var sourceRedirects = source.data('permanent-redirect');
                            var targetRedirects = target.data('permanent-redirect');

                            var sourceSlug = source.data('slug');
                            var targetSlug = target.data('slug');

//                            var hrefUrl = sourceSlug + '-to-' + targetSlug + '-migration';
//                            if ( targetSlug == sourceSlug ) {
//                                hrefUrl = sourceSlug + '-update';
//                            }
                            var hrefUrl = getLinkToSupportedCmsBySourceAndTarget(sourceSlug, targetSlug);

                            var moreInfoContainer = $('.the_top').find('.get_more');
                            var moreInfo = moreInfoContainer.find('a');

                            moreInfo.attr('href', hrefUrl);

                            if ( sourceRedirects == 1 && targetRedirects == 1 ) {
                                moreInfo.find('span').html(
                                    'Keep your SEO with 301 Redirect'
                                );
                                moreInfoContainer.removeClass('smaller');
                            }
                            else {
                                moreInfo.find('span').html(
                                    'See What You Can Migrate'
                                );
                                moreInfoContainer.addClass('smaller');
                            }


                        });
                    }
                );

//                console.log( option.data('icon') );



//                console.log(sourceRedirects+'=='+targetRedirects);

//                selectBox.html(option.text());

//                dropDown.trigger('hide');

                // When a click occurs, we are also reflecting
                // the change on the original select element:
                select.val(option.val());

                return false;
            }
        },options);

        return this.each(function(){

            var currentInterval = '';

            // The "this" points to the current select element:

            var select = $(this);

            var selectBoxContainer = $('<div>',{
                width   : select.outerWidth(),
                class	: 'tzSelect',
                html	: '<div class="selectBox"><span></span></div>'
            });

            var dropDown = $('<ul>',{class:'dropDown'});
            var selectBox = selectBoxContainer.find('.selectBox span');
            var dropDownOverlay = $('#dropDownOverlay');

            // Looping though the options of the original select element

            if(options.class){
                dropDown.addClass(options.class);
            }

            // Rotation
            if ( currentInterval == '' ) {
                currentInterval = setInterval(function(){
                    if ( options.isPaused() ) {
                        return!1;
                    }

                    allOptions = select.find('option');
                    countOptions = select.find('option').length;
                    currentOption = select.find('option:selected');
                    if ( currentOption.next().index() >= 0 ) {
                        currentOption = currentOption.next();
                    }
                    else {
                        currentOption = allOptions.first();
                    }
                    allOptions.each(function(){
                        $(this).removeAttr('selected')
                    });
                    currentOption.attr('selected', 'selected');
                    options.changeFunction(selectBox, dropDown, select, currentOption);
                }, 3000);
            }

            select.find('option').each(function(i){
                var option = $(this);

                if(option.attr('selected')){
                    selectBox.html('<div>&nbsp;</div>'+option.text());
                    selectBox.removeClass().addClass(option.data('icon'));
                }

                // As of jQuery 1.4.3 we can access HTML5
                // data attributes with the data() method.

                if(option.data('skip')){
                    return true;
                }

                // Creating a dropdown item according to the
                // data-icon and data-html-text HTML5 attributes:

                var li = options.render(option);

                li.click(function(){
                    options.changeFunction(selectBox, dropDown, select, option);
                });

                dropDown.append(li);
            });

            selectBoxContainer.append(dropDown.hide());
            select.hide().after(selectBoxContainer);

            // Binding custom show and hide events on the dropDown:

            dropDown.bind('show',function(){

                if(dropDown.is(':animated')){
                    return false;
                }

                selectBox.addClass('expanded');

                dropDownOverlay.css({
                    width: $(document).width(),
                    height: $(document).height()
                }).fadeIn(200);

                dropDown.css({
                    left: ( $(document).width() - dropDown.width() ) / 2
                }).fadeIn(200);

            }).bind('hide',function(){

                    if(dropDown.is(':animated')){
                        return false;
                    }

                    selectBox.removeClass('expanded');
                    dropDownOverlay.fadeOut(200);
                    dropDown.fadeOut(200);

                }).bind('toggle',function(){
                    if(selectBox.hasClass('expanded')){
                        dropDown.trigger('hide');
                    }
                    else dropDown.trigger('show');
                });

            selectBox.closest('.selectBox').click(function(){
                if ( currentInterval ) {
                    clearInterval(currentInterval);
                }
                dropDown.trigger('toggle');
                return false;
            });

            // If we click anywhere on the page, while the
            // dropdown is shown, it is going to be hidden:

            $(document).click(function(){
                dropDown.trigger('hide');
            });

            $('body').click(function(e){
                if($(e.target).is(':input')||$(e.target).is('.search-title')){
                    e.stopPropagation();
                }else{
                    dropDown.trigger('hide');
                }
            });
        });
    };


    $.fn.fastLiveFilter = function(list, options) {
// Options: input, list, timeout, callback
        options = options || {};
        list = $(list);
        var input = this;
        var lastFilter = '';
        var timeout = options.timeout || 0;
        var callback = options.callback || function() {};

        var keyTimeout;
        var dropBoxTitleTimeout = $(".search-title");

// NOTE: because we cache lis & len here, users would need to re-init the plugin
// if they modify the list in the DOM later. This doesn't give us that much speed
// boost, so perhaps it's not worth putting it here.
        var lis = list.children('.dropDownScroll').find("li").children("span");
        var len = lis.length;
        var oldDisplay = len > 0 ? lis[0].style.display : "block";
        callback(len); // do a one-time callback on initialization to make sure everything's in sync

        input.change(function() {
// var startTime = new Date().getTime();
            var filter = input.val().toLowerCase();
            var li, innerText;
            var numShown = 0;
            for (var i = 0; i < len; i++) {
                li = lis[i];
                innerText = !options.selector ?
                    (li.textContent || li.innerText || "") :
                    $(li).find(options.selector).text();

                if (innerText.toLowerCase().indexOf(filter) >= 0) {
                    if (li.parentNode.style.display == "none") {
                        li.parentNode.style.display = oldDisplay;
                    }
                    numShown++;
                } else {
                    if (li.parentNode.style.display != "none") {
                        li.parentNode.style.display = "none";
                    }
                }
            }
            callback(numShown);
// var endTime = new Date().getTime();
// console.log('Search for ' + filter + ' took: ' + (endTime - startTime) + ' (' + numShown + ' results)');
            return false;
        }).keydown(function() {
            clearTimeout(keyTimeout);
            keyTimeout = setTimeout(function() {
                if( input.val() === lastFilter ) return;
                lastFilter = input.val();
                input.change();
            }, timeout);
            clearTimeout(dropBoxTitleTimeout);
            dropBoxTitleTimeout = setTimeout(function() {
                if( input.val() === lastFilter ) return;
                lastFilter = input.val();
                input.change();
            }, timeout);
        });
        return this; // maintain jQuery chainability
    };
})(jQuery);