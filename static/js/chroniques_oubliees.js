function communaute(scope){
  scope.addPlayer = function(){
	if(scope.playerName && scope.playerRace && scope.playerSex && scope.playerProfil){
		var player = {
			name: scope.playerName, 
			race: scope.playerRace, 
			sex: scope.playerSex, 
			profil: scope.playerProfil,
			caracteristics: [
				{ key:"for", value:0 },
				{ key:"dex", value:0 },
				{ key:"con", value:0 },
				{ key:"sag", value:0 },
				{ key:"cha", value:0 },
				{ key:"int", value:0 }
			],
			combat:[
				{key:"init", value:0 },
				{key:"attaque", value:0 },
				{key:"distance", value:0 },
				{key:"magique", value:0 }
			],
			weapons: []
		};
		scope.players.push(player);
		scope.playerName = "";
	}
  };

  scope.export = function(){
    var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(scope.players));
var dlAnchorElem = document.getElementById('downloadLink');
dlAnchorElem.setAttribute("href",     dataStr     );
dlAnchorElem.setAttribute("download", "game.json");
dlAnchorElem.click();
  }

  scope.loadFile = function(){
    var file = document.getElementById('fileName-input').files[0];

    if(file){
        var reader = new FileReader();
        reader.readAsText(file, "UTF-8");
        reader.onload = function(e){ 
          scope.players = JSON.parse(e.target.result);
          scope.fileName = '';
          scope.$scan();
      };
    }
  }

  scope.players = [ ];
  scope.playerName = "";
  scope.playerRace = "";
  scope.playerSex = "";
  scope.playerProfil = "";
};