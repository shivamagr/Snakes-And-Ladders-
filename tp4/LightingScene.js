var degToRad = Math.PI / 180.0;

var BOARD_WIDTH = 6.0;
var BOARD_HEIGHT = 4.0;

var BOARD_A_DIVISIONS = 30;
var BOARD_B_DIVISIONS = 100;

function LightingScene() {
	CGFscene.call(this);
}

LightingScene.prototype = Object.create(CGFscene.prototype);
LightingScene.prototype.constructor = LightingScene;

LightingScene.prototype.init = function(application) {
	CGFscene.prototype.init.call(this, application);
    
    this.floorAppearance = new CGFappearance(this);
    this.floorAppearance.loadTexture("../resources/images/marble1.jpg");
	this.windowAppearance = new CGFappearance(this);
	this.windowAppearance.loadTexture("../resources/images/audience.jpg");

	this.floorAppearance1 = new CGFappearance(this);
	this.floorAppearance1.loadTexture("../resources/images/sand.jpg");
	this.windowAppearance1 = new CGFappearance(this);
	this.windowAppearance1.loadTexture("../resources/images/waves.jpg");
   
    this.rightwallAppearance = new CGFappearance(this);
    this.rightwallAppearance.loadTexture("../resources/images/auditorium.jpg");

    this.rightwallAppearance1 = new CGFappearance(this);
    this.rightwallAppearance1.loadTexture("../resources/images/sea.jpg");

    this.undoAppearance = new CGFappearance(this);
     this.undoAppearance.loadTexture("../resources/images/undo.jpg");

     this.difficultyAppearance = new CGFappearance(this);
     this.difficultyAppearance.loadTexture("../resources/images/difficult.jpg");

    this.envAppearance = new CGFappearance(this);
    this.envAppearance.loadTexture("../resources/images/envi.jpg");


  




	this.slidesAppearance = new CGFappearance(this);

    this.slidesAppearance.setAmbient(0.2,0.2,0.2,1);
    this.slidesAppearance.setSpecular(0.2,0.2,0.2,1);
    this.slidesAppearance.setDiffuse(0.8,0.8,0.8,1);
    
    this.boardAppearance = new CGFappearance(this);
   
    this.boardAppearance.setAmbient(0.3,0.3,0.3,1);
    this.boardAppearance.setSpecular(0.3,0.3,0.3,1);
    this.boardAppearance.setDiffuse(0.3,0.3,0.3,1);

    this.clockAppearance = new CGFappearance(this);
    this.clockAppearance.loadTexture('clock.png');

    this.boatAppearance = new CGFappearance(this);
    this.boatAppearance.loadTexture('wood.jpg');



	this.initCameras();

	this.initLights();

	this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
	this.gl.clearDepth(100.0);
	this.gl.enable(this.gl.DEPTH_TEST);
	this.gl.enable(this.gl.CULL_FACE);
	this.gl.depthFunc(this.gl.LEQUAL);

	this.axis = new CGFaxis(this);

	// Scene elements
	this.table = new MyTable(this);
	this.wall = new Plane(this);
	this.floor = new MyQuad(this,0,0,0,0);

	this.cylinder = new MyCylinder(this, 8, 20);
	
	this.leftwall = new MyQuad(this,0,0,0,0);

	this.rightwall = new MyQuad(this,0,0,0,0);

	this.boardA = new Plane(this, BOARD_A_DIVISIONS,0,1,0,1);
	this.boardB = new Plane(this, BOARD_B_DIVISIONS,0,1,0,1);

	this.clock = new MyClock(this,12);
	this.clockHand = new MyClockHand(this,0);
	this.final_clock = new MyCompleteClock(this,12,20);

	// Materials
	this.materialDefault = new CGFappearance(this);


	

   

	this.materialA = new CGFappearance(this);
	this.materialA.setAmbient(0.3,0.3,0.3,1);
	this.materialA.setDiffuse(0.6,0.6,0.6,1);
	this.materialA.setSpecular(0.2,1,0,1);
	this.materialA.setShininess(120);
	
    
    this.materialB = new CGFappearance(this);
	this.materialB.setAmbient(0.3,0.3,0.3,1);
	this.materialB.setDiffuse(0.6,0.6,0.6,1);
	this.materialB.setSpecular(0.8,0.8,0.8,1);	
	this.materialB.setShininess(120);

    this.enableTextures(true);	

    /***************************TP2**********************************/

	var arr = [0,0,1,
				0,0,2,
				0,0,3
	];
	var time =10;
	this.t_start = new Date();
	this.animate = new linearAnimation(this, [0,0,0,
		1,0,1,
				2,0,2,
				3,0,3,
				0,0,0
				], 10);

	this.PlaneSurface = new PlaneSurface(this);
	this.patch = new patch(this, 2, // degree on U: 3 control vertexes U
					 3, // degree on V: 4 control vertexes on V
					[	// U = 0
						[ // V = 0..3;
							 [ -1.5, -1.5, 0.0, 1 ],
							 [ -2.0, -2.0, 2.0, 1 ],
							 [ -2.0,  2.0, 2.0, 1 ],
							 [ -1.5,  1.5, 0.0, 1 ]
							
						],
						// U = 1
						[ // V = 0..3
							 [ 0, 0, 3.0, 1 ],
							 [ 0, -2.0, 3.0, 1],
							 [ 0,  2.0, 3.0, 1 ],
							 [ 0,  0, 3.0, 1 ]							 
						],
						// U = 2
						[ // V = 0..3							 
							 [ 1.5, -1.5, 0.0, 1 ],
							 [ 2.0, -2.0, 2.0, 1 ],
							 [ 2.0,  2.0, 2.0, 1 ],
							 [ 1.5,  1.5, 0.0, 1 ]
						]
					]);


	/**************************TP2*****************************   ***********/

this.chess = new chessBoard(this, 1, 0, 10, 10, [0.5, 0.2, 0.3, 0.4], [0.9, 0.9, 0.9, 0.8], [1, 0, 0, 1],1);
	this.boat = new vehical(this);	
this.CircularAnimation = new CircularAnimation(this,[5,5,5],3,20,60,40);


/*********************************************TP3**************************************/
	this.place_of_board = [9, 3.9, 9.8];
	this.player_start_pt = [7.83,3.9,8.63];//7.83,3.9,8.63,9, 3.9, 9.8
	this.width_board = 2.6;
	this.player_number = 2;
	this.player = [];
	this.player_texture = [];
	this.player_chance = [];
	this.player_translate = [];
	this.player_undo = [];
	this.xyz = false;
	this.animation_started = false;
	this.snake_tail = [];
	this.snake_head = [];
	this.snake = [];
	this.ladder = [];
	this.ladder_head = [];
	this.ladder_tail = [];
	this.environment = false;
	this.difficulty_var = false;
	this.dice_select = false;

	this.player_undo.push(1000);


	this.snake_tail.push([0,this.player_start_pt[0]+0.26]);
	this.snake_head.push([2,this.player_start_pt[0]+3*0.26]);
	this.snake.push([0.74,1,this.player_start_pt[0]+2*0.26,0]);//first length, 2nd row number of mid block , 3rd x coord of mid block

	this.snake_tail.push([4,this.player_start_pt[0]]);
	this.snake_head.push([8,this.player_start_pt[0]+4*0.26]);
	this.snake.push([1.47,6,this.player_start_pt[0]+2*0.26,0]);

	this.snake_tail.push([1,this.player_start_pt[0]+9*0.26]);
	this.snake_head.push([5,this.player_start_pt[0]+5*0.26]);
	this.snake.push([1.47,3,this.player_start_pt[0]+7*0.26,1]);

	this.ladder_tail.push([0,this.player_start_pt[0]+5*0.26]);
	this.ladder_head.push([4,this.player_start_pt[0]+5*0.26]);
	this.ladder.push([1.04,2,this.player_start_pt[0]+5*0.26]);

	this.ladder_tail.push([5,this.player_start_pt[0]+2*0.26]);
	this.ladder_head.push([9,this.player_start_pt[0]+2*0.26]);
	this.ladder.push([1.04,7,this.player_start_pt[0]+2*0.26]);



	for(var i=0;i<this.player_number;i++)
	{
		this.player_translate.push([this.player_start_pt[0]-0.26,this.player_start_pt[1],this.player_start_pt[2]]);
		//this.player_undo.push(this.player_start_pt[0]-0.26,this.player_start_pt[1],this.player_start_pt[2],i);//last parameter for player id
	}
	

	for(var i=0;i<this.player_number;i++)
	{
		this.player_texture[i] = new CGFappearance(this);
		var str1 = "../resources/images/";
		var a = i.toString();
		var str2 = ".jpg";
		var str = str1.concat(a,str2);
    this.player_texture[i].loadTexture(str);
	}

	this.snake_texture = new CGFappearance(this);
	this.snake_texture.loadTexture("../resources/images/snake.jpg");

	this.ladder_texture = new CGFappearance(this);
	this.ladder_texture.loadTexture("../resources/images/ladder.png");

	this.dice_texture = new CGFappearance(this);
	this.dice_texture.loadTexture("../resources/images/dice.png");

	this.highlight_texture = new CGFappearance(this);
	this.highlight_texture.loadTexture("../resources/images/highlight.jpg");

	for(var i=0;i<this.player_number;i++)
		this.player[i] = new MyUnitCubeQuad(this); 


	this.player_chance.push(false);
	for(var i=1;i<this.player_number;i++)
		this.player_chance.push(false);

	this.player_chance[1] = true;

	
	this.dice = new MyUnitCubeQuad(this);
	this.undo = new MyUnitCubeQuad(this);
	this.movie = new MyUnitCubeQuad(this);
	this.difficulty = new MyUnitCubeQuad(this);
	this.base = new MyUnitCubeQuad(this);
	this.final_base = new MyUnitCubeQuad(this);
	this.back_base = new MyUnitCubeQuad(this);

	this.base_texture = new CGFappearance(this);
	this.base_texture.loadTexture("../resources/images/green.jpg");

	this.final_base_texture = new CGFappearance(this);
	this.final_base_texture.loadTexture("../resources/images/base.png");

	this.back_base_translate = this.player_start_pt;
	this.final_base_translate = this.player_start_pt;
	this.base_translate = this.player_start_pt;
	//this.dice2 = new MyUnitCubeQuad(this);



/*****************************************TP3******************************************************/
	this.setPickEnabled(true);
   this.setUpdatePeriod(10);
	
};

