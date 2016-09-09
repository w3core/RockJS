<?php
include "jshrink.class.php";

class minify {

/*
  public static function js ($string="") {
    if (empty($string) || !is_string($string)) return "";
    $filename = tempnam(sys_get_temp_dir(), "js_");
    @chmod($filename, 0777);
    $file = fopen($filename, "w");
    fwrite($file, $string);
    fclose($file);
    $cmd = "java -jar yuicompressor.jar --type js $filename";
    $cwd = getcwd();
    chdir(dirname(__FILE__));
    exec($cmd, $output, $status);
    chdir($cwd);
    unlink($filename);
    $result = ($status == 0) ? implode($output) : $string;
    return $result;
  }
*/

  public static function js ($string="") {
    try {
      $result = \JShrink\Minifier::minify($string);
    }
    catch (RuntimeException $e) {
      $result = $string;
    }
    return $result;
  }

  public static function mask ($type, $id) {
    return "$@$type::$id@$";
  }

  public static function html ($string="", $and=array("js", "css")) {
    $assets = array();
    if (!is_array($and)) $and = array();
    $string = preg_replace_callback("/(<(script|style)\b[^>]*>)([\s\S]*)(<\/\\2>)/i",
      function ($m) use (&$assets) {
        $type = strtolower($m[2]);
        $type = $type == "script" ? "js" : ($type == "style" ? "css" : "unknown");
        $id = count($assets);
        $assets[$id] = $m;
        $class = __CLASS__;
        return $class::mask($type, $id);
      },
      $string
    );
    $string = preg_replace(
      array(
        "/<!--(?!\s*(?:\[if [^\]]+]|<!|>))(?:(?!-->)(.|\n))*-->/",
        "/\s+/",
        "/>\s+</",
        "/\s*(\\$\\@[a-z]+\:\:\d+\\@\\$)\s*/i"
      ),
      array(
        "",
        " ",
        "><",
        '$1'
      ),
      $string
    );

    foreach($assets as $id=>$asset) {
      list($tag, $open, $type, $value, $close) = $asset;
      $type = strtolower($type);
      $method = $type == "script" ? "js" : ($type == "style" ? "css" : "unknown");
      $v = $open.trim($value).$close;
      if (in_array($method, $and) && method_exists(__CLASS__, $method)) $v = $open.self::$method($value).$close;
      $string = str_replace(self::mask($method, $id), $v, $string);
    }
    return trim($string);
  }

  public static function css ($string="") {
    $string = preg_replace(
      array(
        "/\/\*[\s\S]*?\*\//",
        "/\s+/",
        "/\s*\;\s*/",
        "/\s*\{\s*/",
        "/\;\}\s*/",
        "/ ([+~>]) /",
        "/([a-z]+)\s*\:\s*/i",
        "/([\: ,\(\)\\/])(\-*0+)(%|px|pt|pc|rem|em|ex|cm|mm|in)([, ;\(\)}\/]*?)/",
        "/([: ,=\-\(\{\}])0+\.(\d)/",
        "/([^\}]*\{\s*?\})/",
        "/(\*)([.:\[])/",
        "/(\[)([^\"' \]]+)([\"'])([^\"' \]]+)(\\3)(\])/",
        "/ (\!important)/",
        "/\:(\:before|\:after)/",
        "/([,: \(]#)([0-9a-f])\\2([0-9a-f])\\3([0-9a-f])\\4/i",
        "/ ?([\(\)\{\}\:\;\,]) /",
        "/(margin|padding|border-width|border-color|border-style)\:([0-9a-z\.\-\%]+)(\s+\\2)*([!;}])/i",
        "/(margin|padding|border-width|border-color|border-style)\:([0-9a-z\.\-\%]+)(\s+[0-9a-z\.\-\%]+)(\s+\\2)(\\3)*([!;}])/i"
      ),
      array(
        ' ',
        ' ',
        ';',
        '{',
        '}',
        '$1',
        '$1:',
        '${1}0$4',
        '$1.$2',
        '',
        '$2',
        '$1$2$4$6',
        '$1',
        '$1',
        '$1$2$3$4',
        '$1',
        '$1:$2$4',
        '$1:$2$3$6'
      ),
      $string
    );
    return trim($string);
  }

}