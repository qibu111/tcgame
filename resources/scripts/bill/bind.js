function checkUserBindSize(el){
	if(el.value && /^[1-9]{1}\d*$/.test(el.value)){
		var totalCount = parseInt(document.bindUserForm.totalCount.value);
		var value = parseInt(el.value);
		if(totalCount % value == 0){
			$("#maxBindUserCount").text(totalCount / value);
		}else{
			$("#maxBindUserCount").text('');
		}
	}else{
		$("#maxBindUserCount").text('');
	}
}

function importBindUser(btn){
	btn = $(btn);
	if(btn.attr("data-submited")){
		alert('正在导入中,请不要重复提交表单!');
		return;
	}
	var el = $(document.bindUserForm.userBindSize);
	var totalCount = document.bindUserForm.totalCount.value;
	var userBindSize = document.bindUserForm.userBindSize.value;
	var userBindLimit = document.bindUserForm.userBindLimit.value;
	if(!userBindSize){
		alert('请输入每个用户分发的兑奖券张数!');
		el.focus();
		return;
	}
	if(!/^[1-9]{1}\d*$/.test(userBindSize)){
		alert('每个用户分发的兑奖券张数必须是正整数!');
		el.focus();
		return;
	}
	if(parseInt(userBindSize) > parseInt(userBindLimit)){
		alert('每个用户分发数量不能大于【每个账户最多可以绑定票券张数】');
		el.focus();
		return;
	}
	if(parseInt(totalCount) % parseInt(userBindSize)){
		alert('【票券总数量】必须能被【每个用户分发的兑奖券张数】整除!');
		el.focus();
		return;
	}
	if(!document.bindUserForm.file.value){
		alert('请选择导入数据文件!');
		return;
	}
	var filename = document.bindUserForm.file.value.toUpperCase();
	suffix = filename.substring(filename.lastIndexOf('.') + 1);
	if(suffix != 'XLS' && suffix != 'XLSX'){
		alert('导入数据文件必须为Excel格式文件!');
		return;
	}
	if(!document.bindUserForm.userBindSize.value){
		alert('请输入每个用户分发的兑奖券机会!');
		$(document.bindUserForm.userBindSize).focus();
		return;
	}
	btn.attr("data-submited", true);
	btn.text("正在导入中...");
	document.bindUserForm.submit();
}