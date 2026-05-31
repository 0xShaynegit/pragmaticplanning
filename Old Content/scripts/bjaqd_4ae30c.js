// source --> https://pragmaticplanning.co.nz/wp-content/plugins/form-maker/booster/assets/js/global.js?ver=1.0.0 
jQuery(function () {
  /* Change the CTA for pages with PG in it.*/
  if (jQuery(".bwg-container").length) {
    var html = '<div class="twb_admin_bar_menu_header">';
    html += '<img class="twb_menu_logo" src="' + twb.plugin_url + '/assets/images/logo_white.svg" />';
    html += '<div class="twb_menu_logo">Optimize Images</div>';
    html += '</div>';
    jQuery(".twb_admin_bar_menu").html(html).on("click", function () {
      window.open(twb.href, '_blank');
    });
    jQuery(".twb_admin_bar_menu_main").remove();
  }

  /* Is score check in progress.*/
  twb_inprogress = false;

  /* Check if any score check is in progress.*/
  jQuery(".twb-notoptimized").each(function () {
    if (jQuery(this).data("status") == 'inprogress') {
      /* Disable score check button.*/
      twb_disable_check();
    }
  });

  /* Add check score action to the button in page/posts list,
    if there is no inprogress action.*/
  jQuery(".twb-notoptimized .twb_check_score_button").on("click", function () {
    if (!twb_inprogress) {
      twb_check_score(this);
    }
  });

  /* Add a hover action to show dismiss tooltip.*/
  jQuery("th[id^='twb-speed-']").hover(function () {
      jQuery(this).find(".twb-dismiss-container").removeClass("twb-hidden");
    },
    function () {
      jQuery(this).find(".twb-dismiss-container").addClass("twb-hidden");
    });

  /* Add a hover action to show page score.*/
  jQuery(".twb-see-score").hover(function () {
      jQuery(this).parent().parent().find(".twb-score-container").removeClass("twb-hidden");
    },
    function () {
      jQuery(this).parent().parent().find(".twb-score-container").addClass("twb-hidden");
    });
  jQuery(".twb-score-container:not(.twb_admin_bar_menu_content .twb-score-container), .twb-score-disabled-container").hover(function () {
      jQuery(this).removeClass("twb-hidden");
    },
    function () {
      jQuery(this).addClass("twb-hidden");
    });

  /* Draw circle on given scores.*/
  jQuery(".twb-score-circle").each(function () {
    twb_draw_score_circle(this);
  });

  /* Show/hide Image optimizer menu content container */
  jQuery("#wp-admin-bar-twb_adminbar_info").mouseenter(function(){
    jQuery(".twb_admin_bar_menu_main .twb-score-container").removeClass("twb-hidden");
    jQuery(".twb_admin_bar_menu_main").removeClass("twb-hidden");
  }).mouseleave(function() {
    jQuery(".twb_admin_bar_menu_main").addClass("twb-hidden");
  });


  /* Draw circle on given scores.*/
  jQuery('.twb-score-circle').each(function () {
    twb_draw_score_circle(this);
  });

  if( jQuery(".twb_admin_bar_menu.twb_backend span").hasClass("twb_backend_optimizing_logo") ) {
    /* Run ajax every 30 seconds to check if score counted */
    twb_run_notif_check = setInterval( twb_run_notif_check, 30000 );
  }
});

/* Run ajax to check score counting status and show notification */
function twb_run_notif_check() {
  jQuery.ajax({
    type: "POST",
    url: twb.ajax_url,
    data: {
      action: "twb_notif_check",
      twb_nonce: twb.nonce,
    }
  }).success(function (results) {
    var result = jQuery.parseJSON(results);
    if (result.html != "") {
      /* Show notification popup and change menu icon and text from loading to Not optimised */
      if ( result.changeLogo == 1 ) {
        jQuery(".twb_admin_bar_menu_header span").addClass("twb_counted");
      }
      jQuery("#wp-admin-bar-twb_adminbar_info").append(result.html);
      jQuery(".twb_admin_bar_menu_content .twb-score-container").removeClass("twb-hidden");
      jQuery(".twb_admin_bar_menu_content .twb-score-container .twb-score-circle").each(function () {
        twb_draw_score_circle(this);
      });
      clearInterval(twb_run_notif_check);
    }
  }).error(function () {
      clearInterval(twb_run_notif_check);
  });

}

