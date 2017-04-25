<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
		<title>SignUp Form</title>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<link rel="stylesheet" href="../bootstrap/css/bootstrap.min.css" type="text/css" />
		<link rel="stylesheet" href="../css/signup-form.css" type="text/css" />
		<link href="../css/style.css" rel="stylesheet" type="text/css" media="all" />
		<link href="../css/slider.css" rel="stylesheet" type="text/css" media="all" />
		<link href="../css/front.css" rel="stylesheet" type="text/css" media="all" />
		<script src="../bootstrap/js/bootstrap.min.js"></script>
        <script type="text/javascript" src = "../js/login.js" ></script>
		<script src="../js/jquery-1.11.2.min.js"></script>
		<script src="../js/jquery.validate.min.js"></script>
		<script src="../js/register.js"></script>
		<script type="text/javascript">
			function checkname()
			{
				var username = document.getElementById( "UserName" ).value;
				if (username)
				{
					$.ajax({
						type: 'post',
						url: 'checkuser.php',
						data: {
							user_name: username
						},
						success: function (response)
						{
							$('#name_status').html(response);
							if (response == "OK")
							{
								return true;
							}
							else
							{
								return false;
							}
						}
					});
				}
				else
				{
					$('#name_status').html("");
					return false;
				}
			}
		</script>
	</head>
	<body>
	<div class="header">
		<div class="headertop_desc">
			<div class="wrap">
				<div class="nav_list">
					<ul>
						<li><a href="../index.php">Home</a></li>
<!--						<li><a href="../contact.html">Sitemap</a></li>-->
						<li><a href="../contact.html">Contact</a></li>
					</ul>
				</div>
				<div class="account_desc">
					<ul>
						<li><a href="#">Register</a></li>
						<li><a href="login.php">Login</a></li>
					</ul>
				</div>
				<div class="clear"></div>
			</div>
		</div>
	</div>
	<br/><br/>
		<div class="container">
		<div class="logo">
			<a href="../index.php"><img src="../logo.png" alt="" /></a>
		</div>
			<div class="signup-form-container">
				<form method="post" role="form" id="register-form" autocomplete="off" action="user_signup.php">
					<div class="form-header">
						<h3 class="form-title"><i class="fa fa-user"></i> Sign Up</h3>
						<div class="pull-right">
							<h3 class="form-title"><span class="glyphicon glyphicon-pencil"></span></h3>
						</div>
					</div>
					<div class="form-body">
						<div class="form-group">
							<div class="input-group">
							<div class="input-group-addon"><span class="glyphicon glyphicon-user"></span></div>
							   <input name="fullname" type="text" class="form-control" placeholder="Fullname" id="FullName">
							</div>
							<span class="help-block" id="error"></span>
						</div>
						<div class="form-group">
							<div class="input-group">
							<div class="input-group-addon"><span class="glyphicon glyphicon-user"></span></div>
							   <input name="name" type="text" class="form-control" placeholder="Username" id="UserName" onkeyup="checkname();">
							</div>
							<span class="help-block" id="error"></span>
							<span id="name_status"></span>
						</div>
						<div class="form-group">
							<div class="input-group">
								<div class="input-group-addon"><span class="glyphicon glyphicon-envelope"></span></div>
								<input name="email" type="text" class="form-control" placeholder="Email">
							</div>
							<span class="help-block" id="error"></span>
						</div>
						<div class="row">
							<div class="form-group col-lg-6">
								<div class="input-group">
									<div class="input-group-addon"><span class="glyphicon glyphicon-lock"></span></div>
									<input name="password" id="password" type="password" class="form-control" placeholder="Password">
								</div>
								<span class="help-block" id="error"></span>
							</div>
							<div class="form-group col-lg-6">
								<div class="input-group">
									<div class="input-group-addon"><span class="glyphicon glyphicon-lock"></span></div>
									<input name="cpassword" type="password" class="form-control" placeholder="Retype Password">
								</div>
								<span class="help-block" id="error"></span>
							</div>
						</div>
					</div>
					<div class="form-footer">
						<button type="submit" class="btn btn-info">
						<span class="glyphicon glyphicon-log-in"></span> Sign Me Up !
						</button>
					</div>
				</form>
			</div>
			<div class="loginbtn">
				<span>Already have an Account?</span>
				<a href="login.php">Login</a>
			</div>
		</div>
	</body>
</html>
