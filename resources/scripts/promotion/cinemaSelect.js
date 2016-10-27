/**
 * Using JSRender Template plugin
 * How To Use?
 * http://www.jsviews.com/#d.templates
 */
$.templates({
	cinemaListTpl: '<tr>'
					+ '<td><span class="min-row-height"><input type="checkbox" value="{{:id}}" onclick="selectRow(this);"/></span></td>'
					+ '<td>{{:id}}</td>'
					+ '<td>{{:name}}</td>'
				 + '</tr>',
	selectedCinemaListTpl: "<tr name='selectedCinema'>"
							+"<td class='box-label'></td>"
							+"<td class='box-field'>" 
								+"{{:cinemaName}}"
								+"<a href='javascript:;' onclick='delPromotionCinema(this);' class='ml20'>删除</a>" 
							+"</td>" 
							+"<input type='hidden' name='cinemaIds' value='"
							+"{{:cinemaId}}"
							+"'></tr>"
});

$(document).ready(function(){
	$("#cinemaTabs").tabs();
	$("#cinemaSelectWin").dialog({
		modal: true,
		position: 'center',
		autoOpen: false,
		title:'选择影院',
		width: 750,
		height:600,
		open: function(event, ui){
			searchCinemas();
		},
		buttons: {
			'确定': function() {
				var $checkedCinemaTRs = $("#tbody4CinemaList").find("tr.selected");
				if($checkedCinemaTRs.length){
					var $selectedCinemaList = $("#selectedCinemaList");
					var $selectedCinemaLabels = $selectedCinemaList.find("li > a > label");
					var datas = [];
					$checkedCinemaTRs.each(function(){
						var $tr = $(this);
						var cinemaId = $tr.children("td:eq(1)").text();
						var exists = false;
						if($selectedCinemaLabels.length > 0){
							$selectedCinemaLabels.each(function(){
								if($(this).attr("data-cinemaid") == cinemaId){
									exists = true;
									return false;//break
								}
							});
						}
						if(!exists){
							datas.push({
								cinemaId: cinemaId,
								cinemaName: $tr.children("td:eq(2)").text()
							});
						}
					});
					if(datas.length){
						$selectedCinemaList.after($.render.selectedCinemaListTpl(datas));
					}
					$('#cinemaSelectWin').dialog('close');
				}else{
					alert("未选中任何影院!");
				}
			},
			'取消': function(){
				$('#cinemaSelectWin').dialog('close');
			}
		}
	});
});

/**
 * 打开影院查询窗口
 */
function openCinemaSelectWin(el){
	$("#cinemaSelectWin").dialog('open');
}
/**
 * 查询影院
 */
function searchCinemas(){
	var $tbody4CinemaList = $("#tbody4CinemaList");
	$tbody4CinemaList.html('<tr><td class="loading" colspan="4"><p>正在查询...</p></td></tr>');
	setTimeout(function(){
		$.ajax({
			async : true,
			cache : false,
			type : 'post',
			dataType : 'json',
			data : $(document.cinemaSearchForm).serialize(),
			url : document.cinemaSearchForm.action,
			success : function(response) {
				if (response) {
					if(response.success){
						if(response.retObj && response.retObj.length){
							$tbody4CinemaList.html($.render.cinemaListTpl(response.retObj));
						}else{
							$tbody4CinemaList.html('<tr><td class="no-result" colspan="4">暂无记录!</td></tr>');
						}
					}else{
						$tbody4CinemaList.html('<tr><td class="error" colspan="4">' + response.msg + '</td></tr>');
					}
				} else {
					alert('请求失败!');
				}
			},
			error : function() {
				alert('请求失败!');
			}
		});
	}, 1000);
}

/**
 * 每页大小数onblur
 * @param el
 */
function onPageSizeBlur(el){
	el = $(el);
	var value = el.val();
	if(!value || !/^\d+$/.test(value)){
		el.val(el.data("original-value"));
	}
}
/**
 * 每页大小数onfocus
 * @param el
 */
