<?php include "minify.class.php";

class R {

  const COMPILE_FILES = "txt, md, html, htm, xml, css, less, sass, scss, styl, js, json, ts, coffee";

  private static $_ENGINE_DIRECTORY;
  private static $_SOURCE_DIRECTORY;
  private static $_DESTINATION_DIRECTORY;
  private static $_MINIFY = array("html", "css", "js");

  public static function cli () {
    header("Content-Type: text/plain");
    echo "\nRockJS v3.0\n============";

    self::$_ENGINE_DIRECTORY = realpath(dirname(__FILE__).DIRECTORY_SEPARATOR."..");

    global $argv;
    $args = $argv;

    if (!is_array($args)) exit(self::help());
    if (!empty($args[0]) && realpath($args[0]) == __FILE__) array_shift($args);
    $class = __CLASS__;
    if (!empty($args) && method_exists($class, "CLI_".self::cmd($args[0]))) {
      $method = "CLI_".self::cmd($args[0]);
      array_shift($args);
      exit($class::$method($args));
    }
    exit(self::help());
  }

  private static function copySource ($source, $destination="") {
    $dst = (empty($destination)) ? getcwd() : $destination;

    $error = false;
    if (file_exists($dst) && !self::isEmptyDir($dst)) $error = "The directory is not empty (".realpath($dst).")";
    else if (!realpath(dirname($dst)) || !is_writable(realpath(dirname($dst)))) $error = "Permission denied for write";
    else if (strpos(realpath(dirname($dst)), self::$_ENGINE_DIRECTORY) !== false) $error = "The component cannot to be created here (".realpath(dirname($dst)).")";

    if (!$error) {
      $src = $source;
      if (!self::copy($src, $dst)) $error = "Component creation error";
    }

    if ($error) exit("\n\n$error\n" . self::help());
  }

  /**
   * app <path>
   */
  public static function CLI_app ($argv) {
    self::copySource(self::$_ENGINE_DIRECTORY.DIRECTORY_SEPARATOR.".example", !empty($argv[0]) ? $argv[0] : getcwd());
  }

  /**
   * layout <path>
   */
  public static function CLI_layout ($argv) {
    $src = implode(DIRECTORY_SEPARATOR, array(self::$_ENGINE_DIRECTORY, ".example", "layouts", "example"));
    $dst = !empty($argv[0]) ? $argv[0] : getcwd();
    self::copySource($src, $dst);
    $dst = realpath($dst);
    $name = basename($dst);
    $files = scandir($dst);
    foreach ($files as $filename) {
      $filename = $dst.DIRECTORY_SEPARATOR.$filename;
      if (is_file($filename)) {
        $string = self::fileRead($filename);
        if (!empty($string)) {
          $string = str_replace("__NAME__", "layout_".$name, $string);
          self::fileWrite($filename, $string);
        }
      }
    }
  }

  /**
   * module <path>
   */
  public static function CLI_module ($argv) {
    $src = implode(DIRECTORY_SEPARATOR, array(self::$_ENGINE_DIRECTORY, ".example", "modules", "example"));
    $dst = !empty($argv[0]) ? $argv[0] : getcwd();
    self::copySource($src, $dst);
    $dst = realpath($dst);
    $name = basename($dst);
    $files = scandir($dst);
    foreach ($files as $filename) {
      $filename = $dst.DIRECTORY_SEPARATOR.$filename;
      if (is_file($filename)) {
        $string = self::fileRead($filename);
        if (!empty($string)) {
          $string = str_replace("__NAME__", "module_".$name, $string);
          self::fileWrite($filename, $string);
        }
      }
    }
  }

