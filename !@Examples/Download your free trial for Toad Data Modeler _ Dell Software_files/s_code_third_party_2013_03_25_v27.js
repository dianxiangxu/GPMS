// SiteCatalyst code version: H.24.2
// SUPPORTED ENVIRONMENTS: Dell Storm, Dell Nextgen, Dell Third-party sites
// UPDATED: 25-MAR-2013
// Version: v27
// CHANGE LOG: Added SC15 opv events, removed event86, evar57 update, Added ideastorm pagename logic
var version = 'S.NG v27 25-MAR-2013';

var s_account='dellglobalonline';
var s_dell=s_gi(s_account);

/************************** CONFIG SECTION **************************/

/* Dell Config */
if(!s_dell.localDoms)s_dell.localDoms='javascript:,dell.,dellcomputer.,dellcomputers.,dellcustomerservice.,delldirect.,delldrivers.,dellfinancial.,dellfinancialservices.,dellideas.,dellnet.,dellstore.,dellsupport.,delltalk.,dellteam.,dellvistaupgrade.,dfsdirectsales.,inspiron.';
if(!s_dell.supportDoms)s_dell.supportDoms='docs.,dellcustomerservice.';
s_dell.isPageLoad=true;

/* Conversion Config */
s_dell.charSet='UTF-8';

/* Link Tracking Config */
s_dell.trackDownloadLinks=true;
s_dell.trackExternalLinks=true;
s_dell.trackInlineStats=true;
s_dell.linkDownloadFileTypes='exe,zip,wav,mp3,mov,mpg,avi,wmv,pdf,doc,docx,xls,xlsx,ppt,pptx';
s_dell.linkInternalFilters=s_dell.localDoms+',picwebtools.,paywithdfs.,techpageone.,yourdellsolution.,imagebank.,dellnewscentre.,dellmodularservices.,techconcierge.,equallogic.,secureworks.,alienware.,alienwarearena.,alienwaregiveaway.,dell-ins.,easy2.,ideastorm.,livelook.,sellpoint.,syndication.intel.,triaddigital.,webcollage.,force.,salesforce.,delldigitalmodule.,dellcoloradvantage.,dellcloud.,dellcampaignbuilder.,kacenetworks.,dell-brand.,kace.,netexam.,iolo.,myalienware.';
s_dell.linkLeaveQueryString=false;
s_dell.linkTrackVars='prop60';
s_dell.linkTrackEvents='None';
s_dell.ActionDepthTest=true;

/*SC15 update*/
//s_dell.eventList="event7,event12,event22,event23,event49,scView,scCheckout";
s_dell.eventList="event81,event82,event83,event84,event85,event87,event56,event58,event21";


/* Plugin Config */
s_dell.usePlugins=true;
var doPluginsRanAlready = false;

/***************************** doPlugins ****************************/