LightingScene.prototype.update = function(currTime) {
	this.final_clock.update(currTime);
	this.animate.refresh(currTime);
	this.CircularAnimation.refresh(currTime);
	if(this.dice_select==true)
	{
		this.dice_animation.refresh(currTime);
	}
	if(this.animation_started)
	{
		this.player_animate_start.refresh(currTime);
	}
};

/**********************TP2**********************
LightingScene.prototype.refresh = function(currTime)
{
	this.animate.refresh(currTime);
}
*************************TP2*********************/

LightingScene.prototype.initCameras = function() {
	this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(30, 30, 30), vec3.fromValues(0, 0, 0));

};

LightingScene.prototype.initLights = function() {
	this.setGlobalAmbientLight(0.5,0.5,0.5, 1.0);
	
	// Positions for four lights
	this.lights[0].setPosition(8, 6, 1, 1);
	this.lights[0].setVisible(true); // show marker on light position (different from enabled)

	
	this.lights[1].setPosition(10.5, 6.0, 1.0, 1.0);
	this.lights[1].setVisible(true); // show marker on light position (different from enabled)
    

    this.lights[2].setPosition(7.5,6.0,12.0,1.0);
    this.lights[2].setVisible(true);
    

    this.lights[3].setPosition(8,6,12,1);
    this.lights[3].setVisible(true);

	//this.lights[2].setPosition(10.5, 6.0, 5.0, 1.0);
	//this.lights[1].setVisible(true); // show marker on light position (different from enabled)
	//this.lights[3].setPosition(4, 6.0, 5.0, 1.0);
	//this.lights[1].setVisible(true); // show marker on light position (different from enabled)

	this.lights[0].setAmbient(0, 0, 0, 1);
	this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
	this.lights[0].enable();

	this.lights[1].setAmbient(0, 0, 0, 1);
	this.lights[1].setDiffuse(1.0, 1.0, 0.0, 1.0);
	this.lights[1].enable();


    this.lights[2].setAmbient(1,1,0,1);
    this.lights[2].setDiffuse(1.0,1.0,1.0,1.0);
 //this.lights[2].enable();

    this.lights[3].setAmbient(1,1,0,1);
    this.lights[3].setDiffuse(1.0,1.0,1.0,1.0);
  this.lights[3].enable();

};

