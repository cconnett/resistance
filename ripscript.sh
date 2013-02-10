sed -e '/goog\/base.js/ {
a  <script>
a    window.CLOSURE_NO_DEPS=true;
a  </script>
d
}' \
    -e '/js\/resistance.js/ {
i <script>
r js.js
a </script>
d
}'
