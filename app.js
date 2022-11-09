let circleTurn = false;
let selected = true;
let win_ans = [0,1,2];

const first_el = document.querySelector('.cross-mark');
const second_el = document.querySelector('.zero-mark');
const btn_newgame = document.getElementById('new');
const game_start = document.querySelector('.game-start');
const game_play = document.querySelector('.gameplay');
const game_play_card = document.querySelectorAll('.gameplay-card');
const turn = document.getElementById('turn');
const restart = document.querySelector('.restart');
const result = document.querySelector('.result');
const backdrop = document.querySelector('.backdrop');
const win_msg_txt = document.querySelector('.win-msg-txt');
const next_r = document.querySelector('.next-r');
const win_icon = document.querySelector('.win-icon');
const p1 = document.querySelector('.p1');
const tie = document.querySelector('.tie');
const p2 = document.querySelector('.p2');
const win_player = document.querySelector('.win-player');
const round_tied = document.querySelector('.round-tied');
const ttr = document.querySelector('.ttr');
const alert = document.querySelector('.alert');
const close_btn = document.querySelector('.close-btn');
let p1_name = document.querySelector('.player1');
let p2_name = document.querySelector('.player2');

p1_name.addEventListener('keydown', pressEnter)
p2_name.addEventListener('keydown', pressEnter)
restart.addEventListener('click', restart_game)
btn_newgame.addEventListener ('click', click)

const win_combo = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]
close_btn.addEventListener('click', ()=>{
    alert.classList.remove('show');
    alert.classList.add('hidden');

})
first_el.addEventListener('click', function handleClick() {
    first_el.classList.add('selected');
    document.getElementById('x_img').src = "Images/cross-purp-52.png";
    document.getElementById('o_img').src = "Images/zero-white-50.png";

    second_el.classList.remove('selected');
    turn.src = "Images/cross.png";
    game_play.classList.remove('o');
    game_play.classList.add('x');
    selected = false;
})

second_el.addEventListener('click', function handleClick(el) {
    second_el.classList.add('selected');
    document.getElementById('x_img').src = "Images/cross.png";
    document.getElementById('o_img').src = "Images/zero.png";

    first_el.classList.remove('selected');
    selected = true;
})

game_play_card.forEach(cell => {
    cell.addEventListener('click', handleClick, {once:true})
})

function handleClick(e)
{
    // place mark //check for win or draw // switch turns
   const cell = e.target;
   const currentClass = circleTurn ? 'o' : 'x';
   placeMark(cell, currentClass); 

   if(checkWin(currentClass))
   {
        setTimeout(()=>{
            result.classList.add('d-block');
            backdrop.classList.add('d-block');
        },500)
        console.log(win_ans)
        if(currentClass == 'x')
        {
            win_ans.forEach(index => {
                game_play_card[index].style.backgroundColor = "#FF6363";
                game_play_card[index].classList.add('win');
            });
            
            win_msg_txt.classList.remove('yel');
            win_msg_txt.classList.add('pink');
            win_icon.src = 'Images/cross-pink-52.png';
            next_r.classList.remove('x');
            next_r.classList.add('o');
            p1.innerHTML++;
            if(!selected)
            win_player.innerHTML = `${p1_name.value} WINS!`;
            else
            win_player.innerHTML = `${p2_name.value} WINS!`;  
        }
        else
        {
            win_ans.forEach(index => {
                game_play_card[index].style.backgroundColor = "#FFBD69";
                game_play_card[index].classList.add('win');
            });
            if(selected)
            win_player.innerHTML = `${p1_name.value} WINS!`;
            else
            win_player.innerHTML = `${p2_name.value} WINS!`;
            win_icon.src = 'Images/zero-60.png';
            win_msg_txt.classList.remove('pink');
            win_msg_txt.classList.add('yel');
            
            next_r.classList.remove('o');
            p2.innerHTML++;
        }
        ttr.classList.remove('d-none');
        round_tied.classList.add('d-none');
        result.style.padding = '3.5rem 0';
   }
   else if(isDraw())
   {
    result.classList.add('d-block');
    backdrop.classList.add('d-block');
    win_player.classList.add('d-none');
    win_icon.classList.add('d-none');
    ttr.classList.add('d-none');
    round_tied.classList.remove('d-none');
    result.style.padding = '2rem 0 5.5rem 0';
    tie.innerHTML++;
   }
   else{
    game_play.classList.remove(currentClass);
    swapTurns();
   }
}
function placeMark(cell, currentClass)
{
    cell.classList.add(currentClass);
}
function swapTurns()
{
    circleTurn = !circleTurn;
    if(!circleTurn)
    {
        game_play.classList.add('x');
        turn.src = "Images/cross.png";
    }
    else
    {
        game_play.classList.add('o');
        turn.src = "Images/zero-white-50.png";
    }
}
function isDraw()
{
    return [...game_play_card].every(cell => {
        return cell.classList.contains('x')|| cell.classList.contains('o');
    })
}
function checkWin(currentClass)
{
    return win_combo.some(combination => 
        {
            count = 0;
         return combination.every(index => {
            let ans = game_play_card[index].classList.contains(currentClass);
            if(ans)
            count++;
            if(count==3)
            {
                win_ans = combination;
            }
            return ans;
        })
    })
}

function pressEnter(event)
{
    alert.classList.remove('show');
    alert.classList.add('hidden');
    if(event.key === 'Enter')
        click();
}
function click()
{
    if(checkEmpty())
    {
        game_play.classList.remove('d-none');
        game_start.classList.add('d-none');
    }
}
function checkEmpty()
{
    if(p1_name.value=='' || p2_name.value=='')
    {
        alert.classList.remove('hidden');
        alert.classList.add('show');
        return false;
    }
    else 
    return true;
}
function restart_game() 
{
    result.classList.remove('d-block');
    backdrop.classList.remove('d-block');
    game_play.classList.remove('o');
    game_play.classList.add('x');
    game_play_card.forEach(el => {
        if(el.classList.contains('x'))
        el.classList.remove('x');
        else
        el.classList.remove('o');
        el.removeEventListener('click', handleClick);
        el.addEventListener('click', handleClick, {once:true})
    });
    turn.src = "Images/cross.png";
    circleTurn = false;
    win_ans.forEach(index => {
        game_play_card[index].style.backgroundColor = "#40426e";
        game_play_card[index].classList.remove('win');
    });
}

function refreshPage()
{
    result.classList.remove('d-block');
    backdrop.classList.remove('d-block');
    game_play.classList.add('d-none');
    game_start.classList.remove('d-none');
    const num_data = document.querySelectorAll('.num');
    num_data.forEach(el => {
        el.innerHTML = 0;
    });
    p1_name.value="";
    p2_name.value="";
restart_game();
} 

next_r.addEventListener('click', ()=> {
    win_player.classList.remove('d-none');
    win_icon.classList.remove('d-none');
    restart_game();
})