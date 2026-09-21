const pages=[...document.querySelectorAll('.page')];
let current=0;
const music=document.querySelector('#bgMusic');
const musicBtn=document.querySelector('#musicBtn');

function showPage(index){
  current=Math.max(0,Math.min(index,pages.length-1));
  pages.forEach((p,i)=>p.classList.toggle('active',i===current));
}

document.querySelector('#openBtn').addEventListener('click',()=>{
  document.querySelector('#boot').remove();
  document.querySelector('#app').hidden=false;
  musicBtn.hidden=false;
  music.volume=.24;
  music.play().catch(()=>{});
  showPage(0);
});

document.querySelectorAll('[data-next]').forEach(btn=>btn.addEventListener('click',()=>{
  if(current<pages.length-1) showPage(current+1);
}));

musicBtn.addEventListener('click',()=>{
  if(music.paused) music.play().catch(()=>{});
  else music.pause();
  musicBtn.textContent=music.paused?'🔇':'♫';
});

const photoFiles=Array.from({length:12},(_,i)=>`photo${i+1}.jpg`);
const collage=document.querySelector('#collage');
photoFiles.forEach((file,i)=>{
  const fig=document.createElement('figure');
  fig.innerHTML=`<div class="photo-frame"><img src="images/${file}" alt="Friendship memory ${i+1}" loading="lazy"></div>`;
  fig.addEventListener('click',()=>{
    const img=new Image(); img.onload=()=>{document.querySelector('#lightboxImg').src=`images/${file}`;document.querySelector('#lightbox').hidden=false}; img.src=`images/${file}`;
  });
  collage.appendChild(fig);
});

document.querySelector('#closeLightbox').onclick=()=>document.querySelector('#lightbox').hidden=true;
document.querySelector('#lightbox').onclick=e=>{if(e.target.id==='lightbox')e.currentTarget.hidden=true};
document.addEventListener('keydown',e=>{if(e.key==='Escape')document.querySelector('#lightbox').hidden=true});

const questions=[
 {q:'Where did our friendship begin?',o:['PU','College','Online'],a:0},
 {q:'What do we sometimes meet up for?',o:['Going out to eat','Morning runs','Library study sessions'],a:0},
 {q:'What do we talk about even though we are in different colleges?',o:['VTU / project stuff','Football scores','Cooking recipes'],a:0}
];
let qi=0,score=0;
function renderQuiz(){
 const box=document.querySelector('#quizBox'),q=questions[qi];
 box.innerHTML=`<p class="quiz-progress">QUESTION ${qi+1} / ${questions.length}</p><h3 class="quiz-q">${q.q}</h3><div class="quiz-options"></div>`;
 q.o.forEach((text,i)=>{
  const b=document.createElement('button');b.className='opt';b.textContent=text;
  b.onclick=()=>{
   box.querySelectorAll('.opt').forEach(x=>x.disabled=true);
   if(i===q.a){score++;b.classList.add('right')}else b.classList.add('wrong');
   setTimeout(()=>{
    qi++;
    if(qi<questions.length) renderQuiz();
    else {box.innerHTML=`<h3>ACCESS GRANTED ♡</h3><p>You scored ${score}/${questions.length}. Bestie status confirmed!</p><button class="next-btn" id="quizNext">NEXT →</button>`;document.querySelector('#quizNext').onclick=()=>showPage(5)}
   },500);
  };
  box.querySelector('.quiz-options').appendChild(b);
 });
}
renderQuiz();

document.querySelector('#restartBtn').addEventListener('click',()=>{
 qi=0;score=0;renderQuiz();showPage(0);window.scrollTo(0,0);
});
