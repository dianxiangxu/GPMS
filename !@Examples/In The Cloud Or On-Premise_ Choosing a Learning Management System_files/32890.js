
				var addWisepopJs = function (iDiv, fileString){
(function(iDiv, fileString) {
    "use strict";

    var ie = (function(){
        var undef,
            v = 3,
            div = document.createElement('div'),
            all = div.getElementsByTagName('i');
        while (
            div.innerHTML = '<!--[if gt IE ' + (++v) + ']><i></i><![endif]-->',
                all[0]
            );
        return v > 4 ? v : undef;
    }());

    var options = {
        insertIntoPage: true,
        wisepopsId: 32890,
        campaign: 1,
        trackingBaseUrl: 'tracking.wisepops.com',
        mainContainer: 'wisepop-modal-32890',
        mainWindow: 'wisepop-main-container',
        opacity: 0,
        overlayOpacity: 0.5,
        headerProtocol: ('https:' == document.location.protocol ? 'https://' : 'http://'),
        displayOnLeave: false,
        displayDelay:   parseInt('0') * 1000 ,
        effect: '',
        disableTracking : false,
        position: 'center',
        displayOnClick: false    };

    // Need to store dismiss links as we will hide them when user subscribe through optin block with confirmation message
    var dismissLinks = [];

    var Wisepops = function(fileString, targetDiv, options) {
        this.fileString = fileString;
        this.targetDiv = targetDiv;
        this.options = options;
    };

    Wisepops.prototype.getContent = function () {
        if (! this.contentElt) {
            this.contentElt = document.getElementById('wisepop-' + this.options.wisepopsId);
        }
        return this.contentElt;
    };
    Wisepops.prototype.getContainer = function () {
        if (! this.containerElt) {
            this.containerElt = document.getElementById('wisepop-modal-' + this.options.wisepopsId);
        }
        return this.containerElt;
    };
    Wisepops.prototype.getOverlay = function () {
        if (! this.overlayElt) {
            this.overlayElt = document.getElementById('wisepop-overlay-' + this.options.wisepopsId);
        }
        return this.overlayElt;
    };

    Wisepops.prototype.hasOpacity = function () {
        return 'opacity' in this.getContainer().style;
    };

    Wisepops.prototype.insertIntoPage = function(onWisepopLoaded) {
        var i, that = this;
        if (this.options.insertIntoPage) {
            this.targetDiv.innerHTML = this.fileString;
            var head = document.getElementsByTagName('head')[0];
            var style, styles = this.targetDiv.getElementsByTagName('style');
            var styleRegex = /<style.*?>.*?<\/style>/gi;

            if (ie > 8 || !ie) { // normal browsers, append styles to head
                for (i = 0 ; i < styles.length ; i++) {
                    style = styles[i];
                    head.appendChild(style);
                }
            } else { //IE8
                // parse fileString for style tags content
                var regex = /<style.*?>(.*?)<\/style>/gi, match;
                while (match = regex.exec(this.fileString)) {
                    // create a special element
                    style = document.createElement('style');
                    style.setAttribute('type', 'text/css');
                    style.styleSheet.cssText = match[1];
                    // add to head
                    head.appendChild(style);
                }
            }

            // hide upper div while inserting wisepops content
            this.targetDiv.style.display = 'none';
            document.getElementsByTagName('body')[0].appendChild(this.targetDiv);
            this.hide();
            this.targetDiv.style.display = '';
        } else {
            // show pop-in
            this.hide();
            document.getElementById('wisepop-main-container').style.display = '';
        }

        // Bind user actions
        var closeButton             = document.getElementById('close-wisepop-'+ this.options.wisepopsId);
        var overlay                 = document.getElementById('wisepop-overlay-'+ this.options.wisepopsId);
        var popin                   = document.getElementById('wisepop-'+ this.options.wisepopsId);
        if (overlay) {
            var closeOnClick = overlay.getAttribute('data-close-on-click') || "";
            if (closeOnClick == "1") {
                overlay.onclick = function() { that.destroy() };
            }
        }
        if (closeButton) {
            closeButton.onclick = function() { that.destroy() };
        }

        document.onkeydown = function(evt) {
            evt = evt || window.event;
            if (evt.keyCode == 27) {
                that.destroy(evt);
            }
        };

        var content = document.getElementById('wisepop-content');
        var links   = content.getElementsByTagName('a');
        var blocks  = content.children;
        for (var i = 0; i < blocks.length; i++) {
            if (blocks[i].getAttribute('data-type') == 'dismiss-links') {
                dismissLinks.push(blocks[i]);
            }
        }
        var inputs  = popin.getElementsByTagName('input');

        for(i = 0; i < links.length; i++) {
            var action = links[i].getAttribute("data-action") || "";
            var skip   = false;
            switch (action) {
                case "close":
                    links[i].onclick = function() {
                        that.destroy();
                    }
                    skip = true;
                    break;
                case "cookie":
                    links[i].onclick = function() {
                        var setCookie = function(cname, cvalue, exdays) {
                            var d = new Date();
                            d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
                            var expires = "expires=" + d.toUTCString();
                            document.cookie = cname + "=" + cvalue + "; " + expires;
                        }

                        if (!that.options.disableTracking) {
                            setCookie('wisepops_noshow', '1', 30);
                        }

                        that.destroy();
                    }
                    skip = true;
                    break;
                default: break;
            }

            if (skip) {
                continue;
            }

            var href = links[i].getAttribute('href') || "";
            if (links[i].getAttribute("class") == 'wisepop-building-block-action' || href.indexOf('#') != "0") {
                if (links[i].getAttribute('data-ignore-tracking') != "1") {
                    links[i].onclick = function() {
                        that.sendTrackingAction();
                    }
                }

            }
        }

        for (i = 0; i < inputs.length; i++) {
            if (inputs[i].className == 'wisepop-building-block-optin') {
                inputs[i].setAttribute('data_index', i-1);
                inputs[i].onclick = function(e) {
                    that.submitOptin(this, e);
                }
            }
        }

        // Wait for the images to load
        var callbackCalled = false;
        function waitForImagesToLoad() {
            var loadedImages = 0, i;
            try {
                var images = popin.getElementsByTagName('img');
                if (images.length == 0) {
                    callbackCalled = true;
                    onWisepopLoaded();
                    return; // exit
                }
                for (i = 0; i < images.length; i++) {
                    if (images[i].complete != undefined && images[i].complete == true) {
                        loadedImages++;
                        if (loadedImages == images.length) {
                            if (!callbackCalled) {
                                callbackCalled = true;
                                onWisepopLoaded();
                            }
                            return; // exit
                        }
                    }
                    else {
                        images[i].onload = function() {
                            loadedImages++;
                            if (loadedImages == images.length) {
                                if (!callbackCalled) {
                                    callbackCalled = true;
                                    onWisepopLoaded();
                                }
                                return; // exit
                            }
                        }
                    }
                }
            }
            catch(e) {
            }

            // retry every 50ms
            setTimeout(waitForImagesToLoad, 50);
        }
        waitForImagesToLoad();
    };

    Wisepops.prototype.animate = function() {
        switch (this.options.effect) {
            case 'smoothie':
                this.animateSmoothie();
                break;
            case 'fade':
                this.animateFadeIn();
                break;
            case 'slide':
                this.animateSlideIn();
                break;
            default: this.animateStraight();
                break;
        }
    }

    Wisepops.prototype.display = function() {
        var that = this;

        // If any delay is set, display after delay
        if (this.options.displayDelay > 0) {
            setTimeout(function() {
                that.animate();
            }, this.options.displayDelay);
        }
        // Display when user tries to leave the page
        else if (that.options.displayOnLeave) {
            ouibounce(null, {
                aggressive: true,
                callback: function() {
                    if (!that.shown) { // only show the popin once
                        that.animate();
                        that.shown = true;
                    }
                }
            });
        }
        // Display when user clicks on a link
        else if (that.options.displayOnClick) {
            var links = document.getElementsByTagName('a');
            var href  = "";
            for (var i = 0; i < links.length; i++) {
                href = links[i].getAttribute('href') || "";
                if (href.indexOf('#wisepops') != -1) {
                    var originalClick = links[i].onclick;
                    links[i].onclick  = function() {
                        that.animate();
                        if (originalClick) {
                            originalClick();
                        }

                        return false;
                    }
                }
            }
        }
        else {
            this.animate();
        }
    };

    Wisepops.prototype.animateSlideIn = function() {
        var popin     = document.getElementById('wisepop-'+ this.options.wisepopsId);
        var top       = popin.offsetTop;
        var left      = popin.offsetLeft;
        var popWidth  = popin.offsetWidth;
        var popHeight = popin.offsetHeight;
        var that      = this;

        var width  = 0;
        var height = 0;
        if (typeof(window.innerWidth) == 'number') {
            width  = window.innerWidth;
            height = window.innerHeight;
        }
        else if (document.documentElement && (document.documentElement.clientWidth || document.documentElement.clientHeight)) {
            width  = document.documentElement.clientWidth;
            height = document.documentElement.clientHeight;
        }
        else if (document.body && (document.body.clientWidth || document.body.clientHeight)) {
            width  = document.body.clientWidth;
            height = document.body.clientHeight;
        }

        function animate(object, property, start_value, end_value, time) {
            that.sendTrackingDisplay();
            that.getContainer().style.visibility = "hidden";
            object.style[property] = start_value + "px";
            var frame_rate = 0.06;
            var frame      = 0;
            var delta      = (end_value - start_value) / time / frame_rate;
            var handle = setInterval(function() {
                frame++;
                var value              = start_value + delta * frame;
                object.style[property] = value + "px";
                that.getContainer().style.visibility = 'visible';
                if ((value >= end_value && value >= start_value) || (value <= end_value && value <= start_value)) {
                    clearInterval(handle);
                }
            }, 1 / frame_rate);
        }

        switch (that.options.position) {
            case 'center_right' :
                popin.style.marginLeft = "";
                animate(popin, "left", width, left, 250);
                break;
            case 'center_left' :
                popin.style.marginLeft = "";
                animate(popin, "left", -popWidth, left, 250);
                break;
            case 'center' :
            case 'bottom_left' :
            case 'bottom_right' :
            case 'bottom_center':
                popin.style.marginTop = "";
                animate(popin, "top", height, top, 250);
            default: break;
        }
    }

    Wisepops.prototype.animateStraight = function() {
        this.getContainer().style.visibility = 'visible';
        this.sendTrackingDisplay();
    };

    Wisepops.prototype.animateFadeIn = function() {
        var that = this;
        /* IE8 BUG */
        if (! this.hasOpacity()
            && 'currentStyle' in this.getContainer()
            && this.getContainer().currentStyle.hasLayout === false) {
            this.getContainer().style.visibility = 'visible';
        }

        function setOpacity(element, opacity) {
            element.style.opacity = opacity;
            element.style.filter = 'alpha(opacity='+Math.round(opacity * 100)+')';
        }

        function fadeTo(elementToFadeIn, currentOpacity, targetOpacity, steps) {
            var isEnded = false

            var newOpacity = currentOpacity;
            if (currentOpacity < targetOpacity) {
                newOpacity = currentOpacity + (targetOpacity / steps);
            } else if (currentOpacity >= targetOpacity) {
                newOpacity = targetOpacity;
                isEnded = true;
            }

            setOpacity(elementToFadeIn, newOpacity);

            if (isEnded) {
                return false;
            }
            return newOpacity;
        }

        var startTime = new Date().getTime();
        var steps = 7;
        var currentContentOpacity = 0;
        var targetContentOpacity = 1;
        var currentOverlayOpacity = 0;
        var targetOverlayOpacity = this.options.overlayOpacity;

        setOpacity(this.getContent(), 0);
        setOpacity(this.getOverlay(), 0);

        this.getContainer().style.visibility = 'visible';

        var contentInterval = setInterval(function() {
            currentContentOpacity = fadeTo(that.getContent(), currentContentOpacity, targetContentOpacity, steps);
            if (currentContentOpacity === false) {
                clearTimeout(contentInterval);
                that.sendTrackingDisplay();
            }
        }, 50);
        var overlayInterval = setInterval(function() {
            currentOverlayOpacity = fadeTo(that.getOverlay(), currentOverlayOpacity, targetOverlayOpacity, steps)
            if (currentOverlayOpacity === false) {
                clearTimeout(overlayInterval);
            }
        }, 50);
    };

    Wisepops.prototype.animateSmoothie = function() {
        var that = this;
        /* IE8 BUG */
        if (! this.hasOpacity()
            && 'currentStyle' in this.getContainer()
            && this.getContainer().currentStyle.hasLayout === false) {
            this.getContainer().style.visibility = 'visible';
        }

        function setOpacity(element, opacity) {
            element.style.opacity = opacity;
            element.style.filter = 'alpha(opacity='+Math.round(opacity * 100)+')';
        }

        function fadeTo(elementToFadeIn, currentOpacity, targetOpacity, steps) {
            var isEnded = false

            var newOpacity = currentOpacity;
            if (currentOpacity < targetOpacity) {
                newOpacity = currentOpacity + (targetOpacity / steps);
            } else if (currentOpacity >= targetOpacity) {
                newOpacity = targetOpacity;
                isEnded = true;
            }

            setOpacity(elementToFadeIn, newOpacity);

            if (isEnded) {
                return false;
            }
            return newOpacity;
        }

        var startTime = new Date().getTime();
        var steps = 7;
        var currentContentOpacity = 0;
        var targetContentOpacity = 1;
        var currentOverlayOpacity = 0;
        var targetOverlayOpacity = this.options.overlayOpacity;

        setOpacity(this.getContent(), 0);
        setOpacity(this.getOverlay(), 0);

        this.getContainer().style.visibility = 'visible';

        var contentInterval = setInterval(function () {
            currentContentOpacity = fadeTo(that.getContent(), currentContentOpacity, targetContentOpacity, steps);
            if (currentContentOpacity === false) {
                clearTimeout(contentInterval);
                that.sendTrackingDisplay();
            }
        }, 35);
//        var overlayInterval = setInterval(function() {
//            currentOverlayOpacity = fadeTo(that.getOverlay(), currentOverlayOpacity, targetOverlayOpacity, steps)
//            if (currentOverlayOpacity === false) {
//                clearTimeout(overlayInterval);
//            }
//        }, 20);
        setOpacity(that.getOverlay(), targetOverlayOpacity);



        // slide
        var popin     = document.getElementById('wisepop-'+ this.options.wisepopsId);
        var top       = popin.offsetTop;
        var left      = popin.offsetLeft;
        var popWidth  = popin.offsetWidth;
        var popHeight = popin.offsetHeight;
        var that      = this;

        var width  = 0;
        var height = 0;
        if (typeof(window.innerWidth) == 'number') {
            width  = window.innerWidth;
            height = window.innerHeight;
        }
        else if (document.documentElement && (document.documentElement.clientWidth || document.documentElement.clientHeight)) {
            width  = document.documentElement.clientWidth;
            height = document.documentElement.clientHeight;
        }
        else if (document.body && (document.body.clientWidth || document.body.clientHeight)) {
            width  = document.body.clientWidth;
            height = document.body.clientHeight;
        }

        function animate(object, property, start_value, end_value, time) {
            that.sendTrackingDisplay();
            that.getContainer().style.visibility = "hidden";
            object.style[property] = start_value + "px";
            var frame_rate = 0.06;
            var frame      = 0;
            var delta      = (end_value - start_value) / time / frame_rate;
            var handle = setInterval(function () {
                frame++;
                var value = start_value + delta * frame;
                object.style[property] = value + "px";
                that.getContainer().style.visibility = 'visible';
                if ((value >= end_value && value >= start_value) || (value <= end_value && value <= start_value)) {
                    clearInterval(handle);
                }
            }, 1 / frame_rate);
        }

        switch (that.options.position) {
            case 'center_right' :
                popin.style.marginLeft = "";
                animate(popin, "left", width-popWidth+50, left, 250);
                break;
            case 'center_left' :
                popin.style.marginLeft = "";
                animate(popin, "left", left-50, left, 250);
                break;
            case 'center' :
                popin.style.marginTop = "";
                animate(popin, "top", top-50, top, 250);
                break;
            case 'bottom_left' :
            case 'bottom_right' :
            case 'bottom_center':
                popin.style.marginTop = "";
                animate(popin, "top", height-popHeight+50, top, 250);
            default: break;
        }
    };

    Wisepops.prototype.animateSmoothieOut = function() {
        var that = this;
        /* IE8 BUG */
        if (! this.hasOpacity()
            && 'currentStyle' in this.getContainer()
            && this.getContainer().currentStyle.hasLayout === false) {
            this.getContainer().style.visibility = 'visible';
        }

        function setOpacity(element, opacity) {
            element.style.opacity = opacity;
            element.style.filter = 'alpha(opacity='+Math.round(opacity * 100)+')';
        }

        function fadeOutTo(elementToFadeIn, currentOpacity, targetOpacity, steps) {
            var isEnded = false

            var newOpacity = currentOpacity;
            if (currentOpacity > targetOpacity) {
                newOpacity = currentOpacity - (1 / steps);
            } else if (currentOpacity <= targetOpacity) {
                newOpacity = targetOpacity;
                isEnded = true;
            }

            setOpacity(elementToFadeIn, newOpacity);

            if (isEnded) {
                return false;
            }
            return newOpacity;
        }

        var startTime = new Date().getTime();
        var steps = 7;
        var currentContentOpacity = 1;
        var targetContentOpacity = 0;
        var currentOverlayOpacity = this.options.overlayOpacity;
        var targetOverlayOpacity = 0;

        setOpacity(this.getContent(), 1);
        setOpacity(this.getOverlay(), this.options.overlayOpacity);

        var contentInterval = setInterval(function() {
            currentContentOpacity = fadeOutTo(that.getContent(), currentContentOpacity, targetContentOpacity, steps);
            if (currentContentOpacity === false) {
                clearTimeout(contentInterval);
                that.sendTrackingDisplay();
                that.getContainer().style.visibility = 'hidden';
            }
        }, 50);
        var overlayInterval = setInterval(function() {
            currentOverlayOpacity = fadeOutTo(that.getOverlay(), currentOverlayOpacity, targetOverlayOpacity, steps)
            if (currentOverlayOpacity === false) {
                clearTimeout(overlayInterval);
            }
        }, 50);


        // slide
        var popin     = document.getElementById('wisepop-'+ this.options.wisepopsId);
        var top       = popin.offsetTop;
        var left      = popin.offsetLeft;
        var popWidth  = popin.offsetWidth;
        var popHeight = popin.offsetHeight;
        var that      = this;

        var width  = 0;
        var height = 0;
        if (typeof(window.innerWidth) == 'number') {
            width  = window.innerWidth;
            height = window.innerHeight;
        }
        else if (document.documentElement && (document.documentElement.clientWidth || document.documentElement.clientHeight)) {
            width  = document.documentElement.clientWidth;
            height = document.documentElement.clientHeight;
        }
        else if (document.body && (document.body.clientWidth || document.body.clientHeight)) {
            width  = document.body.clientWidth;
            height = document.body.clientHeight;
        }

        function animate(object, property, start_value, end_value, time) {
            that.sendTrackingDisplay();
            that.getContainer().style.visibility = "visible";
            object.style[property] = start_value + "px";
            var frame_rate = 0.06;
            var frame      = 0;
            var delta      = (end_value - start_value) / time / frame_rate;
            var handle = setInterval(function() {
                frame++;
                var value              = start_value + delta * frame;
                object.style[property] = value + "px";
                if ((value >= end_value && value >= start_value) || (value <= end_value && value <= start_value)) {
                    clearInterval(handle);
                }
            }, 1 / frame_rate);
        }

        switch (that.options.position) {
            case 'center_right' :
                popin.style.marginLeft = "";
                animate(popin, "left", left, width-popWidth+50, 260);
                break;
            case 'center_left' :
                popin.style.marginLeft = "";
                animate(popin, "left", left, left-50, 260);
                break;
            case 'center' :
                popin.style.marginTop = "";
                animate(popin, "top", top, top-50, 260);
                break;
            case 'bottom_left' :
            case 'bottom_right' :
            case 'bottom_center':
                popin.style.marginTop = "";
                animate(popin, "top",top, height-popHeight+50, 260);
            default: break;
        }
    };

    Wisepops.prototype.destroy = function() {
        var element = document.getElementById(this.options.mainWindow);
        if (typeof(element) != 'undefined' && element != null) {
            // Do not remove the popup from the DOM if user chose to display on click
            if (this.options.displayOnClick) {
                var popin = document.getElementById('wisepop-'+ this.options.wisepopsId);
                if (popin != undefined) {
                    if(this.options.effect === 'smoothie') {
                        this.animateSmoothieOut();
                    }else{
                        this.hide();
                    }
                    this.updatePosition();
                    this.correctSeparatorWidth();
                }
            }
            else {
                if(this.options.effect === 'smoothie') {
                    this.animateSmoothieOut();
                }else{
                    document.body.removeChild(element);
                }
            }
        }

        return false;
    };

    Wisepops.prototype.submitOptin = function(target, e) {
        var index   = target.getAttribute('data_index');
        var inputs  = this.getContainer().getElementsByTagName('input');
        var opt     = document.getElementById('wisepop_optin_active_confirm');
        var filter  = /^\S+@\S+\.\S+$/;
        var errors  = [];
        var addData = [];

        for (var i = 0; i < inputs.length; i++) {
            var input     = inputs[i];
            if (input.type != "text") {
                continue;
            }
            var name      = input.getAttribute('name');
            var required  = input.getAttribute('data-required');
            var tag       = input.getAttribute('data-merge-tag');
            var fieldName = input.getAttribute('data-name');
            var errorDiv  = document.getElementById('wisepop_optin_error_' + name);
            if (errorDiv) {
                errorDiv.style.display = 'none';
            }

            switch (name) {
                case 'optin-email':
                    var email = input.value;
                    if (!filter.test(input.value)) {
                        errors.push(errorDiv);
                    }
                    break;
                default:
                    if (required == "1" && input.value == "") {
                        errors.push(errorDiv);
                    }

                    if (input.value != "") {
                        addData.push({name: fieldName, value: input.value, tag: tag});
                    }

                    break;
            }
        }

        if (errors.length == 0) {
            var queryString = 'c&d=' + encodeURIComponent(email);
            for (var i = 0; i < addData.length; i++) {
                var tag = addData[i].tag;
                // If tag is not set, compute it from additional field name
                if (tag == "") {
                    tag = addData[i].name.replace(/\s+/, '_').toLowerCase();
                }

                queryString += '&add-data[' + i + '][name]=' + encodeURIComponent(addData[i].name);
                queryString += '&add-data[' + i + '][value]=' + encodeURIComponent(addData[i].value);
                queryString += '&add-data[' + i + '][tag]=' + encodeURIComponent(tag);
            }

            var uniq = this.sendTracking(queryString);
            wiseStorage.setConverted(this.options.wisepopsId);
            if (typeof _gaq != 'undefined') {
                _gaq.push(['_trackEvent', 'WisePops', 'Signup', 'Get our free eBook']);
            } else if (typeof ga === 'function') {
                ga('send', 'event', 'WisePops', 'Signup', 'Get our free eBook');
            }
            switch (opt.value) {
                case 'url':
                    var a = document.getElementById("wisepop_optin_active_redirect");
                    // Preventing user to be redirected before tracking has been sent
                    if (a.target == '_self') {
                        var waitingForTrackingToFinish = window.setInterval(function() {
                            if (window.trackingSent[uniq] == true) {
                                window.clearInterval(waitingForTrackingToFinish);
                                a.click();
                            }
                        }, 50);
                    }
                    else {
                        a.click();
                        this.destroy();
                    }

                    break;
                case 'message':
                    document.getElementById('close-wisepop-'+ this.options.wisepopsId).style.display = '';
                    for (var i = 0; i < dismissLinks.length; i++) {
                        dismissLinks[i].parentNode.removeChild(dismissLinks[i]);
                    }

                    document.getElementById("wisepop-optin-buttons").style.display         = 'none';
                    document.getElementById('wisepop_optin_message_confirm').style.display = 'block';
                    break;
                case 'close':
                default:
                    this.destroy();
                    break;
            }
        }
        else {
            document.getElementById('wisepop_optin_message_confirm').style.display = 'none';
            for (var i = 0; i < errors.length; i++) {
                if (errors[i]) {
                    errors[i].style.display = 'block';
                    var err = errors[i];
                }

            }

            var pop = document.getElementById('wisepop-'+this.options.wisepopsId);
            pop.scrollTop = err.offsetTop;
        }
    };

    Wisepops.prototype.sendTracking = function(event) {

        if (this.options.disableTracking) {
            return false;
        }
        var uniq = Math.random();
        if (window.trackingSent == undefined) {
            window.trackingSent = {};
        }

        window.trackingSent[uniq] = false;

        var trackUrl = this.options.headerProtocol + this.options.trackingBaseUrl
            + '/_.gif?e=' + event + '&p='+ this.options.wisepopsId + '&c='
            + this.options.campaign;

        // Wisepops is not destroyed when user chose display on click
        // So we need to append a uniq string so that the image may be re-fetched
        // And the tracking re-sent
        if (this.options.displayOnClick) {
            trackUrl += '&un=' + uniq;
        }

        // Append tag instead of replacing overlay content to avoid race conditions and tracking being lost.
        var tag = document.createElement('img');
        tag.onload = function () { window.trackingSent[uniq] = true; };
        tag.src = trackUrl;
        tag.style.display = "none";
        document.getElementById('wisepop-overlay-' + this.options.wisepopsId).appendChild(tag);

        return uniq;
    };

    Wisepops.prototype.sendTrackingAction = function() {
        this.sendTracking('c');
        wiseStorage.setConverted(this.options.wisepopsId);


            };

    Wisepops.prototype.sendTrackingDisplay = function() {
        this.sendTracking('d');

        if (typeof _gaq != 'undefined') {
                _gaq.push(['_trackEvent', 'WisePops', 'Display', 'Get our free eBook']);
            } else if (typeof ga === 'function') {
                ga('send', 'event', 'WisePops', 'Display', 'Get our free eBook');
            }
    };

    Wisepops.prototype.correctSeparatorWidth = function() {
        function getElementsByClassName(node, classname) {
            var a = [];
            var re = new RegExp('(^| )'+classname+'( |$)');
            var els = node.getElementsByTagName("*");
            for(var i=0,j=els.length; i<j; i++)
                if(re.test(els[i].className))a.push(els[i]);
            return a;
        }

        var separators;

        if(document.querySelectorAll != null) {
            separators = document.querySelectorAll('.wisepops-separator');
        }
        else {
            separators = getElementsByClassName(document.body, 'wisepops-separator');
        }
        var n = separators.length;

        var i;
        for(i = 0; i < n; i++) {
            if(separators[i].innerHTML.length > 0) {
                var c = separators[i].innerHTML.substr(0, 1);

                // repeat string
                var times = Math.floor(separators[i].offsetWidth / 16);
                separators[i].innerHTML = (new Array(times + 1)).join(c);
            }
        }
    };


    Wisepops.prototype.updatePosition = function() {
        var pop = document.getElementById('wisepop-'+ this.options.wisepopsId);
        if (! pop) {
            return; // avoid displaying errors, can make debugging harder
        }
        var borderSpacing = 20;
        var popWidth  = pop.offsetWidth;
        var popHeight = pop.offsetHeight;

        var wisepopOverlayWidth     = 0;
        var wisepopOverlayHeight    = 0;

        if (typeof(window.innerWidth) == 'number') {
            wisepopOverlayWidth     = window.innerWidth;
            wisepopOverlayHeight    = window.innerHeight;
        }
        else if (document.documentElement && (document.documentElement.clientWidth || document.documentElement.clientHeight)) {
            wisepopOverlayWidth     = document.documentElement.clientWidth;
            wisepopOverlayHeight    = document.documentElement.clientHeight;
        }
        else if (document.body && (document.body.clientWidth || document.body.clientHeight)) {
            wisepopOverlayWidth     = document.body.clientWidth;
            wisepopOverlayHeight    = document.body.clientHeight;
        }

        var wrapper = this.getContainer();

        var sizes, i;

        // Setting popin x position
        if (wisepopOverlayWidth < popWidth) {
            var padLeft = parseInt(pop.style.paddingLeft);
            var padRight = parseInt(pop.style.paddingRight);
            var bordLeft = parseInt(pop.style.borderLeftWidth);
            var bordRight = parseInt(pop.style.borderRightWidth);
            sizes = [padLeft, padRight, bordLeft, bordRight];
            var newWidth = wisepopOverlayWidth - 5;
            for (i = 0; i < sizes.length; i++) {
                if (!isNaN(sizes[i])) {
                    newWidth -= sizes[i];
                }
            }
            pop.style.width = newWidth + "px";
            pop.style.left = "2px";
            pop.style.marginLeft = "0px";
        }
        else {
            switch (this.options.position) {
                case 'center':
                case 'bottom_center':
                    pop.style.marginLeft = (-popWidth/2) + "px";
                    pop.style.left = "50%";
                    break;
                case 'center_right' :
                case 'bottom_right' :
                    pop.style.marginLeft = (wisepopOverlayWidth - (popWidth + 15)) + "px";
                    pop.style.left = "0";
                    break;
                case 'center_left' :
                case 'bottom_left' :
                    pop.style.marginLeft = "15px";
                    pop.style.left = "0";
                    break;
            }
        }

        // Setting popin y position
        if (wisepopOverlayHeight < popHeight) {
            var padTop = parseInt(pop.style.paddingTop);
            var padBottom = parseInt(pop.style.paddingBottom);
            var bordTop = parseInt(pop.style.borderTopWidth);
            var bordBottom = parseInt(pop.style.borderBottomWidth);
            sizes = [padTop, padBottom, bordTop, bordBottom];
            var newHeight = wisepopOverlayHeight - 5;
            for (i = 0; i < sizes.length; i++) {
                if (!isNaN(sizes[i])) {
                    newHeight -= sizes[i];
                }
            }

            pop.style.height = newHeight + "px";
            pop.style.top = "10px";
            pop.style.marginTop = "0px";
            pop.style.overflow = "auto";
            var rocked = document.getElementById('wisepop-rocked');
            if (rocked != undefined) {
                rocked.style.display = "none";
            }
        }
        else {
            switch (this.options.position) {
                case 'center' :
                    pop.style.marginTop  = (- popHeight/2) + "px";
                    pop.style.top = "50%";
                    break;
                case 'bottom_right':
                case 'bottom_left':
                case 'bottom_center':
                    pop.style.marginTop = (wisepopOverlayHeight - (popHeight + 10)) + "px";
                    pop.style.top = "0";
                    break;
                case 'center_left' :
                case 'center_right' :
                    pop.style.marginTop = ((wisepopOverlayHeight/2) - (popHeight/2)) + "px";
                    pop.style.top = "0";
                    break;
            }
        }
    };


    Wisepops.prototype.hide = function() {
        this.getContainer().style.visibility = 'hidden';
    };

    Wisepops.prototype.init = function() {
        var that = this;
        var loaded = false;

        function onLoad() {
            if (!loaded) {
                loaded = true;
                that.insertIntoPage(function(){
                    that.updatePosition();
                    that.correctSeparatorWidth();
                    that.display();
                });
            }
        }

        // bind on load event or trigger manually if page already loaded
        if(window.addEventListener){
            window.addEventListener('load', onLoad, false); //W3C
        } else {
            window.attachEvent('onload', onLoad); //IE
        }
        if (document.readyState === "complete") { // page already loaded
            onLoad();
        }

        var resize = window.onresize;
        window.onresize = function() {
            that.updatePosition();
            that.correctSeparatorWidth();
        }
    };

    var w = new Wisepops(fileString, iDiv, options);
    w.init();

})(iDiv, fileString);
};
        		function ready() {
					if (!document.body) {
        				return setTimeout(ready, 13);
        			} else {
				        var iDiv = document.createElement('div');
				        iDiv.id = 'wisepop-main-container';
                        addWisepopJs(iDiv, "<style type=\"text\/css\"> .wisepop-popin { font-family: Arial, Helvetica, sans-serif; padding: 20px !important; -webkit-font-smoothing: subpixel-antialiased; } .wisepop-popin > div:last-child, #wisepop-content > div:last-child { margin-bottom: 0 !important; } .wisepop-content { position: relative; } .wisepop-popin *, .wisepop-popin p, .wisepop-popin a, .wisepop-popin strong, .wisepop-popin em, .wisepop-popin span, .wisepop-popin ul, .wisepop-popin li, .wisepop-popin input, .wisepop-popin button { margin: 0; padding: 0; font-family: inherit; } .wisepop-popin hr { border: 0; border-top: 1px solid #eee; border-bottom: 1px solid #fff; } .wisepop-popin input{ padding: 4px 6px; margin-right: 0px; } .wisepop-popin p{ margin-bottom: 10px; } .wisepop-popin strong{ font-weight: bold; } .wisepop-popin em{ font-style: italic; font-family: inherit; } .wisepop-popin .optin-block{ margin: 0 auto; text-align: center; } .wisepop-popin input{ margin-right: 0; } .wisepop-popin .optin-block input:first-child{ margin-right: 0px; } .wisepop-popin input[type=\"text\"] { color: #999; border: 1px solid #cccccc; -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075); -moz-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075); box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075); -webkit-transition: border linear 0.2s, box-shadow linear 0.2s; -moz-transition: border linear 0.2s, box-shadow linear 0.2s; -o-transition: border linear 0.2s, box-shadow linear 0.2s; transition: border linear 0.2s, box-shadow linear 0.2s; display: inline-block; font-size: 14px; line-height: 20px; vertical-align: middle; -webkit-border-radius: 4px; -moz-border-radius: 4px; border-radius: 4px; font-family: Arial, Helvetica, sans-serif; font-weight: 300; } .wisepop-popin input[type=\"submit\"], a.wisepop-building-block-action { font-family: 'Arial,Helvetica, sans-serif'; font-weight: 300; } .wisepop-popin p { font-family: 'Arial, Helvetica,sans-serif'; font-weight: 300; color: #5e5e64; } .wisepop-popin h1 { font-family: 'Arial, Helvetica,sans-serif'; font-weight: 700; color: #5e5e64; font-size: 28px; line-height: 41.59375px; } .wisepop-background-image { width: 100%; height: 100%; position: absolute; top: 0; left: 0; z-index: 0; } .wisepop-close { display: inline-block; position: absolute; top:11px; right:12px; color: #fff; font-weight: bold; z-index: 1; } <\/style> <style type=\"text\/css\"> <\/style> <div id=\"wisepop-modal-32890\" style=\"line-height: normal;visibility:hidden;\"> <div id=\"wisepop-overlay-32890\" class=\"wisepop-overlay\" style=\"position: fixed; width: 100%; height: 100%; top: 0; left: 0; z-index: 9999999; background-color: #000000; opacity: 0.5; filter: alpha(opacity=50); filter:progid:DXImageTransform.Microsoft.Alpha(Opacity=50);\" data-close-on-click=\"1\" > <\/div> <div id=\"wisepop-32890\" class=\"wisepop-popin\" style=\"box-sizing: content-box; border-style: solid; padding: 20px; position: fixed; top: 50%; margin-top: -160px; left: 50%; margin-left: -230px; filter: alpha(opacity=100); z-index: 10000000; width: 460px; border-width: 0px; border-radius: 0px; background-color: #fcfcfc; border-color: #eaeaea;\"> <a class=\"wisepop-close\" id=\"close-wisepop-32890\" href=\"javascript:;\" style=\"display:none\" > <img style=\"border:none\" src=\"\/\/wisepops.com\/static\/images\/wisepop-close-button2.png\" alt=\"Close this popin\" \/> <\/a> <div id=\"wisepop-content\" class=\"wisepop-content\"> <style type=\"text\/css\">@font-face { font-family: 'Raleway'; font-style: normal; font-weight: 400; src: local('Raleway'), url(\/\/fonts.gstatic.com\/s\/raleway\/v9\/IczWvq5y_Cwwv_rBjOtT0w.woff) format('woff'); }<\/style> <div class=\"\" style=\"margin-bottom: 15px;\"> <span style=\"font-size:12px;\"><h1 style=\"text-align:center;\"><span style=\"font-family:Raleway;\"><span style=\"color:#404040;\">Get our Free eBook!<\/span><\/span><\/h1> <div><\/div><\/span><\/div><div style=\"margin-bottom: 15px;\"> <div> <img src=\"\/\/wisepops.com\/shared\/images\/wisepops\/32890\/29415e63055d2a399ff51403ea8e33e0.png\" style=\"display: block; margin: auto; margin-bottom:10px;max-width:100%;\" \/> <p style=\"text-align:center;\"><font face=\"Raleway\" style=\"font-family:Raleway;\"><span style=\"font-size:18px;line-height:30px;\">Get CMS Critic's first eBook for free! Just enter your email below to start the download.<\/span><\/font><\/p> <div><\/div> <div><\/div> <div><\/div> <div><\/div> <div><\/div> <div><\/div> <div style=\"display: block;height: 0;clear: both;visibility: hidden;\"><\/div> <\/div> <\/div> <div class=\"\" style=\"margin-bottom: 15px;\"> <div class=\"optin-block\" style=\"text-align:center;\"> <div id=\"wisepop-optin-buttons\" > <input data-required=\"1\" type=\"text\" name=\"optin-email\" style=\" min-height: 10px; height: 32px; line-height: normal; -moz-box-sizing: border-box; box-sizing: border-box; padding: 3px 14px; font-family: 'Raleway'; font-size: 14px; min-width: 200px; vertical-align: top; margin-bottom: 0px; width : 50% !important; border-top-left-radius:2px; border-bottom-left-radius:2px; \" placeholder=\"Your email\" > <input class=\"wisepop-building-block-optin\" type=\"submit\" value=\"Download now!\" style=\" display: inline-block; background-image: none; min-height: 10px; height: 32px; line-height: 32px; padding: 0 14px; border: 0px solid white; position: relative; -moz-box-sizing: border-box; box-sizing: border-box; color: #ffffff; background-color: #0f52ba; font-family: 'Raleway'; font-size: 14px; vertical-align: top; width : auto; right: 6px !important; border-top-right-radius:2px; border-bottom-right-radius:2px; border-bottom: 4px solid rgb(13, 70, 158);border-bottom: 4px solid rgba(39,65,90, 0.3); zoom: 1;\" > <\/div> <div id=\"wisepop-optin-infos\"> <input type=\"hidden\" id=\"wisepop_optin_active_confirm\" name=\"wisepop_optin_active_confirm\" value=\"url\" \/> <a id=\"wisepop_optin_active_redirect\" href=\"https:\/\/s3.amazonaws.com\/cmscritic-ebooks\/20+Free+or+Inexpensive+Tools+to+Complement+your+CMS.pdf\" target=\"_blank\" data-ignore-tracking=\"1\" style=\"display:none\" ><\/a> <div id=\"wisepop_optin_error_optin-email\" style=\"display:none;padding:3px;color:darkred;font-size: 12px;text-align: center;\" >Invalid email.<\/div> <div id=\"wisepop_optin_message_confirm\" style=\"display:none;padding-left: 3%;bottom: 2%;text-align: center;\" >Thank you for signing up. <a href=\"https:\/\/s3.amazonaws.com\/cmscritic-ebooks\/20+Free+or+Inexpensive+Tools+to+Complement+your+CMS.pdf\">Click here<\/a> to download your free ebook.\u00a0 <div><\/div> <div><\/div> <div><\/div> <div><\/div> <div><\/div><\/div> <\/div> <\/div> <\/div> <\/div> <style type=\"text\/css\"> @font-face { font-family: 'Open Sans'; font-style: normal; font-weight: 400; src: local('Open Sans'), local('OpenSans'), url(\/\/themes.googleusercontent.com\/static\/fonts\/opensans\/v8\/uYKcPVoh6c5R0NpdEY5A-Q.woff) format('woff'); } <\/style> <div style=\"height:15px\"><\/div> <div id=\"wisepop-rocked\" class=\"rocketed\" style=\"position: absolute; bottom: 5px; right: 0px; text-align: right; color: #D4D4D4; height: 21px; font-family: Arial,Helvetica,sans-serif; margin: 0; padding: 0;\"> <a style=\"margin: 0; padding: 5px 8px; background-color: transparent; display: inline-block; text-decoration: none; font-size: 10px; color: #D4D4D4; font-family: 'Open Sans', Arial,Helvetica,sans-serif; background-color: transparent; text-transform: uppercase;\" href=\"\/\/www.wisepops.com\/?utm_source=http:\/\/www.cmscritic.com&utm_medium=poweredby&utm_campaign=Powered+by\" target=\"blank\">Powered by <span style=\"text-decoration:none;\">WisePops<\/span><\/a> <\/div> <\/div> <\/div> <script type=\"text\/javascript\"> <\/script> ");
        			}
    			};

        		(function(){ ready(); })();