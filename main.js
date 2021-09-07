let addText = text => {
	let content = document.querySelector('.wrapper');
	let newDiv = document.createElement("div");
	newDiv.innerHTML = `<h2>${text}</h2>`;
	content.appendChild(newDiv);
  }
  let addText2 = text => {
	let content = document.querySelector('');
	let newDiv = document.createElement("div");
	newDiv.innerHTML = `<h2>${text}</h2>`;
	newDiv.classList.add('grid');
	content.appendChild(newDiv);
  }
  addText(`Заданное уравнение: `);
  addText(`x(t) - &#x222b 1+1/2(t-s)<sup>2</sup>x(s)ds = 21-65t<sup>2</sup>.     a = 0, b = 1`);
  addText(`Данные: `);

let a = 0;
let b = 1;

let eps = Math.pow(10,-3);
let gt = (t) =>{
    return 21 - 65 * Math.pow(t,2);
}
let rounded = function(number){
  return Math.round(number*1000)/1000;
}
function kx(t,s){
    return 1 + (1/2) * Math.pow(t-s,2);
  }
function right_rectangles(y,n,bj,Aj,Kij){
    for(i=0; i<n; i++){
      for(j=0; j < n; j++){
          if(i==j){
              y[i][j] = Aj * Kij[i][j] + 1
          }else{
              y[i][j] =  Aj*  Kij[i][j]
          }
      }
      y[i].push(bj[i]);  
  }
}
function holerskyi(n,arr){
    let m=new Array(n);
    let l=new Array(n);
    let i, j, k;
    for(i=0; i<n; i++) {
      m[i] = new Array(n);
      l[i] = new Array(n);
      m[i][j] = n;
    }
    m = arr;
    Iter(n);
    return Result();
    function Iter(item) { 
      for(item=0;item<(n-1);item++) { 
        if (m[item][item] == 0) 
          Swap(item);
        for(j=n; j>=item; j--) {
          m[item][j] /= m[item][item];
        }
        for(i=item+1; i<n; i++) {
          for(j=n;j>=item;j--) {
            m[i][j] -= m[item][j] * m[i][item];
          }
        }
      }
    };
    function Swap(item) {
      for(i=item+1;i<n;i++) {
        if(m[i][item] !== 0) {
          for(j=0;j<=n;j++) {
            k = m[i-1][j];
            m[i-1][j] = m[i][j];
            m[i][j] = k;
          }
        } 
      }
    };
    function Result() {
      l[n-1] = m[n-1][n]/m[n-1][n-1];
      for(i=n-2;i>=0;i--) {
        k=0;
        for(j=n-1;j>i;j--) {
          k = (m[i][j]*l[j]) + k;
        }
        l[i] = m[i][n] - k;
      }
	  return l;
    };
  };


let graphik = (t,graph,n)=>{
    
    let ctx = document.getElementById("myChart"+n).getContext("2d")
    let stackedLine  = new Chart(ctx, {
        type: 'line',

        data: {
            labels: t,
            datasets:[graph]
        },  
    })
}

let createCanvas = (n)=>{
    let canvas = document.createElement("canvas");
    canvas.setAttribute("id","myChart"+n);
    document.getElementById("wrapper3").appendChild(canvas);
}

function push_text_to_html(text){
    document.getElementById("wrapper2").innerHTML = text;
}
let X = [];
function XjCoef(X,a,h){
  for(let i = 0; i < n;i++){
    X[i] = a + i * h;
  }
}
let Xn = (x,n)=>{
    let res = 0;
    for(let i=0;i<n-1; i++){
        res += Math.pow(x[i],2);
    }
    res = Math.sqrt(res*(b-a)/(n-1));
    
    return res;
}
function inp(Xn,iterations){
    let discrepancy = new Array();

    let $table = "<table>";
    $table+="<tr>";
	$table+="<td>"+"Iterations"+"</td>"+"<td>"+"Discrepancy"+"</td>"+"<td>"+"Xn"+"</td>";
    $table+="</tr>";
    for(let i=0;i<xn.length;i++){
        if(i<xn.length-1){
            discrepancy[i] =Math.abs(xn[i+1]-xn[i]) ;
        }else{
            discrepancy[i]=0;
        }
        $table+="<tr>";
        $table+="<td>"+iterations[i]+"</td>"+"<td>"+rounded(discrepancy[i])+"</td>"+"<td>"+rounded(Xn[i])+"</td>";
        $table+="</tr>";
    }

    $table += "</table>";

    document.getElementById("wrapper2").innerHTML = $table;
}
    let n
    let past
    let graphList

    let xn= new Array()
    let neviaz_xn = new Array()
    let iter_nugno = new Array()
    n=2

     while(true){        
        let t = new Array(n)
        let Aj = (b- a) / n
        let Kij = new Array(n)
        let bj = new Array(n)
        let y_coefs = new Array(n)
        createCanvas(n)
		let y = new Array(n); // Main arr
		let f = new Array(n); // Free terms
		for(i=0; i<n; i++){
            y[i] = new Array(n)
           Kij[i]= new Array(n)     
            t[i]= a + i*(Aj)
           
        }
        
        for(i=0; i<n; i++){
            for(j=0; j < n; j++){
                Kij[i][j] =  kx(t[i],t[j])
            }
        }    
        for(i=0; i<n; i++){
            bj[i] = gt(t[i]) 
        }
        right_rectangles(y,n,bj,Aj,Kij);
        y_coefs = holerskyi(n,y)
            y_coefs.push(y_coefs[0])
            graphList = 
            {  
                label: 'n= '+ n,
                data: y_coefs,
                fill: false,
                borderColor: 'rgb('+Math.random()*100+', '+Math.random()*125+','+Math.random()*150+')',
                tension: 0.1
            };
            graphik(t,graphList,n); // DrawGraphik
            if(n==2){
                xn=[(Xn(y_coefs,n))];
                iter_nugno =[(n/2)];
            }
            else{
                xn.push(Xn(y_coefs,n));
                iter_nugno.push([n/2]);
            }
            if(n>2&&Math.abs(past - Xn(y_coefs,n))<eps){
                break;
            }
            past = Xn(y_coefs,n);
            n+=2;
        }
        inp(xn,iter_nugno);