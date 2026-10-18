// All labels, UI, and company names in demo mockups are fictional examples.
// These same markup functions drive BOTH the browser storyboard and Remotion frames.
const i=(path, size=24, stroke='#ECF7FF')=>`<svg aria-hidden="true" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${stroke}" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">${path}</svg>`;
const icon={
 globe:i('<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c5 5 5 13 0 18M12 3c-5 5-5 13 0 18"/>'),
 mail:i('<rect x="3" y="5" width="18" height="14" rx="3"/><path d="m4 7 8 6 8-6"/>'),
 user:i('<circle cx="12" cy="8" r="3"/><path d="M5 21c0-4 3-6 7-6s7 2 7 6"/>'),
 check:i('<path d="m5 12 4 4L19 6"/>'),
 arrow:i('<path d="M5 12h14m-6-6 6 6-6 6"/>'),
 link:i('<path d="M10 13a5 5 0 0 0 7.6.5l3-3a5 5 0 0 0-7-7L12 5"/><path d="M14 11a5 5 0 0 0-7.6-.5l-3 3a5 5 0 0 0 7 7L12 19"/>'),
 send:i('<path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/>'),
 sparkle:i('<path d="m12 2 2.4 7.6L22 12l-7.6 2.4L12 22l-2.4-7.6L2 12l7.6-2.4z"/>'),
 phone:i('<rect x="6" y="2" width="12" height="20" rx="2"/><path d="M11 18h2"/>'),
};
const pill=(text,dark=false)=>`<span class="pill ${dark?'pill-dark':''}"><span class="pill-led"></span>${text}</span>`;
const bottom=(number,label)=>`<div class="scene-footer"><span>EZ SITES / BUSINESS ONLINE</span><span>${number} / 06 &nbsp; · &nbsp; ${label}</span></div>`;

function shop(){return `<div class="store-wrap">
  <div class="store-glow"></div>
  <div class="store-roof"></div>
  <div class="storefront">
    <div class="store-sign"><span class="sun-dot"></span> NEW DAY <span>STUDIO</span></div>
    <div class="awning"><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div>
    <div class="store-main">
      <div class="window"><div class="poster"><span>HANDMADE<br>WITH CARE.</span><small>DESIGNED FOR THE EVERYDAY</small></div><div class="window-sun"></div></div>
      <div class="door"><div class="door-glass">WELCOME<br><span>OPEN TODAY</span></div><div class="handle"></div></div>
    </div>
    <div class="store-base"></div>
  </div>
  <div class="shop-shadow"></div>
  <div class="shop-float shop-float-left">${icon.user}<div><b>REAL PEOPLE.</b><small>YOUR NEXT CUSTOMERS</small></div></div>
  <div class="shop-float shop-float-right">${icon.sparkle}<div><b>REAL BUSINESS.</b><small>READY FOR MORE</small></div></div>
</div>`}
function siteMock(){return `<div class="browser-mock">
  <div class="browser-chrome"><div class="traffic"><span></span><span></span><span></span></div><div class="browser-url">${icon.link} newdaystudio.com</div><div class="browser-menu">•••</div></div>
  <div class="site-layout">
    <div class="site-nav"><strong><span class="site-logo-dot"></span> NEW DAY</strong><span>ABOUT &nbsp; SERVICES &nbsp; CONTACT</span></div>
    <div class="site-hero"><div class="site-copy"><div class="site-overline">MADE FOR REAL LIFE</div><h3>Make room for<br><em>something good.</em></h3><p>Thoughtful goods, everyday joy. Discover the collection at New Day Studio.</p><div class="site-cta">GET IN TOUCH &nbsp; ↗</div></div><div class="site-photo"><div class="photo-sun"></div><div class="photo-object one"></div><div class="photo-object two"></div><div class="photo-plant">✳</div></div></div>
    <div class="site-bottom"><span>✦ &nbsp; MADE WITH INTENTION</span><span>OUR STORY &nbsp; ↗</span></div>
  </div></div>`}
function phone(content,classname=''){return `<div class="phone ${classname}"><div class="phone-hardware"><div class="dynamic-island"></div>${content}</div></div>`}

