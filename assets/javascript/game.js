// on click function, user click remain on user charater div, other move to avilable enemies.
$(document).ready(function() {
  //
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
  var avilableEnamy = [];
  var userChoose;
  var defender;

  $('.card').on('click', function() {
    if (avilableEnamy.length === 0) {
      userChoose = $(this).attr('id');

      $('#User-Char').append($(this));

      for (var i = 0; i < avilableChar.length; i++) {
        if (userChoose !== avilableChar[i].name) {
          $('#' + avilableChar[i].name).appendTo('#Avilable-Attack');
          $('#' + avilableChar[i].name).css('background-color', '#ff0000');
          avilableEnamy.push(avilableChar[i].name);
        }
      }
    } else if (defender !== undefined) {
    } else {
      defender = $(this).attr('id');
      $('#Defender').append($(this));
      $(this).css({ 'background-color': 'black', color: 'white' });
      console.log(defender);
    }
  });

  function charFinder(name) {
    for (var i = 0; i < avilableChar.length; i++) {
      if (name === avilableChar[i].name) {
        return avilableChar[i];
      }
    }
  }

  //click attack function
  $('#attack-btn').on('click', function() {
    var userChooseObject = charFinder(userChoose);
    var defenderObject = charFinder(defender);
    var userrandomNum = Math.floor(Math.random() * 20 + 1);
    var defenderrandomNum = Math.floor(Math.random() * 20 + 1);

    var userAttackPW = userChooseObject.attackPower + userrandomNum;
    var defenderAttackPW = defenderObject.attackPower + defenderrandomNum;

    userChooseObject.hp = userChooseObject.hp - defenderAttackPW;
    $('#' + userChooseObject.name + '_HP').text(userChooseObject.hp);

    defenderObject.hp = defenderObject.hp - userAttackPW;
    $('#' + defenderObject.name + '_HP').text(defenderObject.hp);

    if (userChooseObject.hp > 0 && defenderObject.hp > 0) {
      $('#Result').html(
        '<p>You attacked ' +
          defenderObject.name +
          ' for ' +
          userAttackPW +
          ' damage</p>' +
          `<p>${
            defenderObject.name
          } attacked you back for ${defenderAttackPW} damage</p>`
      );
    } else if (userChooseObject.hp <= 0) {
      $('#Result').html('<p>You loss, Reset!</p>');
      var resetBtn = $('<button>');
      resetBtn.text('Reset');
      $('#Result').append(resetBtn);
      resetBtn.on('click', function() {
        location.reload();
      });
    } else {
      $('#Result').html(
        `<p>You defeat ${
          defenderObject.name
        } congratulation! Pick your enemy again!</p>`
      );
      $('#Defender').empty();
      defender = undefined;
    }
  });

  //
});
