var nextIndex = 2;

var validateOptions = {
	ignore: ".form-validate-ignore",
	messageClass: "validate-message", // must be required
	messageTextClass: "validate-message-text", // must be required
	tipsClass: "validate-message-tips",
	errorClass: "validate-message-error",
	validClass: "validate-message-valid",
	rules: {
		filmId: {
			required: true,
			regex: /^\d+$/
		},
		uid1: {
			required: true
		},
		vid1: {
			required: true
		},
		prevuePhotoPath1: {
			required: true
		}
	},
	messages: {
		filmId: {
			required: "影片ID为空!",
			regex: "影片ID不合法!"
		},
		uid1: {
			required: "请填写影片预告片视频的uid!"
		},
		vid1: {
			required: "请填写影片预告片视频的vid!"
		},
		prevuePhotoPath1: {
			required: "请上传影片预告片图片!"
		}
	}
};

var filmPrevueEditFormValidator = $(document.filmPrevueEditForm).validate(validateOptions);

/**
 * 预告片图上传控件
 * @param selector	- jquery选择器
 */
function initUpload(selector){
	$(selector).iupload({
		iuploadListExtClass: "iupload-list-filmprevue",
		maxUpload: 1,
		uploadForm: "filmPrevuePhotoUploadForm",
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
					$uploadBox.closest("td").find(".prevuePhotoPath").val(photoRelativePath);
					$imgWrapper.append('<img title="' + photoOriginalFileName + '" src="' + CONTEXT_PATH + photoRelativePath + '" />');
				}else{
					$imgWrapper.addClass(options.uploadErrorClass).append('<label>' + resultObj.msg + '</label>');
				}
			}else{
				alert("上传失败!");
			}
		}
	});
}
/**
 * 初始化预告片图片上传控件
 */
initUpload('.fui-iupload-btn');

/**
 * 增加一行
 * @param el
 */
function addRow4Prevue(){
	var tpl = '<tr class="prevue-row" data-index="' + nextIndex + '">'
				+ ($(".prevue-row").length == 0 ? '<td id="rowSpanTD" class="box-label" style="vertical-align:top;padding-top:25px;" rowspan="1"><em>*</em><label>预告片：</label></td>' : '')
				+ '<td class="box-field pt">'
					+ '<div><label class="w70">&nbsp;&nbsp;视频uid：</label><input class="tickets-input-text w250 uid" type="text" name="uid' + nextIndex + '" value="" maxlength="32"/></div>'
					+ '<div class="mt5"><label class="w70">&nbsp;&nbsp;视频vid：</label><input class="tickets-input-text w250 vid" type="text" name="vid' + nextIndex + '" value="" maxlength="64"/></div>'
				+ '</td>'
				+ '<td class="box-field">'
					+ '<div id="filmPrevuePhotoUploadList' + nextIndex + '" class="fui-iupload-list iupload-list-filmprevue">'
					+ '</div>'
					+ '<input class="prevuePhotoPath" type="hidden" name="prevuePhotoPath' + nextIndex + '"/>'
					+ '<a id="prevueUploadBtn' + nextIndex + '" class="fui-iupload-btn" href="javascript:;" data-uploadlist="filmPrevuePhotoUploadList' + nextIndex + '">'
						+ '<label>选择图片(240x160)</label>'
						+ '<input type="file" name="uploadFile"/>'
					+ '</a>'
				+ '</td>'
				+ '<td class="box-field pt">'
					+ '<a class="tickets-btn btn-medium" href="javascript:;" onclick="removeRow4Prevue(this);">删除该行</a>'
				+ '</td>'
				+ '<td class="box-info pt">'
					+ '<div class="validate-message" for="uid' + nextIndex + '"><em class="validate-message-icon">&nbsp;</em><span class="validate-message-text"></span></div>'
					+ '<div class="validate-message" for="vid' + nextIndex + '"><em class="validate-message-icon">&nbsp;</em><span class="validate-message-text"></span></div>'
					+ '<div class="validate-message" for="prevuePhotoPath' + nextIndex + '"><em class="validate-message-icon">&nbsp;</em><span class="validate-message-text"></span></div>'
				+ '</td>'
		    + '</tr>';
	$(tpl).insertBefore("#insertBeforeThis");
	$("#rowSpanTD")[0].rowSpan = $(".prevue-row").length;
	
	initUpload("#prevueUploadBtn" + nextIndex);
	
	$("input[name='uid" + nextIndex + "']").rules("add", {
		required: true,
		messages: {
			required: "请填写影片预告片视频的uid!"
		}
	});
	$("input[name='vid" + nextIndex + "']").rules("add", {
		required: true,
		messages: {
			required: "请填写影片预告片视频的vid!"
		}
	});
	$("input[name='prevuePhotoPath" + nextIndex + "']").rules("add", {
		required: true,
		messages: {
			required: "请上传影片预告片图片!"
		}
	});
	nextIndex++;
}
/**
 * 删除一行
 * @param el
 */
