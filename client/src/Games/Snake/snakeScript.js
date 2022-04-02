// Create Canvas
var canvas = document.createElement("canvas");

// Get Context
var ctx = canvas.getContext('2d');

// Function For Canvas Settings
export function createCanvas (width, height, backgroundColor, element) 
{
	// Set Canvas size
	canvas.width = width;
	canvas.height = height;
	element?.current.appendChild(canvas)

	// Fill Canvas
	canvas.style.backgroundColor = backgroundColor;
}

// Class Snake
export class SnakeGame
{
	// Snake Settings
	constructor(snakeWidth, snakeHeight, snakeSpeed, snakeColor, tailColor, childDistance, childSpeed)
	{
		this.width = snakeWidth;
		this.height = snakeHeight;
		this.speed = Math.floor(snakeSpeed / 60);
		this.snakeColor = snakeColor;
		this.x = canvas.width / 2 - (this.width / 2);
		this.y = canvas.height / 2 - (this.height / 2);
		this.xspeed = 0;
		this.yspeed = 0;
		this.applex = Math.floor((Math.random() * (canvas.width - this.width)) / this.width) * this.width;
		this.appley = Math.floor((Math.random() * (canvas.width - this.width)) / this.width) * this.width;
		this.score = 0;
		this.childs = [];
		this.lastPos = [];
		this.childDistance = childDistance;
		this.gameOver = false;
		this.goHorizontal = false;
		this.goVertical = false;
		this.goLeft = false;
		this.goRight = false;
		this.goTop = false;
		this.gotBottom = false;
		this.lastY = -1;
		this.lastX = -1;
        this.tailColor = tailColor;
		this.dontPlay = false;
		this.animationId = null;
		this.childSpeed = childSpeed;
	}

	start()
	{
		
		document.body.addEventListener("keydown", e => this.changeDirection(e))
		ctx.fillStyle = this.snakeColor;
		requestAnimationFrame(this.game.bind(this));
	}

	changeDirection(event)
	{
		if ((event.key.toLowerCase() == "a" || event.key.toLowerCase() == "arrowleft") && this.xspeed == 0) 
		{
			this.goHorizontal = true;
			this.goVertical = false;
			this.goLeft = true;
			this.goRight = false;
			this.goTop = false;
			this.gotBottom = false;
			this.lastY = this.y
			this.lastX = this.x
		}
		else if ((event.key.toLowerCase() == "d" || event.key.toLowerCase() == "arrowright") && this.xspeed == 0) 
		{
			this.goHorizontal = true;
			this.goVertical = false;
			this.goLeft = false;
			this.goRight = true;
			this.goTop = false;
			this.gotBottom = false;
			this.lastY = this.y
			this.lastX = this.x
		}
		else if ((event.key.toLowerCase() == "w" || event.key.toLowerCase() == "arrowup") && this.yspeed == 0) 
		{
			this.goHorizontal = false;
			this.goVertical = true;
			this.goLeft = false;
			this.goRight = false;
			this.goTop = true;
			this.gotBottom = false;
			this.lastY = this.y
			this.lastX = this.x
		}
		else if ((event.key.toLowerCase() == "s" || event.key.toLowerCase() == "arrowdown") && this.yspeed == 0) 
		{
			this.goHorizontal = false;
			this.goVertical = true;
			this.goLeft = false;
			this.goRight = false;
			this.goTop = false;
			this.gotBottom = true;
			this.lastY = this.y
			this.lastX = this.x
		}
	}

	appleSpawn()
	{
		ctx.fillStyle = "#D90368";
		ctx.fillRect(this.applex, this.appley, this.width, this.height)
		ctx.fill();
	}

	changeApple()
	{
		this.score++;
		document.getElementById("score").innerHTML = "Your Score: " + this.score;
		this.applex = Math.floor((Math.random() * (canvas.width - this.width)) / this.width) * this.width;
		this.appley = Math.floor((Math.random() * (canvas.height - this.height)) / this.width) * this.width;
	}

	clear()
	{
		ctx.fillStyle = "#303841";
		ctx.fillRect(0, 0, canvas.width, canvas.height)
		ctx.fill();
	}