function s_dell_doPlugins(s){
    s.cookieLifetime='';
    s.prop60 = version;
     
    if(!s.server)s.server=parseUri(document.location.href).host.replace(/^www[0-9]*\./i,'');

    if(!doPluginsRanAlready)s.processLWP();
    
    if(!doPluginsRanAlready){
        /* Load the Survey Module (except on third party sites) */
        if(s.prop6!='rc1047167'&&s.prop6!='rc1193519'&&s.prop6!='rc1193518'){  //don't load survey for these cookie IDs
            s.loadModule('Survey');
            s.Survey.suites=s_account;
        }
    }

    s.events=s.events?s.events:'';

    s.setupDynamicObjectIDs();

    /* Begin Page Name Logic */

    if(s.onDellCMS()){

        var pn=s.getHTMLtag('meta','metricspath').toLowerCase(),n='';
        if(pn.indexOf('&eiwatch=')>-1)pn=s.repl(pn,'&eiwatch=','');

        if(!s.pageName||s.pageName.indexOf('dellstore^')>-1){
            s.pageName='';
            if(document.location.href=='http://www.dell.com/'||pn=='www1.us.dell.com/us/en/gen//content^default/'){
                s.pageName='dell.com homepage'; //handle dell.com homepages (static and dynamic should have same name)
            }
            var pna=s.split(pn,'/'); //split on / delimiter
            if(pna.length>0&&pna.length<6){ //handle page cloaking
                if(!s.pageName){
                    if(pn.indexOf('//')>-1)pn=pn.substring(pn.indexOf('//')+2);
                    pn=pn.replace(/^www[0-9]*\./i,'');
                    if(pn.indexOf('?')>-1){
                        s.pageName=pn.substring(0,pn.indexOf('?'));
                    }else{
                        s.pageName=pn;
                    }
                }
            }
            
            /*event83 Logic for SC15*/
            var sc15_host = window.location.host;
            if(sc15_host.indexOf('dell')>-1){
                var hostSplits = sc15_host.split('.');
                sc15_host = hostSplits[0]=='www'?hostSplits[1]:hostSplits[0];
                switch(sc15_host){
                    case 'configure':
                    case 'configure2':
                    case 'pc-configure':
                    case 'outlet':
                    case 'outletus':
                    case 'outletusps3':
                    case 'cart':
                    case 'premierecomm':
                    case 'ecomm':
                    case 'ecomm2':
                    case 'lastore':
                    case 'catalog':
                    case 'catalog2':
                    case 'premiercatalog':
                    case 'brstore':
                    case 'premierconfigure':
                    case 'pcommerce':
                    case 'premierconfig':
                    case 'aposconfigure':
                        s.events=s.apl(s.events,'event83',',',2);
                    break;
                }
            }
            

            /*
             *  Storm Page Name Logic
             *
             *  default storm format:
             *  domain/country/lauguage/segment/customerset/uristem^info/   /[optionalparameters]
             *  0   1   2    3     4    5   6   7
             */
            if(s.determineCMS()=='storm'&&pn&&!s.pageName){
                var a7=pna[7],a6=pna[6]; //querystring value (optional parameters)
                var ovf=af=false; //other value flag, appended flag (for else case)
                var pn=dpn=n=''; //clear page name
                for(var i=1;i<8;i++){
                    if(i==4&&pna[0].indexOf('premier')>-1){pn=s.apl(pn,'',':',0);af=true;}
                    if(i==4&&pna[4].indexOf('rc')==0&&!af){pn=s.apl(pn,'',':',0);af=true;}
                    if(i==6&&a6&&a7){
                        if(pna[6].indexOf('[')>-1){
                            pn=s.apl(pn,'',':',0);
                            af=true;
                        }
                    } else if(i==6&&a6){
                        if(pna[6].indexOf('[')>-1)af=true;
                    } else if(i==6){
                        pn=s.apl(pn,pna[i],':',0);
                        af=true;
                    }
                    /* values to include in page name AND details page name */
                    if(i==7&&a7){
                        if(a7.indexOf('category_id=')>-1){
                            n=a7.substring(a7.indexOf('category_id=')+12);
                            n=n.substring(0,n.indexOf(']'));
                            if(ovf){pn=s.apl(pn,n,'',0);af=true;}else{pn=s.apl(pn,n,':',0);ovf=true;af=true;}
                        }
                        if(a7.indexOf('categoryid=')>-1){
                            n=a7.substring(a7.indexOf('categoryid=')+11);
                            n=n.substring(0,n.indexOf(']'));
                            if(ovf){pn=s.apl(pn,n,'',0);af=true;}else{pn=s.apl(pn,n,':',0);ovf=true;af=true;}
                        }
                        if(a7.indexOf('sku=')>-1&&pn.indexOf('addedtocart')==-1){
                            n=a7.substring(a7.indexOf('sku='));
                            n='['+n.substring(0, n.indexOf(']')+1);
                            if(ovf){pn=s.apl(pn,n,'',0);af=true;}else{pn=s.apl(pn,n,':',0);ovf=true;af=true;}
                        }
                        if(a7.indexOf('oc=')>-1&&pna[0].indexOf('premier')==-1&&pn.indexOf('dellstore^config')>-1){
                            n=a7.substring(a7.indexOf('oc='));
                            n='['+n.substring(0,n.indexOf(']')+1);
                            if(ovf){pn=s.apl(pn,n,'',0);af=true;}else{pn=s.apl(pn,n,':',0);ovf=true;af=true;}
                        }
                        if(a7.indexOf('product_id=')>-1){
                            n=a7.substring(a7.indexOf('product_id='));
                            n='['+n.substring(0,n.indexOf(']')+1);
                            if(ovf){pn=s.apl(pn,n,'',0);af=true;}else{pn=s.apl(pn,n,':',0);ovf=true;af=true;}
                        }
                        if(a7.indexOf('productid=')>-1){
                            n=a7.substring(a7.indexOf('productid='));
                            n='['+n.substring(0,n.indexOf(']')+1);
                            if(ovf){pn=s.apl(pn,n,'',0);af=true;}else{pn=s.apl(pn,n,':',0);ovf=true;af=true;}
                        }
                        if(a7.indexOf('[~id=')>-1&&pn.indexOf('imagedirect')==-1){
                            n=a7.substring(a7.indexOf('id='));
                            n='['+n.substring(0,n.indexOf(']')+1);
                            if(ovf){pn=s.apl(pn,n,'',0);af=true;}else{pn=s.apl(pn,n,':',0);ovf=true;af=true;}
                        }
                        if(a7.indexOf('[id=')>-1&&pn.indexOf('imagedirect')==-1){
                            n=a7.substring(a7.indexOf('id='));
                            n='['+n.substring(0,n.indexOf(']')+1);
                            if(ovf){pn=s.apl(pn,n,'',0);af=true;}else{pn=s.apl(pn,n,':',0);ovf=true;af=true;}
                        }
                        if(a7.indexOf('topic=')>-1){
                            n=a7.substring(a7.indexOf('topic='));
                            n='['+n.substring(0,n.indexOf(']')+1);
                            if(ovf){pn=s.apl(pn,n,'',0);af=true;}else{pn=s.apl(pn,n,':',0);ovf=true;af=true;}
                        }
                        dpn=pn;
                        /* values to include in details page name */
                        if(a7.indexOf('section=')>-1){
                            n=a7.substring(a7.indexOf('section='));
                            n='['+n.substring(0,n.indexOf(']')+1);
                            if(ovf){dpn=s.apl(dpn,n,'',0);af=true;}else{dpn=s.apl(dpn,n,':',0);ovf=true;af=true;}
                        }
                        if(a7.indexOf('tab=')>-1){
                            n=a7.substring(a7.indexOf('tab='));
                            n='['+n.substring(0,n.indexOf(']')+1);
                            if(ovf){dpn=s.apl(dpn,n,'',0);af=true;}else{dpn=s.apl(dpn,n,':',0);ovf=true;af=true;}
                        }
                        if(a7.indexOf('page=')>-1){
                            n=a7.substring(a7.indexOf('page='));
                            n='['+n.substring(0,n.indexOf(']')+1);
                            if(ovf){dpn=s.apl(dpn,n,'',0);af=true;}else{dpn=s.apl(dpn,n,':',0);ovf=true;af=true;}
                        }
                        if(a7.indexOf('brandid=')>-1){
                            n=a7.substring(a7.indexOf('brandid='));
                            n='['+n.substring(0,n.indexOf(']')+1);
                            if(ovf){dpn=s.apl(dpn,n,'',0);af=true;}else{dpn=s.apl(dpn,n,':',0);ovf=true;af=true;}
                        }
                        if(a7.indexOf('cat=')>-1){ //values to variable only
                            n=a7.substring(a7.indexOf('cat=')+4);
                            n=n.substring(0,n.indexOf(']'));
                            if(pna[0].indexOf('search')>-1)s.eVar9=n;
                            af=true;
                        }
                    }
                    if(!af&&i!=7)pn=s.apl(pn,pna[i],':',0);
                    af=false;
                }

                /* cleanup - remove trailing colon and undefined */
                if(pn.length-1==pn.lastIndexOf(':'))pn=pn.substring(0,pn.length-1);
                if(pn.indexOf(':undefined')>-1)pn=pn.substring(0,pn.indexOf(':undefined'));
                if(dpn.length-1==dpn.lastIndexOf(':'))dpn=dpn.substring(0,dpn.length-1);

                /* cleanup - remove dellstore: from the beginning of the string for ecomm */
                if(pn.indexOf('dellstore:')==0)pn=pn.substring(10,pn.length);
                if(dpn.indexOf('dellstore:')==0)dpn=dpn.substring(10,dpn.length);

                s.pageName=pn;
                dpn=dpn?s.prop13=dpn:s.prop13=pn;
            }
        }

        if(!s.pageName)s.pageName=s_dell.getPNfromURL();
        if(!s.prop13)s.prop13=s.pageName;

        /* Set prop29 to CMS name. Modified 06/12/10 */
        s.prop29=s.determineCMS();
        if(s.prop29=='unknown'||!s.prop29)s.prop29='unknown:'+s.server;

        /* updated 10/29/08: handling of AJAX pages */
        if(s.pageName.indexOf('ajax')>-1){
            if(s.prop13.indexOf(':ajax')>-1){
                s.pageName=s.prop13.substring(0,s.prop13.indexOf(':ajax'));
            }else{
                s.pageName=s.prop13;
                s.prop13=s.prop13+':ajax';
            }
        }

    }else{ //not on dell.com

        if(!s.pageName)s.pageName=s.getPNfromURL();
        if(!s.prop13)s.prop13=s.pageName;
        
        /**********IdeaStorm*********/
       if(s.pageName.indexOf('ideastorm')>-1){
            s_dell.getQueryParam('Type')?s_dell.pageName+='|type:'+s_dell.getQueryParam('Type'):'';
            s_dell.getQueryParam('Filter')?s_dell.pageName+='|filter:'+s_dell.getQueryParam('Filter'):''; 
        
            /* add 'cat' or 'sta' query params if available */
            if(s_dell.getQueryParam('cat')) s_dell.pageName+='|cat:'+s_dell.getQueryParam('cat');
            else if(s_dell.getQueryParam('sta')) s_dell.pageName+='|status:'+s_dell.getQueryParam('sta');
            /* add 'sort' parameter for detailed page name if present */
            s_dell.prop13=s_dell.pageName+(s_dell.getQueryParam('lsi')?'|:sort:'+s_dell.getQueryParam('lsi'):'');   
       }   

    }

    /* END Page Name Logic */

    /* Added 10/24/08: getPreviousValue of pageName */
    if (typeof(s.linkType)=='undefined'||s.linkType=='e'){
        s.gpv_pn=s.getPreviousValue(s.pageName,'gpv_pn','');
        if(s.gpv_pn=='no value')s.gpv_pn='';
    }

    /* Classify page as Support (event22) or Segment (event23) */
    var spg=false;
    if(!spg&&(s.server.indexOf('dell')>=0)&&s.server.indexOf('support')>=0)spg=true; //check domain for 'dell' and 'support' in any order
    if(!spg&&s.server.match('('+s.supportDoms.replace(/,/gi,'|').replace(/\./gi,'\\.')+')'))spg=true; //Check domain for specific support domains
    if(!spg&&s.determineCMS()=='nextgen'){ //Logic to determine if a Nextgen page is a Support page follows...
        var urlpn=document.location.pathname.toLowerCase();
        if(urlpn){
            if(!spg&&urlpn.indexOf('/order-support')>=0)spg=true;
            if(!spg&&urlpn.indexOf('/support')>=0)spg=true;
        }
    }      
    s.events=s.apl(s.events,(spg?'event22':'event23'),',',2);
    s.events=s.apl(s.events,(spg?'event85':'event86'),',',2);//SC15 update
    
    /** added by Jason Case 25 Apr 2011 to include these events in tl calls**/
    if(typeof(s.linkType)!='undefined'){
        s.linkTrackVars=s.apl(s.linkTrackVars,'prop5',',',2);
        s.linkTrackVars=s.apl(s.linkTrackVars,'events',',',2);
        s.linkTrackEvents=s.apl(s.linkTrackEvents,'event22',',',2);
        s.linkTrackEvents=s.apl(s.linkTrackEvents,'event23',',',2);
        s.linkTrackEvents=s.apl(s.linkTrackEvents,'event81',',',2);//SC15 update
        s.linkTrackEvents=s.apl(s.linkTrackEvents,'event82',',',2);//SC15 update
        s.linkTrackEvents=s.apl(s.linkTrackEvents,'event83',',',2);//SC15 update
        s.linkTrackEvents=s.apl(s.linkTrackEvents,'event84',',',2);//SC15 update
        s.linkTrackEvents=s.apl(s.linkTrackEvents,'event85',',',2);//SC15 update
        s.linkTrackEvents=s.apl(s.linkTrackEvents,'event86',',',2);//SC15 update
        s.linkTrackEvents=s.apl(s.linkTrackEvents,'event87',',',2);//SC15 update
    }
   
    /* BEGIN dell.com Only Logic */

    if(s.onDellCMS()){

        /* Utility script - check inputs for Dell values */
        s.ss_kw=s.getHTMLtag('input','kw','id','value');
        s.ss_rff=s.getHTMLtag('input','rff','id','value');
        s.es_on=s.getHTMLtag('input','order_number','name','value');
        s.ss_dkw=s.getQueryParam('sk'); //Check for direct search result keyword. Added 12/06/10

        /* Order Number (uses value from HTML input) */
        if(s.es_on)s.prop22=s.es_on;

        /* Site Search (uses values from HTML inputs) */
        if(s.ss_kw&&s.ss_rff){
            if(s.ss_rff=='1')s.prop7=s.ss_kw;
            else if(s.ss_rff=='2')s.prop7='reclink:'+s.ss_kw;
            else if(s.ss_rff=='3')s.prop7='othercat:'+s.ss_kw;
            else if(s.ss_rff=='0')s.prop7='null:'+s.ss_kw;
        }else if(s.ss_dkw){
            s.prop7='redirect:'+s.ss_dkw; //Save direct search result keyword. Added 12/06/10
        }
        if(s.prop7){
            s.prop7=s.prop7.toLowerCase();
            s.eVar36=s.prop7;
            var t_search=s.getValOnce(s.eVar36,'v36',0);
            if(t_search){
                s.events=s.apl(s.events,'event6',',',2);
                s.prop42=s.gpv_pn;
            }
        }

        s.prop43=s.getQueryParam('ID','','?'+gC('SITESERVER')); //Save ID parameter from SITESERVER cookie

        /* ServiceTag presented on page */
        if(!s.prop17)s.prop17=s.getHTMLtag('input','servicetagmetricsid','id','value');

        /* Set events based on pageName */
        if(s.pageName.indexOf('order^recentorders')>-1||s.pageName.indexOf('order^details')>-1||s.pageName.indexOf('order^singlestatus')>-1||s.pageName.indexOf('order^multiplestatus')>-1)s.events=s.apl(s.events,'event11',',',2);
        if(s.pageName.indexOf('dellstore^basket')>-1){s.events=s.apl(s.events,'scView',',',2);s.events=s.apl(s.events,'event81',',',2);} //set cart visit (config in SC once per visit)
        if(s.pageName.indexOf('chkout')>-1){s.events=s.apl(s.events,'scCheckout',',',2); s.events=s.apl(s.events,'event82',',',2);}//set checkout start (config in SC once per visit)

        /* Products/Events Handling */
        if(s.pageName.indexOf('sna^productdetail')>-1||s.pageName.indexOf('content^products^productdetails')>-1){
            var prod=s.getQueryParam('sku,oc');
            s.events=s.events?s.events:'';
            if(s.events.indexOf('prodView,event2')>-1)s.events=s.repl(s.events,'prodView,event2','');
            if(prod&&s.events.indexOf('event3')>-1){
                if(prod.indexOf(','))prod=s.repl(prod,',',',;');
                s.products=s.apl(s.products,';'+prod,',',2);
            }else{
                if(prod){
                    prod=s.dedupVal('sku_oc',prod);
                    if(prod){
                        if(prod.indexOf(','))prod=s.repl(prod,',',',;');
                        s.products=s.apl(s.products,';'+prod,',',2);
                        s.events=s.apl(s.events,'prodView',',',2);
                        s.events=s.apl(s.events,'event2',',',2);
                    }
                }
            }
        }

        /* Manage config starts by unique order code - most recent unique value per session will set the event */
        if(s.pageName.indexOf('dellstore^config')>-1){
            var oc=s.getQueryParam('oc');
            if(oc)oc=s.dedupVal('ocstart',oc);
            if(oc){
                s.products=s.apl(s.products,';'+oc,',',2);
                s.events=s.apl(s.events,'event10',',',2);
                s.events=s.apl(s.events,'prodView',',',2);
                s.events=s.apl(s.events,'event2',',',2);
            }
        }
        
        //Added on 09/11/2012 candy aisle oc visits
       if(s.pageName.indexOf('candyaisle')>-1){
           var oc=s.getQueryParam('oc');
           if(oc)oc=s.dedupVal('ocstart',oc);
           if(oc){
                s.products=s.apl(s.products,';'+oc,',',2);
                s.events=s.apl(s.events,'event56',',',2);
            }
       }

        /* Final check to see if we have products with no events, clear products if we do */
        if(s.products){
            s.products=s.events?s.products:'';
            s.events=s.events?s.events:'';
            /* Check for semicolon in products */
            if(s.products&&s.products.indexOf(';')!=0&&s.events.indexOf('scAdd')>-1){
                var p=s.products;
                if(p.indexOf(';')>-1&&p.indexOf(',;')>-1){
                    s.products=';'+p;
                }else if(p.indexOf(';')>-1){
                    var pa=s.split(p,';');
                    p=';'+pa[0];
                    for(var i=1;i<pa.length;i++)p+=',;'+pa[i];
                    s.products=p;
                }else{
                    s.products=';'+p;
                }
            }
        }

        /* Set events based on page URL */
        var loc=document.location.href;
        if(loc.indexOf('/financing/app.aspx')>-1||loc.indexOf('/financing/us_ca/app.aspx')>-1||loc.indexOf('/financing/process.aspx')>-1)s.events=s.apl(s.events,'event8',',',2); //set application start
        if(loc.indexOf('/financing/approved.aspx')>-1||loc.indexOf('/financing/us_ca/approved.aspx')>-1||loc.indexOf('/financing/declined.aspx')>-1 ||loc.indexOf('/financing/reviewed.aspx')>-1||loc.indexOf('/financing/us_ca/reviewed.aspx')>-1)s.events=s.apl(s.events,'event9',',',2); //set application complete

        /* Set S&P Visits */
        if(loc.indexOf('accessories')>-1||s.pageName.indexOf('accessories')>-1){s.events=s.apl(s.events,'event12',',',2);s.events=s.apl(s.events,'event84',',',2);}//SC15 Update

        /* Read and format cookie values */
        s.prop45=s.c_r('GAAuth');
        if(!s.prop45){
            var cookieArray=document.cookie.split(';');
            for(var i=0;i<cookieArray.length;i++){
                var cookie=cookieArray[i];
                while (cookie.charAt(0)==' ')cookie=cookie.substring(1,cookie.length);
                if(cookie.match(/gahot=/i))s.prop45=cookie.substring(6,cookie.length);
            }
        }
        s.prop46=s.c_r('Profile')?s.c_r('Profile'):s.c_r('profile');
        s.prop48=s.parseCookie('prt:Prof','cnm,sid,cs',','); //issues with this cookie read for prt:Prof?
        s.prop16=s.parseCookie('StormPCookie','penv',',');

        /* Read and store Baynote cookies */
        var bn_search=s.c_r('search_bn'); //Added 9/9/10: Get Baynote Search cookie
        if(bn_search)s.eVar11=bn_search;
        //var bn_snp=s.c_r('snp_bn'); //Added 9/9/10: Get Baynote SNP cookie
        //if(bn_snp)s.eVar13=bn_snp; Removed on 09/07/2012

        s.prop16=s.getQueryParam('penv','',s.prop16);

        s.prop12=(s.prop45)?'logged in':'not logged in';

        /* Added 07/09/10: special processing for error pages */
        if((s.pageName.indexOf('content^public^notfound')>-1)||(s.pageName.indexOf('content^public^error')>-1)){
            if(!s.prop44){ //put URL that resulted in error page in prop44
                var errQP=s.getQueryParam('searched');
                if(!errQP)errQP=s.getQueryParam('aspxerrorpath');
                s.prop44=errQP?errQP.replace(':80',''):document.location.href;
            }
            //Added 07/09/10: prevent error pages from being misclassified as "public" if referrer external or no LWP cookie
            var refdom=parseUri(document.referrer).host.toLowerCase();
            if(refdom.indexOf('dell.')==-1||!gC('lwp'))s.prop5='not set';
        }

        /* FIX: blank eVar30 value when pagename contains "ecomm" */
        loc=document.location.href;
        if(loc.indexOf('ecomm')>-1&&s.eVar30){
            s.eVar30='';
            if(s.events.indexOf('event10')>-1){
                var eventlist=s.split(s.events,',');
                for(i in eventlist){
                    if(eventlist[i]=='event10')eventlist[i]='';
                }
                s.events='';
                for(i in eventlist){
                    if(eventlist[i])s.events=s.apl(s.events,eventlist[i],',',2);
                }
            }
        }

        /* FIX: prefix ANAV caption */
        loc=document.location.href;
        loc=((loc&&loc.indexOf('?')>-1)?loc.substring(0,loc.indexOf('?')):loc).toLowerCase();

        /* T&T integration */
        s.tnt=s.trackTNT();

        /* iPerceptions integration */
        s.iPerceptionsURL =
                ((window.location.protocol=='https:')?'https://si.cdn':'http://i')
            + '.dell.com/images/global/omniture/ipge'
            +   ((s_account.substring(s_account.length-3)=='dev')?'_sit':'')
            +   '.htm';
        s.GenesisExchange.setExchangePageURL('iPerceptions',s.iPerceptionsURL);

        /* navigation method - merchandising eVar */
        /* Added 07/09/10: add check for ~ck=gzilla or ref=gzilla to set eVar40 to 'banner' */
        if(s.inList('event6',s.events,',')){
            s.eVar40='site search';
        }else if(s.eVar30&&s.eVar31){
            s.eVar40='anav';
            if(s.p_gh())s.linkTrackVars=s.apl(s.linkTrackVars,'eVar40',',',2);
        }else if(s.getQueryParam('~ck').toLowerCase()=='mn'){
            s.eVar40='masthead';
        }else if(s.getQueryParam('~ck').toLowerCase()=='hbn'||s.getQueryParam('ref').toLowerCase()=='hbn'||s.getQueryParam('~ck').toLowerCase()=='bnn'||s.getQueryParam('ref').toLowerCase()=='bnn'||s.getQueryParam('ref').toLowerCase()=='gzilla'||s.getQueryParam('~ck').toLowerCase()=='gzilla'){
            s.eVar40='banner';
        }else if(s.pageName){
            if(s.pageName.indexOf('advisorweb')>-1){
                s.eVar40='advisor';
            }
        }

        /* Added 07/09/10 release, changed on 10/01/10: substitute local domain for referrer if referrer starts with *nicos.co.jp */
        if(getDomainLevels(document.referrer,3)=='nicos.co.jp'){
            s.referrer=document.location.protocol+'//'+document.location.host.toString()+'/nicos-payment-processing';
        }
    }

    /* END dell.com Only Logic */

    /* Added 07/09/10: Get percent of page viewed */
    var ppv_c=s.getPercentPageViewed(s.pageName);   //Get values for prior page, pass this page's identifier
    if(ppv_c&&ppv_c.length>=4){ //Were values for the prior page returned?
        var ppv_pn=(ppv_c.length>0)?(ppv_c[0]):(''); //Extract last page's identifier
        var ppv_v=((ppv_c.length>0)?(ppv_c[1]):('')) //Extract last page's total % viewed
            +((ppv_c.length>2)?('|'+ppv_c[2]):(''));    //Extract last page's initial % viewed, separated by '|'
        if(ppv_pn&&ppv_v){  //Was pageName and percent % viewed values found?
            s.prop34=ppv_pn;    //Store percent page viewed values in the variable of your choice
            s.prop31=ppv_v; //Store the page identifier in the variable of your choice
        }
    }

    /* Campaign tracking */
    if(!s.campaign)s.campaign=s.getQueryParam('cid'); //landing_page_cid
    if(!s.eVar1)s.eVar1=s.getQueryParam('lid'); //landing_page_lid
    var cidLID = s.campaign +"::"+ s.eVar1;
    cidLID = s.getValOnce(cidLID,'cidlid',0);
    cidLID = cidLID.split('::');
    if(cidLID.length > 1){
        s.campaign = cidLID[0];
        s.eVar1 = cidLID[1];
    }else{
        s.campaign = '';
        s.eVar1 = '';
    }
    
    
    if(!s.eVar2 && s.campaign != ''){
        var dgc=s.getQueryParam('dgc');
        s.eVar2=dgc;
    } //landing_page_dgv
    s.eVar2=s.getValOnce(s.eVar2,'dgc',0);
    if(!s.eVar3)s.eVar3=s.getQueryParam('st'); //external_search_keyword
    s.eVar3=s.getValOnce(s.eVar3,'st',0);
    if(!s.eVar28)s.eVar28=s.getQueryParam('acd'); //affiliate code
    s.eVar28=s.getValOnce(s.eVar28,'acd',0);
    if(!s.eVar43)s.eVar43=s.getQueryParam('mid'); //aprimo message id
    s.eVar43=s.getValOnce(s.eVar43,'mid',0);
    if(!s.eVar44)s.eVar44=s.getQueryParam('rid'); //aprimo recipient id
    s.eVar44=s.getValOnce(s.eVar44,'rid',0);

    /* ODG visits */
    if(typeof(s.linkType)=='undefined'){
        s.odgValues='|af|ba|bf|cj|co|db|dc|ds|ec|em|ls|mb|ms|mt|rs|sm|ss|st|';
        var countrySegment='';
        if(s.prop2&&s.eVar32)countrySegment=s.prop2+'-'+s.eVar32;
        if(countrySegment){
            var d=new Date(),valueNotDeleted=true;
            if(s.c_r('e21')&&s.c_r('e21').indexOf(countrySegment)>-1){
                var e21Array=s.split(s.c_r('e21'),'::');
                for (i in e21Array){
                    if(e21Array[i].toString().indexOf(countrySegment)>-1){
                        var e21Array2=s.split(e21Array[i],':');
                        if(d.getTime()>e21Array2[1]){
                            if(e21Array.length==1){
                                d.setTime(d.getTime()-86400000); //one day ago
                                s.c_w('e21','',d);
                            }else{
                                e21Array.splice(i,1);
                                d.setTime(d.getTime()+30*86400000); //30 days from now
                                s.c_w('e21',e21Array,d);
                            }
                            valueNotDeleted=false;
                        }
                        if(valueNotDeleted){
                            var tempReferrer=s.d.referrer.substring(0,s.d.referrer.indexOf('?'));
                            if((s.eVar2&&s.odgValues.indexOf(s.eVar2.toLowerCase()+'|')==-1&&s.eVar2!='ir')||(!s.getQueryParam('dgc')&&tempReferrer&&!s.isInternal(tempReferrer))){
                                if(e21Array.length==1){
                                    d.setTime(d.getTime()-86400000); //24 hours ago
                                    s.c_w('e21','',d);
                                }else{
                                    e21Array.splice(i,1);
                                    d.setTime(d.getTime()+30*86400000); //30 days from now
                                    s.c_w('e21',e21Array,d);
                                }
                            }else{
                                s.events=s.apl(s.events,'event21',',',1);
                            }
                        }
                    }
                }
            }else{
                if((s.eVar2&&s.odgValues.indexOf(s.eVar2.toLowerCase()+'|')>-1)){
                    s.events=s.apl(s.events,'event21',',',1);
                    d.setTime(d.getTime()+30*86400000); //thirty days from now
                    var e21Cookie=s.c_r('e21');
                    e21Cookie=e21Cookie?e21Cookie+'::'+countrySegment+':'+d.getTime():countrySegment+':'+d.getTime();
                    s.c_w('e21',e21Cookie,d);
                }
            }
        }
    }


    if(s.tCall()){
        /* Calculate bounce rate for paid searches (for the Search Center POC) */
        s.SEMvar=s.getQueryParam('s_kwcid');
        s.SEMvar=s.getValOnce(s.SEMvar,'SEM_var',0);
        s.clickPast(s.SEMvar,'event46','event47','br_psearch');
        if(s.isInternal(document.location.href)){
            /** if the action depth is 1, then fire event44 and if it is 2 then fire event45 - (removed clickpast code) implemented by Jason Case on 25 April 2011 **/
            if(s.ActionDepthTest){
                if(typeof s.gpv_pn != 'undefined' && s.gpv_pn != s.pageName){
                    s.pdvalue=s.getActionDepth("s_depth");
                    if(s.pdvalue == 1) s.events=s.apl(s.events,'event44',',',2);
                    if(s.pdvalue == 2) s.events=s.apl(s.events,'event45',',',2);
                    s.ActionDepthTest=false;
                }
                
            }
        }
    }
    
    /* Internal Promos tracking */
    /** Edited by Surendhar to enhance IR tracking**/
    if(dgc&&dgc.toLowerCase()=='ir'){
       if(typeof s.gpv_pn != 'undefined' && s.gpv_pn != s.pageName && s.c_r('s_depth') > 1){ 
            s.eVar29=s.getQueryParam('cid')+':'+s.getQueryParam('lid');
            s.eVar29=s.getValOnce(s.eVar29,'ir',0);
        }
        s.campaign=s.eVar1=s.eVar2=s.eVar3=s.eVar28='';//if a IR code is present, clear other campaign variables
    }

    /* File downloads */
    s.downloadURL=s.downloadLinkHandler();
    if(s.downloadURL){
        s.prop33=s.downloadURL;
        s.prop33=s.prop33.indexOf('//')?s.prop33.substring(s.prop33.indexOf('//')+2):s.prop33;
        s.eVar23=s.prop33;
        s.prop32=s.pageName;
        s.events=s.apl(s.events,'event24',',',2);
        s.linkTrackVars=s.apl(s.linkTrackVars,'prop5',',',2);
        s.linkTrackVars=s.apl(s.linkTrackVars,'prop32',',',2);
        s.linkTrackVars=s.apl(s.linkTrackVars,'prop33',',',2);
        s.linkTrackVars=s.apl(s.linkTrackVars,'eVar23',',',2);
        s.linkTrackVars=s.apl(s.linkTrackVars,'events',',',2);
        s.linkTrackEvents=s.apl(s.linkTrackEvents,'event24',',',2);
    }

    //changed by Surendhar for not converting the prop5 to lowercase
    s.manageVars('lowercaseVars','events,prop5',2); //force all variables to lowercase

    s.linkTrackVars=s.apl(s.linkTrackVars,'prop49',',',2);
    s.linkTrackVars=s.apl(s.linkTrackVars,'prop46',',',2);
    s.linkTrackVars=s.apl(s.linkTrackVars,'server',',',2); //Add 'server' to link track vars

     
    /**
     * Tracking Site Search for KW on 3rd party sites - implemented by Jason Case 25 Apr 2011
     */ 
     if(s.isInternal(document.location.href) && !s.onDellCMS()){
        s.prop7 = s.getQueryParam('sk,k,q','::');
        if(s.prop7){
            s.prop7=s.prop7.toLowerCase();
            s.eVar36=s.prop7;
            var t_search=s.getValOnce(s.eVar36,'v36',0);
            if(t_search){
                s.events=s.apl(s.events,'event6',',',2);
                s.prop42=s.gpv_pn;
            }
        }
     }
     
     /** This is for reading the EQuoteID cookie into an eVar - implemented by Jason Case 25 Apr 2011 */    
        s.eVar7 = s.c_r('EQuoteID');  
     /** Read the link_number parameter for EPP info  - implemented by Jason Case 25 Apr 2011 **/
        s.eVar45 = s.getQueryParam('link_number'); 
     /** Capture the Release ID for a driver download - removed prop24 04/09/2012 **/
        //s.prop24 = s.getQueryParam('releaseid');  
     /** Capture the Doc ID - implemented by Jason Case 25 Apr 2011 **/
        s.prop51 = s.getQueryParam('docid');     
     /** Custom Pageview Metric - implemented by Jason Case 25 Apr 2011 **/
        s.events = s.events=s.apl(s.events,'event37',',',2);  
     /** View by Usage tabs and sub tabs - implemented by Jason Case 27 Apr 2011 **/
        s.eVar14 = s.getQueryParam('avt,avtsub'); 
     /** Added evar58 to capture rolename implemented by Surendhar 12 Apr 2012**/ 
        var roleNameCookie = s.getCookie('prt:Prof');
        roleNameCookie = (roleNameCookie == undefined)?"":roleNameCookie;
        //Assumption: Look for the rolename in first position,(don't want to increase search time for rolename)
        var roleName = roleNameCookie.split('&')[0].split('=');  
        if(roleName[0] == 'rolename'){
            s.eVar58 = roleName[1];
        }
        

    /** Channel Manager - replacing the Unified Sources VISTA rule. Added 17 May 2011**/
    s.channelManager('ba,st,em,af,cj,ss,dm,dc,sm,ec,jp,ad,ms,tv,ds,rs,mb,co,cid','','0',1,'s_dl');
    
    //put natural search keywords into eVar49
    if(s._keywords && s._keywords != 'n/a' && s._channel == 'Natural Search'){
        s.eVar49 = s._keywords;
        //concatenate natural search keyword with the url into eVar52 - ticket #358
        s.eVar52 = s._keywords +":"+ document.location.href;
    }
    var CID = s.getQueryParam('cid');
    if(CID && s.campaign){
        s.eVar48 = s.campaign;
    }else if(CID){
    }else if(location.href.indexOf('s_kwcid') > -1){
        s.eVar48 = 'SearchCenter';
    }else if(s._keywords && s._keywords != 'n/a'){
        s.eVar48 = s._partner+ " organic";
    }else if(s._referrer != 'Direct Load' && s._referrer != '' && s._referringDomain != '' &&
             s._referringDomain.indexOf('dell.') == -1 &&
             s._referringDomain.indexOf('dellfinancialservices.com') == -1 &&
             s._referringDomain.indexOf('dellcomputers.') == -1 &&
             s._referringDomain.indexOf('dellcomputer.') == -1){
        var domain = s._referringDomain.split('.');
        s.eVar48 = (domain.length>2 ? (domain[domain.length-3] +"."):'') +domain[domain.length-2] +"."+ domain[domain.length-1];
    }
    s.eVar51 = s.eVar2;
    if(s.eVar51==undefined || s.eVar51==''){
        if(s._channel){
            s.eVar51 = s._channel;
        }else if(s._keywords){
            s.eVar51 = 'Organic Search';
        }else if(s._referringDomain){
            s.eVar51 = s._referringDomain;
        }
    }

    s.eVar51 = s.crossVisitParticipation(s.eVar51,'s_channelstack','90','5',' > ','purchase','1');
    
    /** Grab s_vi value and store in prop47 **/
    s.prop47 = 'D=s_vi';
    
    /** product details - ticket #358 **/
    if(s.prop1=='productdetails')
        s.events=s.apl(s.events,'event46',',',2);

    /** Tracking RGID - ticket #384 **/
    s.prop53 = s.getQueryParam('rgid');
    
    /** Putting pageName into an eVar - ticket #396 **/
    s.eVar53 = 'D=pageName';
    
    /** Setting the URL to prop14 - ticket #278 **/
    s.prop14 = (location.href.split('?'))[0];
    
    /** Setting event41 when support and contact are found in the URL **/
    if(location.href.indexOf('support') > -1 && location.href.indexOf('contact') > -1)
        s.events = s.apl(s.events,'event41',',',2);

    /** Set User Guide Parameters - ticket #243 Removed prop58 by Surendhar**/
    /*s.prop58 = s.getQueryParam('~subcat') +':'+ s.getQueryParam('~cat');
    if(s.prop58 == ':') s.prop58 = '';*/ 
    
    /** Added system visits by Surendhar 12 Apr 2012  **/
    if(!s_dell.events.match('event22') && location.href.indexOf('accessories') < 0){
        s.events=s.apl(s.events,'event49',',',2); //raise event49 for system visits
        s.events=s.apl(s.events,'event87',',',2);   //SC15 update
    }

    /** Adding TeaLeaf Code - implemented by Jason Case 25 Apr 2011 **/
    if (typeof(TeaLeaf) != "undefined" &&  typeof(TeaLeaf.Client) != "undefined") {
           var OMTagsToTL = new TeaLeaf.Event(TeaLeaf.$C("UIEventAppInfo"), "OMTagsToTL");
                  var teaLeafArray = new Array();
                    teaLeafArray = ["tl_pageName",TeaLeaf.Event.tlFormatXML(s_dell.pageName),
                                    "tl_events", TeaLeaf.Event.tlFormatXML(s_dell.events),
                                    "tl_campaign", TeaLeaf.Event.tlFormatXML(s_dell.campaign),
                                    "tl_c7", TeaLeaf.Event.tlFormatXML(s_dell.prop7),
                                    "tl_c8", TeaLeaf.Event.tlFormatXML(s_dell.prop8),
                                    "tl_c9", TeaLeaf.Event.tlFormatXML(s_dell.prop9),
                                    "tl_c10", TeaLeaf.Event.tlFormatXML(s_dell.prop10),
                                    "tl_c12", TeaLeaf.Event.tlFormatXML(s_dell.prop12),
                                    "tl_c23", TeaLeaf.Event.tlFormatXML(s_dell.prop23),
                                    "tl_dgv",TeaLeaf.Event.tlFormatXML(s_dell.eVar2)];
           OMTagsToTL.tlAddData(teaLeafArray);
           OMTagsToTL.tlSend();
    }
    
    /** Floating footer code - added 26 Oct 2011 by Jason Case modified 16/3/12 to add check**/
    if(document.getElementById("floatingToolbar") && (s.eVar38 === undefined || s.evar38 == '')){
        if(s.c_r('hideDellToolbar') == "true"){
            s.eVar38 = 'floating toolbar: closed';
        }else{
            s.eVar38 = 'floating toolbar: open';
        }
    }else if(s.eVar38 === undefined || s.evar38 == ''){
        s.eVar38 = 'floating toolbar: no toolbar';
    }
    
    /** Capture MFGPID from SNP querystring implemented by Surendhar 04/30/2012 **/
    s.eVar59 = s.getQueryParam('mfgpid');
    
    /** Capture Partner Data 01/21/2013 **/
    if(document.getElementById("ctl00_ctl00_PartnerData")){
        var element = document.getElementById("ctl00_ctl00_PartnerData");
        s.eVar57 = element.value;
    }
    
    var hostname = s_dell.d.location.hostname;
    if(hostname.indexOf('partnerdirect.dell.com')>-1||hostname.indexOf('ping.dellcampaignbuilder.com')>-1||hostname.indexOf('dell.netexam.com')>-1){
        s_dell.prop5="Channel Online";
    }

    
    /** Capture the PCID from the mbox cookie and place it in prop59 - added on 7 Dec 11 by jcase */
    s.mboxCookie = s.c_r('mbox');
    if(s.mboxCookie){
        try{
            s.mboxCookie = s.mboxCookie.split('|');
            for (var i in s.mboxCookie){
                if(s.mboxCookie[i].indexOf('PC')>-1)
                    s.pcid = i;
            }
            s.pcid = s.mboxCookie[s.pcid];
            s.pcid = s.pcid.split('#');
            s.pcid = s.pcid[1];
            s.prop59 = s.pcid;
        }catch(err){
            //console.debug('error parsing pcid in mbox cookie:  '+err);
        }finally{
            if(s.c_r('mbox').indexOf('timeout')>-1){
                s.prop59 = 'browsertimeout';
            }
        }
    }//end mbox code
    
    /** Profiling cookie creation and updating **/
    s.c_r('s_hwp')=='' ? s.createData() : s.updateData();
    
    /** Masthead Tracking - April 2012 by Steve Pelhan **/
    var temp = s.c_r('mhclicktrack');
    if (temp && !doPluginsRanAlready){
        temp=s.split(temp,'|');
        var mhValues=new Array();
        var pairs;
        for (var x=0; x<temp.length;x++){
            if(temp[x]) pairs=s.split(temp[x],'=');
            if (pairs[1]) mhValues[x]=pairs[1];
        }
        // ordinal | launch | title | subtitle
        s.prop62 = mhValues[3] + "|" + mhValues[5] + "|" + mhValues[1] + "|" + mhValues[2];
        s.prop62=s.getValOnce(s.prop62,'gvo_c62');
    }
    
    /*SC15 Update starts*/
    var key=s.getQueryParam('c','',s.prop49)+ ':' + s.getQueryParam('s','',s.prop49);
    if (s.prop5!='Channel Online') s.oncePerVisit(key); 
    /*SC15 Update ends*/
   
   //Added on 09/10/2012 eSupport request 749
   if(s.getPNfromURL().indexOf('accessories')>-1){
       var metricsFamily = "", metricsPath = s.getHTMLtag('meta','metricspath');
       if(metricsPath.indexOf('family')>-1){
           metricsFamily = '::'+metricsPath.split('family=')[1].split(']')[0];
           s.pageName += metricsFamily;
           s.prop13 += metricsFamily;
       }else if(metricsPath.indexOf('mfgpid')>-1){
           metricsFamily = '::'+metricsPath.split('mfgpid=')[1].split(']')[0];
           s.pageName += metricsFamily;
           s.prop13 += metricsFamily;
       }
   }
   
   if(document.location.protocol == 'file:'){
       s.un = 'dellinternal';
   }
    s.cookieLifetime=6.31139e7;
    doPluginsRanAlready = true;
}
s_dell.doPlugins=s_dell_doPlugins

