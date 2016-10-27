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
//		categoryId : {
//			required : true
//		},
		pubDate : {
			required : true
		},
		content : {
			required : true
		}
		
	},
	messages : {
		title : {
			required : "请输入公告标题!",
			maxlength : "公告标题不超过{0}个字符!"
		},
		keywords : {
			required : "请输入关键字!",
			maxlength : "关键字不超过{0}个字符!"
		},
//		categoryId : {
//			required : "请选择公告分类!"
//		},
		pubDate : {
			required : "请输入开始时间"
		},
		content : {
			required : "请输入内容!"
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
						window.location.href = CONTEXT_PATH + '/notice/list';
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
