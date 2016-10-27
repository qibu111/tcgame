

function  update(type){
	var age = $("#age").val();
	if (age == "" || age == null){
		alert("年龄不能为空！");
		return false;
	}
	if(!validate(age) || age.length>2){
		alert("年龄输入错误！");
		return false;
	}
	var sex =$('input:radio[name="sex"]:checked').val();
	if (sex == "" || sex == null){
		alert("请选择性别！");
		return false;
	}
	var qq = $("#qq").val();
	var phone;
	var email;
	if(type == 1){
		//手机注册
		email = $("#email").val();
		if (email == "" || email == null){
			alert("邮箱不能为空！");
			return false;
		}
		if(!checkEmail(email)){
			alert("邮箱格式错误！");
			return false;
		}
	}else{
		phone = $("#phone").val();
		if (phone == "" || phone == null){
			alert("手机号不能为空！");
			return false;
		}
		//邮箱注册
		if(!checkPhone(phone)){
			alert("手机号格式错误！");
			return false;
		}
	}
	
	var url = CONTEXT_PATH + "/frontUser/commonUser/updateUser";
	var paramaters = {age:age,sex:sex,qq:qq,phone:phone,email:email};
	httpReqSimple(url,paramaters,
	function(result){
		if(result != null)
		{
			if (result.resultCode = 0000) {
				//更新成功
				alert(result.resultMsg);
			}else{
				alert(result.resultMsg);
			}
		}
	}
	);	
}

function  changePassword(){
	var passwordOld = $("#passwordOld").val();
	if (passwordOld == "" || passwordOld == null){
		alert("原始密码不能为空");
		return false;
	}
	var password1 = $("#password1").val();
	var password2 = $("#password2").val();
	if (password1 == "" || password2 == "" || password1 == null || password2 == null){
		alert("新密码不能为空！");
		return false;
	}
	if (password1 != password2){
		alert("2次密码输入不一致，请重新输入！");
		$("#password1").val("");
		$("#password2").val("");
		return false;
	}
	if(passwordOld == password1){
		alert("新密码和旧密码不能相同");
		return false;
	}
	if(password1.length<6 || password1.length>16){
		alert("密码长度为6-16位");
		return false;
	}
	
	httpReqSimple(CONTEXT_PATH + "/frontUser/commonUser/changePassword",{passwordOld:passwordOld,password1:password1},
	function(result){
		if(result != null)
		{
			if(result.resultCode != null){
				if(result.resultCode == "0000"){
					alert("修改成功");
					window.location.href = CONTEXT_PATH + '/frontUser/commonUser/toZhaq';
				}else{
					alert(result.resultMsg);
				}
		    }else{
		    	alert("修改失败，请重试");
		    }
		}
	 });	
}