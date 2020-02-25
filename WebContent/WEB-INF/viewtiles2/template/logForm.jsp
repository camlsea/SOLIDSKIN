<%@page contentType="text/html; charset=UTF-8"%>
<%@ page import="java.util.Date" %>
<%@ page import="java.text.SimpleDateFormat" %>
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

<%}
	else{	
	%>
&nbsp;
<%String name=(String)session.getAttribute("u_name");
	long lasttime = session.getLastAccessedTime();
	SimpleDateFormat sFormat = new SimpleDateFormat();
	
	Date lasttimeF = new Date(lasttime);
	
	String lastTimeAccessF = sFormat.format(lasttimeF);
%>
<%=id%>님 안녕하세요 &nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;<%=lastTimeAccessF %>
<%} %>
</body>
</html>