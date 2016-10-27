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
					+ '<td>{{:theatreChainName}}</td>'
				 + '</tr>',
	selectedCinemaListTpl: '<li class="tickets-box-item item-selected item-cinema">'
							+ '<a href="javascript:;">'
							  + '<label data-cinemaid="{{:cinemaId}}">{{:cinemaName}}</label><i onclick="removeSelectedThis(this);"></i>'
							+ '</a>'
						 + '</li>',
	filmListTpl: '<tr data-id="{{:filmId}}">'
					+ '<td><span class="min-row-height"><input type="checkbox" value="{{:filmId}}" onclick="selectRow(this);"/></span></td>'
					+ '<td>{{:filmId}}</td>'
					+ '<td>{{:filmName}}</td>'
					+ '<td style="text-align:left;">'
						+ '<a class="showtype" href="javascript:;" onclick="onShowTypeClick(this);"><input type="checkbox" name="showType" value="0"/>2D</a>'
						+ '<a class="showtype" href="javascript:;" onclick="onShowTypeClick(this);"><input type="checkbox" name="showType" value="1"/>3D</a>'
						+ '<a class="showtype" href="javascript:;" onclick="onShowTypeClick(this);"><input type="checkbox" name="showType" value="2"/>2D+IMAX</a>'
						+ '<a class="showtype" href="javascript:;" onclick="onShowTypeClick(this);"><input type="checkbox" name="showType" value="3"/>3D+IMAX</a>'
						+ '<a class="showtype" href="javascript:;" onclick="onShowTypeClick(this);"><input type="checkbox" name="showType" value="4"/>4D</a>'
						+ '<a class="showtype" href="javascript:;" onclick="onShowTypeClick(this);"><input type="checkbox" name="showType" value="6"/>DMAX</a>'
						+ '<label class="showtype" onclick="onAllShowTypeClick(this);"><input type="checkbox"/>全部</label>'
					+ '</td>'
				+ '</tr>',
	selectedFilmListTpl: '<li class="tickets-box-item item-selected item-film">'
							+ '<a href="javascript:;">'
							  + '<label data-filmid="{{:filmId}}" data-showtypes="{{:showTypes}}">{{:filmName}}'
							  	+ '<span>'
								  	+ '{{for showTypeList}}'
								  	   + '{{:showTypeName}}'
								  	   + '{{if #index != #parent.data.length - 1}}&nbsp;|&nbsp;{{/if}}'
								  	+ '{{/for}}'
							  	+ '</span>'
							  + '</label><i onclick="removeSelectedThis(this);"></i>'
							+ '</a>'
					   + '</li>',
	timerRowTpl: '<div class="tickets-discounttimer-item tickets-box time-interval-1">'
					+ '<div class="tickets-box-item" style="width:10%;text-align:right;"><label class="item-label"><em class="req">*</em>开始时间</label>：</div>'
					+ '<div class="tickets-box-item" style="width:25%;text-align:left;"><input type="hidden" name="id" value=""/><input class="tickets-input-text w150" type="text" name="startPeriod"/>(格式HH:mm)</div>'
					+ '<div class="tickets-box-item" style="width:10%;text-align:right;"><label class="item-label"><em class="req">*</em>结束时间</label>：</div>'
					+ '<div class="tickets-box-item" style="width:55%;text-align:left;"><input class="tickets-input-text w150" type="text" name="endPeriod"/>(格式HH:mm)</div>'
					+ '<div class="tickets-box-item" style="width:10%;text-align:right;"><label class="item-label"><em class="req">*</em>促销价格</label>：</div>'
					+ '<div class="tickets-box-item" style="width:25%;text-align:left;"><input class="tickets-input-text w150" type="text" name="discountPrice"/>&nbsp;(元)</div>'
					+ '<div class="tickets-box-item" style="width:10%;text-align:right;"><label class="item-label"><em class="req">*</em>促销数量</label>：</div>'
					+ '<div class="tickets-box-item" style="width:25%;text-align:left;"><input class="tickets-input-text w150 timer1" type="text" name="totalCount" onblur="calculateTotalCount(this, \'timer1\');"/></div>'
					+ '<div class="tickets-box-item" style="width:30%;text-align:left;"><a href="javascript:;" onclick="removeTimerRowThis(this);">删除</a></div>'
				+ '</div>'
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
						$selectedCinemaList.append($.render.selectedCinemaListTpl(datas));
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
	
	$("#filmTabs").tabs();
	$("#filmSelectWin").dialog({
		modal: true,
		position: 'center',
		autoOpen: false,
		title:'选择影片',
		width: 750,
		height:600,
		open: function(event, ui){
			searchFilms(1);
		},
		buttons: {
			'确定': function() {
				var $checkedFilmTRs = $("#tbody4FilmList").find("tr.selected");
				if($checkedFilmTRs.length){
					var $selectedFilmList = $("#selectedFilmList");
					var $selectedFilmLabels = $selectedFilmList.find("li > a > label");
					var datas = [];
					var existsElements = [];
					var valid = true;
					$checkedFilmTRs.each(function(){
						var $tr = $(this);
						var filmId = $tr.children("td:eq(1)").text();
						var filmName = $tr.children("td:eq(2)").text();
						if($selectedFilmLabels.length > 0){
							$selectedFilmLabels.each(function(){
								if($(this).attr("data-filmid") == filmId){
									existsElements.push($(this).closest("li"));
									return false;//break
								}
							});
						}
						var $checkedShowTypes = $tr.children("td:eq(3)").find("a.showtype > input[type='checkbox'][name='showType']:checked");
						if($checkedShowTypes.length){
							var showTypeList = [];
							var showTypes = [];
							$checkedShowTypes.each(function(){
								var el = $(this);
								showTypeList.push({
									showType: el.val(),
									showTypeName: el.parent().text()
								});
								showTypes.push(el.val());
							});
							datas.push({
								filmId: filmId,
								filmName: filmName,
								showTypeList: showTypeList,
								showTypes: showTypes.join(",")
							});
						}else{
							alert("请为影片[" + filmName + "]选择放映类型!");
							valid = false;
							return valid; //break
						}
					});
					if(!valid){
						return;
					}
					if(datas.length){
						if(existsElements.length){
							$.each(existsElements, function(i, n){
								n.remove();
							});
						}
						$selectedFilmList.append($.render.selectedFilmListTpl(datas));
					}
					closeFilmSelectWin();
				}else{
					alert("未选中任何影片!");
				}
			},
			'取消': function(){
				closeFilmSelectWin();
			}
		}
	});
});

