//初始化分页对象

var totalNum=0; //总记录条数
var pageNo=1;  //页码
var pageSize=10; //每页显示条数
var totalPage=0; //总页码
var pageItems=""; //显示个数

function init(pageNo)
{
	$("#pageDiv").html("");
	//console.info("jjjjjjjjjjjjjjjj");
	//console.info("pageNo="+pageNo+",pageSize="+pageSize+",totalNum="+totalNum+",totalPage="+totalPage+",pageItems="+pageItems);
	var pg ="";
	if(totalNum==0)
	{
		$("#pageDiv").html("");
		return;
	}
	
	pg+="<ul data-am-widget='pagination' class='am-pagination am-pagination-default padtb15' style='margin:0 auto' >";
	
	if(pageNo==1)
	{
		pg+="<li><a href='javascript:;'>上一页</a></li>";
	}else
	{
		pg+="<li><a href='javascript:;' onclick='jumpToPage(this,1);'>首页</a></li>";
		pg+="<li><a href='javascript:;' onclick='jumpToPage(this,"+(pageNo-1)+");'>上一页</a></li>";
	}
	
	for(var i=0;i<pageItems.length;i++)
	{
		var item = pageItems[i];
		if(item==pageNo)
		{
			pg+="<li class='am-active'>";
		}else
		{
			pg+="<li>";
		}
		if(item==pageNo)
		{
			pg+="<a href='javascript:;' class='am-active'>"+item+"</a>";
		}else
		{
			pg+="<a href='javascript:;' onclick='jumpToPage(this,"+item+");'>"+item+"</a>";
		}
		pg+="</li>";
	}
	
	if(pageNo<totalPage)
	{
		pg+="<li><a href='javascript:;' onclick='jumpToPage(this,"+(pageNo+1)+");'>下一页</a></li>";
		pg+="<li><a href='javascript:;' onclick='jumpToPage(this,"+totalPage+");'>尾页</a></li>";
	}
	if(pageNo==totalPage)
	{
		pg+="<li><a href='javascript:;' >下一页</a></li>";
	}
	pg+="</ul>";
	//console.info("pg="+pg);
	//根据记录值来进行判断
	$("#pageDiv").html(pg);
}


/**
 * 分页方法-跳向哪一页
 * @param el
 * @param pageNum
 */
function jumpToPage(el, pageNum) {
	
	
	
	pageList(pageNum)
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