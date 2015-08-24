function toggleServiceIntro(elm) {

    toggleParentClassByClassName(elm, 'showFull', 'div', 'service_intro');

}

var submitcount = 0;

var currCell = 0;

function sortTable(cell, sortLink) {

    var sorttable = document.getElementById('select_offer_sort_table');

    currCell = cell;

    var dataTBodies = new Array();

    for ( var i = 0; i < sorttable.tBodies.length; i++)

    {

        dataTBodies[dataTBodies.length] = sorttable.tBodies[i];

    }

    if (cell == 0) {

        dataTBodies.sort(sortString);

    } else if (cell == 1) {

        dataTBodies.sort(sortDateCell);

    }

    if (sortLink)

    {

        if (sortLink.className == "down") {

            dataTBodies.reverse();

            sortLink.className = "up";

        } else {

            sortLink.className = "down";

        }

    }

    for ( var i = 0; i < dataTBodies.length; i++) {

        tmpVar = dataTBodies[i];

        dataTBodies[i].parentNode.removeChild(dataTBodies[i]);

        sorttable.appendChild(tmpVar);

    }

    var ths = sorttable.getElementsByTagName('th');

    for ( var i = 0; i < ths.length; i++)

    {
        var theLink = ths[i].getElementsByTagName('a')[0];

        if (theLink)

        {

            if (theLink.id != sortLink.id)

            {

                theLink.className = "";

            }

        }

    }

}

function sortString(a, b) {

    var temp1 = a.rows[1].cells[currCell].innerHTML;

    var temp2 = b.rows[1].cells[currCell].innerHTML;

    if (temp1.toLowerCase().indexOf('<table') != -1)
        temp1 = getTableContent(temp1);

    if (temp2.toLowerCase().indexOf('<table') != -1)
        temp2 = getTableContent(temp2);

    if (temp1 == temp2)
        return 0;

    return (temp1 < temp2) ? -1 : 1;

}

function getTableContent(temp) {

    var tdindex = temp.toLowerCase().indexOf('<td');

    var tdendindex = temp.indexOf('>', tdindex);

    var tdcloseindex = temp.toLowerCase().indexOf('</td>');

    if (tdendindex != -1 && tdcloseindex != -1) {

        temp = temp.substring(tdendindex + 1, tdcloseindex);

    }

    return temp;

}

function sortNumber(a, b) {

    var temp1 = parseFloat(a.rows[1].cells[currCell].innerHTML);

    var temp2 = parseFloat(b.rows[1].cells[currCell].innerHTML);

    return temp1 - temp2;

}

function sortDateCell(a, b) {

    var date1 = a.getAttribute('duraDate');

    var date2 = b.getAttribute('duraDate');

    date1 = reformatDate(date1);

    date2 = reformatDate(date2);

    var temp1 = parseFloat(date1);

    var temp2 = parseFloat(date2);

    return temp1 - temp2;

}

function reformatDate(date) {

    var index1 = date.indexOf('/');

    var index2 = date.indexOf('/', index1 + 1);

    var month = date.substring(0, index1);

    var day = "";

    var year = "";

    if (index2 == -1)
        index2 = date.length;

    else {

        year = date.substring(index2 + 1, date.length);

    }

    var day = date.substring(index1 + 1, index2);

    date = year + month + day;

    return date;

}

function getDim(el) {

    for ( var lx = 0, ly = 0; el != null; lx += el.offsetLeft, ly += el.offsetTop, el = el.offsetParent)
        ;

    return {
        x : lx,
        y : ly
    }

}

var btcounter = '';

function toggleBalconEdit(btAvailableURL, elm, paySwitch, btcount) {

    if (btcount.indexOf('btcount') != -1)

    {

        var p = btcount.split("btcount", 2);

        btcount = p[1];

    }
    
    //Correct citi to citi balance transfer issues start
    var actualBtCount = btcount;
    //Correct citi to citi balance transfer issues end

    var payBody = getParentByTagName(elm, 'tbody');

    if (paySwitch == 'fixed')

    {

        // Fix for Verify page

        var inputRowElm = getParentByTagAndClassName(elm, 'tr', 'inputRow');

        if (inputRowElm)

        {

            var lineElm = getElementsByClassName(inputRowElm, 'td', 'lineNum');

            btcount = lineElm[0].innerHTML.substring(0, 1);

            btcounter = btcount;

        }

        // alert("Counter:::"+btcounter);
        
      //Correct citi to citi balcon issues start, changed argument list to pass btcount
        //updateAvailBT(elm, 'bt');
        updateAvailBT(elm, 'bt', actualBtCount);
      //Correct citi to citi balcon issues changes end

    } else if (paySwitch == 'edit') {

        payBody.className = "edit_state";

    }

    btcounter = btcount;

}

function confirmBTSave(elm) {

    //alert('confirmBTSave');

    if (elm) {

        var btelm = elm.getElementsByTagName('input');

        if (btelm.length > 0) {

            btval = parseFloat(btelm[0].value);

            var amt_elm = getElementsByClassName(elm, 'div', 'amount_val');

            if (amt_elm.length > 0) {

                amt_elm = amt_elm[0];

                if (!isNaN(btval))
                    amt_elm.innerHTML = formatDollar(btval.toString());

                else
                    amt_elm.innerHTML = formatDollar("0");

            }

        }

        elm.className = "norm_state Amount";

    }

}

var curr_BT_elm = "";

var curr_del_value = "";

var newBTRow;

function showDeleteOverlay(btnElm, index) {

    var elm = document.getElementById('overlay_delete_confirm');

    var cloak_elm = document.getElementById('overlay_cloak');

    var h2elm = document.getElementById('h2_delete_overlay');

    var main_elm = document.getElementById('main_container');

    var dimMain = getDim(main_elm);

    curr_BT_elm = btnElm;

    var del_elm = document.getElementById('delete_index');

    if (del_elm)
        del_elm.value = index;

    curr_del_value = index + 1;

    // remove_btAvailableURL = btAvailableURL;

    remove_btnElm = btnElm;

    remove_index = index;

    // Read the Element Number from html

    var inputRowElm = getParentByTagAndClassName(btnElm, 'tr', 'inputRow');

    if (inputRowElm)

    {

        var lineElm = getElementsByClassName(inputRowElm, 'td', 'lineNum');

        // Get the row to create replica when user delete the last row

        var tableElm = getParentByTagName(btnElm, 'table');

        if (!newBTRow)

        {

            newBTRow = getElementsByClassName(tableElm, 'tbody', 'btRow');

        }

        remove_index = parseInt(lineElm[0].innerHTML.substring(0, 1));

        curr_del_value = remove_index;

    }

    dimBtn = getDim(btnElm);

    if (elm)
        elm.style.visibility = "visible";

    if (cloak_elm) {

        var height = document.body.offsetHeight;

        cloak_elm.style.height = height + "px";

        cloak_elm.style.width = screen.width + dimMain.x + "px";

        cloak_elm.style.visibility = "visible";

    }

    elm.style.left = dimMain.x / 2 + "px";

    cloak_elm.style.left = -(dimMain.x / 2) + "px";

    var curScrollY = (typeof window.pageYOffset != 'undefined') ? window.pageYOffset
            : document.documentElement.scrollTop;

    var innerH = (typeof self.innerHeight != 'undefined') ? self.innerHeight
            : document.documentElement.clientHeight;

    elm.style.top = ((innerH - elm.offsetHeight) / 2) + curScrollY + "px";

    h2elm.focus();

}

function showDeleteOverlayInVerify(btAvailableURL, btnElm, index) {

    var elm = document.getElementById('overlay_delete_confirm');

    var cloak_elm = document.getElementById('overlay_cloak');

    var h2elm = document.getElementById('h2_delete_overlay');

    var main_elm = document.getElementById('main_container');

    var dimMain = getDim(main_elm);

    curr_BT_elm = btnElm;

    curr_del_value = index;

    remove_btAvailableURL = btAvailableURL;

    remove_btnElm = btnElm;

    remove_index = index;

    dimBtn = getDim(btnElm);

    if (elm)
        elm.style.visibility = "visible";

    if (cloak_elm) {

        var height = document.body.offsetHeight;

        var width = document.body.offsetWidth;

        cloak_elm.style.height = height + "px";

        cloak_elm.style.width = screen.width + dimMain.x + "px";

        cloak_elm.style.visibility = "visible";

    }

    elm.style.left = dimMain.x / 2 + "px";

    cloak_elm.style.left = -(dimMain.x / 2) + "px";

    var curScrollY = (typeof window.pageYOffset != 'undefined') ? window.pageYOffset
            : document.documentElement.scrollTop;

    var innerH = (typeof self.innerHeight != 'undefined') ? self.innerHeight
            : document.documentElement.clientHeight;

    elm.style.top = ((innerH - elm.offsetHeight) / 2) + curScrollY + "px";

    h2elm.focus();

}

// Used for Verify Page

function showDeleteOverlayVerify(btnElm, index) {

    var elm = document.getElementById('overlay_delete_confirm');

    var cloak_elm = document.getElementById('overlay_cloak');

    var h2elm = document.getElementById('h2_delete_overlay');

    var main_elm = document.getElementById('main_container');

    var dimMain = getDim(main_elm);

    btAvailableURL = btnElm;

    curr_BT_elm = btnElm;

    var del_elm = document.getElementById('delete_index');

    if (del_elm)
        del_elm.value = index;

    curr_del_value = index;

    dimBtn = getDim(btnElm);

    var inputRowElm = getParentByTagAndClassName(btnElm, 'tr', 'inputRow');

    if (inputRowElm)

    {

        var lineElm = getElementsByClassName(inputRowElm, 'td', 'lineNum');

        if (navigator.appName == 'Microsoft Internet Explorer')

            remove_index = parseInt(lineElm[0].innerHTML.substring(16, 17));

        else

            remove_index = parseInt(lineElm[0].innerHTML.substring(15, 16));

        if (isNaN(remove_index))

            remove_index = parseInt(lineElm[0].innerHTML.substring(0, 1));

        curr_del_value = remove_index;

    }

    if (elm)
        elm.style.visibility = "visible";

    if (cloak_elm) {

        var height = document.body.offsetHeight;

        var width = document.body.offsetWidth;

        // Fix for IE-7

        if (navigator.appVersion.indexOf('7.0') >= 0)

        {

            cloak_elm.style.height = 1.7 * height + "px";

        }

        else if (navigator.appName.indexOf('Netscape') >= 0)

        {

            cloak_elm.style.height = 2.0 * height + "px";

        }

        else

        {

            cloak_elm.style.height = height + "px";

        }

        cloak_elm.style.width = screen.width + dimMain.x + "px";

        cloak_elm.style.visibility = "visible";

    }

    elm.style.left = dimMain.x / 2 + "px";

    cloak_elm.style.left = -(dimMain.x / 2) + "px";

    var curScrollY = (typeof window.pageYOffset != 'undefined') ? window.pageYOffset
            : document.documentElement.scrollTop;

    var innerH = (typeof self.innerHeight != 'undefined') ? self.innerHeight
            : document.documentElement.clientHeight;

    elm.style.top = ((innerH - elm.offsetHeight) / 2) + curScrollY + "px";

    h2elm.focus();

}

function confirmBTRemove() {

    if (curr_del_value == 'CheckToSelf' || curr_del_value == 'CheckByMail')

        showDeleteOverlayTmp();

    var myReq = new ajaxReq();

    var index = curr_del_value - 1;

    var params = "DO_ACTION=DELETE&TRF_NUM=" + index + "&SYNC_TOKEN=" + token;

    clickConfirm = "Y"; // User confirms deletion

    hideDeleteOverlay();

    myReq.req('/cards/acq/BTDelete.do', params, finishBTRemove, curr_BT_elm);

    myReq = null;

}

/**
 * This is to remove the already added Creditor transaction from the
 * LoanEnterInfo page.
 * 
 * Here proper action for deleting the loan transaction is fired.
 * 
 * Loan on your Cards project (TPR#: 0809030) - Bijoy Talukder [#BT]
 * 
 */

var clickConfirm = "";

var storedAccountNumber = "";

function confirmLoanRemove() {

    if (curr_del_value == 'CheckToSelf' || curr_del_value == 'CheckByMail')

        showDeleteOverlayTmp();

    var myReq = new ajaxReq();

    var index = curr_del_value - 1;

    var params = "DO_ACTION=DELETE&TRF_NUM=" + index;

    hideDeleteOverlay();

    clickConfirm = "Y";

    hideCreditorDeleteOverlay();

    storedAccountNumber = ""; // Reset the field

    myReq.req('/cards/svc/LoanDelete.do', params, finishBTRemove, curr_BT_elm);

    myReq = null;

}

function confirmCreditorRemove() {

    if (curr_del_value == 'CheckToSelf' || curr_del_value == 'CheckByMail')

        showDeleteOverlayTmp();

    var myReq = new ajaxReq();

    var index = curr_del_value - 1;

    var params = "DO_ACTION=DELETE&TRF_NUM=" + index;

    hideDeleteOverlay();
    if (document.getElementById('loyc-creditor')) {
        document.getElementById('firstCell1').style.display = '';
        if (navigator.appVersion.toLowerCase().indexOf('msie 6')) {
            document.getElementById('MerchantCategory').style.display = '';
        }
    }

    storedAccountNumber = ""; // Reset the field

    myReq.req('/cards/svc/LoanDelete.do', params, finishBTRemove, curr_BT_elm);

    myReq = null;

}

var removeLock = '';

var step2 = false;

function showDeleteOverlayTmp()

{

    if (removeLock == '')

    {

        removeLock = 'locked';

        if (step2 == false)

        {

            var totalBT = "remove=" + remove_index;

            var myReq = new ajaxReq();

            if (typeof remove_btAvailableURL === "undefined"
                    || remove_btAvailableURL == null
                    || remove_btAvailableURL == "") {
                remove_btAvailableURL = "BTDelete.do";
            }

            myReq.req(remove_btAvailableURL, totalBT, removeAvailBT,
                    remove_btnElm);

            myReq = null;

        }

        else

        {

            deleteTransaction();

        }

    }

}

