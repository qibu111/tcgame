/**
 * 海报大/小图上传控件
 */
$(".fui-iupload-btn").iupload({
	iuploadListExtClass: "iupload-list-filmposter",
	maxUpload: 1,
	uploadForm: "filmPosterUploadForm",
	onUploadBoxRemove: function($uploadBox, $removeElement){
		$uploadBox.remove();
		$("#posterPath" + this.attr("data-uploadtype")).val(''); //清除隐藏域的值
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
				$("#posterPath" + uploadType).val(photoRelativePath);
			}else{
				$imgWrapper.addClass(options.uploadErrorClass).append('<label>' + resultObj.msg + '</label>');
				$("#posterPath" + uploadType).val('');
			}
		}else{
			alert("上传失败!");
		}
	}
});