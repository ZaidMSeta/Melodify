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
                <?php 
    
                    include("php/config.php");
                    if(isset($_POST['submit'])){
                        $email = mysqli_real_escape_string($con,$_POST['email']);
                        $password = mysqli_real_escape_string($con,$_POST['password']);

                        $result = mysqli_query($con,"SELECT * FROM users WHERE Email= '$email' AND Password = '$password' ") or die("Select Error");
                        $row = mysqli_fetch_assoc($result);

                        if(is_array($row) && !empty($row)){
                            $_SESSION['valid'] = $row['Email'];
                            $_SESSION['username'] = $row['Username'];
                            $_SESSION['age'] = $row['Age'];
                            $_SESSION['id'] = $row['Id'];
                        }else{
                            echo "<div class='message'>
                              <p>Wrong Username or Password!</p>
                               </div> <br>";
                            echo "<a href='loginindex.php'><button class = 'button'>Go Back</button>";
                        }
                        if(isset($_SESSION['valid'])){
                            header("Location: ../main/index.html");
                        }
                    }else{

                ?>
                <header>Login</header>
                <form action="" method="post">
                    <div class="field input">
                        <label for="email">Email</label>
                        <input type="text" name="email" id="email" required>
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
                    <form>
                        <button type="reset" onclick="location.href='register.php'"> 
                        Login with Face ID
                     </button>
                    </form>


                </form>
            </div>
            <?php } ?>
        </div>
</body>
</html>
