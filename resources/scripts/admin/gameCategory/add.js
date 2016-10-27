var validateOptions = {
	ignore : ".form-validate-ignore",
	messageClass : "validate-message", // must be required
	messageTextClass : "validate-message-text", // must be required
	tipsClass : "validate-message-tips",
	errorClass : "validate-message-error",
	validClass : "validate-message-valid",
	rules : {
		name : {
			required : true,
			maxlength : 20
		},
		sort : {
			regex : /^\d+(\.\d{1})?$/,
			maxlength : 5
		}
	},
	messages : {
		name : {
			required : "请输入游戏分类名称!",
			maxlength : "分类名称不超过{0}个字符!"
		},
		sort : {
			regex : "请输入数字",
			maxlength : "最大长度不超过5个字符"
		}
	}
};

var filmAddFormValidator = $(document.filmAddForm).validate(validateOptions);
/**
 * 提交添加游戏信息请求
 */
function doFilmAdd() {
	var valid = filmAddFormValidator.form();
	if (valid) {

		$.ajax({
			async : true,
			cache : false,
			type : 'post',
			dataType : 'json',
			data : $(document.filmAddForm).serialize(),
			url : document.filmAddForm.action,
			success : function(response) {
				if (response) {
					alert(response.msg);
					if (response.success) {
						window.location.href = CONTEXT_PATH + '/gameCategory/list';
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

