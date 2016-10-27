
var validateOptions = {
	ignore: ".form-validate-ignore",
	messageClass: "validate-message", // must be required
	messageTextClass: "validate-message-text", // must be required
	tipsClass: "validate-message-tips",
	errorClass: "validate-message-error",
	validClass: "validate-message-valid",
	rules: {
		bootImgPath: {
			required: true
		},
		orderIndex: {
			required: true,
			digits: true
		}
	},
	messages: {
		bootImgPath: {
			required: "请上传启动图片!"
		},
		orderIndex: {
			required: "请填排序号!",
			digits: "排序号必须是正整数!"
		}
	}
};

var appBootAddFormValidator = $(document.appBootAddForm).validate(validateOptions);

/**
 * 配置图片上传控件
 */
$(document).ready(function(){
	$("#bootImgUploadBtn").iupload({
		iuploadListExtClass: "iupload-list-bootimg",
		maxUpload: 1,
		imageFormats: ["jpg", "jpeg", "png", "gif"],
		uploadForm: "bootImgUploadForm",
		uploadCallback: function($uploadBox, resultObj){
			if(resultObj){
				var options = this.data("options");
				var $imgWrapper = $uploadBox.children("a");
				$imgWrapper.removeClass(options.uploadingClass);
				if(resultObj.success){
					var photoOriginalFileName = resultObj.retObj.photoOriginalFileName;
					var photoRelativePath = resultObj.retObj.photoRelativePath;
					$("#bootImgPath").val(photoRelativePath);
					$imgWrapper.append('<img title="' + photoOriginalFileName + '" src="' + CONTEXT_PATH + photoRelativePath + '" />');
				}else{
					$imgWrapper.addClass(options.uploadErrorClass).append('<label>' + resultObj.msg + '</label>');
				}
			}else{
				alert("上传失败!");
			}
		}
	});
});

function addAppBoot(){
	var valid = appBootAddFormValidator.form();
	if(valid){
		$.ajax({
			async : true,
			cache : false,
			type : 'post',
			dataType : 'json',
			data : $(document.appBootAddForm).serialize(),
			url : document.appBootAddForm.action,
			success : function(response) {
				if (response) {
					alert(response.msg);
					if(response.success) {
						window.location.href = CONTEXT_PATH + '/boot/list';
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