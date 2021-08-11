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
    <?php
        for($i = 0; $i < 100; $i++) {
            echo '<div style = background:'. bm_random_rgb() .' ></div>';
        }
        
        function bm_random_rgb() {
             return 'rgb(' . rand(0, 255) . ',' . rand(0, 255) . ',' . rand(0, 255) . ')';
        }
    ?>
</body>
</html>