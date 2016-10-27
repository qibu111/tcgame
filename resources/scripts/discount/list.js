/**
 * 查询促销列表
 */
function queryDiscountList(){
	document.discountQueryForm.pageIndex.value = 1;
	document.discountQueryForm.submit();
}
/**
 * 删除促销
 * @param el
 * @param id
 */
function deleteDiscountInfo(el, id){
	if(id && confirm('你确定要删除该促销信息?')){
		$.ajax({
			async : true,
			cache : false,
			type : 'post',
			dataType : 'json',
			data : 'id=' + id,
			url : CONTEXT_PATH + '/discount/delete',
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
 * 促销上下架
 * @param el
 * @param id
 */
function oloDiscount(el, id){
	el = $(el);
	var status = el.attr("data-status");
	if(id && confirm('你确定要将该促销信息' + el.text() + '?')){
		var url = null;
		if(status == 1){ //当前是上架状态?执行下架
			url = CONTEXT_PATH + '/discount/offline';
		}else if(status == 2){ //当前是未上架?执行上架
			url = CONTEXT_PATH + '/discount/online';
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
						document.discountQueryForm.submit();
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