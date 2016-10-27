function queryShowList(){
	document.showQueryForm.orderby.value = DEFAULT_SHOW_QUERY_LIST_ORDER_BY;
	document.showQueryForm.order.value = DEFAULT_SHOW_QUERY_LIST_ORDER;
	document.showQueryForm.pageIndex.value = 1;
	document.showQueryForm.submit();
}

/**
 * 删除演出消息
 * @param el
 * @param id
 */
function delShow(el, id){
	if(id && confirm('你确定要删除该演出消息?')){
		$.ajax({
			async : true,
			cache : false,
			type : 'post',
			dataType : 'json',
			data : 'id=' + id,
			url : CONTEXT_PATH + '/show/delete',
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
 * 
 * @param el
 * @param id
 */
function updateShowStatus(el, id){
	el = $(el);
	if(id){
		var url = null;
		var status = el.attr("data-status");
		var currStatus = null;
		var nextStatus = null;
		if(status != SHOW_STATUS_ONLINE.statusCode){
			url = CONTEXT_PATH + '/show/online';
			currStatus = SHOW_STATUS_INITIAL;
			nextStatus = SHOW_STATUS_ONLINE;
			if(!confirm('您确认将该演出上架?')){
				return;
			}
		}else if(status == SHOW_STATUS_ONLINE.statusCode){
			url = CONTEXT_PATH + '/show/offline';
			currStatus = SHOW_STATUS_ONLINE;
			nextStatus = SHOW_STATUS_OFFLINE;
			if(!confirm('您确认将该演出下架?')){
				return;
			}
		}
		if(url){
			$.ajax({
				async : true,
				cache : false,
				type : 'post',
				dataType : 'json',
				data : 'id=' + id,
				url : url,
				success : function(response) {
					if (response) {
						alert(response.msg);
						if(response.success) {
							document.showQueryForm.submit(); //refresh
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
}