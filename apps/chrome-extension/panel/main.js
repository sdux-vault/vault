var gv=Object.defineProperty,HT=Object.defineProperties,zT=Object.getOwnPropertyDescriptor,WT=Object.getOwnPropertyDescriptors;var mv=Object.getOwnPropertySymbols;var GT=Object.prototype.hasOwnProperty,qT=Object.prototype.propertyIsEnumerable;var yv=n=>{throw TypeError(n)};var vf=(n,e,t)=>e in n?gv(n,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):n[e]=t,g=(n,e)=>{for(var t in e||={})GT.call(e,t)&&vf(n,t,e[t]);if(mv)for(var t of mv(e))qT.call(e,t)&&vf(n,t,e[t]);return n},W=(n,e)=>HT(n,WT(e));var J=(n,e,t,r)=>{for(var i=r>1?void 0:r?zT(e,t):e,o=n.length-1,s;o>=0;o--)(s=n[o])&&(i=(r?s(e,t,i):s(i))||i);return r&&i&&gv(e,t,i),i};var _=(n,e,t)=>vf(n,typeof e!="symbol"?e+"":e,t),bf=(n,e,t)=>e.has(n)||yv("Cannot "+t);var Cf=(n,e,t)=>(bf(n,e,"read from private field"),t?t.call(n):e.get(n)),go=(n,e,t)=>e.has(n)?yv("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(n):e.set(n,t),_f=(n,e,t,r)=>(bf(n,e,"write to private field"),r?r.call(n,t):e.set(n,t),t),ar=(n,e,t)=>(bf(n,e,"access private method"),t);var rt=null,kc=!1,Df=1,KT=null,it=Symbol("SIGNAL");function A(n){let e=rt;return rt=n,e}function Lc(){return rt}var mi={version:0,lastCleanEpoch:0,dirty:!1,producers:void 0,producersTail:void 0,consumers:void 0,consumersTail:void 0,recomputing:!1,consumerAllowSignalWrites:!1,consumerIsAlwaysLive:!1,kind:"unknown",producerMustRecompute:()=>!1,producerRecomputeValue:()=>{},consumerMarkedDirty:()=>{},consumerOnSignalRead:()=>{}};function yo(n){if(kc)throw new Error("");if(rt===null)return;rt.consumerOnSignalRead(n);let e=rt.producersTail;if(e!==void 0&&e.producer===n)return;let t,r=rt.recomputing;if(r&&(t=e!==void 0?e.nextProducer:rt.producers,t!==void 0&&t.producer===n)){rt.producersTail=t,t.lastReadVersion=n.version;return}let i=n.consumersTail;if(i!==void 0&&i.consumer===rt&&(!r||YT(i,rt)))return;let o=bo(rt),s={producer:n,consumer:rt,nextProducer:t,prevConsumer:i,lastReadVersion:n.version,nextConsumer:void 0};rt.producersTail=s,e!==void 0?e.nextProducer=s:rt.producers=s,o&&_v(n,s)}function vv(){Df++}function Fc(n){if(!(bo(n)&&!n.dirty)&&!(!n.dirty&&n.lastCleanEpoch===Df)){if(!n.producerMustRecompute(n)&&!Os(n)){Pc(n);return}n.producerRecomputeValue(n),Pc(n)}}function Ef(n){if(n.consumers===void 0)return;let e=kc;kc=!0;try{for(let t=n.consumers;t!==void 0;t=t.nextConsumer){let r=t.consumer;r.dirty||ZT(r)}}finally{kc=e}}function wf(){return rt?.consumerAllowSignalWrites!==!1}function ZT(n){n.dirty=!0,Ef(n),n.consumerMarkedDirty?.(n)}function Pc(n){n.dirty=!1,n.lastCleanEpoch=Df}function gi(n){return n&&bv(n),A(n)}function bv(n){n.producersTail=void 0,n.recomputing=!0}function vo(n,e){A(e),n&&Cv(n)}function Cv(n){n.recomputing=!1;let e=n.producersTail,t=e!==void 0?e.nextProducer:n.producers;if(t!==void 0){if(bo(n))do t=Tf(t);while(t!==void 0);e!==void 0?e.nextProducer=void 0:n.producers=void 0}}function Os(n){for(let e=n.producers;e!==void 0;e=e.nextProducer){let t=e.producer,r=e.lastReadVersion;if(r!==t.version||(Fc(t),r!==t.version))return!0}return!1}function yi(n){if(bo(n)){let e=n.producers;for(;e!==void 0;)e=Tf(e)}n.producers=void 0,n.producersTail=void 0,n.consumers=void 0,n.consumersTail=void 0}function _v(n,e){let t=n.consumersTail,r=bo(n);if(t!==void 0?(e.nextConsumer=t.nextConsumer,t.nextConsumer=e):(e.nextConsumer=void 0,n.consumers=e),e.prevConsumer=t,n.consumersTail=e,!r)for(let i=n.producers;i!==void 0;i=i.nextProducer)_v(i.producer,i)}function Tf(n){let e=n.producer,t=n.nextProducer,r=n.nextConsumer,i=n.prevConsumer;if(n.nextConsumer=void 0,n.prevConsumer=void 0,r!==void 0?r.prevConsumer=i:e.consumersTail=i,i!==void 0)i.nextConsumer=r;else if(e.consumers=r,!bo(e)){let o=e.producers;for(;o!==void 0;)o=Tf(o)}return t}function bo(n){return n.consumerIsAlwaysLive||n.consumers!==void 0}function Bc(n){KT?.(n)}function YT(n,e){let t=e.producersTail;if(t!==void 0){let r=e.producers;do{if(r===n)return!0;if(r===t)break;r=r.nextProducer}while(r!==void 0)}return!1}function jc(n,e){return Object.is(n,e)}function Vc(n,e){let t=Object.create(QT);t.computation=n,e!==void 0&&(t.equal=e);let r=()=>{if(Fc(t),yo(t),t.value===Ns)throw t.error;return t.value};return r[it]=t,Bc(t),r}var Nc=Symbol("UNSET"),Oc=Symbol("COMPUTING"),Ns=Symbol("ERRORED"),QT=W(g({},mi),{value:Nc,dirty:!0,error:null,equal:jc,kind:"computed",producerMustRecompute(n){return n.value===Nc||n.value===Oc},producerRecomputeValue(n){if(n.value===Oc)throw new Error("");let e=n.value;n.value=Oc;let t=gi(n),r,i=!1;try{r=n.computation(),A(null),i=e!==Nc&&e!==Ns&&r!==Ns&&n.equal(e,r)}catch(o){r=Ns,n.error=o}finally{vo(n,t)}if(i){n.value=e;return}n.value=r,n.version++}});function XT(){throw new Error}var Dv=XT;function Ev(n){Dv(n)}function If(n){Dv=n}var JT=null;function Sf(n,e){let t=Object.create(Uc);t.value=n,e!==void 0&&(t.equal=e);let r=()=>wv(t);return r[it]=t,Bc(t),[r,s=>Co(t,s),s=>Mf(t,s)]}function wv(n){return yo(n),n.value}function Co(n,e){wf()||Ev(n),n.equal(n.value,e)||(n.value=e,eI(n))}function Mf(n,e){wf()||Ev(n),Co(n,e(n.value))}var Uc=W(g({},mi),{equal:jc,value:void 0,kind:"signal"});function eI(n){n.version++,vv(),Ef(n),JT?.(n)}var xf=W(g({},mi),{consumerIsAlwaysLive:!0,consumerAllowSignalWrites:!0,dirty:!0,kind:"effect"});function Rf(n){if(n.dirty=!1,n.version>0&&!Os(n))return;n.version++;let e=gi(n);try{n.cleanup(),n.fn()}finally{vo(n,e)}}function V(n){return typeof n=="function"}function _o(n){let t=n(r=>{Error.call(r),r.stack=new Error().stack});return t.prototype=Object.create(Error.prototype),t.prototype.constructor=t,t}var $c=_o(n=>function(t){n(this),this.message=t?`${t.length} errors occurred during unsubscription:
${t.map((r,i)=>`${i+1}) ${r.toString()}`).join(`
  `)}`:"",this.name="UnsubscriptionError",this.errors=t});function vi(n,e){if(n){let t=n.indexOf(e);0<=t&&n.splice(t,1)}}var q=class n{constructor(e){this.initialTeardown=e,this.closed=!1,this._parentage=null,this._finalizers=null}unsubscribe(){let e;if(!this.closed){this.closed=!0;let{_parentage:t}=this;if(t)if(this._parentage=null,Array.isArray(t))for(let o of t)o.remove(this);else t.remove(this);let{initialTeardown:r}=this;if(V(r))try{r()}catch(o){e=o instanceof $c?o.errors:[o]}let{_finalizers:i}=this;if(i){this._finalizers=null;for(let o of i)try{Tv(o)}catch(s){e=e??[],s instanceof $c?e=[...e,...s.errors]:e.push(s)}}if(e)throw new $c(e)}}add(e){var t;if(e&&e!==this)if(this.closed)Tv(e);else{if(e instanceof n){if(e.closed||e._hasParent(this))return;e._addParent(this)}(this._finalizers=(t=this._finalizers)!==null&&t!==void 0?t:[]).push(e)}}_hasParent(e){let{_parentage:t}=this;return t===e||Array.isArray(t)&&t.includes(e)}_addParent(e){let{_parentage:t}=this;this._parentage=Array.isArray(t)?(t.push(e),t):t?[t,e]:e}_removeParent(e){let{_parentage:t}=this;t===e?this._parentage=null:Array.isArray(t)&&vi(t,e)}remove(e){let{_finalizers:t}=this;t&&vi(t,e),e instanceof n&&e._removeParent(this)}};q.EMPTY=(()=>{let n=new q;return n.closed=!0,n})();var Af=q.EMPTY;function Hc(n){return n instanceof q||n&&"closed"in n&&V(n.remove)&&V(n.add)&&V(n.unsubscribe)}function Tv(n){V(n)?n():n.unsubscribe()}var Tn={onUnhandledError:null,onStoppedNotification:null,Promise:void 0,useDeprecatedSynchronousErrorHandling:!1,useDeprecatedNextContext:!1};var Do={setTimeout(n,e,...t){let{delegate:r}=Do;return r?.setTimeout?r.setTimeout(n,e,...t):setTimeout(n,e,...t)},clearTimeout(n){let{delegate:e}=Do;return(e?.clearTimeout||clearTimeout)(n)},delegate:void 0};function zc(n){Do.setTimeout(()=>{let{onUnhandledError:e}=Tn;if(e)e(n);else throw n})}function Ps(){}var Iv=kf("C",void 0,void 0);function Sv(n){return kf("E",void 0,n)}function Mv(n){return kf("N",n,void 0)}function kf(n,e,t){return{kind:n,value:e,error:t}}var bi=null;function Eo(n){if(Tn.useDeprecatedSynchronousErrorHandling){let e=!bi;if(e&&(bi={errorThrown:!1,error:null}),n(),e){let{errorThrown:t,error:r}=bi;if(bi=null,t)throw r}}else n()}function xv(n){Tn.useDeprecatedSynchronousErrorHandling&&bi&&(bi.errorThrown=!0,bi.error=n)}var Ci=class extends q{constructor(e){super(),this.isStopped=!1,e?(this.destination=e,Hc(e)&&e.add(this)):this.destination=rI}static create(e,t,r){return new In(e,t,r)}next(e){this.isStopped?Of(Mv(e),this):this._next(e)}error(e){this.isStopped?Of(Sv(e),this):(this.isStopped=!0,this._error(e))}complete(){this.isStopped?Of(Iv,this):(this.isStopped=!0,this._complete())}unsubscribe(){this.closed||(this.isStopped=!0,super.unsubscribe(),this.destination=null)}_next(e){this.destination.next(e)}_error(e){try{this.destination.error(e)}finally{this.unsubscribe()}}_complete(){try{this.destination.complete()}finally{this.unsubscribe()}}},tI=Function.prototype.bind;function Nf(n,e){return tI.call(n,e)}var Pf=class{constructor(e){this.partialObserver=e}next(e){let{partialObserver:t}=this;if(t.next)try{t.next(e)}catch(r){Wc(r)}}error(e){let{partialObserver:t}=this;if(t.error)try{t.error(e)}catch(r){Wc(r)}else Wc(e)}complete(){let{partialObserver:e}=this;if(e.complete)try{e.complete()}catch(t){Wc(t)}}},In=class extends Ci{constructor(e,t,r){super();let i;if(V(e)||!e)i={next:e??void 0,error:t??void 0,complete:r??void 0};else{let o;this&&Tn.useDeprecatedNextContext?(o=Object.create(e),o.unsubscribe=()=>this.unsubscribe(),i={next:e.next&&Nf(e.next,o),error:e.error&&Nf(e.error,o),complete:e.complete&&Nf(e.complete,o)}):i=e}this.destination=new Pf(i)}};function Wc(n){Tn.useDeprecatedSynchronousErrorHandling?xv(n):zc(n)}function nI(n){throw n}function Of(n,e){let{onStoppedNotification:t}=Tn;t&&Do.setTimeout(()=>t(n,e))}var rI={closed:!0,next:Ps,error:nI,complete:Ps};var wo=typeof Symbol=="function"&&Symbol.observable||"@@observable";function zt(n){return n}function Lf(...n){return Ff(n)}function Ff(n){return n.length===0?zt:n.length===1?n[0]:function(t){return n.reduce((r,i)=>i(r),t)}}var O=(()=>{class n{constructor(t){t&&(this._subscribe=t)}lift(t){let r=new n;return r.source=this,r.operator=t,r}subscribe(t,r,i){let o=oI(t)?t:new In(t,r,i);return Eo(()=>{let{operator:s,source:a}=this;o.add(s?s.call(o,a):a?this._subscribe(o):this._trySubscribe(o))}),o}_trySubscribe(t){try{return this._subscribe(t)}catch(r){t.error(r)}}forEach(t,r){return r=Rv(r),new r((i,o)=>{let s=new In({next:a=>{try{t(a)}catch(c){o(c),s.unsubscribe()}},error:o,complete:i});this.subscribe(s)})}_subscribe(t){var r;return(r=this.source)===null||r===void 0?void 0:r.subscribe(t)}[wo](){return this}pipe(...t){return Ff(t)(this)}toPromise(t){return t=Rv(t),new t((r,i)=>{let o;this.subscribe(s=>o=s,s=>i(s),()=>r(o))})}}return n.create=e=>new n(e),n})();function Rv(n){var e;return(e=n??Tn.Promise)!==null&&e!==void 0?e:Promise}function iI(n){return n&&V(n.next)&&V(n.error)&&V(n.complete)}function oI(n){return n&&n instanceof Ci||iI(n)&&Hc(n)}function Bf(n){return V(n?.lift)}function $(n){return e=>{if(Bf(e))return e.lift(function(t){try{return n(t,this)}catch(r){this.error(r)}});throw new TypeError("Unable to lift unknown Observable type")}}function U(n,e,t,r,i){return new jf(n,e,t,r,i)}var jf=class extends Ci{constructor(e,t,r,i,o,s){super(e),this.onFinalize=o,this.shouldUnsubscribe=s,this._next=t?function(a){try{t(a)}catch(c){e.error(c)}}:super._next,this._error=i?function(a){try{i(a)}catch(c){e.error(c)}finally{this.unsubscribe()}}:super._error,this._complete=r?function(){try{r()}catch(a){e.error(a)}finally{this.unsubscribe()}}:super._complete}unsubscribe(){var e;if(!this.shouldUnsubscribe||this.shouldUnsubscribe()){let{closed:t}=this;super.unsubscribe(),!t&&((e=this.onFinalize)===null||e===void 0||e.call(this))}}};function Av(){return $((n,e)=>{let t=null;n._refCount++;let r=U(e,void 0,void 0,void 0,()=>{if(!n||n._refCount<=0||0<--n._refCount){t=null;return}let i=n._connection,o=t;t=null,i&&(!o||i===o)&&i.unsubscribe(),e.unsubscribe()});n.subscribe(r),r.closed||(t=n.connect())})}var Ls=class extends O{constructor(e,t){super(),this.source=e,this.subjectFactory=t,this._subject=null,this._refCount=0,this._connection=null,Bf(e)&&(this.lift=e.lift)}_subscribe(e){return this.getSubject().subscribe(e)}getSubject(){let e=this._subject;return(!e||e.isStopped)&&(this._subject=this.subjectFactory()),this._subject}_teardown(){this._refCount=0;let{_connection:e}=this;this._subject=this._connection=null,e?.unsubscribe()}connect(){let e=this._connection;if(!e){e=this._connection=new q;let t=this.getSubject();e.add(this.source.subscribe(U(t,void 0,()=>{this._teardown(),t.complete()},r=>{this._teardown(),t.error(r)},()=>this._teardown()))),e.closed&&(this._connection=null,e=q.EMPTY)}return e}refCount(){return Av()(this)}};var To={schedule(n){let e=requestAnimationFrame,t=cancelAnimationFrame,{delegate:r}=To;r&&(e=r.requestAnimationFrame,t=r.cancelAnimationFrame);let i=e(o=>{t=void 0,n(o)});return new q(()=>t?.(i))},requestAnimationFrame(...n){let{delegate:e}=To;return(e?.requestAnimationFrame||requestAnimationFrame)(...n)},cancelAnimationFrame(...n){let{delegate:e}=To;return(e?.cancelAnimationFrame||cancelAnimationFrame)(...n)},delegate:void 0};var kv=_o(n=>function(){n(this),this.name="ObjectUnsubscribedError",this.message="object unsubscribed"});var I=(()=>{class n extends O{constructor(){super(),this.closed=!1,this.currentObservers=null,this.observers=[],this.isStopped=!1,this.hasError=!1,this.thrownError=null}lift(t){let r=new Gc(this,this);return r.operator=t,r}_throwIfClosed(){if(this.closed)throw new kv}next(t){Eo(()=>{if(this._throwIfClosed(),!this.isStopped){this.currentObservers||(this.currentObservers=Array.from(this.observers));for(let r of this.currentObservers)r.next(t)}})}error(t){Eo(()=>{if(this._throwIfClosed(),!this.isStopped){this.hasError=this.isStopped=!0,this.thrownError=t;let{observers:r}=this;for(;r.length;)r.shift().error(t)}})}complete(){Eo(()=>{if(this._throwIfClosed(),!this.isStopped){this.isStopped=!0;let{observers:t}=this;for(;t.length;)t.shift().complete()}})}unsubscribe(){this.isStopped=this.closed=!0,this.observers=this.currentObservers=null}get observed(){var t;return((t=this.observers)===null||t===void 0?void 0:t.length)>0}_trySubscribe(t){return this._throwIfClosed(),super._trySubscribe(t)}_subscribe(t){return this._throwIfClosed(),this._checkFinalizedStatuses(t),this._innerSubscribe(t)}_innerSubscribe(t){let{hasError:r,isStopped:i,observers:o}=this;return r||i?Af:(this.currentObservers=null,o.push(t),new q(()=>{this.currentObservers=null,vi(o,t)}))}_checkFinalizedStatuses(t){let{hasError:r,thrownError:i,isStopped:o}=this;r?t.error(i):o&&t.complete()}asObservable(){let t=new O;return t.source=this,t}}return n.create=(e,t)=>new Gc(e,t),n})(),Gc=class extends I{constructor(e,t){super(),this.destination=e,this.source=t}next(e){var t,r;(r=(t=this.destination)===null||t===void 0?void 0:t.next)===null||r===void 0||r.call(t,e)}error(e){var t,r;(r=(t=this.destination)===null||t===void 0?void 0:t.error)===null||r===void 0||r.call(t,e)}complete(){var e,t;(t=(e=this.destination)===null||e===void 0?void 0:e.complete)===null||t===void 0||t.call(e)}_subscribe(e){var t,r;return(r=(t=this.source)===null||t===void 0?void 0:t.subscribe(e))!==null&&r!==void 0?r:Af}};var ke=class extends I{constructor(e){super(),this._value=e}get value(){return this.getValue()}_subscribe(e){let t=super._subscribe(e);return!t.closed&&e.next(this._value),t}getValue(){let{hasError:e,thrownError:t,_value:r}=this;if(e)throw t;return this._throwIfClosed(),r}next(e){super.next(this._value=e)}};var Fs={now(){return(Fs.delegate||Date).now()},delegate:void 0};var Fr=class extends I{constructor(e=1/0,t=1/0,r=Fs){super(),this._bufferSize=e,this._windowTime=t,this._timestampProvider=r,this._buffer=[],this._infiniteTimeWindow=!0,this._infiniteTimeWindow=t===1/0,this._bufferSize=Math.max(1,e),this._windowTime=Math.max(1,t)}next(e){let{isStopped:t,_buffer:r,_infiniteTimeWindow:i,_timestampProvider:o,_windowTime:s}=this;t||(r.push(e),!i&&r.push(o.now()+s)),this._trimBuffer(),super.next(e)}_subscribe(e){this._throwIfClosed(),this._trimBuffer();let t=this._innerSubscribe(e),{_infiniteTimeWindow:r,_buffer:i}=this,o=i.slice();for(let s=0;s<o.length&&!e.closed;s+=r?1:2)e.next(o[s]);return this._checkFinalizedStatuses(e),t}_trimBuffer(){let{_bufferSize:e,_timestampProvider:t,_buffer:r,_infiniteTimeWindow:i}=this,o=(i?1:2)*e;if(e<1/0&&o<r.length&&r.splice(0,r.length-o),!i){let s=t.now(),a=0;for(let c=1;c<r.length&&r[c]<=s;c+=2)a=c;a&&r.splice(0,a+1)}}};var qc=class extends q{constructor(e,t){super()}schedule(e,t=0){return this}};var Bs={setInterval(n,e,...t){let{delegate:r}=Bs;return r?.setInterval?r.setInterval(n,e,...t):setInterval(n,e,...t)},clearInterval(n){let{delegate:e}=Bs;return(e?.clearInterval||clearInterval)(n)},delegate:void 0};var Br=class extends qc{constructor(e,t){super(e,t),this.scheduler=e,this.work=t,this.pending=!1}schedule(e,t=0){var r;if(this.closed)return this;this.state=e;let i=this.id,o=this.scheduler;return i!=null&&(this.id=this.recycleAsyncId(o,i,t)),this.pending=!0,this.delay=t,this.id=(r=this.id)!==null&&r!==void 0?r:this.requestAsyncId(o,this.id,t),this}requestAsyncId(e,t,r=0){return Bs.setInterval(e.flush.bind(e,this),r)}recycleAsyncId(e,t,r=0){if(r!=null&&this.delay===r&&this.pending===!1)return t;t!=null&&Bs.clearInterval(t)}execute(e,t){if(this.closed)return new Error("executing a cancelled action");this.pending=!1;let r=this._execute(e,t);if(r)return r;this.pending===!1&&this.id!=null&&(this.id=this.recycleAsyncId(this.scheduler,this.id,null))}_execute(e,t){let r=!1,i;try{this.work(e)}catch(o){r=!0,i=o||new Error("Scheduled action threw falsy error")}if(r)return this.unsubscribe(),i}unsubscribe(){if(!this.closed){let{id:e,scheduler:t}=this,{actions:r}=t;this.work=this.state=this.scheduler=null,this.pending=!1,vi(r,this),e!=null&&(this.id=this.recycleAsyncId(t,e,null)),this.delay=null,super.unsubscribe()}}};var sI=1,Vf,Uf={};function Nv(n){return n in Uf?(delete Uf[n],!0):!1}var Ov={setImmediate(n){let e=sI++;return Uf[e]=!0,Vf||(Vf=Promise.resolve()),Vf.then(()=>Nv(e)&&n()),e},clearImmediate(n){Nv(n)}};var{setImmediate:aI,clearImmediate:cI}=Ov,js={setImmediate(...n){let{delegate:e}=js;return(e?.setImmediate||aI)(...n)},clearImmediate(n){let{delegate:e}=js;return(e?.clearImmediate||cI)(n)},delegate:void 0};var Kc=class extends Br{constructor(e,t){super(e,t),this.scheduler=e,this.work=t}requestAsyncId(e,t,r=0){return r!==null&&r>0?super.requestAsyncId(e,t,r):(e.actions.push(this),e._scheduled||(e._scheduled=js.setImmediate(e.flush.bind(e,void 0))))}recycleAsyncId(e,t,r=0){var i;if(r!=null?r>0:this.delay>0)return super.recycleAsyncId(e,t,r);let{actions:o}=e;t!=null&&((i=o[o.length-1])===null||i===void 0?void 0:i.id)!==t&&(js.clearImmediate(t),e._scheduled===t&&(e._scheduled=void 0))}};var Io=class n{constructor(e,t=n.now){this.schedulerActionCtor=e,this.now=t}schedule(e,t=0,r){return new this.schedulerActionCtor(this,e).schedule(r,t)}};Io.now=Fs.now;var jr=class extends Io{constructor(e,t=Io.now){super(e,t),this.actions=[],this._active=!1}flush(e){let{actions:t}=this;if(this._active){t.push(e);return}let r;this._active=!0;do if(r=e.execute(e.state,e.delay))break;while(e=t.shift());if(this._active=!1,r){for(;e=t.shift();)e.unsubscribe();throw r}}};var Zc=class extends jr{flush(e){this._active=!0;let t=this._scheduled;this._scheduled=void 0;let{actions:r}=this,i;e=e||r.shift();do if(i=e.execute(e.state,e.delay))break;while((e=r[0])&&e.id===t&&r.shift());if(this._active=!1,i){for(;(e=r[0])&&e.id===t&&r.shift();)e.unsubscribe();throw i}}};var $f=new Zc(Kc);var Vs=new jr(Br),Pv=Vs;var Yc=class extends Br{constructor(e,t){super(e,t),this.scheduler=e,this.work=t}requestAsyncId(e,t,r=0){return r!==null&&r>0?super.requestAsyncId(e,t,r):(e.actions.push(this),e._scheduled||(e._scheduled=To.requestAnimationFrame(()=>e.flush(void 0))))}recycleAsyncId(e,t,r=0){var i;if(r!=null?r>0:this.delay>0)return super.recycleAsyncId(e,t,r);let{actions:o}=e;t!=null&&t===e._scheduled&&((i=o[o.length-1])===null||i===void 0?void 0:i.id)!==t&&(To.cancelAnimationFrame(t),e._scheduled=void 0)}};var Qc=class extends jr{flush(e){this._active=!0;let t;e?t=e.id:(t=this._scheduled,this._scheduled=void 0);let{actions:r}=this,i;e=e||r.shift();do if(i=e.execute(e.state,e.delay))break;while((e=r[0])&&e.id===t&&r.shift());if(this._active=!1,i){for(;(e=r[0])&&e.id===t&&r.shift();)e.unsubscribe();throw i}}};var Hf=new Qc(Yc);var me=new O(n=>n.complete());function Xc(n){return n&&V(n.schedule)}function zf(n){return n[n.length-1]}function Jc(n){return V(zf(n))?n.pop():void 0}function Hn(n){return Xc(zf(n))?n.pop():void 0}function Lv(n,e){return typeof zf(n)=="number"?n.pop():e}function Us(n,e,t,r){var i=arguments.length,o=i<3?e:r===null?r=Object.getOwnPropertyDescriptor(e,t):r,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")o=Reflect.decorate(n,e,t,r);else for(var a=n.length-1;a>=0;a--)(s=n[a])&&(o=(i<3?s(o):i>3?s(e,t,o):s(e,t))||o);return i>3&&o&&Object.defineProperty(e,t,o),o}function Bv(n,e,t,r){function i(o){return o instanceof t?o:new t(function(s){s(o)})}return new(t||(t=Promise))(function(o,s){function a(u){try{l(r.next(u))}catch(d){s(d)}}function c(u){try{l(r.throw(u))}catch(d){s(d)}}function l(u){u.done?o(u.value):i(u.value).then(a,c)}l((r=r.apply(n,e||[])).next())})}function Fv(n){var e=typeof Symbol=="function"&&Symbol.iterator,t=e&&n[e],r=0;if(t)return t.call(n);if(n&&typeof n.length=="number")return{next:function(){return n&&r>=n.length&&(n=void 0),{value:n&&n[r++],done:!n}}};throw new TypeError(e?"Object is not iterable.":"Symbol.iterator is not defined.")}function _i(n){return this instanceof _i?(this.v=n,this):new _i(n)}function jv(n,e,t){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var r=t.apply(n,e||[]),i,o=[];return i=Object.create((typeof AsyncIterator=="function"?AsyncIterator:Object).prototype),a("next"),a("throw"),a("return",s),i[Symbol.asyncIterator]=function(){return this},i;function s(p){return function(m){return Promise.resolve(m).then(p,d)}}function a(p,m){r[p]&&(i[p]=function(D){return new Promise(function(S,M){o.push([p,D,S,M])>1||c(p,D)})},m&&(i[p]=m(i[p])))}function c(p,m){try{l(r[p](m))}catch(D){f(o[0][3],D)}}function l(p){p.value instanceof _i?Promise.resolve(p.value.v).then(u,d):f(o[0][2],p)}function u(p){c("next",p)}function d(p){c("throw",p)}function f(p,m){p(m),o.shift(),o.length&&c(o[0][0],o[0][1])}}function Vv(n){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var e=n[Symbol.asyncIterator],t;return e?e.call(n):(n=typeof Fv=="function"?Fv(n):n[Symbol.iterator](),t={},r("next"),r("throw"),r("return"),t[Symbol.asyncIterator]=function(){return this},t);function r(o){t[o]=n[o]&&function(s){return new Promise(function(a,c){s=n[o](s),i(a,c,s.done,s.value)})}}function i(o,s,a,c){Promise.resolve(c).then(function(l){o({value:l,done:a})},s)}}var el=n=>n&&typeof n.length=="number"&&typeof n!="function";function tl(n){return V(n?.then)}function nl(n){return V(n[wo])}function rl(n){return Symbol.asyncIterator&&V(n?.[Symbol.asyncIterator])}function il(n){return new TypeError(`You provided ${n!==null&&typeof n=="object"?"an invalid object":`'${n}'`} where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.`)}function lI(){return typeof Symbol!="function"||!Symbol.iterator?"@@iterator":Symbol.iterator}var ol=lI();function sl(n){return V(n?.[ol])}function al(n){return jv(this,arguments,function*(){let t=n.getReader();try{for(;;){let{value:r,done:i}=yield _i(t.read());if(i)return yield _i(void 0);yield yield _i(r)}}finally{t.releaseLock()}})}function cl(n){return V(n?.getReader)}function ge(n){if(n instanceof O)return n;if(n!=null){if(nl(n))return uI(n);if(el(n))return dI(n);if(tl(n))return fI(n);if(rl(n))return Uv(n);if(sl(n))return pI(n);if(cl(n))return hI(n)}throw il(n)}function uI(n){return new O(e=>{let t=n[wo]();if(V(t.subscribe))return t.subscribe(e);throw new TypeError("Provided object does not correctly implement Symbol.observable")})}function dI(n){return new O(e=>{for(let t=0;t<n.length&&!e.closed;t++)e.next(n[t]);e.complete()})}function fI(n){return new O(e=>{n.then(t=>{e.closed||(e.next(t),e.complete())},t=>e.error(t)).then(null,zc)})}function pI(n){return new O(e=>{for(let t of n)if(e.next(t),e.closed)return;e.complete()})}function Uv(n){return new O(e=>{mI(n,e).catch(t=>e.error(t))})}function hI(n){return Uv(al(n))}function mI(n,e){var t,r,i,o;return Bv(this,void 0,void 0,function*(){try{for(t=Vv(n);r=yield t.next(),!r.done;){let s=r.value;if(e.next(s),e.closed)return}}catch(s){i={error:s}}finally{try{r&&!r.done&&(o=t.return)&&(yield o.call(t))}finally{if(i)throw i.error}}e.complete()})}function It(n,e,t,r=0,i=!1){let o=e.schedule(function(){t(),i?n.add(this.schedule(null,r)):this.unsubscribe()},r);if(n.add(o),!i)return o}function ll(n,e=0){return $((t,r)=>{t.subscribe(U(r,i=>It(r,n,()=>r.next(i),e),()=>It(r,n,()=>r.complete(),e),i=>It(r,n,()=>r.error(i),e)))})}function ul(n,e=0){return $((t,r)=>{r.add(n.schedule(()=>t.subscribe(r),e))})}function $v(n,e){return ge(n).pipe(ul(e),ll(e))}function Hv(n,e){return ge(n).pipe(ul(e),ll(e))}function zv(n,e){return new O(t=>{let r=0;return e.schedule(function(){r===n.length?t.complete():(t.next(n[r++]),t.closed||this.schedule())})})}function Wv(n,e){return new O(t=>{let r;return It(t,e,()=>{r=n[ol](),It(t,e,()=>{let i,o;try{({value:i,done:o}=r.next())}catch(s){t.error(s);return}o?t.complete():t.next(i)},0,!0)}),()=>V(r?.return)&&r.return()})}function dl(n,e){if(!n)throw new Error("Iterable cannot be null");return new O(t=>{It(t,e,()=>{let r=n[Symbol.asyncIterator]();It(t,e,()=>{r.next().then(i=>{i.done?t.complete():t.next(i.value)})},0,!0)})})}function Gv(n,e){return dl(al(n),e)}function qv(n,e){if(n!=null){if(nl(n))return $v(n,e);if(el(n))return zv(n,e);if(tl(n))return Hv(n,e);if(rl(n))return dl(n,e);if(sl(n))return Wv(n,e);if(cl(n))return Gv(n,e)}throw il(n)}function Ne(n,e){return e?qv(n,e):ge(n)}function T(...n){let e=Hn(n);return Ne(n,e)}function Wf(n,e){let t=V(n)?n:()=>n,r=i=>i.error(t());return new O(e?i=>e.schedule(r,0,i):r)}function Wt(n){return!!n&&(n instanceof O||V(n.lift)&&V(n.subscribe))}var cr=_o(n=>function(){n(this),this.name="EmptyError",this.message="no elements in sequence"});function So(n,e){let t=typeof e=="object";return new Promise((r,i)=>{let o=new In({next:s=>{r(s),o.unsubscribe()},error:i,complete:()=>{t?r(e.defaultValue):i(new cr)}});n.subscribe(o)})}function Kv(n){return n instanceof Date&&!isNaN(n)}function te(n,e){return $((t,r)=>{let i=0;t.subscribe(U(r,o=>{r.next(n.call(e,o,i++))}))})}var{isArray:gI}=Array;function yI(n,e){return gI(e)?n(...e):n(e)}function fl(n){return te(e=>yI(n,e))}var{isArray:vI}=Array,{getPrototypeOf:bI,prototype:CI,keys:_I}=Object;function pl(n){if(n.length===1){let e=n[0];if(vI(e))return{args:e,keys:null};if(DI(e)){let t=_I(e);return{args:t.map(r=>e[r]),keys:t}}}return{args:n,keys:null}}function DI(n){return n&&typeof n=="object"&&bI(n)===CI}function hl(n,e){return n.reduce((t,r,i)=>(t[r]=e[i],t),{})}function Gf(...n){let e=Hn(n),t=Jc(n),{args:r,keys:i}=pl(n);if(r.length===0)return Ne([],e);let o=new O(EI(r,e,i?s=>hl(i,s):zt));return t?o.pipe(fl(t)):o}function EI(n,e,t=zt){return r=>{Zv(e,()=>{let{length:i}=n,o=new Array(i),s=i,a=i;for(let c=0;c<i;c++)Zv(e,()=>{let l=Ne(n[c],e),u=!1;l.subscribe(U(r,d=>{o[c]=d,u||(u=!0,a--),a||r.next(t(o.slice()))},()=>{--s||r.complete()}))},r)},r)}}function Zv(n,e,t){n?It(t,n,e):e()}function Yv(n,e,t,r,i,o,s,a){let c=[],l=0,u=0,d=!1,f=()=>{d&&!c.length&&!l&&e.complete()},p=D=>l<r?m(D):c.push(D),m=D=>{o&&e.next(D),l++;let S=!1;ge(t(D,u++)).subscribe(U(e,M=>{i?.(M),o?p(M):e.next(M)},()=>{S=!0},void 0,()=>{if(S)try{for(l--;c.length&&l<r;){let M=c.shift();s?It(e,s,()=>m(M)):m(M)}f()}catch(M){e.error(M)}}))};return n.subscribe(U(e,p,()=>{d=!0,f()})),()=>{a?.()}}function dt(n,e,t=1/0){return V(e)?dt((r,i)=>te((o,s)=>e(r,o,i,s))(ge(n(r,i))),t):(typeof e=="number"&&(t=e),$((r,i)=>Yv(r,i,n,t)))}function ml(n=1/0){return dt(zt,n)}function Qv(){return ml(1)}function Mo(...n){return Qv()(Ne(n,Hn(n)))}function $s(n){return new O(e=>{ge(n()).subscribe(e)})}function gl(...n){let e=Jc(n),{args:t,keys:r}=pl(n),i=new O(o=>{let{length:s}=t;if(!s){o.complete();return}let a=new Array(s),c=s,l=s;for(let u=0;u<s;u++){let d=!1;ge(t[u]).subscribe(U(o,f=>{d||(d=!0,l--),a[u]=f},()=>c--,void 0,()=>{(!c||!d)&&(l||o.next(r?hl(r,a):a),o.complete())}))}});return e?i.pipe(fl(e)):i}function Hs(n=0,e,t=Pv){let r=-1;return e!=null&&(Xc(e)?t=e:r=e),new O(i=>{let o=Kv(n)?+n-t.now():n;o<0&&(o=0);let s=0;return t.schedule(function(){i.closed||(i.next(s++),0<=r?this.schedule(void 0,r):i.complete())},o)})}function zs(...n){let e=Hn(n),t=Lv(n,1/0),r=n;return r.length?r.length===1?ge(r[0]):ml(t)(Ne(r,e)):me}function ye(n,e){return $((t,r)=>{let i=0;t.subscribe(U(r,o=>n.call(e,o,i++)&&r.next(o)))})}function Xv(n){return $((e,t)=>{let r=!1,i=null,o=null,s=!1,a=()=>{if(o?.unsubscribe(),o=null,r){r=!1;let l=i;i=null,t.next(l)}s&&t.complete()},c=()=>{o=null,s&&t.complete()};e.subscribe(U(t,l=>{r=!0,i=l,o||ge(n(l)).subscribe(o=U(t,a,c))},()=>{s=!0,(!r||!o||o.closed)&&t.complete()}))})}function Ws(n,e=Vs){return Xv(()=>Hs(n,e))}function lr(n){return $((e,t)=>{let r=null,i=!1,o;r=e.subscribe(U(t,void 0,void 0,s=>{o=ge(n(s,lr(n)(e))),r?(r.unsubscribe(),r=null,o.subscribe(t)):i=!0})),i&&(r.unsubscribe(),r=null,o.subscribe(t))})}function yl(n,e){return V(e)?dt(n,e,1):dt(n,1)}function Di(n,e=Vs){return $((t,r)=>{let i=null,o=null,s=null,a=()=>{if(i){i.unsubscribe(),i=null;let l=o;o=null,r.next(l)}};function c(){let l=s+n,u=e.now();if(u<l){i=this.schedule(void 0,l-u),r.add(i);return}a()}t.subscribe(U(r,l=>{o=l,s=e.now(),i||(i=e.schedule(c,n),r.add(i))},()=>{a(),r.complete()},void 0,()=>{o=i=null}))})}function Jv(n){return $((e,t)=>{let r=!1;e.subscribe(U(t,i=>{r=!0,t.next(i)},()=>{r||t.next(n),t.complete()}))})}function St(n){return n<=0?()=>me:$((e,t)=>{let r=0;e.subscribe(U(t,i=>{++r<=n&&(t.next(i),n<=r&&t.complete())}))})}function xo(n,e=zt){return n=n??wI,$((t,r)=>{let i,o=!0;t.subscribe(U(r,s=>{let a=e(s);(o||!n(i,a))&&(o=!1,i=a,r.next(s))}))})}function wI(n,e){return n===e}function eb(n=TI){return $((e,t)=>{let r=!1;e.subscribe(U(t,i=>{r=!0,t.next(i)},()=>r?t.complete():t.error(n())))})}function TI(){return new cr}function qf(n){return $((e,t)=>{try{e.subscribe(t)}finally{t.add(n)}})}function ur(n,e){let t=arguments.length>=2;return r=>r.pipe(n?ye((i,o)=>n(i,o,r)):zt,St(1),t?Jv(e):eb(()=>new cr))}function vl(n){return n<=0?()=>me:$((e,t)=>{let r=[];e.subscribe(U(t,i=>{r.push(i),n<r.length&&r.shift()},()=>{for(let i of r)t.next(i);t.complete()},void 0,()=>{r=null}))})}function Kf(){return $((n,e)=>{let t,r=!1;n.subscribe(U(e,i=>{let o=t;t=i,r&&e.next([o,i]),r=!0}))})}function tb(n={}){let{connector:e=()=>new I,resetOnError:t=!0,resetOnComplete:r=!0,resetOnRefCountZero:i=!0}=n;return o=>{let s,a,c,l=0,u=!1,d=!1,f=()=>{a?.unsubscribe(),a=void 0},p=()=>{f(),s=c=void 0,u=d=!1},m=()=>{let D=s;p(),D?.unsubscribe()};return $((D,S)=>{l++,!d&&!u&&f();let M=c=c??e();S.add(()=>{l--,l===0&&!d&&!u&&(a=Zf(m,i))}),M.subscribe(S),!s&&l>0&&(s=new In({next:Q=>M.next(Q),error:Q=>{d=!0,f(),a=Zf(p,t,Q),M.error(Q)},complete:()=>{u=!0,f(),a=Zf(p,r),M.complete()}}),ge(D).subscribe(s))})(o)}}function Zf(n,e,...t){if(e===!0){n();return}if(e===!1)return;let r=new In({next:()=>{r.unsubscribe(),n()}});return ge(e(...t)).subscribe(r)}function Gs(n,e,t){let r,i=!1;return n&&typeof n=="object"?{bufferSize:r=1/0,windowTime:e=1/0,refCount:i=!1,scheduler:t}=n:r=n??1/0,tb({connector:()=>new Fr(r,e,t),resetOnError:!0,resetOnComplete:!1,resetOnRefCountZero:i})}function qs(n){return ye((e,t)=>n<=t)}function zn(...n){let e=Hn(n);return $((t,r)=>{(e?Mo(n,t,e):Mo(n,t)).subscribe(r)})}function ft(n,e){return $((t,r)=>{let i=null,o=0,s=!1,a=()=>s&&!i&&r.complete();t.subscribe(U(r,c=>{i?.unsubscribe();let l=0,u=o++;ge(n(c,u)).subscribe(i=U(r,d=>r.next(e?e(c,d,u,l++):d),()=>{i=null,a()}))},()=>{s=!0,a()}))})}function fe(n){return $((e,t)=>{ge(n).subscribe(U(t,()=>t.complete(),Ps)),!t.closed&&e.subscribe(t)})}function Ke(n,e,t){let r=V(n)||e||t?{next:n,error:e,complete:t}:n;return r?$((i,o)=>{var s;(s=r.subscribe)===null||s===void 0||s.call(r);let a=!0;i.subscribe(U(o,c=>{var l;(l=r.next)===null||l===void 0||l.call(r,c),o.next(c)},()=>{var c;a=!1,(c=r.complete)===null||c===void 0||c.call(r),o.complete()},c=>{var l;a=!1,(l=r.error)===null||l===void 0||l.call(r,c),o.error(c)},()=>{var c,l;a&&((c=r.unsubscribe)===null||c===void 0||c.call(r)),(l=r.finalize)===null||l===void 0||l.call(r)}))}):zt}var Yf;function bl(){return Yf}function Wn(n){let e=Yf;return Yf=n,e}var nb=Symbol("NotFound");function Ro(n){return n===nb||n?.name==="\u0275NotFound"}function rb(n){let e=A(null);try{return n()}finally{A(e)}}var lp="https://angular.dev/best-practices/security#preventing-cross-site-scripting-xss",E=class extends Error{code;constructor(e,t){super(zr(e,t)),this.code=e}};function II(n){return`NG0${Math.abs(n)}`}function zr(n,e){return`${II(n)}${e?": "+e:""}`}var Si=globalThis;function ue(n){for(let e in n)if(n[e]===ue)return e;throw Error("")}function cb(n,e){for(let t in e)e.hasOwnProperty(t)&&!n.hasOwnProperty(t)&&(n[t]=e[t])}function ea(n){if(typeof n=="string")return n;if(Array.isArray(n))return`[${n.map(ea).join(", ")}]`;if(n==null)return""+n;let e=n.overriddenName||n.name;if(e)return`${e}`;let t=n.toString();if(t==null)return""+t;let r=t.indexOf(`
`);return r>=0?t.slice(0,r):t}function Il(n,e){return n?e?`${n} ${e}`:n:e||""}var SI=ue({__forward_ref__:ue});function ko(n){return n.__forward_ref__=ko,n}function Qe(n){return up(n)?n():n}function up(n){return typeof n=="function"&&n.hasOwnProperty(SI)&&n.__forward_ref__===ko}function C(n){return{token:n.token,providedIn:n.providedIn||null,factory:n.factory,value:void 0}}function mt(n){return{providers:n.providers||[],imports:n.imports||[]}}function ta(n){return MI(n,Sl)}function dp(n){return ta(n)!==null}function MI(n,e){return n.hasOwnProperty(e)&&n[e]||null}function xI(n){let e=n?.[Sl]??null;return e||null}function Xf(n){return n&&n.hasOwnProperty(_l)?n[_l]:null}var Sl=ue({\u0275prov:ue}),_l=ue({\u0275inj:ue}),v=class{_desc;ngMetadataName="InjectionToken";\u0275prov;constructor(e,t){this._desc=e,this.\u0275prov=void 0,typeof t=="number"?this.__NG_ELEMENT_ID__=t:t!==void 0&&(this.\u0275prov=C({token:this,providedIn:t.providedIn||"root",factory:t.factory}))}get multi(){return this}toString(){return`InjectionToken ${this._desc}`}};function fp(n){return n&&!!n.\u0275providers}var pp=ue({\u0275cmp:ue}),hp=ue({\u0275dir:ue}),mp=ue({\u0275pipe:ue}),gp=ue({\u0275mod:ue}),Zs=ue({\u0275fac:ue}),Mi=ue({__NG_ELEMENT_ID__:ue}),ib=ue({__NG_ENV_ID__:ue});function yp(n){return Ml(n,"@NgModule"),n[gp]||null}function fr(n){return Ml(n,"@Component"),n[pp]||null}function vp(n){return Ml(n,"@Directive"),n[hp]||null}function lb(n){return Ml(n,"@Pipe"),n[mp]||null}function Ml(n,e){if(n==null)throw new E(-919,!1)}function bp(n){return typeof n=="string"?n:n==null?"":String(n)}var ub=ue({ngErrorCode:ue}),RI=ue({ngErrorMessage:ue}),AI=ue({ngTokenPath:ue});function Cp(n,e){return db("",-200,e)}function xl(n,e){throw new E(-201,!1)}function db(n,e,t){let r=new E(e,n);return r[ub]=e,r[RI]=n,t&&(r[AI]=t),r}function kI(n){return n[ub]}var Jf;function fb(){return Jf}function pt(n){let e=Jf;return Jf=n,e}function _p(n,e,t){let r=ta(n);if(r&&r.providedIn=="root")return r.value===void 0?r.value=r.factory():r.value;if(t&8)return null;if(e!==void 0)return e;xl(n,"")}var NI={},Ei=NI,OI="__NG_DI_FLAG__",ep=class{injector;constructor(e){this.injector=e}retrieve(e,t){let r=wi(t)||0;try{return this.injector.get(e,r&8?null:Ei,r)}catch(i){if(Ro(i))return i;throw i}}};function PI(n,e=0){let t=bl();if(t===void 0)throw new E(-203,!1);if(t===null)return _p(n,void 0,e);{let r=LI(e),i=t.retrieve(n,r);if(Ro(i)){if(r.optional)return null;throw i}return i}}function B(n,e=0){return(fb()||PI)(Qe(n),e)}function h(n,e){return B(n,wi(e))}function wi(n){return typeof n>"u"||typeof n=="number"?n:0|(n.optional&&8)|(n.host&&1)|(n.self&&2)|(n.skipSelf&&4)}function LI(n){return{optional:!!(n&8),host:!!(n&1),self:!!(n&2),skipSelf:!!(n&4)}}function tp(n){let e=[];for(let t=0;t<n.length;t++){let r=Qe(n[t]);if(Array.isArray(r)){if(r.length===0)throw new E(900,!1);let i,o=0;for(let s=0;s<r.length;s++){let a=r[s],c=FI(a);typeof c=="number"?c===-1?i=a.token:o|=c:i=a}e.push(B(i,o))}else e.push(B(r))}return e}function FI(n){return n[OI]}function Vr(n,e){let t=n.hasOwnProperty(Zs);return t?n[Zs]:null}function pb(n,e,t){if(n.length!==e.length)return!1;for(let r=0;r<n.length;r++){let i=n[r],o=e[r];if(t&&(i=t(i),o=t(o)),o!==i)return!1}return!0}function hb(n){return n.flat(Number.POSITIVE_INFINITY)}function Rl(n,e){n.forEach(t=>Array.isArray(t)?Rl(t,e):e(t))}function Dp(n,e,t){e>=n.length?n.push(t):n.splice(e,0,t)}function na(n,e){return e>=n.length-1?n.pop():n.splice(e,1)[0]}function mb(n,e){let t=[];for(let r=0;r<n;r++)t.push(e);return t}function gb(n,e,t,r){let i=n.length;if(i==e)n.push(t,r);else if(i===1)n.push(r,n[0]),n[0]=t;else{for(i--,n.push(n[i-1],n[i]);i>e;){let o=i-2;n[i]=n[o],i--}n[e]=t,n[e+1]=r}}function Al(n,e,t){let r=No(n,e);return r>=0?n[r|1]=t:(r=~r,gb(n,r,e,t)),r}function kl(n,e){let t=No(n,e);if(t>=0)return n[t|1]}function No(n,e){return BI(n,e,1)}function BI(n,e,t){let r=0,i=n.length>>t;for(;i!==r;){let o=r+(i-r>>1),s=n[o<<t];if(e===s)return o<<t;s>e?i=o:r=o+1}return~(i<<t)}var Wr={},ht=[],xi=new v(""),Ep=new v("",-1),wp=new v(""),Ys=class{get(e,t=Ei){if(t===Ei){let i=db("",-201);throw i.name="\u0275NotFound",i}return t}};function Gr(n){return{\u0275providers:n}}function yb(n){return Gr([{provide:xi,multi:!0,useValue:n}])}function vb(...n){return{\u0275providers:Tp(!0,n),\u0275fromNgModule:!0}}function Tp(n,...e){let t=[],r=new Set,i,o=s=>{t.push(s)};return Rl(e,s=>{let a=s;Dl(a,o,[],r)&&(i||=[],i.push(a))}),i!==void 0&&bb(i,o),t}function bb(n,e){for(let t=0;t<n.length;t++){let{ngModule:r,providers:i}=n[t];Ip(i,o=>{e(o,r)})}}function Dl(n,e,t,r){if(n=Qe(n),!n)return!1;let i=null,o=Xf(n),s=!o&&fr(n);if(!o&&!s){let c=n.ngModule;if(o=Xf(c),o)i=c;else return!1}else{if(s&&!s.standalone)return!1;i=n}let a=r.has(i);if(s){if(a)return!1;if(r.add(i),s.dependencies){let c=typeof s.dependencies=="function"?s.dependencies():s.dependencies;for(let l of c)Dl(l,e,t,r)}}else if(o){if(o.imports!=null&&!a){r.add(i);let l;Rl(o.imports,u=>{Dl(u,e,t,r)&&(l||=[],l.push(u))}),l!==void 0&&bb(l,e)}if(!a){let l=Vr(i)||(()=>new i);e({provide:i,useFactory:l,deps:ht},i),e({provide:wp,useValue:i,multi:!0},i),e({provide:xi,useValue:()=>B(i),multi:!0},i)}let c=o.providers;if(c!=null&&!a){let l=n;Ip(c,u=>{e(u,l)})}}else return!1;return i!==n&&n.providers!==void 0}function Ip(n,e){for(let t of n)fp(t)&&(t=t.\u0275providers),Array.isArray(t)?Ip(t,e):e(t)}var jI=ue({provide:String,useValue:ue});function Cb(n){return n!==null&&typeof n=="object"&&jI in n}function VI(n){return!!(n&&n.useExisting)}function UI(n){return!!(n&&n.useFactory)}function Ti(n){return typeof n=="function"}function _b(n){return!!n.useClass}var ra=new v(""),Cl={},ob={},Qf;function Oo(){return Qf===void 0&&(Qf=new Ys),Qf}var Oe=class{},Ii=class extends Oe{parent;source;scopes;records=new Map;_ngOnDestroyHooks=new Set;_onDestroyHooks=[];get destroyed(){return this._destroyed}_destroyed=!1;injectorDefTypes;constructor(e,t,r,i){super(),this.parent=t,this.source=r,this.scopes=i,rp(e,s=>this.processProvider(s)),this.records.set(Ep,Ao(void 0,this)),i.has("environment")&&this.records.set(Oe,Ao(void 0,this));let o=this.records.get(ra);o!=null&&typeof o.value=="string"&&this.scopes.add(o.value),this.injectorDefTypes=new Set(this.get(wp,ht,{self:!0}))}retrieve(e,t){let r=wi(t)||0;try{return this.get(e,Ei,r)}catch(i){if(Ro(i))return i;throw i}}destroy(){Ks(this),this._destroyed=!0;let e=A(null);try{for(let r of this._ngOnDestroyHooks)r.ngOnDestroy();let t=this._onDestroyHooks;this._onDestroyHooks=[];for(let r of t)r()}finally{this.records.clear(),this._ngOnDestroyHooks.clear(),this.injectorDefTypes.clear(),A(e)}}onDestroy(e){return Ks(this),this._onDestroyHooks.push(e),()=>this.removeOnDestroy(e)}runInContext(e){Ks(this);let t=Wn(this),r=pt(void 0),i;try{return e()}finally{Wn(t),pt(r)}}get(e,t=Ei,r){if(Ks(this),e.hasOwnProperty(ib))return e[ib](this);let i=wi(r),o,s=Wn(this),a=pt(void 0);try{if(!(i&4)){let l=this.records.get(e);if(l===void 0){let u=GI(e)&&ta(e);u&&this.injectableDefInScope(u)?l=Ao(np(e),Cl):l=null,this.records.set(e,l)}if(l!=null)return this.hydrate(e,l,i)}let c=i&2?Oo():this.parent;return t=i&8&&t===Ei?null:t,c.get(e,t)}catch(c){let l=kI(c);throw l===-200||l===-201?new E(l,null):c}finally{pt(a),Wn(s)}}resolveInjectorInitializers(){let e=A(null),t=Wn(this),r=pt(void 0),i;try{let o=this.get(xi,ht,{self:!0});for(let s of o)s()}finally{Wn(t),pt(r),A(e)}}toString(){return"R3Injector[...]"}processProvider(e){e=Qe(e);let t=Ti(e)?e:Qe(e&&e.provide),r=HI(e);if(!Ti(e)&&e.multi===!0){let i=this.records.get(t);i||(i=Ao(void 0,Cl,!0),i.factory=()=>tp(i.multi),this.records.set(t,i)),t=e,i.multi.push(e)}this.records.set(t,r)}hydrate(e,t,r){let i=A(null);try{if(t.value===ob)throw Cp("");return t.value===Cl&&(t.value=ob,t.value=t.factory(void 0,r)),typeof t.value=="object"&&t.value&&WI(t.value)&&this._ngOnDestroyHooks.add(t.value),t.value}finally{A(i)}}injectableDefInScope(e){if(!e.providedIn)return!1;let t=Qe(e.providedIn);return typeof t=="string"?t==="any"||this.scopes.has(t):this.injectorDefTypes.has(t)}removeOnDestroy(e){let t=this._onDestroyHooks.indexOf(e);t!==-1&&this._onDestroyHooks.splice(t,1)}};function np(n){let e=ta(n),t=e!==null?e.factory:Vr(n);if(t!==null)return t;if(n instanceof v)throw new E(-204,!1);if(n instanceof Function)return $I(n);throw new E(-204,!1)}function $I(n){if(n.length>0)throw new E(-204,!1);let t=xI(n);return t!==null?()=>t.factory(n):()=>new n}function HI(n){if(Cb(n))return Ao(void 0,n.useValue);{let e=Sp(n);return Ao(e,Cl)}}function Sp(n,e,t){let r;if(Ti(n)){let i=Qe(n);return Vr(i)||np(i)}else if(Cb(n))r=()=>Qe(n.useValue);else if(UI(n))r=()=>n.useFactory(...tp(n.deps||[]));else if(VI(n))r=(i,o)=>B(Qe(n.useExisting),o!==void 0&&o&8?8:void 0);else{let i=Qe(n&&(n.useClass||n.provide));if(zI(n))r=()=>new i(...tp(n.deps));else return Vr(i)||np(i)}return r}function Ks(n){if(n.destroyed)throw new E(-205,!1)}function Ao(n,e,t=!1){return{factory:n,value:e,multi:t?[]:void 0}}function zI(n){return!!n.deps}function WI(n){return n!==null&&typeof n=="object"&&typeof n.ngOnDestroy=="function"}function GI(n){return typeof n=="function"||typeof n=="object"&&n.ngMetadataName==="InjectionToken"}function rp(n,e){for(let t of n)Array.isArray(t)?rp(t,e):t&&fp(t)?rp(t.\u0275providers,e):e(t)}function ot(n,e){let t;n instanceof Ii?(Ks(n),t=n):t=new ep(n);let r,i=Wn(t),o=pt(void 0);try{return e()}finally{Wn(i),pt(o)}}function Db(){return fb()!==void 0||bl()!=null}var Sn=0,k=1,L=2,We=3,rn=4,gt=5,Ri=6,Po=7,je=8,pr=9,Gn=10,be=11,Lo=12,Mp=13,Ai=14,yt=15,qr=16,ki=17,qn=18,hr=19,xp=20,dr=21,Nl=22,Ur=23,Gt=24,Ni=25,Kr=26,Se=27,Eb=1,Rp=6,Zr=7,ia=8,Oi=9,Pe=10;function mr(n){return Array.isArray(n)&&typeof n[Eb]=="object"}function Mn(n){return Array.isArray(n)&&n[Eb]===!0}function Ap(n){return(n.flags&4)!==0}function Kn(n){return n.componentOffset>-1}function oa(n){return(n.flags&1)===1}function Zn(n){return!!n.template}function Fo(n){return(n[L]&512)!==0}function Pi(n){return(n[L]&256)===256}var wb="svg",Tb="math";function on(n){for(;Array.isArray(n);)n=n[Sn];return n}function kp(n,e){return on(e[n])}function sn(n,e){return on(e[n.index])}function Ol(n,e){return n.data[e]}function Pl(n,e){return n[e]}function Np(n,e,t,r){t>=n.data.length&&(n.data[t]=null,n.blueprint[t]=null),e[t]=r}function an(n,e){let t=e[n];return mr(t)?t:t[Sn]}function Ib(n){return(n[L]&4)===4}function Ll(n){return(n[L]&128)===128}function Sb(n){return Mn(n[We])}function qt(n,e){return e==null?null:n[e]}function Op(n){n[ki]=0}function Pp(n){n[L]&1024||(n[L]|=1024,Ll(n)&&Li(n))}function Mb(n,e){for(;n>0;)e=e[Ai],n--;return e}function sa(n){return!!(n[L]&9216||n[Gt]?.dirty)}function Fl(n){n[Gn].changeDetectionScheduler?.notify(8),n[L]&64&&(n[L]|=1024),sa(n)&&Li(n)}function Li(n){n[Gn].changeDetectionScheduler?.notify(0);let e=$r(n);for(;e!==null&&!(e[L]&8192||(e[L]|=8192,!Ll(e)));)e=$r(e)}function Lp(n,e){if(Pi(n))throw new E(911,!1);n[dr]===null&&(n[dr]=[]),n[dr].push(e)}function xb(n,e){if(n[dr]===null)return;let t=n[dr].indexOf(e);t!==-1&&n[dr].splice(t,1)}function $r(n){let e=n[We];return Mn(e)?e[We]:e}function Fp(n){return n[Po]??=[]}function Bp(n){return n.cleanup??=[]}function Rb(n,e,t,r){let i=Fp(e);i.push(t),n.firstCreatePass&&Bp(n).push(r,i.length-1)}var G={lFrame:Ub(null),bindingsEnabled:!0,skipHydrationRootTNode:null};var ip=!1;function Ab(){return G.lFrame.elementDepthCount}function kb(){G.lFrame.elementDepthCount++}function jp(){G.lFrame.elementDepthCount--}function Vp(){return G.bindingsEnabled}function Up(){return G.skipHydrationRootTNode!==null}function $p(n){return G.skipHydrationRootTNode===n}function Hp(){G.skipHydrationRootTNode=null}function F(){return G.lFrame.lView}function Me(){return G.lFrame.tView}function cn(n){return G.lFrame.contextLView=n,n[je]}function ln(n){return G.lFrame.contextLView=null,n}function st(){let n=zp();for(;n!==null&&n.type===64;)n=n.parent;return n}function zp(){return G.lFrame.currentTNode}function Nb(){let n=G.lFrame,e=n.currentTNode;return n.isParent?e:e.parent}function Bo(n,e){let t=G.lFrame;t.currentTNode=n,t.isParent=e}function Wp(){return G.lFrame.isParent}function Gp(){G.lFrame.isParent=!1}function Ob(){return G.lFrame.contextLView}function qp(){return ip}function Qs(n){let e=ip;return ip=n,e}function Kp(){let n=G.lFrame,e=n.bindingRootIndex;return e===-1&&(e=n.bindingRootIndex=n.tView.bindingStartIndex),e}function Pb(n){return G.lFrame.bindingIndex=n}function Yr(){return G.lFrame.bindingIndex++}function Zp(n){let e=G.lFrame,t=e.bindingIndex;return e.bindingIndex=e.bindingIndex+n,t}function Lb(){return G.lFrame.inI18n}function Fb(n,e){let t=G.lFrame;t.bindingIndex=t.bindingRootIndex=n,Bl(e)}function Bb(){return G.lFrame.currentDirectiveIndex}function Bl(n){G.lFrame.currentDirectiveIndex=n}function jb(n){let e=G.lFrame.currentDirectiveIndex;return e===-1?null:n[e]}function Yp(){return G.lFrame.currentQueryIndex}function jl(n){G.lFrame.currentQueryIndex=n}function qI(n){let e=n[k];return e.type===2?e.declTNode:e.type===1?n[gt]:null}function Qp(n,e,t){if(t&4){let i=e,o=n;for(;i=i.parent,i===null&&!(t&1);)if(i=qI(o),i===null||(o=o[Ai],i.type&10))break;if(i===null)return!1;e=i,n=o}let r=G.lFrame=Vb();return r.currentTNode=e,r.lView=n,!0}function Vl(n){let e=Vb(),t=n[k];G.lFrame=e,e.currentTNode=t.firstChild,e.lView=n,e.tView=t,e.contextLView=n,e.bindingIndex=t.bindingStartIndex,e.inI18n=!1}function Vb(){let n=G.lFrame,e=n===null?null:n.child;return e===null?Ub(n):e}function Ub(n){let e={currentTNode:null,isParent:!0,lView:null,tView:null,selectedIndex:-1,contextLView:null,elementDepthCount:0,currentNamespace:null,currentDirectiveIndex:-1,bindingRootIndex:-1,bindingIndex:-1,currentQueryIndex:0,parent:n,child:null,inI18n:!1};return n!==null&&(n.child=e),e}function $b(){let n=G.lFrame;return G.lFrame=n.parent,n.currentTNode=null,n.lView=null,n}var Xp=$b;function Ul(){let n=$b();n.isParent=!0,n.tView=null,n.selectedIndex=-1,n.contextLView=null,n.elementDepthCount=0,n.currentDirectiveIndex=-1,n.currentNamespace=null,n.bindingRootIndex=-1,n.bindingIndex=-1,n.currentQueryIndex=0}function Hb(n){return(G.lFrame.contextLView=Mb(n,G.lFrame.contextLView))[je]}function gr(){return G.lFrame.selectedIndex}function Qr(n){G.lFrame.selectedIndex=n}function aa(){let n=G.lFrame;return Ol(n.tView,n.selectedIndex)}function zb(){return G.lFrame.currentNamespace}var Wb=!0;function $l(){return Wb}function Hl(n){Wb=n}function op(n,e=null,t=null,r){let i=Jp(n,e,t,r);return i.resolveInjectorInitializers(),i}function Jp(n,e=null,t=null,r,i=new Set){let o=[t||ht,vb(n)],s;return new Ii(o,e||Oo(),s||null,i)}var Te=class n{static THROW_IF_NOT_FOUND=Ei;static NULL=new Ys;static create(e,t){if(Array.isArray(e))return op({name:""},t,e,"");{let r=e.name??"";return op({name:r},e.parent,e.providers,r)}}static \u0275prov=C({token:n,providedIn:"any",factory:()=>B(Ep)});static __NG_ELEMENT_ID__=-1},pe=new v(""),Ue=(()=>{class n{static __NG_ELEMENT_ID__=KI;static __NG_ENV_ID__=t=>t}return n})(),El=class extends Ue{_lView;constructor(e){super(),this._lView=e}get destroyed(){return Pi(this._lView)}onDestroy(e){let t=this._lView;return Lp(t,e),()=>xb(t,e)}};function KI(){return new El(F())}var Gb=!1,qb=new v(""),Xr=(()=>{class n{taskId=0;pendingTasks=new Set;destroyed=!1;pendingTask=new ke(!1);debugTaskTracker=h(qb,{optional:!0});get hasPendingTasks(){return this.destroyed?!1:this.pendingTask.value}get hasPendingTasksObservable(){return this.destroyed?new O(t=>{t.next(!1),t.complete()}):this.pendingTask}add(){!this.hasPendingTasks&&!this.destroyed&&this.pendingTask.next(!0);let t=this.taskId++;return this.pendingTasks.add(t),this.debugTaskTracker?.add(t),t}has(t){return this.pendingTasks.has(t)}remove(t){this.pendingTasks.delete(t),this.debugTaskTracker?.remove(t),this.pendingTasks.size===0&&this.hasPendingTasks&&this.pendingTask.next(!1)}ngOnDestroy(){this.pendingTasks.clear(),this.hasPendingTasks&&this.pendingTask.next(!1),this.destroyed=!0,this.pendingTask.unsubscribe()}static \u0275prov=C({token:n,providedIn:"root",factory:()=>new n})}return n})(),sp=class extends I{__isAsync;destroyRef=void 0;pendingTasks=void 0;constructor(e=!1){super(),this.__isAsync=e,Db()&&(this.destroyRef=h(Ue,{optional:!0})??void 0,this.pendingTasks=h(Xr,{optional:!0})??void 0)}emit(e){let t=A(null);try{super.next(e)}finally{A(t)}}subscribe(e,t,r){let i=e,o=t||(()=>null),s=r;if(e&&typeof e=="object"){let c=e;i=c.next?.bind(c),o=c.error?.bind(c),s=c.complete?.bind(c)}this.__isAsync&&(o=this.wrapInTimeout(o),i&&(i=this.wrapInTimeout(i)),s&&(s=this.wrapInTimeout(s)));let a=super.subscribe({next:i,error:o,complete:s});return e instanceof q&&e.add(a),a}wrapInTimeout(e){return t=>{let r=this.pendingTasks?.add();setTimeout(()=>{try{e(t)}finally{r!==void 0&&this.pendingTasks?.remove(r)}})}}},ee=sp;function wl(...n){}function eh(n){let e,t;function r(){n=wl;try{t!==void 0&&typeof cancelAnimationFrame=="function"&&cancelAnimationFrame(t),e!==void 0&&clearTimeout(e)}catch{}}return e=setTimeout(()=>{n(),r()}),typeof requestAnimationFrame=="function"&&(t=requestAnimationFrame(()=>{n(),r()})),()=>r()}function Kb(n){return queueMicrotask(()=>n()),()=>{n=wl}}var th="isAngularZone",Xs=th+"_ID",ZI=0,Z=class n{hasPendingMacrotasks=!1;hasPendingMicrotasks=!1;isStable=!0;onUnstable=new ee(!1);onMicrotaskEmpty=new ee(!1);onStable=new ee(!1);onError=new ee(!1);constructor(e){let{enableLongStackTrace:t=!1,shouldCoalesceEventChangeDetection:r=!1,shouldCoalesceRunChangeDetection:i=!1,scheduleInRootZone:o=Gb}=e;if(typeof Zone>"u")throw new E(908,!1);Zone.assertZonePatched();let s=this;s._nesting=0,s._outer=s._inner=Zone.current,Zone.TaskTrackingZoneSpec&&(s._inner=s._inner.fork(new Zone.TaskTrackingZoneSpec)),t&&Zone.longStackTraceZoneSpec&&(s._inner=s._inner.fork(Zone.longStackTraceZoneSpec)),s.shouldCoalesceEventChangeDetection=!i&&r,s.shouldCoalesceRunChangeDetection=i,s.callbackScheduled=!1,s.scheduleInRootZone=o,XI(s)}static isInAngularZone(){return typeof Zone<"u"&&Zone.current.get(th)===!0}static assertInAngularZone(){if(!n.isInAngularZone())throw new E(909,!1)}static assertNotInAngularZone(){if(n.isInAngularZone())throw new E(909,!1)}run(e,t,r){return this._inner.run(e,t,r)}runTask(e,t,r,i){let o=this._inner,s=o.scheduleEventTask("NgZoneEvent: "+i,e,YI,wl,wl);try{return o.runTask(s,t,r)}finally{o.cancelTask(s)}}runGuarded(e,t,r){return this._inner.runGuarded(e,t,r)}runOutsideAngular(e){return this._outer.run(e)}},YI={};function nh(n){if(n._nesting==0&&!n.hasPendingMicrotasks&&!n.isStable)try{n._nesting++,n.onMicrotaskEmpty.emit(null)}finally{if(n._nesting--,!n.hasPendingMicrotasks)try{n.runOutsideAngular(()=>n.onStable.emit(null))}finally{n.isStable=!0}}}function QI(n){if(n.isCheckStableRunning||n.callbackScheduled)return;n.callbackScheduled=!0;function e(){eh(()=>{n.callbackScheduled=!1,ap(n),n.isCheckStableRunning=!0,nh(n),n.isCheckStableRunning=!1})}n.scheduleInRootZone?Zone.root.run(()=>{e()}):n._outer.run(()=>{e()}),ap(n)}function XI(n){let e=()=>{QI(n)},t=ZI++;n._inner=n._inner.fork({name:"angular",properties:{[th]:!0,[Xs]:t,[Xs+t]:!0},onInvokeTask:(r,i,o,s,a,c)=>{if(JI(c))return r.invokeTask(o,s,a,c);try{return sb(n),r.invokeTask(o,s,a,c)}finally{(n.shouldCoalesceEventChangeDetection&&s.type==="eventTask"||n.shouldCoalesceRunChangeDetection)&&e(),ab(n)}},onInvoke:(r,i,o,s,a,c,l)=>{try{return sb(n),r.invoke(o,s,a,c,l)}finally{n.shouldCoalesceRunChangeDetection&&!n.callbackScheduled&&!eS(c)&&e(),ab(n)}},onHasTask:(r,i,o,s)=>{r.hasTask(o,s),i===o&&(s.change=="microTask"?(n._hasPendingMicrotasks=s.microTask,ap(n),nh(n)):s.change=="macroTask"&&(n.hasPendingMacrotasks=s.macroTask))},onHandleError:(r,i,o,s)=>(r.handleError(o,s),n.runOutsideAngular(()=>n.onError.emit(s)),!1)})}function ap(n){n._hasPendingMicrotasks||(n.shouldCoalesceEventChangeDetection||n.shouldCoalesceRunChangeDetection)&&n.callbackScheduled===!0?n.hasPendingMicrotasks=!0:n.hasPendingMicrotasks=!1}function sb(n){n._nesting++,n.isStable&&(n.isStable=!1,n.onUnstable.emit(null))}function ab(n){n._nesting--,nh(n)}var Js=class{hasPendingMicrotasks=!1;hasPendingMacrotasks=!1;isStable=!0;onUnstable=new ee;onMicrotaskEmpty=new ee;onStable=new ee;onError=new ee;run(e,t,r){return e.apply(t,r)}runGuarded(e,t,r){return e.apply(t,r)}runOutsideAngular(e){return e()}runTask(e,t,r,i){return e.apply(t,r)}};function JI(n){return Zb(n,"__ignore_ng_zone__")}function eS(n){return Zb(n,"__scheduler_tick__")}function Zb(n,e){return!Array.isArray(n)||n.length!==1?!1:n[0]?.data?.[e]===!0}var nn=class{_console=console;handleError(e){this._console.error("ERROR",e)}},xn=new v("",{factory:()=>{let n=h(Z),e=h(Oe),t;return r=>{n.runOutsideAngular(()=>{e.destroyed&&!t?setTimeout(()=>{throw r}):(t??=e.get(nn),t.handleError(r))})}}}),Yb={provide:xi,useValue:()=>{let n=h(nn,{optional:!0})},multi:!0},tS=new v("",{factory:()=>{let n=h(pe).defaultView;if(!n)return;let e=h(xn),t=o=>{e(o.reason),o.preventDefault()},r=o=>{o.error?e(o.error):e(new Error(o.message,{cause:o})),o.preventDefault()},i=()=>{n.addEventListener("unhandledrejection",t),n.addEventListener("error",r)};typeof Zone<"u"?Zone.root.run(i):i(),h(Ue).onDestroy(()=>{n.removeEventListener("error",r),n.removeEventListener("unhandledrejection",t)})}});function rh(){return Gr([yb(()=>{h(tS)})])}function Le(n,e){let[t,r,i]=Sf(n,e?.equal),o=t,s=o[it];return o.set=r,o.update=i,o.asReadonly=ih.bind(o),o}function ih(){let n=this[it];if(n.readonlyFn===void 0){let e=()=>this();e[it]=n,n.readonlyFn=e}return n.readonlyFn}var ca=(()=>{class n{view;node;constructor(t,r){this.view=t,this.node=r}static __NG_ELEMENT_ID__=nS}return n})();function nS(){return new ca(F(),st())}var Hr=class{},la=new v("",{factory:()=>!0});var oh=new v("");var zl=(()=>{class n{static \u0275prov=C({token:n,providedIn:"root",factory:()=>new cp})}return n})(),cp=class{dirtyEffectCount=0;queues=new Map;add(e){this.enqueue(e),this.schedule(e)}schedule(e){e.dirty&&this.dirtyEffectCount++}remove(e){let t=e.zone,r=this.queues.get(t);r.has(e)&&(r.delete(e),e.dirty&&this.dirtyEffectCount--)}enqueue(e){let t=e.zone;this.queues.has(t)||this.queues.set(t,new Set);let r=this.queues.get(t);r.has(e)||r.add(e)}flush(){for(;this.dirtyEffectCount>0;){let e=!1;for(let[t,r]of this.queues)t===null?e||=this.flushQueue(r):e||=t.run(()=>this.flushQueue(r));e||(this.dirtyEffectCount=0)}}flushQueue(e){let t=!1;for(let r of e)r.dirty&&(this.dirtyEffectCount--,t=!0,r.run());return t}},Tl=class{[it];constructor(e){this[it]=e}destroy(){this[it].destroy()}};function Fi(n,e){let t=e?.injector??h(Te),r=e?.manualCleanup!==!0?t.get(Ue):null,i,o=t.get(ca,null,{optional:!0}),s=t.get(Hr);return o!==null?(i=oS(o.view,s,n),r instanceof El&&r._lView===o.view&&(r=null)):i=sS(n,t.get(zl),s),i.injector=t,r!==null&&(i.onDestroyFns=[r.onDestroy(()=>i.destroy())]),new Tl(i)}var Qb=W(g({},xf),{cleanupFns:void 0,zone:null,onDestroyFns:null,run(){let n=Qs(!1);try{Rf(this)}finally{Qs(n)}},cleanup(){if(!this.cleanupFns?.length)return;let n=A(null);try{for(;this.cleanupFns.length;)this.cleanupFns.pop()()}finally{this.cleanupFns=[],A(n)}}}),rS=W(g({},Qb),{consumerMarkedDirty(){this.scheduler.schedule(this),this.notifier.notify(12)},destroy(){if(yi(this),this.onDestroyFns!==null)for(let n of this.onDestroyFns)n();this.cleanup(),this.scheduler.remove(this)}}),iS=W(g({},Qb),{consumerMarkedDirty(){this.view[L]|=8192,Li(this.view),this.notifier.notify(13)},destroy(){if(yi(this),this.onDestroyFns!==null)for(let n of this.onDestroyFns)n();this.cleanup(),this.view[Ur]?.delete(this)}});function oS(n,e,t){let r=Object.create(iS);return r.view=n,r.zone=typeof Zone<"u"?Zone.current:null,r.notifier=e,r.fn=Xb(r,t),n[Ur]??=new Set,n[Ur].add(r),r.consumerMarkedDirty(r),r}function sS(n,e,t){let r=Object.create(rS);return r.fn=Xb(r,n),r.scheduler=e,r.notifier=t,r.zone=typeof Zone<"u"?Zone.current:null,r.scheduler.add(r),r.notifier.notify(12),r}function Xb(n,e){return()=>{e(t=>(n.cleanupFns??=[]).push(t))}}function ba(n){return{toString:n}.toString()}function mS(n){return typeof n=="function"}function MC(n,e,t,r){e!==null?e.applyValueToInputSignal(e,r):n[t]=r}var Ql=class{previousValue;currentValue;firstChange;constructor(e,t,r){this.previousValue=e,this.currentValue=t,this.firstChange=r}isFirstChange(){return this.firstChange}},ei=(()=>{let n=()=>xC;return n.ngInherit=!0,n})();function xC(n){return n.type.prototype.ngOnChanges&&(n.setInput=yS),gS}function gS(){let n=AC(this),e=n?.current;if(e){let t=n.previous;if(t===Wr)n.previous=e;else for(let r in e)t[r]=e[r];n.current=null,this.ngOnChanges(e)}}function yS(n,e,t,r,i){let o=this.declaredInputs[r],s=AC(n)||vS(n,{previous:Wr,current:null}),a=s.current||(s.current={}),c=s.previous,l=c[o];a[o]=new Ql(l&&l.currentValue,t,c===Wr),MC(n,e,i,t)}var RC="__ngSimpleChanges__";function AC(n){return n[RC]||null}function vS(n,e){return n[RC]=e}var Jb=[];var de=function(n,e=null,t){for(let r=0;r<Jb.length;r++){let i=Jb[r];i(n,e,t)}},ne=(function(n){return n[n.TemplateCreateStart=0]="TemplateCreateStart",n[n.TemplateCreateEnd=1]="TemplateCreateEnd",n[n.TemplateUpdateStart=2]="TemplateUpdateStart",n[n.TemplateUpdateEnd=3]="TemplateUpdateEnd",n[n.LifecycleHookStart=4]="LifecycleHookStart",n[n.LifecycleHookEnd=5]="LifecycleHookEnd",n[n.OutputStart=6]="OutputStart",n[n.OutputEnd=7]="OutputEnd",n[n.BootstrapApplicationStart=8]="BootstrapApplicationStart",n[n.BootstrapApplicationEnd=9]="BootstrapApplicationEnd",n[n.BootstrapComponentStart=10]="BootstrapComponentStart",n[n.BootstrapComponentEnd=11]="BootstrapComponentEnd",n[n.ChangeDetectionStart=12]="ChangeDetectionStart",n[n.ChangeDetectionEnd=13]="ChangeDetectionEnd",n[n.ChangeDetectionSyncStart=14]="ChangeDetectionSyncStart",n[n.ChangeDetectionSyncEnd=15]="ChangeDetectionSyncEnd",n[n.AfterRenderHooksStart=16]="AfterRenderHooksStart",n[n.AfterRenderHooksEnd=17]="AfterRenderHooksEnd",n[n.ComponentStart=18]="ComponentStart",n[n.ComponentEnd=19]="ComponentEnd",n[n.DeferBlockStateStart=20]="DeferBlockStateStart",n[n.DeferBlockStateEnd=21]="DeferBlockStateEnd",n[n.DynamicComponentStart=22]="DynamicComponentStart",n[n.DynamicComponentEnd=23]="DynamicComponentEnd",n[n.HostBindingsUpdateStart=24]="HostBindingsUpdateStart",n[n.HostBindingsUpdateEnd=25]="HostBindingsUpdateEnd",n})(ne||{});function bS(n,e,t){let{ngOnChanges:r,ngOnInit:i,ngDoCheck:o}=e.type.prototype;if(r){let s=xC(e);(t.preOrderHooks??=[]).push(n,s),(t.preOrderCheckHooks??=[]).push(n,s)}i&&(t.preOrderHooks??=[]).push(0-n,i),o&&((t.preOrderHooks??=[]).push(n,o),(t.preOrderCheckHooks??=[]).push(n,o))}function kC(n,e){for(let t=e.directiveStart,r=e.directiveEnd;t<r;t++){let o=n.data[t].type.prototype,{ngAfterContentInit:s,ngAfterContentChecked:a,ngAfterViewInit:c,ngAfterViewChecked:l,ngOnDestroy:u}=o;s&&(n.contentHooks??=[]).push(-t,s),a&&((n.contentHooks??=[]).push(t,a),(n.contentCheckHooks??=[]).push(t,a)),c&&(n.viewHooks??=[]).push(-t,c),l&&((n.viewHooks??=[]).push(t,l),(n.viewCheckHooks??=[]).push(t,l)),u!=null&&(n.destroyHooks??=[]).push(t,u)}}function Gl(n,e,t){NC(n,e,3,t)}function ql(n,e,t,r){(n[L]&3)===t&&NC(n,e,t,r)}function sh(n,e){let t=n[L];(t&3)===e&&(t&=16383,t+=1,n[L]=t)}function NC(n,e,t,r){let i=r!==void 0?n[ki]&65535:0,o=r??-1,s=e.length-1,a=0;for(let c=i;c<s;c++)if(typeof e[c+1]=="number"){if(a=e[c],r!=null&&a>=r)break}else e[c]<0&&(n[ki]+=65536),(a<o||o==-1)&&(CS(n,t,e,c),n[ki]=(n[ki]&4294901760)+c+2),c++}function eC(n,e){de(ne.LifecycleHookStart,n,e);let t=A(null);try{e.call(n)}finally{A(t),de(ne.LifecycleHookEnd,n,e)}}function CS(n,e,t,r){let i=t[r]<0,o=t[r+1],s=i?-t[r]:t[r],a=n[s];i?n[L]>>14<n[ki]>>16&&(n[L]&3)===e&&(n[L]+=16384,eC(a,o)):eC(a,o)}var Vo=-1,ji=class{factory;name;injectImpl;resolving=!1;canSeeViewProviders;multi;componentProviders;index;providerFactory;constructor(e,t,r,i){this.factory=e,this.name=i,this.canSeeViewProviders=t,this.injectImpl=r}};function _S(n){return(n.flags&8)!==0}function DS(n){return(n.flags&16)!==0}function ES(n,e,t){let r=0;for(;r<t.length;){let i=t[r];if(typeof i=="number"){if(i!==0)break;r++;let o=t[r++],s=t[r++],a=t[r++];n.setAttribute(e,s,a,o)}else{let o=i,s=t[++r];TS(o)?n.setProperty(e,o,s):n.setAttribute(e,o,s),r++}}return r}function wS(n){return n===3||n===4||n===6}function TS(n){return n.charCodeAt(0)===64}function Uo(n,e){if(!(e===null||e.length===0))if(n===null||n.length===0)n=e.slice();else{let t=-1;for(let r=0;r<e.length;r++){let i=e[r];typeof i=="number"?t=i:t===0||(t===-1||t===2?tC(n,t,i,null,e[++r]):tC(n,t,i,null,null))}}return n}function tC(n,e,t,r,i){let o=0,s=n.length;if(e===-1)s=-1;else for(;o<n.length;){let a=n[o++];if(typeof a=="number"){if(a===e){s=-1;break}else if(a>e){s=o-1;break}}}for(;o<n.length;){let a=n[o];if(typeof a=="number")break;if(a===t){i!==null&&(n[o+1]=i);return}o++,i!==null&&o++}s!==-1&&(n.splice(s,0,e),o=s+1),n.splice(o++,0,t),i!==null&&n.splice(o++,0,i)}function OC(n){return n!==Vo}function Xl(n){return n&32767}function IS(n){return n>>16}function Jl(n,e){let t=IS(n),r=e;for(;t>0;)r=r[Ai],t--;return r}var yh=!0;function eu(n){let e=yh;return yh=n,e}var SS=256,PC=SS-1,LC=5,MS=0,Yn={};function xS(n,e,t){let r;typeof t=="string"?r=t.charCodeAt(0)||0:t.hasOwnProperty(Mi)&&(r=t[Mi]),r==null&&(r=t[Mi]=MS++);let i=r&PC,o=1<<i;e.data[n+(i>>LC)]|=o}function tu(n,e){let t=FC(n,e);if(t!==-1)return t;let r=e[k];r.firstCreatePass&&(n.injectorIndex=e.length,ah(r.data,n),ah(e,null),ah(r.blueprint,null));let i=qh(n,e),o=n.injectorIndex;if(OC(i)){let s=Xl(i),a=Jl(i,e),c=a[k].data;for(let l=0;l<8;l++)e[o+l]=a[s+l]|c[s+l]}return e[o+8]=i,o}function ah(n,e){n.push(0,0,0,0,0,0,0,0,e)}function FC(n,e){return n.injectorIndex===-1||n.parent&&n.parent.injectorIndex===n.injectorIndex||e[n.injectorIndex+8]===null?-1:n.injectorIndex}function qh(n,e){if(n.parent&&n.parent.injectorIndex!==-1)return n.parent.injectorIndex;let t=0,r=null,i=e;for(;i!==null;){if(r=$C(i),r===null)return Vo;if(t++,i=i[Ai],r.injectorIndex!==-1)return r.injectorIndex|t<<16}return Vo}function vh(n,e,t){xS(n,e,t)}function BC(n,e,t){if(t&8||n!==void 0)return n;xl(e,"NodeInjector")}function jC(n,e,t,r){if(t&8&&r===void 0&&(r=null),(t&3)===0){let i=n[pr],o=pt(void 0);try{return i?i.get(e,r,t&8):_p(e,r,t&8)}finally{pt(o)}}return BC(r,e,t)}function VC(n,e,t,r=0,i){if(n!==null){if(e[L]&2048&&!(r&2)){let s=NS(n,e,t,r,Yn);if(s!==Yn)return s}let o=UC(n,e,t,r,Yn);if(o!==Yn)return o}return jC(e,t,r,i)}function UC(n,e,t,r,i){let o=AS(t);if(typeof o=="function"){if(!Qp(e,n,r))return r&1?BC(i,t,r):jC(e,t,r,i);try{let s;if(s=o(r),s==null&&!(r&8))xl(t);else return s}finally{Xp()}}else if(typeof o=="number"){let s=null,a=FC(n,e),c=Vo,l=r&1?e[yt][gt]:null;for((a===-1||r&4)&&(c=a===-1?qh(n,e):e[a+8],c===Vo||!rC(r,!1)?a=-1:(s=e[k],a=Xl(c),e=Jl(c,e)));a!==-1;){let u=e[k];if(nC(o,a,u.data)){let d=RS(a,e,t,s,r,l);if(d!==Yn)return d}c=e[a+8],c!==Vo&&rC(r,e[k].data[a+8]===l)&&nC(o,a,e)?(s=u,a=Xl(c),e=Jl(c,e)):a=-1}}return i}function RS(n,e,t,r,i,o){let s=e[k],a=s.data[n+8],c=r==null?Kn(a)&&yh:r!=s&&(a.type&3)!==0,l=i&1&&o===a,u=Kl(a,s,t,c,l);return u!==null?ha(e,s,u,a,i):Yn}function Kl(n,e,t,r,i){let o=n.providerIndexes,s=e.data,a=o&1048575,c=n.directiveStart,l=n.directiveEnd,u=o>>20,d=r?a:a+u,f=i?a+u:l;for(let p=d;p<f;p++){let m=s[p];if(p<c&&t===m||p>=c&&m.type===t)return p}if(i){let p=s[c];if(p&&Zn(p)&&p.type===t)return c}return null}function ha(n,e,t,r,i){let o=n[t],s=e.data;if(o instanceof ji){let a=o;if(a.resolving)throw Cp("");let c=eu(a.canSeeViewProviders);a.resolving=!0;let l=s[t].type||s[t],u,d=a.injectImpl?pt(a.injectImpl):null,f=Qp(n,r,0);try{o=n[t]=a.factory(void 0,i,s,n,r),e.firstCreatePass&&t>=r.directiveStart&&bS(t,s[t],e)}finally{d!==null&&pt(d),eu(c),a.resolving=!1,Xp()}}return o}function AS(n){if(typeof n=="string")return n.charCodeAt(0)||0;let e=n.hasOwnProperty(Mi)?n[Mi]:void 0;return typeof e=="number"?e>=0?e&PC:kS:e}function nC(n,e,t){let r=1<<n;return!!(t[e+(n>>LC)]&r)}function rC(n,e){return!(n&2)&&!(n&1&&e)}var Bi=class{_tNode;_lView;constructor(e,t){this._tNode=e,this._lView=t}get(e,t,r){return VC(this._tNode,this._lView,e,wi(r),t)}};function kS(){return new Bi(st(),F())}function br(n){return ba(()=>{let e=n.prototype.constructor,t=e[Zs]||bh(e),r=Object.prototype,i=Object.getPrototypeOf(n.prototype).constructor;for(;i&&i!==r;){let o=i[Zs]||bh(i);if(o&&o!==t)return o;i=Object.getPrototypeOf(i)}return o=>new o})}function bh(n){return up(n)?()=>{let e=bh(Qe(n));return e&&e()}:Vr(n)}function NS(n,e,t,r,i){let o=n,s=e;for(;o!==null&&s!==null&&s[L]&2048&&!Fo(s);){let a=UC(o,s,t,r|2,Yn);if(a!==Yn)return a;let c=o.parent;if(!c){let l=s[xp];if(l){let u=l.get(t,Yn,r&-5);if(u!==Yn)return u}c=$C(s),s=s[Ai]}o=c}return i}function $C(n){let e=n[k],t=e.type;return t===2?e.declTNode:t===1?n[gt]:null}function OS(){return Go(st(),F())}function Go(n,e){return new Ie(sn(n,e))}var Ie=(()=>{class n{nativeElement;constructor(t){this.nativeElement=t}static __NG_ELEMENT_ID__=OS}return n})();function PS(n){return n instanceof Ie?n.nativeElement:n}function LS(){return this._results[Symbol.iterator]()}var yr=class{_emitDistinctChangesOnly;dirty=!0;_onDirty=void 0;_results=[];_changesDetected=!1;_changes=void 0;length=0;first=void 0;last=void 0;get changes(){return this._changes??=new I}constructor(e=!1){this._emitDistinctChangesOnly=e}get(e){return this._results[e]}map(e){return this._results.map(e)}filter(e){return this._results.filter(e)}find(e){return this._results.find(e)}reduce(e,t){return this._results.reduce(e,t)}forEach(e){this._results.forEach(e)}some(e){return this._results.some(e)}toArray(){return this._results.slice()}toString(){return this._results.toString()}reset(e,t){this.dirty=!1;let r=hb(e);(this._changesDetected=!pb(this._results,r,t))&&(this._results=r,this.length=r.length,this.last=r[this.length-1],this.first=r[0])}notifyOnChanges(){this._changes!==void 0&&(this._changesDetected||!this._emitDistinctChangesOnly)&&this._changes.next(this)}onDirty(e){this._onDirty=e}setDirty(){this.dirty=!0,this._onDirty?.()}destroy(){this._changes!==void 0&&(this._changes.complete(),this._changes.unsubscribe())}[Symbol.iterator]=LS};function HC(n){return(n.flags&128)===128}var Kh=(function(n){return n[n.OnPush=0]="OnPush",n[n.Eager=1]="Eager",n[n.Default=1]="Default",n})(Kh||{}),zC=new Map,FS=0;function BS(){return FS++}function jS(n){zC.set(n[hr],n)}function Ch(n){zC.delete(n[hr])}var iC="__ngContext__";function $o(n,e){mr(e)?(n[iC]=e[hr],jS(e)):n[iC]=e}function WC(n){return qC(n[Lo])}function GC(n){return qC(n[rn])}function qC(n){for(;n!==null&&!Mn(n);)n=n[rn];return n}var VS;function Zh(n){VS=n}var qo=new v("",{factory:()=>US}),US="ng";var mu=new v(""),Hi=new v("",{providedIn:"platform",factory:()=>"unknown"}),Yh=new v(""),Ko=new v("",{factory:()=>h(pe).body?.querySelector("[ngCspNonce]")?.getAttribute("ngCspNonce")||null});var KC="r";var ZC="di";var YC=!1,QC=new v("",{factory:()=>YC});var oC=new WeakMap;function $S(n,e){if(n==null||typeof n!="object")return;let t=oC.get(n);t||(t=new WeakSet,oC.set(n,t)),t.add(e)}var HS=(n,e,t,r)=>{};function zS(n,e,t,r){HS(n,e,t,r)}function gu(n){return(n.flags&32)===32}var WS=()=>null;function XC(n,e,t=!1){return WS(n,e,t)}function JC(n,e){let t=n.contentQueries;if(t!==null){let r=A(null);try{for(let i=0;i<t.length;i+=2){let o=t[i],s=t[i+1];if(s!==-1){let a=n.data[s];jl(o),a.contentQueries(2,e[s],s)}}}finally{A(r)}}}function _h(n,e,t){jl(0);let r=A(null);try{e(n,t)}finally{A(r)}}function e_(n,e,t){if(Ap(e)){let r=A(null);try{let i=e.directiveStart,o=e.directiveEnd;for(let s=i;s<o;s++){let a=n.data[s];if(a.contentQueries){let c=t[s];a.contentQueries(1,c,s)}}}finally{A(r)}}}var kn=(function(n){return n[n.Emulated=0]="Emulated",n[n.None=2]="None",n[n.ShadowDom=3]="ShadowDom",n[n.ExperimentalIsolatedShadowDom=4]="ExperimentalIsolatedShadowDom",n})(kn||{});var Dh=class{changingThisBreaksApplicationSecurity;constructor(e){this.changingThisBreaksApplicationSecurity=e}toString(){return`SafeValue must use [property]=binding: ${this.changingThisBreaksApplicationSecurity} (see ${lp})`}};function Qh(n){return n instanceof Dh?n.changingThisBreaksApplicationSecurity:n}function GS(n,e){return n.createText(e)}function qS(n,e,t){n.setValue(e,t)}function t_(n,e,t){return n.createElement(e,t)}function nu(n,e,t,r,i){n.insertBefore(e,t,r,i)}function n_(n,e,t){n.appendChild(e,t)}function sC(n,e,t,r,i){r!==null?nu(n,e,t,r,i):n_(n,e,t)}function r_(n,e,t,r){n.removeChild(null,e,t,r)}function KS(n,e,t){n.setAttribute(e,"style",t)}function ZS(n,e,t){t===""?n.removeAttribute(e,"class"):n.setAttribute(e,"class",t)}function i_(n,e,t){let{mergedAttrs:r,classes:i,styles:o}=t;r!==null&&ES(n,e,r),i!==null&&ZS(n,e,i),o!==null&&KS(n,e,o)}function o_(n){return n instanceof Function?n():n}function YS(n,e,t){let r=n.length;for(;;){let i=n.indexOf(e,t);if(i===-1)return i;if(i===0||n.charCodeAt(i-1)<=32){let o=e.length;if(i+o===r||n.charCodeAt(i+o)<=32)return i}t=i+1}}var s_="ng-template";function QS(n,e,t,r){let i=0;if(r){for(;i<e.length&&typeof e[i]=="string";i+=2)if(e[i]==="class"&&YS(e[i+1].toLowerCase(),t,0)!==-1)return!0}else if(Xh(n))return!1;if(i=e.indexOf(1,i),i>-1){let o;for(;++i<e.length&&typeof(o=e[i])=="string";)if(o.toLowerCase()===t)return!0}return!1}function Xh(n){return n.type===4&&n.value!==s_}function XS(n,e,t){let r=n.type===4&&!t?s_:n.value;return e===r}function JS(n,e,t){let r=4,i=n.attrs,o=i!==null?nM(i):0,s=!1;for(let a=0;a<e.length;a++){let c=e[a];if(typeof c=="number"){if(!s&&!Rn(r)&&!Rn(c))return!1;if(s&&Rn(c))continue;s=!1,r=c|r&1;continue}if(!s)if(r&4){if(r=2|r&1,c!==""&&!XS(n,c,t)||c===""&&e.length===1){if(Rn(r))return!1;s=!0}}else if(r&8){if(i===null||!QS(n,i,c,t)){if(Rn(r))return!1;s=!0}}else{let l=e[++a],u=eM(c,i,Xh(n),t);if(u===-1){if(Rn(r))return!1;s=!0;continue}if(l!==""){let d;if(u>o?d="":d=i[u+1].toLowerCase(),r&2&&l!==d){if(Rn(r))return!1;s=!0}}}}return Rn(r)||s}function Rn(n){return(n&1)===0}function eM(n,e,t,r){if(e===null)return-1;let i=0;if(r||!t){let o=!1;for(;i<e.length;){let s=e[i];if(s===n)return i;if(s===3||s===6)o=!0;else if(s===1||s===2){let a=e[++i];for(;typeof a=="string";)a=e[++i];continue}else{if(s===4)break;if(s===0){i+=4;continue}}i+=o?1:2}return-1}else return rM(e,n)}function a_(n,e,t=!1){for(let r=0;r<e.length;r++)if(JS(n,e[r],t))return!0;return!1}function tM(n){let e=n.attrs;if(e!=null){let t=e.indexOf(5);if((t&1)===0)return e[t+1]}return null}function nM(n){for(let e=0;e<n.length;e++){let t=n[e];if(wS(t))return e}return n.length}function rM(n,e){let t=n.indexOf(4);if(t>-1)for(t++;t<n.length;){let r=n[t];if(typeof r=="number")return-1;if(r===e)return t;t++}return-1}function iM(n,e){e:for(let t=0;t<e.length;t++){let r=e[t];if(n.length===r.length){for(let i=0;i<n.length;i++)if(n[i]!==r[i])continue e;return!0}}return!1}function aC(n,e){return n?":not("+e.trim()+")":e}function oM(n){let e=n[0],t=1,r=2,i="",o=!1;for(;t<n.length;){let s=n[t];if(typeof s=="string")if(r&2){let a=n[++t];i+="["+s+(a.length>0?'="'+a+'"':"")+"]"}else r&8?i+="."+s:r&4&&(i+=" "+s);else i!==""&&!Rn(s)&&(e+=aC(o,i),i=""),r=s,o=o||!Rn(r);t++}return i!==""&&(e+=aC(o,i)),e}function sM(n){return n.map(oM).join(",")}function aM(n){let e=[],t=[],r=1,i=2;for(;r<n.length;){let o=n[r];if(typeof o=="string")i===2?o!==""&&e.push(o,n[++r]):i===8&&t.push(o);else{if(!Rn(i))break;i=o}r++}return t.length&&e.push(1,...t),e}var fn={};function Jh(n,e,t,r,i,o,s,a,c,l,u){let d=Se+r,f=d+i,p=cM(d,f),m=typeof l=="function"?l():l;return p[k]={type:n,blueprint:p,template:t,queries:null,viewQuery:a,declTNode:e,data:p.slice().fill(null,d),bindingStartIndex:d,expandoStartIndex:f,hostBindingOpCodes:null,firstCreatePass:!0,firstUpdatePass:!0,staticViewQueries:!1,staticContentQueries:!1,preOrderHooks:null,preOrderCheckHooks:null,contentHooks:null,contentCheckHooks:null,viewHooks:null,viewCheckHooks:null,destroyHooks:null,cleanup:null,contentQueries:null,components:null,directiveRegistry:typeof o=="function"?o():o,pipeRegistry:typeof s=="function"?s():s,firstChild:null,schemas:c,consts:m,incompleteFirstPass:!1,ssrId:u}}function cM(n,e){let t=[];for(let r=0;r<e;r++)t.push(r<n?null:fn);return t}function lM(n){let e=n.tView;return e===null||e.incompleteFirstPass?n.tView=Jh(1,null,n.template,n.decls,n.vars,n.directiveDefs,n.pipeDefs,n.viewQuery,n.schemas,n.consts,n.id):e}function em(n,e,t,r,i,o,s,a,c,l,u){let d=e.blueprint.slice();return d[Sn]=i,d[L]=r|4|128|8|64|1024,(l!==null||n&&n[L]&2048)&&(d[L]|=2048),Op(d),d[We]=d[Ai]=n,d[je]=t,d[Gn]=s||n&&n[Gn],d[be]=a||n&&n[be],d[pr]=c||n&&n[pr]||null,d[gt]=o,d[hr]=BS(),d[Ri]=u,d[xp]=l,d[yt]=e.type==2?n[yt]:d,d}function uM(n,e,t){let r=sn(e,n),i=lM(t),o=n[Gn].rendererFactory,s=tm(n,em(n,i,null,c_(t),r,e,null,o.createRenderer(r,t),null,null,null));return n[e.index]=s}function c_(n){let e=16;return n.signals?e=4096:n.onPush&&(e=64),e}function l_(n,e,t,r){if(t===0)return-1;let i=e.length;for(let o=0;o<t;o++)e.push(r),n.blueprint.push(r),n.data.push(null);return i}function tm(n,e){return n[Lo]?n[Mp][rn]=e:n[Lo]=e,n[Mp]=e,e}function z(n=1){u_(Me(),F(),gr()+n,!1)}function u_(n,e,t,r){if(!r)if((e[L]&3)===3){let o=n.preOrderCheckHooks;o!==null&&Gl(e,o,t)}else{let o=n.preOrderHooks;o!==null&&ql(e,o,0,t)}Qr(t)}var yu=(function(n){return n[n.None=0]="None",n[n.SignalBased=1]="SignalBased",n[n.HasDecoratorInputTransform=2]="HasDecoratorInputTransform",n})(yu||{});function Eh(n,e,t,r){let i=A(null);try{let[o,s,a]=n.inputs[t],c=null;(s&yu.SignalBased)!==0&&(c=e[o][it]),c!==null&&c.transformFn!==void 0?r=c.transformFn(r):a!==null&&(r=a.call(e,r)),n.setInput!==null?n.setInput(e,c,r,t,o):MC(e,c,o,r)}finally{A(i)}}var Qn=(function(n){return n[n.Important=1]="Important",n[n.DashCase=2]="DashCase",n})(Qn||{}),dM;function nm(n,e){return dM(n,e)}var rH=typeof document<"u"&&typeof document?.documentElement?.getAnimations=="function";var wh=new WeakMap,da=new WeakSet;function fM(n,e){let t=wh.get(n);if(!t||t.length===0)return;let r=e.parentNode,i=e.previousSibling;for(let o=t.length-1;o>=0;o--){let s=t[o],a=s.parentNode;s===e?(t.splice(o,1),da.add(s),s.dispatchEvent(new CustomEvent("animationend",{detail:{cancel:!0}}))):(i&&s===i||a&&r&&a!==r)&&(t.splice(o,1),s.dispatchEvent(new CustomEvent("animationend",{detail:{cancel:!0}})),s.parentNode?.removeChild(s))}}function pM(n,e){let t=wh.get(n);t?t.includes(e)||t.push(e):wh.set(n,[e])}var Vi=new Set,vu=(function(n){return n[n.CHANGE_DETECTION=0]="CHANGE_DETECTION",n[n.AFTER_NEXT_RENDER=1]="AFTER_NEXT_RENDER",n})(vu||{}),ti=new v(""),cC=new Set;function Cr(n){cC.has(n)||(cC.add(n),performance?.mark?.("mark_feature_usage",{detail:{feature:n}}))}var rm=(()=>{class n{impl=null;execute(){this.impl?.execute()}static \u0275prov=C({token:n,providedIn:"root",factory:()=>new n})}return n})(),d_=[0,1,2,3],f_=(()=>{class n{ngZone=h(Z);scheduler=h(Hr);errorHandler=h(nn,{optional:!0});sequences=new Set;deferredRegistrations=new Set;executing=!1;constructor(){h(ti,{optional:!0})}execute(){let t=this.sequences.size>0;t&&de(ne.AfterRenderHooksStart),this.executing=!0;for(let r of d_)for(let i of this.sequences)if(!(i.erroredOrDestroyed||!i.hooks[r]))try{i.pipelinedValue=this.ngZone.runOutsideAngular(()=>this.maybeTrace(()=>{let o=i.hooks[r];return o(i.pipelinedValue)},i.snapshot))}catch(o){i.erroredOrDestroyed=!0,this.errorHandler?.handleError(o)}this.executing=!1;for(let r of this.sequences)r.afterRun(),r.once&&(this.sequences.delete(r),r.destroy());for(let r of this.deferredRegistrations)this.sequences.add(r);this.deferredRegistrations.size>0&&this.scheduler.notify(7),this.deferredRegistrations.clear(),t&&de(ne.AfterRenderHooksEnd)}register(t){let{view:r}=t;r!==void 0?((r[Ni]??=[]).push(t),Li(r),r[L]|=8192):this.executing?this.deferredRegistrations.add(t):this.addSequence(t)}addSequence(t){this.sequences.add(t),this.scheduler.notify(7)}unregister(t){this.executing&&this.sequences.has(t)?(t.erroredOrDestroyed=!0,t.pipelinedValue=void 0,t.once=!0):(this.sequences.delete(t),this.deferredRegistrations.delete(t))}maybeTrace(t,r){return r?r.run(vu.AFTER_NEXT_RENDER,t):t()}static \u0275prov=C({token:n,providedIn:"root",factory:()=>new n})}return n})(),ru=class{impl;hooks;view;once;snapshot;erroredOrDestroyed=!1;pipelinedValue=void 0;unregisterOnDestroy;constructor(e,t,r,i,o,s=null){this.impl=e,this.hooks=t,this.view=r,this.once=i,this.snapshot=s,this.unregisterOnDestroy=o?.onDestroy(()=>this.destroy())}afterRun(){this.erroredOrDestroyed=!1,this.pipelinedValue=void 0,this.snapshot?.dispose(),this.snapshot=null}destroy(){this.impl.unregister(this),this.unregisterOnDestroy?.();let e=this.view?.[Ni];e&&(this.view[Ni]=e.filter(t=>t!==this))}};function _r(n,e){let t=e?.injector??h(Te);return Cr("NgAfterNextRender"),mM(n,t,e,!0)}function hM(n){return n instanceof Function?[void 0,void 0,n,void 0]:[n.earlyRead,n.write,n.mixedReadWrite,n.read]}function mM(n,e,t,r){let i=e.get(rm);i.impl??=e.get(f_);let o=e.get(ti,null,{optional:!0}),s=t?.manualCleanup!==!0?e.get(Ue):null,a=e.get(ca,null,{optional:!0}),c=new ru(i.impl,hM(n),a?.view,r,s,o?.snapshot(null));return i.impl.register(c),c}var p_=new v("",{factory:()=>({queue:new Set,isScheduled:!1,scheduler:null,injector:h(Oe)})});function h_(n,e,t){let r=n.get(p_);if(Array.isArray(e))for(let i of e)r.queue.add(i),t?.detachedLeaveAnimationFns?.push(i);else r.queue.add(e),t?.detachedLeaveAnimationFns?.push(e);r.scheduler&&r.scheduler(n)}function gM(n,e){let t=n.get(p_);if(e.detachedLeaveAnimationFns){for(let r of e.detachedLeaveAnimationFns)t.queue.delete(r);e.detachedLeaveAnimationFns=void 0}}function yM(n,e){for(let[t,r]of e)h_(n,r.animateFns)}function lC(n,e,t,r){let i=n?.[Kr]?.enter;e!==null&&i&&i.has(t.index)&&yM(r,i)}function jo(n,e,t,r,i,o,s,a){if(i!=null){let c,l=!1;Mn(i)?c=i:mr(i)&&(l=!0,i=i[Sn]);let u=on(i);n===0&&r!==null?(lC(a,r,o,t),s==null?n_(e,r,u):nu(e,r,u,s||null,!0)):n===1&&r!==null?(lC(a,r,o,t),nu(e,r,u,s||null,!0),fM(o,u)):n===2?(a?.[Kr]?.leave?.has(o.index)&&pM(o,u),da.delete(u),uC(a,o,t,d=>{if(da.has(u)){da.delete(u);return}r_(e,u,l,d)})):n===3&&(da.delete(u),uC(a,o,t,()=>{e.destroyNode(u)})),c!=null&&MM(e,n,t,c,o,r,s)}}function vM(n,e){m_(n,e),e[Sn]=null,e[gt]=null}function bM(n,e,t,r,i,o){r[Sn]=i,r[gt]=e,Cu(n,r,t,1,i,o)}function m_(n,e){e[Gn].changeDetectionScheduler?.notify(9),Cu(n,e,e[be],2,null,null)}function CM(n){let e=n[Lo];if(!e)return ch(n[k],n);for(;e;){let t=null;if(mr(e))t=e[Lo];else{let r=e[Pe];r&&(t=r)}if(!t){for(;e&&!e[rn]&&e!==n;)mr(e)&&ch(e[k],e),e=e[We];e===null&&(e=n),mr(e)&&ch(e[k],e),t=e&&e[rn]}e=t}}function im(n,e){let t=n[Oi],r=t.indexOf(e);t.splice(r,1)}function bu(n,e){if(Pi(e))return;let t=e[be];t.destroyNode&&Cu(n,e,t,3,null,null),CM(e)}function ch(n,e){if(Pi(e))return;let t=A(null);try{e[L]&=-129,e[L]|=256,e[Gt]&&yi(e[Gt]),EM(n,e),DM(n,e),e[k].type===1&&e[be].destroy();let r=e[qr];if(r!==null&&Mn(e[We])){r!==e[We]&&im(r,e);let i=e[qn];i!==null&&i.detachView(n)}Ch(e)}finally{A(t)}}function uC(n,e,t,r){let i=n?.[Kr];if(i==null||i.leave==null||!i.leave.has(e.index))return r(!1);n&&Vi.add(n[hr]),h_(t,()=>{if(i.leave&&i.leave.has(e.index)){let s=i.leave.get(e.index),a=[];if(s){for(let c=0;c<s.animateFns.length;c++){let l=s.animateFns[c],{promise:u}=l();a.push(u)}i.detachedLeaveAnimationFns=void 0}i.running=Promise.allSettled(a),_M(n,r)}else n&&Vi.delete(n[hr]),r(!1)},i)}function _M(n,e){let t=n[Kr]?.running;if(t){t.then(()=>{n[Kr].running=void 0,Vi.delete(n[hr]),e(!0)});return}e(!1)}function DM(n,e){let t=n.cleanup,r=e[Po];if(t!==null)for(let s=0;s<t.length-1;s+=2)if(typeof t[s]=="string"){let a=t[s+3];a>=0?r[a]():r[-a].unsubscribe(),s+=2}else{let a=r[t[s+1]];t[s].call(a)}r!==null&&(e[Po]=null);let i=e[dr];if(i!==null){e[dr]=null;for(let s=0;s<i.length;s++){let a=i[s];a()}}let o=e[Ur];if(o!==null){e[Ur]=null;for(let s of o)s.destroy()}}function EM(n,e){let t;if(n!=null&&(t=n.destroyHooks)!=null)for(let r=0;r<t.length;r+=2){let i=e[t[r]];if(!(i instanceof ji)){let o=t[r+1];if(Array.isArray(o))for(let s=0;s<o.length;s+=2){let a=i[o[s]],c=o[s+1];de(ne.LifecycleHookStart,a,c);try{c.call(a)}finally{de(ne.LifecycleHookEnd,a,c)}}else{de(ne.LifecycleHookStart,i,o);try{o.call(i)}finally{de(ne.LifecycleHookEnd,i,o)}}}}}function g_(n,e,t){return wM(n,e.parent,t)}function wM(n,e,t){let r=e;for(;r!==null&&r.type&168;)e=r,r=e.parent;if(r===null)return t[Sn];if(Kn(r)){let{encapsulation:i}=n.data[r.directiveStart+r.componentOffset];if(i===kn.None||i===kn.Emulated)return null}return sn(r,t)}function y_(n,e,t){return IM(n,e,t)}function TM(n,e,t){return n.type&40?sn(n,t):null}var IM=TM,dC;function om(n,e,t,r){let i=g_(n,r,e),o=e[be],s=r.parent||e[gt],a=y_(s,r,e);if(i!=null)if(Array.isArray(t))for(let c=0;c<t.length;c++)sC(o,i,t[c],a,!1);else sC(o,i,t,a,!1);dC!==void 0&&dC(o,r,e,t,i)}function fa(n,e){if(e!==null){let t=e.type;if(t&3)return sn(e,n);if(t&4)return Th(-1,n[e.index]);if(t&8){let r=e.child;if(r!==null)return fa(n,r);{let i=n[e.index];return Mn(i)?Th(-1,i):on(i)}}else{if(t&128)return fa(n,e.next);if(t&32)return nm(e,n)()||on(n[e.index]);{let r=v_(n,e);if(r!==null){if(Array.isArray(r))return r[0];let i=$r(n[yt]);return fa(i,r)}else return fa(n,e.next)}}}return null}function v_(n,e){if(e!==null){let r=n[yt][gt],i=e.projection;return r.projection[i]}return null}function Th(n,e){let t=Pe+n+1;if(t<e.length){let r=e[t],i=r[k].firstChild;if(i!==null)return fa(r,i)}return e[Zr]}function sm(n,e,t,r,i,o,s){for(;t!=null;){let a=r[pr];if(t.type===128){t=t.next;continue}let c=r[t.index],l=t.type;if(s&&e===0&&(c&&$o(on(c),r),t.flags|=2),!gu(t))if(l&8)sm(n,e,t.child,r,i,o,!1),jo(e,n,a,i,c,t,o,r);else if(l&32){let u=nm(t,r),d;for(;d=u();)jo(e,n,a,i,d,t,o,r);jo(e,n,a,i,c,t,o,r)}else l&16?b_(n,e,r,t,i,o):jo(e,n,a,i,c,t,o,r);t=s?t.projectionNext:t.next}}function Cu(n,e,t,r,i,o){sm(t,r,n.firstChild,e,i,o,!1)}function SM(n,e,t){let r=e[be],i=g_(n,t,e),o=t.parent||e[gt],s=y_(o,t,e);b_(r,0,e,t,i,s)}function b_(n,e,t,r,i,o){let s=t[yt],c=s[gt].projection[r.projection];if(Array.isArray(c))for(let l=0;l<c.length;l++){let u=c[l];jo(e,n,t[pr],i,u,r,o,t)}else{let l=c,u=s[We];HC(r)&&(l.flags|=128),sm(n,e,l,u,i,o,!0)}}function MM(n,e,t,r,i,o,s){let a=r[Zr],c=on(r);a!==c&&jo(e,n,t,o,a,i,s);for(let l=Pe;l<r.length;l++){let u=r[l];Cu(u[k],u,n,e,o,a)}}function xM(n,e,t,r,i){if(e)i?n.addClass(t,r):n.removeClass(t,r);else{let o=r.indexOf("-")===-1?void 0:Qn.DashCase;i==null?n.removeStyle(t,r,o):(typeof i=="string"&&i.endsWith("!important")&&(i=i.slice(0,-10),o|=Qn.Important),n.setStyle(t,r,i,o))}}function C_(n,e,t,r,i){let o=gr(),s=r&2;try{Qr(-1),s&&e.length>Se&&u_(n,e,Se,!1);let a=s?ne.TemplateUpdateStart:ne.TemplateCreateStart;de(a,i,t),t(r,i)}finally{Qr(o);let a=s?ne.TemplateUpdateEnd:ne.TemplateCreateEnd;de(a,i,t)}}function am(n,e,t){PM(n,e,t),(t.flags&64)===64&&LM(n,e,t)}function _u(n,e,t=sn){let r=e.localNames;if(r!==null){let i=e.index+1;for(let o=0;o<r.length;o+=2){let s=r[o+1],a=s===-1?t(e,n):n[s];n[i++]=a}}}function RM(n,e,t,r){let o=r.get(QC,YC)||t===kn.ShadowDom||t===kn.ExperimentalIsolatedShadowDom,s=n.selectRootElement(e,o);return AM(s),s}function AM(n){kM(n)}var kM=()=>null;function NM(n){return n==="class"?"className":n==="for"?"htmlFor":n==="formaction"?"formAction":n==="innerHtml"?"innerHTML":n==="readonly"?"readOnly":n==="tabindex"?"tabIndex":n}function OM(n,e,t,r,i,o){let s=e[k];if(Du(n,s,e,t,r)){Kn(n)&&D_(e,n.index);return}n.type&3&&(t=NM(t)),__(n,e,t,r,i,o)}function __(n,e,t,r,i,o){if(n.type&3){let s=sn(n,e);r=o!=null?o(r,n.value||"",t):r,i.setProperty(s,t,r)}else n.type&12}function D_(n,e){let t=an(e,n);t[L]&16||(t[L]|=64)}function PM(n,e,t){let r=t.directiveStart,i=t.directiveEnd;Kn(t)&&uM(e,t,n.data[r+t.componentOffset]),n.firstCreatePass||tu(t,e);let o=t.initialInputs;for(let s=r;s<i;s++){let a=n.data[s],c=ha(e,n,s,t);if($o(c,e),o!==null&&jM(e,s-r,c,a,t,o),Zn(a)){let l=an(t.index,e);l[je]=ha(e,n,s,t)}}}function LM(n,e,t){let r=t.directiveStart,i=t.directiveEnd,o=t.index,s=Bb();try{Qr(o);for(let a=r;a<i;a++){let c=n.data[a],l=e[a];Bl(a),(c.hostBindings!==null||c.hostVars!==0||c.hostAttrs!==null)&&FM(c,l)}}finally{Qr(-1),Bl(s)}}function FM(n,e){n.hostBindings!==null&&n.hostBindings(1,e)}function E_(n,e){let t=n.directiveRegistry,r=null;if(t)for(let i=0;i<t.length;i++){let o=t[i];a_(e,o.selectors,!1)&&(r??=[],Zn(o)?r.unshift(o):r.push(o))}return r}function BM(n,e,t,r,i,o){let s=sn(n,e);w_(e[be],s,o,n.value,t,r,i)}function w_(n,e,t,r,i,o,s){if(o==null)n.removeAttribute(e,i,t);else{let a=s==null?bp(o):s(o,r||"",i);n.setAttribute(e,i,a,t)}}function jM(n,e,t,r,i,o){let s=o[e];if(s!==null)for(let a=0;a<s.length;a+=2){let c=s[a],l=s[a+1];Eh(r,t,c,l)}}function T_(n,e,t,r,i){let o=Se+t,s=e[k],a=i(s,e,n,r,t);e[o]=a,Bo(n,!0);let c=n.type===2;return c?(i_(e[be],a,n),(Ab()===0||oa(n))&&$o(a,e),kb()):$o(a,e),$l()&&(!c||!gu(n))&&om(s,e,a,n),n}function I_(n){let e=n;return Wp()?Gp():(e=e.parent,Bo(e,!1)),e}function VM(n,e){let t=n[pr];if(!t)return;let r;try{r=t.get(xn,null)}catch{r=null}r?.(e)}function Du(n,e,t,r,i){let o=n.inputs?.[r],s=n.hostDirectiveInputs?.[r],a=!1;if(s)for(let c=0;c<s.length;c+=2){let l=s[c],u=s[c+1],d=e.data[l];Eh(d,t[l],u,i),a=!0}if(o)for(let c of o){let l=t[c],u=e.data[c];Eh(u,l,r,i),a=!0}return a}function UM(n,e){let t=an(e,n),r=t[k];$M(r,t);let i=t[Sn];i!==null&&t[Ri]===null&&(t[Ri]=XC(i,t[pr])),de(ne.ComponentStart);try{cm(r,t,t[je])}finally{de(ne.ComponentEnd,t[je])}}function $M(n,e){for(let t=e.length;t<n.blueprint.length;t++)e.push(n.blueprint[t])}function cm(n,e,t){Vl(e);try{let r=n.viewQuery;r!==null&&_h(1,r,t);let i=n.template;i!==null&&C_(n,e,i,1,t),n.firstCreatePass&&(n.firstCreatePass=!1),e[qn]?.finishViewCreation(n),n.staticContentQueries&&JC(n,e),n.staticViewQueries&&_h(2,n.viewQuery,t);let o=n.components;o!==null&&HM(e,o)}catch(r){throw n.firstCreatePass&&(n.incompleteFirstPass=!0,n.firstCreatePass=!1),r}finally{e[L]&=-5,Ul()}}function HM(n,e){for(let t=0;t<e.length;t++)UM(n,e[t])}function Ca(n,e,t,r){let i=A(null);try{let o=e.tView,a=n[L]&4096?4096:16,c=em(n,o,t,a,null,e,null,null,r?.injector??null,r?.embeddedViewInjector??null,r?.dehydratedView??null),l=n[e.index];c[qr]=l;let u=n[qn];return u!==null&&(c[qn]=u.createEmbeddedView(o)),cm(o,c,t),c}finally{A(i)}}function Ho(n,e){return!e||e.firstChild===null||HC(n)}function ma(n,e,t,r,i=!1){for(;t!==null;){if(t.type===128){t=i?t.projectionNext:t.next;continue}let o=e[t.index];o!==null&&r.push(on(o)),Mn(o)&&S_(o,r);let s=t.type;if(s&8)ma(n,e,t.child,r);else if(s&32){let a=nm(t,e),c;for(;c=a();)r.push(c)}else if(s&16){let a=v_(e,t);if(Array.isArray(a))r.push(...a);else{let c=$r(e[yt]);ma(c[k],c,a,r,!0)}}t=i?t.projectionNext:t.next}return r}function S_(n,e){for(let t=Pe;t<n.length;t++){let r=n[t],i=r[k].firstChild;i!==null&&ma(r[k],r,i,e)}n[Zr]!==n[Sn]&&e.push(n[Zr])}function M_(n){if(n[Ni]!==null){for(let e of n[Ni])e.impl.addSequence(e);n[Ni].length=0}}var x_=[];function zM(n){return n[Gt]??WM(n)}function WM(n){let e=x_.pop()??Object.create(qM);return e.lView=n,e}function GM(n){n.lView[Gt]!==n&&(n.lView=null,x_.push(n))}var qM=W(g({},mi),{consumerIsAlwaysLive:!0,kind:"template",consumerMarkedDirty:n=>{Li(n.lView)},consumerOnSignalRead(){this.lView[Gt]=this}});function KM(n){let e=n[Gt]??Object.create(ZM);return e.lView=n,e}var ZM=W(g({},mi),{consumerIsAlwaysLive:!0,kind:"template",consumerMarkedDirty:n=>{let e=$r(n.lView);for(;e&&!R_(e[k]);)e=$r(e);e&&Pp(e)},consumerOnSignalRead(){this.lView[Gt]=this}});function R_(n){return n.type!==2}function A_(n){if(n[Ur]===null)return;let e=!0;for(;e;){let t=!1;for(let r of n[Ur])r.dirty&&(t=!0,r.zone===null||Zone.current===r.zone?r.run():r.zone.run(()=>r.run()));e=t&&!!(n[L]&8192)}}var YM=100;function k_(n,e=0){let r=n[Gn].rendererFactory,i=!1;i||r.begin?.();try{QM(n,e)}finally{i||r.end?.()}}function QM(n,e){let t=qp();try{Qs(!0),Ih(n,e);let r=0;for(;sa(n);){if(r===YM)throw new E(103,!1);r++,Ih(n,1)}}finally{Qs(t)}}function XM(n,e,t,r){if(Pi(e))return;let i=e[L],o=!1,s=!1;Vl(e);let a=!0,c=null,l=null;o||(R_(n)?(l=zM(e),c=gi(l)):Lc()===null?(a=!1,l=KM(e),c=gi(l)):e[Gt]&&(yi(e[Gt]),e[Gt]=null));try{Op(e),Pb(n.bindingStartIndex),t!==null&&C_(n,e,t,2,r);let u=(i&3)===3;if(!o)if(u){let p=n.preOrderCheckHooks;p!==null&&Gl(e,p,null)}else{let p=n.preOrderHooks;p!==null&&ql(e,p,0,null),sh(e,0)}if(s||JM(e),A_(e),N_(e,0),n.contentQueries!==null&&JC(n,e),!o)if(u){let p=n.contentCheckHooks;p!==null&&Gl(e,p)}else{let p=n.contentHooks;p!==null&&ql(e,p,1),sh(e,1)}t0(n,e);let d=n.components;d!==null&&P_(e,d,0);let f=n.viewQuery;if(f!==null&&_h(2,f,r),!o)if(u){let p=n.viewCheckHooks;p!==null&&Gl(e,p)}else{let p=n.viewHooks;p!==null&&ql(e,p,2),sh(e,2)}if(n.firstUpdatePass===!0&&(n.firstUpdatePass=!1),e[Nl]){for(let p of e[Nl])p();e[Nl]=null}o||(M_(e),e[L]&=-73)}catch(u){throw o||Li(e),u}finally{l!==null&&(vo(l,c),a&&GM(l)),Ul()}}function N_(n,e){for(let t=WC(n);t!==null;t=GC(t))for(let r=Pe;r<t.length;r++){let i=t[r];O_(i,e)}}function JM(n){for(let e=WC(n);e!==null;e=GC(e)){if(!(e[L]&2))continue;let t=e[Oi];for(let r=0;r<t.length;r++){let i=t[r];Pp(i)}}}function e0(n,e,t){de(ne.ComponentStart);let r=an(e,n);try{O_(r,t)}finally{de(ne.ComponentEnd,r[je])}}function O_(n,e){Ll(n)&&Ih(n,e)}function Ih(n,e){let r=n[k],i=n[L],o=n[Gt],s=!!(e===0&&i&16);if(s||=!!(i&64&&e===0),s||=!!(i&1024),s||=!!(o?.dirty&&Os(o)),s||=!1,o&&(o.dirty=!1),n[L]&=-9217,s)XM(r,n,r.template,n[je]);else if(i&8192){let a=A(null);try{A_(n),N_(n,1);let c=r.components;c!==null&&P_(n,c,1),M_(n)}finally{A(a)}}}function P_(n,e,t){for(let r=0;r<e.length;r++)e0(n,e[r],t)}function t0(n,e){let t=n.hostBindingOpCodes;if(t!==null)try{for(let r=0;r<t.length;r++){let i=t[r];if(i<0)Qr(~i);else{let o=i,s=t[++r],a=t[++r];Fb(s,o);let c=e[o];de(ne.HostBindingsUpdateStart,c);try{a(2,c)}finally{de(ne.HostBindingsUpdateEnd,c)}}}}finally{Qr(-1)}}function lm(n,e){let t=qp()?64:1088;for(n[Gn].changeDetectionScheduler?.notify(e);n;){n[L]|=t;let r=$r(n);if(Fo(n)&&!r)return n;n=r}return null}function L_(n,e,t,r){return[n,!0,0,e,null,r,null,t,null,null]}function F_(n,e){let t=Pe+e;if(t<n.length)return n[t]}function _a(n,e,t,r=!0){let i=e[k];if(n0(i,e,n,t),r){let s=Th(t,n),a=e[be],c=a.parentNode(n[Zr]);c!==null&&bM(i,n[gt],a,e,c,s)}let o=e[Ri];o!==null&&o.firstChild!==null&&(o.firstChild=null)}function B_(n,e){let t=ga(n,e);return t!==void 0&&bu(t[k],t),t}function ga(n,e){if(n.length<=Pe)return;let t=Pe+e,r=n[t];if(r){let i=r[qr];i!==null&&i!==n&&im(i,r),e>0&&(n[t-1][rn]=r[rn]);let o=na(n,Pe+e);vM(r[k],r);let s=o[qn];s!==null&&s.detachView(o[k]),r[We]=null,r[rn]=null,r[L]&=-129}return r}function n0(n,e,t,r){let i=Pe+r,o=t.length;r>0&&(t[i-1][rn]=e),r<o-Pe?(e[rn]=t[i],Dp(t,Pe+r,e)):(t.push(e),e[rn]=null),e[We]=t;let s=e[qr];s!==null&&t!==s&&j_(s,e);let a=e[qn];a!==null&&a.insertView(n),Fl(e),e[L]|=128}function j_(n,e){let t=n[Oi],r=e[We];if(mr(r))n[L]|=2;else{let i=r[We][yt];e[yt]!==i&&(n[L]|=2)}t===null?n[Oi]=[e]:t.push(e)}var Jr=class{_lView;_cdRefInjectingView;_appRef=null;_attachedToViewContainer=!1;exhaustive;get rootNodes(){let e=this._lView,t=e[k];return ma(t,e,t.firstChild,[])}constructor(e,t){this._lView=e,this._cdRefInjectingView=t}get context(){return this._lView[je]}set context(e){this._lView[je]=e}get destroyed(){return Pi(this._lView)}destroy(){if(this._appRef)this._appRef.detachView(this);else if(this._attachedToViewContainer){let e=this._lView[We];if(Mn(e)){let t=e[ia],r=t?t.indexOf(this):-1;r>-1&&(ga(e,r),na(t,r))}this._attachedToViewContainer=!1}bu(this._lView[k],this._lView)}onDestroy(e){Lp(this._lView,e)}markForCheck(){lm(this._cdRefInjectingView||this._lView,4)}detach(){this._lView[L]&=-129}reattach(){Fl(this._lView),this._lView[L]|=128}detectChanges(){this._lView[L]|=1024,k_(this._lView)}checkNoChanges(){}attachToViewContainerRef(){if(this._appRef)throw new E(902,!1);this._attachedToViewContainer=!0}detachFromAppRef(){this._appRef=null;let e=Fo(this._lView),t=this._lView[qr];t!==null&&!e&&im(t,this._lView),m_(this._lView[k],this._lView)}attachToAppRef(e){if(this._attachedToViewContainer)throw new E(902,!1);this._appRef=e;let t=Fo(this._lView),r=this._lView[qr];r!==null&&!t&&j_(r,this._lView),Fl(this._lView)}};var Mt=(()=>{class n{_declarationLView;_declarationTContainer;elementRef;static __NG_ELEMENT_ID__=r0;constructor(t,r,i){this._declarationLView=t,this._declarationTContainer=r,this.elementRef=i}get ssrId(){return this._declarationTContainer.tView?.ssrId||null}createEmbeddedView(t,r){return this.createEmbeddedViewImpl(t,r)}createEmbeddedViewImpl(t,r,i){let o=Ca(this._declarationLView,this._declarationTContainer,t,{embeddedViewInjector:r,dehydratedView:i});return new Jr(o)}}return n})();function r0(){return um(st(),F())}function um(n,e){return n.type&4?new Mt(e,n,Go(n,e)):null}function Zo(n,e,t,r,i){let o=n.data[e];if(o===null)o=i0(n,e,t,r,i),Lb()&&(o.flags|=32);else if(o.type&64){o.type=t,o.value=r,o.attrs=i;let s=Nb();o.injectorIndex=s===null?-1:s.injectorIndex}return Bo(o,!0),o}function i0(n,e,t,r,i){let o=zp(),s=Wp(),a=s?o:o&&o.parent,c=n.data[e]=s0(n,a,t,e,r,i);return o0(n,c,o,s),c}function o0(n,e,t,r){n.firstChild===null&&(n.firstChild=e),t!==null&&(r?t.child==null&&e.parent!==null&&(t.child=e):t.next===null&&(t.next=e,e.prev=t))}function s0(n,e,t,r,i,o){let s=e?e.injectorIndex:-1,a=0;return Up()&&(a|=128),{type:t,index:r,insertBeforeIndex:null,injectorIndex:s,directiveStart:-1,directiveEnd:-1,directiveStylingLast:-1,componentOffset:-1,controlDirectiveIndex:-1,customControlIndex:-1,propertyBindings:null,flags:a,providerIndexes:0,value:i,attrs:o,mergedAttrs:null,localNames:null,initialInputs:null,inputs:null,hostDirectiveInputs:null,outputs:null,hostDirectiveOutputs:null,directiveToIndex:null,tView:null,next:null,prev:null,projectionNext:null,child:null,parent:e,projection:null,styles:null,stylesWithoutHost:null,residualStyles:void 0,classes:null,classesWithoutHost:null,residualClasses:void 0,classBindings:0,styleBindings:0}}function a0(n){let e=n[Rp]??[],r=n[We][be],i=[];for(let o of e)o.data[ZC]!==void 0?i.push(o):c0(o,r);n[Rp]=i}function c0(n,e){let t=0,r=n.firstChild;if(r){let i=n.data[KC];for(;t<i;){let o=r.nextSibling;r_(e,r,!1),r=o,t++}}}var l0=()=>null,u0=()=>null;function iu(n,e){return l0(n,e)}function V_(n,e,t){return u0(n,e,t)}var U_=class{},Eu=class{},Sh=class{resolveComponentFactory(e){throw new E(917,!1)}},Da=class{static NULL=new Sh},un=class{},zi=(()=>{class n{destroyNode=null;static __NG_ELEMENT_ID__=()=>d0()}return n})();function d0(){let n=F(),e=st(),t=an(e.index,n);return(mr(t)?t:n)[be]}var $_=(()=>{class n{static \u0275prov=C({token:n,providedIn:"root",factory:()=>null})}return n})();var Zl={},Mh=class{injector;parentInjector;constructor(e,t){this.injector=e,this.parentInjector=t}get(e,t,r){let i=this.injector.get(e,Zl,r);return i!==Zl||t===Zl?i:this.parentInjector.get(e,t,r)}};function ou(n,e,t){let r=t?n.styles:null,i=t?n.classes:null,o=0;if(e!==null)for(let s=0;s<e.length;s++){let a=e[s];if(typeof a=="number")o=a;else if(o==1)i=Il(i,a);else if(o==2){let c=a,l=e[++s];r=Il(r,c+": "+l+";")}}t?n.styles=r:n.stylesWithoutHost=r,t?n.classes=i:n.classesWithoutHost=i}function Xn(n,e=0){let t=F();if(t===null)return B(n,e);let r=st();return VC(r,t,Qe(n),e)}function H_(n,e,t,r,i){let o=r===null?null:{"":-1},s=i(n,t);if(s!==null){let a=s,c=null,l=null;for(let u of s)if(u.resolveHostDirectives!==null){[a,c,l]=u.resolveHostDirectives(s);break}h0(n,e,t,a,o,c,l)}o!==null&&r!==null&&f0(t,r,o)}function f0(n,e,t){let r=n.localNames=[];for(let i=0;i<e.length;i+=2){let o=t[e[i+1]];if(o==null)throw new E(-301,!1);r.push(e[i],o)}}function p0(n,e,t){e.componentOffset=t,(n.components??=[]).push(e.index)}function h0(n,e,t,r,i,o,s){let a=r.length,c=null;for(let f=0;f<a;f++){let p=r[f];c===null&&Zn(p)&&(c=p,p0(n,t,f)),vh(tu(t,e),n,p.type)}C0(t,n.data.length,a),c?.viewProvidersResolver&&c.viewProvidersResolver(c);for(let f=0;f<a;f++){let p=r[f];p.providersResolver&&p.providersResolver(p)}let l=!1,u=!1,d=l_(n,e,a,null);a>0&&(t.directiveToIndex=new Map);for(let f=0;f<a;f++){let p=r[f];if(t.mergedAttrs=Uo(t.mergedAttrs,p.hostAttrs),g0(n,t,e,d,p),b0(d,p,i),s!==null&&s.has(p)){let[D,S]=s.get(p);t.directiveToIndex.set(p.type,[d,D+t.directiveStart,S+t.directiveStart])}else(o===null||!o.has(p))&&t.directiveToIndex.set(p.type,d);p.contentQueries!==null&&(t.flags|=4),(p.hostBindings!==null||p.hostAttrs!==null||p.hostVars!==0)&&(t.flags|=64);let m=p.type.prototype;!l&&(m.ngOnChanges||m.ngOnInit||m.ngDoCheck)&&((n.preOrderHooks??=[]).push(t.index),l=!0),!u&&(m.ngOnChanges||m.ngDoCheck)&&((n.preOrderCheckHooks??=[]).push(t.index),u=!0),d++}m0(n,t,o)}function m0(n,e,t){for(let r=e.directiveStart;r<e.directiveEnd;r++){let i=n.data[r];if(t===null||!t.has(i))fC(0,e,i,r),fC(1,e,i,r),hC(e,r,!1);else{let o=t.get(i);pC(0,e,o,r),pC(1,e,o,r),hC(e,r,!0)}}}function fC(n,e,t,r){let i=n===0?t.inputs:t.outputs;for(let o in i)if(i.hasOwnProperty(o)){let s;n===0?s=e.inputs??={}:s=e.outputs??={},s[o]??=[],s[o].push(r),z_(e,o)}}function pC(n,e,t,r){let i=n===0?t.inputs:t.outputs;for(let o in i)if(i.hasOwnProperty(o)){let s=i[o],a;n===0?a=e.hostDirectiveInputs??={}:a=e.hostDirectiveOutputs??={},a[s]??=[],a[s].push(r,o),z_(e,s)}}function z_(n,e){e==="class"?n.flags|=8:e==="style"&&(n.flags|=16)}function hC(n,e,t){let{attrs:r,inputs:i,hostDirectiveInputs:o}=n;if(r===null||!t&&i===null||t&&o===null||Xh(n)){n.initialInputs??=[],n.initialInputs.push(null);return}let s=null,a=0;for(;a<r.length;){let c=r[a];if(c===0){a+=4;continue}else if(c===5){a+=2;continue}else if(typeof c=="number")break;if(!t&&i.hasOwnProperty(c)){let l=i[c];for(let u of l)if(u===e){s??=[],s.push(c,r[a+1]);break}}else if(t&&o.hasOwnProperty(c)){let l=o[c];for(let u=0;u<l.length;u+=2)if(l[u]===e){s??=[],s.push(l[u+1],r[a+1]);break}}a+=2}n.initialInputs??=[],n.initialInputs.push(s)}function g0(n,e,t,r,i){n.data[r]=i;let o=i.factory||(i.factory=Vr(i.type,!0)),s=new ji(o,Zn(i),Xn,null);n.blueprint[r]=s,t[r]=s,y0(n,e,r,l_(n,t,i.hostVars,fn),i)}function y0(n,e,t,r,i){let o=i.hostBindings;if(o){let s=n.hostBindingOpCodes;s===null&&(s=n.hostBindingOpCodes=[]);let a=~e.index;v0(s)!=a&&s.push(a),s.push(t,r,o)}}function v0(n){let e=n.length;for(;e>0;){let t=n[--e];if(typeof t=="number"&&t<0)return t}return 0}function b0(n,e,t){if(t){if(e.exportAs)for(let r=0;r<e.exportAs.length;r++)t[e.exportAs[r]]=n;Zn(e)&&(t[""]=n)}}function C0(n,e,t){n.flags|=1,n.directiveStart=e,n.directiveEnd=e+t,n.providerIndexes=e}function W_(n,e,t,r,i,o,s,a){let c=e[k],l=c.consts,u=qt(l,s),d=Zo(c,n,t,r,u);return o&&H_(c,e,d,qt(l,a),i),d.mergedAttrs=Uo(d.mergedAttrs,d.attrs),d.attrs!==null&&ou(d,d.attrs,!1),d.mergedAttrs!==null&&ou(d,d.mergedAttrs,!0),c.queries!==null&&c.queries.elementStart(c,d),d}function G_(n,e){kC(n,e),Ap(e)&&n.queries.elementEnd(e)}function _0(n,e,t,r,i,o){let s=e.consts,a=qt(s,i),c=Zo(e,n,t,r,a);if(c.mergedAttrs=Uo(c.mergedAttrs,c.attrs),o!=null){let l=qt(s,o);c.localNames=[];for(let u=0;u<l.length;u+=2)c.localNames.push(l[u],-1)}return c.attrs!==null&&ou(c,c.attrs,!1),c.mergedAttrs!==null&&ou(c,c.mergedAttrs,!0),e.queries!==null&&e.queries.elementStart(e,c),c}function dm(n){return K_(n)?Array.isArray(n)||!(n instanceof Map)&&Symbol.iterator in n:!1}function q_(n,e){if(Array.isArray(n))for(let t=0;t<n.length;t++)e(n[t]);else{let t=n[Symbol.iterator](),r;for(;!(r=t.next()).done;)e(r.value)}}function K_(n){return n!==null&&(typeof n=="function"||typeof n=="object")}function Z_(n,e,t){return n[e]=t}function dn(n,e,t){if(t===fn)return!1;let r=n[e];return Object.is(r,t)?!1:(n[e]=t,!0)}function D0(n,e,t,r){let i=dn(n,e,t);return dn(n,e+1,r)||i}function Yl(n,e,t){return function r(i){let o=r.__ngNativeEl__;o!==void 0&&$S(i,o);let s=Kn(n)?an(n.index,e):e;lm(s,5);let a=e[je],c=mC(e,a,t,i),l=r.__ngNextListenerFn__;for(;l;)c=mC(e,a,l,i)&&c,l=l.__ngNextListenerFn__;return c}}function mC(n,e,t,r){let i=A(null);try{return de(ne.OutputStart,e,t),t(r)!==!1}catch(o){return VM(n,o),!1}finally{de(ne.OutputEnd,e,t),A(i)}}function Y_(n,e,t,r,i,o,s,a){let c=oa(n),l=!1,u=null;if(!r&&c&&(u=w0(e,t,o,n.index)),u!==null){let d=u.__ngLastListenerFn__||u;d.__ngNextListenerFn__=s,u.__ngLastListenerFn__=s,l=!0}else{let d=sn(n,t),f=r?r(d):d;zS(t,f,o,a),r||(a.__ngNativeEl__=d);let p=i.listen(f,o,a);if(!E0(o)){let m=r?D=>r(on(D[n.index])):n.index;Q_(m,e,t,o,a,p,!1)}}return l}function E0(n){return n.startsWith("animation")||n.startsWith("transition")}function w0(n,e,t,r){let i=n.cleanup;if(i!=null)for(let o=0;o<i.length-1;o+=2){let s=i[o];if(s===t&&i[o+1]===r){let a=e[Po],c=i[o+2];return a&&a.length>c?a[c]:null}typeof s=="string"&&(o+=2)}return null}function Q_(n,e,t,r,i,o,s){let a=e.firstCreatePass?Bp(e):null,c=Fp(t),l=c.length;c.push(i,o),a&&a.push(r,n,l,(l+1)*(s?-1:1))}function gC(n,e,t,r,i,o){let s=e[t],a=e[k],l=a.data[t].outputs[r],d=s[l].subscribe(o);Q_(n.index,a,e,i,o,d,!0)}var xh=Symbol("BINDING");function X_(n){return n.debugInfo?.className||n.type.name||null}var su=class extends Da{ngModule;constructor(e){super(),this.ngModule=e}resolveComponentFactory(e){let t=fr(e);return new Ui(t,this.ngModule)}};function T0(n){return Object.keys(n).map(e=>{let[t,r,i]=n[e],o={propName:t,templateName:e,isSignal:(r&yu.SignalBased)!==0};return i&&(o.transform=i),o})}function I0(n){return Object.keys(n).map(e=>({propName:n[e],templateName:e}))}function S0(n,e,t){let r=e instanceof Oe?e:e?.injector;return r&&n.getStandaloneInjector!==null&&(r=n.getStandaloneInjector(r)||r),r?new Mh(t,r):t}function M0(n){let e=n.get(un,null);if(e===null)throw new E(407,!1);let t=n.get($_,null),r=n.get(Hr,null),i=n.get(ti,null,{optional:!0});return{rendererFactory:e,sanitizer:t,changeDetectionScheduler:r,ngReflect:!1,tracingService:i}}function x0(n,e){let t=J_(n);return t_(e,t,t==="svg"?wb:t==="math"?Tb:null)}function J_(n){return(n.selectors[0][0]||"div").toLowerCase()}var Ui=class extends Eu{componentDef;ngModule;selector;componentType;ngContentSelectors;isBoundToModule;cachedInputs=null;cachedOutputs=null;get inputs(){return this.cachedInputs??=T0(this.componentDef.inputs),this.cachedInputs}get outputs(){return this.cachedOutputs??=I0(this.componentDef.outputs),this.cachedOutputs}constructor(e,t){super(),this.componentDef=e,this.ngModule=t,this.componentType=e.type,this.selector=sM(e.selectors),this.ngContentSelectors=e.ngContentSelectors??[],this.isBoundToModule=!!t}create(e,t,r,i,o,s){de(ne.DynamicComponentStart);let a=A(null);try{let c=this.componentDef,l=S0(c,i||this.ngModule,e),u=M0(l),d=u.tracingService;return d&&d.componentCreate?d.componentCreate(X_(c),()=>this.createComponentRef(u,l,t,r,o,s)):this.createComponentRef(u,l,t,r,o,s)}finally{A(a)}}createComponentRef(e,t,r,i,o,s){let a=this.componentDef,c=R0(i,a,s,o),l=e.rendererFactory.createRenderer(null,a),u=i?RM(l,i,a.encapsulation,t):x0(a,l),d=s?.some(yC)||o?.some(m=>typeof m!="function"&&m.bindings.some(yC)),f=em(null,c,null,512|c_(a),null,null,e,l,t,null,XC(u,t,!0));f[Se]=u,Vl(f);let p=null;try{let m=W_(Se,f,2,"#host",()=>c.directiveRegistry,!0,0);i_(l,u,m),$o(u,f),am(c,f,m),e_(c,m,f),G_(c,m),r!==void 0&&k0(m,this.ngContentSelectors,r),p=an(m.index,f),f[je]=p[je],cm(c,f,null)}catch(m){throw p!==null&&Ch(p),Ch(f),m}finally{de(ne.DynamicComponentEnd),Ul()}return new au(this.componentType,f,!!d)}};function R0(n,e,t,r){let i=n?["ng-version","21.2.13"]:aM(e.selectors[0]),o=null,s=null,a=0;if(t)for(let u of t)a+=u[xh].requiredVars,u.create&&(u.targetIdx=0,(o??=[]).push(u)),u.update&&(u.targetIdx=0,(s??=[]).push(u));if(r)for(let u=0;u<r.length;u++){let d=r[u];if(typeof d!="function")for(let f of d.bindings){a+=f[xh].requiredVars;let p=u+1;f.create&&(f.targetIdx=p,(o??=[]).push(f)),f.update&&(f.targetIdx=p,(s??=[]).push(f))}}let c=[e];if(r)for(let u of r){let d=typeof u=="function"?u:u.type,f=vp(d);c.push(f)}return Jh(0,null,A0(o,s),1,a,c,null,null,null,[i],null)}function A0(n,e){return!n&&!e?null:t=>{if(t&1&&n)for(let r of n)r.create();if(t&2&&e)for(let r of e)r.update()}}function yC(n){let e=n[xh].kind;return e==="input"||e==="twoWay"}var au=class extends U_{_rootLView;_hasInputBindings;instance;hostView;changeDetectorRef;componentType;location;previousInputValues=null;_tNode;constructor(e,t,r){super(),this._rootLView=t,this._hasInputBindings=r,this._tNode=Ol(t[k],Se),this.location=Go(this._tNode,t),this.instance=an(this._tNode.index,t)[je],this.hostView=this.changeDetectorRef=new Jr(t,void 0),this.componentType=e}setInput(e,t){this._hasInputBindings;let r=this._tNode;if(this.previousInputValues??=new Map,this.previousInputValues.has(e)&&Object.is(this.previousInputValues.get(e),t))return;let i=this._rootLView,o=Du(r,i[k],i,e,t);this.previousInputValues.set(e,t);let s=an(r.index,i);lm(s,1)}get injector(){return new Bi(this._tNode,this._rootLView)}destroy(){this.hostView.destroy()}onDestroy(e){this.hostView.onDestroy(e)}};function k0(n,e,t){let r=n.projection=[];for(let i=0;i<e.length;i++){let o=t[i];r.push(o!=null&&o.length?Array.from(o):null)}}var xt=(()=>{class n{static __NG_ELEMENT_ID__=N0}return n})();function N0(){let n=st();return eD(n,F())}var Rh=class n extends xt{_lContainer;_hostTNode;_hostLView;constructor(e,t,r){super(),this._lContainer=e,this._hostTNode=t,this._hostLView=r}get element(){return Go(this._hostTNode,this._hostLView)}get injector(){return new Bi(this._hostTNode,this._hostLView)}get parentInjector(){let e=qh(this._hostTNode,this._hostLView);if(OC(e)){let t=Jl(e,this._hostLView),r=Xl(e),i=t[k].data[r+8];return new Bi(i,t)}else return new Bi(null,this._hostLView)}clear(){for(;this.length>0;)this.remove(this.length-1)}get(e){let t=vC(this._lContainer);return t!==null&&t[e]||null}get length(){return this._lContainer.length-Pe}createEmbeddedView(e,t,r){let i,o;typeof r=="number"?i=r:r!=null&&(i=r.index,o=r.injector);let s=iu(this._lContainer,e.ssrId),a=e.createEmbeddedViewImpl(t||{},o,s);return this.insertImpl(a,i,Ho(this._hostTNode,s)),a}createComponent(e,t,r,i,o,s,a){let c=e&&!mS(e),l;if(c)l=t;else{let S=t||{};l=S.index,r=S.injector,i=S.projectableNodes,o=S.environmentInjector||S.ngModuleRef,s=S.directives,a=S.bindings}let u=c?e:new Ui(fr(e)),d=r||this.parentInjector;if(!o&&u.ngModule==null){let M=(c?d:this.parentInjector).get(Oe,null);M&&(o=M)}let f=fr(u.componentType??{}),p=iu(this._lContainer,f?.id??null),m=p?.firstChild??null,D=u.create(d,i,m,o,s,a);return this.insertImpl(D.hostView,l,Ho(this._hostTNode,p)),D}insert(e,t){return this.insertImpl(e,t,!0)}insertImpl(e,t,r){let i=e._lView;if(Sb(i)){let a=this.indexOf(e);if(a!==-1)this.detach(a);else{let c=i[We],l=new n(c,c[gt],c[We]);l.detach(l.indexOf(e))}}let o=this._adjustIndex(t),s=this._lContainer;return _a(s,i,o,r),e.attachToViewContainerRef(),Dp(lh(s),o,e),e}move(e,t){return this.insert(e,t)}indexOf(e){let t=vC(this._lContainer);return t!==null?t.indexOf(e):-1}remove(e){let t=this._adjustIndex(e,-1),r=ga(this._lContainer,t);r&&(na(lh(this._lContainer),t),bu(r[k],r))}detach(e){let t=this._adjustIndex(e,-1),r=ga(this._lContainer,t);return r&&na(lh(this._lContainer),t)!=null?new Jr(r):null}_adjustIndex(e,t=0){return e??this.length+t}};function vC(n){return n[ia]}function lh(n){return n[ia]||(n[ia]=[])}function eD(n,e){let t,r=e[n.index];return Mn(r)?t=r:(t=L_(r,e,null,n),e[n.index]=t,tm(e,t)),P0(t,e,n,r),new Rh(t,n,e)}function O0(n,e){let t=n[be],r=t.createComment(""),i=sn(e,n),o=t.parentNode(i);return nu(t,o,r,t.nextSibling(i),!1),r}var P0=B0,L0=()=>!1;function F0(n,e,t){return L0(n,e,t)}function B0(n,e,t,r){if(n[Zr])return;let i;t.type&8?i=on(r):i=O0(e,t),n[Zr]=i}var Ah=class n{queryList;matches=null;constructor(e){this.queryList=e}clone(){return new n(this.queryList)}setDirty(){this.queryList.setDirty()}},kh=class n{queries;constructor(e=[]){this.queries=e}createEmbeddedView(e){let t=e.queries;if(t!==null){let r=e.contentQueries!==null?e.contentQueries[0]:t.length,i=[];for(let o=0;o<r;o++){let s=t.getByIndex(o),a=this.queries[s.indexInDeclarationView];i.push(a.clone())}return new n(i)}return null}insertView(e){this.dirtyQueriesWithMatches(e)}detachView(e){this.dirtyQueriesWithMatches(e)}finishViewCreation(e){this.dirtyQueriesWithMatches(e)}dirtyQueriesWithMatches(e){for(let t=0;t<this.queries.length;t++)fm(e,t).matches!==null&&this.queries[t].setDirty()}},cu=class{flags;read;predicate;constructor(e,t,r=null){this.flags=t,this.read=r,typeof e=="string"?this.predicate=G0(e):this.predicate=e}},Nh=class n{queries;constructor(e=[]){this.queries=e}elementStart(e,t){for(let r=0;r<this.queries.length;r++)this.queries[r].elementStart(e,t)}elementEnd(e){for(let t=0;t<this.queries.length;t++)this.queries[t].elementEnd(e)}embeddedTView(e){let t=null;for(let r=0;r<this.length;r++){let i=t!==null?t.length:0,o=this.getByIndex(r).embeddedTView(e,i);o&&(o.indexInDeclarationView=r,t!==null?t.push(o):t=[o])}return t!==null?new n(t):null}template(e,t){for(let r=0;r<this.queries.length;r++)this.queries[r].template(e,t)}getByIndex(e){return this.queries[e]}get length(){return this.queries.length}track(e){this.queries.push(e)}},Oh=class n{metadata;matches=null;indexInDeclarationView=-1;crossesNgTemplate=!1;_declarationNodeIndex;_appliesToNextNode=!0;constructor(e,t=-1){this.metadata=e,this._declarationNodeIndex=t}elementStart(e,t){this.isApplyingToNode(t)&&this.matchTNode(e,t)}elementEnd(e){this._declarationNodeIndex===e.index&&(this._appliesToNextNode=!1)}template(e,t){this.elementStart(e,t)}embeddedTView(e,t){return this.isApplyingToNode(e)?(this.crossesNgTemplate=!0,this.addMatch(-e.index,t),new n(this.metadata)):null}isApplyingToNode(e){if(this._appliesToNextNode&&(this.metadata.flags&1)!==1){let t=this._declarationNodeIndex,r=e.parent;for(;r!==null&&r.type&8&&r.index!==t;)r=r.parent;return t===(r!==null?r.index:-1)}return this._appliesToNextNode}matchTNode(e,t){let r=this.metadata.predicate;if(Array.isArray(r))for(let i=0;i<r.length;i++){let o=r[i];this.matchTNodeWithReadOption(e,t,j0(t,o)),this.matchTNodeWithReadOption(e,t,Kl(t,e,o,!1,!1))}else r===Mt?t.type&4&&this.matchTNodeWithReadOption(e,t,-1):this.matchTNodeWithReadOption(e,t,Kl(t,e,r,!1,!1))}matchTNodeWithReadOption(e,t,r){if(r!==null){let i=this.metadata.read;if(i!==null)if(i===Ie||i===xt||i===Mt&&t.type&4)this.addMatch(t.index,-2);else{let o=Kl(t,e,i,!1,!1);o!==null&&this.addMatch(t.index,o)}else this.addMatch(t.index,r)}}addMatch(e,t){this.matches===null?this.matches=[e,t]:this.matches.push(e,t)}};function j0(n,e){let t=n.localNames;if(t!==null){for(let r=0;r<t.length;r+=2)if(t[r]===e)return t[r+1]}return null}function V0(n,e){return n.type&11?Go(n,e):n.type&4?um(n,e):null}function U0(n,e,t,r){return t===-1?V0(e,n):t===-2?$0(n,e,r):ha(n,n[k],t,e)}function $0(n,e,t){if(t===Ie)return Go(e,n);if(t===Mt)return um(e,n);if(t===xt)return eD(e,n)}function tD(n,e,t,r){let i=e[qn].queries[r];if(i.matches===null){let o=n.data,s=t.matches,a=[];for(let c=0;s!==null&&c<s.length;c+=2){let l=s[c];if(l<0)a.push(null);else{let u=o[l];a.push(U0(e,u,s[c+1],t.metadata.read))}}i.matches=a}return i.matches}function Ph(n,e,t,r){let i=n.queries.getByIndex(t),o=i.matches;if(o!==null){let s=tD(n,e,i,t);for(let a=0;a<o.length;a+=2){let c=o[a];if(c>0)r.push(s[a/2]);else{let l=o[a+1],u=e[-c];for(let d=Pe;d<u.length;d++){let f=u[d];f[qr]===f[We]&&Ph(f[k],f,l,r)}if(u[Oi]!==null){let d=u[Oi];for(let f=0;f<d.length;f++){let p=d[f];Ph(p[k],p,l,r)}}}}}return r}function H0(n,e){return n[qn].queries[e].queryList}function nD(n,e,t){let r=new yr((t&4)===4);return Rb(n,e,r,r.destroy),(e[qn]??=new kh).queries.push(new Ah(r))-1}function z0(n,e,t){let r=Me();return r.firstCreatePass&&(rD(r,new cu(n,e,t),-1),(e&2)===2&&(r.staticViewQueries=!0)),nD(r,F(),e)}function W0(n,e,t,r){let i=Me();if(i.firstCreatePass){let o=st();rD(i,new cu(e,t,r),o.index),q0(i,n),(t&2)===2&&(i.staticContentQueries=!0)}return nD(i,F(),t)}function G0(n){return n.split(",").map(e=>e.trim())}function rD(n,e,t){n.queries===null&&(n.queries=new Nh),n.queries.track(new Oh(e,t))}function q0(n,e){let t=n.contentQueries||(n.contentQueries=[]),r=t.length?t[t.length-1]:-1;e!==r&&t.push(n.queries.length-1,e)}function fm(n,e){return n.queries.getByIndex(e)}function K0(n,e){let t=n[k],r=fm(t,e);return r.crossesNgTemplate?Ph(t,n,e,[]):tD(t,n,r,e)}var vr=class{},wu=class{};var lu=class extends vr{ngModuleType;_parent;_bootstrapComponents=[];_r3Injector;instance;destroyCbs=[];componentFactoryResolver=new su(this);constructor(e,t,r,i=!0){super(),this.ngModuleType=e,this._parent=t;let o=yp(e);this._bootstrapComponents=o_(o.bootstrap),this._r3Injector=Jp(e,t,[{provide:vr,useValue:this},{provide:Da,useValue:this.componentFactoryResolver},...r],ea(e),new Set(["environment"])),i&&this.resolveInjectorInitializers()}resolveInjectorInitializers(){this._r3Injector.resolveInjectorInitializers(),this.instance=this._r3Injector.get(this.ngModuleType)}get injector(){return this._r3Injector}destroy(){let e=this._r3Injector;!e.destroyed&&e.destroy(),this.destroyCbs.forEach(t=>t()),this.destroyCbs=null}onDestroy(e){this.destroyCbs.push(e)}},uu=class extends wu{moduleType;constructor(e){super(),this.moduleType=e}create(e){return new lu(this.moduleType,e,[])}};var ya=class extends vr{injector;componentFactoryResolver=new su(this);instance=null;constructor(e){super();let t=new Ii([...e.providers,{provide:vr,useValue:this},{provide:Da,useValue:this.componentFactoryResolver}],e.parent||Oo(),e.debugName,new Set(["environment"]));this.injector=t,e.runEnvironmentInitializers&&t.resolveInjectorInitializers()}destroy(){this.injector.destroy()}onDestroy(e){this.injector.onDestroy(e)}};function Ea(n,e,t=null){return new ya({providers:n,parent:e,debugName:t,runEnvironmentInitializers:!0}).injector}var Z0=(()=>{class n{_injector;cachedInjectors=new Map;constructor(t){this._injector=t}getOrCreateStandaloneInjector(t){if(!t.standalone)return null;if(!this.cachedInjectors.has(t)){let r=Tp(!1,t.type),i=r.length>0?Ea([r],this._injector,""):null;this.cachedInjectors.set(t,i)}return this.cachedInjectors.get(t)}ngOnDestroy(){try{for(let t of this.cachedInjectors.values())t!==null&&t.destroy()}finally{this.cachedInjectors.clear()}}static \u0275prov=C({token:n,providedIn:"environment",factory:()=>new n(B(Oe))})}return n})();function Fe(n){return ba(()=>{let e=iD(n),t=W(g({},e),{decls:n.decls,vars:n.vars,template:n.template,consts:n.consts||null,ngContentSelectors:n.ngContentSelectors,onPush:n.changeDetection===Kh.OnPush,directiveDefs:null,pipeDefs:null,dependencies:e.standalone&&n.dependencies||null,getStandaloneInjector:e.standalone?i=>i.get(Z0).getOrCreateStandaloneInjector(t):null,getExternalStyles:null,signals:n.signals??!1,data:n.data||{},encapsulation:n.encapsulation||kn.Emulated,styles:n.styles||ht,_:null,schemas:n.schemas||null,tView:null,id:""});e.standalone&&Cr("NgStandalone"),oD(t);let r=n.dependencies;return t.directiveDefs=bC(r,Y0),t.pipeDefs=bC(r,lb),t.id=J0(t),t})}function Y0(n){return fr(n)||vp(n)}function Rt(n){return ba(()=>({type:n.type,bootstrap:n.bootstrap||ht,declarations:n.declarations||ht,imports:n.imports||ht,exports:n.exports||ht,transitiveCompileScopes:null,schemas:n.schemas||null,id:n.id||null}))}function Q0(n,e){if(n==null)return Wr;let t={};for(let r in n)if(n.hasOwnProperty(r)){let i=n[r],o,s,a,c;Array.isArray(i)?(a=i[0],o=i[1],s=i[2]??o,c=i[3]||null):(o=i,s=i,a=yu.None,c=null),t[o]=[r,a,c],e[o]=s}return t}function X0(n){if(n==null)return Wr;let e={};for(let t in n)n.hasOwnProperty(t)&&(e[n[t]]=t);return e}function Ce(n){return ba(()=>{let e=iD(n);return oD(e),e})}function wa(n){return{type:n.type,name:n.name,factory:null,pure:n.pure!==!1,standalone:n.standalone??!0,onDestroy:n.type.prototype.ngOnDestroy||null}}function iD(n){let e={};return{type:n.type,providersResolver:null,viewProvidersResolver:null,factory:null,hostBindings:n.hostBindings||null,hostVars:n.hostVars||0,hostAttrs:n.hostAttrs||null,contentQueries:n.contentQueries||null,declaredInputs:e,inputConfig:n.inputs||Wr,exportAs:n.exportAs||null,standalone:n.standalone??!0,signals:n.signals===!0,selectors:n.selectors||ht,viewQuery:n.viewQuery||null,features:n.features||null,setInput:null,resolveHostDirectives:null,hostDirectives:null,controlDef:null,inputs:Q0(n.inputs,e),outputs:X0(n.outputs),debugInfo:null}}function oD(n){n.features?.forEach(e=>e(n))}function bC(n,e){return n?()=>{let t=typeof n=="function"?n():n,r=[];for(let i of t){let o=e(i);o!==null&&r.push(o)}return r}:null}function J0(n){let e=0,t=typeof n.consts=="function"?"":n.consts,r=[n.selectors,n.ngContentSelectors,n.hostVars,n.hostAttrs,t,n.vars,n.decls,n.encapsulation,n.standalone,n.signals,n.exportAs,JSON.stringify(n.inputs),JSON.stringify(n.outputs),Object.getOwnPropertyNames(n.type.prototype),!!n.contentQueries,!!n.viewQuery];for(let o of r.join("|"))e=Math.imul(31,e)+o.charCodeAt(0)<<0;return e+=2147483648,"c"+e}function ex(n){return Object.getPrototypeOf(n.prototype).constructor}function Kt(n){let e=ex(n.type),t=!0,r=[n];for(;e;){let i;if(Zn(n))i=e.\u0275cmp||e.\u0275dir;else{if(e.\u0275cmp)throw new E(903,!1);i=e.\u0275dir}if(i){if(t){r.push(i);let s=n;s.inputs=uh(n.inputs),s.declaredInputs=uh(n.declaredInputs),s.outputs=uh(n.outputs);let a=i.hostBindings;a&&ox(n,a);let c=i.viewQuery,l=i.contentQueries;if(c&&rx(n,c),l&&ix(n,l),tx(n,i),cb(n.outputs,i.outputs),Zn(i)&&i.data.animation){let u=n.data;u.animation=(u.animation||[]).concat(i.data.animation)}}let o=i.features;if(o)for(let s=0;s<o.length;s++){let a=o[s];a&&a.ngInherit&&a(n),a===Kt&&(t=!1)}}e=Object.getPrototypeOf(e)}nx(r)}function tx(n,e){for(let t in e.inputs){if(!e.inputs.hasOwnProperty(t)||n.inputs.hasOwnProperty(t))continue;let r=e.inputs[t];r!==void 0&&(n.inputs[t]=r,n.declaredInputs[t]=e.declaredInputs[t])}}function nx(n){let e=0,t=null;for(let r=n.length-1;r>=0;r--){let i=n[r];i.hostVars=e+=i.hostVars,i.hostAttrs=Uo(i.hostAttrs,t=Uo(t,i.hostAttrs))}}function uh(n){return n===Wr?{}:n===ht?[]:n}function rx(n,e){let t=n.viewQuery;t?n.viewQuery=(r,i)=>{e(r,i),t(r,i)}:n.viewQuery=e}function ix(n,e){let t=n.contentQueries;t?n.contentQueries=(r,i,o)=>{e(r,i,o),t(r,i,o)}:n.contentQueries=e}function ox(n,e){let t=n.hostBindings;t?n.hostBindings=(r,i)=>{e(r,i),t(r,i)}:n.hostBindings=e}function sD(n,e,t,r,i,o,s,a){if(t.firstCreatePass){n.mergedAttrs=Uo(n.mergedAttrs,n.attrs);let u=n.tView=Jh(2,n,i,o,s,t.directiveRegistry,t.pipeRegistry,null,t.schemas,t.consts,null);t.queries!==null&&(t.queries.template(t,n),u.queries=t.queries.embeddedTView(n))}a&&(n.flags|=a),Bo(n,!1);let c=ax(t,e,n,r);$l()&&om(t,e,c,n),$o(c,e);let l=L_(c,e,c,n);e[r+Se]=l,tm(e,l),F0(l,n,e)}function sx(n,e,t,r,i,o,s,a,c,l,u){let d=t+Se,f;return e.firstCreatePass?(f=Zo(e,d,4,s||null,a||null),Vp()&&H_(e,n,f,qt(e.consts,l),E_),kC(e,f)):f=e.data[d],sD(f,n,e,t,r,i,o,c),oa(f)&&am(e,n,f),l!=null&&_u(n,f,u),f}function zo(n,e,t,r,i,o,s,a,c,l,u){let d=t+Se,f;if(e.firstCreatePass){if(f=Zo(e,d,4,s||null,a||null),l!=null){let p=qt(e.consts,l);f.localNames=[];for(let m=0;m<p.length;m+=2)f.localNames.push(p[m],-1)}}else f=e.data[d];return sD(f,n,e,t,r,i,o,c),l!=null&&_u(n,f,u),f}function Wi(n,e,t,r,i,o,s,a){let c=F(),l=Me(),u=qt(l.consts,o);return sx(c,l,n,e,t,r,i,u,void 0,s,a),Wi}function Tu(n,e,t,r,i,o,s,a){let c=F(),l=Me(),u=qt(l.consts,o);return zo(c,l,n,e,t,r,i,u,void 0,s,a),Tu}var ax=cx;function cx(n,e,t,r){return Hl(!0),e[be].createComment("")}var pm=(()=>{class n{log(t){console.log(t)}warn(t){console.warn(t)}static \u0275fac=function(r){return new(r||n)};static \u0275prov=C({token:n,factory:n.\u0275fac,providedIn:"platform"})}return n})();function Ta(n){return typeof n=="function"&&n[it]!==void 0}var hm=new v("");function Yo(n){return!!n&&typeof n.then=="function"}function mm(n){return!!n&&typeof n.subscribe=="function"}var gm=new v("");function Iu(n){return Gr([{provide:gm,multi:!0,useValue:n}])}var ym=(()=>{class n{resolve;reject;initialized=!1;done=!1;donePromise=new Promise((t,r)=>{this.resolve=t,this.reject=r});appInits=h(gm,{optional:!0})??[];injector=h(Te);constructor(){}runInitializers(){if(this.initialized)return;let t=[];for(let i of this.appInits){let o=ot(this.injector,i);if(Yo(o))t.push(o);else if(mm(o)){let s=new Promise((a,c)=>{o.subscribe({complete:a,error:c})});t.push(s)}}let r=()=>{this.done=!0,this.resolve()};Promise.all(t).then(()=>{r()}).catch(i=>{this.reject(i)}),t.length===0&&r(),this.initialized=!0}static \u0275fac=function(r){return new(r||n)};static \u0275prov=C({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})(),Su=new v("");function aD(){If(()=>{let n="";throw new E(600,n)})}function cD(n){return n.isBoundToModule}var lx=10;var Jn=(()=>{class n{_runningTick=!1;_destroyed=!1;_destroyListeners=[];_views=[];internalErrorHandler=h(xn);afterRenderManager=h(rm);zonelessEnabled=h(la);rootEffectScheduler=h(zl);dirtyFlags=0;tracingSnapshot=null;allTestViews=new Set;autoDetectTestViews=new Set;includeAllTestViews=!1;afterTick=new I;get allViews(){return[...(this.includeAllTestViews?this.allTestViews:this.autoDetectTestViews).keys(),...this._views]}get destroyed(){return this._destroyed}componentTypes=[];components=[];internalPendingTask=h(Xr);get isStable(){return this.internalPendingTask.hasPendingTasksObservable.pipe(te(t=>!t))}constructor(){h(ti,{optional:!0})}whenStable(){let t;return new Promise(r=>{t=this.isStable.subscribe({next:i=>{i&&r()}})}).finally(()=>{t.unsubscribe()})}_injector=h(Oe);_rendererFactory=null;get injector(){return this._injector}bootstrap(t,r){return this.bootstrapImpl(t,r)}bootstrapImpl(t,r,i=Te.NULL){return this._injector.get(Z).run(()=>{de(ne.BootstrapComponentStart);let s=t instanceof Eu;if(!this._injector.get(ym).done){let m="";throw new E(405,m)}let c;s?c=t:c=this._injector.get(Da).resolveComponentFactory(t),this.componentTypes.push(c.componentType);let l=cD(c)?void 0:this._injector.get(vr),u=r||c.selector,d=c.create(i,[],u,l),f=d.location.nativeElement,p=d.injector.get(hm,null);return p?.registerApplication(f),d.onDestroy(()=>{this.detachView(d.hostView),pa(this.components,d),p?.unregisterApplication(f)}),this._loadComponent(d),de(ne.BootstrapComponentEnd,d),d})}tick(){this.zonelessEnabled||(this.dirtyFlags|=1),this._tick()}_tick(){de(ne.ChangeDetectionStart),this.tracingSnapshot!==null?this.tracingSnapshot.run(vu.CHANGE_DETECTION,this.tickImpl):this.tickImpl()}tickImpl=()=>{if(this._runningTick)throw de(ne.ChangeDetectionEnd),new E(101,!1);let t=A(null);try{this._runningTick=!0,this.synchronize()}finally{this._runningTick=!1,this.tracingSnapshot?.dispose(),this.tracingSnapshot=null,A(t),this.afterTick.next(),de(ne.ChangeDetectionEnd)}};synchronize(){this._rendererFactory===null&&!this._injector.destroyed&&(this._rendererFactory=this._injector.get(un,null,{optional:!0}));let t=0;for(;this.dirtyFlags!==0&&t++<lx;){de(ne.ChangeDetectionSyncStart);try{this.synchronizeOnce()}finally{de(ne.ChangeDetectionSyncEnd)}}}synchronizeOnce(){this.dirtyFlags&16&&(this.dirtyFlags&=-17,this.rootEffectScheduler.flush());let t=!1;if(this.dirtyFlags&7){let r=!!(this.dirtyFlags&1);this.dirtyFlags&=-8,this.dirtyFlags|=8;for(let{_lView:i}of this.allViews){if(!r&&!sa(i))continue;let o=r&&!this.zonelessEnabled?0:1;k_(i,o),t=!0}if(this.dirtyFlags&=-5,this.syncDirtyFlagsWithViews(),this.dirtyFlags&23)return}t||(this._rendererFactory?.begin?.(),this._rendererFactory?.end?.()),this.dirtyFlags&8&&(this.dirtyFlags&=-9,this.afterRenderManager.execute()),this.syncDirtyFlagsWithViews()}syncDirtyFlagsWithViews(){if(this.allViews.some(({_lView:t})=>sa(t))){this.dirtyFlags|=2;return}else this.dirtyFlags&=-8}attachView(t){let r=t;this._views.push(r),r.attachToAppRef(this)}detachView(t){let r=t;pa(this._views,r),r.detachFromAppRef()}_loadComponent(t){this.attachView(t.hostView);try{this.tick()}catch(i){this.internalErrorHandler(i)}this.components.push(t),this._injector.get(Su,[]).forEach(i=>i(t))}ngOnDestroy(){if(!this._destroyed)try{this._destroyListeners.forEach(t=>t()),this._views.slice().forEach(t=>t.destroy())}finally{this._destroyed=!0,this._views=[],this._destroyListeners=[]}}onDestroy(t){return this._destroyListeners.push(t),()=>pa(this._destroyListeners,t)}destroy(){if(this._destroyed)throw new E(406,!1);let t=this._injector;t.destroy&&!t.destroyed&&t.destroy()}get viewCount(){return this._views.length}static \u0275fac=function(r){return new(r||n)};static \u0275prov=C({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})();function pa(n,e){let t=n.indexOf(e);t>-1&&n.splice(t,1)}function Mu(n,e){let t=F(),r=Yr();if(dn(t,r,e)){let i=Me(),o=aa();if(Du(o,i,t,n,e))Kn(o)&&D_(t,o.index);else{let a=sn(o,t);w_(t[be],a,null,o.value,n,e,null)}}return Mu}function At(n,e,t,r){let i=F(),o=Yr();if(dn(i,o,e)){let s=Me(),a=aa();BM(a,i,n,e,t,r)}return At}var Lh=class{destroy(e){}updateValue(e,t){}swap(e,t){let r=Math.min(e,t),i=Math.max(e,t),o=this.detach(i);if(i-r>1){let s=this.detach(r);this.attach(r,o),this.attach(i,s)}else this.attach(r,o)}move(e,t){this.attach(t,this.detach(e))}};function dh(n,e,t,r,i){return n===t&&Object.is(e,r)?1:Object.is(i(n,e),i(t,r))?-1:0}function ux(n,e,t,r){let i,o,s=0,a=n.length-1,c=void 0;if(Array.isArray(e)){A(r);let l=e.length-1;for(A(null);s<=a&&s<=l;){let u=n.at(s),d=e[s],f=dh(s,u,s,d,t);if(f!==0){f<0&&n.updateValue(s,d),s++;continue}let p=n.at(a),m=e[l],D=dh(a,p,l,m,t);if(D!==0){D<0&&n.updateValue(a,m),a--,l--;continue}let S=t(s,u),M=t(a,p),Q=t(s,d);if(Object.is(Q,M)){let Re=t(l,m);Object.is(Re,S)?(n.swap(s,a),n.updateValue(a,m),l--,a--):n.move(a,s),n.updateValue(s,d),s++;continue}if(i??=new du,o??=_C(n,s,a,t),Fh(n,i,s,Q))n.updateValue(s,d),s++,a++;else if(o.has(Q))i.set(S,n.detach(s)),a--;else{let Re=n.create(s,e[s]);n.attach(s,Re),s++,a++}}for(;s<=l;)CC(n,i,t,s,e[s]),s++}else if(e!=null){A(r);let l=e[Symbol.iterator]();A(null);let u=l.next();for(;!u.done&&s<=a;){let d=n.at(s),f=u.value,p=dh(s,d,s,f,t);if(p!==0)p<0&&n.updateValue(s,f),s++,u=l.next();else{i??=new du,o??=_C(n,s,a,t);let m=t(s,f);if(Fh(n,i,s,m))n.updateValue(s,f),s++,a++,u=l.next();else if(!o.has(m))n.attach(s,n.create(s,f)),s++,a++,u=l.next();else{let D=t(s,d);i.set(D,n.detach(s)),a--}}}for(;!u.done;)CC(n,i,t,n.length,u.value),u=l.next()}for(;s<=a;)n.destroy(n.detach(a--));i?.forEach(l=>{n.destroy(l)})}function Fh(n,e,t,r){return e!==void 0&&e.has(r)?(n.attach(t,e.get(r)),e.delete(r),!0):!1}function CC(n,e,t,r,i){if(Fh(n,e,r,t(r,i)))n.updateValue(r,i);else{let o=n.create(r,i);n.attach(r,o)}}function _C(n,e,t,r){let i=new Set;for(let o=e;o<=t;o++)i.add(r(o,n.at(o)));return i}var du=class{kvMap=new Map;_vMap=void 0;has(e){return this.kvMap.has(e)}delete(e){if(!this.has(e))return!1;let t=this.kvMap.get(e);return this._vMap!==void 0&&this._vMap.has(t)?(this.kvMap.set(e,this._vMap.get(t)),this._vMap.delete(t)):this.kvMap.delete(e),!0}get(e){return this.kvMap.get(e)}set(e,t){if(this.kvMap.has(e)){let r=this.kvMap.get(e);this._vMap===void 0&&(this._vMap=new Map);let i=this._vMap;for(;i.has(r);)r=i.get(r);i.set(r,t)}else this.kvMap.set(e,t)}forEach(e){for(let[t,r]of this.kvMap)if(e(r,t),this._vMap!==void 0){let i=this._vMap;for(;i.has(r);)r=i.get(r),e(r,t)}}};function kt(n,e,t,r,i,o,s,a){Cr("NgControlFlow");let c=F(),l=Me(),u=qt(l.consts,o);return zo(c,l,n,e,t,r,i,u,256,s,a),vm}function vm(n,e,t,r,i,o,s,a){Cr("NgControlFlow");let c=F(),l=Me(),u=qt(l.consts,o);return zo(c,l,n,e,t,r,i,u,512,s,a),vm}function Nt(n,e){Cr("NgControlFlow");let t=F(),r=Yr(),i=t[r]!==fn?t[r]:-1,o=i!==-1?fu(t,Se+i):void 0,s=0;if(dn(t,r,n)){let a=A(null);try{if(o!==void 0&&B_(o,s),n!==-1){let c=Se+n,l=fu(t,c),u=Uh(t[k],c),d=V_(l,u,t),f=Ca(t,u,e,{dehydratedView:d});_a(l,f,s,Ho(u,d))}}finally{A(a)}}else if(o!==void 0){let a=F_(o,s);a!==void 0&&(a[je]=e)}}var Bh=class{lContainer;$implicit;$index;constructor(e,t,r){this.lContainer=e,this.$implicit=t,this.$index=r}get $count(){return this.lContainer.length-Pe}};function xu(n,e){return e}var jh=class{hasEmptyBlock;trackByFn;liveCollection;constructor(e,t,r){this.hasEmptyBlock=e,this.trackByFn=t,this.liveCollection=r}};function Ru(n,e,t,r,i,o,s,a,c,l,u,d,f){Cr("NgControlFlow");let p=F(),m=Me(),D=c!==void 0,S=F(),M=a?s.bind(S[yt][je]):s,Q=new jh(D,M);S[Se+n]=Q,zo(p,m,n+1,e,t,r,i,qt(m.consts,o),256),D&&zo(p,m,n+2,c,l,u,d,qt(m.consts,f),512)}var Vh=class extends Lh{lContainer;hostLView;templateTNode;operationsCounter=void 0;needsIndexUpdate=!1;constructor(e,t,r){super(),this.lContainer=e,this.hostLView=t,this.templateTNode=r}get length(){return this.lContainer.length-Pe}at(e){return this.getLView(e)[je].$implicit}attach(e,t){let r=t[Ri];this.needsIndexUpdate||=e!==this.length,_a(this.lContainer,t,e,Ho(this.templateTNode,r)),dx(this.lContainer,e)}detach(e){return this.needsIndexUpdate||=e!==this.length-1,fx(this.lContainer,e),px(this.lContainer,e)}create(e,t){let r=iu(this.lContainer,this.templateTNode.tView.ssrId);return Ca(this.hostLView,this.templateTNode,new Bh(this.lContainer,t,e),{dehydratedView:r})}destroy(e){bu(e[k],e)}updateValue(e,t){this.getLView(e)[je].$implicit=t}reset(){this.needsIndexUpdate=!1}updateIndexes(){if(this.needsIndexUpdate)for(let e=0;e<this.length;e++)this.getLView(e)[je].$index=e}getLView(e){return hx(this.lContainer,e)}};function Au(n){let e=A(null),t=gr();try{let r=F(),i=r[k],o=r[t],s=t+1,a=fu(r,s);if(o.liveCollection===void 0){let l=Uh(i,s);o.liveCollection=new Vh(a,r,l)}else o.liveCollection.reset();let c=o.liveCollection;if(ux(c,n,o.trackByFn,e),c.updateIndexes(),o.hasEmptyBlock){let l=Yr(),u=c.length===0;if(dn(r,l,u)){let d=t+2,f=fu(r,d);if(u){let p=Uh(i,d),m=V_(f,p,r),D=Ca(r,p,void 0,{dehydratedView:m});_a(f,D,0,Ho(p,m))}else i.firstUpdatePass&&a0(f),B_(f,0)}}}finally{A(e)}}function fu(n,e){return n[e]}function dx(n,e){if(n.length<=Pe)return;let t=Pe+e,r=n[t],i=r?r[Kr]:void 0;if(r&&i&&i.detachedLeaveAnimationFns&&i.detachedLeaveAnimationFns.length>0){let o=r[pr];gM(o,i),Vi.delete(r[hr]),i.detachedLeaveAnimationFns=void 0}}function fx(n,e){if(n.length<=Pe)return;let t=Pe+e,r=n[t],i=r?r[Kr]:void 0;i&&i.leave&&i.leave.size>0&&(i.detachedLeaveAnimationFns=[])}function px(n,e){return ga(n,e)}function hx(n,e){return F_(n,e)}function Uh(n,e){return Ol(n,e)}function Zt(n,e,t){let r=F(),i=Yr();if(dn(r,i,e)){let o=Me(),s=aa();OM(s,r,n,e,r[be],t)}return Zt}function $h(n,e,t,r,i){Du(e,n,t,i?"class":"style",r)}function Y(n,e,t,r){let i=F(),o=i[k],s=n+Se,a=o.firstCreatePass?W_(s,i,2,e,E_,Vp(),t,r):o.data[s];if(Kn(a)){let c=i[Gn].tracingService;if(c&&c.componentCreate){let l=o.data[a.directiveStart+a.componentOffset];return c.componentCreate(X_(l),()=>(DC(n,e,i,a,r),Y))}}return DC(n,e,i,a,r),Y}function DC(n,e,t,r,i){if(T_(r,t,n,e,lD),oa(r)){let o=t[k];am(o,t,r),e_(o,r,t)}i!=null&&_u(t,r)}function se(){let n=Me(),e=st(),t=I_(e);return n.firstCreatePass&&G_(n,t),$p(t)&&Hp(),jp(),t.classesWithoutHost!=null&&_S(t)&&$h(n,t,F(),t.classesWithoutHost,!0),t.stylesWithoutHost!=null&&DS(t)&&$h(n,t,F(),t.stylesWithoutHost,!1),se}function at(n,e,t,r){return Y(n,e,t,r),se(),at}function _e(n,e,t,r){let i=F(),o=i[k],s=n+Se,a=o.firstCreatePass?_0(s,o,2,e,t,r):o.data[s];return T_(a,i,n,e,lD),r!=null&&_u(i,a),_e}function ae(){let n=st(),e=I_(n);return $p(e)&&Hp(),jp(),ae}function ku(n,e,t,r){return _e(n,e,t,r),ae(),ku}var lD=(n,e,t,r,i)=>(Hl(!0),t_(e[be],r,zb()));function ni(){return F()}function Nu(n,e,t){let r=F(),i=Yr();if(dn(r,i,e)){let o=Me(),s=aa();__(s,r,n,e,r[be],t)}return Nu}var ua=void 0;function mx(n){let e=Math.floor(Math.abs(n)),t=n.toString().replace(/^[^.]*\.?/,"").length;return e===1&&t===0?1:5}var gx=["en",[["a","p"],["AM","PM"]],[["AM","PM"]],[["S","M","T","W","T","F","S"],["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],["Su","Mo","Tu","We","Th","Fr","Sa"]],ua,[["J","F","M","A","M","J","J","A","S","O","N","D"],["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],["January","February","March","April","May","June","July","August","September","October","November","December"]],ua,[["B","A"],["BC","AD"],["Before Christ","Anno Domini"]],0,[6,0],["M/d/yy","MMM d, y","MMMM d, y","EEEE, MMMM d, y"],["h:mm\u202Fa","h:mm:ss\u202Fa","h:mm:ss\u202Fa z","h:mm:ss\u202Fa zzzz"],["{1}, {0}",ua,ua,ua],[".",",",";","%","+","-","E","\xD7","\u2030","\u221E","NaN",":"],["#,##0.###","#,##0%","\xA4#,##0.00","#E0"],"USD","$","US Dollar",{},"ltr",mx],fh={};function Ot(n){let e=yx(n),t=EC(e);if(t)return t;let r=e.split("-")[0];if(t=EC(r),t)return t;if(r==="en")return gx;throw new E(701,!1)}function EC(n){return n in fh||(fh[n]=Si.ng&&Si.ng.common&&Si.ng.common.locales&&Si.ng.common.locales[n]),fh[n]}var Be=(function(n){return n[n.LocaleId=0]="LocaleId",n[n.DayPeriodsFormat=1]="DayPeriodsFormat",n[n.DayPeriodsStandalone=2]="DayPeriodsStandalone",n[n.DaysFormat=3]="DaysFormat",n[n.DaysStandalone=4]="DaysStandalone",n[n.MonthsFormat=5]="MonthsFormat",n[n.MonthsStandalone=6]="MonthsStandalone",n[n.Eras=7]="Eras",n[n.FirstDayOfWeek=8]="FirstDayOfWeek",n[n.WeekendRange=9]="WeekendRange",n[n.DateFormat=10]="DateFormat",n[n.TimeFormat=11]="TimeFormat",n[n.DateTimeFormat=12]="DateTimeFormat",n[n.NumberSymbols=13]="NumberSymbols",n[n.NumberFormats=14]="NumberFormats",n[n.CurrencyCode=15]="CurrencyCode",n[n.CurrencySymbol=16]="CurrencySymbol",n[n.CurrencyName=17]="CurrencyName",n[n.Currencies=18]="Currencies",n[n.Directionality=19]="Directionality",n[n.PluralCase=20]="PluralCase",n[n.ExtraData=21]="ExtraData",n})(Be||{});function yx(n){return n.toLowerCase().replace(/_/g,"-")}var Ia="en-US";var vx=Ia;function uD(n){typeof n=="string"&&(vx=n.toLowerCase().replace(/_/g,"-"))}function Pt(n,e,t){let r=F(),i=Me(),o=st();return bx(i,r,r[be],o,n,e,t),Pt}function Ou(n,e,t){let r=F(),i=Me(),o=st();return(o.type&3||t)&&Y_(o,i,r,t,r[be],n,e,Yl(o,r,e)),Ou}function bx(n,e,t,r,i,o,s){let a=!0,c=null;if((r.type&3||s)&&(c??=Yl(r,e,o),Y_(r,n,e,s,t,i,o,c)&&(a=!1)),a){let l=r.outputs?.[i],u=r.hostDirectiveOutputs?.[i];if(u&&u.length)for(let d=0;d<u.length;d+=2){let f=u[d],p=u[d+1];c??=Yl(r,e,o),gC(r,e,f,p,i,c)}if(l&&l.length)for(let d of l)c??=Yl(r,e,o),gC(r,e,d,i,i,c)}}function Ve(n=1){return Hb(n)}function Cx(n,e){let t=null,r=tM(n);for(let i=0;i<e.length;i++){let o=e[i];if(o==="*"){t=i;continue}if(r===null?a_(n,o,!0):iM(r,o))return i}return t}function Gi(n){let e=F()[yt][gt];if(!e.projection){let t=n?n.length:1,r=e.projection=mb(t,null),i=r.slice(),o=e.child;for(;o!==null;){if(o.type!==128){let s=n?Cx(o,n):0;s!==null&&(i[s]?i[s].projectionNext=o:r[s]=o,i[s]=o)}o=o.next}}}function qi(n,e=0,t,r,i,o){let s=F(),a=Me(),c=r?n+1:null;c!==null&&zo(s,a,c,r,i,o,null,t);let l=Zo(a,Se+n,16,null,t||null);l.projection===null&&(l.projection=e),Gp();let d=!s[Ri]||Up();s[yt][gt].projection[l.projection]===null&&c!==null?_x(s,a,c):d&&!gu(l)&&SM(a,s,l)}function _x(n,e,t){let r=Se+t,i=e.data[r],o=n[r],s=iu(o,i.tView.ssrId),a=Ca(n,i,void 0,{dehydratedView:s});_a(o,a,0,Ho(i,s))}function Qo(n,e,t,r){return W0(n,e,t,r),Qo}function Dr(n,e,t){return z0(n,e,t),Dr}function Ge(n){let e=F(),t=Me(),r=Yp();jl(r+1);let i=fm(t,r);if(n.dirty&&Ib(e)===((i.metadata.flags&2)===2)){if(i.matches===null)n.reset([]);else{let o=K0(e,r);n.reset(o,PS),n.notifyOnChanges()}return!0}return!1}function qe(){return H0(F(),Yp())}function Pu(n){let e=Ob();return Pl(e,Se+n)}function Wl(n,e){return n<<17|e<<2}function $i(n){return n>>17&32767}function Dx(n){return(n&2)==2}function Ex(n,e){return n&131071|e<<17}function Hh(n){return n|2}function Wo(n){return(n&131068)>>2}function ph(n,e){return n&-131069|e<<2}function wx(n){return(n&1)===1}function zh(n){return n|1}function Tx(n,e,t,r,i,o){let s=o?e.classBindings:e.styleBindings,a=$i(s),c=Wo(s);n[r]=t;let l=!1,u;if(Array.isArray(t)){let d=t;u=d[1],(u===null||No(d,u)>0)&&(l=!0)}else u=t;if(i)if(c!==0){let f=$i(n[a+1]);n[r+1]=Wl(f,a),f!==0&&(n[f+1]=ph(n[f+1],r)),n[a+1]=Ex(n[a+1],r)}else n[r+1]=Wl(a,0),a!==0&&(n[a+1]=ph(n[a+1],r)),a=r;else n[r+1]=Wl(c,0),a===0?a=r:n[c+1]=ph(n[c+1],r),c=r;l&&(n[r+1]=Hh(n[r+1])),wC(n,u,r,!0),wC(n,u,r,!1),Ix(e,u,n,r,o),s=Wl(a,c),o?e.classBindings=s:e.styleBindings=s}function Ix(n,e,t,r,i){let o=i?n.residualClasses:n.residualStyles;o!=null&&typeof e=="string"&&No(o,e)>=0&&(t[r+1]=zh(t[r+1]))}function wC(n,e,t,r){let i=n[t+1],o=e===null,s=r?$i(i):Wo(i),a=!1;for(;s!==0&&(a===!1||o);){let c=n[s],l=n[s+1];Sx(c,e)&&(a=!0,n[s+1]=r?zh(l):Hh(l)),s=r?$i(l):Wo(l)}a&&(n[t+1]=r?Hh(i):zh(i))}function Sx(n,e){return n===null||e==null||(Array.isArray(n)?n[1]:n)===e?!0:Array.isArray(n)&&typeof e=="string"?No(n,e)>=0:!1}var An={textEnd:0,key:0,keyEnd:0,value:0,valueEnd:0};function Mx(n){return n.substring(An.key,An.keyEnd)}function xx(n){return Rx(n),dD(n,fD(n,0,An.textEnd))}function dD(n,e){let t=An.textEnd;return t===e?-1:(e=An.keyEnd=Ax(n,An.key=e,t),fD(n,e,t))}function Rx(n){An.key=0,An.keyEnd=0,An.value=0,An.valueEnd=0,An.textEnd=n.length}function fD(n,e,t){for(;e<t&&n.charCodeAt(e)<=32;)e++;return e}function Ax(n,e,t){for(;e<t&&n.charCodeAt(e)>32;)e++;return e}function Xo(n,e,t){return pD(n,e,t,!1),Xo}function $e(n,e){return pD(n,e,null,!0),$e}function Ki(n){Nx(jx,kx,n,!0)}function kx(n,e){for(let t=xx(e);t>=0;t=dD(e,t))Al(n,Mx(e),!0)}function pD(n,e,t,r){let i=F(),o=Me(),s=Zp(2);if(o.firstUpdatePass&&mD(o,n,s,r),e!==fn&&dn(i,s,e)){let a=o.data[gr()];gD(o,a,i,i[be],n,i[s+1]=Ux(e,t),r,s)}}function Nx(n,e,t,r){let i=Me(),o=Zp(2);i.firstUpdatePass&&mD(i,null,o,r);let s=F();if(t!==fn&&dn(s,o,t)){let a=i.data[gr()];if(yD(a,r)&&!hD(i,o)){let c=r?a.classesWithoutHost:a.stylesWithoutHost;c!==null&&(t=Il(c,t||"")),$h(i,a,s,t,r)}else Vx(i,a,s,s[be],s[o+1],s[o+1]=Bx(n,e,t),r,o)}}function hD(n,e){return e>=n.expandoStartIndex}function mD(n,e,t,r){let i=n.data;if(i[t+1]===null){let o=i[gr()],s=hD(n,t);yD(o,r)&&e===null&&!s&&(e=!1),e=Ox(i,o,e,r),Tx(i,o,e,t,s,r)}}function Ox(n,e,t,r){let i=jb(n),o=r?e.residualClasses:e.residualStyles;if(i===null)(r?e.classBindings:e.styleBindings)===0&&(t=hh(null,n,e,t,r),t=va(t,e.attrs,r),o=null);else{let s=e.directiveStylingLast;if(s===-1||n[s]!==i)if(t=hh(i,n,e,t,r),o===null){let c=Px(n,e,r);c!==void 0&&Array.isArray(c)&&(c=hh(null,n,e,c[1],r),c=va(c,e.attrs,r),Lx(n,e,r,c))}else o=Fx(n,e,r)}return o!==void 0&&(r?e.residualClasses=o:e.residualStyles=o),t}function Px(n,e,t){let r=t?e.classBindings:e.styleBindings;if(Wo(r)!==0)return n[$i(r)]}function Lx(n,e,t,r){let i=t?e.classBindings:e.styleBindings;n[$i(i)]=r}function Fx(n,e,t){let r,i=e.directiveEnd;for(let o=1+e.directiveStylingLast;o<i;o++){let s=n[o].hostAttrs;r=va(r,s,t)}return va(r,e.attrs,t)}function hh(n,e,t,r,i){let o=null,s=t.directiveEnd,a=t.directiveStylingLast;for(a===-1?a=t.directiveStart:a++;a<s&&(o=e[a],r=va(r,o.hostAttrs,i),o!==n);)a++;return n!==null&&(t.directiveStylingLast=a),r}function va(n,e,t){let r=t?1:2,i=-1;if(e!==null)for(let o=0;o<e.length;o++){let s=e[o];typeof s=="number"?i=s:i===r&&(Array.isArray(n)||(n=n===void 0?[]:["",n]),Al(n,s,t?!0:e[++o]))}return n===void 0?null:n}function Bx(n,e,t){if(t==null||t==="")return ht;let r=[],i=Qh(t);if(Array.isArray(i))for(let o=0;o<i.length;o++)n(r,i[o],!0);else if(i instanceof Set)for(let o of i)n(r,o,!0);else if(typeof i=="object")for(let o in i)i.hasOwnProperty(o)&&n(r,o,i[o]);else typeof i=="string"&&e(r,i);return r}function jx(n,e,t){let r=String(e);r!==""&&!r.includes(" ")&&Al(n,r,t)}function Vx(n,e,t,r,i,o,s,a){i===fn&&(i=ht);let c=0,l=0,u=0<i.length?i[0]:null,d=0<o.length?o[0]:null;for(;u!==null||d!==null;){let f=c<i.length?i[c+1]:void 0,p=l<o.length?o[l+1]:void 0,m=null,D;u===d?(c+=2,l+=2,f!==p&&(m=d,D=p)):d===null||u!==null&&u<d?(c+=2,m=u):(l+=2,m=d,D=p),m!==null&&gD(n,e,t,r,m,D,s,a),u=c<i.length?i[c]:null,d=l<o.length?o[l]:null}}function gD(n,e,t,r,i,o,s,a){if(!(e.type&3))return;let c=n.data,l=c[a+1],u=wx(l)?TC(c,e,t,i,Wo(l),s):void 0;if(!pu(u)){pu(o)||Dx(l)&&(o=TC(c,null,t,i,a,s));let d=kp(gr(),t);xM(r,s,d,i,o)}}function TC(n,e,t,r,i,o){let s=e===null,a;for(;i>0;){let c=n[i],l=Array.isArray(c),u=l?c[1]:c,d=u===null,f=t[i+1];f===fn&&(f=d?ht:void 0);let p=d?kl(f,r):u===r?f:void 0;if(l&&!pu(p)&&(p=kl(c,r)),pu(p)&&(a=p,s))return a;let m=n[i+1];i=s?$i(m):Wo(m)}if(e!==null){let c=o?e.residualClasses:e.residualStyles;c!=null&&(a=kl(c,r))}return a}function pu(n){return n!==void 0}function Ux(n,e){return n==null||n===""||(typeof e=="string"?n=n+e:typeof n=="object"&&(n=ea(Qh(n)))),n}function yD(n,e){return(n.flags&(e?8:16))!==0}function K(n,e=""){let t=F(),r=Me(),i=n+Se,o=r.firstCreatePass?Zo(r,i,1,e,null):r.data[i],s=$x(r,t,o,e);t[i]=s,$l()&&om(r,t,s,o),Bo(o,!1)}var $x=(n,e,t,r)=>(Hl(!0),GS(e[be],r));function vD(n,e,t,r=""){return dn(n,Yr(),t)?e+bp(t)+r:fn}function Er(n){return Lt("",n),Er}function Lt(n,e,t){let r=F(),i=vD(r,n,e,t);return i!==fn&&Hx(r,gr(),i),Lt}function Hx(n,e,t){let r=kp(e,n);qS(n[be],r,t)}function bm(n,e,t=""){return vD(F(),n,e,t)}function IC(n,e,t){let r=Me();r.firstCreatePass&&bD(e,r.data,r.blueprint,Zn(n),t)}function bD(n,e,t,r,i){if(n=Qe(n),Array.isArray(n))for(let o=0;o<n.length;o++)bD(n[o],e,t,r,i);else{let o=Me(),s=F(),a=st(),c=Ti(n)?n:Qe(n.provide),l=Sp(n),u=a.providerIndexes&1048575,d=a.directiveStart,f=a.providerIndexes>>20;if(Ti(n)||!n.multi){let p=new ji(l,i,Xn,null),m=gh(c,e,i?u:u+f,d);m===-1?(vh(tu(a,s),o,c),mh(o,n,e.length),e.push(c),a.directiveStart++,a.directiveEnd++,i&&(a.providerIndexes+=1048576),t.push(p),s.push(p)):(t[m]=p,s[m]=p)}else{let p=gh(c,e,u+f,d),m=gh(c,e,u,u+f),D=p>=0&&t[p],S=m>=0&&t[m];if(i&&!S||!i&&!D){vh(tu(a,s),o,c);let M=Gx(i?Wx:zx,t.length,i,r,l,n);!i&&S&&(t[m].providerFactory=M),mh(o,n,e.length,0),e.push(c),a.directiveStart++,a.directiveEnd++,i&&(a.providerIndexes+=1048576),t.push(M),s.push(M)}else{let M=CD(t[i?m:p],l,!i&&r);mh(o,n,p>-1?p:m,M)}!i&&r&&S&&t[m].componentProviders++}}}function mh(n,e,t,r){let i=Ti(e),o=_b(e);if(i||o){let c=(o?Qe(e.useClass):e).prototype.ngOnDestroy;if(c){let l=n.destroyHooks||(n.destroyHooks=[]);if(!i&&e.multi){let u=l.indexOf(t);u===-1?l.push(t,[r,c]):l[u+1].push(r,c)}else l.push(t,c)}}}function CD(n,e,t){return t&&n.componentProviders++,n.multi.push(e)-1}function gh(n,e,t,r){for(let i=t;i<r;i++)if(e[i]===n)return i;return-1}function zx(n,e,t,r,i){return Wh(this.multi,[])}function Wx(n,e,t,r,i){let o=this.multi,s;if(this.providerFactory){let a=this.providerFactory.componentProviders,c=ha(r,r[k],this.providerFactory.index,i);s=c.slice(0,a),Wh(o,s);for(let l=a;l<c.length;l++)s.push(c[l])}else s=[],Wh(o,s);return s}function Wh(n,e){for(let t=0;t<n.length;t++){let r=n[t];e.push(r())}return e}function Gx(n,e,t,r,i,o){let s=new ji(n,t,Xn,null);return s.multi=[],s.index=e,s.componentProviders=0,CD(s,i,r&&!t),s}function er(n,e){return t=>{t.providersResolver=(r,i)=>IC(r,i?i(n):n,!1),e&&(t.viewProvidersResolver=(r,i)=>IC(r,i?i(e):e,!0))}}function _D(n,e){let t=n[e];return t===fn?void 0:t}function qx(n,e,t,r,i,o){let s=e+t;return dn(n,s,i)?Z_(n,s+1,o?r.call(o,i):r(i)):_D(n,s+1)}function Kx(n,e,t,r,i,o,s){let a=e+t;return D0(n,a,i,o)?Z_(n,a+2,s?r.call(s,i,o):r(i,o)):_D(n,a+2)}function Zi(n,e){let t=Me(),r,i=n+Se;t.firstCreatePass?(r=Zx(e,t.pipeRegistry),t.data[i]=r,r.onDestroy&&(t.destroyHooks??=[]).push(i,r.onDestroy)):r=t.data[i];let o=r.factory||(r.factory=Vr(r.type,!0)),s,a=pt(Xn);try{let c=eu(!1),l=o();return eu(c),Np(t,F(),i,l),l}finally{pt(a)}}function Zx(n,e){if(e)for(let t=e.length-1;t>=0;t--){let r=e[t];if(n===r.name)return r}}function Sa(n,e,t){let r=n+Se,i=F(),o=Pl(i,r);return DD(i,r)?qx(i,Kp(),e,o.transform,t,o):o.transform(t)}function Lu(n,e,t,r){let i=n+Se,o=F(),s=Pl(o,i);return DD(o,i)?Kx(o,Kp(),e,s.transform,t,r,s):s.transform(t,r)}function DD(n,e){return n[k].data[e].pure}var hu=class{ngModuleFactory;componentFactories;constructor(e,t){this.ngModuleFactory=e,this.componentFactories=t}},Cm=(()=>{class n{compileModuleSync(t){return new uu(t)}compileModuleAsync(t){return Promise.resolve(this.compileModuleSync(t))}compileModuleAndAllComponentsSync(t){let r=this.compileModuleSync(t),i=yp(t),o=o_(i.declarations).reduce((s,a)=>{let c=fr(a);return c&&s.push(new Ui(c)),s},[]);return new hu(r,o)}compileModuleAndAllComponentsAsync(t){return Promise.resolve(this.compileModuleAndAllComponentsSync(t))}clearCache(){}clearCacheFor(t){}getModuleId(t){}static \u0275fac=function(r){return new(r||n)};static \u0275prov=C({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})();var ED=(()=>{class n{applicationErrorHandler=h(xn);appRef=h(Jn);taskService=h(Xr);ngZone=h(Z);zonelessEnabled=h(la);tracing=h(ti,{optional:!0});zoneIsDefined=typeof Zone<"u"&&!!Zone.root.run;schedulerTickApplyArgs=[{data:{__scheduler_tick__:!0}}];subscriptions=new q;angularZoneId=this.zoneIsDefined?this.ngZone._inner?.get(Xs):null;scheduleInRootZone=!this.zonelessEnabled&&this.zoneIsDefined&&(h(oh,{optional:!0})??!1);cancelScheduledCallback=null;useMicrotaskScheduler=!1;runningTick=!1;pendingRenderTaskId=null;constructor(){this.subscriptions.add(this.appRef.afterTick.subscribe(()=>{let t=this.taskService.add();if(!this.runningTick&&(this.cleanup(),!this.zonelessEnabled||this.appRef.includeAllTestViews)){this.taskService.remove(t);return}this.switchToMicrotaskScheduler(),this.taskService.remove(t)})),this.subscriptions.add(this.ngZone.onUnstable.subscribe(()=>{this.runningTick||this.cleanup()}))}switchToMicrotaskScheduler(){this.ngZone.runOutsideAngular(()=>{let t=this.taskService.add();this.useMicrotaskScheduler=!0,queueMicrotask(()=>{this.useMicrotaskScheduler=!1,this.taskService.remove(t)})})}notify(t){if(!this.zonelessEnabled&&t===5)return;switch(t){case 0:{this.appRef.dirtyFlags|=2;break}case 3:case 2:case 4:case 5:case 1:{this.appRef.dirtyFlags|=4;break}case 6:{this.appRef.dirtyFlags|=2;break}case 12:{this.appRef.dirtyFlags|=16;break}case 13:{this.appRef.dirtyFlags|=2;break}case 11:break;default:this.appRef.dirtyFlags|=8}if(this.appRef.tracingSnapshot=this.tracing?.snapshot(this.appRef.tracingSnapshot)??null,!this.shouldScheduleTick())return;let r=this.useMicrotaskScheduler?Kb:eh;this.pendingRenderTaskId=this.taskService.add(),this.scheduleInRootZone?this.cancelScheduledCallback=Zone.root.run(()=>r(()=>this.tick())):this.cancelScheduledCallback=this.ngZone.runOutsideAngular(()=>r(()=>this.tick()))}shouldScheduleTick(){return!(this.appRef.destroyed||this.pendingRenderTaskId!==null||this.runningTick||this.appRef._runningTick||!this.zonelessEnabled&&this.zoneIsDefined&&Zone.current.get(Xs+this.angularZoneId))}tick(){if(this.runningTick||this.appRef.destroyed)return;if(this.appRef.dirtyFlags===0){this.cleanup();return}!this.zonelessEnabled&&this.appRef.dirtyFlags&7&&(this.appRef.dirtyFlags|=1);let t=this.taskService.add();try{this.ngZone.run(()=>{this.runningTick=!0,this.appRef._tick()},void 0,this.schedulerTickApplyArgs)}catch(r){this.applicationErrorHandler(r)}finally{this.taskService.remove(t),this.cleanup()}}ngOnDestroy(){this.subscriptions.unsubscribe(),this.cleanup()}cleanup(){if(this.runningTick=!1,this.cancelScheduledCallback?.(),this.cancelScheduledCallback=null,this.pendingRenderTaskId!==null){let t=this.pendingRenderTaskId;this.pendingRenderTaskId=null,this.taskService.remove(t)}}static \u0275fac=function(r){return new(r||n)};static \u0275prov=C({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})();function _m(){return Cr("NgZoneless"),Gr([...Dm(),[]])}function Dm(){return[{provide:Hr,useExisting:ED},{provide:Z,useClass:Js},{provide:la,useValue:!0}]}function Yx(){return typeof $localize<"u"&&$localize.locale||Ia}var Jo=new v("",{factory:()=>h(Jo,{optional:!0,skipSelf:!0})||Yx()});var Fu=class{destroyed=!1;listeners=null;errorHandler=h(nn,{optional:!0});destroyRef=h(Ue);constructor(){this.destroyRef.onDestroy(()=>{this.destroyed=!0,this.listeners=null})}subscribe(e){if(this.destroyed)throw new E(953,!1);return(this.listeners??=[]).push(e),{unsubscribe:()=>{let t=this.listeners?.indexOf(e);t!==void 0&&t!==-1&&this.listeners?.splice(t,1)}}}emit(e){if(this.destroyed){console.warn(zr(953,!1));return}if(this.listeners===null)return;let t=A(null);try{for(let r of this.listeners)try{r(e)}catch(i){this.errorHandler?.handleError(i)}}finally{A(t)}}};function Nn(n){return rb(n)}function Ft(n,e){return Vc(n,e?.equal)}var SD=Symbol("InputSignalNode#UNSET"),uR=W(g({},Uc),{transformFn:void 0,applyValueToInputSignal(n,e){Co(n,e)}});function MD(n,e){let t=Object.create(uR);t.value=n,t.transformFn=e?.transform;function r(){if(yo(t),t.value===SD){let i=null;throw new E(-950,i)}return t.value}return r[it]=t,r}function xD(n){return new Fu}function wD(n,e){return MD(n,e)}function dR(n){return MD(SD,n)}var es=(wD.required=dR,wD);var Em=new v(""),fR=new v("");function Ma(n){return!n.moduleRef}function pR(n){let e=Ma(n)?n.r3Injector:n.moduleRef.injector,t=e.get(Z);return t.run(()=>{Ma(n)?n.r3Injector.resolveInjectorInitializers():n.moduleRef.resolveInjectorInitializers();let r=e.get(xn),i;if(t.runOutsideAngular(()=>{i=t.onError.subscribe({next:r})}),Ma(n)){let o=()=>e.destroy(),s=n.platformInjector.get(Em);s.add(o),e.onDestroy(()=>{i.unsubscribe(),s.delete(o)})}else{let o=()=>n.moduleRef.destroy(),s=n.platformInjector.get(Em);s.add(o),n.moduleRef.onDestroy(()=>{pa(n.allPlatformModules,n.moduleRef),i.unsubscribe(),s.delete(o)})}return mR(r,t,()=>{let o=e.get(Xr),s=o.add(),a=e.get(ym);return a.runInitializers(),a.donePromise.then(()=>{let c=e.get(Jo,Ia);if(uD(c||Ia),!e.get(fR,!0))return Ma(n)?e.get(Jn):(n.allPlatformModules.push(n.moduleRef),n.moduleRef);if(Ma(n)){let u=e.get(Jn);return n.rootComponent!==void 0&&u.bootstrap(n.rootComponent),u}else return hR?.(n.moduleRef,n.allPlatformModules),n.moduleRef}).finally(()=>{o.remove(s)})})})}var hR;function mR(n,e,t){try{let r=t();return Yo(r)?r.catch(i=>{throw e.runOutsideAngular(()=>n(i)),i}):r}catch(r){throw e.runOutsideAngular(()=>n(r)),r}}var Bu=null;function gR(n=[],e){return Te.create({name:e,providers:[{provide:ra,useValue:"platform"},{provide:Em,useValue:new Set([()=>Bu=null])},...n]})}function yR(n=[]){if(Bu)return Bu;let e=gR(n);return Bu=e,aD(),vR(e),e}function vR(n){let e=n.get(mu,null);ot(n,()=>{e?.forEach(t=>t())})}var bR=1e4;var IG=bR-1e3;var wr=(()=>{class n{static __NG_ELEMENT_ID__=CR}return n})();function CR(n){return _R(st(),F(),(n&16)===16)}function _R(n,e,t){if(Kn(n)&&!t){let r=an(n.index,e);return new Jr(r,r)}else if(n.type&175){let r=e[yt];return new Jr(r,e)}return null}var wm=class{supports(e){return dm(e)}create(e){return new Tm(e)}},DR=(n,e)=>e,Tm=class{length=0;collection;_linkedRecords=null;_unlinkedRecords=null;_previousItHead=null;_itHead=null;_itTail=null;_additionsHead=null;_additionsTail=null;_movesHead=null;_movesTail=null;_removalsHead=null;_removalsTail=null;_identityChangesHead=null;_identityChangesTail=null;_trackByFn;constructor(e){this._trackByFn=e||DR}forEachItem(e){let t;for(t=this._itHead;t!==null;t=t._next)e(t)}forEachOperation(e){let t=this._itHead,r=this._removalsHead,i=0,o=null;for(;t||r;){let s=!r||t&&t.currentIndex<TD(r,i,o)?t:r,a=TD(s,i,o),c=s.currentIndex;if(s===r)i--,r=r._nextRemoved;else if(t=t._next,s.previousIndex==null)i++;else{o||(o=[]);let l=a-i,u=c-i;if(l!=u){for(let f=0;f<l;f++){let p=f<o.length?o[f]:o[f]=0,m=p+f;u<=m&&m<l&&(o[f]=p+1)}let d=s.previousIndex;o[d]=u-l}}a!==c&&e(s,a,c)}}forEachPreviousItem(e){let t;for(t=this._previousItHead;t!==null;t=t._nextPrevious)e(t)}forEachAddedItem(e){let t;for(t=this._additionsHead;t!==null;t=t._nextAdded)e(t)}forEachMovedItem(e){let t;for(t=this._movesHead;t!==null;t=t._nextMoved)e(t)}forEachRemovedItem(e){let t;for(t=this._removalsHead;t!==null;t=t._nextRemoved)e(t)}forEachIdentityChange(e){let t;for(t=this._identityChangesHead;t!==null;t=t._nextIdentityChange)e(t)}diff(e){if(e==null&&(e=[]),!dm(e))throw new E(900,!1);return this.check(e)?this:null}onDestroy(){}check(e){this._reset();let t=this._itHead,r=!1,i,o,s;if(Array.isArray(e)){this.length=e.length;for(let a=0;a<this.length;a++)o=e[a],s=this._trackByFn(a,o),t===null||!Object.is(t.trackById,s)?(t=this._mismatch(t,o,s,a),r=!0):(r&&(t=this._verifyReinsertion(t,o,s,a)),Object.is(t.item,o)||this._addIdentityChange(t,o)),t=t._next}else i=0,q_(e,a=>{s=this._trackByFn(i,a),t===null||!Object.is(t.trackById,s)?(t=this._mismatch(t,a,s,i),r=!0):(r&&(t=this._verifyReinsertion(t,a,s,i)),Object.is(t.item,a)||this._addIdentityChange(t,a)),t=t._next,i++}),this.length=i;return this._truncate(t),this.collection=e,this.isDirty}get isDirty(){return this._additionsHead!==null||this._movesHead!==null||this._removalsHead!==null||this._identityChangesHead!==null}_reset(){if(this.isDirty){let e;for(e=this._previousItHead=this._itHead;e!==null;e=e._next)e._nextPrevious=e._next;for(e=this._additionsHead;e!==null;e=e._nextAdded)e.previousIndex=e.currentIndex;for(this._additionsHead=this._additionsTail=null,e=this._movesHead;e!==null;e=e._nextMoved)e.previousIndex=e.currentIndex;this._movesHead=this._movesTail=null,this._removalsHead=this._removalsTail=null,this._identityChangesHead=this._identityChangesTail=null}}_mismatch(e,t,r,i){let o;return e===null?o=this._itTail:(o=e._prev,this._remove(e)),e=this._unlinkedRecords===null?null:this._unlinkedRecords.get(r,null),e!==null?(Object.is(e.item,t)||this._addIdentityChange(e,t),this._reinsertAfter(e,o,i)):(e=this._linkedRecords===null?null:this._linkedRecords.get(r,i),e!==null?(Object.is(e.item,t)||this._addIdentityChange(e,t),this._moveAfter(e,o,i)):e=this._addAfter(new Im(t,r),o,i)),e}_verifyReinsertion(e,t,r,i){let o=this._unlinkedRecords===null?null:this._unlinkedRecords.get(r,null);return o!==null?e=this._reinsertAfter(o,e._prev,i):e.currentIndex!=i&&(e.currentIndex=i,this._addToMoves(e,i)),e}_truncate(e){for(;e!==null;){let t=e._next;this._addToRemovals(this._unlink(e)),e=t}this._unlinkedRecords!==null&&this._unlinkedRecords.clear(),this._additionsTail!==null&&(this._additionsTail._nextAdded=null),this._movesTail!==null&&(this._movesTail._nextMoved=null),this._itTail!==null&&(this._itTail._next=null),this._removalsTail!==null&&(this._removalsTail._nextRemoved=null),this._identityChangesTail!==null&&(this._identityChangesTail._nextIdentityChange=null)}_reinsertAfter(e,t,r){this._unlinkedRecords!==null&&this._unlinkedRecords.remove(e);let i=e._prevRemoved,o=e._nextRemoved;return i===null?this._removalsHead=o:i._nextRemoved=o,o===null?this._removalsTail=i:o._prevRemoved=i,this._insertAfter(e,t,r),this._addToMoves(e,r),e}_moveAfter(e,t,r){return this._unlink(e),this._insertAfter(e,t,r),this._addToMoves(e,r),e}_addAfter(e,t,r){return this._insertAfter(e,t,r),this._additionsTail===null?this._additionsTail=this._additionsHead=e:this._additionsTail=this._additionsTail._nextAdded=e,e}_insertAfter(e,t,r){let i=t===null?this._itHead:t._next;return e._next=i,e._prev=t,i===null?this._itTail=e:i._prev=e,t===null?this._itHead=e:t._next=e,this._linkedRecords===null&&(this._linkedRecords=new ju),this._linkedRecords.put(e),e.currentIndex=r,e}_remove(e){return this._addToRemovals(this._unlink(e))}_unlink(e){this._linkedRecords!==null&&this._linkedRecords.remove(e);let t=e._prev,r=e._next;return t===null?this._itHead=r:t._next=r,r===null?this._itTail=t:r._prev=t,e}_addToMoves(e,t){return e.previousIndex===t||(this._movesTail===null?this._movesTail=this._movesHead=e:this._movesTail=this._movesTail._nextMoved=e),e}_addToRemovals(e){return this._unlinkedRecords===null&&(this._unlinkedRecords=new ju),this._unlinkedRecords.put(e),e.currentIndex=null,e._nextRemoved=null,this._removalsTail===null?(this._removalsTail=this._removalsHead=e,e._prevRemoved=null):(e._prevRemoved=this._removalsTail,this._removalsTail=this._removalsTail._nextRemoved=e),e}_addIdentityChange(e,t){return e.item=t,this._identityChangesTail===null?this._identityChangesTail=this._identityChangesHead=e:this._identityChangesTail=this._identityChangesTail._nextIdentityChange=e,e}},Im=class{item;trackById;currentIndex=null;previousIndex=null;_nextPrevious=null;_prev=null;_next=null;_prevDup=null;_nextDup=null;_prevRemoved=null;_nextRemoved=null;_nextAdded=null;_nextMoved=null;_nextIdentityChange=null;constructor(e,t){this.item=e,this.trackById=t}},Sm=class{_head=null;_tail=null;add(e){this._head===null?(this._head=this._tail=e,e._nextDup=null,e._prevDup=null):(this._tail._nextDup=e,e._prevDup=this._tail,e._nextDup=null,this._tail=e)}get(e,t){let r;for(r=this._head;r!==null;r=r._nextDup)if((t===null||t<=r.currentIndex)&&Object.is(r.trackById,e))return r;return null}remove(e){let t=e._prevDup,r=e._nextDup;return t===null?this._head=r:t._nextDup=r,r===null?this._tail=t:r._prevDup=t,this._head===null}},ju=class{map=new Map;put(e){let t=e.trackById,r=this.map.get(t);r||(r=new Sm,this.map.set(t,r)),r.add(e)}get(e,t){let r=e,i=this.map.get(r);return i?i.get(e,t):null}remove(e){let t=e.trackById;return this.map.get(t).remove(e)&&this.map.delete(t),e}get isEmpty(){return this.map.size===0}clear(){this.map.clear()}};function TD(n,e,t){let r=n.previousIndex;if(r===null)return r;let i=0;return t&&r<t.length&&(i=t[r]),r+e+i}function ID(){return new Uu([new wm])}var Uu=(()=>{class n{factories;static \u0275prov=C({token:n,providedIn:"root",factory:ID});constructor(t){this.factories=t}static create(t,r){if(r!=null){let i=r.factories.slice();t=t.concat(i)}return new n(t)}static extend(t){return{provide:n,useFactory:()=>{let r=h(n,{optional:!0,skipSelf:!0});return n.create(t,r||ID())}}}find(t){let r=this.factories.find(i=>i.supports(t));if(r!=null)return r;throw new E(901,!1)}}return n})();function RD(n){let{rootComponent:e,appProviders:t,platformProviders:r,platformRef:i}=n;de(ne.BootstrapApplicationStart);try{let o=i?.injector??yR(r),s=[Dm(),Yb,...t||[]],a=new ya({providers:s,parent:o,debugName:"",runEnvironmentInitializers:!1});return pR({r3Injector:a.injector,platformInjector:o,rootComponent:e})}catch(o){return Promise.reject(o)}finally{de(ne.BootstrapApplicationEnd)}}function Xe(n){return typeof n=="boolean"?n:n!=null&&n!=="false"}function $u(n,e=NaN){return!isNaN(parseFloat(n))&&!isNaN(Number(n))?Number(n):e}function Mm(n,e){let t=fr(n),r=e.elementInjector||Oo();return new Ui(t).create(r,e.projectableNodes,e.hostElement,e.environmentInjector,e.directives,e.bindings)}var AD=null;function Tr(){return AD}function xm(n){AD??=n}var xa=class{},Yi=(()=>{class n{historyGo(t){throw new Error("")}static \u0275fac=function(r){return new(r||n)};static \u0275prov=C({token:n,factory:()=>h(kD),providedIn:"platform"})}return n})();var kD=(()=>{class n extends Yi{_location;_history;_doc=h(pe);constructor(){super(),this._location=window.location,this._history=window.history}getBaseHrefFromDOM(){return Tr().getBaseHref(this._doc)}onPopState(t){let r=Tr().getGlobalEventTarget(this._doc,"window");return r.addEventListener("popstate",t,!1),()=>r.removeEventListener("popstate",t)}onHashChange(t){let r=Tr().getGlobalEventTarget(this._doc,"window");return r.addEventListener("hashchange",t,!1),()=>r.removeEventListener("hashchange",t)}get href(){return this._location.href}get protocol(){return this._location.protocol}get hostname(){return this._location.hostname}get port(){return this._location.port}get pathname(){return this._location.pathname}get search(){return this._location.search}get hash(){return this._location.hash}set pathname(t){this._location.pathname=t}pushState(t,r,i){this._history.pushState(t,r,i)}replaceState(t,r,i){this._history.replaceState(t,r,i)}forward(){this._history.forward()}back(){this._history.back()}historyGo(t=0){this._history.go(t)}getState(){return this._history.state}static \u0275fac=function(r){return new(r||n)};static \u0275prov=C({token:n,factory:()=>new n,providedIn:"platform"})}return n})();function Hu(n,e){return n?e?n.endsWith("/")?e.startsWith("/")?n+e.slice(1):n+e:e.startsWith("/")?n+e:`${n}/${e}`:n:e}function ND(n){let e=n.search(/#|\?|$/);return n[e-1]==="/"?n.slice(0,e-1)+n.slice(e):n}function On(n){return n&&n[0]!=="?"?`?${n}`:n}var ri=(()=>{class n{historyGo(t){throw new Error("")}static \u0275fac=function(r){return new(r||n)};static \u0275prov=C({token:n,factory:()=>h(PD),providedIn:"root"})}return n})(),Rm=new v(""),PD=(()=>{class n extends ri{_platformLocation;_baseHref;_removeListenerFns=[];constructor(t,r){super(),this._platformLocation=t,this._baseHref=r??this._platformLocation.getBaseHrefFromDOM()??h(pe).location?.origin??""}ngOnDestroy(){for(;this._removeListenerFns.length;)this._removeListenerFns.pop()()}onPopState(t){this._removeListenerFns.push(this._platformLocation.onPopState(t),this._platformLocation.onHashChange(t))}getBaseHref(){return this._baseHref}prepareExternalUrl(t){return Hu(this._baseHref,t)}path(t=!1){let r=this._platformLocation.pathname+On(this._platformLocation.search),i=this._platformLocation.hash;return i&&t?`${r}${i}`:r}pushState(t,r,i,o){let s=this.prepareExternalUrl(i+On(o));this._platformLocation.pushState(t,r,s)}replaceState(t,r,i,o){let s=this.prepareExternalUrl(i+On(o));this._platformLocation.replaceState(t,r,s)}forward(){this._platformLocation.forward()}back(){this._platformLocation.back()}getState(){return this._platformLocation.getState()}historyGo(t=0){this._platformLocation.historyGo?.(t)}static \u0275fac=function(r){return new(r||n)(B(Yi),B(Rm,8))};static \u0275prov=C({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})();var Qi=(()=>{class n{_subject=new I;_basePath;_locationStrategy;_urlChangeListeners=[];_urlChangeSubscription=null;constructor(t){this._locationStrategy=t;let r=this._locationStrategy.getBaseHref();this._basePath=TR(ND(OD(r))),this._locationStrategy.onPopState(i=>{this._subject.next({url:this.path(!0),pop:!0,state:i.state,type:i.type})})}ngOnDestroy(){this._urlChangeSubscription?.unsubscribe(),this._urlChangeListeners=[]}path(t=!1){return this.normalize(this._locationStrategy.path(t))}getState(){return this._locationStrategy.getState()}isCurrentPathEqualTo(t,r=""){return this.path()==this.normalize(t+On(r))}normalize(t){return n.stripTrailingSlash(wR(this._basePath,OD(t)))}prepareExternalUrl(t){return t&&t[0]!=="/"&&(t="/"+t),this._locationStrategy.prepareExternalUrl(t)}go(t,r="",i=null){this._locationStrategy.pushState(i,"",t,r),this._notifyUrlChangeListeners(this.prepareExternalUrl(t+On(r)),i)}replaceState(t,r="",i=null){this._locationStrategy.replaceState(i,"",t,r),this._notifyUrlChangeListeners(this.prepareExternalUrl(t+On(r)),i)}forward(){this._locationStrategy.forward()}back(){this._locationStrategy.back()}historyGo(t=0){this._locationStrategy.historyGo?.(t)}onUrlChange(t){return this._urlChangeListeners.push(t),this._urlChangeSubscription??=this.subscribe(r=>{this._notifyUrlChangeListeners(r.url,r.state)}),()=>{let r=this._urlChangeListeners.indexOf(t);this._urlChangeListeners.splice(r,1),this._urlChangeListeners.length===0&&(this._urlChangeSubscription?.unsubscribe(),this._urlChangeSubscription=null)}}_notifyUrlChangeListeners(t="",r){this._urlChangeListeners.forEach(i=>i(t,r))}subscribe(t,r,i){return this._subject.subscribe({next:t,error:r??void 0,complete:i??void 0})}static normalizeQueryParams=On;static joinWithSlash=Hu;static stripTrailingSlash=ND;static \u0275fac=function(r){return new(r||n)(B(ri))};static \u0275prov=C({token:n,factory:()=>ER(),providedIn:"root"})}return n})();function ER(){return new Qi(B(ri))}function wR(n,e){if(!n||!e.startsWith(n))return e;let t=e.substring(n.length);return t===""||["/",";","?","#"].includes(t[0])?t:e}function OD(n){return n.replace(/\/index.html$/,"")}function TR(n){if(new RegExp("^(https?:)?//").test(n)){let[,t]=n.split(/\/\/[^\/]+/);return t}return n}var Lm=(()=>{class n extends ri{_platformLocation;_baseHref="";_removeListenerFns=[];constructor(t,r){super(),this._platformLocation=t,r!=null&&(this._baseHref=r)}ngOnDestroy(){for(;this._removeListenerFns.length;)this._removeListenerFns.pop()()}onPopState(t){this._removeListenerFns.push(this._platformLocation.onPopState(t),this._platformLocation.onHashChange(t))}getBaseHref(){return this._baseHref}path(t=!1){let r=this._platformLocation.hash??"#";return r.length>0?r.substring(1):r}prepareExternalUrl(t){let r=Hu(this._baseHref,t);return r.length>0?"#"+r:r}pushState(t,r,i,o){let s=this.prepareExternalUrl(i+On(o))||this._platformLocation.pathname;this._platformLocation.pushState(t,r,s)}replaceState(t,r,i,o){let s=this.prepareExternalUrl(i+On(o))||this._platformLocation.pathname;this._platformLocation.replaceState(t,r,s)}forward(){this._platformLocation.forward()}back(){this._platformLocation.back()}getState(){return this._platformLocation.getState()}historyGo(t=0){this._platformLocation.historyGo?.(t)}static \u0275fac=function(r){return new(r||n)(B(Yi),B(Rm,8))};static \u0275prov=C({token:n,factory:n.\u0275fac})}return n})();var Fm=(function(n){return n[n.Decimal=0]="Decimal",n[n.Percent=1]="Percent",n[n.Currency=2]="Currency",n[n.Scientific=3]="Scientific",n})(Fm||{});var ct=(function(n){return n[n.Format=0]="Format",n[n.Standalone=1]="Standalone",n})(ct||{}),he=(function(n){return n[n.Narrow=0]="Narrow",n[n.Abbreviated=1]="Abbreviated",n[n.Wide=2]="Wide",n[n.Short=3]="Short",n})(he||{}),Bt=(function(n){return n[n.Short=0]="Short",n[n.Medium=1]="Medium",n[n.Long=2]="Long",n[n.Full=3]="Full",n})(Bt||{}),jt={Decimal:0,Group:1,List:2,PercentSign:3,PlusSign:4,MinusSign:5,Exponential:6,SuperscriptingExponent:7,PerMille:8,Infinity:9,NaN:10,TimeSeparator:11,CurrencyDecimal:12,CurrencyGroup:13};function BD(n){return Ot(n)[Be.LocaleId]}function jD(n,e,t){let r=Ot(n),i=[r[Be.DayPeriodsFormat],r[Be.DayPeriodsStandalone]],o=pn(i,e);return pn(o,t)}function VD(n,e,t){let r=Ot(n),i=[r[Be.DaysFormat],r[Be.DaysStandalone]],o=pn(i,e);return pn(o,t)}function UD(n,e,t){let r=Ot(n),i=[r[Be.MonthsFormat],r[Be.MonthsStandalone]],o=pn(i,e);return pn(o,t)}function $D(n,e){let r=Ot(n)[Be.Eras];return pn(r,e)}function Ra(n,e){let t=Ot(n);return pn(t[Be.DateFormat],e)}function Aa(n,e){let t=Ot(n);return pn(t[Be.TimeFormat],e)}function ka(n,e){let r=Ot(n)[Be.DateTimeFormat];return pn(r,e)}function tr(n,e){let t=Ot(n),r=t[Be.NumberSymbols][e];if(typeof r>"u"){if(e===jt.CurrencyDecimal)return t[Be.NumberSymbols][jt.Decimal];if(e===jt.CurrencyGroup)return t[Be.NumberSymbols][jt.Group]}return r}function HD(n,e){return Ot(n)[Be.NumberFormats][e]}function zD(n){if(!n[Be.ExtraData])throw new E(2303,!1)}function WD(n){let e=Ot(n);return zD(e),(e[Be.ExtraData][2]||[]).map(r=>typeof r=="string"?Am(r):[Am(r[0]),Am(r[1])])}function GD(n,e,t){let r=Ot(n);zD(r);let i=[r[Be.ExtraData][0],r[Be.ExtraData][1]],o=pn(i,e)||[];return pn(o,t)||[]}function pn(n,e){for(let t=e;t>-1;t--)if(typeof n[t]<"u")return n[t];throw new E(2304,!1)}function Am(n){let[e,t]=n.split(":");return{hours:+e,minutes:+t}}var IR=/^(\d{4,})-?(\d\d)-?(\d\d)(?:T(\d\d)(?::?(\d\d)(?::?(\d\d)(?:\.(\d+))?)?)?(Z|([+-])(\d\d):?(\d\d))?)?$/,zu={},SR=/((?:[^BEGHLMOSWYZabcdhmswyz']+)|(?:'(?:[^']|'')*')|(?:G{1,5}|y{1,4}|Y{1,4}|M{1,5}|L{1,5}|w{1,2}|W{1}|d{1,2}|E{1,6}|c{1,6}|a{1,5}|b{1,5}|B{1,5}|h{1,2}|H{1,2}|m{1,2}|s{1,2}|S{1,3}|z{1,4}|Z{1,5}|O{1,4}))([\s\S]*)/;function qD(n,e,t,r){let i=LR(n);e=Ir(t,e)||e;let s=[],a;for(;e;)if(a=SR.exec(e),a){s=s.concat(a.slice(1));let u=s.pop();if(!u)break;e=u}else{s.push(e);break}let c=i.getTimezoneOffset();r&&(c=ZD(r,c),i=PR(i,r));let l="";return s.forEach(u=>{let d=NR(u);l+=d?d(i,t,c):u==="''"?"'":u.replace(/(^'|'$)/g,"").replace(/''/g,"'")}),l}function Zu(n,e,t){let r=new Date(0);return r.setFullYear(n,e,t),r.setHours(0,0,0),r}function Ir(n,e){let t=BD(n);if(zu[t]??={},zu[t][e])return zu[t][e];let r="";switch(e){case"shortDate":r=Ra(n,Bt.Short);break;case"mediumDate":r=Ra(n,Bt.Medium);break;case"longDate":r=Ra(n,Bt.Long);break;case"fullDate":r=Ra(n,Bt.Full);break;case"shortTime":r=Aa(n,Bt.Short);break;case"mediumTime":r=Aa(n,Bt.Medium);break;case"longTime":r=Aa(n,Bt.Long);break;case"fullTime":r=Aa(n,Bt.Full);break;case"short":let i=Ir(n,"shortTime"),o=Ir(n,"shortDate");r=Wu(ka(n,Bt.Short),[i,o]);break;case"medium":let s=Ir(n,"mediumTime"),a=Ir(n,"mediumDate");r=Wu(ka(n,Bt.Medium),[s,a]);break;case"long":let c=Ir(n,"longTime"),l=Ir(n,"longDate");r=Wu(ka(n,Bt.Long),[c,l]);break;case"full":let u=Ir(n,"fullTime"),d=Ir(n,"fullDate");r=Wu(ka(n,Bt.Full),[u,d]);break}return r&&(zu[t][e]=r),r}function Wu(n,e){return e&&(n=n.replace(/\{([^}]+)}/g,function(t,r){return e!=null&&r in e?e[r]:t})),n}function Pn(n,e,t="-",r,i){let o="";(n<0||i&&n<=0)&&(i?n=-n+1:(n=-n,o=t));let s=String(n);for(;s.length<e;)s="0"+s;return r&&(s=s.slice(s.length-e)),o+s}function MR(n,e){return Pn(n,3).substring(0,e)}function He(n,e,t=0,r=!1,i=!1){return function(o,s){let a=xR(n,o);if((t>0||a>-t)&&(a+=t),n===3)a===0&&t===-12&&(a=12);else if(n===6)return MR(a,e);let c=tr(s,jt.MinusSign);return Pn(a,e,c,r,i)}}function xR(n,e){switch(n){case 0:return e.getFullYear();case 1:return e.getMonth();case 2:return e.getDate();case 3:return e.getHours();case 4:return e.getMinutes();case 5:return e.getSeconds();case 6:return e.getMilliseconds();case 7:return e.getDay();default:throw new E(2301,!1)}}function De(n,e,t=ct.Format,r=!1){return function(i,o){return RR(i,o,n,e,t,r)}}function RR(n,e,t,r,i,o){switch(t){case 2:return UD(e,i,r)[n.getMonth()];case 1:return VD(e,i,r)[n.getDay()];case 0:let s=n.getHours(),a=n.getMinutes();if(o){let l=WD(e),u=GD(e,i,r),d=l.findIndex(f=>{if(Array.isArray(f)){let[p,m]=f,D=s>=p.hours&&a>=p.minutes,S=s<m.hours||s===m.hours&&a<m.minutes;if(p.hours<m.hours){if(D&&S)return!0}else if(D||S)return!0}else if(f.hours===s&&f.minutes===a)return!0;return!1});if(d!==-1)return u[d]}return jD(e,i,r)[s<12?0:1];case 3:return $D(e,r)[n.getFullYear()<=0?0:1];default:let c=t;throw new E(2302,!1)}}function Gu(n){return function(e,t,r){let i=-1*r,o=tr(t,jt.MinusSign),s=i>0?Math.floor(i/60):Math.ceil(i/60);switch(n){case 0:return(i>=0?"+":"")+Pn(s,2,o)+Pn(Math.abs(i%60),2,o);case 1:return"GMT"+(i>=0?"+":"")+Pn(s,1,o);case 2:return"GMT"+(i>=0?"+":"")+Pn(s,2,o)+":"+Pn(Math.abs(i%60),2,o);case 3:return r===0?"Z":(i>=0?"+":"")+Pn(s,2,o)+":"+Pn(Math.abs(i%60),2,o);default:throw new E(2310,!1)}}}var AR=0,Ku=4;function kR(n){let e=Zu(n,AR,1).getDay();return Zu(n,0,1+(e<=Ku?Ku:Ku+7)-e)}function KD(n){let e=n.getDay(),t=e===0?-3:Ku-e;return Zu(n.getFullYear(),n.getMonth(),n.getDate()+t)}function km(n,e=!1){return function(t,r){let i;if(e){let o=new Date(t.getFullYear(),t.getMonth(),1).getDay()-1,s=t.getDate();i=1+Math.floor((s+o)/7)}else{let o=KD(t),s=kR(o.getFullYear()),a=o.getTime()-s.getTime();i=1+Math.round(a/6048e5)}return Pn(i,n,tr(r,jt.MinusSign))}}function qu(n,e=!1){return function(t,r){let o=KD(t).getFullYear();return Pn(o,n,tr(r,jt.MinusSign),e)}}var Nm={};function NR(n){if(Nm[n])return Nm[n];let e;switch(n){case"G":case"GG":case"GGG":e=De(3,he.Abbreviated);break;case"GGGG":e=De(3,he.Wide);break;case"GGGGG":e=De(3,he.Narrow);break;case"y":e=He(0,1,0,!1,!0);break;case"yy":e=He(0,2,0,!0,!0);break;case"yyy":e=He(0,3,0,!1,!0);break;case"yyyy":e=He(0,4,0,!1,!0);break;case"Y":e=qu(1);break;case"YY":e=qu(2,!0);break;case"YYY":e=qu(3);break;case"YYYY":e=qu(4);break;case"M":case"L":e=He(1,1,1);break;case"MM":case"LL":e=He(1,2,1);break;case"MMM":e=De(2,he.Abbreviated);break;case"MMMM":e=De(2,he.Wide);break;case"MMMMM":e=De(2,he.Narrow);break;case"LLL":e=De(2,he.Abbreviated,ct.Standalone);break;case"LLLL":e=De(2,he.Wide,ct.Standalone);break;case"LLLLL":e=De(2,he.Narrow,ct.Standalone);break;case"w":e=km(1);break;case"ww":e=km(2);break;case"W":e=km(1,!0);break;case"d":e=He(2,1);break;case"dd":e=He(2,2);break;case"c":case"cc":e=He(7,1);break;case"ccc":e=De(1,he.Abbreviated,ct.Standalone);break;case"cccc":e=De(1,he.Wide,ct.Standalone);break;case"ccccc":e=De(1,he.Narrow,ct.Standalone);break;case"cccccc":e=De(1,he.Short,ct.Standalone);break;case"E":case"EE":case"EEE":e=De(1,he.Abbreviated);break;case"EEEE":e=De(1,he.Wide);break;case"EEEEE":e=De(1,he.Narrow);break;case"EEEEEE":e=De(1,he.Short);break;case"a":case"aa":case"aaa":e=De(0,he.Abbreviated);break;case"aaaa":e=De(0,he.Wide);break;case"aaaaa":e=De(0,he.Narrow);break;case"b":case"bb":case"bbb":e=De(0,he.Abbreviated,ct.Standalone,!0);break;case"bbbb":e=De(0,he.Wide,ct.Standalone,!0);break;case"bbbbb":e=De(0,he.Narrow,ct.Standalone,!0);break;case"B":case"BB":case"BBB":e=De(0,he.Abbreviated,ct.Format,!0);break;case"BBBB":e=De(0,he.Wide,ct.Format,!0);break;case"BBBBB":e=De(0,he.Narrow,ct.Format,!0);break;case"h":e=He(3,1,-12);break;case"hh":e=He(3,2,-12);break;case"H":e=He(3,1);break;case"HH":e=He(3,2);break;case"m":e=He(4,1);break;case"mm":e=He(4,2);break;case"s":e=He(5,1);break;case"ss":e=He(5,2);break;case"S":e=He(6,1);break;case"SS":e=He(6,2);break;case"SSS":e=He(6,3);break;case"Z":case"ZZ":case"ZZZ":e=Gu(0);break;case"ZZZZZ":e=Gu(3);break;case"O":case"OO":case"OOO":case"z":case"zz":case"zzz":e=Gu(1);break;case"OOOO":case"ZZZZ":case"zzzz":e=Gu(2);break;default:return null}return Nm[n]=e,e}function ZD(n,e){n=n.replace(/:/g,"");let t=Date.parse("Jan 01, 1970 00:00:00 "+n)/6e4;return isNaN(t)?e:t}function OR(n,e){return n=new Date(n.getTime()),n.setMinutes(n.getMinutes()+e),n}function PR(n,e,t){let i=n.getTimezoneOffset(),o=ZD(e,i);return OR(n,-1*(o-i))}function LR(n){if(LD(n))return n;if(typeof n=="number"&&!isNaN(n))return new Date(n);if(typeof n=="string"){if(n=n.trim(),/^(\d{4}(-\d{1,2}(-\d{1,2})?)?)$/.test(n)){let[i,o=1,s=1]=n.split("-").map(a=>+a);return Zu(i,o-1,s)}let t=parseFloat(n);if(!isNaN(n-t))return new Date(t);let r;if(r=n.match(IR))return FR(r)}let e=new Date(n);if(!LD(e))throw new E(2311,!1);return e}function FR(n){let e=new Date(0),t=0,r=0,i=n[8]?e.setUTCFullYear:e.setFullYear,o=n[8]?e.setUTCHours:e.setHours;n[9]&&(t=Number(n[9]+n[10]),r=Number(n[9]+n[11])),i.call(e,Number(n[1]),Number(n[2])-1,Number(n[3]));let s=Number(n[4]||0)-t,a=Number(n[5]||0)-r,c=Number(n[6]||0),l=Math.floor(parseFloat("0."+(n[7]||0))*1e3);return o.call(e,s,a,c,l),e}function LD(n){return n instanceof Date&&!isNaN(n.valueOf())}var BR=/^(\d+)?\.((\d+)(-(\d+))?)?$/,FD=22,Yu=".",Na="0",jR=";",VR=",",Om="#";function UR(n,e,t,r,i,o,s=!1){let a="",c=!1;if(!isFinite(n))a=tr(t,jt.Infinity);else{let l=zR(n);s&&(l=HR(l));let u=e.minInt,d=e.minFrac,f=e.maxFrac;if(o){let Q=o.match(BR);if(Q===null)throw new E(2306,!1);let Re=Q[1],sr=Q[3],fi=Q[5];Re!=null&&(u=Pm(Re)),sr!=null&&(d=Pm(sr)),fi!=null?f=Pm(fi):sr!=null&&d>f&&(f=d)}WR(l,d,f);let p=l.digits,m=l.integerLen,D=l.exponent,S=[];for(c=p.every(Q=>!Q);m<u;m++)p.unshift(0);for(;m<0;m++)p.unshift(0);m>0?S=p.splice(m,p.length):(S=p,p=[0]);let M=[];for(p.length>=e.lgSize&&M.unshift(p.splice(-e.lgSize,p.length).join(""));p.length>e.gSize;)M.unshift(p.splice(-e.gSize,p.length).join(""));p.length&&M.unshift(p.join("")),a=M.join(tr(t,r)),S.length&&(a+=tr(t,i)+S.join("")),D&&(a+=tr(t,jt.Exponential)+"+"+D)}return n<0&&!c?a=e.negPre+a+e.negSuf:a=e.posPre+a+e.posSuf,a}function YD(n,e,t){let r=HD(e,Fm.Decimal),i=$R(r,tr(e,jt.MinusSign));return UR(n,i,e,jt.Group,jt.Decimal,t)}function $R(n,e="-"){let t={minInt:1,minFrac:0,maxFrac:0,posPre:"",posSuf:"",negPre:"",negSuf:"",gSize:0,lgSize:0},r=n.split(jR),i=r[0],o=r[1],s=i.indexOf(Yu)!==-1?i.split(Yu):[i.substring(0,i.lastIndexOf(Na)+1),i.substring(i.lastIndexOf(Na)+1)],a=s[0],c=s[1]||"";t.posPre=a.substring(0,a.indexOf(Om));for(let u=0;u<c.length;u++){let d=c.charAt(u);d===Na?t.minFrac=t.maxFrac=u+1:d===Om?t.maxFrac=u+1:t.posSuf+=d}let l=a.split(VR);if(t.gSize=l[1]?l[1].length:0,t.lgSize=l[2]||l[1]?(l[2]||l[1]).length:0,o){let u=i.length-t.posPre.length-t.posSuf.length,d=o.indexOf(Om);t.negPre=o.substring(0,d).replace(/'/g,""),t.negSuf=o.slice(d+u).replace(/'/g,"")}else t.negPre=e+t.posPre,t.negSuf=t.posSuf;return t}function HR(n){if(n.digits[0]===0)return n;let e=n.digits.length-n.integerLen;return n.exponent?n.exponent+=2:(e===0?n.digits.push(0,0):e===1&&n.digits.push(0),n.integerLen+=2),n}function zR(n){let e=Math.abs(n)+"",t=0,r,i,o,s,a;for((i=e.indexOf(Yu))>-1&&(e=e.replace(Yu,"")),(o=e.search(/e/i))>0?(i<0&&(i=o),i+=+e.slice(o+1),e=e.substring(0,o)):i<0&&(i=e.length),o=0;e.charAt(o)===Na;o++);if(o===(a=e.length))r=[0],i=1;else{for(a--;e.charAt(a)===Na;)a--;for(i-=o,r=[],s=0;o<=a;o++,s++)r[s]=Number(e.charAt(o))}return i>FD&&(r=r.splice(0,FD-1),t=i-1,i=1),{digits:r,exponent:t,integerLen:i}}function WR(n,e,t){if(e>t)throw new E(2307,!1);let r=n.digits,i=r.length-n.integerLen,o=Math.min(Math.max(e,i),t),s=o+n.integerLen,a=r[s];if(s>0){r.splice(Math.max(n.integerLen,s));for(let d=s;d<r.length;d++)r[d]=0}else{i=Math.max(0,i),n.integerLen=1,r.length=Math.max(1,s=o+1),r[0]=0;for(let d=1;d<s;d++)r[d]=0}if(a>=5)if(s-1<0){for(let d=0;d>s;d--)r.unshift(0),n.integerLen++;r.unshift(1),n.integerLen++}else r[s-1]++;for(;i<Math.max(0,o);i++)r.push(0);let c=o!==0,l=e+n.integerLen,u=r.reduceRight(function(d,f,p,m){return f=f+d,m[p]=f<10?f:f-10,c&&(m[p]===0&&p>=l?m.pop():c=!1),f>=10?1:0},0);u&&(r.unshift(u),n.integerLen++)}function Pm(n){let e=parseInt(n);if(isNaN(e))throw new E(2305,!1);return e}function QD(n,e){return new E(2100,!1)}var GR="mediumDate",XD=new v(""),JD=new v(""),Bm=(()=>{class n{locale;defaultTimezone;defaultOptions;constructor(t,r,i){this.locale=t,this.defaultTimezone=r,this.defaultOptions=i}transform(t,r,i,o){if(t==null||t===""||t!==t)return null;try{let s=r??this.defaultOptions?.dateFormat??GR,a=i??this.defaultOptions?.timezone??this.defaultTimezone??void 0;return qD(t,s,o||this.locale,a)}catch(s){throw QD(n,s.message)}}static \u0275fac=function(r){return new(r||n)(Xn(Jo,16),Xn(XD,24),Xn(JD,24))};static \u0275pipe=wa({name:"date",type:n,pure:!0})}return n})();var jm=(()=>{class n{transform(t){return JSON.stringify(t,null,2)}static \u0275fac=function(r){return new(r||n)};static \u0275pipe=wa({name:"json",type:n,pure:!1})}return n})();var Vm=(()=>{class n{_locale;constructor(t){this._locale=t}transform(t,r,i){if(!qR(t))return null;i||=this._locale;try{let o=KR(t);return YD(o,i,r)}catch(o){throw QD(n,o.message)}}static \u0275fac=function(r){return new(r||n)(Xn(Jo,16))};static \u0275pipe=wa({name:"number",type:n,pure:!0})}return n})();function qR(n){return!(n==null||n===""||n!==n)}function KR(n){if(typeof n=="string"&&!isNaN(Number(n)-parseFloat(n)))return Number(n);if(typeof n!="number")throw new E(2309,!1);return n}var Qu=(()=>{class n{static \u0275fac=function(r){return new(r||n)};static \u0275mod=Rt({type:n});static \u0275inj=mt({})}return n})();function Um(n,e){e=encodeURIComponent(e);for(let t of n.split(";")){let r=t.indexOf("="),[i,o]=r==-1?[t,""]:[t.slice(0,r),t.slice(r+1)];if(i.trim()===e)return decodeURIComponent(o)}return null}var Oa=class{};var $m="browser";function eE(n){return n===$m}var Pa=class{_doc;constructor(e){this._doc=e}manager},Xu=(()=>{class n extends Pa{constructor(t){super(t)}supports(t){return!0}addEventListener(t,r,i,o){return t.addEventListener(r,i,o),()=>this.removeEventListener(t,r,i,o)}removeEventListener(t,r,i,o){return t.removeEventListener(r,i,o)}static \u0275fac=function(r){return new(r||n)(B(pe))};static \u0275prov=C({token:n,factory:n.\u0275fac})}return n})(),td=new v(""),Gm=(()=>{class n{_zone;_plugins;_eventNameToPlugin=new Map;constructor(t,r){this._zone=r,t.forEach(s=>{s.manager=this});let i=t.filter(s=>!(s instanceof Xu));this._plugins=i.slice().reverse();let o=t.find(s=>s instanceof Xu);o&&this._plugins.push(o)}addEventListener(t,r,i,o){return this._findPluginFor(r).addEventListener(t,r,i,o)}getZone(){return this._zone}_findPluginFor(t){let r=this._eventNameToPlugin.get(t);if(r)return r;if(r=this._plugins.find(o=>o.supports(t)),!r)throw new E(5101,!1);return this._eventNameToPlugin.set(t,r),r}static \u0275fac=function(r){return new(r||n)(B(td),B(Z))};static \u0275prov=C({token:n,factory:n.\u0275fac})}return n})(),Hm="ng-app-id";function tE(n){for(let e of n)e.remove()}function nE(n,e){let t=e.createElement("style");return t.textContent=n,t}function XR(n,e,t,r){let i=n.head?.querySelectorAll(`style[${Hm}="${e}"],link[${Hm}="${e}"]`);if(i)for(let o of i)o.removeAttribute(Hm),o instanceof HTMLLinkElement?r.set(o.href.slice(o.href.lastIndexOf("/")+1),{usage:0,elements:[o]}):o.textContent&&t.set(o.textContent,{usage:0,elements:[o]})}function Wm(n,e){let t=e.createElement("link");return t.setAttribute("rel","stylesheet"),t.setAttribute("href",n),t}var qm=(()=>{class n{doc;appId;nonce;inline=new Map;external=new Map;hosts=new Set;constructor(t,r,i,o={}){this.doc=t,this.appId=r,this.nonce=i,XR(t,r,this.inline,this.external),this.hosts.add(t.head)}addStyles(t,r){for(let i of t)this.addUsage(i,this.inline,nE);r?.forEach(i=>this.addUsage(i,this.external,Wm))}removeStyles(t,r){for(let i of t)this.removeUsage(i,this.inline);r?.forEach(i=>this.removeUsage(i,this.external))}addUsage(t,r,i){let o=r.get(t);o?o.usage++:r.set(t,{usage:1,elements:[...this.hosts].map(s=>this.addElement(s,i(t,this.doc)))})}removeUsage(t,r){let i=r.get(t);i&&(i.usage--,i.usage<=0&&(tE(i.elements),r.delete(t)))}ngOnDestroy(){for(let[,{elements:t}]of[...this.inline,...this.external])tE(t);this.hosts.clear()}addHost(t){this.hosts.add(t);for(let[r,{elements:i}]of this.inline)i.push(this.addElement(t,nE(r,this.doc)));for(let[r,{elements:i}]of this.external)i.push(this.addElement(t,Wm(r,this.doc)))}removeHost(t){this.hosts.delete(t)}addElement(t,r){return this.nonce&&r.setAttribute("nonce",this.nonce),t.appendChild(r)}static \u0275fac=function(r){return new(r||n)(B(pe),B(qo),B(Ko,8),B(Hi))};static \u0275prov=C({token:n,factory:n.\u0275fac})}return n})(),zm={svg:"http://www.w3.org/2000/svg",xhtml:"http://www.w3.org/1999/xhtml",xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace",xmlns:"http://www.w3.org/2000/xmlns/",math:"http://www.w3.org/1998/Math/MathML"},Km=/%COMP%/g;var iE="%COMP%",JR=`_nghost-${iE}`,eA=`_ngcontent-${iE}`,tA=!0,nA=new v("",{factory:()=>tA});function rA(n){return eA.replace(Km,n)}function iA(n){return JR.replace(Km,n)}function oE(n,e){return e.map(t=>t.replace(Km,n))}var Zm=(()=>{class n{eventManager;sharedStylesHost;appId;removeStylesOnCompDestroy;doc;ngZone;nonce;tracingService;rendererByCompId=new Map;defaultRenderer;constructor(t,r,i,o,s,a,c=null,l=null){this.eventManager=t,this.sharedStylesHost=r,this.appId=i,this.removeStylesOnCompDestroy=o,this.doc=s,this.ngZone=a,this.nonce=c,this.tracingService=l,this.defaultRenderer=new La(t,s,a,this.tracingService)}createRenderer(t,r){if(!t||!r)return this.defaultRenderer;let i=this.getOrCreateRenderer(t,r);return i instanceof ed?i.applyToHost(t):i instanceof Fa&&i.applyStyles(),i}getOrCreateRenderer(t,r){let i=this.rendererByCompId,o=i.get(r.id);if(!o){let s=this.doc,a=this.ngZone,c=this.eventManager,l=this.sharedStylesHost,u=this.removeStylesOnCompDestroy,d=this.tracingService;switch(r.encapsulation){case kn.Emulated:o=new ed(c,l,r,this.appId,u,s,a,d);break;case kn.ShadowDom:return new Ju(c,t,r,s,a,this.nonce,d,l);case kn.ExperimentalIsolatedShadowDom:return new Ju(c,t,r,s,a,this.nonce,d);default:o=new Fa(c,l,r,u,s,a,d);break}i.set(r.id,o)}return o}ngOnDestroy(){this.rendererByCompId.clear()}componentReplaced(t){this.rendererByCompId.delete(t)}static \u0275fac=function(r){return new(r||n)(B(Gm),B(qm),B(qo),B(nA),B(pe),B(Z),B(Ko),B(ti,8))};static \u0275prov=C({token:n,factory:n.\u0275fac})}return n})(),La=class{eventManager;doc;ngZone;tracingService;data=Object.create(null);throwOnSyntheticProps=!0;constructor(e,t,r,i){this.eventManager=e,this.doc=t,this.ngZone=r,this.tracingService=i}destroy(){}destroyNode=null;createElement(e,t){return t?this.doc.createElementNS(zm[t]||t,e):this.doc.createElement(e)}createComment(e){return this.doc.createComment(e)}createText(e){return this.doc.createTextNode(e)}appendChild(e,t){(rE(e)?e.content:e).appendChild(t)}insertBefore(e,t,r){e&&(rE(e)?e.content:e).insertBefore(t,r)}removeChild(e,t){t.remove()}selectRootElement(e,t){let r=typeof e=="string"?this.doc.querySelector(e):e;if(!r)throw new E(-5104,!1);return t||(r.textContent=""),r}parentNode(e){return e.parentNode}nextSibling(e){return e.nextSibling}setAttribute(e,t,r,i){if(i){t=i+":"+t;let o=zm[i];o?e.setAttributeNS(o,t,r):e.setAttribute(t,r)}else e.setAttribute(t,r)}removeAttribute(e,t,r){if(r){let i=zm[r];i?e.removeAttributeNS(i,t):e.removeAttribute(`${r}:${t}`)}else e.removeAttribute(t)}addClass(e,t){e.classList.add(t)}removeClass(e,t){e.classList.remove(t)}setStyle(e,t,r,i){i&(Qn.DashCase|Qn.Important)?e.style.setProperty(t,r,i&Qn.Important?"important":""):e.style[t]=r}removeStyle(e,t,r){r&Qn.DashCase?e.style.removeProperty(t):e.style[t]=""}setProperty(e,t,r){e!=null&&(e[t]=r)}setValue(e,t){e.nodeValue=t}listen(e,t,r,i){if(typeof e=="string"&&(e=Tr().getGlobalEventTarget(this.doc,e),!e))throw new E(5102,!1);let o=this.decoratePreventDefault(r);return this.tracingService?.wrapEventListener&&(o=this.tracingService.wrapEventListener(e,t,o)),this.eventManager.addEventListener(e,t,o,i)}decoratePreventDefault(e){return t=>{if(t==="__ngUnwrap__")return e;e(t)===!1&&t.preventDefault()}}};function rE(n){return n.tagName==="TEMPLATE"&&n.content!==void 0}var Ju=class extends La{hostEl;sharedStylesHost;shadowRoot;constructor(e,t,r,i,o,s,a,c){super(e,i,o,a),this.hostEl=t,this.sharedStylesHost=c,this.shadowRoot=t.attachShadow({mode:"open"}),this.sharedStylesHost&&this.sharedStylesHost.addHost(this.shadowRoot);let l=r.styles;l=oE(r.id,l);for(let d of l){let f=document.createElement("style");s&&f.setAttribute("nonce",s),f.textContent=d,this.shadowRoot.appendChild(f)}let u=r.getExternalStyles?.();if(u)for(let d of u){let f=Wm(d,i);s&&f.setAttribute("nonce",s),this.shadowRoot.appendChild(f)}}nodeOrShadowRoot(e){return e===this.hostEl?this.shadowRoot:e}appendChild(e,t){return super.appendChild(this.nodeOrShadowRoot(e),t)}insertBefore(e,t,r){return super.insertBefore(this.nodeOrShadowRoot(e),t,r)}removeChild(e,t){return super.removeChild(null,t)}parentNode(e){return this.nodeOrShadowRoot(super.parentNode(this.nodeOrShadowRoot(e)))}destroy(){this.sharedStylesHost&&this.sharedStylesHost.removeHost(this.shadowRoot)}},Fa=class extends La{sharedStylesHost;removeStylesOnCompDestroy;styles;styleUrls;constructor(e,t,r,i,o,s,a,c){super(e,o,s,a),this.sharedStylesHost=t,this.removeStylesOnCompDestroy=i;let l=r.styles;this.styles=c?oE(c,l):l,this.styleUrls=r.getExternalStyles?.(c)}applyStyles(){this.sharedStylesHost.addStyles(this.styles,this.styleUrls)}destroy(){this.removeStylesOnCompDestroy&&Vi.size===0&&this.sharedStylesHost.removeStyles(this.styles,this.styleUrls)}},ed=class extends Fa{contentAttr;hostAttr;constructor(e,t,r,i,o,s,a,c){let l=i+"-"+r.id;super(e,t,r,o,s,a,c,l),this.contentAttr=rA(l),this.hostAttr=iA(l)}applyToHost(e){this.applyStyles(),this.setAttribute(e,this.hostAttr,"")}createElement(e,t){let r=super.createElement(e,t);return super.setAttribute(r,this.contentAttr,""),r}};var nd=class n extends xa{supportsDOMEvents=!0;static makeCurrent(){xm(new n)}onAndCancel(e,t,r,i){return e.addEventListener(t,r,i),()=>{e.removeEventListener(t,r,i)}}dispatchEvent(e,t){e.dispatchEvent(t)}remove(e){e.remove()}createElement(e,t){return t=t||this.getDefaultDocument(),t.createElement(e)}createHtmlDocument(){return document.implementation.createHTMLDocument("fakeTitle")}getDefaultDocument(){return document}isElementNode(e){return e.nodeType===Node.ELEMENT_NODE}isShadowRoot(e){return e instanceof DocumentFragment}getGlobalEventTarget(e,t){return t==="window"?window:t==="document"?e:t==="body"?e.body:null}getBaseHref(e){let t=oA();return t==null?null:sA(t)}resetBaseElement(){Ba=null}getUserAgent(){return window.navigator.userAgent}getCookie(e){return Um(document.cookie,e)}},Ba=null;function oA(){return Ba=Ba||document.head.querySelector("base"),Ba?Ba.getAttribute("href"):null}function sA(n){return new URL(n,document.baseURI).pathname}var aA=(()=>{class n{build(){return new XMLHttpRequest}static \u0275fac=function(r){return new(r||n)};static \u0275prov=C({token:n,factory:n.\u0275fac})}return n})(),sE=["alt","control","meta","shift"],cA={"\b":"Backspace","	":"Tab","\x7F":"Delete","\x1B":"Escape",Del:"Delete",Esc:"Escape",Left:"ArrowLeft",Right:"ArrowRight",Up:"ArrowUp",Down:"ArrowDown",Menu:"ContextMenu",Scroll:"ScrollLock",Win:"OS"},lA={alt:n=>n.altKey,control:n=>n.ctrlKey,meta:n=>n.metaKey,shift:n=>n.shiftKey},aE=(()=>{class n extends Pa{constructor(t){super(t)}supports(t){return n.parseEventName(t)!=null}addEventListener(t,r,i,o){let s=n.parseEventName(r),a=n.eventCallback(s.fullKey,i,this.manager.getZone());return this.manager.getZone().runOutsideAngular(()=>Tr().onAndCancel(t,s.domEventName,a,o))}static parseEventName(t){let r=t.toLowerCase().split("."),i=r.shift();if(r.length===0||!(i==="keydown"||i==="keyup"))return null;let o=n._normalizeKey(r.pop()),s="",a=r.indexOf("code");if(a>-1&&(r.splice(a,1),s="code."),sE.forEach(l=>{let u=r.indexOf(l);u>-1&&(r.splice(u,1),s+=l+".")}),s+=o,r.length!=0||o.length===0)return null;let c={};return c.domEventName=i,c.fullKey=s,c}static matchEventFullKeyCode(t,r){let i=cA[t.key]||t.key,o="";return r.indexOf("code.")>-1&&(i=t.code,o="code."),i==null||!i?!1:(i=i.toLowerCase(),i===" "?i="space":i==="."&&(i="dot"),sE.forEach(s=>{if(s!==i){let a=lA[s];a(t)&&(o+=s+".")}}),o+=i,o===r)}static eventCallback(t,r,i){return o=>{n.matchEventFullKeyCode(o,t)&&i.runGuarded(()=>r(o))}}static _normalizeKey(t){return t==="esc"?"escape":t}static \u0275fac=function(r){return new(r||n)(B(pe))};static \u0275prov=C({token:n,factory:n.\u0275fac})}return n})();async function Ym(n,e,t){let r=g({rootComponent:n},uA(e,t));return RD(r)}function uA(n,e){return{platformRef:e?.platformRef,appProviders:[...mA,...n?.providers??[]],platformProviders:hA}}function dA(){nd.makeCurrent()}function fA(){return new nn}function pA(){return Zh(document),document}var hA=[{provide:Hi,useValue:$m},{provide:mu,useValue:dA,multi:!0},{provide:pe,useFactory:pA}];var mA=[{provide:ra,useValue:"root"},{provide:nn,useFactory:fA},{provide:td,useClass:Xu,multi:!0},{provide:td,useClass:aE,multi:!0},Zm,qm,Gm,{provide:un,useExisting:Zm},{provide:Oa,useClass:aA},[]];var cE=(()=>{class n{_doc;constructor(t){this._doc=t}getTitle(){return this._doc.title}setTitle(t){this._doc.title=t||""}static \u0275fac=function(r){return new(r||n)(B(pe))};static \u0275prov=C({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})();var j="primary",Xa=Symbol("RouteTitle"),tg=class{params;constructor(e){this.params=e||{}}has(e){return Object.prototype.hasOwnProperty.call(this.params,e)}get(e){if(this.has(e)){let t=this.params[e];return Array.isArray(t)?t[0]:t}return null}getAll(e){if(this.has(e)){let t=this.params[e];return Array.isArray(t)?t:[t]}return[]}get keys(){return Object.keys(this.params)}};function Ji(n){return new tg(n)}function Qm(n,e,t){for(let r=0;r<n.length;r++){let i=n[r],o=e[r];if(i[0]===":")t[i.substring(1)]=o;else if(i!==o.path)return!1}return!0}function gE(n,e,t){let r=t.path.split("/"),i=r.indexOf("**");if(i===-1){if(r.length>n.length||t.pathMatch==="full"&&(e.hasChildren()||r.length<n.length))return null;let c={},l=n.slice(0,r.length);return Qm(r,l,c)?{consumed:l,posParams:c}:null}if(i!==r.lastIndexOf("**"))return null;let o=r.slice(0,i),s=r.slice(i+1);if(o.length+s.length>n.length||t.pathMatch==="full"&&e.hasChildren()&&t.path!=="**")return null;let a={};return!Qm(o,n.slice(0,o.length),a)||!Qm(s,n.slice(n.length-s.length),a)?null:{consumed:n,posParams:a}}function cd(n){return new Promise((e,t)=>{n.pipe(ur()).subscribe({next:r=>e(r),error:r=>t(r)})})}function yA(n,e){if(n.length!==e.length)return!1;for(let t=0;t<n.length;++t)if(!nr(n[t],e[t]))return!1;return!0}function nr(n,e){let t=n?ng(n):void 0,r=e?ng(e):void 0;if(!t||!r||t.length!=r.length)return!1;let i;for(let o=0;o<t.length;o++)if(i=t[o],!yE(n[i],e[i]))return!1;return!0}function ng(n){return[...Object.keys(n),...Object.getOwnPropertySymbols(n)]}function yE(n,e){if(Array.isArray(n)&&Array.isArray(e)){if(n.length!==e.length)return!1;let t=[...n].sort(),r=[...e].sort();return t.every((i,o)=>r[o]===i)}else return n===e}function vA(n){return n.length>0?n[n.length-1]:null}function no(n){return Wt(n)?n:Yo(n)?Ne(Promise.resolve(n)):T(n)}function vE(n){return Wt(n)?cd(n):Promise.resolve(n)}var bA={exact:_E,subset:DE},bE={exact:CA,subset:_A,ignored:()=>!0},CE={paths:"exact",fragment:"ignored",matrixParams:"ignored",queryParams:"exact"},rg={paths:"subset",fragment:"ignored",matrixParams:"ignored",queryParams:"subset"};function lE(n,e,t){return bA[t.paths](n.root,e.root,t.matrixParams)&&bE[t.queryParams](n.queryParams,e.queryParams)&&!(t.fragment==="exact"&&n.fragment!==e.fragment)}function CA(n,e){return nr(n,e)}function _E(n,e,t){if(!Xi(n.segments,e.segments)||!od(n.segments,e.segments,t)||n.numberOfChildren!==e.numberOfChildren)return!1;for(let r in e.children)if(!n.children[r]||!_E(n.children[r],e.children[r],t))return!1;return!0}function _A(n,e){return Object.keys(e).length<=Object.keys(n).length&&Object.keys(e).every(t=>yE(n[t],e[t]))}function DE(n,e,t){return EE(n,e,e.segments,t)}function EE(n,e,t,r){if(n.segments.length>t.length){let i=n.segments.slice(0,t.length);return!(!Xi(i,t)||e.hasChildren()||!od(i,t,r))}else if(n.segments.length===t.length){if(!Xi(n.segments,t)||!od(n.segments,t,r))return!1;for(let i in e.children)if(!n.children[i]||!DE(n.children[i],e.children[i],r))return!1;return!0}else{let i=t.slice(0,n.segments.length),o=t.slice(n.segments.length);return!Xi(n.segments,i)||!od(n.segments,i,r)||!n.children[j]?!1:EE(n.children[j],e,o,r)}}function od(n,e,t){return e.every((r,i)=>bE[t](n[i].parameters,r.parameters))}var mn=class{root;queryParams;fragment;_queryParamMap;constructor(e=new le([],{}),t={},r=null){this.root=e,this.queryParams=t,this.fragment=r}get queryParamMap(){return this._queryParamMap??=Ji(this.queryParams),this._queryParamMap}toString(){return wA.serialize(this)}},le=class{segments;children;parent=null;constructor(e,t){this.segments=e,this.children=t,Object.values(t).forEach(r=>r.parent=this)}hasChildren(){return this.numberOfChildren>0}get numberOfChildren(){return Object.keys(this.children).length}toString(){return sd(this)}},ii=class{path;parameters;_parameterMap;constructor(e,t){this.path=e,this.parameters=t}get parameterMap(){return this._parameterMap??=Ji(this.parameters),this._parameterMap}toString(){return TE(this)}};function DA(n,e){return Xi(n,e)&&n.every((t,r)=>nr(t.parameters,e[r].parameters))}function Xi(n,e){return n.length!==e.length?!1:n.every((t,r)=>t.path===e[r].path)}function EA(n,e){let t=[];return Object.entries(n.children).forEach(([r,i])=>{r===j&&(t=t.concat(e(i,r)))}),Object.entries(n.children).forEach(([r,i])=>{r!==j&&(t=t.concat(e(i,r)))}),t}var Ja=(()=>{class n{static \u0275fac=function(r){return new(r||n)};static \u0275prov=C({token:n,factory:()=>new oi,providedIn:"root"})}return n})(),oi=class{parse(e){let t=new og(e);return new mn(t.parseRootSegment(),t.parseQueryParams(),t.parseFragment())}serialize(e){let t=`/${ja(e.root,!0)}`,r=SA(e.queryParams),i=typeof e.fragment=="string"?`#${TA(e.fragment)}`:"";return`${t}${r}${i}`}},wA=new oi;function sd(n){return n.segments.map(e=>TE(e)).join("/")}function ja(n,e){if(!n.hasChildren())return sd(n);if(e){let t=n.children[j]?ja(n.children[j],!1):"",r=[];return Object.entries(n.children).forEach(([i,o])=>{i!==j&&r.push(`${i}:${ja(o,!1)}`)}),r.length>0?`${t}(${r.join("//")})`:t}else{let t=EA(n,(r,i)=>i===j?[ja(n.children[j],!1)]:[`${i}:${ja(r,!1)}`]);return Object.keys(n.children).length===1&&n.children[j]!=null?`${sd(n)}/${t[0]}`:`${sd(n)}/(${t.join("//")})`}}function wE(n){return encodeURIComponent(n).replace(/%40/g,"@").replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",")}function rd(n){return wE(n).replace(/%3B/gi,";")}function TA(n){return encodeURI(n)}function ig(n){return wE(n).replace(/\(/g,"%28").replace(/\)/g,"%29").replace(/%26/gi,"&")}function ad(n){return decodeURIComponent(n)}function uE(n){return ad(n.replace(/\+/g,"%20"))}function TE(n){return`${ig(n.path)}${IA(n.parameters)}`}function IA(n){return Object.entries(n).map(([e,t])=>`;${ig(e)}=${ig(t)}`).join("")}function SA(n){let e=Object.entries(n).map(([t,r])=>Array.isArray(r)?r.map(i=>`${rd(t)}=${rd(i)}`).join("&"):`${rd(t)}=${rd(r)}`).filter(t=>t);return e.length?`?${e.join("&")}`:""}var MA=/^[^\/()?;#]+/;function Xm(n){let e=n.match(MA);return e?e[0]:""}var xA=/^[^\/()?;=#]+/;function RA(n){let e=n.match(xA);return e?e[0]:""}var AA=/^[^=?&#]+/;function kA(n){let e=n.match(AA);return e?e[0]:""}var NA=/^[^&#]+/;function OA(n){let e=n.match(NA);return e?e[0]:""}var og=class{url;remaining;constructor(e){this.url=e,this.remaining=e}parseRootSegment(){for(;this.consumeOptional("/"););return this.remaining===""||this.peekStartsWith("?")||this.peekStartsWith("#")?new le([],{}):new le([],this.parseChildren())}parseQueryParams(){let e={};if(this.consumeOptional("?"))do this.parseQueryParam(e);while(this.consumeOptional("&"));return e}parseFragment(){return this.consumeOptional("#")?decodeURIComponent(this.remaining):null}parseChildren(e=0){if(e>50)throw new E(4010,!1);if(this.remaining==="")return{};this.consumeOptional("/");let t=[];for(this.peekStartsWith("(")||t.push(this.parseSegment());this.peekStartsWith("/")&&!this.peekStartsWith("//")&&!this.peekStartsWith("/(");)this.capture("/"),t.push(this.parseSegment());let r={};this.peekStartsWith("/(")&&(this.capture("/"),r=this.parseParens(!0,e));let i={};return this.peekStartsWith("(")&&(i=this.parseParens(!1,e)),(t.length>0||Object.keys(r).length>0)&&(i[j]=new le(t,r)),i}parseSegment(){let e=Xm(this.remaining);if(e===""&&this.peekStartsWith(";"))throw new E(4009,!1);return this.capture(e),new ii(ad(e),this.parseMatrixParams())}parseMatrixParams(){let e={};for(;this.consumeOptional(";");)this.parseParam(e);return e}parseParam(e){let t=RA(this.remaining);if(!t)return;this.capture(t);let r="";if(this.consumeOptional("=")){let i=Xm(this.remaining);i&&(r=i,this.capture(r))}e[ad(t)]=ad(r)}parseQueryParam(e){let t=kA(this.remaining);if(!t)return;this.capture(t);let r="";if(this.consumeOptional("=")){let s=OA(this.remaining);s&&(r=s,this.capture(r))}let i=uE(t),o=uE(r);if(e.hasOwnProperty(i)){let s=e[i];Array.isArray(s)||(s=[s],e[i]=s),s.push(o)}else e[i]=o}parseParens(e,t){let r={};for(this.capture("(");!this.consumeOptional(")")&&this.remaining.length>0;){let i=Xm(this.remaining),o=this.remaining[i.length];if(o!=="/"&&o!==")"&&o!==";")throw new E(4010,!1);let s;i.indexOf(":")>-1?(s=i.slice(0,i.indexOf(":")),this.capture(s),this.capture(":")):e&&(s=j);let a=this.parseChildren(t+1);r[s??j]=Object.keys(a).length===1&&a[j]?a[j]:new le([],a),this.consumeOptional("//")}return r}peekStartsWith(e){return this.remaining.startsWith(e)}consumeOptional(e){return this.peekStartsWith(e)?(this.remaining=this.remaining.substring(e.length),!0):!1}capture(e){if(!this.consumeOptional(e))throw new E(4011,!1)}};function IE(n){return n.segments.length>0?new le([],{[j]:n}):n}function SE(n){let e={};for(let[r,i]of Object.entries(n.children)){let o=SE(i);if(r===j&&o.segments.length===0&&o.hasChildren())for(let[s,a]of Object.entries(o.children))e[s]=a;else(o.segments.length>0||o.hasChildren())&&(e[r]=o)}let t=new le(n.segments,e);return PA(t)}function PA(n){if(n.numberOfChildren===1&&n.children[j]){let e=n.children[j];return new le(n.segments.concat(e.segments),e.children)}return n}function is(n){return n instanceof mn}function ME(n,e,t=null,r=null,i=new oi){let o=xE(n);return RE(o,e,t,r,i)}function xE(n){let e;function t(o){let s={};for(let c of o.children){let l=t(c);s[c.outlet]=l}let a=new le(o.url,s);return o===n&&(e=a),a}let r=t(n.root),i=IE(r);return e??i}function RE(n,e,t,r,i){let o=n;for(;o.parent;)o=o.parent;if(e.length===0)return Jm(o,o,o,t,r,i);let s=LA(e);if(s.toRoot())return Jm(o,o,new le([],{}),t,r,i);let a=FA(s,o,n),c=a.processChildren?Ua(a.segmentGroup,a.index,s.commands):kE(a.segmentGroup,a.index,s.commands);return Jm(o,a.segmentGroup,c,t,r,i)}function ld(n){return typeof n=="object"&&n!=null&&!n.outlets&&!n.segmentPath}function za(n){return typeof n=="object"&&n!=null&&n.outlets}function dE(n,e,t){n||="\u0275";let r=new mn;return r.queryParams={[n]:e},t.parse(t.serialize(r)).queryParams[n]}function Jm(n,e,t,r,i,o){let s={};for(let[l,u]of Object.entries(r??{}))s[l]=Array.isArray(u)?u.map(d=>dE(l,d,o)):dE(l,u,o);let a;n===e?a=t:a=AE(n,e,t);let c=IE(SE(a));return new mn(c,s,i)}function AE(n,e,t){let r={};return Object.entries(n.children).forEach(([i,o])=>{o===e?r[i]=t:r[i]=AE(o,e,t)}),new le(n.segments,r)}var ud=class{isAbsolute;numberOfDoubleDots;commands;constructor(e,t,r){if(this.isAbsolute=e,this.numberOfDoubleDots=t,this.commands=r,e&&r.length>0&&ld(r[0]))throw new E(4003,!1);let i=r.find(za);if(i&&i!==vA(r))throw new E(4004,!1)}toRoot(){return this.isAbsolute&&this.commands.length===1&&this.commands[0]=="/"}};function LA(n){if(typeof n[0]=="string"&&n.length===1&&n[0]==="/")return new ud(!0,0,n);let e=0,t=!1,r=n.reduce((i,o,s)=>{if(typeof o=="object"&&o!=null){if(o.outlets){let a={};return Object.entries(o.outlets).forEach(([c,l])=>{a[c]=typeof l=="string"?l.split("/"):l}),[...i,{outlets:a}]}if(o.segmentPath)return[...i,o.segmentPath]}return typeof o!="string"?[...i,o]:s===0?(o.split("/").forEach((a,c)=>{c==0&&a==="."||(c==0&&a===""?t=!0:a===".."?e++:a!=""&&i.push(a))}),i):[...i,o]},[]);return new ud(t,e,r)}var ns=class{segmentGroup;processChildren;index;constructor(e,t,r){this.segmentGroup=e,this.processChildren=t,this.index=r}};function FA(n,e,t){if(n.isAbsolute)return new ns(e,!0,0);if(!t)return new ns(e,!1,NaN);if(t.parent===null)return new ns(t,!0,0);let r=ld(n.commands[0])?0:1,i=t.segments.length-1+r;return BA(t,i,n.numberOfDoubleDots)}function BA(n,e,t){let r=n,i=e,o=t;for(;o>i;){if(o-=i,r=r.parent,!r)throw new E(4005,!1);i=r.segments.length}return new ns(r,!1,i-o)}function jA(n){return za(n[0])?n[0].outlets:{[j]:n}}function kE(n,e,t){if(n??=new le([],{}),n.segments.length===0&&n.hasChildren())return Ua(n,e,t);let r=VA(n,e,t),i=t.slice(r.commandIndex);if(r.match&&r.pathIndex<n.segments.length){let o=new le(n.segments.slice(0,r.pathIndex),{});return o.children[j]=new le(n.segments.slice(r.pathIndex),n.children),Ua(o,0,i)}else return r.match&&i.length===0?new le(n.segments,{}):r.match&&!n.hasChildren()?sg(n,e,t):r.match?Ua(n,0,i):sg(n,e,t)}function Ua(n,e,t){if(t.length===0)return new le(n.segments,{});{let r=jA(t),i={};if(Object.keys(r).some(o=>o!==j)&&n.children[j]&&n.numberOfChildren===1&&n.children[j].segments.length===0){let o=Ua(n.children[j],e,t);return new le(n.segments,o.children)}return Object.entries(r).forEach(([o,s])=>{typeof s=="string"&&(s=[s]),s!==null&&(i[o]=kE(n.children[o],e,s))}),Object.entries(n.children).forEach(([o,s])=>{r[o]===void 0&&(i[o]=s)}),new le(n.segments,i)}}function VA(n,e,t){let r=0,i=e,o={match:!1,pathIndex:0,commandIndex:0};for(;i<n.segments.length;){if(r>=t.length)return o;let s=n.segments[i],a=t[r];if(za(a))break;let c=`${a}`,l=r<t.length-1?t[r+1]:null;if(i>0&&c===void 0)break;if(c&&l&&typeof l=="object"&&l.outlets===void 0){if(!pE(c,l,s))return o;r+=2}else{if(!pE(c,{},s))return o;r++}i++}return{match:!0,pathIndex:i,commandIndex:r}}function sg(n,e,t){let r=n.segments.slice(0,e),i=0;for(;i<t.length;){let o=t[i];if(za(o)){let c=UA(o.outlets);return new le(r,c)}if(i===0&&ld(t[0])){let c=n.segments[e];r.push(new ii(c.path,fE(t[0]))),i++;continue}let s=za(o)?o.outlets[j]:`${o}`,a=i<t.length-1?t[i+1]:null;s&&a&&ld(a)?(r.push(new ii(s,fE(a))),i+=2):(r.push(new ii(s,{})),i++)}return new le(r,{})}function UA(n){let e={};return Object.entries(n).forEach(([t,r])=>{typeof r=="string"&&(r=[r]),r!==null&&(e[t]=sg(new le([],{}),0,r))}),e}function fE(n){let e={};return Object.entries(n).forEach(([t,r])=>e[t]=`${r}`),e}function pE(n,e,t){return n==t.path&&nr(e,t.parameters)}var $a="imperative",Ze=(function(n){return n[n.NavigationStart=0]="NavigationStart",n[n.NavigationEnd=1]="NavigationEnd",n[n.NavigationCancel=2]="NavigationCancel",n[n.NavigationError=3]="NavigationError",n[n.RoutesRecognized=4]="RoutesRecognized",n[n.ResolveStart=5]="ResolveStart",n[n.ResolveEnd=6]="ResolveEnd",n[n.GuardsCheckStart=7]="GuardsCheckStart",n[n.GuardsCheckEnd=8]="GuardsCheckEnd",n[n.RouteConfigLoadStart=9]="RouteConfigLoadStart",n[n.RouteConfigLoadEnd=10]="RouteConfigLoadEnd",n[n.ChildActivationStart=11]="ChildActivationStart",n[n.ChildActivationEnd=12]="ChildActivationEnd",n[n.ActivationStart=13]="ActivationStart",n[n.ActivationEnd=14]="ActivationEnd",n[n.Scroll=15]="Scroll",n[n.NavigationSkipped=16]="NavigationSkipped",n})(Ze||{}),Qt=class{id;url;constructor(e,t){this.id=e,this.url=t}},eo=class extends Qt{type=Ze.NavigationStart;navigationTrigger;restoredState;constructor(e,t,r="imperative",i=null){super(e,t),this.navigationTrigger=r,this.restoredState=i}toString(){return`NavigationStart(id: ${this.id}, url: '${this.url}')`}},Mr=class extends Qt{urlAfterRedirects;type=Ze.NavigationEnd;constructor(e,t,r){super(e,t),this.urlAfterRedirects=r}toString(){return`NavigationEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}')`}},lt=(function(n){return n[n.Redirect=0]="Redirect",n[n.SupersededByNewNavigation=1]="SupersededByNewNavigation",n[n.NoDataFromResolver=2]="NoDataFromResolver",n[n.GuardRejected=3]="GuardRejected",n[n.Aborted=4]="Aborted",n})(lt||{}),Wa=(function(n){return n[n.IgnoredSameUrlNavigation=0]="IgnoredSameUrlNavigation",n[n.IgnoredByUrlHandlingStrategy=1]="IgnoredByUrlHandlingStrategy",n})(Wa||{}),hn=class extends Qt{reason;code;type=Ze.NavigationCancel;constructor(e,t,r,i){super(e,t),this.reason=r,this.code=i}toString(){return`NavigationCancel(id: ${this.id}, url: '${this.url}')`}};function NE(n){return n instanceof hn&&(n.code===lt.Redirect||n.code===lt.SupersededByNewNavigation)}var xr=class extends Qt{reason;code;type=Ze.NavigationSkipped;constructor(e,t,r,i){super(e,t),this.reason=r,this.code=i}},to=class extends Qt{error;target;type=Ze.NavigationError;constructor(e,t,r,i){super(e,t),this.error=r,this.target=i}toString(){return`NavigationError(id: ${this.id}, url: '${this.url}', error: ${this.error})`}},Ga=class extends Qt{urlAfterRedirects;state;type=Ze.RoutesRecognized;constructor(e,t,r,i){super(e,t),this.urlAfterRedirects=r,this.state=i}toString(){return`RoutesRecognized(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`}},dd=class extends Qt{urlAfterRedirects;state;type=Ze.GuardsCheckStart;constructor(e,t,r,i){super(e,t),this.urlAfterRedirects=r,this.state=i}toString(){return`GuardsCheckStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`}},fd=class extends Qt{urlAfterRedirects;state;shouldActivate;type=Ze.GuardsCheckEnd;constructor(e,t,r,i,o){super(e,t),this.urlAfterRedirects=r,this.state=i,this.shouldActivate=o}toString(){return`GuardsCheckEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state}, shouldActivate: ${this.shouldActivate})`}},pd=class extends Qt{urlAfterRedirects;state;type=Ze.ResolveStart;constructor(e,t,r,i){super(e,t),this.urlAfterRedirects=r,this.state=i}toString(){return`ResolveStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`}},hd=class extends Qt{urlAfterRedirects;state;type=Ze.ResolveEnd;constructor(e,t,r,i){super(e,t),this.urlAfterRedirects=r,this.state=i}toString(){return`ResolveEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`}},md=class{route;type=Ze.RouteConfigLoadStart;constructor(e){this.route=e}toString(){return`RouteConfigLoadStart(path: ${this.route.path})`}},gd=class{route;type=Ze.RouteConfigLoadEnd;constructor(e){this.route=e}toString(){return`RouteConfigLoadEnd(path: ${this.route.path})`}},yd=class{snapshot;type=Ze.ChildActivationStart;constructor(e){this.snapshot=e}toString(){return`ChildActivationStart(path: '${this.snapshot.routeConfig&&this.snapshot.routeConfig.path||""}')`}},vd=class{snapshot;type=Ze.ChildActivationEnd;constructor(e){this.snapshot=e}toString(){return`ChildActivationEnd(path: '${this.snapshot.routeConfig&&this.snapshot.routeConfig.path||""}')`}},bd=class{snapshot;type=Ze.ActivationStart;constructor(e){this.snapshot=e}toString(){return`ActivationStart(path: '${this.snapshot.routeConfig&&this.snapshot.routeConfig.path||""}')`}},Cd=class{snapshot;type=Ze.ActivationEnd;constructor(e){this.snapshot=e}toString(){return`ActivationEnd(path: '${this.snapshot.routeConfig&&this.snapshot.routeConfig.path||""}')`}};var os=class{},qa=class{},ss=class{url;navigationBehaviorOptions;constructor(e,t){this.url=e,this.navigationBehaviorOptions=t}};function $A(n){return!(n instanceof os)&&!(n instanceof ss)&&!(n instanceof qa)}var _d=class{rootInjector;outlet=null;route=null;children;attachRef=null;get injector(){return this.route?.snapshot._environmentInjector??this.rootInjector}constructor(e){this.rootInjector=e,this.children=new us(this.rootInjector)}},us=(()=>{class n{rootInjector;contexts=new Map;constructor(t){this.rootInjector=t}onChildOutletCreated(t,r){let i=this.getOrCreateContext(t);i.outlet=r,this.contexts.set(t,i)}onChildOutletDestroyed(t){let r=this.getContext(t);r&&(r.outlet=null,r.attachRef=null)}onOutletDeactivated(){let t=this.contexts;return this.contexts=new Map,t}onOutletReAttached(t){this.contexts=t}getOrCreateContext(t){let r=this.getContext(t);return r||(r=new _d(this.rootInjector),this.contexts.set(t,r)),r}getContext(t){return this.contexts.get(t)||null}static \u0275fac=function(r){return new(r||n)(B(Oe))};static \u0275prov=C({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})(),Dd=class{_root;constructor(e){this._root=e}get root(){return this._root.value}parent(e){let t=this.pathFromRoot(e);return t.length>1?t[t.length-2]:null}children(e){let t=ag(e,this._root);return t?t.children.map(r=>r.value):[]}firstChild(e){let t=ag(e,this._root);return t&&t.children.length>0?t.children[0].value:null}siblings(e){let t=cg(e,this._root);return t.length<2?[]:t[t.length-2].children.map(i=>i.value).filter(i=>i!==e)}pathFromRoot(e){return cg(e,this._root).map(t=>t.value)}};function ag(n,e){if(n===e.value)return e;for(let t of e.children){let r=ag(n,t);if(r)return r}return null}function cg(n,e){if(n===e.value)return[e];for(let t of e.children){let r=cg(n,t);if(r.length)return r.unshift(e),r}return[]}var Yt=class{value;children;constructor(e,t){this.value=e,this.children=t}toString(){return`TreeNode(${this.value})`}};function ts(n){let e={};return n&&n.children.forEach(t=>e[t.value.outlet]=t),e}var Ka=class extends Dd{snapshot;constructor(e,t){super(e),this.snapshot=t,yg(this,e)}toString(){return this.snapshot.toString()}};function OE(n,e){let t=HA(n,e),r=new ke([new ii("",{})]),i=new ke({}),o=new ke({}),s=new ke({}),a=new ke(""),c=new si(r,i,s,a,o,j,n,t.root);return c.snapshot=t.root,new Ka(new Yt(c,[]),t)}function HA(n,e){let t={},r={},i={},s=new as([],t,i,"",r,j,n,null,{},e);return new Za("",new Yt(s,[]))}var si=class{urlSubject;paramsSubject;queryParamsSubject;fragmentSubject;dataSubject;outlet;component;snapshot;_futureSnapshot;_routerState;_paramMap;_queryParamMap;title;url;params;queryParams;fragment;data;constructor(e,t,r,i,o,s,a,c){this.urlSubject=e,this.paramsSubject=t,this.queryParamsSubject=r,this.fragmentSubject=i,this.dataSubject=o,this.outlet=s,this.component=a,this._futureSnapshot=c,this.title=this.dataSubject?.pipe(te(l=>l[Xa]))??T(void 0),this.url=e,this.params=t,this.queryParams=r,this.fragment=i,this.data=o}get routeConfig(){return this._futureSnapshot.routeConfig}get root(){return this._routerState.root}get parent(){return this._routerState.parent(this)}get firstChild(){return this._routerState.firstChild(this)}get children(){return this._routerState.children(this)}get pathFromRoot(){return this._routerState.pathFromRoot(this)}get paramMap(){return this._paramMap??=this.params.pipe(te(e=>Ji(e))),this._paramMap}get queryParamMap(){return this._queryParamMap??=this.queryParams.pipe(te(e=>Ji(e))),this._queryParamMap}toString(){return this.snapshot?this.snapshot.toString():`Future(${this._futureSnapshot})`}};function gg(n,e,t="emptyOnly"){let r,{routeConfig:i}=n;return e!==null&&(t==="always"||i?.path===""||!e.component&&!e.routeConfig?.loadComponent)?r={params:g(g({},e.params),n.params),data:g(g({},e.data),n.data),resolve:g(g(g(g({},n.data),e.data),i?.data),n._resolvedData)}:r={params:g({},n.params),data:g({},n.data),resolve:g(g({},n.data),n._resolvedData??{})},i&&LE(i)&&(r.resolve[Xa]=i.title),r}var as=class{url;params;queryParams;fragment;data;outlet;component;routeConfig;_resolve;_resolvedData;_routerState;_paramMap;_queryParamMap;_environmentInjector;get title(){return this.data?.[Xa]}constructor(e,t,r,i,o,s,a,c,l,u){this.url=e,this.params=t,this.queryParams=r,this.fragment=i,this.data=o,this.outlet=s,this.component=a,this.routeConfig=c,this._resolve=l,this._environmentInjector=u}get root(){return this._routerState.root}get parent(){return this._routerState.parent(this)}get firstChild(){return this._routerState.firstChild(this)}get children(){return this._routerState.children(this)}get pathFromRoot(){return this._routerState.pathFromRoot(this)}get paramMap(){return this._paramMap??=Ji(this.params),this._paramMap}get queryParamMap(){return this._queryParamMap??=Ji(this.queryParams),this._queryParamMap}toString(){let e=this.url.map(r=>r.toString()).join("/"),t=this.routeConfig?this.routeConfig.path:"";return`Route(url:'${e}', path:'${t}')`}},Za=class extends Dd{url;constructor(e,t){super(t),this.url=e,yg(this,t)}toString(){return PE(this._root)}};function yg(n,e){e.value._routerState=n,e.children.forEach(t=>yg(n,t))}function PE(n){let e=n.children.length>0?` { ${n.children.map(PE).join(", ")} } `:"";return`${n.value}${e}`}function eg(n){if(n.snapshot){let e=n.snapshot,t=n._futureSnapshot;n.snapshot=t,nr(e.queryParams,t.queryParams)||n.queryParamsSubject.next(t.queryParams),e.fragment!==t.fragment&&n.fragmentSubject.next(t.fragment),nr(e.params,t.params)||n.paramsSubject.next(t.params),yA(e.url,t.url)||n.urlSubject.next(t.url),nr(e.data,t.data)||n.dataSubject.next(t.data)}else n.snapshot=n._futureSnapshot,n.dataSubject.next(n._futureSnapshot.data)}function lg(n,e){let t=nr(n.params,e.params)&&DA(n.url,e.url),r=!n.parent!=!e.parent;return t&&!r&&(!n.parent||lg(n.parent,e.parent))}function LE(n){return typeof n.title=="string"||n.title===null}var FE=new v(""),ec=(()=>{class n{activated=null;get activatedComponentRef(){return this.activated}_activatedRoute=null;name=j;activateEvents=new ee;deactivateEvents=new ee;attachEvents=new ee;detachEvents=new ee;routerOutletData=es();parentContexts=h(us);location=h(xt);changeDetector=h(wr);inputBinder=h(Id,{optional:!0});supportsBindingToComponentInputs=!0;ngOnChanges(t){if(t.name){let{firstChange:r,previousValue:i}=t.name;if(r)return;this.isTrackedInParentContexts(i)&&(this.deactivate(),this.parentContexts.onChildOutletDestroyed(i)),this.initializeOutletWithName()}}ngOnDestroy(){this.isTrackedInParentContexts(this.name)&&this.parentContexts.onChildOutletDestroyed(this.name),this.inputBinder?.unsubscribeFromRouteData(this)}isTrackedInParentContexts(t){return this.parentContexts.getContext(t)?.outlet===this}ngOnInit(){this.initializeOutletWithName()}initializeOutletWithName(){if(this.parentContexts.onChildOutletCreated(this.name,this),this.activated)return;let t=this.parentContexts.getContext(this.name);t?.route&&(t.attachRef?this.attach(t.attachRef,t.route):this.activateWith(t.route,t.injector))}get isActivated(){return!!this.activated}get component(){if(!this.activated)throw new E(4012,!1);return this.activated.instance}get activatedRoute(){if(!this.activated)throw new E(4012,!1);return this._activatedRoute}get activatedRouteData(){return this._activatedRoute?this._activatedRoute.snapshot.data:{}}detach(){if(!this.activated)throw new E(4012,!1);this.location.detach();let t=this.activated;return this.activated=null,this._activatedRoute=null,this.detachEvents.emit(t.instance),t}attach(t,r){this.activated=t,this._activatedRoute=r,this.location.insert(t.hostView),this.inputBinder?.bindActivatedRouteToOutletComponent(this),this.attachEvents.emit(t.instance)}deactivate(){if(this.activated){let t=this.component;this.activated.destroy(),this.activated=null,this._activatedRoute=null,this.deactivateEvents.emit(t)}}activateWith(t,r){if(this.isActivated)throw new E(4013,!1);this._activatedRoute=t;let i=this.location,s=t.snapshot.component,a=this.parentContexts.getOrCreateContext(this.name).children,c=new ug(t,a,i.injector,this.routerOutletData);this.activated=i.createComponent(s,{index:i.length,injector:c,environmentInjector:r}),this.changeDetector.markForCheck(),this.inputBinder?.bindActivatedRouteToOutletComponent(this),this.activateEvents.emit(this.activated.instance)}static \u0275fac=function(r){return new(r||n)};static \u0275dir=Ce({type:n,selectors:[["router-outlet"]],inputs:{name:"name",routerOutletData:[1,"routerOutletData"]},outputs:{activateEvents:"activate",deactivateEvents:"deactivate",attachEvents:"attach",detachEvents:"detach"},exportAs:["outlet"],features:[ei]})}return n})(),ug=class{route;childContexts;parent;outletData;constructor(e,t,r,i){this.route=e,this.childContexts=t,this.parent=r,this.outletData=i}get(e,t){return e===si?this.route:e===us?this.childContexts:e===FE?this.outletData:this.parent.get(e,t)}},Id=new v("");var vg=(()=>{class n{static \u0275fac=function(r){return new(r||n)};static \u0275cmp=Fe({type:n,selectors:[["ng-component"]],exportAs:["emptyRouterOutlet"],decls:1,vars:0,template:function(r,i){r&1&&at(0,"router-outlet")},dependencies:[ec],encapsulation:2})}return n})();function bg(n){let e=n.children&&n.children.map(bg),t=e?W(g({},n),{children:e}):g({},n);return!t.component&&!t.loadComponent&&(e||t.loadChildren)&&t.outlet&&t.outlet!==j&&(t.component=vg),t}function zA(n,e,t){let r=Ya(n,e._root,t?t._root:void 0);return new Ka(r,e)}function Ya(n,e,t){if(t&&n.shouldReuseRoute(e.value,t.value.snapshot)){let r=t.value;r._futureSnapshot=e.value;let i=WA(n,e,t);return new Yt(r,i)}else{if(n.shouldAttach(e.value)){let o=n.retrieve(e.value);if(o!==null){let s=o.route;return s.value._futureSnapshot=e.value,s.children=e.children.map(a=>Ya(n,a)),s}}let r=GA(e.value),i=e.children.map(o=>Ya(n,o));return new Yt(r,i)}}function WA(n,e,t){return e.children.map(r=>{for(let i of t.children)if(n.shouldReuseRoute(r.value,i.value.snapshot))return Ya(n,r,i);return Ya(n,r)})}function GA(n){return new si(new ke(n.url),new ke(n.params),new ke(n.queryParams),new ke(n.fragment),new ke(n.data),n.outlet,n.component,n)}var cs=class{redirectTo;navigationBehaviorOptions;constructor(e,t){this.redirectTo=e,this.navigationBehaviorOptions=t}},BE="ngNavigationCancelingError";function Ed(n,e){let{redirectTo:t,navigationBehaviorOptions:r}=is(e)?{redirectTo:e,navigationBehaviorOptions:void 0}:e,i=jE(!1,lt.Redirect);return i.url=t,i.navigationBehaviorOptions=r,i}function jE(n,e){let t=new Error(`NavigationCancelingError: ${n||""}`);return t[BE]=!0,t.cancellationCode=e,t}function qA(n){return VE(n)&&is(n.url)}function VE(n){return!!n&&n[BE]}var dg=class{routeReuseStrategy;futureState;currState;forwardEvent;inputBindingEnabled;constructor(e,t,r,i,o){this.routeReuseStrategy=e,this.futureState=t,this.currState=r,this.forwardEvent=i,this.inputBindingEnabled=o}activate(e){let t=this.futureState._root,r=this.currState?this.currState._root:null;this.deactivateChildRoutes(t,r,e),eg(this.futureState.root),this.activateChildRoutes(t,r,e)}deactivateChildRoutes(e,t,r){let i=ts(t);e.children.forEach(o=>{let s=o.value.outlet;this.deactivateRoutes(o,i[s],r),delete i[s]}),Object.values(i).forEach(o=>{this.deactivateRouteAndItsChildren(o,r)})}deactivateRoutes(e,t,r){let i=e.value,o=t?t.value:null;if(i===o)if(i.component){let s=r.getContext(i.outlet);s&&this.deactivateChildRoutes(e,t,s.children)}else this.deactivateChildRoutes(e,t,r);else o&&this.deactivateRouteAndItsChildren(t,r)}deactivateRouteAndItsChildren(e,t){e.value.component&&this.routeReuseStrategy.shouldDetach(e.value.snapshot)?this.detachAndStoreRouteSubtree(e,t):this.deactivateRouteAndOutlet(e,t)}detachAndStoreRouteSubtree(e,t){let r=t.getContext(e.value.outlet),i=r&&e.value.component?r.children:t,o=ts(e);for(let s of Object.values(o))this.deactivateRouteAndItsChildren(s,i);if(r&&r.outlet){let s=r.outlet.detach(),a=r.children.onOutletDeactivated();this.routeReuseStrategy.store(e.value.snapshot,{componentRef:s,route:e,contexts:a})}}deactivateRouteAndOutlet(e,t){let r=t.getContext(e.value.outlet),i=r&&e.value.component?r.children:t,o=ts(e);for(let s of Object.values(o))this.deactivateRouteAndItsChildren(s,i);r&&(r.outlet&&(r.outlet.deactivate(),r.children.onOutletDeactivated()),r.attachRef=null,r.route=null)}activateChildRoutes(e,t,r){let i=ts(t);e.children.forEach(o=>{this.activateRoutes(o,i[o.value.outlet],r),this.forwardEvent(new Cd(o.value.snapshot))}),e.children.length&&this.forwardEvent(new vd(e.value.snapshot))}activateRoutes(e,t,r){let i=e.value,o=t?t.value:null;if(eg(i),i===o)if(i.component){let s=r.getOrCreateContext(i.outlet);this.activateChildRoutes(e,t,s.children)}else this.activateChildRoutes(e,t,r);else if(i.component){let s=r.getOrCreateContext(i.outlet);if(this.routeReuseStrategy.shouldAttach(i.snapshot)){let a=this.routeReuseStrategy.retrieve(i.snapshot);this.routeReuseStrategy.store(i.snapshot,null),s.children.onOutletReAttached(a.contexts),s.attachRef=a.componentRef,s.route=a.route.value,s.outlet&&s.outlet.attach(a.componentRef,a.route.value),eg(a.route.value),this.activateChildRoutes(e,null,s.children)}else s.attachRef=null,s.route=i,s.outlet&&s.outlet.activateWith(i,s.injector),this.activateChildRoutes(e,null,s.children)}else this.activateChildRoutes(e,null,r)}},wd=class{path;route;constructor(e){this.path=e,this.route=this.path[this.path.length-1]}},rs=class{component;route;constructor(e,t){this.component=e,this.route=t}};function KA(n,e,t){let r=n._root,i=e?e._root:null;return Va(r,i,t,[r.value])}function ZA(n){let e=n.routeConfig?n.routeConfig.canActivateChild:null;return!e||e.length===0?null:{node:n,guards:e}}function ds(n,e){let t=Symbol(),r=e.get(n,t);return r===t?typeof n=="function"&&!dp(n)?n:e.get(n):r}function Va(n,e,t,r,i={canDeactivateChecks:[],canActivateChecks:[]}){let o=ts(e);return n.children.forEach(s=>{YA(s,o[s.value.outlet],t,r.concat([s.value]),i),delete o[s.value.outlet]}),Object.entries(o).forEach(([s,a])=>Ha(a,t.getContext(s),i)),i}function YA(n,e,t,r,i={canDeactivateChecks:[],canActivateChecks:[]}){let o=n.value,s=e?e.value:null,a=t?t.getContext(n.value.outlet):null;if(s&&o.routeConfig===s.routeConfig){let c=QA(s,o,o.routeConfig.runGuardsAndResolvers);c?i.canActivateChecks.push(new wd(r)):(o.data=s.data,o._resolvedData=s._resolvedData),o.component?Va(n,e,a?a.children:null,r,i):Va(n,e,t,r,i),c&&a&&a.outlet&&a.outlet.isActivated&&i.canDeactivateChecks.push(new rs(a.outlet.component,s))}else s&&Ha(e,a,i),i.canActivateChecks.push(new wd(r)),o.component?Va(n,null,a?a.children:null,r,i):Va(n,null,t,r,i);return i}function QA(n,e,t){if(typeof t=="function")return ot(e._environmentInjector,()=>t(n,e));switch(t){case"pathParamsChange":return!Xi(n.url,e.url);case"pathParamsOrQueryParamsChange":return!Xi(n.url,e.url)||!nr(n.queryParams,e.queryParams);case"always":return!0;case"paramsOrQueryParamsChange":return!lg(n,e)||!nr(n.queryParams,e.queryParams);default:return!lg(n,e)}}function Ha(n,e,t){let r=ts(n),i=n.value;Object.entries(r).forEach(([o,s])=>{i.component?e?Ha(s,e.children.getContext(o),t):Ha(s,null,t):Ha(s,e,t)}),i.component?e&&e.outlet&&e.outlet.isActivated?t.canDeactivateChecks.push(new rs(e.outlet.component,i)):t.canDeactivateChecks.push(new rs(null,i)):t.canDeactivateChecks.push(new rs(null,i))}function tc(n){return typeof n=="function"}function XA(n){return typeof n=="boolean"}function JA(n){return n&&tc(n.canLoad)}function ek(n){return n&&tc(n.canActivate)}function tk(n){return n&&tc(n.canActivateChild)}function nk(n){return n&&tc(n.canDeactivate)}function rk(n){return n&&tc(n.canMatch)}function UE(n){return n instanceof cr||n?.name==="EmptyError"}var id=Symbol("INITIAL_VALUE");function ls(){return ft(n=>Gf(n.map(e=>e.pipe(St(1),zn(id)))).pipe(te(e=>{for(let t of e)if(t!==!0){if(t===id)return id;if(t===!1||ik(t))return t}return!0}),ye(e=>e!==id),St(1)))}function ik(n){return is(n)||n instanceof cs}function $E(n){return n.aborted?T(void 0).pipe(St(1)):new O(e=>{let t=()=>{e.next(),e.complete()};return n.addEventListener("abort",t),()=>n.removeEventListener("abort",t)})}function HE(n){return fe($E(n))}function ok(n){return dt(e=>{let{targetSnapshot:t,currentSnapshot:r,guards:{canActivateChecks:i,canDeactivateChecks:o}}=e;return o.length===0&&i.length===0?T(W(g({},e),{guardsResult:!0})):sk(o,t,r).pipe(dt(s=>s&&XA(s)?ak(t,i,n):T(s)),te(s=>W(g({},e),{guardsResult:s})))})}function sk(n,e,t){return Ne(n).pipe(dt(r=>fk(r.component,r.route,t,e)),ur(r=>r!==!0,!0))}function ak(n,e,t){return Ne(e).pipe(yl(r=>Mo(lk(r.route.parent,t),ck(r.route,t),dk(n,r.path),uk(n,r.route))),ur(r=>r!==!0,!0))}function ck(n,e){return n!==null&&e&&e(new bd(n)),T(!0)}function lk(n,e){return n!==null&&e&&e(new yd(n)),T(!0)}function uk(n,e){let t=e.routeConfig?e.routeConfig.canActivate:null;if(!t||t.length===0)return T(!0);let r=t.map(i=>$s(()=>{let o=e._environmentInjector,s=ds(i,o),a=ek(s)?s.canActivate(e,n):ot(o,()=>s(e,n));return no(a).pipe(ur())}));return T(r).pipe(ls())}function dk(n,e){let t=e[e.length-1],i=e.slice(0,e.length-1).reverse().map(o=>ZA(o)).filter(o=>o!==null).map(o=>$s(()=>{let s=o.guards.map(a=>{let c=o.node._environmentInjector,l=ds(a,c),u=tk(l)?l.canActivateChild(t,n):ot(c,()=>l(t,n));return no(u).pipe(ur())});return T(s).pipe(ls())}));return T(i).pipe(ls())}function fk(n,e,t,r){let i=e&&e.routeConfig?e.routeConfig.canDeactivate:null;if(!i||i.length===0)return T(!0);let o=i.map(s=>{let a=e._environmentInjector,c=ds(s,a),l=nk(c)?c.canDeactivate(n,e,t,r):ot(a,()=>c(n,e,t,r));return no(l).pipe(ur())});return T(o).pipe(ls())}function pk(n,e,t,r,i){let o=e.canLoad;if(o===void 0||o.length===0)return T(!0);let s=o.map(a=>{let c=ds(a,n),l=JA(c)?c.canLoad(e,t):ot(n,()=>c(e,t)),u=no(l);return i?u.pipe(HE(i)):u});return T(s).pipe(ls(),zE(r))}function zE(n){return Lf(Ke(e=>{if(typeof e!="boolean")throw Ed(n,e)}),te(e=>e===!0))}function hk(n,e,t,r,i,o){let s=e.canMatch;if(!s||s.length===0)return T(!0);let a=s.map(c=>{let l=ds(c,n),u=rk(l)?l.canMatch(e,t,i):ot(n,()=>l(e,t,i));return no(u).pipe(HE(o))});return T(a).pipe(ls(),zE(r))}var Sr=class n extends Error{segmentGroup;constructor(e){super(),this.segmentGroup=e||null,Object.setPrototypeOf(this,n.prototype)}},Qa=class n extends Error{urlTree;constructor(e){super(),this.urlTree=e,Object.setPrototypeOf(this,n.prototype)}};function mk(n){throw new E(4e3,!1)}function gk(n){throw jE(!1,lt.GuardRejected)}var fg=class{urlSerializer;urlTree;constructor(e,t){this.urlSerializer=e,this.urlTree=t}async lineralizeSegments(e,t){let r=[],i=t.root;for(;;){if(r=r.concat(i.segments),i.numberOfChildren===0)return r;if(i.numberOfChildren>1||!i.children[j])throw mk(`${e.redirectTo}`);i=i.children[j]}}async applyRedirectCommands(e,t,r,i,o){let s=await yk(t,i,o);if(s instanceof mn)throw new Qa(s);let a=this.applyRedirectCreateUrlTree(s,this.urlSerializer.parse(s),e,r);if(s[0]==="/")throw new Qa(a);return a}applyRedirectCreateUrlTree(e,t,r,i){let o=this.createSegmentGroup(e,t.root,r,i);return new mn(o,this.createQueryParams(t.queryParams,this.urlTree.queryParams),t.fragment)}createQueryParams(e,t){let r={};return Object.entries(e).forEach(([i,o])=>{if(typeof o=="string"&&o[0]===":"){let a=o.substring(1);r[i]=t[a]}else r[i]=o}),r}createSegmentGroup(e,t,r,i){let o=this.createSegments(e,t.segments,r,i),s={};return Object.entries(t.children).forEach(([a,c])=>{s[a]=this.createSegmentGroup(e,c,r,i)}),new le(o,s)}createSegments(e,t,r,i){return t.map(o=>o.path[0]===":"?this.findPosParam(e,o,i):this.findOrReturn(o,r))}findPosParam(e,t,r){let i=r[t.path.substring(1)];if(!i)throw new E(4001,!1);return i}findOrReturn(e,t){let r=0;for(let i of t){if(i.path===e.path)return t.splice(r),i;r++}return e}};function yk(n,e,t){if(typeof n=="string")return Promise.resolve(n);let r=n;return cd(no(ot(t,()=>r(e))))}function vk(n,e){return n.providers&&!n._injector&&(n._injector=Ea(n.providers,e,`Route: ${n.path}`)),n._injector??e}function Ln(n){return n.outlet||j}function bk(n,e){let t=n.filter(r=>Ln(r)===e);return t.push(...n.filter(r=>Ln(r)!==e)),t}var pg={matched:!1,consumedSegments:[],remainingSegments:[],parameters:{},positionalParamSegments:{}};function WE(n){return{routeConfig:n.routeConfig,url:n.url,params:n.params,queryParams:n.queryParams,fragment:n.fragment,data:n.data,outlet:n.outlet,title:n.title,paramMap:n.paramMap,queryParamMap:n.queryParamMap}}function Ck(n,e,t,r,i,o,s){let a=GE(n,e,t);if(!a.matched)return T(a);let c=WE(o(a));return r=vk(e,r),hk(r,e,t,i,c,s).pipe(te(l=>l===!0?a:g({},pg)))}function GE(n,e,t){if(e.path==="")return e.pathMatch==="full"&&(n.hasChildren()||t.length>0)?g({},pg):{matched:!0,consumedSegments:[],remainingSegments:t,parameters:{},positionalParamSegments:{}};let i=(e.matcher||gE)(t,n,e);if(!i)return g({},pg);let o={};Object.entries(i.posParams??{}).forEach(([a,c])=>{o[a]=c.path});let s=i.consumed.length>0?g(g({},o),i.consumed[i.consumed.length-1].parameters):o;return{matched:!0,consumedSegments:i.consumed,remainingSegments:t.slice(i.consumed.length),parameters:s,positionalParamSegments:i.posParams??{}}}function hE(n,e,t,r,i){return t.length>0&&Ek(n,t,r,i)?{segmentGroup:new le(e,Dk(r,new le(t,n.children))),slicedSegments:[]}:t.length===0&&wk(n,t,r)?{segmentGroup:new le(n.segments,_k(n,t,r,n.children)),slicedSegments:t}:{segmentGroup:new le(n.segments,n.children),slicedSegments:t}}function _k(n,e,t,r){let i={};for(let o of t)if(Sd(n,e,o)&&!r[Ln(o)]){let s=new le([],{});i[Ln(o)]=s}return g(g({},r),i)}function Dk(n,e){let t={};t[j]=e;for(let r of n)if(r.path===""&&Ln(r)!==j){let i=new le([],{});t[Ln(r)]=i}return t}function Ek(n,e,t,r){return t.some(i=>!Sd(n,e,i)||!(Ln(i)!==j)?!1:!(r!==void 0&&Ln(i)===r))}function wk(n,e,t){return t.some(r=>Sd(n,e,r))}function Sd(n,e,t){return(n.hasChildren()||e.length>0)&&t.pathMatch==="full"?!1:t.path===""}function Tk(n,e,t){return e.length===0&&!n.children[t]}var hg=class{};async function Ik(n,e,t,r,i,o,s="emptyOnly",a){return new mg(n,e,t,r,i,s,o,a).recognize()}var Sk=31,mg=class{injector;configLoader;rootComponentType;config;urlTree;paramsInheritanceStrategy;urlSerializer;abortSignal;applyRedirects;absoluteRedirectCount=0;allowRedirects=!0;constructor(e,t,r,i,o,s,a,c){this.injector=e,this.configLoader=t,this.rootComponentType=r,this.config=i,this.urlTree=o,this.paramsInheritanceStrategy=s,this.urlSerializer=a,this.abortSignal=c,this.applyRedirects=new fg(this.urlSerializer,this.urlTree)}noMatchError(e){return new E(4002,`'${e.segmentGroup}'`)}async recognize(){let e=hE(this.urlTree.root,[],[],this.config).segmentGroup,{children:t,rootSnapshot:r}=await this.match(e),i=new Yt(r,t),o=new Za("",i),s=ME(r,[],this.urlTree.queryParams,this.urlTree.fragment);return s.queryParams=this.urlTree.queryParams,o.url=this.urlSerializer.serialize(s),{state:o,tree:s}}async match(e){let t=new as([],Object.freeze({}),Object.freeze(g({},this.urlTree.queryParams)),this.urlTree.fragment,Object.freeze({}),j,this.rootComponentType,null,{},this.injector);try{return{children:await this.processSegmentGroup(this.injector,this.config,e,j,t),rootSnapshot:t}}catch(r){if(r instanceof Qa)return this.urlTree=r.urlTree,this.match(r.urlTree.root);throw r instanceof Sr?this.noMatchError(r):r}}async processSegmentGroup(e,t,r,i,o){if(r.segments.length===0&&r.hasChildren())return this.processChildren(e,t,r,o);let s=await this.processSegment(e,t,r,r.segments,i,!0,o);return s instanceof Yt?[s]:[]}async processChildren(e,t,r,i){let o=[];for(let c of Object.keys(r.children))c==="primary"?o.unshift(c):o.push(c);let s=[];for(let c of o){let l=r.children[c],u=bk(t,c),d=await this.processSegmentGroup(e,u,l,c,i);s.push(...d)}let a=qE(s);return Mk(a),a}async processSegment(e,t,r,i,o,s,a){for(let c of t)try{return await this.processSegmentAgainstRoute(c._injector??e,t,c,r,i,o,s,a)}catch(l){if(l instanceof Sr||UE(l))continue;throw l}if(Tk(r,i,o))return new hg;throw new Sr(r)}async processSegmentAgainstRoute(e,t,r,i,o,s,a,c){if(Ln(r)!==s&&(s===j||!Sd(i,o,r)))throw new Sr(i);if(r.redirectTo===void 0)return this.matchSegmentAgainstRoute(e,i,r,o,s,c);if(this.allowRedirects&&a)return this.expandSegmentAgainstRouteUsingRedirect(e,i,t,r,o,s,c);throw new Sr(i)}async expandSegmentAgainstRouteUsingRedirect(e,t,r,i,o,s,a){let{matched:c,parameters:l,consumedSegments:u,positionalParamSegments:d,remainingSegments:f}=GE(t,i,o);if(!c)throw new Sr(t);typeof i.redirectTo=="string"&&i.redirectTo[0]==="/"&&(this.absoluteRedirectCount++,this.absoluteRedirectCount>Sk&&(this.allowRedirects=!1));let p=this.createSnapshot(e,i,o,l,a);if(this.abortSignal.aborted)throw new Error(this.abortSignal.reason);let m=await this.applyRedirects.applyRedirectCommands(u,i.redirectTo,d,WE(p),e),D=await this.applyRedirects.lineralizeSegments(i,m);return this.processSegment(e,r,t,D.concat(f),s,!1,a)}createSnapshot(e,t,r,i,o){let s=new as(r,i,Object.freeze(g({},this.urlTree.queryParams)),this.urlTree.fragment,Rk(t),Ln(t),t.component??t._loadedComponent??null,t,Ak(t),e),a=gg(s,o,this.paramsInheritanceStrategy);return s.params=Object.freeze(a.params),s.data=Object.freeze(a.data),s}async matchSegmentAgainstRoute(e,t,r,i,o,s){if(this.abortSignal.aborted)throw new Error(this.abortSignal.reason);let a=Re=>this.createSnapshot(e,r,Re.consumedSegments,Re.parameters,s),c=await cd(Ck(t,r,i,e,this.urlSerializer,a,this.abortSignal));if(r.path==="**"&&(t.children={}),!c?.matched)throw new Sr(t);e=r._injector??e;let{routes:l}=await this.getChildConfig(e,r,i),u=r._loadedInjector??e,{parameters:d,consumedSegments:f,remainingSegments:p}=c,m=this.createSnapshot(e,r,f,d,s),{segmentGroup:D,slicedSegments:S}=hE(t,f,p,l,o);if(S.length===0&&D.hasChildren()){let Re=await this.processChildren(u,l,D,m);return new Yt(m,Re)}if(l.length===0&&S.length===0)return new Yt(m,[]);let M=Ln(r)===o,Q=await this.processSegment(u,l,D,S,M?j:o,!0,m);return new Yt(m,Q instanceof Yt?[Q]:[])}async getChildConfig(e,t,r){if(t.children)return{routes:t.children,injector:e};if(t.loadChildren){if(t._loadedRoutes!==void 0){let o=t._loadedNgModuleFactory;return o&&!t._loadedInjector&&(t._loadedInjector=o.create(e).injector),{routes:t._loadedRoutes,injector:t._loadedInjector}}if(this.abortSignal.aborted)throw new Error(this.abortSignal.reason);if(await cd(pk(e,t,r,this.urlSerializer,this.abortSignal))){let o=await this.configLoader.loadChildren(e,t);return t._loadedRoutes=o.routes,t._loadedInjector=o.injector,t._loadedNgModuleFactory=o.factory,o}throw gk(t)}return{routes:[],injector:e}}};function Mk(n){n.sort((e,t)=>e.value.outlet===j?-1:t.value.outlet===j?1:e.value.outlet.localeCompare(t.value.outlet))}function xk(n){let e=n.value.routeConfig;return e&&e.path===""}function qE(n){let e=[],t=new Set;for(let r of n){if(!xk(r)){e.push(r);continue}let i=e.find(o=>r.value.routeConfig===o.value.routeConfig);i!==void 0?(i.children.push(...r.children),t.add(i)):e.push(r)}for(let r of t){let i=qE(r.children);e.push(new Yt(r.value,i))}return e.filter(r=>!t.has(r))}function Rk(n){return n.data||{}}function Ak(n){return n.resolve||{}}function kk(n,e,t,r,i,o,s){return dt(async a=>{let{state:c,tree:l}=await Ik(n,e,t,r,a.extractedUrl,i,o,s);return W(g({},a),{targetSnapshot:c,urlAfterRedirects:l})})}function Nk(n){return dt(e=>{let{targetSnapshot:t,guards:{canActivateChecks:r}}=e;if(!r.length)return T(e);let i=new Set(r.map(a=>a.route)),o=new Set;for(let a of i)if(!o.has(a))for(let c of KE(a))o.add(c);let s=0;return Ne(o).pipe(yl(a=>i.has(a)?Ok(a,t,n):(a.data=gg(a,a.parent,n).resolve,T(void 0))),Ke(()=>s++),vl(1),dt(a=>s===o.size?T(e):me))})}function KE(n){let e=n.children.map(t=>KE(t)).flat();return[n,...e]}function Ok(n,e,t){let r=n.routeConfig,i=n._resolve;return r?.title!==void 0&&!LE(r)&&(i[Xa]=r.title),$s(()=>(n.data=gg(n,n.parent,t).resolve,Pk(i,n,e).pipe(te(o=>(n._resolvedData=o,n.data=g(g({},n.data),o),null)))))}function Pk(n,e,t){let r=ng(n);if(r.length===0)return T({});let i={};return Ne(r).pipe(dt(o=>Lk(n[o],e,t).pipe(ur(),Ke(s=>{if(s instanceof cs)throw Ed(new oi,s);i[o]=s}))),vl(1),te(()=>i),lr(o=>UE(o)?me:Wf(o)))}function Lk(n,e,t){let r=e._environmentInjector,i=ds(n,r),o=i.resolve?i.resolve(e,t):ot(r,()=>i(e,t));return no(o)}function mE(n){return ft(e=>{let t=n(e);return t?Ne(t).pipe(te(()=>e)):T(e)})}var Cg=(()=>{class n{buildTitle(t){let r,i=t.root;for(;i!==void 0;)r=this.getResolvedTitleForRoute(i)??r,i=i.children.find(o=>o.outlet===j);return r}getResolvedTitleForRoute(t){return t.data[Xa]}static \u0275fac=function(r){return new(r||n)};static \u0275prov=C({token:n,factory:()=>h(ZE),providedIn:"root"})}return n})(),ZE=(()=>{class n extends Cg{title;constructor(t){super(),this.title=t}updateTitle(t){let r=this.buildTitle(t);r!==void 0&&this.title.setTitle(r)}static \u0275fac=function(r){return new(r||n)(B(cE))};static \u0275prov=C({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})(),nc=new v("",{factory:()=>({})}),rc=new v(""),YE=(()=>{class n{componentLoaders=new WeakMap;childrenLoaders=new WeakMap;onLoadStartListener;onLoadEndListener;compiler=h(Cm);async loadComponent(t,r){if(this.componentLoaders.get(r))return this.componentLoaders.get(r);if(r._loadedComponent)return Promise.resolve(r._loadedComponent);this.onLoadStartListener&&this.onLoadStartListener(r);let i=(async()=>{try{let o=await vE(ot(t,()=>r.loadComponent())),s=await JE(XE(o));return this.onLoadEndListener&&this.onLoadEndListener(r),r._loadedComponent=s,s}finally{this.componentLoaders.delete(r)}})();return this.componentLoaders.set(r,i),i}loadChildren(t,r){if(this.childrenLoaders.get(r))return this.childrenLoaders.get(r);if(r._loadedRoutes)return Promise.resolve({routes:r._loadedRoutes,injector:r._loadedInjector});this.onLoadStartListener&&this.onLoadStartListener(r);let i=(async()=>{try{let o=await QE(r,this.compiler,t,this.onLoadEndListener);return r._loadedRoutes=o.routes,r._loadedInjector=o.injector,r._loadedNgModuleFactory=o.factory,o}finally{this.childrenLoaders.delete(r)}})();return this.childrenLoaders.set(r,i),i}static \u0275fac=function(r){return new(r||n)};static \u0275prov=C({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})();async function QE(n,e,t,r){let i=await vE(ot(t,()=>n.loadChildren())),o=await JE(XE(i)),s;o instanceof wu||Array.isArray(o)?s=o:s=await e.compileModuleAsync(o),r&&r(n);let a,c,l=!1,u;return Array.isArray(s)?(c=s,l=!0):(a=s.create(t).injector,u=s,c=a.get(rc,[],{optional:!0,self:!0}).flat()),{routes:c.map(bg),injector:a,factory:u}}function Fk(n){return n&&typeof n=="object"&&"default"in n}function XE(n){return Fk(n)?n.default:n}async function JE(n){return n}var Md=(()=>{class n{static \u0275fac=function(r){return new(r||n)};static \u0275prov=C({token:n,factory:()=>h(Bk),providedIn:"root"})}return n})(),Bk=(()=>{class n{shouldProcessUrl(t){return!0}extract(t){return t}merge(t,r){return t}static \u0275fac=function(r){return new(r||n)};static \u0275prov=C({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})(),ew=new v("");var jk=()=>{},tw=new v(""),nw=(()=>{class n{currentNavigation=Le(null,{equal:()=>!1});currentTransition=null;lastSuccessfulNavigation=Le(null);events=new I;transitionAbortWithErrorSubject=new I;configLoader=h(YE);environmentInjector=h(Oe);destroyRef=h(Ue);urlSerializer=h(Ja);rootContexts=h(us);location=h(Qi);inputBindingEnabled=h(Id,{optional:!0})!==null;titleStrategy=h(Cg);options=h(nc,{optional:!0})||{};paramsInheritanceStrategy=this.options.paramsInheritanceStrategy||"emptyOnly";urlHandlingStrategy=h(Md);createViewTransition=h(ew,{optional:!0});navigationErrorHandler=h(tw,{optional:!0});navigationId=0;get hasRequestedNavigation(){return this.navigationId!==0}transitions;afterPreactivation=()=>T(void 0);rootComponentType=null;destroyed=!1;constructor(){let t=i=>this.events.next(new md(i)),r=i=>this.events.next(new gd(i));this.configLoader.onLoadEndListener=r,this.configLoader.onLoadStartListener=t,this.destroyRef.onDestroy(()=>{this.destroyed=!0})}complete(){this.transitions?.complete()}handleNavigationRequest(t){let r=++this.navigationId;Nn(()=>{this.transitions?.next(W(g({},t),{extractedUrl:this.urlHandlingStrategy.extract(t.rawUrl),targetSnapshot:null,targetRouterState:null,guards:{canActivateChecks:[],canDeactivateChecks:[]},guardsResult:null,id:r,routesRecognizeHandler:{},beforeActivateHandler:{}}))})}setupNavigations(t){return this.transitions=new ke(null),this.transitions.pipe(ye(r=>r!==null),ft(r=>{let i=!1,o=new AbortController,s=()=>!i&&this.currentTransition?.id===r.id;return T(r).pipe(ft(a=>{if(this.navigationId>r.id)return this.cancelNavigationTransition(r,"",lt.SupersededByNewNavigation),me;this.currentTransition=r;let c=this.lastSuccessfulNavigation();this.currentNavigation.set({id:a.id,initialUrl:a.rawUrl,extractedUrl:a.extractedUrl,targetBrowserUrl:typeof a.extras.browserUrl=="string"?this.urlSerializer.parse(a.extras.browserUrl):a.extras.browserUrl,trigger:a.source,extras:a.extras,previousNavigation:c?W(g({},c),{previousNavigation:null}):null,abort:()=>o.abort(),routesRecognizeHandler:a.routesRecognizeHandler,beforeActivateHandler:a.beforeActivateHandler});let l=!t.navigated||this.isUpdatingInternalState()||this.isUpdatedBrowserUrl(),u=a.extras.onSameUrlNavigation??t.onSameUrlNavigation;if(!l&&u!=="reload")return this.events.next(new xr(a.id,this.urlSerializer.serialize(a.rawUrl),"",Wa.IgnoredSameUrlNavigation)),a.resolve(!1),me;if(this.urlHandlingStrategy.shouldProcessUrl(a.rawUrl))return T(a).pipe(ft(d=>(this.events.next(new eo(d.id,this.urlSerializer.serialize(d.extractedUrl),d.source,d.restoredState)),d.id!==this.navigationId?me:Promise.resolve(d))),kk(this.environmentInjector,this.configLoader,this.rootComponentType,t.config,this.urlSerializer,this.paramsInheritanceStrategy,o.signal),Ke(d=>{r.targetSnapshot=d.targetSnapshot,r.urlAfterRedirects=d.urlAfterRedirects,this.currentNavigation.update(f=>(f.finalUrl=d.urlAfterRedirects,f)),this.events.next(new qa)}),ft(d=>Ne(r.routesRecognizeHandler.deferredHandle??T(void 0)).pipe(te(()=>d))),Ke(()=>{let d=new Ga(a.id,this.urlSerializer.serialize(a.extractedUrl),this.urlSerializer.serialize(a.urlAfterRedirects),a.targetSnapshot);this.events.next(d)}));if(l&&this.urlHandlingStrategy.shouldProcessUrl(a.currentRawUrl)){let{id:d,extractedUrl:f,source:p,restoredState:m,extras:D}=a,S=new eo(d,this.urlSerializer.serialize(f),p,m);this.events.next(S);let M=OE(this.rootComponentType,this.environmentInjector).snapshot;return this.currentTransition=r=W(g({},a),{targetSnapshot:M,urlAfterRedirects:f,extras:W(g({},D),{skipLocationChange:!1,replaceUrl:!1})}),this.currentNavigation.update(Q=>(Q.finalUrl=f,Q)),T(r)}else return this.events.next(new xr(a.id,this.urlSerializer.serialize(a.extractedUrl),"",Wa.IgnoredByUrlHandlingStrategy)),a.resolve(!1),me}),te(a=>{let c=new dd(a.id,this.urlSerializer.serialize(a.extractedUrl),this.urlSerializer.serialize(a.urlAfterRedirects),a.targetSnapshot);return this.events.next(c),this.currentTransition=r=W(g({},a),{guards:KA(a.targetSnapshot,a.currentSnapshot,this.rootContexts)}),r}),ok(a=>this.events.next(a)),ft(a=>{if(r.guardsResult=a.guardsResult,a.guardsResult&&typeof a.guardsResult!="boolean")throw Ed(this.urlSerializer,a.guardsResult);let c=new fd(a.id,this.urlSerializer.serialize(a.extractedUrl),this.urlSerializer.serialize(a.urlAfterRedirects),a.targetSnapshot,!!a.guardsResult);if(this.events.next(c),!s())return me;if(!a.guardsResult)return this.cancelNavigationTransition(a,"",lt.GuardRejected),me;if(a.guards.canActivateChecks.length===0)return T(a);let l=new pd(a.id,this.urlSerializer.serialize(a.extractedUrl),this.urlSerializer.serialize(a.urlAfterRedirects),a.targetSnapshot);if(this.events.next(l),!s())return me;let u=!1;return T(a).pipe(Nk(this.paramsInheritanceStrategy),Ke({next:()=>{u=!0;let d=new hd(a.id,this.urlSerializer.serialize(a.extractedUrl),this.urlSerializer.serialize(a.urlAfterRedirects),a.targetSnapshot);this.events.next(d)},complete:()=>{u||this.cancelNavigationTransition(a,"",lt.NoDataFromResolver)}}))}),mE(a=>{let c=u=>{let d=[];if(u.routeConfig?._loadedComponent)u.component=u.routeConfig?._loadedComponent;else if(u.routeConfig?.loadComponent){let f=u._environmentInjector;d.push(this.configLoader.loadComponent(f,u.routeConfig).then(p=>{u.component=p}))}for(let f of u.children)d.push(...c(f));return d},l=c(a.targetSnapshot.root);return l.length===0?T(a):Ne(Promise.all(l).then(()=>a))}),mE(()=>this.afterPreactivation()),ft(()=>{let{currentSnapshot:a,targetSnapshot:c}=r,l=this.createViewTransition?.(this.environmentInjector,a.root,c.root);return l?Ne(l).pipe(te(()=>r)):T(r)}),St(1),ft(a=>{let c=zA(t.routeReuseStrategy,a.targetSnapshot,a.currentRouterState);this.currentTransition=r=a=W(g({},a),{targetRouterState:c}),this.currentNavigation.update(u=>(u.targetRouterState=c,u)),this.events.next(new os);let l=r.beforeActivateHandler.deferredHandle;return l?Ne(l.then(()=>a)):T(a)}),Ke(a=>{new dg(t.routeReuseStrategy,r.targetRouterState,r.currentRouterState,c=>this.events.next(c),this.inputBindingEnabled).activate(this.rootContexts),s()&&(i=!0,this.currentNavigation.update(c=>(c.abort=jk,c)),this.lastSuccessfulNavigation.set(Nn(this.currentNavigation)),this.events.next(new Mr(a.id,this.urlSerializer.serialize(a.extractedUrl),this.urlSerializer.serialize(a.urlAfterRedirects))),this.titleStrategy?.updateTitle(a.targetRouterState.snapshot),a.resolve(!0))}),fe($E(o.signal).pipe(ye(()=>!i&&!r.targetRouterState),Ke(()=>{this.cancelNavigationTransition(r,o.signal.reason+"",lt.Aborted)}))),Ke({complete:()=>{i=!0}}),fe(this.transitionAbortWithErrorSubject.pipe(Ke(a=>{throw a}))),qf(()=>{o.abort(),i||this.cancelNavigationTransition(r,"",lt.SupersededByNewNavigation),this.currentTransition?.id===r.id&&(this.currentNavigation.set(null),this.currentTransition=null)}),lr(a=>{if(i=!0,this.destroyed)return r.resolve(!1),me;if(VE(a))this.events.next(new hn(r.id,this.urlSerializer.serialize(r.extractedUrl),a.message,a.cancellationCode)),qA(a)?this.events.next(new ss(a.url,a.navigationBehaviorOptions)):r.resolve(!1);else{let c=new to(r.id,this.urlSerializer.serialize(r.extractedUrl),a,r.targetSnapshot??void 0);try{let l=ot(this.environmentInjector,()=>this.navigationErrorHandler?.(c));if(l instanceof cs){let{message:u,cancellationCode:d}=Ed(this.urlSerializer,l);this.events.next(new hn(r.id,this.urlSerializer.serialize(r.extractedUrl),u,d)),this.events.next(new ss(l.redirectTo,l.navigationBehaviorOptions))}else throw this.events.next(c),a}catch(l){this.options.resolveNavigationPromiseOnError?r.resolve(!1):r.reject(l)}}return me}))}))}cancelNavigationTransition(t,r,i){let o=new hn(t.id,this.urlSerializer.serialize(t.extractedUrl),r,i);this.events.next(o),t.resolve(!1)}isUpdatingInternalState(){return this.currentTransition?.extractedUrl.toString()!==this.currentTransition?.currentUrlTree.toString()}isUpdatedBrowserUrl(){let t=this.urlHandlingStrategy.extract(this.urlSerializer.parse(this.location.path(!0))),r=Nn(this.currentNavigation),i=r?.targetBrowserUrl??r?.extractedUrl;return t.toString()!==i?.toString()&&!r?.extras.skipLocationChange}static \u0275fac=function(r){return new(r||n)};static \u0275prov=C({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})();function Vk(n){return n!==$a}var rw=new v("");var iw=(()=>{class n{static \u0275fac=function(r){return new(r||n)};static \u0275prov=C({token:n,factory:()=>h(Uk),providedIn:"root"})}return n})(),Td=class{shouldDetach(e){return!1}store(e,t){}shouldAttach(e){return!1}retrieve(e){return null}shouldReuseRoute(e,t){return e.routeConfig===t.routeConfig}shouldDestroyInjector(e){return!0}},Uk=(()=>{class n extends Td{static \u0275fac=(()=>{let t;return function(i){return(t||(t=br(n)))(i||n)}})();static \u0275prov=C({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})(),_g=(()=>{class n{urlSerializer=h(Ja);options=h(nc,{optional:!0})||{};canceledNavigationResolution=this.options.canceledNavigationResolution||"replace";location=h(Qi);urlHandlingStrategy=h(Md);urlUpdateStrategy=this.options.urlUpdateStrategy||"deferred";currentUrlTree=new mn;getCurrentUrlTree(){return this.currentUrlTree}rawUrlTree=this.currentUrlTree;getRawUrlTree(){return this.rawUrlTree}createBrowserPath({finalUrl:t,initialUrl:r,targetBrowserUrl:i}){let o=t!==void 0?this.urlHandlingStrategy.merge(t,r):r,s=i??o;return s instanceof mn?this.urlSerializer.serialize(s):s}routerUrlState(t){return t?.targetBrowserUrl===void 0||t?.finalUrl===void 0?{}:{\u0275routerUrl:this.urlSerializer.serialize(t.finalUrl)}}commitTransition({targetRouterState:t,finalUrl:r,initialUrl:i}){r&&t?(this.currentUrlTree=r,this.rawUrlTree=this.urlHandlingStrategy.merge(r,i),this.routerState=t):this.rawUrlTree=i}routerState=OE(null,h(Oe));getRouterState(){return this.routerState}_stateMemento=this.createStateMemento();get stateMemento(){return this._stateMemento}updateStateMemento(){this._stateMemento=this.createStateMemento()}createStateMemento(){return{rawUrlTree:this.rawUrlTree,currentUrlTree:this.currentUrlTree,routerState:this.routerState}}restoredState(){return this.location.getState()}static \u0275fac=function(r){return new(r||n)};static \u0275prov=C({token:n,factory:()=>h($k),providedIn:"root"})}return n})(),$k=(()=>{class n extends _g{currentPageId=0;lastSuccessfulId=-1;get browserPageId(){return this.canceledNavigationResolution!=="computed"?this.currentPageId:this.restoredState()?.\u0275routerPageId??this.currentPageId}registerNonRouterCurrentEntryChangeListener(t){return this.location.subscribe(r=>{r.type==="popstate"&&setTimeout(()=>{t(r.url,r.state,"popstate",{replaceUrl:!0})})})}handleRouterEvent(t,r){t instanceof eo?this.updateStateMemento():t instanceof xr?this.commitTransition(r):t instanceof Ga?this.urlUpdateStrategy==="eager"&&(r.extras.skipLocationChange||this.setBrowserUrl(this.createBrowserPath(r),r)):t instanceof os?(this.commitTransition(r),this.urlUpdateStrategy==="deferred"&&!r.extras.skipLocationChange&&this.setBrowserUrl(this.createBrowserPath(r),r)):t instanceof hn&&!NE(t)?this.restoreHistory(r):t instanceof to?this.restoreHistory(r,!0):t instanceof Mr&&(this.lastSuccessfulId=t.id,this.currentPageId=this.browserPageId)}setBrowserUrl(t,r){let{extras:i,id:o}=r,{replaceUrl:s,state:a}=i;if(this.location.isCurrentPathEqualTo(t)||s){let c=this.browserPageId,l=g(g({},a),this.generateNgRouterState(o,c,r));this.location.replaceState(t,"",l)}else{let c=g(g({},a),this.generateNgRouterState(o,this.browserPageId+1,r));this.location.go(t,"",c)}}restoreHistory(t,r=!1){if(this.canceledNavigationResolution==="computed"){let i=this.browserPageId,o=this.currentPageId-i;o!==0?this.location.historyGo(o):this.getCurrentUrlTree()===t.finalUrl&&o===0&&(this.resetInternalState(t),this.resetUrlToCurrentUrlTree())}else this.canceledNavigationResolution==="replace"&&(r&&this.resetInternalState(t),this.resetUrlToCurrentUrlTree())}resetInternalState({finalUrl:t}){this.routerState=this.stateMemento.routerState,this.currentUrlTree=this.stateMemento.currentUrlTree,this.rawUrlTree=this.urlHandlingStrategy.merge(this.currentUrlTree,t??this.rawUrlTree)}resetUrlToCurrentUrlTree(){this.location.replaceState(this.urlSerializer.serialize(this.getRawUrlTree()),"",this.generateNgRouterState(this.lastSuccessfulId,this.currentPageId))}generateNgRouterState(t,r,i){return this.canceledNavigationResolution==="computed"?g({navigationId:t,\u0275routerPageId:r},this.routerUrlState(i)):g({navigationId:t},this.routerUrlState(i))}static \u0275fac=(()=>{let t;return function(i){return(t||(t=br(n)))(i||n)}})();static \u0275prov=C({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})();function Dg(n,e){n.events.pipe(ye(t=>t instanceof Mr||t instanceof hn||t instanceof to||t instanceof xr),te(t=>t instanceof Mr||t instanceof xr?0:(t instanceof hn?t.code===lt.Redirect||t.code===lt.SupersededByNewNavigation:!1)?2:1),ye(t=>t!==2),St(1)).subscribe(()=>{e()})}var xd=(()=>{class n{get currentUrlTree(){return this.stateManager.getCurrentUrlTree()}get rawUrlTree(){return this.stateManager.getRawUrlTree()}disposed=!1;nonRouterCurrentEntryChangeSubscription;console=h(pm);stateManager=h(_g);options=h(nc,{optional:!0})||{};pendingTasks=h(Xr);urlUpdateStrategy=this.options.urlUpdateStrategy||"deferred";navigationTransitions=h(nw);urlSerializer=h(Ja);location=h(Qi);urlHandlingStrategy=h(Md);injector=h(Oe);_events=new I;get events(){return this._events}get routerState(){return this.stateManager.getRouterState()}navigated=!1;routeReuseStrategy=h(iw);injectorCleanup=h(rw,{optional:!0});onSameUrlNavigation=this.options.onSameUrlNavigation||"ignore";config=h(rc,{optional:!0})?.flat()??[];componentInputBindingEnabled=!!h(Id,{optional:!0});currentNavigation=this.navigationTransitions.currentNavigation.asReadonly();constructor(){this.resetConfig(this.config),this.navigationTransitions.setupNavigations(this).subscribe({error:t=>{}}),this.subscribeToNavigationEvents()}eventsSubscription=new q;subscribeToNavigationEvents(){let t=this.navigationTransitions.events.subscribe(r=>{try{let i=this.navigationTransitions.currentTransition,o=Nn(this.navigationTransitions.currentNavigation);if(i!==null&&o!==null){if(this.stateManager.handleRouterEvent(r,o),r instanceof hn&&r.code!==lt.Redirect&&r.code!==lt.SupersededByNewNavigation)this.navigated=!0;else if(r instanceof Mr)this.navigated=!0,this.injectorCleanup?.(this.routeReuseStrategy,this.routerState,this.config);else if(r instanceof ss){let s=r.navigationBehaviorOptions,a=this.urlHandlingStrategy.merge(r.url,i.currentRawUrl),c=g({scroll:i.extras.scroll,browserUrl:i.extras.browserUrl,info:i.extras.info,skipLocationChange:i.extras.skipLocationChange,replaceUrl:i.extras.replaceUrl||this.urlUpdateStrategy==="eager"||Vk(i.source)},s);this.scheduleNavigation(a,$a,null,c,{resolve:i.resolve,reject:i.reject,promise:i.promise})}}$A(r)&&this._events.next(r)}catch(i){this.navigationTransitions.transitionAbortWithErrorSubject.next(i)}});this.eventsSubscription.add(t)}resetRootComponentType(t){this.routerState.root.component=t,this.navigationTransitions.rootComponentType=t}initialNavigation(){this.setUpLocationChangeListener(),this.navigationTransitions.hasRequestedNavigation||this.navigateToSyncWithBrowser(this.location.path(!0),$a,this.stateManager.restoredState(),{replaceUrl:!0})}setUpLocationChangeListener(){this.nonRouterCurrentEntryChangeSubscription??=this.stateManager.registerNonRouterCurrentEntryChangeListener((t,r,i,o)=>{this.navigateToSyncWithBrowser(t,i,r,o)})}navigateToSyncWithBrowser(t,r,i,o){let s=i?.navigationId?i:null,a=i?.\u0275routerUrl??t;if(i?.\u0275routerUrl&&(o=W(g({},o),{browserUrl:t})),i){let l=g({},i);delete l.navigationId,delete l.\u0275routerPageId,delete l.\u0275routerUrl,Object.keys(l).length!==0&&(o.state=l)}let c=this.parseUrl(a);this.scheduleNavigation(c,r,s,o).catch(l=>{this.disposed||this.injector.get(xn)(l)})}get url(){return this.serializeUrl(this.currentUrlTree)}getCurrentNavigation(){return Nn(this.navigationTransitions.currentNavigation)}get lastSuccessfulNavigation(){return this.navigationTransitions.lastSuccessfulNavigation}resetConfig(t){this.config=t.map(bg),this.navigated=!1}ngOnDestroy(){this.dispose()}dispose(){this._events.unsubscribe(),this.navigationTransitions.complete(),this.nonRouterCurrentEntryChangeSubscription?.unsubscribe(),this.nonRouterCurrentEntryChangeSubscription=void 0,this.disposed=!0,this.eventsSubscription.unsubscribe()}createUrlTree(t,r={}){let{relativeTo:i,queryParams:o,fragment:s,queryParamsHandling:a,preserveFragment:c}=r,l=c?this.currentUrlTree.fragment:s,u=null;switch(a??this.options.defaultQueryParamsHandling){case"merge":u=g(g({},this.currentUrlTree.queryParams),o);break;case"preserve":u=this.currentUrlTree.queryParams;break;default:u=o||null}u!==null&&(u=this.removeEmptyProps(u));let d;try{let f=i?i.snapshot:this.routerState.snapshot.root;d=xE(f)}catch{(typeof t[0]!="string"||t[0][0]!=="/")&&(t=[]),d=this.currentUrlTree.root}return RE(d,t,u,l??null,this.urlSerializer)}navigateByUrl(t,r={skipLocationChange:!1}){let i=is(t)?t:this.parseUrl(t),o=this.urlHandlingStrategy.merge(i,this.rawUrlTree);return this.scheduleNavigation(o,$a,null,r)}navigate(t,r={skipLocationChange:!1}){return Hk(t),this.navigateByUrl(this.createUrlTree(t,r),r)}serializeUrl(t){return this.urlSerializer.serialize(t)}parseUrl(t){try{return this.urlSerializer.parse(t)}catch{return this.console.warn(zr(4018,!1)),this.urlSerializer.parse("/")}}isActive(t,r){let i;if(r===!0?i=g({},CE):r===!1?i=g({},rg):i=g(g({},rg),r),is(t))return lE(this.currentUrlTree,t,i);let o=this.parseUrl(t);return lE(this.currentUrlTree,o,i)}removeEmptyProps(t){return Object.entries(t).reduce((r,[i,o])=>(o!=null&&(r[i]=o),r),{})}scheduleNavigation(t,r,i,o,s){if(this.disposed)return Promise.resolve(!1);let a,c,l;s?(a=s.resolve,c=s.reject,l=s.promise):l=new Promise((d,f)=>{a=d,c=f});let u=this.pendingTasks.add();return Dg(this,()=>{queueMicrotask(()=>this.pendingTasks.remove(u))}),this.navigationTransitions.handleNavigationRequest({source:r,restoredState:i,currentUrlTree:this.currentUrlTree,currentRawUrl:this.currentUrlTree,rawUrl:t,extras:o,resolve:a,reject:c,promise:l,currentSnapshot:this.routerState.snapshot,currentRouterState:this.routerState}),l.catch(Promise.reject.bind(Promise))}static \u0275fac=function(r){return new(r||n)};static \u0275prov=C({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})();function Hk(n){for(let e=0;e<n.length;e++)if(n[e]==null)throw new E(4008,!1)}var qk=new v("");function Eg(n,...e){return Gr([{provide:rc,multi:!0,useValue:n},[],{provide:si,useFactory:Kk},{provide:Su,multi:!0,useFactory:Yk},e.map(t=>t.\u0275providers)])}function Kk(){return h(xd).routerState.root}function Zk(n,e){return{\u0275kind:n,\u0275providers:e}}function Yk(){let n=h(Te);return e=>{let t=n.get(Jn);if(e!==t.components[0])return;let r=n.get(xd),i=n.get(Qk);n.get(Xk)===1&&r.initialNavigation(),n.get(Jk,null,{optional:!0})?.setUpPreloading(),n.get(qk,null,{optional:!0})?.init(),r.resetRootComponentType(t.componentTypes[0]),i.closed||(i.next(),i.complete(),i.unsubscribe())}}var Qk=new v("",{factory:()=>new I}),Xk=new v("",{factory:()=>1});var Jk=new v("");function wg(){return Zk(6,[{provide:ri,useClass:Lm}])}var ow={get active(){return typeof globalThis.jasmine<"u"||typeof globalThis.jest<"u"||typeof globalThis.vitest<"u"}};var Tg=null,rr={get active(){return Tg===!0},setDevMode(n){if(Tg!==null&&!ow.active)throw new Error("[vault] DevMode has already been initialized.");Tg=n}};var ro=(n,e)=>{if(!rr.active||typeof globalThis>"u")return;let t=globalThis.sdux??={},r=t.debugWidget??={},i=r.versions??={};i[n]!==e&&(i[n]=e)};var H={CoreAfterTap:"coreAfterTap",CoreBeforeTap:"coreBeforeTap",ReplayGlobalError:"replayGlobalError",CoreError:"coreError",CoreErrorCallback:"coreErrorCallback",CoreState:"coreState",Encrypt:"encrypt",CoreEmitState:"coreEmitState",CoreLicense:"coreLicense",ErrorTransform:"errorTransform",Extension:"extension",Filter:"filter",FromObservable:"fromObservable",FromPromise:"fromPromise",FromStream:"fromStream",Interceptor:"interceptor",Merge:"merge",Operator:"operator",Persist:"persist",Reduce:"reduce",Resolve:"resolve",StepwiseFilter:"stepwiseFilter",StepwiseReducer:"stepwiseReducer",StepwiseResolve:"stepwiseResolve",TabSyncState:"tabSyncState"};var ic={Error:"error",Warn:"warn",Log:"log",Debug:"debug"};var Ig={Off:"off",Error:"error",Warn:"warn",Log:"log",Debug:"debug"};var tN=Ig.Off,nN="[vault]";function Sg(n,...e){let t=sw();if(t===Ig.Off)return;let r=[ic.Error,ic.Warn,ic.Log,ic.Debug];r.indexOf(n)<=r.indexOf(t)&&console[n](nN,...e)}var io=(...n)=>Sg("error",...n),N=(...n)=>Sg("warn",...n);var y=(...n)=>Sg("debug",...n);function sw(){return tN}var oc=class{constructor(e,t){this.behaviorCtx=t;this.key=e}critical;key;type=H.CoreErrorCallback;destroy(){N(`${this.key} - destroy "noop"`)}reset(){N(`${this.key} - reset "noop"`)}};function ce(n){try{return JSON.stringify(n,rN,2)}catch{return"[unserializable]"}}function rN(n,e){if(typeof e=="function")return"[Function]";if(e instanceof Error)return{message:e.message,stack:e.stack};if(e instanceof Map)return{map:Array.from(e.entries())};if(e instanceof Set)return{set:Array.from(e.values())};try{return JSON.stringify(e),e}catch{return"[Circular]"}}var aw=Symbol.for("BEHAVIOR_META");var fs="vault::devtools::logging::feature::cell";var Fn=Symbol.for("VAULT_CLEAR_STATE");var gn=Symbol.for("VAULT_NOOP");function re(n){return function(e){e[aw]=n,n.type!==void 0&&(e.type=n.type),n.key!==void 0&&(e.key=n.key),n.critical!==void 0&&(e.critical=n.critical),n.resolveType!==void 0&&(e.resolveType=n.resolveType),n.wantsConfig!==void 0?e.wantsConfig=n.wantsConfig:e.wantsConfig=!1,n.configKey!==void 0&&(e.configKey=n.configKey),n.needsLicense!==void 0?e.needsLicense=n.needsLicense:e.needsLicense=!1,n.licenseId!==void 0&&(e.licenseId=n.licenseId)}}var Xt={HttpResource:"http-resource",Observable:"observable",Promise:"promise",Value:"value"};var vt={IncomingPipeline:"Incoming Pipeline",FinalizePipeline:"Finalize Pipeline",PipelineError:"Pipeline Error",PipelineDestroy:"Pipeline Destroy",PipelineReset:"Pipeline Reset",AbortController:"Abort Controller",DenyController:"Deny Controller",TabSync:"Tab Sync"};function ie(n,e){return iN("Behavior",n,e)}function iN(n,e,t){let r=i=>i.charAt(0).toUpperCase()+i.slice(1).replace(/[^A-Za-z0-9]/g,"");return`SDUX::${n}::${r(e)}::${r(t)}`}function sc(n){return!!n&&typeof n=="object"&&typeof n.value=="function"}function Je(n,e){let t=Date.now();return n instanceof Error?{message:n.message||"Unexpected error",details:n.stack,raw:n,timestamp:t,featureCellKey:e}:typeof n=="string"?{message:n,details:n,raw:n,timestamp:t,featureCellKey:e}:{message:"Unexpected error",details:n,raw:n,timestamp:t,featureCellKey:e}}function Mg(n,e=new WeakSet){if(n===null||typeof n!="object")return n;let t=n;if(e.has(t))return n;e.add(t),Object.isFrozen(t)||Object.freeze(t);for(let r of Reflect.ownKeys(t)){let i=Object.getOwnPropertyDescriptor(t,r);i&&"value"in i&&Mg(i.value,e)}return n}var Rd=n=>{if(n===null||typeof n!="object"||Object.isFrozen(n))return n;try{if(n instanceof Map||n instanceof Set||n instanceof WeakMap||n instanceof WeakSet)try{return structuredClone(n)}catch{return Mg(n)}return structuredClone(n)}catch{let e=Array.isArray(n)?[...n]:Object.assign(Object.create(Object.getPrototypeOf(n)),n);return Mg(e)}};var xg=n=>n===gn,Rg=n=>n===Fn;var ps=n=>n===null,ai=n=>n===void 0,Ad=n=>!ai(n),hs=n=>n==null,kd=n=>typeof n=="function";var oN=n=>{if(n===null||typeof n!="object")return!1;let e=Object.getPrototypeOf(n);return e===Object.prototype||e===null},ac=n=>{if(!oN(n))return!1;let e=n,t=Object.prototype.hasOwnProperty.call(e,"loading")||Object.prototype.hasOwnProperty.call(e,"value")||Object.prototype.hasOwnProperty.call(e,"error"),r=Object.keys(e).length===0;return t||r};function ms(n){return!!(n&&typeof n=="object"&&"value"in n&&"isLoading"in n&&"error"in n&&"hasValue"in n)}var cc,lc,Nd,cw,yn=class{constructor(e,t){this.behaviorCtx=t;go(this,Nd);_(this,"type",yn.type);_(this,"key");_(this,"critical",yn.critical);go(this,cc,!1);go(this,lc,!1);this.key=e,_f(this,cc,rr.active)}computeMerge(e,t,r){let i=r?.clearUndefined??!1;return y(`${this.key} merge called (clear: ${i})`),ar(this,Nd,cw).call(this,e,t),t===void 0&&!i?(y(`${this.key} computeMerge skipped. next="${t}" clear="${i}"`),e):t===void 0&&i?(y(`${this.key} computeMerge skipped. next="${t}" clear="${i}"`),Fn):Array.isArray(e)&&t!=null?(y(`${this.key} pushing T to State \u2192 return [...curr, next]`),[...e,t]):(y(`${this.key} non-array branch. return next`),t)}destroy(){N(`${this.key} - destroy "noop"`)}reset(){N(`${this.key} - reset "noop"`)}};cc=new WeakMap,lc=new WeakMap,Nd=new WeakSet,cw=function(e,t){if(Array.isArray(e)===!1&&e!=null&&t!==void 0&&e!==gn){let r=`[vault] ${this.key}: ArrayPushMerge received non-array current value. This behavior is intended for array state.`,i=ce({currentType:typeof e,currentValue:e,nextValue:t});Cf(this,cc)&&!Cf(this,lc)?(_f(this,lc,!0),console.warn(`One Time Warning: ${r}`,i),N(`One Time Warning: ${r}`,i)):N(r,i)}},_(yn,"type"),_(yn,"key"),_(yn,"critical",!1),yn=J([re({type:H.Merge,key:ie("Merge","ArrayPush"),critical:!0})],yn);var Lg={get active(){return typeof globalThis.jasmine<"u"||typeof globalThis.jest<"u"||typeof globalThis.vitest<"u"}},Ag=null,et={get active(){return Ag===!0},setDevMode(n){if(Ag!==null&&!Lg.active)throw new Error("[vault] DevMode has already been initialized.");Ag=n}},dc=(n,e)=>{if(!et.active||typeof globalThis>"u")return;let t=globalThis.sdux??={},r=t.debugWidget??={},i=r.versions??={};i[n]!==e&&(i[n]=e)},sN="@sdux-vault/shared",aN="0.9.0";dc(sN,aN);var w={CoreAfterTap:"coreAfterTap",CoreBeforeTap:"coreBeforeTap",ReplayGlobalError:"replayGlobalError",CoreError:"coreError",CoreErrorCallback:"coreErrorCallback",CoreState:"coreState",Encrypt:"encrypt",CoreEmitState:"coreEmitState",CoreLicense:"coreLicense",ErrorTransform:"errorTransform",Extension:"extension",Filter:"filter",FromObservable:"fromObservable",FromPromise:"fromPromise",FromStream:"fromStream",Interceptor:"interceptor",Merge:"merge",Operator:"operator",Persist:"persist",Reduce:"reduce",Resolve:"resolve",StepwiseFilter:"stepwiseFilter",StepwiseReducer:"stepwiseReducer",StepwiseResolve:"stepwiseResolve",TabSyncState:"tabSyncState"},Od={Error:"error",Warn:"warn",Log:"log",Debug:"debug"},lw={Off:"off",Error:"error",Warn:"warn",Log:"log",Debug:"debug"},uw=lw.Off,cN="[vault]";function Fg(n,...e){let t=lN();if(t===lw.Off)return;let r=[Od.Error,Od.Warn,Od.Log,Od.Debug];r.indexOf(n)<=r.indexOf(t)&&console[n](cN,...e)}var bt=(...n)=>Fg("error",...n),xe=(...n)=>Fg("warn",...n);var Ee=(...n)=>Fg("debug",...n);function dw(n){uw=n??"off"}function lN(){return uw}function uN(n){try{return JSON.stringify(n,dN,2)}catch{return"[unserializable]"}}function dN(n,e){if(typeof e=="function")return"[Function]";if(e instanceof Error)return{message:e.message,stack:e.stack};if(e instanceof Map)return{map:Array.from(e.entries())};if(e instanceof Set)return{set:Array.from(e.values())};try{return JSON.stringify(e),e}catch{return"[Circular]"}}var Ng=class{#t=new ke(null);constructor(){Ee("[VaultPrivateErrorService] initialized (singleton instance created)")}setError(e){Ee(`[VaultPrivateErrorService] setError() ${uN(e)}`),this.#t.next(e)}getError(){return Ee("[VaultPrivateErrorService] getError() \u2192 observable subscribed"),this.#t.asObservable()}clear(){Ee("[VaultPrivateErrorService] clear() \u2192 error reset to null"),this.#t.next(null)}},kg=null;function fw(){return kg?Ee("[VaultPrivateErrorService] returning existing singleton instance"):(Ee("[VaultPrivateErrorService] creating new singleton instance"),kg=new Ng),kg}var Fd=Symbol.for("BEHAVIOR_META"),Bd=Symbol.for("CONTROLLER_META"),pw="vault::devtools::aggregate:feature::cell",hw="vault::devtools::logging::feature::cell",fc=Symbol.for("VAULT_CLEAR_STATE"),Bg=Symbol.for("VAULT_CONTINUE"),jd=Symbol.for("VAULT_NOOP"),jg=Symbol.for("VAULT_STOP");function mw(n){return function(e){e[Fd]=n,n.type!==void 0&&(e.type=n.type),n.key!==void 0&&(e.key=n.key),n.critical!==void 0&&(e.critical=n.critical),n.resolveType!==void 0&&(e.resolveType=n.resolveType),n.wantsConfig!==void 0?e.wantsConfig=n.wantsConfig:e.wantsConfig=!1,n.configKey!==void 0&&(e.configKey=n.configKey),n.needsLicense!==void 0?e.needsLicense=n.needsLicense:e.needsLicense=!1,n.licenseId!==void 0&&(e.licenseId=n.licenseId)}}function Vd(n){return function(e){e[Bd]=n,n.type!==void 0&&(e.type=n.type),n.key!==void 0&&(e.key=n.key),n.critical!==void 0&&(e.critical=n.critical),n.wantsConfig!==void 0?e.wantsConfig=n.wantsConfig:e.wantsConfig=!1,n.configKey!==void 0&&(e.configKey=n.configKey),n.needsLicense!==void 0?e.needsLicense=n.needsLicense:e.needsLicense=!1,n.licenseId!==void 0&&(e.licenseId=n.licenseId)}}var fN={Usage:"VaultErrorUsage",VaultError:"VaultError"},Vg={EncryptionIntegrity:"VaultErrorEncryptionIntegrity",License:"VaultErrorLicense",Usage:"VaultErrorUsage",VaultError:"VaultError"},Pd=class extends Error{kind;constructor(e,t=Vg.VaultError,r=fN.VaultError){super(e),this.name=t,this.kind=r,Object.setPrototypeOf(this,new.target.prototype);let i=Error;typeof i.captureStackTrace=="function"&&i.captureStackTrace(this,new.target)}};var Ug={Encryption:"VaultErrorEncryption",License:"VaultErrorLicense",Promise:"VaultErrorUsagePromise",PromiseFactoryRequired:"VaultErrorUsagePromiseFactoryRequired",Usage:"VaultErrorUsage"},uc=class extends Pd{constructor(e,t=Ug.License){super(e,Vg.License,t)}},Og=class extends Pd{constructor(e,t=Ug.Usage){super(e,Vg.Usage,t)}},Ld=class extends Og{constructor(){super(`Invalid incoming value: Promise detected.

Promises are eager and may resolve or reject before entering the Vault pipeline.

Use the following instead  a DeferredFactory value

This guarantees the promise is created and executed inside the pipeline.`,Ug.Promise)}};var Bn={Attempt:"attempt",Failure:"failure",Finalize:"Finalize Pipeline",Success:"success",Vote:"vote"},tt={Abstain:"abstain",Abort:"abort",Deny:"deny"},ci={CoreAbstain:"coreAbstain",Error:"error",License:"license",Policy:"policy",ReplayGlobalError:"replayGlobalError",Stepwise:"stepwise",TabSync:"tabSync"},Jt={Abort:"abort",Abstain:"abstain",Deny:"deny"},Vt={End:"end",Notification:"notification",Start:"start",Unknown:"unknown"},ut={Conductor:"conductor",Controller:"controller",Lifecycle:"lifecycle",Stage:"stage",Unknown:"unknown"},vn={Merge:"merge",Replace:"replace",Initialize:"initialize"},pc={HttpResource:"http-resource",Observable:"observable",Promise:"promise",Value:"value"};function $g(n,e){return gw("Behavior",n,e)}function gw(n,e,t){let r=i=>i.charAt(0).toUpperCase()+i.slice(1).replace(/[^A-Za-z0-9]/g,"");return`SDUX::${n}::${r(e)}::${r(t)}`}function Hg(n){return typeof n!="string"?!1:/^SDUX::(Behavior|Controller)::[A-Z][A-Za-z0-9]*::[A-Z][A-Za-z0-9]*$/.test(n)}function Ud(n,e){return gw("Controller",n,e)}function yw(n){return Hg(n)}function oo(n,e){let t=Date.now();return n instanceof Error?{message:n.message||"Unexpected error",details:n.stack,raw:n,timestamp:t,featureCellKey:e}:typeof n=="string"?{message:n,details:n,raw:n,timestamp:t,featureCellKey:e}:{message:"Unexpected error",details:n,raw:n,timestamp:t,featureCellKey:e}}function Pg(n,e=new WeakSet){if(n===null||typeof n!="object")return n;let t=n;if(e.has(t))return n;e.add(t),Object.isFrozen(t)||Object.freeze(t);for(let r of Reflect.ownKeys(t)){let i=Object.getOwnPropertyDescriptor(t,r);i&&"value"in i&&Pg(i.value,e)}return n}var oe=n=>{if(n===null||typeof n!="object"||Object.isFrozen(n))return n;try{if(n instanceof Map||n instanceof Set||n instanceof WeakMap||n instanceof WeakSet)try{return structuredClone(n)}catch{return Pg(n)}return structuredClone(n)}catch{let e=Array.isArray(n)?[...n]:Object.assign(Object.create(Object.getPrototypeOf(n)),n);return Pg(e)}},li=n=>n===jd,so=n=>n===fc,$d=n=>n===Bg;var hc=n=>n===void 0,ir=n=>!hc(n),Hd=n=>n==null,gs=n=>typeof n=="function";var pN=n=>{if(n===null||typeof n!="object")return!1;let e=Object.getPrototypeOf(n);return e===Object.prototype||e===null},vw=n=>{if(!pN(n))return!1;let e=n,t=Object.prototype.hasOwnProperty.call(e,"loading")||Object.prototype.hasOwnProperty.call(e,"value")||Object.prototype.hasOwnProperty.call(e,"error"),r=Object.keys(e).length===0;return t||r};function zg(n){return!!n&&(typeof n=="object"||typeof n=="function")&&typeof n.then=="function"}function Wg(n){return!!(n&&typeof n=="object"&&"value"in n&&"isLoading"in n&&"error"in n&&"hasValue"in n)}var hN="@sdux-vault/devtools",mN="0.9.0";dc(hN,mN);var Gg=null;function Xg(){return Gg||(Gg=new Kg),Gg}var Kg=class{#t=new I;constructor(){window.sdux??={},window.sdux.vaultEventBus=this}nextPipeline(e){et.active&&e&&this.#t.next(e)}pipeline$(){return this.#t.asObservable()}},ao={Pipeline:"pipeline",System:"system",Unknown:"unknown",User:"ui"},Zg=class{sub;events=[];errorCount=0;maxEvents=5e3;sequence=0;lastMonotonicByTrace=new Map;traceRefCount=new Map;lastGlobalTimestamp=0;start(e){let t=Xg();if(!t||typeof t.pipeline$!="function"){console.warn("[SDUX] EventBus not available.");return}this.sub=t.pipeline$().subscribe(r=>{let i=this.enrichEvent(r),o=i.traceId??"__unknown";if(this.events.push(i),this.traceRefCount.set(o,(this.traceRefCount.get(o)??0)+1),this.isErrorEvent(i)&&this.errorCount++,this.events.length>this.maxEvents){let s=this.events.shift();s&&(this.isErrorEvent(s)&&(this.errorCount=Math.max(0,this.errorCount-1)),this.evictTrace(s.traceId??"__unknown"))}e?.()})}stop(){this.sub?.unsubscribe(),this.sub=void 0}clear(){this.events=[],this.errorCount=0,this.sequence=0,this.lastMonotonicByTrace.clear(),this.traceRefCount.clear(),this.lastGlobalTimestamp=0}evictTrace(e){let t=(this.traceRefCount.get(e)??1)-1;t<=0?(this.traceRefCount.delete(e),this.lastMonotonicByTrace.delete(e)):this.traceRefCount.set(e,t)}getEvents(){return[...this.events]}getErrorCount(){return this.errorCount}enrichEvent(e){let t=Date.now(),r=typeof performance<"u"&&performance.now?performance.now():0,i=e.traceId??"__unknown",o=this.lastMonotonicByTrace.get(i),s=typeof o=="number"?r-o:0;s<0&&(s=0),this.lastMonotonicByTrace.set(i,r);let a=this.detectScheduler(t),c=this.detectEventLoopPhase(s),l=this.detectSource(e),u=this.detectSource(e),d=this.hashStack();return W(g({},e),{sequenceNumber:++this.sequence,monotonicTimestamp:r,stageDurationMs:s,stackHash:d,scheduler:a,eventLoopPhase:c,latencyCategory:u,source:l})}detectScheduler(e){let t=e-this.lastGlobalTimestamp;return this.lastGlobalTimestamp=e,t<2?"microtask":t<16?"macrotask":"delayed"}detectEventLoopPhase(e){return e===0?"synchronous":e<2?"microtask":e<16?"macrotask":"blocked"}detectSource(e){switch(e.type){case ut.Controller:return ao.User;case ut.Stage:return ao.Pipeline;case ut.Lifecycle:case ut.Conductor:return ao.System}return ao.Unknown}hashStack(){try{let e=new Error().stack??"",t=0;for(let r=0;r<e.length;r++)t=(t<<5)-t+e.charCodeAt(r),t|=0;return`h${Math.abs(t)}`}catch{return"h0"}}isErrorEvent(e){return!!(e.error||typeof e.name=="string"&&e.name.includes("fatal"))}},gN=`
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

`,qg=null;function yN(){return qg||(qg=new Yg),qg}var Yg=class{serializeRegistry(){let e=globalThis?.sdux?.debugWidget?.getRegistry?.();if(!e)return;let t={valid:0,pending:0,revoked:0,timeout:0,notRequired:0},r=o=>{let s=String(o??"").toLowerCase();s==="valid"?t.valid++:s==="pending"?t.pending++:s==="revoked"?t.revoked++:s==="timeout"?t.timeout++:(s==="not-required"||s==="notrequired")&&t.notRequired++},i=Array.from(e.values()).map(o=>{let s=o.behaviors?Array.from(o.behaviors.values()):[],a=o.controllers?Array.from(o.controllers.values()):[];for(let c of s)r(c.validLicense);for(let c of a)r(c.validLicense);return{key:o.key,behaviorsRegistered:!!o.behaviorsRegistered,controllersRegistered:!!o.controllersRegistered,fluentApis:o.fluentApis??null,behaviors:s,controllers:a}});return{totalFeatureCells:i.length,licenseSummary:t,featureCells:i}}buildEventStats(e,t){let r=0,i=null,o={},s={},a={},c={},l={},u={},d={},f=[],p={},m=[],D={},S={},M={},Q=[],Re={},sr=0,fi=0,Ms=0,Lr=0,xs=0,Rs=0,po=0,tv=0,hf=0,mf=0,nv=0,rv=0,gf={},yf=null,AT=[],iv=new Set,ov=new Map,sv=0,av=0,As={},cv=new Map,lv=new Map,ho=null,mo=null,pi={count:0,maxDuration:0};if(Array.isArray(t)&&t.length>0){pi.count=t.length;for(let b of t)b.duration>pi.maxDuration&&(pi.maxDuration=b.duration)}else if(typeof performance<"u"&&performance.getEntriesByType)try{let b=performance.getEntriesByType("longtask");pi.count=b.length;for(let R of b){let X=R.duration??0;X>pi.maxDuration&&(pi.maxDuration=X)}}catch{}for(let b of e){if(!b?.name)continue;o[b.name]=(o[b.name]??0)+1,b.scheduler&&(s[b.scheduler]=(s[b.scheduler]??0)+1),b.eventLoopPhase&&(a[b.eventLoopPhase]=(a[b.eventLoopPhase]??0)+1),(b.error||String(b.name).includes("error"))&&sr++,String(b.name).includes("abstain")&&xs++,String(b.name).includes("success")&&Ms++,String(b.name).includes("noop")&&fi++;let R=typeof b.monotonicTimestamp=="number"?b.monotonicTimestamp:typeof b.timestamp=="number"?b.timestamp:null;if(R!==null){if(i!==null){let P=R-i;P>r&&(r=P)}i=R}if(R!==null){AT.push(R),(ho===null||R<ho)&&(ho=R),(mo===null||R>mo)&&(mo=R);let P=Math.floor(R/16);D[P]=(D[P]??0)+1;let Ae=Math.floor(R/1e3);p[Ae]=(p[Ae]??0)+1}let X=b.traceId??"__unknown";typeof b.timestamp=="number"&&(cv.get(X)===b.timestamp&&(sv++,As[X]=(As[X]??0)+1),cv.set(X,b.timestamp)),c[X]||(c[X]={eventCount:0,firstTimestamp:R,lastTimestamp:R,durationMs:0,stageBreakdown:{},stageSequence:[]},l[X]=[],iv.has(X)&&Rs++,iv.add(X));let ze=c[X];ze.eventCount++;let Ye=b.monotonicTimestamp;if(typeof Ye=="number"){let P=lv.get(X);P===Ye&&av++,typeof P=="number"&&Ye<P&&po++,lv.set(X,Ye)}if(R!==null&&(ze.firstTimestamp=Math.min(ze.firstTimestamp??R,R),ze.lastTimestamp=Math.max(ze.lastTimestamp??R,R),ze.durationMs=ze.lastTimestamp-ze.firstTimestamp),typeof b.stageDurationMs=="number"){let P=b.name,Ae=b.stageDurationMs,tn=b.latencyCategory;tn===ao.User?m.push(Ae):tn===ao.System||(Lr+=Ae,u[P]||(u[P]={count:0,total:0,max:0,min:1/0,avg:0,p95:0},d[P]=[]),u[P].count++,u[P].total+=Ae,u[P].max=Math.max(u[P].max,Ae),u[P].min=Math.min(u[P].min,Ae),d[P].push(Ae),ze.stageBreakdown[P]=(ze.stageBreakdown[P]??0)+Ae),tn===ao.Pipeline&&l[X].push(Ae),ze.stageSequence.push({stage:P,durationMs:Ae})}if("payload"in b){let P=this.#t(b.payload);M[X]=(M[X]??0)+P,String(b.name).includes("persist")&&Q.push({traceId:X,size:P}),P>5e4&&hf++}if("state"in b){nv++;let P=this.#t(b.state);S[X]=(S[X]??0)+P,P>1e5&&hf++;let Ae=0;try{Ae=this.#r(b.state)}catch{Ae=0}mf=Math.max(mf,Ae);let tn="",$n=null;try{tn=JSON.stringify(b.state)}catch($T){$n=$T?.message||"Unknown serialization error",tn="__STATE_SERIALIZATION_ERROR__"}$n&&(rv++,gf[$n]=(gf[$n]??0)+1);let Tt=this.#n(tn),hi=ov.get(X);hi===Tt&&tv++,hi&&hi!==Tt&&f.push(Math.abs(P)),ov.set(X,Tt)}}let Sc=ho!==null&&mo!==null?mo-ho:0,Mc=null,xc=0;for(let b in c){let R=c[b],X=R.durationMs??0,ze=R.eventCount??0;Re[b]=X>2e3&&ze<3,X>xc&&(xc=X,Mc=b);let Ye=l[b]??[];if(Ye.length>0){let P=Ye.slice().sort((Tt,hi)=>Tt-hi),Ae=Ye.reduce((Tt,hi)=>Tt+hi,0)/Ye.length,tn=P[Math.floor(P.length*.95)]??P[P.length-1],$n=P[P.length-1];R.meanStageDuration=Ae,R.p95StageDuration=tn,R.maxStageDuration=$n}if(!yf){let P=R.stageSequence??[];if(P.length>=6){let Ae=P.map(Tt=>Tt.stage),tn=Ae.slice(0,2).join("|"),$n=0;for(let Tt=0;Tt<Ae.length-1&&Ae.slice(Tt,Tt+2).join("|")===tn;Tt+=2)$n++;$n>=3&&(yf={detected:!0,traceId:b,repeatingPattern:tn.split("|"),repetitionCount:$n})}}}let kT=Math.max(0,Sc-Lr),NT=e.length>0?sv/e.length:0,OT=e.length>0?av/e.length:0,uv=null,dv=0;for(let b in As){let R=As[b];R>dv&&(dv=R,uv=b)}let PT=Sc>0?Lr/Sc:0;for(let b in u){let R=u[b];R.avg=R.count>0?R.total/R.count:0;let X=d[b].sort((Ye,P)=>Ye-P),ze=Math.floor(X.length*.95);R.p95=X[ze]??0}let Rc=null,Ac=0;for(let b in u){let R=u[b].total;R>Ac&&(Ac=R,Rc=b)}let fv=[];for(let b in c){let R=c[b],X=R.stageSequence?.length?R.stageSequence:Object.entries(R.stageBreakdown??{}).map(([ze,Ye])=>({stage:ze,durationMs:Ye}));fv.push({traceId:b,stages:X})}let LT=Object.values(M).reduce((b,R)=>b+R,0)/Math.max(1,Object.keys(M).length),FT=f.length>0?f.reduce((b,R)=>b+R,0)/f.length:0,pv;if(m.length>0){let b=m.slice().sort((Ye,P)=>Ye-P),R=m.reduce((Ye,P)=>Ye+P,0)/m.length,X=b[Math.floor(b.length*.95)]??b[b.length-1],ze=b[b.length-1];pv={count:m.length,avgMs:R,p95Ms:X,maxMs:ze}}let BT=Math.max(...Object.values(p),0),jT=Object.keys(p).length>0?nv/Object.keys(p).length:0,VT=this.#e(S),ks={},hv=50;for(let b in c){let R=c[b].eventCount??0;R>=hv&&(ks[b]=R)}let UT=[Re&&Object.values(Re).some(Boolean)?{rank:1,type:"deadlock",id:"deadlockByTrace",evidence:"One or more traces match deadlock heuristics."}:null,Rc?{rank:2,type:"stage-bottleneck",id:Rc,evidence:`Stage has highest total compute time (${Math.round(Ac)}ms).`}:null,Mc?{rank:3,type:"slowest-trace",id:Mc,evidence:`Longest trace duration (${Math.round(xc)}ms).`}:null,ks&&Object.keys(ks).length?{rank:4,type:"fanout",id:Object.keys(ks)[0],evidence:`Fan-out threshold exceeded (\u2265 ${hv} events).`}:null,r>250?{rank:5,type:"stall",id:"maxIdleGapMs",evidence:`Large idle gap detected (${Math.round(r)}ms).`}:null].filter(Boolean);return{totalEvents:e.length,errorEvents:sr,firstEventTimestamp:ho,lastEventTimestamp:mo,totalDurationMs:Sc,longTaskStats:pi,eventTypes:o,traces:c,stageAggregates:u,schedulerDistribution:s,eventLoopPhaseDistribution:a,maxIdleGapMs:r,deadlockByTrace:Re,longestTraceId:Mc,longestTraceDurationMs:xc,traceFanOut:ks,diagnosticSummary:UT,stageBottleneck:Rc,stageBottleneckTimeMs:Ac,pipelineFlamegraph:fv,burstAnalysis:{maxEventsPerFrame:Math.max(...Object.values(D),0)},suppressionStats:{suppressedCount:fi,votePass:Ms,voteAbstain:xs},structuralIntegrity:{duplicateTraceCount:Rs,outOfOrderCount:po},pipelineRecursion:yf,timingIntegrity:{timestampCollisionRate:NT,monotonicCollisionRate:OT,worstCollisionTrace:uv,collisionsPerTrace:As},stateAnalytics:{stateSizePerTrace:S,stateSerializationErrors:rv,stateSerializationErrorMessages:gf,avgPayloadSize:LT,repeatedIdenticalStateCount:tv,largeObjectCount:hf,deepNestingMaxDepth:mf,persistPayloadSizeRanking:Q.sort((b,R)=>R.size-b.size).slice(0,10),stateEntropyScore:VT,avgStateDiffSize:FT,maxChurnPerSecond:BT,avgChurnPerSecond:jT},computeVsIdle:{totalComputeTimeMs:Lr,estimatedIdleTimeMs:kT,computeRatio:PT},userLatencyDistribution:pv}}#t(e){try{return new TextEncoder().encode(JSON.stringify(e)).length}catch{return 0}}#r(e,t=0){return e===null||typeof e!="object"?t:Math.max(t,...Object.values(e).map(r=>this.#r(r,t+1)))}#n(e){let t=0;for(let r=0;r<e.length;r++)t=(t<<5)-t+e.charCodeAt(r),t|=0;return`h${Math.abs(t)}`}#e(e){let t=Object.values(e);if(!t.length)return 0;let r=t.reduce((o,s)=>o+s,0)/t.length,i=t.reduce((o,s)=>o+Math.pow(s-r,2),0)/t.length;return Math.sqrt(i)}getEnvironmentInfo(){let e=navigator.userAgent,t=/chrome|crios|edg|opr/i.test(e),r=/safari/i.test(e)&&!t,i="unknown",o="unknown";/firefox/i.test(e)?(i="firefox",o=(e.match(/firefox\/(\d+)/i)??[])[1]??"unknown"):/edg/i.test(e)?(i="edge",o=(e.match(/edg\/(\d+)/i)??[])[1]??"unknown"):/opr/i.test(e)?(i="opera",o=(e.match(/opr\/(\d+)/i)??[])[1]??"unknown"):t?(i="chrome",o=(e.match(/(?:chrome|crios)\/(\d+)/i)??[])[1]??"unknown"):r&&(i="safari",o=(e.match(/version\/(\d+)/i)??[])[1]??"unknown");let s="unknown";/windows/i.test(e)?s="Windows":/iphone|ipad|ipod/i.test(e)?s="iOS":/android/i.test(e)?s="Android":/mac/i.test(e)?s="MacOS":/linux/i.test(e)&&(s="Linux");let a="desktop";return/mobile/i.test(e)&&(a="mobile"),/tablet|ipad/i.test(e)&&(a="tablet"),{url:location.href,referrer:typeof document<"u"&&document.referrer||null,userAgent:e,browser:i,browserVersion:o,os:s,platform:navigator.platform??"unknown",online:typeof navigator<"u"?navigator.onLine:void 0,deviceType:a,language:navigator.language??"unknown",timezone:Intl.DateTimeFormat().resolvedOptions().timeZone??"unknown",screenResolution:typeof screen<"u"?`${screen.width}x${screen.height}`:"unknown",viewport:typeof window<"u"?`${window.innerWidth}x${window.innerHeight}`:"unknown"}}};function bw(n){let e=new Blob([JSON.stringify(n,null,2)],{type:"application/json"}),t=document.createElement("a");t.href=URL.createObjectURL(e),t.download=`sdux-debug-${Date.now()}.json`,t.click(),URL.revokeObjectURL(t.href)}function vN(){let n=Date.now(),e=gN,t=new Blob([e],{type:"text/markdown"}),r=document.createElement("a");r.href=URL.createObjectURL(t),r.download=`sdux-debug-ai-assist-${n}.md`,r.click(),URL.revokeObjectURL(r.href)}function Cw(n){let e=yN(),t=Date.now(),r=new Date(t).toISOString(),i=typeof performance<"u"&&performance.now?performance.now():null,o=typeof performance<"u"&&performance.getEntriesByType?performance.getEntriesByType("navigation")[0]:null,s;if(typeof performance<"u")try{s=performance.getEntriesByType("longtask")?.map(u=>({start:u.startTime,duration:u.duration}))}catch{}let a=e.serializeRegistry(),c=e.buildEventStats(n,s);return{timestamp:t,isoTime:r,highResolution:{monotonicNow:i,timeOrigin:typeof performance<"u"?performance.timeOrigin:null},runtime:{hardwareConcurrency:typeof navigator<"u"?navigator.hardwareConcurrency??null:null,deviceMemory:typeof navigator<"u"?navigator.deviceMemory??null:null,connectionType:typeof navigator<"u"?navigator.connection?.effectiveType??null:null},navigation:o?{type:o.type,domComplete:o.domComplete,loadEventEnd:o.loadEventEnd}:void 0,environment:e.getEnvironmentInfo(),longTasks:s,events:n,stats:c,versions:globalThis?.sdux?.debugWidget?.versions??{},registry:a}}function bN(n){let e=Cw(n);bw(e);let i=`https://github.com/sdux-vault/vault/issues/new?template=issue_report.md&body=${encodeURIComponent(`## Issue Summary
Describe the problem.

---

## What Happened?

Describe the behavior you observed.

---

## What Did You Expect to Happen?

Describe the expected behavior.

---

## Debug Dump

Attach the downloaded **sdux-debug-${e.timestamp}.json** file.

The file was automatically downloaded when you clicked "Report Issue".
`)}`;window.open(i,"_blank")}function CN(n,e=1){let t=new Blob([n],{type:"application/json"}),r=URL.createObjectURL(t),i=document.createElement("a");i.href=r,i.download=`sdux-pipeline-trace-x${e}-${Date.now()}.json`,i.click(),URL.revokeObjectURL(r)}var ui={Begin:"B",End:"E",Instant:"I",Meta:"M",Complete:"X"};function _N(n,e=1){let t=[],r=new Map,i=new Map,o=0;t.push({name:"process_name",ph:ui.Meta,pid:1,args:{name:"SDUX Pipeline Debugger"}}),t.push({name:"trace_scale",ph:ui.Meta,pid:1,args:{scale:e}});let s=new Set,a=[...n].sort((l,u)=>{let d=l.sequenceNumber??0,f=u.sequenceNumber??0;return d-f}),c=new Map;if(a.length>0){let l=a[0].monotonicTimestamp??0,u=0,d=l;for(let f=0;f<a.length;f++){let p=a[f],m=p.monotonicTimestamp??d,D=p.sequenceNumber??f;if(f===0){c.set(D,0),d=m;continue}let S=Math.max(0,m-d),M;e<=1?M=Math.floor(S*1e3):S<=2?M=Math.floor(S*1e3*e):S<=16?M=Math.floor(S*1e3*Math.max(2,Math.floor(e/4))):M=1e3,u+=M,c.set(D,u),d=m}}for(let l=0;l<a.length;l++){let u=a[l],d=u.traceId??"main",f=u.sequenceNumber??l,p=c.get(f)??0,[m,D,S]=(u.name??"").split(":"),M=u.type,Q=`${d}:${M}:${m}:${S}`;if(s.has(d)||(s.add(d),t.push({name:"thread_name",ph:ui.Meta,pid:1,tid:d,args:{name:`Pipeline ${d.slice(0,8)}`}})),i.has(d)||(i.set(d,o++),t.push({name:"thread_sort_index",ph:ui.Meta,pid:1,tid:d,args:{sort_index:i.get(d)}})),u.boundary===Vt.Start){r.has(Q)||r.set(Q,[]),r.get(Q).push(p),t.push({name:S,cat:M,ph:ui.Begin,ts:p,pid:1,tid:d,args:{cell:u.cell,behavior:u.behaviorKey,scheduler:u.scheduler,source:u.source,latency:u.latencyCategory}});continue}if(u.boundary===Vt.End){let Lr=r.get(Q);if(Lr&&Lr.length){let xs=Lr.pop(),Rs=50,po=p;po-xs<Rs&&(po=xs+Rs),t.push({name:S,cat:M,ph:ui.End,ts:po,pid:1,tid:d})}continue}let Re=20*e,sr=Math.max(0,p-Re),fi=sr===0?Re:p,Ms=`${S}:${D} (synthetic)`;t.push({name:Ms,cat:M,ph:ui.Begin,ts:sr,pid:1,tid:d,args:{synthetic:!0,actualDurationMs:0,note:"Synthetic span time added for visualization"}}),t.push({name:Ms,cat:M,ph:ui.End,ts:fi,pid:1,tid:d,args:{synthetic:!0,actualDurationMs:0,note:"Synthetic time span added for visualization"}})}return JSON.stringify({traceEvents:t},null,2)}var Qg=class extends HTMLElement{recorder=new Zg;recording=!1;minimized=!0;exportMenuOpen=!1;dragOffsetX=0;dragOffsetY=0;dragging=!1;abortController=new AbortController;connectedCallback(){this.attachShadow({mode:"open"}),this.style.position="fixed",this.style.top="80px",this.style.right="20px",this.style.zIndex="999999";let e=localStorage.getItem("sdux-debug-state");if(e)try{let{left:t,top:r,minimized:i}=JSON.parse(e);t&&r&&(this.style.left=t,this.style.top=r,this.style.right="auto"),this.minimized=!!i}catch{}this.render(),document.addEventListener("sdux-license-resolved",()=>{this.updateButtonState()},{signal:this.abortController.signal})}disconnectedCallback(){this.abortController.abort(),this.timerInterval&&(clearInterval(this.timerInterval),this.timerInterval=null),this.recorder.stop(),this.recording=!1}render(){if(!this.shadowRoot)return;this.shadowRoot.innerHTML=`
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
  `,this.shadowRoot?.getElementById("aiAssist")?.addEventListener("click",()=>{vN()});let t=this.shadowRoot.getElementById("export"),r=this.shadowRoot.getElementById("exportMenu");t?.addEventListener("click",a=>{a.stopPropagation(),this.exportMenuOpen=!this.exportMenuOpen,r?.classList.toggle("open",this.exportMenuOpen)}),this.shadowRoot.getElementById("close")?.addEventListener("click",a=>{a.stopPropagation(),this.remove()}),this.updateButtonState(),this.shadowRoot.getElementById("help")?.addEventListener("click",a=>{a.stopPropagation(),this.openHelp()}),this.shadowRoot.getElementById("recordToggle")?.addEventListener("click",a=>{a.stopPropagation(),this.recording?this.stop():this.start(),this.updateRecordingUI()}),this.shadowRoot.getElementById("panel")?.addEventListener("pointerdown",a=>this.startDrag(a)),this.shadowRoot.getElementById("downloadDump")?.addEventListener("click",a=>{a.stopPropagation(),s(),this.downloadDebugDump()}),this.shadowRoot.getElementById("downloadTrace")?.addEventListener("click",a=>{a.stopPropagation(),s(),this.downloadTraceDump()}),this.shadowRoot.getElementById("downloadTrace1000")?.addEventListener("click",a=>{a.stopPropagation(),s(),this.downloadTraceDump(1e3)}),this.shadowRoot.getElementById("clear")?.addEventListener("click",a=>{a.stopPropagation(),this.clear()}),this.shadowRoot.getElementById("minimize")?.addEventListener("click",this.toggleMinimize),this.shadowRoot.getElementById("createIssue")?.addEventListener("click",a=>{a.stopPropagation(),this.createIssue()});let o=this.abortController.signal;document.addEventListener("pointermove",this.onDrag,{signal:o}),document.addEventListener("pointerup",this.stopDrag,{signal:o}),document.addEventListener("pointerdown",a=>{if(!this.exportMenuOpen)return;let c=a.composedPath();r&&!c.includes(r)&&s()},{signal:o});let s=()=>{r?.classList.remove("open"),this.exportMenuOpen=!1}}updateEventCount(){if(!this.shadowRoot)return;let e=this.shadowRoot.getElementById("eventCount"),t=this.shadowRoot.getElementById("eventErrorCount"),r=this.recorder.getEvents().length,i=this.recorder.getErrorCount();if(e&&(e.textContent=String(r)),t){let o=Number(t.textContent??"0");i>o&&(t.classList.remove("bump"),t.offsetWidth,t.classList.add("bump")),t.textContent=String(i)}}updateRecordingUI(){if(!this.shadowRoot)return;let e=this.shadowRoot.getElementById("recordToggle"),t=this.shadowRoot.querySelector(".record-dot"),r=this.shadowRoot.getElementById("sessionTimer"),i=this.shadowRoot.querySelector(".title-container");if(e&&(e.textContent=this.recording?"Stop":"Record"),!this.recording){t&&t.remove(),r&&(r.textContent="");return}if(!t&&i){let o=document.createElement("div");o.className="record-dot",i.insertBefore(o,i.children[1])}r&&(r.textContent=this.getSessionTime())}sessionStartTime=null;timerInterval=null;pausedDuration=0;pauseStart=null;startDrag(e){this.dragging=!0,this.dragOffsetX=e.clientX-this.offsetLeft,this.dragOffsetY=e.clientY-this.offsetTop}onDrag=e=>{this.dragging&&(this.style.left=`${e.clientX-this.dragOffsetX}px`,this.style.top=`${e.clientY-this.dragOffsetY}px`,this.style.right="auto")};stopDrag=()=>{this.dragging=!1,this.persistState()};toggleMinimize=e=>{e.stopPropagation(),this.minimized=!this.minimized,this.persistState(),this.render()};persistState(){localStorage.setItem("sdux-debug-state",JSON.stringify({left:this.style.left,top:this.style.top,minimized:this.minimized}))}updateButtonState(){if(!this.shadowRoot)return;let e=this.shadowRoot.getElementById("recordToggle"),t=this.shadowRoot.getElementById("export"),r=this.shadowRoot.getElementById("clear"),i=this.shadowRoot.getElementById("createIssue"),o=this.shadowRoot.getElementById("aiAssist"),s=this.recorder.getEvents().length>0,a=!!globalThis.sdux?.debugWidget?.aiAssistEnabled;e&&(e.disabled=!1);let c=!s||this.recording;t&&(t.disabled=c),i&&(i.disabled=c),r&&(r.disabled=c),o&&(o.disabled=c||!a)}start(){if(this.recording)return;let e=Date.now();this.sessionStartTime||(this.sessionStartTime=e),this.pauseStart&&(this.pausedDuration+=e-this.pauseStart,this.pauseStart=null),this.timerInterval=window.setInterval(()=>{let t=this.shadowRoot?.getElementById("sessionTimer");t&&(t.textContent=this.getSessionTime())},1e3),this.recorder.start(()=>{this.updateEventCount(),this.updateButtonState()}),this.recording=!0,this.updateRecordingUI(),this.updateButtonState(),console.info("[SDUX] Recording started")}getSessionTime(){if(!this.sessionStartTime)return"";let e=Date.now()-this.sessionStartTime-this.pausedDuration,t=Math.floor(e/1e3),r=Math.floor(t/60),i=t%60;return`${r}:${i.toString().padStart(2,"0")}`}stop(){this.recording&&(this.recorder.stop(),this.recording=!1,this.pauseStart=Date.now(),this.updateRecordingUI(),this.timerInterval&&(clearInterval(this.timerInterval),this.timerInterval=null),this.updateButtonState(),console.info("[SDUX] Recording stopped"))}downloadDebugDump(){let e=Cw(this.recorder.getEvents());bw(e),console.info("[SDUX] Logging dump generated")}downloadTraceDump(e=1){let t=_N(this.recorder.getEvents(),e);CN(t,e),console.info("[SDUX] Trace dump generated")}createIssue(){bN(this.recorder.getEvents()),console.info("[SDUX] Issue dump generated and redirected")}clear(){if(!this.recorder.getEvents().length||!confirm("Clear all recorded events?"))return;this.recorder.clear(),this.sessionStartTime=null,this.pausedDuration=0,this.pauseStart=null;let e=this.shadowRoot?.getElementById("sessionTimer");e&&(e.textContent=""),this.updateEventCount(),this.updateButtonState(),console.info("[SDUX] Events cleared")}openHelp(){window.open("/docs/dev-tools/built-in-debugger","_blank","noopener,noreferrer")}};function DN(){if(!customElements.get("sdux-debug"))try{customElements.define("sdux-debug",Qg)}catch{}if(document.querySelector("sdux-debug"))return;let n=document.createElement("sdux-debug");document.body.appendChild(n)}function _w(){if(!et.active||typeof window>"u"||(globalThis.sdux??={},globalThis.sdux.debugWidget??={},globalThis.sdux.debugWidget.injected))return;globalThis.sdux.debugWidget.injected=!0;let n=()=>DN();document.readyState==="loading"?document.addEventListener("DOMContentLoaded",n,{once:!0}):n()}var EN="@sdux-vault/engine",wN="0.28.0";dc(EN,wN);var ys="vault-conductor",Wd,ny=class{static{Wd=this}controllerCtx;static type;static key;static critical;type=Wd.type;critical=Wd.critical;key;#t=!1;#r=!1;constructor(t,r){this.controllerCtx=r,this.key=t}handleMessage(t){switch(Ee(`${this.key} handleMessage received "${t.type}" for trace "${t.traceId}".`),t.type){case Bn.Attempt:{let{ctx:r}=t;return this.#r?T(tt.Abort):r.operation===vn.Initialize?T(tt.Abstain):T(this.#t?tt.Abstain:tt.Deny)}case Bn.Finalize:return this.#t=!0,T();case Bn.Success:return this.#t=!0,T();case Bn.Failure:return t.ctx.operation===vn.Initialize&&(this.#r=!0),T();default:return T(tt.Abstain)}}destroy(){xe(`${this.key} - destroy noop`)}reset(){xe(`${this.key} - reset noop`)}};ny=Wd=Us([Vd({type:ci.CoreAbstain,key:Ud("Policy","CoreAbstain"),critical:!1})],ny);var Gd,ry=class{static{Gd=this}controllerCtx;static type;static key;static critical;type=Gd.type;critical=Gd.critical;key;ctx;constructor(t,r){this.controllerCtx=r,this.key=t,this.ctx=r}handleMessage(t){return Ee(`${this.key} handleMessage received "${t.type}" for trace "${t.traceId}".`),t.type===Bn.Failure?(Ee(`${this.key} ABORT \u2014 default failure handler for trace "${t.traceId}"`),this.ctx.requestAbort(t.traceId),T()):T(tt.Abstain)}destroy(){xe(`${this.key} - destroy noop`)}reset(){xe(`${this.key} - reset noop`)}};ry=Gd=Us([Vd({type:ci.Error,key:Ud("Policy","CoreError"),critical:!1})],ry);var or={RequireLicense:"requireLicense",ValidateLicense:"validateLicense",LicenseStatus:"licenseStatus",DescribeFeature:"describe-feature",DescribeBehaviors:"describe-behaviors",DescribeControllers:"describe-controllers"},Kd=null;function TN(n,e){Kd||(Kd=new iy(n,e))}function mc(){if(!Kd)throw new Error("[vault] LicensingService not initialized.");return Kd}var iy=class{events$;validation$;constructor(e,t){this.events$=e,this.validation$=t}describeFeature(e){e.type=or.DescribeFeature,this.events$.next(e)}describeBehaviors(e){e.type=or.DescribeBehaviors,this.events$.next(e)}describeControllers(e){e.type=or.DescribeControllers,this.events$.next(e)}requestLicense(e,t){if(!t)throw new Error("[vault] Cannot register controller license without a key.");let r=this.#t();return this.events$.next({featureCellKey:e,key:t,licenseToken:r,type:or.RequireLicense}),r}validateLicense(e,t,r,i){this.events$.next({featureCellKey:e,key:t,licenseToken:r,type:or.ValidateLicense,valid:i})}#t(){let e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",t=r=>Array.from({length:r},()=>e[Math.floor(Math.random()*e.length)]).join("");return`${t(5)}-${t(5)}`}getLicenseValidation$(){return this.validation$}};var qd,oy=class{static{qd=this}controllerCtx;static type;static key;static critical;type=qd.type;critical=qd.critical;key;#t=null;#r;constructor(t,r){this.controllerCtx=r,this.key=t;let i=r.featureCellKey;this.#r=mc().getLicenseValidation$().pipe(ye(o=>o.featureCellKey===i)).subscribe(o=>{this.#t=o.approved,this.#r?.unsubscribe();let s=`${i}::license`;o.approved?r?.licenseApproved?.(s):r?.licenseDenied?.(s)})}handleMessage(t){return Ee(`${this.key} received "${t.type}" for trace "${t.traceId}".`),t.type===Bn.Attempt?this.#t?T(tt.Abstain):this.#t===null?T(tt.Deny):T(tt.Abort):T()}destroy(){this.#r?.unsubscribe(),xe(`${this.key} - destroy unsubscribe`)}reset(){xe(`${this.key} - reset noop`)}};oy=qd=Us([Vd({type:ci.License,key:Ud("Policy","CoreLicense"),critical:!0})],oy);var sy=class{evaluateAttempt(e,t){if(e.length===0)return T(this.arbitrate(t.traceId,[tt.Abstain]));try{let r=e.map(i=>i.handleMessage(t).pipe(te(o=>o??tt.Abstain),lr(o=>(xe("[vault:arbitrator] controller threw during attempt:",o),T(tt.Deny)))));return gl(r).pipe(te(i=>this.arbitrate(t.traceId,i)))}catch{return T(this.arbitrate(t.traceId,[tt.Deny]))}}notify(e,t){if(e.length===0)return T(void 0);try{let r=e.map(i=>i.handleMessage(t).pipe(te(()=>{}),lr(o=>(xe("[vault:arbitrator] controller threw during notify:",o),T(void 0)))));return gl(r).pipe(te(()=>{}))}catch{return T(void 0)}}arbitrate(e,t){return t.includes(tt.Abort)?{traceId:e,outcome:Jt.Abort}:t.includes(tt.Deny)?{traceId:e,outcome:Jt.Deny}:t.every(s=>s===tt.Abstain)?{traceId:e,outcome:Jt.Abstain}:(bt("Unknown controller vote detected",{traceId:e,votes:t}),{traceId:e,outcome:Jt.Deny})}},x={Boundary:"boundary",State:"state",Error:"error"},Ut={Never:"never",Optional:"optional",Required:"required"},IN={[x.Boundary]:{state:Ut.Never,payload:Ut.Optional,error:Ut.Never},[x.State]:{state:Ut.Required,payload:Ut.Optional,error:Ut.Never},[x.Error]:{state:Ut.Required,payload:Ut.Optional,error:Ut.Required}},SN={"stage:end:core-state":{category:x.State},"stage:end:core-emit-state":{category:x.State},"lifecycle:end:merge":{category:x.State},"lifecycle:end:replace":{category:x.State},"stage:end:compute-merge":{category:x.State},"stage:end:reducer":{category:x.State},"stage:end:resolve":{category:x.State},"lifecycle:notification:failure":{category:x.Error},"lifecycle:notification:runtime-error":{category:x.Error},"lifecycle:notification:warn":{category:x.Error},"lifecycle:notification:fatal":{category:x.Error},"conductor:start:abort":{category:x.Boundary},"conductor:start:deny":{category:x.Boundary},"conductor:start:revote":{category:x.Boundary},"controller:end:vote":{category:x.Boundary},"conductor:start:license-approved":{category:x.Boundary},"conductor:start:license-attempt":{category:x.Boundary},"controller:end:attempt":{category:x.Boundary},"controller:notification:finalize":{category:x.Boundary},"controller:notification:success":{category:x.Boundary},"controller:restart:restart-controller-attempt":{category:x.Boundary},"controller:start:attempt":{category:x.Boundary},"controller:start:vote":{category:x.Boundary},"lifecycle:end:initialized":{category:x.Boundary},"lifecycle:start:core-callback-error":{category:x.Boundary},"lifecycle:start:core-error":{category:x.Boundary},"lifecycle:start:core-state":{category:x.Boundary},"lifecycle:start:global-error":{category:x.Boundary},"lifecycle:start:initialized":{category:x.Boundary},"lifecycle:start:merge":{category:x.Boundary},"lifecycle:start:replace":{category:x.Boundary},"lifecycle:start:error-transform":{category:x.Boundary},"lifecycle:end:error-transform":{category:x.Boundary},"lifecycle:end:core-callback-error":{category:x.Boundary},"lifecycle:end:core-error":{category:x.Boundary},"lifecycle:end:global-error":{category:x.Boundary},"stage:end:after-tap":{category:x.Boundary},"stage:end:before-tap":{category:x.Boundary},"stage:end:encrypt":{category:x.Boundary},"stage:end:filter":{category:x.Boundary},"stage:end:load-persist":{category:x.Boundary},"stage:end:operator":{category:x.Boundary},"stage:end:persist":{category:x.Boundary},"stage:start:after-tap":{category:x.Boundary},"stage:start:before-tap":{category:x.Boundary},"stage:start:compute-merge":{category:x.Boundary},"stage:start:encrypt":{category:x.Boundary},"stage:start:filter":{category:x.Boundary},"stage:start:load-persist":{category:x.Boundary},"stage:start:operator":{category:x.Boundary},"stage:start:persist":{category:x.Boundary},"stage:start:reducer":{category:x.Boundary},"stage:start:resolve":{category:x.Boundary}},Jg=null;function MN(){return Jg||(Jg=new ay),Jg}var ay=class{globalInsightOverride=null;cellRegistry=new Map},cy=class{shared=MN();key=$g("DevTools","Telemetry");get globalInsightOverride(){return this.shared.globalInsightOverride}set globalInsightOverride(e){this.shared.globalInsightOverride=e}get cellRegistry(){return this.shared.cellRegistry}registerCell(e,t){let r=!!t;this.cellRegistry.set(e,{hasInsight:r,insights:r?[t]:[]})}activateGlobalInsights(e){this.globalInsightOverride=e}isChromeDevTools(e){return e===hw||e===pw}applyPolicy(e,t){let r=SN[e.name]?.category??x.Boundary,i=IN[r],o=!!t?.wantsState,s=!!t?.wantsPayload,a=!!t?.wantsErrors;return e.source||delete e.source,(!o||i.state===Ut.Never)&&delete e.state,(!s||i.payload===Ut.Never||i.payload===Ut.Optional&&e.payload===void 0)&&delete e.payload,!a||i.error===Ut.Never?delete e.error:i.error===Ut.Required&&(!s||e.payload===void 0)&&delete e.payload,e}},ey=null;function vy(){return ey||(ey=new ly),ey}var ly=class extends cy{#t=Xg();constructor(){super(),typeof window<"u"&&(window.sdux??={},window.sdux.vaultMonitorInstance=this)}#r(e){let t=e?.snapshot??e?.state??{};return{isLoading:t.isLoading??!1,value:t.value??void 0,error:t.error??null,hasValue:t.hasValue??!!t.value}}startAfterTap(e,t,r){this.#e({cell:e,behaviorKey:t,name:"after-tap",ctx:r})}endAfterTap(e,t,r,i){this.#i({cell:e,behaviorKey:t,name:"after-tap",ctx:r,payload:i})}startBeforeTap(e,t,r){this.#e({cell:e,behaviorKey:t,name:"before-tap",ctx:r})}endBeforeTap(e,t,r,i){this.#i({cell:e,behaviorKey:t,name:"before-tap",ctx:r,payload:i})}startClearPersist(e,t,r){this.#a({cell:e,behaviorKey:t,name:"clear-persist",ctx:r})}endClearPersist(e,t,r){this.#c({cell:e,behaviorKey:t,name:"clear-persist",ctx:r})}startComputeMerge(e,t,r){this.#e({cell:e,behaviorKey:t,name:"compute-merge",ctx:r})}endComputeMerge(e,t,r){this.#i({cell:e,behaviorKey:t,name:"compute-merge",ctx:r})}notifyConductorDeny(e,t,r){this.#l({cell:e,behaviorKey:t,name:"deny",ctx:r})}conductorCrashed(e,t,r,i){let o=oo(i,e),s="fatal";bt(e,t,o),this.#s({cell:e,behaviorKey:t,name:s,ctx:r,payload:{message:"This has proven to be untested code in unit tests. So you win some type of prize. Please create a github issues and share your amazing gift to bring down a systm."},error:o})}conductorRevote(e,t,r){this.#s({cell:e,behaviorKey:t,name:"revote",ctx:r})}conductorAbort(e,t,r){this.#s({cell:e,behaviorKey:t,name:"abort",ctx:r})}conductorLicenseAttempt(e,t){this.#s({cell:e,behaviorKey:t,name:"license-attempt",ctx:{}})}conductorLicenseApproved(e,t){this.#s({cell:e,behaviorKey:t,name:"license-approved",ctx:{}})}conductorLicenseDenied(e,t){this.#s({cell:e,behaviorKey:t,name:"license-denied",ctx:{}})}startControllerAttempt(e,t,r){this.#d({cell:e,behaviorKey:t,name:"attempt",ctx:r})}endControllerAttempt(e,t,r,i){this.#u({cell:e,behaviorKey:t,name:"attempt",ctx:r,payload:i})}restartControllerAttempt(e,t,r,i){this.#f({cell:e,behaviorKey:t,name:"restart-attempt",ctx:r,payload:i})}controllerFailure(e,t,r){let i=oo(r,e);this.#s({cell:t.featureCellKey,behaviorKey:e,name:"failure",ctx:t,error:i})}controllerFinalize(e,t){this.#s({cell:t.featureCellKey,behaviorKey:e,name:"finalize",ctx:t})}controllerSuccess(e,t){this.#s({cell:t.featureCellKey,behaviorKey:e,name:"success",ctx:t})}startControllerVote(e,t,r){this.#d({cell:e,behaviorKey:t,name:"vote",ctx:r})}endControllerVote(e,t,r,i){this.#u({cell:e,behaviorKey:t,name:"vote",ctx:r,payload:i})}startCoreCallbackError(e,t,r){this.#e({cell:e,behaviorKey:t,name:"core-callback-error",ctx:r})}endCoreCallbackError(e,t,r){this.#i({cell:e,behaviorKey:t,name:"core-callback-error",ctx:r})}startCoreEmitState(e,t,r){this.#e({cell:e,behaviorKey:t,name:"core-emit-state",ctx:r})}endCoreEmitState(e,t,r){this.#i({cell:e,behaviorKey:t,name:"core-emit-state",ctx:r})}startCoreError(e,t,r){this.#e({cell:e,behaviorKey:t,name:"core-error",ctx:r})}endCoreError(e,t,r){this.#i({cell:e,behaviorKey:t,name:"core-error",ctx:r})}startCoreState(e,t,r){this.#e({cell:e,behaviorKey:t,name:"core-state",ctx:r})}endCoreState(e,t,r){this.#i({cell:e,behaviorKey:t,name:"core-state",ctx:r})}startDecrypt(e,t,r){this.#e({cell:e,behaviorKey:t,name:"decrypt",ctx:r})}endDecrypt(e,t,r,i){this.#i({cell:e,behaviorKey:t,name:"decrypt",ctx:r,payload:i})}startDestroy(e,t,r){this.#a({cell:e,behaviorKey:t,name:"destroy",ctx:r})}endDestroy(e,t,r,i){this.#c({cell:e,behaviorKey:t,name:"destroy",ctx:r,payload:i})}startEncrypt(e,t,r){this.#e({cell:e,behaviorKey:t,name:"encrypt",ctx:r})}endEncrypt(e,t,r){this.#i({cell:e,behaviorKey:t,name:"encrypt",ctx:r})}runtimeError(e,t,r,i){let o=oo(i,e);bt(e,t,o),this.#s({cell:e,behaviorKey:t,name:"runtime-error",ctx:r,error:o})}startErrorTransform(e,t,r){this.#e({cell:e,behaviorKey:t,name:"error-transform",ctx:r})}endErrorTransform(e,t,r,i){this.#i({cell:e,behaviorKey:t,name:"error-transform",ctx:r,payload:i})}startFilter(e,t,r){this.#e({cell:e,behaviorKey:t,name:"filter",ctx:r})}endFilter(e,t,r){this.#i({cell:e,behaviorKey:t,name:"filter",ctx:r})}startGlobalError(e,t,r){this.#a({cell:e,behaviorKey:t,name:"global-error",ctx:r})}endGlobalError(e,t,r){this.#c({cell:e,behaviorKey:t,name:"global-error",ctx:r})}ingressSubscribed(e,t,r,i){this.#a({cell:e,behaviorKey:t,name:"ingress-subscribed",ctx:r,source:i})}ingressCompleted(e,t,r,i){this.#c({cell:e,behaviorKey:t,name:"ingress-completed",ctx:r,source:i})}startInitialized(e,t,r){this.#a({cell:e,behaviorKey:t,name:"initialized",ctx:r})}endInitialized(e,t,r){this.#c({cell:e,behaviorKey:t,name:"initialized",ctx:r})}startInterceptor(e,t,r){this.#e({cell:e,behaviorKey:t,name:"interceptor",ctx:r})}endInterceptor(e,t,r,i){this.#i({cell:e,behaviorKey:t,name:"interceptor",ctx:r,payload:i})}startLoadPersist(e,t,r){this.#e({cell:e,behaviorKey:t,name:"load-persist",ctx:r})}endLoadPersist(e,t,r,i){this.#i({cell:e,behaviorKey:t,name:"load-persist",ctx:r,payload:i})}startMerge(e,t,r){this.#a({cell:e,behaviorKey:t,name:"merge",ctx:r})}endMerge(e,t,r,i){this.#c({cell:e,behaviorKey:t,name:"merge",ctx:r,payload:i})}startOperator(e,t,r){this.#e({cell:e,behaviorKey:t,name:"operator",ctx:r})}endOperator(e,t,r,i){this.#i({cell:e,behaviorKey:t,name:"operator",ctx:r,payload:i})}startPersist(e,t,r){this.#e({cell:e,behaviorKey:t,name:"persist",ctx:r})}endPersist(e,t,r){this.#i({cell:e,behaviorKey:t,name:"persist",ctx:r})}startReducer(e,t,r){this.#e({cell:e,behaviorKey:t,name:"reducer",ctx:r})}endReducer(e,t,r){this.#i({cell:e,behaviorKey:t,name:"reducer",ctx:r})}startReplace(e,t,r){this.#a({cell:e,behaviorKey:t,name:"replace",ctx:r})}endReplace(e,t,r,i){this.#c({cell:e,behaviorKey:t,name:"replace",ctx:r,payload:i})}startReset(e,t,r){this.#a({cell:e,behaviorKey:t,name:"reset",ctx:r})}endReset(e,t,r,i){this.#c({cell:e,behaviorKey:t,name:"reset",ctx:r,payload:i})}startResolve(e,t,r){this.#e({cell:e,behaviorKey:t,name:"resolve",ctx:r})}endResolve(e,t,r){this.#i({cell:e,behaviorKey:t,name:"resolve",ctx:r})}startSetInitialValue(e,t,r){this.#a({cell:e,behaviorKey:t,name:"set-initial-value",ctx:r})}endSetInitialValue(e,t,r){this.#c({cell:e,behaviorKey:t,name:"set-initial-value",ctx:r})}startStepwise(e,t,r){this.#e({cell:e,behaviorKey:t,name:"stepwise",ctx:r})}endStepwise(e,t,r){this.#i({cell:e,behaviorKey:t,name:"stepwise",ctx:r})}warn(e,t,r,i){let o=oo(i,e);xe(e,t,o),this.#s({cell:e,behaviorKey:t,name:"warn",ctx:r,error:o})}#n(e){return e.name=`${e.type}:${e.boundary}:${e.name}`,e}#e(e){e.type=ut.Stage,e.boundary=Vt.Start,this.#o(this.#n(e))}#i(e){e.type=ut.Stage,e.boundary=Vt.End,this.#o(this.#n(e))}#a(e){e.type=ut.Lifecycle,e.boundary=Vt.Start,this.#o(this.#n(e))}#c(e){e.type=ut.Lifecycle,e.boundary=Vt.End,this.#o(this.#n(e))}#s(e){e.type=ut.Lifecycle,e.boundary=Vt.Notification,this.#o(this.#n(e))}#l(e){e.type=ut.Conductor,e.boundary=Vt.Notification,this.#o(this.#n(e))}#d(e){e.type=ut.Controller,e.boundary=Vt.Start,this.#o(this.#n(e))}#u(e){e.type=ut.Controller,e.boundary=Vt.End,this.#o(this.#n(e))}#f(e){e.type=ut.Controller,e.boundary=Vt.Notification,this.#o(this.#n(e))}#o(e){let{cell:t,ctx:r,name:i,behaviorKey:o,source:s,error:a,payload:c,type:l,boundary:u}=e;if(this.isChromeDevTools(t)||!et.active)return;let d;if(this.globalInsightOverride)d=this.globalInsightOverride;else{let p=this.cellRegistry.get(t);if(!p||!p.hasInsight)return;d=p.insights[0]}let f={id:crypto.randomUUID(),cell:t,behaviorKey:o,name:i,timestamp:Date.now(),state:this.#r(r),type:l??ut.Unknown,boundary:u??Vt.Unknown,payload:c,error:a,source:s};r.traceId&&(f.traceId=r.traceId),this.#t.nextPipeline(this.applyPolicy(f,d))}},bn={Abort:"abort",Failure:"failure",LicenseApproved:"licenseApproved",LicenseDenied:"licenseDenied",Revote:"revote",Success:"success"},uy=class{controllers;events$;#t=new sy;#r=vy();constructor(e,t){this.controllers=e,this.events$=t}evaluateAttempt(e){let t={type:Bn.Attempt,traceId:e.traceId,ctx:e};return this.#t.evaluateAttempt(this.controllers,t)}notifySuccess(e){if(!this.controllers.length)return;let t={type:Bn.Success,traceId:e.traceId,ctx:e};this.#r.controllerSuccess("decision-engine",e),this.#t.notify(this.controllers,t).subscribe({complete:()=>{this.events$.closed||this.events$.next({traceId:e.traceId,type:bn.Success})}})}notifyFailure(e,t){if(!this.controllers.length)return;let r={type:Bn.Failure,traceId:e.traceId,ctx:e,error:t};this.#r.controllerFailure("decision-engine",e,t),this.#t.notify(this.controllers,r).subscribe({complete:()=>{this.events$.closed||this.events$.next({traceId:e.traceId,type:bn.Failure})}})}notifyFinalize(e){if(!this.controllers.length)return;let t={type:Bn.Finalize,traceId:e.traceId};this.#r.controllerFinalize("decision-engine",e),this.#t.notify(this.controllers,t).subscribe()}},we="vault-orchestrator",xN=new Set(["initialize","destroy","destroyed$","reset","reset$","reducers","operators","filters","interceptors","mergeState","replaceState","beforeTaps","afterTaps","key","state","cache","persist","encrypt","beforeTap","afterTap","hydrate"]),Rr={NotRequired:"not-required",Pending:"pending",Revoked:"revoked",Timeout:"timeout",Valid:"valid"},RN=new Set(["SDUX::Behavior::Core::AfterTap","SDUX::Behavior::Core::ArrayMerge","SDUX::Behavior::Core::BeforeTap","SDUX::Behavior::Core::EmitState","SDUX::Behavior::Core::Error","SDUX::Behavior::Core::ErrorCallback","SDUX::Behavior::Core::Filter","SDUX::Behavior::Core::FromObservable","SDUX::Behavior::Core::FromPromise","SDUX::Behavior::Core::FromStream","SDUX::Behavior::Core::ObjectMerge","SDUX::Behavior::Core::Observable","SDUX::Behavior::Core::Promise","SDUX::Behavior::Core::Reducer","SDUX::Behavior::Core::State","SDUX::Behavior::Core::TabSyncState","SDUX::Behavior::Core::Value","SDUX::Behavior::Addon::DistinctUntilChanged","SDUX::Behavior::Cache::State","SDUX::Behavior::Core::Lookup","SDUX::Behavior::Core::Query","SDUX::Behavior::Encrypt::Aes256","SDUX::Behavior::Interceptor::GlobalErrorPause","SDUX::Behavior::Merge::ArrayAppend","SDUX::Behavior::Merge::ArrayPush","SDUX::Behavior::Merge::Deep","SDUX::Behavior::Persist::CookieStorage","SDUX::Behavior::Persist::LocalStorage","SDUX::Behavior::Persist::SessionStorage","SDUX::Behavior::Policy::StepwiseFilter","SDUX::Behavior::Policy::StepwiseReducer","SDUX::Behavior::Policy::StepwiseResolve","SDUX::Behavior::Core::License","SDUX::Controller::Policy::CoreAbstain","SDUX::Controller::Policy::CoreError","SDUX::Controller::Policy::CoreLicense","SDUX::Controller::Policy::TabSync","SDUX::Controller::Policy::Delay","SDUX::Controller::Policy::MaxFailures","SDUX::Controller::Policy::ReplayGlobalError","SDUX::Controller::Policy::Stepwise","SDUX::Controller::Policy::Throttle"]),ww="sdux-vault",AN="SDUX::Behavior::Core::License",Ct=null;function Tw(n={}){Ct||(Ct=new dy(n))}var dy=class{#t;#r;#n=new Map;#e=new Map;#i=!1;#a=!1;#c;#s=new Map;#l=new I;#d=new Fr;#u=new Map;#f;#o=new Map;constructor(e){TN(this.#l,this.#d.asObservable()),this.setVaultConfig(e),this.#_(e.licenses),this.#g(),this.#A()}setVaultConfig(e){let t={devMode:e.devMode??!1,logLevel:e.logLevel??"off"};this.#f=Object.freeze(t),et.setDevMode(this.#f.devMode),dw(this.#f.logLevel),this.#a=e.devMode?e.bypassLicensing??!1:!1,this.#c=e.licenseTimeoutMs??15e3,this.#x()}resetForTesting(){this.#t?.unsubscribe(),this.#t=void 0,this.#r?.unsubscribe(),this.#r=void 0,this.#f=void 0,this.resetFeatureCellRegistry(),this.#u.clear(),this.#n.clear()}resetFeatureCellRegistry(){this.#o.clear()}registerCellRuntime(e){this.#h(e)}registerBehaviors(e,t){let r=this.#h(e);r.behaviors=this.#p(t),r.behaviorsRegistered=!0}registerControllers(e,t){let r=this.#h(e);r.controllers=this.#p(t),r.controllersRegistered=!0}registerFluentApis(e,t){let r=this.#h(e);r.fluentApis=Object.freeze(t)}getLicensePayload(e){return this.#n.get(e)}isBypassLicensing(){return this.#a}isAuthorizedKey(e){return RN.has(e)}hasVaultLicense(){return this.#n.has(ww)}#_(e){if(e?.length)for(let t of e)t?.licenseId&&this.#n.set(t.licenseId,t.payload)}#p(e){return new Map(e.map(t=>{let r;this.#a?r=!1:r=t.needsLicense??!1;let i={key:t.key,type:t.type,critical:!!t.critical,needsLicense:r,validLicense:r?Rr.Pending:Rr.NotRequired};return[t.key,Object.freeze(i)]}))}#g(){this.#t=this.#l.subscribe(e=>{switch(e.type){case or.DescribeFeature:{let t=e;this.registerFluentApis(t.featureCellKey,this.#R(t));break}case or.DescribeBehaviors:{let t=e;this.registerBehaviors(t.featureCellKey,t.behaviors),this.#y(t.featureCellKey);break}case or.DescribeControllers:{let t=e;this.registerControllers(t.featureCellKey,t.controllers),this.#y(t.featureCellKey);break}case or.RequireLicense:{this.#E(e.featureCellKey),this.#I(e);return}case or.ValidateLicense:{this.#T(e),this.#y(e.featureCellKey);return}}})}#E(e){if(!this.#c||this.#s.has(e))return;let t=setTimeout(()=>{this.#w(e),this.#s.delete(e)},this.#c);this.#s.set(e,t)}#w(e){let t=this.#o.get(e);if(!t)return;let r=[...t.behaviors?.values()??[],...t.controllers?.values()??[]],i=!1;for(let o of r)o.needsLicense&&o.validLicense===Rr.Pending&&((t.behaviors?.has(o.key)?t.behaviors:t.controllers)?.set(o.key,Object.freeze(W(g({},o),{validLicense:Rr.Timeout}))),i=!0);i&&this.#m(e,!1),this.#v(e)}#y(e){let t=this.#o.get(e);if(!t||!t.behaviorsRegistered||!t.controllersRegistered)return;let i=[...t.behaviors?.values()??[],...t.controllers?.values()??[]].filter(o=>o.needsLicense);if(i.length===0){this.#m(e,!0);return}if(i.some(o=>o.validLicense===Rr.Revoked||o.validLicense===Rr.Timeout)){this.#v(e),this.#m(e,!1);return}i.some(o=>o.validLicense===Rr.Pending)||this.#m(e,!0)}#v(e){let t=this.#s.get(e);t&&(clearTimeout(t),this.#s.delete(e))}#m(e,t){this.#e.has(e)||(this.#e.set(e,t),this.#v(e),this.#u.set(e,t),this.#d.next({featureCellKey:e,approved:t}))}#T(e){let{featureCellKey:t,key:r,licenseToken:i,valid:o}=e;if(this.#e.has(e.featureCellKey))return;if(!r){xe("Cannot validate license without a key.");return}let s=this.#o.get(t);s&&(this.#b(s.behaviors,r,i,o),this.#b(s.controllers,r,i,o),o&&r===AN&&this.#S())}#b(e,t,r,i){if(!e?.has(t))return;let o=e.get(t);if(o.needsLicense&&o.licenseId){if(o.licenseId!==r){xe(`[vault] License key mismatch for "${t}".`);return}e.set(t,Object.freeze(W(g({},o),{validLicense:i?Rr.Valid:Rr.Revoked})))}}#I(e){let{featureCellKey:t,key:r,licenseToken:i}=e,o=this.#o.get(t);if(o){if(!r||typeof r!="string")throw new Error("[vault] Cannot register controller license without a key.");this.#D(o.behaviors,r,i),this.#D(o.controllers,r,i)}}#D(e,t,r){if(!e?.has(t))return;let i=e.get(t);i.needsLicense&&(i.licenseId||r&&e.set(t,Object.freeze(W(g({},i),{licenseId:r}))))}#x(){et.active&&!Lg.active&&console.error(`[vault] "Development Mode" is enabled outside of a test environment.
This can expose sensitive data because safeguards that normally remove or sanitize data are disabled.
You have explicitly disabled these safeguards and are responsible for ensuring production safety.
If this is intentional, you can safely ignore this message.`)}#R(e){let t=e?.fluentApis??{};return{filters:Array.isArray(t?.filters)?t.filters.length:0,reducers:Array.isArray(t?.reducers)?t.reducers.length:0,beforeTaps:Array.isArray(t?.beforeTaps)?t.beforeTaps.length:0,afterTaps:Array.isArray(t?.afterTaps)?t.afterTaps.length:0,emitStateCallbacks:Array.isArray(t?.emitStateCallbacks)?t.emitStateCallbacks.length:0,errorCallbacks:Array.isArray(t?.errorCallbacks)?t.errorCallbacks.length:0}}#h(e){return this.#o.has(e)||this.#o.set(e,{key:e,behaviorsRegistered:!1,controllersRegistered:!1}),this.#o.get(e)}#S(){this.#i||et.active&&(typeof document>"u"||(this.#i=!0,globalThis.sdux??={},globalThis.sdux.debugWidget??={},globalThis.sdux.debugWidget.aiAssistEnabled=!0,document.dispatchEvent(new CustomEvent("sdux-license-resolved"))))}#A(){et.active&&(typeof document>"u"||(globalThis.sdux??={},globalThis.sdux.debugWidget??={},globalThis.sdux.debugWidget.getRegistry=()=>this.getRegistrySnapshot(),_w()))}registerVaultSettled(e,t){let r=this.#h(e);r.vaultSettled=t}async awaitFeatureCellSettled(e){let t=this.#o.get(e);if(!t)throw new Error(`[vault] FeatureCell "${e}" not registered.`);typeof t.vaultSettled=="function"&&(await t.vaultSettled(),await Promise.resolve())}async awaitAllSettled(){for(let e of this.#o.values())typeof e.vaultSettled=="function"&&await e.vaultSettled();await Promise.resolve()}getRegistrySnapshot(){return new Map(this.#o)}};function Iw(n){if(!Ct)throw new Error("[vault] Vault not initialized.");if(!n)throw new Error("[vault] registerFeatureCell() requires a valid entry object.");if(!n.key||typeof n.key!="string")throw new Error('[vault] registerFeatureCell() requires a valid "key" (non-empty string).');Ct.registerCellRuntime(n.key)}function Sw(n){if(!Ct)throw new Error("[vault] Vault not initialized.");if(typeof n!="string"||!n.trim())throw new Error("[vault] getLicensePayload() requires a valid licenseId.");return Ct.getLicensePayload(n)}function kN(n,e){if(!Ct)throw new Error("[vault] Vault not initialized.");if(!n||typeof n!="string")throw new Error('[vault] registerVaultSettled() requires a valid "key" (non-empty string).');typeof e=="function"&&Ct.registerVaultSettled(n,e)}function Mw(n){return Ct?Ct.isBypassLicensing()?!0:Ct.isAuthorizedKey(n):!1}function xw(){return Ct?Ct.isBypassLicensing():!1}function by(){return Ct?Ct.hasVaultLicense():!1}var fy=class{#t=!1;#r;#n;#e;constructor(e,t,r){this.#r=e,this.#n=t,this.#e=r}initializeBehaviors(e,t){if(this.#t)throw new Error(`[vault] VaultBehaviorRunner already initialized \u2014 cannot reissue core behavior ID for feature cell "${this.#r}".`);if(this.#t=!0,!e||e.length===0)return[];let r=new Set;return e.map(i=>{let o=!1;try{if(typeof i!="function")return;let s=i[Fd];if(!s)throw o=!0,new Error(`[vault] Behavior "${i.name}" missing @VaultBehavior metadata.`);let a=s.key,c=s.type;if(!a)throw o=!0,new Error('[vault] Behavior metadata missing "key".');if(!by()&&!Mw(a)){Ee(`[vault] Unlicensed behavior "${a}" skipped during initialization.`);return}if(!c)throw o=!0,new Error(`[vault] Behavior metadata missing "type" for "${a}".`);let l;if(s.wantsConfig){if(!s.configKey)throw o=!0,new Error(`[vault] Behavior "${a}" declares wantsConfig but has no configKey.`);l=t.get(s.configKey)}let u;if(s.needsLicense&&!xw()){if(!s.licenseId)throw o=!0,new Error(`[vault] Behavior "${a}" declares needsLicense but has no licenseId.`);if(u=Sw(s.licenseId),u===void 0)throw o=!0,new Error(`[vault] License "${s.licenseId}" required by behavior "${a}" is not registered in Vault config.`)}let d;try{let f={featureCellKey:this.#r,behaviorConfig:l,licensePayload:u};s.type===w.TabSyncState&&(f=W(g({},f),{lastSnapshot:this.#n,state$:this.#e})),d=new i(a,f)}catch(f){throw o=s.critical,f}if(!d.key)throw o=!0,new Error(`[vault] Behavior missing key for type "${c}". Every behavior must define a unique "key".`);if(!Hg(d.key))throw o=!0,new Error(`[vault] Behavior key "${d.key}" not valid format for "${c}" behavior.`);return d.key&&r.has(d.key)?(xe(`[vault] Skipping duplicate behavior with key "${d.key}"`),null):(d.key&&r.add(d.key),d)}catch(s){if(o)throw s;return xe(`[vault] Non-critical behavior initialization failed: ${s?.message}`),null}}).filter(i=>!!i)}applyBehaviorExtensions(e,t,r){for(let i of e){let o={featureCellKey:t.key,destroyed$:t.destroyed$,reset$:t.reset$,mergeState:t.mergeState,replaceState:t.replaceState,state$:t.state$,vaultMonitor:r},s=i.extendCellAPI?.(o);if(!(!s||typeof s!="object"))for(let[a,c]of Object.entries(s)){let l=t[a]!==void 0,u=Array.isArray(i.allowOverride)&&i.allowOverride.includes(a);if(xN.has(a))throw new Error(`[vault] Behavior "${i.key}" attempted to overwrite core FeatureCell method "${a}".`);if(l&&!u)throw new Error(`[vault] Behavior "${i.key}" attempted to redefine method "${a}" already provided by another behavior.`);l&&u&&(xe(`[vault] Behavior "${i.key}" is overriding method "${a}" (explicitly allowed).`),delete t[a]),Object.defineProperty(t,a,{value:(...d)=>{try{return typeof c!="function"?void 0:c(...d)}catch(f){throw bt(`[vault] Behavior extension "${a}" threw an error:`,f),f}},enumerable:!1,writable:!1,configurable:!0})}}}},NN=n=>n.type===w.ErrorTransform,ON=n=>n.type===w.CoreErrorCallback,PN=n=>n.type===w.CoreEmitState,bs=n=>n===jg,ty=()=>crypto?.randomUUID?.()??Math.random().toString(36).slice(2,7),Rw=n=>li(n)||bs(n),LN={pro:`
-----BEGIN PUBLIC KEY-----
MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEAuXto+eRaFm9pObys/IEI ASwV1wgGvNGJsiyw/9hXsEd9mA76aQI1X9lpkZRKmBFovHdK2unPHFOPQM0k9vJo ieFMNXO9kmHn7UYZV98bDCcDTNURFHQ4SWlcAE/HEiNqcUb9LwotFbON7/mcthM8 QQQ4Lycdv+lm1uozQl8rl+i7FjfQzLaxJMuAkm9jFZK+ta6eoSy/lmXfhDem8RIo dE19aZWfY+LTXP9nn977XFah0z0S0D3NSvMv96gZsXTN2hTbFBl5dgDMAOW9R5OI wT6I+kGwrVqARXq2pTDHnZjqfO3a+rT4Lrb5/L58RjQ0EfA5puZ16EXGEUpOabqI KVT4Z/wv818P8eyat+LtTcy2G0zx/h0Fcz0QANzx3P9K7ezxeqdg4SsjkcNXRWZq PaJUhZHygN/Xuef9zfWwjuKobCBSdyyeXxF5XS0A0Y6NBmdhikyHc/YOY2iYupIt xiUvlHaq97B5wej3XcTmp4kmJUQyeQ8oD5Mj8Dmf69oa7vhI/ANNKWo9s8e7u7UX Dx74Eu3d8JBpACQ+Vvek6ZEGw+D0yCyLF6u/CaCw+cb2cBYAlM7jWZ5kpgsbQcWw YP2nbGV3OofcEspoEU704M4RW4v+nSRYrJbMEIJJ5Wuxk2/RuUgk/9uwgCHAvzXZ cmGomIf9dXZGoNhwT5uW1OECAwEAAQ==
-----END PUBLIC KEY-----
`,enterprise:`
-----BEGIN PUBLIC KEY----- MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEA6k4XHyV4WE6Bd/fizN4Q c3C37LtskNTJ1c3FVxcziygAFd+fotRfbLHctwtJJhuO6+Pv+c1SPjrPeJsWRw4M IN7QHcBQHPbQDW/Erd1XjA0OVNbxs3xLVjtgMuVcd2sKYPp4nJqIyz5WLMde7v1g 1k8knI+ISrym0h4GcjkNSaHK5QKKpK7n3dzOXrjo1P6h1uOVsGAHC/ErVMQNHrAu dKgY+SDVn87oPIrd2pJb5SotI6H8HzODM/CDsF58hk/eK4zApnrtDViVb1j3oNCk hdDOnN98VIgwcHzHYZOhPFM0TFwudpi57Yu/PJJztI7WbsjpxTyX3JPvwVeWJR+Z tt6NEQ5ZaoBghGgHGiuRbhKR5qoznwsMkfb2jUbpbgRTinmtEjFmpIYSnROCixjq W1neupzBDrNi+JfoVsTwiP8SbzxHXWksN0gLMfL235l1LDMS/IrI3RmhcRkhB/Pu vPuc+jhPkwpbXaM9vDkkPWK1dmRYHWo3atYCWoSdK2705woo19oT8Dxm9OXKT+nh HsdOI+k9asBCqe4kQHi3OJ4Raesa6bFWWxKFLeUNKSAt7clJKo7GhrovnHIIAbty gk7ULdwLIlpjwB5mVUBBCts5z9KznHo+pumNoeEA8FGqq374a+jEPOHWjsshA678 RDYeqeRbh2VNcy/OwlqH/MUCAwEAAQ==
-----END PUBLIC KEY-----
`,development:`
-----BEGIN PUBLIC KEY----- MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEAsAFRjQalSEZkCDPrdBEf IMQpY7ujGf4pqjuFk86rkZENr7kJ00RjVJxuhcafgygdmxVAhKS+d1WtsSAw6c9m AawI+sSyhAClB+wrwfuCrxt/ZlLbNMiMH5SD1YvoRaHstkLpMGbWnbsLDI+cCpaL hGKk+5LoJLikhf9ipBkGX8VSAT0xTMk06iaYtEV85H9cMWtfx7seyBw2Mps/8S6f Rtp3tLlbNJIyh9+5XjtkTqYNRWJtFW1rv75K9GN9dPVXrEXUGojqeV13G+z2R3Sr QvmhESkyC1DviZBxaYnEhpWoijJQFJUQ1DGRi29ugktYzf36Otw9gyz9jGb5MLNE W+meR2LdnbTBy83QNtaS5lCzNJVo2ohwbD+djblNVegH/Dr0rK4IHEYSgjdxjErY 6xqykJpKJ025CTU4kyI3aaaYB+l2CQMAKVAh2y2rgGyJSJnMDTR44aBIZ8rtTu2r wazjBJ/RiMr0OOkfBqEQPKZ6qzSWtBDebvD0iUyRAP8SXSdDo1DcaJNamLLmjIxr 3KCcwgJt2oLcdZZHKG3WbjqmIdp7tq03O4gajKJHd5GmyLWtHXKqBwaijAx9aNqr qDPWj/Qg/8C9qpSBs7EUod3slV6UhO4yEnb7FdD/O0o8mRMU0rtJ0KQTarpEh2bY MKVsYxByiFeAjUJUWLSqIX8CAwEAAQ==
-----END PUBLIC KEY-----
`},Dw=!1;var FN={verify:async n=>{try{let e=n.indexOf(".");if(e===-1)return!1;let t=n.substring(0,e),r=n.substring(e+1),i=atob(t),o=JSON.parse(i),s=Uint8Array.from(atob(r),d=>d.charCodeAt(0)),a=o?.licenseType;if(!a)return!1;if(!et.active&&a==="development")return console.error("[sdux-vault] Development license token rejected in production environment."),!1;let c=LN[a];if(!c)return!1;let l=await BN(c),u=await crypto.subtle.verify({name:"RSASSA-PKCS1-v1_5",hash:"SHA-256"},l,s,new TextEncoder().encode(t));if(Dw||(Dw=!0,u?console.info(`[sdux-vault] License verified \u2014 organization: "${o.organization}", tier: "${o.licenseType}"`):console.warn(`[sdux-vault] License signature invalid \u2014 organization: "${o.organization}", tier: "${o.licenseType}"`),console.info("[sdux-vault] License organization:",o.organization),console.info("[sdux-vault] License domain:",o.domain),console.info("[sdux-vault] License type:",o.licenseType),console.info("[sdux-vault] License issuedAt:",zd(o.issuedAt)),console.info("[sdux-vault] License expires:",zd(o.expires))),u&&o.licenseType==="enterprise"&&typeof o.expires=="number"){let d=o.expires-Date.now();if(d<0)return console.error(`[sdux-vault] Enterprise license expired \u2014 organization: "${o.organization}", expired: ${zd(o.expires)}`),!1;let f=360*60*60*1e3;d<=f&&console.warn(`[sdux-vault] Enterprise license expiring soon \u2014 organization: "${o.organization}", expires: ${zd(o.expires)}`)}return u}catch(e){return console.error("[sdux-vault] License token verification failed:",e),!1}}};async function BN(n){let e=VN(jN(n));return crypto.subtle.importKey("spki",e,{name:"RSASSA-PKCS1-v1_5",hash:"SHA-256"},!1,["verify"])}function jN(n){let e=n.replace(/-----.*KEY-----/g,"").replace(/\s+/g,"");return atob(e)}function VN(n){let e=new ArrayBuffer(n.length),t=new Uint8Array(e);for(let r=0;r<n.length;r++)t[r]=n.charCodeAt(r);return e}function zd(n){return typeof n=="string"?n:new Intl.DateTimeFormat("en-US",{month:"2-digit",day:"2-digit",year:"numeric"}).format(new Date(n))}async function UN(n){try{return n?await FN.verify(n):!1}catch{return!1}}var Cy=(()=>{class n{static needsLicense;static key;#t;#r;#n;#e;constructor(t){let r=this.constructor;if(typeof r.key!="string"||!r.key.trim())throw new uc('LicensingClass requires a static "key". Did you forget @VaultBehavior or @VaultController?');this.#e=mc(),this.#n=r.key,this.#r=t.featureCellKey,r.needsLicense&&this.#i()}#i(){this.#t=this.#e.requestLicense(this.#r,this.#n)}validateLicense(t){if(!this.#t)throw new uc(`validateLicense() called but no license was requested for "${this.#r}" and "${this.#n}".`);this.#e.validateLicense(this.#r,this.#n,this.#t,t)}}return n})(),py=class extends Cy{behaviorCtx;static type;static key;static critical;static needsLicense;type=w.CoreLicense;critical=!0;key;constructor(e,t){super(t),this.behaviorCtx=t,this.key=e,UN(this.behaviorCtx.licensePayload).then(r=>this.validateLicense(r))}destroy(){xe(`${this.key} - destroy noop`)}reset(){xe(`${this.key} - reset noop`)}};py=Us([mw({type:w.CoreLicense,key:$g("Core","License"),critical:!0,needsLicense:!0,licenseId:ww})],py);var hy=class{#t;#r;#n;#e;cellKey;decisionEngine;#i;#a;#c;#s;#l;#d;#u;privateErrorService=fw();#f=[];#o;#_;#p;vaultMonitor=vy();constructor(e){this.#t=e.afterTapCallbacks??[],this.#r=e.beforeTapCallbacks??[],this.cellKey=e.cell?.key,this.#s=e.emitStateCallbacks??[],this.#u=e.errorCallbacks??[],this.#f=e.filterCallbacks??[],this.#o=e.initialState,this.#p=e.reducerCallbacks??[]}initializeOrchestrator(e){e.behaviors=e.behaviors??[],this.#b(e)}async initializeFeatureCell(e){await this.#H(e)}destroyBehaviors(e){this.#V(e)}resetBehaviors(e){this.#L(e)}async orchestrate(e,t){e.operation===vn.Replace?await this.#A(e):await this.#F(e,t)}buildControllerCtx(e){return{traceId:e.traceId,featureCellKey:e.featureCellKey,snapshot:e.lastSnapshot,incoming:e.incoming,operation:e.operation}}normalizeIncoming(e){return e?Wg(e)||Wt(e)||gs(e)||gs(e)?e:vw(e)?oe(e):{value:e}:null}controllerOutcomeNotification(e,t){switch(e){case Jt.Abort:{this.#l.finalizeControllerAbort(t);break}case Jt.Deny:{this.#l.finalizeControllerDeny(t);break}}}prepareIncoming(e,t,r){e=this.#g(e,t,r);let i=this.#l.preparePipelineIncoming(e);if(li(i)&&(this.vaultMonitor.startCoreState(this.cellKey,we,e),this.#M(e),this.vaultMonitor.endCoreState(this.cellKey,we,e)),so(i)){this.vaultMonitor.startCoreState(this.cellKey,we,e),this.#L(e),this.#M(e),this.vaultMonitor.endCoreState(this.cellKey,we,e);return}return i}#g(e,t,r){return e.incoming=this.normalizeIncoming(t),e.resolveType=this.#$(t),e.operation=r,e}#E(e,t){let r=t.behaviors.filter(i=>i.type===w.Merge);if(r.length>1){let i=r.map(o=>o.key).join(", ");throw new Error(`SDuX Error: More than one MergeBehavior was provided. Only one merge strategy can be active per FeatureCell. Received: ${i}. Fix: Remove additional merge behaviors or combine them into a single behavior.`)}return r.length===1&&(e.push(r[0]),e=e.filter(i=>i.type!==w.Merge)),e}#w(e){let t=e.defaultBehaviors??[];return t=this.#y(t,e),t=this.#E(t,e),t=this.#v(t,e),t=this.#m(t),t}#y(e,t){return t?.errorCallbacks?.length===0?e.filter(r=>r.type!==w.CoreErrorCallback):e}#v(e,t){return t?.emitStateCallbacks?.length===0?e.filter(r=>r.type!==w.CoreEmitState):e}#m(e){return e=e?.filter(t=>t.type!==w.CoreLicense),by()&&e.push(py),e}#T(e){let t=e.map(r=>{let i=r[Fd];return{key:r.key,type:i.type,critical:i.critical,needsLicense:i.needsLicense}});mc().describeBehaviors({featureCellKey:this.cellKey,behaviors:t})}#b(e){let t=this.#w(e),r=e.behaviors?.filter(a=>!(a.type===w.CoreAfterTap||a.type===w.CoreBeforeTap||a.type===w.CoreError||a.type===w.CoreErrorCallback||a.type===w.CoreEmitState||a.type===w.CoreLicense||a.type===w.CoreState||a.type===w.Filter||a.type===w.FromObservable||a.type===w.FromPromise||a.type===w.FromStream||a.type===w.Reduce||a.type===w.Resolve));e.operators=e.operators??[],e.interceptors=e.interceptors??[];let i=[...t,...r,...e.operators,...e.interceptors];i.some(a=>a.type===w.TabSyncState)&&(i=i.filter(a=>a.type!==w.CoreState));let s=new fy(this.cellKey,e.lastSnapshot,e.state$);this.#T(i),this.#n=s.initializeBehaviors(i,e.behaviorConfigs),this.#x(),this.#R(),this.#I(),this.#D(),s.applyBehaviorExtensions(this.#n,e.cell,this.vaultMonitor)}#I(){this.#e=this.#n.filter(e=>!(e.type===w.CoreState||e.type===w.TabSyncState||e.type===w.CoreEmitState||e.type===w.CoreError||e.type===w.ErrorTransform||e.type===w.CoreErrorCallback||e.type===w.Merge))}#D(){let e=this.#n.filter(i=>i.type===w.TabSyncState),t=this.#n.filter(i=>i.type===w.CoreState),r=e.length>0?e:t;if(r.length>1)throw new Error("Only one core state behavior can be registered for a FeatureCell.");this.#l=r[0]??null,this.#c=this.#n.filter(i=>PN(i))[0]}#x(){let e=this.#n.filter(t=>t.type===w.CoreError);if(e.length>1)throw new Error("Only one core error behavior can be registered for a FeatureCell.");this.#i=e[0]??null,this.#a=this.#n.filter(t=>ON(t))[0],this.#d=this.#n.filter(t=>NN(t))}#R(){let e=this.#n.filter(t=>t.type===w.Merge);this.#_=e[0]??null}async#h(e,t,r){let i=await this.#C(e,t,r);return so(i)?fc:li(i)?jd:Bg}async#S(e,t){let r,i=await this.#h(w.StepwiseResolve,e,t);if(!$d(i))return i;if(this.#B()){if(r=await this.#j(e,t),li(r))return jd}else r=t;r=await this.#C(w.Filter,e,r);let o=await this.#h(w.StepwiseFilter,e,r);if(!$d(o))return o;await this.#C(w.CoreBeforeTap,e,oe(r)),r=await this.#C(w.Reduce,e,r);let s=await this.#h(w.StepwiseReducer,e,r);if(!$d(s))return s;await this.#C(w.CoreAfterTap,e,oe(r));let a=oe(r),c=a;return c=await this.#P(w.Encrypt,e,c),await this.#P(w.Persist,e,c),a}async#A(e){this.vaultMonitor.startReplace(this.cellKey,we,e),await this.#N(async()=>{let t;if(t=await this.#O(e),!bs(t)){let r=await this.#C(w.Resolve,e,void 0);so(r)?t=fc:t=await this.#S(e,r)}return this.#k(t,e)},e)}async#F(e,t){this.vaultMonitor.startMerge(this.cellKey,we,e),await this.#N(async()=>{let r=oe(e.lastSnapshot.value),i;if(i=await this.#O(e),!bs(i)){let o=await this.#C(w.Resolve,e,void 0),s=oe(o);this.vaultMonitor.startComputeMerge(this.cellKey,we,e);let a=await this.#_.computeMerge(r,s,t);if(this.vaultMonitor.endComputeMerge(this.cellKey,we,e),so(a))i=fc;else{let c=oe(a);i=await this.#S(e,c)}}return await this.#k(i,e)},e)}async#k(e,t){let r;return bs(e)?r={pipelinePaused:!0}:so(e)?r={pipelineStateCleared:!0}:(hc(e)||li(e))&&(r={noop:!0}),t.operation===vn.Replace?this.vaultMonitor.endReplace(this.cellKey,we,t,r):this.vaultMonitor.endMerge(this.cellKey,we,t,r),e}async#N(e,t){try{let r=await e();this.vaultMonitor.startCoreState(this.cellKey,we,t),bs(r)?this.#l.finalizePipelineVaultStop(t):this.#l.finalizePipelineState(r,t),await this.#M(t),this.vaultMonitor.endCoreState(this.cellKey,we,t),this.decisionEngine?.notifySuccess(this.buildControllerCtx(t))}catch(r){let i=await this.#U(r,t);await this.decisionEngine?.notifyFailure(this.buildControllerCtx(t),i)}}async#C(e,t,r){let i;e===w.Resolve?i=this.#e.filter(o=>o.resolveType===t.resolveType&&o.type===e):i=this.#e.filter(o=>o.type===e);for(let o of i){let s;try{switch(e){case w.Resolve:typeof o.computeResolve=="function"&&(this.vaultMonitor.startResolve(this.cellKey,o.key,t),s=await o.computeResolve(t),ir(s)&&(r=oe(s)),this.vaultMonitor.endResolve(this.cellKey,o.key,t));break;case w.StepwiseResolve:case w.StepwiseFilter:case w.StepwiseReducer:if(typeof o.evaluateStepwise=="function"){this.vaultMonitor.startStepwise(this.cellKey,o.key,t);let a=oe(t.lastSnapshot.value),c=oe(r);s=await o.evaluateStepwise(a,c,t.featureCellKey),this.vaultMonitor.endStepwise(this.cellKey,o.key,t)}break;case w.Filter:if(typeof o.applyFilter=="function")for(let a of this.#f){this.vaultMonitor.startFilter(this.cellKey,o.key,t);let c=oe(r),l=await o.applyFilter(c,a);this.vaultMonitor.endFilter(this.cellKey,o.key,t),ir(l)&&(r=oe(l))}break;case w.CoreBeforeTap:if(typeof o.applyBeforeTap=="function")for(let a of this.#r){this.vaultMonitor.startBeforeTap(this.cellKey,o.key,t);let c=oe(r);await o.applyBeforeTap(c,a),this.vaultMonitor.endBeforeTap(this.cellKey,o.key,t)}break;case w.Reduce:if(typeof o.applyReducer=="function"){if(hc(r)&&this.#p.length>0)throw new Error(`[vault] Reducer stage received undefined state in FeatureCell "${this.cellKey}", but reducers are registered.`);for(let a of this.#p){this.vaultMonitor.startReducer(this.cellKey,o.key,t);let c=oe(r),l=await o.applyReducer(c,a);this.vaultMonitor.endReducer(this.cellKey,o.key,t),ir(l)&&(r=oe(l))}}break;case w.CoreAfterTap:if(typeof o.applyAfterTap=="function")for(let a of this.#t){this.vaultMonitor.startAfterTap(this.cellKey,o.key,t);let c=oe(r);await o.applyAfterTap(c,a),this.vaultMonitor.endAfterTap(this.cellKey,o.key,t)}break}}catch(a){throw this.vaultMonitor.runtimeError(this.cellKey,o.key,t,a),a}ir(s)&&(r=oe(s))}return r}async#O(e){let t=this.#e.filter(r=>r.type===w.Interceptor);for(let r of t)try{this.vaultMonitor.startInterceptor(this.cellKey,r.key,e),e.incoming=oe(e.incoming);let i=await r.applyInterceptor(e);if(bs(i))return this.vaultMonitor.endInterceptor(this.cellKey,r.key,e,{pipelinePaused:!0}),jg;this.vaultMonitor.endInterceptor(this.cellKey,r.key,e)}catch(i){throw this.vaultMonitor.runtimeError(this.cellKey,r.key,e,i),i}}#B(){return this.#e.filter(t=>t.type===w.Operator).length>0}async#j(e,t){let r=this.#e.filter(i=>i.type===w.Operator);for(let i of r)try{this.vaultMonitor.startOperator(this.cellKey,i.key,e);let o=oe(t),s=await i.applyOperator(o);if(hc(s)){this.vaultMonitor.endOperator(this.cellKey,i.key,e,{noop:!0});return}t=oe(s),this.vaultMonitor.endOperator(this.cellKey,i.key,e)}catch(o){throw this.vaultMonitor.runtimeError(this.cellKey,i.key,e,o),o}return t}async#P(e,t,r){let i;i=this.#e.filter(o=>o.type===e);for(let o of i)try{switch(e){case w.Encrypt:if(typeof o.encryptState=="function"){this.vaultMonitor.startEncrypt(this.cellKey,o.key,t);let s=oe(r),a=await o.encryptState(t,s);this.vaultMonitor.endEncrypt(this.cellKey,o.key,t),ir(a)&&(r=oe(a))}break;case w.Persist:if(typeof o.persistState=="function"){this.vaultMonitor.startPersist(this.cellKey,o.key,t);let s=oe(r);await o.persistState(s),this.vaultMonitor.endPersist(this.cellKey,o.key,t)}break}}catch(s){throw this.vaultMonitor.runtimeError(this.cellKey,o.key,t,s),s}return r}#V(e){for(let t of this.#n){this.vaultMonitor.startDestroy(this.cellKey,t.key,e);try{t.destroy?.(e),this.vaultMonitor.endDestroy(this.cellKey,t.key,e)}catch(r){bt(`${t.key} destroy() failed`,r),this.vaultMonitor.endDestroy(this.cellKey,t.key,e,{destroyFailed:!0})}}}#L(e){for(let t of this.#n){this.vaultMonitor.startReset(this.cellKey,t.key,e);try{t.reset?.(e),this.vaultMonitor.endReset(this.cellKey,t.key,e)}catch(r){bt(`${t.key} reset() failed`,r),this.vaultMonitor.endReset(this.cellKey,t.key,e,{resetFailed:!0})}}}async#M(e){if(this.#s?.length>0){let t=oe(e.lastSnapshot);this.vaultMonitor.startCoreEmitState(this.cellKey,we,e);for(let r of this.#s)await this.#c.emitState(t,r);this.vaultMonitor.endCoreEmitState(this.cellKey,we,e)}}async#U(e,t){let r;try{this.vaultMonitor.startCoreError(this.cellKey,we,t),r=await this.#i.handleError(e,t.featureCellKey),Ee(`${this.cellKey} #runErrorBehaviors starting with base ResourceError: ${JSON.stringify(r)}`)}catch(i){bt("[vault] Core error normalization failed",i),r=oo(e,t.featureCellKey)}finally{this.vaultMonitor.endCoreError(this.cellKey,we,t)}for(let i of this.#d)try{this.vaultMonitor.startErrorTransform(this.cellKey,we,t);let o=await i.transformError(oe(e),oe(r),oe(t.lastSnapshot));!li(o)&&!Hd(o)&&(r=o)}catch(o){bt(`[vault] ErrorBehavior "${i.key}" threw during error handling`,o)}finally{this.vaultMonitor.endErrorTransform(this.cellKey,we,t,r)}try{this.vaultMonitor.startCoreState(this.cellKey,we,t),await this.#l.finalizePipelineError(r,t),await this.#M(t)}catch(i){bt("[vault] Failed to finalize error state",i)}finally{this.vaultMonitor.endCoreState(this.cellKey,we,t)}try{this.vaultMonitor.startGlobalError(this.cellKey,we,t),await this.privateErrorService.setError(oe(r))}catch(i){bt("[vault] global error service",i)}finally{this.vaultMonitor.endGlobalError(this.cellKey,we,t)}if(this.#u?.length>0){this.vaultMonitor.startCoreCallbackError(this.cellKey,we,t);for(let i of this.#u)try{await this.#a.callbackError(oe(r),oe(t.lastSnapshot),i)}catch(o){bt("[vault] Error callback threw during error handling",o)}this.vaultMonitor.endCoreCallbackError(this.cellKey,we,t)}return Ee(`${this.cellKey} #runErrorBehaviors completed with final ResourceError: ${JSON.stringify(r)}`),r}#$(e){if(Wg(e))return pc.HttpResource;if(Wt(e))return pc.Observable;if(gs(e)||gs(e?.value))return pc.Promise;if(zg(e)||zg(e?.value))throw new Ld;return pc.Value}async#H(e){let t={value:void 0,loading:!1,error:null},r;if(gs(this.#o))r=this.#o;else{let i=this.#z();if(i.length>0){let o=await this.#W(e,i);ir(o)&&(Ee("Persisted data loaded from storage"),r=o)}else Hd(this.#o)||(this.vaultMonitor.startSetInitialValue(this.cellKey,we,e),Ee("Initialized data loaded from descriptor.initial"),r=this.#o,this.vaultMonitor.endSetInitialValue(this.cellKey,we,e))}t.value=r,Hd(t.value)?this.decisionEngine?.notifySuccess(this.buildControllerCtx(e)):await this.orchestrate(this.#g(e,t,vn.Replace))}#z(){return this.#e.filter(e=>e.type===w.Persist)}async#W(e,t){let r;for(let o of t)try{if(this.vaultMonitor.startLoadPersist(this.cellKey,o.key,e),r=await o.loadState?.(),ir(r)){this.vaultMonitor.endLoadPersist(this.cellKey,o.key,e);break}else this.vaultMonitor.endLoadPersist(this.cellKey,o.key,e,{noop:!0})}catch(s){this.vaultMonitor.runtimeError(this.cellKey,o.key,e,s),xe(`"[vault] persist.loadState()" for ${o.key} failed with ${s.message}`)}let i=this.#e.filter(o=>o.type===w.Encrypt);if(ir(r)&&i.length>0)for(let o of i)try{this.vaultMonitor.startDecrypt(this.cellKey,o.key,e);let s=await o.decryptState?.(e,r);ir(s)?(this.vaultMonitor.endDecrypt(this.cellKey,o.key,e),r=oe(s)):this.vaultMonitor.endDecrypt(this.cellKey,o.key,e,{noop:!0})}catch(s){this.vaultMonitor.runtimeError(this.cellKey,o.key,e,s),xe(`"[vault] encrypt.decryptState()" for ${o.key} failed with ${s.message}`);return}return r}},vs={Pending:"pending",Approved:"approved",Denied:"denied"},my=class{#t=!1;#r;constructor(e){this.#r=e}initializeControllers(e,t,r){if(this.#t)throw new Error(`[vault] VaultControllerRunner already initialized \u2014 cannot reissue core controller ID for feature cell "${this.#r}".`);if(this.#t=!0,!e||e.length===0)return[];let i=new Set;return e.map(o=>{let s=!1;try{if(typeof o!="function")return;let a=o[Bd];if(!a)throw s=!0,new Error(`[vault] Controller "${o.name}" missing @VaultController metadata.`);let c=a.key,l=a.type;if(!c)throw s=!0,new Error('[vault] Controller metadata missing "key".');if(!by()&&!Mw(c)){Ee(`[vault] Unlicensed controller "${c}" skipped during initialization.`);return}if(!l)throw s=!0,new Error(`[vault] Controller metadata missing "type" for "${c}".`);let u;if(a.wantsConfig){if(!a.configKey)throw s=!0,new Error(`[vault] Controller "${c}" declares wantsConfig but has no configKey.`);u=r.get(a.configKey)}let d;if(a.needsLicense&&!xw()){if(!a.licenseId)throw s=!0,new Error(`[vault] Controller "${c}" declares needsLicense but has no licenseId.`);if(d=Sw(a.licenseId),d===void 0)throw s=!0,new Error(`[vault] License "${a.licenseId}" required by controller "${c}" is not registered in Vault config.`)}let f={featureCellKey:this.#r,requestRevote:m=>{t.next({traceId:m,type:bn.Revote})},requestAbort:m=>{t.next({traceId:m,type:bn.Abort})},controllerConfig:u,licensePayload:d};l===ci.License&&(f.licenseDenied=m=>{t.next({traceId:m,type:bn.LicenseDenied})},f.licenseApproved=m=>{t.next({traceId:m,type:bn.LicenseApproved})});let p=new o(c,f);if(!p.key)throw s=!0,new Error(`[vault] Controller missing key for type "${l}". Every controller must define a unique "key".`);if(!yw(p.key))throw s=!0,new Error(`[vault] Controller key "${p.key}" not valid format for "${l}" controller.`);return p.key&&i.has(p.key)?(xe(`[vault] Skipping duplicate controller with key "${p.key}"`),null):(p.key&&i.add(p.key),p)}catch(a){if(s)throw a;return xe(`[vault] Non-critical controller initialization failed: ${a?.message}`),null}}).filter(o=>!!o)}},gy=class extends hy{#t=[];#r=[];#n=new I;#e=!1;#i=!1;#a=vs.Pending;#c=new I;constructor(e){super(e),mc().describeFeature({featureCellKey:e.cell.key,fluentApis:{filters:e.filterCallbacks,reducers:e.reducerCallbacks,beforeTaps:e.beforeTapCallbacks,afterTaps:e.afterTapCallbacks,emitStateCallbacks:e.emitStateCallbacks,errorCallbacks:e.errorCallbacks}}),et.active&&(this.vaultSettled=this.#D.bind(this)),this.#m(e),this.vaultMonitor.conductorLicenseAttempt(this.cellKey,`${this.cellKey}::license`),this.initializeOrchestrator(e)}initialize(e){let t=this.#p(e,vn.Initialize,void 0);this.#d({behaviorCtx:t,controllerCtx:this.buildControllerCtx(t),options:void 0})}conduct(e,t,r,i){let o=this.#p(e,r,i),s=this.prepareIncoming(o,t,r);if(li(s)||so(s))return;o.incoming=s;let a=this.buildControllerCtx(o);this.#d({behaviorCtx:o,controllerCtx:a,options:i})}reset(e){this.vaultMonitor.startReset(this.cellKey,ys,e),e.traceId=e.traceId??ty(),this.#g(),this.resetBehaviors(e),this.#w(e),this.vaultMonitor.endReset(this.cellKey,ys,e)}destroy(e){Ee(`${ys} - destroy`),e.traceId=e.traceId??ty(),this.vaultMonitor.startDestroy(this.cellKey,ys,e),this.#g(),this.destroyBehaviors(e),this.#E(e),this.#n.complete(),this.vaultMonitor.endDestroy(this.cellKey,ys,e)}async#s(e,t){if(e.operation===vn.Initialize){await this.initializeFeatureCell(e);return}if(e.operation===vn.Replace||e.operation===vn.Merge){await this.orchestrate(e,t);return}this.vaultMonitor.runtimeError(this.cellKey,ys,e,new Error(`Unknown operation type: "${e.operation}"`)),this.#u(e)}#l(){queueMicrotask(()=>{this.#b()})}#d(e){this.#a===vs.Pending||this.#a===vs.Approved?(this.vaultMonitor.startControllerAttempt(this.cellKey,e.behaviorCtx.traceId,e.controllerCtx),this.#t.push(e),this.#a===vs.Approved?!this.#e&&this.#t.length===1?this.#o():this.#i&&this.#l():this.#l()):this.#l()}#u(e){let t=this.#t[0];!t||t.finalized||(t.finalized=!0,queueMicrotask(()=>{this.decisionEngine.notifyFinalize(e),this.#t.shift(),this.#e=!1,this.#I(),this.#o()}))}#f(e,t){this.vaultMonitor.restartControllerAttempt(this.cellKey,e.traceId,e,t),this.#e=!1}async#o(){if(this.#e||!this.#t.length)return;this.#e=!0;let e=this.#t[0];if(!e){this.#e=!1;return}try{let t=await So(this.#T(e)),r=this.#t[0];if(!r){this.#e=!1;return}let{behaviorCtx:i,options:o}=r,s=!1;switch(t){case Jt.Abstain:{Ee(`${this.cellKey} DecisionOutcome: "${Jt.Abstain} received. Process Event dispatched.`),await this.#s(i,o);break}case Jt.Abort:{this.controllerOutcomeNotification(Jt.Abort,i),this.vaultMonitor.endControllerAttempt(this.cellKey,i.traceId,i,{status:t}),this.#u(i);break}case Jt.Deny:{this.#b(),s=!0,this.#e=!1,this.vaultMonitor.notifyConductorDeny(this.cellKey,i.traceId,i),this.controllerOutcomeNotification(Jt.Deny,i);break}}if(s)this.#i=!0;else return this.#i=!1,this.#o()}catch(t){bt("[conductor] Unreachable subscription error",t),this.vaultMonitor.conductorCrashed(this.cellKey,e?.controllerCtx.traceId??"unknown",e?.controllerCtx??{traceId:"unknown"},t),this.#t.shift(),this.#o()}}#_(){this.decisionEngine=new uy(this.#r,this.#n),this.#n.subscribe({next:e=>{if(e.type===bn.LicenseDenied){this.vaultMonitor.conductorLicenseDenied(this.cellKey,e.traceId),this.#a=vs.Denied;let r=new Error(`${this.cellKey} Conductor Decision Engine: The FeatureCell received a "License Denied". Pipeline is disabled.`);console.error(`[vault] ${r.message}`),Ee(r.message),this.privateErrorService.setError(oo(r,this.cellKey)),this.#t.length=0;return}if(e.type===bn.LicenseApproved){this.vaultMonitor.conductorLicenseApproved(this.cellKey,e.traceId),this.#a=vs.Approved,Ee(`${this.cellKey} Conductor Decision Engine: License Approved.`),this.#o();return}let t=this.#t[0];if(t){if(t.controllerCtx.traceId!==e.traceId){Ee(`The head ctx is not the same as the event. ${t.controllerCtx.traceId} != ${e.traceId}`);return}switch(e.type){case bn.Success:{this.vaultMonitor.endControllerAttempt(this.cellKey,t.behaviorCtx.traceId,t.controllerCtx,{status:"success"}),this.#u(t.controllerCtx);break}case bn.Failure:{this.vaultMonitor.endControllerAttempt(this.cellKey,t.behaviorCtx.traceId,t.controllerCtx,{status:"failure"}),this.#f(t.behaviorCtx,e.type);break}case bn.Abort:{this.vaultMonitor.conductorAbort(this.cellKey,e.traceId,t.controllerCtx),Ee(`${this.cellKey} Conductor Decision Engine: Abort request received for Behavior TraceId: ${t.controllerCtx.traceId}.`),this.#u(t.controllerCtx);break}case bn.Revote:{Ee(`${this.cellKey} Conductor Decision Engine: Revote request received for Behavior TraceId: ${t.controllerCtx.traceId}.`),this.vaultMonitor.conductorRevote(this.cellKey,e.traceId,t.controllerCtx),this.#e=!1,Ee(`${this.cellKey} Conductor Decision Engine: processQueue event dispatched for Behavior TraceId: ${t.controllerCtx.traceId}.`),this.#o();break}}}}})}#p(e,t,r){let i=ty();return{destroyed$:e.destroyed$,reset$:e.reset$,state$:e.state$,featureCellKey:e.featureCellKey,state:e.state,lastSnapshot:e.lastSnapshot,options:r!=null?oe(r):r,traceId:i,operation:t,resolveType:void 0,incoming:void 0}}#g(){this.#t.length=0,this.#e=!1}#E(e){for(let t of this.#r){this.vaultMonitor.startDestroy(this.cellKey,t.key,e);try{t.destroy?.(),this.vaultMonitor.endDestroy(this.cellKey,t.key,e)}catch(r){bt(`${t.key} destroy() failed`,r),this.vaultMonitor.endDestroy(this.cellKey,t.key,e,{destroyFailed:!0})}}}#w(e){for(let t of this.#r){this.vaultMonitor.startReset(this.cellKey,t.key,e);try{t.reset?.(),this.vaultMonitor.endReset(this.cellKey,t.key,e)}catch(r){bt(`${t.key} reset() failed`,r),this.vaultMonitor.endReset(this.cellKey,t.key,e,{resetFailed:!0})}}}#y(e,t){let r=t.controllers.filter(i=>i.type===ci.Error);if(r.length>1){let i=r.map(o=>o.key).join(", ");throw new Error(`SDuX Error: More than one ErrorController was provided. Only one error policy can be active per FeatureCell. Received: ${i}. Fix: Remove additional error controllers or combine them into a single controller.`)}r.length===1?e.push(r[0]):e.unshift(ry)}#v(e){return e.filter(t=>t.type===ci.License||t.type===ci.CoreAbstain?(Ee(`${this.cellKey} Conductor: Filtering out controller "${t.key}" of type "${t.type}" as it is reserved for internal use.`),!1):!0)}#m(e){e.controllers=e.controllers??[];let t=this.#v(e.controllers);this.#y(t,e),t.unshift(oy),t.unshift(ny);let r=t.map(o=>{let s=o[Bd];return{key:o.key,type:s.type,critical:s.critical,needsLicense:s.needsLicense}});mc().describeControllers({featureCellKey:this.cellKey,controllers:r});let i=new my(e.cell.key);this.#r=i.initializeControllers(t,this.#n,e.behaviorConfigs),this.#_()}#T(e){return this.vaultMonitor.startControllerVote(this.cellKey,e.controllerCtx.traceId,e.controllerCtx),this.decisionEngine.evaluateAttempt(e.controllerCtx)?.pipe(Ke(t=>{this.vaultMonitor.endControllerVote(this.cellKey,e.controllerCtx.traceId,e.controllerCtx,t)}),te(t=>t.outcome))}#b(){et.active&&this.#c.next()}#I(){!et.active||this.#t.length>0||queueMicrotask(()=>{this.#c.next()})}#D(){return So(this.#c)}},en="vault-feature-cell";function $N(n,e=[]){if(typeof n.initialState=="object"&&n.initialState!==null&&"data"in n.initialState)throw new Error(`[vault] Invalid FeatureCelldescriptorModel.initial for feature "${n.key}". Expected raw data (e.g., [] or {}), but received an object with resource fields { loading, data, error }. Pass plain data to avoid double-wrapping.`);if(e.filter(r=>r.type===w.Encrypt).length>1)throw new Error("[vault] FeatureCell cannot register multiple encryption behaviors.")}var yy=class{featureCellConfiguration;defaultBehaviors;behaviors;controllers;#t=!1;#r;#n=!1;#e=vy();cell;cellKey;ctx;destroyed$=new I;reset$=new I;state$=new I;constructor(e,t,r,i){this.featureCellConfiguration=e,this.defaultBehaviors=t,this.behaviors=r,this.controllers=i,this.cellKey=this.featureCellConfiguration.key,this.ctx=this.#i()}#i(){let e=this.destroyed$.asObservable(),t=this.state$,r=this.reset$.asObservable(),i={isLoading:!1,value:void 0,error:null,hasValue:!1},o={destroyed$:e,featureCellKey:this.cellKey,reset$:r,state$:t,get state(){let s=this.lastSnapshot;return{isLoading:s.isLoading,value:s.value,error:s.error,hasValue:s.hasValue}}};return Object.defineProperty(o,"lastSnapshot",{value:i,writable:!1,configurable:!1,enumerable:!0}),o}reset(){this.#e.startReset(this.cellKey,en,this.ctx),xe(`${en}: reset`),this.#a(),this.reset$.next(),this.#r?.reset(this.ctx),this.#e.endReset(this.cellKey,en,this.ctx)}destroy(){this.#e.startDestroy(this.cellKey,en,this.ctx),xe(`${en}: destroy`),this.reset$.next(),this.reset$.complete(),this.#r?.destroy(this.ctx),this.destroyed$.next(),this.destroyed$.complete(),this.state$.complete(),this.#e.endDestroy(this.cellKey,en,this.ctx)}#a(){if(this.#t){let e=`[vault] FeatureCell "${this.featureCellConfiguration.key}" encountered a critical initialization failure and is now in a corrupted state. Further use is blocked.`;throw this.#e.runtimeError(this.cellKey,en,this.ctx,e),new Error(e)}if(!this.#n){let e=`[vault] FeatureCell "${this.featureCellConfiguration.key}" has not been initialized. You must call cell.initialize() before using state methods.`;throw this.#e.runtimeError(this.cellKey,en,this.ctx,e),new Error(e)}}#c(e){if(this.#n){let t=`[vault] FeatureCell "${this.featureCellConfiguration.key}" already initialized.`;throw this.#e.runtimeError(this.cellKey,en,this.ctx,t),new Error(t)}try{this.#e.registerCell(this.cellKey,this.featureCellConfiguration.insights),this.#e.startInitialized(this.cellKey,en,this.ctx),$N(this.featureCellConfiguration,this.behaviors),this.#n=!0,this.#r=new gy({afterTapCallbacks:e.afterTapCallbacks,beforeTapCallbacks:e.beforeTapCallbacks,behaviors:this.behaviors,behaviorConfigs:e.behaviorConfigs,cell:this.cell,defaultBehaviors:this.defaultBehaviors,controllers:this.controllers,emitStateCallbacks:e.emitStateCallbacks,errorCallbacks:e.errorCallbacks,filterCallbacks:e.filterFunctions,initialState:e.hydrate||this.featureCellConfiguration.initialState,interceptors:e.interceptors,lastSnapshot:this.ctx.lastSnapshot,operators:e.operators,reducerCallbacks:e.reducerFunctions,state$:this.state$}),this.#r.initialize(this.ctx),et.active&&(Object.defineProperty(this.cell,"vaultSettled",{enumerable:!1,configurable:!1,writable:!1,value:()=>this.#r.vaultSettled()}),kN(this.cellKey,this.#r.vaultSettled.bind(this.#r))),this.#e.endInitialized(this.cellKey,en,this.ctx)}catch(t){throw this.#t=!0,this.#e.runtimeError(this.cellKey,en,this.ctx,t),t}}#s(e){throw this.#t=!0,this.#e.runtimeError(this.cellKey,en,this.ctx,e),new Error(e)}setup(){let e=[],t=[],r=[],i=[],o,s=[],a=[],c=[],l=[],u=new Map,d={behaviorConfigs:u,afterTaps:f=>(this.#n&&this.#s('Cannot call "afterTaps" after initialize(). Configuration must be done before initialization.'),Array.isArray(f)&&e.push(...f),d),beforeTaps:f=>(this.#n&&this.#s('Cannot call "beforeTaps" after initialize(). Configuration must be done before initialization.'),Array.isArray(f)&&t.push(...f),d),emitStates:f=>(this.#n&&this.#s('Cannot call "emitStates" after initialize(). Configuration must be done before initialization.'),Array.isArray(f)&&l.push(...f),d),errors:f=>(this.#n&&this.#s('Cannot call "errors" after initialize(). Configuration must be done before initialization.'),Array.isArray(f)&&r.push(...f),d),filters:f=>(this.#n&&this.#s('Cannot call "filters" after initialize(). Configuration must be done before initialization.'),Array.isArray(f)&&i.push(...f),d),hydrate:f=>(this.#n&&this.#s('Cannot call "hydrate" after initialize(). Configuration must be done before initialization.'),o=f,d),initialize:()=>{this.#c({afterTapCallbacks:e,beforeTapCallbacks:t,behaviorConfigs:u,emitStateCallbacks:l,errorCallbacks:r,filterFunctions:i,hydrate:o,interceptors:s,operators:a,reducerFunctions:c})},interceptors:f=>(this.#n&&this.#s('Cannot call "interceptors" after initialize(). Configuration must be done before initialization.'),Array.isArray(f)&&s.push(...f),d),operators:f=>(this.#n&&this.#s('Cannot call "operators" after initialize(). Configuration must be done before initialization.'),Array.isArray(f)&&a.push(...f),d),reducers:f=>(this.#n&&this.#s('Cannot call "reducers" after initialize(). Configuration must be done before initialization.'),Array.isArray(f)&&c.push(...f),d)};return d}mergeState(e,t){return this.#a(),this.#r.conduct(this.ctx,e,vn.Merge,t)}replaceState(e,t){return this.#a(),this.#r.conduct(this.ctx,e,vn.Replace,t)}},Zd=class extends yy{constructor(e,t,r,i){super(e,t,r,i)}build(){let e=this.setup(),t=this.ctx,r={afterTaps:e.afterTaps,beforeTaps:e.beforeTaps,destroy:this.destroy.bind(this),destroyed$:this.destroyed$.asObservable(),errors:e.errors,filters:e.filters,hydrate:e.hydrate,initialize:e.initialize,interceptors:e.interceptors,key:this.cellKey,mergeState:this.mergeState.bind(this),operators:e.operators,reducers:e.reducers,emitStates:e.emitStates,replaceState:this.replaceState.bind(this),reset$:this.reset$.asObservable(),reset:this.reset.bind(this),state$:this.state$.asObservable(),get state(){return{isLoading:t.lastSnapshot.isLoading,value:t.lastSnapshot.value,error:t.lastSnapshot.error,hasValue:t.lastSnapshot.hasValue}}};return this.cell=r,this.behaviors.forEach(i=>{i?.installFluentApi?.(this.cell,e.behaviorConfigs)}),this.controllers.forEach(i=>{i?.installFluentApi?.(this.cell,e.behaviorConfigs)}),Object.defineProperty(r,"ctx",{value:this.ctx,enumerable:!1,writable:!1}),Object.defineProperty(r,"key",{value:this.featureCellConfiguration.key,enumerable:!1,writable:!1}),r}},co=new Map,Ew=new Map;function HN(n,e){if(e){if(co.has(n)){if(!et.active){let r=co.get(n);throw new Error(`[vault] Duplicate FeatureCell key detected: "${n}". Each FeatureCell must have a unique key. Existing token: "${r?.key}"`)}return co.get(n)}let t={key:n};return co.set(n,t),t}if(!co.has(n))throw new Error(`[vault] FeatureCell token not found for key "${n}". You must call provideFeatureCell() before retrieving this FeatureCell.`);if(Ew.has(n)){if(!et.active)throw new Error(`[vault] FeatureCell "${n}" can only be owned by a single consumer.`);return co.get(n)}return Ew.set(n,!0),co.get(n)}function Aw(n){return HN(n,!0)}var gc={FEATURE_CELL_KEY:"vault:feature-cell-key",FEATURE_CELL_STATE:"vault:feature-cell-state"};function _y(n){return function(e){e[gc.FEATURE_CELL_KEY]=n,e[gc.FEATURE_CELL_STATE]=null}}var lo=new Map,kw=new Map;function Nw(n,e){let t=lo.get(n);if(e){if(lo.has(n)){if(!rr.active)throw new Error(`[vault] Duplicate FeatureCell key detected: "${n}". Each FeatureCell must have a unique key. Existing token: "${n}"`);return lo.get(n)}return t=new v(`FEATURE_CELL:${n}`),lo.set(n,t),t}else{if(!lo.has(n))throw new Error(`[vault] FeatureCell token not found for key "${n}". You must call provideFeatureCell() before retrieving this FeatureCell.`);if(kw.has(n)){if(!rr.active)throw new Error(`[vault] FeatureCell "${n}" can only be injected into a single decorated @FeatureCell service.`);return lo.get(n)}return kw.set(n,!0),lo.get(n)}}function Ow(n){return Nw(n,!0)}function Pw(n){return Nw(n,!1)}function Dy(n){let e=n;if(!e)throw new Error("injectVault() must be called inside a @FeatureCell()-decorated service and must be given the class reference.");let t=e[gc.FEATURE_CELL_KEY];if(!t)throw new Error("injectVault() must be called inside a @FeatureCell()-decorated service.");let r=Pw(t);return h(r)}var zN="@sdux-vault/core",WN="0.9.0";ro(zN,WN);var Ey="external";var jn=class extends Cy{constructor(t,r){super(r);this.behaviorCtx=r;this.key=t}type=jn.type;critical=jn.critical;key;commitState(t,r,i){y(`${this.key} commitState called with: ${ce(r)}`);try{if(!!r&&Object.keys(r).length>0){let a=Rd(r);Object.assign(t.lastSnapshot,a),t.lastSnapshot.hasValue=t.lastSnapshot.value!==void 0&&t.lastSnapshot.value!==null}let s={snapshot:Rd(t.lastSnapshot),type:i};t.options&&(s.options=t.options),t.state$.next(s)}catch(o){io(`${this.key} an error occurred updating the state`,o)}}preparePipelineIncoming(t){let r=t.incoming,i={};return hs(r)||ac(r)&&ps(r.value)?(this.commitState(t,null,vt.IncomingPipeline),Fn):ac(r)&&ai(r.value)?(hs(r.loading)||(i.isLoading=r.loading),Ad(r.error)&&(i.error=ps(r.error)?null:Je(r.error,Ey)),this.commitState(t,i,vt.IncomingPipeline),gn):(ms(r)?i.isLoading=!0:ac(r)&&(hs(r?.loading)||(i.isLoading=r.loading),Ad(r?.error)&&(i.error=ps(r.error)?null:Je(r.error,Ey))),Object.keys(i).length>0&&this.commitState(t,i,vt.IncomingPipeline),r)}finalizePipelineState(t,r){if(y(`${this.key} - finalizeVaultState`),ms(r.incoming)&&this.commitState(r,{isLoading:!1},vt.FinalizePipeline),xg(t)){this.commitState(r,null,vt.FinalizePipeline);return}if(ps(t)||Rg(t)){this.commitState(r,{value:void 0},vt.FinalizePipeline);return}!hs(t)&&!Rw(t)&&this.commitState(r,{value:t},vt.FinalizePipeline)}finalizePipelineVaultStop(t){y(`${this.key} - finalizePipelineVaultStop`),this.commitState(t,null,vt.FinalizePipeline)}finalizePipelineError(t,r){y(`${this.key} - finalizePipelineError`),this.commitState(r,{error:t,value:r.lastSnapshot.value,isLoading:!1},vt.PipelineError)}finalizeControllerAbort(t){y(`${this.key} - finalizeAbort`),this.commitState(t,{isLoading:!1},vt.AbortController)}finalizeControllerDeny(t){y(`${this.key} - finalizeDeny`),this.commitState(t,{isLoading:!1},vt.DenyController)}destroy(t){N(`${this.key} - destroy`),this.commitState(t,{isLoading:!1,value:void 0,error:null},vt.PipelineDestroy)}reset(t){N(`${this.key} - reset`),this.commitState(t,{isLoading:!1,value:void 0,error:null},vt.PipelineReset)}};_(jn,"type"),_(jn,"critical"),jn=J([re({type:H.CoreState,key:ie("Core","State"),critical:!0})],jn);var Vn=class extends oc{critical=Vn.critical;constructor(e,t){super(e,t)}async callbackError(e,t,r){if(typeof r!="function")N(`${this.key} handleError skipped - "${r}" is not a function.`);else try{await r(e,t)}catch(i){N(`${this.key} oldschoolCallback threw: ${i}`)}}};_(Vn,"type"),_(Vn,"key"),_(Vn,"critical"),Vn=J([re({type:H.CoreErrorCallback,key:ie("Core","ErrorCallback"),critical:!0})],Vn);var Ar=class{constructor(e,t){this.behaviorCtx=t;this.key=e}critical=!0;key;type=H.CoreError;handleError(e,t){return Je(e,t)}destroy(){N(`${this.key} - destroy "noop"`)}reset(){N(`${this.key} - reset "noop"`)}};_(Ar,"type"),_(Ar,"key"),_(Ar,"critical"),Ar=J([re({type:H.CoreError,key:ie("Core","Error"),critical:!0})],Ar);var Cn,Lw,Fw,Bw,Yd,kr=class{constructor(e,t){this.behaviorCtx=t;go(this,Cn);_(this,"type",H.Filter);_(this,"critical",!0);_(this,"key");this.key=e}applyFilter(e,t){if(y(`${this.key} applyFilter called with "${ce(e)}".`),e===void 0){y(`${this.key} applyFilter skipped - not a valid plain state. The current type is ${typeof e}. Undefined returned.`);return}if(typeof t!="function")return y(`${this.key} applyFilter skipped. The filter type is ${typeof t}. "${ce(e)}" returned.`),e;let r;try{r=t(e)}catch(i){throw io(`${this.key} filter execution failed`,i.message),i}return r===void 0?(y(`${this.key} Filter returned undefined. state rejected.`),gn):(ar(this,Cn,Lw).call(this,e,r)||ar(this,Cn,Fw).call(this,e,r)||(ar(this,Cn,Bw).call(this,e,r),y(`${this.key} applyFilter returned with "${ce(r)}".`)),r)}destroy(){N(`${this.key} - destroy "noop"`)}reset(){N(`${this.key} - reset "noop"`)}};Cn=new WeakSet,Lw=function(e,t){if(Array.isArray(e)){if(!Array.isArray(t))throw ar(this,Cn,Yd).call(this,e,t),new Error("[vault] Filter returned non-array for array input.");return!0}return!1},Fw=function(e,t){if(e!==null&&typeof e=="object"){if(typeof t!="object"||t===null||Array.isArray(t))throw ar(this,Cn,Yd).call(this,e,t),new Error("[vault] Filter returned invalid object for object input.");return!0}return!1},Bw=function(e,t){if(typeof t!=typeof e)throw ar(this,Cn,Yd).call(this,e,t),new Error(`[vault] Filter returned a value of incorrect type. Expected "${typeof e}", got "${typeof t}".`)},Yd=function(e,t){y(`${this.key} The types not aligned. Current type: "${typeof e}". Next type: ${typeof t}. "${ce(t)}" returned.`)},_(kr,"type"),_(kr,"key"),_(kr,"critical"),kr=J([re({type:H.Filter,key:ie("Core","Filter"),critical:!0})],kr);var _n=class{constructor(e,t){this.behaviorCtx=t;this.key=e}type=_n.type;key;critical=_n.critical;computeMerge(e,t,r){let i=e,o=t,s=r?.clearUndefined??!1;return y(`${this.key} merge called (clear: ${s})`),o===void 0&&!s?(y(`${this.key} computeMerge skipped. The next value "${o}" and clear is "${s}`),i):o===void 0&&s?(y(`${this.key} computeMerge skipped. The next value "${o}" and clear is "${s}`),Fn):Array.isArray(i)&&Array.isArray(o)?(y(`${this.key} merging array. Return clone of next`),[...o]):(y(`${this.key} non-array branch. Return next`),o)}destroy(){N(`${this.key} - destroy "noop"`)}reset(){N(`${this.key} - reset "noop"`)}};_(_n,"type"),_(_n,"key"),_(_n,"critical",!0),_n=J([re({type:H.Merge,key:ie("Core","ArrayMerge"),critical:!0})],_n);function jw(n){n.fromObservable=function(e){return e}}var _t=class{constructor(e,t){this.behaviorCtx=t;this.key=e}type=_t.type;key;critical=_t.critical;resolveType=_t.resolveType;extendCellAPI(e){return{fromObservable:t=>new O(r=>{y(`${this.key} fromObservable called.`);let i=e.destroyed$??me,o=e.reset$??me,s=t.pipe(fe(o),fe(i),St(1)).subscribe({next:a=>{y(`${this.key} fromObservable emitted value "${ce(a)}".`),r.next({loading:!1,value:a,error:null})},error:a=>{let c=Je(a,e.featureCellKey);r.error(c),y(`${this.key} fromObservable emitted error "${c.message}".`)},complete:()=>{r.complete(),y(`${this.key} fromObservable completed.`)}});return()=>{s.unsubscribe(),y(`${this.key} fromObservable subscription unsubscribed.`)}})}}destroy(){N(`${this.key} - destroy "noop"`)}reset(){N(`${this.key} - reset "noop"`)}};_(_t,"extension",jw),_(_t,"type"),_(_t,"key"),_(_t,"resolveType"),_(_t,"critical"),_t=J([re({type:H.FromObservable,key:ie("Core","FromObservable"),critical:!1,resolveType:Xt.Observable})],_t);function Vw(n){n.fromDeferred=function(e){throw new Error("[vault] fromDeferred() behavior not installed")},n.fromPromise=function(e){throw new Error("[vault] fromPromise() behavior not installed")}}var Dt=class{constructor(e,t){this.behaviorCtx=t;this.key=e}type=Dt.type;key;critical=Dt.critical;resolveType=Dt.resolveType;extendCellAPI(e){let t=r=>new Promise((i,o)=>{if(y(`${this.key} fromPromise called.`),ai(r)){i({loading:!1,value:void 0,error:null});return}if(!sc(r)){let a=r;i({loading:a?.loading??!1,value:void 0,error:a?.error??null});return}let s;try{s=r.value?.()}catch(a){let c=Je(a,e.featureCellKey);o(c);return}Promise.resolve(s).then(a=>{y(`${this.key} fromPromise resolved value: ${ce(a)}`),i({loading:r.loading??!1,value:a,error:r.error??null})}).catch(a=>{let c=Je(a,e.featureCellKey);o(c)})});return{fromPromise:r=>t(r),fromDeferred:r=>t(r)}}destroy(){N(`${this.key} - destroy "noop"`)}reset(){N(`${this.key} - reset "noop"`)}};_(Dt,"extension",Vw),_(Dt,"type"),_(Dt,"key"),_(Dt,"critical"),_(Dt,"resolveType"),Dt=J([re({type:H.FromPromise,key:ie("Core","FromPromise"),critical:!1,resolveType:Xt.Promise})],Dt);var Nr=class{constructor(e,t){this.behaviorCtx=t;this.key=e}critical=!0;type=H.Reduce;key;applyReducer(e,t){return y(`${this.key} applyReducer called with "${ce(e)}".`),typeof t!="function"?(y(`${this.key} applyReducer skipped - reducer is not a function.`),e):t(e)}destroy(){N(`${this.key} - destroy "noop"`)}reset(){N(`${this.key} - reset "noop"`)}};_(Nr,"type"),_(Nr,"key"),_(Nr,"critical"),Nr=J([re({type:H.Reduce,key:ie("Core","Reducer"),critical:!0})],Nr);var Dn=class{constructor(e,t){this.behaviorCtx=t;this.key=e}type=H.Resolve;key;critical=!1;resolveType=Dn.resolveType;async computeResolve(e){let t=e.incoming;if(y(`${this.key} computeResolve called with incoming: ${ce(t)}`),!Wt(t)){y(`${this.key} computeResolve skipped \u2014 incoming is not an Observable.`);return}y(`${this.key} computeResolve detected Observable input.`);let r=t,i=e.reset$??me,o=e.destroyed$??me;try{let s=await So(r.pipe(fe(i),fe(o),St(1)));return y(`${this.key} computeResolve resolved value: ${ce(s)}`),s}catch(s){let a=Je(s,e.featureCellKey);throw y(`${this.key} computeResolve caught error: ${a.message}`),a}}destroy(){N(`${this.key} - destroy "noop"`)}reset(){N(`${this.key} - reset "noop"`)}};_(Dn,"type"),_(Dn,"key"),_(Dn,"critical"),_(Dn,"resolveType"),Dn=J([re({type:H.Resolve,key:ie("Core","Observable"),critical:!1,resolveType:Xt.Observable})],Dn);var $t=class{constructor(e,t){this.behaviorCtx=t;this.key=e}type=$t.type;key;critical=$t.critical;resolveType=$t.resolveType;async computeResolve(e){let t=e.incoming;if(y(`${this.key} computeResolve promise called with incoming: ${ce(t)}`),!(sc(t)||kd(t))||ai(t)){y(`${this.key} computeResolve skipped \u2014 incoming is not a deferred factory.`);return}y(`${this.key} computeResolve detected Promise input.`);try{let r;return kd(t)?r=await t?.():r=await t.value?.(),y(`${this.key} computeResolve resolved value: ${ce(r)}`),r}catch(r){let i=Je(r,e.featureCellKey);throw y(`${this.key} computeResolve caught error: ${i.message}`),i}}destroy(){N(`${this.key} - destroy "noop"`)}reset(){N(`${this.key} - reset "noop"`)}};_($t,"type"),_($t,"key"),_($t,"critical"),_($t,"resolveType"),$t=J([re({type:H.Resolve,key:ie("Core","Promise"),critical:!1,resolveType:Xt.Promise})],$t);var Ht=class{constructor(e,t){this.behaviorCtx=t;this.key=e}type=Ht.type;critical=Ht.critical;key;resolveType=Ht.resolveType;async computeResolve(e){y(`${this.key} computeResolve called with "${ce(e.incoming)}".`);let t=e.incoming;if(!t||ms(t)){y(`${this.key} computeResolve skipped - not a valid plain state.`);return}let{value:r}=t;if(r===void 0){y(`${this.key} value is undefined and resolution skipped.`);return}return r===null?(y(`${this.key} value is null and clear state returned.`),Fn):Array.isArray(r)?(y(`${this.key} array value detected and cloned.`),[...r]):typeof r=="object"?(y(`${this.key} object value detected and cloned.`),g({},r)):(y(`${this.key} primitive value detected and returned.`),r)}destroy(){N(`${this.key} - destroy "noop"`)}reset(){N(`${this.key} - reset "noop"`)}};_(Ht,"type"),_(Ht,"key"),_(Ht,"critical"),_(Ht,"resolveType"),Ht=J([re({type:H.Resolve,key:ie("Core","Value"),critical:!0,resolveType:Xt.Value})],Ht);function Uw(n){n.fromStream=function(e,t){}}var Et=class{constructor(e,t){this.behaviorCtx=t;this.key=e}type=Et.type;key;critical=Et.critical;resolveType=Et.resolveType;extendCellAPI(e){return{fromStream:(t,r)=>{let{autoResetError:i=!0}=r??{};y(`${this.key} fromStream called.`),y(`${this.key} fromStream options resolved (autoResetError=${i}).`),e.vaultMonitor.ingressSubscribed(e.featureCellKey,this.key,e,"fromStream"),y(`${this.key} fromStream subscription started.`),t.pipe(fe(e.destroyed$)).subscribe({next:o=>{y(`${this.key} subscription.next called.`),y(`${this.key} incoming value received: "${ce(o)}".`),i&&y(`${this.key} autoResetError enabled \u2192 clearing error.`);let s=i?{value:o,error:null}:{value:o};e.mergeState(s),y(`${this.key} mergeState invoked from stream.next.`)},error:o=>{y(`${this.key} subscription.error called.`);let s=Je(o,this.key);y(`${this.key} stream error converted to VaultError: "${s.message}".`),e.mergeState({error:s}),y(`${this.key} mergeState invoked from stream.error.`)},complete:()=>{y(`${this.key} subscription.complete called.`),e.vaultMonitor.ingressCompleted(e.featureCellKey,this.key,e,"fromStream"),y(`${this.key} fromStream completed.`)}})}}}destroy(){N(`${this.key} - destroy "noop"`)}reset(){N(`${this.key} - reset "noop"`)}};_(Et,"extension",Uw),_(Et,"type"),_(Et,"key"),_(Et,"critical"),_(Et,"resolveType"),Et=J([re({type:H.FromStream,key:ie("Core","FromStream"),critical:!1,resolveType:Xt.Observable})],Et);var Or=class{constructor(e,t){this.behaviorCtx=t;this.key=e}type=H.CoreEmitState;critical=!0;key;emitState(e,t){if(y(`${this.key} emitState called with "${ce(e)}".`),typeof t!="function")return y(`${this.key} emitState skipped. The emitState type is ${typeof t}. "${ce(e)}" returned.`),gn;try{t(e)}catch(r){return io(`${this.key} emitState execution failed`,ce(r)),gn}}destroy(){N(`${this.key} - destroy "noop"`)}reset(){N(`${this.key} - reset "noop"`)}};_(Or,"type"),_(Or,"key"),_(Or,"critical"),Or=J([re({type:H.CoreEmitState,key:ie("Core","EmitState"),critical:!0})],Or);var Cs=class{constructor(e,t){this.behaviorCtx=t;this.key=e}static type;static key;static critical=!0;critical=!0;key;type;executeTap(e,t){y(`${this.key} executeTap called with "${ce(e)}".`),typeof t!="function"&&y(`${this.key} executeTap skipped - tap is not a function. Type is "${typeof t}".`),t(e)}destroy(){N(`${this.key} - destroy "noop"`)}reset(){N(`${this.key} - reset "noop"`)}};var _s=class extends Cs{type=H.CoreAfterTap;applyAfterTap(e,t){this.executeTap(e,t)}};_s=J([re({type:H.CoreAfterTap,key:ie("Core","AfterTap"),critical:!0})],_s);var Ds=class extends Cs{type=H.CoreBeforeTap;applyBeforeTap(e,t){this.executeTap(e,t)}};Ds=J([re({type:H.CoreBeforeTap,key:ie("Core","BeforeTap"),critical:!0})],Ds);function wy(n,e=[],t=[]){return Aw(n.key),Iw({key:n.key}),new Zd(n,GN(),e,t).build()}function GN(){return[_s,Ds,Ar,kr,_t,Dt,Et,Dn,$t,Nr,Ht,jn,Vn,_n,Or]}var Qd=class{constructor(e){this.core=e;this.#t.add(this.core.state$.subscribe(t=>{this.#e.set(t?.snapshot?.isLoading??!1),this.#n.set(t?.snapshot?.error??null),this.#r.set(t?.snapshot?.value??void 0)})),this.#a.onDestroy(()=>this.destroy())}#t=new q;#r=Le(void 0);#n=Le(null);#e=Le(!1);#i=Ft(()=>{let e=this.#r();return e!=null});#a=h(Ue);build(){let e=this.core;return Object.defineProperty(e,"state",{configurable:!0,enumerable:!0,get:()=>({isLoading:this.#e.asReadonly(),value:this.#r.asReadonly(),error:this.#n.asReadonly(),hasValue:this.#i})}),e}destroy(){this.core.destroy(),this.#t.unsubscribe()}};function Ty(n,e,t=[],r=[]){return[{provide:Ow(e.key),useFactory:()=>{let o=wy(e,t,r);return new Qd(o).build()}},n]}function Iy(n={}){return Iu(()=>{Tw(n)})}var qN="@sdux-vault/angular",KN="0.11.0";ro(qN,KN);var yc=class{_attachedHost=null;attach(e){return this._attachedHost=e,e.attach(this)}detach(){let e=this._attachedHost;e!=null&&(this._attachedHost=null,e.detach())}get isAttached(){return this._attachedHost!=null}setAttachedHost(e){this._attachedHost=e}},Sy=class extends yc{component;viewContainerRef;injector;projectableNodes;bindings;constructor(e,t,r,i,o){super(),this.component=e,this.viewContainerRef=t,this.injector=r,this.projectableNodes=i,this.bindings=o||null}},Es=class extends yc{templateRef;viewContainerRef;context;injector;constructor(e,t,r,i){super(),this.templateRef=e,this.viewContainerRef=t,this.context=r,this.injector=i}get origin(){return this.templateRef.elementRef}attach(e,t=this.context){return this.context=t,super.attach(e)}detach(){return this.context=void 0,super.detach()}},My=class extends yc{element;constructor(e){super(),this.element=e instanceof Ie?e.nativeElement:e}},xy=class{_attachedPortal=null;_disposeFn=null;_isDisposed=!1;hasAttached(){return!!this._attachedPortal}attach(e){if(e instanceof Sy)return this._attachedPortal=e,this.attachComponentPortal(e);if(e instanceof Es)return this._attachedPortal=e,this.attachTemplatePortal(e);if(this.attachDomPortal&&e instanceof My)return this._attachedPortal=e,this.attachDomPortal(e)}attachDomPortal=null;detach(){this._attachedPortal&&(this._attachedPortal.setAttachedHost(null),this._attachedPortal=null),this._invokeDisposeFn()}dispose(){this.hasAttached()&&this.detach(),this._invokeDisposeFn(),this._isDisposed=!0}setDisposeFn(e){this._disposeFn=e}_invokeDisposeFn(){this._disposeFn&&(this._disposeFn(),this._disposeFn=null)}};var $w=(()=>{class n extends Es{constructor(){let t=h(Mt),r=h(xt);super(t,r)}static \u0275fac=function(r){return new(r||n)};static \u0275dir=Ce({type:n,selectors:[["","cdkPortal",""]],exportAs:["cdkPortal"],features:[Kt]})}return n})(),Ry=(()=>{class n extends xy{_moduleRef=h(vr,{optional:!0});_document=h(pe);_viewContainerRef=h(xt);_isInitialized=!1;_attachedRef=null;constructor(){super()}get portal(){return this._attachedPortal}set portal(t){this.hasAttached()&&!t&&!this._isInitialized||(this.hasAttached()&&super.detach(),t&&super.attach(t),this._attachedPortal=t||null)}attached=new ee;get attachedRef(){return this._attachedRef}ngOnInit(){this._isInitialized=!0}ngOnDestroy(){super.dispose(),this._attachedRef=this._attachedPortal=null}attachComponentPortal(t){t.setAttachedHost(this);let r=t.viewContainerRef!=null?t.viewContainerRef:this._viewContainerRef,i=r.createComponent(t.component,{index:r.length,injector:t.injector||r.injector,projectableNodes:t.projectableNodes||void 0,ngModuleRef:this._moduleRef||void 0,bindings:t.bindings||void 0});return r!==this._viewContainerRef&&this._getRootNode().appendChild(i.hostView.rootNodes[0]),super.setDisposeFn(()=>i.destroy()),this._attachedPortal=t,this._attachedRef=i,this.attached.emit(i),i}attachTemplatePortal(t){t.setAttachedHost(this);let r=this._viewContainerRef.createEmbeddedView(t.templateRef,t.context,{injector:t.injector});return super.setDisposeFn(()=>this._viewContainerRef.clear()),this._attachedPortal=t,this._attachedRef=r,this.attached.emit(r),r}attachDomPortal=t=>{let r=t.element;r.parentNode;let i=this._document.createComment("dom-portal");t.setAttachedHost(this),r.parentNode.insertBefore(i,r),this._getRootNode().appendChild(r),this._attachedPortal=t,super.setDisposeFn(()=>{i.parentNode&&i.parentNode.replaceChild(r,i)})};_getRootNode(){let t=this._viewContainerRef.element.nativeElement;return t.nodeType===t.ELEMENT_NODE?t:t.parentNode}static \u0275fac=function(r){return new(r||n)};static \u0275dir=Ce({type:n,selectors:[["","cdkPortalOutlet",""]],inputs:{portal:[0,"cdkPortalOutlet","portal"]},outputs:{attached:"attached"},exportAs:["cdkPortalOutlet"],features:[Kt]})}return n})();var Xd=new WeakMap,vc=(()=>{class n{_appRef;_injector=h(Te);_environmentInjector=h(Oe);load(t){let r=this._appRef=this._appRef||this._injector.get(Jn),i=Xd.get(r);i||(i={loaders:new Set,refs:[]},Xd.set(r,i),r.onDestroy(()=>{Xd.get(r)?.refs.forEach(o=>o.destroy()),Xd.delete(r)})),i.loaders.has(t)||(i.loaders.add(t),i.refs.push(Mm(t,{environmentInjector:this._environmentInjector})))}static \u0275fac=function(r){return new(r||n)};static \u0275prov=C({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})();var Hw=(()=>{class n{static \u0275fac=function(r){return new(r||n)};static \u0275cmp=Fe({type:n,selectors:[["structural-styles"]],decls:0,vars:0,template:function(r,i){},styles:[`.mat-focus-indicator {
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
`],encapsulation:2,changeDetection:0})}return n})();function bc(n){return n.buttons===0||n.detail===0}function Cc(n){let e=n.touches&&n.touches[0]||n.changedTouches&&n.changedTouches[0];return!!e&&e.identifier===-1&&(e.radiusX==null||e.radiusX===1)&&(e.radiusY==null||e.radiusY===1)}var Ay;function zw(){if(Ay==null){let n=typeof document<"u"?document.head:null;Ay=!!(n&&(n.createShadowRoot||n.attachShadow))}return Ay}function ky(n){if(zw()){let e=n.getRootNode?n.getRootNode():null;if(typeof ShadowRoot<"u"&&ShadowRoot&&e instanceof ShadowRoot)return e}return null}function Pr(n){return n.composedPath?n.composedPath()[0]:n.target}var Ny;try{Ny=typeof Intl<"u"&&Intl.v8BreakIterator}catch{Ny=!1}var wt=(()=>{class n{_platformId=h(Hi);isBrowser=this._platformId?eE(this._platformId):typeof document=="object"&&!!document;EDGE=this.isBrowser&&/(edge)/i.test(navigator.userAgent);TRIDENT=this.isBrowser&&/(msie|trident)/i.test(navigator.userAgent);BLINK=this.isBrowser&&!!(window.chrome||Ny)&&typeof CSS<"u"&&!this.EDGE&&!this.TRIDENT;WEBKIT=this.isBrowser&&/AppleWebKit/i.test(navigator.userAgent)&&!this.BLINK&&!this.EDGE&&!this.TRIDENT;IOS=this.isBrowser&&/iPad|iPhone|iPod/.test(navigator.userAgent)&&!("MSStream"in window);FIREFOX=this.isBrowser&&/(firefox|minefield)/i.test(navigator.userAgent);ANDROID=this.isBrowser&&/android/i.test(navigator.userAgent)&&!this.TRIDENT;SAFARI=this.isBrowser&&/safari/i.test(navigator.userAgent)&&this.WEBKIT;constructor(){}static \u0275fac=function(r){return new(r||n)};static \u0275prov=C({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})();var _c;function Ww(){if(_c==null&&typeof window<"u")try{window.addEventListener("test",null,Object.defineProperty({},"passive",{get:()=>_c=!0}))}finally{_c=_c||!1}return _c}function ws(n){return Ww()?n:!!n.capture}function di(n,e=0){return Gw(n)?Number(n):arguments.length===2?e:0}function Gw(n){return!isNaN(parseFloat(n))&&!isNaN(Number(n))}function En(n){return n instanceof Ie?n.nativeElement:n}var qw=new v("cdk-input-modality-detector-options"),Kw={ignoreKeys:[18,17,224,91,16]},Zw=650,Oy={passive:!0,capture:!0},Yw=(()=>{class n{_platform=h(wt);_listenerCleanups;modalityDetected;modalityChanged;get mostRecentModality(){return this._modality.value}_mostRecentTarget=null;_modality=new ke(null);_options;_lastTouchMs=0;_onKeydown=t=>{this._options?.ignoreKeys?.some(r=>r===t.keyCode)||(this._modality.next("keyboard"),this._mostRecentTarget=Pr(t))};_onMousedown=t=>{Date.now()-this._lastTouchMs<Zw||(this._modality.next(bc(t)?"keyboard":"mouse"),this._mostRecentTarget=Pr(t))};_onTouchstart=t=>{if(Cc(t)){this._modality.next("keyboard");return}this._lastTouchMs=Date.now(),this._modality.next("touch"),this._mostRecentTarget=Pr(t)};constructor(){let t=h(Z),r=h(pe),i=h(qw,{optional:!0});if(this._options=g(g({},Kw),i),this.modalityDetected=this._modality.pipe(qs(1)),this.modalityChanged=this.modalityDetected.pipe(xo()),this._platform.isBrowser){let o=h(un).createRenderer(null,null);this._listenerCleanups=t.runOutsideAngular(()=>[o.listen(r,"keydown",this._onKeydown,Oy),o.listen(r,"mousedown",this._onMousedown,Oy),o.listen(r,"touchstart",this._onTouchstart,Oy)])}}ngOnDestroy(){this._modality.complete(),this._listenerCleanups?.forEach(t=>t())}static \u0275fac=function(r){return new(r||n)};static \u0275prov=C({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})(),Dc=(function(n){return n[n.IMMEDIATE=0]="IMMEDIATE",n[n.EVENTUAL=1]="EVENTUAL",n})(Dc||{}),Qw=new v("cdk-focus-monitor-default-options"),Jd=ws({passive:!0,capture:!0}),Py=(()=>{class n{_ngZone=h(Z);_platform=h(wt);_inputModalityDetector=h(Yw);_origin=null;_lastFocusOrigin=null;_windowFocused=!1;_windowFocusTimeoutId;_originTimeoutId;_originFromTouchInteraction=!1;_elementInfo=new Map;_monitoredElementCount=0;_rootNodeFocusListenerCount=new Map;_detectionMode;_windowFocusListener=()=>{this._windowFocused=!0,this._windowFocusTimeoutId=setTimeout(()=>this._windowFocused=!1)};_document=h(pe);_stopInputModalityDetector=new I;constructor(){let t=h(Qw,{optional:!0});this._detectionMode=t?.detectionMode||Dc.IMMEDIATE}_rootNodeFocusAndBlurListener=t=>{let r=Pr(t);for(let i=r;i;i=i.parentElement)t.type==="focus"?this._onFocus(t,i):this._onBlur(t,i)};monitor(t,r=!1){let i=En(t);if(!this._platform.isBrowser||i.nodeType!==1)return T();let o=ky(i)||this._document,s=this._elementInfo.get(i);if(s)return r&&(s.checkChildren=!0),s.subject;let a={checkChildren:r,subject:new I,rootNode:o};return this._elementInfo.set(i,a),this._registerGlobalListeners(a),a.subject}stopMonitoring(t){let r=En(t),i=this._elementInfo.get(r);i&&(i.subject.complete(),this._setClasses(r),this._elementInfo.delete(r),this._removeGlobalListeners(i))}focusVia(t,r,i){let o=En(t),s=this._document.activeElement;o===s?this._getClosestElementsInfo(o).forEach(([a,c])=>this._originChanged(a,r,c)):(this._setOrigin(r),typeof o.focus=="function"&&o.focus(i))}ngOnDestroy(){this._elementInfo.forEach((t,r)=>this.stopMonitoring(r))}_getWindow(){return this._document.defaultView||window}_getFocusOrigin(t){return this._origin?this._originFromTouchInteraction?this._shouldBeAttributedToTouch(t)?"touch":"program":this._origin:this._windowFocused&&this._lastFocusOrigin?this._lastFocusOrigin:t&&this._isLastInteractionFromInputLabel(t)?"mouse":"program"}_shouldBeAttributedToTouch(t){return this._detectionMode===Dc.EVENTUAL||!!t?.contains(this._inputModalityDetector._mostRecentTarget)}_setClasses(t,r){t.classList.toggle("cdk-focused",!!r),t.classList.toggle("cdk-touch-focused",r==="touch"),t.classList.toggle("cdk-keyboard-focused",r==="keyboard"),t.classList.toggle("cdk-mouse-focused",r==="mouse"),t.classList.toggle("cdk-program-focused",r==="program")}_setOrigin(t,r=!1){this._ngZone.runOutsideAngular(()=>{if(this._origin=t,this._originFromTouchInteraction=t==="touch"&&r,this._detectionMode===Dc.IMMEDIATE){clearTimeout(this._originTimeoutId);let i=this._originFromTouchInteraction?Zw:1;this._originTimeoutId=setTimeout(()=>this._origin=null,i)}})}_onFocus(t,r){let i=this._elementInfo.get(r),o=Pr(t);!i||!i.checkChildren&&r!==o||this._originChanged(r,this._getFocusOrigin(o),i)}_onBlur(t,r){let i=this._elementInfo.get(r);!i||i.checkChildren&&t.relatedTarget instanceof Node&&r.contains(t.relatedTarget)||(this._setClasses(r),this._emitOrigin(i,null))}_emitOrigin(t,r){t.subject.observers.length&&this._ngZone.run(()=>t.subject.next(r))}_registerGlobalListeners(t){if(!this._platform.isBrowser)return;let r=t.rootNode,i=this._rootNodeFocusListenerCount.get(r)||0;i||this._ngZone.runOutsideAngular(()=>{r.addEventListener("focus",this._rootNodeFocusAndBlurListener,Jd),r.addEventListener("blur",this._rootNodeFocusAndBlurListener,Jd)}),this._rootNodeFocusListenerCount.set(r,i+1),++this._monitoredElementCount===1&&(this._ngZone.runOutsideAngular(()=>{this._getWindow().addEventListener("focus",this._windowFocusListener)}),this._inputModalityDetector.modalityDetected.pipe(fe(this._stopInputModalityDetector)).subscribe(o=>{this._setOrigin(o,!0)}))}_removeGlobalListeners(t){let r=t.rootNode;if(this._rootNodeFocusListenerCount.has(r)){let i=this._rootNodeFocusListenerCount.get(r);i>1?this._rootNodeFocusListenerCount.set(r,i-1):(r.removeEventListener("focus",this._rootNodeFocusAndBlurListener,Jd),r.removeEventListener("blur",this._rootNodeFocusAndBlurListener,Jd),this._rootNodeFocusListenerCount.delete(r))}--this._monitoredElementCount||(this._getWindow().removeEventListener("focus",this._windowFocusListener),this._stopInputModalityDetector.next(),clearTimeout(this._windowFocusTimeoutId),clearTimeout(this._originTimeoutId))}_originChanged(t,r,i){this._setClasses(t,r),this._emitOrigin(i,r),this._lastFocusOrigin=r}_getClosestElementsInfo(t){let r=[];return this._elementInfo.forEach((i,o)=>{(o===t||i.checkChildren&&o.contains(t))&&r.push([o,i])}),r}_isLastInteractionFromInputLabel(t){let{_mostRecentTarget:r,mostRecentModality:i}=this._inputModalityDetector;if(i!=="mouse"||!r||r===t||t.nodeName!=="INPUT"&&t.nodeName!=="TEXTAREA"||t.disabled)return!1;let o=t.labels;if(o){for(let s=0;s<o.length;s++)if(o[s].contains(r))return!0}return!1}static \u0275fac=function(r){return new(r||n)};static \u0275prov=C({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})(),Ly=(()=>{class n{_elementRef=h(Ie);_focusMonitor=h(Py);_monitorSubscription;_focusOrigin=null;cdkFocusChange=new ee;constructor(){}get focusOrigin(){return this._focusOrigin}ngAfterViewInit(){let t=this._elementRef.nativeElement;this._monitorSubscription=this._focusMonitor.monitor(t,t.nodeType===1&&t.hasAttribute("cdkMonitorSubtreeFocus")).subscribe(r=>{this._focusOrigin=r,this.cdkFocusChange.emit(r)})}ngOnDestroy(){this._focusMonitor.stopMonitoring(this._elementRef),this._monitorSubscription?.unsubscribe()}static \u0275fac=function(r){return new(r||n)};static \u0275dir=Ce({type:n,selectors:[["","cdkMonitorElementFocus",""],["","cdkMonitorSubtreeFocus",""]],outputs:{cdkFocusChange:"cdkFocusChange"},exportAs:["cdkMonitorFocus"]})}return n})();var Xw=new Set,uo,Fy=(()=>{class n{_platform=h(wt);_nonce=h(Ko,{optional:!0});_matchMedia;constructor(){this._matchMedia=this._platform.isBrowser&&window.matchMedia?window.matchMedia.bind(window):YN}matchMedia(t){return(this._platform.WEBKIT||this._platform.BLINK)&&ZN(t,this._nonce),this._matchMedia(t)}static \u0275fac=function(r){return new(r||n)};static \u0275prov=C({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})();function ZN(n,e){if(!Xw.has(n))try{uo||(uo=document.createElement("style"),e&&uo.setAttribute("nonce",e),uo.setAttribute("type","text/css"),document.head.appendChild(uo)),uo.sheet&&(uo.sheet.insertRule(`@media ${n} {body{ }}`,0),Xw.add(n))}catch(t){console.error(t)}}function YN(n){return{matches:n==="all"||n==="",media:n,addListener:()=>{},removeListener:()=>{}}}function QN(n){if(n.type==="characterData"&&n.target instanceof Comment)return!0;if(n.type==="childList"){for(let e=0;e<n.addedNodes.length;e++)if(!(n.addedNodes[e]instanceof Comment))return!1;for(let e=0;e<n.removedNodes.length;e++)if(!(n.removedNodes[e]instanceof Comment))return!1;return!0}return!1}var XN=(()=>{class n{create(t){return typeof MutationObserver>"u"?null:new MutationObserver(t)}static \u0275fac=function(r){return new(r||n)};static \u0275prov=C({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})(),JN=(()=>{class n{_mutationObserverFactory=h(XN);_observedElements=new Map;_ngZone=h(Z);constructor(){}ngOnDestroy(){this._observedElements.forEach((t,r)=>this._cleanupObserver(r))}observe(t){let r=En(t);return new O(i=>{let s=this._observeElement(r).pipe(te(a=>a.filter(c=>!QN(c))),ye(a=>!!a.length)).subscribe(a=>{this._ngZone.run(()=>{i.next(a)})});return()=>{s.unsubscribe(),this._unobserveElement(r)}})}_observeElement(t){return this._ngZone.runOutsideAngular(()=>{if(this._observedElements.has(t))this._observedElements.get(t).count++;else{let r=new I,i=this._mutationObserverFactory.create(o=>r.next(o));i&&i.observe(t,{characterData:!0,childList:!0,subtree:!0}),this._observedElements.set(t,{observer:i,stream:r,count:1})}return this._observedElements.get(t).stream})}_unobserveElement(t){this._observedElements.has(t)&&(this._observedElements.get(t).count--,this._observedElements.get(t).count||this._cleanupObserver(t))}_cleanupObserver(t){if(this._observedElements.has(t)){let{observer:r,stream:i}=this._observedElements.get(t);r&&r.disconnect(),i.complete(),this._observedElements.delete(t)}}static \u0275fac=function(r){return new(r||n)};static \u0275prov=C({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})(),Jw=(()=>{class n{_contentObserver=h(JN);_elementRef=h(Ie);event=new ee;get disabled(){return this._disabled}set disabled(t){this._disabled=t,this._disabled?this._unsubscribe():this._subscribe()}_disabled=!1;get debounce(){return this._debounce}set debounce(t){this._debounce=di(t),this._subscribe()}_debounce;_currentSubscription=null;constructor(){}ngAfterContentInit(){!this._currentSubscription&&!this.disabled&&this._subscribe()}ngOnDestroy(){this._unsubscribe()}_subscribe(){this._unsubscribe();let t=this._contentObserver.observe(this._elementRef);this._currentSubscription=(this.debounce?t.pipe(Di(this.debounce)):t).subscribe(this.event)}_unsubscribe(){this._currentSubscription?.unsubscribe()}static \u0275fac=function(r){return new(r||n)};static \u0275dir=Ce({type:n,selectors:[["","cdkObserveContent",""]],inputs:{disabled:[2,"cdkObserveContentDisabled","disabled",Xe],debounce:"debounce"},outputs:{event:"cdkObserveContent"},exportAs:["cdkObserveContent"]})}return n})();var eO=200,ef=class{_letterKeyStream=new I;_items=[];_selectedItemIndex=-1;_pressedLetters=[];_skipPredicateFn;_selectedItem=new I;selectedItem=this._selectedItem;constructor(e,t){let r=typeof t?.debounceInterval=="number"?t.debounceInterval:eO;t?.skipPredicate&&(this._skipPredicateFn=t.skipPredicate),this.setItems(e),this._setupKeyHandler(r)}destroy(){this._pressedLetters=[],this._letterKeyStream.complete(),this._selectedItem.complete()}setCurrentSelectedItemIndex(e){this._selectedItemIndex=e}setItems(e){this._items=e}handleKey(e){let t=e.keyCode;e.key&&e.key.length===1?this._letterKeyStream.next(e.key.toLocaleUpperCase()):(t>=65&&t<=90||t>=48&&t<=57)&&this._letterKeyStream.next(String.fromCharCode(t))}isTyping(){return this._pressedLetters.length>0}reset(){this._pressedLetters=[]}_setupKeyHandler(e){this._letterKeyStream.pipe(Ke(t=>this._pressedLetters.push(t)),Di(e),ye(()=>this._pressedLetters.length>0),te(()=>this._pressedLetters.join("").toLocaleUpperCase())).subscribe(t=>{for(let r=1;r<this._items.length+1;r++){let i=(this._selectedItemIndex+r)%this._items.length,o=this._items[i];if(!this._skipPredicateFn?.(o)&&o.getLabel?.().toLocaleUpperCase().trim().indexOf(t)===0){this._selectedItem.next(o);break}}this._pressedLetters=[]})}};function tf(n,...e){return e.length?e.some(t=>n[t]):n.altKey||n.shiftKey||n.ctrlKey||n.metaKey}var nf=class{_items;_activeItemIndex=Le(-1);_activeItem=Le(null);_wrap=!1;_typeaheadSubscription=q.EMPTY;_itemChangesSubscription;_vertical=!0;_horizontal=null;_allowedModifierKeys=[];_homeAndEnd=!1;_pageUpAndDown={enabled:!1,delta:10};_effectRef;_typeahead;_skipPredicateFn=e=>e.disabled;constructor(e,t){this._items=e,e instanceof yr?this._itemChangesSubscription=e.changes.subscribe(r=>this._itemsChanged(r.toArray())):Ta(e)&&(this._effectRef=Fi(()=>this._itemsChanged(e()),{injector:t}))}tabOut=new I;change=new I;skipPredicate(e){return this._skipPredicateFn=e,this}withWrap(e=!0){return this._wrap=e,this}withVerticalOrientation(e=!0){return this._vertical=e,this}withHorizontalOrientation(e){return this._horizontal=e,this}withAllowedModifierKeys(e){return this._allowedModifierKeys=e,this}withTypeAhead(e=200){this._typeaheadSubscription.unsubscribe();let t=this._getItemsArray();return this._typeahead=new ef(t,{debounceInterval:typeof e=="number"?e:void 0,skipPredicate:r=>this._skipPredicateFn(r)}),this._typeaheadSubscription=this._typeahead.selectedItem.subscribe(r=>{this.setActiveItem(r)}),this}cancelTypeahead(){return this._typeahead?.reset(),this}withHomeAndEnd(e=!0){return this._homeAndEnd=e,this}withPageUpDown(e=!0,t=10){return this._pageUpAndDown={enabled:e,delta:t},this}setActiveItem(e){let t=this._activeItem();this.updateActiveItem(e),this._activeItem()!==t&&this.change.next(this._activeItemIndex())}onKeydown(e){let t=e.keyCode,i=["altKey","ctrlKey","metaKey","shiftKey"].every(o=>!e[o]||this._allowedModifierKeys.indexOf(o)>-1);switch(t){case 9:this.tabOut.next();return;case 40:if(this._vertical&&i){this.setNextItemActive();break}else return;case 38:if(this._vertical&&i){this.setPreviousItemActive();break}else return;case 39:if(this._horizontal&&i){this._horizontal==="rtl"?this.setPreviousItemActive():this.setNextItemActive();break}else return;case 37:if(this._horizontal&&i){this._horizontal==="rtl"?this.setNextItemActive():this.setPreviousItemActive();break}else return;case 36:if(this._homeAndEnd&&i){this.setFirstItemActive();break}else return;case 35:if(this._homeAndEnd&&i){this.setLastItemActive();break}else return;case 33:if(this._pageUpAndDown.enabled&&i){let o=this._activeItemIndex()-this._pageUpAndDown.delta;this._setActiveItemByIndex(o>0?o:0,1);break}else return;case 34:if(this._pageUpAndDown.enabled&&i){let o=this._activeItemIndex()+this._pageUpAndDown.delta,s=this._getItemsArray().length;this._setActiveItemByIndex(o<s?o:s-1,-1);break}else return;default:(i||tf(e,"shiftKey"))&&this._typeahead?.handleKey(e);return}this._typeahead?.reset(),e.preventDefault()}get activeItemIndex(){return this._activeItemIndex()}get activeItem(){return this._activeItem()}isTyping(){return!!this._typeahead&&this._typeahead.isTyping()}setFirstItemActive(){this._setActiveItemByIndex(0,1)}setLastItemActive(){this._setActiveItemByIndex(this._getItemsArray().length-1,-1)}setNextItemActive(){this._activeItemIndex()<0?this.setFirstItemActive():this._setActiveItemByDelta(1)}setPreviousItemActive(){this._activeItemIndex()<0&&this._wrap?this.setLastItemActive():this._setActiveItemByDelta(-1)}updateActiveItem(e){let t=this._getItemsArray(),r=typeof e=="number"?e:t.indexOf(e),i=t[r];this._activeItem.set(i??null),this._activeItemIndex.set(r),this._typeahead?.setCurrentSelectedItemIndex(r)}destroy(){this._typeaheadSubscription.unsubscribe(),this._itemChangesSubscription?.unsubscribe(),this._effectRef?.destroy(),this._typeahead?.destroy(),this.tabOut.complete(),this.change.complete()}_setActiveItemByDelta(e){this._wrap?this._setActiveInWrapMode(e):this._setActiveInDefaultMode(e)}_setActiveInWrapMode(e){let t=this._getItemsArray();for(let r=1;r<=t.length;r++){let i=(this._activeItemIndex()+e*r+t.length)%t.length,o=t[i];if(!this._skipPredicateFn(o)){this.setActiveItem(i);return}}}_setActiveInDefaultMode(e){this._setActiveItemByIndex(this._activeItemIndex()+e,e)}_setActiveItemByIndex(e,t){let r=this._getItemsArray();if(r[e]){for(;this._skipPredicateFn(r[e]);)if(e+=t,!r[e])return;this.setActiveItem(e)}}_getItemsArray(){return Ta(this._items)?this._items():this._items instanceof yr?this._items.toArray():this._items}_itemsChanged(e){this._typeahead?.setItems(e);let t=this._activeItem();if(t){let r=e.indexOf(t);r>-1&&r!==this._activeItemIndex()&&(this._activeItemIndex.set(r),this._typeahead?.setCurrentSelectedItemIndex(r))}}};var Ec=class extends nf{_origin="program";setFocusOrigin(e){return this._origin=e,this}setActiveItem(e){super.setActiveItem(e),this.activeItem&&this.activeItem.focus(this._origin)}};var By={},wc=class n{_appId=h(qo);static _infix=`a${Math.floor(Math.random()*1e5).toString()}`;getId(e,t=!1){return this._appId!=="ng"&&(e+=this._appId),By.hasOwnProperty(e)||(By[e]=0),`${e}${t?n._infix+"-":""}${By[e]++}`}static \u0275fac=function(t){return new(t||n)};static \u0275prov=C({token:n,factory:n.\u0275fac,providedIn:"root"})};var tO=new v("cdk-dir-doc",{providedIn:"root",factory:()=>h(pe)}),nO=/^(ar|ckb|dv|he|iw|fa|nqo|ps|sd|ug|ur|yi|.*[-_](Adlm|Arab|Hebr|Nkoo|Rohg|Thaa))(?!.*[-_](Latn|Cyrl)($|-|_))($|-|_)/i;function eT(n){let e=n?.toLowerCase()||"";return e==="auto"&&typeof navigator<"u"&&navigator?.language?nO.test(navigator.language)?"rtl":"ltr":e==="rtl"?"rtl":"ltr"}var Ts=(()=>{class n{get value(){return this.valueSignal()}valueSignal=Le("ltr");change=new ee;constructor(){let t=h(tO,{optional:!0});if(t){let r=t.body?t.body.dir:null,i=t.documentElement?t.documentElement.dir:null;this.valueSignal.set(eT(r||i||"ltr"))}}ngOnDestroy(){this.change.complete()}static \u0275fac=function(r){return new(r||n)};static \u0275prov=C({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})();var Tc=(()=>{class n{static \u0275fac=function(r){return new(r||n)};static \u0275mod=Rt({type:n});static \u0275inj=mt({})}return n})();var jy=class{_box;_destroyed=new I;_resizeSubject=new I;_resizeObserver;_elementObservables=new Map;constructor(e){this._box=e,typeof ResizeObserver<"u"&&(this._resizeObserver=new ResizeObserver(t=>this._resizeSubject.next(t)))}observe(e){return this._elementObservables.has(e)||this._elementObservables.set(e,new O(t=>{let r=this._resizeSubject.subscribe(t);return this._resizeObserver?.observe(e,{box:this._box}),()=>{this._resizeObserver?.unobserve(e),r.unsubscribe(),this._elementObservables.delete(e)}}).pipe(ye(t=>t.some(r=>r.target===e)),Gs({bufferSize:1,refCount:!0}),fe(this._destroyed))),this._elementObservables.get(e)}destroy(){this._destroyed.next(),this._destroyed.complete(),this._resizeSubject.complete(),this._elementObservables.clear()}},tT=(()=>{class n{_cleanupErrorListener;_observers=new Map;_ngZone=h(Z);constructor(){typeof ResizeObserver<"u"}ngOnDestroy(){for(let[,t]of this._observers)t.destroy();this._observers.clear(),this._cleanupErrorListener?.()}observe(t,r){let i=r?.box||"content-box";return this._observers.has(i)||this._observers.set(i,new jy(i)),this._observers.get(i).observe(t)}static \u0275fac=function(r){return new(r||n)};static \u0275prov=C({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})();var Un=(function(n){return n[n.NORMAL=0]="NORMAL",n[n.NEGATED=1]="NEGATED",n[n.INVERTED=2]="INVERTED",n})(Un||{}),rf,fo;function nT(){if(fo==null){if(typeof document!="object"||!document||typeof Element!="function"||!Element)return fo=!1,fo;if(document.documentElement?.style&&"scrollBehavior"in document.documentElement.style)fo=!0;else{let n=Element.prototype.scrollTo;n?fo=!/\{\s*\[native code\]\s*\}/.test(n.toString()):fo=!1}}return fo}function Is(){if(typeof document!="object"||!document)return Un.NORMAL;if(rf==null){let n=document.createElement("div"),e=n.style;n.dir="rtl",e.width="1px",e.overflow="auto",e.visibility="hidden",e.pointerEvents="none",e.position="absolute";let t=document.createElement("div"),r=t.style;r.width="2px",r.height="1px",n.appendChild(t),document.body.appendChild(n),rf=Un.NORMAL,n.scrollLeft===0&&(n.scrollLeft=1,rf=n.scrollLeft===0?Un.NEGATED:Un.INVERTED),n.remove()}return rf}var of=class{};function rT(n){return n&&typeof n.connect=="function"&&!(n instanceof Ls)}var sf=class extends of{_data;constructor(e){super(),this._data=e}connect(){return Wt(this._data)?this._data:T(this._data)}disconnect(){}},Ic=(function(n){return n[n.REPLACED=0]="REPLACED",n[n.INSERTED=1]="INSERTED",n[n.MOVED=2]="MOVED",n[n.REMOVED=3]="REMOVED",n})(Ic||{}),af=class{viewCacheSize=20;_viewCache=[];applyChanges(e,t,r,i,o){e.forEachOperation((s,a,c)=>{let l,u;if(s.previousIndex==null){let d=()=>r(s,a,c);l=this._insertView(d,c,t,i(s)),u=l?Ic.INSERTED:Ic.REPLACED}else c==null?(this._detachAndCacheView(a,t),u=Ic.REMOVED):(l=this._moveView(a,c,t,i(s)),u=Ic.MOVED);o&&o({context:l?.context,operation:u,record:s})})}detach(){for(let e of this._viewCache)e.destroy();this._viewCache=[]}_insertView(e,t,r,i){let o=this._insertViewFromCache(t,r);if(o){o.context.$implicit=i;return}let s=e();return r.createEmbeddedView(s.templateRef,s.context,s.index)}_detachAndCacheView(e,t){let r=t.detach(e);this._maybeCacheView(r,t)}_moveView(e,t,r,i){let o=r.get(e);return r.move(o,t),o.context.$implicit=i,o}_maybeCacheView(e,t){if(this._viewCache.length<this.viewCacheSize)this._viewCache.push(e);else{let r=t.indexOf(e);r===-1?e.destroy():t.remove(r)}}_insertViewFromCache(e,t){let r=this._viewCache.pop();return r&&t.insert(r,e),r||null}};var rO=["contentWrapper"],iO=["*"],aT=new v("VIRTUAL_SCROLL_STRATEGY"),Vy=class{_scrolledIndexChange=new I;scrolledIndexChange=this._scrolledIndexChange.pipe(xo());_viewport=null;_itemSize;_minBufferPx;_maxBufferPx;constructor(e,t,r){this._itemSize=e,this._minBufferPx=t,this._maxBufferPx=r}attach(e){this._viewport=e,this._updateTotalContentSize(),this._updateRenderedRange()}detach(){this._scrolledIndexChange.complete(),this._viewport=null}updateItemAndBufferSize(e,t,r){r<t,this._itemSize=e,this._minBufferPx=t,this._maxBufferPx=r,this._updateTotalContentSize(),this._updateRenderedRange()}onContentScrolled(){this._updateRenderedRange()}onDataLengthChanged(){this._updateTotalContentSize(),this._updateRenderedRange()}onContentRendered(){}onRenderedOffsetChanged(){}scrollToIndex(e,t){this._viewport&&this._viewport.scrollToOffset(e*this._itemSize,t)}_updateTotalContentSize(){this._viewport&&this._viewport.setTotalContentSize(this._viewport.getDataLength()*this._itemSize)}_updateRenderedRange(){if(!this._viewport)return;let e=this._viewport.getRenderedRange(),t={start:e.start,end:e.end},r=this._viewport.getViewportSize(),i=this._viewport.getDataLength(),o=this._viewport.measureScrollOffset(),s=this._itemSize>0?o/this._itemSize:0;if(t.end>i){let c=Math.ceil(r/this._itemSize),l=Math.max(0,Math.min(s,i-c));s!=l&&(s=l,o=l*this._itemSize,t.start=Math.floor(s)),t.end=Math.max(0,Math.min(i,t.start+c))}let a=o-t.start*this._itemSize;if(a<this._minBufferPx&&t.start!=0){let c=Math.ceil((this._maxBufferPx-a)/this._itemSize);t.start=Math.max(0,t.start-c),t.end=Math.min(i,Math.ceil(s+(r+this._minBufferPx)/this._itemSize))}else{let c=t.end*this._itemSize-(o+r);if(c<this._minBufferPx&&t.end!=i){let l=Math.ceil((this._maxBufferPx-c)/this._itemSize);l>0&&(t.end=Math.min(i,t.end+l),t.start=Math.max(0,Math.floor(s-this._minBufferPx/this._itemSize)))}}this._viewport.setRenderedRange(t),this._viewport.setRenderedContentOffset(Math.round(this._itemSize*t.start)),this._scrolledIndexChange.next(Math.floor(s))}};function oO(n){return n._scrollStrategy}var cT=(()=>{class n{get itemSize(){return this._itemSize}set itemSize(t){this._itemSize=di(t)}_itemSize=20;get minBufferPx(){return this._minBufferPx}set minBufferPx(t){this._minBufferPx=di(t)}_minBufferPx=100;get maxBufferPx(){return this._maxBufferPx}set maxBufferPx(t){this._maxBufferPx=di(t)}_maxBufferPx=200;_scrollStrategy=new Vy(this.itemSize,this.minBufferPx,this.maxBufferPx);ngOnChanges(){this._scrollStrategy.updateItemAndBufferSize(this.itemSize,this.minBufferPx,this.maxBufferPx)}static \u0275fac=function(r){return new(r||n)};static \u0275dir=Ce({type:n,selectors:[["cdk-virtual-scroll-viewport","itemSize",""]],inputs:{itemSize:"itemSize",minBufferPx:"minBufferPx",maxBufferPx:"maxBufferPx"},features:[er([{provide:aT,useFactory:oO,deps:[ko(()=>n)]}]),ei]})}return n})(),sO=20,aO=(()=>{class n{_ngZone=h(Z);_platform=h(wt);_renderer=h(un).createRenderer(null,null);_cleanupGlobalListener;constructor(){}_scrolled=new I;_scrolledCount=0;scrollContainers=new Map;register(t){this.scrollContainers.has(t)||this.scrollContainers.set(t,t.elementScrolled().subscribe(()=>this._scrolled.next(t)))}deregister(t){let r=this.scrollContainers.get(t);r&&(r.unsubscribe(),this.scrollContainers.delete(t))}scrolled(t=sO){return this._platform.isBrowser?new O(r=>{this._cleanupGlobalListener||(this._cleanupGlobalListener=this._ngZone.runOutsideAngular(()=>this._renderer.listen("document","scroll",()=>this._scrolled.next())));let i=t>0?this._scrolled.pipe(Ws(t)).subscribe(r):this._scrolled.subscribe(r);return this._scrolledCount++,()=>{i.unsubscribe(),this._scrolledCount--,this._scrolledCount||(this._cleanupGlobalListener?.(),this._cleanupGlobalListener=void 0)}}):T()}ngOnDestroy(){this._cleanupGlobalListener?.(),this._cleanupGlobalListener=void 0,this.scrollContainers.forEach((t,r)=>this.deregister(r)),this._scrolled.complete()}ancestorScrolled(t,r){let i=this.getAncestorScrollContainers(t);return this.scrolled(r).pipe(ye(o=>!o||i.indexOf(o)>-1))}getAncestorScrollContainers(t){let r=[];return this.scrollContainers.forEach((i,o)=>{this._scrollableContainsElement(o,t)&&r.push(o)}),r}_scrollableContainsElement(t,r){let i=En(r),o=t.getElementRef().nativeElement;do if(i==o)return!0;while(i=i.parentElement);return!1}static \u0275fac=function(r){return new(r||n)};static \u0275prov=C({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})(),cf=(()=>{class n{elementRef=h(Ie);scrollDispatcher=h(aO);ngZone=h(Z);dir=h(Ts,{optional:!0});_scrollElement=this.elementRef.nativeElement;_destroyed=new I;_renderer=h(zi);_cleanupScroll;_elementScrolled=new I;constructor(){}ngOnInit(){this._cleanupScroll=this.ngZone.runOutsideAngular(()=>this._renderer.listen(this._scrollElement,"scroll",t=>this._elementScrolled.next(t))),this.scrollDispatcher.register(this)}ngOnDestroy(){this._cleanupScroll?.(),this._elementScrolled.complete(),this.scrollDispatcher.deregister(this),this._destroyed.next(),this._destroyed.complete()}elementScrolled(){return this._elementScrolled}getElementRef(){return this.elementRef}scrollTo(t){let r=this.elementRef.nativeElement,i=this.dir&&this.dir.value=="rtl";t.left==null&&(t.left=i?t.end:t.start),t.right==null&&(t.right=i?t.start:t.end),t.bottom!=null&&(t.top=r.scrollHeight-r.clientHeight-t.bottom),i&&Is()!=Un.NORMAL?(t.left!=null&&(t.right=r.scrollWidth-r.clientWidth-t.left),Is()==Un.INVERTED?t.left=t.right:Is()==Un.NEGATED&&(t.left=t.right?-t.right:t.right)):t.right!=null&&(t.left=r.scrollWidth-r.clientWidth-t.right),this._applyScrollToOptions(t)}_applyScrollToOptions(t){let r=this.elementRef.nativeElement;nT()?r.scrollTo(t):(t.top!=null&&(r.scrollTop=t.top),t.left!=null&&(r.scrollLeft=t.left))}measureScrollOffset(t){let r="left",i="right",o=this.elementRef.nativeElement;if(t=="top")return o.scrollTop;if(t=="bottom")return o.scrollHeight-o.clientHeight-o.scrollTop;let s=this.dir&&this.dir.value=="rtl";return t=="start"?t=s?i:r:t=="end"&&(t=s?r:i),s&&Is()==Un.INVERTED?t==r?o.scrollWidth-o.clientWidth-o.scrollLeft:o.scrollLeft:s&&Is()==Un.NEGATED?t==r?o.scrollLeft+o.scrollWidth-o.clientWidth:-o.scrollLeft:t==r?o.scrollLeft:o.scrollWidth-o.clientWidth-o.scrollLeft}static \u0275fac=function(r){return new(r||n)};static \u0275dir=Ce({type:n,selectors:[["","cdk-scrollable",""],["","cdkScrollable",""]]})}return n})(),cO=20,Uy=(()=>{class n{_platform=h(wt);_listeners;_viewportSize=null;_change=new I;_document=h(pe);constructor(){let t=h(Z),r=h(un).createRenderer(null,null);t.runOutsideAngular(()=>{if(this._platform.isBrowser){let i=o=>this._change.next(o);this._listeners=[r.listen("window","resize",i),r.listen("window","orientationchange",i)]}this.change().subscribe(()=>this._viewportSize=null)})}ngOnDestroy(){this._listeners?.forEach(t=>t()),this._change.complete()}getViewportSize(){this._viewportSize||this._updateViewportSize();let t={width:this._viewportSize.width,height:this._viewportSize.height};return this._platform.isBrowser||(this._viewportSize=null),t}getViewportRect(){let t=this.getViewportScrollPosition(),{width:r,height:i}=this.getViewportSize();return{top:t.top,left:t.left,bottom:t.top+i,right:t.left+r,height:i,width:r}}getViewportScrollPosition(){if(!this._platform.isBrowser)return{top:0,left:0};let t=this._document,r=this._getWindow(),i=t.documentElement,o=i.getBoundingClientRect(),s=-o.top||t.body?.scrollTop||r.scrollY||i.scrollTop||0,a=-o.left||t.body?.scrollLeft||r.scrollX||i.scrollLeft||0;return{top:s,left:a}}change(t=cO){return t>0?this._change.pipe(Ws(t)):this._change}_getWindow(){return this._document.defaultView||window}_updateViewportSize(){let t=this._getWindow();this._viewportSize=this._platform.isBrowser?{width:t.innerWidth,height:t.innerHeight}:{width:0,height:0}}static \u0275fac=function(r){return new(r||n)};static \u0275prov=C({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})(),iT=new v("VIRTUAL_SCROLLABLE"),lO=(()=>{class n extends cf{constructor(){super()}measureViewportSize(t){let r=this.elementRef.nativeElement;return t==="horizontal"?r.clientWidth:r.clientHeight}static \u0275fac=function(r){return new(r||n)};static \u0275dir=Ce({type:n,features:[Kt]})}return n})();function uO(n,e){return n.start==e.start&&n.end==e.end}var dO=typeof requestAnimationFrame<"u"?Hf:$f,lT=new v("CDK_VIRTUAL_SCROLL_VIEWPORT"),uT=(()=>{class n extends lO{elementRef=h(Ie);_changeDetectorRef=h(wr);_scrollStrategy=h(aT,{optional:!0});scrollable=h(iT,{optional:!0});_platform=h(wt);_detachedSubject=new I;_renderedRangeSubject=new I;_renderedContentOffsetSubject=new I;get orientation(){return this._orientation}set orientation(t){this._orientation!==t&&(this._orientation=t,this._calculateSpacerSize())}_orientation="vertical";appendOnly=!1;scrolledIndexChange=new O(t=>this._scrollStrategy.scrolledIndexChange.subscribe(r=>Promise.resolve().then(()=>this.ngZone.run(()=>t.next(r)))));_contentWrapper;renderedRangeStream=this._renderedRangeSubject;renderedContentOffset=this._renderedContentOffsetSubject.pipe(ye(t=>t!==null),xo());_totalContentSize=0;_totalContentWidth=Le("");_totalContentHeight=Le("");_renderedContentTransform;_renderedRange={start:0,end:0};_dataLength=0;_viewportSize=0;_forOf=null;_renderedContentOffset=0;_renderedContentOffsetNeedsRewrite=!1;_changeDetectionNeeded=Le(!1);_runAfterChangeDetection=[];_viewportChanges=q.EMPTY;_injector=h(Te);_isDestroyed=!1;constructor(){super();let t=h(Uy);this._scrollStrategy,this._viewportChanges=t.change().subscribe(()=>{this.checkViewportSize()}),this.scrollable||(this.elementRef.nativeElement.classList.add("cdk-virtual-scrollable"),this.scrollable=this);let r=Fi(()=>{this._changeDetectionNeeded()&&this._doChangeDetection()},{injector:h(Jn).injector});h(Ue).onDestroy(()=>{r.destroy()})}ngOnInit(){this._platform.isBrowser&&(this.scrollable===this&&super.ngOnInit(),this.ngZone.runOutsideAngular(()=>Promise.resolve().then(()=>{this._measureViewportSize(),this._scrollStrategy.attach(this),this.scrollable.elementScrolled().pipe(zn(null),Ws(0,dO),fe(this._destroyed)).subscribe(()=>this._scrollStrategy.onContentScrolled()),this._markChangeDetectionNeeded()})))}ngOnDestroy(){this.detach(),this._scrollStrategy.detach(),this._renderedRangeSubject.complete(),this._detachedSubject.complete(),this._viewportChanges.unsubscribe(),this._isDestroyed=!0,super.ngOnDestroy()}attach(t){this._forOf,this.ngZone.runOutsideAngular(()=>{this._forOf=t,this._forOf.dataStream.pipe(fe(this._detachedSubject)).subscribe(r=>{let i=r.length;i!==this._dataLength&&(this._dataLength=i,this._scrollStrategy.onDataLengthChanged()),this._doChangeDetection()})})}detach(){this._forOf=null,this._detachedSubject.next()}getDataLength(){return this._dataLength}getViewportSize(){return this._viewportSize}getRenderedRange(){return this._renderedRange}measureBoundingClientRectWithScrollOffset(t){return this.getElementRef().nativeElement.getBoundingClientRect()[t]}setTotalContentSize(t){this._totalContentSize!==t&&(this._totalContentSize=t,this._calculateSpacerSize(),this._markChangeDetectionNeeded())}setRenderedRange(t){uO(this._renderedRange,t)||(this.appendOnly&&(t={start:0,end:Math.max(this._renderedRange.end,t.end)}),this._renderedRangeSubject.next(this._renderedRange=t),this._markChangeDetectionNeeded(()=>this._scrollStrategy.onContentRendered()))}getOffsetToRenderedContentStart(){return this._renderedContentOffsetNeedsRewrite?null:this._renderedContentOffset}setRenderedContentOffset(t,r="to-start"){t=this.appendOnly&&r==="to-start"?0:t;let i=this.dir&&this.dir.value=="rtl",o=this.orientation=="horizontal",s=o?"X":"Y",c=`translate${s}(${Number((o&&i?-1:1)*t)}px)`;this._renderedContentOffset=t,r==="to-end"&&(c+=` translate${s}(-100%)`,this._renderedContentOffsetNeedsRewrite=!0),this._renderedContentTransform!=c&&(this._renderedContentTransform=c,this._markChangeDetectionNeeded(()=>{this._renderedContentOffsetNeedsRewrite?(this._renderedContentOffset-=this.measureRenderedContentSize(),this._renderedContentOffsetNeedsRewrite=!1,this.setRenderedContentOffset(this._renderedContentOffset)):this._scrollStrategy.onRenderedOffsetChanged()}))}scrollToOffset(t,r="auto"){let i={behavior:r};this.orientation==="horizontal"?i.start=t:i.top=t,this.scrollable.scrollTo(i)}scrollToIndex(t,r="auto"){this._scrollStrategy.scrollToIndex(t,r)}measureScrollOffset(t){let r;return this.scrollable==this?r=i=>super.measureScrollOffset(i):r=i=>this.scrollable.measureScrollOffset(i),Math.max(0,r(t??(this.orientation==="horizontal"?"start":"top"))-this.measureViewportOffset())}measureViewportOffset(t){let r,i="left",o="right",s=this.dir?.value=="rtl";t=="start"?r=s?o:i:t=="end"?r=s?i:o:t?r=t:r=this.orientation==="horizontal"?"left":"top";let a=this.scrollable.measureBoundingClientRectWithScrollOffset(r);return this.elementRef.nativeElement.getBoundingClientRect()[r]-a}measureRenderedContentSize(){let t=this._contentWrapper.nativeElement;return this.orientation==="horizontal"?t.offsetWidth:t.offsetHeight}measureRangeSize(t){return this._forOf?this._forOf.measureRangeSize(t,this.orientation):0}checkViewportSize(){this._measureViewportSize(),this._scrollStrategy.onDataLengthChanged()}_measureViewportSize(){this._viewportSize=this.scrollable.measureViewportSize(this.orientation)}_markChangeDetectionNeeded(t){t&&this._runAfterChangeDetection.push(t),!Nn(this._changeDetectionNeeded)&&this.ngZone.runOutsideAngular(()=>{Promise.resolve().then(()=>{this.ngZone.run(()=>{this._changeDetectionNeeded.set(!0)})})})}_doChangeDetection(){this._isDestroyed||this.ngZone.run(()=>{this._changeDetectorRef.markForCheck(),this._contentWrapper.nativeElement.style.transform=this._renderedContentTransform,this._renderedContentOffsetSubject.next(this.getOffsetToRenderedContentStart()),_r(()=>{this._changeDetectionNeeded.set(!1);let t=this._runAfterChangeDetection;this._runAfterChangeDetection=[];for(let r of t)r()},{injector:this._injector})})}_calculateSpacerSize(){this._totalContentHeight.set(this.orientation==="horizontal"?"":`${this._totalContentSize}px`),this._totalContentWidth.set(this.orientation==="horizontal"?`${this._totalContentSize}px`:"")}static \u0275fac=function(r){return new(r||n)};static \u0275cmp=Fe({type:n,selectors:[["cdk-virtual-scroll-viewport"]],viewQuery:function(r,i){if(r&1&&Dr(rO,7),r&2){let o;Ge(o=qe())&&(i._contentWrapper=o.first)}},hostAttrs:[1,"cdk-virtual-scroll-viewport"],hostVars:4,hostBindings:function(r,i){r&2&&$e("cdk-virtual-scroll-orientation-horizontal",i.orientation==="horizontal")("cdk-virtual-scroll-orientation-vertical",i.orientation!=="horizontal")},inputs:{orientation:"orientation",appendOnly:[2,"appendOnly","appendOnly",Xe]},outputs:{scrolledIndexChange:"scrolledIndexChange"},features:[er([{provide:cf,useFactory:()=>h(iT,{optional:!0})||h(n)},{provide:lT,useExisting:n}]),Kt],ngContentSelectors:iO,decls:4,vars:4,consts:[["contentWrapper",""],[1,"cdk-virtual-scroll-content-wrapper"],[1,"cdk-virtual-scroll-spacer"]],template:function(r,i){r&1&&(Gi(),_e(0,"div",1,0),qi(2),ae(),ku(3,"div",2)),r&2&&(z(3),Xo("width",i._totalContentWidth())("height",i._totalContentHeight()))},styles:[`cdk-virtual-scroll-viewport {
  display: block;
  position: relative;
  transform: translateZ(0);
}

.cdk-virtual-scrollable {
  overflow: auto;
  will-change: scroll-position;
  contain: strict;
}

.cdk-virtual-scroll-content-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  contain: content;
}
[dir=rtl] .cdk-virtual-scroll-content-wrapper {
  right: 0;
  left: auto;
}

.cdk-virtual-scroll-orientation-horizontal .cdk-virtual-scroll-content-wrapper {
  min-height: 100%;
}
.cdk-virtual-scroll-orientation-horizontal .cdk-virtual-scroll-content-wrapper > dl:not([cdkVirtualFor]), .cdk-virtual-scroll-orientation-horizontal .cdk-virtual-scroll-content-wrapper > ol:not([cdkVirtualFor]), .cdk-virtual-scroll-orientation-horizontal .cdk-virtual-scroll-content-wrapper > table:not([cdkVirtualFor]), .cdk-virtual-scroll-orientation-horizontal .cdk-virtual-scroll-content-wrapper > ul:not([cdkVirtualFor]) {
  padding-left: 0;
  padding-right: 0;
  margin-left: 0;
  margin-right: 0;
  border-left-width: 0;
  border-right-width: 0;
  outline: none;
}

.cdk-virtual-scroll-orientation-vertical .cdk-virtual-scroll-content-wrapper {
  min-width: 100%;
}
.cdk-virtual-scroll-orientation-vertical .cdk-virtual-scroll-content-wrapper > dl:not([cdkVirtualFor]), .cdk-virtual-scroll-orientation-vertical .cdk-virtual-scroll-content-wrapper > ol:not([cdkVirtualFor]), .cdk-virtual-scroll-orientation-vertical .cdk-virtual-scroll-content-wrapper > table:not([cdkVirtualFor]), .cdk-virtual-scroll-orientation-vertical .cdk-virtual-scroll-content-wrapper > ul:not([cdkVirtualFor]) {
  padding-top: 0;
  padding-bottom: 0;
  margin-top: 0;
  margin-bottom: 0;
  border-top-width: 0;
  border-bottom-width: 0;
  outline: none;
}

.cdk-virtual-scroll-spacer {
  height: 1px;
  transform-origin: 0 0;
  flex: 0 0 auto;
}
[dir=rtl] .cdk-virtual-scroll-spacer {
  transform-origin: 100% 0;
}
`],encapsulation:2,changeDetection:0})}return n})();function oT(n,e,t){let r=t;if(!r.getBoundingClientRect)return 0;let i=r.getBoundingClientRect();return n==="horizontal"?e==="start"?i.left:i.right:e==="start"?i.top:i.bottom}var dT=(()=>{class n{_viewContainerRef=h(xt);_template=h(Mt);_differs=h(Uu);_viewRepeater=new af;_viewport=h(lT,{skipSelf:!0});viewChange=new I;_dataSourceChanges=new I;get cdkVirtualForOf(){return this._cdkVirtualForOf}set cdkVirtualForOf(t){this._cdkVirtualForOf=t,rT(t)?this._dataSourceChanges.next(t):this._dataSourceChanges.next(new sf(Wt(t)?t:Array.from(t||[])))}_cdkVirtualForOf;get cdkVirtualForTrackBy(){return this._cdkVirtualForTrackBy}set cdkVirtualForTrackBy(t){this._needsUpdate=!0,this._cdkVirtualForTrackBy=t?(r,i)=>t(r+(this._renderedRange?this._renderedRange.start:0),i):void 0}_cdkVirtualForTrackBy;set cdkVirtualForTemplate(t){t&&(this._needsUpdate=!0,this._template=t)}get cdkVirtualForTemplateCacheSize(){return this._viewRepeater.viewCacheSize}set cdkVirtualForTemplateCacheSize(t){this._viewRepeater.viewCacheSize=di(t)}dataStream=this._dataSourceChanges.pipe(zn(null),Kf(),ft(([t,r])=>this._changeDataSource(t,r)),Gs(1));_differ=null;_data=[];_renderedItems=[];_renderedRange={start:0,end:0};_needsUpdate=!1;_destroyed=new I;constructor(){let t=h(Z);this.dataStream.subscribe(r=>{this._data=r,this._onRenderedDataChange()}),this._viewport.renderedRangeStream.pipe(fe(this._destroyed)).subscribe(r=>{this._renderedRange=r,this.viewChange.observers.length&&t.run(()=>this.viewChange.next(this._renderedRange)),this._onRenderedDataChange()}),this._viewport.attach(this)}measureRangeSize(t,r){if(t.start>=t.end)return 0;t.start<this._renderedRange.start||t.end>this._renderedRange.end;let i=t.start-this._renderedRange.start,o=t.end-t.start,s,a;for(let c=0;c<o;c++){let l=this._viewContainerRef.get(c+i);if(l&&l.rootNodes.length){s=a=l.rootNodes[0];break}}for(let c=o-1;c>-1;c--){let l=this._viewContainerRef.get(c+i);if(l&&l.rootNodes.length){a=l.rootNodes[l.rootNodes.length-1];break}}return s&&a?oT(r,"end",a)-oT(r,"start",s):0}ngDoCheck(){if(this._differ&&this._needsUpdate){let t=this._differ.diff(this._renderedItems);t?this._applyChanges(t):this._updateContext(),this._needsUpdate=!1}}ngOnDestroy(){this._viewport.detach(),this._dataSourceChanges.next(void 0),this._dataSourceChanges.complete(),this.viewChange.complete(),this._destroyed.next(),this._destroyed.complete(),this._viewRepeater.detach()}_onRenderedDataChange(){this._renderedRange&&(this._renderedItems=this._data.slice(this._renderedRange.start,this._renderedRange.end),this._differ||(this._differ=this._differs.find(this._renderedItems).create((t,r)=>this.cdkVirtualForTrackBy?this.cdkVirtualForTrackBy(t,r):r)),this._needsUpdate=!0)}_changeDataSource(t,r){return t&&t.disconnect(this),this._needsUpdate=!0,r?r.connect(this):T()}_updateContext(){let t=this._data.length,r=this._viewContainerRef.length;for(;r--;){let i=this._viewContainerRef.get(r);i.context.index=this._renderedRange.start+r,i.context.count=t,this._updateComputedContextProperties(i.context),i.detectChanges()}}_applyChanges(t){this._viewRepeater.applyChanges(t,this._viewContainerRef,(o,s,a)=>this._getEmbeddedViewArgs(o,a),o=>o.item),t.forEachIdentityChange(o=>{let s=this._viewContainerRef.get(o.currentIndex);s.context.$implicit=o.item});let r=this._data.length,i=this._viewContainerRef.length;for(;i--;){let o=this._viewContainerRef.get(i);o.context.index=this._renderedRange.start+i,o.context.count=r,this._updateComputedContextProperties(o.context)}}_updateComputedContextProperties(t){t.first=t.index===0,t.last=t.index===t.count-1,t.even=t.index%2===0,t.odd=!t.even}_getEmbeddedViewArgs(t,r){return{templateRef:this._template,context:{$implicit:t.item,cdkVirtualForOf:this._cdkVirtualForOf,index:-1,count:-1,first:!1,last:!1,odd:!1,even:!1},index:r}}static ngTemplateContextGuard(t,r){return!0}static \u0275fac=function(r){return new(r||n)};static \u0275dir=Ce({type:n,selectors:[["","cdkVirtualFor","","cdkVirtualForOf",""]],inputs:{cdkVirtualForOf:"cdkVirtualForOf",cdkVirtualForTrackBy:"cdkVirtualForTrackBy",cdkVirtualForTemplate:"cdkVirtualForTemplate",cdkVirtualForTemplateCacheSize:"cdkVirtualForTemplateCacheSize"}})}return n})();var sT=(()=>{class n{static \u0275fac=function(r){return new(r||n)};static \u0275mod=Rt({type:n});static \u0275inj=mt({})}return n})(),fT=(()=>{class n{static \u0275fac=function(r){return new(r||n)};static \u0275mod=Rt({type:n});static \u0275inj=mt({imports:[Tc,sT,Tc,sT]})}return n})();var pO=new v("MATERIAL_ANIMATIONS"),pT=null;function hO(){return h(pO,{optional:!0})?.animationsDisabled||h(Yh,{optional:!0})==="NoopAnimations"?"di-disabled":(pT??=h(Fy).matchMedia("(prefers-reduced-motion)").matches,pT?"reduced-motion":"enabled")}function Ss(){return hO()!=="enabled"}var wn=(function(n){return n[n.FADING_IN=0]="FADING_IN",n[n.VISIBLE=1]="VISIBLE",n[n.FADING_OUT=2]="FADING_OUT",n[n.HIDDEN=3]="HIDDEN",n})(wn||{}),$y=class{_renderer;element;config;_animationForciblyDisabledThroughCss;state=wn.HIDDEN;constructor(e,t,r,i=!1){this._renderer=e,this.element=t,this.config=r,this._animationForciblyDisabledThroughCss=i}fadeOut(){this._renderer.fadeOutRipple(this)}},hT=ws({passive:!0,capture:!0}),Hy=class{_events=new Map;addHandler(e,t,r,i){let o=this._events.get(t);if(o){let s=o.get(r);s?s.add(i):o.set(r,new Set([i]))}else this._events.set(t,new Map([[r,new Set([i])]])),e.runOutsideAngular(()=>{document.addEventListener(t,this._delegateEventHandler,hT)})}removeHandler(e,t,r){let i=this._events.get(e);if(!i)return;let o=i.get(t);o&&(o.delete(r),o.size===0&&i.delete(t),i.size===0&&(this._events.delete(e),document.removeEventListener(e,this._delegateEventHandler,hT)))}_delegateEventHandler=e=>{let t=Pr(e);t&&this._events.get(e.type)?.forEach((r,i)=>{(i===t||i.contains(t))&&r.forEach(o=>o.handleEvent(e))})}},mT={enterDuration:225,exitDuration:150},mO=800,gT=ws({passive:!0,capture:!0}),yT=["mousedown","touchstart"],vT=["mouseup","mouseleave","touchend","touchcancel"],gO=(()=>{class n{static \u0275fac=function(r){return new(r||n)};static \u0275cmp=Fe({type:n,selectors:[["ng-component"]],hostAttrs:["mat-ripple-style-loader",""],decls:0,vars:0,template:function(r,i){},styles:[`.mat-ripple {
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
`],encapsulation:2,changeDetection:0})}return n})(),zy=class n{_target;_ngZone;_platform;_containerElement;_triggerElement=null;_isPointerDown=!1;_activeRipples=new Map;_mostRecentTransientRipple=null;_lastTouchStartEvent;_pointerUpEventsRegistered=!1;_containerRect=null;static _eventManager=new Hy;constructor(e,t,r,i,o){this._target=e,this._ngZone=t,this._platform=i,i.isBrowser&&(this._containerElement=En(r)),o&&o.get(vc).load(gO)}fadeInRipple(e,t,r={}){let i=this._containerRect=this._containerRect||this._containerElement.getBoundingClientRect(),o=g(g({},mT),r.animation);r.centered&&(e=i.left+i.width/2,t=i.top+i.height/2);let s=r.radius||yO(e,t,i),a=e-i.left,c=t-i.top,l=o.enterDuration,u=document.createElement("div");u.classList.add("mat-ripple-element"),u.style.left=`${a-s}px`,u.style.top=`${c-s}px`,u.style.height=`${s*2}px`,u.style.width=`${s*2}px`,r.color!=null&&(u.style.backgroundColor=r.color),u.style.transitionDuration=`${l}ms`,this._containerElement.appendChild(u);let d=window.getComputedStyle(u),f=d.transitionProperty,p=d.transitionDuration,m=f==="none"||p==="0s"||p==="0s, 0s"||i.width===0&&i.height===0,D=new $y(this,u,r,m);u.style.transform="scale3d(1, 1, 1)",D.state=wn.FADING_IN,r.persistent||(this._mostRecentTransientRipple=D);let S=null;return!m&&(l||o.exitDuration)&&this._ngZone.runOutsideAngular(()=>{let M=()=>{S&&(S.fallbackTimer=null),clearTimeout(Re),this._finishRippleTransition(D)},Q=()=>this._destroyRipple(D),Re=setTimeout(Q,l+100);u.addEventListener("transitionend",M),u.addEventListener("transitioncancel",Q),S={onTransitionEnd:M,onTransitionCancel:Q,fallbackTimer:Re}}),this._activeRipples.set(D,S),(m||!l)&&this._finishRippleTransition(D),D}fadeOutRipple(e){if(e.state===wn.FADING_OUT||e.state===wn.HIDDEN)return;let t=e.element,r=g(g({},mT),e.config.animation);t.style.transitionDuration=`${r.exitDuration}ms`,t.style.opacity="0",e.state=wn.FADING_OUT,(e._animationForciblyDisabledThroughCss||!r.exitDuration)&&this._finishRippleTransition(e)}fadeOutAll(){this._getActiveRipples().forEach(e=>e.fadeOut())}fadeOutAllNonPersistent(){this._getActiveRipples().forEach(e=>{e.config.persistent||e.fadeOut()})}setupTriggerEvents(e){let t=En(e);!this._platform.isBrowser||!t||t===this._triggerElement||(this._removeTriggerEvents(),this._triggerElement=t,yT.forEach(r=>{n._eventManager.addHandler(this._ngZone,r,t,this)}))}handleEvent(e){e.type==="mousedown"?this._onMousedown(e):e.type==="touchstart"?this._onTouchStart(e):this._onPointerUp(),this._pointerUpEventsRegistered||(this._ngZone.runOutsideAngular(()=>{vT.forEach(t=>{this._triggerElement.addEventListener(t,this,gT)})}),this._pointerUpEventsRegistered=!0)}_finishRippleTransition(e){e.state===wn.FADING_IN?this._startFadeOutTransition(e):e.state===wn.FADING_OUT&&this._destroyRipple(e)}_startFadeOutTransition(e){let t=e===this._mostRecentTransientRipple,{persistent:r}=e.config;e.state=wn.VISIBLE,!r&&(!t||!this._isPointerDown)&&e.fadeOut()}_destroyRipple(e){let t=this._activeRipples.get(e)??null;this._activeRipples.delete(e),this._activeRipples.size||(this._containerRect=null),e===this._mostRecentTransientRipple&&(this._mostRecentTransientRipple=null),e.state=wn.HIDDEN,t!==null&&(e.element.removeEventListener("transitionend",t.onTransitionEnd),e.element.removeEventListener("transitioncancel",t.onTransitionCancel),t.fallbackTimer!==null&&clearTimeout(t.fallbackTimer)),e.element.remove()}_onMousedown(e){let t=bc(e),r=this._lastTouchStartEvent&&Date.now()<this._lastTouchStartEvent+mO;!this._target.rippleDisabled&&!t&&!r&&(this._isPointerDown=!0,this.fadeInRipple(e.clientX,e.clientY,this._target.rippleConfig))}_onTouchStart(e){if(!this._target.rippleDisabled&&!Cc(e)){this._lastTouchStartEvent=Date.now(),this._isPointerDown=!0;let t=e.changedTouches;if(t)for(let r=0;r<t.length;r++)this.fadeInRipple(t[r].clientX,t[r].clientY,this._target.rippleConfig)}}_onPointerUp(){this._isPointerDown&&(this._isPointerDown=!1,this._getActiveRipples().forEach(e=>{let t=e.state===wn.VISIBLE||e.config.terminateOnPointerUp&&e.state===wn.FADING_IN;!e.config.persistent&&t&&e.fadeOut()}))}_getActiveRipples(){return Array.from(this._activeRipples.keys())}_removeTriggerEvents(){let e=this._triggerElement;e&&(yT.forEach(t=>n._eventManager.removeHandler(t,e,this)),this._pointerUpEventsRegistered&&(vT.forEach(t=>e.removeEventListener(t,this,gT)),this._pointerUpEventsRegistered=!1))}};function yO(n,e,t){let r=Math.max(Math.abs(n-t.left),Math.abs(n-t.right)),i=Math.max(Math.abs(e-t.top),Math.abs(e-t.bottom));return Math.sqrt(r*r+i*i)}var bT=new v("mat-ripple-global-options"),Wy=(()=>{class n{_elementRef=h(Ie);_animationsDisabled=Ss();color;unbounded=!1;centered=!1;radius=0;animation;get disabled(){return this._disabled}set disabled(t){t&&this.fadeOutAllNonPersistent(),this._disabled=t,this._setupTriggerEventsIfEnabled()}_disabled=!1;get trigger(){return this._trigger||this._elementRef.nativeElement}set trigger(t){this._trigger=t,this._setupTriggerEventsIfEnabled()}_trigger;_rippleRenderer;_globalOptions;_isInitialized=!1;constructor(){let t=h(Z),r=h(wt),i=h(bT,{optional:!0}),o=h(Te);this._globalOptions=i||{},this._rippleRenderer=new zy(this,t,this._elementRef,r,o)}ngOnInit(){this._isInitialized=!0,this._setupTriggerEventsIfEnabled()}ngOnDestroy(){this._rippleRenderer._removeTriggerEvents()}fadeOutAll(){this._rippleRenderer.fadeOutAll()}fadeOutAllNonPersistent(){this._rippleRenderer.fadeOutAllNonPersistent()}get rippleConfig(){return{centered:this.centered,radius:this.radius,color:this.color,animation:g(g(g({},this._globalOptions.animation),this._animationsDisabled?{enterDuration:0,exitDuration:0}:{}),this.animation),terminateOnPointerUp:this._globalOptions.terminateOnPointerUp}}get rippleDisabled(){return this.disabled||!!this._globalOptions.disabled}_setupTriggerEventsIfEnabled(){!this.disabled&&this._isInitialized&&this._rippleRenderer.setupTriggerEvents(this.trigger)}launch(t,r=0,i){return typeof t=="number"?this._rippleRenderer.fadeInRipple(t,r,g(g({},this.rippleConfig),i)):this._rippleRenderer.fadeInRipple(0,0,g(g({},this.rippleConfig),t))}static \u0275fac=function(r){return new(r||n)};static \u0275dir=Ce({type:n,selectors:[["","mat-ripple",""],["","matRipple",""]],hostAttrs:[1,"mat-ripple"],hostVars:2,hostBindings:function(r,i){r&2&&$e("mat-ripple-unbounded",i.unbounded)},inputs:{color:[0,"matRippleColor","color"],unbounded:[0,"matRippleUnbounded","unbounded"],centered:[0,"matRippleCentered","centered"],radius:[0,"matRippleRadius","radius"],animation:[0,"matRippleAnimation","animation"],disabled:[0,"matRippleDisabled","disabled"],trigger:[0,"matRippleTrigger","trigger"]},exportAs:["matRipple"]})}return n})();var Yy=["*"];function CO(n,e){n&1&&qi(0)}var _O=["tabListContainer"],DO=["tabList"],EO=["tabListInner"],wO=["nextPaginator"],TO=["previousPaginator"],IO=["content"];function SO(n,e){}var MO=["tabBodyWrapper"],xO=["tabHeader"];function RO(n,e){}function AO(n,e){if(n&1&&Wi(0,RO,0,0,"ng-template",12),n&2){let t=Ve().$implicit;Zt("cdkPortalOutlet",t.templateLabel)}}function kO(n,e){if(n&1&&K(0),n&2){let t=Ve().$implicit;Er(t.textLabel)}}function NO(n,e){if(n&1){let t=ni();Y(0,"div",7,2),Pt("click",function(){let i=cn(t),o=i.$implicit,s=i.$index,a=Ve(),c=Pu(1);return ln(a._handleClick(o,c,s))})("cdkFocusChange",function(i){let o=cn(t).$index,s=Ve();return ln(s._tabFocusChanged(i,o))}),at(2,"span",8)(3,"div",9),Y(4,"span",10)(5,"span",11),kt(6,AO,1,1,null,12)(7,kO,1,1),se()()()}if(n&2){let t=e.$implicit,r=e.$index,i=Pu(1),o=Ve();Ki(t.labelClass),$e("mdc-tab--active",o.selectedIndex===r),Zt("id",o._getTabLabelId(t,r))("disabled",t.disabled)("fitInkBarToContent",o.fitInkBarToContent),At("tabIndex",o._getTabIndex(r))("aria-posinset",r+1)("aria-setsize",o._tabs.length)("aria-controls",o._getTabContentId(r))("aria-selected",o.selectedIndex===r)("aria-label",t.ariaLabel||null)("aria-labelledby",!t.ariaLabel&&t.ariaLabelledby?t.ariaLabelledby:null),z(3),Zt("matRippleTrigger",i)("matRippleDisabled",t.disabled||o.disableRipple),z(3),Nt(t.templateLabel?6:7)}}function OO(n,e){n&1&&qi(0)}function PO(n,e){if(n&1){let t=ni();Y(0,"mat-tab-body",13),Pt("_onCentered",function(){cn(t);let i=Ve();return ln(i._removeTabBodyWrapperHeight())})("_onCentering",function(i){cn(t);let o=Ve();return ln(o._setTabBodyWrapperHeight(i))})("_beforeCentering",function(i){cn(t);let o=Ve();return ln(o._bodyCentered(i))}),se()}if(n&2){let t=e.$implicit,r=e.$index,i=Ve();Ki(t.bodyClass),Zt("id",i._getTabContentId(r))("content",t.content)("position",t.position)("animationDuration",i.animationDuration)("preserveContent",i.preserveContent),At("tabindex",i.contentTabIndex!=null&&i.selectedIndex===r?i.contentTabIndex:null)("aria-labelledby",i._getTabLabelId(t,r))("aria-hidden",i.selectedIndex!==r)}}var LO=new v("MatTabContent"),FO=(()=>{class n{template=h(Mt);constructor(){}static \u0275fac=function(r){return new(r||n)};static \u0275dir=Ce({type:n,selectors:[["","matTabContent",""]],features:[er([{provide:LO,useExisting:n}])]})}return n})(),BO=new v("MatTabLabel"),ET=new v("MAT_TAB"),jO=(()=>{class n extends $w{_closestTab=h(ET,{optional:!0});static \u0275fac=(()=>{let t;return function(i){return(t||(t=br(n)))(i||n)}})();static \u0275dir=Ce({type:n,selectors:[["","mat-tab-label",""],["","matTabLabel",""]],features:[er([{provide:BO,useExisting:n}]),Kt]})}return n})(),wT=new v("MAT_TAB_GROUP"),Qy=(()=>{class n{_viewContainerRef=h(xt);_closestTabGroup=h(wT,{optional:!0});disabled=!1;get templateLabel(){return this._templateLabel}set templateLabel(t){this._setTemplateLabelInput(t)}_templateLabel;_explicitContent=void 0;_implicitContent;textLabel="";ariaLabel;ariaLabelledby;labelClass;bodyClass;id=null;_contentPortal=null;get content(){return this._contentPortal}_stateChanges=new I;position=null;origin=null;isActive=!1;constructor(){h(vc).load(Hw)}ngOnChanges(t){(t.hasOwnProperty("textLabel")||t.hasOwnProperty("disabled"))&&this._stateChanges.next()}ngOnDestroy(){this._stateChanges.complete()}ngOnInit(){this._contentPortal=new Es(this._explicitContent||this._implicitContent,this._viewContainerRef)}_setTemplateLabelInput(t){t&&t._closestTab===this&&(this._templateLabel=t)}static \u0275fac=function(r){return new(r||n)};static \u0275cmp=Fe({type:n,selectors:[["mat-tab"]],contentQueries:function(r,i,o){if(r&1&&Qo(o,jO,5)(o,FO,7,Mt),r&2){let s;Ge(s=qe())&&(i.templateLabel=s.first),Ge(s=qe())&&(i._explicitContent=s.first)}},viewQuery:function(r,i){if(r&1&&Dr(Mt,7),r&2){let o;Ge(o=qe())&&(i._implicitContent=o.first)}},hostAttrs:["hidden",""],hostVars:1,hostBindings:function(r,i){r&2&&At("id",null)},inputs:{disabled:[2,"disabled","disabled",Xe],textLabel:[0,"label","textLabel"],ariaLabel:[0,"aria-label","ariaLabel"],ariaLabelledby:[0,"aria-labelledby","ariaLabelledby"],labelClass:"labelClass",bodyClass:"bodyClass",id:"id"},exportAs:["matTab"],features:[er([{provide:ET,useExisting:n}]),ei],ngContentSelectors:Yy,decls:1,vars:0,template:function(r,i){r&1&&(Gi(),Tu(0,CO,1,0,"ng-template"))},encapsulation:2})}return n})(),Gy="mdc-tab-indicator--active",CT="mdc-tab-indicator--no-transition",qy=class{_items;_currentItem;constructor(e){this._items=e}hide(){this._items.forEach(e=>e.deactivateInkBar()),this._currentItem=void 0}alignToElement(e){let t=this._items.find(i=>i.elementRef.nativeElement===e),r=this._currentItem;if(t!==r&&(r?.deactivateInkBar(),t)){let i=r?.elementRef.nativeElement.getBoundingClientRect?.();t.activateInkBar(i),this._currentItem=t}}},VO=(()=>{class n{_elementRef=h(Ie);_inkBarElement=null;_inkBarContentElement=null;_fitToContent=!1;get fitInkBarToContent(){return this._fitToContent}set fitInkBarToContent(t){this._fitToContent!==t&&(this._fitToContent=t,this._inkBarElement&&this._appendInkBarElement())}activateInkBar(t){let r=this._elementRef.nativeElement;if(!t||!r.getBoundingClientRect||!this._inkBarContentElement){r.classList.add(Gy);return}let i=r.getBoundingClientRect(),o=t.width/i.width,s=t.left-i.left;r.classList.add(CT),this._inkBarContentElement.style.setProperty("transform",`translateX(${s}px) scaleX(${o})`),r.getBoundingClientRect(),r.classList.remove(CT),r.classList.add(Gy),this._inkBarContentElement.style.setProperty("transform","")}deactivateInkBar(){this._elementRef.nativeElement.classList.remove(Gy)}ngOnInit(){this._createInkBarElement()}ngOnDestroy(){this._inkBarElement?.remove(),this._inkBarElement=this._inkBarContentElement=null}_createInkBarElement(){let t=this._elementRef.nativeElement.ownerDocument||document,r=this._inkBarElement=t.createElement("span"),i=this._inkBarContentElement=t.createElement("span");r.className="mdc-tab-indicator",i.className="mdc-tab-indicator__content mdc-tab-indicator__content--underline",r.appendChild(this._inkBarContentElement),this._appendInkBarElement()}_appendInkBarElement(){this._inkBarElement;let t=this._fitToContent?this._elementRef.nativeElement.querySelector(".mdc-tab__content"):this._elementRef.nativeElement;t.appendChild(this._inkBarElement)}static \u0275fac=function(r){return new(r||n)};static \u0275dir=Ce({type:n,inputs:{fitInkBarToContent:[2,"fitInkBarToContent","fitInkBarToContent",Xe]}})}return n})();var TT=(()=>{class n extends VO{elementRef=h(Ie);disabled=!1;focus(){this.elementRef.nativeElement.focus()}getOffsetLeft(){return this.elementRef.nativeElement.offsetLeft}getOffsetWidth(){return this.elementRef.nativeElement.offsetWidth}static \u0275fac=(()=>{let t;return function(i){return(t||(t=br(n)))(i||n)}})();static \u0275dir=Ce({type:n,selectors:[["","matTabLabelWrapper",""]],hostVars:3,hostBindings:function(r,i){r&2&&(At("aria-disabled",!!i.disabled),$e("mat-mdc-tab-disabled",i.disabled))},inputs:{disabled:[2,"disabled","disabled",Xe]},features:[Kt]})}return n})(),_T={passive:!0},UO=650,$O=100,HO=(()=>{class n{_elementRef=h(Ie);_changeDetectorRef=h(wr);_viewportRuler=h(Uy);_dir=h(Ts,{optional:!0});_ngZone=h(Z);_platform=h(wt);_sharedResizeObserver=h(tT);_injector=h(Te);_renderer=h(zi);_animationsDisabled=Ss();_eventCleanups;_scrollDistance=0;_selectedIndexChanged=!1;_destroyed=new I;_showPaginationControls=!1;_disableScrollAfter=!0;_disableScrollBefore=!0;_tabLabelCount;_scrollDistanceChanged=!1;_keyManager;_currentTextContent;_stopScrolling=new I;disablePagination=!1;get selectedIndex(){return this._selectedIndex}set selectedIndex(t){let r=isNaN(t)?0:t;this._selectedIndex!=r&&(this._selectedIndexChanged=!0,this._selectedIndex=r,this._keyManager&&this._keyManager.updateActiveItem(r))}_selectedIndex=0;selectFocusedIndex=new ee;indexFocused=new ee;constructor(){this._eventCleanups=this._ngZone.runOutsideAngular(()=>[this._renderer.listen(this._elementRef.nativeElement,"mouseleave",()=>this._stopInterval())])}ngAfterViewInit(){this._eventCleanups.push(this._renderer.listen(this._previousPaginator.nativeElement,"touchstart",()=>this._handlePaginatorPress("before"),_T),this._renderer.listen(this._nextPaginator.nativeElement,"touchstart",()=>this._handlePaginatorPress("after"),_T))}ngAfterContentInit(){let t=this._dir?this._dir.change:T("ltr"),r=this._sharedResizeObserver.observe(this._elementRef.nativeElement).pipe(Di(32),fe(this._destroyed)),i=this._viewportRuler.change(150).pipe(fe(this._destroyed)),o=()=>{this.updatePagination(),this._alignInkBarToSelectedTab()};this._keyManager=new Ec(this._items).withHorizontalOrientation(this._getLayoutDirection()).withHomeAndEnd().withWrap().skipPredicate(()=>!1),this._keyManager.updateActiveItem(Math.max(this._selectedIndex,0)),_r(o,{injector:this._injector}),zs(t,i,r,this._items.changes,this._itemsResized()).pipe(fe(this._destroyed)).subscribe(()=>{this._ngZone.run(()=>{Promise.resolve().then(()=>{this._scrollDistance=Math.max(0,Math.min(this._getMaxScrollDistance(),this._scrollDistance)),o()})}),this._keyManager?.withHorizontalOrientation(this._getLayoutDirection())}),this._keyManager.change.subscribe(s=>{this.indexFocused.emit(s),this._setTabFocus(s)})}_itemsResized(){return typeof ResizeObserver!="function"?me:this._items.changes.pipe(zn(this._items),ft(t=>new O(r=>this._ngZone.runOutsideAngular(()=>{let i=new ResizeObserver(o=>r.next(o));return t.forEach(o=>i.observe(o.elementRef.nativeElement)),()=>{i.disconnect()}}))),qs(1),ye(t=>t.some(r=>r.contentRect.width>0&&r.contentRect.height>0)))}ngAfterContentChecked(){this._tabLabelCount!=this._items.length&&(this.updatePagination(),this._tabLabelCount=this._items.length,this._changeDetectorRef.markForCheck()),this._selectedIndexChanged&&(this._scrollToLabel(this._selectedIndex),this._checkScrollingControls(),this._alignInkBarToSelectedTab(),this._selectedIndexChanged=!1,this._changeDetectorRef.markForCheck()),this._scrollDistanceChanged&&(this._updateTabScrollPosition(),this._scrollDistanceChanged=!1,this._changeDetectorRef.markForCheck())}ngOnDestroy(){this._eventCleanups.forEach(t=>t()),this._keyManager?.destroy(),this._destroyed.next(),this._destroyed.complete(),this._stopScrolling.complete()}_handleKeydown(t){if(!tf(t))switch(t.keyCode){case 13:case 32:if(this.focusIndex!==this.selectedIndex){let r=this._items.get(this.focusIndex);r&&!r.disabled&&(this.selectFocusedIndex.emit(this.focusIndex),this._itemSelected(t))}break;default:this._keyManager?.onKeydown(t)}}_onContentChanges(){let t=this._elementRef.nativeElement.textContent;t!==this._currentTextContent&&(this._currentTextContent=t||"",this._ngZone.run(()=>{this.updatePagination(),this._alignInkBarToSelectedTab(),this._changeDetectorRef.markForCheck()}))}updatePagination(){this._checkPaginationEnabled(),this._checkScrollingControls(),this._updateTabScrollPosition()}get focusIndex(){return this._keyManager?this._keyManager.activeItemIndex:0}set focusIndex(t){!this._isValidIndex(t)||this.focusIndex===t||!this._keyManager||this._keyManager.setActiveItem(t)}_isValidIndex(t){return this._items?!!this._items.toArray()[t]:!0}_setTabFocus(t){if(this._showPaginationControls&&this._scrollToLabel(t),this._items&&this._items.length){this._items.toArray()[t].focus();let r=this._tabListContainer.nativeElement;this._getLayoutDirection()=="ltr"?r.scrollLeft=0:r.scrollLeft=r.scrollWidth-r.offsetWidth}}_getLayoutDirection(){return this._dir&&this._dir.value==="rtl"?"rtl":"ltr"}_updateTabScrollPosition(){if(this.disablePagination)return;let t=this.scrollDistance,r=this._getLayoutDirection()==="ltr"?-t:t;this._tabList.nativeElement.style.transform=`translateX(${Math.round(r)}px)`,(this._platform.TRIDENT||this._platform.EDGE)&&(this._tabListContainer.nativeElement.scrollLeft=0)}get scrollDistance(){return this._scrollDistance}set scrollDistance(t){this._scrollTo(t)}_scrollHeader(t){let r=this._tabListContainer.nativeElement.offsetWidth,i=(t=="before"?-1:1)*r/3;return this._scrollTo(this._scrollDistance+i)}_handlePaginatorClick(t){this._stopInterval(),this._scrollHeader(t)}_scrollToLabel(t){if(this.disablePagination)return;let r=this._items?this._items.toArray()[t]:null;if(!r)return;let i=this._tabListContainer.nativeElement.offsetWidth,{offsetLeft:o,offsetWidth:s}=r.elementRef.nativeElement,a,c;this._getLayoutDirection()=="ltr"?(a=o,c=a+s):(c=this._tabListInner.nativeElement.offsetWidth-o,a=c-s);let l=this.scrollDistance,u=this.scrollDistance+i;a<l?this.scrollDistance-=l-a:c>u&&(this.scrollDistance+=Math.min(c-u,a-l))}_checkPaginationEnabled(){if(this.disablePagination)this._showPaginationControls=!1;else{let t=this._tabListInner.nativeElement.scrollWidth,r=this._elementRef.nativeElement.offsetWidth,i=t-r>=5;i||(this.scrollDistance=0),i!==this._showPaginationControls&&(this._showPaginationControls=i,this._changeDetectorRef.markForCheck())}}_checkScrollingControls(){this.disablePagination?this._disableScrollAfter=this._disableScrollBefore=!0:(this._disableScrollBefore=this.scrollDistance==0,this._disableScrollAfter=this.scrollDistance==this._getMaxScrollDistance(),this._changeDetectorRef.markForCheck())}_getMaxScrollDistance(){let t=this._tabListInner.nativeElement.scrollWidth,r=this._tabListContainer.nativeElement.offsetWidth;return t-r||0}_alignInkBarToSelectedTab(){let t=this._items&&this._items.length?this._items.toArray()[this.selectedIndex]:null,r=t?t.elementRef.nativeElement:null;r?this._inkBar.alignToElement(r):this._inkBar.hide()}_stopInterval(){this._stopScrolling.next()}_handlePaginatorPress(t,r){r&&r.button!=null&&r.button!==0||(this._stopInterval(),Hs(UO,$O).pipe(fe(zs(this._stopScrolling,this._destroyed))).subscribe(()=>{let{maxScrollDistance:i,distance:o}=this._scrollHeader(t);(o===0||o>=i)&&this._stopInterval()}))}_scrollTo(t){if(this.disablePagination)return{maxScrollDistance:0,distance:0};let r=this._getMaxScrollDistance();return this._scrollDistance=Math.max(0,Math.min(r,t)),this._scrollDistanceChanged=!0,this._checkScrollingControls(),{maxScrollDistance:r,distance:this._scrollDistance}}static \u0275fac=function(r){return new(r||n)};static \u0275dir=Ce({type:n,inputs:{disablePagination:[2,"disablePagination","disablePagination",Xe],selectedIndex:[2,"selectedIndex","selectedIndex",$u]},outputs:{selectFocusedIndex:"selectFocusedIndex",indexFocused:"indexFocused"}})}return n})(),zO=(()=>{class n extends HO{_items;_tabListContainer;_tabList;_tabListInner;_nextPaginator;_previousPaginator;_inkBar;ariaLabel;ariaLabelledby;disableRipple=!1;ngAfterContentInit(){this._inkBar=new qy(this._items),super.ngAfterContentInit()}_itemSelected(t){t.preventDefault()}static \u0275fac=(()=>{let t;return function(i){return(t||(t=br(n)))(i||n)}})();static \u0275cmp=Fe({type:n,selectors:[["mat-tab-header"]],contentQueries:function(r,i,o){if(r&1&&Qo(o,TT,4),r&2){let s;Ge(s=qe())&&(i._items=s)}},viewQuery:function(r,i){if(r&1&&Dr(_O,7)(DO,7)(EO,7)(wO,5)(TO,5),r&2){let o;Ge(o=qe())&&(i._tabListContainer=o.first),Ge(o=qe())&&(i._tabList=o.first),Ge(o=qe())&&(i._tabListInner=o.first),Ge(o=qe())&&(i._nextPaginator=o.first),Ge(o=qe())&&(i._previousPaginator=o.first)}},hostAttrs:[1,"mat-mdc-tab-header"],hostVars:4,hostBindings:function(r,i){r&2&&$e("mat-mdc-tab-header-pagination-controls-enabled",i._showPaginationControls)("mat-mdc-tab-header-rtl",i._getLayoutDirection()=="rtl")},inputs:{ariaLabel:[0,"aria-label","ariaLabel"],ariaLabelledby:[0,"aria-labelledby","ariaLabelledby"],disableRipple:[2,"disableRipple","disableRipple",Xe]},features:[Kt],ngContentSelectors:Yy,decls:13,vars:10,consts:[["previousPaginator",""],["tabListContainer",""],["tabList",""],["tabListInner",""],["nextPaginator",""],["mat-ripple","",1,"mat-mdc-tab-header-pagination","mat-mdc-tab-header-pagination-before",3,"click","mousedown","touchend","matRippleDisabled"],[1,"mat-mdc-tab-header-pagination-chevron"],[1,"mat-mdc-tab-label-container",3,"keydown"],["role","tablist",1,"mat-mdc-tab-list",3,"cdkObserveContent"],[1,"mat-mdc-tab-labels"],["mat-ripple","",1,"mat-mdc-tab-header-pagination","mat-mdc-tab-header-pagination-after",3,"mousedown","click","touchend","matRippleDisabled"]],template:function(r,i){r&1&&(Gi(),Y(0,"div",5,0),Pt("click",function(){return i._handlePaginatorClick("before")})("mousedown",function(s){return i._handlePaginatorPress("before",s)})("touchend",function(){return i._stopInterval()}),at(2,"div",6),se(),Y(3,"div",7,1),Pt("keydown",function(s){return i._handleKeydown(s)}),Y(5,"div",8,2),Pt("cdkObserveContent",function(){return i._onContentChanges()}),Y(7,"div",9,3),qi(9),se()()(),Y(10,"div",10,4),Pt("mousedown",function(s){return i._handlePaginatorPress("after",s)})("click",function(){return i._handlePaginatorClick("after")})("touchend",function(){return i._stopInterval()}),at(12,"div",6),se()),r&2&&($e("mat-mdc-tab-header-pagination-disabled",i._disableScrollBefore),Zt("matRippleDisabled",i._disableScrollBefore||i.disableRipple),z(3),$e("_mat-animation-noopable",i._animationsDisabled),z(2),At("aria-label",i.ariaLabel||null)("aria-labelledby",i.ariaLabelledby||null),z(5),$e("mat-mdc-tab-header-pagination-disabled",i._disableScrollAfter),Zt("matRippleDisabled",i._disableScrollAfter||i.disableRipple))},dependencies:[Wy,Jw],styles:[`.mat-mdc-tab-header {
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
`],encapsulation:2})}return n})(),WO=new v("MAT_TABS_CONFIG"),DT=(()=>{class n extends Ry{_host=h(Ky);_ngZone=h(Z);_centeringSub=q.EMPTY;_leavingSub=q.EMPTY;constructor(){super()}ngOnInit(){super.ngOnInit(),this._centeringSub=this._host._beforeCentering.pipe(zn(this._host._isCenterPosition())).subscribe(t=>{this._host._content&&t&&!this.hasAttached()&&this._ngZone.run(()=>{Promise.resolve().then(),this.attach(this._host._content)})}),this._leavingSub=this._host._afterLeavingCenter.subscribe(()=>{this._host.preserveContent||this._ngZone.run(()=>this.detach())})}ngOnDestroy(){super.ngOnDestroy(),this._centeringSub.unsubscribe(),this._leavingSub.unsubscribe()}static \u0275fac=function(r){return new(r||n)};static \u0275dir=Ce({type:n,selectors:[["","matTabBodyHost",""]],features:[Kt]})}return n})(),Ky=(()=>{class n{_elementRef=h(Ie);_dir=h(Ts,{optional:!0});_ngZone=h(Z);_injector=h(Te);_renderer=h(zi);_diAnimationsDisabled=Ss();_eventCleanups;_initialized=!1;_fallbackTimer;_positionIndex;_dirChangeSubscription=q.EMPTY;_position;_previousPosition;_onCentering=new ee;_beforeCentering=new ee;_afterLeavingCenter=new ee;_onCentered=new ee(!0);_portalHost;_contentElement;_content;animationDuration="500ms";preserveContent=!1;set position(t){this._positionIndex=t,this._computePositionAnimationState()}constructor(){if(this._dir){let t=h(wr);this._dirChangeSubscription=this._dir.change.subscribe(r=>{this._computePositionAnimationState(r),t.markForCheck()})}}ngOnInit(){this._bindTransitionEvents(),this._position==="center"&&(this._setActiveClass(!0),_r(()=>this._onCentering.emit(this._elementRef.nativeElement.clientHeight),{injector:this._injector})),this._initialized=!0}ngOnDestroy(){clearTimeout(this._fallbackTimer),this._eventCleanups?.forEach(t=>t()),this._dirChangeSubscription.unsubscribe()}_bindTransitionEvents(){this._ngZone.runOutsideAngular(()=>{let t=this._elementRef.nativeElement,r=i=>{i.target===this._contentElement?.nativeElement&&(this._elementRef.nativeElement.classList.remove("mat-tab-body-animating"),i.type==="transitionend"&&this._transitionDone())};this._eventCleanups=[this._renderer.listen(t,"transitionstart",i=>{i.target===this._contentElement?.nativeElement&&(this._elementRef.nativeElement.classList.add("mat-tab-body-animating"),this._transitionStarted())}),this._renderer.listen(t,"transitionend",r),this._renderer.listen(t,"transitioncancel",r)]})}_transitionStarted(){clearTimeout(this._fallbackTimer);let t=this._position==="center";this._beforeCentering.emit(t),t&&this._onCentering.emit(this._elementRef.nativeElement.clientHeight)}_transitionDone(){this._position==="center"?this._onCentered.emit():this._previousPosition==="center"&&this._afterLeavingCenter.emit()}_setActiveClass(t){this._elementRef.nativeElement.classList.toggle("mat-mdc-tab-body-active",t)}_getLayoutDirection(){return this._dir&&this._dir.value==="rtl"?"rtl":"ltr"}_isCenterPosition(){return this._positionIndex===0}_computePositionAnimationState(t=this._getLayoutDirection()){this._previousPosition=this._position,this._positionIndex<0?this._position=t=="ltr"?"left":"right":this._positionIndex>0?this._position=t=="ltr"?"right":"left":this._position="center",this._animationsDisabled()?this._simulateTransitionEvents():this._initialized&&(this._position==="center"||this._previousPosition==="center")&&(clearTimeout(this._fallbackTimer),this._fallbackTimer=this._ngZone.runOutsideAngular(()=>setTimeout(()=>this._simulateTransitionEvents(),100)))}_simulateTransitionEvents(){this._transitionStarted(),_r(()=>this._transitionDone(),{injector:this._injector})}_animationsDisabled(){return this._diAnimationsDisabled||this.animationDuration==="0ms"||this.animationDuration==="0s"}static \u0275fac=function(r){return new(r||n)};static \u0275cmp=Fe({type:n,selectors:[["mat-tab-body"]],viewQuery:function(r,i){if(r&1&&Dr(DT,5)(IO,5),r&2){let o;Ge(o=qe())&&(i._portalHost=o.first),Ge(o=qe())&&(i._contentElement=o.first)}},hostAttrs:[1,"mat-mdc-tab-body"],hostVars:1,hostBindings:function(r,i){r&2&&At("inert",i._position==="center"?null:"")},inputs:{_content:[0,"content","_content"],animationDuration:"animationDuration",preserveContent:"preserveContent",position:"position"},outputs:{_onCentering:"_onCentering",_beforeCentering:"_beforeCentering",_onCentered:"_onCentered"},decls:3,vars:6,consts:[["content",""],["cdkScrollable","",1,"mat-mdc-tab-body-content"],["matTabBodyHost",""]],template:function(r,i){r&1&&(Y(0,"div",1,0),Wi(2,SO,0,0,"ng-template",2),se()),r&2&&$e("mat-tab-body-content-left",i._position==="left")("mat-tab-body-content-right",i._position==="right")("mat-tab-body-content-can-animate",i._position==="center"||i._previousPosition==="center")},dependencies:[DT,cf],styles:[`.mat-mdc-tab-body {
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
`],encapsulation:2})}return n})(),IT=(()=>{class n{_elementRef=h(Ie);_changeDetectorRef=h(wr);_ngZone=h(Z);_tabsSubscription=q.EMPTY;_tabLabelSubscription=q.EMPTY;_tabBodySubscription=q.EMPTY;_diAnimationsDisabled=Ss();_allTabs;_tabBodies;_tabBodyWrapper;_tabHeader;_tabs=new yr;_indexToSelect=0;_lastFocusedTabIndex=null;_tabBodyWrapperHeight=0;color;get fitInkBarToContent(){return this._fitInkBarToContent}set fitInkBarToContent(t){this._fitInkBarToContent=t,this._changeDetectorRef.markForCheck()}_fitInkBarToContent=!1;stretchTabs=!0;alignTabs=null;dynamicHeight=!1;get selectedIndex(){return this._selectedIndex}set selectedIndex(t){this._indexToSelect=isNaN(t)?null:t}_selectedIndex=null;headerPosition="above";get animationDuration(){return this._animationDuration}set animationDuration(t){let r=t+"";this._animationDuration=/^\d+$/.test(r)?t+"ms":r}_animationDuration;get contentTabIndex(){return this._contentTabIndex}set contentTabIndex(t){this._contentTabIndex=isNaN(t)?null:t}_contentTabIndex=null;disablePagination=!1;disableRipple=!1;preserveContent=!1;get backgroundColor(){return this._backgroundColor}set backgroundColor(t){let r=this._elementRef.nativeElement.classList;r.remove("mat-tabs-with-background",`mat-background-${this.backgroundColor}`),t&&r.add("mat-tabs-with-background",`mat-background-${t}`),this._backgroundColor=t}_backgroundColor;ariaLabel;ariaLabelledby;selectedIndexChange=new ee;focusChange=new ee;animationDone=new ee;selectedTabChange=new ee(!0);_groupId;_isServer=!h(wt).isBrowser;constructor(){let t=h(WO,{optional:!0});this._groupId=h(wc).getId("mat-tab-group-"),this.animationDuration=t&&t.animationDuration?t.animationDuration:"500ms",this.disablePagination=t&&t.disablePagination!=null?t.disablePagination:!1,this.dynamicHeight=t&&t.dynamicHeight!=null?t.dynamicHeight:!1,t?.contentTabIndex!=null&&(this.contentTabIndex=t.contentTabIndex),this.preserveContent=!!t?.preserveContent,this.fitInkBarToContent=t&&t.fitInkBarToContent!=null?t.fitInkBarToContent:!1,this.stretchTabs=t&&t.stretchTabs!=null?t.stretchTabs:!0,this.alignTabs=t&&t.alignTabs!=null?t.alignTabs:null}ngAfterContentChecked(){let t=this._indexToSelect=this._clampTabIndex(this._indexToSelect);if(this._selectedIndex!=t){let r=this._selectedIndex==null;if(!r){this.selectedTabChange.emit(this._createChangeEvent(t));let i=this._tabBodyWrapper.nativeElement;i.style.minHeight=i.clientHeight+"px"}Promise.resolve().then(()=>{this._tabs.forEach((i,o)=>i.isActive=o===t),r||(this.selectedIndexChange.emit(t),this._tabBodyWrapper.nativeElement.style.minHeight="")})}this._tabs.forEach((r,i)=>{r.position=i-t,this._selectedIndex!=null&&r.position==0&&!r.origin&&(r.origin=t-this._selectedIndex)}),this._selectedIndex!==t&&(this._selectedIndex=t,this._lastFocusedTabIndex=null,this._changeDetectorRef.markForCheck())}ngAfterContentInit(){this._subscribeToAllTabChanges(),this._subscribeToTabLabels(),this._tabsSubscription=this._tabs.changes.subscribe(()=>{let t=this._clampTabIndex(this._indexToSelect);if(t===this._selectedIndex){let r=this._tabs.toArray(),i;for(let o=0;o<r.length;o++)if(r[o].isActive){this._indexToSelect=this._selectedIndex=o,this._lastFocusedTabIndex=null,i=r[o];break}!i&&r[t]&&Promise.resolve().then(()=>{r[t].isActive=!0,this.selectedTabChange.emit(this._createChangeEvent(t))})}this._changeDetectorRef.markForCheck()})}ngAfterViewInit(){this._tabBodySubscription=this._tabBodies.changes.subscribe(()=>this._bodyCentered(!0))}_subscribeToAllTabChanges(){this._allTabs.changes.pipe(zn(this._allTabs)).subscribe(t=>{this._tabs.reset(t.filter(r=>r._closestTabGroup===this||!r._closestTabGroup)),this._tabs.notifyOnChanges()})}ngOnDestroy(){this._tabs.destroy(),this._tabsSubscription.unsubscribe(),this._tabLabelSubscription.unsubscribe(),this._tabBodySubscription.unsubscribe()}realignInkBar(){this._tabHeader&&this._tabHeader._alignInkBarToSelectedTab()}updatePagination(){this._tabHeader&&this._tabHeader.updatePagination()}focusTab(t){let r=this._tabHeader;r&&(r.focusIndex=t)}_focusChanged(t){this._lastFocusedTabIndex=t,this.focusChange.emit(this._createChangeEvent(t))}_createChangeEvent(t){let r=new Zy;return r.index=t,this._tabs&&this._tabs.length&&(r.tab=this._tabs.toArray()[t]),r}_subscribeToTabLabels(){this._tabLabelSubscription&&this._tabLabelSubscription.unsubscribe(),this._tabLabelSubscription=zs(...this._tabs.map(t=>t._stateChanges)).subscribe(()=>this._changeDetectorRef.markForCheck())}_clampTabIndex(t){return Math.min(this._tabs.length-1,Math.max(t||0,0))}_getTabLabelId(t,r){return t.id||`${this._groupId}-label-${r}`}_getTabContentId(t){return`${this._groupId}-content-${t}`}_setTabBodyWrapperHeight(t){if(!this.dynamicHeight||!this._tabBodyWrapperHeight){this._tabBodyWrapperHeight=t;return}let r=this._tabBodyWrapper.nativeElement;r.style.height=this._tabBodyWrapperHeight+"px",this._tabBodyWrapper.nativeElement.offsetHeight&&(r.style.height=t+"px")}_removeTabBodyWrapperHeight(){let t=this._tabBodyWrapper.nativeElement;this._tabBodyWrapperHeight=t.clientHeight,t.style.height="",this._ngZone.run(()=>this.animationDone.emit())}_handleClick(t,r,i){r.focusIndex=i,t.disabled||(this.selectedIndex=i)}_getTabIndex(t){let r=this._lastFocusedTabIndex??this.selectedIndex;return t===r?0:-1}_tabFocusChanged(t,r){t&&t!=="mouse"&&t!=="touch"&&(this._tabHeader.focusIndex=r)}_bodyCentered(t){t&&this._tabBodies?.forEach((r,i)=>r._setActiveClass(i===this._selectedIndex))}_animationsDisabled(){return this._diAnimationsDisabled||this.animationDuration==="0"||this.animationDuration==="0ms"}static \u0275fac=function(r){return new(r||n)};static \u0275cmp=Fe({type:n,selectors:[["mat-tab-group"]],contentQueries:function(r,i,o){if(r&1&&Qo(o,Qy,5),r&2){let s;Ge(s=qe())&&(i._allTabs=s)}},viewQuery:function(r,i){if(r&1&&Dr(MO,5)(xO,5)(Ky,5),r&2){let o;Ge(o=qe())&&(i._tabBodyWrapper=o.first),Ge(o=qe())&&(i._tabHeader=o.first),Ge(o=qe())&&(i._tabBodies=o)}},hostAttrs:[1,"mat-mdc-tab-group"],hostVars:11,hostBindings:function(r,i){r&2&&(At("mat-align-tabs",i.alignTabs),Ki("mat-"+(i.color||"primary")),Xo("--mat-tab-animation-duration",i.animationDuration),$e("mat-mdc-tab-group-dynamic-height",i.dynamicHeight)("mat-mdc-tab-group-inverted-header",i.headerPosition==="below")("mat-mdc-tab-group-stretch-tabs",i.stretchTabs))},inputs:{color:"color",fitInkBarToContent:[2,"fitInkBarToContent","fitInkBarToContent",Xe],stretchTabs:[2,"mat-stretch-tabs","stretchTabs",Xe],alignTabs:[0,"mat-align-tabs","alignTabs"],dynamicHeight:[2,"dynamicHeight","dynamicHeight",Xe],selectedIndex:[2,"selectedIndex","selectedIndex",$u],headerPosition:"headerPosition",animationDuration:"animationDuration",contentTabIndex:[2,"contentTabIndex","contentTabIndex",$u],disablePagination:[2,"disablePagination","disablePagination",Xe],disableRipple:[2,"disableRipple","disableRipple",Xe],preserveContent:[2,"preserveContent","preserveContent",Xe],backgroundColor:"backgroundColor",ariaLabel:[0,"aria-label","ariaLabel"],ariaLabelledby:[0,"aria-labelledby","ariaLabelledby"]},outputs:{selectedIndexChange:"selectedIndexChange",focusChange:"focusChange",animationDone:"animationDone",selectedTabChange:"selectedTabChange"},exportAs:["matTabGroup"],features:[er([{provide:wT,useExisting:n}])],ngContentSelectors:Yy,decls:9,vars:8,consts:[["tabHeader",""],["tabBodyWrapper",""],["tabNode",""],[3,"indexFocused","selectFocusedIndex","selectedIndex","disableRipple","disablePagination","aria-label","aria-labelledby"],["role","tab","matTabLabelWrapper","","cdkMonitorElementFocus","",1,"mdc-tab","mat-mdc-tab","mat-focus-indicator",3,"id","mdc-tab--active","class","disabled","fitInkBarToContent"],[1,"mat-mdc-tab-body-wrapper"],["role","tabpanel",3,"id","class","content","position","animationDuration","preserveContent"],["role","tab","matTabLabelWrapper","","cdkMonitorElementFocus","",1,"mdc-tab","mat-mdc-tab","mat-focus-indicator",3,"click","cdkFocusChange","id","disabled","fitInkBarToContent"],[1,"mdc-tab__ripple"],["mat-ripple","",1,"mat-mdc-tab-ripple",3,"matRippleTrigger","matRippleDisabled"],[1,"mdc-tab__content"],[1,"mdc-tab__text-label"],[3,"cdkPortalOutlet"],["role","tabpanel",3,"_onCentered","_onCentering","_beforeCentering","id","content","position","animationDuration","preserveContent"]],template:function(r,i){r&1&&(Gi(),Y(0,"mat-tab-header",3,0),Pt("indexFocused",function(s){return i._focusChanged(s)})("selectFocusedIndex",function(s){return i.selectedIndex=s}),Ru(2,NO,8,17,"div",4,xu),se(),kt(4,OO,1,0),Y(5,"div",5,1),Ru(7,PO,1,10,"mat-tab-body",6,xu),se()),r&2&&(Zt("selectedIndex",i.selectedIndex||0)("disableRipple",i.disableRipple)("disablePagination",i.disablePagination),Mu("aria-label",i.ariaLabel)("aria-labelledby",i.ariaLabelledby),z(2),Au(i._tabs),z(2),Nt(i._isServer?4:-1),z(),$e("_mat-animation-noopable",i._animationsDisabled()),z(2),Au(i._tabs))},dependencies:[zO,TT,Ly,Wy,Ry,Ky],styles:[`.mdc-tab {
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
`],encapsulation:2})}return n})(),Zy=class{index;tab};var ST=(()=>{class n{static \u0275fac=function(r){return new(r||n)};static \u0275mod=Rt({type:n});static \u0275inj=mt({imports:[Tc]})}return n})();function MT(n){n||(n=h(Ue));let e=new O(t=>{if(n.destroyed){t.next();return}return n.onDestroy(t.next.bind(t))});return t=>t.pipe(fe(e))}var qO="@sdux-vault/devtools",KO="0.9.0";ro(qO,KO);var Xy=null;function ev(){return Xy||(Xy=new Jy),Xy}var Jy=class{#t=new I;constructor(){window.sdux??={},window.sdux.vaultEventBus=this}nextPipeline(e){rr.active&&e&&this.#t.next(e)}pipeline$(){return this.#t.asObservable()}};var lf=class n{constructor(e){this.zone=e;this.isChromeExtension=typeof chrome<"u"&&!!chrome?.runtime?.connect,this.isChromeExtension&&this.#i()}#t=new I;isChromeExtension;#r=ev();#n=null;#e=null;static RECONNECT_DELAY_MS=1e3;pipeline$(){return this.isChromeExtension?this.#t.asObservable():this.#r.pipeline$()}listenPipeline(e){let t=this.pipeline$().subscribe(e);return()=>t.unsubscribe()}#i(){this.#n=chrome.runtime.connect({name:"vault-devtools"}),this.#n.onMessage.addListener(e=>{e?.type&&(e.type==="VAULT_PIPELINE_EVENT"?this.zone.run(()=>{this.#t.next(e.event)}):console.warn(`[Vault DevTools] Unhandled message type: "${e.type}"`))}),this.#n.onDisconnect.addListener(()=>{this.#n=null,this.#a()})}#a(){this.#e!=null&&clearTimeout(this.#e),this.#e=setTimeout(()=>{this.#e=null,this.#i()},n.RECONNECT_DELAY_MS)}static \u0275fac=function(t){return new(t||n)(B(Z))};static \u0275prov=C({token:n,factory:n.\u0275fac,providedIn:"root"})};var nt=class{vault=Dy(nt);bus=h(lf);destroyRef=h(Ue);events=Ft(()=>this.vault.state.value()??[]);totalEvents=Ft(()=>this.events().length);constructor(){this.vault.initialize(),this.vault.fromStream(this.bus.pipeline$().pipe(ye(e=>!!e&&e.cell!==fs),MT(this.destroyRef)))}clearEvents(){this.vault.reset(),this.vault.replaceState({value:[]})}};_(nt,"\u0275fac",function(t){return new(t||nt)}),_(nt,"\u0275prov",C({token:nt,factory:nt.\u0275fac,providedIn:"root"})),nt=J([_y(fs)],nt);function ZO(n,e){n&1&&(_e(0,"span",5),K(1,"\u26A0"),ae())}function YO(n,e){if(n&1&&(_e(0,"strong"),K(1,"State"),ae(),_e(2,"pre")(3,"code"),K(4),Zi(5,"json"),ae()()),n&2){let t,r=Ve(2);z(4),Er(Sa(5,1,(t=r.event().state)==null?null:t.value))}}function QO(n,e){if(n&1&&(_e(0,"div",8)(1,"h4"),K(2,"Payload"),ae(),_e(3,"pre")(4,"code"),K(5),Zi(6,"json"),ae()()()),n&2){let t=Ve(2);z(5),Er(Sa(6,1,t.event().payload))}}function XO(n,e){if(n&1&&(_e(0,"div",10)(1,"h4"),K(2,"Error"),ae(),_e(3,"pre")(4,"code"),K(5),Zi(6,"json"),ae()()()),n&2){let t=Ve(2);z(5),Er(Sa(6,1,t.event().error))}}function JO(n,e){if(n&1){let t=ni();_e(0,"div",0)(1,"div",1),K(2),Zi(3,"number"),ae(),_e(4,"div",2),K(5),ae(),_e(6,"div"),K(7),ae(),_e(8,"div",3)(9,"span",4),K(10,"\u25CF"),ae(),_e(11,"span",4),K(12,"\u270E"),ae(),kt(13,ZO,2,0,"span",5),ae(),_e(14,"div",6),K(15),Zi(16,"date"),ae()(),_e(17,"details",7),Ou("toggle",function(i){cn(t);let o=Ve();return ln(o.onToggle(i.target.open))}),_e(18,"summary"),K(19,"Details"),ae(),_e(20,"div",8)(21,"h4"),K(22,"State"),ae(),_e(23,"ul",9)(24,"li")(25,"strong"),K(26,"id:"),ae(),K(27),ae(),_e(28,"li")(29,"strong"),K(30,"isLoading:"),ae(),K(31),ae(),_e(32,"li")(33,"strong"),K(34,"hasValue:"),ae(),K(35),ae(),_e(36,"li")(37,"strong"),K(38,"error:"),ae(),K(39),ae()(),kt(40,YO,6,3),ae(),kt(41,QO,7,3,"div",8),kt(42,XO,7,3,"div",10),ae()}if(n&2){let t,r,i,o,s,a,c=Ve();$e("event-row-error",!!c.event().error),z(2),Lt(" ",Lu(3,24,c.totalEvents(),"3.0")," "),z(3),Er(c.event().cell),z(),Ki(bm("badge ",c.event().type)),z(),Lt(" ",c.event().type.toUpperCase()," "),z(2),$e("active",(t=c.event().state)==null?null:t.hasValue),At("title",(r=c.event().state)!=null&&r.hasValue?"Has data":"No data"),z(2),$e("active",!!c.event().payload),At("title",c.event().payload?"Has payload":"No payload"),z(2),Nt(c.event().error?13:-1),z(2),Lt(" ",Lu(16,27,c.event().timestamp,"HH:mm:ss.SSS")," "),z(2),Nu("open",c.expanded()),z(10),Lt(" ",c.event().id),z(4),Lt(" ",(i=c.event().state)!=null&&i.isLoading?"True":"False"," "),z(4),Lt(" ",(o=c.event().state)!=null&&o.hasValue?"True":"False"," "),z(4),Lt(" ",!((s=c.event().state)==null||s.error==null)&&s.error.message?(s=c.event().state)==null||s.error==null?null:s.error.message:"null"," "),z(),Nt((a=c.event().state)!=null&&a.value?40:-1),z(),Nt(c.event().payload?41:-1),z(),Nt(c.event().error?42:-1)}}var uf=class n{event=es.required();totalEvents=es.required();expanded=es(!1);expandedChange=xD();onToggle(e){this.expandedChange.emit(e)}static \u0275fac=function(t){return new(t||n)};static \u0275cmp=Fe({type:n,selectors:[["sdux-devtools-pipeline-event"]],inputs:{event:[1,"event"],totalEvents:[1,"totalEvents"],expanded:[1,"expanded"]},outputs:{expandedChange:"expandedChange"},decls:1,vars:1,consts:[[1,"event-row-header"],[1,"counter"],[1,"cell"],[1,"indicators"],["aria-hidden","true",1,"icon"],["title","Has error","aria-hidden","true",1,"icon","error"],[1,"ts"],[1,"event-details",3,"toggle","open"],[1,"detail-block"],[1,"kv"],[1,"detail-block","error-block"]],template:function(t,r){t&1&&kt(0,JO,43,30),t&2&&Nt(r.event()?0:-1)},dependencies:[Qu,jm,Vm,Bm],styles:[".pointer[_ngcontent-%COMP%]{cursor:pointer}.event-row-header[_ngcontent-%COMP%]{width:100%;display:grid;grid-template-columns:4rem 140px 1fr auto auto;align-items:center;gap:1rem}.event-row-header[_ngcontent-%COMP%]   .badge[_ngcontent-%COMP%]{color:#fff;font-weight:600;font-family:Inter,system-ui,sans-serif;font-size:.75rem;padding:.25rem .5rem;border-radius:.25rem;justify-self:start}.event-row-header[_ngcontent-%COMP%]   .badge.init[_ngcontent-%COMP%]{background-color:#388e3c}.event-row-header[_ngcontent-%COMP%]   .badge.patch[_ngcontent-%COMP%]{background-color:#fbc02d;color:#000}.event-row-header[_ngcontent-%COMP%]   .badge.error[_ngcontent-%COMP%]{background-color:#d32f2f}.event-row-header[_ngcontent-%COMP%]   .counter[_ngcontent-%COMP%]{color:#94a3b8;font-weight:400;font-family:Inter,system-ui,sans-serif;font-size:.875rem;width:3rem;text-align:left}.event-row-header[_ngcontent-%COMP%]   .cell[_ngcontent-%COMP%]{color:#94a3b8;font-weight:400;font-family:Inter,system-ui,sans-serif;font-weight:500;font-size:1rem;min-width:125px}.event-row-header[_ngcontent-%COMP%]   .data[_ngcontent-%COMP%]{color:#94a3b8;font-weight:400;font-family:Inter,system-ui,sans-serif;font-size:.875rem;white-space:nowrap}.event-row-header[_ngcontent-%COMP%]   .indicators[_ngcontent-%COMP%]{display:flex;align-items:center;gap:.25rem}.event-row-header[_ngcontent-%COMP%]   .indicators[_ngcontent-%COMP%]   .icon[_ngcontent-%COMP%]{font-size:1rem;opacity:.3;transition:opacity .15s ease}.event-row-header[_ngcontent-%COMP%]   .indicators[_ngcontent-%COMP%]   .icon.active[_ngcontent-%COMP%]{opacity:1;color:#388e3c}.event-row-header[_ngcontent-%COMP%]   .indicators[_ngcontent-%COMP%]   .icon.error[_ngcontent-%COMP%]{opacity:1;color:#d32f2f}.event-row-header.event-row-error[_ngcontent-%COMP%]{background-color:#d32f2f14;border-left:3px solid #d32f2f}.event-row-header[_ngcontent-%COMP%]   .ts[_ngcontent-%COMP%]{color:#94a3b8;font-weight:400;font-family:Inter,system-ui,sans-serif;font-size:.75rem;white-space:nowrap}.event-details[_ngcontent-%COMP%]{grid-column:1/-1;margin-top:.25rem;padding-left:.5rem}.event-details[_ngcontent-%COMP%]   summary[_ngcontent-%COMP%]{cursor:pointer;color:#1976d2;font-weight:400;font-family:Inter,system-ui,sans-serif;font-size:.875rem;margin-bottom:.25rem}.event-details[_ngcontent-%COMP%]   summary[_ngcontent-%COMP%]:hover{text-decoration:underline}.event-details[_ngcontent-%COMP%]   .detail-block[_ngcontent-%COMP%]{margin-bottom:1rem}.event-details[_ngcontent-%COMP%]   .detail-block[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%]{color:#e2e8f0;font-weight:600;font-family:Inter,system-ui,sans-serif;font-size:1rem;margin-bottom:.25rem}.event-details[_ngcontent-%COMP%]   .detail-block[_ngcontent-%COMP%]   .kv[_ngcontent-%COMP%]{list-style:none;padding:0;margin:0 0 .25rem}.event-details[_ngcontent-%COMP%]   .detail-block[_ngcontent-%COMP%]   .kv[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]{margin-bottom:.25rem;font-size:.875rem}.event-details[_ngcontent-%COMP%]   .detail-block[_ngcontent-%COMP%]   pre[_ngcontent-%COMP%]{background-color:#0f172a;border:1px solid #63a4ff;border-radius:.3125rem;padding:.5rem;font-size:.75rem;overflow-x:auto;color:#e2e8f0}.event-details[_ngcontent-%COMP%]   .error-block[_ngcontent-%COMP%]   pre[_ngcontent-%COMP%]{background-color:#b71c1c;border-color:#ef5350}"],changeDetection:0})};function eP(n,e){if(n&1){let t=ni();Y(0,"div",4)(1,"sdux-devtools-pipeline-event",5),Pt("expandedChange",function(i){let o=cn(t).$implicit,s=Ve(2);return ln(s.toggleExpanded(o.id,i))}),se()()}if(n&2){let t=e.$implicit,r=e.index,i=Ve(2);z(),Zt("event",t)("totalEvents",i.totalEvents()-r)("expanded",i.expandedIds.has(t.id))}}function tP(n,e){if(n&1&&(Y(0,"cdk-virtual-scroll-viewport",2),Wi(1,eP,2,3,"div",3),se()),n&2){let t=Ve();z(),Zt("cdkVirtualForOf",t.events())("cdkVirtualForTrackBy",t.trackById)}}var df=class n{devtools=h(nt);events=Ft(()=>this.devtools.events());totalEvents=this.devtools.totalEvents;expandedIds=new Set;trackById(e,t){return t.id}toggleExpanded(e,t){t?this.expandedIds.add(e):this.expandedIds.delete(e)}static \u0275fac=function(t){return new(t||n)};static \u0275cmp=Fe({type:n,selectors:[["sdux-devtools-main-pipeline-panel"]],decls:3,vars:1,consts:[[1,"pipeline-panel"],[1,"event-stream"],["itemSize","52","role","log","aria-label","Pipeline events",1,"event-list"],["class","event-row",4,"cdkVirtualFor","cdkVirtualForOf","cdkVirtualForTrackBy"],[1,"event-row"],[3,"expandedChange","event","totalEvents","expanded"]],template:function(t,r){t&1&&(Y(0,"div",0)(1,"section",1),kt(2,tP,2,2,"cdk-virtual-scroll-viewport",2),se()()),t&2&&(z(2),Nt(r.events()?2:-1))},dependencies:[fT,cT,dT,uT,uf],styles:[".pointer[_ngcontent-%COMP%]{cursor:pointer}[_nghost-%COMP%]{display:block}.pipeline-panel[_ngcontent-%COMP%]{display:flex;flex-direction:column;height:calc(100vh - 140px);padding:1rem;color:#e2e8f0;font-weight:400;font-family:Inter,system-ui,sans-serif}.pipeline-panel[_ngcontent-%COMP%]   .event-stream[_ngcontent-%COMP%]{flex:1;display:flex;flex-direction:column;min-height:0}.pipeline-panel[_ngcontent-%COMP%]   .event-stream[_ngcontent-%COMP%]   .event-list[_ngcontent-%COMP%]{flex:1;min-height:0;height:100%;overscroll-behavior:contain}.pipeline-panel[_ngcontent-%COMP%]   .event-stream[_ngcontent-%COMP%]   .event-list[_ngcontent-%COMP%]::-webkit-scrollbar{width:8px}.pipeline-panel[_ngcontent-%COMP%]   .event-stream[_ngcontent-%COMP%]   .event-list[_ngcontent-%COMP%]::-webkit-scrollbar-thumb{background-color:#63a4ff;border-radius:.25rem}.pipeline-panel[_ngcontent-%COMP%]   .event-row[_ngcontent-%COMP%]{display:block;padding:.5rem;background-color:#0a0e1a;border-bottom:1px solid #63a4ff}.pipeline-panel[_ngcontent-%COMP%]   .event-row[_ngcontent-%COMP%]:hover{background-color:#ffffff14}.pipeline-panel[_ngcontent-%COMP%]   .event-row-header[_ngcontent-%COMP%]{width:100%;display:grid;grid-template-columns:4rem 140px 1fr auto;align-items:center;gap:1rem}.pipeline-panel[_ngcontent-%COMP%]   .badge[_ngcontent-%COMP%]{color:#fff;font-weight:600;font-family:Inter,system-ui,sans-serif;font-size:.75rem;padding:.25rem .5rem;border-radius:.25rem;justify-self:start}.pipeline-panel[_ngcontent-%COMP%]   .badge.init[_ngcontent-%COMP%]{background-color:#388e3c}.pipeline-panel[_ngcontent-%COMP%]   .badge.patch[_ngcontent-%COMP%]{background-color:#fbc02d;color:#000}.pipeline-panel[_ngcontent-%COMP%]   .badge.error[_ngcontent-%COMP%]{background-color:#d32f2f}.pipeline-panel[_ngcontent-%COMP%]   .counter[_ngcontent-%COMP%]{color:#94a3b8;font-weight:400;font-family:Inter,system-ui,sans-serif;font-size:.875rem;width:3rem;text-align:left}.pipeline-panel[_ngcontent-%COMP%]   .cell[_ngcontent-%COMP%]{color:#94a3b8;font-weight:400;font-family:Inter,system-ui,sans-serif;font-weight:500;font-size:1rem;min-width:125px}.pipeline-panel[_ngcontent-%COMP%]   .ts[_ngcontent-%COMP%]{color:#94a3b8;font-weight:400;font-family:Inter,system-ui,sans-serif;font-size:.75rem;white-space:nowrap}.pipeline-panel[_ngcontent-%COMP%]   .event-details[_ngcontent-%COMP%]{grid-column:1/-1;margin-top:.25rem;padding-left:.5rem}.pipeline-panel[_ngcontent-%COMP%]   .event-details[_ngcontent-%COMP%]   summary[_ngcontent-%COMP%]{cursor:pointer;color:#1976d2;font-weight:400;font-family:Inter,system-ui,sans-serif;font-size:.875rem;margin-bottom:.25rem}.pipeline-panel[_ngcontent-%COMP%]   .event-details[_ngcontent-%COMP%]   summary[_ngcontent-%COMP%]:hover{text-decoration:underline}.pipeline-panel[_ngcontent-%COMP%]   .event-details[_ngcontent-%COMP%]   .detail-block[_ngcontent-%COMP%]{margin-bottom:1rem}.pipeline-panel[_ngcontent-%COMP%]   .event-details[_ngcontent-%COMP%]   .detail-block[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%]{color:#e2e8f0;font-weight:600;font-family:Inter,system-ui,sans-serif;font-size:1rem;margin-bottom:.25rem}.pipeline-panel[_ngcontent-%COMP%]   .event-details[_ngcontent-%COMP%]   .detail-block[_ngcontent-%COMP%]   .kv[_ngcontent-%COMP%]{list-style:none;padding:0;margin:0 0 .25rem}.pipeline-panel[_ngcontent-%COMP%]   .event-details[_ngcontent-%COMP%]   .detail-block[_ngcontent-%COMP%]   .kv[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]{margin-bottom:.25rem;font-size:.875rem}.pipeline-panel[_ngcontent-%COMP%]   .event-details[_ngcontent-%COMP%]   .detail-block[_ngcontent-%COMP%]   pre[_ngcontent-%COMP%]{background-color:#0f172a;border:1px solid #63a4ff;border-radius:.3125rem;padding:.5rem;font-size:.75rem;overflow-x:auto;color:#e2e8f0}.pipeline-panel[_ngcontent-%COMP%]   .event-details[_ngcontent-%COMP%]   .error-block[_ngcontent-%COMP%]   pre[_ngcontent-%COMP%]{background-color:#b71c1c;border-color:#ef5350}"],changeDetection:0})};function nP(n,e){n&1&&(Y(0,"mat-tab-group",9)(1,"mat-tab",10)(2,"section",11),at(3,"sdux-devtools-main-pipeline-panel"),se()(),Y(4,"mat-tab",12),at(5,"section",11),se(),Y(6,"mat-tab",13),at(7,"section",11),se()())}function rP(n,e){n&1&&(Y(0,"section",14),K(1," Events only appear "),Y(2,"strong"),K(3,"after this panel opens and a decorated @FeatureCell service is instantiated."),se(),K(4,". "),Y(5,"p"),K(6," FeatureCells are lazyloaded and only activated when the service is instantiated. The DevTools "),Y(7,"strong"),K(8,"will only"),se(),K(9," connect once an @FeatureCell is active. "),se(),Y(10,"p"),K(11," Click on a route with a component using an injected @FeatureCell service to trigger events in your app. "),se()(),Y(12,"section",15),at(13,"img",16),se())}function iP(){try{return chrome.runtime.getManifest().version}catch{return"dev"}}var oP=new v("EXTENSION_VERSION",{providedIn:"root",factory:iP}),ff=class n{devtools=h(nt);version=h(oP);events=Ft(()=>this.devtools.events());totalEvents=Ft(()=>this.events()?.length);clearEvents(){this.devtools.clearEvents()}static \u0275fac=function(t){return new(t||n)};static \u0275cmp=Fe({type:n,selectors:[["sdux-devtools-splash-page"]],decls:14,vars:3,consts:[[1,"vault-devtools"],[1,"header"],[1,"title"],[1,"logo"],["src","/assets/brand/brand-landscape-dark.svg","alt","SDuX Vault"],[1,"subtitle"],[1,"meta"],[1,"event-count"],["type","button",1,"btn-clear",3,"click"],["animationDuration","200ms",1,"vault-tabs"],["label","All Pipeline Events"],[1,"vault-tab-content"],["label","Pipeline Error Events"],["label","Pipeline Warn Events"],[1,"warning"],[1,"vault-empty"],["src","/assets/brand/brand-landscape-dark.svg","alt","SDuX Vault logo",1,"logo"]],template:function(t,r){t&1&&(Y(0,"div",0)(1,"header",1)(2,"div",2)(3,"div",3),at(4,"img",4),se(),Y(5,"span",5),K(6),se()(),Y(7,"div",6)(8,"span",7),K(9),se(),Y(10,"button",8),Pt("click",function(){return r.clearEvents()}),K(11," Clear "),se()()(),kt(12,nP,8,0,"mat-tab-group",9)(13,rP,14,0),se()),t&2&&(z(6),Lt("DevTools (v",r.version,")"),z(3),Lt("",r.totalEvents()," events"),z(3),Nt(r.totalEvents()?12:13))},dependencies:[ST,Qy,IT,df],styles:['@charset "UTF-8";.pointer[_ngcontent-%COMP%]{cursor:pointer}.vault-devtools[_ngcontent-%COMP%]{height:100vh;min-height:0;display:flex;flex-direction:column;padding:1rem;overflow:hidden;background-color:#0f172a;border:1px solid #63a4ff;color:#e2e8f0;font-weight:400;font-family:Inter,system-ui,sans-serif;border:none}.vault-devtools[_ngcontent-%COMP%]   .header[_ngcontent-%COMP%]{display:flex;justify-content:space-between;align-items:center;margin-bottom:1rem;border-bottom:1px solid #63a4ff}.vault-devtools[_ngcontent-%COMP%]   .header[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%]{display:flex;align-items:center;gap:.5rem}.vault-devtools[_ngcontent-%COMP%]   .header[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%]   .logo[_ngcontent-%COMP%]{width:120px}.vault-devtools[_ngcontent-%COMP%]   .header[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%]   .subtitle[_ngcontent-%COMP%]{color:#94a3b8;font-weight:400;font-family:Inter,system-ui,sans-serif;font-size:1rem}.vault-devtools[_ngcontent-%COMP%]   .header[_ngcontent-%COMP%]   .meta[_ngcontent-%COMP%]{display:flex;align-items:center;gap:1rem}.vault-devtools[_ngcontent-%COMP%]   .header[_ngcontent-%COMP%]   .meta[_ngcontent-%COMP%]   .event-count[_ngcontent-%COMP%]{color:#94a3b8;font-weight:400;font-family:Inter,system-ui,sans-serif;font-size:.875rem}.vault-devtools[_ngcontent-%COMP%]   .header[_ngcontent-%COMP%]   .meta[_ngcontent-%COMP%]   .btn-clear[_ngcontent-%COMP%]{height:40px!important;min-width:90px!important;display:flex;flex-direction:row;justify-content:center;align-items:center;color:#fff!important;background-color:transparent!important;border:1px solid #63a4ff!important;border-radius:.3125rem!important;font-size:.875rem!important;padding:.5rem;gap:.25rem;font-weight:600}.vault-devtools[_ngcontent-%COMP%]   .header[_ngcontent-%COMP%]   .meta[_ngcontent-%COMP%]   .btn-clear[_ngcontent-%COMP%]   .mat-icon[_ngcontent-%COMP%]{transform:scale(.75)}.vault-devtools[_ngcontent-%COMP%]   .header[_ngcontent-%COMP%]   .meta[_ngcontent-%COMP%]   .btn-clear[_ngcontent-%COMP%]{cursor:pointer;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.vault-devtools[_ngcontent-%COMP%]   .header[_ngcontent-%COMP%]   .meta[_ngcontent-%COMP%]   .btn-clear[_ngcontent-%COMP%]   .button-text[_ngcontent-%COMP%]{height:40px}.vault-devtools[_ngcontent-%COMP%]   .header[_ngcontent-%COMP%]   .meta[_ngcontent-%COMP%]   .btn-clear[_ngcontent-%COMP%]   .mat-icon[_ngcontent-%COMP%]{width:22px!important;height:22px!important;position:relative;padding-left:.25rem;padding-right:.25rem;gap:.25rem}.vault-devtools[_ngcontent-%COMP%]   .header[_ngcontent-%COMP%]   .meta[_ngcontent-%COMP%]   .btn-clear[_ngcontent-%COMP%]:focus{outline:none}.vault-devtools[_ngcontent-%COMP%]   .header[_ngcontent-%COMP%]   .meta[_ngcontent-%COMP%]   .btn-clear[_ngcontent-%COMP%]:hover{background-color:#ffffff14!important}.vault-devtools[_ngcontent-%COMP%]   .warning[_ngcontent-%COMP%]{background-color:#fff263;border-left:4px solid #c49000;color:#000;padding:.5rem 1rem;border-radius:.3125rem;margin-bottom:1rem;font-size:.875rem}.vault-devtools[_ngcontent-%COMP%]   .vault-tabs[_ngcontent-%COMP%]{flex:1;min-height:0;display:flex;flex-direction:column}.vault-devtools[_ngcontent-%COMP%]   .vault-tabs[_ngcontent-%COMP%]   .mat-mdc-tab-header[_ngcontent-%COMP%]{background-color:#0a0e1a;border-bottom:1px solid #63a4ff}.vault-devtools[_ngcontent-%COMP%]   .vault-tabs[_ngcontent-%COMP%]   .mat-mdc-tab-body-wrapper[_ngcontent-%COMP%]{flex:1;min-height:0;display:flex}.vault-devtools[_ngcontent-%COMP%]   .vault-tabs[_ngcontent-%COMP%]   .mat-mdc-tab-body[_ngcontent-%COMP%]{flex:1;min-height:0}.vault-devtools[_ngcontent-%COMP%]   .vault-tabs[_ngcontent-%COMP%]   .mat-mdc-tab-body[_ngcontent-%COMP%]   .mat-mdc-tab-body-content[_ngcontent-%COMP%]{height:100%;min-height:0;overflow:hidden}.vault-devtools[_ngcontent-%COMP%]   .vault-tab-content[_ngcontent-%COMP%]{flex:1;min-height:0;height:100%;overflow:hidden;padding-right:.5rem}.vault-devtools[_ngcontent-%COMP%]   .vault-tab-content[_ngcontent-%COMP%]::-webkit-scrollbar{width:8px}.vault-devtools[_ngcontent-%COMP%]   .vault-tab-content[_ngcontent-%COMP%]::-webkit-scrollbar-thumb{background-color:#63a4ff;border-radius:.25rem}.vault-devtools[_ngcontent-%COMP%]   .vault-empty[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center}.vault-devtools[_ngcontent-%COMP%]   .vault-empty[_ngcontent-%COMP%]   .logo[_ngcontent-%COMP%]{width:200px;height:auto;filter:drop-shadow(0 2px 4px rgba(0,0,0,.35));transition:opacity .25s ease}.vault-devtools[_ngcontent-%COMP%]   .vault-empty[_ngcontent-%COMP%]   .logo[_ngcontent-%COMP%]:hover{opacity:.9}  .mat-mdc-tab-label-container{background-color:#fff;border-top-left-radius:.5rem;border-top-right-radius:.5rem}'],changeDetection:0})};var xT=[{path:"",component:ff},{path:"**",redirectTo:""}];var RT={providers:[rh(),_m(),Eg(xT,wg()),Iy({logLevel:"error"}),Ty(nt,{key:fs,initialState:[]},[yn])]};var pf=class n{static \u0275fac=function(t){return new(t||n)};static \u0275cmp=Fe({type:n,selectors:[["sdux-devtools-root"]],decls:2,vars:0,consts:[[1,"router-container"]],template:function(t,r){t&1&&(Y(0,"div",0),at(1,"router-outlet"),se())},dependencies:[ec],styles:[".router-container[_ngcontent-%COMP%]{height:100%}[_nghost-%COMP%]{display:block;height:100%}"],changeDetection:0})};Ym(pf,RT).catch(n=>console.error(n));
