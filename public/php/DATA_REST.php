<?php

 echo REST_AMB('2020-02');

function REST_AMB($AnoMes)
{
    $ultimoDia = 0;
    $cx        = mysqli_connect("localhost", "ronanr", "mdt1234@");
    $db        = mysqli_select_db($cx, "ambulatorio");

    $sql = mysqli_query($cx, 'select day(last_day("'.$AnoMes.'-01")) as ultimoDia') or die(mysqli_error($cx));
    while ($exibe = mysqli_fetch_assoc($sql)) {
        $ultimoDia = $exibe['ultimoDia'];
    }
    $AnoMesdia ='000000000';
    $currentDay = 0;
    $nameOfDay ='';

    $string = '{mes:[{"total":';
    for ($i = 1; $i <= $ultimoDia; $i++) {
        $currentDay = $i;
       
        
        if ($i < 10) {
            
            $currentDay = "0" . $i;
        }
        
$AnoMesdia = strval($AnoMes."-".$currentDay);
  
    $nameOfDay = str_replace('-','_',$AnoMesdia);
        //echo "select count(*) as totalMES, time_to_sec(time(avg(decorrido))) as TEMPO_MEDIO from ocorrencias  where entrou like '%$AnoMes%' and decorrido != ''";
      // echo "<br>";
        $sql = mysqli_query($cx, "select count(*) as totalMES,avg(decorrido) as TEMPO_MEDIO from ocorrencias  where entrou like '%$AnoMes%' and decorrido != ''") or die(mysqli_error($cx));
        
        
        while ($exibe = mysqli_fetch_assoc($sql)) {
            
            
            $string = $string.$exibe['totalMES'].',"media":'.$exibe['TEMPO_MEDIO'].'}],';
        }
      // echo "select count(*) as totalDIA, time_to_sec(time(avg(decorrido))) as TEMPO_MEDIO, dayname('$AnoMesdia') as dia from ocorrencias  where entrou like '%$AnoMesdia%' and decorrido != ''";
      // echo "<br>";
        $sql2 = mysqli_query($cx, "select count(*) as totalDIA, avg(decorrido) as TEMPO_MEDIO, dayname('$AnoMesdia') as dia from ocorrencias  where entrou like '%$AnoMesdia%' and decorrido != ''") or die(mysqli_error($cx));
        while ($exibe2 = mysqli_fetch_assoc($sql2)) {
            
            
            $string = $string.'"'.$nameOfDay.'":[{"total":'.$exibe2['totalDIA'].',"media":'.$exibe2['TEMPO_MEDIO'].',"nome":"'.$exibe2['dia'].'"}]}';
        }
       
    }
    
    return $string;
}

?>
