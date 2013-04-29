/*jslint regexp: true, nomen: true, sloppy: true, debug: true */
/*global jQuery, require, test, equal, module, ok, start, asyncTest */
test("Test Runner is loaded", function () {
    var value = "hello";
    equal(value, "hello", "We expect value to be hello");
});

module("Plugin Setup");
asyncTest("jQuery loaded through Require.js", 1, function () {
    require(['jquery'], function ($) {
        equal($.fn.jquery, "1.8.3", "jQuery 1.8.3 is not loaded");
        start();
    });
});
asyncTest("ModalHome plugin loaded through Require.js", 1, function () {
    require(['jquery', 'modalHome'], function ($, mh) {
        ok($.isFunction($.modalHome), "ModalHome plugin is not loaded");
        start();
    });
});