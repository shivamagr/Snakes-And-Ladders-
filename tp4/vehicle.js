/**
 * vehical
 * @constructor
 **/
 
 function vehicle(scene) {
 	CGFobject.call(this,scene);

 	this.initBuffers();
 };

 vehicle.prototype = Object.create(CGFobject.prototype);
 vehicle.prototype.constructor = vehicle;

 vehicle.prototype.initBuffers = function() {
this.patch = new patch(this.scene,1,5,[
	                    [
	                    [-1.5,0.25,0.9,1],
	                    [-1.5,0.25,0.9,1],
	                    [-1.5,0.25,0.9,1],
	                    [-1.5,0.25,-0.9,1],
	                    [-1.5,0.25,-0.9,1],
	                    [-1.5,0.25,-0.9,1]
	                    ],

	                    [
	                    [3,1,0.9,1],
	                    [3,1,0.9,1],
	                    [3,1,0.9,1],
	                    [3,1,-0.9,1],
	                    [3,1,-0.9,1],
	                    [3,1,-0.9,1]
	                    ],

	                    
	                    




	                    
	]);


/** 	this.makeSurface(this.u,this.v,this.vertices);
 };

  vehicle.prototype.getKnotsVector = function(degree) { // TODO (CGF 0.19.3): add to CGFnurbsSurface
	
	var v = new Array();
	for (var i=0; i<=degree; i++) {
		v.push(0);
	}
	for (var i=0; i<=degree; i++) {
		v.push(1);
	}
	return v;
};


vehicle.prototype.makeSurface = function (degree1, degree2, controlvertexes) {
		
	var knots1 = this.getKnotsVector(degree1); // to be built inside webCGF in later versions ()
	var knots2 = this.getKnotsVector(degree2); // to be built inside webCGF in later versions
		
	var nurbsSurface = new CGFnurbsSurface(degree1, degree2, knots1, knots2, controlvertexes); // TODO  (CGF 0.19.3): remove knots1 and knots2 from CGFnurbsSurface method call. Calculate inside method.
	getSurfacePoint = function(u, v) {
		return nurbsSurface.getPoint(u, v);
	};

	this.obj = new CGFnurbsObject(this.scene, getSurfacePoint, 20, 20 );
**/	//this.surfaces.push(obj);		
};

vehicle.prototype.display = function(){
	this.patch.display();
};
