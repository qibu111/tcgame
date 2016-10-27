/**
 * 查询活动列表
 */
function queryFeedBackList(){
	document.feedQueryForm.pageIndex.value = 1;
	document.feedQueryForm.submit();
}

/**
 * 提交编辑请求
 */
function doFeedBackEdit(){
	$.ajax({
		async : true,
		cache : false,
		type : 'post',
		dataType : 'json',
		data : $(document.feedBackEditForm).serialize(),
		url : document.feedBackEditForm.action,
		success : function(response) {
			if (response) {
				alert(response.msg);
				if(response.success) {
					window.location.href = CONTEXT_PATH + '/feedback/list';
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
