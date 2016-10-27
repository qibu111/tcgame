/**
 * 查询评论表
 */
function queryCommentList(){
	document.commentQueryForm.pageIndex.value = 1;
	document.commentQueryForm.submit();
}

function ajust(){
	var margins = 40; //上下各20
	var mh = parseInt($(window).height())-margins -20 ;//下方再留20
	var mw = parseInt($('.tmask').css('width'))-margins;
	
	var ph = parseInt($('.tinner').css('height'));
	var pw = parseInt($('.tinner').css('width'));
	
	//alert(mh + ' ' + mw + ' ' + ph + ' ' + pw);
	
	if(ph>mh || pw>mw){
		while(ph>mh || pw>mw){
			if(ph > mh){
				pw = pw * mh / ph;
				ph = mh;
				
			}
			if(pw > mw){			
				ph = ph * mw / pw;
				pw = mw;
			}
		}
		
		//alert(mh + ' ' + mw + ' ' + ph + ' ' + pw);
		
		ph = parseInt(ph)+'px';
		pw = parseInt(pw)+'px';
		
		$('.tinner').css('height',ph);
		$('.tinner').css('width',pw);
		$('.tcontent img').css('max-width',pw);
		
		var left = (mw + margins - parseInt(pw))/2;
		$('.tbox').css('left',left);
	}
}