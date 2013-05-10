/*jslint regexp: true, nomen: true, sloppy: true, debug: true */
/*global $, console, window, jQuery, require, test, equal, notEqual, module, ok, start, stop, setTimeout, asyncTest */
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
        // if present, cleanup
        $('.test-modal-bg').remove();
        $('.test-modal').remove();
    }
});
asyncTest("ModalHome modal generated", 8, function () {
    var $fixture = $("#qunit-fixture");
    $fixture.modalHome({content: 'Lorem Ipsum'});
    
    notEqual($('.jhm-modal-bg').length, 0, "Background div present");
    notEqual($('.jhm-modal-bg:visible').length, 0, "Background div visible");
    notEqual($('.jhm-modal').length, 0, "Modal panel is present");
    notEqual($('.jhm-modal:visible').length, 0, "Modal panel is visible");
    equal($('.jhm-modal-loading').length, 1, "Modal loading message div is present");
    equal($('.jhm-modal-content').html(), 'Lorem Ipsum', "Modal content not present");
    
    //$().modalHome('hide');
    $('.jhm-modal-close').trigger('click');
    
    setTimeout(function () {
        equal($('.jhm-modal-bg:visible').length, 0, "Background div visible after close");
        equal($('.jhm-modal:visible').length, 0, "Modal panel is visible after close");
        start();
    }, 1500);
});
asyncTest("ModalHome generated with non-default classes", 7, function () {
    var $fixture = $("#qunit-fixture"),
        settings = {
            'content'           : 'non standard class test',
            'immediateDisplay'  : false,
            'modalHomeClose'    : 'test-modal-close',
            'modalHomeDiv'      : 'test-modal',
            'modalHomeBg'       : 'test-modal-bg',
            'modalHomeContent'  : 'test-modal-content',
            'modalHomeLoader'  : 'test-modal-loading',
            'modalHomeOpenEvent'    : 'test.modal.open',
            'modalHomeCloseEvent'   : 'test.modal.close'
        };

    $fixture.modalHome(settings);
    
    notEqual($('.test-modal-bg:visible').length, 0, "Background div should be visible");
    notEqual($('.test-modal:visible').length, 0, "Modal panel should be visible");
    notEqual($('.test-modal-close:visible').length, 0, "Close element should be visible");
    equal($('.test-modal-loading').length, 1, "Modal loading message div is not present");
    equal($('.test-modal-content').html(), 'non standard class test', "Modal content not present");
    
    //$().modalHome('hide');
    $('.test-modal-close').trigger('click');
    
    setTimeout(function () {
        console.log('trigger non-default classes');
        equal($('.test-modal-bg:visible').length, 0, "Background div should not be visible");
        equal($('.test-modal:visible').length, 0, "Modal panel should not be visible");
        start();
    }, 1500);
});
asyncTest("ModalHome ESC closes modal", 2, function () {
    var $fixture = $("#qunit-fixture");
    $fixture.modalHome({content: 'Lorem Ipsum'});
    
    setTimeout(function () {
        var e = jQuery.Event("keyup");
        e.which = 27; // # Some key code value
        $('body').trigger(e);
    }, 750);
    
    setTimeout(function () {
        equal($('.jhm-modal-bg:visible').length, 0, "Background div should not be visible");
        equal($('.jhm-modal:visible').length, 0, "Modal panel should not be visible");
        start();
    }, 1500);
});
asyncTest("ModalHome background click closes modal", 2, function () {
    var $fixture = $("#qunit-fixture");
    $fixture.modalHome({content: 'Lorem Ipsum'});

    setTimeout(function () {
        console.log('trigger click');
        $('.jhm-modal-bg').trigger('click');
    }, 750);
    
    setTimeout(function () {
        console.log('trigger tests');
        equal($('.jhm-modal-bg:visible').length, 0, "Background div should not be visible");
        equal($('.jhm-modal:visible').length, 0, "Modal panel should not be visible");
        start();
    }, 1500);
});

module("Plugin Content", {
    teardown: function () {
        // cleanup page elements
        $('.jhm-modal-bg').remove();
        $('.jhm-modal').remove();
    }
});
asyncTest("ModalHome jquery selector load populates content", 1, function () {
    var $fixture = $("#qunit-fixture");
    $fixture.html('<p>lorem ipsum selector</p>');
    $fixture.modalHome();
    
    setTimeout(function () {
        console.log($('.jhm-modal-content').html());
        equal($('.jhm-modal-content').html(), '<p>lorem ipsum selector</p>', "<p>lorem ipsum selector</p>");
        start();
    }, 500);
    
});
asyncTest("ModalHome AJAX load populates content", 1, function () {
    var $fixture = $("#qunit-fixture");
    $fixture.modalHome('ajax', {url: 'ajax_data.html', success: function (e) { console.log('Ajax load success', e); }, failure: function (e) { console.log('Ajax load failure', e); }});
    
    setTimeout(function () {
        console.log($('.jhm-modal-content').html());
        equal($('.jhm-modal-content').html(), 'Lorem ipsum ajax', "Lorem Ipsum ajax");
        start();
    }, 1000);
    
});
asyncTest("ModalHome AJAX failure generates error", 1, function () {
    var $fixture = $("#qunit-fixture");
    $fixture.modalHome('ajax', {url: 'ajax_data_bad.html', success: function (e) { console.log('Ajax load success', e); }, failure: function (e) { console.log('Ajax load failure', e); }});
    
    setTimeout(function () {
        console.log($('.jhm-modal-content').html());
        equal($('.jhm-modal-content').html(), 'Failed to load resource', "Ajax failure message not present");
        start();
    }, 1000);
    
});