/**
 * 查询APP启动画面列表
 */
function queryAppBootList(){
	document.appBootQueryForm.orderby.value = DEFAULT_APP_BOOT_QUERY_LIST_ORDER_BY;
	document.appBootQueryForm.order.value = DEFAULT_APP_BOOT_QUERY_LIST_ORDER;
	document.appBootQueryForm.submit();
}
/**
 * 删除APP启动画面
 * @param el
 * @param id
 */
function delAppBoot(el, id){
	if(id && confirm('你确定要删除该APP启动画面?')){
		$.ajax({
			async : true,
			cache : false,
			type : 'post',
			dataType : 'json',
			data : 'id=' + id,
			url : CONTEXT_PATH + '/boot/delete',
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
 * 上下架
 * @param el
 * @param id
 */
function updateStatus(el, id){
	el = $(el);
	var status = el.attr("data-status");
	var statusName = el.attr("data-statusname");
	var targetStatus = '';
	var targetStatusName = '';
	var url = '#';
	if(status == '1'){
		url = CONTEXT_PATH + '/boot/off';
		targetStatus = '0';
		targetStatusName = '下架';
	}else if(status == '0'){
		url = CONTEXT_PATH + '/boot/on';
		targetStatus = '1';
		targetStatusName = '上架';
	}
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
				if(response.success){
					$(el).closest("tr").children("td:eq(2)").html('<label class="status' + targetStatus + '">' + targetStatusName + '</label>');
					el.attr("data-status", targetStatus);
					el.attr("data-statusname", targetStatusName);
					el.text(statusName);
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