function finishBTRemove(oXML, elm) {
    //alert('finishBTRemove' + oXML.responseText);

    if (oXML.responseText.indexOf('<error>') == -1) {

        if (elm) {

            if (curr_del_value == 'check') {

                var checkelm = document.getElementById('check_container');

                checkelm.parentNode.removeChild(checkelm);

            } else {

                var tableElm = getParentByTagName(elm, 'table');

                var parelm = getParentByTagName(elm, 'tbody');

                if (parelm)
                    parelm.parentNode.removeChild(parelm);

                // alert('Calling Update Lines');

                updateBTLineNums(tableElm);

            }

        }

        writeAvailBT(oXML, elm);//updateAvailBT(elm); // changes mde today from WriteAvailBt(OXML, elm)

        var newRow = getElementsByClassNameFromElement("newRow", "tbody",
                tableElm);
        var btRow = getElementsByClassNameFromElement("btRow", "tbody",
                tableElm);
        if (btRow.length <= 4 && newRow.length == 0
                && tableElm.className.indexOf('enableAdd') == -1) {
            tableElm.className += " enableAdd";

        } else {
            tableElm.className.replace("enableAdd", "");
        }
        // Fix for Showing the Add Another Link if we remove the transaction

        if (tableElm.className.indexOf('maximumBTs') >= 0)

        {

            tableElm.className = tableElm.className.replace("maximumBTs", "");

        }

        else

        {

            try {

                var elmCell2 = document.getElementById('firstCell2');

                if (elmCell2)

                    elmCell2.style.display = 'table-row-group';

            } catch (e) {

                if (document.getElementById('firstCell2'))
                    document.getElementById('firstCell2').style.display = 'block';

            }

            // Logic to Show the Row to enter creditor details

            if (elmCell2)

            {

                var btRows = getElementsByClassNameFromElement('btRow',
                        'tbody', tableElm);

                if (!btRows || btRows.length == 0)

                {

                    addBT(elmCell2);

                }

            }

            // End of Fix

        }

        $('[id^="CREDITOR_TRANSFER_AMOUNT_"]').each(function (index, element) {
            var $this = $(this),
                btRow = getParentByTagName(this, "tbody");

            index++;
            element = $(element);
            if ($this.attr("id") != "CREDITOR_TRANSFER_AMOUNT_" + index) {
                $this.attr("id", "CREDITOR_TRANSFER_AMOUNT_" + index);
                $(btRow).attr("id", "firstCell" + index);
                if (typeof bindBTEventBlur == "function") {
                    element.removeData("BTBlurEvent");
                    bindBTEventBlur(element);
                }
            }
        });
        

        // Fix for Showing AddAnother in Verify Page

        try

        {

            var elmCell1 = document.getElementById('btadd');

            if (elmCell1)

            {

                // Check the No.of Transactions in Verify page

                var summaryTab = getParentByTagAndClassName(elmCell1, 'table',
                        'balconSummary');

                var summaryRows;

                var mailRow;

                var directRow;

                if (summaryTab)

                {

                    summaryRows = getElementsByClassNameFromElement(
                            'norm_state', 'tbody', summaryTab);

                    summaryEditRows = getElementsByClassNameFromElement(
                            'edit_state', 'tbody', summaryTab);

                }

                mailRow = document.getElementById('CheckByMail_Count');

                directRow = document.getElementById('CheckToSelf_Count');

                // If there are no transaction redirect to Step2

                if ((!summaryRows || summaryRows.length == 0)
                        && (!summaryEditRows || summaryEditRows.length == 0)
                        && !mailRow && !directRow)

                    document.location.href = '/cards/svc/BTEnterInfo.do';

                elmCell1.style.display = 'table-row-group';

            }

        } catch (e) {

            if (document.getElementById('btadd'))
                document.getElementById('btadd').style.display = 'block';

        }

    } else {

        handleErrorACQ(oXML.responseText, false);

    }

}

function confirmBTRemoveFromDetails() {

    var myReq = new ajaxReq();

    myReq.req('xml/testXML.xml', 'index=' + curr_del_value,
            finishBTRemoveFromDetails, curr_BT_elm);

    myReq = null;

}

function finishBTRemoveFromDetails(oXML, elm) {

    if (oXML.responseText.indexOf('<error>') == -1) {

        if (elm) {

            var tableElm = getParentByTagName(elm, 'table');

            if (currentBTs <= 1) {

                if (tableElm.className.indexOf('enableAdd') != -1) {

                    tableElm.className = tableElm.className.replace(
                            "enableAdd", "");

                }

                if (tableElm.className.indexOf('maximumBTs') != -1) {

                    tableElm.className = tableElm.className.replace(
                            "maximumBTs", "");

                }

                var tbodyElm = getParentByTagName(elm, 'tbody');

                if (tbodyElm.className.indexOf('textMode') != -1) {

                    tbodyElm.className = tbodyElm.className.replace("textMode",
                            "");

                }

                var inputs = tbodyElm.getElementsByTagName('input');

                var selects = tbodyElm.getElementsByTagName('select');

                for ( var i = 0; i < inputs.length; i++) {

                    inputs[i].value = "";

                }

                for ( var i = 0; i < selects.length; i++) {

                    selects[i].value = "";

                }

                currentBTs = 1;

            } else {

                if (tableElm.className.indexOf('maximumBTs') != -1) {

                    tableElm.className = tableElm.className.replace(
                            "maximumBTs", "");

                }

                var parelm = getParentByTagName(elm, 'tbody');

                if (parelm)
                    parelm.parentNode.removeChild(parelm);

                if (tableElm) {

                    var bts = getElementsByClassName(tableElm, 'td', 'lineNum');

                    for ( var i = 0; i < bts.length; i++) {

                        bts[i].innerHTML = (i + 1) + ".";

                    }

                }

                currentBTs--;

            }

            updateBTLineNums(tableElm);

        }

        hideDeleteOverlay();

        updateAvailBT("true");

    } else {

        handleErrorACQ(oXML.responseText, false);

    }

}

function updateBTLineNums(tableElm) {

    // alert("Entered Line Update");

    var elms = getElementsByClassName(tableElm, 'td', 'lineNum');

    var amtelms = getElementsByClassName(tableElm, 'td', 'amt');

    var loadiingelms = getElementsByClassName(tableElm, 'td', 'loading');

    var feeElms = getElementsByClassName(tableElm, 'td', 'fee');

    var btRows = getElementsByClassName(tableElm, 'tbody', 'btRow');

    for ( var i = 0; i < elms.length; i++) {

        if (elms[i])
            elms[i].innerHTML = (i + 1) + ".";

    }

    for ( var j = 0; j < amtelms.length; j++) {

        // alert(amtelms[j].childNodes[1].childNodes[1].id);

        // Fix for Verify page

        if (amtelms[j].childNodes[0].id
                && amtelms[j].childNodes[0].id.indexOf("amount_val") != -1)

        {

            amtelms[j].childNodes[0].id = "amount_val_" + (j + 1);

            // amtelms[j].childNodes[1].childNodes[1].id = "Amount_" + (j + 1);

        }

        else if (amtelms[j]) {

            // amtelms[j].childNodes[0].id = "Amount_" + (j + 1);
        }

        // alert(amtelms[j].childNodes[1].childNodes[1].id);

    }

    for ( var k = 0; k < loadiingelms.length; k++) {

        if (loadiingelms[k])

        {

            loadiingelms[k].childNodes[0].id = "LOADING_IMG" + (k + 1);

            loadiingelms[k].childNodes[0].id = "check" + (k + 1);

            loadiingelms[k].childNodes[0].id = "VERIFY_IMG" + (k + 1);

            // loadiingelms[k].childNodes[0].id = "LOAD_IMG"+(k+1);

        }

    }

    var elm = document.getElementById('LINENUMD');

    if (elm)
        elm.innerHTML = (btRows.length + 1) + ".";

    // alert("Updated Line No");

}

var onclickArray = new Array();

function onclickObj(elm, fn) {

    this.elm = elm;

    this.onclick = fn;

}

var leaving_href = "";

var onclickFn = "";

function showLeavingOverlay(elm) {

    var overlay_elm = document.getElementById('overlay_leaving_confirm');

    var cloak_elm = document.getElementById('overlay_cloak');

    var h2elm = document.getElementById('h2_leaving_overlay');

    var main_elm = document.getElementById('main_container');

    var dimMain = getDim(main_elm);

    leavingElm = elm;

    dimBtn = getDim(elm);

    if (overlay_elm)
        overlay_elm.style.visibility = "visible";

    if (cloak_elm) {

        var height = document.body.offsetHeight;

        var width = document.body.offsetWidth;

        cloak_elm.style.height = screen.height + dimMain.y + "px";

        cloak_elm.style.width = screen.width + dimMain.x + "px";

        cloak_elm.style.visibility = "visible";

    }

    elm.style.left = dimMain.x / 2 + "px";

    cloak_elm.style.left = -(dimMain.x / 2) + "px";

    var curScrollX = (typeof window.pageXOffset != 'undefined') ? window.pageXOffset
            : document.documentElement.scrollLeft;

    var innerW = (typeof self.innerWidth != 'undefined') ? self.innerWidth
            : document.documentElement.clientWidth;

    overlay_elm.style.left = ((innerW - overlay_elm.offsetWidth) / 4)
            + curScrollX + "px";

    var curScrollY = (typeof window.pageYOffset != 'undefined') ? window.pageYOffset
            : document.documentElement.scrollTop;

    var innerH = (typeof self.innerHeight != 'undefined') ? self.innerHeight
            : document.documentElement.clientHeight;

    overlay_elm.style.top = ((innerH - overlay_elm.offsetHeight) / 2)
            + curScrollY + "px";

    var leavingLink = document.getElementById('confirm_leave');

    for ( var i = 0; i < onclickArray.length; i++) {

        if (onclickArray[i].elm == elm)
            onclickFn = onclickArray[i].onclick;

    }

    if (leavingLink && onclickFn) {

        leavingLink.href = (elm.href) ? elm.href : "#";

        leavingLink.target = (elm.target) ? elm.target : "";

        leavingLink.onclick = onclickFn;

        Event.addEvent(leavingLink, 'click', function() {
            hideLeavingOverlay();
        });

    } else if (leavingLink) {

        leavingLink.href = (elm.href) ? elm.href : "#";

        leavingLink.target = (elm.target) ? elm.target : "";

        leavingLink.onclick = function() {

            hideLeavingOverlay();

        }

    }

    /** CM DS - Defect 44498 - Begins * */
    try {
        h2elm.focus();
    } catch (err) {
    }
    /** CM DS - Defect 44498 - Ends * */

}

function confirmLeaving() {

    if (!onclickFn()) {

        hideLeavingOverlay();

        onclickFn();

    }

}

function hideDeleteOverlay() {

    var elm = document.getElementById('overlay_delete_confirm');

    if (elm)
        elm.style.visibility = "hidden";

    var cloak_elm = document.getElementById('overlay_cloak');

    if (cloak_elm)
        cloak_elm.style.visibility = "hidden";

}

function hideLeavingOverlay() {

    var elm = document.getElementById('overlay_leaving_confirm');

    if (elm)
        elm.style.visibility = "hidden";

    var cloak_elm = document.getElementById('overlay_cloak');

    if (cloak_elm)
        cloak_elm.style.visibility = "hidden";

}

var checkDestination = "";

function selectCheckDest(type, elm) {

    var tableElm = getParentByTagName(elm, 'table');

    if (tableElm) {

        if (type == "mail") {

            if (tableElm.className.indexOf('showByMail') == -1)
                tableElm.className += " showByMail";

            if (tableElm.className.indexOf('showByDeposit') != -1)
                tableElm.className = tableElm.className.replace(
                        "showByDeposit", "");

        } else {

            if (tableElm.className.indexOf('showByDeposit') == -1)
                tableElm.className += " showByDeposit";

            if (tableElm.className.indexOf('showByMail') != -1)
                tableElm.className = tableElm.className.replace("showByMail",
                        "");

        }

    }

    if (checkDestination == "") {

        checkAmountBlur();

        checkDestination = type;

    }

}

function checkAmountBlur() {
    // alert("hgfjjj");
    //var elm = document.getElementById('checkAmount');

    //var elm1 = document.getElementById('checkMail');

    //var elm2 = document.getElementById('checkDeposit');

    //if (elm1 && elm2 && (elm1.checked || elm2.checked)) {

    //  if (elm && elm.value != "")
            updateAvailBT();

}

var btAvailableURL = 'xml/btXML.xml';

function updateAmountBT(elm)

{

    var btRow = getParentByTagAndClassName(elm, "tr", "inputRow");

    var btLineNum;

    var makeCall = 'false';

    if (btRow)

    {

        btLineNum = getElementsByClassName(btRow, "td", "lineNum");

        // Do not call the Update if the account no is not present. it will
        // avoid the Ajax Call

        // If you refresh the page the textFieldLg is not available means with
        // out acct no check we can make Ajax Call.

        var Acct = getElementsByClassName(btRow, "input", "textFieldLg");

        if (Acct[0] && Acct[0].value != "")

        {

            makeCall = 'true';

        }

        else if (!Acct || !Acct[0])

        {

            makeCall = 'true';

            /*
             * var tdAcct = getElementsByClassName(btRow, "td","acct");
             * 
             * 
             * 
             * 
             * 
             * if ( tdAcct && tdAcct[0].innerHTML.indexOf("XXXX") >= 0 ){
             * 
             * btLineNum = getElementsByClassName(btRow, "td","lineNum");
             * 
             * var tableElm = getParentByTagName(elm, 'tbody');
             * 
             * if(tableElm.className.indexOf('ttt') == -1)
             *  {
             * 
             * tableElm.className += ' abc';
             *  }
             *  }
             */

        }

        if (!(parseInt(elm.value, 10) >= 100)) {
            makeCall = 'false';
        }

    }

    var tableElm = getParentByTagName(elm, 'tbody');

    if (makeCall == "true")

    {

        btcounter = btLineNum[0].innerHTML.substring(0, 1);

        tableElm.className += ' abc';

        updateAvailBT(elm);

        btcounter = "";

    }

    else

    {

        return;

    }

}

