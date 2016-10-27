var validateOptions = {
	ignore : ".form-validate-ignore",
	messageClass : "validate-message", // must be required
	messageTextClass : "validate-message-text", // must be required
	tipsClass : "validate-message-tips",
	errorClass : "validate-message-error",
	validClass : "validate-message-valid",
	rules : {
		zhName : {
			required : true,
			maxlength : 20
		},
		categoryId1 : {
			required : true
		},
		categoryId2 : {
			required : true
		},
		size : {
			regex : /^\d+(\.\d{1})?$/
		},
		developer : {
			required : true,
			maxlength : 20
		},
		updDate : {
			required : true,
			dateISO : true
		},
		posterPath1 : {
			required : true
		}
	},
	messages : {
		zhName : {
			required : "请输入游戏中文名称!",
			maxlength : "游戏名称不超过{0}个字符!"
		},
		categoryId1 : {
			required : "请选择游戏分类!"
		},
		categoryId2 : {
			required : "请选择游戏子分类!"
		},
		size : {
			regex : "游戏大小必须为非负整数或小数(小数位仅1位)!"
		},
		developer : {
			required : "请输入开发商!",
			maxlength : "开发商不超过{0}个字符!"
		},
		updDate : {
			required : "请输入更新日期",
			dateISO : "更新日期格式必须是'yyyy-MM-dd'!"
		},
		posterPath1 : {
			required : "请上传游戏头像!"
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
		if (!chkVerChose()) {
			return;
		}

		// $.ajax({
		// async : true,
		// cache : false,
		// type : 'post',
		// dataType : 'json',
		// //fileElementId: 'file', // 上传文件的id、name属性名
		// data : $(document.filmAddForm).serialize(),
		// url : document.filmAddForm.action,
		// success : function(response) {
		// if (response) {
		// alert(response.msg);
		// if(response.success) {
		// window.location.href = CONTEXT_PATH + '/game/list';
		// }
		// } else {
		// alert('请求失败!');
		// }
		// },
		// error : function() {
		// alert('请求失败!');
		// }
		// });

		$('#filmAddForm').submit();
	}
}

function chkVerChose() {
	// 如果pc checkbox选择，则 pc的二维码和地址必须填写
	var vPc = $('#verPC').is(':checked');
	var posterPath2 = $('#posterPath2').val();
	var dnAddr2 = $('#dnAddr2').val();

	var pcversion = $('#pcversion').val();
	var pcsize = $('#pcsize').val();
	var pcupdDate = $('#pcupdDate').val();
	if (vPc) {
		if (posterPath2 == '') {
			alert("请上传PC版本的二维码图像");
			return false;
		}
		if (dnAddr2 == '') {
			alert("请填写PC版本的下载地址");
			return false;
		}
		
		if(pcversion=="")
		{
			alert("请填写PC版本的版本号");
			return false;
		}
		
		if(pcsize=="")
		{
			alert("请填写PC版本的大小");
			return false;
		}
		
		if(pcupdDate=="")
		{
			alert("请填写PC版本的更新日期");
			return false;
		}
		
	}else
	{
		if (posterPath2 != '' || dnAddr2 != ''|| pcversion != ''|| pcsize != ''|| pcupdDate != '') {
			alert("PC版本中内容不为空，请选中PC的复选框");
			return false;
		}
		
	}
	var vIos = $('#verIos').is(':checked');
	var posterPath3 = $('#posterPath3').val();
	var dnAddr3 = $('#dnAddr3').val();
	
	var iosversion = $('#iosversion').val();
	var iossize = $('#iossize').val();
	var iosupdDate = $('#iosupdDate').val();
	
	if (vIos) {
		if (posterPath3 == '') {
			alert("请上传IOS版本的二维码图像");
			return false;
		}
		if (dnAddr3 == '') {
			alert("请填写IOS版本的下载地址");
			return false;
		}
		

		if(iosversion=="")
		{
			alert("请填写IOS版本的版本号");
			return false;
		}
		
		if(iossize=="")
		{
			alert("请填写IOS版本的大小");
			return false;
		}
		
		if(iosupdDate=="")
		{
			alert("请填写IOS版本的更新日期");
			return false;
		}
		
	}else
	{
		if (posterPath3 != '' || dnAddr3 != ''|| iosversion != ''|| iossize != ''|| iosupdDate != '') {
			alert("IOS版本中内容不为空，请选中IOS的复选框");
			return false;
		}
		
	}
	var vAnd = $('#verAnd').is(':checked');
	var posterPath4 = $('#posterPath4').val();
	var dnAddr4 = $('#dnAddr4').val();
	
	var andversion = $('#andversion').val();
	var andsize = $('#andsize').val();
	var andupdDate = $('#andupdDate').val();
	
	
	
	if (vAnd) {
		if (posterPath4 == '') {
			alert("请上传Android版本的二维码图像");
			return false;
		}
		if (dnAddr4 == '') {
			alert("请填写Android版本的下载地址");
			return false;
		}
		

		if(andversion=="")
		{
			alert("请填写Android版本的版本号");
			return false;
		}
		
		if(andsize=="")
		{
			alert("请填写Android版本的大小");
			return false;
		}
		
		if(andupdDate=="")
		{
			alert("请填写Android版本的更新日期");
			return false;
		}
	}else
	{
		if (posterPath4 != '' || dnAddr4 != ''|| andversion != ''|| andsize != ''|| andupdDate != '') {
			alert("Android版本中内容不为空，请选中Android的复选框");
			return false;
		}
		
	}

	return true;
}


/*****版本类型显示隐藏区域start*********/

$('#divPc').hide();
$("#verPC").change(function() {

	var vPc = $('#verPC').is(':checked');

	if (vPc) {
		$('#divPc').show();
	} else {
		$('#divPc').hide();
	}
});

$('#divIos').hide();
$("#verIos").change(function() {

	var vIos = $('#verIos').is(':checked');

	if (vIos) {
		$('#divIos').show();
	} else {
		$('#divIos').hide();
	}
});



$('#divAndroid').hide();
$("#verAnd").change(function() {

	var vAnd = $('#verAnd').is(':checked');
	if (vAnd) {
		$('#divAndroid').show();
	} else {
		$('#divAndroid').hide();
	}
});

/*****版本类型显示隐藏区域end********/
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
