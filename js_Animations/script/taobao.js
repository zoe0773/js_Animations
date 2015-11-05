 window.onload=function(){
  var div1=document.getElementById('move');
  var alist=div1.getElementsByTagName('a');
  for(var i=0;i<alist.length;i++){
    
    alist[i].onmouseover=function(){
      
    var _this=this.getElementsByTagName('i')[0];
  
    startMove(_this,{top:-25,opacity:0},function(){
     _this.style.top=40+'px';
      startMove(_this,{top:18,opacity:100});});
   }
  }
 }
function startMove(obj,json,fn)
      {   
        clearInterval(obj.timer);
           obj.timer=setInterval(function()
          {   var flag=true; 
              for(var attr in json){
              var icur=0;
              // 获取内联样式当前值
              if (attr == 'opacity') {icur=Math.round(parseFloat(getStyle(obj,attr))*100);}
              else{icur=parseInt(getStyle(obj,attr));}
                // 速度     
             var speed = (json[attr] - icur) / 8;
             speed=speed>0?Math.ceil(speed):Math.floor(speed);
                // 检测停止
             if (icur!=json[attr]) 
              {
               flag=false;

          
                                  
              //过程
                    if(attr=='opacity'){obj.style.filter='alpha(opacity:'+(icur+speed)+')';
                                     obj.style.opacity=(icur+speed)/100;}

                    else{obj.style[attr]=icur+speed+'px';}
                                }
              else{flag=true;}
                              }
             if(flag)
                {clearInterval(obj.timer);
                 if(fn){fn();} 
                }                          
          },10)
      }
<!-- 获取样式固定函数 -->
function getStyle(obj,attr)
{
  if(obj.currentStyle){return obj.currentStyle[attr];}
  else{return getComputedStyle(obj,false)[attr];}
}