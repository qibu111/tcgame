/**
 * 查询影片列表
 */
function queryDiscountRecordList(){
	document.discountRecordQueryForm.orderby.value = DEFAULT_DISCOUNT_RECORD_QUERY_LIST_ORDER_BY;
	document.discountRecordQueryForm.order.value = DEFAULT_DISCOUNT_RECORD_QUERY_LIST_ORDER;
	document.discountRecordQueryForm.pageIndex.value = 1;
	document.discountRecordQueryForm.submit();
}