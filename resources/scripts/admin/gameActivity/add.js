var validateOptions = {
	ignore : ".form-validate-ignore",
	messageClass : "validate-message", // must be required
	messageTextClass : "validate-message-text", // must be required
	tipsClass : "validate-message-tips",
	errorClass : "validate-message-error",
	validClass : "validate-message-valid",
	rules : {
		title : {
			required : true,
			maxlength : 30
		},
		keywords : {
			required : true,
			maxlength : 30
		},
//		actAddr : {
//			required : true,
//			maxlength : 500
//		},
		actStartDate : {
			required : true
		},
		actEndDate : {
			required : true
		},
		posterPath1 : {
			required : true
		},
		actContent : {
			required : true
		}
		
	},
	messages : {
		title : {
			required : "请输入活动标题!",
			maxlength : "活动标题不超过{0}个字符!"
		},
		keywords : {
			required : "请输入关键字!",
			maxlength : "关键字不超过{0}个字符!"
		},
//		actAddr : {
//			required : "请输入链接地址!",
//			maxlength : "链接地址不超过{0}个字符!"
//		},
		actStartDate : {
			required : "请输入开始时间"
		},
		actEndDate : {
			required : "请输入结束时间"
		},
		posterPath1 : {
			required : "请上传活动海报!"
		},
		actContent : {
			required : "请输入活动内容!"
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
			// fileElementId: 'file', // 上传文件的id、name属性名
			data : $(document.filmAddForm).serialize(),
			url : document.filmAddForm.action,
			success : function(response) {
				if (response) {
					alert(response.msg);
					if (response.success) {
						window.location.href = CONTEXT_PATH + '/gameActivity/list';
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
 * 海报大/小图上传控件
 */
$(".fui-iupload-btn")
		.iupload(
				{
					iuploadListExtClass : "iupload-list-filmposter",
					maxUpload : 1,
					uploadForm : "filmPosterUploadForm",
					onUploadBoxRemove : function($uploadBox, $removeElement) {
						$uploadBox.remove();
						$("#posterPath" + this.attr("data-uploadtype")).val(''); // 清除隐藏域的值
					},
					beforeUpload : function($uploadBox, uploadSerialNo) {
						var options = this.data("options");
						options.uploadForm.find(
								"input[type='hidden'][name='uploadType']").val(
								this.attr("data-uploadtype"));
						return true;
					},
					uploadCallback : function($uploadBox, resultObj) {
						if (resultObj) {
							var uploadType = resultObj.uploadType;
							var options = this.data("options");
							var $imgWrapper = $uploadBox.children("a");
							$imgWrapper.removeClass(options.uploadingClass);
							if (resultObj.success) {
								var photoOriginalFileName = resultObj.retObj.photoOriginalFileName;
								var photoRelativePath = resultObj.retObj.photoRelativePath;
								$imgWrapper.append('<img title="'
										+ photoOriginalFileName + '" src="'
										+ CONTEXT_PATH + photoRelativePath
										+ '" />');
								$("#posterPath" + uploadType).val(
										photoRelativePath);
							} else {
								$imgWrapper.addClass(options.uploadErrorClass)
										.append(
												'<label>' + resultObj.msg
														+ '</label>');
								$("#posterPath" + uploadType).val('');
							}
						} else {
							alert("上传失败!");
						}
					}
				});
