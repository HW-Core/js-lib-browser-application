#!/usr/bin/env bash

PATH_MODULES="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )/../../"
[ ! -d $PATH_MODULES/drassil/joiner ] && git clone https://github.com/drassil/joiner $PATH_MODULES/drassil/joiner -b master
source "$PATH_MODULES/drassil/joiner/joiner.sh"

NAME="js-lib-browser-application"
VENDOR="hw-core"

#
# ADD DEPENDENCIES
#

Joiner:add_repo "https://github.com/HW-Core/js-lib-class.git"      "js-lib-class"          "master" "$VENDOR"
Joiner:add_repo "https://github.com/HW-Core/js-lib-browser-common" "js-lib-browser-common" "master" "$VENDOR"
Joiner:add_repo "https://github.com/HW-Core/js-lib-application"    "js-lib-application"    "master" "$VENDOR"
Joiner:add_repo "https://github.com/HW-Core/js-lib-browser-router" "js-lib-browser-router" "master" "$VENDOR"
Joiner:add_repo "https://github.com/HW-Core/js-lib-browser-gui"    "js-lib-browser-gui"    "master" "$VENDOR"

if Joiner:with_dev ; then
    Joiner:add_repo "https://github.com/HW-Core/$NAME.git" "$NAME/tests" "tests" "$VENDOR"
    Joiner:add_repo "https://github.com/HW-Core/$NAME.git" "$NAME/doc" "gh-pages" "$VENDOR"
fi
