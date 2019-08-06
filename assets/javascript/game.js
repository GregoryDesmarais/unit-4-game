var charStats = {
    lukeSky: {
        name: "Luke Skywalker",
        baseAtk: 6,
        curAtk: 6,
        hp: 100
    },
    obiWan: {
        name: "Obi-Wan Kenobi",
        baseAtk: 4,
        curAtk: 4,
        hp: 120
    },
    darthSidious: {
        name: "Darth Sidious",
        baseAtk: 5,
        curAtk: 5,
        hp: 150
    },
    darthMaul: {
        name: "Darth Maul",
        baseAtk: 7,
        curAtk: 7,
        hp: 180
    }

};

function selectChar() {
    if ($('.player').length === 0) {
        $(this).addClass("player");
        $('.charPanel:not(".player")').detach().appendTo(".enemySelect").addClass("enemy");
    }

    else if($(".player").length > 0 && $('.activeEnemy').length === 0)
    {
        $(this).removeClass("enemy").addClass("activeEnemy").detach().appendTo(".curEnemy");
    }
}

$(function () {
    $(".charPanel").click(selectChar);
});