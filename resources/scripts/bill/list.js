/**
 * 查询票券信息列表
 * @param el
 */
function queryBillList(el){
	document.billQueryForm.orderby.value = DEFAULT_BILL_QUERY_LIST_ORDER_BY;
	document.billQueryForm.order.value = DEFAULT_BILL_QUERY_LIST_ORDER;
	document.billQueryForm.pageIndex.value = 1;
	document.billQueryForm.submit();
}

/**
 * 删除票券消息
 * @param el
 * @param id
 */
function delBill(el, id){
	if(id && confirm('你确定要删除该票券消息?')){
		$.ajax({
			async : true,
			cache : false,
			type : 'post',
			dataType : 'json',
			data : 'id=' + id,
			url : CONTEXT_PATH + '/bill/delete',
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
function updateBillStatus(el, id){
	el = $(el);
	if(id){
		var url = null;
		var status = el.attr("data-status");
		var currStatus = null;
		var nextStatus = null;
		if(status == BILL_STATUS_INITIAL.statusCode || status == BILL_STATUS_OFFLINE.statusCode){
			url = CONTEXT_PATH + '/bill/online';
			currStatus = BILL_STATUS_INITIAL;
			nextStatus = BILL_STATUS_ONLINE;
			/*var startDate = new Date(Date.parse((el.attr("data-startdate") + " 00:00:00").replace(/-/g,"/")));
			var endDate = new Date(Date.parse((el.attr("data-enddate") + " 23:59:59").replace(/-/g,"/")));
			var now = new Date();
			if(startDate < now.format('yyyy-MM-dd') || endDate < now){
				alert('开始时间/结束时间早于当前时间,无法上架!');
				return;
			}*/
			if(!confirm('您确认将该票券上架?')){
				return;
			}
		}else if(status == BILL_STATUS_ONLINE.statusCode){
			url = CONTEXT_PATH + '/bill/offline';
			currStatus = BILL_STATUS_ONLINE;
			nextStatus = BILL_STATUS_OFFLINE;
			if(!confirm('您确认将该票券下架?')){
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
							document.billQueryForm.submit(); //refresh
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