
'use strict';

hw2.define([
], function () {

    return $.class.extends($.Browser.Component)(
        $.public({
            __construct: function (parent, childs, opt) {
                var tmpl = new $.Browser.Template("pages/page3.html");

                opt.template = tmpl;

                this.__super(parent, childs, opt);
            }
        })
    );
});
