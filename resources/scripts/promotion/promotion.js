var validateOptions = {
	ignore: ".form-validate-ignore",
	messageClass: "validate-message", // must be required
	messageTextClass: "validate-message-text", // must be required
	tipsClass: "validate-message-tips",
	errorClass: "validate-message-error",
	validClass: "validate-message-valid",
	rules: {
		promotionName: {
			required: true
		},
		promotionPrice: {
			required: true,
			regex: /^[1-9]\d*$/
		},
		originalPrice: {
			required: true,
			regex: /^[1-9]\d*$/
		},
		startTime: {
			required: true
		},
		endTime: {
			required: true
		},
		rebate: {
			required: false,
			regex: /^\d*$/
		},
		content: {
			required: true
		},
		useRule: {
			required: true
		}
	},
	messages: {
		promotionName: {
			required: "请输入促销名称!"
		},
		promotionPrice: {
			required: "请选择促销价格!",
			regex: "促销价格必须为正整数!"
		},
		originalPrice: {
			required: "请输入原价!",
			regex: "原价必须为正整数!"
		},
		startTime: {
			required: "请输入有效期开始时间!"
		},
		endTime: {
			required: "请输入有效期结束时间!"
		},
		rebate: {
			regex: "返利必须是自然数"
		},
		content: {
			required: "请输入促销内容"
		},
		useRule: {
			required: "请输入使用规则"
		}
	}
};


/**
 * 提交添加影片信息请求
 */
function submitPromotionAddForm(){
	var promotionAddFormValidator = $(document.promotionAddForm).validate(validateOptions);
	var valid = promotionAddFormValidator.form();
	var cinemaIds = $.find("input[name='cinemaIds']");
	if(cinemaIds == null || cinemaIds.length == 0){
		alert("关联影院不能为空!");
		return;
	}
	if(valid){
		var value = $("#rebate").val();
		if(value == null || value == ""){
			$("#rebate").val(0);
		}
		document.promotionAddForm.submit();
	}
}

/**
 * 查询影片列表
 */
function queryPromotionList(){
	document.promotionQueryForm.pageIndex.value = 1;
	document.promotionQueryForm.submit();
}

var PROMOTION_CODE_FORMAT = ['txt', 'xls', 'xlsx'];

function onPromotionCodeChange(el){
	var value = el.value;
	if(value){
		el = $(el);
		var uploadForm = document.promotionCodeAddForm;
		var filePath = value.toLowerCase();
		var suffix = filePath.substring(filePath.lastIndexOf('.') + 1);
		var formats = "," + PROMOTION_CODE_FORMAT.join(",") + ",";
		if(formats.indexOf("," + suffix + ",") != -1){
				uploadForm.submit();
		}else{
			alert("上传格式必须是" + PROMOTION_CODE_FORMAT + "中的一种!");
		}
	}
}

function doPromotionCodeAdd(){
	var value = $("#file").val();
	if(value){
		var uploadForm = document.promotionCodeAddForm;
		var filePath = value.toLowerCase();
		var suffix = filePath.substring(filePath.lastIndexOf('.') + 1);
		var formats = "," + PROMOTION_CODE_FORMAT.join(",") + ",";
		if(formats.indexOf("," + suffix + ",") != -1){
				uploadForm.submit();
		}else{
			alert("上传格式必须是" + PROMOTION_CODE_FORMAT + "中的一种!");
		}
	}
}
	


function hiddenRebate(){
		$("#rebateTr").hide();
}

function getTheatreChainId(){
	$('#searchTheatreChainId').val($('#theatreChainId').val());
}
