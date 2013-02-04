goog.require('goog.array');

angular.module('Resistance', []).filter('selectable', function() {
 	      return function(roleCards) {
		  var result = {};
		  for (role in roleCards) {
		      if (roleCards[role].selectable) {
			  result[role] = roleCards[role];
		      }
		  }
		  return result;
	      };
	  });

function ResistanceCtrl($scope, $filter) {
  var commonEvilKnowledge = {
    'mordred': 'spy',
    'morgana': 'spy',
    'assassin': 'spy',
    'spy1': 'spy',
    'spy2': 'spy',
    'spy3': 'spy'
  };
  var townDisplayName = 'A Loyal Servant of Arthur';
  var spyDisplayName = 'A Minion of Mordred';

  $scope.roleCards = {
    'merlin': {
      displayName: 'Merlin',
      selected: false,
      selectable: true,
      side: 'good',
      knowledge: {
        'assassin': 'spy',
        'morgana': 'spy',
        'oberon': 'spy',
        'spy1': 'spy',
        'spy2': 'spy',
        'spy3': 'spy',
        'spy4': 'spy'
      }
    },
    'percival': {
      displayName: 'Percival',
      selected: false,
      selectable: true,
      side: 'good',
      knowledge: {
        'merlin': 'merlin',
        'morgana': 'merlin'
      }
    },

    'town1': {
      displayName: townDisplayName,
      side: 'good',
      knowledge: {}
    },
    'town2': {
      displayName: townDisplayName,
      side: 'good',
      knowledge: {}
    },
    'town3': {
      displayName: townDisplayName,
      side: 'good',
      knowledge: {}
    },
    'town4': {
      displayName: townDisplayName,
      side: 'good',
      knowledge: {}
    },
    'town5': {
      displayName: townDisplayName,
      side: 'good',
      knowledge: {}
    },
    'town6': {
      displayName: townDisplayName,
      side: 'good',
      knowledge: {}
    },

    'mordred': {
      displayName: 'Mordred',
      selected: true,
      selectable: true,
      side: 'evil',
      knowledge: commonEvilKnowledge
    },
    'morgana': {
      displayName: 'Morgana',
      selected: false,
      selectable: true,
      side: 'evil',
      knowledge: commonEvilKnowledge
    },
    'oberon': {
      displayName: 'Oberon',
      selected: false,
      selectable: true,
      side: 'evil',
      knowledge: {}
    },
    'assassin': {
      displayName: 'The Assasssin',
      selected: false,
      selectable: true,
      side: 'evil',
      knowledge: commonEvilKnowledge
    },

    'spy1': {
      displayName: spyDisplayName,
      side: 'evil',
      knowledge: commonEvilKnowledge
    },
    'spy2': {
      displayName: spyDisplayName,
      side: 'evil',
      knowledge: commonEvilKnowledge
    },
    'spy3': {
      displayName: spyDisplayName,
      side: 'evil',
      knowledge: commonEvilKnowledge
    },
    'spy4': {
      displayName: spyDisplayName,
      side: 'evil',
      knowledge: commonEvilKnowledge
    }
  };

  $scope.updateParticipants = function() {
    $scope.participants = gapi.hangout.getParticipants();
  };

  $scope.newGame = function() {
    //$scope.participants = gapi.hangout.getParticipants();
    $scope.participants = [1,2,3,4,5,6,7,8,9,10].slice(0, $scope.numPlayers);

    // error if participants.length not in [5, 10] or more evil
    // enabled than evil allowed
    var evilCount = {2: 1, 3: 1, 4: 1, 5: 2, 6: 2, 7: 3, 8: 3, 9: 3, 10: 4}[
	$scope.participants.length];
    var goodCount = $scope.participants.length - evilCount;
    var activeRoles = [], card;

    for (role in $scope.roleCards) {
      console.log(role);
      card = $scope.roleCards[role];
	    if (card.selected) {
        activeRoles.push(role);
        if (card.side == 'evil') {
          evilCount -= 1;
        } else {
          goodCount -= 1;
        }
      }
    }

    for (role in $scope.roleCards) {
      card = $scope.roleCards[role];
      console.log(role, evilCount, typeof card.selected, card.side);
      if (evilCount > 0 && card.side == 'evil' && !card.selectable) {
        evilCount -= 1;
        activeRoles.push(role);
      }
      if (goodCount > 0 && card.side == 'good' && !card.selectable) {
        goodCount -= 1;
        activeRoles.push(role);
      }
    }

    goog.array.shuffle(activeRoles);
  	var roles = {};
  	for (var i = 0; i < activeRoles.length; i++) {
  	  roles[activeRoles[i]] = $scope.participants[i].id;
      roles[$scope.participants[i].id] = activeRoles[i];
    }
    $scope.roles = roles;

    //debug
    console.log(activeRoles);
    $scope.activeRoles = activeRoles;
  };

  $scope.sees = function(role) {
      var card = $scope.roleCards[role];
      var result = [];
      for (otherRole in $scope.roles) {
	  if (otherRole == role) {
	      result.push('self');
	  } else if (otherRole in card.knowledge) {
	      result.push(card.knowledge[otherRole]);
	  } else {
	      result.push('');
	  }
      }
      return result;
  };

  $scope.makeMeGood = function() {
    gapi.hangout.av.setAvatar(gapi.hangout.getParticipants()[0].id, 
                              'http://connett.net/steamstatus/ingame.png');
  };
}
