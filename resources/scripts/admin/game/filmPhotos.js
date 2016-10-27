var validateOptions = {
	ignore: ".form-validate-ignore",
	messageClass: "validate-message", // must be required
	messageTextClass: "validate-message-text", // must be required
	tipsClass: "validate-message-tips",
	errorClass: "validate-message-error",
	validClass: "validate-message-valid",
	rules: {
		filmPhotosJson: {
			required: true
		}
	},
	messages: {
		filmPhotosJson: {
			required: "请上传预览图!"
		}
	}
};

var filmPhotosEditFormValidator = $(document.filmPhotosEditForm).validate(validateOptions);

/**
 * 海报大/小图上传控件
 */
$(".fui-iupload-btn").iupload({
	iuploadListExtClass: "iupload-list-filmphoto",
	moveable: true,
	uploadForm: "filmPhotosUploadForm",
	beforeUpload: function($uploadBox, uploadSerialNo){
		var options = this.data("options");
		options.uploadForm.find("input[type='hidden'][name='uploadType']").val(this.attr("data-uploadtype"));
		return true;
	},
	uploadCallback: function($uploadBox, resultObj){
		if(resultObj){
			var options = this.data("options");
			var $imgWrapper = $uploadBox.children("a");
			$imgWrapper.removeClass(options.uploadingClass);
			if(resultObj.success){
				var photoOriginalFileName = resultObj.retObj.photoOriginalFileName;
				var photoRelativePath = resultObj.retObj.photoRelativePath;
				$imgWrapper.append('<img title="' + photoOriginalFileName + '" data-photopath="' + photoRelativePath + '" src="' + CONTEXT_PATH + photoRelativePath + '" />');
			}else{
				$imgWrapper.addClass(options.uploadErrorClass).append('<label>' + resultObj.msg + '</label>');
			}
		}else{
			alert("上传失败!");
		}
	}
});

/**
 * 提交添加影片信息请求
 */
function doFilmPhotosEdit(){
	var filmPhotoArray = [];
	$(".fui-iupload-list .fui-iupload-box a img").each(function(index){
		var el = $(this);
		filmPhotoArray.push({
			id: el.attr("data-id") || '',
			sort: index + 1,
			imgAddr: el.attr("data-photopath") || ''
			//fullPhotoPath: el.attr("src") || ''
			
		});
	});
	var filmPhotosJson = '';
	if(filmPhotoArray.length > 0){
		filmPhotosJson = $.toJSON(filmPhotoArray);
	}
	document.filmPhotosEditForm.filmPhotosJson.value = filmPhotosJson;
	
	var valid = filmPhotosEditFormValidator.form();
	if(valid){
		$.ajax({
			async : true,
			cache : false,
			type : 'post',
			dataType : 'json',
			data : $(document.filmPhotosEditForm).serialize(),
			url : document.filmPhotosEditForm.action,
			success : function(response) {
				if (response) {
					alert(response.msg);
					if(response.success) {
						window.location.href = CONTEXT_PATH + '/game/list';
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