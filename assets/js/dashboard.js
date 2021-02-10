jQuery(document).ready(function ($) {
	'use strict';
	$(document).on('click', '.cmplz-dismiss-warning', function(){
		var warning_id = $(this).data('warning_id');
		var btn = $(this);
		btn.attr('disabled', 'disabled');
		var task_count = parseInt($('.cmplz-task-count').html());
		var container = $(this).closest('.cmplz-progress-warning-container');
		$.ajax({
			type: "POST",
			url: complianz_admin.admin_url,
			dataType: 'json',
			data: ({
				action: 'cmplz_dismiss_warning',
				id: warning_id,
			}),
			success: function (response) {
				btn.removeAttr('disabled');
				if (response.success) {
					container.remove();
					$('.cmplz-task-count.cmplz-remaining').html(task_count-1)
				}
			}
		});
	});

	$(document).on('click', '.cmplz-task', function(){
		var status = 'remaining';
		if ($(this).find('.cmplz-task-count').hasClass('cmplz-all')) {
			status = 'all';
		}
		if ( $('.cmplz-'+status).closest('.cmplz-task').hasClass('active')) return;
		var container = $(this).closest('.item-container').find('.item-content');
		var cmplz_loader = '<div class="cmplz-loader"><div class="rect1"></div><div class="rect2"></div><div class="rect3"></div><div class="rect4"></div><div class="rect5"></div></div>';

		container.html(cmplz_loader );
		// container.html('<div class="cmplz-skeleton"></div>' );
		$.ajax({
			type: "GET",
			url: complianz_admin.admin_url,
			dataType: 'json',
			data: ({
				action: 'cmplz_load_warnings',
				status: status,
			}),
			success: function (response) {
				if (response.success) {
					container.html(response.html);
					if (status === 'all') {
						$('.cmplz-all').closest('.cmplz-task').addClass('active');
						$('.cmplz-remaining').closest('.cmplz-task').removeClass('active');
					} else {
						$('.cmplz-all').closest('.cmplz-task').removeClass('active');
						$('.cmplz-remaining').closest('.cmplz-task').addClass('active');
					}
				}
			}
		});
	});

	// Color bullet in support forum block
	$(".cmplz-trick a").hover(function() {
		$(this).find('.cmplz-bullet').css("background-color","#FBC43D");
	}, function() {
		$(this).find('.cmplz-bullet').css("background-color",""); //to remove property set it to ''
	});

});
