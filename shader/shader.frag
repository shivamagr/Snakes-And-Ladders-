#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;
uniform sampler2D uSampler;

uniform float su;
uniform float sv;
uniform float du;
uniform float dv;

uniform vec4 color1;
uniform vec4 color2;
uniform vec4 color3;

void main() {
	vec4 color = texture2D(uSampler, vTextureCoord);
	
	if ( (vTextureCoord.x > su/du) && (vTextureCoord.x < (su+1.0)/du) && (vTextureCoord.y < (1.0 - sv/dv)) && (vTextureCoord.y > (1.0 - (sv+1.0)/dv) ))
			color.rgba *= color1;
	
	else if( ( (mod(du * vTextureCoord.x,2.0) < 1.0) && (mod(dv * vTextureCoord.y,2.0) < 1.0) ) || ( (mod(du * vTextureCoord.x,2.0) > 1.0) && (mod(dv * vTextureCoord.y,2.0) > 1.0) ) )
		color.rgba *= color1;
	
	else 
		color.rgba *= color3;

	//color.rgba /= 2.0;
	gl_FragColor = color;
}