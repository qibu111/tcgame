/**
 * 业务操作结果的页面提示消息,如：'xxx保存成功!','xxx删除失败!(错误信息:...)'
 */
function alertMessage(){
	var $pagePromptMessage = $("#pagePromptMessage");
	if($pagePromptMessage.length && $pagePromptMessage.val()){
		alert($pagePromptMessage.val());
	}
	/*var id = "floating-message-alert-" + new Date().getTime();
	$(document.body).append('<div id="' + id + '"><p>' + '添加影片信息成功!' + '</p><a href="javascript:;">x</a></div>');
	$("#" + id).floatingMessage({
		show: "blind",
		hide: "puff",
        time: false,
        position: 'top-left',
        className: 'hyip-success'
    });*/
}

/** 文档装载完毕 */
$(document).ready(function(){
	/*表单提示*/ 
	$(".forms .input_text").bind({ 
		focus:function(){ $(this).siblings(".defaultTips").hide(); }, 
		blur:function(){ 
			if($(this).val() == "")
			$(this).siblings(".defaultTips").show(); 
		},
		load:function(){ 
			if($(this).val() == "")
			{$(this).siblings(".defaultTips").show(); }
		}
	});
	
	/* 文档装载完毕,alert业务操作结果信息(如果有的话) */
	alertMessage();
});
// JavaScript Document
String.prototype.trim = function(){
	return this.replace(/(^\s*)|(\s*$)/g,"");
};

var qb_user = {};
//关闭遮罩和弹出框
qb_user.closePop = function(popWin,shadow){
	if(popWin.length){
		popWin.hide();	
	};
	if(shadow.length){
		shadow.hide();	
	};
};

//弹出dialog
qb_user.dialog = function(option){
	var defaults={
			popBtn:"",
			shadow:1,
			popBox:"",
			closeTag:$(".u2_pbClose"),
			eventType:'click'
		};
	$.extend(defaults,option);
	
	function addShadow(){
		var shadow = '<div id="user_shadow"></div>';
		if($("#user_shadow")[0]){
			$("#user_shadow").show();	
		}else{
			$(defaults.popBox).before(shadow);	
		}
	};
	
	function popWin(){
		var obj = defaults.popBox,
			h = obj.outerHeight(),
			w = obj.outerWidth();
		obj.css({"position":"fixed","left":"50%","top":"50%","margin-left":-w/2,"margin-top":-h/2,"z-index":"100000"});
		obj.show();
	};
	
	function closeWin(){
		defaults.popBox.hide();
		$("#user_shadow").hide();
		if( defaults.closeCallback ){
			defaults.closeCallback();
		}
	};
	
	function init(){
		if(defaults.popBtn =="") return false;
		defaults.popBtn.live(defaults.eventType,function(e){
			if( defaults.login=="" || defaults.login== 'anonymousUser' ){
				if(defaults.doThing){
					defaults.doThing();
				}
			}else{
				var $this = $(this);
				if(defaults.popBox!=""){
					popWin();
					if(defaults.shadow){
						addShadow();
					}
				}
				if(defaults.callback){
					defaults.callback($this);
				}
			}
			e.preventDefault();
		});
		$(defaults.closeTag,defaults.popBox).bind('click',function(){
			closeWin();	
		});
	}
	init();
};

qb_user.dialogOption = {
	addShadow:function (obj){
		var shadow = '<div id="user_shadow"></div>';
		if($("#user_shadow")[0]){
			$("#user_shadow").show();	
		}else{
			obj.after(shadow);
		}
	},
	
	popWin:function (obj){
		var h = obj.outerHeight(),
			w = obj.outerWidth();
		obj.css({"position":"fixed","left":"50%","top":"50%","margin-left":-w/2,"margin-top":-h/2,"z-index":"100000"});
		obj.show();
	},
	
	closeWin:function (obj){
		obj.hide();
		$("#user_shadow").hide();
	}
};
/**
 * 选中列表中的所有行
 * @param el
 */
function selectAllRow(el){
	var checked = el.checked;
	el = $(el);
	var $table = el.closest(".tickets-list-table");
	$table.find("tbody tr td:first-child input[type='checkbox']").each(function(){
		this.checked = checked;
		if(checked){
			$(this).closest("tr").addClass("selected");
		}else{
			$(this).closest("tr").removeClass("selected");
		}
	});
}
/**
 * 选中当前行
 * @param el
 */