function updateAvailBT(elm) {

    //alert('updateAvailBT');
    var totalBT = "";

    if (btcounter != '') {

        var btRow = getParentByTagAndClassName(elm, "tr", "inputRow");

        var btelm = getElementsByClassNameFromElement("Amount", "input", btRow);

        if (btelm) {

            var btamount = btelm[0].value;

            if (totalBT != "")
                totalBT += "&";

            totalBT += "btvalue" + btcounter + "=";

            totalBT += btamount;

            // alert("Value to Backend:::"+totalBT);

        }

    }

    if (!elm) {

        if (document.getElementById('checkAmount')
                && (document.getElementById('checkMail').checked || document
                        .getElementById('checkDeposit').checked)) {

            var btamount = document.getElementById('checkAmount').value;

            if (totalBT != "")
                totalBT += "&";

            totalBT += "checkvalue=";

            totalBT += btamount;

            totalBT += "&checkmethod=";

            totalBT += (document.getElementById('checkMail').checked) ? document
                    .getElementById('checkMail').value
                    : document.getElementById('checkDeposit').value;

        }

    } else {

        if (document.getElementById('checkAmount')) {

            var btamount = document.getElementById('checkAmount').value;

            if (totalBT != "")
                totalBT += "&";

            totalBT += "checkvalue=";

            totalBT += btamount;

        }

    }

    var myReq = new ajaxReq();

    myReq.req('/cards/acq/calculateBTAmountAjax.do', totalBT + "&SYNC_TOKEN="
            + token, writeAvailBT, elm);

    myReq = null;
//  alert('Me came end BTUpdateAmount.do');

}

function writeAvailBT(oXML, xml_elm) {

    var subtotal, total_fees, total_xfer;

    str = oXML.responseText;
//  alert('me in writeAvailBT' + str);

    var msgDiv;

    var btRow = getParentByTagAndClassName(xml_elm, "tbody", "btRow");

    if (btRow)

    {

        var msgElm = getElementsByClassName(btRow, "div", "msg");

        msgDiv = msgElm[0];

    }

    var tableElm = getParentByTagName(xml_elm, 'tbody');

    if (tableElm) {

        if (tableElm.className.indexOf('abc') != -1)
            tableElm.className = tableElm.className.replace("abc", "");

    }

    if (oXML.responseText.indexOf('<error>') == -1) {

        // Fix for Mozilla

        if (oXML.responseXML || oXML.responseText) {

            if (msgDiv)
                msgDiv.innerHTML = "";

            var responseText = oXML.responseText;

            var availAmtStartTag = '<avail_amt>';

            var availAmtStart = responseText.indexOf(availAmtStartTag);

            var newAvailAmount = responseText.substring(availAmtStart
                    + availAmtStartTag.length, responseText
                    .indexOf('</avail_amt>'));

            var subtotalStartTag = '<subtotal>';

            var subtotalAmtStart = responseText.indexOf(subtotalStartTag);

            subtotal = responseText.substring(subtotalAmtStart
                    + subtotalStartTag.length, responseText
                    .indexOf('</subtotal>'));

            var totalFeesStartTag = '<total_fees>';

            var totalFeesStart = responseText.indexOf(totalFeesStartTag);

            total_fees = responseText.substring(totalFeesStart
                    + totalFeesStartTag.length, responseText
                    .indexOf('</total_fees>'));

            var xferStartTag = '<total_xfer>';

            var xferStart = responseText.indexOf(xferStartTag);

            total_xfer = responseText.substring(
                    xferStart + xferStartTag.length, responseText
                            .indexOf('</total_xfer>'));

            var feeStartTag = '<fee>';

            var feeStart = responseText.indexOf(feeStartTag);

            newfee = responseText.substring(feeStart + feeStartTag.length,
                    responseText.indexOf('</fee>'));

            var monthlyPaymentStartTag = '<monthly_payment>';
            var newmonthlyAmount = "";
            var newMinDue = "";
            var monthlyPaymentStart = responseText
                    .indexOf(monthlyPaymentStartTag);

            if (monthlyPaymentStart != null) {
                newmonthlyAmount = responseText.substring(monthlyPaymentStart
                        + monthlyPaymentStartTag.length, responseText
                        .indexOf('</monthly_payment>'));
            }
            var minDueStartTag = '<minimum_due>';

            var minDueStart = responseText.indexOf(minDueStartTag);
            if (minDueStart != null) {
                newMinDue = responseText.substring(minDueStart
                        + minDueStartTag.length, responseText
                        .indexOf('</minimum_due>'));

            }
            var mindue_elm = document.getElementById('mindue');
            if (mindue_elm)
                mindue_elm.innerHTML = newMinDue;
            var pypamount_elm = document.getElementById('pypAmount');
            if (pypamount_elm) {
                if (newmonthlyAmount != 0) {
                    pypamount_elm.value = newmonthlyAmount;
                } else {
                    pypamount_elm.value = "";
                }

            }

            var loanduration_elm = document.getElementById('loanduration');
            var pypDuration_elm = document.getElementById('pypDuration');

            var loanDurationStartTag = '<loan_duration>';
            var newloanDuration = "";
            var loanDurationStart = responseText.indexOf(loanDurationStartTag);
            if (loanDurationStart != null) {
                newloanDuration = responseText.substring(loanDurationStart
                        + loanDurationStartTag.length, responseText
                        .indexOf('</loan_duration>'));

            }
            if (loanduration_elm)
                loanduration_elm.innerHTML = newloanDuration + " Months";
            if (pypDuration_elm)
                pypDuration_elm.value = "";

            var sub_elm = document.getElementById('subtotal');

            var fees_elm = document.getElementById('total_fees');

            var xfer_elm = document.getElementById('total_xfer1');

            var xfer_elm2 = document.getElementById('total_xfer2');

            var remaining_elm = document.getElementById('total_remain1');

            var remaining_elm2 = document.getElementById('total_remain2');

            if (sub_elm && subtotal)
                sub_elm.innerHTML = subtotal;

            if (fees_elm && total_fees)
                fees_elm.innerHTML = total_fees;

            if (xfer_elm && total_xfer)
                xfer_elm.innerHTML = total_xfer;

            if (xfer_elm2 && total_xfer)
                xfer_elm2.innerHTML = total_xfer;

            if (remaining_elm && newAvailAmount)
                remaining_elm.innerHTML = newAvailAmount;

            if (remaining_elm2 && newAvailAmount)
                remaining_elm2.innerHTML = newAvailAmount;

            // To refresh the new fee as well as the amount for amount updated
            // from Verify page.

            if (btcounter != '')

            {

                var inputRow = getParentByTagAndClassName(xml_elm, "tr",
                        "inputRow");

                if (inputRow)

                {

                    var Amt_Elm = getElementsByClassName(inputRow, "input",
                            "Amount");

                    var updatedAmt = Amt_Elm[0].value;

                    var fee_elm = getElementsByClassName(inputRow, "td", "fee");

                    // if (amount_elm && amount_elm.value != '')
                    // amount_elm.value =
                    // document.getElementById('Amount_'+btcounter).value;

                    if (fee_elm && fee_elm[0] && newfee)
                        fee_elm[0].innerHTML = newfee;

                    var amt_elm = getElementsByClassName(inputRow, "div",
                            "amount_val");

                    if (amt_elm && amt_elm[0]) {

                        var payBody = getParentByTagName(xml_elm, 'tbody');

                        payBody.className = "norm_state";

                        amt_elm[0].innerHTML = "$" + updatedAmt;

                    }

                }

            }

            // Check To Self Section

            if (btcounter != '' && btcounter == 'check') {

                var amount_check = document.getElementById('checkAmount');

                var fee_check = document.getElementById('fee_check');

                if (amount_check && amount_check.value != '')
                    amount_check.value = document.getElementById('checkAmount').value;

                if (fee_check && newfee)
                    fee_check.innerHTML = newfee;

                var payBody_check = getParentByTagName(xml_elm, 'tbody');

                payBody_check.className = "norm_state";

                var amt_check = document.getElementById('amount_check');

                amt_check.innerHTML = "$" + amount_check.value;

            }

            if (btcounter != '' && btcounter == 'direct') {

                var amount_checkDD = document.getElementById('checkAmount');

                var fee_checkDD = document.getElementById('fee_checkDD');

                if (amount_checkDD && amount_checkDD.value != '')
                    amount_checkDD.value = document
                            .getElementById('checkAmount').value;

                if (fee_checkDD && newfee)
                    fee_checkDD.innerHTML = newfee;

                var payBody_check = getParentByTagName(xml_elm, 'tbody');

                payBody_check.className = "norm_state";

                var amt_check = document.getElementById('amount_directDeposit');

                amt_check.innerHTML = "$" + amount_checkDD.value;

            }

            // Clearing the Error text in verify page

            var s = responseText.split("<idx>", 2);

            if (s[1])

            {

                s = s[1].split("</idx>", 2);

                var idx = s[0];

                if (idx > 0 && !msgDiv)

                {

                    var done = false;

                    var x = 0;

                    for ( var i = 1; i < 5 && !done; i++)

                    {

                        // var elm = document.getElementById('count_'+i);

                        // if(elm != 'undefined' && elm != null)

                        // {

                        x++;

                        if (idx == x)

                        {

                            // var errelm = document.getElementById('error_'+i);

                            var tbodyElm = getParentByTagAndClassName(xml_elm,
                                    "tbody", "norm_state");

                            if (tbodyElm)

                            {

                                var errelm = getElementsByClassName(tbodyElm,
                                        "div", "error");

                                if (errelm && errelm[0])
                                    errelm[0].innerHTML = '';

                            }

                            done = true;

                        }

                        // }

                    }

                }

                if (idx == '0') {

                    var errelm = document.getElementById('error_check');

                    if (errelm != null)

                        errelm.innerHTML = '';

                }

            }

        }

        if (xml_elm && xml_elm != "true")
            confirmBTSave(xml_elm);

    } else {

        // This if Part is to display the Error message in EnterInfo page, the
        // else part to display the same in verify page.

        if (msgDiv)

        {

            // Display the error message in-line

            var err = oXML.responseText;

            var errMsgStartTag = '<msg>';

            var errMsgStart = err.indexOf(errMsgStartTag);

            errMsg = err.substring(errMsgStart + errMsgStartTag.length, err
                    .indexOf('</msg>'));

            msgDiv.innerHTML = errMsg;

            handleErrorACQ(oXML.responseText, false);

        }

        else if (str.indexOf('<error>') != -1) {

            var s = str.split("<idx>", 2);

            s = s[1].split("</idx>", 2);

            var idx = s[0];

            var s = str.split("<msg>", 2);

            s = s[1].split("</msg>", 2);

            var error = s[0];

            if (idx > 0)

            {

                var done = false;

                var x = 0;

                for ( var i = 1; i < 5 && !done; i++)

                {

                    // var elm = document.getElementById('count_'+i);

                    // if(elm != 'undefined' && elm != null)

                    // {

                    x++;

                    if (idx == x)

                    {

                        // var errelm = document.getElementById('error_'+i);

                        var tbodyElm = getParentByTagAndClassName(xml_elm,
                                "tbody", "edit_state");

                        if (tbodyElm)

                        {

                            var errelm = getElementsByClassName(tbodyElm,
                                    "div", "error");

                            if (errelm && errelm[0])
                                errelm[0].innerHTML = error;

                        }

                        done = true;

                    }

                    // }

                }

            }

            else

            {

                var errelm = document.getElementById('error_check');

                errelm.innerHTML = error;

            }

        }

    }

    submitcount = 0;

}

function initBalconLeaving() {

    /* Fix 14838. TPR P0003512 */
    $("#footer_brand li a").attr('onclick', 'return true;'); // required to
                                                                // allow the
                                                                // footer links
                                                                // to work
    $("div.help_links li a.arrow").attr('onclick', 'return true;'); // required
                                                                    // to allow
                                                                    // Need Help
                                                                    // section
                                                                    // links to
                                                                    // work
    /* End Fix */

    var links = document.getElementsByTagName('a');

    for ( var i = 0; i < links.length; i++) {

        if (links[i].className.indexOf('popup-window') == -1
                && links[i].className.indexOf('no-leaving-overlay') == -1
                && links[i].className.indexOf('citi_link') == -1) {

            if (!links[i].className.indexOf("close_section") == -1) {
                if (!links[i].onclick) {

                    links[i].onclick = function() {
                        showLeavingOverlay(this);
                        return false;
                    }

                } else {

                    onclickArray
                            .push(new onclickObj(links[i], links[i].onclick));

                    links[i].onclick = function() {
                        showLeavingOverlay(this);
                        return false;
                    }

                }
            }
        }

    }

}

function formatDollar(val) {

    if (val.indexOf('.') == -1)
        val += ".00";

    var newval = val.substring(val.indexOf('.'), val.length);

    var count = 0;

    for ( var i = val.indexOf('.') - 1; i >= 0; i--) {

        if (count > 0 && count % 3 == 0) {

            newval = "," + newval;

        }

        count++;

        newval = val.charAt(i) + newval;

    }

    newval = "$" + newval;

    return newval;

}

function showLoading(elm) {

    var tbody = getParentByTagName(elm, 'tbody');

    if (tbody) {

        if (tbody.className.indexOf('showLoading') == -1)
            tbody.className += " showLoading";

    }

}

function hideLoading(elm) {

    var tbody = getParentByTagName(elm, 'tbody');

    if (tbody) {

        if (tbody.className.indexOf('showLoading') != -1)
            tbody.className = tbody.className.replace("showLoading", "");

    }

}

function showLoadingApply(elm) {

    var table = getParentByTagName(elm, 'table');

    if (table) {

        var tbody = getElementsByClassName(table, 'tbody', 'btRow');

        if (tbody)

            if (tbody[tbody.length - 1].className.indexOf('showLoading') == -1)
                tbody[tbody.length - 1].className += " showLoading";

    }

}

function hideLoadingApply(elm) {

    var table = getParentByTagName(elm, 'table');

    if (table) {

        var tbody = getElementsByClassName(table, 'tbody', 'btRow');

        if (tbody)

            if (tbody[tbody.length - 1].className.indexOf('showLoading') != -1)
                tbody[tbody.length - 1].className = tbody[tbody.length - 1].className
                        .replace("showLoading", "");

    }

}

