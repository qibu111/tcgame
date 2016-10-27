/**
 * 查询票务配置列表
 */
function queryTicketConfigList(){
	document.ticketConfigQueryForm.orderby.value = DEFAULT_TICKET_CONFIG_QUERY_LIST_ORDER_BY;
	document.ticketConfigQueryForm.order.value = DEFAULT_TICKET_CONFIG_QUERY_LIST_ORDER;
	document.ticketConfigQueryForm.submit();
}