  /**
   * deploy --source <path> --destination <path> --minify <types>
   */
  public static function CLI_deploy ($argv) {
    $source = realpath(self::resolveArgument($argv, "s", "source", false, getcwd()));
    $destination = self::resolveArgument($argv, "d", "destination", true);
    $minify = strtolower(self::resolveArgument($argv, "m", "minify", false, "html,js,css"));

    $minify = ($minify == "none") ? array() : preg_split("/[^a-z0-9]+/", $minify);

    $error = false;
    if (!$source) $error = "Invalid path to the source directory";
    else if (strpos(realpath(dirname($destination)), $source) !== false) $error = "The component cannot to be created here (".realpath(dirname($destination)).")";

    if (!$error) {
      self::copySource($source, $destination);

      self::$_SOURCE_DIRECTORY = $source;
      self::$_DESTINATION_DIRECTORY = realpath($destination);
      self::$_MINIFY = $minify;

      self::compileDirectory(self::$_DESTINATION_DIRECTORY);
    }
    if ($error)  exit("\n\n$error\n" . self::help());
  }

  private static function help () {
    return
"
Usage: php ".basename(__FILE__)." [command] <option> <value>

Available commands:
------------------
  -h, --help               Show this dialog
  app <path>               Create new application in the <path> directory otherwise current directory
  layout <path>            Create new layout in the <path> directory otherwise current directory
  module <path>            Create new module in the <path> directory otherwise current directory
  deploy <option> <value>  Deploy an application
    -s, --source <path>       Path to the source codes directory otherwise current directory
    -d, --destination <path>  Path to the destination (deployment) directory
    -m, --minify <list>       Default: \"html,js,css\" Comma-separated list of file types to be minified otherwise \"none\"

";
  }

  public static function compile ($file="", $current=null) {
    $result = "";
    $path = self::getRealFilePath($file, $current);
    $result = self::fileRead($path);
    if (!self::isCompilable($path)) return $result;
    $result = preg_replace_callback(array(
      "/<!--\[([a-z0-9-_:]+)([^\]]*)\]-->/i",
      "/\/\*\[([a-z0-9-_:]+)([^\]]*)\]\*\//i",
      "/\/\/\[([a-z0-9-_:]+)([^\]]*)\][\r\n]+/i"
    ),
    function ($m) use ($path) {
      $class = __CLASS__;
      $re_attr = "/([a-z0-9-_:]+)(\s*=\s*([\"']?)(.+?)[\"']?)?\s+?/mi";
      $tag = strtolower($m[1]);
      $attrbutes = array();
      if (preg_match_all($re_attr, " {$m[2]} ", $attrs)) {
        foreach ($attrs[0] as $v) {
          if (preg_match($re_attr, $v, $attr)) $attributes[$class::cmd($attr[1])] = !empty($attr[4]) ? $attr[4] : null;
        }
      }
      $method = "TAG_" . $class::cmd($tag);
      if (method_exists($class, $method)) return $class::$method($attributes, $path);
    }, $result);
    if (is_array(self::$_MINIFY) && count(self::$_MINIFY)) {
      preg_match("/.+\.([a-z0-9]+)$/i", strtolower($file), $ext);
      $ext = (isset($ext, $ext[1])) ? $ext[1] : null;
      $class = "minify";
      if (!empty($ext) && in_array($ext, self::$_MINIFY) && method_exists($class, $ext)) {
        $result = $class::$ext($result, self::$_MINIFY);
      }
    }
    return $result;
  }

  private static function compileDirectory ($directory) {
    if (is_dir($directory)) {
      $files = scandir($directory);
      foreach ($files as $file) {
        if ($file != "." && $file != "..") {
          $path = $directory.DIRECTORY_SEPARATOR.$file;
          if (is_dir($path)) self::compileDirectory($path);
          else if (is_file($path) && is_writable($path) && self::isCompilable($path)) {
            self::fileWrite($path, self::compile($path));
          }
        }
      }
    }
  }

  private static function isCompilable ($file="") {
    $list = preg_split("/[\s,;|]+/", self::COMPILE_FILES);
    $file = self::normalizePath($file);
    return !!(
      is_string($file)
      && preg_match("/.+\.([a-z0-9]+)$/i", strtolower($file), $m)
      && in_array($m[1], $list)
    );
  }

