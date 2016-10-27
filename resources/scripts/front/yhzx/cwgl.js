/**
 * 充值记录查询
 */
function  toQueryPayRecord(){
	$('#startTime').val($('#datetime1').html());
	$('#endTime').val($('#datetime2').html());
	document.payQueryForm.submit();
}

function toQueryPrizeRecord(){
	$('#beginTime').val($('#datetime3').html());
	$('#lastTime').val($('#datetime4').html());
	document.prizeQueryForm.submit();
}