var foundMultiple = 'false';

var unmaskAcct = '';

function findCreditor(elm, url)

{

//Correct citi to citi PCR06 changes start

	var totalRows = $('.inputRow').length;
	var currentNumber = [totalRows-1];
	var amountTemp = "#Amount_";
	//var accountTemp = $('td.acct div.edit #Account')[currentNumber];
	var accountTemp = $('td.acct div.edit #Account');

	//var payToTemp = $('td.payTo div.edit #PayTo')[currentNumber];
	var payToTemp = $('td.payTo div.edit #PayTo');
	
	//Begin Code to hide table if focus is elsewhere
	if ( $(amountTemp+ totalRows) == "" || accountTemp.value == "" || payToTemp.value == ""){

				   return false;

	}
	
	else {
	
		if ($('.finding').css('display') == 'none'){

			$('.finding').css('display','table-row-group');

		}
		
		//Code for Amount Field

		jQuery('.inputRow').find('td.amt input').bind("focus",function() {

						$('.finding').css('display','none');
						//Code to clear values
						$('.finding').find('input').val('');
						$('.finding').find('input, select').val('');
						
						jQuery('.enableEnter').css('display','block');
						jQuery('.disableEnter').css('display','none');

		});
		
		//Code for Account Number Field

		jQuery('.inputRow').find('td.acct input').bind("focus",function() {

						$('.finding').css('display','none');
						//Code to clear values
						$('.finding').find('input').val('');
						$('.finding').find('input, select').val('');

						jQuery('.enableEnter').css('display','block');
						jQuery('.disableEnter').css('display','none');

		});
		
		//Code for Creditor to Pay Field

		jQuery('.inputRow').find('td.payTo input').bind("focus",function() {

						$('.finding').css('display','none');
						//Code to clear values
						$('.finding').find('input').val('');
						$('.finding').find('input, select').val('');
						
						jQuery('.enableEnter').css('display','block');
						jQuery('.disableEnter').css('display','none');

		});
		
		//Correct citi to citi PCR06 changes end

		if (submitcount == 0)

		{

			submitcount++;

			var trElm = getParentByTagName(elm, 'tr');

			var tableElm = getParentByTagName(elm, 'table');

			var allErrors = getElementsByClassName(document, 'div', 'err-msg-full');

			var findCreditorErrors = getElementsByClassName(document, 'div',
					'err-msg');

			for ( var i = 0; i < allErrors.length; i++) {

				allErrors[i].style.display = 'none';

			}

			for ( var i = 0; i < findCreditorErrors.length; i++) {

				findCreditorErrors[i].style.display = 'none';

			}

			if (tableElm.className.indexOf('balconMultiFound') != -1) {

				tableElm.className = tableElm.className.replace("balconMultiFound",
						"");

			}

			if (tableElm.className.indexOf('balconNoneFound') != -1) {

				tableElm.className = tableElm.className.replace("balconNoneFound",
						"");
				
				//Added for Correct Citi to Citi Balcon Issues starts
					jQuery("#State2").css("display","none");
				//Added for Correct Citi to Citi Balcon Issues ends

			}

			var myReq = new ajaxReq();

			var parms = "";

			foundMultiple = 'false';

			unmaskAcct = '';

			showLoading(elm);

			if (trElm) {

				var inputs = trElm.getElementsByTagName('input');

				var selects = trElm.getElementsByTagName('select');

				for ( var i = 0; i < inputs.length; i++) {

					if ((inputs[i].type != "radio" && inputs[i].type != "checkbox")
							|| inputs[i].checked) {

						if (parms != "")
							parms += "&";

						parms += inputs[i].name + "="
								+ encodeURIComponent(inputs[i].value);

					}

					if (inputs[i].name == 'Account')

						unmaskAcct = inputs[i].value;

				}

				for ( var i = 0; i < selects.length; i++) {

					if (parms != "")
						parms += "&";

					parms += selects[i].name + "="
							+ encodeURIComponent(selects[i].value);

				}

			}

			parms += '&Find Creditor=Find Creditor';

			myReq.req(url, parms, doneFindCreditor, elm);

			myReq = null;

		}

		else

		{

			// alert('Already Submitted Find Creditor');

			return false;

		}
		//Correct citi to citi PCR06 changes start
	}
	//Correct citi to citi PCR06 changes end

}

var maskAcct = "";

function doneFindCreditor(oXML, elm) {

    var txt = oXML.responseText;
//  alert('doneFindCreditor - OXML' + txt);

    hideLoading(elm);

    // Added for TPR#0709011A ,where we need to uniquely identify messageDiv to
    // add message before a particular

    // row ,where the error occured. Not before all the rows above.

    // For that message div id has changed from 'msg' to 'msg1', so that with
    // every "add another" row new incremented id will be generated

    var msgDiv;

    var btRow = getParentByTagAndClassName(elm, "tbody", "btRow");

    if (btRow)

    {

        var msgElm = getElementsByClassName(btRow, "div", "msg");

        msgDiv = msgElm[0];

    }

    // var tableElm = getParentByTagName(elm, 'table');

    // var btRows = getElementsByClassName(tableElm, 'tbody', 'btRow');

    // var msgDiv = document.getElementById('msg'+ btRows.length);

    if (oXML.responseText.indexOf('<error>') == -1) {

        if (msgDiv)
            msgDiv.innerHTML = "";

        if (oXML.responseXML) {

            var merchants = oXML.responseXML.getElementsByTagName('merchant');
            var account = oXML.responseXML.getElementsByTagName('account');

            if (account)

                maskAcct = account[0].firstChild.nodeValue;
            // maskAcct = account[0].nodeValue;
        //  alert('inside doneFindCreditor after account');
            if (merchants.length == 1) {
        //      alert('inside doneFindCreditor length 1');
                foundCreditor(elm, merchants, account);

            }

            else if (merchants.length > 1)

            {
            //  alert('inside doneFindCreditor length >1');
                submitcount = 0;

                foundMultiCreditors(elm, merchants, account);

            } else

            {

                submitcount = 0;
        //      alert('inside doneFindCreditor length 0');
                foundNoCreditors(elm);

            }

        }

    } else

    {

        var err = oXML.responseText;

        var errMsgStartTag = '<message>';

        var errMsgStart = err.indexOf(errMsgStartTag);

        errMsg = err.substring(errMsgStart + errMsgStartTag.length, err
                .indexOf('</message>'));

        // Display the error message in-line

        msgDiv.innerHTML = errMsg;

        handleErrorACQ(oXML.responseText, false);

    }

}

//Correct citi to citi PCR06 changes start
var origElm = null;
//Correct citi to citi PCR06 changes end

var waitFlag = ""; // Added for LoYC purpose [#BT]

function foundNoCreditors(elm) {

//Correct citi to citi PCR06 changes start
	origElm = elm;
//Correct citi to citi PCR06 changes end

    waitFlag = ""; // Reset the flag

    var tableElm = getParentByTagName(elm, 'table');

    if (tableElm.className.indexOf('balconNoneFound') == -1)

    {

        tableElm.className += ' balconNoneFound';
        
        //Added for Correct Citi to Citi Balcon Issues starts
			jQuery("#State2").css("display","block");
		//Added for Correct Citi to Citi Balcon Issues ends

        var elm = document.getElementById('some_found')

        var elm2 = document.getElementById('none_found')

        elm.style.display = "none";

        elm2.style.display = "block";
		
		//Correct citi to citi PCR06 changes start
        
        jQuery('.enableEnter').css('display','none');
		jQuery('.disableEnter').css('display','block');
		
		//Correct citi to citi PCR06 changes end

    }

    if (tableElm.className.indexOf('balconMultiFound') != -1) {

        var elm = document.getElementById('some_found');

        // fetching Add Merchant button and moving the focus to that button

        var btnElm = document.getElementById('addMerchBtn');

        elm.style.display = "block";

        elm2.style.display = "none";

        // btnElm.childNodes[0].focus();

    }

}

function foundCreditor(elm, merchants, account) {

    var tBody = getParentByTagName(elm, 'tbody');

    var empty;

    //$('#addNewRow').click();

    applyBT(tBody, merchants[0].firstChild.nodeValue,
            account[0].firstChild.nodeValue, empty, empty, 'Secondcall');

}

function foundMultiCreditors(elm, merchants, account) {

    waitFlag = ""; // Reset the flag

    var tableElm = getParentByTagName(elm, 'table');

    if (tableElm.className.indexOf('balconMultiFound') == -1) {

        tableElm.className = tableElm.className + ' balconMultiFound';

    }

    foundMultiple = 'true';

    var num_text = document.getElementById('num_results');

    if (num_text)
        num_text.innerHTML = merchants.length;

    var merchElm = document.getElementById('Merchant');

    if (merchElm) {

        for ( var i = merchElm.options.length; i > 1; i--) {

            merchElm.options[i - 1] = null;

        }

        for ( var i = 0; i < merchants.length; i++) {

            merchElm.options[merchElm.options.length] = new Option(
                    merchants[i].firstChild.nodeValue,
                    merchants[i].firstChild.nodeValue);

        }

    }

    if ($.browser.msie) {
        $("#bt_results").css("display", "block");
        $(".add_merch_results").css("display", "block");
    }
}

function applyBT(elm, creditor, account, creditparms, creditaddress, indicator) {

    var myReq = new ajaxReq();

    var parms = "";

    // showLoading(elm);

    showLoadingApply(elm);

    var tds = elm.getElementsByTagName('td');

    var btObj = {
        "elm" : elm,
        "valArray" : new Array()
    };

    if (elm.className.indexOf('pending') != -1)
        elm.className = elm.className.replace('pending', '');

    for ( var i = 0; i < tds.length; i++) {

        var creditText = "";

        var textDivs = getElementsByClassNameFromElement('text', 'div', tds[i]);

        var editDivs = getElementsByClassNameFromElement('edit', 'div', tds[i]);

        if (editDivs.length > 0 && textDivs.length > 0) {

            var editVal = "";

            var inputs = editDivs[0].getElementsByTagName('input');

            if (inputs.length > 0) {

                if (inputs[0].className.indexOf("payTo") == -1) {

                    if (maskAcct == "")

                    {

                        editVal = inputs[0].value;

                    }

                    else

                    {

                        editVal = maskAcct;

                    }

                } else {

                    if (creditaddress || checkAddMerchant) {

                        editVal = inputs[0].value;

                        creditText = editVal + creditaddress;

                    } else {

                        editVal = creditor;

                    }

                    if (creditparms) {

                        if (parms != "")
                            parms += "&";

                        parms += creditparms;

                    }

                }

                if (parms != "")
                    parms += "&";

                if (inputs[0].id != 'Account')

                    parms += inputs[0].id + "=" + encodeURIComponent(editVal);

                else

                    parms += inputs[0].id + "=" + unmaskAcct;

            } else {

                var selects = editDivs[0].getElementsByTagName('select');

                if (selects.length > 0) {

                    if (parms != "")
                        parms += "&";

                    parms += selects[0].id + "="
                            + encodeURIComponent(selects[0].value);

                    if (selects[0].value != "") {

                        editVal = selects[0].options[selects[0].selectedIndex].text;

                    }

                }

            }

            if (creditText) {

                editVal = creditText;

                if (elm.className.indexOf('pending') == -1)
                    elm.className += ' pending';

            }

            btObj.valArray[btObj.valArray.length] = {
                "elm" : textDivs[0],
                "value" : editVal
            }

        }

    }

    var URL = '/cards/acq/BTFindCreditorAjax.do?ADD=Y&SYNC_TOKEN=' + token;

    if (creditaddress || (checkAddMerchant != 'undefined' && checkAddMerchant))

    {

        if (foundMultiple == 'true')

        {

            parms += '&MPLSave=Save';

        }

        else

            parms += '&Save=Update';

        // resetting the global js variable to 'false'

        checkAddMerchant = false;

    }

    else if (indicator)

    {

        URL = 'xml/testXML.xml';

    }

    else if (creditor)

    {

        parms += '&MPLSelectSave=Update&PayTo=' + creditor;

    }

    myReq.req(URL, parms, doneApplyBt, btObj);

    myReq = null;

}

function doneApplyBt(oXML, btObj) {
    var txt1 = oXML.responseText;
    //alert('doneApplyBT' + txt1);

    elm = btObj.elm;

    // Added for TPR#0709011A ,where we need to uniquely identify messageDiv to
    // add message before a particular

    // row ,where the error occured. Not before all the rows above.

    // var tableElm = getParentByTagName(elm, 'table');

    // var btRows = getElementsByClassName(tableElm, 'tbody', 'btRow');

    // var msgDiv = document.getElementById('msg'+ btRows.length);

    var msgDiv;

    if (elm)

    {

        var msgElm = getElementsByClassName(elm, "div", "msg");

        msgDiv = msgElm[0];

    }

    // hideLoading(elm);

    hideLoadingApply(elm);

    if (oXML.responseText.indexOf('<error>') == -1) {

        // If Merchant added Successfully, set the maskAcct to blank

        maskAcct = "";

        if (msgDiv)
            msgDiv.innerHTML = "";

        if (btObj.valArray) {

            for ( var i = 0; i < btObj.valArray.length; i++) {

                if (btObj.valArray[i].elm.className.indexOf('nochange') == -1)
                    btObj.valArray[i].elm.innerHTML = btObj.valArray[i].value;

            }

            if (elm.className.indexOf('textMode') == -1)
                elm.className += " textMode";

            elm.className = elm.className.replace("newRow", "");

            var tableElm = getParentByTagName(elm, 'table');

            if (tableElm.className.indexOf('enableAdd') == -1) {

                tableElm.className += " enableAdd";

            }

            if (tableElm.className.indexOf('balconMultiFound') != -1) {

                tableElm.className = tableElm.className.replace(
                        "balconMultiFound", "");

            }

            if (tableElm.className.indexOf('balconNoneFound') != -1) {

                tableElm.className = tableElm.className.replace(
                        "balconNoneFound", "");
                
                //Added for Correct Citi to Citi Balcon Issues starts
					jQuery("#State2").css("display","none");
				//Added for Correct Citi to Citi Balcon Issues ends

            }

            if (tableElm.className.indexOf('enterAddress') != -1) {

                tableElm.className = tableElm.className.replace("enterAddress",
                        "");

            }

        }

        var addressElms = [ 'Address1', 'Address2', 'City2', 'State2', 'Zip2' ];

        for ( var i = 0; i < addressElms.length; i++) {

            var addressElm = document.getElementById(addressElms[i]);

            if (addressElm) {

                addressElm.value = "";

            }

        }

        if (typeof isBTVerify !== "undefined" && isBTVerify) {
            updateAvailBT("true", 'bt');
        } else {
            updateAvailBT("true");
        }

        // Defect 10808
        addNewRowHandler();
        if ($('#balance_transfer_table').length > 0) {        
            $('.norm_state:last').find('.check-amount').unbind().removeData(
                    "BTBlurEvent");
            bindBTEventBlur($('.check-amount'));
        }

    } else

    {

        // Add Merchant Failed due to error

        // we are not resetting the maskAcct

        var err = oXML.responseText;

        var errMsgStartTag = '<message>';

        var errMsgStart = err.indexOf(errMsgStartTag);

        errMsg = err.substring(errMsgStart + errMsgStartTag.length, err
                .indexOf('</message>'));

        // Display the error message in-line

        msgDiv.innerHTML = errMsg;

        handleErrorACQ(oXML.responseText, false);

    }

    // if ($('#balance_transfer_table').length > 0) {
    //     clone();
    //     $('.norm_state:last').find('.check-amount').unbind().removeData(
    //             "BTBlurEvent");
    //     bindBTEventBlur($('.check-amount'));
    // }
}

