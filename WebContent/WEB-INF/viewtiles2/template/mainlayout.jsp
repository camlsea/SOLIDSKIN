<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib prefix="tiles"  uri="http://tiles.apache.org/tags-tiles"%>
  
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
   "http://www.w3.org/TR/html4/loose.dtd">

<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        <title><tiles:getAsString name="title" /></title>
    </head>
    <body>

    <table border=0 cellpadding=0 cellspacing=1 bgcolor="#a0a0a0" width="100%">
        <tr height=100 valign="middle" bgcolor="#ffffff">
        	<td width="15%"><tiles:insertAttribute name="banner"/></td>
            <td width="85%"><tiles:insertAttribute name="header"/>
		<table border="0" cellpadding="0" cellspacing="0" align="center" width="1000">
             <tr>
				<td height="50" align="right" ><tiles:insertAttribute name="logLine"/></td>
			</tr>
        </table>       
            </td>        
        </tr>
        <tr height="670" bgcolor="#ffffff">
      
            <td width="15%" valign="top"><!-- 로그인 윗부분 -->

            <table border=0 cellpadding=0 cellspacing=1 bgcolor="bluesky" width="100%">
            <tr height="100">
            <td width="180"><tiles:insertAttribute name="member"/></td>
            </tr>
            </table>
            <tiles:insertAttribute name="menu"/>
            </td>
            <td width="85%"><%-- <tiles:insertAttribute name="mainbody"/> --%>
            
           <table border=1 width="100%">
            
            <tr height="300">
         		
           		<td  width="50%">
          		
           		<tiles:insertAttribute name="mininotice"/>
            	
            	</td>
            
            	
            	<td width="50%" rowspan="2">
            	<table>
            	<td>
            	<tiles:insertAttribute name="miniart"/>
            	</td>
            	</table>
            	</td>
            	
            </tr>
            <tr height="300">
            	<td  width="70%">
            	<table>
            	<td>
            	<tiles:insertAttribute name="minifree"/>
            	</td>
            	</table> 
            	</td>
            </tr>  
     </table>
     
     </td>
     
        </tr>
      
        <tr bgcolor="#ffffff">
            <td colspan=2><tiles:insertAttribute name="footer"/></td>
        </tr>
    </table>
    </body>
</html>


