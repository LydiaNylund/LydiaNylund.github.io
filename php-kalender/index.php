<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
        <div class="name-container">
            <?php
                date_default_timezone_set('Europe/Helsinki');

                echo '<div>'. date('F').' ' . date('Y') .'</div>';
            ?>
        </div>

        <div class="calendar-container">
            <?php
                $yearMonthTimestamp = strtotime(date('Y-m'));
 
                $daysInMonth = date('t', strtotime(date('Y-m-d', $yearMonthTimestamp)));
                $startDay = date('N', $yearMonthTimestamp) - 1;
                $totalDays = ceil(($startDay + $daysInMonth) / 7) * 7; // 7 för det är 7 dagar i veckan.

                for($i = 0; $i < $totalDays; $i++) {
                    if($i < $startDay || $i >= $startDay + $daysInMonth) {
                        // Tom dag, denna dag hör inte till denna månad.
                        echo '<div class = "day empty">x</div>';
                    }
                    else {
                        // Detta är en dag i månaden. För att få fram vilken dag kan man använda:
                        // ($i - $startDay + 1) 
                        echo '<div class = "day">'. $i - $startDay + 1 .'</div>';
                    }
                }
            ?>
        </div>
</body>
</html>