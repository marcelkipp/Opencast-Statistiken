<?php
	function extractStringBetween($cFirstChar, $cSecondChar, $sString) {
   	 preg_match_all("/\\".$cFirstChar."(.*?)\\".$cSecondChar."/", $sString, $aMatches);
   	 return $aMatches[1];
	}
 	
	$value = $_GET["value"];

	$file = file_get_contents('acces_log_all');

	$arr = extractStringBetween("[", "]", $file);
	$r = array();
	$b_month = array();
	$a_month = array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12);
	$number = 0;
	$arr_date = [];

	$jan = array("count" => 0, "name" => "January",);
	$feb = array("count" => 0, "name" => "February",);
	$mar = array("count" => 0, "name" => "March",);
	$apr = array("count" => 0, "name" => "April",);
	$mai = array("count" => 0, "name" => "May",);
	$jun = array("count" => 0, "name" => "June",);
	$jul = array("count" => 0, "name" => "July",);
	$aug = array("count" => 0, "name" => "August",);
	$seb = array("count" => 0, "name" => "September",);
	$okt = array("count" => 0, "name" => "Oktober",);
	$nov = array("count" => 0, "name" => "November",);
	$dez = array("count" => 0, "name" => "December",);

	foreach ($arr as $key) {
		try {
			$date = new DateTime($key);
			$date_new = $date -> format('Y-m-d');
			array_push($r, $date_new);
		} catch (Exception $e) {
  			// echo 'Exeption abfangen :', $e->getMessage(), "\n";
		}
	}

	array_multisort($r);
	foreach ($r as $key) {
		$date_for = new DateTime($key);
		$date_is = $date_for -> format('Y-m-d');
		$date_split = date_parse($date_is);
		$date_day_month = $date_split["day"].".".$date_split["month"];
		array_push($arr_date, $date_day_month);

		if ($date_split["month"] == 1) {
			$jan["count"]++;
		} else {
			if ($date_split["month"] == 2) {
			$feb["count"]++; 
			} else {
				if ($date_split["month"] == 3) {
				$mar["count"]++;
				} else {
					if ($date_split["month"] == 4) {
					$apr["count"]++;
					} else {
						if ($date_split["month"] == 5) {
						$mai["count"]++;
						} else {
							if ($date_split["month"] == 6) {
							$jun["count"]++;
							} else {
								if ($date_split["month"] == 7) {
								$jul["count"]++;
								} else {
									if ($date_split["month"] == 8) {
									$aug["count"]++;
									} else {
										if ($date_split["month"] == 9) {
										$seb["count"]++;
										} else {
											if ($date_split["month"] == 10) {
											$okt["count"]++;
											} else {
												if ($date_split["month"] == 11) {
												$nov["count"]++;
												} else {
													$dez["count"]++;
												}
											}
										}
									}
								}
							} 
						}
					}
				}
			}
		}

	}

	array_push($b_month, $dez["count"]);
	array_push($b_month, $nov["count"]);
	array_push($b_month, $okt["count"]);
	array_push($b_month, $seb["count"]);
	array_push($b_month, $aug["count"]);
	array_push($b_month, $jul["count"]);
	array_push($b_month, $jun["count"]);
	array_push($b_month, $mai["count"]);
	array_push($b_month, $apr["count"]);
	array_push($b_month, $mar["count"]);
	array_push($b_month, $feb["count"]);	
	array_push($b_month, $jan["count"]);
	
	$result = array_unique($arr_date);
	$b = array_values($result);
	$a = array_values(array_count_values($arr_date));
	$c = count($b);

	// print_r($b_month);
	// a und b bei monthansicht verdreht

	$values = array("count" => $a, "dates" => $b, "numberofdates" => $c);
	$values_month = array("count" => $b_month,"dates" => $a_month, "numberofdates" => $c);

	// if ($c >= 44) {
	// 	echo json_encode($values_month);
	// } else {
	// 	// echo json_encode($values);
	// }

	if ($value == "days") {
		echo json_encode($values);
	} else {
		echo json_encode($values_month);
	}
	
?> 