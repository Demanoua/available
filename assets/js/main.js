document.addEventListener('DOMContentLoaded',()=> {
  // theme
  const root = document.documentElement;
  const toggle = document.getElementById('theme-toggle');
  const saved = localStorage.getItem('theme') || 'light';
  if(saved==='dark') document.documentElement.setAttribute('data-theme','dark');
  toggle.onclick = ()=>{
    const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    if(next==='dark') document.documentElement.setAttribute('data-theme','dark'); else document.documentElement.removeAttribute('data-theme');
    localStorage.setItem('theme', next);
  };

  // inject profile
  document.getElementById('name').textContent = PROFILE.name;
  document.getElementById('headline').textContent = PROFILE.headline;
  document.getElementById('summary').textContent = PROFILE.summary;
  document.getElementById('year').textContent = new Date().getFullYear();

  const skillsList = document.getElementById('skills-list');
  PROFILE.skills.forEach(s=>{
    const el = document.createElement('span'); el.className='chip'; el.textContent=s; skillsList.appendChild(el);
  });

  const servicesList = document.getElementById('services-list');
  PROFILE.services.forEach(s=>{
    const card = document.createElement('div'); card.className='service';
    card.innerHTML = `<h4>${s.title}</h4><p>${s.desc}</p>`; servicesList.appendChild(card);
  });

  // projects + filter
  const projectsList = document.getElementById('projects-list');
  function renderProjects(filter='') {
    projectsList.innerHTML='';
    PROFILE.projects.filter(p => !filter || p.tech.join(' ').toLowerCase().includes(filter.toLowerCase()))
      .forEach(p => {
        const el = document.createElement('div'); el.className='proj card';
        el.innerHTML = `<h4>${p.title}</h4><p>${p.desc}</p><p><strong>Tech:</strong> ${p.tech.join(', ')}</p>`;
        projectsList.appendChild(el);
      });
  }
  renderProjects();
  document.getElementById('project-filter').addEventListener('input', e=> renderProjects(e.target.value));

  // testimonials
  const tlist = document.getElementById('testimonials-list');
  PROFILE.testimonials.forEach(t=>{
    const item = document.createElement('div'); item.className='item';
    item.innerHTML = `<strong>${t.name}</strong><p>${t.text}</p>`;
    tlist.appendChild(item);
  });

  // example plotly chart
  const dates = PROFILE.analytics.example_series.map(r=>r[0]);
  const vals = PROFILE.analytics.example_series.map(r=>r[1]);
  Plotly.newPlot('chart',[{x:dates,y:vals,type:'scatter',mode:'lines+markers',marker:{color:'#1565d8'}}],{margin:{t:20}});

  // contact form: show success message on submission via JS fallback
  const form = document.getElementById('contact-form');
  form.addEventListener('submit', (e)=>{
    // allow default to Formspree; optionally show a small toast
    setTimeout(()=>{ alert('Message envoyé — vérifiez votre email pour la confirmation.'); },600);
  });
});