var currentBTs = 1;

function addBT(elm) {

//Correct citi to citi PCR06 changes start
	$('.finding').css('display','none');
//Correct citi to citi PCR06 changes end

    submitcount = 0;
    var tableElm = getParentByTagName(elm, 'table');

    if (tableElm.className.indexOf('enableAdd') != -1) {

        tableElm.className = tableElm.className.replace("enableAdd", "");

    }

    var btRows = getElementsByClassName(tableElm, 'tbody', 'btRow');

    // Fix for limiting the no. of transactions to 4

    if ($('#balance_transfer_table').length > 0) {
        currentBTs = $('.norm_state').length + 1;
    } else {
        currentBTs = btRows.length;
    }

    // btRows will be null when user deletes the last row.

    if (btRows.length == 0) {

        // newBTRow = 1;
        btRows = newBTRow;

    }

    if (btRows.length > 0) {

        var btRow = btRows[btRows.length - 1];

        var newBT = btRow.cloneNode(true);

        var curnum = btRows.length;

        var oldId = curnum;

        var newId = curnum + 1;

        newBT.id = newBT.id.replace(oldId, newId);

        changeIds(newBT, oldId, newId);

        // Fix for 3640

        var msg = getElementsByClassName(newBT, 'div', 'msg');

        if (msg)

        {

            msg[0].innerHTML = "";

        }

        // End of Fix

        var elm = document.getElementById('bt_results');

        if (elm)
            tableElm.insertBefore(newBT, elm);

        else
            tableElm.appendChild(newBT);

        newBT.className = newBT.className.replace("textMode", "");

        newBT.className = newBT.className.replace("pending", "");

        newBT.className = newBT.className += ' ttt newRow';

        updateBTLineNums(tableElm);

        currentBTs++;

        $(newBT).find('.check-amount').unbind().removeData("BTBlurEvent");
        
        // Defect #10918 fix - clear out cloned values
        $(newBT).find(".acct .text").text("");
        $(newBT).find(".payTo .text").text("");

        if (typeof isBTVerify !== "undefined" && isBTVerify) {
        var fc1s = $('[id="firstCell1"]'),
            fc2s = $('[id="firstCell2"]');

        if (fc2s.length > 1) {
            fc1s.remove();
            $(fc2s[0]).attr('id', 'firstCell1');
        }
        }

        bindBTEventBlur($('.check-amount'));

    }
	
	//Correct citi to citi PCR06 changes start
		
		jQuery('.enableEnter').css('display','block');
		jQuery('.disableEnter').css('display','none');
		
	//Correct citi to citi PCR06 changes end

    if (currentBTs >= 3) {

        if (tableElm.className.indexOf('maximumBTs') == -1) {

            tableElm.className += ' maximumBTs';

        }
        if ($('#balance-transfer-account').length > 0
                && $('#balance-transfer-account').hasClass('maximumBTs')) {
            $('.add_row').hide();
        }

    }

}

function changeIds(elm, oldId, newId) {

    var children = elm.childNodes;

    for ( var i = 0; i < children.length; i++) {

        child = children[i];

        if ('string' == typeof child.id && child.id != "") {

            child.id = child.id.replace(oldId, newId);

            if (child.value && child.value != "")
                child.value = "";

            if (child.name && child.name != "")
                child.name = child.name.replace(oldId, newId);

        }

        if (child.childNodes && child.childNodes.length) {

            changeIds(child, oldId, newId);

        }

    }

}

function applyMerchant(elm, account) {

//  alert('applyMerchant');
    if (submitcount == 0)

    {

        submitcount++;

        if (typeof (elm) == "string") {

            elm = document.getElementById(elm);

        }

        // var iAcctLength = account.trim().length();

        // String strMask = "XXXXXXXXXXXX";

        // if (iAcctLength > 4)

        // {

        // account = strMask + account.substring(iAcctLength - 4);

        // }

        // else

        // {

        // account = strMask + account;

        // }

        if (elm) {

            var merch = elm.value;

            var tableElm = getParentByTagName(elm, 'table');

            if (merch == "") {

                merch = ' ';

            }

            var btRows = getElementsByClassName(tableElm, 'tbody', 'btRow');

            if (btRows.length > 0) {

                var iAcctLength = account.length;

                var strMask = "XXXXXXXXXXXX";

                if (iAcctLength > 4)

                {

                    account = strMask + account.substring(iAcctLength - 4);

                }

                else

                {

                    account = strMask + account;

                }

                var btRow = btRows[btRows.length - 1];
                // alert(btRow);
                // alert(merch);
                // alert(account);
                applyBT(btRow, merch, account);

            }

        }

    }

    else

    {

        // alert('Already Updated the selected Merchant');

        return false;

    }

    if ($.browser.msie) {
        $("#bt_results").css("display", "none");
        $(".add_merch_results").css("display", "none");
    }

}

// Added to capture the event of 'Add' button to add a merchant

// DIT #13

var checkAddMerchant = false;

function applyMerchantAddress(elm)

{

    if (submitcount == 0)

    {

        submitcount++;

        var addressElms = [ 'Address1', 'Address2', 'City2', 'State2', 'Zip2' ];

        var parms = "";

        var address = "";

        // making it 'true' if user click the button

        checkAddMerchant = true;

        if (elm) {

            for ( var i = 0; i < addressElms.length; i++) {

                var addressElm = document.getElementById(addressElms[i]);

                if (addressElm) {

                    if (parms != "")
                        parms += "&";

                    parms += addressElm.id + "="
                            + encodeURIComponent(addressElm.value);

                    if (addressElm.value != "") {

                        if (addressElm.value.length > 8)

                        {

                            var startingIndex = 0;

                            var addressmodified = addressElm.value;

                            while ((startingIndex + 8) < addressElm.value.length)

                            {

                                address += "<br />"
                                        + addressmodified.substring(
                                                startingIndex,
                                                startingIndex + 8);

                                startingIndex = startingIndex + 8;

                                // rowText = rowText.substring(0, lastIndex) +
                                // "</BR>" + rowText.substring(lastIndex,
                                // rowText.length);

                            }

                            address += "<br />"
                                    + addressmodified.substring(startingIndex,
                                            addressElm.value.length);

                        }

                        else {

                            address += "<br />" + addressElm.value;

                        }

                    }

                }

            }

            var tableElm = getParentByTagName(elm, 'table');

            var btRows = getElementsByClassName(tableElm, 'tbody', 'btRow');

            if (btRows.length > 0) {

                var btRow = btRows[btRows.length - 1];

                //$('#addNewRow').click();

                applyBT(btRow, "", "", parms, address);

            }

        }

    }

    else

    {

        // alert('Already Submitted Merchant Address');

        return false;

    }

}

function SimpleDynamicDropdown(dropDownOptions, primaryId, secondaryId) {

    this.pairedOptions = dropDownOptions;

    this.primarySelect = document.getElementById(primaryId);

    this.secondarySelect = document.getElementById(secondaryId);

    var that = this;

    function primaryUpdated() {

        var primaryVal = that.primarySelect.options
                .item(that.primarySelect.selectedIndex).text;

        for ( var i = that.secondarySelect.length, j = 0; i > j; i--) {

            that.secondarySelect.remove(i);

        }

        if (that.primarySelect.selectedIndex == 0) {

            that.secondarySelect.disabled = true;

            return;

        }

        var secondaryOptions = that.pairedOptions[primaryVal];

        if (!secondaryOptions) {

            for ( var option in that.pairedOptions) {

                if (option == primaryVal) {

                    secondaryOptions = that.pairedOptions[option];

                }

            }

        }

        for ( var x = 0, y = secondaryOptions.length; x < y; x++) {

            var newOption = document.createElement("option");

            newOption.appendChild(document.createTextNode(secondaryOptions[x]));

            that.secondarySelect.appendChild(newOption);

        }

        that.secondarySelect.disabled = false;

        // To remove the Status message, after making the request the earlier
        // time

        cb_getElement("submitText").innerHTML = '';

    }

    for ( var primaryOption in this.pairedOptions) {

        var newOption = document.createElement("option");

        newOption.appendChild(document.createTextNode(primaryOption));

        this.primarySelect.appendChild(newOption);

    }

    Event.addEvent(this.primarySelect, "change", primaryUpdated);

}

function ComplexDynamicDropdown(dropDownOptions, primaryId, secondaryId,
        tertiaryId) {

    this.complexOptions = dropDownOptions;

    this.primarySelect = document.getElementById(primaryId);

    this.secondarySelect = document.getElementById(secondaryId);

    this.tertiarySelect = document.getElementById(tertiaryId);

    var that = this;

    function complexPrimaryUpdated() {

        for ( var i = that.tertiarySelect.length - 1, j = 0; i > j; i--) {

            that.tertiarySelect.remove(i);

        }

        that.tertiarySelect.disabled = true;

    }

    function complexSecondaryUpdated() {

        var primaryVal = that.primarySelect.options
                .item(that.primarySelect.selectedIndex).text;

        var secondaryVal = that.secondarySelect.options
                .item(that.secondarySelect.selectedIndex).text;

        for ( var i = that.tertiarySelect.length - 1, j = 0; i > j; i--) {

            that.tertiarySelect.remove(i);

        }

        if (that.secondarySelect.selectedIndex == 0) {

            that.tertiarySelect.disabled = true;

            return;

        }

        var tertiaryOptions = that.complexOptions["" + primaryVal + " "
                + secondaryVal];

        for ( var x = 0, y = tertiaryOptions.length; x < y; x++) {

            var newOption = document.createElement("option");

            newOption.appendChild(document.createTextNode(tertiaryOptions[x]));

            that.tertiarySelect.appendChild(newOption);

        }

        that.tertiarySelect.disabled = false;

    }

    Event.addEvent(this.primarySelect, "change", complexPrimaryUpdated);

    Event.addEvent(this.secondarySelect, "change", complexSecondaryUpdated);

}

function registerRequestPDFStatementEvents() {

    var monthDaySelect = document.getElementById("archive_month_day");

    var formatSelect = document.getElementById("download_format");

    if (monthDaySelect) {

        Event.addEvent(monthDaySelect, "change", monthDayChanged);

    }

    Event.addEvent(formatSelect, "change", registerOilFormatChanged);

}

/*
 * Commented for enabling/disabling download button and custom delimiter text
 * box
 * 
 * 
 * 
 * function registerOilFormatChanged() {
 * 
 * var formatSelect = document.getElementById("download_format");
 * 
 * var formatVal = formatSelect.options.item(formatSelect.selectedIndex).text;
 * 
 * var customTab =
 * document.getElementById("download_custom_delimiter_container");
 * 
 * if (formatVal == "Custom Tab Delimiter") {
 * 
 * customTab.style["display"] = "inline";
 * 
 * customTab.getElementsByTagName("input")[0].value = "";
 *  } else {
 * 
 * customTab.style["display"] = "none";
 * 
 * customTab.getElementsByTagName("input")[0].value = "";
 *  }
 *  }
 */

function registerOilFormatChanged() {

    var formatSelect = document.getElementById("download_format");

    var formatVal = formatSelect.options.item(formatSelect.selectedIndex).text;

    var customTab = document.getElementById("download_custom_delimiter_cont");

    if (formatVal === "Custom Delimiter"
            || formatVal === "Delimitador Personalizado") {

        customTab.style["display"] = "Block";

        customTab.getElementsByTagName("input")[0].value = "";

        document.getElementById('download_button').disabled = true;

        document.getElementById('download_button').src = disabledBtnImage;

    } else {

        customTab.style["display"] = "none";

        customTab.getElementsByTagName("input")[0].value = "";

        // changes to enable and disable the download button.

        if (formatSelect.selectedIndex == 0) {

            document.getElementById('download_button').disabled = true;

            document.getElementById('download_button').src = disabledBtnImage;

        } else {

            document.getElementById('download_button').disabled = false;

            document.getElementById('download_button').src = enabledBtnImage;

        }

    }

}

function registerOilStatementEvents() {

    var yearSelect = document.getElementById("oil_year");

    var monthSelect = document.getElementById("oil_month");

    var formatSelect = document.getElementById("oil_format");

    if (yearSelect && monthSelect && formatSelect) {

        Event.addEvent(yearSelect, "change", oilYearChanged);

        Event.addEvent(monthSelect, "change", oilMonthChanged);

        Event.addEvent(formatSelect, "change", oilFormatChanged);

    }

}

