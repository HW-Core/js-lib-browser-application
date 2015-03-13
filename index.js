hw2.define([
    "hw2!PATH_JS_LIB:browser/application/Component.js"
], function () {
    var $ = this;

    var MainComponent = $.class.extends($.Browser.Component)([
        $.public({
            __construct: function (parent, childs, opt) {
                var tmpl = new $.Browser.Template("template.html");

                opt.template = tmpl;
                opt.selector = "body";

                this.__super(parent, {
                    "#page2": {path: "pages/page2.js", opt: {selector: "#page2"}},
                    "#page-3": {path: "pages/page3.js", opt: {selector: "#page-3"}}
                }, opt);
            }
        })
    ]);

    var System = $.Browser.System.I();

    System.register("main", MainComponent);

    System.init();
});
