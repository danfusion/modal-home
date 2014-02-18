/*global $:true,jQuery:true*/
/*jslint debug: true, devel: true, evil: true, vars: true, undef: true */
if (typeof DEBUG === 'undefined') { DEBUG = true; } // removed on uglify
(function ($) {
    
    // global variables setup
    var globals = {};
	var defaults = {
		'content'           : '',
		'immediateDisplay'  : false,
		'modalTopPadding'   : 75,
		'modalHomeBg'       : 'jhm-modal-bg',
		'modalHomeDiv'      : 'jhm-modal',
		'modalHomeClose'    : 'jhm-modal-close',
		'modalHomeCloseMsg'    : 'x',
		'modalHomeLoader'  : 'jhm-modal-loading',
		'modalHomeContent'  : 'jhm-modal-content',
		'modalHomeOpenEvent'    : 'jhm.modal.open',
		'modalHomeCloseEvent'   : 'jhm.modal.close',
		'ajaxFailureContent'    : 'Failed to load resource'
	};
    
    var getSettings = function () {
        return globals;
    };
    
    var setSettings = function (options) {
        globals = $.extend({}, defaults, options);
		if (DEBUG) { console.log("Set Settings: ", defaults, options, globals); }
        
        return globals;
    };

	var methods = {
		init : function (options) {
			var settings = setSettings(options);
            
            if (this.length > 0 && this.html() !== '') {
                settings.content = this.html();
                setSettings(settings);
            }

			// init modal DOM objects
            var modalBG = $('.' + settings.modalHomeBg),
                modal = $('.' + settings.modalHomeDiv);
            
            if (modalBG.length === 0) {
                modalBG = createBg();
            }
            if (modal.length === 0) {
				modal = createModal();
            }
			
            // load static html
            if (settings.content.length > 0) {
                settings.immediateDisplay = true;
                populateModal(settings.content);
				
				if (settings.success !== undefined && $.isFunction(settings.success)) {
                    settings.success({});
                }
            }
            
            $('.' + settings.modalHomeClose).on('click', function () {
                if (DEBUG) { console.log('close click'); }
                modal.trigger(settings.modalHomeCloseEvent);
            });
            
            if (DEBUG) {console.log('setup events'); }
            // close event
            modal.on(settings.modalHomeCloseEvent, function () {
                if (DEBUG) { console.log(settings.modalHomeCloseEvent + ' event'); }
                hideModal(modal);
                modal.off(settings.modalHomeCloseEvent);
            });
            // open event
            modal.on(settings.modalHomeOpenEvent, function () {
				if (DEBUG) { console.log(settings.modalHomeOpenEvent + ' event'); }
                revealModal(modal);
                modal.off(settings.modalHomeOpenEvent);
            });
            // esc press event
            $('body').on('keyup', function (e) {
                if (e.which === 27) {
                    modal.trigger(settings.modalHomeCloseEvent);
                }
			});
            // bg click close
            $('.' + settings.modalHomeBg).on('click', function () {
                modal.trigger(settings.modalHomeCloseEvent);
            });
            
            // show immediately
            if (settings.immediateDisplay === true) {
                modal.trigger(settings.modalHomeOpenEvent);
            }
            
            return { 'modal': modal, 'modalBg': modalBG };
		},
        ajax: function (options) {
            if (DEBUG) { console.log('ajax init'); }
            var container = $.fn.modalHome(options),
                settings = getSettings();
            
            showLoader();
            container.modal.trigger(settings.modalHomeOpenEvent);
            
            $.ajax({
                url: options.url
            }).done(function (data) {
                if (DEBUG) { console.log('ajax success', options.success); }
                hideLoader();
                populateModal(data);
                
                if ($.isFunction(options.success)) {
                    options.success(data);
                }
            }).error(function (data) {
                if (DEBUG) { console.log('ajax failure', data, data.statusCode()); }
                hideLoader();
                populateModal(settings.ajaxFailureContent);
                
                if ($.isFunction(options.failure)) {
                    options.failure(data);
                }
            });
        },
        hide: function () {
            hideModal();
        }
	};
    
    // private functions
    var createBg = function () {
        var settings = getSettings();
        return $('body').append('<div class="' + settings.modalHomeBg + '" />');
    };
    
    var createModal = function (content) {
        var settings = getSettings();
        return $('.' + settings.modalHomeBg).before('<div class="' + settings.modalHomeDiv + '"><div class="' + settings.modalHomeClose + '">' + settings.modalHomeCloseMsg + '</div><div class="' + settings.modalHomeLoader + '"></div><div class="' + settings.modalHomeContent + '"></div></div>');
    };
	
    var revealModal = function (modal) {
        var settings = getSettings(),
            scrollTop = parseInt($(document).scrollTop(), 10);
        if (DEBUG) { console.log('reveal'); }
        
        $('.' + settings.modalHomeBg).show();
        if (DEBUG) { console.log('window top: ', scrollTop, 'top padding: ', settings.modalTopPadding); }
        $('.' + settings.modalHomeDiv).css({top: scrollTop + settings.modalTopPadding});
        $('.' + settings.modalHomeDiv).fadeIn(500);
        
    };
    
    var hideModal = function (modal) {
        var settings = getSettings();
        if (DEBUG) { console.log('hide'); }
        
        $('.' + settings.modalHomeDiv).fadeOut(500).remove();
        $('.' + settings.modalHomeBg).delay(500).hide().remove();
    };
    
    var populateModal = function (content) {
        var settings = getSettings();
        if (DEBUG) { console.log('populate content', content); }
        $('.' + settings.modalHomeContent).empty();
        $('.' + settings.modalHomeContent).html(content);
		$('.' + settings.modalHomeClose).html(settings.modalHomeCloseMsg);
    };
    
    var showLoader = function () {
        var settings = getSettings();
        
        $('.' + settings.modalHomeContent).hide();
        $('.' + settings.modalHomeLoader).show();
        
    };
    
    var hideLoader = function () {
        var settings = getSettings();
        
        $('.' + settings.modalHomeContent).show();
        $('.' + settings.modalHomeLoader).hide();
    };
    
	$.fn.modalHome = function (method) {
		var $this = $(this);
        
		if (methods[method]) {
			return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
		} else if (typeof method === 'object' || !method) {
			return methods.init.apply(this, arguments);
		} else {
			$.error('Method ' + method + ' does not exist on jQuery.modalHome');
		}
        
		return this;
	};
}(jQuery));