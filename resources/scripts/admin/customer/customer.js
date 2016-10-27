var validateOptions = {
	ignore: ".form-validate-ignore",
	messageClass: "validate-message", // must be required
	messageTextClass: "validate-message-text", // must be required
	tipsClass: "validate-message-tips",
	errorClass: "validate-message-error",
	validClass: "validate-message-valid",
	rules: {
		name: {
			required: true
		},
		nickname: {
			required: true
		},
		qq: {
			required: true
		},
		phone: {
			required: true
		},
		email: {
			required: true,
			email: true
		}
	},
	messages: {
		name: {
			required: "请输入客服名称!"
		},
		nickname: {
			required: "请输入客服昵称!"
		},
		qq: {
			required: "请输入客服QQ!"
		},
		phone: {
			required: "请输入客服电话!"
		},
		email: {
			required: "请输入客服邮箱!",
			email: "必须输入正确的邮箱格式"
		}
	}
};

var customerAddFormValidator = $(document.customerAddForm).validate(validateOptions);
var customerEditFormValidator = $(document.customerEditForm).validate(validateOptions);

/**
 * 查询活动列表
 */
function queryCustomerList(){
	document.custQueryForm.pageIndex.value = 1;
	document.custQueryForm.submit();
}

/**
 * 提交新增客服请求
 */
function doCustomerAdd(){
    var valid = customerAddFormValidator.form();	
	if(valid){
		$.ajax({
			async : true,
			cache : false,
			type : 'post',
			dataType : 'json',
			data : $(document.customerAddForm).serialize(),
			url : document.customerAddForm.action,
			success : function(response) {
				if (response) {
					alert(response.msg);
					if(response.success) {
						window.location.href = CONTEXT_PATH + '/customer/list';
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
 * 提交更新客服请求
 */
function doCustomerEdit(){
	var valid = customerEditFormValidator.form();	
	if(valid){
		$.ajax({
			async : true,
			cache : false,
			type : 'post',
			dataType : 'json',
			data : $(document.customerEditForm).serialize(),
			url : document.customerEditForm.action,
			success : function(response) {
				if (response) {
					alert(response.msg);
					if(response.success) {
						window.location.href = CONTEXT_PATH + '/customer/list';
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
 * 提交删除客服请求
 */
function doCustomerDel(id){
	if (confirm('确定删除?')) {		
		$.ajax({
			async : true,
			cache : false,
			type : 'post',
			dataType : 'json',
			data : {id:id},
			url : CONTEXT_PATH + '/customer/dele',
			success : function(response) {
				if (response) {
					alert(response.msg);
					if(response.success) {
						window.location.href = CONTEXT_PATH + '/customer/list';
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