	teleport()
	{
		if (this.x + (this.width / 2) > canvas.width) 
		{
			this.x = 0 - (this.width / 2);
		}
		else if (this.x < 0 - this.width / 2) 
		{
			this.x = canvas.width - (this.width / 2);
		}
		else if (this.y < 0 - this.height / 2) 
		{
			this.y = canvas.width - (this.height / 2);
		}
		else if (this.y > canvas.height - (this.height / 2)) 
		{
			this.y = 0 - (this.height / 2);
		}
	}

	move()
	{
		this.x += this.xspeed;
		this.y += this.yspeed;
	}

	appleCollider()
	{
		if (this.x + this.width > this.applex && this.x < this.applex + this.width && this.y + this.height > this.appley && this.y < this.appley + this.height) 
		{
			this.changeApple()
		}
	}

	restart()
	{
		document.querySelector(".restart").classList.remove("active");
	}

	drawSnake()
	{	
		if(this.goHorizontal && (this.y >= Math.ceil((this.lastY) / this.width) * this.width || this.y <= Math.ceil((this.lastY) / this.width) * this.width - this.width))
		{
			if(this.yspeed > 0)
			{
				this.y = Math.floor(this.y / this.width) * this.width;
			}
			else if(this.y !== Math.floor(this.y / this.width) * this.width)
			{
				this.y = Math.ceil(this.y / this.width) * this.width;
			}
			this.yspeed = 0;
			if(this.goRight)
			{
				this.xspeed = 1 * this.speed;
			}
			else
			{
				this.xspeed = -1 * this.speed;
			}
			this.goHorizontal = false;
		}

		else if(this.goVertical && (this.x >= Math.ceil((this.lastX) / this.width) * this.width || this.x <= Math.ceil((this.lastX) / this.width) * this.width - this.width))
		{
			if(this.xspeed > 0)
			{
				this.x = Math.floor(this.x / this.width) * this.width;
			}
			else if(this.x !== Math.floor(this.x / this.width) * this.width)
			{
				this.x = Math.ceil(this.x / this.width) * this.width;
			}
			this.xspeed = 0;
			if(this.goTop)
			{
				this.yspeed = -1 * this.speed;
			}
			else
			{
				this.yspeed = 1 * this.speed;
			}
			this.goVertical = false;
		}
		for (let i = 0; i < this.childs.length; i++) 
		{
			ctx.fillStyle = this.tailColor;
            if(i < 30)
            {
                const rColor = Math.floor(i / this.width * 255);
                const hexColor = rColor.toString(16).length === 1 ? "0" + rColor.toString(16) : rColor.toString(16)
			    ctx.fillStyle = this.tailColor + hexColor
            }
			else if(i > this.childs.length - 31)
			{
			}
			ctx.fillRect(this.childs[i]?.x, this.childs[i]?.y, this.width, this.height);
			ctx.fill();
		}
		ctx.fillStyle = this.snakeColor;
		console.log(this.x, this.y);
		ctx.fillRect(this.x, this.y, this.width, this.height);
		ctx.fill();
	}

	childPosition()
	{
		this.lastPos.push({
			x: this.x,
			y: this.y
		})
		if (this.lastPos.length > this.childDistance * this.score) 
		{
			this.lastPos.shift();
		}
		this.childs = [];
		if (this.score != this.childs.length) 
		{
			for (let i = 0; i <= this.lastPos.length; i += this.childSpeed) 
			{
				this.childs.push({ ...this.lastPos[i] })
			}
		}
	}

	endGame()
	{
		this.dontPlay = true;
	}

	game()
	{
		if (!this.gameOver) 
		{
			this.move();
			this.teleport();
			this.clear();
			this.appleSpawn();
			this.appleCollider();
			this.drawSnake();
			this.childPosition();
		}
		cancelAnimationFrame(this.animationId);
		if(!this.dontPlay)
		{
			this.animationId = requestAnimationFrame(this.game.bind(this));
		}
	}
}


// this.gameOver = true;
// setTimeout(() => 
// {
// 	document.querySelector(".restart").classList.add("active");
// }, 700);