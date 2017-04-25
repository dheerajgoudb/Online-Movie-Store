<?php
session_start();

$image = $_FILES['image']['name'];
$moviename = $_POST['movieName'];
$category = $_POST['category'];
$year = $_POST['year'];
$cost = $_POST['cost'];
$description = $_POST['movie_description'];
$movieflag = 1;
$target_dir = "C:/MAMP/htdocs/Online-Movie-Store-master/images/";
$target_file = $target_dir . basename($_FILES["image"]["name"]);


if (!empty($moviename) && !empty($category) && !empty($image) && !empty($year) && !empty($cost) && !empty($description))
{
  $check = getimagesize($_FILES["image"]["tmp_name"]);
  if ($check !== FALSE)
  {
    if (move_uploaded_file($_FILES["image"]["tmp_name"], $target_file))
    {
      // $conn = mysqli_connect("localhost", "root", "root", "movie_store");
      // if (!$conn)
      // {
      //   die("Connection Failed: " . mysqli_connect_error());
      // }
      // else {
      //   $sql = "INSERT INTO `movies` (`Name`, `Category`, `Img_url`, `Year`, `Cost`, `Description`, `movie_flag`) VALUES
      //             ('$moviename', '$Category', '$image', '$year', '$cost', '$description', '$movieflag')";
      //   $result = mysqli_query($conn, $sql);
      //   if ($result)
      //   {
      //     echo "true";
      //   }
      // }
      echo "true";
    }
  }
  else {
    echo "false";
  }
}
else {
  echo "false";
}
?>