  private static function getRealFilePath ($file, $cwd=null) {
    $dst = self::normalizePath(self::$_DESTINATION_DIRECTORY);
    $src = self::normalizePath(self::$_SOURCE_DIRECTORY);
    $eng = self::normalizePath(self::$_ENGINE_DIRECTORY);

    if (realpath($file)) {
      $file = self::normalizePath(realpath($file));
      if (strpos($file, $dst) === 0 || strpos($file, $src) === 0 || strpos($file, $eng) === 0) return $file;
      else return;
    }
    if (is_string($cwd)) {
      if (strlen(trim($cwd)) && realpath($cwd)) {
        $cwd = realpath($cwd);
        $cwd = (!is_dir($cwd)) ? dirname($cwd) : $cwd;
        $cwd = self::normalizePath($cwd);
        if (strpos($cwd, $dst) === 0 || strpos($cwd, $src) === 0 || strpos($cwd, $eng) === 0) {
          $cwd = str_replace(array("$dst", "$src", "$eng"), "", $cwd);
          $path = array(
            self::normalizePath(realpath("$dst/$cwd/$file")),
            self::normalizePath(realpath("$src/$cwd/$file")),
            self::normalizePath(realpath("$eng/$cwd/$file"))
          );
          foreach($path as $v) {
            if ($v && (strpos($v, $dst) === 0 || strpos($v, $src) === 0 || strpos($v, $eng) === 0)) return $v;
          }
          $path = array(
            self::normalizePath(realpath("$dst/$file")),
            self::normalizePath(realpath("$src/$file")),
            self::normalizePath(realpath("$eng/$file"))
          );
          foreach($path as $v) {
            if ($v && (strpos($v, $dst) === 0 || strpos($v, $src) === 0 || strpos($v, $eng) === 0)) return $v;
          }
          return;
        }
        else return;
      }
      else return;
    }
    $path = array(
      self::normalizePath(realpath("$dst/$file")),
      self::normalizePath(realpath("$src/$file")),
      self::normalizePath(realpath("$eng/$file"))
    );
    foreach($path as $v) {
     if ($v && (strpos($v, $dst) === 0 || strpos($v, $src) === 0 || strpos($v, $eng) === 0)) return $v;
    }
  }

  private static function normalizePath ($path) {
    if (is_string($path)) {
      $path = preg_replace("/[\/\\\]+/", "/", $path);
      $path = preg_replace("/[\/]+$/", "", $path);
      return trim($path);
    }
  }

  private static function fileRead ($filename="", $mode="rb"){
    if (empty($filename) || !file_exists($filename)) return;
    if (filesize($filename) == 0) return "";
    if ($file = fopen($filename, $mode)){
      $content = @fread($file, filesize($filename));
      @fclose($file);
      return $content;
    }
    return;
  }

  private static function fileWrite ($filename="", $string="", $mode="wb", $chmod=0644){
    $chmod = ((int)$chmod<=0 || strlen(trim($chmod))<3) ? 0644 : $chmod;
    if(strlen(trim($filename)) == 0) return false;
    if($file = fopen($filename, $mode))
      if(fwrite($file, $string))
        if(fclose($file)) {@chmod($filename, $chmod); return true;}
    return false;
  }

