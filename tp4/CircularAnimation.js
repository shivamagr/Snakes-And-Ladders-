function CircularAnimation(scene,centre,radius,initialangle,rotateangle,time){
	this.lastTime = 0;
	this.totalTime = time;
	this.scene = scene;
	this.totaldist = 0;
	//this.timestamp = [];

	this.close = 1;



	this.dist = [];

	this.x = centre[0];
	this.y = centre[1];
	this.z = centre[2];
	this.radius = radius;

    this.initialangle = initialangle * Math.PI/180;
	this.rotateangle = rotateangle * Math.PI/180;


//this.angularspeed = (2* Math.PI *this.radius)/this.totalTime;


};

 CircularAnimation.prototype = Object.create(CGFobject.prototype);
 CircularAnimation.prototype.constructor = CircularAnimation;

  CircularAnimation.prototype.refresh = function(currTime)
 {
 	
 	if(this.lastTime == 0)
 	{
 		this.lastTime = currTime;
 	}

 	var d = (currTime-this.lastTime);
 	var ptTime = (this.totalTime*1000);

 	this.angle = this.initialangle + this.rotateangle * (d/ptTime);

 	if(this.angle >= (this.initialangle + this.rotateangle))
 	{
 		this.close=0;
 	}
};
 CircularAnimation.prototype.apply = function() {
 		this.scene.translate(this.x, this.y, this.z);
 	if (this.close == 1)
 		this.scene.rotate(this.angle, 0, 1, 0);
 	else
 		this.scene.rotate(this.initialangle + this.rotateangle, 0, 1, 0);
 		this.scene.translate(this.radius, 0, 0);
 	if (this.end == 1)
 		this.scene.rotate(-this.angle, 0, 1, 0);
 	else
 		this.scene.rotate(-this.initialangle - this.rotateangle, 0, 1, 0);
 		
};
