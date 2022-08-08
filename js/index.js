//canvas
const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 1280
canvas.height = 728

c.fillStyle = 'white';
c.fillRect(0, 0, canvas.width, canvas.height);

//Load background
const image = new Image()
image.onload = () => {
	c.drawImage(image, 0, 0);
}
image.src = 'img/map.png'


class Enemy {
	constructor({ position = {x: 0, y:0 }}){
		this.position = position;
		this.width = 64
		this.height = 64
		this.waypointIndex = 0
		this.center = {
			x: this.position.x + this.width / 2,
			y: this.position.y + this.height / 2
		}
	}

	draw(){
		c.fillStyle = 'red';
		c.fillRect(this.position.x, this.position.y, this.width, this.height);
	}

	update(){
		this.draw();		

		const waypoint = waypoints[this.waypointIndex];
		const yDistance = waypoint.y - this.center.y;
		const xDistance = waypoint.x - this.center.x;
		const angle = Math.atan2(yDistance, xDistance);
		this.position.x +=Math.cos(angle);
		this.position.y +=Math.sin(angle);
		this.center = {
			x: this.position.x + this.width / 2,
			y: this.position.y + this.height / 2
		}



		if (
			Math.round(this.center.x) === waypoint.x && 
			Math.round(this.center.y) === waypoint.y &&
			this.waypointIndex < waypoints.length - 1) 
		{
			this.waypointIndex++
		}

	}
}

const enemies = [];
for (let i = 1; i < 11; i++){
	const xOffset = i * 96
	enemies.push (
		new Enemy({
		position: { x: waypoints[0].x - xOffset, y: waypoints[0].y }
	})
	)
}

function animate(){
	requestAnimationFrame(animate);

	c.drawImage(image, 0, 0);
	enemies.forEach(enemy => {
		enemy.update();
	})	
}

animate();

