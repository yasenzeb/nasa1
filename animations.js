(function(){
  var reduceMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var revealItems=document.querySelectorAll('.head,.footer,.download-content h1,.download-lead,.download-panel,.download-help');
  var motionCards=document.querySelectorAll('.fact,.mech-card,.note,.about-text,.dl-card,.download-panel,.video-card');

  if(reduceMotion||!('IntersectionObserver' in window)){
    revealItems.forEach(function(item){item.classList.add('js-reveal-visible')});
  }else{
    var revealObserver=new IntersectionObserver(function(entries,observer){
      entries.forEach(function(entry){
        if(entry.isIntersecting){
          entry.target.classList.add('js-reveal-visible');
          observer.unobserve(entry.target);
        }
      });
    },{threshold:.12});

    revealItems.forEach(function(item,index){
      item.classList.add('js-reveal-ready');
      item.style.setProperty('--js-reveal-delay',Math.min(index%4,3)*85+'ms');
      revealObserver.observe(item);
    });
  }

  if(reduceMotion||!window.matchMedia('(hover: hover) and (pointer: fine)').matches)return;

  motionCards.forEach(function(card){
    card.classList.add('js-motion-card');
    var glow=document.createElement('span');
    glow.className='js-pointer-glow';
    glow.setAttribute('aria-hidden','true');
    card.prepend(glow);

    card.addEventListener('pointermove',function(event){
      var bounds=card.getBoundingClientRect();
      var x=event.clientX-bounds.left,y=event.clientY-bounds.top;
      var shiftX=((x/bounds.width)-.5)*4,shiftY=((y/bounds.height)-.5)*4;
      card.style.setProperty('--glow-x',x+'px');
      card.style.setProperty('--glow-y',y+'px');
      card.style.setProperty('--card-shift-x',shiftX+'px');
      card.style.setProperty('--card-shift-y',shiftY+'px');
      glow.classList.add('visible');
    },{passive:true});

    card.addEventListener('pointerleave',function(){
      card.style.setProperty('--card-shift-x','0px');
      card.style.setProperty('--card-shift-y','0px');
      glow.classList.remove('visible');
    },{passive:true});
  });

  document.addEventListener('pointerdown',function(event){
    var button=event.target.closest('.btn');
    if(!button)return;
    var bounds=button.getBoundingClientRect();
    var ripple=document.createElement('span');
    ripple.className='js-ripple';
    ripple.setAttribute('aria-hidden','true');
    ripple.style.left=(event.clientX-bounds.left)+'px';
    ripple.style.top=(event.clientY-bounds.top)+'px';
    button.appendChild(ripple);
    ripple.addEventListener('animationend',function(){ripple.remove()},{once:true});
  },{passive:true});

  var hero=document.querySelector('.hero');
  if(hero){
    var heroGrid=hero.querySelector('.hero-grid');
    var stars=hero.querySelector('.stars');
    hero.addEventListener('pointermove',function(event){
      var bounds=hero.getBoundingClientRect();
      var x=(event.clientX-bounds.left)/bounds.width-.5;
      var y=(event.clientY-bounds.top)/bounds.height-.5;
      if(heroGrid){
        heroGrid.style.setProperty('--hero-shift-x',(x*-7)+'px');
        heroGrid.style.setProperty('--hero-shift-y',(y*5)+'px');
      }
      if(stars){
        stars.style.setProperty('--stars-shift-x',(x*12)+'px');
        stars.style.setProperty('--stars-shift-y',(y*8)+'px');
      }
    },{passive:true});
    hero.addEventListener('pointerleave',function(){
      if(heroGrid){heroGrid.style.setProperty('--hero-shift-x','0px');heroGrid.style.setProperty('--hero-shift-y','0px')}
      if(stars){stars.style.setProperty('--stars-shift-x','0px');stars.style.setProperty('--stars-shift-y','0px')}
    },{passive:true});
  }
})();