function onPageSizeFocus(el){
	el = $(el);
	el.data("original-value", el.val());
}
/**
 * 删除已选择的影院或影片
 * @param el
 */
function removeSelectedThis(el){
	$(el).closest("li").remove();
}

/**
 * 验证时间格式HH:mm
 * @param value
 * @returns {Boolean}
 */
function isHHmm(value){
	return /^(([0-1]{1}[0-9]{1})|(2[0-3]{1})):[0-5]{1}[0-9]{1}$/.test(value);
}
/**
 * 日期时间字符串转Date
 * @param str
 */
function parseDate(str){
	return new Date(Date.parse(str.replace(/-/g,"/")));
}

function onTypeChange(el){
	el = $(el);
	var showTypeName = el.children("option:selected").attr("data-showtypename");
	if(showTypeName){
		$(".showType").removeClass("show");
		
		var $checkbox = $("input[type='checkbox'][name='" + showTypeName + "']");
		$checkbox.parent(".showType").addClass("show");
		$(".showType").children("input[type='checkbox']").each(function(index, ele){
			if(ele.name != showTypeName){
				ele.checked = false;
			}
		});
	}else{
		$(".showType").addClass("show");
	}
}

function selectAllShowType(el){
	if(el.checked){
		$(".showType.show").children("input[type='checkbox']").each(function(index, ele){
			ele.checked = true;
		});
	}else{
		$(".showType.show").children("input[type='checkbox']").each(function(index, ele){
			ele.checked = false;
		});
	}
}
/**
 * 删除已选的活动影院
 * @param el
 */
function delPromotionCinema(el){
	$(el).parent().parent().remove();
}

/**
 * 提交表单
 * @param btn
 * @param type add/edit
 */
