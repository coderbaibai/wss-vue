//定义点对象
export function Point(x,y){
    this.x = x
    this.y = y
}
//定义矩形对象的方法
export const Corner = {
    leftTop:0,
    rightTop:1,
    leftBottom:2,
    rightBottom:3
}
export const Middle = {
    middleTop:0,
    middleLeft:1,
    middleBottom:2,
    middleRight:3
}
export var redrawAll = function(ctx,canvas,rects,rotatePoint,isWordsShow,canvasWidth,canvasHeight){
    ctx.clearRect(0,0,canvasWidth+10,canvasHeight+10)
    var index = -1;
    for(var i=0;i<rects.length;i++){
        rects[i].draw(ctx,isWordsShow)
        if(rects[i].isSelected)
            index = i
    }
    if(index!=-1)
        rects[index].draw(ctx,isWordsShow)
    if(!rotatePoint)
        return
    if(index!=-1){
        rotatePoint.locate(rects[index])
        rotatePoint.draw(ctx)
    }
    else{
        rotatePoint.hideLocate()
    }
}
export function RoratePoint(image,point){
    this.image = image
    this.x = point.x
    this.y = point.y
    this.height = 12
    this.width = 12
    this.distance = 23
    this.anchor = {x:point.x+this.width/2,y:point.y+this.height/2}
    this.draw = function(ctx){
        if(this.anchor.x<=0||this.anchor.y<=0)
            return;
        ctx.save()
        ctx.translate(this.anchor.x,this.anchor.y)
        ctx.drawImage(this.image,-this.width/2,-this.height/2,this.width,this.height)
        ctx.restore()
    }
    this.hideLocate = function(){
        this.anchor.x = -100
        this.anchor.y = -100
    }
    this.locate = function(Rect){
        const leftTop = Rect.getCorner(Corner.leftTop)
        const rightTop = Rect.getCorner(Corner.rightTop)
        // const leftBottom = Rect.getCorner(Corner.leftBottom)
        // const rightBottom = Rect.getCorner(Corner.rightBottom)
        this.anchor.x = (leftTop.x+rightTop.x)/2 + this.distance*Math.sin(Rect.rotate)
        this.anchor.y = (leftTop.y+rightTop.y)/2 - this.distance*Math.cos(Rect.rotate)
    }
}
export function Rect(id,image,point,width,height,rotate,pid,sid,status,isConflictable,isReservable){
    this.id = id
    this.pid = pid
    this.image = image
    this.anchor = {x:point.x+width/2,y:point.y+height/2}
    this.width = width
    this.height = height
    this.rotate = rotate
    this.radius = Math.sqrt((width/2)**2+(height/2)**2)
    this.isSelected = false
    this.isConflict = false
    this.sid = sid
    this.status = status
    this.isConflictable = isConflictable
    this.isReservable = isReservable
    this.getCopy = ()=>{
        return new Rect(this.id,this.image,new Point(this.anchor.x-width/2,this.anchor.y-height/2),this.width,this.height,this.rotate,this.pid,this.sid,this.status,this.isConflictable,this.isReservable)
    }
    this.draw = function(ctx,isWordsShow){
        this.drawImg(ctx,isWordsShow)
        if(this.isSelected)
            this.drawStrokeSelected(ctx,isWordsShow)
        else if(this.isConflict)
            this.drawStrokeConflict(ctx,isWordsShow)
    }
    this.copy = function(){
        return new Rect(null,this.image,{x:this.anchor.x-width/2,y:this.anchor.y-height/2},this.width,this.height,this.rotate)
    }
    this.drawStroke = function(ctx){
        ctx.save()
        ctx.translate(this.anchor.x,this.anchor.y)
        ctx.rotate(this.rotate)
        ctx.strokeRect(-this.width/2,-this.height/2,this.width,this.height)
        ctx.restore()
    }
    this.drawStrokeConflict = function(ctx,isWordsShow){
        ctx.save()
        ctx.translate(this.anchor.x,this.anchor.y)
        ctx.rotate(this.rotate)
        ctx.strokeStyle = "rgb(255,0,0)"
        ctx.strokeRect(-this.width/2,-this.height/2,this.width,this.height)
        ctx.restore()
    }
    this.drawStrokeSelected = function(ctx,isWordsShow){
        ctx.save()
        ctx.translate(this.anchor.x,this.anchor.y)
        ctx.rotate(this.rotate)
        ctx.strokeStyle = "rgb(0,0,255)"
        ctx.setLineDash([10,10])
        if(isWordsShow==true)
            ctx.lineWidth = 3;
        ctx.strokeRect(-this.width/2,-this.height/2,this.width,this.height)
        ctx.restore()
    }
    this.drawStrokeHighlight = function(ctx){
        ctx.save()
        ctx.translate(this.anchor.x,this.anchor.y)
        ctx.rotate(this.rotate)
        ctx.strokeStyle = "rgb(0,0,255)"
        ctx.strokeRect(-this.width/2,-this.height/2,this.width,this.height)
        ctx.restore()
    }
    this.drawClear = function(ctx){
        ctx.save()
        ctx.translate(this.anchor.x,this.anchor.y)
        ctx.rotate(this.rotate)
        ctx.clearRect(-this.width/2,-this.height/2,this.width,this.height)
        ctx.restore()
    }
    this.drawImg = function(ctx,isWordsShow){
        ctx.save()
        ctx.translate(this.anchor.x,this.anchor.y)
        ctx.rotate(this.rotate)
        ctx.drawImage(this.image,-this.width/2,-this.height/2,this.width,this.height)
        if(isWordsShow===true&&this.sid){
            const color = getColorFromStatus(this.status)
            if(color){
                ctx.save()
                ctx.fillStyle = color
                ctx.fillRect(1-this.width/2,1-this.height/2,this.width-1,this.height-1)
                ctx.restore()
            }
            ctx.rotate(-this.rotate)
            const fontSize = Math.min(this.width,this.height)*7/12;
            ctx.font = `${fontSize}px PingFang HK`
            ctx.fillStyle = 'black'
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(this.sid,0,0);
        }
        ctx.restore()
    }
    this.drawAlphaImg = function(ctx){
        ctx.save()
        ctx.translate(this.anchor.x,this.anchor.y)
        ctx.rotate(this.rotate)
        ctx.globalAlpha = 0.5
        ctx.drawImage(this.image,-this.width/2,-this.height/2,this.width,this.height)
        ctx.restore()
    }
    //获取矩形的四个顶点
    this.getCorner = function(corner){
        switch(corner){
            case Corner.leftTop:
                return rotatePoint({x:this.anchor.x-this.width/2,y:this.anchor.y-this.height/2},this.anchor,this.rotate)
            case Corner.rightTop:
                return rotatePoint({x:this.anchor.x+this.width/2,y:this.anchor.y-this.height/2},this.anchor,this.rotate)
            case Corner.leftBottom:
                return rotatePoint({x:this.anchor.x-this.width/2,y:this.anchor.y+this.height/2},this.anchor,this.rotate)
            case Corner.rightBottom:
                return rotatePoint({x:this.anchor.x+this.width/2,y:this.anchor.y+this.height/2},this.anchor,this.rotate)
        }
    }
    this.getMiddle = function(middle){
        switch(middle){
            case Middle.middleTop:
                return rotatePoint({x:this.anchor.x,y:this.anchor.y-this.height/2},this.anchor,this.rotate)
            case Middle.middleLeft:
                return rotatePoint({x:this.anchor.x-this.width/2,y:this.anchor.y},this.anchor,this.rotate)
            case Middle.middleRight:
                return rotatePoint({x:this.anchor.x+this.width/2,y:this.anchor.y},this.anchor,this.rotate)
            case Middle.middleBottom:
                return rotatePoint({x:this.anchor.x,y:this.anchor.y-this.height/2},this.anchor,this.rotate)
        }
    }
}
//计算点之间的距离
export function getDistance(pointA,pointB){
    return Math.sqrt(Math.pow((pointA.x-pointB.x),2)+Math.pow((pointA.y-pointB.y),2))
}
//绕着一个点旋转一个点，rotate顺时针为正
export function rotatePoint(point,anchor,rotate){
    var dis = getDistance(point,anchor)
    var theta
    if(point.x-anchor.x>0){
        theta = Math.asin((point.y-anchor.y)/dis)
        if(theta<0)
            theta+=2*Math.PI
    }
    else{
        theta = Math.PI-Math.asin((point.y-anchor.y)/dis)
    }
    theta+=rotate
    var x = Math.cos(theta)*dis+anchor.x
    var y = Math.sin(theta)*dis+anchor.y
    return new Point(x,y)
}

