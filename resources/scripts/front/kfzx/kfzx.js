/**
 * 提交新增BUG请求
 */
function doFeedBackAdd(){	
	var title = $("#title").val();
	if(title == ""){
		alert("请输入反馈主题！");
		return false;
	}
	var message = $("#message").val();
	if(message == ""){
		alert("请输入反馈内容！");
		return false;
	}
	var contactInfo1 = $("#contactInfo1").val();
	if(contactInfo1 == ""){
		alert("请输入联系方式！");
		return false;
	}
	
	$.ajax({
		async : true,
		cache : false,
		type : 'post',
		dataType : 'json',
		data : $(document.feedBackForm).serialize(),
		url : document.feedBackForm.action,
		success : function(response) {
			if (response) {
				alert(response.msg);
				if(response.success) {
					window.location.href = CONTEXT_PATH + '/kfzx/toAddBug';
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