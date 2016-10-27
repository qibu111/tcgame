/**
 * 易宝支付提交
 */
function  toYeePay(){
	
	var account = $("#yeeAccount").val();
	var account2 = $("#yeeAccount2").val();
	if (account == "" || account != account2){
		alert("充值账号输入错误！");
		return false;
	}
	
	var url = CONTEXT_PATH + "/code/chk";
	httpReqSimple(url,
			{
				validateCode:$("#yeevalidateCode").val()
			},
			function(result){
				if(result!=null)
				{
					if(result.resCode=="0000")
					{
						document.yeePayForm.submit();
					}else
					{
						alert(result.resMsg);
						var temp = CONTEXT_PATH + "/code/generateCode?";
						$("#yeevalidateCodeImg").attr("src",temp+Math.random());
					}
				}
			}
	);	
}

function yeepayclick(paytypeid){
	$('#yeepaytype').val(paytypeid);
}

function  toAliPay(){
	var account = $("#aliAccount").val();
	var account2 = $("#aliAccount2").val();
	if (account == "" || account != account2){
		alert("充值账号输入错误！");
		return false;
	}
	
	var url = CONTEXT_PATH + "/code/chk";
	httpReqSimple(url,
			{
				validateCode:$("#alivalidateCode").val()
			},
			function(result){
				if(result!=null)
				{
					if(result.resCode=="0000")
					{
						document.aliPayForm.submit();
					}else
					{
						alert(result.resMsg);
						var temp = CONTEXT_PATH + "/code/generateCode?";
						$("#alivalidateCodeImg").attr("src",temp+Math.random());
					}
				}
			}
	);	
}

function alipayclick(paytypeid){
	$('#alipaytype').val(paytypeid);
}

function  toCXKYeePay(){
	
	var account = $("#cxkAccount").val();
	var account2 = $("#cxkAccount2").val();
	if (account == "" || account != account2){
		alert("充值账号输入错误！");
		return false;
	}
	
	var url = CONTEXT_PATH + "/code/chk";
	httpReqSimple(url,
			{
				validateCode:$("#cxkvalidateCode").val()
			},
			function(result){
				if(result!=null)
				{
					if(result.resCode=="0000")
					{
						document.cxkPayForm.submit();
					}else
					{
						alert(result.resMsg);
						var temp = CONTEXT_PATH + "/code/generateCode?";
						$("#cxkvalidateCodeImg").attr("src",temp+Math.random());
					}
				}
			}
	);	
}

function cxkpayclick(paytypeid){
	$('#cxkpaytype').val(paytypeid);
}

function cxkbankclick(cxkbankid){
	$('#cxkfrpid').val(cxkbankid);	
}

function  toXYKYeePay(){
	var account = $("#xykAccount").val();
	var account2 = $("#xykAccount2").val();
	if (account == "" || account != account2){
		alert("充值账号输入错误！");
		return false;
	}
	
	var url = CONTEXT_PATH + "/code/chk";
	httpReqSimple(url,
			{
				validateCode:$("#xykvalidateCode").val()
			},
			function(result){
				if(result!=null)
				{
					if(result.resCode=="0000")
					{
						document.xykPayForm.submit();
					}else
					{
						alert(result.resMsg);
						var temp = CONTEXT_PATH + "/code/generateCode?";
						$("#xykvalidateCodeImg").attr("src",temp+Math.random());
					}
				}
			}
	);		
}

function xykpayclick(paytypeid){
	$('#xykpaytype').val(paytypeid);
}

function xykbankclick(xykbankid){
	$('#xykfrpid').val(xykbankid);	
}

function  toDKYeePay(){
	var account = $("#dkAccount").val();
	var account2 = $("#dkAccount2").val();
	if (account == "" || account != account2){
		alert("充值账号输入错误！");
		return false;
	}
	
	var url = CONTEXT_PATH + "/code/chk";
	httpReqSimple(url,
			{
				validateCode:$("#dkvalidateCode").val()
			},
			function(result){
				if(result!=null)
				{
					if(result.resCode=="0000")
					{
						document.dkPayForm.submit();
					}else
					{
						alert(result.resMsg);
						var temp = CONTEXT_PATH + "/code/generateCode?";
						$("#dkvalidateCodeImg").attr("src",temp+Math.random());
					}
				}
			}
	);		
}

function dkpayclick(paytypeid){
	$('#dkpaytype').val(paytypeid);
}

function dkbankclick(dkbankid){
	$('#dkfrpid').val(dkbankid);	
}

function  toTenPay(){
	var account = $("#tenAccount").val();
	var account2 = $("#tenAccount2").val();
	if (account == "" || account != account2){
		alert("充值账号输入错误！");
		return false;
	}
	
	var url = CONTEXT_PATH + "/code/chk";
	httpReqSimple(url,
			{
				validateCode:$("#tenvalidateCode").val()
			},
			function(result){
				if(result!=null)
				{
					if(result.resCode=="0000")
					{
						document.tenPayForm.submit();
					}else
					{
						alert(result.resMsg);
						var temp = CONTEXT_PATH + "/code/generateCode?";
						$("#tenvalidateCodeImg").attr("src",temp+Math.random());
					}
				}
			}
	);		
}

function tenpayclick(paytypeid){
	$('#tenpaytype').val(paytypeid);
}

//刷新验证码
function changeImg(id){
	var temp = CONTEXT_PATH + "/code/generateCode?";
    var tid = "#" + id;
	$(tid).attr("src",temp+Math.random());  
}