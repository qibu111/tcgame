
/**
 * 分页方法-跳向哪一页
 * @param el
 * @param pageNum
 */
function jumpToPage(el, pageNum) {
	///var pagerWrapElement = $(el).closest(".tickets-pagination");
	var targetFormId = $("#formId").val();
	var targetForm = $("#" + targetFormId);
	
	$("#pageIndex").val(pageNum);
	targetForm.submit();
}



//跳转分页

function goPage(page)
{
	//如果非法数字或小于等于0，则设置为首页
	if(isNaN(page))
	{
		page=1;
	}
	if(page<=0)
	{
		page=1;
	}
	
	//获取总页数
	var total = $("#pageCount").val();
	if(total==''||total==0)
	{
		total=1;
	}
	if(page>=Number(total))
	{
		page =total;
	}
	
	showPage(Number(page),Number(total));
	
	$("#pageIndex").val(page);
	
	$("#formId").submit();
	
	//进行页面跳转查询
}

function showPage(page,total)
{
	var outstr='';
	console.info("showpage==================="+page+","+total);
	//根据总页数进行定义
	if(page==1)
	{
		//outstr = "<a href='javascript:void(0)'>"+上一页+"</a>";
	}else
	{
		outstr = "<a href='javascript:void(0)' onclick='goPage("+(page-1)+")'>上一页</a>";
	}
	var count=0;
	//如果小于10 
	if(total<10)
	{
		for (count=1;count<=total;count++) 
        {   
			if(count!=page) 
            { 
				outstr += "<a href='javascript:void(0)' onclick='goPage("+count+")'>["+count+"]</a>"; 
            }else{ 
            	outstr += "<span class='current' >"+count+"</span>";  //设置样式
            } 
        } 
		
		
	}
	if(total>10){        //总页数大于十页 
		
		var p = page-4;
		if(p<=0)
		{
			p=1;
		}
		var n = page+4;
		console.info("--page="+page+"-"+p+","+n);
		if(n>=total)
		{
			n=total;
		}
		console.info(p+","+n);
		for (count=p;count<page;count++) 
        {   if(count!=page) 
            { 
        		outstr += "<a href='javascript:void(0)' onclick='goPage("+count+")'>["+count+"]</a>"; 
            }else{ 
            	outstr += "<span class='current'>"+count+"</span>"; 
            } 
        } 
		
		
		for (count=page;count<=n;count++) 
        {   if(count!=page) 
            { 
        		outstr += "<a href='javascript:void(0)' onclick='goPage("+count+")'>["+count+"]</a>"; 
            }else{ 
            	outstr += "<span class='current'>"+count+"</span>"; 
            } 
        } 
    }  
	if(page==total)
	{
		//outstr += "<a href='javascript:void(0)'>"+下一页+"</a>";
	}else
	{
		outstr += "<a href='javascript:void(0)' onclick='goPage("+(page+1)+")'>下一页</a>";
	}
	
	$("#pageDiv").html(outstr);
	
}