function twb_disable_check() {
  twb_inprogress = true;
  /* Add a hover action to show disabled notification.*/
  jQuery(".twb-notoptimized").hover(function () {
      jQuery(this).parent().find(".twb-score-disabled-container").removeClass("twb-hidden");
    },
    function () {
      jQuery(this).parent().find(".twb-score-disabled-container").addClass("twb-hidden");
    });
}
/**
 * Optimize the page.
 * @param that
 */
function twb_check_score(that) {
  var post_id = jQuery(that).data("post_id");
  var parent = jQuery(that).parent().parent().parent();
  //var parent = jQuery(that).closest(".twb-score-container").parent();
  /* Class add loading near admin bar menu */
  jQuery(".twb_admin_bar_menu.twb_frontend").addClass("twb_score_inprogress");

  /* If the action is not called with reload button.*/
  if (parent.find(".twb-optimized").hasClass("twb-hidden")) {
    /* Do not show loading in list.*/
    parent.find(".twb-optimizing").removeClass("twb-hidden");
  }
  else {
    /* Show loading on reload buttons.*/
    parent.find(".twb-score-overlay").removeClass("twb-hidden");
    parent.find(".twb-score-overlay div").removeClass("twb-reload").addClass("twb-loader");
  }

  parent.find(".twb-notoptimized").addClass("twb-hidden");

  /* In case of Elementor */
  if( parent.hasClass("twb_elementor_settings_content") ) {
    jQuery(".twb_elementor_control_title").text(twb.checking).removeClass("twb_not_optimized").prepend("<span class='twb_inprogress'></span>");
  }

  /* Disable score check button.*/
  twb_disable_check();

  jQuery.ajax({
    url: twb.ajax_url,
    type: "POST",
    dataType: 'json',
    data: {
      action: "twb_check_score",
      post_id: post_id,
      twb_nonce: twb.nonce
    },
    success: function (data) {
      if (data.error) {
        /* Show reload buttons on failure.*/
        parent.find(".twb-score-overlay").removeClass("twb-hidden");
        parent.find(".twb-score-overlay div").removeClass("twb-loader").addClass("twb-reload");
      }
      else {
        parent.find(".twb-score-overlay").addClass("twb-hidden");
        var desktop = parent.find(".twb-score-desktop").find(".twb-score-circle");
        desktop.data(
          {
            "score": data.desktop_score,
            "tti": data.desktop_tti,
          });
        twb_draw_score_circle(desktop);
        var mobile = parent.find(".twb-score-mobile").find(".twb-score-circle");
        mobile.data(
          {
            "score": data.mobile_score,
            "tti": data.mobile_tti,
          });
        twb_draw_score_circle(mobile);
      }
    },
    error: function (xhr, textStatus, errorThrown) {
      /* Show reload buttons on failure.*/
      parent.find(".twb-score-overlay").removeClass("twb-hidden");
      parent.find(".twb-score-overlay div").removeClass("twb-loader").addClass("twb-reload");
    },
    complete: function (xhr, textStatus) {
      /* Hide optimizing container, show See score container.*/
      parent.find(".twb-optimizing").addClass("twb-hidden");
      parent.find(".twb-optimized").removeClass("twb-hidden");

      jQuery("#wpadminbar .twb-optimized .twb-score-container").removeClass("twb-hidden");
      jQuery("#wpadminbar .twb_admin_bar_menu").removeClass("twb_score_inprogress");
      jQuery("#wpadminbar .twb_menu_logo").remove();
      jQuery("#wpadminbar .twb_not_optimized_logo").removeClass("twb-hidden");
      jQuery("#wpadminbar .twb_admin_bar_menu_header").addClass("twb_not_optimized");

      /* Remove disabled action.*/
      twb_inprogress = false;
      jQuery(".twb-notoptimized").hover(function () {
        jQuery(this).parent().find(".twb-score-disabled-container").addClass("twb-hidden");
      });

      /* In case of Elementor */
      if( parent.hasClass("twb_elementor_settings_content") ) {
        jQuery(".twb_elementor_control_title").text(twb.notoptimized).remove("span.twb_inprogress").addClass("twb_not_optimized");
      }
    }
  });
}