function monthDayChanged() {

    var yearSelect = document.getElementById("archive_year");

    var monthDaySelect = document.getElementById("archive_month_day");

    if (yearSelect.selectedIndex == 0 || monthDaySelect.selectedIndex == 0) {

        return;

    }

    var nextRowIndex = document.getElementById("archived_stmts_table").tBodies[0].rows.length;

    var selectedYear = yearSelect.options.item(yearSelect.selectedIndex).text;

    var selectedMonthDay = monthDaySelect.options
            .item(monthDaySelect.selectedIndex).text;

    queReport();

    // var YearMonthPairs = new Object();

    // YearMonthPairs[0]= selectedYear;

    // YearMonthPairs[1]= selectedMonthDay;

    var selectedMonth = monthInWordsToValue(selectedMonthDay);

    var tmp = selectedMonth + selectedYear;

    if (!listContains(pdfAvailableList, tmp) && !listContains(pdfReqList, tmp)
            && !listContains(requestedStmts, tmp))

    {

        requestedStmts = listAdd(requestedStmts, tmp);

        var newYearCell = document.createElement("td");

        newYearCell.className = "first";

        var newYearInput = document.createElement("input");

        newYearInput.type = "text";

        newYearInput.className = "readonly";

        newYearInput.value = selectedYear;

        newYearInput.id = "year" + nextRowIndex;

        newYearInput.name = "year" + nextRowIndex;

        newYearCell.appendChild(newYearInput);

        var newMonthDayCell = document.createElement("td");

        newMonthDayCell.className = "middle";

        var newMonthDayInput = document.createElement("input");

        newMonthDayInput.type = "text";

        newMonthDayInput.className = "readonly";

        newMonthDayInput.value = selectedMonthDay;

        newMonthDayInput.id = "monthday" + nextRowIndex;

        newMonthDayInput.name = "monthday" + nextRowIndex;

        newMonthDayCell.appendChild(newMonthDayInput);

        var newRemoveCell = document.createElement("td");

        var newRemoveLink = document.createElement("a");

        newRemoveLink.href = "#";

        newRemoveLink.className = "arrow";

        if (langId == 'ESP') {

            newRemoveLink.appendChild(document.createTextNode("Eliminar"));

        } else

        {

            newRemoveLink.appendChild(document.createTextNode("Remove"));

        }

        // newRemoveLink.appendChild(document.createTextNode("Remove"));

        newRemoveCell.appendChild(newRemoveLink);

        var newTableRow = document.createElement("tr");

        newTableRow.appendChild(newYearCell);

        newTableRow.appendChild(newMonthDayCell);

        newTableRow.appendChild(newRemoveCell);

        document.getElementById("archived_stmts_table").tBodies[0]
                .appendChild(newTableRow);

        Event
                .addEvent(
                        newRemoveLink,
                        "click",
                        function(ev) {

                            var row = getParentByTagName(this, "tr");

                            var rowNum = row.rowIndex;

                            var monthName = document
                                    .getElementById('monthday' + rowNum).value;

                            var YearName = document
                                    .getElementById('year' + rowNum).value;

                            var month = monthInWordsToValue(monthName);

                            var tmp = month + YearName;

                            requestedStmts = listRemove(requestedStmts, tmp);

                            row.parentNode.removeChild(row);

                            var tableRows = document
                                    .getElementById("archived_stmts_table").tBodies[0].rows;

                            if (tableRows.length !== rowNum) {

                                for ( var i = rowNum, j = tableRows.length; i < j; i++) {

                                    var yearInput = tableRows[i].cells[0]
                                            .getElementsByTagName("input")[0];

                                    var monthDayInput = tableRows[i].cells[1]
                                            .getElementsByTagName("input")[0];

                                    yearInput.id = "year" + i;

                                    monthDayInput.id = "monthday" + i;

                                    yearInput.name = "year" + i;

                                    monthDayInput.name = "monthday" + i;

                                }

                            }

                            // setLeftInQueue();

                            resetSelector();

                            Event.stopEvent(ev);

                        });
    } else {

        cb_getElement('archive_year').selectedIndex = 0;

        cb_getElement('archive_month_day').selectedIndex = 0;

        cb_getElement('archive_month_day').disabled = true;

    }

    // setLeftInQueue();

    resetSelector();

}

function oilMonthChanged() {

    var customTab = document.getElementById("oil_custom_delimiter_container");

    customTab.style["display"] = "none";

    customTab.getElementsByTagName("input")[0].value = "";

}

function oilYearChanged() {

    var customTab = document.getElementById("oil_custom_delimiter_container");

    customTab.style["display"] = "none";

    customTab.getElementsByTagName("input")[0].value = "";

}

function oilFormatChanged() {

    var formatSelect = document.getElementById("oil_format");

    var formatVal = formatSelect.options.item(formatSelect.selectedIndex).text;

    var customTab = document.getElementById("oil_custom_delimiter_container");

    /*
     * if (formatVal == "Custom Delimiter") {
     * 
     * customTab.style["display"] = "inline";
     * 
     * customTab.getElementsByTagName("input")[0].value = "";
     *  } else {
     * 
     * customTab.style["display"] = "none";
     * 
     * customTab.getElementsByTagName("input")[0].value = "";
     *  }
     */// commented for enabling and disabling download button

    if (formatVal === "Custom Delimiter"
            || formatVal === "Delimitador Personalizado") {

        customTab.style["display"] = "Block";

        customTab.getElementsByTagName("input")[0].value = "";

        document.getElementById('OnlinePDFSubmit').disabled = true;

        document.getElementById('OnlinePDFSubmit').src = disabledBtnImage;

    } else {

        customTab.style["display"] = "none";

        customTab.getElementsByTagName("input")[0].value = "";

        // changes to enable and disable the download button.

        if (formatSelect.selectedIndex == 0) {

            document.getElementById('OnlinePDFSubmit').disabled = true;

            document.getElementById('OnlinePDFSubmit').src = disabledBtnImage;

        } else {

            document.getElementById('OnlinePDFSubmit').disabled = false;

            document.getElementById('OnlinePDFSubmit').src = enabledBtnImage;

        }

    }

}

function handleErrorACQ(err, isXML)

{

    // Resetting the Submit count

    submitcount = 0;

    var errUrl, errMsg, errElmId;

    if (isXML) {

        var errs = err.getElementsByTagName('error');

        var errorsElms = err.getElementsByTagName('errors');

        if (errorsElms.length > 0 && errorsElms[0].getAttribute('url')) {

            errUrl = errorsElms[0].getAttribute('url');

        }

    } else {

        var errs = new Array();

        var errStartTag = '<error>';

        var errEndTag = '</error>';

        var index = err.indexOf(errStartTag);

        while (index != -1) {

            errs[errs.length] = err.substring(index + errStartTag.length, err
                    .indexOf(errEndTag, index));

            index = err.indexOf(errStartTag, index + 1);

        }

        var errUrlStartTag = 'url="';

        var errUrlStart = err.indexOf(errUrlStartTag);

        if (errUrlStart != -1)
            errUrl = err.substring(errUrlStart + errUrlStartTag.length, err
                    .indexOf('"', errUrlStart + errUrlStartTag.length));

    }

    if (errUrl) {

        location.href = errUrl;

        return;

    }

    for ( var i = 0; i < errs.length; i++) {

        if (isXML) {

            var errMsgElms = errs[i].getElementsByTagName('message');

            if (errMsgElms.length > 0 && errMsgElms[0].firstChild) {

                errMsg = errMsgElms[0].firstChild.nodeValue;

            }

            var errIdElms = errs[i].getElementsByTagName('id');

            if (errIdElms.length > 0 && errIdElms[0].firstChild) {

                errElmId = errIdElms[0].firstChild.nodeValue;

            }

        } else {

            var errMsgStartTag = '<message>';

            var errMsgStart = errs[i].indexOf(errMsgStartTag);

            errMsg = errs[i].substring(errMsgStart + errMsgStartTag.length,
                    errs[i].indexOf('</message>'));

            var errIdStartTag = '<id>';

            var errIdStart = errs[i].indexOf(errIdStartTag);

            errElmId = errs[i].substring(errIdStart + errIdStartTag.length,
                    errs[i].indexOf('</id>'));

        }

        if (errElmId && errMsg) {

            addServerErrorMessage(errElmId, errMsg);

        } else if (errMsg) {

            alert(errMsg);

        }

    }

}