LightingScene.prototype.updateLights = function() {
	for (i = 0; i < this.lights.length; i++)
		this.lights[i].update();
}

LightingScene.prototype.logPicking = function ()
{
	if (this.pickMode == false) {
		if (this.pickResults != null && this.pickResults.length > 0) {
			for (var i=0; i< this.pickResults.length; i++) {
				var obj = this.pickResults[i][0];
				if (obj)
				{
					var customId = this.pickResults[i][1];				
					console.log("Picked object: " + obj + ", with pick id " + customId);

					if(customId==1)
					{
/********/						this.dice_number = (Math.floor(Math.random()*10))%6+1;
						
						this.dice_animation = new linearAnimation(this,[0,0,0,0,2,0,0,0,-2,0,0,0],1);
						if(this.dice_select==false)
							this.camera.zoom(8);
						this.dice_select = true;
						
						this.player_play();
							var string1 = "../resources/images/dice_";
							var a_temp = this.dice_number.toString();
							var string2 = ".jpg";
							var string = string1.concat(a_temp,string2);
							this.slidesAppearance.loadTexture(string);
					}
					if(customId==2)
					{
						this.function_undo();
						console.log("nothing to do for now");
					}
					if(customId==3)
					{
						if(this.environment==false)
						this.environment = true;
						else
							this.environment=false;
					}
					if(customId==4)
					{
						if(this.difficulty_var==false)
						{this.difficulty_var=true;
						this.add_snakes();}
						else if(this.difficulty_var==true)
						{
							this.difficulty_var=false;
							this.remove_snakes();
						}
					}
				}
			}
			this.pickResults.splice(0,this.pickResults.length);
		}		
	}
}
/***********/
LightingScene.prototype.remove_snakes = function()
{
	for(var i=0;i<3;i++)
	{
	this.snake_tail.pop();
	this.snake_head.pop();
	this.snake.pop();
	}
};
/********************/
LightingScene.prototype.add_snakes = function()
{
	this.snake_tail.push([6,this.player_start_pt[0]+9*0.26]);
	this.snake_head.push([7,this.player_start_pt[0]+3*0.26]);
	this.snake.push([0.74,7,this.player_start_pt[0]+8*0.26,1]);//first length, 2nd row number of mid block , 3rd x coord of mid block

	this.snake_tail.push([5,this.player_start_pt[0]+8*0.26]);
	this.snake_head.push([9,this.player_start_pt[0]+4*0.26]);
	this.snake.push([1.47,7,this.player_start_pt[0]+6*0.26,1]);

	this.snake_tail.push([1,this.player_start_pt[0]]);
	this.snake_head.push([3,this.player_start_pt[0]+2*0.26]);
	this.snake.push([0.74,2,this.player_start_pt[0]+0.26,0]);
};
/**************************game movie*********************
LightingScene.prototype.function_movie = function()
{
	for(var i=0;i<this.player_undo.length/4;i++)
		{
			var id=this.player_undo.pop();
				if(id==1000)
				{
					window.alert("No more undo is possible now");
					return ;
				}
				this.player_translate[id][2]=this.player_undo.pop();
				this.player_translate[id][1]=this.player_undo.pop();
				this.player_translate[id][0]=this.player_undo.pop();
			
				this.player_chance[id]=true;
		
				}
};

*************************************undo function********************/
LightingScene.prototype.function_undo = function(){


	
	var id=this.player_undo.pop();
	if(id==1000)
	{
		window.alert("No more undo is possible");
		return ;
	}
	this.player_translate[id][2]=this.player_undo.pop();
	this.player_translate[id][1]=this.player_undo.pop();
	this.player_translate[id][0]=this.player_undo.pop();

	this.player_chance[id]=true;
	
};

