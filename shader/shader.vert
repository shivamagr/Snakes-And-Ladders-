attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;

uniform float su;
uniform float sv;
uniform float du;
uniform float dv;

varying vec2 vTextureCoord;

void main() {

	if ( (aTextureCoord.x > su/du) && (aTextureCoord.y < (1.0 - sv/dv)) && (aTextureCoord.x < (su+1.0)/du) && (aTextureCoord.y > (1.0 - (sv+1.0)/dv) ))
		gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition.x, aVertexPosition.y, aVertexPosition.z + 0.1, 1.0);

	else
		gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);

		vTextureCoord = aTextureCoord;
}