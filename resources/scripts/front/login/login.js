
$(function() {
	$('#rightFix .fixPhone').hover(function(){
		$('#rightFix .message').show('slow');
	}, function(){
		$('#rightFix .message').hide('slow');
	});
})

function toRegister()
{
	 window.location=CONTEXT_PATH+"/toregister"; 
}

function  register(type){
	clearDiv();
	var userName, password, realName, card, validateCode, promoter, age, sex, protocal = false, phone, email;
	if(type == 1){
	    //手机
		userName = $("#mobileNum").val();
		if (userName == "" || userName == null){
			divShow("1","手机号不能为空");
			return false;
		}
		if(!checkPhone(userName)){
			divShow("1","手机号格式错误");
			return false;
		}
		phone = userName;
		password = $("#passwordp").val();
		var password2 = $("#password2").val();
		if (password == "" || password == null){
			divShow("2","密码不能为空");
			return false;
		}
		if (password2 == "" || password2 == null){
			divShow("3","确认密码不能为空");
			return false;
		}
		if (password != password2){
			$("#passwordp").val("");
			$("#password2").val("");
			divShow("3","2次密码输入不一致，请重新输入");
			return false;
		}
		if(password.length<6 || password.length>16){
			divShow("2","密码长度为6-16位");
			return false;
		}
		age = $("#age").val();
		sex = $('input:radio[name="sex"]:checked').val();
		promoter = $("#promoter").val();
		realName = $("#realName").val();
		card = $("#card").val();
		
		if (realName == "" || realName == null){
			divShow("4","真实姓名不能为空");
			return false;
		}
		if (card == "" || card == null){
			divShow("5","身份证号码不能为空");
			return false;
		}
		if(!isCardNo(card)){
			divShow("5","身份证号码格式错误");
			return false;
		}
		if (age == "" || age == null){
			divShow("6","年龄不能为空");
			return false;
		}
		if(!validate(age) || age.length>2){
			divShow("6","年龄输入错误");
			return false;
		}
		if (sex == "" || sex == null){
			divShow("7","请选择性别");
			return false;
		}
		validateCode = $("#smsValidateCode").val();
		if (validateCode == "" || validateCode == null){
			divShow("8","信息验证码不能为空");
			return false;
		}
		if($('#protocal').is(':checked')){
		    protocal = true;
		}
		if (!protocal){
			divShow("9","请同意米乐汇游戏服务协议");
			return false;
		}
	}else{
	   //邮箱
	    userName = $("#email").val();
	    if (userName == "" || userName == null){
			divShow("10","邮箱不能为空");
			return false;
		}
	    if(!checkEmail(userName)){
			divShow("10","邮箱格式错误");
			return false;
		}
	    email = userName;
	    password = $("#password1").val();
	    var password12 = $("#password12").val();
	    if (password == ""){
			divShow("11","密码不能为空");
			return false;
		}
	    if (password12 == ""){
			divShow("12","确认密码不能为空");
			return false;
		}
		if (password != password12){
			$("#password1").val("");
			$("#password12").val("");
			divShow("12","2次密码输入不一致，请重新输入");
			return false;
		}
		if(password.length<6 || password.length>16){
			divShow("12","密码长度为6-16位");
			return false;
		}
		age = $("#age1").val();
		sex=$('input:radio[name="sex1"]:checked').val();
		promoter = $("#promoter1").val();
		realName = $("#realName1").val();
		card = $("#card1").val();
		
		
		if (realName == "" || realName == null){
			divShow("13","真实姓名不能为空");
			return false;
		}
		if (card == "" || card == null){
			divShow("14","身份证号码不能为空");
			return false;
		}
		if(!isCardNo(card)){
			divShow("14","身份证号码格式错误");
			return false;
		}
		if (age == "" || age == null){
			divShow("15","年龄不能为空");
			return false;
		}
		if(!validate(age) || age.length>2){
			divShow("15","年龄输入错误");
			return false;
		}
		if (sex == "" || sex == null){
			divShow("16","请选择性别");
			return false;
		}
		if($('#protocal').is(':checked')){
		    protocal = true;
		}
		if($('#protocal1').is(':checked')){
		    protocal = true;
		}
		if (!protocal){
			divShow("17","请同意米乐汇游戏服务协议");
			return false;
		}
	}	
	$('#type').val(type);
	 httpReqSimple(CONTEXT_PATH + "/frontUser/checkeUnique",{userName:userName,realName:realName,card:card,phone:phone,email:email},
		function(result){
			if(result != null)
			{
				if(result.resultCode != null && result.resultCode != "0000"){
					if(type == 1){
						if(result.resultCode == "0001"){
							divShow("2","真实姓名已被注册,请重新输入");
						}else if(result.resultCode == "0002"){
							divShow("5","身份证号码已被注册,请重新输入");
						}else if(result.resultCode == "0003"){
							alert("用户名已被注册,请重新输入");
						}else if(result.resultCode == "0005"){
							
						}
					}else{
						if(result.resultCode == "0001"){
							divShow("13","真实姓名已被注册,请重新输入");
						}else if(result.resultCode == "0002"){
							divShow("14","身份证号码已被注册,请重新输入");
						}else if(result.resultCode == "0003"){
							alert("用户名已被注册,请重新输入");
						}
					}
					 if(result.resultCode == "0004"){
							divShow("10","邮箱已被注册,请重新输入");
						}else if(result.resultCode == "0005"){
							divShow("1","手机号已被注册,请重新输入");
						}
					return false;
				}
				//注册
				var url = CONTEXT_PATH + "/register" , qq = $("#qq").val();
				var paramaters = {userName:userName,password:password,realName:realName,card:card,
						validateCode:validateCode,promoter:promoter,type:type,age:age,sex:sex,qq:qq};
				httpReqSimple(url,paramaters,
				function(result){
					if(result != null)
					{
						if (result.resultCode == '0000') {
							//注册成功
							alert(result.resultMsg);
							window.location.href = CONTEXT_PATH + '/index';
							//清空
						}else{
							if(result.resultCode == '0001'){
								divShow("8",result.resultMsg);
							}else if(result.resultCode == '0005'){
								if(type == 1){
									divShow("4","实名认证失败，请您重新输入");
								}else {
									divShow("13","实名认证失败，请您重新输入");
								}
							}else{
								alert(result.resultMsg);
							}
						}
					}
				}
				);	
		    }else{
		    	alert("注册失败，请重试");
		    }
	 });
}

