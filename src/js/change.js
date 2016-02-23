window.onload = function() {
	var value = localStorage.getItem('value');
	var days = document.getElementById("days");
	var month = document.getElementById("month");

	// if (value == null) {
	// 	localStorage.setItem('value', 'days');
	// 	month.style.display = "block";
	// } else {
	// 	if (value == "month") {
	// 		days.style.display = "block";
	// 	} else {
	// 		if (value == "days") {
	// 			month.style.display = "block";
	// 		}
	// 	}
	// }
}

function setDays(){
	sessionStorage.removeItem ('value');
	localStorage.setItem('value', 'days');
	console.log("setDays");
	console.log(localStorage.getItem('value'));
	location.reload();
}

function setMonth(){
	sessionStorage.removeItem ('value');
	localStorage.setItem('value', 'month');
	console.log(localStorage.getItem('value'));
	console.log("setMonth");
	location.reload();
}