/*
 * Partner Plugin: Gigya v3 (BEGIN)  //added 12 July for ticket #373
 */
var gigya_omniture_conf = {
    linkName: 'Gigya Action',
  eventMap : [
    {
      gigEvent:"login",
      omtrEvents:["event42"],
      mapVars:["eVar55=user.loginProvider", "eVar54=getAge()", "eVar54=getGender()", "eVar54=getiRank()"]
    },
    {
      gigEvent:"sendDone",
      omtrEvents:["event43"],
      mapVars:["eVar55=providers","products"]
    },
    {
      gigEvent:"commentSubmitted--disabled",
      omtrEvents:[""],
      mapVars:["eVar55=providerPostIDs","products"]
    },
    {
      gigEvent:"reactionClicked--disabled",
      omtrEvents:[""],
      mapVars:["=reaction.ID","products"]
    }
  ],
    getAge:function(evt) {
        var a=evt.user['age']
        if(typeof(a)=="number"&&a>0){
            return a;
        }
        return '?';
    },
    getGender:function(evt) {
        var g=evt.user['gender']
        if(typeof(g)=="string"&&g.length>0){
            return g;
        }
        return '?';
    },
    getiRank:function(evt) {
        if(typeof(evt.user['iRank'])=="string"){
          var r = parseFloat(evt.user['iRank']).toFixed(0);
          if(r >= 0.0001) return r;
        }
        return '?';
    }
}
/*
 * Partner Plugin: Gigya v3 (END)
 */
/* ********************* S7 Viewer Tracking ***************************** */
s_dell.baseCategory = "";
s_dell.viewerFrame = "";
s_dell.lastFrame = "";
s_dell.viewerType = "unknown";
s_dell.asset = "";
s_dell.internalCounter = 0;

// Changes to dispatch 1)zoom level number, 2)Image map data once  3) zoom data when initiated by user than within the viewer - 
s_dell.currAsset = ""; // Hold the current asset name - Zoom Tracking Additions
s_dell.currZoomLevel = "";  // Hold the current zoom Level I/II/III - to avoid repeated reports in the current viewing session
s_dell.currImageMaps = new Array(); // Hold the  image map keys - to avoid repeated reports in the current viewing session
s_dell.zoomLevelNumbers = [37,74,100];
s_dell.zoomLevelCategories = ['I','II','III'];
s_dell.currEvent = "";  // Hold the current event to evaluate whether to report the zoom details or not.
s_dell.prevEvent = ""; // Hold Previous Event to supress the ZOOM event right after SPIN event.
s_dell.currAssetType = ""; // Hold asset type to update the zoom 'targ' data. If it is 'spin' asset type, 'targ' is sent as 'assetname : spin'. All other cases, it will be 'assetname : <zoom level>'

s_dell.zoomEventCnt = 0;// Keep track of the zoomevents. (For SPIN, the ZOOM event is dispatched three times for the last image of the spinset)

function s7ComponentEvent (objectID, componentClass, instanceName, timeStamp, eventData) {
    s7track(eventData);
};


function s7pullProductParam(query) {
    if (!query) return "";

    var dQuery;
    try {
        dQuery = decodeURIComponent(query);
    } catch (e) {
        dQuery = query;
    }
    var lQuery = dQuery.toLowerCase();

    var params = ["rolloverkey", "rollover_key", "p", "productkey", "pid"];
    for (var n in params) {
        var m1 = lQuery.indexOf(params[n]+'=');
        if (m1 == undefined || m1 == -1) continue;
        m1 += params[n].length + 1;

        var m2 = lQuery.indexOf("&", m1);
        return (m2 > m1) ? dQuery.substring(m1, m2) : dQuery.substr(m1);
    }
    return "";
}

function s7track(eventInfo, rolloverInfo) {
    var eventValues = eventInfo.split(',');
    var eventType = eventValues[0].toString();
    var eventData = (eventValues.length > 1) ? unescape(eventValues[1].toString()) : "";


    var params = new Array();
    var paramsRaw = eventInfo.split(",");
    var tmp="";
    for (var param in paramsRaw) {
        tmp = paramsRaw[param].toString();
        if(tmp.length<100){
            params.push(decodeURIComponent(paramsRaw[param] + ''));
        }
    }

    if (eventType == "SWATCH") eventType = "PAGE";
    if (eventType == "SPIN") eventType = "PAGE";
    if (eventType == "TARG") eventType = "TARGET";
    //if (eventType == "RELOAD") eventType = "SWAP";

    /*
    if (eventType == "PAGE") {
        if(eventData == "0")
             s_dell.baseCategory = "p1";
        else
             s_dell.baseCategory = "p" + parseInt(eventData)*2 + "-" + (parseInt(eventData)*2+1);
        s_dell.pageName = params[2];
        s_dell.lastFrame = s_dell.viewerFrame;
        s_dell.viewerFrame = params[1];
    } else 
    */
    
    // Track the PAGE event to not to send ZOOM event data. 
    if(eventType == "PAGE"){
        s_dell.currEvent = "PAGE";
    }
    
    if (eventType == "SWAP") {
        s_dell.lastFrame = s_dell.viewerFrame;
        s_dell.viewerFrame = params[1];
        if (params.length >= 2) {
            s_dell.asset = params[1];    
        }
    } else if (eventType == "LOAD") {
        if (params.length > 1) {
        
            s_dell.currEvent = "LOAD";  
        
            s_dell.viewerType = params[1];
            var assetPos = 6;   // sdk based viewers?
            if (s_dell.viewerType == 3) assetPos = 7; // eCatalog, special case
            else if (s_dell.viewerType == 2) assetPos = 7; // imageset, special case
            else if (s_dell.viewerType == 5) assetPos = 7; // old (?) video viewer
            else if (s_dell.viewerType < 100) assetPos = 7; // thought the default was 5th pos?

            if (params.length >= assetPos)
                s_dell.asset = params[assetPos]+'';


      // For first-time get the first asset name through JSON ImageServing Request - Zoom Tracking Additions 
       var url = 'http://scene7-cdn.dell.com/is/image/'+ s_dell.asset+'?req=set,json';                
        $.ajax({
            url: url, 
            data: "id=response1",
            dataType: "jsonp"

        });
        }
    }


    s_dell.prop4='';


    s_dell.internalCounter++;

 /*
    if (eventType == "LOAD") {
        s_dell.prop4=params[1];
        s_dell.linkTrackVars='prop4';
        return s_dell.t();
    }



   if (eventType == "PAGE") {
        s_dell.prop4=s_dell.pageName;
        s_dell.linkTrackVars='prop4';

        return s_dell.t();
    }
    */
    
    if(eventType == "ITEM" && eventData.indexOf("rollover")!=-1){
        var equalIndex = eventData.indexOf("=");
        var keyData = eventData.substring(equalIndex+1);

    // Avoid multiple reports of the same image map key . Store keys in array and suppress if it is already reported.
    var found = false;
    var currImageMapName = "";
    for(var i = 0; i < s_dell.currImageMaps.length; i++ ){
        currImageMapName = s_dell.currImageMaps[i];
        if(currImageMapName==keyData){
            found = true;
            break;
        }
    }
        // Check the value and reset currImageMap
        if(!found){
        s_dell.currImageMaps.push(keyData);
        
        s_dell.prop4 = keyData;
        s_dell.linkTrackVars='prop4';

        return s_dell.t();
        
        }

    }
    
    if(eventType == "ZOOM"){
   
    // if it is true zoom event  then only write data.
    // For Gallery viewer, when the image is loaded to viewer, it is zoomed in.
    // Request from SiteCatalyst team is to  report this zoom event only when it is initiated by the user.Do not report it for LOAD, SWAP,PAGE events.
    var bWriteZoomEventData = true;  
        
        
        // Keep track of the Zoom events. This handling is specific for spin view where it triggers 3 ZOOM events and those events should not be reported. Report zoom events if initiated by the user.
        if(s_dell.prevEvent == "PAGE" || s_dell.zoomEventCnt >0 ){
            s_dell.zoomEventCnt = s_dell.zoomEventCnt+1;    
        }
        
        
        
        if(s_dell.currEvent == "LOAD" || s_dell.currEvent == "SWAP" || s_dell.currEvent == "PAGE" || s_dell.prevEvent == "PAGE" || (s_dell.zoomEventCnt>1 && s_dell.zoomEventCnt<=3) ) {
            s_dell.currEvent = "ZOOM";
            bWriteZoomEventData = false;
            //continue;
        }   


        if(bWriteZoomEventData){
        
            /*if(s_dell.currAssetType == 'spin'){
            s_dell.prop4= 'targ:'+s_dell.currAsset +':'+ s_dell.currAssetType;
            }else{
            */
            var zoomLevel = Math.round(params[1]);
            for(var i=0;i< s_dell.zoomLevelNumbers.length; i++){
                if(zoomLevel <=s_dell.zoomLevelNumbers[i]){
                    s_dell.prop4= 'targ:'+s_dell.currAsset +':'+ s_dell.zoomLevelCategories[i];
                    break;
                }
            }
        //}
        s_dell.currAssetType ="";
        
        //s_dell.prop4= 'targ:'+s_dell.currAsset +':'+ Math.round(params[1]);
        s_dell.linkTrackVars='prop4';
        return s_dell.t();
        }
    
    }


    if (eventType == "TARGET") {
        s_dell.prop4=params[0];
        s_dell.linkTrackVars='prop4';

        return s_dell.t();
    }

    if (eventType == "SWAP") {
    
        s_dell.currEvent = "SWAP";  
        s_dell.prop4= s_dell.asset;
        s_dell.currAsset = s_dell.asset;
        s_dell.linkTrackVars='prop4';

        return s_dell.t();
    }

    if (eventType == "HREF") {
        s_dell.prop4=(rolloverInfo==undefined?s7pullProductParam(eventData):rolloverInfo);
        s_dell.linkTrackVars='prop4';

        return s_dell.t();
    }
    
    s_dell.prevEvent = s_dell.currEvent;

    s_dell.internalCounter--;//only count tracked events
}

// - Zoom Tracking Additions 
function s7jsonResponse(data,id) {
        s_dell.currAsset = data.set.item[0].i.n;
        s_dell.currAssetType = data.set.type;
    }
// - Zoom Tracking for Spin Set
function assetType(data,id) {
        s_dell.currAssetType = data.set.type;
    }

/* ********************* END S7 Viewer Tracking ***************************** */
 
/* ************************ PLUGINS SECTION *********************** */
/* You may insert any plugins you wish to use here. */

/*
 * Plugin: getCookie for cookies with special characters
 * Added by Surendhar
 */
s_dell.getCookie = function(a){var b,c,d,e=document.cookie.split(";");
for(b=0;b<e.length;b++){c=e[b].substr(0,e[b].indexOf("="));
d=e[b].substr(e[b].indexOf("=")+1);c=c.replace(/^\s+|\s+$/g,"");
if(c==a){return unescape(d)}}return "";}

/*
 * Plugin: rml v2.0 - removes cookie from the list as part of once per visit events
 */
s_dell.rml=new Function("value","list","separator",""
+"separator=separator||',';var values=list.split(',');for(var i=0;i<v"
+"alues.length;i++){if(values[i]==value){values.splice(i,1);return va"
+"lues.join(',');}}return list;");

/*
 * Plugin: oncePerVisit v2.0 - SC15
 */
s_dell.oncePerVisit=new Function("key","eventList","days","cookieName",""
+"var s=this;var keyValueString,keyValues;var events;var foundKey=fal"
+"se;var date;var newEventList;var cookieEvents;var newCookieValue=''"
+";if(days){if(days!=0){date=new Date();var currentTime=date.getTime("
+");date.setTime(currentTime+days*24*60*60*1000);}else date=0;}else{d"
+"ate=new Date();var currentTime=date.getTime();date.setTime(currentT"
+"ime+30*60*1000);}eventList=eventList?eventList:s.eventList;eventLis"
+"t=s.split(eventList,',');cookieName=cookieName?cookieName:'s_opv';v"
+"ar cookieValue=s.c_r(cookieName);if(cookieValue){keyValueString=s.s"
+"plit(cookieValue,'>');var keys;for(i=0;i<keyValueString.length;i++)"
+"{keyValues=s.split(keyValueString[i],'|');newEventList=cookieEvents"
+"=keyValues[1];if(keyValues[0]==key){foundKey=true;events=s.split(s."
+"events,',');for(x=0;x<events.length;x++){for(y=0;y<eventList.length"
+";y++){if(events[x]==eventList[y]){if(s.inList(events[x],cookieEvent"
+"s)){s.events=s.rml(events[x],s.events);}newEventList=s.apl(newEvent"
+"List,events[x],',',2);}}}}newCookieValue=s.apl(newCookieValue,keyVa"
+"lues[0]+'|'+newEventList,'>',0);}if(!foundKey){for(x=0;x<eventList."
+"length;x++){if(s.inList(eventList[x],s.events)){newEventList=s.apl("
+"newEventList,eventList[x],',',2);}else{newEventList=s.rml(eventLis"
+"t[x],newEventList);}}if(newEventList)s.c_w(cookieName"+",cookieVal"
+"ue+'>'+key+'|'+newEventList,date);else s.c_w(cookieName,n"+"ewCook"
+"ieValue,date);}else{s.c_w(cookieName,newCookieValue,date);}}e"
+"lse{events=s.split(s.events,',');for(x=0;x<eventList.length;x++){fo"
+"r(y=0;y<events.length;y++){if(eventList[x]==events[y]){newEventList"
+"=s.apl(newEventList,events[y],',',0);}}}if(newEventList)s.c_w(cooki"
+"eName,key+'|'+newEventList,date);}");

/*
 * Plugin: getQueryParam 2.3
 */
s_dell.getQueryParam=new Function("p","d","u",""
+"var s=this,v='',i,t;d=d?d:'';u=u?u:(s.pageURL?s.pageURL:s.wd.locati"
+"on);if(u=='f')u=s.gtfs().location;while(p){i=p.indexOf(',');i=i<0?p"
+".length:i;t=s.p_gpv(p.substring(0,i),u+'');if(t){t=t.indexOf('#')>-"
+"1?t.substring(0,t.indexOf('#')):t;}if(t)v+=v?d+t:t;p=p.substring(i="
+"=p.length?i:i+1)}return v");
s_dell.p_gpv=new Function("k","u",""
+"var s=this,v='',i=u.indexOf('?'),q;if(k&&i>-1){q=u.substring(i+1);v"
+"=s.pt(q,'&','p_gvf',k)}return v");
s_dell.p_gvf=new Function("t","k",""
+"if(t){var s=this,i=t.indexOf('='),p=i<0?t:t.substring(0,i),v=i<0?'T"
+"rue':t.substring(i+1);if(p.toLowerCase()==k.toLowerCase())return s."
+"epa(v)}return ''");

/*
 * Plugin: getValOnce 0.2 - get a value once per session or number of days
 */
s_dell.getValOnce=new Function("v","c","e",""
+"var s=this,k=s.c_r(c),a=new Date;e=e?e:0;if(v){a.setTime(a.getTime("
+")+e*86400000);s.c_w(c,v,e?a:0);}return v==k?'':v");

/*
 * Plugin: getPreviousValue_v1.0 - return previous value of designated
 *  variable (requires split utility)
 */
s_dell.getPreviousValue=new Function("v","c","el",""
+"var s=this,t=new Date,i,j,r='';t.setTime(t.getTime()+1800000);if(el"
+"){if(s.events){i=s.split(el,',');j=s.split(s.events,',');for(x in i"
+"){for(y in j){if(i[x]==j[y]){if(s.c_r(c)) r=s.c_r(c);v?s.c_w(c,v,t)"
+":s.c_w(c,'no value',t);return r}}}}}else{if(s.c_r(c)) r=s.c_r(c);v?"
+"s.c_w(c,v,t):s.c_w(c,'no value',t);return r}");

/*
 * DynamicObjectIDs v1.4: Setup Dynamic Object IDs based on URL
 */
s_dell.setupDynamicObjectIDs=new Function(""
+"var s=this;if(!s.doi){s.doi=1;if(s.apv>3&&(!s.isie||!s.ismac||s.apv"
+">=5)){if(s.wd.attachEvent)s.wd.attachEvent('onload',s.setOIDs);else"
+" if(s.wd.addEventListener)s.wd.addEventListener('load',s.setOIDs,fa"
+"lse);else{s.doiol=s.wd.onload;s.wd.onload=s.setOIDs}}s.wd.s_semapho"
+"re=1}");
s_dell.setOIDs=new Function("e",""
+"var s=s_c_il["+s_dell._in+"],b=s.eh(s.wd,'onload'),o='onclick',x,l,u,c,i"
+",a=new Array;if(s.doiol){if(b)s[b]=s.wd[b];s.doiol(e)}if(s.d.links)"
+"{for(i=0;i<s.d.links.length;i++){l=s.d.links[i];c=l[o]?''+l[o]:'';b"
+"=s.eh(l,o);z=l[b]?''+l[b]:'';u=s.getObjectID(l);if(u&&c.indexOf('s_"
+"objectID')<0&&z.indexOf('s_objectID')<0){u=s.repl(u,'\"','');u=s.re"
+"pl(u,'\\n','').substring(0,97);l.s_oc=l[o];a[u]=a[u]?a[u]+1:1;x='';"
+"if(c.indexOf('.t(')>=0||c.indexOf('.tl(')>=0||c.indexOf('s_gs(')>=0"
+")x='var x=\".tl(\";';x+='s_objectID=\"'+u+'_'+a[u]+'\";return this."
+"s_oc?this.s_oc(e):true';if(s.isns&&s.apv>=5)l.setAttribute(o,x);l[o"
+"]=new Function('e',x)}}}s.wd.s_semaphore=0;return true");

/*
 * Plugin: downloadLinkHandler 0.5 - identify and report download links
 */
s_dell.downloadLinkHandler=new Function("p",""
+"var s=this,h=s.p_gh(),n='linkDownloadFileTypes',i,t;if(!h||(s.linkT"
+"ype&&(h||s.linkName)))return '';i=h.indexOf('?');t=s[n];s[n]=p?p:t;"
+"if(s.lt(h)=='d')s.linkType='d';else h='';s[n]=t;return h;");

/*
 * Utility Function: p_gh
 */
s_dell.p_gh=new Function(""
+"var s=this;if(!s.eo&&!s.lnk)return '';var o=s.eo?s.eo:s.lnk,y=s.ot("
+"o),n=s.oid(o),x=o.s_oidt;if(s.eo&&o==s.eo){while(o&&!n&&y!='BODY'){"
+"o=o.parentElement?o.parentElement:o.parentNode;if(!o)return '';y=s."
+"ot(o);n=s.oid(o);x=o.s_oidt}}return o.href?o.href:'';");

/*
 * Utility clearVars v0.1 - clear variable values (requires split 1.5)
 */
s_dell.clearVars=new Function("l","f",""
+"var s=this,vl,la,vla;l=l?l:'';f=f?f:'';vl='pageName,purchaseID,chan"
+"nel,server,pageType,campaign,state,zip,events,products';for(var n=1"
+";n<51;n++)vl+=',prop'+n+',eVar'+n+',hier'+n;if(l&&(f==1||f==2)){if("
+"f==1){vl=l}if(f==2){la=s.split(l,',');vla=s.split(vl,',');vl='';for"
+"(x in la){for(y in vla){if(la[x]==vla[y]){vla[y]=''}}}for(y in vla)"
+"{vl+=vla[y]?','+vla[y]:'';}}s.pt(vl,',','p_clr',0);return true}else"
+" if(l==''&&f==''){s.pt(vl,',','p_clr',0);return true}else{return fa"
+"lse}");
s_dell.p_clr=new Function("t","var s=this;s[t]=''");

/*
 * Plugin Utility: apl v1.1
 */
s_dell.apl=new Function("l","v","d","u",""
+"var s=this,m=0;if(!l)l='';if(u){var i,n,a=s.split(l,d);for(i=0;i<a."
+"length;i++){n=a[i];m=m||(u==1?(n==v):(n.toLowerCase()==v.toLowerCas"
+"e()));}}if(!m)l=l?l+d+v:v;return l");

/*
 * Utility: inList v1.0 - find out if a value is in a list
 */
s_dell.inList=new Function("v","l","d",""
+"var s=this,ar=Array(),i=0,d=(d)?d:',';if(typeof(l)=='string'){if(s."
+"split)ar=s.split(l,d);else if(l.split)ar=l.split(d);else return-1}e"
+"lse ar=l;while(i<ar.length){if(v==ar[i])return true;i++}return fals"
+"e;");

/*
 * Plugin Utility: split v1.5 (JS 1.0 compatible)
 */
s_dell.split=new Function("l","d",""
+"var i,x=0,a=new Array;while(l){i=l.indexOf(d);i=i>-1?i:l.length;a[x"
+"++]=l.substring(0,i);l=l.substring(i+d.length);}return a");

/*
 * Plugin Utility: replace v1.0
 */
s_dell.repl=new Function("x","o","n",""
+"var i=x.indexOf(o),l=n.length;while(x&&i>=0){x=x.substring(0,i)+n+x."
+"substring(i+o.length);i=x.indexOf(o,i+l)}return x");

/*
 * Utility manageVars v0.2 - clear variable values (requires split 1.5)
 */
s_dell.manageVars=new Function("c","l","f",""
+"var s=this,vl,la,vla;l=l?l:'';f=f?f:1 ;if(!s[c])return false;vl='pa"
+"geName,purchaseID,channel,server,pageType,campaign,state,zip,events"
+",products,transactionID';for(var n=1;n<51;n++){vl+=',prop'+n+',eVar"
+"'+n+',hier'+n;}if(l&&(f==1||f==2)){if(f==1){vl=l;}if(f==2){la=s.spl"
+"it(l,',');vla=s.split(vl,',');vl='';for(x in la){for(y in vla){if(l"
+"a[x]==vla[y]){vla[y]='';}}}for(y in vla){vl+=vla[y]?','+vla[y]:'';}"
+"}s.pt(vl,',',c,0);return true;}else if(l==''&&f==1){s.pt(vl,',',c,0"
+");return true;}else{return false;}");
s_dell.clearVars=new Function("t","var s=this;s[t]='';");
s_dell.lowercaseVars=new Function("t",""
+"var s=this;if(s[t]){s[t]=s[t].toLowerCase();}");