function removeRow4Prevue(el){
	$(el).closest("tr").remove();
	var prevueRows = $(".prevue-row").length;
	if(prevueRows > 0){
		if(!$("#rowSpanTD").length){
			$(".prevue-row:first").prepend('<td id="rowSpanTD" class="box-label" style="vertical-align:top;padding-top:25px;" rowspan="1"><em>*</em><label>预告片：</label></td>');
		}
		$("#rowSpanTD")[0].rowSpan = prevueRows;
	}
}

/**
 * 提交添加影片信息请求
 */
function doFilmPrevueEdit(){
	var valid = filmPrevueEditFormValidator.form();
	if(valid){
		var filmId = document.filmPrevueEditForm.filmId.value;
		var filmPrevuesJson = '';
		var filmPrevueArray = [];
		$(".prevue-row").each(function(i, el){
			el = $(el);
			filmPrevueArray.push({
				filmId: filmId,
				prevuePhotoPath: el.find(".prevuePhotoPath").val(),
				orderIndex: i + 1,
				uid: el.find(".uid").val(),
				vid: el.find(".vid").val()
			});
		});
		
		if(filmPrevueArray.length > 0){
			filmPrevuesJson = $.toJSON(filmPrevueArray);
			document.filmPrevueEditForm.filmPrevuesJson.value = filmPrevuesJson;
			$.ajax({
				async : true,
				cache : false,
				type : 'post',
				dataType : 'json',
				data : $(document.filmPrevueEditForm).serialize(),
				url : document.filmPrevueEditForm.action,
				success : function(response) {
					if (response) {
						alert(response.msg);
						if(response.success) {
							window.location.href = CONTEXT_PATH + '/film/list';
						}
					} else {
						alert('请求失败!');
					}
				},
				error : function() {
					alert('请求失败!');
				}
			});
		}else{
			alert('您还没有添加任何预告片!');
		}
	}
}
/**
 * 删除影片预告片
 */
function delFilmPrevue(filmId){
	if(confirm('你确定要删除该影片的所有预告片?')){
		window.location.href = CONTEXT_PATH + '/film/prevue/delete?filmId=' + filmId;
	}
}

$(function(){
	nextIndex = 2;
	$(".prevue-row").each(function(index, el){
		el = $(el);
		var curIndex = parseInt(el.attr("data-index"));
		if(nextIndex < curIndex + 1){
			nextIndex = curIndex + 1;
		}
	});
	if(nextIndex > 2){
		for(var i = 2; i < nextIndex; i++){
			$("input[name='uid" + i + "']").rules("add", {
				required: true,
				messages: {
					required: "请填写影片预告片视频的uid!"
				}
			});
			$("input[name='vid" + i + "']").rules("add", {
				required: true,
				messages: {
					required: "请填写影片预告片视频的vid!"
				}
			});
			$("input[name='prevuePhotoPath" + i + "']").rules("add", {
				required: true,
				messages: {
					required: "请上传影片预告片图片!"
				}
			});
		}
	}
});