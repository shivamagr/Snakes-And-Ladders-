/**
 * MyPrism
 * @constructor
 */
 function MyPrism(scene, slices, stacks) {
 	CGFobject.call(this,scene);
	
	this.slices = slices;
	this.stacks = stacks;

 	this.initBuffers();
 };

 var rad = Math.PI/180.0;

 MyPrism.prototype = Object.create(CGFobject.prototype);
 MyPrism.prototype.constructor = MyPrism;

 MyPrism.prototype.initBuffers = function() {
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

 	for(var j=0;j<=this.stacks;j++)
 	{
 		for(var i=0;i<n;i++)
 		{
 			this.vertices.push(Math.cos(i*degree*rad),Math.sin(i*degree*rad),j/this.stacks);
 			this.vertices.push(Math.cos((i+1)*degree*rad),Math.sin((i+1)*degree*rad),j/this.stacks);
 		}
 	}

 	for(var j=0;j<this.stacks;j++)
 	{
 		for(var i=0;i<n;i++)
 		{
 			var a = j*n;
 			var b = (j+1)*n;
 			this.indices.push(2*(a+i),2*(a+i)+1,(b+i)*2+1);
 			this.indices.push(2*(a+i),(b+i)*2+1,2*(b+i));
 		}
 	}

 	var half_angle = degree/2;

 	for(var j = 0; j<=this.stacks;j++)
 	{
 		for(var i=0;i<n;i++)
 		{
 			this.normals.push(Math.cos(half_angle*rad+i*degree*rad),Math.sin((half_angle+i*degree)*rad),0);
 			this.normals.push(Math.cos(half_angle*rad+i*degree*rad),Math.sin((half_angle+i*degree)*rad),0);
 		}
 	}

 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };
