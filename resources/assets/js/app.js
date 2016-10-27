$(function(){
	$(".czje ul > li").click(function(){
		$(this).addClass("canje").siblings().removeClass("canje");
	});
	/*var gaodu=$(".am-tab-panel").height();
	$("#gaodu").css({"height":gaodu+25});
	*/
	$(".meun li").hover(function(){
		$(this).addClass("meuncan");
	}, function(){
		$(this).removeClass("meuncan");
	});
	$("#zcd").hover(function(){
		$(".meun02").show();
	}, function(){
		$(".meun02").hide();
	});
	$(".meun02").mouseout();
	$('.xuan a').each(function(index) {
		var that = this, idx = index;
		$(that).hover(function() {
			$(that).css({
				'background-color': '#ff9600',
			});
			$(that).find('img').attr('src', $(that).find('img').attr('src').replace(/_1.png/, '_2.png'));
		}, function() {
			$(that).css({
				'background-color': '#eeeeee',
			});
			$(that).find('img').attr('src', $(that).find('img').attr('src').replace(/_2.png/, '_1.png'));
		});	
	});
});