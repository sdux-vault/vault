var Ly=Object.defineProperty,Kw=Object.defineProperties,Zw=Object.getOwnPropertyDescriptor,Yw=Object.getOwnPropertyDescriptors;var Py=Object.getOwnPropertySymbols;var Qw=Object.prototype.hasOwnProperty,Xw=Object.prototype.propertyIsEnumerable;var Fy=e=>{throw TypeError(e)};var Qd=(e,t,n)=>t in e?Ly(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,g=(e,t)=>{for(var n in t||={})Qw.call(t,n)&&Qd(e,n,t[n]);if(Py)for(var n of Py(t))Xw.call(t,n)&&Qd(e,n,t[n]);return e},$=(e,t)=>Kw(e,Yw(t));var Q=(e,t,n,r)=>{for(var i=r>1?void 0:r?Zw(t,n):t,o=e.length-1,s;o>=0;o--)(s=e[o])&&(i=(r?s(t,n,i):s(i))||i);return r&&i&&Ly(t,n,i),i};var b=(e,t,n)=>Qd(e,typeof t!="symbol"?t+"":t,n),Xd=(e,t,n)=>t.has(e)||Fy("Cannot "+n);var Jd=(e,t,n)=>(Xd(e,t,"read from private field"),n?n.call(e):t.get(e)),so=(e,t,n)=>t.has(e)?Fy("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,n),ef=(e,t,n,r)=>(Xd(e,t,"write to private field"),r?r.call(e,n):t.set(e,n),n),nr=(e,t,n)=>(Xd(e,t,"access private method"),n);var nt=null,Dc=!1,tf=1,Jw=null,rt=Symbol("SIGNAL");function A(e){let t=nt;return nt=e,t}function Tc(){return nt}var ci={version:0,lastCleanEpoch:0,dirty:!1,producers:void 0,producersTail:void 0,consumers:void 0,consumersTail:void 0,recomputing:!1,consumerAllowSignalWrites:!1,consumerIsAlwaysLive:!1,kind:"unknown",producerMustRecompute:()=>!1,producerRecomputeValue:()=>{},consumerMarkedDirty:()=>{},consumerOnSignalRead:()=>{}};function ao(e){if(Dc)throw new Error("");if(nt===null)return;nt.consumerOnSignalRead(e);let t=nt.producersTail;if(t!==void 0&&t.producer===e)return;let n,r=nt.recomputing;if(r&&(n=t!==void 0?t.nextProducer:nt.producers,n!==void 0&&n.producer===e)){nt.producersTail=n,n.lastReadVersion=e.version;return}let i=e.consumersTail;if(i!==void 0&&i.consumer===nt&&(!r||tT(i,nt)))return;let o=lo(nt),s={producer:e,consumer:nt,nextProducer:n,prevConsumer:i,lastReadVersion:e.version,nextConsumer:void 0};nt.producersTail=s,t!==void 0?t.nextProducer=s:nt.producers=s,o&&Uy(e,s)}function By(){tf++}function Ic(e){if(!(lo(e)&&!e.dirty)&&!(!e.dirty&&e.lastCleanEpoch===tf)){if(!e.producerMustRecompute(e)&&!Ts(e)){wc(e);return}e.producerRecomputeValue(e),wc(e)}}function nf(e){if(e.consumers===void 0)return;let t=Dc;Dc=!0;try{for(let n=e.consumers;n!==void 0;n=n.nextConsumer){let r=n.consumer;r.dirty||eT(r)}}finally{Dc=t}}function rf(){return nt?.consumerAllowSignalWrites!==!1}function eT(e){e.dirty=!0,nf(e),e.consumerMarkedDirty?.(e)}function wc(e){e.dirty=!1,e.lastCleanEpoch=tf}function li(e){return e&&jy(e),A(e)}function jy(e){e.producersTail=void 0,e.recomputing=!0}function co(e,t){A(t),e&&Vy(e)}function Vy(e){e.recomputing=!1;let t=e.producersTail,n=t!==void 0?t.nextProducer:e.producers;if(n!==void 0){if(lo(e))do n=of(n);while(n!==void 0);t!==void 0?t.nextProducer=void 0:e.producers=void 0}}function Ts(e){for(let t=e.producers;t!==void 0;t=t.nextProducer){let n=t.producer,r=t.lastReadVersion;if(r!==n.version||(Ic(n),r!==n.version))return!0}return!1}function ui(e){if(lo(e)){let t=e.producers;for(;t!==void 0;)t=of(t)}e.producers=void 0,e.producersTail=void 0,e.consumers=void 0,e.consumersTail=void 0}function Uy(e,t){let n=e.consumersTail,r=lo(e);if(n!==void 0?(t.nextConsumer=n.nextConsumer,n.nextConsumer=t):(t.nextConsumer=void 0,e.consumers=t),t.prevConsumer=n,e.consumersTail=t,!r)for(let i=e.producers;i!==void 0;i=i.nextProducer)Uy(i.producer,i)}function of(e){let t=e.producer,n=e.nextProducer,r=e.nextConsumer,i=e.prevConsumer;if(e.nextConsumer=void 0,e.prevConsumer=void 0,r!==void 0?r.prevConsumer=i:t.consumersTail=i,i!==void 0)i.nextConsumer=r;else if(t.consumers=r,!lo(t)){let o=t.producers;for(;o!==void 0;)o=of(o)}return n}function lo(e){return e.consumerIsAlwaysLive||e.consumers!==void 0}function Sc(e){Jw?.(e)}function tT(e,t){let n=t.producersTail;if(n!==void 0){let r=t.producers;do{if(r===e)return!0;if(r===n)break;r=r.nextProducer}while(r!==void 0)}return!1}function Mc(e,t){return Object.is(e,t)}function xc(e,t){let n=Object.create(nT);n.computation=e,t!==void 0&&(n.equal=t);let r=()=>{if(Ic(n),ao(n),n.value===ws)throw n.error;return n.value};return r[rt]=n,Sc(n),r}var _c=Symbol("UNSET"),Ec=Symbol("COMPUTING"),ws=Symbol("ERRORED"),nT=$(g({},ci),{value:_c,dirty:!0,error:null,equal:Mc,kind:"computed",producerMustRecompute(e){return e.value===_c||e.value===Ec},producerRecomputeValue(e){if(e.value===Ec)throw new Error("");let t=e.value;e.value=Ec;let n=li(e),r,i=!1;try{r=e.computation(),A(null),i=t!==_c&&t!==ws&&r!==ws&&e.equal(t,r)}catch(o){r=ws,e.error=o}finally{co(e,n)}if(i){e.value=t;return}e.value=r,e.version++}});function rT(){throw new Error}var $y=rT;function Hy(e){$y(e)}function sf(e){$y=e}var iT=null;function af(e,t){let n=Object.create(Rc);n.value=e,t!==void 0&&(n.equal=t);let r=()=>zy(n);return r[rt]=n,Sc(n),[r,s=>uo(n,s),s=>cf(n,s)]}function zy(e){return ao(e),e.value}function uo(e,t){rf()||Hy(e),e.equal(e.value,t)||(e.value=t,oT(e))}function cf(e,t){rf()||Hy(e),uo(e,t(e.value))}var Rc=$(g({},ci),{equal:Mc,value:void 0,kind:"signal"});function oT(e){e.version++,By(),nf(e),iT?.(e)}var lf=$(g({},ci),{consumerIsAlwaysLive:!0,consumerAllowSignalWrites:!0,dirty:!0,kind:"effect"});function uf(e){if(e.dirty=!1,e.version>0&&!Ts(e))return;e.version++;let t=li(e);try{e.cleanup(),e.fn()}finally{co(e,t)}}function V(e){return typeof e=="function"}function fo(e){let n=e(r=>{Error.call(r),r.stack=new Error().stack});return n.prototype=Object.create(Error.prototype),n.prototype.constructor=n,n}var Ac=fo(e=>function(n){e(this),this.message=n?`${n.length} errors occurred during unsubscription:
${n.map((r,i)=>`${i+1}) ${r.toString()}`).join(`
  `)}`:"",this.name="UnsubscriptionError",this.errors=n});function di(e,t){if(e){let n=e.indexOf(t);0<=n&&e.splice(n,1)}}var oe=class e{constructor(t){this.initialTeardown=t,this.closed=!1,this._parentage=null,this._finalizers=null}unsubscribe(){let t;if(!this.closed){this.closed=!0;let{_parentage:n}=this;if(n)if(this._parentage=null,Array.isArray(n))for(let o of n)o.remove(this);else n.remove(this);let{initialTeardown:r}=this;if(V(r))try{r()}catch(o){t=o instanceof Ac?o.errors:[o]}let{_finalizers:i}=this;if(i){this._finalizers=null;for(let o of i)try{Wy(o)}catch(s){t=t??[],s instanceof Ac?t=[...t,...s.errors]:t.push(s)}}if(t)throw new Ac(t)}}add(t){var n;if(t&&t!==this)if(this.closed)Wy(t);else{if(t instanceof e){if(t.closed||t._hasParent(this))return;t._addParent(this)}(this._finalizers=(n=this._finalizers)!==null&&n!==void 0?n:[]).push(t)}}_hasParent(t){let{_parentage:n}=this;return n===t||Array.isArray(n)&&n.includes(t)}_addParent(t){let{_parentage:n}=this;this._parentage=Array.isArray(n)?(n.push(t),n):n?[n,t]:t}_removeParent(t){let{_parentage:n}=this;n===t?this._parentage=null:Array.isArray(n)&&di(n,t)}remove(t){let{_finalizers:n}=this;n&&di(n,t),t instanceof e&&t._removeParent(this)}};oe.EMPTY=(()=>{let e=new oe;return e.closed=!0,e})();var df=oe.EMPTY;function kc(e){return e instanceof oe||e&&"closed"in e&&V(e.remove)&&V(e.add)&&V(e.unsubscribe)}function Wy(e){V(e)?e():e.unsubscribe()}var vn={onUnhandledError:null,onStoppedNotification:null,Promise:void 0,useDeprecatedSynchronousErrorHandling:!1,useDeprecatedNextContext:!1};var po={setTimeout(e,t,...n){let{delegate:r}=po;return r?.setTimeout?r.setTimeout(e,t,...n):setTimeout(e,t,...n)},clearTimeout(e){let{delegate:t}=po;return(t?.clearTimeout||clearTimeout)(e)},delegate:void 0};function Nc(e){po.setTimeout(()=>{let{onUnhandledError:t}=vn;if(t)t(e);else throw e})}function Is(){}var Gy=ff("C",void 0,void 0);function qy(e){return ff("E",void 0,e)}function Ky(e){return ff("N",e,void 0)}function ff(e,t,n){return{kind:e,value:t,error:n}}var fi=null;function ho(e){if(vn.useDeprecatedSynchronousErrorHandling){let t=!fi;if(t&&(fi={errorThrown:!1,error:null}),e(),t){let{errorThrown:n,error:r}=fi;if(fi=null,n)throw r}}else e()}function Zy(e){vn.useDeprecatedSynchronousErrorHandling&&fi&&(fi.errorThrown=!0,fi.error=e)}var pi=class extends oe{constructor(t){super(),this.isStopped=!1,t?(this.destination=t,kc(t)&&t.add(this)):this.destination=cT}static create(t,n,r){return new bn(t,n,r)}next(t){this.isStopped?hf(Ky(t),this):this._next(t)}error(t){this.isStopped?hf(qy(t),this):(this.isStopped=!0,this._error(t))}complete(){this.isStopped?hf(Gy,this):(this.isStopped=!0,this._complete())}unsubscribe(){this.closed||(this.isStopped=!0,super.unsubscribe(),this.destination=null)}_next(t){this.destination.next(t)}_error(t){try{this.destination.error(t)}finally{this.unsubscribe()}}_complete(){try{this.destination.complete()}finally{this.unsubscribe()}}},sT=Function.prototype.bind;function pf(e,t){return sT.call(e,t)}var mf=class{constructor(t){this.partialObserver=t}next(t){let{partialObserver:n}=this;if(n.next)try{n.next(t)}catch(r){Oc(r)}}error(t){let{partialObserver:n}=this;if(n.error)try{n.error(t)}catch(r){Oc(r)}else Oc(t)}complete(){let{partialObserver:t}=this;if(t.complete)try{t.complete()}catch(n){Oc(n)}}},bn=class extends pi{constructor(t,n,r){super();let i;if(V(t)||!t)i={next:t??void 0,error:n??void 0,complete:r??void 0};else{let o;this&&vn.useDeprecatedNextContext?(o=Object.create(t),o.unsubscribe=()=>this.unsubscribe(),i={next:t.next&&pf(t.next,o),error:t.error&&pf(t.error,o),complete:t.complete&&pf(t.complete,o)}):i=t}this.destination=new mf(i)}};function Oc(e){vn.useDeprecatedSynchronousErrorHandling?Zy(e):Nc(e)}function aT(e){throw e}function hf(e,t){let{onStoppedNotification:n}=vn;n&&po.setTimeout(()=>n(e,t))}var cT={closed:!0,next:Is,error:aT,complete:Is};var mo=typeof Symbol=="function"&&Symbol.observable||"@@observable";function Pt(e){return e}function gf(...e){return yf(e)}function yf(e){return e.length===0?Pt:e.length===1?e[0]:function(n){return e.reduce((r,i)=>i(r),n)}}var P=(()=>{class e{constructor(n){n&&(this._subscribe=n)}lift(n){let r=new e;return r.source=this,r.operator=n,r}subscribe(n,r,i){let o=uT(n)?n:new bn(n,r,i);return ho(()=>{let{operator:s,source:a}=this;o.add(s?s.call(o,a):a?this._subscribe(o):this._trySubscribe(o))}),o}_trySubscribe(n){try{return this._subscribe(n)}catch(r){n.error(r)}}forEach(n,r){return r=Yy(r),new r((i,o)=>{let s=new bn({next:a=>{try{n(a)}catch(c){o(c),s.unsubscribe()}},error:o,complete:i});this.subscribe(s)})}_subscribe(n){var r;return(r=this.source)===null||r===void 0?void 0:r.subscribe(n)}[mo](){return this}pipe(...n){return yf(n)(this)}toPromise(n){return n=Yy(n),new n((r,i)=>{let o;this.subscribe(s=>o=s,s=>i(s),()=>r(o))})}}return e.create=t=>new e(t),e})();function Yy(e){var t;return(t=e??vn.Promise)!==null&&t!==void 0?t:Promise}function lT(e){return e&&V(e.next)&&V(e.error)&&V(e.complete)}function uT(e){return e&&e instanceof pi||lT(e)&&kc(e)}function dT(e){return V(e?.lift)}function z(e){return t=>{if(dT(t))return t.lift(function(n){try{return e(n,this)}catch(r){this.error(r)}});throw new TypeError("Unable to lift unknown Observable type")}}function W(e,t,n,r,i){return new vf(e,t,n,r,i)}var vf=class extends pi{constructor(t,n,r,i,o,s){super(t),this.onFinalize=o,this.shouldUnsubscribe=s,this._next=n?function(a){try{n(a)}catch(c){t.error(c)}}:super._next,this._error=i?function(a){try{i(a)}catch(c){t.error(c)}finally{this.unsubscribe()}}:super._error,this._complete=r?function(){try{r()}catch(a){t.error(a)}finally{this.unsubscribe()}}:super._complete}unsubscribe(){var t;if(!this.shouldUnsubscribe||this.shouldUnsubscribe()){let{closed:n}=this;super.unsubscribe(),!n&&((t=this.onFinalize)===null||t===void 0||t.call(this))}}};var Qy=fo(e=>function(){e(this),this.name="ObjectUnsubscribedError",this.message="object unsubscribed"});var M=(()=>{class e extends P{constructor(){super(),this.closed=!1,this.currentObservers=null,this.observers=[],this.isStopped=!1,this.hasError=!1,this.thrownError=null}lift(n){let r=new Pc(this,this);return r.operator=n,r}_throwIfClosed(){if(this.closed)throw new Qy}next(n){ho(()=>{if(this._throwIfClosed(),!this.isStopped){this.currentObservers||(this.currentObservers=Array.from(this.observers));for(let r of this.currentObservers)r.next(n)}})}error(n){ho(()=>{if(this._throwIfClosed(),!this.isStopped){this.hasError=this.isStopped=!0,this.thrownError=n;let{observers:r}=this;for(;r.length;)r.shift().error(n)}})}complete(){ho(()=>{if(this._throwIfClosed(),!this.isStopped){this.isStopped=!0;let{observers:n}=this;for(;n.length;)n.shift().complete()}})}unsubscribe(){this.isStopped=this.closed=!0,this.observers=this.currentObservers=null}get observed(){var n;return((n=this.observers)===null||n===void 0?void 0:n.length)>0}_trySubscribe(n){return this._throwIfClosed(),super._trySubscribe(n)}_subscribe(n){return this._throwIfClosed(),this._checkFinalizedStatuses(n),this._innerSubscribe(n)}_innerSubscribe(n){let{hasError:r,isStopped:i,observers:o}=this;return r||i?df:(this.currentObservers=null,o.push(n),new oe(()=>{this.currentObservers=null,di(o,n)}))}_checkFinalizedStatuses(n){let{hasError:r,thrownError:i,isStopped:o}=this;r?n.error(i):o&&n.complete()}asObservable(){let n=new P;return n.source=this,n}}return e.create=(t,n)=>new Pc(t,n),e})(),Pc=class extends M{constructor(t,n){super(),this.destination=t,this.source=n}next(t){var n,r;(r=(n=this.destination)===null||n===void 0?void 0:n.next)===null||r===void 0||r.call(n,t)}error(t){var n,r;(r=(n=this.destination)===null||n===void 0?void 0:n.error)===null||r===void 0||r.call(n,t)}complete(){var t,n;(n=(t=this.destination)===null||t===void 0?void 0:t.complete)===null||n===void 0||n.call(t)}_subscribe(t){var n,r;return(r=(n=this.source)===null||n===void 0?void 0:n.subscribe(t))!==null&&r!==void 0?r:df}};var Re=class extends M{constructor(t){super(),this._value=t}get value(){return this.getValue()}_subscribe(t){let n=super._subscribe(t);return!n.closed&&t.next(this._value),n}getValue(){let{hasError:t,thrownError:n,_value:r}=this;if(t)throw n;return this._throwIfClosed(),r}next(t){super.next(this._value=t)}};var Ss={now(){return(Ss.delegate||Date).now()},delegate:void 0};var Rr=class extends M{constructor(t=1/0,n=1/0,r=Ss){super(),this._bufferSize=t,this._windowTime=n,this._timestampProvider=r,this._buffer=[],this._infiniteTimeWindow=!0,this._infiniteTimeWindow=n===1/0,this._bufferSize=Math.max(1,t),this._windowTime=Math.max(1,n)}next(t){let{isStopped:n,_buffer:r,_infiniteTimeWindow:i,_timestampProvider:o,_windowTime:s}=this;n||(r.push(t),!i&&r.push(o.now()+s)),this._trimBuffer(),super.next(t)}_subscribe(t){this._throwIfClosed(),this._trimBuffer();let n=this._innerSubscribe(t),{_infiniteTimeWindow:r,_buffer:i}=this,o=i.slice();for(let s=0;s<o.length&&!t.closed;s+=r?1:2)t.next(o[s]);return this._checkFinalizedStatuses(t),n}_trimBuffer(){let{_bufferSize:t,_timestampProvider:n,_buffer:r,_infiniteTimeWindow:i}=this,o=(i?1:2)*t;if(t<1/0&&o<r.length&&r.splice(0,r.length-o),!i){let s=n.now(),a=0;for(let c=1;c<r.length&&r[c]<=s;c+=2)a=c;a&&r.splice(0,a+1)}}};var Lc=class extends oe{constructor(t,n){super()}schedule(t,n=0){return this}};var Ms={setInterval(e,t,...n){let{delegate:r}=Ms;return r?.setInterval?r.setInterval(e,t,...n):setInterval(e,t,...n)},clearInterval(e){let{delegate:t}=Ms;return(t?.clearInterval||clearInterval)(e)},delegate:void 0};var Fc=class extends Lc{constructor(t,n){super(t,n),this.scheduler=t,this.work=n,this.pending=!1}schedule(t,n=0){var r;if(this.closed)return this;this.state=t;let i=this.id,o=this.scheduler;return i!=null&&(this.id=this.recycleAsyncId(o,i,n)),this.pending=!0,this.delay=n,this.id=(r=this.id)!==null&&r!==void 0?r:this.requestAsyncId(o,this.id,n),this}requestAsyncId(t,n,r=0){return Ms.setInterval(t.flush.bind(t,this),r)}recycleAsyncId(t,n,r=0){if(r!=null&&this.delay===r&&this.pending===!1)return n;n!=null&&Ms.clearInterval(n)}execute(t,n){if(this.closed)return new Error("executing a cancelled action");this.pending=!1;let r=this._execute(t,n);if(r)return r;this.pending===!1&&this.id!=null&&(this.id=this.recycleAsyncId(this.scheduler,this.id,null))}_execute(t,n){let r=!1,i;try{this.work(t)}catch(o){r=!0,i=o||new Error("Scheduled action threw falsy error")}if(r)return this.unsubscribe(),i}unsubscribe(){if(!this.closed){let{id:t,scheduler:n}=this,{actions:r}=n;this.work=this.state=this.scheduler=null,this.pending=!1,di(r,this),t!=null&&(this.id=this.recycleAsyncId(n,t,null)),this.delay=null,super.unsubscribe()}}};var go=class e{constructor(t,n=e.now){this.schedulerActionCtor=t,this.now=n}schedule(t,n=0,r){return new this.schedulerActionCtor(this,t).schedule(r,n)}};go.now=Ss.now;var Bc=class extends go{constructor(t,n=go.now){super(t,n),this.actions=[],this._active=!1}flush(t){let{actions:n}=this;if(this._active){n.push(t);return}let r;this._active=!0;do if(r=t.execute(t.state,t.delay))break;while(t=n.shift());if(this._active=!1,r){for(;t=n.shift();)t.unsubscribe();throw r}}};var xs=new Bc(Fc),Xy=xs;var pe=new P(e=>e.complete());function jc(e){return e&&V(e.schedule)}function bf(e){return e[e.length-1]}function Vc(e){return V(bf(e))?e.pop():void 0}function Bn(e){return jc(bf(e))?e.pop():void 0}function Jy(e,t){return typeof bf(e)=="number"?e.pop():t}function Rs(e,t,n,r){var i=arguments.length,o=i<3?t:r===null?r=Object.getOwnPropertyDescriptor(t,n):r,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")o=Reflect.decorate(e,t,n,r);else for(var a=e.length-1;a>=0;a--)(s=e[a])&&(o=(i<3?s(o):i>3?s(t,n,o):s(t,n))||o);return i>3&&o&&Object.defineProperty(t,n,o),o}function tv(e,t,n,r){function i(o){return o instanceof n?o:new n(function(s){s(o)})}return new(n||(n=Promise))(function(o,s){function a(u){try{l(r.next(u))}catch(d){s(d)}}function c(u){try{l(r.throw(u))}catch(d){s(d)}}function l(u){u.done?o(u.value):i(u.value).then(a,c)}l((r=r.apply(e,t||[])).next())})}function ev(e){var t=typeof Symbol=="function"&&Symbol.iterator,n=t&&e[t],r=0;if(n)return n.call(e);if(e&&typeof e.length=="number")return{next:function(){return e&&r>=e.length&&(e=void 0),{value:e&&e[r++],done:!e}}};throw new TypeError(t?"Object is not iterable.":"Symbol.iterator is not defined.")}function hi(e){return this instanceof hi?(this.v=e,this):new hi(e)}function nv(e,t,n){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var r=n.apply(e,t||[]),i,o=[];return i=Object.create((typeof AsyncIterator=="function"?AsyncIterator:Object).prototype),a("next"),a("throw"),a("return",s),i[Symbol.asyncIterator]=function(){return this},i;function s(p){return function(m){return Promise.resolve(m).then(p,d)}}function a(p,m){r[p]&&(i[p]=function(D){return new Promise(function(T,S){o.push([p,D,T,S])>1||c(p,D)})},m&&(i[p]=m(i[p])))}function c(p,m){try{l(r[p](m))}catch(D){f(o[0][3],D)}}function l(p){p.value instanceof hi?Promise.resolve(p.value.v).then(u,d):f(o[0][2],p)}function u(p){c("next",p)}function d(p){c("throw",p)}function f(p,m){p(m),o.shift(),o.length&&c(o[0][0],o[0][1])}}function rv(e){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var t=e[Symbol.asyncIterator],n;return t?t.call(e):(e=typeof ev=="function"?ev(e):e[Symbol.iterator](),n={},r("next"),r("throw"),r("return"),n[Symbol.asyncIterator]=function(){return this},n);function r(o){n[o]=e[o]&&function(s){return new Promise(function(a,c){s=e[o](s),i(a,c,s.done,s.value)})}}function i(o,s,a,c){Promise.resolve(c).then(function(l){o({value:l,done:a})},s)}}var Uc=e=>e&&typeof e.length=="number"&&typeof e!="function";function $c(e){return V(e?.then)}function Hc(e){return V(e[mo])}function zc(e){return Symbol.asyncIterator&&V(e?.[Symbol.asyncIterator])}function Wc(e){return new TypeError(`You provided ${e!==null&&typeof e=="object"?"an invalid object":`'${e}'`} where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.`)}function fT(){return typeof Symbol!="function"||!Symbol.iterator?"@@iterator":Symbol.iterator}var Gc=fT();function qc(e){return V(e?.[Gc])}function Kc(e){return nv(this,arguments,function*(){let n=e.getReader();try{for(;;){let{value:r,done:i}=yield hi(n.read());if(i)return yield hi(void 0);yield yield hi(r)}}finally{n.releaseLock()}})}function Zc(e){return V(e?.getReader)}function he(e){if(e instanceof P)return e;if(e!=null){if(Hc(e))return pT(e);if(Uc(e))return hT(e);if($c(e))return mT(e);if(zc(e))return iv(e);if(qc(e))return gT(e);if(Zc(e))return yT(e)}throw Wc(e)}function pT(e){return new P(t=>{let n=e[mo]();if(V(n.subscribe))return n.subscribe(t);throw new TypeError("Provided object does not correctly implement Symbol.observable")})}function hT(e){return new P(t=>{for(let n=0;n<e.length&&!t.closed;n++)t.next(e[n]);t.complete()})}function mT(e){return new P(t=>{e.then(n=>{t.closed||(t.next(n),t.complete())},n=>t.error(n)).then(null,Nc)})}function gT(e){return new P(t=>{for(let n of e)if(t.next(n),t.closed)return;t.complete()})}function iv(e){return new P(t=>{vT(e,t).catch(n=>t.error(n))})}function yT(e){return iv(Kc(e))}function vT(e,t){var n,r,i,o;return tv(this,void 0,void 0,function*(){try{for(n=rv(e);r=yield n.next(),!r.done;){let s=r.value;if(t.next(s),t.closed)return}}catch(s){i={error:s}}finally{try{r&&!r.done&&(o=n.return)&&(yield o.call(n))}finally{if(i)throw i.error}}t.complete()})}function Et(e,t,n,r=0,i=!1){let o=t.schedule(function(){n(),i?e.add(this.schedule(null,r)):this.unsubscribe()},r);if(e.add(o),!i)return o}function Yc(e,t=0){return z((n,r)=>{n.subscribe(W(r,i=>Et(r,e,()=>r.next(i),t),()=>Et(r,e,()=>r.complete(),t),i=>Et(r,e,()=>r.error(i),t)))})}function Qc(e,t=0){return z((n,r)=>{r.add(e.schedule(()=>n.subscribe(r),t))})}function ov(e,t){return he(e).pipe(Qc(t),Yc(t))}function sv(e,t){return he(e).pipe(Qc(t),Yc(t))}function av(e,t){return new P(n=>{let r=0;return t.schedule(function(){r===e.length?n.complete():(n.next(e[r++]),n.closed||this.schedule())})})}function cv(e,t){return new P(n=>{let r;return Et(n,t,()=>{r=e[Gc](),Et(n,t,()=>{let i,o;try{({value:i,done:o}=r.next())}catch(s){n.error(s);return}o?n.complete():n.next(i)},0,!0)}),()=>V(r?.return)&&r.return()})}function Xc(e,t){if(!e)throw new Error("Iterable cannot be null");return new P(n=>{Et(n,t,()=>{let r=e[Symbol.asyncIterator]();Et(n,t,()=>{r.next().then(i=>{i.done?n.complete():n.next(i.value)})},0,!0)})})}function lv(e,t){return Xc(Kc(e),t)}function uv(e,t){if(e!=null){if(Hc(e))return ov(e,t);if(Uc(e))return av(e,t);if($c(e))return sv(e,t);if(zc(e))return Xc(e,t);if(qc(e))return cv(e,t);if(Zc(e))return lv(e,t)}throw Wc(e)}function Ae(e,t){return t?uv(e,t):he(e)}function I(...e){let t=Bn(e);return Ae(e,t)}function Cf(e,t){let n=V(e)?e:()=>e,r=i=>i.error(n());return new P(t?i=>t.schedule(r,0,i):r)}function jn(e){return!!e&&(e instanceof P||V(e.lift)&&V(e.subscribe))}var rr=fo(e=>function(){e(this),this.name="EmptyError",this.message="no elements in sequence"});function yo(e,t){let n=typeof t=="object";return new Promise((r,i)=>{let o=new bn({next:s=>{r(s),o.unsubscribe()},error:i,complete:()=>{n?r(t.defaultValue):i(new rr)}});e.subscribe(o)})}function dv(e){return e instanceof Date&&!isNaN(e)}function ee(e,t){return z((n,r)=>{let i=0;n.subscribe(W(r,o=>{r.next(e.call(t,o,i++))}))})}var{isArray:bT}=Array;function CT(e,t){return bT(t)?e(...t):e(t)}function Jc(e){return ee(t=>CT(e,t))}var{isArray:DT}=Array,{getPrototypeOf:_T,prototype:ET,keys:wT}=Object;function el(e){if(e.length===1){let t=e[0];if(DT(t))return{args:t,keys:null};if(TT(t)){let n=wT(t);return{args:n.map(r=>t[r]),keys:n}}}return{args:e,keys:null}}function TT(e){return e&&typeof e=="object"&&_T(e)===ET}function tl(e,t){return e.reduce((n,r,i)=>(n[r]=t[i],n),{})}function Df(...e){let t=Bn(e),n=Vc(e),{args:r,keys:i}=el(e);if(r.length===0)return Ae([],t);let o=new P(IT(r,t,i?s=>tl(i,s):Pt));return n?o.pipe(Jc(n)):o}function IT(e,t,n=Pt){return r=>{fv(t,()=>{let{length:i}=e,o=new Array(i),s=i,a=i;for(let c=0;c<i;c++)fv(t,()=>{let l=Ae(e[c],t),u=!1;l.subscribe(W(r,d=>{o[c]=d,u||(u=!0,a--),a||r.next(n(o.slice()))},()=>{--s||r.complete()}))},r)},r)}}function fv(e,t,n){e?Et(n,e,t):t()}function pv(e,t,n,r,i,o,s,a){let c=[],l=0,u=0,d=!1,f=()=>{d&&!c.length&&!l&&t.complete()},p=D=>l<r?m(D):c.push(D),m=D=>{o&&t.next(D),l++;let T=!1;he(n(D,u++)).subscribe(W(t,S=>{i?.(S),o?p(S):t.next(S)},()=>{T=!0},void 0,()=>{if(T)try{for(l--;c.length&&l<r;){let S=c.shift();s?Et(t,s,()=>m(S)):m(S)}f()}catch(S){t.error(S)}}))};return e.subscribe(W(t,p,()=>{d=!0,f()})),()=>{a?.()}}function lt(e,t,n=1/0){return V(t)?lt((r,i)=>ee((o,s)=>t(r,o,i,s))(he(e(r,i))),n):(typeof t=="number"&&(n=t),z((r,i)=>pv(r,i,e,n)))}function nl(e=1/0){return lt(Pt,e)}function hv(){return nl(1)}function vo(...e){return hv()(Ae(e,Bn(e)))}function As(e){return new P(t=>{he(e()).subscribe(t)})}function rl(...e){let t=Vc(e),{args:n,keys:r}=el(e),i=new P(o=>{let{length:s}=n;if(!s){o.complete();return}let a=new Array(s),c=s,l=s;for(let u=0;u<s;u++){let d=!1;he(n[u]).subscribe(W(o,f=>{d||(d=!0,l--),a[u]=f},()=>c--,void 0,()=>{(!c||!d)&&(l||o.next(r?tl(r,a):a),o.complete())}))}});return t?i.pipe(Jc(t)):i}function ks(e=0,t,n=Xy){let r=-1;return t!=null&&(jc(t)?n=t:r=t),new P(i=>{let o=dv(e)?+e-n.now():e;o<0&&(o=0);let s=0;return n.schedule(function(){i.closed||(i.next(s++),0<=r?this.schedule(void 0,r):i.complete())},o)})}function Ns(...e){let t=Bn(e),n=Jy(e,1/0),r=e;return r.length?r.length===1?he(r[0]):nl(n)(Ae(r,t)):pe}function ge(e,t){return z((n,r)=>{let i=0;n.subscribe(W(r,o=>e.call(t,o,i++)&&r.next(o)))})}function mv(e){return z((t,n)=>{let r=!1,i=null,o=null,s=!1,a=()=>{if(o?.unsubscribe(),o=null,r){r=!1;let l=i;i=null,n.next(l)}s&&n.complete()},c=()=>{o=null,s&&n.complete()};t.subscribe(W(n,l=>{r=!0,i=l,o||he(e(l)).subscribe(o=W(n,a,c))},()=>{s=!0,(!r||!o||o.closed)&&n.complete()}))})}function il(e,t=xs){return mv(()=>ks(e,t))}function ir(e){return z((t,n)=>{let r=null,i=!1,o;r=t.subscribe(W(n,void 0,void 0,s=>{o=he(e(s,ir(e)(t))),r?(r.unsubscribe(),r=null,o.subscribe(n)):i=!0})),i&&(r.unsubscribe(),r=null,o.subscribe(n))})}function ol(e,t){return V(t)?lt(e,t,1):lt(e,1)}function mi(e,t=xs){return z((n,r)=>{let i=null,o=null,s=null,a=()=>{if(i){i.unsubscribe(),i=null;let l=o;o=null,r.next(l)}};function c(){let l=s+e,u=t.now();if(u<l){i=this.schedule(void 0,l-u),r.add(i);return}a()}n.subscribe(W(r,l=>{o=l,s=t.now(),i||(i=t.schedule(c,e),r.add(i))},()=>{a(),r.complete()},void 0,()=>{o=i=null}))})}function gv(e){return z((t,n)=>{let r=!1;t.subscribe(W(n,i=>{r=!0,n.next(i)},()=>{r||n.next(e),n.complete()}))})}function wt(e){return e<=0?()=>pe:z((t,n)=>{let r=0;t.subscribe(W(n,i=>{++r<=e&&(n.next(i),e<=r&&n.complete())}))})}function sl(e,t=Pt){return e=e??ST,z((n,r)=>{let i,o=!0;n.subscribe(W(r,s=>{let a=t(s);(o||!e(i,a))&&(o=!1,i=a,r.next(s))}))})}function ST(e,t){return e===t}function yv(e=MT){return z((t,n)=>{let r=!1;t.subscribe(W(n,i=>{r=!0,n.next(i)},()=>r?n.complete():n.error(e())))})}function MT(){return new rr}function _f(e){return z((t,n)=>{try{t.subscribe(n)}finally{n.add(e)}})}function or(e,t){let n=arguments.length>=2;return r=>r.pipe(e?ge((i,o)=>e(i,o,r)):Pt,wt(1),n?gv(t):yv(()=>new rr))}function al(e){return e<=0?()=>pe:z((t,n)=>{let r=[];t.subscribe(W(n,i=>{r.push(i),e<r.length&&r.shift()},()=>{for(let i of r)n.next(i);n.complete()},void 0,()=>{r=null}))})}function vv(e={}){let{connector:t=()=>new M,resetOnError:n=!0,resetOnComplete:r=!0,resetOnRefCountZero:i=!0}=e;return o=>{let s,a,c,l=0,u=!1,d=!1,f=()=>{a?.unsubscribe(),a=void 0},p=()=>{f(),s=c=void 0,u=d=!1},m=()=>{let D=s;p(),D?.unsubscribe()};return z((D,T)=>{l++,!d&&!u&&f();let S=c=c??t();T.add(()=>{l--,l===0&&!d&&!u&&(a=Ef(m,i))}),S.subscribe(T),!s&&l>0&&(s=new bn({next:q=>S.next(q),error:q=>{d=!0,f(),a=Ef(p,n,q),S.error(q)},complete:()=>{u=!0,f(),a=Ef(p,r),S.complete()}}),he(D).subscribe(s))})(o)}}function Ef(e,t,...n){if(t===!0){e();return}if(t===!1)return;let r=new bn({next:()=>{r.unsubscribe(),e()}});return he(t(...n)).subscribe(r)}function cl(e,t,n){let r,i=!1;return e&&typeof e=="object"?{bufferSize:r=1/0,windowTime:t=1/0,refCount:i=!1,scheduler:n}=e:r=e??1/0,vv({connector:()=>new Rr(r,t,n),resetOnError:!0,resetOnComplete:!1,resetOnRefCountZero:i})}function Os(e){return ge((t,n)=>e<=n)}function Ar(...e){let t=Bn(e);return z((n,r)=>{(t?vo(e,n,t):vo(e,n)).subscribe(r)})}function Tt(e,t){return z((n,r)=>{let i=null,o=0,s=!1,a=()=>s&&!i&&r.complete();n.subscribe(W(r,c=>{i?.unsubscribe();let l=0,u=o++;he(e(c,u)).subscribe(i=W(r,d=>r.next(t?t(c,d,u,l++):d),()=>{i=null,a()}))},()=>{s=!0,a()}))})}function ye(e){return z((t,n)=>{he(e).subscribe(W(n,()=>n.complete(),Is)),!n.closed&&t.subscribe(n)})}function He(e,t,n){let r=V(e)||t||n?{next:e,error:t,complete:n}:e;return r?z((i,o)=>{var s;(s=r.subscribe)===null||s===void 0||s.call(r);let a=!0;i.subscribe(W(o,c=>{var l;(l=r.next)===null||l===void 0||l.call(r,c),o.next(c)},()=>{var c;a=!1,(c=r.complete)===null||c===void 0||c.call(r),o.complete()},c=>{var l;a=!1,(l=r.error)===null||l===void 0||l.call(r,c),o.error(c)},()=>{var c,l;a&&((c=r.unsubscribe)===null||c===void 0||c.call(r)),(l=r.finalize)===null||l===void 0||l.call(r)}))}):Pt}var wf;function ll(){return wf}function Vn(e){let t=wf;return wf=e,t}var bv=Symbol("NotFound");function bo(e){return e===bv||e?.name==="\u0275NotFound"}function Cv(e){let t=A(null);try{return e()}finally{A(t)}}var Ff="https://angular.dev/best-practices/security#preventing-cross-site-scripting-xss",E=class extends Error{code;constructor(t,n){super(Do(t,n)),this.code=t}};function xT(e){return`NG0${Math.abs(e)}`}function Do(e,t){return`${xT(e)}${t?": "+t:""}`}var Ci=globalThis;function le(e){for(let t in e)if(e[t]===le)return t;throw Error("")}function Tv(e,t){for(let n in t)t.hasOwnProperty(n)&&!e.hasOwnProperty(n)&&(e[n]=t[n])}function Us(e){if(typeof e=="string")return e;if(Array.isArray(e))return`[${e.map(Us).join(", ")}]`;if(e==null)return""+e;let t=e.overriddenName||e.name;if(t)return`${t}`;let n=e.toString();if(n==null)return""+n;let r=n.indexOf(`
`);return r>=0?n.slice(0,r):n}function gl(e,t){return e?t?`${e} ${t}`:e:t||""}var RT=le({__forward_ref__:le});function $s(e){return e.__forward_ref__=$s,e}function Ye(e){return Bf(e)?e():e}function Bf(e){return typeof e=="function"&&e.hasOwnProperty(RT)&&e.__forward_ref__===$s}function C(e){return{token:e.token,providedIn:e.providedIn||null,factory:e.factory,value:void 0}}function Lt(e){return{providers:e.providers||[],imports:e.imports||[]}}function Hs(e){return AT(e,yl)}function jf(e){return Hs(e)!==null}function AT(e,t){return e.hasOwnProperty(t)&&e[t]||null}function kT(e){let t=e?.[yl]??null;return t||null}function If(e){return e&&e.hasOwnProperty(dl)?e[dl]:null}var yl=le({\u0275prov:le}),dl=le({\u0275inj:le}),_=class{_desc;ngMetadataName="InjectionToken";\u0275prov;constructor(t,n){this._desc=t,this.\u0275prov=void 0,typeof n=="number"?this.__NG_ELEMENT_ID__=n:n!==void 0&&(this.\u0275prov=C({token:this,providedIn:n.providedIn||"root",factory:n.factory}))}get multi(){return this}toString(){return`InjectionToken ${this._desc}`}};function Vf(e){return e&&!!e.\u0275providers}var Uf=le({\u0275cmp:le}),$f=le({\u0275dir:le}),Hf=le({\u0275pipe:le}),zf=le({\u0275mod:le}),Ls=le({\u0275fac:le}),Di=le({__NG_ELEMENT_ID__:le}),Dv=le({__NG_ENV_ID__:le});function Wf(e){return vl(e,"@NgModule"),e[zf]||null}function ar(e){return vl(e,"@Component"),e[Uf]||null}function Gf(e){return vl(e,"@Directive"),e[$f]||null}function Iv(e){return vl(e,"@Pipe"),e[Hf]||null}function vl(e,t){if(e==null)throw new E(-919,!1)}function qf(e){return typeof e=="string"?e:e==null?"":String(e)}var Sv=le({ngErrorCode:le}),NT=le({ngErrorMessage:le}),OT=le({ngTokenPath:le});function Kf(e,t){return Mv("",-200,t)}function bl(e,t){throw new E(-201,!1)}function Mv(e,t,n){let r=new E(t,e);return r[Sv]=t,r[NT]=e,n&&(r[OT]=n),r}function PT(e){return e[Sv]}var Sf;function xv(){return Sf}function ut(e){let t=Sf;return Sf=e,t}function Zf(e,t,n){let r=Hs(e);if(r&&r.providedIn=="root")return r.value===void 0?r.value=r.factory():r.value;if(n&8)return null;if(t!==void 0)return t;bl(e,"")}var LT={},gi=LT,FT="__NG_DI_FLAG__",Mf=class{injector;constructor(t){this.injector=t}retrieve(t,n){let r=yi(n)||0;try{return this.injector.get(t,r&8?null:gi,r)}catch(i){if(bo(i))return i;throw i}}};function BT(e,t=0){let n=ll();if(n===void 0)throw new E(-203,!1);if(n===null)return Zf(e,void 0,t);{let r=jT(t),i=n.retrieve(e,r);if(bo(i)){if(r.optional)return null;throw i}return i}}function F(e,t=0){return(xv()||BT)(Ye(e),t)}function h(e,t){return F(e,yi(t))}function yi(e){return typeof e>"u"||typeof e=="number"?e:0|(e.optional&&8)|(e.host&&1)|(e.self&&2)|(e.skipSelf&&4)}function jT(e){return{optional:!!(e&8),host:!!(e&1),self:!!(e&2),skipSelf:!!(e&4)}}function xf(e){let t=[];for(let n=0;n<e.length;n++){let r=Ye(e[n]);if(Array.isArray(r)){if(r.length===0)throw new E(900,!1);let i,o=0;for(let s=0;s<r.length;s++){let a=r[s],c=VT(a);typeof c=="number"?c===-1?i=a.token:o|=c:i=a}t.push(F(i,o))}else t.push(F(r))}return t}function VT(e){return e[FT]}function kr(e,t){let n=e.hasOwnProperty(Ls);return n?e[Ls]:null}function Rv(e,t,n){if(e.length!==t.length)return!1;for(let r=0;r<e.length;r++){let i=e[r],o=t[r];if(n&&(i=n(i),o=n(o)),o!==i)return!1}return!0}function Av(e){return e.flat(Number.POSITIVE_INFINITY)}function Cl(e,t){e.forEach(n=>Array.isArray(n)?Cl(n,t):t(n))}function Yf(e,t,n){t>=e.length?e.push(n):e.splice(t,0,n)}function zs(e,t){return t>=e.length-1?e.pop():e.splice(t,1)[0]}function kv(e,t){let n=[];for(let r=0;r<e;r++)n.push(t);return n}function Nv(e,t,n,r){let i=e.length;if(i==t)e.push(n,r);else if(i===1)e.push(r,e[0]),e[0]=n;else{for(i--,e.push(e[i-1],e[i]);i>t;){let o=i-2;e[i]=e[o],i--}e[t]=n,e[t+1]=r}}function Dl(e,t,n){let r=_o(e,t);return r>=0?e[r|1]=n:(r=~r,Nv(e,r,t,n)),r}function _l(e,t){let n=_o(e,t);if(n>=0)return e[n|1]}function _o(e,t){return UT(e,t,1)}function UT(e,t,n){let r=0,i=e.length>>n;for(;i!==r;){let o=r+(i-r>>1),s=e[o<<n];if(t===s)return o<<n;s>t?i=o:r=o+1}return~(i<<n)}var Lr={},dt=[],_i=new _(""),Qf=new _("",-1),Xf=new _(""),Fs=class{get(t,n=gi){if(n===gi){let i=Mv("",-201);throw i.name="\u0275NotFound",i}return n}};function Fr(e){return{\u0275providers:e}}function Ov(e){return Fr([{provide:_i,multi:!0,useValue:e}])}function Pv(...e){return{\u0275providers:Jf(!0,e),\u0275fromNgModule:!0}}function Jf(e,...t){let n=[],r=new Set,i,o=s=>{n.push(s)};return Cl(t,s=>{let a=s;fl(a,o,[],r)&&(i||=[],i.push(a))}),i!==void 0&&Lv(i,o),n}function Lv(e,t){for(let n=0;n<e.length;n++){let{ngModule:r,providers:i}=e[n];ep(i,o=>{t(o,r)})}}function fl(e,t,n,r){if(e=Ye(e),!e)return!1;let i=null,o=If(e),s=!o&&ar(e);if(!o&&!s){let c=e.ngModule;if(o=If(c),o)i=c;else return!1}else{if(s&&!s.standalone)return!1;i=e}let a=r.has(i);if(s){if(a)return!1;if(r.add(i),s.dependencies){let c=typeof s.dependencies=="function"?s.dependencies():s.dependencies;for(let l of c)fl(l,t,n,r)}}else if(o){if(o.imports!=null&&!a){r.add(i);let l;Cl(o.imports,u=>{fl(u,t,n,r)&&(l||=[],l.push(u))}),l!==void 0&&Lv(l,t)}if(!a){let l=kr(i)||(()=>new i);t({provide:i,useFactory:l,deps:dt},i),t({provide:Xf,useValue:i,multi:!0},i),t({provide:_i,useValue:()=>F(i),multi:!0},i)}let c=o.providers;if(c!=null&&!a){let l=e;ep(c,u=>{t(u,l)})}}else return!1;return i!==e&&e.providers!==void 0}function ep(e,t){for(let n of e)Vf(n)&&(n=n.\u0275providers),Array.isArray(n)?ep(n,t):t(n)}var $T=le({provide:String,useValue:le});function Fv(e){return e!==null&&typeof e=="object"&&$T in e}function HT(e){return!!(e&&e.useExisting)}function zT(e){return!!(e&&e.useFactory)}function vi(e){return typeof e=="function"}function Bv(e){return!!e.useClass}var Ws=new _(""),ul={},_v={},Tf;function Eo(){return Tf===void 0&&(Tf=new Fs),Tf}var ke=class{},bi=class extends ke{parent;source;scopes;records=new Map;_ngOnDestroyHooks=new Set;_onDestroyHooks=[];get destroyed(){return this._destroyed}_destroyed=!1;injectorDefTypes;constructor(t,n,r,i){super(),this.parent=n,this.source=r,this.scopes=i,Af(t,s=>this.processProvider(s)),this.records.set(Qf,Co(void 0,this)),i.has("environment")&&this.records.set(ke,Co(void 0,this));let o=this.records.get(Ws);o!=null&&typeof o.value=="string"&&this.scopes.add(o.value),this.injectorDefTypes=new Set(this.get(Xf,dt,{self:!0}))}retrieve(t,n){let r=yi(n)||0;try{return this.get(t,gi,r)}catch(i){if(bo(i))return i;throw i}}destroy(){Ps(this),this._destroyed=!0;let t=A(null);try{for(let r of this._ngOnDestroyHooks)r.ngOnDestroy();let n=this._onDestroyHooks;this._onDestroyHooks=[];for(let r of n)r()}finally{this.records.clear(),this._ngOnDestroyHooks.clear(),this.injectorDefTypes.clear(),A(t)}}onDestroy(t){return Ps(this),this._onDestroyHooks.push(t),()=>this.removeOnDestroy(t)}runInContext(t){Ps(this);let n=Vn(this),r=ut(void 0),i;try{return t()}finally{Vn(n),ut(r)}}get(t,n=gi,r){if(Ps(this),t.hasOwnProperty(Dv))return t[Dv](this);let i=yi(r),o,s=Vn(this),a=ut(void 0);try{if(!(i&4)){let l=this.records.get(t);if(l===void 0){let u=ZT(t)&&Hs(t);u&&this.injectableDefInScope(u)?l=Co(Rf(t),ul):l=null,this.records.set(t,l)}if(l!=null)return this.hydrate(t,l,i)}let c=i&2?Eo():this.parent;return n=i&8&&n===gi?null:n,c.get(t,n)}catch(c){let l=PT(c);throw l===-200||l===-201?new E(l,null):c}finally{ut(a),Vn(s)}}resolveInjectorInitializers(){let t=A(null),n=Vn(this),r=ut(void 0),i;try{let o=this.get(_i,dt,{self:!0});for(let s of o)s()}finally{Vn(n),ut(r),A(t)}}toString(){return"R3Injector[...]"}processProvider(t){t=Ye(t);let n=vi(t)?t:Ye(t&&t.provide),r=GT(t);if(!vi(t)&&t.multi===!0){let i=this.records.get(n);i||(i=Co(void 0,ul,!0),i.factory=()=>xf(i.multi),this.records.set(n,i)),n=t,i.multi.push(t)}this.records.set(n,r)}hydrate(t,n,r){let i=A(null);try{if(n.value===_v)throw Kf("");return n.value===ul&&(n.value=_v,n.value=n.factory(void 0,r)),typeof n.value=="object"&&n.value&&KT(n.value)&&this._ngOnDestroyHooks.add(n.value),n.value}finally{A(i)}}injectableDefInScope(t){if(!t.providedIn)return!1;let n=Ye(t.providedIn);return typeof n=="string"?n==="any"||this.scopes.has(n):this.injectorDefTypes.has(n)}removeOnDestroy(t){let n=this._onDestroyHooks.indexOf(t);n!==-1&&this._onDestroyHooks.splice(n,1)}};function Rf(e){let t=Hs(e),n=t!==null?t.factory:kr(e);if(n!==null)return n;if(e instanceof _)throw new E(-204,!1);if(e instanceof Function)return WT(e);throw new E(-204,!1)}function WT(e){if(e.length>0)throw new E(-204,!1);let n=kT(e);return n!==null?()=>n.factory(e):()=>new e}function GT(e){if(Fv(e))return Co(void 0,e.useValue);{let t=tp(e);return Co(t,ul)}}function tp(e,t,n){let r;if(vi(e)){let i=Ye(e);return kr(i)||Rf(i)}else if(Fv(e))r=()=>Ye(e.useValue);else if(zT(e))r=()=>e.useFactory(...xf(e.deps||[]));else if(HT(e))r=(i,o)=>F(Ye(e.useExisting),o!==void 0&&o&8?8:void 0);else{let i=Ye(e&&(e.useClass||e.provide));if(qT(e))r=()=>new i(...xf(e.deps));else return kr(i)||Rf(i)}return r}function Ps(e){if(e.destroyed)throw new E(-205,!1)}function Co(e,t,n=!1){return{factory:e,value:t,multi:n?[]:void 0}}function qT(e){return!!e.deps}function KT(e){return e!==null&&typeof e=="object"&&typeof e.ngOnDestroy=="function"}function ZT(e){return typeof e=="function"||typeof e=="object"&&e.ngMetadataName==="InjectionToken"}function Af(e,t){for(let n of e)Array.isArray(n)?Af(n,t):n&&Vf(n)?Af(n.\u0275providers,t):t(n)}function it(e,t){let n;e instanceof bi?(Ps(e),n=e):n=new Mf(e);let r,i=Vn(n),o=ut(void 0);try{return t()}finally{Vn(i),ut(o)}}function jv(){return xv()!==void 0||ll()!=null}var Cn=0,k=1,L=2,Ve=3,Yt=4,ft=5,Ei=6,wo=7,Le=8,cr=9,$n=10,_e=11,To=12,np=13,wi=14,pt=15,Br=16,Ti=17,Hn=18,lr=19,rp=20,sr=21,El=22,Nr=23,Ft=24,Ii=25,jr=26,Ee=27,Vv=1,ip=6,Vr=7,Gs=8,Si=9,Ne=10;function ur(e){return Array.isArray(e)&&typeof e[Vv]=="object"}function Dn(e){return Array.isArray(e)&&e[Vv]===!0}function op(e){return(e.flags&4)!==0}function zn(e){return e.componentOffset>-1}function qs(e){return(e.flags&1)===1}function Wn(e){return!!e.template}function Io(e){return(e[L]&512)!==0}function Mi(e){return(e[L]&256)===256}var Uv="svg",$v="math";function Qt(e){for(;Array.isArray(e);)e=e[Cn];return e}function sp(e,t){return Qt(t[e])}function Xt(e,t){return Qt(t[e.index])}function wl(e,t){return e.data[t]}function Tl(e,t){return e[t]}function ap(e,t,n,r){n>=e.data.length&&(e.data[n]=null,e.blueprint[n]=null),t[n]=r}function Jt(e,t){let n=t[e];return ur(n)?n:n[Cn]}function Hv(e){return(e[L]&4)===4}function Il(e){return(e[L]&128)===128}function zv(e){return Dn(e[Ve])}function Bt(e,t){return t==null?null:e[t]}function cp(e){e[Ti]=0}function lp(e){e[L]&1024||(e[L]|=1024,Il(e)&&xi(e))}function Wv(e,t){for(;e>0;)t=t[wi],e--;return t}function Ks(e){return!!(e[L]&9216||e[Ft]?.dirty)}function Sl(e){e[$n].changeDetectionScheduler?.notify(8),e[L]&64&&(e[L]|=1024),Ks(e)&&xi(e)}function xi(e){e[$n].changeDetectionScheduler?.notify(0);let t=Or(e);for(;t!==null&&!(t[L]&8192||(t[L]|=8192,!Il(t)));)t=Or(t)}function up(e,t){if(Mi(e))throw new E(911,!1);e[sr]===null&&(e[sr]=[]),e[sr].push(t)}function Gv(e,t){if(e[sr]===null)return;let n=e[sr].indexOf(t);n!==-1&&e[sr].splice(n,1)}function Or(e){let t=e[Ve];return Dn(t)?t[Ve]:t}function dp(e){return e[wo]??=[]}function fp(e){return e.cleanup??=[]}function qv(e,t,n,r){let i=dp(t);i.push(n),e.firstCreatePass&&fp(e).push(r,i.length-1)}var H={lFrame:ib(null),bindingsEnabled:!0,skipHydrationRootTNode:null};var kf=!1;function Kv(){return H.lFrame.elementDepthCount}function Zv(){H.lFrame.elementDepthCount++}function pp(){H.lFrame.elementDepthCount--}function hp(){return H.bindingsEnabled}function mp(){return H.skipHydrationRootTNode!==null}function gp(e){return H.skipHydrationRootTNode===e}function yp(){H.skipHydrationRootTNode=null}function B(){return H.lFrame.lView}function Oe(){return H.lFrame.tView}function Ur(e){return H.lFrame.contextLView=e,e[Le]}function $r(e){return H.lFrame.contextLView=null,e}function ht(){let e=vp();for(;e!==null&&e.type===64;)e=e.parent;return e}function vp(){return H.lFrame.currentTNode}function Yv(){let e=H.lFrame,t=e.currentTNode;return e.isParent?t:t.parent}function So(e,t){let n=H.lFrame;n.currentTNode=e,n.isParent=t}function bp(){return H.lFrame.isParent}function Cp(){H.lFrame.isParent=!1}function Qv(){return H.lFrame.contextLView}function Dp(){return kf}function Bs(e){let t=kf;return kf=e,t}function _p(){let e=H.lFrame,t=e.bindingRootIndex;return t===-1&&(t=e.bindingRootIndex=e.tView.bindingStartIndex),t}function Xv(e){return H.lFrame.bindingIndex=e}function Ri(){return H.lFrame.bindingIndex++}function Ep(e){let t=H.lFrame,n=t.bindingIndex;return t.bindingIndex=t.bindingIndex+e,n}function Jv(){return H.lFrame.inI18n}function eb(e,t){let n=H.lFrame;n.bindingIndex=n.bindingRootIndex=e,Ml(t)}function tb(){return H.lFrame.currentDirectiveIndex}function Ml(e){H.lFrame.currentDirectiveIndex=e}function nb(e){let t=H.lFrame.currentDirectiveIndex;return t===-1?null:e[t]}function wp(){return H.lFrame.currentQueryIndex}function xl(e){H.lFrame.currentQueryIndex=e}function YT(e){let t=e[k];return t.type===2?t.declTNode:t.type===1?e[ft]:null}function Tp(e,t,n){if(n&4){let i=t,o=e;for(;i=i.parent,i===null&&!(n&1);)if(i=YT(o),i===null||(o=o[wi],i.type&10))break;if(i===null)return!1;t=i,e=o}let r=H.lFrame=rb();return r.currentTNode=t,r.lView=e,!0}function Rl(e){let t=rb(),n=e[k];H.lFrame=t,t.currentTNode=n.firstChild,t.lView=e,t.tView=n,t.contextLView=e,t.bindingIndex=n.bindingStartIndex,t.inI18n=!1}function rb(){let e=H.lFrame,t=e===null?null:e.child;return t===null?ib(e):t}function ib(e){let t={currentTNode:null,isParent:!0,lView:null,tView:null,selectedIndex:-1,contextLView:null,elementDepthCount:0,currentNamespace:null,currentDirectiveIndex:-1,bindingRootIndex:-1,bindingIndex:-1,currentQueryIndex:0,parent:e,child:null,inI18n:!1};return e!==null&&(e.child=t),t}function ob(){let e=H.lFrame;return H.lFrame=e.parent,e.currentTNode=null,e.lView=null,e}var Ip=ob;function Al(){let e=ob();e.isParent=!0,e.tView=null,e.selectedIndex=-1,e.contextLView=null,e.elementDepthCount=0,e.currentDirectiveIndex=-1,e.currentNamespace=null,e.bindingRootIndex=-1,e.bindingIndex=-1,e.currentQueryIndex=0}function sb(e){return(H.lFrame.contextLView=Wv(e,H.lFrame.contextLView))[Le]}function dr(){return H.lFrame.selectedIndex}function Hr(e){H.lFrame.selectedIndex=e}function kl(){let e=H.lFrame;return wl(e.tView,e.selectedIndex)}function ab(){return H.lFrame.currentNamespace}var cb=!0;function Nl(){return cb}function Ol(e){cb=e}function Nf(e,t=null,n=null,r){let i=Sp(e,t,n,r);return i.resolveInjectorInitializers(),i}function Sp(e,t=null,n=null,r,i=new Set){let o=[n||dt,Pv(e)],s;return new bi(o,t||Eo(),s||null,i)}var Te=class e{static THROW_IF_NOT_FOUND=gi;static NULL=new Fs;static create(t,n){if(Array.isArray(t))return Nf({name:""},n,t,"");{let r=t.name??"";return Nf({name:r},t.parent,t.providers,r)}}static \u0275prov=C({token:e,providedIn:"any",factory:()=>F(Qf)});static __NG_ELEMENT_ID__=-1},de=new _(""),Qe=(()=>{class e{static __NG_ELEMENT_ID__=QT;static __NG_ENV_ID__=n=>n}return e})(),pl=class extends Qe{_lView;constructor(t){super(),this._lView=t}get destroyed(){return Mi(this._lView)}onDestroy(t){let n=this._lView;return up(n,t),()=>Gv(n,t)}};function QT(){return new pl(B())}var lb=!1,ub=new _(""),zr=(()=>{class e{taskId=0;pendingTasks=new Set;destroyed=!1;pendingTask=new Re(!1);debugTaskTracker=h(ub,{optional:!0});get hasPendingTasks(){return this.destroyed?!1:this.pendingTask.value}get hasPendingTasksObservable(){return this.destroyed?new P(n=>{n.next(!1),n.complete()}):this.pendingTask}add(){!this.hasPendingTasks&&!this.destroyed&&this.pendingTask.next(!0);let n=this.taskId++;return this.pendingTasks.add(n),this.debugTaskTracker?.add(n),n}has(n){return this.pendingTasks.has(n)}remove(n){this.pendingTasks.delete(n),this.debugTaskTracker?.remove(n),this.pendingTasks.size===0&&this.hasPendingTasks&&this.pendingTask.next(!1)}ngOnDestroy(){this.pendingTasks.clear(),this.hasPendingTasks&&this.pendingTask.next(!1),this.destroyed=!0,this.pendingTask.unsubscribe()}static \u0275prov=C({token:e,providedIn:"root",factory:()=>new e})}return e})(),Of=class extends M{__isAsync;destroyRef=void 0;pendingTasks=void 0;constructor(t=!1){super(),this.__isAsync=t,jv()&&(this.destroyRef=h(Qe,{optional:!0})??void 0,this.pendingTasks=h(zr,{optional:!0})??void 0)}emit(t){let n=A(null);try{super.next(t)}finally{A(n)}}subscribe(t,n,r){let i=t,o=n||(()=>null),s=r;if(t&&typeof t=="object"){let c=t;i=c.next?.bind(c),o=c.error?.bind(c),s=c.complete?.bind(c)}this.__isAsync&&(o=this.wrapInTimeout(o),i&&(i=this.wrapInTimeout(i)),s&&(s=this.wrapInTimeout(s)));let a=super.subscribe({next:i,error:o,complete:s});return t instanceof oe&&t.add(a),a}wrapInTimeout(t){return n=>{let r=this.pendingTasks?.add();setTimeout(()=>{try{t(n)}finally{r!==void 0&&this.pendingTasks?.remove(r)}})}}},X=Of;function hl(...e){}function Mp(e){let t,n;function r(){e=hl;try{n!==void 0&&typeof cancelAnimationFrame=="function"&&cancelAnimationFrame(n),t!==void 0&&clearTimeout(t)}catch{}}return t=setTimeout(()=>{e(),r()}),typeof requestAnimationFrame=="function"&&(n=requestAnimationFrame(()=>{e(),r()})),()=>r()}function db(e){return queueMicrotask(()=>e()),()=>{e=hl}}var xp="isAngularZone",js=xp+"_ID",XT=0,K=class e{hasPendingMacrotasks=!1;hasPendingMicrotasks=!1;isStable=!0;onUnstable=new X(!1);onMicrotaskEmpty=new X(!1);onStable=new X(!1);onError=new X(!1);constructor(t){let{enableLongStackTrace:n=!1,shouldCoalesceEventChangeDetection:r=!1,shouldCoalesceRunChangeDetection:i=!1,scheduleInRootZone:o=lb}=t;if(typeof Zone>"u")throw new E(908,!1);Zone.assertZonePatched();let s=this;s._nesting=0,s._outer=s._inner=Zone.current,Zone.TaskTrackingZoneSpec&&(s._inner=s._inner.fork(new Zone.TaskTrackingZoneSpec)),n&&Zone.longStackTraceZoneSpec&&(s._inner=s._inner.fork(Zone.longStackTraceZoneSpec)),s.shouldCoalesceEventChangeDetection=!i&&r,s.shouldCoalesceRunChangeDetection=i,s.callbackScheduled=!1,s.scheduleInRootZone=o,tI(s)}static isInAngularZone(){return typeof Zone<"u"&&Zone.current.get(xp)===!0}static assertInAngularZone(){if(!e.isInAngularZone())throw new E(909,!1)}static assertNotInAngularZone(){if(e.isInAngularZone())throw new E(909,!1)}run(t,n,r){return this._inner.run(t,n,r)}runTask(t,n,r,i){let o=this._inner,s=o.scheduleEventTask("NgZoneEvent: "+i,t,JT,hl,hl);try{return o.runTask(s,n,r)}finally{o.cancelTask(s)}}runGuarded(t,n,r){return this._inner.runGuarded(t,n,r)}runOutsideAngular(t){return this._outer.run(t)}},JT={};function Rp(e){if(e._nesting==0&&!e.hasPendingMicrotasks&&!e.isStable)try{e._nesting++,e.onMicrotaskEmpty.emit(null)}finally{if(e._nesting--,!e.hasPendingMicrotasks)try{e.runOutsideAngular(()=>e.onStable.emit(null))}finally{e.isStable=!0}}}function eI(e){if(e.isCheckStableRunning||e.callbackScheduled)return;e.callbackScheduled=!0;function t(){Mp(()=>{e.callbackScheduled=!1,Pf(e),e.isCheckStableRunning=!0,Rp(e),e.isCheckStableRunning=!1})}e.scheduleInRootZone?Zone.root.run(()=>{t()}):e._outer.run(()=>{t()}),Pf(e)}function tI(e){let t=()=>{eI(e)},n=XT++;e._inner=e._inner.fork({name:"angular",properties:{[xp]:!0,[js]:n,[js+n]:!0},onInvokeTask:(r,i,o,s,a,c)=>{if(nI(c))return r.invokeTask(o,s,a,c);try{return Ev(e),r.invokeTask(o,s,a,c)}finally{(e.shouldCoalesceEventChangeDetection&&s.type==="eventTask"||e.shouldCoalesceRunChangeDetection)&&t(),wv(e)}},onInvoke:(r,i,o,s,a,c,l)=>{try{return Ev(e),r.invoke(o,s,a,c,l)}finally{e.shouldCoalesceRunChangeDetection&&!e.callbackScheduled&&!rI(c)&&t(),wv(e)}},onHasTask:(r,i,o,s)=>{r.hasTask(o,s),i===o&&(s.change=="microTask"?(e._hasPendingMicrotasks=s.microTask,Pf(e),Rp(e)):s.change=="macroTask"&&(e.hasPendingMacrotasks=s.macroTask))},onHandleError:(r,i,o,s)=>(r.handleError(o,s),e.runOutsideAngular(()=>e.onError.emit(s)),!1)})}function Pf(e){e._hasPendingMicrotasks||(e.shouldCoalesceEventChangeDetection||e.shouldCoalesceRunChangeDetection)&&e.callbackScheduled===!0?e.hasPendingMicrotasks=!0:e.hasPendingMicrotasks=!1}function Ev(e){e._nesting++,e.isStable&&(e.isStable=!1,e.onUnstable.emit(null))}function wv(e){e._nesting--,Rp(e)}var Vs=class{hasPendingMicrotasks=!1;hasPendingMacrotasks=!1;isStable=!0;onUnstable=new X;onMicrotaskEmpty=new X;onStable=new X;onError=new X;run(t,n,r){return t.apply(n,r)}runGuarded(t,n,r){return t.apply(n,r)}runOutsideAngular(t){return t()}runTask(t,n,r,i){return t.apply(n,r)}};function nI(e){return fb(e,"__ignore_ng_zone__")}function rI(e){return fb(e,"__scheduler_tick__")}function fb(e,t){return!Array.isArray(e)||e.length!==1?!1:e[0]?.data?.[t]===!0}var Un=class{_console=console;handleError(t){this._console.error("ERROR",t)}},_n=new _("",{factory:()=>{let e=h(K),t=h(ke),n;return r=>{e.runOutsideAngular(()=>{t.destroyed&&!n?setTimeout(()=>{throw r}):(n??=t.get(Un),n.handleError(r))})}}}),pb={provide:_i,useValue:()=>{let e=h(Un,{optional:!0})},multi:!0},iI=new _("",{factory:()=>{let e=h(de).defaultView;if(!e)return;let t=h(_n),n=o=>{t(o.reason),o.preventDefault()},r=o=>{o.error?t(o.error):t(new Error(o.message,{cause:o})),o.preventDefault()},i=()=>{e.addEventListener("unhandledrejection",n),e.addEventListener("error",r)};typeof Zone<"u"?Zone.root.run(i):i(),h(Qe).onDestroy(()=>{e.removeEventListener("error",r),e.removeEventListener("unhandledrejection",n)})}});function Ap(){return Fr([Ov(()=>{h(iI)})])}function ze(e,t){let[n,r,i]=af(e,t?.equal),o=n,s=o[rt];return o.set=r,o.update=i,o.asReadonly=hb.bind(o),o}function hb(){let e=this[rt];if(e.readonlyFn===void 0){let t=()=>this();t[rt]=e,e.readonlyFn=t}return e.readonlyFn}var Zs=(()=>{class e{view;node;constructor(n,r){this.view=n,this.node=r}static __NG_ELEMENT_ID__=oI}return e})();function oI(){return new Zs(B(),ht())}var Pr=class{},Ys=new _("",{factory:()=>!0});var kp=new _("");var Pl=(()=>{class e{static \u0275prov=C({token:e,providedIn:"root",factory:()=>new Lf})}return e})(),Lf=class{dirtyEffectCount=0;queues=new Map;add(t){this.enqueue(t),this.schedule(t)}schedule(t){t.dirty&&this.dirtyEffectCount++}remove(t){let n=t.zone,r=this.queues.get(n);r.has(t)&&(r.delete(t),t.dirty&&this.dirtyEffectCount--)}enqueue(t){let n=t.zone;this.queues.has(n)||this.queues.set(n,new Set);let r=this.queues.get(n);r.has(t)||r.add(t)}flush(){for(;this.dirtyEffectCount>0;){let t=!1;for(let[n,r]of this.queues)n===null?t||=this.flushQueue(r):t||=n.run(()=>this.flushQueue(r));t||(this.dirtyEffectCount=0)}}flushQueue(t){let n=!1;for(let r of t)r.dirty&&(this.dirtyEffectCount--,n=!0,r.run());return n}},ml=class{[rt];constructor(t){this[rt]=t}destroy(){this[rt].destroy()}};function Qs(e,t){let n=t?.injector??h(Te),r=t?.manualCleanup!==!0?n.get(Qe):null,i,o=n.get(Zs,null,{optional:!0}),s=n.get(Pr);return o!==null?(i=cI(o.view,s,e),r instanceof pl&&r._lView===o.view&&(r=null)):i=lI(e,n.get(Pl),s),i.injector=n,r!==null&&(i.onDestroyFns=[r.onDestroy(()=>i.destroy())]),new ml(i)}var mb=$(g({},lf),{cleanupFns:void 0,zone:null,onDestroyFns:null,run(){let e=Bs(!1);try{uf(this)}finally{Bs(e)}},cleanup(){if(!this.cleanupFns?.length)return;let e=A(null);try{for(;this.cleanupFns.length;)this.cleanupFns.pop()()}finally{this.cleanupFns=[],A(e)}}}),sI=$(g({},mb),{consumerMarkedDirty(){this.scheduler.schedule(this),this.notifier.notify(12)},destroy(){if(ui(this),this.onDestroyFns!==null)for(let e of this.onDestroyFns)e();this.cleanup(),this.scheduler.remove(this)}}),aI=$(g({},mb),{consumerMarkedDirty(){this.view[L]|=8192,xi(this.view),this.notifier.notify(13)},destroy(){if(ui(this),this.onDestroyFns!==null)for(let e of this.onDestroyFns)e();this.cleanup(),this.view[Nr]?.delete(this)}});function cI(e,t,n){let r=Object.create(aI);return r.view=e,r.zone=typeof Zone<"u"?Zone.current:null,r.notifier=t,r.fn=gb(r,n),e[Nr]??=new Set,e[Nr].add(r),r.consumerMarkedDirty(r),r}function lI(e,t,n){let r=Object.create(sI);return r.fn=gb(r,e),r.scheduler=t,r.notifier=n,r.zone=typeof Zone<"u"?Zone.current:null,r.scheduler.add(r),r.notifier.notify(12),r}function gb(e,t){return()=>{t(n=>(e.cleanupFns??=[]).push(n))}}function aa(e){return{toString:e}.toString()}function vI(e){return typeof e=="function"}function qb(e,t,n,r){t!==null?t.applyValueToInputSignal(t,r):e[n]=r}var Ul=class{previousValue;currentValue;firstChange;constructor(t,n,r){this.previousValue=t,this.currentValue=n,this.firstChange=r}isFirstChange(){return this.firstChange}},Li=(()=>{let e=()=>Kb;return e.ngInherit=!0,e})();function Kb(e){return e.type.prototype.ngOnChanges&&(e.setInput=CI),bI}function bI(){let e=Yb(this),t=e?.current;if(t){let n=e.previous;if(n===Lr)e.previous=t;else for(let r in t)n[r]=t[r];e.current=null,this.ngOnChanges(t)}}function CI(e,t,n,r,i){let o=this.declaredInputs[r],s=Yb(e)||DI(e,{previous:Lr,current:null}),a=s.current||(s.current={}),c=s.previous,l=c[o];a[o]=new Ul(l&&l.currentValue,n,c===Lr),qb(e,t,i,n)}var Zb="__ngSimpleChanges__";function Yb(e){return e[Zb]||null}function DI(e,t){return e[Zb]=t}var yb=[];var ue=function(e,t=null,n){for(let r=0;r<yb.length;r++){let i=yb[r];i(e,t,n)}},te=(function(e){return e[e.TemplateCreateStart=0]="TemplateCreateStart",e[e.TemplateCreateEnd=1]="TemplateCreateEnd",e[e.TemplateUpdateStart=2]="TemplateUpdateStart",e[e.TemplateUpdateEnd=3]="TemplateUpdateEnd",e[e.LifecycleHookStart=4]="LifecycleHookStart",e[e.LifecycleHookEnd=5]="LifecycleHookEnd",e[e.OutputStart=6]="OutputStart",e[e.OutputEnd=7]="OutputEnd",e[e.BootstrapApplicationStart=8]="BootstrapApplicationStart",e[e.BootstrapApplicationEnd=9]="BootstrapApplicationEnd",e[e.BootstrapComponentStart=10]="BootstrapComponentStart",e[e.BootstrapComponentEnd=11]="BootstrapComponentEnd",e[e.ChangeDetectionStart=12]="ChangeDetectionStart",e[e.ChangeDetectionEnd=13]="ChangeDetectionEnd",e[e.ChangeDetectionSyncStart=14]="ChangeDetectionSyncStart",e[e.ChangeDetectionSyncEnd=15]="ChangeDetectionSyncEnd",e[e.AfterRenderHooksStart=16]="AfterRenderHooksStart",e[e.AfterRenderHooksEnd=17]="AfterRenderHooksEnd",e[e.ComponentStart=18]="ComponentStart",e[e.ComponentEnd=19]="ComponentEnd",e[e.DeferBlockStateStart=20]="DeferBlockStateStart",e[e.DeferBlockStateEnd=21]="DeferBlockStateEnd",e[e.DynamicComponentStart=22]="DynamicComponentStart",e[e.DynamicComponentEnd=23]="DynamicComponentEnd",e[e.HostBindingsUpdateStart=24]="HostBindingsUpdateStart",e[e.HostBindingsUpdateEnd=25]="HostBindingsUpdateEnd",e})(te||{});function _I(e,t,n){let{ngOnChanges:r,ngOnInit:i,ngDoCheck:o}=t.type.prototype;if(r){let s=Kb(t);(n.preOrderHooks??=[]).push(e,s),(n.preOrderCheckHooks??=[]).push(e,s)}i&&(n.preOrderHooks??=[]).push(0-e,i),o&&((n.preOrderHooks??=[]).push(e,o),(n.preOrderCheckHooks??=[]).push(e,o))}function Qb(e,t){for(let n=t.directiveStart,r=t.directiveEnd;n<r;n++){let o=e.data[n].type.prototype,{ngAfterContentInit:s,ngAfterContentChecked:a,ngAfterViewInit:c,ngAfterViewChecked:l,ngOnDestroy:u}=o;s&&(e.contentHooks??=[]).push(-n,s),a&&((e.contentHooks??=[]).push(n,a),(e.contentCheckHooks??=[]).push(n,a)),c&&(e.viewHooks??=[]).push(-n,c),l&&((e.viewHooks??=[]).push(n,l),(e.viewCheckHooks??=[]).push(n,l)),u!=null&&(e.destroyHooks??=[]).push(n,u)}}function Fl(e,t,n){Xb(e,t,3,n)}function Bl(e,t,n,r){(e[L]&3)===n&&Xb(e,t,n,r)}function Np(e,t){let n=e[L];(n&3)===t&&(n&=16383,n+=1,e[L]=n)}function Xb(e,t,n,r){let i=r!==void 0?e[Ti]&65535:0,o=r??-1,s=t.length-1,a=0;for(let c=i;c<s;c++)if(typeof t[c+1]=="number"){if(a=t[c],r!=null&&a>=r)break}else t[c]<0&&(e[Ti]+=65536),(a<o||o==-1)&&(EI(e,n,t,c),e[Ti]=(e[Ti]&4294901760)+c+2),c++}function vb(e,t){ue(te.LifecycleHookStart,e,t);let n=A(null);try{t.call(e)}finally{A(n),ue(te.LifecycleHookEnd,e,t)}}function EI(e,t,n,r){let i=n[r]<0,o=n[r+1],s=i?-n[r]:n[r],a=e[s];i?e[L]>>14<e[Ti]>>16&&(e[L]&3)===t&&(e[L]+=16384,vb(a,o)):vb(a,o)}var xo=-1,ki=class{factory;name;injectImpl;resolving=!1;canSeeViewProviders;multi;componentProviders;index;providerFactory;constructor(t,n,r,i){this.factory=t,this.name=i,this.canSeeViewProviders=n,this.injectImpl=r}};function wI(e){return(e.flags&8)!==0}function TI(e){return(e.flags&16)!==0}function II(e,t,n){let r=0;for(;r<n.length;){let i=n[r];if(typeof i=="number"){if(i!==0)break;r++;let o=n[r++],s=n[r++],a=n[r++];e.setAttribute(t,s,a,o)}else{let o=i,s=n[++r];MI(o)?e.setProperty(t,o,s):e.setAttribute(t,o,s),r++}}return r}function SI(e){return e===3||e===4||e===6}function MI(e){return e.charCodeAt(0)===64}function Ro(e,t){if(!(t===null||t.length===0))if(e===null||e.length===0)e=t.slice();else{let n=-1;for(let r=0;r<t.length;r++){let i=t[r];typeof i=="number"?n=i:n===0||(n===-1||n===2?bb(e,n,i,null,t[++r]):bb(e,n,i,null,null))}}return e}function bb(e,t,n,r,i){let o=0,s=e.length;if(t===-1)s=-1;else for(;o<e.length;){let a=e[o++];if(typeof a=="number"){if(a===t){s=-1;break}else if(a>t){s=o-1;break}}}for(;o<e.length;){let a=e[o];if(typeof a=="number")break;if(a===n){i!==null&&(e[o+1]=i);return}o++,i!==null&&o++}s!==-1&&(e.splice(s,0,t),o=s+1),e.splice(o++,0,n),i!==null&&e.splice(o++,0,i)}function Jb(e){return e!==xo}function $l(e){return e&32767}function xI(e){return e>>16}function Hl(e,t){let n=xI(e),r=t;for(;n>0;)r=r[wi],n--;return r}var Wp=!0;function zl(e){let t=Wp;return Wp=e,t}var RI=256,eC=RI-1,tC=5,AI=0,Gn={};function kI(e,t,n){let r;typeof n=="string"?r=n.charCodeAt(0)||0:n.hasOwnProperty(Di)&&(r=n[Di]),r==null&&(r=n[Di]=AI++);let i=r&eC,o=1<<i;t.data[e+(i>>tC)]|=o}function Wl(e,t){let n=nC(e,t);if(n!==-1)return n;let r=t[k];r.firstCreatePass&&(e.injectorIndex=t.length,Op(r.data,e),Op(t,null),Op(r.blueprint,null));let i=Ch(e,t),o=e.injectorIndex;if(Jb(i)){let s=$l(i),a=Hl(i,t),c=a[k].data;for(let l=0;l<8;l++)t[o+l]=a[s+l]|c[s+l]}return t[o+8]=i,o}function Op(e,t){e.push(0,0,0,0,0,0,0,0,t)}function nC(e,t){return e.injectorIndex===-1||e.parent&&e.parent.injectorIndex===e.injectorIndex||t[e.injectorIndex+8]===null?-1:e.injectorIndex}function Ch(e,t){if(e.parent&&e.parent.injectorIndex!==-1)return e.parent.injectorIndex;let n=0,r=null,i=t;for(;i!==null;){if(r=aC(i),r===null)return xo;if(n++,i=i[wi],r.injectorIndex!==-1)return r.injectorIndex|n<<16}return xo}function Gp(e,t,n){kI(e,t,n)}function rC(e,t,n){if(n&8||e!==void 0)return e;bl(t,"NodeInjector")}function iC(e,t,n,r){if(n&8&&r===void 0&&(r=null),(n&3)===0){let i=e[cr],o=ut(void 0);try{return i?i.get(t,r,n&8):Zf(t,r,n&8)}finally{ut(o)}}return rC(r,t,n)}function oC(e,t,n,r=0,i){if(e!==null){if(t[L]&2048&&!(r&2)){let s=LI(e,t,n,r,Gn);if(s!==Gn)return s}let o=sC(e,t,n,r,Gn);if(o!==Gn)return o}return iC(t,n,r,i)}function sC(e,t,n,r,i){let o=OI(n);if(typeof o=="function"){if(!Tp(t,e,r))return r&1?rC(i,n,r):iC(t,n,r,i);try{let s;if(s=o(r),s==null&&!(r&8))bl(n);else return s}finally{Ip()}}else if(typeof o=="number"){let s=null,a=nC(e,t),c=xo,l=r&1?t[pt][ft]:null;for((a===-1||r&4)&&(c=a===-1?Ch(e,t):t[a+8],c===xo||!Db(r,!1)?a=-1:(s=t[k],a=$l(c),t=Hl(c,t)));a!==-1;){let u=t[k];if(Cb(o,a,u.data)){let d=NI(a,t,n,s,r,l);if(d!==Gn)return d}c=t[a+8],c!==xo&&Db(r,t[k].data[a+8]===l)&&Cb(o,a,t)?(s=u,a=$l(c),t=Hl(c,t)):a=-1}}return i}function NI(e,t,n,r,i,o){let s=t[k],a=s.data[e+8],c=r==null?zn(a)&&Wp:r!=s&&(a.type&3)!==0,l=i&1&&o===a,u=jl(a,s,n,c,l);return u!==null?na(t,s,u,a,i):Gn}function jl(e,t,n,r,i){let o=e.providerIndexes,s=t.data,a=o&1048575,c=e.directiveStart,l=e.directiveEnd,u=o>>20,d=r?a:a+u,f=i?a+u:l;for(let p=d;p<f;p++){let m=s[p];if(p<c&&n===m||p>=c&&m.type===n)return p}if(i){let p=s[c];if(p&&Wn(p)&&p.type===n)return c}return null}function na(e,t,n,r,i){let o=e[n],s=t.data;if(o instanceof ki){let a=o;if(a.resolving)throw Kf("");let c=zl(a.canSeeViewProviders);a.resolving=!0;let l=s[n].type||s[n],u,d=a.injectImpl?ut(a.injectImpl):null,f=Tp(e,r,0);try{o=e[n]=a.factory(void 0,i,s,e,r),t.firstCreatePass&&n>=r.directiveStart&&_I(n,s[n],t)}finally{d!==null&&ut(d),zl(c),a.resolving=!1,Ip()}}return o}function OI(e){if(typeof e=="string")return e.charCodeAt(0)||0;let t=e.hasOwnProperty(Di)?e[Di]:void 0;return typeof t=="number"?t>=0?t&eC:PI:t}function Cb(e,t,n){let r=1<<e;return!!(n[t+(e>>tC)]&r)}function Db(e,t){return!(e&2)&&!(e&1&&t)}var Ai=class{_tNode;_lView;constructor(t,n){this._tNode=t,this._lView=n}get(t,n,r){return oC(this._tNode,this._lView,t,yi(r),n)}};function PI(){return new Ai(ht(),B())}function hr(e){return aa(()=>{let t=e.prototype.constructor,n=t[Ls]||qp(t),r=Object.prototype,i=Object.getPrototypeOf(e.prototype).constructor;for(;i&&i!==r;){let o=i[Ls]||qp(i);if(o&&o!==n)return o;i=Object.getPrototypeOf(i)}return o=>new o})}function qp(e){return Bf(e)?()=>{let t=qp(Ye(e));return t&&t()}:kr(e)}function LI(e,t,n,r,i){let o=e,s=t;for(;o!==null&&s!==null&&s[L]&2048&&!Io(s);){let a=sC(o,s,n,r|2,Gn);if(a!==Gn)return a;let c=o.parent;if(!c){let l=s[rp];if(l){let u=l.get(n,Gn,r&-5);if(u!==Gn)return u}c=aC(s),s=s[wi]}o=c}return i}function aC(e){let t=e[k],n=t.type;return n===2?t.declTNode:n===1?e[ft]:null}function FI(){return Po(ht(),B())}function Po(e,t){return new we(Xt(e,t))}var we=(()=>{class e{nativeElement;constructor(n){this.nativeElement=n}static __NG_ELEMENT_ID__=FI}return e})();function BI(e){return e instanceof we?e.nativeElement:e}function jI(){return this._results[Symbol.iterator]()}var fr=class{_emitDistinctChangesOnly;dirty=!0;_onDirty=void 0;_results=[];_changesDetected=!1;_changes=void 0;length=0;first=void 0;last=void 0;get changes(){return this._changes??=new M}constructor(t=!1){this._emitDistinctChangesOnly=t}get(t){return this._results[t]}map(t){return this._results.map(t)}filter(t){return this._results.filter(t)}find(t){return this._results.find(t)}reduce(t,n){return this._results.reduce(t,n)}forEach(t){this._results.forEach(t)}some(t){return this._results.some(t)}toArray(){return this._results.slice()}toString(){return this._results.toString()}reset(t,n){this.dirty=!1;let r=Av(t);(this._changesDetected=!Rv(this._results,r,n))&&(this._results=r,this.length=r.length,this.last=r[this.length-1],this.first=r[0])}notifyOnChanges(){this._changes!==void 0&&(this._changesDetected||!this._emitDistinctChangesOnly)&&this._changes.next(this)}onDirty(t){this._onDirty=t}setDirty(){this.dirty=!0,this._onDirty?.()}destroy(){this._changes!==void 0&&(this._changes.complete(),this._changes.unsubscribe())}[Symbol.iterator]=jI};function cC(e){return(e.flags&128)===128}var Dh=(function(e){return e[e.OnPush=0]="OnPush",e[e.Eager=1]="Eager",e[e.Default=1]="Default",e})(Dh||{}),lC=new Map,VI=0;function UI(){return VI++}function $I(e){lC.set(e[lr],e)}function Kp(e){lC.delete(e[lr])}var _b="__ngContext__";function Ao(e,t){ur(t)?(e[_b]=t[lr],$I(t)):e[_b]=t}function uC(e){return fC(e[To])}function dC(e){return fC(e[Yt])}function fC(e){for(;e!==null&&!Dn(e);)e=e[Yt];return e}var HI;function _h(e){HI=e}var Lo=new _("",{factory:()=>zI}),zI="ng";var ou=new _(""),Fi=new _("",{providedIn:"platform",factory:()=>"unknown"}),Eh=new _(""),Fo=new _("",{factory:()=>h(de).body?.querySelector("[ngCspNonce]")?.getAttribute("ngCspNonce")||null});var pC="r";var hC="di";var mC=!1,gC=new _("",{factory:()=>mC});var Eb=new WeakMap;function WI(e,t){if(e==null||typeof e!="object")return;let n=Eb.get(e);n||(n=new WeakSet,Eb.set(e,n)),n.add(t)}var GI=(e,t,n,r)=>{};function qI(e,t,n,r){GI(e,t,n,r)}function su(e){return(e.flags&32)===32}var KI=()=>null;function yC(e,t,n=!1){return KI(e,t,n)}function vC(e,t){let n=e.contentQueries;if(n!==null){let r=A(null);try{for(let i=0;i<n.length;i+=2){let o=n[i],s=n[i+1];if(s!==-1){let a=e.data[s];xl(o),a.contentQueries(2,t[s],s)}}}finally{A(r)}}}function Zp(e,t,n){xl(0);let r=A(null);try{t(e,n)}finally{A(r)}}function bC(e,t,n){if(op(t)){let r=A(null);try{let i=t.directiveStart,o=t.directiveEnd;for(let s=i;s<o;s++){let a=e.data[s];if(a.contentQueries){let c=n[s];a.contentQueries(1,c,s)}}}finally{A(r)}}}var Tn=(function(e){return e[e.Emulated=0]="Emulated",e[e.None=2]="None",e[e.ShadowDom=3]="ShadowDom",e[e.ExperimentalIsolatedShadowDom=4]="ExperimentalIsolatedShadowDom",e})(Tn||{});var Yp=class{changingThisBreaksApplicationSecurity;constructor(t){this.changingThisBreaksApplicationSecurity=t}toString(){return`SafeValue must use [property]=binding: ${this.changingThisBreaksApplicationSecurity} (see ${Ff})`}};function wh(e){return e instanceof Yp?e.changingThisBreaksApplicationSecurity:e}function ZI(e,t){return e.createText(t)}function YI(e,t,n){e.setValue(t,n)}function CC(e,t,n){return e.createElement(t,n)}function Gl(e,t,n,r,i){e.insertBefore(t,n,r,i)}function DC(e,t,n){e.appendChild(t,n)}function wb(e,t,n,r,i){r!==null?Gl(e,t,n,r,i):DC(e,t,n)}function _C(e,t,n,r){e.removeChild(null,t,n,r)}function QI(e,t,n){e.setAttribute(t,"style",n)}function XI(e,t,n){n===""?e.removeAttribute(t,"class"):e.setAttribute(t,"class",n)}function EC(e,t,n){let{mergedAttrs:r,classes:i,styles:o}=n;r!==null&&II(e,t,r),i!==null&&XI(e,t,i),o!==null&&QI(e,t,o)}function wC(e){return e instanceof Function?e():e}function JI(e,t,n){let r=e.length;for(;;){let i=e.indexOf(t,n);if(i===-1)return i;if(i===0||e.charCodeAt(i-1)<=32){let o=t.length;if(i+o===r||e.charCodeAt(i+o)<=32)return i}n=i+1}}var TC="ng-template";function eS(e,t,n,r){let i=0;if(r){for(;i<t.length&&typeof t[i]=="string";i+=2)if(t[i]==="class"&&JI(t[i+1].toLowerCase(),n,0)!==-1)return!0}else if(Th(e))return!1;if(i=t.indexOf(1,i),i>-1){let o;for(;++i<t.length&&typeof(o=t[i])=="string";)if(o.toLowerCase()===n)return!0}return!1}function Th(e){return e.type===4&&e.value!==TC}function tS(e,t,n){let r=e.type===4&&!n?TC:e.value;return t===r}function nS(e,t,n){let r=4,i=e.attrs,o=i!==null?oS(i):0,s=!1;for(let a=0;a<t.length;a++){let c=t[a];if(typeof c=="number"){if(!s&&!En(r)&&!En(c))return!1;if(s&&En(c))continue;s=!1,r=c|r&1;continue}if(!s)if(r&4){if(r=2|r&1,c!==""&&!tS(e,c,n)||c===""&&t.length===1){if(En(r))return!1;s=!0}}else if(r&8){if(i===null||!eS(e,i,c,n)){if(En(r))return!1;s=!0}}else{let l=t[++a],u=rS(c,i,Th(e),n);if(u===-1){if(En(r))return!1;s=!0;continue}if(l!==""){let d;if(u>o?d="":d=i[u+1].toLowerCase(),r&2&&l!==d){if(En(r))return!1;s=!0}}}}return En(r)||s}function En(e){return(e&1)===0}function rS(e,t,n,r){if(t===null)return-1;let i=0;if(r||!n){let o=!1;for(;i<t.length;){let s=t[i];if(s===e)return i;if(s===3||s===6)o=!0;else if(s===1||s===2){let a=t[++i];for(;typeof a=="string";)a=t[++i];continue}else{if(s===4)break;if(s===0){i+=4;continue}}i+=o?1:2}return-1}else return sS(t,e)}function IC(e,t,n=!1){for(let r=0;r<t.length;r++)if(nS(e,t[r],n))return!0;return!1}function iS(e){let t=e.attrs;if(t!=null){let n=t.indexOf(5);if((n&1)===0)return t[n+1]}return null}function oS(e){for(let t=0;t<e.length;t++){let n=e[t];if(SI(n))return t}return e.length}function sS(e,t){let n=e.indexOf(4);if(n>-1)for(n++;n<e.length;){let r=e[n];if(typeof r=="number")return-1;if(r===t)return n;n++}return-1}function aS(e,t){e:for(let n=0;n<t.length;n++){let r=t[n];if(e.length===r.length){for(let i=0;i<e.length;i++)if(e[i]!==r[i])continue e;return!0}}return!1}function Tb(e,t){return e?":not("+t.trim()+")":t}function cS(e){let t=e[0],n=1,r=2,i="",o=!1;for(;n<e.length;){let s=e[n];if(typeof s=="string")if(r&2){let a=e[++n];i+="["+s+(a.length>0?'="'+a+'"':"")+"]"}else r&8?i+="."+s:r&4&&(i+=" "+s);else i!==""&&!En(s)&&(t+=Tb(o,i),i=""),r=s,o=o||!En(r);n++}return i!==""&&(t+=Tb(o,i)),t}function lS(e){return e.map(cS).join(",")}function uS(e){let t=[],n=[],r=1,i=2;for(;r<e.length;){let o=e[r];if(typeof o=="string")i===2?o!==""&&t.push(o,e[++r]):i===8&&n.push(o);else{if(!En(i))break;i=o}r++}return n.length&&t.push(1,...n),t}var tn={};function Ih(e,t,n,r,i,o,s,a,c,l,u){let d=Ee+r,f=d+i,p=dS(d,f),m=typeof l=="function"?l():l;return p[k]={type:e,blueprint:p,template:n,queries:null,viewQuery:a,declTNode:t,data:p.slice().fill(null,d),bindingStartIndex:d,expandoStartIndex:f,hostBindingOpCodes:null,firstCreatePass:!0,firstUpdatePass:!0,staticViewQueries:!1,staticContentQueries:!1,preOrderHooks:null,preOrderCheckHooks:null,contentHooks:null,contentCheckHooks:null,viewHooks:null,viewCheckHooks:null,destroyHooks:null,cleanup:null,contentQueries:null,components:null,directiveRegistry:typeof o=="function"?o():o,pipeRegistry:typeof s=="function"?s():s,firstChild:null,schemas:c,consts:m,incompleteFirstPass:!1,ssrId:u}}function dS(e,t){let n=[];for(let r=0;r<t;r++)n.push(r<e?null:tn);return n}function fS(e){let t=e.tView;return t===null||t.incompleteFirstPass?e.tView=Ih(1,null,e.template,e.decls,e.vars,e.directiveDefs,e.pipeDefs,e.viewQuery,e.schemas,e.consts,e.id):t}function Sh(e,t,n,r,i,o,s,a,c,l,u){let d=t.blueprint.slice();return d[Cn]=i,d[L]=r|4|128|8|64|1024,(l!==null||e&&e[L]&2048)&&(d[L]|=2048),cp(d),d[Ve]=d[wi]=e,d[Le]=n,d[$n]=s||e&&e[$n],d[_e]=a||e&&e[_e],d[cr]=c||e&&e[cr]||null,d[ft]=o,d[lr]=UI(),d[Ei]=u,d[rp]=l,d[pt]=t.type==2?e[pt]:d,d}function pS(e,t,n){let r=Xt(t,e),i=fS(n),o=e[$n].rendererFactory,s=Mh(e,Sh(e,i,null,SC(n),r,t,null,o.createRenderer(r,n),null,null,null));return e[t.index]=s}function SC(e){let t=16;return e.signals?t=4096:e.onPush&&(t=64),t}function MC(e,t,n,r){if(n===0)return-1;let i=t.length;for(let o=0;o<n;o++)t.push(r),e.blueprint.push(r),e.data.push(null);return i}function Mh(e,t){return e[To]?e[np][Yt]=t:e[To]=t,e[np]=t,t}function Z(e=1){xC(Oe(),B(),dr()+e,!1)}function xC(e,t,n,r){if(!r)if((t[L]&3)===3){let o=e.preOrderCheckHooks;o!==null&&Fl(t,o,n)}else{let o=e.preOrderHooks;o!==null&&Bl(t,o,0,n)}Hr(n)}var au=(function(e){return e[e.None=0]="None",e[e.SignalBased=1]="SignalBased",e[e.HasDecoratorInputTransform=2]="HasDecoratorInputTransform",e})(au||{});function Qp(e,t,n,r){let i=A(null);try{let[o,s,a]=e.inputs[n],c=null;(s&au.SignalBased)!==0&&(c=t[o][rt]),c!==null&&c.transformFn!==void 0?r=c.transformFn(r):a!==null&&(r=a.call(t,r)),e.setInput!==null?e.setInput(t,c,r,n,o):qb(t,c,o,r)}finally{A(i)}}var qn=(function(e){return e[e.Important=1]="Important",e[e.DashCase=2]="DashCase",e})(qn||{}),hS;function xh(e,t){return hS(e,t)}var mU=typeof document<"u"&&typeof document?.documentElement?.getAnimations=="function";var Xp=new WeakMap,Js=new WeakSet;function mS(e,t){let n=Xp.get(e);if(!n||n.length===0)return;let r=t.parentNode,i=t.previousSibling;for(let o=n.length-1;o>=0;o--){let s=n[o],a=s.parentNode;s===t?(n.splice(o,1),Js.add(s),s.dispatchEvent(new CustomEvent("animationend",{detail:{cancel:!0}}))):(i&&s===i||a&&r&&a!==r)&&(n.splice(o,1),s.dispatchEvent(new CustomEvent("animationend",{detail:{cancel:!0}})),s.parentNode?.removeChild(s))}}function gS(e,t){let n=Xp.get(e);n?n.includes(t)||n.push(t):Xp.set(e,[t])}var Ni=new Set,cu=(function(e){return e[e.CHANGE_DETECTION=0]="CHANGE_DETECTION",e[e.AFTER_NEXT_RENDER=1]="AFTER_NEXT_RENDER",e})(cu||{}),Gr=new _(""),Ib=new Set;function mr(e){Ib.has(e)||(Ib.add(e),performance?.mark?.("mark_feature_usage",{detail:{feature:e}}))}var Rh=(()=>{class e{impl=null;execute(){this.impl?.execute()}static \u0275prov=C({token:e,providedIn:"root",factory:()=>new e})}return e})(),RC=[0,1,2,3],AC=(()=>{class e{ngZone=h(K);scheduler=h(Pr);errorHandler=h(Un,{optional:!0});sequences=new Set;deferredRegistrations=new Set;executing=!1;constructor(){h(Gr,{optional:!0})}execute(){let n=this.sequences.size>0;n&&ue(te.AfterRenderHooksStart),this.executing=!0;for(let r of RC)for(let i of this.sequences)if(!(i.erroredOrDestroyed||!i.hooks[r]))try{i.pipelinedValue=this.ngZone.runOutsideAngular(()=>this.maybeTrace(()=>{let o=i.hooks[r];return o(i.pipelinedValue)},i.snapshot))}catch(o){i.erroredOrDestroyed=!0,this.errorHandler?.handleError(o)}this.executing=!1;for(let r of this.sequences)r.afterRun(),r.once&&(this.sequences.delete(r),r.destroy());for(let r of this.deferredRegistrations)this.sequences.add(r);this.deferredRegistrations.size>0&&this.scheduler.notify(7),this.deferredRegistrations.clear(),n&&ue(te.AfterRenderHooksEnd)}register(n){let{view:r}=n;r!==void 0?((r[Ii]??=[]).push(n),xi(r),r[L]|=8192):this.executing?this.deferredRegistrations.add(n):this.addSequence(n)}addSequence(n){this.sequences.add(n),this.scheduler.notify(7)}unregister(n){this.executing&&this.sequences.has(n)?(n.erroredOrDestroyed=!0,n.pipelinedValue=void 0,n.once=!0):(this.sequences.delete(n),this.deferredRegistrations.delete(n))}maybeTrace(n,r){return r?r.run(cu.AFTER_NEXT_RENDER,n):n()}static \u0275prov=C({token:e,providedIn:"root",factory:()=>new e})}return e})(),ql=class{impl;hooks;view;once;snapshot;erroredOrDestroyed=!1;pipelinedValue=void 0;unregisterOnDestroy;constructor(t,n,r,i,o,s=null){this.impl=t,this.hooks=n,this.view=r,this.once=i,this.snapshot=s,this.unregisterOnDestroy=o?.onDestroy(()=>this.destroy())}afterRun(){this.erroredOrDestroyed=!1,this.pipelinedValue=void 0,this.snapshot?.dispose(),this.snapshot=null}destroy(){this.impl.unregister(this),this.unregisterOnDestroy?.();let t=this.view?.[Ii];t&&(this.view[Ii]=t.filter(n=>n!==this))}};function qr(e,t){let n=t?.injector??h(Te);return mr("NgAfterNextRender"),vS(e,n,t,!0)}function yS(e){return e instanceof Function?[void 0,void 0,e,void 0]:[e.earlyRead,e.write,e.mixedReadWrite,e.read]}function vS(e,t,n,r){let i=t.get(Rh);i.impl??=t.get(AC);let o=t.get(Gr,null,{optional:!0}),s=n?.manualCleanup!==!0?t.get(Qe):null,a=t.get(Zs,null,{optional:!0}),c=new ql(i.impl,yS(e),a?.view,r,s,o?.snapshot(null));return i.impl.register(c),c}var kC=new _("",{factory:()=>({queue:new Set,isScheduled:!1,scheduler:null,injector:h(ke)})});function NC(e,t,n){let r=e.get(kC);if(Array.isArray(t))for(let i of t)r.queue.add(i),n?.detachedLeaveAnimationFns?.push(i);else r.queue.add(t),n?.detachedLeaveAnimationFns?.push(t);r.scheduler&&r.scheduler(e)}function bS(e,t){let n=e.get(kC);if(t.detachedLeaveAnimationFns){for(let r of t.detachedLeaveAnimationFns)n.queue.delete(r);t.detachedLeaveAnimationFns=void 0}}function CS(e,t){for(let[n,r]of t)NC(e,r.animateFns)}function Sb(e,t,n,r){let i=e?.[jr]?.enter;t!==null&&i&&i.has(n.index)&&CS(r,i)}function Mo(e,t,n,r,i,o,s,a){if(i!=null){let c,l=!1;Dn(i)?c=i:ur(i)&&(l=!0,i=i[Cn]);let u=Qt(i);e===0&&r!==null?(Sb(a,r,o,n),s==null?DC(t,r,u):Gl(t,r,u,s||null,!0)):e===1&&r!==null?(Sb(a,r,o,n),Gl(t,r,u,s||null,!0),mS(o,u)):e===2?(a?.[jr]?.leave?.has(o.index)&&gS(o,u),Js.delete(u),Mb(a,o,n,d=>{if(Js.has(u)){Js.delete(u);return}_C(t,u,l,d)})):e===3&&(Js.delete(u),Mb(a,o,n,()=>{t.destroyNode(u)})),c!=null&&AS(t,e,n,c,o,r,s)}}function DS(e,t){OC(e,t),t[Cn]=null,t[ft]=null}function _S(e,t,n,r,i,o){r[Cn]=i,r[ft]=t,uu(e,r,n,1,i,o)}function OC(e,t){t[$n].changeDetectionScheduler?.notify(9),uu(e,t,t[_e],2,null,null)}function ES(e){let t=e[To];if(!t)return Pp(e[k],e);for(;t;){let n=null;if(ur(t))n=t[To];else{let r=t[Ne];r&&(n=r)}if(!n){for(;t&&!t[Yt]&&t!==e;)ur(t)&&Pp(t[k],t),t=t[Ve];t===null&&(t=e),ur(t)&&Pp(t[k],t),n=t&&t[Yt]}t=n}}function Ah(e,t){let n=e[Si],r=n.indexOf(t);n.splice(r,1)}function lu(e,t){if(Mi(t))return;let n=t[_e];n.destroyNode&&uu(e,t,n,3,null,null),ES(t)}function Pp(e,t){if(Mi(t))return;let n=A(null);try{t[L]&=-129,t[L]|=256,t[Ft]&&ui(t[Ft]),IS(e,t),TS(e,t),t[k].type===1&&t[_e].destroy();let r=t[Br];if(r!==null&&Dn(t[Ve])){r!==t[Ve]&&Ah(r,t);let i=t[Hn];i!==null&&i.detachView(e)}Kp(t)}finally{A(n)}}function Mb(e,t,n,r){let i=e?.[jr];if(i==null||i.leave==null||!i.leave.has(t.index))return r(!1);e&&Ni.add(e[lr]),NC(n,()=>{if(i.leave&&i.leave.has(t.index)){let s=i.leave.get(t.index),a=[];if(s){for(let c=0;c<s.animateFns.length;c++){let l=s.animateFns[c],{promise:u}=l();a.push(u)}i.detachedLeaveAnimationFns=void 0}i.running=Promise.allSettled(a),wS(e,r)}else e&&Ni.delete(e[lr]),r(!1)},i)}function wS(e,t){let n=e[jr]?.running;if(n){n.then(()=>{e[jr].running=void 0,Ni.delete(e[lr]),t(!0)});return}t(!1)}function TS(e,t){let n=e.cleanup,r=t[wo];if(n!==null)for(let s=0;s<n.length-1;s+=2)if(typeof n[s]=="string"){let a=n[s+3];a>=0?r[a]():r[-a].unsubscribe(),s+=2}else{let a=r[n[s+1]];n[s].call(a)}r!==null&&(t[wo]=null);let i=t[sr];if(i!==null){t[sr]=null;for(let s=0;s<i.length;s++){let a=i[s];a()}}let o=t[Nr];if(o!==null){t[Nr]=null;for(let s of o)s.destroy()}}function IS(e,t){let n;if(e!=null&&(n=e.destroyHooks)!=null)for(let r=0;r<n.length;r+=2){let i=t[n[r]];if(!(i instanceof ki)){let o=n[r+1];if(Array.isArray(o))for(let s=0;s<o.length;s+=2){let a=i[o[s]],c=o[s+1];ue(te.LifecycleHookStart,a,c);try{c.call(a)}finally{ue(te.LifecycleHookEnd,a,c)}}else{ue(te.LifecycleHookStart,i,o);try{o.call(i)}finally{ue(te.LifecycleHookEnd,i,o)}}}}}function PC(e,t,n){return SS(e,t.parent,n)}function SS(e,t,n){let r=t;for(;r!==null&&r.type&168;)t=r,r=t.parent;if(r===null)return n[Cn];if(zn(r)){let{encapsulation:i}=e.data[r.directiveStart+r.componentOffset];if(i===Tn.None||i===Tn.Emulated)return null}return Xt(r,n)}function LC(e,t,n){return xS(e,t,n)}function MS(e,t,n){return e.type&40?Xt(e,n):null}var xS=MS,xb;function kh(e,t,n,r){let i=PC(e,r,t),o=t[_e],s=r.parent||t[ft],a=LC(s,r,t);if(i!=null)if(Array.isArray(n))for(let c=0;c<n.length;c++)wb(o,i,n[c],a,!1);else wb(o,i,n,a,!1);xb!==void 0&&xb(o,r,t,n,i)}function ea(e,t){if(t!==null){let n=t.type;if(n&3)return Xt(t,e);if(n&4)return Jp(-1,e[t.index]);if(n&8){let r=t.child;if(r!==null)return ea(e,r);{let i=e[t.index];return Dn(i)?Jp(-1,i):Qt(i)}}else{if(n&128)return ea(e,t.next);if(n&32)return xh(t,e)()||Qt(e[t.index]);{let r=FC(e,t);if(r!==null){if(Array.isArray(r))return r[0];let i=Or(e[pt]);return ea(i,r)}else return ea(e,t.next)}}}return null}function FC(e,t){if(t!==null){let r=e[pt][ft],i=t.projection;return r.projection[i]}return null}function Jp(e,t){let n=Ne+e+1;if(n<t.length){let r=t[n],i=r[k].firstChild;if(i!==null)return ea(r,i)}return t[Vr]}function Nh(e,t,n,r,i,o,s){for(;n!=null;){let a=r[cr];if(n.type===128){n=n.next;continue}let c=r[n.index],l=n.type;if(s&&t===0&&(c&&Ao(Qt(c),r),n.flags|=2),!su(n))if(l&8)Nh(e,t,n.child,r,i,o,!1),Mo(t,e,a,i,c,n,o,r);else if(l&32){let u=xh(n,r),d;for(;d=u();)Mo(t,e,a,i,d,n,o,r);Mo(t,e,a,i,c,n,o,r)}else l&16?BC(e,t,r,n,i,o):Mo(t,e,a,i,c,n,o,r);n=s?n.projectionNext:n.next}}function uu(e,t,n,r,i,o){Nh(n,r,e.firstChild,t,i,o,!1)}function RS(e,t,n){let r=t[_e],i=PC(e,n,t),o=n.parent||t[ft],s=LC(o,n,t);BC(r,0,t,n,i,s)}function BC(e,t,n,r,i,o){let s=n[pt],c=s[ft].projection[r.projection];if(Array.isArray(c))for(let l=0;l<c.length;l++){let u=c[l];Mo(t,e,n[cr],i,u,r,o,n)}else{let l=c,u=s[Ve];cC(r)&&(l.flags|=128),Nh(e,t,l,u,i,o,!0)}}function AS(e,t,n,r,i,o,s){let a=r[Vr],c=Qt(r);a!==c&&Mo(t,e,n,o,a,i,s);for(let l=Ne;l<r.length;l++){let u=r[l];uu(u[k],u,e,t,o,a)}}function kS(e,t,n,r,i){if(t)i?e.addClass(n,r):e.removeClass(n,r);else{let o=r.indexOf("-")===-1?void 0:qn.DashCase;i==null?e.removeStyle(n,r,o):(typeof i=="string"&&i.endsWith("!important")&&(i=i.slice(0,-10),o|=qn.Important),e.setStyle(n,r,i,o))}}function jC(e,t,n,r,i){let o=dr(),s=r&2;try{Hr(-1),s&&t.length>Ee&&xC(e,t,Ee,!1);let a=s?te.TemplateUpdateStart:te.TemplateCreateStart;ue(a,i,n),n(r,i)}finally{Hr(o);let a=s?te.TemplateUpdateEnd:te.TemplateCreateEnd;ue(a,i,n)}}function Oh(e,t,n){jS(e,t,n),(n.flags&64)===64&&VS(e,t,n)}function du(e,t,n=Xt){let r=t.localNames;if(r!==null){let i=t.index+1;for(let o=0;o<r.length;o+=2){let s=r[o+1],a=s===-1?n(t,e):e[s];e[i++]=a}}}function NS(e,t,n,r){let o=r.get(gC,mC)||n===Tn.ShadowDom||n===Tn.ExperimentalIsolatedShadowDom,s=e.selectRootElement(t,o);return OS(s),s}function OS(e){PS(e)}var PS=()=>null;function LS(e){return e==="class"?"className":e==="for"?"htmlFor":e==="formaction"?"formAction":e==="innerHtml"?"innerHTML":e==="readonly"?"readOnly":e==="tabindex"?"tabIndex":e}function FS(e,t,n,r,i,o){let s=t[k];if(fu(e,s,t,n,r)){zn(e)&&VC(t,e.index);return}e.type&3&&(n=LS(n)),BS(e,t,n,r,i,o)}function BS(e,t,n,r,i,o){if(e.type&3){let s=Xt(e,t);r=o!=null?o(r,e.value||"",n):r,i.setProperty(s,n,r)}else e.type&12}function VC(e,t){let n=Jt(t,e);n[L]&16||(n[L]|=64)}function jS(e,t,n){let r=n.directiveStart,i=n.directiveEnd;zn(n)&&pS(t,n,e.data[r+n.componentOffset]),e.firstCreatePass||Wl(n,t);let o=n.initialInputs;for(let s=r;s<i;s++){let a=e.data[s],c=na(t,e,s,n);if(Ao(c,t),o!==null&&HS(t,s-r,c,a,n,o),Wn(a)){let l=Jt(n.index,t);l[Le]=na(t,e,s,n)}}}function VS(e,t,n){let r=n.directiveStart,i=n.directiveEnd,o=n.index,s=tb();try{Hr(o);for(let a=r;a<i;a++){let c=e.data[a],l=t[a];Ml(a),(c.hostBindings!==null||c.hostVars!==0||c.hostAttrs!==null)&&US(c,l)}}finally{Hr(-1),Ml(s)}}function US(e,t){e.hostBindings!==null&&e.hostBindings(1,t)}function UC(e,t){let n=e.directiveRegistry,r=null;if(n)for(let i=0;i<n.length;i++){let o=n[i];IC(t,o.selectors,!1)&&(r??=[],Wn(o)?r.unshift(o):r.push(o))}return r}function $S(e,t,n,r,i,o){let s=Xt(e,t);$C(t[_e],s,o,e.value,n,r,i)}function $C(e,t,n,r,i,o,s){if(o==null)e.removeAttribute(t,i,n);else{let a=s==null?qf(o):s(o,r||"",i);e.setAttribute(t,i,a,n)}}function HS(e,t,n,r,i,o){let s=o[t];if(s!==null)for(let a=0;a<s.length;a+=2){let c=s[a],l=s[a+1];Qp(r,n,c,l)}}function HC(e,t,n,r,i){let o=Ee+n,s=t[k],a=i(s,t,e,r,n);t[o]=a,So(e,!0);let c=e.type===2;return c?(EC(t[_e],a,e),(Kv()===0||qs(e))&&Ao(a,t),Zv()):Ao(a,t),Nl()&&(!c||!su(e))&&kh(s,t,a,e),e}function zC(e){let t=e;return bp()?Cp():(t=t.parent,So(t,!1)),t}function zS(e,t){let n=e[cr];if(!n)return;let r;try{r=n.get(_n,null)}catch{r=null}r?.(t)}function fu(e,t,n,r,i){let o=e.inputs?.[r],s=e.hostDirectiveInputs?.[r],a=!1;if(s)for(let c=0;c<s.length;c+=2){let l=s[c],u=s[c+1],d=t.data[l];Qp(d,n[l],u,i),a=!0}if(o)for(let c of o){let l=n[c],u=t.data[c];Qp(u,l,r,i),a=!0}return a}function WS(e,t){let n=Jt(t,e),r=n[k];GS(r,n);let i=n[Cn];i!==null&&n[Ei]===null&&(n[Ei]=yC(i,n[cr])),ue(te.ComponentStart);try{Ph(r,n,n[Le])}finally{ue(te.ComponentEnd,n[Le])}}function GS(e,t){for(let n=t.length;n<e.blueprint.length;n++)t.push(e.blueprint[n])}function Ph(e,t,n){Rl(t);try{let r=e.viewQuery;r!==null&&Zp(1,r,n);let i=e.template;i!==null&&jC(e,t,i,1,n),e.firstCreatePass&&(e.firstCreatePass=!1),t[Hn]?.finishViewCreation(e),e.staticContentQueries&&vC(e,t),e.staticViewQueries&&Zp(2,e.viewQuery,n);let o=e.components;o!==null&&qS(t,o)}catch(r){throw e.firstCreatePass&&(e.incompleteFirstPass=!0,e.firstCreatePass=!1),r}finally{t[L]&=-5,Al()}}function qS(e,t){for(let n=0;n<t.length;n++)WS(e,t[n])}function ca(e,t,n,r){let i=A(null);try{let o=t.tView,a=e[L]&4096?4096:16,c=Sh(e,o,n,a,null,t,null,null,r?.injector??null,r?.embeddedViewInjector??null,r?.dehydratedView??null),l=e[t.index];c[Br]=l;let u=e[Hn];return u!==null&&(c[Hn]=u.createEmbeddedView(o)),Ph(o,c,n),c}finally{A(i)}}function ko(e,t){return!t||t.firstChild===null||cC(e)}function ra(e,t,n,r,i=!1){for(;n!==null;){if(n.type===128){n=i?n.projectionNext:n.next;continue}let o=t[n.index];o!==null&&r.push(Qt(o)),Dn(o)&&WC(o,r);let s=n.type;if(s&8)ra(e,t,n.child,r);else if(s&32){let a=xh(n,t),c;for(;c=a();)r.push(c)}else if(s&16){let a=FC(t,n);if(Array.isArray(a))r.push(...a);else{let c=Or(t[pt]);ra(c[k],c,a,r,!0)}}n=i?n.projectionNext:n.next}return r}function WC(e,t){for(let n=Ne;n<e.length;n++){let r=e[n],i=r[k].firstChild;i!==null&&ra(r[k],r,i,t)}e[Vr]!==e[Cn]&&t.push(e[Vr])}function GC(e){if(e[Ii]!==null){for(let t of e[Ii])t.impl.addSequence(t);e[Ii].length=0}}var qC=[];function KS(e){return e[Ft]??ZS(e)}function ZS(e){let t=qC.pop()??Object.create(QS);return t.lView=e,t}function YS(e){e.lView[Ft]!==e&&(e.lView=null,qC.push(e))}var QS=$(g({},ci),{consumerIsAlwaysLive:!0,kind:"template",consumerMarkedDirty:e=>{xi(e.lView)},consumerOnSignalRead(){this.lView[Ft]=this}});function XS(e){let t=e[Ft]??Object.create(JS);return t.lView=e,t}var JS=$(g({},ci),{consumerIsAlwaysLive:!0,kind:"template",consumerMarkedDirty:e=>{let t=Or(e.lView);for(;t&&!KC(t[k]);)t=Or(t);t&&lp(t)},consumerOnSignalRead(){this.lView[Ft]=this}});function KC(e){return e.type!==2}function ZC(e){if(e[Nr]===null)return;let t=!0;for(;t;){let n=!1;for(let r of e[Nr])r.dirty&&(n=!0,r.zone===null||Zone.current===r.zone?r.run():r.zone.run(()=>r.run()));t=n&&!!(e[L]&8192)}}var eM=100;function YC(e,t=0){let r=e[$n].rendererFactory,i=!1;i||r.begin?.();try{tM(e,t)}finally{i||r.end?.()}}function tM(e,t){let n=Dp();try{Bs(!0),eh(e,t);let r=0;for(;Ks(e);){if(r===eM)throw new E(103,!1);r++,eh(e,1)}}finally{Bs(n)}}function nM(e,t,n,r){if(Mi(t))return;let i=t[L],o=!1,s=!1;Rl(t);let a=!0,c=null,l=null;o||(KC(e)?(l=KS(t),c=li(l)):Tc()===null?(a=!1,l=XS(t),c=li(l)):t[Ft]&&(ui(t[Ft]),t[Ft]=null));try{cp(t),Xv(e.bindingStartIndex),n!==null&&jC(e,t,n,2,r);let u=(i&3)===3;if(!o)if(u){let p=e.preOrderCheckHooks;p!==null&&Fl(t,p,null)}else{let p=e.preOrderHooks;p!==null&&Bl(t,p,0,null),Np(t,0)}if(s||rM(t),ZC(t),QC(t,0),e.contentQueries!==null&&vC(e,t),!o)if(u){let p=e.contentCheckHooks;p!==null&&Fl(t,p)}else{let p=e.contentHooks;p!==null&&Bl(t,p,1),Np(t,1)}oM(e,t);let d=e.components;d!==null&&JC(t,d,0);let f=e.viewQuery;if(f!==null&&Zp(2,f,r),!o)if(u){let p=e.viewCheckHooks;p!==null&&Fl(t,p)}else{let p=e.viewHooks;p!==null&&Bl(t,p,2),Np(t,2)}if(e.firstUpdatePass===!0&&(e.firstUpdatePass=!1),t[El]){for(let p of t[El])p();t[El]=null}o||(GC(t),t[L]&=-73)}catch(u){throw o||xi(t),u}finally{l!==null&&(co(l,c),a&&YS(l)),Al()}}function QC(e,t){for(let n=uC(e);n!==null;n=dC(n))for(let r=Ne;r<n.length;r++){let i=n[r];XC(i,t)}}function rM(e){for(let t=uC(e);t!==null;t=dC(t)){if(!(t[L]&2))continue;let n=t[Si];for(let r=0;r<n.length;r++){let i=n[r];lp(i)}}}function iM(e,t,n){ue(te.ComponentStart);let r=Jt(t,e);try{XC(r,n)}finally{ue(te.ComponentEnd,r[Le])}}function XC(e,t){Il(e)&&eh(e,t)}function eh(e,t){let r=e[k],i=e[L],o=e[Ft],s=!!(t===0&&i&16);if(s||=!!(i&64&&t===0),s||=!!(i&1024),s||=!!(o?.dirty&&Ts(o)),s||=!1,o&&(o.dirty=!1),e[L]&=-9217,s)nM(r,e,r.template,e[Le]);else if(i&8192){let a=A(null);try{ZC(e),QC(e,1);let c=r.components;c!==null&&JC(e,c,1),GC(e)}finally{A(a)}}}function JC(e,t,n){for(let r=0;r<t.length;r++)iM(e,t[r],n)}function oM(e,t){let n=e.hostBindingOpCodes;if(n!==null)try{for(let r=0;r<n.length;r++){let i=n[r];if(i<0)Hr(~i);else{let o=i,s=n[++r],a=n[++r];eb(s,o);let c=t[o];ue(te.HostBindingsUpdateStart,c);try{a(2,c)}finally{ue(te.HostBindingsUpdateEnd,c)}}}}finally{Hr(-1)}}function Lh(e,t){let n=Dp()?64:1088;for(e[$n].changeDetectionScheduler?.notify(t);e;){e[L]|=n;let r=Or(e);if(Io(e)&&!r)return e;e=r}return null}function eD(e,t,n,r){return[e,!0,0,t,null,r,null,n,null,null]}function tD(e,t){let n=Ne+t;if(n<e.length)return e[n]}function la(e,t,n,r=!0){let i=t[k];if(sM(i,t,e,n),r){let s=Jp(n,e),a=t[_e],c=a.parentNode(e[Vr]);c!==null&&_S(i,e[ft],a,t,c,s)}let o=t[Ei];o!==null&&o.firstChild!==null&&(o.firstChild=null)}function nD(e,t){let n=ia(e,t);return n!==void 0&&lu(n[k],n),n}function ia(e,t){if(e.length<=Ne)return;let n=Ne+t,r=e[n];if(r){let i=r[Br];i!==null&&i!==e&&Ah(i,r),t>0&&(e[n-1][Yt]=r[Yt]);let o=zs(e,Ne+t);DS(r[k],r);let s=o[Hn];s!==null&&s.detachView(o[k]),r[Ve]=null,r[Yt]=null,r[L]&=-129}return r}function sM(e,t,n,r){let i=Ne+r,o=n.length;r>0&&(n[i-1][Yt]=t),r<o-Ne?(t[Yt]=n[i],Yf(n,Ne+r,t)):(n.push(t),t[Yt]=null),t[Ve]=n;let s=t[Br];s!==null&&n!==s&&rD(s,t);let a=t[Hn];a!==null&&a.insertView(e),Sl(t),t[L]|=128}function rD(e,t){let n=e[Si],r=t[Ve];if(ur(r))e[L]|=2;else{let i=r[Ve][pt];t[pt]!==i&&(e[L]|=2)}n===null?e[Si]=[t]:n.push(t)}var Wr=class{_lView;_cdRefInjectingView;_appRef=null;_attachedToViewContainer=!1;exhaustive;get rootNodes(){let t=this._lView,n=t[k];return ra(n,t,n.firstChild,[])}constructor(t,n){this._lView=t,this._cdRefInjectingView=n}get context(){return this._lView[Le]}set context(t){this._lView[Le]=t}get destroyed(){return Mi(this._lView)}destroy(){if(this._appRef)this._appRef.detachView(this);else if(this._attachedToViewContainer){let t=this._lView[Ve];if(Dn(t)){let n=t[Gs],r=n?n.indexOf(this):-1;r>-1&&(ia(t,r),zs(n,r))}this._attachedToViewContainer=!1}lu(this._lView[k],this._lView)}onDestroy(t){up(this._lView,t)}markForCheck(){Lh(this._cdRefInjectingView||this._lView,4)}detach(){this._lView[L]&=-129}reattach(){Sl(this._lView),this._lView[L]|=128}detectChanges(){this._lView[L]|=1024,YC(this._lView)}checkNoChanges(){}attachToViewContainerRef(){if(this._appRef)throw new E(902,!1);this._attachedToViewContainer=!0}detachFromAppRef(){this._appRef=null;let t=Io(this._lView),n=this._lView[Br];n!==null&&!t&&Ah(n,this._lView),OC(this._lView[k],this._lView)}attachToAppRef(t){if(this._attachedToViewContainer)throw new E(902,!1);this._appRef=t;let n=Io(this._lView),r=this._lView[Br];r!==null&&!n&&rD(r,this._lView),Sl(this._lView)}};var jt=(()=>{class e{_declarationLView;_declarationTContainer;elementRef;static __NG_ELEMENT_ID__=aM;constructor(n,r,i){this._declarationLView=n,this._declarationTContainer=r,this.elementRef=i}get ssrId(){return this._declarationTContainer.tView?.ssrId||null}createEmbeddedView(n,r){return this.createEmbeddedViewImpl(n,r)}createEmbeddedViewImpl(n,r,i){let o=ca(this._declarationLView,this._declarationTContainer,n,{embeddedViewInjector:r,dehydratedView:i});return new Wr(o)}}return e})();function aM(){return Fh(ht(),B())}function Fh(e,t){return e.type&4?new jt(t,e,Po(e,t)):null}function Bo(e,t,n,r,i){let o=e.data[t];if(o===null)o=cM(e,t,n,r,i),Jv()&&(o.flags|=32);else if(o.type&64){o.type=n,o.value=r,o.attrs=i;let s=Yv();o.injectorIndex=s===null?-1:s.injectorIndex}return So(o,!0),o}function cM(e,t,n,r,i){let o=vp(),s=bp(),a=s?o:o&&o.parent,c=e.data[t]=uM(e,a,n,t,r,i);return lM(e,c,o,s),c}function lM(e,t,n,r){e.firstChild===null&&(e.firstChild=t),n!==null&&(r?n.child==null&&t.parent!==null&&(n.child=t):n.next===null&&(n.next=t,t.prev=n))}function uM(e,t,n,r,i,o){let s=t?t.injectorIndex:-1,a=0;return mp()&&(a|=128),{type:n,index:r,insertBeforeIndex:null,injectorIndex:s,directiveStart:-1,directiveEnd:-1,directiveStylingLast:-1,componentOffset:-1,controlDirectiveIndex:-1,customControlIndex:-1,propertyBindings:null,flags:a,providerIndexes:0,value:i,attrs:o,mergedAttrs:null,localNames:null,initialInputs:null,inputs:null,hostDirectiveInputs:null,outputs:null,hostDirectiveOutputs:null,directiveToIndex:null,tView:null,next:null,prev:null,projectionNext:null,child:null,parent:t,projection:null,styles:null,stylesWithoutHost:null,residualStyles:void 0,classes:null,classesWithoutHost:null,residualClasses:void 0,classBindings:0,styleBindings:0}}function dM(e){let t=e[ip]??[],r=e[Ve][_e],i=[];for(let o of t)o.data[hC]!==void 0?i.push(o):fM(o,r);e[ip]=i}function fM(e,t){let n=0,r=e.firstChild;if(r){let i=e.data[pC];for(;n<i;){let o=r.nextSibling;_C(t,r,!1),r=o,n++}}}var pM=()=>null,hM=()=>null;function Kl(e,t){return pM(e,t)}function iD(e,t,n){return hM(e,t,n)}var oD=class{},pu=class{},th=class{resolveComponentFactory(t){throw new E(917,!1)}},ua=class{static NULL=new th},en=class{},Bi=(()=>{class e{destroyNode=null;static __NG_ELEMENT_ID__=()=>mM()}return e})();function mM(){let e=B(),t=ht(),n=Jt(t.index,e);return(ur(n)?n:e)[_e]}var sD=(()=>{class e{static \u0275prov=C({token:e,providedIn:"root",factory:()=>null})}return e})();var Vl={},nh=class{injector;parentInjector;constructor(t,n){this.injector=t,this.parentInjector=n}get(t,n,r){let i=this.injector.get(t,Vl,r);return i!==Vl||n===Vl?i:this.parentInjector.get(t,n,r)}};function Zl(e,t,n){let r=n?e.styles:null,i=n?e.classes:null,o=0;if(t!==null)for(let s=0;s<t.length;s++){let a=t[s];if(typeof a=="number")o=a;else if(o==1)i=gl(i,a);else if(o==2){let c=a,l=t[++s];r=gl(r,c+": "+l+";")}}n?e.styles=r:e.stylesWithoutHost=r,n?e.classes=i:e.classesWithoutHost=i}function Kn(e,t=0){let n=B();if(n===null)return F(e,t);let r=ht();return oC(r,n,Ye(e),t)}function aD(e,t,n,r,i){let o=r===null?null:{"":-1},s=i(e,n);if(s!==null){let a=s,c=null,l=null;for(let u of s)if(u.resolveHostDirectives!==null){[a,c,l]=u.resolveHostDirectives(s);break}vM(e,t,n,a,o,c,l)}o!==null&&r!==null&&gM(n,r,o)}function gM(e,t,n){let r=e.localNames=[];for(let i=0;i<t.length;i+=2){let o=n[t[i+1]];if(o==null)throw new E(-301,!1);r.push(t[i],o)}}function yM(e,t,n){t.componentOffset=n,(e.components??=[]).push(t.index)}function vM(e,t,n,r,i,o,s){let a=r.length,c=null;for(let f=0;f<a;f++){let p=r[f];c===null&&Wn(p)&&(c=p,yM(e,n,f)),Gp(Wl(n,t),e,p.type)}wM(n,e.data.length,a),c?.viewProvidersResolver&&c.viewProvidersResolver(c);for(let f=0;f<a;f++){let p=r[f];p.providersResolver&&p.providersResolver(p)}let l=!1,u=!1,d=MC(e,t,a,null);a>0&&(n.directiveToIndex=new Map);for(let f=0;f<a;f++){let p=r[f];if(n.mergedAttrs=Ro(n.mergedAttrs,p.hostAttrs),CM(e,n,t,d,p),EM(d,p,i),s!==null&&s.has(p)){let[D,T]=s.get(p);n.directiveToIndex.set(p.type,[d,D+n.directiveStart,T+n.directiveStart])}else(o===null||!o.has(p))&&n.directiveToIndex.set(p.type,d);p.contentQueries!==null&&(n.flags|=4),(p.hostBindings!==null||p.hostAttrs!==null||p.hostVars!==0)&&(n.flags|=64);let m=p.type.prototype;!l&&(m.ngOnChanges||m.ngOnInit||m.ngDoCheck)&&((e.preOrderHooks??=[]).push(n.index),l=!0),!u&&(m.ngOnChanges||m.ngDoCheck)&&((e.preOrderCheckHooks??=[]).push(n.index),u=!0),d++}bM(e,n,o)}function bM(e,t,n){for(let r=t.directiveStart;r<t.directiveEnd;r++){let i=e.data[r];if(n===null||!n.has(i))Rb(0,t,i,r),Rb(1,t,i,r),kb(t,r,!1);else{let o=n.get(i);Ab(0,t,o,r),Ab(1,t,o,r),kb(t,r,!0)}}}function Rb(e,t,n,r){let i=e===0?n.inputs:n.outputs;for(let o in i)if(i.hasOwnProperty(o)){let s;e===0?s=t.inputs??={}:s=t.outputs??={},s[o]??=[],s[o].push(r),cD(t,o)}}function Ab(e,t,n,r){let i=e===0?n.inputs:n.outputs;for(let o in i)if(i.hasOwnProperty(o)){let s=i[o],a;e===0?a=t.hostDirectiveInputs??={}:a=t.hostDirectiveOutputs??={},a[s]??=[],a[s].push(r,o),cD(t,s)}}function cD(e,t){t==="class"?e.flags|=8:t==="style"&&(e.flags|=16)}function kb(e,t,n){let{attrs:r,inputs:i,hostDirectiveInputs:o}=e;if(r===null||!n&&i===null||n&&o===null||Th(e)){e.initialInputs??=[],e.initialInputs.push(null);return}let s=null,a=0;for(;a<r.length;){let c=r[a];if(c===0){a+=4;continue}else if(c===5){a+=2;continue}else if(typeof c=="number")break;if(!n&&i.hasOwnProperty(c)){let l=i[c];for(let u of l)if(u===t){s??=[],s.push(c,r[a+1]);break}}else if(n&&o.hasOwnProperty(c)){let l=o[c];for(let u=0;u<l.length;u+=2)if(l[u]===t){s??=[],s.push(l[u+1],r[a+1]);break}}a+=2}e.initialInputs??=[],e.initialInputs.push(s)}function CM(e,t,n,r,i){e.data[r]=i;let o=i.factory||(i.factory=kr(i.type,!0)),s=new ki(o,Wn(i),Kn,null);e.blueprint[r]=s,n[r]=s,DM(e,t,r,MC(e,n,i.hostVars,tn),i)}function DM(e,t,n,r,i){let o=i.hostBindings;if(o){let s=e.hostBindingOpCodes;s===null&&(s=e.hostBindingOpCodes=[]);let a=~t.index;_M(s)!=a&&s.push(a),s.push(n,r,o)}}function _M(e){let t=e.length;for(;t>0;){let n=e[--t];if(typeof n=="number"&&n<0)return n}return 0}function EM(e,t,n){if(n){if(t.exportAs)for(let r=0;r<t.exportAs.length;r++)n[t.exportAs[r]]=e;Wn(t)&&(n[""]=e)}}function wM(e,t,n){e.flags|=1,e.directiveStart=t,e.directiveEnd=t+n,e.providerIndexes=t}function lD(e,t,n,r,i,o,s,a){let c=t[k],l=c.consts,u=Bt(l,s),d=Bo(c,e,n,r,u);return o&&aD(c,t,d,Bt(l,a),i),d.mergedAttrs=Ro(d.mergedAttrs,d.attrs),d.attrs!==null&&Zl(d,d.attrs,!1),d.mergedAttrs!==null&&Zl(d,d.mergedAttrs,!0),c.queries!==null&&c.queries.elementStart(c,d),d}function uD(e,t){Qb(e,t),op(t)&&e.queries.elementEnd(t)}function TM(e,t,n,r,i,o){let s=t.consts,a=Bt(s,i),c=Bo(t,e,n,r,a);if(c.mergedAttrs=Ro(c.mergedAttrs,c.attrs),o!=null){let l=Bt(s,o);c.localNames=[];for(let u=0;u<l.length;u+=2)c.localNames.push(l[u],-1)}return c.attrs!==null&&Zl(c,c.attrs,!1),c.mergedAttrs!==null&&Zl(c,c.mergedAttrs,!0),t.queries!==null&&t.queries.elementStart(t,c),c}function dD(e,t,n){return e[t]=n}function In(e,t,n){if(n===tn)return!1;let r=e[t];return Object.is(r,n)?!1:(e[t]=n,!0)}function IM(e,t,n,r){let i=In(e,t,n);return In(e,t+1,r)||i}function Lp(e,t,n){return function r(i){let o=r.__ngNativeEl__;o!==void 0&&WI(i,o);let s=zn(e)?Jt(e.index,t):t;Lh(s,5);let a=t[Le],c=Nb(t,a,n,i),l=r.__ngNextListenerFn__;for(;l;)c=Nb(t,a,l,i)&&c,l=l.__ngNextListenerFn__;return c}}function Nb(e,t,n,r){let i=A(null);try{return ue(te.OutputStart,t,n),n(r)!==!1}catch(o){return zS(e,o),!1}finally{ue(te.OutputEnd,t,n),A(i)}}function SM(e,t,n,r,i,o,s,a){let c=qs(e),l=!1,u=null;if(!r&&c&&(u=xM(t,n,o,e.index)),u!==null){let d=u.__ngLastListenerFn__||u;d.__ngNextListenerFn__=s,u.__ngLastListenerFn__=s,l=!0}else{let d=Xt(e,n),f=r?r(d):d;qI(n,f,o,a),r||(a.__ngNativeEl__=d);let p=i.listen(f,o,a);if(!MM(o)){let m=r?D=>r(Qt(D[e.index])):e.index;fD(m,t,n,o,a,p,!1)}}return l}function MM(e){return e.startsWith("animation")||e.startsWith("transition")}function xM(e,t,n,r){let i=e.cleanup;if(i!=null)for(let o=0;o<i.length-1;o+=2){let s=i[o];if(s===n&&i[o+1]===r){let a=t[wo],c=i[o+2];return a&&a.length>c?a[c]:null}typeof s=="string"&&(o+=2)}return null}function fD(e,t,n,r,i,o,s){let a=t.firstCreatePass?fp(t):null,c=dp(n),l=c.length;c.push(i,o),a&&a.push(r,e,l,(l+1)*(s?-1:1))}function Ob(e,t,n,r,i,o){let s=t[n],a=t[k],l=a.data[n].outputs[r],d=s[l].subscribe(o);fD(e.index,a,t,i,o,d,!0)}var rh=Symbol("BINDING");function pD(e){return e.debugInfo?.className||e.type.name||null}var Yl=class extends ua{ngModule;constructor(t){super(),this.ngModule=t}resolveComponentFactory(t){let n=ar(t);return new Oi(n,this.ngModule)}};function RM(e){return Object.keys(e).map(t=>{let[n,r,i]=e[t],o={propName:n,templateName:t,isSignal:(r&au.SignalBased)!==0};return i&&(o.transform=i),o})}function AM(e){return Object.keys(e).map(t=>({propName:e[t],templateName:t}))}function kM(e,t,n){let r=t instanceof ke?t:t?.injector;return r&&e.getStandaloneInjector!==null&&(r=e.getStandaloneInjector(r)||r),r?new nh(n,r):n}function NM(e){let t=e.get(en,null);if(t===null)throw new E(407,!1);let n=e.get(sD,null),r=e.get(Pr,null),i=e.get(Gr,null,{optional:!0});return{rendererFactory:t,sanitizer:n,changeDetectionScheduler:r,ngReflect:!1,tracingService:i}}function OM(e,t){let n=hD(e);return CC(t,n,n==="svg"?Uv:n==="math"?$v:null)}function hD(e){return(e.selectors[0][0]||"div").toLowerCase()}var Oi=class extends pu{componentDef;ngModule;selector;componentType;ngContentSelectors;isBoundToModule;cachedInputs=null;cachedOutputs=null;get inputs(){return this.cachedInputs??=RM(this.componentDef.inputs),this.cachedInputs}get outputs(){return this.cachedOutputs??=AM(this.componentDef.outputs),this.cachedOutputs}constructor(t,n){super(),this.componentDef=t,this.ngModule=n,this.componentType=t.type,this.selector=lS(t.selectors),this.ngContentSelectors=t.ngContentSelectors??[],this.isBoundToModule=!!n}create(t,n,r,i,o,s){ue(te.DynamicComponentStart);let a=A(null);try{let c=this.componentDef,l=kM(c,i||this.ngModule,t),u=NM(l),d=u.tracingService;return d&&d.componentCreate?d.componentCreate(pD(c),()=>this.createComponentRef(u,l,n,r,o,s)):this.createComponentRef(u,l,n,r,o,s)}finally{A(a)}}createComponentRef(t,n,r,i,o,s){let a=this.componentDef,c=PM(i,a,s,o),l=t.rendererFactory.createRenderer(null,a),u=i?NS(l,i,a.encapsulation,n):OM(a,l),d=s?.some(Pb)||o?.some(m=>typeof m!="function"&&m.bindings.some(Pb)),f=Sh(null,c,null,512|SC(a),null,null,t,l,n,null,yC(u,n,!0));f[Ee]=u,Rl(f);let p=null;try{let m=lD(Ee,f,2,"#host",()=>c.directiveRegistry,!0,0);EC(l,u,m),Ao(u,f),Oh(c,f,m),bC(c,m,f),uD(c,m),r!==void 0&&FM(m,this.ngContentSelectors,r),p=Jt(m.index,f),f[Le]=p[Le],Ph(c,f,null)}catch(m){throw p!==null&&Kp(p),Kp(f),m}finally{ue(te.DynamicComponentEnd),Al()}return new Ql(this.componentType,f,!!d)}};function PM(e,t,n,r){let i=e?["ng-version","21.2.13"]:uS(t.selectors[0]),o=null,s=null,a=0;if(n)for(let u of n)a+=u[rh].requiredVars,u.create&&(u.targetIdx=0,(o??=[]).push(u)),u.update&&(u.targetIdx=0,(s??=[]).push(u));if(r)for(let u=0;u<r.length;u++){let d=r[u];if(typeof d!="function")for(let f of d.bindings){a+=f[rh].requiredVars;let p=u+1;f.create&&(f.targetIdx=p,(o??=[]).push(f)),f.update&&(f.targetIdx=p,(s??=[]).push(f))}}let c=[t];if(r)for(let u of r){let d=typeof u=="function"?u:u.type,f=Gf(d);c.push(f)}return Ih(0,null,LM(o,s),1,a,c,null,null,null,[i],null)}function LM(e,t){return!e&&!t?null:n=>{if(n&1&&e)for(let r of e)r.create();if(n&2&&t)for(let r of t)r.update()}}function Pb(e){let t=e[rh].kind;return t==="input"||t==="twoWay"}var Ql=class extends oD{_rootLView;_hasInputBindings;instance;hostView;changeDetectorRef;componentType;location;previousInputValues=null;_tNode;constructor(t,n,r){super(),this._rootLView=n,this._hasInputBindings=r,this._tNode=wl(n[k],Ee),this.location=Po(this._tNode,n),this.instance=Jt(this._tNode.index,n)[Le],this.hostView=this.changeDetectorRef=new Wr(n,void 0),this.componentType=t}setInput(t,n){this._hasInputBindings;let r=this._tNode;if(this.previousInputValues??=new Map,this.previousInputValues.has(t)&&Object.is(this.previousInputValues.get(t),n))return;let i=this._rootLView,o=fu(r,i[k],i,t,n);this.previousInputValues.set(t,n);let s=Jt(r.index,i);Lh(s,1)}get injector(){return new Ai(this._tNode,this._rootLView)}destroy(){this.hostView.destroy()}onDestroy(t){this.hostView.onDestroy(t)}};function FM(e,t,n){let r=e.projection=[];for(let i=0;i<t.length;i++){let o=n[i];r.push(o!=null&&o.length?Array.from(o):null)}}var Vt=(()=>{class e{static __NG_ELEMENT_ID__=BM}return e})();function BM(){let e=ht();return mD(e,B())}var ih=class e extends Vt{_lContainer;_hostTNode;_hostLView;constructor(t,n,r){super(),this._lContainer=t,this._hostTNode=n,this._hostLView=r}get element(){return Po(this._hostTNode,this._hostLView)}get injector(){return new Ai(this._hostTNode,this._hostLView)}get parentInjector(){let t=Ch(this._hostTNode,this._hostLView);if(Jb(t)){let n=Hl(t,this._hostLView),r=$l(t),i=n[k].data[r+8];return new Ai(i,n)}else return new Ai(null,this._hostLView)}clear(){for(;this.length>0;)this.remove(this.length-1)}get(t){let n=Lb(this._lContainer);return n!==null&&n[t]||null}get length(){return this._lContainer.length-Ne}createEmbeddedView(t,n,r){let i,o;typeof r=="number"?i=r:r!=null&&(i=r.index,o=r.injector);let s=Kl(this._lContainer,t.ssrId),a=t.createEmbeddedViewImpl(n||{},o,s);return this.insertImpl(a,i,ko(this._hostTNode,s)),a}createComponent(t,n,r,i,o,s,a){let c=t&&!vI(t),l;if(c)l=n;else{let T=n||{};l=T.index,r=T.injector,i=T.projectableNodes,o=T.environmentInjector||T.ngModuleRef,s=T.directives,a=T.bindings}let u=c?t:new Oi(ar(t)),d=r||this.parentInjector;if(!o&&u.ngModule==null){let S=(c?d:this.parentInjector).get(ke,null);S&&(o=S)}let f=ar(u.componentType??{}),p=Kl(this._lContainer,f?.id??null),m=p?.firstChild??null,D=u.create(d,i,m,o,s,a);return this.insertImpl(D.hostView,l,ko(this._hostTNode,p)),D}insert(t,n){return this.insertImpl(t,n,!0)}insertImpl(t,n,r){let i=t._lView;if(zv(i)){let a=this.indexOf(t);if(a!==-1)this.detach(a);else{let c=i[Ve],l=new e(c,c[ft],c[Ve]);l.detach(l.indexOf(t))}}let o=this._adjustIndex(n),s=this._lContainer;return la(s,i,o,r),t.attachToViewContainerRef(),Yf(Fp(s),o,t),t}move(t,n){return this.insert(t,n)}indexOf(t){let n=Lb(this._lContainer);return n!==null?n.indexOf(t):-1}remove(t){let n=this._adjustIndex(t,-1),r=ia(this._lContainer,n);r&&(zs(Fp(this._lContainer),n),lu(r[k],r))}detach(t){let n=this._adjustIndex(t,-1),r=ia(this._lContainer,n);return r&&zs(Fp(this._lContainer),n)!=null?new Wr(r):null}_adjustIndex(t,n=0){return t??this.length+n}};function Lb(e){return e[Gs]}function Fp(e){return e[Gs]||(e[Gs]=[])}function mD(e,t){let n,r=t[e.index];return Dn(r)?n=r:(n=eD(r,t,null,e),t[e.index]=n,Mh(t,n)),VM(n,t,e,r),new ih(n,e,t)}function jM(e,t){let n=e[_e],r=n.createComment(""),i=Xt(t,e),o=n.parentNode(i);return Gl(n,o,r,n.nextSibling(i),!1),r}var VM=HM,UM=()=>!1;function $M(e,t,n){return UM(e,t,n)}function HM(e,t,n,r){if(e[Vr])return;let i;n.type&8?i=Qt(r):i=jM(t,n),e[Vr]=i}var oh=class e{queryList;matches=null;constructor(t){this.queryList=t}clone(){return new e(this.queryList)}setDirty(){this.queryList.setDirty()}},sh=class e{queries;constructor(t=[]){this.queries=t}createEmbeddedView(t){let n=t.queries;if(n!==null){let r=t.contentQueries!==null?t.contentQueries[0]:n.length,i=[];for(let o=0;o<r;o++){let s=n.getByIndex(o),a=this.queries[s.indexInDeclarationView];i.push(a.clone())}return new e(i)}return null}insertView(t){this.dirtyQueriesWithMatches(t)}detachView(t){this.dirtyQueriesWithMatches(t)}finishViewCreation(t){this.dirtyQueriesWithMatches(t)}dirtyQueriesWithMatches(t){for(let n=0;n<this.queries.length;n++)Bh(t,n).matches!==null&&this.queries[n].setDirty()}},Xl=class{flags;read;predicate;constructor(t,n,r=null){this.flags=n,this.read=r,typeof t=="string"?this.predicate=QM(t):this.predicate=t}},ah=class e{queries;constructor(t=[]){this.queries=t}elementStart(t,n){for(let r=0;r<this.queries.length;r++)this.queries[r].elementStart(t,n)}elementEnd(t){for(let n=0;n<this.queries.length;n++)this.queries[n].elementEnd(t)}embeddedTView(t){let n=null;for(let r=0;r<this.length;r++){let i=n!==null?n.length:0,o=this.getByIndex(r).embeddedTView(t,i);o&&(o.indexInDeclarationView=r,n!==null?n.push(o):n=[o])}return n!==null?new e(n):null}template(t,n){for(let r=0;r<this.queries.length;r++)this.queries[r].template(t,n)}getByIndex(t){return this.queries[t]}get length(){return this.queries.length}track(t){this.queries.push(t)}},ch=class e{metadata;matches=null;indexInDeclarationView=-1;crossesNgTemplate=!1;_declarationNodeIndex;_appliesToNextNode=!0;constructor(t,n=-1){this.metadata=t,this._declarationNodeIndex=n}elementStart(t,n){this.isApplyingToNode(n)&&this.matchTNode(t,n)}elementEnd(t){this._declarationNodeIndex===t.index&&(this._appliesToNextNode=!1)}template(t,n){this.elementStart(t,n)}embeddedTView(t,n){return this.isApplyingToNode(t)?(this.crossesNgTemplate=!0,this.addMatch(-t.index,n),new e(this.metadata)):null}isApplyingToNode(t){if(this._appliesToNextNode&&(this.metadata.flags&1)!==1){let n=this._declarationNodeIndex,r=t.parent;for(;r!==null&&r.type&8&&r.index!==n;)r=r.parent;return n===(r!==null?r.index:-1)}return this._appliesToNextNode}matchTNode(t,n){let r=this.metadata.predicate;if(Array.isArray(r))for(let i=0;i<r.length;i++){let o=r[i];this.matchTNodeWithReadOption(t,n,zM(n,o)),this.matchTNodeWithReadOption(t,n,jl(n,t,o,!1,!1))}else r===jt?n.type&4&&this.matchTNodeWithReadOption(t,n,-1):this.matchTNodeWithReadOption(t,n,jl(n,t,r,!1,!1))}matchTNodeWithReadOption(t,n,r){if(r!==null){let i=this.metadata.read;if(i!==null)if(i===we||i===Vt||i===jt&&n.type&4)this.addMatch(n.index,-2);else{let o=jl(n,t,i,!1,!1);o!==null&&this.addMatch(n.index,o)}else this.addMatch(n.index,r)}}addMatch(t,n){this.matches===null?this.matches=[t,n]:this.matches.push(t,n)}};function zM(e,t){let n=e.localNames;if(n!==null){for(let r=0;r<n.length;r+=2)if(n[r]===t)return n[r+1]}return null}function WM(e,t){return e.type&11?Po(e,t):e.type&4?Fh(e,t):null}function GM(e,t,n,r){return n===-1?WM(t,e):n===-2?qM(e,t,r):na(e,e[k],n,t)}function qM(e,t,n){if(n===we)return Po(t,e);if(n===jt)return Fh(t,e);if(n===Vt)return mD(t,e)}function gD(e,t,n,r){let i=t[Hn].queries[r];if(i.matches===null){let o=e.data,s=n.matches,a=[];for(let c=0;s!==null&&c<s.length;c+=2){let l=s[c];if(l<0)a.push(null);else{let u=o[l];a.push(GM(t,u,s[c+1],n.metadata.read))}}i.matches=a}return i.matches}function lh(e,t,n,r){let i=e.queries.getByIndex(n),o=i.matches;if(o!==null){let s=gD(e,t,i,n);for(let a=0;a<o.length;a+=2){let c=o[a];if(c>0)r.push(s[a/2]);else{let l=o[a+1],u=t[-c];for(let d=Ne;d<u.length;d++){let f=u[d];f[Br]===f[Ve]&&lh(f[k],f,l,r)}if(u[Si]!==null){let d=u[Si];for(let f=0;f<d.length;f++){let p=d[f];lh(p[k],p,l,r)}}}}}return r}function KM(e,t){return e[Hn].queries[t].queryList}function yD(e,t,n){let r=new fr((n&4)===4);return qv(e,t,r,r.destroy),(t[Hn]??=new sh).queries.push(new oh(r))-1}function ZM(e,t,n){let r=Oe();return r.firstCreatePass&&(vD(r,new Xl(e,t,n),-1),(t&2)===2&&(r.staticViewQueries=!0)),yD(r,B(),t)}function YM(e,t,n,r){let i=Oe();if(i.firstCreatePass){let o=ht();vD(i,new Xl(t,n,r),o.index),XM(i,e),(n&2)===2&&(i.staticContentQueries=!0)}return yD(i,B(),n)}function QM(e){return e.split(",").map(t=>t.trim())}function vD(e,t,n){e.queries===null&&(e.queries=new ah),e.queries.track(new ch(t,n))}function XM(e,t){let n=e.contentQueries||(e.contentQueries=[]),r=n.length?n[n.length-1]:-1;t!==r&&n.push(e.queries.length-1,t)}function Bh(e,t){return e.queries.getByIndex(t)}function JM(e,t){let n=e[k],r=Bh(n,t);return r.crossesNgTemplate?lh(n,e,t,[]):gD(n,e,r,t)}var pr=class{},hu=class{};var Jl=class extends pr{ngModuleType;_parent;_bootstrapComponents=[];_r3Injector;instance;destroyCbs=[];componentFactoryResolver=new Yl(this);constructor(t,n,r,i=!0){super(),this.ngModuleType=t,this._parent=n;let o=Wf(t);this._bootstrapComponents=wC(o.bootstrap),this._r3Injector=Sp(t,n,[{provide:pr,useValue:this},{provide:ua,useValue:this.componentFactoryResolver},...r],Us(t),new Set(["environment"])),i&&this.resolveInjectorInitializers()}resolveInjectorInitializers(){this._r3Injector.resolveInjectorInitializers(),this.instance=this._r3Injector.get(this.ngModuleType)}get injector(){return this._r3Injector}destroy(){let t=this._r3Injector;!t.destroyed&&t.destroy(),this.destroyCbs.forEach(n=>n()),this.destroyCbs=null}onDestroy(t){this.destroyCbs.push(t)}},eu=class extends hu{moduleType;constructor(t){super(),this.moduleType=t}create(t){return new Jl(this.moduleType,t,[])}};var oa=class extends pr{injector;componentFactoryResolver=new Yl(this);instance=null;constructor(t){super();let n=new bi([...t.providers,{provide:pr,useValue:this},{provide:ua,useValue:this.componentFactoryResolver}],t.parent||Eo(),t.debugName,new Set(["environment"]));this.injector=n,t.runEnvironmentInitializers&&n.resolveInjectorInitializers()}destroy(){this.injector.destroy()}onDestroy(t){this.injector.onDestroy(t)}};function da(e,t,n=null){return new oa({providers:e,parent:t,debugName:n,runEnvironmentInitializers:!0}).injector}var e0=(()=>{class e{_injector;cachedInjectors=new Map;constructor(n){this._injector=n}getOrCreateStandaloneInjector(n){if(!n.standalone)return null;if(!this.cachedInjectors.has(n)){let r=Jf(!1,n.type),i=r.length>0?da([r],this._injector,""):null;this.cachedInjectors.set(n,i)}return this.cachedInjectors.get(n)}ngOnDestroy(){try{for(let n of this.cachedInjectors.values())n!==null&&n.destroy()}finally{this.cachedInjectors.clear()}}static \u0275prov=C({token:e,providedIn:"environment",factory:()=>new e(F(ke))})}return e})();function Fe(e){return aa(()=>{let t=bD(e),n=$(g({},t),{decls:e.decls,vars:e.vars,template:e.template,consts:e.consts||null,ngContentSelectors:e.ngContentSelectors,onPush:e.changeDetection===Dh.OnPush,directiveDefs:null,pipeDefs:null,dependencies:t.standalone&&e.dependencies||null,getStandaloneInjector:t.standalone?i=>i.get(e0).getOrCreateStandaloneInjector(n):null,getExternalStyles:null,signals:e.signals??!1,data:e.data||{},encapsulation:e.encapsulation||Tn.Emulated,styles:e.styles||dt,_:null,schemas:e.schemas||null,tView:null,id:""});t.standalone&&mr("NgStandalone"),CD(n);let r=e.dependencies;return n.directiveDefs=Fb(r,t0),n.pipeDefs=Fb(r,Iv),n.id=i0(n),n})}function t0(e){return ar(e)||Gf(e)}function nn(e){return aa(()=>({type:e.type,bootstrap:e.bootstrap||dt,declarations:e.declarations||dt,imports:e.imports||dt,exports:e.exports||dt,transitiveCompileScopes:null,schemas:e.schemas||null,id:e.id||null}))}function n0(e,t){if(e==null)return Lr;let n={};for(let r in e)if(e.hasOwnProperty(r)){let i=e[r],o,s,a,c;Array.isArray(i)?(a=i[0],o=i[1],s=i[2]??o,c=i[3]||null):(o=i,s=i,a=au.None,c=null),n[o]=[r,a,c],t[o]=s}return n}function r0(e){if(e==null)return Lr;let t={};for(let n in e)e.hasOwnProperty(n)&&(t[e[n]]=n);return t}function Ie(e){return aa(()=>{let t=bD(e);return CD(t),t})}function fa(e){return{type:e.type,name:e.name,factory:null,pure:e.pure!==!1,standalone:e.standalone??!0,onDestroy:e.type.prototype.ngOnDestroy||null}}function bD(e){let t={};return{type:e.type,providersResolver:null,viewProvidersResolver:null,factory:null,hostBindings:e.hostBindings||null,hostVars:e.hostVars||0,hostAttrs:e.hostAttrs||null,contentQueries:e.contentQueries||null,declaredInputs:t,inputConfig:e.inputs||Lr,exportAs:e.exportAs||null,standalone:e.standalone??!0,signals:e.signals===!0,selectors:e.selectors||dt,viewQuery:e.viewQuery||null,features:e.features||null,setInput:null,resolveHostDirectives:null,hostDirectives:null,controlDef:null,inputs:n0(e.inputs,t),outputs:r0(e.outputs),debugInfo:null}}function CD(e){e.features?.forEach(t=>t(e))}function Fb(e,t){return e?()=>{let n=typeof e=="function"?e():e,r=[];for(let i of n){let o=t(i);o!==null&&r.push(o)}return r}:null}function i0(e){let t=0,n=typeof e.consts=="function"?"":e.consts,r=[e.selectors,e.ngContentSelectors,e.hostVars,e.hostAttrs,n,e.vars,e.decls,e.encapsulation,e.standalone,e.signals,e.exportAs,JSON.stringify(e.inputs),JSON.stringify(e.outputs),Object.getOwnPropertyNames(e.type.prototype),!!e.contentQueries,!!e.viewQuery];for(let o of r.join("|"))t=Math.imul(31,t)+o.charCodeAt(0)<<0;return t+=2147483648,"c"+t}function o0(e){return Object.getPrototypeOf(e.prototype).constructor}function Sn(e){let t=o0(e.type),n=!0,r=[e];for(;t;){let i;if(Wn(e))i=t.\u0275cmp||t.\u0275dir;else{if(t.\u0275cmp)throw new E(903,!1);i=t.\u0275dir}if(i){if(n){r.push(i);let s=e;s.inputs=Bp(e.inputs),s.declaredInputs=Bp(e.declaredInputs),s.outputs=Bp(e.outputs);let a=i.hostBindings;a&&u0(e,a);let c=i.viewQuery,l=i.contentQueries;if(c&&c0(e,c),l&&l0(e,l),s0(e,i),Tv(e.outputs,i.outputs),Wn(i)&&i.data.animation){let u=e.data;u.animation=(u.animation||[]).concat(i.data.animation)}}let o=i.features;if(o)for(let s=0;s<o.length;s++){let a=o[s];a&&a.ngInherit&&a(e),a===Sn&&(n=!1)}}t=Object.getPrototypeOf(t)}a0(r)}function s0(e,t){for(let n in t.inputs){if(!t.inputs.hasOwnProperty(n)||e.inputs.hasOwnProperty(n))continue;let r=t.inputs[n];r!==void 0&&(e.inputs[n]=r,e.declaredInputs[n]=t.declaredInputs[n])}}function a0(e){let t=0,n=null;for(let r=e.length-1;r>=0;r--){let i=e[r];i.hostVars=t+=i.hostVars,i.hostAttrs=Ro(i.hostAttrs,n=Ro(n,i.hostAttrs))}}function Bp(e){return e===Lr?{}:e===dt?[]:e}function c0(e,t){let n=e.viewQuery;n?e.viewQuery=(r,i)=>{t(r,i),n(r,i)}:e.viewQuery=t}function l0(e,t){let n=e.contentQueries;n?e.contentQueries=(r,i,o)=>{t(r,i,o),n(r,i,o)}:e.contentQueries=t}function u0(e,t){let n=e.hostBindings;n?e.hostBindings=(r,i)=>{t(r,i),n(r,i)}:e.hostBindings=t}function DD(e,t,n,r,i,o,s,a){if(n.firstCreatePass){e.mergedAttrs=Ro(e.mergedAttrs,e.attrs);let u=e.tView=Ih(2,e,i,o,s,n.directiveRegistry,n.pipeRegistry,null,n.schemas,n.consts,null);n.queries!==null&&(n.queries.template(n,e),u.queries=n.queries.embeddedTView(e))}a&&(e.flags|=a),So(e,!1);let c=f0(n,t,e,r);Nl()&&kh(n,t,c,e),Ao(c,t);let l=eD(c,t,c,e);t[r+Ee]=l,Mh(t,l),$M(l,e,t)}function d0(e,t,n,r,i,o,s,a,c,l,u){let d=n+Ee,f;return t.firstCreatePass?(f=Bo(t,d,4,s||null,a||null),hp()&&aD(t,e,f,Bt(t.consts,l),UC),Qb(t,f)):f=t.data[d],DD(f,e,t,n,r,i,o,c),qs(f)&&Oh(t,e,f),l!=null&&du(e,f,u),f}function No(e,t,n,r,i,o,s,a,c,l,u){let d=n+Ee,f;if(t.firstCreatePass){if(f=Bo(t,d,4,s||null,a||null),l!=null){let p=Bt(t.consts,l);f.localNames=[];for(let m=0;m<p.length;m+=2)f.localNames.push(p[m],-1)}}else f=t.data[d];return DD(f,e,t,n,r,i,o,c),l!=null&&du(e,f,u),f}function pa(e,t,n,r,i,o,s,a){let c=B(),l=Oe(),u=Bt(l.consts,o);return d0(c,l,e,t,n,r,i,u,void 0,s,a),pa}function mu(e,t,n,r,i,o,s,a){let c=B(),l=Oe(),u=Bt(l.consts,o);return No(c,l,e,t,n,r,i,u,void 0,s,a),mu}var f0=p0;function p0(e,t,n,r){return Ol(!0),t[_e].createComment("")}var jh=(()=>{class e{log(n){console.log(n)}warn(n){console.warn(n)}static \u0275fac=function(r){return new(r||e)};static \u0275prov=C({token:e,factory:e.\u0275fac,providedIn:"platform"})}return e})();function ha(e){return typeof e=="function"&&e[rt]!==void 0}var Vh=new _("");function jo(e){return!!e&&typeof e.then=="function"}function Uh(e){return!!e&&typeof e.subscribe=="function"}var $h=new _("");function gu(e){return Fr([{provide:$h,multi:!0,useValue:e}])}var Hh=(()=>{class e{resolve;reject;initialized=!1;done=!1;donePromise=new Promise((n,r)=>{this.resolve=n,this.reject=r});appInits=h($h,{optional:!0})??[];injector=h(Te);constructor(){}runInitializers(){if(this.initialized)return;let n=[];for(let i of this.appInits){let o=it(this.injector,i);if(jo(o))n.push(o);else if(Uh(o)){let s=new Promise((a,c)=>{o.subscribe({complete:a,error:c})});n.push(s)}}let r=()=>{this.done=!0,this.resolve()};Promise.all(n).then(()=>{r()}).catch(i=>{this.reject(i)}),n.length===0&&r(),this.initialized=!0}static \u0275fac=function(r){return new(r||e)};static \u0275prov=C({token:e,factory:e.\u0275fac,providedIn:"root"})}return e})(),yu=new _("");function _D(){sf(()=>{let e="";throw new E(600,e)})}function ED(e){return e.isBoundToModule}var h0=10;var gr=(()=>{class e{_runningTick=!1;_destroyed=!1;_destroyListeners=[];_views=[];internalErrorHandler=h(_n);afterRenderManager=h(Rh);zonelessEnabled=h(Ys);rootEffectScheduler=h(Pl);dirtyFlags=0;tracingSnapshot=null;allTestViews=new Set;autoDetectTestViews=new Set;includeAllTestViews=!1;afterTick=new M;get allViews(){return[...(this.includeAllTestViews?this.allTestViews:this.autoDetectTestViews).keys(),...this._views]}get destroyed(){return this._destroyed}componentTypes=[];components=[];internalPendingTask=h(zr);get isStable(){return this.internalPendingTask.hasPendingTasksObservable.pipe(ee(n=>!n))}constructor(){h(Gr,{optional:!0})}whenStable(){let n;return new Promise(r=>{n=this.isStable.subscribe({next:i=>{i&&r()}})}).finally(()=>{n.unsubscribe()})}_injector=h(ke);_rendererFactory=null;get injector(){return this._injector}bootstrap(n,r){return this.bootstrapImpl(n,r)}bootstrapImpl(n,r,i=Te.NULL){return this._injector.get(K).run(()=>{ue(te.BootstrapComponentStart);let s=n instanceof pu;if(!this._injector.get(Hh).done){let m="";throw new E(405,m)}let c;s?c=n:c=this._injector.get(ua).resolveComponentFactory(n),this.componentTypes.push(c.componentType);let l=ED(c)?void 0:this._injector.get(pr),u=r||c.selector,d=c.create(i,[],u,l),f=d.location.nativeElement,p=d.injector.get(Vh,null);return p?.registerApplication(f),d.onDestroy(()=>{this.detachView(d.hostView),ta(this.components,d),p?.unregisterApplication(f)}),this._loadComponent(d),ue(te.BootstrapComponentEnd,d),d})}tick(){this.zonelessEnabled||(this.dirtyFlags|=1),this._tick()}_tick(){ue(te.ChangeDetectionStart),this.tracingSnapshot!==null?this.tracingSnapshot.run(cu.CHANGE_DETECTION,this.tickImpl):this.tickImpl()}tickImpl=()=>{if(this._runningTick)throw ue(te.ChangeDetectionEnd),new E(101,!1);let n=A(null);try{this._runningTick=!0,this.synchronize()}finally{this._runningTick=!1,this.tracingSnapshot?.dispose(),this.tracingSnapshot=null,A(n),this.afterTick.next(),ue(te.ChangeDetectionEnd)}};synchronize(){this._rendererFactory===null&&!this._injector.destroyed&&(this._rendererFactory=this._injector.get(en,null,{optional:!0}));let n=0;for(;this.dirtyFlags!==0&&n++<h0;){ue(te.ChangeDetectionSyncStart);try{this.synchronizeOnce()}finally{ue(te.ChangeDetectionSyncEnd)}}}synchronizeOnce(){this.dirtyFlags&16&&(this.dirtyFlags&=-17,this.rootEffectScheduler.flush());let n=!1;if(this.dirtyFlags&7){let r=!!(this.dirtyFlags&1);this.dirtyFlags&=-8,this.dirtyFlags|=8;for(let{_lView:i}of this.allViews){if(!r&&!Ks(i))continue;let o=r&&!this.zonelessEnabled?0:1;YC(i,o),n=!0}if(this.dirtyFlags&=-5,this.syncDirtyFlagsWithViews(),this.dirtyFlags&23)return}n||(this._rendererFactory?.begin?.(),this._rendererFactory?.end?.()),this.dirtyFlags&8&&(this.dirtyFlags&=-9,this.afterRenderManager.execute()),this.syncDirtyFlagsWithViews()}syncDirtyFlagsWithViews(){if(this.allViews.some(({_lView:n})=>Ks(n))){this.dirtyFlags|=2;return}else this.dirtyFlags&=-8}attachView(n){let r=n;this._views.push(r),r.attachToAppRef(this)}detachView(n){let r=n;ta(this._views,r),r.detachFromAppRef()}_loadComponent(n){this.attachView(n.hostView);try{this.tick()}catch(i){this.internalErrorHandler(i)}this.components.push(n),this._injector.get(yu,[]).forEach(i=>i(n))}ngOnDestroy(){if(!this._destroyed)try{this._destroyListeners.forEach(n=>n()),this._views.slice().forEach(n=>n.destroy())}finally{this._destroyed=!0,this._views=[],this._destroyListeners=[]}}onDestroy(n){return this._destroyListeners.push(n),()=>ta(this._destroyListeners,n)}destroy(){if(this._destroyed)throw new E(406,!1);let n=this._injector;n.destroy&&!n.destroyed&&n.destroy()}get viewCount(){return this._views.length}static \u0275fac=function(r){return new(r||e)};static \u0275prov=C({token:e,factory:e.\u0275fac,providedIn:"root"})}return e})();function ta(e,t){let n=e.indexOf(t);n>-1&&e.splice(n,1)}function vu(e,t){let n=B(),r=Ri();if(In(n,r,t)){let i=Oe(),o=kl();if(fu(o,i,n,e,t))zn(o)&&VC(n,o.index);else{let a=Xt(o,n);$C(n[_e],a,null,o.value,e,t,null)}}return vu}function Mn(e,t,n,r){let i=B(),o=Ri();if(In(i,o,t)){let s=Oe(),a=kl();$S(a,i,e,t,n,r)}return Mn}var uh=class{destroy(t){}updateValue(t,n){}swap(t,n){let r=Math.min(t,n),i=Math.max(t,n),o=this.detach(i);if(i-r>1){let s=this.detach(r);this.attach(r,o),this.attach(i,s)}else this.attach(r,o)}move(t,n){this.attach(n,this.detach(t))}};function jp(e,t,n,r,i){return e===n&&Object.is(t,r)?1:Object.is(i(e,t),i(n,r))?-1:0}function m0(e,t,n,r){let i,o,s=0,a=e.length-1,c=void 0;if(Array.isArray(t)){A(r);let l=t.length-1;for(A(null);s<=a&&s<=l;){let u=e.at(s),d=t[s],f=jp(s,u,s,d,n);if(f!==0){f<0&&e.updateValue(s,d),s++;continue}let p=e.at(a),m=t[l],D=jp(a,p,l,m,n);if(D!==0){D<0&&e.updateValue(a,m),a--,l--;continue}let T=n(s,u),S=n(a,p),q=n(s,d);if(Object.is(q,S)){let Me=n(l,m);Object.is(Me,T)?(e.swap(s,a),e.updateValue(a,m),l--,a--):e.move(a,s),e.updateValue(s,d),s++;continue}if(i??=new tu,o??=jb(e,s,a,n),dh(e,i,s,q))e.updateValue(s,d),s++,a++;else if(o.has(q))i.set(T,e.detach(s)),a--;else{let Me=e.create(s,t[s]);e.attach(s,Me),s++,a++}}for(;s<=l;)Bb(e,i,n,s,t[s]),s++}else if(t!=null){A(r);let l=t[Symbol.iterator]();A(null);let u=l.next();for(;!u.done&&s<=a;){let d=e.at(s),f=u.value,p=jp(s,d,s,f,n);if(p!==0)p<0&&e.updateValue(s,f),s++,u=l.next();else{i??=new tu,o??=jb(e,s,a,n);let m=n(s,f);if(dh(e,i,s,m))e.updateValue(s,f),s++,a++,u=l.next();else if(!o.has(m))e.attach(s,e.create(s,f)),s++,a++,u=l.next();else{let D=n(s,d);i.set(D,e.detach(s)),a--}}}for(;!u.done;)Bb(e,i,n,e.length,u.value),u=l.next()}for(;s<=a;)e.destroy(e.detach(a--));i?.forEach(l=>{e.destroy(l)})}function dh(e,t,n,r){return t!==void 0&&t.has(r)?(e.attach(n,t.get(r)),t.delete(r),!0):!1}function Bb(e,t,n,r,i){if(dh(e,t,r,n(r,i)))e.updateValue(r,i);else{let o=e.create(r,i);e.attach(r,o)}}function jb(e,t,n,r){let i=new Set;for(let o=t;o<=n;o++)i.add(r(o,e.at(o)));return i}var tu=class{kvMap=new Map;_vMap=void 0;has(t){return this.kvMap.has(t)}delete(t){if(!this.has(t))return!1;let n=this.kvMap.get(t);return this._vMap!==void 0&&this._vMap.has(n)?(this.kvMap.set(t,this._vMap.get(n)),this._vMap.delete(n)):this.kvMap.delete(t),!0}get(t){return this.kvMap.get(t)}set(t,n){if(this.kvMap.has(t)){let r=this.kvMap.get(t);this._vMap===void 0&&(this._vMap=new Map);let i=this._vMap;for(;i.has(r);)r=i.get(r);i.set(r,n)}else this.kvMap.set(t,n)}forEach(t){for(let[n,r]of this.kvMap)if(t(r,n),this._vMap!==void 0){let i=this._vMap;for(;i.has(r);)r=i.get(r),t(r,n)}}};function Ut(e,t,n,r,i,o,s,a){mr("NgControlFlow");let c=B(),l=Oe(),u=Bt(l.consts,o);return No(c,l,e,t,n,r,i,u,256,s,a),zh}function zh(e,t,n,r,i,o,s,a){mr("NgControlFlow");let c=B(),l=Oe(),u=Bt(l.consts,o);return No(c,l,e,t,n,r,i,u,512,s,a),zh}function $t(e,t){mr("NgControlFlow");let n=B(),r=Ri(),i=n[r]!==tn?n[r]:-1,o=i!==-1?nu(n,Ee+i):void 0,s=0;if(In(n,r,e)){let a=A(null);try{if(o!==void 0&&nD(o,s),e!==-1){let c=Ee+e,l=nu(n,c),u=mh(n[k],c),d=iD(l,u,n),f=ca(n,u,t,{dehydratedView:d});la(l,f,s,ko(u,d))}}finally{A(a)}}else if(o!==void 0){let a=tD(o,s);a!==void 0&&(a[Le]=t)}}var fh=class{lContainer;$implicit;$index;constructor(t,n,r){this.lContainer=t,this.$implicit=n,this.$index=r}get $count(){return this.lContainer.length-Ne}};function bu(e,t){return t}var ph=class{hasEmptyBlock;trackByFn;liveCollection;constructor(t,n,r){this.hasEmptyBlock=t,this.trackByFn=n,this.liveCollection=r}};function Vo(e,t,n,r,i,o,s,a,c,l,u,d,f){mr("NgControlFlow");let p=B(),m=Oe(),D=c!==void 0,T=B(),S=a?s.bind(T[pt][Le]):s,q=new ph(D,S);T[Ee+e]=q,No(p,m,e+1,t,n,r,i,Bt(m.consts,o),256),D&&No(p,m,e+2,c,l,u,d,Bt(m.consts,f),512)}var hh=class extends uh{lContainer;hostLView;templateTNode;operationsCounter=void 0;needsIndexUpdate=!1;constructor(t,n,r){super(),this.lContainer=t,this.hostLView=n,this.templateTNode=r}get length(){return this.lContainer.length-Ne}at(t){return this.getLView(t)[Le].$implicit}attach(t,n){let r=n[Ei];this.needsIndexUpdate||=t!==this.length,la(this.lContainer,n,t,ko(this.templateTNode,r)),g0(this.lContainer,t)}detach(t){return this.needsIndexUpdate||=t!==this.length-1,y0(this.lContainer,t),v0(this.lContainer,t)}create(t,n){let r=Kl(this.lContainer,this.templateTNode.tView.ssrId);return ca(this.hostLView,this.templateTNode,new fh(this.lContainer,n,t),{dehydratedView:r})}destroy(t){lu(t[k],t)}updateValue(t,n){this.getLView(t)[Le].$implicit=n}reset(){this.needsIndexUpdate=!1}updateIndexes(){if(this.needsIndexUpdate)for(let t=0;t<this.length;t++)this.getLView(t)[Le].$index=t}getLView(t){return b0(this.lContainer,t)}};function Uo(e){let t=A(null),n=dr();try{let r=B(),i=r[k],o=r[n],s=n+1,a=nu(r,s);if(o.liveCollection===void 0){let l=mh(i,s);o.liveCollection=new hh(a,r,l)}else o.liveCollection.reset();let c=o.liveCollection;if(m0(c,e,o.trackByFn,t),c.updateIndexes(),o.hasEmptyBlock){let l=Ri(),u=c.length===0;if(In(r,l,u)){let d=n+2,f=nu(r,d);if(u){let p=mh(i,d),m=iD(f,p,r),D=ca(r,p,void 0,{dehydratedView:m});la(f,D,0,ko(p,m))}else i.firstUpdatePass&&dM(f),nD(f,0)}}}finally{A(t)}}function nu(e,t){return e[t]}function g0(e,t){if(e.length<=Ne)return;let n=Ne+t,r=e[n],i=r?r[jr]:void 0;if(r&&i&&i.detachedLeaveAnimationFns&&i.detachedLeaveAnimationFns.length>0){let o=r[cr];bS(o,i),Ni.delete(r[lr]),i.detachedLeaveAnimationFns=void 0}}function y0(e,t){if(e.length<=Ne)return;let n=Ne+t,r=e[n],i=r?r[jr]:void 0;i&&i.leave&&i.leave.size>0&&(i.detachedLeaveAnimationFns=[])}function v0(e,t){return ia(e,t)}function b0(e,t){return tD(e,t)}function mh(e,t){return wl(e,t)}function rn(e,t,n){let r=B(),i=Ri();if(In(r,i,t)){let o=Oe(),s=kl();FS(s,r,e,t,r[_e],n)}return rn}function gh(e,t,n,r,i){fu(t,e,n,i?"class":"style",r)}function G(e,t,n,r){let i=B(),o=i[k],s=e+Ee,a=o.firstCreatePass?lD(s,i,2,t,UC,hp(),n,r):o.data[s];if(zn(a)){let c=i[$n].tracingService;if(c&&c.componentCreate){let l=o.data[a.directiveStart+a.componentOffset];return c.componentCreate(pD(l),()=>(Vb(e,t,i,a,r),G))}}return Vb(e,t,i,a,r),G}function Vb(e,t,n,r,i){if(HC(r,n,e,t,wD),qs(r)){let o=n[k];Oh(o,n,r),bC(o,r,n)}i!=null&&du(n,r)}function se(){let e=Oe(),t=ht(),n=zC(t);return e.firstCreatePass&&uD(e,n),gp(n)&&yp(),pp(),n.classesWithoutHost!=null&&wI(n)&&gh(e,n,B(),n.classesWithoutHost,!0),n.stylesWithoutHost!=null&&TI(n)&&gh(e,n,B(),n.stylesWithoutHost,!1),se}function We(e,t,n,r){return G(e,t,n,r),se(),We}function Ue(e,t,n,r){let i=B(),o=i[k],s=e+Ee,a=o.firstCreatePass?TM(s,o,2,t,n,r):o.data[s];return HC(a,i,e,t,wD),r!=null&&du(i,a),Ue}function De(){let e=ht(),t=zC(e);return gp(t)&&yp(),pp(),De}var wD=(e,t,n,r,i)=>(Ol(!0),CC(t[_e],r,ab()));function Cu(){return B()}var Xs=void 0;function C0(e){let t=Math.floor(Math.abs(e)),n=e.toString().replace(/^[^.]*\.?/,"").length;return t===1&&n===0?1:5}var D0=["en",[["a","p"],["AM","PM"]],[["AM","PM"]],[["S","M","T","W","T","F","S"],["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],["Su","Mo","Tu","We","Th","Fr","Sa"]],Xs,[["J","F","M","A","M","J","J","A","S","O","N","D"],["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],["January","February","March","April","May","June","July","August","September","October","November","December"]],Xs,[["B","A"],["BC","AD"],["Before Christ","Anno Domini"]],0,[6,0],["M/d/yy","MMM d, y","MMMM d, y","EEEE, MMMM d, y"],["h:mm\u202Fa","h:mm:ss\u202Fa","h:mm:ss\u202Fa z","h:mm:ss\u202Fa zzzz"],["{1}, {0}",Xs,Xs,Xs],[".",",",";","%","+","-","E","\xD7","\u2030","\u221E","NaN",":"],["#,##0.###","#,##0%","\xA4#,##0.00","#E0"],"USD","$","US Dollar",{},"ltr",C0],Vp={};function It(e){let t=_0(e),n=Ub(t);if(n)return n;let r=t.split("-")[0];if(n=Ub(r),n)return n;if(r==="en")return D0;throw new E(701,!1)}function Ub(e){return e in Vp||(Vp[e]=Ci.ng&&Ci.ng.common&&Ci.ng.common.locales&&Ci.ng.common.locales[e]),Vp[e]}var Pe=(function(e){return e[e.LocaleId=0]="LocaleId",e[e.DayPeriodsFormat=1]="DayPeriodsFormat",e[e.DayPeriodsStandalone=2]="DayPeriodsStandalone",e[e.DaysFormat=3]="DaysFormat",e[e.DaysStandalone=4]="DaysStandalone",e[e.MonthsFormat=5]="MonthsFormat",e[e.MonthsStandalone=6]="MonthsStandalone",e[e.Eras=7]="Eras",e[e.FirstDayOfWeek=8]="FirstDayOfWeek",e[e.WeekendRange=9]="WeekendRange",e[e.DateFormat=10]="DateFormat",e[e.TimeFormat=11]="TimeFormat",e[e.DateTimeFormat=12]="DateTimeFormat",e[e.NumberSymbols=13]="NumberSymbols",e[e.NumberFormats=14]="NumberFormats",e[e.CurrencyCode=15]="CurrencyCode",e[e.CurrencySymbol=16]="CurrencySymbol",e[e.CurrencyName=17]="CurrencyName",e[e.Currencies=18]="Currencies",e[e.Directionality=19]="Directionality",e[e.PluralCase=20]="PluralCase",e[e.ExtraData=21]="ExtraData",e})(Pe||{});function _0(e){return e.toLowerCase().replace(/_/g,"-")}var ma="en-US";var E0=ma;function TD(e){typeof e=="string"&&(E0=e.toLowerCase().replace(/_/g,"-"))}function on(e,t,n){let r=B(),i=Oe(),o=ht();return w0(i,r,r[_e],o,e,t,n),on}function w0(e,t,n,r,i,o,s){let a=!0,c=null;if((r.type&3||s)&&(c??=Lp(r,t,o),SM(r,e,t,s,n,i,o,c)&&(a=!1)),a){let l=r.outputs?.[i],u=r.hostDirectiveOutputs?.[i];if(u&&u.length)for(let d=0;d<u.length;d+=2){let f=u[d],p=u[d+1];c??=Lp(r,t,o),Ob(r,t,f,p,i,c)}if(l&&l.length)for(let d of l)c??=Lp(r,t,o),Ob(r,t,d,i,i,c)}}function $e(e=1){return sb(e)}function T0(e,t){let n=null,r=iS(e);for(let i=0;i<t.length;i++){let o=t[i];if(o==="*"){n=i;continue}if(r===null?IC(e,o,!0):aS(r,o))return i}return n}function $o(e){let t=B()[pt][ft];if(!t.projection){let n=e?e.length:1,r=t.projection=kv(n,null),i=r.slice(),o=t.child;for(;o!==null;){if(o.type!==128){let s=e?T0(o,e):0;s!==null&&(i[s]?i[s].projectionNext=o:r[s]=o,i[s]=o)}o=o.next}}}function Ho(e,t=0,n,r,i,o){let s=B(),a=Oe(),c=r?e+1:null;c!==null&&No(s,a,c,r,i,o,null,n);let l=Bo(a,Ee+e,16,null,n||null);l.projection===null&&(l.projection=t),Cp();let d=!s[Ei]||mp();s[pt][ft].projection[l.projection]===null&&c!==null?I0(s,a,c):d&&!su(l)&&RS(a,s,l)}function I0(e,t,n){let r=Ee+n,i=t.data[r],o=e[r],s=Kl(o,i.tView.ssrId),a=ca(e,i,void 0,{dehydratedView:s});la(o,a,0,ko(i,s))}function zo(e,t,n,r){return YM(e,t,n,r),zo}function Kr(e,t,n){return ZM(e,t,n),Kr}function Ge(e){let t=B(),n=Oe(),r=wp();xl(r+1);let i=Bh(n,r);if(e.dirty&&Hv(t)===((i.metadata.flags&2)===2)){if(i.matches===null)e.reset([]);else{let o=JM(t,r);e.reset(o,BI),e.notifyOnChanges()}return!0}return!1}function qe(){return KM(B(),wp())}function Du(e){let t=Qv();return Tl(t,Ee+e)}function Ll(e,t){return e<<17|t<<2}function Pi(e){return e>>17&32767}function S0(e){return(e&2)==2}function M0(e,t){return e&131071|t<<17}function yh(e){return e|2}function Oo(e){return(e&131068)>>2}function Up(e,t){return e&-131069|t<<2}function x0(e){return(e&1)===1}function vh(e){return e|1}function R0(e,t,n,r,i,o){let s=o?t.classBindings:t.styleBindings,a=Pi(s),c=Oo(s);e[r]=n;let l=!1,u;if(Array.isArray(n)){let d=n;u=d[1],(u===null||_o(d,u)>0)&&(l=!0)}else u=n;if(i)if(c!==0){let f=Pi(e[a+1]);e[r+1]=Ll(f,a),f!==0&&(e[f+1]=Up(e[f+1],r)),e[a+1]=M0(e[a+1],r)}else e[r+1]=Ll(a,0),a!==0&&(e[a+1]=Up(e[a+1],r)),a=r;else e[r+1]=Ll(c,0),a===0?a=r:e[c+1]=Up(e[c+1],r),c=r;l&&(e[r+1]=yh(e[r+1])),$b(e,u,r,!0),$b(e,u,r,!1),A0(t,u,e,r,o),s=Ll(a,c),o?t.classBindings=s:t.styleBindings=s}function A0(e,t,n,r,i){let o=i?e.residualClasses:e.residualStyles;o!=null&&typeof t=="string"&&_o(o,t)>=0&&(n[r+1]=vh(n[r+1]))}function $b(e,t,n,r){let i=e[n+1],o=t===null,s=r?Pi(i):Oo(i),a=!1;for(;s!==0&&(a===!1||o);){let c=e[s],l=e[s+1];k0(c,t)&&(a=!0,e[s+1]=r?vh(l):yh(l)),s=r?Pi(l):Oo(l)}a&&(e[n+1]=r?yh(i):vh(i))}function k0(e,t){return e===null||t==null||(Array.isArray(e)?e[1]:e)===t?!0:Array.isArray(e)&&typeof t=="string"?_o(e,t)>=0:!1}var wn={textEnd:0,key:0,keyEnd:0,value:0,valueEnd:0};function N0(e){return e.substring(wn.key,wn.keyEnd)}function O0(e){return P0(e),ID(e,SD(e,0,wn.textEnd))}function ID(e,t){let n=wn.textEnd;return n===t?-1:(t=wn.keyEnd=L0(e,wn.key=t,n),SD(e,t,n))}function P0(e){wn.key=0,wn.keyEnd=0,wn.value=0,wn.valueEnd=0,wn.textEnd=e.length}function SD(e,t,n){for(;t<n&&e.charCodeAt(t)<=32;)t++;return t}function L0(e,t,n){for(;t<n&&e.charCodeAt(t)>32;)t++;return t}function ga(e,t,n){return MD(e,t,n,!1),ga}function mt(e,t){return MD(e,t,null,!0),mt}function ji(e){B0(z0,F0,e,!0)}function F0(e,t){for(let n=O0(t);n>=0;n=ID(t,n))Dl(e,N0(t),!0)}function MD(e,t,n,r){let i=B(),o=Oe(),s=Ep(2);if(o.firstUpdatePass&&RD(o,e,s,r),t!==tn&&In(i,s,t)){let a=o.data[dr()];AD(o,a,i,i[_e],e,i[s+1]=G0(t,n),r,s)}}function B0(e,t,n,r){let i=Oe(),o=Ep(2);i.firstUpdatePass&&RD(i,null,o,r);let s=B();if(n!==tn&&In(s,o,n)){let a=i.data[dr()];if(kD(a,r)&&!xD(i,o)){let c=r?a.classesWithoutHost:a.stylesWithoutHost;c!==null&&(n=gl(c,n||"")),gh(i,a,s,n,r)}else W0(i,a,s,s[_e],s[o+1],s[o+1]=H0(e,t,n),r,o)}}function xD(e,t){return t>=e.expandoStartIndex}function RD(e,t,n,r){let i=e.data;if(i[n+1]===null){let o=i[dr()],s=xD(e,n);kD(o,r)&&t===null&&!s&&(t=!1),t=j0(i,o,t,r),R0(i,o,t,n,s,r)}}function j0(e,t,n,r){let i=nb(e),o=r?t.residualClasses:t.residualStyles;if(i===null)(r?t.classBindings:t.styleBindings)===0&&(n=$p(null,e,t,n,r),n=sa(n,t.attrs,r),o=null);else{let s=t.directiveStylingLast;if(s===-1||e[s]!==i)if(n=$p(i,e,t,n,r),o===null){let c=V0(e,t,r);c!==void 0&&Array.isArray(c)&&(c=$p(null,e,t,c[1],r),c=sa(c,t.attrs,r),U0(e,t,r,c))}else o=$0(e,t,r)}return o!==void 0&&(r?t.residualClasses=o:t.residualStyles=o),n}function V0(e,t,n){let r=n?t.classBindings:t.styleBindings;if(Oo(r)!==0)return e[Pi(r)]}function U0(e,t,n,r){let i=n?t.classBindings:t.styleBindings;e[Pi(i)]=r}function $0(e,t,n){let r,i=t.directiveEnd;for(let o=1+t.directiveStylingLast;o<i;o++){let s=e[o].hostAttrs;r=sa(r,s,n)}return sa(r,t.attrs,n)}function $p(e,t,n,r,i){let o=null,s=n.directiveEnd,a=n.directiveStylingLast;for(a===-1?a=n.directiveStart:a++;a<s&&(o=t[a],r=sa(r,o.hostAttrs,i),o!==e);)a++;return e!==null&&(n.directiveStylingLast=a),r}function sa(e,t,n){let r=n?1:2,i=-1;if(t!==null)for(let o=0;o<t.length;o++){let s=t[o];typeof s=="number"?i=s:i===r&&(Array.isArray(e)||(e=e===void 0?[]:["",e]),Dl(e,s,n?!0:t[++o]))}return e===void 0?null:e}function H0(e,t,n){if(n==null||n==="")return dt;let r=[],i=wh(n);if(Array.isArray(i))for(let o=0;o<i.length;o++)e(r,i[o],!0);else if(i instanceof Set)for(let o of i)e(r,o,!0);else if(typeof i=="object")for(let o in i)i.hasOwnProperty(o)&&e(r,o,i[o]);else typeof i=="string"&&t(r,i);return r}function z0(e,t,n){let r=String(t);r!==""&&!r.includes(" ")&&Dl(e,r,n)}function W0(e,t,n,r,i,o,s,a){i===tn&&(i=dt);let c=0,l=0,u=0<i.length?i[0]:null,d=0<o.length?o[0]:null;for(;u!==null||d!==null;){let f=c<i.length?i[c+1]:void 0,p=l<o.length?o[l+1]:void 0,m=null,D;u===d?(c+=2,l+=2,f!==p&&(m=d,D=p)):d===null||u!==null&&u<d?(c+=2,m=u):(l+=2,m=d,D=p),m!==null&&AD(e,t,n,r,m,D,s,a),u=c<i.length?i[c]:null,d=l<o.length?o[l]:null}}function AD(e,t,n,r,i,o,s,a){if(!(t.type&3))return;let c=e.data,l=c[a+1],u=x0(l)?Hb(c,t,n,i,Oo(l),s):void 0;if(!ru(u)){ru(o)||S0(l)&&(o=Hb(c,null,n,i,a,s));let d=sp(dr(),n);kS(r,s,d,i,o)}}function Hb(e,t,n,r,i,o){let s=t===null,a;for(;i>0;){let c=e[i],l=Array.isArray(c),u=l?c[1]:c,d=u===null,f=n[i+1];f===tn&&(f=d?dt:void 0);let p=d?_l(f,r):u===r?f:void 0;if(l&&!ru(p)&&(p=_l(c,r)),ru(p)&&(a=p,s))return a;let m=e[i+1];i=s?Pi(m):Oo(m)}if(t!==null){let c=o?t.residualClasses:t.residualStyles;c!=null&&(a=_l(c,r))}return a}function ru(e){return e!==void 0}function G0(e,t){return e==null||e===""||(typeof t=="string"?e=e+t:typeof e=="object"&&(e=Us(wh(e)))),e}function kD(e,t){return(e.flags&(t?8:16))!==0}function J(e,t=""){let n=B(),r=Oe(),i=e+Ee,o=r.firstCreatePass?Bo(r,i,1,t,null):r.data[i],s=q0(r,n,o,t);n[i]=s,Nl()&&kh(r,n,s,o),So(o,!1)}var q0=(e,t,n,r)=>(Ol(!0),ZI(t[_e],r));function ND(e,t,n,r=""){return In(e,Ri(),n)?t+qf(n)+r:tn}function yr(e){return Ht("",e),yr}function Ht(e,t,n){let r=B(),i=ND(r,e,t,n);return i!==tn&&K0(r,dr(),i),Ht}function K0(e,t,n){let r=sp(t,e);YI(e[_e],r,n)}function Wh(e,t,n=""){return ND(B(),e,t,n)}function zb(e,t,n){let r=Oe();r.firstCreatePass&&OD(t,r.data,r.blueprint,Wn(e),n)}function OD(e,t,n,r,i){if(e=Ye(e),Array.isArray(e))for(let o=0;o<e.length;o++)OD(e[o],t,n,r,i);else{let o=Oe(),s=B(),a=ht(),c=vi(e)?e:Ye(e.provide),l=tp(e),u=a.providerIndexes&1048575,d=a.directiveStart,f=a.providerIndexes>>20;if(vi(e)||!e.multi){let p=new ki(l,i,Kn,null),m=zp(c,t,i?u:u+f,d);m===-1?(Gp(Wl(a,s),o,c),Hp(o,e,t.length),t.push(c),a.directiveStart++,a.directiveEnd++,i&&(a.providerIndexes+=1048576),n.push(p),s.push(p)):(n[m]=p,s[m]=p)}else{let p=zp(c,t,u+f,d),m=zp(c,t,u,u+f),D=p>=0&&n[p],T=m>=0&&n[m];if(i&&!T||!i&&!D){Gp(Wl(a,s),o,c);let S=Q0(i?Y0:Z0,n.length,i,r,l,e);!i&&T&&(n[m].providerFactory=S),Hp(o,e,t.length,0),t.push(c),a.directiveStart++,a.directiveEnd++,i&&(a.providerIndexes+=1048576),n.push(S),s.push(S)}else{let S=PD(n[i?m:p],l,!i&&r);Hp(o,e,p>-1?p:m,S)}!i&&r&&T&&n[m].componentProviders++}}}function Hp(e,t,n,r){let i=vi(t),o=Bv(t);if(i||o){let c=(o?Ye(t.useClass):t).prototype.ngOnDestroy;if(c){let l=e.destroyHooks||(e.destroyHooks=[]);if(!i&&t.multi){let u=l.indexOf(n);u===-1?l.push(n,[r,c]):l[u+1].push(r,c)}else l.push(n,c)}}}function PD(e,t,n){return n&&e.componentProviders++,e.multi.push(t)-1}function zp(e,t,n,r){for(let i=n;i<r;i++)if(t[i]===e)return i;return-1}function Z0(e,t,n,r,i){return bh(this.multi,[])}function Y0(e,t,n,r,i){let o=this.multi,s;if(this.providerFactory){let a=this.providerFactory.componentProviders,c=na(r,r[k],this.providerFactory.index,i);s=c.slice(0,a),bh(o,s);for(let l=a;l<c.length;l++)s.push(c[l])}else s=[],bh(o,s);return s}function bh(e,t){for(let n=0;n<e.length;n++){let r=e[n];t.push(r())}return t}function Q0(e,t,n,r,i,o){let s=new ki(e,n,Kn,null);return s.multi=[],s.index=t,s.componentProviders=0,PD(s,i,r&&!n),s}function Zr(e,t){return n=>{n.providersResolver=(r,i)=>zb(r,i?i(e):e,!1),t&&(n.viewProvidersResolver=(r,i)=>zb(r,i?i(t):t,!0))}}function LD(e,t){let n=e[t];return n===tn?void 0:n}function X0(e,t,n,r,i,o){let s=t+n;return In(e,s,i)?dD(e,s+1,o?r.call(o,i):r(i)):LD(e,s+1)}function J0(e,t,n,r,i,o,s){let a=t+n;return IM(e,a,i,o)?dD(e,a+2,s?r.call(s,i,o):r(i,o)):LD(e,a+2)}function Vi(e,t){let n=Oe(),r,i=e+Ee;n.firstCreatePass?(r=ex(t,n.pipeRegistry),n.data[i]=r,r.onDestroy&&(n.destroyHooks??=[]).push(i,r.onDestroy)):r=n.data[i];let o=r.factory||(r.factory=kr(r.type,!0)),s,a=ut(Kn);try{let c=zl(!1),l=o();return zl(c),ap(n,B(),i,l),l}finally{ut(a)}}function ex(e,t){if(t)for(let n=t.length-1;n>=0;n--){let r=t[n];if(e===r.name)return r}}function ya(e,t,n){let r=e+Ee,i=B(),o=Tl(i,r);return FD(i,r)?X0(i,_p(),t,o.transform,n,o):o.transform(n)}function _u(e,t,n,r){let i=e+Ee,o=B(),s=Tl(o,i);return FD(o,i)?J0(o,_p(),t,s.transform,n,r,s):s.transform(n,r)}function FD(e,t){return e[k].data[t].pure}var iu=class{ngModuleFactory;componentFactories;constructor(t,n){this.ngModuleFactory=t,this.componentFactories=n}},Gh=(()=>{class e{compileModuleSync(n){return new eu(n)}compileModuleAsync(n){return Promise.resolve(this.compileModuleSync(n))}compileModuleAndAllComponentsSync(n){let r=this.compileModuleSync(n),i=Wf(n),o=wC(i.declarations).reduce((s,a)=>{let c=ar(a);return c&&s.push(new Oi(c)),s},[]);return new iu(r,o)}compileModuleAndAllComponentsAsync(n){return Promise.resolve(this.compileModuleAndAllComponentsSync(n))}clearCache(){}clearCacheFor(n){}getModuleId(n){}static \u0275fac=function(r){return new(r||e)};static \u0275prov=C({token:e,factory:e.\u0275fac,providedIn:"root"})}return e})();var BD=(()=>{class e{applicationErrorHandler=h(_n);appRef=h(gr);taskService=h(zr);ngZone=h(K);zonelessEnabled=h(Ys);tracing=h(Gr,{optional:!0});zoneIsDefined=typeof Zone<"u"&&!!Zone.root.run;schedulerTickApplyArgs=[{data:{__scheduler_tick__:!0}}];subscriptions=new oe;angularZoneId=this.zoneIsDefined?this.ngZone._inner?.get(js):null;scheduleInRootZone=!this.zonelessEnabled&&this.zoneIsDefined&&(h(kp,{optional:!0})??!1);cancelScheduledCallback=null;useMicrotaskScheduler=!1;runningTick=!1;pendingRenderTaskId=null;constructor(){this.subscriptions.add(this.appRef.afterTick.subscribe(()=>{let n=this.taskService.add();if(!this.runningTick&&(this.cleanup(),!this.zonelessEnabled||this.appRef.includeAllTestViews)){this.taskService.remove(n);return}this.switchToMicrotaskScheduler(),this.taskService.remove(n)})),this.subscriptions.add(this.ngZone.onUnstable.subscribe(()=>{this.runningTick||this.cleanup()}))}switchToMicrotaskScheduler(){this.ngZone.runOutsideAngular(()=>{let n=this.taskService.add();this.useMicrotaskScheduler=!0,queueMicrotask(()=>{this.useMicrotaskScheduler=!1,this.taskService.remove(n)})})}notify(n){if(!this.zonelessEnabled&&n===5)return;switch(n){case 0:{this.appRef.dirtyFlags|=2;break}case 3:case 2:case 4:case 5:case 1:{this.appRef.dirtyFlags|=4;break}case 6:{this.appRef.dirtyFlags|=2;break}case 12:{this.appRef.dirtyFlags|=16;break}case 13:{this.appRef.dirtyFlags|=2;break}case 11:break;default:this.appRef.dirtyFlags|=8}if(this.appRef.tracingSnapshot=this.tracing?.snapshot(this.appRef.tracingSnapshot)??null,!this.shouldScheduleTick())return;let r=this.useMicrotaskScheduler?db:Mp;this.pendingRenderTaskId=this.taskService.add(),this.scheduleInRootZone?this.cancelScheduledCallback=Zone.root.run(()=>r(()=>this.tick())):this.cancelScheduledCallback=this.ngZone.runOutsideAngular(()=>r(()=>this.tick()))}shouldScheduleTick(){return!(this.appRef.destroyed||this.pendingRenderTaskId!==null||this.runningTick||this.appRef._runningTick||!this.zonelessEnabled&&this.zoneIsDefined&&Zone.current.get(js+this.angularZoneId))}tick(){if(this.runningTick||this.appRef.destroyed)return;if(this.appRef.dirtyFlags===0){this.cleanup();return}!this.zonelessEnabled&&this.appRef.dirtyFlags&7&&(this.appRef.dirtyFlags|=1);let n=this.taskService.add();try{this.ngZone.run(()=>{this.runningTick=!0,this.appRef._tick()},void 0,this.schedulerTickApplyArgs)}catch(r){this.applicationErrorHandler(r)}finally{this.taskService.remove(n),this.cleanup()}}ngOnDestroy(){this.subscriptions.unsubscribe(),this.cleanup()}cleanup(){if(this.runningTick=!1,this.cancelScheduledCallback?.(),this.cancelScheduledCallback=null,this.pendingRenderTaskId!==null){let n=this.pendingRenderTaskId;this.pendingRenderTaskId=null,this.taskService.remove(n)}}static \u0275fac=function(r){return new(r||e)};static \u0275prov=C({token:e,factory:e.\u0275fac,providedIn:"root"})}return e})();function qh(){return mr("NgZoneless"),Fr([...Kh(),[]])}function Kh(){return[{provide:Pr,useExisting:BD},{provide:K,useClass:Vs},{provide:Ys,useValue:!0}]}function tx(){return typeof $localize<"u"&&$localize.locale||ma}var Wo=new _("",{factory:()=>h(Wo,{optional:!0,skipSelf:!0})||tx()});function Zn(e){return Cv(e)}function St(e,t){return xc(e,t?.equal)}var VD=Symbol("InputSignalNode#UNSET"),gx=$(g({},Rc),{transformFn:void 0,applyValueToInputSignal(e,t){uo(e,t)}});function UD(e,t){let n=Object.create(gx);n.value=e,n.transformFn=t?.transform;function r(){if(ao(n),n.value===VD){let i=null;throw new E(-950,i)}return n.value}return r[rt]=n,r}function jD(e,t){return UD(e,t)}function yx(e){return UD(VD,e)}var ba=(jD.required=yx,jD);var Zh=new _(""),vx=new _("");function va(e){return!e.moduleRef}function bx(e){let t=va(e)?e.r3Injector:e.moduleRef.injector,n=t.get(K);return n.run(()=>{va(e)?e.r3Injector.resolveInjectorInitializers():e.moduleRef.resolveInjectorInitializers();let r=t.get(_n),i;if(n.runOutsideAngular(()=>{i=n.onError.subscribe({next:r})}),va(e)){let o=()=>t.destroy(),s=e.platformInjector.get(Zh);s.add(o),t.onDestroy(()=>{i.unsubscribe(),s.delete(o)})}else{let o=()=>e.moduleRef.destroy(),s=e.platformInjector.get(Zh);s.add(o),e.moduleRef.onDestroy(()=>{ta(e.allPlatformModules,e.moduleRef),i.unsubscribe(),s.delete(o)})}return Dx(r,n,()=>{let o=t.get(zr),s=o.add(),a=t.get(Hh);return a.runInitializers(),a.donePromise.then(()=>{let c=t.get(Wo,ma);if(TD(c||ma),!t.get(vx,!0))return va(e)?t.get(gr):(e.allPlatformModules.push(e.moduleRef),e.moduleRef);if(va(e)){let u=t.get(gr);return e.rootComponent!==void 0&&u.bootstrap(e.rootComponent),u}else return Cx?.(e.moduleRef,e.allPlatformModules),e.moduleRef}).finally(()=>{o.remove(s)})})})}var Cx;function Dx(e,t,n){try{let r=n();return jo(r)?r.catch(i=>{throw t.runOutsideAngular(()=>e(i)),i}):r}catch(r){throw t.runOutsideAngular(()=>e(r)),r}}var Eu=null;function _x(e=[],t){return Te.create({name:t,providers:[{provide:Ws,useValue:"platform"},{provide:Zh,useValue:new Set([()=>Eu=null])},...e]})}function Ex(e=[]){if(Eu)return Eu;let t=_x(e);return Eu=t,_D(),wx(t),t}function wx(e){let t=e.get(ou,null);it(e,()=>{t?.forEach(n=>n())})}var Tx=1e4;var $8=Tx-1e3;var Yr=(()=>{class e{static __NG_ELEMENT_ID__=Ix}return e})();function Ix(e){return Sx(ht(),B(),(e&16)===16)}function Sx(e,t,n){if(zn(e)&&!n){let r=Jt(e.index,t);return new Wr(r,r)}else if(e.type&175){let r=t[pt];return new Wr(r,t)}return null}function $D(e){let{rootComponent:t,appProviders:n,platformProviders:r,platformRef:i}=e;ue(te.BootstrapApplicationStart);try{let o=i?.injector??Ex(r),s=[Kh(),pb,...n||[]],a=new oa({providers:s,parent:o,debugName:"",runEnvironmentInitializers:!1});return bx({r3Injector:a.injector,platformInjector:o,rootComponent:t})}catch(o){return Promise.reject(o)}finally{ue(te.BootstrapApplicationEnd)}}function ot(e){return typeof e=="boolean"?e:e!=null&&e!=="false"}function Tu(e,t=NaN){return!isNaN(parseFloat(e))&&!isNaN(Number(e))?Number(e):t}function Yh(e,t){let n=ar(e),r=t.elementInjector||Eo();return new Oi(n).create(r,t.projectableNodes,t.hostElement,t.environmentInjector,t.directives,t.bindings)}var HD=null;function vr(){return HD}function Qh(e){HD??=e}var Ca=class{},Ui=(()=>{class e{historyGo(n){throw new Error("")}static \u0275fac=function(r){return new(r||e)};static \u0275prov=C({token:e,factory:()=>h(zD),providedIn:"platform"})}return e})();var zD=(()=>{class e extends Ui{_location;_history;_doc=h(de);constructor(){super(),this._location=window.location,this._history=window.history}getBaseHrefFromDOM(){return vr().getBaseHref(this._doc)}onPopState(n){let r=vr().getGlobalEventTarget(this._doc,"window");return r.addEventListener("popstate",n,!1),()=>r.removeEventListener("popstate",n)}onHashChange(n){let r=vr().getGlobalEventTarget(this._doc,"window");return r.addEventListener("hashchange",n,!1),()=>r.removeEventListener("hashchange",n)}get href(){return this._location.href}get protocol(){return this._location.protocol}get hostname(){return this._location.hostname}get port(){return this._location.port}get pathname(){return this._location.pathname}get search(){return this._location.search}get hash(){return this._location.hash}set pathname(n){this._location.pathname=n}pushState(n,r,i){this._history.pushState(n,r,i)}replaceState(n,r,i){this._history.replaceState(n,r,i)}forward(){this._history.forward()}back(){this._history.back()}historyGo(n=0){this._history.go(n)}getState(){return this._history.state}static \u0275fac=function(r){return new(r||e)};static \u0275prov=C({token:e,factory:()=>new e,providedIn:"platform"})}return e})();function Iu(e,t){return e?t?e.endsWith("/")?t.startsWith("/")?e+t.slice(1):e+t:t.startsWith("/")?e+t:`${e}/${t}`:e:t}function WD(e){let t=e.search(/#|\?|$/);return e[t-1]==="/"?e.slice(0,t-1)+e.slice(t):e}function xn(e){return e&&e[0]!=="?"?`?${e}`:e}var Qr=(()=>{class e{historyGo(n){throw new Error("")}static \u0275fac=function(r){return new(r||e)};static \u0275prov=C({token:e,factory:()=>h(qD),providedIn:"root"})}return e})(),Xh=new _(""),qD=(()=>{class e extends Qr{_platformLocation;_baseHref;_removeListenerFns=[];constructor(n,r){super(),this._platformLocation=n,this._baseHref=r??this._platformLocation.getBaseHrefFromDOM()??h(de).location?.origin??""}ngOnDestroy(){for(;this._removeListenerFns.length;)this._removeListenerFns.pop()()}onPopState(n){this._removeListenerFns.push(this._platformLocation.onPopState(n),this._platformLocation.onHashChange(n))}getBaseHref(){return this._baseHref}prepareExternalUrl(n){return Iu(this._baseHref,n)}path(n=!1){let r=this._platformLocation.pathname+xn(this._platformLocation.search),i=this._platformLocation.hash;return i&&n?`${r}${i}`:r}pushState(n,r,i,o){let s=this.prepareExternalUrl(i+xn(o));this._platformLocation.pushState(n,r,s)}replaceState(n,r,i,o){let s=this.prepareExternalUrl(i+xn(o));this._platformLocation.replaceState(n,r,s)}forward(){this._platformLocation.forward()}back(){this._platformLocation.back()}getState(){return this._platformLocation.getState()}historyGo(n=0){this._platformLocation.historyGo?.(n)}static \u0275fac=function(r){return new(r||e)(F(Ui),F(Xh,8))};static \u0275prov=C({token:e,factory:e.\u0275fac,providedIn:"root"})}return e})();var $i=(()=>{class e{_subject=new M;_basePath;_locationStrategy;_urlChangeListeners=[];_urlChangeSubscription=null;constructor(n){this._locationStrategy=n;let r=this._locationStrategy.getBaseHref();this._basePath=Rx(WD(GD(r))),this._locationStrategy.onPopState(i=>{this._subject.next({url:this.path(!0),pop:!0,state:i.state,type:i.type})})}ngOnDestroy(){this._urlChangeSubscription?.unsubscribe(),this._urlChangeListeners=[]}path(n=!1){return this.normalize(this._locationStrategy.path(n))}getState(){return this._locationStrategy.getState()}isCurrentPathEqualTo(n,r=""){return this.path()==this.normalize(n+xn(r))}normalize(n){return e.stripTrailingSlash(xx(this._basePath,GD(n)))}prepareExternalUrl(n){return n&&n[0]!=="/"&&(n="/"+n),this._locationStrategy.prepareExternalUrl(n)}go(n,r="",i=null){this._locationStrategy.pushState(i,"",n,r),this._notifyUrlChangeListeners(this.prepareExternalUrl(n+xn(r)),i)}replaceState(n,r="",i=null){this._locationStrategy.replaceState(i,"",n,r),this._notifyUrlChangeListeners(this.prepareExternalUrl(n+xn(r)),i)}forward(){this._locationStrategy.forward()}back(){this._locationStrategy.back()}historyGo(n=0){this._locationStrategy.historyGo?.(n)}onUrlChange(n){return this._urlChangeListeners.push(n),this._urlChangeSubscription??=this.subscribe(r=>{this._notifyUrlChangeListeners(r.url,r.state)}),()=>{let r=this._urlChangeListeners.indexOf(n);this._urlChangeListeners.splice(r,1),this._urlChangeListeners.length===0&&(this._urlChangeSubscription?.unsubscribe(),this._urlChangeSubscription=null)}}_notifyUrlChangeListeners(n="",r){this._urlChangeListeners.forEach(i=>i(n,r))}subscribe(n,r,i){return this._subject.subscribe({next:n,error:r??void 0,complete:i??void 0})}static normalizeQueryParams=xn;static joinWithSlash=Iu;static stripTrailingSlash=WD;static \u0275fac=function(r){return new(r||e)(F(Qr))};static \u0275prov=C({token:e,factory:()=>Mx(),providedIn:"root"})}return e})();function Mx(){return new $i(F(Qr))}function xx(e,t){if(!e||!t.startsWith(e))return t;let n=t.substring(e.length);return n===""||["/",";","?","#"].includes(n[0])?n:t}function GD(e){return e.replace(/\/index.html$/,"")}function Rx(e){if(new RegExp("^(https?:)?//").test(e)){let[,n]=e.split(/\/\/[^\/]+/);return n}return e}var im=(()=>{class e extends Qr{_platformLocation;_baseHref="";_removeListenerFns=[];constructor(n,r){super(),this._platformLocation=n,r!=null&&(this._baseHref=r)}ngOnDestroy(){for(;this._removeListenerFns.length;)this._removeListenerFns.pop()()}onPopState(n){this._removeListenerFns.push(this._platformLocation.onPopState(n),this._platformLocation.onHashChange(n))}getBaseHref(){return this._baseHref}path(n=!1){let r=this._platformLocation.hash??"#";return r.length>0?r.substring(1):r}prepareExternalUrl(n){let r=Iu(this._baseHref,n);return r.length>0?"#"+r:r}pushState(n,r,i,o){let s=this.prepareExternalUrl(i+xn(o))||this._platformLocation.pathname;this._platformLocation.pushState(n,r,s)}replaceState(n,r,i,o){let s=this.prepareExternalUrl(i+xn(o))||this._platformLocation.pathname;this._platformLocation.replaceState(n,r,s)}forward(){this._platformLocation.forward()}back(){this._platformLocation.back()}getState(){return this._platformLocation.getState()}historyGo(n=0){this._platformLocation.historyGo?.(n)}static \u0275fac=function(r){return new(r||e)(F(Ui),F(Xh,8))};static \u0275prov=C({token:e,factory:e.\u0275fac})}return e})();var om=(function(e){return e[e.Decimal=0]="Decimal",e[e.Percent=1]="Percent",e[e.Currency=2]="Currency",e[e.Scientific=3]="Scientific",e})(om||{});var st=(function(e){return e[e.Format=0]="Format",e[e.Standalone=1]="Standalone",e})(st||{}),fe=(function(e){return e[e.Narrow=0]="Narrow",e[e.Abbreviated=1]="Abbreviated",e[e.Wide=2]="Wide",e[e.Short=3]="Short",e})(fe||{}),Mt=(function(e){return e[e.Short=0]="Short",e[e.Medium=1]="Medium",e[e.Long=2]="Long",e[e.Full=3]="Full",e})(Mt||{}),xt={Decimal:0,Group:1,List:2,PercentSign:3,PlusSign:4,MinusSign:5,Exponential:6,SuperscriptingExponent:7,PerMille:8,Infinity:9,NaN:10,TimeSeparator:11,CurrencyDecimal:12,CurrencyGroup:13};function YD(e){return It(e)[Pe.LocaleId]}function QD(e,t,n){let r=It(e),i=[r[Pe.DayPeriodsFormat],r[Pe.DayPeriodsStandalone]],o=sn(i,t);return sn(o,n)}function XD(e,t,n){let r=It(e),i=[r[Pe.DaysFormat],r[Pe.DaysStandalone]],o=sn(i,t);return sn(o,n)}function JD(e,t,n){let r=It(e),i=[r[Pe.MonthsFormat],r[Pe.MonthsStandalone]],o=sn(i,t);return sn(o,n)}function e_(e,t){let r=It(e)[Pe.Eras];return sn(r,t)}function Da(e,t){let n=It(e);return sn(n[Pe.DateFormat],t)}function _a(e,t){let n=It(e);return sn(n[Pe.TimeFormat],t)}function Ea(e,t){let r=It(e)[Pe.DateTimeFormat];return sn(r,t)}function Yn(e,t){let n=It(e),r=n[Pe.NumberSymbols][t];if(typeof r>"u"){if(t===xt.CurrencyDecimal)return n[Pe.NumberSymbols][xt.Decimal];if(t===xt.CurrencyGroup)return n[Pe.NumberSymbols][xt.Group]}return r}function t_(e,t){return It(e)[Pe.NumberFormats][t]}function n_(e){if(!e[Pe.ExtraData])throw new E(2303,!1)}function r_(e){let t=It(e);return n_(t),(t[Pe.ExtraData][2]||[]).map(r=>typeof r=="string"?Jh(r):[Jh(r[0]),Jh(r[1])])}function i_(e,t,n){let r=It(e);n_(r);let i=[r[Pe.ExtraData][0],r[Pe.ExtraData][1]],o=sn(i,t)||[];return sn(o,n)||[]}function sn(e,t){for(let n=t;n>-1;n--)if(typeof e[n]<"u")return e[n];throw new E(2304,!1)}function Jh(e){let[t,n]=e.split(":");return{hours:+t,minutes:+n}}var kx=/^(\d{4,})-?(\d\d)-?(\d\d)(?:T(\d\d)(?::?(\d\d)(?::?(\d\d)(?:\.(\d+))?)?)?(Z|([+-])(\d\d):?(\d\d))?)?$/,Su={},Nx=/((?:[^BEGHLMOSWYZabcdhmswyz']+)|(?:'(?:[^']|'')*')|(?:G{1,5}|y{1,4}|Y{1,4}|M{1,5}|L{1,5}|w{1,2}|W{1}|d{1,2}|E{1,6}|c{1,6}|a{1,5}|b{1,5}|B{1,5}|h{1,2}|H{1,2}|m{1,2}|s{1,2}|S{1,3}|z{1,4}|Z{1,5}|O{1,4}))([\s\S]*)/;function o_(e,t,n,r){let i=$x(e);t=br(n,t)||t;let s=[],a;for(;t;)if(a=Nx.exec(t),a){s=s.concat(a.slice(1));let u=s.pop();if(!u)break;t=u}else{s.push(t);break}let c=i.getTimezoneOffset();r&&(c=a_(r,c),i=Ux(i,r));let l="";return s.forEach(u=>{let d=jx(u);l+=d?d(i,n,c):u==="''"?"'":u.replace(/(^'|'$)/g,"").replace(/''/g,"'")}),l}function ku(e,t,n){let r=new Date(0);return r.setFullYear(e,t,n),r.setHours(0,0,0),r}function br(e,t){let n=YD(e);if(Su[n]??={},Su[n][t])return Su[n][t];let r="";switch(t){case"shortDate":r=Da(e,Mt.Short);break;case"mediumDate":r=Da(e,Mt.Medium);break;case"longDate":r=Da(e,Mt.Long);break;case"fullDate":r=Da(e,Mt.Full);break;case"shortTime":r=_a(e,Mt.Short);break;case"mediumTime":r=_a(e,Mt.Medium);break;case"longTime":r=_a(e,Mt.Long);break;case"fullTime":r=_a(e,Mt.Full);break;case"short":let i=br(e,"shortTime"),o=br(e,"shortDate");r=Mu(Ea(e,Mt.Short),[i,o]);break;case"medium":let s=br(e,"mediumTime"),a=br(e,"mediumDate");r=Mu(Ea(e,Mt.Medium),[s,a]);break;case"long":let c=br(e,"longTime"),l=br(e,"longDate");r=Mu(Ea(e,Mt.Long),[c,l]);break;case"full":let u=br(e,"fullTime"),d=br(e,"fullDate");r=Mu(Ea(e,Mt.Full),[u,d]);break}return r&&(Su[n][t]=r),r}function Mu(e,t){return t&&(e=e.replace(/\{([^}]+)}/g,function(n,r){return t!=null&&r in t?t[r]:n})),e}function Rn(e,t,n="-",r,i){let o="";(e<0||i&&e<=0)&&(i?e=-e+1:(e=-e,o=n));let s=String(e);for(;s.length<t;)s="0"+s;return r&&(s=s.slice(s.length-t)),o+s}function Ox(e,t){return Rn(e,3).substring(0,t)}function Be(e,t,n=0,r=!1,i=!1){return function(o,s){let a=Px(e,o);if((n>0||a>-n)&&(a+=n),e===3)a===0&&n===-12&&(a=12);else if(e===6)return Ox(a,t);let c=Yn(s,xt.MinusSign);return Rn(a,t,c,r,i)}}function Px(e,t){switch(e){case 0:return t.getFullYear();case 1:return t.getMonth();case 2:return t.getDate();case 3:return t.getHours();case 4:return t.getMinutes();case 5:return t.getSeconds();case 6:return t.getMilliseconds();case 7:return t.getDay();default:throw new E(2301,!1)}}function ve(e,t,n=st.Format,r=!1){return function(i,o){return Lx(i,o,e,t,n,r)}}function Lx(e,t,n,r,i,o){switch(n){case 2:return JD(t,i,r)[e.getMonth()];case 1:return XD(t,i,r)[e.getDay()];case 0:let s=e.getHours(),a=e.getMinutes();if(o){let l=r_(t),u=i_(t,i,r),d=l.findIndex(f=>{if(Array.isArray(f)){let[p,m]=f,D=s>=p.hours&&a>=p.minutes,T=s<m.hours||s===m.hours&&a<m.minutes;if(p.hours<m.hours){if(D&&T)return!0}else if(D||T)return!0}else if(f.hours===s&&f.minutes===a)return!0;return!1});if(d!==-1)return u[d]}return QD(t,i,r)[s<12?0:1];case 3:return e_(t,r)[e.getFullYear()<=0?0:1];default:let c=n;throw new E(2302,!1)}}function xu(e){return function(t,n,r){let i=-1*r,o=Yn(n,xt.MinusSign),s=i>0?Math.floor(i/60):Math.ceil(i/60);switch(e){case 0:return(i>=0?"+":"")+Rn(s,2,o)+Rn(Math.abs(i%60),2,o);case 1:return"GMT"+(i>=0?"+":"")+Rn(s,1,o);case 2:return"GMT"+(i>=0?"+":"")+Rn(s,2,o)+":"+Rn(Math.abs(i%60),2,o);case 3:return r===0?"Z":(i>=0?"+":"")+Rn(s,2,o)+":"+Rn(Math.abs(i%60),2,o);default:throw new E(2310,!1)}}}var Fx=0,Au=4;function Bx(e){let t=ku(e,Fx,1).getDay();return ku(e,0,1+(t<=Au?Au:Au+7)-t)}function s_(e){let t=e.getDay(),n=t===0?-3:Au-t;return ku(e.getFullYear(),e.getMonth(),e.getDate()+n)}function em(e,t=!1){return function(n,r){let i;if(t){let o=new Date(n.getFullYear(),n.getMonth(),1).getDay()-1,s=n.getDate();i=1+Math.floor((s+o)/7)}else{let o=s_(n),s=Bx(o.getFullYear()),a=o.getTime()-s.getTime();i=1+Math.round(a/6048e5)}return Rn(i,e,Yn(r,xt.MinusSign))}}function Ru(e,t=!1){return function(n,r){let o=s_(n).getFullYear();return Rn(o,e,Yn(r,xt.MinusSign),t)}}var tm={};function jx(e){if(tm[e])return tm[e];let t;switch(e){case"G":case"GG":case"GGG":t=ve(3,fe.Abbreviated);break;case"GGGG":t=ve(3,fe.Wide);break;case"GGGGG":t=ve(3,fe.Narrow);break;case"y":t=Be(0,1,0,!1,!0);break;case"yy":t=Be(0,2,0,!0,!0);break;case"yyy":t=Be(0,3,0,!1,!0);break;case"yyyy":t=Be(0,4,0,!1,!0);break;case"Y":t=Ru(1);break;case"YY":t=Ru(2,!0);break;case"YYY":t=Ru(3);break;case"YYYY":t=Ru(4);break;case"M":case"L":t=Be(1,1,1);break;case"MM":case"LL":t=Be(1,2,1);break;case"MMM":t=ve(2,fe.Abbreviated);break;case"MMMM":t=ve(2,fe.Wide);break;case"MMMMM":t=ve(2,fe.Narrow);break;case"LLL":t=ve(2,fe.Abbreviated,st.Standalone);break;case"LLLL":t=ve(2,fe.Wide,st.Standalone);break;case"LLLLL":t=ve(2,fe.Narrow,st.Standalone);break;case"w":t=em(1);break;case"ww":t=em(2);break;case"W":t=em(1,!0);break;case"d":t=Be(2,1);break;case"dd":t=Be(2,2);break;case"c":case"cc":t=Be(7,1);break;case"ccc":t=ve(1,fe.Abbreviated,st.Standalone);break;case"cccc":t=ve(1,fe.Wide,st.Standalone);break;case"ccccc":t=ve(1,fe.Narrow,st.Standalone);break;case"cccccc":t=ve(1,fe.Short,st.Standalone);break;case"E":case"EE":case"EEE":t=ve(1,fe.Abbreviated);break;case"EEEE":t=ve(1,fe.Wide);break;case"EEEEE":t=ve(1,fe.Narrow);break;case"EEEEEE":t=ve(1,fe.Short);break;case"a":case"aa":case"aaa":t=ve(0,fe.Abbreviated);break;case"aaaa":t=ve(0,fe.Wide);break;case"aaaaa":t=ve(0,fe.Narrow);break;case"b":case"bb":case"bbb":t=ve(0,fe.Abbreviated,st.Standalone,!0);break;case"bbbb":t=ve(0,fe.Wide,st.Standalone,!0);break;case"bbbbb":t=ve(0,fe.Narrow,st.Standalone,!0);break;case"B":case"BB":case"BBB":t=ve(0,fe.Abbreviated,st.Format,!0);break;case"BBBB":t=ve(0,fe.Wide,st.Format,!0);break;case"BBBBB":t=ve(0,fe.Narrow,st.Format,!0);break;case"h":t=Be(3,1,-12);break;case"hh":t=Be(3,2,-12);break;case"H":t=Be(3,1);break;case"HH":t=Be(3,2);break;case"m":t=Be(4,1);break;case"mm":t=Be(4,2);break;case"s":t=Be(5,1);break;case"ss":t=Be(5,2);break;case"S":t=Be(6,1);break;case"SS":t=Be(6,2);break;case"SSS":t=Be(6,3);break;case"Z":case"ZZ":case"ZZZ":t=xu(0);break;case"ZZZZZ":t=xu(3);break;case"O":case"OO":case"OOO":case"z":case"zz":case"zzz":t=xu(1);break;case"OOOO":case"ZZZZ":case"zzzz":t=xu(2);break;default:return null}return tm[e]=t,t}function a_(e,t){e=e.replace(/:/g,"");let n=Date.parse("Jan 01, 1970 00:00:00 "+e)/6e4;return isNaN(n)?t:n}function Vx(e,t){return e=new Date(e.getTime()),e.setMinutes(e.getMinutes()+t),e}function Ux(e,t,n){let i=e.getTimezoneOffset(),o=a_(t,i);return Vx(e,-1*(o-i))}function $x(e){if(KD(e))return e;if(typeof e=="number"&&!isNaN(e))return new Date(e);if(typeof e=="string"){if(e=e.trim(),/^(\d{4}(-\d{1,2}(-\d{1,2})?)?)$/.test(e)){let[i,o=1,s=1]=e.split("-").map(a=>+a);return ku(i,o-1,s)}let n=parseFloat(e);if(!isNaN(e-n))return new Date(n);let r;if(r=e.match(kx))return Hx(r)}let t=new Date(e);if(!KD(t))throw new E(2311,!1);return t}function Hx(e){let t=new Date(0),n=0,r=0,i=e[8]?t.setUTCFullYear:t.setFullYear,o=e[8]?t.setUTCHours:t.setHours;e[9]&&(n=Number(e[9]+e[10]),r=Number(e[9]+e[11])),i.call(t,Number(e[1]),Number(e[2])-1,Number(e[3]));let s=Number(e[4]||0)-n,a=Number(e[5]||0)-r,c=Number(e[6]||0),l=Math.floor(parseFloat("0."+(e[7]||0))*1e3);return o.call(t,s,a,c,l),t}function KD(e){return e instanceof Date&&!isNaN(e.valueOf())}var zx=/^(\d+)?\.((\d+)(-(\d+))?)?$/,ZD=22,Nu=".",wa="0",Wx=";",Gx=",",nm="#";function qx(e,t,n,r,i,o,s=!1){let a="",c=!1;if(!isFinite(e))a=Yn(n,xt.Infinity);else{let l=Yx(e);s&&(l=Zx(l));let u=t.minInt,d=t.minFrac,f=t.maxFrac;if(o){let q=o.match(zx);if(q===null)throw new E(2306,!1);let Me=q[1],tr=q[3],oi=q[5];Me!=null&&(u=rm(Me)),tr!=null&&(d=rm(tr)),oi!=null?f=rm(oi):tr!=null&&d>f&&(f=d)}Qx(l,d,f);let p=l.digits,m=l.integerLen,D=l.exponent,T=[];for(c=p.every(q=>!q);m<u;m++)p.unshift(0);for(;m<0;m++)p.unshift(0);m>0?T=p.splice(m,p.length):(T=p,p=[0]);let S=[];for(p.length>=t.lgSize&&S.unshift(p.splice(-t.lgSize,p.length).join(""));p.length>t.gSize;)S.unshift(p.splice(-t.gSize,p.length).join(""));p.length&&S.unshift(p.join("")),a=S.join(Yn(n,r)),T.length&&(a+=Yn(n,i)+T.join("")),D&&(a+=Yn(n,xt.Exponential)+"+"+D)}return e<0&&!c?a=t.negPre+a+t.negSuf:a=t.posPre+a+t.posSuf,a}function c_(e,t,n){let r=t_(t,om.Decimal),i=Kx(r,Yn(t,xt.MinusSign));return qx(e,i,t,xt.Group,xt.Decimal,n)}function Kx(e,t="-"){let n={minInt:1,minFrac:0,maxFrac:0,posPre:"",posSuf:"",negPre:"",negSuf:"",gSize:0,lgSize:0},r=e.split(Wx),i=r[0],o=r[1],s=i.indexOf(Nu)!==-1?i.split(Nu):[i.substring(0,i.lastIndexOf(wa)+1),i.substring(i.lastIndexOf(wa)+1)],a=s[0],c=s[1]||"";n.posPre=a.substring(0,a.indexOf(nm));for(let u=0;u<c.length;u++){let d=c.charAt(u);d===wa?n.minFrac=n.maxFrac=u+1:d===nm?n.maxFrac=u+1:n.posSuf+=d}let l=a.split(Gx);if(n.gSize=l[1]?l[1].length:0,n.lgSize=l[2]||l[1]?(l[2]||l[1]).length:0,o){let u=i.length-n.posPre.length-n.posSuf.length,d=o.indexOf(nm);n.negPre=o.substring(0,d).replace(/'/g,""),n.negSuf=o.slice(d+u).replace(/'/g,"")}else n.negPre=t+n.posPre,n.negSuf=n.posSuf;return n}function Zx(e){if(e.digits[0]===0)return e;let t=e.digits.length-e.integerLen;return e.exponent?e.exponent+=2:(t===0?e.digits.push(0,0):t===1&&e.digits.push(0),e.integerLen+=2),e}function Yx(e){let t=Math.abs(e)+"",n=0,r,i,o,s,a;for((i=t.indexOf(Nu))>-1&&(t=t.replace(Nu,"")),(o=t.search(/e/i))>0?(i<0&&(i=o),i+=+t.slice(o+1),t=t.substring(0,o)):i<0&&(i=t.length),o=0;t.charAt(o)===wa;o++);if(o===(a=t.length))r=[0],i=1;else{for(a--;t.charAt(a)===wa;)a--;for(i-=o,r=[],s=0;o<=a;o++,s++)r[s]=Number(t.charAt(o))}return i>ZD&&(r=r.splice(0,ZD-1),n=i-1,i=1),{digits:r,exponent:n,integerLen:i}}function Qx(e,t,n){if(t>n)throw new E(2307,!1);let r=e.digits,i=r.length-e.integerLen,o=Math.min(Math.max(t,i),n),s=o+e.integerLen,a=r[s];if(s>0){r.splice(Math.max(e.integerLen,s));for(let d=s;d<r.length;d++)r[d]=0}else{i=Math.max(0,i),e.integerLen=1,r.length=Math.max(1,s=o+1),r[0]=0;for(let d=1;d<s;d++)r[d]=0}if(a>=5)if(s-1<0){for(let d=0;d>s;d--)r.unshift(0),e.integerLen++;r.unshift(1),e.integerLen++}else r[s-1]++;for(;i<Math.max(0,o);i++)r.push(0);let c=o!==0,l=t+e.integerLen,u=r.reduceRight(function(d,f,p,m){return f=f+d,m[p]=f<10?f:f-10,c&&(m[p]===0&&p>=l?m.pop():c=!1),f>=10?1:0},0);u&&(r.unshift(u),e.integerLen++)}function rm(e){let t=parseInt(e);if(isNaN(t))throw new E(2305,!1);return t}function l_(e,t){return new E(2100,!1)}var Xx="mediumDate",u_=new _(""),d_=new _(""),sm=(()=>{class e{locale;defaultTimezone;defaultOptions;constructor(n,r,i){this.locale=n,this.defaultTimezone=r,this.defaultOptions=i}transform(n,r,i,o){if(n==null||n===""||n!==n)return null;try{let s=r??this.defaultOptions?.dateFormat??Xx,a=i??this.defaultOptions?.timezone??this.defaultTimezone??void 0;return o_(n,s,o||this.locale,a)}catch(s){throw l_(e,s.message)}}static \u0275fac=function(r){return new(r||e)(Kn(Wo,16),Kn(u_,24),Kn(d_,24))};static \u0275pipe=fa({name:"date",type:e,pure:!0})}return e})();var am=(()=>{class e{transform(n){return JSON.stringify(n,null,2)}static \u0275fac=function(r){return new(r||e)};static \u0275pipe=fa({name:"json",type:e,pure:!1})}return e})();var cm=(()=>{class e{_locale;constructor(n){this._locale=n}transform(n,r,i){if(!Jx(n))return null;i||=this._locale;try{let o=eR(n);return c_(o,i,r)}catch(o){throw l_(e,o.message)}}static \u0275fac=function(r){return new(r||e)(Kn(Wo,16))};static \u0275pipe=fa({name:"number",type:e,pure:!0})}return e})();function Jx(e){return!(e==null||e===""||e!==e)}function eR(e){if(typeof e=="string"&&!isNaN(Number(e)-parseFloat(e)))return Number(e);if(typeof e!="number")throw new E(2309,!1);return e}var Ou=(()=>{class e{static \u0275fac=function(r){return new(r||e)};static \u0275mod=nn({type:e});static \u0275inj=Lt({})}return e})();function lm(e,t){t=encodeURIComponent(t);for(let n of e.split(";")){let r=n.indexOf("="),[i,o]=r==-1?[n,""]:[n.slice(0,r),n.slice(r+1)];if(i.trim()===t)return decodeURIComponent(o)}return null}var Ta=class{};var um="browser";function f_(e){return e===um}var Ia=class{_doc;constructor(t){this._doc=t}manager},Pu=(()=>{class e extends Ia{constructor(n){super(n)}supports(n){return!0}addEventListener(n,r,i,o){return n.addEventListener(r,i,o),()=>this.removeEventListener(n,r,i,o)}removeEventListener(n,r,i,o){return n.removeEventListener(r,i,o)}static \u0275fac=function(r){return new(r||e)(F(de))};static \u0275prov=C({token:e,factory:e.\u0275fac})}return e})(),Bu=new _(""),hm=(()=>{class e{_zone;_plugins;_eventNameToPlugin=new Map;constructor(n,r){this._zone=r,n.forEach(s=>{s.manager=this});let i=n.filter(s=>!(s instanceof Pu));this._plugins=i.slice().reverse();let o=n.find(s=>s instanceof Pu);o&&this._plugins.push(o)}addEventListener(n,r,i,o){return this._findPluginFor(r).addEventListener(n,r,i,o)}getZone(){return this._zone}_findPluginFor(n){let r=this._eventNameToPlugin.get(n);if(r)return r;if(r=this._plugins.find(o=>o.supports(n)),!r)throw new E(5101,!1);return this._eventNameToPlugin.set(n,r),r}static \u0275fac=function(r){return new(r||e)(F(Bu),F(K))};static \u0275prov=C({token:e,factory:e.\u0275fac})}return e})(),dm="ng-app-id";function p_(e){for(let t of e)t.remove()}function h_(e,t){let n=t.createElement("style");return n.textContent=e,n}function iR(e,t,n,r){let i=e.head?.querySelectorAll(`style[${dm}="${t}"],link[${dm}="${t}"]`);if(i)for(let o of i)o.removeAttribute(dm),o instanceof HTMLLinkElement?r.set(o.href.slice(o.href.lastIndexOf("/")+1),{usage:0,elements:[o]}):o.textContent&&n.set(o.textContent,{usage:0,elements:[o]})}function pm(e,t){let n=t.createElement("link");return n.setAttribute("rel","stylesheet"),n.setAttribute("href",e),n}var mm=(()=>{class e{doc;appId;nonce;inline=new Map;external=new Map;hosts=new Set;constructor(n,r,i,o={}){this.doc=n,this.appId=r,this.nonce=i,iR(n,r,this.inline,this.external),this.hosts.add(n.head)}addStyles(n,r){for(let i of n)this.addUsage(i,this.inline,h_);r?.forEach(i=>this.addUsage(i,this.external,pm))}removeStyles(n,r){for(let i of n)this.removeUsage(i,this.inline);r?.forEach(i=>this.removeUsage(i,this.external))}addUsage(n,r,i){let o=r.get(n);o?o.usage++:r.set(n,{usage:1,elements:[...this.hosts].map(s=>this.addElement(s,i(n,this.doc)))})}removeUsage(n,r){let i=r.get(n);i&&(i.usage--,i.usage<=0&&(p_(i.elements),r.delete(n)))}ngOnDestroy(){for(let[,{elements:n}]of[...this.inline,...this.external])p_(n);this.hosts.clear()}addHost(n){this.hosts.add(n);for(let[r,{elements:i}]of this.inline)i.push(this.addElement(n,h_(r,this.doc)));for(let[r,{elements:i}]of this.external)i.push(this.addElement(n,pm(r,this.doc)))}removeHost(n){this.hosts.delete(n)}addElement(n,r){return this.nonce&&r.setAttribute("nonce",this.nonce),n.appendChild(r)}static \u0275fac=function(r){return new(r||e)(F(de),F(Lo),F(Fo,8),F(Fi))};static \u0275prov=C({token:e,factory:e.\u0275fac})}return e})(),fm={svg:"http://www.w3.org/2000/svg",xhtml:"http://www.w3.org/1999/xhtml",xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace",xmlns:"http://www.w3.org/2000/xmlns/",math:"http://www.w3.org/1998/Math/MathML"},gm=/%COMP%/g;var g_="%COMP%",oR=`_nghost-${g_}`,sR=`_ngcontent-${g_}`,aR=!0,cR=new _("",{factory:()=>aR});function lR(e){return sR.replace(gm,e)}function uR(e){return oR.replace(gm,e)}function y_(e,t){return t.map(n=>n.replace(gm,e))}var ym=(()=>{class e{eventManager;sharedStylesHost;appId;removeStylesOnCompDestroy;doc;ngZone;nonce;tracingService;rendererByCompId=new Map;defaultRenderer;constructor(n,r,i,o,s,a,c=null,l=null){this.eventManager=n,this.sharedStylesHost=r,this.appId=i,this.removeStylesOnCompDestroy=o,this.doc=s,this.ngZone=a,this.nonce=c,this.tracingService=l,this.defaultRenderer=new Sa(n,s,a,this.tracingService)}createRenderer(n,r){if(!n||!r)return this.defaultRenderer;let i=this.getOrCreateRenderer(n,r);return i instanceof Fu?i.applyToHost(n):i instanceof Ma&&i.applyStyles(),i}getOrCreateRenderer(n,r){let i=this.rendererByCompId,o=i.get(r.id);if(!o){let s=this.doc,a=this.ngZone,c=this.eventManager,l=this.sharedStylesHost,u=this.removeStylesOnCompDestroy,d=this.tracingService;switch(r.encapsulation){case Tn.Emulated:o=new Fu(c,l,r,this.appId,u,s,a,d);break;case Tn.ShadowDom:return new Lu(c,n,r,s,a,this.nonce,d,l);case Tn.ExperimentalIsolatedShadowDom:return new Lu(c,n,r,s,a,this.nonce,d);default:o=new Ma(c,l,r,u,s,a,d);break}i.set(r.id,o)}return o}ngOnDestroy(){this.rendererByCompId.clear()}componentReplaced(n){this.rendererByCompId.delete(n)}static \u0275fac=function(r){return new(r||e)(F(hm),F(mm),F(Lo),F(cR),F(de),F(K),F(Fo),F(Gr,8))};static \u0275prov=C({token:e,factory:e.\u0275fac})}return e})(),Sa=class{eventManager;doc;ngZone;tracingService;data=Object.create(null);throwOnSyntheticProps=!0;constructor(t,n,r,i){this.eventManager=t,this.doc=n,this.ngZone=r,this.tracingService=i}destroy(){}destroyNode=null;createElement(t,n){return n?this.doc.createElementNS(fm[n]||n,t):this.doc.createElement(t)}createComment(t){return this.doc.createComment(t)}createText(t){return this.doc.createTextNode(t)}appendChild(t,n){(m_(t)?t.content:t).appendChild(n)}insertBefore(t,n,r){t&&(m_(t)?t.content:t).insertBefore(n,r)}removeChild(t,n){n.remove()}selectRootElement(t,n){let r=typeof t=="string"?this.doc.querySelector(t):t;if(!r)throw new E(-5104,!1);return n||(r.textContent=""),r}parentNode(t){return t.parentNode}nextSibling(t){return t.nextSibling}setAttribute(t,n,r,i){if(i){n=i+":"+n;let o=fm[i];o?t.setAttributeNS(o,n,r):t.setAttribute(n,r)}else t.setAttribute(n,r)}removeAttribute(t,n,r){if(r){let i=fm[r];i?t.removeAttributeNS(i,n):t.removeAttribute(`${r}:${n}`)}else t.removeAttribute(n)}addClass(t,n){t.classList.add(n)}removeClass(t,n){t.classList.remove(n)}setStyle(t,n,r,i){i&(qn.DashCase|qn.Important)?t.style.setProperty(n,r,i&qn.Important?"important":""):t.style[n]=r}removeStyle(t,n,r){r&qn.DashCase?t.style.removeProperty(n):t.style[n]=""}setProperty(t,n,r){t!=null&&(t[n]=r)}setValue(t,n){t.nodeValue=n}listen(t,n,r,i){if(typeof t=="string"&&(t=vr().getGlobalEventTarget(this.doc,t),!t))throw new E(5102,!1);let o=this.decoratePreventDefault(r);return this.tracingService?.wrapEventListener&&(o=this.tracingService.wrapEventListener(t,n,o)),this.eventManager.addEventListener(t,n,o,i)}decoratePreventDefault(t){return n=>{if(n==="__ngUnwrap__")return t;t(n)===!1&&n.preventDefault()}}};function m_(e){return e.tagName==="TEMPLATE"&&e.content!==void 0}var Lu=class extends Sa{hostEl;sharedStylesHost;shadowRoot;constructor(t,n,r,i,o,s,a,c){super(t,i,o,a),this.hostEl=n,this.sharedStylesHost=c,this.shadowRoot=n.attachShadow({mode:"open"}),this.sharedStylesHost&&this.sharedStylesHost.addHost(this.shadowRoot);let l=r.styles;l=y_(r.id,l);for(let d of l){let f=document.createElement("style");s&&f.setAttribute("nonce",s),f.textContent=d,this.shadowRoot.appendChild(f)}let u=r.getExternalStyles?.();if(u)for(let d of u){let f=pm(d,i);s&&f.setAttribute("nonce",s),this.shadowRoot.appendChild(f)}}nodeOrShadowRoot(t){return t===this.hostEl?this.shadowRoot:t}appendChild(t,n){return super.appendChild(this.nodeOrShadowRoot(t),n)}insertBefore(t,n,r){return super.insertBefore(this.nodeOrShadowRoot(t),n,r)}removeChild(t,n){return super.removeChild(null,n)}parentNode(t){return this.nodeOrShadowRoot(super.parentNode(this.nodeOrShadowRoot(t)))}destroy(){this.sharedStylesHost&&this.sharedStylesHost.removeHost(this.shadowRoot)}},Ma=class extends Sa{sharedStylesHost;removeStylesOnCompDestroy;styles;styleUrls;constructor(t,n,r,i,o,s,a,c){super(t,o,s,a),this.sharedStylesHost=n,this.removeStylesOnCompDestroy=i;let l=r.styles;this.styles=c?y_(c,l):l,this.styleUrls=r.getExternalStyles?.(c)}applyStyles(){this.sharedStylesHost.addStyles(this.styles,this.styleUrls)}destroy(){this.removeStylesOnCompDestroy&&Ni.size===0&&this.sharedStylesHost.removeStyles(this.styles,this.styleUrls)}},Fu=class extends Ma{contentAttr;hostAttr;constructor(t,n,r,i,o,s,a,c){let l=i+"-"+r.id;super(t,n,r,o,s,a,c,l),this.contentAttr=lR(l),this.hostAttr=uR(l)}applyToHost(t){this.applyStyles(),this.setAttribute(t,this.hostAttr,"")}createElement(t,n){let r=super.createElement(t,n);return super.setAttribute(r,this.contentAttr,""),r}};var ju=class e extends Ca{supportsDOMEvents=!0;static makeCurrent(){Qh(new e)}onAndCancel(t,n,r,i){return t.addEventListener(n,r,i),()=>{t.removeEventListener(n,r,i)}}dispatchEvent(t,n){t.dispatchEvent(n)}remove(t){t.remove()}createElement(t,n){return n=n||this.getDefaultDocument(),n.createElement(t)}createHtmlDocument(){return document.implementation.createHTMLDocument("fakeTitle")}getDefaultDocument(){return document}isElementNode(t){return t.nodeType===Node.ELEMENT_NODE}isShadowRoot(t){return t instanceof DocumentFragment}getGlobalEventTarget(t,n){return n==="window"?window:n==="document"?t:n==="body"?t.body:null}getBaseHref(t){let n=dR();return n==null?null:fR(n)}resetBaseElement(){xa=null}getUserAgent(){return window.navigator.userAgent}getCookie(t){return lm(document.cookie,t)}},xa=null;function dR(){return xa=xa||document.head.querySelector("base"),xa?xa.getAttribute("href"):null}function fR(e){return new URL(e,document.baseURI).pathname}var pR=(()=>{class e{build(){return new XMLHttpRequest}static \u0275fac=function(r){return new(r||e)};static \u0275prov=C({token:e,factory:e.\u0275fac})}return e})(),v_=["alt","control","meta","shift"],hR={"\b":"Backspace","	":"Tab","\x7F":"Delete","\x1B":"Escape",Del:"Delete",Esc:"Escape",Left:"ArrowLeft",Right:"ArrowRight",Up:"ArrowUp",Down:"ArrowDown",Menu:"ContextMenu",Scroll:"ScrollLock",Win:"OS"},mR={alt:e=>e.altKey,control:e=>e.ctrlKey,meta:e=>e.metaKey,shift:e=>e.shiftKey},b_=(()=>{class e extends Ia{constructor(n){super(n)}supports(n){return e.parseEventName(n)!=null}addEventListener(n,r,i,o){let s=e.parseEventName(r),a=e.eventCallback(s.fullKey,i,this.manager.getZone());return this.manager.getZone().runOutsideAngular(()=>vr().onAndCancel(n,s.domEventName,a,o))}static parseEventName(n){let r=n.toLowerCase().split("."),i=r.shift();if(r.length===0||!(i==="keydown"||i==="keyup"))return null;let o=e._normalizeKey(r.pop()),s="",a=r.indexOf("code");if(a>-1&&(r.splice(a,1),s="code."),v_.forEach(l=>{let u=r.indexOf(l);u>-1&&(r.splice(u,1),s+=l+".")}),s+=o,r.length!=0||o.length===0)return null;let c={};return c.domEventName=i,c.fullKey=s,c}static matchEventFullKeyCode(n,r){let i=hR[n.key]||n.key,o="";return r.indexOf("code.")>-1&&(i=n.code,o="code."),i==null||!i?!1:(i=i.toLowerCase(),i===" "?i="space":i==="."&&(i="dot"),v_.forEach(s=>{if(s!==i){let a=mR[s];a(n)&&(o+=s+".")}}),o+=i,o===r)}static eventCallback(n,r,i){return o=>{e.matchEventFullKeyCode(o,n)&&i.runGuarded(()=>r(o))}}static _normalizeKey(n){return n==="esc"?"escape":n}static \u0275fac=function(r){return new(r||e)(F(de))};static \u0275prov=C({token:e,factory:e.\u0275fac})}return e})();async function vm(e,t,n){let r=g({rootComponent:e},gR(t,n));return $D(r)}function gR(e,t){return{platformRef:t?.platformRef,appProviders:[...DR,...e?.providers??[]],platformProviders:CR}}function yR(){ju.makeCurrent()}function vR(){return new Un}function bR(){return _h(document),document}var CR=[{provide:Fi,useValue:um},{provide:ou,useValue:yR,multi:!0},{provide:de,useFactory:bR}];var DR=[{provide:Ws,useValue:"root"},{provide:Un,useFactory:vR},{provide:Bu,useClass:Pu,multi:!0},{provide:Bu,useClass:b_,multi:!0},ym,mm,hm,{provide:en,useExisting:ym},{provide:Ta,useClass:pR},[]];var C_=(()=>{class e{_doc;constructor(n){this._doc=n}getTitle(){return this._doc.title}setTitle(n){this._doc.title=n||""}static \u0275fac=function(r){return new(r||e)(F(de))};static \u0275prov=C({token:e,factory:e.\u0275fac,providedIn:"root"})}return e})();var j="primary",Ha=Symbol("RouteTitle"),Em=class{params;constructor(t){this.params=t||{}}has(t){return Object.prototype.hasOwnProperty.call(this.params,t)}get(t){if(this.has(t)){let n=this.params[t];return Array.isArray(n)?n[0]:n}return null}getAll(t){if(this.has(t)){let n=this.params[t];return Array.isArray(n)?n:[n]}return[]}get keys(){return Object.keys(this.params)}};function zi(e){return new Em(e)}function bm(e,t,n){for(let r=0;r<e.length;r++){let i=e[r],o=t[r];if(i[0]===":")n[i.substring(1)]=o;else if(i!==o.path)return!1}return!0}function M_(e,t,n){let r=n.path.split("/"),i=r.indexOf("**");if(i===-1){if(r.length>e.length||n.pathMatch==="full"&&(t.hasChildren()||r.length<e.length))return null;let c={},l=e.slice(0,r.length);return bm(r,l,c)?{consumed:l,posParams:c}:null}if(i!==r.lastIndexOf("**"))return null;let o=r.slice(0,i),s=r.slice(i+1);if(o.length+s.length>e.length||n.pathMatch==="full"&&t.hasChildren()&&n.path!=="**")return null;let a={};return!bm(o,e.slice(0,o.length),a)||!bm(s,e.slice(e.length-s.length),a)?null:{consumed:e,posParams:a}}function Wu(e){return new Promise((t,n)=>{e.pipe(or()).subscribe({next:r=>t(r),error:r=>n(r)})})}function ER(e,t){if(e.length!==t.length)return!1;for(let n=0;n<e.length;++n)if(!Qn(e[n],t[n]))return!1;return!0}function Qn(e,t){let n=e?wm(e):void 0,r=t?wm(t):void 0;if(!n||!r||n.length!=r.length)return!1;let i;for(let o=0;o<n.length;o++)if(i=n[o],!x_(e[i],t[i]))return!1;return!0}function wm(e){return[...Object.keys(e),...Object.getOwnPropertySymbols(e)]}function x_(e,t){if(Array.isArray(e)&&Array.isArray(t)){if(e.length!==t.length)return!1;let n=[...e].sort(),r=[...t].sort();return n.every((i,o)=>r[o]===i)}else return e===t}function wR(e){return e.length>0?e[e.length-1]:null}function qi(e){return jn(e)?e:jo(e)?Ae(Promise.resolve(e)):I(e)}function R_(e){return jn(e)?Wu(e):Promise.resolve(e)}var TR={exact:N_,subset:O_},A_={exact:IR,subset:SR,ignored:()=>!0},k_={paths:"exact",fragment:"ignored",matrixParams:"ignored",queryParams:"exact"},Tm={paths:"subset",fragment:"ignored",matrixParams:"ignored",queryParams:"subset"};function D_(e,t,n){return TR[n.paths](e.root,t.root,n.matrixParams)&&A_[n.queryParams](e.queryParams,t.queryParams)&&!(n.fragment==="exact"&&e.fragment!==t.fragment)}function IR(e,t){return Qn(e,t)}function N_(e,t,n){if(!Hi(e.segments,t.segments)||!$u(e.segments,t.segments,n)||e.numberOfChildren!==t.numberOfChildren)return!1;for(let r in t.children)if(!e.children[r]||!N_(e.children[r],t.children[r],n))return!1;return!0}function SR(e,t){return Object.keys(t).length<=Object.keys(e).length&&Object.keys(t).every(n=>x_(e[n],t[n]))}function O_(e,t,n){return P_(e,t,t.segments,n)}function P_(e,t,n,r){if(e.segments.length>n.length){let i=e.segments.slice(0,n.length);return!(!Hi(i,n)||t.hasChildren()||!$u(i,n,r))}else if(e.segments.length===n.length){if(!Hi(e.segments,n)||!$u(e.segments,n,r))return!1;for(let i in t.children)if(!e.children[i]||!O_(e.children[i],t.children[i],r))return!1;return!0}else{let i=n.slice(0,e.segments.length),o=n.slice(e.segments.length);return!Hi(e.segments,i)||!$u(e.segments,i,r)||!e.children[j]?!1:P_(e.children[j],t,o,r)}}function $u(e,t,n){return t.every((r,i)=>A_[n](e[i].parameters,r.parameters))}var cn=class{root;queryParams;fragment;_queryParamMap;constructor(t=new ce([],{}),n={},r=null){this.root=t,this.queryParams=n,this.fragment=r}get queryParamMap(){return this._queryParamMap??=zi(this.queryParams),this._queryParamMap}toString(){return RR.serialize(this)}},ce=class{segments;children;parent=null;constructor(t,n){this.segments=t,this.children=n,Object.values(n).forEach(r=>r.parent=this)}hasChildren(){return this.numberOfChildren>0}get numberOfChildren(){return Object.keys(this.children).length}toString(){return Hu(this)}},Xr=class{path;parameters;_parameterMap;constructor(t,n){this.path=t,this.parameters=n}get parameterMap(){return this._parameterMap??=zi(this.parameters),this._parameterMap}toString(){return F_(this)}};function MR(e,t){return Hi(e,t)&&e.every((n,r)=>Qn(n.parameters,t[r].parameters))}function Hi(e,t){return e.length!==t.length?!1:e.every((n,r)=>n.path===t[r].path)}function xR(e,t){let n=[];return Object.entries(e.children).forEach(([r,i])=>{r===j&&(n=n.concat(t(i,r)))}),Object.entries(e.children).forEach(([r,i])=>{r!==j&&(n=n.concat(t(i,r)))}),n}var za=(()=>{class e{static \u0275fac=function(r){return new(r||e)};static \u0275prov=C({token:e,factory:()=>new Jr,providedIn:"root"})}return e})(),Jr=class{parse(t){let n=new Sm(t);return new cn(n.parseRootSegment(),n.parseQueryParams(),n.parseFragment())}serialize(t){let n=`/${Ra(t.root,!0)}`,r=NR(t.queryParams),i=typeof t.fragment=="string"?`#${AR(t.fragment)}`:"";return`${n}${r}${i}`}},RR=new Jr;function Hu(e){return e.segments.map(t=>F_(t)).join("/")}function Ra(e,t){if(!e.hasChildren())return Hu(e);if(t){let n=e.children[j]?Ra(e.children[j],!1):"",r=[];return Object.entries(e.children).forEach(([i,o])=>{i!==j&&r.push(`${i}:${Ra(o,!1)}`)}),r.length>0?`${n}(${r.join("//")})`:n}else{let n=xR(e,(r,i)=>i===j?[Ra(e.children[j],!1)]:[`${i}:${Ra(r,!1)}`]);return Object.keys(e.children).length===1&&e.children[j]!=null?`${Hu(e)}/${n[0]}`:`${Hu(e)}/(${n.join("//")})`}}function L_(e){return encodeURIComponent(e).replace(/%40/g,"@").replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",")}function Vu(e){return L_(e).replace(/%3B/gi,";")}function AR(e){return encodeURI(e)}function Im(e){return L_(e).replace(/\(/g,"%28").replace(/\)/g,"%29").replace(/%26/gi,"&")}function zu(e){return decodeURIComponent(e)}function __(e){return zu(e.replace(/\+/g,"%20"))}function F_(e){return`${Im(e.path)}${kR(e.parameters)}`}function kR(e){return Object.entries(e).map(([t,n])=>`;${Im(t)}=${Im(n)}`).join("")}function NR(e){let t=Object.entries(e).map(([n,r])=>Array.isArray(r)?r.map(i=>`${Vu(n)}=${Vu(i)}`).join("&"):`${Vu(n)}=${Vu(r)}`).filter(n=>n);return t.length?`?${t.join("&")}`:""}var OR=/^[^\/()?;#]+/;function Cm(e){let t=e.match(OR);return t?t[0]:""}var PR=/^[^\/()?;=#]+/;function LR(e){let t=e.match(PR);return t?t[0]:""}var FR=/^[^=?&#]+/;function BR(e){let t=e.match(FR);return t?t[0]:""}var jR=/^[^&#]+/;function VR(e){let t=e.match(jR);return t?t[0]:""}var Sm=class{url;remaining;constructor(t){this.url=t,this.remaining=t}parseRootSegment(){for(;this.consumeOptional("/"););return this.remaining===""||this.peekStartsWith("?")||this.peekStartsWith("#")?new ce([],{}):new ce([],this.parseChildren())}parseQueryParams(){let t={};if(this.consumeOptional("?"))do this.parseQueryParam(t);while(this.consumeOptional("&"));return t}parseFragment(){return this.consumeOptional("#")?decodeURIComponent(this.remaining):null}parseChildren(t=0){if(t>50)throw new E(4010,!1);if(this.remaining==="")return{};this.consumeOptional("/");let n=[];for(this.peekStartsWith("(")||n.push(this.parseSegment());this.peekStartsWith("/")&&!this.peekStartsWith("//")&&!this.peekStartsWith("/(");)this.capture("/"),n.push(this.parseSegment());let r={};this.peekStartsWith("/(")&&(this.capture("/"),r=this.parseParens(!0,t));let i={};return this.peekStartsWith("(")&&(i=this.parseParens(!1,t)),(n.length>0||Object.keys(r).length>0)&&(i[j]=new ce(n,r)),i}parseSegment(){let t=Cm(this.remaining);if(t===""&&this.peekStartsWith(";"))throw new E(4009,!1);return this.capture(t),new Xr(zu(t),this.parseMatrixParams())}parseMatrixParams(){let t={};for(;this.consumeOptional(";");)this.parseParam(t);return t}parseParam(t){let n=LR(this.remaining);if(!n)return;this.capture(n);let r="";if(this.consumeOptional("=")){let i=Cm(this.remaining);i&&(r=i,this.capture(r))}t[zu(n)]=zu(r)}parseQueryParam(t){let n=BR(this.remaining);if(!n)return;this.capture(n);let r="";if(this.consumeOptional("=")){let s=VR(this.remaining);s&&(r=s,this.capture(r))}let i=__(n),o=__(r);if(t.hasOwnProperty(i)){let s=t[i];Array.isArray(s)||(s=[s],t[i]=s),s.push(o)}else t[i]=o}parseParens(t,n){let r={};for(this.capture("(");!this.consumeOptional(")")&&this.remaining.length>0;){let i=Cm(this.remaining),o=this.remaining[i.length];if(o!=="/"&&o!==")"&&o!==";")throw new E(4010,!1);let s;i.indexOf(":")>-1?(s=i.slice(0,i.indexOf(":")),this.capture(s),this.capture(":")):t&&(s=j);let a=this.parseChildren(n+1);r[s??j]=Object.keys(a).length===1&&a[j]?a[j]:new ce([],a),this.consumeOptional("//")}return r}peekStartsWith(t){return this.remaining.startsWith(t)}consumeOptional(t){return this.peekStartsWith(t)?(this.remaining=this.remaining.substring(t.length),!0):!1}capture(t){if(!this.consumeOptional(t))throw new E(4011,!1)}};function B_(e){return e.segments.length>0?new ce([],{[j]:e}):e}function j_(e){let t={};for(let[r,i]of Object.entries(e.children)){let o=j_(i);if(r===j&&o.segments.length===0&&o.hasChildren())for(let[s,a]of Object.entries(o.children))t[s]=a;else(o.segments.length>0||o.hasChildren())&&(t[r]=o)}let n=new ce(e.segments,t);return UR(n)}function UR(e){if(e.numberOfChildren===1&&e.children[j]){let t=e.children[j];return new ce(e.segments.concat(t.segments),t.children)}return e}function Zo(e){return e instanceof cn}function V_(e,t,n=null,r=null,i=new Jr){let o=U_(e);return $_(o,t,n,r,i)}function U_(e){let t;function n(o){let s={};for(let c of o.children){let l=n(c);s[c.outlet]=l}let a=new ce(o.url,s);return o===e&&(t=a),a}let r=n(e.root),i=B_(r);return t??i}function $_(e,t,n,r,i){let o=e;for(;o.parent;)o=o.parent;if(t.length===0)return Dm(o,o,o,n,r,i);let s=$R(t);if(s.toRoot())return Dm(o,o,new ce([],{}),n,r,i);let a=HR(s,o,e),c=a.processChildren?ka(a.segmentGroup,a.index,s.commands):z_(a.segmentGroup,a.index,s.commands);return Dm(o,a.segmentGroup,c,n,r,i)}function Gu(e){return typeof e=="object"&&e!=null&&!e.outlets&&!e.segmentPath}function Pa(e){return typeof e=="object"&&e!=null&&e.outlets}function E_(e,t,n){e||="\u0275";let r=new cn;return r.queryParams={[e]:t},n.parse(n.serialize(r)).queryParams[e]}function Dm(e,t,n,r,i,o){let s={};for(let[l,u]of Object.entries(r??{}))s[l]=Array.isArray(u)?u.map(d=>E_(l,d,o)):E_(l,u,o);let a;e===t?a=n:a=H_(e,t,n);let c=B_(j_(a));return new cn(c,s,i)}function H_(e,t,n){let r={};return Object.entries(e.children).forEach(([i,o])=>{o===t?r[i]=n:r[i]=H_(o,t,n)}),new ce(e.segments,r)}var qu=class{isAbsolute;numberOfDoubleDots;commands;constructor(t,n,r){if(this.isAbsolute=t,this.numberOfDoubleDots=n,this.commands=r,t&&r.length>0&&Gu(r[0]))throw new E(4003,!1);let i=r.find(Pa);if(i&&i!==wR(r))throw new E(4004,!1)}toRoot(){return this.isAbsolute&&this.commands.length===1&&this.commands[0]=="/"}};function $R(e){if(typeof e[0]=="string"&&e.length===1&&e[0]==="/")return new qu(!0,0,e);let t=0,n=!1,r=e.reduce((i,o,s)=>{if(typeof o=="object"&&o!=null){if(o.outlets){let a={};return Object.entries(o.outlets).forEach(([c,l])=>{a[c]=typeof l=="string"?l.split("/"):l}),[...i,{outlets:a}]}if(o.segmentPath)return[...i,o.segmentPath]}return typeof o!="string"?[...i,o]:s===0?(o.split("/").forEach((a,c)=>{c==0&&a==="."||(c==0&&a===""?n=!0:a===".."?t++:a!=""&&i.push(a))}),i):[...i,o]},[]);return new qu(n,t,r)}var qo=class{segmentGroup;processChildren;index;constructor(t,n,r){this.segmentGroup=t,this.processChildren=n,this.index=r}};function HR(e,t,n){if(e.isAbsolute)return new qo(t,!0,0);if(!n)return new qo(t,!1,NaN);if(n.parent===null)return new qo(n,!0,0);let r=Gu(e.commands[0])?0:1,i=n.segments.length-1+r;return zR(n,i,e.numberOfDoubleDots)}function zR(e,t,n){let r=e,i=t,o=n;for(;o>i;){if(o-=i,r=r.parent,!r)throw new E(4005,!1);i=r.segments.length}return new qo(r,!1,i-o)}function WR(e){return Pa(e[0])?e[0].outlets:{[j]:e}}function z_(e,t,n){if(e??=new ce([],{}),e.segments.length===0&&e.hasChildren())return ka(e,t,n);let r=GR(e,t,n),i=n.slice(r.commandIndex);if(r.match&&r.pathIndex<e.segments.length){let o=new ce(e.segments.slice(0,r.pathIndex),{});return o.children[j]=new ce(e.segments.slice(r.pathIndex),e.children),ka(o,0,i)}else return r.match&&i.length===0?new ce(e.segments,{}):r.match&&!e.hasChildren()?Mm(e,t,n):r.match?ka(e,0,i):Mm(e,t,n)}function ka(e,t,n){if(n.length===0)return new ce(e.segments,{});{let r=WR(n),i={};if(Object.keys(r).some(o=>o!==j)&&e.children[j]&&e.numberOfChildren===1&&e.children[j].segments.length===0){let o=ka(e.children[j],t,n);return new ce(e.segments,o.children)}return Object.entries(r).forEach(([o,s])=>{typeof s=="string"&&(s=[s]),s!==null&&(i[o]=z_(e.children[o],t,s))}),Object.entries(e.children).forEach(([o,s])=>{r[o]===void 0&&(i[o]=s)}),new ce(e.segments,i)}}function GR(e,t,n){let r=0,i=t,o={match:!1,pathIndex:0,commandIndex:0};for(;i<e.segments.length;){if(r>=n.length)return o;let s=e.segments[i],a=n[r];if(Pa(a))break;let c=`${a}`,l=r<n.length-1?n[r+1]:null;if(i>0&&c===void 0)break;if(c&&l&&typeof l=="object"&&l.outlets===void 0){if(!T_(c,l,s))return o;r+=2}else{if(!T_(c,{},s))return o;r++}i++}return{match:!0,pathIndex:i,commandIndex:r}}function Mm(e,t,n){let r=e.segments.slice(0,t),i=0;for(;i<n.length;){let o=n[i];if(Pa(o)){let c=qR(o.outlets);return new ce(r,c)}if(i===0&&Gu(n[0])){let c=e.segments[t];r.push(new Xr(c.path,w_(n[0]))),i++;continue}let s=Pa(o)?o.outlets[j]:`${o}`,a=i<n.length-1?n[i+1]:null;s&&a&&Gu(a)?(r.push(new Xr(s,w_(a))),i+=2):(r.push(new Xr(s,{})),i++)}return new ce(r,{})}function qR(e){let t={};return Object.entries(e).forEach(([n,r])=>{typeof r=="string"&&(r=[r]),r!==null&&(t[n]=Mm(new ce([],{}),0,r))}),t}function w_(e){let t={};return Object.entries(e).forEach(([n,r])=>t[n]=`${r}`),t}function T_(e,t,n){return e==n.path&&Qn(t,n.parameters)}var Na="imperative",Ke=(function(e){return e[e.NavigationStart=0]="NavigationStart",e[e.NavigationEnd=1]="NavigationEnd",e[e.NavigationCancel=2]="NavigationCancel",e[e.NavigationError=3]="NavigationError",e[e.RoutesRecognized=4]="RoutesRecognized",e[e.ResolveStart=5]="ResolveStart",e[e.ResolveEnd=6]="ResolveEnd",e[e.GuardsCheckStart=7]="GuardsCheckStart",e[e.GuardsCheckEnd=8]="GuardsCheckEnd",e[e.RouteConfigLoadStart=9]="RouteConfigLoadStart",e[e.RouteConfigLoadEnd=10]="RouteConfigLoadEnd",e[e.ChildActivationStart=11]="ChildActivationStart",e[e.ChildActivationEnd=12]="ChildActivationEnd",e[e.ActivationStart=13]="ActivationStart",e[e.ActivationEnd=14]="ActivationEnd",e[e.Scroll=15]="Scroll",e[e.NavigationSkipped=16]="NavigationSkipped",e})(Ke||{}),Wt=class{id;url;constructor(t,n){this.id=t,this.url=n}},Wi=class extends Wt{type=Ke.NavigationStart;navigationTrigger;restoredState;constructor(t,n,r="imperative",i=null){super(t,n),this.navigationTrigger=r,this.restoredState=i}toString(){return`NavigationStart(id: ${this.id}, url: '${this.url}')`}},Dr=class extends Wt{urlAfterRedirects;type=Ke.NavigationEnd;constructor(t,n,r){super(t,n),this.urlAfterRedirects=r}toString(){return`NavigationEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}')`}},at=(function(e){return e[e.Redirect=0]="Redirect",e[e.SupersededByNewNavigation=1]="SupersededByNewNavigation",e[e.NoDataFromResolver=2]="NoDataFromResolver",e[e.GuardRejected=3]="GuardRejected",e[e.Aborted=4]="Aborted",e})(at||{}),La=(function(e){return e[e.IgnoredSameUrlNavigation=0]="IgnoredSameUrlNavigation",e[e.IgnoredByUrlHandlingStrategy=1]="IgnoredByUrlHandlingStrategy",e})(La||{}),an=class extends Wt{reason;code;type=Ke.NavigationCancel;constructor(t,n,r,i){super(t,n),this.reason=r,this.code=i}toString(){return`NavigationCancel(id: ${this.id}, url: '${this.url}')`}};function W_(e){return e instanceof an&&(e.code===at.Redirect||e.code===at.SupersededByNewNavigation)}var _r=class extends Wt{reason;code;type=Ke.NavigationSkipped;constructor(t,n,r,i){super(t,n),this.reason=r,this.code=i}},Gi=class extends Wt{error;target;type=Ke.NavigationError;constructor(t,n,r,i){super(t,n),this.error=r,this.target=i}toString(){return`NavigationError(id: ${this.id}, url: '${this.url}', error: ${this.error})`}},Fa=class extends Wt{urlAfterRedirects;state;type=Ke.RoutesRecognized;constructor(t,n,r,i){super(t,n),this.urlAfterRedirects=r,this.state=i}toString(){return`RoutesRecognized(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`}},Ku=class extends Wt{urlAfterRedirects;state;type=Ke.GuardsCheckStart;constructor(t,n,r,i){super(t,n),this.urlAfterRedirects=r,this.state=i}toString(){return`GuardsCheckStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`}},Zu=class extends Wt{urlAfterRedirects;state;shouldActivate;type=Ke.GuardsCheckEnd;constructor(t,n,r,i,o){super(t,n),this.urlAfterRedirects=r,this.state=i,this.shouldActivate=o}toString(){return`GuardsCheckEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state}, shouldActivate: ${this.shouldActivate})`}},Yu=class extends Wt{urlAfterRedirects;state;type=Ke.ResolveStart;constructor(t,n,r,i){super(t,n),this.urlAfterRedirects=r,this.state=i}toString(){return`ResolveStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`}},Qu=class extends Wt{urlAfterRedirects;state;type=Ke.ResolveEnd;constructor(t,n,r,i){super(t,n),this.urlAfterRedirects=r,this.state=i}toString(){return`ResolveEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`}},Xu=class{route;type=Ke.RouteConfigLoadStart;constructor(t){this.route=t}toString(){return`RouteConfigLoadStart(path: ${this.route.path})`}},Ju=class{route;type=Ke.RouteConfigLoadEnd;constructor(t){this.route=t}toString(){return`RouteConfigLoadEnd(path: ${this.route.path})`}},ed=class{snapshot;type=Ke.ChildActivationStart;constructor(t){this.snapshot=t}toString(){return`ChildActivationStart(path: '${this.snapshot.routeConfig&&this.snapshot.routeConfig.path||""}')`}},td=class{snapshot;type=Ke.ChildActivationEnd;constructor(t){this.snapshot=t}toString(){return`ChildActivationEnd(path: '${this.snapshot.routeConfig&&this.snapshot.routeConfig.path||""}')`}},nd=class{snapshot;type=Ke.ActivationStart;constructor(t){this.snapshot=t}toString(){return`ActivationStart(path: '${this.snapshot.routeConfig&&this.snapshot.routeConfig.path||""}')`}},rd=class{snapshot;type=Ke.ActivationEnd;constructor(t){this.snapshot=t}toString(){return`ActivationEnd(path: '${this.snapshot.routeConfig&&this.snapshot.routeConfig.path||""}')`}};var Yo=class{},Ba=class{},Qo=class{url;navigationBehaviorOptions;constructor(t,n){this.url=t,this.navigationBehaviorOptions=n}};function KR(e){return!(e instanceof Yo)&&!(e instanceof Qo)&&!(e instanceof Ba)}var id=class{rootInjector;outlet=null;route=null;children;attachRef=null;get injector(){return this.route?.snapshot._environmentInjector??this.rootInjector}constructor(t){this.rootInjector=t,this.children=new ts(this.rootInjector)}},ts=(()=>{class e{rootInjector;contexts=new Map;constructor(n){this.rootInjector=n}onChildOutletCreated(n,r){let i=this.getOrCreateContext(n);i.outlet=r,this.contexts.set(n,i)}onChildOutletDestroyed(n){let r=this.getContext(n);r&&(r.outlet=null,r.attachRef=null)}onOutletDeactivated(){let n=this.contexts;return this.contexts=new Map,n}onOutletReAttached(n){this.contexts=n}getOrCreateContext(n){let r=this.getContext(n);return r||(r=new id(this.rootInjector),this.contexts.set(n,r)),r}getContext(n){return this.contexts.get(n)||null}static \u0275fac=function(r){return new(r||e)(F(ke))};static \u0275prov=C({token:e,factory:e.\u0275fac,providedIn:"root"})}return e})(),od=class{_root;constructor(t){this._root=t}get root(){return this._root.value}parent(t){let n=this.pathFromRoot(t);return n.length>1?n[n.length-2]:null}children(t){let n=xm(t,this._root);return n?n.children.map(r=>r.value):[]}firstChild(t){let n=xm(t,this._root);return n&&n.children.length>0?n.children[0].value:null}siblings(t){let n=Rm(t,this._root);return n.length<2?[]:n[n.length-2].children.map(i=>i.value).filter(i=>i!==t)}pathFromRoot(t){return Rm(t,this._root).map(n=>n.value)}};function xm(e,t){if(e===t.value)return t;for(let n of t.children){let r=xm(e,n);if(r)return r}return null}function Rm(e,t){if(e===t.value)return[t];for(let n of t.children){let r=Rm(e,n);if(r.length)return r.unshift(t),r}return[]}var zt=class{value;children;constructor(t,n){this.value=t,this.children=n}toString(){return`TreeNode(${this.value})`}};function Go(e){let t={};return e&&e.children.forEach(n=>t[n.value.outlet]=n),t}var ja=class extends od{snapshot;constructor(t,n){super(t),this.snapshot=n,jm(this,t)}toString(){return this.snapshot.toString()}};function G_(e,t){let n=ZR(e,t),r=new Re([new Xr("",{})]),i=new Re({}),o=new Re({}),s=new Re({}),a=new Re(""),c=new ei(r,i,s,a,o,j,e,n.root);return c.snapshot=n.root,new ja(new zt(c,[]),n)}function ZR(e,t){let n={},r={},i={},s=new Xo([],n,i,"",r,j,e,null,{},t);return new Va("",new zt(s,[]))}var ei=class{urlSubject;paramsSubject;queryParamsSubject;fragmentSubject;dataSubject;outlet;component;snapshot;_futureSnapshot;_routerState;_paramMap;_queryParamMap;title;url;params;queryParams;fragment;data;constructor(t,n,r,i,o,s,a,c){this.urlSubject=t,this.paramsSubject=n,this.queryParamsSubject=r,this.fragmentSubject=i,this.dataSubject=o,this.outlet=s,this.component=a,this._futureSnapshot=c,this.title=this.dataSubject?.pipe(ee(l=>l[Ha]))??I(void 0),this.url=t,this.params=n,this.queryParams=r,this.fragment=i,this.data=o}get routeConfig(){return this._futureSnapshot.routeConfig}get root(){return this._routerState.root}get parent(){return this._routerState.parent(this)}get firstChild(){return this._routerState.firstChild(this)}get children(){return this._routerState.children(this)}get pathFromRoot(){return this._routerState.pathFromRoot(this)}get paramMap(){return this._paramMap??=this.params.pipe(ee(t=>zi(t))),this._paramMap}get queryParamMap(){return this._queryParamMap??=this.queryParams.pipe(ee(t=>zi(t))),this._queryParamMap}toString(){return this.snapshot?this.snapshot.toString():`Future(${this._futureSnapshot})`}};function Bm(e,t,n="emptyOnly"){let r,{routeConfig:i}=e;return t!==null&&(n==="always"||i?.path===""||!t.component&&!t.routeConfig?.loadComponent)?r={params:g(g({},t.params),e.params),data:g(g({},t.data),e.data),resolve:g(g(g(g({},e.data),t.data),i?.data),e._resolvedData)}:r={params:g({},e.params),data:g({},e.data),resolve:g(g({},e.data),e._resolvedData??{})},i&&K_(i)&&(r.resolve[Ha]=i.title),r}var Xo=class{url;params;queryParams;fragment;data;outlet;component;routeConfig;_resolve;_resolvedData;_routerState;_paramMap;_queryParamMap;_environmentInjector;get title(){return this.data?.[Ha]}constructor(t,n,r,i,o,s,a,c,l,u){this.url=t,this.params=n,this.queryParams=r,this.fragment=i,this.data=o,this.outlet=s,this.component=a,this.routeConfig=c,this._resolve=l,this._environmentInjector=u}get root(){return this._routerState.root}get parent(){return this._routerState.parent(this)}get firstChild(){return this._routerState.firstChild(this)}get children(){return this._routerState.children(this)}get pathFromRoot(){return this._routerState.pathFromRoot(this)}get paramMap(){return this._paramMap??=zi(this.params),this._paramMap}get queryParamMap(){return this._queryParamMap??=zi(this.queryParams),this._queryParamMap}toString(){let t=this.url.map(r=>r.toString()).join("/"),n=this.routeConfig?this.routeConfig.path:"";return`Route(url:'${t}', path:'${n}')`}},Va=class extends od{url;constructor(t,n){super(n),this.url=t,jm(this,n)}toString(){return q_(this._root)}};function jm(e,t){t.value._routerState=e,t.children.forEach(n=>jm(e,n))}function q_(e){let t=e.children.length>0?` { ${e.children.map(q_).join(", ")} } `:"";return`${e.value}${t}`}function _m(e){if(e.snapshot){let t=e.snapshot,n=e._futureSnapshot;e.snapshot=n,Qn(t.queryParams,n.queryParams)||e.queryParamsSubject.next(n.queryParams),t.fragment!==n.fragment&&e.fragmentSubject.next(n.fragment),Qn(t.params,n.params)||e.paramsSubject.next(n.params),ER(t.url,n.url)||e.urlSubject.next(n.url),Qn(t.data,n.data)||e.dataSubject.next(n.data)}else e.snapshot=e._futureSnapshot,e.dataSubject.next(e._futureSnapshot.data)}function Am(e,t){let n=Qn(e.params,t.params)&&MR(e.url,t.url),r=!e.parent!=!t.parent;return n&&!r&&(!e.parent||Am(e.parent,t.parent))}function K_(e){return typeof e.title=="string"||e.title===null}var Z_=new _(""),Wa=(()=>{class e{activated=null;get activatedComponentRef(){return this.activated}_activatedRoute=null;name=j;activateEvents=new X;deactivateEvents=new X;attachEvents=new X;detachEvents=new X;routerOutletData=ba();parentContexts=h(ts);location=h(Vt);changeDetector=h(Yr);inputBinder=h(ld,{optional:!0});supportsBindingToComponentInputs=!0;ngOnChanges(n){if(n.name){let{firstChange:r,previousValue:i}=n.name;if(r)return;this.isTrackedInParentContexts(i)&&(this.deactivate(),this.parentContexts.onChildOutletDestroyed(i)),this.initializeOutletWithName()}}ngOnDestroy(){this.isTrackedInParentContexts(this.name)&&this.parentContexts.onChildOutletDestroyed(this.name),this.inputBinder?.unsubscribeFromRouteData(this)}isTrackedInParentContexts(n){return this.parentContexts.getContext(n)?.outlet===this}ngOnInit(){this.initializeOutletWithName()}initializeOutletWithName(){if(this.parentContexts.onChildOutletCreated(this.name,this),this.activated)return;let n=this.parentContexts.getContext(this.name);n?.route&&(n.attachRef?this.attach(n.attachRef,n.route):this.activateWith(n.route,n.injector))}get isActivated(){return!!this.activated}get component(){if(!this.activated)throw new E(4012,!1);return this.activated.instance}get activatedRoute(){if(!this.activated)throw new E(4012,!1);return this._activatedRoute}get activatedRouteData(){return this._activatedRoute?this._activatedRoute.snapshot.data:{}}detach(){if(!this.activated)throw new E(4012,!1);this.location.detach();let n=this.activated;return this.activated=null,this._activatedRoute=null,this.detachEvents.emit(n.instance),n}attach(n,r){this.activated=n,this._activatedRoute=r,this.location.insert(n.hostView),this.inputBinder?.bindActivatedRouteToOutletComponent(this),this.attachEvents.emit(n.instance)}deactivate(){if(this.activated){let n=this.component;this.activated.destroy(),this.activated=null,this._activatedRoute=null,this.deactivateEvents.emit(n)}}activateWith(n,r){if(this.isActivated)throw new E(4013,!1);this._activatedRoute=n;let i=this.location,s=n.snapshot.component,a=this.parentContexts.getOrCreateContext(this.name).children,c=new km(n,a,i.injector,this.routerOutletData);this.activated=i.createComponent(s,{index:i.length,injector:c,environmentInjector:r}),this.changeDetector.markForCheck(),this.inputBinder?.bindActivatedRouteToOutletComponent(this),this.activateEvents.emit(this.activated.instance)}static \u0275fac=function(r){return new(r||e)};static \u0275dir=Ie({type:e,selectors:[["router-outlet"]],inputs:{name:"name",routerOutletData:[1,"routerOutletData"]},outputs:{activateEvents:"activate",deactivateEvents:"deactivate",attachEvents:"attach",detachEvents:"detach"},exportAs:["outlet"],features:[Li]})}return e})(),km=class{route;childContexts;parent;outletData;constructor(t,n,r,i){this.route=t,this.childContexts=n,this.parent=r,this.outletData=i}get(t,n){return t===ei?this.route:t===ts?this.childContexts:t===Z_?this.outletData:this.parent.get(t,n)}},ld=new _("");var Vm=(()=>{class e{static \u0275fac=function(r){return new(r||e)};static \u0275cmp=Fe({type:e,selectors:[["ng-component"]],exportAs:["emptyRouterOutlet"],decls:1,vars:0,template:function(r,i){r&1&&We(0,"router-outlet")},dependencies:[Wa],encapsulation:2})}return e})();function Um(e){let t=e.children&&e.children.map(Um),n=t?$(g({},e),{children:t}):g({},e);return!n.component&&!n.loadComponent&&(t||n.loadChildren)&&n.outlet&&n.outlet!==j&&(n.component=Vm),n}function YR(e,t,n){let r=Ua(e,t._root,n?n._root:void 0);return new ja(r,t)}function Ua(e,t,n){if(n&&e.shouldReuseRoute(t.value,n.value.snapshot)){let r=n.value;r._futureSnapshot=t.value;let i=QR(e,t,n);return new zt(r,i)}else{if(e.shouldAttach(t.value)){let o=e.retrieve(t.value);if(o!==null){let s=o.route;return s.value._futureSnapshot=t.value,s.children=t.children.map(a=>Ua(e,a)),s}}let r=XR(t.value),i=t.children.map(o=>Ua(e,o));return new zt(r,i)}}function QR(e,t,n){return t.children.map(r=>{for(let i of n.children)if(e.shouldReuseRoute(r.value,i.value.snapshot))return Ua(e,r,i);return Ua(e,r)})}function XR(e){return new ei(new Re(e.url),new Re(e.params),new Re(e.queryParams),new Re(e.fragment),new Re(e.data),e.outlet,e.component,e)}var Jo=class{redirectTo;navigationBehaviorOptions;constructor(t,n){this.redirectTo=t,this.navigationBehaviorOptions=n}},Y_="ngNavigationCancelingError";function sd(e,t){let{redirectTo:n,navigationBehaviorOptions:r}=Zo(t)?{redirectTo:t,navigationBehaviorOptions:void 0}:t,i=Q_(!1,at.Redirect);return i.url=n,i.navigationBehaviorOptions=r,i}function Q_(e,t){let n=new Error(`NavigationCancelingError: ${e||""}`);return n[Y_]=!0,n.cancellationCode=t,n}function JR(e){return X_(e)&&Zo(e.url)}function X_(e){return!!e&&e[Y_]}var Nm=class{routeReuseStrategy;futureState;currState;forwardEvent;inputBindingEnabled;constructor(t,n,r,i,o){this.routeReuseStrategy=t,this.futureState=n,this.currState=r,this.forwardEvent=i,this.inputBindingEnabled=o}activate(t){let n=this.futureState._root,r=this.currState?this.currState._root:null;this.deactivateChildRoutes(n,r,t),_m(this.futureState.root),this.activateChildRoutes(n,r,t)}deactivateChildRoutes(t,n,r){let i=Go(n);t.children.forEach(o=>{let s=o.value.outlet;this.deactivateRoutes(o,i[s],r),delete i[s]}),Object.values(i).forEach(o=>{this.deactivateRouteAndItsChildren(o,r)})}deactivateRoutes(t,n,r){let i=t.value,o=n?n.value:null;if(i===o)if(i.component){let s=r.getContext(i.outlet);s&&this.deactivateChildRoutes(t,n,s.children)}else this.deactivateChildRoutes(t,n,r);else o&&this.deactivateRouteAndItsChildren(n,r)}deactivateRouteAndItsChildren(t,n){t.value.component&&this.routeReuseStrategy.shouldDetach(t.value.snapshot)?this.detachAndStoreRouteSubtree(t,n):this.deactivateRouteAndOutlet(t,n)}detachAndStoreRouteSubtree(t,n){let r=n.getContext(t.value.outlet),i=r&&t.value.component?r.children:n,o=Go(t);for(let s of Object.values(o))this.deactivateRouteAndItsChildren(s,i);if(r&&r.outlet){let s=r.outlet.detach(),a=r.children.onOutletDeactivated();this.routeReuseStrategy.store(t.value.snapshot,{componentRef:s,route:t,contexts:a})}}deactivateRouteAndOutlet(t,n){let r=n.getContext(t.value.outlet),i=r&&t.value.component?r.children:n,o=Go(t);for(let s of Object.values(o))this.deactivateRouteAndItsChildren(s,i);r&&(r.outlet&&(r.outlet.deactivate(),r.children.onOutletDeactivated()),r.attachRef=null,r.route=null)}activateChildRoutes(t,n,r){let i=Go(n);t.children.forEach(o=>{this.activateRoutes(o,i[o.value.outlet],r),this.forwardEvent(new rd(o.value.snapshot))}),t.children.length&&this.forwardEvent(new td(t.value.snapshot))}activateRoutes(t,n,r){let i=t.value,o=n?n.value:null;if(_m(i),i===o)if(i.component){let s=r.getOrCreateContext(i.outlet);this.activateChildRoutes(t,n,s.children)}else this.activateChildRoutes(t,n,r);else if(i.component){let s=r.getOrCreateContext(i.outlet);if(this.routeReuseStrategy.shouldAttach(i.snapshot)){let a=this.routeReuseStrategy.retrieve(i.snapshot);this.routeReuseStrategy.store(i.snapshot,null),s.children.onOutletReAttached(a.contexts),s.attachRef=a.componentRef,s.route=a.route.value,s.outlet&&s.outlet.attach(a.componentRef,a.route.value),_m(a.route.value),this.activateChildRoutes(t,null,s.children)}else s.attachRef=null,s.route=i,s.outlet&&s.outlet.activateWith(i,s.injector),this.activateChildRoutes(t,null,s.children)}else this.activateChildRoutes(t,null,r)}},ad=class{path;route;constructor(t){this.path=t,this.route=this.path[this.path.length-1]}},Ko=class{component;route;constructor(t,n){this.component=t,this.route=n}};function eA(e,t,n){let r=e._root,i=t?t._root:null;return Aa(r,i,n,[r.value])}function tA(e){let t=e.routeConfig?e.routeConfig.canActivateChild:null;return!t||t.length===0?null:{node:e,guards:t}}function ns(e,t){let n=Symbol(),r=t.get(e,n);return r===n?typeof e=="function"&&!jf(e)?e:t.get(e):r}function Aa(e,t,n,r,i={canDeactivateChecks:[],canActivateChecks:[]}){let o=Go(t);return e.children.forEach(s=>{nA(s,o[s.value.outlet],n,r.concat([s.value]),i),delete o[s.value.outlet]}),Object.entries(o).forEach(([s,a])=>Oa(a,n.getContext(s),i)),i}function nA(e,t,n,r,i={canDeactivateChecks:[],canActivateChecks:[]}){let o=e.value,s=t?t.value:null,a=n?n.getContext(e.value.outlet):null;if(s&&o.routeConfig===s.routeConfig){let c=rA(s,o,o.routeConfig.runGuardsAndResolvers);c?i.canActivateChecks.push(new ad(r)):(o.data=s.data,o._resolvedData=s._resolvedData),o.component?Aa(e,t,a?a.children:null,r,i):Aa(e,t,n,r,i),c&&a&&a.outlet&&a.outlet.isActivated&&i.canDeactivateChecks.push(new Ko(a.outlet.component,s))}else s&&Oa(t,a,i),i.canActivateChecks.push(new ad(r)),o.component?Aa(e,null,a?a.children:null,r,i):Aa(e,null,n,r,i);return i}function rA(e,t,n){if(typeof n=="function")return it(t._environmentInjector,()=>n(e,t));switch(n){case"pathParamsChange":return!Hi(e.url,t.url);case"pathParamsOrQueryParamsChange":return!Hi(e.url,t.url)||!Qn(e.queryParams,t.queryParams);case"always":return!0;case"paramsOrQueryParamsChange":return!Am(e,t)||!Qn(e.queryParams,t.queryParams);default:return!Am(e,t)}}function Oa(e,t,n){let r=Go(e),i=e.value;Object.entries(r).forEach(([o,s])=>{i.component?t?Oa(s,t.children.getContext(o),n):Oa(s,null,n):Oa(s,t,n)}),i.component?t&&t.outlet&&t.outlet.isActivated?n.canDeactivateChecks.push(new Ko(t.outlet.component,i)):n.canDeactivateChecks.push(new Ko(null,i)):n.canDeactivateChecks.push(new Ko(null,i))}function Ga(e){return typeof e=="function"}function iA(e){return typeof e=="boolean"}function oA(e){return e&&Ga(e.canLoad)}function sA(e){return e&&Ga(e.canActivate)}function aA(e){return e&&Ga(e.canActivateChild)}function cA(e){return e&&Ga(e.canDeactivate)}function lA(e){return e&&Ga(e.canMatch)}function J_(e){return e instanceof rr||e?.name==="EmptyError"}var Uu=Symbol("INITIAL_VALUE");function es(){return Tt(e=>Df(e.map(t=>t.pipe(wt(1),Ar(Uu)))).pipe(ee(t=>{for(let n of t)if(n!==!0){if(n===Uu)return Uu;if(n===!1||uA(n))return n}return!0}),ge(t=>t!==Uu),wt(1)))}function uA(e){return Zo(e)||e instanceof Jo}function eE(e){return e.aborted?I(void 0).pipe(wt(1)):new P(t=>{let n=()=>{t.next(),t.complete()};return e.addEventListener("abort",n),()=>e.removeEventListener("abort",n)})}function tE(e){return ye(eE(e))}function dA(e){return lt(t=>{let{targetSnapshot:n,currentSnapshot:r,guards:{canActivateChecks:i,canDeactivateChecks:o}}=t;return o.length===0&&i.length===0?I($(g({},t),{guardsResult:!0})):fA(o,n,r).pipe(lt(s=>s&&iA(s)?pA(n,i,e):I(s)),ee(s=>$(g({},t),{guardsResult:s})))})}function fA(e,t,n){return Ae(e).pipe(lt(r=>vA(r.component,r.route,n,t)),or(r=>r!==!0,!0))}function pA(e,t,n){return Ae(t).pipe(ol(r=>vo(mA(r.route.parent,n),hA(r.route,n),yA(e,r.path),gA(e,r.route))),or(r=>r!==!0,!0))}function hA(e,t){return e!==null&&t&&t(new nd(e)),I(!0)}function mA(e,t){return e!==null&&t&&t(new ed(e)),I(!0)}function gA(e,t){let n=t.routeConfig?t.routeConfig.canActivate:null;if(!n||n.length===0)return I(!0);let r=n.map(i=>As(()=>{let o=t._environmentInjector,s=ns(i,o),a=sA(s)?s.canActivate(t,e):it(o,()=>s(t,e));return qi(a).pipe(or())}));return I(r).pipe(es())}function yA(e,t){let n=t[t.length-1],i=t.slice(0,t.length-1).reverse().map(o=>tA(o)).filter(o=>o!==null).map(o=>As(()=>{let s=o.guards.map(a=>{let c=o.node._environmentInjector,l=ns(a,c),u=aA(l)?l.canActivateChild(n,e):it(c,()=>l(n,e));return qi(u).pipe(or())});return I(s).pipe(es())}));return I(i).pipe(es())}function vA(e,t,n,r){let i=t&&t.routeConfig?t.routeConfig.canDeactivate:null;if(!i||i.length===0)return I(!0);let o=i.map(s=>{let a=t._environmentInjector,c=ns(s,a),l=cA(c)?c.canDeactivate(e,t,n,r):it(a,()=>c(e,t,n,r));return qi(l).pipe(or())});return I(o).pipe(es())}function bA(e,t,n,r,i){let o=t.canLoad;if(o===void 0||o.length===0)return I(!0);let s=o.map(a=>{let c=ns(a,e),l=oA(c)?c.canLoad(t,n):it(e,()=>c(t,n)),u=qi(l);return i?u.pipe(tE(i)):u});return I(s).pipe(es(),nE(r))}function nE(e){return gf(He(t=>{if(typeof t!="boolean")throw sd(e,t)}),ee(t=>t===!0))}function CA(e,t,n,r,i,o){let s=t.canMatch;if(!s||s.length===0)return I(!0);let a=s.map(c=>{let l=ns(c,e),u=lA(l)?l.canMatch(t,n,i):it(e,()=>l(t,n,i));return qi(u).pipe(tE(o))});return I(a).pipe(es(),nE(r))}var Cr=class e extends Error{segmentGroup;constructor(t){super(),this.segmentGroup=t||null,Object.setPrototypeOf(this,e.prototype)}},$a=class e extends Error{urlTree;constructor(t){super(),this.urlTree=t,Object.setPrototypeOf(this,e.prototype)}};function DA(e){throw new E(4e3,!1)}function _A(e){throw Q_(!1,at.GuardRejected)}var Om=class{urlSerializer;urlTree;constructor(t,n){this.urlSerializer=t,this.urlTree=n}async lineralizeSegments(t,n){let r=[],i=n.root;for(;;){if(r=r.concat(i.segments),i.numberOfChildren===0)return r;if(i.numberOfChildren>1||!i.children[j])throw DA(`${t.redirectTo}`);i=i.children[j]}}async applyRedirectCommands(t,n,r,i,o){let s=await EA(n,i,o);if(s instanceof cn)throw new $a(s);let a=this.applyRedirectCreateUrlTree(s,this.urlSerializer.parse(s),t,r);if(s[0]==="/")throw new $a(a);return a}applyRedirectCreateUrlTree(t,n,r,i){let o=this.createSegmentGroup(t,n.root,r,i);return new cn(o,this.createQueryParams(n.queryParams,this.urlTree.queryParams),n.fragment)}createQueryParams(t,n){let r={};return Object.entries(t).forEach(([i,o])=>{if(typeof o=="string"&&o[0]===":"){let a=o.substring(1);r[i]=n[a]}else r[i]=o}),r}createSegmentGroup(t,n,r,i){let o=this.createSegments(t,n.segments,r,i),s={};return Object.entries(n.children).forEach(([a,c])=>{s[a]=this.createSegmentGroup(t,c,r,i)}),new ce(o,s)}createSegments(t,n,r,i){return n.map(o=>o.path[0]===":"?this.findPosParam(t,o,i):this.findOrReturn(o,r))}findPosParam(t,n,r){let i=r[n.path.substring(1)];if(!i)throw new E(4001,!1);return i}findOrReturn(t,n){let r=0;for(let i of n){if(i.path===t.path)return n.splice(r),i;r++}return t}};function EA(e,t,n){if(typeof e=="string")return Promise.resolve(e);let r=e;return Wu(qi(it(n,()=>r(t))))}function wA(e,t){return e.providers&&!e._injector&&(e._injector=da(e.providers,t,`Route: ${e.path}`)),e._injector??t}function An(e){return e.outlet||j}function TA(e,t){let n=e.filter(r=>An(r)===t);return n.push(...e.filter(r=>An(r)!==t)),n}var Pm={matched:!1,consumedSegments:[],remainingSegments:[],parameters:{},positionalParamSegments:{}};function rE(e){return{routeConfig:e.routeConfig,url:e.url,params:e.params,queryParams:e.queryParams,fragment:e.fragment,data:e.data,outlet:e.outlet,title:e.title,paramMap:e.paramMap,queryParamMap:e.queryParamMap}}function IA(e,t,n,r,i,o,s){let a=iE(e,t,n);if(!a.matched)return I(a);let c=rE(o(a));return r=wA(t,r),CA(r,t,n,i,c,s).pipe(ee(l=>l===!0?a:g({},Pm)))}function iE(e,t,n){if(t.path==="")return t.pathMatch==="full"&&(e.hasChildren()||n.length>0)?g({},Pm):{matched:!0,consumedSegments:[],remainingSegments:n,parameters:{},positionalParamSegments:{}};let i=(t.matcher||M_)(n,e,t);if(!i)return g({},Pm);let o={};Object.entries(i.posParams??{}).forEach(([a,c])=>{o[a]=c.path});let s=i.consumed.length>0?g(g({},o),i.consumed[i.consumed.length-1].parameters):o;return{matched:!0,consumedSegments:i.consumed,remainingSegments:n.slice(i.consumed.length),parameters:s,positionalParamSegments:i.posParams??{}}}function I_(e,t,n,r,i){return n.length>0&&xA(e,n,r,i)?{segmentGroup:new ce(t,MA(r,new ce(n,e.children))),slicedSegments:[]}:n.length===0&&RA(e,n,r)?{segmentGroup:new ce(e.segments,SA(e,n,r,e.children)),slicedSegments:n}:{segmentGroup:new ce(e.segments,e.children),slicedSegments:n}}function SA(e,t,n,r){let i={};for(let o of n)if(ud(e,t,o)&&!r[An(o)]){let s=new ce([],{});i[An(o)]=s}return g(g({},r),i)}function MA(e,t){let n={};n[j]=t;for(let r of e)if(r.path===""&&An(r)!==j){let i=new ce([],{});n[An(r)]=i}return n}function xA(e,t,n,r){return n.some(i=>!ud(e,t,i)||!(An(i)!==j)?!1:!(r!==void 0&&An(i)===r))}function RA(e,t,n){return n.some(r=>ud(e,t,r))}function ud(e,t,n){return(e.hasChildren()||t.length>0)&&n.pathMatch==="full"?!1:n.path===""}function AA(e,t,n){return t.length===0&&!e.children[n]}var Lm=class{};async function kA(e,t,n,r,i,o,s="emptyOnly",a){return new Fm(e,t,n,r,i,s,o,a).recognize()}var NA=31,Fm=class{injector;configLoader;rootComponentType;config;urlTree;paramsInheritanceStrategy;urlSerializer;abortSignal;applyRedirects;absoluteRedirectCount=0;allowRedirects=!0;constructor(t,n,r,i,o,s,a,c){this.injector=t,this.configLoader=n,this.rootComponentType=r,this.config=i,this.urlTree=o,this.paramsInheritanceStrategy=s,this.urlSerializer=a,this.abortSignal=c,this.applyRedirects=new Om(this.urlSerializer,this.urlTree)}noMatchError(t){return new E(4002,`'${t.segmentGroup}'`)}async recognize(){let t=I_(this.urlTree.root,[],[],this.config).segmentGroup,{children:n,rootSnapshot:r}=await this.match(t),i=new zt(r,n),o=new Va("",i),s=V_(r,[],this.urlTree.queryParams,this.urlTree.fragment);return s.queryParams=this.urlTree.queryParams,o.url=this.urlSerializer.serialize(s),{state:o,tree:s}}async match(t){let n=new Xo([],Object.freeze({}),Object.freeze(g({},this.urlTree.queryParams)),this.urlTree.fragment,Object.freeze({}),j,this.rootComponentType,null,{},this.injector);try{return{children:await this.processSegmentGroup(this.injector,this.config,t,j,n),rootSnapshot:n}}catch(r){if(r instanceof $a)return this.urlTree=r.urlTree,this.match(r.urlTree.root);throw r instanceof Cr?this.noMatchError(r):r}}async processSegmentGroup(t,n,r,i,o){if(r.segments.length===0&&r.hasChildren())return this.processChildren(t,n,r,o);let s=await this.processSegment(t,n,r,r.segments,i,!0,o);return s instanceof zt?[s]:[]}async processChildren(t,n,r,i){let o=[];for(let c of Object.keys(r.children))c==="primary"?o.unshift(c):o.push(c);let s=[];for(let c of o){let l=r.children[c],u=TA(n,c),d=await this.processSegmentGroup(t,u,l,c,i);s.push(...d)}let a=oE(s);return OA(a),a}async processSegment(t,n,r,i,o,s,a){for(let c of n)try{return await this.processSegmentAgainstRoute(c._injector??t,n,c,r,i,o,s,a)}catch(l){if(l instanceof Cr||J_(l))continue;throw l}if(AA(r,i,o))return new Lm;throw new Cr(r)}async processSegmentAgainstRoute(t,n,r,i,o,s,a,c){if(An(r)!==s&&(s===j||!ud(i,o,r)))throw new Cr(i);if(r.redirectTo===void 0)return this.matchSegmentAgainstRoute(t,i,r,o,s,c);if(this.allowRedirects&&a)return this.expandSegmentAgainstRouteUsingRedirect(t,i,n,r,o,s,c);throw new Cr(i)}async expandSegmentAgainstRouteUsingRedirect(t,n,r,i,o,s,a){let{matched:c,parameters:l,consumedSegments:u,positionalParamSegments:d,remainingSegments:f}=iE(n,i,o);if(!c)throw new Cr(n);typeof i.redirectTo=="string"&&i.redirectTo[0]==="/"&&(this.absoluteRedirectCount++,this.absoluteRedirectCount>NA&&(this.allowRedirects=!1));let p=this.createSnapshot(t,i,o,l,a);if(this.abortSignal.aborted)throw new Error(this.abortSignal.reason);let m=await this.applyRedirects.applyRedirectCommands(u,i.redirectTo,d,rE(p),t),D=await this.applyRedirects.lineralizeSegments(i,m);return this.processSegment(t,r,n,D.concat(f),s,!1,a)}createSnapshot(t,n,r,i,o){let s=new Xo(r,i,Object.freeze(g({},this.urlTree.queryParams)),this.urlTree.fragment,LA(n),An(n),n.component??n._loadedComponent??null,n,FA(n),t),a=Bm(s,o,this.paramsInheritanceStrategy);return s.params=Object.freeze(a.params),s.data=Object.freeze(a.data),s}async matchSegmentAgainstRoute(t,n,r,i,o,s){if(this.abortSignal.aborted)throw new Error(this.abortSignal.reason);let a=Me=>this.createSnapshot(t,r,Me.consumedSegments,Me.parameters,s),c=await Wu(IA(n,r,i,t,this.urlSerializer,a,this.abortSignal));if(r.path==="**"&&(n.children={}),!c?.matched)throw new Cr(n);t=r._injector??t;let{routes:l}=await this.getChildConfig(t,r,i),u=r._loadedInjector??t,{parameters:d,consumedSegments:f,remainingSegments:p}=c,m=this.createSnapshot(t,r,f,d,s),{segmentGroup:D,slicedSegments:T}=I_(n,f,p,l,o);if(T.length===0&&D.hasChildren()){let Me=await this.processChildren(u,l,D,m);return new zt(m,Me)}if(l.length===0&&T.length===0)return new zt(m,[]);let S=An(r)===o,q=await this.processSegment(u,l,D,T,S?j:o,!0,m);return new zt(m,q instanceof zt?[q]:[])}async getChildConfig(t,n,r){if(n.children)return{routes:n.children,injector:t};if(n.loadChildren){if(n._loadedRoutes!==void 0){let o=n._loadedNgModuleFactory;return o&&!n._loadedInjector&&(n._loadedInjector=o.create(t).injector),{routes:n._loadedRoutes,injector:n._loadedInjector}}if(this.abortSignal.aborted)throw new Error(this.abortSignal.reason);if(await Wu(bA(t,n,r,this.urlSerializer,this.abortSignal))){let o=await this.configLoader.loadChildren(t,n);return n._loadedRoutes=o.routes,n._loadedInjector=o.injector,n._loadedNgModuleFactory=o.factory,o}throw _A(n)}return{routes:[],injector:t}}};function OA(e){e.sort((t,n)=>t.value.outlet===j?-1:n.value.outlet===j?1:t.value.outlet.localeCompare(n.value.outlet))}function PA(e){let t=e.value.routeConfig;return t&&t.path===""}function oE(e){let t=[],n=new Set;for(let r of e){if(!PA(r)){t.push(r);continue}let i=t.find(o=>r.value.routeConfig===o.value.routeConfig);i!==void 0?(i.children.push(...r.children),n.add(i)):t.push(r)}for(let r of n){let i=oE(r.children);t.push(new zt(r.value,i))}return t.filter(r=>!n.has(r))}function LA(e){return e.data||{}}function FA(e){return e.resolve||{}}function BA(e,t,n,r,i,o,s){return lt(async a=>{let{state:c,tree:l}=await kA(e,t,n,r,a.extractedUrl,i,o,s);return $(g({},a),{targetSnapshot:c,urlAfterRedirects:l})})}function jA(e){return lt(t=>{let{targetSnapshot:n,guards:{canActivateChecks:r}}=t;if(!r.length)return I(t);let i=new Set(r.map(a=>a.route)),o=new Set;for(let a of i)if(!o.has(a))for(let c of sE(a))o.add(c);let s=0;return Ae(o).pipe(ol(a=>i.has(a)?VA(a,n,e):(a.data=Bm(a,a.parent,e).resolve,I(void 0))),He(()=>s++),al(1),lt(a=>s===o.size?I(t):pe))})}function sE(e){let t=e.children.map(n=>sE(n)).flat();return[e,...t]}function VA(e,t,n){let r=e.routeConfig,i=e._resolve;return r?.title!==void 0&&!K_(r)&&(i[Ha]=r.title),As(()=>(e.data=Bm(e,e.parent,n).resolve,UA(i,e,t).pipe(ee(o=>(e._resolvedData=o,e.data=g(g({},e.data),o),null)))))}function UA(e,t,n){let r=wm(e);if(r.length===0)return I({});let i={};return Ae(r).pipe(lt(o=>$A(e[o],t,n).pipe(or(),He(s=>{if(s instanceof Jo)throw sd(new Jr,s);i[o]=s}))),al(1),ee(()=>i),ir(o=>J_(o)?pe:Cf(o)))}function $A(e,t,n){let r=t._environmentInjector,i=ns(e,r),o=i.resolve?i.resolve(t,n):it(r,()=>i(t,n));return qi(o)}function S_(e){return Tt(t=>{let n=e(t);return n?Ae(n).pipe(ee(()=>t)):I(t)})}var $m=(()=>{class e{buildTitle(n){let r,i=n.root;for(;i!==void 0;)r=this.getResolvedTitleForRoute(i)??r,i=i.children.find(o=>o.outlet===j);return r}getResolvedTitleForRoute(n){return n.data[Ha]}static \u0275fac=function(r){return new(r||e)};static \u0275prov=C({token:e,factory:()=>h(aE),providedIn:"root"})}return e})(),aE=(()=>{class e extends $m{title;constructor(n){super(),this.title=n}updateTitle(n){let r=this.buildTitle(n);r!==void 0&&this.title.setTitle(r)}static \u0275fac=function(r){return new(r||e)(F(C_))};static \u0275prov=C({token:e,factory:e.\u0275fac,providedIn:"root"})}return e})(),qa=new _("",{factory:()=>({})}),Ka=new _(""),cE=(()=>{class e{componentLoaders=new WeakMap;childrenLoaders=new WeakMap;onLoadStartListener;onLoadEndListener;compiler=h(Gh);async loadComponent(n,r){if(this.componentLoaders.get(r))return this.componentLoaders.get(r);if(r._loadedComponent)return Promise.resolve(r._loadedComponent);this.onLoadStartListener&&this.onLoadStartListener(r);let i=(async()=>{try{let o=await R_(it(n,()=>r.loadComponent())),s=await dE(uE(o));return this.onLoadEndListener&&this.onLoadEndListener(r),r._loadedComponent=s,s}finally{this.componentLoaders.delete(r)}})();return this.componentLoaders.set(r,i),i}loadChildren(n,r){if(this.childrenLoaders.get(r))return this.childrenLoaders.get(r);if(r._loadedRoutes)return Promise.resolve({routes:r._loadedRoutes,injector:r._loadedInjector});this.onLoadStartListener&&this.onLoadStartListener(r);let i=(async()=>{try{let o=await lE(r,this.compiler,n,this.onLoadEndListener);return r._loadedRoutes=o.routes,r._loadedInjector=o.injector,r._loadedNgModuleFactory=o.factory,o}finally{this.childrenLoaders.delete(r)}})();return this.childrenLoaders.set(r,i),i}static \u0275fac=function(r){return new(r||e)};static \u0275prov=C({token:e,factory:e.\u0275fac,providedIn:"root"})}return e})();async function lE(e,t,n,r){let i=await R_(it(n,()=>e.loadChildren())),o=await dE(uE(i)),s;o instanceof hu||Array.isArray(o)?s=o:s=await t.compileModuleAsync(o),r&&r(e);let a,c,l=!1,u;return Array.isArray(s)?(c=s,l=!0):(a=s.create(n).injector,u=s,c=a.get(Ka,[],{optional:!0,self:!0}).flat()),{routes:c.map(Um),injector:a,factory:u}}function HA(e){return e&&typeof e=="object"&&"default"in e}function uE(e){return HA(e)?e.default:e}async function dE(e){return e}var dd=(()=>{class e{static \u0275fac=function(r){return new(r||e)};static \u0275prov=C({token:e,factory:()=>h(zA),providedIn:"root"})}return e})(),zA=(()=>{class e{shouldProcessUrl(n){return!0}extract(n){return n}merge(n,r){return n}static \u0275fac=function(r){return new(r||e)};static \u0275prov=C({token:e,factory:e.\u0275fac,providedIn:"root"})}return e})(),fE=new _("");var WA=()=>{},pE=new _(""),hE=(()=>{class e{currentNavigation=ze(null,{equal:()=>!1});currentTransition=null;lastSuccessfulNavigation=ze(null);events=new M;transitionAbortWithErrorSubject=new M;configLoader=h(cE);environmentInjector=h(ke);destroyRef=h(Qe);urlSerializer=h(za);rootContexts=h(ts);location=h($i);inputBindingEnabled=h(ld,{optional:!0})!==null;titleStrategy=h($m);options=h(qa,{optional:!0})||{};paramsInheritanceStrategy=this.options.paramsInheritanceStrategy||"emptyOnly";urlHandlingStrategy=h(dd);createViewTransition=h(fE,{optional:!0});navigationErrorHandler=h(pE,{optional:!0});navigationId=0;get hasRequestedNavigation(){return this.navigationId!==0}transitions;afterPreactivation=()=>I(void 0);rootComponentType=null;destroyed=!1;constructor(){let n=i=>this.events.next(new Xu(i)),r=i=>this.events.next(new Ju(i));this.configLoader.onLoadEndListener=r,this.configLoader.onLoadStartListener=n,this.destroyRef.onDestroy(()=>{this.destroyed=!0})}complete(){this.transitions?.complete()}handleNavigationRequest(n){let r=++this.navigationId;Zn(()=>{this.transitions?.next($(g({},n),{extractedUrl:this.urlHandlingStrategy.extract(n.rawUrl),targetSnapshot:null,targetRouterState:null,guards:{canActivateChecks:[],canDeactivateChecks:[]},guardsResult:null,id:r,routesRecognizeHandler:{},beforeActivateHandler:{}}))})}setupNavigations(n){return this.transitions=new Re(null),this.transitions.pipe(ge(r=>r!==null),Tt(r=>{let i=!1,o=new AbortController,s=()=>!i&&this.currentTransition?.id===r.id;return I(r).pipe(Tt(a=>{if(this.navigationId>r.id)return this.cancelNavigationTransition(r,"",at.SupersededByNewNavigation),pe;this.currentTransition=r;let c=this.lastSuccessfulNavigation();this.currentNavigation.set({id:a.id,initialUrl:a.rawUrl,extractedUrl:a.extractedUrl,targetBrowserUrl:typeof a.extras.browserUrl=="string"?this.urlSerializer.parse(a.extras.browserUrl):a.extras.browserUrl,trigger:a.source,extras:a.extras,previousNavigation:c?$(g({},c),{previousNavigation:null}):null,abort:()=>o.abort(),routesRecognizeHandler:a.routesRecognizeHandler,beforeActivateHandler:a.beforeActivateHandler});let l=!n.navigated||this.isUpdatingInternalState()||this.isUpdatedBrowserUrl(),u=a.extras.onSameUrlNavigation??n.onSameUrlNavigation;if(!l&&u!=="reload")return this.events.next(new _r(a.id,this.urlSerializer.serialize(a.rawUrl),"",La.IgnoredSameUrlNavigation)),a.resolve(!1),pe;if(this.urlHandlingStrategy.shouldProcessUrl(a.rawUrl))return I(a).pipe(Tt(d=>(this.events.next(new Wi(d.id,this.urlSerializer.serialize(d.extractedUrl),d.source,d.restoredState)),d.id!==this.navigationId?pe:Promise.resolve(d))),BA(this.environmentInjector,this.configLoader,this.rootComponentType,n.config,this.urlSerializer,this.paramsInheritanceStrategy,o.signal),He(d=>{r.targetSnapshot=d.targetSnapshot,r.urlAfterRedirects=d.urlAfterRedirects,this.currentNavigation.update(f=>(f.finalUrl=d.urlAfterRedirects,f)),this.events.next(new Ba)}),Tt(d=>Ae(r.routesRecognizeHandler.deferredHandle??I(void 0)).pipe(ee(()=>d))),He(()=>{let d=new Fa(a.id,this.urlSerializer.serialize(a.extractedUrl),this.urlSerializer.serialize(a.urlAfterRedirects),a.targetSnapshot);this.events.next(d)}));if(l&&this.urlHandlingStrategy.shouldProcessUrl(a.currentRawUrl)){let{id:d,extractedUrl:f,source:p,restoredState:m,extras:D}=a,T=new Wi(d,this.urlSerializer.serialize(f),p,m);this.events.next(T);let S=G_(this.rootComponentType,this.environmentInjector).snapshot;return this.currentTransition=r=$(g({},a),{targetSnapshot:S,urlAfterRedirects:f,extras:$(g({},D),{skipLocationChange:!1,replaceUrl:!1})}),this.currentNavigation.update(q=>(q.finalUrl=f,q)),I(r)}else return this.events.next(new _r(a.id,this.urlSerializer.serialize(a.extractedUrl),"",La.IgnoredByUrlHandlingStrategy)),a.resolve(!1),pe}),ee(a=>{let c=new Ku(a.id,this.urlSerializer.serialize(a.extractedUrl),this.urlSerializer.serialize(a.urlAfterRedirects),a.targetSnapshot);return this.events.next(c),this.currentTransition=r=$(g({},a),{guards:eA(a.targetSnapshot,a.currentSnapshot,this.rootContexts)}),r}),dA(a=>this.events.next(a)),Tt(a=>{if(r.guardsResult=a.guardsResult,a.guardsResult&&typeof a.guardsResult!="boolean")throw sd(this.urlSerializer,a.guardsResult);let c=new Zu(a.id,this.urlSerializer.serialize(a.extractedUrl),this.urlSerializer.serialize(a.urlAfterRedirects),a.targetSnapshot,!!a.guardsResult);if(this.events.next(c),!s())return pe;if(!a.guardsResult)return this.cancelNavigationTransition(a,"",at.GuardRejected),pe;if(a.guards.canActivateChecks.length===0)return I(a);let l=new Yu(a.id,this.urlSerializer.serialize(a.extractedUrl),this.urlSerializer.serialize(a.urlAfterRedirects),a.targetSnapshot);if(this.events.next(l),!s())return pe;let u=!1;return I(a).pipe(jA(this.paramsInheritanceStrategy),He({next:()=>{u=!0;let d=new Qu(a.id,this.urlSerializer.serialize(a.extractedUrl),this.urlSerializer.serialize(a.urlAfterRedirects),a.targetSnapshot);this.events.next(d)},complete:()=>{u||this.cancelNavigationTransition(a,"",at.NoDataFromResolver)}}))}),S_(a=>{let c=u=>{let d=[];if(u.routeConfig?._loadedComponent)u.component=u.routeConfig?._loadedComponent;else if(u.routeConfig?.loadComponent){let f=u._environmentInjector;d.push(this.configLoader.loadComponent(f,u.routeConfig).then(p=>{u.component=p}))}for(let f of u.children)d.push(...c(f));return d},l=c(a.targetSnapshot.root);return l.length===0?I(a):Ae(Promise.all(l).then(()=>a))}),S_(()=>this.afterPreactivation()),Tt(()=>{let{currentSnapshot:a,targetSnapshot:c}=r,l=this.createViewTransition?.(this.environmentInjector,a.root,c.root);return l?Ae(l).pipe(ee(()=>r)):I(r)}),wt(1),Tt(a=>{let c=YR(n.routeReuseStrategy,a.targetSnapshot,a.currentRouterState);this.currentTransition=r=a=$(g({},a),{targetRouterState:c}),this.currentNavigation.update(u=>(u.targetRouterState=c,u)),this.events.next(new Yo);let l=r.beforeActivateHandler.deferredHandle;return l?Ae(l.then(()=>a)):I(a)}),He(a=>{new Nm(n.routeReuseStrategy,r.targetRouterState,r.currentRouterState,c=>this.events.next(c),this.inputBindingEnabled).activate(this.rootContexts),s()&&(i=!0,this.currentNavigation.update(c=>(c.abort=WA,c)),this.lastSuccessfulNavigation.set(Zn(this.currentNavigation)),this.events.next(new Dr(a.id,this.urlSerializer.serialize(a.extractedUrl),this.urlSerializer.serialize(a.urlAfterRedirects))),this.titleStrategy?.updateTitle(a.targetRouterState.snapshot),a.resolve(!0))}),ye(eE(o.signal).pipe(ge(()=>!i&&!r.targetRouterState),He(()=>{this.cancelNavigationTransition(r,o.signal.reason+"",at.Aborted)}))),He({complete:()=>{i=!0}}),ye(this.transitionAbortWithErrorSubject.pipe(He(a=>{throw a}))),_f(()=>{o.abort(),i||this.cancelNavigationTransition(r,"",at.SupersededByNewNavigation),this.currentTransition?.id===r.id&&(this.currentNavigation.set(null),this.currentTransition=null)}),ir(a=>{if(i=!0,this.destroyed)return r.resolve(!1),pe;if(X_(a))this.events.next(new an(r.id,this.urlSerializer.serialize(r.extractedUrl),a.message,a.cancellationCode)),JR(a)?this.events.next(new Qo(a.url,a.navigationBehaviorOptions)):r.resolve(!1);else{let c=new Gi(r.id,this.urlSerializer.serialize(r.extractedUrl),a,r.targetSnapshot??void 0);try{let l=it(this.environmentInjector,()=>this.navigationErrorHandler?.(c));if(l instanceof Jo){let{message:u,cancellationCode:d}=sd(this.urlSerializer,l);this.events.next(new an(r.id,this.urlSerializer.serialize(r.extractedUrl),u,d)),this.events.next(new Qo(l.redirectTo,l.navigationBehaviorOptions))}else throw this.events.next(c),a}catch(l){this.options.resolveNavigationPromiseOnError?r.resolve(!1):r.reject(l)}}return pe}))}))}cancelNavigationTransition(n,r,i){let o=new an(n.id,this.urlSerializer.serialize(n.extractedUrl),r,i);this.events.next(o),n.resolve(!1)}isUpdatingInternalState(){return this.currentTransition?.extractedUrl.toString()!==this.currentTransition?.currentUrlTree.toString()}isUpdatedBrowserUrl(){let n=this.urlHandlingStrategy.extract(this.urlSerializer.parse(this.location.path(!0))),r=Zn(this.currentNavigation),i=r?.targetBrowserUrl??r?.extractedUrl;return n.toString()!==i?.toString()&&!r?.extras.skipLocationChange}static \u0275fac=function(r){return new(r||e)};static \u0275prov=C({token:e,factory:e.\u0275fac,providedIn:"root"})}return e})();function GA(e){return e!==Na}var mE=new _("");var gE=(()=>{class e{static \u0275fac=function(r){return new(r||e)};static \u0275prov=C({token:e,factory:()=>h(qA),providedIn:"root"})}return e})(),cd=class{shouldDetach(t){return!1}store(t,n){}shouldAttach(t){return!1}retrieve(t){return null}shouldReuseRoute(t,n){return t.routeConfig===n.routeConfig}shouldDestroyInjector(t){return!0}},qA=(()=>{class e extends cd{static \u0275fac=(()=>{let n;return function(i){return(n||(n=hr(e)))(i||e)}})();static \u0275prov=C({token:e,factory:e.\u0275fac,providedIn:"root"})}return e})(),Hm=(()=>{class e{urlSerializer=h(za);options=h(qa,{optional:!0})||{};canceledNavigationResolution=this.options.canceledNavigationResolution||"replace";location=h($i);urlHandlingStrategy=h(dd);urlUpdateStrategy=this.options.urlUpdateStrategy||"deferred";currentUrlTree=new cn;getCurrentUrlTree(){return this.currentUrlTree}rawUrlTree=this.currentUrlTree;getRawUrlTree(){return this.rawUrlTree}createBrowserPath({finalUrl:n,initialUrl:r,targetBrowserUrl:i}){let o=n!==void 0?this.urlHandlingStrategy.merge(n,r):r,s=i??o;return s instanceof cn?this.urlSerializer.serialize(s):s}routerUrlState(n){return n?.targetBrowserUrl===void 0||n?.finalUrl===void 0?{}:{\u0275routerUrl:this.urlSerializer.serialize(n.finalUrl)}}commitTransition({targetRouterState:n,finalUrl:r,initialUrl:i}){r&&n?(this.currentUrlTree=r,this.rawUrlTree=this.urlHandlingStrategy.merge(r,i),this.routerState=n):this.rawUrlTree=i}routerState=G_(null,h(ke));getRouterState(){return this.routerState}_stateMemento=this.createStateMemento();get stateMemento(){return this._stateMemento}updateStateMemento(){this._stateMemento=this.createStateMemento()}createStateMemento(){return{rawUrlTree:this.rawUrlTree,currentUrlTree:this.currentUrlTree,routerState:this.routerState}}restoredState(){return this.location.getState()}static \u0275fac=function(r){return new(r||e)};static \u0275prov=C({token:e,factory:()=>h(KA),providedIn:"root"})}return e})(),KA=(()=>{class e extends Hm{currentPageId=0;lastSuccessfulId=-1;get browserPageId(){return this.canceledNavigationResolution!=="computed"?this.currentPageId:this.restoredState()?.\u0275routerPageId??this.currentPageId}registerNonRouterCurrentEntryChangeListener(n){return this.location.subscribe(r=>{r.type==="popstate"&&setTimeout(()=>{n(r.url,r.state,"popstate",{replaceUrl:!0})})})}handleRouterEvent(n,r){n instanceof Wi?this.updateStateMemento():n instanceof _r?this.commitTransition(r):n instanceof Fa?this.urlUpdateStrategy==="eager"&&(r.extras.skipLocationChange||this.setBrowserUrl(this.createBrowserPath(r),r)):n instanceof Yo?(this.commitTransition(r),this.urlUpdateStrategy==="deferred"&&!r.extras.skipLocationChange&&this.setBrowserUrl(this.createBrowserPath(r),r)):n instanceof an&&!W_(n)?this.restoreHistory(r):n instanceof Gi?this.restoreHistory(r,!0):n instanceof Dr&&(this.lastSuccessfulId=n.id,this.currentPageId=this.browserPageId)}setBrowserUrl(n,r){let{extras:i,id:o}=r,{replaceUrl:s,state:a}=i;if(this.location.isCurrentPathEqualTo(n)||s){let c=this.browserPageId,l=g(g({},a),this.generateNgRouterState(o,c,r));this.location.replaceState(n,"",l)}else{let c=g(g({},a),this.generateNgRouterState(o,this.browserPageId+1,r));this.location.go(n,"",c)}}restoreHistory(n,r=!1){if(this.canceledNavigationResolution==="computed"){let i=this.browserPageId,o=this.currentPageId-i;o!==0?this.location.historyGo(o):this.getCurrentUrlTree()===n.finalUrl&&o===0&&(this.resetInternalState(n),this.resetUrlToCurrentUrlTree())}else this.canceledNavigationResolution==="replace"&&(r&&this.resetInternalState(n),this.resetUrlToCurrentUrlTree())}resetInternalState({finalUrl:n}){this.routerState=this.stateMemento.routerState,this.currentUrlTree=this.stateMemento.currentUrlTree,this.rawUrlTree=this.urlHandlingStrategy.merge(this.currentUrlTree,n??this.rawUrlTree)}resetUrlToCurrentUrlTree(){this.location.replaceState(this.urlSerializer.serialize(this.getRawUrlTree()),"",this.generateNgRouterState(this.lastSuccessfulId,this.currentPageId))}generateNgRouterState(n,r,i){return this.canceledNavigationResolution==="computed"?g({navigationId:n,\u0275routerPageId:r},this.routerUrlState(i)):g({navigationId:n},this.routerUrlState(i))}static \u0275fac=(()=>{let n;return function(i){return(n||(n=hr(e)))(i||e)}})();static \u0275prov=C({token:e,factory:e.\u0275fac,providedIn:"root"})}return e})();function zm(e,t){e.events.pipe(ge(n=>n instanceof Dr||n instanceof an||n instanceof Gi||n instanceof _r),ee(n=>n instanceof Dr||n instanceof _r?0:(n instanceof an?n.code===at.Redirect||n.code===at.SupersededByNewNavigation:!1)?2:1),ge(n=>n!==2),wt(1)).subscribe(()=>{t()})}var fd=(()=>{class e{get currentUrlTree(){return this.stateManager.getCurrentUrlTree()}get rawUrlTree(){return this.stateManager.getRawUrlTree()}disposed=!1;nonRouterCurrentEntryChangeSubscription;console=h(jh);stateManager=h(Hm);options=h(qa,{optional:!0})||{};pendingTasks=h(zr);urlUpdateStrategy=this.options.urlUpdateStrategy||"deferred";navigationTransitions=h(hE);urlSerializer=h(za);location=h($i);urlHandlingStrategy=h(dd);injector=h(ke);_events=new M;get events(){return this._events}get routerState(){return this.stateManager.getRouterState()}navigated=!1;routeReuseStrategy=h(gE);injectorCleanup=h(mE,{optional:!0});onSameUrlNavigation=this.options.onSameUrlNavigation||"ignore";config=h(Ka,{optional:!0})?.flat()??[];componentInputBindingEnabled=!!h(ld,{optional:!0});currentNavigation=this.navigationTransitions.currentNavigation.asReadonly();constructor(){this.resetConfig(this.config),this.navigationTransitions.setupNavigations(this).subscribe({error:n=>{}}),this.subscribeToNavigationEvents()}eventsSubscription=new oe;subscribeToNavigationEvents(){let n=this.navigationTransitions.events.subscribe(r=>{try{let i=this.navigationTransitions.currentTransition,o=Zn(this.navigationTransitions.currentNavigation);if(i!==null&&o!==null){if(this.stateManager.handleRouterEvent(r,o),r instanceof an&&r.code!==at.Redirect&&r.code!==at.SupersededByNewNavigation)this.navigated=!0;else if(r instanceof Dr)this.navigated=!0,this.injectorCleanup?.(this.routeReuseStrategy,this.routerState,this.config);else if(r instanceof Qo){let s=r.navigationBehaviorOptions,a=this.urlHandlingStrategy.merge(r.url,i.currentRawUrl),c=g({scroll:i.extras.scroll,browserUrl:i.extras.browserUrl,info:i.extras.info,skipLocationChange:i.extras.skipLocationChange,replaceUrl:i.extras.replaceUrl||this.urlUpdateStrategy==="eager"||GA(i.source)},s);this.scheduleNavigation(a,Na,null,c,{resolve:i.resolve,reject:i.reject,promise:i.promise})}}KR(r)&&this._events.next(r)}catch(i){this.navigationTransitions.transitionAbortWithErrorSubject.next(i)}});this.eventsSubscription.add(n)}resetRootComponentType(n){this.routerState.root.component=n,this.navigationTransitions.rootComponentType=n}initialNavigation(){this.setUpLocationChangeListener(),this.navigationTransitions.hasRequestedNavigation||this.navigateToSyncWithBrowser(this.location.path(!0),Na,this.stateManager.restoredState(),{replaceUrl:!0})}setUpLocationChangeListener(){this.nonRouterCurrentEntryChangeSubscription??=this.stateManager.registerNonRouterCurrentEntryChangeListener((n,r,i,o)=>{this.navigateToSyncWithBrowser(n,i,r,o)})}navigateToSyncWithBrowser(n,r,i,o){let s=i?.navigationId?i:null,a=i?.\u0275routerUrl??n;if(i?.\u0275routerUrl&&(o=$(g({},o),{browserUrl:n})),i){let l=g({},i);delete l.navigationId,delete l.\u0275routerPageId,delete l.\u0275routerUrl,Object.keys(l).length!==0&&(o.state=l)}let c=this.parseUrl(a);this.scheduleNavigation(c,r,s,o).catch(l=>{this.disposed||this.injector.get(_n)(l)})}get url(){return this.serializeUrl(this.currentUrlTree)}getCurrentNavigation(){return Zn(this.navigationTransitions.currentNavigation)}get lastSuccessfulNavigation(){return this.navigationTransitions.lastSuccessfulNavigation}resetConfig(n){this.config=n.map(Um),this.navigated=!1}ngOnDestroy(){this.dispose()}dispose(){this._events.unsubscribe(),this.navigationTransitions.complete(),this.nonRouterCurrentEntryChangeSubscription?.unsubscribe(),this.nonRouterCurrentEntryChangeSubscription=void 0,this.disposed=!0,this.eventsSubscription.unsubscribe()}createUrlTree(n,r={}){let{relativeTo:i,queryParams:o,fragment:s,queryParamsHandling:a,preserveFragment:c}=r,l=c?this.currentUrlTree.fragment:s,u=null;switch(a??this.options.defaultQueryParamsHandling){case"merge":u=g(g({},this.currentUrlTree.queryParams),o);break;case"preserve":u=this.currentUrlTree.queryParams;break;default:u=o||null}u!==null&&(u=this.removeEmptyProps(u));let d;try{let f=i?i.snapshot:this.routerState.snapshot.root;d=U_(f)}catch{(typeof n[0]!="string"||n[0][0]!=="/")&&(n=[]),d=this.currentUrlTree.root}return $_(d,n,u,l??null,this.urlSerializer)}navigateByUrl(n,r={skipLocationChange:!1}){let i=Zo(n)?n:this.parseUrl(n),o=this.urlHandlingStrategy.merge(i,this.rawUrlTree);return this.scheduleNavigation(o,Na,null,r)}navigate(n,r={skipLocationChange:!1}){return ZA(n),this.navigateByUrl(this.createUrlTree(n,r),r)}serializeUrl(n){return this.urlSerializer.serialize(n)}parseUrl(n){try{return this.urlSerializer.parse(n)}catch{return this.console.warn(Do(4018,!1)),this.urlSerializer.parse("/")}}isActive(n,r){let i;if(r===!0?i=g({},k_):r===!1?i=g({},Tm):i=g(g({},Tm),r),Zo(n))return D_(this.currentUrlTree,n,i);let o=this.parseUrl(n);return D_(this.currentUrlTree,o,i)}removeEmptyProps(n){return Object.entries(n).reduce((r,[i,o])=>(o!=null&&(r[i]=o),r),{})}scheduleNavigation(n,r,i,o,s){if(this.disposed)return Promise.resolve(!1);let a,c,l;s?(a=s.resolve,c=s.reject,l=s.promise):l=new Promise((d,f)=>{a=d,c=f});let u=this.pendingTasks.add();return zm(this,()=>{queueMicrotask(()=>this.pendingTasks.remove(u))}),this.navigationTransitions.handleNavigationRequest({source:r,restoredState:i,currentUrlTree:this.currentUrlTree,currentRawUrl:this.currentUrlTree,rawUrl:n,extras:o,resolve:a,reject:c,promise:l,currentSnapshot:this.routerState.snapshot,currentRouterState:this.routerState}),l.catch(Promise.reject.bind(Promise))}static \u0275fac=function(r){return new(r||e)};static \u0275prov=C({token:e,factory:e.\u0275fac,providedIn:"root"})}return e})();function ZA(e){for(let t=0;t<e.length;t++)if(e[t]==null)throw new E(4008,!1)}var JA=new _("");function Wm(e,...t){return Fr([{provide:Ka,multi:!0,useValue:e},[],{provide:ei,useFactory:ek},{provide:yu,multi:!0,useFactory:nk},t.map(n=>n.\u0275providers)])}function ek(){return h(fd).routerState.root}function tk(e,t){return{\u0275kind:e,\u0275providers:t}}function nk(){let e=h(Te);return t=>{let n=e.get(gr);if(t!==n.components[0])return;let r=e.get(fd),i=e.get(rk);e.get(ik)===1&&r.initialNavigation(),e.get(ok,null,{optional:!0})?.setUpPreloading(),e.get(JA,null,{optional:!0})?.init(),r.resetRootComponentType(n.componentTypes[0]),i.closed||(i.next(),i.complete(),i.unsubscribe())}}var rk=new _("",{factory:()=>new M}),ik=new _("",{factory:()=>1});var ok=new _("");function Gm(){return tk(6,[{provide:Qr,useClass:im}])}var yE={get active(){return typeof globalThis.jasmine<"u"||typeof globalThis.jest<"u"||typeof globalThis.vitest<"u"}};var qm=null,Xn={get active(){return qm===!0},setDevMode(e){if(qm!==null&&!yE.active)throw new Error("[vault] DevMode has already been initialized.");qm=e}};var Ki=(e,t)=>{if(!Xn.active||typeof globalThis>"u")return;let n=globalThis.sdux??={},r=n.debugWidget??={},i=r.versions??={};i[e]!==t&&(i[e]=t)};var U={CoreAfterTap:"coreAfterTap",CoreBeforeTap:"coreBeforeTap",ReplayGlobalError:"replayGlobalError",CoreError:"coreError",CoreErrorCallback:"coreErrorCallback",CoreState:"coreState",Encrypt:"encrypt",CoreEmitState:"coreEmitState",CoreLicense:"coreLicense",ErrorTransform:"errorTransform",Extension:"extension",Filter:"filter",FromObservable:"fromObservable",FromPromise:"fromPromise",FromStream:"fromStream",Interceptor:"interceptor",Merge:"merge",Operator:"operator",Persist:"persist",Reduce:"reduce",Resolve:"resolve",StepwiseFilter:"stepwiseFilter",StepwiseReducer:"stepwiseReducer",StepwiseResolve:"stepwiseResolve",TabSyncState:"tabSyncState"};var Za={Error:"error",Warn:"warn",Log:"log",Debug:"debug"};var Km={Off:"off",Error:"error",Warn:"warn",Log:"log",Debug:"debug"};var ak=Km.Off,ck="[vault]";function Zm(e,...t){let n=vE();if(n===Km.Off)return;let r=[Za.Error,Za.Warn,Za.Log,Za.Debug];r.indexOf(e)<=r.indexOf(n)&&console[e](ck,...t)}var Zi=(...e)=>Zm("error",...e),N=(...e)=>Zm("warn",...e);var y=(...e)=>Zm("debug",...e);function vE(){return ak}var Ya=class{constructor(t,n){this.behaviorCtx=n;this.key=t}critical;key;type=U.CoreErrorCallback;destroy(){N(`${this.key} - destroy "noop"`)}reset(){N(`${this.key} - reset "noop"`)}};function ae(e){try{return JSON.stringify(e,lk,2)}catch{return"[unserializable]"}}function lk(e,t){if(typeof t=="function")return"[Function]";if(t instanceof Error)return{message:t.message,stack:t.stack};if(t instanceof Map)return{map:Array.from(t.entries())};if(t instanceof Set)return{set:Array.from(t.values())};try{return JSON.stringify(t),t}catch{return"[Circular]"}}var bE=Symbol.for("BEHAVIOR_META");var rs="vault::devtools::logging::feature::cell";var kn=Symbol.for("VAULT_CLEAR_STATE");var ln=Symbol.for("VAULT_NOOP");function ne(e){return function(t){t[bE]=e,e.type!==void 0&&(t.type=e.type),e.key!==void 0&&(t.key=e.key),e.critical!==void 0&&(t.critical=e.critical),e.resolveType!==void 0&&(t.resolveType=e.resolveType),e.wantsConfig!==void 0?t.wantsConfig=e.wantsConfig:t.wantsConfig=!1,e.configKey!==void 0&&(t.configKey=e.configKey),e.needsLicense!==void 0?t.needsLicense=e.needsLicense:t.needsLicense=!1,e.licenseId!==void 0&&(t.licenseId=e.licenseId)}}var Gt={HttpResource:"http-resource",Observable:"observable",Promise:"promise",Value:"value"};var gt={IncomingPipeline:"Incoming Pipeline",FinalizePipeline:"Finalize Pipeline",PipelineError:"Pipeline Error",PipelineDestroy:"Pipeline Destroy",PipelineReset:"Pipeline Reset",AbortController:"Abort Controller",DenyController:"Deny Controller",TabSync:"Tab Sync"};function re(e,t){return uk("Behavior",e,t)}function uk(e,t,n){let r=i=>i.charAt(0).toUpperCase()+i.slice(1).replace(/[^A-Za-z0-9]/g,"");return`SDUX::${e}::${r(t)}::${r(n)}`}function Qa(e){return!!e&&typeof e=="object"&&typeof e.value=="function"}function Xe(e,t){let n=Date.now();return e instanceof Error?{message:e.message||"Unexpected error",details:e.stack,raw:e,timestamp:n,featureCellKey:t}:typeof e=="string"?{message:e,details:e,raw:e,timestamp:n,featureCellKey:t}:{message:"Unexpected error",details:e,raw:e,timestamp:n,featureCellKey:t}}function Ym(e,t=new WeakSet){if(e===null||typeof e!="object")return e;let n=e;if(t.has(n))return e;t.add(n),Object.isFrozen(n)||Object.freeze(n);for(let r of Reflect.ownKeys(n)){let i=Object.getOwnPropertyDescriptor(n,r);i&&"value"in i&&Ym(i.value,t)}return e}var pd=e=>{if(e===null||typeof e!="object"||Object.isFrozen(e))return e;try{if(e instanceof Map||e instanceof Set||e instanceof WeakMap||e instanceof WeakSet)try{return structuredClone(e)}catch{return Ym(e)}return structuredClone(e)}catch{let t=Array.isArray(e)?[...e]:Object.assign(Object.create(Object.getPrototypeOf(e)),e);return Ym(t)}};var Qm=e=>e===ln,Xm=e=>e===kn;var is=e=>e===null,ti=e=>e===void 0,hd=e=>!ti(e),os=e=>e==null,md=e=>typeof e=="function";var dk=e=>{if(e===null||typeof e!="object")return!1;let t=Object.getPrototypeOf(e);return t===Object.prototype||t===null},Xa=e=>{if(!dk(e))return!1;let t=e,n=Object.prototype.hasOwnProperty.call(t,"loading")||Object.prototype.hasOwnProperty.call(t,"value")||Object.prototype.hasOwnProperty.call(t,"error"),r=Object.keys(t).length===0;return n||r};function ss(e){return!!(e&&typeof e=="object"&&"value"in e&&"isLoading"in e&&"error"in e&&"hasValue"in e)}var Ja,ec,gd,CE,un=class{constructor(t,n){this.behaviorCtx=n;so(this,gd);b(this,"type",un.type);b(this,"key");b(this,"critical",un.critical);so(this,Ja,!1);so(this,ec,!1);this.key=t,ef(this,Ja,Xn.active)}computeMerge(t,n,r){let i=r?.clearUndefined??!1;return y(`${this.key} merge called (clear: ${i})`),nr(this,gd,CE).call(this,t,n),n===void 0&&!i?(y(`${this.key} computeMerge skipped. next="${n}" clear="${i}"`),t):n===void 0&&i?(y(`${this.key} computeMerge skipped. next="${n}" clear="${i}"`),kn):Array.isArray(t)&&n!=null?(y(`${this.key} pushing T to State \u2192 return [...curr, next]`),[...t,n]):(y(`${this.key} non-array branch. return next`),n)}destroy(){N(`${this.key} - destroy "noop"`)}reset(){N(`${this.key} - reset "noop"`)}};Ja=new WeakMap,ec=new WeakMap,gd=new WeakSet,CE=function(t,n){if(Array.isArray(t)===!1&&t!=null&&n!==void 0&&t!==ln){let r=`[vault] ${this.key}: ArrayPushMerge received non-array current value. This behavior is intended for array state.`,i=ae({currentType:typeof t,currentValue:t,nextValue:n});Jd(this,Ja)&&!Jd(this,ec)?(ef(this,ec,!0),console.warn(`One Time Warning: ${r}`,i),N(`One Time Warning: ${r}`,i)):N(r,i)}},b(un,"type"),b(un,"key"),b(un,"critical",!1),un=Q([ne({type:U.Merge,key:re("Merge","ArrayPush"),critical:!0})],un);var ig={get active(){return typeof globalThis.jasmine<"u"||typeof globalThis.jest<"u"||typeof globalThis.vitest<"u"}},Jm=null,Je={get active(){return Jm===!0},setDevMode(e){if(Jm!==null&&!ig.active)throw new Error("[vault] DevMode has already been initialized.");Jm=e}},nc=(e,t)=>{if(!Je.active||typeof globalThis>"u")return;let n=globalThis.sdux??={},r=n.debugWidget??={},i=r.versions??={};i[e]!==t&&(i[e]=t)},fk="@sdux-vault/shared",pk="0.9.0";nc(fk,pk);var w={CoreAfterTap:"coreAfterTap",CoreBeforeTap:"coreBeforeTap",ReplayGlobalError:"replayGlobalError",CoreError:"coreError",CoreErrorCallback:"coreErrorCallback",CoreState:"coreState",Encrypt:"encrypt",CoreEmitState:"coreEmitState",CoreLicense:"coreLicense",ErrorTransform:"errorTransform",Extension:"extension",Filter:"filter",FromObservable:"fromObservable",FromPromise:"fromPromise",FromStream:"fromStream",Interceptor:"interceptor",Merge:"merge",Operator:"operator",Persist:"persist",Reduce:"reduce",Resolve:"resolve",StepwiseFilter:"stepwiseFilter",StepwiseReducer:"stepwiseReducer",StepwiseResolve:"stepwiseResolve",TabSyncState:"tabSyncState"},yd={Error:"error",Warn:"warn",Log:"log",Debug:"debug"},DE={Off:"off",Error:"error",Warn:"warn",Log:"log",Debug:"debug"},_E=DE.Off,hk="[vault]";function og(e,...t){let n=mk();if(n===DE.Off)return;let r=[yd.Error,yd.Warn,yd.Log,yd.Debug];r.indexOf(e)<=r.indexOf(n)&&console[e](hk,...t)}var yt=(...e)=>og("error",...e),Se=(...e)=>og("warn",...e);var be=(...e)=>og("debug",...e);function EE(e){_E=e??"off"}function mk(){return _E}function gk(e){try{return JSON.stringify(e,yk,2)}catch{return"[unserializable]"}}function yk(e,t){if(typeof t=="function")return"[Function]";if(t instanceof Error)return{message:t.message,stack:t.stack};if(t instanceof Map)return{map:Array.from(t.entries())};if(t instanceof Set)return{set:Array.from(t.values())};try{return JSON.stringify(t),t}catch{return"[Circular]"}}var tg=class{#t=new Re(null);constructor(){be("[VaultPrivateErrorService] initialized (singleton instance created)")}setError(t){be(`[VaultPrivateErrorService] setError() ${gk(t)}`),this.#t.next(t)}getError(){return be("[VaultPrivateErrorService] getError() \u2192 observable subscribed"),this.#t.asObservable()}clear(){be("[VaultPrivateErrorService] clear() \u2192 error reset to null"),this.#t.next(null)}},eg=null;function wE(){return eg?be("[VaultPrivateErrorService] returning existing singleton instance"):(be("[VaultPrivateErrorService] creating new singleton instance"),eg=new tg),eg}var Cd=Symbol.for("BEHAVIOR_META"),Dd=Symbol.for("CONTROLLER_META"),TE="vault::devtools::aggregate:feature::cell",IE="vault::devtools::logging::feature::cell",rc=Symbol.for("VAULT_CLEAR_STATE"),sg=Symbol.for("VAULT_CONTINUE"),_d=Symbol.for("VAULT_NOOP"),ag=Symbol.for("VAULT_STOP");function SE(e){return function(t){t[Cd]=e,e.type!==void 0&&(t.type=e.type),e.key!==void 0&&(t.key=e.key),e.critical!==void 0&&(t.critical=e.critical),e.resolveType!==void 0&&(t.resolveType=e.resolveType),e.wantsConfig!==void 0?t.wantsConfig=e.wantsConfig:t.wantsConfig=!1,e.configKey!==void 0&&(t.configKey=e.configKey),e.needsLicense!==void 0?t.needsLicense=e.needsLicense:t.needsLicense=!1,e.licenseId!==void 0&&(t.licenseId=e.licenseId)}}function Ed(e){return function(t){t[Dd]=e,e.type!==void 0&&(t.type=e.type),e.key!==void 0&&(t.key=e.key),e.critical!==void 0&&(t.critical=e.critical),e.wantsConfig!==void 0?t.wantsConfig=e.wantsConfig:t.wantsConfig=!1,e.configKey!==void 0&&(t.configKey=e.configKey),e.needsLicense!==void 0?t.needsLicense=e.needsLicense:t.needsLicense=!1,e.licenseId!==void 0&&(t.licenseId=e.licenseId)}}var vk={Usage:"VaultErrorUsage",VaultError:"VaultError"},cg={EncryptionIntegrity:"VaultErrorEncryptionIntegrity",License:"VaultErrorLicense",Usage:"VaultErrorUsage",VaultError:"VaultError"},vd=class extends Error{kind;constructor(t,n=cg.VaultError,r=vk.VaultError){super(t),this.name=n,this.kind=r,Object.setPrototypeOf(this,new.target.prototype);let i=Error;typeof i.captureStackTrace=="function"&&i.captureStackTrace(this,new.target)}};var lg={Encryption:"VaultErrorEncryption",License:"VaultErrorLicense",Promise:"VaultErrorUsagePromise",PromiseFactoryRequired:"VaultErrorUsagePromiseFactoryRequired",Usage:"VaultErrorUsage"},tc=class extends vd{constructor(t,n=lg.License){super(t,cg.License,n)}},ng=class extends vd{constructor(t,n=lg.Usage){super(t,cg.Usage,n)}},bd=class extends ng{constructor(){super(`Invalid incoming value: Promise detected.

Promises are eager and may resolve or reject before entering the Vault pipeline.

Use the following instead  a DeferredFactory value

This guarantees the promise is created and executed inside the pipeline.`,lg.Promise)}};var Nn={Attempt:"attempt",Failure:"failure",Finalize:"Finalize Pipeline",Success:"success",Vote:"vote"},et={Abstain:"abstain",Abort:"abort",Deny:"deny"},ni={CoreAbstain:"coreAbstain",Error:"error",License:"license",Policy:"policy",ReplayGlobalError:"replayGlobalError",Stepwise:"stepwise",TabSync:"tabSync"},qt={Abort:"abort",Abstain:"abstain",Deny:"deny"},Rt={End:"end",Notification:"notification",Start:"start",Unknown:"unknown"},ct={Conductor:"conductor",Controller:"controller",Lifecycle:"lifecycle",Stage:"stage",Unknown:"unknown"},dn={Merge:"merge",Replace:"replace",Initialize:"initialize"},ic={HttpResource:"http-resource",Observable:"observable",Promise:"promise",Value:"value"};function ug(e,t){return ME("Behavior",e,t)}function ME(e,t,n){let r=i=>i.charAt(0).toUpperCase()+i.slice(1).replace(/[^A-Za-z0-9]/g,"");return`SDUX::${e}::${r(t)}::${r(n)}`}function dg(e){return typeof e!="string"?!1:/^SDUX::(Behavior|Controller)::[A-Z][A-Za-z0-9]*::[A-Z][A-Za-z0-9]*$/.test(e)}function wd(e,t){return ME("Controller",e,t)}function xE(e){return dg(e)}function Yi(e,t){let n=Date.now();return e instanceof Error?{message:e.message||"Unexpected error",details:e.stack,raw:e,timestamp:n,featureCellKey:t}:typeof e=="string"?{message:e,details:e,raw:e,timestamp:n,featureCellKey:t}:{message:"Unexpected error",details:e,raw:e,timestamp:n,featureCellKey:t}}function rg(e,t=new WeakSet){if(e===null||typeof e!="object")return e;let n=e;if(t.has(n))return e;t.add(n),Object.isFrozen(n)||Object.freeze(n);for(let r of Reflect.ownKeys(n)){let i=Object.getOwnPropertyDescriptor(n,r);i&&"value"in i&&rg(i.value,t)}return e}var ie=e=>{if(e===null||typeof e!="object"||Object.isFrozen(e))return e;try{if(e instanceof Map||e instanceof Set||e instanceof WeakMap||e instanceof WeakSet)try{return structuredClone(e)}catch{return rg(e)}return structuredClone(e)}catch{let t=Array.isArray(e)?[...e]:Object.assign(Object.create(Object.getPrototypeOf(e)),e);return rg(t)}},ri=e=>e===_d,Qi=e=>e===rc,Td=e=>e===sg;var oc=e=>e===void 0,Jn=e=>!oc(e),Id=e=>e==null,as=e=>typeof e=="function";var bk=e=>{if(e===null||typeof e!="object")return!1;let t=Object.getPrototypeOf(e);return t===Object.prototype||t===null},RE=e=>{if(!bk(e))return!1;let t=e,n=Object.prototype.hasOwnProperty.call(t,"loading")||Object.prototype.hasOwnProperty.call(t,"value")||Object.prototype.hasOwnProperty.call(t,"error"),r=Object.keys(t).length===0;return n||r};function fg(e){return!!e&&(typeof e=="object"||typeof e=="function")&&typeof e.then=="function"}function pg(e){return!!(e&&typeof e=="object"&&"value"in e&&"isLoading"in e&&"error"in e&&"hasValue"in e)}var Ck="@sdux-vault/devtools",Dk="0.9.0";nc(Ck,Dk);var hg=null;function Cg(){return hg||(hg=new gg),hg}var gg=class{#t=new M;constructor(){window.sdux??={},window.sdux.vaultEventBus=this}nextPipeline(t){Je.active&&t&&this.#t.next(t)}pipeline$(){return this.#t.asObservable()}},Xi={Pipeline:"pipeline",System:"system",Unknown:"unknown",User:"ui"},yg=class{sub;events=[];errorCount=0;maxEvents=5e3;sequence=0;lastMonotonicByTrace=new Map;traceRefCount=new Map;lastGlobalTimestamp=0;start(t){let n=Cg();if(!n||typeof n.pipeline$!="function"){console.warn("[SDUX] EventBus not available.");return}this.sub=n.pipeline$().subscribe(r=>{let i=this.enrichEvent(r),o=i.traceId??"__unknown";if(this.events.push(i),this.traceRefCount.set(o,(this.traceRefCount.get(o)??0)+1),this.isErrorEvent(i)&&this.errorCount++,this.events.length>this.maxEvents){let s=this.events.shift();s&&(this.isErrorEvent(s)&&(this.errorCount=Math.max(0,this.errorCount-1)),this.evictTrace(s.traceId??"__unknown"))}t?.()})}stop(){this.sub?.unsubscribe(),this.sub=void 0}clear(){this.events=[],this.errorCount=0,this.sequence=0,this.lastMonotonicByTrace.clear(),this.traceRefCount.clear(),this.lastGlobalTimestamp=0}evictTrace(t){let n=(this.traceRefCount.get(t)??1)-1;n<=0?(this.traceRefCount.delete(t),this.lastMonotonicByTrace.delete(t)):this.traceRefCount.set(t,n)}getEvents(){return[...this.events]}getErrorCount(){return this.errorCount}enrichEvent(t){let n=Date.now(),r=typeof performance<"u"&&performance.now?performance.now():0,i=t.traceId??"__unknown",o=this.lastMonotonicByTrace.get(i),s=typeof o=="number"?r-o:0;s<0&&(s=0),this.lastMonotonicByTrace.set(i,r);let a=this.detectScheduler(n),c=this.detectEventLoopPhase(s),l=this.detectSource(t),u=this.detectSource(t),d=this.hashStack();return $(g({},t),{sequenceNumber:++this.sequence,monotonicTimestamp:r,stageDurationMs:s,stackHash:d,scheduler:a,eventLoopPhase:c,latencyCategory:u,source:l})}detectScheduler(t){let n=t-this.lastGlobalTimestamp;return this.lastGlobalTimestamp=t,n<2?"microtask":n<16?"macrotask":"delayed"}detectEventLoopPhase(t){return t===0?"synchronous":t<2?"microtask":t<16?"macrotask":"blocked"}detectSource(t){switch(t.type){case ct.Controller:return Xi.User;case ct.Stage:return Xi.Pipeline;case ct.Lifecycle:case ct.Conductor:return Xi.System}return Xi.Unknown}hashStack(){try{let t=new Error().stack??"",n=0;for(let r=0;r<t.length;r++)n=(n<<5)-n+t.charCodeAt(r),n|=0;return`h${Math.abs(n)}`}catch{return"h0"}}isErrorEvent(t){return!!(t.error||typeof t.name=="string"&&t.name.includes("fatal"))}},_k=`
## START ENGINEER INSTRUCTIONS
1. Download the SDuX debug JSON file.
2. Upload the file directly to the AI model (do NOT paste contents).
3. Submit this entire prompt alongside the uploaded file.
4. Ensure the AI has access to the attached file before analysis.
5. Share the structured report with your engineering team.
## END ENGINEER INSTRUCTIONS
---

# SDuX AI Assist Prompt

ROLE:
You are a senior distributed-systems observability engineer and performance analyst.

You specialize in:

- Deterministic pipeline tracing
- Event lifecycle diagnostics
- Runtime topology analysis
- Latency decomposition
- Engine configuration audits

You are reviewing a structured SDuX Debug Dump JSON file.

---

## INPUT

The uploaded file is an SDuX Debug Dump JSON file.

You MUST:

- Parse the uploaded JSON file.
- Validate its structure.

Extract the following if present:

Top-level:

- stats
- dump.longTasks
- highResolution
- runtime
- navigation
- registry
- registry.licenseSummary
- licenseSummary
- versions

From stats:

- stats.traces

  #### Trace Latency Metrics

  If stats.traces entries contain the following fields, extract them and treat them as authoritative trace latency metrics:

  - meanStageDuration
  - p95StageDuration
  - maxStageDuration

  These metrics represent aggregated stage latency per trace and MUST be preferred over recomputing latency from raw events.

  If present, they must be used when performing trace-level latency analysis.

  Do NOT recompute these metrics from raw events when they exist.

- stats.eventTypes
- stats.schedulerDistribution
- stats.eventLoopPhaseDistribution
- stats.computeVsIdle
- stats.stageAggregates
- stats.burstAnalysis
- stats.suppressionStats
- stats.pipelineRecursion
- stats.structuralIntegrity
- stats.timingIntegrity

  #### Timestamp Integrity Metrics

  If stats.timingIntegrity exists, extract:

  - timestampCollisionRate
  - worstCollisionTrace
  - collisionsPerTrace

  These metrics indicate timestamp precision limitations or timer batching.

  If timestampCollisionRate exceeds **10%**, explicitly warn that:

  > "Timestamp quantization may affect latency precision in this session."

  Prefer monotonicTimestamp for latency analysis when available.

- stats.longTaskStats

  #### Long Task Summary Metrics

  If stats.longTaskStats exists, extract:

  - count
  - maxDuration

  These metrics preserve long-task signal even when the browser does not retain longtask entries after export.

  Reporting rules:

  - If count === 0:
    State:
    > "No long tasks were recorded in this session."

  - If count > 0:
    State:
    > "Long tasks were recorded in this session, indicating potential main-thread contention."

  Prefer stats.longTaskStats for long-task summary reporting.
  Do NOT infer long tasks from other metrics if longTaskStats is missing.


- stats.diagnosticSummary
- stats.deadlockByTrace
- stats.longestTraceId
- stats.longestTraceDurationMs
- stats.traceFanOut
- stats.stageBottleneck
- stats.stageBottleneckTimeMs
- stats.pipelineFlamegraph
- stats.stackHashCounts
- stats.userLatencyDistribution

  #### User Interaction Latency Metrics

  If stats.userLatencyDistribution exists, extract the latency fields using whichever naming exists:

  Prefer:

  - avgMs
  - p95Ms
  - maxMs

  If those are missing, fall back to:

  - avgUserLatency
  - p95UserLatency
  - maxUserLatency

  These metrics represent **human interaction delay between UI-triggered events** and must NOT be interpreted as pipeline compute latency.

  If present, the report must clearly distinguish:

  - **Pipeline compute latency**
  - **Scheduler delay**
  - **User interaction latency**

  User latency must never be included in stage performance conclusions.


If stats.stageAggregates is undefined, skip stage aggregate analysis.

If "stats.diagnosticSummary" exists, render it at the very top of the report under Executive Summary as a ranked table.  
> If missing, state: "Diagnostic summary not present in this session."

If stats.stateAnalytics exists, extract:

- stateSizePerTrace
- stateSerializationErrors
- stateSerializationErrorMessages
- avgPayloadSize
- repeatedIdenticalStateCount
- largeObjectCount
- deepNestingMaxDepth
- persistPayloadSizeRanking
- stateEntropyScore
- avgStateDiffSize
- maxChurnPerSecond
- avgChurnPerSecond

IMPORTANT:

- State and payload analytics exist ONLY if stats.stateAnalytics exists.
- Payload metrics are emitted under stats.stateAnalytics.
- If stats.stateAnalytics is undefined:
  - Explicitly state: "State telemetry was not recorded for this session."
  - Explicitly state: "Payload telemetry was not recorded for this session."
  - Do NOT infer any state or payload metrics.
- If stats.stateAnalytics exists:
  - Explicitly state: "State telemetry was recorded for this session."
  - Explicitly state: "Payload telemetry was recorded for this session."

Timing rules:

- Prefer event.monotonicTimestamp over event.timestamp.
- Use stageDurationMs for per-stage latency analysis.
- Use sequenceNumber for strict ordering when timestamps collide.
- Use stackHash to group repeated callsites.
  - If stats.stackHashCounts exists, treat it as the authoritative aggregation of stackHash frequencies.
  - Only group raw events by stackHash if stats.stackHashCounts is missing.
- Use scheduler and stats.eventLoopPhaseDistribution to reason about execution phase behavior.
    - If stats.eventLoopPhaseDistribution exists, treat it as the authoritative phase distribution.
    - Only derive phase counts from raw events if stats.eventLoopPhaseDistribution is missing.
- Use source to classify trigger origin (ui / stream / timer / internal).

If the file cannot be parsed, stop and report a structural failure.

STRICT METRIC VALIDATION RULE:

Never assume the existence of any field not explicitly listed in the INPUT extraction rules.

If a metric is not present in the dump, explicitly state:
"Metric not present in this session."

Do NOT estimate, infer, approximate, or fabricate missing metrics.

---

### Metric Schema Anchor (Authoritative)

All metrics referenced in this report must come from the SDuX Debug Dump schema.

The canonical namespaces are:

Top-level namespaces:
- dump.*
- stats.*
- registry.*

Examples:

- dump.longTasks
- dump.runtime
- dump.navigation

- stats.traces
- stats.stageAggregates
- stats.computeVsIdle
- stats.stackHashCounts
- stats.stateAnalytics
- stats.traceFanOut
- stats.burstAnalysis
- stats.schedulerDistribution
- stats.eventLoopPhaseDistribution

- registry.featureCells
- registry.licenseSummary

Rules:

- Only fields within these namespaces may be referenced.
- Do NOT invent alternative field names.
- Do NOT rename metrics.
- Do NOT infer fields that are not present in the dump.
- If a metric is not present, explicitly state:

> "Metric not present in this session."

---

## PRIMARY OBJECTIVES

1. Produce a highly structured, visually clear report.
2. Use tables extensively.
3. Use ASCII bar charts where useful.
4. Include at least one mermaid diagram.
5. Highlight anomalies and outliers.
6. Rank traces by duration.
7. Assess architectural symmetry and balance.
8. Provide performance analysis and interpretation.
9. Evaluate determinism and structural integrity.
10. Include a concise executive summary at the top.

If the events array exceeds 10,000 entries:

- Prioritize aggregated metrics from stats.
- Avoid enumerating raw events.
- Sample only when necessary.
- Focus on distribution, timing, and structural patterns.
- When aggregated metrics exist in "stats", treat them as authoritative and do NOT recompute them from raw events.
- Raw event inspection should only be used for sampling or anomaly illustration, never for recomputing global metrics.

If aggregated metrics exist, prefer:

- stats.stageAggregates
- stats.traces
- stats.schedulerDistribution
- stats.eventLoopPhaseDistribution
- stats.computeVsIdle
- stats.burstAnalysis
- stats.stateAnalytics

---

## OUTPUT STRUCTURE (MANDATORY)

##### Deterministic Output Protocol

The report MUST follow the section order defined in this prompt exactly.
Do NOT rename section headings.
Do NOT insert additional sections not defined in the specification.
Subsections within each section MUST also follow the order defined in this prompt.
Tables MUST include all columns defined in the section schema.
Do NOT omit columns even if values are zero.

### SDuX ENGINE ANALYSIS REPORT

#### Executive Summary

- One-paragraph overview
- System health assessment
- Key performance concerns (if any)
- Structural anomalies (if any)

The Executive Summary MUST prioritize the most critical diagnostic signal detected in the report.

If any of the following metrics exist, surface them in this priority order:

1. stats.diagnosticSummary (if present)
2. stats.stageBottleneck
3. stats.longestTraceId
4. stats.traceFanOut
5. stats.deadlockByTrace

The first applicable signal must be described in the opening sentence of the Executive Summary.

Example format:

> "Primary finding: The pipeline latency is dominated by **<stage name>**, which accounts for the largest share of total compute time."

or

> "Primary finding: Trace **<traceId>** exhibits abnormal fan-out behavior, producing significantly more events than typical traces."

If no critical diagnostic signals are present, summarize overall system health instead.

---

#### Global Event Metrics

| Metric              | Value |
| ------------------- | ----- |
| Total Events        |       |
| Error Events        |       |
| First Timestamp     |       |
| Last Timestamp      |       |
| Total Duration (ms) |       |

ASCII Timeline:
Render a horizontal scale representing totalDurationMs.

---

#### High-Resolution Timing & Timestamp Quantization

##### Timing Sources

| Source                           | Present | Notes                     |
| -------------------------------- | ------- | ------------------------- |
| event.monotonicTimestamp         |         | Preferred for timing math |
| event.timestamp                  |         | Wall-clock; may coalesce  |
| dump.highResolution.timeOrigin   |         |                           |
| dump.highResolution.monotonicNow |         |                           |

##### Quantization / Coalescing Detection

If stats.timingIntegrity exists, treat it as the authoritative source for timestamp collision metrics and do NOT recompute collisions from raw events.

Compute and report:

- % of events that share the same timestamp
- % of events that share the same monotonicTimestamp (if present)
- Number of timestamp collisions per trace
- Worst collision trace ID

| Metric                    | Value |
| ------------------------- | ----- |
| Timestamp collision rate  |       |
| Worst collision trace     |       |
| Collisions in worst trace |       |

Conclusion:

- Timing fidelity: HIGH / MED / LOW
- If LOW: explicitly warn that stage durations may be under-resolved.

---

#### Event Type Distribution

Table sorted by frequency (descending).

Include ALL event types unless there are more than 25 types.
If more than 25 exist, display the top 25 and summarize the remainder.


| Event Type | Count | % of Total |
| ---------- | ----- | ---------- |

ASCII Bar Chart (proportional to count):

controller:start:attempt \u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588  
...

Highlight:

- Symmetry across lifecycle stages
- Missing expected stages
- Irregular or skewed distribution

---

#### Stage Aggregates (Per-Event stageDurationMs)

If events include latencyCategory fields:

- Only stages where latencyCategory = "pipeline" should contribute to stage performance analysis.
- latencyCategory = "user" must be interpreted as human interaction delay.
- latencyCategory = "scheduler" represents event loop scheduling delay.

Note:
The SDuX recorder uses **"pipeline"** as the compute-stage label.
Any references to **"compute"** should be interpreted as **"pipeline"**.

User latency must never be interpreted as pipeline compute time.

Use stats.stageAggregates.  
If stats.stageAggregates is undefined, skip this section.

Table sorted by Avg (descending):

| Stage (event.type) | Count | Avg (ms) | P95 (ms) | Max (ms) | Min (ms) | Total (ms) |
| ------------------ | ----- | -------- | -------- | -------- | -------- | ---------- |

If P95 is not provided in stats.stageAggregates and raw events are available, compute it from stageDurationMs grouped by event.type.

ASCII Bars (Avg duration):

stage:start:persist \u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588  
stage:start:compute-merge \u2588\u2588\u2588\u2588\u2588\u2588\u2588 
...

Highlight:

- Top 5 most expensive stages
- Stages with high variance (Max \u226B Avg)
- Stages with frequent Min = 0 (possible timestamp quantization)

###### Latency Root-Cause Detection (Required)

Using stats.stageAggregates, determine whether a small number of stages dominate total compute time.

Compute:

- Percentage of total stage time contributed by the top 3 stages.
- Whether the top stage exceeds 30\u201340% of total stage time.

If a small number of stages dominate:

State:

> "Pipeline latency is dominated by a small number of stages."

Then explicitly identify:

- The dominant stage(s)
- Their average and P95 durations
- Their contribution to total stage time

If stage durations are evenly distributed:

State:

> "Pipeline latency appears evenly distributed across stages."

Do NOT infer bottlenecks without supporting aggregate metrics.

---

#### Pipeline Flamegraph (Trace Stage Composition)

Render only if stats.pipelineFlamegraph exists.

Use:

stats.pipelineFlamegraph

Each entry represents the aggregated stage timing breakdown for a trace.

Render table:

| Trace ID | Stage | Duration (ms) |

Expand each trace into multiple rows.

Example structure:

| Trace ID | Stage | Duration (ms) |
|---------|------|---------------|
| T1 | controller:start | 12 |
| T1 | state:update | 8 |
| T1 | persist | 20 |

###### Interpretation

- Identify which stages dominate execution within each trace.
- Compare slow traces against faster traces to identify stage imbalance.
- Use stage duration composition to identify architectural hotspots.

Do NOT recompute flamegraph data if the aggregated metric is present.

---

#### Flamegraph Latency Decomposition (Required)

Render this section only if:

stats.pipelineFlamegraph exists.

Use:

stats.pipelineFlamegraph

Each entry represents the **aggregated stage duration breakdown for a single trace**.

---

##### Per-Trace Stage Composition

For each trace:

Compute:

| Trace ID | Total Stage Time | Dominant Stage | Dominant Stage % |

Rules:

- Total Stage Time = sum(stage.durationMs)
- Dominant Stage = stage with the largest duration
- Dominant Stage % = (stage.durationMs / totalTraceStageTime) \xD7 100

Sort traces by **Total Stage Time (descending)**.

---

##### Stage Dominance Analysis

Determine whether latency is concentrated in specific stages.

Compute across all traces:

| Stage | Total Time | % of Total Pipeline Time |

Rules:

- Total Time = sum(durationMs across all traces)
- % = stageTotal / sum(all stage durations)

Sort by **Total Time descending**.

---

##### Latency Dominance Classification

Based on the stage dominance distribution classify the pipeline:

| Condition | Interpretation |
|----------|---------------|
| One stage > 50% | Severe stage bottleneck |
| Top 2 stages > 70% | Concentrated latency |
| Top 3 stages > 80% | Moderate stage concentration |
| Even distribution | Balanced pipeline |

---

##### Trace Imbalance Detection

Identify traces where:

Dominant Stage % > 60%

Render table:

| Trace ID | Dominant Stage | Dominant % | Total Stage Time |

These traces indicate **stage imbalance** where a single stage dominates execution.

---

##### Engineering Interpretation

Explain:

- Which stage contributes the largest share of total pipeline latency.
- Whether the dominant stage appears consistently across traces.
- Whether slow traces share the same dominant stage.
- Whether slow traces are caused by:
  - pipeline stages
  - persistence stages
  - controller emissions
  - merge or reconciliation stages

---

##### Architectural Insight

Evaluate whether latency arises from:

| Cause | Evidence |
|------|---------|
| Single-stage bottleneck | dominant stage > 50% |
| Cross-stage pipeline overhead | evenly distributed latency |
| Persistence pressure | persist-related stages dominate |
| Controller emission pressure | controller stages dominate |

---

##### Output Summary

Explicitly state:

> "Pipeline latency is primarily driven by: **<stage name>**"

or

> "Pipeline latency is evenly distributed across stages."

Do NOT infer stage-level causality without supporting stage duration metrics.

---


#### State Analytics & Integrity

##### Availability (MANDATORY)

If stats.stateAnalytics is undefined:

State:

> "State telemetry was not recorded for this session."
> "Payload telemetry was not recorded for this session."

Do NOT render any additional state or payload analysis sections.  
Stop this entire section.

If stats.stateAnalytics exists, continue.

---

##### State Volume & Size

| Metric                  | Value                                 |
| ----------------------- | ------------------------------------- |
| Trace Count With State  | count(keys(stateSizePerTrace))        |
| Avg Payload Size        | stats.stateAnalytics.avgPayloadSize   |
| Avg State Diff Size     | stats.stateAnalytics.avgStateDiffSize |
| Persist Payload Entries | length of persistPayloadSizeRanking   |

Interpretation:

- High Avg State Diff Size \u2192 possible large merges or inefficient updates.
- Large Persist Payload Entries \u2192 potential storage bottleneck.
- If Avg Payload Size = 0 AND persistPayloadSizeRanking is empty:

State:

> "Payload analytics appear empty or not captured in this session."

Do NOT conclude payloads are small without explicit evidence.

---

##### State Churn & Mutation Velocity

| Metric               | Value                                  |
| -------------------- | -------------------------------------- |
| Max Churn Per Second | stats.stateAnalytics.maxChurnPerSecond |
| Avg Churn Per Second | stats.stateAnalytics.avgChurnPerSecond |

###### Interpretation

- High max churn \u2192 burst mutation pattern.
- High sustained avg churn \u2192 potential render pressure.
- Correlate with trace durations and blocked eventLoopPhase if relevant.

---

##### State Structure Quality

| Metric                    | Value                                            |
| ------------------------- | ------------------------------------------------ |
| Deepest Nesting Depth     | stats.stateAnalytics.deepNestingMaxDepth         |
| Large Object Count        | stats.stateAnalytics.largeObjectCount            |
| Repeated Identical States | stats.stateAnalytics.repeatedIdenticalStateCount |
| Entropy Score             | stats.stateAnalytics.stateEntropyScore           |

###### Interpretation

- Nesting depth > 6\u20138 \u2192 likely normalization concern.
- largeObjectCount > 0 \u2192 potential memory or serialization cost risk.
- High repeatedIdenticalStateCount \u2192 wasted updates.
- High entropy \u2192 inconsistent state shape across traces.

###### Do NOT

- Inspect raw state objects.
- Output serialized state.
- Infer structure beyond aggregate metrics.

---

##### State Serialization Failures (Critical)

If stats.stateAnalytics.stateSerializationErrors === 0:

State:

> "No state serialization failures detected."

Stop this section.
Do NOT render any tables.

If stats.stateAnalytics.stateSerializationErrors > 0:

Render the serialization summary and error breakdown tables.

---

###### Summary

| Metric                     | Value                                                             |
| -------------------------- | ----------------------------------------------------------------- |
| Total Serialization Errors | stats.stateAnalytics.stateSerializationErrors                     |
| Unique Error Messages      | count(keys(stats.stateAnalytics.stateSerializationErrorMessages)) |

---

##### Error Message Breakdown

Use:

stats.stateAnalytics.stateSerializationErrorMessages

Render a table sorted by count (descending):

| Error Message | Count | % of Total Errors |

Percentage rule:

- % = (Count / stats.stateAnalytics.stateSerializationErrors) \xD7 100
- If stats.stateAnalytics.stateSerializationErrors === 0, omit the % column entirely.

---

##### Interpretation (Required)

After the table, analyze:

- Whether a single error message dominates.
- Whether multiple distinct failure types are present.
- Whether the pattern suggests structural state design issues.

Likely root causes may include:

- Circular references
- BigInt values
- Functions stored inside state
- DOM nodes in state
- Class instances with cyclic graphs
- Reactive objects (Subjects, Observables, Subscriptions)
- Extremely deep object graphs

###### Do NOT

- Attempt per-event attribution.
- Attempt trace-level attribution.
- Infer correlations not explicitly derivable from aggregate metrics.
- Fabricate relationships not present in the dump.

---

##### State Per Trace Distribution

Use:

stats.stateAnalytics.stateSizePerTrace

Render a table sorted by total state size (descending):

| Trace ID | Total State Size | % of Total State Volume |

Percentage rule:

- Total State Volume = sum(stats.stateAnalytics.stateSizePerTrace values).
- % = (Trace State Size / sum(all stateSizePerTrace values)) \xD7 100
- If total state volume is 0, omit the % column.

---

###### Interpretation

- Determine whether a small number of traces dominate total state volume.
- Identify any trace contributing disproportionate mutation volume.
- Assess whether state mutation is evenly distributed across traces.

---

###### Explicit Guardrails

- Do NOT print raw state objects.
- Do NOT infer missing metrics.
- Do NOT assume payload/state presence unless confirmed.
- Do NOT fabricate trace-level serialization mapping.
- Only use aggregate metrics available in stats.stateAnalytics.

---

#### Payload Analytics & Volume Impact

##### Availability

If stats.stateAnalytics is undefined:

State:

> "Payload telemetry was not recorded for this session."

Do NOT render any additional payload subsections.
Stop this entire section.

If stats.stateAnalytics exists, continue.

---

##### Payload Volume Overview

Use:

stats.stateAnalytics

| Metric                  | Value                                                    |
| ----------------------- | -------------------------------------------------------- |
| Avg Payload Size        | stats.stateAnalytics.avgPayloadSize                      |
| Large Object Count      | stats.stateAnalytics.largeObjectCount                    |
| Persist Payload Entries | length of stats.stateAnalytics.persistPayloadSizeRanking |

###### Interpretation

- Assess whether avgPayloadSize indicates consistently small or materially large payloads.
- Evaluate whether largeObjectCount suggests serialization or memory pressure risk.
- Determine whether persistPayloadSizeRanking implies concentration of payload volume in specific traces.
- Do NOT infer event-level payload distribution unless directly derivable from raw events.

---

##### Persist Payload Ranking (Top 5)

Use:

stats.stateAnalytics.persistPayloadSizeRanking

Render table sorted by size (descending):

| Trace ID | Payload Size |

Do NOT fabricate event types if not directly present in the ranking data.

###### Interpretation

- Determine whether large persists cluster around specific traces.
- Assess correlation between large payload traces and long trace durations.
- Evaluate whether persistence may be a bottleneck.

---

##### Payload Distribution Pattern

Perform this analysis only if payload data can be directly derived.

1. Identify event types carrying payloads only if raw events allow counting where:
   "'payload' in event"

2. Compute approximate percentage of events containing payload only if derivable from raw events.

If stats.stateAnalytics is undefined:

State:

> "Payload telemetry was not recorded for this session."

If stats.stateAnalytics is present BUT:

- stats.stateAnalytics.avgPayloadSize === 0
- stats.stateAnalytics.persistPayloadSizeRanking is empty

State:

> "Payload analytics appear empty or not captured in this session."

Do NOT conclude payloads are small without explicit evidence.

3. Correlate large payload traces (if present) with:

- Long stageDurationMs
- Blocked eventLoopPhase
- High p95 stages

Only use aggregate metrics or directly derivable values.

Render table if derivable:

| Event Type | Count with Payload | Avg Payload Size |

---

##### Large Payload Risk Detection

If stats.stateAnalytics.largeObjectCount > 0:

Analyze using aggregate metrics only.

Assess whether large payloads are likely associated with:

- Persist-related stages
- Merge/compute stages
- Controller emissions
- Error-handling paths

Do NOT fabricate per-event attribution unless directly derivable from raw events.

###### Likely Causes

- Emitting full state instead of diffs
- Unnormalized nested structures
- Redundant array/object copies
- Large collections repeatedly emitted

###### Engineering Recommendations (3\u20135)

- Emit diffs instead of full state objects
- Normalize large collections into ID maps
- Avoid re-emitting unchanged data
- Persist only deltas where possible
- Consider compression for large persistence payloads (if persistence-bound)

If stats.stateAnalytics.largeObjectCount === 0:

State:

> "No large payload anomalies detected."

---

##### Payload vs State Comparison

Only render if stats.stateAnalytics exists.

###### Analysis

Evaluate:

- Whether avgPayloadSize is proportional to avgStateDiffSize
- Whether payload sizes exceed resulting state changes
- Whether state mutation is small but payload size is large (anti-pattern)

If payload telemetry exists but state telemetry does not:
Limit analysis strictly to payload-level metrics.

If stats.stateAnalytics is undefined:

State:

> "State and payload telemetry were not recorded for this session."

---

#### Scheduler & Event Loop Phase (Microtask / Macrotask / Delayed)

Render this section only if scheduling data exists.

Use:

- stats.schedulerDistribution
- stats.eventLoopPhaseDistribution
- event.scheduler (raw events only if aggregated metrics are missing)

Priority Rules:

1. If stats.eventLoopPhaseDistribution exists, treat it as authoritative.
2. Only derive phase counts from raw events if the aggregated metric is missing.
3. Never overwrite aggregated metrics with recomputed values.

---

##### Scheduler Distribution

Use stats.schedulerDistribution.

| Scheduler | Count | % |

Compute % relative to total scheduled events.

---

##### Event Loop Phase Distribution

Prefer stats.eventLoopPhaseDistribution if present.

If stats.eventLoopPhaseDistribution exists, render the table using that data.

Only compute phase counts from raw events if the aggregated metric is missing.

| Phase | Count | % |

Compute % relative to total events containing eventLoopPhase.

---
##### Scheduler \xD7 Phase Cross-Tab (Optional)

Only render if both scheduler and eventLoopPhase are derivable.

| Scheduler  Phase | synchronous | microtask | macrotask | delayed | blocked |

Do NOT fabricate phases that do not appear in the dump.

---

###### Interpretation

- Assess evidence of microtask batching.
- Evaluate macrotask alignment with frame boundaries.
- Identify blocked phases indicating potential main-thread contention.
- If blocked phases exceed 5\u201310% of events, flag potential main-thread contention.

---

#### User Interaction Latency

Render this section only if stats.userLatencyDistribution exists.

Use:

stats.userLatencyDistribution

| Metric | Value |
|------|------|
| Avg User Latency | stats.userLatencyDistribution.avgMs OR stats.userLatencyDistribution.avgUserLatency |
| P95 User Latency | stats.userLatencyDistribution.p95Ms OR stats.userLatencyDistribution.p95UserLatency |
| Max User Latency | stats.userLatencyDistribution.maxMs OR stats.userLatencyDistribution.maxUserLatency |

###### Interpretation

User latency represents **human interaction delay between UI-triggered events**.

Examples include:

- time between button clicks
- time spent reading UI before the next action
- developer pause during debugging sessions

This latency **must not be interpreted as pipeline performance cost**.

If user latency significantly exceeds pipeline compute latency:

State:

> "Observed latency is primarily driven by user interaction delays rather than pipeline execution."

---

#### Burst & Frame Pressure (Burst Analysis)

Render only if stats.burstAnalysis exists.

Use:

stats.burstAnalysis.maxEventsPerFrame

| Metric                             | Value                                 |
| ---------------------------------- | ------------------------------------- |
| Max Events Per Frame (16ms bucket) | stats.burstAnalysis.maxEventsPerFrame |

---

##### Frame Window Reconstruction (Optional)

If timestamps are available:

- Bucket events into 16ms windows (prefer monotonicTimestamp).
- Identify top 10 busiest windows.

| Frame Window (start\u2013end ms) | Event Count | Top Trace IDs | Top Event Types |

Do NOT fabricate window boundaries if timestamps are unavailable.

---

###### Conclusion

Classify frame pressure risk:

- LOW
- MED
- HIGH

Justify classification using observed burst metrics.

---

#### Trace Fan-Out Detection

Render only if stats.traceFanOut exists.

Use:

stats.traceFanOut

Fan-out threshold definition:

A trace is considered a fan-out explosion when it produces an unusually large number of events relative to typical traces.

Render table:

| Trace ID | Event Count |

Sort by Event Count (descending).

If stats.traceFanOut is empty:

State:

> "No trace fan-out anomalies detected."

###### Interpretation

Fan-out explosions may indicate:

- runaway observable pipelines
- recursive event emissions
- feedback loops between behaviors/controllers
- excessive branching inside event handlers

Cross-reference these traces with:

- longestTraceDurationMs
- burstAnalysis.maxEventsPerFrame
- blocked eventLoopPhase

---

#### Pipeline Cycle Detection (Feedback Loop Analysis)

This section attempts to detect **pipeline feedback loops**, where stages repeatedly trigger each other and produce runaway event chains.

Render only if the following metrics exist:

- stats.traceFanOut
- stats.traces
- stats.eventTypes

---

##### Cycle Detection Signals

Evaluate the following indicators:

| Signal | Evidence |
|------|---------|
| Fan-out explosion | traceFanOut contains entries |
| High event counts per trace | traces[traceId].eventCount unusually large |
| Burst pressure | burstAnalysis.maxEventsPerFrame unusually high |
| Repeating event types | eventTypes distribution dominated by small subset |
| Recursion pattern detected | stats.pipelineRecursion.detected |

If **two or more signals occur simultaneously**, flag a **potential pipeline cycle**.

---

If stats.pipelineRecursion.detected is true:

Render:

| Trace ID | Repeating Stage Pattern | Repetition Count |
|----------|------------------------|------------------|
| stats.pipelineRecursion.traceId | stats.pipelineRecursion.repeatingPattern | stats.pipelineRecursion.repetitionCount |

Interpretation:

A repeating stage pattern indicates **pipeline recursion**, where stages repeatedly trigger each other.

This is commonly caused by:

- controller self-triggering
- observable loops
- state feedback cycles
- missing termination conditions

This condition often produces:

- trace fan-out explosions
- repeated stage sequences
- runaway pipelines.

---

##### Candidate Cycle Traces

Use:

stats.traceFanOut

Render table:

| Trace ID | Event Count | Duration (ms) |

Sort by Event Count (descending).

These traces may represent **feedback loops** or **runaway pipelines**.

---

##### Repeating Stage Pattern Detection

Use:

stats.eventTypes

Identify whether a small number of event types dominate the distribution.

If the **top 3 event types exceed 60% of total events**, state:

> "Event distribution suggests a repeating stage pattern, which may indicate a pipeline cycle."

---

##### Cycle Risk Classification

Classify risk level using the following rules:

| Condition | Risk |
|----------|------|
| Fan-out traces exist + high burstAnalysis.maxEventsPerFrame | HIGH |
| Fan-out traces exist | MED |
| Repeating stage dominance only | LOW |
| No indicators | NONE |

---

##### Interpretation

Pipeline cycles typically arise from:

- controller emissions triggering themselves
- observable chains re-emitting upstream events
- recursive pipeline stage transitions
- missing termination conditions

These conditions can cause:

- runaway event counts
- frame pressure
- state churn
- UI lockups.

Do NOT declare a confirmed cycle unless **multiple independent signals** support the conclusion.

Instead use language such as:

> "Metrics suggest a possible pipeline feedback loop."

or

> "No pipeline cycle indicators detected."

---

#### Jank & Long Task Correlation

Render only if dump.longTasks exists and contains entries.

| # | Start (ms) | Duration (ms) | Over 50ms? |

If stats.longTaskStats exists, always render a short summary table before any correlation logic:

If stats.longTaskStats exists, render:

| Metric | Value |
| ------ | ----- |
| Long Task Count | stats.longTaskStats.count |
| Max Long Task (ms) | stats.longTaskStats.maxDuration |

This summary must be rendered even if dump.longTasks entries are empty or unavailable.
Do NOT infer long tasks if stats.longTaskStats is missing.

---

##### Correlation Analysis (Aggregate Only)

If monotonic timestamps are available:

- Identify traces overlapping long task windows.
- Rank top 3 correlated traces by overlap duration.

Do NOT infer correlation if timestamps are insufficient.

If dump.longTasks is empty or unavailable:

State:

> "Long Task API not available or no long tasks detected in this session."

---

#### Trace Analysis

Use stats.traces.

##### Trace Latency Ranking (P95 Analysis)

If the following metrics exist within stats.traces entries:

- meanStageDuration
- p95StageDuration
- maxStageDuration

Render the table:

| Rank | Trace ID | Event Count | Duration (ms) | Mean Stage (ms) | P95 Stage (ms) | Max Stage (ms) |

Sort the table by **P95 Stage (ms) descending**.

Interpretation rules:

- The trace with the highest **P95 Stage Duration** should be considered the most unstable pipeline execution.
- High **Mean Stage Duration** indicates consistently slow stages.
- High **P95 Stage Duration** indicates latency spikes inside a trace.
- High **Max Stage Duration** indicates a single stage outlier or blocking operation.

If these metrics exist, **do NOT recompute stage latency from raw events**.  
Treat the aggregated trace metrics as authoritative.

Render table sorted by duration (descending):

| Trace ID | Event Count | Duration (ms) |

---

##### Trace Latency Metrics (If Present)

If stats.traces entries include the following fields:

- meanStageDuration
- p95StageDuration
- maxStageDuration

Render the table:

| Trace ID | Event Count | Duration (ms) | Mean Stage (ms) | P95 Stage (ms) | Max Stage (ms) |

Sort by **Duration (ms)** descending.

Interpretation:

- High **Mean Stage Duration** indicates consistently slow pipeline stages.
- High **P95 Stage Duration** indicates latency spikes within traces.
- High **Max Stage Duration** indicates single-stage outliers or blocking operations.

###### Small Trace Guardrail

If a trace contains fewer than **3 stage durations**, treat the trace as **statistically insufficient for latency distribution analysis**.

In this case:

- Do NOT interpret meanStageDuration or p95StageDuration.
- Only report durationMs and eventCount.

State:

> "Trace contains too few stage samples for reliable latency distribution analysis."

If these metrics exist, prefer them over recomputing stage latency from raw events.

---

##### Longest Trace (Aggregate)

Render only if stats.longestTraceId exists.

| Metric | Value |
|------|------|
| Longest Trace ID | stats.longestTraceId |
| Duration (ms) | stats.longestTraceDurationMs |

Interpretation:

- This trace represents the longest pipeline execution in the session.
- Compare its duration against median and cluster distribution.
- If the longest trace exceeds 2\xD7 median duration, flag as a potential outlier.

Do NOT recompute this value if the metric already exists in stats.

---

##### Per-Trace Metrics (If Derivable)

If stageDurationMs exists:

| Trace ID | Duration | Mean stageDuration | P95 stageDuration | Max stageDuration | Timestamp Collisions | Out-of-Order Count |

Compute values only if derivable from dump data.

---

##### Ordering Rules

- Order events within a trace by sequenceNumber if present.
- Otherwise order by (monotonicTimestamp, timestamp).
- Detect out-of-order events using monotonic deltas.
- Use stats.structuralIntegrity if available.

---

##### Slowest Trace Breakdown

Explain:

- Relative duration vs median trace.
- Variance from cluster average.
- Potential architectural or scheduling causes.

Do NOT fabricate causal explanations not supported by metrics.

---

#### Trace Duration Visualization

Render only if trace duration data is available.

Produce an ASCII bar graph sorted by duration (descending):

Trace ID Duration
ABC123 \u2588\u2588\u2588\u2588\u2588\u2588\u2588
DEF456 \u2588\u2588\u2588\u2588
...

Scale bars proportionally relative to the longest trace.

---

##### Mermaid Visualization

Render this section only if trace duration data is available.

The Mermaid chart MUST be wrapped in a fenced code block exactly as shown below.

Required format:

\`\`\`mermaid
bar
title Trace Duration Comparison
x-axis Trace ID
y-axis Duration (ms)
<TRACE_ID>: <DURATION>
\`\`\`

Rules:

- Replace placeholders with actual trace IDs and corresponding duration values from the dump.
- Do NOT fabricate sample IDs or durations.
- If fewer than two traces exist, omit the Mermaid chart.
- Use the exact \`\`\`mermaid fence (no quotes, no alternative fencing).
- Do NOT omit the \`\`\`mermaid code fence.
- Do NOT include explanatory text inside the Mermaid block.

---

#### Error Analysis

Use stats.errorEvents if available.

If stats.errorEvents === 0:

State:

> "No error stage transitions detected."

Stop this section.

---

If stats.errorEvents > 0:

##### Error Distribution by Trace

Group errors by trace using aggregate data only.

| Trace ID | Error Count | First Error Timestamp |

- Identify the earliest error timestamp (prefer monotonicTimestamp).
- Do NOT fabricate per-event details not derivable from the dump.

###### Interpretation

- Determine whether errors cluster within specific traces.
- Assess whether errors occur early (initialization) or late (persistence/cleanup).
- Avoid causal speculation unless supported by metrics.

---

#### Registry Analysis

If registry is undefined:

State:

> "Registry snapshot was not included in this dump."

Stop this section.

---

If registry exists:

##### Feature Cell Overview

Use:

registry.featureCells

| Feature Cell | Behaviors Count | Controllers Count |

- Feature Cell = featureCells[i].key (or best identifier present)
- Behaviors Count = length of featureCells[i].behaviors (if present)
- Controllers Count = length of featureCells[i].controllers (if present)

Do NOT assume license or critical flags unless explicitly present.

###### Interpretation

- Identify unusually high behavior/controller counts.
- Detect missing expected registrations.
- Highlight configuration drift only if directly observable.

---

##### Behavior Breakdown

Render only if behaviors exist within:

registry.featureCells[].behaviors

| Behavior Key | Type | Additional Flags (if present) |

Rules:

- Behavior Key = behavior.key (or best identifier available).
- Type = behavior.type if present.
- Additional Flags = include only fields that explicitly exist in the dump.
- Do NOT assume "critical", "license", or other flags unless present.

Do NOT fabricate missing fields.

---

##### Controller Breakdown

Render only if controllers exist within:

registry.featureCells[].controllers

| Controller Key | Type | Additional Flags (if present) |

Rules:

- Controller Key = controller.key (or best identifier available).
- Type = controller.type if present.
- Additional Flags = include only fields explicitly present.
- Do NOT assume "critical", "license", or other metadata unless present.

Do NOT fabricate missing fields.

---

###### Interpretation

Assess:

- Whether any feature cell has unusually high behavior or controller counts.
- Whether expected behaviors/controllers appear absent.
- Whether configuration drift is observable from registration imbalance.
- Licensing signals only if explicitly present in the dump.

Do NOT infer licensing state, criticality, or enforcement rules unless directly derivable from registry data.

---

#### License Summary

Render only if licensing information is explicitly present in the dump.

Canonical licensing field:

- registry.licenseSummary

This field represents the aggregated licensing status for the session.
If registry.licenseSummary exists, use it as the authoritative licensing metric.

If registry.licenseSummary is undefined:

State:

> "No licensing data was included in this dump."

Stop this section.

---

If licensing data exists:

| License State | Count |

Only use license states explicitly present in the dump.
Do NOT infer licensing status.

###### Commentary

Assess:

- Whether all components appear fully licensed.
- Whether any license states indicate pending or revoked conditions.
- Whether any licensing state suggests potential runtime risk.

Do NOT speculate beyond explicit license fields.

---

#### Determinism & Structural Integrity Analysis

Use stats.structuralIntegrity if present.

Evaluate:

- Consistent event counts per trace.
- Symmetric lifecycle transitions.
- Missing expected transitions.
- Duplicate stage occurrences.
- Cross-trace bleed indicators.
- Out-of-order timestamps.

###### Trace Structural Symmetry Check

Evaluate whether traces exhibit consistent stage lifecycles.

Indicators of structural imbalance:

- Missing expected terminal stages
- Traces with unusually short event counts
- Traces with unusually long event counts
- Repeated stage sequences within a trace

If a small subset of traces deviates significantly from the typical stage lifecycle, state:

> "Trace lifecycle asymmetry detected. Some traces exhibit structural deviations from the typical pipeline flow."

###### Nondeterminism Detection (Required)

Use the following signals:

- stats.structuralIntegrity.duplicateTraceCount
- stats.structuralIntegrity.outOfOrderCount
- sequenceNumber ordering
- monotonicTimestamp ordering

If duplicateTraceCount > 0:

State:

> "Duplicate trace identifiers detected. This may indicate cross-trace bleed or reused trace IDs."

If outOfOrderCount > 0:

State:

> "Out-of-order event timestamps detected. This may indicate race conditions or asynchronous reordering."

If both duplicateTraceCount === 0 AND outOfOrderCount === 0:

State:

> "No nondeterministic execution indicators detected."

Do NOT infer nondeterminism unless these signals are present.

If stats.structuralIntegrity exists:

- duplicateTraceCount
- outOfOrderCount

Also evaluate if derivable:

- Timestamp collisions per trace.
- Idle gaps inside traces using monotonic deltas.
- stageDurationMs outliers (spikes relative to average).

---

###### Deterministic Integrity Rating

Explicitly state one of:

- PASS
- WARN
- FAIL

Justify rating strictly using observable metrics.
Do NOT speculate beyond measurable indicators.

---

#### Pipeline Deadlock Detection

Render only if stats.deadlockByTrace exists.

Use:

stats.deadlockByTrace

Deadlock heuristic definition:

A trace may be considered deadlocked when:

- trace.durationMs exceeds 2000 ms
- AND trace.eventCount < 3
- indicating stalled or incomplete pipeline execution.

Render table:

| Trace ID | Deadlock Suspected |
|----------|--------------------|

Include only traces where value = true.

If none are true:

State:

> "No potential pipeline deadlocks detected."

###### Interpretation

Deadlocks may indicate:

- incomplete stage transitions
- aborted pipelines
- missing terminal events
- external cancellation
- scheduler starvation

---

#### Latency Observations

Use stats.traces and stats.computeVsIdle if present.

If stats.computeVsIdle is undefined:

State:

> "Compute vs idle telemetry was not recorded for this session."

Do NOT estimate compute ratios without explicit metrics.

Evaluate:

- Fastest trace duration.
- Slowest trace duration.
- Median trace duration.
- Standard deviation estimate (if derivable).
- Whether trace durations are tightly clustered or widely dispersed.

If stats.computeVsIdle exists:

| Metric                   | Value                                 |
| ------------------------ | ------------------------------------- |
| Total Compute Time (ms)  | stats.computeVsIdle.totalComputeTime  |
| Estimated Idle Time (ms) | stats.computeVsIdle.estimatedIdleTime |
| Compute Ratio            | stats.computeVsIdle.computeRatio      |

##### Trace Latency Hotspot Detection

If trace latency metrics exist:

Use:

- stats.traces[*].meanStageDuration
- stats.traces[*].p95StageDuration
- stats.traces[*].maxStageDuration

Identify traces where:

- p95StageDuration is significantly larger than meanStageDuration
- maxStageDuration is an outlier relative to other traces

Render table:

| Trace ID | Mean Stage | P95 Stage | Max Stage | Duration |

These traces indicate **latency hotspots** where individual stages may be blocking or performing expensive operations.

Interpretation:

- Mean \u2248 P95 \u2192 stable stage performance
- P95 \u226B Mean \u2192 intermittent latency spikes
- Max \u226B P95 \u2192 single-stage outlier

###### User Interaction Dominated Traces

If stats.userLatencyDistribution exists, evaluate whether slow traces may be dominated by **user interaction delay rather than pipeline execution**.

Heuristic:

If:

- trace.durationMs is significantly larger than meanStageDuration \xD7 eventCount
- AND (stats.userLatencyDistribution.avgMs OR stats.userLatencyDistribution.avgUserLatency) 
is high relative to stage durations

Then interpret the trace as **user interaction dominated latency**.

State:

> "Trace latency appears dominated by user interaction delay rather than pipeline execution."

In this case:

- Do NOT classify the trace as a performance bottleneck.
- Do NOT attribute the latency to slow pipeline stages.

Instead classify the trace as **UI interaction latency**.

This commonly occurs during development sessions where engineers pause between actions.

---

###### Compute vs Idle Interpretation

Using stats.computeVsIdle.computeRatio classify the pipeline workload:

| Compute Ratio | Interpretation |
|---------------|---------------|
| > 0.80 | CPU-bound pipeline |
| 0.40\u20130.80 | Mixed compute + scheduling |
| < 0.40 | Scheduling / IO bound |
| ~1.0 | Continuous compute workload |

Also evaluate:

- Whether estimatedIdleTimeMs indicates burst workloads.
- Whether high compute ratios correlate with slow stages.

###### Excellent Pipeline Performance Detection

If the following conditions are true:

- stats.computeVsIdle.computeRatio < 0.30
- Average stageDurationMs from stats.stageAggregates is < 5ms
- No stage dominates more than 40% of total stage time

Then explicitly state:

> "Pipeline execution performance appears excellent. Observed latency is likely caused by external factors such as user interaction delays, rendering, network activity, or debugging pauses rather than SDuX pipeline execution."

---

#### Primary Performance Bottleneck Detection (Required)

Determine the single most significant performance bottleneck using the following priority order:

1. Highest Avg stageDurationMs from stats.stageAggregates
2. Highest P95 stageDurationMs from stats.stageAggregates
3. Longest trace duration from stats.traces
4. Evidence of blocked eventLoopPhase
5. Highest burstAnalysis.maxEventsPerFrame
6. Long Task overlap if dump.longTasks exists

Use whichever signal provides the strongest evidence.

Additional Bottleneck Signal:

If stats.traces[*].p95StageDuration exists, treat the trace with the highest p95StageDuration as a potential bottleneck candidate.

---

##### Bottleneck Candidate Table

| Candidate Type | Identifier | Evidence |
|----------------|-----------|----------|
| Slowest Stage  |           | Avg / P95 duration |
| Slowest Trace  |           | Duration (ms) |
| Frame Pressure |           | Max events per frame |
| Main Thread Block |       | eventLoopPhase = blocked |
| Long Task |                | Duration |

Populate only rows that are supported by dump metrics.

If stats.stageBottleneck exists:

Use it as the primary bottleneck candidate.

| Candidate Type | Identifier | Evidence |
|----------------|-----------|----------|
| Stage Bottleneck | stats.stageBottleneck | Total stage compute time = stats.stageBottleneckTimeMs |

This metric represents the stage responsible for the largest share of total pipeline compute time.

Prefer this metric over recomputed bottleneck inference when available.

---

##### Final Bottleneck Determination

Explicitly declare:

> **Primary Bottleneck: <stage / trace / scheduling / frame pressure / long task>**

Then explain **why it dominates system latency** using the observed metrics.

If no strong bottleneck signal exists:

State:

> "No dominant performance bottleneck detected. Latency appears evenly distributed."

Do NOT fabricate bottlenecks that are not supported by metrics.

---

###### Interpretation

Assess:

- Whether the session is dominated by idle gaps between traces.
- Whether compute is tightly clustered but bursty.
- Whether behavior appears CPU-bound or IO-bound (only if supported by metrics).

Do NOT infer bottlenecks without supporting data.

---

#### Bottleneck Fix Strategy

Generate a short engineering strategy to address the detected bottleneck.

Use the previously determined **Primary Bottleneck**.

Render:

| Bottleneck Type | Likely Cause | Recommended Fix |
|-----------------|-------------|----------------|
| Stage Bottleneck | compute-heavy stage | reduce stage complexity or split stage |
| Persistence Bottleneck | large payload or persistence latency | persist deltas instead of full state |
| Scheduling Bottleneck | heavy microtask/macrotask churn | debounce or batch event emissions |
| Fan-Out Explosion | recursive emissions | add termination guards or deduplicate events |
| Deadlock | stalled pipeline | verify terminal stage execution |

If the primary bottleneck was determined earlier, provide **2\u20134 concrete engineering actions**.

Example:

- Split "state:update" into smaller stages.
- Emit diffs instead of full state payloads.
- Introduce event deduplication for repeated controller emissions.
- Batch observable emissions using scheduler control.

If no bottleneck was detected:

State:

> "No clear remediation strategy required; pipeline latency appears evenly distributed."

---

#### Architectural Observations

Provide analysis based strictly on observable metrics.

Assess:

- Pipeline symmetry across traces.
- Stage ordering consistency.
- Controller execution patterns.
- Core state lifecycle cadence.
- Architectural anti-patterns only if directly supported by data.

Do NOT speculate beyond measurable evidence.

---

#### StackHash Hotspots (Repeated Callsite Patterns)

Render only if stackHash data exists.

Preferred source:

stats.stackHashCounts

If stats.stackHashCounts exists:

- Use it as the authoritative aggregation of stackHash frequencies.
- Do NOT recompute counts from raw events.

If stats.stackHashCounts is missing:

Group events by:

event.stackHash

Ignore:

stackHash === "h0" (fallback hash).

---

##### Hotspot Table (Top 10 by Count)

| StackHash | Count | Top Event Types | Top Traces | Avg stageDuration |

If stats.stackHashCounts only provides frequency counts:

- Populate the StackHash and Count columns.
- Leave other columns blank unless derivable from raw events.

Rules:

- Compute Avg stageDuration only if stageDurationMs exists.
- Use aggregate counts only.
- Do NOT fabricate missing stackHash values.

---

###### Interpretation

Assess:

- Whether slow stages concentrate in 1\u20132 callsites.
- Whether error events cluster under specific stackHash values.
- Whether hotspots indicate architectural imbalance.

Avoid causal speculation unless supported by metrics.

---

#### Runtime & Navigation Context

Render only if runtime or navigation fields exist.

##### Runtime Context

Use dump.runtime.

| Field               | Value                       |
| ------------------- | --------------------------- |
| hardwareConcurrency | runtime.hardwareConcurrency |
| deviceMemory        | runtime.deviceMemory        |
| connectionType      | runtime.connectionType      |

Only display fields that exist.

---

##### Navigation Timing (If Present)

Use dump.navigation.

| Metric          | Value                   |
| --------------- | ----------------------- |
| navigation.type | navigation.type         |
| domComplete     | navigation.domComplete  |
| loadEventEnd    | navigation.loadEventEnd |

Do NOT fabricate timing fields.

---

###### Commentary

Assess whether hardware or network constraints could plausibly explain:

- Jank
- Scheduling delays
- Long task clustering

Only draw conclusions if supported by observed metrics.

---

#### Actionable Recommendations

Provide **3\u20137 engineering recommendations** derived strictly from the metrics observed in the dump.

Recommendations MUST be supported by at least one of the following signals:

- stats.stageBottleneck or stats.stageAggregates
- stats.traces latency metrics (meanStageDuration / p95StageDuration / maxStageDuration)
- stats.computeVsIdle
- stats.burstAnalysis
- stats.traceFanOut
- stats.stackHashCounts
- stats.stateAnalytics
- stats.longTaskStats
- stats.schedulerDistribution or stats.eventLoopPhaseDistribution
- stats.structuralIntegrity
- registry.licenseSummary (if licensing signals exist)

Recommendations may address:

- Performance tuning
- Stage complexity reduction
- Persistence optimization
- Observability enhancements
- Stage timing instrumentation
- Scheduler or batching improvements
- Event deduplication or fan-out control
- StackHash hotspot mitigation
- State structure normalization
- License enforcement monitoring
- Trace correlation improvements

Rules:

- Each recommendation must reference the metric or signal that triggered it.
- Do NOT invent recommendations unrelated to observed metrics.
- Avoid generic advice unless a corresponding signal exists.
- Prioritize fixes addressing the **Primary Bottleneck** if one was identified.

If no actionable signals are present, state:

> "No concrete remediation actions are suggested based on the metrics available in this session."

---

#### Final System Health Score

Provide:

Overall Score: X / 10

Justify the score concisely using:

- Performance metrics
- Structural integrity indicators
- Error presence
- Determinism assessment
- Architectural balance

The score must be evidence-based and derived strictly from observable metrics.

---

#### Visual Requirements

The report MUST:

- Use tables where metrics are presented.
- Include ASCII bar graphs for at least one comparative metric.
- Include at least one Mermaid diagram (correct fenced syntax).
- Separate sections clearly.
- Prioritize readability and structured formatting.
- Avoid markdown clutter.
- Synthesize insight rather than restating raw metrics.

---

#### Critical Rules

- Do NOT rewrite the JSON.
- Do NOT output explanations of analysis steps.
- Do NOT print raw state objects.
- When referencing problematic state events, show only metadata:
  (traceId, event.type, sequenceNumber).
- Never output full serialized state.
- Do NOT include disclaimers.
- Do NOT summarize the JSON itself.
- Do NOT output raw event lists (max 10 rows only if sampling is necessary).
- Produce only the structured analysis report.
- Be authoritative, precise, analytical, and visually structured.

---

#### File Handling Rules

- The debug dump will be provided as an uploaded file.
- Do NOT request the JSON inline.
- Do NOT echo the entire JSON.
- Reference only extracted metrics.
- If the file exceeds context limits, analyze using progressive summarization.

Prioritization order when constrained:

1. stats.computeVsIdle, stats.stageAggregates
2. stats.traces (duration, p95, stageDuration collisions)
3. stats.schedulerDistribution, eventLoopPhase, stats.burstAnalysis
4. dump.longTasks correlation
5. registry and license summary
6. stats.eventTypes distribution

`,mg=null;function Ek(){return mg||(mg=new vg),mg}var vg=class{serializeRegistry(){let t=globalThis?.sdux?.debugWidget?.getRegistry?.();if(!t)return;let n={valid:0,pending:0,revoked:0,timeout:0,notRequired:0},r=o=>{let s=String(o??"").toLowerCase();s==="valid"?n.valid++:s==="pending"?n.pending++:s==="revoked"?n.revoked++:s==="timeout"?n.timeout++:(s==="not-required"||s==="notrequired")&&n.notRequired++},i=Array.from(t.values()).map(o=>{let s=o.behaviors?Array.from(o.behaviors.values()):[],a=o.controllers?Array.from(o.controllers.values()):[];for(let c of s)r(c.validLicense);for(let c of a)r(c.validLicense);return{key:o.key,behaviorsRegistered:!!o.behaviorsRegistered,controllersRegistered:!!o.controllersRegistered,fluentApis:o.fluentApis??null,behaviors:s,controllers:a}});return{totalFeatureCells:i.length,licenseSummary:n,featureCells:i}}buildEventStats(t,n){let r=0,i=null,o={},s={},a={},c={},l={},u={},d={},f=[],p={},m=[],D={},T={},S={},q=[],Me={},tr=0,oi=0,bs=0,xr=0,Cs=0,Ds=0,ro=0,Dy=0,qd=0,Kd=0,_y=0,Ey=0,Zd={},Yd=null,Lw=[],wy=new Set,Ty=new Map,Iy=0,Sy=0,_s={},My=new Map,xy=new Map,io=null,oo=null,si={count:0,maxDuration:0};if(Array.isArray(n)&&n.length>0){si.count=n.length;for(let v of n)v.duration>si.maxDuration&&(si.maxDuration=v.duration)}else if(typeof performance<"u"&&performance.getEntriesByType)try{let v=performance.getEntriesByType("longtask");si.count=v.length;for(let R of v){let Y=R.duration??0;Y>si.maxDuration&&(si.maxDuration=Y)}}catch{}for(let v of t){if(!v?.name)continue;o[v.name]=(o[v.name]??0)+1,v.scheduler&&(s[v.scheduler]=(s[v.scheduler]??0)+1),v.eventLoopPhase&&(a[v.eventLoopPhase]=(a[v.eventLoopPhase]??0)+1),(v.error||String(v.name).includes("error"))&&tr++,String(v.name).includes("abstain")&&Cs++,String(v.name).includes("success")&&bs++,String(v.name).includes("noop")&&oi++;let R=typeof v.monotonicTimestamp=="number"?v.monotonicTimestamp:typeof v.timestamp=="number"?v.timestamp:null;if(R!==null){if(i!==null){let O=R-i;O>r&&(r=O)}i=R}if(R!==null){Lw.push(R),(io===null||R<io)&&(io=R),(oo===null||R>oo)&&(oo=R);let O=Math.floor(R/16);D[O]=(D[O]??0)+1;let xe=Math.floor(R/1e3);p[xe]=(p[xe]??0)+1}let Y=v.traceId??"__unknown";typeof v.timestamp=="number"&&(My.get(Y)===v.timestamp&&(Iy++,_s[Y]=(_s[Y]??0)+1),My.set(Y,v.timestamp)),c[Y]||(c[Y]={eventCount:0,firstTimestamp:R,lastTimestamp:R,durationMs:0,stageBreakdown:{},stageSequence:[]},l[Y]=[],wy.has(Y)&&Ds++,wy.add(Y));let je=c[Y];je.eventCount++;let Ze=v.monotonicTimestamp;if(typeof Ze=="number"){let O=xy.get(Y);O===Ze&&Sy++,typeof O=="number"&&Ze<O&&ro++,xy.set(Y,Ze)}if(R!==null&&(je.firstTimestamp=Math.min(je.firstTimestamp??R,R),je.lastTimestamp=Math.max(je.lastTimestamp??R,R),je.durationMs=je.lastTimestamp-je.firstTimestamp),typeof v.stageDurationMs=="number"){let O=v.name,xe=v.stageDurationMs,Zt=v.latencyCategory;Zt===Xi.User?m.push(xe):Zt===Xi.System||(xr+=xe,u[O]||(u[O]={count:0,total:0,max:0,min:1/0,avg:0,p95:0},d[O]=[]),u[O].count++,u[O].total+=xe,u[O].max=Math.max(u[O].max,xe),u[O].min=Math.min(u[O].min,xe),d[O].push(xe),je.stageBreakdown[O]=(je.stageBreakdown[O]??0)+xe),Zt===Xi.Pipeline&&l[Y].push(xe),je.stageSequence.push({stage:O,durationMs:xe})}if("payload"in v){let O=this.#t(v.payload);S[Y]=(S[Y]??0)+O,String(v.name).includes("persist")&&q.push({traceId:Y,size:O}),O>5e4&&qd++}if("state"in v){_y++;let O=this.#t(v.state);T[Y]=(T[Y]??0)+O,O>1e5&&qd++;let xe=0;try{xe=this.#r(v.state)}catch{xe=0}Kd=Math.max(Kd,xe);let Zt="",Fn=null;try{Zt=JSON.stringify(v.state)}catch(qw){Fn=qw?.message||"Unknown serialization error",Zt="__STATE_SERIALIZATION_ERROR__"}Fn&&(Ey++,Zd[Fn]=(Zd[Fn]??0)+1);let _t=this.#n(Zt),ai=Ty.get(Y);ai===_t&&Dy++,ai&&ai!==_t&&f.push(Math.abs(O)),Ty.set(Y,_t)}}let gc=io!==null&&oo!==null?oo-io:0,yc=null,vc=0;for(let v in c){let R=c[v],Y=R.durationMs??0,je=R.eventCount??0;Me[v]=Y>2e3&&je<3,Y>vc&&(vc=Y,yc=v);let Ze=l[v]??[];if(Ze.length>0){let O=Ze.slice().sort((_t,ai)=>_t-ai),xe=Ze.reduce((_t,ai)=>_t+ai,0)/Ze.length,Zt=O[Math.floor(O.length*.95)]??O[O.length-1],Fn=O[O.length-1];R.meanStageDuration=xe,R.p95StageDuration=Zt,R.maxStageDuration=Fn}if(!Yd){let O=R.stageSequence??[];if(O.length>=6){let xe=O.map(_t=>_t.stage),Zt=xe.slice(0,2).join("|"),Fn=0;for(let _t=0;_t<xe.length-1&&xe.slice(_t,_t+2).join("|")===Zt;_t+=2)Fn++;Fn>=3&&(Yd={detected:!0,traceId:v,repeatingPattern:Zt.split("|"),repetitionCount:Fn})}}}let Fw=Math.max(0,gc-xr),Bw=t.length>0?Iy/t.length:0,jw=t.length>0?Sy/t.length:0,Ry=null,Ay=0;for(let v in _s){let R=_s[v];R>Ay&&(Ay=R,Ry=v)}let Vw=gc>0?xr/gc:0;for(let v in u){let R=u[v];R.avg=R.count>0?R.total/R.count:0;let Y=d[v].sort((Ze,O)=>Ze-O),je=Math.floor(Y.length*.95);R.p95=Y[je]??0}let bc=null,Cc=0;for(let v in u){let R=u[v].total;R>Cc&&(Cc=R,bc=v)}let ky=[];for(let v in c){let R=c[v],Y=R.stageSequence?.length?R.stageSequence:Object.entries(R.stageBreakdown??{}).map(([je,Ze])=>({stage:je,durationMs:Ze}));ky.push({traceId:v,stages:Y})}let Uw=Object.values(S).reduce((v,R)=>v+R,0)/Math.max(1,Object.keys(S).length),$w=f.length>0?f.reduce((v,R)=>v+R,0)/f.length:0,Ny;if(m.length>0){let v=m.slice().sort((Ze,O)=>Ze-O),R=m.reduce((Ze,O)=>Ze+O,0)/m.length,Y=v[Math.floor(v.length*.95)]??v[v.length-1],je=v[v.length-1];Ny={count:m.length,avgMs:R,p95Ms:Y,maxMs:je}}let Hw=Math.max(...Object.values(p),0),zw=Object.keys(p).length>0?_y/Object.keys(p).length:0,Ww=this.#e(T),Es={},Oy=50;for(let v in c){let R=c[v].eventCount??0;R>=Oy&&(Es[v]=R)}let Gw=[Me&&Object.values(Me).some(Boolean)?{rank:1,type:"deadlock",id:"deadlockByTrace",evidence:"One or more traces match deadlock heuristics."}:null,bc?{rank:2,type:"stage-bottleneck",id:bc,evidence:`Stage has highest total compute time (${Math.round(Cc)}ms).`}:null,yc?{rank:3,type:"slowest-trace",id:yc,evidence:`Longest trace duration (${Math.round(vc)}ms).`}:null,Es&&Object.keys(Es).length?{rank:4,type:"fanout",id:Object.keys(Es)[0],evidence:`Fan-out threshold exceeded (\u2265 ${Oy} events).`}:null,r>250?{rank:5,type:"stall",id:"maxIdleGapMs",evidence:`Large idle gap detected (${Math.round(r)}ms).`}:null].filter(Boolean);return{totalEvents:t.length,errorEvents:tr,firstEventTimestamp:io,lastEventTimestamp:oo,totalDurationMs:gc,longTaskStats:si,eventTypes:o,traces:c,stageAggregates:u,schedulerDistribution:s,eventLoopPhaseDistribution:a,maxIdleGapMs:r,deadlockByTrace:Me,longestTraceId:yc,longestTraceDurationMs:vc,traceFanOut:Es,diagnosticSummary:Gw,stageBottleneck:bc,stageBottleneckTimeMs:Cc,pipelineFlamegraph:ky,burstAnalysis:{maxEventsPerFrame:Math.max(...Object.values(D),0)},suppressionStats:{suppressedCount:oi,votePass:bs,voteAbstain:Cs},structuralIntegrity:{duplicateTraceCount:Ds,outOfOrderCount:ro},pipelineRecursion:Yd,timingIntegrity:{timestampCollisionRate:Bw,monotonicCollisionRate:jw,worstCollisionTrace:Ry,collisionsPerTrace:_s},stateAnalytics:{stateSizePerTrace:T,stateSerializationErrors:Ey,stateSerializationErrorMessages:Zd,avgPayloadSize:Uw,repeatedIdenticalStateCount:Dy,largeObjectCount:qd,deepNestingMaxDepth:Kd,persistPayloadSizeRanking:q.sort((v,R)=>R.size-v.size).slice(0,10),stateEntropyScore:Ww,avgStateDiffSize:$w,maxChurnPerSecond:Hw,avgChurnPerSecond:zw},computeVsIdle:{totalComputeTimeMs:xr,estimatedIdleTimeMs:Fw,computeRatio:Vw},userLatencyDistribution:Ny}}#t(t){try{return new TextEncoder().encode(JSON.stringify(t)).length}catch{return 0}}#r(t,n=0){return t===null||typeof t!="object"?n:Math.max(n,...Object.values(t).map(r=>this.#r(r,n+1)))}#n(t){let n=0;for(let r=0;r<t.length;r++)n=(n<<5)-n+t.charCodeAt(r),n|=0;return`h${Math.abs(n)}`}#e(t){let n=Object.values(t);if(!n.length)return 0;let r=n.reduce((o,s)=>o+s,0)/n.length,i=n.reduce((o,s)=>o+Math.pow(s-r,2),0)/n.length;return Math.sqrt(i)}getEnvironmentInfo(){let t=navigator.userAgent,n=/chrome|crios|edg|opr/i.test(t),r=/safari/i.test(t)&&!n,i="unknown",o="unknown";/firefox/i.test(t)?(i="firefox",o=(t.match(/firefox\/(\d+)/i)??[])[1]??"unknown"):/edg/i.test(t)?(i="edge",o=(t.match(/edg\/(\d+)/i)??[])[1]??"unknown"):/opr/i.test(t)?(i="opera",o=(t.match(/opr\/(\d+)/i)??[])[1]??"unknown"):n?(i="chrome",o=(t.match(/(?:chrome|crios)\/(\d+)/i)??[])[1]??"unknown"):r&&(i="safari",o=(t.match(/version\/(\d+)/i)??[])[1]??"unknown");let s="unknown";/windows/i.test(t)?s="Windows":/iphone|ipad|ipod/i.test(t)?s="iOS":/android/i.test(t)?s="Android":/mac/i.test(t)?s="MacOS":/linux/i.test(t)&&(s="Linux");let a="desktop";return/mobile/i.test(t)&&(a="mobile"),/tablet|ipad/i.test(t)&&(a="tablet"),{url:location.href,referrer:typeof document<"u"&&document.referrer||null,userAgent:t,browser:i,browserVersion:o,os:s,platform:navigator.platform??"unknown",online:typeof navigator<"u"?navigator.onLine:void 0,deviceType:a,language:navigator.language??"unknown",timezone:Intl.DateTimeFormat().resolvedOptions().timeZone??"unknown",screenResolution:typeof screen<"u"?`${screen.width}x${screen.height}`:"unknown",viewport:typeof window<"u"?`${window.innerWidth}x${window.innerHeight}`:"unknown"}}};function AE(e){let t=new Blob([JSON.stringify(e,null,2)],{type:"application/json"}),n=document.createElement("a");n.href=URL.createObjectURL(t),n.download=`sdux-debug-${Date.now()}.json`,n.click(),URL.revokeObjectURL(n.href)}function wk(){let e=Date.now(),t=_k,n=new Blob([t],{type:"text/markdown"}),r=document.createElement("a");r.href=URL.createObjectURL(n),r.download=`sdux-debug-ai-assist-${e}.md`,r.click(),URL.revokeObjectURL(r.href)}function kE(e){let t=Ek(),n=Date.now(),r=new Date(n).toISOString(),i=typeof performance<"u"&&performance.now?performance.now():null,o=typeof performance<"u"&&performance.getEntriesByType?performance.getEntriesByType("navigation")[0]:null,s;if(typeof performance<"u")try{s=performance.getEntriesByType("longtask")?.map(u=>({start:u.startTime,duration:u.duration}))}catch{}let a=t.serializeRegistry(),c=t.buildEventStats(e,s);return{timestamp:n,isoTime:r,highResolution:{monotonicNow:i,timeOrigin:typeof performance<"u"?performance.timeOrigin:null},runtime:{hardwareConcurrency:typeof navigator<"u"?navigator.hardwareConcurrency??null:null,deviceMemory:typeof navigator<"u"?navigator.deviceMemory??null:null,connectionType:typeof navigator<"u"?navigator.connection?.effectiveType??null:null},navigation:o?{type:o.type,domComplete:o.domComplete,loadEventEnd:o.loadEventEnd}:void 0,environment:t.getEnvironmentInfo(),longTasks:s,events:e,stats:c,versions:globalThis?.sdux?.debugWidget?.versions??{},registry:a}}function Tk(e){let t=kE(e);AE(t);let i=`https://github.com/sdux-vault/vault/issues/new?template=issue_report.md&body=${encodeURIComponent(`## Issue Summary
Describe the problem.

---

## What Happened?

Describe the behavior you observed.

---

## What Did You Expect to Happen?

Describe the expected behavior.

---

## Debug Dump

Attach the downloaded **sdux-debug-${t.timestamp}.json** file.

The file was automatically downloaded when you clicked "Report Issue".
`)}`;window.open(i,"_blank")}function Ik(e,t=1){let n=new Blob([e],{type:"application/json"}),r=URL.createObjectURL(n),i=document.createElement("a");i.href=r,i.download=`sdux-pipeline-trace-x${t}-${Date.now()}.json`,i.click(),URL.revokeObjectURL(r)}var ii={Begin:"B",End:"E",Instant:"I",Meta:"M",Complete:"X"};function Sk(e,t=1){let n=[],r=new Map,i=new Map,o=0;n.push({name:"process_name",ph:ii.Meta,pid:1,args:{name:"SDUX Pipeline Debugger"}}),n.push({name:"trace_scale",ph:ii.Meta,pid:1,args:{scale:t}});let s=new Set,a=[...e].sort((l,u)=>{let d=l.sequenceNumber??0,f=u.sequenceNumber??0;return d-f}),c=new Map;if(a.length>0){let l=a[0].monotonicTimestamp??0,u=0,d=l;for(let f=0;f<a.length;f++){let p=a[f],m=p.monotonicTimestamp??d,D=p.sequenceNumber??f;if(f===0){c.set(D,0),d=m;continue}let T=Math.max(0,m-d),S;t<=1?S=Math.floor(T*1e3):T<=2?S=Math.floor(T*1e3*t):T<=16?S=Math.floor(T*1e3*Math.max(2,Math.floor(t/4))):S=1e3,u+=S,c.set(D,u),d=m}}for(let l=0;l<a.length;l++){let u=a[l],d=u.traceId??"main",f=u.sequenceNumber??l,p=c.get(f)??0,[m,D,T]=(u.name??"").split(":"),S=u.type,q=`${d}:${S}:${m}:${T}`;if(s.has(d)||(s.add(d),n.push({name:"thread_name",ph:ii.Meta,pid:1,tid:d,args:{name:`Pipeline ${d.slice(0,8)}`}})),i.has(d)||(i.set(d,o++),n.push({name:"thread_sort_index",ph:ii.Meta,pid:1,tid:d,args:{sort_index:i.get(d)}})),u.boundary===Rt.Start){r.has(q)||r.set(q,[]),r.get(q).push(p),n.push({name:T,cat:S,ph:ii.Begin,ts:p,pid:1,tid:d,args:{cell:u.cell,behavior:u.behaviorKey,scheduler:u.scheduler,source:u.source,latency:u.latencyCategory}});continue}if(u.boundary===Rt.End){let xr=r.get(q);if(xr&&xr.length){let Cs=xr.pop(),Ds=50,ro=p;ro-Cs<Ds&&(ro=Cs+Ds),n.push({name:T,cat:S,ph:ii.End,ts:ro,pid:1,tid:d})}continue}let Me=20*t,tr=Math.max(0,p-Me),oi=tr===0?Me:p,bs=`${T}:${D} (synthetic)`;n.push({name:bs,cat:S,ph:ii.Begin,ts:tr,pid:1,tid:d,args:{synthetic:!0,actualDurationMs:0,note:"Synthetic span time added for visualization"}}),n.push({name:bs,cat:S,ph:ii.End,ts:oi,pid:1,tid:d,args:{synthetic:!0,actualDurationMs:0,note:"Synthetic time span added for visualization"}})}return JSON.stringify({traceEvents:n},null,2)}var bg=class extends HTMLElement{recorder=new yg;recording=!1;minimized=!0;exportMenuOpen=!1;dragOffsetX=0;dragOffsetY=0;dragging=!1;abortController=new AbortController;connectedCallback(){this.attachShadow({mode:"open"}),this.style.position="fixed",this.style.top="80px",this.style.right="20px",this.style.zIndex="999999";let t=localStorage.getItem("sdux-debug-state");if(t)try{let{left:n,top:r,minimized:i}=JSON.parse(t);n&&r&&(this.style.left=n,this.style.top=r,this.style.right="auto"),this.minimized=!!i}catch{}this.render(),document.addEventListener("sdux-license-resolved",()=>{this.updateButtonState()},{signal:this.abortController.signal})}disconnectedCallback(){this.abortController.abort(),this.timerInterval&&(clearInterval(this.timerInterval),this.timerInterval=null),this.recorder.stop(),this.recording=!1}render(){if(!this.shadowRoot)return;this.shadowRoot.innerHTML=`
      <style>
        :host {
          font-family: 'Inter', system-ui, sans-serif;
        }

        .panel {
          background: #e2e8f0;
          border: 1px solid #63a4ff;
          color: #000000;
          padding: 10px 12px;
          border-radius: 8px;
          box-shadow: 0 0 8px rgba(25,118,210,0.4);
          display: flex;
          flex-direction: column;
          gap: 10px;
          cursor: move;
          min-width: 260px;

          &.minimized {
            flex: 1;
            min-width: 0;
          }
        }

        /* HEADER */

        .header {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .title-container {
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .sdux-brand {
          font-family: 'Inter', system-ui, sans-serif;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.08em;
          color: #1976d2;

          display: flex;
          align-items: center;
        }

        .session-timer {
          font-size: 10px;
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, monospace;

          color: #64748b;
          font-variant-numeric: tabular-nums;

          height: 13px;      /* locks visual center */

        }

        .record-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #d32f2f;

          position: relative;
          top: 0.5px; /* micro optical correction */

          animation: recordBlink 1.4s infinite;
        }

        .header-actions {
          display: flex;
          gap: 6px;
        }

        /* ROW 2: SESSION CONTROLS */

        .controls {
          display: flex;
          justify-content: space-between;
          gap: 6px;
        }
        
        .button-container,
        .event-container {
          display: flex;
          gap: 6px;
        }

        /* ROW 3: EXPORT */

        .export-row {
          display: flex;
          gap: 6px;
          align-items: center;
          justify-content: flex-end;
        }

        .event-error-count,
        .event-count {
          width: 48px;             
          font-size: 11px;
          font-weight: 600;
          padding: 4px 6px;

          display: inline-flex;
          align-items: center;
          justify-content: center;

          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }

        .event-count {
          background: #f1f5f9;
          border: 1px solid #63a4ff;
          color: #000000;
        }

        .event-error-count {
          background: #fff5f5;  /* very soft red tint */
          border: 1px solid #d32f2f;
          color: #b71c1c;
        }

        /* BUTTON BASE */

        button {
          display: flex;
          justify-content: center;
          align-items: center;

          font-family: 'Inter', system-ui, sans-serif;
          font-size: 11px;
          font-weight: 600;

          padding: 4px 8px;
          gap: 4px;

          border-radius: 5px;
          cursor: pointer;

          transition:
            transform 0.15s ease,
            box-shadow 0.15s ease,
            background-color 0.2s ease,
            color 0.2s ease;

          background-color: #1976d2;
          color: #ffffff;
          border: 1px solid #1976d2;
        }

        button:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 2px 6px rgba(0,0,0,0.35);
          background-color: #63a4ff;
          border-color: #63a4ff;
        }

        button:active:not(:disabled) {
          transform: scale(0.97);
          box-shadow: 0 3px 10px rgba(0,0,0,0.45);
        }

        button:disabled {
          transform: none !important;
          box-shadow: none !important;
          opacity: 0.65;
          cursor: not-allowed;
          pointer-events: none;
        }

        /* SEMANTIC VARIANTS */

        button.stop {
          width: 56px;
          background: #d32f2f;
          border-color: #d32f2f;
        }

        button.stop:hover:not(:disabled) {
          background: #ef5350;
          border-color: #ef5350;
        }

        button.clear {
          background-color: #2c3a4f;
          border-color: #63a4ff;
          color: #e2e8f0;
        }

        button.clear:hover:not(:disabled) {
          background-color: #1f2a3a;
        }

        button.download {
          background: #388e3c;
          border-color: #388e3c;
        }

        button.download:hover:not(:disabled) {
          background: #81c784;
          border-color: #81c784;
        }

        button.issue {
          background: #1976d2;
          border-color: #1976d2;
        }

        button.issue:hover:not(:disabled) {
          background: #63a4ff;
          border-color: #63a4ff;
        }

        button.minimize,
        button.close {
          background: transparent;
          padding: 2px 6px;
          font-size: 10px;
        }

        button.minimize {
          border-color: #94a3b8;
          color: #94a3b8;
        }

        button.close {
          border-color: #d32f2f;
          color: #d32f2f;
        }

        button.help {
          background: transparent;
          border: 1px solid #94a3b8;
          color: #94a3b8;
          min-width: 26px;
        }

        button.help:hover:not(:disabled) {
          background: rgba(0,0,0,0.06);
        }

        button.ai-assist {
          background: #004ba0;       /* primary dark */
          border-color: #004ba0;
          color: #ffffff;
        }

        button.ai-assist:hover:not(:disabled) {
          background: #1976d2;       /* return to primary base on hover */
          border-color: #1976d2;
        }

        button.ai-assist:active:not(:disabled) {
          background: #003b82;
        }

        @keyframes errorPulse {
          0%   { transform: scale(1); }
          50%  { transform: scale(1.08); }
          100% { transform: scale(1); }
        }

        .event-error-count.bump {
          animation: errorPulse 0.25s ease;
        }

        .export-container {
          position: relative;

          .export-menu {
            position: absolute;
            left: 0;
            top: 100%;
            margin-top: 4px;

            display: flex;
            flex-direction: column;

            background: #e2e8f0;
            border: 1px solid #63a4ff;
            border-radius: 6px;
            box-shadow: 0 4px 10px rgba(0,0,0,0.2);

            min-width: 150px;
            z-index: 10;

            opacity: 0;
            transform: translateY(-6px) scale(0.96);
            pointer-events: none;

            transition:
              opacity 120ms ease,
              transform 120ms ease;
          }

          .export-menu.open {
            opacity: 1;
            transform: translateY(0) scale(1);
            pointer-events: auto;
          }

          .export-menu button {
            background: transparent;
            border: none;
            color: #000;
            padding: 6px 10px;
            text-align: left;
            cursor: pointer;
          }

          .export-menu button:hover {
            background: rgba(0,0,0,0.06);
          }
        }
      }

        @keyframes recordBlink {
          0%   { opacity: 1; }
          50%  { opacity: 0.35; }
          100% { opacity: 1; }
        }

      </style>

      <div class="panel ${this.minimized?"minimized":""}" id="panel" role="region" aria-label="SDuX Debug Widget">

        <!-- ROW 1 (always visible) -->
        <div class="header">
        <div class="title-container">
          <div class="sdux-brand">SDuX DEBUGGER</div>
          ${this.recording?'<div class="record-dot"></div>':""}
          <div id="sessionTimer" class="session-timer">
            ${this.recording?this.getSessionTime():""}
          </div>
        </div>

          <div class="header-actions">
            <button type="button" id="minimize" class="minimize" aria-label="${this.minimized?"Expand widget":"Minimize widget"}">
              ${this.minimized?"\u25A2":"_"}
            </button>
            <button type="button" id="close" class="close" aria-label="Close debug widget">X</button>
          </div>
        </div>

      ${this.minimized?"":`
        <!-- ROW 2 -->
        <div class="controls">
          <div class="event-container">
            [ <div class="event-count" id="eventCount" aria-label="Event count" aria-live="polite">0</div> |
              <div class="event-error-count" id="eventErrorCount" aria-label="Error count" aria-live="polite">0</div> ]
          </div>
          <div class="button-container">
          <button type="button" id="recordToggle" class="stop">
            ${this.recording?"Stop":"Record"}
          </button>
          <button type="button" id="clear" class="clear">Clear</button>
          </div>
        </div>

        <!-- ROW 3 -->
        <div class="export-row">
          <div class="export-container">
            <button type="button" id="export" class="download" aria-expanded="${this.exportMenuOpen}">Export \u25BE</button>

            <div class="export-menu" id="exportMenu" role="menu">
              <button type="button" id="downloadDump" role="menuitem">Debug Dump</button>
              <button type="button" id="downloadTrace" role="menuitem">Trace Timeline</button>
              <button type="button" id="downloadTrace1000" role="menuitem">Trace Timeline (x1000)</button>
            </div>
          </div>
          <button type="button" id="aiAssist" class="ai-assist"> AI Assist </button>
          <button type="button" id="createIssue" class="issue">Create Issue</button>
          <button type="button" id="help" class="help" aria-label="Help">?</button>
        </div>
      `}

    </div>
  `,this.shadowRoot?.getElementById("aiAssist")?.addEventListener("click",()=>{wk()});let n=this.shadowRoot.getElementById("export"),r=this.shadowRoot.getElementById("exportMenu");n?.addEventListener("click",a=>{a.stopPropagation(),this.exportMenuOpen=!this.exportMenuOpen,r?.classList.toggle("open",this.exportMenuOpen)}),this.shadowRoot.getElementById("close")?.addEventListener("click",a=>{a.stopPropagation(),this.remove()}),this.updateButtonState(),this.shadowRoot.getElementById("help")?.addEventListener("click",a=>{a.stopPropagation(),this.openHelp()}),this.shadowRoot.getElementById("recordToggle")?.addEventListener("click",a=>{a.stopPropagation(),this.recording?this.stop():this.start(),this.updateRecordingUI()}),this.shadowRoot.getElementById("panel")?.addEventListener("pointerdown",a=>this.startDrag(a)),this.shadowRoot.getElementById("downloadDump")?.addEventListener("click",a=>{a.stopPropagation(),s(),this.downloadDebugDump()}),this.shadowRoot.getElementById("downloadTrace")?.addEventListener("click",a=>{a.stopPropagation(),s(),this.downloadTraceDump()}),this.shadowRoot.getElementById("downloadTrace1000")?.addEventListener("click",a=>{a.stopPropagation(),s(),this.downloadTraceDump(1e3)}),this.shadowRoot.getElementById("clear")?.addEventListener("click",a=>{a.stopPropagation(),this.clear()}),this.shadowRoot.getElementById("minimize")?.addEventListener("click",this.toggleMinimize),this.shadowRoot.getElementById("createIssue")?.addEventListener("click",a=>{a.stopPropagation(),this.createIssue()});let o=this.abortController.signal;document.addEventListener("pointermove",this.onDrag,{signal:o}),document.addEventListener("pointerup",this.stopDrag,{signal:o}),document.addEventListener("pointerdown",a=>{if(!this.exportMenuOpen)return;let c=a.composedPath();r&&!c.includes(r)&&s()},{signal:o});let s=()=>{r?.classList.remove("open"),this.exportMenuOpen=!1}}updateEventCount(){if(!this.shadowRoot)return;let t=this.shadowRoot.getElementById("eventCount"),n=this.shadowRoot.getElementById("eventErrorCount"),r=this.recorder.getEvents().length,i=this.recorder.getErrorCount();if(t&&(t.textContent=String(r)),n){let o=Number(n.textContent??"0");i>o&&(n.classList.remove("bump"),n.offsetWidth,n.classList.add("bump")),n.textContent=String(i)}}updateRecordingUI(){if(!this.shadowRoot)return;let t=this.shadowRoot.getElementById("recordToggle"),n=this.shadowRoot.querySelector(".record-dot"),r=this.shadowRoot.getElementById("sessionTimer"),i=this.shadowRoot.querySelector(".title-container");if(t&&(t.textContent=this.recording?"Stop":"Record"),!this.recording){n&&n.remove(),r&&(r.textContent="");return}if(!n&&i){let o=document.createElement("div");o.className="record-dot",i.insertBefore(o,i.children[1])}r&&(r.textContent=this.getSessionTime())}sessionStartTime=null;timerInterval=null;pausedDuration=0;pauseStart=null;startDrag(t){this.dragging=!0,this.dragOffsetX=t.clientX-this.offsetLeft,this.dragOffsetY=t.clientY-this.offsetTop}onDrag=t=>{this.dragging&&(this.style.left=`${t.clientX-this.dragOffsetX}px`,this.style.top=`${t.clientY-this.dragOffsetY}px`,this.style.right="auto")};stopDrag=()=>{this.dragging=!1,this.persistState()};toggleMinimize=t=>{t.stopPropagation(),this.minimized=!this.minimized,this.persistState(),this.render()};persistState(){localStorage.setItem("sdux-debug-state",JSON.stringify({left:this.style.left,top:this.style.top,minimized:this.minimized}))}updateButtonState(){if(!this.shadowRoot)return;let t=this.shadowRoot.getElementById("recordToggle"),n=this.shadowRoot.getElementById("export"),r=this.shadowRoot.getElementById("clear"),i=this.shadowRoot.getElementById("createIssue"),o=this.shadowRoot.getElementById("aiAssist"),s=this.recorder.getEvents().length>0,a=!!globalThis.sdux?.debugWidget?.aiAssistEnabled;t&&(t.disabled=!1);let c=!s||this.recording;n&&(n.disabled=c),i&&(i.disabled=c),r&&(r.disabled=c),o&&(o.disabled=c||!a)}start(){if(this.recording)return;let t=Date.now();this.sessionStartTime||(this.sessionStartTime=t),this.pauseStart&&(this.pausedDuration+=t-this.pauseStart,this.pauseStart=null),this.timerInterval=window.setInterval(()=>{let n=this.shadowRoot?.getElementById("sessionTimer");n&&(n.textContent=this.getSessionTime())},1e3),this.recorder.start(()=>{this.updateEventCount(),this.updateButtonState()}),this.recording=!0,this.updateRecordingUI(),this.updateButtonState(),console.info("[SDUX] Recording started")}getSessionTime(){if(!this.sessionStartTime)return"";let t=Date.now()-this.sessionStartTime-this.pausedDuration,n=Math.floor(t/1e3),r=Math.floor(n/60),i=n%60;return`${r}:${i.toString().padStart(2,"0")}`}stop(){this.recording&&(this.recorder.stop(),this.recording=!1,this.pauseStart=Date.now(),this.updateRecordingUI(),this.timerInterval&&(clearInterval(this.timerInterval),this.timerInterval=null),this.updateButtonState(),console.info("[SDUX] Recording stopped"))}downloadDebugDump(){let t=kE(this.recorder.getEvents());AE(t),console.info("[SDUX] Logging dump generated")}downloadTraceDump(t=1){let n=Sk(this.recorder.getEvents(),t);Ik(n,t),console.info("[SDUX] Trace dump generated")}createIssue(){Tk(this.recorder.getEvents()),console.info("[SDUX] Issue dump generated and redirected")}clear(){if(!this.recorder.getEvents().length||!confirm("Clear all recorded events?"))return;this.recorder.clear(),this.sessionStartTime=null,this.pausedDuration=0,this.pauseStart=null;let t=this.shadowRoot?.getElementById("sessionTimer");t&&(t.textContent=""),this.updateEventCount(),this.updateButtonState(),console.info("[SDUX] Events cleared")}openHelp(){window.open("/docs/dev-tools/built-in-debugger","_blank","noopener,noreferrer")}};function Mk(){if(!customElements.get("sdux-debug"))try{customElements.define("sdux-debug",bg)}catch{}if(document.querySelector("sdux-debug"))return;let e=document.createElement("sdux-debug");document.body.appendChild(e)}function NE(){if(!Je.active||typeof window>"u"||(globalThis.sdux??={},globalThis.sdux.debugWidget??={},globalThis.sdux.debugWidget.injected))return;globalThis.sdux.debugWidget.injected=!0;let e=()=>Mk();document.readyState==="loading"?document.addEventListener("DOMContentLoaded",e,{once:!0}):e()}var xk="@sdux-vault/engine",Rk="0.28.0";nc(xk,Rk);var cs="vault-conductor",Md,wg=class{static{Md=this}controllerCtx;static type;static key;static critical;type=Md.type;critical=Md.critical;key;#t=!1;#r=!1;constructor(n,r){this.controllerCtx=r,this.key=n}handleMessage(n){switch(be(`${this.key} handleMessage received "${n.type}" for trace "${n.traceId}".`),n.type){case Nn.Attempt:{let{ctx:r}=n;return this.#r?I(et.Abort):r.operation===dn.Initialize?I(et.Abstain):I(this.#t?et.Abstain:et.Deny)}case Nn.Finalize:return this.#t=!0,I();case Nn.Success:return this.#t=!0,I();case Nn.Failure:return n.ctx.operation===dn.Initialize&&(this.#r=!0),I();default:return I(et.Abstain)}}destroy(){Se(`${this.key} - destroy noop`)}reset(){Se(`${this.key} - reset noop`)}};wg=Md=Rs([Ed({type:ni.CoreAbstain,key:wd("Policy","CoreAbstain"),critical:!1})],wg);var xd,Tg=class{static{xd=this}controllerCtx;static type;static key;static critical;type=xd.type;critical=xd.critical;key;ctx;constructor(n,r){this.controllerCtx=r,this.key=n,this.ctx=r}handleMessage(n){return be(`${this.key} handleMessage received "${n.type}" for trace "${n.traceId}".`),n.type===Nn.Failure?(be(`${this.key} ABORT \u2014 default failure handler for trace "${n.traceId}"`),this.ctx.requestAbort(n.traceId),I()):I(et.Abstain)}destroy(){Se(`${this.key} - destroy noop`)}reset(){Se(`${this.key} - reset noop`)}};Tg=xd=Rs([Ed({type:ni.Error,key:wd("Policy","CoreError"),critical:!1})],Tg);var er={RequireLicense:"requireLicense",ValidateLicense:"validateLicense",LicenseStatus:"licenseStatus",DescribeFeature:"describe-feature",DescribeBehaviors:"describe-behaviors",DescribeControllers:"describe-controllers"},Ad=null;function Ak(e,t){Ad||(Ad=new Ig(e,t))}function sc(){if(!Ad)throw new Error("[vault] LicensingService not initialized.");return Ad}var Ig=class{events$;validation$;constructor(t,n){this.events$=t,this.validation$=n}describeFeature(t){t.type=er.DescribeFeature,this.events$.next(t)}describeBehaviors(t){t.type=er.DescribeBehaviors,this.events$.next(t)}describeControllers(t){t.type=er.DescribeControllers,this.events$.next(t)}requestLicense(t,n){if(!n)throw new Error("[vault] Cannot register controller license without a key.");let r=this.#t();return this.events$.next({featureCellKey:t,key:n,licenseToken:r,type:er.RequireLicense}),r}validateLicense(t,n,r,i){this.events$.next({featureCellKey:t,key:n,licenseToken:r,type:er.ValidateLicense,valid:i})}#t(){let t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",n=r=>Array.from({length:r},()=>t[Math.floor(Math.random()*t.length)]).join("");return`${n(5)}-${n(5)}`}getLicenseValidation$(){return this.validation$}};var Rd,Sg=class{static{Rd=this}controllerCtx;static type;static key;static critical;type=Rd.type;critical=Rd.critical;key;#t=null;#r;constructor(n,r){this.controllerCtx=r,this.key=n;let i=r.featureCellKey;this.#r=sc().getLicenseValidation$().pipe(ge(o=>o.featureCellKey===i)).subscribe(o=>{this.#t=o.approved,this.#r?.unsubscribe();let s=`${i}::license`;o.approved?r?.licenseApproved?.(s):r?.licenseDenied?.(s)})}handleMessage(n){return be(`${this.key} received "${n.type}" for trace "${n.traceId}".`),n.type===Nn.Attempt?this.#t?I(et.Abstain):this.#t===null?I(et.Deny):I(et.Abort):I()}destroy(){this.#r?.unsubscribe(),Se(`${this.key} - destroy unsubscribe`)}reset(){Se(`${this.key} - reset noop`)}};Sg=Rd=Rs([Ed({type:ni.License,key:wd("Policy","CoreLicense"),critical:!0})],Sg);var Mg=class{evaluateAttempt(t,n){if(t.length===0)return I(this.arbitrate(n.traceId,[et.Abstain]));try{let r=t.map(i=>i.handleMessage(n).pipe(ee(o=>o??et.Abstain),ir(o=>(Se("[vault:arbitrator] controller threw during attempt:",o),I(et.Deny)))));return rl(r).pipe(ee(i=>this.arbitrate(n.traceId,i)))}catch{return I(this.arbitrate(n.traceId,[et.Deny]))}}notify(t,n){if(t.length===0)return I(void 0);try{let r=t.map(i=>i.handleMessage(n).pipe(ee(()=>{}),ir(o=>(Se("[vault:arbitrator] controller threw during notify:",o),I(void 0)))));return rl(r).pipe(ee(()=>{}))}catch{return I(void 0)}}arbitrate(t,n){return n.includes(et.Abort)?{traceId:t,outcome:qt.Abort}:n.includes(et.Deny)?{traceId:t,outcome:qt.Deny}:n.every(s=>s===et.Abstain)?{traceId:t,outcome:qt.Abstain}:(yt("Unknown controller vote detected",{traceId:t,votes:n}),{traceId:t,outcome:qt.Deny})}},x={Boundary:"boundary",State:"state",Error:"error"},At={Never:"never",Optional:"optional",Required:"required"},kk={[x.Boundary]:{state:At.Never,payload:At.Optional,error:At.Never},[x.State]:{state:At.Required,payload:At.Optional,error:At.Never},[x.Error]:{state:At.Required,payload:At.Optional,error:At.Required}},Nk={"stage:end:core-state":{category:x.State},"stage:end:core-emit-state":{category:x.State},"lifecycle:end:merge":{category:x.State},"lifecycle:end:replace":{category:x.State},"stage:end:compute-merge":{category:x.State},"stage:end:reducer":{category:x.State},"stage:end:resolve":{category:x.State},"lifecycle:notification:failure":{category:x.Error},"lifecycle:notification:runtime-error":{category:x.Error},"lifecycle:notification:warn":{category:x.Error},"lifecycle:notification:fatal":{category:x.Error},"conductor:start:abort":{category:x.Boundary},"conductor:start:deny":{category:x.Boundary},"conductor:start:revote":{category:x.Boundary},"controller:end:vote":{category:x.Boundary},"conductor:start:license-approved":{category:x.Boundary},"conductor:start:license-attempt":{category:x.Boundary},"controller:end:attempt":{category:x.Boundary},"controller:notification:finalize":{category:x.Boundary},"controller:notification:success":{category:x.Boundary},"controller:restart:restart-controller-attempt":{category:x.Boundary},"controller:start:attempt":{category:x.Boundary},"controller:start:vote":{category:x.Boundary},"lifecycle:end:initialized":{category:x.Boundary},"lifecycle:start:core-callback-error":{category:x.Boundary},"lifecycle:start:core-error":{category:x.Boundary},"lifecycle:start:core-state":{category:x.Boundary},"lifecycle:start:global-error":{category:x.Boundary},"lifecycle:start:initialized":{category:x.Boundary},"lifecycle:start:merge":{category:x.Boundary},"lifecycle:start:replace":{category:x.Boundary},"lifecycle:start:error-transform":{category:x.Boundary},"lifecycle:end:error-transform":{category:x.Boundary},"lifecycle:end:core-callback-error":{category:x.Boundary},"lifecycle:end:core-error":{category:x.Boundary},"lifecycle:end:global-error":{category:x.Boundary},"stage:end:after-tap":{category:x.Boundary},"stage:end:before-tap":{category:x.Boundary},"stage:end:encrypt":{category:x.Boundary},"stage:end:filter":{category:x.Boundary},"stage:end:load-persist":{category:x.Boundary},"stage:end:operator":{category:x.Boundary},"stage:end:persist":{category:x.Boundary},"stage:start:after-tap":{category:x.Boundary},"stage:start:before-tap":{category:x.Boundary},"stage:start:compute-merge":{category:x.Boundary},"stage:start:encrypt":{category:x.Boundary},"stage:start:filter":{category:x.Boundary},"stage:start:load-persist":{category:x.Boundary},"stage:start:operator":{category:x.Boundary},"stage:start:persist":{category:x.Boundary},"stage:start:reducer":{category:x.Boundary},"stage:start:resolve":{category:x.Boundary}},Dg=null;function Ok(){return Dg||(Dg=new xg),Dg}var xg=class{globalInsightOverride=null;cellRegistry=new Map},Rg=class{shared=Ok();key=ug("DevTools","Telemetry");get globalInsightOverride(){return this.shared.globalInsightOverride}set globalInsightOverride(t){this.shared.globalInsightOverride=t}get cellRegistry(){return this.shared.cellRegistry}registerCell(t,n){let r=!!n;this.cellRegistry.set(t,{hasInsight:r,insights:r?[n]:[]})}activateGlobalInsights(t){this.globalInsightOverride=t}isChromeDevTools(t){return t===IE||t===TE}applyPolicy(t,n){let r=Nk[t.name]?.category??x.Boundary,i=kk[r],o=!!n?.wantsState,s=!!n?.wantsPayload,a=!!n?.wantsErrors;return t.source||delete t.source,(!o||i.state===At.Never)&&delete t.state,(!s||i.payload===At.Never||i.payload===At.Optional&&t.payload===void 0)&&delete t.payload,!a||i.error===At.Never?delete t.error:i.error===At.Required&&(!s||t.payload===void 0)&&delete t.payload,t}},_g=null;function Vg(){return _g||(_g=new Ag),_g}var Ag=class extends Rg{#t=Cg();constructor(){super(),typeof window<"u"&&(window.sdux??={},window.sdux.vaultMonitorInstance=this)}#r(t){let n=t?.snapshot??t?.state??{};return{isLoading:n.isLoading??!1,value:n.value??void 0,error:n.error??null,hasValue:n.hasValue??!!n.value}}startAfterTap(t,n,r){this.#e({cell:t,behaviorKey:n,name:"after-tap",ctx:r})}endAfterTap(t,n,r,i){this.#i({cell:t,behaviorKey:n,name:"after-tap",ctx:r,payload:i})}startBeforeTap(t,n,r){this.#e({cell:t,behaviorKey:n,name:"before-tap",ctx:r})}endBeforeTap(t,n,r,i){this.#i({cell:t,behaviorKey:n,name:"before-tap",ctx:r,payload:i})}startClearPersist(t,n,r){this.#a({cell:t,behaviorKey:n,name:"clear-persist",ctx:r})}endClearPersist(t,n,r){this.#c({cell:t,behaviorKey:n,name:"clear-persist",ctx:r})}startComputeMerge(t,n,r){this.#e({cell:t,behaviorKey:n,name:"compute-merge",ctx:r})}endComputeMerge(t,n,r){this.#i({cell:t,behaviorKey:n,name:"compute-merge",ctx:r})}notifyConductorDeny(t,n,r){this.#l({cell:t,behaviorKey:n,name:"deny",ctx:r})}conductorCrashed(t,n,r,i){let o=Yi(i,t),s="fatal";yt(t,n,o),this.#s({cell:t,behaviorKey:n,name:s,ctx:r,payload:{message:"This has proven to be untested code in unit tests. So you win some type of prize. Please create a github issues and share your amazing gift to bring down a systm."},error:o})}conductorRevote(t,n,r){this.#s({cell:t,behaviorKey:n,name:"revote",ctx:r})}conductorAbort(t,n,r){this.#s({cell:t,behaviorKey:n,name:"abort",ctx:r})}conductorLicenseAttempt(t,n){this.#s({cell:t,behaviorKey:n,name:"license-attempt",ctx:{}})}conductorLicenseApproved(t,n){this.#s({cell:t,behaviorKey:n,name:"license-approved",ctx:{}})}conductorLicenseDenied(t,n){this.#s({cell:t,behaviorKey:n,name:"license-denied",ctx:{}})}startControllerAttempt(t,n,r){this.#d({cell:t,behaviorKey:n,name:"attempt",ctx:r})}endControllerAttempt(t,n,r,i){this.#u({cell:t,behaviorKey:n,name:"attempt",ctx:r,payload:i})}restartControllerAttempt(t,n,r,i){this.#f({cell:t,behaviorKey:n,name:"restart-attempt",ctx:r,payload:i})}controllerFailure(t,n,r){let i=Yi(r,t);this.#s({cell:n.featureCellKey,behaviorKey:t,name:"failure",ctx:n,error:i})}controllerFinalize(t,n){this.#s({cell:n.featureCellKey,behaviorKey:t,name:"finalize",ctx:n})}controllerSuccess(t,n){this.#s({cell:n.featureCellKey,behaviorKey:t,name:"success",ctx:n})}startControllerVote(t,n,r){this.#d({cell:t,behaviorKey:n,name:"vote",ctx:r})}endControllerVote(t,n,r,i){this.#u({cell:t,behaviorKey:n,name:"vote",ctx:r,payload:i})}startCoreCallbackError(t,n,r){this.#e({cell:t,behaviorKey:n,name:"core-callback-error",ctx:r})}endCoreCallbackError(t,n,r){this.#i({cell:t,behaviorKey:n,name:"core-callback-error",ctx:r})}startCoreEmitState(t,n,r){this.#e({cell:t,behaviorKey:n,name:"core-emit-state",ctx:r})}endCoreEmitState(t,n,r){this.#i({cell:t,behaviorKey:n,name:"core-emit-state",ctx:r})}startCoreError(t,n,r){this.#e({cell:t,behaviorKey:n,name:"core-error",ctx:r})}endCoreError(t,n,r){this.#i({cell:t,behaviorKey:n,name:"core-error",ctx:r})}startCoreState(t,n,r){this.#e({cell:t,behaviorKey:n,name:"core-state",ctx:r})}endCoreState(t,n,r){this.#i({cell:t,behaviorKey:n,name:"core-state",ctx:r})}startDecrypt(t,n,r){this.#e({cell:t,behaviorKey:n,name:"decrypt",ctx:r})}endDecrypt(t,n,r,i){this.#i({cell:t,behaviorKey:n,name:"decrypt",ctx:r,payload:i})}startDestroy(t,n,r){this.#a({cell:t,behaviorKey:n,name:"destroy",ctx:r})}endDestroy(t,n,r,i){this.#c({cell:t,behaviorKey:n,name:"destroy",ctx:r,payload:i})}startEncrypt(t,n,r){this.#e({cell:t,behaviorKey:n,name:"encrypt",ctx:r})}endEncrypt(t,n,r){this.#i({cell:t,behaviorKey:n,name:"encrypt",ctx:r})}runtimeError(t,n,r,i){let o=Yi(i,t);yt(t,n,o),this.#s({cell:t,behaviorKey:n,name:"runtime-error",ctx:r,error:o})}startErrorTransform(t,n,r){this.#e({cell:t,behaviorKey:n,name:"error-transform",ctx:r})}endErrorTransform(t,n,r,i){this.#i({cell:t,behaviorKey:n,name:"error-transform",ctx:r,payload:i})}startFilter(t,n,r){this.#e({cell:t,behaviorKey:n,name:"filter",ctx:r})}endFilter(t,n,r){this.#i({cell:t,behaviorKey:n,name:"filter",ctx:r})}startGlobalError(t,n,r){this.#a({cell:t,behaviorKey:n,name:"global-error",ctx:r})}endGlobalError(t,n,r){this.#c({cell:t,behaviorKey:n,name:"global-error",ctx:r})}ingressSubscribed(t,n,r,i){this.#a({cell:t,behaviorKey:n,name:"ingress-subscribed",ctx:r,source:i})}ingressCompleted(t,n,r,i){this.#c({cell:t,behaviorKey:n,name:"ingress-completed",ctx:r,source:i})}startInitialized(t,n,r){this.#a({cell:t,behaviorKey:n,name:"initialized",ctx:r})}endInitialized(t,n,r){this.#c({cell:t,behaviorKey:n,name:"initialized",ctx:r})}startInterceptor(t,n,r){this.#e({cell:t,behaviorKey:n,name:"interceptor",ctx:r})}endInterceptor(t,n,r,i){this.#i({cell:t,behaviorKey:n,name:"interceptor",ctx:r,payload:i})}startLoadPersist(t,n,r){this.#e({cell:t,behaviorKey:n,name:"load-persist",ctx:r})}endLoadPersist(t,n,r,i){this.#i({cell:t,behaviorKey:n,name:"load-persist",ctx:r,payload:i})}startMerge(t,n,r){this.#a({cell:t,behaviorKey:n,name:"merge",ctx:r})}endMerge(t,n,r,i){this.#c({cell:t,behaviorKey:n,name:"merge",ctx:r,payload:i})}startOperator(t,n,r){this.#e({cell:t,behaviorKey:n,name:"operator",ctx:r})}endOperator(t,n,r,i){this.#i({cell:t,behaviorKey:n,name:"operator",ctx:r,payload:i})}startPersist(t,n,r){this.#e({cell:t,behaviorKey:n,name:"persist",ctx:r})}endPersist(t,n,r){this.#i({cell:t,behaviorKey:n,name:"persist",ctx:r})}startReducer(t,n,r){this.#e({cell:t,behaviorKey:n,name:"reducer",ctx:r})}endReducer(t,n,r){this.#i({cell:t,behaviorKey:n,name:"reducer",ctx:r})}startReplace(t,n,r){this.#a({cell:t,behaviorKey:n,name:"replace",ctx:r})}endReplace(t,n,r,i){this.#c({cell:t,behaviorKey:n,name:"replace",ctx:r,payload:i})}startReset(t,n,r){this.#a({cell:t,behaviorKey:n,name:"reset",ctx:r})}endReset(t,n,r,i){this.#c({cell:t,behaviorKey:n,name:"reset",ctx:r,payload:i})}startResolve(t,n,r){this.#e({cell:t,behaviorKey:n,name:"resolve",ctx:r})}endResolve(t,n,r){this.#i({cell:t,behaviorKey:n,name:"resolve",ctx:r})}startSetInitialValue(t,n,r){this.#a({cell:t,behaviorKey:n,name:"set-initial-value",ctx:r})}endSetInitialValue(t,n,r){this.#c({cell:t,behaviorKey:n,name:"set-initial-value",ctx:r})}startStepwise(t,n,r){this.#e({cell:t,behaviorKey:n,name:"stepwise",ctx:r})}endStepwise(t,n,r){this.#i({cell:t,behaviorKey:n,name:"stepwise",ctx:r})}warn(t,n,r,i){let o=Yi(i,t);Se(t,n,o),this.#s({cell:t,behaviorKey:n,name:"warn",ctx:r,error:o})}#n(t){return t.name=`${t.type}:${t.boundary}:${t.name}`,t}#e(t){t.type=ct.Stage,t.boundary=Rt.Start,this.#o(this.#n(t))}#i(t){t.type=ct.Stage,t.boundary=Rt.End,this.#o(this.#n(t))}#a(t){t.type=ct.Lifecycle,t.boundary=Rt.Start,this.#o(this.#n(t))}#c(t){t.type=ct.Lifecycle,t.boundary=Rt.End,this.#o(this.#n(t))}#s(t){t.type=ct.Lifecycle,t.boundary=Rt.Notification,this.#o(this.#n(t))}#l(t){t.type=ct.Conductor,t.boundary=Rt.Notification,this.#o(this.#n(t))}#d(t){t.type=ct.Controller,t.boundary=Rt.Start,this.#o(this.#n(t))}#u(t){t.type=ct.Controller,t.boundary=Rt.End,this.#o(this.#n(t))}#f(t){t.type=ct.Controller,t.boundary=Rt.Notification,this.#o(this.#n(t))}#o(t){let{cell:n,ctx:r,name:i,behaviorKey:o,source:s,error:a,payload:c,type:l,boundary:u}=t;if(this.isChromeDevTools(n)||!Je.active)return;let d;if(this.globalInsightOverride)d=this.globalInsightOverride;else{let p=this.cellRegistry.get(n);if(!p||!p.hasInsight)return;d=p.insights[0]}let f={id:crypto.randomUUID(),cell:n,behaviorKey:o,name:i,timestamp:Date.now(),state:this.#r(r),type:l??ct.Unknown,boundary:u??Rt.Unknown,payload:c,error:a,source:s};r.traceId&&(f.traceId=r.traceId),this.#t.nextPipeline(this.applyPolicy(f,d))}},fn={Abort:"abort",Failure:"failure",LicenseApproved:"licenseApproved",LicenseDenied:"licenseDenied",Revote:"revote",Success:"success"},kg=class{controllers;events$;#t=new Mg;#r=Vg();constructor(t,n){this.controllers=t,this.events$=n}evaluateAttempt(t){let n={type:Nn.Attempt,traceId:t.traceId,ctx:t};return this.#t.evaluateAttempt(this.controllers,n)}notifySuccess(t){if(!this.controllers.length)return;let n={type:Nn.Success,traceId:t.traceId,ctx:t};this.#r.controllerSuccess("decision-engine",t),this.#t.notify(this.controllers,n).subscribe({complete:()=>{this.events$.closed||this.events$.next({traceId:t.traceId,type:fn.Success})}})}notifyFailure(t,n){if(!this.controllers.length)return;let r={type:Nn.Failure,traceId:t.traceId,ctx:t,error:n};this.#r.controllerFailure("decision-engine",t,n),this.#t.notify(this.controllers,r).subscribe({complete:()=>{this.events$.closed||this.events$.next({traceId:t.traceId,type:fn.Failure})}})}notifyFinalize(t){if(!this.controllers.length)return;let n={type:Nn.Finalize,traceId:t.traceId};this.#r.controllerFinalize("decision-engine",t),this.#t.notify(this.controllers,n).subscribe()}},Ce="vault-orchestrator",Pk=new Set(["initialize","destroy","destroyed$","reset","reset$","reducers","operators","filters","interceptors","mergeState","replaceState","beforeTaps","afterTaps","key","state","cache","persist","encrypt","beforeTap","afterTap","hydrate"]),Er={NotRequired:"not-required",Pending:"pending",Revoked:"revoked",Timeout:"timeout",Valid:"valid"},Lk=new Set(["SDUX::Behavior::Core::AfterTap","SDUX::Behavior::Core::ArrayMerge","SDUX::Behavior::Core::BeforeTap","SDUX::Behavior::Core::EmitState","SDUX::Behavior::Core::Error","SDUX::Behavior::Core::ErrorCallback","SDUX::Behavior::Core::Filter","SDUX::Behavior::Core::FromObservable","SDUX::Behavior::Core::FromPromise","SDUX::Behavior::Core::FromStream","SDUX::Behavior::Core::ObjectMerge","SDUX::Behavior::Core::Observable","SDUX::Behavior::Core::Promise","SDUX::Behavior::Core::Reducer","SDUX::Behavior::Core::State","SDUX::Behavior::Core::TabSyncState","SDUX::Behavior::Core::Value","SDUX::Behavior::Addon::DistinctUntilChanged","SDUX::Behavior::Cache::State","SDUX::Behavior::Core::Lookup","SDUX::Behavior::Core::Query","SDUX::Behavior::Encrypt::Aes256","SDUX::Behavior::Interceptor::GlobalErrorPause","SDUX::Behavior::Merge::ArrayAppend","SDUX::Behavior::Merge::ArrayPush","SDUX::Behavior::Merge::Deep","SDUX::Behavior::Persist::CookieStorage","SDUX::Behavior::Persist::LocalStorage","SDUX::Behavior::Persist::SessionStorage","SDUX::Behavior::Policy::StepwiseFilter","SDUX::Behavior::Policy::StepwiseReducer","SDUX::Behavior::Policy::StepwiseResolve","SDUX::Behavior::Core::License","SDUX::Controller::Policy::CoreAbstain","SDUX::Controller::Policy::CoreError","SDUX::Controller::Policy::CoreLicense","SDUX::Controller::Policy::TabSync","SDUX::Controller::Policy::Delay","SDUX::Controller::Policy::MaxFailures","SDUX::Controller::Policy::ReplayGlobalError","SDUX::Controller::Policy::Stepwise","SDUX::Controller::Policy::Throttle"]),LE="sdux-vault",Fk="SDUX::Behavior::Core::License",vt=null;function FE(e={}){vt||(vt=new Ng(e))}var Ng=class{#t;#r;#n=new Map;#e=new Map;#i=!1;#a=!1;#c;#s=new Map;#l=new M;#d=new Rr;#u=new Map;#f;#o=new Map;constructor(t){Ak(this.#l,this.#d.asObservable()),this.setVaultConfig(t),this.#D(t.licenses),this.#g(),this.#A()}setVaultConfig(t){let n={devMode:t.devMode??!1,logLevel:t.logLevel??"off"};this.#f=Object.freeze(n),Je.setDevMode(this.#f.devMode),EE(this.#f.logLevel),this.#a=t.devMode?t.bypassLicensing??!1:!1,this.#c=t.licenseTimeoutMs??15e3,this.#x()}resetForTesting(){this.#t?.unsubscribe(),this.#t=void 0,this.#r?.unsubscribe(),this.#r=void 0,this.#f=void 0,this.resetFeatureCellRegistry(),this.#u.clear(),this.#n.clear()}resetFeatureCellRegistry(){this.#o.clear()}registerCellRuntime(t){this.#h(t)}registerBehaviors(t,n){let r=this.#h(t);r.behaviors=this.#p(n),r.behaviorsRegistered=!0}registerControllers(t,n){let r=this.#h(t);r.controllers=this.#p(n),r.controllersRegistered=!0}registerFluentApis(t,n){let r=this.#h(t);r.fluentApis=Object.freeze(n)}getLicensePayload(t){return this.#n.get(t)}isBypassLicensing(){return this.#a}isAuthorizedKey(t){return Lk.has(t)}hasVaultLicense(){return this.#n.has(LE)}#D(t){if(t?.length)for(let n of t)n?.licenseId&&this.#n.set(n.licenseId,n.payload)}#p(t){return new Map(t.map(n=>{let r;this.#a?r=!1:r=n.needsLicense??!1;let i={key:n.key,type:n.type,critical:!!n.critical,needsLicense:r,validLicense:r?Er.Pending:Er.NotRequired};return[n.key,Object.freeze(i)]}))}#g(){this.#t=this.#l.subscribe(t=>{switch(t.type){case er.DescribeFeature:{let n=t;this.registerFluentApis(n.featureCellKey,this.#R(n));break}case er.DescribeBehaviors:{let n=t;this.registerBehaviors(n.featureCellKey,n.behaviors),this.#y(n.featureCellKey);break}case er.DescribeControllers:{let n=t;this.registerControllers(n.featureCellKey,n.controllers),this.#y(n.featureCellKey);break}case er.RequireLicense:{this.#E(t.featureCellKey),this.#I(t);return}case er.ValidateLicense:{this.#T(t),this.#y(t.featureCellKey);return}}})}#E(t){if(!this.#c||this.#s.has(t))return;let n=setTimeout(()=>{this.#w(t),this.#s.delete(t)},this.#c);this.#s.set(t,n)}#w(t){let n=this.#o.get(t);if(!n)return;let r=[...n.behaviors?.values()??[],...n.controllers?.values()??[]],i=!1;for(let o of r)o.needsLicense&&o.validLicense===Er.Pending&&((n.behaviors?.has(o.key)?n.behaviors:n.controllers)?.set(o.key,Object.freeze($(g({},o),{validLicense:Er.Timeout}))),i=!0);i&&this.#m(t,!1),this.#v(t)}#y(t){let n=this.#o.get(t);if(!n||!n.behaviorsRegistered||!n.controllersRegistered)return;let i=[...n.behaviors?.values()??[],...n.controllers?.values()??[]].filter(o=>o.needsLicense);if(i.length===0){this.#m(t,!0);return}if(i.some(o=>o.validLicense===Er.Revoked||o.validLicense===Er.Timeout)){this.#v(t),this.#m(t,!1);return}i.some(o=>o.validLicense===Er.Pending)||this.#m(t,!0)}#v(t){let n=this.#s.get(t);n&&(clearTimeout(n),this.#s.delete(t))}#m(t,n){this.#e.has(t)||(this.#e.set(t,n),this.#v(t),this.#u.set(t,n),this.#d.next({featureCellKey:t,approved:n}))}#T(t){let{featureCellKey:n,key:r,licenseToken:i,valid:o}=t;if(this.#e.has(t.featureCellKey))return;if(!r){Se("Cannot validate license without a key.");return}let s=this.#o.get(n);s&&(this.#b(s.behaviors,r,i,o),this.#b(s.controllers,r,i,o),o&&r===Fk&&this.#S())}#b(t,n,r,i){if(!t?.has(n))return;let o=t.get(n);if(o.needsLicense&&o.licenseId){if(o.licenseId!==r){Se(`[vault] License key mismatch for "${n}".`);return}t.set(n,Object.freeze($(g({},o),{validLicense:i?Er.Valid:Er.Revoked})))}}#I(t){let{featureCellKey:n,key:r,licenseToken:i}=t,o=this.#o.get(n);if(o){if(!r||typeof r!="string")throw new Error("[vault] Cannot register controller license without a key.");this.#_(o.behaviors,r,i),this.#_(o.controllers,r,i)}}#_(t,n,r){if(!t?.has(n))return;let i=t.get(n);i.needsLicense&&(i.licenseId||r&&t.set(n,Object.freeze($(g({},i),{licenseId:r}))))}#x(){Je.active&&!ig.active&&console.error(`[vault] "Development Mode" is enabled outside of a test environment.
This can expose sensitive data because safeguards that normally remove or sanitize data are disabled.
You have explicitly disabled these safeguards and are responsible for ensuring production safety.
If this is intentional, you can safely ignore this message.`)}#R(t){let n=t?.fluentApis??{};return{filters:Array.isArray(n?.filters)?n.filters.length:0,reducers:Array.isArray(n?.reducers)?n.reducers.length:0,beforeTaps:Array.isArray(n?.beforeTaps)?n.beforeTaps.length:0,afterTaps:Array.isArray(n?.afterTaps)?n.afterTaps.length:0,emitStateCallbacks:Array.isArray(n?.emitStateCallbacks)?n.emitStateCallbacks.length:0,errorCallbacks:Array.isArray(n?.errorCallbacks)?n.errorCallbacks.length:0}}#h(t){return this.#o.has(t)||this.#o.set(t,{key:t,behaviorsRegistered:!1,controllersRegistered:!1}),this.#o.get(t)}#S(){this.#i||Je.active&&(typeof document>"u"||(this.#i=!0,globalThis.sdux??={},globalThis.sdux.debugWidget??={},globalThis.sdux.debugWidget.aiAssistEnabled=!0,document.dispatchEvent(new CustomEvent("sdux-license-resolved"))))}#A(){Je.active&&(typeof document>"u"||(globalThis.sdux??={},globalThis.sdux.debugWidget??={},globalThis.sdux.debugWidget.getRegistry=()=>this.getRegistrySnapshot(),NE()))}registerVaultSettled(t,n){let r=this.#h(t);r.vaultSettled=n}async awaitFeatureCellSettled(t){let n=this.#o.get(t);if(!n)throw new Error(`[vault] FeatureCell "${t}" not registered.`);typeof n.vaultSettled=="function"&&(await n.vaultSettled(),await Promise.resolve())}async awaitAllSettled(){for(let t of this.#o.values())typeof t.vaultSettled=="function"&&await t.vaultSettled();await Promise.resolve()}getRegistrySnapshot(){return new Map(this.#o)}};function BE(e){if(!vt)throw new Error("[vault] Vault not initialized.");if(!e)throw new Error("[vault] registerFeatureCell() requires a valid entry object.");if(!e.key||typeof e.key!="string")throw new Error('[vault] registerFeatureCell() requires a valid "key" (non-empty string).');vt.registerCellRuntime(e.key)}function jE(e){if(!vt)throw new Error("[vault] Vault not initialized.");if(typeof e!="string"||!e.trim())throw new Error("[vault] getLicensePayload() requires a valid licenseId.");return vt.getLicensePayload(e)}function Bk(e,t){if(!vt)throw new Error("[vault] Vault not initialized.");if(!e||typeof e!="string")throw new Error('[vault] registerVaultSettled() requires a valid "key" (non-empty string).');typeof t=="function"&&vt.registerVaultSettled(e,t)}function VE(e){return vt?vt.isBypassLicensing()?!0:vt.isAuthorizedKey(e):!1}function UE(){return vt?vt.isBypassLicensing():!1}function Ug(){return vt?vt.hasVaultLicense():!1}var Og=class{#t=!1;#r;#n;#e;constructor(t,n,r){this.#r=t,this.#n=n,this.#e=r}initializeBehaviors(t,n){if(this.#t)throw new Error(`[vault] VaultBehaviorRunner already initialized \u2014 cannot reissue core behavior ID for feature cell "${this.#r}".`);if(this.#t=!0,!t||t.length===0)return[];let r=new Set;return t.map(i=>{let o=!1;try{if(typeof i!="function")return;let s=i[Cd];if(!s)throw o=!0,new Error(`[vault] Behavior "${i.name}" missing @VaultBehavior metadata.`);let a=s.key,c=s.type;if(!a)throw o=!0,new Error('[vault] Behavior metadata missing "key".');if(!Ug()&&!VE(a)){be(`[vault] Unlicensed behavior "${a}" skipped during initialization.`);return}if(!c)throw o=!0,new Error(`[vault] Behavior metadata missing "type" for "${a}".`);let l;if(s.wantsConfig){if(!s.configKey)throw o=!0,new Error(`[vault] Behavior "${a}" declares wantsConfig but has no configKey.`);l=n.get(s.configKey)}let u;if(s.needsLicense&&!UE()){if(!s.licenseId)throw o=!0,new Error(`[vault] Behavior "${a}" declares needsLicense but has no licenseId.`);if(u=jE(s.licenseId),u===void 0)throw o=!0,new Error(`[vault] License "${s.licenseId}" required by behavior "${a}" is not registered in Vault config.`)}let d;try{let f={featureCellKey:this.#r,behaviorConfig:l,licensePayload:u};s.type===w.TabSyncState&&(f=$(g({},f),{lastSnapshot:this.#n,state$:this.#e})),d=new i(a,f)}catch(f){throw o=s.critical,f}if(!d.key)throw o=!0,new Error(`[vault] Behavior missing key for type "${c}". Every behavior must define a unique "key".`);if(!dg(d.key))throw o=!0,new Error(`[vault] Behavior key "${d.key}" not valid format for "${c}" behavior.`);return d.key&&r.has(d.key)?(Se(`[vault] Skipping duplicate behavior with key "${d.key}"`),null):(d.key&&r.add(d.key),d)}catch(s){if(o)throw s;return Se(`[vault] Non-critical behavior initialization failed: ${s?.message}`),null}}).filter(i=>!!i)}applyBehaviorExtensions(t,n,r){for(let i of t){let o={featureCellKey:n.key,destroyed$:n.destroyed$,reset$:n.reset$,mergeState:n.mergeState,replaceState:n.replaceState,state$:n.state$,vaultMonitor:r},s=i.extendCellAPI?.(o);if(!(!s||typeof s!="object"))for(let[a,c]of Object.entries(s)){let l=n[a]!==void 0,u=Array.isArray(i.allowOverride)&&i.allowOverride.includes(a);if(Pk.has(a))throw new Error(`[vault] Behavior "${i.key}" attempted to overwrite core FeatureCell method "${a}".`);if(l&&!u)throw new Error(`[vault] Behavior "${i.key}" attempted to redefine method "${a}" already provided by another behavior.`);l&&u&&(Se(`[vault] Behavior "${i.key}" is overriding method "${a}" (explicitly allowed).`),delete n[a]),Object.defineProperty(n,a,{value:(...d)=>{try{return typeof c!="function"?void 0:c(...d)}catch(f){throw yt(`[vault] Behavior extension "${a}" threw an error:`,f),f}},enumerable:!1,writable:!1,configurable:!0})}}}},jk=e=>e.type===w.ErrorTransform,Vk=e=>e.type===w.CoreErrorCallback,Uk=e=>e.type===w.CoreEmitState,us=e=>e===ag,Eg=()=>crypto?.randomUUID?.()??Math.random().toString(36).slice(2,7),$E=e=>ri(e)||us(e),$k={pro:`
-----BEGIN PUBLIC KEY-----
MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEAuXto+eRaFm9pObys/IEI ASwV1wgGvNGJsiyw/9hXsEd9mA76aQI1X9lpkZRKmBFovHdK2unPHFOPQM0k9vJo ieFMNXO9kmHn7UYZV98bDCcDTNURFHQ4SWlcAE/HEiNqcUb9LwotFbON7/mcthM8 QQQ4Lycdv+lm1uozQl8rl+i7FjfQzLaxJMuAkm9jFZK+ta6eoSy/lmXfhDem8RIo dE19aZWfY+LTXP9nn977XFah0z0S0D3NSvMv96gZsXTN2hTbFBl5dgDMAOW9R5OI wT6I+kGwrVqARXq2pTDHnZjqfO3a+rT4Lrb5/L58RjQ0EfA5puZ16EXGEUpOabqI KVT4Z/wv818P8eyat+LtTcy2G0zx/h0Fcz0QANzx3P9K7ezxeqdg4SsjkcNXRWZq PaJUhZHygN/Xuef9zfWwjuKobCBSdyyeXxF5XS0A0Y6NBmdhikyHc/YOY2iYupIt xiUvlHaq97B5wej3XcTmp4kmJUQyeQ8oD5Mj8Dmf69oa7vhI/ANNKWo9s8e7u7UX Dx74Eu3d8JBpACQ+Vvek6ZEGw+D0yCyLF6u/CaCw+cb2cBYAlM7jWZ5kpgsbQcWw YP2nbGV3OofcEspoEU704M4RW4v+nSRYrJbMEIJJ5Wuxk2/RuUgk/9uwgCHAvzXZ cmGomIf9dXZGoNhwT5uW1OECAwEAAQ==
-----END PUBLIC KEY-----
`,enterprise:`
-----BEGIN PUBLIC KEY----- MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEA6k4XHyV4WE6Bd/fizN4Q c3C37LtskNTJ1c3FVxcziygAFd+fotRfbLHctwtJJhuO6+Pv+c1SPjrPeJsWRw4M IN7QHcBQHPbQDW/Erd1XjA0OVNbxs3xLVjtgMuVcd2sKYPp4nJqIyz5WLMde7v1g 1k8knI+ISrym0h4GcjkNSaHK5QKKpK7n3dzOXrjo1P6h1uOVsGAHC/ErVMQNHrAu dKgY+SDVn87oPIrd2pJb5SotI6H8HzODM/CDsF58hk/eK4zApnrtDViVb1j3oNCk hdDOnN98VIgwcHzHYZOhPFM0TFwudpi57Yu/PJJztI7WbsjpxTyX3JPvwVeWJR+Z tt6NEQ5ZaoBghGgHGiuRbhKR5qoznwsMkfb2jUbpbgRTinmtEjFmpIYSnROCixjq W1neupzBDrNi+JfoVsTwiP8SbzxHXWksN0gLMfL235l1LDMS/IrI3RmhcRkhB/Pu vPuc+jhPkwpbXaM9vDkkPWK1dmRYHWo3atYCWoSdK2705woo19oT8Dxm9OXKT+nh HsdOI+k9asBCqe4kQHi3OJ4Raesa6bFWWxKFLeUNKSAt7clJKo7GhrovnHIIAbty gk7ULdwLIlpjwB5mVUBBCts5z9KznHo+pumNoeEA8FGqq374a+jEPOHWjsshA678 RDYeqeRbh2VNcy/OwlqH/MUCAwEAAQ==
-----END PUBLIC KEY-----
`,development:`
-----BEGIN PUBLIC KEY----- MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEAsAFRjQalSEZkCDPrdBEf IMQpY7ujGf4pqjuFk86rkZENr7kJ00RjVJxuhcafgygdmxVAhKS+d1WtsSAw6c9m AawI+sSyhAClB+wrwfuCrxt/ZlLbNMiMH5SD1YvoRaHstkLpMGbWnbsLDI+cCpaL hGKk+5LoJLikhf9ipBkGX8VSAT0xTMk06iaYtEV85H9cMWtfx7seyBw2Mps/8S6f Rtp3tLlbNJIyh9+5XjtkTqYNRWJtFW1rv75K9GN9dPVXrEXUGojqeV13G+z2R3Sr QvmhESkyC1DviZBxaYnEhpWoijJQFJUQ1DGRi29ugktYzf36Otw9gyz9jGb5MLNE W+meR2LdnbTBy83QNtaS5lCzNJVo2ohwbD+djblNVegH/Dr0rK4IHEYSgjdxjErY 6xqykJpKJ025CTU4kyI3aaaYB+l2CQMAKVAh2y2rgGyJSJnMDTR44aBIZ8rtTu2r wazjBJ/RiMr0OOkfBqEQPKZ6qzSWtBDebvD0iUyRAP8SXSdDo1DcaJNamLLmjIxr 3KCcwgJt2oLcdZZHKG3WbjqmIdp7tq03O4gajKJHd5GmyLWtHXKqBwaijAx9aNqr qDPWj/Qg/8C9qpSBs7EUod3slV6UhO4yEnb7FdD/O0o8mRMU0rtJ0KQTarpEh2bY MKVsYxByiFeAjUJUWLSqIX8CAwEAAQ==
-----END PUBLIC KEY-----
`},OE=!1;var Hk={verify:async e=>{try{let t=e.indexOf(".");if(t===-1)return!1;let n=e.substring(0,t),r=e.substring(t+1),i=atob(n),o=JSON.parse(i),s=Uint8Array.from(atob(r),d=>d.charCodeAt(0)),a=o?.licenseType;if(!a)return!1;if(!Je.active&&a==="development")return console.error("[sdux-vault] Development license token rejected in production environment."),!1;let c=$k[a];if(!c)return!1;let l=await zk(c),u=await crypto.subtle.verify({name:"RSASSA-PKCS1-v1_5",hash:"SHA-256"},l,s,new TextEncoder().encode(n));if(OE||(OE=!0,u?console.info(`[sdux-vault] License verified \u2014 organization: "${o.organization}", tier: "${o.licenseType}"`):console.warn(`[sdux-vault] License signature invalid \u2014 organization: "${o.organization}", tier: "${o.licenseType}"`),console.info("[sdux-vault] License organization:",o.organization),console.info("[sdux-vault] License domain:",o.domain),console.info("[sdux-vault] License type:",o.licenseType),console.info("[sdux-vault] License issuedAt:",Sd(o.issuedAt)),console.info("[sdux-vault] License expires:",Sd(o.expires))),u&&o.licenseType==="enterprise"&&typeof o.expires=="number"){let d=o.expires-Date.now();if(d<0)return console.error(`[sdux-vault] Enterprise license expired \u2014 organization: "${o.organization}", expired: ${Sd(o.expires)}`),!1;let f=360*60*60*1e3;d<=f&&console.warn(`[sdux-vault] Enterprise license expiring soon \u2014 organization: "${o.organization}", expires: ${Sd(o.expires)}`)}return u}catch(t){return console.error("[sdux-vault] License token verification failed:",t),!1}}};async function zk(e){let t=Gk(Wk(e));return crypto.subtle.importKey("spki",t,{name:"RSASSA-PKCS1-v1_5",hash:"SHA-256"},!1,["verify"])}function Wk(e){let t=e.replace(/-----.*KEY-----/g,"").replace(/\s+/g,"");return atob(t)}function Gk(e){let t=new ArrayBuffer(e.length),n=new Uint8Array(t);for(let r=0;r<e.length;r++)n[r]=e.charCodeAt(r);return t}function Sd(e){return typeof e=="string"?e:new Intl.DateTimeFormat("en-US",{month:"2-digit",day:"2-digit",year:"numeric"}).format(new Date(e))}async function qk(e){try{return e?await Hk.verify(e):!1}catch{return!1}}var $g=(()=>{class e{static needsLicense;static key;#t;#r;#n;#e;constructor(n){let r=this.constructor;if(typeof r.key!="string"||!r.key.trim())throw new tc('LicensingClass requires a static "key". Did you forget @VaultBehavior or @VaultController?');this.#e=sc(),this.#n=r.key,this.#r=n.featureCellKey,r.needsLicense&&this.#i()}#i(){this.#t=this.#e.requestLicense(this.#r,this.#n)}validateLicense(n){if(!this.#t)throw new tc(`validateLicense() called but no license was requested for "${this.#r}" and "${this.#n}".`);this.#e.validateLicense(this.#r,this.#n,this.#t,n)}}return e})(),Pg=class extends $g{behaviorCtx;static type;static key;static critical;static needsLicense;type=w.CoreLicense;critical=!0;key;constructor(t,n){super(n),this.behaviorCtx=n,this.key=t,qk(this.behaviorCtx.licensePayload).then(r=>this.validateLicense(r))}destroy(){Se(`${this.key} - destroy noop`)}reset(){Se(`${this.key} - reset noop`)}};Pg=Rs([SE({type:w.CoreLicense,key:ug("Core","License"),critical:!0,needsLicense:!0,licenseId:LE})],Pg);var Lg=class{#t;#r;#n;#e;cellKey;decisionEngine;#i;#a;#c;#s;#l;#d;#u;privateErrorService=wE();#f=[];#o;#D;#p;vaultMonitor=Vg();constructor(t){this.#t=t.afterTapCallbacks??[],this.#r=t.beforeTapCallbacks??[],this.cellKey=t.cell?.key,this.#s=t.emitStateCallbacks??[],this.#u=t.errorCallbacks??[],this.#f=t.filterCallbacks??[],this.#o=t.initialState,this.#p=t.reducerCallbacks??[]}initializeOrchestrator(t){t.behaviors=t.behaviors??[],this.#b(t)}async initializeFeatureCell(t){await this.#H(t)}destroyBehaviors(t){this.#V(t)}resetBehaviors(t){this.#L(t)}async orchestrate(t,n){t.operation===dn.Replace?await this.#A(t):await this.#F(t,n)}buildControllerCtx(t){return{traceId:t.traceId,featureCellKey:t.featureCellKey,snapshot:t.lastSnapshot,incoming:t.incoming,operation:t.operation}}normalizeIncoming(t){return t?pg(t)||jn(t)||as(t)||as(t)?t:RE(t)?ie(t):{value:t}:null}controllerOutcomeNotification(t,n){switch(t){case qt.Abort:{this.#l.finalizeControllerAbort(n);break}case qt.Deny:{this.#l.finalizeControllerDeny(n);break}}}prepareIncoming(t,n,r){t=this.#g(t,n,r);let i=this.#l.preparePipelineIncoming(t);if(ri(i)&&(this.vaultMonitor.startCoreState(this.cellKey,Ce,t),this.#M(t),this.vaultMonitor.endCoreState(this.cellKey,Ce,t)),Qi(i)){this.vaultMonitor.startCoreState(this.cellKey,Ce,t),this.#L(t),this.#M(t),this.vaultMonitor.endCoreState(this.cellKey,Ce,t);return}return i}#g(t,n,r){return t.incoming=this.normalizeIncoming(n),t.resolveType=this.#$(n),t.operation=r,t}#E(t,n){let r=n.behaviors.filter(i=>i.type===w.Merge);if(r.length>1){let i=r.map(o=>o.key).join(", ");throw new Error(`SDuX Error: More than one MergeBehavior was provided. Only one merge strategy can be active per FeatureCell. Received: ${i}. Fix: Remove additional merge behaviors or combine them into a single behavior.`)}return r.length===1&&(t.push(r[0]),t=t.filter(i=>i.type!==w.Merge)),t}#w(t){let n=t.defaultBehaviors??[];return n=this.#y(n,t),n=this.#E(n,t),n=this.#v(n,t),n=this.#m(n),n}#y(t,n){return n?.errorCallbacks?.length===0?t.filter(r=>r.type!==w.CoreErrorCallback):t}#v(t,n){return n?.emitStateCallbacks?.length===0?t.filter(r=>r.type!==w.CoreEmitState):t}#m(t){return t=t?.filter(n=>n.type!==w.CoreLicense),Ug()&&t.push(Pg),t}#T(t){let n=t.map(r=>{let i=r[Cd];return{key:r.key,type:i.type,critical:i.critical,needsLicense:i.needsLicense}});sc().describeBehaviors({featureCellKey:this.cellKey,behaviors:n})}#b(t){let n=this.#w(t),r=t.behaviors?.filter(a=>!(a.type===w.CoreAfterTap||a.type===w.CoreBeforeTap||a.type===w.CoreError||a.type===w.CoreErrorCallback||a.type===w.CoreEmitState||a.type===w.CoreLicense||a.type===w.CoreState||a.type===w.Filter||a.type===w.FromObservable||a.type===w.FromPromise||a.type===w.FromStream||a.type===w.Reduce||a.type===w.Resolve));t.operators=t.operators??[],t.interceptors=t.interceptors??[];let i=[...n,...r,...t.operators,...t.interceptors];i.some(a=>a.type===w.TabSyncState)&&(i=i.filter(a=>a.type!==w.CoreState));let s=new Og(this.cellKey,t.lastSnapshot,t.state$);this.#T(i),this.#n=s.initializeBehaviors(i,t.behaviorConfigs),this.#x(),this.#R(),this.#I(),this.#_(),s.applyBehaviorExtensions(this.#n,t.cell,this.vaultMonitor)}#I(){this.#e=this.#n.filter(t=>!(t.type===w.CoreState||t.type===w.TabSyncState||t.type===w.CoreEmitState||t.type===w.CoreError||t.type===w.ErrorTransform||t.type===w.CoreErrorCallback||t.type===w.Merge))}#_(){let t=this.#n.filter(i=>i.type===w.TabSyncState),n=this.#n.filter(i=>i.type===w.CoreState),r=t.length>0?t:n;if(r.length>1)throw new Error("Only one core state behavior can be registered for a FeatureCell.");this.#l=r[0]??null,this.#c=this.#n.filter(i=>Uk(i))[0]}#x(){let t=this.#n.filter(n=>n.type===w.CoreError);if(t.length>1)throw new Error("Only one core error behavior can be registered for a FeatureCell.");this.#i=t[0]??null,this.#a=this.#n.filter(n=>Vk(n))[0],this.#d=this.#n.filter(n=>jk(n))}#R(){let t=this.#n.filter(n=>n.type===w.Merge);this.#D=t[0]??null}async#h(t,n,r){let i=await this.#C(t,n,r);return Qi(i)?rc:ri(i)?_d:sg}async#S(t,n){let r,i=await this.#h(w.StepwiseResolve,t,n);if(!Td(i))return i;if(this.#B()){if(r=await this.#j(t,n),ri(r))return _d}else r=n;r=await this.#C(w.Filter,t,r);let o=await this.#h(w.StepwiseFilter,t,r);if(!Td(o))return o;await this.#C(w.CoreBeforeTap,t,ie(r)),r=await this.#C(w.Reduce,t,r);let s=await this.#h(w.StepwiseReducer,t,r);if(!Td(s))return s;await this.#C(w.CoreAfterTap,t,ie(r));let a=ie(r),c=a;return c=await this.#P(w.Encrypt,t,c),await this.#P(w.Persist,t,c),a}async#A(t){this.vaultMonitor.startReplace(this.cellKey,Ce,t),await this.#N(async()=>{let n;if(n=await this.#O(t),!us(n)){let r=await this.#C(w.Resolve,t,void 0);Qi(r)?n=rc:n=await this.#S(t,r)}return this.#k(n,t)},t)}async#F(t,n){this.vaultMonitor.startMerge(this.cellKey,Ce,t),await this.#N(async()=>{let r=ie(t.lastSnapshot.value),i;if(i=await this.#O(t),!us(i)){let o=await this.#C(w.Resolve,t,void 0),s=ie(o);this.vaultMonitor.startComputeMerge(this.cellKey,Ce,t);let a=await this.#D.computeMerge(r,s,n);if(this.vaultMonitor.endComputeMerge(this.cellKey,Ce,t),Qi(a))i=rc;else{let c=ie(a);i=await this.#S(t,c)}}return await this.#k(i,t)},t)}async#k(t,n){let r;return us(t)?r={pipelinePaused:!0}:Qi(t)?r={pipelineStateCleared:!0}:(oc(t)||ri(t))&&(r={noop:!0}),n.operation===dn.Replace?this.vaultMonitor.endReplace(this.cellKey,Ce,n,r):this.vaultMonitor.endMerge(this.cellKey,Ce,n,r),t}async#N(t,n){try{let r=await t();this.vaultMonitor.startCoreState(this.cellKey,Ce,n),us(r)?this.#l.finalizePipelineVaultStop(n):this.#l.finalizePipelineState(r,n),await this.#M(n),this.vaultMonitor.endCoreState(this.cellKey,Ce,n),this.decisionEngine?.notifySuccess(this.buildControllerCtx(n))}catch(r){let i=await this.#U(r,n);await this.decisionEngine?.notifyFailure(this.buildControllerCtx(n),i)}}async#C(t,n,r){let i;t===w.Resolve?i=this.#e.filter(o=>o.resolveType===n.resolveType&&o.type===t):i=this.#e.filter(o=>o.type===t);for(let o of i){let s;try{switch(t){case w.Resolve:typeof o.computeResolve=="function"&&(this.vaultMonitor.startResolve(this.cellKey,o.key,n),s=await o.computeResolve(n),Jn(s)&&(r=ie(s)),this.vaultMonitor.endResolve(this.cellKey,o.key,n));break;case w.StepwiseResolve:case w.StepwiseFilter:case w.StepwiseReducer:if(typeof o.evaluateStepwise=="function"){this.vaultMonitor.startStepwise(this.cellKey,o.key,n);let a=ie(n.lastSnapshot.value),c=ie(r);s=await o.evaluateStepwise(a,c,n.featureCellKey),this.vaultMonitor.endStepwise(this.cellKey,o.key,n)}break;case w.Filter:if(typeof o.applyFilter=="function")for(let a of this.#f){this.vaultMonitor.startFilter(this.cellKey,o.key,n);let c=ie(r),l=await o.applyFilter(c,a);this.vaultMonitor.endFilter(this.cellKey,o.key,n),Jn(l)&&(r=ie(l))}break;case w.CoreBeforeTap:if(typeof o.applyBeforeTap=="function")for(let a of this.#r){this.vaultMonitor.startBeforeTap(this.cellKey,o.key,n);let c=ie(r);await o.applyBeforeTap(c,a),this.vaultMonitor.endBeforeTap(this.cellKey,o.key,n)}break;case w.Reduce:if(typeof o.applyReducer=="function"){if(oc(r)&&this.#p.length>0)throw new Error(`[vault] Reducer stage received undefined state in FeatureCell "${this.cellKey}", but reducers are registered.`);for(let a of this.#p){this.vaultMonitor.startReducer(this.cellKey,o.key,n);let c=ie(r),l=await o.applyReducer(c,a);this.vaultMonitor.endReducer(this.cellKey,o.key,n),Jn(l)&&(r=ie(l))}}break;case w.CoreAfterTap:if(typeof o.applyAfterTap=="function")for(let a of this.#t){this.vaultMonitor.startAfterTap(this.cellKey,o.key,n);let c=ie(r);await o.applyAfterTap(c,a),this.vaultMonitor.endAfterTap(this.cellKey,o.key,n)}break}}catch(a){throw this.vaultMonitor.runtimeError(this.cellKey,o.key,n,a),a}Jn(s)&&(r=ie(s))}return r}async#O(t){let n=this.#e.filter(r=>r.type===w.Interceptor);for(let r of n)try{this.vaultMonitor.startInterceptor(this.cellKey,r.key,t),t.incoming=ie(t.incoming);let i=await r.applyInterceptor(t);if(us(i))return this.vaultMonitor.endInterceptor(this.cellKey,r.key,t,{pipelinePaused:!0}),ag;this.vaultMonitor.endInterceptor(this.cellKey,r.key,t)}catch(i){throw this.vaultMonitor.runtimeError(this.cellKey,r.key,t,i),i}}#B(){return this.#e.filter(n=>n.type===w.Operator).length>0}async#j(t,n){let r=this.#e.filter(i=>i.type===w.Operator);for(let i of r)try{this.vaultMonitor.startOperator(this.cellKey,i.key,t);let o=ie(n),s=await i.applyOperator(o);if(oc(s)){this.vaultMonitor.endOperator(this.cellKey,i.key,t,{noop:!0});return}n=ie(s),this.vaultMonitor.endOperator(this.cellKey,i.key,t)}catch(o){throw this.vaultMonitor.runtimeError(this.cellKey,i.key,t,o),o}return n}async#P(t,n,r){let i;i=this.#e.filter(o=>o.type===t);for(let o of i)try{switch(t){case w.Encrypt:if(typeof o.encryptState=="function"){this.vaultMonitor.startEncrypt(this.cellKey,o.key,n);let s=ie(r),a=await o.encryptState(n,s);this.vaultMonitor.endEncrypt(this.cellKey,o.key,n),Jn(a)&&(r=ie(a))}break;case w.Persist:if(typeof o.persistState=="function"){this.vaultMonitor.startPersist(this.cellKey,o.key,n);let s=ie(r);await o.persistState(s),this.vaultMonitor.endPersist(this.cellKey,o.key,n)}break}}catch(s){throw this.vaultMonitor.runtimeError(this.cellKey,o.key,n,s),s}return r}#V(t){for(let n of this.#n){this.vaultMonitor.startDestroy(this.cellKey,n.key,t);try{n.destroy?.(t),this.vaultMonitor.endDestroy(this.cellKey,n.key,t)}catch(r){yt(`${n.key} destroy() failed`,r),this.vaultMonitor.endDestroy(this.cellKey,n.key,t,{destroyFailed:!0})}}}#L(t){for(let n of this.#n){this.vaultMonitor.startReset(this.cellKey,n.key,t);try{n.reset?.(t),this.vaultMonitor.endReset(this.cellKey,n.key,t)}catch(r){yt(`${n.key} reset() failed`,r),this.vaultMonitor.endReset(this.cellKey,n.key,t,{resetFailed:!0})}}}async#M(t){if(this.#s?.length>0){let n=ie(t.lastSnapshot);this.vaultMonitor.startCoreEmitState(this.cellKey,Ce,t);for(let r of this.#s)await this.#c.emitState(n,r);this.vaultMonitor.endCoreEmitState(this.cellKey,Ce,t)}}async#U(t,n){let r;try{this.vaultMonitor.startCoreError(this.cellKey,Ce,n),r=await this.#i.handleError(t,n.featureCellKey),be(`${this.cellKey} #runErrorBehaviors starting with base ResourceError: ${JSON.stringify(r)}`)}catch(i){yt("[vault] Core error normalization failed",i),r=Yi(t,n.featureCellKey)}finally{this.vaultMonitor.endCoreError(this.cellKey,Ce,n)}for(let i of this.#d)try{this.vaultMonitor.startErrorTransform(this.cellKey,Ce,n);let o=await i.transformError(ie(t),ie(r),ie(n.lastSnapshot));!ri(o)&&!Id(o)&&(r=o)}catch(o){yt(`[vault] ErrorBehavior "${i.key}" threw during error handling`,o)}finally{this.vaultMonitor.endErrorTransform(this.cellKey,Ce,n,r)}try{this.vaultMonitor.startCoreState(this.cellKey,Ce,n),await this.#l.finalizePipelineError(r,n),await this.#M(n)}catch(i){yt("[vault] Failed to finalize error state",i)}finally{this.vaultMonitor.endCoreState(this.cellKey,Ce,n)}try{this.vaultMonitor.startGlobalError(this.cellKey,Ce,n),await this.privateErrorService.setError(ie(r))}catch(i){yt("[vault] global error service",i)}finally{this.vaultMonitor.endGlobalError(this.cellKey,Ce,n)}if(this.#u?.length>0){this.vaultMonitor.startCoreCallbackError(this.cellKey,Ce,n);for(let i of this.#u)try{await this.#a.callbackError(ie(r),ie(n.lastSnapshot),i)}catch(o){yt("[vault] Error callback threw during error handling",o)}this.vaultMonitor.endCoreCallbackError(this.cellKey,Ce,n)}return be(`${this.cellKey} #runErrorBehaviors completed with final ResourceError: ${JSON.stringify(r)}`),r}#$(t){if(pg(t))return ic.HttpResource;if(jn(t))return ic.Observable;if(as(t)||as(t?.value))return ic.Promise;if(fg(t)||fg(t?.value))throw new bd;return ic.Value}async#H(t){let n={value:void 0,loading:!1,error:null},r;if(as(this.#o))r=this.#o;else{let i=this.#z();if(i.length>0){let o=await this.#W(t,i);Jn(o)&&(be("Persisted data loaded from storage"),r=o)}else Id(this.#o)||(this.vaultMonitor.startSetInitialValue(this.cellKey,Ce,t),be("Initialized data loaded from descriptor.initial"),r=this.#o,this.vaultMonitor.endSetInitialValue(this.cellKey,Ce,t))}n.value=r,Id(n.value)?this.decisionEngine?.notifySuccess(this.buildControllerCtx(t)):await this.orchestrate(this.#g(t,n,dn.Replace))}#z(){return this.#e.filter(t=>t.type===w.Persist)}async#W(t,n){let r;for(let o of n)try{if(this.vaultMonitor.startLoadPersist(this.cellKey,o.key,t),r=await o.loadState?.(),Jn(r)){this.vaultMonitor.endLoadPersist(this.cellKey,o.key,t);break}else this.vaultMonitor.endLoadPersist(this.cellKey,o.key,t,{noop:!0})}catch(s){this.vaultMonitor.runtimeError(this.cellKey,o.key,t,s),Se(`"[vault] persist.loadState()" for ${o.key} failed with ${s.message}`)}let i=this.#e.filter(o=>o.type===w.Encrypt);if(Jn(r)&&i.length>0)for(let o of i)try{this.vaultMonitor.startDecrypt(this.cellKey,o.key,t);let s=await o.decryptState?.(t,r);Jn(s)?(this.vaultMonitor.endDecrypt(this.cellKey,o.key,t),r=ie(s)):this.vaultMonitor.endDecrypt(this.cellKey,o.key,t,{noop:!0})}catch(s){this.vaultMonitor.runtimeError(this.cellKey,o.key,t,s),Se(`"[vault] encrypt.decryptState()" for ${o.key} failed with ${s.message}`);return}return r}},ls={Pending:"pending",Approved:"approved",Denied:"denied"},Fg=class{#t=!1;#r;constructor(t){this.#r=t}initializeControllers(t,n,r){if(this.#t)throw new Error(`[vault] VaultControllerRunner already initialized \u2014 cannot reissue core controller ID for feature cell "${this.#r}".`);if(this.#t=!0,!t||t.length===0)return[];let i=new Set;return t.map(o=>{let s=!1;try{if(typeof o!="function")return;let a=o[Dd];if(!a)throw s=!0,new Error(`[vault] Controller "${o.name}" missing @VaultController metadata.`);let c=a.key,l=a.type;if(!c)throw s=!0,new Error('[vault] Controller metadata missing "key".');if(!Ug()&&!VE(c)){be(`[vault] Unlicensed controller "${c}" skipped during initialization.`);return}if(!l)throw s=!0,new Error(`[vault] Controller metadata missing "type" for "${c}".`);let u;if(a.wantsConfig){if(!a.configKey)throw s=!0,new Error(`[vault] Controller "${c}" declares wantsConfig but has no configKey.`);u=r.get(a.configKey)}let d;if(a.needsLicense&&!UE()){if(!a.licenseId)throw s=!0,new Error(`[vault] Controller "${c}" declares needsLicense but has no licenseId.`);if(d=jE(a.licenseId),d===void 0)throw s=!0,new Error(`[vault] License "${a.licenseId}" required by controller "${c}" is not registered in Vault config.`)}let f={featureCellKey:this.#r,requestRevote:m=>{n.next({traceId:m,type:fn.Revote})},requestAbort:m=>{n.next({traceId:m,type:fn.Abort})},controllerConfig:u,licensePayload:d};l===ni.License&&(f.licenseDenied=m=>{n.next({traceId:m,type:fn.LicenseDenied})},f.licenseApproved=m=>{n.next({traceId:m,type:fn.LicenseApproved})});let p=new o(c,f);if(!p.key)throw s=!0,new Error(`[vault] Controller missing key for type "${l}". Every controller must define a unique "key".`);if(!xE(p.key))throw s=!0,new Error(`[vault] Controller key "${p.key}" not valid format for "${l}" controller.`);return p.key&&i.has(p.key)?(Se(`[vault] Skipping duplicate controller with key "${p.key}"`),null):(p.key&&i.add(p.key),p)}catch(a){if(s)throw a;return Se(`[vault] Non-critical controller initialization failed: ${a?.message}`),null}}).filter(o=>!!o)}},Bg=class extends Lg{#t=[];#r=[];#n=new M;#e=!1;#i=!1;#a=ls.Pending;#c=new M;constructor(t){super(t),sc().describeFeature({featureCellKey:t.cell.key,fluentApis:{filters:t.filterCallbacks,reducers:t.reducerCallbacks,beforeTaps:t.beforeTapCallbacks,afterTaps:t.afterTapCallbacks,emitStateCallbacks:t.emitStateCallbacks,errorCallbacks:t.errorCallbacks}}),Je.active&&(this.vaultSettled=this.#_.bind(this)),this.#m(t),this.vaultMonitor.conductorLicenseAttempt(this.cellKey,`${this.cellKey}::license`),this.initializeOrchestrator(t)}initialize(t){let n=this.#p(t,dn.Initialize,void 0);this.#d({behaviorCtx:n,controllerCtx:this.buildControllerCtx(n),options:void 0})}conduct(t,n,r,i){let o=this.#p(t,r,i),s=this.prepareIncoming(o,n,r);if(ri(s)||Qi(s))return;o.incoming=s;let a=this.buildControllerCtx(o);this.#d({behaviorCtx:o,controllerCtx:a,options:i})}reset(t){this.vaultMonitor.startReset(this.cellKey,cs,t),t.traceId=t.traceId??Eg(),this.#g(),this.resetBehaviors(t),this.#w(t),this.vaultMonitor.endReset(this.cellKey,cs,t)}destroy(t){be(`${cs} - destroy`),t.traceId=t.traceId??Eg(),this.vaultMonitor.startDestroy(this.cellKey,cs,t),this.#g(),this.destroyBehaviors(t),this.#E(t),this.#n.complete(),this.vaultMonitor.endDestroy(this.cellKey,cs,t)}async#s(t,n){if(t.operation===dn.Initialize){await this.initializeFeatureCell(t);return}if(t.operation===dn.Replace||t.operation===dn.Merge){await this.orchestrate(t,n);return}this.vaultMonitor.runtimeError(this.cellKey,cs,t,new Error(`Unknown operation type: "${t.operation}"`)),this.#u(t)}#l(){queueMicrotask(()=>{this.#b()})}#d(t){this.#a===ls.Pending||this.#a===ls.Approved?(this.vaultMonitor.startControllerAttempt(this.cellKey,t.behaviorCtx.traceId,t.controllerCtx),this.#t.push(t),this.#a===ls.Approved?!this.#e&&this.#t.length===1?this.#o():this.#i&&this.#l():this.#l()):this.#l()}#u(t){let n=this.#t[0];!n||n.finalized||(n.finalized=!0,queueMicrotask(()=>{this.decisionEngine.notifyFinalize(t),this.#t.shift(),this.#e=!1,this.#I(),this.#o()}))}#f(t,n){this.vaultMonitor.restartControllerAttempt(this.cellKey,t.traceId,t,n),this.#e=!1}async#o(){if(this.#e||!this.#t.length)return;this.#e=!0;let t=this.#t[0];if(!t){this.#e=!1;return}try{let n=await yo(this.#T(t)),r=this.#t[0];if(!r){this.#e=!1;return}let{behaviorCtx:i,options:o}=r,s=!1;switch(n){case qt.Abstain:{be(`${this.cellKey} DecisionOutcome: "${qt.Abstain} received. Process Event dispatched.`),await this.#s(i,o);break}case qt.Abort:{this.controllerOutcomeNotification(qt.Abort,i),this.vaultMonitor.endControllerAttempt(this.cellKey,i.traceId,i,{status:n}),this.#u(i);break}case qt.Deny:{this.#b(),s=!0,this.#e=!1,this.vaultMonitor.notifyConductorDeny(this.cellKey,i.traceId,i),this.controllerOutcomeNotification(qt.Deny,i);break}}if(s)this.#i=!0;else return this.#i=!1,this.#o()}catch(n){yt("[conductor] Unreachable subscription error",n),this.vaultMonitor.conductorCrashed(this.cellKey,t?.controllerCtx.traceId??"unknown",t?.controllerCtx??{traceId:"unknown"},n),this.#t.shift(),this.#o()}}#D(){this.decisionEngine=new kg(this.#r,this.#n),this.#n.subscribe({next:t=>{if(t.type===fn.LicenseDenied){this.vaultMonitor.conductorLicenseDenied(this.cellKey,t.traceId),this.#a=ls.Denied;let r=new Error(`${this.cellKey} Conductor Decision Engine: The FeatureCell received a "License Denied". Pipeline is disabled.`);console.error(`[vault] ${r.message}`),be(r.message),this.privateErrorService.setError(Yi(r,this.cellKey)),this.#t.length=0;return}if(t.type===fn.LicenseApproved){this.vaultMonitor.conductorLicenseApproved(this.cellKey,t.traceId),this.#a=ls.Approved,be(`${this.cellKey} Conductor Decision Engine: License Approved.`),this.#o();return}let n=this.#t[0];if(n){if(n.controllerCtx.traceId!==t.traceId){be(`The head ctx is not the same as the event. ${n.controllerCtx.traceId} != ${t.traceId}`);return}switch(t.type){case fn.Success:{this.vaultMonitor.endControllerAttempt(this.cellKey,n.behaviorCtx.traceId,n.controllerCtx,{status:"success"}),this.#u(n.controllerCtx);break}case fn.Failure:{this.vaultMonitor.endControllerAttempt(this.cellKey,n.behaviorCtx.traceId,n.controllerCtx,{status:"failure"}),this.#f(n.behaviorCtx,t.type);break}case fn.Abort:{this.vaultMonitor.conductorAbort(this.cellKey,t.traceId,n.controllerCtx),be(`${this.cellKey} Conductor Decision Engine: Abort request received for Behavior TraceId: ${n.controllerCtx.traceId}.`),this.#u(n.controllerCtx);break}case fn.Revote:{be(`${this.cellKey} Conductor Decision Engine: Revote request received for Behavior TraceId: ${n.controllerCtx.traceId}.`),this.vaultMonitor.conductorRevote(this.cellKey,t.traceId,n.controllerCtx),this.#e=!1,be(`${this.cellKey} Conductor Decision Engine: processQueue event dispatched for Behavior TraceId: ${n.controllerCtx.traceId}.`),this.#o();break}}}}})}#p(t,n,r){let i=Eg();return{destroyed$:t.destroyed$,reset$:t.reset$,state$:t.state$,featureCellKey:t.featureCellKey,state:t.state,lastSnapshot:t.lastSnapshot,options:r!=null?ie(r):r,traceId:i,operation:n,resolveType:void 0,incoming:void 0}}#g(){this.#t.length=0,this.#e=!1}#E(t){for(let n of this.#r){this.vaultMonitor.startDestroy(this.cellKey,n.key,t);try{n.destroy?.(),this.vaultMonitor.endDestroy(this.cellKey,n.key,t)}catch(r){yt(`${n.key} destroy() failed`,r),this.vaultMonitor.endDestroy(this.cellKey,n.key,t,{destroyFailed:!0})}}}#w(t){for(let n of this.#r){this.vaultMonitor.startReset(this.cellKey,n.key,t);try{n.reset?.(),this.vaultMonitor.endReset(this.cellKey,n.key,t)}catch(r){yt(`${n.key} reset() failed`,r),this.vaultMonitor.endReset(this.cellKey,n.key,t,{resetFailed:!0})}}}#y(t,n){let r=n.controllers.filter(i=>i.type===ni.Error);if(r.length>1){let i=r.map(o=>o.key).join(", ");throw new Error(`SDuX Error: More than one ErrorController was provided. Only one error policy can be active per FeatureCell. Received: ${i}. Fix: Remove additional error controllers or combine them into a single controller.`)}r.length===1?t.push(r[0]):t.unshift(Tg)}#v(t){return t.filter(n=>n.type===ni.License||n.type===ni.CoreAbstain?(be(`${this.cellKey} Conductor: Filtering out controller "${n.key}" of type "${n.type}" as it is reserved for internal use.`),!1):!0)}#m(t){t.controllers=t.controllers??[];let n=this.#v(t.controllers);this.#y(n,t),n.unshift(Sg),n.unshift(wg);let r=n.map(o=>{let s=o[Dd];return{key:o.key,type:s.type,critical:s.critical,needsLicense:s.needsLicense}});sc().describeControllers({featureCellKey:this.cellKey,controllers:r});let i=new Fg(t.cell.key);this.#r=i.initializeControllers(n,this.#n,t.behaviorConfigs),this.#D()}#T(t){return this.vaultMonitor.startControllerVote(this.cellKey,t.controllerCtx.traceId,t.controllerCtx),this.decisionEngine.evaluateAttempt(t.controllerCtx)?.pipe(He(n=>{this.vaultMonitor.endControllerVote(this.cellKey,t.controllerCtx.traceId,t.controllerCtx,n)}),ee(n=>n.outcome))}#b(){Je.active&&this.#c.next()}#I(){!Je.active||this.#t.length>0||queueMicrotask(()=>{this.#c.next()})}#_(){return yo(this.#c)}},Kt="vault-feature-cell";function Kk(e,t=[]){if(typeof e.initialState=="object"&&e.initialState!==null&&"data"in e.initialState)throw new Error(`[vault] Invalid FeatureCelldescriptorModel.initial for feature "${e.key}". Expected raw data (e.g., [] or {}), but received an object with resource fields { loading, data, error }. Pass plain data to avoid double-wrapping.`);if(t.filter(r=>r.type===w.Encrypt).length>1)throw new Error("[vault] FeatureCell cannot register multiple encryption behaviors.")}var jg=class{featureCellConfiguration;defaultBehaviors;behaviors;controllers;#t=!1;#r;#n=!1;#e=Vg();cell;cellKey;ctx;destroyed$=new M;reset$=new M;state$=new M;constructor(t,n,r,i){this.featureCellConfiguration=t,this.defaultBehaviors=n,this.behaviors=r,this.controllers=i,this.cellKey=this.featureCellConfiguration.key,this.ctx=this.#i()}#i(){let t=this.destroyed$.asObservable(),n=this.state$,r=this.reset$.asObservable(),i={isLoading:!1,value:void 0,error:null,hasValue:!1},o={destroyed$:t,featureCellKey:this.cellKey,reset$:r,state$:n,get state(){let s=this.lastSnapshot;return{isLoading:s.isLoading,value:s.value,error:s.error,hasValue:s.hasValue}}};return Object.defineProperty(o,"lastSnapshot",{value:i,writable:!1,configurable:!1,enumerable:!0}),o}reset(){this.#e.startReset(this.cellKey,Kt,this.ctx),Se(`${Kt}: reset`),this.#a(),this.reset$.next(),this.#r?.reset(this.ctx),this.#e.endReset(this.cellKey,Kt,this.ctx)}destroy(){this.#e.startDestroy(this.cellKey,Kt,this.ctx),Se(`${Kt}: destroy`),this.reset$.next(),this.reset$.complete(),this.#r?.destroy(this.ctx),this.destroyed$.next(),this.destroyed$.complete(),this.state$.complete(),this.#e.endDestroy(this.cellKey,Kt,this.ctx)}#a(){if(this.#t){let t=`[vault] FeatureCell "${this.featureCellConfiguration.key}" encountered a critical initialization failure and is now in a corrupted state. Further use is blocked.`;throw this.#e.runtimeError(this.cellKey,Kt,this.ctx,t),new Error(t)}if(!this.#n){let t=`[vault] FeatureCell "${this.featureCellConfiguration.key}" has not been initialized. You must call cell.initialize() before using state methods.`;throw this.#e.runtimeError(this.cellKey,Kt,this.ctx,t),new Error(t)}}#c(t){if(this.#n){let n=`[vault] FeatureCell "${this.featureCellConfiguration.key}" already initialized.`;throw this.#e.runtimeError(this.cellKey,Kt,this.ctx,n),new Error(n)}try{this.#e.registerCell(this.cellKey,this.featureCellConfiguration.insights),this.#e.startInitialized(this.cellKey,Kt,this.ctx),Kk(this.featureCellConfiguration,this.behaviors),this.#n=!0,this.#r=new Bg({afterTapCallbacks:t.afterTapCallbacks,beforeTapCallbacks:t.beforeTapCallbacks,behaviors:this.behaviors,behaviorConfigs:t.behaviorConfigs,cell:this.cell,defaultBehaviors:this.defaultBehaviors,controllers:this.controllers,emitStateCallbacks:t.emitStateCallbacks,errorCallbacks:t.errorCallbacks,filterCallbacks:t.filterFunctions,initialState:t.hydrate||this.featureCellConfiguration.initialState,interceptors:t.interceptors,lastSnapshot:this.ctx.lastSnapshot,operators:t.operators,reducerCallbacks:t.reducerFunctions,state$:this.state$}),this.#r.initialize(this.ctx),Je.active&&(Object.defineProperty(this.cell,"vaultSettled",{enumerable:!1,configurable:!1,writable:!1,value:()=>this.#r.vaultSettled()}),Bk(this.cellKey,this.#r.vaultSettled.bind(this.#r))),this.#e.endInitialized(this.cellKey,Kt,this.ctx)}catch(n){throw this.#t=!0,this.#e.runtimeError(this.cellKey,Kt,this.ctx,n),n}}#s(t){throw this.#t=!0,this.#e.runtimeError(this.cellKey,Kt,this.ctx,t),new Error(t)}setup(){let t=[],n=[],r=[],i=[],o,s=[],a=[],c=[],l=[],u=new Map,d={behaviorConfigs:u,afterTaps:f=>(this.#n&&this.#s('Cannot call "afterTaps" after initialize(). Configuration must be done before initialization.'),Array.isArray(f)&&t.push(...f),d),beforeTaps:f=>(this.#n&&this.#s('Cannot call "beforeTaps" after initialize(). Configuration must be done before initialization.'),Array.isArray(f)&&n.push(...f),d),emitStates:f=>(this.#n&&this.#s('Cannot call "emitStates" after initialize(). Configuration must be done before initialization.'),Array.isArray(f)&&l.push(...f),d),errors:f=>(this.#n&&this.#s('Cannot call "errors" after initialize(). Configuration must be done before initialization.'),Array.isArray(f)&&r.push(...f),d),filters:f=>(this.#n&&this.#s('Cannot call "filters" after initialize(). Configuration must be done before initialization.'),Array.isArray(f)&&i.push(...f),d),hydrate:f=>(this.#n&&this.#s('Cannot call "hydrate" after initialize(). Configuration must be done before initialization.'),o=f,d),initialize:()=>{this.#c({afterTapCallbacks:t,beforeTapCallbacks:n,behaviorConfigs:u,emitStateCallbacks:l,errorCallbacks:r,filterFunctions:i,hydrate:o,interceptors:s,operators:a,reducerFunctions:c})},interceptors:f=>(this.#n&&this.#s('Cannot call "interceptors" after initialize(). Configuration must be done before initialization.'),Array.isArray(f)&&s.push(...f),d),operators:f=>(this.#n&&this.#s('Cannot call "operators" after initialize(). Configuration must be done before initialization.'),Array.isArray(f)&&a.push(...f),d),reducers:f=>(this.#n&&this.#s('Cannot call "reducers" after initialize(). Configuration must be done before initialization.'),Array.isArray(f)&&c.push(...f),d)};return d}mergeState(t,n){return this.#a(),this.#r.conduct(this.ctx,t,dn.Merge,n)}replaceState(t,n){return this.#a(),this.#r.conduct(this.ctx,t,dn.Replace,n)}},kd=class extends jg{constructor(t,n,r,i){super(t,n,r,i)}build(){let t=this.setup(),n=this.ctx,r={afterTaps:t.afterTaps,beforeTaps:t.beforeTaps,destroy:this.destroy.bind(this),destroyed$:this.destroyed$.asObservable(),errors:t.errors,filters:t.filters,hydrate:t.hydrate,initialize:t.initialize,interceptors:t.interceptors,key:this.cellKey,mergeState:this.mergeState.bind(this),operators:t.operators,reducers:t.reducers,emitStates:t.emitStates,replaceState:this.replaceState.bind(this),reset$:this.reset$.asObservable(),reset:this.reset.bind(this),state$:this.state$.asObservable(),get state(){return{isLoading:n.lastSnapshot.isLoading,value:n.lastSnapshot.value,error:n.lastSnapshot.error,hasValue:n.lastSnapshot.hasValue}}};return this.cell=r,this.behaviors.forEach(i=>{i?.installFluentApi?.(this.cell,t.behaviorConfigs)}),this.controllers.forEach(i=>{i?.installFluentApi?.(this.cell,t.behaviorConfigs)}),Object.defineProperty(r,"ctx",{value:this.ctx,enumerable:!1,writable:!1}),Object.defineProperty(r,"key",{value:this.featureCellConfiguration.key,enumerable:!1,writable:!1}),r}},Ji=new Map,PE=new Map;function Zk(e,t){if(t){if(Ji.has(e)){if(!Je.active){let r=Ji.get(e);throw new Error(`[vault] Duplicate FeatureCell key detected: "${e}". Each FeatureCell must have a unique key. Existing token: "${r?.key}"`)}return Ji.get(e)}let n={key:e};return Ji.set(e,n),n}if(!Ji.has(e))throw new Error(`[vault] FeatureCell token not found for key "${e}". You must call provideFeatureCell() before retrieving this FeatureCell.`);if(PE.has(e)){if(!Je.active)throw new Error(`[vault] FeatureCell "${e}" can only be owned by a single consumer.`);return Ji.get(e)}return PE.set(e,!0),Ji.get(e)}function HE(e){return Zk(e,!0)}var ac={FEATURE_CELL_KEY:"vault:feature-cell-key",FEATURE_CELL_STATE:"vault:feature-cell-state"};function Hg(e){return function(t){t[ac.FEATURE_CELL_KEY]=e,t[ac.FEATURE_CELL_STATE]=null}}var eo=new Map,zE=new Map;function WE(e,t){let n=eo.get(e);if(t){if(eo.has(e)){if(!Xn.active)throw new Error(`[vault] Duplicate FeatureCell key detected: "${e}". Each FeatureCell must have a unique key. Existing token: "${e}"`);return eo.get(e)}return n=new _(`FEATURE_CELL:${e}`),eo.set(e,n),n}else{if(!eo.has(e))throw new Error(`[vault] FeatureCell token not found for key "${e}". You must call provideFeatureCell() before retrieving this FeatureCell.`);if(zE.has(e)){if(!Xn.active)throw new Error(`[vault] FeatureCell "${e}" can only be injected into a single decorated @FeatureCell service.`);return eo.get(e)}return zE.set(e,!0),eo.get(e)}}function GE(e){return WE(e,!0)}function qE(e){return WE(e,!1)}function zg(e){let t=e;if(!t)throw new Error("injectVault() must be called inside a @FeatureCell()-decorated service and must be given the class reference.");let n=t[ac.FEATURE_CELL_KEY];if(!n)throw new Error("injectVault() must be called inside a @FeatureCell()-decorated service.");let r=qE(n);return h(r)}var Yk="@sdux-vault/core",Qk="0.9.0";Ki(Yk,Qk);var Wg="external";var On=class extends $g{constructor(n,r){super(r);this.behaviorCtx=r;this.key=n}type=On.type;critical=On.critical;key;commitState(n,r,i){y(`${this.key} commitState called with: ${ae(r)}`);try{if(!!r&&Object.keys(r).length>0){let a=pd(r);Object.assign(n.lastSnapshot,a),n.lastSnapshot.hasValue=n.lastSnapshot.value!==void 0&&n.lastSnapshot.value!==null}let s={snapshot:pd(n.lastSnapshot),type:i};n.options&&(s.options=n.options),n.state$.next(s)}catch(o){Zi(`${this.key} an error occurred updating the state`,o)}}preparePipelineIncoming(n){let r=n.incoming,i={};return os(r)||Xa(r)&&is(r.value)?(this.commitState(n,null,gt.IncomingPipeline),kn):Xa(r)&&ti(r.value)?(os(r.loading)||(i.isLoading=r.loading),hd(r.error)&&(i.error=is(r.error)?null:Xe(r.error,Wg)),this.commitState(n,i,gt.IncomingPipeline),ln):(ss(r)?i.isLoading=!0:Xa(r)&&(os(r?.loading)||(i.isLoading=r.loading),hd(r?.error)&&(i.error=is(r.error)?null:Xe(r.error,Wg))),Object.keys(i).length>0&&this.commitState(n,i,gt.IncomingPipeline),r)}finalizePipelineState(n,r){if(y(`${this.key} - finalizeVaultState`),ss(r.incoming)&&this.commitState(r,{isLoading:!1},gt.FinalizePipeline),Qm(n)){this.commitState(r,null,gt.FinalizePipeline);return}if(is(n)||Xm(n)){this.commitState(r,{value:void 0},gt.FinalizePipeline);return}!os(n)&&!$E(n)&&this.commitState(r,{value:n},gt.FinalizePipeline)}finalizePipelineVaultStop(n){y(`${this.key} - finalizePipelineVaultStop`),this.commitState(n,null,gt.FinalizePipeline)}finalizePipelineError(n,r){y(`${this.key} - finalizePipelineError`),this.commitState(r,{error:n,value:r.lastSnapshot.value,isLoading:!1},gt.PipelineError)}finalizeControllerAbort(n){y(`${this.key} - finalizeAbort`),this.commitState(n,{isLoading:!1},gt.AbortController)}finalizeControllerDeny(n){y(`${this.key} - finalizeDeny`),this.commitState(n,{isLoading:!1},gt.DenyController)}destroy(n){N(`${this.key} - destroy`),this.commitState(n,{isLoading:!1,value:void 0,error:null},gt.PipelineDestroy)}reset(n){N(`${this.key} - reset`),this.commitState(n,{isLoading:!1,value:void 0,error:null},gt.PipelineReset)}};b(On,"type"),b(On,"critical"),On=Q([ne({type:U.CoreState,key:re("Core","State"),critical:!0})],On);var Pn=class extends Ya{critical=Pn.critical;constructor(t,n){super(t,n)}async callbackError(t,n,r){if(typeof r!="function")N(`${this.key} handleError skipped - "${r}" is not a function.`);else try{await r(t,n)}catch(i){N(`${this.key} oldschoolCallback threw: ${i}`)}}};b(Pn,"type"),b(Pn,"key"),b(Pn,"critical"),Pn=Q([ne({type:U.CoreErrorCallback,key:re("Core","ErrorCallback"),critical:!0})],Pn);var wr=class{constructor(t,n){this.behaviorCtx=n;this.key=t}critical=!0;key;type=U.CoreError;handleError(t,n){return Xe(t,n)}destroy(){N(`${this.key} - destroy "noop"`)}reset(){N(`${this.key} - reset "noop"`)}};b(wr,"type"),b(wr,"key"),b(wr,"critical"),wr=Q([ne({type:U.CoreError,key:re("Core","Error"),critical:!0})],wr);var pn,KE,ZE,YE,Nd,Tr=class{constructor(t,n){this.behaviorCtx=n;so(this,pn);b(this,"type",U.Filter);b(this,"critical",!0);b(this,"key");this.key=t}applyFilter(t,n){if(y(`${this.key} applyFilter called with "${ae(t)}".`),t===void 0){y(`${this.key} applyFilter skipped - not a valid plain state. The current type is ${typeof t}. Undefined returned.`);return}if(typeof n!="function")return y(`${this.key} applyFilter skipped. The filter type is ${typeof n}. "${ae(t)}" returned.`),t;let r;try{r=n(t)}catch(i){throw Zi(`${this.key} filter execution failed`,i.message),i}return r===void 0?(y(`${this.key} Filter returned undefined. state rejected.`),ln):(nr(this,pn,KE).call(this,t,r)||nr(this,pn,ZE).call(this,t,r)||(nr(this,pn,YE).call(this,t,r),y(`${this.key} applyFilter returned with "${ae(r)}".`)),r)}destroy(){N(`${this.key} - destroy "noop"`)}reset(){N(`${this.key} - reset "noop"`)}};pn=new WeakSet,KE=function(t,n){if(Array.isArray(t)){if(!Array.isArray(n))throw nr(this,pn,Nd).call(this,t,n),new Error("[vault] Filter returned non-array for array input.");return!0}return!1},ZE=function(t,n){if(t!==null&&typeof t=="object"){if(typeof n!="object"||n===null||Array.isArray(n))throw nr(this,pn,Nd).call(this,t,n),new Error("[vault] Filter returned invalid object for object input.");return!0}return!1},YE=function(t,n){if(typeof n!=typeof t)throw nr(this,pn,Nd).call(this,t,n),new Error(`[vault] Filter returned a value of incorrect type. Expected "${typeof t}", got "${typeof n}".`)},Nd=function(t,n){y(`${this.key} The types not aligned. Current type: "${typeof t}". Next type: ${typeof n}. "${ae(n)}" returned.`)},b(Tr,"type"),b(Tr,"key"),b(Tr,"critical"),Tr=Q([ne({type:U.Filter,key:re("Core","Filter"),critical:!0})],Tr);var hn=class{constructor(t,n){this.behaviorCtx=n;this.key=t}type=hn.type;key;critical=hn.critical;computeMerge(t,n,r){let i=t,o=n,s=r?.clearUndefined??!1;return y(`${this.key} merge called (clear: ${s})`),o===void 0&&!s?(y(`${this.key} computeMerge skipped. The next value "${o}" and clear is "${s}`),i):o===void 0&&s?(y(`${this.key} computeMerge skipped. The next value "${o}" and clear is "${s}`),kn):Array.isArray(i)&&Array.isArray(o)?(y(`${this.key} merging array. Return clone of next`),[...o]):(y(`${this.key} non-array branch. Return next`),o)}destroy(){N(`${this.key} - destroy "noop"`)}reset(){N(`${this.key} - reset "noop"`)}};b(hn,"type"),b(hn,"key"),b(hn,"critical",!0),hn=Q([ne({type:U.Merge,key:re("Core","ArrayMerge"),critical:!0})],hn);function QE(e){e.fromObservable=function(t){return t}}var bt=class{constructor(t,n){this.behaviorCtx=n;this.key=t}type=bt.type;key;critical=bt.critical;resolveType=bt.resolveType;extendCellAPI(t){return{fromObservable:n=>new P(r=>{y(`${this.key} fromObservable called.`);let i=t.destroyed$??pe,o=t.reset$??pe,s=n.pipe(ye(o),ye(i),wt(1)).subscribe({next:a=>{y(`${this.key} fromObservable emitted value "${ae(a)}".`),r.next({loading:!1,value:a,error:null})},error:a=>{let c=Xe(a,t.featureCellKey);r.error(c),y(`${this.key} fromObservable emitted error "${c.message}".`)},complete:()=>{r.complete(),y(`${this.key} fromObservable completed.`)}});return()=>{s.unsubscribe(),y(`${this.key} fromObservable subscription unsubscribed.`)}})}}destroy(){N(`${this.key} - destroy "noop"`)}reset(){N(`${this.key} - reset "noop"`)}};b(bt,"extension",QE),b(bt,"type"),b(bt,"key"),b(bt,"resolveType"),b(bt,"critical"),bt=Q([ne({type:U.FromObservable,key:re("Core","FromObservable"),critical:!1,resolveType:Gt.Observable})],bt);function XE(e){e.fromDeferred=function(t){throw new Error("[vault] fromDeferred() behavior not installed")},e.fromPromise=function(t){throw new Error("[vault] fromPromise() behavior not installed")}}var Ct=class{constructor(t,n){this.behaviorCtx=n;this.key=t}type=Ct.type;key;critical=Ct.critical;resolveType=Ct.resolveType;extendCellAPI(t){let n=r=>new Promise((i,o)=>{if(y(`${this.key} fromPromise called.`),ti(r)){i({loading:!1,value:void 0,error:null});return}if(!Qa(r)){let a=r;i({loading:a?.loading??!1,value:void 0,error:a?.error??null});return}let s;try{s=r.value?.()}catch(a){let c=Xe(a,t.featureCellKey);o(c);return}Promise.resolve(s).then(a=>{y(`${this.key} fromPromise resolved value: ${ae(a)}`),i({loading:r.loading??!1,value:a,error:r.error??null})}).catch(a=>{let c=Xe(a,t.featureCellKey);o(c)})});return{fromPromise:r=>n(r),fromDeferred:r=>n(r)}}destroy(){N(`${this.key} - destroy "noop"`)}reset(){N(`${this.key} - reset "noop"`)}};b(Ct,"extension",XE),b(Ct,"type"),b(Ct,"key"),b(Ct,"critical"),b(Ct,"resolveType"),Ct=Q([ne({type:U.FromPromise,key:re("Core","FromPromise"),critical:!1,resolveType:Gt.Promise})],Ct);var Ir=class{constructor(t,n){this.behaviorCtx=n;this.key=t}critical=!0;type=U.Reduce;key;applyReducer(t,n){return y(`${this.key} applyReducer called with "${ae(t)}".`),typeof n!="function"?(y(`${this.key} applyReducer skipped - reducer is not a function.`),t):n(t)}destroy(){N(`${this.key} - destroy "noop"`)}reset(){N(`${this.key} - reset "noop"`)}};b(Ir,"type"),b(Ir,"key"),b(Ir,"critical"),Ir=Q([ne({type:U.Reduce,key:re("Core","Reducer"),critical:!0})],Ir);var mn=class{constructor(t,n){this.behaviorCtx=n;this.key=t}type=U.Resolve;key;critical=!1;resolveType=mn.resolveType;async computeResolve(t){let n=t.incoming;if(y(`${this.key} computeResolve called with incoming: ${ae(n)}`),!jn(n)){y(`${this.key} computeResolve skipped \u2014 incoming is not an Observable.`);return}y(`${this.key} computeResolve detected Observable input.`);let r=n,i=t.reset$??pe,o=t.destroyed$??pe;try{let s=await yo(r.pipe(ye(i),ye(o),wt(1)));return y(`${this.key} computeResolve resolved value: ${ae(s)}`),s}catch(s){let a=Xe(s,t.featureCellKey);throw y(`${this.key} computeResolve caught error: ${a.message}`),a}}destroy(){N(`${this.key} - destroy "noop"`)}reset(){N(`${this.key} - reset "noop"`)}};b(mn,"type"),b(mn,"key"),b(mn,"critical"),b(mn,"resolveType"),mn=Q([ne({type:U.Resolve,key:re("Core","Observable"),critical:!1,resolveType:Gt.Observable})],mn);var kt=class{constructor(t,n){this.behaviorCtx=n;this.key=t}type=kt.type;key;critical=kt.critical;resolveType=kt.resolveType;async computeResolve(t){let n=t.incoming;if(y(`${this.key} computeResolve promise called with incoming: ${ae(n)}`),!(Qa(n)||md(n))||ti(n)){y(`${this.key} computeResolve skipped \u2014 incoming is not a deferred factory.`);return}y(`${this.key} computeResolve detected Promise input.`);try{let r;return md(n)?r=await n?.():r=await n.value?.(),y(`${this.key} computeResolve resolved value: ${ae(r)}`),r}catch(r){let i=Xe(r,t.featureCellKey);throw y(`${this.key} computeResolve caught error: ${i.message}`),i}}destroy(){N(`${this.key} - destroy "noop"`)}reset(){N(`${this.key} - reset "noop"`)}};b(kt,"type"),b(kt,"key"),b(kt,"critical"),b(kt,"resolveType"),kt=Q([ne({type:U.Resolve,key:re("Core","Promise"),critical:!1,resolveType:Gt.Promise})],kt);var Nt=class{constructor(t,n){this.behaviorCtx=n;this.key=t}type=Nt.type;critical=Nt.critical;key;resolveType=Nt.resolveType;async computeResolve(t){y(`${this.key} computeResolve called with "${ae(t.incoming)}".`);let n=t.incoming;if(!n||ss(n)){y(`${this.key} computeResolve skipped - not a valid plain state.`);return}let{value:r}=n;if(r===void 0){y(`${this.key} value is undefined and resolution skipped.`);return}return r===null?(y(`${this.key} value is null and clear state returned.`),kn):Array.isArray(r)?(y(`${this.key} array value detected and cloned.`),[...r]):typeof r=="object"?(y(`${this.key} object value detected and cloned.`),g({},r)):(y(`${this.key} primitive value detected and returned.`),r)}destroy(){N(`${this.key} - destroy "noop"`)}reset(){N(`${this.key} - reset "noop"`)}};b(Nt,"type"),b(Nt,"key"),b(Nt,"critical"),b(Nt,"resolveType"),Nt=Q([ne({type:U.Resolve,key:re("Core","Value"),critical:!0,resolveType:Gt.Value})],Nt);function JE(e){e.fromStream=function(t,n){}}var Dt=class{constructor(t,n){this.behaviorCtx=n;this.key=t}type=Dt.type;key;critical=Dt.critical;resolveType=Dt.resolveType;extendCellAPI(t){return{fromStream:(n,r)=>{let{autoResetError:i=!0}=r??{};y(`${this.key} fromStream called.`),y(`${this.key} fromStream options resolved (autoResetError=${i}).`),t.vaultMonitor.ingressSubscribed(t.featureCellKey,this.key,t,"fromStream"),y(`${this.key} fromStream subscription started.`),n.pipe(ye(t.destroyed$)).subscribe({next:o=>{y(`${this.key} subscription.next called.`),y(`${this.key} incoming value received: "${ae(o)}".`),i&&y(`${this.key} autoResetError enabled \u2192 clearing error.`);let s=i?{value:o,error:null}:{value:o};t.mergeState(s),y(`${this.key} mergeState invoked from stream.next.`)},error:o=>{y(`${this.key} subscription.error called.`);let s=Xe(o,this.key);y(`${this.key} stream error converted to VaultError: "${s.message}".`),t.mergeState({error:s}),y(`${this.key} mergeState invoked from stream.error.`)},complete:()=>{y(`${this.key} subscription.complete called.`),t.vaultMonitor.ingressCompleted(t.featureCellKey,this.key,t,"fromStream"),y(`${this.key} fromStream completed.`)}})}}}destroy(){N(`${this.key} - destroy "noop"`)}reset(){N(`${this.key} - reset "noop"`)}};b(Dt,"extension",JE),b(Dt,"type"),b(Dt,"key"),b(Dt,"critical"),b(Dt,"resolveType"),Dt=Q([ne({type:U.FromStream,key:re("Core","FromStream"),critical:!1,resolveType:Gt.Observable})],Dt);var Sr=class{constructor(t,n){this.behaviorCtx=n;this.key=t}type=U.CoreEmitState;critical=!0;key;emitState(t,n){if(y(`${this.key} emitState called with "${ae(t)}".`),typeof n!="function")return y(`${this.key} emitState skipped. The emitState type is ${typeof n}. "${ae(t)}" returned.`),ln;try{n(t)}catch(r){return Zi(`${this.key} emitState execution failed`,ae(r)),ln}}destroy(){N(`${this.key} - destroy "noop"`)}reset(){N(`${this.key} - reset "noop"`)}};b(Sr,"type"),b(Sr,"key"),b(Sr,"critical"),Sr=Q([ne({type:U.CoreEmitState,key:re("Core","EmitState"),critical:!0})],Sr);var ds=class{constructor(t,n){this.behaviorCtx=n;this.key=t}static type;static key;static critical=!0;critical=!0;key;type;executeTap(t,n){y(`${this.key} executeTap called with "${ae(t)}".`),typeof n!="function"&&y(`${this.key} executeTap skipped - tap is not a function. Type is "${typeof n}".`),n(t)}destroy(){N(`${this.key} - destroy "noop"`)}reset(){N(`${this.key} - reset "noop"`)}};var fs=class extends ds{type=U.CoreAfterTap;applyAfterTap(t,n){this.executeTap(t,n)}};fs=Q([ne({type:U.CoreAfterTap,key:re("Core","AfterTap"),critical:!0})],fs);var ps=class extends ds{type=U.CoreBeforeTap;applyBeforeTap(t,n){this.executeTap(t,n)}};ps=Q([ne({type:U.CoreBeforeTap,key:re("Core","BeforeTap"),critical:!0})],ps);function Gg(e,t=[],n=[]){return HE(e.key),BE({key:e.key}),new kd(e,Xk(),t,n).build()}function Xk(){return[fs,ps,wr,Tr,bt,Ct,Dt,mn,kt,Ir,Nt,On,Pn,hn,Sr]}var Od=class{constructor(t){this.core=t;this.#t.add(this.core.state$.subscribe(n=>{this.#e.set(n?.snapshot?.isLoading??!1),this.#n.set(n?.snapshot?.error??null),this.#r.set(n?.snapshot?.value??void 0)})),this.#a.onDestroy(()=>this.destroy())}#t=new oe;#r=ze(void 0);#n=ze(null);#e=ze(!1);#i=St(()=>{let t=this.#r();return t!=null});#a=h(Qe);build(){let t=this.core;return Object.defineProperty(t,"state",{configurable:!0,enumerable:!0,get:()=>({isLoading:this.#e.asReadonly(),value:this.#r.asReadonly(),error:this.#n.asReadonly(),hasValue:this.#i})}),t}destroy(){this.core.destroy(),this.#t.unsubscribe()}};function qg(e,t,n=[],r=[]){return[{provide:GE(t.key),useFactory:()=>{let o=Gg(t,n,r);return new Od(o).build()}},e]}function Kg(e={}){return gu(()=>{FE(e)})}var Jk="@sdux-vault/angular",eN="0.11.0";Ki(Jk,eN);var cc=class{_attachedHost=null;attach(t){return this._attachedHost=t,t.attach(this)}detach(){let t=this._attachedHost;t!=null&&(this._attachedHost=null,t.detach())}get isAttached(){return this._attachedHost!=null}setAttachedHost(t){this._attachedHost=t}},Zg=class extends cc{component;viewContainerRef;injector;projectableNodes;bindings;constructor(t,n,r,i,o){super(),this.component=t,this.viewContainerRef=n,this.injector=r,this.projectableNodes=i,this.bindings=o||null}},hs=class extends cc{templateRef;viewContainerRef;context;injector;constructor(t,n,r,i){super(),this.templateRef=t,this.viewContainerRef=n,this.context=r,this.injector=i}get origin(){return this.templateRef.elementRef}attach(t,n=this.context){return this.context=n,super.attach(t)}detach(){return this.context=void 0,super.detach()}},Yg=class extends cc{element;constructor(t){super(),this.element=t instanceof we?t.nativeElement:t}},Qg=class{_attachedPortal=null;_disposeFn=null;_isDisposed=!1;hasAttached(){return!!this._attachedPortal}attach(t){if(t instanceof Zg)return this._attachedPortal=t,this.attachComponentPortal(t);if(t instanceof hs)return this._attachedPortal=t,this.attachTemplatePortal(t);if(this.attachDomPortal&&t instanceof Yg)return this._attachedPortal=t,this.attachDomPortal(t)}attachDomPortal=null;detach(){this._attachedPortal&&(this._attachedPortal.setAttachedHost(null),this._attachedPortal=null),this._invokeDisposeFn()}dispose(){this.hasAttached()&&this.detach(),this._invokeDisposeFn(),this._isDisposed=!0}setDisposeFn(t){this._disposeFn=t}_invokeDisposeFn(){this._disposeFn&&(this._disposeFn(),this._disposeFn=null)}};var ew=(()=>{class e extends hs{constructor(){let n=h(jt),r=h(Vt);super(n,r)}static \u0275fac=function(r){return new(r||e)};static \u0275dir=Ie({type:e,selectors:[["","cdkPortal",""]],exportAs:["cdkPortal"],features:[Sn]})}return e})(),Xg=(()=>{class e extends Qg{_moduleRef=h(pr,{optional:!0});_document=h(de);_viewContainerRef=h(Vt);_isInitialized=!1;_attachedRef=null;constructor(){super()}get portal(){return this._attachedPortal}set portal(n){this.hasAttached()&&!n&&!this._isInitialized||(this.hasAttached()&&super.detach(),n&&super.attach(n),this._attachedPortal=n||null)}attached=new X;get attachedRef(){return this._attachedRef}ngOnInit(){this._isInitialized=!0}ngOnDestroy(){super.dispose(),this._attachedRef=this._attachedPortal=null}attachComponentPortal(n){n.setAttachedHost(this);let r=n.viewContainerRef!=null?n.viewContainerRef:this._viewContainerRef,i=r.createComponent(n.component,{index:r.length,injector:n.injector||r.injector,projectableNodes:n.projectableNodes||void 0,ngModuleRef:this._moduleRef||void 0,bindings:n.bindings||void 0});return r!==this._viewContainerRef&&this._getRootNode().appendChild(i.hostView.rootNodes[0]),super.setDisposeFn(()=>i.destroy()),this._attachedPortal=n,this._attachedRef=i,this.attached.emit(i),i}attachTemplatePortal(n){n.setAttachedHost(this);let r=this._viewContainerRef.createEmbeddedView(n.templateRef,n.context,{injector:n.injector});return super.setDisposeFn(()=>this._viewContainerRef.clear()),this._attachedPortal=n,this._attachedRef=r,this.attached.emit(r),r}attachDomPortal=n=>{let r=n.element;r.parentNode;let i=this._document.createComment("dom-portal");n.setAttachedHost(this),r.parentNode.insertBefore(i,r),this._getRootNode().appendChild(r),this._attachedPortal=n,super.setDisposeFn(()=>{i.parentNode&&i.parentNode.replaceChild(r,i)})};_getRootNode(){let n=this._viewContainerRef.element.nativeElement;return n.nodeType===n.ELEMENT_NODE?n:n.parentNode}static \u0275fac=function(r){return new(r||e)};static \u0275dir=Ie({type:e,selectors:[["","cdkPortalOutlet",""]],inputs:{portal:[0,"cdkPortalOutlet","portal"]},outputs:{attached:"attached"},exportAs:["cdkPortalOutlet"],features:[Sn]})}return e})();var Pd=new WeakMap,lc=(()=>{class e{_appRef;_injector=h(Te);_environmentInjector=h(ke);load(n){let r=this._appRef=this._appRef||this._injector.get(gr),i=Pd.get(r);i||(i={loaders:new Set,refs:[]},Pd.set(r,i),r.onDestroy(()=>{Pd.get(r)?.refs.forEach(o=>o.destroy()),Pd.delete(r)})),i.loaders.has(n)||(i.loaders.add(n),i.refs.push(Yh(n,{environmentInjector:this._environmentInjector})))}static \u0275fac=function(r){return new(r||e)};static \u0275prov=C({token:e,factory:e.\u0275fac,providedIn:"root"})}return e})();var tw=(()=>{class e{static \u0275fac=function(r){return new(r||e)};static \u0275cmp=Fe({type:e,selectors:[["structural-styles"]],decls:0,vars:0,template:function(r,i){},styles:[`.mat-focus-indicator {
  position: relative;
}
.mat-focus-indicator::before {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  box-sizing: border-box;
  pointer-events: none;
  display: var(--mat-focus-indicator-display, none);
  border-width: var(--mat-focus-indicator-border-width, 3px);
  border-style: var(--mat-focus-indicator-border-style, solid);
  border-color: var(--mat-focus-indicator-border-color, transparent);
  border-radius: var(--mat-focus-indicator-border-radius, 4px);
}
.mat-focus-indicator:focus-visible::before {
  content: "";
}

@media (forced-colors: active) {
  html {
    --mat-focus-indicator-display: block;
  }
}
`],encapsulation:2,changeDetection:0})}return e})();function uc(e){return e.buttons===0||e.detail===0}function dc(e){let t=e.touches&&e.touches[0]||e.changedTouches&&e.changedTouches[0];return!!t&&t.identifier===-1&&(t.radiusX==null||t.radiusX===1)&&(t.radiusY==null||t.radiusY===1)}var Jg;function nw(){if(Jg==null){let e=typeof document<"u"?document.head:null;Jg=!!(e&&(e.createShadowRoot||e.attachShadow))}return Jg}function ey(e){if(nw()){let t=e.getRootNode?e.getRootNode():null;if(typeof ShadowRoot<"u"&&ShadowRoot&&t instanceof ShadowRoot)return t}return null}function Mr(e){return e.composedPath?e.composedPath()[0]:e.target}var ty;try{ty=typeof Intl<"u"&&Intl.v8BreakIterator}catch{ty=!1}var Ot=(()=>{class e{_platformId=h(Fi);isBrowser=this._platformId?f_(this._platformId):typeof document=="object"&&!!document;EDGE=this.isBrowser&&/(edge)/i.test(navigator.userAgent);TRIDENT=this.isBrowser&&/(msie|trident)/i.test(navigator.userAgent);BLINK=this.isBrowser&&!!(window.chrome||ty)&&typeof CSS<"u"&&!this.EDGE&&!this.TRIDENT;WEBKIT=this.isBrowser&&/AppleWebKit/i.test(navigator.userAgent)&&!this.BLINK&&!this.EDGE&&!this.TRIDENT;IOS=this.isBrowser&&/iPad|iPhone|iPod/.test(navigator.userAgent)&&!("MSStream"in window);FIREFOX=this.isBrowser&&/(firefox|minefield)/i.test(navigator.userAgent);ANDROID=this.isBrowser&&/android/i.test(navigator.userAgent)&&!this.TRIDENT;SAFARI=this.isBrowser&&/safari/i.test(navigator.userAgent)&&this.WEBKIT;constructor(){}static \u0275fac=function(r){return new(r||e)};static \u0275prov=C({token:e,factory:e.\u0275fac,providedIn:"root"})}return e})();var fc;function rw(){if(fc==null&&typeof window<"u")try{window.addEventListener("test",null,Object.defineProperty({},"passive",{get:()=>fc=!0}))}finally{fc=fc||!1}return fc}function ms(e){return rw()?e:!!e.capture}function Ld(e,t=0){return iw(e)?Number(e):arguments.length===2?t:0}function iw(e){return!isNaN(parseFloat(e))&&!isNaN(Number(e))}function gn(e){return e instanceof we?e.nativeElement:e}var ow=new _("cdk-input-modality-detector-options"),sw={ignoreKeys:[18,17,224,91,16]},aw=650,ny={passive:!0,capture:!0},cw=(()=>{class e{_platform=h(Ot);_listenerCleanups;modalityDetected;modalityChanged;get mostRecentModality(){return this._modality.value}_mostRecentTarget=null;_modality=new Re(null);_options;_lastTouchMs=0;_onKeydown=n=>{this._options?.ignoreKeys?.some(r=>r===n.keyCode)||(this._modality.next("keyboard"),this._mostRecentTarget=Mr(n))};_onMousedown=n=>{Date.now()-this._lastTouchMs<aw||(this._modality.next(uc(n)?"keyboard":"mouse"),this._mostRecentTarget=Mr(n))};_onTouchstart=n=>{if(dc(n)){this._modality.next("keyboard");return}this._lastTouchMs=Date.now(),this._modality.next("touch"),this._mostRecentTarget=Mr(n)};constructor(){let n=h(K),r=h(de),i=h(ow,{optional:!0});if(this._options=g(g({},sw),i),this.modalityDetected=this._modality.pipe(Os(1)),this.modalityChanged=this.modalityDetected.pipe(sl()),this._platform.isBrowser){let o=h(en).createRenderer(null,null);this._listenerCleanups=n.runOutsideAngular(()=>[o.listen(r,"keydown",this._onKeydown,ny),o.listen(r,"mousedown",this._onMousedown,ny),o.listen(r,"touchstart",this._onTouchstart,ny)])}}ngOnDestroy(){this._modality.complete(),this._listenerCleanups?.forEach(n=>n())}static \u0275fac=function(r){return new(r||e)};static \u0275prov=C({token:e,factory:e.\u0275fac,providedIn:"root"})}return e})(),pc=(function(e){return e[e.IMMEDIATE=0]="IMMEDIATE",e[e.EVENTUAL=1]="EVENTUAL",e})(pc||{}),lw=new _("cdk-focus-monitor-default-options"),Fd=ms({passive:!0,capture:!0}),ry=(()=>{class e{_ngZone=h(K);_platform=h(Ot);_inputModalityDetector=h(cw);_origin=null;_lastFocusOrigin=null;_windowFocused=!1;_windowFocusTimeoutId;_originTimeoutId;_originFromTouchInteraction=!1;_elementInfo=new Map;_monitoredElementCount=0;_rootNodeFocusListenerCount=new Map;_detectionMode;_windowFocusListener=()=>{this._windowFocused=!0,this._windowFocusTimeoutId=setTimeout(()=>this._windowFocused=!1)};_document=h(de);_stopInputModalityDetector=new M;constructor(){let n=h(lw,{optional:!0});this._detectionMode=n?.detectionMode||pc.IMMEDIATE}_rootNodeFocusAndBlurListener=n=>{let r=Mr(n);for(let i=r;i;i=i.parentElement)n.type==="focus"?this._onFocus(n,i):this._onBlur(n,i)};monitor(n,r=!1){let i=gn(n);if(!this._platform.isBrowser||i.nodeType!==1)return I();let o=ey(i)||this._document,s=this._elementInfo.get(i);if(s)return r&&(s.checkChildren=!0),s.subject;let a={checkChildren:r,subject:new M,rootNode:o};return this._elementInfo.set(i,a),this._registerGlobalListeners(a),a.subject}stopMonitoring(n){let r=gn(n),i=this._elementInfo.get(r);i&&(i.subject.complete(),this._setClasses(r),this._elementInfo.delete(r),this._removeGlobalListeners(i))}focusVia(n,r,i){let o=gn(n),s=this._document.activeElement;o===s?this._getClosestElementsInfo(o).forEach(([a,c])=>this._originChanged(a,r,c)):(this._setOrigin(r),typeof o.focus=="function"&&o.focus(i))}ngOnDestroy(){this._elementInfo.forEach((n,r)=>this.stopMonitoring(r))}_getWindow(){return this._document.defaultView||window}_getFocusOrigin(n){return this._origin?this._originFromTouchInteraction?this._shouldBeAttributedToTouch(n)?"touch":"program":this._origin:this._windowFocused&&this._lastFocusOrigin?this._lastFocusOrigin:n&&this._isLastInteractionFromInputLabel(n)?"mouse":"program"}_shouldBeAttributedToTouch(n){return this._detectionMode===pc.EVENTUAL||!!n?.contains(this._inputModalityDetector._mostRecentTarget)}_setClasses(n,r){n.classList.toggle("cdk-focused",!!r),n.classList.toggle("cdk-touch-focused",r==="touch"),n.classList.toggle("cdk-keyboard-focused",r==="keyboard"),n.classList.toggle("cdk-mouse-focused",r==="mouse"),n.classList.toggle("cdk-program-focused",r==="program")}_setOrigin(n,r=!1){this._ngZone.runOutsideAngular(()=>{if(this._origin=n,this._originFromTouchInteraction=n==="touch"&&r,this._detectionMode===pc.IMMEDIATE){clearTimeout(this._originTimeoutId);let i=this._originFromTouchInteraction?aw:1;this._originTimeoutId=setTimeout(()=>this._origin=null,i)}})}_onFocus(n,r){let i=this._elementInfo.get(r),o=Mr(n);!i||!i.checkChildren&&r!==o||this._originChanged(r,this._getFocusOrigin(o),i)}_onBlur(n,r){let i=this._elementInfo.get(r);!i||i.checkChildren&&n.relatedTarget instanceof Node&&r.contains(n.relatedTarget)||(this._setClasses(r),this._emitOrigin(i,null))}_emitOrigin(n,r){n.subject.observers.length&&this._ngZone.run(()=>n.subject.next(r))}_registerGlobalListeners(n){if(!this._platform.isBrowser)return;let r=n.rootNode,i=this._rootNodeFocusListenerCount.get(r)||0;i||this._ngZone.runOutsideAngular(()=>{r.addEventListener("focus",this._rootNodeFocusAndBlurListener,Fd),r.addEventListener("blur",this._rootNodeFocusAndBlurListener,Fd)}),this._rootNodeFocusListenerCount.set(r,i+1),++this._monitoredElementCount===1&&(this._ngZone.runOutsideAngular(()=>{this._getWindow().addEventListener("focus",this._windowFocusListener)}),this._inputModalityDetector.modalityDetected.pipe(ye(this._stopInputModalityDetector)).subscribe(o=>{this._setOrigin(o,!0)}))}_removeGlobalListeners(n){let r=n.rootNode;if(this._rootNodeFocusListenerCount.has(r)){let i=this._rootNodeFocusListenerCount.get(r);i>1?this._rootNodeFocusListenerCount.set(r,i-1):(r.removeEventListener("focus",this._rootNodeFocusAndBlurListener,Fd),r.removeEventListener("blur",this._rootNodeFocusAndBlurListener,Fd),this._rootNodeFocusListenerCount.delete(r))}--this._monitoredElementCount||(this._getWindow().removeEventListener("focus",this._windowFocusListener),this._stopInputModalityDetector.next(),clearTimeout(this._windowFocusTimeoutId),clearTimeout(this._originTimeoutId))}_originChanged(n,r,i){this._setClasses(n,r),this._emitOrigin(i,r),this._lastFocusOrigin=r}_getClosestElementsInfo(n){let r=[];return this._elementInfo.forEach((i,o)=>{(o===n||i.checkChildren&&o.contains(n))&&r.push([o,i])}),r}_isLastInteractionFromInputLabel(n){let{_mostRecentTarget:r,mostRecentModality:i}=this._inputModalityDetector;if(i!=="mouse"||!r||r===n||n.nodeName!=="INPUT"&&n.nodeName!=="TEXTAREA"||n.disabled)return!1;let o=n.labels;if(o){for(let s=0;s<o.length;s++)if(o[s].contains(r))return!0}return!1}static \u0275fac=function(r){return new(r||e)};static \u0275prov=C({token:e,factory:e.\u0275fac,providedIn:"root"})}return e})(),iy=(()=>{class e{_elementRef=h(we);_focusMonitor=h(ry);_monitorSubscription;_focusOrigin=null;cdkFocusChange=new X;constructor(){}get focusOrigin(){return this._focusOrigin}ngAfterViewInit(){let n=this._elementRef.nativeElement;this._monitorSubscription=this._focusMonitor.monitor(n,n.nodeType===1&&n.hasAttribute("cdkMonitorSubtreeFocus")).subscribe(r=>{this._focusOrigin=r,this.cdkFocusChange.emit(r)})}ngOnDestroy(){this._focusMonitor.stopMonitoring(this._elementRef),this._monitorSubscription?.unsubscribe()}static \u0275fac=function(r){return new(r||e)};static \u0275dir=Ie({type:e,selectors:[["","cdkMonitorElementFocus",""],["","cdkMonitorSubtreeFocus",""]],outputs:{cdkFocusChange:"cdkFocusChange"},exportAs:["cdkMonitorFocus"]})}return e})();var uw=new Set,to,oy=(()=>{class e{_platform=h(Ot);_nonce=h(Fo,{optional:!0});_matchMedia;constructor(){this._matchMedia=this._platform.isBrowser&&window.matchMedia?window.matchMedia.bind(window):nN}matchMedia(n){return(this._platform.WEBKIT||this._platform.BLINK)&&tN(n,this._nonce),this._matchMedia(n)}static \u0275fac=function(r){return new(r||e)};static \u0275prov=C({token:e,factory:e.\u0275fac,providedIn:"root"})}return e})();function tN(e,t){if(!uw.has(e))try{to||(to=document.createElement("style"),t&&to.setAttribute("nonce",t),to.setAttribute("type","text/css"),document.head.appendChild(to)),to.sheet&&(to.sheet.insertRule(`@media ${e} {body{ }}`,0),uw.add(e))}catch(n){console.error(n)}}function nN(e){return{matches:e==="all"||e==="",media:e,addListener:()=>{},removeListener:()=>{}}}function rN(e){if(e.type==="characterData"&&e.target instanceof Comment)return!0;if(e.type==="childList"){for(let t=0;t<e.addedNodes.length;t++)if(!(e.addedNodes[t]instanceof Comment))return!1;for(let t=0;t<e.removedNodes.length;t++)if(!(e.removedNodes[t]instanceof Comment))return!1;return!0}return!1}var iN=(()=>{class e{create(n){return typeof MutationObserver>"u"?null:new MutationObserver(n)}static \u0275fac=function(r){return new(r||e)};static \u0275prov=C({token:e,factory:e.\u0275fac,providedIn:"root"})}return e})(),oN=(()=>{class e{_mutationObserverFactory=h(iN);_observedElements=new Map;_ngZone=h(K);constructor(){}ngOnDestroy(){this._observedElements.forEach((n,r)=>this._cleanupObserver(r))}observe(n){let r=gn(n);return new P(i=>{let s=this._observeElement(r).pipe(ee(a=>a.filter(c=>!rN(c))),ge(a=>!!a.length)).subscribe(a=>{this._ngZone.run(()=>{i.next(a)})});return()=>{s.unsubscribe(),this._unobserveElement(r)}})}_observeElement(n){return this._ngZone.runOutsideAngular(()=>{if(this._observedElements.has(n))this._observedElements.get(n).count++;else{let r=new M,i=this._mutationObserverFactory.create(o=>r.next(o));i&&i.observe(n,{characterData:!0,childList:!0,subtree:!0}),this._observedElements.set(n,{observer:i,stream:r,count:1})}return this._observedElements.get(n).stream})}_unobserveElement(n){this._observedElements.has(n)&&(this._observedElements.get(n).count--,this._observedElements.get(n).count||this._cleanupObserver(n))}_cleanupObserver(n){if(this._observedElements.has(n)){let{observer:r,stream:i}=this._observedElements.get(n);r&&r.disconnect(),i.complete(),this._observedElements.delete(n)}}static \u0275fac=function(r){return new(r||e)};static \u0275prov=C({token:e,factory:e.\u0275fac,providedIn:"root"})}return e})(),dw=(()=>{class e{_contentObserver=h(oN);_elementRef=h(we);event=new X;get disabled(){return this._disabled}set disabled(n){this._disabled=n,this._disabled?this._unsubscribe():this._subscribe()}_disabled=!1;get debounce(){return this._debounce}set debounce(n){this._debounce=Ld(n),this._subscribe()}_debounce;_currentSubscription=null;constructor(){}ngAfterContentInit(){!this._currentSubscription&&!this.disabled&&this._subscribe()}ngOnDestroy(){this._unsubscribe()}_subscribe(){this._unsubscribe();let n=this._contentObserver.observe(this._elementRef);this._currentSubscription=(this.debounce?n.pipe(mi(this.debounce)):n).subscribe(this.event)}_unsubscribe(){this._currentSubscription?.unsubscribe()}static \u0275fac=function(r){return new(r||e)};static \u0275dir=Ie({type:e,selectors:[["","cdkObserveContent",""]],inputs:{disabled:[2,"cdkObserveContentDisabled","disabled",ot],debounce:"debounce"},outputs:{event:"cdkObserveContent"},exportAs:["cdkObserveContent"]})}return e})();var sN=200,Bd=class{_letterKeyStream=new M;_items=[];_selectedItemIndex=-1;_pressedLetters=[];_skipPredicateFn;_selectedItem=new M;selectedItem=this._selectedItem;constructor(t,n){let r=typeof n?.debounceInterval=="number"?n.debounceInterval:sN;n?.skipPredicate&&(this._skipPredicateFn=n.skipPredicate),this.setItems(t),this._setupKeyHandler(r)}destroy(){this._pressedLetters=[],this._letterKeyStream.complete(),this._selectedItem.complete()}setCurrentSelectedItemIndex(t){this._selectedItemIndex=t}setItems(t){this._items=t}handleKey(t){let n=t.keyCode;t.key&&t.key.length===1?this._letterKeyStream.next(t.key.toLocaleUpperCase()):(n>=65&&n<=90||n>=48&&n<=57)&&this._letterKeyStream.next(String.fromCharCode(n))}isTyping(){return this._pressedLetters.length>0}reset(){this._pressedLetters=[]}_setupKeyHandler(t){this._letterKeyStream.pipe(He(n=>this._pressedLetters.push(n)),mi(t),ge(()=>this._pressedLetters.length>0),ee(()=>this._pressedLetters.join("").toLocaleUpperCase())).subscribe(n=>{for(let r=1;r<this._items.length+1;r++){let i=(this._selectedItemIndex+r)%this._items.length,o=this._items[i];if(!this._skipPredicateFn?.(o)&&o.getLabel?.().toLocaleUpperCase().trim().indexOf(n)===0){this._selectedItem.next(o);break}}this._pressedLetters=[]})}};function jd(e,...t){return t.length?t.some(n=>e[n]):e.altKey||e.shiftKey||e.ctrlKey||e.metaKey}var Vd=class{_items;_activeItemIndex=ze(-1);_activeItem=ze(null);_wrap=!1;_typeaheadSubscription=oe.EMPTY;_itemChangesSubscription;_vertical=!0;_horizontal=null;_allowedModifierKeys=[];_homeAndEnd=!1;_pageUpAndDown={enabled:!1,delta:10};_effectRef;_typeahead;_skipPredicateFn=t=>t.disabled;constructor(t,n){this._items=t,t instanceof fr?this._itemChangesSubscription=t.changes.subscribe(r=>this._itemsChanged(r.toArray())):ha(t)&&(this._effectRef=Qs(()=>this._itemsChanged(t()),{injector:n}))}tabOut=new M;change=new M;skipPredicate(t){return this._skipPredicateFn=t,this}withWrap(t=!0){return this._wrap=t,this}withVerticalOrientation(t=!0){return this._vertical=t,this}withHorizontalOrientation(t){return this._horizontal=t,this}withAllowedModifierKeys(t){return this._allowedModifierKeys=t,this}withTypeAhead(t=200){this._typeaheadSubscription.unsubscribe();let n=this._getItemsArray();return this._typeahead=new Bd(n,{debounceInterval:typeof t=="number"?t:void 0,skipPredicate:r=>this._skipPredicateFn(r)}),this._typeaheadSubscription=this._typeahead.selectedItem.subscribe(r=>{this.setActiveItem(r)}),this}cancelTypeahead(){return this._typeahead?.reset(),this}withHomeAndEnd(t=!0){return this._homeAndEnd=t,this}withPageUpDown(t=!0,n=10){return this._pageUpAndDown={enabled:t,delta:n},this}setActiveItem(t){let n=this._activeItem();this.updateActiveItem(t),this._activeItem()!==n&&this.change.next(this._activeItemIndex())}onKeydown(t){let n=t.keyCode,i=["altKey","ctrlKey","metaKey","shiftKey"].every(o=>!t[o]||this._allowedModifierKeys.indexOf(o)>-1);switch(n){case 9:this.tabOut.next();return;case 40:if(this._vertical&&i){this.setNextItemActive();break}else return;case 38:if(this._vertical&&i){this.setPreviousItemActive();break}else return;case 39:if(this._horizontal&&i){this._horizontal==="rtl"?this.setPreviousItemActive():this.setNextItemActive();break}else return;case 37:if(this._horizontal&&i){this._horizontal==="rtl"?this.setNextItemActive():this.setPreviousItemActive();break}else return;case 36:if(this._homeAndEnd&&i){this.setFirstItemActive();break}else return;case 35:if(this._homeAndEnd&&i){this.setLastItemActive();break}else return;case 33:if(this._pageUpAndDown.enabled&&i){let o=this._activeItemIndex()-this._pageUpAndDown.delta;this._setActiveItemByIndex(o>0?o:0,1);break}else return;case 34:if(this._pageUpAndDown.enabled&&i){let o=this._activeItemIndex()+this._pageUpAndDown.delta,s=this._getItemsArray().length;this._setActiveItemByIndex(o<s?o:s-1,-1);break}else return;default:(i||jd(t,"shiftKey"))&&this._typeahead?.handleKey(t);return}this._typeahead?.reset(),t.preventDefault()}get activeItemIndex(){return this._activeItemIndex()}get activeItem(){return this._activeItem()}isTyping(){return!!this._typeahead&&this._typeahead.isTyping()}setFirstItemActive(){this._setActiveItemByIndex(0,1)}setLastItemActive(){this._setActiveItemByIndex(this._getItemsArray().length-1,-1)}setNextItemActive(){this._activeItemIndex()<0?this.setFirstItemActive():this._setActiveItemByDelta(1)}setPreviousItemActive(){this._activeItemIndex()<0&&this._wrap?this.setLastItemActive():this._setActiveItemByDelta(-1)}updateActiveItem(t){let n=this._getItemsArray(),r=typeof t=="number"?t:n.indexOf(t),i=n[r];this._activeItem.set(i??null),this._activeItemIndex.set(r),this._typeahead?.setCurrentSelectedItemIndex(r)}destroy(){this._typeaheadSubscription.unsubscribe(),this._itemChangesSubscription?.unsubscribe(),this._effectRef?.destroy(),this._typeahead?.destroy(),this.tabOut.complete(),this.change.complete()}_setActiveItemByDelta(t){this._wrap?this._setActiveInWrapMode(t):this._setActiveInDefaultMode(t)}_setActiveInWrapMode(t){let n=this._getItemsArray();for(let r=1;r<=n.length;r++){let i=(this._activeItemIndex()+t*r+n.length)%n.length,o=n[i];if(!this._skipPredicateFn(o)){this.setActiveItem(i);return}}}_setActiveInDefaultMode(t){this._setActiveItemByIndex(this._activeItemIndex()+t,t)}_setActiveItemByIndex(t,n){let r=this._getItemsArray();if(r[t]){for(;this._skipPredicateFn(r[t]);)if(t+=n,!r[t])return;this.setActiveItem(t)}}_getItemsArray(){return ha(this._items)?this._items():this._items instanceof fr?this._items.toArray():this._items}_itemsChanged(t){this._typeahead?.setItems(t);let n=this._activeItem();if(n){let r=t.indexOf(n);r>-1&&r!==this._activeItemIndex()&&(this._activeItemIndex.set(r),this._typeahead?.setCurrentSelectedItemIndex(r))}}};var hc=class extends Vd{_origin="program";setFocusOrigin(t){return this._origin=t,this}setActiveItem(t){super.setActiveItem(t),this.activeItem&&this.activeItem.focus(this._origin)}};var sy={},mc=class e{_appId=h(Lo);static _infix=`a${Math.floor(Math.random()*1e5).toString()}`;getId(t,n=!1){return this._appId!=="ng"&&(t+=this._appId),sy.hasOwnProperty(t)||(sy[t]=0),`${t}${n?e._infix+"-":""}${sy[t]++}`}static \u0275fac=function(n){return new(n||e)};static \u0275prov=C({token:e,factory:e.\u0275fac,providedIn:"root"})};var aN=new _("cdk-dir-doc",{providedIn:"root",factory:()=>h(de)}),cN=/^(ar|ckb|dv|he|iw|fa|nqo|ps|sd|ug|ur|yi|.*[-_](Adlm|Arab|Hebr|Nkoo|Rohg|Thaa))(?!.*[-_](Latn|Cyrl)($|-|_))($|-|_)/i;function fw(e){let t=e?.toLowerCase()||"";return t==="auto"&&typeof navigator<"u"&&navigator?.language?cN.test(navigator.language)?"rtl":"ltr":t==="rtl"?"rtl":"ltr"}var gs=(()=>{class e{get value(){return this.valueSignal()}valueSignal=ze("ltr");change=new X;constructor(){let n=h(aN,{optional:!0});if(n){let r=n.body?n.body.dir:null,i=n.documentElement?n.documentElement.dir:null;this.valueSignal.set(fw(r||i||"ltr"))}}ngOnDestroy(){this.change.complete()}static \u0275fac=function(r){return new(r||e)};static \u0275prov=C({token:e,factory:e.\u0275fac,providedIn:"root"})}return e})();var pw=(()=>{class e{static \u0275fac=function(r){return new(r||e)};static \u0275mod=nn({type:e});static \u0275inj=Lt({})}return e})();var ay=class{_box;_destroyed=new M;_resizeSubject=new M;_resizeObserver;_elementObservables=new Map;constructor(t){this._box=t,typeof ResizeObserver<"u"&&(this._resizeObserver=new ResizeObserver(n=>this._resizeSubject.next(n)))}observe(t){return this._elementObservables.has(t)||this._elementObservables.set(t,new P(n=>{let r=this._resizeSubject.subscribe(n);return this._resizeObserver?.observe(t,{box:this._box}),()=>{this._resizeObserver?.unobserve(t),r.unsubscribe(),this._elementObservables.delete(t)}}).pipe(ge(n=>n.some(r=>r.target===t)),cl({bufferSize:1,refCount:!0}),ye(this._destroyed))),this._elementObservables.get(t)}destroy(){this._destroyed.next(),this._destroyed.complete(),this._resizeSubject.complete(),this._elementObservables.clear()}},hw=(()=>{class e{_cleanupErrorListener;_observers=new Map;_ngZone=h(K);constructor(){typeof ResizeObserver<"u"}ngOnDestroy(){for(let[,n]of this._observers)n.destroy();this._observers.clear(),this._cleanupErrorListener?.()}observe(n,r){let i=r?.box||"content-box";return this._observers.has(i)||this._observers.set(i,new ay(i)),this._observers.get(i).observe(n)}static \u0275fac=function(r){return new(r||e)};static \u0275prov=C({token:e,factory:e.\u0275fac,providedIn:"root"})}return e})();var Ln=(function(e){return e[e.NORMAL=0]="NORMAL",e[e.NEGATED=1]="NEGATED",e[e.INVERTED=2]="INVERTED",e})(Ln||{}),Ud,no;function mw(){if(no==null){if(typeof document!="object"||!document||typeof Element!="function"||!Element)return no=!1,no;if(document.documentElement?.style&&"scrollBehavior"in document.documentElement.style)no=!0;else{let e=Element.prototype.scrollTo;e?no=!/\{\s*\[native code\]\s*\}/.test(e.toString()):no=!1}}return no}function ys(){if(typeof document!="object"||!document)return Ln.NORMAL;if(Ud==null){let e=document.createElement("div"),t=e.style;e.dir="rtl",t.width="1px",t.overflow="auto",t.visibility="hidden",t.pointerEvents="none",t.position="absolute";let n=document.createElement("div"),r=n.style;r.width="2px",r.height="1px",e.appendChild(n),document.body.appendChild(e),Ud=Ln.NORMAL,e.scrollLeft===0&&(e.scrollLeft=1,Ud=e.scrollLeft===0?Ln.NEGATED:Ln.INVERTED),e.remove()}return Ud}var lN=20,uN=(()=>{class e{_ngZone=h(K);_platform=h(Ot);_renderer=h(en).createRenderer(null,null);_cleanupGlobalListener;constructor(){}_scrolled=new M;_scrolledCount=0;scrollContainers=new Map;register(n){this.scrollContainers.has(n)||this.scrollContainers.set(n,n.elementScrolled().subscribe(()=>this._scrolled.next(n)))}deregister(n){let r=this.scrollContainers.get(n);r&&(r.unsubscribe(),this.scrollContainers.delete(n))}scrolled(n=lN){return this._platform.isBrowser?new P(r=>{this._cleanupGlobalListener||(this._cleanupGlobalListener=this._ngZone.runOutsideAngular(()=>this._renderer.listen("document","scroll",()=>this._scrolled.next())));let i=n>0?this._scrolled.pipe(il(n)).subscribe(r):this._scrolled.subscribe(r);return this._scrolledCount++,()=>{i.unsubscribe(),this._scrolledCount--,this._scrolledCount||(this._cleanupGlobalListener?.(),this._cleanupGlobalListener=void 0)}}):I()}ngOnDestroy(){this._cleanupGlobalListener?.(),this._cleanupGlobalListener=void 0,this.scrollContainers.forEach((n,r)=>this.deregister(r)),this._scrolled.complete()}ancestorScrolled(n,r){let i=this.getAncestorScrollContainers(n);return this.scrolled(r).pipe(ge(o=>!o||i.indexOf(o)>-1))}getAncestorScrollContainers(n){let r=[];return this.scrollContainers.forEach((i,o)=>{this._scrollableContainsElement(o,n)&&r.push(o)}),r}_scrollableContainsElement(n,r){let i=gn(r),o=n.getElementRef().nativeElement;do if(i==o)return!0;while(i=i.parentElement);return!1}static \u0275fac=function(r){return new(r||e)};static \u0275prov=C({token:e,factory:e.\u0275fac,providedIn:"root"})}return e})(),gw=(()=>{class e{elementRef=h(we);scrollDispatcher=h(uN);ngZone=h(K);dir=h(gs,{optional:!0});_scrollElement=this.elementRef.nativeElement;_destroyed=new M;_renderer=h(Bi);_cleanupScroll;_elementScrolled=new M;constructor(){}ngOnInit(){this._cleanupScroll=this.ngZone.runOutsideAngular(()=>this._renderer.listen(this._scrollElement,"scroll",n=>this._elementScrolled.next(n))),this.scrollDispatcher.register(this)}ngOnDestroy(){this._cleanupScroll?.(),this._elementScrolled.complete(),this.scrollDispatcher.deregister(this),this._destroyed.next(),this._destroyed.complete()}elementScrolled(){return this._elementScrolled}getElementRef(){return this.elementRef}scrollTo(n){let r=this.elementRef.nativeElement,i=this.dir&&this.dir.value=="rtl";n.left==null&&(n.left=i?n.end:n.start),n.right==null&&(n.right=i?n.start:n.end),n.bottom!=null&&(n.top=r.scrollHeight-r.clientHeight-n.bottom),i&&ys()!=Ln.NORMAL?(n.left!=null&&(n.right=r.scrollWidth-r.clientWidth-n.left),ys()==Ln.INVERTED?n.left=n.right:ys()==Ln.NEGATED&&(n.left=n.right?-n.right:n.right)):n.right!=null&&(n.left=r.scrollWidth-r.clientWidth-n.right),this._applyScrollToOptions(n)}_applyScrollToOptions(n){let r=this.elementRef.nativeElement;mw()?r.scrollTo(n):(n.top!=null&&(r.scrollTop=n.top),n.left!=null&&(r.scrollLeft=n.left))}measureScrollOffset(n){let r="left",i="right",o=this.elementRef.nativeElement;if(n=="top")return o.scrollTop;if(n=="bottom")return o.scrollHeight-o.clientHeight-o.scrollTop;let s=this.dir&&this.dir.value=="rtl";return n=="start"?n=s?i:r:n=="end"&&(n=s?r:i),s&&ys()==Ln.INVERTED?n==r?o.scrollWidth-o.clientWidth-o.scrollLeft:o.scrollLeft:s&&ys()==Ln.NEGATED?n==r?o.scrollLeft+o.scrollWidth-o.clientWidth:-o.scrollLeft:n==r?o.scrollLeft:o.scrollWidth-o.clientWidth-o.scrollLeft}static \u0275fac=function(r){return new(r||e)};static \u0275dir=Ie({type:e,selectors:[["","cdk-scrollable",""],["","cdkScrollable",""]]})}return e})(),dN=20,yw=(()=>{class e{_platform=h(Ot);_listeners;_viewportSize=null;_change=new M;_document=h(de);constructor(){let n=h(K),r=h(en).createRenderer(null,null);n.runOutsideAngular(()=>{if(this._platform.isBrowser){let i=o=>this._change.next(o);this._listeners=[r.listen("window","resize",i),r.listen("window","orientationchange",i)]}this.change().subscribe(()=>this._viewportSize=null)})}ngOnDestroy(){this._listeners?.forEach(n=>n()),this._change.complete()}getViewportSize(){this._viewportSize||this._updateViewportSize();let n={width:this._viewportSize.width,height:this._viewportSize.height};return this._platform.isBrowser||(this._viewportSize=null),n}getViewportRect(){let n=this.getViewportScrollPosition(),{width:r,height:i}=this.getViewportSize();return{top:n.top,left:n.left,bottom:n.top+i,right:n.left+r,height:i,width:r}}getViewportScrollPosition(){if(!this._platform.isBrowser)return{top:0,left:0};let n=this._document,r=this._getWindow(),i=n.documentElement,o=i.getBoundingClientRect(),s=-o.top||n.body?.scrollTop||r.scrollY||i.scrollTop||0,a=-o.left||n.body?.scrollLeft||r.scrollX||i.scrollLeft||0;return{top:s,left:a}}change(n=dN){return n>0?this._change.pipe(il(n)):this._change}_getWindow(){return this._document.defaultView||window}_updateViewportSize(){let n=this._getWindow();this._viewportSize=this._platform.isBrowser?{width:n.innerWidth,height:n.innerHeight}:{width:0,height:0}}static \u0275fac=function(r){return new(r||e)};static \u0275prov=C({token:e,factory:e.\u0275fac,providedIn:"root"})}return e})();var fN=new _("MATERIAL_ANIMATIONS"),vw=null;function pN(){return h(fN,{optional:!0})?.animationsDisabled||h(Eh,{optional:!0})==="NoopAnimations"?"di-disabled":(vw??=h(oy).matchMedia("(prefers-reduced-motion)").matches,vw?"reduced-motion":"enabled")}function vs(){return pN()!=="enabled"}var yn=(function(e){return e[e.FADING_IN=0]="FADING_IN",e[e.VISIBLE=1]="VISIBLE",e[e.FADING_OUT=2]="FADING_OUT",e[e.HIDDEN=3]="HIDDEN",e})(yn||{}),cy=class{_renderer;element;config;_animationForciblyDisabledThroughCss;state=yn.HIDDEN;constructor(t,n,r,i=!1){this._renderer=t,this.element=n,this.config=r,this._animationForciblyDisabledThroughCss=i}fadeOut(){this._renderer.fadeOutRipple(this)}},bw=ms({passive:!0,capture:!0}),ly=class{_events=new Map;addHandler(t,n,r,i){let o=this._events.get(n);if(o){let s=o.get(r);s?s.add(i):o.set(r,new Set([i]))}else this._events.set(n,new Map([[r,new Set([i])]])),t.runOutsideAngular(()=>{document.addEventListener(n,this._delegateEventHandler,bw)})}removeHandler(t,n,r){let i=this._events.get(t);if(!i)return;let o=i.get(n);o&&(o.delete(r),o.size===0&&i.delete(n),i.size===0&&(this._events.delete(t),document.removeEventListener(t,this._delegateEventHandler,bw)))}_delegateEventHandler=t=>{let n=Mr(t);n&&this._events.get(t.type)?.forEach((r,i)=>{(i===n||i.contains(n))&&r.forEach(o=>o.handleEvent(t))})}},Cw={enterDuration:225,exitDuration:150},hN=800,Dw=ms({passive:!0,capture:!0}),_w=["mousedown","touchstart"],Ew=["mouseup","mouseleave","touchend","touchcancel"],mN=(()=>{class e{static \u0275fac=function(r){return new(r||e)};static \u0275cmp=Fe({type:e,selectors:[["ng-component"]],hostAttrs:["mat-ripple-style-loader",""],decls:0,vars:0,template:function(r,i){},styles:[`.mat-ripple {
  overflow: hidden;
  position: relative;
}
.mat-ripple:not(:empty) {
  transform: translateZ(0);
}

.mat-ripple.mat-ripple-unbounded {
  overflow: visible;
}

.mat-ripple-element {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
  transition: opacity, transform 0ms cubic-bezier(0, 0, 0.2, 1);
  transform: scale3d(0, 0, 0);
  background-color: var(--mat-ripple-color, color-mix(in srgb, var(--mat-sys-on-surface) 10%, transparent));
}
@media (forced-colors: active) {
  .mat-ripple-element {
    display: none;
  }
}
.cdk-drag-preview .mat-ripple-element, .cdk-drag-placeholder .mat-ripple-element {
  display: none;
}
`],encapsulation:2,changeDetection:0})}return e})(),uy=class e{_target;_ngZone;_platform;_containerElement;_triggerElement=null;_isPointerDown=!1;_activeRipples=new Map;_mostRecentTransientRipple=null;_lastTouchStartEvent;_pointerUpEventsRegistered=!1;_containerRect=null;static _eventManager=new ly;constructor(t,n,r,i,o){this._target=t,this._ngZone=n,this._platform=i,i.isBrowser&&(this._containerElement=gn(r)),o&&o.get(lc).load(mN)}fadeInRipple(t,n,r={}){let i=this._containerRect=this._containerRect||this._containerElement.getBoundingClientRect(),o=g(g({},Cw),r.animation);r.centered&&(t=i.left+i.width/2,n=i.top+i.height/2);let s=r.radius||gN(t,n,i),a=t-i.left,c=n-i.top,l=o.enterDuration,u=document.createElement("div");u.classList.add("mat-ripple-element"),u.style.left=`${a-s}px`,u.style.top=`${c-s}px`,u.style.height=`${s*2}px`,u.style.width=`${s*2}px`,r.color!=null&&(u.style.backgroundColor=r.color),u.style.transitionDuration=`${l}ms`,this._containerElement.appendChild(u);let d=window.getComputedStyle(u),f=d.transitionProperty,p=d.transitionDuration,m=f==="none"||p==="0s"||p==="0s, 0s"||i.width===0&&i.height===0,D=new cy(this,u,r,m);u.style.transform="scale3d(1, 1, 1)",D.state=yn.FADING_IN,r.persistent||(this._mostRecentTransientRipple=D);let T=null;return!m&&(l||o.exitDuration)&&this._ngZone.runOutsideAngular(()=>{let S=()=>{T&&(T.fallbackTimer=null),clearTimeout(Me),this._finishRippleTransition(D)},q=()=>this._destroyRipple(D),Me=setTimeout(q,l+100);u.addEventListener("transitionend",S),u.addEventListener("transitioncancel",q),T={onTransitionEnd:S,onTransitionCancel:q,fallbackTimer:Me}}),this._activeRipples.set(D,T),(m||!l)&&this._finishRippleTransition(D),D}fadeOutRipple(t){if(t.state===yn.FADING_OUT||t.state===yn.HIDDEN)return;let n=t.element,r=g(g({},Cw),t.config.animation);n.style.transitionDuration=`${r.exitDuration}ms`,n.style.opacity="0",t.state=yn.FADING_OUT,(t._animationForciblyDisabledThroughCss||!r.exitDuration)&&this._finishRippleTransition(t)}fadeOutAll(){this._getActiveRipples().forEach(t=>t.fadeOut())}fadeOutAllNonPersistent(){this._getActiveRipples().forEach(t=>{t.config.persistent||t.fadeOut()})}setupTriggerEvents(t){let n=gn(t);!this._platform.isBrowser||!n||n===this._triggerElement||(this._removeTriggerEvents(),this._triggerElement=n,_w.forEach(r=>{e._eventManager.addHandler(this._ngZone,r,n,this)}))}handleEvent(t){t.type==="mousedown"?this._onMousedown(t):t.type==="touchstart"?this._onTouchStart(t):this._onPointerUp(),this._pointerUpEventsRegistered||(this._ngZone.runOutsideAngular(()=>{Ew.forEach(n=>{this._triggerElement.addEventListener(n,this,Dw)})}),this._pointerUpEventsRegistered=!0)}_finishRippleTransition(t){t.state===yn.FADING_IN?this._startFadeOutTransition(t):t.state===yn.FADING_OUT&&this._destroyRipple(t)}_startFadeOutTransition(t){let n=t===this._mostRecentTransientRipple,{persistent:r}=t.config;t.state=yn.VISIBLE,!r&&(!n||!this._isPointerDown)&&t.fadeOut()}_destroyRipple(t){let n=this._activeRipples.get(t)??null;this._activeRipples.delete(t),this._activeRipples.size||(this._containerRect=null),t===this._mostRecentTransientRipple&&(this._mostRecentTransientRipple=null),t.state=yn.HIDDEN,n!==null&&(t.element.removeEventListener("transitionend",n.onTransitionEnd),t.element.removeEventListener("transitioncancel",n.onTransitionCancel),n.fallbackTimer!==null&&clearTimeout(n.fallbackTimer)),t.element.remove()}_onMousedown(t){let n=uc(t),r=this._lastTouchStartEvent&&Date.now()<this._lastTouchStartEvent+hN;!this._target.rippleDisabled&&!n&&!r&&(this._isPointerDown=!0,this.fadeInRipple(t.clientX,t.clientY,this._target.rippleConfig))}_onTouchStart(t){if(!this._target.rippleDisabled&&!dc(t)){this._lastTouchStartEvent=Date.now(),this._isPointerDown=!0;let n=t.changedTouches;if(n)for(let r=0;r<n.length;r++)this.fadeInRipple(n[r].clientX,n[r].clientY,this._target.rippleConfig)}}_onPointerUp(){this._isPointerDown&&(this._isPointerDown=!1,this._getActiveRipples().forEach(t=>{let n=t.state===yn.VISIBLE||t.config.terminateOnPointerUp&&t.state===yn.FADING_IN;!t.config.persistent&&n&&t.fadeOut()}))}_getActiveRipples(){return Array.from(this._activeRipples.keys())}_removeTriggerEvents(){let t=this._triggerElement;t&&(_w.forEach(n=>e._eventManager.removeHandler(n,t,this)),this._pointerUpEventsRegistered&&(Ew.forEach(n=>t.removeEventListener(n,this,Dw)),this._pointerUpEventsRegistered=!1))}};function gN(e,t,n){let r=Math.max(Math.abs(e-n.left),Math.abs(e-n.right)),i=Math.max(Math.abs(t-n.top),Math.abs(t-n.bottom));return Math.sqrt(r*r+i*i)}var ww=new _("mat-ripple-global-options"),dy=(()=>{class e{_elementRef=h(we);_animationsDisabled=vs();color;unbounded=!1;centered=!1;radius=0;animation;get disabled(){return this._disabled}set disabled(n){n&&this.fadeOutAllNonPersistent(),this._disabled=n,this._setupTriggerEventsIfEnabled()}_disabled=!1;get trigger(){return this._trigger||this._elementRef.nativeElement}set trigger(n){this._trigger=n,this._setupTriggerEventsIfEnabled()}_trigger;_rippleRenderer;_globalOptions;_isInitialized=!1;constructor(){let n=h(K),r=h(Ot),i=h(ww,{optional:!0}),o=h(Te);this._globalOptions=i||{},this._rippleRenderer=new uy(this,n,this._elementRef,r,o)}ngOnInit(){this._isInitialized=!0,this._setupTriggerEventsIfEnabled()}ngOnDestroy(){this._rippleRenderer._removeTriggerEvents()}fadeOutAll(){this._rippleRenderer.fadeOutAll()}fadeOutAllNonPersistent(){this._rippleRenderer.fadeOutAllNonPersistent()}get rippleConfig(){return{centered:this.centered,radius:this.radius,color:this.color,animation:g(g(g({},this._globalOptions.animation),this._animationsDisabled?{enterDuration:0,exitDuration:0}:{}),this.animation),terminateOnPointerUp:this._globalOptions.terminateOnPointerUp}}get rippleDisabled(){return this.disabled||!!this._globalOptions.disabled}_setupTriggerEventsIfEnabled(){!this.disabled&&this._isInitialized&&this._rippleRenderer.setupTriggerEvents(this.trigger)}launch(n,r=0,i){return typeof n=="number"?this._rippleRenderer.fadeInRipple(n,r,g(g({},this.rippleConfig),i)):this._rippleRenderer.fadeInRipple(0,0,g(g({},this.rippleConfig),n))}static \u0275fac=function(r){return new(r||e)};static \u0275dir=Ie({type:e,selectors:[["","mat-ripple",""],["","matRipple",""]],hostAttrs:[1,"mat-ripple"],hostVars:2,hostBindings:function(r,i){r&2&&mt("mat-ripple-unbounded",i.unbounded)},inputs:{color:[0,"matRippleColor","color"],unbounded:[0,"matRippleUnbounded","unbounded"],centered:[0,"matRippleCentered","centered"],radius:[0,"matRippleRadius","radius"],animation:[0,"matRippleAnimation","animation"],disabled:[0,"matRippleDisabled","disabled"],trigger:[0,"matRippleTrigger","trigger"]},exportAs:["matRipple"]})}return e})();var gy=["*"];function bN(e,t){e&1&&Ho(0)}var CN=["tabListContainer"],DN=["tabList"],_N=["tabListInner"],EN=["nextPaginator"],wN=["previousPaginator"],TN=["content"];function IN(e,t){}var SN=["tabBodyWrapper"],MN=["tabHeader"];function xN(e,t){}function RN(e,t){if(e&1&&pa(0,xN,0,0,"ng-template",12),e&2){let n=$e().$implicit;rn("cdkPortalOutlet",n.templateLabel)}}function AN(e,t){if(e&1&&J(0),e&2){let n=$e().$implicit;yr(n.textLabel)}}function kN(e,t){if(e&1){let n=Cu();G(0,"div",7,2),on("click",function(){let i=Ur(n),o=i.$implicit,s=i.$index,a=$e(),c=Du(1);return $r(a._handleClick(o,c,s))})("cdkFocusChange",function(i){let o=Ur(n).$index,s=$e();return $r(s._tabFocusChanged(i,o))}),We(2,"span",8)(3,"div",9),G(4,"span",10)(5,"span",11),Ut(6,RN,1,1,null,12)(7,AN,1,1),se()()()}if(e&2){let n=t.$implicit,r=t.$index,i=Du(1),o=$e();ji(n.labelClass),mt("mdc-tab--active",o.selectedIndex===r),rn("id",o._getTabLabelId(n,r))("disabled",n.disabled)("fitInkBarToContent",o.fitInkBarToContent),Mn("tabIndex",o._getTabIndex(r))("aria-posinset",r+1)("aria-setsize",o._tabs.length)("aria-controls",o._getTabContentId(r))("aria-selected",o.selectedIndex===r)("aria-label",n.ariaLabel||null)("aria-labelledby",!n.ariaLabel&&n.ariaLabelledby?n.ariaLabelledby:null),Z(3),rn("matRippleTrigger",i)("matRippleDisabled",n.disabled||o.disableRipple),Z(3),$t(n.templateLabel?6:7)}}function NN(e,t){e&1&&Ho(0)}function ON(e,t){if(e&1){let n=Cu();G(0,"mat-tab-body",13),on("_onCentered",function(){Ur(n);let i=$e();return $r(i._removeTabBodyWrapperHeight())})("_onCentering",function(i){Ur(n);let o=$e();return $r(o._setTabBodyWrapperHeight(i))})("_beforeCentering",function(i){Ur(n);let o=$e();return $r(o._bodyCentered(i))}),se()}if(e&2){let n=t.$implicit,r=t.$index,i=$e();ji(n.bodyClass),rn("id",i._getTabContentId(r))("content",n.content)("position",n.position)("animationDuration",i.animationDuration)("preserveContent",i.preserveContent),Mn("tabindex",i.contentTabIndex!=null&&i.selectedIndex===r?i.contentTabIndex:null)("aria-labelledby",i._getTabLabelId(n,r))("aria-hidden",i.selectedIndex!==r)}}var PN=new _("MatTabContent"),LN=(()=>{class e{template=h(jt);constructor(){}static \u0275fac=function(r){return new(r||e)};static \u0275dir=Ie({type:e,selectors:[["","matTabContent",""]],features:[Zr([{provide:PN,useExisting:e}])]})}return e})(),FN=new _("MatTabLabel"),Mw=new _("MAT_TAB"),BN=(()=>{class e extends ew{_closestTab=h(Mw,{optional:!0});static \u0275fac=(()=>{let n;return function(i){return(n||(n=hr(e)))(i||e)}})();static \u0275dir=Ie({type:e,selectors:[["","mat-tab-label",""],["","matTabLabel",""]],features:[Zr([{provide:FN,useExisting:e}]),Sn]})}return e})(),xw=new _("MAT_TAB_GROUP"),yy=(()=>{class e{_viewContainerRef=h(Vt);_closestTabGroup=h(xw,{optional:!0});disabled=!1;get templateLabel(){return this._templateLabel}set templateLabel(n){this._setTemplateLabelInput(n)}_templateLabel;_explicitContent=void 0;_implicitContent;textLabel="";ariaLabel;ariaLabelledby;labelClass;bodyClass;id=null;_contentPortal=null;get content(){return this._contentPortal}_stateChanges=new M;position=null;origin=null;isActive=!1;constructor(){h(lc).load(tw)}ngOnChanges(n){(n.hasOwnProperty("textLabel")||n.hasOwnProperty("disabled"))&&this._stateChanges.next()}ngOnDestroy(){this._stateChanges.complete()}ngOnInit(){this._contentPortal=new hs(this._explicitContent||this._implicitContent,this._viewContainerRef)}_setTemplateLabelInput(n){n&&n._closestTab===this&&(this._templateLabel=n)}static \u0275fac=function(r){return new(r||e)};static \u0275cmp=Fe({type:e,selectors:[["mat-tab"]],contentQueries:function(r,i,o){if(r&1&&zo(o,BN,5)(o,LN,7,jt),r&2){let s;Ge(s=qe())&&(i.templateLabel=s.first),Ge(s=qe())&&(i._explicitContent=s.first)}},viewQuery:function(r,i){if(r&1&&Kr(jt,7),r&2){let o;Ge(o=qe())&&(i._implicitContent=o.first)}},hostAttrs:["hidden",""],hostVars:1,hostBindings:function(r,i){r&2&&Mn("id",null)},inputs:{disabled:[2,"disabled","disabled",ot],textLabel:[0,"label","textLabel"],ariaLabel:[0,"aria-label","ariaLabel"],ariaLabelledby:[0,"aria-labelledby","ariaLabelledby"],labelClass:"labelClass",bodyClass:"bodyClass",id:"id"},exportAs:["matTab"],features:[Zr([{provide:Mw,useExisting:e}]),Li],ngContentSelectors:gy,decls:1,vars:0,template:function(r,i){r&1&&($o(),mu(0,bN,1,0,"ng-template"))},encapsulation:2})}return e})(),fy="mdc-tab-indicator--active",Tw="mdc-tab-indicator--no-transition",py=class{_items;_currentItem;constructor(t){this._items=t}hide(){this._items.forEach(t=>t.deactivateInkBar()),this._currentItem=void 0}alignToElement(t){let n=this._items.find(i=>i.elementRef.nativeElement===t),r=this._currentItem;if(n!==r&&(r?.deactivateInkBar(),n)){let i=r?.elementRef.nativeElement.getBoundingClientRect?.();n.activateInkBar(i),this._currentItem=n}}},jN=(()=>{class e{_elementRef=h(we);_inkBarElement=null;_inkBarContentElement=null;_fitToContent=!1;get fitInkBarToContent(){return this._fitToContent}set fitInkBarToContent(n){this._fitToContent!==n&&(this._fitToContent=n,this._inkBarElement&&this._appendInkBarElement())}activateInkBar(n){let r=this._elementRef.nativeElement;if(!n||!r.getBoundingClientRect||!this._inkBarContentElement){r.classList.add(fy);return}let i=r.getBoundingClientRect(),o=n.width/i.width,s=n.left-i.left;r.classList.add(Tw),this._inkBarContentElement.style.setProperty("transform",`translateX(${s}px) scaleX(${o})`),r.getBoundingClientRect(),r.classList.remove(Tw),r.classList.add(fy),this._inkBarContentElement.style.setProperty("transform","")}deactivateInkBar(){this._elementRef.nativeElement.classList.remove(fy)}ngOnInit(){this._createInkBarElement()}ngOnDestroy(){this._inkBarElement?.remove(),this._inkBarElement=this._inkBarContentElement=null}_createInkBarElement(){let n=this._elementRef.nativeElement.ownerDocument||document,r=this._inkBarElement=n.createElement("span"),i=this._inkBarContentElement=n.createElement("span");r.className="mdc-tab-indicator",i.className="mdc-tab-indicator__content mdc-tab-indicator__content--underline",r.appendChild(this._inkBarContentElement),this._appendInkBarElement()}_appendInkBarElement(){this._inkBarElement;let n=this._fitToContent?this._elementRef.nativeElement.querySelector(".mdc-tab__content"):this._elementRef.nativeElement;n.appendChild(this._inkBarElement)}static \u0275fac=function(r){return new(r||e)};static \u0275dir=Ie({type:e,inputs:{fitInkBarToContent:[2,"fitInkBarToContent","fitInkBarToContent",ot]}})}return e})();var Rw=(()=>{class e extends jN{elementRef=h(we);disabled=!1;focus(){this.elementRef.nativeElement.focus()}getOffsetLeft(){return this.elementRef.nativeElement.offsetLeft}getOffsetWidth(){return this.elementRef.nativeElement.offsetWidth}static \u0275fac=(()=>{let n;return function(i){return(n||(n=hr(e)))(i||e)}})();static \u0275dir=Ie({type:e,selectors:[["","matTabLabelWrapper",""]],hostVars:3,hostBindings:function(r,i){r&2&&(Mn("aria-disabled",!!i.disabled),mt("mat-mdc-tab-disabled",i.disabled))},inputs:{disabled:[2,"disabled","disabled",ot]},features:[Sn]})}return e})(),Iw={passive:!0},VN=650,UN=100,$N=(()=>{class e{_elementRef=h(we);_changeDetectorRef=h(Yr);_viewportRuler=h(yw);_dir=h(gs,{optional:!0});_ngZone=h(K);_platform=h(Ot);_sharedResizeObserver=h(hw);_injector=h(Te);_renderer=h(Bi);_animationsDisabled=vs();_eventCleanups;_scrollDistance=0;_selectedIndexChanged=!1;_destroyed=new M;_showPaginationControls=!1;_disableScrollAfter=!0;_disableScrollBefore=!0;_tabLabelCount;_scrollDistanceChanged=!1;_keyManager;_currentTextContent;_stopScrolling=new M;disablePagination=!1;get selectedIndex(){return this._selectedIndex}set selectedIndex(n){let r=isNaN(n)?0:n;this._selectedIndex!=r&&(this._selectedIndexChanged=!0,this._selectedIndex=r,this._keyManager&&this._keyManager.updateActiveItem(r))}_selectedIndex=0;selectFocusedIndex=new X;indexFocused=new X;constructor(){this._eventCleanups=this._ngZone.runOutsideAngular(()=>[this._renderer.listen(this._elementRef.nativeElement,"mouseleave",()=>this._stopInterval())])}ngAfterViewInit(){this._eventCleanups.push(this._renderer.listen(this._previousPaginator.nativeElement,"touchstart",()=>this._handlePaginatorPress("before"),Iw),this._renderer.listen(this._nextPaginator.nativeElement,"touchstart",()=>this._handlePaginatorPress("after"),Iw))}ngAfterContentInit(){let n=this._dir?this._dir.change:I("ltr"),r=this._sharedResizeObserver.observe(this._elementRef.nativeElement).pipe(mi(32),ye(this._destroyed)),i=this._viewportRuler.change(150).pipe(ye(this._destroyed)),o=()=>{this.updatePagination(),this._alignInkBarToSelectedTab()};this._keyManager=new hc(this._items).withHorizontalOrientation(this._getLayoutDirection()).withHomeAndEnd().withWrap().skipPredicate(()=>!1),this._keyManager.updateActiveItem(Math.max(this._selectedIndex,0)),qr(o,{injector:this._injector}),Ns(n,i,r,this._items.changes,this._itemsResized()).pipe(ye(this._destroyed)).subscribe(()=>{this._ngZone.run(()=>{Promise.resolve().then(()=>{this._scrollDistance=Math.max(0,Math.min(this._getMaxScrollDistance(),this._scrollDistance)),o()})}),this._keyManager?.withHorizontalOrientation(this._getLayoutDirection())}),this._keyManager.change.subscribe(s=>{this.indexFocused.emit(s),this._setTabFocus(s)})}_itemsResized(){return typeof ResizeObserver!="function"?pe:this._items.changes.pipe(Ar(this._items),Tt(n=>new P(r=>this._ngZone.runOutsideAngular(()=>{let i=new ResizeObserver(o=>r.next(o));return n.forEach(o=>i.observe(o.elementRef.nativeElement)),()=>{i.disconnect()}}))),Os(1),ge(n=>n.some(r=>r.contentRect.width>0&&r.contentRect.height>0)))}ngAfterContentChecked(){this._tabLabelCount!=this._items.length&&(this.updatePagination(),this._tabLabelCount=this._items.length,this._changeDetectorRef.markForCheck()),this._selectedIndexChanged&&(this._scrollToLabel(this._selectedIndex),this._checkScrollingControls(),this._alignInkBarToSelectedTab(),this._selectedIndexChanged=!1,this._changeDetectorRef.markForCheck()),this._scrollDistanceChanged&&(this._updateTabScrollPosition(),this._scrollDistanceChanged=!1,this._changeDetectorRef.markForCheck())}ngOnDestroy(){this._eventCleanups.forEach(n=>n()),this._keyManager?.destroy(),this._destroyed.next(),this._destroyed.complete(),this._stopScrolling.complete()}_handleKeydown(n){if(!jd(n))switch(n.keyCode){case 13:case 32:if(this.focusIndex!==this.selectedIndex){let r=this._items.get(this.focusIndex);r&&!r.disabled&&(this.selectFocusedIndex.emit(this.focusIndex),this._itemSelected(n))}break;default:this._keyManager?.onKeydown(n)}}_onContentChanges(){let n=this._elementRef.nativeElement.textContent;n!==this._currentTextContent&&(this._currentTextContent=n||"",this._ngZone.run(()=>{this.updatePagination(),this._alignInkBarToSelectedTab(),this._changeDetectorRef.markForCheck()}))}updatePagination(){this._checkPaginationEnabled(),this._checkScrollingControls(),this._updateTabScrollPosition()}get focusIndex(){return this._keyManager?this._keyManager.activeItemIndex:0}set focusIndex(n){!this._isValidIndex(n)||this.focusIndex===n||!this._keyManager||this._keyManager.setActiveItem(n)}_isValidIndex(n){return this._items?!!this._items.toArray()[n]:!0}_setTabFocus(n){if(this._showPaginationControls&&this._scrollToLabel(n),this._items&&this._items.length){this._items.toArray()[n].focus();let r=this._tabListContainer.nativeElement;this._getLayoutDirection()=="ltr"?r.scrollLeft=0:r.scrollLeft=r.scrollWidth-r.offsetWidth}}_getLayoutDirection(){return this._dir&&this._dir.value==="rtl"?"rtl":"ltr"}_updateTabScrollPosition(){if(this.disablePagination)return;let n=this.scrollDistance,r=this._getLayoutDirection()==="ltr"?-n:n;this._tabList.nativeElement.style.transform=`translateX(${Math.round(r)}px)`,(this._platform.TRIDENT||this._platform.EDGE)&&(this._tabListContainer.nativeElement.scrollLeft=0)}get scrollDistance(){return this._scrollDistance}set scrollDistance(n){this._scrollTo(n)}_scrollHeader(n){let r=this._tabListContainer.nativeElement.offsetWidth,i=(n=="before"?-1:1)*r/3;return this._scrollTo(this._scrollDistance+i)}_handlePaginatorClick(n){this._stopInterval(),this._scrollHeader(n)}_scrollToLabel(n){if(this.disablePagination)return;let r=this._items?this._items.toArray()[n]:null;if(!r)return;let i=this._tabListContainer.nativeElement.offsetWidth,{offsetLeft:o,offsetWidth:s}=r.elementRef.nativeElement,a,c;this._getLayoutDirection()=="ltr"?(a=o,c=a+s):(c=this._tabListInner.nativeElement.offsetWidth-o,a=c-s);let l=this.scrollDistance,u=this.scrollDistance+i;a<l?this.scrollDistance-=l-a:c>u&&(this.scrollDistance+=Math.min(c-u,a-l))}_checkPaginationEnabled(){if(this.disablePagination)this._showPaginationControls=!1;else{let n=this._tabListInner.nativeElement.scrollWidth,r=this._elementRef.nativeElement.offsetWidth,i=n-r>=5;i||(this.scrollDistance=0),i!==this._showPaginationControls&&(this._showPaginationControls=i,this._changeDetectorRef.markForCheck())}}_checkScrollingControls(){this.disablePagination?this._disableScrollAfter=this._disableScrollBefore=!0:(this._disableScrollBefore=this.scrollDistance==0,this._disableScrollAfter=this.scrollDistance==this._getMaxScrollDistance(),this._changeDetectorRef.markForCheck())}_getMaxScrollDistance(){let n=this._tabListInner.nativeElement.scrollWidth,r=this._tabListContainer.nativeElement.offsetWidth;return n-r||0}_alignInkBarToSelectedTab(){let n=this._items&&this._items.length?this._items.toArray()[this.selectedIndex]:null,r=n?n.elementRef.nativeElement:null;r?this._inkBar.alignToElement(r):this._inkBar.hide()}_stopInterval(){this._stopScrolling.next()}_handlePaginatorPress(n,r){r&&r.button!=null&&r.button!==0||(this._stopInterval(),ks(VN,UN).pipe(ye(Ns(this._stopScrolling,this._destroyed))).subscribe(()=>{let{maxScrollDistance:i,distance:o}=this._scrollHeader(n);(o===0||o>=i)&&this._stopInterval()}))}_scrollTo(n){if(this.disablePagination)return{maxScrollDistance:0,distance:0};let r=this._getMaxScrollDistance();return this._scrollDistance=Math.max(0,Math.min(r,n)),this._scrollDistanceChanged=!0,this._checkScrollingControls(),{maxScrollDistance:r,distance:this._scrollDistance}}static \u0275fac=function(r){return new(r||e)};static \u0275dir=Ie({type:e,inputs:{disablePagination:[2,"disablePagination","disablePagination",ot],selectedIndex:[2,"selectedIndex","selectedIndex",Tu]},outputs:{selectFocusedIndex:"selectFocusedIndex",indexFocused:"indexFocused"}})}return e})(),HN=(()=>{class e extends $N{_items;_tabListContainer;_tabList;_tabListInner;_nextPaginator;_previousPaginator;_inkBar;ariaLabel;ariaLabelledby;disableRipple=!1;ngAfterContentInit(){this._inkBar=new py(this._items),super.ngAfterContentInit()}_itemSelected(n){n.preventDefault()}static \u0275fac=(()=>{let n;return function(i){return(n||(n=hr(e)))(i||e)}})();static \u0275cmp=Fe({type:e,selectors:[["mat-tab-header"]],contentQueries:function(r,i,o){if(r&1&&zo(o,Rw,4),r&2){let s;Ge(s=qe())&&(i._items=s)}},viewQuery:function(r,i){if(r&1&&Kr(CN,7)(DN,7)(_N,7)(EN,5)(wN,5),r&2){let o;Ge(o=qe())&&(i._tabListContainer=o.first),Ge(o=qe())&&(i._tabList=o.first),Ge(o=qe())&&(i._tabListInner=o.first),Ge(o=qe())&&(i._nextPaginator=o.first),Ge(o=qe())&&(i._previousPaginator=o.first)}},hostAttrs:[1,"mat-mdc-tab-header"],hostVars:4,hostBindings:function(r,i){r&2&&mt("mat-mdc-tab-header-pagination-controls-enabled",i._showPaginationControls)("mat-mdc-tab-header-rtl",i._getLayoutDirection()=="rtl")},inputs:{ariaLabel:[0,"aria-label","ariaLabel"],ariaLabelledby:[0,"aria-labelledby","ariaLabelledby"],disableRipple:[2,"disableRipple","disableRipple",ot]},features:[Sn],ngContentSelectors:gy,decls:13,vars:10,consts:[["previousPaginator",""],["tabListContainer",""],["tabList",""],["tabListInner",""],["nextPaginator",""],["mat-ripple","",1,"mat-mdc-tab-header-pagination","mat-mdc-tab-header-pagination-before",3,"click","mousedown","touchend","matRippleDisabled"],[1,"mat-mdc-tab-header-pagination-chevron"],[1,"mat-mdc-tab-label-container",3,"keydown"],["role","tablist",1,"mat-mdc-tab-list",3,"cdkObserveContent"],[1,"mat-mdc-tab-labels"],["mat-ripple","",1,"mat-mdc-tab-header-pagination","mat-mdc-tab-header-pagination-after",3,"mousedown","click","touchend","matRippleDisabled"]],template:function(r,i){r&1&&($o(),G(0,"div",5,0),on("click",function(){return i._handlePaginatorClick("before")})("mousedown",function(s){return i._handlePaginatorPress("before",s)})("touchend",function(){return i._stopInterval()}),We(2,"div",6),se(),G(3,"div",7,1),on("keydown",function(s){return i._handleKeydown(s)}),G(5,"div",8,2),on("cdkObserveContent",function(){return i._onContentChanges()}),G(7,"div",9,3),Ho(9),se()()(),G(10,"div",10,4),on("mousedown",function(s){return i._handlePaginatorPress("after",s)})("click",function(){return i._handlePaginatorClick("after")})("touchend",function(){return i._stopInterval()}),We(12,"div",6),se()),r&2&&(mt("mat-mdc-tab-header-pagination-disabled",i._disableScrollBefore),rn("matRippleDisabled",i._disableScrollBefore||i.disableRipple),Z(3),mt("_mat-animation-noopable",i._animationsDisabled),Z(2),Mn("aria-label",i.ariaLabel||null)("aria-labelledby",i.ariaLabelledby||null),Z(5),mt("mat-mdc-tab-header-pagination-disabled",i._disableScrollAfter),rn("matRippleDisabled",i._disableScrollAfter||i.disableRipple))},dependencies:[dy,dw],styles:[`.mat-mdc-tab-header {
  display: flex;
  overflow: hidden;
  position: relative;
  flex-shrink: 0;
}

.mdc-tab-indicator .mdc-tab-indicator__content {
  transition-duration: var(--mat-tab-animation-duration, 250ms);
}

.mat-mdc-tab-header-pagination {
  -webkit-user-select: none;
  user-select: none;
  position: relative;
  display: none;
  justify-content: center;
  align-items: center;
  min-width: 32px;
  cursor: pointer;
  z-index: 2;
  -webkit-tap-highlight-color: transparent;
  touch-action: none;
  box-sizing: content-box;
  outline: 0;
}
.mat-mdc-tab-header-pagination::-moz-focus-inner {
  border: 0;
}
.mat-mdc-tab-header-pagination .mat-ripple-element {
  opacity: 0.12;
  background-color: var(--mat-tab-inactive-ripple-color, var(--mat-sys-on-surface));
}
.mat-mdc-tab-header-pagination-controls-enabled .mat-mdc-tab-header-pagination {
  display: flex;
}

.mat-mdc-tab-header-pagination-before,
.mat-mdc-tab-header-rtl .mat-mdc-tab-header-pagination-after {
  padding-left: 4px;
}
.mat-mdc-tab-header-pagination-before .mat-mdc-tab-header-pagination-chevron,
.mat-mdc-tab-header-rtl .mat-mdc-tab-header-pagination-after .mat-mdc-tab-header-pagination-chevron {
  transform: rotate(-135deg);
}

.mat-mdc-tab-header-rtl .mat-mdc-tab-header-pagination-before,
.mat-mdc-tab-header-pagination-after {
  padding-right: 4px;
}
.mat-mdc-tab-header-rtl .mat-mdc-tab-header-pagination-before .mat-mdc-tab-header-pagination-chevron,
.mat-mdc-tab-header-pagination-after .mat-mdc-tab-header-pagination-chevron {
  transform: rotate(45deg);
}

.mat-mdc-tab-header-pagination-chevron {
  border-style: solid;
  border-width: 2px 2px 0 0;
  height: 8px;
  width: 8px;
  border-color: var(--mat-tab-pagination-icon-color, var(--mat-sys-on-surface));
}

.mat-mdc-tab-header-pagination-disabled {
  box-shadow: none;
  cursor: default;
  pointer-events: none;
}
.mat-mdc-tab-header-pagination-disabled .mat-mdc-tab-header-pagination-chevron {
  opacity: 0.4;
}

.mat-mdc-tab-list {
  flex-grow: 1;
  position: relative;
  transition: transform 500ms cubic-bezier(0.35, 0, 0.25, 1);
}
._mat-animation-noopable .mat-mdc-tab-list {
  transition: none;
}

.mat-mdc-tab-label-container {
  display: flex;
  flex-grow: 1;
  overflow: hidden;
  z-index: 1;
  border-bottom-style: solid;
  border-bottom-width: var(--mat-tab-divider-height, 1px);
  border-bottom-color: var(--mat-tab-divider-color, var(--mat-sys-surface-variant));
}
.mat-mdc-tab-group-inverted-header .mat-mdc-tab-label-container {
  border-bottom: none;
  border-top-style: solid;
  border-top-width: var(--mat-tab-divider-height, 1px);
  border-top-color: var(--mat-tab-divider-color, var(--mat-sys-surface-variant));
}

.mat-mdc-tab-labels {
  display: flex;
  flex: 1 0 auto;
}
[mat-align-tabs=center] > .mat-mdc-tab-header .mat-mdc-tab-labels {
  justify-content: center;
}
[mat-align-tabs=end] > .mat-mdc-tab-header .mat-mdc-tab-labels {
  justify-content: flex-end;
}
.cdk-drop-list .mat-mdc-tab-labels, .mat-mdc-tab-labels.cdk-drop-list {
  min-height: var(--mat-tab-container-height, 48px);
}

.mat-mdc-tab::before {
  margin: 5px;
}
@media (forced-colors: active) {
  .mat-mdc-tab[aria-disabled=true] {
    color: GrayText;
  }
}
`],encapsulation:2})}return e})(),zN=new _("MAT_TABS_CONFIG"),Sw=(()=>{class e extends Xg{_host=h(hy);_ngZone=h(K);_centeringSub=oe.EMPTY;_leavingSub=oe.EMPTY;constructor(){super()}ngOnInit(){super.ngOnInit(),this._centeringSub=this._host._beforeCentering.pipe(Ar(this._host._isCenterPosition())).subscribe(n=>{this._host._content&&n&&!this.hasAttached()&&this._ngZone.run(()=>{Promise.resolve().then(),this.attach(this._host._content)})}),this._leavingSub=this._host._afterLeavingCenter.subscribe(()=>{this._host.preserveContent||this._ngZone.run(()=>this.detach())})}ngOnDestroy(){super.ngOnDestroy(),this._centeringSub.unsubscribe(),this._leavingSub.unsubscribe()}static \u0275fac=function(r){return new(r||e)};static \u0275dir=Ie({type:e,selectors:[["","matTabBodyHost",""]],features:[Sn]})}return e})(),hy=(()=>{class e{_elementRef=h(we);_dir=h(gs,{optional:!0});_ngZone=h(K);_injector=h(Te);_renderer=h(Bi);_diAnimationsDisabled=vs();_eventCleanups;_initialized=!1;_fallbackTimer;_positionIndex;_dirChangeSubscription=oe.EMPTY;_position;_previousPosition;_onCentering=new X;_beforeCentering=new X;_afterLeavingCenter=new X;_onCentered=new X(!0);_portalHost;_contentElement;_content;animationDuration="500ms";preserveContent=!1;set position(n){this._positionIndex=n,this._computePositionAnimationState()}constructor(){if(this._dir){let n=h(Yr);this._dirChangeSubscription=this._dir.change.subscribe(r=>{this._computePositionAnimationState(r),n.markForCheck()})}}ngOnInit(){this._bindTransitionEvents(),this._position==="center"&&(this._setActiveClass(!0),qr(()=>this._onCentering.emit(this._elementRef.nativeElement.clientHeight),{injector:this._injector})),this._initialized=!0}ngOnDestroy(){clearTimeout(this._fallbackTimer),this._eventCleanups?.forEach(n=>n()),this._dirChangeSubscription.unsubscribe()}_bindTransitionEvents(){this._ngZone.runOutsideAngular(()=>{let n=this._elementRef.nativeElement,r=i=>{i.target===this._contentElement?.nativeElement&&(this._elementRef.nativeElement.classList.remove("mat-tab-body-animating"),i.type==="transitionend"&&this._transitionDone())};this._eventCleanups=[this._renderer.listen(n,"transitionstart",i=>{i.target===this._contentElement?.nativeElement&&(this._elementRef.nativeElement.classList.add("mat-tab-body-animating"),this._transitionStarted())}),this._renderer.listen(n,"transitionend",r),this._renderer.listen(n,"transitioncancel",r)]})}_transitionStarted(){clearTimeout(this._fallbackTimer);let n=this._position==="center";this._beforeCentering.emit(n),n&&this._onCentering.emit(this._elementRef.nativeElement.clientHeight)}_transitionDone(){this._position==="center"?this._onCentered.emit():this._previousPosition==="center"&&this._afterLeavingCenter.emit()}_setActiveClass(n){this._elementRef.nativeElement.classList.toggle("mat-mdc-tab-body-active",n)}_getLayoutDirection(){return this._dir&&this._dir.value==="rtl"?"rtl":"ltr"}_isCenterPosition(){return this._positionIndex===0}_computePositionAnimationState(n=this._getLayoutDirection()){this._previousPosition=this._position,this._positionIndex<0?this._position=n=="ltr"?"left":"right":this._positionIndex>0?this._position=n=="ltr"?"right":"left":this._position="center",this._animationsDisabled()?this._simulateTransitionEvents():this._initialized&&(this._position==="center"||this._previousPosition==="center")&&(clearTimeout(this._fallbackTimer),this._fallbackTimer=this._ngZone.runOutsideAngular(()=>setTimeout(()=>this._simulateTransitionEvents(),100)))}_simulateTransitionEvents(){this._transitionStarted(),qr(()=>this._transitionDone(),{injector:this._injector})}_animationsDisabled(){return this._diAnimationsDisabled||this.animationDuration==="0ms"||this.animationDuration==="0s"}static \u0275fac=function(r){return new(r||e)};static \u0275cmp=Fe({type:e,selectors:[["mat-tab-body"]],viewQuery:function(r,i){if(r&1&&Kr(Sw,5)(TN,5),r&2){let o;Ge(o=qe())&&(i._portalHost=o.first),Ge(o=qe())&&(i._contentElement=o.first)}},hostAttrs:[1,"mat-mdc-tab-body"],hostVars:1,hostBindings:function(r,i){r&2&&Mn("inert",i._position==="center"?null:"")},inputs:{_content:[0,"content","_content"],animationDuration:"animationDuration",preserveContent:"preserveContent",position:"position"},outputs:{_onCentering:"_onCentering",_beforeCentering:"_beforeCentering",_onCentered:"_onCentered"},decls:3,vars:6,consts:[["content",""],["cdkScrollable","",1,"mat-mdc-tab-body-content"],["matTabBodyHost",""]],template:function(r,i){r&1&&(G(0,"div",1,0),pa(2,IN,0,0,"ng-template",2),se()),r&2&&mt("mat-tab-body-content-left",i._position==="left")("mat-tab-body-content-right",i._position==="right")("mat-tab-body-content-can-animate",i._position==="center"||i._previousPosition==="center")},dependencies:[Sw,gw],styles:[`.mat-mdc-tab-body {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  display: block;
  overflow: hidden;
  outline: 0;
  flex-basis: 100%;
}
.mat-mdc-tab-body.mat-mdc-tab-body-active {
  position: relative;
  overflow-x: hidden;
  overflow-y: auto;
  z-index: 1;
  flex-grow: 1;
}
.mat-mdc-tab-group.mat-mdc-tab-group-dynamic-height .mat-mdc-tab-body.mat-mdc-tab-body-active {
  overflow-y: hidden;
}

.mat-mdc-tab-body-content {
  height: 100%;
  overflow: auto;
  transform: none;
  visibility: hidden;
}
.mat-tab-body-animating > .mat-mdc-tab-body-content, .mat-mdc-tab-body-active > .mat-mdc-tab-body-content {
  visibility: visible;
}
.mat-tab-body-animating > .mat-mdc-tab-body-content {
  min-height: 1px;
}
.mat-mdc-tab-group-dynamic-height .mat-mdc-tab-body-content {
  overflow: hidden;
}

.mat-tab-body-content-can-animate {
  transition: transform var(--mat-tab-animation-duration) 1ms cubic-bezier(0.35, 0, 0.25, 1);
}
.mat-mdc-tab-body-wrapper._mat-animation-noopable .mat-tab-body-content-can-animate {
  transition: none;
}

.mat-tab-body-content-left {
  transform: translate3d(-100%, 0, 0);
}

.mat-tab-body-content-right {
  transform: translate3d(100%, 0, 0);
}
`],encapsulation:2})}return e})(),Aw=(()=>{class e{_elementRef=h(we);_changeDetectorRef=h(Yr);_ngZone=h(K);_tabsSubscription=oe.EMPTY;_tabLabelSubscription=oe.EMPTY;_tabBodySubscription=oe.EMPTY;_diAnimationsDisabled=vs();_allTabs;_tabBodies;_tabBodyWrapper;_tabHeader;_tabs=new fr;_indexToSelect=0;_lastFocusedTabIndex=null;_tabBodyWrapperHeight=0;color;get fitInkBarToContent(){return this._fitInkBarToContent}set fitInkBarToContent(n){this._fitInkBarToContent=n,this._changeDetectorRef.markForCheck()}_fitInkBarToContent=!1;stretchTabs=!0;alignTabs=null;dynamicHeight=!1;get selectedIndex(){return this._selectedIndex}set selectedIndex(n){this._indexToSelect=isNaN(n)?null:n}_selectedIndex=null;headerPosition="above";get animationDuration(){return this._animationDuration}set animationDuration(n){let r=n+"";this._animationDuration=/^\d+$/.test(r)?n+"ms":r}_animationDuration;get contentTabIndex(){return this._contentTabIndex}set contentTabIndex(n){this._contentTabIndex=isNaN(n)?null:n}_contentTabIndex=null;disablePagination=!1;disableRipple=!1;preserveContent=!1;get backgroundColor(){return this._backgroundColor}set backgroundColor(n){let r=this._elementRef.nativeElement.classList;r.remove("mat-tabs-with-background",`mat-background-${this.backgroundColor}`),n&&r.add("mat-tabs-with-background",`mat-background-${n}`),this._backgroundColor=n}_backgroundColor;ariaLabel;ariaLabelledby;selectedIndexChange=new X;focusChange=new X;animationDone=new X;selectedTabChange=new X(!0);_groupId;_isServer=!h(Ot).isBrowser;constructor(){let n=h(zN,{optional:!0});this._groupId=h(mc).getId("mat-tab-group-"),this.animationDuration=n&&n.animationDuration?n.animationDuration:"500ms",this.disablePagination=n&&n.disablePagination!=null?n.disablePagination:!1,this.dynamicHeight=n&&n.dynamicHeight!=null?n.dynamicHeight:!1,n?.contentTabIndex!=null&&(this.contentTabIndex=n.contentTabIndex),this.preserveContent=!!n?.preserveContent,this.fitInkBarToContent=n&&n.fitInkBarToContent!=null?n.fitInkBarToContent:!1,this.stretchTabs=n&&n.stretchTabs!=null?n.stretchTabs:!0,this.alignTabs=n&&n.alignTabs!=null?n.alignTabs:null}ngAfterContentChecked(){let n=this._indexToSelect=this._clampTabIndex(this._indexToSelect);if(this._selectedIndex!=n){let r=this._selectedIndex==null;if(!r){this.selectedTabChange.emit(this._createChangeEvent(n));let i=this._tabBodyWrapper.nativeElement;i.style.minHeight=i.clientHeight+"px"}Promise.resolve().then(()=>{this._tabs.forEach((i,o)=>i.isActive=o===n),r||(this.selectedIndexChange.emit(n),this._tabBodyWrapper.nativeElement.style.minHeight="")})}this._tabs.forEach((r,i)=>{r.position=i-n,this._selectedIndex!=null&&r.position==0&&!r.origin&&(r.origin=n-this._selectedIndex)}),this._selectedIndex!==n&&(this._selectedIndex=n,this._lastFocusedTabIndex=null,this._changeDetectorRef.markForCheck())}ngAfterContentInit(){this._subscribeToAllTabChanges(),this._subscribeToTabLabels(),this._tabsSubscription=this._tabs.changes.subscribe(()=>{let n=this._clampTabIndex(this._indexToSelect);if(n===this._selectedIndex){let r=this._tabs.toArray(),i;for(let o=0;o<r.length;o++)if(r[o].isActive){this._indexToSelect=this._selectedIndex=o,this._lastFocusedTabIndex=null,i=r[o];break}!i&&r[n]&&Promise.resolve().then(()=>{r[n].isActive=!0,this.selectedTabChange.emit(this._createChangeEvent(n))})}this._changeDetectorRef.markForCheck()})}ngAfterViewInit(){this._tabBodySubscription=this._tabBodies.changes.subscribe(()=>this._bodyCentered(!0))}_subscribeToAllTabChanges(){this._allTabs.changes.pipe(Ar(this._allTabs)).subscribe(n=>{this._tabs.reset(n.filter(r=>r._closestTabGroup===this||!r._closestTabGroup)),this._tabs.notifyOnChanges()})}ngOnDestroy(){this._tabs.destroy(),this._tabsSubscription.unsubscribe(),this._tabLabelSubscription.unsubscribe(),this._tabBodySubscription.unsubscribe()}realignInkBar(){this._tabHeader&&this._tabHeader._alignInkBarToSelectedTab()}updatePagination(){this._tabHeader&&this._tabHeader.updatePagination()}focusTab(n){let r=this._tabHeader;r&&(r.focusIndex=n)}_focusChanged(n){this._lastFocusedTabIndex=n,this.focusChange.emit(this._createChangeEvent(n))}_createChangeEvent(n){let r=new my;return r.index=n,this._tabs&&this._tabs.length&&(r.tab=this._tabs.toArray()[n]),r}_subscribeToTabLabels(){this._tabLabelSubscription&&this._tabLabelSubscription.unsubscribe(),this._tabLabelSubscription=Ns(...this._tabs.map(n=>n._stateChanges)).subscribe(()=>this._changeDetectorRef.markForCheck())}_clampTabIndex(n){return Math.min(this._tabs.length-1,Math.max(n||0,0))}_getTabLabelId(n,r){return n.id||`${this._groupId}-label-${r}`}_getTabContentId(n){return`${this._groupId}-content-${n}`}_setTabBodyWrapperHeight(n){if(!this.dynamicHeight||!this._tabBodyWrapperHeight){this._tabBodyWrapperHeight=n;return}let r=this._tabBodyWrapper.nativeElement;r.style.height=this._tabBodyWrapperHeight+"px",this._tabBodyWrapper.nativeElement.offsetHeight&&(r.style.height=n+"px")}_removeTabBodyWrapperHeight(){let n=this._tabBodyWrapper.nativeElement;this._tabBodyWrapperHeight=n.clientHeight,n.style.height="",this._ngZone.run(()=>this.animationDone.emit())}_handleClick(n,r,i){r.focusIndex=i,n.disabled||(this.selectedIndex=i)}_getTabIndex(n){let r=this._lastFocusedTabIndex??this.selectedIndex;return n===r?0:-1}_tabFocusChanged(n,r){n&&n!=="mouse"&&n!=="touch"&&(this._tabHeader.focusIndex=r)}_bodyCentered(n){n&&this._tabBodies?.forEach((r,i)=>r._setActiveClass(i===this._selectedIndex))}_animationsDisabled(){return this._diAnimationsDisabled||this.animationDuration==="0"||this.animationDuration==="0ms"}static \u0275fac=function(r){return new(r||e)};static \u0275cmp=Fe({type:e,selectors:[["mat-tab-group"]],contentQueries:function(r,i,o){if(r&1&&zo(o,yy,5),r&2){let s;Ge(s=qe())&&(i._allTabs=s)}},viewQuery:function(r,i){if(r&1&&Kr(SN,5)(MN,5)(hy,5),r&2){let o;Ge(o=qe())&&(i._tabBodyWrapper=o.first),Ge(o=qe())&&(i._tabHeader=o.first),Ge(o=qe())&&(i._tabBodies=o)}},hostAttrs:[1,"mat-mdc-tab-group"],hostVars:11,hostBindings:function(r,i){r&2&&(Mn("mat-align-tabs",i.alignTabs),ji("mat-"+(i.color||"primary")),ga("--mat-tab-animation-duration",i.animationDuration),mt("mat-mdc-tab-group-dynamic-height",i.dynamicHeight)("mat-mdc-tab-group-inverted-header",i.headerPosition==="below")("mat-mdc-tab-group-stretch-tabs",i.stretchTabs))},inputs:{color:"color",fitInkBarToContent:[2,"fitInkBarToContent","fitInkBarToContent",ot],stretchTabs:[2,"mat-stretch-tabs","stretchTabs",ot],alignTabs:[0,"mat-align-tabs","alignTabs"],dynamicHeight:[2,"dynamicHeight","dynamicHeight",ot],selectedIndex:[2,"selectedIndex","selectedIndex",Tu],headerPosition:"headerPosition",animationDuration:"animationDuration",contentTabIndex:[2,"contentTabIndex","contentTabIndex",Tu],disablePagination:[2,"disablePagination","disablePagination",ot],disableRipple:[2,"disableRipple","disableRipple",ot],preserveContent:[2,"preserveContent","preserveContent",ot],backgroundColor:"backgroundColor",ariaLabel:[0,"aria-label","ariaLabel"],ariaLabelledby:[0,"aria-labelledby","ariaLabelledby"]},outputs:{selectedIndexChange:"selectedIndexChange",focusChange:"focusChange",animationDone:"animationDone",selectedTabChange:"selectedTabChange"},exportAs:["matTabGroup"],features:[Zr([{provide:xw,useExisting:e}])],ngContentSelectors:gy,decls:9,vars:8,consts:[["tabHeader",""],["tabBodyWrapper",""],["tabNode",""],[3,"indexFocused","selectFocusedIndex","selectedIndex","disableRipple","disablePagination","aria-label","aria-labelledby"],["role","tab","matTabLabelWrapper","","cdkMonitorElementFocus","",1,"mdc-tab","mat-mdc-tab","mat-focus-indicator",3,"id","mdc-tab--active","class","disabled","fitInkBarToContent"],[1,"mat-mdc-tab-body-wrapper"],["role","tabpanel",3,"id","class","content","position","animationDuration","preserveContent"],["role","tab","matTabLabelWrapper","","cdkMonitorElementFocus","",1,"mdc-tab","mat-mdc-tab","mat-focus-indicator",3,"click","cdkFocusChange","id","disabled","fitInkBarToContent"],[1,"mdc-tab__ripple"],["mat-ripple","",1,"mat-mdc-tab-ripple",3,"matRippleTrigger","matRippleDisabled"],[1,"mdc-tab__content"],[1,"mdc-tab__text-label"],[3,"cdkPortalOutlet"],["role","tabpanel",3,"_onCentered","_onCentering","_beforeCentering","id","content","position","animationDuration","preserveContent"]],template:function(r,i){r&1&&($o(),G(0,"mat-tab-header",3,0),on("indexFocused",function(s){return i._focusChanged(s)})("selectFocusedIndex",function(s){return i.selectedIndex=s}),Vo(2,kN,8,17,"div",4,bu),se(),Ut(4,NN,1,0),G(5,"div",5,1),Vo(7,ON,1,10,"mat-tab-body",6,bu),se()),r&2&&(rn("selectedIndex",i.selectedIndex||0)("disableRipple",i.disableRipple)("disablePagination",i.disablePagination),vu("aria-label",i.ariaLabel)("aria-labelledby",i.ariaLabelledby),Z(2),Uo(i._tabs),Z(2),$t(i._isServer?4:-1),Z(),mt("_mat-animation-noopable",i._animationsDisabled()),Z(2),Uo(i._tabs))},dependencies:[HN,Rw,iy,dy,Xg,hy],styles:[`.mdc-tab {
  min-width: 90px;
  padding: 0 24px;
  display: flex;
  flex: 1 0 auto;
  justify-content: center;
  box-sizing: border-box;
  border: none;
  outline: none;
  text-align: center;
  white-space: nowrap;
  cursor: pointer;
  z-index: 1;
  touch-action: manipulation;
}

.mdc-tab__content {
  display: flex;
  align-items: center;
  justify-content: center;
  height: inherit;
  pointer-events: none;
}

.mdc-tab__text-label {
  transition: 150ms color linear;
  display: inline-block;
  line-height: 1;
  z-index: 2;
}

.mdc-tab--active .mdc-tab__text-label {
  transition-delay: 100ms;
}

._mat-animation-noopable .mdc-tab__text-label {
  transition: none;
}

.mdc-tab-indicator {
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  justify-content: center;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
}

.mdc-tab-indicator__content {
  transition: var(--mat-tab-animation-duration, 250ms) transform cubic-bezier(0.4, 0, 0.2, 1);
  transform-origin: left;
  opacity: 0;
}

.mdc-tab-indicator__content--underline {
  align-self: flex-end;
  box-sizing: border-box;
  width: 100%;
  border-top-style: solid;
}

.mdc-tab-indicator--active .mdc-tab-indicator__content {
  opacity: 1;
}

._mat-animation-noopable .mdc-tab-indicator__content, .mdc-tab-indicator--no-transition .mdc-tab-indicator__content {
  transition: none;
}

.mat-mdc-tab-ripple.mat-mdc-tab-ripple {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  pointer-events: none;
}

.mat-mdc-tab {
  -webkit-tap-highlight-color: transparent;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-decoration: none;
  background: none;
  height: var(--mat-tab-container-height, 48px);
  font-family: var(--mat-tab-label-text-font, var(--mat-sys-title-small-font));
  font-size: var(--mat-tab-label-text-size, var(--mat-sys-title-small-size));
  letter-spacing: var(--mat-tab-label-text-tracking, var(--mat-sys-title-small-tracking));
  line-height: var(--mat-tab-label-text-line-height, var(--mat-sys-title-small-line-height));
  font-weight: var(--mat-tab-label-text-weight, var(--mat-sys-title-small-weight));
}
.mat-mdc-tab.mdc-tab {
  flex-grow: 0;
}
.mat-mdc-tab .mdc-tab-indicator__content--underline {
  border-color: var(--mat-tab-active-indicator-color, var(--mat-sys-primary));
  border-top-width: var(--mat-tab-active-indicator-height, 2px);
  border-radius: var(--mat-tab-active-indicator-shape, 0);
}
.mat-mdc-tab:hover .mdc-tab__text-label {
  color: var(--mat-tab-inactive-hover-label-text-color, var(--mat-sys-on-surface));
}
.mat-mdc-tab:focus .mdc-tab__text-label {
  color: var(--mat-tab-inactive-focus-label-text-color, var(--mat-sys-on-surface));
}
.mat-mdc-tab.mdc-tab--active .mdc-tab__text-label {
  color: var(--mat-tab-active-label-text-color, var(--mat-sys-on-surface));
}
.mat-mdc-tab.mdc-tab--active .mdc-tab__ripple::before,
.mat-mdc-tab.mdc-tab--active .mat-ripple-element {
  background-color: var(--mat-tab-active-ripple-color, var(--mat-sys-on-surface));
}
.mat-mdc-tab.mdc-tab--active:hover .mdc-tab__text-label {
  color: var(--mat-tab-active-hover-label-text-color, var(--mat-sys-on-surface));
}
.mat-mdc-tab.mdc-tab--active:hover .mdc-tab-indicator__content--underline {
  border-color: var(--mat-tab-active-hover-indicator-color, var(--mat-sys-primary));
}
.mat-mdc-tab.mdc-tab--active:focus .mdc-tab__text-label {
  color: var(--mat-tab-active-focus-label-text-color, var(--mat-sys-on-surface));
}
.mat-mdc-tab.mdc-tab--active:focus .mdc-tab-indicator__content--underline {
  border-color: var(--mat-tab-active-focus-indicator-color, var(--mat-sys-primary));
}
.mat-mdc-tab.mat-mdc-tab-disabled {
  opacity: 0.4;
  pointer-events: none;
}
.mat-mdc-tab.mat-mdc-tab-disabled .mdc-tab__content {
  pointer-events: none;
}
.mat-mdc-tab.mat-mdc-tab-disabled .mdc-tab__ripple::before,
.mat-mdc-tab.mat-mdc-tab-disabled .mat-ripple-element {
  background-color: var(--mat-tab-disabled-ripple-color, var(--mat-sys-on-surface-variant));
}
.mat-mdc-tab .mdc-tab__ripple::before {
  content: "";
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0;
  pointer-events: none;
  background-color: var(--mat-tab-inactive-ripple-color, var(--mat-sys-on-surface));
}
.mat-mdc-tab .mdc-tab__text-label {
  color: var(--mat-tab-inactive-label-text-color, var(--mat-sys-on-surface));
  display: inline-flex;
  align-items: center;
}
.mat-mdc-tab .mdc-tab__content {
  position: relative;
  pointer-events: auto;
}
.mat-mdc-tab:hover .mdc-tab__ripple::before {
  opacity: 0.04;
}
.mat-mdc-tab.cdk-program-focused .mdc-tab__ripple::before, .mat-mdc-tab.cdk-keyboard-focused .mdc-tab__ripple::before {
  opacity: 0.12;
}
.mat-mdc-tab .mat-ripple-element {
  opacity: 0.12;
  background-color: var(--mat-tab-inactive-ripple-color, var(--mat-sys-on-surface));
}
.mat-mdc-tab-group.mat-mdc-tab-group-stretch-tabs > .mat-mdc-tab-header .mat-mdc-tab {
  flex-grow: 1;
}

.mat-mdc-tab-group {
  display: flex;
  flex-direction: column;
  max-width: 100%;
}
.mat-mdc-tab-group.mat-tabs-with-background > .mat-mdc-tab-header, .mat-mdc-tab-group.mat-tabs-with-background > .mat-mdc-tab-header-pagination {
  background-color: var(--mat-tab-background-color);
}
.mat-mdc-tab-group.mat-tabs-with-background.mat-primary > .mat-mdc-tab-header .mat-mdc-tab .mdc-tab__text-label {
  color: var(--mat-tab-foreground-color);
}
.mat-mdc-tab-group.mat-tabs-with-background.mat-primary > .mat-mdc-tab-header .mdc-tab-indicator__content--underline {
  border-color: var(--mat-tab-foreground-color);
}
.mat-mdc-tab-group.mat-tabs-with-background:not(.mat-primary) > .mat-mdc-tab-header .mat-mdc-tab:not(.mdc-tab--active) .mdc-tab__text-label {
  color: var(--mat-tab-foreground-color);
}
.mat-mdc-tab-group.mat-tabs-with-background:not(.mat-primary) > .mat-mdc-tab-header .mat-mdc-tab:not(.mdc-tab--active) .mdc-tab-indicator__content--underline {
  border-color: var(--mat-tab-foreground-color);
}
.mat-mdc-tab-group.mat-tabs-with-background > .mat-mdc-tab-header .mat-mdc-tab-header-pagination-chevron,
.mat-mdc-tab-group.mat-tabs-with-background > .mat-mdc-tab-header .mat-focus-indicator::before, .mat-mdc-tab-group.mat-tabs-with-background > .mat-mdc-tab-header-pagination .mat-mdc-tab-header-pagination-chevron,
.mat-mdc-tab-group.mat-tabs-with-background > .mat-mdc-tab-header-pagination .mat-focus-indicator::before {
  border-color: var(--mat-tab-foreground-color);
}
.mat-mdc-tab-group.mat-tabs-with-background > .mat-mdc-tab-header .mat-ripple-element, .mat-mdc-tab-group.mat-tabs-with-background > .mat-mdc-tab-header .mdc-tab__ripple::before, .mat-mdc-tab-group.mat-tabs-with-background > .mat-mdc-tab-header-pagination .mat-ripple-element, .mat-mdc-tab-group.mat-tabs-with-background > .mat-mdc-tab-header-pagination .mdc-tab__ripple::before {
  background-color: var(--mat-tab-foreground-color);
}
.mat-mdc-tab-group.mat-tabs-with-background > .mat-mdc-tab-header .mat-mdc-tab-header-pagination-chevron, .mat-mdc-tab-group.mat-tabs-with-background > .mat-mdc-tab-header-pagination .mat-mdc-tab-header-pagination-chevron {
  color: var(--mat-tab-foreground-color);
}
.mat-mdc-tab-group.mat-mdc-tab-group-inverted-header {
  flex-direction: column-reverse;
}
.mat-mdc-tab-group.mat-mdc-tab-group-inverted-header .mdc-tab-indicator__content--underline {
  align-self: flex-start;
}

.mat-mdc-tab-body-wrapper {
  position: relative;
  overflow: hidden;
  display: flex;
  transition: height 500ms cubic-bezier(0.35, 0, 0.25, 1);
}
.mat-mdc-tab-body-wrapper._mat-animation-noopable {
  transition: none !important;
  animation: none !important;
}
`],encapsulation:2})}return e})(),my=class{index;tab};var kw=(()=>{class e{static \u0275fac=function(r){return new(r||e)};static \u0275mod=nn({type:e});static \u0275inj=Lt({imports:[pw]})}return e})();function Nw(e){e||(e=h(Qe));let t=new P(n=>{if(e.destroyed){n.next();return}return e.onDestroy(n.next.bind(n))});return n=>n.pipe(ye(t))}var GN="@sdux-vault/devtools",qN="0.9.0";Ki(GN,qN);var vy=null;function Cy(){return vy||(vy=new by),vy}var by=class{#t=new M;constructor(){window.sdux??={},window.sdux.vaultEventBus=this}nextPipeline(t){Xn.active&&t&&this.#t.next(t)}pipeline$(){return this.#t.asObservable()}};var $d=class e{constructor(t){this.zone=t;this.isChromeExtension=typeof chrome<"u"&&!!chrome?.runtime?.connect,this.isChromeExtension&&this.#e()}#t=new M;isChromeExtension;#r=Cy();#n=null;pipeline$(){return this.isChromeExtension?this.#t.asObservable():this.#r.pipeline$()}listenPipeline(t){let n=this.pipeline$().subscribe(t);return()=>n.unsubscribe()}#e(){this.#n=chrome.runtime.connect({name:"vault-devtools"}),this.#n.onMessage.addListener(t=>{t?.type&&this.zone.run(()=>{t.type==="VAULT_PIPELINE_EVENT"&&this.#t.next(t.event)})}),this.#n.onDisconnect.addListener(()=>{this.#n=null})}static \u0275fac=function(n){return new(n||e)(F(K))};static \u0275prov=C({token:e,factory:e.\u0275fac,providedIn:"root"})};var tt=class{vault=zg(tt);bus=h($d);destroyRef=h(Qe);events=St(()=>this.vault.state.value()??[]);totalEvents=St(()=>this.events().length);constructor(){this.vault.initialize(),this.vault.fromStream(this.bus.pipeline$().pipe(ge(t=>!!t&&t.cell!==rs),Nw(this.destroyRef)))}clearEvents(){this.vault.reset(),this.vault.replaceState({value:[]})}};b(tt,"\u0275fac",function(n){return new(n||tt)}),b(tt,"\u0275prov",C({token:tt,factory:tt.\u0275fac,providedIn:"root"})),tt=Q([Hg(rs)],tt);function KN(e,t){if(e&1&&(Ue(0,"pre"),J(1),Vi(2,"json"),De()),e&2){let n,r=$e(2);Z(),yr(ya(2,1,(n=r.event().state)==null?null:n.value))}}function ZN(e,t){if(e&1&&(Ue(0,"div",5)(1,"h4"),J(2,"Payload"),De(),Ue(3,"pre"),J(4),Vi(5,"json"),De()()),e&2){let n=$e(2);Z(4),yr(ya(5,1,n.event().payload))}}function YN(e,t){if(e&1&&(Ue(0,"div",7)(1,"h4"),J(2,"Error"),De(),Ue(3,"pre"),J(4),Vi(5,"json"),De()()),e&2){let n=$e(2);Z(4),yr(ya(5,1,n.event().error))}}function QN(e,t){if(e&1&&(Ue(0,"div",0)(1,"div",1),J(2),Vi(3,"number"),De(),Ue(4,"div",2),J(5),De(),Ue(6,"div"),J(7),De(),Ue(8,"div",3),J(9),Vi(10,"date"),De()(),Ue(11,"details",4)(12,"summary"),J(13,"Details"),De(),Ue(14,"div",5)(15,"h4"),J(16,"State"),De(),Ue(17,"ul",6)(18,"li")(19,"strong"),J(20,"id:"),De(),J(21),De(),Ue(22,"li")(23,"strong"),J(24,"isLoading:"),De(),J(25),De(),Ue(26,"li")(27,"strong"),J(28,"hasValue:"),De(),J(29),De(),Ue(30,"li")(31,"strong"),J(32,"error:"),De(),J(33),De()(),Ut(34,KN,3,3,"pre"),De(),Ut(35,ZN,6,3,"div",5),Ut(36,YN,6,3,"div",7),De()),e&2){let n,r,i,o,s=$e();Z(2),Ht(" ",_u(3,14,s.totalEvents(),"3.0")," "),Z(3),yr(s.event().cell),Z(),ji(Wh("badge ",s.event().type)),Z(),Ht(" ",s.event().type.toUpperCase()," "),Z(2),Ht(" ",_u(10,17,s.event().timestamp,"HH:mm:ss.SSS")," "),Z(12),Ht(" ",s.event().id),Z(4),Ht(" ",(n=s.event().state)==null?null:n.isLoading),Z(4),Ht(" ",(r=s.event().state)==null?null:r.hasValue),Z(4),Ht(" ",((i=s.event().state)==null||i.error==null?null:i.error.message)??"null"," "),Z(),$t((o=s.event().state)!=null&&o.value?34:-1),Z(),$t(s.event().payload?35:-1),Z(),$t(s.event().error?36:-1)}}var Hd=class e{event=ba.required();totalEvents=ba.required();static \u0275fac=function(n){return new(n||e)};static \u0275cmp=Fe({type:e,selectors:[["sdux-devtools-pipeline-event"]],inputs:{event:[1,"event"],totalEvents:[1,"totalEvents"]},decls:1,vars:1,consts:[[1,"event-row-header"],[1,"counter"],[1,"cell"],[1,"ts"],[1,"event-details"],[1,"detail-block"],[1,"kv"],[1,"detail-block","error-block"]],template:function(n,r){n&1&&Ut(0,QN,37,20),n&2&&$t(r.event()?0:-1)},dependencies:[Ou,am,cm,sm],styles:[".pointer[_ngcontent-%COMP%]{cursor:pointer}.event-row-header[_ngcontent-%COMP%]{width:100%;display:grid;grid-template-columns:4rem 140px 1fr auto;align-items:center;gap:1rem}.badge[_ngcontent-%COMP%]{color:#fff;font-weight:600;font-family:Inter,system-ui,sans-serif;font-size:.75rem;padding:.25rem .5rem;border-radius:.25rem;justify-self:start}.badge.init[_ngcontent-%COMP%]{background-color:#388e3c}.badge.patch[_ngcontent-%COMP%]{background-color:#fbc02d;color:#000}.badge.error[_ngcontent-%COMP%]{background-color:#d32f2f}.counter[_ngcontent-%COMP%]{color:#94a3b8;font-weight:400;font-family:Inter,system-ui,sans-serif;font-size:.875rem;width:3rem;text-align:left}.cell[_ngcontent-%COMP%]{color:#94a3b8;font-weight:400;font-family:Inter,system-ui,sans-serif;font-weight:500;font-size:1rem;min-width:125px}.ts[_ngcontent-%COMP%]{color:#94a3b8;font-weight:400;font-family:Inter,system-ui,sans-serif;font-size:.75rem;white-space:nowrap}.event-details[_ngcontent-%COMP%]{grid-column:1/-1;margin-top:.25rem;padding-left:.5rem}.event-details[_ngcontent-%COMP%]   summary[_ngcontent-%COMP%]{cursor:pointer;color:#1976d2;font-weight:400;font-family:Inter,system-ui,sans-serif;font-size:.875rem;margin-bottom:.25rem}.event-details[_ngcontent-%COMP%]   summary[_ngcontent-%COMP%]:hover{text-decoration:underline}.event-details[_ngcontent-%COMP%]   .detail-block[_ngcontent-%COMP%]{margin-bottom:1rem}.event-details[_ngcontent-%COMP%]   .detail-block[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%]{color:#e2e8f0;font-weight:600;font-family:Inter,system-ui,sans-serif;font-size:1rem;margin-bottom:.25rem}.event-details[_ngcontent-%COMP%]   .detail-block[_ngcontent-%COMP%]   .kv[_ngcontent-%COMP%]{list-style:none;padding:0;margin:0 0 .25rem}.event-details[_ngcontent-%COMP%]   .detail-block[_ngcontent-%COMP%]   .kv[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]{margin-bottom:.25rem;font-size:.875rem}.event-details[_ngcontent-%COMP%]   .detail-block[_ngcontent-%COMP%]   pre[_ngcontent-%COMP%]{background-color:#0f172a;border:1px solid #63a4ff;border-radius:.3125rem;padding:.5rem;font-size:.75rem;overflow-x:auto;color:#e2e8f0}.event-details[_ngcontent-%COMP%]   .error-block[_ngcontent-%COMP%]   pre[_ngcontent-%COMP%]{background-color:#b71c1c;border-color:#ef5350}"]})};var XN=(e,t)=>t.id;function JN(e,t){if(e&1&&(G(0,"div",3),We(1,"sdux-devtools-pipeline-event",4),se()),e&2){let n=t.$implicit,r=t.$index,i=$e(2);Z(),rn("event",n)("totalEvents",i.totalEvents()-r)}}function eO(e,t){if(e&1&&(G(0,"div",2),Vo(1,JN,2,2,"div",3,XN),se()),e&2){let n=$e();Z(),Uo(n.events())}}var zd=class e{devtools=h(tt);events=St(()=>this.devtools.events());totalEvents=this.devtools.totalEvents;static \u0275fac=function(n){return new(n||e)};static \u0275cmp=Fe({type:e,selectors:[["sdux-devtools-main-pipeline-panel"]],decls:3,vars:1,consts:[[1,"vault-devtools"],[1,"event-stream"],[1,"event-list"],[1,"event-row"],[3,"event","totalEvents"]],template:function(n,r){n&1&&(G(0,"div",0)(1,"section",1),Ut(2,eO,3,0,"div",2),se()()),n&2&&(Z(2),$t(r.events()?2:-1))},dependencies:[Hd],styles:[".pointer[_ngcontent-%COMP%]{cursor:pointer}.vault-devtools[_ngcontent-%COMP%]{display:flex;flex-direction:column;padding:1rem;color:#e2e8f0;font-weight:400;font-family:Inter,system-ui,sans-serif}.vault-devtools[_ngcontent-%COMP%]   .event-stream[_ngcontent-%COMP%]{flex:1;display:flex;flex-direction:column}.vault-devtools[_ngcontent-%COMP%]   .event-stream[_ngcontent-%COMP%]   .event-list[_ngcontent-%COMP%]{flex:1;overflow-y:auto;padding-right:.25rem;padding-bottom:max(2rem,10vh)}.vault-devtools[_ngcontent-%COMP%]   .event-stream[_ngcontent-%COMP%]   .event-list[_ngcontent-%COMP%]::-webkit-scrollbar{width:8px}.vault-devtools[_ngcontent-%COMP%]   .event-stream[_ngcontent-%COMP%]   .event-list[_ngcontent-%COMP%]::-webkit-scrollbar-thumb{background-color:#63a4ff;border-radius:.25rem}.vault-devtools[_ngcontent-%COMP%]   .event-row[_ngcontent-%COMP%]{display:block;padding:.5rem;background-color:#0a0e1a;border-bottom:1px solid #63a4ff}.vault-devtools[_ngcontent-%COMP%]   .event-row[_ngcontent-%COMP%]:hover{background-color:#ffffff14}.vault-devtools[_ngcontent-%COMP%]   .event-row-header[_ngcontent-%COMP%]{width:100%;display:grid;grid-template-columns:4rem 140px 1fr auto;align-items:center;gap:1rem}.vault-devtools[_ngcontent-%COMP%]   .badge[_ngcontent-%COMP%]{color:#fff;font-weight:600;font-family:Inter,system-ui,sans-serif;font-size:.75rem;padding:.25rem .5rem;border-radius:.25rem;justify-self:start}.vault-devtools[_ngcontent-%COMP%]   .badge.init[_ngcontent-%COMP%]{background-color:#388e3c}.vault-devtools[_ngcontent-%COMP%]   .badge.patch[_ngcontent-%COMP%]{background-color:#fbc02d;color:#000}.vault-devtools[_ngcontent-%COMP%]   .badge.error[_ngcontent-%COMP%]{background-color:#d32f2f}.vault-devtools[_ngcontent-%COMP%]   .counter[_ngcontent-%COMP%]{color:#94a3b8;font-weight:400;font-family:Inter,system-ui,sans-serif;font-size:.875rem;width:3rem;text-align:left}.vault-devtools[_ngcontent-%COMP%]   .cell[_ngcontent-%COMP%]{color:#94a3b8;font-weight:400;font-family:Inter,system-ui,sans-serif;font-weight:500;font-size:1rem;min-width:125px}.vault-devtools[_ngcontent-%COMP%]   .ts[_ngcontent-%COMP%]{color:#94a3b8;font-weight:400;font-family:Inter,system-ui,sans-serif;font-size:.75rem;white-space:nowrap}.vault-devtools[_ngcontent-%COMP%]   .event-details[_ngcontent-%COMP%]{grid-column:1/-1;margin-top:.25rem;padding-left:.5rem}.vault-devtools[_ngcontent-%COMP%]   .event-details[_ngcontent-%COMP%]   summary[_ngcontent-%COMP%]{cursor:pointer;color:#1976d2;font-weight:400;font-family:Inter,system-ui,sans-serif;font-size:.875rem;margin-bottom:.25rem}.vault-devtools[_ngcontent-%COMP%]   .event-details[_ngcontent-%COMP%]   summary[_ngcontent-%COMP%]:hover{text-decoration:underline}.vault-devtools[_ngcontent-%COMP%]   .event-details[_ngcontent-%COMP%]   .detail-block[_ngcontent-%COMP%]{margin-bottom:1rem}.vault-devtools[_ngcontent-%COMP%]   .event-details[_ngcontent-%COMP%]   .detail-block[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%]{color:#e2e8f0;font-weight:600;font-family:Inter,system-ui,sans-serif;font-size:1rem;margin-bottom:.25rem}.vault-devtools[_ngcontent-%COMP%]   .event-details[_ngcontent-%COMP%]   .detail-block[_ngcontent-%COMP%]   .kv[_ngcontent-%COMP%]{list-style:none;padding:0;margin:0 0 .25rem}.vault-devtools[_ngcontent-%COMP%]   .event-details[_ngcontent-%COMP%]   .detail-block[_ngcontent-%COMP%]   .kv[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]{margin-bottom:.25rem;font-size:.875rem}.vault-devtools[_ngcontent-%COMP%]   .event-details[_ngcontent-%COMP%]   .detail-block[_ngcontent-%COMP%]   pre[_ngcontent-%COMP%]{background-color:#0f172a;border:1px solid #63a4ff;border-radius:.3125rem;padding:.5rem;font-size:.75rem;overflow-x:auto;color:#e2e8f0}.vault-devtools[_ngcontent-%COMP%]   .event-details[_ngcontent-%COMP%]   .error-block[_ngcontent-%COMP%]   pre[_ngcontent-%COMP%]{background-color:#b71c1c;border-color:#ef5350}"]})};function tO(e,t){e&1&&(G(0,"mat-tab-group",9)(1,"mat-tab",10)(2,"section",11),We(3,"sdux-devtools-main-pipeline-panel"),se()(),G(4,"mat-tab",12),We(5,"section",11),se(),G(6,"mat-tab",13),We(7,"section",11),se()())}function nO(e,t){e&1&&(G(0,"section",14),J(1," Events only appear "),G(2,"strong"),J(3,"after this panel opens and a decorated @FeatureCell service is instantiated."),se(),J(4,". "),G(5,"p"),J(6," FeatureCells are lazyloaded and only activated when the service is instantiated. The DevTools "),G(7,"strong"),J(8,"will only"),se(),J(9," connect once an @FeatureCell is active. "),se(),G(10,"p"),J(11," Click on a route with a component using an injected @FeatureCell service to trigger events in your app. "),se()(),G(12,"section",15),We(13,"img",16),se())}var Wd=class e{devtools=h(tt);events=St(()=>this.devtools.events());totalEvents=St(()=>this.events()?.length);clearEvents(){this.devtools.clearEvents()}static \u0275fac=function(n){return new(n||e)};static \u0275cmp=Fe({type:e,selectors:[["sdux-devtools-splash-page"]],decls:14,vars:2,consts:[[1,"vault-devtools"],[1,"header"],[1,"title"],[1,"logo"],["src","/assets/brand/brand-landscape-dark.svg","alt","SDuX Vault"],[1,"subtitle"],[1,"meta"],[1,"event-count"],["type","button",1,"btn-clear",3,"click"],["animationDuration","200ms",1,"vault-tabs"],["label","All Pipeline Events"],[1,"vault-tab-content"],["label","Pipeline Error Events"],["label","Pipeline Warn Events"],[1,"warning"],[1,"vault-empty"],["src","/assets/brand/brand-landscape-dark.svg","alt","SDuX Vault logo",1,"logo"]],template:function(n,r){n&1&&(G(0,"div",0)(1,"header",1)(2,"div",2)(3,"div",3),We(4,"img",4),se(),G(5,"span",5),J(6,"DevTools (v7)"),se()(),G(7,"div",6)(8,"span",7),J(9),se(),G(10,"button",8),on("click",function(){return r.clearEvents()}),J(11," Clear "),se()()(),Ut(12,tO,8,0,"mat-tab-group",9)(13,nO,14,0),se()),n&2&&(Z(9),Ht("",r.totalEvents()," events"),Z(3),$t(r.totalEvents()?12:13))},dependencies:[kw,yy,Aw,zd],styles:['@charset "UTF-8";.pointer[_ngcontent-%COMP%]{cursor:pointer}.vault-devtools[_ngcontent-%COMP%]{height:calc(100% - 2rem);min-height:0;display:flex;flex-direction:column;padding:1rem;background-color:#0f172a;border:1px solid #63a4ff;color:#e2e8f0;font-weight:400;font-family:Inter,system-ui,sans-serif;border:none}.vault-devtools[_ngcontent-%COMP%]   .header[_ngcontent-%COMP%]{display:flex;justify-content:space-between;align-items:center;margin-bottom:1rem;border-bottom:1px solid #63a4ff}.vault-devtools[_ngcontent-%COMP%]   .header[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%]{display:flex;align-items:center;gap:.5rem}.vault-devtools[_ngcontent-%COMP%]   .header[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%]   .logo[_ngcontent-%COMP%]{width:120px}.vault-devtools[_ngcontent-%COMP%]   .header[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%]   .subtitle[_ngcontent-%COMP%]{color:#94a3b8;font-weight:400;font-family:Inter,system-ui,sans-serif;font-size:1rem}.vault-devtools[_ngcontent-%COMP%]   .header[_ngcontent-%COMP%]   .meta[_ngcontent-%COMP%]{display:flex;align-items:center;gap:1rem}.vault-devtools[_ngcontent-%COMP%]   .header[_ngcontent-%COMP%]   .meta[_ngcontent-%COMP%]   .event-count[_ngcontent-%COMP%]{color:#94a3b8;font-weight:400;font-family:Inter,system-ui,sans-serif;font-size:.875rem}.vault-devtools[_ngcontent-%COMP%]   .header[_ngcontent-%COMP%]   .meta[_ngcontent-%COMP%]   .btn-clear[_ngcontent-%COMP%]{height:40px!important;min-width:90px!important;display:flex;flex-direction:row;justify-content:center;align-items:center;color:#fff!important;background-color:transparent!important;border:1px solid #63a4ff!important;border-radius:.3125rem!important;font-size:.875rem!important;padding:.5rem;gap:.25rem;font-weight:600}.vault-devtools[_ngcontent-%COMP%]   .header[_ngcontent-%COMP%]   .meta[_ngcontent-%COMP%]   .btn-clear[_ngcontent-%COMP%]   .mat-icon[_ngcontent-%COMP%]{transform:scale(.75)}.vault-devtools[_ngcontent-%COMP%]   .header[_ngcontent-%COMP%]   .meta[_ngcontent-%COMP%]   .btn-clear[_ngcontent-%COMP%]{cursor:pointer;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.vault-devtools[_ngcontent-%COMP%]   .header[_ngcontent-%COMP%]   .meta[_ngcontent-%COMP%]   .btn-clear[_ngcontent-%COMP%]   .button-text[_ngcontent-%COMP%]{height:40px}.vault-devtools[_ngcontent-%COMP%]   .header[_ngcontent-%COMP%]   .meta[_ngcontent-%COMP%]   .btn-clear[_ngcontent-%COMP%]   .mat-icon[_ngcontent-%COMP%]{width:22px!important;height:22px!important;position:relative;padding-left:.25rem;padding-right:.25rem;gap:.25rem}.vault-devtools[_ngcontent-%COMP%]   .header[_ngcontent-%COMP%]   .meta[_ngcontent-%COMP%]   .btn-clear[_ngcontent-%COMP%]:focus{outline:none}.vault-devtools[_ngcontent-%COMP%]   .header[_ngcontent-%COMP%]   .meta[_ngcontent-%COMP%]   .btn-clear[_ngcontent-%COMP%]:hover{background-color:#ffffff14!important}.vault-devtools[_ngcontent-%COMP%]   .warning[_ngcontent-%COMP%]{background-color:#fff263;border-left:4px solid #c49000;color:#000;padding:.5rem 1rem;border-radius:.3125rem;margin-bottom:1rem;font-size:.875rem}.vault-devtools[_ngcontent-%COMP%]   .vault-tabs[_ngcontent-%COMP%]{flex:1;min-height:0;display:flex;flex-direction:column}.vault-devtools[_ngcontent-%COMP%]   .vault-tabs[_ngcontent-%COMP%]   .mat-mdc-tab-header[_ngcontent-%COMP%]{background-color:#0a0e1a;border-bottom:1px solid #63a4ff}.vault-devtools[_ngcontent-%COMP%]   .vault-tabs[_ngcontent-%COMP%]   .mat-mdc-tab-body-wrapper[_ngcontent-%COMP%]{flex:1;min-height:0;display:flex}.vault-devtools[_ngcontent-%COMP%]   .vault-tabs[_ngcontent-%COMP%]   .mat-mdc-tab-body[_ngcontent-%COMP%]{flex:1;min-height:0}.vault-devtools[_ngcontent-%COMP%]   .vault-tabs[_ngcontent-%COMP%]   .mat-mdc-tab-body[_ngcontent-%COMP%]   .mat-mdc-tab-body-content[_ngcontent-%COMP%]{height:100%;min-height:0;overflow:hidden}.vault-devtools[_ngcontent-%COMP%]   .vault-tab-content[_ngcontent-%COMP%]{flex:1;min-height:0;overflow-y:auto;padding-right:.5rem}.vault-devtools[_ngcontent-%COMP%]   .vault-tab-content[_ngcontent-%COMP%]::-webkit-scrollbar{width:8px}.vault-devtools[_ngcontent-%COMP%]   .vault-tab-content[_ngcontent-%COMP%]::-webkit-scrollbar-thumb{background-color:#63a4ff;border-radius:.25rem}.vault-devtools[_ngcontent-%COMP%]   .vault-empty[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center}.vault-devtools[_ngcontent-%COMP%]   .vault-empty[_ngcontent-%COMP%]   .logo[_ngcontent-%COMP%]{width:200px;height:auto;filter:drop-shadow(0 2px 4px rgba(0,0,0,.35));transition:opacity .25s ease}.vault-devtools[_ngcontent-%COMP%]   .vault-empty[_ngcontent-%COMP%]   .logo[_ngcontent-%COMP%]:hover{opacity:.9}  .mat-mdc-tab-label-container{background-color:#fff;border-top-left-radius:.5rem;border-top-right-radius:.5rem}']})};var Ow=[{path:"",component:Wd},{path:"**",redirectTo:""}];var Pw={providers:[Ap(),qh(),Wm(Ow,Gm()),Kg({logLevel:"error"}),qg(tt,{key:rs,initialState:[]},[un])]};var Gd=class e{static \u0275fac=function(n){return new(n||e)};static \u0275cmp=Fe({type:e,selectors:[["sdux-devtools-root"]],decls:2,vars:0,consts:[[1,"router-container"]],template:function(n,r){n&1&&(G(0,"div",0),We(1,"router-outlet"),se())},dependencies:[Wa],styles:[".router-container[_ngcontent-%COMP%]{height:100%}[_nghost-%COMP%]{display:block;height:100%}"]})};vm(Gd,Pw).catch(e=>console.error(e));
