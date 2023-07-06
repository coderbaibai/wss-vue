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
export var redrawAll = function(ctx,canvas,rects,rotatePoint){
    console.log("redraw");
    ctx.clearRect(0,0,canvas.clientWidth,canvas.clientHeight)
    var index = -1;
    for(var i=0;i<rects.length;i++){
        rects[i].draw(ctx)
        if(rects[i].isSelected)
            index = i
    }
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
export function Rect(id,image,point,width,height,rotate){
    this.id = id
    this.image = image
    this.anchor = {x:point.x+width/2,y:point.y+height/2}
    this.width = width
    this.height = height
    this.rotate = rotate
    this.radius = Math.sqrt((width/2)**2+(height/2)**2)
    this.isSelected = false
    this.isConflict = false
    this.draw = function(ctx){
        this.drawImg(ctx)
        if(this.isSelected)
            this.drawStrokeSelected(ctx)
        else if(this.isConflict)
            this.drawStrokeConflict(ctx)
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
    this.drawStrokeConflict = function(ctx){
        ctx.save()
        ctx.translate(this.anchor.x,this.anchor.y)
        ctx.rotate(this.rotate)
        ctx.strokeStyle = "rgb(255,0,0)"
        ctx.strokeRect(-this.width/2,-this.height/2,this.width,this.height)
        ctx.restore()
    }
    this.drawStrokeSelected = function(ctx){
        ctx.save()
        ctx.translate(this.anchor.x,this.anchor.y)
        ctx.rotate(this.rotate)
        ctx.strokeStyle = "rgb(0,0,255)"
        ctx.setLineDash([5,5])
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
    this.drawImg = function(ctx){
        ctx.save()
        ctx.translate(this.anchor.x,this.anchor.y)
        ctx.rotate(this.rotate)
        ctx.drawImage(this.image,-this.width/2,-this.height/2,this.width,this.height)
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
    for(let i=0;i<rects.length;i++){
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
 return isPointInRect(rectA.getCorner(Corner.leftTop),rectB)||
        isPointInRect(rectA.getCorner(Corner.rightTop),rectB)||
        isPointInRect(rectA.getCorner(Corner.leftBottom),rectB)||
        isPointInRect(rectA.getCorner(Corner.rightBottom),rectB)||
        isPointInRect(rectB.getCorner(Corner.leftTop),rectA)||
        isPointInRect(rectB.getCorner(Corner.rightTop),rectA)||
        isPointInRect(rectB.getCorner(Corner.leftBottom),rectA)||
        isPointInRect(rectB.getCorner(Corner.rightBottom),rectA)
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