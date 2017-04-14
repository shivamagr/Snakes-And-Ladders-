/**
 * PlaneSurface
 * @constructor
 */
 function PlaneSurface(scene) {
 	CGFobject.call(this,scene);
 	this.initBuffers();
 };

 

 PlaneSurface.prototype = Object.create(CGFobject.prototype);
 PlaneSurface.prototype.constructor = PlaneSurface;

 PlaneSurface.prototype.initBuffers = function() {
 	
 	this.makeSurface("0", 1, // degree on U: 2 control vertexes U
					 1, // degree on V: 2 control vertexes on V
					[	// U = 0
						[ // V = 0..1;
							 [-1.3, -1.3, 0.0, 1 ],
							 [-1.3,  1.3, 0.0, 1 ]
							
						],
						// U = 1
						[ // V = 0..1
							 [ 1.3, -1.3, 0.0, 1 ],
							 [ 1.3,  1.3, 0.0, 1 ]							 
						]
					]);

 	//this.primitiveType = this.scene.gl.TRIANGLES;
 	//this.initGLBuffers();
 };

 PlaneSurface.prototype.getKnotsVector = function(degree) { // TODO (CGF 0.19.3): add to CGFnurbsSurface
	
	var v = new Array();
	for (var i=0; i<=degree; i++) {
		v.push(0);
	}
	for (var i=0; i<=degree; i++) {
		v.push(1);
	}
	return v;
};


PlaneSurface.prototype.makeSurface = function (id, degree1, degree2, controlvertexes, translation) {
		
	var knots1 = this.getKnotsVector(degree1); // to be built inside webCGF in later versions ()
	var knots2 = this.getKnotsVector(degree2); // to be built inside webCGF in later versions
		
	var nurbsSurface = new CGFnurbsSurface(degree1, degree2, knots1, knots2, controlvertexes); // TODO  (CGF 0.19.3): remove knots1 and knots2 from CGFnurbsSurface method call. Calculate inside method.
	getSurfacePoint = function(u, v) {
		return nurbsSurface.getPoint(u, v);
	};

	this.obj = new CGFnurbsObject(this.scene, getSurfacePoint, 20, 20 );
	//this.surfaces.push(obj);		
};

PlaneSurface.prototype.display = function(){
	this.obj.display();
};