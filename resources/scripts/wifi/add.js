var validateOptions = {
	ignore: ".form-validate-ignore",
	messageClass: "validate-message", // must be required
	messageTextClass: "validate-message-text", // must be required
	tipsClass: "validate-message-tips",
	errorClass: "validate-message-error",
	validClass: "validate-message-valid",
	rules: {
		name: {
			required: true
		},
		provinceId: {
			required: true
		},
		cityId: {
			required: true
		},
		areaId: {
			required: true
		}
	},
	messages: {
		name: {
			required: "请输入WIFI名称!"
		},
		provinceId: {
			required: "请选择省份!"
		},
		cityId: {
			required: "请选择城市!"
		},
		areaId: {
			required: "请选择行政区域!"
		}
	}
};

var messageAddFormValidator = $(document.messageAddForm).validate(validateOptions);

function addWifi(){
	var valid = messageAddFormValidator.form();
	if(valid){
		if(isNaN($('#longitude').val())) {
			messageAddFormValidator.showErrors({longitude: '请正确输入经度!'});return;}
		if(isNaN($('#latitude').val())) {
			messageAddFormValidator.showErrors({latitude: '请正确输入纬度!'});return;}

		document.messageAddForm.submit();
	}
}


function changeProvince(el){
	$.ajax({
		async : true,
		cache : false,
		type : 'post',
		dataType : 'json',
		data : {id:$(el).val()},
		url : CONTEXT_PATH + '/wifi/getCityList',
		success : function(response) {
			var option = $("<option>").val("").text("--请选择--");
			$("#cityId").empty();
			$("#cityId").append(option);
			var option = $("<option>").val("").text("--请选择--");
			$("#areaId").empty();
			$("#areaId").append(option);
			if(response==""){

			}else{
				$.each(response, function(p1, p2){
					var option = $("<option>").val(p2.cityId).text(p2.city);
					$("#cityId").append(option);
				});
			}
		}
	});
}
function changeCity(el){
	$.ajax({
		async : true,
		cache : false,
		type : 'post',
		dataType : 'json',
		data : {id:$(el).val()},
		url : CONTEXT_PATH + '/wifi/getAreaList',
		success : function(response) {
			$("#areaId").empty();
			var option = $("<option>").val("").text("--请选择--");
			$("#areaId").append(option);
			if(response==""){

			}else{
				$.each(response, function(p1, p2){
					var option = $("<option>").val(p2.areaId).text(p2.area);
					$("#areaId").append(option);
				});
			}
		}
	});
}

