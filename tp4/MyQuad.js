/**
 * MyQuad
 * @constructor
 */
 function MyQuad(scene,minS,maxS,minT,maxT) {
 	CGFobject.call(this,scene);
    
    this.min_s = minS || 0;   //x axis
    this.max_s = maxS || 1;
    this.min_t = minT || 0;   //y axis
    this.max_t = maxT || 1;
 	this.initBuffers();
 };

 MyQuad.prototype = Object.create(CGFobject.prototype);
 MyQuad.prototype.constructor = MyQuad;

 MyQuad.prototype.initBuffers = function() {
 	this.vertices = [
 	-0.5, -0.5, 0,
 	0.5, -0.5, 0,
 	-0.5, 0.5, 0,
 	0.5, 0.5, 0
 	];

 	this.indices = [
 	0, 1, 2, 
 	3, 2, 1
 	];

    this.texCoords=[
     
    this.min_s,this.max_t,
    this.max_s,this.max_t,
    this.min_s,this.min_t,
    this.max_s,this.min_t



    ];
    




 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.normals =[
    0,0,1,
    0,0,1,
    0,0,1,
    0,0,1
 	];
 	this.initGLBuffers();
 
};
