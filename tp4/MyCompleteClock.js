

function MyCompleteClock(scene, slices, stacks) {
	CGFobject.call(this,scene);
	
    this.slices = slices;
    this.stacks = stacks;

    this.lastTime = 0;

    this.clockAppearance = new CGFappearance(this.scene);
    this.clockAppearance.loadTexture("clock.png");

    this.clocks = new MyClock(this.scene, this.slices);
    this.clocks.initBuffers();

    this.cylinder = new MyCylinder(this.scene, this.slices, this.stacks);
    this.cylinder.initBuffers();

    this.clockHandH = new MyClockHand(this.scene,0);
    this.clockHandH.initBuffers();
    this.clockHandM = new MyClockHand(this.scene,0);
    this.clockHandM.initBuffers();
    this.clockHandS = new MyClockHand(this.scene,0);
    this.clockHandS.initBuffers();

    this.handApperance = new CGFappearance(this.scene);
    this.handApperance.setDiffuse(0,0,0,1);
    this.handApperance.setSpecular(0,0,0,1);
    this.handApperance.setShininess(8);

    this.clockHandS.setMyAngle(270);
    this.clockHandM.setMyAngle(180);
    this.clockHandH.setMyAngle(90);



    
	//this.initBuffers();
};

var degTorad = Math.PI/180.0;

MyCompleteClock.prototype = Object.create(CGFobject.prototype);
MyCompleteClock.prototype.constructor=MyCompleteClock;


/***********************************/

MyCompleteClock.prototype.update = function(currTime){
    if (this.lastTime == 0) {
        this.lastTime = currTime;
        secInc = 0.6;
    }
    else {
        var diff = currTime - this.lastTime;
        this.lastTime = currTime;
         secInc = diff * (360 / (60 * 1000));
    }

    this.clockHandS.setMyAngle(this.clockHandS.angle + secInc);
    this.clockHandM.setMyAngle(this.clockHandM.angle + secInc/60);
    this.clockHandH.setMyAngle(this.clockHandH.angle + secInc/60/60);
 }; 

MyCompleteClock.prototype.display = function(){

    this.scene.pushMatrix();
    this.cylinder.display();
    this.scene.popMatrix()

    //HOUR hand
    this.scene.pushMatrix();
    this.scene.rotate(this.clockHandH.angle* -degTorad,0,0,1);
    this.scene.translate(0,0.2,1);
    this.scene.scale(0.04,0.4,0.15);
    this.handApperance.apply();
    this.clockHandH.display();
    this.scene.popMatrix();


    //Minute hand
    this.scene.pushMatrix();
    this.scene.rotate(this.clockHandM.angle* -degTorad,0,0,1);
    this.scene.translate(0,0.2,1);

    this.scene.scale(0.01,0.6,0.15);
    this.handApperance.apply();
    this.clockHandM.display();
    this.scene.popMatrix();

    //Second hand
    this.scene.pushMatrix();
    this.scene.rotate(this.clockHandS.angle* -degTorad,0,0,1);
    this.scene.translate(0,0.3,1);
    this.scene.scale(0.01,0.8,0.15);
    this.handApperance.apply();
    this.clockHandS.display();
    this.scene.popMatrix();

    //Clock Top
	this.scene.pushMatrix();
    this.scene.translate(0,0,1);
    this.clockAppearance.apply();
    this.clocks.display();
    this.scene.popMatrix();





};