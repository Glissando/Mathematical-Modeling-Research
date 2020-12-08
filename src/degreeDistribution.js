const n = 100;
const p = 0.7;


function product_Range(a,b) {
  var prd = a,i = a;
 
  while (i++< b) {
    prd*=i;
  }
  return prd;
}


function combination(n, r) 
{
  if (n==r) 
  {
    return 1;
  } 
  else 
  {
    r=(r < n-r) ? n-r : r;
    return product_Range(r+1, n)/product_Range(1,n-r);
  }
}

console.log(combination(5,3))
var str = ""
for(let k=50;k<90;k++){
  str += (combination(n-1,k)*Math.pow(p,k)*Math.pow((1-p),(n-1-k))).toFixed(6) + ','
}
console.log(str)