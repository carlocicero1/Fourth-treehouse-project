$('#board').hide();
$('.player1-winner').hide();
$('.player2-winner').hide();
$('.draw').hide();
let playersTurn = true;
const orange = 'box-filled-1';
const blue = 'box-filled-2';
const blueScore = [];
const orangeScore = [];
const usedBoxes = [];
const player1 = {
		hasWon: false
};
const player2 = {
	hasWon: false
};
const winningCombos = [
	[1,2,3],
	[4,5,6],
	[7,8,9],
	[1,4,7],
	[3,6,9],
	[2,5,8],
	[1,5,9],
	[3,5,7]
 ];

$('.button').on('click', () => {
	$('.screen-start').hide();
	$('.board').show();
})
$('.drawButton').on('click', () => {
	location.reload();
	
})

	function currentPlayer () {
		if(playersTurn) {
			$('#player1').addClass('active')
			$('#player2').removeClass('active')
		
		}
		 else if (!playersTurn) {
			$('#player2').addClass('active')
			$('#player1').removeClass('active')
		
		}
	};

currentPlayer();

$('.boxes li').on('click', (e) => {
	const $target = $(e.target);
	if($($target).hasClass(orange) || $($target).hasClass(blue) ) {
		}
	 else {
	if(playersTurn) {
		$($target).addClass(orange)
		playersTurn = false;
		addScore($target);

		return currentPlayer(playersTurn)
	}
	 else if (!playersTurn) {
		$($target).addClass(blue)
		playersTurn = true;
		addScore($target);

		return currentPlayer(playersTurn)
	}
}
})

function addScore (box) {
		const boxVal = $(box).data('box')

		if($(box).hasClass(orange)) {
			orangeScore.push(boxVal);
			usedBoxes.push(boxVal);
			checkForWinner(orangeScore)
			checkForDraw();

		}
		else if($(box).hasClass(blue)) {
			blueScore.push(boxVal);
			usedBoxes.push(boxVal);
			checkForWinner(blueScore);
			checkForDraw();
		}
}
function checkForDraw () {
	if (usedBoxes.length === 9 && player1.hasWon === false && player2.hasWon === false) {
		$('#board').hide();
		$('.draw').show();
	}
}

function checkForWinner (playerScore) {

	winningCombos.forEach((combo) => {
		let score = 0;

		combo.forEach((num) => {
			if (playerScore.includes(num)) {
				score++
			}
		})

		if(score >= 3 && playerScore === orangeScore) {
			player1.hasWon = true;
			endGame();
		} else if (score >= 3 && playerScore === blueScore) {
			player2.hasWon = true;
			endGame();
		 } 
	})
}

function endGame () {
	if(player1.hasWon) {
		$('#board').hide()
		$('.player1-winner').show();

	} else if(player2.hasWon) {
		$('#board').hide()
		$('.player2-winner').show();
	}
}	

	$('.end-button').on('click', () => {
		location.reload();
	})

$('.boxes li').on('mouseover', (e) => {
	const $target = $(e.target);
	const isAnO = $($target).hasClass(orange);
	const isAnX = $($target).hasClass(blue);

	if (!isAnO && !isAnX) {
		if(playersTurn) {
			$($target).attr('id','mouseover-o')
		} else if(!playersTurn) {
			$($target).attr('id','mouseover-x');
		}
	}
});

$('.boxes li').on('mouseout', (e) => {
	const $target = $(e.target);

	if(playersTurn) {
		$($target).removeAttr('id')
	} else if(!playersTurn) {
		$($target).removeAttr('id');
	}
	
});
