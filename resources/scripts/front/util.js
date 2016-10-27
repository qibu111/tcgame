//手机号码校验
function checkPhone(mobileNum){
	var re = /^1\d{10}$/;
    if (!re.test(mobileNum)) {
		 return false;
    }
    return true;
}
//校验邮箱
function checkEmail(str){
   var re = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/
   if(re.test(str)){
       return true
   }
   return false;
}

//校验身份证号码
function isCardNo(card)  
{  
   // 身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X  
   var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;  
   if(reg.test(card) === false)  
   {  
       return  false;  
   }
   return true;
} 

//校验数字
function validate(str){  
   var reg = new RegExp("^[0-9]*$");  
   if(!reg.test(str)){  
	   return false;
   }  
   return true;
}  