/**
 * chessBoard
 * @constructor
 */
 function chessBoard(scene, su, sv, du, dv, c1, c2, cs, textureNo) {
 	CGFobject.call(this,scene);

 	this.su = su;
 	this.sv = sv;
 	this.du = du;
 	this.dv = dv;
 	this.c1 = c1;
 	this.c2 = c2;
 	this.cs = cs;

 	this.base = new PlaneSurface(this.scene);

 	if(textureNo == 1)
 	this.texture = new CGFtexture(this.scene, 'wood.jpg');

 	else 
 		this.texture = new CGFtexture(this.scene, 'marble.jpg');

 	this.shader = new CGFshader(this.scene.gl, '../shader/shader.vert', '../shader/shader.frag');

	this.shader.setUniformsValues({su: this.su});
	this.shader.setUniformsValues({sv: this.sv});
	this.shader.setUniformsValues({du: this.du});
	this.shader.setUniformsValues({dv: this.dv});
	this.shader.setUniformsValues({color1: this.c1});
	this.shader.setUniformsValues({color3: this.c2});
	this.shader.setUniformsValues({color2: this.cs});
	

 	this.initBuffers();
 };

 chessBoard.prototype = Object.create(CGFobject.prototype);
 chessBoard.prototype.constructor = chessBoard;

 chessBoard.prototype.display = function() {


 	this.scene.pushMatrix();
 	this.texture.bind(0);
 	this.scene.setActiveShader(this.shader);
 	this.base.display();
	this.scene.popMatrix();
		this.scene.setActiveShader(this.scene.defaultShader);

 };
