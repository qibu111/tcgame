/**
 * 查询活动列表
 */
function queryActivityList(){
	document.activityQueryForm.pageIndex.value = 1;
	document.activityQueryForm.submit();
}


/**
 * 查询活动报名列表
 */
function queryActivityEnrollList(){
	document.activityEnrollQueryForm.pageIndex.value = 1;
	document.activityEnrollQueryForm.submit();
}


/**
 * 提交添加活动信息请求
 */
function doActivityAdd(){
	var valid = activityAddFormValidator.form();
	if(valid && validateForm()){
		var startTimeOriginal = $("#startTime").val();
		var endTimeOriginal = $("#endTime").val();
		$("#startTime").val(startTimeOriginal + ":00");
		$("#endTime").val(endTimeOriginal + ":00");
		
		$.ajax({
			async : true,
			cache : false,
			type : 'post',
			dataType : 'json',
			data : $(document.activityAddForm).serialize(),
			url : document.activityAddForm.action,
			success : function(response) {
				if (response) {
					alert(response.msg);
					if(response.success) {
						window.location.href = CONTEXT_PATH + '/activity/list';
					}
				} else {
					alert('请求失败!');
				}
			},
			error : function() {
				alert('请求失败!');
			},
			complete : function() {
				$("#startTime").val(startTimeOriginal);
				$("#endTime").val(endTimeOriginal);
			}
		});
	}
}

/**
 * 提交编辑活动信息请求
 */
function doActivityEdit(){
	var valid = activityEditFormValidator.form();
	
	if(valid && validateForm()){
		
		var startTimeOriginal = $("#startTime").val();
		var endTimeOriginal = $("#endTime").val();
		$("#startTime").val(startTimeOriginal + ":00");
		$("#endTime").val(endTimeOriginal + ":00");
		
		$.ajax({
			async : true,
			cache : false,
			type : 'post',
			dataType : 'json',
			data : $(document.activityEditForm).serialize(),
			url : document.activityEditForm.action,
			success : function(response) {
				if (response) {
					alert(response.msg);
					if(response.success) {
						window.location.href = CONTEXT_PATH + '/activity/list';
					}
				} else {
					alert('请求失败!');
				}
			},
			error : function() {
				alert('请求失败!');
			},
			complete : function() {
				$("#startTime").val(startTimeOriginal);
				$("#endTime").val(endTimeOriginal);
			}
		});
	}
}

/**
 * 校验form是否合法以及设置某些空值
 */
function validateForm(){
	var recordArr = $.find("input[name^='citys']");
	if(recordArr != null && recordArr.length != 0){
		var citysCheckFlag = false;
		$.each(recordArr,function(){
			if($(this).attr("checked")){
				citysCheckFlag = true;
				return;
			}
		});
		if(!citysCheckFlag){
			alert("请选择活动地区!");
			return false;
		}
	}
	
	var typeValue = $('input[name="type"]:checked').val();
	//抢票
	if(typeValue == 1){
		if($("#brief").val() == null || $("#brief").val() == ""){
			alert("请输入活动简介!");
			return false;
		}
		if($("#discountId").val() == null || $("#discountId").val() == ""){
			alert("请输入关联抢票优惠!");
			return false;
		}
		$("#enrollRequirement").val("");
	}else if(typeValue == 2){//报名
		if($("#brief").val() == null || $("#brief").val() == ""){
			alert("请输入活动简介!");
			return false;
		}
		$("#discountId").val("");
	}else{//活动
		$("#enrollRequirement").val("");
		$("#discountId").val("");
		$("#brief").val("");
	}
	
	return true;
}

/**
 * 活动类型改变事件
 */
function changeType(type){
	//抢票
	if(type == 1){
		$("#activityBrief").css("display", "table-row");
		$("#enroll").css("display", "none");
		$("#robTicket").css("display", "table-row");
	}else if(type == 2){//报名
		$("#activityBrief").css("display", "table-row");
		$("#robTicket").css("display", "none");
		$("#enroll").css("display", "table-row");
	}else{//活动
		$("#activityBrief").css("display", "none");
		$("#enroll").css("display", "none");
		$("#robTicket").css("display", "none");
	}
}


/**
 * 全选或取消
 */
function selectAllRecord(obj){
	var recordArr = $.find("input[name^='citys']");
	if($(obj).attr("checked")){
		if(recordArr!=null && recordArr.length>0){
			
			$.each(recordArr,function(){
				$(this).attr("checked",true);
			});
		}
	}else{
		if(recordArr!=null && recordArr.length>0){
			$.each(recordArr,function(){
				$(this).attr("checked",false);
			});
		}
	}
}

/**
 * 判断是否全选或取消全选
 */
function checkBoxListen(obj){
	
	if($(obj).attr("checked")){
		var recordArr = $.find("input[name^='citys']");
		if(recordArr!=null && recordArr.length>0){
			var checkAllFalg = true;
			$.each(recordArr,function(){
				if(!$(this).attr("checked")){
					checkAllFalg = false;
					return;
				}
			});
			if(checkAllFalg) {
				$("#checkBoxAll").attr("checked",true);
			}
		}
	}else{
		$("#checkBoxAll").attr("checked",false);
	}
}

function initCheckAll(){
	var recordArr = $.find("input[name^='citys']");
	if(recordArr!=null && recordArr.length>0){
		var checkAllFalg = true;
		$.each(recordArr,function(){
			if(!$(this).attr("checked")){
				checkAllFalg = false;
				return;
			}
		});
		if(checkAllFalg) {
			$("#checkBoxAll").attr("checked",true);
		}
	}
}