/*
 * Custom Dell Plugin: parseCookie for desired params, format as query string
 * (requires s.split, s.apl)
 */
s_dell.parseCookie=new Function("c","pl","d",""
+"var s=this,pla,ca,o='',j,l;c=s.c_r(c);if(c){pla=s.split(pl,d);ca=s.s"
+"plit(c,'&');for(x in pla){for(y in ca){j=pla[x]+'=';l=''+ca[y];l=l.t"
+"oLowerCase();l=l.indexOf(j.toLowerCase());if(l>-1)o=s.apl(o,ca[y],'&"
+"',0)}}if(o)o='?'+o;}return o");

/*
 * Custom Dell Plugin: dedupVal
 */
s_dell.dedupVal=new Function("c","v",""
+"var s=this,r;if(s.c_r(c)){r=s.c_r(c);if(v==r)return '';else s.c_w(c,"
+"v)}else{s.c_w(c,v)}return v");

/*
 * TNT Integration Plugin v1.0
 */
s_dell.trackTNT =new Function("v","p","b",""
+"var s=this,n='s_tnt',p=p?p:n,v=v?v:n,r='',pm=false,b=b?b:true;if(s."
+"getQueryParam){pm=s.getQueryParam(p);}if(pm){r+=(pm+',');}if(s.wd[v"
+"]!=undefined){r+=s.wd[v];}if(b){s.wd[v]='';}return r;");

/*
 * GenesisExchange v0.3.1 (compact)
 */
s_dell.createGEObject=new Function("s",""
+"var _g=new Object;_g.s=s;_g.p=new Object;_g.setPartnerEventHandler="
+"function(pId,eh){if(!this.p[pId]){this.p[pId]=new Object;}this.p[pI"
+"d].__eh=eh;};_g.firePartnerEvent=function(pId,eId,ePm){this.p[pId]."
+"__eh(eId,ePm);};_g.setExchangePageURL=function(pId,url){if(!this.p["
+"pId]){this.p[pId]=new Object;}this.p[pId].__ep=url;};_g.getPageData"
+"=function(pId){var q='';if(this.p[pId]&&this.p[pId].__ep){q+='ge_pI"
+"d='+this._euc(pId)+'&ge_url='+this._euc(this.p[pId].__ep)+'&pageURL"
+"='+this._euc(document.location.href);}var v='pageName,server,channe"
+"l,pageType,products,events,campaign,purchaseID,hier1,hier2,hier3,hi"
+"er4,hier5';for(var i=1;i<=50;i++){v+=',prop'+i+',eVar'+i;}var a=thi"
+"s._split(v,',');for(var i=0;i<a.length;i++){if(this.s[a[i]]){q+=(q?"
+"'&':'')+a[i]+'='+this._euc(this.s[a[i]]);}}return q;};_g.getObjectF"
+"romQueryString=function(qsParam){var v=this._getQParam(qsParam);var"
+" r=new Object;if(v){v=this._duc(v);l=this._split(v,'&');for(i=0;i<l"
+".length;i++){kv=this._split(l[i],'=');r[kv[0]]=this._duc(kv[1]);}}r"
+"eturn r;};_g.productsInsert=function(p,e,v){var i=0,j=0,r='',pd=thi"
+"s._split(p,',');for(i=0;i<pd.length;i++){if(i>0){r+=',';}var el=thi"
+"s._split(pd[i],';');for(j=0;j<6;j++){if(j<4){r+=(el.length>j?el[j]:"
+"'')+';';}else if(j==4){r+=(el[j]?el[j]+'|':'')+e+';';}else if(j==5)"
+"{r+=(el[j]?el[j]+'|':'')+v;}}}return r;};_g._getQParam=function(k,q"
+"){var m=this,l,i,kv;if(q==undefined||!q){q=window.location.href;}if"
+"(q){i=q.indexOf('?');if(i>=0){q=q.substring(i+1);}l=this._split(q,'"
+"&');for(i=0;i<l.length;i++){kv=this._split(l[i],'=');if(kv[0]==k){r"
+"eturn kv[1];}}}return '';};_g._euc=function(str){return typeof enco"
+"deURIComponent=='function'?encodeURIComponent(str):escape(str);};_g"
+"._duc=function(str){return typeof decodeURIComponent=='function'?de"
+"codeURIComponent(str):unescape(str);};_g._split=function(l,d){var i"
+",x=0,a=new Array;while(l){i=l.indexOf(d);i=i>-1?i:l.length;a[x++]=l"
+".substring(0,i);l=l.substring(i+d.length);}return a;};return _g;");
s_dell.GenesisExchange=s_dell.createGEObject(s_dell);

/*
 * Plugin getPercentPageViewed v1.4 - determine percent of page viewed
 */
s_dell.handlePPVevents=new Function (""
+"var s=s_c_il["+s_dell._in+"];"
+"if(!s.getPPVid)return;var dh=Math.max(Math.max(s.d.body.scrollHeigh"
+"t,s.d.documentElement.scrollHeight),Math.max(s.d.body.offsetHeight,"
+"s.d.documentElement.offsetHeight),Math.max(s.d.body.clientHeight,s."
+"d.documentElement.clientHeight));var vph=s.wd.innerHeight||(s.d.doc"
+"umentElement.clientHeight||s.d.body.clientHeight),st=s.wd.pageYOffs"
+"et||(s.wd.document.documentElement.scrollTop||s.wd.document.body.sc"
+"rollTop),vh=st+vph,pv=Math.min(Math.round(vh/dh*100),100),c=s.c_r('"
+"s_ppv'),a=(c.indexOf(',')>-1)?c.split(',',4):[],id=(a.length>0)?(a["
+"0]):escape(s.getPPVid),cv=(a.length>1)?parseInt(a[1]):(0),p0=(a.len"
+"gth>2)?parseInt(a[2]):(pv),cy=(a.length>3)?parseInt(a[3]):(0),cn=(p"
+"v>0)?(id+','+((pv>cv)?pv:cv)+','+p0+','+((vh>cy)?vh:cy)):('');s.c_w"
+"('s_ppv',cn);");

s_dell.getPercentPageViewed=new Function("pgid",""
+"var s=this,pgid=(arguments.length>0)?(arguments[0]):('-'),ist=(!s.ge"
+"tPPVid)?(true):(false);if(typeof(s.linkType)!='undefined'&&s.linkTy"
+"pe!='e')return'';var v=s.c_r('s_ppv'),a=(v.indexOf(',')>-1)?v.split"
+"(',',4):[];if(a.length<4){for(var i=3;i>0;i--)a[i]=(i<a.length)?(a["
+"i-1]):('');a[0]='';}a[0]=unescape(a[0]);s.getPPVpid=pgid;s.c_w('s_p"
+"pv',escape(pgid));if(ist){s.getPPVid=(pgid)?(pgid):(s.pageName?s.pa"
+"geName:document.location.href);s.c_w('s_ppv',escape(s.getPPVid));if"
+"(s.wd.addEventListener){s.wd.addEventListener('load',s.handlePPVeve"
+"nts,false);s.wd.addEventListener('scroll',s.handlePPVevents,false);"
+"s.wd.addEventListener('resize',s.handlePPVevents,false);}else if(s."
+"wd.attachEvent){s.wd.attachEvent('onload',s.handlePPVevents);s.wd.a"
+"ttachEvent('onscroll',s.handlePPVevents);s.wd.attachEvent('onresize"
+"',s.handlePPVevents);}}return(pgid!='-')?(a):(a[1]);");

/*
 * Plugin: clickPast v1.0
 */
s_dell.clickPast=new Function("scp","ct_ev","cp_ev","cpc",""
+"var s=this,scp,ct_ev,cp_ev,cpc,ev,tct;if(s.p_fo(ct_ev)==1){if(!cpc)"
+"{cpc='s_cpc';}ev=s.events?s.events+',':'';if(scp){s.events=ev+ct_ev"
+";s.c_w(cpc,1,0);}else{if(s.c_r(cpc)>=1){s.events=ev+cp_ev;s.c_w(cpc"
+",0,0);}}}");
s_dell.p_fo=new Function("n",""
+"var s=this;if(!s.__fo){s.__fo=new Object;}if(!s.__fo[n]){s.__fo[n]="
+"new Object;return 1;}else {return 0;}");

/*
 * Function: parseUri v1.0 - Parse URI components
 */
parseUri=new Function("u",""
+"var l={strictMode:false,key:['source','protocol','authority','userI"
+"nfo','user','password','host','port','relative','path','directory',"
+"'file','query','anchor'],U:{name:'queryKey',c:/(?:^|\&)([^\&=]*)=?("
+"[^\&]*)/g},c:{strict:/^(?:([^:\\/?#]+):)?(?:\\/\\/((?:(([^:@]*)(?::"
+"([^:@]*))?)?@)?([^:\\/?#]*)(?::(\\d*))?))?((((?:[^?#\\/]*\\/)*)([^?"
+"#]*))(?:\\?([^#]*))?(?:#(.*))?)/,loose:/^(?:(?![^:@]+:[^:@\\/]*@)(["
+"^:\\/?#.]+):)?(?:\\/\\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\\/?#]"
+"*)(?::(\\d*))?)(((\\/(?:[^?#](?![^?#\\/]*\\.[^?#\\/.]+(?:[?#]|$)))*"
+"\\/?)?([^?#\\/]*))(?:\\?([^#]*))?(?:#(.*))?)/}},t=l.c[l.strictMode?"
+"'strict':'loose'].exec(u),p={},b=14;while(b--)p[l.key[b]]=t[b]||'';"
+"p[l.U.name]={};p[l.key[12]].replace(l.U.c,function($0,$1,$2){if($1)"
+"{p[l.U.name][$1]=$2}});return p");

/*
 * Function: Vanilla cookies v1.0
 */
sC=new Function("b","s",""
+"document.cookie=b+'='+escape(s)+'; '+' expires='+(arguments.length>"
+"=3?arguments[2].toGMTString():'')+'; path=/; domain=.'+getDomainLev"
+"els()+';'");
gC=new Function("b",""
+"var q=document.cookie,v=b+'=',m=q.indexOf(v);if(m!=0)m=q.indexOf(';"
+" '+v);if(m==-1)return '';v=q.substring(m);v=v.substring(v.indexOf('"
+"=')+1);m=v.indexOf(';');if(m!=-1)v=v.substring(0,m);return unescape"
+"(v)");

/*
 * Function: getDomainLevels([domain][,levels]) v1.0
 * (Requires parseUri)
 */
getDomainLevels=new Function(""
+"var z;if(arguments.length>0){z=arguments[0]}else{if(typeof document"
+".location.href=='undefined')return'';z=document.location.href}var r"
+"=parseUri(z).host.toLowerCase();var c=r.split('.'.toString());if(ar"
+"guments.length>=2){var w=arguments[1];for(var b=1,i='';b<=w;b++){if"
+"(c.length>=b){i=c[c.length-b]+(b>1?'.':'')+i}}}else{var i=c.length>"
+"=1?c[c.length-1]:'';var n=c.length>=2?c[c.length-2]:'';var w=i.leng"
+"th==2&&(n.length==2||n=='com')?3:2;for(var b=2;b<=w;b++){if(c.lengt"
+"h>=b){i=c[c.length-b]+(b>1?'.':'')+i}}}return i");
/*
 * Plugin: getActionDepth v1.0 - Returns the current
 * page number of the visit
 */
s_dell.getActionDepth=new Function("c",""
+ "var s=this,v=1,t=new Date;t.setTime(t.getTime()+1800000);"
+ "if(!s.c_r(c)){v=1}if(s.c_r(c)){v=s.c_r(c);v++}"
+ "if(!s.c_w(c,v,t)){s.c_w(c,v,0)}return v;");
/*
 * Plugin: tCall v1.0 - Is a t() call in progress?
 */
s_dell.tCall=new Function("",
"var t=this.linkType;return typeof(t)=='undefined'||typeof(t)==''");

/*
 * Plugin: isInternal(url) v1.0 - Url internal per linkInternalFilters?
 * (Requires matchList)
 */
s_dell.isInternal=new Function("v",""
+"return matchList(((!v)?document.location.href:v.toString().toLowerC"
+"ase()),s_dell.linkInternalFilters)");

/*
 * Plugin: hostedLocally(url) v1.0 - Url local per localDoms?
 * (Requires matchList)
 */
s_dell.hostedLocally=new Function("v",""
+"return matchList(((!v)?document.location.href:v.toString().toLowerC"
+"ase()),s_dell.localDoms)");

/*
 * Plugin: matchList v1.0 - Does a url match a regex pattern in a list?
 * (Requires parseUri)
 */
matchList=new Function("v","l",""
+"v=v.toString().toLowerCase();if(typeof(v)!=\'string\'||typeof(l)!="
+"\'string\')return 0;var m=parseUri(v).protocol,h=parseUri(v).host;i"
+"f(m.indexOf(\'http\')!=0\&\&m.indexOf(\'ftp\')!=0)return 1;return h"
+".match(\'(\'+l.toLowerCase().replace(\x2F\\.(?![*+?])\x2Fgi,\'\\\\."
+"\').replace(\x2F,(?![*+?])\x2Fgi,\'|\')+\')\')?2:0");
/*
 * channelManager v2.4 - Tracking External Traffic
 */
s_dell.channelManager=new Function("a","b","c","d","e","f",""
+"var s=this,A,B,g,l,m,M,p,q,P,h,k,u,S,i,O,T,j,r,t,D,E,F,G,H,N,U,v=0,"
+"X,Y,W,n=new Date;n.setTime(n.getTime()+1800000);if(e){v=1;if(s.c_r("
+"e)){v=0}if(!s.c_w(e,1,n)){s.c_w(e,1,0)}if(!s.c_r(e)){v=0}}g=s.refer"
+"rer?s.referrer:document.referrer;g=g.toLowerCase();if(!g){h=1}i=g.i"
+"ndexOf('?')>-1?g.indexOf('?'):g.length;j=g.substring(0,i);k=s.linkI"
+"nternalFilters.toLowerCase();k=s.split(k,',');l=k.length;for(m=0;m<"
+"l;m++){B=j.indexOf(k[m])==-1?'':g;if(B)O=B}if(!O&&!h){p=g;U=g.index"
+"Of('//');q=U>-1?U+2:0;Y=g.indexOf('/',q);r=Y>-1?Y:i;t=g.substring(q"
+",r);t=t.toLowerCase();u=t;P='Referrers';S=s.seList+'>'+s._extraSear"
+"chEngines;if(d==1){j=s.repl(j,'oogle','%');j=s.repl(j,'ahoo','^');g"
+"=s.repl(g,'as_q','*')}A=s.split(S,'>');T=A.length;for(i=0;i<T;i++){"
+"D=A[i];D=s.split(D,'|');E=s.split(D[0],',');F=E.length;for(G=0;G<F;"
+"G++){H=j.indexOf(E[G]);if(H>-1){i=s.split(D[1],',');U=i.length;for("
+"k=0;k<U;k++){l=s.getQueryParam(i[k],'',g);if(l){l=l.toLowerCase();M"
+"=l;if(D[2]){u=D[2];N=D[2]}else{N=t}if(d==1){N=s.repl(N,'#',' - ');g"
+"=s.repl(g,'*','as_q');N=s.repl(N,'^','ahoo');N=s.repl(N,'%','oogle'"
+");}}}}}}}if(!O||f!='1'){O=s.getQueryParam(a,b);if(O){u=O;if(M){P='P"
+"aid Search'}else{P='Paid Non-Search';}}if(!O&&M){u=N;P='Natural Sea"
+"rch'}}if(h==1&&!O&&v==1){u=P=t=p='Direct Load'}X=M+u+t;c=c?c:'c_m';"
+"if(c!='0'){X=s.getValOnce(X,c,0);}g=s._channelDomain;if(g&&X){k=s.s"
+"plit(g,'>');l=k.length;for(m=0;m<l;m++){q=s.split(k[m],'|');r=s.spl"
+"it(q[1],',');S=r.length;for(T=0;T<S;T++){Y=r[T];Y=Y.toLowerCase();i"
+"=j.indexOf(Y);if(i>-1)P=q[0]}}}g=s._channelParameter;if(g&&X){k=s.s"
+"plit(g,'>');l=k.length;for(m=0;m<l;m++){q=s.split(k[m],'|');r=s.spl"
+"it(q[1],',');S=r.length;for(T=0;T<S;T++){U=s.getQueryParam(r[T]);if"
+"(U)P=q[0]}}}g=s._channelPattern;if(g&&X){k=s.split(g,'>');l=k.lengt"
+"h;for(m=0;m<l;m++){q=s.split(k[m],'|');r=s.split(q[1],',');S=r.leng"
+"th;for(T=0;T<S;T++){Y=r[T];Y=Y.toLowerCase();i=O.toLowerCase();H=i."
+"indexOf(Y);if(H==0)P=q[0]}}}if(X)M=M?M:'n/a';p=X&&p?p:'';t=X&&t?t:'"
+"';N=X&&N?N:'';O=X&&O?O:'';u=X&&u?u:'';M=X&&M?M:'';P=X&&P?P:'';s._re"
+"ferrer=p;s._referringDomain=t;s._partner=N;s._campaignID=O;s._campa"
+"ign=u;s._keywords=M;s._channel=P");
/* Top 130 - Grouped */
s_dell.seList="search`|qu|7search.com>search.about`|terms|About.com>alltheweb`|query,q|All The Web>altavista.co|q,r|AltaVista>dk.altavista`|q|AltaVista#Denmark>fr.altavista`|q,r|AltaVista#France>it.altavista`|q,r|AltaVista#Italy>nl.altavista`|q|AltaVista#Netherlands>no.altavista`|q|AltaVista#Norway>es.altavista`|q,r|AltaVista#Spain>se.altavista`|q,r|AltaVista#Sweden>ch.altavista`|q,r|AltaVista#Switzerland>ananzi.co.za|qt|Ananzi>aol.fr|q|AOL#France>suche.aol.de,suche.aolsvc.de|q|AOL#Germany>aol.co.uk,search.aol.co.uk|query|AOL#United Kingdom>search.aol`,search.aol.ca|query,q|AOL.com Search>aport.ru|r|Aport>ask`,ask.co.uk|ask,q|Ask Jeeves>www.baidu`|wd,word|Baidu>www.baidu.jp|wd,word|Baidu Japan>search.biglobe.ne.jp|q|Biglobe>buscapique`|phrase|BUSCApique>business`/search|query|Business.com>centrum.cz|q|Centrum.cz>clix.pt|question|Clix>daum.net,search.daum.net|q|Daum>Dictionary`,Dictionary|term,query,q|Dictionary.com>directhit`|qry,q|DirectHit>eniro.dk|search_word|Eniro>eniro.fi|search_word|Eniro#Finland>eniro.se|search_word|Eniro#Sweden>euroseek`|query,string|Euroseek>excite.fr|search,q|Excite#France>excite.co.jp|search,s|Excite#Japan>fireball.de|q,query|Fireball>search.fresheye`|ord,kw|FreshEye>goo.ne.jp|MT|Goo (Jp.)>g%.co,g%syndication`|q,*|G%>g%`.af|q,*|G%#Afghanistan>g%.as|q,*|G%#American Samoa>g%`.ai|q,*|G%#Anguilla>g%`.ag|q,*|G%#Antigua and Barbuda>g%`.ar|q,*|G%#Argentina>g%.am|q,*|G%#Armenia>g%`.au|q,*|G%#Australia>g%.at|q,*|G%#Austria>g%.az|q,*|G%#Azerbaijan>g%`.bh|q,*|G%#Bahrain>g%`.bd|q,*|G%#Bangladesh>g%`.by|q,*|G%#Belarus>g%.be|q,*|G%#Belgium>g%`.bz|q,*|G%#Belize>g%`.bo|q,*|G%#Bolivia>g%.ba|q,*|G%#Bosnia-Hercegovina>g%.co.bw|q,*|G%#Botswana>g%`.br|q,*|G%#Brasil>g%.vg|q,*|G%#British Virgin Islands>g%`.bn|q,*|G%#Brunei>g%.bg|q,*|G%#Bulgaria>g%.bi|q,*|G%#Burundi>g%`.kh|q,*|G%#Cambodia>g%.ca|q,*|G%#Canada>g%.cl|q,*|G%#Chile>g%.cn|q,*|G%#China>g%`.co|q,*|G%#Colombia>g%.co.ck|q,*|G%#Cook Islands>g%.co.cr|q,*|G%#Costa Rica>g%.ci|q,*|G%#Cote D\'Ivoire>g%.hr|q,*|G%#Croatia>g%`.cu|q,*|G%#Cuba>g%.cz|q,*|G%#Czech Republic>g%.dk|q,*|G%#Denmark>g%.dj|q,*|G%#Djibouti>g%.dm|q,*|G%#Dominica>g%`.do|q,*|G%#Dominican Republic>g%`.ec|q,*|G%#Ecuador>g%`.eg|q,*|G%#Egypt>g%`.sv|q,*|G%#El Salvador>g%.ee|q,*|G%#Estonia>g%`.et|q,*|G%#Ethiopia>g%`.fj|q,*|G%#Fiji>g%.fi|q,*|G%#Finland>g%.fr|q,*|G%#France>g%.de|q,*|G%#Germany>g%.gr|q,*|G%#Greece>g%.gl|q,*|G%#Greenland>g%.gp|q,*|G%#Guadeloupe>g%`.gt|q,*|G%#Guatemala>g%.gg|q,*|G%#Guernsey>g%.gy|q,*|G%#Guyana>g%.ht|q,*|G%#Haiti>g%.hn|q,*|G%#Honduras>g%`.hk|q,*|G%#Hong Kong>g%.hu|q,*|G%#Hungary>g%.co.in|q,*|G%#India>g%.co.id|q,*|G%#Indonesia>g%.ie|q,*|G%#Ireland>g%.is|q,*|G%#Island>g%`.gi|q,*|G%#Isle of Gibraltar>g%.im|q,*|G%#Isle of Man>g%.co.il|q,*|G%#Israel>g%.it|q,*|G%#Italy>g%`.jm|q,*|G%#Jamaica>g%.co.jp|q,*|G%#Japan>g%.je|q,*|G%#Jersey>g%.jo|q,*|G%#Jordan>g%.kz|q,*|G%#Kazakhstan>g%.co.ke|q,*|G%#Kenya>g%.ki|q,*|G%#Kiribati>g%.co.kr|q,*|G%#Korea>g%.kg|q,*|G%#Kyrgyzstan>g%.la|q,*|G%#Laos>g%.lv|q,*|G%#Latvia>g%.co.ls|q,*|G%#Lesotho>g%`.ly|q,*|G%#Libya>g%.li|q,*|G%#Liechtenstein>g%.lt|q,*|G%#Lithuania>g%.lu|q,*|G%#Luxembourg>g%.mw|q,*|G%#Malawi>g%`.my|q,*|G%#Malaysia>g%.mv|q,*|G%#Maldives>g%`.mt|q,*|G%#Malta>g%.mu|q,*|G%#Mauritius>g%`.mx|q,*|G%#Mexico>g%.fm|q,*|G%#Micronesia>g%.md|q,*|G%#Moldova>g%.mn|q,*|G%#Mongolia>g%.ms|q,*|G%#Montserrat>g%.co.ma|q,*|G%#Morocco>g%`.na|q,*|G%#Namibia>g%.nr|q,*|G%#Nauru>g%`.np|q,*|G%#Nepal>g%.nl|q,*|G%#Netherlands>startg%.startpagina.nl|q|G%#Netherlands (Startpagina)>g%.co.nz|q,*|G%#New Zealand>g%`.ni|q,*|G%#Nicaragua>g%`.ng|q,*|G%#Nigeria>g%.nu|q,*|G%#Niue>g%`.nf|q,*|G%#Norfolk Island>g%.no|q,*|G%#Norway>g%`.om|q,*|G%#Oman>g%`.pk|q,*|G%#Pakistan>g%`.pa|q,*|G%#Panama>g%`.py|q,*|G%#Paraguay>g%`.pe|q,*|G%#Peru>g%`.ph|q,*|G%#Philippines>g%.pn|q,*|G%#Pitcairn Islands>g%.pl|q,*|G%#Poland>g%.pt|q,*|G%#Portugal>g%`.pr|q,*|G%#Puerto Rico>g%`.qa|q,*|G%#Qatar>g%.cd|q,*|G%#Rep. Dem. du Congo>g%.cg|q,*|G%#Rep. du Congo>g%.ge|q,*|G%#Repulic of Georgia>g%.ro|q,*|G%#Romania>g%.ru|q,*|G%#Russia>g%.rw|q,*|G%#Rwanda>g%.sh|q,*|G%#Saint Helena>g%`.vc|q,*|G%#Saint Vincent and the Grenadine>g%.ws|q,*|G%#Samoa>g%.sm|q,*|G%#San Marino>g%.st|q,*|G%#Sao Tome and Principe>g%`.sa|q,*|G%#Saudi Arabia>g%.sn|q,*|G%#Senegal>g%.sc|q,*|G%#Seychelles>g%`.sg|q,*|G%#Singapore>g%.sk|q,*|G%#Slovakia>g%.si|q,*|G%#Slovenia>g%`.sb|q,*|G%#Solomon Islands>g%.co.za|q,*|G%#South Africa>g%.es|q,*|G%#Spain>g%.lk|q,*|G%#Sri Lanka>g%.se|q,*|G%#Sweden>g%.ch|q,*|G%#Switzerland>g%`.tw|q,*|G%#Taiwan>g%`.tj|q,*|G%#Tajikistan>g%.co.th|q,*|G%#Thailand>g%.bs|q,*|G%#The Bahamas>g%.gm|q,*|G%#The Gambia>g%.tk|q,*|G%#Tokelau>g%.to|q,*|G%#Tonga>g%.tt|q,*|G%#Trinidad and Tobago>g%`.tr|q,*|G%#Turkey>g%.tm|q,*|G%#Turkmenistan>g%.co.ug|q,*|G%#Uganda>g%`.ua|q,*|G%#Ukraine>g%.ae|q,*|G%#United Arab Emirates>g%.co.uk|q,*|G%#United Kingdom>g%`.uy|q,*|G%#Uruguay>g%.co.uz|q,*|G%#Uzbekiston>g%.vu|q,*|G%#Vanuatu>g%.co.ve|q,*|G%#Venezuela>g%`.vn|q,*|G%#Viet Nam>g%.co.vi|q,*|G%#Virgin Islands>g%.co.zm|q,*|G%#Zambia>g%.co.zw|q,*|G%#Zimbabwe>hispavista`|cadena|HispaVista>icqit`|q|icq>infoseek.co.jp|qt|Infoseek#Japan>iwon`|searchfor|iWon>ixquick`|query|ixquick>kakaku.com|query|Kakaku>kelkoo.se|siteSearchQuery|Kelkoo#Sweden>kvasir.no|q,searchExpr|Kvasir>libero.it|query|Libero>arianna.libero.it|query|Libero-Ricerca>bing`|q|Microsoft Bing>search.livedoor`|q|Livedoor.com>www.lycos`,search.lycos`|query|Lycos>lycos.fr|query|Lycos#France>lycol.de,search.lycos.de|query|Lycos#Germany>lycos.it|query|Lycos#Italy>lycos.es|query|Lycos#Spain>lycos.co.uk|query|Lycos#United Kingdom>m.bing.com|Q|m.bing>mail.ru/search,go.mail.ru/search|q|Mail.ru>marchsearch`,search.curryguide`|query|MarchSearch>bing`|q|Microsoft Bing>myway`|searchfor|MyWay.com>search.mywebsearch.com|searchfor|mywebsearch>nate`,search.nate`|query|Nate.com>naver`,search.naver`|query|Naver>netscape`|query,search|Netscape Search>search.nifty`|q|Nifty>odn.excite.co.jp|search|ODN>oingo`|s,q|Oingo>overture`|Keywords|Overture>ozu.es|q|Ozu>qksearch`|query|QkSearch>rambler.ru/srch|words|Rambler>reference`|q|Reference.com>search.ch|q|Search.ch>searchalot`|query,q|Searchalot>sensis`.au|find|Sensis.com.au>seznam|w|Seznam.cz>g%.sina`.tw|kw|Sina#Taiwan>sogou.com|query|Sogou>soso.com|w|SoSo>starmedia`|q|Starmedia>abcsok.no|q|Startsiden>suchmaschine`|suchstr|Suchmaschine>teoma`|q|Teoma>terra.es|query|Terra>tiscali.it|key|Tiscali>toile`|query,q|Toile du Quebec>busca.uol`.br|q|UOL Busca>usseek`|string|Usseek>vinden.nl|query|Vinden>vindex.nl|search_for|Vindex>virgilio.it|qs|Virgilio>voila.fr|kw|Voila>walla.co.il|q|Walla>web.de|su|Web.de>webalta.ru|q|Webalta>wp.pl|szukaj|Wirtualna Polska>wow.pl|q|WOW>y^`,search.y^`|p|Y^!>ar.y^`,ar.search.y^`|p|Y^!#Argentina>asia.y^`,asia.search.y^`|p|Y^!#Asia>au.y^`,au.search.y^`|p|Y^!#Australia>at.search.y^`|p|Y^!#Austria>br.y^`,br.search.y^`|p|Y^!#Brazil>ca.y^`,ca.search.y^`|p|Y^!#Canada>qc.y^`,cf.search.y^`|p|Y^!#Canada (French)>cn.y^`,search.cn.y^`|p|Y^!#China>dk.y^`,dk.search.y^`|p|Y^!#Denmark>fi.search.y^`|p|Y^!#Finland>fr.y^`,fr.search.y^`|p|Y^!#France>de.y^`,de.search.y^`|p|Y^!#Germany>hk.y^`,hk.search.y^`|p|Y^!#Hong Kong>in.y^`,in.search.y^`|p|Y^!#India>id.y^`,id.search.y^`|p|Y^!#Indonesia>it.y^`,it.search.y^`|p|Y^!#Italy>y^.co.jp,search.y^.co.jp|p,va|Y^!#Japan>kr.y^`,kr.search.y^`|p|Y^!#Korea>malaysia.y^`,malaysia.search.y^`|p|Y^!#Malaysia>mx.y^`,mx.search.y^`|p|Y^!#Mexico>nl.y^`,nl.search.y^`|p|Y^!#Netherlands>nz.y^`,nz.search.y^`|p|Y^!#New Zealand>no.y^`,no.search.y^`|p|Y^!#Norway>ph.y^`,ph.search.y^`|p|Y^!#Philippines>ru.y^`,ru.search.y^`|p|Y^!#Russia>sg.y^`,sg.search.y^`|p|Y^!#Singapore>es.y^`,es.search.y^`|p|Y^!#Spain>telemundo.y^`,espanol.search.y^`|p|Y^!#Spanish (US : Telemundo)>se.y^`,se.search.y^`|p|Y^!#Sweden>ch.search.y^`|p|Y^!#Switzerland>tw.y^`,tw.search.y^`|p|Y^!#Taiwan>th.y^`,th.search.y^`|p|Y^!#Thailand>uk.y^`,uk.search.y^`|p|Y^!#UK and Ireland>vn.y^`,vn.search.y^`|p|Y^!#Viet Nam>mobile.y^.co.jp|p|Y^Japan#Mobile>yandex|text|Yandex.ru>zbozi.cz|q|Zbozi.cz>www.zoeken.nl/|query|zoeken.nl";
/*
 *  Plug-in: crossVisitParticipation v1.7 - stacks values from
 *  specified variable in cookie and returns value
 */
