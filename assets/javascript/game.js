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

function createCharPanel()
{
    var chars = Object.keys(charStats);
    chars.forEach(function(key){
        $(".charSelect").append("<div class='charPanel' value='"+key+"'>"+
        "<div class='charName'>"+charStats[key].name+"</div>"+
        "<div class='charPic'>"+
        "<img src='assets/images/"+key+".jpg'></div>"+
        "<div class='charHP'></div>");
    });
    $(".charPanel").click(selectChar);
    displayHP();
}

function selectChar() {
    if ($('.player').length === 0) {
        $(this).addClass("player").detach().appendTo(".selectedChar");
        $('.charPanel:not(".player")').detach().appendTo(".enemySelect").addClass("enemy");
        $(".enemySelect > .hidden").removeClass("hidden");
    }

    else if($(".player").length > 0 && $('.activeEnemy').length === 0)
    {
        $(this).removeClass("enemy").addClass("activeEnemy").detach().appendTo(".curEnemy");
    }
}

function displayHP()
{
    $(".charPanel").each(
        function()
        {
            var name = $(this).attr("value");
			$(this).find(".charHP").text("HP: "+ charStats[name].hp);
        }
    )
}

function performAttack()
{

}
$(function () {
    
    createCharPanel();
    // $(".charPanel").click(function()
    // {
    //     console.log($(this).attr("value"));
    // });
});