function addServerErrorMessage(id, msg) {

    var elm = document.getElementById(id);

    if (elm) {

        var msgCell = elm.parentNode;

        var msgDiv = document.createElement("div");

        msgDiv.className = 'err-msg-full';

        msgCell.insertBefore(msgDiv, msgCell.childNodes[0]);

        msg = msg.replace(/&lt;/g, "<");

        msg = msg.replace(/&gt;/g, ">");

        msg = msg.replace(/&amp;/g, "&");

        msg = msg.replace(/&#039;/g, "'");

        msg = msg.replace(/&#034;/g, "\"");

        msg = msg.replace(/&#243;/g, "");

        msgDiv.innerHTML = msg;

        removeDuplicateServerErrorMessages();

    }

}

function removeServerErrorMessages(elm) {

    if (typeof (elm) == "string") {

        elm = document.getElementById(elm);

    }

    if (elm) {

        var allErrors = getElementsByClassName(elm, 'div', 'err-msg-full');

        for ( var i = 0; i < allErrors.length; i++) {

            allErrors[i].parentNode.removeChild(allErrors[i]);

        }

    }

}

function removeDuplicateServerErrorMessages() {

    var allErrors = getElementsByClassName(document, 'div', 'err-msg-full');

    for ( var i = 1; i < allErrors.length; i++) {

        if (allErrors[i].innerHTML == allErrors[i - 1].innerHTML
                && allErrors[i].parentNode == allErrors[i - 1].parentNode) {

            allErrors[i].parentNode.removeChild(allErrors[i - 1]);

        }

    }

}

/* Bellow functions are for LoYC purpose: Start */

/**
 * 
 * This JavaScript function is written to display the CheckToSelf section when
 * the
 * 
 * corresponding radio button is clicked. This will first check whether there is
 * a
 * 
 * CREDITOR transaction already added or not. If not, then the CheckToSelf
 * section
 * 
 * will be straight away displayed. Otherwise confirmation window appears to the
 * user.
 * 
 * After user confirmation the added CREDITOR transaction will be deleted and
 * then CheckToSelf section
 * 
 * will be displayed.<b>
 * 
 * 
 * 
 * Project: loan on Your Card (LoYC) - TPR#: 0809030
 * 
 */

function removeCreditorTransaction(btnElm) {

    if (waitFlag != "Y") {

        if (storedAccountNumber != "") {

            var removeLink = document.getElementById('removeLink');

            removeLink.click();

            toggleSelfLayer();

        }

        else {

            toggleSelfLayer();

        }

    }

    else {

        // User is not allowed to switch type while searching operation is in
        // progress

        document.getElementsByName('selectionTypeCreditor')[0].checked = true;

        document.getElementsByName('selectionTypeSelf')[0].checked = false;

    }

}

/**
 * 
 * This JavaScript function is written to display the CREDITOR section when the
 * 
 * corresponding radio button is clicked. This will first check whether there is
 * a
 * 
 * CheckToSelf transaction already added or not. If not, then the CREDITOR
 * section
 * 
 * will be straight away displayed. Otherwise confirmation window appears to the
 * user.
 * 
 * After user confirmation, the added CheckToSelf transaction will be deleted
 * and then CREDITOR section
 * 
 * will be displayed.<b>
 * 
 * 
 * 
 * 
 * 
 * Project: loan on Your Card (LoYC) - TPR#: 0809030
 * 
 */

var CheckToSelfInd = "";

function removeSelfTransaction(btnElm) {

    var selfTransAmtObj = document.getElementById('Amount_Mail');

    var selfAmount = "";

    if (selfTransAmtObj)

        selfAmount = selfTransAmtObj.value;

    if (CheckToSelfInd == 'Y') {

        var removeSelfLink = document.getElementById('removeSelfLink');

        removeSelfLink.click();

        toggleCreditorLayer();

    }

    else if (selfAmount != "" && CheckToSelfInd != 'Y' && selfAmount >= 100) {

        document.getElementsByName('selectionTypeSelf')[0].checked = true;

        document.getElementsByName('selectionTypeCreditor')[0].checked = false;

    }

    else {

        toggleCreditorLayer();

    }

}

/*
 * This if for LoYC auto remove operation while user switch between creditor to
 * Self section.
 * 
 * This is required to show customised alert message to the user while user
 * perform the switch operation.
 * 
 * TPR#: 0809030 [Bijoy Talukder]
 * 
 */

function showLoanDeleteOverlay(btnElm, index) {

    var elm = document.getElementById('overlay_delete_creditor_confirm');

    var cloak_elm = document.getElementById('overlay_cloak');

    var h2elm = document.getElementById('h2_delete_creditor_overlay');

    var main_elm = document.getElementById('main_container');

    var dimMain = getDim(main_elm);

    curr_BT_elm = btnElm;

    var del_elm = document.getElementById('delete_index');

    if (del_elm)
        del_elm.value = index;

    curr_del_value = index + 1;

    // remove_btAvailableURL = btAvailableURL;

    remove_btnElm = btnElm;

    remove_index = index;

    // Read the Element Number from html

    var inputRowElm = getParentByTagAndClassName(btnElm, 'tr', 'inputRow');

    if (inputRowElm)

    {

        var lineElm = getElementsByClassName(inputRowElm, 'td', 'lineNum');

        // Get the row to create replica when user delete the last row

        var tableElm = getParentByTagName(btnElm, 'table');

        newBTRow = getElementsByClassName(tableElm, 'tbody', 'btRow');

        remove_index = parseInt(lineElm[0].innerHTML.substring(0, 1));

        curr_del_value = remove_index;

    }

    dimBtn = getDim(btnElm);

    if (elm)
        elm.style.visibility = "visible";

    if (cloak_elm) {

        var height = document.body.offsetHeight;

        cloak_elm.style.height = height + "px";

        cloak_elm.style.width = screen.width + dimMain.x + "px";

        cloak_elm.style.visibility = "visible";

    }

    elm.style.left = dimMain.x / 2 + "px";

    cloak_elm.style.left = -(dimMain.x / 2) + "px";

    var curScrollY = (typeof window.pageYOffset != 'undefined') ? window.pageYOffset
            : document.documentElement.scrollTop;

    var innerH = (typeof self.innerHeight != 'undefined') ? self.innerHeight
            : document.documentElement.clientHeight;

    elm.style.top = ((innerH - elm.offsetHeight) / 2) + curScrollY + "px";

    h2elm.focus();

}

/**
 * 
 * This JavaScript function is written to delete the already added checkToSelf
 * transaction.
 * 
 * User will be shown on overlay page to confirm the deletion.
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * Project: loan on Your Card (LoYC) - TPR#: 0809030
 * 
 */

function showSelfDeleteOverlay(btnElm, index) {

    var elm = document.getElementById('overlay_delete_self_confirm');

    var cloak_elm = document.getElementById('overlay_cloak');

    var h2elm = document.getElementById('h2_delete_self_overlay');

    var main_elm = document.getElementById('main_container');

    var dimMain = getDim(main_elm);

    dimBtn = getDim(btnElm);

    curr_BT_elm = btnElm;

    if (elm)
        elm.style.visibility = "visible";

    if (cloak_elm) {

        var height = document.body.offsetHeight;

        cloak_elm.style.height = height + "px";

        cloak_elm.style.width = screen.width + dimMain.x + "px";

        cloak_elm.style.visibility = "visible";

    }

    elm.style.left = dimMain.x / 2 + "px";

    cloak_elm.style.left = -(dimMain.x / 2) + "px";

    var curScrollY = (typeof window.pageYOffset != 'undefined') ? window.pageYOffset
            : document.documentElement.scrollTop;

    var innerH = (typeof self.innerHeight != 'undefined') ? self.innerHeight
            : document.documentElement.clientHeight;

    elm.style.top = ((innerH - elm.offsetHeight) / 2) + curScrollY + "px";

    h2elm.focus();

}

/*
 * 
 * This is to confirm the CheckToSelf delete operation. After confirmation from
 * user, all the relevant
 * 
 * amount fields will be reset and the transaction details will be removed from
 * the formData.<b>
 * 
 * 
 * 
 * 
 * 
 * Project: loan on Your Card (LoYC) - TPR#: 0809030
 * 
 */

var clickSelfConfirm = "";

function confirmSelfRemove() {

    var index = '0';

    var params = "DO_ACTION=DELETE&TRF_NUM=" + index;

    clickSelfConfirm = "Y";

    hideSelfDeleteOverlay();

    CheckToSelfInd = ""; // Reset the CheckToSelf indicator

    var selfTransAmtObj = document.getElementById('Amount_Mail');

    if (selfTransAmtObj) {

        selfTransAmtObj.value = "";

    }

    var myReq = new ajaxReq();

    myReq
            .req('/cards/svc/LoanSelfDelete.do', params, writeAvailBT,
                    curr_BT_elm);

    myReq = null;

}

/*
 * The two functions are to delete the overlay when user clicks confirm the
 * creditor switch.
 * 
 * Project: loan on Your Card (LoYC) - TPR#: 0809030 [#BT]
 * 
 */

function hideSelfDeleteOverlay() {

    var elm = document.getElementById('overlay_delete_self_confirm');

    if (elm)
        elm.style.visibility = "hidden";

    var cloak_elm = document.getElementById('overlay_cloak');

    if (cloak_elm)
        cloak_elm.style.visibility = "hidden";

    if (clickSelfConfirm != "Y")

        toggleSelfLayer(); // To keep SELF section visible

}

function hideCreditorDeleteOverlay() {

    var elm = document.getElementById('overlay_delete_creditor_confirm');

    if (elm)
        elm.style.visibility = "hidden";

    var cloak_elm = document.getElementById('overlay_cloak');

    if (cloak_elm)
        cloak_elm.style.visibility = "hidden";

    if (clickConfirm != "Y")

        toggleCreditorLayer(); // To keep CREDITOR section visible

}

/* All the mentioned functions are added for LoYC purpose. [#BT] */

function findLoanCreditor(elm, url) {

    if (submitcount == 0) {

        submitcount++;

        waitFlag = "Y"; // User need to wait until Search completed. No
                        // switching allowed in-between.

        var trElm = getParentByTagName(elm, 'tr');

        var tableElm = getParentByTagName(elm, 'table');

        var allErrors = getElementsByClassName(document, 'div', 'err-msg-full');

        for ( var i = 0; i < allErrors.length; i++) {

            allErrors[i].style.display = 'none';

        }

        if (tableElm.className.indexOf('balconMultiFound') != -1) {

            tableElm.className = tableElm.className.replace("balconMultiFound",
                    "");

        }

        if (tableElm.className.indexOf('balconNoneFound') != -1) {

            tableElm.className = tableElm.className.replace("balconNoneFound",
                    "");

        }

        var myReq = new ajaxReq();

        var parms = "";

        foundMultiple = 'false';

        unmaskAcct = '';

        showLoading(elm);

        if (trElm) {

            var inputs = trElm.getElementsByTagName('input');

            var selects = trElm.getElementsByTagName('select');

            for ( var i = 0; i < inputs.length; i++) {

                if ((inputs[i].type != "radio" && inputs[i].type != "checkbox")
                        || inputs[i].checked) {

                    if (parms != "")
                        parms += "&";

                    parms += inputs[i].name + "="
                            + encodeURIComponent(inputs[i].value);

                }

                if (inputs[i].name == 'Account')

                    unmaskAcct = inputs[i].value;

            }

            for ( var i = 0; i < selects.length; i++) {

                if (parms != "")
                    parms += "&";

                parms += selects[i].name + "="
                        + encodeURIComponent(selects[i].value);

            }

        }

        parms += '&Find Creditor=Find Creditor';

        myReq.req(url, parms, doneFindLoanCreditor, elm);

        myReq = null;

    }

    else {

        // alert('Already Submitted Loan Find Creditor');

        return false;

    }

}

function doneFindLoanCreditor(oXML, elm) {

    hideLoading(elm);

    // Added for TPR#0709011A ,where we need to uniquely identify messageDiv to
    // add message before a particular

    // row ,where the error occured. Not before all the rows above.

    // For that message div id has changed from 'msg' to 'msg1', so that with
    // every "add another" row new incremented id will be generated

    var msgDiv;

    var btRow = getParentByTagAndClassName(elm, "tbody", "btRow");

    if (btRow)

    {

        var msgElm = getElementsByClassName(btRow, "div", "msg");

        msgDiv = msgElm[0];

    }

    // var tableElm = getParentByTagName(elm, 'table');

    // var btRows = getElementsByClassName(tableElm, 'tbody', 'btRow');

    // alert("length of btRows= "+btRows.length)

    // var msgDiv = document.getElementById('msg'+ btRows.length);

    if (oXML.responseText.indexOf('<error>') == -1) {

        if (msgDiv)
            msgDiv.innerHTML = "";

        if (oXML.responseXML) {

            var merchants = oXML.responseXML.getElementsByTagName('merchant');

            var account = oXML.responseXML.getElementsByTagName('account');

            if (account)

                maskAcct = account[0].firstChild.nodeValue;

            // alert(oXML.responseText);

            if (merchants.length == 1) {

                foundLoanCreditor(elm, merchants, account);

            } else if (merchants.length > 1) {

                // alert("found multiple");

                submitcount = 0;

                foundMultiCreditors(elm, merchants, account);

            } else {

                submitcount = 0;

                foundNoCreditors(elm);

            }

        }

    } else {

        waitFlag = ""; // Reset the flag - Allow user to switch

        var err = oXML.responseText;

        var errMsgStartTag = '<message>';

        var errMsgStart = err.indexOf(errMsgStartTag);

        errMsg = err.substring(errMsgStart + errMsgStartTag.length, err
                .indexOf('</message>'));

        // Display the error message in-line

        msgDiv.innerHTML = errMsg;

        handleErrorACQ(oXML.responseText, false);

    }

}

function foundLoanCreditor(elm, merchants, account) {

    var tBody = getParentByTagName(elm, 'tbody');

    var empty;

    applyLoan(tBody, merchants[0].firstChild.nodeValue,
            account[0].firstChild.nodeValue, empty, empty, 'Secondcall');

}

function applyLoan(elm, creditor, account, creditparms, creditaddress,
        indicator) {

    var myReq = new ajaxReq();

    var parms = "";

    // alert("account "+account);

    // showLoading(elm);

    showLoadingApply(elm);

    var tds = elm.getElementsByTagName('td');

    var btObj = {
        "elm" : elm,
        "valArray" : new Array()
    };

    if (elm.className.indexOf('pending') != -1)
        elm.className = elm.className.replace('pending', '');

    for ( var i = 0; i < tds.length; i++) {

        var creditText = "";

        var textDivs = getElementsByClassNameFromElement('text', 'div', tds[i]);

        var editDivs = getElementsByClassNameFromElement('edit', 'div', tds[i]);

        if (editDivs.length > 0 && textDivs.length > 0) {

            var editVal = "";

            var inputs = editDivs[0].getElementsByTagName('input');

            // alert("inputs "+inputs);

            if (inputs.length > 0) {

                if (inputs[0].className.indexOf("payTo") == -1) {

                    if (maskAcct == "")

                    {

                        editVal = inputs[0].value;

                    }

                    else

                    {

                        editVal = maskAcct;

                    }

                } else {

                    if (creditaddress || checkAddMerchant) {

                        // alert("inside creditaddress ");

                        editVal = inputs[0].value;

                        // alert("value of editVal "+editVal);

                        creditText = editVal + creditaddress;

                        // alert("value of creditText "+creditText);

                    } else {

                        editVal = creditor;

                        // alert("in else part editVal "+editVal);

                    }

                    if (creditparms) {

                        // alert("inside creditparms "+creditparms);

                        if (parms != "")
                            parms += "&";

                        parms += creditparms;

                        // alert("value parms "+parms);

                    }

                }

                if (parms != "")
                    parms += "&";

                if (inputs[0].id != 'Account')

                    parms += inputs[0].id + "=" + encodeURIComponent(editVal);

                else

                    parms += inputs[0].id + "=" + unmaskAcct;

            } else {

                var selects = editDivs[0].getElementsByTagName('select');

                if (selects.length > 0) {

                    if (parms != "")
                        parms += "&";

                    parms += selects[0].id + "="
                            + encodeURIComponent(selects[0].value);

                    if (selects[0].value != "") {

                        editVal = selects[0].options[selects[0].selectedIndex].text;

                    }

                }

            }

            if (creditText) {

                editVal = creditText;

                if (elm.className.indexOf('pending') == -1)
                    elm.className += ' pending';

            }

            btObj.valArray[btObj.valArray.length] = {
                "elm" : textDivs[0],
                "value" : editVal
            }

        }

    }

    var URL = '/cards/svc/LoanFindCreditorAjax.do?ADD=Y';

    if (creditaddress || (checkAddMerchant != 'undefined' && checkAddMerchant))

    {

        if (foundMultiple == 'true')

        {

            parms += '&MPLSave=Save';

        }

        else

            parms += '&Save=Update';

        // resetting the global js variable to 'false'

        checkAddMerchant = false;

    }

    else if (indicator)

    {

        URL = 'xml/testXML.xml';

    }

    else if (creditor)

    {

        parms += '&MPLSelectSave=Update&PayTo=' + creditor;

    }

    myReq.req(URL, parms, doneApplyLoan, btObj);

    myReq = null;

}

function doneApplyLoan(oXML, btObj) {

    elm = btObj.elm;

    // we need to uniquely identify messageDiv to add message before a
    // particular

    // row ,where the error occured. Not before all the rows above.

    // var tableElm = getParentByTagName(elm, 'table');

    // var btRows = getElementsByClassName(tableElm, 'tbody', 'btRow');

    // alert("length of btRows= "+btRows.length);

    // var msgDiv = document.getElementById('msg'+ btRows.length);

    var msgDiv;

    if (elm)

    {

        var msgElm = getElementsByClassName(elm, "div", "msg");

        msgDiv = msgElm[0];

    }

    // hideLoading(elm);

    hideLoadingApply(elm);

    if (oXML.responseText.indexOf('<error>') == -1) {

        // If Merchant added Successfully, set the maskAcct to blank

        storedAccountNumber = maskAcct;

        clickConfirm = "";

        waitFlag = ""; // Reset the flag - User now can switch

        maskAcct = "";

        if (msgDiv)
            msgDiv.innerHTML = "";

        if (btObj.valArray) {

            for ( var i = 0; i < btObj.valArray.length; i++) {

                if (btObj.valArray[i].elm.className.indexOf('nochange') == -1)
                    btObj.valArray[i].elm.innerHTML = btObj.valArray[i].value;

            }

            if (elm.className.indexOf('textMode') == -1)
                elm.className += " textMode";

            var tableElm = getParentByTagName(elm, 'table');

            if (tableElm.className.indexOf('enableAdd') == -1) {

                tableElm.className += " enableAdd";

            }

            if (tableElm.className.indexOf('balconMultiFound') != -1) {

                tableElm.className = tableElm.className.replace(
                        "balconMultiFound", "");

            }

            if (tableElm.className.indexOf('balconNoneFound') != -1) {

                tableElm.className = tableElm.className.replace(
                        "balconNoneFound", "");

            }

            if (tableElm.className.indexOf('enterAddress') != -1) {

                tableElm.className = tableElm.className.replace("enterAddress",
                        "");

            }

        }

        var addressElms = [ 'Address1', 'Address2', 'City2', 'State2', 'Zip2' ];

        for ( var i = 0; i < addressElms.length; i++) {

            var addressElm = document.getElementById(addressElms[i]);

            if (addressElm) {

                addressElm.value = "";

            }

        }

        updateAvailLoan("true");

    } else {

        // Add Merchant Failed due to error

        // we are not resetting the maskAcct

        waitFlag = ""; // Reset the flag - User now can switch

        var err = oXML.responseText;

        var errMsgStartTag = '<message>';

        var errMsgStart = err.indexOf(errMsgStartTag);

        errMsg = err.substring(errMsgStart + errMsgStartTag.length, err
                .indexOf('</message>'));

        // Display the error message in-line

        msgDiv.innerHTML = errMsg;

        handleErrorACQ(oXML.responseText, false);

    }

}

function applyLoanMerchant(elm, account) {

    if (submitcount == 0) {

        submitcount++;

        if (typeof (elm) == "string") {

            elm = document.getElementById(elm);

        }

        if (elm) {

            var merch = elm.value;

            var tableElm = getParentByTagName(elm, 'table');

            if (merch == "") {

                merch = ' ';

            }

            var btRows = getElementsByClassName(tableElm, 'tbody', 'btRow');

            if (btRows.length > 0) {

                var iAcctLength = account.length;

                var strMask = "XXXXXXXXXXXX";

                if (iAcctLength > 4)

                {

                    account = strMask + account.substring(iAcctLength - 4);

                }

                else

                {

                    account = strMask + account;

                }

                var btRow = btRows[btRows.length - 1];

                applyLoan(btRow, merch, account);

            }

        }

    }

    else {

        // alert('Already Updated the selected Merchant - LOYC');

        return false;

    }

}

function applyMerchantLoanAddress(elm) {

    if (submitcount == 0) {

        submitcount++;

        var addressElms = [ 'Address1', 'Address2', 'City2', 'State2', 'Zip2' ];

        var parms = "";

        var address = "";

        waitFlag = "Y"; // Set the flag to 'Y' to prevent user switch during
                        // search operation.

        // making it 'true' if user click the button

        checkAddMerchant = true;

        if (elm) {

            for ( var i = 0; i < addressElms.length; i++) {

                var addressElm = document.getElementById(addressElms[i]);

                if (addressElm) {

                    if (parms != "")
                        parms += "&";

                    parms += addressElm.id + "="
                            + encodeURIComponent(addressElm.value);

                    if (addressElm.value != "") {

                        if (addressElm.value.length > 8)

                        {

                            var startingIndex = 0;

                            var addressmodified = addressElm.value;

                            while ((startingIndex + 8) < addressElm.value.length)

                            {

                                address += "<br />"
                                        + addressmodified.substring(
                                                startingIndex,
                                                startingIndex + 8);

                                startingIndex = startingIndex + 8;

                                // rowText = rowText.substring(0, lastIndex) +
                                // "</BR>" + rowText.substring(lastIndex,
                                // rowText.length);

                            }

                            address += "<br />"
                                    + addressmodified.substring(startingIndex,
                                            addressElm.value.length);

                        }

                        else {

                            address += "<br />" + addressElm.value;

                        }

                    }

                }

            }

            var tableElm = getParentByTagName(elm, 'table');

            var btRows = getElementsByClassName(tableElm, 'tbody', 'btRow');

            if (btRows.length > 0) {

                var btRow = btRows[btRows.length - 1];

                applyLoan(btRow, "", "", parms, address);

            }

        }

    }

    else {

        // alert('Already Submitted Merchant Address - LoYC');

        return false;

    }

}

// The following two JavaScript functions are added for the inline updation

// of the Loan transfer amount in the EnterInfo page. This is required to keep
// the BALCON related changes untouched.

// Project: Loan on Your Card (TPR#: 0809030) - Bijoy Talukder [#BT]

function updateAmountLoan(elm)

{

    var btRow = getParentByTagAndClassName(elm, "tr", "inputRow");

    var btLineNum;

    if (btRow)

    {

        // Do not call the Update if the account no is not present. it will
        // avoid the HTTP Call

        var Acct = getElementsByClassName(btRow, "input", "textFieldLg");

        if (Acct[0] && Acct[0].value != "") {

            btLineNum = getElementsByClassName(btRow, "td", "lineNum");

            var tableElm = getParentByTagName(elm, 'tbody');

            tableElm.className += ' abc';

            // Since input tag is not available if u refresh the page, check the
            // account starts with XXXXX or not

        }

        else

        {

            var tdAcct = getElementsByClassName(btRow, "td", "acct");

            if (tdAcct && tdAcct[0].innerHTML.indexOf("XXXX") >= 0) {

                btLineNum = getElementsByClassName(btRow, "td", "lineNum");

                var tableElm = getParentByTagName(elm, 'tbody');

                if (tableElm.className.indexOf('ttt') == -1)

                {

                    tableElm.className += ' abc';

                }

            }

        }

    }

    if (btLineNum)

    {

        btcounter = btLineNum[0].innerHTML.substring(0, 1);

        updateAvailLoan(elm);

        btcounter = "";

    }

}

// For updating the availed loan amount.

function updateAvailLoan(elm) {

    var totalBT = "";

    if (btcounter != '') {

        var btelm = document.getElementById('Amount_' + btcounter);

        if (btelm) {

            var btamount = btelm.value;

            if (totalBT != "")
                totalBT += "&";

            totalBT += "btvalue" + btcounter + "=";

            totalBT += btamount;

        }

    }

    if (!elm) {

        if (document.getElementById('checkAmount')
                && (document.getElementById('checkMail').checked || document
                        .getElementById('checkDeposit').checked)) {

            var btamount = document.getElementById('checkAmount').value;

            if (totalBT != "")
                totalBT += "&";

            totalBT += "checkvalue=";

            totalBT += btamount;

            totalBT += "&checkmethod=";

            totalBT += (document.getElementById('checkMail').checked) ? document
                    .getElementById('checkMail').value
                    : document.getElementById('checkDeposit').value;

        }

    } else {

        if (document.getElementById('checkAmount')) {

            var btamount = document.getElementById('checkAmount').value;

            if (totalBT != "")
                totalBT += "&";

            totalBT += "checkvalue=";

            totalBT += btamount;

        }

    }

    var myReq = new ajaxReq();

    myReq.req('/cards/svc/LoanUpdateAmount.do', totalBT, writeAvailBT, elm);

    myReq = null;

}

/* Bellow functions are for LoYC - III purpose: Start */

/**
 * 
 * This JavaScript function is written to display the Partial amount transfer
 * section when the
 * 
 * corresponding radio button is clicked.
 * 
 * 
 * 
 * Project: loan on Your Card (LoYC - III) - TPR#: 0812027
 * 
 */

function allowPartialTransfer(btnElm) {

    if (waitFlag != "Y") {

        toggleSelfLayer();

    }

    else {

        // User is not allowed to switch type while searching operation is in
        // progress

        document.getElementsByName('selectionTypeCreditor')[0].checked = true;

        document.getElementsByName('selectionTypeSelf')[0].checked = false;

    }

}

/* END */

// Added for TPR 0910023 LOYC 5
function updatePYPAmount(elm, str) {
    var myReq = new ajaxReq();
    if (str == 'duration') {
        document.getElementById("pypAmount").value = "";
    }

    var PYPElms = [ 'pypAmount', 'pypDuration' ];
    var parms = "";
    for ( var i = 0; i < PYPElms.length; i++) {
        var PYPElm = document.getElementById(PYPElms[i]);
        if (PYPElm) {
            if (parms != "")
                parms += "&";
            parms += PYPElm.id + "=" + encodeURIComponent(PYPElm.value);
        }
    }
    makeAjaxCall("/cards/svc/UpdatePYPAmountAjax.do", parms,
            updatePYPAmountBlur);

}

function updatePYPAmountBlur(xmlObj, params) {

    var str = xmlObj.responseText;

    if (str.indexOf("<error>") == -1) {
        var pypamount_elm = document.getElementById('pypAmount');
        var mindue_elm = document.getElementById('mindue');
        var loanduration_elm = document.getElementById('loanduration');
        var apr_elm = document.getElementById('apr');
        var pypDuration_elm = document.getElementById('pypDuration');

        if (str.indexOf("<msg>") >= 0) {
            var elm = document.getElementById("errormsg");
            if (elm != 'undefined' && elm != null) {
                elm.innerHTML = '';

            }
            var elmAmt = document.getElementById('amountMsg');
            if (elmAmt != 'undefined' && elmAmt != null) {
                elmAmt.innerHTML = "";
            }

            var elmDuration = document.getElementById('durationMsg');
            if (elmDuration != 'undefined' && elmDuration != null) {
                elmDuration.innerHTML = "";
            }
            var s = str.split("<monthly_payment>", 2);
            s = s[1].split("</monthly_payment>", 2);
            var monthlyPayment = s[0];
            var s = str.split("<minimum_due>", 2);
            s = s[1].split("</minimum_due>", 2);
            var minDue = s[0];
            var s = str.split("<loan_duration>", 2);
            s = s[1].split("</loan_duration>", 2);
            var loanDuration = s[0];
            var s = str.split("<apr>", 2);
            s = s[1].split("</apr>", 2);
            var apr = s[0];
            if (pypamount_elm)
                pypamount_elm.value = monthlyPayment;
            if (mindue_elm)
                mindue_elm.innerHTML = minDue;
            if (loanduration_elm)
                loanduration_elm.innerHTML = loanDuration + "Months";
            if (apr_elm)
                apr_elm.innerHTML = apr;
            if (pypDuration_elm)
                pypDuration_elm.value = loanDuration;
            var s = str.split("<msg>", 2);
            s = s[1].split("</msg>", 2);
            var error = s[0];
            showErrorMsg(error);

        } else {

            var elm = document.getElementById("errormsg");
            if (elm != 'undefined' && elm != null) {
                elm.innerHTML = '';

            }
            var elmAmt = document.getElementById('amountMsg');
            if (elmAmt != 'undefined' && elmAmt != null) {
                elmAmt.innerHTML = "";
            }

            var elmDuration = document.getElementById('durationMsg');
            if (elmDuration != 'undefined' && elmDuration != null) {
                elmDuration.innerHTML = "";
            }
            var s = str.split("<monthly_payment>", 2);
            s = s[1].split("</monthly_payment>", 2);
            var monthlyPayment = s[0];
            var s = str.split("<minimum_due>", 2);
            s = s[1].split("</minimum_due>", 2);
            var minDue = s[0];
            var s = str.split("<loan_duration>", 2);
            s = s[1].split("</loan_duration>", 2);
            var loanDuration = s[0];
            var s = str.split("<apr>", 2);
            s = s[1].split("</apr>", 2);
            var apr = s[0];
            if (pypamount_elm)
                pypamount_elm.value = monthlyPayment;
            if (mindue_elm)
                mindue_elm.innerHTML = minDue;
            if (loanduration_elm)
                loanduration_elm.innerHTML = loanDuration + "Months";
            if (apr_elm)
                apr_elm.innerHTML = apr;
            if (pypDuration_elm)
                pypDuration_elm.value = loanDuration;

        }
    } else {

        var s = str.split("<error>", 2);
        s = s[1].split("</error>", 2);
        var error = s[0];
        showErrorMsg(error);

    }

}

function showErrorMsg(error) {
    var elm = document.getElementById("errormsg");
    if (error != null) {
        if (elm != 'undefined' && elm != null) {
            elm.innerHTML = error;
        }
    }
}

function removeErrorMsg() {
    var elm = document.getElementById("errormsg");
    if (elm != 'undefined' && elm != null) {
        elm.innerHTML = '';
    }

}

function clearPYPValues(elm) {
    var myReq = new ajaxReq();
    var parms = "";
    makeAjaxCall("/cards/svc/UpdateMMClearPYPAjax.do", parms,
            updateMMClearPYPClick);
}

function replaceSyncToken(url, replace) {

    var temp = url;
    if (temp.indexOf("?") >= 0) {
        temp = temp.slice(temp.indexOf("?") + 1);
        if (temp.indexOf(replace) >= 0) {
            var params = temp.split("&");
            for ( var i = 0; i < params.length; i++) {
                var param = params[i];
                if (param.indexOf(replace) >= 0) {
                    url = url.replace(param, replace + token);

                }
            }
        }
    }
    return url;
}
function updateMMClearPYPClick(xmlObj, params) {

    var str = xmlObj.responseText;
    if (str.indexOf("<error>") == -1) {

        var elm = document.getElementById("errormsg");
        if (elm != 'undefined' && elm != null) {
            elm.innerHTML = '';

        }
        var elmAmt = document.getElementById('amountMsg');
        if (elmAmt != 'undefined' && elmAmt != null) {
            elmAmt.innerHTML = "";
        }

        var elmDuration = document.getElementById('durationMsg');
        if (elmDuration != 'undefined' && elmDuration != null) {
            elmDuration.innerHTML = "";
        }

        var pypamount_elm = document.getElementById('pypAmount');
        var mindue_elm = document.getElementById('mindue');
        var s = str.split("<monthly_payment>", 2);
        s = s[1].split("</monthly_payment>", 2);
        var monthlyPayment = s[0];
        var s = str.split("<minimum_due>", 2);
        s = s[1].split("</minimum_due>", 2);
        var minDue = s[0];
        if (pypamount_elm)
            pypamount_elm.value = "";
        if (mindue_elm)
            mindue_elm.innerHTML = minDue;

    }

}

// End for TPR 0910023 LOYC 5

// Defect 10808
function addNewRowHandler() {
    if ($('.norm_state:last').length > 0) {
        var newRowId = $('.norm_state:last').attr('id').split('btcount');
        newRowId =  parseInt(newRowId[1]) + 1;
        $('.norm_state:last').after('<tbody id="btcount'+ newRowId +'" class="norm_state">' + $('.norm_state:last').html() + '</tbody>');
        $('.norm_state:last').find('.check-amount').attr('id', 'CREDITOR_TRANSFER_AMOUNT_'+newRowId).attr('name', 'CREDITOR_TRANSFER_AMOUNT_'+newRowId);
        $('.norm_state:last').find('.fee div').attr('id', 'fee_'+newRowId).attr('name', 'fee_'+newRowId);
        $('.norm_state:last').find('.lineNum div').text(newRowId+'.');
    } else {
        if (typeof payBodyBK !== "undefined" && payBodyBK != null) {
            payBodyBK.insertBefore("#btadd");
            payBodyBK = null;
            $('#btadd .addNewRowButton').show();
            $('#balance-transfer-account').hide();
            $("#bal-transfer-1 thead").show();
        }
    }

    clone();
}

