/**
 * 海报大/小图上传控件
 */
$(".fui-iupload-btn").iupload({
	beforeInit: function(options){
		var uploadType = this.attr("data-uploadtype");
		if(uploadType == '1'){
			options.iuploadListExtClass = "iupload-list-activityimg";
		}else if(uploadType == '2'){
			options.iuploadListExtClass = "iupload-list-listimg";
		}
	},
	maxUpload: 1,
	uploadForm: "activityImgUploadForm",
	onUploadBoxRemove: function($uploadBox, $removeElement){
		$uploadBox.remove();
		$("#activityImgPath" + this.attr("data-uploadtype")).val(''); //清除隐藏域的值
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
				$("#activityImgPath" + uploadType).val(photoRelativePath);
			}else{
				$imgWrapper.addClass(options.uploadErrorClass).append('<label>' + resultObj.msg + '</label>');
				$("#activityImgPath" + uploadType).val('');
			}
		}else{
			alert("上传失败!");
		}
	}
});