function selectRow(el){
	var checked = el.checked;
	el = $(el);
	var $table = el.closest(".tickets-list-table");
	var totalRows = $table.find("tbody tr").length;
	if(checked){
		el.closest("tr").addClass("selected");
	}else{
		el.closest("tr").removeClass("selected");
	}
	var selectedRows = $table.find("tbody tr.selected").length;
	$table.find("thead tr th:first-child input[type='checkbox']").attr("checked", selectedRows == totalRows);
}

/**
 * 分页方法-更改每页显示条数
 * @param el
 * @param targetFormId
 * @param pageNum
 */
function changePageSize(el, targetFormId, pageNum){
	el = $(el);
	if(targetFormId){
		var targetForm = $("#" + targetFormId);
		if(targetForm.length){
			if(!el.hasClass("on")){
				el.siblings("a").removeClass("on");
				el.addClass("on");
				targetForm.find("input[type='hidden'][name='pageNum']").val(pageNum);
				targetForm.find("input[type='hidden'][name='pageIndex']").val(1);
				targetForm.submit();
			}
		}
	}
}
/**
 * 排序按钮被点击
 * @param el			- 排序按钮<a/>
 * @param targetFormId	- 查询form id
 * @param orderby		- 排序字段
 */
function changeOrderBy(el, targetFormId, orderby){
	el = $(el);
	var theadElement = el.closest(".tickets-list-table").children("thead");
	if(theadElement.length && theadElement.attr("data-list-size") == '0'){
		return;
	}
	var targetForm = null;
	if(targetFormId){
		targetForm = $("#" + targetFormId);
	}
	if(!targetForm){
		targetForm = el.clostst("form");
	}
	if(targetForm){
		if(orderby){
			var order = el.hasClass("desc") ? "asc" : "desc";
			el.closest("tr").find("th a.order-by").removeClass("asc").removeClass("desc");
			el.addClass(order);
			targetForm.find("input[type='hidden'][name='orderby']").val(orderby);
			if(el.hasClass("desc")){
				targetForm.find("input[type='hidden'][name='order']").val("desc");
			}else{
				targetForm.find("input[type='hidden'][name='order']").val("asc");
			}
			targetForm.submit();
		}
	}
	
}
/**
 * 分页方法-跳向哪一页
 * @param el
 * @param pageNum
 */
function jumpToPage(el, pageNum) {
	var pagerWrapElement = $(el).closest(".tickets-pagination");
	var targetFormId = pagerWrapElement.attr("data-target-form");
	if(targetFormId){
		var targetForm = $("#" + targetFormId);
		if(targetForm.length){
			if(!pageNum){
				var jumpPageNoElement = pagerWrapElement.find("input.page-jump-input");
				var totalPageCount = jumpPageNoElement.attr("data-totalpage");
				pageNum = jumpPageNoElement.val();
				if(!pageNum){
					alert('请输入分页页码!');
					jumpPageNoElement.focus();
					return;
				}else if(!/^[1-9]{1}\d*$/.test(pageNum)){
					alert('分页页码必须是正整数!');
					jumpPageNoElement.focus();
					return;
				}
				if(totalPageCount && parseInt(pageNum) > parseInt(totalPageCount)){ // 输入的pageNum大于总页数?
					pageNum = totalPageCount;
				}
				jumpPageNoElement.val(pageNum);
			}
			targetForm.find("input[type='hidden'][name='pageIndex']").val(pageNum);
			targetForm.submit();
		}
	}
}

//校验是否为0-9的数字,true=是0-9的数字
function checkNum(paramenter){
	if(!/^[0-9]{1}\d*$/.test(paramenter)){
		return false;
	}
	return true;
}

Date.prototype.format = function(format)
{
    var o = {
        "M+" : this.getMonth()+1, //month
        "d+" : this.getDate(), //day
        "h+" : this.getHours(), //hour
        "m+" : this.getMinutes(), //minute
        "s+" : this.getSeconds(), //second
        "q+" : Math.floor((this.getMonth()+3)/3), //quarter
        "S" : this.getMilliseconds() //millisecond
    }
    if(/(y+)/.test(format)) format=format.replace(RegExp.$1,
        (this.getFullYear()+"").substr(4- RegExp.$1.length));
    for(var k in o)if(new RegExp("("+ k +")").test(format))
        format = format.replace(RegExp.$1,
                RegExp.$1.length==1? o[k] :
                ("00"+ o[k]).substr((""+ o[k]).length));
    return format;
}
