var validateOptions = {
	ignore: ".form-validate-ignore",
	messageClass: "validate-message", // must be required
	messageTextClass: "validate-message-text", // must be required
	tipsClass: "validate-message-tips",
	errorClass: "validate-message-error",
	validClass: "validate-message-valid",
	rules: {
		clientType: {
			required: true
		},
		title: {
			required: true
		}

	},
	messages: {
		clientType: {
			required: "请选择客户端类型!"
		},
		title: {
			required: "请输入推送消息标题!"
		},
		content: {
			required: "请输入推送消息内容!"
		},
		linkType: {
			required: "请选择消息链接页面!"
		}
	}
};

var messageAddFormValidator = $(document.messageAddForm).validate(validateOptions);

function addPushMessage(){
	var valid = messageAddFormValidator.form();
	if(valid){
		var $linkType = $('#linkType');
		var linkType = $linkType.val();

		if($('input:radio[name=isPush]:checked').val()==2){
			if($('#pushExpiryTime').val().trim()==''){
				messageAddFormValidator.showErrors({pushExpiryTime: '请选择消息推送有效期!'});
				return;
			}
		}
		if($('#messageType').val()==1){
			if(linkType==''){
				messageAddFormValidator.showErrors({linkType: '请选择消息链接页面!'});
				return;
			}
		}
		if($('#messageType').val()!=1){
			if($('#contentSummary').val().trim()==''){
				messageAddFormValidator.showErrors({contentSummary: '请输入内容摘要!'});
				return;
			}
		}
		if(($('#messageType').val()!=1)||($('#messageType').val()==1&&linkType == '0')){
			if($('#content').val().trim()==''){
				messageAddFormValidator.showErrors({content: '请输入消息内容!'});
				return;
			}
		}
		if($('input:radio[name=sendType]:checked').val()==2){
			if($('input:radio[name=sendToP]:checked').val()==1) {
				if ($('#sendUsers').val() == '') {
					messageAddFormValidator.showErrors({sendUsers: '请输入要发送的会员账号名单!'});
					return;
				}
			}else{
				if ($('#sendUsersFile').val() == '') {
					messageAddFormValidator.showErrors({sendUsersFile: '请上传账号名单文件!'});
					return;
				}
				if ($('#sendUsersFile').val().indexOf(".txt")==-1&&$('#sendUsersFile').val().indexOf(".TXT")==-1) {
					messageAddFormValidator.showErrors({sendUsersFile: '请上传TXT格式账号名单文件!'});
					return;
				}
			}
		}
		if($('#messageType').val()==1){
			if($('#linkType').val()!=0){
				if($('input:radio[name=isPush]:checked').val()==1){
					messageAddFormValidator.showErrors({pushExpiryTime: '是否推送消息必须选择是!'});
					return;
				}
			}
		}
		if(linkType == '2' || linkType == '4' || linkType == '10'){
			var paramName = $linkType.children("option:selected").attr("data-paramname");
			$.ajax({
				async : false,
				cache : false,
				type : 'post',
				dataType : 'json',
				data : {
					linkType: document.messageAddForm.linkType.value,
					linkParam: document.messageAddForm.linkParam.value
				},
				url : CONTEXT_PATH + '/message/validate/exists',
				success : function(response) {
					if (response) {
						if(response.success) {
							document.messageAddForm.submit();
						}else{
							messageAddFormValidator.showErrors({linkParam: paramName + '不存在!'});
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
			document.messageAddForm.submit();
		}
	}
}
function onMessageTypeSelected(el){
	el = $(el);
	var mt = el.children("option:selected").val();

	linkTr=$('#linkTr');
	conentTr=$('#conentTr');
	sendToTr=$('#sendToTr');
	pushTr=$('#pushTr');
	sendSelectTr=$('#sendSelectTr');
	picTr=$('#picTr');
	contentSummaryTr=$('#contentSummaryTr');

	linkType=$('#linkType');
	if(mt==1){
		if(linkTr.is(":hidden")){
			linkTr.show();
		}
		linkType.val('');
		if(!conentTr.is(":hidden")){
			conentTr.hide();
		}

		if(!picTr.is(":hidden")){
			picTr.hide();
		}
		if(!contentSummaryTr.is(":hidden")){
			contentSummaryTr.hide();
		}
	}else{
		if(!linkTr.is(":hidden")){
			linkTr.hide();
		}
		if(picTr.is(":hidden")){
			picTr.show();
		}
		if(contentSummaryTr.is(":hidden")){
			contentSummaryTr.show();
		}
		if(contentSummaryTr.is(":hidden")){
			contentSummaryTr.show();
		}
		if(conentTr.is(":hidden")){
			conentTr.show();
		}
		$('#content').xheditor({
			tools:'mini',skin:'default',upMultiple:100,upImgUrl:'/admin/photo/uploadAreaText',upImgExt:'jpg,jpeg,bmp,png,gif',onUpload:callbackc,width:400,height:200
		});

	}
}

function onLinkTypeSelected(el){
	el = $(el);
	var hasParam = el.children("option:selected").attr("data-hasparam");
	var paramName = el.children("option:selected").attr("data-paramname");
	var $linkTypeParam = $("#linkTypeParam");
	$("#linkParam").rules("remove");
	messageAddFormValidator.clearError($("#linkParam")[0]);


	if(hasParam == 'true'){
		if(paramName=='消息内容'){
			$("#linkParam").val('');
			$linkTypeParam.css("display", "none");
			$linkTypeParam.children("label").html("");
			$('#content').xheditor(null);
			$("#conentTr").show();
			$('#content').xheditor(false);
		}else{
			$("#conentTr").hide();
			$linkTypeParam.css("display", "block");
			$linkTypeParam.children("label").html(paramName + "：");
			$("#linkParam").rules("add", {
				required: true,
				messages: {
					required: '请输入' + paramName + '!'
				}
			});
			if(el.val() == '11'){ //WEB_VIEW需要检测URL的合法性
				$("#linkParam").rules("add", {
					url: true,
					messages: {
						url: '请输入合法的URL!'
					}
				});
			}
		}
	}else{
		$("#conentTr").hide();
		$("#linkParam").val('');
		$linkTypeParam.css("display", "none");
		$linkTypeParam.children("label").html("");
	}
}

$("input[name='sendType']").click(function(){
	sendSelectTr=$('#sendSelectTr');
	if(this.id=='sendToAll'){
		sendSelectTr.hide();
	}else{
		sendSelectTr.show();
		$('#sendToText').click();
	}
});

$("input[name='sendToP']").click(function(){
	if(this.id=='sendToText'){
		$('#sendUsers').attr("disabled",false);
		$('#sendUsersFile').attr("disabled",true);
	}else{
		$('#sendUsers').attr("disabled",true);
		$('#sendUsersFile').attr("disabled",false);
	}
});


$(function() {
	'use strict';
	var url = '/admin/photo/upload';

	$('#upLoadBtn1').fileupload({
		url: url,
		dataType: 'json',
		autoUpload: true,
		acceptFileTypes: /(\.|\/)(jpg|jpeg|bmp|png|gif)$/i,
		maxFileSize: 5000000, // 5 MB
		// Enable image resizing, except for Android and Opera,
		// which actually support image resizing, but fail to
		// send Blob objects via XHR requests:
		disableImageResize: true,
		previewMaxWidth: 100,
		previewMaxHeight: 100,
		previewCrop: true
	}).on('fileuploadprogressall', function(e, data) {
		//progress
	}).on('fileuploaddone', function(e, data) {
		var result = data.result;
		if (result.success) {
			$.each(result.data, function (index, file) {
				var url = file.fileName;
				addImage(url,$("#uploadListPic1"));

			});
		}else {
			alert(result.message);
		}
	}).on('fileuploadfail', function(e, data) {
		alert("fail to upload, please change your server url");
	});
});


function addImage(imgurl, obj) {
	imgurl=imgurl+"?imageView2/1/w/200";
	obj.empty();
	var $dd = $("<dd style='float: left;'/>").appendTo(obj);
	var $img = $('<img style="cursor:pointer" />').attr("src", imgurl).attr("width", 50).appendTo($dd);

	$('<a href="javascript:void(0)">删除</a>').appendTo($dd);
	$dd.find('img').click(function() {
		window.open($(this).attr("src"));
	});
	$dd.find('a').click(function() {
		$dd.remove();
	});
	$('#messagePic').val(imgurl);
	return $dd;
}


$('#isPushN').click();
$('#sendToAll').click();
$("#linkType").val('');
onLinkTypeSelected($("#linkType"));
$('#messageType').val('1');

function callbackc(msg){
	var _str = "<input type='checkbox' name='_pictures' value='"+msg+"' checked='checked' onclick='return false'/><label>"+msg+"</label><br/>";
	$("#xh_editor").append(msg);
	$("#uploadList").append(_str);
}