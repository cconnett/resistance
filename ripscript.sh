sed -e '/goog\/base.js/ d' -e '/js\/resistance.js/ {
i <script>
r js.js
a </script>
d
}'
