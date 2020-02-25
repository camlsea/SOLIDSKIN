<%@page contentType="text/html; charset=UTF-8"%>
<b>main body</b>
<script type="text/javascript"> 
 function main(){
	 location.href("<%=request.getContextPath()%>/miniboard/mini.do");
	 
 }
 main();
 </script>


 
 
<%--   <script type="text/javascript"> 



function notice(){
	 location.href("<%=request.getContextPath()%>/miniboard/minilist.do");

	 }

	notice();
	
function art(){
		 location.href("<%=request.getContextPath()%>/miniboard/miniartBoardList.do");
		 
	 }
	 art();	
	
	 
	 
	 
function free(){
		 location.href("<%=request.getContextPath()%>/miniboard/minifreeList.do");
		 
	 }

	 free();
	 
	
</script>
 --%>
<%-- <html>
<body>


	
<table border=1 width="100%">
            
            <tr height="300">
         
           		<td  width="50%">
          		
           		<div class="list_area">
			<div class="layout">					
			<table>
		 			<colgroup>
						<col width="70px"/>
						<col />
						<col width="120px"/>
						<col width="120px"/>
						<col width="80px"/>
						<col width="80px"/>
					</colgroup>	
					
											
		<tr>									
			<th>번호</th>						
			<th>제목</th>						
			<th>작성자</th>
			<th>작성일</th>
			<th>조회수</th>
		</tr>
		
		
		<c:forEach items="${boardList}" var="article">
			<tr>
				<td class="tc">${article.n_num}</td>
				<td class="tl"><a href='<%=request.getContextPath()%>/board/view.do?n_num=${article.n_num}'>${article.n_title} </a></td>
				<td class="tc">${article.n_writer}</td>
				<td class="tc">${article.n_date}</td>
				<td class="tc">${article.n_count}</td> 
			</tr>
		</c:forEach>
	</table>
           

 			</td>

            	<td width="50%" rowspan="2">
            	
			

            	
            	
            	</td>
            	
            </tr>
            
            <tr height="300">
            	<td  width="50%">
            	
            	 
				

            	
            	</td>
            </tr>  
     </table>
     
     
     </body>
     
   
</html> --%>