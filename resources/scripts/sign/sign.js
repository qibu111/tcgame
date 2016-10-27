var validateOptions = {
	ignore: ".form-validate-ignore",
	messageClass: "validate-message", // must be required
	messageTextClass: "validate-message-text", // must be required
	tipsClass: "validate-message-tips",
	errorClass: "validate-message-error",
	validClass: "validate-message-valid",
	rules: {
		beginMoney: {
			required: true,
			regex: /^\d+$/
		},
		endMoney: {
			required: true,
			regex: /^\d+$/
		},
		step: {
			required: true,
			regex: /^[1-3]$/
		},
		rule: {
			required: true,
			regex: /^[\W\w\u4e00-\u9fa5]{1,255}$/
		},
		shareContent: {
			required: true,
			regex: /^[\W\w\u4e00-\u9fa5]{1,500}$/
		}
	},
	messages: {
		beginMoney: {
			required: "请输入签到起始奖励金额!",
			regex: "签到奖励起始金额不合法!"
		},
		endMoney: {
			required: "请输入签到结束奖励金额!",
			regex: "签到奖励结束金额不合法!"
		},
		step: {
			required: "请输入签到步骤!",
			regex: "签到步骤必须是1~3!"
				
		},
		rule: {
			required: "请输入签到规则说明!",
			regex:"签到规则说明不能大于255字符!"
		},
		shareContent: {
			required: "请输入签到分享内容!",
			regex:"签到分享内容不能大于500字符!"
		}
	}
};

var signEditFormValidator = $(document.signEditForm).validate(validateOptions);

/**
 * 查询活动列表
 */
function querySignList(){
	document.signQueryForm.pageIndex.value = 1;
	document.signQueryForm.submit();
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
function doSignEdit(){
	var valid = signEditFormValidator.form();
	if(valid){
		var beginMoney = new Number($("#beginMoney").val());
		var endMoney = new Number($("#endMoney").val());
		if(endMoney < beginMoney || endMoney > 1000){
			alert("签到奖励结束金额不能小于起始金额，且结束金额不能大于1000");
			return;
		}
		
		$.ajax({
			async : true,
			cache : false,
			type : 'post',
			dataType : 'json',
			data : $(document.signEditForm).serialize(),
			url : document.signEditForm.action,
			success : function(response) {
				if (response) {
					alert(response.msg);
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