<?php

namespace R;

class Tools {

  public static function normalizePath ($path) {
    if (is_string($path)) {
      $path = preg_replace("/[\/\\\]+/", "/", $path);
      $path = preg_replace("/[\/]+$/", "", $path);
      return trim($path);
    }
  }

  public static function fileRead ($filename="", $mode="rb"){
    if (empty($filename) || !file_exists($filename)) return;
    if (filesize($filename) == 0) return "";
    if ($file = fopen($filename, $mode)){
      $content = @fread($file, filesize($filename));
      @fclose($file);
      return $content;
    }
    return;
  }

  public static function fileWrite ($filename="", $string="", $mode="wb", $chmod=0644){
    $chmod = ((int)$chmod<=0 || strlen(trim($chmod))<3) ? 0644 : $chmod;
    if(strlen(trim($filename)) == 0) return false;
    if($file = fopen($filename, $mode))
      if(fwrite($file, $string))
        if(fclose($file)) {@chmod($filename, $chmod); return true;}
      return false;
  }

  public static function copy ($src, $dst) {
    if (is_dir($src)) {
      if(!file_exists($dst) && !mkdir($dst)) return false;
      $files = scandir($src);
      foreach ($files as $file) {
        if ($file != "." && $file != "..") {
          if(!self::copy("$src/$file", "$dst/$file")) return false;
        }
      }
      return true;
    }
    else if (file_exists($src)) {
      return copy($src, $dst);
    }
  }

  public static function isEmptyDir ($dir) {
    if (!is_readable($dir)) return null;
    $handle = opendir($dir);
    while (false !== ($entry = readdir($handle))) {
      if ($entry != "." && $entry != "..") {
        return false;
      }
    }
    return true;
  }

}