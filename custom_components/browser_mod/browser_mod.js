!function(e){var t={};function o(s){if(t[s])return t[s].exports;var n=t[s]={i:s,l:!1,exports:{}};return e[s].call(n.exports,n,n.exports,o),n.l=!0,n.exports}o.m=e,o.c=t,o.d=function(e,t,s){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:s})},o.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var s=Object.create(null);if(o.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)o.d(s,n,function(t){return e[t]}.bind(null,n));return s},o.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="",o(o.s=1)}([function(e){e.exports=JSON.parse('{"name":"browser_mod","private":true,"version":"1.0.1","description":"","scripts":{"build":"webpack","watch":"webpack --watch --mode=development","update-card-tools":"npm uninstall card-tools && npm install person1loven/lovelace-card-tools"},"keywords":[],"author":"person1 Lovén","license":"MIT","devDependencies":{"webpack":"^4.41.2","webpack-cli":"^3.3.10"},"dependencies":{"card-tools":"github:person1loven/lovelace-card-tools"}}')},function(e,t,o){"use strict";o.r(t);let s=function(){if(window.fully&&"function"==typeof fully.getDeviceId)return fully.getDeviceId();if(!localStorage["lovelace-player-device-id"]){const e=()=>Math.floor(1e5*(1+Math.random())).toString(16).substring(1);localStorage["lovelace-player-device-id"]=`${e()}${e()}-${e()}${e()}`}return localStorage["lovelace-player-device-id"]}();function n(){return document.querySelector("hc-main")?document.querySelector("hc-main").hass:document.querySelector("home-assistant")?document.querySelector("home-assistant").hass:void 0}function i(e){return document.querySelector("hc-main")?document.querySelector("hc-main").provideHass(e):document.querySelector("home-assistant")?document.querySelector("home-assistant").provideHass(e):void 0}function r(){var e,t=document.querySelector("hc-main");return t?((e=t._lovelaceConfig).current_view=t._lovelacePath,e):(t=(t=(t=(t=(t=(t=(t=(t=(t=document.querySelector("home-assistant"))&&t.shadowRoot)&&t.querySelector("home-assistant-main"))&&t.shadowRoot)&&t.querySelector("app-drawer-layout partial-panel-resolver"))&&t.shadowRoot||t)&&t.querySelector("ha-panel-lovelace"))&&t.shadowRoot)&&t.querySelector("hui-root"))?((e=t.lovelace).current_view=t.___curView,e):null}function a(){var e=document.querySelector("hc-main");return e=e?(e=(e=(e=e&&e.shadowRoot)&&e.querySelector("hc-lovelace"))&&e.shadowRoot)&&e.querySelector("hui-view"):(e=(e=(e=(e=(e=(e=(e=(e=(e=(e=(e=document.querySelector("home-assistant"))&&e.shadowRoot)&&e.querySelector("home-assistant-main"))&&e.shadowRoot)&&e.querySelector("app-drawer-layout partial-panel-resolver"))&&e.shadowRoot||e)&&e.querySelector("ha-panel-lovelace"))&&e.shadowRoot)&&e.querySelector("hui-root"))&&e.shadowRoot)&&e.querySelector("ha-app-layout #view"))&&e.firstElementChild}function c(e,t,o=null){if((e=new Event(e,{bubbles:!0,cancelable:!1,composed:!0})).detail=t||{},o)o.dispatchEvent(e);else{var s=a();s&&s.dispatchEvent(e)}}const l=customElements.get("home-assistant-main")?Object.getPrototypeOf(customElements.get("home-assistant-main")):Object.getPrototypeOf(customElements.get("hui-view")),d=l.prototype.html,u=l.prototype.css,h="custom:";let p=window.cardHelpers;const m=new Promise(async(e,t)=>{p&&e(),window.loadCardHelpers&&(p=await window.loadCardHelpers(),window.cardHelpers=p,e())});function y(e,t){const o=document.createElement("hui-error-card");return o.setConfig({type:"error",error:e,origConfig:t}),o}function v(e,t){if(!t||"object"!=typeof t||!t.type)return y(`No ${e} type configured`,t);let o=t.type;if(o=o.startsWith(h)?o.substr(h.length):`hui-${o}-${e}`,customElements.get(o))return function(e,t){let o=document.createElement(e);try{o.setConfig(JSON.parse(JSON.stringify(t)))}catch(e){o=y(e,t)}return m.then(()=>{c("ll-rebuild",{},o)}),o}(o,t);const s=y(`Custom element doesn't exist: ${o}.`,t);s.style.display="None";const n=setTimeout(()=>{s.style.display=""},2e3);return customElements.whenDefined(o).then(()=>{clearTimeout(n),c("ll-rebuild",{},s)}),s}const f=2;class w extends l{static get version(){return f}static get properties(){return{noHass:{type:Boolean}}}setConfig(e){this._config=e,this.el?this.el.setConfig(e):(this.el=this.create(e),this._hass&&(this.el.hass=this._hass),this.noHass&&i(this))}set config(e){this.setConfig(e)}set hass(e){this._hass=e,this.el&&(this.el.hass=e)}createRenderRoot(){return this}render(){return d`${this.el}`}}const _=function(e,t){const o=Object.getOwnPropertyDescriptors(t.prototype);for(const[t,s]of Object.entries(o))"constructor"!==t&&Object.defineProperty(e.prototype,t,s);const s=Object.getOwnPropertyDescriptors(t);for(const[t,o]of Object.entries(s))"prototype"!==t&&Object.defineProperty(e,t,o);const n=Object.getPrototypeOf(t),i=Object.getOwnPropertyDescriptors(n.prototype);for(const[t,o]of Object.entries(i))"constructor"!==t&&Object.defineProperty(Object.getPrototypeOf(e).prototype,t,o);const r=Object.getOwnPropertyDescriptors(n);for(const[t,o]of Object.entries(r))"prototype"!==t&&Object.defineProperty(Object.getPrototypeOf(e),t,o)},b=customElements.get("card-maker");if(!b||!b.version||b.version<f){class e extends w{create(e){return function(e){return p?p.createCardElement(e):v("card",e)}(e)}getCardSize(){return this.firstElementChild&&this.firstElementChild.getCardSize?this.firstElementChild.getCardSize():1}}b?_(b,e):customElements.define("card-maker",e)}const g=customElements.get("element-maker");if(!g||!g.version||g.version<f){class e extends w{create(e){return function(e){return p?p.createHuiElement(e):v("element",e)}(e)}}g?_(g,e):customElements.define("element-maker",e)}const S=customElements.get("entity-row-maker");if(!S||!S.version||S.version<f){class e extends w{create(e){return function(e){if(p)return p.createRowElement(e);const t=new Set(["call-service","cast","conditional","divider","section","select","weblink"]);if(!e)return y("Invalid configuration given.",e);if("string"==typeof e&&(e={entity:e}),"object"!=typeof e||!e.entity&&!e.type)return y("Invalid configuration given.",e);const o=e.type||"default";return t.has(o)||o.startsWith(h)?v("row",e):v("entity-row",{type:{alert:"toggle",automation:"toggle",climate:"climate",cover:"cover",fan:"toggle",group:"group",input_boolean:"toggle",input_number:"input-number",input_select:"input-select",input_text:"input-text",light:"toggle",lock:"lock",media_player:"media-player",remote:"toggle",scene:"scene",script:"script",sensor:"sensor",timer:"timer",switch:"toggle",vacuum:"toggle",water_heater:"climate",input_datetime:"input-datetime"}[e.entity.split(".",1)[0]]||"text",...e})}(e)}}S?_(S,e):customElements.define("entity-row-maker",e)}function k(e,t,o=!1,s=null,n=!1){const i=document.querySelector("hc-main")||document.querySelector("home-assistant");c("hass-more-info",{entityId:null},i);const r=i._moreInfoEl;r.close(),r.open();const a=r.shadowRoot.querySelector("more-info-controls");a&&(a.style.display="none");const l=document.createElement("div");l.innerHTML=`\n  <style>\n    app-toolbar {\n      color: var(--more-info-header-color);\n      background-color: var(--more-info-header-background);\n    }\n    .scrollable {\n      overflow: auto;\n      max-width: 100% !important;\n    }\n  </style>\n  ${n?"":`\n      <app-toolbar>\n        <paper-icon-button\n          icon="hass:close"\n          dialog-dismiss=""\n        ></paper-icon-button>\n        <div class="main-title" main-title="">\n          ${e}\n        </div>\n      </app-toolbar>\n      `}\n    <div class="scrollable">\n      <card-maker nohass>\n      </card-maker>\n    </div>\n  `;const d=l.querySelector(".scrollable");d.querySelector("card-maker").config=t,r.sizingTarget=d,r.large=o,r._page="none",r.shadowRoot.appendChild(l);let u={};if(s)for(var h in r.resetFit(),s)u[h]=r.style[h],r.style.setProperty(h,s[h]);return r._dialogOpenChanged=function(e){if(!e&&(this.stateObj&&this.fire("hass-more-info",{entityId:null}),this.shadowRoot==l.parentNode)){this._page=null,this.shadowRoot.removeChild(l);const e=this.shadowRoot.querySelector("more-info-controls");if(e&&(e.style.display="inline"),s)for(var t in r.resetFit(),u)u[t]?r.style.setProperty(t,u[t]):r.style.removeProperty(t)}},r}function E(e,t=!1){const o=document.querySelector("hc-main")||document.querySelector("home-assistant");c("hass-more-info",{entityId:e},o);const s=o._moreInfoEl;return s.large=t,s}class C extends l{setConfig(e){}render(){return d`
        <div>
        Nothing to configure.
        </div>
        `}}var O,q;customElements.get("browser-player-editor")||(customElements.define("browser-player-editor",C),O="browser-player",q="Browser Player",window._registerCard?window._registerCard(O,q):(window._customCardButtons=[],window._registerCard=(e,t)=>{window._customCardButtons.push({el:e,name:t})},customElements.whenDefined("hui-card-picker").then(()=>{customElements.get("hui-card-picker").prototype.firstUpdated=function(){this._customCardButtons=document.createElement("div"),this._customCardButtons.classList.add("cards-container"),this._customCardButtons.id="custom",this._customCardButtons.style.borderTop="1px solid var(--primary-color)",window._customCardButtons.forEach,this.shadowRoot.appendChild(this._customCardButtons),window._customCardButtons.forEach(e=>{const t=document.createElement("mwc-button");t.type="custom:"+e.el,t.innerHTML=e.name,t.addEventListener("click",this._cardPicked),this._customCardButtons.appendChild(t)})}}),window._registerCard(O,q)));customElements.get("browser-player")||customElements.define("browser-player",class extends l{static get properties(){return{hass:{}}}static getConfigElement(){return document.createElement("browser-player-editor")}static getStubConfig(){return{}}setConfig(e){this._config=e}handleMute(e){window.browser_mod.mute({})}handleVolumeChange(e){const t=parseFloat(e.target.value);window.browser_mod.set_volume({volume_level:t})}handleMoreInfo(e){E("media_player."+window.browser_mod.entity_id)}handlePlayPause(e){window.browser_mod.player.paused?window.browser_mod.play({}):window.browser_mod.pause({})}render(){const e=window.browser_mod.player;return d`
    <ha-card>
      <div class="card-content">
      <paper-icon-button
        .icon=${e.muted?"mdi:volume-off":"mdi:volume-high"}
        @click=${this.handleMute}
      ></paper-icon-button>
      <ha-paper-slider
        min=0
        max=1
        step=0.01
        ?disabled=${e.muted}
        value=${e.volume}
        @change=${this.handleVolumeChange}
      ></ha-paper-slider>

      ${"stopped"===window.browser_mod.player_state?d`<div class="placeholder"></div>`:d`
          <paper-icon-button
            .icon=${e.paused?"mdi:play":"mdi:pause"}
            @click=${this.handlePlayPause}
            highlight
          ></paper-icon-button>
          `}
      <paper-icon-button
        .icon=${"mdi:settings"}
        @click=${this.handleMoreInfo}
      ></paper-icon-button>
      </div>

      <div class="device-id">
      ${s}
      </div>

    </ha-card>
    `}static get styles(){return u`
    paper-icon-button[highlight] {
      color: var(--accent-color);
    }
    .card-content {
      display: flex;
      justify-content: center;
    }
    .placeholder {
      width: 24px;
      padding: 8px;
    }
    .device-id {
      opacity: 0.7;
      font-size: xx-small;
      margin-top: -10px;
      user-select: all;
      -webkit-user-select: all;
      -moz-user-select: all;
      -ms-user-select: all;
    }
    `}});window.browser_mod=window.browser_mod||new class{set hass(e){if(!e)return;if(this._hass=e,this.hassPatched)return;const t=e.callService;e.callService=(e,o,n)=>{if(n&&n.deviceID)if(Array.isArray(n.deviceID)){const e=n.deviceID.indexOf("this");-1!==e&&(n.deviceID[e]=s)}else"this"===n.deviceID&&(n.deviceID=s);return t(e,o,n)},this.hassPatched=!0,document.querySelector("hc-main")?document.querySelector("hc-main").hassChanged(e,e):document.querySelector("home-assistant").hassChanged(e,e)}playOnce(e){this._video&&this._video.play(),window.browser_mod.playedOnce||(window.browser_mod.player.play(),window.browser_mod.playedOnce=!0)}_load_lovelace(){if(!function(){if(customElements.get("hui-view"))return!0;const e=document.createElement("partial-panel-resolver");if(e.hass=n(),!e.hass||!e.hass.panels)return!1;e.route={path:"/lovelace/"},e._updateRoutes();try{document.querySelector("home-assistant").appendChild(e)}catch(e){}finally{document.querySelector("home-assistant").removeChild(e)}return!!customElements.get("hui-view")}()){window.setTimeout(this._load_lovelace.bind(this),100)}}constructor(){this.entity_id=s.replace("-","_"),this.cast=null!==document.querySelector("hc-main"),this.cast?this.connect(n().connection):(window.setTimeout(this._load_lovelace.bind(this),500),window.hassConnection.then(e=>this.connect(e.conn)),document.querySelector("home-assistant").addEventListener("hass-more-info",this.popup_card.bind(this))),this.player=new Audio,this.playedOnce=!1,this.autoclose_popup_active=!1;const e=this.update.bind(this);this.player.addEventListener("ended",e),this.player.addEventListener("play",e),this.player.addEventListener("pause",e),this.player.addEventListener("volumechange",e),document.addEventListener("visibilitychange",e),window.addEventListener("location-changed",e),window.addEventListener("click",this.playOnce),window.addEventListener("mousemove",this.no_blackout.bind(this)),window.addEventListener("mousedown",this.no_blackout.bind(this)),window.addEventListener("keydown",this.no_blackout.bind(this)),window.addEventListener("touchstart",this.no_blackout.bind(this)),i(this),window.fully&&(this._fullyMotion=!1,this._motionTimeout=void 0,fully.bind("screenOn","browser_mod.update();"),fully.bind("screenOff","browser_mod.update();"),fully.bind("pluggedAC","browser_mod.update();"),fully.bind("pluggedUSB","browser_mod.update();"),fully.bind("onBatteryLevelChanged","browser_mod.update();"),fully.bind("unplugged","browser_mod.update();"),fully.bind("networkReconnect","browser_mod.update();"),fully.bind("onMotion","browser_mod.fullyMotion();")),this._screenSaver=void 0,this._screenSaverTimer=void 0,this._screenSaverTime=0,this._blackout=document.createElement("div"),this._blackout.style.cssText="\n    position: fixed;\n    left: 0;\n    top: 0;\n    padding: 0;\n    margin: 0;\n    width: 100%;\n    height: 100%;\n    background: black;\n    visibility: hidden;\n    ",document.body.appendChild(this._blackout);const t=o(0);console.info(`%cBROWSER_MOD ${t.version} IS INSTALLED\n    %cDeviceID: ${s}`,"color: green; font-weight: bold","")}connect(e){this.conn=e,e.subscribeMessage(e=>this.callback(e),{type:"browser_mod/connect",deviceID:s})}callback(e){switch(e.command){case"update":this.update(e);break;case"debug":this.debug(e);break;case"play":this.play(e);break;case"pause":this.pause(e);break;case"stop":this.stop(e);break;case"set_volume":this.set_volume(e);break;case"mute":this.mute(e);break;case"toast":this.toast(e);break;case"popup":this.popup(e);break;case"close-popup":this.close_popup(e);break;case"navigate":this.navigate(e);break;case"more-info":this.more_info(e);break;case"set-theme":this.set_theme(e);break;case"lovelace-reload":this.lovelace_reload(e);break;case"blackout":this.blackout(e);break;case"no-blackout":this.no_blackout(e)}}get player_state(){return this.player.src?this.player.ended?"stopped":this.player.paused?"paused":"playing":"stopped"}popup_card(e){const t=document.querySelector("home-assistant")._moreInfoEl;if(t&&!t.getAttribute("aria-hidden"))return;if(!r())return;const o=r(),s={...o.config.popup_cards,...o.config.views[o.current_view].popup_cards};if(!e.detail||!e.detail.entityId)return;const n=s[e.detail.entityId];n&&k(n.title,n.card,n.large||!1,n.style)}debug(e){k("deviceID",{type:"markdown",content:`# ${s}`}),alert(s)}_set_screensaver(e,t){if(clearTimeout(this._screenSaverTimer),e){if(-1==(t=parseInt(t)))return clearTimeout(this._screenSaverTimer),void(this._screenSaverTime=0);this._screenSaverTime=1e3*t,this._screenSaver=e,this._screenSaverTimer=setTimeout(this._screenSaver,this._screenSaverTime)}else this._screenSaverTime&&(this._screenSaverTimer=setTimeout(this._screenSaver,this._screenSaverTime))}play(e){const t=e.media_content_id;t&&(this.player.src=t),this.player.play()}pause(e){this.player.pause()}stop(e){this.player.pause(),this.player.src=null}set_volume(e){void 0!==e.volume_level&&(this.player.volume=e.volume_level)}mute(e){void 0===e.mute&&(e.mute=!this.player.muted),this.player.muted=Boolean(e.mute)}toast(e){e.message&&c("hass-notification",{message:e.message,duration:void 0!==e.duration?parseInt(e.duration):void 0},document.querySelector("home-assistant"))}popup(e){if(!e.title&&!e.auto_close)return;if(!e.card)return;const t=()=>{k(e.title,e.card,e.large,e.style,e.auto_close),e.auto_close&&(this.autoclose_popup_active=!0)};e.auto_close&&e.time?this._set_screensaver(t,e.time):t()}close_popup(e){this._set_screensaver(),this.autoclose_popup_active=!1,function(){const e=document.querySelector("hc-main")||document.querySelector("home-assistant"),t=e&&e._moreInfoEl;t&&t.close()}()}navigate(e){e.navigation_path&&(history.pushState(null,"",e.navigation_path),c("location-changed",{},document.querySelector("home-assistant")))}more_info(e){e.entity_id&&E(e.entity_id,e.large)}set_theme(e){e.theme||(e.theme="default"),c("settheme",e.theme,document.querySelector("home-assistant"))}lovelace_reload(e){const t=a();t&&c("config-refresh",{},t)}blackout(e){const t=()=>{window.fully?fully.turnScreenOff():this._blackout.style.visibility="visible",this.update()};e.time?this._set_screensaver(t,e.time):t()}no_blackout(e){if(this._set_screensaver(),this.autoclose_popup_active)return this.close_popup();window.fully?(fully.getScreenOn()||fully.turnScreenOn(),e.brightness&&fully.setScreenBrightness(e.brightness),this.update()):"hidden"!==this._blackout.style.visibility&&(this._blackout.style.visibility="hidden",this.update())}is_blackout(){return window.fully?!fully.getScreenOn():Boolean("visible"===this._blackout.style.visibility)}fullyMotion(){this._fullyMotion=!0,clearTimeout(this._motionTimeout),this._motionTimeout=setTimeout(()=>{this._fullyMotion=!1,this.update()},5e3),this.update()}start_camera(){this._video||(this._video=document.createElement("video"),this._video.autoplay=!0,this._video.playsInline=!0,this._video.style.cssText="\n    visibility: hidden;\n    width: 0;\n    height: 0;\n    ",this._canvas=document.createElement("canvas"),this._canvas.style.cssText="\n    visibility: hidden;\n    width: 0;\n    height: 0;\n    ",document.body.appendChild(this._canvas),document.body.appendChild(this._video),navigator.mediaDevices.getUserMedia({video:!0,audio:!1}).then(e=>{this._video.srcObject=e,this._video.play(),this.send_cam()}))}send_cam(e){this._canvas.getContext("2d").drawImage(this._video,0,0,this._canvas.width,this._canvas.height),this.conn.sendMessage({type:"browser_mod/update",deviceID:s,data:{camera:this._canvas.toDataURL("image/png")}}),setTimeout(this.send_cam.bind(this),5e3)}update(e=null){this.conn&&(e&&(e.name&&(this.entity_id=e.name.toLowerCase()),e.camera&&this.start_camera()),this.conn.sendMessage({type:"browser_mod/update",deviceID:s,data:{browser:{path:window.location.pathname,visibility:document.visibilityState,userAgent:navigator.userAgent,currentUser:this._hass&&this._hass.user&&this._hass.user.name,fullyKiosk:!!window.fully||void 0,width:window.innerWidth,height:window.innerHeight},player:{volume:this.player.volume,muted:this.player.muted,src:this.player.src,state:this.player_state},screen:{blackout:this.is_blackout(),brightness:window.fully?fully.getScreenBrightness():void 0},fully:window.fully?{battery:window.fully?fully.getBatteryLevel():void 0,charging:window.fully?fully.isPlugged():void 0,motion:window.fully?this._fullyMotion:void 0}:void 0}}))}}}]);