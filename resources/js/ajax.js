var HYIP = {};

HYIP = {};
//ajax请求
//timeout：用户未登陆的跳转回调
//error：服务器错误的回调
HYIP.ajax = function(url, param, success, failed, last, error) {
	param.r = Math.random()*10;
	$.ajax({
		url: url,
		dataType: 'json',
		timeout: 30000,
		data: param,
		type: 'post',
		success: function(data){
			if(data.success){
				(success || function(){})(data);
			}else{
				if(failed){
					failed(data);
				}else{
					if(data.message){
						HYIP.showDynamicErrorMsg(data.message);
					}
				}
			}
			(last || function(){})(data);
		},
		error: function(jqXHR, textStatus, errorThrown) {
			if(error){
				error();
			}else{
				HYIP.showDynamicErrorMsg();
			}
		}
	});
};

HYIP.dynamicTimers = [];
HYIP.dynamicOption = {};

HYIP.showDynamicMsg = function(id, css, msg, time){
	if($('#' + id).size() == 0){
		$('body').append('<span id="' + id + '"></span>');
		HYIP.dynamicOption[id] = {of: $(window)};
	}
	$('#' + id).hide();
	for(i in HYIP.dynamicTimers){
		clearTimeout(HYIP.dynamicTimers[i]);
	}
	HYIP.dynamicTimers = [];
	
	$('#' + id).removeAttr("class").addClass(css).css('z-index', 9999).html(msg).fadeIn('blind', function() {
		$('#' + id).position(HYIP.dynamicOption[id]);
		var timerId = setTimeout(function(){
			$('#' + id).fadeOut('blind');
		}, time || 3000);
		HYIP.dynamicTimers.push(timerId);
	});
}

HYIP.showDynamicSuccessMsg = function(msg, time){
	msg = msg || '';
	var isIE6=!!window.ActiveXObject && !window.XMLHttpRequest;
	if(isIE6){
		HYIP.showDynamicMsg('hyip_float_message', 'hyip-success', msg, time);
	}else{
		var width = (msg.length > 10)?500:150;
		$.floatingMessage(msg, {
			show: "blind",
			hide: "puff",
			width: width,
			height: 20, 
			time: time || 3000,
			position: 'top-left',
			className: 'hyip-success'
		});
	}
}

HYIP.showDynamicErrorMsg = function(msg, time){
	msg = msg || '网络错误';
	var isIE6=!!window.ActiveXObject && !window.XMLHttpRequest;
	if(isIE6){
		HYIP.showDynamicMsg('hyip_float_message', 'hyip-failed', msg || '网络错误', time);
	}else{
		var width = (msg.length > 10)?500:150;
		var height = (msg.length > 30)?40:20;
		$.floatingMessage(msg || '网络错误', {
			show: "blind",
			hide: "puff",
	        width: width,
	        height: height, 
	        time: time || 3000,
	        position: 'top-left',
	        className: 'hyip-failed'
	    });
	}
}

HYIP.isInt = function(text){
	return /^\d+$/.test(text);
}

HYIP.parseInt = function(text){
	return HYIP.isInt(text) ? parseInt(text) : 0;
}

HYIP.percent = function(num){
	return ('' + num*100).replace(/^(\d+(\.\d\d{0,1}){0,1})(.*)$/, '$1%');
}

HYIP.export_timer_running = false;
HYIP.exportExcel = function(ele, exportUrl, param, checkUrl, downloadUrl){
	if($('#export_excel_dialog').size() == 0){
		$('body').append('<div id="export_excel_dialog" title="导出"><div id="export_excel_message"></div></div>');
		$('#export_excel_dialog').dialog({
			minWidth: 300,
			minHeight: 300,
			draggable: false,
			autoOpen: false,
			modal: true,
			show: 'blind',
			hide: 'blind',
			close: function(event, ui) {
				HYIP.export_timer_running = false;
			}
		});
	}
	
	$(ele).attr('disabled', true);
	HYIP.ajax(exportUrl, param, function(data){
		$('#export_excel_message').html('数据处理中，请稍后。。。0.00%');
		HYIP.export_timer_running = true;
		HYIP.checkExport(data.retObj, checkUrl, downloadUrl, 0);
		$('#export_excel_dialog').dialog('open');
		$(ele).attr('disabled', false);
	}, function(data){
		$(ele).attr('disabled', false);
		HYIP.showDynamicErrorMsg(data.msg);
	}, function(data){}, function(){
		$(ele).attr('disabled', false);
		HYIP.showDynamicErrorMsg('出错了，请刷新页面！')
	});
}

HYIP.checkExport = function(fileName, checkUrl, downloadUrl, checkCount){
	if(checkCount < 5 && HYIP.export_timer_running){
		HYIP.ajax(checkUrl, {fileName: fileName}, function(data){
			var result = data.retObj;
			if(result.loading){
				$('#export_excel_message').html('数据处理中，请稍后。。。' + result.speed);
				setTimeout('HYIP.checkExport("' + fileName + '", "' + checkUrl + '", "' + downloadUrl + '", 0);', 1000);
			}else if(result.success){
				$('#export_excel_message').html('数据下载地址：<a href="' + downloadUrl + '/' + fileName + '">下载数据</a>');
			}else{
				$('#export_excel_message').html('用户数据处理失败，服务器异常！');
			}
		}, function(data){
			$('#export_excel_message').html('用户数据处理失败，服务器异常！');
		}, function(data){}, function(){
			checkCount++;
			setTimeout('HYIP.checkExport("' + fileName + '", "' + checkUrl + '", "' + downloadUrl + '", ' + checkCount + ');', 1000);
			$('#export_excel_message').html('用户数据处理失败，服务器异常！');
		});
	}
}

HYIP.keydown = function(_keydown) {
	$(document).keydown(function(event) {
		 if(event.keyCode==13){
			 _keydown();
	     }    
	});
}

String.prototype.trim= function(){  
    return this.replace(/(^\s*)|(\s*$)/g, "");  
}
