hw2.define([
    "hw2!PATH_JS_LIB:browser/gui/Module.js"
], function () {
    var $ = this;

    var module = $.class.extends($.Browser.Module)([
        $.public({
            __construct: function () {
                this._i.__parent.__construct("#page3",new $.Browser.Template("pages/page.html"));
            }
        })
    ]);

    new module();
});