/**************************translation calculation**************************/
LightingScene.prototype.player_play = function()
{
	/*for(var i=0;i<this.player_number;i++)
	{
		if(this.player_chance[i])
		{
			for(var j=0;j<3;j++)
			//this.player_translate[i][j] = ;
		}
	}*/
	///this.player_animate = [];
	for (var i=0;i<this.player_number;i++)
	{
		console.log(this.dice_number);
		if(this.player_chance[i]==true)
		{
			//this.player_animate.push(0,0,0);
			this.chance = i;

					
    		this.back_base_translate = [this.player_translate[i][0],this.player_translate[i][1],this.player_translate[i][2]];
			this.player_undo.push(this.player_translate[i][0],this.player_translate[i][1],this.player_translate[i][2],i);
			//var x = this.player_translate[i][0]+this.dice_number*0.26;
			console.log("playing player is: ");
			console.log(i);
			console.log("now")
			var row = Math.round((this.player_translate[i][2]-this.player_start_pt[2])/0.26);
			console.log(row);
			if(row == 0)
			{
				var x = this.player_translate[i][0]+this.dice_number*0.26;
				this.player_translate[i][0] = x;
				if(x>(this.player_start_pt[0]+2.6-0.13))
				{
					///this.player_animate.push();
					var excess_first = x  - (this.player_start_pt[0]+2.6-0.13);
					//console.log(excess_forward);
					this.player_translate[i][2]=this.player_translate[i][2]+0.26;
					///this.player_animate.push(this.player_start_pt[0]+2.6-0.13,this.player_translate[i][1],this.player_translate[i][2]);
					this.player_translate[i][0]=this.player_translate[i][0]-2*(excess_first);
				}
				///this.player_animate.push(this.player_translate[i][0],this.player_translate[i][1],this.player_translate[i][2]);
			}
			if(row % 2 == 0 && row != 0)
			{
				var y = this.player_translate[i][0]+this.dice_number*0.26;
				y=(Math.round(y*100.0))/100.0;
				this.player_translate[i][0] = y;
				if(y>(this.player_start_pt[0]+2.6-0.13))
				{
					var excess_forward = y  - (this.player_start_pt[0]+2.6-0.13);
					//console.log(excess_forward);
					this.player_translate[i][2]=this.player_translate[i][2]+0.26;
					this.player_translate[i][0]=this.player_translate[i][0]-2*(excess_forward/*-0.13*/);
				}
			}
			if(row%2 != 0)
			{
				var z = this.player_translate[i][0]-this.dice_number*0.26;
				z = Math.round(z*100)/100;
				if(row == 9 && z<(this.player_start_pt[0]))
				{
					console.log("invalid action");
					this.player_chance[i]==false;
					this.player_chance[((i+1)%this.player_number)]==true;
					continue;
				}
				this.player_translate[i][0] = z;
				if(z<(this.player_start_pt[0]))
				{
					var excess_backward = this.player_start_pt[0]-z;
					//console.log(excess_backward);
					this.player_translate[i][2]=this.player_translate[i][2]+0.26;
					this.player_translate[i][0]=this.player_translate[i][0]+2*(excess_backward-0.13);
				}
			}

			var num = this.snake.length;
			for(var j=0;j<num;j++)
			{
				var a = Math.round((this.player_start_pt[2]+0.26*this.snake_head[j][0])*100)/100;
				var b = Math.round(this.player_translate[i][0]*100)/100;
				var c = Math.round(this.player_translate[i][2]*100)/100;
				var d = Math.round(this.snake_head[j][1]*100)/100;

				if((b==d)&&(c==a))
						{

							console.log("i am in if ");
							this.player_translate[i][0]=this.snake_tail[j][1];
							this.player_translate[i][2]= this.player_start_pt[2]+0.26*this.snake_tail[j][0];
						}}

			var num1 = this.ladder.length;			
			for(var k=0;k<num1;k++)
			{
				var e = Math.round((this.player_start_pt[2]+0.26*this.ladder_tail[k][0])*100)/100;
				var f = Math.round(this.player_translate[i][0]*100)/100;
				var g = Math.round(this.player_translate[i][2]*100)/100;
				var h = Math.round(this.ladder_tail[k][1]*100)/100;

				if((e==g) && (f==h))
				{
					this.player_translate[i][0] = this.ladder_head[k][1];
					this.player_translate[i][2]= this.player_start_pt[2]+0.26*this.ladder_head[k][0];
				}
			}			
			console.log(b);
			console.log(c);

			if((this.player_translate[i][0]==this.player_start_pt[0]+0.26)&&(this.player_translate[i][2] == this.player_start_pt[2]+9*0.26))
			{
				window.alert("congratulations player "+(i+1)+" have won the game !!");
				this.t_end = new Date();
				window.alert("In time duration "+((this.t_end-this.t_start)/1000)+" seconds");
				//this.player_translate[i][0]=this.player_start_pt[0]+0.26;
				//this.player_translate[i][2]=this.player_start_pt[2]+9*0.26;
			}

			this.final_base_translate = [this.player_translate[i][0],this.player_translate[i][1],this.player_translate[i][2]];

		}
	}
	this.player_chance[this.chance]=false;
	var temp = (this.chance+1)%this.player_number;
	this.player_chance[temp]=true;
	this.base_translate = [this.player_translate[temp][0],this.player_translate[temp][1],this.player_translate[temp][2]];

					var string1 = "../resources/images/dice_";
					var a_temp = (temp+1).toString();
					var string2 = ".jpg";
					var string = string1.concat(a_temp,string2);
    				this.boardAppearance.loadTexture(string);

	
	this.function_animation();

};




