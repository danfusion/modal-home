/*global $:true,jQuery:true*/
/*jslint debug: true, devel: true, evil: true, vars: true, sloppy: true, undef: true */
(function ($) {

	var methods = {
		init : function (options) {
			// public / defaults
			var settings = $.extend({
                'content' : '',
				'tableClass' : 'responsive',
				'minWidth' : 767
			}, options);

            var modalBG = $('.jhm-modal-bg'),
                modal = $('.jhm-modal');

            if (modalBG.length === 0) {
                modalBG = createBg();
            }
            if (modal.length === 0) {
                modal = createModal();
            }
            // load static html
            if (settings.content.length > 0) {
                populateModal(settings.content);
            }
            
            $('.jhm-modal-close').on('click', function () {
                console.log('close click');
                modal.trigger('jhm.modal.close');
            });
            
            console.log('setup events');
            // close event
            modal.on('jhm.modal.close', function () {
                console.log('jhm.modal.close');
                hideModal(modal);
                modal.off('jhm.modal.close');
            });
            // open event
            modal.on('jhm.modal.open', function () {
                console.log('jhm.modal.open');
                revealModal(modal);
                modal.off('jhm.modal.open');
            });
            // esc press event
            $('body').on('keyup', function (e) {
                if (e.which === 27) {
                    modal.trigger('jhm.modal.close');
                }
			});
            // bg click close
            $('.jhm-modal-bg').on('click', function () {
                modal.trigger('jhm.modal.close');
            });
            
            // show immediately
            modal.trigger('jhm.modal.open');
            /*
			return this.each(function (i) {

				var $this = $(this),
					data = $this.data('modalHome');
				
				if (!data) {
					$this.data('modalHome', settings);
				}
                
			});
            */
		},
        hide: function () {
            console.log('arguments', arguments);
            $('.jhm-modal').trigger('jhm.modal.close');
        },
        destroy : function () {
			/*
			return this.each(function () {
			
				var $this = $(this),
					data = $this.data('modalHome');
				
				data.rejoinder.remove();
				
			});
            */
			
		}
	};
    
    // private functions
    var createBg = function () {
        return $('body').append('<div class="jhm-modal-bg" />');
    };
    
    var createModal = function (content) {
        return $('.jhm-modal-bg').before('<div class="jhm-modal"><div class="jhm-modal-close">x</div><div class="jhm-modal-content"></div></div>');
    };
    
    var revealModal = function (modal) {
        console.log('reveal');
        
        $('.jhm-modal-bg').show();
        $('.jhm-modal').fadeIn(500);
    };
    
    var hideModal = function (modal) {
        console.log('hide');
        
        $('.jhm-modal').fadeOut(500);
        $('.jhm-modal-bg').delay(500).hide();
    };
    
    var populateModal = function (content) {
        $('.jhm-modal-content').html(content);
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