// on click function, user click remain on user character div, other move to available enemies.
$(document).ready(function() {
  //create a array of an object of each enemies for user to choose.
  var avilableChar = [
    {
      name: 'skywalker',
      hp: 150,
      attackPower: 15
    },
    {
      name: 'chewbace',
      hp: 120,
      attackPower: 30
    },
    {
      name: 'darklord',
      hp: 200,
      attackPower: 20
    },
    {
      name: 'white',
      hp: 150,
      attackPower: 10
    }
  ];
  // available enemy to fight
  var avilableEnamy = [];
  var userChoose;
  var defender;

  // on click of any enemies
  $('.card').on('click', function() {
    //if available enemy to fight has not show
    if (avilableEnamy.length === 0) {
      //userchoose = the id of click in card div group i.e id="skywalker" id="chewbace"   id="darklord" and set it to groble variable
      userChoose = $(this).attr('id');
      //append user chose all element to the #user-char element
      $('#User-Char').append($(this));

      // find out the unpick characters and make it become available enemies
      for (var i = 0; i < avilableChar.length; i++) {
        // if user choose not equal to loop of available char
        if (userChoose !== avilableChar[i].name) {
          //append all the avilable enemy chr to avilable attack html element
          $('#' + avilableChar[i].name).appendTo('#Avilable-Attack');
          //add css style to red
          $('#' + avilableChar[i].name).css('background-color', '#ff0000');
          //store the array of available enemy to the globe variable
          avilableEnamy.push(avilableChar[i].name);
        }
      } // else if defender not equal to undefined i.e defender have chosen, do nothing
    } else if (defender !== undefined) {
    } else {
      if ($(this).attr('id') !== userChoose) {
        //else defender equal to the second click element
        defender = $(this).attr('id');
        //append the second click element to defender html element
        $('#Defender').append($(this));
        //add css style to defender element
        $(this).css({ 'background-color': 'black', color: 'white' });
      }
    }
  });

  //make a function to find whats the char that been click
  function charFinder(name) {
    for (var i = 0; i < avilableChar.length; i++) {
      if (name === avilableChar[i].name) {
        return avilableChar[i];
      }
    }
  }

  //click attack function
  $('#attack-btn').on('click', function() {
    //find the object of user choose character
    var userChooseObject = charFinder(userChoose);
    var defenderObject = charFinder(defender);
    //create random number to add to attack point
    var userrandomNum = Math.floor(Math.random() * 20 + 1);
    var defenderrandomNum = Math.floor(Math.random() * 20 + 1);
    // variable for attack point
    var userAttackPW = userChooseObject.attackPower + userrandomNum;
    var defenderAttackPW = defenderObject.attackPower + defenderrandomNum;

    // renew user hp every time the attack click btn happen
    if (userChooseObject.hp !== 0 && defenderObject.hp !== 0) {
      userChooseObject.hp = Math.max(0, userChooseObject.hp - defenderAttackPW);
      $('#' + userChooseObject.name + '_HP').text(userChooseObject.hp);

      defenderObject.hp = Math.max(0, defenderObject.hp - userAttackPW);
      $('#' + defenderObject.name + '_HP').text(defenderObject.hp);
    }

    //if user char hp bigger than 0 and defender is bigger than 0
    if (userChooseObject.hp > 0 && defenderObject.hp > 0) {
      // add html element to result element, the name of defender and the number attack point of user
      $('#Result').html(
        '<p>You attacked ' +
          defenderObject.name +
          ' for ' +
          userAttackPW +
          ' damage</p>' +
          `<p>${defenderObject.name} attacked you back for ${defenderAttackPW} damage</p>`
      );

      // if user char hp smaller or equal to 0, add to the result html add reset button and reset function
    } else if (userChooseObject.hp <= 0) {
      $('#Result').html('<p>You loss, Reset!</p>');
      var resetBtn = $('<button>');
      resetBtn.text('Reset');
      $('#Result').append(resetBtn);
      resetBtn.on('click', function() {
        location.reload();
      });
    } else {
      // if enemy loss, allow to pick enemy again, defender = undefined
      $('#Result').html(`<p>You defeat ${defenderObject.name} congratulation! Pick your enemy again!</p>`);
      $('#Defender').empty();
      defender = undefined;
    }
  });
});