s_dell.crossVisitParticipation=new Function("v","cn","ex","ct","dl","ev","dv",""
+"var s=this,ce;if(typeof(dv)==='undefined')dv=0;if(s.events&&ev){var"
+" ay=s.split(ev,',');var ea=s.split(s.events,',');for(var u=0;u<ay.l"
+"ength;u++){for(var x=0;x<ea.length;x++){if(ay[u]==ea[x]){ce=1;}}}}i"
+"f(!v||v==''){if(ce){s.c_w(cn,'');return'';}else return'';}v=escape("
+"v);var arry=new Array(),a=new Array(),c=s.c_r(cn),g=0,h=new Array()"
+";if(c&&c!=''){arry=s.split(c,'],[');for(q=0;q<arry.length;q++){z=ar"
+"ry[q];z=s.repl(z,'[','');z=s.repl(z,']','');z=s.repl(z,\"'\",'');arry"
+"[q]=s.split(z,',')}}var e=new Date();e.setFullYear(e.getFullYear()+"
+"5);if(dv==0&&arry.length>0&&arry[arry.length-1][0]==v)arry[arry.len"
+"gth-1]=[v,new Date().getTime()];else arry[arry.length]=[v,new Date("
+").getTime()];var start=arry.length-ct<0?0:arry.length-ct;var td=new"
+" Date();for(var x=start;x<arry.length;x++){var diff=Math.round((td."
+"getTime()-arry[x][1])/86400000);if(diff<ex){h[g]=unescape(arry[x][0"
+"]);a[g]=[arry[x][0],arry[x][1]];g++;}}var data=s_dell.join(a,{delim:',',"
+"front:'[',back:']',wrap:\"'\"});s.c_w(cn,data,e);var r=s_dell.join(h,{deli"
+"m:dl});if(ce)s.c_w(cn,'');return r;");
/*
 * s.join: 1.0 - Joins an array into a string
 */
s_dell.join = new Function("v","p",""
+"var s = this;var f,b,d,w;if(p){f=p.front?p.front:'';b=p.back?p.back"
+":'';d=p.delim?p.delim:'';w=p.wrap?p.wrap:'';}var str='';for(var x=0"
+";x<v.length;x++){if(typeof(v[x])=='object' )str+=s.join( v[x],p);el"
+"se str+=w+v[x]+w;if(x<v.length-1)str+=d;}return f+str+b;");


/*********************************************************************
 * s.createData, s.getTimeStamp, s.updateData - Jason Case 4 Nov 11
 * Used to create and read the profiling cookie which is used by Dell
 * with T&T for live profiling
 ********************************************************************/
s_dell.createData=new Function("",""
+"var s=this,dataArray,ts,seg,pv,pc,pd,cs,odg,ca,pt,st,tos,pp,ic;var "
+"expDate=new Date();s.c_w('sessionTime',expDate.getFullYear()+','+ex"
+"pDate.getMonth()+','+expDate.getDate()+','+expDate.getHours()+','+e"
+"xpDate.getMinutes()+','+expDate.getSeconds()+','+expDate.getMillise"
+"conds(),0);ts=s.getTimeStamp();seg=s.prop6?s.prop6:'null';pv='null'"
+";cs=s.events.indexOf('scCheckout')>-1?'Y':'N';pc=s.events.indexOf('"
+"purchase')>-1?'Y':'N';if(s.inList('event2',s.events,',')){if(s.prod"
+"ucts!=undefined)var splitProd=s.products.split(',');if(splitProd.le"
+"ngth>0&&splitProd[0]!=undefined&&splitProd[0]!=null){var splitProd="
+"splitProd[0].split(';');pd=splitProd[1];}}else{pd='null';}pp='null'"
+";odg=s.eVar2?s.eVar2:'null';ca=s.events.indexOf('scAdd')>-1?'Y':'N'"
+";ic='null';pt=s.eVar10?s.eVar10:'null';st=s.prop17?s.prop17:'null';"
+"tos=0;var profile=seg+'||'+pv+'||'+ts+'||'+cs+'||'+pc+'||'+pd+'||'+"
+"tos+'||'+pp+'||'+odg+'||'+ca+'||'+ic+'||'+pt+'||'+st;expDate.setDat"
+"e(expDate.getDate()+365);s.c_w('s_hwp',profile,expDate);");
s_dell.getTimeStamp=new Function("",""
+"var d=new Date();return d.getDate()+':'+(d.getMonth()+1)+':'+d.getF"
+"ullYear()+':'+d.getHours()+':'+d.getMinutes();");
s_dell.updateData=new Function("",""
+"var s=this,dataArray,ts,seg,pv,pc,pd,cs,odg,ca,pt,st,tos,pp,ic;var "
+"expDate=new Date();expDate.setDate(expDate.getDate()+365);dataArray"
+"=(s.c_r('s_hwp')).split('||');ts=s.getTimeStamp();seg=s.prop6?s.pro"
+"p6:dataArray[0];s.pageName.indexOf('productdetails')>-1?(pv=(s.page"
+"Name.split('productdetails:'))[1]):pv=dataArray[1];dataArray[3]=='Y"
+"'?cs='Y':cs=s.events.indexOf('scCheckout')>-1?'Y':'N';dataArray[4]="
+"='Y'?pc='Y':pc=s.events.indexOf('purchase')>-1?'Y':'N';if(s.inList("
+"'event2',s.events,',')){if(s.products!=undefined)var splitProd=s.pr"
+"oducts.split(',');if(splitProd.length>0&&splitProd[0]!=undefined&&s"
+"plitProd[0]!=null){var splitProd=splitProd[0].split(';');pd=splitPr"
+"od[1];}}else{pd=dataArray[5];}odg=s.eVar2?s.eVar2:dataArray[8];data"
+"Array[9]=='Y'?ca='Y':ca=s.events.indexOf('scAdd')>-1?'Y':'N';pt=s.e"
+"Var10?s.eVar10:'null';st=s.prop17?s.prop17:dataArray[12];var today="
+"new Date();if(s.c_r('sessionTime')){var oldTime=s.c_r('sessionTime'"
+");oldTime=oldTime.split(',');oldTime=new Date(oldTime[0],oldTime[1]"
+",oldTime[2],oldTime[3],oldTime[4],oldTime[5],oldTime[6]);tos=Math.r"
+"ound(((today-oldTime)/1000)/60);}else{s.c_w('sessionTime',today,0);"
+"tos=0;}if(pc=='Y'){if(s.products!=undefined)var prodArray=s.product"
+"s.split(',');if(prodArray&&prodArray.length>0&&prodArray[0]!=undefi"
+"ned&&prodArray[0]!=null){pp=(prodArray[0].split(';'))[1];if(pp==''|"
+"|pp==null){pp=dataArray[7];}}}else{pp='null';}if(s.events.indexOf('"
+"purchase')>-1){if(s.products!=undefined)var product=(s.products.spl"
+"it(','))[0];if(product!=undefined&&product!=null){var cartArray=pro"
+"duct.split(';');}if(cartArray.length>0)ic=cartArray[1];if(cartArray"
+".length>1)ic=ic+','+cartArray[2];if(cartArray.length>2)ic=ic+','+ca"
+"rtArray[3];}else if(dataArray[10]!='null'){ic=dataArray[10];}else i"
+"c='null';var profile=seg+'||'+pv+'||'+ts+'||'+cs+'||'+pc+'||'+pd+'|"
+"|'+tos+'||'+pp+'||'+odg+'||'+ca+'||'+ic+'||'+pt+'||'+st;s.c_w('s_hw"
+"p',profile,expDate);");

/* ******************** DELL CUSTOM PLUGINS ********************** */

/*
 * determineCMS() - Determine CMS (Storm, NextGen, or OLR)
 */
function s_dell_determineCMS(){
    var s=s_dell;
    if(!s.CMS){
        s.CMS='unknown';
        var gen=s.getHTMLtag('meta','generator').toLowerCase();
        if(gen.indexOf(' ')>0)gen=gen.substring(0,gen.indexOf(' '));
        if(gen.indexOf('ng')==0)s.CMS='nextgen';
        if(gen.indexOf('build:')==0||gen.indexOf('mshtml')==0)s.CMS='olr';
        if(gen.indexOf('storm')==0)s.CMS='storm';
        if(gen.indexOf('telligent')==0)s.CMS='telligent';
        if(s.CMS=='unknown'&&s.getHTMLtag('meta','waapplicationname'))s.CMS='olr';
    }
    return s.CMS;
}
s_dell.determineCMS=s_dell_determineCMS;

/*
 * onDellCMS() - Determine if on a page created by a Dell CMS
 */
function s_dell_onDellCMS(){
    return (s_dell.determineCMS()=='storm')||(s_dell.determineCMS()=='nextgen')||(s_dell.determineCMS()=='olr')||(s_dell.determineCMS()=='telligent');
}
s_dell.onDellCMS=s_dell_onDellCMS;

/*
 * processLWP() - "Consolidated LWP variable processing"
 * Set LWP variables by looking in URL, the LWP cookie, and referrer for third-party sites
 */
function s_dell_processLWP(){
    var s=s_dell;
    if(document.location.search)s.setLWPvarsFromStr(document.location.search);
    s.setLWPvarsFromMetaTags();
    if(!s.onDellCMS()){
        if(s.prop49)s.setLWPvarsFromStr(s.prop49);
        if(s.hostedLocally(document.referrer))s.setLWPvarsFromStr(parseUri(document.referrer).query);
    }
    var lwpc=s.readLWPcookie();
    if(lwpc){
        s.setLWPvarsFromStr(lwpc);
    }else{
        s.setLWPvarsFromStr(s.readProp49cookie());
    }
    s.setCCfromURL();
    var lv=s.getLWPvariables();
    if(lv){
        s.prop49='?'+lv;
        s.writeProp49cookie(lv);
    }
}
s_dell.processLWP=s_dell_processLWP;

/*
 * setLWPvarsFromMetaTags() - Try to assign LWP variables from META TAGs
 */
function s_dell_setLWPvarsFromMetaTags(){
    var s=s_dell;
    //prop2: 2 letter country code
    if(!s.prop2)s.prop2=s.getHTMLtag('meta','country');
    if(!s.prop2)s.prop2=s.getHTMLtag('meta','documentcountrycode');
    //prop3: 2 letter language code
    if(!s.prop3)s.prop3=s.getHTMLtag('meta','language');
    //evar32: segment
    if(!s.eVar32)s.eVar32=s.getHTMLtag('meta','segment');
    //evar6: customer set
    if(!s.prop6)s.prop6=s.getHTMLtag('meta','customerset');
}
s_dell.setLWPvarsFromMetaTags=s_dell_setLWPvarsFromMetaTags;

/*
 * getHTMLtag(name) - Get the specified META TAG's value
 */
function s_dell_getHTMLtag(tg,nm){
    var k=(arguments.length>2)?arguments[2]:'NAME',
        v=(arguments.length>3)?arguments[3]:'CONTENT',
        metas=document.getElementsByTagName?document.getElementsByTagName(tg):'';
    for(var i=metas.length-1;i>=0;i--){
        var n=metas[i].getAttribute(k);
        n=n?n.toLowerCase():'';
        if(n==nm)return metas[i].getAttribute(v).toLowerCase();
    }
    return '';
}
s_dell.getHTMLtag=s_dell_getHTMLtag;

/*
 * setLWPvarsFromStr(str) - Try to assign LWP variables from formatted string
 */
function s_dell_setLWPvarsFromStr(v){
    var s=s_dell;
    if(!v)return;
    v=v.toString().toLowerCase();
    if(v.substring(0,1)=='&')v='?'+v.substring(1);
    if(v.substring(0,1)!='?')v='?'+v;
    //prop2: 2 letter country code
    if(!s.prop2)s.prop2=s.getQueryParam('shopper_country','',v);
    if(!s.prop2)s.prop2=s.getQueryParam('ctry_id','',v);
    if(!s.prop2)s.prop2=s.getQueryParam('c','',v);
    //prop3: 2 letter language code
    if(!s.prop3)s.prop3=s.getQueryParam('l','',v);
    //evar32: segment
    if(!s.eVar32)s.eVar32=s.getQueryParam('s','',v);
    if(!s.eVar32)s.eVar32=s.getQueryParam('shopper_segment','',v);
    //prop6: customer set
    if(!s.prop6)s.prop6=s.getQueryParam('customer_id','',v);
    if(!s.prop6)s.prop6=s.getQueryParam('cs','',v);
    //prop17: service tag
    if(!s.prop17)s.prop17=s.getQueryParam('svctag','',v);
    if(!s.prop17)s.prop17=s.getQueryParam('servicetag','',v);
    if(!s.prop17)s.prop17=s.getQueryParam('st55','',v);
    if(!s.prop17)s.prop17=s.getQueryParam('tag','',v);
    //prop18: systemid
    if(!s.prop18)s.prop18=s.getQueryParam('systemid','',v);
}
s_dell.setLWPvarsFromStr=s_dell_setLWPvarsFromStr;

/*
 * getLWPvariables() - Return LWP variables as formatted string
 */
function s_dell_getLWPvariables(){
    var v='',s=this;
    if(s.prop2)v+='&c='+s.prop2;
    if(s.prop3)v+='&l='+s.prop3;
    if(s.eVar32)v+='&s='+s.eVar32;
    if(s.prop6)v+='&cs='+s.prop6;
    if(s.prop17)v+='&servicetag='+s.prop17;
    if(s.prop18)v+='&systemid='+s.prop18;
    if(v)return v.substring(1);
    return '';
}
s_dell.getLWPvariables=s_dell_getLWPvariables;

/*
 * setCCfromURL() - Added 07/09/10: Try to get country code from domain or path
 */
