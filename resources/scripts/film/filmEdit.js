var validateOptions = {
	ignore: ".form-validate-ignore",
	messageClass: "validate-message", // must be required
	messageTextClass: "validate-message-text", // must be required
	tipsClass: "validate-message-tips",
	errorClass: "validate-message-error",
	validClass: "validate-message-valid",
	rules: {
		filmId: {
			required: true,
			regex: /^\d+$/
		},
		filmName: {
			required: true,
			maxlength: 20
		},
		screenType: {
			required: true
		},
		score: {
			required: true,
			regex: /^\d+(\.\d{1})?$/
		},
		filmType: {
			required: true,
			maxlength: 20
		},
		country: {
			required: true,
			maxlength: 50
		},
		duration: {
			required: true,
			regex: /^[1-9]\d*$/
		},
		language: {
			maxlength: 20
		},
		director: {
			required: true,
			maxlength: 100
		},
		actor: {
			required: true,
			maxlength: 255
		},
		showDate: {
			required: true,
			dateISO: true
		},
		brightPoint: {
			maxlength: 150
		},
		filmDesc: {
			required: true
		},
		posterPath1: {
			required: true
		},
		posterPath2: {
			required: true
		}
	},
	messages: {
		filmId: {
			required: "影片ID为空!",
			regex: "影片ID不合法!"
		},
		filmName: {
			required: "请输入影片名称!",
			maxlength: "影片名称不超过{0}个字符!"
		},
		screenType: {
			required: "请选择放映类型!"
		},
		score: {
			required: "请输入影片评分!",
			regex: "影片评分必须为非负整数或小数(小数位仅1位)!"
		},
		filmType: {
			required: "请输入影片类型!",
			maxlength: "影片类型不超过{0}个字符!"
		},
		country: {
			required: "请输入影片产地!",
			maxlength: "影片产地不超过{0}个字符!"
		},
		duration: {
			required: "请输入影片播放时长",
			regex: "影片播放时长必须是正整数"
		},
		language: {
			maxlength: "影片语言不超过{0}个字符!"
		},
		director: {
			required: "请输入影片导演",
			maxlength: "影片导演不超过{0}个字符!"
		},
		actor: {
			required: "请输入影片演员",
			maxlength: "影片演员不超过{0}个字符!"
		},
		showDate: {
			required: "请输入影片上映日期",
			dateISO: "影片上映日期格式必须是'yyyy-MM-dd'!"
		},
		brightPoint: {
			maxlength: "影片亮点不超过{0}个字符!"
		},
		filmDesc: {
			required: "请输入影片简介!"
		},
		posterPath1: {
			required: "请上传影片海报封面图片(大图)!"
		},
		posterPath2: {
			required: "请上传影片海报封面图片(小图)!"
		}
	}
};

var filmEditFormValidator = $(document.filmEditForm).validate(validateOptions);
/**
 * 提交添加影片信息请求
 */
function doFilmEdit(){
	var valid = filmEditFormValidator.form();
	if(valid){
		$.ajax({
			async : true,
			cache : false,
			type : 'post',
			dataType : 'json',
			data : $(document.filmEditForm).serialize(),
			url : document.filmEditForm.action,
			success : function(response) {
				if (response) {
					alert(response.msg);
					if(response.success) {
						window.location.href = CONTEXT_PATH + '/film/list';
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
