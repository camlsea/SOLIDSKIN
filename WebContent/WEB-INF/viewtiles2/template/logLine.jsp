<%@page contentType="text/html; charset=UTF-8"%>
  
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>

<body>
<%
	String id=(String)session.getAttribute("u_id");
	if(id==null)
	{
%>
<a href="<%=request.getContextPath()%>/login.do"> <span>로그인</span> </a>
&nbsp;
<a href="<%=request.getContextPath()%>/member/join.do"> <span>회원가입</span></a>

<%}
	else{	
	%>
&nbsp;
<%String name=(String)session.getAttribute("u_name");
%>
<%=id%>님 안녕하세요 &nbsp;&nbsp;&nbsp;
<a href="<%=request.getContextPath()%>/loginstatus.do?u_id=${u_id}">회원정보</a>
<a href="<%=request.getContextPath()%>/logout.do">로그아웃</a>

<%} %>


</body>
</html>