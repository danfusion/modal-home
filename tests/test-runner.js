/*jslint regexp: true, nomen: true, sloppy: true, debug: true */
/*global $, window, jQuery, require, test, equal, notEqual, module, ok, start, stop, setTimeout, asyncTest */
// tests
module("Plugin Setup");
test("ModalHome plugin loaded", function () {
    ok($.isFunction($.fn.modalHome), "ModalHome plugin is not loaded");
});

module("Plugin Generation", {
    teardown: function () {
        // cleanup page elements
        $('.jhm-modal-bg').remove();
        $('.jhm-modal').remove();
    }
});
asyncTest("ModalHome modal generated", 7, function () {
    var $fixture = $("#qunit-fixture");
    $fixture.modalHome({content: 'Lorem Ipsum'});
    
    notEqual($('.jhm-modal-bg').length, 0, "Background div present");
    notEqual($('.jhm-modal-bg:visible').length, 0, "Background div visible");
    notEqual($('.jhm-modal').length, 0, "Modal panel is present");
    notEqual($('.jhm-modal:visible').length, 0, "Modal panel is visible");
    equal($('.jhm-modal').html(), '<div class=\"jhm-modal-close\">x</div><div class=\"jhm-modal-content\">Lorem Ipsum</div>', "Modal content not present");
    
    //$().modalHome('hide');
    $('.jhm-modal-close').trigger('click');
    
    setTimeout(function () {
        equal($('.jhm-modal-bg:visible').length, 0, "Background div visible after close");
        equal($('.jhm-modal:visible').length, 0, "Modal panel is visible after close");
        start();
    }, 2000);
});
asyncTest("ModalHome ESC closes modal", 2, function () {
    var $fixture = $("#qunit-fixture");
    $fixture.modalHome({content: 'Lorem Ipsum'});
    
    setTimeout(function () {
        var e = jQuery.Event("keyup");
        e.which = 27; // # Some key code value
        $('body').trigger(e);
    }, 1000);
    
    setTimeout(function () {
        equal($('.jhm-modal-bg:visible').length, 0, "Background div should not be visible");
        equal($('.jhm-modal:visible').length, 0, "Modal panel should not be visible");
        start();
    }, 2000);
});
asyncTest("ModalHome background click closes modal", 2, function () {
    var $fixture = $("#qunit-fixture");
    $fixture.modalHome({content: 'Lorem Ipsum'});

    setTimeout(function () {
        console.log('trigger click');
        $('.jhm-modal-bg').trigger('click');
    }, 1000);
    
    setTimeout(function () {
        console.log('trigger tests');
        console.log($('.jhm-modal-bg'));
        equal($('.jhm-modal-bg:visible').length, 0, "Background div should not be visible");
        equal($('.jhm-modal:visible').length, 0, "Modal panel should not be visible");
        start();
    }, 2000);
});