function closeFilmSelectWin(){
	$('#filmSelectWin').dialog('close');
	$('#filmPagerToolBar').css("display", "none");
}
/**
 * 打开影院查询窗口
 */
function openCinemaSelectWin(el){
	onCinemaRadioClick($(el).siblings(".item-label").children("input[type='radio']")[0]);
	$("#cinemaSelectWin").dialog('open');
}
function onCinemaRadioClick(el){
	var value = el.value;
	el.checked = true;
	if(value == 1){
		$("#selectedCinemaList").css("display", "none");
	}else if(value == 0){
		$("#selectedCinemaList").css("display", "block");
	}
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
 * 打开影片查询窗口
 */
function openFilmSelectWin(el){
	onFilmRadioClick($(el).siblings(".item-label").children("input[type='radio']")[0]);
	$("#filmSelectWin").dialog('open');
}
function onFilmRadioClick(el){
	var value = el.value;
	el.checked = true;
	if(value == 1){
		$("#selectedFilmList").css("display", "none");
		$("#selectedShowTypes4AllFilm").css("display", "block");
	}else if(value == 0){
		$("#selectedFilmList").css("display", "block");
		$("#selectedShowTypes4AllFilm").css("display", "none");
	}
}
/**
 * 查询影片
 */
function searchFilms(pageIndex){
	var pageNum = $("#pageSize").val() || 10;
	document.filmSearchForm.pageIndex.value = pageIndex;
	document.filmSearchForm.pageNum.value = pageNum;
	var $filmPagerToolBar = $("#filmPagerToolBar");
	var $tbody4FilmList = $("#tbody4FilmList");
	$tbody4FilmList.html('<tr><td class="loading" colspan="4"><p>正在查询...</p></td></tr>');
	setTimeout(function(){
		$.ajax({
			async : true,
			cache : false,
			type : 'post',
			dataType : 'json',
			data : $(document.filmSearchForm).serialize(),
			url : document.filmSearchForm.action,
			success : function(response) {
				if (response) {
					var totalNum = 0;
					var $filmSearchPageSize = $("#filmSearchPageSize");
					if(response.success){
						if(response.retObj && response.retObj.length){
							totalNum = response.totalNum;
							$tbody4FilmList.html($.render.filmListTpl(response.retObj));
							$("#filmSearchPager").pagination({
								currentPage: pageIndex,
								items: totalNum, //总页数
								itemsOnPage: pageNum, //每页显示多少条
								prevText: "<",
								nextText: ">",
								cssStyle: 'turquoise-theme',
								onPageClick: function(pageNumber, event){
									searchFilms(pageNumber);
								}
							});
							$filmSearchPageSize.children("i").text(totalNum);
							$filmPagerToolBar.css("display", "block");
						}else{
							$tbody4FilmList.html('<tr><td class="no-result" colspan="4">暂无记录!</td></tr>');
							$filmSearchPageSize.children("i").text(totalNum);
							$filmPagerToolBar.css("display", "none");
						}
					}else{
						$tbody4FilmList.html('<tr><td class="error" colspan="4">' + response.msg + '</td></tr>');
						$filmSearchPageSize.children("i").text(totalNum);
						$filmPagerToolBar.css("display", "none");
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
 * 播放类型被点击
 * @param el
 */
function onShowTypeClick(el){
	el = $(el);
	el.toggleClass("checked");
	var checkbox = el.children("input[type='checkbox']")[0];
	checkbox.checked = el.hasClass("checked");
}
/**
 * 全选播放类型
 * @param el
 */
function onAllShowTypeClick(el){
	el = $(el);
	var checkbox = el.children("input[type='checkbox']")[0];
	el.parent().find("a.showtype").each(function(){
		var ael = $(this);
		ael.toggleClass("checked", checkbox.checked);
		ael.children("input[type='checkbox']")[0].checked = checkbox.checked;
	});
}
/**
 * 删除已选择的影院或影片
 * @param el
 */
function removeSelectedThis(el){
	$(el).closest("li").remove();
}

/**
 * 添加行
 * @param el
 */
function addTimerRow(el){
	el = $(el);
	var $container = el.closest("li");
	if($container.children(".time-interval-1").length >= 3){
		alert('最多只能添加2个时间周期段!');
		return;
	}
	$container.append($.render.timerRowTpl({}));
}
/**
 * 删除行
 * @param el
 */
function removeTimerRowThis(el){
	$(el).parent().parent().remove();
}
/**
 * 计算总份数
 * @param el
 * @param groupClass
 */
function calculateTotalCount(el, groupClass){
	el = $(el);
	if(el.is("label") || el.closest("li").find(".tickets-discounttimer-title input[type='radio'][name='type']:checked").length){
		var total = 0;
		$("input." + groupClass).each(function(i, n){
			if(/^[1-9]{1}\d*$/.test(n.value)){
				total += parseInt(n.value);
			}
		});
		$("#discountTotalCount").text(total);
	}
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

/**
 * 提交表单
 * @param btn
 * @param type add/edit
 */
function submitDiscountInfo(btn, type){
	var result=true;
	var price=$('#price').val();
	btn = $(btn);
	if(btn.attr("data-submited")){
		alert('请不要重复提交表单!');
	}
	var form = null;
	if(type == 'add'){
		form = document.discountAddForm;
	}else if(type == 'edit'){
		form = document.discountEditForm;
	}
	var $form = $(form);
	var el = null;
	var discountId = '';
	if(type == 'edit'){
		discountId = form.discountId.value;
		if(!discountId){
			alert('未发现促销id!');
			return;
		}
	}
	var name = form.name.value;
	if(!name){
		alert('请输入促销名称!');
		$(form.name).focus();
		return;
	}
	if(form.name.value.length > 50){
		alert('促销名称不超过50个字符!');
		$(form.name).focus();
		return;
	}
	var description = form.description.value;
	if(description && description.length > 50){
		alert('促销描述不超过50个字符!');
		$(form.description).focus();
		return;
	}
	var $selectedType = $form.find("input[type='radio'][name='type']:checked");
	if(!$selectedType.length){
		alert('请选择促销条件-时段类型!');
		return;
	}
	var valid = true;
	var type = $selectedType.val();
	var $selectedTypeCtn = $selectedType.closest("li");
	var startDateTime, endDateTime, discountPrice, totalCount;
	var timeIntervals = {};
	
	if(type == 1){ //验证周期时间段内的表单
		startDateTime = form["startDateTime" + type].value;
		if(!startDateTime){
			alert('请输入开始日期!');
			$(form["startDateTime" + type]).focus();
			return;
		}
		endDateTime = form["endDateTime" + type].value;
		if(!endDateTime){
			alert('请输入结束日期!');
			$(form["endDateTime" + type]).focus();
			return;
		}
		
		var length = $(".time-interval-" + type).length;
		for(var i = 0; i < length; i++){
			timeIntervals["index" + i] = {
				discountId: discountId,
				startDateTime: startDateTime,
				endDateTime: endDateTime,
				period: true
			};
		}
		$selectedTypeCtn.find("input[type='hidden'][name='id']").each(function(i, n){
			timeIntervals["index" + i]["id"] = n.value;
		});
		$selectedTypeCtn.find("input[type='text'][name='startPeriod']").each(function(i, n){
			if(!n.value){
				alert('请输入开始时间(HH:mm)!');
				$(n).focus();
				valid = false;
				return valid;
			}
			if(!isHHmm(n.value)){
				alert('开始时间(HH:mm)不合法!');
				$(n).focus();
				valid = false;
				return valid;
			}
			timeIntervals["index" + i]["startPeriod"] = n.value;
		});
		if(!valid){ return; }
		
		$selectedTypeCtn.find("input[type='text'][name='endPeriod']").each(function(i, n){
			if(!n.value){
				alert('请输入结束时间(HH:mm)!');
				$(n).focus();
				valid = false;
				return valid;
			}
			if(!isHHmm(n.value)){
				alert('结束时间(HH:mm)不合法!');
				$(n).focus();
				valid = false;
				return valid;
			}
			var startPeriodValue = $form.find("input[type='text'][name='startPeriod']:eq(" + i + ")").val();
			if(n.value <= startPeriodValue){
				alert('结束时间(HH:mm)必须大于起始时间(HH:mm)!');
				$(n).focus();
				valid = false;
				return valid;
			}
			var nowDate = new Date();
			var endDate = parseDate(endDateTime + " " + n.value + ":00");
			if(nowDate.getTime() > endDate.getTime()){
				alert('结束时间(HH:mm)必须大于当前时间!');
				$(n).focus();
				valid = false;
				return valid;
			}
			timeIntervals["index" + i]["endPeriod"] = n.value;
		});
		if(!valid){ return; }
		
		//校验时间段是否有重叠
		var timeArrays = [];
		for(var prop in timeIntervals){
			timeArrays.push(timeIntervals[prop]);
		}
		var len = timeArrays.length;
		var hasConflictPeriod = false;
		for(var i = 0; i < len; i++){
			var sPeriod = timeArrays[i].startPeriod;
			for(var j = 0; j < len; j++){
				if(i != j){
					if(sPeriod >= timeArrays[j].startPeriod && sPeriod < timeArrays[j].endPeriod){
						hasConflictPeriod = true;
						break;
					}
				}
			}
			if(hasConflictPeriod){
				break;
			}
		}
		if(hasConflictPeriod){
			alert("促销时间段(HH:mm)不能有重叠!");
			return;
		}
		
		$selectedTypeCtn.find("input[type='text'][name='discountPrice']").each(function(i, n){
			if(!n.value){
				alert('请输入促销价格!');
				$(n).focus();
				valid = false;
				return valid;
			}
			if(!/^[1-9]{1}\d*$/.test(n.value)){
				alert('促销价格必须是正整数!');
				$(n).focus();
				valid = false;
				return valid;
			}
			if(n.value<price&&result){
				result=false;
			}
			timeIntervals["index" + i]["discountPrice"] = n.value;
		});
		if(!valid){ return; }
		$selectedTypeCtn.find("input[type='text'][name='totalCount']").each(function(i, n){
			if(!n.value){
				alert('请输入促销数量!');
				$(n).focus();
				valid = false;
				return valid;
			}
			if(!/^[1-9]{1}\d*$/.test(n.value)){
				alert('促销数量必须是正整数!');
				$(n).focus();
				valid = false;
				return valid;
			}
			timeIntervals["index" + i]["totalCount"] = n.value;
		});
		if(!valid){ return; }
	}else if(type == 2){ //验证固定时间段内的表单
		startDateTime = form["startDateTime" + type].value;
		if(!startDateTime){
			alert('请输入开始时间!');
			$(form["startDateTime" + type]).focus();
			return;
		}
		endDateTime = form["endDateTime" + type].value;
		if(!endDateTime){
			alert('请输入结束时间!');
			$(form["endDateTime" + type]).focus();
			return;
		}
		var nowDate = new Date();
		var endDate = parseDate(endDateTime);
		if(nowDate.getTime() > endDate.getTime()){
			alert('结束时间必须大于当前时间!');
			$(form["endDateTime" + type]).focus();
			return valid;
		}
		el = $selectedTypeCtn.find("input[type='text'][name='discountPrice']");
		discountPrice = el.val();
		if(!discountPrice){
			alert('请输入促销价格!');
			el.focus();
			return;
		}
		if(!/^[1-9]{1}\d*$/.test(discountPrice)){
			alert('促销价格必须是正整数!');
			el.focus();
			return;
		}
		if(discountPrice<price){
			result=false;
		}
		el = $selectedTypeCtn.find("input[type='text'][name='totalCount']");
		totalCount = el.val();
		if(!totalCount){
			alert('请输入促销数量!');
			el.focus();
			return;
		}
		if(!/^[1-9]{1}\d*$/.test(totalCount)){
			alert('促销数量必须是正整数!');
			el.focus();
			return;
		}
		
		timeIntervals["index0"] = {
			id: $selectedTypeCtn.find("input[type='hidden'][name='id']").val(),
			discountId: discountId,
			startDateTime: startDateTime,
			endDateTime: endDateTime,
			period: false,
			discountPrice: discountPrice,
			totalCount: totalCount
		};
	}
	
	var timeIntervalArray = [];
	for(var prop in timeIntervals){
		timeIntervalArray.push(timeIntervals[prop]);
	}
	var discountIntervalJsonList = $.toJSON(timeIntervalArray);
	
	var isAllCinema, isAllFilm;
	var $selectedType4Cinema = $form.find("input[type='radio'][name='isAllCinema']:checked");
	if(!$selectedType4Cinema.length){
		alert("请选择促销影院!");
		return;
	}
	var discountCinemaJsonList = "";
	isAllCinema = $selectedType4Cinema.val();
	var discountCinemas = [];
	if(isAllCinema == 0){ //选择特定影院?
		$("#selectedCinemaList").find("li > a > label").each(function(i, n){
			discountCinemas.push({
				id: $(n).attr("data-id"),
				discountId: discountId,
				cinemaId: $(n).attr("data-cinemaid")
			});
		});
		if(!discountCinemas.length){
			alert("请选择促销影院!");
			return;
		}
	}else{
		discountCinemas.push({
			id: $selectedType4Cinema.attr("data-id"),
			discountId: discountId,
			cinemaId: -1
		}); //-1代表所有影院
	}
	discountCinemaJsonList = $.toJSON(discountCinemas);
	
	var $selectedType4Film = $form.find("input[type='radio'][name='isAllFilm']:checked");
	if(!$selectedType4Film.length){
		alert("请选择促销影片!");
		return;
	}
	var discountFilmJsonList = "";
	isAllFilm = $selectedType4Film.val();
	var discountFilms = [];
	if(isAllFilm == 0){ //选择特定影院?
		$("#selectedFilmList").find("li > a > label").each(function(i, n){
			var showTypes = $(n).attr("data-showtypes");
			showTypes = "," + showTypes + ",";
			discountFilms.push({
				id: $(n).attr("data-id"),
				discountId: discountId,
				filmId: $(n).attr("data-filmid"),
				hasShowType2d: showTypes.indexOf(",0,") > -1,
				hasShowType3d: showTypes.indexOf(",1,") > -1,
				hasShowType2dImax: showTypes.indexOf(",2,") > -1,
				hasShowType3dImax: showTypes.indexOf(",3,") > -1,
				hasShowType4d: showTypes.indexOf(",4,") > -1,
				hasShowTypeDmax: showTypes.indexOf(",6,") > -1
			});
		});
		if(!discountFilms.length){
			alert("请选择促销影片!");
			return;
		}
	}else{
		var $selectedShowTypes4AllFilm = $("#selectedShowTypes4AllFilm");
		if(!$selectedShowTypes4AllFilm.find("input[type='checkbox'][name='showType']:checked").length){
			alert("请选择促销影片-全部影片的播放类型!");
			return;
		}
		discountFilms.push({
			id: $selectedType4Film.attr("data-id"),
			discountId: discountId,
			filmId: -1, //-1代表所有影片
			hasShowType2d: $selectedShowTypes4AllFilm.find("input[type='checkbox'][name='showType'][value='0']")[0].checked,
			hasShowType3d: $selectedShowTypes4AllFilm.find("input[type='checkbox'][name='showType'][value='1']")[0].checked,
			hasShowType2dImax: $selectedShowTypes4AllFilm.find("input[type='checkbox'][name='showType'][value='2']")[0].checked,
			hasShowType3dImax: $selectedShowTypes4AllFilm.find("input[type='checkbox'][name='showType'][value='3']")[0].checked,
			hasShowType4d: $selectedShowTypes4AllFilm.find("input[type='checkbox'][name='showType'][value='4']")[0].checked,
			hasShowTypeDmax: $selectedShowTypes4AllFilm.find("input[type='checkbox'][name='showType'][value='6']")[0].checked
		});
	}
	discountFilmJsonList = $.toJSON(discountFilms);
	
	var orderLimit = form.orderLimit.value;
	if(!orderLimit){
		alert('请输入每单使用限量!');
		$(form.orderLimit).focus();
		return;
	}
	if(!/^[1-9]{1}\d*$/.test(orderLimit)){
		alert('每单使用限量必须是正整数!');
		$(form.orderLimit).focus();
		return;
	}
	if(parseInt(orderLimit) > 4){
		alert('请输入每单使用限量最大不超过4个!');
		$(form.orderLimit).focus();
		return;
	}
	
	var $isQbaoHall = $form.find("input[type='checkbox'][name='isQbaoHall']:checked");
    var $hasHugeScreen = $form.find("input[type='checkbox'][name='hasHugeScreen']:checked");
    var $hasOtherHallType = $form.find("input[type='checkbox'][name='hasOtherHallType']:checked");
	if(!($isQbaoHall.length || $hasHugeScreen.length || $hasOtherHallType.length)){
		alert('未选择影厅类型!');
		return;
	}
	var isQbaoHall = $isQbaoHall.val();
	var hasHugeScreen = $hasHugeScreen.val();
	var hasOtherHallType = $hasOtherHallType.val();
	
	
	if(!result){
		result=confirm("低于30元销售，会亏本!");
	}
	if(result){
		btn.attr("data-submited", true);
		$.ajax({
			async : true,
			cache : false,
			type : 'post',
			dataType : 'json',
			data : {
				id : discountId,
				name : name,
				description : description,
				type : type,
				allCinema : isAllCinema == 1 ? true : false,
				allFilm : isAllFilm == 1 ? true : false,
				qbaoHall : isQbaoHall == 1 ? true : false,
	            			hasHugeScreen : hasHugeScreen,
	            			hasOtherHallType : hasOtherHallType,
	            			accountLimit: form.accountLimit.value,
	            			phonenumLimit: form.phonenumLimit.value,
	            			devcodeLimit: form.devcodeLimit.value,
				orderLimit: orderLimit,
				discountIntervalJsonList : discountIntervalJsonList,
				discountCinemaJsonList: discountCinemaJsonList,
				discountFilmJsonList: discountFilmJsonList
			},
			url : form.action,
			success : function(response) {
				if (response) {
					alert(response.msg);
					if(response.success){
						window.location.href = CONTEXT_PATH + '/discount/list';
					}else{
						btn.removeAttr("data-submited");
					}
				} else {
					alert('请求失败!');
					btn.removeAttr("data-submited");
				}
			},
			error : function() {
				alert('请求失败!');
				btn.removeAttr("data-submited");
			}
		});
	}
}