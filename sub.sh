sed "/$1/ {
r $2
d
q
}"
