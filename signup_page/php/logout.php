<?php
        session_start();
        session_destroy();
        header("Location: ../loginindex.php");
?>