/**
 * Draw circle on given score.
 * @param that
 */
function twb_draw_score_circle(that) {
  var score = parseInt(jQuery(that).data('score'));
  var size = parseInt(jQuery(that).data('size'));
  var thickness = parseInt(jQuery(that).data('thickness'));
  var color = score <= 49 ? "rgb(253, 60, 49)" : (score >= 90 ? "rgb(12, 206, 107)" : "rgb(255, 164, 0)");
  jQuery(that).parent().find('.twb-load-time').html(jQuery(that).data('tti'));
  var _this = that;
  jQuery(_this).circleProgress({
    value: score / 100,
    size: size,
    startAngle: -Math.PI / 4 * 2,
    lineCap: 'round',
    emptyFill: "rgba(255, 255, 255, 0)",
    thickness: thickness,
    fill: {
      color: color
    }
  }).on('circle-animation-progress', function (event, progress) {
    var content = '<span class="twb-score0"></span>';
    if (score != 0) {
      content = Math.round(score * progress);
    }
    jQuery(that).find('.twb-score-circle-animated').html(content).css({"color": color});
    jQuery(that).find('canvas').html(Math.round(score * progress));
  });
}

/* Adding button in Elementor edit panel navigation view */
function twb_add_elementor_button() {
  window.elementor.modules.layouts.panel.pages.menu.Menu.addItem({
    name: twb.title,
    icon: "twb-element-menu-icon",
    title: twb.title,
    type: "page",
    callback: () => {
      try {
        window.$e.route("panel/page-settings/twb_optimize")
      } catch (e) {
        window.$e.route("panel/page-settings/settings"), window.$e.route("panel/page-settings/twb_optimize")
      }
    }
  }, "more")
}

