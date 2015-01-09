/*
 * Copyright (C) 2007 - 2014 Hyperweb2 All rights reserved.
 * GNU General Public License version 3; see www.hyperweb2.com/terms/
 */

'use strict';

hw2.define([
    "hw2!PATH_JS_LIB:browser/gui/index.js"
], function () {
    var $ = this;

    $.Browser.Component = $.public.abstract.class([
        $.private({
            relEl: [], // array of elements where the modules has been loaded
            template: null,
            childs: null
        }),
        $.public({
            __construct: function (template, childs) {
                if (!(template instanceof $.Browser.Template)) {
                    throw new Error("You must pass a Template object as second argument");
                }

                this._i.template = template;
                this._i.childs = childs;
            },
            remove: function (selector) {
                $.Browser.Loader.removeCss(this._i.template.getCss());

                this.__destruct();
            },
            init: function (selector) {

                function tmplReq (tmpl) {
                    var html = tmpl.getHtml();
                    var css = tmpl.getCss();
                    var req = [];
                    // fifo order
                    html && req.push(html);
                    css && req.push(css);
                    return req;
                }

                var that = this;
                return $.Browser.Loader.load(tmplReq(this._i.template), null, {selector: selector})
                        .then(function () {
                            if (typeof that._i.childs === "object") {
                                var promises = [];
                                for (var sel in that._i.childs) {
                                    var child = that._i.childs[sel];
                                    promises.push(that.s.loadByPath(child, sel));
                                }

                                return $.Q.all(promises).then(function () {
                                    return true;
                                });
                            } else {
                                return true;
                            }
                        })
                        .fail(function (error) {
                            throw error;
                        });
            }
        }),
        $.public.static({
            load: function (M, sel) {
                if (M.__isClass && M.__isChildOf($.Browser.Module)) {
                    var m = new M();
                    return m.init(sel);
                }

                return false;
            },
            loadByPath: function (mPath, sel) {
                return $.Browser.Loader.load(mPath)
                        .then(function (M) {
                            var res = this.s.load(M, sel);
                            if (res===false)
                                throw new Error("Passed object is not a Component");

                            return res;
                        });
            }
        })
    ]);

    $.Browser.ModRegistry = $.public.static.final.class([
        $.private.static({
            regList: []
        }),
        $.public.static({
            register: function (name, path) {
                this._s.regList[name] = path;
            },
            unregister: function (name) {
                this._s.regList.splice(name, 1);
            },
            load: function (name, sel) {
                var mPath = this._s.regList[name];
                return $.Browser.Module.loadByPath(mPath, sel);
            }
        })
    ]);
});