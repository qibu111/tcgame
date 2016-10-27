var validateFqaTypeOptions = {
	ignore: ".form-validate-ignore",
	messageClass: "validate-message", // must be required
	messageTextClass: "validate-message-text", // must be required
	tipsClass: "validate-message-tips",
	errorClass: "validate-message-error",
	validClass: "validate-message-valid",
	rules: {
		fqatypeinfo: {
			required: true
		},
		sort: {
			required: true,
			digits: true
		}
	},
	messages: {
		fqatypeinfo: {
			required: "请输入FQA类型名称!"
		},
		sort: {
			required: "请输入FQA类型排序号!",
			digits: "排序号必须是正整数!"
		}
	}
};

var fqatypeAddFormValidator = $(document.fqatypeAddForm).validate(validateFqaTypeOptions);
var fqatypeEditFormValidator = $(document.fqatypeEditForm).validate(validateFqaTypeOptions);

var validateFqaInfoOptions = {
		ignore: ".form-validate-ignore",
		messageClass: "validate-message", // must be required
		messageTextClass: "validate-message-text", // must be required
		tipsClass: "validate-message-tips",
		errorClass: "validate-message-error",
		validClass: "validate-message-valid",
		rules: {
			title: {
				required: true
			},
			message: {
				required: true
			},
			sort: {
				required: true,
				digits: true
			}
		},
		messages: {
			title: {
				required: "请输入FQA标题!"
			},
			message: {
				required: "请输入FQA内容!"
			},
			sort: {
				required: "请输入FQA排序号!",
				digits: "排序号必须是正整数!"
			}
		}
	};

	var fqainfoAddFormValidator = $(document.fqaInfoAddForm).validate(validateFqaInfoOptions);
	var fqainfoEditFormValidator = $(document.fqaInfoEditForm).validate(validateFqaInfoOptions);

/**
 * 查询FQA类型列表
 */
function queryFqaTypeList(){
	document.fqaTypeForm.pageIndex.value = 1;
	document.fqaTypeForm.submit();
}

/**
 * 提交新增FQA类型请求
 */
function doFqaTypeAdd(){
	var valid = fqatypeAddFormValidator.form();	
	if(valid){
		$.ajax({
			async : true,
			cache : false,
			type : 'post',
			dataType : 'json',
			data : $(document.fqatypeAddForm).serialize(),
			url : document.fqatypeAddForm.action,
			success : function(response) {
				if (response) {
					alert(response.msg);
					if(response.success) {
						window.location.href = CONTEXT_PATH + '/fqa/faqtypelist';
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
 * 提交更新FQA类型请求
 */
function doFqaTypeEdit(){
	var valid = fqatypeEditFormValidator.form();	
	if(valid){
		$.ajax({
			async : true,
			cache : false,
			type : 'post',
			dataType : 'json',
			data : $(document.fqatypeEditForm).serialize(),
			url : document.fqatypeEditForm.action,
			success : function(response) {
				if (response) {
					alert(response.msg);
					if(response.success) {
						window.location.href = CONTEXT_PATH + '/fqa/faqtypelist';
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
 * 提交删除FQA类型请求
 */
function doFqaTypeDel(id){
	if (confirm('确定删除?')) {		
		$.ajax({
			async : true,
			cache : false,
			type : 'post',
			dataType : 'json',
			data : {id:id},
			url : CONTEXT_PATH + '/fqa/delfqatype',
			success : function(response) {
				if (response) {
					alert(response.msg);
					if(response.success) {
						window.location.href = CONTEXT_PATH + '/fqa/faqtypelist';
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
 * 查询FQA信息列表
 */
function queryFqaInfoList(){
	document.fqainfoQueryForm.pageIndex.value = 1;
	document.fqainfoQueryForm.submit();
}

/**
 * 提交新增FQA请求
 */
function doFqaInfoAdd(){
	var valid = fqainfoAddFormValidator.form();	
	if(valid){
		$.ajax({
			async : true,
			cache : false,
			type : 'post',
			dataType : 'json',
			data : $(document.fqaInfoAddForm).serialize(),
			url : document.fqaInfoAddForm.action,
			success : function(response) {
				if (response) {
					alert(response.msg);
					if(response.success) {
						window.location.href = CONTEXT_PATH + '/fqa/list';
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
 * 提交删除FQA请求
 */
function doFqaInfoDel(id){
	if (confirm('确定删除?')) {		
		$.ajax({
			async : true,
			cache : false,
			type : 'post',
			dataType : 'json',
			data : {id:id},
			url : CONTEXT_PATH + '/fqa/delfqainfo',
			success : function(response) {
				if (response) {
					alert(response.msg);
					if(response.success) {
						window.location.href = CONTEXT_PATH + '/fqa/list';
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
 * 提交更新FQA请求
 */
function doFqaInfoEdit(){
	var valid = fqainfoEditFormValidator.form();	
	if(valid){
		$.ajax({
			async : true,
			cache : false,
			type : 'post',
			dataType : 'json',
			data : $(document.fqaInfoEditForm).serialize(),
			url : document.fqaInfoEditForm.action,
			success : function(response) {
				if (response) {
					alert(response.msg);
					if(response.success) {
						window.location.href = CONTEXT_PATH + '/fqa/list';
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
