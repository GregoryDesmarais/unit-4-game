var charStats = {
    lukeSky: {
        name: "Luke Skywalker",
        baseAtk: 9,
        curAtk: 9,
        hp: 130
    },
    obiWan: {
        name: "Obi-Wan Kenobi",
        baseAtk: 10,
        curAtk: 10,
        hp: 120
    },
    darthSidious: {
        name: "Darth Sidious",
        baseAtk: 20,
        curAtk: 20,
        hp: 150
    },
    darthMaul: {
        name: "Darth Maul",
        baseAtk: 25,
        curAtk: 25,
        hp: 170
    }
};

var player;
var enemy;

function createCharPanel() {
    var chars = Object.keys(charStats);
    chars.forEach(function (key) {
        $(".charSelect").append("<div class='charPanel' value='" + key + "'>" +
            "<div class='charName'>" + charStats[key].name + "</div>" +
            "<div class='charPic'>" +
            "<img src='assets/images/" + key + ".jpg'></div>" +
            "<div class='charHP'></div>");
    });
    $(".charPanel").click(selectChar);
    displayHP();
}

function selectChar() {
    if ($(this).hasClass("player")) {
        return false;
    }
    else if ($('.player').length === 0) {
        $(this).addClass("player").detach().appendTo(".selectedChar");
        $("span.left").text("Selected Character");
        player = $(".player").attr("value");
        $('.charPanel:not(".player")').detach().appendTo(".enemySelect").addClass("enemy");
        $(".enemySelect > .hidden").removeClass("hidden");
    }
    else if ($(".player").length > 0 &&
        $('.activeEnemy').length === 0) {
        $(this).removeClass("enemy").addClass("activeEnemy").detach().appendTo(".curEnemy");
        enemy = $(".activeEnemy").attr("value");
        $(".fight, .battleInfo, span.right").removeClass("hidden");
        $(".battleInfo").empty();
    }
}

function displayHP() {
    $(".charPanel").each(
        function () {
            var name = $(this).attr("value");
            $(this).find(".charHP").text("HP: " + charStats[name].hp);
        }
    )
}

function performAttack(player, enemy) {
    enemy.hp -= player.curAtk;
    if (enemy.hp < 0) {
        if ($(".enemySelect > .charPanel").length === 0) {
            $(".battleInfo").html(player.name + " Defeats " + enemy.name +
                "<br>You win!!");
            $(".reset").removeClass("hidden");
            $(".fight").addClass("hidden");
        } else {
            $(".battleInfo").html(player.name + " Defeats " + enemy.name +
                "<br>Select another opponent!");
        }
        $(".activeEnemy").remove();
        console.log(player.curAtk);
        player.curAtk += player.baseAtk;
    }
    else {
        $(".battleInfo").html(player.name + " Attacks " + enemy.name +
            " for " + player.curAtk + " damage!");
        console.log(player.curAtk);
        player.curAtk += player.baseAtk;
        player.hp -= enemy.baseAtk;
        if (player.hp <= 0) {
            player.hp = 0;
            $(".battleInfo").html(player.name + " has fallen in battle.<br>Try again!");
            $(".reset").removeClass("hidden");
            $(".fight").addClass("hidden");
            displayHP();
        }
        else {
            $(".battleInfo").append("<br><br>" + enemy.name + " Attacks " + player.name +
                " for " + enemy.curAtk + " damage!");
        }
        displayHP();
    }

}
$(function () {

    createCharPanel();
    $(".reset").click(function () {
        location.reload();
    });
    $(".fight").click(function () {
        if ($(".player, .activeEnemy").length !== 2) {
            return false;
        } else {
            performAttack(charStats[player], charStats[enemy]);
        }

    });
});