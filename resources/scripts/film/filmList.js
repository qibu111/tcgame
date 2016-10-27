/**
 * 查询影片列表
 */
function queryFilmList(){
	document.filmQueryForm.orderby.value = DEFAULT_FILM_QUERY_LIST_ORDER_BY;
	document.filmQueryForm.order.value = DEFAULT_FILM_QUERY_LIST_ORDER;
	document.filmQueryForm.pageIndex.value = 1;
	document.filmQueryForm.submit();
}