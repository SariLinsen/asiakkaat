<%
//jos kirjautumista ei ole tapahtunut, l�hetet��n k�ytt�j� kirjautumissivulle
if(session.getAttribute("kayttaja")==null) {
	response.sendRedirect("index.jsp");
	return;
}

//estet��n back-napin toiminta uloskirjautumisen j�lkeen
response.setHeader("Cache-Control", "no-cache");
response.setHeader("Cache-Control", "no-store");
response.setHeader("Pragma", "no-cache");
response.setDateHeader("Expires", 0);
%>

