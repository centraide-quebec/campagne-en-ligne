(function($) {
$.fn.formToWizard = function(options) {
options = $.extend({
submitButton: '',
title: "Step",
nextLabel: "Next",
prevLabel: "Back"
}, options);

var element = this;

var steps = $(element).find("fieldset");
var count = steps.size();
var submmitButtonName = "#" + options.submitButton;
$(submmitButtonName).hide();

// 2
$(element).before("<ul id='steps'></ul>");

steps.each(function(i) {
$(this).wrap("<div id='step" + i + "'></div>");
$(this).append("<p id='step" + i + "commands'></p>");

// 2
var name = $(this).find("legend").html();
$("#steps").append("<li id='stepDesc" + i + "'>"+options.title+" " + (i + 1) + "<span>" + name + "</span></li>");

if (i == 0) {
createNextButton(i);
selectStep(i);
}
else if (i == count - 1) {
$("#step" + i).hide();
createPrevButton(i);
}
else {
$("#step" + i).hide();
createPrevButton(i);
createNextButton(i);
}
});

function createPrevButton(i) {
var stepName = "step" + i;
$("#" + stepName + "commands").append("<a href='#' id='" + stepName + "Prev' class='prev'>"+options.prevLabel+"</a>");

$("#" + stepName + "Prev").bind("click", function(e) {
$("#" + stepName).hide();
$("#step" + (i - 1)).show();
$(submmitButtonName).hide();
selectStep(i - 1);
});
}

function createNextButton(i) {
var stepName = "step" + i;
$("#" + stepName + "commands").append("<a href='#' id='" + stepName + "Next' class='next'>"+options.nextLabel+"</a>");

$("#" + stepName + "Next").bind("click", function(e) {
$("#" + stepName).hide();
$("#step" + (i + 1)).show();
if (i + 2 == count)
$(submmitButtonName).show();
selectStep(i + 1);
});
}

function selectStep(i) {
$("#steps li").removeClass("current");
$("#stepDesc" + i).addClass("current");
}

}
})(jQuery);
(function(e){e.fn.extend({easyResponsiveTabs:function(t){var n={type:"default",width:"auto",fit:true};var t=e.extend(n,t);var r=t,i=r.type,s=r.fit,o=r.width,u="vertical",a="accordion";this.each(function(){function n(){if(i==u){t.addClass("resp-vtabs")}if(s==true){t.css({width:"100%",margin:"0px"})}if(i==a){t.addClass("resp-easy-accordion");t.find(".resp-tabs-list").css("display","none")}}var t=e(this);t.find("ul.resp-tabs-list li").addClass("resp-tab-item");t.css({display:"block",width:o});t.find(".resp-tabs-container > div").addClass("resp-tab-content");n();var r;t.find(".resp-tab-content").before("<h2 class='resp-accordion' role='tab'><span class='resp-arrow'></span></h2>");var f=0;t.find(".resp-accordion").each(function(){r=e(this);var n=t.find(".resp-tab-item:eq("+f+")").html();t.find(".resp-accordion:eq("+f+")").append(n);r.attr("aria-controls","tab_item-"+f);f++});var l=0,c;t.find(".resp-tab-item").each(function(){$tabItem=e(this);$tabItem.attr("aria-controls","tab_item-"+l);$tabItem.attr("role","tab");t.find(".resp-tab-item").first().addClass("resp-tab-active");t.find(".resp-accordion").first().addClass("resp-tab-active");t.find(".resp-tab-content").first().addClass("resp-tab-content-active").attr("style","display:block");var n=0;t.find(".resp-tab-content").each(function(){c=e(this);c.attr("aria-labelledby","tab_item-"+n);n++});l++});t.find("[role=tab]").each(function(){var n=e(this);n.click(function(){var r=n.attr("aria-controls");if(n.hasClass("resp-accordion")&&n.hasClass("resp-tab-active")){t.find(".resp-tab-content-active").slideUp("",function(){e(this).addClass("resp-accordion-closed")});n.removeClass("resp-tab-active");return false}if(!n.hasClass("resp-tab-active")&&n.hasClass("resp-accordion")){t.find(".resp-tab-active").removeClass("resp-tab-active");t.find(".resp-tab-content-active").slideUp().removeClass("resp-tab-content-active resp-accordion-closed");t.find("[aria-controls="+r+"]").addClass("resp-tab-active");t.find(".resp-tab-content[aria-labelledby = "+r+"]").slideDown().addClass("resp-tab-content-active")}else{t.find(".resp-tab-active").removeClass("resp-tab-active");t.find(".resp-tab-content-active").removeAttr("style").removeClass("resp-tab-content-active").removeClass("resp-accordion-closed");t.find("[aria-controls="+r+"]").addClass("resp-tab-active");t.find(".resp-tab-content[aria-labelledby = "+r+"]").addClass("resp-tab-content-active").attr("style","display:block")}});e(window).resize(function(){t.find(".resp-accordion-closed").removeAttr("style")})})})}})})(jQuery)
/*!
 * jQuery Form Plugin
 * version: 3.20 (20-NOV-2012)
 * @requires jQuery v1.5 or later
 *
 * Examples and documentation at: http://malsup.com/jquery/form/
 * Project repository: https://github.com/malsup/form
 * Dual licensed under the MIT and GPL licenses:
 *    http://malsup.github.com/mit-license.txt
 *    http://malsup.github.com/gpl-license-v2.txt
 */
