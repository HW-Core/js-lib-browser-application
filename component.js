hw2.define([
    "hw2!PATH_JS_LIB:browser/application/Component.js"
], function () {
    var $ = this;

    var mod = $.class.extends($.Browser.Component)([
        $.public({
            __construct: function () {
                var tmpl = new $.Browser.Template("pages/page.html");

                this.__super(tmpl, {
                    "#page2": new $.Browser.Template("pages/page2.html", "pages/page2.css"),
                    "#page-3": new $.Browser.Template("pages/page3.html", null)
                });
            }
        })
    ]);

    new mod().init("#dynamic");
});
