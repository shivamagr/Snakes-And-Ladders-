/**
 * patch
 * @constructor
 */
 function patch(scene, u, v, controlVertices) {
 	CGFobject.call(this,scene);
	this.u = u;
	this.v = v;
	this.vertices = controlVertices;
	

 	this.initBuffers();
 };

 patch.prototype = Object.create(CGFobject.prototype);
 patch.prototype.constructor = patch;

 patch.prototype.initBuffers = function() {
 	this.makeSurface(this.u,this.v,this.vertices);
 };

  patch.prototype.getKnotsVector = function(degree) { // TODO (CGF 0.19.3): add to CGFnurbsSurface
	
	var v = new Array();
	for (var i=0; i<=degree; i++) {
		v.push(0);
	}
	for (var i=0; i<=degree; i++) {
		v.push(1);
	}
	return v;
};


patch.prototype.makeSurface = function (degree1, degree2, controlvertexes) {
		
	var knots1 = this.getKnotsVector(degree1); // to be built inside webCGF in later versions ()
	var knots2 = this.getKnotsVector(degree2); // to be built inside webCGF in later versions
		
	var nurbsSurface = new CGFnurbsSurface(degree1, degree2, knots1, knots2, controlvertexes); // TODO  (CGF 0.19.3): remove knots1 and knots2 from CGFnurbsSurface method call. Calculate inside method.
	getSurfacePoint = function(u, v) {
		return nurbsSurface.getPoint(u, v);
	};

	this.obj = new CGFnurbsObject(this.scene, getSurfacePoint, 20, 20 );
	//this.surfaces.push(obj);		
};

patch.prototype.display = function(){
	this.obj.display();
};