LightingScene.prototype.function_animation = function(){
	this.invert = [];
	this.player_animate = [];
	//this.player_animate.push(0,0,0);
	//this.player_animate.push(0);
	//this.player_animate.push(2);
	//this.player_animate.push((2.6*5)+1.3,0,0);
	///this.player_animate.push(0,0,0);
	//this.player_animate.push(0,0,0);
	console.log("I am In animation function");
	var num = this.player_animate.length;
	/*for(var i =0;i<num;i++)
		{
			this.invert.push(this.player_animate.pop());
		}*/

		console.log("/***************/");
		console.log(this.player_animate);
		console.log("/*****************/");

	this.player_animate_start = new linearAnimation(this, this.player_animate, 20);


	this.animation_started = true;
	
};

/*************************************************************************************/
LightingScene.prototype.display = function() {


	this.logPicking();
	this.clearPickRegistration();
	// ---- BEGIN Background, camera and axis setup

	// Clear image and depth buffer everytime we update the scene
	this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
	this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

	// Initialize Model-View matrix as identity (no transformation)
	this.updateProjectionMatrix();
	this.loadIdentity();

	// Apply transformations corresponding to the camera position relative to the origin
	this.applyViewMatrix();

	// Update all lights used
	this.updateLights();

	// Draw axis
	this.axis.display();

	this.materialDefault.apply();

	// ---- END Background, camera and axis setup

	
	// ---- BEGIN Geometric transformation section

	// ---- END Geometric transformation section


	// ---- BEGIN Primitive drawing section

//this.pushMatrix();
//this.vehicle.display();
//this.popMatrix();


	

	//Cylinder
/*	this.pushMatrix();
		this.translate(7,7.7,0);
		//this.rotate(-90*degToRad,1,0,0);

		this.scale(1,1,0.2);
		this.cylinder.display();
	this.popMatrix();	*/

	

	//chessBoard
	this.pushMatrix();
	this.translate(this.place_of_board[0],this.place_of_board[1],this.place_of_board[2]);
	this.rotate(-90*degToRad,1,0,0);
	this.chess.display();
	this.popMatrix();

	//playerA
	for(var i=0;i<this.player_number;i++)
	{
		if(this.chance==i)
		{
			/*console.log("i am here with player's chance");
			console.log(this.chance);
			console.log("----------------");*/
			this.pushMatrix();
			//this.player_animate_start.change();
			this.translate(this.player_translate[i][0],this.player_translate[i][1],this.player_translate[i][2]);
			this.scale(0.1,1,0.1);
			
			this.player_texture[i].apply();
			this.player[i].display();
			this.popMatrix();
		}
		else {
		this.pushMatrix();
		this.translate(this.player_translate[i][0],this.player_translate[i][1],this.player_translate[i][2]);
		this.scale(0.1,0.5+i/10,0.1);
		this.player_texture[i].apply();
		this.player[i].display();
		this.popMatrix();
		}
	}
	

	


	// Floor
	this.pushMatrix();
		this.translate(7.5, 0, 7.5);
		this.rotate(-90 * degToRad, 1, 0, 0);
		this.scale(15, 15, 0.2);
		if(this.environment==false)
		this.floorAppearance.apply();
		else
			this.floorAppearance1.apply();
		this.floor.display();
	this.popMatrix();

	// Left Wall
	this.pushMatrix();
		this.translate(0, 4, 7.5);
		this.rotate(90 * degToRad, 0, 1, 0);
		this.scale(15, 8, 0.2);
		if(this.environment==false)
		{this.windowAppearance.apply();
		//this.windowAppearance.setTextureWrap('CLAMP_TO_EDGE','CLAMP_TO_EDGE');
		}
		else
			this.windowAppearance1.apply();
		//	//this.windowAppearance1.setTextureWrap('CLAMP_TO_EDGE','CLAMP_TO_EDGE');
	    
	this.leftwall.display();
		
   	this.popMatrix();

 /*  	this.pushMatrix();
		this.translate(0, 4, 7.5);
		this.rotate(-90 * degToRad, 0, 1, 0);
		this.scale(15, 8, 0.2);
		/*if(this.environment==false)
		{this.windowAppearance.apply();
		//this.windowAppearance.setTextureWrap('CLAMP_TO_EDGE','CLAMP_TO_EDGE');
		}
		else
			this.windowAppearance1.apply();
		//	//this.windowAppearance1.setTextureWrap('CLAMP_TO_EDGE','CLAMP_TO_EDGE');*/
//	this.rightwallAppearance.apply();
//	this.rightwall.display();
		
//   	this.popMatrix();



	// Plane Wall
	this.pushMatrix();
		this.translate(7.5, 4, 0);
		this.scale(15, 8, 0.2);
	//	this.materialDefault.apply();
		if(this.environment==false)
	this.rightwallAppearance.apply();
		else
			this.rightwallAppearance1.apply();
		this.wall.display();
	this.popMatrix();


	// Second Table
	/*this.pushMatrix();
		this.translate(12-5+1, 0, 8);
		//this.CircularAnimation.apply();

		this.table.display();
	this.popMatrix();*/

	
	//table
	this.pushMatrix();
		this.translate(5, 0, 8);
		this.scale(1.3,1,1.3);
		this.table.display();
	this.popMatrix();


	// Board A
	this.pushMatrix();
		//this.translate(4, 4.5, 0.2);
		this.translate(4,0.5,4);
		this.scale(BOARD_WIDTH*0.5, BOARD_HEIGHT*0.5, 2);
		this.rotate(-90*degToRad,1,0,0);
		this.materialA.apply();
		this.slidesAppearance.apply();
		this.boardA.display();
	this.popMatrix();

	// Board B
	this.pushMatrix();
		//this.translate(10.5, 4.5, 0.2);
		this.translate(10.5,0.5,4);
		this.scale(BOARD_WIDTH*0.5, BOARD_HEIGHT*0.5, 2);
		this.rotate(-90*degToRad,1,0,0);
		this.materialB.apply();
		this.boardAppearance.apply();
		this.boardB.display();
	this.popMatrix();


	


	//Clock's Top
	/*this.pushMatrix()
		this.translate(7,7.7,0.2);
		this.clockAppearance.apply();
		//this.CircularAnimation.apply();
		this.clock.display();
	this.popMatrix();*/


	/*this.pushMatrix();
	this.translate(7,7.7,0.2);
	this.scale(1,1,1);
	this.clockHand.display();
	this.popMatrix();*/
	


	//clock
	this.pushMatrix();
	this.translate(7,7.7,0);
	//this.animate.change();
	this.final_clock.display();
	this.popMatrix();
	


	/*this.pushMatrix();
	//this.translate(6,6,4);
	this.PlaneSurface.display();
	this.popMatrix();*/

	/*this.pushMatrix();
	//this.translate(4,4,4);
	//this.CircularAnimation.apply();
	this.patch.display();
	this.popMatrix();*/


	//Boat
	/*this.pushMatrix();
	//this.rotate(180*degToRad,1,0,0);
	this.translate(5,-3,2);
	this.scale(0.7,0.9,1);
	this.boatAppearance.apply();
	this.CircularAnimation.apply();
	this.boat.display();
	this.popMatrix();*/

	


	//dice 
	this.pushMatrix();
	this.translate(this.place_of_board[0]-1.8,this.place_of_board[1]+0.15,this.place_of_board[2]);
	if(this.dice_select==false)
	this.scale(0.3,0.3,0.3);
	else
		this.scale(0.5,0.5,0.5)
	this.registerForPick(1,this.dice);
	this.dice_texture.apply();
	if(this.dice_select==true)
		this.dice_animation.change();
	this.dice.display();
	this.popMatrix();

/*	this.pushMatrix();
	this.snake_texture.apply();
	this.scale(0.01,0.01,0.01);
	this.cylinder.display();
	this.popMatrix();
*/
	//snakes 
	for(var i=0;i<this.snake.length;i++)
	{
		this.pushMatrix();
		
		this.translate(this.snake[i][2],this.player_start_pt[1],this.player_start_pt[2]+0.26*this.snake[i][1]);
		if(this.snake[i][3]==0)
		this.rotate(45*degToRad,0,1,0);
		else
		this.rotate(-45*degToRad,0,1,0);
		this.scale(0.1,0.1,this.snake[i][0]);
		this.snake_texture.setTextureWrap('CLAMP_TO_EDGE','CLAMP_TO_EDGE');
		this.snake_texture.apply();
		this.dice.display();
		this.popMatrix();
	}


	//snakes 
	for(var i=0;i<this.ladder.length;i++)
	{
		this.pushMatrix();
		
		this.translate(this.ladder[i][2],this.player_start_pt[1],this.player_start_pt[2]+0.26*this.ladder[i][1]);
		this.scale(0.1,0.1,this.ladder[i][0]);
		this.ladder_texture.setTextureWrap('CLAMP_TO_EDGE','CLAMP_TO_EDGE');
		this.ladder_texture.apply();
		this.dice.display();
		this.popMatrix();
	}


	this.pushMatrix();
	this.translate(9+2, 3.9, 9.8+1.5);
	this.scale(0.8,0.2,0.8);
	this.registerForPick(2,this.undo);
	this.undoAppearance.apply();
	this.undo.display();
	this.popMatrix();

//environment
	this.pushMatrix();
	this.translate(11,3.9,9.8-1.2);
	this.scale(0.8,0.2,0.8);
	this.registerForPick(3,this.movie);
	this.envAppearance.apply();
	this.movie.display();
	this.popMatrix();

//difficulty
	this.pushMatrix();
	this.translate(11,3.9,9.8);
	this.scale(0.8,0.2,0.8);
	this.registerForPick(4,this.difficulty);
	this.difficultyAppearance.apply();
	this.difficulty.display();
	this.popMatrix();

//Base
	this.pushMatrix();
	this.translate(this.base_translate[0],this.base_translate[1],this.base_translate[2]);
	this.scale(0.26,0.01,0.26);
	this.base_texture.apply();
	this.base.display();
	this.popMatrix();	

	this.pushMatrix();
	this.translate(this.final_base_translate[0],this.final_base_translate[1],this.final_base_translate[2]);
	this.scale(0.26,0.01,0.26);
	this.final_base_texture.apply();
	this.final_base.display();
	this.popMatrix();

	this.pushMatrix();
	this.translate(this.back_base_translate[0],this.back_base_translate[1],this.back_base_translate[2]);
	this.scale(0.26,0.01,0.26);
	this.final_base_texture.apply();
	this.final_base.display();
	this.popMatrix();	

	// ---- END Primitive drawing section
};
