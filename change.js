window.onload = function() {
	var value = localStorage.getItem('value');
	var days = document.getElementById("days");
	var month = document.getElementById("month");

	if (value == null) {
		localStorage.setItem('value', 'days');
		month.style.display = "block";
	} else {
		if (value == "month") {
			days.style.display = "block";
		} else {
			if (value == "days") {
				month.style.display = "block";
			}
		}
	}
}

function setDays(){
	localStorage.setItem('value', 'days');
	location.reload();
}

function setMonth(){
	localStorage.setItem('value', 'month');
	location.reload();
}
