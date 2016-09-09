<?php

namespace R;

require_once "tools.class.php";

class Tag {

  function __construct () {
    var_dump(class_exists("R\Tools"));
  }

}

new Tag;