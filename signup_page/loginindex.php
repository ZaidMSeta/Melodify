<!DOCTYPE html>
<html lang ="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content = "IE=edge">
    <meta name="viewport" content ="width=device-width, inital-scale=1.0">
    <link rel="stylesheet" href="style/loginstyle.css">
    <title>Login</title>
</head>
<body>
        <div class="container">
            <div class="box form-box">
                <header>Login</header>
                <form action="" method="post">
                    <div class="field input">
                        <label for="username">Username</label>
                        <input type="text" name="username" id="username" required>
                    </div>

                    <div class="field input">
                        <label for="password">Password</label>
                        <input type="text" name="password" id="password" required>
                    </div>

                    <div class="field">
                        
                        <input type="submit" class = "button" name="submit" value="Login" required>
                    </div>
                    <div class="links">
                        Don't have an account? <a href="register.php">Sign Up</a>
                    </div>
                </form>
            </div>
        </div>
</body>
</html>