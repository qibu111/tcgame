function initBranner(){
	var $slider = $('#slider');
	$slider.flexslider('removeSlide', $("#xx"));
			var html_jpsg='';
			html_jpsg +="<li>";
			html_jpsg +="<a href='http://121.41.22.118:8001/douniu_x.apk'><img src='resources/assets/i/1469588915397.jpg' /></a>";
			html_jpsg +="</li>";
			$slider.flexslider('addSlide', html_jpsg);
			html_jpsg ="<li>";
			html_jpsg +="<a href='http://121.41.22.118:8001/doudizhu_x.apk'><img src='resources/assets/i/1469588767623.jpg' /></a>";
			html_jpsg +="</li>";
			$slider.flexslider('addSlide', html_jpsg);
			
			var downHtml = '<div class="fixedDown">' + 
				'<div><img src="resources/assets/i/mlhsj1.png" width="100%"></div>' + 
				//'<div style="margin: 2% auto 2%;"><a href="http://down.miqtech.com/download/mlhSetup_1.0.0.48_20160712.exe"><img src="' + CONTEXT_PATH +'/resources/assets/i/downhb.png" style="border: 0;" width="51%"></a></div>' + 
				'<div class="downEwm" style="margin: 5% auto;">' + 
					/*'<a class="downPhone" href="javascript:void(0);" onmouseover="downPhone(0);" onmouseleave="downPhoneh(0);" style="margin-left: 10%;">' + 
						'<img src="' + CONTEXT_PATH +'/resources/assets/i/phoneD.png" style="border: 0;" width="70%"><br /><span>IOS下载</span>' + 
						'<span class="ewmNone"><img src="' + CONTEXT_PATH +'/resources/assets/i/ddz_IOS.png" width="100%" style="border: 0;"></span>' + 
					'</a>' + */
					/*'<a class="downPhone" style="margin: 0 20px;" href="javascript:void(0);" onmouseover="downPhone(1);" onmouseleave="downPhoneh(1);"  >' + 
						'<img src="' + CONTEXT_PATH +'/resources/assets/i/androidD.png" style="border: 0;" width="70%"><br /><span>安卓下载</span>' + 
						'<span class="ewmNone" style="left: 0;"><img src="' + CONTEXT_PATH +'/resources/assets/i/ddz_Anroid.png" width="100%" style="border: 0;"></span>' + 
					'</a>' + */
					/*'<a class="downPhone" href="javascript:void(0);"><img src="' + CONTEXT_PATH +'/resources/assets/i/downewm.png" width="100%" style="border: 0;"></a>' + */
				'</div>'
			'</div>';
			$slider.append(downHtml);
 }
function downPhone(obj) {
	$('.downPhone .ewmNone').eq(obj).show();
}
function downPhoneh(obj) {
	$('.downPhone .ewmNone').eq(obj).hide();
}

$(function() {
	initBranner();
	
});