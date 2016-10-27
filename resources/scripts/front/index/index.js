$(function(){
   	 $(".az").click(function(){
   		 return false;
   	 });   	 
   	var slider = $('#slider').data('flexslider');
   	 $('#slider').flexslider({
   		 playAfterPaused: 2000,   
   	 });
   	if (window.PIE) {  
  	  $('.fr').each(function() { 
  	    PIE.attach(this); 
  	  }); 
  	}     
  	initGames();
	$(document).on("mouseover mouseout", ".am-dropdown", function(event){
		if(event.type == "mouseover"){
		  //鼠标悬浮
			 $(this).addClass("am-active");
		 }else if(event.type == "mouseout"){
		  //鼠标离开
			 $(this).removeClass("am-active");
		 }
	})
		
	$('.leftTab .tabBan').each(function(index){
		var idx = index;
		var that = this;
		$(this).on('mouseover', function(){
			if(!$(that).hasClass('selectBan')) {
				$(that).addClass('selectBan').siblings('.tabBan').removeClass('selectBan');
			}
			$('.leftTab .tabImgList').animate({
				"margin-left": -idx * $('.leftTab').width()
			}, 500);
		});
	}); 
	var userAgent = navigator.userAgent;
	$('.rightTab .newTab').each(function(index) {
			var that = this, idx = index;
			$(that).on('click', function(){
				if(!$('img', $(that)).hasClass('Select')) {
					$('.rightTab').css({'background':'url("./resources/assets/i/btmBan' + (idx + 1) +'.png") top center no-repeat', 'background-size': '100% 100%'});
					if(userAgent.match(/MSIE 8./) || userAgent.match(/MSIE 7./) || userAgent.match(/MSIE 6./)) {
						var srcImg = $('.IEBack img').attr('src').split('.png')[0];
						$('.IEBack img').attr('src',srcImg.substring(0, srcImg.length-1) + (idx + 1) +'.png');
					}					
					$('.rightTab .tabNews').eq(idx).addClass('newsSelect').siblings('.tabNews').removeClass('newsSelect');
					var srcSele = $('img', $(that)).attr("src").split('.png');
					$(that).find('img').addClass('Select').end().siblings('.newTab').find('img').removeClass('Select');
					$(that).find('img').attr("src", srcSele[0] + 'Select.png').end().siblings('.newTab').find('img').each(function(){
						$(this).attr('src',$(this).attr('src').replace('Select',''))
					});									
				}
			});
	});
	$('.rmyxList').on('click', '.spanList', function(index){
			var idx = $(this).data('len') - 1;
			$(this).addClass('spanSele').siblings('.spanList').removeClass('spanSele');
			$('#rmyx').animate({'margin-left': '-' + idx*100 + '%'}, 500);			
	})
	$('.leftTab .tabImgList .tabImg img').each(function(){
			$(this).attr('src', $(this).data('src')); 
			$(this)[0].onload = function() {
				$('.rightTab').height($('.leftTab').height());
			}	
	})
		
	$('.win1040').height($('.win1040').width() * .25*.9 + 64);
		
		
  	window.onresize = function() {
			$('.rightTab').height($('.leftTab').height());
			$('.win1040').height($('.win1040').width()*.25*.9 + 64);
	}
		//弹出登录div
});
function openCenterWindow(url,windowName,width,height){
    var left = (window.screen.availWidth-10-width)/2;     
    var top = (window.screen.availHeight-30-height)/2;       
    var wnd=window.open(url,windowName,"height="+height+",width="+width+",top="+top+",left="+left+",resizable=yes,scrollbars=yes,status=no,location=no,");
    return wnd;
} 
//初始化游戏分类
function initGames(){
	//棋牌游戏，单机游戏
	var categoryId = "3,1", $slider = $('#slider');
	$("#rmyx").html("");
		    $("#djyx").html("");	
		    var html_jpsg="<div class='gameList'><ul>";
		    
		    //三张
		    html_jpsg +="<li class='lists'>" + 
				"<a href='http://121.41.22.118:8001/sanzhang_x.apk'><div class='showIcon'>" + 
					"<img src='resources/assets/i/szp.png' width='100%'>" + 
					"<div class='gMark'><img src='resources/assets/i/sz_ewm.png' width='70%' style='margin-top: 15%;''' /></div>"+
					"</div>" +
					"<p class='gName'>三张牌</p>" +  //<p class='gInfo'>"+game.zhName+"</p>
				"</a>" + 
			"</li>";
		    
		    //斗牛
		    html_jpsg +="<li class='lists'>" + 
				"<a href='http://121.41.22.118:8001/douniu_x.apk'><div class='showIcon'>" + 
					"<img src='resources/assets/i/nn.png' width='100%'>" + 
					"<div class='gMark'><img src='resources/assets/i/nn_ewn.png' width='70%' style='margin-top: 15%;''' /></div>"+
					"</div>" +
					"<p class='gName'>斗牛</p>" +  //<p class='gInfo'>"+game.zhName+"</p>
				"</a>" + 
			"</li>";
		    
		    //斗地主
		    html_jpsg +="<li class='lists'>" + 
				"<a href='http://121.41.22.118:8001/doudizhu_x.apk'><div class='showIcon'>" + 
					"<img src='resources/assets/i/ddz.png' width='100%'>" + 
					"<div class='gMark'><img src='resources/assets/i/ddz_ewm.png' width='70%' style='margin-top: 15%;''' /></div>"+
					"</div>" +
					"<p class='gName'>斗地主</p>" +  //<p class='gInfo'>"+game.zhName+"</p>
				"</a>" + 
			"</li>";
		    
		    //二麻
		    html_jpsg +="<li class='lists'>" + 
				"<a href='http://121.41.22.118:8001/erma_x.apk'><div class='showIcon'>" + 
					"<img src='resources/assets/i/ermj.png' width='100%'>" + 
					"<div class='gMark'><img src='resources/assets/i/em_ewm.png' width='70%' style='margin-top: 15%;''' /></div>"+
					"</div>" +
					"<p class='gName'>二人麻将</p>" +  //<p class='gInfo'>"+game.zhName+"</p>
				"</a>" + 
			"</li>";
		    
			html_jpsg +="</ul></div>";		
            $("#rmyx").html(html_jpsg);
				
}
function download1(id,dnAddr)
{
	 parent.window.location=CONTEXT_PATH+"/frontGame/download?fileName="+encodeURI(encodeURI(dnAddr))+"&id="+id; 
}