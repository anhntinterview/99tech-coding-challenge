var sum_to_n_a = function (n) {
  var s = 0;
  for (var i = 1; i <= n; i++) {
    s += i;
  }
  return s;
};

console.log(`sum_to_n_a:`, sum_to_n_a(9999999));

var sum_to_n_b = function (n) {
  return Array.from(
    {
      length: n,
    },
    (_, index) => index + 1
  ).reduce((acc, cur) => acc + cur, 0);
};

console.log(`sum_to_n_b:`, sum_to_n_b(9999999));

var sum_to_n_c = function (n) {
  return (n * (n + 1)) / 2;
  x;
};

console.log(`sum_to_n_c:`, sum_to_n_c(9999999));
