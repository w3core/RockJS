<?php
include "jsqueeze.class.php";

class minify {

  public static function js ($string="") {
    // Source: https://github.com/tchwork/jsqueeze
    $minifier = new \Patchwork\JSqueeze();
    $result = $minifier->squeeze($string, true, false);
    $result = preg_replace("/^;/Us", "", $result);
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

  private static function hue2rgb ($p, $q, $t) {
    if ($t < 0) $t += 1;
    if ($t > 1) $t -= 1;
    if ($t < 1/6) return 255 * ($p + ($q - $p) * 6 * $t);
    if ($t < 1/2) return 255 * $q;
    if ($t < 2/3) return 255 * ($p + ($q - $p) * (2/3 - $t) * 6);
    return 255 * $p;
  }

  private static function hsl2hex ($h, $s, $l) {
    $s /= 100;
    $l /= 100;
    if (!$s) $r = $g = $b = $l * 255;
    else {
      $q = $l <= 0.5 ? $l * (1 + $s) : $l + $s - $l * $s;
      $p = 2 * $l - $q;
      $h = $h / 360;
      $r = ceil(self::hue2rgb($p, $q, $h + 1/3));
      $g = ceil(self::hue2rgb($p, $q, $h));
      $b = ceil(self::hue2rgb($p, $q, $h - 1/3));
    }
    return self::rgb2hex($r, $g, $b);
  }

  private static function rgb2hex ($r, $g, $b) {
    return sprintf("#%02x%02x%02x", $r, $g, $b);
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
        "/([: ,=\-\(\{\}])(\d+)\.0+([^\d]+)/", //new
        "/([^\}]*\{\s*?\})/",
        "/(\*)([.:\[])/",
        "/(\[)([^\"' \]]+)([\"'])([^\"' \]]+)(\\3)(\])/",
        "/ (\!important)/",
        "/\:(\:before|\:after)/",
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
        '$1$2$3', //new
        '',
        '$2',
        '$1$2$4$6',
        '$1',
        '$1',
        '$1',
        '$1:$2$4',
        '$1:$2$3$6'
      ),
      $string
    );
    $string = preg_replace_callback('/\:\s*calc\(([^;}]+)/', function ($m) {
      return preg_replace(array('/\s+/', '/([-+*\/]+)/'), array('', ' $1 '), $m[0]);
    }, $string);
    $string = preg_replace_callback('/(.)(rgba?|hsla?)\s*\(\s*(\d+)[, %]+(\d+)[, %]+(\d+)[, %]*([01]?)\s*\)(.)/', function ($m) {
      if ($m[6] === '0') return $m[1].'transparent'.$m[7];
      $type = str_replace('a', '', strtolower($m[2]));
      return $m[1].($type == 'hsl' ? self::hsl2hex($m[3]*1, $m[4]*1, $m[5]*1) : self::rgb2hex($m[3]*1, $m[4]*1, $m[5]*1)).$m[7];
    }, $string);
    $string = preg_replace("/([,: \(]#)([0-9a-f])\\2([0-9a-f])\\3([0-9a-f])\\4/i", '$1$2$3$4', $string);
    return trim($string);
  }

}