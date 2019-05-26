#!/usr/bin/env bash
set -eo pipefail

case $1 in
  start)
    # from www.peterbe.com, toggle this | cat and see what happens
    yarn start | cat
    ;;
  build)
    yarn build
    ;;
  test)
    yarn test $@
    ;;
  *)
    exec "$@"
    ;;
esac