export const sceneHTML=(step)=>{
if(step===1)return `<div class="subtle-grid"></div><div class="ambient ambient-a"></div><div class="top-brand">ez<span>Sites</span> <i></i> FOR BUSINESS</div>
  <div class="header-block"><div class="eyebrow">${pill('FOR THE PEOPLE WHO BUILD')}</div><h1>YOU BUILT<br><span>SOMETHING</span><br>REAL.</h1><p>A great business deserves to be discovered.</p></div>
  ${shop()}<div class="bottom-phrase">NOW TAKE IT<br><strong>FURTHER.</strong><span class="long-line"></span></div>${bottom('01','THE START')}`;
if(step===2)return `<div class="subtle-grid subtle-grid-light"></div><div class="ambient ambient-b"></div><div class="top-brand on-light">ez<span>Sites</span> <i></i> YOUR ONLINE PRESENCE</div>
  <div class="header-block on-light"><div class="eyebrow">${pill('FROM LOCAL TO ONLINE',true)}</div><h1>GIVE YOUR<br>BUSINESS A<br><span>HOME ONLINE.</span></h1><p>A professional place for customers to discover what you do.</p></div>
  <div class="site-showcase"><div class="site-backplate backplate-one"></div><div class="site-backplate backplate-two"></div>${siteMock()}<div class="device-float float-visit">${icon.globe}<span>YOUR BUSINESS<br><strong>IS ONLINE</strong></span></div><div class="device-float float-mobile">${icon.phone}<span>LOOKS GOOD<br><strong>ON MOBILE</strong></span></div></div>
  <div class="bottom-phrase dark">SHOW UP.<br><strong>STAND OUT.</strong></div>${bottom('02','PRESENCE')}`;
if(step===3)return `<div class="subtle-grid"></div><div class="ambient ambient-c"></div><div class="top-brand">ez<span>Sites</span> <i></i> YOUR IDENTITY</div>
  <div class="header-block"><div class="eyebrow">${pill('MAKE IT YOURS')}</div><h1>YOUR NAME.<br>YOUR BRAND.<br><span>YOUR DOMAIN.</span></h1><p>Give your business an address that feels like yours.</p></div>
  <div class="domain-stage"><div class="domain-orbit orbit1"></div><div class="domain-orbit orbit2"></div><div class="domain-orbit orbit3"></div><div class="domain-shield">${icon.globe}</div><div class="domain-label">YOUR WEBSITE ADDRESS</div><div class="domain-bar"><span class="domain-lock">●</span><span>www.<strong>newdaystudio.com</strong></span><span class="domain-check">${icon.check}</span></div><div class="domain-note">YOUR BUSINESS. YOUR DIGITAL ADDRESS.</div><div class="domain-mini left">${icon.sparkle}<span>MEMORABLE</span></div><div class="domain-mini right">${icon.check}<span>PROFESSIONAL</span></div></div>
  <div class="bottom-phrase">MAKE EVERY<br><strong>IMPRESSION COUNT.</strong></div>${bottom('03','DOMAIN')}`;
if(step===4)return `<div class="subtle-grid subtle-grid-light"></div><div class="ambient ambient-d"></div><div class="top-brand on-light">ez<span>Sites</span> <i></i> STAY CONNECTED</div>
  <div class="header-block on-light"><div class="eyebrow">${pill('LOOK THE PART',true)}</div><h1>EMAIL THAT<br>MEANS <span>BUSINESS.</span></h1><p>Connect with customers using a professional email address.</p></div>
  <div class="email-stage"><div class="email-orbit"></div><div class="email-address">${icon.mail}<span>hello@<strong>newdaystudio.com</strong></span>${icon.check}</div><div class="email-panel"><div class="mail-panel-top"><div class="mail-brand">N<span>.</span></div><div><strong>INBOX</strong><small>Business messages</small></div><span class="mail-count">1 NEW</span></div><div class="email-row unread"><div class="sender-avatar">AC</div><div class="email-body"><strong>Alex Carter <span>10:42 AM</span></strong><p>Question about your services</p><small>Hi! I just found your website and wanted to...</small></div></div><div class="email-row"><div class="sender-avatar subdued">JD</div><div class="email-body"><strong>Jamie D. <span>YESTERDAY</span></strong><p>Thanks for your help!</p><small>That sounds perfect, thank you so much.</small></div></div></div><div class="email-note">ONE PROFESSIONAL IDENTITY.<br>MORE MEANINGFUL CONVERSATIONS.</div></div>
  <div class="bottom-phrase dark">SOUND LIKE<br><strong>YOUR BUSINESS.</strong></div>${bottom('04','BUSINESS EMAIL')}`;
if(step===5)return `<div class="subtle-grid"></div><div class="ambient ambient-e"></div><div class="top-brand">ez<span>Sites</span> <i></i> CUSTOMER CONNECTIONS</div>
  <div class="header-block"><div class="eyebrow">${pill('TURN VISITORS INTO CONVERSATIONS')}</div><h1>MAKE IT EASY<br>TO <span>REACH YOU.</span></h1><p>Let interested customers get in touch directly from your website.</p></div>
  <div class="contact-stage"><div class="contact-card"><div class="contact-card-head"><span class="contact-mark">N.</span><span>CONTACT NEW DAY &nbsp; ↗</span></div><h3>Let's talk.</h3><p>Have a question? We'd love to hear from you.</p><div class="contact-field">NAME <span>Alex Carter</span></div><div class="contact-field">EMAIL <span>alex@example.com</span></div><div class="contact-field tall">MESSAGE <span>Hi, I'd love to learn more about...</span></div><div class="contact-button">SEND MESSAGE &nbsp; ${icon.arrow}</div></div><div class="notification"><div class="notif-bubble">${icon.mail}</div><div class="notif-content"><span>EZ SITES <b>NOW</b></span><strong>New enquiry!</strong><p>Alex sent you a message</p></div></div><div class="dash-line"></div></div>
  <div class="bottom-phrase">BE THERE WHEN<br><strong>IT MATTERS.</strong></div>${bottom('05','CONNECTIONS')}`;
if(step===6)return `<div class="subtle-grid"></div><div class="ambient ambient-f"></div><div class="end-halo halo-a"></div><div class="end-halo halo-b"></div>
  <div class="outro-upper"><div class="outro-pill">EVERYTHING STARTS WITH BEING FOUND</div><div class="outro-icons"><div>${icon.globe}</div><div class="icon-connector"></div><div>${icon.link}</div><div class="icon-connector"></div><div>${icon.mail}</div></div></div>
  <div class="outro-brand"><div class="brand-mark-shape"><span class="brand-swoosh"></span><span class="brand-dot"></span></div><div class="brand-word">ez<span>Sites</span></div><h1>BRING YOUR<br><em>BUSINESS ONLINE.</em></h1><p>Your presence. Your brand. Your next connection.</p><div class="outro-cta">GET STARTED WITH EZSITES &nbsp; ${icon.arrow}</div></div>
  <div class="outro-lower"><span>BUILT FOR BUSINESS OWNERS.</span><span>EZ SITES</span></div>${bottom('06','EZ SITES')}`;
throw new Error('Unknown scene '+step)
}