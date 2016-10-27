/**
 * 查询城市列表
 */
function queryCityList(){
	document.cityQueryForm.orderby.value = DEFAULT_FILM_QUERY_LIST_ORDER_BY;
	document.cityQueryForm.order.value = DEFAULT_FILM_QUERY_LIST_ORDER;
	document.cityQueryForm.pageIndex.value = 1;
	document.cityQueryForm.submit();
}