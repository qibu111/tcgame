/**
 * 演出图片上传
 */
$(".fui-iupload-showimg").iupload({
	iuploadListExtClass: "iupload-list-showimg",
	maxUpload: 1,
	uploadForm: "showPhotoUploadForm",
	onUploadBoxRemove: function($uploadBox, $removeElement){
		$uploadBox.remove();
		$("#showImgPath").val(''); //清除隐藏域的值
	},
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
				$("#showImgPath").val(photoRelativePath);
				$imgWrapper.append('<img title="' + photoOriginalFileName + '" src="' + CONTEXT_PATH + photoRelativePath + '" />');
			}else{
				$imgWrapper.addClass(options.uploadErrorClass).append('<label>' + resultObj.msg + '</label>');
			}
		}else{
			alert("上传失败!");
		}
	}
});

/**
 * 座位分布图上传
 */
$(".fui-iupload-seatimg").iupload({
	iuploadListExtClass: "iupload-list-seatimg",
	maxUpload: 1,
	uploadForm: "showPhotoUploadForm",
	onUploadBoxRemove: function($uploadBox, $removeElement){
		$uploadBox.remove();
		$("#seatImgPath").val(''); //清除隐藏域的值
	},
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
				$("#seatImgPath").val(photoRelativePath);
				$imgWrapper.append('<img title="' + photoOriginalFileName + '" src="' + CONTEXT_PATH + photoRelativePath + '" />');
			}else{
				$imgWrapper.addClass(options.uploadErrorClass).append('<label>' + resultObj.msg + '</label>');
			}
		}else{
			alert("上传失败!");
		}
	}
});

var validateOptions = {
	ignore: ".form-validate-ignore",
	messageClass: "validate-message", // must be required
	messageTextClass: "validate-message-text", // must be required
	tipsClass: "validate-message-tips",
	errorClass: "validate-message-error",
	validClass: "validate-message-valid",
	rules: {
		showId: {
			required: true
		},
		showTypeId: {
			required: true
		},
		showTitle: {
			required: true
		},
		showImgPath: {
			required: true
		},
		seatImgPath: {
			required: true
		},
		playTime: {
			required: true
		},
		showCity: {
			required: true
		},
		venue: {
			required: true
		},
		venueAddr: {
			required: true
		},
		venueLongitude: {
			required: true,
			regex: /^\d+\.\d+$/
		},
		venueLatitude: {
			required: true,
			regex: /^\d+\.\d+$/
		},
		showHotline: {
			required: true
		},
		showIntro: {
			required: true
		},
		notes: {
			required: true
		},
		saleTime: {
			required: true,
			dateLT: '#playTime'
		},
		expressType: {
			required: true
		},
		"takeTicketAddr.address": {
			required: true
		},
		"takeTicketAddr.phone": {
			required: true
		},
		"takeTicketAddr.longitude": {
			required: true,
			regex: /^\d+\.\d+$/
		},
		"takeTicketAddr.latitude": {
			required: true,
			regex: /^\d+\.\d+$/
		},
		"takeTicketAddr.takeTime": {
			required: true
		},
		shareUrl: {
			url: true
		}
	},
	messages: {
		showId: {
			required: '未发现演出ID!'
		},
		showTypeId: {
			required: '请选择演出类型!'
		},
		showTitle: {
			required: '请输入演出名称!'
		},
		showImgPath: {
			required: '请上传演出图片!'
		},
		seatImgPath: {
			required: '请上传座位分布图!'
		},
		playTime: {
			required: '请选择演出时间!'
		},
		showCity: {
			required: '请输入演出城市!'
		},
		venue: {
			required: '请输入演出场馆!'
		},
		venueAddr: {
			required: '请输入场馆地址!'
		},
		venueLongitude: {
			required: '请输入地址经纬度(经度)!',
			regex: '地址经纬度(经度)必须是小数!'
		},
		venueLatitude: {
			required: '请输入地址经纬度(纬度)!',
			regex: '地址经纬度(纬度)必须是小数!'
		},
		showHotline: {
			required: '请输入购票热线!'
		},
		showIntro: {
			required: '请输入演出介绍!'
		},
		notes: {
			required: '请输入购票须知!'
		},
		saleTime: {
			required: '请选择开始售票日期!',
			dateLT: '开始售票时间必须早于演出时间!'
		},
		expressType: {
			required: '请输入快递方式!'
		},
		"takeTicketAddr.address": {
			required: '请输入取票地址!'
		},
		"takeTicketAddr.phone": {
			required: '请输入取票电话!'
		},
		"takeTicketAddr.longitude": {
			required: '请输入取票地址经纬度(经度)!',
			regex: '地址经纬度(经度)必须是小数!'
		},
		"takeTicketAddr.latitude": {
			required: '请输入取票地址经纬度(纬度)!',
			regex: '地址经纬度(纬度)必须是小数!'
		},
		"takeTicketAddr.takeTime": {
			required:  '请输入取票服务时间说明!'
		},
		shareUrl: {
			url: '分享链接地址不合法!'
		}
	}
};

var showEditFormValidator = $(document.showEditForm).validate(validateOptions);

/**
 * 保存演出信息
 * @param action
 */
function editShowInfo(el){
	el = $(el);
	if(el.attr("data-submited")){
		alert("数据正在提交,请勿重复提交表单!");
		return;
	}
	var valid = showEditFormValidator.form();
	if(valid){
		el.attr("data-submited", "true");
		$.ajax({
			async : true,
			cache : false,
			type : 'post',
			dataType : 'json',
			data : $(document.showEditForm).serialize(),
			url : document.showEditForm.action,
			success : function(response) {
				if (response) {
					alert(response.msg);
					if(response.success) {
						window.location.href = CONTEXT_PATH + '/show/list';
					}
					el.removeAttr("data-submited");
				} else {
					alert('请求失败!');
					el.removeAttr("data-submited");
				}
			},
			error : function() {
				alert('请求失败!');
				el.removeAttr("data-submited");
			}
		});
	}
}

