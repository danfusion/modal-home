/*global $:true,jQuery:true*/
/*jslint debug: true, devel: true, evil: true, vars: true, sloppy: true, undef: true */
(function ($) {
/*
	var methods = {
		init : function (options) {
		
			// public / defaults
			var settings = $.extend({
				'tableClass' : 'responsive',
				'minWidth' : 767
			}, options);
			
			return this.each(function (i) {

				var $this = $(this),
					data = $this.data('rejoinder');
				
				if (!data) {
					$this.data('rejoinder', settings);
				}
                
                updateHeaderTable($this);
                
                $(window).on('resize', { elem: $this }, function (e) { updateHeaderTable(e.data.elem); });
                
			});
		},
		destroy : function () {
			
			return this.each(function () {
			
				var $this = $(this),
					data = $this.data('rejoinder');
				
				data.rejoinder.remove();
				
			});
			
		}
	};
    */
    // private functions
    

	$.fn.modalHome = function (method) {
		var $this = $(this);
        
		if (methods[method]) {
			return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
		} else if (typeof method === 'object' || !method) {
			return methods.init.apply(this, arguments);
		} else {
			$.error('Method ' + method + ' does not exist on jQuery.rejoinder');
		}
        
		return this;
	};
}(jQuery));