/*global ActiveXObject alert */
;(function($) {
"use strict";

/*
    Usage Note:
    -----------
    Do not use both ajaxSubmit and ajaxForm on the same form.  These
    functions are mutually exclusive.  Use ajaxSubmit if you want
    to bind your own submit handler to the form.  For example,

    $(document).ready(function() {
        $('#myForm').on('submit', function(e) {
            e.preventDefault(); // <-- important
            $(this).ajaxSubmit({
                target: '#output'
            });
        });
    });

    Use ajaxForm when you want the plugin to manage all the event binding
    for you.  For example,

    $(document).ready(function() {
        $('#myForm').ajaxForm({
            target: '#output'
        });
    });

    You can also use ajaxForm with delegation (requires jQuery v1.7+), so the
    form does not have to exist when you invoke ajaxForm:

    $('#myForm').ajaxForm({
        delegation: true,
        target: '#output'
    });

    When using ajaxForm, the ajaxSubmit function will be invoked for you
    at the appropriate time.
*/

/**
 * Feature detection
 */
var feature = {};
feature.fileapi = $("<input type='file'/>").get(0).files !== undefined;
feature.formdata = window.FormData !== undefined;

/**
 * ajaxSubmit() provides a mechanism for immediately submitting
 * an HTML form using AJAX.
 */
$.fn.ajaxSubmit = function(options) {
    /*jshint scripturl:true */

    // fast fail if nothing selected (http://dev.jquery.com/ticket/2752)
    if (!this.length) {
        log('ajaxSubmit: skipping submit process - no element selected');
        return this;
    }

    var method, action, url, $form = this;

    if (typeof options == 'function') {
        options = { success: options };
    }

    method = this.attr('method');
    action = this.attr('action');
    url = (typeof action === 'string') ? $.trim(action) : '';
    url = url || window.location.href || '';
    if (url) {
        // clean url (don't include hash vaue)
        url = (url.match(/^([^#]+)/)||[])[1];
    }

    options = $.extend(true, {
        url:  url,
        success: $.ajaxSettings.success,
        type: method || 'GET',
        iframeSrc: /^https/i.test(window.location.href || '') ? 'javascript:false' : 'about:blank'
    }, options);

    // hook for manipulating the form data before it is extracted;
    // convenient for use with rich editors like tinyMCE or FCKEditor
    var veto = {};
    this.trigger('form-pre-serialize', [this, options, veto]);
    if (veto.veto) {
        log('ajaxSubmit: submit vetoed via form-pre-serialize trigger');
        return this;
    }

    // provide opportunity to alter form data before it is serialized
    if (options.beforeSerialize && options.beforeSerialize(this, options) === false) {
        log('ajaxSubmit: submit aborted via beforeSerialize callback');
        return this;
    }

    var traditional = options.traditional;
    if ( traditional === undefined ) {
        traditional = $.ajaxSettings.traditional;
    }

    var elements = [];
    var qx, a = this.formToArray(options.semantic, elements);
    if (options.data) {
        options.extraData = options.data;
        qx = $.param(options.data, traditional);
    }

    // give pre-submit callback an opportunity to abort the submit
    if (options.beforeSubmit && options.beforeSubmit(a, this, options) === false) {
        log('ajaxSubmit: submit aborted via beforeSubmit callback');
        return this;
    }

    // fire vetoable 'validate' event
    this.trigger('form-submit-validate', [a, this, options, veto]);
    if (veto.veto) {
        log('ajaxSubmit: submit vetoed via form-submit-validate trigger');
        return this;
    }

    var q = $.param(a, traditional);
    if (qx) {
        q = ( q ? (q + '&' + qx) : qx );
    }
    if (options.type.toUpperCase() == 'GET') {
        options.url += (options.url.indexOf('?') >= 0 ? '&' : '?') + q;
        options.data = null;  // data is null for 'get'
    }
    else {
        options.data = q; // data is the query string for 'post'
    }

    var callbacks = [];
    if (options.resetForm) {
        callbacks.push(function() { $form.resetForm(); });
    }
    if (options.clearForm) {
        callbacks.push(function() { $form.clearForm(options.includeHidden); });
    }

    // perform a load on the target only if dataType is not provided
    if (!options.dataType && options.target) {
        var oldSuccess = options.success || function(){};
        callbacks.push(function(data) {
            var fn = options.replaceTarget ? 'replaceWith' : 'html';
            $(options.target)[fn](data).each(oldSuccess, arguments);
        });
    }
    else if (options.success) {
        callbacks.push(options.success);
    }

    options.success = function(data, status, xhr) { // jQuery 1.4+ passes xhr as 3rd arg
        var context = options.context || this ;    // jQuery 1.4+ supports scope context
        for (var i=0, max=callbacks.length; i < max; i++) {
            callbacks[i].apply(context, [data, status, xhr || $form, $form]);
        }
    };

    // are there files to upload?

    // [value] (issue #113), also see comment:
    // https://github.com/malsup/form/commit/588306aedba1de01388032d5f42a60159eea9228#commitcomment-2180219
    var fileInputs = $('input[type=file]:enabled[value!=""]', this);

    var hasFileInputs = fileInputs.length > 0;
    var mp = 'multipart/form-data';
    var multipart = ($form.attr('enctype') == mp || $form.attr('encoding') == mp);

    var fileAPI = feature.fileapi && feature.formdata;
    log("fileAPI :" + fileAPI);
    var shouldUseFrame = (hasFileInputs || multipart) && !fileAPI;

    var jqxhr;

    // options.iframe allows user to force iframe mode
    // 06-NOV-09: now defaulting to iframe mode if file input is detected
    if (options.iframe !== false && (options.iframe || shouldUseFrame)) {
        // hack to fix Safari hang (thanks to Tim Molendijk for this)
        // see:  http://groups.google.com/group/jquery-dev/browse_thread/thread/36395b7ab510dd5d
        if (options.closeKeepAlive) {
            $.get(options.closeKeepAlive, function() {
                jqxhr = fileUploadIframe(a);
            });
        }
        else {
            jqxhr = fileUploadIframe(a);
        }
    }
    else if ((hasFileInputs || multipart) && fileAPI) {
        jqxhr = fileUploadXhr(a);
    }
    else {
        jqxhr = $.ajax(options);
    }

    $form.removeData('jqxhr').data('jqxhr', jqxhr);

    // clear element array
    for (var k=0; k < elements.length; k++)
        elements[k] = null;

    // fire 'notify' event
    this.trigger('form-submit-notify', [this, options]);
    return this;

    // utility fn for deep serialization
    function deepSerialize(extraData){
        var serialized = $.param(extraData).split('&');
        var len = serialized.length;
        var result = {};
        var i, part;
        for (i=0; i < len; i++) {
            part = serialized[i].split('=');
            result[decodeURIComponent(part[0])] = decodeURIComponent(part[1]);
        }
        return result;
    }

     // XMLHttpRequest Level 2 file uploads (big hat tip to francois2metz)
    function fileUploadXhr(a) {
        var formdata = new FormData();

        for (var i=0; i < a.length; i++) {
            formdata.append(a[i].name, a[i].value);
        }

        if (options.extraData) {
            var serializedData = deepSerialize(options.extraData);
            for (var p in serializedData)
                if (serializedData.hasOwnProperty(p))
                    formdata.append(p, serializedData[p]);
        }

        options.data = null;

        var s = $.extend(true, {}, $.ajaxSettings, options, {
            contentType: false,
            processData: false,
            cache: false,
            type: method || 'POST'
        });

        if (options.uploadProgress) {
            // workaround because jqXHR does not expose upload property
            s.xhr = function() {
                var xhr = jQuery.ajaxSettings.xhr();
                if (xhr.upload) {
                    xhr.upload.onprogress = function(event) {
                        var percent = 0;
                        var position = event.loaded || event.position; /*event.position is deprecated*/
                        var total = event.total;
                        if (event.lengthComputable) {
                            percent = Math.ceil(position / total * 100);
                        }
                        options.uploadProgress(event, position, total, percent);
                    };
                }
                return xhr;
            };
        }

        s.data = null;
            var beforeSend = s.beforeSend;
            s.beforeSend = function(xhr, o) {
                o.data = formdata;
                if(beforeSend)
                    beforeSend.call(this, xhr, o);
        };
        return $.ajax(s);
    }

    // private function for handling file uploads (hat tip to YAHOO!)
    function fileUploadIframe(a) {
        var form = $form[0], el, i, s, g, id, $io, io, xhr, sub, n, timedOut, timeoutHandle;
        var useProp = !!$.fn.prop;
        var deferred = $.Deferred();

        if ($('[name=submit],[id=submit]', form).length) {
            // if there is an input with a name or id of 'submit' then we won't be
            // able to invoke the submit fn on the form (at least not x-browser)
            alert('Error: Form elements must not have name or id of "submit".');
            deferred.reject();
            return deferred;
        }

        if (a) {
            // ensure that every serialized input is still enabled
            for (i=0; i < elements.length; i++) {
                el = $(elements[i]);
                if ( useProp )
                    el.prop('disabled', false);
                else
                    el.removeAttr('disabled');
            }
        }

        s = $.extend(true, {}, $.ajaxSettings, options);
        s.context = s.context || s;
        id = 'jqFormIO' + (new Date().getTime());
        if (s.iframeTarget) {
            $io = $(s.iframeTarget);
            n = $io.attr('name');
            if (!n)
                 $io.attr('name', id);
            else
                id = n;
        }
        else {
            $io = $('<iframe name="' + id + '" src="'+ s.iframeSrc +'" />');
            $io.css({ position: 'absolute', top: '-1000px', left: '-1000px' });
        }
        io = $io[0];


        xhr = { // mock object
            aborted: 0,
            responseText: null,
            responseXML: null,
            status: 0,
            statusText: 'n/a',
            getAllResponseHeaders: function() {},
            getResponseHeader: function() {},
            setRequestHeader: function() {},
            abort: function(status) {
                var e = (status === 'timeout' ? 'timeout' : 'aborted');
                log('aborting upload... ' + e);
                this.aborted = 1;
                // #214
                if (io.contentWindow.document.execCommand) {
                    try { // #214
                        io.contentWindow.document.execCommand('Stop');
                    } catch(ignore) {}
                }
                $io.attr('src', s.iframeSrc); // abort op in progress
                xhr.error = e;
                if (s.error)
                    s.error.call(s.context, xhr, e, status);
                if (g)
                    $.event.trigger("ajaxError", [xhr, s, e]);
                if (s.complete)
                    s.complete.call(s.context, xhr, e);
            }
        };

        g = s.global;
        // trigger ajax global events so that activity/block indicators work like normal
        if (g && 0 === $.active++) {
            $.event.trigger("ajaxStart");
        }
        if (g) {
            $.event.trigger("ajaxSend", [xhr, s]);
        }

        if (s.beforeSend && s.beforeSend.call(s.context, xhr, s) === false) {
            if (s.global) {
                $.active--;
            }
            deferred.reject();
            return deferred;
        }
        if (xhr.aborted) {
            deferred.reject();
            return deferred;
        }

        // add submitting element to data if we know it
        sub = form.clk;
        if (sub) {
            n = sub.name;
            if (n && !sub.disabled) {
                s.extraData = s.extraData || {};
                s.extraData[n] = sub.value;
                if (sub.type == "image") {
                    s.extraData[n+'.x'] = form.clk_x;
                    s.extraData[n+'.y'] = form.clk_y;
                }
            }
        }

        var CLIENT_TIMEOUT_ABORT = 1;
        var SERVER_ABORT = 2;

        function getDoc(frame) {
            var doc = frame.contentWindow ? frame.contentWindow.document : frame.contentDocument ? frame.contentDocument : frame.document;
            return doc;
        }

        // Rails CSRF hack (thanks to Yvan Barthelemy)
        var csrf_token = $('meta[name=csrf-token]').attr('content');
        var csrf_param = $('meta[name=csrf-param]').attr('content');
        if (csrf_param && csrf_token) {
            s.extraData = s.extraData || {};
            s.extraData[csrf_param] = csrf_token;
        }

        // take a breath so that pending repaints get some cpu time before the upload starts
        function doSubmit() {
            // make sure form attrs are set
            var t = $form.attr('target'), a = $form.attr('action');

            // update form attrs in IE friendly way
            form.setAttribute('target',id);
            if (!method) {
                form.setAttribute('method', 'POST');
            }
            if (a != s.url) {
                form.setAttribute('action', s.url);
            }

            // ie borks in some cases when setting encoding
            if (! s.skipEncodingOverride && (!method || /post/i.test(method))) {
                $form.attr({
                    encoding: 'multipart/form-data',
                    enctype:  'multipart/form-data'
                });
            }

            // support timout
            if (s.timeout) {
                timeoutHandle = setTimeout(function() { timedOut = true; cb(CLIENT_TIMEOUT_ABORT); }, s.timeout);
            }

            // look for server aborts
            function checkState() {
                try {
                    var state = getDoc(io).readyState;
                    log('state = ' + state);
                    if (state && state.toLowerCase() == 'uninitialized')
                        setTimeout(checkState,50);
                }
                catch(e) {
                    log('Server abort: ' , e, ' (', e.name, ')');
                    cb(SERVER_ABORT);
                    if (timeoutHandle)
                        clearTimeout(timeoutHandle);
                    timeoutHandle = undefined;
                }
            }

            // add "extra" data to form if provided in options
            var extraInputs = [];
            try {
                if (s.extraData) {
                    for (var n in s.extraData) {
                        if (s.extraData.hasOwnProperty(n)) {
                           // if using the $.param format that allows for multiple values with the same name
                           if($.isPlainObject(s.extraData[n]) && s.extraData[n].hasOwnProperty('name') && s.extraData[n].hasOwnProperty('value')) {
                               extraInputs.push(
                               $('<input type="hidden" name="'+s.extraData[n].name+'">').attr('value',s.extraData[n].value)
                                   .appendTo(form)[0]);
                           } else {
                               extraInputs.push(
                               $('<input type="hidden" name="'+n+'">').attr('value',s.extraData[n])
                                   .appendTo(form)[0]);
                           }
                        }
                    }
                }

                if (!s.iframeTarget) {
                    // add iframe to doc and submit the form
                    $io.appendTo('body');
                    if (io.attachEvent)
                        io.attachEvent('onload', cb);
                    else
                        io.addEventListener('load', cb, false);
                }
                setTimeout(checkState,15);
                form.submit();
            }
            finally {
                // reset attrs and remove "extra" input elements
                form.setAttribute('action',a);
                if(t) {
                    form.setAttribute('target', t);
                } else {
                    $form.removeAttr('target');
                }
                $(extraInputs).remove();
            }
        }

        if (s.forceSync) {
            doSubmit();
        }
        else {
            setTimeout(doSubmit, 10); // this lets dom updates render
        }

        var data, doc, domCheckCount = 50, callbackProcessed;

        function cb(e) {
            if (xhr.aborted || callbackProcessed) {
                return;
            }
            try {
                doc = getDoc(io);
            }
            catch(ex) {
                log('cannot access response document: ', ex);
                e = SERVER_ABORT;
            }
            if (e === CLIENT_TIMEOUT_ABORT && xhr) {
                xhr.abort('timeout');
                deferred.reject(xhr, 'timeout');
                return;
            }
            else if (e == SERVER_ABORT && xhr) {
                xhr.abort('server abort');
                deferred.reject(xhr, 'error', 'server abort');
                return;
            }

            if (!doc || doc.location.href == s.iframeSrc) {
                // response not received yet
                if (!timedOut)
                    return;
            }
            if (io.detachEvent)
                io.detachEvent('onload', cb);
            else
                io.removeEventListener('load', cb, false);

            var status = 'success', errMsg;
            try {
                if (timedOut) {
                    throw 'timeout';
                }

                var isXml = s.dataType == 'xml' || doc.XMLDocument || $.isXMLDoc(doc);
                log('isXml='+isXml);
                if (!isXml && window.opera && (doc.body === null || !doc.body.innerHTML)) {
                    if (--domCheckCount) {
                        // in some browsers (Opera) the iframe DOM is not always traversable when
                        // the onload callback fires, so we loop a bit to accommodate
                        log('requeing onLoad callback, DOM not available');
                        setTimeout(cb, 250);
                        return;
                    }
                    // let this fall through because server response could be an empty document
                    //log('Could not access iframe DOM after mutiple tries.');
                    //throw 'DOMException: not available';
                }

                //log('response detected');
                var docRoot = doc.body ? doc.body : doc.documentElement;
                xhr.responseText = docRoot ? docRoot.innerHTML : null;
                xhr.responseXML = doc.XMLDocument ? doc.XMLDocument : doc;
                if (isXml)
                    s.dataType = 'xml';
                xhr.getResponseHeader = function(header){
                    var headers = {'content-type': s.dataType};
                    return headers[header];
                };
                // support for XHR 'status' & 'statusText' emulation :
                if (docRoot) {
                    xhr.status = Number( docRoot.getAttribute('status') ) || xhr.status;
                    xhr.statusText = docRoot.getAttribute('statusText') || xhr.statusText;
                }

                var dt = (s.dataType || '').toLowerCase();
                var scr = /(json|script|text)/.test(dt);
                if (scr || s.textarea) {
                    // see if user embedded response in textarea
                    var ta = doc.getElementsByTagName('textarea')[0];
                    if (ta) {
                        xhr.responseText = ta.value;
                        // support for XHR 'status' & 'statusText' emulation :
                        xhr.status = Number( ta.getAttribute('status') ) || xhr.status;
                        xhr.statusText = ta.getAttribute('statusText') || xhr.statusText;
                    }
                    else if (scr) {
                        // account for browsers injecting pre around json response
                        var pre = doc.getElementsByTagName('pre')[0];
                        var b = doc.getElementsByTagName('body')[0];
                        if (pre) {
                            xhr.responseText = pre.textContent ? pre.textContent : pre.innerText;
                        }
                        else if (b) {
                            xhr.responseText = b.textContent ? b.textContent : b.innerText;
                        }
                    }
                }
                else if (dt == 'xml' && !xhr.responseXML && xhr.responseText) {
                    xhr.responseXML = toXml(xhr.responseText);
                }

                try {
                    data = httpData(xhr, dt, s);
                }
                catch (e) {
                    status = 'parsererror';
                    xhr.error = errMsg = (e || status);
                }
            }
            catch (e) {
                log('error caught: ',e);
                status = 'error';
                xhr.error = errMsg = (e || status);
            }

            if (xhr.aborted) {
                log('upload aborted');
                status = null;
            }

            if (xhr.status) { // we've set xhr.status
                status = (xhr.status >= 200 && xhr.status < 300 || xhr.status === 304) ? 'success' : 'error';
            }

            // ordering of these callbacks/triggers is odd, but that's how $.ajax does it
            if (status === 'success') {
                if (s.success)
                    s.success.call(s.context, data, 'success', xhr);
                deferred.resolve(xhr.responseText, 'success', xhr);
                if (g)
                    $.event.trigger("ajaxSuccess", [xhr, s]);
            }
            else if (status) {
                if (errMsg === undefined)
                    errMsg = xhr.statusText;
                if (s.error)
                    s.error.call(s.context, xhr, status, errMsg);
                deferred.reject(xhr, 'error', errMsg);
                if (g)
                    $.event.trigger("ajaxError", [xhr, s, errMsg]);
            }

            if (g)
                $.event.trigger("ajaxComplete", [xhr, s]);

            if (g && ! --$.active) {
                $.event.trigger("ajaxStop");
            }

            if (s.complete)
                s.complete.call(s.context, xhr, status);

            callbackProcessed = true;
            if (s.timeout)
                clearTimeout(timeoutHandle);

            // clean up
            setTimeout(function() {
                if (!s.iframeTarget)
                    $io.remove();
                xhr.responseXML = null;
            }, 100);
        }

        var toXml = $.parseXML || function(s, doc) { // use parseXML if available (jQuery 1.5+)
            if (window.ActiveXObject) {
                doc = new ActiveXObject('Microsoft.XMLDOM');
                doc.async = 'false';
                doc.loadXML(s);
            }
            else {
                doc = (new DOMParser()).parseFromString(s, 'text/xml');
            }
            return (doc && doc.documentElement && doc.documentElement.nodeName != 'parsererror') ? doc : null;
        };
        var parseJSON = $.parseJSON || function(s) {
            /*jslint evil:true */
            return window['eval']('(' + s + ')');
        };

        var httpData = function( xhr, type, s ) { // mostly lifted from jq1.4.4

            var ct = xhr.getResponseHeader('content-type') || '',
                xml = type === 'xml' || !type && ct.indexOf('xml') >= 0,
                data = xml ? xhr.responseXML : xhr.responseText;

            if (xml && data.documentElement.nodeName === 'parsererror') {
                if ($.error)
                    $.error('parsererror');
            }
            if (s && s.dataFilter) {
                data = s.dataFilter(data, type);
            }
            if (typeof data === 'string') {
                if (type === 'json' || !type && ct.indexOf('json') >= 0) {
                    data = parseJSON(data);
                } else if (type === "script" || !type && ct.indexOf("javascript") >= 0) {
                    $.globalEval(data);
                }
            }
            return data;
        };

        return deferred;
    }
};

/**
 * ajaxForm() provides a mechanism for fully automating form submission.
 *
 * The advantages of using this method instead of ajaxSubmit() are:
 *
 * 1: This method will include coordinates for <input type="image" /> elements (if the element
 *    is used to submit the form).
 * 2. This method will include the submit element's name/value data (for the element that was
 *    used to submit the form).
 * 3. This method binds the submit() method to the form for you.
 *
 * The options argument for ajaxForm works exactly as it does for ajaxSubmit.  ajaxForm merely
 * passes the options argument along after properly binding events for submit elements and
 * the form itself.
 */
$.fn.ajaxForm = function(options) {
    options = options || {};
    options.delegation = options.delegation && $.isFunction($.fn.on);

    // in jQuery 1.3+ we can fix mistakes with the ready state
    if (!options.delegation && this.length === 0) {
        var o = { s: this.selector, c: this.context };
        if (!$.isReady && o.s) {
            log('DOM not ready, queuing ajaxForm');
            $(function() {
                $(o.s,o.c).ajaxForm(options);
            });
            return this;
        }
        // is your DOM ready?  http://docs.jquery.com/Tutorials:Introducing_$(document).ready()
        log('terminating; zero elements found by selector' + ($.isReady ? '' : ' (DOM not ready)'));
        return this;
    }

    if ( options.delegation ) {
        $(document)
            .off('submit.form-plugin', this.selector, doAjaxSubmit)
            .off('click.form-plugin', this.selector, captureSubmittingElement)
            .on('submit.form-plugin', this.selector, options, doAjaxSubmit)
            .on('click.form-plugin', this.selector, options, captureSubmittingElement);
        return this;
    }

    return this.ajaxFormUnbind()
        .bind('submit.form-plugin', options, doAjaxSubmit)
        .bind('click.form-plugin', options, captureSubmittingElement);
};

// private event handlers
function doAjaxSubmit(e) {
    /*jshint validthis:true */
    var options = e.data;
    if (!e.isDefaultPrevented()) { // if event has been canceled, don't proceed
        e.preventDefault();
        $(this).ajaxSubmit(options);
    }
}

function captureSubmittingElement(e) {
    /*jshint validthis:true */
    var target = e.target;
    var $el = $(target);
    if (!($el.is("[type=submit],[type=image]"))) {
        // is this a child element of the submit el?  (ex: a span within a button)
        var t = $el.closest('[type=submit]');
        if (t.length === 0) {
            return;
        }
        target = t[0];
    }
    var form = this;
    form.clk = target;
    if (target.type == 'image') {
        if (e.offsetX !== undefined) {
            form.clk_x = e.offsetX;
            form.clk_y = e.offsetY;
        } else if (typeof $.fn.offset == 'function') {
            var offset = $el.offset();
            form.clk_x = e.pageX - offset.left;
            form.clk_y = e.pageY - offset.top;
        } else {
            form.clk_x = e.pageX - target.offsetLeft;
            form.clk_y = e.pageY - target.offsetTop;
        }
    }
    // clear form vars
    setTimeout(function() { form.clk = form.clk_x = form.clk_y = null; }, 100);
}


// ajaxFormUnbind unbinds the event handlers that were bound by ajaxForm
$.fn.ajaxFormUnbind = function() {
    return this.unbind('submit.form-plugin click.form-plugin');
};

/**
 * formToArray() gathers form element data into an array of objects that can
 * be passed to any of the following ajax functions: $.get, $.post, or load.
 * Each object in the array has both a 'name' and 'value' property.  An example of
 * an array for a simple login form might be:
 *
 * [ { name: 'username', value: 'jresig' }, { name: 'password', value: 'secret' } ]
 *
 * It is this array that is passed to pre-submit callback functions provided to the
 * ajaxSubmit() and ajaxForm() methods.
 */
$.fn.formToArray = function(semantic, elements) {
    var a = [];
    if (this.length === 0) {
        return a;
    }

    var form = this[0];
    var els = semantic ? form.getElementsByTagName('*') : form.elements;
    if (!els) {
        return a;
    }

    var i,j,n,v,el,max,jmax;
    for(i=0, max=els.length; i < max; i++) {
        el = els[i];
        n = el.name;
        if (!n) {
            continue;
        }

        if (semantic && form.clk && el.type == "image") {
            // handle image inputs on the fly when semantic == true
            if(!el.disabled && form.clk == el) {
                a.push({name: n, value: $(el).val(), type: el.type });
                a.push({name: n+'.x', value: form.clk_x}, {name: n+'.y', value: form.clk_y});
            }
            continue;
        }

        v = $.fieldValue(el, true);
        if (v && v.constructor == Array) {
            if (elements)
                elements.push(el);
            for(j=0, jmax=v.length; j < jmax; j++) {
                a.push({name: n, value: v[j]});
            }
        }
        else if (feature.fileapi && el.type == 'file' && !el.disabled) {
            if (elements)
                elements.push(el);
            var files = el.files;
            if (files.length) {
                for (j=0; j < files.length; j++) {
                    a.push({name: n, value: files[j], type: el.type});
                }
            }
            else {
                // #180
                a.push({ name: n, value: '', type: el.type });
            }
        }
        else if (v !== null && typeof v != 'undefined') {
            if (elements)
                elements.push(el);
            a.push({name: n, value: v, type: el.type, required: el.required});
        }
    }

    if (!semantic && form.clk) {
        // input type=='image' are not found in elements array! handle it here
        var $input = $(form.clk), input = $input[0];
        n = input.name;
        if (n && !input.disabled && input.type == 'image') {
            a.push({name: n, value: $input.val()});
            a.push({name: n+'.x', value: form.clk_x}, {name: n+'.y', value: form.clk_y});
        }
    }
    return a;
};

/**
 * Serializes form data into a 'submittable' string. This method will return a string
 * in the format: name1=value1&amp;name2=value2
 */
$.fn.formSerialize = function(semantic) {
    //hand off to jQuery.param for proper encoding
    return $.param(this.formToArray(semantic));
};

/**
 * Serializes all field elements in the jQuery object into a query string.
 * This method will return a string in the format: name1=value1&amp;name2=value2
 */
$.fn.fieldSerialize = function(successful) {
    var a = [];
    this.each(function() {
        var n = this.name;
        if (!n) {
            return;
        }
        var v = $.fieldValue(this, successful);
        if (v && v.constructor == Array) {
            for (var i=0,max=v.length; i < max; i++) {
                a.push({name: n, value: v[i]});
            }
        }
        else if (v !== null && typeof v != 'undefined') {
            a.push({name: this.name, value: v});
        }
    });
    //hand off to jQuery.param for proper encoding
    return $.param(a);
};

/**
 * Returns the value(s) of the element in the matched set.  For example, consider the following form:
 *
 *  <form><fieldset>
 *      <input name="A" type="text" />
 *      <input name="A" type="text" />
 *      <input name="B" type="checkbox" value="B1" />
 *      <input name="B" type="checkbox" value="B2"/>
 *      <input name="C" type="radio" value="C1" />
 *      <input name="C" type="radio" value="C2" />
 *  </fieldset></form>
 *
 *  var v = $('input[type=text]').fieldValue();
 *  // if no values are entered into the text inputs
 *  v == ['','']
 *  // if values entered into the text inputs are 'foo' and 'bar'
 *  v == ['foo','bar']
 *
 *  var v = $('input[type=checkbox]').fieldValue();
 *  // if neither checkbox is checked
 *  v === undefined
 *  // if both checkboxes are checked
 *  v == ['B1', 'B2']
 *
 *  var v = $('input[type=radio]').fieldValue();
 *  // if neither radio is checked
 *  v === undefined
 *  // if first radio is checked
 *  v == ['C1']
 *
 * The successful argument controls whether or not the field element must be 'successful'
 * (per http://www.w3.org/TR/html4/interact/forms.html#successful-controls).
 * The default value of the successful argument is true.  If this value is false the value(s)
 * for each element is returned.
 *
 * Note: This method *always* returns an array.  If no valid value can be determined the
 *    array will be empty, otherwise it will contain one or more values.
 */
$.fn.fieldValue = function(successful) {
    for (var val=[], i=0, max=this.length; i < max; i++) {
        var el = this[i];
        var v = $.fieldValue(el, successful);
        if (v === null || typeof v == 'undefined' || (v.constructor == Array && !v.length)) {
            continue;
        }
        if (v.constructor == Array)
            $.merge(val, v);
        else
            val.push(v);
    }
    return val;
};

/**
 * Returns the value of the field element.
 */
$.fieldValue = function(el, successful) {
    var n = el.name, t = el.type, tag = el.tagName.toLowerCase();
    if (successful === undefined) {
        successful = true;
    }

    if (successful && (!n || el.disabled || t == 'reset' || t == 'button' ||
        (t == 'checkbox' || t == 'radio') && !el.checked ||
        (t == 'submit' || t == 'image') && el.form && el.form.clk != el ||
        tag == 'select' && el.selectedIndex == -1)) {
            return null;
    }

    if (tag == 'select') {
        var index = el.selectedIndex;
        if (index < 0) {
            return null;
        }
        var a = [], ops = el.options;
        var one = (t == 'select-one');
        var max = (one ? index+1 : ops.length);
        for(var i=(one ? index : 0); i < max; i++) {
            var op = ops[i];
            if (op.selected) {
                var v = op.value;
                if (!v) { // extra pain for IE...
                    v = (op.attributes && op.attributes['value'] && !(op.attributes['value'].specified)) ? op.text : op.value;
                }
                if (one) {
                    return v;
                }
                a.push(v);
            }
        }
        return a;
    }
    return $(el).val();
};

/**
 * Clears the form data.  Takes the following actions on the form's input fields:
 *  - input text fields will have their 'value' property set to the empty string
 *  - select elements will have their 'selectedIndex' property set to -1
 *  - checkbox and radio inputs will have their 'checked' property set to false
 *  - inputs of type submit, button, reset, and hidden will *not* be effected
 *  - button elements will *not* be effected
 */
$.fn.clearForm = function(includeHidden) {
    return this.each(function() {
        $('input,select,textarea', this).clearFields(includeHidden);
    });
};

/**
 * Clears the selected form elements.
 */
$.fn.clearFields = $.fn.clearInputs = function(includeHidden) {
    var re = /^(?:color|date|datetime|email|month|number|password|range|search|tel|text|time|url|week)$/i; // 'hidden' is not in this list
    return this.each(function() {
        var t = this.type, tag = this.tagName.toLowerCase();
        if (re.test(t) || tag == 'textarea') {
            this.value = '';
        }
        else if (t == 'checkbox' || t == 'radio') {
            this.checked = false;
        }
        else if (tag == 'select') {
            this.selectedIndex = -1;
        }
        else if (includeHidden) {
            // includeHidden can be the value true, or it can be a selector string
            // indicating a special test; for example:
            //  $('#myForm').clearForm('.special:hidden')
            // the above would clean hidden inputs that have the class of 'special'
            if ( (includeHidden === true && /hidden/.test(t)) ||
                 (typeof includeHidden == 'string' && $(this).is(includeHidden)) )
                this.value = '';
        }
    });
};

/**
 * Resets the form data.  Causes all form elements to be reset to their original value.
 */
$.fn.resetForm = function() {
    return this.each(function() {
        // guard against an input with the name of 'reset'
        // note that IE reports the reset function as an 'object'
        if (typeof this.reset == 'function' || (typeof this.reset == 'object' && !this.reset.nodeType)) {
            this.reset();
        }
    });
};

/**
 * Enables or disables any matching elements.
 */
$.fn.enable = function(b) {
    if (b === undefined) {
        b = true;
    }
    return this.each(function() {
        this.disabled = !b;
    });
};

/**
 * Checks/unchecks any matching checkboxes or radio buttons and
 * selects/deselects and matching option elements.
 */
$.fn.selected = function(select) {
    if (select === undefined) {
        select = true;
    }
    return this.each(function() {
        var t = this.type;
        if (t == 'checkbox' || t == 'radio') {
            this.checked = select;
        }
        else if (this.tagName.toLowerCase() == 'option') {
            var $sel = $(this).parent('select');
            if (select && $sel[0] && $sel[0].type == 'select-one') {
                // deselect all other options
                $sel.find('option').selected(false);
            }
            this.selected = select;
        }
    });
};

// expose debug var
$.fn.ajaxSubmit.debug = false;

// helper fn for console logging
function log() {
    if (!$.fn.ajaxSubmit.debug)
        return;
    var msg = '[jquery.form] ' + Array.prototype.join.call(arguments,'');
    if (window.console && window.console.log) {
        window.console.log(msg);
    }
    else if (window.opera && window.opera.postError) {
        window.opera.postError(msg);
    }
}

})(jQuery);
/*!
 * MockJax - jQuery Plugin to Mock Ajax requests
 *
 * Version:  1.4.0
 * Released: 2011-02-04
 * Source:   http://github.com/appendto/jquery-mockjax
 * Docs:     http://enterprisejquery.com/2010/07/mock-your-ajax-requests-with-mockjax-for-rapid-development
 * Plugin:   mockjax
 * Author:   Jonathan Sharp (http://jdsharp.com)
 * License:  MIT,GPL
 * 
 * Copyright (c) 2010 appendTo LLC.
 * Dual licensed under the MIT or GPL licenses.
 * http://appendto.com/open-source-licenses
 */
(function($) {
	var _ajax = $.ajax,
		mockHandlers = [];
	
	function parseXML(xml) {
		if ( window['DOMParser'] == undefined && window.ActiveXObject ) {
			DOMParser = function() { };
			DOMParser.prototype.parseFromString = function( xmlString ) {
				var doc = new ActiveXObject('Microsoft.XMLDOM');
		        doc.async = 'false';
		        doc.loadXML( xmlString );
				return doc;
			};
		}
		
		try {
			var xmlDoc 	= ( new DOMParser() ).parseFromString( xml, 'text/xml' );
			if ( $.isXMLDoc( xmlDoc ) ) {
				var err = $('parsererror', xmlDoc);
				if ( err.length == 1 ) {
					throw('Error: ' + $(xmlDoc).text() );
				}
			} else {
				throw('Unable to parse XML');
			}
		} catch( e ) {
			var msg = ( e.name == undefined ? e : e.name + ': ' + e.message );
			$(document).trigger('xmlParseError', [ msg ]);
			return undefined;
		}
		return xmlDoc;
	}
	
	$.extend({
		ajax: function(origSettings) {
			var s = jQuery.extend(true, {}, jQuery.ajaxSettings, origSettings),
			    mock = false;
			// Iterate over our mock handlers (in registration order) until we find
			// one that is willing to intercept the request
			$.each(mockHandlers, function(k, v) {
				if ( !mockHandlers[k] ) {
					return;
				}
				var m = null;
				// If the mock was registered with a function, let the function decide if we 
				// want to mock this request
				if ( $.isFunction(mockHandlers[k]) ) {
					m = mockHandlers[k](s);
				} else {
					m = mockHandlers[k];
					// Inspect the URL of the request and check if the mock handler's url 
					// matches the url for this ajax request
					if ( $.isFunction(m.url.test) ) {
						// The user provided a regex for the url, test it
						if ( !m.url.test( s.url ) ) {
							m = null;
						}
					} else {
						// Look for a simple wildcard '*' or a direct URL match
						var star = m.url.indexOf('*');
						if ( ( m.url != '*' && m.url != s.url && star == -1 ) ||
							( star > -1 && m.url.substr(0, star) != s.url.substr(0, star) ) ) {
							 // The url we tested did not match the wildcard *
							 m = null;
						}
					}
					if ( m ) {
						// Inspect the data submitted in the request (either POST body or GET query string)
						if ( m.data && s.data ) {
							var identical = false;
							// Deep inspect the identity of the objects
							(function ident(mock, live) {
								// Test for situations where the data is a querystring (not an object)
								if (typeof live === 'string') {
									// Querystring may be a regex
									identical = $.isFunction( mock.test ) ? mock.test(live) : mock == live;
									return identical;
								}
								$.each(mock, function(k, v) {
									if ( live[k] === undefined ) {
										identical = false;
										return false;
									} else {
										identical = true;
										if ( typeof live[k] == 'object' ) {
											return ident(mock[k], live[k]);
										} else {
											if ( $.isFunction( mock[k].test ) ) {
												identical = mock[k].test(live[k]);
											} else {
												identical = ( mock[k] == live[k] );
											}
											return identical;
										}
									}
								});
							})(m.data, s.data);
							// They're not identical, do not mock this request
							if ( identical == false ) {
								m = null;
							}
						}
						// Inspect the request type
						if ( m && m.type && m.type != s.type ) {
							// The request type doesn't match (GET vs. POST)
							m = null;
						}
					}
				}
				if ( m ) {
					mock = true;

					// Handle console logging
					var c = $.extend({}, $.mockjaxSettings, m);
					if ( c.log && $.isFunction(c.log) ) {
						c.log('MOCK ' + s.type.toUpperCase() + ': ' + s.url, $.extend({}, s));
					}
					
					var jsre = /=\?(&|$)/, jsc = (new Date()).getTime();

					// Handle JSONP Parameter Callbacks, we need to replicate some of the jQuery core here
					// because there isn't an easy hook for the cross domain script tag of jsonp
					if ( s.dataType === "jsonp" ) {
						if ( s.type.toUpperCase() === "GET" ) {
							if ( !jsre.test( s.url ) ) {
								s.url += (rquery.test( s.url ) ? "&" : "?") + (s.jsonp || "callback") + "=?";
							}
						} else if ( !s.data || !jsre.test(s.data) ) {
							s.data = (s.data ? s.data + "&" : "") + (s.jsonp || "callback") + "=?";
						}
						s.dataType = "json";
					}
			
					// Build temporary JSONP function
					if ( s.dataType === "json" && (s.data && jsre.test(s.data) || jsre.test(s.url)) ) {
						jsonp = s.jsonpCallback || ("jsonp" + jsc++);
			
						// Replace the =? sequence both in the query string and the data
						if ( s.data ) {
							s.data = (s.data + "").replace(jsre, "=" + jsonp + "$1");
						}
			
						s.url = s.url.replace(jsre, "=" + jsonp + "$1");
			
						// We need to make sure
						// that a JSONP style response is executed properly
						s.dataType = "script";
			
						// Handle JSONP-style loading
						window[ jsonp ] = window[ jsonp ] || function( tmp ) {
							data = tmp;
							success();
							complete();
							// Garbage collect
							window[ jsonp ] = undefined;
			
							try {
								delete window[ jsonp ];
							} catch(e) {}
			
							if ( head ) {
								head.removeChild( script );
							}
						};
					}
					
					var rurl = /^(\w+:)?\/\/([^\/?#]+)/,
						parts = rurl.exec( s.url ),
						remote = parts && (parts[1] && parts[1] !== location.protocol || parts[2] !== location.host);
					
					// Test if we are going to create a script tag (if so, intercept & mock)
					if ( s.dataType === "script" && s.type.toUpperCase() === "GET" && remote ) {
						// Synthesize the mock request for adding a script tag
						var callbackContext = origSettings && origSettings.context || s;
						
						function success() {
							// If a local callback was specified, fire it and pass it the data
							if ( s.success ) {
								s.success.call( callbackContext, ( m.response ? m.response.toString() : m.responseText || ''), status, {} );
							}
				
							// Fire the global callback
							if ( s.global ) {
								trigger( "ajaxSuccess", [{}, s] );
							}
						}
				
						function complete() {
							// Process result
							if ( s.complete ) {
								s.complete.call( callbackContext, {} , status );
							}
				
							// The request was completed
							if ( s.global ) {
								trigger( "ajaxComplete", [{}, s] );
							}
				
							// Handle the global AJAX counter
							if ( s.global && ! --jQuery.active ) {
								jQuery.event.trigger( "ajaxStop" );
							}
						}
						
						function trigger(type, args) {
							(s.context ? jQuery(s.context) : jQuery.event).trigger(type, args);
						}
						
						if ( m.response && $.isFunction(m.response) ) {
							m.response(origSettings);
						} else {
							$.globalEval(m.responseText);
						}
						success();
						complete();
						return false;
					}
					mock = _ajax.call($, $.extend(true, {}, origSettings, {
						// Mock the XHR object
						xhr: function() {
							// Extend with our default mockjax settings
							m = $.extend({}, $.mockjaxSettings, m);

							if ( m.contentType ) {
								m.headers['content-type'] = m.contentType;
							}

							// Return our mock xhr object
							return {
								status: m.status,
								readyState: 1,
								open: function() { },
								send: function() {
									// This is a substitute for < 1.4 which lacks $.proxy
									var process = (function(that) {
										return function() {
											return (function() {
												// The request has returned
											 	this.status 		= m.status;
												this.readyState 	= 4;
										
												// We have an executable function, call it to give 
												// the mock handler a chance to update it's data
												if ( $.isFunction(m.response) ) {
													m.response(origSettings);
												}
												// Copy over our mock to our xhr object before passing control back to 
												// jQuery's onreadystatechange callback
												if ( s.dataType == 'json' && ( typeof m.responseText == 'object' ) ) {
													this.responseText = JSON.stringify(m.responseText);
												} else if ( s.dataType == 'xml' ) {
													if ( typeof m.responseXML == 'string' ) {
														this.responseXML = parseXML(m.responseXML);
													} else {
														this.responseXML = m.responseXML;
													}
												} else {
													this.responseText = m.responseText;
												}
												// jQuery < 1.4 doesn't have onreadystate change for xhr
												if ( $.isFunction(this.onreadystatechange) ) {
													this.onreadystatechange( m.isTimeout ? 'timeout' : undefined );
												}
											}).apply(that);
										};
									})(this);

									if ( m.proxy ) {
										// We're proxying this request and loading in an external file instead
										_ajax({
											global: false,
											url: m.proxy,
											type: m.proxyType,
											data: m.data,
											dataType: s.dataType,
											complete: function(xhr, txt) {
												m.responseXML = xhr.responseXML;
												m.responseText = xhr.responseText;
												this.responseTimer = setTimeout(process, m.responseTime || 0);
											}
										});
									} else {
										// type == 'POST' || 'GET' || 'DELETE'
										if ( s.async === false ) {
											// TODO: Blocking delay
											process();
										} else {
											this.responseTimer = setTimeout(process, m.responseTime || 50);
										}
									}
								},
								abort: function() {
									clearTimeout(this.responseTimer);
								},
								setRequestHeader: function() { },
								getResponseHeader: function(header) {
									// 'Last-modified', 'Etag', 'content-type' are all checked by jQuery
									if ( m.headers && m.headers[header] ) {
										// Return arbitrary headers
										return m.headers[header];
									} else if ( header.toLowerCase() == 'last-modified' ) {
										return m.lastModified || (new Date()).toString();
									} else if ( header.toLowerCase() == 'etag' ) {
										return m.etag || '';
									} else if ( header.toLowerCase() == 'content-type' ) {
										return m.contentType || 'text/plain';
									}
								},
								getAllResponseHeaders: function() {
									var headers = '';
									$.each(m.headers, function(k, v) {
										headers += k + ': ' + v + "\n";
									});
									return headers;
								}
							};
						}
					}));
					return false;
				}
			});
			// We don't have a mock request, trigger a normal request
			if ( !mock ) {
				return _ajax.apply($, arguments);
			} else {
				return mock;
			}
		}
	});

	$.mockjaxSettings = {
		//url:        null,
		//type:       'GET',
		log:          function(msg) {
		              	window['console'] && window.console.log && window.console.log(msg);
		              },
		status:       200,
		responseTime: 500,
		isTimeout:    false,
		contentType:  'text/plain',
		response:     '', 
		responseText: '',
		responseXML:  '',
		proxy:        '',
		proxyType:    'GET',
		
		lastModified: null,
		etag:         '',
		headers: {
			etag: 'IJF@H#@923uf8023hFO@I#H#',
			'content-type' : 'text/plain'
		}
	};

	$.mockjax = function(settings) {
		var i = mockHandlers.length;
		mockHandlers[i] = settings;
		return i;
	};
	$.mockjaxClear = function(i) {
		if ( arguments.length == 1 ) {
			mockHandlers[i] = null;
		} else {
			mockHandlers = [];
		}
	};
})(jQuery);
(function(e){e.fn.pajinate=function(t){function d(r){new_page=parseInt(i.data(n))-1;if(e(r).siblings(".active_page").prev(".page_link").length==true){y(r,new_page);m(new_page)}else if(t.wrap_around){m(l-1)}}function v(r){new_page=parseInt(i.data(n))+1;if(e(r).siblings(".active_page").next(".page_link").length==true){g(r,new_page);m(new_page)}else if(t.wrap_around){m(0)}}function m(e){var s=parseInt(i.data(r));start_from=e*s;end_on=start_from+s;var o=a.hide().slice(start_from,end_on);o.show();u.find(t.nav_panel_id).children(".page_link[longdesc="+e+"]").addClass("active_page "+h).siblings(".active_page").removeClass("active_page "+h);i.data(n,e);u.find(t.nav_info_id).html(t.nav_label_info.replace("{0}",start_from+1).replace("{1}",start_from+o.length).replace("{2}",a.length));b();w()}function g(n,r){var i=r;var s=e(n).siblings(".active_page");if(s.siblings(".page_link[longdesc="+i+"]").css("display")=="none"){f.each(function(){e(this).children(".page_link").hide().slice(parseInt(i-t.num_page_links_to_display+1),i+1).show()})}}function y(n,r){var i=r;var s=e(n).siblings(".active_page");if(s.siblings(".page_link[longdesc="+i+"]").css("display")=="none"){f.each(function(){e(this).children(".page_link").hide().slice(i,i+parseInt(t.num_page_links_to_display)).show()})}}function b(){if(!f.children(".page_link:visible").hasClass("last")){f.children(".more").show()}else{f.children(".more").hide()}if(!f.children(".page_link:visible").hasClass("first")){f.children(".less").show()}else{f.children(".less").hide()}}function w(){if(f.children(".last").hasClass("active_page")){f.children(".next_link").add(".last_link").addClass("no_more "+p)}else{f.children(".next_link").add(".last_link").removeClass("no_more "+p)}if(f.children(".first").hasClass("active_page")){f.children(".previous_link").add(".first_link").addClass("no_more "+p)}else{f.children(".previous_link").add(".first_link").removeClass("no_more "+p)}}var n="current_page";var r="items_per_page";var i;var s={item_container_id:".content",items_per_page:10,nav_panel_id:".page_navigation",nav_info_id:".info_text",num_page_links_to_display:20,start_page:0,wrap_around:false,nav_label_first:"First",nav_label_prev:"Prev",nav_label_next:"Next",nav_label_last:"Last",nav_order:["first","prev","num","next","last"],nav_label_info:"Showing {0}-{1} of {2} results",show_first_last:true,abort_on_small_lists:false,jquery_ui:false,jquery_ui_active:"ui-state-highlight",jquery_ui_default:"ui-state-default",jquery_ui_disabled:"ui-state-disabled"};var t=e.extend(s,t);var o;var u;var a;var f;var l;var c=t.jquery_ui?t.jquery_ui_default:"";var h=t.jquery_ui?t.jquery_ui_active:"";var p=t.jquery_ui?t.jquery_ui_disabled:"";return this.each(function(){u=e(this);o=e(this).find(t.item_container_id);a=u.find(t.item_container_id).children();if(t.abort_on_small_lists&&t.items_per_page>=a.size())return u;i=u;i.data(n,0);i.data(r,t.items_per_page);var s=o.children().size();var p=Math.ceil(s/t.items_per_page);var E='<span class="ellipse more">...</span>';var S='<span class="ellipse less">...</span>';var x=!t.show_first_last?"":'<a class="first_link '+c+'" href="">'+t.nav_label_first+"</a>";var T=!t.show_first_last?"":'<a class="last_link '+c+'" href="">'+t.nav_label_last+"</a>";var N="";for(var C=0;C<t.nav_order.length;C++){switch(t.nav_order[C]){case"first":N+=x;break;case"last":N+=T;break;case"next":N+='<a class="next_link '+c+'" href="">'+t.nav_label_next+"</a>";break;case"prev":N+='<a class="previous_link '+c+'" href="">'+t.nav_label_prev+"</a>";break;case"num":N+=S;var k=0;while(p>k){N+='<a class="page_link '+c+'" href="" longdesc="'+k+'">'+(k+1)+"</a>";k++}N+=E;break;default:break}}f=u.find(t.nav_panel_id);f.html(N).each(function(){e(this).find(".page_link:first").addClass("first");e(this).find(".page_link:last").addClass("last")});f.children(".ellipse").hide();f.find(".previous_link").next().next().addClass("active_page "+h);a.hide();a.slice(0,i.data(r)).show();l=u.children(t.nav_panel_id+":first").children(".page_link").size();t.num_page_links_to_display=Math.min(t.num_page_links_to_display,l);f.children(".page_link").hide();f.each(function(){e(this).children(".page_link").slice(0,t.num_page_links_to_display).show()});u.find(".first_link").click(function(t){t.preventDefault();y(e(this),0);m(0)});u.find(".last_link").click(function(t){t.preventDefault();var n=l-1;g(e(this),n);m(n)});u.find(".previous_link").click(function(t){t.preventDefault();d(e(this))});u.find(".next_link").click(function(t){t.preventDefault();v(e(this))});u.find(".page_link").click(function(t){t.preventDefault();m(e(this).attr("longdesc"))});m(parseInt(t.start_page));b();if(!t.wrap_around)w()});}})(jQuery)
/*! jquery.selectBoxIt - v3.6.0 - 2013-06-25 
* http://www.selectboxit.com
* Copyright (c) 2013 Greg Franko; Licensed MIT*/
!function(a){"use strict";a(window.jQuery,window,document)}(function(a,b,c,d){"use strict";a.widget("selectBox.selectBoxIt",{VERSION:"3.6.0",options:{showEffect:"none",showEffectOptions:{},showEffectSpeed:"medium",hideEffect:"none",hideEffectOptions:{},hideEffectSpeed:"medium",showFirstOption:!0,defaultText:"",defaultIcon:"",downArrowIcon:"",theme:"default",keydownOpen:!0,isMobile:function(){var a=navigator.userAgent||navigator.vendor||b.opera;return/iPhone|iPod|iPad|Silk|Android|BlackBerry|Opera Mini|IEMobile/.test(a)},"native":!1,aggressiveChange:!1,selectWhenHidden:!0,viewport:a(b),similarSearch:!1,copyAttributes:["title","rel"],copyClasses:"button",nativeMousedown:!1,customShowHideEvent:!1,autoWidth:!0,html:!0,populate:"",dynamicPositioning:!0,hideCurrent:!1},getThemes:function(){var b=this,c=a(b.element).attr("data-theme")||"c";return{bootstrap:{focus:"active",hover:"",enabled:"enabled",disabled:"disabled",arrow:"caret",button:"btn",list:"dropdown-menu",container:"bootstrap",open:"open"},jqueryui:{focus:"ui-state-focus",hover:"ui-state-hover",enabled:"ui-state-enabled",disabled:"ui-state-disabled",arrow:"ui-icon ui-icon-triangle-1-s",button:"ui-widget ui-state-default",list:"ui-widget ui-widget-content",container:"jqueryui",open:"selectboxit-open"},jquerymobile:{focus:"ui-btn-down-"+c,hover:"ui-btn-hover-"+c,enabled:"ui-enabled",disabled:"ui-disabled",arrow:"ui-icon ui-icon-arrow-d ui-icon-shadow",button:"ui-btn ui-btn-icon-right ui-btn-corner-all ui-shadow ui-btn-up-"+c,list:"ui-btn ui-btn-icon-right ui-btn-corner-all ui-shadow ui-btn-up-"+c,container:"jquerymobile",open:"selectboxit-open"},"default":{focus:"selectboxit-focus",hover:"selectboxit-hover",enabled:"selectboxit-enabled",disabled:"selectboxit-disabled",arrow:"selectboxit-default-arrow",button:"selectboxit-btn",list:"selectboxit-list",container:"selectboxit-container",open:"selectboxit-open"}}},isDeferred:function(b){return a.isPlainObject(b)&&b.promise&&b.done},_create:function(b){var d=this,e=d.options.populate;if(d.element.is("select"))return d.widgetProto=a.Widget.prototype,d.originalElem=d.element[0],d.selectBox=d.element,d.options.populate&&d.add&&!b&&d.add(e),d.selectItems=d.element.find("option"),d.firstSelectItem=d.selectItems.slice(0,1),d.documentHeight=a(c).height(),d.theme=d.getThemes()[d.options.theme]||d.getThemes()["default"],d.currentFocus=0,d.blur=!0,d.textArray=[],d.currentIndex=0,d.currentText="",d.flipped=!1,b||(d.selectBoxStyles=d.selectBox.attr("style")),d._createDropdownButton()._createUnorderedList()._copyAttributes()._replaceSelectBox()._addClasses(d.theme)._eventHandlers(),d.originalElem.disabled&&d.disable&&d.disable(),d._ariaAccessibility&&d._ariaAccessibility(),d.isMobile=d.options.isMobile(),d._mobile&&d._mobile(),d.options["native"]&&this._applyNativeSelect(),d.triggerEvent("create"),d},_createDropdownButton:function(){var b=this,c=b.originalElemId=b.originalElem.id||"",d=b.originalElemValue=b.originalElem.value||"",e=b.originalElemName=b.originalElem.name||"",f=b.options.copyClasses,g=b.selectBox.attr("class")||"";return b.dropdownText=a("<span/>",{id:c&&c+"SelectBoxItText","class":"selectboxit-text",unselectable:"on",text:b.firstSelectItem.text()}).attr("data-val",d),b.dropdownImageContainer=a("<span/>",{"class":"selectboxit-option-icon-container"}),b.dropdownImage=a("<i/>",{id:c&&c+"SelectBoxItDefaultIcon","class":"selectboxit-default-icon",unselectable:"on"}),b.dropdown=a("<span/>",{id:c&&c+"SelectBoxIt","class":"selectboxit "+("button"===f?g:"")+" "+(b.selectBox.prop("disabled")?b.theme.disabled:b.theme.enabled),name:e,tabindex:b.selectBox.attr("tabindex")||"0",unselectable:"on"}).append(b.dropdownImageContainer.append(b.dropdownImage)).append(b.dropdownText),b.dropdownContainer=a("<span/>",{id:c&&c+"SelectBoxItContainer","class":"selectboxit-container "+("container"===f?g:"")}).append(b.dropdown),b},_createUnorderedList:function(){var b,c,d,e,f,g,h,i,j,k,l,m=this,n="",o=m.originalElemId||"",p=a("<ul/>",{id:o&&o+"SelectBoxItOptions","class":"selectboxit-options",tabindex:-1});if(m.options.showFirstOption||(m.selectItems.first().attr("disabled","disabled"),m.selectItems=m.selectBox.find("option").slice(1)),m.selectItems.each(function(o){c="",d="",b=a(this).prop("disabled"),e=a(this).attr("data-icon")||"",f=a(this).attr("data-iconurl")||"",g=f?"selectboxit-option-icon-url":"",h=f?"style=\"background-image:url('"+f+"');\"":"",i=a(this).attr("data-selectedtext"),j=a(this).attr("data-text"),k=j?j:a(this).text(),l=a(this).parent(),l.is("optgroup")&&(c="selectboxit-optgroup-option",0===a(this).index()&&(d='<span class="selectboxit-optgroup-header '+l.first().attr("class")+'"data-disabled="true">'+l.first().attr("label")+"</span>")),n+=d+'<li id="'+o+'" data-val="'+this.value+'" data-disabled="'+b+'" class="'+c+" selectboxit-option "+(a(this).attr("class")||"")+'"><a class="selectboxit-option-anchor"><span class="selectboxit-option-icon-container"><i class="selectboxit-option-icon '+e+" "+(g||m.theme.container)+'"'+h+"></i></span>"+(m.options.html?k:m.htmlEscape(k))+"</a></li>",m.textArray[o]=b?"":k,this.selected&&(m._setText(m.dropdownText,i||k),m.currentFocus=o)}),m.options.defaultText||m.selectBox.attr("data-text")){var q=m.options.defaultText||m.selectBox.attr("data-text");m._setText(m.dropdownText,q),m.options.defaultText=q}return p.append(n),m.list=p,m.dropdownContainer.append(m.list),m.listItems=m.list.find("li"),m.listAnchors=m.list.find("a"),m.listItems.first().addClass("selectboxit-option-first"),m.listItems.last().addClass("selectboxit-option-last"),m.list.find("li[data-disabled='true']").not(".optgroupHeader").addClass(m.theme.disabled),m.dropdownImage.addClass(m.selectBox.attr("data-icon")||m.options.defaultIcon||m.listItems.eq(m.currentFocus).find("i").attr("class")),m.dropdownImage.attr("style",m.listItems.eq(m.currentFocus).find("i").attr("style")),m},_replaceSelectBox:function(){var b,c=this,e=c.originalElem.id||"",f=c.selectBox.attr("data-size"),g=c.listSize=f===d?"auto":"0"===f?"auto":+f;return c.selectBox.css("display","none").after(c.dropdownContainer),b=c.dropdown.height(),c.downArrow=a("<i/>",{id:e&&e+"SelectBoxItArrow","class":"selectboxit-arrow",unselectable:"on"}),c.downArrowContainer=a("<span/>",{id:e&&e+"SelectBoxItArrowContainer","class":"selectboxit-arrow-container",unselectable:"on"}).append(c.downArrow),c.dropdown.append(c.downArrowContainer),c.listItems.removeClass("selectboxit-selected").eq(c.currentFocus).addClass("selectboxit-selected"),c._realOuterWidth(c.dropdownImageContainer)||c.dropdownImageContainer.remove(),c.options.autoWidth&&(c.dropdown.is(":visible")?c.dropdown.css({width:"auto"}).css({width:c.list.outerWidth(!0)+c.downArrowContainer.outerWidth(!0)+c.dropdownImage.outerWidth(!0)}):c.dropdown.css({width:"auto"}).css({width:c._realOuterWidth(c.list)+c._realOuterWidth(c.downArrowContainer)+c._realOuterWidth(c.dropdownImage)}),c.list.css({"min-width":c.dropdown.width()})),c.dropdownText.css({"max-width":c.dropdownContainer.width()-(c.downArrowContainer.outerWidth(!0)+c.dropdownImage.outerWidth(!0))}),"number"===a.type(g)&&(c.maxHeight=c.listAnchors.outerHeight(!0)*g),c},_scrollToView:function(a){var b=this,c=b.listItems.eq(b.currentFocus),d=b.list.scrollTop(),e=c.height(),f=c.position().top,g=Math.abs(f),h=b.list.height();return"search"===a?e>h-f?b.list.scrollTop(d+(f-(h-e))):-1>f&&b.list.scrollTop(f-e):"up"===a?-1>f&&b.list.scrollTop(d-g):"down"===a&&e>h-f&&b.list.scrollTop(d+(g-h+e)),b},_callbackSupport:function(b){var c=this;return a.isFunction(b)&&b.call(c,c.dropdown),c},_setText:function(a,b){var c=this;return c.options.html?a.html(b):a.text(b),c},open:function(a){var b=this,c=b.options.showEffect,d=b.options.showEffectSpeed,e=b.options.showEffectOptions,f=b.options["native"],g=b.isMobile;return!b.listItems.length||b.dropdown.hasClass(b.theme.disabled)?b:(f||g||this.list.is(":visible")||(b.triggerEvent("open"),b._dynamicPositioning&&b.options.dynamicPositioning&&b._dynamicPositioning(),"none"===c?b.list.show():"show"===c||"slideDown"===c||"fadeIn"===c?b.list[c](d):b.list.show(c,e,d),b.list.promise().done(function(){b._scrollToView("search")})),b._callbackSupport(a),b)},close:function(a){var b=this,c=b.options.hideEffect,d=b.options.hideEffectSpeed,e=b.options.hideEffectOptions,f=b.options["native"],g=b.isMobile;return f||g||!b.list.is(":visible")||(b.triggerEvent("close"),"none"===c?b.list.hide():"hide"===c||"slideUp"===c||"fadeOut"===c?b.list[c](d):b.list.hide(c,e,d)),b._callbackSupport(a),b},toggle:function(){var a=this,b=a.list.is(":visible");b?a.close():b||a.open()},_keyMappings:{38:"up",40:"down",13:"enter",8:"backspace",9:"tab",32:"space",27:"esc"},_keydownMethods:function(){var a=this,b=a.list.is(":visible")||!a.options.keydownOpen;return{down:function(){a.moveDown&&b&&a.moveDown()},up:function(){a.moveUp&&b&&a.moveUp()},enter:function(){var b=a.listItems.eq(a.currentFocus);a._update(b),"true"!==b.attr("data-preventclose")&&a.close(),a.triggerEvent("enter")},tab:function(){a.triggerEvent("tab-blur"),a.close()},backspace:function(){a.triggerEvent("backspace")},esc:function(){a.close()}}},_eventHandlers:function(){var b,c,d=this,e=d.options.nativeMousedown,f=d.options.customShowHideEvent,g=d.focusClass,h=d.hoverClass,i=d.openClass;return this.dropdown.on({"click.selectBoxIt":function(){d.dropdown.trigger("focus",!0),d.originalElem.disabled||(d.triggerEvent("click"),e||f||d.toggle())},"mousedown.selectBoxIt":function(){a(this).data("mdown",!0),d.triggerEvent("mousedown"),e&&!f&&d.toggle()},"mouseup.selectBoxIt":function(){d.triggerEvent("mouseup")},"blur.selectBoxIt":function(){d.blur&&(d.triggerEvent("blur"),d.close(),a(this).removeClass(g))},"focus.selectBoxIt":function(b,c){var e=a(this).data("mdown");a(this).removeData("mdown"),e||c||setTimeout(function(){d.triggerEvent("tab-focus")},0),c||(a(this).hasClass(d.theme.disabled)||a(this).addClass(g),d.triggerEvent("focus"))},"keydown.selectBoxIt":function(a){var b=d._keyMappings[a.keyCode],c=d._keydownMethods()[b];c&&(c(),!d.options.keydownOpen||"up"!==b&&"down"!==b||d.open()),c&&"tab"!==b&&a.preventDefault()},"keypress.selectBoxIt":function(a){var b=a.charCode||a.keyCode,c=d._keyMappings[a.charCode||a.keyCode],e=String.fromCharCode(b);d.search&&(!c||c&&"space"===c)&&d.search(e,!0,!0),"space"===c&&a.preventDefault()},"mouseenter.selectBoxIt":function(){d.triggerEvent("mouseenter")},"mouseleave.selectBoxIt":function(){d.triggerEvent("mouseleave")}}),d.list.on({"mouseover.selectBoxIt":function(){d.blur=!1},"mouseout.selectBoxIt":function(){d.blur=!0}}),d.list.on({"click.selectBoxIt":function(){d._update(a(this)),d.triggerEvent("option-click"),"false"===a(this).attr("data-disabled")&&"true"!==a(this).attr("data-preventclose")&&d.close()},"focusin.selectBoxIt":function(){d.listItems.not(a(this)).removeAttr("data-active"),a(this).attr("data-active","");var b=d.list.is(":hidden");(d.options.searchWhenHidden&&b||d.options.aggressiveChange||b&&d.options.selectWhenHidden)&&d._update(a(this)),a(this).add(a(this).find(".selectboxit-option-anchor")).addClass(g)},"mouseup.selectBoxIt":function(){e&&!f&&(d._update(a(this)),d.triggerEvent("option-mouseup"),"false"===a(this).attr("data-disabled")&&"true"!==a(this).attr("data-preventclose")&&d.close())},"mouseenter.selectBoxIt":function(){"false"===a(this).attr("data-disabled")&&(d.listItems.removeAttr("data-active"),a(this).addClass(g).attr("data-active",""),d.listItems.not(a(this)).add(d.listAnchors.not(a(this).find(".selectboxit-option-anchor"))).removeClass(g),a(this).add(a(this).find(".selectboxit-option-anchor")).addClass(g),d.currentFocus=+a(this).attr("id"))},"mouseleave.selectBoxIt":function(){"false"===a(this).attr("data-disabled")&&(d.listItems.not(a(this)).removeClass(g).removeAttr("data-active"),a(this).add(a(this).find(".selectboxit-option-anchor")).addClass(g),d.currentFocus=+a(this).attr("id"))},"blur.selectBoxIt":function(){a(this).add(a(this).find(".selectboxit-option-anchor")).removeClass(g)}},".selectboxit-option"),d.list.on({"click.selectBoxIt":function(a){a.preventDefault()}},"a"),d.selectBox.on({"change.selectBoxIt, internal-change.selectBoxIt":function(a,e){var f,g;e||(f=d.list.find('li[data-val="'+d.originalElem.value+'"]'),f.length&&(d.listItems.eq(d.currentFocus).removeClass(d.focusClass),d.currentFocus=+f.attr("id"))),f=d.listItems.eq(d.currentFocus),g=f.attr("data-selectedtext"),b=f.attr("data-text"),c=b?b:f.find("a").text(),d._setText(d.dropdownText,g||c),d.dropdownText.attr("data-val",d.originalElem.value),f.find("i").attr("class")&&(d.dropdownImage.attr("class",f.find("i").attr("class")).addClass("selectboxit-default-icon"),d.dropdownImage.attr("style",f.find("i").attr("style"))),d.triggerEvent("changed")},"disable.selectBoxIt":function(){d.dropdown.addClass(d.theme.disabled)},"enable.selectBoxIt":function(){d.dropdown.removeClass(d.theme.disabled)},"open.selectBoxIt":function(){var a,b=d.list.find("li[data-val='"+d.dropdownText.attr("data-val")+"']");b.length||(b=d.listItems.not("[data-disabled=true]").first()),d.currentFocus=+b.attr("id"),a=d.listItems.eq(d.currentFocus),d.dropdown.addClass(i).removeClass(h).addClass(g),d.listItems.removeClass(d.selectedClass).removeAttr("data-active").not(a).add(d.listAnchors.not(a.find(".selectboxit-option-anchor"))).removeClass(g),a.addClass(d.selectedClass).add(a.find(".selectboxit-option-anchor")).addClass(g),d.options.hideCurrent&&(d.listItems.show(),a.hide())},"close.selectBoxIt":function(){d.dropdown.removeClass(i)},"blur.selectBoxIt":function(){d.dropdown.removeClass(g)},"mouseenter.selectBoxIt":function(){a(this).hasClass(d.theme.disabled)||d.dropdown.addClass(h)},"mouseleave.selectBoxIt":function(){d.dropdown.removeClass(h)},destroy:function(a){a.stopPropagation()}}),d},_update:function(a){var b,c,d,e=this,f=e.options.defaultText||e.selectBox.attr("data-text"),g=e.listItems.eq(e.currentFocus);"false"===a.attr("data-disabled")&&(b=e.listItems.eq(e.currentFocus).attr("data-selectedtext"),c=g.attr("data-text"),d=c?c:g.text(),(f&&e.options.html?e.dropdownText.html()===f:e.dropdownText.text()===f)&&e.selectBox.val()===a.attr("data-val")?e.triggerEvent("change"):(e.selectBox.val(a.attr("data-val")),e.currentFocus=+a.attr("id"),e.originalElem.value!==e.dropdownText.attr("data-val")&&e.triggerEvent("change")))},_addClasses:function(a){var b=this,c=(b.focusClass=a.focus,b.hoverClass=a.hover,a.button),d=a.list,e=a.arrow,f=a.container;return b.openClass=a.open,b.selectedClass="selectboxit-selected",b.downArrow.addClass(b.selectBox.attr("data-downarrow")||b.options.downArrowIcon||e),b.dropdownContainer.addClass(f),b.dropdown.addClass(c),b.list.addClass(d),b},refresh:function(a,b){var c=this;return c._destroySelectBoxIt()._create(!0),b||c.triggerEvent("refresh"),c._callbackSupport(a),c},htmlEscape:function(a){return String(a).replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/'/g,"&#39;").replace(/</g,"&lt;").replace(/>/g,"&gt;")},triggerEvent:function(a){var b=this,c=b.options.showFirstOption?b.currentFocus:b.currentFocus-1>=0?b.currentFocus:0;return b.selectBox.trigger(a,{selectbox:b.selectBox,selectboxOption:b.selectItems.eq(c),dropdown:b.dropdown,dropdownOption:b.listItems.eq(b.currentFocus)}),b},_copyAttributes:function(){var a=this;return a._addSelectBoxAttributes&&a._addSelectBoxAttributes(),a},_realOuterWidth:function(a){if(a.is(":visible"))return a.outerWidth(!0);var b,c=a.clone();return c.css({visibility:"hidden",display:"block",position:"absolute"}).appendTo("body"),b=c.outerWidth(!0),c.remove(),b}});var e=a.selectBox.selectBoxIt.prototype;e.add=function(b,c){this._populate(b,function(b){var d,e,f=this,g=a.type(b),h=0,i=[],j=f._isJSON(b),k=j&&f._parseJSON(b);if(b&&("array"===g||j&&k.data&&"array"===a.type(k.data))||"object"===g&&b.data&&"array"===a.type(b.data)){for(f._isJSON(b)&&(b=k),b.data&&(b=b.data),e=b.length;e-1>=h;h+=1)d=b[h],a.isPlainObject(d)?i.push(a("<option/>",d)):"string"===a.type(d)&&i.push(a("<option/>",{text:d,value:d}));f.selectBox.append(i)}else b&&"string"===g&&!f._isJSON(b)?f.selectBox.append(b):b&&"object"===g?f.selectBox.append(a("<option/>",b)):b&&f._isJSON(b)&&a.isPlainObject(f._parseJSON(b))&&f.selectBox.append(a("<option/>",f._parseJSON(b)));return f.dropdown?f.refresh(function(){f._callbackSupport(c)},!0):f._callbackSupport(c),f})},e._parseJSON=function(b){return JSON&&JSON.parse&&JSON.parse(b)||a.parseJSON(b)},e._isJSON=function(a){var b,c=this;try{return b=c._parseJSON(a),!0}catch(d){return!1}return c},e._populate=function(b,c){var d=this;return b=a.isFunction(b)?b.call():b,d.isDeferred(b)?b.done(function(a){c.call(d,a)}):c.call(d,b),d},e._ariaAccessibility=function(){var b=this;return b.dropdown.attr({role:"combobox","aria-autocomplete":"list","aria-expanded":"false","aria-owns":b.list.attr("id"),"aria-activedescendant":b.listItems.eq(b.currentFocus).length?b.listItems.eq(b.currentFocus)[0].id:"","aria-label":a("label[for='"+b.originalElem.id+"']").text()||"","aria-live":"assertive"}).on({"disable.selectBoxIt":function(){b.dropdown.attr("aria-disabled","true")},"enable.selectBoxIt":function(){b.dropdown.attr("aria-disabled","false")}}),b.list.attr({role:"listbox","aria-hidden":"true"}),b.listItems.attr({role:"option"}),b.selectBox.on({"change.selectBoxIt":function(){b.dropdownText.attr("aria-label",b.originalElem.value)},"open.selectBoxIt":function(){b.list.attr("aria-hidden","false"),b.dropdown.attr("aria-expanded","true")},"close.selectBoxIt":function(){b.list.attr("aria-hidden","true"),b.dropdown.attr("aria-expanded","false")}}),b},e._addSelectBoxAttributes=function(){var b=this;return b._addAttributes(b.selectBox.prop("attributes"),b.dropdown),b.selectItems.each(function(c){b._addAttributes(a(this).prop("attributes"),b.listItems.eq(c))}),b},e._addAttributes=function(b,c){var d=this,e=d.options.copyAttributes;return b.length&&a.each(b,function(b,d){var f=d.name.toLowerCase(),g=d.value;"null"===g||-1===a.inArray(f,e)&&-1===f.indexOf("data")||c.attr(f,g)}),d},e.destroy=function(a){var b=this;return b._destroySelectBoxIt(),b.widgetProto.destroy.call(b),b._callbackSupport(a),b},e._destroySelectBoxIt=function(){var b=this;return b.dropdown.off(".selectBoxIt"),a.contains(b.dropdownContainer[0],b.originalElem)&&b.dropdownContainer.before(b.selectBox),b.dropdownContainer.remove(),b.selectBox.removeAttr("style").attr("style",b.selectBoxStyles),b.selectBox.show(),b.triggerEvent("destroy"),b},e.disable=function(a){var b=this;return b.options.disabled||(b.close(),b.selectBox.attr("disabled","disabled"),b.dropdown.removeAttr("tabindex").removeClass(b.theme.enabled).addClass(b.theme.disabled),b.setOption("disabled",!0),b.triggerEvent("disable")),b._callbackSupport(a),b},e.disableOption=function(b,c){var d,e,f,g=this,h=a.type(b);return"number"===h&&(g.close(),d=g.selectBox.find("option").eq(b),g.triggerEvent("disable-option"),d.attr("disabled","disabled"),g.listItems.eq(b).attr("data-disabled","true").addClass(g.theme.disabled),g.currentFocus===b&&(e=g.listItems.eq(g.currentFocus).nextAll("li").not("[data-disabled='true']").first().length,f=g.listItems.eq(g.currentFocus).prevAll("li").not("[data-disabled='true']").first().length,e?g.moveDown():f?g.moveUp():g.disable())),g._callbackSupport(c),g},e._isDisabled=function(){var a=this;return a.originalElem.disabled&&a.disable(),a},e._dynamicPositioning=function(){var b=this;if("number"===a.type(b.listSize))b.list.css("max-height",b.maxHeight||"none");else{var c=b.dropdown.offset().top,d=b.list.data("max-height")||b.list.outerHeight(),e=b.dropdown.outerHeight(),f=b.options.viewport,g=f.height(),h=a.isWindow(f.get(0))?f.scrollTop():f.offset().top,i=g+h>=c+e+d,j=!i;if(b.list.data("max-height")||b.list.data("max-height",b.list.outerHeight()),j)if(b.dropdown.offset().top-h>=d)b.list.css("max-height",d),b.list.css("top",b.dropdown.position().top-b.list.outerHeight());else{var k=Math.abs(c+e+d-(g+h)),l=Math.abs(b.dropdown.offset().top-h-d);l>k?(b.list.css("max-height",d-k-e/2),b.list.css("top","auto")):(b.list.css("max-height",d-l-e/2),b.list.css("top",b.dropdown.position().top-b.list.outerHeight()))}else b.list.css("max-height",d),b.list.css("top","auto")}return b},e.enable=function(a){var b=this;return b.options.disabled&&(b.triggerEvent("enable"),b.selectBox.removeAttr("disabled"),b.dropdown.attr("tabindex",0).removeClass(b.theme.disabled).addClass(b.theme.enabled),b.setOption("disabled",!1),b._callbackSupport(a)),b},e.enableOption=function(b,c){var d,e=this,f=a.type(b);return"number"===f&&(d=e.selectBox.find("option").eq(b),e.triggerEvent("enable-option"),d.removeAttr("disabled"),e.listItems.eq(b).attr("data-disabled","false").removeClass(e.theme.disabled)),e._callbackSupport(c),e},e.moveDown=function(a){var b=this;b.currentFocus+=1;var c="true"===b.listItems.eq(b.currentFocus).attr("data-disabled")?!0:!1,d=b.listItems.eq(b.currentFocus).nextAll("li").not("[data-disabled='true']").first().length;if(b.currentFocus===b.listItems.length)b.currentFocus-=1;else{if(c&&d)return b.listItems.eq(b.currentFocus-1).blur(),b.moveDown(),void 0;c&&!d?b.currentFocus-=1:(b.listItems.eq(b.currentFocus-1).blur().end().eq(b.currentFocus).focusin(),b._scrollToView("down"),b.triggerEvent("moveDown"))}return b._callbackSupport(a),b},e.moveUp=function(a){var b=this;b.currentFocus-=1;var c="true"===b.listItems.eq(b.currentFocus).attr("data-disabled")?!0:!1,d=b.listItems.eq(b.currentFocus).prevAll("li").not("[data-disabled='true']").first().length;if(-1===b.currentFocus)b.currentFocus+=1;else{if(c&&d)return b.listItems.eq(b.currentFocus+1).blur(),b.moveUp(),void 0;c&&!d?b.currentFocus+=1:(b.listItems.eq(this.currentFocus+1).blur().end().eq(b.currentFocus).focusin(),b._scrollToView("up"),b.triggerEvent("moveUp"))}return b._callbackSupport(a),b},e._setCurrentSearchOption=function(a){var b=this;return(b.options.aggressiveChange||b.options.selectWhenHidden||b.listItems.eq(a).is(":visible"))&&b.listItems.eq(a).data("disabled")!==!0&&(b.listItems.eq(b.currentFocus).blur(),b.currentIndex=a,b.currentFocus=a,b.listItems.eq(b.currentFocus).focusin(),b._scrollToView("search"),b.triggerEvent("search")),b},e._searchAlgorithm=function(a,b){var c,d,e,f,g=this,h=!1,i=g.textArray,j=g.currentText;for(c=a,e=i.length;e>c;c+=1){for(f=i[c],d=0;e>d;d+=1)-1!==i[d].search(b)&&(h=!0,d=e);if(h||(g.currentText=g.currentText.charAt(g.currentText.length-1).replace(/[|()\[{.+*?$\\]/g,"\\$0"),j=g.currentText),b=new RegExp(j,"gi"),j.length<3){if(b=new RegExp(j.charAt(0),"gi"),-1!==f.charAt(0).search(b))return g._setCurrentSearchOption(c),(f.substring(0,j.length).toLowerCase()!==j.toLowerCase()||g.options.similarSearch)&&(g.currentIndex+=1),!1}else if(-1!==f.search(b))return g._setCurrentSearchOption(c),!1;if(f.toLowerCase()===g.currentText.toLowerCase())return g._setCurrentSearchOption(c),g.currentText="",!1}return!0},e.search=function(a,b,c){var d=this;c?d.currentText+=a.replace(/[|()\[{.+*?$\\]/g,"\\$0"):d.currentText=a.replace(/[|()\[{.+*?$\\]/g,"\\$0");var e=d._searchAlgorithm(d.currentIndex,new RegExp(d.currentText,"gi"));return e&&d._searchAlgorithm(0,d.currentText),d._callbackSupport(b),d},e._applyNativeSelect=function(){var a,b,c,d=this;d.dropdownContainer.append(d.selectBox),d.selectBox.css({display:"block",visibility:"visible",width:d.dropdown.outerWidth(),height:d.dropdown.outerHeight(),opacity:"0",position:"absolute",top:"0",left:"0",cursor:"pointer","z-index":"999999",margin:d.dropdown.css("margin"),padding:"0","-webkit-appearance":"menulist-button"}).on({"changed.selectBoxIt":function(){a=d.selectBox.find("option").filter(":selected"),b=a.attr("data-text"),c=b?b:a.text(),d._setText(d.dropdownText,c),d.list.find('li[data-val="'+a.val()+'"]').find("i").attr("class")&&d.dropdownImage.attr("class",d.list.find('li[data-val="'+a.val()+'"]').find("i").attr("class")).addClass("selectboxit-default-icon"),d.triggerEvent("option-click")}})},e._mobile=function(){var a=this;return a.isMobile&&a._applyNativeSelect(),this},e.remove=function(b,c){var d,e,f=this,g=a.type(b),h=0,i="";if("array"===g){for(e=b.length;e-1>=h;h+=1)d=b[h],"number"===a.type(d)&&(i+=i.length?", option:eq("+d+")":"option:eq("+d+")");f.selectBox.find(i).remove()}else"number"===g?f.selectBox.find("option").eq(b).remove():f.selectBox.find("option").remove();return f.dropdown?f.refresh(function(){f._callbackSupport(c)},!0):f._callbackSupport(c),f},e.selectOption=function(b,c){var d=this,e=a.type(b);return"number"===e?d.selectBox.val(d.selectItems.eq(b).val()).change():"string"===e&&d.selectBox.val(b).change(),d._callbackSupport(c),d},e.setOption=function(b,c,d){var e=this;return"string"===a.type(b)&&(e.options[b]=c),e.refresh(function(){e._callbackSupport(d)},!0),e},e.setOptions=function(b,c){var d=this;return a.isPlainObject(b)&&(d.options=a.extend({},d.options,b)),d.refresh(function(){d._callbackSupport(c)},!0),d},e.wait=function(a,b){var c=this;return c.widgetProto._delay.call(c,b,a),c}});
/*!
 * jQuery Validation Plugin 1.11.1
 *
 * http://bassistance.de/jquery-plugins/jquery-plugin-validation/
 * http://docs.jquery.com/Plugins/Validation
 *
 * Copyright 2013 JÃ¶rn Zaefferer
 * Released under the MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
 */

(function($) {

$.extend($.fn, {
    // http://docs.jquery.com/Plugins/Validation/validate
    validate: function( options ) {

        // if nothing is selected, return nothing; can't chain anyway
        if ( !this.length ) {
            if ( options && options.debug && window.console ) {
                console.warn( "Nothing selected, can't validate, returning nothing." );
            }
            return;
        }

        // check if a validator for this form was already created
        var validator = $.data( this[0], "validator" );
        if ( validator ) {
            return validator;
        }

        // Add novalidate tag if HTML5.
        this.attr( "novalidate", "novalidate" );

        validator = new $.validator( options, this[0] );
        $.data( this[0], "validator", validator );

        if ( validator.settings.onsubmit ) {

            this.validateDelegate( ":submit", "click", function( event ) {
                if ( validator.settings.submitHandler ) {
                    validator.submitButton = event.target;
                }
                // allow suppressing validation by adding a cancel class to the submit button
                if ( $(event.target).hasClass("cancel") ) {
                    validator.cancelSubmit = true;
                }

                // allow suppressing validation by adding the html5 formnovalidate attribute to the submit button
                if ( $(event.target).attr("formnovalidate") !== undefined ) {
                    validator.cancelSubmit = true;
                }
            });

            // validate the form on submit
            this.submit( function( event ) {
                if ( validator.settings.debug ) {
                    // prevent form submit to be able to see console output
                    event.preventDefault();
                }
                function handle() {
                    var hidden;
                    if ( validator.settings.submitHandler ) {
                        if ( validator.submitButton ) {
                            // insert a hidden input as a replacement for the missing submit button
                            hidden = $("<input type='hidden'/>").attr("name", validator.submitButton.name).val( $(validator.submitButton).val() ).appendTo(validator.currentForm);
                        }
                        validator.settings.submitHandler.call( validator, validator.currentForm, event );
                        if ( validator.submitButton ) {
                            // and clean up afterwards; thanks to no-block-scope, hidden can be referenced
                            hidden.remove();
                        }
                        return false;
                    }
                    return true;
                }

                // prevent submit for invalid forms or custom submit handlers
                if ( validator.cancelSubmit ) {
                    validator.cancelSubmit = false;
                    return handle();
                }
                if ( validator.form() ) {
                    if ( validator.pendingRequest ) {
                        validator.formSubmitted = true;
                        return false;
                    }
                    return handle();
                } else {
                    validator.focusInvalid();
                    return false;
                }
            });
        }

        return validator;
    },
    // http://docs.jquery.com/Plugins/Validation/valid
    valid: function() {
        if ( $(this[0]).is("form")) {
            return this.validate().form();
        } else {
            var valid = true;
            var validator = $(this[0].form).validate();
            this.each(function() {
                valid = valid && validator.element(this);
            });
            return valid;
        }
    },
    // attributes: space seperated list of attributes to retrieve and remove
    removeAttrs: function( attributes ) {
        var result = {},
            $element = this;
        $.each(attributes.split(/\s/), function( index, value ) {
            result[value] = $element.attr(value);
            $element.removeAttr(value);
        });
        return result;
    },
    // http://docs.jquery.com/Plugins/Validation/rules
    rules: function( command, argument ) {
        var element = this[0];

        if ( command ) {
            var settings = $.data(element.form, "validator").settings;
            var staticRules = settings.rules;
            var existingRules = $.validator.staticRules(element);
            switch(command) {
            case "add":
                $.extend(existingRules, $.validator.normalizeRule(argument));
                // remove messages from rules, but allow them to be set separetely
                delete existingRules.messages;
                staticRules[element.name] = existingRules;
                if ( argument.messages ) {
                    settings.messages[element.name] = $.extend( settings.messages[element.name], argument.messages );
                }
                break;
            case "remove":
                if ( !argument ) {
                    delete staticRules[element.name];
                    return existingRules;
                }
                var filtered = {};
                $.each(argument.split(/\s/), function( index, method ) {
                    filtered[method] = existingRules[method];
                    delete existingRules[method];
                });
                return filtered;
            }
        }

        var data = $.validator.normalizeRules(
        $.extend(
            {},
            $.validator.classRules(element),
            $.validator.attributeRules(element),
            $.validator.dataRules(element),
            $.validator.staticRules(element)
        ), element);

        // make sure required is at front
        if ( data.required ) {
            var param = data.required;
            delete data.required;
            data = $.extend({required: param}, data);
        }

        return data;
    }
});

// Custom selectors
$.extend($.expr[":"], {
    // http://docs.jquery.com/Plugins/Validation/blank
    blank: function( a ) { return !$.trim("" + $(a).val()); },
    // http://docs.jquery.com/Plugins/Validation/filled
    filled: function( a ) { return !!$.trim("" + $(a).val()); },
    // http://docs.jquery.com/Plugins/Validation/unchecked
    unchecked: function( a ) { return !$(a).prop("checked"); }
});

// constructor for validator
$.validator = function( options, form ) {
    this.settings = $.extend( true, {}, $.validator.defaults, options );
    this.currentForm = form;
    this.init();
};

$.validator.format = function( source, params ) {
    if ( arguments.length === 1 ) {
        return function() {
            var args = $.makeArray(arguments);
            args.unshift(source);
            return $.validator.format.apply( this, args );
        };
    }
    if ( arguments.length > 2 && params.constructor !== Array  ) {
        params = $.makeArray(arguments).slice(1);
    }
    if ( params.constructor !== Array ) {
        params = [ params ];
    }
    $.each(params, function( i, n ) {
        source = source.replace( new RegExp("\\{" + i + "\\}", "g"), function() {
            return n;
        });
    });
    return source;
};

$.extend($.validator, {

    defaults: {
        messages: {},
        groups: {},
        rules: {},
        errorClass: "error",
        validClass: "valid",
        errorElement: "label",
        focusInvalid: true,
        errorContainer: $([]),
        errorLabelContainer: $([]),
        onsubmit: true,
        ignore: ":hidden",
        ignoreTitle: false,
        onfocusin: function( element, event ) {
            this.lastActive = element;

            // hide error label and remove error class on focus if enabled
            if ( this.settings.focusCleanup && !this.blockFocusCleanup ) {
                if ( this.settings.unhighlight ) {
                    this.settings.unhighlight.call( this, element, this.settings.errorClass, this.settings.validClass );
                }
                this.addWrapper(this.errorsFor(element)).hide();
            }
        },
        onfocusout: function( element, event ) {
            if ( !this.checkable(element) && (element.name in this.submitted || !this.optional(element)) ) {
                this.element(element);
            }
        },
        onkeyup: function( element, event ) {
            if ( event.which === 9 && this.elementValue(element) === "" ) {
                return;
            } else if ( element.name in this.submitted || element === this.lastElement ) {
                this.element(element);
            }
        },
        onclick: function( element, event ) {
            // click on selects, radiobuttons and checkboxes
            if ( element.name in this.submitted ) {
                this.element(element);
            }
            // or option elements, check parent select in that case
            else if ( element.parentNode.name in this.submitted ) {
                this.element(element.parentNode);
            }
        },
        highlight: function( element, errorClass, validClass ) {
            if ( element.type === "radio" ) {
                this.findByName(element.name).addClass(errorClass).removeClass(validClass);
            } else {
                $(element).addClass(errorClass).removeClass(validClass);
            }
        },
        unhighlight: function( element, errorClass, validClass ) {
            if ( element.type === "radio" ) {
                this.findByName(element.name).removeClass(errorClass).addClass(validClass);
            } else {
                $(element).removeClass(errorClass).addClass(validClass);
            }
        }
    },

    // http://docs.jquery.com/Plugins/Validation/Validator/setDefaults
    setDefaults: function( settings ) {
        $.extend( $.validator.defaults, settings );
    },

    messages: {
        required: "This field is required.",
        remote: "Please fix this field.",
        email: "Please enter a valid email address.",
        url: "Please enter a valid URL.",
        date: "Please enter a valid date.",
        dateISO: "Please enter a valid date (ISO).",
        number: "Please enter a valid number.",
        digits: "Please enter only digits.",
        creditcard: "Please enter a valid credit card number.",
        equalTo: "Please enter the same value again.",
        maxlength: $.validator.format("Please enter no more than {0} characters."),
        minlength: $.validator.format("Please enter at least {0} characters."),
        rangelength: $.validator.format("Please enter a value between {0} and {1} characters long."),
        range: $.validator.format("Please enter a value between {0} and {1}."),
        max: $.validator.format("Please enter a value less than or equal to {0}."),
        min: $.validator.format("Please enter a value greater than or equal to {0}.")
    },

    autoCreateRanges: false,

    prototype: {

        init: function() {
            this.labelContainer = $(this.settings.errorLabelContainer);
            this.errorContext = this.labelContainer.length && this.labelContainer || $(this.currentForm);
            this.containers = $(this.settings.errorContainer).add( this.settings.errorLabelContainer );
            this.submitted = {};
            this.valueCache = {};
            this.pendingRequest = 0;
            this.pending = {};
            this.invalid = {};
            this.reset();

            var groups = (this.groups = {});
            $.each(this.settings.groups, function( key, value ) {
                if ( typeof value === "string" ) {
                    value = value.split(/\s/);
                }
                $.each(value, function( index, name ) {
                    groups[name] = key;
                });
            });
            var rules = this.settings.rules;
            $.each(rules, function( key, value ) {
                rules[key] = $.validator.normalizeRule(value);
            });

            function delegate(event) {
                var validator = $.data(this[0].form, "validator"),
                    eventType = "on" + event.type.replace(/^validate/, "");
                if ( validator.settings[eventType] ) {
                    validator.settings[eventType].call(validator, this[0], event);
                }
            }
            $(this.currentForm)
                .validateDelegate(":text, [type='password'], [type='file'], select, textarea, " +
                    "[type='number'], [type='search'] ,[type='tel'], [type='url'], " +
                    "[type='email'], [type='datetime'], [type='date'], [type='month'], " +
                    "[type='week'], [type='time'], [type='datetime-local'], " +
                    "[type='range'], [type='color'] ",
                    "focusin focusout keyup", delegate)
                .validateDelegate("[type='radio'], [type='checkbox'], select, option", "click", delegate);

            if ( this.settings.invalidHandler ) {
                $(this.currentForm).bind("invalid-form.validate", this.settings.invalidHandler);
            }
        },

        // http://docs.jquery.com/Plugins/Validation/Validator/form
        form: function() {
            this.checkForm();
            $.extend(this.submitted, this.errorMap);
            this.invalid = $.extend({}, this.errorMap);
            if ( !this.valid() ) {
                $(this.currentForm).triggerHandler("invalid-form", [this]);
            }
            this.showErrors();
            return this.valid();
        },

        checkForm: function() {
            this.prepareForm();
            for ( var i = 0, elements = (this.currentElements = this.elements()); elements[i]; i++ ) {
                this.check( elements[i] );
            }
            return this.valid();
        },

        // http://docs.jquery.com/Plugins/Validation/Validator/element
        element: function( element ) {
            element = this.validationTargetFor( this.clean( element ) );
            this.lastElement = element;
            this.prepareElement( element );
            this.currentElements = $(element);
            var result = this.check( element ) !== false;
            if ( result ) {
                delete this.invalid[element.name];
            } else {
                this.invalid[element.name] = true;
            }
            if ( !this.numberOfInvalids() ) {
                // Hide error containers on last error
                this.toHide = this.toHide.add( this.containers );
            }
            this.showErrors();
            return result;
        },

        // http://docs.jquery.com/Plugins/Validation/Validator/showErrors
        showErrors: function( errors ) {
            if ( errors ) {
                // add items to error list and map
                $.extend( this.errorMap, errors );
                this.errorList = [];
                for ( var name in errors ) {
                    this.errorList.push({
                        message: errors[name],
                        element: this.findByName(name)[0]
                    });
                }
                // remove items from success list
                this.successList = $.grep( this.successList, function( element ) {
                    return !(element.name in errors);
                });
            }
            if ( this.settings.showErrors ) {
                this.settings.showErrors.call( this, this.errorMap, this.errorList );
            } else {
                this.defaultShowErrors();
            }
        },

        // http://docs.jquery.com/Plugins/Validation/Validator/resetForm
        resetForm: function() {
            if ( $.fn.resetForm ) {
                $(this.currentForm).resetForm();
            }
            this.submitted = {};
            this.lastElement = null;
            this.prepareForm();
            this.hideErrors();
            this.elements().removeClass( this.settings.errorClass ).removeData( "previousValue" );
        },

        numberOfInvalids: function() {
            return this.objectLength(this.invalid);
        },

        objectLength: function( obj ) {
            var count = 0;
            for ( var i in obj ) {
                count++;
            }
            return count;
        },

        hideErrors: function() {
            this.addWrapper( this.toHide ).hide();
        },

        valid: function() {
            return this.size() === 0;
        },

        size: function() {
            return this.errorList.length;
        },

        focusInvalid: function() {
            if ( this.settings.focusInvalid ) {
                try {
                    $(this.findLastActive() || this.errorList.length && this.errorList[0].element || [])
                    .filter(":visible")
                    .focus()
                    // manually trigger focusin event; without it, focusin handler isn't called, findLastActive won't have anything to find
                    .trigger("focusin");
                } catch(e) {
                    // ignore IE throwing errors when focusing hidden elements
                }
            }
        },

        findLastActive: function() {
            var lastActive = this.lastActive;
            return lastActive && $.grep(this.errorList, function( n ) {
                return n.element.name === lastActive.name;
            }).length === 1 && lastActive;
        },

        elements: function() {
            var validator = this,
                rulesCache = {};

            // select all valid inputs inside the form (no submit or reset buttons)
            return $(this.currentForm)
            .find("input, select, textarea")
            .not(":submit, :reset, :image, [disabled]")
            .not( this.settings.ignore )
            .filter(function() {
                if ( !this.name && validator.settings.debug && window.console ) {
                    console.error( "%o has no name assigned", this);
                }

                // select only the first element for each name, and only those with rules specified
                if ( this.name in rulesCache || !validator.objectLength($(this).rules()) ) {
                    return false;
                }

                rulesCache[this.name] = true;
                return true;
            });
        },

        clean: function( selector ) {
            return $(selector)[0];
        },

        errors: function() {
            var errorClass = this.settings.errorClass.replace(" ", ".");
            return $(this.settings.errorElement + "." + errorClass, this.errorContext);
        },

        reset: function() {
            this.successList = [];
            this.errorList = [];
            this.errorMap = {};
            this.toShow = $([]);
            this.toHide = $([]);
            this.currentElements = $([]);
        },

        prepareForm: function() {
            this.reset();
            this.toHide = this.errors().add( this.containers );
        },

        prepareElement: function( element ) {
            this.reset();
            this.toHide = this.errorsFor(element);
        },

        elementValue: function( element ) {
            var type = $(element).attr("type"),
                val = $(element).val();

            if ( type === "radio" || type === "checkbox" ) {
                return $("input[name='" + $(element).attr("name") + "']:checked").val();
            }

            if ( typeof val === "string" ) {
                return val.replace(/\r/g, "");
            }
            return val;
        },

        check: function( element ) {
            element = this.validationTargetFor( this.clean( element ) );

            var rules = $(element).rules();
            var dependencyMismatch = false;
            var val = this.elementValue(element);
            var result;

            for (var method in rules ) {
                var rule = { method: method, parameters: rules[method] };
                try {

                    result = $.validator.methods[method].call( this, val, element, rule.parameters );

                    // if a method indicates that the field is optional and therefore valid,
                    // don't mark it as valid when there are no other rules
                    if ( result === "dependency-mismatch" ) {
                        dependencyMismatch = true;
                        continue;
                    }
                    dependencyMismatch = false;

                    if ( result === "pending" ) {
                        this.toHide = this.toHide.not( this.errorsFor(element) );
                        return;
                    }

                    if ( !result ) {
                        this.formatAndAdd( element, rule );
                        return false;
                    }
                } catch(e) {
                    if ( this.settings.debug && window.console ) {
                        console.log( "Exception occurred when checking element " + element.id + ", check the '" + rule.method + "' method.", e );
                    }
                    throw e;
                }
            }
            if ( dependencyMismatch ) {
                return;
            }
            if ( this.objectLength(rules) ) {
                this.successList.push(element);
            }
            return true;
        },

        // return the custom message for the given element and validation method
        // specified in the element's HTML5 data attribute
        customDataMessage: function( element, method ) {
            return $(element).data("msg-" + method.toLowerCase()) || (element.attributes && $(element).attr("data-msg-" + method.toLowerCase()));
        },

        // return the custom message for the given element name and validation method
        customMessage: function( name, method ) {
            var m = this.settings.messages[name];
            return m && (m.constructor === String ? m : m[method]);
        },

        // return the first defined argument, allowing empty strings
        findDefined: function() {
            for(var i = 0; i < arguments.length; i++) {
                if ( arguments[i] !== undefined ) {
                    return arguments[i];
                }
            }
            return undefined;
        },

        defaultMessage: function( element, method ) {
            return this.findDefined(
                this.customMessage( element.name, method ),
                this.customDataMessage( element, method ),
                // title is never undefined, so handle empty string as undefined
                !this.settings.ignoreTitle && element.title || undefined,
                $.validator.messages[method],
                "<strong>Warning: No message defined for " + element.name + "</strong>"
            );
        },

        formatAndAdd: function( element, rule ) {
            var message = this.defaultMessage( element, rule.method ),
                theregex = /\$?\{(\d+)\}/g;
            if ( typeof message === "function" ) {
                message = message.call(this, rule.parameters, element);
            } else if (theregex.test(message)) {
                message = $.validator.format(message.replace(theregex, "{$1}"), rule.parameters);
            }
            this.errorList.push({
                message: message,
                element: element
            });

            this.errorMap[element.name] = message;
            this.submitted[element.name] = message;
        },

        addWrapper: function( toToggle ) {
            if ( this.settings.wrapper ) {
                toToggle = toToggle.add( toToggle.parent( this.settings.wrapper ) );
            }
            return toToggle;
        },

        defaultShowErrors: function() {
            var i, elements;
            for ( i = 0; this.errorList[i]; i++ ) {
                var error = this.errorList[i];
                if ( this.settings.highlight ) {
                    this.settings.highlight.call( this, error.element, this.settings.errorClass, this.settings.validClass );
                }
                this.showLabel( error.element, error.message );
            }
            if ( this.errorList.length ) {
                this.toShow = this.toShow.add( this.containers );
            }
            if ( this.settings.success ) {
                for ( i = 0; this.successList[i]; i++ ) {
                    this.showLabel( this.successList[i] );
                }
            }
            if ( this.settings.unhighlight ) {
                for ( i = 0, elements = this.validElements(); elements[i]; i++ ) {
                    this.settings.unhighlight.call( this, elements[i], this.settings.errorClass, this.settings.validClass );
                }
            }
            this.toHide = this.toHide.not( this.toShow );
            this.hideErrors();
            this.addWrapper( this.toShow ).show();
        },

        validElements: function() {
            return this.currentElements.not(this.invalidElements());
        },

        invalidElements: function() {
            return $(this.errorList).map(function() {
                return this.element;
            });
        },

        showLabel: function( element, message ) {
            var label = this.errorsFor( element );
            if ( label.length ) {
                // refresh error/success class
                label.removeClass( this.settings.validClass ).addClass( this.settings.errorClass );
                // replace message on existing label
                label.html(message);
            } else {
                // create label
                label = $("<" + this.settings.errorElement + ">")
                    .attr("for", this.idOrName(element))
                    .addClass(this.settings.errorClass)
                    .html(message || "");
                if ( this.settings.wrapper ) {
                    // make sure the element is visible, even in IE
                    // actually showing the wrapped element is handled elsewhere
                    label = label.hide().show().wrap("<" + this.settings.wrapper + "/>").parent();
                }
                if ( !this.labelContainer.append(label).length ) {
                    if ( this.settings.errorPlacement ) {
                        this.settings.errorPlacement(label, $(element) );
                    } else {
                        label.insertAfter(element);
                    }
                }
            }
            if ( !message && this.settings.success ) {
                label.text("");
                if ( typeof this.settings.success === "string" ) {
                    label.addClass( this.settings.success );
                } else {
                    this.settings.success( label, element );
                }
            }
            this.toShow = this.toShow.add(label);
        },

        errorsFor: function( element ) {
            var name = this.idOrName(element);
            return this.errors().filter(function() {
                return $(this).attr("for") === name;
            });
        },

        idOrName: function( element ) {
            return this.groups[element.name] || (this.checkable(element) ? element.name : element.id || element.name);
        },

        validationTargetFor: function( element ) {
            // if radio/checkbox, validate first element in group instead
            if ( this.checkable(element) ) {
                element = this.findByName( element.name ).not(this.settings.ignore)[0];
            }
            return element;
        },

        checkable: function( element ) {
            return (/radio|checkbox/i).test(element.type);
        },

        findByName: function( name ) {
            return $(this.currentForm).find("[name='" + name + "']");
        },

        getLength: function( value, element ) {
            switch( element.nodeName.toLowerCase() ) {
            case "select":
                return $("option:selected", element).length;
            case "input":
                if ( this.checkable( element) ) {
                    return this.findByName(element.name).filter(":checked").length;
                }
            }
            return value.length;
        },

        depend: function( param, element ) {
            return this.dependTypes[typeof param] ? this.dependTypes[typeof param](param, element) : true;
        },

        dependTypes: {
            "boolean": function( param, element ) {
                return param;
            },
            "string": function( param, element ) {
                return !!$(param, element.form).length;
            },
            "function": function( param, element ) {
                return param(element);
            }
        },

        optional: function( element ) {
            var val = this.elementValue(element);
            return !$.validator.methods.required.call(this, val, element) && "dependency-mismatch";
        },

        startRequest: function( element ) {
            if ( !this.pending[element.name] ) {
                this.pendingRequest++;
                this.pending[element.name] = true;
            }
        },

        stopRequest: function( element, valid ) {
            this.pendingRequest--;
            // sometimes synchronization fails, make sure pendingRequest is never < 0
            if ( this.pendingRequest < 0 ) {
                this.pendingRequest = 0;
            }
            delete this.pending[element.name];
            if ( valid && this.pendingRequest === 0 && this.formSubmitted && this.form() ) {
                $(this.currentForm).submit();
                this.formSubmitted = false;
            } else if (!valid && this.pendingRequest === 0 && this.formSubmitted) {
                $(this.currentForm).triggerHandler("invalid-form", [this]);
                this.formSubmitted = false;
            }
        },

        previousValue: function( element ) {
            return $.data(element, "previousValue") || $.data(element, "previousValue", {
                old: null,
                valid: true,
                message: this.defaultMessage( element, "remote" )
            });
        }

    },

    classRuleSettings: {
        required: {required: true},
        email: {email: true},
        url: {url: true},
        date: {date: true},
        dateISO: {dateISO: true},
        number: {number: true},
        digits: {digits: true},
        creditcard: {creditcard: true}
    },

    addClassRules: function( className, rules ) {
        if ( className.constructor === String ) {
            this.classRuleSettings[className] = rules;
        } else {
            $.extend(this.classRuleSettings, className);
        }
    },

    classRules: function( element ) {
        var rules = {};
        var classes = $(element).attr("class");
        if ( classes ) {
            $.each(classes.split(" "), function() {
                if ( this in $.validator.classRuleSettings ) {
                    $.extend(rules, $.validator.classRuleSettings[this]);
                }
            });
        }
        return rules;
    },

    attributeRules: function( element ) {
        var rules = {};
        var $element = $(element);
        var type = $element[0].getAttribute("type");

        for (var method in $.validator.methods) {
            var value;

            // support for <input required> in both html5 and older browsers
            if ( method === "required" ) {
                value = $element.get(0).getAttribute(method);
                // Some browsers return an empty string for the required attribute
                // and non-HTML5 browsers might have required="" markup
                if ( value === "" ) {
                    value = true;
                }
                // force non-HTML5 browsers to return bool
                value = !!value;
            } else {
                value = $element.attr(method);
            }

            // convert the value to a number for number inputs, and for text for backwards compability
            // allows type="date" and others to be compared as strings
            if ( /min|max/.test( method ) && ( type === null || /number|range|text/.test( type ) ) ) {
                value = Number(value);
            }

            if ( value ) {
                rules[method] = value;
            } else if ( type === method && type !== 'range' ) {
                // exception: the jquery validate 'range' method
                // does not test for the html5 'range' type
                rules[method] = true;
            }
        }

        // maxlength may be returned as -1, 2147483647 (IE) and 524288 (safari) for text inputs
        if ( rules.maxlength && /-1|2147483647|524288/.test(rules.maxlength) ) {
            delete rules.maxlength;
        }

        return rules;
    },

    dataRules: function( element ) {
        var method, value,
            rules = {}, $element = $(element);
        for (method in $.validator.methods) {
            value = $element.data("rule-" + method.toLowerCase());
            if ( value !== undefined ) {
                rules[method] = value;
            }
        }
        return rules;
    },

    staticRules: function( element ) {
        var rules = {};
        var validator = $.data(element.form, "validator");
        if ( validator.settings.rules ) {
            rules = $.validator.normalizeRule(validator.settings.rules[element.name]) || {};
        }
        return rules;
    },

    normalizeRules: function( rules, element ) {
        // handle dependency check
        $.each(rules, function( prop, val ) {
            // ignore rule when param is explicitly false, eg. required:false
            if ( val === false ) {
                delete rules[prop];
                return;
            }
            if ( val.param || val.depends ) {
                var keepRule = true;
                switch (typeof val.depends) {
                case "string":
                    keepRule = !!$(val.depends, element.form).length;
                    break;
                case "function":
                    keepRule = val.depends.call(element, element);
                    break;
                }
                if ( keepRule ) {
                    rules[prop] = val.param !== undefined ? val.param : true;
                } else {
                    delete rules[prop];
                }
            }
        });

        // evaluate parameters
        $.each(rules, function( rule, parameter ) {
            rules[rule] = $.isFunction(parameter) ? parameter(element) : parameter;
        });

        // clean number parameters
        $.each(['minlength', 'maxlength'], function() {
            if ( rules[this] ) {
                rules[this] = Number(rules[this]);
            }
        });
        $.each(['rangelength', 'range'], function() {
            var parts;
            if ( rules[this] ) {
                if ( $.isArray(rules[this]) ) {
                    rules[this] = [Number(rules[this][0]), Number(rules[this][1])];
                } else if ( typeof rules[this] === "string" ) {
                    parts = rules[this].split(/[\s,]+/);
                    rules[this] = [Number(parts[0]), Number(parts[1])];
                }
            }
        });

        if ( $.validator.autoCreateRanges ) {
            // auto-create ranges
            if ( rules.min && rules.max ) {
                rules.range = [rules.min, rules.max];
                delete rules.min;
                delete rules.max;
            }
            if ( rules.minlength && rules.maxlength ) {
                rules.rangelength = [rules.minlength, rules.maxlength];
                delete rules.minlength;
                delete rules.maxlength;
            }
        }

        return rules;
    },

    // Converts a simple string to a {string: true} rule, e.g., "required" to {required:true}
    normalizeRule: function( data ) {
        if ( typeof data === "string" ) {
            var transformed = {};
            $.each(data.split(/\s/), function() {
                transformed[this] = true;
            });
            data = transformed;
        }
        return data;
    },

    // http://docs.jquery.com/Plugins/Validation/Validator/addMethod
    addMethod: function( name, method, message ) {
        $.validator.methods[name] = method;
        $.validator.messages[name] = message !== undefined ? message : $.validator.messages[name];
        if ( method.length < 3 ) {
            $.validator.addClassRules(name, $.validator.normalizeRule(name));
        }
    },

    methods: {

        // http://docs.jquery.com/Plugins/Validation/Methods/required
        required: function( value, element, param ) {
            // check if dependency is met
            if ( !this.depend(param, element) ) {
                return "dependency-mismatch";
            }
            if ( element.nodeName.toLowerCase() === "select" ) {
                // could be an array for select-multiple or a string, both are fine this way
                var val = $(element).val();
                return val && val.length > 0;
            }
            if ( this.checkable(element) ) {
                return this.getLength(value, element) > 0;
            }
            return $.trim(value).length > 0;
        },

        // http://docs.jquery.com/Plugins/Validation/Methods/email
        email: function( value, element ) {
            // contributed by Scott Gonzalez: http://projects.scottsplayground.com/email_address_validation/
            return this.optional(element) || /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i.test(value);
        },

        // http://docs.jquery.com/Plugins/Validation/Methods/url
        url: function( value, element ) {
            // contributed by Scott Gonzalez: http://projects.scottsplayground.com/iri/
            return this.optional(element) || /^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(value);
        },

        // http://docs.jquery.com/Plugins/Validation/Methods/date
        date: function( value, element ) {
            return this.optional(element) || !/Invalid|NaN/.test(new Date(value).toString());
        },

        // http://docs.jquery.com/Plugins/Validation/Methods/dateISO
        dateISO: function( value, element ) {
            return this.optional(element) || /^\d{4}[\/\-]\d{1,2}[\/\-]\d{1,2}$/.test(value);
        },

        // http://docs.jquery.com/Plugins/Validation/Methods/number
        number: function( value, element ) {
            return this.optional(element) || /^-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(value);
        },

        // http://docs.jquery.com/Plugins/Validation/Methods/digits
        digits: function( value, element ) {
            return this.optional(element) || /^\d+$/.test(value);
        },

        // http://docs.jquery.com/Plugins/Validation/Methods/creditcard
        // based on http://en.wikipedia.org/wiki/Luhn
        creditcard: function( value, element ) {
            if ( this.optional(element) ) {
                return "dependency-mismatch";
            }
            // accept only spaces, digits and dashes
            if ( /[^0-9 \-]+/.test(value) ) {
                return false;
            }
            var nCheck = 0,
                nDigit = 0,
                bEven = false;

            value = value.replace(/\D/g, "");

            for (var n = value.length - 1; n >= 0; n--) {
                var cDigit = value.charAt(n);
                nDigit = parseInt(cDigit, 10);
                if ( bEven ) {
                    if ( (nDigit *= 2) > 9 ) {
                        nDigit -= 9;
                    }
                }
                nCheck += nDigit;
                bEven = !bEven;
            }

            return (nCheck % 10) === 0;
        },

        // http://docs.jquery.com/Plugins/Validation/Methods/minlength
        minlength: function( value, element, param ) {
            var length = $.isArray( value ) ? value.length : this.getLength($.trim(value), element);
            return this.optional(element) || length >= param;
        },

        // http://docs.jquery.com/Plugins/Validation/Methods/maxlength
        maxlength: function( value, element, param ) {
            var length = $.isArray( value ) ? value.length : this.getLength($.trim(value), element);
            return this.optional(element) || length <= param;
        },

        // http://docs.jquery.com/Plugins/Validation/Methods/rangelength
        rangelength: function( value, element, param ) {
            var length = $.isArray( value ) ? value.length : this.getLength($.trim(value), element);
            return this.optional(element) || ( length >= param[0] && length <= param[1] );
        },

        // http://docs.jquery.com/Plugins/Validation/Methods/min
        min: function( value, element, param ) {
            return this.optional(element) || value >= param;
        },

        // http://docs.jquery.com/Plugins/Validation/Methods/max
        max: function( value, element, param ) {
            return this.optional(element) || value <= param;
        },

        // http://docs.jquery.com/Plugins/Validation/Methods/range
        range: function( value, element, param ) {
            return this.optional(element) || ( value >= param[0] && value <= param[1] );
        },

        // http://docs.jquery.com/Plugins/Validation/Methods/equalTo
        equalTo: function( value, element, param ) {
            // bind to the blur event of the target in order to revalidate whenever the target field is updated
            // TODO find a way to bind the event just once, avoiding the unbind-rebind overhead
            var target = $(param);
            if ( this.settings.onfocusout ) {
                target.unbind(".validate-equalTo").bind("blur.validate-equalTo", function() {
                    $(element).valid();
                });
            }
            return value === target.val();
        },

        // http://docs.jquery.com/Plugins/Validation/Methods/remote
        remote: function( value, element, param ) {
            if ( this.optional(element) ) {
                return "dependency-mismatch";
            }

            var previous = this.previousValue(element);
            if (!this.settings.messages[element.name] ) {
                this.settings.messages[element.name] = {};
            }
            previous.originalMessage = this.settings.messages[element.name].remote;
            this.settings.messages[element.name].remote = previous.message;

            param = typeof param === "string" && {url:param} || param;

            if ( previous.old === value ) {
                return previous.valid;
            }

            previous.old = value;
            var validator = this;
            this.startRequest(element);
            var data = {};
            data[element.name] = value;
            $.ajax($.extend(true, {
                url: param,
                mode: "abort",
                port: "validate" + element.name,
                dataType: "json",
                data: data,
                success: function( response ) {
                    validator.settings.messages[element.name].remote = previous.originalMessage;
                    var valid = response === true || response === "true";
                    if ( valid ) {
                        var submitted = validator.formSubmitted;
                        validator.prepareElement(element);
                        validator.formSubmitted = submitted;
                        validator.successList.push(element);
                        delete validator.invalid[element.name];
                        validator.showErrors();
                    } else {
                        var errors = {};
                        var message = response || validator.defaultMessage( element, "remote" );
                        errors[element.name] = previous.message = $.isFunction(message) ? message(value) : message;
                        validator.invalid[element.name] = true;
                        validator.showErrors(errors);
                    }
                    previous.valid = valid;
                    validator.stopRequest(element, valid);
                }
            }, param));
            return "pending";
        }

    }

});

// deprecated, use $.validator.format instead
$.format = $.validator.format;

}(jQuery));

// ajax mode: abort
// usage: $.ajax({ mode: "abort"[, port: "uniqueport"]});
// if mode:"abort" is used, the previous request on that port (port can be undefined) is aborted via XMLHttpRequest.abort()
(function($) {
    var pendingRequests = {};
    // Use a prefilter if available (1.5+)
    if ( $.ajaxPrefilter ) {
        $.ajaxPrefilter(function( settings, _, xhr ) {
            var port = settings.port;
            if ( settings.mode === "abort" ) {
                if ( pendingRequests[port] ) {
                    pendingRequests[port].abort();
                }
                pendingRequests[port] = xhr;
            }
        });
    } else {
        // Proxy ajax
        var ajax = $.ajax;
        $.ajax = function( settings ) {
            var mode = ( "mode" in settings ? settings : $.ajaxSettings ).mode,
                port = ( "port" in settings ? settings : $.ajaxSettings ).port;
            if ( mode === "abort" ) {
                if ( pendingRequests[port] ) {
                    pendingRequests[port].abort();
                }
                pendingRequests[port] = ajax.apply(this, arguments);
                return pendingRequests[port];
            }
            return ajax.apply(this, arguments);
        };
    }
}(jQuery));

// provides delegate(type: String, delegate: Selector, handler: Callback) plugin for easier event delegation
// handler is only called when $(event.target).is(delegate), in the scope of the jquery-object for event.target
(function($) {
    $.extend($.fn, {
        validateDelegate: function( delegate, type, handler ) {
            return this.bind(type, function( event ) {
                var target = $(event.target);
                if ( target.is(delegate) ) {
                    return handler.apply(target, arguments);
                }
            });
        }
    });
}(jQuery));
$(document).ready(function(){
	DD_roundies.addRule('.bt-rouge', '5px');
	DD_roundies.addRule('.bt-rose', '8px');
	DD_roundies.addRule('.bt-gris', '8px');
	DD_roundies.addRule('#settings a', '5px');
	DD_roundies.addRule('#settings a span', '20px');
	DD_roundies.addRule('.vignette img', '200px');
	DD_roundies.addRule('#reelDon > div', '5px');
	DD_roundies.addRule('.loader', '3px');
	DD_roundies.addRule('.fbconnect', '10px');
	DD_roundies.addRule('.twitterconnect', '10px');
	DD_roundies.addRule('.gmailconnect', '10px');
	DD_roundies.addRule('input[type="email"]', '8px');
	DD_roundies.addRule('input[type="text"]', '8px');
	DD_roundies.addRule('input[type="tel"]', '8px');
	DD_roundies.addRule('.fieldset', '5px');
	DD_roundies.addRule('.bt-suivie', '8px');
	DD_roundies.addRule('#wrapper-slider', '5px');
	DD_roundies.addRule('#montant', '10px');
	DD_roundies.addRule('.ui-slider-handle', '20px');
	DD_roundies.addRule('.ui-slider-range-min', '10px');
	DD_roundies.addRule('#priceBox', '5px');
	DD_roundies.addRule('.jqplot-point-label', '3px');
});
/**
* DD_roundies, this adds rounded-corner CSS in standard browsers and VML sublayers in IE that accomplish a similar appearance when comparing said browsers.
* Author: Drew Diller
* Email: drew.diller@gmail.com
* URL: http://www.dillerdesign.com/experiment/DD_roundies/
* Version: 0.0.2a -  preview 2008.12.26
* Licensed under the MIT License: http://dillerdesign.com/experiment/DD_roundies/#license
*
* Usage:
* DD_roundies.addRule('#doc .container', '10px 5px'); // selector and multiple radii
* DD_roundies.addRule('.box', 5, true); // selector, radius, and optional addition of border-radius code for standard browsers.
* 
* Just want the PNG fixing effect for IE6, and don't want to also use the DD_belatedPNG library?  Don't give any additional arguments after the CSS selector.
* DD_roundies.addRule('.your .example img');
**/

eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('t K={16:\'K\',1L:G,1M:G,1d:G,2f:y(){u(D.2g!=8&&D.1N&&!D.1N[q.16]){q.1L=M;q.1M=M}17 u(D.2g==8){q.1d=M}},2h:D.2i,1O:[],1b:{},2j:y(){u(q.1L||q.1M){D.1N.2L(q.16,\'2M:2N-2O-2P:x\')}u(q.1d){D.2Q(\'<?2R 2S="\'+q.16+\'" 2T="#1P#2k" ?>\')}},2l:y(){t a=D.1k(\'z\');D.2m.1w.1Q(a,D.2m.1w.1w);u(a.12){2n{t b=a.12;b.1x(q.16+\'\\\\:*\',\'{1l:2U(#1P#2k)}\');q.12=b}2o(2p){}}17{q.12=a}},1x:y(a,b,c){u(1R b==\'1S\'||b===2V){b=0}u(b.2W.2q().1y(\'2X\')==-1){b=b.2q().2Y(/[^0-9 ]/g,\'\').1T(\' \')}H(t i=0;i<4;i++){b[i]=(!b[i]&&b[i]!==0)?b[C.1e((i-2),0)]:b[i]}u(q.12){u(q.12.1x){t d=a.1T(\',\');H(t i=0;i<d.1U;i++){q.12.1x(d[i],\'1l:2Z(K.1V.2r(q, [\'+b.1W(\',\')+\']))\')}}17 u(c){t e=b.1W(\'F \')+\'F\';q.12.1z(D.2s(a+\' {Q-1f:\'+e+\'; -30-Q-1f:\'+e+\';}\'));q.12.1z(D.2s(a+\' {-1A-Q-1m-1n-1f:\'+b[0]+\'F \'+b[0]+\'F; -1A-Q-1m-1X-1f:\'+b[1]+\'F \'+b[1]+\'F; -1A-Q-1Y-1X-1f:\'+b[2]+\'F \'+b[2]+\'F; -1A-Q-1Y-1n-1f:\'+b[3]+\'F \'+b[3]+\'F;}\'))}}17 u(q.1d){q.1O.31({\'2t\':a,\'2u\':b})}},2v:y(a){2w(32.33){I\'z.Q\':I\'z.34\':I\'z.1B\':q.1o(a);13;I\'z.2x\':q.1Z(a);13;I\'z.1p\':I\'z.2y\':I\'z.2z\':q.1o(a);13;I\'z.20\':a.18.z.20=(a.z.20==\'S\')?\'S\':\'35\';13;I\'z.21\':q.22(a);13;I\'z.1c\':a.18.z.1c=a.z.1c;13}},1o:y(a){a.14.23=\'\';q.2A(a);q.1Z(a);q.1C(a);q.1D(a);q.24(a);q.2B(a);q.22(a)},22:y(a){u(a.W.21.1y(\'36\')!=-1){t b=a.W.21;b=1g(b.37(b.25(\'=\')+1,b.25(\')\')),10)/2C;H(t v 1h a.x){a.x[v].1i.38=b}}},2A:y(a){u(!a.W){1q}17{t b=a.W}a.14.1p=\'\';a.14.1E=\'\';t c=(b.1p==\'2D\');t d=M;u(b.1E!=\'S\'||a.1F){u(!a.1F){a.J=b.1E;a.J=a.J.39(5,a.J.25(\'")\')-5)}17{a.J=a.26}t e=q;u(!e.1b[a.J]){t f=D.1k(\'3a\');f.1r(\'3b\',y(){q.1s=q.3c;q.1t=q.3d;e.1D(a)});f.3e=e.16+\'3f\';f.14.23=\'1l:S; 1j:27; 1m:-2E; 1n:-2E; Q:S;\';f.26=a.J;f.2F(\'1s\');f.2F(\'1t\');D.2G.1Q(f,D.2G.1w);e.1b[a.J]=f}a.x.Z.1i.26=a.J;d=G}a.x.Z.2H=!d;a.x.Z.1G=\'S\';a.x.1u.2H=!c;a.x.1u.1G=b.1p;a.14.1E=\'S\';a.14.1p=\'2D\'},1Z:y(a){a.x.1H.1G=a.W.2x},1C:y(a){t c=[\'N\',\'19\',\'1a\',\'O\'];a.P={};H(t b=0;b<4;b++){a.P[c[b]]=1g(a.W[\'Q\'+c[b]+\'U\'],10)||0}},1D:y(c){t e=[\'O\',\'N\',\'U\',\'V\'];H(t d=0;d<4;d++){c.E[e[d]]=c[\'3g\'+e[d]]}t f=y(a,b){a.z.1n=(b?0:c.E.O)+\'F\';a.z.1m=(b?0:c.E.N)+\'F\';a.z.1s=c.E.U+\'F\';a.z.1t=c.E.V+\'F\'};H(t v 1h c.x){t g=(v==\'Z\')?1:2;c.x[v].3h=(c.E.U*g)+\', \'+(c.E.V*g);f(c.x[v],M)}f(c.18,G);u(K.1d){c.x.1H.z.28=\'-3i\';u(1R c.P==\'1S\'){q.1C(c)}c.x.1u.z.28=(c.P.N-1)+\'F \'+(c.P.O-1)+\'F\'}},24:y(j){t k=y(a,w,h,r,b,c,d){t e=a?[\'m\',\'1I\',\'l\',\'1J\',\'l\',\'1I\',\'l\',\'1J\',\'l\']:[\'1J\',\'l\',\'1I\',\'l\',\'1J\',\'l\',\'1I\',\'l\',\'m\'];b*=d;c*=d;w*=d;h*=d;t R=r.2I();H(t i=0;i<4;i++){R[i]*=d;R[i]=C.3j(w/2,h/2,R[i])}t f=[e[0]+C.11(0+b)+\',\'+C.11(R[0]+c),e[1]+C.11(R[0]+b)+\',\'+C.11(0+c),e[2]+C.15(w-R[1]+b)+\',\'+C.11(0+c),e[3]+C.15(w+b)+\',\'+C.11(R[1]+c),e[4]+C.15(w+b)+\',\'+C.15(h-R[2]+c),e[5]+C.15(w-R[2]+b)+\',\'+C.15(h+c),e[6]+C.11(R[3]+b)+\',\'+C.15(h+c),e[7]+C.11(0+b)+\',\'+C.15(h-R[3]+c),e[8]+C.11(0+b)+\',\'+C.11(R[0]+c)];u(!a){f.3k()}t g=f.1W(\'\');1q g};u(1R j.P==\'1S\'){q.1C(j)}t l=j.P;t m=j.2J.2I();t n=k(M,j.E.U,j.E.V,m,0,0,2);m[0]-=C.1e(l.O,l.N);m[1]-=C.1e(l.N,l.19);m[2]-=C.1e(l.19,l.1a);m[3]-=C.1e(l.1a,l.O);H(t i=0;i<4;i++){m[i]=C.1e(m[i],0)}t o=k(G,j.E.U-l.O-l.19,j.E.V-l.N-l.1a,m,l.O,l.N,2);t p=k(M,j.E.U-l.O-l.19+1,j.E.V-l.N-l.1a+1,m,l.O,l.N,1);j.x.1u.29=o;j.x.Z.29=p;j.x.1H.29=n+o;q.2K(j)},2B:y(a){t s=a.W;t b=[\'N\',\'O\',\'19\',\'1a\'];H(t i=0;i<4;i++){a.14[\'1B\'+b[i]]=(1g(s[\'1B\'+b[i]],10)||0)+(1g(s[\'Q\'+b[i]+\'U\'],10)||0)+\'F\'}a.14.Q=\'S\'},2K:y(e){t f=K;u(!e.J||!f.1b[e.J]){1q}t g=e.W;t h={\'X\':0,\'Y\':0};t i=y(a,b){t c=M;2w(b){I\'1n\':I\'1m\':h[a]=0;13;I\'3l\':h[a]=0.5;13;I\'1X\':I\'1Y\':h[a]=1;13;1P:u(b.1y(\'%\')!=-1){h[a]=1g(b,10)*0.3m}17{c=G}}t d=(a==\'X\');h[a]=C.15(c?((e.E[d?\'U\':\'V\']-(e.P[d?\'O\':\'N\']+e.P[d?\'19\':\'1a\']))*h[a])-(f.1b[e.J][d?\'1s\':\'1t\']*h[a]):1g(b,10));h[a]+=1};H(t b 1h h){i(b,g[\'2y\'+b])}e.x.Z.1i.1j=(h.X/(e.E.U-e.P.O-e.P.19+1))+\',\'+(h.Y/(e.E.V-e.P.N-e.P.1a+1));t j=g.2z;t c={\'T\':1,\'R\':e.E.U+1,\'B\':e.E.V+1,\'L\':1};t k={\'X\':{\'2a\':\'L\',\'2b\':\'R\',\'d\':\'U\'},\'Y\':{\'2a\':\'T\',\'2b\':\'B\',\'d\':\'V\'}};u(j!=\'2c\'){c={\'T\':(h.Y),\'R\':(h.X+f.1b[e.J].1s),\'B\':(h.Y+f.1b[e.J].1t),\'L\':(h.X)};u(j.1y(\'2c-\')!=-1){t v=j.1T(\'2c-\')[1].3n();c[k[v].2a]=1;c[k[v].2b]=e.E[k[v].d]+1}u(c.B>e.E.V){c.B=e.E.V+1}}e.x.Z.z.3o=\'3p(\'+c.T+\'F \'+c.R+\'F \'+c.B+\'F \'+c.L+\'F)\'},1v:y(a){t b=q;2d(y(){b.1o(a)},1)},2e:y(a){q.1D(a);q.24(a)},1V:y(b){q.z.1l=\'S\';u(!q.W){1q}17{t c=q.W}t d={3q:G,3r:G,3s:G,3t:G,3u:G,3v:G,3w:G};u(d[q.1K]===G){1q}t e=q;t f=K;q.2J=b;q.E={};t g={3x:\'2e\',3y:\'2e\'};u(q.1K==\'A\'){t i={3z:\'1v\',3A:\'1v\',3B:\'1v\',3C:\'1v\'};H(t a 1h i){g[a]=i[a]}}H(t h 1h g){q.1r(\'3D\'+h,y(){f[g[h]](e)})}q.1r(\'3E\',y(){f.2v(e)});t j=y(a){a.z.3F=1;u(a.W.1j==\'3G\'){a.z.1j=\'3H\'}};j(q.3I);j(q);q.18=D.1k(\'3J\');q.18.14.23=\'1l:S; 1j:27; 28:0; 1B:0; Q:0; 3K:S;\';q.18.z.1c=c.1c;q.x={\'1u\':M,\'Z\':M,\'1H\':M};H(t v 1h q.x){q.x[v]=D.1k(f.16+\':3L\');q.x[v].1i=D.1k(f.16+\':3M\');q.x[v].1z(q.x[v].1i);q.x[v].3N=G;q.x[v].z.1j=\'27\';q.x[v].z.1c=c.1c;q.x[v].3O=\'1,1\';q.18.1z(q.x[v])}q.x.Z.1G=\'S\';q.x.Z.1i.3P=\'3Q\';q.3R.1Q(q.18,q);q.1F=G;u(q.1K==\'3S\'){q.1F=M;q.z.3T=\'3U\'}2d(y(){f.1o(e)},1)}};2n{D.3V("3W",G,M)}2o(2p){}K.2f();K.2j();K.2l();u(K.1d&&D.1r&&K.2h){D.1r(\'3X\',y(){u(D.3Y==\'3Z\'){t d=K.1O;t e=d.1U;t f=y(a,b,c){2d(y(){K.1V.2r(a,b)},c*2C)};H(t i=0;i<e;i++){t g=D.2i(d[i].2t);t h=g.1U;H(t r=0;r<h;r++){u(g[r].1K!=\'40\'){f(g[r],d[i].2u,r)}}}}})}',62,249,'||||||||||||||||||||||||||this|||var|if|||vml|function|style|||Math|document|dim|px|false|for|case|vmlBg|DD_roundies||true|Top|Left|bW|border||none||Width|Height|currentStyle|||image||floor|styleSheet|break|runtimeStyle|ceil|ns|else|vmlBox|Right|Bottom|imgSize|zIndex|IE8|max|radius|parseInt|in|filler|position|createElement|behavior|top|left|applyVML|backgroundColor|return|attachEvent|width|height|color|pseudoClass|firstChild|addRule|search|appendChild|webkit|padding|vmlStrokeWeight|vmlOffsets|backgroundImage|isImg|fillcolor|stroke|qy|qx|nodeName|IE6|IE7|namespaces|selectorsToProcess|default|insertBefore|typeof|undefined|split|length|roundify|join|right|bottom|vmlStrokeColor|display|filter|vmlOpacity|cssText|vmlPath|lastIndexOf|src|absolute|margin|path|b1|b2|repeat|setTimeout|reposition|IEversion|documentMode|querySelector|querySelectorAll|createVmlNameSpace|VML|createVmlStyleSheet|documentElement|try|catch|err|toString|call|createTextNode|selector|radii|readPropertyChanges|switch|borderColor|backgroundPosition|backgroundRepeat|vmlFill|nixBorder|100|transparent|10000px|removeAttribute|body|filled|slice|DD_radii|clipImage|add|urn|schemas|microsoft|com|writeln|import|namespace|implementation|url|null|constructor|Array|replace|expression|moz|push|event|propertyName|borderWidth|block|lpha|substring|opacity|substr|img|onload|offsetWidth|offsetHeight|className|_sizeFinder|offset|coordsize|1px|min|reverse|center|01|toUpperCase|clip|rect|BODY|TABLE|TR|TD|SELECT|OPTION|TEXTAREA|resize|move|mouseleave|mouseenter|focus|blur|on|onpropertychange|zoom|static|relative|offsetParent|ignore|background|shape|fill|stroked|coordorigin|type|tile|parentNode|IMG|visibility|hidden|execCommand|BackgroundImageCache|onreadystatechange|readyState|complete|INPUT'.split('|'),0,{}))
jQuery(document).ready(function() {

	/** jQuery Tabs qui switch en accordéon pour le responsive **/
	jQuery('#tabs').easyResponsiveTabs({
         type: 'default',           
         width: 'auto',
         fit: true
    });


	/** Wizard pour les étapes du formulaire de don **/
	jQuery("#fDon").formToWizard({ 
		submitButton: 'SaveAccount',
		nextLabel: "Passer à l'étape suivante",
		prevLabel: "Retourner à l'étape précédente" 
	})


	/** Stylé les champ select **/
	jQuery('select').selectBoxIt({
		showEffect: "fadeIn",
    	showEffectSpeed: 200,
    	hideEffect: "fadeOut",
    	hideEffectSpeed: 200,
    	downArrowIcon: "icon-hand-down"
	});


	/** Pagination pour les tabs avec classement **/
	jQuery('.pagination').pajinate({
		num_page_links_to_display : 3,
		items_per_page : 6,
		nav_label_prev: 'Précédente',
		nav_label_next: 'Suivante'
	});


	/** Toggle class sur bouton Suivre dans l'accueil **/
	jQuery('.bt-suivie').click(function(){
		if(jQuery(this).hasClass('select')) {
			jQuery(this).removeClass('select');
			jQuery(this).text('Suivre');
		} else {
			jQuery(this).addClass('select');
			jQuery(this).text('Suivie');
		}
		return false;
	});


	/** Toggle class sur bouton des types de dons **/
	jQuery(".bt-gris").click(function(){
		jQuery(".bt-gris").removeClass('select');   
		jQuery(this).addClass('select');
		return false;
	});


	/** Input de datepicker où nécessaire **/
	jQuery( "#datepicker" ).datepicker({
      showOn: "button",
      buttonImage: "/images/calendar.png",
      buttonImageOnly: true
    });


	/** Slider pour le montant désiré dans formulaire de don **/
	$s = $('#montant').slider({
		animate: true,
		value: 20,
		min: 0,
		max: 40,
		step: 5,
		range: 'min',
		slide: function(event, ui) {
			var prix = ui.value;
			var output =  prix + " $ ";
			output += "<span>(" + prix*12 + " $ par année)</span>";
			jQuery('#priceBox').html(output);
	    }
	});

	jQuery('#priceBox').html('20 $<span>(240 $ par année)</span>');
	jQuery('#priceBox').appendTo(jQuery('.ui-slider-handle'));


	/** Déplacer zone Dashboard lorsque tablette **/
	if(jQuery(window).width() < 768) {
		jQuery('#dashboard').appendTo('.admin');
	} 
	jQuery(window).resize(function(){
		if(jQuery(window).width() < 768) {
			jQuery('#dashboard').appendTo('.admin');
		} else {
			jQuery('#dashboard').insertAfter('.admin');
		}
	})


	/** Validation du formulaire de don **/
	jQuery("#fDon").validate({
		rules: {
			champPrenom: {
				required: false,
				minlength: 2,
				maxlength: 30
			},
			champNom: {
				required: false,
				minlength: 2,
				maxlength: 30
			},
			champAdresse: {
				required: false,
				minlength: 2,
				maxlength: 30
			},
			champVille: {
				required: false,
				minlength: 2,
				maxlength: 30
			},
			champCP: {
				required: false,
				regex: "^[ABCEGHJKLMNPRSTVXY]\d[ABCEGHJKLMNPRSTVWXYZ]( )?\d[ABCEGHJKLMNPRSTVWXYZ]\d$"
			},
			champTelBur1: {
				required: false,
				rangelength: [3,3],
				number: true
			},
			champTelBur2: {
				required: false,
				rangelength: [3,3],
				number: true
			},
			champTelBur3: {
				required: false,
				rangelength: [4,4],
				number: true
			},
			champTelDom1: {
				required: false,
				rangelength: [3,3],
				number: true
			},
			champTelDom2: {
				required: false,
				rangelength: [3,3],
				number: true
			},
			champTelDom3: {
				required: false,
				rangelength: [4,4],
				number: true
			},
			champCourrielBur: {
				required: false,
				email: true
			},
			champCourrielPerso: {
				required: false,
				email: true
			}

		},
		messages: {
			champPrenom: "Au moins 2 caractère",
			champNom: "Au moins 2 caractère",
			champAdresse: "Au moins 2 caractère",
			champVille: "Au moins 2 caractère",
			champCP: "Code postal non valide",
			champTelBur1: "Numéro non valide",
			champTelBur2: "Numéro non valide",
			champTelBur3: "Numéro non valide",
			champTelDom1: "Numéro non valide",
			champTelDom2: "Numéro non valide",
			champTelDom3: "Numéro non valide",
			champCourrielBur: "Courriel non valide",
			champCourrielPerso: "Courriel non valide"
		},
		errorPlacement: function(error, element) {
			element.parent().find('.notice').text(error.text()); 
		},
		submitHandler: function() {
			alert("submitted!");
		},
		success: function(label, element){
			$(element).parent().find('.notice').addClass('valid'); 
		},
		highlight: function(element, errorClass) {
			$(element).addClass('error');
		}
	});

	$.validator.addMethod(
		"regex",
		function(value, element, regexp) {
			var re = new RegExp(regexp);
			return this.optional(element) || re.test(value);
		}
	);


	/** Effect actif sur le menu **/
	var url = window.location.href.toString().split(window.location.host)[1];
	jQuery('a').each(function(){
		if(jQuery(this).attr('href') == url) {
			jQuery(this).addClass('select');
		}
	});

});