function submitBillInfo(btn, type, status){
	btn = $(btn);
	if(btn.attr("data-submited")){
		alert('数据提交中,请不要重复提交表单!');
		return;
	}
	var form = null;
	if(type == 'add'){
		form = document.billAddForm;
	}else if(type == 'edit'){
		form = document.billEditForm;
	}
	var $form = $(form);
	var id = '';
	if(type == 'edit'){
		id = form.id.value;
		if(!id){
			alert('未发现票券id!');
			return;
		}
	}
	var name = form.name.value;
	if(!name){
		alert('请输入票券名称!');
		$(form.name).focus();
		return;
	}
	if(form.name.value.length > 50){
		alert('票券名称不超过50个字符!');
		$(form.name).focus();
		return;
	}
	var money = form.money.value;
	if(!money){
		alert('请输入票券金额!');
		$(form.money).focus();
		return;
	}
	if(!/^[1-9]{1}\d*$/.test(money)){
		alert('票券金额必须是正整数!');
		$(form.money).focus();
		return;
	}
	if(!form.type.value){
		alert('请选择票券类型!');
		$(form.type).focus();
		return;
	}
	var nowDate = new Date();
	var startDate = form.startDate.value;
	if(!startDate){
		alert('请选择票券有效期-开始日期!');
		$(form.startDate).focus();
		return;
	}
	if(!/^\d{4}-\d{2}-\d{2}$/.test(startDate)){
		alert('券有效期-开始日期不合法(日期格式:yyyy-MM-dd)!');
		$(form.startDate).focus();
		return;
	}
	if(type == 'add' && new Date(nowDate.format('yyyy-MM-dd').replace(/-/g,"/")) > new Date(startDate.replace(/-/g,"/"))){
		alert('券有效期-开始日期必须大于当前时间!');
		$(form.startDate).focus();
		return;
	}
	var endDate = form.endDate.value;
	if(!endDate){
		alert('请选择票券有效期-结束日期!');
		$(form.endDate).focus();
		return;
	}
	if(!/^\d{4}-\d{2}-\d{2}$/.test(endDate)){
		alert('券有效期-结束日期不合法(日期格式:yyyy-MM-dd)!');
		$(form.endDate).focus();
		return;
	}
	if(new Date(nowDate.format('yyyy-MM-dd').replace(/-/g,"/")) > new Date(endDate.replace(/-/g,"/"))){
		alert('券有效期-结束日期必须大于当前时间!');
		$(form.endDate).focus();
		return;
	}
	if(new Date(startDate.replace(/-/g,"/")) > new Date(endDate.replace(/-/g,"/"))){
		alert('券有效期-结束日期必须大于开始时间!');
		$(form.endDate).focus();
		return;
	}
	var $checkedCinemaType = $(".cinemaType").children("input[type='radio']:checked");
	var $selectedCinemaList = $("#selectedCinemaList").children("li.tickets-box-item");
	if(!$checkedCinemaType.length || ($checkedCinemaType.val() == '0' && !$selectedCinemaList.length)){
		alert('请选择适用影院!');
		return;
	}
	
	var billCinemaArray = [];
	if($checkedCinemaType.val() == '0'){
		$selectedCinemaList.each(function(index, element){
			element = $(element);
			billCinemaArray.push({
				billId: id,
				cinemaId: element.find("label").attr("data-cinemaid")
			});
		});
	}else{
		billCinemaArray.push({
			billId: id,
			cinemaId: -1
		});
	}
	form.billCinemaJsonList.value = $.toJSON(billCinemaArray);
	
	if(!$(".showType").children("input[type='checkbox']:checked").length){
		alert('请选择适用影片!');
		return;
	}
	var totalCount = form.totalCount.value;
	if(!totalCount){
		alert('请输入票券总数量!');
		$(form.totalCount).focus();
		return;
	}
	if(!/^[1-9]{1}\d*$/.test(totalCount)){
		alert('票券总数量必须是正整数!');
		$(form.totalCount).focus();
		return;
	}
	if(parseInt(totalCount) > 100000){
		alert('票券总数量最大不超过10万张!');
		$(form.totalCount).focus();
		return;
	}
	var userBindLimit = form.userBindLimit.value;
	if(!userBindLimit){
		alert('请输入每个账户最多可以绑定数量!');
		$(form.userBindLimit).focus();
		return;
	}
	if(!/^[1-9]{1}\d*$/.test(userBindLimit)){
		alert('每个账户最多可以绑定数量必须是正整数!');
		$(form.userBindLimit).focus();
		return;
	}
	if(parseInt(userBindLimit) > parseInt(totalCount)){
		alert('每个账户最多可以绑定数量不得大于票券总数量!');
		$(form.userBindLimit).focus();
		return;
	}
	if(!$(".hasCode").children("input[type='radio']:checked").length){
		alert('请选择是否生绑定用户!');
		return;
	}
	if(status){
		form.status.value = status;
	}
	if(!form.description.value){
		alert('请输入票券描述!');
		$(form.description).focus();
		return;
	}
	btn.attr("data-submited", true);
	btn.attr("data-btntext", btn.text());
	btn.text("数据保存中...");
	$.ajax({
		async : true,
		cache : false,
		type : 'post',
		dataType : 'json',
		data : $form.serialize(),
		url : form.action,
		success : function(response) {
			if (response) {
				alert(response.msg);
				if(response.success){
					window.location.href = CONTEXT_PATH + '/bill/list';
				}else{
					btn.removeAttr("data-submited");
					btn.text(btn.attr("data-btntext"));
				}
			} else {
				alert('请求失败!');
				btn.removeAttr("data-submited");
				btn.text(btn.attr("data-btntext"));
			}
		},
		error : function() {
			alert('请求失败!');
			btn.removeAttr("data-submited");
			btn.text(btn.attr("data-btntext"));
		}
	});
	
}

function clearSelectedCinema(){
	if($("tr[name='selectedCinema']")){
		$("tr[name='selectedCinema']").each(function(){
			$(this).remove();
		});
	}
	
}