  private static function copy ($src, $dst) {
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

  private static function isEmptyDir ($dir) {
    if (!is_readable($dir)) return null;
    $handle = opendir($dir);
    while (false !== ($entry = readdir($handle))) {
     if ($entry != "." && $entry != "..") {
      return false;
     }
    }
    return true;
  }

  private static function resolveArgument ($argv, $short, $long, $required=false, $default=null) {
    $result = null;
    $ok = false;
    foreach ($argv as $v) {
      if (substr($v, 0, 1) == "-") {
        $ok = ("-$short" == $v || "--$long" == $v);
        if ($ok && $result == null) $result = true;
        continue;
      }
      elseif ($ok && !empty($v)) $result = $v;
    }
    if ($required === true && (empty($result) || $result === true)) exit("\n\nThe \"$long\" parameter expected.\n" . self::help());
    if ($default !== null && (empty($result) || $result === true)) $result = $default;
    return $result;
  }

  public static function getContentTypeByExtension ($ext="", $alt="") {
    $default = "application/octet-stream";
    $ext = trim(strtolower($ext));
    $alt = trim(strtolower($alt));
    $list = array(
      "txt"  => "text/plain",
      "htm"  => "text/html",
      "html" => "text/html",
      "php"  => "text/html",
      "css"  => "text/css",
      "less" => "text/css",
      "sass" => "text/css",
      "scss" => "text/css",
      "styl" => "text/css",
      "js"   => "application/javascript",
      "ts"   => "application/x-typescript",
    "coffee" => "application/vnd.coffeescript",
      "json" => "application/json",
      "xml"  => "application/xml",
      "swf"  => "application/x-shockwave-flash",
      "flv"  => "video/x-flv",
      "png"  => "image/png",
      "jpe"  => "image/jpeg",
      "jpeg" => "image/jpeg",
      "jpg"  => "image/jpeg",
      "gif"  => "image/gif",
      "bmp"  => "image/bmp",
      "ico"  => "image/vnd.microsoft.icon",
      "tiff" => "image/tiff",
      "tif"  => "image/tiff",
      "webp" => "image/webp",
      "webm" => "video/webm",
      "avi"  => "video/x-msvideo",
      "mkv"  => "video/x-matroska",
      "mp4"  => "video/mp4",
      "mpg4" => "video/mp4",
      "3gp"  => "video/3gpp",
      "svg"  => "image/svg+xml",
      "svgz" => "image/svg+xml",
      "zip"  => "application/zip",
      "rar"  => "application/x-rar-compressed",
      "exe"  => "application/x-msdownload",
      "msi"  => "application/x-msdownload",
      "cab"  => "application/vnd.ms-cab-compressed",
      "weba" => "audio/webm",
      "aac"  => "audio/x-aac",
      "ogg"  => "audio/ogg",
      "mp3"  => "audio/mpeg",
      "qt"   => "video/quicktime",
      "mov"  => "video/quicktime",
      "pdf"  => "application/pdf",
      "psd"  => "image/vnd.adobe.photoshop",
      "ai"   => "application/postscript",
      "eps"  => "application/postscript",
      "ps"   => "application/postscript",
      "doc"  => "application/msword",
      "rtf"  => "application/rtf",
      "xls"  => "application/vnd.ms-excel",
      "ppt"  => "application/vnd.ms-powerpoint",
      "odt"  => "application/vnd.oasis.opendocument.text",
      "ods"  => "application/vnd.oasis.opendocument.spreadsheet",
      "woff" => "application/font-woff",
      "ttf"  => "application/x-font-ttf",
      "eot"  => "application/vnd.ms-fontobject"
    );
    return isset($list[$ext]) ? $list[$ext] : (isset($list[$alt]) ? $list[$alt] : $default);
  }

  public static function cmd ($string="") {
    return strtolower(preg_replace("/[^a-z0-9]+/i", "_", trim($string)));
  }

  /**
   * Tags
   */

  /**
   * [include src="{(string) filename}" format="{(string) STRING|BASE64}" default="{(string)}"]
   */
  public static function TAG_include ($attr = array(), $path = null) {
    $result = "";
    if (!empty($attr["src"])) {
      $list = preg_split("/[,;|]+/", $attr["src"]);
      if (count($list) > 1) {
        $class = __CLASS__;
        $method = __FUNCTION__;
        foreach ($list as $src) {
          $a = $attr;
          $a["src"] = $src;
          $result .= $class::$method($a, $path);
        }
        return $result;
      }
      $result = self::compile($attr["src"], $path);
    }
    if (!empty($result)) {
      preg_match("/.+\.([a-z0-9]+)$/i", strtolower($attr["src"]), $ext);
      $ext = (isset($ext, $ext[1])) ? $ext[1] : null;
      $format = (!empty($attr["format"])) ? strtolower($attr["format"]) : null;
      if ($format == "base64") $result = "data:" . self::getContentTypeByExtension($ext) . ";base64," . base64_encode($result);
      if ($format == "string") $result = json_encode($result);
    }
    return (empty($result) && !empty($attr["default"])) ? $attr["default"] : $result;
  }

}

R::cli();