jQuery(window).on("elementor:init", () => {
  window.elementor.on("panel:init", () => {
    setTimeout(twb_add_elementor_button)
  })
});
// source --> https://pragmaticplanning.co.nz/wp-content/plugins/google-analytics-for-wordpress/assets/js/frontend-gtag.min.js?ver=8.19 
;var MonsterInsights=function(){var e=[],i='',r=!1;this.setLastClicked=function(t,n,i){t=typeof t!=='undefined'?t:[];n=typeof n!=='undefined'?n:[];i=typeof i!=='undefined'?i:!1;e.valuesArray=t;e.fieldsArray=n};this.getLastClicked=function(){return e};this.setInternalAsOutboundCategory=function(e){i=e};this.getInternalAsOutboundCategory=function(){return i};this.sendEvent=function(e,t,n){y(e,t,n,[])};function d(){if(window.monsterinsights_debug_mode){return!0}
else{return!1}};function p(e,t,n){var l={};for(var i in e){if(!e.hasOwnProperty(i)){continue};if(t&&t.indexOf(i)===-1){continue};if(n&&n.indexOf(i)>-1){continue};l[i]=e[i]};return l};function b(e,t,n){if(!monsterinsights_frontend.v4_id||e!=='event'){return};var i=n.event_category||'',a=['event_name','event_category','event_label','value',],l=p(n,null,a);l.action=t;l.send_to=monsterinsights_frontend.v4_id;let hitType=i.replace('-','_');if(i.indexOf('outbound-link')!==-1){hitType='click'}
else if(i==='download'){hitType='file_download'};__gtagTracker(e,hitType,l)};function l(t,i,l,a){t=typeof t!=='undefined'?t:'event';i=typeof i!=='undefined'?i:'';a=typeof a!=='undefined'?a:[];l=typeof l!=='undefined'?l:{};b(t,i,l);e.valuesArray=a;e.fieldsArray=l;e.fieldsArray.event_action=i;e.tracked=!0;n('Tracked: '+a.type);n(e)};function y(t,i,l,a){t=typeof t!=='undefined'?t:'event';i=typeof i!=='undefined'?i:'';a=typeof a!=='undefined'?a:[];l=typeof l!=='undefined'?l:{};__gtagTracker(t,i,l);e.valuesArray=a;e.fieldsArray=l;e.fieldsArray.event_action=i;e.tracked=!0;n('Tracked: '+a.type);n(e)};function t(t){t=typeof t!=='undefined'?t:[];e.valuesArray=t;e.fieldsArray=[];e.tracked=!1;n('Not Tracked: '+t.exit);n(e)};function n(e){if(d()){console.dir(e)}};function o(e){return e.replace(/^\s+|\s+$/gm,'')};function c(){var n=0,e=document.domain,i=e.split('.'),t='_gd'+(new Date()).getTime();while(n<(i.length-1)&&document.cookie.indexOf(t+'='+t)==-1){e=i.slice(-1-(++n)).join('.');document.cookie=t+'='+t+';domain='+e+';'};document.cookie=t+'=;expires=Thu, 01 Jan 1970 00:00:01 GMT;domain='+e+';';return e};function u(e){e=e.toString();e=e.substring(0,(e.indexOf('#')==-1)?e.length:e.indexOf('#'));e=e.substring(0,(e.indexOf('?')==-1)?e.length:e.indexOf('?'));e=e.substring(e.lastIndexOf('/')+1,e.length);if(e.length>0&&e.indexOf('.')!==-1){e=e.substring(e.lastIndexOf('.')+1);return e}
else{return''}};function x(e){return e.which==1||e.which==2||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey};function h(){var e=[];if(typeof monsterinsights_frontend.download_extensions=='string'){e=monsterinsights_frontend.download_extensions.split(',')};return e};function g(){var e=[];if(typeof monsterinsights_frontend.inbound_paths=='string'){e=JSON.parse(monsterinsights_frontend.inbound_paths)};return e};function w(e){if(e.which==1){return'event.which=1'}
else if(e.which==2){return'event.which=2'}
else if(e.metaKey){return'metaKey'}
else if(e.ctrlKey){return'ctrlKey'}
else if(e.shiftKey){return'shiftKey'}
else if(e.altKey){return'altKey'}
else{return''}};function A(e){var f=h(),l=g(),t='unknown',d=e.href,m=u(e.href),v=c(),r=e.hostname,a=e.protocol,k=e.pathname;d=d.toString();var s,p,b=e.getAttribute('data-vars-ga-category');if(b){return b};if(d.match(/^javascript\:/i)){t='internal'}
else if(a&&a.length>0&&(o(a)=='tel'||o(a)=='tel:')){t='tel'}
else if(a&&a.length>0&&(o(a)=='mailto'||o(a)=='mailto:')){t='mailto'}
else if(r&&v&&r.length>0&&v.length>0&&!r.endsWith('.'+v)&&r!==v){t='external'}
else if(k&&JSON.stringify(l)!='{}'&&k.length>0){var y=l.length;for(var n=0;n<y;n++){if(l[n].path&&l[n].label&&l[n].path.length>0&&l[n].label.length>0&&k.startsWith(l[n].path)){t='internal-as-outbound';i='outbound-link-'+l[n].label;break}}}
else if(r&&window.monsterinsights_experimental_mode&&r.length>0&&document.domain.length>0&&r!==document.domain){t='cross-hostname'};if(m&&(t==='unknown'||'external'===t)&&f.length>0&&m.length>0){for(s=0,p=f.length;s<p;++s){if(f[s].length>0&&(d.endsWith(f[s])||f[s]==m)){t='download';break}}};if(t==='unknown'){t='internal'};return t};function T(e,t){var n=(e.target&&!e.target.match(/^_(self|parent|top)$/i))?e.target:!1;if(t.ctrlKey||t.shiftKey||t.metaKey||t.which==2){n='_blank'};return n};function v(e){if(e.getAttribute('data-vars-ga-label')&&e.getAttribute('data-vars-ga-label').replace(/\n/ig,'')){return e.getAttribute('data-vars-ga-label').replace(/\n/ig,'')}
else if(e.title&&e.title.replace(/\n/ig,'')){return e.title.replace(/\n/ig,'')}
else if(e.innerText&&e.innerText.replace(/\n/ig,'')){return e.innerText.replace(/\n/ig,'')}
else if(e.getAttribute('aria-label')&&e.getAttribute('aria-label').replace(/\n/ig,'')){return e.getAttribute('aria-label').replace(/\n/ig,'')}
else if(e.alt&&e.alt.replace(/\n/ig,'')){return e.alt.replace(/\n/ig,'')}
else if(e.textContent&&e.textContent.replace(/\n/ig,'')){return e.textContent.replace(/\n/ig,'')}
else{return undefined}};function O(e){var i=e.children,l=0,a,n;for(var t=0;t<i.length;t++){a=i[t];n=v(a);if(n){return n};if(l==99){return undefined};l++};return undefined};function m(n){var a=n.srcElement||n.target,e=[],k;e.el=a;e.click_type=w(n);if('undefined'===typeof __gtagTracker||!x(n)){e.exit='loaded';t(e);return}
while(a&&(typeof a.tagName=='undefined'||a.tagName.toLowerCase()!='a'||!a.href)){a=a.parentNode};if(a&&a.href&&!a.hasAttribute('xlink:href')){var m=a.href,M=u(a.href),S=h(),D=g(),L=monsterinsights_frontend.home_url,N=c(),o=A(a),K=T(a,n),b=a.getAttribute('data-vars-ga-action'),f=a.getAttribute('data-vars-ga-label');e.el=a;e.el_href=a.href;e.el_protocol=a.protocol;e.el_hostname=a.hostname;e.el_port=a.port;e.el_pathname=a.pathname;e.el_search=a.search;e.el_hash=a.hash;e.el_host=a.host;e.el_classes=a.getAttribute('class');e.el_id=a.id;e.debug_mode=d();e.download_extensions=S;e.inbound_paths=D;e.home_url=L;e.link=m;e.extension=M;e.type=o;e.target=K;e.title=v(a);if(!e.label&&!e.title){e.title=O(a)};if(o!=='internal'&&o!=='javascript'){var y=!1,p=function(){if(y){return};s();y=!0;if(a.attributes.download){var e=document.createElement('a');e.href=a.href;e.download=a.download;e.click()}
else{window.location.href=m}},E=function(){e.exit='external';t(e)},I=function(){e.exit='internal-as-outbound';t(e)},C=function(){e.exit='cross-hostname';t(e)};if(K||o=='mailto'||o=='tel'){if(o=='download'){k={event_category:'download',event_label:f||e.title,file_extension:e.extension,file_name:e.link.replace(/^.*\//g,''),link_text:f||e.title,link_url:m,link_domain:e.el_hostname,link_classes:e.el_classes,link_id:e.el_id,}}
else if(o=='tel'){k={event_category:'tel',event_label:f||e.title.replace('tel:',''),tel_number:m.replace('tel:',''),link_text:f||e.title,link_url:m,link_classes:e.el_classes,link_id:e.el_id,}}
else if(o=='mailto'){k={event_category:'mailto',event_label:f||e.title.replace('mailto:',''),email_address:m.replace('mailto:',''),link_text:f||e.title.replace('mailto:',''),link_url:m,link_classes:e.el_classes,link_id:e.el_id,}}
else if(o=='internal-as-outbound'){k={event_category:i,event_label:f||e.title,event_name:'click',is_affiliate_link:!0,affiliate_label:i.replace('outbound-link-',''),link_text:f||e.title,link_url:m,link_domain:e.el_hostname,link_classes:e.el_classes,link_id:e.el_id,outbound:!0,}}
else if(o=='external'){k={event_category:'outbound-link',event_label:f||e.title,is_affiliate_link:!1,link_text:f||e.title,link_url:m,link_domain:e.el_hostname,link_classes:e.el_classes,link_id:e.el_id,outbound:!0,}}
else if(o=='cross-hostname'){k={event_category:'cross-hostname',event_label:f||e.title,link_text:f||e.title,link_url:m,link_domain:e.el_hostname,link_classes:e.el_classes,link_id:e.el_id,}};if(k){l('event',b||m,k,e)}
else{if(o&&o!='internal'){k={event_category:o,event_label:f||e.title,link_text:f||e.title,link_url:m,link_domain:e.el_hostname,link_classes:e.el_classes,link_id:e.el_id,};l('event',b||m,k,e)}
else{e.exit='type';t(e)}}}
else{if(o!='cross-hostname'&&o!='external'&&o!='internal-as-outbound'){if(!n.defaultPrevented){if(n.preventDefault){n.preventDefault()}
else{n.returnValue=!1}}};if(o=='download'){k={event_category:'download',event_label:f||e.title,event_callback:p,file_extension:e.extension,file_name:e.link.replace(/^.*\//g,''),link_text:f||e.title,link_url:m,link_domain:e.el_hostname,link_classes:e.el_classes,link_id:e.el_id,};l('event',b||m,k,e)}
else if(o=='internal-as-outbound'){r=!0;window.onbeforeunload=function(t){if(!n.defaultPrevented){if(n.preventDefault){n.preventDefault()}
else{n.returnValue=!1}};k={event_category:i,event_label:f||e.title,event_callback:p,is_affiliate_link:!0,affiliate_label:i.replace('outbound-link-',''),link_text:f||e.title,link_url:m,link_domain:e.el_hostname,link_classes:e.el_classes,link_id:e.el_id,outbound:!0,};if(navigator.sendBeacon){k.transport='beacon'};l('event',b||m,k,e);setTimeout(p,1000)}}
else if(o=='external'){r=!0;window.onbeforeunload=function(t){k={event_category:'outbound-link',event_label:f||e.title,event_callback:p,is_affiliate_link:!1,link_text:f||e.title,link_url:m,link_domain:e.el_hostname,link_classes:e.el_classes,link_id:e.el_id,outbound:!0,};if(navigator.sendBeacon){k.transport='beacon'};l('event',b||m,k,e)}}
else if(o=='cross-hostname'){r=!0;window.onbeforeunload=function(t){if(!n.defaultPrevented){if(n.preventDefault){n.preventDefault()}
else{n.returnValue=!1}};k={event_category:'cross-hostname',event_label:f||e.title,event_callback:p,link_text:f||e.title,link_url:m,link_domain:e.el_hostname,link_classes:e.el_classes,link_id:e.el_id,};if(navigator.sendBeacon){k.transport='beacon'};l('event',b||m,k,e);setTimeout(p,1000)}}
else{if(o&&o!=='internal'){k={event_category:o,event_label:f||e.title,event_callback:p,link_text:f||e.title,link_url:m,link_domain:e.el_hostname,link_classes:e.el_classes,link_id:e.el_id,};l('event',b||m,k,e)}
else{e.exit='type';t(e)}};if(o!='external'&&o!='cross-hostname'&&o!='internal-as-outbound'){setTimeout(p,1000)}
else{if(o=='external'){setTimeout(E,1100)}
else if(o=='cross-hostname'){setTimeout(C,1100)}
else{setTimeout(I,1100)}};setTimeout(s,100)}}
else{s();e.exit='internal';t(e)}}
else{e.exit='notlink';t(e)}};var f=window.location.hash;function k(){if(monsterinsights_frontend.hash_tracking==='true'&&f!=window.location.hash&&monsterinsights_frontend.v4_id){f=window.location.hash;__gtagTracker('config',monsterinsights_frontend.v4_id,{page_path:location.pathname+location.search+location.hash,});n('Hash change to: '+location.pathname+location.search+location.hash)}
else{n('Hash change to (untracked): '+location.pathname+location.search+location.hash)}};function s(){if(r){window.onbeforeunload=null}};var a=window;if(a.addEventListener){a.addEventListener('load',function(){document.body.addEventListener('click',m,!1)},!1);window.addEventListener('hashchange',k,!1)}
else{if(a.attachEvent){a.attachEvent('onload',function(){document.body.attachEvent('onclick',m)});window.attachEvent('onhashchange',k)}};if(typeof String.prototype.endsWith!=='function'){String.prototype.endsWith=function(e){return this.indexOf(e,this.length-e.length)!==-1}};if(typeof String.prototype.startsWith!=='function'){String.prototype.startsWith=function(e){return this.indexOf(e)===0}};if(typeof Array.prototype.lastIndexOf!=='function'){Array.prototype.lastIndexOf=function(e){'use strict';if(this===void 0||this===null){throw new TypeError()};var t,n,l=Object(this),i=l.length>>>0;if(i===0){return-1};t=i-1;if(arguments.length>1){t=Number(arguments[1]);if(t!=t){t=0}
else if(t!=0&&t!=(1/0)&&t!=-(1/0)){t=(t>0||-1)*Math.floor(Math.abs(t))}};for(n=t>=0?Math.min(t,i-1):i-Math.abs(t);n>=0;n--){if(n in l&&l[n]===e){return n}};return-1}}},MonsterInsightsObject=new MonsterInsights();