function login(){
	var userName = $("#userName").val();
	if (userName == "" || userName == null){
		alert("用户名不能为空！");
		return false;
	}
	var password = $("#password").val();
	if (password == "" || password == null){
		alert("密码不能为空！");
		return false;
	}
	var validateCode = $("#validateCode").val();
	if (validateCode == "" || validateCode == null){
		alert("验证码不能为空！");
		return false;
	}
	
	 //校验验证码是否匹配：
	 httpReqSimple(CONTEXT_PATH + "/code/chk.do",{validateCode:validateCode},
		function(result){
			if(result != null)
			{
 			  if(result.resCode == "0000")
 			  {
	 			   	var url = CONTEXT_PATH + "/portal/login";
	 				var paramaters = {userName:userName,password:password};
	 				httpReqSimple(url,paramaters,
	 				function(result){
	 					if(result != null)
	 					{
	 						if(result.resultCode != null && result.resultCode == "0000") {
	 							//登录成功
	 							alert("登录成功");
	 							$("#userName").val("");
	 							$("#password").val("");
	 							$("#validateCode").val("");
	 							window.location.href = CONTEXT_PATH + '/index';
	 						}else{
	 							alert("错误："+result.resultMsg);
	 						}
	 					}
	 				});
			}else{
				alert(result.resMsg);
				$("#validateCodeImg").attr("src",CONTEXT_PATH + "/code/generateCode.do?"+Math.random());
			}
 		}
	 });
}

//刷新验证码
function changeImg(){
    $("#validateCodeImg").attr("src",CONTEXT_PATH + "/code/generateCode.do?"+Math.random());
}

