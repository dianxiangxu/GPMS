// GAK 12/01/2011: This is included everywhere so have to use prototype vs jquery

var ReportSpam = (function() {

    // Capture when report Spam action has been started
    var start;
    
    // Min time in msec to wait before transition to final message
    var transitionTime = 1000;
        
    // Some pages do not have prototype sourced so have to check to make sure
    // prototype is available before making Report Spam functionality available
    function checkPrototype(numTries) {
        try {
            if (typeof Prototype !== 'undefined') {
                $("report_spam_div").appear();
            } else if (numTries++ <= 10) {
                setTimeout(function(){checkPrototype(numTries)}, 1000);
            }
        } catch (err) {}
    }

    function reported() {
        // Give user enough time to see status changes
        var now = (new Date()).getTime();
        var timeDiff = now - start;
        if (timeDiff < transitionTime) {
            setTimeout(reported, transitionTime - timeDiff);
            return;
        }
    
        $("spinner").remove();
        $("report_spam").hide();
        $("report_spam_ty").appear();
        
        setTimeout(finished, 2000);
    }

    function finished() {
        $("report_spam_ty").fade();
    }
    
    checkPrototype(0);
    return {
        add: function(c, v, id) {            
            var spinner = new Element("img", {id: 'spinner', src: '/images/loader.gif'});
            $("report_spam_div").appendChild(spinner);
        
            start = (new Date()).getTime();
        
            try {
                new Ajax.Request('ReportSpam.psp', {
                    method: 'GET',
                    parameters: 'c=' + c + '&v=' + v + '&id=' + id,
                    onComplete: reported
                });
            } catch (err) {
                reported();
            }
        }
    };

}());

