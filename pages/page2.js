
'use strict';

hw2.define([
], function () {

    return $.class.extends($.Browser.Component)(
        $.public({
            __construct: function (parent, childs, opt) {
                var tmpl = new $.Browser.Template("pages/page2.html", "pages/page2.css");

                opt.template = tmpl;

                this.__super(parent, childs, opt);
            }
        })
    );
});
