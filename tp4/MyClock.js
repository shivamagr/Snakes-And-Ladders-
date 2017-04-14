/**
 * MyClock
 * @constructor
 */
 function MyClock(scene, slices) {
 	CGFobject.call(this,scene);
	
	this.slices = slices;


	
	//this.stacks = stacks;

 	this.initBuffers();
 };

 var rad = Math.PI/180.0;

 MyClock.prototype = Object.create(CGFobject.prototype);
 MyClock.prototype.constructor = MyClock;

 MyClock.prototype.initBuffers = function() {
 	/*
 	* TODO:
 	* Replace the following lines in order to build a prism with a **single mesh**.
 	*
 	* How can the vertices, indices and normals arrays be defined to
 	* build a prism with varying number of slices and stacks?
 	*/
 	var n = this.slices;
 	var degree = 360/n;

 	this.vertices = [];
 	this.indices = [];
 	this.normals = [];
 	this.texCoords =[];

 	this.vertices.push(0,0,0);
 	for(var i=0;i<this.slices;i++)
 	{
 		this.vertices.push(Math.cos(i*degree*rad),Math.sin(i*degree*rad),0);
 	}

 	for(var i=1;i<this.slices;i++)
 	{
 		this.indices.push(0,i,i+1);
 	}
 	this.indices.push(0,this.slices,1);

 	for(var i=0;i<=this.slices;i++)
 	{
 		this.normals.push(0,0,1);
 	}

 	this.texCoords.push(0.5,0.5);
 	for(i=0;i<this.slices;i++)
 	{
 		this.texCoords.push(0.5+Math.cos(i*degree*rad)/2,0.5-Math.sin(i*degree*rad)/2);
 	}

 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };
