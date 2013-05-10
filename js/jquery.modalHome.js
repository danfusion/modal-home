/*global $:true,jQuery:true*/
/*jslint debug: true, devel: true, evil: true, vars: true, undef: true */
if (typeof DEBUG === 'undefined') { DEBUG = true; } // removed on uglify
(function ($) {
    
    // global variables setup
    var globals = {};
    
    var getSettings = function () {
        return globals;
    };
    
    var setSettings = function (options) {
        // public / defaults
        globals = $.extend({
            'content'           : '',
            'immediateDisplay'  : false,
            'modalHomeBg'       : 'jhm-modal-bg',
            'modalHomeDiv'      : 'jhm-modal',
            'modalHomeClose'    : 'jhm-modal-close',
            'modalHomeLoader'  : 'jhm-modal-loading',
            'modalHomeContent'  : 'jhm-modal-content',
            'modalHomeOpenEvent'    : 'jhm.modal.open',
            'modalHomeCloseEvent'   : 'jhm.modal.close'
        }, options);
        
        return globals;
    };

	var methods = {
		init : function (options) {
			var settings = setSettings(options);
            
            if (DEBUG) { console.log(this, settings); }
            
            if (this.length > 0 && this.html() !== '') {
                settings.content = this.html();
                setSettings(settings);
            }

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
            }
            
            $('.' + settings.modalHomeClose).on('click', function () {
                console.log('close click');
                modal.trigger(settings.modalHomeCloseEvent);
            });
            
            console.log('setup events');
            // close event
            modal.on(settings.modalHomeCloseEvent, function () {
                console.log(settings.modalHomeCloseEvent + ' event');
                hideModal(modal);
                modal.off(settings.modalHomeCloseEvent);
            });
            // open event
            modal.on(settings.modalHomeOpenEvent, function () {
                console.log(settings.modalHomeOpenEvent + ' event');
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
            console.log('ajax init');
            var container = $.fn.modalHome(options),
                settings = getSettings();
            
            showLoader();
            container.modal.trigger(settings.modalHomeOpenEvent);
            
            $.ajax({
                url: options.url
            }).done(function (data) {
                
                console.log('ajax success');
                populateModal(data);
                if ($.isFunction(options.success)) {
                    options.success(data);
                }
                hideLoader();
            }).error(function (data) {
                console.log('ajax failure', data, data.statusCode());
                populateModal('Failed to load resource');
                if ($.isFunction(options.failure)) {
                    options.failure(data);
                }
                hideLoader();
            });
        },
        hide: function () {
            var settings = getSettings();
            
            $('.' + settings.modalHomeDiv).trigger(settings.modalHomeCloseEvent);
        }
	};
    
    // private functions
    var createBg = function () {
        var settings = getSettings();
        return $('body').append('<div class="' + settings.modalHomeBg + '" />');
    };
    
    var createModal = function (content) {
        var settings = getSettings();
        return $('.' + settings.modalHomeBg).before('<div class="' + settings.modalHomeDiv + '"><div class="' + settings.modalHomeClose + '">x</div><div class="' + settings.modalHomeLoader + '"></div><div class="' + settings.modalHomeContent + '"></div></div>');
    };
    
    var revealModal = function (modal) {
        var settings = getSettings();
        console.log('reveal');
        
        $('.' + settings.modalHomeBg).show();
        $('.' + settings.modalHomeDiv).fadeIn(500);
    };
    
    var hideModal = function (modal) {
        var settings = getSettings();
        console.log('hide');
        
        $('.' + settings.modalHomeDiv).fadeOut(500);
        $('.' + settings.modalHomeBg).delay(500).hide();
    };
    
    var populateModal = function (content) {
        var settings = getSettings();
        console.log('populate content', content);
        $('.' + settings.modalHomeContent).html(content);
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