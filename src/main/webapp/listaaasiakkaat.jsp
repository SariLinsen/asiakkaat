<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<script src="scripts/main.js"></script>
<link rel="stylesheet" type="text/css" href="css/main.css">
<title>Asiakkaat</title>

</head>
<body>
<h2>Hae alla olevista asiakkaista</h2>
<table id="listaus" class="tyyli">
	<thead>
		<tr>
			<th>Hakusana:</th>
			<th colspan="2"><input type="text" id="hakusana"></th>
			<th><input type="button" value="hae" id="hakunappi" onclick="haeAsiakkaat()"></th>
		</tr>
		<tr>
			<th>Etunimi</th>
			<th>Sukunimi</th>
			<th>Puhelin</th>
			<th>S�hk�posti</th>
			
		</tr>
	</thead>
	<tbody id="tbody">
	</tbody>
</table>

<span id="ilmo"></span>
<script>

haeAsiakkaat();
</script>
</body>
</html>