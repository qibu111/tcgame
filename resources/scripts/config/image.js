
var validateOptions = {
	ignore: ".form-validate-ignore",
	messageClass: "validate-message", // must be required
	messageTextClass: "validate-message-text", // must be required
	tipsClass: "validate-message-tips",
	errorClass: "validate-message-error",
	validClass: "validate-message-valid",
	rules: {
		code: {
			required: true
		},
		name: {
			required: true
		},
		value: {
			required: true
		}
	},
	messages: {
		filmId: {
			required: "配置代码未发现!"
		},
		name: {
			required: "请填写配置名称!"
		},
		value: {
			required: "请上传配置图片!"
		}
	}
};

var ticketConfigEditFormValidator = $(document.ticketConfigEditForm).validate(validateOptions);

/**
 * 配置图片上传控件
 */
$(document).ready(function(){
	$("#imgConfigUploadBtn").iupload({
		iuploadListExtClass: "iupload-list-imgconfig",
		maxUpload: 1,
		uploadForm: "imgConfigUploadForm",
		uploadCallback: function($uploadBox, resultObj){
			if(resultObj){
				var options = this.data("options");
				var $imgWrapper = $uploadBox.children("a");
				$imgWrapper.removeClass(options.uploadingClass);
				if(resultObj.success){
					var photoOriginalFileName = resultObj.retObj.photoOriginalFileName;
					var photoRelativePath = resultObj.retObj.photoRelativePath;
					$("#imgConfig").val(photoRelativePath);
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

function editTicketConfig(){
	var valid = ticketConfigEditFormValidator.form();
	if(valid){
		$.ajax({
			async : true,
			cache : false,
			type : 'post',
			dataType : 'json',
			data : $(document.ticketConfigEditForm).serialize(),
			url : document.ticketConfigEditForm.action,
			success : function(response) {
				if (response) {
					alert(response.msg);
					if(response.success) {
						window.location.href = CONTEXT_PATH + '/config/list';
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