s_dell.cCodes=[
'ae','ag','ai','al','am','an','ao','ar','at','au',
'aw','az','ba','bb','bd','be','bg','bh','bm','bo',
'br','bs','bw','by','bz','ca','ch','cl','cm','cn',
'co','cr','cy','cz','de','dk','dm','do','dz','ec',
'ed','ee','eg','es','et','eu','fi','fj','fr','gb',
'gd','ge','gh','gr','gt','gy','hk','hn','hr','ht',
'hu','id','ie','il','in','ir','is','it','jm','jo',
'jp','ke','kn','kr','kw','ky','kz','lb','lc','li',
'lk','lt','lu','lv','ma','md','me','mk','ml','mq',
'ms','mt','mu','mx','my','mz','na','ng','ni','nl',
'no','nz','om','pa','pe','ph','pk','pl','pr','pt',
'py','qa','ro','rs','ru','ru','rw','sa','se','sg',
'si','sk','sn','sr','sv','sy','tc','td','th','tm',
'tn','tr','tt','tw','tz','ua','ug','uk','us','uy',
'uz','vc','ve','vg','vi','vn','ye','yu','za','zm',
'zw'];
function s_dell_setCCfromURL(){
    var s=s_dell;
    if(s.prop2)return;
    if(arguments.length>0){
        var r=arguments[0];
    }else{
        if(typeof(document.location.href)=='undefined')return;
        var r=document.location.href;
    }
    var h=parseUri(r).host.split('.');
    var d=(h.length>=3)?h[h.length-1]:'';
    if(d.length==2&&s.inList(d,s.cCodes)){s.prop2=d;return;}
    for(var i=1;i<h.length;i++){
        if(h[i]=='dell'){
            d=h[i-1];
            if(s.inList(d,s.cCodes)){s.prop2=d;return;}
        }
    }
    var p=parseUri(r).directory;
    if(p.length<4||p[3]!='/')return;
    var p1=p.substring(1,3);
    if(s.inList(p1,s.cCodes)){s.prop2=p1;return;}
}
s_dell.setCCfromURL=s_dell_setCCfromURL;

/*
 * readLWPcookie() - Get value of the Dell LWP cookie
 */
function s_dell_readLWPcookie(){
    return gC('lwp');
}
s_dell.readLWPcookie=s_dell_readLWPcookie;

/*
 * readProp49cookie() - Get value of the SiteCatalyst prop49 cookie
 */
function s_dell_readProp49cookie(){
    return gC('s_c49');
}
s_dell.readProp49cookie=s_dell_readProp49cookie;

/*
 * writeProp49cookie() - Write value of the SiteCatalyst prop49 cookie
 */
function s_dell_writeProp49cookie(){
    var v=s_dell.getLWPvariables();
    if(v)sC('s_c49',v);
}
s_dell.writeProp49cookie=s_dell_writeProp49cookie;

/*
 * getPNfromURL() - Construct pageName from URL host and path, removing index page name, page extension, anchor tag
 */
function s_dell_getPNfromURL(){
    var s=s_dell,p=document.location.protocol;
    if(p.indexOf('http')==0){
        var pn=parseUri(document.location.href).host.replace(/^www[0-9]*\./i,'') +parseUri(document.location.href).path.replace(/\.(aspx?|s?html?|cgi|php[0-9]|wml)/i,'').replace(/\/(default|home|index|welcome)/i,'');
        if(pn.indexOf('/')==-1)pn=pn+'/';
        sku=s.getQueryParam('sku','',document.location.search);
        if(!sku)sku=s.getQueryParam('channel-product-id','',document.location.search);
        if(sku)pn+='[sku='+sku+']';
    }else{
        pn=p;
    }
    return pn.toLowerCase();
}
s_dell.getPNfromURL=s_dell_getPNfromURL;

/*
 * getObjectID(o)
 */
function s_dell_getObjectID(o){
    return o.href;
}
s_dell.getObjectID=s_dell_getObjectID;

/*
* SiteCatalyst Ad Track
*/

function adTrackClickThroughs() {
    var s = s_dell;
    var q = (s.determineCMS() == 'nextgen') ? '.omnitureADTrack[omnitureadid]' : '.omnitureADTrack[@omnitureadid]'; //Added 07/09/10: removed "@" for nextgen pages only
    try {
        jQuery(q).each(function () {
            jQuery(this).click(function () {
                try {
                    s.eVar6 = jQuery(this).attr('omnitureadid');
                    s.prop28 = '';
                    s.linkTrackVars = s.apl(s.linkTrackVars, 'eVar6', ',', 2);
                    s.tl(this, 'o', 'ADTrack');
                    s.eVar6 = '';
                }
                catch (e) { }
            });
        });
    }
    catch (e) { }
}

function adTrackImpressions() {
    var s = s_dell;
    var q = (s.determineCMS() == 'nextgen') ? '.omnitureADTrack[omnitureadid]' : '.omnitureADTrack[@omnitureadid]'; //Added 07/09/10: removed "@" for nextgen pages only
    try {
        var adImpressionsArray = new Array();

        jQuery(q).each(function () {
            if (adImpressionsArray != null) {
                var omnitureadid = jQuery(this).attr('omnitureadid');
                // Only insert ad id into array if it doesn't already exists. We don't want duplicates.
                // Also, can only allow maximum of 11 ad ids so that we don't overrun 100 char limit
                // for omniture property once we join together and report to prop28.
                if ((adImpressionsArray.indexOf(omnitureadid) == -1) && adImpressionsArray.length < 11) {
                    adImpressionsArray.push(omnitureadid);
                }
            }
        });

        s.prop28 = adImpressionsArray.join('|');
    }
    catch (e) { }
}

/* WARNING: Changing any of the below variables will cause drastic
changes to how your visitor data is collected. Changes should only be
made when instructed to do so by your account manager.*/
s_dell.visitorNamespace='dell';
if(s_account.substring(s_account.length-3)!='dev'){
    s_dell.trackingServer='nsm.dell.com';
    s_dell.trackingServerSecure='sm.dell.com';
}
s_dell.dc=112;

/* Survey Variables */
var s_sv_dynamic_root = "survey.112.2o7.net/survey/dynamic"
var s_sv_gather_root = "survey.112.2o7.net/survey/gather"


/* Load the Media Module */
s_dell.loadModule('Media')
s_dell.Media.autoTrack=false;
s_dell.Media.trackWhilePlaying=false;
s_dell.Media.trackVars='None';
s_dell.Media.trackEvents='None';

/* **************************** MODULES *************************** */

/* Module: Media */
s_dell.m_Media_c="var m=s.m_i('Media');m.cn=function(n){var m=this;return m.s.rep(m.s.rep(m.s.rep(n,\"\\n\",''),\"\\r\",''),'--**--','')};m.open=function(n,l,p,b){var m=this,i=new Object,tm=new Date,"
+"a='',x;n=m.cn(n);l=parseInt(l);if(!l)l=1;if(n&&p){if(!m.l)m.l=new Object;if(m.l[n])m.close(n);if(b&&b.id)a=b.id;for (x in m.l)if(m.l[x]&&m.l[x].a==a)m.close(m.l[x].n);i.n=n;i.l=l;i.p=m.cn(p);i.a=a;"
+"i.t=0;i.ts=0;i.s=Math.floor(tm.getTime()/1000);i.lx=0;i.lt=i.s;i.lo=0;i.e='';i.to=-1;m.l[n]=i}};m.close=function(n){this.e(n,0,-1)};m.play=function(n,o){var m=this,i;i=m.e(n,1,o);i.m=new Function('"
+"var m=s_c_il['+m._in+'],i;if(m.l){i=m.l[\"'+m.s.rep(i.n,'\"','\\\\\"')+'\"];if(i){if(i.lx==1)m.e(i.n,3,-1);i.mt=setTimeout(i.m,5000)}}');i.m()};m.stop=function(n,o){this.e(n,2,o)};m.track=function("
+"n){var m=this;if (m.trackWhilePlaying) {m.e(n,4,-1)}};m.e=function(n,x,o){var m=this,i,tm=new Date,ts=Math.floor(tm.getTime()/1000),ti=m.trackSeconds,tp=m.trackMilestones,z=new Array,j,d='--**--',t"
+"=1,b,v=m.trackVars,e=m.trackEvents,pe='media',pev3,w=new Object,vo=new Object;n=m.cn(n);i=n&&m.l&&m.l[n]?m.l[n]:0;if(i){w.name=n;w.length=i.l;w.playerName=i.p;if(i.to<0)w.event=\"OPEN\";else w.even"
+"t=(x==1?\"PLAY\":(x==2?\"STOP\":(x==3?\"MONITOR\":\"CLOSE\")));w.openTime=new Date();w.openTime.setTime(i.s*1000);if(x>2||(x!=i.lx&&(x!=2||i.lx==1))) {b=\"Media.\"+name;pev3 = m.s.ape(i.n)+d+i.l+d+"
+"m.s.ape(i.p)+d;if(x){if(o<0&&i.lt>0){o=(ts-i.lt)+i.lo;o=o<i.l?o:i.l-1}o=Math.floor(o);if(x>=2&&i.lo<o){i.t+=o-i.lo;i.ts+=o-i.lo;}if(x<=2){i.e+=(x==1?'S':'E')+o;i.lx=x;}else if(i.lx!=1)m.e(n,1,o);i."
+"lt=ts;i.lo=o;pev3+=i.t+d+i.s+d+(m.trackWhilePlaying&&i.to>=0?'L'+i.to:'')+i.e+(x!=2?(m.trackWhilePlaying?'L':'E')+o:'');if(m.trackWhilePlaying){b=0;pe='m_o';if(x!=4){w.offset=o;w.percent=((w.offset"
+"+1)/w.length)*100;w.percent=w.percent>100?100:Math.floor(w.percent);w.timePlayed=i.t;if(m.monitor)m.monitor(m.s,w)}if(i.to<0)pe='m_s';else if(x==4)pe='m_i';else{t=0;v=e='None';ti=ti?parseInt(ti):0;"
+"z=tp?m.s.sp(tp,','):0;if(ti&&i.ts>=ti)t=1;else if(z){if(o<i.to)i.to=o;else{for(j=0;j<z.length;j++){ti=z[j]?parseInt(z[j]):0;if(ti&&((i.to+1)/i.l<ti/100)&&((o+1)/i.l>=ti/100)){t=1;j=z.length}}}}}}}e"
+"lse{m.e(n,2,-1);if(m.trackWhilePlaying){w.offset=i.lo;w.percent=((w.offset+1)/w.length)*100;w.percent=w.percent>100?100:Math.floor(w.percent);w.timePlayed=i.t;if(m.monitor)m.monitor(m.s,w)}m.l[n]=0"
+";if(i.e){pev3+=i.t+d+i.s+d+(m.trackWhilePlaying&&i.to>=0?'L'+i.to:'')+i.e;if(m.trackWhilePlaying){v=e='None';pe='m_o'}else{t=0;m.s.fbr(b)}}else t=0;b=0}if(t){vo.linkTrackVars=v;vo.linkTrackEvents=e"
+";vo.pe=pe;vo.pev3=pev3;m.s.t(vo,b);if(m.trackWhilePlaying){i.ts=0;i.to=o;i.e=''}}}}return i};m.ae=function(n,l,p,x,o,b){if(n&&p){var m=this;if(!m.l||!m.l[n])m.open(n,l,p,b);m.e(n,x,o)}};m.a=functio"
+"n(o,t){var m=this,i=o.id?o.id:o.name,n=o.name,p=0,v,c,c1,c2,xc=m.s.h,x,e,f1,f2='s_media_'+m._in+'_oc',f3='s_media_'+m._in+'_t',f4='s_media_'+m._in+'_s',f5='s_media_'+m._in+'_l',f6='s_media_'+m._in+"
+"'_m',f7='s_media_'+m._in+'_c',tcf,w;if(!i){if(!m.c)m.c=0;i='s_media_'+m._in+'_'+m.c;m.c++}if(!o.id)o.id=i;if(!o.name)o.name=n=i;if(!m.ol)m.ol=new Object;if(m.ol[i])return;m.ol[i]=o;if(!xc)xc=m.s.b;"
+"tcf=new Function('o','var e,p=0;try{if(o.versionInfo&&o.currentMedia&&o.controls)p=1}catch(e){p=0}return p');p=tcf(o);if(!p){tcf=new Function('o','var e,p=0,t;try{t=o.GetQuickTimeVersion();if(t)p=2"
+"}catch(e){p=0}return p');p=tcf(o);if(!p){tcf=new Function('o','var e,p=0,t;try{t=o.GetVersionInfo();if(t)p=3}catch(e){p=0}return p');p=tcf(o)}}v=\"var m=s_c_il[\"+m._in+\"],o=m.ol['\"+i+\"']\";if(p"
+"==1){p='Windows Media Player '+o.versionInfo;c1=v+',n,p,l,x=-1,cm,c,mn;if(o){cm=o.currentMedia;c=o.controls;if(cm&&c){mn=cm.name?cm.name:c.URL;l=cm.duration;p=c.currentPosition;n=o.playState;if(n){"
+"if(n==8)x=0;if(n==3)x=1;if(n==1||n==2||n==4||n==5||n==6)x=2;}';c2='if(x>=0)m.ae(mn,l,\"'+p+'\",x,x!=2?p:-1,o)}}';c=c1+c2;if(m.s.isie&&xc){x=m.s.d.createElement('script');x.language='jscript';x.type"
+"='text/javascript';x.htmlFor=i;x.event='PlayStateChange(NewState)';x.defer=true;x.text=c;xc.appendChild(x);o[f6]=new Function(c1+'if(n==3){x=3;'+c2+'}setTimeout(o.'+f6+',5000)');o[f6]()}}if(p==2){p"
+"='QuickTime Player '+(o.GetIsQuickTimeRegistered()?'Pro ':'')+o.GetQuickTimeVersion();f1=f2;c=v+',n,x,t,l,p,p2,mn;if(o){mn=o.GetMovieName()?o.GetMovieName():o.GetURL();n=o.GetRate();t=o.GetTimeScal"
+"e();l=o.GetDuration()/t;p=o.GetTime()/t;p2=o.'+f5+';if(n!=o.'+f4+'||p<p2||p-p2>5){x=2;if(n!=0)x=1;else if(p>=l)x=0;if(p<p2||p-p2>5)m.ae(mn,l,\"'+p+'\",2,p2,o);m.ae(mn,l,\"'+p+'\",x,x!=2?p:-1,o)}if("
+"n>0&&o.'+f7+'>=10){m.ae(mn,l,\"'+p+'\",3,p,o);o.'+f7+'=0}o.'+f7+'++;o.'+f4+'=n;o.'+f5+'=p;setTimeout(\"'+v+';o.'+f2+'(0,0)\",500)}';o[f1]=new Function('a','b',c);o[f4]=-1;o[f7]=0;o[f1](0,0)}if(p==3"
+"){p='RealPlayer '+o.GetVersionInfo();f1=n+'_OnPlayStateChange';c1=v+',n,x=-1,l,p,mn;if(o){mn=o.GetTitle()?o.GetTitle():o.GetSource();n=o.GetPlayState();l=o.GetLength()/1000;p=o.GetPosition()/1000;i"
+"f(n!=o.'+f4+'){if(n==3)x=1;if(n==0||n==2||n==4||n==5)x=2;if(n==0&&(p>=l||p==0))x=0;if(x>=0)m.ae(mn,l,\"'+p+'\",x,x!=2?p:-1,o)}if(n==3&&(o.'+f7+'>=10||!o.'+f3+')){m.ae(mn,l,\"'+p+'\",3,p,o);o.'+f7+'"
+"=0}o.'+f7+'++;o.'+f4+'=n;';c2='if(o.'+f2+')o.'+f2+'(o,n)}';if(m.s.wd[f1])o[f2]=m.s.wd[f1];m.s.wd[f1]=new Function('a','b',c1+c2);o[f1]=new Function('a','b',c1+'setTimeout(\"'+v+';o.'+f1+'(0,0)\",o."
+"'+f3+'?500:5000);'+c2);o[f4]=-1;if(m.s.isie)o[f3]=1;o[f7]=0;o[f1](0,0)}};m.as=new Function('e','var m=s_c_il['+m._in+'],l,n;if(m.autoTrack&&m.s.d.getElementsByTagName){l=m.s.d.getElementsByTagName("
+"m.s.isie?\"OBJECT\":\"EMBED\");if(l)for(n=0;n<l.length;n++)m.a(l[n]);}');if(s.wd.attachEvent)s.wd.attachEvent('onload',m.as);else if(s.wd.addEventListener)s.wd.addEventListener('load',m.as,false)";
s_dell.m_i("Media");

/* Module: Survey */
s_dell.m_Survey_c="var m=s.m_i(\"Survey\");m.launch=function(i,e,c,o,f){this._boot();var m=this,g=window.s_sv_globals||{},l,j;if(g.unloaded||m._blocked())return 0;i=i&&i.constructor&&i.constructor==A"
+"rray?i:[i];l=g.manualTriggers;for(j=0;j<i.length;++j)l[l.length]={l:m._suites,i:i[j],e:e||0,c:c||0,o:o||0,f:f||0};m._execute();return 1;};m._t=function(){this._boot();var m=this,s=m.s,g=window.s_sv"
+"_globals||{},l;if(m._blocked())return;l=g.pageImpressions;l[l.length]={l:m._suites,n:s.pageName||\"\",u:s.pageURL||\"\",r:s.referrer||\"\",c:s.campaign||\"\"};m._execute();};m._rr=function(){var g="
+"window.s_sv_globals||{},f=g.onScQueueEmpty||0;if(f)f();};m._blocked=function(){var m=this,g=window.s_sv_globals||{};return !m._booted||g.stop||!g.pending&&!g.triggerRequested;};m._execute=function("
+"){if(s_sv_globals.execute)setTimeout(\"s_sv_globals.execute();\",0);};m._boot=function(){var m=this,s=m.s,w=window,g,c,d=s.dc,e=s.visitorNamespace,n=navigator.appName.toLowerCase(),a=navigator.user"
+"Agent,v=navigator.appVersion,h,i,j,k,l,b;if(w.s_sv_globals)return;if(!((b=v.match(/AppleWebKit\\/([0-9]+)/))?521<b[1]:n==\"netscape\"?a.match(/gecko\\//i):(b=a.match(/opera[ \\/]?([0-9]+).[0-9]+/i)"
+")?7<b[1]:n==\"microsoft internet explorer\"&&!v.match(/macintosh/i)&&(b=v.match(/msie ([0-9]+).([0-9]+)/i))&&(5<b[1]||b[1]==5&&4<b[2])))return;g=w.s_sv_globals={};g.module=m;g.pending=0;g.incomingL"
+"ists=[];g.pageImpressions=[];g.manualTriggers=[];e=\"survey\";c=g.config={};m._param(c,\"dynamic_root\",(e?e+\".\":\"\")+d+\".2o7.net/survey/dynamic\");m._param(c,\"gather_root\",(e?e+\".\":\"\")+d"
+"+\".2o7.net/survey/gather\");g.url=location.protocol+\"//\"+c.dynamic_root;g.gatherUrl=location.protocol+\"//\"+c.gather_root;g.dataCenter=d;g.onListLoaded=new Function(\"r\",\"b\",\"d\",\"i\",\"l"
+"\",\"s_sv_globals.module._loaded(r,b,d,i,l);\");m._suites=(m.suites||s.un).toLowerCase().split(\",\");l=m._suites;b={};for(j=0;j<l.length;++j){i=l[j];if(i&&!b[i]){h=i.length;for(k=0;k<i.length;++k)"
+"h=(h&0x03ffffff)<<5^h>>26^i.charCodeAt(k);b[i]={url:g.url+\"/suites/\"+(h%251+100)+\"/\"+encodeURIComponent(i.replace(/\\|/,\"||\").replace(/\\//,\"|-\"))};++g.pending;}}g.suites=b;setTimeout(\"s_s"
+"v_globals.module._load();\",0);m._booted=1;};m._param=function(c,n,v){var p=\"s_sv_\",w=window,u=\"undefined\";if(typeof c[n]==u)c[n]=typeof w[p+n]==u?v:w[p+n];};m._load=function(){var m=this,g=s_s"
+"v_globals,q=g.suites,r,i,n=\"s_sv_sid\",b=m.s.c_r(n);if(!b){b=parseInt((new Date()).getTime()*Math.random());m.s.c_w(n,b);}for(i in q){r=q[i];if(!r.requested){r.requested=1;m._script(r.url+\"/list."
+"js?\"+b);}}};m._loaded=function(r,b,d,i,l){var m=this,g=s_sv_globals,n=g.incomingLists;--g.pending;if(!g.commonRevision){g.bulkRevision=b;g.commonRevision=r;g.commonUrl=g.url+\"/common/\"+b;}else i"
+"f(g.commonRevision!=r)return;if(!l.length)return;n[n.length]={r:i,l:l};if(g.execute)g.execute();else if(!g.triggerRequested){g.triggerRequested=1;m._script(g.commonUrl+\"/trigger.js\");}};m._script"
+"=function(u){var d=document,e=d.createElement(\"script\");e.type=\"text/javascript\";e.src=u;d.getElementsByTagName(\"head\")[0].appendChild(e);};if(m.onLoad)m.onLoad(s,m)";
s_dell.m_i("Survey");

