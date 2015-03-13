'use strict';

angular.module('directives', [])
.directive('removeToggle', function(){
	return{
		restrict: 'A',
		scope: false,
		link: function(scope, element, attrs) {
			var toggleBookingBtns = function(){
				if(!$(this).next('.booking-btns').is(':visible')){
					$('.booking-btns').removeClass('show');
					$(this).next('.booking-btns').addClass('show');
				}else{
					$(this).next('.booking-btns').removeClass('show');
				}
			};

			var hideBtns = function(){
				$(this).parents('.booking-btns').removeClass('show');
			};

			element.on('click', toggleBookingBtns);
			$('.edit-btn').on('click', hideBtns);
    }
	};
});
