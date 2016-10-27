/**
 * 查询影片列表
 */
function queryOrderList(){
	if($("#takeStatus").length > 0 && $("#takeStatus").val() != '' && $("#mailStatus").length > 0 &&  $("#mailStatus").val() != ''){
		alert("邮寄状态和取票状态不可同时选择");
		return;
	}
	document.orderQueryForm.pageIndex.value = 1;
	document.orderQueryForm.submit();
}
//查询光验票列表
function queryLightOrderList(){
	document.orderLightForm.pageIndex.value = 1;
	document.orderLightForm.submit();
}

function updateOrderStatus(el, orderId, orderStatus){
	if(window.confirm("请在手工退款成功后选择，确认已退款成功吗？")){
		$.ajax({
			async : true,
			cache : false,
			type : 'post',
			dataType : 'json',
			data : {orderId:orderId, orderStatus:orderStatus},
			url : CONTEXT_PATH + '/order/updateOrder',
			success : function(response) {
				if (response) {
					if(response.success) {
						alert('退款成功!');
						$(el).parent().prev().prev().text("退款成功");
						$(el).hide();
						$(el).siblings().hide();
					}else{
						alert(response.msg);
					}
				} else {
					alert('请求失败!');
				}
			},
			error : function() {
				alert('请求失败!');
			}
		});
	}
	
}

function activeOrder(el, orderId){
		$.ajax({
			async : true,
			cache : false,
			type : 'post',
			dataType : 'json',
			data : {orderId:orderId},
			url : CONTEXT_PATH + '/order/activeOrder',
			success : function(response) {
				if (response) {
					if(response.success) {
						alert('激活成功!');
						$(el).parent().prev().text("激活码已激活");
						$(el).parent().html('<a href="javascript:;" onclick="sendCode('+orderId+',1 );">发送兑换码</a>');
					}else{
						alert(response.msg);
					}
				} else {
					alert('请求失败!');
				}
			},
			error : function() {
				alert('请求失败!');
			}
		});
}

function updateMailStatus(el, orderId, mailStatus){
	if(window.confirm("确认更新邮寄状态吗？")){
		$.ajax({
			async : true,
			cache : false,
			type : 'post',
			dataType : 'json',
			data : {orderId:orderId, mailStatus:mailStatus},
			url : CONTEXT_PATH + '/order/updateMailStatus',
			success : function(response) {
				if (response) {
					if(response.success) {
						alert('更新成功!');
						if(mailStatus == 2){
							$(el).parent().parent().prev().prev().prev().prev().text("邮寄中");
							$(el).parent().html('<a href="javascript:;" onclick="updateMailStatus(this,'+orderId+',3 );">完成邮寄</a><br/><a href="javascript:;" onclick="getUserAddr(this, '+orderId+');">查看邮寄地址</a><br/>');
						}
						if(mailStatus == 3){
							$(el).parent().hide();
							$(el).parent().parent().prev().prev().prev().prev().text("完成邮寄");
							$("#sendCode" + orderId).hide();
						}
					}else{
						alert(response.msg);
					}
				} else {
					alert('请求失败!');
				}
			},
			error : function() {
				alert('请求失败!');
			}
		});
	}
	
}

function updateTakeStatus(el, orderId, takeStatus){
	if(window.confirm("请确认是否修改为已上门取票？")){
		$.ajax({
			async : true,
			cache : false,
			type : 'post',
			dataType : 'json',
			data : {orderId:orderId, takeStatus:takeStatus},
			url : CONTEXT_PATH + '/order/updateTakeStatus',
			success : function(response) {
				if (response) {
					if(response.success) {
						alert('更新成功!');
						$(el).parent().parent().prev().prev().prev().text("已上门取票");
						$("#sendCode" + orderId).hide();
						$(el).hide();
					}else{
						alert(response.msg);
					}
				} else {
					alert('请求失败!');
				}
			},
			error : function() {
				alert('请求失败!');
			}
		});
	}
	
}

function getUserAddr(el, orderId){
	$.ajax({
		async : true,
		cache : false,
		type : 'post',
		dataType : 'json',
		data : {orderId:orderId},
		url : CONTEXT_PATH + '/order/getUserAddr',
		success : function(response) {
			if (response) {
				alert(response.msg);
			} else {
				alert('请求失败!');
			}
		},
		error : function() {
			alert('请求失败!');
		}
	});
	
}

function viewSeat(orderId){
	$.ajax({
		async : true,
		cache : false,
		type : 'post',
		dataType : 'json',
		data : {orderId:orderId},
		url : CONTEXT_PATH + '/order/view/seat',
		success : function(response) {
			if (response) {
				alert(response.msg);
			} else {
				alert('请求失败!');
			}
		},
		error : function() {
			alert('请求失败!');
		}
	});
	
}