//获取验证码
function getRegValidateCode(){
    var mobileNum = $("#mobileNum").val();
    var re = /^1\d{10}$/;
    if (!re.test(mobileNum)) {
        alert("请正确填写手机号！");
    }else{
        httpReqSimple(CONTEXT_PATH + "/frontUser/getRegValidateCode",{ mobileNum:mobileNum},
         function (data) {
            if (data != null) {
            if(data.respcode == '0000'){
             	alert(data.resultMsg);
                readTime();
            }else{
            	alert(data.resultMsg);
            }
            }else{
                alert("系统错误");
            }
        })
    }
    
} 

 //倒计时
function readTime(){
    var intCC;
    var countdown = 60;
    intCC = setInterval(function(){
            settime()}, 1000);

    function settime() {
        if (countdown == 0) {
            $("#sendRegMsg").html("");
            $("#sendRegMsg").html("<input class=\"btn02\" style=\"width:120px;margin:0;line-height:40px;height:40px;\" value=\"获取验证码\" type=\"button\" onclick=\"getRegValidateCode();\">");
            clearInterval(intCC);
        } else {
            $("#sendRegMsg").html("");
            $("#sendRegMsg").html(""+ countdown + "秒后重新发送</a>");
            countdown--;
        }
    }
}

function divShow(name,showMeg){
	var tempNme = "#parameter_"+name;
	$(tempNme).show();
	$(tempNme).text(showMeg) 
}

function clearDiv(){
	
	var tempNme = "#parameter_";
	for(var i=1; i<18 ;i++){
		$(tempNme+i).hide();
	}
}
function SetHome(obj,url){
    try{
        obj.style.behavior='url(#default#homepage)';
        obj.setHomePage(url);
    }catch(e){
        if(window.netscape){
            try{
                netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
            }catch(e){
                alert("抱歉，此操作被浏览器拒绝！\n\n请在浏览器地址栏输入'about:config'并回车然后将[signed.applets.codebase_principal_support]设置为'true'");
            }
        }else{
            alert("抱歉，您所使用的浏览器无法完成此操作。\n\n您需要手动将【"+url+"】设置为首页。");
        }
    }
}
                     
//收藏本站
function AddFavorite(title, url) {
    try {
        window.external.addFavorite(url, title);
    }
    catch (e) {
        try {
            window.sidebar.addPanel(title, url, "");
        }
        catch (e) {
            alert("抱歉，您所使用的浏览器无法完成此操作。\n\n加入收藏失败，请使用Ctrl+D进行添加");
        }
    }
}

function InitMenu(){
    var _menu = document.getElementById("indexmenu").getElementsByTagName("li");
    var _page =window.location.pathname;
    if(_page=='/'){_menu[0].className='meuncan01';return}
    for(i=0;i<_menu.length;i++)
    {
        if(_menu[i].getElementsByTagName("a")[0].href.indexOf(_page)!=-1){_menu[i].className='meuncan01';break;}
    }
}
function SetHome(obj,url){
    try{
        obj.style.behavior='url(#default#homepage)';
        obj.setHomePage(url);
    }catch(e){
        if(window.netscape){
            try{
                netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
            }catch(e){
                alert("抱歉，此操作被浏览器拒绝！\n\n请在浏览器地址栏输入'about:config'并回车然后将[signed.applets.codebase_principal_support]设置为'true'");
            }
        }else{
            alert("抱歉，您所使用的浏览器无法完成此操作。\n\n您需要手动将【"+url+"】设置为首页。");
        }
    }
}
                     
//收藏本站
function AddFavorite(title, url) {
    try {
        window.external.addFavorite(url, title);
    }
    catch (e) {
        try {
            window.sidebar.addPanel(title, url, "");
        }
        catch (e) {
            alert("抱歉，您所使用的浏览器无法完成此操作。\n\n加入收藏失败，请使用Ctrl+D进行添加");
        }
    }
}

function InitMenu(){
    var _menu = document.getElementById("indexmenu").getElementsByTagName("li");
    var _page =window.location.pathname;
    if(_page=='/'){_menu[0].className='meuncan01';return}
    for(i=0;i<_menu.length;i++)
    {
        if(_menu[i].getElementsByTagName("a")[0].href.indexOf(_page)!=-1){_menu[i].className='meuncan01';break;}
    }
}
function downloadfile(dnAddr) {
	 parent.window.location=CONTEXT_PATH+"/frontGame/zipdownload?fileName="+encodeURI(encodeURI(dnAddr)); 
}
