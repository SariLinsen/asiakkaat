<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<script src="scripts/main.js"></script>
<title>Asiakkaat</title>
<style>
.tyyli {
	border: 5px outset black;
	background-color: lightgreen;
	text-align: center;
}
</style>
</head>
<body>
<h2>Hae alla olevista asiakkaista</h2>
<table id="listaus" class="tyyli">
	<thead>
		<tr>
			<th>Hakusana:</th>
			<th colspan="3"><input type="text" id="hakusana"></th>
			<th><input type="button" value="hae" id="hakunappi" onclick="haeAsiakkaat()"></th>
		</tr>
		<tr>
			<th>Etunimi</th>
			<th>Sukunimi</th>
			<th>Puhelin</th>
			<th>Sposti</th>
			<th></th>
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