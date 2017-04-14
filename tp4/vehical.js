/**
 * vehical
 * @constructor
 */
 function vehical(scene) {
 	CGFobject.call(this,scene);

 	this.bottom = [

 			[
 				[-5,4,2,1],
 				[-5,4,0,1],
 				[-5,4,-2,1]
 			],	
 			[
 				[-5,4,2,1],
 				[-5,-1,0,1],
 				[-5,4,-2,1]
 			],
 			[
 				[1,4,2,1],
 				[1,-4,0,1],
 				[1,4,-2,1]
 			],
 			[
 				[3,4,2,1],
 				[3,-1,0,1],
 				[3,4,-2,1]
 			],
 			[
 				[5,4,2,1],
 				[5,4,0,1],
 				[5,4,-2,1]
 			]
 				];

 	this.outer = 	

 			[
 				[
 				[5,4,2,1],
 				[5,4,0,1],
 				[5,4,-2,1]
 			],

 			[
 				[3,4,2,1],
 				[3,-1,0,1],
 				[3,4,-2,1]
 			],

 			[
 				[1,4,2,1],
 				[1,-4,0,1],
 				[1,4,-2,1]
 			],

 			[
 				[-5,4,2,1],
 				[-5,-1,0,1],
 				[-5,4,-2,1]
 			],
 			[


 				[-5,4,2,1],
 				[-5,4,0,1],
 				[-5,4,-2,1]
 			]

 			]	
 			
 			
 					



 	this.plane = new PlaneSurface(this.scene);					

 	this.surface = new patch(this.scene,4,2,this.bottom);
 	this.surfaceOut = new patch(this.scene,4,2,this.outer);

 	this.initBuffers();
 };

 vehical.prototype = Object.create(CGFobject.prototype);
 vehical.prototype.constructor = vehical;

 vehical.prototype.initBuffers = function() { 	
 };

 vehical.prototype.display = function(){
 	this.scene.pushMatrix();
 	//this.rotate(180)
 	this.surface.display();
 	this.scene.popMatrix();

 	//this.plane.display();
 	this.surfaceOut.display();
 };	
