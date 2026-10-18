/**
 * Portfolio-only state machine. No backend, Supabase, authentication or payments.
 * Historical source baseline: a2e569ffc252388f07f0c0ddd2d8927606c3e64b
 */
(function(global){
  'use strict';
  const CATEGORIES = Object.freeze([
    {id:'sprint',name:'Sprint',price:45000,desc:'Fast. Sharp. Fearless.',swim:'750 m',bike:'20 km',run:'5 km'},
    {id:'olympic',name:'Olympic',price:75000,desc:'The full distance. The full story.',swim:'1.5 km',bike:'40 km',run:'10 km'},
    {id:'relay',name:'Relay',price:90000,desc:'Three athletes. One finish line.',swim:'1.5 km',bike:'40 km',run:'10 km'}
  ]);
  const DISCIPLINES = Object.freeze([
    {id:'swim',name:'Swim',initial:'S',color:'#4FC3F7',desc:'Open-water technique and preparation.'},
    {id:'bike',name:'Bike',initial:'B',color:'#F59E0B',desc:'Riding, transitions and bike readiness.'},
    {id:'run',name:'Run',initial:'R',color:'#E85D3A',desc:'Building endurance for the final leg.'}
  ]);
  const PUBLIC = Object.freeze(['/','/race-info','/course-map','/stories','/archive','/privacy']);
  const PARTICIPANT = Object.freeze(['/dashboard','/ticket','/training','/feed','/fundraise','/profile','/results','/results/leaderboards','/results/photos','/results/memories','/teams','/challenges','/register']);
  function initialState(){ return {
    fullName:'Alex Mwakalinga',email:'alex@example.test',phone:'',category:'sprint',registration:'sample',bib:null,
    registrationStage:0,registrationDraft:{fullName:'',email:'',phone:'',category:'sprint',discipline:'swim'},
    profileStory:'',theme:'light',selectedDiscipline:'swim',feedFilter:'all',storyFilter:'all',
    posts:[],reactions:[],pledges:[],campaignGoal:200000,notification:'',
    version:1
  };}
  let state=initialState();
  try { const raw=sessionStorage.getItem('tour-de-dar-standalone-preview-v1'); if(raw){const parsed=JSON.parse(raw); if(parsed&&parsed.version===1)state={...state,...parsed,registrationDraft:{...state.registrationDraft,...parsed.registrationDraft}};} }catch{}
  function save(){try{sessionStorage.setItem('tour-de-dar-standalone-preview-v1',JSON.stringify(state))}catch{}}
  function get(){return state;}
  function patch(data){state={...state,...data};save();return state;}
  function notify(message){state.notification=message;save();}
  function clearNotification(){state.notification='';save();}
  function reset(){state=initialState();save();return state;}
  function category(id){return CATEGORIES.find(x=>x.id===id)||CATEGORIES[0]}
  function register(draft){
    const fullName=String(draft.fullName||'').trim();
    const email=String(draft.email||'').trim();
    if(fullName.length<2) return {ok:false,error:'Enter a name for your sample participant.'};
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return {ok:false,error:'Enter an example email address.'};
    if(!CATEGORIES.some(c=>c.id===draft.category)) return {ok:false,error:'Choose a race category.'};
    patch({fullName,email,phone:String(draft.phone||''),category:draft.category,registration:'pending',bib:null,registrationStage:3,registrationDraft:{...draft}});
    return {ok:true};
  }
  function addPost(content,discipline){
    content=String(content||'').trim();
    if(content.length<3||content.length>500)return {ok:false,error:'Posts must be between 3 and 500 characters.'};
    patch({posts:[{id:'post-'+Date.now(),content,discipline:discipline||'',name:state.fullName,likes:0,date:'Just now'},...state.posts]});
    return {ok:true};
  }
  function setReaction(id){const has=state.reactions.includes(id);patch({reactions:has?state.reactions.filter(x=>x!==id):[...state.reactions,id]})}
  function pledge(amount){amount=Number(amount);if(!Number.isSafeInteger(amount)||amount<=0||amount>100000000)return {ok:false,error:'Enter a valid simulated pledge amount.'};patch({pledges:[{id:'pledge-'+Date.now(),amount},...state.pledges]});return {ok:true}}
  function completeDemoRegistration(){patch({registration:'confirmed',bib:'DEMO-0264'});}
  function route(path){return PUBLIC.includes(path)||PARTICIPANT.includes(path)?path:'/'}
  global.TourDemo={CATEGORIES,DISCIPLINES,PUBLIC,PARTICIPANT,get,patch,notify,clearNotification,reset,category,register,addPost,setReaction,pledge,completeDemoRegistration,route};
})(window);