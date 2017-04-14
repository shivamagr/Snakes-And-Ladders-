/**
 * MyTable
 * @constructor
 *//*
 function MyTable(scene) {
 	CGFobject.call(this, scene);

 	this.myUnitCubeQuad = new MyUnitCubeQuad(this.scene);
 	this.myUnitCubeQuad.initBuffers();
 };

 MyTable.prototype = Object.create(CGFobject.prototype);
 MyTable.prototype.constructor = MyTable;

 MyTable.prototype.display = function() {
 	// legs
 	this.scene.pushMatrix();
 	this.scene.translate(2, 3.5 / 2, 1);
 	this.scene.scale(0.3, 3.5, 0.3);
 	this.myUnitCubeQuad.display();
 	this.scene.popMatrix();

 	this.scene.pushMatrix();
 	this.scene.translate(2, 3.5 / 2, -1);
 	this.scene.scale(0.3, 3.5, 0.3);
 	this.myUnitCubeQuad.display();
 	this.scene.popMatrix();

 	this.scene.pushMatrix();
 	this.scene.translate(-2, 3.5 / 2, 1);
 	this.scene.scale(0.3, 3.5, 0.3);
 	this.myUnitCubeQuad.display();
 	this.scene.popMatrix();

 	this.scene.pushMatrix();
 	this.scene.translate(-2, 3.5 / 2, -1);
 	this.scene.scale(0.3, 3.5, 0.3);
 	this.myUnitCubeQuad.display();
 	this.scene.popMatrix();

 	// table top
 	this.scene.pushMatrix();
 	this.scene.translate(0, 3.5, 0);
 	this.scene.scale(5, 0.3, 3);
 	this.myUnitCubeQuad.display();
 	this.scene.popMatrix();
 }
*/

 /**
 * MyObject
 * @param gl {WebGLRenderingContext}
 * @constructor
 *//*****************************/
function MyTable(scene) {
	CGFobject.call(this,scene);
	this.table = new MyUnitCubeQuad(this.scene);
	this.table.initBuffers();
    this.scene.tableAppearance = new CGFappearance(this.scene);
    this.scene.tableAppearance1 = new CGFappearance(this.scene);
    this.scene.tableAppearance.setAmbient(0.3,0.3,0.3,1);
    this.scene.tableAppearance.setDiffuse(1,1,1,1);
    this.scene.tableAppearance.setShininess(20);
    this.scene.tableAppearance.loadTexture("../resources/images/marble.jpg");
     this.scene.tableAppearance1.loadTexture("../resources/images/4.jpg");


    this.scene.legAppearance =  new CGFappearance(this.scene);
    
	//this.initBuffers();
};

MyTable.prototype = Object.create(CGFobject.prototype);
MyTable.prototype.constructor=MyTable;

MyTable.prototype.display = function(){/*****************/
	/**/this.vertices = [
            -0.5, -0.5, 0,
            0.5, -0.5, 0,
            -0.5, 0.5, 0,
            0.5, 0.5, 0
			];

	this.indices = [
            0, 1, 2, 
			3, 2, 1
        ];
		
	this.primitiveType=this.scene.gl.TRIANGLES;
	this.initGLBuffers();/**//*******************************/

	//leg1
	this.scene.pushMatrix();     
     this.scene.translate(0.15,1.75,0.15);
     this.scene.scale(0.3,3.5,0.3);
     this.scene.legAppearance.apply();
     this.table.display();
     this.scene.popMatrix();

     //leg2
     this.scene.pushMatrix();
     this.scene.translate(4.85,1.75,0.15);
     this.scene.scale(0.3,3.5,0.3);
     this.table.display();
     this.scene.popMatrix();

     //leg3
     this.scene.pushMatrix();
     this.scene.translate(4.85,1.75,2.85);
     this.scene.scale(0.3,3.5,0.3);
     this.table.display();
     this.scene.popMatrix();

     //leg4
     this.scene.pushMatrix();
     this.scene.translate(0.15,1.75,2.85);
     this.scene.scale(0.3,3.5,0.3);
     this.table.display();
     this.scene.popMatrix();

     //top
     this.scene.pushMatrix();
     this.scene.translate(2.5,3.65,1.5);
     this.scene.scale(5,0.3,3);
     if(this.scene.environment==false)
     this.scene.tableAppearance.apply();
    else
        this.scene.tableAppearance1.apply();
     this.table.display();

     this.scene.popMatrix();





};
/*****************************/






















