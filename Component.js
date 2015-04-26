/*
 * Copyright (C) 2007 - 2014 Hyperweb2 All rights reserved.
 * GNU General Public License version 3; see www.hyperweb2.com/terms/
 */

'use strict';

hw2.define([
    "hw2!{PATH_JS_LIB}browser/gui/index.js",
    "hw2!{PATH_JS_LIB}application/index.js"
], function () {
    var $ = this;

    return $.Browser.Component = $.public.abstract.class.extends($.Component)(
        $.protected({
            template: null,
            selector: null
        }),
        $.public({
            __construct: function (parent, childs, opt) {
                if (!(opt.template instanceof $.Browser.Template)) {
                    throw new Error("You must pass a Template object in opt parameter");
                }

                this.i.template = opt.template;
                this.i.selector = opt.selector;

                this.__super(parent, childs, opt);
            },
            __destruct: function () {
                $.Browser.Loader.removeCss(this.i.template.getCss());
                
                var el=$.Browser.JQ(this.i.selector);
                for (var i=0;i<el.length;i++)
                    el[i].innerHTML="";

                this.__super();
            },
            init: function () {
                var that = this;

                function tmplReq (tmpl) {
                    var html = tmpl.getHtml();
                    var css = tmpl.getCss();
                    var req = [];
                    // fifo order
                    html && req.push(html);
                    if (css.length > 0)
                        req = req.concat(css);
                    return req;
                }

                return $.Browser.Loader.load(tmplReq(this.i.template), null, {selector: this.i.selector})
                        .then(function () {
                            return that.__super();
                        });
            },
            update: function (routeInfo) {
                this.__super(routeInfo);
            },
            updateParams: function (routeInfo) {
                return [];
            }
        })
    );
});