/**
 * linearAnimation
 * @constructor
 *//*
 function linearAnimation(primitive, arr, time) {
 	
 	var pts = [];
 	for(var i=0;i<arr.length();i++)
 	pts.push(arr.pop());

 	this.time = time;
 	this.primitive = primitive;
 	this.pts = pts;

 	var dist = [];
 	var x1 = pts.pop();
 	var y1 = pts.pop();
 	var z1 = pts.pop();
 	for(var i=0;i<pts.length();i++)
 	{
 		var x2 = pts.pop();
 		var y2 = pts.pop();
 		var z2 = pts.pop();
 		dist.push(Math.sqrt(((x1-x2)*(x1-x2))+((y1-y2)*(y1-y2))+((z1-z2)*(z1-z2))));
 		x1=x2;
 		y1=y2;
 		z1=z2;

 	}
 	this.dist = [];
 	
 	this.totaldist =0;

 	for(var i=0;i<dist.length();i++){
 		var x = dist.pop();
 		this.totaldist += x;
 		this.dist.push(x);
 	}

 	this.speed = this.totaldist/this.time;

 	this.lastTime = 0;
 	this.x = this.pts.pop();
 	this.y = this.pts.pop();
 	this.z = this.pts.pop();
 	this.totalTime = 0;



 	//primitive.translate(pts.pop());

 };

 linearAnimation.prototype = Object.create(CGFobject.prototype);
 linearAnimation.prototype.constructor = linearAnimation;

 linearAnimation.getPt = function(){
 	this.currDist = this.dist.pop();
 	this.x = this.pts.pop();
 	this.y = this.pts.pop();
 	this.z = this.pts.pop();
 }

 linearAnimation.refresh = function(currTime)
 {

 	var x = this.x;
 	var y = this.y;
 	var z = this.z;
 	

 	if(this.lastTime == 0){
 		this.lastTime = currTime;
 		//getPt();
 		this.primitive.translate(this.x,this.y,this.z);
 		getPt();
 	}
 	else
 	{
 		//getPt();
 		var diff = currTime - this.lastTime;
 		this.lastTime = currTime;
 		this.totalTime += diff;
 		var timestamp =(this.time*this.currDist)/this.totaldist;
 			if(this.totalTime < timestamp)
 			{
 				x = x + (((this.x-x)/timestamp)*interval);
 				y = y + (((this.y-y)/timestamp)*interval);
 				z = z + (((this.z-z)/timestamp)*interval);
 				this.primitive.translate(x,y,z);
 			}
 			else{
 				this.totalTime = 0;
 				this.lastTime = 0;
 			}
 	}
 	

 	/*while(this.dist.length()!=0){

 		this.primitive.translate(x,y,z);

 	var x2 = this.pts.pop();
 	var y2 = this.pts.pop();
 	var z2 = this.pts.pop();

 	var timestamp = this.dist.pop()/this.totaldist;
 	for(var i=0;i<timestamp/interval;i++){
 		x = x + (((x2-x)/timestamp)*interval);
 		y = y + (((y2-y)/timestamp)*interval);
 		z = z + (((z2-z)/timestamp)*interval);
 		this.primitive.translate(z,y,z);
 	}

 	x = x2;
 	y = y2;
 	z = z2;
 	}*//*

 }*/

function linearAnimation(scene, arr, time){

	this.lastTime = 0;
	this.totalTime = time;
	this.scene = scene;
	this.arr = arr;
	this.totaldist = 0;
	this.timestamp = [];

	this.dist = [];

	var x = arr[0];
	var y = arr[1];
	var z = arr[2];

	for(var i=1;i<(this.arr.length/3);i++)
	{
		var x2 = arr[i*3];
		var y2 = arr[i*3+1];
		var z2 = arr[i*3+2];
		this.dist.push( Math.sqrt(((x2-x)*(x2-x))+((y2-y)*(y2-y))+((z2-z)*(z2-z))));
		this.totaldist +=this.dist[i-1];
		x=x2;
		y=y2;
		z=z2;
	}

	this.speed = this.totaldist/this.totalTime;

	for(var i=0;i<(this.arr.length/3)-1;i++)
	{
		this.timestamp.push(this.dist[i]/this.speed);
		/*console.log("timestamp:   ");
		console.log(this.timestamp[i]);
		console.log("dist:     ");
		console.log(this.dist[i]);*/
	}

}

 linearAnimation.prototype = Object.create(CGFobject.prototype);
 linearAnimation.prototype.constructor = linearAnimation;

 linearAnimation.prototype.refresh = function(currTime)
 {
 	
 	if(this.lastTime == 0)
 	{
 		this.lastTime = currTime;
 		pt = 0;
 	}

 	if(pt == (this.arr.length/3) -1)
 	{
 		this.close = 0;
 	}


 	this.diffx = this.arr[3*(pt+1)]-this.arr[3*pt];
 	this.diffy = this.arr[3*(pt+1)+1]-this.arr[3*pt+1];
 	this.diffz = this.arr[3*(pt+1)+2]-this.arr[3*pt+2];

 	var d = (currTime-this.lastTime);
 	var ptTime = (this.timestamp[pt]*1000);


 	//this.angle = 
 	

 	this.x = this.arr[3*pt]+(this.diffx*(d/ptTime));
 	this.y = this.arr[3*pt+1]+(this.diffy*(d/ptTime));
 	this.z = this.arr[3*pt+2]+(this.diffz*(d/ptTime));

 	if( (currTime-this.lastTime) >= (this.timestamp[pt]*1000))
 	{
 		this.lastTime = currTime;
 		//this.angle = 
 		 pt++;
 	}

 	/*console.log(currTime);
 	console.log(this.timestamp[pt]);
 	console.log(this.x);
 	console.log(this.y);
 	console.log(this.z);*/

 };

 linearAnimation.prototype.change = function(){
 	if(this.close!=0)
 	{
 		this.scene.translate(this.x, this.y, this.z);
 	}
 };



 