/************* DO NOT ALTER ANYTHING BELOW THIS LINE ! **************/
var s_code='',s_objectID;function s_gi(un,pg,ss){var c="s.version='H.24.1';s.an=s_an;s.logDebug=function(m){var s=this,tcf=new Function('var e;try{console.log(\"'+s.rep(s.rep(m,\"\\n\",\"\\\\n\"),\""
+"\\\"\",\"\\\\\\\"\")+'\");}catch(e){}');tcf()};s.cls=function(x,c){var i,y='';if(!c)c=this.an;for(i=0;i<x.length;i++){n=x.substring(i,i+1);if(c.indexOf(n)>=0)y+=n}return y};s.fl=function(x,l){retur"
+"n x?(''+x).substring(0,l):x};s.co=function(o){if(!o)return o;var n=new Object,x;for(x in o)if(x.indexOf('select')<0&&x.indexOf('filter')<0)n[x]=o[x];return n};s.num=function(x){x=''+x;for(var p=0;p"
+"<x.length;p++)if(('0123456789').indexOf(x.substring(p,p+1))<0)return 0;return 1};s.rep=s_rep;s.sp=s_sp;s.jn=s_jn;s.ape=function(x){var s=this,h='0123456789ABCDEF',i,c=s.charSet,n,l,e,y='';c=c?c.toU"
+"pperCase():'';if(x){x=''+x;if(s.em==3)x=encodeURIComponent(x);else if(c=='AUTO'&&('').charCodeAt){for(i=0;i<x.length;i++){c=x.substring(i,i+1);n=x.charCodeAt(i);if(n>127){l=0;e='';while(n||l<4){e=h"
+".substring(n%16,n%16+1)+e;n=(n-n%16)/16;l++}y+='%u'+e}else if(c=='+')y+='%2B';else y+=escape(c)}x=y}else x=escape(''+x);x=s.rep(x,'+','%2B');if(c&&c!='AUTO'&&s.em==1&&x.indexOf('%u')<0&&x.indexOf('"
+"%U')<0){i=x.indexOf('%');while(i>=0){i++;if(h.substring(8).indexOf(x.substring(i,i+1).toUpperCase())>=0)return x.substring(0,i)+'u00'+x.substring(i);i=x.indexOf('%',i)}}}return x};s.epa=function(x)"
+"{var s=this;if(x){x=s.rep(''+x,'+',' ');return s.em==3?decodeURIComponent(x):unescape(x)}return x};s.pt=function(x,d,f,a){var s=this,t=x,z=0,y,r;while(t){y=t.indexOf(d);y=y<0?t.length:y;t=t.substri"
+"ng(0,y);r=s[f](t,a);if(r)return r;z+=y+d.length;t=x.substring(z,x.length);t=z<x.length?t:''}return ''};s.isf=function(t,a){var c=a.indexOf(':');if(c>=0)a=a.substring(0,c);c=a.indexOf('=');if(c>=0)a"
+"=a.substring(0,c);if(t.substring(0,2)=='s_')t=t.substring(2);return (t!=''&&t==a)};s.fsf=function(t,a){var s=this;if(s.pt(a,',','isf',t))s.fsg+=(s.fsg!=''?',':'')+t;return 0};s.fs=function(x,f){var"
+" s=this;s.fsg='';s.pt(x,',','fsf',f);return s.fsg};s.si=function(){var s=this,i,k,v,c=s_gi+'var s=s_gi(\"'+s.oun+'\");s.sa(\"'+s.un+'\");';for(i=0;i<s.va_g.length;i++){k=s.va_g[i];v=s[k];if(v!=unde"
+"fined){if(typeof(v)!='number')c+='s.'+k+'=\"'+s_fe(v)+'\";';else c+='s.'+k+'='+v+';'}}c+=\"s.lnk=s.eo=s.linkName=s.linkType=s.wd.s_objectID=s.ppu=s.pe=s.pev1=s.pev2=s.pev3='';\";return c};s.c_d='';"
+"s.c_gdf=function(t,a){var s=this;if(!s.num(t))return 1;return 0};s.c_gd=function(){var s=this,d=s.wd.location.hostname,n=s.fpCookieDomainPeriods,p;if(!n)n=s.cookieDomainPeriods;if(d&&!s.c_d){n=n?pa"
+"rseInt(n):2;n=n>2?n:2;p=d.lastIndexOf('.');if(p>=0){while(p>=0&&n>1){p=d.lastIndexOf('.',p-1);n--}s.c_d=p>0&&s.pt(d,'.','c_gdf',0)?d.substring(p):d}}return s.c_d};s.c_r=function(k){var s=this;k=s.a"
+"pe(k);var c=' '+s.d.cookie,i=c.indexOf(' '+k+'='),e=i<0?i:c.indexOf(';',i),v=i<0?'':s.epa(c.substring(i+2+k.length,e<0?c.length:e));return v!='[[B]]'?v:''};s.c_w=function(k,v,e){var s=this,d=s.c_gd"
+"(),l=s.cookieLifetime,t;v=''+v;l=l?(''+l).toUpperCase():'';if(e&&l!='SESSION'&&l!='NONE'){t=(v!=''?parseInt(l?l:0):-60);if(t){e=new Date;e.setTime(e.getTime()+(t*1000))}}if(k&&l!='NONE'){s.d.cookie"
+"=k+'='+s.ape(v!=''?v:'[[B]]')+'; path=/;'+(e&&l!='SESSION'?' expires='+e.toGMTString()+';':'')+(d?' domain='+d+';':'');return s.c_r(k)==v}return 0};s.eh=function(o,e,r,f){var s=this,b='s_'+e+'_'+s."
+"_in,n=-1,l,i,x;if(!s.ehl)s.ehl=new Array;l=s.ehl;for(i=0;i<l.length&&n<0;i++){if(l[i].o==o&&l[i].e==e)n=i}if(n<0){n=i;l[n]=new Object}x=l[n];x.o=o;x.e=e;f=r?x.b:f;if(r||f){x.b=r?0:o[e];x.o[e]=f}if("
+"x.b){x.o[b]=x.b;return b}return 0};s.cet=function(f,a,t,o,b){var s=this,r,tcf;if(s.apv>=5&&(!s.isopera||s.apv>=7)){tcf=new Function('s','f','a','t','var e,r;try{r=s[f](a)}catch(e){r=s[t](e)}return "
+"r');r=tcf(s,f,a,t)}else{if(s.ismac&&s.u.indexOf('MSIE 4')>=0)r=s[b](a);else{s.eh(s.wd,'onerror',0,o);r=s[f](a);s.eh(s.wd,'onerror',1)}}return r};s.gtfset=function(e){var s=this;return s.tfs};s.gtfs"
+"oe=new Function('e','var s=s_c_il['+s._in+'],c;s.eh(window,\"onerror\",1);s.etfs=1;c=s.t();if(c)s.d.write(c);s.etfs=0;return true');s.gtfsfb=function(a){return window};s.gtfsf=function(w){var s=thi"
+"s,p=w.parent,l=w.location;s.tfs=w;if(p&&p.location!=l&&p.location.host==l.host){s.tfs=p;return s.gtfsf(s.tfs)}return s.tfs};s.gtfs=function(){var s=this;if(!s.tfs){s.tfs=s.wd;if(!s.etfs)s.tfs=s.cet"
+"('gtfsf',s.tfs,'gtfset',s.gtfsoe,'gtfsfb')}return s.tfs};s.mrq=function(u){var s=this,l=s.rl[u],n,r;s.rl[u]=0;if(l)for(n=0;n<l.length;n++){r=l[n];s.mr(0,0,r.r,r.t,r.u)}};s.flushBufferedRequests=fun"
+"ction(){};s.mr=function(sess,q,rs,ta,u){var s=this,dc=s.dc,t1=s.trackingServer,t2=s.trackingServerSecure,tb=s.trackingServerBase,p='.sc',ns=s.visitorNamespace,un=s.cls(u?u:(ns?ns:s.fun)),r=new Obje"
+"ct,l,imn='s_i_'+(un),im,b,e;if(!rs){if(t1){if(t2&&s.ssl)t1=t2}else{if(!tb)tb='2o7.net';if(dc)dc=(''+dc).toLowerCase();else dc='d1';if(tb=='2o7.net'){if(dc=='d1')dc='112';else if(dc=='d2')dc='122';p"
+"=''}t1=un+'.'+dc+'.'+p+tb}rs='http'+(s.ssl?'s':'')+'://'+t1+'/b/ss/'+s.un+'/'+(s.mobile?'5.1':'1')+'/'+s.version+(s.tcn?'T':'')+'/'+sess+'?AQB=1&ndh=1'+(q?q:'')+'&AQE=1';if(s.isie&&!s.ismac)rs=s.fl"
+"(rs,2047)}if(s.d.images&&s.apv>=3&&(!s.isopera||s.apv>=7)&&(s.ns6<0||s.apv>=6.1)){if(!s.rc)s.rc=new Object;if(!s.rc[un]){s.rc[un]=1;if(!s.rl)s.rl=new Object;s.rl[un]=new Array;setTimeout('if(window"
+".s_c_il)window.s_c_il['+s._in+'].mrq(\"'+un+'\")',750)}else{l=s.rl[un];if(l){r.t=ta;r.u=un;r.r=rs;l[l.length]=r;return ''}imn+='_'+s.rc[un];s.rc[un]++}im=s.wd[imn];if(!im)im=s.wd[imn]=new Image;im."
+"s_l=0;im.onload=new Function('e','this.s_l=1;var wd=window,s;if(wd.s_c_il){s=wd.s_c_il['+s._in+'];s.mrq(\"'+un+'\");s.nrs--;if(!s.nrs)s.m_m(\"rr\")}');if(!s.nrs){s.nrs=1;s.m_m('rs')}else s.nrs++;if"
+"(s.debugTracking){var d='AppMeasurement Debug: '+rs,dl=s.sp(rs,'&'),dln;for(dln=0;dln<dl.length;dln++)d+=\"\\n\\t\"+s.epa(dl[dln]);s.logDebug(d)}im.src=rs;if((!ta||ta=='_self'||ta=='_top'||(s.wd.na"
+"me&&ta==s.wd.name))&&rs.indexOf('&pe=')>=0){b=e=new Date;while(!im.s_l&&e.getTime()-b.getTime()<500)e=new Date}return ''}return '<im'+'g sr'+'c=\"'+rs+'\" width=1 height=1 border=0 alt=\"\">'};s.gg"
+"=function(v){var s=this;if(!s.wd['s_'+v])s.wd['s_'+v]='';return s.wd['s_'+v]};s.glf=function(t,a){if(t.substring(0,2)=='s_')t=t.substring(2);var s=this,v=s.gg(t);if(v)s[t]=v};s.gl=function(v){var s"
+"=this;if(s.pg)s.pt(v,',','glf',0)};s.rf=function(x){var s=this,y,i,j,h,p,l=0,q,a,b='',c='',t;if(x&&x.length>255){y=''+x;i=y.indexOf('?');if(i>0){q=y.substring(i+1);y=y.substring(0,i);h=y.toLowerCas"
+"e();j=0;if(h.substring(0,7)=='http://')j+=7;else if(h.substring(0,8)=='https://')j+=8;i=h.indexOf(\"/\",j);if(i>0){h=h.substring(j,i);p=y.substring(i);y=y.substring(0,i);if(h.indexOf('google')>=0)l"
+"=',q,ie,start,search_key,word,kw,cd,';else if(h.indexOf('yahoo.co')>=0)l=',p,ei,';if(l&&q){a=s.sp(q,'&');if(a&&a.length>1){for(j=0;j<a.length;j++){t=a[j];i=t.indexOf('=');if(i>0&&l.indexOf(','+t.su"
+"bstring(0,i)+',')>=0)b+=(b?'&':'')+t;else c+=(c?'&':'')+t}if(b&&c)q=b+'&'+c;else c=''}i=253-(q.length-c.length)-y.length;x=y+(i>0?p.substring(0,i):'')+'?'+q}}}}return x};s.s2q=function(k,v,vf,vfp,f"
+"){var s=this,qs='',sk,sv,sp,ss,nke,nk,nf,nfl=0,nfn,nfm;if(k==\"contextData\")k=\"c\";if(v){for(sk in v) {if((!f||sk.substring(0,f.length)==f)&&v[sk]&&(!vf||vf.indexOf(','+(vfp?vfp+'.':'')+sk+',')>="
+"0)){nfm=0;if(nfl)for(nfn=0;nfn<nfl.length;nfn++)if(sk.substring(0,nfl[nfn].length)==nfl[nfn])nfm=1;if(!nfm){if(qs=='')qs+='&'+k+'.';sv=v[sk];if(f)sk=sk.substring(f.length);if(sk.length>0){nke=sk.in"
+"dexOf('.');if(nke>0){nk=sk.substring(0,nke);nf=(f?f:'')+nk+'.';if(!nfl)nfl=new Array;nfl[nfl.length]=nf;qs+=s.s2q(nk,v,vf,vfp,nf)}else{if(typeof(sv)=='boolean'){if(sv)sv='true';else sv='false'}if(s"
+"v){if(vfp=='retrieveLightData'&&f.indexOf('.contextData.')<0){sp=sk.substring(0,4);ss=sk.substring(4);if(sk=='transactionID')sk='xact';else if(sk=='channel')sk='ch';else if(sk=='campaign')sk='v0';e"
+"lse if(s.num(ss)){if(sp=='prop')sk='c'+ss;else if(sp=='eVar')sk='v'+ss;else if(sp=='list')sk='l'+ss;else if(sp=='hier'){sk='h'+ss;sv=sv.substring(0,255)}}}qs+='&'+s.ape(sk)+'='+s.ape(sv)}}}}}}if(qs"
+"!='')qs+='&.'+k}return qs};s.hav=function(){var s=this,qs='',l,fv='',fe='',mn,i,e;if(s.lightProfileID){l=s.va_m;fv=s.lightTrackVars;if(fv)fv=','+fv+','+s.vl_mr+','}else{l=s.va_t;if(s.pe||s.linkType"
+"){fv=s.linkTrackVars;fe=s.linkTrackEvents;if(s.pe){mn=s.pe.substring(0,1).toUpperCase()+s.pe.substring(1);if(s[mn]){fv=s[mn].trackVars;fe=s[mn].trackEvents}}}if(fv)fv=','+fv+','+s.vl_l+','+s.vl_l2;"
+"if(fe){fe=','+fe+',';if(fv)fv+=',events,'}if (s.events2)e=(e?',':'')+s.events2}for(i=0;i<l.length;i++){var k=l[i],v=s[k],b=k.substring(0,4),x=k.substring(4),n=parseInt(x),q=k;if(!v)if(k=='events'&&"
+"e){v=e;e=''}if(v&&(!fv||fv.indexOf(','+k+',')>=0)&&k!='linkName'&&k!='linkType'){if(k=='timestamp')q='ts';else if(k=='dynamicVariablePrefix')q='D';else if(k=='visitorID')q='vid';else if(k=='pageURL"
+"'){q='g';v=s.fl(v,255)}else if(k=='referrer'){q='r';v=s.fl(s.rf(v),255)}else if(k=='vmk'||k=='visitorMigrationKey')q='vmt';else if(k=='visitorMigrationServer'){q='vmf';if(s.ssl&&s.visitorMigrationS"
+"erverSecure)v=''}else if(k=='visitorMigrationServerSecure'){q='vmf';if(!s.ssl&&s.visitorMigrationServer)v=''}else if(k=='charSet'){q='ce';if(v.toUpperCase()=='AUTO')v='ISO8859-1';else if(s.em==2||s"
+".em==3)v='UTF-8'}else if(k=='visitorNamespace')q='ns';else if(k=='cookieDomainPeriods')q='cdp';else if(k=='cookieLifetime')q='cl';else if(k=='variableProvider')q='vvp';else if(k=='currencyCode')q='"
+"cc';else if(k=='channel')q='ch';else if(k=='transactionID')q='xact';else if(k=='campaign')q='v0';else if(k=='resolution')q='s';else if(k=='colorDepth')q='c';else if(k=='javascriptVersion')q='j';els"
+"e if(k=='javaEnabled')q='v';else if(k=='cookiesEnabled')q='k';else if(k=='browserWidth')q='bw';else if(k=='browserHeight')q='bh';else if(k=='connectionType')q='ct';else if(k=='homepage')q='hp';else"
+" if(k=='plugins')q='p';else if(k=='events'){if(e)v+=(v?',':'')+e;if(fe)v=s.fs(v,fe)}else if(k=='events2')v='';else if(k=='contextData'){qs+=s.s2q('c',s[k],fv,k,0);v=''}else if(k=='lightProfileID')q"
+"='mtp';else if(k=='lightStoreForSeconds'){q='mtss';if(!s.lightProfileID)v=''}else if(k=='lightIncrementBy'){q='mti';if(!s.lightProfileID)v=''}else if(k=='retrieveLightProfiles')q='mtsr';else if(k=="
+"'deleteLightProfiles')q='mtsd';else if(k=='retrieveLightData'){if(s.retrieveLightProfiles)qs+=s.s2q('mts',s[k],fv,k,0);v=''}else if(s.num(x)){if(b=='prop')q='c'+n;else if(b=='eVar')q='v'+n;else if("
+"b=='list')q='l'+n;else if(b=='hier'){q='h'+n;v=s.fl(v,255)}}if(v)qs+='&'+s.ape(q)+'='+(k.substring(0,3)!='pev'?s.ape(v):v)}}return qs};s.ltdf=function(t,h){t=t?t.toLowerCase():'';h=h?h.toLowerCase("
+"):'';var qi=h.indexOf('?');h=qi>=0?h.substring(0,qi):h;if(t&&h.substring(h.length-(t.length+1))=='.'+t)return 1;return 0};s.ltef=function(t,h){t=t?t.toLowerCase():'';h=h?h.toLowerCase():'';if(t&&h."
+"indexOf(t)>=0)return 1;return 0};s.lt=function(h){var s=this,lft=s.linkDownloadFileTypes,lef=s.linkExternalFilters,lif=s.linkInternalFilters;lif=lif?lif:s.wd.location.hostname;h=h.toLowerCase();if("
+"s.trackDownloadLinks&&lft&&s.pt(lft,',','ltdf',h))return 'd';if(s.trackExternalLinks&&h.substring(0,1)!='#'&&(lef||lif)&&(!lef||s.pt(lef,',','ltef',h))&&(!lif||!s.pt(lif,',','ltef',h)))return 'e';r"
+"eturn ''};s.lc=new Function('e','var s=s_c_il['+s._in+'],b=s.eh(this,\"onclick\");s.lnk=s.co(this);s.t();s.lnk=0;if(b)return this[b](e);return true');s.bc=new Function('e','var s=s_c_il['+s._in+'],"
+"f,tcf;if(s.d&&s.d.all&&s.d.all.cppXYctnr)return;s.eo=e.srcElement?e.srcElement:e.target;tcf=new Function(\"s\",\"var e;try{if(s.eo&&(s.eo.tagName||s.eo.parentElement||s.eo.parentNode))s.t()}catch(e"
+"){}\");tcf(s);s.eo=0');s.oh=function(o){var s=this,l=s.wd.location,h=o.href?o.href:'',i,j,k,p;i=h.indexOf(':');j=h.indexOf('?');k=h.indexOf('/');if(h&&(i<0||(j>=0&&i>j)||(k>=0&&i>k))){p=o.protocol&"
+"&o.protocol.length>1?o.protocol:(l.protocol?l.protocol:'');i=l.pathname.lastIndexOf('/');h=(p?p+'//':'')+(o.host?o.host:(l.host?l.host:''))+(h.substring(0,1)!='/'?l.pathname.substring(0,i<0?0:i)+'/"
+"':'')+h}return h};s.ot=function(o){var t=o.tagName;if(o.tagUrn||(o.scopeName&&o.scopeName.toUpperCase()!='HTML'))return '';t=t&&t.toUpperCase?t.toUpperCase():'';if(t=='SHAPE')t='';if(t){if((t=='INP"
+"UT'||t=='BUTTON')&&o.type&&o.type.toUpperCase)t=o.type.toUpperCase();else if(!t&&o.href)t='A';}return t};s.oid=function(o){var s=this,t=s.ot(o),p,c,n='',x=0;if(t&&!o.s_oid){p=o.protocol;c=o.onclick"
+";if(o.href&&(t=='A'||t=='AREA')&&(!c||!p||p.toLowerCase().indexOf('javascript')<0))n=s.oh(o);else if(c){n=s.rep(s.rep(s.rep(s.rep(''+c,\"\\r\",''),\"\\n\",''),\"\\t\",''),' ','');x=2}else if(t=='IN"
+"PUT'||t=='SUBMIT'){if(o.value)n=o.value;else if(o.innerText)n=o.innerText;else if(o.textContent)n=o.textContent;x=3}else if(o.src&&t=='IMAGE')n=o.src;if(n){o.s_oid=s.fl(n,100);o.s_oidt=x}}return o."
+"s_oid};s.rqf=function(t,un){var s=this,e=t.indexOf('='),u=e>=0?t.substring(0,e):'',q=e>=0?s.epa(t.substring(e+1)):'';if(u&&q&&(','+u+',').indexOf(','+un+',')>=0){if(u!=s.un&&s.un.indexOf(',')>=0)q="
+"'&u='+u+q+'&u=0';return q}return ''};s.rq=function(un){if(!un)un=this.un;var s=this,c=un.indexOf(','),v=s.c_r('s_sq'),q='';if(c<0)return s.pt(v,'&','rqf',un);return s.pt(un,',','rq',0)};s.sqp=funct"
+"ion(t,a){var s=this,e=t.indexOf('='),q=e<0?'':s.epa(t.substring(e+1));s.sqq[q]='';if(e>=0)s.pt(t.substring(0,e),',','sqs',q);return 0};s.sqs=function(un,q){var s=this;s.squ[un]=q;return 0};s.sq=fun"
+"ction(q){var s=this,k='s_sq',v=s.c_r(k),x,c=0;s.sqq=new Object;s.squ=new Object;s.sqq[q]='';s.pt(v,'&','sqp',0);s.pt(s.un,',','sqs',q);v='';for(x in s.squ)if(x&&(!Object||!Object.prototype||!Object"
+".prototype[x]))s.sqq[s.squ[x]]+=(s.sqq[s.squ[x]]?',':'')+x;for(x in s.sqq)if(x&&(!Object||!Object.prototype||!Object.prototype[x])&&s.sqq[x]&&(x==q||c<2)){v+=(v?'&':'')+s.sqq[x]+'='+s.ape(x);c++}re"
+"turn s.c_w(k,v,0)};s.wdl=new Function('e','var s=s_c_il['+s._in+'],r=true,b=s.eh(s.wd,\"onload\"),i,o,oc;if(b)r=this[b](e);for(i=0;i<s.d.links.length;i++){o=s.d.links[i];oc=o.onclick?\"\"+o.onclick"
+":\"\";if((oc.indexOf(\"s_gs(\")<0||oc.indexOf(\".s_oc(\")>=0)&&oc.indexOf(\".tl(\")<0)s.eh(o,\"onclick\",0,s.lc);}return r');s.wds=function(){var s=this;if(s.apv>3&&(!s.isie||!s.ismac||s.apv>=5)){i"
+"f(s.b&&s.b.attachEvent)s.b.attachEvent('onclick',s.bc);else if(s.b&&s.b.addEventListener)s.b.addEventListener('click',s.bc,false);else s.eh(s.wd,'onload',0,s.wdl)}};s.vs=function(x){var s=this,v=s."
+"visitorSampling,g=s.visitorSamplingGroup,k='s_vsn_'+s.un+(g?'_'+g:''),n=s.c_r(k),e=new Date,y=e.getYear();e.setYear(y+10+(y<1900?1900:0));if(v){v*=100;if(!n){if(!s.c_w(k,x,e))return 0;n=x}if(n%1000"
+"0>v)return 0}return 1};s.dyasmf=function(t,m){if(t&&m&&m.indexOf(t)>=0)return 1;return 0};s.dyasf=function(t,m){var s=this,i=t?t.indexOf('='):-1,n,x;if(i>=0&&m){var n=t.substring(0,i),x=t.substring"
+"(i+1);if(s.pt(x,',','dyasmf',m))return n}return 0};s.uns=function(){var s=this,x=s.dynamicAccountSelection,l=s.dynamicAccountList,m=s.dynamicAccountMatch,n,i;s.un=s.un.toLowerCase();if(x&&l){if(!m)"
+"m=s.wd.location.host;if(!m.toLowerCase)m=''+m;l=l.toLowerCase();m=m.toLowerCase();n=s.pt(l,';','dyasf',m);if(n)s.un=n}i=s.un.indexOf(',');s.fun=i<0?s.un:s.un.substring(0,i)};s.sa=function(un){var s"
+"=this;s.un=un;if(!s.oun)s.oun=un;else if((','+s.oun+',').indexOf(','+un+',')<0)s.oun+=','+un;s.uns()};s.m_i=function(n,a){var s=this,m,f=n.substring(0,1),r,l,i;if(!s.m_l)s.m_l=new Object;if(!s.m_nl"
+")s.m_nl=new Array;m=s.m_l[n];if(!a&&m&&m._e&&!m._i)s.m_a(n);if(!m){m=new Object,m._c='s_m';m._in=s.wd.s_c_in;m._il=s._il;m._il[m._in]=m;s.wd.s_c_in++;m.s=s;m._n=n;m._l=new Array('_c','_in','_il','_"
+"i','_e','_d','_dl','s','n','_r','_g','_g1','_t','_t1','_x','_x1','_rs','_rr','_l');s.m_l[n]=m;s.m_nl[s.m_nl.length]=n}else if(m._r&&!m._m){r=m._r;r._m=m;l=m._l;for(i=0;i<l.length;i++)if(m[l[i]])r[l"
+"[i]]=m[l[i]];r._il[r._in]=r;m=s.m_l[n]=r}if(f==f.toUpperCase())s[n]=m;return m};s.m_a=new Function('n','g','e','if(!g)g=\"m_\"+n;var s=s_c_il['+s._in+'],c=s[g+\"_c\"],m,x,f=0;if(!c)c=s.wd[\"s_\"+g+"
+"\"_c\"];if(c&&s_d)s[g]=new Function(\"s\",s_ft(s_d(c)));x=s[g];if(!x)x=s.wd[\\'s_\\'+g];if(!x)x=s.wd[g];m=s.m_i(n,1);if(x&&(!m._i||g!=\"m_\"+n)){m._i=f=1;if((\"\"+x).indexOf(\"function\")>=0)x(s);e"
+"lse s.m_m(\"x\",n,x,e)}m=s.m_i(n,1);if(m._dl)m._dl=m._d=0;s.dlt();return f');s.m_m=function(t,n,d,e){t='_'+t;var s=this,i,x,m,f='_'+t,r=0,u;if(s.m_l&&s.m_nl)for(i=0;i<s.m_nl.length;i++){x=s.m_nl[i]"
+";if(!n||x==n){m=s.m_i(x);u=m[t];if(u){if((''+u).indexOf('function')>=0){if(d&&e)u=m[t](d,e);else if(d)u=m[t](d);else u=m[t]()}}if(u)r=1;u=m[t+1];if(u&&!m[f]){if((''+u).indexOf('function')>=0){if(d&"
+"&e)u=m[t+1](d,e);else if(d)u=m[t+1](d);else u=m[t+1]()}}m[f]=1;if(u)r=1}}return r};s.m_ll=function(){var s=this,g=s.m_dl,i,o;if(g)for(i=0;i<g.length;i++){o=g[i];if(o)s.loadModule(o.n,o.u,o.d,o.l,o."
+"e,1);g[i]=0}};s.loadModule=function(n,u,d,l,e,ln){var s=this,m=0,i,g,o=0,f1,f2,c=s.h?s.h:s.b,b,tcf;if(n){i=n.indexOf(':');if(i>=0){g=n.substring(i+1);n=n.substring(0,i)}else g=\"m_\"+n;m=s.m_i(n)}i"
+"f((l||(n&&!s.m_a(n,g)))&&u&&s.d&&c&&s.d.createElement){if(d){m._d=1;m._dl=1}if(ln){if(s.ssl)u=s.rep(u,'http:','https:');i='s_s:'+s._in+':'+n+':'+g;b='var s=s_c_il['+s._in+'],o=s.d.getElementById(\""
+"'+i+'\");if(s&&o){if(!o.l&&s.wd.'+g+'){o.l=1;if(o.i)clearTimeout(o.i);o.i=0;s.m_a(\"'+n+'\",\"'+g+'\"'+(e?',\"'+e+'\"':'')+')}';f2=b+'o.c++;if(!s.maxDelay)s.maxDelay=250;if(!o.l&&o.c<(s.maxDelay*2)"
+"/100)o.i=setTimeout(o.f2,100)}';f1=new Function('e',b+'}');tcf=new Function('s','c','i','u','f1','f2','var e,o=0;try{o=s.d.createElement(\"script\");if(o){o.type=\"text/javascript\";'+(n?'o.id=i;o."
+"defer=true;o.onload=o.onreadystatechange=f1;o.f2=f2;o.l=0;':'')+'o.src=u;c.appendChild(o);'+(n?'o.c=0;o.i=setTimeout(f2,100)':'')+'}}catch(e){o=0}return o');o=tcf(s,c,i,u,f1,f2)}else{o=new Object;o"
+".n=n+':'+g;o.u=u;o.d=d;o.l=l;o.e=e;g=s.m_dl;if(!g)g=s.m_dl=new Array;i=0;while(i<g.length&&g[i])i++;g[i]=o}}else if(n){m=s.m_i(n);m._e=1}return m};s.voa=function(vo,r){var s=this,l=s.va_g,i,k,v,x;f"
+"or(i=0;i<l.length;i++){k=l[i];v=vo[k];if(v||vo['!'+k]){if(!r&&(k==\"contextData\"||k==\"retrieveLightData\")&&s[k])for(x in s[k])if(!v[x])v[x]=s[k][x];s[k]=v}}};s.vob=function(vo){var s=this,l=s.va"
+"_g,i,k;for(i=0;i<l.length;i++){k=l[i];vo[k]=s[k];if(!vo[k])vo['!'+k]=1}};s.dlt=new Function('var s=s_c_il['+s._in+'],d=new Date,i,vo,f=0;if(s.dll)for(i=0;i<s.dll.length;i++){vo=s.dll[i];if(vo){if(!"
+"s.m_m(\"d\")||d.getTime()-vo._t>=s.maxDelay){s.dll[i]=0;s.t(vo)}else f=1}}if(s.dli)clearTimeout(s.dli);s.dli=0;if(f){if(!s.dli)s.dli=setTimeout(s.dlt,s.maxDelay)}else s.dll=0');s.dl=function(vo){va"
+"r s=this,d=new Date;if(!vo)vo=new Object;s.vob(vo);vo._t=d.getTime();if(!s.dll)s.dll=new Array;s.dll[s.dll.length]=vo;if(!s.maxDelay)s.maxDelay=250;s.dlt()};s.track=s.t=function(vo){var s=this,trk="
+"1,tm=new Date,sed=Math&&Math.random?Math.floor(Math.random()*10000000000000):tm.getTime(),sess='s'+Math.floor(tm.getTime()/10800000)%10+sed,y=tm.getYear(),vt=tm.getDate()+'/'+tm.getMonth()+'/'+(y<1"
+"900?y+1900:y)+' '+tm.getHours()+':'+tm.getMinutes()+':'+tm.getSeconds()+' '+tm.getDay()+' '+tm.getTimezoneOffset(),tcf,tfs=s.gtfs(),ta=-1,q='',qs='',code='',vb=new Object;s.gl(s.vl_g);s.uns();s.m_l"
+"l();if(!s.td){var tl=tfs.location,a,o,i,x='',c='',v='',p='',bw='',bh='',j='1.0',k=s.c_w('s_cc','true',0)?'Y':'N',hp='',ct='',pn=0,ps;if(String&&String.prototype){j='1.1';if(j.match){j='1.2';if(tm.s"
+"etUTCDate){j='1.3';if(s.isie&&s.ismac&&s.apv>=5)j='1.4';if(pn.toPrecision){j='1.5';a=new Array;if(a.forEach){j='1.6';i=0;o=new Object;tcf=new Function('o','var e,i=0;try{i=new Iterator(o)}catch(e){"
+"}return i');i=tcf(o);if(i&&i.next)j='1.7'}}}}}if(s.apv>=4)x=screen.width+'x'+screen.height;if(s.isns||s.isopera){if(s.apv>=3){v=s.n.javaEnabled()?'Y':'N';if(s.apv>=4){c=screen.pixelDepth;bw=s.wd.in"
+"nerWidth;bh=s.wd.innerHeight}}s.pl=s.n.plugins}else if(s.isie){if(s.apv>=4){v=s.n.javaEnabled()?'Y':'N';c=screen.colorDepth;if(s.apv>=5){bw=s.d.documentElement.offsetWidth;bh=s.d.documentElement.of"
+"fsetHeight;if(!s.ismac&&s.b){tcf=new Function('s','tl','var e,hp=0;try{s.b.addBehavior(\"#default#homePage\");hp=s.b.isHomePage(tl)?\"Y\":\"N\"}catch(e){}return hp');hp=tcf(s,tl);tcf=new Function('"
+"s','var e,ct=0;try{s.b.addBehavior(\"#default#clientCaps\");ct=s.b.connectionType}catch(e){}return ct');ct=tcf(s)}}}else r=''}if(s.pl)while(pn<s.pl.length&&pn<30){ps=s.fl(s.pl[pn].name,100)+';';if("
+"p.indexOf(ps)<0)p+=ps;pn++}s.resolution=x;s.colorDepth=c;s.javascriptVersion=j;s.javaEnabled=v;s.cookiesEnabled=k;s.browserWidth=bw;s.browserHeight=bh;s.connectionType=ct;s.homepage=hp;s.plugins=p;"
+"s.td=1}if(vo){s.vob(vb);s.voa(vo)}if((vo&&vo._t)||!s.m_m('d')){if(s.usePlugins)s.doPlugins(s);var l=s.wd.location,r=tfs.document.referrer;if(!s.pageURL)s.pageURL=l.href?l.href:l;if(!s.referrer&&!s."
+"_1_referrer){s.referrer=r;s._1_referrer=1}s.m_m('g');if(s.lnk||s.eo){var o=s.eo?s.eo:s.lnk,p=s.pageName,w=1,t=s.ot(o),n=s.oid(o),x=o.s_oidt,h,l,i,oc;if(s.eo&&o==s.eo){while(o&&!n&&t!='BODY'){o=o.pa"
+"rentElement?o.parentElement:o.parentNode;if(o){t=s.ot(o);n=s.oid(o);x=o.s_oidt}}if(o){oc=o.onclick?''+o.onclick:'';if((oc.indexOf('s_gs(')>=0&&oc.indexOf('.s_oc(')<0)||oc.indexOf('.tl(')>=0)o=0}}if"
+"(o){if(n)ta=o.target;h=s.oh(o);i=h.indexOf('?');h=s.linkLeaveQueryString||i<0?h:h.substring(0,i);l=s.linkName;t=s.linkType?s.linkType.toLowerCase():s.lt(h);if(t&&(h||l)){s.pe='lnk_'+(t=='d'||t=='e'"
+"?t:'o');q+='&pe='+s.pe+(h?'&pev1='+s.ape(h):'')+(l?'&pev2='+s.ape(l):'');}else trk=0;if(s.trackInlineStats){if(!p){p=s.pageURL;w=0}t=s.ot(o);i=o.sourceIndex;if(s.gg('objectID')){n=s.gg('objectID');"
+"x=1;i=1}if(p&&n&&t)qs='&pid='+s.ape(s.fl(p,255))+(w?'&pidt='+w:'')+'&oid='+s.ape(s.fl(n,100))+(x?'&oidt='+x:'')+'&ot='+s.ape(t)+(i?'&oi='+i:'')}}else trk=0}if(trk||qs){s.sampled=s.vs(sed);if(trk){i"
+"f(s.sampled)code=s.mr(sess,(vt?'&t='+s.ape(vt):'')+s.hav()+q+(qs?qs:s.rq()),0,ta);qs='';s.m_m('t');if(s.p_r)s.p_r();s.referrer=s.lightProfileID=s.retrieveLightProfiles=s.deleteLightProfiles=''}s.sq"
+"(qs)}}else s.dl(vo);if(vo)s.voa(vb,1);s.lnk=s.eo=s.linkName=s.linkType=s.wd.s_objectID=s.ppu=s.pe=s.pev1=s.pev2=s.pev3='';if(s.pg)s.wd.s_lnk=s.wd.s_eo=s.wd.s_linkName=s.wd.s_linkType='';return code"
+"};s.trackLink=s.tl=function(o,t,n,vo){var s=this;s.lnk=s.co(o);s.linkType=t;s.linkName=n;s.t(vo)};s.trackLight=function(p,ss,i,vo){var s=this;s.lightProfileID=p;s.lightStoreForSeconds=ss;s.lightInc"
+"rementBy=i;s.t(vo)};s.setTagContainer=function(n){var s=this,l=s.wd.s_c_il,i,t,x,y;s.tcn=n;if(l)for(i=0;i<l.length;i++){t=l[i];if(t&&t._c=='s_l'&&t.tagContainerName==n){s.voa(t);if(t.lmq)for(i=0;i<"
+"t.lmq.length;i++){x=t.lmq[i];y='m_'+x.n;if(!s[y]&&!s[y+'_c']){s[y]=t[y];s[y+'_c']=t[y+'_c']}s.loadModule(x.n,x.u,x.d)}if(t.ml)for(x in t.ml)if(s[x]){y=s[x];x=t.ml[x];for(i in x)if(!Object.prototype"
+"[i]){if(typeof(x[i])!='function'||(''+x[i]).indexOf('s_c_il')<0)y[i]=x[i]}}if(t.mmq)for(i=0;i<t.mmq.length;i++){x=t.mmq[i];if(s[x.m]){y=s[x.m];if(y[x.f]&&typeof(y[x.f])=='function'){if(x.a)y[x.f].a"
+"pply(y,x.a);else y[x.f].apply(y)}}}if(t.tq)for(i=0;i<t.tq.length;i++)s.t(t.tq[i]);t.s=s;return}}};s.wd=window;s.ssl=(s.wd.location.protocol.toLowerCase().indexOf('https')>=0);s.d=document;s.b=s.d.b"
+"ody;if(s.d.getElementsByTagName){s.h=s.d.getElementsByTagName('HEAD');if(s.h)s.h=s.h[0]}s.n=navigator;s.u=s.n.userAgent;s.ns6=s.u.indexOf('Netscape6/');var apn=s.n.appName,v=s.n.appVersion,ie=v.ind"
+"exOf('MSIE '),o=s.u.indexOf('Opera '),i;if(v.indexOf('Opera')>=0||o>0)apn='Opera';s.isie=(apn=='Microsoft Internet Explorer');s.isns=(apn=='Netscape');s.isopera=(apn=='Opera');s.ismac=(s.u.indexOf("
+"'Mac')>=0);if(o>0)s.apv=parseFloat(s.u.substring(o+6));else if(ie>0){s.apv=parseInt(i=v.substring(ie+5));if(s.apv>3)s.apv=parseFloat(i)}else if(s.ns6>0)s.apv=parseFloat(s.u.substring(s.ns6+10));els"
+"e s.apv=parseFloat(v);s.em=0;if(s.em.toPrecision)s.em=3;else if(String.fromCharCode){i=escape(String.fromCharCode(256)).toUpperCase();s.em=(i=='%C4%80'?2:(i=='%U0100'?1:0))}if(s.oun)s.sa(s.oun);s.s"
+"a(un);s.vl_l='dynamicVariablePrefix,visitorID,vmk,visitorMigrationKey,visitorMigrationServer,visitorMigrationServerSecure,ppu,charSet,visitorNamespace,cookieDomainPeriods,cookieLifetime,pageName,pa"
+"geURL,referrer,currencyCode';s.va_l=s.sp(s.vl_l,',');s.vl_mr=s.vl_m='charSet,visitorNamespace,cookieDomainPeriods,cookieLifetime,contextData,lightProfileID,lightStoreForSeconds,lightIncrementBy';s."
+"vl_t=s.vl_l+',variableProvider,channel,server,pageType,transactionID,purchaseID,campaign,state,zip,events,events2,products,linkName,linkType,contextData,lightProfileID,lightStoreForSeconds,lightInc"
+"rementBy,retrieveLightProfiles,deleteLightProfiles,retrieveLightData';var n;for(n=1;n<=75;n++){s.vl_t+=',prop'+n+',eVar'+n;s.vl_m+=',prop'+n+',eVar'+n}for(n=1;n<=5;n++)s.vl_t+=',hier'+n;for(n=1;n<="
+"3;n++)s.vl_t+=',list'+n;s.va_m=s.sp(s.vl_m,',');s.vl_l2=',tnt,pe,pev1,pev2,pev3,resolution,colorDepth,javascriptVersion,javaEnabled,cookiesEnabled,browserWidth,browserHeight,connectionType,homepage"
+",plugins';s.vl_t+=s.vl_l2;s.va_t=s.sp(s.vl_t,',');s.vl_g=s.vl_t+',trackingServer,trackingServerSecure,trackingServerBase,fpCookieDomainPeriods,disableBufferedRequests,mobile,visitorSampling,visitor"
+"SamplingGroup,dynamicAccountSelection,dynamicAccountList,dynamicAccountMatch,trackDownloadLinks,trackExternalLinks,trackInlineStats,linkLeaveQueryString,linkDownloadFileTypes,linkExternalFilters,li"
+"nkInternalFilters,linkTrackVars,linkTrackEvents,linkNames,lnk,eo,lightTrackVars,_1_referrer,un';s.va_g=s.sp(s.vl_g,',');s.pg=pg;s.gl(s.vl_g);s.contextData=new Object;s.retrieveLightData=new Object;"
+"if(!ss)s.wds();if(pg){s.wd.s_co=function(o){s_gi(\"_\",1,1).co(o)};s.wd.s_gs=function(un){s_gi(un,1,1).t()};s.wd.s_dc=function(un){s_gi(un,1).t()}}",
w=window,l=w.s_c_il,n=navigator,u=n.userAgent,v=n.appVersion,e=v.indexOf('MSIE '),m=u.indexOf('Netscape6/'),a,i,j,x,s;if(un){un=un.toLowerCase();if(l)for(j=0;j<2;j++)for(i=0;i<l.length;i++){s=l[i];x=s._c;if((!x||x=='s_c'||(j>0&&x=='s_l'))&&(s.oun==un||(s.fs&&s.sa&&s.fs(s.oun,un)))){if(s.sa)s.sa(un);if(x=='s_c')return s}else s=0}}w.s_an='0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
w.s_sp=new Function("x","d","var a=new Array,i=0,j;if(x){if(x.split)a=x.split(d);else if(!d)for(i=0;i<x.length;i++)a[a.length]=x.substring(i,i+1);else while(i>=0){j=x.indexOf(d,i);a[a.length]=x.subst"
+"ring(i,j<0?x.length:j);i=j;if(i>=0)i+=d.length}}return a");
w.s_jn=new Function("a","d","var x='',i,j=a.length;if(a&&j>0){x=a[0];if(j>1){if(a.join)x=a.join(d);else for(i=1;i<j;i++)x+=d+a[i]}}return x");
w.s_rep=new Function("x","o","n","return s_jn(s_sp(x,o),n)");
w.s_d=new Function("x","var t='`^@$#',l=s_an,l2=new Object,x2,d,b=0,k,i=x.lastIndexOf('~~'),j,v,w;if(i>0){d=x.substring(0,i);x=x.substring(i+2);l=s_sp(l,'');for(i=0;i<62;i++)l2[l[i]]=i;t=s_sp(t,'');d"
+"=s_sp(d,'~');i=0;while(i<5){v=0;if(x.indexOf(t[i])>=0) {x2=s_sp(x,t[i]);for(j=1;j<x2.length;j++){k=x2[j].substring(0,1);w=t[i]+k;if(k!=' '){v=1;w=d[b+l2[k]]}x2[j]=w+x2[j].substring(1)}}if(v)x=s_jn("
+"x2,'');else{w=t[i]+' ';if(x.indexOf(w)>=0)x=s_rep(x,w,t[i]);i++;b+=62}}}return x");
w.s_fe=new Function("c","return s_rep(s_rep(s_rep(c,'\\\\','\\\\\\\\'),'\"','\\\\\"'),\"\\n\",\"\\\\n\")");
w.s_fa=new Function("f","var s=f.indexOf('(')+1,e=f.indexOf(')'),a='',c;while(s>=0&&s<e){c=f.substring(s,s+1);if(c==',')a+='\",\"';else if((\"\\n\\r\\t \").indexOf(c)<0)a+=c;s++}return a?'\"'+a+'\"':"
+"a");
w.s_ft=new Function("c","c+='';var s,e,o,a,d,q,f,h,x;s=c.indexOf('=function(');while(s>=0){s++;d=1;q='';x=0;f=c.substring(s);a=s_fa(f);e=o=c.indexOf('{',s);e++;while(d>0){h=c.substring(e,e+1);if(q){i"
+"f(h==q&&!x)q='';if(h=='\\\\')x=x?0:1;else x=0}else{if(h=='\"'||h==\"'\")q=h;if(h=='{')d++;if(h=='}')d--}if(d>0)e++}c=c.substring(0,s)+'new Function('+(a?a+',':'')+'\"'+s_fe(c.substring(o+1,e))+'\")"
+"'+c.substring(e+1);s=c.indexOf('=function(')}return c;");
c=s_d(c);if(e>0){a=parseInt(i=v.substring(e+5));if(a>3)a=parseFloat(i)}else if(m>0)a=parseFloat(u.substring(m+10));else a=parseFloat(v);if(a<5||v.indexOf('Opera')>=0||u.indexOf('Opera')>=0)c=s_ft(c);if(!s){s=new Object;if(!w.s_c_in){w.s_c_il=new Array;w.s_c_in=0}s._il=w.s_c_il;s._in=w.s_c_in;s._il[s._in]=s;w.s_c_in++;}s._c='s_c';(new Function("s","un","pg","ss",c))(s,un,pg,ss);return s}
function s_giqf(){var w=window,q=w.s_giq,i,t,s;if(q)for(i=0;i<q.length;i++){t=q[i];s=s_gi(t.oun);s.sa(t.un);s.setTagContainer(t.tagContainerName)}w.s_giq=0}s_giqf()
