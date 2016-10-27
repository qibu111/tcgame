/**
 * 查询推送消息列表
 */
function queryMessageList(){
	document.wifiQueryForm.orderby.value = DEFAULT_MESSAGE_QUERY_LIST_ORDER_BY;
	document.wifiQueryForm.order.value = DEFAULT_MESSAGE_QUERY_LIST_ORDER;
	document.wifiQueryForm.pageIndex.value = 1;
	document.wifiQueryForm.submit();
}
/**
 * 修改状态
 * @param el
 * @param id
 */
function updateState(el,id){
	if(id && confirm('你确定要'+$(el).text()+'?')){
		$.ajax({
			async : true,
			cache : false,
			type : 'post',
			dataType : 'json',
			data : {id:id,state:($(el).text()=="关闭"?"2":"1")},
			url : CONTEXT_PATH + '/wifi/updateState',
			success : function(response) {
				if (response) {
					alert(response.msg);
					if(response.success){
						$(el).text(($(el).text()=="关闭"?"恢复正常":"关闭"));
						$(el).parent().prev().text(($(el).text()=="关闭"?"正常服务":"已关闭"))
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
function changeProvince(el){
	$.ajax({
		async : true,
		cache : false,
		type : 'post',
		dataType : 'json',
		data : {id:$(el).val()},
		url : CONTEXT_PATH + '/wifi/getCityList',
		success : function(response) {
			$("#cityId").empty();
			var option = $("<option>").val("").text("--请选择--");
			$("#cityId").append(option);
			if(response==""){

			}else{
				$.each(response, function(p1, p2){
					var option = $("<option>").val(p2.cityId).text(p2.city);
					$("#cityId").append(option);
				});
			}
		}
	});
}