/* Source and licensing information for the line(s) below can be found at http://www.programmableweb.com/sites/all/modules/custom/pw_ad/js/pw_adzerk.js. */
var p="http",d="static";if(document.location.protocol=="https:"){p+="s";d="engine"};var z=document.createElement("script");z.type="text/javascript";z.async=true;z.src=p+"://"+d+".adzerk.net/ados.js";var s=document.getElementsByTagName("script")[0];s.parentNode.insertBefore(z,s);var primary_audience=Drupal.settings.adzerkVarSet.primary_audience,primary_channel=Drupal.settings.adzerkVarSet.primary_channel,primary_category=Drupal.settings.adzerkVarSet.primary_category,secondary_category=Drupal.settings.adzerkVarSet.secondary_category,related_companies=Drupal.settings.adzerkVarSet.related_companies,related_languages=Drupal.settings.adzerkVarSet.related_languages,products=Drupal.settings.adzerkVarSet.products,homepage="homepage",ados=ados||{};ados.run=ados.run||[];ados.run.push(function(){if(window.innerWidth<=780);else ados_add_placement(9550,57566,"azk16406",4).setZone(63094).setProperties({company:[related_companies],language:[related_languages],audience:[primary_audience],channel:[primary_channel],products:[products]});if(window.innerWidth>=780);else ados_add_placement(9550,57566,"azk16407",23).setZone(63094).setProperties({company:[related_companies],language:[related_languages],audience:[primary_audience],channel:[primary_channel],products:[products]});if(window.innerWidth<=780);else ados_add_placement(9550,57566,"azk99048",4).setZone(63095).setProperties({company:[related_companies],language:[related_languages],audience:[primary_audience],channel:[primary_channel],products:[products]});if(window.innerWidth<=780);else ados_add_placement(9550,57566,"azk99049",23).setZone(63095).setProperties({company:[related_companies],language:[related_languages],audience:[primary_audience],channel:[primary_channel],products:[products]});ados_add_placement(9550,57566,"azk5965",[5,43]).setZone(63096).setProperties({company:[related_companies],language:[related_languages],audience:[primary_audience],channel:[primary_channel],products:[products]});ados_add_placement(9550,57566,"azk26869",983).setZone(125622).setProperties({company:[related_companies],language:[related_languages],audience:[primary_audience],channel:[primary_channel],products:[products]});ados_add_placement(9550,57566,"azk19861",5).setZone(63097).setProperties({company:[related_companies],language:[related_languages],audience:[primary_audience],channel:[primary_channel],products:[products]});if(jQuery('body.front').length){ados_setKeywords(homepage)}else ados_setKeywords(primary_category+", "+secondary_category);ados_load()});;
/* Source and licensing information for the above line(s) can be found at http://www.programmableweb.com/sites/all/modules/custom/pw_ad/js/pw_adzerk.js. */
/* Source and licensing information for the line(s) below can be found at http://www.programmableweb.com/sites/all/modules/custom/pw_ad/js/pw_adzerk_native_api_ads.js. */
(function($){Drupal.behaviors.pw_adzerk_native_api_ads={attach:function(context,settings){var pageCategory;if(Drupal.settings.common!==undefined&&Drupal.settings.common.pageCategory!==undefined){pageCategory=Drupal.settings.common.pageCategory}else if(Drupal.settings.search!==undefined&&Drupal.settings.search.pageCategory!==undefined)pageCategory=Drupal.settings.search.pageCategory;if(pageCategory===undefined)return;$.each($('.adzerk-native-ads',context),function(index,value){var element=$(this),zoneId=element.attr('zone');if(zoneId===undefined)return;var placements=[],divNames=[];$.each(element.find('.premium-ad'),function(index,value){var div=$(this),divName=div.attr('divname');divNames.push(divName);if(divName===undefined)return;placements.push({divName:divName,networkId:9550,siteId:57566,adTypes:[121],zoneIds:[parseInt(zoneId)]})});if(placements.length===0)return;var inputData={placements:placements,keywords:pageCategory},settings={data:JSON.stringify(inputData),dataType:'json',headers:{"content-type":'application/json'},type:'POST',success:function(data){var hasAds=false;for(var prop in data.decisions)if(data.decisions.hasOwnProperty(prop))if($.inArray(prop,divNames)>=0)if(data.decisions[prop.toString()]&&data.decisions[prop.toString()].contents.length){var innerHTML='';for(var i=0;i<data.decisions[prop.toString()].contents.length;i++)innerHTML+=data.decisions[prop.toString()].contents[i].body;if(innerHTML){element.find("[divname='"+prop.toString()+"']").append(innerHTML);hasAds=true;if(data.decisions[prop.toString()].impressionUrl!==undefined){console.log(data.decisions[prop.toString()].impressionUrl);$.get(data.decisions[prop.toString()].impressionUrl)}}}else if(!data.decisions[prop.toString()])element.find("[divname='"+prop.toString()+"']").remove();if(hasAds){var header=element.closest('.view-id-related_apis').find('.view-header').addClass('header-has-ad');element.addClass('container-has-ad')}}};$.ajax('//engine.adzerk.net/api/v2',settings)})}}})(jQuery);;
/* Source and licensing information for the above line(s) can be found at http://www.programmableweb.com/sites/all/modules/custom/pw_ad/js/pw_adzerk_native_api_ads.js. */
/* Source and licensing information for the line(s) below can be found at http://www.programmableweb.com/sites/all/themes/pw_bootstrap/js/bootstrap-tabcollapse.js. */
!function($){"use strict"
function accordionGroupTemplate(parentId,$heading){var tabSelector=$heading.attr('data-target'),active=$heading.parent().is('.active');if(!tabSelector){tabSelector=$heading.attr('href');tabSelector=tabSelector&&tabSelector.replace(/.*(?=#[^\s]*$)/,'')};var $tabContent=$(tabSelector),groupId=$tabContent.attr('id')+'-collapse';return'<div class="panel panel-default">   <div class="panel-heading">      <h4 class="panel-title">        <a class="'+(active?'':'collapsed')+'" data-toggle="collapse" data-parent="#'+parentId+'" href="#'+groupId+'">           '+$heading.html()+'        </a>      </h4>   </div>   <div id="'+groupId+'" class="panel-collapse collapse '+(active?'in':'')+'">       <div class="panel-body">           '+$tabContent.html()+'       </div>   </div></div>'}
function accordionTemplate(id,$headings,clazz){var accordionTemplate='<div class="panel-group '+clazz+'" id="'+id+'">';$headings.each(function(){var $heading=$(this);accordionTemplate+=accordionGroupTemplate(id,$heading)});accordionTemplate+='</div>';return accordionTemplate};$.fn.tabCollapse=function(options){return this.each(function(){var $this=$(this),$headings=$this.find('li:not(.dropdown) [data-toggle="tab"], li:not(.dropdown) [data-toggle="pill"]');options=$.extend({},$.fn.tabCollapse.defaults,options);var accordionHtml=accordionTemplate($this.attr('id')+'-accordion',$headings,options.accordionClass);$this.after(accordionHtml);$this.addClass(options.tabsClass);$this.siblings('.tab-content').addClass(options.tabsClass)})};$.fn.tabCollapse.defaults={accordionClass:'visible-xs',tabsClass:'hidden-xs'}}(window.jQuery);;
/* Source and licensing information for the above line(s) can be found at http://www.programmableweb.com/sites/all/themes/pw_bootstrap/js/bootstrap-tabcollapse.js. */
/* Source and licensing information for the line(s) below can be found at http://www.programmableweb.com/sites/all/themes/pw_bootstrap/js/pw_tabs.js. */
(function($){$('#myTab').tabCollapse();$('a[data-toggle="tab"]').live('click',function(){var aHref=$(this).attr('href');$('#myTab li').each(function(){$(this).removeClass('active')});$('#myTab a[data-toggle="tab"][href="'+aHref+'"]').parent('li').addClass('active')})})(jQuery);;
/* Source and licensing information for the above line(s) can be found at http://www.programmableweb.com/sites/all/themes/pw_bootstrap/js/pw_tabs.js. */