//判断点和矩形是否在某个矩形中
export function isPointInRect(point,rect){
    var p = rotatePoint(point,rect.anchor,-rect.rotate)
    if(p.x>=rect.anchor.x-rect.width/2&&
       p.x<=rect.anchor.x+rect.width/2&&
       p.y>=rect.anchor.y-rect.height/2&&
       p.y<=rect.anchor.y+rect.height/2){
        return true;
    }
    else{
        return false;
    }
}
//判断点是否在任意矩形中
export function isPointInAnyRect(point,rects){
    for(let i=rects.length-1;i>=0;i--){
        if(getDistance(point,rects[i].anchor)>rects.radius){
            continue;
        }
        if(isPointInRect(point,rects[i])){
            return i
        }
    }
    return false
}
//判断矩形和矩形是否冲突的办法
export function isTheRectsConflict(rectA,rectB){
    if(!rectA.isConflictable||!rectB.isConflictable)
        return false
    var ALT = rectA.getCorner(Corner.leftTop)
    var ART = rectA.getCorner(Corner.rightTop)
    var ALB = rectA.getCorner(Corner.leftBottom)
    var ARB = rectA.getCorner(Corner.rightBottom)
    var BLT = rectB.getCorner(Corner.leftTop)
    var BRT = rectB.getCorner(Corner.rightTop)
    var BLB = rectB.getCorner(Corner.leftBottom)
    var BRB = rectB.getCorner(Corner.rightBottom)
    return  isPointInRect(rectA.anchor,rectB)||
            isPointInRect(rectB.anchor,rectA)||
            checkCross(ALT,ART,BLT,BRT)||
            checkCross(ALT,ART,BLT,BLB)||
            checkCross(ALT,ART,BRT,BRB)||
            checkCross(ALT,ART,BLB,BRB)||
            checkCross(ART,ARB,BLT,BRT)||
            checkCross(ART,ARB,BLT,BLB)||
            checkCross(ART,ARB,BRT,BRB)||
            checkCross(ART,ARB,BLB,BRB)||
            checkCross(ALT,ALB,BLT,BRT)||
            checkCross(ALT,ALB,BLT,BLB)||
            checkCross(ALT,ALB,BRT,BRB)||
            checkCross(ALT,ALB,BLB,BRB)||
            checkCross(ALB,ARB,BLT,BRT)||
            checkCross(ALB,ARB,BLT,BLB)||
            checkCross(ALB,ARB,BRT,BRB)||
            checkCross(ALB,ARB,BLB,BRB)
            
}
export function detectRectsConflict(rects){
    for(var j=0;j<rects.length;j++){
        rects[j].isConflict = false
        for(var i=0;i<rects.length;i++){
            if(i===j||rects[j].radius+rects[i].radius<getDistance(rects[j].anchor,rects[i].anchor)){
                continue
            }
            if(isTheRectsConflict(rects[j],rects[i])){
                rects[j].isConflict = true
                break
            }
        }
    }
}
export const canvasStatus = {
    IDLE:0,
    DRAG_START:1,
    DRAGING:2,
    ROTATING:3
}
export function isPointInRotate(point,rotatePoint){
    return  point.x<rotatePoint.anchor.x+rotatePoint.width/2&&
    point.x>rotatePoint.anchor.x-rotatePoint.width/2-10&&
    point.y<rotatePoint.anchor.y+rotatePoint.height/2&&
    point.y>rotatePoint.anchor.y-rotatePoint.height/2-10
}
export function crossMul(v1,v2){
    return   v1.x*v2.y-v1.y*v2.x;
}
export function checkCross(p1,p2,p3,p4){
    if(Math.max(p1.x,p2.x)<Math.min(p3.x,p4.x)||
    Math.max(p1.y,p2.y)<Math.min(p3.y,p4.y)||
    Math.max(p3.x,p4.x)<Math.min(p1.x,p2.x)||
    Math.max(p3.y,p4.y)<Math.min(p1.y,p2.y))
        return false
    var v1={x:p1.x-p3.x,y:p1.y-p3.y};
    var v2={x:p2.x-p3.x,y:p2.y-p3.y};  
    var v3={x:p4.x-p3.x,y:p4.y-p3.y};  
    var v=crossMul(v1,v3)*crossMul(v2,v3);  
    v1={x:p3.x-p1.x,y:p3.y-p1.y};  
    v2={x:p4.x-p1.x,y:p4.y-p1.y};  
    v3={x:p2.x-p1.x,y:p2.y-p1.y};
    var res = (v<=0&&crossMul(v1,v3)*crossMul(v2,v3)<=0)?true:false;
    return res
}
export function setRectAbove(index,rects){
    rects.push(rects[index]);
    rects.splice(index,1)
}
export function getColorFromStatus(status){
    switch (status) {
        case 0:
            return false;
        case 1:
            return `rgb(61, 204, 15,0.6)`;
        case 2:
            return `rgb(52, 168, 238,0.4)`;
        case 3:
            return `rgb(251, 205, 22,0.4)`;
        case 4:
            return `rgb(249, 22, 11,0.4)`;
        default:
            return false;
    }
}