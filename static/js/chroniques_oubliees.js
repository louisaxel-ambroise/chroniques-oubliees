function communaute($scope){
  $scope.addPlayer = function(){
	if($scope.playerName && $scope.playerRace && $scope.playerSex && $scope.playerProfil){
		var player = {
			name: $scope.playerName, 
			race: $scope.playerRace, 
			sex: $scope.playerSex, 
			profil: $scope.playerProfil,
			age: $scope.playerAge,
			weight: $scope.playerWeight,
			height: $scope.playerHeight,
			caracteristics: [
				{ key:"for", value:0 },
				{ key:"dex", value:0 },
				{ key:"con", value:0 },
				{ key:"sag", value:0 },
				{ key:"cha", value:0 },
				{ key:"int", value:0 }
			],
			init:0,
			combat:[
				{key:"contact", value:0 },
				{key:"distance", value:0 },
				{key:"magique", value:0 },
				{key:"défense", value:0 }
			],
			weapons: []
		};
		$scope.players.push(player);
		$scope.playerName = "";
		$scope.playerAge = 1;
		$scope.playerWeight = 1;
		$scope.playerHeight = 50;
	}
  };

  $scope.export = function(){
    var dataObj = JSON.parse(JSON.stringify($scope.players));
    // TODO: delete $alite_id values?

    var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify($scope.players));
    var dlAnchorElem = document.getElementById('downloadLink');
    dlAnchorElem.setAttribute("href", dataStr);
    dlAnchorElem.setAttribute("download", "game.json");
    dlAnchorElem.click();
  }

  $scope.prepareId = function(id){
    $scope.selectedId = id;
  }

  $scope.deleteUser = function(){
    if($scope.playerName && $scope.playerName.toLowerCase() === $scope.players[$scope.selectedId].name.toLowerCase()){
      $scope.players.splice($scope.selectedId,1);
    }
    $scope.selectedId = undefined;
    $scope.playerName = "";
  }

  $scope.addWeapon = function(player){
     player.weapons.push({ desc:"", attaque:0, damage:0, damage_de:0});
  }

  $scope.deleteWeapon = function(player, index){
    player.weapons.splice(index, 1);
  }

  $scope.loadFile = function(){
    var file = document.getElementById('fileName-input').files[0];

    if(file){
        var reader = new FileReader();
        reader.readAsText(file, "UTF-8");
        reader.onload = function(e){ 
          $scope.players = JSON.parse(e.target.result);
          $scope.fileName = '';
          $scope.$scan();
      };
    }
  }

  $scope.selectedId = undefined;
  $scope.players = [ ];
  $scope.playerName = "";
  $scope.playerRace = "";
  $scope.playerSex = "";
  $scope.playerProfil = "";
  $scope.playerAge = 1;
  $scope.playerWeight = 1;
  $scope.playerHeight = 50;

  $scope.races = [
    {name:"Demi-elfe"},
    {name:"Demi-orque"},
    {name:"Elfe-haut"},
    {name:"Elfe-sylvain"},
    {name:"Gnome"},
    {name:"Halfelin"},
    {name:"Humain"},
    {name:"Nain"}
  ];
  $scope.profils = [
    {name:"Arquebusier"},
    {name:"Barbare"},
    {name:"Barde"},
    {name:"Chevalier"},
    {name:"Druide"},
    {name:"Ensorceleur"},
    {name:"Forgesort"},
    {name:"Guerrier"},
    {name:"Magicien"},
    {name:"Moine"},
    {name:"Nécromancien"},
    {name:"Prêtre"},
    {name:"Rôdeur"},
    {name:"Voleur"}
  ];
  
  $scope.damage_de = [
    {id:1, value:"1d4"},
    {id:2, value:"1d6"},
    {id:3, value:"1d8"},
    {id:4, value:"1d12"},
    {id:5, value:"1d20"},
    {id:6, value:"2d4"},
    {id:7, value:"2d6"},
    {id:8, value:"2d8"},
    {id:9, value:"2d12"},
    {id:10, value:"2d20"}
  ];
};

function toggleMenu(){
	var value = window.getComputedStyle(document.getElementById("app-menu")).getPropertyValue("display");
	if(value === "none"){
		document.getElementById("app-menu").style.display = "block";
		document.getElementById("menuToggle").classList.remove("btn-menu");
		document.getElementById("menuToggle").classList.add("btn-menu-opened");
	}
	else{
		document.getElementById("app-menu").style.display = "none";
		document.getElementById("menuToggle").classList.remove("btn-menu-opened");
		document.getElementById("menuToggle").classList.add("btn-menu");
	}
}

function closeMenu(){
	document.getElementById("app-menu").style.display = "none";
	document.getElementById("menuToggle").classList.remove("btn-menu-opened");
	document.getElementById("menuToggle").classList.add("btn-menu");
}

function openModal(modalId, fieldToFocus){
	closeMenu();
	document.getElementById(modalId).style.display = "block";
	if(fieldToFocus) document.getElementById(fieldToFocus).click();
}

function closeModal(){
	var modals = document.getElementsByClassName("modal-container");
	for(var i=0 ; i<modals.length ; i++) modals[i].style.display = "none";
}

function deletePlayer(index){
	closeMenu();
	document.getElementById("delete-player-modal").style.display = "block";
	document.getElementById("userName-delete-input").focus();
}

/* Extend alight - add directive for selected option value */
alight.directives.al.selected = function(element, name, scope, env) {  // DOM-element, name - value of attribute, Scope, env - access to aLight processor
    if(scope.$eval(scope.$evalText(name))){
	element.selected = true;
    }
};