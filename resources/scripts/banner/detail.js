/**
 * banner图片上传控件
 */
$(".fui-iupload-btn").iupload({
	beforeInit: function(options){
		var uploadType = this.attr("data-uploadtype");
		if(uploadType == '1'){
			options.iuploadListExtClass = "iupload-list-listbanner";
		}else if(uploadType == '2'){
			options.iuploadListExtClass = "iupload-list-posterbanner";
		}else if(uploadType == '3'){
			options.iuploadListExtClass = "iupload-list-webviewbanner";
		}
	},
	maxUpload: 1,
	uploadForm: "bannerPhotoUploadForm",
	onUploadBoxRemove: function($uploadBox, $removeElement){
		$uploadBox.remove();
		$("#bannerPath" + this.attr("data-uploadtype")).val(''); //清除隐藏域的值
	},
	beforeUpload: function($uploadBox, uploadSerialNo){
		var options = this.data("options");
		options.uploadForm.find("input[type='hidden'][name='uploadType']").val(this.attr("data-uploadtype"));
		return true;
	},
	uploadCallback: function($uploadBox, resultObj){
		if(resultObj){
			var uploadType = resultObj.uploadType;
			var options = this.data("options");
			var $imgWrapper = $uploadBox.children("a");
			$imgWrapper.removeClass(options.uploadingClass);
			if(resultObj.success){
				var photoOriginalFileName = resultObj.retObj.photoOriginalFileName;
				var photoRelativePath = resultObj.retObj.photoRelativePath;
				$imgWrapper.append('<img title="' + photoOriginalFileName + '" src="' + CONTEXT_PATH + photoRelativePath + '" />');
				$("#bannerPath" + uploadType).val(photoRelativePath);
			}else{
				$imgWrapper.addClass(options.uploadErrorClass).append('<label>' + resultObj.msg + '</label>');
				$("#bannerPath" + uploadType).val('');
			}
		}else{
			alert("上传失败!");
		}
	}
});