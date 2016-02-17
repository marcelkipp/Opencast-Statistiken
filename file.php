<?php
	//Filtert relevanten Daten aus logdatei raus
	function extractStringBetween($cFirstChar, $cSecondChar, $sString) {
   	 preg_match_all("/\\".$cFirstChar."(.*?)\\".$cSecondChar."/", $sString, $aMatches);
   	 return $aMatches[1];
	}

	//übermittelter Wert für Ausgabe days oder month
	// $value = $_GET["value"];

	//import log-file
	$file = file_get_contents('log/acces_log_all');

	$arr = extractStringBetween("[", "]", $file);
	$r = array();
	$y_month = array();
	$x_month = array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11);
	$number = 0;
	$arr_date = [];
	$average_output = [];
	$average_per_month = [];
	$totalview = 0;
	$month = array(
						array(0, 1, "jan"),
						array(0, 2, "feb"),
						array(0, 3, "mar"),
						array(0, 4, "apr"),
						array(0, 5, "mai"),
						array(0, 6, "jun"),
						array(0, 7, "jul"),
						array(0, 8, "aug"),
						array(0, 9, "sep"),
						array(0, 10, "okt"),
						array(0, 11, "nov"),
						array(0, 12, "dez"),
					);

	//Überprüfung der gefilterten Daten
	//Abfangen von Fehlern
	foreach ($arr as $key) {
		try {
			$date = new DateTime($key);
			$date_new = $date -> format('Y-m-d');
			array_push($r, $date_new);
		} catch (Exception $e) {
  			// echo 'Exeption abfangen :', $e->getMessage(), "\n";
		}
	}

	//Umwandlung der Daten(Datum)
	array_multisort($r);
	foreach ($r as $key) {
		$date_for = new DateTime($key);
		$date_is = $date_for -> format('Y-m-d');
		$date_split = date_parse($date_is);
		$date_day_month = $date_split["day"].".".$date_split["month"].".".$date_split["year"];
		array_push($arr_date, $date_day_month);
		$totalview++;

		//Zählung für Monate
		switch ($date_split["month"]) {
			case '1':
				$month[0][0]++;
				break;
			case '2':
				$month[1][0]++;
				break;
			case '3':
				$month[2][0]++;
				break;
			case '4':
				$month[3][0]++;
				break;
			case '5':
				$month[4][0]++;
				break;
			case '6':
				$month[5][0]++;
				break;
			case '7':
				$month[6][0]++;
				break;
			case '8':
				$month[7][0]++;
				break;
			case '9':
				$month[8][0]++;
				break;
			case '10':
				$month[9][0]++;
				break;
			case '11':
				$month[10][0]++;
				break;
			case '12':
				$month[11][0]++;
				break;
		}
	}

	//fügt Werte dem Ausgabe-array zu
	foreach ($month as $key) {
		array_push($y_month, $key[0]);
	}

	//Durchschnitt des jeweiligen Monats
	foreach ($month as $key ) {
		$average = round($key[0] / cal_days_in_month(CAL_GREGORIAN, $key[1], 2015));
		array_push($average_per_month, $average);
	}

	$result = array_unique($arr_date); // Entfernt doppelte Werte
	$x_days = array_values($result); // liefert alle Werte des Arrays array mit einem numerischen Index.
	$y_days = array_values(array_count_values($arr_date));
	$total_count = count($x_days);

	$totalaverage = round($totalview / 365);

	//Erstellung der Ausgabearrays
	$values = array("totalaverage" => $totalaverage ,"totalview" => $totalview, "count_month" => $y_month, "count" => $y_days, "dates" => $x_days, "jan" => $average_per_month[0],"feb" => $average_per_month[1],"mar" => $average_per_month[2],	"apr" => $average_per_month[3],"mai" => $average_per_month[4],"jun" => $average_per_month[5],"jul" => $average_per_month[6],"aug" => $average_per_month[7],"sep" => $average_per_month[8],"okt" => $average_per_month[9],"nov" => $average_per_month[10],"dez" => $average_per_month[11],);
	// $values_month = array("totalview" => $totalview, "count" => $y_month,"dates" => $x_month, "jan" => $average_per_month[0],"feb" => $average_per_month[1],"mar" => $average_per_month[2],	"apr" => $average_per_month[3],"mai" => $average_per_month[4],"jun" => $average_per_month[5],"jul" => $average_per_month[6],"aug" => $average_per_month[7],"sep" => $average_per_month[8],"okt" => $average_per_month[9],"nov" => $average_per_month[10],"dez" => $average_per_month[11],);

	//Schleife Ausgabe Durchschnitt Monate - falsche Ausgabe für json
	// $i = 0;
	// foreach ($month as $key) {
	// 	$array = $key[2] => $average_per_month[$i];
	// 	array_push($values, $array);
	// 	$i++;
	// }

	//Überprüfung der übergebenen Variable
	// if ($value == "days") {
	// 	echo json_encode($values);
	// } else {
	// 	echo json_encode($values_month);
	// }
	echo json_encode($values);
?>
