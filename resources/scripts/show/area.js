var validateOptions = {
	ignore: ".form-validate-ignore",
	messageClass: "validate-message", // must be required
	messageTextClass: "validate-message-text", // must be required
	tipsClass: "validate-message-tips",
	errorClass: "validate-message-error",
	validClass: "validate-message-valid",
	rules: {
		areaName: {
			required: true
		},
		price: {
			required: true,
			regex: /^[1-9]\d*$/
		}
	},
	messages: {
		areaName: {
			required: "请输入区域名称!",
			regex: "价格必须为正整数!"
		},
		price: {
			required: "请输入价格!",
			regex: "价格必须为正整数!"
		}
	}
};

var areaAddFormValidator = $(document.areaAddForm).validate(validateOptions);

var areaEditFormValidator = $(document.areaEditForm).validate(validateOptions);

var SHEAT_FORMAT = ['xls', 'xlsx'];

function submitAreaAddForm(){
	if($("#isSubmit").val() == "1"){
		alert("请勿重复提交");
	}
	$("#isSubmit").val("1");
	var valid = areaAddFormValidator.form();
	if(valid){
		if(!$("input:radio[name='lightActive']:checked").val()){
			alert('请选择是否支持光验票!');
			$("#isSubmit").val("0");
			return;
		}
		var value = $("#file").val();
		if(value == null || value == ''){
			alert("请上传座位");
			$("#isSubmit").val("0");
			return;
		}
		var filePath = value.toLowerCase();
		var suffix = filePath.substring(filePath.lastIndexOf('.') + 1);
		var formats = "," + SHEAT_FORMAT.join(",") + ",";
		if(formats.indexOf("," + suffix + ",") == -1){
			alert("上传格式必须是" + SHEAT_FORMAT + "中的一种!");
			$("#isSubmit").val("0");
			return;
		}
		if($('#accountLimit').val()==''||isNaN($('#accountLimit').val())){
			alert("请正确填写每个账号购票单数限制");
			$("#isSubmit").val("0");
			return;
		}
		if($('#phonenumLimit').val()==''||isNaN($('#phonenumLimit').val())){
			alert("请正确填写每个取票手机号购票单数限制");
			$("#isSubmit").val("0");
			return;
		}
		if($('#devcodeLimit').val()==''||isNaN($('#devcodeLimit').val())){
			alert("请正确填写每个设备号购票单数限制");
			$("#isSubmit").val("0");
			return;
		}
		if($('#seatnumLimit').val()==''||$('#seatnumLimit').val()<1||isNaN($('#seatnumLimit').val())){
			alert("请正确填写每单最多购买张数限制");
			$("#isSubmit").val("0");
			return;
		}
		if($('#seatnumLimit').val()>6){
			alert("请每单最多购买6张");
			$("#isSubmit").val("0");
			return;
		}
		document.areaAddForm.submit();
	}
	$("#isSubmit").val("0");
}

function submitAreaEditForm(){
	var valid = areaEditFormValidator.form();
	if(valid){
		if($('#accountLimit').val()==''||isNaN($('#accountLimit').val())){
			alert("请正确填写每个账号购票单数限制");
			$("#isSubmit").val("0");
			return;
		}
		if($('#phonenumLimit').val()==''||isNaN($('#phonenumLimit').val())){
			alert("请正确填写每个取票手机号购票单数限制");
			$("#isSubmit").val("0");
			return;
		}
		if($('#devcodeLimit').val()==''||isNaN($('#devcodeLimit').val())){
			alert("请正确填写每个设备号购票单数限制");
			$("#isSubmit").val("0");
			return;
		}
		if($('#seatnumLimit').val()==''||$('#seatnumLimit').val()<1||isNaN($('#seatnumLimit').val())){
			alert("请正确填写每单最多购买张数限制");
			$("#isSubmit").val("0");
			return;
		}
		if($('#seatnumLimit').val()>6){
			alert("请每单最多购买6张");
			$("#isSubmit").val("0");
			return;
		}
		document.areaEditForm.submit();
	}
	
}		

function queryAreaList(){
	document.areaQueryForm.submit();
}

function deleteArea(showId, seatImg, areaId){
	if(window.confirm("请确认是否删除？")){
		window.location.href=CONTEXT_PATH + '/show/area/delete?showId=' +showId+ '&seatImg='+seatImg+'&areaId=' + areaId;
	}
}

function editSeat(showId, seatImg, areaId, seatId, status){
	if(window.confirm("请确认是否修改状态？")){
		window.location.href=CONTEXT_PATH + '/show/seat/edit?showId=' +showId+ '&seatImg='+seatImg+'&areaId=' + areaId+'&seatId=' + seatId+'&status=' + status;
	}
}
