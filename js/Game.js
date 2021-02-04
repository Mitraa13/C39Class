class Game {
    constructor(){}
  
    getState(){
      var gameStateRef  = database.ref('gameState');
      gameStateRef.on("value",function(data){
         gameState = data.val();
      })
  
    }
  
    update(state){
      database.ref('/').update({
        gameState: state
      });
    }
  
    async start(){
      if(gameState === 0){
        //text("MouseX:"+mouseX,displayWidth/2-350,displayHeight/2-300);
        player = new Player();
        var playerCountRef = await database.ref('playerCount').once("value");
        if(playerCountRef.exists()){
          playerCount = playerCountRef.val();
          player.getCount();
        }
        form = new Form()
        form.display();
      }
      car1 = createSprite(100,200);
      car1.addImage(car1img);
      car2 = createSprite(300,200);
      car2.addImage(car2img);
      car3 = createSprite(500,200);
      car3.addImage(car3img);
      car4 = createSprite(700,200);
      car4.addImage(car4img);
      cars = [car1,car2,car3,car4];
    }
  
    play(){
      form.hide();
      textSize(30);
      text("Game Start", 120, 100)
      Player.getPlayerInfo();
      player.getCarsAtEnd();
  
      if(allPlayers !== undefined){
        background(200,200,225);
        image(trackimg,0,-displayHeight*4,displayWidth,displayHeight*5);
        //var display_position = 130;
        var index = 0;
        var x = 175;
        var y;
        for(var plr in allPlayers){
          index = index+1;
          x = x+200;
          y = displayHeight-allPlayers[plr].distance;
          cars[index-1].x=x
          cars[index-1].y=y;
          if(index === player.index){
            stroke(10);
            fill("red");
            ellipse(x,y,60);
            cars[index-1].shapeColor="red";
            camera.position.x=displayWidth/2;
            camera.position.y=cars[index-1].y
          }
          textAlign(CENTER);
          textSize(20);
          text(allPlayers[plr].name,cars[index-1].x,cars[index-1].y+75);
        }
      }
  
      if(keyIsDown(UP_ARROW) && player.index !== null){
        player.distance +=50
        player.update();
      }  
      if(keyIsDown(LEFT_ARROW) && player.index !== null){
        cars[index-1].x -=10
      }  
      if(keyIsDown(RIGHT_ARROW) && player.index !== null){
        cars[index-1].x +=10
      }

      if(player.distance>3650){
        gameState=2;
        player.rank++
        Player.updateCarsAtEnd(player.rank);
      }
      
      drawSprites();

    }

    end(){
      console.log("Game Ended");
      console.log(gameState);
      console.log(player.rank);
      var endmsg = createElement("h1");
      endmsg.position(displayWidth/2-325,displayHeight/2-300);
      endmsg.html("Congratulations You Won!!!");
      var endmsg1 = createElement("h2");
      endmsg1.position(displayWidth/2-250,displayHeight/2-200);
      endmsg1.html(player.name+" "+"Are on Position"+" "+player.rank);
    }

  }
 