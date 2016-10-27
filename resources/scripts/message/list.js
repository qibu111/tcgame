/**
 * 查询推送消息列表
 */
function queryMessageList(){
	document.messageQueryForm.orderby.value = DEFAULT_MESSAGE_QUERY_LIST_ORDER_BY;
	document.messageQueryForm.order.value = DEFAULT_MESSAGE_QUERY_LIST_ORDER;
	document.messageQueryForm.pageIndex.value = 1;
	document.messageQueryForm.submit();
}
/**
 * 删除推送消息
 * @param el
 * @param id
 */
function delMessage(el, id){
	if(id && confirm('你确定要删除该推送消息?')){
		$.ajax({
			async : true,
			cache : false,
			type : 'post',
			dataType : 'json',
			data : 'id=' + id,
			url : CONTEXT_PATH + '/message/delete',
			success : function(response) {
				if (response) {
					alert(response.msg);
					if(response.success){
						$(el).closest("tr").remove();
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
/**
 * 发送推送消息
 * @param el
 * @param id
 */
function pushMessage(el, id){
	if(id && confirm('你确定要发送该推送消息?')){
		$.ajax({
			async : true,
			cache : false,
			type : 'post',
			dataType : 'json',
			data : 'id=' + id,
			url : CONTEXT_PATH + '/message/push',
			success : function(response) {
				if (response) {
					alert(response.msg);
					if(response.success){
						$(el).closest("tr").children("td").eq(6).html('<label class="status1">已推送</label>');
						$(el).closest("tr").children("td").eq(7).html(response.retObj);
						if($(el).closest("tr").children("td").eq(2).html()!='系统消息' || $(el).closest("tr").children("td").eq(5).html()=='消息内容详情') {
							$(el).closest("td").html('<a href="' + CONTEXT_PATH + '/message/detail?id=' + id + '">预览</a>');
						}else{
							$(el).closest("td").html('');
						}
					}else{
						$(el).closest("tr").children("td").eq(6).html('<label class="status2">推送失败</label>');
						$(el).closest("tr").children("td").eq(7).html(response.retObj);
						if($(el).closest("tr").children("td").eq(2).html()!='系统消息' || $(el).closest("tr").children("td").eq(5).html()=='消息内容详情') {
							$(el).closest("td").html('<a onclick="pushMessage(this,' + id + ');" href="javascript:;">发送</a>  &nbsp;&nbsp;<a href="http://t.qianbao666.com/api/resources/action/announcement-detail.htm?id=' + id + '">预览</a> ');
						}else{
							$(el).closest("td").html('<a onclick="pushMessage(this,' + id + ');" href="javascript:;">发送</a>');
						}

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