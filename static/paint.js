




//alert("haiiiii")


var started = false;
var tool="rect",currentcolor="black",currentfill="white";
  
var x, y,startx,starty,cx,cy;
  



      
canvasp=document.getElementById('paint');
//alert(canvasp)
contextp = canvasp.getContext('2d');
     

      var container = canvasp.parentNode;
      //temp canvas
     

      canvas = document.createElement('canvas');
     
      canvas.id = 'painttemp';
      
      canvas.width = canvasp.width;
      canvas.height = canvasp.height;

      container.appendChild(canvas);
      context = canvas.getContext('2d');
     



      //alert("dataaaaaa="+data[0])


    if(data==undefined)
      var data=[];
      var db;
     
      init();
      drawcanvas();

     
  




      function init(){
      
         eraser.addEventListener('click',function (){ alert("under construction")}, false);//load button
          line.addEventListener('click',function (){ tool="line" ;}, false);//load button
           rectangle.addEventListener('click',function (){  tool="rect" ;}, false);//load button
            circle.addEventListener('click',function (){ tool="circle" ; }, false);//load button
             pencil.addEventListener('click',function (){  tool="pencil" ;}, false);//load button
             fill.addEventListener('click',function (){ alert("under construction")}, false);//load button


save.addEventListener('click',saveimage, false);//load button



      canvas.addEventListener('mousemove',Mousemove,false)
      canvas.addEventListener('mousedown', Mousedown, false);
      canvas.addEventListener('mouseup', Mouseup, false);
     
      
      }


    



  function clearcanvas()
  {
   document.location.href="/"

  }
  
 
 
  
    function update() {//draw image from temp to org
      
      contextp.drawImage(canvas, 0, 0);
      context.clearRect(0, 0, canvas.width, canvas.height);
    }


      function Mousedown (e) {
        MousePos(e);//???????????????
        startx=x;
        starty=y;
        started=true;
        clickX=[]
        clickY=[]
      }


 

    function drawcanvas(){
     
       // alert("in draw")
        var obj={},i=0;
       
        while(data.length!=i)
        {
          obj=data[i];
          if(obj.type=="rect"){
             //alert("rect"+data[i])
            context.strokeStyle=obj.color;
            drawrect(obj.x1,obj.y1,obj.x2,obj.y2);
          }
          else if(obj.type=="line"){
            // alert("line"+data[i])
            context.strokeStyle=obj.color;
            drawline(obj.x1,obj.y1,obj.x2,obj.y2);
          }
          else if(obj.type=="pencil"){
            // alert("pencil"+data[i])
            context.strokeStyle=obj.color;
            drawpencil(obj.x,obj.y);
          }
          else if(obj.type=="circle"){
             //("circle"+data[i])
          context.strokeStyle=obj.color;
            drawcircle(obj.x,obj.y,obj.r);
          }
          update();
          i++
      }
        context.strokeStyle=currentcolor;
      }





 
    function Mouseup (e) {
      started =false;
        update();
        var obj={};
        if(tool=="rect"){
          obj.type="rect";
          obj.color=currentcolor;
          obj.x1 = startx;
          obj.y1 = starty;
          obj.x2=x;
          obj.y2=y;
        }
        else if(tool == "pencil"){
          obj.type="pencil";
          obj.x1 = startx;
          obj.y1 = starty;
          obj.x  =clickX
          obj.y  =clickY
          obj.color=currentcolor;
        }
        else if(tool=="line"){
          obj.type="line";
          obj.x1=startx;
          obj.y1=starty;
          obj.x2=x;
          obj.y2=y;
          obj.color=currentcolor;
        }
        else if(tool=="circle"){
          obj.type="circle";
          obj.x=startx;
          obj.y=starty;
          obj.r=Math.abs(startx-x);
          obj.color=currentcolor;
        }
        data.push(obj);
  
    }


  
    function MousePos(e){
       /* if (e.pageX != undefined && e.pageY != undefined) {
        x = e.pageX;
        y = e.pageY;
      }
      x -= canvas.offsetLeft;
      y -= canvas.offsetTop;*/
      x = e.layerX;
    y = e.layerY;
        }

  function Mousemove (e) {
        MousePos(e);
        if(tool=="rect"){
          if(started){
            drawrect(startx,starty,x,y);
          }
        }

        else if(tool == "pencil"){
          //alert("in pencil")
          
          if(started){
            
            //alert("x:"+x)
            clickX.push(x)
            //alert(clickX)
            clickY.push(y)
            drawpencil(clickX,clickY)
          }
        }
 
        else if(tool=="line"){
          if(started){
            drawline(startx,starty,x,y);
          }
        }
 
        else if(tool=="circle"){
          //
          if(started){

            drawcircle(startx,starty,Math.abs(startx-x));
        }
      }
 
    }

   function drawrect(x1,y1,x2,y2){
        //alert("in draw rect")
        //alert("x1="+x1+"y1="+y1+"x2="+x2+"y2="+y2)
        var width,height,x,y;
        context.clearRect(0, 0, canvas.width, canvas.height);
        width = Math.abs(x1-x2);
        height= Math.abs(y1-y2);
        x = Math.min(x1,x2);
        y = Math.min(y1,y2);
        context.strokeRect(x,y,width,height);
      }

      function drawpencil(x,y){

        //alert("in draw line")
       // alert("x="+x+"y="+y)
        //alert("after")

        context.clearRect(0, 0, canvas.width, canvas.height);
        for(i=0; i < x.length; i++){  
        
          context.beginPath();
            context.moveTo(x[i],y[i]);
              context.lineTo(x[i+1],y[i+1]);
            context.closePath();
          context.stroke()
        
      }

      }

      function drawline(x1,y1,x2,y2){
       // alert("in draw line")
        //alert("x1="+x1+"y1="+y1+"x2="+x2+"y2="+y2)
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.beginPath();
      context.moveTo(x1,y1);
      context.lineTo(x2,y2);
      context.stroke();
      context.closePath();
    }

        function drawcircle(x,y,radius){
          // alert("in draw rect")
        //alert("x="+x+"y="+y+"r="+radius)
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.beginPath();
      context.arc(x,y,radius, 0, 2*Math.PI, false);
      context.stroke()
        context.closePath();
      }

      function saveimage(){
        alert("in save")
      if(imagename.value=="")
        alert("Image name cannot be empty") ;
      else{
        db=JSON.stringify(data);
        alert(db)
        $.post("/"+imagename.value,{pname:imagename.value,pdata:db},function(data,status){alert("saved");});
      }
    }

    function loadimage(){
      if(imagename.value=="")
        alert("Image name cannot be empty");
      else{
        document.location.href="/"+imagename.value;
      }
    }


