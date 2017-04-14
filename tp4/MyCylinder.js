/**
 * MyCylinder
 * @constructor
 */
 function MyCylinder(scene, slices, stacks) {
 	CGFobject.call(this,scene);
	
	this.slices = slices;
	this.stacks = stacks;

 	this.initBuffers();
 };

 var rad = Math.PI/180.0;

 MyCylinder.prototype = Object.create(CGFobject.prototype);
 MyCylinder.prototype.constructor = MyCylinder;

 MyCylinder.prototype.initBuffers = function() {
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
 			//this.vertices.push(Math.cos((i+1)*degree*rad),Math.sin((i+1)*degree*rad),j/this.stacks);
 		}
 	}

 	for(var j=0;j<this.stacks;j++)
 	{
 		var a = j*n;
 		var b = (j+1)*n;
 		for(var i=0;i<n-1;i++)
 		{
 			this.indices.push((a+i),(a+i)+1,(b+i)+1);
 			this.indices.push((a+i),(b+i)+1,(b+i));



 			this.indices.push((a+i)+1,(a+i),(b+i)+1);
 			this.indices.push((b+i)+1,(a+i),(b+i));
 		}
 		this.indices.push(b-1,a,b);
 		this.indices.push(b-1,b,b+n-1);

 		this.indices.push(a,b-1,b);
 		this.indices.push(b,b-1,b+n-1);
 	}

 	var half_angle = degree/2;

 	for(var j = 0; j<=this.stacks;j++)
 	{
 		for(var i=0;i<n;i++)
 		{
 			this.normals.push(Math.cos(half_angle*rad+i*degree*rad),Math.sin((half_angle+i*degree)*rad),0);
 			//this.normals.push(Math.cos(half_angle*rad+i*degree*rad),Math.sin((half_angle+i*degree)*rad),0);
 		}
 	}

    console.log(this.vertices.length);
    console.log(this.indices.length);
    console.log(this.normals.length);


 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };
