var EC=Object.defineProperty,$M=Object.defineProperties,zM=Object.getOwnPropertyDescriptor,WM=Object.getOwnPropertyDescriptors;var DC=Object.getOwnPropertySymbols;var GM=Object.prototype.hasOwnProperty,qM=Object.prototype.propertyIsEnumerable;var wC=n=>{throw TypeError(n)};var Rp=(n,t,e)=>t in n?EC(n,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):n[t]=e,g=(n,t)=>{for(var e in t||={})GM.call(t,e)&&Rp(n,e,t[e]);if(DC)for(var e of DC(t))qM.call(t,e)&&Rp(n,e,t[e]);return n},V=(n,t)=>$M(n,WM(t));var we=(n,t,e,i)=>{for(var r=i>1?void 0:i?zM(t,e):t,o=n.length-1,s;o>=0;o--)(s=n[o])&&(r=(i?s(t,e,r):s(r))||r);return i&&r&&EC(t,e,r),r};var x=(n,t,e)=>Rp(n,typeof t!="symbol"?t+"":t,e),Op=(n,t,e)=>t.has(n)||wC("Cannot "+e);var Np=(n,t,e)=>(Op(n,t,"read from private field"),e?e.call(n):t.get(n)),Ss=(n,t,e)=>t.has(n)?wC("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(n):t.set(n,e),Pp=(n,t,e,i)=>(Op(n,t,"write to private field"),i?i.call(n,e):t.set(n,e),e),qi=(n,t,e)=>(Op(n,t,"access private method"),e);var Ut=null,md=!1,Fp=1,KM=null,ct=Symbol("SIGNAL");function B(n){let t=Ut;return Ut=n,t}function gd(){return Ut}var kr={version:0,lastCleanEpoch:0,dirty:!1,producers:void 0,producersTail:void 0,consumers:void 0,consumersTail:void 0,recomputing:!1,consumerAllowSignalWrites:!1,consumerIsAlwaysLive:!1,kind:"unknown",producerMustRecompute:()=>!1,producerRecomputeValue:()=>{},consumerMarkedDirty:()=>{},consumerOnSignalRead:()=>{}};function Ar(n){if(md)throw new Error("");if(Ut===null)return;Ut.consumerOnSignalRead(n);let t=Ut.producersTail;if(t!==void 0&&t.producer===n)return;let e,i=Ut.recomputing;if(i&&(e=t!==void 0?t.nextProducer:Ut.producers,e!==void 0&&e.producer===n)){Ut.producersTail=e,e.lastReadVersion=n.version;return}let r=n.consumersTail;if(r!==void 0&&r.consumer===Ut&&(!i||ZM(r,Ut)))return;let o=xs(Ut),s={producer:n,consumer:Ut,nextProducer:e,prevConsumer:r,lastReadVersion:n.version,nextConsumer:void 0};Ut.producersTail=s,t!==void 0?t.nextProducer=s:Ut.producers=s,o&&xC(n,s)}function SC(){Fp++}function Co(n){if(!(xs(n)&&!n.dirty)&&!(!n.dirty&&n.lastCleanEpoch===Fp)){if(!n.producerMustRecompute(n)&&!Is(n)){Ts(n);return}n.producerRecomputeValue(n),Ts(n)}}function Lp(n){if(n.consumers===void 0)return;let t=md;md=!0;try{for(let e=n.consumers;e!==void 0;e=e.nextConsumer){let i=e.consumer;i.dirty||YM(i)}}finally{md=t}}function Vp(){return Ut?.consumerAllowSignalWrites!==!1}function YM(n){n.dirty=!0,Lp(n),n.consumerMarkedDirty?.(n)}function Ts(n){n.dirty=!1,n.lastCleanEpoch=Fp}function Ki(n){return n&&TC(n),B(n)}function TC(n){n.producersTail=void 0,n.recomputing=!0}function Rr(n,t){B(t),n&&IC(n)}function IC(n){n.recomputing=!1;let t=n.producersTail,e=t!==void 0?t.nextProducer:n.producers;if(e!==void 0){if(xs(n))do e=Bp(e);while(e!==void 0);t!==void 0?t.nextProducer=void 0:n.producers=void 0}}function Is(n){for(let t=n.producers;t!==void 0;t=t.nextProducer){let e=t.producer,i=t.lastReadVersion;if(i!==e.version||(Co(e),i!==e.version))return!0}return!1}function Or(n){if(xs(n)){let t=n.producers;for(;t!==void 0;)t=Bp(t)}n.producers=void 0,n.producersTail=void 0,n.consumers=void 0,n.consumersTail=void 0}function xC(n,t){let e=n.consumersTail,i=xs(n);if(e!==void 0?(t.nextConsumer=e.nextConsumer,e.nextConsumer=t):(t.nextConsumer=void 0,n.consumers=t),t.prevConsumer=e,n.consumersTail=t,!i)for(let r=n.producers;r!==void 0;r=r.nextProducer)xC(r.producer,r)}function Bp(n){let t=n.producer,e=n.nextProducer,i=n.nextConsumer,r=n.prevConsumer;if(n.nextConsumer=void 0,n.prevConsumer=void 0,i!==void 0?i.prevConsumer=r:t.consumersTail=r,r!==void 0)r.nextConsumer=i;else if(t.consumers=i,!xs(t)){let o=t.producers;for(;o!==void 0;)o=Bp(o)}return e}function xs(n){return n.consumerIsAlwaysLive||n.consumers!==void 0}function Qa(n){KM?.(n)}function ZM(n,t){let e=t.producersTail;if(e!==void 0){let i=t.producers;do{if(i===n)return!0;if(i===e)break;i=i.nextProducer}while(i!==void 0)}return!1}function Ja(n,t){return Object.is(n,t)}function el(n,t){let e=Object.create(XM);e.computation=n,t!==void 0&&(e.equal=t);let i=()=>{if(Co(e),Ar(e),e.value===xi)throw e.error;return e.value};return i[ct]=e,Qa(e),i}var bo=Symbol("UNSET"),_o=Symbol("COMPUTING"),xi=Symbol("ERRORED"),XM=V(g({},kr),{value:bo,dirty:!0,error:null,equal:Ja,kind:"computed",producerMustRecompute(n){return n.value===bo||n.value===_o},producerRecomputeValue(n){if(n.value===_o)throw new Error("");let t=n.value;n.value=_o;let e=Ki(n),i,r=!1;try{i=n.computation(),B(null),r=t!==bo&&t!==xi&&i!==xi&&n.equal(t,i)}catch(o){i=xi,n.error=o}finally{Rr(n,e)}if(r){n.value=t;return}n.value=i,n.version++}});function QM(){throw new Error}var MC=QM;function kC(n){MC(n)}function jp(n){MC=n}var JM=null;function Up(n,t){let e=Object.create(tl);e.value=n,t!==void 0&&(e.equal=t);let i=()=>AC(e);return i[ct]=e,Qa(e),[i,s=>Do(e,s),s=>yd(e,s)]}function AC(n){return Ar(n),n.value}function Do(n,t){Vp()||kC(n),n.equal(n.value,t)||(n.value=t,ek(n))}function yd(n,t){Vp()||kC(n),Do(n,t(n.value))}var tl=V(g({},kr),{equal:Ja,value:void 0,kind:"signal"});function ek(n){n.version++,SC(),Lp(n),JM?.(n)}var Hp=V(g({},kr),{consumerIsAlwaysLive:!0,consumerAllowSignalWrites:!0,dirty:!0,kind:"effect"});function $p(n){if(n.dirty=!1,n.version>0&&!Is(n))return;n.version++;let t=Ki(n);try{n.cleanup(),n.fn()}finally{Rr(n,t)}}function de(n){return typeof n=="function"}function Ms(n){let e=n(i=>{Error.call(i),i.stack=new Error().stack});return e.prototype=Object.create(Error.prototype),e.prototype.constructor=e,e}var vd=Ms(n=>function(e){n(this),this.message=e?`${e.length} errors occurred during unsubscription:
${e.map((i,r)=>`${r+1}) ${i.toString()}`).join(`
  `)}`:"",this.name="UnsubscriptionError",this.errors=e});function Eo(n,t){if(n){let e=n.indexOf(t);0<=e&&n.splice(e,1)}}var H=class n{constructor(t){this.initialTeardown=t,this.closed=!1,this._parentage=null,this._finalizers=null}unsubscribe(){let t;if(!this.closed){this.closed=!0;let{_parentage:e}=this;if(e)if(this._parentage=null,Array.isArray(e))for(let o of e)o.remove(this);else e.remove(this);let{initialTeardown:i}=this;if(de(i))try{i()}catch(o){t=o instanceof vd?o.errors:[o]}let{_finalizers:r}=this;if(r){this._finalizers=null;for(let o of r)try{RC(o)}catch(s){t=t??[],s instanceof vd?t=[...t,...s.errors]:t.push(s)}}if(t)throw new vd(t)}}add(t){var e;if(t&&t!==this)if(this.closed)RC(t);else{if(t instanceof n){if(t.closed||t._hasParent(this))return;t._addParent(this)}(this._finalizers=(e=this._finalizers)!==null&&e!==void 0?e:[]).push(t)}}_hasParent(t){let{_parentage:e}=this;return e===t||Array.isArray(e)&&e.includes(t)}_addParent(t){let{_parentage:e}=this;this._parentage=Array.isArray(e)?(e.push(t),e):e?[e,t]:t}_removeParent(t){let{_parentage:e}=this;e===t?this._parentage=null:Array.isArray(e)&&Eo(e,t)}remove(t){let{_finalizers:e}=this;e&&Eo(e,t),t instanceof n&&t._removeParent(this)}};H.EMPTY=(()=>{let n=new H;return n.closed=!0,n})();var zp=H.EMPTY;function bd(n){return n instanceof H||n&&"closed"in n&&de(n.remove)&&de(n.add)&&de(n.unsubscribe)}function RC(n){de(n)?n():n.unsubscribe()}var ii={onUnhandledError:null,onStoppedNotification:null,Promise:void 0,useDeprecatedSynchronousErrorHandling:!1,useDeprecatedNextContext:!1};var ks={setTimeout(n,t,...e){let{delegate:i}=ks;return i?.setTimeout?i.setTimeout(n,t,...e):setTimeout(n,t,...e)},clearTimeout(n){let{delegate:t}=ks;return(t?.clearTimeout||clearTimeout)(n)},delegate:void 0};function _d(n){ks.setTimeout(()=>{let{onUnhandledError:t}=ii;if(t)t(n);else throw n})}function nl(){}var OC=Wp("C",void 0,void 0);function NC(n){return Wp("E",void 0,n)}function PC(n){return Wp("N",n,void 0)}function Wp(n,t,e){return{kind:n,value:t,error:e}}var wo=null;function As(n){if(ii.useDeprecatedSynchronousErrorHandling){let t=!wo;if(t&&(wo={errorThrown:!1,error:null}),n(),t){let{errorThrown:e,error:i}=wo;if(wo=null,e)throw i}}else n()}function FC(n){ii.useDeprecatedSynchronousErrorHandling&&wo&&(wo.errorThrown=!0,wo.error=n)}var So=class extends H{constructor(t){super(),this.isStopped=!1,t?(this.destination=t,bd(t)&&t.add(this)):this.destination=ik}static create(t,e,i){return new ri(t,e,i)}next(t){this.isStopped?qp(PC(t),this):this._next(t)}error(t){this.isStopped?qp(NC(t),this):(this.isStopped=!0,this._error(t))}complete(){this.isStopped?qp(OC,this):(this.isStopped=!0,this._complete())}unsubscribe(){this.closed||(this.isStopped=!0,super.unsubscribe(),this.destination=null)}_next(t){this.destination.next(t)}_error(t){try{this.destination.error(t)}finally{this.unsubscribe()}}_complete(){try{this.destination.complete()}finally{this.unsubscribe()}}},tk=Function.prototype.bind;function Gp(n,t){return tk.call(n,t)}var Kp=class{constructor(t){this.partialObserver=t}next(t){let{partialObserver:e}=this;if(e.next)try{e.next(t)}catch(i){Cd(i)}}error(t){let{partialObserver:e}=this;if(e.error)try{e.error(t)}catch(i){Cd(i)}else Cd(t)}complete(){let{partialObserver:t}=this;if(t.complete)try{t.complete()}catch(e){Cd(e)}}},ri=class extends So{constructor(t,e,i){super();let r;if(de(t)||!t)r={next:t??void 0,error:e??void 0,complete:i??void 0};else{let o;this&&ii.useDeprecatedNextContext?(o=Object.create(t),o.unsubscribe=()=>this.unsubscribe(),r={next:t.next&&Gp(t.next,o),error:t.error&&Gp(t.error,o),complete:t.complete&&Gp(t.complete,o)}):r=t}this.destination=new Kp(r)}};function Cd(n){ii.useDeprecatedSynchronousErrorHandling?FC(n):_d(n)}function nk(n){throw n}function qp(n,t){let{onStoppedNotification:e}=ii;e&&ks.setTimeout(()=>e(n,t))}var ik={closed:!0,next:nl,error:nk,complete:nl};var Rs=typeof Symbol=="function"&&Symbol.observable||"@@observable";function Dn(n){return n}function Yp(...n){return Zp(n)}function Zp(n){return n.length===0?Dn:n.length===1?n[0]:function(e){return n.reduce((i,r)=>r(i),e)}}var U=(()=>{class n{constructor(e){e&&(this._subscribe=e)}lift(e){let i=new n;return i.source=this,i.operator=e,i}subscribe(e,i,r){let o=ok(e)?e:new ri(e,i,r);return As(()=>{let{operator:s,source:a}=this;o.add(s?s.call(o,a):a?this._subscribe(o):this._trySubscribe(o))}),o}_trySubscribe(e){try{return this._subscribe(e)}catch(i){e.error(i)}}forEach(e,i){return i=LC(i),new i((r,o)=>{let s=new ri({next:a=>{try{e(a)}catch(l){o(l),s.unsubscribe()}},error:o,complete:r});this.subscribe(s)})}_subscribe(e){var i;return(i=this.source)===null||i===void 0?void 0:i.subscribe(e)}[Rs](){return this}pipe(...e){return Zp(e)(this)}toPromise(e){return e=LC(e),new e((i,r)=>{let o;this.subscribe(s=>o=s,s=>r(s),()=>i(o))})}}return n.create=t=>new n(t),n})();function LC(n){var t;return(t=n??ii.Promise)!==null&&t!==void 0?t:Promise}function rk(n){return n&&de(n.next)&&de(n.error)&&de(n.complete)}function ok(n){return n&&n instanceof So||rk(n)&&bd(n)}function Xp(n){return de(n?.lift)}function ae(n){return t=>{if(Xp(t))return t.lift(function(e){try{return n(e,this)}catch(i){this.error(i)}});throw new TypeError("Unable to lift unknown Observable type")}}function se(n,t,e,i,r){return new Qp(n,t,e,i,r)}var Qp=class extends So{constructor(t,e,i,r,o,s){super(t),this.onFinalize=o,this.shouldUnsubscribe=s,this._next=e?function(a){try{e(a)}catch(l){t.error(l)}}:super._next,this._error=r?function(a){try{r(a)}catch(l){t.error(l)}finally{this.unsubscribe()}}:super._error,this._complete=i?function(){try{i()}catch(a){t.error(a)}finally{this.unsubscribe()}}:super._complete}unsubscribe(){var t;if(!this.shouldUnsubscribe||this.shouldUnsubscribe()){let{closed:e}=this;super.unsubscribe(),!e&&((t=this.onFinalize)===null||t===void 0||t.call(this))}}};function VC(){return ae((n,t)=>{let e=null;n._refCount++;let i=se(t,void 0,void 0,void 0,()=>{if(!n||n._refCount<=0||0<--n._refCount){e=null;return}let r=n._connection,o=e;e=null,r&&(!o||r===o)&&r.unsubscribe(),t.unsubscribe()});n.subscribe(i),i.closed||(e=n.connect())})}var il=class extends U{constructor(t,e){super(),this.source=t,this.subjectFactory=e,this._subject=null,this._refCount=0,this._connection=null,Xp(t)&&(this.lift=t.lift)}_subscribe(t){return this.getSubject().subscribe(t)}getSubject(){let t=this._subject;return(!t||t.isStopped)&&(this._subject=this.subjectFactory()),this._subject}_teardown(){this._refCount=0;let{_connection:t}=this;this._subject=this._connection=null,t?.unsubscribe()}connect(){let t=this._connection;if(!t){t=this._connection=new H;let e=this.getSubject();t.add(this.source.subscribe(se(e,void 0,()=>{this._teardown(),e.complete()},i=>{this._teardown(),e.error(i)},()=>this._teardown()))),t.closed&&(this._connection=null,t=H.EMPTY)}return t}refCount(){return VC()(this)}};var Os={schedule(n){let t=requestAnimationFrame,e=cancelAnimationFrame,{delegate:i}=Os;i&&(t=i.requestAnimationFrame,e=i.cancelAnimationFrame);let r=t(o=>{e=void 0,n(o)});return new H(()=>e?.(r))},requestAnimationFrame(...n){let{delegate:t}=Os;return(t?.requestAnimationFrame||requestAnimationFrame)(...n)},cancelAnimationFrame(...n){let{delegate:t}=Os;return(t?.cancelAnimationFrame||cancelAnimationFrame)(...n)},delegate:void 0};var BC=Ms(n=>function(){n(this),this.name="ObjectUnsubscribedError",this.message="object unsubscribed"});var D=(()=>{class n extends U{constructor(){super(),this.closed=!1,this.currentObservers=null,this.observers=[],this.isStopped=!1,this.hasError=!1,this.thrownError=null}lift(e){let i=new Dd(this,this);return i.operator=e,i}_throwIfClosed(){if(this.closed)throw new BC}next(e){As(()=>{if(this._throwIfClosed(),!this.isStopped){this.currentObservers||(this.currentObservers=Array.from(this.observers));for(let i of this.currentObservers)i.next(e)}})}error(e){As(()=>{if(this._throwIfClosed(),!this.isStopped){this.hasError=this.isStopped=!0,this.thrownError=e;let{observers:i}=this;for(;i.length;)i.shift().error(e)}})}complete(){As(()=>{if(this._throwIfClosed(),!this.isStopped){this.isStopped=!0;let{observers:e}=this;for(;e.length;)e.shift().complete()}})}unsubscribe(){this.isStopped=this.closed=!0,this.observers=this.currentObservers=null}get observed(){var e;return((e=this.observers)===null||e===void 0?void 0:e.length)>0}_trySubscribe(e){return this._throwIfClosed(),super._trySubscribe(e)}_subscribe(e){return this._throwIfClosed(),this._checkFinalizedStatuses(e),this._innerSubscribe(e)}_innerSubscribe(e){let{hasError:i,isStopped:r,observers:o}=this;return i||r?zp:(this.currentObservers=null,o.push(e),new H(()=>{this.currentObservers=null,Eo(o,e)}))}_checkFinalizedStatuses(e){let{hasError:i,thrownError:r,isStopped:o}=this;i?e.error(r):o&&e.complete()}asObservable(){let e=new U;return e.source=this,e}}return n.create=(t,e)=>new Dd(t,e),n})(),Dd=class extends D{constructor(t,e){super(),this.destination=t,this.source=e}next(t){var e,i;(i=(e=this.destination)===null||e===void 0?void 0:e.next)===null||i===void 0||i.call(e,t)}error(t){var e,i;(i=(e=this.destination)===null||e===void 0?void 0:e.error)===null||i===void 0||i.call(e,t)}complete(){var t,e;(e=(t=this.destination)===null||t===void 0?void 0:t.complete)===null||e===void 0||e.call(t)}_subscribe(t){var e,i;return(i=(e=this.source)===null||e===void 0?void 0:e.subscribe(t))!==null&&i!==void 0?i:zp}};var rt=class extends D{constructor(t){super(),this._value=t}get value(){return this.getValue()}_subscribe(t){let e=super._subscribe(t);return!e.closed&&t.next(this._value),e}getValue(){let{hasError:t,thrownError:e,_value:i}=this;if(t)throw e;return this._throwIfClosed(),i}next(t){super.next(this._value=t)}};var rl={now(){return(rl.delegate||Date).now()},delegate:void 0};var Nr=class extends D{constructor(t=1/0,e=1/0,i=rl){super(),this._bufferSize=t,this._windowTime=e,this._timestampProvider=i,this._buffer=[],this._infiniteTimeWindow=!0,this._infiniteTimeWindow=e===1/0,this._bufferSize=Math.max(1,t),this._windowTime=Math.max(1,e)}next(t){let{isStopped:e,_buffer:i,_infiniteTimeWindow:r,_timestampProvider:o,_windowTime:s}=this;e||(i.push(t),!r&&i.push(o.now()+s)),this._trimBuffer(),super.next(t)}_subscribe(t){this._throwIfClosed(),this._trimBuffer();let e=this._innerSubscribe(t),{_infiniteTimeWindow:i,_buffer:r}=this,o=r.slice();for(let s=0;s<o.length&&!t.closed;s+=i?1:2)t.next(o[s]);return this._checkFinalizedStatuses(t),e}_trimBuffer(){let{_bufferSize:t,_timestampProvider:e,_buffer:i,_infiniteTimeWindow:r}=this,o=(r?1:2)*t;if(t<1/0&&o<i.length&&i.splice(0,i.length-o),!r){let s=e.now(),a=0;for(let l=1;l<i.length&&i[l]<=s;l+=2)a=l;a&&i.splice(0,a+1)}}};var Ed=class extends H{constructor(t,e){super()}schedule(t,e=0){return this}};var ol={setInterval(n,t,...e){let{delegate:i}=ol;return i?.setInterval?i.setInterval(n,t,...e):setInterval(n,t,...e)},clearInterval(n){let{delegate:t}=ol;return(t?.clearInterval||clearInterval)(n)},delegate:void 0};var Pr=class extends Ed{constructor(t,e){super(t,e),this.scheduler=t,this.work=e,this.pending=!1}schedule(t,e=0){var i;if(this.closed)return this;this.state=t;let r=this.id,o=this.scheduler;return r!=null&&(this.id=this.recycleAsyncId(o,r,e)),this.pending=!0,this.delay=e,this.id=(i=this.id)!==null&&i!==void 0?i:this.requestAsyncId(o,this.id,e),this}requestAsyncId(t,e,i=0){return ol.setInterval(t.flush.bind(t,this),i)}recycleAsyncId(t,e,i=0){if(i!=null&&this.delay===i&&this.pending===!1)return e;e!=null&&ol.clearInterval(e)}execute(t,e){if(this.closed)return new Error("executing a cancelled action");this.pending=!1;let i=this._execute(t,e);if(i)return i;this.pending===!1&&this.id!=null&&(this.id=this.recycleAsyncId(this.scheduler,this.id,null))}_execute(t,e){let i=!1,r;try{this.work(t)}catch(o){i=!0,r=o||new Error("Scheduled action threw falsy error")}if(i)return this.unsubscribe(),r}unsubscribe(){if(!this.closed){let{id:t,scheduler:e}=this,{actions:i}=e;this.work=this.state=this.scheduler=null,this.pending=!1,Eo(i,this),t!=null&&(this.id=this.recycleAsyncId(e,t,null)),this.delay=null,super.unsubscribe()}}};var sk=1,Jp,em={};function jC(n){return n in em?(delete em[n],!0):!1}var UC={setImmediate(n){let t=sk++;return em[t]=!0,Jp||(Jp=Promise.resolve()),Jp.then(()=>jC(t)&&n()),t},clearImmediate(n){jC(n)}};var{setImmediate:ak,clearImmediate:lk}=UC,sl={setImmediate(...n){let{delegate:t}=sl;return(t?.setImmediate||ak)(...n)},clearImmediate(n){let{delegate:t}=sl;return(t?.clearImmediate||lk)(n)},delegate:void 0};var wd=class extends Pr{constructor(t,e){super(t,e),this.scheduler=t,this.work=e}requestAsyncId(t,e,i=0){return i!==null&&i>0?super.requestAsyncId(t,e,i):(t.actions.push(this),t._scheduled||(t._scheduled=sl.setImmediate(t.flush.bind(t,void 0))))}recycleAsyncId(t,e,i=0){var r;if(i!=null?i>0:this.delay>0)return super.recycleAsyncId(t,e,i);let{actions:o}=t;e!=null&&((r=o[o.length-1])===null||r===void 0?void 0:r.id)!==e&&(sl.clearImmediate(e),t._scheduled===e&&(t._scheduled=void 0))}};var Ns=class n{constructor(t,e=n.now){this.schedulerActionCtor=t,this.now=e}schedule(t,e=0,i){return new this.schedulerActionCtor(this,t).schedule(i,e)}};Ns.now=rl.now;var Fr=class extends Ns{constructor(t,e=Ns.now){super(t,e),this.actions=[],this._active=!1}flush(t){let{actions:e}=this;if(this._active){e.push(t);return}let i;this._active=!0;do if(i=t.execute(t.state,t.delay))break;while(t=e.shift());if(this._active=!1,i){for(;t=e.shift();)t.unsubscribe();throw i}}};var Sd=class extends Fr{flush(t){this._active=!0;let e=this._scheduled;this._scheduled=void 0;let{actions:i}=this,r;t=t||i.shift();do if(r=t.execute(t.state,t.delay))break;while((t=i[0])&&t.id===e&&i.shift());if(this._active=!1,r){for(;(t=i[0])&&t.id===e&&i.shift();)t.unsubscribe();throw r}}};var tm=new Sd(wd);var al=new Fr(Pr),HC=al;var Td=class extends Pr{constructor(t,e){super(t,e),this.scheduler=t,this.work=e}requestAsyncId(t,e,i=0){return i!==null&&i>0?super.requestAsyncId(t,e,i):(t.actions.push(this),t._scheduled||(t._scheduled=Os.requestAnimationFrame(()=>t.flush(void 0))))}recycleAsyncId(t,e,i=0){var r;if(i!=null?i>0:this.delay>0)return super.recycleAsyncId(t,e,i);let{actions:o}=t;e!=null&&e===t._scheduled&&((r=o[o.length-1])===null||r===void 0?void 0:r.id)!==e&&(Os.cancelAnimationFrame(e),t._scheduled=void 0)}};var Id=class extends Fr{flush(t){this._active=!0;let e;t?e=t.id:(e=this._scheduled,this._scheduled=void 0);let{actions:i}=this,r;t=t||i.shift();do if(r=t.execute(t.state,t.delay))break;while((t=i[0])&&t.id===e&&i.shift());if(this._active=!1,r){for(;(t=i[0])&&t.id===e&&i.shift();)t.unsubscribe();throw r}}};var nm=new Id(Td);var je=new U(n=>n.complete());function xd(n){return n&&de(n.schedule)}function im(n){return n[n.length-1]}function Md(n){return de(im(n))?n.pop():void 0}function Mi(n){return xd(im(n))?n.pop():void 0}function $C(n,t){return typeof im(n)=="number"?n.pop():t}function ll(n,t,e,i){var r=arguments.length,o=r<3?t:i===null?i=Object.getOwnPropertyDescriptor(t,e):i,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")o=Reflect.decorate(n,t,e,i);else for(var a=n.length-1;a>=0;a--)(s=n[a])&&(o=(r<3?s(o):r>3?s(t,e,o):s(t,e))||o);return r>3&&o&&Object.defineProperty(t,e,o),o}function WC(n,t,e,i){function r(o){return o instanceof e?o:new e(function(s){s(o)})}return new(e||(e=Promise))(function(o,s){function a(d){try{c(i.next(d))}catch(u){s(u)}}function l(d){try{c(i.throw(d))}catch(u){s(u)}}function c(d){d.done?o(d.value):r(d.value).then(a,l)}c((i=i.apply(n,t||[])).next())})}function zC(n){var t=typeof Symbol=="function"&&Symbol.iterator,e=t&&n[t],i=0;if(e)return e.call(n);if(n&&typeof n.length=="number")return{next:function(){return n&&i>=n.length&&(n=void 0),{value:n&&n[i++],done:!n}}};throw new TypeError(t?"Object is not iterable.":"Symbol.iterator is not defined.")}function To(n){return this instanceof To?(this.v=n,this):new To(n)}function GC(n,t,e){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var i=e.apply(n,t||[]),r,o=[];return r=Object.create((typeof AsyncIterator=="function"?AsyncIterator:Object).prototype),a("next"),a("throw"),a("return",s),r[Symbol.asyncIterator]=function(){return this},r;function s(p){return function(m){return Promise.resolve(m).then(p,u)}}function a(p,m){i[p]&&(r[p]=function(w){return new Promise(function(k,N){o.push([p,w,k,N])>1||l(p,w)})},m&&(r[p]=m(r[p])))}function l(p,m){try{c(i[p](m))}catch(w){h(o[0][3],w)}}function c(p){p.value instanceof To?Promise.resolve(p.value.v).then(d,u):h(o[0][2],p)}function d(p){l("next",p)}function u(p){l("throw",p)}function h(p,m){p(m),o.shift(),o.length&&l(o[0][0],o[0][1])}}function qC(n){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var t=n[Symbol.asyncIterator],e;return t?t.call(n):(n=typeof zC=="function"?zC(n):n[Symbol.iterator](),e={},i("next"),i("throw"),i("return"),e[Symbol.asyncIterator]=function(){return this},e);function i(o){e[o]=n[o]&&function(s){return new Promise(function(a,l){s=n[o](s),r(a,l,s.done,s.value)})}}function r(o,s,a,l){Promise.resolve(l).then(function(c){o({value:c,done:a})},s)}}var kd=n=>n&&typeof n.length=="number"&&typeof n!="function";function Ad(n){return de(n?.then)}function Rd(n){return de(n[Rs])}function Od(n){return Symbol.asyncIterator&&de(n?.[Symbol.asyncIterator])}function Nd(n){return new TypeError(`You provided ${n!==null&&typeof n=="object"?"an invalid object":`'${n}'`} where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.`)}function ck(){return typeof Symbol!="function"||!Symbol.iterator?"@@iterator":Symbol.iterator}var Pd=ck();function Fd(n){return de(n?.[Pd])}function Ld(n){return GC(this,arguments,function*(){let e=n.getReader();try{for(;;){let{value:i,done:r}=yield To(e.read());if(r)return yield To(void 0);yield yield To(i)}}finally{e.releaseLock()}})}function Vd(n){return de(n?.getReader)}function Ue(n){if(n instanceof U)return n;if(n!=null){if(Rd(n))return dk(n);if(kd(n))return uk(n);if(Ad(n))return fk(n);if(Od(n))return KC(n);if(Fd(n))return hk(n);if(Vd(n))return pk(n)}throw Nd(n)}function dk(n){return new U(t=>{let e=n[Rs]();if(de(e.subscribe))return e.subscribe(t);throw new TypeError("Provided object does not correctly implement Symbol.observable")})}function uk(n){return new U(t=>{for(let e=0;e<n.length&&!t.closed;e++)t.next(n[e]);t.complete()})}function fk(n){return new U(t=>{n.then(e=>{t.closed||(t.next(e),t.complete())},e=>t.error(e)).then(null,_d)})}function hk(n){return new U(t=>{for(let e of n)if(t.next(e),t.closed)return;t.complete()})}function KC(n){return new U(t=>{mk(n,t).catch(e=>t.error(e))})}function pk(n){return KC(Ld(n))}function mk(n,t){var e,i,r,o;return WC(this,void 0,void 0,function*(){try{for(e=qC(n);i=yield e.next(),!i.done;){let s=i.value;if(t.next(s),t.closed)return}}catch(s){r={error:s}}finally{try{i&&!i.done&&(o=e.return)&&(yield o.call(e))}finally{if(r)throw r.error}}t.complete()})}function fn(n,t,e,i=0,r=!1){let o=t.schedule(function(){e(),r?n.add(this.schedule(null,i)):this.unsubscribe()},i);if(n.add(o),!r)return o}function Bd(n,t=0){return ae((e,i)=>{e.subscribe(se(i,r=>fn(i,n,()=>i.next(r),t),()=>fn(i,n,()=>i.complete(),t),r=>fn(i,n,()=>i.error(r),t)))})}function jd(n,t=0){return ae((e,i)=>{i.add(n.schedule(()=>e.subscribe(i),t))})}function YC(n,t){return Ue(n).pipe(jd(t),Bd(t))}function ZC(n,t){return Ue(n).pipe(jd(t),Bd(t))}function XC(n,t){return new U(e=>{let i=0;return t.schedule(function(){i===n.length?e.complete():(e.next(n[i++]),e.closed||this.schedule())})})}function QC(n,t){return new U(e=>{let i;return fn(e,t,()=>{i=n[Pd](),fn(e,t,()=>{let r,o;try{({value:r,done:o}=i.next())}catch(s){e.error(s);return}o?e.complete():e.next(r)},0,!0)}),()=>de(i?.return)&&i.return()})}function Ud(n,t){if(!n)throw new Error("Iterable cannot be null");return new U(e=>{fn(e,t,()=>{let i=n[Symbol.asyncIterator]();fn(e,t,()=>{i.next().then(r=>{r.done?e.complete():e.next(r.value)})},0,!0)})})}function JC(n,t){return Ud(Ld(n),t)}function eD(n,t){if(n!=null){if(Rd(n))return YC(n,t);if(kd(n))return XC(n,t);if(Ad(n))return ZC(n,t);if(Od(n))return Ud(n,t);if(Fd(n))return QC(n,t);if(Vd(n))return JC(n,t)}throw Nd(n)}function Ze(n,t){return t?eD(n,t):Ue(n)}function M(...n){let t=Mi(n);return Ze(n,t)}function rm(n,t){let e=de(n)?n:()=>n,i=r=>r.error(e());return new U(t?r=>t.schedule(i,0,r):i)}function En(n){return!!n&&(n instanceof U||de(n.lift)&&de(n.subscribe))}var Yi=Ms(n=>function(){n(this),this.name="EmptyError",this.message="no elements in sequence"});function Ps(n,t){let e=typeof t=="object";return new Promise((i,r)=>{let o=new ri({next:s=>{i(s),o.unsubscribe()},error:r,complete:()=>{e?i(t.defaultValue):r(new Yi)}});n.subscribe(o)})}function tD(n){return n instanceof Date&&!isNaN(n)}function ue(n,t){return ae((e,i)=>{let r=0;e.subscribe(se(i,o=>{i.next(n.call(t,o,r++))}))})}var{isArray:gk}=Array;function yk(n,t){return gk(t)?n(...t):n(t)}function Hd(n){return ue(t=>yk(n,t))}var{isArray:vk}=Array,{getPrototypeOf:bk,prototype:_k,keys:Ck}=Object;function $d(n){if(n.length===1){let t=n[0];if(vk(t))return{args:t,keys:null};if(Dk(t)){let e=Ck(t);return{args:e.map(i=>t[i]),keys:e}}}return{args:n,keys:null}}function Dk(n){return n&&typeof n=="object"&&bk(n)===_k}function zd(n,t){return n.reduce((e,i,r)=>(e[i]=t[r],e),{})}function cl(...n){let t=Mi(n),e=Md(n),{args:i,keys:r}=$d(n);if(i.length===0)return Ze([],t);let o=new U(Ek(i,t,r?s=>zd(r,s):Dn));return e?o.pipe(Hd(e)):o}function Ek(n,t,e=Dn){return i=>{nD(t,()=>{let{length:r}=n,o=new Array(r),s=r,a=r;for(let l=0;l<r;l++)nD(t,()=>{let c=Ze(n[l],t),d=!1;c.subscribe(se(i,u=>{o[l]=u,d||(d=!0,a--),a||i.next(e(o.slice()))},()=>{--s||i.complete()}))},i)},i)}}function nD(n,t,e){n?fn(e,n,t):t()}function iD(n,t,e,i,r,o,s,a){let l=[],c=0,d=0,u=!1,h=()=>{u&&!l.length&&!c&&t.complete()},p=w=>c<i?m(w):l.push(w),m=w=>{o&&t.next(w),c++;let k=!1;Ue(e(w,d++)).subscribe(se(t,N=>{r?.(N),o?p(N):t.next(N)},()=>{k=!0},void 0,()=>{if(k)try{for(c--;l.length&&c<i;){let N=l.shift();s?fn(t,s,()=>m(N)):m(N)}h()}catch(N){t.error(N)}}))};return n.subscribe(se(t,p,()=>{u=!0,h()})),()=>{a?.()}}function Xt(n,t,e=1/0){return de(t)?Xt((i,r)=>ue((o,s)=>t(i,o,r,s))(Ue(n(i,r))),e):(typeof t=="number"&&(e=t),ae((i,r)=>iD(i,r,n,e)))}function Wd(n=1/0){return Xt(Dn,n)}function rD(){return Wd(1)}function Lr(...n){return rD()(Ze(n,Mi(n)))}function Io(n){return new U(t=>{Ue(n()).subscribe(t)})}function Fs(...n){let t=Md(n),{args:e,keys:i}=$d(n),r=new U(o=>{let{length:s}=e;if(!s){o.complete();return}let a=new Array(s),l=s,c=s;for(let d=0;d<s;d++){let u=!1;Ue(e[d]).subscribe(se(o,h=>{u||(u=!0,c--),a[d]=h},()=>l--,void 0,()=>{(!l||!u)&&(c||o.next(i?zd(i,a):a),o.complete())}))}});return t?r.pipe(Hd(t)):r}function dl(n=0,t,e=HC){let i=-1;return t!=null&&(xd(t)?e=t:i=t),new U(r=>{let o=tD(n)?+n-e.now():n;o<0&&(o=0);let s=0;return e.schedule(function(){r.closed||(r.next(s++),0<=i?this.schedule(void 0,i):r.complete())},o)})}function Qt(...n){let t=Mi(n),e=$C(n,1/0),i=n;return i.length?i.length===1?Ue(i[0]):Wd(e)(Ze(i,t)):je}function _e(n,t){return ae((e,i)=>{let r=0;e.subscribe(se(i,o=>n.call(t,o,r++)&&i.next(o)))})}function oD(n){return ae((t,e)=>{let i=!1,r=null,o=null,s=!1,a=()=>{if(o?.unsubscribe(),o=null,i){i=!1;let c=r;r=null,e.next(c)}s&&e.complete()},l=()=>{o=null,s&&e.complete()};t.subscribe(se(e,c=>{i=!0,r=c,o||Ue(n(c)).subscribe(o=se(e,a,l))},()=>{s=!0,(!i||!o||o.closed)&&e.complete()}))})}function ul(n,t=al){return oD(()=>dl(n,t))}function Zi(n){return ae((t,e)=>{let i=null,r=!1,o;i=t.subscribe(se(e,void 0,void 0,s=>{o=Ue(n(s,Zi(n)(t))),i?(i.unsubscribe(),i=null,o.subscribe(e)):r=!0})),r&&(i.unsubscribe(),i=null,o.subscribe(e))})}function Gd(n,t){return de(t)?Xt(n,t,1):Xt(n,1)}function Xi(n,t=al){return ae((e,i)=>{let r=null,o=null,s=null,a=()=>{if(r){r.unsubscribe(),r=null;let c=o;o=null,i.next(c)}};function l(){let c=s+n,d=t.now();if(d<c){r=this.schedule(void 0,c-d),i.add(r);return}a()}e.subscribe(se(i,c=>{o=c,s=t.now(),r||(r=t.schedule(l,n),i.add(r))},()=>{a(),i.complete()},void 0,()=>{o=r=null}))})}function sD(n){return ae((t,e)=>{let i=!1;t.subscribe(se(e,r=>{i=!0,e.next(r)},()=>{i||e.next(n),e.complete()}))})}function gt(n){return n<=0?()=>je:ae((t,e)=>{let i=0;t.subscribe(se(e,r=>{++i<=n&&(e.next(r),n<=i&&e.complete())}))})}function Ls(n,t=Dn){return n=n??wk,ae((e,i)=>{let r,o=!0;e.subscribe(se(i,s=>{let a=t(s);(o||!n(r,a))&&(o=!1,r=a,i.next(s))}))})}function wk(n,t){return n===t}function aD(n=Sk){return ae((t,e)=>{let i=!1;t.subscribe(se(e,r=>{i=!0,e.next(r)},()=>i?e.complete():e.error(n())))})}function Sk(){return new Yi}function om(n){return ae((t,e)=>{try{t.subscribe(e)}finally{e.add(n)}})}function Qi(n,t){let e=arguments.length>=2;return i=>i.pipe(n?_e((r,o)=>n(r,o,i)):Dn,gt(1),e?sD(t):aD(()=>new Yi))}function qd(n){return n<=0?()=>je:ae((t,e)=>{let i=[];t.subscribe(se(e,r=>{i.push(r),n<i.length&&i.shift()},()=>{for(let r of i)e.next(r);e.complete()},void 0,()=>{i=null}))})}function fl(){return ae((n,t)=>{let e,i=!1;n.subscribe(se(t,r=>{let o=e;e=r,i&&t.next([o,r]),i=!0}))})}function lD(n={}){let{connector:t=()=>new D,resetOnError:e=!0,resetOnComplete:i=!0,resetOnRefCountZero:r=!0}=n;return o=>{let s,a,l,c=0,d=!1,u=!1,h=()=>{a?.unsubscribe(),a=void 0},p=()=>{h(),s=l=void 0,d=u=!1},m=()=>{let w=s;p(),w?.unsubscribe()};return ae((w,k)=>{c++,!u&&!d&&h();let N=l=l??t();k.add(()=>{c--,c===0&&!u&&!d&&(a=sm(m,r))}),N.subscribe(k),!s&&c>0&&(s=new ri({next:De=>N.next(De),error:De=>{u=!0,h(),a=sm(p,e,De),N.error(De)},complete:()=>{d=!0,h(),a=sm(p,i),N.complete()}}),Ue(w).subscribe(s))})(o)}}function sm(n,t,...e){if(t===!0){n();return}if(t===!1)return;let i=new ri({next:()=>{i.unsubscribe(),n()}});return Ue(t(...e)).subscribe(i)}function hl(n,t,e){let i,r=!1;return n&&typeof n=="object"?{bufferSize:i=1/0,windowTime:t=1/0,refCount:r=!1,scheduler:e}=n:i=n??1/0,lD({connector:()=>new Nr(i,t,e),resetOnError:!0,resetOnComplete:!1,resetOnRefCountZero:r})}function xo(n){return _e((t,e)=>n<=e)}function dt(...n){let t=Mi(n);return ae((e,i)=>{(t?Lr(n,e,t):Lr(n,e)).subscribe(i)})}function ut(n,t){return ae((e,i)=>{let r=null,o=0,s=!1,a=()=>s&&!r&&i.complete();e.subscribe(se(i,l=>{r?.unsubscribe();let c=0,d=o++;Ue(n(l,d)).subscribe(r=se(i,u=>i.next(t?t(l,u,d,c++):u),()=>{r=null,a()}))},()=>{s=!0,a()}))})}function K(n){return ae((t,e)=>{Ue(n).subscribe(se(e,()=>e.complete(),nl)),!e.closed&&t.subscribe(e)})}function am(n,t=!1){return ae((e,i)=>{let r=0;e.subscribe(se(i,o=>{let s=n(o,r++);(s||t)&&i.next(o),!s&&i.complete()}))})}function Dt(n,t,e){let i=de(n)||t||e?{next:n,error:t,complete:e}:n;return i?ae((r,o)=>{var s;(s=i.subscribe)===null||s===void 0||s.call(i);let a=!0;r.subscribe(se(o,l=>{var c;(c=i.next)===null||c===void 0||c.call(i,l),o.next(l)},()=>{var l;a=!1,(l=i.complete)===null||l===void 0||l.call(i),o.complete()},l=>{var c;a=!1,(c=i.error)===null||c===void 0||c.call(i,l),o.error(l)},()=>{var l,c;a&&((l=i.unsubscribe)===null||l===void 0||l.call(i)),(c=i.finalize)===null||c===void 0||c.call(i)}))}):Dn}var lm;function Kd(){return lm}function ki(n){let t=lm;return lm=n,t}var cD=Symbol("NotFound");function Vs(n){return n===cD||n?.name==="\u0275NotFound"}function cm(n,t,e){let i=Object.create(Tk);i.source=n,i.computation=t,e!=null&&(i.equal=e);let o=()=>{if(Co(i),Ar(i),i.value===xi)throw i.error;return i.value};return o[ct]=i,Qa(i),o}function dD(n,t){Co(n),Do(n,t),Ts(n)}function uD(n,t){if(Co(n),n.value===xi)throw n.error;yd(n,t),Ts(n)}var Tk=V(g({},kr),{value:bo,dirty:!0,error:null,equal:Ja,kind:"linkedSignal",producerMustRecompute(n){return n.value===bo||n.value===_o},producerRecomputeValue(n){if(n.value===_o)throw new Error("");let t=n.value;n.value=_o;let e=Ki(n),i,r=!1;try{let o=n.source(),s=t!==bo&&t!==xi,a=s?{source:n.sourceValue,value:t}:void 0;i=n.computation(o,a),n.sourceValue=o,B(null),r=s&&i!==xi&&n.equal(t,i)}catch(o){i=xi,n.error=o}finally{Rr(n,e)}if(r){n.value=t;return}n.value=i,n.version++}});function fD(n){let t=B(null);try{return n()}finally{B(t)}}var tu="https://angular.dev/best-practices/security#preventing-cross-site-scripting-xss",S=class extends Error{code;constructor(t,e){super(tr(t,e)),this.code=t}};function Ik(n){return`NG0${Math.abs(n)}`}function tr(n,t){return`${Ik(n)}${t?": "+t:""}`}var Ln=globalThis;function Ne(n){for(let t in n)if(n[t]===Ne)return t;throw Error("")}function yD(n,t){for(let e in t)t.hasOwnProperty(e)&&!n.hasOwnProperty(e)&&(n[e]=t[e])}function _l(n){if(typeof n=="string")return n;if(Array.isArray(n))return`[${n.map(_l).join(", ")}]`;if(n==null)return""+n;let t=n.overriddenName||n.name;if(t)return`${t}`;let e=n.toString();if(e==null)return""+e;let i=e.indexOf(`
`);return i>=0?e.slice(0,i):e}function nu(n,t){return n?t?`${n} ${t}`:n:t||""}var xk=Ne({__forward_ref__:Ne});function nr(n){return n.__forward_ref__=nr,n}function Ot(n){return Dm(n)?n():n}function Dm(n){return typeof n=="function"&&n.hasOwnProperty(xk)&&n.__forward_ref__===nr}function C(n){return{token:n.token,providedIn:n.providedIn||null,factory:n.factory,value:void 0}}function be(n){return{providers:n.providers||[],imports:n.imports||[]}}function Cl(n){return Mk(n,iu)}function Em(n){return Cl(n)!==null}function Mk(n,t){return n.hasOwnProperty(t)&&n[t]||null}function kk(n){let t=n?.[iu]??null;return t||null}function um(n){return n&&n.hasOwnProperty(Zd)?n[Zd]:null}var iu=Ne({\u0275prov:Ne}),Zd=Ne({\u0275inj:Ne}),b=class{_desc;ngMetadataName="InjectionToken";\u0275prov;constructor(t,e){this._desc=t,this.\u0275prov=void 0,typeof e=="number"?this.__NG_ELEMENT_ID__=e:e!==void 0&&(this.\u0275prov=C({token:this,providedIn:e.providedIn||"root",factory:e.factory}))}get multi(){return this}toString(){return`InjectionToken ${this._desc}`}};function wm(n){return n&&!!n.\u0275providers}var Sm=Ne({\u0275cmp:Ne}),Tm=Ne({\u0275dir:Ne}),Im=Ne({\u0275pipe:Ne}),xm=Ne({\u0275mod:Ne}),ml=Ne({\u0275fac:Ne}),Oo=Ne({__NG_ELEMENT_ID__:Ne}),hD=Ne({__NG_ENV_ID__:Ne});function Mm(n){return ru(n,"@NgModule"),n[xm]||null}function ir(n){return ru(n,"@Component"),n[Sm]||null}function km(n){return ru(n,"@Directive"),n[Tm]||null}function vD(n){return ru(n,"@Pipe"),n[Im]||null}function ru(n,t){if(n==null)throw new S(-919,!1)}function ou(n){return typeof n=="string"?n:n==null?"":String(n)}var bD=Ne({ngErrorCode:Ne}),Ak=Ne({ngErrorMessage:Ne}),Rk=Ne({ngTokenPath:Ne});function Am(n,t){return _D("",-200,t)}function su(n,t){throw new S(-201,!1)}function _D(n,t,e){let i=new S(t,n);return i[bD]=t,i[Ak]=n,e&&(i[Rk]=e),i}function Ok(n){return n[bD]}var fm;function CD(){return fm}function Jt(n){let t=fm;return fm=n,t}function Rm(n,t,e){let i=Cl(n);if(i&&i.providedIn=="root")return i.value===void 0?i.value=i.factory():i.value;if(e&8)return null;if(t!==void 0)return t;su(n,"")}var Nk={},Mo=Nk,Pk="__NG_DI_FLAG__",hm=class{injector;constructor(t){this.injector=t}retrieve(t,e){let i=ko(e)||0;try{return this.injector.get(t,i&8?null:Mo,i)}catch(r){if(Vs(r))return r;throw r}}};function Fk(n,t=0){let e=Kd();if(e===void 0)throw new S(-203,!1);if(e===null)return Rm(n,void 0,t);{let i=Lk(t),r=e.retrieve(n,i);if(Vs(r)){if(i.optional)return null;throw r}return r}}function ne(n,t=0){return(CD()||Fk)(Ot(n),t)}function f(n,t){return ne(n,ko(t))}function ko(n){return typeof n>"u"||typeof n=="number"?n:0|(n.optional&&8)|(n.host&&1)|(n.self&&2)|(n.skipSelf&&4)}function Lk(n){return{optional:!!(n&8),host:!!(n&1),self:!!(n&2),skipSelf:!!(n&4)}}function pm(n){let t=[];for(let e=0;e<n.length;e++){let i=Ot(n[e]);if(Array.isArray(i)){if(i.length===0)throw new S(900,!1);let r,o=0;for(let s=0;s<i.length;s++){let a=i[s],l=Vk(a);typeof l=="number"?l===-1?r=a.token:o|=l:r=a}t.push(ne(r,o))}else t.push(ne(i))}return t}function Vk(n){return n[Pk]}function Vr(n,t){let e=n.hasOwnProperty(ml);return e?n[ml]:null}function DD(n,t,e){if(n.length!==t.length)return!1;for(let i=0;i<n.length;i++){let r=n[i],o=t[i];if(e&&(r=e(r),o=e(o)),o!==r)return!1}return!0}function ED(n){return n.flat(Number.POSITIVE_INFINITY)}function au(n,t){n.forEach(e=>Array.isArray(e)?au(e,t):t(e))}function Om(n,t,e){t>=n.length?n.push(e):n.splice(t,0,e)}function Dl(n,t){return t>=n.length-1?n.pop():n.splice(t,1)[0]}function wD(n,t){let e=[];for(let i=0;i<n;i++)e.push(t);return e}function SD(n,t,e,i){let r=n.length;if(r==t)n.push(e,i);else if(r===1)n.push(i,n[0]),n[0]=e;else{for(r--,n.push(n[r-1],n[r]);r>t;){let o=r-2;n[r]=n[o],r--}n[t]=e,n[t+1]=i}}function lu(n,t,e){let i=js(n,t);return i>=0?n[i|1]=e:(i=~i,SD(n,i,t,e)),i}function cu(n,t){let e=js(n,t);if(e>=0)return n[e|1]}function js(n,t){return Bk(n,t,1)}function Bk(n,t,e){let i=0,r=n.length>>e;for(;r!==i;){let o=i+(r-i>>1),s=n[o<<e];if(t===s)return o<<e;s>t?r=o:i=o+1}return~(r<<e)}var Ur={},Ht=[],Hr=new b(""),Nm=new b("",-1),Pm=new b(""),gl=class{get(t,e=Mo){if(e===Mo){let r=_D("",-201);throw r.name="\u0275NotFound",r}return e}};function rr(n){return{\u0275providers:n}}function TD(n){return rr([{provide:Hr,multi:!0,useValue:n}])}function ID(...n){return{\u0275providers:Fm(!0,n),\u0275fromNgModule:!0}}function Fm(n,...t){let e=[],i=new Set,r,o=s=>{e.push(s)};return au(t,s=>{let a=s;Xd(a,o,[],i)&&(r||=[],r.push(a))}),r!==void 0&&xD(r,o),e}function xD(n,t){for(let e=0;e<n.length;e++){let{ngModule:i,providers:r}=n[e];Lm(r,o=>{t(o,i)})}}function Xd(n,t,e,i){if(n=Ot(n),!n)return!1;let r=null,o=um(n),s=!o&&ir(n);if(!o&&!s){let l=n.ngModule;if(o=um(l),o)r=l;else return!1}else{if(s&&!s.standalone)return!1;r=n}let a=i.has(r);if(s){if(a)return!1;if(i.add(r),s.dependencies){let l=typeof s.dependencies=="function"?s.dependencies():s.dependencies;for(let c of l)Xd(c,t,e,i)}}else if(o){if(o.imports!=null&&!a){i.add(r);let c;au(o.imports,d=>{Xd(d,t,e,i)&&(c||=[],c.push(d))}),c!==void 0&&xD(c,t)}if(!a){let c=Vr(r)||(()=>new r);t({provide:r,useFactory:c,deps:Ht},r),t({provide:Pm,useValue:r,multi:!0},r),t({provide:Hr,useValue:()=>ne(r),multi:!0},r)}let l=o.providers;if(l!=null&&!a){let c=n;Lm(l,d=>{t(d,c)})}}else return!1;return r!==n&&n.providers!==void 0}function Lm(n,t){for(let e of n)wm(e)&&(e=e.\u0275providers),Array.isArray(e)?Lm(e,t):t(e)}var jk=Ne({provide:String,useValue:Ne});function MD(n){return n!==null&&typeof n=="object"&&jk in n}function Uk(n){return!!(n&&n.useExisting)}function Hk(n){return!!(n&&n.useFactory)}function Ao(n){return typeof n=="function"}function kD(n){return!!n.useClass}var El=new b(""),Yd={},pD={},dm;function Us(){return dm===void 0&&(dm=new gl),dm}var $e=class{},Ro=class extends $e{parent;source;scopes;records=new Map;_ngOnDestroyHooks=new Set;_onDestroyHooks=[];get destroyed(){return this._destroyed}_destroyed=!1;injectorDefTypes;constructor(t,e,i,r){super(),this.parent=e,this.source=i,this.scopes=r,gm(t,s=>this.processProvider(s)),this.records.set(Nm,Bs(void 0,this)),r.has("environment")&&this.records.set($e,Bs(void 0,this));let o=this.records.get(El);o!=null&&typeof o.value=="string"&&this.scopes.add(o.value),this.injectorDefTypes=new Set(this.get(Pm,Ht,{self:!0}))}retrieve(t,e){let i=ko(e)||0;try{return this.get(t,Mo,i)}catch(r){if(Vs(r))return r;throw r}}destroy(){pl(this),this._destroyed=!0;let t=B(null);try{for(let i of this._ngOnDestroyHooks)i.ngOnDestroy();let e=this._onDestroyHooks;this._onDestroyHooks=[];for(let i of e)i()}finally{this.records.clear(),this._ngOnDestroyHooks.clear(),this.injectorDefTypes.clear(),B(t)}}onDestroy(t){return pl(this),this._onDestroyHooks.push(t),()=>this.removeOnDestroy(t)}runInContext(t){pl(this);let e=ki(this),i=Jt(void 0),r;try{return t()}finally{ki(e),Jt(i)}}get(t,e=Mo,i){if(pl(this),t.hasOwnProperty(hD))return t[hD](this);let r=ko(i),o,s=ki(this),a=Jt(void 0);try{if(!(r&4)){let c=this.records.get(t);if(c===void 0){let d=qk(t)&&Cl(t);d&&this.injectableDefInScope(d)?c=Bs(mm(t),Yd):c=null,this.records.set(t,c)}if(c!=null)return this.hydrate(t,c,r)}let l=r&2?Us():this.parent;return e=r&8&&e===Mo?null:e,l.get(t,e)}catch(l){let c=Ok(l);throw c===-200||c===-201?new S(c,null):l}finally{Jt(a),ki(s)}}resolveInjectorInitializers(){let t=B(null),e=ki(this),i=Jt(void 0),r;try{let o=this.get(Hr,Ht,{self:!0});for(let s of o)s()}finally{ki(e),Jt(i),B(t)}}toString(){return"R3Injector[...]"}processProvider(t){t=Ot(t);let e=Ao(t)?t:Ot(t&&t.provide),i=zk(t);if(!Ao(t)&&t.multi===!0){let r=this.records.get(e);r||(r=Bs(void 0,Yd,!0),r.factory=()=>pm(r.multi),this.records.set(e,r)),e=t,r.multi.push(t)}this.records.set(e,i)}hydrate(t,e,i){let r=B(null);try{if(e.value===pD)throw Am("");return e.value===Yd&&(e.value=pD,e.value=e.factory(void 0,i)),typeof e.value=="object"&&e.value&&Gk(e.value)&&this._ngOnDestroyHooks.add(e.value),e.value}finally{B(r)}}injectableDefInScope(t){if(!t.providedIn)return!1;let e=Ot(t.providedIn);return typeof e=="string"?e==="any"||this.scopes.has(e):this.injectorDefTypes.has(e)}removeOnDestroy(t){let e=this._onDestroyHooks.indexOf(t);e!==-1&&this._onDestroyHooks.splice(e,1)}};function mm(n){let t=Cl(n),e=t!==null?t.factory:Vr(n);if(e!==null)return e;if(n instanceof b)throw new S(-204,!1);if(n instanceof Function)return $k(n);throw new S(-204,!1)}function $k(n){if(n.length>0)throw new S(-204,!1);let e=kk(n);return e!==null?()=>e.factory(n):()=>new n}function zk(n){if(MD(n))return Bs(void 0,n.useValue);{let t=Vm(n);return Bs(t,Yd)}}function Vm(n,t,e){let i;if(Ao(n)){let r=Ot(n);return Vr(r)||mm(r)}else if(MD(n))i=()=>Ot(n.useValue);else if(Hk(n))i=()=>n.useFactory(...pm(n.deps||[]));else if(Uk(n))i=(r,o)=>ne(Ot(n.useExisting),o!==void 0&&o&8?8:void 0);else{let r=Ot(n&&(n.useClass||n.provide));if(Wk(n))i=()=>new r(...pm(n.deps));else return Vr(r)||mm(r)}return i}function pl(n){if(n.destroyed)throw new S(-205,!1)}function Bs(n,t,e=!1){return{factory:n,value:t,multi:e?[]:void 0}}function Wk(n){return!!n.deps}function Gk(n){return n!==null&&typeof n=="object"&&typeof n.ngOnDestroy=="function"}function qk(n){return typeof n=="function"||typeof n=="object"&&n.ngMetadataName==="InjectionToken"}function gm(n,t){for(let e of n)Array.isArray(e)?gm(e,t):e&&wm(e)?gm(e.\u0275providers,t):t(e)}function $t(n,t){let e;n instanceof Ro?(pl(n),e=n):e=new hm(n);let i,r=ki(e),o=Jt(void 0);try{return t()}finally{ki(r),Jt(o)}}function AD(){return CD()!==void 0||Kd()!=null}var oi=0,$=1,ie=2,Et=3,Vn=4,en=5,No=6,Hs=7,ft=8,or=9,si=10,ze=11,$s=12,Bm=13,Po=14,tn=15,$r=16,Fo=17,Ai=18,sr=19,jm=20,Ji=21,du=22,Br=23,wn=24,Lo=25,zr=26,Xe=27,RD=1,Um=6,Wr=7,wl=8,Vo=9,ot=10;function ar(n){return Array.isArray(n)&&typeof n[RD]=="object"}function ai(n){return Array.isArray(n)&&n[RD]===!0}function Hm(n){return(n.flags&4)!==0}function Ri(n){return n.componentOffset>-1}function Sl(n){return(n.flags&1)===1}function Oi(n){return!!n.template}function zs(n){return(n[ie]&512)!==0}function Bo(n){return(n[ie]&256)===256}var $m="svg",OD="math";function Bn(n){for(;Array.isArray(n);)n=n[oi];return n}function zm(n,t){return Bn(t[n])}function jn(n,t){return Bn(t[n.index])}function uu(n,t){return n.data[t]}function fu(n,t){return n[t]}function Wm(n,t,e,i){e>=n.data.length&&(n.data[e]=null,n.blueprint[e]=null),t[e]=i}function Un(n,t){let e=t[n];return ar(e)?e:e[oi]}function ND(n){return(n[ie]&4)===4}function hu(n){return(n[ie]&128)===128}function PD(n){return ai(n[Et])}function Sn(n,t){return t==null?null:n[t]}function Gm(n){n[Fo]=0}function qm(n){n[ie]&1024||(n[ie]|=1024,hu(n)&&jo(n))}function FD(n,t){for(;n>0;)t=t[Po],n--;return t}function Tl(n){return!!(n[ie]&9216||n[wn]?.dirty)}function pu(n){n[si].changeDetectionScheduler?.notify(8),n[ie]&64&&(n[ie]|=1024),Tl(n)&&jo(n)}function jo(n){n[si].changeDetectionScheduler?.notify(0);let t=jr(n);for(;t!==null&&!(t[ie]&8192||(t[ie]|=8192,!hu(t)));)t=jr(t)}function Km(n,t){if(Bo(n))throw new S(911,!1);n[Ji]===null&&(n[Ji]=[]),n[Ji].push(t)}function LD(n,t){if(n[Ji]===null)return;let e=n[Ji].indexOf(t);e!==-1&&n[Ji].splice(e,1)}function jr(n){let t=n[Et];return ai(t)?t[Et]:t}function Ym(n){return n[Hs]??=[]}function Zm(n){return n.cleanup??=[]}function VD(n,t,e,i){let r=Ym(t);r.push(e),n.firstCreatePass&&Zm(n).push(i,r.length-1)}var pe={lFrame:YD(null),bindingsEnabled:!0,skipHydrationRootTNode:null};var ym=!1;function BD(){return pe.lFrame.elementDepthCount}function jD(){pe.lFrame.elementDepthCount++}function Xm(){pe.lFrame.elementDepthCount--}function Qm(){return pe.bindingsEnabled}function Jm(){return pe.skipHydrationRootTNode!==null}function eg(n){return pe.skipHydrationRootTNode===n}function tg(){pe.skipHydrationRootTNode=null}function Q(){return pe.lFrame.lView}function Qe(){return pe.lFrame.tView}function We(n){return pe.lFrame.contextLView=n,n[ft]}function Ge(n){return pe.lFrame.contextLView=null,n}function Nt(){let n=ng();for(;n!==null&&n.type===64;)n=n.parent;return n}function ng(){return pe.lFrame.currentTNode}function UD(){let n=pe.lFrame,t=n.currentTNode;return n.isParent?t:t.parent}function Ws(n,t){let e=pe.lFrame;e.currentTNode=n,e.isParent=t}function ig(){return pe.lFrame.isParent}function rg(){pe.lFrame.isParent=!1}function HD(){return pe.lFrame.contextLView}function og(){return ym}function yl(n){let t=ym;return ym=n,t}function sg(){let n=pe.lFrame,t=n.bindingRootIndex;return t===-1&&(t=n.bindingRootIndex=n.tView.bindingStartIndex),t}function $D(n){return pe.lFrame.bindingIndex=n}function Gr(){return pe.lFrame.bindingIndex++}function ag(n){let t=pe.lFrame,e=t.bindingIndex;return t.bindingIndex=t.bindingIndex+n,e}function zD(){return pe.lFrame.inI18n}function WD(n,t){let e=pe.lFrame;e.bindingIndex=e.bindingRootIndex=n,mu(t)}function GD(){return pe.lFrame.currentDirectiveIndex}function mu(n){pe.lFrame.currentDirectiveIndex=n}function qD(n){let t=pe.lFrame.currentDirectiveIndex;return t===-1?null:n[t]}function gu(){return pe.lFrame.currentQueryIndex}function Il(n){pe.lFrame.currentQueryIndex=n}function Kk(n){let t=n[$];return t.type===2?t.declTNode:t.type===1?n[en]:null}function lg(n,t,e){if(e&4){let r=t,o=n;for(;r=r.parent,r===null&&!(e&1);)if(r=Kk(o),r===null||(o=o[Po],r.type&10))break;if(r===null)return!1;t=r,n=o}let i=pe.lFrame=KD();return i.currentTNode=t,i.lView=n,!0}function yu(n){let t=KD(),e=n[$];pe.lFrame=t,t.currentTNode=e.firstChild,t.lView=n,t.tView=e,t.contextLView=n,t.bindingIndex=e.bindingStartIndex,t.inI18n=!1}function KD(){let n=pe.lFrame,t=n===null?null:n.child;return t===null?YD(n):t}function YD(n){let t={currentTNode:null,isParent:!0,lView:null,tView:null,selectedIndex:-1,contextLView:null,elementDepthCount:0,currentNamespace:null,currentDirectiveIndex:-1,bindingRootIndex:-1,bindingIndex:-1,currentQueryIndex:0,parent:n,child:null,inI18n:!1};return n!==null&&(n.child=t),t}function ZD(){let n=pe.lFrame;return pe.lFrame=n.parent,n.currentTNode=null,n.lView=null,n}var cg=ZD;function vu(){let n=ZD();n.isParent=!0,n.tView=null,n.selectedIndex=-1,n.contextLView=null,n.elementDepthCount=0,n.currentDirectiveIndex=-1,n.currentNamespace=null,n.bindingRootIndex=-1,n.bindingIndex=-1,n.currentQueryIndex=0}function XD(n){return(pe.lFrame.contextLView=FD(n,pe.lFrame.contextLView))[ft]}function lr(){return pe.lFrame.selectedIndex}function qr(n){pe.lFrame.selectedIndex=n}function xl(){let n=pe.lFrame;return uu(n.tView,n.selectedIndex)}function li(){pe.lFrame.currentNamespace=$m}function bu(){Yk()}function Yk(){pe.lFrame.currentNamespace=null}function QD(){return pe.lFrame.currentNamespace}var JD=!0;function _u(){return JD}function Cu(n){JD=n}function vm(n,t=null,e=null,i){let r=dg(n,t,e,i);return r.resolveInjectorInitializers(),r}function dg(n,t=null,e=null,i,r=new Set){let o=[e||Ht,ID(n)],s;return new Ro(o,t||Us(),s||null,r)}var re=class n{static THROW_IF_NOT_FOUND=Mo;static NULL=new gl;static create(t,e){if(Array.isArray(t))return vm({name:""},e,t,"");{let i=t.name??"";return vm({name:i},t.parent,t.providers,i)}}static \u0275prov=C({token:n,providedIn:"any",factory:()=>ne(Nm)});static __NG_ELEMENT_ID__=-1},le=new b(""),st=(()=>{class n{static __NG_ELEMENT_ID__=Zk;static __NG_ENV_ID__=e=>e}return n})(),Qd=class extends st{_lView;constructor(t){super(),this._lView=t}get destroyed(){return Bo(this._lView)}onDestroy(t){let e=this._lView;return Km(e,t),()=>LD(e,t)}};function Zk(){return new Qd(Q())}var eE=!1,tE=new b(""),Kr=(()=>{class n{taskId=0;pendingTasks=new Set;destroyed=!1;pendingTask=new rt(!1);debugTaskTracker=f(tE,{optional:!0});get hasPendingTasks(){return this.destroyed?!1:this.pendingTask.value}get hasPendingTasksObservable(){return this.destroyed?new U(e=>{e.next(!1),e.complete()}):this.pendingTask}add(){!this.hasPendingTasks&&!this.destroyed&&this.pendingTask.next(!0);let e=this.taskId++;return this.pendingTasks.add(e),this.debugTaskTracker?.add(e),e}has(e){return this.pendingTasks.has(e)}remove(e){this.pendingTasks.delete(e),this.debugTaskTracker?.remove(e),this.pendingTasks.size===0&&this.hasPendingTasks&&this.pendingTask.next(!1)}ngOnDestroy(){this.pendingTasks.clear(),this.hasPendingTasks&&this.pendingTask.next(!1),this.destroyed=!0,this.pendingTask.unsubscribe()}static \u0275prov=C({token:n,providedIn:"root",factory:()=>new n})}return n})(),bm=class extends D{__isAsync;destroyRef=void 0;pendingTasks=void 0;constructor(t=!1){super(),this.__isAsync=t,AD()&&(this.destroyRef=f(st,{optional:!0})??void 0,this.pendingTasks=f(Kr,{optional:!0})??void 0)}emit(t){let e=B(null);try{super.next(t)}finally{B(e)}}subscribe(t,e,i){let r=t,o=e||(()=>null),s=i;if(t&&typeof t=="object"){let l=t;r=l.next?.bind(l),o=l.error?.bind(l),s=l.complete?.bind(l)}this.__isAsync&&(o=this.wrapInTimeout(o),r&&(r=this.wrapInTimeout(r)),s&&(s=this.wrapInTimeout(s)));let a=super.subscribe({next:r,error:o,complete:s});return t instanceof H&&t.add(a),a}wrapInTimeout(t){return e=>{let i=this.pendingTasks?.add();setTimeout(()=>{try{t(e)}finally{i!==void 0&&this.pendingTasks?.remove(i)}})}}},F=bm;function Jd(...n){}function ug(n){let t,e;function i(){n=Jd;try{e!==void 0&&typeof cancelAnimationFrame=="function"&&cancelAnimationFrame(e),t!==void 0&&clearTimeout(t)}catch{}}return t=setTimeout(()=>{n(),i()}),typeof requestAnimationFrame=="function"&&(e=requestAnimationFrame(()=>{n(),i()})),()=>i()}function nE(n){return queueMicrotask(()=>n()),()=>{n=Jd}}var fg="isAngularZone",vl=fg+"_ID",Xk=0,L=class n{hasPendingMacrotasks=!1;hasPendingMicrotasks=!1;isStable=!0;onUnstable=new F(!1);onMicrotaskEmpty=new F(!1);onStable=new F(!1);onError=new F(!1);constructor(t){let{enableLongStackTrace:e=!1,shouldCoalesceEventChangeDetection:i=!1,shouldCoalesceRunChangeDetection:r=!1,scheduleInRootZone:o=eE}=t;if(typeof Zone>"u")throw new S(908,!1);Zone.assertZonePatched();let s=this;s._nesting=0,s._outer=s._inner=Zone.current,Zone.TaskTrackingZoneSpec&&(s._inner=s._inner.fork(new Zone.TaskTrackingZoneSpec)),e&&Zone.longStackTraceZoneSpec&&(s._inner=s._inner.fork(Zone.longStackTraceZoneSpec)),s.shouldCoalesceEventChangeDetection=!r&&i,s.shouldCoalesceRunChangeDetection=r,s.callbackScheduled=!1,s.scheduleInRootZone=o,eA(s)}static isInAngularZone(){return typeof Zone<"u"&&Zone.current.get(fg)===!0}static assertInAngularZone(){if(!n.isInAngularZone())throw new S(909,!1)}static assertNotInAngularZone(){if(n.isInAngularZone())throw new S(909,!1)}run(t,e,i){return this._inner.run(t,e,i)}runTask(t,e,i,r){let o=this._inner,s=o.scheduleEventTask("NgZoneEvent: "+r,t,Qk,Jd,Jd);try{return o.runTask(s,e,i)}finally{o.cancelTask(s)}}runGuarded(t,e,i){return this._inner.runGuarded(t,e,i)}runOutsideAngular(t){return this._outer.run(t)}},Qk={};function hg(n){if(n._nesting==0&&!n.hasPendingMicrotasks&&!n.isStable)try{n._nesting++,n.onMicrotaskEmpty.emit(null)}finally{if(n._nesting--,!n.hasPendingMicrotasks)try{n.runOutsideAngular(()=>n.onStable.emit(null))}finally{n.isStable=!0}}}function Jk(n){if(n.isCheckStableRunning||n.callbackScheduled)return;n.callbackScheduled=!0;function t(){ug(()=>{n.callbackScheduled=!1,_m(n),n.isCheckStableRunning=!0,hg(n),n.isCheckStableRunning=!1})}n.scheduleInRootZone?Zone.root.run(()=>{t()}):n._outer.run(()=>{t()}),_m(n)}function eA(n){let t=()=>{Jk(n)},e=Xk++;n._inner=n._inner.fork({name:"angular",properties:{[fg]:!0,[vl]:e,[vl+e]:!0},onInvokeTask:(i,r,o,s,a,l)=>{if(tA(l))return i.invokeTask(o,s,a,l);try{return mD(n),i.invokeTask(o,s,a,l)}finally{(n.shouldCoalesceEventChangeDetection&&s.type==="eventTask"||n.shouldCoalesceRunChangeDetection)&&t(),gD(n)}},onInvoke:(i,r,o,s,a,l,c)=>{try{return mD(n),i.invoke(o,s,a,l,c)}finally{n.shouldCoalesceRunChangeDetection&&!n.callbackScheduled&&!nA(l)&&t(),gD(n)}},onHasTask:(i,r,o,s)=>{i.hasTask(o,s),r===o&&(s.change=="microTask"?(n._hasPendingMicrotasks=s.microTask,_m(n),hg(n)):s.change=="macroTask"&&(n.hasPendingMacrotasks=s.macroTask))},onHandleError:(i,r,o,s)=>(i.handleError(o,s),n.runOutsideAngular(()=>n.onError.emit(s)),!1)})}function _m(n){n._hasPendingMicrotasks||(n.shouldCoalesceEventChangeDetection||n.shouldCoalesceRunChangeDetection)&&n.callbackScheduled===!0?n.hasPendingMicrotasks=!0:n.hasPendingMicrotasks=!1}function mD(n){n._nesting++,n.isStable&&(n.isStable=!1,n.onUnstable.emit(null))}function gD(n){n._nesting--,hg(n)}var bl=class{hasPendingMicrotasks=!1;hasPendingMacrotasks=!1;isStable=!0;onUnstable=new F;onMicrotaskEmpty=new F;onStable=new F;onError=new F;run(t,e,i){return t.apply(e,i)}runGuarded(t,e,i){return t.apply(e,i)}runOutsideAngular(t){return t()}runTask(t,e,i,r){return t.apply(e,i)}};function tA(n){return iE(n,"__ignore_ng_zone__")}function nA(n){return iE(n,"__scheduler_tick__")}function iE(n,t){return!Array.isArray(n)||n.length!==1?!1:n[0]?.data?.[t]===!0}var Fn=class{_console=console;handleError(t){this._console.error("ERROR",t)}},Hn=new b("",{factory:()=>{let n=f(L),t=f($e),e;return i=>{n.runOutsideAngular(()=>{t.destroyed&&!e?setTimeout(()=>{throw i}):(e??=t.get(Fn),e.handleError(i))})}}}),rE={provide:Hr,useValue:()=>{let n=f(Fn,{optional:!0})},multi:!0},iA=new b("",{factory:()=>{let n=f(le).defaultView;if(!n)return;let t=f(Hn),e=o=>{t(o.reason),o.preventDefault()},i=o=>{o.error?t(o.error):t(new Error(o.message,{cause:o})),o.preventDefault()},r=()=>{n.addEventListener("unhandledrejection",e),n.addEventListener("error",i)};typeof Zone<"u"?Zone.root.run(r):r(),f(st).onDestroy(()=>{n.removeEventListener("error",i),n.removeEventListener("unhandledrejection",e)})}});function pg(){return rr([TD(()=>{f(iA)})])}function O(n,t){let[e,i,r]=Up(n,t?.equal),o=e,s=o[ct];return o.set=i,o.update=r,o.asReadonly=Du.bind(o),o}function Du(){let n=this[ct];if(n.readonlyFn===void 0){let t=()=>this();t[ct]=n,n.readonlyFn=t}return n.readonlyFn}var Gs=(()=>{class n{view;node;constructor(e,i){this.view=e,this.node=i}static __NG_ELEMENT_ID__=rA}return n})();function rA(){return new Gs(Q(),Nt())}var er=class{},Ml=new b("",{factory:()=>!0});var mg=new b("");var Eu=(()=>{class n{static \u0275prov=C({token:n,providedIn:"root",factory:()=>new Cm})}return n})(),Cm=class{dirtyEffectCount=0;queues=new Map;add(t){this.enqueue(t),this.schedule(t)}schedule(t){t.dirty&&this.dirtyEffectCount++}remove(t){let e=t.zone,i=this.queues.get(e);i.has(t)&&(i.delete(t),t.dirty&&this.dirtyEffectCount--)}enqueue(t){let e=t.zone;this.queues.has(e)||this.queues.set(e,new Set);let i=this.queues.get(e);i.has(t)||i.add(t)}flush(){for(;this.dirtyEffectCount>0;){let t=!1;for(let[e,i]of this.queues)e===null?t||=this.flushQueue(i):t||=e.run(()=>this.flushQueue(i));t||(this.dirtyEffectCount=0)}}flushQueue(t){let e=!1;for(let i of t)i.dirty&&(this.dirtyEffectCount--,e=!0,i.run());return e}},eu=class{[ct];constructor(t){this[ct]=t}destroy(){this[ct].destroy()}};function cr(n,t){let e=t?.injector??f(re),i=t?.manualCleanup!==!0?e.get(st):null,r,o=e.get(Gs,null,{optional:!0}),s=e.get(er);return o!==null?(r=aA(o.view,s,n),i instanceof Qd&&i._lView===o.view&&(i=null)):r=lA(n,e.get(Eu),s),r.injector=e,i!==null&&(r.onDestroyFns=[i.onDestroy(()=>r.destroy())]),new eu(r)}var oE=V(g({},Hp),{cleanupFns:void 0,zone:null,onDestroyFns:null,run(){let n=yl(!1);try{$p(this)}finally{yl(n)}},cleanup(){if(!this.cleanupFns?.length)return;let n=B(null);try{for(;this.cleanupFns.length;)this.cleanupFns.pop()()}finally{this.cleanupFns=[],B(n)}}}),oA=V(g({},oE),{consumerMarkedDirty(){this.scheduler.schedule(this),this.notifier.notify(12)},destroy(){if(Or(this),this.onDestroyFns!==null)for(let n of this.onDestroyFns)n();this.cleanup(),this.scheduler.remove(this)}}),sA=V(g({},oE),{consumerMarkedDirty(){this.view[ie]|=8192,jo(this.view),this.notifier.notify(13)},destroy(){if(Or(this),this.onDestroyFns!==null)for(let n of this.onDestroyFns)n();this.cleanup(),this.view[Br]?.delete(this)}});function aA(n,t,e){let i=Object.create(sA);return i.view=n,i.zone=typeof Zone<"u"?Zone.current:null,i.notifier=t,i.fn=sE(i,e),n[Br]??=new Set,n[Br].add(i),i.consumerMarkedDirty(i),i}function lA(n,t,e){let i=Object.create(oA);return i.fn=sE(i,n),i.scheduler=t,i.notifier=e,i.zone=typeof Zone<"u"?Zone.current:null,i.scheduler.add(i),i.notifier.notify(12),i}function sE(n,t){return()=>{t(e=>(n.cleanupFns??=[]).push(e))}}function jl(n){return{toString:n}.toString()}function mA(n){return typeof n=="function"}function UE(n,t,e,i){t!==null?t.applyValueToInputSignal(t,i):n[e]=i}var Ou=class{previousValue;currentValue;firstChange;constructor(t,e,i){this.previousValue=t,this.currentValue=e,this.firstChange=i}isFirstChange(){return this.firstChange}},It=(()=>{let n=()=>HE;return n.ngInherit=!0,n})();function HE(n){return n.type.prototype.ngOnChanges&&(n.setInput=yA),gA}function gA(){let n=zE(this),t=n?.current;if(t){let e=n.previous;if(e===Ur)n.previous=t;else for(let i in t)e[i]=t[i];n.current=null,this.ngOnChanges(t)}}function yA(n,t,e,i,r){let o=this.declaredInputs[i],s=zE(n)||vA(n,{previous:Ur,current:null}),a=s.current||(s.current={}),l=s.previous,c=l[o];a[o]=new Ou(c&&c.currentValue,e,l===Ur),UE(n,t,r,e)}var $E="__ngSimpleChanges__";function zE(n){return n[$E]||null}function vA(n,t){return n[$E]=t}var aE=[];var Pe=function(n,t=null,e){for(let i=0;i<aE.length;i++){let r=aE[i];r(n,t,e)}},Se=(function(n){return n[n.TemplateCreateStart=0]="TemplateCreateStart",n[n.TemplateCreateEnd=1]="TemplateCreateEnd",n[n.TemplateUpdateStart=2]="TemplateUpdateStart",n[n.TemplateUpdateEnd=3]="TemplateUpdateEnd",n[n.LifecycleHookStart=4]="LifecycleHookStart",n[n.LifecycleHookEnd=5]="LifecycleHookEnd",n[n.OutputStart=6]="OutputStart",n[n.OutputEnd=7]="OutputEnd",n[n.BootstrapApplicationStart=8]="BootstrapApplicationStart",n[n.BootstrapApplicationEnd=9]="BootstrapApplicationEnd",n[n.BootstrapComponentStart=10]="BootstrapComponentStart",n[n.BootstrapComponentEnd=11]="BootstrapComponentEnd",n[n.ChangeDetectionStart=12]="ChangeDetectionStart",n[n.ChangeDetectionEnd=13]="ChangeDetectionEnd",n[n.ChangeDetectionSyncStart=14]="ChangeDetectionSyncStart",n[n.ChangeDetectionSyncEnd=15]="ChangeDetectionSyncEnd",n[n.AfterRenderHooksStart=16]="AfterRenderHooksStart",n[n.AfterRenderHooksEnd=17]="AfterRenderHooksEnd",n[n.ComponentStart=18]="ComponentStart",n[n.ComponentEnd=19]="ComponentEnd",n[n.DeferBlockStateStart=20]="DeferBlockStateStart",n[n.DeferBlockStateEnd=21]="DeferBlockStateEnd",n[n.DynamicComponentStart=22]="DynamicComponentStart",n[n.DynamicComponentEnd=23]="DynamicComponentEnd",n[n.HostBindingsUpdateStart=24]="HostBindingsUpdateStart",n[n.HostBindingsUpdateEnd=25]="HostBindingsUpdateEnd",n})(Se||{});function bA(n,t,e){let{ngOnChanges:i,ngOnInit:r,ngDoCheck:o}=t.type.prototype;if(i){let s=HE(t);(e.preOrderHooks??=[]).push(n,s),(e.preOrderCheckHooks??=[]).push(n,s)}r&&(e.preOrderHooks??=[]).push(0-n,r),o&&((e.preOrderHooks??=[]).push(n,o),(e.preOrderCheckHooks??=[]).push(n,o))}function WE(n,t){for(let e=t.directiveStart,i=t.directiveEnd;e<i;e++){let o=n.data[e].type.prototype,{ngAfterContentInit:s,ngAfterContentChecked:a,ngAfterViewInit:l,ngAfterViewChecked:c,ngOnDestroy:d}=o;s&&(n.contentHooks??=[]).push(-e,s),a&&((n.contentHooks??=[]).push(e,a),(n.contentCheckHooks??=[]).push(e,a)),l&&(n.viewHooks??=[]).push(-e,l),c&&((n.viewHooks??=[]).push(e,c),(n.viewCheckHooks??=[]).push(e,c)),d!=null&&(n.destroyHooks??=[]).push(e,d)}}function xu(n,t,e){GE(n,t,3,e)}function Mu(n,t,e,i){(n[ie]&3)===e&&GE(n,t,e,i)}function gg(n,t){let e=n[ie];(e&3)===t&&(e&=16383,e+=1,n[ie]=e)}function GE(n,t,e,i){let r=i!==void 0?n[Fo]&65535:0,o=i??-1,s=t.length-1,a=0;for(let l=r;l<s;l++)if(typeof t[l+1]=="number"){if(a=t[l],i!=null&&a>=i)break}else t[l]<0&&(n[Fo]+=65536),(a<o||o==-1)&&(_A(n,e,t,l),n[Fo]=(n[Fo]&4294901760)+l+2),l++}function lE(n,t){Pe(Se.LifecycleHookStart,n,t);let e=B(null);try{t.call(n)}finally{B(e),Pe(Se.LifecycleHookEnd,n,t)}}function _A(n,t,e,i){let r=e[i]<0,o=e[i+1],s=r?-e[i]:e[i],a=n[s];r?n[ie]>>14<n[Fo]>>16&&(n[ie]&3)===t&&(n[ie]+=16384,lE(a,o)):lE(a,o)}var Ks=-1,Ho=class{factory;name;injectImpl;resolving=!1;canSeeViewProviders;multi;componentProviders;index;providerFactory;constructor(t,e,i,r){this.factory=t,this.name=r,this.canSeeViewProviders=e,this.injectImpl=i}};function CA(n){return(n.flags&8)!==0}function DA(n){return(n.flags&16)!==0}function EA(n,t,e){let i=0;for(;i<e.length;){let r=e[i];if(typeof r=="number"){if(r!==0)break;i++;let o=e[i++],s=e[i++],a=e[i++];n.setAttribute(t,s,a,o)}else{let o=r,s=e[++i];wA(o)?n.setProperty(t,o,s):n.setAttribute(t,o,s),i++}}return i}function qE(n){return n===3||n===4||n===6}function wA(n){return n.charCodeAt(0)===64}function Ys(n,t){if(!(t===null||t.length===0))if(n===null||n.length===0)n=t.slice();else{let e=-1;for(let i=0;i<t.length;i++){let r=t[i];typeof r=="number"?e=r:e===0||(e===-1||e===2?cE(n,e,r,null,t[++i]):cE(n,e,r,null,null))}}return n}function cE(n,t,e,i,r){let o=0,s=n.length;if(t===-1)s=-1;else for(;o<n.length;){let a=n[o++];if(typeof a=="number"){if(a===t){s=-1;break}else if(a>t){s=o-1;break}}}for(;o<n.length;){let a=n[o];if(typeof a=="number")break;if(a===e){r!==null&&(n[o+1]=r);return}o++,r!==null&&o++}s!==-1&&(n.splice(s,0,t),o=s+1),n.splice(o++,0,e),r!==null&&n.splice(o++,0,r)}function KE(n){return n!==Ks}function Nu(n){return n&32767}function SA(n){return n>>16}function Pu(n,t){let e=SA(n),i=t;for(;e>0;)i=i[Po],e--;return i}var Ig=!0;function Fu(n){let t=Ig;return Ig=n,t}var TA=256,YE=TA-1,ZE=5,IA=0,Ni={};function xA(n,t,e){let i;typeof e=="string"?i=e.charCodeAt(0)||0:e.hasOwnProperty(Oo)&&(i=e[Oo]),i==null&&(i=e[Oo]=IA++);let r=i&YE,o=1<<r;t.data[n+(r>>ZE)]|=o}function Lu(n,t){let e=XE(n,t);if(e!==-1)return e;let i=t[$];i.firstCreatePass&&(n.injectorIndex=t.length,yg(i.data,n),yg(t,null),yg(i.blueprint,null));let r=dy(n,t),o=n.injectorIndex;if(KE(r)){let s=Nu(r),a=Pu(r,t),l=a[$].data;for(let c=0;c<8;c++)t[o+c]=a[s+c]|l[s+c]}return t[o+8]=r,o}function yg(n,t){n.push(0,0,0,0,0,0,0,0,t)}function XE(n,t){return n.injectorIndex===-1||n.parent&&n.parent.injectorIndex===n.injectorIndex||t[n.injectorIndex+8]===null?-1:n.injectorIndex}function dy(n,t){if(n.parent&&n.parent.injectorIndex!==-1)return n.parent.injectorIndex;let e=0,i=null,r=t;for(;r!==null;){if(i=nw(r),i===null)return Ks;if(e++,r=r[Po],i.injectorIndex!==-1)return i.injectorIndex|e<<16}return Ks}function xg(n,t,e){xA(n,t,e)}function MA(n,t){if(t==="class")return n.classes;if(t==="style")return n.styles;let e=n.attrs;if(e){let i=e.length,r=0;for(;r<i;){let o=e[r];if(qE(o))break;if(o===0)r=r+2;else if(typeof o=="number")for(r++;r<i&&typeof e[r]=="string";)r++;else{if(o===t)return e[r+1];r=r+2}}}return null}function QE(n,t,e){if(e&8||n!==void 0)return n;su(t,"NodeInjector")}function JE(n,t,e,i){if(e&8&&i===void 0&&(i=null),(e&3)===0){let r=n[or],o=Jt(void 0);try{return r?r.get(t,i,e&8):Rm(t,i,e&8)}finally{Jt(o)}}return QE(i,t,e)}function ew(n,t,e,i=0,r){if(n!==null){if(t[ie]&2048&&!(i&2)){let s=OA(n,t,e,i,Ni);if(s!==Ni)return s}let o=tw(n,t,e,i,Ni);if(o!==Ni)return o}return JE(t,e,i,r)}function tw(n,t,e,i,r){let o=AA(e);if(typeof o=="function"){if(!lg(t,n,i))return i&1?QE(r,e,i):JE(t,e,i,r);try{let s;if(s=o(i),s==null&&!(i&8))su(e);else return s}finally{cg()}}else if(typeof o=="number"){let s=null,a=XE(n,t),l=Ks,c=i&1?t[tn][en]:null;for((a===-1||i&4)&&(l=a===-1?dy(n,t):t[a+8],l===Ks||!uE(i,!1)?a=-1:(s=t[$],a=Nu(l),t=Pu(l,t)));a!==-1;){let d=t[$];if(dE(o,a,d.data)){let u=kA(a,t,e,s,i,c);if(u!==Ni)return u}l=t[a+8],l!==Ks&&uE(i,t[$].data[a+8]===c)&&dE(o,a,t)?(s=d,a=Nu(l),t=Pu(l,t)):a=-1}}return r}function kA(n,t,e,i,r,o){let s=t[$],a=s.data[n+8],l=i==null?Ri(a)&&Ig:i!=s&&(a.type&3)!==0,c=r&1&&o===a,d=ku(a,s,e,l,c);return d!==null?Nl(t,s,d,a,r):Ni}function ku(n,t,e,i,r){let o=n.providerIndexes,s=t.data,a=o&1048575,l=n.directiveStart,c=n.directiveEnd,d=o>>20,u=i?a:a+d,h=r?a+d:c;for(let p=u;p<h;p++){let m=s[p];if(p<l&&e===m||p>=l&&m.type===e)return p}if(r){let p=s[l];if(p&&Oi(p)&&p.type===e)return l}return null}function Nl(n,t,e,i,r){let o=n[e],s=t.data;if(o instanceof Ho){let a=o;if(a.resolving)throw Am("");let l=Fu(a.canSeeViewProviders);a.resolving=!0;let c=s[e].type||s[e],d,u=a.injectImpl?Jt(a.injectImpl):null,h=lg(n,i,0);try{o=n[e]=a.factory(void 0,r,s,n,i),t.firstCreatePass&&e>=i.directiveStart&&bA(e,s[e],t)}finally{u!==null&&Jt(u),Fu(l),a.resolving=!1,cg()}}return o}function AA(n){if(typeof n=="string")return n.charCodeAt(0)||0;let t=n.hasOwnProperty(Oo)?n[Oo]:void 0;return typeof t=="number"?t>=0?t&YE:RA:t}function dE(n,t,e){let i=1<<n;return!!(e[t+(n>>ZE)]&i)}function uE(n,t){return!(n&2)&&!(n&1&&t)}var Uo=class{_tNode;_lView;constructor(t,e){this._tNode=t,this._lView=e}get(t,e,i){return ew(this._tNode,this._lView,t,ko(i),e)}};function RA(){return new Uo(Nt(),Q())}function hn(n){return jl(()=>{let t=n.prototype.constructor,e=t[ml]||Mg(t),i=Object.prototype,r=Object.getPrototypeOf(n.prototype).constructor;for(;r&&r!==i;){let o=r[ml]||Mg(r);if(o&&o!==e)return o;r=Object.getPrototypeOf(r)}return o=>new o})}function Mg(n){return Dm(n)?()=>{let t=Mg(Ot(n));return t&&t()}:Vr(n)}function OA(n,t,e,i,r){let o=n,s=t;for(;o!==null&&s!==null&&s[ie]&2048&&!zs(s);){let a=tw(o,s,e,i|2,Ni);if(a!==Ni)return a;let l=o.parent;if(!l){let c=s[jm];if(c){let d=c.get(e,Ni,i&-5);if(d!==Ni)return d}l=nw(s),s=s[Po]}o=l}return r}function nw(n){let t=n[$],e=t.type;return e===2?t.declTNode:e===1?n[en]:null}function Ul(n){return MA(Nt(),n)}function NA(){return ea(Nt(),Q())}function ea(n,t){return new z(jn(n,t))}var z=(()=>{class n{nativeElement;constructor(e){this.nativeElement=e}static __NG_ELEMENT_ID__=NA}return n})();function iw(n){return n instanceof z?n.nativeElement:n}function PA(){return this._results[Symbol.iterator]()}var ui=class{_emitDistinctChangesOnly;dirty=!0;_onDirty=void 0;_results=[];_changesDetected=!1;_changes=void 0;length=0;first=void 0;last=void 0;get changes(){return this._changes??=new D}constructor(t=!1){this._emitDistinctChangesOnly=t}get(t){return this._results[t]}map(t){return this._results.map(t)}filter(t){return this._results.filter(t)}find(t){return this._results.find(t)}reduce(t,e){return this._results.reduce(t,e)}forEach(t){this._results.forEach(t)}some(t){return this._results.some(t)}toArray(){return this._results.slice()}toString(){return this._results.toString()}reset(t,e){this.dirty=!1;let i=ED(t);(this._changesDetected=!DD(this._results,i,e))&&(this._results=i,this.length=i.length,this.last=i[this.length-1],this.first=i[0])}notifyOnChanges(){this._changes!==void 0&&(this._changesDetected||!this._emitDistinctChangesOnly)&&this._changes.next(this)}onDirty(t){this._onDirty=t}setDirty(){this.dirty=!0,this._onDirty?.()}destroy(){this._changes!==void 0&&(this._changes.complete(),this._changes.unsubscribe())}[Symbol.iterator]=PA};function rw(n){return(n.flags&128)===128}var uy=(function(n){return n[n.OnPush=0]="OnPush",n[n.Eager=1]="Eager",n[n.Default=1]="Default",n})(uy||{}),ow=new Map,FA=0;function LA(){return FA++}function VA(n){ow.set(n[sr],n)}function kg(n){ow.delete(n[sr])}var fE="__ngContext__";function Zs(n,t){ar(t)?(n[fE]=t[sr],VA(t)):n[fE]=t}function sw(n){return lw(n[$s])}function aw(n){return lw(n[Vn])}function lw(n){for(;n!==null&&!ai(n);)n=n[Vn];return n}var BA;function fy(n){BA=n}var Zr=new b("",{factory:()=>jA}),jA="ng";var Zu=new b(""),Go=new b("",{providedIn:"platform",factory:()=>"unknown"}),Hl=new b(""),ta=new b("",{factory:()=>f(le).body?.querySelector("[ngCspNonce]")?.getAttribute("ngCspNonce")||null});var cw="r";var dw="di";var uw=!1,fw=new b("",{factory:()=>uw});var hE=new WeakMap;function UA(n,t){if(n==null||typeof n!="object")return;let e=hE.get(n);e||(e=new WeakSet,hE.set(n,e)),e.add(t)}var HA=(n,t,e,i)=>{};function $A(n,t,e,i){HA(n,t,e,i)}function Xu(n){return(n.flags&32)===32}var zA=()=>null;function hw(n,t,e=!1){return zA(n,t,e)}function pw(n,t){let e=n.contentQueries;if(e!==null){let i=B(null);try{for(let r=0;r<e.length;r+=2){let o=e[r],s=e[r+1];if(s!==-1){let a=n.data[s];Il(o),a.contentQueries(2,t[s],s)}}}finally{B(i)}}}function Ag(n,t,e){Il(0);let i=B(null);try{t(n,e)}finally{B(i)}}function mw(n,t,e){if(Hm(t)){let i=B(null);try{let r=t.directiveStart,o=t.directiveEnd;for(let s=r;s<o;s++){let a=n.data[s];if(a.contentQueries){let l=e[s];a.contentQueries(1,l,s)}}}finally{B(i)}}}var fi=(function(n){return n[n.Emulated=0]="Emulated",n[n.None=2]="None",n[n.ShadowDom=3]="ShadowDom",n[n.ExperimentalIsolatedShadowDom=4]="ExperimentalIsolatedShadowDom",n})(fi||{});var wu;function WA(){if(wu===void 0&&(wu=null,Ln.trustedTypes))try{wu=Ln.trustedTypes.createPolicy("angular",{createHTML:n=>n,createScript:n=>n,createScriptURL:n=>n})}catch{}return wu}function Qu(n){return WA()?.createHTML(n)||n}var Su;function GA(){if(Su===void 0&&(Su=null,Ln.trustedTypes))try{Su=Ln.trustedTypes.createPolicy("angular#unsafe-bypass",{createHTML:n=>n,createScript:n=>n,createScriptURL:n=>n})}catch{}return Su}function pE(n){return GA()?.createScriptURL(n)||n}var dr=class{changingThisBreaksApplicationSecurity;constructor(t){this.changingThisBreaksApplicationSecurity=t}toString(){return`SafeValue must use [property]=binding: ${this.changingThisBreaksApplicationSecurity} (see ${tu})`}},Rg=class extends dr{getTypeName(){return"HTML"}},Og=class extends dr{getTypeName(){return"Style"}},Ng=class extends dr{getTypeName(){return"Script"}},Pg=class extends dr{getTypeName(){return"URL"}},Fg=class extends dr{getTypeName(){return"ResourceURL"}};function hi(n){return n instanceof dr?n.changingThisBreaksApplicationSecurity:n}function ur(n,t){let e=gw(n);if(e!=null&&e!==t){if(e==="ResourceURL"&&t==="URL")return!0;throw new Error(`Required a safe ${t}, got a ${e} (see ${tu})`)}return e===t}function gw(n){return n instanceof dr&&n.getTypeName()||null}function hy(n){return new Rg(n)}function py(n){return new Og(n)}function my(n){return new Ng(n)}function gy(n){return new Pg(n)}function yy(n){return new Fg(n)}function qA(n){let t=new Vg(n);return KA()?new Lg(t):t}var Lg=class{inertDocumentHelper;constructor(t){this.inertDocumentHelper=t}getInertBodyElement(t){t="<body><remove></remove>"+t;try{let e=new window.DOMParser().parseFromString(Qu(t),"text/html").body;return e===null?this.inertDocumentHelper.getInertBodyElement(t):(e.firstChild?.remove(),e)}catch{return null}}},Vg=class{defaultDoc;inertDocument;constructor(t){this.defaultDoc=t,this.inertDocument=this.defaultDoc.implementation.createHTMLDocument("sanitization-inert")}getInertBodyElement(t){let e=this.inertDocument.createElement("template");return e.innerHTML=Qu(t),e}};function KA(){try{return!!new window.DOMParser().parseFromString(Qu(""),"text/html")}catch{return!1}}var YA=/^(?!javascript:)(?:[a-z0-9+.-]+:|[^&:\/?#]*(?:[\/?#]|$))/i;function $l(n){return n=String(n),n.match(YA)?n:"unsafe:"+n}function fr(n){let t={};for(let e of n.split(","))t[e]=!0;return t}function zl(...n){let t={};for(let e of n)for(let i in e)e.hasOwnProperty(i)&&(t[i]=!0);return t}var yw=fr("area,br,col,hr,img,wbr"),vw=fr("colgroup,dd,dt,li,p,tbody,td,tfoot,th,thead,tr"),bw=fr("rp,rt"),ZA=zl(bw,vw),XA=zl(vw,fr("address,article,aside,blockquote,caption,center,del,details,dialog,dir,div,dl,figure,figcaption,footer,h1,h2,h3,h4,h5,h6,header,hgroup,hr,ins,main,map,menu,nav,ol,pre,section,summary,table,ul")),QA=zl(bw,fr("a,abbr,acronym,audio,b,bdi,bdo,big,br,cite,code,del,dfn,em,font,i,img,ins,kbd,label,map,mark,picture,q,ruby,rp,rt,s,samp,small,source,span,strike,strong,sub,sup,time,track,tt,u,var,video")),mE=zl(yw,XA,QA,ZA),_w=fr("background,cite,href,itemtype,longdesc,poster,src,xlink:href"),JA=fr("abbr,accesskey,align,alt,autoplay,axis,bgcolor,border,cellpadding,cellspacing,class,clear,color,cols,colspan,compact,controls,coords,datetime,default,dir,download,face,headers,height,hidden,hreflang,hspace,ismap,itemscope,itemprop,kind,label,lang,language,loop,media,muted,nohref,nowrap,open,preload,rel,rev,role,rows,rowspan,rules,scope,scrolling,shape,size,sizes,span,srclang,srcset,start,summary,tabindex,target,title,translate,type,usemap,valign,value,vspace,width"),eR=fr("aria-activedescendant,aria-atomic,aria-autocomplete,aria-busy,aria-checked,aria-colcount,aria-colindex,aria-colspan,aria-controls,aria-current,aria-describedby,aria-details,aria-disabled,aria-dropeffect,aria-errormessage,aria-expanded,aria-flowto,aria-grabbed,aria-haspopup,aria-hidden,aria-invalid,aria-keyshortcuts,aria-label,aria-labelledby,aria-level,aria-live,aria-modal,aria-multiline,aria-multiselectable,aria-orientation,aria-owns,aria-placeholder,aria-posinset,aria-pressed,aria-readonly,aria-relevant,aria-required,aria-roledescription,aria-rowcount,aria-rowindex,aria-rowspan,aria-selected,aria-setsize,aria-sort,aria-valuemax,aria-valuemin,aria-valuenow,aria-valuetext"),tR=zl(_w,JA,eR),nR=fr("script,style,template");var Bg=class{sanitizedSomething=!1;buf=[];sanitizeChildren(t){let e=t.firstChild,i=!0,r=[];for(;e;){if(e.nodeType===Node.ELEMENT_NODE?i=this.startElement(e):e.nodeType===Node.TEXT_NODE?this.chars(e.nodeValue):this.sanitizedSomething=!0,i&&e.firstChild){r.push(e),e=oR(e);continue}for(;e;){e.nodeType===Node.ELEMENT_NODE&&this.endElement(e);let o=rR(e);if(o){e=o;break}e=r.pop()}}return this.buf.join("")}startElement(t){let e=gE(t).toLowerCase();if(!mE.hasOwnProperty(e))return this.sanitizedSomething=!0,!nR.hasOwnProperty(e);this.buf.push("<"),this.buf.push(e);let i=t.attributes;for(let r=0;r<i.length;r++){let o=i.item(r),s=o.name,a=s.toLowerCase();if(!tR.hasOwnProperty(a)){this.sanitizedSomething=!0;continue}let l=o.value;_w[a]&&(l=$l(l)),this.buf.push(" ",s,'="',yE(l),'"')}return this.buf.push(">"),!0}endElement(t){let e=gE(t).toLowerCase();mE.hasOwnProperty(e)&&!yw.hasOwnProperty(e)&&(this.buf.push("</"),this.buf.push(e),this.buf.push(">"))}chars(t){this.buf.push(yE(t))}};function iR(n,t){return(n.compareDocumentPosition(t)&Node.DOCUMENT_POSITION_CONTAINED_BY)!==Node.DOCUMENT_POSITION_CONTAINED_BY}function rR(n){let t=n.nextSibling;if(t&&n!==t.previousSibling)throw Cw(t);return t}function oR(n){let t=n.firstChild;if(t&&iR(n,t))throw Cw(t);return t}function gE(n){let t=n.nodeName;return typeof t=="string"?t:"FORM"}function Cw(n){return new Error(`Failed to sanitize html because the element is clobbered: ${n.outerHTML}`)}var sR=/[\uD800-\uDBFF][\uDC00-\uDFFF]/g,aR=/([^\#-~ |!])/g;function yE(n){return n.replace(/&/g,"&amp;").replace(sR,function(t){let e=t.charCodeAt(0),i=t.charCodeAt(1);return"&#"+((e-55296)*1024+(i-56320)+65536)+";"}).replace(aR,function(t){return"&#"+t.charCodeAt(0)+";"}).replace(/</g,"&lt;").replace(/>/g,"&gt;")}var Tu;function vy(n,t){let e=null;try{Tu=Tu||qA(n);let i=t?String(t):"";e=Tu.getInertBodyElement(i);let r=5,o=i;do{if(r===0)throw new Error("Failed to sanitize html because the input is unstable");r--,i=o,o=e.innerHTML,e=Tu.getInertBodyElement(i)}while(i!==o);let a=new Bg().sanitizeChildren(vE(e)||e);return Qu(a)}finally{if(e){let i=vE(e)||e;for(;i.firstChild;)i.firstChild.remove()}}}function vE(n){return"content"in n&&lR(n)?n.content:null}function lR(n){return n.nodeType===Node.ELEMENT_NODE&&n.nodeName==="TEMPLATE"}function cR(n,t){return n.createText(t)}function dR(n,t,e){n.setValue(t,e)}function Dw(n,t,e){return n.createElement(t,e)}function Vu(n,t,e,i,r){n.insertBefore(t,e,i,r)}function Ew(n,t,e){n.appendChild(t,e)}function bE(n,t,e,i,r){i!==null?Vu(n,t,e,i,r):Ew(n,t,e)}function ww(n,t,e,i){n.removeChild(null,t,e,i)}function uR(n,t,e){n.setAttribute(t,"style",e)}function fR(n,t,e){e===""?n.removeAttribute(t,"class"):n.setAttribute(t,"class",e)}function Sw(n,t,e){let{mergedAttrs:i,classes:r,styles:o}=e;i!==null&&EA(n,t,i),r!==null&&fR(n,t,r),o!==null&&uR(n,t,o)}var Tn=(function(n){return n[n.NONE=0]="NONE",n[n.HTML=1]="HTML",n[n.STYLE=2]="STYLE",n[n.SCRIPT=3]="SCRIPT",n[n.URL=4]="URL",n[n.RESOURCE_URL=5]="RESOURCE_URL",n})(Tn||{});function Tw(n){let t=xw();return t?t.sanitize(Tn.URL,n)||"":ur(n,"URL")?hi(n):$l(ou(n))}function Iw(n){let t=xw();if(t)return pE(t.sanitize(Tn.RESOURCE_URL,n)||"");if(ur(n,"ResourceURL"))return pE(hi(n));throw new S(904,!1)}var hR={embed:{src:!0},frame:{src:!0},iframe:{src:!0},media:{src:!0},script:{src:!0,href:!0,"xlink:href":!0},base:{href:!0},link:{href:!0},object:{data:!0,codebase:!0}};function pR(n,t){return hR[n]?.[t]===!0?Iw:Tw}function by(n,t,e){return pR(t,e)(n)}function xw(){let n=Q();return n&&n[si].sanitizer}function Mw(n){return n instanceof Function?n():n}function mR(n,t,e){let i=n.length;for(;;){let r=n.indexOf(t,e);if(r===-1)return r;if(r===0||n.charCodeAt(r-1)<=32){let o=t.length;if(r+o===i||n.charCodeAt(r+o)<=32)return r}e=r+1}}var kw="ng-template";function gR(n,t,e,i){let r=0;if(i){for(;r<t.length&&typeof t[r]=="string";r+=2)if(t[r]==="class"&&mR(t[r+1].toLowerCase(),e,0)!==-1)return!0}else if(_y(n))return!1;if(r=t.indexOf(1,r),r>-1){let o;for(;++r<t.length&&typeof(o=t[r])=="string";)if(o.toLowerCase()===e)return!0}return!1}function _y(n){return n.type===4&&n.value!==kw}function yR(n,t,e){let i=n.type===4&&!e?kw:n.value;return t===i}function vR(n,t,e){let i=4,r=n.attrs,o=r!==null?CR(r):0,s=!1;for(let a=0;a<t.length;a++){let l=t[a];if(typeof l=="number"){if(!s&&!ci(i)&&!ci(l))return!1;if(s&&ci(l))continue;s=!1,i=l|i&1;continue}if(!s)if(i&4){if(i=2|i&1,l!==""&&!yR(n,l,e)||l===""&&t.length===1){if(ci(i))return!1;s=!0}}else if(i&8){if(r===null||!gR(n,r,l,e)){if(ci(i))return!1;s=!0}}else{let c=t[++a],d=bR(l,r,_y(n),e);if(d===-1){if(ci(i))return!1;s=!0;continue}if(c!==""){let u;if(d>o?u="":u=r[d+1].toLowerCase(),i&2&&c!==u){if(ci(i))return!1;s=!0}}}}return ci(i)||s}function ci(n){return(n&1)===0}function bR(n,t,e,i){if(t===null)return-1;let r=0;if(i||!e){let o=!1;for(;r<t.length;){let s=t[r];if(s===n)return r;if(s===3||s===6)o=!0;else if(s===1||s===2){let a=t[++r];for(;typeof a=="string";)a=t[++r];continue}else{if(s===4)break;if(s===0){r+=4;continue}}r+=o?1:2}return-1}else return DR(t,n)}function Aw(n,t,e=!1){for(let i=0;i<t.length;i++)if(vR(n,t[i],e))return!0;return!1}function _R(n){let t=n.attrs;if(t!=null){let e=t.indexOf(5);if((e&1)===0)return t[e+1]}return null}function CR(n){for(let t=0;t<n.length;t++){let e=n[t];if(qE(e))return t}return n.length}function DR(n,t){let e=n.indexOf(4);if(e>-1)for(e++;e<n.length;){let i=n[e];if(typeof i=="number")return-1;if(i===t)return e;e++}return-1}function ER(n,t){e:for(let e=0;e<t.length;e++){let i=t[e];if(n.length===i.length){for(let r=0;r<n.length;r++)if(n[r]!==i[r])continue e;return!0}}return!1}function _E(n,t){return n?":not("+t.trim()+")":t}function wR(n){let t=n[0],e=1,i=2,r="",o=!1;for(;e<n.length;){let s=n[e];if(typeof s=="string")if(i&2){let a=n[++e];r+="["+s+(a.length>0?'="'+a+'"':"")+"]"}else i&8?r+="."+s:i&4&&(r+=" "+s);else r!==""&&!ci(s)&&(t+=_E(o,r),r=""),i=s,o=o||!ci(i);e++}return r!==""&&(t+=_E(o,r)),t}function SR(n){return n.map(wR).join(",")}function TR(n){let t=[],e=[],i=1,r=2;for(;i<n.length;){let o=n[i];if(typeof o=="string")r===2?o!==""&&t.push(o,n[++i]):r===8&&e.push(o);else{if(!ci(r))break;r=o}i++}return e.length&&t.push(1,...e),t}var zn={};function Cy(n,t,e,i,r,o,s,a,l,c,d){let u=Xe+i,h=u+r,p=IR(u,h),m=typeof c=="function"?c():c;return p[$]={type:n,blueprint:p,template:e,queries:null,viewQuery:a,declTNode:t,data:p.slice().fill(null,u),bindingStartIndex:u,expandoStartIndex:h,hostBindingOpCodes:null,firstCreatePass:!0,firstUpdatePass:!0,staticViewQueries:!1,staticContentQueries:!1,preOrderHooks:null,preOrderCheckHooks:null,contentHooks:null,contentCheckHooks:null,viewHooks:null,viewCheckHooks:null,destroyHooks:null,cleanup:null,contentQueries:null,components:null,directiveRegistry:typeof o=="function"?o():o,pipeRegistry:typeof s=="function"?s():s,firstChild:null,schemas:l,consts:m,incompleteFirstPass:!1,ssrId:d}}function IR(n,t){let e=[];for(let i=0;i<t;i++)e.push(i<n?null:zn);return e}function xR(n){let t=n.tView;return t===null||t.incompleteFirstPass?n.tView=Cy(1,null,n.template,n.decls,n.vars,n.directiveDefs,n.pipeDefs,n.viewQuery,n.schemas,n.consts,n.id):t}function Dy(n,t,e,i,r,o,s,a,l,c,d){let u=t.blueprint.slice();return u[oi]=r,u[ie]=i|4|128|8|64|1024,(c!==null||n&&n[ie]&2048)&&(u[ie]|=2048),Gm(u),u[Et]=u[Po]=n,u[ft]=e,u[si]=s||n&&n[si],u[ze]=a||n&&n[ze],u[or]=l||n&&n[or]||null,u[en]=o,u[sr]=LA(),u[No]=d,u[jm]=c,u[tn]=t.type==2?n[tn]:u,u}function MR(n,t,e){let i=jn(t,n),r=xR(e),o=n[si].rendererFactory,s=Ey(n,Dy(n,r,null,Rw(e),i,t,null,o.createRenderer(i,e),null,null,null));return n[t.index]=s}function Rw(n){let t=16;return n.signals?t=4096:n.onPush&&(t=64),t}function Ow(n,t,e,i){if(e===0)return-1;let r=t.length;for(let o=0;o<e;o++)t.push(i),n.blueprint.push(i),n.data.push(null);return r}function Ey(n,t){return n[$s]?n[Bm][Vn]=t:n[$s]=t,n[Bm]=t,t}function _(n=1){Nw(Qe(),Q(),lr()+n,!1)}function Nw(n,t,e,i){if(!i)if((t[ie]&3)===3){let o=n.preOrderCheckHooks;o!==null&&xu(t,o,e)}else{let o=n.preOrderHooks;o!==null&&Mu(t,o,0,e)}qr(e)}var Ju=(function(n){return n[n.None=0]="None",n[n.SignalBased=1]="SignalBased",n[n.HasDecoratorInputTransform=2]="HasDecoratorInputTransform",n})(Ju||{});function jg(n,t,e,i){let r=B(null);try{let[o,s,a]=n.inputs[e],l=null;(s&Ju.SignalBased)!==0&&(l=t[o][ct]),l!==null&&l.transformFn!==void 0?i=l.transformFn(i):a!==null&&(i=a.call(t,i)),n.setInput!==null?n.setInput(t,l,i,e,o):UE(t,l,o,i)}finally{B(r)}}var Pi=(function(n){return n[n.Important=1]="Important",n[n.DashCase=2]="DashCase",n})(Pi||{}),kR;function wy(n,t){return kR(n,t)}var R5=typeof document<"u"&&typeof document?.documentElement?.getAnimations=="function";var Ug=new WeakMap,Al=new WeakSet;function AR(n,t){let e=Ug.get(n);if(!e||e.length===0)return;let i=t.parentNode,r=t.previousSibling;for(let o=e.length-1;o>=0;o--){let s=e[o],a=s.parentNode;s===t?(e.splice(o,1),Al.add(s),s.dispatchEvent(new CustomEvent("animationend",{detail:{cancel:!0}}))):(r&&s===r||a&&i&&a!==i)&&(e.splice(o,1),s.dispatchEvent(new CustomEvent("animationend",{detail:{cancel:!0}})),s.parentNode?.removeChild(s))}}function RR(n,t){let e=Ug.get(n);e?e.includes(t)||e.push(t):Ug.set(n,[t])}var $o=new Set,ef=(function(n){return n[n.CHANGE_DETECTION=0]="CHANGE_DETECTION",n[n.AFTER_NEXT_RENDER=1]="AFTER_NEXT_RENDER",n})(ef||{}),hr=new b(""),CE=new Set;function pr(n){CE.has(n)||(CE.add(n),performance?.mark?.("mark_feature_usage",{detail:{feature:n}}))}var tf=(()=>{class n{impl=null;execute(){this.impl?.execute()}static \u0275prov=C({token:n,providedIn:"root",factory:()=>new n})}return n})(),Sy=[0,1,2,3],Ty=(()=>{class n{ngZone=f(L);scheduler=f(er);errorHandler=f(Fn,{optional:!0});sequences=new Set;deferredRegistrations=new Set;executing=!1;constructor(){f(hr,{optional:!0})}execute(){let e=this.sequences.size>0;e&&Pe(Se.AfterRenderHooksStart),this.executing=!0;for(let i of Sy)for(let r of this.sequences)if(!(r.erroredOrDestroyed||!r.hooks[i]))try{r.pipelinedValue=this.ngZone.runOutsideAngular(()=>this.maybeTrace(()=>{let o=r.hooks[i];return o(r.pipelinedValue)},r.snapshot))}catch(o){r.erroredOrDestroyed=!0,this.errorHandler?.handleError(o)}this.executing=!1;for(let i of this.sequences)i.afterRun(),i.once&&(this.sequences.delete(i),i.destroy());for(let i of this.deferredRegistrations)this.sequences.add(i);this.deferredRegistrations.size>0&&this.scheduler.notify(7),this.deferredRegistrations.clear(),e&&Pe(Se.AfterRenderHooksEnd)}register(e){let{view:i}=e;i!==void 0?((i[Lo]??=[]).push(e),jo(i),i[ie]|=8192):this.executing?this.deferredRegistrations.add(e):this.addSequence(e)}addSequence(e){this.sequences.add(e),this.scheduler.notify(7)}unregister(e){this.executing&&this.sequences.has(e)?(e.erroredOrDestroyed=!0,e.pipelinedValue=void 0,e.once=!0):(this.sequences.delete(e),this.deferredRegistrations.delete(e))}maybeTrace(e,i){return i?i.run(ef.AFTER_NEXT_RENDER,e):e()}static \u0275prov=C({token:n,providedIn:"root",factory:()=>new n})}return n})(),Pl=class{impl;hooks;view;once;snapshot;erroredOrDestroyed=!1;pipelinedValue=void 0;unregisterOnDestroy;constructor(t,e,i,r,o,s=null){this.impl=t,this.hooks=e,this.view=i,this.once=r,this.snapshot=s,this.unregisterOnDestroy=o?.onDestroy(()=>this.destroy())}afterRun(){this.erroredOrDestroyed=!1,this.pipelinedValue=void 0,this.snapshot?.dispose(),this.snapshot=null}destroy(){this.impl.unregister(this),this.unregisterOnDestroy?.();let t=this.view?.[Lo];t&&(this.view[Lo]=t.filter(e=>e!==this))}};function wt(n,t){let e=t?.injector??f(re);return pr("NgAfterNextRender"),NR(n,e,t,!0)}function OR(n){return n instanceof Function?[void 0,void 0,n,void 0]:[n.earlyRead,n.write,n.mixedReadWrite,n.read]}function NR(n,t,e,i){let r=t.get(tf);r.impl??=t.get(Ty);let o=t.get(hr,null,{optional:!0}),s=e?.manualCleanup!==!0?t.get(st):null,a=t.get(Gs,null,{optional:!0}),l=new Pl(r.impl,OR(n),a?.view,i,s,o?.snapshot(null));return r.impl.register(l),l}var Pw=new b("",{factory:()=>({queue:new Set,isScheduled:!1,scheduler:null,injector:f($e)})});function Fw(n,t,e){let i=n.get(Pw);if(Array.isArray(t))for(let r of t)i.queue.add(r),e?.detachedLeaveAnimationFns?.push(r);else i.queue.add(t),e?.detachedLeaveAnimationFns?.push(t);i.scheduler&&i.scheduler(n)}function PR(n,t){let e=n.get(Pw);if(t.detachedLeaveAnimationFns){for(let i of t.detachedLeaveAnimationFns)e.queue.delete(i);t.detachedLeaveAnimationFns=void 0}}function FR(n,t){for(let[e,i]of t)Fw(n,i.animateFns)}function DE(n,t,e,i){let r=n?.[zr]?.enter;t!==null&&r&&r.has(e.index)&&FR(i,r)}function qs(n,t,e,i,r,o,s,a){if(r!=null){let l,c=!1;ai(r)?l=r:ar(r)&&(c=!0,r=r[oi]);let d=Bn(r);n===0&&i!==null?(DE(a,i,o,e),s==null?Ew(t,i,d):Vu(t,i,d,s||null,!0)):n===1&&i!==null?(DE(a,i,o,e),Vu(t,i,d,s||null,!0),AR(o,d)):n===2?(a?.[zr]?.leave?.has(o.index)&&RR(o,d),Al.delete(d),EE(a,o,e,u=>{if(Al.has(d)){Al.delete(d);return}ww(t,d,c,u)})):n===3&&(Al.delete(d),EE(a,o,e,()=>{t.destroyNode(d)})),l!=null&&qR(t,n,e,l,o,i,s)}}function LR(n,t){Lw(n,t),t[oi]=null,t[en]=null}function VR(n,t,e,i,r,o){i[oi]=r,i[en]=t,rf(n,i,e,1,r,o)}function Lw(n,t){t[si].changeDetectionScheduler?.notify(9),rf(n,t,t[ze],2,null,null)}function BR(n){let t=n[$s];if(!t)return vg(n[$],n);for(;t;){let e=null;if(ar(t))e=t[$s];else{let i=t[ot];i&&(e=i)}if(!e){for(;t&&!t[Vn]&&t!==n;)ar(t)&&vg(t[$],t),t=t[Et];t===null&&(t=n),ar(t)&&vg(t[$],t),e=t&&t[Vn]}t=e}}function Iy(n,t){let e=n[Vo],i=e.indexOf(t);e.splice(i,1)}function nf(n,t){if(Bo(t))return;let e=t[ze];e.destroyNode&&rf(n,t,e,3,null,null),BR(t)}function vg(n,t){if(Bo(t))return;let e=B(null);try{t[ie]&=-129,t[ie]|=256,t[wn]&&Or(t[wn]),HR(n,t),UR(n,t),t[$].type===1&&t[ze].destroy();let i=t[$r];if(i!==null&&ai(t[Et])){i!==t[Et]&&Iy(i,t);let r=t[Ai];r!==null&&r.detachView(n)}kg(t)}finally{B(e)}}function EE(n,t,e,i){let r=n?.[zr];if(r==null||r.leave==null||!r.leave.has(t.index))return i(!1);n&&$o.add(n[sr]),Fw(e,()=>{if(r.leave&&r.leave.has(t.index)){let s=r.leave.get(t.index),a=[];if(s){for(let l=0;l<s.animateFns.length;l++){let c=s.animateFns[l],{promise:d}=c();a.push(d)}r.detachedLeaveAnimationFns=void 0}r.running=Promise.allSettled(a),jR(n,i)}else n&&$o.delete(n[sr]),i(!1)},r)}function jR(n,t){let e=n[zr]?.running;if(e){e.then(()=>{n[zr].running=void 0,$o.delete(n[sr]),t(!0)});return}t(!1)}function UR(n,t){let e=n.cleanup,i=t[Hs];if(e!==null)for(let s=0;s<e.length-1;s+=2)if(typeof e[s]=="string"){let a=e[s+3];a>=0?i[a]():i[-a].unsubscribe(),s+=2}else{let a=i[e[s+1]];e[s].call(a)}i!==null&&(t[Hs]=null);let r=t[Ji];if(r!==null){t[Ji]=null;for(let s=0;s<r.length;s++){let a=r[s];a()}}let o=t[Br];if(o!==null){t[Br]=null;for(let s of o)s.destroy()}}function HR(n,t){let e;if(n!=null&&(e=n.destroyHooks)!=null)for(let i=0;i<e.length;i+=2){let r=t[e[i]];if(!(r instanceof Ho)){let o=e[i+1];if(Array.isArray(o))for(let s=0;s<o.length;s+=2){let a=r[o[s]],l=o[s+1];Pe(Se.LifecycleHookStart,a,l);try{l.call(a)}finally{Pe(Se.LifecycleHookEnd,a,l)}}else{Pe(Se.LifecycleHookStart,r,o);try{o.call(r)}finally{Pe(Se.LifecycleHookEnd,r,o)}}}}}function Vw(n,t,e){return $R(n,t.parent,e)}function $R(n,t,e){let i=t;for(;i!==null&&i.type&168;)t=i,i=t.parent;if(i===null)return e[oi];if(Ri(i)){let{encapsulation:r}=n.data[i.directiveStart+i.componentOffset];if(r===fi.None||r===fi.Emulated)return null}return jn(i,e)}function Bw(n,t,e){return WR(n,t,e)}function zR(n,t,e){return n.type&40?jn(n,e):null}var WR=zR,wE;function xy(n,t,e,i){let r=Vw(n,i,t),o=t[ze],s=i.parent||t[en],a=Bw(s,i,t);if(r!=null)if(Array.isArray(e))for(let l=0;l<e.length;l++)bE(o,r,e[l],a,!1);else bE(o,r,e,a,!1);wE!==void 0&&wE(o,i,t,e,r)}function Rl(n,t){if(t!==null){let e=t.type;if(e&3)return jn(t,n);if(e&4)return Hg(-1,n[t.index]);if(e&8){let i=t.child;if(i!==null)return Rl(n,i);{let r=n[t.index];return ai(r)?Hg(-1,r):Bn(r)}}else{if(e&128)return Rl(n,t.next);if(e&32)return wy(t,n)()||Bn(n[t.index]);{let i=jw(n,t);if(i!==null){if(Array.isArray(i))return i[0];let r=jr(n[tn]);return Rl(r,i)}else return Rl(n,t.next)}}}return null}function jw(n,t){if(t!==null){let i=n[tn][en],r=t.projection;return i.projection[r]}return null}function Hg(n,t){let e=ot+n+1;if(e<t.length){let i=t[e],r=i[$].firstChild;if(r!==null)return Rl(i,r)}return t[Wr]}function My(n,t,e,i,r,o,s){for(;e!=null;){let a=i[or];if(e.type===128){e=e.next;continue}let l=i[e.index],c=e.type;if(s&&t===0&&(l&&Zs(Bn(l),i),e.flags|=2),!Xu(e))if(c&8)My(n,t,e.child,i,r,o,!1),qs(t,n,a,r,l,e,o,i);else if(c&32){let d=wy(e,i),u;for(;u=d();)qs(t,n,a,r,u,e,o,i);qs(t,n,a,r,l,e,o,i)}else c&16?Uw(n,t,i,e,r,o):qs(t,n,a,r,l,e,o,i);e=s?e.projectionNext:e.next}}function rf(n,t,e,i,r,o){My(e,i,n.firstChild,t,r,o,!1)}function GR(n,t,e){let i=t[ze],r=Vw(n,e,t),o=e.parent||t[en],s=Bw(o,e,t);Uw(i,0,t,e,r,s)}function Uw(n,t,e,i,r,o){let s=e[tn],l=s[en].projection[i.projection];if(Array.isArray(l))for(let c=0;c<l.length;c++){let d=l[c];qs(t,n,e[or],r,d,i,o,e)}else{let c=l,d=s[Et];rw(i)&&(c.flags|=128),My(n,t,c,d,r,o,!0)}}function qR(n,t,e,i,r,o,s){let a=i[Wr],l=Bn(i);a!==l&&qs(t,n,e,o,a,r,s);for(let c=ot;c<i.length;c++){let d=i[c];rf(d[$],d,n,t,o,a)}}function KR(n,t,e,i,r){if(t)r?n.addClass(e,i):n.removeClass(e,i);else{let o=i.indexOf("-")===-1?void 0:Pi.DashCase;r==null?n.removeStyle(e,i,o):(typeof r=="string"&&r.endsWith("!important")&&(r=r.slice(0,-10),o|=Pi.Important),n.setStyle(e,i,r,o))}}function Hw(n,t,e,i,r){let o=lr(),s=i&2;try{qr(-1),s&&t.length>Xe&&Nw(n,t,Xe,!1);let a=s?Se.TemplateUpdateStart:Se.TemplateCreateStart;Pe(a,r,e),e(i,r)}finally{qr(o);let a=s?Se.TemplateUpdateEnd:Se.TemplateCreateEnd;Pe(a,r,e)}}function ky(n,t,e){eO(n,t,e),(e.flags&64)===64&&tO(n,t,e)}function of(n,t,e=jn){let i=t.localNames;if(i!==null){let r=t.index+1;for(let o=0;o<i.length;o+=2){let s=i[o+1],a=s===-1?e(t,n):n[s];n[r++]=a}}}function YR(n,t,e,i){let o=i.get(fw,uw)||e===fi.ShadowDom||e===fi.ExperimentalIsolatedShadowDom,s=n.selectRootElement(t,o);return ZR(s),s}function ZR(n){XR(n)}var XR=()=>null;function QR(n){return n==="class"?"className":n==="for"?"htmlFor":n==="formaction"?"formAction":n==="innerHtml"?"innerHTML":n==="readonly"?"readOnly":n==="tabindex"?"tabIndex":n}function JR(n,t,e,i,r,o){let s=t[$];if(sf(n,s,t,e,i)){Ri(n)&&zw(t,n.index);return}n.type&3&&(e=QR(e)),$w(n,t,e,i,r,o)}function $w(n,t,e,i,r,o){if(n.type&3){let s=jn(n,t);i=o!=null?o(i,n.value||"",e):i,r.setProperty(s,e,i)}else n.type&12}function zw(n,t){let e=Un(t,n);e[ie]&16||(e[ie]|=64)}function eO(n,t,e){let i=e.directiveStart,r=e.directiveEnd;Ri(e)&&MR(t,e,n.data[i+e.componentOffset]),n.firstCreatePass||Lu(e,t);let o=e.initialInputs;for(let s=i;s<r;s++){let a=n.data[s],l=Nl(t,n,s,e);if(Zs(l,t),o!==null&&rO(t,s-i,l,a,e,o),Oi(a)){let c=Un(e.index,t);c[ft]=Nl(t,n,s,e)}}}function tO(n,t,e){let i=e.directiveStart,r=e.directiveEnd,o=e.index,s=GD();try{qr(o);for(let a=i;a<r;a++){let l=n.data[a],c=t[a];mu(a),(l.hostBindings!==null||l.hostVars!==0||l.hostAttrs!==null)&&nO(l,c)}}finally{qr(-1),mu(s)}}function nO(n,t){n.hostBindings!==null&&n.hostBindings(1,t)}function Ww(n,t){let e=n.directiveRegistry,i=null;if(e)for(let r=0;r<e.length;r++){let o=e[r];Aw(t,o.selectors,!1)&&(i??=[],Oi(o)?i.unshift(o):i.push(o))}return i}function iO(n,t,e,i,r,o){let s=jn(n,t);Gw(t[ze],s,o,n.value,e,i,r)}function Gw(n,t,e,i,r,o,s){if(o==null)n.removeAttribute(t,r,e);else{let a=s==null?ou(o):s(o,i||"",r);n.setAttribute(t,r,a,e)}}function rO(n,t,e,i,r,o){let s=o[t];if(s!==null)for(let a=0;a<s.length;a+=2){let l=s[a],c=s[a+1];jg(i,e,l,c)}}function qw(n,t,e,i,r){let o=Xe+e,s=t[$],a=r(s,t,n,i,e);t[o]=a,Ws(n,!0);let l=n.type===2;return l?(Sw(t[ze],a,n),(BD()===0||Sl(n))&&Zs(a,t),jD()):Zs(a,t),_u()&&(!l||!Xu(n))&&xy(s,t,a,n),n}function Kw(n){let t=n;return ig()?rg():(t=t.parent,Ws(t,!1)),t}function oO(n,t){let e=n[or];if(!e)return;let i;try{i=e.get(Hn,null)}catch{i=null}i?.(t)}function sf(n,t,e,i,r){let o=n.inputs?.[i],s=n.hostDirectiveInputs?.[i],a=!1;if(s)for(let l=0;l<s.length;l+=2){let c=s[l],d=s[l+1],u=t.data[c];jg(u,e[c],d,r),a=!0}if(o)for(let l of o){let c=e[l],d=t.data[l];jg(d,c,i,r),a=!0}return a}function sO(n,t){let e=Un(t,n),i=e[$];aO(i,e);let r=e[oi];r!==null&&e[No]===null&&(e[No]=hw(r,e[or])),Pe(Se.ComponentStart);try{Ay(i,e,e[ft])}finally{Pe(Se.ComponentEnd,e[ft])}}function aO(n,t){for(let e=t.length;e<n.blueprint.length;e++)t.push(n.blueprint[e])}function Ay(n,t,e){yu(t);try{let i=n.viewQuery;i!==null&&Ag(1,i,e);let r=n.template;r!==null&&Hw(n,t,r,1,e),n.firstCreatePass&&(n.firstCreatePass=!1),t[Ai]?.finishViewCreation(n),n.staticContentQueries&&pw(n,t),n.staticViewQueries&&Ag(2,n.viewQuery,e);let o=n.components;o!==null&&lO(t,o)}catch(i){throw n.firstCreatePass&&(n.incompleteFirstPass=!0,n.firstCreatePass=!1),i}finally{t[ie]&=-5,vu()}}function lO(n,t){for(let e=0;e<t.length;e++)sO(n,t[e])}function Wl(n,t,e,i){let r=B(null);try{let o=t.tView,a=n[ie]&4096?4096:16,l=Dy(n,o,e,a,null,t,null,null,i?.injector??null,i?.embeddedViewInjector??null,i?.dehydratedView??null),c=n[t.index];l[$r]=c;let d=n[Ai];return d!==null&&(l[Ai]=d.createEmbeddedView(o)),Ay(o,l,e),l}finally{B(r)}}function Xs(n,t){return!t||t.firstChild===null||rw(n)}function Fl(n,t,e,i,r=!1){for(;e!==null;){if(e.type===128){e=r?e.projectionNext:e.next;continue}let o=t[e.index];o!==null&&i.push(Bn(o)),ai(o)&&Yw(o,i);let s=e.type;if(s&8)Fl(n,t,e.child,i);else if(s&32){let a=wy(e,t),l;for(;l=a();)i.push(l)}else if(s&16){let a=jw(t,e);if(Array.isArray(a))i.push(...a);else{let l=jr(t[tn]);Fl(l[$],l,a,i,!0)}}e=r?e.projectionNext:e.next}return i}function Yw(n,t){for(let e=ot;e<n.length;e++){let i=n[e],r=i[$].firstChild;r!==null&&Fl(i[$],i,r,t)}n[Wr]!==n[oi]&&t.push(n[Wr])}function Zw(n){if(n[Lo]!==null){for(let t of n[Lo])t.impl.addSequence(t);n[Lo].length=0}}var Xw=[];function cO(n){return n[wn]??dO(n)}function dO(n){let t=Xw.pop()??Object.create(fO);return t.lView=n,t}function uO(n){n.lView[wn]!==n&&(n.lView=null,Xw.push(n))}var fO=V(g({},kr),{consumerIsAlwaysLive:!0,kind:"template",consumerMarkedDirty:n=>{jo(n.lView)},consumerOnSignalRead(){this.lView[wn]=this}});function hO(n){let t=n[wn]??Object.create(pO);return t.lView=n,t}var pO=V(g({},kr),{consumerIsAlwaysLive:!0,kind:"template",consumerMarkedDirty:n=>{let t=jr(n.lView);for(;t&&!Qw(t[$]);)t=jr(t);t&&qm(t)},consumerOnSignalRead(){this.lView[wn]=this}});function Qw(n){return n.type!==2}function Jw(n){if(n[Br]===null)return;let t=!0;for(;t;){let e=!1;for(let i of n[Br])i.dirty&&(e=!0,i.zone===null||Zone.current===i.zone?i.run():i.zone.run(()=>i.run()));t=e&&!!(n[ie]&8192)}}var mO=100;function e0(n,t=0){let i=n[si].rendererFactory,r=!1;r||i.begin?.();try{gO(n,t)}finally{r||i.end?.()}}function gO(n,t){let e=og();try{yl(!0),$g(n,t);let i=0;for(;Tl(n);){if(i===mO)throw new S(103,!1);i++,$g(n,1)}}finally{yl(e)}}function yO(n,t,e,i){if(Bo(t))return;let r=t[ie],o=!1,s=!1;yu(t);let a=!0,l=null,c=null;o||(Qw(n)?(c=cO(t),l=Ki(c)):gd()===null?(a=!1,c=hO(t),l=Ki(c)):t[wn]&&(Or(t[wn]),t[wn]=null));try{Gm(t),$D(n.bindingStartIndex),e!==null&&Hw(n,t,e,2,i);let d=(r&3)===3;if(!o)if(d){let p=n.preOrderCheckHooks;p!==null&&xu(t,p,null)}else{let p=n.preOrderHooks;p!==null&&Mu(t,p,0,null),gg(t,0)}if(s||vO(t),Jw(t),t0(t,0),n.contentQueries!==null&&pw(n,t),!o)if(d){let p=n.contentCheckHooks;p!==null&&xu(t,p)}else{let p=n.contentHooks;p!==null&&Mu(t,p,1),gg(t,1)}_O(n,t);let u=n.components;u!==null&&i0(t,u,0);let h=n.viewQuery;if(h!==null&&Ag(2,h,i),!o)if(d){let p=n.viewCheckHooks;p!==null&&xu(t,p)}else{let p=n.viewHooks;p!==null&&Mu(t,p,2),gg(t,2)}if(n.firstUpdatePass===!0&&(n.firstUpdatePass=!1),t[du]){for(let p of t[du])p();t[du]=null}o||(Zw(t),t[ie]&=-73)}catch(d){throw o||jo(t),d}finally{c!==null&&(Rr(c,l),a&&uO(c)),vu()}}function t0(n,t){for(let e=sw(n);e!==null;e=aw(e))for(let i=ot;i<e.length;i++){let r=e[i];n0(r,t)}}function vO(n){for(let t=sw(n);t!==null;t=aw(t)){if(!(t[ie]&2))continue;let e=t[Vo];for(let i=0;i<e.length;i++){let r=e[i];qm(r)}}}function bO(n,t,e){Pe(Se.ComponentStart);let i=Un(t,n);try{n0(i,e)}finally{Pe(Se.ComponentEnd,i[ft])}}function n0(n,t){hu(n)&&$g(n,t)}function $g(n,t){let i=n[$],r=n[ie],o=n[wn],s=!!(t===0&&r&16);if(s||=!!(r&64&&t===0),s||=!!(r&1024),s||=!!(o?.dirty&&Is(o)),s||=!1,o&&(o.dirty=!1),n[ie]&=-9217,s)yO(i,n,i.template,n[ft]);else if(r&8192){let a=B(null);try{Jw(n),t0(n,1);let l=i.components;l!==null&&i0(n,l,1),Zw(n)}finally{B(a)}}}function i0(n,t,e){for(let i=0;i<t.length;i++)bO(n,t[i],e)}function _O(n,t){let e=n.hostBindingOpCodes;if(e!==null)try{for(let i=0;i<e.length;i++){let r=e[i];if(r<0)qr(~r);else{let o=r,s=e[++i],a=e[++i];WD(s,o);let l=t[o];Pe(Se.HostBindingsUpdateStart,l);try{a(2,l)}finally{Pe(Se.HostBindingsUpdateEnd,l)}}}}finally{qr(-1)}}function Ry(n,t){let e=og()?64:1088;for(n[si].changeDetectionScheduler?.notify(t);n;){n[ie]|=e;let i=jr(n);if(zs(n)&&!i)return n;n=i}return null}function r0(n,t,e,i){return[n,!0,0,t,null,i,null,e,null,null]}function o0(n,t){let e=ot+t;if(e<n.length)return n[e]}function Gl(n,t,e,i=!0){let r=t[$];if(CO(r,t,n,e),i){let s=Hg(e,n),a=t[ze],l=a.parentNode(n[Wr]);l!==null&&VR(r,n[en],a,t,l,s)}let o=t[No];o!==null&&o.firstChild!==null&&(o.firstChild=null)}function s0(n,t){let e=Ll(n,t);return e!==void 0&&nf(e[$],e),e}function Ll(n,t){if(n.length<=ot)return;let e=ot+t,i=n[e];if(i){let r=i[$r];r!==null&&r!==n&&Iy(r,i),t>0&&(n[e-1][Vn]=i[Vn]);let o=Dl(n,ot+t);LR(i[$],i);let s=o[Ai];s!==null&&s.detachView(o[$]),i[Et]=null,i[Vn]=null,i[ie]&=-129}return i}function CO(n,t,e,i){let r=ot+i,o=e.length;i>0&&(e[r-1][Vn]=t),i<o-ot?(t[Vn]=e[r],Om(e,ot+i,t)):(e.push(t),t[Vn]=null),t[Et]=e;let s=t[$r];s!==null&&e!==s&&a0(s,t);let a=t[Ai];a!==null&&a.insertView(n),pu(t),t[ie]|=128}function a0(n,t){let e=n[Vo],i=t[Et];if(ar(i))n[ie]|=2;else{let r=i[Et][tn];t[tn]!==r&&(n[ie]|=2)}e===null?n[Vo]=[t]:e.push(t)}var Yr=class{_lView;_cdRefInjectingView;_appRef=null;_attachedToViewContainer=!1;exhaustive;get rootNodes(){let t=this._lView,e=t[$];return Fl(e,t,e.firstChild,[])}constructor(t,e){this._lView=t,this._cdRefInjectingView=e}get context(){return this._lView[ft]}set context(t){this._lView[ft]=t}get destroyed(){return Bo(this._lView)}destroy(){if(this._appRef)this._appRef.detachView(this);else if(this._attachedToViewContainer){let t=this._lView[Et];if(ai(t)){let e=t[wl],i=e?e.indexOf(this):-1;i>-1&&(Ll(t,i),Dl(e,i))}this._attachedToViewContainer=!1}nf(this._lView[$],this._lView)}onDestroy(t){Km(this._lView,t)}markForCheck(){Ry(this._cdRefInjectingView||this._lView,4)}detach(){this._lView[ie]&=-129}reattach(){pu(this._lView),this._lView[ie]|=128}detectChanges(){this._lView[ie]|=1024,e0(this._lView)}checkNoChanges(){}attachToViewContainerRef(){if(this._appRef)throw new S(902,!1);this._attachedToViewContainer=!0}detachFromAppRef(){this._appRef=null;let t=zs(this._lView),e=this._lView[$r];e!==null&&!t&&Iy(e,this._lView),Lw(this._lView[$],this._lView)}attachToAppRef(t){if(this._attachedToViewContainer)throw new S(902,!1);this._appRef=t;let e=zs(this._lView),i=this._lView[$r];i!==null&&!e&&a0(i,this._lView),pu(this._lView)}};var Tt=(()=>{class n{_declarationLView;_declarationTContainer;elementRef;static __NG_ELEMENT_ID__=DO;constructor(e,i,r){this._declarationLView=e,this._declarationTContainer=i,this.elementRef=r}get ssrId(){return this._declarationTContainer.tView?.ssrId||null}createEmbeddedView(e,i){return this.createEmbeddedViewImpl(e,i)}createEmbeddedViewImpl(e,i,r){let o=Wl(this._declarationLView,this._declarationTContainer,e,{embeddedViewInjector:i,dehydratedView:r});return new Yr(o)}}return n})();function DO(){return af(Nt(),Q())}function af(n,t){return n.type&4?new Tt(t,n,ea(n,t)):null}function na(n,t,e,i,r){let o=n.data[t];if(o===null)o=EO(n,t,e,i,r),zD()&&(o.flags|=32);else if(o.type&64){o.type=e,o.value=i,o.attrs=r;let s=UD();o.injectorIndex=s===null?-1:s.injectorIndex}return Ws(o,!0),o}function EO(n,t,e,i,r){let o=ng(),s=ig(),a=s?o:o&&o.parent,l=n.data[t]=SO(n,a,e,t,i,r);return wO(n,l,o,s),l}function wO(n,t,e,i){n.firstChild===null&&(n.firstChild=t),e!==null&&(i?e.child==null&&t.parent!==null&&(e.child=t):e.next===null&&(e.next=t,t.prev=e))}function SO(n,t,e,i,r,o){let s=t?t.injectorIndex:-1,a=0;return Jm()&&(a|=128),{type:e,index:i,insertBeforeIndex:null,injectorIndex:s,directiveStart:-1,directiveEnd:-1,directiveStylingLast:-1,componentOffset:-1,controlDirectiveIndex:-1,customControlIndex:-1,propertyBindings:null,flags:a,providerIndexes:0,value:r,attrs:o,mergedAttrs:null,localNames:null,initialInputs:null,inputs:null,hostDirectiveInputs:null,outputs:null,hostDirectiveOutputs:null,directiveToIndex:null,tView:null,next:null,prev:null,projectionNext:null,child:null,parent:t,projection:null,styles:null,stylesWithoutHost:null,residualStyles:void 0,classes:null,classesWithoutHost:null,residualClasses:void 0,classBindings:0,styleBindings:0}}function TO(n){let t=n[Um]??[],i=n[Et][ze],r=[];for(let o of t)o.data[dw]!==void 0?r.push(o):IO(o,i);n[Um]=r}function IO(n,t){let e=0,i=n.firstChild;if(i){let r=n.data[cw];for(;e<r;){let o=i.nextSibling;ww(t,i,!1),i=o,e++}}}var xO=()=>null,MO=()=>null;function Bu(n,t){return xO(n,t)}function l0(n,t,e){return MO(n,t,e)}var c0=class{},lf=class{},zg=class{resolveComponentFactory(t){throw new S(917,!1)}},ql=class{static NULL=new zg},zt=class{},yt=(()=>{class n{destroyNode=null;static __NG_ELEMENT_ID__=()=>kO()}return n})();function kO(){let n=Q(),t=Nt(),e=Un(t.index,n);return(ar(e)?e:n)[ze]}var d0=(()=>{class n{static \u0275prov=C({token:n,providedIn:"root",factory:()=>null})}return n})();var Au={},Wg=class{injector;parentInjector;constructor(t,e){this.injector=t,this.parentInjector=e}get(t,e,i){let r=this.injector.get(t,Au,i);return r!==Au||e===Au?r:this.parentInjector.get(t,e,i)}};function ju(n,t,e){let i=e?n.styles:null,r=e?n.classes:null,o=0;if(t!==null)for(let s=0;s<t.length;s++){let a=t[s];if(typeof a=="number")o=a;else if(o==1)r=nu(r,a);else if(o==2){let l=a,c=t[++s];i=nu(i,l+": "+c+";")}}e?n.styles=i:n.stylesWithoutHost=i,e?n.classes=r:n.classesWithoutHost=r}function Je(n,t=0){let e=Q();if(e===null)return ne(n,t);let i=Nt();return ew(i,e,Ot(n),t)}function cf(){let n="invalid";throw new Error(n)}function u0(n,t,e,i,r){let o=i===null?null:{"":-1},s=r(n,e);if(s!==null){let a=s,l=null,c=null;for(let d of s)if(d.resolveHostDirectives!==null){[a,l,c]=d.resolveHostDirectives(s);break}OO(n,t,e,a,o,l,c)}o!==null&&i!==null&&AO(e,i,o)}function AO(n,t,e){let i=n.localNames=[];for(let r=0;r<t.length;r+=2){let o=e[t[r+1]];if(o==null)throw new S(-301,!1);i.push(t[r],o)}}function RO(n,t,e){t.componentOffset=e,(n.components??=[]).push(t.index)}function OO(n,t,e,i,r,o,s){let a=i.length,l=null;for(let h=0;h<a;h++){let p=i[h];l===null&&Oi(p)&&(l=p,RO(n,e,h)),xg(Lu(e,t),n,p.type)}BO(e,n.data.length,a),l?.viewProvidersResolver&&l.viewProvidersResolver(l);for(let h=0;h<a;h++){let p=i[h];p.providersResolver&&p.providersResolver(p)}let c=!1,d=!1,u=Ow(n,t,a,null);a>0&&(e.directiveToIndex=new Map);for(let h=0;h<a;h++){let p=i[h];if(e.mergedAttrs=Ys(e.mergedAttrs,p.hostAttrs),PO(n,e,t,u,p),VO(u,p,r),s!==null&&s.has(p)){let[w,k]=s.get(p);e.directiveToIndex.set(p.type,[u,w+e.directiveStart,k+e.directiveStart])}else(o===null||!o.has(p))&&e.directiveToIndex.set(p.type,u);p.contentQueries!==null&&(e.flags|=4),(p.hostBindings!==null||p.hostAttrs!==null||p.hostVars!==0)&&(e.flags|=64);let m=p.type.prototype;!c&&(m.ngOnChanges||m.ngOnInit||m.ngDoCheck)&&((n.preOrderHooks??=[]).push(e.index),c=!0),!d&&(m.ngOnChanges||m.ngDoCheck)&&((n.preOrderCheckHooks??=[]).push(e.index),d=!0),u++}NO(n,e,o)}function NO(n,t,e){for(let i=t.directiveStart;i<t.directiveEnd;i++){let r=n.data[i];if(e===null||!e.has(r))SE(0,t,r,i),SE(1,t,r,i),IE(t,i,!1);else{let o=e.get(r);TE(0,t,o,i),TE(1,t,o,i),IE(t,i,!0)}}}function SE(n,t,e,i){let r=n===0?e.inputs:e.outputs;for(let o in r)if(r.hasOwnProperty(o)){let s;n===0?s=t.inputs??={}:s=t.outputs??={},s[o]??=[],s[o].push(i),f0(t,o)}}function TE(n,t,e,i){let r=n===0?e.inputs:e.outputs;for(let o in r)if(r.hasOwnProperty(o)){let s=r[o],a;n===0?a=t.hostDirectiveInputs??={}:a=t.hostDirectiveOutputs??={},a[s]??=[],a[s].push(i,o),f0(t,s)}}function f0(n,t){t==="class"?n.flags|=8:t==="style"&&(n.flags|=16)}function IE(n,t,e){let{attrs:i,inputs:r,hostDirectiveInputs:o}=n;if(i===null||!e&&r===null||e&&o===null||_y(n)){n.initialInputs??=[],n.initialInputs.push(null);return}let s=null,a=0;for(;a<i.length;){let l=i[a];if(l===0){a+=4;continue}else if(l===5){a+=2;continue}else if(typeof l=="number")break;if(!e&&r.hasOwnProperty(l)){let c=r[l];for(let d of c)if(d===t){s??=[],s.push(l,i[a+1]);break}}else if(e&&o.hasOwnProperty(l)){let c=o[l];for(let d=0;d<c.length;d+=2)if(c[d]===t){s??=[],s.push(c[d+1],i[a+1]);break}}a+=2}n.initialInputs??=[],n.initialInputs.push(s)}function PO(n,t,e,i,r){n.data[i]=r;let o=r.factory||(r.factory=Vr(r.type,!0)),s=new Ho(o,Oi(r),Je,null);n.blueprint[i]=s,e[i]=s,FO(n,t,i,Ow(n,e,r.hostVars,zn),r)}function FO(n,t,e,i,r){let o=r.hostBindings;if(o){let s=n.hostBindingOpCodes;s===null&&(s=n.hostBindingOpCodes=[]);let a=~t.index;LO(s)!=a&&s.push(a),s.push(e,i,o)}}function LO(n){let t=n.length;for(;t>0;){let e=n[--t];if(typeof e=="number"&&e<0)return e}return 0}function VO(n,t,e){if(e){if(t.exportAs)for(let i=0;i<t.exportAs.length;i++)e[t.exportAs[i]]=n;Oi(t)&&(e[""]=n)}}function BO(n,t,e){n.flags|=1,n.directiveStart=t,n.directiveEnd=t+e,n.providerIndexes=t}function h0(n,t,e,i,r,o,s,a){let l=t[$],c=l.consts,d=Sn(c,s),u=na(l,n,e,i,d);return o&&u0(l,t,u,Sn(c,a),r),u.mergedAttrs=Ys(u.mergedAttrs,u.attrs),u.attrs!==null&&ju(u,u.attrs,!1),u.mergedAttrs!==null&&ju(u,u.mergedAttrs,!0),l.queries!==null&&l.queries.elementStart(l,u),u}function p0(n,t){WE(n,t),Hm(t)&&n.queries.elementEnd(t)}function jO(n,t,e,i,r,o){let s=t.consts,a=Sn(s,r),l=na(t,n,e,i,a);if(l.mergedAttrs=Ys(l.mergedAttrs,l.attrs),o!=null){let c=Sn(s,o);l.localNames=[];for(let d=0;d<c.length;d+=2)l.localNames.push(c[d],-1)}return l.attrs!==null&&ju(l,l.attrs,!1),l.mergedAttrs!==null&&ju(l,l.mergedAttrs,!0),t.queries!==null&&t.queries.elementStart(t,l),l}function Oy(n){return g0(n)?Array.isArray(n)||!(n instanceof Map)&&Symbol.iterator in n:!1}function m0(n,t){if(Array.isArray(n))for(let e=0;e<n.length;e++)t(n[e]);else{let e=n[Symbol.iterator](),i;for(;!(i=e.next()).done;)t(i.value)}}function g0(n){return n!==null&&(typeof n=="function"||typeof n=="object")}function y0(n,t,e){return n[t]=e}function $n(n,t,e){if(e===zn)return!1;let i=n[t];return Object.is(i,e)?!1:(n[t]=e,!0)}function UO(n,t,e,i){let r=$n(n,t,e);return $n(n,t+1,i)||r}function Ru(n,t,e){return function i(r){let o=i.__ngNativeEl__;o!==void 0&&UA(r,o);let s=Ri(n)?Un(n.index,t):t;Ry(s,5);let a=t[ft],l=xE(t,a,e,r),c=i.__ngNextListenerFn__;for(;c;)l=xE(t,a,c,r)&&l,c=c.__ngNextListenerFn__;return l}}function xE(n,t,e,i){let r=B(null);try{return Pe(Se.OutputStart,t,e),e(i)!==!1}catch(o){return oO(n,o),!1}finally{Pe(Se.OutputEnd,t,e),B(r)}}function v0(n,t,e,i,r,o,s,a){let l=Sl(n),c=!1,d=null;if(!i&&l&&(d=$O(t,e,o,n.index)),d!==null){let u=d.__ngLastListenerFn__||d;u.__ngNextListenerFn__=s,d.__ngLastListenerFn__=s,c=!0}else{let u=jn(n,e),h=i?i(u):u;$A(e,h,o,a),i||(a.__ngNativeEl__=u);let p=r.listen(h,o,a);if(!HO(o)){let m=i?w=>i(Bn(w[n.index])):n.index;b0(m,t,e,o,a,p,!1)}}return c}function HO(n){return n.startsWith("animation")||n.startsWith("transition")}function $O(n,t,e,i){let r=n.cleanup;if(r!=null)for(let o=0;o<r.length-1;o+=2){let s=r[o];if(s===e&&r[o+1]===i){let a=t[Hs],l=r[o+2];return a&&a.length>l?a[l]:null}typeof s=="string"&&(o+=2)}return null}function b0(n,t,e,i,r,o,s){let a=t.firstCreatePass?Zm(t):null,l=Ym(e),c=l.length;l.push(r,o),a&&a.push(i,n,c,(c+1)*(s?-1:1))}function ME(n,t,e,i,r,o){let s=t[e],a=t[$],c=a.data[e].outputs[i],u=s[c].subscribe(o);b0(n.index,a,t,r,o,u,!0)}var Gg=Symbol("BINDING");function _0(n){return n.debugInfo?.className||n.type.name||null}var Uu=class extends ql{ngModule;constructor(t){super(),this.ngModule=t}resolveComponentFactory(t){let e=ir(t);return new zo(e,this.ngModule)}};function zO(n){return Object.keys(n).map(t=>{let[e,i,r]=n[t],o={propName:e,templateName:t,isSignal:(i&Ju.SignalBased)!==0};return r&&(o.transform=r),o})}function WO(n){return Object.keys(n).map(t=>({propName:n[t],templateName:t}))}function GO(n,t,e){let i=t instanceof $e?t:t?.injector;return i&&n.getStandaloneInjector!==null&&(i=n.getStandaloneInjector(i)||i),i?new Wg(e,i):e}function qO(n){let t=n.get(zt,null);if(t===null)throw new S(407,!1);let e=n.get(d0,null),i=n.get(er,null),r=n.get(hr,null,{optional:!0});return{rendererFactory:t,sanitizer:e,changeDetectionScheduler:i,ngReflect:!1,tracingService:r}}function KO(n,t){let e=C0(n);return Dw(t,e,e==="svg"?$m:e==="math"?OD:null)}function C0(n){return(n.selectors[0][0]||"div").toLowerCase()}var zo=class extends lf{componentDef;ngModule;selector;componentType;ngContentSelectors;isBoundToModule;cachedInputs=null;cachedOutputs=null;get inputs(){return this.cachedInputs??=zO(this.componentDef.inputs),this.cachedInputs}get outputs(){return this.cachedOutputs??=WO(this.componentDef.outputs),this.cachedOutputs}constructor(t,e){super(),this.componentDef=t,this.ngModule=e,this.componentType=t.type,this.selector=SR(t.selectors),this.ngContentSelectors=t.ngContentSelectors??[],this.isBoundToModule=!!e}create(t,e,i,r,o,s){Pe(Se.DynamicComponentStart);let a=B(null);try{let l=this.componentDef,c=GO(l,r||this.ngModule,t),d=qO(c),u=d.tracingService;return u&&u.componentCreate?u.componentCreate(_0(l),()=>this.createComponentRef(d,c,e,i,o,s)):this.createComponentRef(d,c,e,i,o,s)}finally{B(a)}}createComponentRef(t,e,i,r,o,s){let a=this.componentDef,l=YO(r,a,s,o),c=t.rendererFactory.createRenderer(null,a),d=r?YR(c,r,a.encapsulation,e):KO(a,c),u=s?.some(kE)||o?.some(m=>typeof m!="function"&&m.bindings.some(kE)),h=Dy(null,l,null,512|Rw(a),null,null,t,c,e,null,hw(d,e,!0));h[Xe]=d,yu(h);let p=null;try{let m=h0(Xe,h,2,"#host",()=>l.directiveRegistry,!0,0);Sw(c,d,m),Zs(d,h),ky(l,h,m),mw(l,m,h),p0(l,m),i!==void 0&&XO(m,this.ngContentSelectors,i),p=Un(m.index,h),h[ft]=p[ft],Ay(l,h,null)}catch(m){throw p!==null&&kg(p),kg(h),m}finally{Pe(Se.DynamicComponentEnd),vu()}return new Hu(this.componentType,h,!!u)}};function YO(n,t,e,i){let r=n?["ng-version","21.2.13"]:TR(t.selectors[0]),o=null,s=null,a=0;if(e)for(let d of e)a+=d[Gg].requiredVars,d.create&&(d.targetIdx=0,(o??=[]).push(d)),d.update&&(d.targetIdx=0,(s??=[]).push(d));if(i)for(let d=0;d<i.length;d++){let u=i[d];if(typeof u!="function")for(let h of u.bindings){a+=h[Gg].requiredVars;let p=d+1;h.create&&(h.targetIdx=p,(o??=[]).push(h)),h.update&&(h.targetIdx=p,(s??=[]).push(h))}}let l=[t];if(i)for(let d of i){let u=typeof d=="function"?d:d.type,h=km(u);l.push(h)}return Cy(0,null,ZO(o,s),1,a,l,null,null,null,[r],null)}function ZO(n,t){return!n&&!t?null:e=>{if(e&1&&n)for(let i of n)i.create();if(e&2&&t)for(let i of t)i.update()}}function kE(n){let t=n[Gg].kind;return t==="input"||t==="twoWay"}var Hu=class extends c0{_rootLView;_hasInputBindings;instance;hostView;changeDetectorRef;componentType;location;previousInputValues=null;_tNode;constructor(t,e,i){super(),this._rootLView=e,this._hasInputBindings=i,this._tNode=uu(e[$],Xe),this.location=ea(this._tNode,e),this.instance=Un(this._tNode.index,e)[ft],this.hostView=this.changeDetectorRef=new Yr(e,void 0),this.componentType=t}setInput(t,e){this._hasInputBindings;let i=this._tNode;if(this.previousInputValues??=new Map,this.previousInputValues.has(t)&&Object.is(this.previousInputValues.get(t),e))return;let r=this._rootLView,o=sf(i,r[$],r,t,e);this.previousInputValues.set(t,e);let s=Un(i.index,r);Ry(s,1)}get injector(){return new Uo(this._tNode,this._rootLView)}destroy(){this.hostView.destroy()}onDestroy(t){this.hostView.onDestroy(t)}};function XO(n,t,e){let i=n.projection=[];for(let r=0;r<t.length;r++){let o=e[r];i.push(o!=null&&o.length?Array.from(o):null)}}var ht=(()=>{class n{static __NG_ELEMENT_ID__=QO}return n})();function QO(){let n=Nt();return D0(n,Q())}var qg=class n extends ht{_lContainer;_hostTNode;_hostLView;constructor(t,e,i){super(),this._lContainer=t,this._hostTNode=e,this._hostLView=i}get element(){return ea(this._hostTNode,this._hostLView)}get injector(){return new Uo(this._hostTNode,this._hostLView)}get parentInjector(){let t=dy(this._hostTNode,this._hostLView);if(KE(t)){let e=Pu(t,this._hostLView),i=Nu(t),r=e[$].data[i+8];return new Uo(r,e)}else return new Uo(null,this._hostLView)}clear(){for(;this.length>0;)this.remove(this.length-1)}get(t){let e=AE(this._lContainer);return e!==null&&e[t]||null}get length(){return this._lContainer.length-ot}createEmbeddedView(t,e,i){let r,o;typeof i=="number"?r=i:i!=null&&(r=i.index,o=i.injector);let s=Bu(this._lContainer,t.ssrId),a=t.createEmbeddedViewImpl(e||{},o,s);return this.insertImpl(a,r,Xs(this._hostTNode,s)),a}createComponent(t,e,i,r,o,s,a){let l=t&&!mA(t),c;if(l)c=e;else{let k=e||{};c=k.index,i=k.injector,r=k.projectableNodes,o=k.environmentInjector||k.ngModuleRef,s=k.directives,a=k.bindings}let d=l?t:new zo(ir(t)),u=i||this.parentInjector;if(!o&&d.ngModule==null){let N=(l?u:this.parentInjector).get($e,null);N&&(o=N)}let h=ir(d.componentType??{}),p=Bu(this._lContainer,h?.id??null),m=p?.firstChild??null,w=d.create(u,r,m,o,s,a);return this.insertImpl(w.hostView,c,Xs(this._hostTNode,p)),w}insert(t,e){return this.insertImpl(t,e,!0)}insertImpl(t,e,i){let r=t._lView;if(PD(r)){let a=this.indexOf(t);if(a!==-1)this.detach(a);else{let l=r[Et],c=new n(l,l[en],l[Et]);c.detach(c.indexOf(t))}}let o=this._adjustIndex(e),s=this._lContainer;return Gl(s,r,o,i),t.attachToViewContainerRef(),Om(bg(s),o,t),t}move(t,e){return this.insert(t,e)}indexOf(t){let e=AE(this._lContainer);return e!==null?e.indexOf(t):-1}remove(t){let e=this._adjustIndex(t,-1),i=Ll(this._lContainer,e);i&&(Dl(bg(this._lContainer),e),nf(i[$],i))}detach(t){let e=this._adjustIndex(t,-1),i=Ll(this._lContainer,e);return i&&Dl(bg(this._lContainer),e)!=null?new Yr(i):null}_adjustIndex(t,e=0){return t??this.length+e}};function AE(n){return n[wl]}function bg(n){return n[wl]||(n[wl]=[])}function D0(n,t){let e,i=t[n.index];return ai(i)?e=i:(e=r0(i,t,null,n),t[n.index]=e,Ey(t,e)),eN(e,t,n,i),new qg(e,n,t)}function JO(n,t){let e=n[ze],i=e.createComment(""),r=jn(t,n),o=e.parentNode(r);return Vu(e,o,i,e.nextSibling(r),!1),i}var eN=iN,tN=()=>!1;function nN(n,t,e){return tN(n,t,e)}function iN(n,t,e,i){if(n[Wr])return;let r;e.type&8?r=Bn(i):r=JO(t,e),n[Wr]=r}var Kg=class n{queryList;matches=null;constructor(t){this.queryList=t}clone(){return new n(this.queryList)}setDirty(){this.queryList.setDirty()}},Yg=class n{queries;constructor(t=[]){this.queries=t}createEmbeddedView(t){let e=t.queries;if(e!==null){let i=t.contentQueries!==null?t.contentQueries[0]:e.length,r=[];for(let o=0;o<i;o++){let s=e.getByIndex(o),a=this.queries[s.indexInDeclarationView];r.push(a.clone())}return new n(r)}return null}insertView(t){this.dirtyQueriesWithMatches(t)}detachView(t){this.dirtyQueriesWithMatches(t)}finishViewCreation(t){this.dirtyQueriesWithMatches(t)}dirtyQueriesWithMatches(t){for(let e=0;e<this.queries.length;e++)Py(t,e).matches!==null&&this.queries[e].setDirty()}},$u=class{flags;read;predicate;constructor(t,e,i=null){this.flags=e,this.read=i,typeof t=="string"?this.predicate=lN(t):this.predicate=t}},Zg=class n{queries;constructor(t=[]){this.queries=t}elementStart(t,e){for(let i=0;i<this.queries.length;i++)this.queries[i].elementStart(t,e)}elementEnd(t){for(let e=0;e<this.queries.length;e++)this.queries[e].elementEnd(t)}embeddedTView(t){let e=null;for(let i=0;i<this.length;i++){let r=e!==null?e.length:0,o=this.getByIndex(i).embeddedTView(t,r);o&&(o.indexInDeclarationView=i,e!==null?e.push(o):e=[o])}return e!==null?new n(e):null}template(t,e){for(let i=0;i<this.queries.length;i++)this.queries[i].template(t,e)}getByIndex(t){return this.queries[t]}get length(){return this.queries.length}track(t){this.queries.push(t)}},Xg=class n{metadata;matches=null;indexInDeclarationView=-1;crossesNgTemplate=!1;_declarationNodeIndex;_appliesToNextNode=!0;constructor(t,e=-1){this.metadata=t,this._declarationNodeIndex=e}elementStart(t,e){this.isApplyingToNode(e)&&this.matchTNode(t,e)}elementEnd(t){this._declarationNodeIndex===t.index&&(this._appliesToNextNode=!1)}template(t,e){this.elementStart(t,e)}embeddedTView(t,e){return this.isApplyingToNode(t)?(this.crossesNgTemplate=!0,this.addMatch(-t.index,e),new n(this.metadata)):null}isApplyingToNode(t){if(this._appliesToNextNode&&(this.metadata.flags&1)!==1){let e=this._declarationNodeIndex,i=t.parent;for(;i!==null&&i.type&8&&i.index!==e;)i=i.parent;return e===(i!==null?i.index:-1)}return this._appliesToNextNode}matchTNode(t,e){let i=this.metadata.predicate;if(Array.isArray(i))for(let r=0;r<i.length;r++){let o=i[r];this.matchTNodeWithReadOption(t,e,rN(e,o)),this.matchTNodeWithReadOption(t,e,ku(e,t,o,!1,!1))}else i===Tt?e.type&4&&this.matchTNodeWithReadOption(t,e,-1):this.matchTNodeWithReadOption(t,e,ku(e,t,i,!1,!1))}matchTNodeWithReadOption(t,e,i){if(i!==null){let r=this.metadata.read;if(r!==null)if(r===z||r===ht||r===Tt&&e.type&4)this.addMatch(e.index,-2);else{let o=ku(e,t,r,!1,!1);o!==null&&this.addMatch(e.index,o)}else this.addMatch(e.index,i)}}addMatch(t,e){this.matches===null?this.matches=[t,e]:this.matches.push(t,e)}};function rN(n,t){let e=n.localNames;if(e!==null){for(let i=0;i<e.length;i+=2)if(e[i]===t)return e[i+1]}return null}function oN(n,t){return n.type&11?ea(n,t):n.type&4?af(n,t):null}function sN(n,t,e,i){return e===-1?oN(t,n):e===-2?aN(n,t,i):Nl(n,n[$],e,t)}function aN(n,t,e){if(e===z)return ea(t,n);if(e===Tt)return af(t,n);if(e===ht)return D0(t,n)}function E0(n,t,e,i){let r=t[Ai].queries[i];if(r.matches===null){let o=n.data,s=e.matches,a=[];for(let l=0;s!==null&&l<s.length;l+=2){let c=s[l];if(c<0)a.push(null);else{let d=o[c];a.push(sN(t,d,s[l+1],e.metadata.read))}}r.matches=a}return r.matches}function Qg(n,t,e,i){let r=n.queries.getByIndex(e),o=r.matches;if(o!==null){let s=E0(n,t,r,e);for(let a=0;a<o.length;a+=2){let l=o[a];if(l>0)i.push(s[a/2]);else{let c=o[a+1],d=t[-l];for(let u=ot;u<d.length;u++){let h=d[u];h[$r]===h[Et]&&Qg(h[$],h,c,i)}if(d[Vo]!==null){let u=d[Vo];for(let h=0;h<u.length;h++){let p=u[h];Qg(p[$],p,c,i)}}}}}return i}function Ny(n,t){return n[Ai].queries[t].queryList}function w0(n,t,e){let i=new ui((e&4)===4);return VD(n,t,i,i.destroy),(t[Ai]??=new Yg).queries.push(new Kg(i))-1}function S0(n,t,e){let i=Qe();return i.firstCreatePass&&(I0(i,new $u(n,t,e),-1),(t&2)===2&&(i.staticViewQueries=!0)),w0(i,Q(),t)}function T0(n,t,e,i){let r=Qe();if(r.firstCreatePass){let o=Nt();I0(r,new $u(t,e,i),o.index),cN(r,n),(e&2)===2&&(r.staticContentQueries=!0)}return w0(r,Q(),e)}function lN(n){return n.split(",").map(t=>t.trim())}function I0(n,t,e){n.queries===null&&(n.queries=new Zg),n.queries.track(new Xg(t,e))}function cN(n,t){let e=n.contentQueries||(n.contentQueries=[]),i=e.length?e[e.length-1]:-1;t!==i&&e.push(n.queries.length-1,t)}function Py(n,t){return n.queries.getByIndex(t)}function x0(n,t){let e=n[$],i=Py(e,t);return i.crossesNgTemplate?Qg(e,n,t,[]):E0(e,n,i,t)}function M0(n,t,e){let i,r=el(()=>{i._dirtyCounter();let o=dN(i,n);if(t&&o===void 0)throw new S(-951,!1);return o});return i=r[ct],i._dirtyCounter=O(0),i._flatValue=void 0,r}function Fy(n){return M0(!0,!1,n)}function Ly(n){return M0(!0,!0,n)}function k0(n,t){let e=n[ct];e._lView=Q(),e._queryIndex=t,e._queryList=Ny(e._lView,t),e._queryList.onDirty(()=>e._dirtyCounter.update(i=>i+1))}function dN(n,t){let e=n._lView,i=n._queryIndex;if(e===void 0||i===void 0||e[ie]&4)return t?void 0:Ht;let r=Ny(e,i),o=x0(e,i);return r.reset(o,iw),t?r.first:r._changesDetected||n._flatValue===void 0?n._flatValue=r.toArray():n._flatValue}var Fi=class{},df=class{};var zu=class extends Fi{ngModuleType;_parent;_bootstrapComponents=[];_r3Injector;instance;destroyCbs=[];componentFactoryResolver=new Uu(this);constructor(t,e,i,r=!0){super(),this.ngModuleType=t,this._parent=e;let o=Mm(t);this._bootstrapComponents=Mw(o.bootstrap),this._r3Injector=dg(t,e,[{provide:Fi,useValue:this},{provide:ql,useValue:this.componentFactoryResolver},...i],_l(t),new Set(["environment"])),r&&this.resolveInjectorInitializers()}resolveInjectorInitializers(){this._r3Injector.resolveInjectorInitializers(),this.instance=this._r3Injector.get(this.ngModuleType)}get injector(){return this._r3Injector}destroy(){let t=this._r3Injector;!t.destroyed&&t.destroy(),this.destroyCbs.forEach(e=>e()),this.destroyCbs=null}onDestroy(t){this.destroyCbs.push(t)}},Wu=class extends df{moduleType;constructor(t){super(),this.moduleType=t}create(t){return new zu(this.moduleType,t,[])}};var Vl=class extends Fi{injector;componentFactoryResolver=new Uu(this);instance=null;constructor(t){super();let e=new Ro([...t.providers,{provide:Fi,useValue:this},{provide:ql,useValue:this.componentFactoryResolver}],t.parent||Us(),t.debugName,new Set(["environment"]));this.injector=e,t.runEnvironmentInitializers&&e.resolveInjectorInitializers()}destroy(){this.injector.destroy()}onDestroy(t){this.injector.onDestroy(t)}};function Kl(n,t,e=null){return new Vl({providers:n,parent:t,debugName:e,runEnvironmentInitializers:!0}).injector}var uN=(()=>{class n{_injector;cachedInjectors=new Map;constructor(e){this._injector=e}getOrCreateStandaloneInjector(e){if(!e.standalone)return null;if(!this.cachedInjectors.has(e)){let i=Fm(!1,e.type),r=i.length>0?Kl([i],this._injector,""):null;this.cachedInjectors.set(e,r)}return this.cachedInjectors.get(e)}ngOnDestroy(){try{for(let e of this.cachedInjectors.values())e!==null&&e.destroy()}finally{this.cachedInjectors.clear()}}static \u0275prov=C({token:n,providedIn:"environment",factory:()=>new n(ne($e))})}return n})();function J(n){return jl(()=>{let t=A0(n),e=V(g({},t),{decls:n.decls,vars:n.vars,template:n.template,consts:n.consts||null,ngContentSelectors:n.ngContentSelectors,onPush:n.changeDetection===uy.OnPush,directiveDefs:null,pipeDefs:null,dependencies:t.standalone&&n.dependencies||null,getStandaloneInjector:t.standalone?r=>r.get(uN).getOrCreateStandaloneInjector(e):null,getExternalStyles:null,signals:n.signals??!1,data:n.data||{},encapsulation:n.encapsulation||fi.Emulated,styles:n.styles||Ht,_:null,schemas:n.schemas||null,tView:null,id:""});t.standalone&&pr("NgStandalone"),R0(e);let i=n.dependencies;return e.directiveDefs=RE(i,fN),e.pipeDefs=RE(i,vD),e.id=mN(e),e})}function fN(n){return ir(n)||km(n)}function Ce(n){return jl(()=>({type:n.type,bootstrap:n.bootstrap||Ht,declarations:n.declarations||Ht,imports:n.imports||Ht,exports:n.exports||Ht,transitiveCompileScopes:null,schemas:n.schemas||null,id:n.id||null}))}function hN(n,t){if(n==null)return Ur;let e={};for(let i in n)if(n.hasOwnProperty(i)){let r=n[i],o,s,a,l;Array.isArray(r)?(a=r[0],o=r[1],s=r[2]??o,l=r[3]||null):(o=r,s=r,a=Ju.None,l=null),e[o]=[i,a,l],t[o]=s}return e}function pN(n){if(n==null)return Ur;let t={};for(let e in n)n.hasOwnProperty(e)&&(t[n[e]]=e);return t}function Y(n){return jl(()=>{let t=A0(n);return R0(t),t})}function ia(n){return{type:n.type,name:n.name,factory:null,pure:n.pure!==!1,standalone:n.standalone??!0,onDestroy:n.type.prototype.ngOnDestroy||null}}function A0(n){let t={};return{type:n.type,providersResolver:null,viewProvidersResolver:null,factory:null,hostBindings:n.hostBindings||null,hostVars:n.hostVars||0,hostAttrs:n.hostAttrs||null,contentQueries:n.contentQueries||null,declaredInputs:t,inputConfig:n.inputs||Ur,exportAs:n.exportAs||null,standalone:n.standalone??!0,signals:n.signals===!0,selectors:n.selectors||Ht,viewQuery:n.viewQuery||null,features:n.features||null,setInput:null,resolveHostDirectives:null,hostDirectives:null,controlDef:null,inputs:hN(n.inputs,t),outputs:pN(n.outputs),debugInfo:null}}function R0(n){n.features?.forEach(t=>t(n))}function RE(n,t){return n?()=>{let e=typeof n=="function"?n():n,i=[];for(let r of e){let o=t(r);o!==null&&i.push(o)}return i}:null}function mN(n){let t=0,e=typeof n.consts=="function"?"":n.consts,i=[n.selectors,n.ngContentSelectors,n.hostVars,n.hostAttrs,e,n.vars,n.decls,n.encapsulation,n.standalone,n.signals,n.exportAs,JSON.stringify(n.inputs),JSON.stringify(n.outputs),Object.getOwnPropertyNames(n.type.prototype),!!n.contentQueries,!!n.viewQuery];for(let o of i.join("|"))t=Math.imul(31,t)+o.charCodeAt(0)<<0;return t+=2147483648,"c"+t}function gN(n){return Object.getPrototypeOf(n.prototype).constructor}function St(n){let t=gN(n.type),e=!0,i=[n];for(;t;){let r;if(Oi(n))r=t.\u0275cmp||t.\u0275dir;else{if(t.\u0275cmp)throw new S(903,!1);r=t.\u0275dir}if(r){if(e){i.push(r);let s=n;s.inputs=_g(n.inputs),s.declaredInputs=_g(n.declaredInputs),s.outputs=_g(n.outputs);let a=r.hostBindings;a&&CN(n,a);let l=r.viewQuery,c=r.contentQueries;if(l&&bN(n,l),c&&_N(n,c),yN(n,r),yD(n.outputs,r.outputs),Oi(r)&&r.data.animation){let d=n.data;d.animation=(d.animation||[]).concat(r.data.animation)}}let o=r.features;if(o)for(let s=0;s<o.length;s++){let a=o[s];a&&a.ngInherit&&a(n),a===St&&(e=!1)}}t=Object.getPrototypeOf(t)}vN(i)}function yN(n,t){for(let e in t.inputs){if(!t.inputs.hasOwnProperty(e)||n.inputs.hasOwnProperty(e))continue;let i=t.inputs[e];i!==void 0&&(n.inputs[e]=i,n.declaredInputs[e]=t.declaredInputs[e])}}function vN(n){let t=0,e=null;for(let i=n.length-1;i>=0;i--){let r=n[i];r.hostVars=t+=r.hostVars,r.hostAttrs=Ys(r.hostAttrs,e=Ys(e,r.hostAttrs))}}function _g(n){return n===Ur?{}:n===Ht?[]:n}function bN(n,t){let e=n.viewQuery;e?n.viewQuery=(i,r)=>{t(i,r),e(i,r)}:n.viewQuery=t}function _N(n,t){let e=n.contentQueries;e?n.contentQueries=(i,r,o)=>{t(i,r,o),e(i,r,o)}:n.contentQueries=t}function CN(n,t){let e=n.hostBindings;e?n.hostBindings=(i,r)=>{t(i,r),e(i,r)}:n.hostBindings=t}function O0(n,t,e,i,r,o,s,a){if(e.firstCreatePass){n.mergedAttrs=Ys(n.mergedAttrs,n.attrs);let d=n.tView=Cy(2,n,r,o,s,e.directiveRegistry,e.pipeRegistry,null,e.schemas,e.consts,null);e.queries!==null&&(e.queries.template(e,n),d.queries=e.queries.embeddedTView(n))}a&&(n.flags|=a),Ws(n,!1);let l=EN(e,t,n,i);_u()&&xy(e,t,l,n),Zs(l,t);let c=r0(l,t,l,n);t[i+Xe]=c,Ey(t,c),nN(c,n,t)}function DN(n,t,e,i,r,o,s,a,l,c,d){let u=e+Xe,h;return t.firstCreatePass?(h=na(t,u,4,s||null,a||null),Qm()&&u0(t,n,h,Sn(t.consts,c),Ww),WE(t,h)):h=t.data[u],O0(h,n,t,e,i,r,o,l),Sl(h)&&ky(t,n,h),c!=null&&of(n,h,d),h}function Qs(n,t,e,i,r,o,s,a,l,c,d){let u=e+Xe,h;if(t.firstCreatePass){if(h=na(t,u,4,s||null,a||null),c!=null){let p=Sn(t.consts,c);h.localNames=[];for(let m=0;m<p.length;m+=2)h.localNames.push(p[m],-1)}}else h=t.data[u];return O0(h,n,t,e,i,r,o,l),c!=null&&of(n,h,d),h}function Wt(n,t,e,i,r,o,s,a){let l=Q(),c=Qe(),d=Sn(c.consts,o);return DN(l,c,n,t,e,i,r,d,void 0,s,a),Wt}function ra(n,t,e,i,r,o,s,a){let l=Q(),c=Qe(),d=Sn(c.consts,o);return Qs(l,c,n,t,e,i,r,d,void 0,s,a),ra}var EN=wN;function wN(n,t,e,i){return Cu(!0),t[ze].createComment("")}var uf=(()=>{class n{log(e){console.log(e)}warn(e){console.warn(e)}static \u0275fac=function(i){return new(i||n)};static \u0275prov=C({token:n,factory:n.\u0275fac,providedIn:"platform"})}return n})();function qo(n){return typeof n=="function"&&n[ct]!==void 0}var Vy=new b("");function Xr(n){return!!n&&typeof n.then=="function"}function By(n){return!!n&&typeof n.subscribe=="function"}var jy=new b("");function ff(n){return rr([{provide:jy,multi:!0,useValue:n}])}var Uy=(()=>{class n{resolve;reject;initialized=!1;done=!1;donePromise=new Promise((e,i)=>{this.resolve=e,this.reject=i});appInits=f(jy,{optional:!0})??[];injector=f(re);constructor(){}runInitializers(){if(this.initialized)return;let e=[];for(let r of this.appInits){let o=$t(this.injector,r);if(Xr(o))e.push(o);else if(By(o)){let s=new Promise((a,l)=>{o.subscribe({complete:a,error:l})});e.push(s)}}let i=()=>{this.done=!0,this.resolve()};Promise.all(e).then(()=>{i()}).catch(r=>{this.reject(r)}),e.length===0&&i(),this.initialized=!0}static \u0275fac=function(i){return new(i||n)};static \u0275prov=C({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})(),hf=new b("");function N0(){jp(()=>{let n="";throw new S(600,n)})}function P0(n){return n.isBoundToModule}var SN=10;var nn=(()=>{class n{_runningTick=!1;_destroyed=!1;_destroyListeners=[];_views=[];internalErrorHandler=f(Hn);afterRenderManager=f(tf);zonelessEnabled=f(Ml);rootEffectScheduler=f(Eu);dirtyFlags=0;tracingSnapshot=null;allTestViews=new Set;autoDetectTestViews=new Set;includeAllTestViews=!1;afterTick=new D;get allViews(){return[...(this.includeAllTestViews?this.allTestViews:this.autoDetectTestViews).keys(),...this._views]}get destroyed(){return this._destroyed}componentTypes=[];components=[];internalPendingTask=f(Kr);get isStable(){return this.internalPendingTask.hasPendingTasksObservable.pipe(ue(e=>!e))}constructor(){f(hr,{optional:!0})}whenStable(){let e;return new Promise(i=>{e=this.isStable.subscribe({next:r=>{r&&i()}})}).finally(()=>{e.unsubscribe()})}_injector=f($e);_rendererFactory=null;get injector(){return this._injector}bootstrap(e,i){return this.bootstrapImpl(e,i)}bootstrapImpl(e,i,r=re.NULL){return this._injector.get(L).run(()=>{Pe(Se.BootstrapComponentStart);let s=e instanceof lf;if(!this._injector.get(Uy).done){let m="";throw new S(405,m)}let l;s?l=e:l=this._injector.get(ql).resolveComponentFactory(e),this.componentTypes.push(l.componentType);let c=P0(l)?void 0:this._injector.get(Fi),d=i||l.selector,u=l.create(r,[],d,c),h=u.location.nativeElement,p=u.injector.get(Vy,null);return p?.registerApplication(h),u.onDestroy(()=>{this.detachView(u.hostView),Ol(this.components,u),p?.unregisterApplication(h)}),this._loadComponent(u),Pe(Se.BootstrapComponentEnd,u),u})}tick(){this.zonelessEnabled||(this.dirtyFlags|=1),this._tick()}_tick(){Pe(Se.ChangeDetectionStart),this.tracingSnapshot!==null?this.tracingSnapshot.run(ef.CHANGE_DETECTION,this.tickImpl):this.tickImpl()}tickImpl=()=>{if(this._runningTick)throw Pe(Se.ChangeDetectionEnd),new S(101,!1);let e=B(null);try{this._runningTick=!0,this.synchronize()}finally{this._runningTick=!1,this.tracingSnapshot?.dispose(),this.tracingSnapshot=null,B(e),this.afterTick.next(),Pe(Se.ChangeDetectionEnd)}};synchronize(){this._rendererFactory===null&&!this._injector.destroyed&&(this._rendererFactory=this._injector.get(zt,null,{optional:!0}));let e=0;for(;this.dirtyFlags!==0&&e++<SN;){Pe(Se.ChangeDetectionSyncStart);try{this.synchronizeOnce()}finally{Pe(Se.ChangeDetectionSyncEnd)}}}synchronizeOnce(){this.dirtyFlags&16&&(this.dirtyFlags&=-17,this.rootEffectScheduler.flush());let e=!1;if(this.dirtyFlags&7){let i=!!(this.dirtyFlags&1);this.dirtyFlags&=-8,this.dirtyFlags|=8;for(let{_lView:r}of this.allViews){if(!i&&!Tl(r))continue;let o=i&&!this.zonelessEnabled?0:1;e0(r,o),e=!0}if(this.dirtyFlags&=-5,this.syncDirtyFlagsWithViews(),this.dirtyFlags&23)return}e||(this._rendererFactory?.begin?.(),this._rendererFactory?.end?.()),this.dirtyFlags&8&&(this.dirtyFlags&=-9,this.afterRenderManager.execute()),this.syncDirtyFlagsWithViews()}syncDirtyFlagsWithViews(){if(this.allViews.some(({_lView:e})=>Tl(e))){this.dirtyFlags|=2;return}else this.dirtyFlags&=-8}attachView(e){let i=e;this._views.push(i),i.attachToAppRef(this)}detachView(e){let i=e;Ol(this._views,i),i.detachFromAppRef()}_loadComponent(e){this.attachView(e.hostView);try{this.tick()}catch(r){this.internalErrorHandler(r)}this.components.push(e),this._injector.get(hf,[]).forEach(r=>r(e))}ngOnDestroy(){if(!this._destroyed)try{this._destroyListeners.forEach(e=>e()),this._views.slice().forEach(e=>e.destroy())}finally{this._destroyed=!0,this._views=[],this._destroyListeners=[]}}onDestroy(e){return this._destroyListeners.push(e),()=>Ol(this._destroyListeners,e)}destroy(){if(this._destroyed)throw new S(406,!1);let e=this._injector;e.destroy&&!e.destroyed&&e.destroy()}get viewCount(){return this._views.length}static \u0275fac=function(i){return new(i||n)};static \u0275prov=C({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})();function Ol(n,t){let e=n.indexOf(t);e>-1&&n.splice(e,1)}function pf(n,t){let e=Q(),i=Gr();if($n(e,i,t)){let r=Qe(),o=xl();if(sf(o,r,e,n,t))Ri(o)&&zw(e,o.index);else{let a=jn(o,e);Gw(e[ze],a,null,o.value,n,t,null)}}return pf}function Le(n,t,e,i){let r=Q(),o=Gr();if($n(r,o,t)){let s=Qe(),a=xl();iO(a,r,n,t,e,i)}return Le}var Jg=class{destroy(t){}updateValue(t,e){}swap(t,e){let i=Math.min(t,e),r=Math.max(t,e),o=this.detach(r);if(r-i>1){let s=this.detach(i);this.attach(i,o),this.attach(r,s)}else this.attach(i,o)}move(t,e){this.attach(e,this.detach(t))}};function Cg(n,t,e,i,r){return n===e&&Object.is(t,i)?1:Object.is(r(n,t),r(e,i))?-1:0}function TN(n,t,e,i){let r,o,s=0,a=n.length-1,l=void 0;if(Array.isArray(t)){B(i);let c=t.length-1;for(B(null);s<=a&&s<=c;){let d=n.at(s),u=t[s],h=Cg(s,d,s,u,e);if(h!==0){h<0&&n.updateValue(s,u),s++;continue}let p=n.at(a),m=t[c],w=Cg(a,p,c,m,e);if(w!==0){w<0&&n.updateValue(a,m),a--,c--;continue}let k=e(s,d),N=e(a,p),De=e(s,u);if(Object.is(De,N)){let nt=e(c,m);Object.is(nt,k)?(n.swap(s,a),n.updateValue(a,m),c--,a--):n.move(a,s),n.updateValue(s,u),s++;continue}if(r??=new Gu,o??=NE(n,s,a,e),ey(n,r,s,De))n.updateValue(s,u),s++,a++;else if(o.has(De))r.set(k,n.detach(s)),a--;else{let nt=n.create(s,t[s]);n.attach(s,nt),s++,a++}}for(;s<=c;)OE(n,r,e,s,t[s]),s++}else if(t!=null){B(i);let c=t[Symbol.iterator]();B(null);let d=c.next();for(;!d.done&&s<=a;){let u=n.at(s),h=d.value,p=Cg(s,u,s,h,e);if(p!==0)p<0&&n.updateValue(s,h),s++,d=c.next();else{r??=new Gu,o??=NE(n,s,a,e);let m=e(s,h);if(ey(n,r,s,m))n.updateValue(s,h),s++,a++,d=c.next();else if(!o.has(m))n.attach(s,n.create(s,h)),s++,a++,d=c.next();else{let w=e(s,u);r.set(w,n.detach(s)),a--}}}for(;!d.done;)OE(n,r,e,n.length,d.value),d=c.next()}for(;s<=a;)n.destroy(n.detach(a--));r?.forEach(c=>{n.destroy(c)})}function ey(n,t,e,i){return t!==void 0&&t.has(i)?(n.attach(e,t.get(i)),t.delete(i),!0):!1}function OE(n,t,e,i,r){if(ey(n,t,i,e(i,r)))n.updateValue(i,r);else{let o=n.create(i,r);n.attach(i,o)}}function NE(n,t,e,i){let r=new Set;for(let o=t;o<=e;o++)r.add(i(o,n.at(o)));return r}var Gu=class{kvMap=new Map;_vMap=void 0;has(t){return this.kvMap.has(t)}delete(t){if(!this.has(t))return!1;let e=this.kvMap.get(t);return this._vMap!==void 0&&this._vMap.has(e)?(this.kvMap.set(t,this._vMap.get(e)),this._vMap.delete(e)):this.kvMap.delete(t),!0}get(t){return this.kvMap.get(t)}set(t,e){if(this.kvMap.has(t)){let i=this.kvMap.get(t);this._vMap===void 0&&(this._vMap=new Map);let r=this._vMap;for(;r.has(i);)i=r.get(i);r.set(i,e)}else this.kvMap.set(t,e)}forEach(t){for(let[e,i]of this.kvMap)if(t(i,e),this._vMap!==void 0){let r=this._vMap;for(;r.has(i);)i=r.get(i),t(i,e)}}};function ee(n,t,e,i,r,o,s,a){pr("NgControlFlow");let l=Q(),c=Qe(),d=Sn(c.consts,o);return Qs(l,c,n,t,e,i,r,d,256,s,a),Hy}function Hy(n,t,e,i,r,o,s,a){pr("NgControlFlow");let l=Q(),c=Qe(),d=Sn(c.consts,o);return Qs(l,c,n,t,e,i,r,d,512,s,a),Hy}function te(n,t){pr("NgControlFlow");let e=Q(),i=Gr(),r=e[i]!==zn?e[i]:-1,o=r!==-1?qu(e,Xe+r):void 0,s=0;if($n(e,i,n)){let a=B(null);try{if(o!==void 0&&s0(o,s),n!==-1){let l=Xe+n,c=qu(e,l),d=ry(e[$],l),u=l0(c,d,e),h=Wl(e,d,t,{dehydratedView:u});Gl(c,h,s,Xs(d,u))}}finally{B(a)}}else if(o!==void 0){let a=o0(o,s);a!==void 0&&(a[ft]=t)}}var ty=class{lContainer;$implicit;$index;constructor(t,e,i){this.lContainer=t,this.$implicit=e,this.$index=i}get $count(){return this.lContainer.length-ot}};function $y(n){return n}function Qr(n,t){return t}var ny=class{hasEmptyBlock;trackByFn;liveCollection;constructor(t,e,i){this.hasEmptyBlock=t,this.trackByFn=e,this.liveCollection=i}};function pi(n,t,e,i,r,o,s,a,l,c,d,u,h){pr("NgControlFlow");let p=Q(),m=Qe(),w=l!==void 0,k=Q(),N=a?s.bind(k[tn][ft]):s,De=new ny(w,N);k[Xe+n]=De,Qs(p,m,n+1,t,e,i,r,Sn(m.consts,o),256),w&&Qs(p,m,n+2,l,c,d,u,Sn(m.consts,h),512)}var iy=class extends Jg{lContainer;hostLView;templateTNode;operationsCounter=void 0;needsIndexUpdate=!1;constructor(t,e,i){super(),this.lContainer=t,this.hostLView=e,this.templateTNode=i}get length(){return this.lContainer.length-ot}at(t){return this.getLView(t)[ft].$implicit}attach(t,e){let i=e[No];this.needsIndexUpdate||=t!==this.length,Gl(this.lContainer,e,t,Xs(this.templateTNode,i)),IN(this.lContainer,t)}detach(t){return this.needsIndexUpdate||=t!==this.length-1,xN(this.lContainer,t),MN(this.lContainer,t)}create(t,e){let i=Bu(this.lContainer,this.templateTNode.tView.ssrId);return Wl(this.hostLView,this.templateTNode,new ty(this.lContainer,e,t),{dehydratedView:i})}destroy(t){nf(t[$],t)}updateValue(t,e){this.getLView(t)[ft].$implicit=e}reset(){this.needsIndexUpdate=!1}updateIndexes(){if(this.needsIndexUpdate)for(let t=0;t<this.length;t++)this.getLView(t)[ft].$index=t}getLView(t){return kN(this.lContainer,t)}};function mi(n){let t=B(null),e=lr();try{let i=Q(),r=i[$],o=i[e],s=e+1,a=qu(i,s);if(o.liveCollection===void 0){let c=ry(r,s);o.liveCollection=new iy(a,i,c)}else o.liveCollection.reset();let l=o.liveCollection;if(TN(l,n,o.trackByFn,t),l.updateIndexes(),o.hasEmptyBlock){let c=Gr(),d=l.length===0;if($n(i,c,d)){let u=e+2,h=qu(i,u);if(d){let p=ry(r,u),m=l0(h,p,i),w=Wl(i,p,void 0,{dehydratedView:m});Gl(h,w,0,Xs(p,m))}else r.firstUpdatePass&&TO(h),s0(h,0)}}}finally{B(t)}}function qu(n,t){return n[t]}function IN(n,t){if(n.length<=ot)return;let e=ot+t,i=n[e],r=i?i[zr]:void 0;if(i&&r&&r.detachedLeaveAnimationFns&&r.detachedLeaveAnimationFns.length>0){let o=i[or];PR(o,r),$o.delete(i[sr]),r.detachedLeaveAnimationFns=void 0}}function xN(n,t){if(n.length<=ot)return;let e=ot+t,i=n[e],r=i?i[zr]:void 0;r&&r.leave&&r.leave.size>0&&(r.detachedLeaveAnimationFns=[])}function MN(n,t){return Ll(n,t)}function kN(n,t){return o0(n,t)}function ry(n,t){return uu(n,t)}function ge(n,t,e){let i=Q(),r=Gr();if($n(i,r,t)){let o=Qe(),s=xl();JR(s,i,n,t,i[ze],e)}return ge}function oy(n,t,e,i,r){sf(t,n,e,r?"class":"style",i)}function y(n,t,e,i){let r=Q(),o=r[$],s=n+Xe,a=o.firstCreatePass?h0(s,r,2,t,Ww,Qm(),e,i):o.data[s];if(Ri(a)){let l=r[si].tracingService;if(l&&l.componentCreate){let c=o.data[a.directiveStart+a.componentOffset];return l.componentCreate(_0(c),()=>(PE(n,t,r,a,i),y))}}return PE(n,t,r,a,i),y}function PE(n,t,e,i,r){if(qw(i,e,n,t,F0),Sl(i)){let o=e[$];ky(o,e,i),mw(o,i,e)}r!=null&&of(e,i)}function v(){let n=Qe(),t=Nt(),e=Kw(t);return n.firstCreatePass&&p0(n,e),eg(e)&&tg(),Xm(),e.classesWithoutHost!=null&&CA(e)&&oy(n,e,Q(),e.classesWithoutHost,!0),e.stylesWithoutHost!=null&&DA(e)&&oy(n,e,Q(),e.stylesWithoutHost,!1),v}function me(n,t,e,i){return y(n,t,e,i),v(),me}function Me(n,t,e,i){let r=Q(),o=r[$],s=n+Xe,a=o.firstCreatePass?jO(s,o,2,t,e,i):o.data[s];return qw(a,r,n,t,F0),i!=null&&of(r,a),Me}function ke(){let n=Nt(),t=Kw(n);return eg(t)&&tg(),Xm(),ke}function Ko(n,t,e,i){return Me(n,t,e,i),ke(),Ko}var F0=(n,t,e,i,r)=>(Cu(!0),Dw(t[ze],i,QD()));function Pt(){return Q()}function Jr(n,t,e){let i=Q(),r=Gr();if($n(i,r,t)){let o=Qe(),s=xl();$w(s,i,n,t,i[ze],e)}return Jr}var kl=void 0;function AN(n){let t=Math.floor(Math.abs(n)),e=n.toString().replace(/^[^.]*\.?/,"").length;return t===1&&e===0?1:5}var RN=["en",[["a","p"],["AM","PM"]],[["AM","PM"]],[["S","M","T","W","T","F","S"],["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],["Su","Mo","Tu","We","Th","Fr","Sa"]],kl,[["J","F","M","A","M","J","J","A","S","O","N","D"],["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],["January","February","March","April","May","June","July","August","September","October","November","December"]],kl,[["B","A"],["BC","AD"],["Before Christ","Anno Domini"]],0,[6,0],["M/d/yy","MMM d, y","MMMM d, y","EEEE, MMMM d, y"],["h:mm\u202Fa","h:mm:ss\u202Fa","h:mm:ss\u202Fa z","h:mm:ss\u202Fa zzzz"],["{1}, {0}",kl,kl,kl],[".",",",";","%","+","-","E","\xD7","\u2030","\u221E","NaN",":"],["#,##0.###","#,##0%","\xA4#,##0.00","#E0"],"USD","$","US Dollar",{},"ltr",AN],Dg={};function pn(n){let t=ON(n),e=FE(t);if(e)return e;let i=t.split("-")[0];if(e=FE(i),e)return e;if(i==="en")return RN;throw new S(701,!1)}function FE(n){return n in Dg||(Dg[n]=Ln.ng&&Ln.ng.common&&Ln.ng.common.locales&&Ln.ng.common.locales[n]),Dg[n]}var at=(function(n){return n[n.LocaleId=0]="LocaleId",n[n.DayPeriodsFormat=1]="DayPeriodsFormat",n[n.DayPeriodsStandalone=2]="DayPeriodsStandalone",n[n.DaysFormat=3]="DaysFormat",n[n.DaysStandalone=4]="DaysStandalone",n[n.MonthsFormat=5]="MonthsFormat",n[n.MonthsStandalone=6]="MonthsStandalone",n[n.Eras=7]="Eras",n[n.FirstDayOfWeek=8]="FirstDayOfWeek",n[n.WeekendRange=9]="WeekendRange",n[n.DateFormat=10]="DateFormat",n[n.TimeFormat=11]="TimeFormat",n[n.DateTimeFormat=12]="DateTimeFormat",n[n.NumberSymbols=13]="NumberSymbols",n[n.NumberFormats=14]="NumberFormats",n[n.CurrencyCode=15]="CurrencyCode",n[n.CurrencySymbol=16]="CurrencySymbol",n[n.CurrencyName=17]="CurrencyName",n[n.Currencies=18]="Currencies",n[n.Directionality=19]="Directionality",n[n.PluralCase=20]="PluralCase",n[n.ExtraData=21]="ExtraData",n})(at||{});function ON(n){return n.toLowerCase().replace(/_/g,"-")}var Yl="en-US";var NN=Yl;function L0(n){typeof n=="string"&&(NN=n.toLowerCase().replace(/_/g,"-"))}function fe(n,t,e){let i=Q(),r=Qe(),o=Nt();return PN(r,i,i[ze],o,n,t,e),fe}function oa(n,t,e){let i=Q(),r=Qe(),o=Nt();return(o.type&3||e)&&v0(o,r,i,e,i[ze],n,t,Ru(o,i,t)),oa}function PN(n,t,e,i,r,o,s){let a=!0,l=null;if((i.type&3||s)&&(l??=Ru(i,t,o),v0(i,n,t,s,e,r,o,l)&&(a=!1)),a){let c=i.outputs?.[r],d=i.hostDirectiveOutputs?.[r];if(d&&d.length)for(let u=0;u<d.length;u+=2){let h=d[u],p=d[u+1];l??=Ru(i,t,o),ME(i,t,h,p,r,l)}if(c&&c.length)for(let u of c)l??=Ru(i,t,o),ME(i,t,u,r,r,l)}}function R(n=1){return XD(n)}function FN(n,t){let e=null,i=_R(n);for(let r=0;r<t.length;r++){let o=t[r];if(o==="*"){e=r;continue}if(i===null?Aw(n,o,!0):ER(i,o))return r}return e}function Ft(n){let t=Q()[tn][en];if(!t.projection){let e=n?n.length:1,i=t.projection=wD(e,null),r=i.slice(),o=t.child;for(;o!==null;){if(o.type!==128){let s=n?FN(o,n):0;s!==null&&(r[s]?r[s].projectionNext=o:i[s]=o,r[s]=o)}o=o.next}}}function Ve(n,t=0,e,i,r,o){let s=Q(),a=Qe(),l=i?n+1:null;l!==null&&Qs(s,a,l,i,r,o,null,e);let c=na(a,Xe+n,16,null,e||null);c.projection===null&&(c.projection=t),rg();let u=!s[No]||Jm();s[tn][en].projection[c.projection]===null&&l!==null?LN(s,a,l):u&&!Xu(c)&&GR(a,s,c)}function LN(n,t,e){let i=Xe+e,r=t.data[i],o=n[i],s=Bu(o,r.tView.ssrId),a=Wl(n,r,void 0,{dehydratedView:s});Gl(o,a,0,Xs(r,s))}function In(n,t,e,i){return T0(n,t,e,i),In}function vt(n,t,e){return S0(n,t,e),vt}function W(n){let t=Q(),e=Qe(),i=gu();Il(i+1);let r=Py(e,i);if(n.dirty&&ND(t)===((r.metadata.flags&2)===2)){if(r.matches===null)n.reset([]);else{let o=x0(t,i);n.reset(o,iw),n.notifyOnChanges()}return!0}return!1}function G(){return Ny(Q(),gu())}function mf(n,t,e,i,r){return k0(t,T0(n,e,i,r)),mf}function gf(n,t,e,i){return k0(n,S0(t,e,i)),gf}function yf(n=1){Il(gu()+n)}function gi(n){let t=HD();return fu(t,Xe+n)}function Iu(n,t){return n<<17|t<<2}function Wo(n){return n>>17&32767}function VN(n){return(n&2)==2}function BN(n,t){return n&131071|t<<17}function sy(n){return n|2}function Js(n){return(n&131068)>>2}function Eg(n,t){return n&-131069|t<<2}function jN(n){return(n&1)===1}function ay(n){return n|1}function UN(n,t,e,i,r,o){let s=o?t.classBindings:t.styleBindings,a=Wo(s),l=Js(s);n[i]=e;let c=!1,d;if(Array.isArray(e)){let u=e;d=u[1],(d===null||js(u,d)>0)&&(c=!0)}else d=e;if(r)if(l!==0){let h=Wo(n[a+1]);n[i+1]=Iu(h,a),h!==0&&(n[h+1]=Eg(n[h+1],i)),n[a+1]=BN(n[a+1],i)}else n[i+1]=Iu(a,0),a!==0&&(n[a+1]=Eg(n[a+1],i)),a=i;else n[i+1]=Iu(l,0),a===0?a=i:n[l+1]=Eg(n[l+1],i),l=i;c&&(n[i+1]=sy(n[i+1])),LE(n,d,i,!0),LE(n,d,i,!1),HN(t,d,n,i,o),s=Iu(a,l),o?t.classBindings=s:t.styleBindings=s}function HN(n,t,e,i,r){let o=r?n.residualClasses:n.residualStyles;o!=null&&typeof t=="string"&&js(o,t)>=0&&(e[i+1]=ay(e[i+1]))}function LE(n,t,e,i){let r=n[e+1],o=t===null,s=i?Wo(r):Js(r),a=!1;for(;s!==0&&(a===!1||o);){let l=n[s],c=n[s+1];$N(l,t)&&(a=!0,n[s+1]=i?ay(c):sy(c)),s=i?Wo(c):Js(c)}a&&(n[e+1]=i?sy(r):ay(r))}function $N(n,t){return n===null||t==null||(Array.isArray(n)?n[1]:n)===t?!0:Array.isArray(n)&&typeof t=="string"?js(n,t)>=0:!1}var di={textEnd:0,key:0,keyEnd:0,value:0,valueEnd:0};function zN(n){return n.substring(di.key,di.keyEnd)}function WN(n){return GN(n),V0(n,B0(n,0,di.textEnd))}function V0(n,t){let e=di.textEnd;return e===t?-1:(t=di.keyEnd=qN(n,di.key=t,e),B0(n,t,e))}function GN(n){di.key=0,di.keyEnd=0,di.value=0,di.valueEnd=0,di.textEnd=n.length}function B0(n,t,e){for(;t<e&&n.charCodeAt(t)<=32;)t++;return t}function qN(n,t,e){for(;t<e&&n.charCodeAt(t)>32;)t++;return t}function sa(n,t,e){return j0(n,t,e,!1),sa}function ye(n,t){return j0(n,t,null,!0),ye}function xn(n){YN(tP,KN,n,!0)}function KN(n,t){for(let e=WN(t);e>=0;e=V0(t,e))lu(n,zN(t),!0)}function j0(n,t,e,i){let r=Q(),o=Qe(),s=ag(2);if(o.firstUpdatePass&&H0(o,n,s,i),t!==zn&&$n(r,s,t)){let a=o.data[lr()];$0(o,a,r,r[ze],n,r[s+1]=iP(t,e),i,s)}}function YN(n,t,e,i){let r=Qe(),o=ag(2);r.firstUpdatePass&&H0(r,null,o,i);let s=Q();if(e!==zn&&$n(s,o,e)){let a=r.data[lr()];if(z0(a,i)&&!U0(r,o)){let l=i?a.classesWithoutHost:a.stylesWithoutHost;l!==null&&(e=nu(l,e||"")),oy(r,a,s,e,i)}else nP(r,a,s,s[ze],s[o+1],s[o+1]=eP(n,t,e),i,o)}}function U0(n,t){return t>=n.expandoStartIndex}function H0(n,t,e,i){let r=n.data;if(r[e+1]===null){let o=r[lr()],s=U0(n,e);z0(o,i)&&t===null&&!s&&(t=!1),t=ZN(r,o,t,i),UN(r,o,t,e,s,i)}}function ZN(n,t,e,i){let r=qD(n),o=i?t.residualClasses:t.residualStyles;if(r===null)(i?t.classBindings:t.styleBindings)===0&&(e=wg(null,n,t,e,i),e=Bl(e,t.attrs,i),o=null);else{let s=t.directiveStylingLast;if(s===-1||n[s]!==r)if(e=wg(r,n,t,e,i),o===null){let l=XN(n,t,i);l!==void 0&&Array.isArray(l)&&(l=wg(null,n,t,l[1],i),l=Bl(l,t.attrs,i),QN(n,t,i,l))}else o=JN(n,t,i)}return o!==void 0&&(i?t.residualClasses=o:t.residualStyles=o),e}function XN(n,t,e){let i=e?t.classBindings:t.styleBindings;if(Js(i)!==0)return n[Wo(i)]}function QN(n,t,e,i){let r=e?t.classBindings:t.styleBindings;n[Wo(r)]=i}function JN(n,t,e){let i,r=t.directiveEnd;for(let o=1+t.directiveStylingLast;o<r;o++){let s=n[o].hostAttrs;i=Bl(i,s,e)}return Bl(i,t.attrs,e)}function wg(n,t,e,i,r){let o=null,s=e.directiveEnd,a=e.directiveStylingLast;for(a===-1?a=e.directiveStart:a++;a<s&&(o=t[a],i=Bl(i,o.hostAttrs,r),o!==n);)a++;return n!==null&&(e.directiveStylingLast=a),i}function Bl(n,t,e){let i=e?1:2,r=-1;if(t!==null)for(let o=0;o<t.length;o++){let s=t[o];typeof s=="number"?r=s:r===i&&(Array.isArray(n)||(n=n===void 0?[]:["",n]),lu(n,s,e?!0:t[++o]))}return n===void 0?null:n}function eP(n,t,e){if(e==null||e==="")return Ht;let i=[],r=hi(e);if(Array.isArray(r))for(let o=0;o<r.length;o++)n(i,r[o],!0);else if(r instanceof Set)for(let o of r)n(i,o,!0);else if(typeof r=="object")for(let o in r)r.hasOwnProperty(o)&&n(i,o,r[o]);else typeof r=="string"&&t(i,r);return i}function tP(n,t,e){let i=String(t);i!==""&&!i.includes(" ")&&lu(n,i,e)}function nP(n,t,e,i,r,o,s,a){r===zn&&(r=Ht);let l=0,c=0,d=0<r.length?r[0]:null,u=0<o.length?o[0]:null;for(;d!==null||u!==null;){let h=l<r.length?r[l+1]:void 0,p=c<o.length?o[c+1]:void 0,m=null,w;d===u?(l+=2,c+=2,h!==p&&(m=u,w=p)):u===null||d!==null&&d<u?(l+=2,m=d):(c+=2,m=u,w=p),m!==null&&$0(n,t,e,i,m,w,s,a),d=l<r.length?r[l]:null,u=c<o.length?o[c]:null}}function $0(n,t,e,i,r,o,s,a){if(!(t.type&3))return;let l=n.data,c=l[a+1],d=jN(c)?VE(l,t,e,r,Js(c),s):void 0;if(!Ku(d)){Ku(o)||VN(c)&&(o=VE(l,null,e,r,a,s));let u=zm(lr(),e);KR(i,s,u,r,o)}}function VE(n,t,e,i,r,o){let s=t===null,a;for(;r>0;){let l=n[r],c=Array.isArray(l),d=c?l[1]:l,u=d===null,h=e[r+1];h===zn&&(h=u?Ht:void 0);let p=u?cu(h,i):d===i?h:void 0;if(c&&!Ku(p)&&(p=cu(l,i)),Ku(p)&&(a=p,s))return a;let m=n[r+1];r=s?Wo(m):Js(m)}if(t!==null){let l=o?t.residualClasses:t.residualStyles;l!=null&&(a=cu(l,i))}return a}function Ku(n){return n!==void 0}function iP(n,t){return n==null||n===""||(typeof t=="string"?n=n+t:typeof n=="object"&&(n=_l(hi(n)))),n}function z0(n,t){return(n.flags&(t?8:16))!==0}function E(n,t=""){let e=Q(),i=Qe(),r=n+Xe,o=i.firstCreatePass?na(i,r,1,t,null):i.data[r],s=rP(i,e,o,t);e[r]=s,_u()&&xy(i,e,s,o),Ws(o,!1)}var rP=(n,t,e,i)=>(Cu(!0),cR(t[ze],i));function W0(n,t,e,i=""){return $n(n,Gr(),e)?t+ou(e)+i:zn}function Fe(n){return lt("",n),Fe}function lt(n,t,e){let i=Q(),r=W0(i,n,t,e);return r!==zn&&oP(i,lr(),r),lt}function oP(n,t,e){let i=zm(t,n);dR(n[ze],i,e)}function zy(n,t,e=""){return W0(Q(),n,t,e)}function BE(n,t,e){let i=Qe();i.firstCreatePass&&G0(t,i.data,i.blueprint,Oi(n),e)}function G0(n,t,e,i,r){if(n=Ot(n),Array.isArray(n))for(let o=0;o<n.length;o++)G0(n[o],t,e,i,r);else{let o=Qe(),s=Q(),a=Nt(),l=Ao(n)?n:Ot(n.provide),c=Vm(n),d=a.providerIndexes&1048575,u=a.directiveStart,h=a.providerIndexes>>20;if(Ao(n)||!n.multi){let p=new Ho(c,r,Je,null),m=Tg(l,t,r?d:d+h,u);m===-1?(xg(Lu(a,s),o,l),Sg(o,n,t.length),t.push(l),a.directiveStart++,a.directiveEnd++,r&&(a.providerIndexes+=1048576),e.push(p),s.push(p)):(e[m]=p,s[m]=p)}else{let p=Tg(l,t,d+h,u),m=Tg(l,t,d,d+h),w=p>=0&&e[p],k=m>=0&&e[m];if(r&&!k||!r&&!w){xg(Lu(a,s),o,l);let N=lP(r?aP:sP,e.length,r,i,c,n);!r&&k&&(e[m].providerFactory=N),Sg(o,n,t.length,0),t.push(l),a.directiveStart++,a.directiveEnd++,r&&(a.providerIndexes+=1048576),e.push(N),s.push(N)}else{let N=q0(e[r?m:p],c,!r&&i);Sg(o,n,p>-1?p:m,N)}!r&&i&&k&&e[m].componentProviders++}}}function Sg(n,t,e,i){let r=Ao(t),o=kD(t);if(r||o){let l=(o?Ot(t.useClass):t).prototype.ngOnDestroy;if(l){let c=n.destroyHooks||(n.destroyHooks=[]);if(!r&&t.multi){let d=c.indexOf(e);d===-1?c.push(e,[i,l]):c[d+1].push(i,l)}else c.push(e,l)}}}function q0(n,t,e){return e&&n.componentProviders++,n.multi.push(t)-1}function Tg(n,t,e,i){for(let r=e;r<i;r++)if(t[r]===n)return r;return-1}function sP(n,t,e,i,r){return ly(this.multi,[])}function aP(n,t,e,i,r){let o=this.multi,s;if(this.providerFactory){let a=this.providerFactory.componentProviders,l=Nl(i,i[$],this.providerFactory.index,r);s=l.slice(0,a),ly(o,s);for(let c=a;c<l.length;c++)s.push(l[c])}else s=[],ly(o,s);return s}function ly(n,t){for(let e=0;e<n.length;e++){let i=n[e];t.push(i())}return t}function lP(n,t,e,i,r,o){let s=new Ho(n,e,Je,null);return s.multi=[],s.index=t,s.componentProviders=0,q0(s,r,i&&!e),s}function bt(n,t){return e=>{e.providersResolver=(i,r)=>BE(i,r?r(n):n,!1),t&&(e.viewProvidersResolver=(i,r)=>BE(i,r?r(t):t,!0))}}function K0(n,t){let e=n[t];return e===zn?void 0:e}function cP(n,t,e,i,r,o){let s=t+e;return $n(n,s,r)?y0(n,s+1,o?i.call(o,r):i(r)):K0(n,s+1)}function dP(n,t,e,i,r,o,s){let a=t+e;return UO(n,a,r,o)?y0(n,a+2,s?i.call(s,r,o):i(r,o)):K0(n,a+2)}function mr(n,t){let e=Qe(),i,r=n+Xe;e.firstCreatePass?(i=uP(t,e.pipeRegistry),e.data[r]=i,i.onDestroy&&(e.destroyHooks??=[]).push(r,i.onDestroy)):i=e.data[r];let o=i.factory||(i.factory=Vr(i.type,!0)),s,a=Jt(Je);try{let l=Fu(!1),c=o();return Fu(l),Wm(e,Q(),r,c),c}finally{Jt(a)}}function uP(n,t){if(t)for(let e=t.length-1;e>=0;e--){let i=t[e];if(n===i.name)return i}}function Yo(n,t,e){let i=n+Xe,r=Q(),o=fu(r,i);return Y0(r,i)?cP(r,sg(),t,o.transform,e,o):o.transform(e)}function vf(n,t,e,i){let r=n+Xe,o=Q(),s=fu(o,r);return Y0(o,r)?dP(o,sg(),t,s.transform,e,i,s):s.transform(e,i)}function Y0(n,t){return n[$].data[t].pure}function Wy(n,t){return af(n,t)}var Yu=class{ngModuleFactory;componentFactories;constructor(t,e){this.ngModuleFactory=t,this.componentFactories=e}},Gy=(()=>{class n{compileModuleSync(e){return new Wu(e)}compileModuleAsync(e){return Promise.resolve(this.compileModuleSync(e))}compileModuleAndAllComponentsSync(e){let i=this.compileModuleSync(e),r=Mm(e),o=Mw(r.declarations).reduce((s,a)=>{let l=ir(a);return l&&s.push(new zo(l)),s},[]);return new Yu(i,o)}compileModuleAndAllComponentsAsync(e){return Promise.resolve(this.compileModuleAndAllComponentsSync(e))}clearCache(){}clearCacheFor(e){}getModuleId(e){}static \u0275fac=function(i){return new(i||n)};static \u0275prov=C({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})();var Z0=(()=>{class n{applicationErrorHandler=f(Hn);appRef=f(nn);taskService=f(Kr);ngZone=f(L);zonelessEnabled=f(Ml);tracing=f(hr,{optional:!0});zoneIsDefined=typeof Zone<"u"&&!!Zone.root.run;schedulerTickApplyArgs=[{data:{__scheduler_tick__:!0}}];subscriptions=new H;angularZoneId=this.zoneIsDefined?this.ngZone._inner?.get(vl):null;scheduleInRootZone=!this.zonelessEnabled&&this.zoneIsDefined&&(f(mg,{optional:!0})??!1);cancelScheduledCallback=null;useMicrotaskScheduler=!1;runningTick=!1;pendingRenderTaskId=null;constructor(){this.subscriptions.add(this.appRef.afterTick.subscribe(()=>{let e=this.taskService.add();if(!this.runningTick&&(this.cleanup(),!this.zonelessEnabled||this.appRef.includeAllTestViews)){this.taskService.remove(e);return}this.switchToMicrotaskScheduler(),this.taskService.remove(e)})),this.subscriptions.add(this.ngZone.onUnstable.subscribe(()=>{this.runningTick||this.cleanup()}))}switchToMicrotaskScheduler(){this.ngZone.runOutsideAngular(()=>{let e=this.taskService.add();this.useMicrotaskScheduler=!0,queueMicrotask(()=>{this.useMicrotaskScheduler=!1,this.taskService.remove(e)})})}notify(e){if(!this.zonelessEnabled&&e===5)return;switch(e){case 0:{this.appRef.dirtyFlags|=2;break}case 3:case 2:case 4:case 5:case 1:{this.appRef.dirtyFlags|=4;break}case 6:{this.appRef.dirtyFlags|=2;break}case 12:{this.appRef.dirtyFlags|=16;break}case 13:{this.appRef.dirtyFlags|=2;break}case 11:break;default:this.appRef.dirtyFlags|=8}if(this.appRef.tracingSnapshot=this.tracing?.snapshot(this.appRef.tracingSnapshot)??null,!this.shouldScheduleTick())return;let i=this.useMicrotaskScheduler?nE:ug;this.pendingRenderTaskId=this.taskService.add(),this.scheduleInRootZone?this.cancelScheduledCallback=Zone.root.run(()=>i(()=>this.tick())):this.cancelScheduledCallback=this.ngZone.runOutsideAngular(()=>i(()=>this.tick()))}shouldScheduleTick(){return!(this.appRef.destroyed||this.pendingRenderTaskId!==null||this.runningTick||this.appRef._runningTick||!this.zonelessEnabled&&this.zoneIsDefined&&Zone.current.get(vl+this.angularZoneId))}tick(){if(this.runningTick||this.appRef.destroyed)return;if(this.appRef.dirtyFlags===0){this.cleanup();return}!this.zonelessEnabled&&this.appRef.dirtyFlags&7&&(this.appRef.dirtyFlags|=1);let e=this.taskService.add();try{this.ngZone.run(()=>{this.runningTick=!0,this.appRef._tick()},void 0,this.schedulerTickApplyArgs)}catch(i){this.applicationErrorHandler(i)}finally{this.taskService.remove(e),this.cleanup()}}ngOnDestroy(){this.subscriptions.unsubscribe(),this.cleanup()}cleanup(){if(this.runningTick=!1,this.cancelScheduledCallback?.(),this.cancelScheduledCallback=null,this.pendingRenderTaskId!==null){let e=this.pendingRenderTaskId;this.pendingRenderTaskId=null,this.taskService.remove(e)}}static \u0275fac=function(i){return new(i||n)};static \u0275prov=C({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})();function qy(){return pr("NgZoneless"),rr([...Ky(),[]])}function Ky(){return[{provide:er,useExisting:Z0},{provide:L,useClass:bl},{provide:Ml,useValue:!0}]}function fP(){return typeof $localize<"u"&&$localize.locale||Yl}var aa=new b("",{factory:()=>f(aa,{optional:!0,skipSelf:!0})||fP()});var bf=class{destroyed=!1;listeners=null;errorHandler=f(Fn,{optional:!0});destroyRef=f(st);constructor(){this.destroyRef.onDestroy(()=>{this.destroyed=!0,this.listeners=null})}subscribe(t){if(this.destroyed)throw new S(953,!1);return(this.listeners??=[]).push(t),{unsubscribe:()=>{let e=this.listeners?.indexOf(t);e!==void 0&&e!==-1&&this.listeners?.splice(e,1)}}}emit(t){if(this.destroyed){console.warn(tr(953,!1));return}if(this.listeners===null)return;let e=B(null);try{for(let i of this.listeners)try{i(t)}catch(r){this.errorHandler?.handleError(r)}}finally{B(e)}}};function Ae(n){return fD(n)}function ve(n,t){return el(n,t?.equal)}var hP=n=>n;function Yy(n,t){if(typeof n=="function"){let e=cm(n,hP,t?.equal);return X0(e,t?.debugName)}else{let e=cm(n.source,n.computation,n.equal);return X0(e,n.debugName)}}function X0(n,t){let e=n[ct],i=n;return i.set=r=>dD(e,r),i.update=r=>uD(e,r),i.asReadonly=Du.bind(n),i}var oS=Symbol("InputSignalNode#UNSET"),SP=V(g({},tl),{transformFn:void 0,applyValueToInputSignal(n,t){Do(n,t)}});function sS(n,t){let e=Object.create(SP);e.value=n,e.transformFn=t?.transform;function i(){if(Ar(e),e.value===oS){let r=null;throw new S(-950,r)}return e.value}return i[ct]=e,i}var Zo=class{attributeName;constructor(t){this.attributeName=t}__NG_ELEMENT_ID__=()=>Ul(this.attributeName);toString(){return`HostAttributeToken ${this.attributeName}`}};function Df(n){return new bf}function Q0(n,t){return sS(n,t)}function TP(n){return sS(oS,n)}var Li=(Q0.required=TP,Q0);function J0(n,t){return Fy(t)}function IP(n,t){return Ly(t)}var Xl=(J0.required=IP,J0);function eS(n,t){return Fy(t)}function xP(n,t){return Ly(t)}var aS=(eS.required=xP,eS);var Xy=new b(""),MP=new b("");function Zl(n){return!n.moduleRef}function kP(n){let t=Zl(n)?n.r3Injector:n.moduleRef.injector,e=t.get(L);return e.run(()=>{Zl(n)?n.r3Injector.resolveInjectorInitializers():n.moduleRef.resolveInjectorInitializers();let i=t.get(Hn),r;if(e.runOutsideAngular(()=>{r=e.onError.subscribe({next:i})}),Zl(n)){let o=()=>t.destroy(),s=n.platformInjector.get(Xy);s.add(o),t.onDestroy(()=>{r.unsubscribe(),s.delete(o)})}else{let o=()=>n.moduleRef.destroy(),s=n.platformInjector.get(Xy);s.add(o),n.moduleRef.onDestroy(()=>{Ol(n.allPlatformModules,n.moduleRef),r.unsubscribe(),s.delete(o)})}return RP(i,e,()=>{let o=t.get(Kr),s=o.add(),a=t.get(Uy);return a.runInitializers(),a.donePromise.then(()=>{let l=t.get(aa,Yl);if(L0(l||Yl),!t.get(MP,!0))return Zl(n)?t.get(nn):(n.allPlatformModules.push(n.moduleRef),n.moduleRef);if(Zl(n)){let d=t.get(nn);return n.rootComponent!==void 0&&d.bootstrap(n.rootComponent),d}else return AP?.(n.moduleRef,n.allPlatformModules),n.moduleRef}).finally(()=>{o.remove(s)})})})}var AP;function RP(n,t,e){try{let i=e();return Xr(i)?i.catch(r=>{throw t.runOutsideAngular(()=>n(r)),r}):i}catch(i){throw t.runOutsideAngular(()=>n(i)),i}}var _f=null;function OP(n=[],t){return re.create({name:t,providers:[{provide:El,useValue:"platform"},{provide:Xy,useValue:new Set([()=>_f=null])},...n]})}function NP(n=[]){if(_f)return _f;let t=OP(n);return _f=t,N0(),PP(t),t}function PP(n){let t=n.get(Zu,null);$t(n,()=>{t?.forEach(e=>e())})}var FP=1e4;var MY=FP-1e3;var et=(()=>{class n{static __NG_ELEMENT_ID__=LP}return n})();function LP(n){return VP(Nt(),Q(),(n&16)===16)}function VP(n,t,e){if(Ri(n)&&!e){let i=Un(n.index,t);return new Yr(i,i)}else if(n.type&175){let i=t[tn];return new Yr(i,t)}return null}var Qy=class{supports(t){return Oy(t)}create(t){return new Jy(t)}},BP=(n,t)=>t,Jy=class{length=0;collection;_linkedRecords=null;_unlinkedRecords=null;_previousItHead=null;_itHead=null;_itTail=null;_additionsHead=null;_additionsTail=null;_movesHead=null;_movesTail=null;_removalsHead=null;_removalsTail=null;_identityChangesHead=null;_identityChangesTail=null;_trackByFn;constructor(t){this._trackByFn=t||BP}forEachItem(t){let e;for(e=this._itHead;e!==null;e=e._next)t(e)}forEachOperation(t){let e=this._itHead,i=this._removalsHead,r=0,o=null;for(;e||i;){let s=!i||e&&e.currentIndex<tS(i,r,o)?e:i,a=tS(s,r,o),l=s.currentIndex;if(s===i)r--,i=i._nextRemoved;else if(e=e._next,s.previousIndex==null)r++;else{o||(o=[]);let c=a-r,d=l-r;if(c!=d){for(let h=0;h<c;h++){let p=h<o.length?o[h]:o[h]=0,m=p+h;d<=m&&m<c&&(o[h]=p+1)}let u=s.previousIndex;o[u]=d-c}}a!==l&&t(s,a,l)}}forEachPreviousItem(t){let e;for(e=this._previousItHead;e!==null;e=e._nextPrevious)t(e)}forEachAddedItem(t){let e;for(e=this._additionsHead;e!==null;e=e._nextAdded)t(e)}forEachMovedItem(t){let e;for(e=this._movesHead;e!==null;e=e._nextMoved)t(e)}forEachRemovedItem(t){let e;for(e=this._removalsHead;e!==null;e=e._nextRemoved)t(e)}forEachIdentityChange(t){let e;for(e=this._identityChangesHead;e!==null;e=e._nextIdentityChange)t(e)}diff(t){if(t==null&&(t=[]),!Oy(t))throw new S(900,!1);return this.check(t)?this:null}onDestroy(){}check(t){this._reset();let e=this._itHead,i=!1,r,o,s;if(Array.isArray(t)){this.length=t.length;for(let a=0;a<this.length;a++)o=t[a],s=this._trackByFn(a,o),e===null||!Object.is(e.trackById,s)?(e=this._mismatch(e,o,s,a),i=!0):(i&&(e=this._verifyReinsertion(e,o,s,a)),Object.is(e.item,o)||this._addIdentityChange(e,o)),e=e._next}else r=0,m0(t,a=>{s=this._trackByFn(r,a),e===null||!Object.is(e.trackById,s)?(e=this._mismatch(e,a,s,r),i=!0):(i&&(e=this._verifyReinsertion(e,a,s,r)),Object.is(e.item,a)||this._addIdentityChange(e,a)),e=e._next,r++}),this.length=r;return this._truncate(e),this.collection=t,this.isDirty}get isDirty(){return this._additionsHead!==null||this._movesHead!==null||this._removalsHead!==null||this._identityChangesHead!==null}_reset(){if(this.isDirty){let t;for(t=this._previousItHead=this._itHead;t!==null;t=t._next)t._nextPrevious=t._next;for(t=this._additionsHead;t!==null;t=t._nextAdded)t.previousIndex=t.currentIndex;for(this._additionsHead=this._additionsTail=null,t=this._movesHead;t!==null;t=t._nextMoved)t.previousIndex=t.currentIndex;this._movesHead=this._movesTail=null,this._removalsHead=this._removalsTail=null,this._identityChangesHead=this._identityChangesTail=null}}_mismatch(t,e,i,r){let o;return t===null?o=this._itTail:(o=t._prev,this._remove(t)),t=this._unlinkedRecords===null?null:this._unlinkedRecords.get(i,null),t!==null?(Object.is(t.item,e)||this._addIdentityChange(t,e),this._reinsertAfter(t,o,r)):(t=this._linkedRecords===null?null:this._linkedRecords.get(i,r),t!==null?(Object.is(t.item,e)||this._addIdentityChange(t,e),this._moveAfter(t,o,r)):t=this._addAfter(new ev(e,i),o,r)),t}_verifyReinsertion(t,e,i,r){let o=this._unlinkedRecords===null?null:this._unlinkedRecords.get(i,null);return o!==null?t=this._reinsertAfter(o,t._prev,r):t.currentIndex!=r&&(t.currentIndex=r,this._addToMoves(t,r)),t}_truncate(t){for(;t!==null;){let e=t._next;this._addToRemovals(this._unlink(t)),t=e}this._unlinkedRecords!==null&&this._unlinkedRecords.clear(),this._additionsTail!==null&&(this._additionsTail._nextAdded=null),this._movesTail!==null&&(this._movesTail._nextMoved=null),this._itTail!==null&&(this._itTail._next=null),this._removalsTail!==null&&(this._removalsTail._nextRemoved=null),this._identityChangesTail!==null&&(this._identityChangesTail._nextIdentityChange=null)}_reinsertAfter(t,e,i){this._unlinkedRecords!==null&&this._unlinkedRecords.remove(t);let r=t._prevRemoved,o=t._nextRemoved;return r===null?this._removalsHead=o:r._nextRemoved=o,o===null?this._removalsTail=r:o._prevRemoved=r,this._insertAfter(t,e,i),this._addToMoves(t,i),t}_moveAfter(t,e,i){return this._unlink(t),this._insertAfter(t,e,i),this._addToMoves(t,i),t}_addAfter(t,e,i){return this._insertAfter(t,e,i),this._additionsTail===null?this._additionsTail=this._additionsHead=t:this._additionsTail=this._additionsTail._nextAdded=t,t}_insertAfter(t,e,i){let r=e===null?this._itHead:e._next;return t._next=r,t._prev=e,r===null?this._itTail=t:r._prev=t,e===null?this._itHead=t:e._next=t,this._linkedRecords===null&&(this._linkedRecords=new Cf),this._linkedRecords.put(t),t.currentIndex=i,t}_remove(t){return this._addToRemovals(this._unlink(t))}_unlink(t){this._linkedRecords!==null&&this._linkedRecords.remove(t);let e=t._prev,i=t._next;return e===null?this._itHead=i:e._next=i,i===null?this._itTail=e:i._prev=e,t}_addToMoves(t,e){return t.previousIndex===e||(this._movesTail===null?this._movesTail=this._movesHead=t:this._movesTail=this._movesTail._nextMoved=t),t}_addToRemovals(t){return this._unlinkedRecords===null&&(this._unlinkedRecords=new Cf),this._unlinkedRecords.put(t),t.currentIndex=null,t._nextRemoved=null,this._removalsTail===null?(this._removalsTail=this._removalsHead=t,t._prevRemoved=null):(t._prevRemoved=this._removalsTail,this._removalsTail=this._removalsTail._nextRemoved=t),t}_addIdentityChange(t,e){return t.item=e,this._identityChangesTail===null?this._identityChangesTail=this._identityChangesHead=t:this._identityChangesTail=this._identityChangesTail._nextIdentityChange=t,t}},ev=class{item;trackById;currentIndex=null;previousIndex=null;_nextPrevious=null;_prev=null;_next=null;_prevDup=null;_nextDup=null;_prevRemoved=null;_nextRemoved=null;_nextAdded=null;_nextMoved=null;_nextIdentityChange=null;constructor(t,e){this.item=t,this.trackById=e}},tv=class{_head=null;_tail=null;add(t){this._head===null?(this._head=this._tail=t,t._nextDup=null,t._prevDup=null):(this._tail._nextDup=t,t._prevDup=this._tail,t._nextDup=null,this._tail=t)}get(t,e){let i;for(i=this._head;i!==null;i=i._nextDup)if((e===null||e<=i.currentIndex)&&Object.is(i.trackById,t))return i;return null}remove(t){let e=t._prevDup,i=t._nextDup;return e===null?this._head=i:e._nextDup=i,i===null?this._tail=e:i._prevDup=e,this._head===null}},Cf=class{map=new Map;put(t){let e=t.trackById,i=this.map.get(e);i||(i=new tv,this.map.set(e,i)),i.add(t)}get(t,e){let i=t,r=this.map.get(i);return r?r.get(t,e):null}remove(t){let e=t.trackById;return this.map.get(e).remove(t)&&this.map.delete(e),t}get isEmpty(){return this.map.size===0}clear(){this.map.clear()}};function tS(n,t,e){let i=n.previousIndex;if(i===null)return i;let r=0;return e&&i<e.length&&(r=e[i]),i+t+r}function nS(){return new Ef([new Qy])}var Ef=(()=>{class n{factories;static \u0275prov=C({token:n,providedIn:"root",factory:nS});constructor(e){this.factories=e}static create(e,i){if(i!=null){let r=i.factories.slice();e=e.concat(r)}return new n(e)}static extend(e){return{provide:n,useFactory:()=>{let i=f(n,{optional:!0,skipSelf:!0});return n.create(e,i||nS())}}}find(e){let i=this.factories.find(r=>r.supports(e));if(i!=null)return i;throw new S(901,!1)}}return n})();function lS(n){let{rootComponent:t,appProviders:e,platformProviders:i,platformRef:r}=n;Pe(Se.BootstrapApplicationStart);try{let o=r?.injector??NP(i),s=[Ky(),rE,...e||[]],a=new Vl({providers:s,parent:o,debugName:"",runEnvironmentInitializers:!1});return kP({r3Injector:a.injector,platformInjector:o,rootComponent:t})}catch(o){return Promise.reject(o)}finally{Pe(Se.BootstrapApplicationEnd)}}function oe(n){return typeof n=="boolean"?n:n!=null&&n!=="false"}function Xo(n,t=NaN){return!isNaN(parseFloat(n))&&!isNaN(Number(n))?Number(n):t}var Zy=Symbol("NOT_SET"),cS=new Set,jP=V(g({},tl),{kind:"afterRenderEffectPhase",consumerIsAlwaysLive:!0,consumerAllowSignalWrites:!0,value:Zy,cleanup:null,consumerMarkedDirty(){if(this.sequence.impl.executing){if(this.sequence.lastPhase===null||this.sequence.lastPhase<this.phase)return;this.sequence.erroredOrDestroyed=!0}this.sequence.scheduler.notify(7)},phaseFn(n){if(this.sequence.lastPhase=this.phase,!this.dirty)return this.signal;if(this.dirty=!1,this.value!==Zy&&!Is(this))return this.signal;try{for(let r of this.cleanup??cS)r()}finally{this.cleanup?.clear()}let t=[];n!==void 0&&t.push(n),t.push(this.registerCleanupFn);let e=Ki(this),i;try{i=this.userFn.apply(null,t)}finally{Rr(this,e)}return(this.value===Zy||!this.equal(this.value,i))&&(this.value=i,this.version++),this.signal}}),nv=class extends Pl{scheduler;lastPhase=null;nodes=[void 0,void 0,void 0,void 0];onDestroyFns=null;constructor(t,e,i,r,o,s=null){super(t,[void 0,void 0,void 0,void 0],i,!1,o.get(st),s),this.scheduler=r;for(let a of Sy){let l=e[a];if(l===void 0)continue;let c=Object.create(jP);c.sequence=this,c.phase=a,c.userFn=l,c.dirty=!0,c.signal=()=>(Ar(c),c.value),c.signal[ct]=c,c.registerCleanupFn=d=>(c.cleanup??=new Set).add(d),this.nodes[a]=c,this.hooks[a]=d=>c.phaseFn(d)}}afterRun(){super.afterRun(),this.lastPhase=null}destroy(){if(this.onDestroyFns!==null)for(let t of this.onDestroyFns)t();super.destroy();for(let t of this.nodes)if(t)try{for(let e of t.cleanup??cS)e()}finally{Or(t)}}};function dS(n,t){let e=t?.injector??f(re),i=e.get(er),r=e.get(tf),o=e.get(hr,null,{optional:!0});r.impl??=e.get(Ty);let s=n;typeof s=="function"&&(s={mixedReadWrite:n});let a=e.get(Gs,null,{optional:!0}),l=new nv(r.impl,[s.earlyRead,s.write,s.mixedReadWrite,s.read],a?.view,i,e,o?.snapshot(null));return r.impl.register(l),l}function wf(n,t){let e=ir(n),i=t.elementInjector||Us();return new zo(e).create(i,t.projectableNodes,t.hostElement,t.environmentInjector,t.directives,t.bindings)}var uS=null;function gr(){return uS}function iv(n){uS??=n}var Ql=class{},Qo=(()=>{class n{historyGo(e){throw new Error("")}static \u0275fac=function(i){return new(i||n)};static \u0275prov=C({token:n,factory:()=>f(fS),providedIn:"platform"})}return n})();var fS=(()=>{class n extends Qo{_location;_history;_doc=f(le);constructor(){super(),this._location=window.location,this._history=window.history}getBaseHrefFromDOM(){return gr().getBaseHref(this._doc)}onPopState(e){let i=gr().getGlobalEventTarget(this._doc,"window");return i.addEventListener("popstate",e,!1),()=>i.removeEventListener("popstate",e)}onHashChange(e){let i=gr().getGlobalEventTarget(this._doc,"window");return i.addEventListener("hashchange",e,!1),()=>i.removeEventListener("hashchange",e)}get href(){return this._location.href}get protocol(){return this._location.protocol}get hostname(){return this._location.hostname}get port(){return this._location.port}get pathname(){return this._location.pathname}get search(){return this._location.search}get hash(){return this._location.hash}set pathname(e){this._location.pathname=e}pushState(e,i,r){this._history.pushState(e,i,r)}replaceState(e,i,r){this._history.replaceState(e,i,r)}forward(){this._history.forward()}back(){this._history.back()}historyGo(e=0){this._history.go(e)}getState(){return this._history.state}static \u0275fac=function(i){return new(i||n)};static \u0275prov=C({token:n,factory:()=>new n,providedIn:"platform"})}return n})();function Sf(n,t){return n?t?n.endsWith("/")?t.startsWith("/")?n+t.slice(1):n+t:t.startsWith("/")?n+t:`${n}/${t}`:n:t}function hS(n){let t=n.search(/#|\?|$/);return n[t-1]==="/"?n.slice(0,t-1)+n.slice(t):n}function yi(n){return n&&n[0]!=="?"?`?${n}`:n}var Vi=(()=>{class n{historyGo(e){throw new Error("")}static \u0275fac=function(i){return new(i||n)};static \u0275prov=C({token:n,factory:()=>f(mS),providedIn:"root"})}return n})(),rv=new b(""),mS=(()=>{class n extends Vi{_platformLocation;_baseHref;_removeListenerFns=[];constructor(e,i){super(),this._platformLocation=e,this._baseHref=i??this._platformLocation.getBaseHrefFromDOM()??f(le).location?.origin??""}ngOnDestroy(){for(;this._removeListenerFns.length;)this._removeListenerFns.pop()()}onPopState(e){this._removeListenerFns.push(this._platformLocation.onPopState(e),this._platformLocation.onHashChange(e))}getBaseHref(){return this._baseHref}prepareExternalUrl(e){return Sf(this._baseHref,e)}path(e=!1){let i=this._platformLocation.pathname+yi(this._platformLocation.search),r=this._platformLocation.hash;return r&&e?`${i}${r}`:i}pushState(e,i,r,o){let s=this.prepareExternalUrl(r+yi(o));this._platformLocation.pushState(e,i,s)}replaceState(e,i,r,o){let s=this.prepareExternalUrl(r+yi(o));this._platformLocation.replaceState(e,i,s)}forward(){this._platformLocation.forward()}back(){this._platformLocation.back()}getState(){return this._platformLocation.getState()}historyGo(e=0){this._platformLocation.historyGo?.(e)}static \u0275fac=function(i){return new(i||n)(ne(Qo),ne(rv,8))};static \u0275prov=C({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})();var yr=(()=>{class n{_subject=new D;_basePath;_locationStrategy;_urlChangeListeners=[];_urlChangeSubscription=null;constructor(e){this._locationStrategy=e;let i=this._locationStrategy.getBaseHref();this._basePath=$P(hS(pS(i))),this._locationStrategy.onPopState(r=>{this._subject.next({url:this.path(!0),pop:!0,state:r.state,type:r.type})})}ngOnDestroy(){this._urlChangeSubscription?.unsubscribe(),this._urlChangeListeners=[]}path(e=!1){return this.normalize(this._locationStrategy.path(e))}getState(){return this._locationStrategy.getState()}isCurrentPathEqualTo(e,i=""){return this.path()==this.normalize(e+yi(i))}normalize(e){return n.stripTrailingSlash(HP(this._basePath,pS(e)))}prepareExternalUrl(e){return e&&e[0]!=="/"&&(e="/"+e),this._locationStrategy.prepareExternalUrl(e)}go(e,i="",r=null){this._locationStrategy.pushState(r,"",e,i),this._notifyUrlChangeListeners(this.prepareExternalUrl(e+yi(i)),r)}replaceState(e,i="",r=null){this._locationStrategy.replaceState(r,"",e,i),this._notifyUrlChangeListeners(this.prepareExternalUrl(e+yi(i)),r)}forward(){this._locationStrategy.forward()}back(){this._locationStrategy.back()}historyGo(e=0){this._locationStrategy.historyGo?.(e)}onUrlChange(e){return this._urlChangeListeners.push(e),this._urlChangeSubscription??=this.subscribe(i=>{this._notifyUrlChangeListeners(i.url,i.state)}),()=>{let i=this._urlChangeListeners.indexOf(e);this._urlChangeListeners.splice(i,1),this._urlChangeListeners.length===0&&(this._urlChangeSubscription?.unsubscribe(),this._urlChangeSubscription=null)}}_notifyUrlChangeListeners(e="",i){this._urlChangeListeners.forEach(r=>r(e,i))}subscribe(e,i,r){return this._subject.subscribe({next:e,error:i??void 0,complete:r??void 0})}static normalizeQueryParams=yi;static joinWithSlash=Sf;static stripTrailingSlash=hS;static \u0275fac=function(i){return new(i||n)(ne(Vi))};static \u0275prov=C({token:n,factory:()=>UP(),providedIn:"root"})}return n})();function UP(){return new yr(ne(Vi))}function HP(n,t){if(!n||!t.startsWith(n))return t;let e=t.substring(n.length);return e===""||["/",";","?","#"].includes(e[0])?e:t}function pS(n){return n.replace(/\/index.html$/,"")}function $P(n){if(new RegExp("^(https?:)?//").test(n)){let[,e]=n.split(/\/\/[^\/]+/);return e}return n}var dv=(()=>{class n extends Vi{_platformLocation;_baseHref="";_removeListenerFns=[];constructor(e,i){super(),this._platformLocation=e,i!=null&&(this._baseHref=i)}ngOnDestroy(){for(;this._removeListenerFns.length;)this._removeListenerFns.pop()()}onPopState(e){this._removeListenerFns.push(this._platformLocation.onPopState(e),this._platformLocation.onHashChange(e))}getBaseHref(){return this._baseHref}path(e=!1){let i=this._platformLocation.hash??"#";return i.length>0?i.substring(1):i}prepareExternalUrl(e){let i=Sf(this._baseHref,e);return i.length>0?"#"+i:i}pushState(e,i,r,o){let s=this.prepareExternalUrl(r+yi(o))||this._platformLocation.pathname;this._platformLocation.pushState(e,i,s)}replaceState(e,i,r,o){let s=this.prepareExternalUrl(r+yi(o))||this._platformLocation.pathname;this._platformLocation.replaceState(e,i,s)}forward(){this._platformLocation.forward()}back(){this._platformLocation.back()}getState(){return this._platformLocation.getState()}historyGo(e=0){this._platformLocation.historyGo?.(e)}static \u0275fac=function(i){return new(i||n)(ne(Qo),ne(rv,8))};static \u0275prov=C({token:n,factory:n.\u0275fac})}return n})();var uv=(function(n){return n[n.Decimal=0]="Decimal",n[n.Percent=1]="Percent",n[n.Currency=2]="Currency",n[n.Scientific=3]="Scientific",n})(uv||{});var Gt=(function(n){return n[n.Format=0]="Format",n[n.Standalone=1]="Standalone",n})(Gt||{}),Be=(function(n){return n[n.Narrow=0]="Narrow",n[n.Abbreviated=1]="Abbreviated",n[n.Wide=2]="Wide",n[n.Short=3]="Short",n})(Be||{}),mn=(function(n){return n[n.Short=0]="Short",n[n.Medium=1]="Medium",n[n.Long=2]="Long",n[n.Full=3]="Full",n})(mn||{}),gn={Decimal:0,Group:1,List:2,PercentSign:3,PlusSign:4,MinusSign:5,Exponential:6,SuperscriptingExponent:7,PerMille:8,Infinity:9,NaN:10,TimeSeparator:11,CurrencyDecimal:12,CurrencyGroup:13};function vS(n){return pn(n)[at.LocaleId]}function bS(n,t,e){let i=pn(n),r=[i[at.DayPeriodsFormat],i[at.DayPeriodsStandalone]],o=Wn(r,t);return Wn(o,e)}function _S(n,t,e){let i=pn(n),r=[i[at.DaysFormat],i[at.DaysStandalone]],o=Wn(r,t);return Wn(o,e)}function CS(n,t,e){let i=pn(n),r=[i[at.MonthsFormat],i[at.MonthsStandalone]],o=Wn(r,t);return Wn(o,e)}function DS(n,t){let i=pn(n)[at.Eras];return Wn(i,t)}function Jl(n,t){let e=pn(n);return Wn(e[at.DateFormat],t)}function ec(n,t){let e=pn(n);return Wn(e[at.TimeFormat],t)}function tc(n,t){let i=pn(n)[at.DateTimeFormat];return Wn(i,t)}function Bi(n,t){let e=pn(n),i=e[at.NumberSymbols][t];if(typeof i>"u"){if(t===gn.CurrencyDecimal)return e[at.NumberSymbols][gn.Decimal];if(t===gn.CurrencyGroup)return e[at.NumberSymbols][gn.Group]}return i}function ES(n,t){return pn(n)[at.NumberFormats][t]}function wS(n){if(!n[at.ExtraData])throw new S(2303,!1)}function SS(n){let t=pn(n);return wS(t),(t[at.ExtraData][2]||[]).map(i=>typeof i=="string"?ov(i):[ov(i[0]),ov(i[1])])}function TS(n,t,e){let i=pn(n);wS(i);let r=[i[at.ExtraData][0],i[at.ExtraData][1]],o=Wn(r,t)||[];return Wn(o,e)||[]}function Wn(n,t){for(let e=t;e>-1;e--)if(typeof n[e]<"u")return n[e];throw new S(2304,!1)}function ov(n){let[t,e]=n.split(":");return{hours:+t,minutes:+e}}var zP=/^(\d{4,})-?(\d\d)-?(\d\d)(?:T(\d\d)(?::?(\d\d)(?::?(\d\d)(?:\.(\d+))?)?)?(Z|([+-])(\d\d):?(\d\d))?)?$/,Tf={},WP=/((?:[^BEGHLMOSWYZabcdhmswyz']+)|(?:'(?:[^']|'')*')|(?:G{1,5}|y{1,4}|Y{1,4}|M{1,5}|L{1,5}|w{1,2}|W{1}|d{1,2}|E{1,6}|c{1,6}|a{1,5}|b{1,5}|B{1,5}|h{1,2}|H{1,2}|m{1,2}|s{1,2}|S{1,3}|z{1,4}|Z{1,5}|O{1,4}))([\s\S]*)/;function IS(n,t,e,i){let r=eF(n);t=vr(e,t)||t;let s=[],a;for(;t;)if(a=WP.exec(t),a){s=s.concat(a.slice(1));let d=s.pop();if(!d)break;t=d}else{s.push(t);break}let l=r.getTimezoneOffset();i&&(l=MS(i,l),r=JP(r,i));let c="";return s.forEach(d=>{let u=XP(d);c+=u?u(r,e,l):d==="''"?"'":d.replace(/(^'|'$)/g,"").replace(/''/g,"'")}),c}function Af(n,t,e){let i=new Date(0);return i.setFullYear(n,t,e),i.setHours(0,0,0),i}function vr(n,t){let e=vS(n);if(Tf[e]??={},Tf[e][t])return Tf[e][t];let i="";switch(t){case"shortDate":i=Jl(n,mn.Short);break;case"mediumDate":i=Jl(n,mn.Medium);break;case"longDate":i=Jl(n,mn.Long);break;case"fullDate":i=Jl(n,mn.Full);break;case"shortTime":i=ec(n,mn.Short);break;case"mediumTime":i=ec(n,mn.Medium);break;case"longTime":i=ec(n,mn.Long);break;case"fullTime":i=ec(n,mn.Full);break;case"short":let r=vr(n,"shortTime"),o=vr(n,"shortDate");i=If(tc(n,mn.Short),[r,o]);break;case"medium":let s=vr(n,"mediumTime"),a=vr(n,"mediumDate");i=If(tc(n,mn.Medium),[s,a]);break;case"long":let l=vr(n,"longTime"),c=vr(n,"longDate");i=If(tc(n,mn.Long),[l,c]);break;case"full":let d=vr(n,"fullTime"),u=vr(n,"fullDate");i=If(tc(n,mn.Full),[d,u]);break}return i&&(Tf[e][t]=i),i}function If(n,t){return t&&(n=n.replace(/\{([^}]+)}/g,function(e,i){return t!=null&&i in t?t[i]:e})),n}function vi(n,t,e="-",i,r){let o="";(n<0||r&&n<=0)&&(r?n=-n+1:(n=-n,o=e));let s=String(n);for(;s.length<t;)s="0"+s;return i&&(s=s.slice(s.length-t)),o+s}function GP(n,t){return vi(n,3).substring(0,t)}function _t(n,t,e=0,i=!1,r=!1){return function(o,s){let a=qP(n,o);if((e>0||a>-e)&&(a+=e),n===3)a===0&&e===-12&&(a=12);else if(n===6)return GP(a,t);let l=Bi(s,gn.MinusSign);return vi(a,t,l,i,r)}}function qP(n,t){switch(n){case 0:return t.getFullYear();case 1:return t.getMonth();case 2:return t.getDate();case 3:return t.getHours();case 4:return t.getMinutes();case 5:return t.getSeconds();case 6:return t.getMilliseconds();case 7:return t.getDay();default:throw new S(2301,!1)}}function qe(n,t,e=Gt.Format,i=!1){return function(r,o){return KP(r,o,n,t,e,i)}}function KP(n,t,e,i,r,o){switch(e){case 2:return CS(t,r,i)[n.getMonth()];case 1:return _S(t,r,i)[n.getDay()];case 0:let s=n.getHours(),a=n.getMinutes();if(o){let c=SS(t),d=TS(t,r,i),u=c.findIndex(h=>{if(Array.isArray(h)){let[p,m]=h,w=s>=p.hours&&a>=p.minutes,k=s<m.hours||s===m.hours&&a<m.minutes;if(p.hours<m.hours){if(w&&k)return!0}else if(w||k)return!0}else if(h.hours===s&&h.minutes===a)return!0;return!1});if(u!==-1)return d[u]}return bS(t,r,i)[s<12?0:1];case 3:return DS(t,i)[n.getFullYear()<=0?0:1];default:let l=e;throw new S(2302,!1)}}function xf(n){return function(t,e,i){let r=-1*i,o=Bi(e,gn.MinusSign),s=r>0?Math.floor(r/60):Math.ceil(r/60);switch(n){case 0:return(r>=0?"+":"")+vi(s,2,o)+vi(Math.abs(r%60),2,o);case 1:return"GMT"+(r>=0?"+":"")+vi(s,1,o);case 2:return"GMT"+(r>=0?"+":"")+vi(s,2,o)+":"+vi(Math.abs(r%60),2,o);case 3:return i===0?"Z":(r>=0?"+":"")+vi(s,2,o)+":"+vi(Math.abs(r%60),2,o);default:throw new S(2310,!1)}}}var YP=0,kf=4;function ZP(n){let t=Af(n,YP,1).getDay();return Af(n,0,1+(t<=kf?kf:kf+7)-t)}function xS(n){let t=n.getDay(),e=t===0?-3:kf-t;return Af(n.getFullYear(),n.getMonth(),n.getDate()+e)}function sv(n,t=!1){return function(e,i){let r;if(t){let o=new Date(e.getFullYear(),e.getMonth(),1).getDay()-1,s=e.getDate();r=1+Math.floor((s+o)/7)}else{let o=xS(e),s=ZP(o.getFullYear()),a=o.getTime()-s.getTime();r=1+Math.round(a/6048e5)}return vi(r,n,Bi(i,gn.MinusSign))}}function Mf(n,t=!1){return function(e,i){let o=xS(e).getFullYear();return vi(o,n,Bi(i,gn.MinusSign),t)}}var av={};function XP(n){if(av[n])return av[n];let t;switch(n){case"G":case"GG":case"GGG":t=qe(3,Be.Abbreviated);break;case"GGGG":t=qe(3,Be.Wide);break;case"GGGGG":t=qe(3,Be.Narrow);break;case"y":t=_t(0,1,0,!1,!0);break;case"yy":t=_t(0,2,0,!0,!0);break;case"yyy":t=_t(0,3,0,!1,!0);break;case"yyyy":t=_t(0,4,0,!1,!0);break;case"Y":t=Mf(1);break;case"YY":t=Mf(2,!0);break;case"YYY":t=Mf(3);break;case"YYYY":t=Mf(4);break;case"M":case"L":t=_t(1,1,1);break;case"MM":case"LL":t=_t(1,2,1);break;case"MMM":t=qe(2,Be.Abbreviated);break;case"MMMM":t=qe(2,Be.Wide);break;case"MMMMM":t=qe(2,Be.Narrow);break;case"LLL":t=qe(2,Be.Abbreviated,Gt.Standalone);break;case"LLLL":t=qe(2,Be.Wide,Gt.Standalone);break;case"LLLLL":t=qe(2,Be.Narrow,Gt.Standalone);break;case"w":t=sv(1);break;case"ww":t=sv(2);break;case"W":t=sv(1,!0);break;case"d":t=_t(2,1);break;case"dd":t=_t(2,2);break;case"c":case"cc":t=_t(7,1);break;case"ccc":t=qe(1,Be.Abbreviated,Gt.Standalone);break;case"cccc":t=qe(1,Be.Wide,Gt.Standalone);break;case"ccccc":t=qe(1,Be.Narrow,Gt.Standalone);break;case"cccccc":t=qe(1,Be.Short,Gt.Standalone);break;case"E":case"EE":case"EEE":t=qe(1,Be.Abbreviated);break;case"EEEE":t=qe(1,Be.Wide);break;case"EEEEE":t=qe(1,Be.Narrow);break;case"EEEEEE":t=qe(1,Be.Short);break;case"a":case"aa":case"aaa":t=qe(0,Be.Abbreviated);break;case"aaaa":t=qe(0,Be.Wide);break;case"aaaaa":t=qe(0,Be.Narrow);break;case"b":case"bb":case"bbb":t=qe(0,Be.Abbreviated,Gt.Standalone,!0);break;case"bbbb":t=qe(0,Be.Wide,Gt.Standalone,!0);break;case"bbbbb":t=qe(0,Be.Narrow,Gt.Standalone,!0);break;case"B":case"BB":case"BBB":t=qe(0,Be.Abbreviated,Gt.Format,!0);break;case"BBBB":t=qe(0,Be.Wide,Gt.Format,!0);break;case"BBBBB":t=qe(0,Be.Narrow,Gt.Format,!0);break;case"h":t=_t(3,1,-12);break;case"hh":t=_t(3,2,-12);break;case"H":t=_t(3,1);break;case"HH":t=_t(3,2);break;case"m":t=_t(4,1);break;case"mm":t=_t(4,2);break;case"s":t=_t(5,1);break;case"ss":t=_t(5,2);break;case"S":t=_t(6,1);break;case"SS":t=_t(6,2);break;case"SSS":t=_t(6,3);break;case"Z":case"ZZ":case"ZZZ":t=xf(0);break;case"ZZZZZ":t=xf(3);break;case"O":case"OO":case"OOO":case"z":case"zz":case"zzz":t=xf(1);break;case"OOOO":case"ZZZZ":case"zzzz":t=xf(2);break;default:return null}return av[n]=t,t}function MS(n,t){n=n.replace(/:/g,"");let e=Date.parse("Jan 01, 1970 00:00:00 "+n)/6e4;return isNaN(e)?t:e}function QP(n,t){return n=new Date(n.getTime()),n.setMinutes(n.getMinutes()+t),n}function JP(n,t,e){let r=n.getTimezoneOffset(),o=MS(t,r);return QP(n,-1*(o-r))}function eF(n){if(gS(n))return n;if(typeof n=="number"&&!isNaN(n))return new Date(n);if(typeof n=="string"){if(n=n.trim(),/^(\d{4}(-\d{1,2}(-\d{1,2})?)?)$/.test(n)){let[r,o=1,s=1]=n.split("-").map(a=>+a);return Af(r,o-1,s)}let e=parseFloat(n);if(!isNaN(n-e))return new Date(e);let i;if(i=n.match(zP))return tF(i)}let t=new Date(n);if(!gS(t))throw new S(2311,!1);return t}function tF(n){let t=new Date(0),e=0,i=0,r=n[8]?t.setUTCFullYear:t.setFullYear,o=n[8]?t.setUTCHours:t.setHours;n[9]&&(e=Number(n[9]+n[10]),i=Number(n[9]+n[11])),r.call(t,Number(n[1]),Number(n[2])-1,Number(n[3]));let s=Number(n[4]||0)-e,a=Number(n[5]||0)-i,l=Number(n[6]||0),c=Math.floor(parseFloat("0."+(n[7]||0))*1e3);return o.call(t,s,a,l,c),t}function gS(n){return n instanceof Date&&!isNaN(n.valueOf())}var nF=/^(\d+)?\.((\d+)(-(\d+))?)?$/,yS=22,Rf=".",nc="0",iF=";",rF=",",lv="#";function oF(n,t,e,i,r,o,s=!1){let a="",l=!1;if(!isFinite(n))a=Bi(e,gn.Infinity);else{let c=lF(n);s&&(c=aF(c));let d=t.minInt,u=t.minFrac,h=t.maxFrac;if(o){let De=o.match(nF);if(De===null)throw new S(2306,!1);let nt=De[1],Gi=De[3],go=De[5];nt!=null&&(d=cv(nt)),Gi!=null&&(u=cv(Gi)),go!=null?h=cv(go):Gi!=null&&u>h&&(h=u)}cF(c,u,h);let p=c.digits,m=c.integerLen,w=c.exponent,k=[];for(l=p.every(De=>!De);m<d;m++)p.unshift(0);for(;m<0;m++)p.unshift(0);m>0?k=p.splice(m,p.length):(k=p,p=[0]);let N=[];for(p.length>=t.lgSize&&N.unshift(p.splice(-t.lgSize,p.length).join(""));p.length>t.gSize;)N.unshift(p.splice(-t.gSize,p.length).join(""));p.length&&N.unshift(p.join("")),a=N.join(Bi(e,i)),k.length&&(a+=Bi(e,r)+k.join("")),w&&(a+=Bi(e,gn.Exponential)+"+"+w)}return n<0&&!l?a=t.negPre+a+t.negSuf:a=t.posPre+a+t.posSuf,a}function kS(n,t,e){let i=ES(t,uv.Decimal),r=sF(i,Bi(t,gn.MinusSign));return oF(n,r,t,gn.Group,gn.Decimal,e)}function sF(n,t="-"){let e={minInt:1,minFrac:0,maxFrac:0,posPre:"",posSuf:"",negPre:"",negSuf:"",gSize:0,lgSize:0},i=n.split(iF),r=i[0],o=i[1],s=r.indexOf(Rf)!==-1?r.split(Rf):[r.substring(0,r.lastIndexOf(nc)+1),r.substring(r.lastIndexOf(nc)+1)],a=s[0],l=s[1]||"";e.posPre=a.substring(0,a.indexOf(lv));for(let d=0;d<l.length;d++){let u=l.charAt(d);u===nc?e.minFrac=e.maxFrac=d+1:u===lv?e.maxFrac=d+1:e.posSuf+=u}let c=a.split(rF);if(e.gSize=c[1]?c[1].length:0,e.lgSize=c[2]||c[1]?(c[2]||c[1]).length:0,o){let d=r.length-e.posPre.length-e.posSuf.length,u=o.indexOf(lv);e.negPre=o.substring(0,u).replace(/'/g,""),e.negSuf=o.slice(u+d).replace(/'/g,"")}else e.negPre=t+e.posPre,e.negSuf=e.posSuf;return e}function aF(n){if(n.digits[0]===0)return n;let t=n.digits.length-n.integerLen;return n.exponent?n.exponent+=2:(t===0?n.digits.push(0,0):t===1&&n.digits.push(0),n.integerLen+=2),n}function lF(n){let t=Math.abs(n)+"",e=0,i,r,o,s,a;for((r=t.indexOf(Rf))>-1&&(t=t.replace(Rf,"")),(o=t.search(/e/i))>0?(r<0&&(r=o),r+=+t.slice(o+1),t=t.substring(0,o)):r<0&&(r=t.length),o=0;t.charAt(o)===nc;o++);if(o===(a=t.length))i=[0],r=1;else{for(a--;t.charAt(a)===nc;)a--;for(r-=o,i=[],s=0;o<=a;o++,s++)i[s]=Number(t.charAt(o))}return r>yS&&(i=i.splice(0,yS-1),e=r-1,r=1),{digits:i,exponent:e,integerLen:r}}function cF(n,t,e){if(t>e)throw new S(2307,!1);let i=n.digits,r=i.length-n.integerLen,o=Math.min(Math.max(t,r),e),s=o+n.integerLen,a=i[s];if(s>0){i.splice(Math.max(n.integerLen,s));for(let u=s;u<i.length;u++)i[u]=0}else{r=Math.max(0,r),n.integerLen=1,i.length=Math.max(1,s=o+1),i[0]=0;for(let u=1;u<s;u++)i[u]=0}if(a>=5)if(s-1<0){for(let u=0;u>s;u--)i.unshift(0),n.integerLen++;i.unshift(1),n.integerLen++}else i[s-1]++;for(;r<Math.max(0,o);r++)i.push(0);let l=o!==0,c=t+n.integerLen,d=i.reduceRight(function(u,h,p,m){return h=h+u,m[p]=h<10?h:h-10,l&&(m[p]===0&&p>=c?m.pop():l=!1),h>=10?1:0},0);d&&(i.unshift(d),n.integerLen++)}function cv(n){let t=parseInt(n);if(isNaN(t))throw new S(2305,!1);return t}var fv=(()=>{class n{_viewContainerRef;_viewRef=null;ngTemplateOutletContext=null;ngTemplateOutlet=null;ngTemplateOutletInjector=null;injector=f(re);constructor(e){this._viewContainerRef=e}ngOnChanges(e){if(this._shouldRecreateView(e)){let i=this._viewContainerRef;if(this._viewRef&&i.remove(i.indexOf(this._viewRef)),!this.ngTemplateOutlet){this._viewRef=null;return}let r=this._createContextForwardProxy();this._viewRef=i.createEmbeddedView(this.ngTemplateOutlet,r,{injector:this._getInjector()})}}_getInjector(){return this.ngTemplateOutletInjector==="outlet"?this.injector:this.ngTemplateOutletInjector??void 0}_shouldRecreateView(e){return!!e.ngTemplateOutlet||!!e.ngTemplateOutletInjector}_createContextForwardProxy(){return new Proxy({},{set:(e,i,r)=>this.ngTemplateOutletContext?Reflect.set(this.ngTemplateOutletContext,i,r):!1,get:(e,i,r)=>{if(this.ngTemplateOutletContext)return Reflect.get(this.ngTemplateOutletContext,i,r)}})}static \u0275fac=function(i){return new(i||n)(Je(ht))};static \u0275dir=Y({type:n,selectors:[["","ngTemplateOutlet",""]],inputs:{ngTemplateOutletContext:"ngTemplateOutletContext",ngTemplateOutlet:"ngTemplateOutlet",ngTemplateOutletInjector:"ngTemplateOutletInjector"},features:[It]})}return n})();function hv(n,t){return new S(2100,!1)}var pv=(()=>{class n{transform(e){return e==null?null:(dF(n,e),e.toUpperCase())}static \u0275fac=function(i){return new(i||n)};static \u0275pipe=ia({name:"uppercase",type:n,pure:!0})}return n})();function dF(n,t){if(typeof t!="string")throw hv(n,t)}var uF="mediumDate",AS=new b(""),RS=new b(""),mv=(()=>{class n{locale;defaultTimezone;defaultOptions;constructor(e,i,r){this.locale=e,this.defaultTimezone=i,this.defaultOptions=r}transform(e,i,r,o){if(e==null||e===""||e!==e)return null;try{let s=i??this.defaultOptions?.dateFormat??uF,a=r??this.defaultOptions?.timezone??this.defaultTimezone??void 0;return IS(e,s,o||this.locale,a)}catch(s){throw hv(n,s.message)}}static \u0275fac=function(i){return new(i||n)(Je(aa,16),Je(AS,24),Je(RS,24))};static \u0275pipe=ia({name:"date",type:n,pure:!0})}return n})();var gv=(()=>{class n{transform(e){return JSON.stringify(e,null,2)}static \u0275fac=function(i){return new(i||n)};static \u0275pipe=ia({name:"json",type:n,pure:!1})}return n})();var yv=(()=>{class n{_locale;constructor(e){this._locale=e}transform(e,i,r){if(!fF(e))return null;r||=this._locale;try{let o=hF(e);return kS(o,r,i)}catch(o){throw hv(n,o.message)}}static \u0275fac=function(i){return new(i||n)(Je(aa,16))};static \u0275pipe=ia({name:"number",type:n,pure:!0})}return n})();function fF(n){return!(n==null||n===""||n!==n)}function hF(n){if(typeof n=="string"&&!isNaN(Number(n)-parseFloat(n)))return Number(n);if(typeof n!="number")throw new S(2309,!1);return n}var la=(()=>{class n{static \u0275fac=function(i){return new(i||n)};static \u0275mod=Ce({type:n});static \u0275inj=be({})}return n})();function vv(n,t){t=encodeURIComponent(t);for(let e of n.split(";")){let i=e.indexOf("="),[r,o]=i==-1?[e,""]:[e.slice(0,i),e.slice(i+1)];if(r.trim()===t)return decodeURIComponent(o)}return null}var ic=class{};var bv="browser";function OS(n){return n===bv}var rc=class{_doc;constructor(t){this._doc=t}manager},Of=(()=>{class n extends rc{constructor(e){super(e)}supports(e){return!0}addEventListener(e,i,r,o){return e.addEventListener(i,r,o),()=>this.removeEventListener(e,i,r,o)}removeEventListener(e,i,r,o){return e.removeEventListener(i,r,o)}static \u0275fac=function(i){return new(i||n)(ne(le))};static \u0275prov=C({token:n,factory:n.\u0275fac})}return n})(),Ff=new b(""),wv=(()=>{class n{_zone;_plugins;_eventNameToPlugin=new Map;constructor(e,i){this._zone=i,e.forEach(s=>{s.manager=this});let r=e.filter(s=>!(s instanceof Of));this._plugins=r.slice().reverse();let o=e.find(s=>s instanceof Of);o&&this._plugins.push(o)}addEventListener(e,i,r,o){return this._findPluginFor(i).addEventListener(e,i,r,o)}getZone(){return this._zone}_findPluginFor(e){let i=this._eventNameToPlugin.get(e);if(i)return i;if(i=this._plugins.find(o=>o.supports(e)),!i)throw new S(5101,!1);return this._eventNameToPlugin.set(e,i),i}static \u0275fac=function(i){return new(i||n)(ne(Ff),ne(L))};static \u0275prov=C({token:n,factory:n.\u0275fac})}return n})(),Cv="ng-app-id";function NS(n){for(let t of n)t.remove()}function PS(n,t){let e=t.createElement("style");return e.textContent=n,e}function gF(n,t,e,i){let r=n.head?.querySelectorAll(`style[${Cv}="${t}"],link[${Cv}="${t}"]`);if(r)for(let o of r)o.removeAttribute(Cv),o instanceof HTMLLinkElement?i.set(o.href.slice(o.href.lastIndexOf("/")+1),{usage:0,elements:[o]}):o.textContent&&e.set(o.textContent,{usage:0,elements:[o]})}function Ev(n,t){let e=t.createElement("link");return e.setAttribute("rel","stylesheet"),e.setAttribute("href",n),e}var Sv=(()=>{class n{doc;appId;nonce;inline=new Map;external=new Map;hosts=new Set;constructor(e,i,r,o={}){this.doc=e,this.appId=i,this.nonce=r,gF(e,i,this.inline,this.external),this.hosts.add(e.head)}addStyles(e,i){for(let r of e)this.addUsage(r,this.inline,PS);i?.forEach(r=>this.addUsage(r,this.external,Ev))}removeStyles(e,i){for(let r of e)this.removeUsage(r,this.inline);i?.forEach(r=>this.removeUsage(r,this.external))}addUsage(e,i,r){let o=i.get(e);o?o.usage++:i.set(e,{usage:1,elements:[...this.hosts].map(s=>this.addElement(s,r(e,this.doc)))})}removeUsage(e,i){let r=i.get(e);r&&(r.usage--,r.usage<=0&&(NS(r.elements),i.delete(e)))}ngOnDestroy(){for(let[,{elements:e}]of[...this.inline,...this.external])NS(e);this.hosts.clear()}addHost(e){this.hosts.add(e);for(let[i,{elements:r}]of this.inline)r.push(this.addElement(e,PS(i,this.doc)));for(let[i,{elements:r}]of this.external)r.push(this.addElement(e,Ev(i,this.doc)))}removeHost(e){this.hosts.delete(e)}addElement(e,i){return this.nonce&&i.setAttribute("nonce",this.nonce),e.appendChild(i)}static \u0275fac=function(i){return new(i||n)(ne(le),ne(Zr),ne(ta,8),ne(Go))};static \u0275prov=C({token:n,factory:n.\u0275fac})}return n})(),Dv={svg:"http://www.w3.org/2000/svg",xhtml:"http://www.w3.org/1999/xhtml",xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace",xmlns:"http://www.w3.org/2000/xmlns/",math:"http://www.w3.org/1998/Math/MathML"},Tv=/%COMP%/g;var LS="%COMP%",yF=`_nghost-${LS}`,vF=`_ngcontent-${LS}`,bF=!0,_F=new b("",{factory:()=>bF});function CF(n){return vF.replace(Tv,n)}function DF(n){return yF.replace(Tv,n)}function VS(n,t){return t.map(e=>e.replace(Tv,n))}var Iv=(()=>{class n{eventManager;sharedStylesHost;appId;removeStylesOnCompDestroy;doc;ngZone;nonce;tracingService;rendererByCompId=new Map;defaultRenderer;constructor(e,i,r,o,s,a,l=null,c=null){this.eventManager=e,this.sharedStylesHost=i,this.appId=r,this.removeStylesOnCompDestroy=o,this.doc=s,this.ngZone=a,this.nonce=l,this.tracingService=c,this.defaultRenderer=new oc(e,s,a,this.tracingService)}createRenderer(e,i){if(!e||!i)return this.defaultRenderer;let r=this.getOrCreateRenderer(e,i);return r instanceof Pf?r.applyToHost(e):r instanceof sc&&r.applyStyles(),r}getOrCreateRenderer(e,i){let r=this.rendererByCompId,o=r.get(i.id);if(!o){let s=this.doc,a=this.ngZone,l=this.eventManager,c=this.sharedStylesHost,d=this.removeStylesOnCompDestroy,u=this.tracingService;switch(i.encapsulation){case fi.Emulated:o=new Pf(l,c,i,this.appId,d,s,a,u);break;case fi.ShadowDom:return new Nf(l,e,i,s,a,this.nonce,u,c);case fi.ExperimentalIsolatedShadowDom:return new Nf(l,e,i,s,a,this.nonce,u);default:o=new sc(l,c,i,d,s,a,u);break}r.set(i.id,o)}return o}ngOnDestroy(){this.rendererByCompId.clear()}componentReplaced(e){this.rendererByCompId.delete(e)}static \u0275fac=function(i){return new(i||n)(ne(wv),ne(Sv),ne(Zr),ne(_F),ne(le),ne(L),ne(ta),ne(hr,8))};static \u0275prov=C({token:n,factory:n.\u0275fac})}return n})(),oc=class{eventManager;doc;ngZone;tracingService;data=Object.create(null);throwOnSyntheticProps=!0;constructor(t,e,i,r){this.eventManager=t,this.doc=e,this.ngZone=i,this.tracingService=r}destroy(){}destroyNode=null;createElement(t,e){return e?this.doc.createElementNS(Dv[e]||e,t):this.doc.createElement(t)}createComment(t){return this.doc.createComment(t)}createText(t){return this.doc.createTextNode(t)}appendChild(t,e){(FS(t)?t.content:t).appendChild(e)}insertBefore(t,e,i){t&&(FS(t)?t.content:t).insertBefore(e,i)}removeChild(t,e){e.remove()}selectRootElement(t,e){let i=typeof t=="string"?this.doc.querySelector(t):t;if(!i)throw new S(-5104,!1);return e||(i.textContent=""),i}parentNode(t){return t.parentNode}nextSibling(t){return t.nextSibling}setAttribute(t,e,i,r){if(r){e=r+":"+e;let o=Dv[r];o?t.setAttributeNS(o,e,i):t.setAttribute(e,i)}else t.setAttribute(e,i)}removeAttribute(t,e,i){if(i){let r=Dv[i];r?t.removeAttributeNS(r,e):t.removeAttribute(`${i}:${e}`)}else t.removeAttribute(e)}addClass(t,e){t.classList.add(e)}removeClass(t,e){t.classList.remove(e)}setStyle(t,e,i,r){r&(Pi.DashCase|Pi.Important)?t.style.setProperty(e,i,r&Pi.Important?"important":""):t.style[e]=i}removeStyle(t,e,i){i&Pi.DashCase?t.style.removeProperty(e):t.style[e]=""}setProperty(t,e,i){t!=null&&(t[e]=i)}setValue(t,e){t.nodeValue=e}listen(t,e,i,r){if(typeof t=="string"&&(t=gr().getGlobalEventTarget(this.doc,t),!t))throw new S(5102,!1);let o=this.decoratePreventDefault(i);return this.tracingService?.wrapEventListener&&(o=this.tracingService.wrapEventListener(t,e,o)),this.eventManager.addEventListener(t,e,o,r)}decoratePreventDefault(t){return e=>{if(e==="__ngUnwrap__")return t;t(e)===!1&&e.preventDefault()}}};function FS(n){return n.tagName==="TEMPLATE"&&n.content!==void 0}var Nf=class extends oc{hostEl;sharedStylesHost;shadowRoot;constructor(t,e,i,r,o,s,a,l){super(t,r,o,a),this.hostEl=e,this.sharedStylesHost=l,this.shadowRoot=e.attachShadow({mode:"open"}),this.sharedStylesHost&&this.sharedStylesHost.addHost(this.shadowRoot);let c=i.styles;c=VS(i.id,c);for(let u of c){let h=document.createElement("style");s&&h.setAttribute("nonce",s),h.textContent=u,this.shadowRoot.appendChild(h)}let d=i.getExternalStyles?.();if(d)for(let u of d){let h=Ev(u,r);s&&h.setAttribute("nonce",s),this.shadowRoot.appendChild(h)}}nodeOrShadowRoot(t){return t===this.hostEl?this.shadowRoot:t}appendChild(t,e){return super.appendChild(this.nodeOrShadowRoot(t),e)}insertBefore(t,e,i){return super.insertBefore(this.nodeOrShadowRoot(t),e,i)}removeChild(t,e){return super.removeChild(null,e)}parentNode(t){return this.nodeOrShadowRoot(super.parentNode(this.nodeOrShadowRoot(t)))}destroy(){this.sharedStylesHost&&this.sharedStylesHost.removeHost(this.shadowRoot)}},sc=class extends oc{sharedStylesHost;removeStylesOnCompDestroy;styles;styleUrls;constructor(t,e,i,r,o,s,a,l){super(t,o,s,a),this.sharedStylesHost=e,this.removeStylesOnCompDestroy=r;let c=i.styles;this.styles=l?VS(l,c):c,this.styleUrls=i.getExternalStyles?.(l)}applyStyles(){this.sharedStylesHost.addStyles(this.styles,this.styleUrls)}destroy(){this.removeStylesOnCompDestroy&&$o.size===0&&this.sharedStylesHost.removeStyles(this.styles,this.styleUrls)}},Pf=class extends sc{contentAttr;hostAttr;constructor(t,e,i,r,o,s,a,l){let c=r+"-"+i.id;super(t,e,i,o,s,a,l,c),this.contentAttr=CF(c),this.hostAttr=DF(c)}applyToHost(t){this.applyStyles(),this.setAttribute(t,this.hostAttr,"")}createElement(t,e){let i=super.createElement(t,e);return super.setAttribute(i,this.contentAttr,""),i}};var Lf=class n extends Ql{supportsDOMEvents=!0;static makeCurrent(){iv(new n)}onAndCancel(t,e,i,r){return t.addEventListener(e,i,r),()=>{t.removeEventListener(e,i,r)}}dispatchEvent(t,e){t.dispatchEvent(e)}remove(t){t.remove()}createElement(t,e){return e=e||this.getDefaultDocument(),e.createElement(t)}createHtmlDocument(){return document.implementation.createHTMLDocument("fakeTitle")}getDefaultDocument(){return document}isElementNode(t){return t.nodeType===Node.ELEMENT_NODE}isShadowRoot(t){return t instanceof DocumentFragment}getGlobalEventTarget(t,e){return e==="window"?window:e==="document"?t:e==="body"?t.body:null}getBaseHref(t){let e=EF();return e==null?null:wF(e)}resetBaseElement(){ac=null}getUserAgent(){return window.navigator.userAgent}getCookie(t){return vv(document.cookie,t)}},ac=null;function EF(){return ac=ac||document.head.querySelector("base"),ac?ac.getAttribute("href"):null}function wF(n){return new URL(n,document.baseURI).pathname}var SF=(()=>{class n{build(){return new XMLHttpRequest}static \u0275fac=function(i){return new(i||n)};static \u0275prov=C({token:n,factory:n.\u0275fac})}return n})(),BS=["alt","control","meta","shift"],TF={"\b":"Backspace","	":"Tab","\x7F":"Delete","\x1B":"Escape",Del:"Delete",Esc:"Escape",Left:"ArrowLeft",Right:"ArrowRight",Up:"ArrowUp",Down:"ArrowDown",Menu:"ContextMenu",Scroll:"ScrollLock",Win:"OS"},IF={alt:n=>n.altKey,control:n=>n.ctrlKey,meta:n=>n.metaKey,shift:n=>n.shiftKey},jS=(()=>{class n extends rc{constructor(e){super(e)}supports(e){return n.parseEventName(e)!=null}addEventListener(e,i,r,o){let s=n.parseEventName(i),a=n.eventCallback(s.fullKey,r,this.manager.getZone());return this.manager.getZone().runOutsideAngular(()=>gr().onAndCancel(e,s.domEventName,a,o))}static parseEventName(e){let i=e.toLowerCase().split("."),r=i.shift();if(i.length===0||!(r==="keydown"||r==="keyup"))return null;let o=n._normalizeKey(i.pop()),s="",a=i.indexOf("code");if(a>-1&&(i.splice(a,1),s="code."),BS.forEach(c=>{let d=i.indexOf(c);d>-1&&(i.splice(d,1),s+=c+".")}),s+=o,i.length!=0||o.length===0)return null;let l={};return l.domEventName=r,l.fullKey=s,l}static matchEventFullKeyCode(e,i){let r=TF[e.key]||e.key,o="";return i.indexOf("code.")>-1&&(r=e.code,o="code."),r==null||!r?!1:(r=r.toLowerCase(),r===" "?r="space":r==="."&&(r="dot"),BS.forEach(s=>{if(s!==r){let a=IF[s];a(e)&&(o+=s+".")}}),o+=r,o===i)}static eventCallback(e,i,r){return o=>{n.matchEventFullKeyCode(o,e)&&r.runGuarded(()=>i(o))}}static _normalizeKey(e){return e==="esc"?"escape":e}static \u0275fac=function(i){return new(i||n)(ne(le))};static \u0275prov=C({token:n,factory:n.\u0275fac})}return n})();async function xv(n,t,e){let i=g({rootComponent:n},xF(t,e));return lS(i)}function xF(n,t){return{platformRef:t?.platformRef,appProviders:[...OF,...n?.providers??[]],platformProviders:RF}}function MF(){Lf.makeCurrent()}function kF(){return new Fn}function AF(){return fy(document),document}var RF=[{provide:Go,useValue:bv},{provide:Zu,useValue:MF,multi:!0},{provide:le,useFactory:AF}];var OF=[{provide:El,useValue:"root"},{provide:Fn,useFactory:kF},{provide:Ff,useClass:Of,multi:!0},{provide:Ff,useClass:jS,multi:!0},Iv,Sv,wv,{provide:zt,useExisting:Iv},{provide:ic,useClass:SF},[]];var US=(()=>{class n{_doc;constructor(e){this._doc=e}getTitle(){return this._doc.title}setTitle(e){this._doc.title=e||""}static \u0275fac=function(i){return new(i||n)(ne(le))};static \u0275prov=C({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})();var Mv=(()=>{class n{static \u0275fac=function(i){return new(i||n)};static \u0275prov=C({token:n,factory:function(i){let r=null;return i?r=new(i||n):r=ne(NF),r},providedIn:"root"})}return n})(),NF=(()=>{class n extends Mv{_doc;constructor(e){super(),this._doc=e}sanitize(e,i){if(i==null)return null;switch(e){case Tn.NONE:return i;case Tn.HTML:return ur(i,"HTML")?hi(i):vy(this._doc,String(i)).toString();case Tn.STYLE:return ur(i,"Style")?hi(i):i;case Tn.SCRIPT:if(ur(i,"Script"))return hi(i);throw new S(5200,!1);case Tn.URL:return ur(i,"URL")?hi(i):$l(String(i));case Tn.RESOURCE_URL:if(ur(i,"ResourceURL"))return hi(i);throw new S(5201,!1);default:throw new S(5202,!1)}}bypassSecurityTrustHtml(e){return hy(e)}bypassSecurityTrustStyle(e){return py(e)}bypassSecurityTrustScript(e){return my(e)}bypassSecurityTrustUrl(e){return gy(e)}bypassSecurityTrustResourceUrl(e){return yy(e)}static \u0275fac=function(i){return new(i||n)(ne(le))};static \u0275prov=C({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})();var ce="primary",Cc=Symbol("RouteTitle"),Nv=class{params;constructor(t){this.params=t||{}}has(t){return Object.prototype.hasOwnProperty.call(this.params,t)}get(t){if(this.has(t)){let e=this.params[t];return Array.isArray(e)?e[0]:e}return null}getAll(t){if(this.has(t)){let e=this.params[t];return Array.isArray(e)?e:[e]}return[]}get keys(){return Object.keys(this.params)}};function es(n){return new Nv(n)}function kv(n,t,e){for(let i=0;i<n.length;i++){let r=n[i],o=t[i];if(r[0]===":")e[r.substring(1)]=o;else if(r!==o.path)return!1}return!0}function YS(n,t,e){let i=e.path.split("/"),r=i.indexOf("**");if(r===-1){if(i.length>n.length||e.pathMatch==="full"&&(t.hasChildren()||i.length<n.length))return null;let l={},c=n.slice(0,i.length);return kv(i,c,l)?{consumed:c,posParams:l}:null}if(r!==i.lastIndexOf("**"))return null;let o=i.slice(0,r),s=i.slice(r+1);if(o.length+s.length>n.length||e.pathMatch==="full"&&t.hasChildren()&&e.path!=="**")return null;let a={};return!kv(o,n.slice(0,o.length),a)||!kv(s,n.slice(n.length-s.length),a)?null:{consumed:n,posParams:a}}function $f(n){return new Promise((t,e)=>{n.pipe(Qi()).subscribe({next:i=>t(i),error:i=>e(i)})})}function FF(n,t){if(n.length!==t.length)return!1;for(let e=0;e<n.length;++e)if(!ji(n[e],t[e]))return!1;return!0}function ji(n,t){let e=n?Pv(n):void 0,i=t?Pv(t):void 0;if(!e||!i||e.length!=i.length)return!1;let r;for(let o=0;o<e.length;o++)if(r=e[o],!ZS(n[r],t[r]))return!1;return!0}function Pv(n){return[...Object.keys(n),...Object.getOwnPropertySymbols(n)]}function ZS(n,t){if(Array.isArray(n)&&Array.isArray(t)){if(n.length!==t.length)return!1;let e=[...n].sort(),i=[...t].sort();return e.every((r,o)=>i[o]===r)}else return n===t}function LF(n){return n.length>0?n[n.length-1]:null}function is(n){return En(n)?n:Xr(n)?Ze(Promise.resolve(n)):M(n)}function XS(n){return En(n)?$f(n):Promise.resolve(n)}var VF={exact:eT,subset:tT},QS={exact:BF,subset:jF,ignored:()=>!0},JS={paths:"exact",fragment:"ignored",matrixParams:"ignored",queryParams:"exact"},Fv={paths:"subset",fragment:"ignored",matrixParams:"ignored",queryParams:"subset"};function HS(n,t,e){return VF[e.paths](n.root,t.root,e.matrixParams)&&QS[e.queryParams](n.queryParams,t.queryParams)&&!(e.fragment==="exact"&&n.fragment!==t.fragment)}function BF(n,t){return ji(n,t)}function eT(n,t,e){if(!Jo(n.segments,t.segments)||!jf(n.segments,t.segments,e)||n.numberOfChildren!==t.numberOfChildren)return!1;for(let i in t.children)if(!n.children[i]||!eT(n.children[i],t.children[i],e))return!1;return!0}function jF(n,t){return Object.keys(t).length<=Object.keys(n).length&&Object.keys(t).every(e=>ZS(n[e],t[e]))}function tT(n,t,e){return nT(n,t,t.segments,e)}function nT(n,t,e,i){if(n.segments.length>e.length){let r=n.segments.slice(0,e.length);return!(!Jo(r,e)||t.hasChildren()||!jf(r,e,i))}else if(n.segments.length===e.length){if(!Jo(n.segments,e)||!jf(n.segments,e,i))return!1;for(let r in t.children)if(!n.children[r]||!tT(n.children[r],t.children[r],i))return!1;return!0}else{let r=e.slice(0,n.segments.length),o=e.slice(n.segments.length);return!Jo(n.segments,r)||!jf(n.segments,r,i)||!n.children[ce]?!1:nT(n.children[ce],t,o,i)}}function jf(n,t,e){return t.every((i,r)=>QS[e](n[r].parameters,i.parameters))}var kn=class{root;queryParams;fragment;_queryParamMap;constructor(t=new Oe([],{}),e={},i=null){this.root=t,this.queryParams=e,this.fragment=i}get queryParamMap(){return this._queryParamMap??=es(this.queryParams),this._queryParamMap}toString(){return $F.serialize(this)}},Oe=class{segments;children;parent=null;constructor(t,e){this.segments=t,this.children=e,Object.values(e).forEach(i=>i.parent=this)}hasChildren(){return this.numberOfChildren>0}get numberOfChildren(){return Object.keys(this.children).length}toString(){return Uf(this)}},to=class{path;parameters;_parameterMap;constructor(t,e){this.path=t,this.parameters=e}get parameterMap(){return this._parameterMap??=es(this.parameters),this._parameterMap}toString(){return rT(this)}};function UF(n,t){return Jo(n,t)&&n.every((e,i)=>ji(e.parameters,t[i].parameters))}function Jo(n,t){return n.length!==t.length?!1:n.every((e,i)=>e.path===t[i].path)}function HF(n,t){let e=[];return Object.entries(n.children).forEach(([i,r])=>{i===ce&&(e=e.concat(t(r,i)))}),Object.entries(n.children).forEach(([i,r])=>{i!==ce&&(e=e.concat(t(r,i)))}),e}var ya=(()=>{class n{static \u0275fac=function(i){return new(i||n)};static \u0275prov=C({token:n,factory:()=>new no,providedIn:"root"})}return n})(),no=class{parse(t){let e=new Vv(t);return new kn(e.parseRootSegment(),e.parseQueryParams(),e.parseFragment())}serialize(t){let e=`/${lc(t.root,!0)}`,i=GF(t.queryParams),r=typeof t.fragment=="string"?`#${zF(t.fragment)}`:"";return`${e}${i}${r}`}},$F=new no;function Uf(n){return n.segments.map(t=>rT(t)).join("/")}function lc(n,t){if(!n.hasChildren())return Uf(n);if(t){let e=n.children[ce]?lc(n.children[ce],!1):"",i=[];return Object.entries(n.children).forEach(([r,o])=>{r!==ce&&i.push(`${r}:${lc(o,!1)}`)}),i.length>0?`${e}(${i.join("//")})`:e}else{let e=HF(n,(i,r)=>r===ce?[lc(n.children[ce],!1)]:[`${r}:${lc(i,!1)}`]);return Object.keys(n.children).length===1&&n.children[ce]!=null?`${Uf(n)}/${e[0]}`:`${Uf(n)}/(${e.join("//")})`}}function iT(n){return encodeURIComponent(n).replace(/%40/g,"@").replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",")}function Vf(n){return iT(n).replace(/%3B/gi,";")}function zF(n){return encodeURI(n)}function Lv(n){return iT(n).replace(/\(/g,"%28").replace(/\)/g,"%29").replace(/%26/gi,"&")}function Hf(n){return decodeURIComponent(n)}function $S(n){return Hf(n.replace(/\+/g,"%20"))}function rT(n){return`${Lv(n.path)}${WF(n.parameters)}`}function WF(n){return Object.entries(n).map(([t,e])=>`;${Lv(t)}=${Lv(e)}`).join("")}function GF(n){let t=Object.entries(n).map(([e,i])=>Array.isArray(i)?i.map(r=>`${Vf(e)}=${Vf(r)}`).join("&"):`${Vf(e)}=${Vf(i)}`).filter(e=>e);return t.length?`?${t.join("&")}`:""}var qF=/^[^\/()?;#]+/;function Av(n){let t=n.match(qF);return t?t[0]:""}var KF=/^[^\/()?;=#]+/;function YF(n){let t=n.match(KF);return t?t[0]:""}var ZF=/^[^=?&#]+/;function XF(n){let t=n.match(ZF);return t?t[0]:""}var QF=/^[^&#]+/;function JF(n){let t=n.match(QF);return t?t[0]:""}var Vv=class{url;remaining;constructor(t){this.url=t,this.remaining=t}parseRootSegment(){for(;this.consumeOptional("/"););return this.remaining===""||this.peekStartsWith("?")||this.peekStartsWith("#")?new Oe([],{}):new Oe([],this.parseChildren())}parseQueryParams(){let t={};if(this.consumeOptional("?"))do this.parseQueryParam(t);while(this.consumeOptional("&"));return t}parseFragment(){return this.consumeOptional("#")?decodeURIComponent(this.remaining):null}parseChildren(t=0){if(t>50)throw new S(4010,!1);if(this.remaining==="")return{};this.consumeOptional("/");let e=[];for(this.peekStartsWith("(")||e.push(this.parseSegment());this.peekStartsWith("/")&&!this.peekStartsWith("//")&&!this.peekStartsWith("/(");)this.capture("/"),e.push(this.parseSegment());let i={};this.peekStartsWith("/(")&&(this.capture("/"),i=this.parseParens(!0,t));let r={};return this.peekStartsWith("(")&&(r=this.parseParens(!1,t)),(e.length>0||Object.keys(i).length>0)&&(r[ce]=new Oe(e,i)),r}parseSegment(){let t=Av(this.remaining);if(t===""&&this.peekStartsWith(";"))throw new S(4009,!1);return this.capture(t),new to(Hf(t),this.parseMatrixParams())}parseMatrixParams(){let t={};for(;this.consumeOptional(";");)this.parseParam(t);return t}parseParam(t){let e=YF(this.remaining);if(!e)return;this.capture(e);let i="";if(this.consumeOptional("=")){let r=Av(this.remaining);r&&(i=r,this.capture(i))}t[Hf(e)]=Hf(i)}parseQueryParam(t){let e=XF(this.remaining);if(!e)return;this.capture(e);let i="";if(this.consumeOptional("=")){let s=JF(this.remaining);s&&(i=s,this.capture(i))}let r=$S(e),o=$S(i);if(t.hasOwnProperty(r)){let s=t[r];Array.isArray(s)||(s=[s],t[r]=s),s.push(o)}else t[r]=o}parseParens(t,e){let i={};for(this.capture("(");!this.consumeOptional(")")&&this.remaining.length>0;){let r=Av(this.remaining),o=this.remaining[r.length];if(o!=="/"&&o!==")"&&o!==";")throw new S(4010,!1);let s;r.indexOf(":")>-1?(s=r.slice(0,r.indexOf(":")),this.capture(s),this.capture(":")):t&&(s=ce);let a=this.parseChildren(e+1);i[s??ce]=Object.keys(a).length===1&&a[ce]?a[ce]:new Oe([],a),this.consumeOptional("//")}return i}peekStartsWith(t){return this.remaining.startsWith(t)}consumeOptional(t){return this.peekStartsWith(t)?(this.remaining=this.remaining.substring(t.length),!0):!1}capture(t){if(!this.consumeOptional(t))throw new S(4011,!1)}};function oT(n){return n.segments.length>0?new Oe([],{[ce]:n}):n}function sT(n){let t={};for(let[i,r]of Object.entries(n.children)){let o=sT(r);if(i===ce&&o.segments.length===0&&o.hasChildren())for(let[s,a]of Object.entries(o.children))t[s]=a;else(o.segments.length>0||o.hasChildren())&&(t[i]=o)}let e=new Oe(n.segments,t);return eL(e)}function eL(n){if(n.numberOfChildren===1&&n.children[ce]){let t=n.children[ce];return new Oe(n.segments.concat(t.segments),t.children)}return n}function io(n){return n instanceof kn}function aT(n,t,e=null,i=null,r=new no){let o=lT(n);return cT(o,t,e,i,r)}function lT(n){let t;function e(o){let s={};for(let l of o.children){let c=e(l);s[l.outlet]=c}let a=new Oe(o.url,s);return o===n&&(t=a),a}let i=e(n.root),r=oT(i);return t??r}function cT(n,t,e,i,r){let o=n;for(;o.parent;)o=o.parent;if(t.length===0)return Rv(o,o,o,e,i,r);let s=tL(t);if(s.toRoot())return Rv(o,o,new Oe([],{}),e,i,r);let a=nL(s,o,n),l=a.processChildren?dc(a.segmentGroup,a.index,s.commands):uT(a.segmentGroup,a.index,s.commands);return Rv(o,a.segmentGroup,l,e,i,r)}function zf(n){return typeof n=="object"&&n!=null&&!n.outlets&&!n.segmentPath}function hc(n){return typeof n=="object"&&n!=null&&n.outlets}function zS(n,t,e){n||="\u0275";let i=new kn;return i.queryParams={[n]:t},e.parse(e.serialize(i)).queryParams[n]}function Rv(n,t,e,i,r,o){let s={};for(let[c,d]of Object.entries(i??{}))s[c]=Array.isArray(d)?d.map(u=>zS(c,u,o)):zS(c,d,o);let a;n===t?a=e:a=dT(n,t,e);let l=oT(sT(a));return new kn(l,s,r)}function dT(n,t,e){let i={};return Object.entries(n.children).forEach(([r,o])=>{o===t?i[r]=e:i[r]=dT(o,t,e)}),new Oe(n.segments,i)}var Wf=class{isAbsolute;numberOfDoubleDots;commands;constructor(t,e,i){if(this.isAbsolute=t,this.numberOfDoubleDots=e,this.commands=i,t&&i.length>0&&zf(i[0]))throw new S(4003,!1);let r=i.find(hc);if(r&&r!==LF(i))throw new S(4004,!1)}toRoot(){return this.isAbsolute&&this.commands.length===1&&this.commands[0]=="/"}};function tL(n){if(typeof n[0]=="string"&&n.length===1&&n[0]==="/")return new Wf(!0,0,n);let t=0,e=!1,i=n.reduce((r,o,s)=>{if(typeof o=="object"&&o!=null){if(o.outlets){let a={};return Object.entries(o.outlets).forEach(([l,c])=>{a[l]=typeof c=="string"?c.split("/"):c}),[...r,{outlets:a}]}if(o.segmentPath)return[...r,o.segmentPath]}return typeof o!="string"?[...r,o]:s===0?(o.split("/").forEach((a,l)=>{l==0&&a==="."||(l==0&&a===""?e=!0:a===".."?t++:a!=""&&r.push(a))}),r):[...r,o]},[]);return new Wf(e,t,i)}var da=class{segmentGroup;processChildren;index;constructor(t,e,i){this.segmentGroup=t,this.processChildren=e,this.index=i}};function nL(n,t,e){if(n.isAbsolute)return new da(t,!0,0);if(!e)return new da(t,!1,NaN);if(e.parent===null)return new da(e,!0,0);let i=zf(n.commands[0])?0:1,r=e.segments.length-1+i;return iL(e,r,n.numberOfDoubleDots)}function iL(n,t,e){let i=n,r=t,o=e;for(;o>r;){if(o-=r,i=i.parent,!i)throw new S(4005,!1);r=i.segments.length}return new da(i,!1,r-o)}function rL(n){return hc(n[0])?n[0].outlets:{[ce]:n}}function uT(n,t,e){if(n??=new Oe([],{}),n.segments.length===0&&n.hasChildren())return dc(n,t,e);let i=oL(n,t,e),r=e.slice(i.commandIndex);if(i.match&&i.pathIndex<n.segments.length){let o=new Oe(n.segments.slice(0,i.pathIndex),{});return o.children[ce]=new Oe(n.segments.slice(i.pathIndex),n.children),dc(o,0,r)}else return i.match&&r.length===0?new Oe(n.segments,{}):i.match&&!n.hasChildren()?Bv(n,t,e):i.match?dc(n,0,r):Bv(n,t,e)}function dc(n,t,e){if(e.length===0)return new Oe(n.segments,{});{let i=rL(e),r={};if(Object.keys(i).some(o=>o!==ce)&&n.children[ce]&&n.numberOfChildren===1&&n.children[ce].segments.length===0){let o=dc(n.children[ce],t,e);return new Oe(n.segments,o.children)}return Object.entries(i).forEach(([o,s])=>{typeof s=="string"&&(s=[s]),s!==null&&(r[o]=uT(n.children[o],t,s))}),Object.entries(n.children).forEach(([o,s])=>{i[o]===void 0&&(r[o]=s)}),new Oe(n.segments,r)}}function oL(n,t,e){let i=0,r=t,o={match:!1,pathIndex:0,commandIndex:0};for(;r<n.segments.length;){if(i>=e.length)return o;let s=n.segments[r],a=e[i];if(hc(a))break;let l=`${a}`,c=i<e.length-1?e[i+1]:null;if(r>0&&l===void 0)break;if(l&&c&&typeof c=="object"&&c.outlets===void 0){if(!GS(l,c,s))return o;i+=2}else{if(!GS(l,{},s))return o;i++}r++}return{match:!0,pathIndex:r,commandIndex:i}}function Bv(n,t,e){let i=n.segments.slice(0,t),r=0;for(;r<e.length;){let o=e[r];if(hc(o)){let l=sL(o.outlets);return new Oe(i,l)}if(r===0&&zf(e[0])){let l=n.segments[t];i.push(new to(l.path,WS(e[0]))),r++;continue}let s=hc(o)?o.outlets[ce]:`${o}`,a=r<e.length-1?e[r+1]:null;s&&a&&zf(a)?(i.push(new to(s,WS(a))),r+=2):(i.push(new to(s,{})),r++)}return new Oe(i,{})}function sL(n){let t={};return Object.entries(n).forEach(([e,i])=>{typeof i=="string"&&(i=[i]),i!==null&&(t[e]=Bv(new Oe([],{}),0,i))}),t}function WS(n){let t={};return Object.entries(n).forEach(([e,i])=>t[e]=`${i}`),t}function GS(n,t,e){return n==e.path&&ji(t,e.parameters)}var uc="imperative",xt=(function(n){return n[n.NavigationStart=0]="NavigationStart",n[n.NavigationEnd=1]="NavigationEnd",n[n.NavigationCancel=2]="NavigationCancel",n[n.NavigationError=3]="NavigationError",n[n.RoutesRecognized=4]="RoutesRecognized",n[n.ResolveStart=5]="ResolveStart",n[n.ResolveEnd=6]="ResolveEnd",n[n.GuardsCheckStart=7]="GuardsCheckStart",n[n.GuardsCheckEnd=8]="GuardsCheckEnd",n[n.RouteConfigLoadStart=9]="RouteConfigLoadStart",n[n.RouteConfigLoadEnd=10]="RouteConfigLoadEnd",n[n.ChildActivationStart=11]="ChildActivationStart",n[n.ChildActivationEnd=12]="ChildActivationEnd",n[n.ActivationStart=13]="ActivationStart",n[n.ActivationEnd=14]="ActivationEnd",n[n.Scroll=15]="Scroll",n[n.NavigationSkipped=16]="NavigationSkipped",n})(xt||{}),An=class{id;url;constructor(t,e){this.id=t,this.url=e}},ts=class extends An{type=xt.NavigationStart;navigationTrigger;restoredState;constructor(t,e,i="imperative",r=null){super(t,e),this.navigationTrigger=i,this.restoredState=r}toString(){return`NavigationStart(id: ${this.id}, url: '${this.url}')`}},Ui=class extends An{urlAfterRedirects;type=xt.NavigationEnd;constructor(t,e,i){super(t,e),this.urlAfterRedirects=i}toString(){return`NavigationEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}')`}},qt=(function(n){return n[n.Redirect=0]="Redirect",n[n.SupersededByNewNavigation=1]="SupersededByNewNavigation",n[n.NoDataFromResolver=2]="NoDataFromResolver",n[n.GuardRejected=3]="GuardRejected",n[n.Aborted=4]="Aborted",n})(qt||{}),pc=(function(n){return n[n.IgnoredSameUrlNavigation=0]="IgnoredSameUrlNavigation",n[n.IgnoredByUrlHandlingStrategy=1]="IgnoredByUrlHandlingStrategy",n})(pc||{}),Gn=class extends An{reason;code;type=xt.NavigationCancel;constructor(t,e,i,r){super(t,e),this.reason=i,this.code=r}toString(){return`NavigationCancel(id: ${this.id}, url: '${this.url}')`}};function fT(n){return n instanceof Gn&&(n.code===qt.Redirect||n.code===qt.SupersededByNewNavigation)}var _r=class extends An{reason;code;type=xt.NavigationSkipped;constructor(t,e,i,r){super(t,e),this.reason=i,this.code=r}},ns=class extends An{error;target;type=xt.NavigationError;constructor(t,e,i,r){super(t,e),this.error=i,this.target=r}toString(){return`NavigationError(id: ${this.id}, url: '${this.url}', error: ${this.error})`}},mc=class extends An{urlAfterRedirects;state;type=xt.RoutesRecognized;constructor(t,e,i,r){super(t,e),this.urlAfterRedirects=i,this.state=r}toString(){return`RoutesRecognized(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`}},Gf=class extends An{urlAfterRedirects;state;type=xt.GuardsCheckStart;constructor(t,e,i,r){super(t,e),this.urlAfterRedirects=i,this.state=r}toString(){return`GuardsCheckStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`}},qf=class extends An{urlAfterRedirects;state;shouldActivate;type=xt.GuardsCheckEnd;constructor(t,e,i,r,o){super(t,e),this.urlAfterRedirects=i,this.state=r,this.shouldActivate=o}toString(){return`GuardsCheckEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state}, shouldActivate: ${this.shouldActivate})`}},Kf=class extends An{urlAfterRedirects;state;type=xt.ResolveStart;constructor(t,e,i,r){super(t,e),this.urlAfterRedirects=i,this.state=r}toString(){return`ResolveStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`}},Yf=class extends An{urlAfterRedirects;state;type=xt.ResolveEnd;constructor(t,e,i,r){super(t,e),this.urlAfterRedirects=i,this.state=r}toString(){return`ResolveEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`}},Zf=class{route;type=xt.RouteConfigLoadStart;constructor(t){this.route=t}toString(){return`RouteConfigLoadStart(path: ${this.route.path})`}},Xf=class{route;type=xt.RouteConfigLoadEnd;constructor(t){this.route=t}toString(){return`RouteConfigLoadEnd(path: ${this.route.path})`}},Qf=class{snapshot;type=xt.ChildActivationStart;constructor(t){this.snapshot=t}toString(){return`ChildActivationStart(path: '${this.snapshot.routeConfig&&this.snapshot.routeConfig.path||""}')`}},Jf=class{snapshot;type=xt.ChildActivationEnd;constructor(t){this.snapshot=t}toString(){return`ChildActivationEnd(path: '${this.snapshot.routeConfig&&this.snapshot.routeConfig.path||""}')`}},eh=class{snapshot;type=xt.ActivationStart;constructor(t){this.snapshot=t}toString(){return`ActivationStart(path: '${this.snapshot.routeConfig&&this.snapshot.routeConfig.path||""}')`}},th=class{snapshot;type=xt.ActivationEnd;constructor(t){this.snapshot=t}toString(){return`ActivationEnd(path: '${this.snapshot.routeConfig&&this.snapshot.routeConfig.path||""}')`}};var fa=class{},gc=class{},ha=class{url;navigationBehaviorOptions;constructor(t,e){this.url=t,this.navigationBehaviorOptions=e}};function aL(n){return!(n instanceof fa)&&!(n instanceof ha)&&!(n instanceof gc)}var nh=class{rootInjector;outlet=null;route=null;children;attachRef=null;get injector(){return this.route?.snapshot._environmentInjector??this.rootInjector}constructor(t){this.rootInjector=t,this.children=new va(this.rootInjector)}},va=(()=>{class n{rootInjector;contexts=new Map;constructor(e){this.rootInjector=e}onChildOutletCreated(e,i){let r=this.getOrCreateContext(e);r.outlet=i,this.contexts.set(e,r)}onChildOutletDestroyed(e){let i=this.getContext(e);i&&(i.outlet=null,i.attachRef=null)}onOutletDeactivated(){let e=this.contexts;return this.contexts=new Map,e}onOutletReAttached(e){this.contexts=e}getOrCreateContext(e){let i=this.getContext(e);return i||(i=new nh(this.rootInjector),this.contexts.set(e,i)),i}getContext(e){return this.contexts.get(e)||null}static \u0275fac=function(i){return new(i||n)(ne($e))};static \u0275prov=C({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})(),ih=class{_root;constructor(t){this._root=t}get root(){return this._root.value}parent(t){let e=this.pathFromRoot(t);return e.length>1?e[e.length-2]:null}children(t){let e=jv(t,this._root);return e?e.children.map(i=>i.value):[]}firstChild(t){let e=jv(t,this._root);return e&&e.children.length>0?e.children[0].value:null}siblings(t){let e=Uv(t,this._root);return e.length<2?[]:e[e.length-2].children.map(r=>r.value).filter(r=>r!==t)}pathFromRoot(t){return Uv(t,this._root).map(e=>e.value)}};function jv(n,t){if(n===t.value)return t;for(let e of t.children){let i=jv(n,e);if(i)return i}return null}function Uv(n,t){if(n===t.value)return[t];for(let e of t.children){let i=Uv(n,e);if(i.length)return i.unshift(t),i}return[]}var Mn=class{value;children;constructor(t,e){this.value=t,this.children=e}toString(){return`TreeNode(${this.value})`}};function ca(n){let t={};return n&&n.children.forEach(e=>t[e.value.outlet]=e),t}var yc=class extends ih{snapshot;constructor(t,e){super(t),this.snapshot=e,Zv(this,t)}toString(){return this.snapshot.toString()}};function hT(n,t){let e=lL(n,t),i=new rt([new to("",{})]),r=new rt({}),o=new rt({}),s=new rt({}),a=new rt(""),l=new Cr(i,r,s,a,o,ce,n,e.root);return l.snapshot=e.root,new yc(new Mn(l,[]),e)}function lL(n,t){let e={},i={},r={},s=new pa([],e,r,"",i,ce,n,null,{},t);return new vc("",new Mn(s,[]))}var Cr=class{urlSubject;paramsSubject;queryParamsSubject;fragmentSubject;dataSubject;outlet;component;snapshot;_futureSnapshot;_routerState;_paramMap;_queryParamMap;title;url;params;queryParams;fragment;data;constructor(t,e,i,r,o,s,a,l){this.urlSubject=t,this.paramsSubject=e,this.queryParamsSubject=i,this.fragmentSubject=r,this.dataSubject=o,this.outlet=s,this.component=a,this._futureSnapshot=l,this.title=this.dataSubject?.pipe(ue(c=>c[Cc]))??M(void 0),this.url=t,this.params=e,this.queryParams=i,this.fragment=r,this.data=o}get routeConfig(){return this._futureSnapshot.routeConfig}get root(){return this._routerState.root}get parent(){return this._routerState.parent(this)}get firstChild(){return this._routerState.firstChild(this)}get children(){return this._routerState.children(this)}get pathFromRoot(){return this._routerState.pathFromRoot(this)}get paramMap(){return this._paramMap??=this.params.pipe(ue(t=>es(t))),this._paramMap}get queryParamMap(){return this._queryParamMap??=this.queryParams.pipe(ue(t=>es(t))),this._queryParamMap}toString(){return this.snapshot?this.snapshot.toString():`Future(${this._futureSnapshot})`}};function Yv(n,t,e="emptyOnly"){let i,{routeConfig:r}=n;return t!==null&&(e==="always"||r?.path===""||!t.component&&!t.routeConfig?.loadComponent)?i={params:g(g({},t.params),n.params),data:g(g({},t.data),n.data),resolve:g(g(g(g({},n.data),t.data),r?.data),n._resolvedData)}:i={params:g({},n.params),data:g({},n.data),resolve:g(g({},n.data),n._resolvedData??{})},r&&mT(r)&&(i.resolve[Cc]=r.title),i}var pa=class{url;params;queryParams;fragment;data;outlet;component;routeConfig;_resolve;_resolvedData;_routerState;_paramMap;_queryParamMap;_environmentInjector;get title(){return this.data?.[Cc]}constructor(t,e,i,r,o,s,a,l,c,d){this.url=t,this.params=e,this.queryParams=i,this.fragment=r,this.data=o,this.outlet=s,this.component=a,this.routeConfig=l,this._resolve=c,this._environmentInjector=d}get root(){return this._routerState.root}get parent(){return this._routerState.parent(this)}get firstChild(){return this._routerState.firstChild(this)}get children(){return this._routerState.children(this)}get pathFromRoot(){return this._routerState.pathFromRoot(this)}get paramMap(){return this._paramMap??=es(this.params),this._paramMap}get queryParamMap(){return this._queryParamMap??=es(this.queryParams),this._queryParamMap}toString(){let t=this.url.map(i=>i.toString()).join("/"),e=this.routeConfig?this.routeConfig.path:"";return`Route(url:'${t}', path:'${e}')`}},vc=class extends ih{url;constructor(t,e){super(e),this.url=t,Zv(this,e)}toString(){return pT(this._root)}};function Zv(n,t){t.value._routerState=n,t.children.forEach(e=>Zv(n,e))}function pT(n){let t=n.children.length>0?` { ${n.children.map(pT).join(", ")} } `:"";return`${n.value}${t}`}function Ov(n){if(n.snapshot){let t=n.snapshot,e=n._futureSnapshot;n.snapshot=e,ji(t.queryParams,e.queryParams)||n.queryParamsSubject.next(e.queryParams),t.fragment!==e.fragment&&n.fragmentSubject.next(e.fragment),ji(t.params,e.params)||n.paramsSubject.next(e.params),FF(t.url,e.url)||n.urlSubject.next(e.url),ji(t.data,e.data)||n.dataSubject.next(e.data)}else n.snapshot=n._futureSnapshot,n.dataSubject.next(n._futureSnapshot.data)}function Hv(n,t){let e=ji(n.params,t.params)&&UF(n.url,t.url),i=!n.parent!=!t.parent;return e&&!i&&(!n.parent||Hv(n.parent,t.parent))}function mT(n){return typeof n.title=="string"||n.title===null}var gT=new b(""),Dc=(()=>{class n{activated=null;get activatedComponentRef(){return this.activated}_activatedRoute=null;name=ce;activateEvents=new F;deactivateEvents=new F;attachEvents=new F;detachEvents=new F;routerOutletData=Li();parentContexts=f(va);location=f(ht);changeDetector=f(et);inputBinder=f(ah,{optional:!0});supportsBindingToComponentInputs=!0;ngOnChanges(e){if(e.name){let{firstChange:i,previousValue:r}=e.name;if(i)return;this.isTrackedInParentContexts(r)&&(this.deactivate(),this.parentContexts.onChildOutletDestroyed(r)),this.initializeOutletWithName()}}ngOnDestroy(){this.isTrackedInParentContexts(this.name)&&this.parentContexts.onChildOutletDestroyed(this.name),this.inputBinder?.unsubscribeFromRouteData(this)}isTrackedInParentContexts(e){return this.parentContexts.getContext(e)?.outlet===this}ngOnInit(){this.initializeOutletWithName()}initializeOutletWithName(){if(this.parentContexts.onChildOutletCreated(this.name,this),this.activated)return;let e=this.parentContexts.getContext(this.name);e?.route&&(e.attachRef?this.attach(e.attachRef,e.route):this.activateWith(e.route,e.injector))}get isActivated(){return!!this.activated}get component(){if(!this.activated)throw new S(4012,!1);return this.activated.instance}get activatedRoute(){if(!this.activated)throw new S(4012,!1);return this._activatedRoute}get activatedRouteData(){return this._activatedRoute?this._activatedRoute.snapshot.data:{}}detach(){if(!this.activated)throw new S(4012,!1);this.location.detach();let e=this.activated;return this.activated=null,this._activatedRoute=null,this.detachEvents.emit(e.instance),e}attach(e,i){this.activated=e,this._activatedRoute=i,this.location.insert(e.hostView),this.inputBinder?.bindActivatedRouteToOutletComponent(this),this.attachEvents.emit(e.instance)}deactivate(){if(this.activated){let e=this.component;this.activated.destroy(),this.activated=null,this._activatedRoute=null,this.deactivateEvents.emit(e)}}activateWith(e,i){if(this.isActivated)throw new S(4013,!1);this._activatedRoute=e;let r=this.location,s=e.snapshot.component,a=this.parentContexts.getOrCreateContext(this.name).children,l=new $v(e,a,r.injector,this.routerOutletData);this.activated=r.createComponent(s,{index:r.length,injector:l,environmentInjector:i}),this.changeDetector.markForCheck(),this.inputBinder?.bindActivatedRouteToOutletComponent(this),this.activateEvents.emit(this.activated.instance)}static \u0275fac=function(i){return new(i||n)};static \u0275dir=Y({type:n,selectors:[["router-outlet"]],inputs:{name:"name",routerOutletData:[1,"routerOutletData"]},outputs:{activateEvents:"activate",deactivateEvents:"deactivate",attachEvents:"attach",detachEvents:"detach"},exportAs:["outlet"],features:[It]})}return n})(),$v=class{route;childContexts;parent;outletData;constructor(t,e,i,r){this.route=t,this.childContexts=e,this.parent=i,this.outletData=r}get(t,e){return t===Cr?this.route:t===va?this.childContexts:t===gT?this.outletData:this.parent.get(t,e)}},ah=new b("");var Xv=(()=>{class n{static \u0275fac=function(i){return new(i||n)};static \u0275cmp=J({type:n,selectors:[["ng-component"]],exportAs:["emptyRouterOutlet"],decls:1,vars:0,template:function(i,r){i&1&&me(0,"router-outlet")},dependencies:[Dc],encapsulation:2})}return n})();function Qv(n){let t=n.children&&n.children.map(Qv),e=t?V(g({},n),{children:t}):g({},n);return!e.component&&!e.loadComponent&&(t||e.loadChildren)&&e.outlet&&e.outlet!==ce&&(e.component=Xv),e}function cL(n,t,e){let i=bc(n,t._root,e?e._root:void 0);return new yc(i,t)}function bc(n,t,e){if(e&&n.shouldReuseRoute(t.value,e.value.snapshot)){let i=e.value;i._futureSnapshot=t.value;let r=dL(n,t,e);return new Mn(i,r)}else{if(n.shouldAttach(t.value)){let o=n.retrieve(t.value);if(o!==null){let s=o.route;return s.value._futureSnapshot=t.value,s.children=t.children.map(a=>bc(n,a)),s}}let i=uL(t.value),r=t.children.map(o=>bc(n,o));return new Mn(i,r)}}function dL(n,t,e){return t.children.map(i=>{for(let r of e.children)if(n.shouldReuseRoute(i.value,r.value.snapshot))return bc(n,i,r);return bc(n,i)})}function uL(n){return new Cr(new rt(n.url),new rt(n.params),new rt(n.queryParams),new rt(n.fragment),new rt(n.data),n.outlet,n.component,n)}var ma=class{redirectTo;navigationBehaviorOptions;constructor(t,e){this.redirectTo=t,this.navigationBehaviorOptions=e}},yT="ngNavigationCancelingError";function rh(n,t){let{redirectTo:e,navigationBehaviorOptions:i}=io(t)?{redirectTo:t,navigationBehaviorOptions:void 0}:t,r=vT(!1,qt.Redirect);return r.url=e,r.navigationBehaviorOptions=i,r}function vT(n,t){let e=new Error(`NavigationCancelingError: ${n||""}`);return e[yT]=!0,e.cancellationCode=t,e}function fL(n){return bT(n)&&io(n.url)}function bT(n){return!!n&&n[yT]}var zv=class{routeReuseStrategy;futureState;currState;forwardEvent;inputBindingEnabled;constructor(t,e,i,r,o){this.routeReuseStrategy=t,this.futureState=e,this.currState=i,this.forwardEvent=r,this.inputBindingEnabled=o}activate(t){let e=this.futureState._root,i=this.currState?this.currState._root:null;this.deactivateChildRoutes(e,i,t),Ov(this.futureState.root),this.activateChildRoutes(e,i,t)}deactivateChildRoutes(t,e,i){let r=ca(e);t.children.forEach(o=>{let s=o.value.outlet;this.deactivateRoutes(o,r[s],i),delete r[s]}),Object.values(r).forEach(o=>{this.deactivateRouteAndItsChildren(o,i)})}deactivateRoutes(t,e,i){let r=t.value,o=e?e.value:null;if(r===o)if(r.component){let s=i.getContext(r.outlet);s&&this.deactivateChildRoutes(t,e,s.children)}else this.deactivateChildRoutes(t,e,i);else o&&this.deactivateRouteAndItsChildren(e,i)}deactivateRouteAndItsChildren(t,e){t.value.component&&this.routeReuseStrategy.shouldDetach(t.value.snapshot)?this.detachAndStoreRouteSubtree(t,e):this.deactivateRouteAndOutlet(t,e)}detachAndStoreRouteSubtree(t,e){let i=e.getContext(t.value.outlet),r=i&&t.value.component?i.children:e,o=ca(t);for(let s of Object.values(o))this.deactivateRouteAndItsChildren(s,r);if(i&&i.outlet){let s=i.outlet.detach(),a=i.children.onOutletDeactivated();this.routeReuseStrategy.store(t.value.snapshot,{componentRef:s,route:t,contexts:a})}}deactivateRouteAndOutlet(t,e){let i=e.getContext(t.value.outlet),r=i&&t.value.component?i.children:e,o=ca(t);for(let s of Object.values(o))this.deactivateRouteAndItsChildren(s,r);i&&(i.outlet&&(i.outlet.deactivate(),i.children.onOutletDeactivated()),i.attachRef=null,i.route=null)}activateChildRoutes(t,e,i){let r=ca(e);t.children.forEach(o=>{this.activateRoutes(o,r[o.value.outlet],i),this.forwardEvent(new th(o.value.snapshot))}),t.children.length&&this.forwardEvent(new Jf(t.value.snapshot))}activateRoutes(t,e,i){let r=t.value,o=e?e.value:null;if(Ov(r),r===o)if(r.component){let s=i.getOrCreateContext(r.outlet);this.activateChildRoutes(t,e,s.children)}else this.activateChildRoutes(t,e,i);else if(r.component){let s=i.getOrCreateContext(r.outlet);if(this.routeReuseStrategy.shouldAttach(r.snapshot)){let a=this.routeReuseStrategy.retrieve(r.snapshot);this.routeReuseStrategy.store(r.snapshot,null),s.children.onOutletReAttached(a.contexts),s.attachRef=a.componentRef,s.route=a.route.value,s.outlet&&s.outlet.attach(a.componentRef,a.route.value),Ov(a.route.value),this.activateChildRoutes(t,null,s.children)}else s.attachRef=null,s.route=r,s.outlet&&s.outlet.activateWith(r,s.injector),this.activateChildRoutes(t,null,s.children)}else this.activateChildRoutes(t,null,i)}},oh=class{path;route;constructor(t){this.path=t,this.route=this.path[this.path.length-1]}},ua=class{component;route;constructor(t,e){this.component=t,this.route=e}};function hL(n,t,e){let i=n._root,r=t?t._root:null;return cc(i,r,e,[i.value])}function pL(n){let t=n.routeConfig?n.routeConfig.canActivateChild:null;return!t||t.length===0?null:{node:n,guards:t}}function ba(n,t){let e=Symbol(),i=t.get(n,e);return i===e?typeof n=="function"&&!Em(n)?n:t.get(n):i}function cc(n,t,e,i,r={canDeactivateChecks:[],canActivateChecks:[]}){let o=ca(t);return n.children.forEach(s=>{mL(s,o[s.value.outlet],e,i.concat([s.value]),r),delete o[s.value.outlet]}),Object.entries(o).forEach(([s,a])=>fc(a,e.getContext(s),r)),r}function mL(n,t,e,i,r={canDeactivateChecks:[],canActivateChecks:[]}){let o=n.value,s=t?t.value:null,a=e?e.getContext(n.value.outlet):null;if(s&&o.routeConfig===s.routeConfig){let l=gL(s,o,o.routeConfig.runGuardsAndResolvers);l?r.canActivateChecks.push(new oh(i)):(o.data=s.data,o._resolvedData=s._resolvedData),o.component?cc(n,t,a?a.children:null,i,r):cc(n,t,e,i,r),l&&a&&a.outlet&&a.outlet.isActivated&&r.canDeactivateChecks.push(new ua(a.outlet.component,s))}else s&&fc(t,a,r),r.canActivateChecks.push(new oh(i)),o.component?cc(n,null,a?a.children:null,i,r):cc(n,null,e,i,r);return r}function gL(n,t,e){if(typeof e=="function")return $t(t._environmentInjector,()=>e(n,t));switch(e){case"pathParamsChange":return!Jo(n.url,t.url);case"pathParamsOrQueryParamsChange":return!Jo(n.url,t.url)||!ji(n.queryParams,t.queryParams);case"always":return!0;case"paramsOrQueryParamsChange":return!Hv(n,t)||!ji(n.queryParams,t.queryParams);default:return!Hv(n,t)}}function fc(n,t,e){let i=ca(n),r=n.value;Object.entries(i).forEach(([o,s])=>{r.component?t?fc(s,t.children.getContext(o),e):fc(s,null,e):fc(s,t,e)}),r.component?t&&t.outlet&&t.outlet.isActivated?e.canDeactivateChecks.push(new ua(t.outlet.component,r)):e.canDeactivateChecks.push(new ua(null,r)):e.canDeactivateChecks.push(new ua(null,r))}function Ec(n){return typeof n=="function"}function yL(n){return typeof n=="boolean"}function vL(n){return n&&Ec(n.canLoad)}function bL(n){return n&&Ec(n.canActivate)}function _L(n){return n&&Ec(n.canActivateChild)}function CL(n){return n&&Ec(n.canDeactivate)}function DL(n){return n&&Ec(n.canMatch)}function _T(n){return n instanceof Yi||n?.name==="EmptyError"}var Bf=Symbol("INITIAL_VALUE");function ga(){return ut(n=>cl(n.map(t=>t.pipe(gt(1),dt(Bf)))).pipe(ue(t=>{for(let e of t)if(e!==!0){if(e===Bf)return Bf;if(e===!1||EL(e))return e}return!0}),_e(t=>t!==Bf),gt(1)))}function EL(n){return io(n)||n instanceof ma}function CT(n){return n.aborted?M(void 0).pipe(gt(1)):new U(t=>{let e=()=>{t.next(),t.complete()};return n.addEventListener("abort",e),()=>n.removeEventListener("abort",e)})}function DT(n){return K(CT(n))}function wL(n){return Xt(t=>{let{targetSnapshot:e,currentSnapshot:i,guards:{canActivateChecks:r,canDeactivateChecks:o}}=t;return o.length===0&&r.length===0?M(V(g({},t),{guardsResult:!0})):SL(o,e,i).pipe(Xt(s=>s&&yL(s)?TL(e,r,n):M(s)),ue(s=>V(g({},t),{guardsResult:s})))})}function SL(n,t,e){return Ze(n).pipe(Xt(i=>AL(i.component,i.route,e,t)),Qi(i=>i!==!0,!0))}function TL(n,t,e){return Ze(t).pipe(Gd(i=>Lr(xL(i.route.parent,e),IL(i.route,e),kL(n,i.path),ML(n,i.route))),Qi(i=>i!==!0,!0))}function IL(n,t){return n!==null&&t&&t(new eh(n)),M(!0)}function xL(n,t){return n!==null&&t&&t(new Qf(n)),M(!0)}function ML(n,t){let e=t.routeConfig?t.routeConfig.canActivate:null;if(!e||e.length===0)return M(!0);let i=e.map(r=>Io(()=>{let o=t._environmentInjector,s=ba(r,o),a=bL(s)?s.canActivate(t,n):$t(o,()=>s(t,n));return is(a).pipe(Qi())}));return M(i).pipe(ga())}function kL(n,t){let e=t[t.length-1],r=t.slice(0,t.length-1).reverse().map(o=>pL(o)).filter(o=>o!==null).map(o=>Io(()=>{let s=o.guards.map(a=>{let l=o.node._environmentInjector,c=ba(a,l),d=_L(c)?c.canActivateChild(e,n):$t(l,()=>c(e,n));return is(d).pipe(Qi())});return M(s).pipe(ga())}));return M(r).pipe(ga())}function AL(n,t,e,i){let r=t&&t.routeConfig?t.routeConfig.canDeactivate:null;if(!r||r.length===0)return M(!0);let o=r.map(s=>{let a=t._environmentInjector,l=ba(s,a),c=CL(l)?l.canDeactivate(n,t,e,i):$t(a,()=>l(n,t,e,i));return is(c).pipe(Qi())});return M(o).pipe(ga())}function RL(n,t,e,i,r){let o=t.canLoad;if(o===void 0||o.length===0)return M(!0);let s=o.map(a=>{let l=ba(a,n),c=vL(l)?l.canLoad(t,e):$t(n,()=>l(t,e)),d=is(c);return r?d.pipe(DT(r)):d});return M(s).pipe(ga(),ET(i))}function ET(n){return Yp(Dt(t=>{if(typeof t!="boolean")throw rh(n,t)}),ue(t=>t===!0))}function OL(n,t,e,i,r,o){let s=t.canMatch;if(!s||s.length===0)return M(!0);let a=s.map(l=>{let c=ba(l,n),d=DL(c)?c.canMatch(t,e,r):$t(n,()=>c(t,e,r));return is(d).pipe(DT(o))});return M(a).pipe(ga(),ET(i))}var br=class n extends Error{segmentGroup;constructor(t){super(),this.segmentGroup=t||null,Object.setPrototypeOf(this,n.prototype)}},_c=class n extends Error{urlTree;constructor(t){super(),this.urlTree=t,Object.setPrototypeOf(this,n.prototype)}};function NL(n){throw new S(4e3,!1)}function PL(n){throw vT(!1,qt.GuardRejected)}var Wv=class{urlSerializer;urlTree;constructor(t,e){this.urlSerializer=t,this.urlTree=e}async lineralizeSegments(t,e){let i=[],r=e.root;for(;;){if(i=i.concat(r.segments),r.numberOfChildren===0)return i;if(r.numberOfChildren>1||!r.children[ce])throw NL(`${t.redirectTo}`);r=r.children[ce]}}async applyRedirectCommands(t,e,i,r,o){let s=await FL(e,r,o);if(s instanceof kn)throw new _c(s);let a=this.applyRedirectCreateUrlTree(s,this.urlSerializer.parse(s),t,i);if(s[0]==="/")throw new _c(a);return a}applyRedirectCreateUrlTree(t,e,i,r){let o=this.createSegmentGroup(t,e.root,i,r);return new kn(o,this.createQueryParams(e.queryParams,this.urlTree.queryParams),e.fragment)}createQueryParams(t,e){let i={};return Object.entries(t).forEach(([r,o])=>{if(typeof o=="string"&&o[0]===":"){let a=o.substring(1);i[r]=e[a]}else i[r]=o}),i}createSegmentGroup(t,e,i,r){let o=this.createSegments(t,e.segments,i,r),s={};return Object.entries(e.children).forEach(([a,l])=>{s[a]=this.createSegmentGroup(t,l,i,r)}),new Oe(o,s)}createSegments(t,e,i,r){return e.map(o=>o.path[0]===":"?this.findPosParam(t,o,r):this.findOrReturn(o,i))}findPosParam(t,e,i){let r=i[e.path.substring(1)];if(!r)throw new S(4001,!1);return r}findOrReturn(t,e){let i=0;for(let r of e){if(r.path===t.path)return e.splice(i),r;i++}return t}};function FL(n,t,e){if(typeof n=="string")return Promise.resolve(n);let i=n;return $f(is($t(e,()=>i(t))))}function LL(n,t){return n.providers&&!n._injector&&(n._injector=Kl(n.providers,t,`Route: ${n.path}`)),n._injector??t}function bi(n){return n.outlet||ce}function VL(n,t){let e=n.filter(i=>bi(i)===t);return e.push(...n.filter(i=>bi(i)!==t)),e}var Gv={matched:!1,consumedSegments:[],remainingSegments:[],parameters:{},positionalParamSegments:{}};function wT(n){return{routeConfig:n.routeConfig,url:n.url,params:n.params,queryParams:n.queryParams,fragment:n.fragment,data:n.data,outlet:n.outlet,title:n.title,paramMap:n.paramMap,queryParamMap:n.queryParamMap}}function BL(n,t,e,i,r,o,s){let a=ST(n,t,e);if(!a.matched)return M(a);let l=wT(o(a));return i=LL(t,i),OL(i,t,e,r,l,s).pipe(ue(c=>c===!0?a:g({},Gv)))}function ST(n,t,e){if(t.path==="")return t.pathMatch==="full"&&(n.hasChildren()||e.length>0)?g({},Gv):{matched:!0,consumedSegments:[],remainingSegments:e,parameters:{},positionalParamSegments:{}};let r=(t.matcher||YS)(e,n,t);if(!r)return g({},Gv);let o={};Object.entries(r.posParams??{}).forEach(([a,l])=>{o[a]=l.path});let s=r.consumed.length>0?g(g({},o),r.consumed[r.consumed.length-1].parameters):o;return{matched:!0,consumedSegments:r.consumed,remainingSegments:e.slice(r.consumed.length),parameters:s,positionalParamSegments:r.posParams??{}}}function qS(n,t,e,i,r){return e.length>0&&HL(n,e,i,r)?{segmentGroup:new Oe(t,UL(i,new Oe(e,n.children))),slicedSegments:[]}:e.length===0&&$L(n,e,i)?{segmentGroup:new Oe(n.segments,jL(n,e,i,n.children)),slicedSegments:e}:{segmentGroup:new Oe(n.segments,n.children),slicedSegments:e}}function jL(n,t,e,i){let r={};for(let o of e)if(lh(n,t,o)&&!i[bi(o)]){let s=new Oe([],{});r[bi(o)]=s}return g(g({},i),r)}function UL(n,t){let e={};e[ce]=t;for(let i of n)if(i.path===""&&bi(i)!==ce){let r=new Oe([],{});e[bi(i)]=r}return e}function HL(n,t,e,i){return e.some(r=>!lh(n,t,r)||!(bi(r)!==ce)?!1:!(i!==void 0&&bi(r)===i))}function $L(n,t,e){return e.some(i=>lh(n,t,i))}function lh(n,t,e){return(n.hasChildren()||t.length>0)&&e.pathMatch==="full"?!1:e.path===""}function zL(n,t,e){return t.length===0&&!n.children[e]}var qv=class{};async function WL(n,t,e,i,r,o,s="emptyOnly",a){return new Kv(n,t,e,i,r,s,o,a).recognize()}var GL=31,Kv=class{injector;configLoader;rootComponentType;config;urlTree;paramsInheritanceStrategy;urlSerializer;abortSignal;applyRedirects;absoluteRedirectCount=0;allowRedirects=!0;constructor(t,e,i,r,o,s,a,l){this.injector=t,this.configLoader=e,this.rootComponentType=i,this.config=r,this.urlTree=o,this.paramsInheritanceStrategy=s,this.urlSerializer=a,this.abortSignal=l,this.applyRedirects=new Wv(this.urlSerializer,this.urlTree)}noMatchError(t){return new S(4002,`'${t.segmentGroup}'`)}async recognize(){let t=qS(this.urlTree.root,[],[],this.config).segmentGroup,{children:e,rootSnapshot:i}=await this.match(t),r=new Mn(i,e),o=new vc("",r),s=aT(i,[],this.urlTree.queryParams,this.urlTree.fragment);return s.queryParams=this.urlTree.queryParams,o.url=this.urlSerializer.serialize(s),{state:o,tree:s}}async match(t){let e=new pa([],Object.freeze({}),Object.freeze(g({},this.urlTree.queryParams)),this.urlTree.fragment,Object.freeze({}),ce,this.rootComponentType,null,{},this.injector);try{return{children:await this.processSegmentGroup(this.injector,this.config,t,ce,e),rootSnapshot:e}}catch(i){if(i instanceof _c)return this.urlTree=i.urlTree,this.match(i.urlTree.root);throw i instanceof br?this.noMatchError(i):i}}async processSegmentGroup(t,e,i,r,o){if(i.segments.length===0&&i.hasChildren())return this.processChildren(t,e,i,o);let s=await this.processSegment(t,e,i,i.segments,r,!0,o);return s instanceof Mn?[s]:[]}async processChildren(t,e,i,r){let o=[];for(let l of Object.keys(i.children))l==="primary"?o.unshift(l):o.push(l);let s=[];for(let l of o){let c=i.children[l],d=VL(e,l),u=await this.processSegmentGroup(t,d,c,l,r);s.push(...u)}let a=TT(s);return qL(a),a}async processSegment(t,e,i,r,o,s,a){for(let l of e)try{return await this.processSegmentAgainstRoute(l._injector??t,e,l,i,r,o,s,a)}catch(c){if(c instanceof br||_T(c))continue;throw c}if(zL(i,r,o))return new qv;throw new br(i)}async processSegmentAgainstRoute(t,e,i,r,o,s,a,l){if(bi(i)!==s&&(s===ce||!lh(r,o,i)))throw new br(r);if(i.redirectTo===void 0)return this.matchSegmentAgainstRoute(t,r,i,o,s,l);if(this.allowRedirects&&a)return this.expandSegmentAgainstRouteUsingRedirect(t,r,e,i,o,s,l);throw new br(r)}async expandSegmentAgainstRouteUsingRedirect(t,e,i,r,o,s,a){let{matched:l,parameters:c,consumedSegments:d,positionalParamSegments:u,remainingSegments:h}=ST(e,r,o);if(!l)throw new br(e);typeof r.redirectTo=="string"&&r.redirectTo[0]==="/"&&(this.absoluteRedirectCount++,this.absoluteRedirectCount>GL&&(this.allowRedirects=!1));let p=this.createSnapshot(t,r,o,c,a);if(this.abortSignal.aborted)throw new Error(this.abortSignal.reason);let m=await this.applyRedirects.applyRedirectCommands(d,r.redirectTo,u,wT(p),t),w=await this.applyRedirects.lineralizeSegments(r,m);return this.processSegment(t,i,e,w.concat(h),s,!1,a)}createSnapshot(t,e,i,r,o){let s=new pa(i,r,Object.freeze(g({},this.urlTree.queryParams)),this.urlTree.fragment,YL(e),bi(e),e.component??e._loadedComponent??null,e,ZL(e),t),a=Yv(s,o,this.paramsInheritanceStrategy);return s.params=Object.freeze(a.params),s.data=Object.freeze(a.data),s}async matchSegmentAgainstRoute(t,e,i,r,o,s){if(this.abortSignal.aborted)throw new Error(this.abortSignal.reason);let a=nt=>this.createSnapshot(t,i,nt.consumedSegments,nt.parameters,s),l=await $f(BL(e,i,r,t,this.urlSerializer,a,this.abortSignal));if(i.path==="**"&&(e.children={}),!l?.matched)throw new br(e);t=i._injector??t;let{routes:c}=await this.getChildConfig(t,i,r),d=i._loadedInjector??t,{parameters:u,consumedSegments:h,remainingSegments:p}=l,m=this.createSnapshot(t,i,h,u,s),{segmentGroup:w,slicedSegments:k}=qS(e,h,p,c,o);if(k.length===0&&w.hasChildren()){let nt=await this.processChildren(d,c,w,m);return new Mn(m,nt)}if(c.length===0&&k.length===0)return new Mn(m,[]);let N=bi(i)===o,De=await this.processSegment(d,c,w,k,N?ce:o,!0,m);return new Mn(m,De instanceof Mn?[De]:[])}async getChildConfig(t,e,i){if(e.children)return{routes:e.children,injector:t};if(e.loadChildren){if(e._loadedRoutes!==void 0){let o=e._loadedNgModuleFactory;return o&&!e._loadedInjector&&(e._loadedInjector=o.create(t).injector),{routes:e._loadedRoutes,injector:e._loadedInjector}}if(this.abortSignal.aborted)throw new Error(this.abortSignal.reason);if(await $f(RL(t,e,i,this.urlSerializer,this.abortSignal))){let o=await this.configLoader.loadChildren(t,e);return e._loadedRoutes=o.routes,e._loadedInjector=o.injector,e._loadedNgModuleFactory=o.factory,o}throw PL(e)}return{routes:[],injector:t}}};function qL(n){n.sort((t,e)=>t.value.outlet===ce?-1:e.value.outlet===ce?1:t.value.outlet.localeCompare(e.value.outlet))}function KL(n){let t=n.value.routeConfig;return t&&t.path===""}function TT(n){let t=[],e=new Set;for(let i of n){if(!KL(i)){t.push(i);continue}let r=t.find(o=>i.value.routeConfig===o.value.routeConfig);r!==void 0?(r.children.push(...i.children),e.add(r)):t.push(i)}for(let i of e){let r=TT(i.children);t.push(new Mn(i.value,r))}return t.filter(i=>!e.has(i))}function YL(n){return n.data||{}}function ZL(n){return n.resolve||{}}function XL(n,t,e,i,r,o,s){return Xt(async a=>{let{state:l,tree:c}=await WL(n,t,e,i,a.extractedUrl,r,o,s);return V(g({},a),{targetSnapshot:l,urlAfterRedirects:c})})}function QL(n){return Xt(t=>{let{targetSnapshot:e,guards:{canActivateChecks:i}}=t;if(!i.length)return M(t);let r=new Set(i.map(a=>a.route)),o=new Set;for(let a of r)if(!o.has(a))for(let l of IT(a))o.add(l);let s=0;return Ze(o).pipe(Gd(a=>r.has(a)?JL(a,e,n):(a.data=Yv(a,a.parent,n).resolve,M(void 0))),Dt(()=>s++),qd(1),Xt(a=>s===o.size?M(t):je))})}function IT(n){let t=n.children.map(e=>IT(e)).flat();return[n,...t]}function JL(n,t,e){let i=n.routeConfig,r=n._resolve;return i?.title!==void 0&&!mT(i)&&(r[Cc]=i.title),Io(()=>(n.data=Yv(n,n.parent,e).resolve,e1(r,n,t).pipe(ue(o=>(n._resolvedData=o,n.data=g(g({},n.data),o),null)))))}function e1(n,t,e){let i=Pv(n);if(i.length===0)return M({});let r={};return Ze(i).pipe(Xt(o=>t1(n[o],t,e).pipe(Qi(),Dt(s=>{if(s instanceof ma)throw rh(new no,s);r[o]=s}))),qd(1),ue(()=>r),Zi(o=>_T(o)?je:rm(o)))}function t1(n,t,e){let i=t._environmentInjector,r=ba(n,i),o=r.resolve?r.resolve(t,e):$t(i,()=>r(t,e));return is(o)}function KS(n){return ut(t=>{let e=n(t);return e?Ze(e).pipe(ue(()=>t)):M(t)})}var Jv=(()=>{class n{buildTitle(e){let i,r=e.root;for(;r!==void 0;)i=this.getResolvedTitleForRoute(r)??i,r=r.children.find(o=>o.outlet===ce);return i}getResolvedTitleForRoute(e){return e.data[Cc]}static \u0275fac=function(i){return new(i||n)};static \u0275prov=C({token:n,factory:()=>f(xT),providedIn:"root"})}return n})(),xT=(()=>{class n extends Jv{title;constructor(e){super(),this.title=e}updateTitle(e){let i=this.buildTitle(e);i!==void 0&&this.title.setTitle(i)}static \u0275fac=function(i){return new(i||n)(ne(US))};static \u0275prov=C({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})(),_a=new b("",{factory:()=>({})}),wc=new b(""),MT=(()=>{class n{componentLoaders=new WeakMap;childrenLoaders=new WeakMap;onLoadStartListener;onLoadEndListener;compiler=f(Gy);async loadComponent(e,i){if(this.componentLoaders.get(i))return this.componentLoaders.get(i);if(i._loadedComponent)return Promise.resolve(i._loadedComponent);this.onLoadStartListener&&this.onLoadStartListener(i);let r=(async()=>{try{let o=await XS($t(e,()=>i.loadComponent())),s=await RT(AT(o));return this.onLoadEndListener&&this.onLoadEndListener(i),i._loadedComponent=s,s}finally{this.componentLoaders.delete(i)}})();return this.componentLoaders.set(i,r),r}loadChildren(e,i){if(this.childrenLoaders.get(i))return this.childrenLoaders.get(i);if(i._loadedRoutes)return Promise.resolve({routes:i._loadedRoutes,injector:i._loadedInjector});this.onLoadStartListener&&this.onLoadStartListener(i);let r=(async()=>{try{let o=await kT(i,this.compiler,e,this.onLoadEndListener);return i._loadedRoutes=o.routes,i._loadedInjector=o.injector,i._loadedNgModuleFactory=o.factory,o}finally{this.childrenLoaders.delete(i)}})();return this.childrenLoaders.set(i,r),r}static \u0275fac=function(i){return new(i||n)};static \u0275prov=C({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})();async function kT(n,t,e,i){let r=await XS($t(e,()=>n.loadChildren())),o=await RT(AT(r)),s;o instanceof df||Array.isArray(o)?s=o:s=await t.compileModuleAsync(o),i&&i(n);let a,l,c=!1,d;return Array.isArray(s)?(l=s,c=!0):(a=s.create(e).injector,d=s,l=a.get(wc,[],{optional:!0,self:!0}).flat()),{routes:l.map(Qv),injector:a,factory:d}}function n1(n){return n&&typeof n=="object"&&"default"in n}function AT(n){return n1(n)?n.default:n}async function RT(n){return n}var ch=(()=>{class n{static \u0275fac=function(i){return new(i||n)};static \u0275prov=C({token:n,factory:()=>f(i1),providedIn:"root"})}return n})(),i1=(()=>{class n{shouldProcessUrl(e){return!0}extract(e){return e}merge(e,i){return e}static \u0275fac=function(i){return new(i||n)};static \u0275prov=C({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})(),OT=new b("");var r1=()=>{},NT=new b(""),PT=(()=>{class n{currentNavigation=O(null,{equal:()=>!1});currentTransition=null;lastSuccessfulNavigation=O(null);events=new D;transitionAbortWithErrorSubject=new D;configLoader=f(MT);environmentInjector=f($e);destroyRef=f(st);urlSerializer=f(ya);rootContexts=f(va);location=f(yr);inputBindingEnabled=f(ah,{optional:!0})!==null;titleStrategy=f(Jv);options=f(_a,{optional:!0})||{};paramsInheritanceStrategy=this.options.paramsInheritanceStrategy||"emptyOnly";urlHandlingStrategy=f(ch);createViewTransition=f(OT,{optional:!0});navigationErrorHandler=f(NT,{optional:!0});navigationId=0;get hasRequestedNavigation(){return this.navigationId!==0}transitions;afterPreactivation=()=>M(void 0);rootComponentType=null;destroyed=!1;constructor(){let e=r=>this.events.next(new Zf(r)),i=r=>this.events.next(new Xf(r));this.configLoader.onLoadEndListener=i,this.configLoader.onLoadStartListener=e,this.destroyRef.onDestroy(()=>{this.destroyed=!0})}complete(){this.transitions?.complete()}handleNavigationRequest(e){let i=++this.navigationId;Ae(()=>{this.transitions?.next(V(g({},e),{extractedUrl:this.urlHandlingStrategy.extract(e.rawUrl),targetSnapshot:null,targetRouterState:null,guards:{canActivateChecks:[],canDeactivateChecks:[]},guardsResult:null,id:i,routesRecognizeHandler:{},beforeActivateHandler:{}}))})}setupNavigations(e){return this.transitions=new rt(null),this.transitions.pipe(_e(i=>i!==null),ut(i=>{let r=!1,o=new AbortController,s=()=>!r&&this.currentTransition?.id===i.id;return M(i).pipe(ut(a=>{if(this.navigationId>i.id)return this.cancelNavigationTransition(i,"",qt.SupersededByNewNavigation),je;this.currentTransition=i;let l=this.lastSuccessfulNavigation();this.currentNavigation.set({id:a.id,initialUrl:a.rawUrl,extractedUrl:a.extractedUrl,targetBrowserUrl:typeof a.extras.browserUrl=="string"?this.urlSerializer.parse(a.extras.browserUrl):a.extras.browserUrl,trigger:a.source,extras:a.extras,previousNavigation:l?V(g({},l),{previousNavigation:null}):null,abort:()=>o.abort(),routesRecognizeHandler:a.routesRecognizeHandler,beforeActivateHandler:a.beforeActivateHandler});let c=!e.navigated||this.isUpdatingInternalState()||this.isUpdatedBrowserUrl(),d=a.extras.onSameUrlNavigation??e.onSameUrlNavigation;if(!c&&d!=="reload")return this.events.next(new _r(a.id,this.urlSerializer.serialize(a.rawUrl),"",pc.IgnoredSameUrlNavigation)),a.resolve(!1),je;if(this.urlHandlingStrategy.shouldProcessUrl(a.rawUrl))return M(a).pipe(ut(u=>(this.events.next(new ts(u.id,this.urlSerializer.serialize(u.extractedUrl),u.source,u.restoredState)),u.id!==this.navigationId?je:Promise.resolve(u))),XL(this.environmentInjector,this.configLoader,this.rootComponentType,e.config,this.urlSerializer,this.paramsInheritanceStrategy,o.signal),Dt(u=>{i.targetSnapshot=u.targetSnapshot,i.urlAfterRedirects=u.urlAfterRedirects,this.currentNavigation.update(h=>(h.finalUrl=u.urlAfterRedirects,h)),this.events.next(new gc)}),ut(u=>Ze(i.routesRecognizeHandler.deferredHandle??M(void 0)).pipe(ue(()=>u))),Dt(()=>{let u=new mc(a.id,this.urlSerializer.serialize(a.extractedUrl),this.urlSerializer.serialize(a.urlAfterRedirects),a.targetSnapshot);this.events.next(u)}));if(c&&this.urlHandlingStrategy.shouldProcessUrl(a.currentRawUrl)){let{id:u,extractedUrl:h,source:p,restoredState:m,extras:w}=a,k=new ts(u,this.urlSerializer.serialize(h),p,m);this.events.next(k);let N=hT(this.rootComponentType,this.environmentInjector).snapshot;return this.currentTransition=i=V(g({},a),{targetSnapshot:N,urlAfterRedirects:h,extras:V(g({},w),{skipLocationChange:!1,replaceUrl:!1})}),this.currentNavigation.update(De=>(De.finalUrl=h,De)),M(i)}else return this.events.next(new _r(a.id,this.urlSerializer.serialize(a.extractedUrl),"",pc.IgnoredByUrlHandlingStrategy)),a.resolve(!1),je}),ue(a=>{let l=new Gf(a.id,this.urlSerializer.serialize(a.extractedUrl),this.urlSerializer.serialize(a.urlAfterRedirects),a.targetSnapshot);return this.events.next(l),this.currentTransition=i=V(g({},a),{guards:hL(a.targetSnapshot,a.currentSnapshot,this.rootContexts)}),i}),wL(a=>this.events.next(a)),ut(a=>{if(i.guardsResult=a.guardsResult,a.guardsResult&&typeof a.guardsResult!="boolean")throw rh(this.urlSerializer,a.guardsResult);let l=new qf(a.id,this.urlSerializer.serialize(a.extractedUrl),this.urlSerializer.serialize(a.urlAfterRedirects),a.targetSnapshot,!!a.guardsResult);if(this.events.next(l),!s())return je;if(!a.guardsResult)return this.cancelNavigationTransition(a,"",qt.GuardRejected),je;if(a.guards.canActivateChecks.length===0)return M(a);let c=new Kf(a.id,this.urlSerializer.serialize(a.extractedUrl),this.urlSerializer.serialize(a.urlAfterRedirects),a.targetSnapshot);if(this.events.next(c),!s())return je;let d=!1;return M(a).pipe(QL(this.paramsInheritanceStrategy),Dt({next:()=>{d=!0;let u=new Yf(a.id,this.urlSerializer.serialize(a.extractedUrl),this.urlSerializer.serialize(a.urlAfterRedirects),a.targetSnapshot);this.events.next(u)},complete:()=>{d||this.cancelNavigationTransition(a,"",qt.NoDataFromResolver)}}))}),KS(a=>{let l=d=>{let u=[];if(d.routeConfig?._loadedComponent)d.component=d.routeConfig?._loadedComponent;else if(d.routeConfig?.loadComponent){let h=d._environmentInjector;u.push(this.configLoader.loadComponent(h,d.routeConfig).then(p=>{d.component=p}))}for(let h of d.children)u.push(...l(h));return u},c=l(a.targetSnapshot.root);return c.length===0?M(a):Ze(Promise.all(c).then(()=>a))}),KS(()=>this.afterPreactivation()),ut(()=>{let{currentSnapshot:a,targetSnapshot:l}=i,c=this.createViewTransition?.(this.environmentInjector,a.root,l.root);return c?Ze(c).pipe(ue(()=>i)):M(i)}),gt(1),ut(a=>{let l=cL(e.routeReuseStrategy,a.targetSnapshot,a.currentRouterState);this.currentTransition=i=a=V(g({},a),{targetRouterState:l}),this.currentNavigation.update(d=>(d.targetRouterState=l,d)),this.events.next(new fa);let c=i.beforeActivateHandler.deferredHandle;return c?Ze(c.then(()=>a)):M(a)}),Dt(a=>{new zv(e.routeReuseStrategy,i.targetRouterState,i.currentRouterState,l=>this.events.next(l),this.inputBindingEnabled).activate(this.rootContexts),s()&&(r=!0,this.currentNavigation.update(l=>(l.abort=r1,l)),this.lastSuccessfulNavigation.set(Ae(this.currentNavigation)),this.events.next(new Ui(a.id,this.urlSerializer.serialize(a.extractedUrl),this.urlSerializer.serialize(a.urlAfterRedirects))),this.titleStrategy?.updateTitle(a.targetRouterState.snapshot),a.resolve(!0))}),K(CT(o.signal).pipe(_e(()=>!r&&!i.targetRouterState),Dt(()=>{this.cancelNavigationTransition(i,o.signal.reason+"",qt.Aborted)}))),Dt({complete:()=>{r=!0}}),K(this.transitionAbortWithErrorSubject.pipe(Dt(a=>{throw a}))),om(()=>{o.abort(),r||this.cancelNavigationTransition(i,"",qt.SupersededByNewNavigation),this.currentTransition?.id===i.id&&(this.currentNavigation.set(null),this.currentTransition=null)}),Zi(a=>{if(r=!0,this.destroyed)return i.resolve(!1),je;if(bT(a))this.events.next(new Gn(i.id,this.urlSerializer.serialize(i.extractedUrl),a.message,a.cancellationCode)),fL(a)?this.events.next(new ha(a.url,a.navigationBehaviorOptions)):i.resolve(!1);else{let l=new ns(i.id,this.urlSerializer.serialize(i.extractedUrl),a,i.targetSnapshot??void 0);try{let c=$t(this.environmentInjector,()=>this.navigationErrorHandler?.(l));if(c instanceof ma){let{message:d,cancellationCode:u}=rh(this.urlSerializer,c);this.events.next(new Gn(i.id,this.urlSerializer.serialize(i.extractedUrl),d,u)),this.events.next(new ha(c.redirectTo,c.navigationBehaviorOptions))}else throw this.events.next(l),a}catch(c){this.options.resolveNavigationPromiseOnError?i.resolve(!1):i.reject(c)}}return je}))}))}cancelNavigationTransition(e,i,r){let o=new Gn(e.id,this.urlSerializer.serialize(e.extractedUrl),i,r);this.events.next(o),e.resolve(!1)}isUpdatingInternalState(){return this.currentTransition?.extractedUrl.toString()!==this.currentTransition?.currentUrlTree.toString()}isUpdatedBrowserUrl(){let e=this.urlHandlingStrategy.extract(this.urlSerializer.parse(this.location.path(!0))),i=Ae(this.currentNavigation),r=i?.targetBrowserUrl??i?.extractedUrl;return e.toString()!==r?.toString()&&!i?.extras.skipLocationChange}static \u0275fac=function(i){return new(i||n)};static \u0275prov=C({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})();function o1(n){return n!==uc}var FT=new b("");var LT=(()=>{class n{static \u0275fac=function(i){return new(i||n)};static \u0275prov=C({token:n,factory:()=>f(s1),providedIn:"root"})}return n})(),sh=class{shouldDetach(t){return!1}store(t,e){}shouldAttach(t){return!1}retrieve(t){return null}shouldReuseRoute(t,e){return t.routeConfig===e.routeConfig}shouldDestroyInjector(t){return!0}},s1=(()=>{class n extends sh{static \u0275fac=(()=>{let e;return function(r){return(e||(e=hn(n)))(r||n)}})();static \u0275prov=C({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})(),dh=(()=>{class n{urlSerializer=f(ya);options=f(_a,{optional:!0})||{};canceledNavigationResolution=this.options.canceledNavigationResolution||"replace";location=f(yr);urlHandlingStrategy=f(ch);urlUpdateStrategy=this.options.urlUpdateStrategy||"deferred";currentUrlTree=new kn;getCurrentUrlTree(){return this.currentUrlTree}rawUrlTree=this.currentUrlTree;getRawUrlTree(){return this.rawUrlTree}createBrowserPath({finalUrl:e,initialUrl:i,targetBrowserUrl:r}){let o=e!==void 0?this.urlHandlingStrategy.merge(e,i):i,s=r??o;return s instanceof kn?this.urlSerializer.serialize(s):s}routerUrlState(e){return e?.targetBrowserUrl===void 0||e?.finalUrl===void 0?{}:{\u0275routerUrl:this.urlSerializer.serialize(e.finalUrl)}}commitTransition({targetRouterState:e,finalUrl:i,initialUrl:r}){i&&e?(this.currentUrlTree=i,this.rawUrlTree=this.urlHandlingStrategy.merge(i,r),this.routerState=e):this.rawUrlTree=r}routerState=hT(null,f($e));getRouterState(){return this.routerState}_stateMemento=this.createStateMemento();get stateMemento(){return this._stateMemento}updateStateMemento(){this._stateMemento=this.createStateMemento()}createStateMemento(){return{rawUrlTree:this.rawUrlTree,currentUrlTree:this.currentUrlTree,routerState:this.routerState}}restoredState(){return this.location.getState()}static \u0275fac=function(i){return new(i||n)};static \u0275prov=C({token:n,factory:()=>f(a1),providedIn:"root"})}return n})(),a1=(()=>{class n extends dh{currentPageId=0;lastSuccessfulId=-1;get browserPageId(){return this.canceledNavigationResolution!=="computed"?this.currentPageId:this.restoredState()?.\u0275routerPageId??this.currentPageId}registerNonRouterCurrentEntryChangeListener(e){return this.location.subscribe(i=>{i.type==="popstate"&&setTimeout(()=>{e(i.url,i.state,"popstate",{replaceUrl:!0})})})}handleRouterEvent(e,i){e instanceof ts?this.updateStateMemento():e instanceof _r?this.commitTransition(i):e instanceof mc?this.urlUpdateStrategy==="eager"&&(i.extras.skipLocationChange||this.setBrowserUrl(this.createBrowserPath(i),i)):e instanceof fa?(this.commitTransition(i),this.urlUpdateStrategy==="deferred"&&!i.extras.skipLocationChange&&this.setBrowserUrl(this.createBrowserPath(i),i)):e instanceof Gn&&!fT(e)?this.restoreHistory(i):e instanceof ns?this.restoreHistory(i,!0):e instanceof Ui&&(this.lastSuccessfulId=e.id,this.currentPageId=this.browserPageId)}setBrowserUrl(e,i){let{extras:r,id:o}=i,{replaceUrl:s,state:a}=r;if(this.location.isCurrentPathEqualTo(e)||s){let l=this.browserPageId,c=g(g({},a),this.generateNgRouterState(o,l,i));this.location.replaceState(e,"",c)}else{let l=g(g({},a),this.generateNgRouterState(o,this.browserPageId+1,i));this.location.go(e,"",l)}}restoreHistory(e,i=!1){if(this.canceledNavigationResolution==="computed"){let r=this.browserPageId,o=this.currentPageId-r;o!==0?this.location.historyGo(o):this.getCurrentUrlTree()===e.finalUrl&&o===0&&(this.resetInternalState(e),this.resetUrlToCurrentUrlTree())}else this.canceledNavigationResolution==="replace"&&(i&&this.resetInternalState(e),this.resetUrlToCurrentUrlTree())}resetInternalState({finalUrl:e}){this.routerState=this.stateMemento.routerState,this.currentUrlTree=this.stateMemento.currentUrlTree,this.rawUrlTree=this.urlHandlingStrategy.merge(this.currentUrlTree,e??this.rawUrlTree)}resetUrlToCurrentUrlTree(){this.location.replaceState(this.urlSerializer.serialize(this.getRawUrlTree()),"",this.generateNgRouterState(this.lastSuccessfulId,this.currentPageId))}generateNgRouterState(e,i,r){return this.canceledNavigationResolution==="computed"?g({navigationId:e,\u0275routerPageId:i},this.routerUrlState(r)):g({navigationId:e},this.routerUrlState(r))}static \u0275fac=(()=>{let e;return function(r){return(e||(e=hn(n)))(r||n)}})();static \u0275prov=C({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})();function eb(n,t){n.events.pipe(_e(e=>e instanceof Ui||e instanceof Gn||e instanceof ns||e instanceof _r),ue(e=>e instanceof Ui||e instanceof _r?0:(e instanceof Gn?e.code===qt.Redirect||e.code===qt.SupersededByNewNavigation:!1)?2:1),_e(e=>e!==2),gt(1)).subscribe(()=>{t()})}var Ca=(()=>{class n{get currentUrlTree(){return this.stateManager.getCurrentUrlTree()}get rawUrlTree(){return this.stateManager.getRawUrlTree()}disposed=!1;nonRouterCurrentEntryChangeSubscription;console=f(uf);stateManager=f(dh);options=f(_a,{optional:!0})||{};pendingTasks=f(Kr);urlUpdateStrategy=this.options.urlUpdateStrategy||"deferred";navigationTransitions=f(PT);urlSerializer=f(ya);location=f(yr);urlHandlingStrategy=f(ch);injector=f($e);_events=new D;get events(){return this._events}get routerState(){return this.stateManager.getRouterState()}navigated=!1;routeReuseStrategy=f(LT);injectorCleanup=f(FT,{optional:!0});onSameUrlNavigation=this.options.onSameUrlNavigation||"ignore";config=f(wc,{optional:!0})?.flat()??[];componentInputBindingEnabled=!!f(ah,{optional:!0});currentNavigation=this.navigationTransitions.currentNavigation.asReadonly();constructor(){this.resetConfig(this.config),this.navigationTransitions.setupNavigations(this).subscribe({error:e=>{}}),this.subscribeToNavigationEvents()}eventsSubscription=new H;subscribeToNavigationEvents(){let e=this.navigationTransitions.events.subscribe(i=>{try{let r=this.navigationTransitions.currentTransition,o=Ae(this.navigationTransitions.currentNavigation);if(r!==null&&o!==null){if(this.stateManager.handleRouterEvent(i,o),i instanceof Gn&&i.code!==qt.Redirect&&i.code!==qt.SupersededByNewNavigation)this.navigated=!0;else if(i instanceof Ui)this.navigated=!0,this.injectorCleanup?.(this.routeReuseStrategy,this.routerState,this.config);else if(i instanceof ha){let s=i.navigationBehaviorOptions,a=this.urlHandlingStrategy.merge(i.url,r.currentRawUrl),l=g({scroll:r.extras.scroll,browserUrl:r.extras.browserUrl,info:r.extras.info,skipLocationChange:r.extras.skipLocationChange,replaceUrl:r.extras.replaceUrl||this.urlUpdateStrategy==="eager"||o1(r.source)},s);this.scheduleNavigation(a,uc,null,l,{resolve:r.resolve,reject:r.reject,promise:r.promise})}}aL(i)&&this._events.next(i)}catch(r){this.navigationTransitions.transitionAbortWithErrorSubject.next(r)}});this.eventsSubscription.add(e)}resetRootComponentType(e){this.routerState.root.component=e,this.navigationTransitions.rootComponentType=e}initialNavigation(){this.setUpLocationChangeListener(),this.navigationTransitions.hasRequestedNavigation||this.navigateToSyncWithBrowser(this.location.path(!0),uc,this.stateManager.restoredState(),{replaceUrl:!0})}setUpLocationChangeListener(){this.nonRouterCurrentEntryChangeSubscription??=this.stateManager.registerNonRouterCurrentEntryChangeListener((e,i,r,o)=>{this.navigateToSyncWithBrowser(e,r,i,o)})}navigateToSyncWithBrowser(e,i,r,o){let s=r?.navigationId?r:null,a=r?.\u0275routerUrl??e;if(r?.\u0275routerUrl&&(o=V(g({},o),{browserUrl:e})),r){let c=g({},r);delete c.navigationId,delete c.\u0275routerPageId,delete c.\u0275routerUrl,Object.keys(c).length!==0&&(o.state=c)}let l=this.parseUrl(a);this.scheduleNavigation(l,i,s,o).catch(c=>{this.disposed||this.injector.get(Hn)(c)})}get url(){return this.serializeUrl(this.currentUrlTree)}getCurrentNavigation(){return Ae(this.navigationTransitions.currentNavigation)}get lastSuccessfulNavigation(){return this.navigationTransitions.lastSuccessfulNavigation}resetConfig(e){this.config=e.map(Qv),this.navigated=!1}ngOnDestroy(){this.dispose()}dispose(){this._events.unsubscribe(),this.navigationTransitions.complete(),this.nonRouterCurrentEntryChangeSubscription?.unsubscribe(),this.nonRouterCurrentEntryChangeSubscription=void 0,this.disposed=!0,this.eventsSubscription.unsubscribe()}createUrlTree(e,i={}){let{relativeTo:r,queryParams:o,fragment:s,queryParamsHandling:a,preserveFragment:l}=i,c=l?this.currentUrlTree.fragment:s,d=null;switch(a??this.options.defaultQueryParamsHandling){case"merge":d=g(g({},this.currentUrlTree.queryParams),o);break;case"preserve":d=this.currentUrlTree.queryParams;break;default:d=o||null}d!==null&&(d=this.removeEmptyProps(d));let u;try{let h=r?r.snapshot:this.routerState.snapshot.root;u=lT(h)}catch{(typeof e[0]!="string"||e[0][0]!=="/")&&(e=[]),u=this.currentUrlTree.root}return cT(u,e,d,c??null,this.urlSerializer)}navigateByUrl(e,i={skipLocationChange:!1}){let r=io(e)?e:this.parseUrl(e),o=this.urlHandlingStrategy.merge(r,this.rawUrlTree);return this.scheduleNavigation(o,uc,null,i)}navigate(e,i={skipLocationChange:!1}){return l1(e),this.navigateByUrl(this.createUrlTree(e,i),i)}serializeUrl(e){return this.urlSerializer.serialize(e)}parseUrl(e){try{return this.urlSerializer.parse(e)}catch{return this.console.warn(tr(4018,!1)),this.urlSerializer.parse("/")}}isActive(e,i){let r;if(i===!0?r=g({},JS):i===!1?r=g({},Fv):r=g(g({},Fv),i),io(e))return HS(this.currentUrlTree,e,r);let o=this.parseUrl(e);return HS(this.currentUrlTree,o,r)}removeEmptyProps(e){return Object.entries(e).reduce((i,[r,o])=>(o!=null&&(i[r]=o),i),{})}scheduleNavigation(e,i,r,o,s){if(this.disposed)return Promise.resolve(!1);let a,l,c;s?(a=s.resolve,l=s.reject,c=s.promise):c=new Promise((u,h)=>{a=u,l=h});let d=this.pendingTasks.add();return eb(this,()=>{queueMicrotask(()=>this.pendingTasks.remove(d))}),this.navigationTransitions.handleNavigationRequest({source:i,restoredState:r,currentUrlTree:this.currentUrlTree,currentRawUrl:this.currentUrlTree,rawUrl:e,extras:o,resolve:a,reject:l,promise:c,currentSnapshot:this.routerState.snapshot,currentRouterState:this.routerState}),c.catch(Promise.reject.bind(Promise))}static \u0275fac=function(i){return new(i||n)};static \u0275prov=C({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})();function l1(n){for(let t=0;t<n.length;t++)if(n[t]==null)throw new S(4008,!1)}var u1=(()=>{class n{router=f(Ca);stateManager=f(dh);fragment=O("");queryParams=O({});path=O("");serializer=f(ya);constructor(){this.updateState(),this.router.events?.subscribe(e=>{e instanceof Ui&&this.updateState()})}updateState(){let{fragment:e,root:i,queryParams:r}=this.stateManager.getCurrentUrlTree();this.fragment.set(e),this.queryParams.set(r),this.path.set(this.serializer.serialize(new kn(i)))}static \u0275fac=function(i){return new(i||n)};static \u0275prov=C({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})(),uh=(()=>{class n{router;route;tabIndexAttribute;renderer;el;locationStrategy;hrefAttributeValue=f(new Zo("href"),{optional:!0});reactiveHref=Yy(()=>this.isAnchorElement?this.computeHref(this._urlTree()):this.hrefAttributeValue);get href(){return Ae(this.reactiveHref)}set href(e){this.reactiveHref.set(e)}set target(e){this._target.set(e)}get target(){return Ae(this._target)}_target=O(void 0);set queryParams(e){this._queryParams.set(e)}get queryParams(){return Ae(this._queryParams)}_queryParams=O(void 0,{equal:()=>!1});set fragment(e){this._fragment.set(e)}get fragment(){return Ae(this._fragment)}_fragment=O(void 0);set queryParamsHandling(e){this._queryParamsHandling.set(e)}get queryParamsHandling(){return Ae(this._queryParamsHandling)}_queryParamsHandling=O(void 0);set state(e){this._state.set(e)}get state(){return Ae(this._state)}_state=O(void 0,{equal:()=>!1});set info(e){this._info.set(e)}get info(){return Ae(this._info)}_info=O(void 0,{equal:()=>!1});set relativeTo(e){this._relativeTo.set(e)}get relativeTo(){return Ae(this._relativeTo)}_relativeTo=O(void 0);set preserveFragment(e){this._preserveFragment.set(e)}get preserveFragment(){return Ae(this._preserveFragment)}_preserveFragment=O(!1);set skipLocationChange(e){this._skipLocationChange.set(e)}get skipLocationChange(){return Ae(this._skipLocationChange)}_skipLocationChange=O(!1);set replaceUrl(e){this._replaceUrl.set(e)}get replaceUrl(){return Ae(this._replaceUrl)}_replaceUrl=O(!1);isAnchorElement;onChanges=new D;applicationErrorHandler=f(Hn);options=f(_a,{optional:!0});reactiveRouterState=f(u1);constructor(e,i,r,o,s,a){this.router=e,this.route=i,this.tabIndexAttribute=r,this.renderer=o,this.el=s,this.locationStrategy=a;let l=s.nativeElement.tagName?.toLowerCase();this.isAnchorElement=l==="a"||l==="area"||!!(typeof customElements=="object"&&customElements.get(l)?.observedAttributes?.includes?.("href"))}setTabIndexIfNotOnNativeEl(e){this.tabIndexAttribute!=null||this.isAnchorElement||this.applyAttributeValue("tabindex",e)}ngOnChanges(e){this.onChanges.next(this)}routerLinkInput=O(null);set routerLink(e){e==null?(this.routerLinkInput.set(null),this.setTabIndexIfNotOnNativeEl(null)):(io(e)?this.routerLinkInput.set(e):this.routerLinkInput.set(Array.isArray(e)?e:[e]),this.setTabIndexIfNotOnNativeEl("0"))}onClick(e,i,r,o,s){let a=this._urlTree();if(a===null||this.isAnchorElement&&(e!==0||i||r||o||s||typeof this.target=="string"&&this.target!="_self"))return!0;let l={skipLocationChange:this.skipLocationChange,replaceUrl:this.replaceUrl,state:this.state,info:this.info};return this.router.navigateByUrl(a,l)?.catch(c=>{this.applicationErrorHandler(c)}),!this.isAnchorElement}ngOnDestroy(){}applyAttributeValue(e,i){let r=this.renderer,o=this.el.nativeElement;i!==null?r.setAttribute(o,e,i):r.removeAttribute(o,e)}_urlTree=ve(()=>{this.reactiveRouterState.path(),this._preserveFragment()&&this.reactiveRouterState.fragment();let e=r=>r==="preserve"||r==="merge";(e(this._queryParamsHandling())||e(this.options?.defaultQueryParamsHandling))&&this.reactiveRouterState.queryParams();let i=this.routerLinkInput();return i===null||!this.router.createUrlTree?null:io(i)?i:this.router.createUrlTree(i,{relativeTo:this._relativeTo()!==void 0?this._relativeTo():this.route,queryParams:this._queryParams(),fragment:this._fragment(),queryParamsHandling:this._queryParamsHandling(),preserveFragment:this._preserveFragment()})},{equal:(e,i)=>this.computeHref(e)===this.computeHref(i)});get urlTree(){return Ae(this._urlTree)}computeHref(e){return e!==null&&this.locationStrategy?this.locationStrategy?.prepareExternalUrl(this.router.serializeUrl(e))??"":null}static \u0275fac=function(i){return new(i||n)(Je(Ca),Je(Cr),Ul("tabindex"),Je(yt),Je(z),Je(Vi))};static \u0275dir=Y({type:n,selectors:[["","routerLink",""]],hostVars:2,hostBindings:function(i,r){i&1&&fe("click",function(s){return r.onClick(s.button,s.ctrlKey,s.shiftKey,s.altKey,s.metaKey)}),i&2&&Le("href",r.reactiveHref(),by)("target",r._target())},inputs:{target:"target",queryParams:"queryParams",fragment:"fragment",queryParamsHandling:"queryParamsHandling",state:"state",info:"info",relativeTo:"relativeTo",preserveFragment:[2,"preserveFragment","preserveFragment",oe],skipLocationChange:[2,"skipLocationChange","skipLocationChange",oe],replaceUrl:[2,"replaceUrl","replaceUrl",oe],routerLink:"routerLink"},features:[It]})}return n})();var f1=new b("");function tb(n,...t){return rr([{provide:wc,multi:!0,useValue:n},[],{provide:Cr,useFactory:h1},{provide:hf,multi:!0,useFactory:m1},t.map(e=>e.\u0275providers)])}function h1(){return f(Ca).routerState.root}function p1(n,t){return{\u0275kind:n,\u0275providers:t}}function m1(){let n=f(re);return t=>{let e=n.get(nn);if(t!==e.components[0])return;let i=n.get(Ca),r=n.get(g1);n.get(y1)===1&&i.initialNavigation(),n.get(v1,null,{optional:!0})?.setUpPreloading(),n.get(f1,null,{optional:!0})?.init(),i.resetRootComponentType(e.componentTypes[0]),r.closed||(r.next(),r.complete(),r.unsubscribe())}}var g1=new b("",{factory:()=>new D}),y1=new b("",{factory:()=>1});var v1=new b("");function nb(){return p1(6,[{provide:Vi,useClass:dv}])}var rs=(n,t)=>{if(typeof globalThis>"u")return;let e=globalThis.sdux??={},i=e.versions??={};i[n]!==t&&(i[n]=t)};var he={CoreAfterTap:"coreAfterTap",CoreBeforeTap:"coreBeforeTap",ReplayGlobalError:"replayGlobalError",CoreError:"coreError",CoreErrorCallback:"coreErrorCallback",CoreState:"coreState",Encrypt:"encrypt",CoreEmitState:"coreEmitState",CoreLicense:"coreLicense",ErrorTransform:"errorTransform",Extension:"extension",Filter:"filter",FromObservable:"fromObservable",FromPromise:"fromPromise",FromStream:"fromStream",Interceptor:"interceptor",Merge:"merge",Operator:"operator",Persist:"persist",Reduce:"reduce",Resolve:"resolve",StepwiseFilter:"stepwiseFilter",StepwiseReducer:"stepwiseReducer",StepwiseResolve:"stepwiseResolve",TabSyncState:"tabSyncState"};var Sc={Error:"error",Warn:"warn",Log:"log",Debug:"debug"};var ib={Off:"off",Error:"error",Warn:"warn",Log:"log",Debug:"debug"};var b1=ib.Off,_1="[vault]";function rb(n,...t){let e=VT();if(e===ib.Off)return;let i=[Sc.Error,Sc.Warn,Sc.Log,Sc.Debug];i.indexOf(n)<=i.indexOf(e)&&console[n](_1,...t)}var os=(...n)=>rb("error",...n),q=(...n)=>rb("warn",...n);var T=(...n)=>rb("debug",...n);function VT(){return b1}var Tc=class{constructor(t,e){this.behaviorCtx=e;this.key=t}critical;key;type=he.CoreErrorCallback;destroy(){q(`${this.key} - destroy "noop"`)}reset(){q(`${this.key} - reset "noop"`)}};function Re(n){try{return JSON.stringify(n,C1,2)}catch{return"[unserializable]"}}function C1(n,t){if(typeof t=="function")return"[Function]";if(t instanceof Error)return{message:t.message,stack:t.stack};if(t instanceof Map)return{map:Array.from(t.entries())};if(t instanceof Set)return{set:Array.from(t.values())};try{return JSON.stringify(t),t}catch{return"[Circular]"}}var BT=Symbol.for("BEHAVIOR_META");var Da="vault::devtools::logging::feature::cell";var _i=Symbol.for("VAULT_CLEAR_STATE");var qn=Symbol.for("VAULT_NOOP");function Te(n){return function(t){t[BT]=n,n.type!==void 0&&(t.type=n.type),n.key!==void 0&&(t.key=n.key),n.critical!==void 0&&(t.critical=n.critical),n.resolveType!==void 0&&(t.resolveType=n.resolveType),n.wantsConfig!==void 0?t.wantsConfig=n.wantsConfig:t.wantsConfig=!1,n.configKey!==void 0&&(t.configKey=n.configKey),n.needsLicense!==void 0?t.needsLicense=n.needsLicense:t.needsLicense=!1,n.licenseId!==void 0&&(t.licenseId=n.licenseId)}}var Rn={HttpResource:"http-resource",Observable:"observable",Promise:"promise",Value:"value"};var rn={IncomingPipeline:"Incoming Pipeline",FinalizePipeline:"Finalize Pipeline",PipelineError:"Pipeline Error",PipelineDestroy:"Pipeline Destroy",PipelineReset:"Pipeline Reset",AbortController:"Abort Controller",DenyController:"Deny Controller",TabSync:"Tab Sync"};function Ie(n,t){return D1("Behavior",n,t)}function D1(n,t,e){let i=r=>r.charAt(0).toUpperCase()+r.slice(1).replace(/[^A-Za-z0-9]/g,"");return`SDUX::${n}::${i(t)}::${i(e)}`}function Ic(n){return!!n&&typeof n=="object"&&typeof n.value=="function"}var jT={get active(){return typeof globalThis.jasmine<"u"||typeof globalThis.jest<"u"||typeof globalThis.vitest<"u"}};var ob=null,ro={get active(){return ob===!0},setDevMode(n){if(ob!==null&&!jT.active)throw new Error("[vault] DevMode has already been initialized.");ob=n}};function Lt(n,t){let e=Date.now();return n instanceof Error?{message:n.message||"Unexpected error",details:n.stack,raw:n,timestamp:e,featureCellKey:t}:typeof n=="string"?{message:n,details:n,raw:n,timestamp:e,featureCellKey:t}:{message:"Unexpected error",details:n,raw:n,timestamp:e,featureCellKey:t}}function sb(n,t=new WeakSet){if(n===null||typeof n!="object")return n;let e=n;if(t.has(e))return n;t.add(e),Object.isFrozen(e)||Object.freeze(e);for(let i of Reflect.ownKeys(e)){let r=Object.getOwnPropertyDescriptor(e,i);r&&"value"in r&&sb(r.value,t)}return n}var fh=n=>{if(n===null||typeof n!="object"||Object.isFrozen(n))return n;try{if(n instanceof Map||n instanceof Set||n instanceof WeakMap||n instanceof WeakSet)try{return structuredClone(n)}catch{return sb(n)}return structuredClone(n)}catch{let t=Array.isArray(n)?[...n]:Object.assign(Object.create(Object.getPrototypeOf(n)),n);return sb(t)}};var ab=n=>n===qn,lb=n=>n===_i;var Ea=n=>n===null,oo=n=>n===void 0,hh=n=>!oo(n),wa=n=>n==null,ph=n=>typeof n=="function";var E1=n=>{if(n===null||typeof n!="object")return!1;let t=Object.getPrototypeOf(n);return t===Object.prototype||t===null},xc=n=>{if(!E1(n))return!1;let t=n,e=Object.prototype.hasOwnProperty.call(t,"loading")||Object.prototype.hasOwnProperty.call(t,"value")||Object.prototype.hasOwnProperty.call(t,"error"),i=Object.keys(t).length===0;return e||i};function Sa(n){return!!(n&&typeof n=="object"&&"value"in n&&"isLoading"in n&&"error"in n&&"hasValue"in n)}var Mc,kc,mh,UT,Kn=class{constructor(t,e){this.behaviorCtx=e;Ss(this,mh);x(this,"type",Kn.type);x(this,"key");x(this,"critical",Kn.critical);Ss(this,Mc,!1);Ss(this,kc,!1);this.key=t,Pp(this,Mc,ro.active)}computeMerge(t,e,i){let r=i?.clearUndefined??!1;return T(`${this.key} merge called (clear: ${r})`),qi(this,mh,UT).call(this,t,e),e===void 0&&!r?(T(`${this.key} computeMerge skipped. next="${e}" clear="${r}"`),t):e===void 0&&r?(T(`${this.key} computeMerge skipped. next="${e}" clear="${r}"`),_i):Array.isArray(t)&&e!=null?(T(`${this.key} pushing T to State \u2192 return [...curr, next]`),[...t,e]):(T(`${this.key} non-array branch. return next`),e)}destroy(){q(`${this.key} - destroy "noop"`)}reset(){q(`${this.key} - reset "noop"`)}};Mc=new WeakMap,kc=new WeakMap,mh=new WeakSet,UT=function(t,e){if(Array.isArray(t)===!1&&t!=null&&e!==void 0&&t!==qn){let i=`[vault] ${this.key}: ArrayPushMerge received non-array current value. This behavior is intended for array state.`,r=Re({currentType:typeof t,currentValue:t,nextValue:e});Np(this,Mc)&&!Np(this,kc)?(Pp(this,kc,!0),console.warn(`One Time Warning: ${i}`,r),q(`One Time Warning: ${i}`,r)):q(i,r)}},x(Kn,"type"),x(Kn,"key"),x(Kn,"critical",!1),Kn=we([Te({type:he.Merge,key:Ie("Merge","ArrayPush"),critical:!0})],Kn);var pb={get active(){return typeof globalThis.jasmine<"u"||typeof globalThis.jest<"u"||typeof globalThis.vitest<"u"}},cb=null,Mt={get active(){return cb===!0},setDevMode(n){if(cb!==null&&!pb.active)throw new Error("[vault] DevMode has already been initialized.");cb=n}},Rc=(n,t)=>{if(!Mt.active||typeof globalThis>"u")return;let e=globalThis.sdux??={},i=e.debugWidget??={},r=i.versions??={};r[n]!==t&&(r[n]=t)},w1="@sdux-vault/shared",S1="0.9.1";Rc(w1,S1);var A={CoreAfterTap:"coreAfterTap",CoreBeforeTap:"coreBeforeTap",ReplayGlobalError:"replayGlobalError",CoreError:"coreError",CoreErrorCallback:"coreErrorCallback",CoreState:"coreState",Encrypt:"encrypt",CoreEmitState:"coreEmitState",CoreLicense:"coreLicense",ErrorTransform:"errorTransform",Extension:"extension",Filter:"filter",FromObservable:"fromObservable",FromPromise:"fromPromise",FromStream:"fromStream",Interceptor:"interceptor",Merge:"merge",Operator:"operator",Persist:"persist",Reduce:"reduce",Resolve:"resolve",StepwiseFilter:"stepwiseFilter",StepwiseReducer:"stepwiseReducer",StepwiseResolve:"stepwiseResolve",TabSyncState:"tabSyncState"},gh={Error:"error",Warn:"warn",Log:"log",Debug:"debug"},HT={Off:"off",Error:"error",Warn:"warn",Log:"log",Debug:"debug"},$T=HT.Off,T1="[vault]";function mb(n,...t){let e=I1();if(e===HT.Off)return;let i=[gh.Error,gh.Warn,gh.Log,gh.Debug];i.indexOf(n)<=i.indexOf(e)&&console[n](T1,...t)}var on=(...n)=>mb("error",...n),tt=(...n)=>mb("warn",...n);var Ke=(...n)=>mb("debug",...n);function zT(n){$T=n??"off"}function I1(){return $T}function x1(n){try{return JSON.stringify(n,M1,2)}catch{return"[unserializable]"}}function M1(n,t){if(typeof t=="function")return"[Function]";if(t instanceof Error)return{message:t.message,stack:t.stack};if(t instanceof Map)return{map:Array.from(t.entries())};if(t instanceof Set)return{set:Array.from(t.values())};try{return JSON.stringify(t),t}catch{return"[Circular]"}}var ub=class{#t=new rt(null);constructor(){Ke("[VaultPrivateErrorService] initialized (singleton instance created)")}setError(t){Ke(`[VaultPrivateErrorService] setError() ${x1(t)}`),this.#t.next(t)}getError(){return Ke("[VaultPrivateErrorService] getError() \u2192 observable subscribed"),this.#t.asObservable()}clear(){Ke("[VaultPrivateErrorService] clear() \u2192 error reset to null"),this.#t.next(null)}},db=null;function WT(){return db?Ke("[VaultPrivateErrorService] returning existing singleton instance"):(Ke("[VaultPrivateErrorService] creating new singleton instance"),db=new ub),db}var bh=Symbol.for("BEHAVIOR_META"),_h=Symbol.for("CONTROLLER_META"),GT="vault::devtools::aggregate:feature::cell",qT="vault::devtools::logging::feature::cell",Oc=Symbol.for("VAULT_CLEAR_STATE"),gb=Symbol.for("VAULT_CONTINUE"),Ch=Symbol.for("VAULT_NOOP"),yb=Symbol.for("VAULT_STOP");function KT(n){return function(t){t[bh]=n,n.type!==void 0&&(t.type=n.type),n.key!==void 0&&(t.key=n.key),n.critical!==void 0&&(t.critical=n.critical),n.resolveType!==void 0&&(t.resolveType=n.resolveType),n.wantsConfig!==void 0?t.wantsConfig=n.wantsConfig:t.wantsConfig=!1,n.configKey!==void 0&&(t.configKey=n.configKey),n.needsLicense!==void 0?t.needsLicense=n.needsLicense:t.needsLicense=!1,n.licenseId!==void 0&&(t.licenseId=n.licenseId)}}function Dh(n){return function(t){t[_h]=n,n.type!==void 0&&(t.type=n.type),n.key!==void 0&&(t.key=n.key),n.critical!==void 0&&(t.critical=n.critical),n.wantsConfig!==void 0?t.wantsConfig=n.wantsConfig:t.wantsConfig=!1,n.configKey!==void 0&&(t.configKey=n.configKey),n.needsLicense!==void 0?t.needsLicense=n.needsLicense:t.needsLicense=!1,n.licenseId!==void 0&&(t.licenseId=n.licenseId)}}var k1={Usage:"VaultErrorUsage",VaultError:"VaultError"},vb={EncryptionIntegrity:"VaultErrorEncryptionIntegrity",License:"VaultErrorLicense",Usage:"VaultErrorUsage",VaultError:"VaultError"},yh=class extends Error{kind;constructor(t,e=vb.VaultError,i=k1.VaultError){super(t),this.name=e,this.kind=i,Object.setPrototypeOf(this,new.target.prototype);let r=Error;typeof r.captureStackTrace=="function"&&r.captureStackTrace(this,new.target)}};var bb={Encryption:"VaultErrorEncryption",License:"VaultErrorLicense",Promise:"VaultErrorUsagePromise",PromiseFactoryRequired:"VaultErrorUsagePromiseFactoryRequired",Usage:"VaultErrorUsage"},Ac=class extends yh{constructor(t,e=bb.License){super(t,vb.License,e)}},fb=class extends yh{constructor(t,e=bb.Usage){super(t,vb.Usage,e)}},vh=class extends fb{constructor(){super(`Invalid incoming value: Promise detected.

Promises are eager and may resolve or reject before entering the Vault pipeline.

Use the following instead  a DeferredFactory value

This guarantees the promise is created and executed inside the pipeline.`,bb.Promise)}};var Ci={Attempt:"attempt",Failure:"failure",Finalize:"Finalize Pipeline",Success:"success",Vote:"vote"},kt={Abstain:"abstain",Abort:"abort",Deny:"deny"},so={CoreAbstain:"coreAbstain",Error:"error",License:"license",Policy:"policy",ReplayGlobalError:"replayGlobalError",Stepwise:"stepwise",TabSync:"tabSync"},On={Abort:"abort",Abstain:"abstain",Deny:"deny"},yn={End:"end",Notification:"notification",Start:"start",Unknown:"unknown"},Kt={Conductor:"conductor",Controller:"controller",Lifecycle:"lifecycle",Stage:"stage",Unknown:"unknown"},Yn={Merge:"merge",Replace:"replace",Initialize:"initialize"},Nc={HttpResource:"http-resource",Observable:"observable",Promise:"promise",Value:"value"};function _b(n,t){return YT("Behavior",n,t)}function YT(n,t,e){let i=r=>r.charAt(0).toUpperCase()+r.slice(1).replace(/[^A-Za-z0-9]/g,"");return`SDUX::${n}::${i(t)}::${i(e)}`}function Cb(n){return typeof n!="string"?!1:/^SDUX::(Behavior|Controller)::[A-Z][A-Za-z0-9]*::[A-Z][A-Za-z0-9]*$/.test(n)}function Eh(n,t){return YT("Controller",n,t)}function ZT(n){return Cb(n)}function ss(n,t){let e=Date.now();return n instanceof Error?{message:n.message||"Unexpected error",details:n.stack,raw:n,timestamp:e,featureCellKey:t}:typeof n=="string"?{message:n,details:n,raw:n,timestamp:e,featureCellKey:t}:{message:"Unexpected error",details:n,raw:n,timestamp:e,featureCellKey:t}}function hb(n,t=new WeakSet){if(n===null||typeof n!="object")return n;let e=n;if(t.has(e))return n;t.add(e),Object.isFrozen(e)||Object.freeze(e);for(let i of Reflect.ownKeys(e)){let r=Object.getOwnPropertyDescriptor(e,i);r&&"value"in r&&hb(r.value,t)}return n}var xe=n=>{if(n===null||typeof n!="object"||Object.isFrozen(n))return n;try{if(n instanceof Map||n instanceof Set||n instanceof WeakMap||n instanceof WeakSet)try{return structuredClone(n)}catch{return hb(n)}return structuredClone(n)}catch{let t=Array.isArray(n)?[...n]:Object.assign(Object.create(Object.getPrototypeOf(n)),n);return hb(t)}},ao=n=>n===Ch,as=n=>n===Oc,wh=n=>n===gb;var Pc=n=>n===void 0,Hi=n=>!Pc(n),Sh=n=>n==null,Ta=n=>typeof n=="function";var A1=n=>{if(n===null||typeof n!="object")return!1;let t=Object.getPrototypeOf(n);return t===Object.prototype||t===null},XT=n=>{if(!A1(n))return!1;let t=n,e=Object.prototype.hasOwnProperty.call(t,"loading")||Object.prototype.hasOwnProperty.call(t,"value")||Object.prototype.hasOwnProperty.call(t,"error"),i=Object.keys(t).length===0;return e||i};function Db(n){return!!n&&(typeof n=="object"||typeof n=="function")&&typeof n.then=="function"}function Eb(n){return!!(n&&typeof n=="object"&&"value"in n&&"isLoading"in n&&"error"in n&&"hasValue"in n)}var R1="@sdux-vault/devtools",O1="0.9.1";Rc(R1,O1);var wb=null;function kb(){return wb||(wb=new Tb),wb}var Tb=class{#t=new D;constructor(){window.sdux??={},window.sdux.vaultEventBus=this}nextPipeline(t){Mt.active&&t&&this.#t.next(t)}pipeline$(){return this.#t.asObservable()}},ls={Pipeline:"pipeline",System:"system",Unknown:"unknown",User:"ui"},Ib=class{sub;events=[];errorCount=0;maxEvents=5e3;sequence=0;lastMonotonicByTrace=new Map;traceRefCount=new Map;lastGlobalTimestamp=0;start(t){let e=kb();if(!e||typeof e.pipeline$!="function"){console.warn("[SDUX] EventBus not available.");return}this.sub=e.pipeline$().subscribe(i=>{let r=this.enrichEvent(i),o=r.traceId??"__unknown";if(this.events.push(r),this.traceRefCount.set(o,(this.traceRefCount.get(o)??0)+1),this.isErrorEvent(r)&&this.errorCount++,this.events.length>this.maxEvents){let s=this.events.shift();s&&(this.isErrorEvent(s)&&(this.errorCount=Math.max(0,this.errorCount-1)),this.evictTrace(s.traceId??"__unknown"))}t?.()})}stop(){this.sub?.unsubscribe(),this.sub=void 0}clear(){this.events=[],this.errorCount=0,this.sequence=0,this.lastMonotonicByTrace.clear(),this.traceRefCount.clear(),this.lastGlobalTimestamp=0}evictTrace(t){let e=(this.traceRefCount.get(t)??1)-1;e<=0?(this.traceRefCount.delete(t),this.lastMonotonicByTrace.delete(t)):this.traceRefCount.set(t,e)}getEvents(){return[...this.events]}getErrorCount(){return this.errorCount}enrichEvent(t){let e=Date.now(),i=typeof performance<"u"&&performance.now?performance.now():0,r=t.traceId??"__unknown",o=this.lastMonotonicByTrace.get(r),s=typeof o=="number"?i-o:0;s<0&&(s=0),this.lastMonotonicByTrace.set(r,i);let a=this.detectScheduler(e),l=this.detectEventLoopPhase(s),c=this.detectSource(t),d=this.detectSource(t),u=this.hashStack();return V(g({},t),{sequenceNumber:++this.sequence,monotonicTimestamp:i,stageDurationMs:s,stackHash:u,scheduler:a,eventLoopPhase:l,latencyCategory:d,source:c})}detectScheduler(t){let e=t-this.lastGlobalTimestamp;return this.lastGlobalTimestamp=t,e<2?"microtask":e<16?"macrotask":"delayed"}detectEventLoopPhase(t){return t===0?"synchronous":t<2?"microtask":t<16?"macrotask":"blocked"}detectSource(t){switch(t.type){case Kt.Controller:return ls.User;case Kt.Stage:return ls.Pipeline;case Kt.Lifecycle:case Kt.Conductor:return ls.System}return ls.Unknown}hashStack(){try{let t=new Error().stack??"",e=0;for(let i=0;i<t.length;i++)e=(e<<5)-e+t.charCodeAt(i),e|=0;return`h${Math.abs(e)}`}catch{return"h0"}}isErrorEvent(t){return!!(t.error||typeof t.name=="string"&&t.name.includes("fatal"))}},N1=`
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

`,Sb=null;function P1(){return Sb||(Sb=new xb),Sb}var xb=class{serializeRegistry(){let t=globalThis?.sdux?.debugWidget?.getRegistry?.();if(!t)return;let e={valid:0,pending:0,revoked:0,timeout:0,notRequired:0},i=o=>{let s=String(o??"").toLowerCase();s==="valid"?e.valid++:s==="pending"?e.pending++:s==="revoked"?e.revoked++:s==="timeout"?e.timeout++:(s==="not-required"||s==="notrequired")&&e.notRequired++},r=Array.from(t.values()).map(o=>{let s=o.behaviors?Array.from(o.behaviors.values()):[],a=o.controllers?Array.from(o.controllers.values()):[];for(let l of s)i(l.validLicense);for(let l of a)i(l.validLicense);return{key:o.key,behaviorsRegistered:!!o.behaviorsRegistered,controllersRegistered:!!o.controllersRegistered,fluentApis:o.fluentApis??null,behaviors:s,controllers:a}});return{totalFeatureCells:r.length,licenseSummary:e,featureCells:r}}buildEventStats(t,e){let i=0,r=null,o={},s={},a={},l={},c={},d={},u={},h=[],p={},m=[],w={},k={},N={},De=[],nt={},Gi=0,go=0,qa=0,Mr=0,Ka=0,Ya=0,Ds=0,lC=0,xp=0,Mp=0,cC=0,dC=0,kp={},Ap=null,AM=[],uC=new Set,fC=new Map,hC=0,pC=0,Za={},mC=new Map,gC=new Map,Es=null,ws=null,yo={count:0,maxDuration:0};if(Array.isArray(e)&&e.length>0){yo.count=e.length;for(let I of e)I.duration>yo.maxDuration&&(yo.maxDuration=I.duration)}else if(typeof performance<"u"&&performance.getEntriesByType)try{let I=performance.getEntriesByType("longtask");yo.count=I.length;for(let j of I){let Ee=j.duration??0;Ee>yo.maxDuration&&(yo.maxDuration=Ee)}}catch{}for(let I of t){if(!I?.name)continue;o[I.name]=(o[I.name]??0)+1,I.scheduler&&(s[I.scheduler]=(s[I.scheduler]??0)+1),I.eventLoopPhase&&(a[I.eventLoopPhase]=(a[I.eventLoopPhase]??0)+1),(I.error||String(I.name).includes("error"))&&Gi++,String(I.name).includes("abstain")&&Ka++,String(I.name).includes("success")&&qa++,String(I.name).includes("noop")&&go++;let j=typeof I.monotonicTimestamp=="number"?I.monotonicTimestamp:typeof I.timestamp=="number"?I.timestamp:null;if(j!==null){if(r!==null){let X=j-r;X>i&&(i=X)}r=j}if(j!==null){AM.push(j),(Es===null||j<Es)&&(Es=j),(ws===null||j>ws)&&(ws=j);let X=Math.floor(j/16);w[X]=(w[X]??0)+1;let it=Math.floor(j/1e3);p[it]=(p[it]??0)+1}let Ee=I.traceId??"__unknown";typeof I.timestamp=="number"&&(mC.get(Ee)===I.timestamp&&(hC++,Za[Ee]=(Za[Ee]??0)+1),mC.set(Ee,I.timestamp)),l[Ee]||(l[Ee]={eventCount:0,firstTimestamp:j,lastTimestamp:j,durationMs:0,stageBreakdown:{},stageSequence:[]},c[Ee]=[],uC.has(Ee)&&Ya++,uC.add(Ee));let Ct=l[Ee];Ct.eventCount++;let Rt=I.monotonicTimestamp;if(typeof Rt=="number"){let X=gC.get(Ee);X===Rt&&pC++,typeof X=="number"&&Rt<X&&Ds++,gC.set(Ee,Rt)}if(j!==null&&(Ct.firstTimestamp=Math.min(Ct.firstTimestamp??j,j),Ct.lastTimestamp=Math.max(Ct.lastTimestamp??j,j),Ct.durationMs=Ct.lastTimestamp-Ct.firstTimestamp),typeof I.stageDurationMs=="number"){let X=I.name,it=I.stageDurationMs,Pn=I.latencyCategory;Pn===ls.User?m.push(it):Pn===ls.System||(Mr+=it,d[X]||(d[X]={count:0,total:0,max:0,min:1/0,avg:0,p95:0},u[X]=[]),d[X].count++,d[X].total+=it,d[X].max=Math.max(d[X].max,it),d[X].min=Math.min(d[X].min,it),u[X].push(it),Ct.stageBreakdown[X]=(Ct.stageBreakdown[X]??0)+it),Pn===ls.Pipeline&&c[Ee].push(it),Ct.stageSequence.push({stage:X,durationMs:it})}if("payload"in I){let X=this.#t(I.payload);N[Ee]=(N[Ee]??0)+X,String(I.name).includes("persist")&&De.push({traceId:Ee,size:X}),X>5e4&&xp++}if("state"in I){cC++;let X=this.#t(I.state);k[Ee]=(k[Ee]??0)+X,X>1e5&&xp++;let it=0;try{it=this.#i(I.state)}catch{it=0}Mp=Math.max(Mp,it);let Pn="",Ii=null;try{Pn=JSON.stringify(I.state)}catch(HM){Ii=HM?.message||"Unknown serialization error",Pn="__STATE_SERIALIZATION_ERROR__"}Ii&&(dC++,kp[Ii]=(kp[Ii]??0)+1);let un=this.#n(Pn),vo=fC.get(Ee);vo===un&&lC++,vo&&vo!==un&&h.push(Math.abs(X)),fC.set(Ee,un)}}let dd=Es!==null&&ws!==null?ws-Es:0,ud=null,fd=0;for(let I in l){let j=l[I],Ee=j.durationMs??0,Ct=j.eventCount??0;nt[I]=Ee>2e3&&Ct<3,Ee>fd&&(fd=Ee,ud=I);let Rt=c[I]??[];if(Rt.length>0){let X=Rt.slice().sort((un,vo)=>un-vo),it=Rt.reduce((un,vo)=>un+vo,0)/Rt.length,Pn=X[Math.floor(X.length*.95)]??X[X.length-1],Ii=X[X.length-1];j.meanStageDuration=it,j.p95StageDuration=Pn,j.maxStageDuration=Ii}if(!Ap){let X=j.stageSequence??[];if(X.length>=6){let it=X.map(un=>un.stage),Pn=it.slice(0,2).join("|"),Ii=0;for(let un=0;un<it.length-1&&it.slice(un,un+2).join("|")===Pn;un+=2)Ii++;Ii>=3&&(Ap={detected:!0,traceId:I,repeatingPattern:Pn.split("|"),repetitionCount:Ii})}}}let RM=Math.max(0,dd-Mr),OM=t.length>0?hC/t.length:0,NM=t.length>0?pC/t.length:0,yC=null,vC=0;for(let I in Za){let j=Za[I];j>vC&&(vC=j,yC=I)}let PM=dd>0?Mr/dd:0;for(let I in d){let j=d[I];j.avg=j.count>0?j.total/j.count:0;let Ee=u[I].sort((Rt,X)=>Rt-X),Ct=Math.floor(Ee.length*.95);j.p95=Ee[Ct]??0}let hd=null,pd=0;for(let I in d){let j=d[I].total;j>pd&&(pd=j,hd=I)}let bC=[];for(let I in l){let j=l[I],Ee=j.stageSequence?.length?j.stageSequence:Object.entries(j.stageBreakdown??{}).map(([Ct,Rt])=>({stage:Ct,durationMs:Rt}));bC.push({traceId:I,stages:Ee})}let FM=Object.values(N).reduce((I,j)=>I+j,0)/Math.max(1,Object.keys(N).length),LM=h.length>0?h.reduce((I,j)=>I+j,0)/h.length:0,_C;if(m.length>0){let I=m.slice().sort((Rt,X)=>Rt-X),j=m.reduce((Rt,X)=>Rt+X,0)/m.length,Ee=I[Math.floor(I.length*.95)]??I[I.length-1],Ct=I[I.length-1];_C={count:m.length,avgMs:j,p95Ms:Ee,maxMs:Ct}}let VM=Math.max(...Object.values(p),0),BM=Object.keys(p).length>0?cC/Object.keys(p).length:0,jM=this.#e(k),Xa={},CC=50;for(let I in l){let j=l[I].eventCount??0;j>=CC&&(Xa[I]=j)}let UM=[nt&&Object.values(nt).some(Boolean)?{rank:1,type:"deadlock",id:"deadlockByTrace",evidence:"One or more traces match deadlock heuristics."}:null,hd?{rank:2,type:"stage-bottleneck",id:hd,evidence:`Stage has highest total compute time (${Math.round(pd)}ms).`}:null,ud?{rank:3,type:"slowest-trace",id:ud,evidence:`Longest trace duration (${Math.round(fd)}ms).`}:null,Xa&&Object.keys(Xa).length?{rank:4,type:"fanout",id:Object.keys(Xa)[0],evidence:`Fan-out threshold exceeded (\u2265 ${CC} events).`}:null,i>250?{rank:5,type:"stall",id:"maxIdleGapMs",evidence:`Large idle gap detected (${Math.round(i)}ms).`}:null].filter(Boolean);return{totalEvents:t.length,errorEvents:Gi,firstEventTimestamp:Es,lastEventTimestamp:ws,totalDurationMs:dd,longTaskStats:yo,eventTypes:o,traces:l,stageAggregates:d,schedulerDistribution:s,eventLoopPhaseDistribution:a,maxIdleGapMs:i,deadlockByTrace:nt,longestTraceId:ud,longestTraceDurationMs:fd,traceFanOut:Xa,diagnosticSummary:UM,stageBottleneck:hd,stageBottleneckTimeMs:pd,pipelineFlamegraph:bC,burstAnalysis:{maxEventsPerFrame:Math.max(...Object.values(w),0)},suppressionStats:{suppressedCount:go,votePass:qa,voteAbstain:Ka},structuralIntegrity:{duplicateTraceCount:Ya,outOfOrderCount:Ds},pipelineRecursion:Ap,timingIntegrity:{timestampCollisionRate:OM,monotonicCollisionRate:NM,worstCollisionTrace:yC,collisionsPerTrace:Za},stateAnalytics:{stateSizePerTrace:k,stateSerializationErrors:dC,stateSerializationErrorMessages:kp,avgPayloadSize:FM,repeatedIdenticalStateCount:lC,largeObjectCount:xp,deepNestingMaxDepth:Mp,persistPayloadSizeRanking:De.sort((I,j)=>j.size-I.size).slice(0,10),stateEntropyScore:jM,avgStateDiffSize:LM,maxChurnPerSecond:VM,avgChurnPerSecond:BM},computeVsIdle:{totalComputeTimeMs:Mr,estimatedIdleTimeMs:RM,computeRatio:PM},userLatencyDistribution:_C}}#t(t){try{return new TextEncoder().encode(JSON.stringify(t)).length}catch{return 0}}#i(t,e=0){return t===null||typeof t!="object"?e:Math.max(e,...Object.values(t).map(i=>this.#i(i,e+1)))}#n(t){let e=0;for(let i=0;i<t.length;i++)e=(e<<5)-e+t.charCodeAt(i),e|=0;return`h${Math.abs(e)}`}#e(t){let e=Object.values(t);if(!e.length)return 0;let i=e.reduce((o,s)=>o+s,0)/e.length,r=e.reduce((o,s)=>o+Math.pow(s-i,2),0)/e.length;return Math.sqrt(r)}getEnvironmentInfo(){let t=navigator.userAgent,e=/chrome|crios|edg|opr/i.test(t),i=/safari/i.test(t)&&!e,r="unknown",o="unknown";/firefox/i.test(t)?(r="firefox",o=(t.match(/firefox\/(\d+)/i)??[])[1]??"unknown"):/edg/i.test(t)?(r="edge",o=(t.match(/edg\/(\d+)/i)??[])[1]??"unknown"):/opr/i.test(t)?(r="opera",o=(t.match(/opr\/(\d+)/i)??[])[1]??"unknown"):e?(r="chrome",o=(t.match(/(?:chrome|crios)\/(\d+)/i)??[])[1]??"unknown"):i&&(r="safari",o=(t.match(/version\/(\d+)/i)??[])[1]??"unknown");let s="unknown";/windows/i.test(t)?s="Windows":/iphone|ipad|ipod/i.test(t)?s="iOS":/android/i.test(t)?s="Android":/mac/i.test(t)?s="MacOS":/linux/i.test(t)&&(s="Linux");let a="desktop";return/mobile/i.test(t)&&(a="mobile"),/tablet|ipad/i.test(t)&&(a="tablet"),{url:location.href,referrer:typeof document<"u"&&document.referrer||null,userAgent:t,browser:r,browserVersion:o,os:s,platform:navigator.platform??"unknown",online:typeof navigator<"u"?navigator.onLine:void 0,deviceType:a,language:navigator.language??"unknown",timezone:Intl.DateTimeFormat().resolvedOptions().timeZone??"unknown",screenResolution:typeof screen<"u"?`${screen.width}x${screen.height}`:"unknown",viewport:typeof window<"u"?`${window.innerWidth}x${window.innerHeight}`:"unknown"}}};function QT(n){let t=new Blob([JSON.stringify(n,null,2)],{type:"application/json"}),e=document.createElement("a");e.href=URL.createObjectURL(t),e.download=`sdux-debug-${Date.now()}.json`,e.click(),URL.revokeObjectURL(e.href)}function F1(){let n=Date.now(),t=N1,e=new Blob([t],{type:"text/markdown"}),i=document.createElement("a");i.href=URL.createObjectURL(e),i.download=`sdux-debug-ai-assist-${n}.md`,i.click(),URL.revokeObjectURL(i.href)}function JT(n){let t=P1(),e=Date.now(),i=new Date(e).toISOString(),r=typeof performance<"u"&&performance.now?performance.now():null,o=typeof performance<"u"&&performance.getEntriesByType?performance.getEntriesByType("navigation")[0]:null,s;if(typeof performance<"u")try{s=performance.getEntriesByType("longtask")?.map(d=>({start:d.startTime,duration:d.duration}))}catch{}let a=t.serializeRegistry(),l=t.buildEventStats(n,s);return{timestamp:e,isoTime:i,highResolution:{monotonicNow:r,timeOrigin:typeof performance<"u"?performance.timeOrigin:null},runtime:{hardwareConcurrency:typeof navigator<"u"?navigator.hardwareConcurrency??null:null,deviceMemory:typeof navigator<"u"?navigator.deviceMemory??null:null,connectionType:typeof navigator<"u"?navigator.connection?.effectiveType??null:null},navigation:o?{type:o.type,domComplete:o.domComplete,loadEventEnd:o.loadEventEnd}:void 0,environment:t.getEnvironmentInfo(),longTasks:s,events:n,stats:l,versions:globalThis?.sdux?.debugWidget?.versions??{},registry:a}}function L1(n){let t=JT(n);QT(t);let r=`https://github.com/sdux-vault/vault/issues/new?template=issue_report.md&body=${encodeURIComponent(`## Issue Summary
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
`)}`;window.open(r,"_blank")}function V1(n,t=1){let e=new Blob([n],{type:"application/json"}),i=URL.createObjectURL(e),r=document.createElement("a");r.href=i,r.download=`sdux-pipeline-trace-x${t}-${Date.now()}.json`,r.click(),URL.revokeObjectURL(i)}var lo={Begin:"B",End:"E",Instant:"I",Meta:"M",Complete:"X"};function B1(n,t=1){let e=[],i=new Map,r=new Map,o=0;e.push({name:"process_name",ph:lo.Meta,pid:1,args:{name:"SDUX Pipeline Debugger"}}),e.push({name:"trace_scale",ph:lo.Meta,pid:1,args:{scale:t}});let s=new Set,a=[...n].sort((c,d)=>{let u=c.sequenceNumber??0,h=d.sequenceNumber??0;return u-h}),l=new Map;if(a.length>0){let c=a[0].monotonicTimestamp??0,d=0,u=c;for(let h=0;h<a.length;h++){let p=a[h],m=p.monotonicTimestamp??u,w=p.sequenceNumber??h;if(h===0){l.set(w,0),u=m;continue}let k=Math.max(0,m-u),N;t<=1?N=Math.floor(k*1e3):k<=2?N=Math.floor(k*1e3*t):k<=16?N=Math.floor(k*1e3*Math.max(2,Math.floor(t/4))):N=1e3,d+=N,l.set(w,d),u=m}}for(let c=0;c<a.length;c++){let d=a[c],u=d.traceId??"main",h=d.sequenceNumber??c,p=l.get(h)??0,[m,w,k]=(d.name??"").split(":"),N=d.type,De=`${u}:${N}:${m}:${k}`;if(s.has(u)||(s.add(u),e.push({name:"thread_name",ph:lo.Meta,pid:1,tid:u,args:{name:`Pipeline ${u.slice(0,8)}`}})),r.has(u)||(r.set(u,o++),e.push({name:"thread_sort_index",ph:lo.Meta,pid:1,tid:u,args:{sort_index:r.get(u)}})),d.boundary===yn.Start){i.has(De)||i.set(De,[]),i.get(De).push(p),e.push({name:k,cat:N,ph:lo.Begin,ts:p,pid:1,tid:u,args:{cell:d.cell,behavior:d.behaviorKey,scheduler:d.scheduler,source:d.source,latency:d.latencyCategory}});continue}if(d.boundary===yn.End){let Mr=i.get(De);if(Mr&&Mr.length){let Ka=Mr.pop(),Ya=50,Ds=p;Ds-Ka<Ya&&(Ds=Ka+Ya),e.push({name:k,cat:N,ph:lo.End,ts:Ds,pid:1,tid:u})}continue}let nt=20*t,Gi=Math.max(0,p-nt),go=Gi===0?nt:p,qa=`${k}:${w} (synthetic)`;e.push({name:qa,cat:N,ph:lo.Begin,ts:Gi,pid:1,tid:u,args:{synthetic:!0,actualDurationMs:0,note:"Synthetic span time added for visualization"}}),e.push({name:qa,cat:N,ph:lo.End,ts:go,pid:1,tid:u,args:{synthetic:!0,actualDurationMs:0,note:"Synthetic time span added for visualization"}})}return JSON.stringify({traceEvents:e},null,2)}var Mb=class extends HTMLElement{recorder=new Ib;recording=!1;minimized=!0;exportMenuOpen=!1;dragOffsetX=0;dragOffsetY=0;dragging=!1;abortController=new AbortController;connectedCallback(){this.attachShadow({mode:"open"}),this.style.position="fixed",this.style.top="80px",this.style.right="20px",this.style.zIndex="999999";let t=localStorage.getItem("sdux-debug-state");if(t)try{let{left:e,top:i,minimized:r}=JSON.parse(t);e&&i&&(this.style.left=e,this.style.top=i,this.style.right="auto"),this.minimized=!!r}catch{}this.render(),document.addEventListener("sdux-license-resolved",()=>{this.updateButtonState()},{signal:this.abortController.signal})}disconnectedCallback(){this.abortController.abort(),this.timerInterval&&(clearInterval(this.timerInterval),this.timerInterval=null),this.recorder.stop(),this.recording=!1}render(){if(!this.shadowRoot)return;this.shadowRoot.innerHTML=`
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
  `,this.shadowRoot?.getElementById("aiAssist")?.addEventListener("click",()=>{F1()});let e=this.shadowRoot.getElementById("export"),i=this.shadowRoot.getElementById("exportMenu");e?.addEventListener("click",a=>{a.stopPropagation(),this.exportMenuOpen=!this.exportMenuOpen,i?.classList.toggle("open",this.exportMenuOpen)}),this.shadowRoot.getElementById("close")?.addEventListener("click",a=>{a.stopPropagation(),this.remove()}),this.updateButtonState(),this.shadowRoot.getElementById("help")?.addEventListener("click",a=>{a.stopPropagation(),this.openHelp()}),this.shadowRoot.getElementById("recordToggle")?.addEventListener("click",a=>{a.stopPropagation(),this.recording?this.stop():this.start(),this.updateRecordingUI()}),this.shadowRoot.getElementById("panel")?.addEventListener("pointerdown",a=>this.startDrag(a)),this.shadowRoot.getElementById("downloadDump")?.addEventListener("click",a=>{a.stopPropagation(),s(),this.downloadDebugDump()}),this.shadowRoot.getElementById("downloadTrace")?.addEventListener("click",a=>{a.stopPropagation(),s(),this.downloadTraceDump()}),this.shadowRoot.getElementById("downloadTrace1000")?.addEventListener("click",a=>{a.stopPropagation(),s(),this.downloadTraceDump(1e3)}),this.shadowRoot.getElementById("clear")?.addEventListener("click",a=>{a.stopPropagation(),this.clear()}),this.shadowRoot.getElementById("minimize")?.addEventListener("click",this.toggleMinimize),this.shadowRoot.getElementById("createIssue")?.addEventListener("click",a=>{a.stopPropagation(),this.createIssue()});let o=this.abortController.signal;document.addEventListener("pointermove",this.onDrag,{signal:o}),document.addEventListener("pointerup",this.stopDrag,{signal:o}),document.addEventListener("pointerdown",a=>{if(!this.exportMenuOpen)return;let l=a.composedPath();i&&!l.includes(i)&&s()},{signal:o});let s=()=>{i?.classList.remove("open"),this.exportMenuOpen=!1}}updateEventCount(){if(!this.shadowRoot)return;let t=this.shadowRoot.getElementById("eventCount"),e=this.shadowRoot.getElementById("eventErrorCount"),i=this.recorder.getEvents().length,r=this.recorder.getErrorCount();if(t&&(t.textContent=String(i)),e){let o=Number(e.textContent??"0");r>o&&(e.classList.remove("bump"),e.offsetWidth,e.classList.add("bump")),e.textContent=String(r)}}updateRecordingUI(){if(!this.shadowRoot)return;let t=this.shadowRoot.getElementById("recordToggle"),e=this.shadowRoot.querySelector(".record-dot"),i=this.shadowRoot.getElementById("sessionTimer"),r=this.shadowRoot.querySelector(".title-container");if(t&&(t.textContent=this.recording?"Stop":"Record"),!this.recording){e&&e.remove(),i&&(i.textContent="");return}if(!e&&r){let o=document.createElement("div");o.className="record-dot",r.insertBefore(o,r.children[1])}i&&(i.textContent=this.getSessionTime())}sessionStartTime=null;timerInterval=null;pausedDuration=0;pauseStart=null;startDrag(t){this.dragging=!0,this.dragOffsetX=t.clientX-this.offsetLeft,this.dragOffsetY=t.clientY-this.offsetTop}onDrag=t=>{this.dragging&&(this.style.left=`${t.clientX-this.dragOffsetX}px`,this.style.top=`${t.clientY-this.dragOffsetY}px`,this.style.right="auto")};stopDrag=()=>{this.dragging=!1,this.persistState()};toggleMinimize=t=>{t.stopPropagation(),this.minimized=!this.minimized,this.persistState(),this.render()};persistState(){localStorage.setItem("sdux-debug-state",JSON.stringify({left:this.style.left,top:this.style.top,minimized:this.minimized}))}updateButtonState(){if(!this.shadowRoot)return;let t=this.shadowRoot.getElementById("recordToggle"),e=this.shadowRoot.getElementById("export"),i=this.shadowRoot.getElementById("clear"),r=this.shadowRoot.getElementById("createIssue"),o=this.shadowRoot.getElementById("aiAssist"),s=this.recorder.getEvents().length>0,a=!!globalThis.sdux?.debugWidget?.aiAssistEnabled;t&&(t.disabled=!1);let l=!s||this.recording;e&&(e.disabled=l),r&&(r.disabled=l),i&&(i.disabled=l),o&&(o.disabled=l||!a)}start(){if(this.recording)return;let t=Date.now();this.sessionStartTime||(this.sessionStartTime=t),this.pauseStart&&(this.pausedDuration+=t-this.pauseStart,this.pauseStart=null),this.timerInterval=window.setInterval(()=>{let e=this.shadowRoot?.getElementById("sessionTimer");e&&(e.textContent=this.getSessionTime())},1e3),this.recorder.start(()=>{this.updateEventCount(),this.updateButtonState()}),this.recording=!0,this.updateRecordingUI(),this.updateButtonState(),console.info("[SDUX] Recording started")}getSessionTime(){if(!this.sessionStartTime)return"";let t=Date.now()-this.sessionStartTime-this.pausedDuration,e=Math.floor(t/1e3),i=Math.floor(e/60),r=e%60;return`${i}:${r.toString().padStart(2,"0")}`}stop(){this.recording&&(this.recorder.stop(),this.recording=!1,this.pauseStart=Date.now(),this.updateRecordingUI(),this.timerInterval&&(clearInterval(this.timerInterval),this.timerInterval=null),this.updateButtonState(),console.info("[SDUX] Recording stopped"))}downloadDebugDump(){let t=JT(this.recorder.getEvents());QT(t),console.info("[SDUX] Logging dump generated")}downloadTraceDump(t=1){let e=B1(this.recorder.getEvents(),t);V1(e,t),console.info("[SDUX] Trace dump generated")}createIssue(){L1(this.recorder.getEvents()),console.info("[SDUX] Issue dump generated and redirected")}clear(){if(!this.recorder.getEvents().length||!confirm("Clear all recorded events?"))return;this.recorder.clear(),this.sessionStartTime=null,this.pausedDuration=0,this.pauseStart=null;let t=this.shadowRoot?.getElementById("sessionTimer");t&&(t.textContent=""),this.updateEventCount(),this.updateButtonState(),console.info("[SDUX] Events cleared")}openHelp(){window.open("/docs/dev-tools/built-in-debugger","_blank","noopener,noreferrer")}};function j1(){if(!customElements.get("sdux-debug"))try{customElements.define("sdux-debug",Mb)}catch{}if(document.querySelector("sdux-debug"))return;let n=document.createElement("sdux-debug");document.body.appendChild(n)}function eI(){if(!Mt.active||typeof window>"u"||(globalThis.sdux??={},globalThis.sdux.debugWidget??={},globalThis.sdux.debugWidget.injected))return;globalThis.sdux.debugWidget.injected=!0;let n=()=>j1();document.readyState==="loading"?document.addEventListener("DOMContentLoaded",n,{once:!0}):n()}var U1="@sdux-vault/engine",H1="0.28.1";Rc(U1,H1);var Vt="vault-conductor",Ih,Nb=class{static{Ih=this}controllerCtx;static type;static key;static critical;type=Ih.type;critical=Ih.critical;key;#t=!1;#i=!1;constructor(e,i){this.controllerCtx=i,this.key=e}handleMessage(e){switch(Ke(`${this.key} handleMessage received "${e.type}" for trace "${e.traceId}".`),e.type){case Ci.Attempt:{let{ctx:i}=e;return this.#i?M(kt.Abort):i.operation===Yn.Initialize?M(kt.Abstain):M(this.#t?kt.Abstain:kt.Deny)}case Ci.Finalize:return this.#t=!0,M();case Ci.Success:return this.#t=!0,M();case Ci.Failure:return e.ctx.operation===Yn.Initialize&&(this.#i=!0),M();default:return M(kt.Abstain)}}destroy(){tt(`${this.key} - destroy noop`)}reset(){tt(`${this.key} - reset noop`)}};Nb=Ih=ll([Dh({type:so.CoreAbstain,key:Eh("Policy","CoreAbstain"),critical:!1})],Nb);var xh,Pb=class{static{xh=this}controllerCtx;static type;static key;static critical;type=xh.type;critical=xh.critical;key;ctx;constructor(e,i){this.controllerCtx=i,this.key=e,this.ctx=i}handleMessage(e){return Ke(`${this.key} handleMessage received "${e.type}" for trace "${e.traceId}".`),e.type===Ci.Failure?(Ke(`${this.key} ABORT \u2014 default failure handler for trace "${e.traceId}"`),this.ctx.requestAbort(e.traceId),M()):M(kt.Abstain)}destroy(){tt(`${this.key} - destroy noop`)}reset(){tt(`${this.key} - reset noop`)}};Pb=xh=ll([Dh({type:so.Error,key:Eh("Policy","CoreError"),critical:!1})],Pb);var $i={RequireLicense:"requireLicense",ValidateLicense:"validateLicense",LicenseStatus:"licenseStatus",DescribeFeature:"describe-feature",DescribeBehaviors:"describe-behaviors",DescribeControllers:"describe-controllers"},kh=null;function $1(n,t){kh||(kh=new Fb(n,t))}function Fc(){if(!kh)throw new Error("[vault] LicensingService not initialized.");return kh}var Fb=class{events$;validation$;constructor(t,e){this.events$=t,this.validation$=e}describeFeature(t){t.type=$i.DescribeFeature,this.events$.next(t)}describeBehaviors(t){t.type=$i.DescribeBehaviors,this.events$.next(t)}describeControllers(t){t.type=$i.DescribeControllers,this.events$.next(t)}requestLicense(t,e){if(!e)throw new Error("[vault] Cannot register controller license without a key.");let i=this.#t();return this.events$.next({featureCellKey:t,key:e,licenseToken:i,type:$i.RequireLicense}),i}validateLicense(t,e,i,r){this.events$.next({featureCellKey:t,key:e,licenseToken:i,type:$i.ValidateLicense,valid:r})}#t(){let t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",e=i=>Array.from({length:i},()=>t[Math.floor(Math.random()*t.length)]).join("");return`${e(5)}-${e(5)}`}getLicenseValidation$(){return this.validation$}};var Mh,Lb=class{static{Mh=this}controllerCtx;static type;static key;static critical;type=Mh.type;critical=Mh.critical;key;#t=null;#i;constructor(e,i){this.controllerCtx=i,this.key=e;let r=i.featureCellKey;this.#i=Fc().getLicenseValidation$().pipe(_e(o=>o.featureCellKey===r)).subscribe(o=>{this.#t=o.approved,this.#i?.unsubscribe();let s=`${r}::license`;o.approved?i?.licenseApproved?.(s):i?.licenseDenied?.(s)})}handleMessage(e){return Ke(`${this.key} received "${e.type}" for trace "${e.traceId}".`),e.type===Ci.Attempt?this.#t?M(kt.Abstain):this.#t===null?M(kt.Deny):M(kt.Abort):M()}destroy(){this.#i?.unsubscribe(),tt(`${this.key} - destroy unsubscribe`)}reset(){tt(`${this.key} - reset noop`)}};Lb=Mh=ll([Dh({type:so.License,key:Eh("Policy","CoreLicense"),critical:!0})],Lb);var Vb=class{evaluateAttempt(t,e,i){if(t.length===0)return M(this.arbitrate(e.traceId,[kt.Abstain]));try{let r=t.map(o=>(i?.startControllerVote(e.ctx.featureCellKey,o.key,e.traceId),o.handleMessage(e).pipe(ue(s=>s??kt.Abstain),Dt(s=>{i?.endControllerVote(e.ctx.featureCellKey,o.key,e.traceId,s)}),Zi(s=>(tt("[vault:arbitrator] controller threw during attempt:",s),i?.endControllerVote(e.ctx.featureCellKey,o.key,e.traceId,kt.Deny),i?.controllerFailure(o.key,e.ctx,s),M(kt.Deny))))));return Fs(r).pipe(ue(o=>this.arbitrate(e.traceId,o)))}catch{return M(this.arbitrate(e.traceId,[kt.Deny]))}}notify(t,e){if(t.length===0)return M(void 0);try{let i=t.map(r=>r.handleMessage(e).pipe(ue(()=>{}),Zi(o=>(tt("[vault:arbitrator] controller threw during notify:",o),M(void 0)))));return Fs(i).pipe(ue(()=>{}))}catch{return M(void 0)}}arbitrate(t,e){return e.includes(kt.Abort)?{traceId:t,outcome:On.Abort}:e.includes(kt.Deny)?{traceId:t,outcome:On.Deny}:e.every(s=>s===kt.Abstain)?{traceId:t,outcome:On.Abstain}:(on("Unknown controller vote detected",{traceId:t,votes:e}),{traceId:t,outcome:On.Deny})}},P={Boundary:"boundary",State:"state",Error:"error"},vn={Never:"never",Optional:"optional",Required:"required"},z1={[P.Boundary]:{state:vn.Never,payload:vn.Optional,error:vn.Never},[P.State]:{state:vn.Required,payload:vn.Optional,error:vn.Never},[P.Error]:{state:vn.Required,payload:vn.Optional,error:vn.Required}},W1={"stage:end:core-state":{category:P.State},"stage:end:core-emit-state":{category:P.State},"lifecycle:end:merge":{category:P.State},"lifecycle:end:replace":{category:P.State},"stage:end:compute-merge":{category:P.State},"stage:end:reducer":{category:P.State},"stage:end:resolve":{category:P.State},"lifecycle:notification:failure":{category:P.Error},"lifecycle:notification:runtime-error":{category:P.Error},"lifecycle:notification:warn":{category:P.Error},"lifecycle:notification:fatal":{category:P.Error},"conductor:start:abort":{category:P.Boundary},"conductor:start:deny":{category:P.Boundary},"conductor:start:revote":{category:P.Boundary},"controller:end:vote":{category:P.Boundary},"conductor:start:license-approved":{category:P.Boundary},"conductor:start:license-attempt":{category:P.Boundary},"controller:end:attempt":{category:P.Boundary},"controller:notification:finalize":{category:P.Boundary},"controller:notification:success":{category:P.Boundary},"controller:restart:restart-controller-attempt":{category:P.Boundary},"controller:start:attempt":{category:P.Boundary},"controller:start:vote":{category:P.Boundary},"lifecycle:end:initialized":{category:P.Boundary},"lifecycle:start:core-callback-error":{category:P.Boundary},"lifecycle:start:core-error":{category:P.Boundary},"lifecycle:start:core-state":{category:P.Boundary},"lifecycle:start:global-error":{category:P.Boundary},"lifecycle:start:initialized":{category:P.Boundary},"lifecycle:start:merge":{category:P.Boundary},"lifecycle:start:replace":{category:P.Boundary},"lifecycle:start:error-transform":{category:P.Boundary},"lifecycle:end:error-transform":{category:P.Boundary},"lifecycle:end:core-callback-error":{category:P.Boundary},"lifecycle:end:core-error":{category:P.Boundary},"lifecycle:end:global-error":{category:P.Boundary},"stage:end:after-tap":{category:P.Boundary},"stage:end:before-tap":{category:P.Boundary},"stage:end:encrypt":{category:P.Boundary},"stage:end:filter":{category:P.Boundary},"stage:end:load-persist":{category:P.Boundary},"stage:end:operator":{category:P.Boundary},"stage:end:persist":{category:P.Boundary},"stage:start:after-tap":{category:P.Boundary},"stage:start:before-tap":{category:P.Boundary},"stage:start:compute-merge":{category:P.Boundary},"stage:start:encrypt":{category:P.Boundary},"stage:start:filter":{category:P.Boundary},"stage:start:load-persist":{category:P.Boundary},"stage:start:operator":{category:P.Boundary},"stage:start:persist":{category:P.Boundary},"stage:start:reducer":{category:P.Boundary},"stage:start:resolve":{category:P.Boundary}},Ab=null;function G1(){return Ab||(Ab=new Bb),Ab}var Bb=class{globalInsightOverride=null;cellRegistry=new Map},jb=class{shared=G1();key=_b("DevTools","Telemetry");get globalInsightOverride(){return this.shared.globalInsightOverride}set globalInsightOverride(t){this.shared.globalInsightOverride=t}get cellRegistry(){return this.shared.cellRegistry}registerCell(t,e){let i=!!e;this.cellRegistry.set(t,{hasInsight:i,insights:i?[e]:[]})}activateGlobalInsights(t){this.globalInsightOverride=t}isChromeDevTools(t){return t===qT||t===GT}applyPolicy(t,e){let i=W1[t.name]?.category??P.Boundary,r=z1[i],o=!!e?.wantsState,s=!!e?.wantsPayload,a=!!e?.wantsErrors;return t.source||delete t.source,(!o||r.state===vn.Never)&&delete t.state,(!s||r.payload===vn.Never||r.payload===vn.Optional&&t.payload===void 0)&&delete t.payload,!a||r.error===vn.Never?delete t.error:r.error===vn.Required&&(!s||t.payload===void 0)&&delete t.payload,t}},Rb=null;function Zb(){return Rb||(Rb=new Ub),Rb}var Ub=class extends jb{#t=kb();constructor(){super(),typeof window<"u"&&(window.sdux??={},window.sdux.vaultMonitorInstance=this)}#i(t){let e=t?.snapshot??t?.lastSnapshot??t?.state??{};return{isLoading:e.isLoading??!1,value:e.value??void 0,error:e.error??null,hasValue:e.hasValue??!!e.value}}startAfterTap(t,e,i){this.#e({cell:t,behaviorKey:e,name:"after-tap",ctx:i})}endAfterTap(t,e,i,r){this.#r({cell:t,behaviorKey:e,name:"after-tap",ctx:i,payload:r})}startBeforeTap(t,e,i){this.#e({cell:t,behaviorKey:e,name:"before-tap",ctx:i})}endBeforeTap(t,e,i,r){this.#r({cell:t,behaviorKey:e,name:"before-tap",ctx:i,payload:r})}startClearPersist(t,e,i){this.#a({cell:t,behaviorKey:e,name:"clear-persist",ctx:i})}endClearPersist(t,e,i){this.#l({cell:t,behaviorKey:e,name:"clear-persist",ctx:i})}startComputeMerge(t,e,i){this.#e({cell:t,behaviorKey:e,name:"compute-merge",ctx:i})}endComputeMerge(t,e,i){this.#r({cell:t,behaviorKey:e,name:"compute-merge",ctx:i})}notifyConductorDeny(t,e,i){this.#c({cell:t,behaviorKey:e,name:"deny",ctx:i})}conductorCrashed(t,e,i,r){let o=ss(r,t),s="fatal";on(t,e,o),this.#o({cell:t,behaviorKey:e,name:s,ctx:i,payload:{message:"This has proven to be untested code in unit tests. So you win some type of prize. Please create a github issues and share your amazing gift to bring down a systm."},error:o})}conductorRevote(t,e,i){this.#o({cell:t,behaviorKey:e,name:"revote",ctx:i})}conductorAbort(t,e,i){this.#o({cell:t,behaviorKey:e,name:"abort",ctx:i})}conductorLicenseAttempt(t,e){this.#o({cell:t,behaviorKey:e,name:"license-attempt",ctx:{}})}conductorLicenseApproved(t,e){this.#o({cell:t,behaviorKey:e,name:"license-approved",ctx:{}})}conductorLicenseDenied(t,e){this.#o({cell:t,behaviorKey:e,name:"license-denied",ctx:{}})}startControllerAttempt(t,e,i){this.#u({cell:t,behaviorKey:e,name:"attempt",ctx:i})}endControllerAttempt(t,e,i,r){this.#d({cell:t,behaviorKey:e,name:"attempt",ctx:i,payload:r})}restartControllerAttempt(t,e,i,r){this.#f({cell:t,behaviorKey:e,name:"restart-attempt",ctx:i,payload:r})}controllerFailure(t,e,i){let r=ss(i,t);this.#o({cell:e.featureCellKey,behaviorKey:t,name:"failure",ctx:e,error:r})}controllerFinalize(t,e){this.#o({cell:e.featureCellKey,behaviorKey:t,name:"finalize",ctx:e})}controllerSuccess(t,e){this.#o({cell:e.featureCellKey,behaviorKey:t,name:"success",ctx:e})}startControllerVote(t,e,i){this.#u({cell:t,behaviorKey:e,name:"vote",ctx:{traceId:i}})}endControllerVote(t,e,i,r){this.#d({cell:t,behaviorKey:e,name:"vote",ctx:{traceId:i},payload:r})}startConductorVote(t,e,i){this.#u({cell:t,behaviorKey:e,name:"vote",ctx:i})}endConductorVote(t,e,i,r){this.#d({cell:t,behaviorKey:e,name:"vote",ctx:i,payload:r})}startCoreCallbackError(t,e,i){this.#e({cell:t,behaviorKey:e,name:"core-callback-error",ctx:i})}endCoreCallbackError(t,e,i){this.#r({cell:t,behaviorKey:e,name:"core-callback-error",ctx:i})}startCoreEmitState(t,e,i){this.#e({cell:t,behaviorKey:e,name:"core-emit-state",ctx:i})}endCoreEmitState(t,e,i){this.#r({cell:t,behaviorKey:e,name:"core-emit-state",ctx:i})}startCoreError(t,e,i){this.#e({cell:t,behaviorKey:e,name:"core-error",ctx:i})}endCoreError(t,e,i){this.#r({cell:t,behaviorKey:e,name:"core-error",ctx:i})}startCoreState(t,e,i){this.#e({cell:t,behaviorKey:e,name:"core-state",ctx:i})}endCoreState(t,e,i){this.#r({cell:t,behaviorKey:e,name:"core-state",ctx:i})}startDecrypt(t,e,i){this.#e({cell:t,behaviorKey:e,name:"decrypt",ctx:i})}endDecrypt(t,e,i,r){this.#r({cell:t,behaviorKey:e,name:"decrypt",ctx:i,payload:r})}startDestroy(t,e,i){this.#a({cell:t,behaviorKey:e,name:"destroy",ctx:i})}endDestroy(t,e,i,r){this.#l({cell:t,behaviorKey:e,name:"destroy",ctx:i,payload:r})}startEncrypt(t,e,i){this.#e({cell:t,behaviorKey:e,name:"encrypt",ctx:i})}endEncrypt(t,e,i){this.#r({cell:t,behaviorKey:e,name:"encrypt",ctx:i})}runtimeError(t,e,i,r){let o=ss(r,t);on(t,e,o),this.#o({cell:t,behaviorKey:e,name:"runtime-error",ctx:i,error:o})}startErrorTransform(t,e,i){this.#e({cell:t,behaviorKey:e,name:"error-transform",ctx:i})}endErrorTransform(t,e,i,r){this.#r({cell:t,behaviorKey:e,name:"error-transform",ctx:i,payload:r})}startFilter(t,e,i){this.#e({cell:t,behaviorKey:e,name:"filter",ctx:i})}endFilter(t,e,i){this.#r({cell:t,behaviorKey:e,name:"filter",ctx:i})}startGlobalError(t,e,i){this.#a({cell:t,behaviorKey:e,name:"global-error",ctx:i})}endGlobalError(t,e,i){this.#l({cell:t,behaviorKey:e,name:"global-error",ctx:i})}ingressSubscribed(t,e,i,r){this.#a({cell:t,behaviorKey:e,name:"ingress-subscribed",ctx:i,source:r})}ingressCompleted(t,e,i,r){this.#l({cell:t,behaviorKey:e,name:"ingress-completed",ctx:i,source:r})}startInitialized(t,e,i){this.#a({cell:t,behaviorKey:e,name:"initialized",ctx:i})}endInitialized(t,e,i){this.#l({cell:t,behaviorKey:e,name:"initialized",ctx:i})}startInterceptor(t,e,i){this.#e({cell:t,behaviorKey:e,name:"interceptor",ctx:i})}endInterceptor(t,e,i,r){this.#r({cell:t,behaviorKey:e,name:"interceptor",ctx:i,payload:r})}startLoadPersist(t,e,i){this.#e({cell:t,behaviorKey:e,name:"load-persist",ctx:i})}endLoadPersist(t,e,i,r){this.#r({cell:t,behaviorKey:e,name:"load-persist",ctx:i,payload:r})}startMerge(t,e,i){this.#a({cell:t,behaviorKey:e,name:"merge",ctx:i})}endMerge(t,e,i,r){this.#l({cell:t,behaviorKey:e,name:"merge",ctx:i,payload:r})}startOperator(t,e,i){this.#e({cell:t,behaviorKey:e,name:"operator",ctx:i})}endOperator(t,e,i,r){this.#r({cell:t,behaviorKey:e,name:"operator",ctx:i,payload:r})}startPersist(t,e,i){this.#e({cell:t,behaviorKey:e,name:"persist",ctx:i})}endPersist(t,e,i){this.#r({cell:t,behaviorKey:e,name:"persist",ctx:i})}startReducer(t,e,i){this.#e({cell:t,behaviorKey:e,name:"reducer",ctx:i})}endReducer(t,e,i){this.#r({cell:t,behaviorKey:e,name:"reducer",ctx:i})}startReplace(t,e,i){this.#a({cell:t,behaviorKey:e,name:"replace",ctx:i})}endReplace(t,e,i,r){this.#l({cell:t,behaviorKey:e,name:"replace",ctx:i,payload:r})}startReset(t,e,i){this.#a({cell:t,behaviorKey:e,name:"reset",ctx:i})}endReset(t,e,i,r){this.#l({cell:t,behaviorKey:e,name:"reset",ctx:i,payload:r})}startResolve(t,e,i){this.#e({cell:t,behaviorKey:e,name:"resolve",ctx:i})}endResolve(t,e,i){this.#r({cell:t,behaviorKey:e,name:"resolve",ctx:i})}startSetInitialValue(t,e,i){this.#a({cell:t,behaviorKey:e,name:"set-initial-value",ctx:i})}endSetInitialValue(t,e,i){this.#l({cell:t,behaviorKey:e,name:"set-initial-value",ctx:i})}startStepwise(t,e,i){this.#e({cell:t,behaviorKey:e,name:"stepwise",ctx:i})}endStepwise(t,e,i){this.#r({cell:t,behaviorKey:e,name:"stepwise",ctx:i})}warn(t,e,i,r){let o=ss(r,t);tt(t,e,o),this.#o({cell:t,behaviorKey:e,name:"warn",ctx:i,error:o})}#n(t){return t.name=`${t.type}:${t.boundary}:${t.name}`,t}#e(t){t.type=Kt.Stage,t.boundary=yn.Start,this.#s(this.#n(t))}#r(t){t.type=Kt.Stage,t.boundary=yn.End,this.#s(this.#n(t))}#a(t){t.type=Kt.Lifecycle,t.boundary=yn.Start,this.#s(this.#n(t))}#l(t){t.type=Kt.Lifecycle,t.boundary=yn.End,this.#s(this.#n(t))}#o(t){t.type=Kt.Lifecycle,t.boundary=yn.Notification,this.#s(this.#n(t))}#c(t){t.type=Kt.Conductor,t.boundary=yn.Notification,this.#s(this.#n(t))}#u(t){t.type=Kt.Controller,t.boundary=yn.Start,this.#s(this.#n(t))}#d(t){t.type=Kt.Controller,t.boundary=yn.End,this.#s(this.#n(t))}#f(t){t.type=Kt.Controller,t.boundary=yn.Notification,this.#s(this.#n(t))}#s(t){let{cell:e,ctx:i,name:r,behaviorKey:o,source:s,error:a,payload:l,type:c,boundary:d}=t;if(this.isChromeDevTools(e)||!Mt.active)return;let u;if(this.globalInsightOverride)u=this.globalInsightOverride;else{let p=this.cellRegistry.get(e);if(!p||!p.hasInsight)return;u=p.insights[0]}let h={id:crypto.randomUUID(),cell:e,behaviorKey:o,name:r,timestamp:Date.now(),state:this.#i(i),type:c??Kt.Unknown,boundary:d??yn.Unknown,payload:l,error:a,source:s};i.traceId&&(h.traceId=i.traceId),this.#t.nextPipeline(this.applyPolicy(h,u))}},Zn={Abort:"abort",Failure:"failure",LicenseApproved:"licenseApproved",LicenseDenied:"licenseDenied",Revote:"revote",Success:"success"},Hb=class{controllers;events$;#t=new Vb;#i=Zb();constructor(t,e){this.controllers=t,this.events$=e}evaluateAttempt(t){let e={type:Ci.Attempt,traceId:t.traceId,ctx:t};return this.#t.evaluateAttempt(this.controllers,e,this.#i)}notifySuccess(t){if(!this.controllers.length)return;let e={type:Ci.Success,traceId:t.traceId,ctx:t};this.#i.controllerSuccess("decision-engine",t),this.#t.notify(this.controllers,e).subscribe({complete:()=>{this.events$.closed||this.events$.next({traceId:t.traceId,type:Zn.Success})}})}notifyFailure(t,e){if(!this.controllers.length)return;let i={type:Ci.Failure,traceId:t.traceId,ctx:t,error:e};this.#i.controllerFailure("decision-engine",t,e),this.#t.notify(this.controllers,i).subscribe({complete:()=>{this.events$.closed||this.events$.next({traceId:t.traceId,type:Zn.Failure})}})}notifyFinalize(t){if(!this.controllers.length)return;let e={type:Ci.Finalize,traceId:t.traceId};this.#i.controllerFinalize("decision-engine",t),this.#t.notify(this.controllers,e).subscribe()}},Ye="vault-orchestrator",q1=new Set(["initialize","destroy","destroyed$","reset","reset$","reducers","operators","filters","interceptors","mergeState","replaceState","beforeTaps","afterTaps","key","state","cache","persist","encrypt","beforeTap","afterTap","hydrate"]),Dr={NotRequired:"not-required",Pending:"pending",Revoked:"revoked",Timeout:"timeout",Valid:"valid"},K1=new Set(["SDUX::Behavior::Core::AfterTap","SDUX::Behavior::Core::ArrayMerge","SDUX::Behavior::Core::BeforeTap","SDUX::Behavior::Core::EmitState","SDUX::Behavior::Core::Error","SDUX::Behavior::Core::ErrorCallback","SDUX::Behavior::Core::Filter","SDUX::Behavior::Core::FromObservable","SDUX::Behavior::Core::FromPromise","SDUX::Behavior::Core::FromStream","SDUX::Behavior::Core::ObjectMerge","SDUX::Behavior::Core::Observable","SDUX::Behavior::Core::Promise","SDUX::Behavior::Core::Reducer","SDUX::Behavior::Core::State","SDUX::Behavior::Core::TabSyncState","SDUX::Behavior::Core::Value","SDUX::Behavior::Addon::DistinctUntilChanged","SDUX::Behavior::Cache::State","SDUX::Behavior::Core::Lookup","SDUX::Behavior::Core::Query","SDUX::Behavior::Encrypt::Aes256","SDUX::Behavior::Interceptor::GlobalErrorPause","SDUX::Behavior::Merge::ArrayAppend","SDUX::Behavior::Merge::ArrayPush","SDUX::Behavior::Merge::Deep","SDUX::Behavior::Persist::CookieStorage","SDUX::Behavior::Persist::LocalStorage","SDUX::Behavior::Persist::SessionStorage","SDUX::Behavior::Policy::StepwiseFilter","SDUX::Behavior::Policy::StepwiseReducer","SDUX::Behavior::Policy::StepwiseResolve","SDUX::Behavior::Core::License","SDUX::Controller::Policy::CoreAbstain","SDUX::Controller::Policy::CoreError","SDUX::Controller::Policy::CoreLicense","SDUX::Controller::Policy::TabSync","SDUX::Controller::Policy::Delay","SDUX::Controller::Policy::MaxFailures","SDUX::Controller::Policy::ReplayGlobalError","SDUX::Controller::Policy::Stepwise","SDUX::Controller::Policy::Throttle"]),iI="sdux-vault",Y1="SDUX::Behavior::Core::License",sn=null;function rI(n={}){sn||(sn=new $b(n))}var $b=class{#t;#i;#n=new Map;#e=new Map;#r=!1;#a=!1;#l;#o=new Map;#c=new D;#u=new Nr;#d=new Map;#f;#s=new Map;constructor(t){$1(this.#c,this.#u.asObservable()),this.setVaultConfig(t),this.#C(t.licenses),this.#g(),this.#A(),this.#R()}setVaultConfig(t){let e={devMode:t.devMode??!1,logLevel:t.logLevel??"off"};this.#f=Object.freeze(e),Mt.setDevMode(this.#f.devMode),zT(this.#f.logLevel),this.#a=t.devMode?t.bypassLicensing??!1:!1,this.#l=t.licenseTimeoutMs??15e3,this.#M()}resetForTesting(){this.#t?.unsubscribe(),this.#t=void 0,this.#i?.unsubscribe(),this.#i=void 0,this.#f=void 0,this.resetFeatureCellRegistry(),this.#d.clear(),this.#n.clear()}resetFeatureCellRegistry(){this.#s.clear()}registerCellRuntime(t){this.#p(t)}registerBehaviors(t,e){let i=this.#p(t);i.behaviors=this.#h(e),i.behaviorsRegistered=!0}registerControllers(t,e){let i=this.#p(t);i.controllers=this.#h(e),i.controllersRegistered=!0}registerFluentApis(t,e){let i=this.#p(t);i.fluentApis=Object.freeze(e)}getLicensePayload(t){return this.#n.get(t)}isBypassLicensing(){return this.#a}isAuthorizedKey(t){return K1.has(t)}hasVaultLicense(){return this.#n.has(iI)}#C(t){if(t?.length)for(let e of t)e?.licenseId&&this.#n.set(e.licenseId,e.payload)}#h(t){return new Map(t.map(e=>{let i;this.#a?i=!1:i=e.needsLicense??!1;let r={key:e.key,type:e.type,critical:!!e.critical,needsLicense:i,validLicense:i?Dr.Pending:Dr.NotRequired};return[e.key,Object.freeze(r)]}))}#g(){this.#t=this.#c.subscribe(t=>{switch(t.type){case $i.DescribeFeature:{let e=t;this.registerFluentApis(e.featureCellKey,this.#k(e));break}case $i.DescribeBehaviors:{let e=t;this.registerBehaviors(e.featureCellKey,e.behaviors),this.#y(e.featureCellKey);break}case $i.DescribeControllers:{let e=t;this.registerControllers(e.featureCellKey,e.controllers),this.#y(e.featureCellKey);break}case $i.RequireLicense:{this.#E(t.featureCellKey),this.#T(t);return}case $i.ValidateLicense:{this.#S(t),this.#y(t.featureCellKey);return}}})}#E(t){if(!this.#l||this.#o.has(t))return;let e=setTimeout(()=>{this.#w(t),this.#o.delete(t)},this.#l);this.#o.set(t,e)}#w(t){let e=this.#s.get(t);if(!e)return;let i=[...e.behaviors?.values()??[],...e.controllers?.values()??[]],r=!1;for(let o of i)o.needsLicense&&o.validLicense===Dr.Pending&&((e.behaviors?.has(o.key)?e.behaviors:e.controllers)?.set(o.key,Object.freeze(V(g({},o),{validLicense:Dr.Timeout}))),r=!0);r&&this.#m(t,!1),this.#v(t)}#y(t){let e=this.#s.get(t);if(!e||!e.behaviorsRegistered||!e.controllersRegistered)return;let r=[...e.behaviors?.values()??[],...e.controllers?.values()??[]].filter(o=>o.needsLicense);if(r.length===0){this.#m(t,!0);return}if(r.some(o=>o.validLicense===Dr.Revoked||o.validLicense===Dr.Timeout)){this.#v(t),this.#m(t,!1);return}r.some(o=>o.validLicense===Dr.Pending)||this.#m(t,!0)}#v(t){let e=this.#o.get(t);e&&(clearTimeout(e),this.#o.delete(t))}#m(t,e){this.#e.has(t)||(this.#e.set(t,e),this.#v(t),this.#d.set(t,e),this.#u.next({featureCellKey:t,approved:e}))}#S(t){let{featureCellKey:e,key:i,licenseToken:r,valid:o}=t;if(this.#e.has(t.featureCellKey))return;if(!i){tt("Cannot validate license without a key.");return}let s=this.#s.get(e);s&&(this.#b(s.behaviors,i,r,o),this.#b(s.controllers,i,r,o),o&&i===Y1&&this.#I())}#b(t,e,i,r){if(!t?.has(e))return;let o=t.get(e);if(o.needsLicense&&o.licenseId){if(o.licenseId!==i){tt(`[vault] License key mismatch for "${e}".`);return}t.set(e,Object.freeze(V(g({},o),{validLicense:r?Dr.Valid:Dr.Revoked})))}}#T(t){let{featureCellKey:e,key:i,licenseToken:r}=t,o=this.#s.get(e);if(o){if(!i||typeof i!="string")throw new Error("[vault] Cannot register controller license without a key.");this.#D(o.behaviors,i,r),this.#D(o.controllers,i,r)}}#D(t,e,i){if(!t?.has(e))return;let r=t.get(e);r.needsLicense&&(r.licenseId||i&&t.set(e,Object.freeze(V(g({},r),{licenseId:i}))))}#M(){Mt.active&&!pb.active&&console.error(`[vault] "Development Mode" is enabled outside of a test environment.
This can expose sensitive data because safeguards that normally remove or sanitize data are disabled.
You have explicitly disabled these safeguards and are responsible for ensuring production safety.
If this is intentional, you can safely ignore this message.`)}#k(t){let e=t?.fluentApis??{};return{filters:Array.isArray(e?.filters)?e.filters.length:0,reducers:Array.isArray(e?.reducers)?e.reducers.length:0,beforeTaps:Array.isArray(e?.beforeTaps)?e.beforeTaps.length:0,afterTaps:Array.isArray(e?.afterTaps)?e.afterTaps.length:0,emitStateCallbacks:Array.isArray(e?.emitStateCallbacks)?e.emitStateCallbacks.length:0,errorCallbacks:Array.isArray(e?.errorCallbacks)?e.errorCallbacks.length:0}}#p(t){return this.#s.has(t)||this.#s.set(t,{key:t,behaviorsRegistered:!1,controllersRegistered:!1}),this.#s.get(t)}#I(){this.#r||Mt.active&&(typeof document>"u"||(this.#r=!0,globalThis.sdux??={},globalThis.sdux.debugWidget??={},globalThis.sdux.debugWidget.aiAssistEnabled=!0,document.dispatchEvent(new CustomEvent("sdux-license-resolved"))))}#A(){Mt.active&&(typeof globalThis>"u"||(globalThis.sdux??={},globalThis.sdux.getRegistry=()=>this.getRegistrySnapshot()))}#R(){Mt.active&&(typeof document>"u"||(globalThis.sdux??={},globalThis.sdux.debugWidget??={},eI()))}registerVaultSettled(t,e){let i=this.#p(t);i.vaultSettled=e}async awaitFeatureCellSettled(t){let e=this.#s.get(t);if(!e)throw new Error(`[vault] FeatureCell "${t}" not registered.`);typeof e.vaultSettled=="function"&&(await e.vaultSettled(),await Promise.resolve())}async awaitAllSettled(){for(let t of this.#s.values())typeof t.vaultSettled=="function"&&await t.vaultSettled();await Promise.resolve()}getRegistrySnapshot(){return new Map(this.#s)}};function oI(n){if(!sn)throw new Error("[vault] Vault not initialized.");if(!n)throw new Error("[vault] registerFeatureCell() requires a valid entry object.");if(!n.key||typeof n.key!="string")throw new Error('[vault] registerFeatureCell() requires a valid "key" (non-empty string).');sn.registerCellRuntime(n.key)}function sI(n){if(!sn)throw new Error("[vault] Vault not initialized.");if(typeof n!="string"||!n.trim())throw new Error("[vault] getLicensePayload() requires a valid licenseId.");return sn.getLicensePayload(n)}function Z1(n,t){if(!sn)throw new Error("[vault] Vault not initialized.");if(!n||typeof n!="string")throw new Error('[vault] registerVaultSettled() requires a valid "key" (non-empty string).');typeof t=="function"&&sn.registerVaultSettled(n,t)}function aI(n){return sn?sn.isBypassLicensing()?!0:sn.isAuthorizedKey(n):!1}function lI(){return sn?sn.isBypassLicensing():!1}function Xb(){return sn?sn.hasVaultLicense():!1}var zb=class{#t=!1;#i;#n;#e;constructor(t,e,i){this.#i=t,this.#n=e,this.#e=i}initializeBehaviors(t,e){if(this.#t)throw new Error(`[vault] VaultBehaviorRunner already initialized \u2014 cannot reissue core behavior ID for feature cell "${this.#i}".`);if(this.#t=!0,!t||t.length===0)return[];let i=new Set;return t.map(r=>{let o=!1;try{if(typeof r!="function")return;let s=r[bh];if(!s)throw o=!0,new Error(`[vault] Behavior "${r.name}" missing @VaultBehavior metadata.`);let a=s.key,l=s.type;if(!a)throw o=!0,new Error('[vault] Behavior metadata missing "key".');if(!Xb()&&!aI(a)){Ke(`[vault] Unlicensed behavior "${a}" skipped during initialization.`);return}if(!l)throw o=!0,new Error(`[vault] Behavior metadata missing "type" for "${a}".`);let c;if(s.wantsConfig){if(!s.configKey)throw o=!0,new Error(`[vault] Behavior "${a}" declares wantsConfig but has no configKey.`);c=e.get(s.configKey)}let d;if(s.needsLicense&&!lI()){if(!s.licenseId)throw o=!0,new Error(`[vault] Behavior "${a}" declares needsLicense but has no licenseId.`);if(d=sI(s.licenseId),d===void 0)throw o=!0,new Error(`[vault] License "${s.licenseId}" required by behavior "${a}" is not registered in Vault config.`)}let u;try{let h={featureCellKey:this.#i,behaviorConfig:c,licensePayload:d};s.type===A.TabSyncState&&(h=V(g({},h),{lastSnapshot:this.#n,state$:this.#e})),u=new r(a,h)}catch(h){throw o=s.critical,h}if(!u.key)throw o=!0,new Error(`[vault] Behavior missing key for type "${l}". Every behavior must define a unique "key".`);if(!Cb(u.key))throw o=!0,new Error(`[vault] Behavior key "${u.key}" not valid format for "${l}" behavior.`);return u.key&&i.has(u.key)?(tt(`[vault] Skipping duplicate behavior with key "${u.key}"`),null):(u.key&&i.add(u.key),u)}catch(s){if(o)throw s;return tt(`[vault] Non-critical behavior initialization failed: ${s?.message}`),null}}).filter(r=>!!r)}applyBehaviorExtensions(t,e,i){for(let r of t){let o={featureCellKey:e.key,destroyed$:e.destroyed$,reset$:e.reset$,mergeState:e.mergeState,replaceState:e.replaceState,state$:e.state$,vaultMonitor:i},s=r.extendCellAPI?.(o);if(!(!s||typeof s!="object"))for(let[a,l]of Object.entries(s)){let c=e[a]!==void 0,d=Array.isArray(r.allowOverride)&&r.allowOverride.includes(a);if(q1.has(a))throw new Error(`[vault] Behavior "${r.key}" attempted to overwrite core FeatureCell method "${a}".`);if(c&&!d)throw new Error(`[vault] Behavior "${r.key}" attempted to redefine method "${a}" already provided by another behavior.`);c&&d&&(tt(`[vault] Behavior "${r.key}" is overriding method "${a}" (explicitly allowed).`),delete e[a]),Object.defineProperty(e,a,{value:(...u)=>{try{return typeof l!="function"?void 0:l(...u)}catch(h){throw on(`[vault] Behavior extension "${a}" threw an error:`,h),h}},enumerable:!1,writable:!1,configurable:!0})}}}},X1=n=>n.type===A.ErrorTransform,Q1=n=>n.type===A.CoreErrorCallback,J1=n=>n.type===A.CoreEmitState,xa=n=>n===yb,Ob=()=>crypto?.randomUUID?.()??Math.random().toString(36).slice(2,7),cI=n=>ao(n)||xa(n),eV={pro:`
-----BEGIN PUBLIC KEY-----
MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEAuXto+eRaFm9pObys/IEI ASwV1wgGvNGJsiyw/9hXsEd9mA76aQI1X9lpkZRKmBFovHdK2unPHFOPQM0k9vJo ieFMNXO9kmHn7UYZV98bDCcDTNURFHQ4SWlcAE/HEiNqcUb9LwotFbON7/mcthM8 QQQ4Lycdv+lm1uozQl8rl+i7FjfQzLaxJMuAkm9jFZK+ta6eoSy/lmXfhDem8RIo dE19aZWfY+LTXP9nn977XFah0z0S0D3NSvMv96gZsXTN2hTbFBl5dgDMAOW9R5OI wT6I+kGwrVqARXq2pTDHnZjqfO3a+rT4Lrb5/L58RjQ0EfA5puZ16EXGEUpOabqI KVT4Z/wv818P8eyat+LtTcy2G0zx/h0Fcz0QANzx3P9K7ezxeqdg4SsjkcNXRWZq PaJUhZHygN/Xuef9zfWwjuKobCBSdyyeXxF5XS0A0Y6NBmdhikyHc/YOY2iYupIt xiUvlHaq97B5wej3XcTmp4kmJUQyeQ8oD5Mj8Dmf69oa7vhI/ANNKWo9s8e7u7UX Dx74Eu3d8JBpACQ+Vvek6ZEGw+D0yCyLF6u/CaCw+cb2cBYAlM7jWZ5kpgsbQcWw YP2nbGV3OofcEspoEU704M4RW4v+nSRYrJbMEIJJ5Wuxk2/RuUgk/9uwgCHAvzXZ cmGomIf9dXZGoNhwT5uW1OECAwEAAQ==
-----END PUBLIC KEY-----
`,enterprise:`
-----BEGIN PUBLIC KEY----- MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEA6k4XHyV4WE6Bd/fizN4Q c3C37LtskNTJ1c3FVxcziygAFd+fotRfbLHctwtJJhuO6+Pv+c1SPjrPeJsWRw4M IN7QHcBQHPbQDW/Erd1XjA0OVNbxs3xLVjtgMuVcd2sKYPp4nJqIyz5WLMde7v1g 1k8knI+ISrym0h4GcjkNSaHK5QKKpK7n3dzOXrjo1P6h1uOVsGAHC/ErVMQNHrAu dKgY+SDVn87oPIrd2pJb5SotI6H8HzODM/CDsF58hk/eK4zApnrtDViVb1j3oNCk hdDOnN98VIgwcHzHYZOhPFM0TFwudpi57Yu/PJJztI7WbsjpxTyX3JPvwVeWJR+Z tt6NEQ5ZaoBghGgHGiuRbhKR5qoznwsMkfb2jUbpbgRTinmtEjFmpIYSnROCixjq W1neupzBDrNi+JfoVsTwiP8SbzxHXWksN0gLMfL235l1LDMS/IrI3RmhcRkhB/Pu vPuc+jhPkwpbXaM9vDkkPWK1dmRYHWo3atYCWoSdK2705woo19oT8Dxm9OXKT+nh HsdOI+k9asBCqe4kQHi3OJ4Raesa6bFWWxKFLeUNKSAt7clJKo7GhrovnHIIAbty gk7ULdwLIlpjwB5mVUBBCts5z9KznHo+pumNoeEA8FGqq374a+jEPOHWjsshA678 RDYeqeRbh2VNcy/OwlqH/MUCAwEAAQ==
-----END PUBLIC KEY-----
`,development:`
-----BEGIN PUBLIC KEY----- MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEAsAFRjQalSEZkCDPrdBEf IMQpY7ujGf4pqjuFk86rkZENr7kJ00RjVJxuhcafgygdmxVAhKS+d1WtsSAw6c9m AawI+sSyhAClB+wrwfuCrxt/ZlLbNMiMH5SD1YvoRaHstkLpMGbWnbsLDI+cCpaL hGKk+5LoJLikhf9ipBkGX8VSAT0xTMk06iaYtEV85H9cMWtfx7seyBw2Mps/8S6f Rtp3tLlbNJIyh9+5XjtkTqYNRWJtFW1rv75K9GN9dPVXrEXUGojqeV13G+z2R3Sr QvmhESkyC1DviZBxaYnEhpWoijJQFJUQ1DGRi29ugktYzf36Otw9gyz9jGb5MLNE W+meR2LdnbTBy83QNtaS5lCzNJVo2ohwbD+djblNVegH/Dr0rK4IHEYSgjdxjErY 6xqykJpKJ025CTU4kyI3aaaYB+l2CQMAKVAh2y2rgGyJSJnMDTR44aBIZ8rtTu2r wazjBJ/RiMr0OOkfBqEQPKZ6qzSWtBDebvD0iUyRAP8SXSdDo1DcaJNamLLmjIxr 3KCcwgJt2oLcdZZHKG3WbjqmIdp7tq03O4gajKJHd5GmyLWtHXKqBwaijAx9aNqr qDPWj/Qg/8C9qpSBs7EUod3slV6UhO4yEnb7FdD/O0o8mRMU0rtJ0KQTarpEh2bY MKVsYxByiFeAjUJUWLSqIX8CAwEAAQ==
-----END PUBLIC KEY-----
`},tI=!1;var tV={verify:async n=>{try{let t=n.indexOf(".");if(t===-1)return!1;let e=n.substring(0,t),i=n.substring(t+1),r=atob(e),o=JSON.parse(r),s=Uint8Array.from(atob(i),u=>u.charCodeAt(0)),a=o?.licenseType;if(!a)return!1;if(!Mt.active&&a==="development")return console.error("[sdux-vault] Development license token rejected in production environment."),!1;let l=eV[a];if(!l)return!1;let c=await nV(l),d=await crypto.subtle.verify({name:"RSASSA-PKCS1-v1_5",hash:"SHA-256"},c,s,new TextEncoder().encode(e));if(tI||(tI=!0,d?console.info(`[sdux-vault] License verified \u2014 organization: "${o.organization}", tier: "${o.licenseType}"`):console.warn(`[sdux-vault] License signature invalid \u2014 organization: "${o.organization}", tier: "${o.licenseType}"`),console.info("[sdux-vault] License organization:",o.organization),console.info("[sdux-vault] License domain:",o.domain),console.info("[sdux-vault] License type:",o.licenseType),console.info("[sdux-vault] License issuedAt:",Th(o.issuedAt)),console.info("[sdux-vault] License expires:",Th(o.expires))),d&&o.licenseType==="enterprise"&&typeof o.expires=="number"){let u=o.expires-Date.now();if(u<0)return console.error(`[sdux-vault] Enterprise license expired \u2014 organization: "${o.organization}", expired: ${Th(o.expires)}`),!1;let h=360*60*60*1e3;u<=h&&console.warn(`[sdux-vault] Enterprise license expiring soon \u2014 organization: "${o.organization}", expires: ${Th(o.expires)}`)}return d}catch(t){return console.error("[sdux-vault] License token verification failed:",t),!1}}};async function nV(n){let t=rV(iV(n));return crypto.subtle.importKey("spki",t,{name:"RSASSA-PKCS1-v1_5",hash:"SHA-256"},!1,["verify"])}function iV(n){let t=n.replace(/-----.*KEY-----/g,"").replace(/\s+/g,"");return atob(t)}function rV(n){let t=new ArrayBuffer(n.length),e=new Uint8Array(t);for(let i=0;i<n.length;i++)e[i]=n.charCodeAt(i);return t}function Th(n){return typeof n=="string"?n:new Intl.DateTimeFormat("en-US",{month:"2-digit",day:"2-digit",year:"numeric"}).format(new Date(n))}async function oV(n){try{return n?await tV.verify(n):!1}catch{return!1}}var Qb=(()=>{class n{static needsLicense;static key;#t;#i;#n;#e;constructor(e){let i=this.constructor;if(typeof i.key!="string"||!i.key.trim())throw new Ac('LicensingClass requires a static "key". Did you forget @VaultBehavior or @VaultController?');this.#e=Fc(),this.#n=i.key,this.#i=e.featureCellKey,i.needsLicense&&this.#r()}#r(){this.#t=this.#e.requestLicense(this.#i,this.#n)}validateLicense(e){if(!this.#t)throw new Ac(`validateLicense() called but no license was requested for "${this.#i}" and "${this.#n}".`);this.#e.validateLicense(this.#i,this.#n,this.#t,e)}}return n})(),Wb=class extends Qb{behaviorCtx;static type;static key;static critical;static needsLicense;type=A.CoreLicense;critical=!0;key;constructor(t,e){super(e),this.behaviorCtx=e,this.key=t,oV(this.behaviorCtx.licensePayload).then(i=>this.validateLicense(i))}destroy(){tt(`${this.key} - destroy noop`)}reset(){tt(`${this.key} - reset noop`)}};Wb=ll([KT({type:A.CoreLicense,key:_b("Core","License"),critical:!0,needsLicense:!0,licenseId:iI})],Wb);var Gb=class{#t;#i;#n;#e;cellKey;decisionEngine;#r;#a;#l;#o;#c;#u;#d;privateErrorService=WT();#f=[];#s;#C;#h;vaultMonitor=Zb();constructor(t){this.#t=t.afterTapCallbacks??[],this.#i=t.beforeTapCallbacks??[],this.cellKey=t.cell?.key,this.#o=t.emitStateCallbacks??[],this.#d=t.errorCallbacks??[],this.#f=t.filterCallbacks??[],this.#s=t.initialState,this.#h=t.reducerCallbacks??[]}initializeOrchestrator(t){t.behaviors=t.behaviors??[],this.#b(t)}async initializeFeatureCell(t){await this.#$(t)}destroyBehaviors(t){this.#j(t)}resetBehaviors(t){this.#L(t)}async orchestrate(t,e){t.operation===Yn.Replace?await this.#A(t):await this.#R(t,e)}buildControllerCtx(t){return{traceId:t.traceId,featureCellKey:t.featureCellKey,snapshot:t.lastSnapshot,incoming:t.incoming,operation:t.operation}}normalizeIncoming(t){return t?Eb(t)||En(t)||Ta(t)||Ta(t)?t:XT(t)?xe(t):{value:t}:null}controllerOutcomeNotification(t,e){switch(t){case On.Abort:{this.#c.finalizeControllerAbort(e);break}case On.Deny:{this.#c.finalizeControllerDeny(e);break}}}prepareIncoming(t,e,i){t=this.#g(t,e,i);let r=this.#c.preparePipelineIncoming(t);if(ao(r)&&(this.vaultMonitor.startCoreState(this.cellKey,Ye,t),this.#x(t),this.vaultMonitor.endCoreState(this.cellKey,Ye,t)),as(r)){this.vaultMonitor.startCoreState(this.cellKey,Ye,t),this.#L(t),this.#x(t),this.vaultMonitor.endCoreState(this.cellKey,Ye,t);return}return r}#g(t,e,i){return t.incoming=this.normalizeIncoming(e),t.resolveType=this.#H(e),t.operation=i,t}#E(t,e){let i=e.behaviors.filter(r=>r.type===A.Merge);if(i.length>1){let r=i.map(o=>o.key).join(", ");throw new Error(`SDuX Error: More than one MergeBehavior was provided. Only one merge strategy can be active per FeatureCell. Received: ${r}. Fix: Remove additional merge behaviors or combine them into a single behavior.`)}return i.length===1&&(t.push(i[0]),t=t.filter(r=>r.type!==A.Merge)),t}#w(t){let e=t.defaultBehaviors??[];return e=this.#y(e,t),e=this.#E(e,t),e=this.#v(e,t),e=this.#m(e),e}#y(t,e){return e?.errorCallbacks?.length===0?t.filter(i=>i.type!==A.CoreErrorCallback):t}#v(t,e){return e?.emitStateCallbacks?.length===0?t.filter(i=>i.type!==A.CoreEmitState):t}#m(t){return t=t?.filter(e=>e.type!==A.CoreLicense),Xb()&&t.push(Wb),t}#S(t){let e=t.map(i=>{let r=i[bh];return{key:i.key,type:r.type,critical:r.critical,needsLicense:r.needsLicense}});Fc().describeBehaviors({featureCellKey:this.cellKey,behaviors:e})}#b(t){let e=this.#w(t),i=t.behaviors?.filter(a=>!(a.type===A.CoreAfterTap||a.type===A.CoreBeforeTap||a.type===A.CoreError||a.type===A.CoreErrorCallback||a.type===A.CoreEmitState||a.type===A.CoreLicense||a.type===A.CoreState||a.type===A.Filter||a.type===A.FromObservable||a.type===A.FromPromise||a.type===A.FromStream||a.type===A.Reduce||a.type===A.Resolve));t.operators=t.operators??[],t.interceptors=t.interceptors??[];let r=[...e,...i,...t.operators,...t.interceptors];r.some(a=>a.type===A.TabSyncState)&&(r=r.filter(a=>a.type!==A.CoreState));let s=new zb(this.cellKey,t.lastSnapshot,t.state$);this.#S(r),this.#n=s.initializeBehaviors(r,t.behaviorConfigs),this.#M(),this.#k(),this.#T(),this.#D(),s.applyBehaviorExtensions(this.#n,t.cell,this.vaultMonitor)}#T(){this.#e=this.#n.filter(t=>!(t.type===A.CoreState||t.type===A.TabSyncState||t.type===A.CoreEmitState||t.type===A.CoreError||t.type===A.ErrorTransform||t.type===A.CoreErrorCallback||t.type===A.Merge))}#D(){let t=this.#n.filter(r=>r.type===A.TabSyncState),e=this.#n.filter(r=>r.type===A.CoreState),i=t.length>0?t:e;if(i.length>1)throw new Error("Only one core state behavior can be registered for a FeatureCell.");this.#c=i[0]??null,this.#l=this.#n.filter(r=>J1(r))[0]}#M(){let t=this.#n.filter(e=>e.type===A.CoreError);if(t.length>1)throw new Error("Only one core error behavior can be registered for a FeatureCell.");this.#r=t[0]??null,this.#a=this.#n.filter(e=>Q1(e))[0],this.#u=this.#n.filter(e=>X1(e))}#k(){let t=this.#n.filter(e=>e.type===A.Merge);this.#C=t[0]??null}async#p(t,e,i){let r=await this.#_(t,e,i);return as(r)?Oc:ao(r)?Ch:gb}async#I(t,e){let i,r=await this.#p(A.StepwiseResolve,t,e);if(!wh(r))return r;if(this.#V()){if(i=await this.#B(t,e),ao(i))return Ch}else i=e;i=await this.#_(A.Filter,t,i);let o=await this.#p(A.StepwiseFilter,t,i);if(!wh(o))return o;await this.#_(A.CoreBeforeTap,t,xe(i)),i=await this.#_(A.Reduce,t,i);let s=await this.#p(A.StepwiseReducer,t,i);if(!wh(s))return s;await this.#_(A.CoreAfterTap,t,xe(i));let a=xe(i),l=a;return l=await this.#F(A.Encrypt,t,l),await this.#F(A.Persist,t,l),a}async#A(t){this.vaultMonitor.startReplace(this.cellKey,Ye,t),await this.#N(async()=>{let e;if(e=await this.#P(t),!xa(e)){let i=await this.#_(A.Resolve,t,void 0);as(i)?e=Oc:e=await this.#I(t,i)}return this.#O(e,t)},t)}async#R(t,e){this.vaultMonitor.startMerge(this.cellKey,Ye,t),await this.#N(async()=>{let i=xe(t.lastSnapshot.value),r;if(r=await this.#P(t),!xa(r)){let o=await this.#_(A.Resolve,t,void 0),s=xe(o);this.vaultMonitor.startComputeMerge(this.cellKey,Ye,t);let a=await this.#C.computeMerge(i,s,e);if(this.vaultMonitor.endComputeMerge(this.cellKey,Ye,t),as(a))r=Oc;else{let l=xe(a);r=await this.#I(t,l)}}return await this.#O(r,t)},t)}async#O(t,e){let i;return xa(t)?i={pipelinePaused:!0}:as(t)?i={pipelineStateCleared:!0}:(Pc(t)||ao(t))&&(i={noop:!0}),e.operation===Yn.Replace?this.vaultMonitor.endReplace(this.cellKey,Ye,e,i):this.vaultMonitor.endMerge(this.cellKey,Ye,e,i),t}async#N(t,e){try{let i=await t();this.vaultMonitor.startCoreState(this.cellKey,Ye,e),xa(i)?this.#c.finalizePipelineVaultStop(e):this.#c.finalizePipelineState(i,e),await this.#x(e),this.vaultMonitor.endCoreState(this.cellKey,Ye,e),this.decisionEngine?.notifySuccess(this.buildControllerCtx(e))}catch(i){let r=await this.#U(i,e);await this.decisionEngine?.notifyFailure(this.buildControllerCtx(e),r)}}async#_(t,e,i){let r;t===A.Resolve?r=this.#e.filter(o=>o.resolveType===e.resolveType&&o.type===t):r=this.#e.filter(o=>o.type===t);for(let o of r){let s;try{switch(t){case A.Resolve:typeof o.computeResolve=="function"&&(this.vaultMonitor.startResolve(this.cellKey,o.key,e),s=await o.computeResolve(e),Hi(s)&&(i=xe(s)),this.vaultMonitor.endResolve(this.cellKey,o.key,e));break;case A.StepwiseResolve:case A.StepwiseFilter:case A.StepwiseReducer:if(typeof o.evaluateStepwise=="function"){this.vaultMonitor.startStepwise(this.cellKey,o.key,e);let a=xe(e.lastSnapshot.value),l=xe(i);s=await o.evaluateStepwise(a,l,e.featureCellKey),this.vaultMonitor.endStepwise(this.cellKey,o.key,e)}break;case A.Filter:if(typeof o.applyFilter=="function")for(let a of this.#f){this.vaultMonitor.startFilter(this.cellKey,o.key,e);let l=xe(i),c=await o.applyFilter(l,a);this.vaultMonitor.endFilter(this.cellKey,o.key,e),Hi(c)&&(i=xe(c))}break;case A.CoreBeforeTap:if(typeof o.applyBeforeTap=="function")for(let a of this.#i){this.vaultMonitor.startBeforeTap(this.cellKey,o.key,e);let l=xe(i);await o.applyBeforeTap(l,a),this.vaultMonitor.endBeforeTap(this.cellKey,o.key,e)}break;case A.Reduce:if(typeof o.applyReducer=="function"){if(Pc(i)&&this.#h.length>0)throw new Error(`[vault] Reducer stage received undefined state in FeatureCell "${this.cellKey}", but reducers are registered.`);for(let a of this.#h){this.vaultMonitor.startReducer(this.cellKey,o.key,e);let l=xe(i),c=await o.applyReducer(l,a);this.vaultMonitor.endReducer(this.cellKey,o.key,e),Hi(c)&&(i=xe(c))}}break;case A.CoreAfterTap:if(typeof o.applyAfterTap=="function")for(let a of this.#t){this.vaultMonitor.startAfterTap(this.cellKey,o.key,e);let l=xe(i);await o.applyAfterTap(l,a),this.vaultMonitor.endAfterTap(this.cellKey,o.key,e)}break}}catch(a){throw this.vaultMonitor.runtimeError(this.cellKey,o.key,e,a),a}Hi(s)&&(i=xe(s))}return i}async#P(t){let e=this.#e.filter(i=>i.type===A.Interceptor);for(let i of e)try{this.vaultMonitor.startInterceptor(this.cellKey,i.key,t),t.incoming=xe(t.incoming);let r=await i.applyInterceptor(t);if(xa(r))return this.vaultMonitor.endInterceptor(this.cellKey,i.key,t,{pipelinePaused:!0}),yb;this.vaultMonitor.endInterceptor(this.cellKey,i.key,t)}catch(r){throw this.vaultMonitor.runtimeError(this.cellKey,i.key,t,r),r}}#V(){return this.#e.filter(e=>e.type===A.Operator).length>0}async#B(t,e){let i=this.#e.filter(r=>r.type===A.Operator);for(let r of i)try{this.vaultMonitor.startOperator(this.cellKey,r.key,t);let o=xe(e),s=await r.applyOperator(o);if(Pc(s)){this.vaultMonitor.endOperator(this.cellKey,r.key,t,{noop:!0});return}e=xe(s),this.vaultMonitor.endOperator(this.cellKey,r.key,t)}catch(o){throw this.vaultMonitor.runtimeError(this.cellKey,r.key,t,o),o}return e}async#F(t,e,i){let r;r=this.#e.filter(o=>o.type===t);for(let o of r)try{switch(t){case A.Encrypt:if(typeof o.encryptState=="function"){this.vaultMonitor.startEncrypt(this.cellKey,o.key,e);let s=xe(i),a=await o.encryptState(e,s);this.vaultMonitor.endEncrypt(this.cellKey,o.key,e),Hi(a)&&(i=xe(a))}break;case A.Persist:if(typeof o.persistState=="function"){this.vaultMonitor.startPersist(this.cellKey,o.key,e);let s=xe(i);await o.persistState(s),this.vaultMonitor.endPersist(this.cellKey,o.key,e)}break}}catch(s){throw this.vaultMonitor.runtimeError(this.cellKey,o.key,e,s),s}return i}#j(t){for(let e of this.#n){this.vaultMonitor.startDestroy(this.cellKey,e.key,t);try{e.destroy?.(t),this.vaultMonitor.endDestroy(this.cellKey,e.key,t)}catch(i){on(`${e.key} destroy() failed`,i),this.vaultMonitor.endDestroy(this.cellKey,e.key,t,{destroyFailed:!0})}}}#L(t){for(let e of this.#n){this.vaultMonitor.startReset(this.cellKey,e.key,t);try{e.reset?.(t),this.vaultMonitor.endReset(this.cellKey,e.key,t)}catch(i){on(`${e.key} reset() failed`,i),this.vaultMonitor.endReset(this.cellKey,e.key,t,{resetFailed:!0})}}}async#x(t){if(this.#o?.length>0){let e=xe(t.lastSnapshot);this.vaultMonitor.startCoreEmitState(this.cellKey,Ye,t);for(let i of this.#o)await this.#l.emitState(e,i);this.vaultMonitor.endCoreEmitState(this.cellKey,Ye,t)}}async#U(t,e){let i;try{this.vaultMonitor.startCoreError(this.cellKey,Ye,e),i=await this.#r.handleError(t,e.featureCellKey),Ke(`${this.cellKey} #runErrorBehaviors starting with base ResourceError: ${JSON.stringify(i)}`)}catch(r){on("[vault] Core error normalization failed",r),i=ss(t,e.featureCellKey)}finally{this.vaultMonitor.endCoreError(this.cellKey,Ye,e)}for(let r of this.#u)try{this.vaultMonitor.startErrorTransform(this.cellKey,Ye,e);let o=await r.transformError(xe(t),xe(i),xe(e.lastSnapshot));!ao(o)&&!Sh(o)&&(i=o)}catch(o){on(`[vault] ErrorBehavior "${r.key}" threw during error handling`,o)}finally{this.vaultMonitor.endErrorTransform(this.cellKey,Ye,e,i)}try{this.vaultMonitor.startCoreState(this.cellKey,Ye,e),await this.#c.finalizePipelineError(i,e),await this.#x(e)}catch(r){on("[vault] Failed to finalize error state",r)}finally{this.vaultMonitor.endCoreState(this.cellKey,Ye,e)}try{this.vaultMonitor.startGlobalError(this.cellKey,Ye,e),await this.privateErrorService.setError(xe(i))}catch(r){on("[vault] global error service",r)}finally{this.vaultMonitor.endGlobalError(this.cellKey,Ye,e)}if(this.#d?.length>0){this.vaultMonitor.startCoreCallbackError(this.cellKey,Ye,e);for(let r of this.#d)try{await this.#a.callbackError(xe(i),xe(e.lastSnapshot),r)}catch(o){on("[vault] Error callback threw during error handling",o)}this.vaultMonitor.endCoreCallbackError(this.cellKey,Ye,e)}return Ke(`${this.cellKey} #runErrorBehaviors completed with final ResourceError: ${JSON.stringify(i)}`),i}#H(t){if(Eb(t))return Nc.HttpResource;if(En(t))return Nc.Observable;if(Ta(t)||Ta(t?.value))return Nc.Promise;if(Db(t)||Db(t?.value))throw new vh;return Nc.Value}async#$(t){let e={value:void 0,loading:!1,error:null},i;if(Ta(this.#s))i=this.#s;else{let r=this.#z();if(r.length>0){let o=await this.#W(t,r);Hi(o)&&(Ke("Persisted data loaded from storage"),i=o)}else Sh(this.#s)||(this.vaultMonitor.startSetInitialValue(this.cellKey,Ye,t),Ke("Initialized data loaded from descriptor.initial"),i=this.#s,this.vaultMonitor.endSetInitialValue(this.cellKey,Ye,t))}e.value=i,Sh(e.value)?this.decisionEngine?.notifySuccess(this.buildControllerCtx(t)):await this.orchestrate(this.#g(t,e,Yn.Replace))}#z(){return this.#e.filter(t=>t.type===A.Persist)}async#W(t,e){let i;for(let o of e)try{if(this.vaultMonitor.startLoadPersist(this.cellKey,o.key,t),i=await o.loadState?.(),Hi(i)){this.vaultMonitor.endLoadPersist(this.cellKey,o.key,t);break}else this.vaultMonitor.endLoadPersist(this.cellKey,o.key,t,{noop:!0})}catch(s){this.vaultMonitor.runtimeError(this.cellKey,o.key,t,s),tt(`"[vault] persist.loadState()" for ${o.key} failed with ${s.message}`)}let r=this.#e.filter(o=>o.type===A.Encrypt);if(Hi(i)&&r.length>0)for(let o of r)try{this.vaultMonitor.startDecrypt(this.cellKey,o.key,t);let s=await o.decryptState?.(t,i);Hi(s)?(this.vaultMonitor.endDecrypt(this.cellKey,o.key,t),i=xe(s)):this.vaultMonitor.endDecrypt(this.cellKey,o.key,t,{noop:!0})}catch(s){this.vaultMonitor.runtimeError(this.cellKey,o.key,t,s),tt(`"[vault] encrypt.decryptState()" for ${o.key} failed with ${s.message}`);return}return i}},Ia={Pending:"pending",Approved:"approved",Denied:"denied"},qb=class{#t=!1;#i;constructor(t){this.#i=t}initializeControllers(t,e,i){if(this.#t)throw new Error(`[vault] VaultControllerRunner already initialized \u2014 cannot reissue core controller ID for feature cell "${this.#i}".`);if(this.#t=!0,!t||t.length===0)return[];let r=new Set;return t.map(o=>{let s=!1;try{if(typeof o!="function")return;let a=o[_h];if(!a)throw s=!0,new Error(`[vault] Controller "${o.name}" missing @VaultController metadata.`);let l=a.key,c=a.type;if(!l)throw s=!0,new Error('[vault] Controller metadata missing "key".');if(!Xb()&&!aI(l)){Ke(`[vault] Unlicensed controller "${l}" skipped during initialization.`);return}if(!c)throw s=!0,new Error(`[vault] Controller metadata missing "type" for "${l}".`);let d;if(a.wantsConfig){if(!a.configKey)throw s=!0,new Error(`[vault] Controller "${l}" declares wantsConfig but has no configKey.`);d=i.get(a.configKey)}let u;if(a.needsLicense&&!lI()){if(!a.licenseId)throw s=!0,new Error(`[vault] Controller "${l}" declares needsLicense but has no licenseId.`);if(u=sI(a.licenseId),u===void 0)throw s=!0,new Error(`[vault] License "${a.licenseId}" required by controller "${l}" is not registered in Vault config.`)}let h={featureCellKey:this.#i,requestRevote:m=>{e.next({traceId:m,type:Zn.Revote})},requestAbort:m=>{e.next({traceId:m,type:Zn.Abort})},controllerConfig:d,licensePayload:u};c===so.License&&(h.licenseDenied=m=>{e.next({traceId:m,type:Zn.LicenseDenied})},h.licenseApproved=m=>{e.next({traceId:m,type:Zn.LicenseApproved})});let p=new o(l,h);if(!p.key)throw s=!0,new Error(`[vault] Controller missing key for type "${c}". Every controller must define a unique "key".`);if(!ZT(p.key))throw s=!0,new Error(`[vault] Controller key "${p.key}" not valid format for "${c}" controller.`);return p.key&&r.has(p.key)?(tt(`[vault] Skipping duplicate controller with key "${p.key}"`),null):(p.key&&r.add(p.key),p)}catch(a){if(s)throw a;return tt(`[vault] Non-critical controller initialization failed: ${a?.message}`),null}}).filter(o=>!!o)}},Kb=class extends Gb{#t=[];#i=[];#n=new D;#e=!1;#r=!1;#a=Ia.Pending;#l=new D;constructor(t){super(t),Fc().describeFeature({featureCellKey:t.cell.key,fluentApis:{filters:t.filterCallbacks,reducers:t.reducerCallbacks,beforeTaps:t.beforeTapCallbacks,afterTaps:t.afterTapCallbacks,emitStateCallbacks:t.emitStateCallbacks,errorCallbacks:t.errorCallbacks}}),Mt.active&&(this.vaultSettled=this.#D.bind(this)),this.#m(t),this.vaultMonitor.conductorLicenseAttempt(this.cellKey,`${this.cellKey}::license`),this.initializeOrchestrator(t)}initialize(t){let e=this.#h(t,Yn.Initialize,void 0);this.#u({behaviorCtx:e,controllerCtx:this.buildControllerCtx(e),options:void 0})}conduct(t,e,i,r){let o=this.#h(t,i,r),s=this.prepareIncoming(o,e,i);if(ao(s)||as(s))return;o.incoming=s;let a=this.buildControllerCtx(o);this.#u({behaviorCtx:o,controllerCtx:a,options:r})}reset(t){this.vaultMonitor.startReset(this.cellKey,Vt,t),t.traceId=t.traceId??Ob(),this.#g(),this.resetBehaviors(t),this.#w(t),this.vaultMonitor.endReset(this.cellKey,Vt,t)}destroy(t){Ke(`${Vt} - destroy`),t.traceId=t.traceId??Ob(),this.vaultMonitor.startDestroy(this.cellKey,Vt,t),this.#g(),this.destroyBehaviors(t),this.#E(t),this.#n.complete(),this.vaultMonitor.endDestroy(this.cellKey,Vt,t)}async#o(t,e){if(t.operation===Yn.Initialize){await this.initializeFeatureCell(t);return}if(t.operation===Yn.Replace||t.operation===Yn.Merge){await this.orchestrate(t,e);return}this.vaultMonitor.runtimeError(this.cellKey,Vt,t,new Error(`Unknown operation type: "${t.operation}"`)),this.#d(t)}#c(){queueMicrotask(()=>{this.#b()})}#u(t){this.#a===Ia.Pending||this.#a===Ia.Approved?(this.vaultMonitor.startControllerAttempt(this.cellKey,Vt,t.controllerCtx),this.#t.push(t),this.#a===Ia.Approved?!this.#e&&this.#t.length===1?this.#s():this.#r&&this.#c():this.#c()):this.#c()}#d(t){let e=this.#t[0];!e||e.finalized||(e.finalized=!0,queueMicrotask(()=>{this.decisionEngine.notifyFinalize(t),this.#t.shift(),this.#e=!1,this.#T(),this.#s()}))}#f(t,e){this.vaultMonitor.restartControllerAttempt(this.cellKey,Vt,t,e),this.#e=!1}async#s(){if(this.#e||!this.#t.length)return;this.#e=!0;let t=this.#t[0];if(!t){this.#e=!1;return}try{let e=await Ps(this.#S(t)),i=this.#t[0];if(!i){this.#e=!1;return}let{behaviorCtx:r,options:o}=i,s=!1;switch(e){case On.Abstain:{Ke(`${this.cellKey} DecisionOutcome: "${On.Abstain} received. Process Event dispatched.`),await this.#o(r,o);break}case On.Abort:{this.controllerOutcomeNotification(On.Abort,r),this.vaultMonitor.endControllerAttempt(this.cellKey,Vt,r,{status:e}),this.#d(r);break}case On.Deny:{this.#b(),s=!0,this.#e=!1,this.vaultMonitor.notifyConductorDeny(this.cellKey,Vt,r),this.controllerOutcomeNotification(On.Deny,r);break}}if(s)this.#r=!0;else return this.#r=!1,this.#s()}catch(e){on("[conductor] Unreachable subscription error",e),this.vaultMonitor.conductorCrashed(this.cellKey,Vt,t?.controllerCtx??{traceId:"unknown"},e),this.#t.shift(),this.#s()}}#C(){this.decisionEngine=new Hb(this.#i,this.#n),this.#n.subscribe({next:t=>{if(t.type===Zn.LicenseDenied){this.vaultMonitor.conductorLicenseDenied(this.cellKey,`${this.cellKey}::license`),this.#a=Ia.Denied;let i=new Error(`${this.cellKey} Conductor Decision Engine: The FeatureCell received a "License Denied". Pipeline is disabled.`);console.error(`[vault] ${i.message}`),Ke(i.message),this.privateErrorService.setError(ss(i,this.cellKey)),this.#t.length=0;return}if(t.type===Zn.LicenseApproved){this.vaultMonitor.conductorLicenseApproved(this.cellKey,`${this.cellKey}::license`),this.#a=Ia.Approved,Ke(`${this.cellKey} Conductor Decision Engine: License Approved.`),this.#s();return}let e=this.#t[0];if(e){if(e.controllerCtx.traceId!==t.traceId){Ke(`The head ctx is not the same as the event. ${e.controllerCtx.traceId} != ${t.traceId}`);return}switch(t.type){case Zn.Success:{this.vaultMonitor.endControllerAttempt(this.cellKey,Vt,e.controllerCtx,{status:"success"}),this.#d(e.controllerCtx);break}case Zn.Failure:{this.vaultMonitor.endControllerAttempt(this.cellKey,Vt,e.controllerCtx,{status:"failure"}),this.#f(e.behaviorCtx,t.type);break}case Zn.Abort:{this.vaultMonitor.conductorAbort(this.cellKey,Vt,e.controllerCtx),Ke(`${this.cellKey} Conductor Decision Engine: Abort request received for Behavior TraceId: ${e.controllerCtx.traceId}.`),this.#d(e.controllerCtx);break}case Zn.Revote:{Ke(`${this.cellKey} Conductor Decision Engine: Revote request received for Behavior TraceId: ${e.controllerCtx.traceId}.`),this.vaultMonitor.conductorRevote(this.cellKey,Vt,e.controllerCtx),this.#e=!1,Ke(`${this.cellKey} Conductor Decision Engine: processQueue event dispatched for Behavior TraceId: ${e.controllerCtx.traceId}.`),this.#s();break}}}}})}#h(t,e,i){let r=Ob();return{destroyed$:t.destroyed$,reset$:t.reset$,state$:t.state$,featureCellKey:t.featureCellKey,state:t.state,lastSnapshot:t.lastSnapshot,options:i!=null?xe(i):i,traceId:r,operation:e,resolveType:void 0,incoming:void 0}}#g(){this.#t.length=0,this.#e=!1}#E(t){for(let e of this.#i){this.vaultMonitor.startDestroy(this.cellKey,e.key,t);try{e.destroy?.(),this.vaultMonitor.endDestroy(this.cellKey,e.key,t)}catch(i){on(`${e.key} destroy() failed`,i),this.vaultMonitor.endDestroy(this.cellKey,e.key,t,{destroyFailed:!0})}}}#w(t){for(let e of this.#i){this.vaultMonitor.startReset(this.cellKey,e.key,t);try{e.reset?.(),this.vaultMonitor.endReset(this.cellKey,e.key,t)}catch(i){on(`${e.key} reset() failed`,i),this.vaultMonitor.endReset(this.cellKey,e.key,t,{resetFailed:!0})}}}#y(t,e){let i=e.controllers.filter(r=>r.type===so.Error);if(i.length>1){let r=i.map(o=>o.key).join(", ");throw new Error(`SDuX Error: More than one ErrorController was provided. Only one error policy can be active per FeatureCell. Received: ${r}. Fix: Remove additional error controllers or combine them into a single controller.`)}i.length===1?t.push(i[0]):t.unshift(Pb)}#v(t){return t.filter(e=>e.type===so.License||e.type===so.CoreAbstain?(Ke(`${this.cellKey} Conductor: Filtering out controller "${e.key}" of type "${e.type}" as it is reserved for internal use.`),!1):!0)}#m(t){t.controllers=t.controllers??[];let e=this.#v(t.controllers);this.#y(e,t),e.unshift(Lb),e.unshift(Nb);let i=e.map(o=>{let s=o[_h];return{key:o.key,type:s.type,critical:s.critical,needsLicense:s.needsLicense}});Fc().describeControllers({featureCellKey:this.cellKey,controllers:i});let r=new qb(t.cell.key);this.#i=r.initializeControllers(e,this.#n,t.behaviorConfigs),this.#C()}#S(t){return this.vaultMonitor.startConductorVote(this.cellKey,Vt,t.controllerCtx),this.decisionEngine.evaluateAttempt(t.controllerCtx)?.pipe(Dt(e=>{this.vaultMonitor.endConductorVote(this.cellKey,Vt,t.controllerCtx,e)}),ue(e=>e.outcome))}#b(){Mt.active&&this.#l.next()}#T(){!Mt.active||this.#t.length>0||queueMicrotask(()=>{this.#l.next()})}#D(){return Ps(this.#l)}},Nn="vault-feature-cell";function sV(n,t=[]){if(typeof n.initialState=="object"&&n.initialState!==null&&"data"in n.initialState)throw new Error(`[vault] Invalid FeatureCelldescriptorModel.initial for feature "${n.key}". Expected raw data (e.g., [] or {}), but received an object with resource fields { loading, data, error }. Pass plain data to avoid double-wrapping.`);if(t.filter(i=>i.type===A.Encrypt).length>1)throw new Error("[vault] FeatureCell cannot register multiple encryption behaviors.")}var Yb=class{featureCellConfiguration;defaultBehaviors;behaviors;controllers;#t=!1;#i;#n=!1;#e=Zb();cell;cellKey;ctx;destroyed$=new D;reset$=new D;state$=new D;constructor(t,e,i,r){this.featureCellConfiguration=t,this.defaultBehaviors=e,this.behaviors=i,this.controllers=r,this.cellKey=this.featureCellConfiguration.key,this.ctx=this.#r()}#r(){let t=this.destroyed$.asObservable(),e=this.state$,i=this.reset$.asObservable(),r={isLoading:!1,value:void 0,error:null,hasValue:!1},o={destroyed$:t,featureCellKey:this.cellKey,reset$:i,state$:e,get state(){let s=this.lastSnapshot;return{isLoading:s.isLoading,value:s.value,error:s.error,hasValue:s.hasValue}}};return Object.defineProperty(o,"lastSnapshot",{value:r,writable:!1,configurable:!1,enumerable:!0}),o}reset(){this.#e.startReset(this.cellKey,Nn,this.ctx),tt(`${Nn}: reset`),this.#a(),this.reset$.next(),this.#i?.reset(this.ctx),this.#e.endReset(this.cellKey,Nn,this.ctx)}destroy(){this.#e.startDestroy(this.cellKey,Nn,this.ctx),tt(`${Nn}: destroy`),this.reset$.next(),this.reset$.complete(),this.#i?.destroy(this.ctx),this.destroyed$.next(),this.destroyed$.complete(),this.state$.complete(),this.#e.endDestroy(this.cellKey,Nn,this.ctx)}#a(){if(this.#t){let t=`[vault] FeatureCell "${this.featureCellConfiguration.key}" encountered a critical initialization failure and is now in a corrupted state. Further use is blocked.`;throw this.#e.runtimeError(this.cellKey,Nn,this.ctx,t),new Error(t)}if(!this.#n){let t=`[vault] FeatureCell "${this.featureCellConfiguration.key}" has not been initialized. You must call cell.initialize() before using state methods.`;throw this.#e.runtimeError(this.cellKey,Nn,this.ctx,t),new Error(t)}}#l(t){if(this.#n){let e=`[vault] FeatureCell "${this.featureCellConfiguration.key}" already initialized.`;throw this.#e.runtimeError(this.cellKey,Nn,this.ctx,e),new Error(e)}try{this.#e.registerCell(this.cellKey,this.featureCellConfiguration.insights),this.#e.startInitialized(this.cellKey,Nn,this.ctx),sV(this.featureCellConfiguration,this.behaviors),this.#n=!0,this.#i=new Kb({afterTapCallbacks:t.afterTapCallbacks,beforeTapCallbacks:t.beforeTapCallbacks,behaviors:this.behaviors,behaviorConfigs:t.behaviorConfigs,cell:this.cell,defaultBehaviors:this.defaultBehaviors,controllers:this.controllers,emitStateCallbacks:t.emitStateCallbacks,errorCallbacks:t.errorCallbacks,filterCallbacks:t.filterFunctions,initialState:t.hydrate||this.featureCellConfiguration.initialState,interceptors:t.interceptors,lastSnapshot:this.ctx.lastSnapshot,operators:t.operators,reducerCallbacks:t.reducerFunctions,state$:this.state$}),this.#i.initialize(this.ctx),Mt.active&&(Object.defineProperty(this.cell,"vaultSettled",{enumerable:!1,configurable:!1,writable:!1,value:()=>this.#i.vaultSettled()}),Z1(this.cellKey,this.#i.vaultSettled.bind(this.#i))),this.#e.endInitialized(this.cellKey,Nn,this.ctx)}catch(e){throw this.#t=!0,this.#e.runtimeError(this.cellKey,Nn,this.ctx,e),e}}#o(t){throw this.#t=!0,this.#e.runtimeError(this.cellKey,Nn,this.ctx,t),new Error(t)}setup(){let t=[],e=[],i=[],r=[],o,s=[],a=[],l=[],c=[],d=new Map,u={behaviorConfigs:d,afterTaps:h=>(this.#n&&this.#o('Cannot call "afterTaps" after initialize(). Configuration must be done before initialization.'),Array.isArray(h)&&t.push(...h),u),beforeTaps:h=>(this.#n&&this.#o('Cannot call "beforeTaps" after initialize(). Configuration must be done before initialization.'),Array.isArray(h)&&e.push(...h),u),emitStates:h=>(this.#n&&this.#o('Cannot call "emitStates" after initialize(). Configuration must be done before initialization.'),Array.isArray(h)&&c.push(...h),u),errors:h=>(this.#n&&this.#o('Cannot call "errors" after initialize(). Configuration must be done before initialization.'),Array.isArray(h)&&i.push(...h),u),filters:h=>(this.#n&&this.#o('Cannot call "filters" after initialize(). Configuration must be done before initialization.'),Array.isArray(h)&&r.push(...h),u),hydrate:h=>(this.#n&&this.#o('Cannot call "hydrate" after initialize(). Configuration must be done before initialization.'),o=h,u),initialize:()=>{this.#l({afterTapCallbacks:t,beforeTapCallbacks:e,behaviorConfigs:d,emitStateCallbacks:c,errorCallbacks:i,filterFunctions:r,hydrate:o,interceptors:s,operators:a,reducerFunctions:l})},interceptors:h=>(this.#n&&this.#o('Cannot call "interceptors" after initialize(). Configuration must be done before initialization.'),Array.isArray(h)&&s.push(...h),u),operators:h=>(this.#n&&this.#o('Cannot call "operators" after initialize(). Configuration must be done before initialization.'),Array.isArray(h)&&a.push(...h),u),reducers:h=>(this.#n&&this.#o('Cannot call "reducers" after initialize(). Configuration must be done before initialization.'),Array.isArray(h)&&l.push(...h),u)};return u}mergeState(t,e){return this.#a(),this.#i.conduct(this.ctx,t,Yn.Merge,e)}replaceState(t,e){return this.#a(),this.#i.conduct(this.ctx,t,Yn.Replace,e)}},Ah=class extends Yb{constructor(t,e,i,r){super(t,e,i,r)}build(){let t=this.setup(),e=this.ctx,i={afterTaps:(...r)=>(t.afterTaps(...r),i),beforeTaps:(...r)=>(t.beforeTaps(...r),i),destroy:this.destroy.bind(this),destroyed$:this.destroyed$.asObservable(),errors:(...r)=>(t.errors(...r),i),filters:(...r)=>(t.filters(...r),i),hydrate:(...r)=>(t.hydrate(...r),i),initialize:t.initialize,interceptors:(...r)=>(t.interceptors(...r),i),key:this.cellKey,mergeState:this.mergeState.bind(this),operators:(...r)=>(t.operators(...r),i),reducers:(...r)=>(t.reducers(...r),i),emitStates:(...r)=>(t.emitStates(...r),i),replaceState:this.replaceState.bind(this),reset$:this.reset$.asObservable(),reset:this.reset.bind(this),state$:this.state$.asObservable(),get state(){return{isLoading:e.lastSnapshot.isLoading,value:e.lastSnapshot.value,error:e.lastSnapshot.error,hasValue:e.lastSnapshot.hasValue}}};return this.cell=i,this.behaviors.forEach(r=>{r?.installFluentApi?.(this.cell,t.behaviorConfigs)}),this.controllers.forEach(r=>{r?.installFluentApi?.(this.cell,t.behaviorConfigs)}),Object.defineProperty(i,"ctx",{value:this.ctx,enumerable:!1,writable:!1}),Object.defineProperty(i,"key",{value:this.featureCellConfiguration.key,enumerable:!1,writable:!1}),i}},cs=new Map,nI=new Map;function aV(n,t){if(t){if(cs.has(n)){if(!Mt.active){let i=cs.get(n);throw new Error(`[vault] Duplicate FeatureCell key detected: "${n}". Each FeatureCell must have a unique key. Existing token: "${i?.key}"`)}return cs.get(n)}let e={key:n};return cs.set(n,e),e}if(!cs.has(n))throw new Error(`[vault] FeatureCell token not found for key "${n}". You must call provideFeatureCell() before retrieving this FeatureCell.`);if(nI.has(n)){if(!Mt.active)throw new Error(`[vault] FeatureCell "${n}" can only be owned by a single consumer.`);return cs.get(n)}return nI.set(n,!0),cs.get(n)}function dI(n){return aV(n,!0)}var Lc={FEATURE_CELL_KEY:"vault:feature-cell-key",FEATURE_CELL_STATE:"vault:feature-cell-state"};function Jb(n){return function(t){t[Lc.FEATURE_CELL_KEY]=n,t[Lc.FEATURE_CELL_STATE]=null}}var ds=new Map,uI=new Map;function fI(n,t){let e=ds.get(n);if(t){if(ds.has(n)){if(!ro.active)throw new Error(`[vault] Duplicate FeatureCell key detected: "${n}". Each FeatureCell must have a unique key. Existing token: "${n}"`);return ds.get(n)}return e=new b(`FEATURE_CELL:${n}`),ds.set(n,e),e}else{if(!ds.has(n))throw new Error(`[vault] FeatureCell token not found for key "${n}". You must call provideFeatureCell() before retrieving this FeatureCell.`);if(uI.has(n)){if(!ro.active)throw new Error(`[vault] FeatureCell "${n}" can only be injected into a single decorated @FeatureCell service.`);return ds.get(n)}return uI.set(n,!0),ds.get(n)}}function hI(n){return fI(n,!0)}function pI(n){return fI(n,!1)}function e_(n){let t=n;if(!t)throw new Error("injectVault() must be called inside a @FeatureCell()-decorated service and must be given the class reference.");let e=t[Lc.FEATURE_CELL_KEY];if(!e)throw new Error("injectVault() must be called inside a @FeatureCell()-decorated service.");let i=pI(e);return f(i)}var lV="@sdux-vault/core",cV="0.9.0";rs(lV,cV);var t_="external";var Di=class extends Qb{constructor(e,i){super(i);this.behaviorCtx=i;this.key=e}type=Di.type;critical=Di.critical;key;commitState(e,i,r){T(`${this.key} commitState called with: ${Re(i)}`);try{if(!!i&&Object.keys(i).length>0){let a=fh(i);Object.assign(e.lastSnapshot,a),e.lastSnapshot.hasValue=e.lastSnapshot.value!==void 0&&e.lastSnapshot.value!==null}let s={snapshot:fh(e.lastSnapshot),type:r};e.options&&(s.options=e.options),e.state$.next(s)}catch(o){os(`${this.key} an error occurred updating the state`,o)}}preparePipelineIncoming(e){let i=e.incoming,r={};return wa(i)||xc(i)&&Ea(i.value)?(this.commitState(e,null,rn.IncomingPipeline),_i):xc(i)&&oo(i.value)?(wa(i.loading)||(r.isLoading=i.loading),hh(i.error)&&(r.error=Ea(i.error)?null:Lt(i.error,t_)),this.commitState(e,r,rn.IncomingPipeline),qn):(Sa(i)?r.isLoading=!0:xc(i)&&(wa(i?.loading)||(r.isLoading=i.loading),hh(i?.error)&&(r.error=Ea(i.error)?null:Lt(i.error,t_))),Object.keys(r).length>0&&this.commitState(e,r,rn.IncomingPipeline),i)}finalizePipelineState(e,i){if(T(`${this.key} - finalizeVaultState`),Sa(i.incoming)&&this.commitState(i,{isLoading:!1},rn.FinalizePipeline),ab(e)){this.commitState(i,null,rn.FinalizePipeline);return}if(Ea(e)||lb(e)){this.commitState(i,{value:void 0},rn.FinalizePipeline);return}!wa(e)&&!cI(e)&&this.commitState(i,{value:e},rn.FinalizePipeline)}finalizePipelineVaultStop(e){T(`${this.key} - finalizePipelineVaultStop`),this.commitState(e,null,rn.FinalizePipeline)}finalizePipelineError(e,i){T(`${this.key} - finalizePipelineError`),this.commitState(i,{error:e,value:i.lastSnapshot.value,isLoading:!1},rn.PipelineError)}finalizeControllerAbort(e){T(`${this.key} - finalizeAbort`),this.commitState(e,{isLoading:!1},rn.AbortController)}finalizeControllerDeny(e){T(`${this.key} - finalizeDeny`),this.commitState(e,{isLoading:!1},rn.DenyController)}destroy(e){q(`${this.key} - destroy`),this.commitState(e,{isLoading:!1,value:void 0,error:null},rn.PipelineDestroy)}reset(e){q(`${this.key} - reset`),this.commitState(e,{isLoading:!1,value:void 0,error:null},rn.PipelineReset)}};x(Di,"type"),x(Di,"critical"),Di=we([Te({type:he.CoreState,key:Ie("Core","State"),critical:!0})],Di);var Ei=class extends Tc{critical=Ei.critical;constructor(t,e){super(t,e)}async callbackError(t,e,i){if(typeof i!="function")q(`${this.key} handleError skipped - "${i}" is not a function.`);else try{await i(t,e)}catch(r){q(`${this.key} oldschoolCallback threw: ${r}`)}}};x(Ei,"type"),x(Ei,"key"),x(Ei,"critical"),Ei=we([Te({type:he.CoreErrorCallback,key:Ie("Core","ErrorCallback"),critical:!0})],Ei);var Er=class{constructor(t,e){this.behaviorCtx=e;this.key=t}critical=!0;key;type=he.CoreError;handleError(t,e){return Lt(t,e)}destroy(){q(`${this.key} - destroy "noop"`)}reset(){q(`${this.key} - reset "noop"`)}};x(Er,"type"),x(Er,"key"),x(Er,"critical"),Er=we([Te({type:he.CoreError,key:Ie("Core","Error"),critical:!0})],Er);var Xn,mI,gI,yI,Rh,wr=class{constructor(t,e){this.behaviorCtx=e;Ss(this,Xn);x(this,"type",he.Filter);x(this,"critical",!0);x(this,"key");this.key=t}applyFilter(t,e){if(T(`${this.key} applyFilter called with "${Re(t)}".`),t===void 0){T(`${this.key} applyFilter skipped - not a valid plain state. The current type is ${typeof t}. Undefined returned.`);return}if(typeof e!="function")return T(`${this.key} applyFilter skipped. The filter type is ${typeof e}. "${Re(t)}" returned.`),t;let i;try{i=e(t)}catch(r){throw os(`${this.key} filter execution failed`,r.message),r}return i===void 0?(T(`${this.key} Filter returned undefined. state rejected.`),qn):(qi(this,Xn,mI).call(this,t,i)||qi(this,Xn,gI).call(this,t,i)||(qi(this,Xn,yI).call(this,t,i),T(`${this.key} applyFilter returned with "${Re(i)}".`)),i)}destroy(){q(`${this.key} - destroy "noop"`)}reset(){q(`${this.key} - reset "noop"`)}};Xn=new WeakSet,mI=function(t,e){if(Array.isArray(t)){if(!Array.isArray(e))throw qi(this,Xn,Rh).call(this,t,e),new Error("[vault] Filter returned non-array for array input.");return!0}return!1},gI=function(t,e){if(t!==null&&typeof t=="object"){if(typeof e!="object"||e===null||Array.isArray(e))throw qi(this,Xn,Rh).call(this,t,e),new Error("[vault] Filter returned invalid object for object input.");return!0}return!1},yI=function(t,e){if(typeof e!=typeof t)throw qi(this,Xn,Rh).call(this,t,e),new Error(`[vault] Filter returned a value of incorrect type. Expected "${typeof t}", got "${typeof e}".`)},Rh=function(t,e){T(`${this.key} The types not aligned. Current type: "${typeof t}". Next type: ${typeof e}. "${Re(e)}" returned.`)},x(wr,"type"),x(wr,"key"),x(wr,"critical"),wr=we([Te({type:he.Filter,key:Ie("Core","Filter"),critical:!0})],wr);var Qn=class{constructor(t,e){this.behaviorCtx=e;this.key=t}type=Qn.type;key;critical=Qn.critical;computeMerge(t,e,i){let r=t,o=e,s=i?.clearUndefined??!1;return T(`${this.key} merge called (clear: ${s})`),o===void 0&&!s?(T(`${this.key} computeMerge skipped. The next value "${o}" and clear is "${s}`),r):o===void 0&&s?(T(`${this.key} computeMerge skipped. The next value "${o}" and clear is "${s}`),_i):Array.isArray(r)&&Array.isArray(o)?(T(`${this.key} merging array. Return clone of next`),[...o]):(T(`${this.key} non-array branch. Return next`),o)}destroy(){q(`${this.key} - destroy "noop"`)}reset(){q(`${this.key} - reset "noop"`)}};x(Qn,"type"),x(Qn,"key"),x(Qn,"critical",!0),Qn=we([Te({type:he.Merge,key:Ie("Core","ArrayMerge"),critical:!0})],Qn);function vI(n){n.fromObservable=function(t){return t}}var an=class{constructor(t,e){this.behaviorCtx=e;this.key=t}type=an.type;key;critical=an.critical;resolveType=an.resolveType;extendCellAPI(t){return{fromObservable:e=>new U(i=>{T(`${this.key} fromObservable called.`);let r=t.destroyed$??je,o=t.reset$??je,s=e.pipe(K(o),K(r),gt(1)).subscribe({next:a=>{T(`${this.key} fromObservable emitted value "${Re(a)}".`),i.next({loading:!1,value:a,error:null})},error:a=>{let l=Lt(a,t.featureCellKey);i.error(l),T(`${this.key} fromObservable emitted error "${l.message}".`)},complete:()=>{i.complete(),T(`${this.key} fromObservable completed.`)}});return()=>{s.unsubscribe(),T(`${this.key} fromObservable subscription unsubscribed.`)}})}}destroy(){q(`${this.key} - destroy "noop"`)}reset(){q(`${this.key} - reset "noop"`)}};x(an,"extension",vI),x(an,"type"),x(an,"key"),x(an,"resolveType"),x(an,"critical"),an=we([Te({type:he.FromObservable,key:Ie("Core","FromObservable"),critical:!1,resolveType:Rn.Observable})],an);function bI(n){n.fromDeferred=function(t){throw new Error("[vault] fromDeferred() behavior not installed")},n.fromPromise=function(t){throw new Error("[vault] fromPromise() behavior not installed")}}var ln=class{constructor(t,e){this.behaviorCtx=e;this.key=t}type=ln.type;key;critical=ln.critical;resolveType=ln.resolveType;extendCellAPI(t){let e=i=>new Promise((r,o)=>{if(T(`${this.key} fromPromise called.`),oo(i)){r({loading:!1,value:void 0,error:null});return}if(!Ic(i)){let a=i;r({loading:a?.loading??!1,value:void 0,error:a?.error??null});return}let s;try{s=i.value?.()}catch(a){let l=Lt(a,t.featureCellKey);o(l);return}Promise.resolve(s).then(a=>{T(`${this.key} fromPromise resolved value: ${Re(a)}`),r({loading:i.loading??!1,value:a,error:i.error??null})}).catch(a=>{let l=Lt(a,t.featureCellKey);o(l)})});return{fromPromise:i=>e(i),fromDeferred:i=>e(i)}}destroy(){q(`${this.key} - destroy "noop"`)}reset(){q(`${this.key} - reset "noop"`)}};x(ln,"extension",bI),x(ln,"type"),x(ln,"key"),x(ln,"critical"),x(ln,"resolveType"),ln=we([Te({type:he.FromPromise,key:Ie("Core","FromPromise"),critical:!1,resolveType:Rn.Promise})],ln);var Sr=class{constructor(t,e){this.behaviorCtx=e;this.key=t}critical=!0;type=he.Reduce;key;applyReducer(t,e){return T(`${this.key} applyReducer called with "${Re(t)}".`),typeof e!="function"?(T(`${this.key} applyReducer skipped - reducer is not a function.`),t):e(t)}destroy(){q(`${this.key} - destroy "noop"`)}reset(){q(`${this.key} - reset "noop"`)}};x(Sr,"type"),x(Sr,"key"),x(Sr,"critical"),Sr=we([Te({type:he.Reduce,key:Ie("Core","Reducer"),critical:!0})],Sr);var Jn=class{constructor(t,e){this.behaviorCtx=e;this.key=t}type=he.Resolve;key;critical=!1;resolveType=Jn.resolveType;async computeResolve(t){let e=t.incoming;if(T(`${this.key} computeResolve called with incoming: ${Re(e)}`),!En(e)){T(`${this.key} computeResolve skipped \u2014 incoming is not an Observable.`);return}T(`${this.key} computeResolve detected Observable input.`);let i=e,r=t.reset$??je,o=t.destroyed$??je;try{let s=await Ps(i.pipe(K(r),K(o),gt(1)));return T(`${this.key} computeResolve resolved value: ${Re(s)}`),s}catch(s){let a=Lt(s,t.featureCellKey);throw T(`${this.key} computeResolve caught error: ${a.message}`),a}}destroy(){q(`${this.key} - destroy "noop"`)}reset(){q(`${this.key} - reset "noop"`)}};x(Jn,"type"),x(Jn,"key"),x(Jn,"critical"),x(Jn,"resolveType"),Jn=we([Te({type:he.Resolve,key:Ie("Core","Observable"),critical:!1,resolveType:Rn.Observable})],Jn);var bn=class{constructor(t,e){this.behaviorCtx=e;this.key=t}type=bn.type;key;critical=bn.critical;resolveType=bn.resolveType;async computeResolve(t){let e=t.incoming;if(T(`${this.key} computeResolve promise called with incoming: ${Re(e)}`),!(Ic(e)||ph(e))||oo(e)){T(`${this.key} computeResolve skipped \u2014 incoming is not a deferred factory.`);return}T(`${this.key} computeResolve detected Promise input.`);try{let i;return ph(e)?i=await e?.():i=await e.value?.(),T(`${this.key} computeResolve resolved value: ${Re(i)}`),i}catch(i){let r=Lt(i,t.featureCellKey);throw T(`${this.key} computeResolve caught error: ${r.message}`),r}}destroy(){q(`${this.key} - destroy "noop"`)}reset(){q(`${this.key} - reset "noop"`)}};x(bn,"type"),x(bn,"key"),x(bn,"critical"),x(bn,"resolveType"),bn=we([Te({type:he.Resolve,key:Ie("Core","Promise"),critical:!1,resolveType:Rn.Promise})],bn);var _n=class{constructor(t,e){this.behaviorCtx=e;this.key=t}type=_n.type;critical=_n.critical;key;resolveType=_n.resolveType;async computeResolve(t){T(`${this.key} computeResolve called with "${Re(t.incoming)}".`);let e=t.incoming;if(!e||Sa(e)){T(`${this.key} computeResolve skipped - not a valid plain state.`);return}let{value:i}=e;if(i===void 0){T(`${this.key} value is undefined and resolution skipped.`);return}return i===null?(T(`${this.key} value is null and clear state returned.`),_i):Array.isArray(i)?(T(`${this.key} array value detected and cloned.`),[...i]):typeof i=="object"?(T(`${this.key} object value detected and cloned.`),g({},i)):(T(`${this.key} primitive value detected and returned.`),i)}destroy(){q(`${this.key} - destroy "noop"`)}reset(){q(`${this.key} - reset "noop"`)}};x(_n,"type"),x(_n,"key"),x(_n,"critical"),x(_n,"resolveType"),_n=we([Te({type:he.Resolve,key:Ie("Core","Value"),critical:!0,resolveType:Rn.Value})],_n);function _I(n){n.fromStream=function(t,e){}}var cn=class{constructor(t,e){this.behaviorCtx=e;this.key=t}type=cn.type;key;critical=cn.critical;resolveType=cn.resolveType;extendCellAPI(t){return{fromStream:(e,i)=>{let{autoResetError:r=!0}=i??{};T(`${this.key} fromStream called.`),T(`${this.key} fromStream options resolved (autoResetError=${r}).`),t.vaultMonitor.ingressSubscribed(t.featureCellKey,this.key,t,"fromStream"),T(`${this.key} fromStream subscription started.`),e.pipe(K(t.destroyed$)).subscribe({next:o=>{T(`${this.key} subscription.next called.`),T(`${this.key} incoming value received: "${Re(o)}".`),r&&T(`${this.key} autoResetError enabled \u2192 clearing error.`);let s=r?{value:o,error:null}:{value:o};t.mergeState(s),T(`${this.key} mergeState invoked from stream.next.`)},error:o=>{T(`${this.key} subscription.error called.`);let s=Lt(o,this.key);T(`${this.key} stream error converted to VaultError: "${s.message}".`),t.mergeState({error:s}),T(`${this.key} mergeState invoked from stream.error.`)},complete:()=>{T(`${this.key} subscription.complete called.`),t.vaultMonitor.ingressCompleted(t.featureCellKey,this.key,t,"fromStream"),T(`${this.key} fromStream completed.`)}})}}}destroy(){q(`${this.key} - destroy "noop"`)}reset(){q(`${this.key} - reset "noop"`)}};x(cn,"extension",_I),x(cn,"type"),x(cn,"key"),x(cn,"critical"),x(cn,"resolveType"),cn=we([Te({type:he.FromStream,key:Ie("Core","FromStream"),critical:!1,resolveType:Rn.Observable})],cn);var Tr=class{constructor(t,e){this.behaviorCtx=e;this.key=t}type=he.CoreEmitState;critical=!0;key;emitState(t,e){if(T(`${this.key} emitState called with "${Re(t)}".`),typeof e!="function")return T(`${this.key} emitState skipped. The emitState type is ${typeof e}. "${Re(t)}" returned.`),qn;try{e(t)}catch(i){return os(`${this.key} emitState execution failed`,Re(i)),qn}}destroy(){q(`${this.key} - destroy "noop"`)}reset(){q(`${this.key} - reset "noop"`)}};x(Tr,"type"),x(Tr,"key"),x(Tr,"critical"),Tr=we([Te({type:he.CoreEmitState,key:Ie("Core","EmitState"),critical:!0})],Tr);var Ma=class{constructor(t,e){this.behaviorCtx=e;this.key=t}static type;static key;static critical=!0;critical=!0;key;type;executeTap(t,e){T(`${this.key} executeTap called with "${Re(t)}".`),typeof e!="function"&&T(`${this.key} executeTap skipped - tap is not a function. Type is "${typeof e}".`),e(t)}destroy(){q(`${this.key} - destroy "noop"`)}reset(){q(`${this.key} - reset "noop"`)}};var ka=class extends Ma{type=he.CoreAfterTap;applyAfterTap(t,e){this.executeTap(t,e)}};ka=we([Te({type:he.CoreAfterTap,key:Ie("Core","AfterTap"),critical:!0})],ka);var Aa=class extends Ma{type=he.CoreBeforeTap;applyBeforeTap(t,e){this.executeTap(t,e)}};Aa=we([Te({type:he.CoreBeforeTap,key:Ie("Core","BeforeTap"),critical:!0})],Aa);function n_(n,t=[],e=[]){return dI(n.key),oI({key:n.key}),new Ah(n,dV(),t,e).build()}function dV(){return[ka,Aa,Er,wr,an,ln,cn,Jn,bn,Sr,_n,Di,Ei,Qn,Tr]}var Oh=class{constructor(t){this.core=t;this.#t.add(this.core.state$.subscribe(e=>{this.#e.set(e?.snapshot?.isLoading??!1),this.#n.set(e?.snapshot?.error??null),this.#i.set(e?.snapshot?.value??void 0)})),this.#a.onDestroy(()=>this.destroy())}#t=new H;#i=O(void 0);#n=O(null);#e=O(!1);#r=ve(()=>{let t=this.#i();return t!=null});#a=f(st);build(){let t=this.core;return Object.defineProperty(t,"state",{configurable:!0,enumerable:!0,get:()=>({isLoading:this.#e.asReadonly(),value:this.#i.asReadonly(),error:this.#n.asReadonly(),hasValue:this.#r})}),t}destroy(){this.core.destroy(),this.#t.unsubscribe()}};function i_(n,t,e=[],i=[]){return[{provide:hI(t.key),useFactory:()=>{let o=n_(t,e,i);return new Oh(o).build()}},n]}function r_(n={}){return ff(()=>{rI(n)})}var uV="@sdux-vault/angular",fV="0.11.0";rs(uV,fV);var hV="@sdux-vault/devtools",pV="0.9.2";rs(hV,pV);var o_=null;function a_(){return o_||(o_=new s_),o_}var s_=class{#t=new D;constructor(){window.sdux??={},window.sdux.vaultEventBus=this}nextPipeline(t){ro.active&&t&&this.#t.next(t)}pipeline$(){return this.#t.asObservable()}};var Ra=class n{constructor(t){this.zone=t;this.isChromeExtension=typeof chrome<"u"&&!!chrome?.runtime?.connect,this.isChromeExtension&&this.#r()}#t=new D;vaultConfig=O(null);isChromeExtension;#i=a_();#n=null;#e=null;static RECONNECT_DELAY_MS=1e3;refreshLocalConfig(){this.#l()}pipeline$(){return this.isChromeExtension?this.#t.asObservable():this.#i.pipeline$()}listenPipeline(t){let e=this.pipeline$().subscribe(t);return()=>e.unsubscribe()}#r(){this.#n=chrome.runtime.connect({name:"vault-devtools"}),this.#n.onMessage.addListener(t=>{if(t?.type)switch(t.type){case"VAULT_PIPELINE_EVENT":this.zone.run(()=>{this.#t.next(t.event)});break;case"VAULT_CONFIG":this.zone.run(()=>{this.#o(t.config)});break;default:console.warn(`[Vault DevTools] Unhandled message type: "${t.type}"`)}}),this.#n.onDisconnect.addListener(()=>{this.#n=null,this.#a()})}#a(){this.#e!=null&&clearTimeout(this.#e),this.#e=setTimeout(()=>{this.#e=null,this.#r()},n.RECONNECT_DELAY_MS)}#l(){let t=globalThis.sdux;if(!t)return;let e=t.versions??{},i=null;if(typeof t.getRegistry=="function")try{let r=t.getRegistry();r&&(i=Array.from(r.values()).map(o=>{let s=o,a=s.behaviors,l=s.controllers;return{key:s.key,behaviorsRegistered:!!s.behaviorsRegistered,controllersRegistered:!!s.controllersRegistered,fluentApis:s.fluentApis??null,behaviors:a?Array.from(a.values()):[],controllers:l?Array.from(l.values()):[]}}))}catch{}this.#o({versions:e,registry:i})}#o(t){let e=this.vaultConfig();this.vaultConfig.set({versions:g(g({},e?.versions),t.versions),registry:t.registry??e?.registry??null})}static \u0275fac=function(e){return new(e||n)(ne(L))};static \u0275prov=C({token:n,factory:n.\u0275fac,providedIn:"root"})};var mV=(n,t)=>t[0];function gV(n,t){if(n&1&&(Me(0,"tr")(1,"td"),E(2),ke(),Me(3,"td"),E(4),ke()()),n&2){let e=t.$implicit;_(2),Fe(e[0]),_(2),Fe(e[1])}}function yV(n,t){if(n&1&&(Me(0,"table",4)(1,"thead")(2,"tr")(3,"th"),E(4,"Package"),ke(),Me(5,"th"),E(6,"Version"),ke()()(),Me(7,"tbody"),pi(8,gV,5,2,"tr",null,mV),ke()()),n&2){let e=R();_(8),mi(e.versions())}}function vV(n,t){n&1&&(Me(0,"p",5),E(1,"No version data available."),ke())}function bV(n,t){if(n&1&&(Me(0,"tr")(1,"td"),E(2),ke(),Me(3,"td"),E(4),ke(),Me(5,"td"),E(6),ke()()),n&2){let e=t.$implicit;_(2),Fe(e.key),_(2),Fe((e.behaviors==null?null:e.behaviors.length)??0),_(2),Fe((e.controllers==null?null:e.controllers.length)??0)}}function _V(n,t){if(n&1&&(Me(0,"table",6)(1,"thead")(2,"tr")(3,"th"),E(4,"Cell Key"),ke(),Me(5,"th"),E(6,"Behaviors"),ke(),Me(7,"th"),E(8,"Controllers"),ke()()(),Me(9,"tbody"),pi(10,bV,7,3,"tr",null,$y),ke()()),n&2){let e=R();_(10),mi(e.registry())}}function CV(n,t){n&1&&(Me(0,"p",5),E(1,"No registry data available."),ke())}var Nh=class n{insight=f(Ra);constructor(){this.insight.refreshLocalConfig()}versions=ve(()=>{let t=this.insight.vaultConfig();return t?.versions?Object.entries(t.versions).sort(([e],[i])=>e.localeCompare(i)):[]});registry=ve(()=>this.insight.vaultConfig()?.registry??[]);static \u0275fac=function(e){return new(e||n)};static \u0275cmp=J({type:n,selectors:[["sdux-devtools-configuration"]],decls:13,vars:2,consts:[[1,"configuration"],[1,"title"],[1,"section"],[1,"section-title"],[1,"versions-table"],[1,"empty"],[1,"registry-table"]],template:function(e,i){e&1&&(Me(0,"div",0)(1,"h2",1),E(2,"Vault Configuration"),ke(),Me(3,"section",2)(4,"h3",3),E(5,"Package Versions"),ke(),ee(6,yV,10,0,"table",4)(7,vV,2,0,"p",5),ke(),Me(8,"section",2)(9,"h3",3),E(10,"FeatureCell Registry"),ke(),ee(11,_V,12,0,"table",6)(12,CV,2,0,"p",5),ke()()),e&2&&(_(6),te(i.versions().length?6:7),_(5),te(i.registry().length?11:12))},styles:[".pointer[_ngcontent-%COMP%]{cursor:pointer}[_nghost-%COMP%]{display:flex;flex-direction:column;flex:1;min-height:0;overflow:auto}.configuration[_ngcontent-%COMP%]{padding:1rem}.configuration[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%]{color:#e2e8f0;font-weight:400;font-family:Inter,system-ui,sans-serif;font-size:1.125rem;margin:0 0 1rem}.configuration[_ngcontent-%COMP%]   .section[_ngcontent-%COMP%]{margin-bottom:1.5rem}.configuration[_ngcontent-%COMP%]   .section[_ngcontent-%COMP%]   .section-title[_ngcontent-%COMP%]{color:#e2e8f0;font-weight:400;font-family:Inter,system-ui,sans-serif;font-size:1rem;margin:0 0 .5rem}.configuration[_ngcontent-%COMP%]   .versions-table[_ngcontent-%COMP%], .configuration[_ngcontent-%COMP%]   .registry-table[_ngcontent-%COMP%]{width:100%;border-collapse:collapse}.configuration[_ngcontent-%COMP%]   .versions-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%], .configuration[_ngcontent-%COMP%]   .versions-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%], .configuration[_ngcontent-%COMP%]   .registry-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%], .configuration[_ngcontent-%COMP%]   .registry-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]{color:#94a3b8;font-weight:400;font-family:Inter,system-ui,sans-serif;font-size:.875rem;text-align:left;padding:.25rem .5rem;border-bottom:1px solid #63a4ff}.configuration[_ngcontent-%COMP%]   .versions-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%], .configuration[_ngcontent-%COMP%]   .registry-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]{color:#e2e8f0;font-weight:400;font-family:Inter,system-ui,sans-serif;font-weight:600}.configuration[_ngcontent-%COMP%]   .empty[_ngcontent-%COMP%]{color:#94a3b8;font-weight:400;font-family:Inter,system-ui,sans-serif;font-size:.875rem;font-style:italic}"],changeDetection:0})};function us(n){return n.buttons===0||n.detail===0}function fs(n){let t=n.touches&&n.touches[0]||n.changedTouches&&n.changedTouches[0];return!!t&&t.identifier===-1&&(t.radiusX==null||t.radiusX===1)&&(t.radiusY==null||t.radiusY===1)}var l_;function CI(){if(l_==null){let n=typeof document<"u"?document.head:null;l_=!!(n&&(n.createShadowRoot||n.attachShadow))}return l_}function c_(n){if(CI()){let t=n.getRootNode?n.getRootNode():null;if(typeof ShadowRoot<"u"&&ShadowRoot&&t instanceof ShadowRoot)return t}return null}function dn(n){return n.composedPath?n.composedPath()[0]:n.target}var d_;try{d_=typeof Intl<"u"&&Intl.v8BreakIterator}catch{d_=!1}var He=(()=>{class n{_platformId=f(Go);isBrowser=this._platformId?OS(this._platformId):typeof document=="object"&&!!document;EDGE=this.isBrowser&&/(edge)/i.test(navigator.userAgent);TRIDENT=this.isBrowser&&/(msie|trident)/i.test(navigator.userAgent);BLINK=this.isBrowser&&!!(window.chrome||d_)&&typeof CSS<"u"&&!this.EDGE&&!this.TRIDENT;WEBKIT=this.isBrowser&&/AppleWebKit/i.test(navigator.userAgent)&&!this.BLINK&&!this.EDGE&&!this.TRIDENT;IOS=this.isBrowser&&/iPad|iPhone|iPod/.test(navigator.userAgent)&&!("MSStream"in window);FIREFOX=this.isBrowser&&/(firefox|minefield)/i.test(navigator.userAgent);ANDROID=this.isBrowser&&/android/i.test(navigator.userAgent)&&!this.TRIDENT;SAFARI=this.isBrowser&&/safari/i.test(navigator.userAgent)&&this.WEBKIT;constructor(){}static \u0275fac=function(i){return new(i||n)};static \u0275prov=C({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})();var Vc;function DI(){if(Vc==null&&typeof window<"u")try{window.addEventListener("test",null,Object.defineProperty({},"passive",{get:()=>Vc=!0}))}finally{Vc=Vc||!1}return Vc}function Oa(n){return DI()?n:!!n.capture}function wi(n,t=0){return EI(n)?Number(n):arguments.length===2?t:0}function EI(n){return!isNaN(parseFloat(n))&&!isNaN(Number(n))}function ei(n){return n instanceof z?n.nativeElement:n}var wI=new b("cdk-input-modality-detector-options"),SI={ignoreKeys:[18,17,224,91,16]},TI=650,u_={passive:!0,capture:!0},II=(()=>{class n{_platform=f(He);_listenerCleanups;modalityDetected;modalityChanged;get mostRecentModality(){return this._modality.value}_mostRecentTarget=null;_modality=new rt(null);_options;_lastTouchMs=0;_onKeydown=e=>{this._options?.ignoreKeys?.some(i=>i===e.keyCode)||(this._modality.next("keyboard"),this._mostRecentTarget=dn(e))};_onMousedown=e=>{Date.now()-this._lastTouchMs<TI||(this._modality.next(us(e)?"keyboard":"mouse"),this._mostRecentTarget=dn(e))};_onTouchstart=e=>{if(fs(e)){this._modality.next("keyboard");return}this._lastTouchMs=Date.now(),this._modality.next("touch"),this._mostRecentTarget=dn(e)};constructor(){let e=f(L),i=f(le),r=f(wI,{optional:!0});if(this._options=g(g({},SI),r),this.modalityDetected=this._modality.pipe(xo(1)),this.modalityChanged=this.modalityDetected.pipe(Ls()),this._platform.isBrowser){let o=f(zt).createRenderer(null,null);this._listenerCleanups=e.runOutsideAngular(()=>[o.listen(i,"keydown",this._onKeydown,u_),o.listen(i,"mousedown",this._onMousedown,u_),o.listen(i,"touchstart",this._onTouchstart,u_)])}}ngOnDestroy(){this._modality.complete(),this._listenerCleanups?.forEach(e=>e())}static \u0275fac=function(i){return new(i||n)};static \u0275prov=C({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})(),Bc=(function(n){return n[n.IMMEDIATE=0]="IMMEDIATE",n[n.EVENTUAL=1]="EVENTUAL",n})(Bc||{}),xI=new b("cdk-focus-monitor-default-options"),Ph=Oa({passive:!0,capture:!0}),co=(()=>{class n{_ngZone=f(L);_platform=f(He);_inputModalityDetector=f(II);_origin=null;_lastFocusOrigin=null;_windowFocused=!1;_windowFocusTimeoutId;_originTimeoutId;_originFromTouchInteraction=!1;_elementInfo=new Map;_monitoredElementCount=0;_rootNodeFocusListenerCount=new Map;_detectionMode;_windowFocusListener=()=>{this._windowFocused=!0,this._windowFocusTimeoutId=setTimeout(()=>this._windowFocused=!1)};_document=f(le);_stopInputModalityDetector=new D;constructor(){let e=f(xI,{optional:!0});this._detectionMode=e?.detectionMode||Bc.IMMEDIATE}_rootNodeFocusAndBlurListener=e=>{let i=dn(e);for(let r=i;r;r=r.parentElement)e.type==="focus"?this._onFocus(e,r):this._onBlur(e,r)};monitor(e,i=!1){let r=ei(e);if(!this._platform.isBrowser||r.nodeType!==1)return M();let o=c_(r)||this._document,s=this._elementInfo.get(r);if(s)return i&&(s.checkChildren=!0),s.subject;let a={checkChildren:i,subject:new D,rootNode:o};return this._elementInfo.set(r,a),this._registerGlobalListeners(a),a.subject}stopMonitoring(e){let i=ei(e),r=this._elementInfo.get(i);r&&(r.subject.complete(),this._setClasses(i),this._elementInfo.delete(i),this._removeGlobalListeners(r))}focusVia(e,i,r){let o=ei(e),s=this._document.activeElement;o===s?this._getClosestElementsInfo(o).forEach(([a,l])=>this._originChanged(a,i,l)):(this._setOrigin(i),typeof o.focus=="function"&&o.focus(r))}ngOnDestroy(){this._elementInfo.forEach((e,i)=>this.stopMonitoring(i))}_getWindow(){return this._document.defaultView||window}_getFocusOrigin(e){return this._origin?this._originFromTouchInteraction?this._shouldBeAttributedToTouch(e)?"touch":"program":this._origin:this._windowFocused&&this._lastFocusOrigin?this._lastFocusOrigin:e&&this._isLastInteractionFromInputLabel(e)?"mouse":"program"}_shouldBeAttributedToTouch(e){return this._detectionMode===Bc.EVENTUAL||!!e?.contains(this._inputModalityDetector._mostRecentTarget)}_setClasses(e,i){e.classList.toggle("cdk-focused",!!i),e.classList.toggle("cdk-touch-focused",i==="touch"),e.classList.toggle("cdk-keyboard-focused",i==="keyboard"),e.classList.toggle("cdk-mouse-focused",i==="mouse"),e.classList.toggle("cdk-program-focused",i==="program")}_setOrigin(e,i=!1){this._ngZone.runOutsideAngular(()=>{if(this._origin=e,this._originFromTouchInteraction=e==="touch"&&i,this._detectionMode===Bc.IMMEDIATE){clearTimeout(this._originTimeoutId);let r=this._originFromTouchInteraction?TI:1;this._originTimeoutId=setTimeout(()=>this._origin=null,r)}})}_onFocus(e,i){let r=this._elementInfo.get(i),o=dn(e);!r||!r.checkChildren&&i!==o||this._originChanged(i,this._getFocusOrigin(o),r)}_onBlur(e,i){let r=this._elementInfo.get(i);!r||r.checkChildren&&e.relatedTarget instanceof Node&&i.contains(e.relatedTarget)||(this._setClasses(i),this._emitOrigin(r,null))}_emitOrigin(e,i){e.subject.observers.length&&this._ngZone.run(()=>e.subject.next(i))}_registerGlobalListeners(e){if(!this._platform.isBrowser)return;let i=e.rootNode,r=this._rootNodeFocusListenerCount.get(i)||0;r||this._ngZone.runOutsideAngular(()=>{i.addEventListener("focus",this._rootNodeFocusAndBlurListener,Ph),i.addEventListener("blur",this._rootNodeFocusAndBlurListener,Ph)}),this._rootNodeFocusListenerCount.set(i,r+1),++this._monitoredElementCount===1&&(this._ngZone.runOutsideAngular(()=>{this._getWindow().addEventListener("focus",this._windowFocusListener)}),this._inputModalityDetector.modalityDetected.pipe(K(this._stopInputModalityDetector)).subscribe(o=>{this._setOrigin(o,!0)}))}_removeGlobalListeners(e){let i=e.rootNode;if(this._rootNodeFocusListenerCount.has(i)){let r=this._rootNodeFocusListenerCount.get(i);r>1?this._rootNodeFocusListenerCount.set(i,r-1):(i.removeEventListener("focus",this._rootNodeFocusAndBlurListener,Ph),i.removeEventListener("blur",this._rootNodeFocusAndBlurListener,Ph),this._rootNodeFocusListenerCount.delete(i))}--this._monitoredElementCount||(this._getWindow().removeEventListener("focus",this._windowFocusListener),this._stopInputModalityDetector.next(),clearTimeout(this._windowFocusTimeoutId),clearTimeout(this._originTimeoutId))}_originChanged(e,i,r){this._setClasses(e,i),this._emitOrigin(r,i),this._lastFocusOrigin=i}_getClosestElementsInfo(e){let i=[];return this._elementInfo.forEach((r,o)=>{(o===e||r.checkChildren&&o.contains(e))&&i.push([o,r])}),i}_isLastInteractionFromInputLabel(e){let{_mostRecentTarget:i,mostRecentModality:r}=this._inputModalityDetector;if(r!=="mouse"||!i||i===e||e.nodeName!=="INPUT"&&e.nodeName!=="TEXTAREA"||e.disabled)return!1;let o=e.labels;if(o){for(let s=0;s<o.length;s++)if(o[s].contains(i))return!0}return!1}static \u0275fac=function(i){return new(i||n)};static \u0275prov=C({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})(),f_=(()=>{class n{_elementRef=f(z);_focusMonitor=f(co);_monitorSubscription;_focusOrigin=null;cdkFocusChange=new F;constructor(){}get focusOrigin(){return this._focusOrigin}ngAfterViewInit(){let e=this._elementRef.nativeElement;this._monitorSubscription=this._focusMonitor.monitor(e,e.nodeType===1&&e.hasAttribute("cdkMonitorSubtreeFocus")).subscribe(i=>{this._focusOrigin=i,this.cdkFocusChange.emit(i)})}ngOnDestroy(){this._focusMonitor.stopMonitoring(this._elementRef),this._monitorSubscription?.unsubscribe()}static \u0275fac=function(i){return new(i||n)};static \u0275dir=Y({type:n,selectors:[["","cdkMonitorElementFocus",""],["","cdkMonitorSubtreeFocus",""]],outputs:{cdkFocusChange:"cdkFocusChange"},exportAs:["cdkMonitorFocus"]})}return n})();var Fh=new WeakMap,Cn=(()=>{class n{_appRef;_injector=f(re);_environmentInjector=f($e);load(e){let i=this._appRef=this._appRef||this._injector.get(nn),r=Fh.get(i);r||(r={loaders:new Set,refs:[]},Fh.set(i,r),i.onDestroy(()=>{Fh.get(i)?.refs.forEach(o=>o.destroy()),Fh.delete(i)})),r.loaders.has(e)||(r.loaders.add(e),r.refs.push(wf(e,{environmentInjector:this._environmentInjector})))}static \u0275fac=function(i){return new(i||n)};static \u0275prov=C({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})();var jc=(()=>{class n{static \u0275fac=function(i){return new(i||n)};static \u0275cmp=J({type:n,selectors:[["ng-component"]],exportAs:["cdkVisuallyHidden"],decls:0,vars:0,template:function(i,r){},styles:[`.cdk-visually-hidden {
  border: 0;
  clip: rect(0 0 0 0);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  width: 1px;
  white-space: nowrap;
  outline: 0;
  -webkit-appearance: none;
  -moz-appearance: none;
  left: 0;
}
[dir=rtl] .cdk-visually-hidden {
  left: auto;
  right: 0;
}
`],encapsulation:2,changeDetection:0})}return n})(),Lh;function DV(){if(Lh===void 0&&(Lh=null,typeof window<"u")){let n=window;n.trustedTypes!==void 0&&(Lh=n.trustedTypes.createPolicy("angular#components",{createHTML:t=>t}))}return Lh}function EV(n){return DV()?.createHTML(n)||n}function MI(n,t,e){let i=e.sanitize(Tn.HTML,t);n.innerHTML=EV(i||"")}function Na(n){return Array.isArray(n)?n:[n]}var kI=new Set,hs,Pa=(()=>{class n{_platform=f(He);_nonce=f(ta,{optional:!0});_matchMedia;constructor(){this._matchMedia=this._platform.isBrowser&&window.matchMedia?window.matchMedia.bind(window):SV}matchMedia(e){return(this._platform.WEBKIT||this._platform.BLINK)&&wV(e,this._nonce),this._matchMedia(e)}static \u0275fac=function(i){return new(i||n)};static \u0275prov=C({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})();function wV(n,t){if(!kI.has(n))try{hs||(hs=document.createElement("style"),t&&hs.setAttribute("nonce",t),hs.setAttribute("type","text/css"),document.head.appendChild(hs)),hs.sheet&&(hs.sheet.insertRule(`@media ${n} {body{ }}`,0),kI.add(n))}catch(e){console.error(e)}}function SV(n){return{matches:n==="all"||n==="",media:n,addListener:()=>{},removeListener:()=>{}}}var h_=(()=>{class n{_mediaMatcher=f(Pa);_zone=f(L);_queries=new Map;_destroySubject=new D;constructor(){}ngOnDestroy(){this._destroySubject.next(),this._destroySubject.complete()}isMatched(e){return AI(Na(e)).some(r=>this._registerQuery(r).mql.matches)}observe(e){let r=AI(Na(e)).map(s=>this._registerQuery(s).observable),o=cl(r);return o=Lr(o.pipe(gt(1)),o.pipe(xo(1),Xi(0))),o.pipe(ue(s=>{let a={matches:!1,breakpoints:{}};return s.forEach(({matches:l,query:c})=>{a.matches=a.matches||l,a.breakpoints[c]=l}),a}))}_registerQuery(e){if(this._queries.has(e))return this._queries.get(e);let i=this._mediaMatcher.matchMedia(e),o={observable:new U(s=>{let a=l=>this._zone.run(()=>s.next(l));return i.addListener(a),()=>{i.removeListener(a)}}).pipe(dt(i),ue(({matches:s})=>({query:e,matches:s})),K(this._destroySubject)),mql:i};return this._queries.set(e,o),o}static \u0275fac=function(i){return new(i||n)};static \u0275prov=C({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})();function AI(n){return n.map(t=>t.split(",")).reduce((t,e)=>t.concat(e)).map(t=>t.trim())}function TV(n){if(n.type==="characterData"&&n.target instanceof Comment)return!0;if(n.type==="childList"){for(let t=0;t<n.addedNodes.length;t++)if(!(n.addedNodes[t]instanceof Comment))return!1;for(let t=0;t<n.removedNodes.length;t++)if(!(n.removedNodes[t]instanceof Comment))return!1;return!0}return!1}var RI=(()=>{class n{create(e){return typeof MutationObserver>"u"?null:new MutationObserver(e)}static \u0275fac=function(i){return new(i||n)};static \u0275prov=C({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})(),OI=(()=>{class n{_mutationObserverFactory=f(RI);_observedElements=new Map;_ngZone=f(L);constructor(){}ngOnDestroy(){this._observedElements.forEach((e,i)=>this._cleanupObserver(i))}observe(e){let i=ei(e);return new U(r=>{let s=this._observeElement(i).pipe(ue(a=>a.filter(l=>!TV(l))),_e(a=>!!a.length)).subscribe(a=>{this._ngZone.run(()=>{r.next(a)})});return()=>{s.unsubscribe(),this._unobserveElement(i)}})}_observeElement(e){return this._ngZone.runOutsideAngular(()=>{if(this._observedElements.has(e))this._observedElements.get(e).count++;else{let i=new D,r=this._mutationObserverFactory.create(o=>i.next(o));r&&r.observe(e,{characterData:!0,childList:!0,subtree:!0}),this._observedElements.set(e,{observer:r,stream:i,count:1})}return this._observedElements.get(e).stream})}_unobserveElement(e){this._observedElements.has(e)&&(this._observedElements.get(e).count--,this._observedElements.get(e).count||this._cleanupObserver(e))}_cleanupObserver(e){if(this._observedElements.has(e)){let{observer:i,stream:r}=this._observedElements.get(e);i&&i.disconnect(),r.complete(),this._observedElements.delete(e)}}static \u0275fac=function(i){return new(i||n)};static \u0275prov=C({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})(),NI=(()=>{class n{_contentObserver=f(OI);_elementRef=f(z);event=new F;get disabled(){return this._disabled}set disabled(e){this._disabled=e,this._disabled?this._unsubscribe():this._subscribe()}_disabled=!1;get debounce(){return this._debounce}set debounce(e){this._debounce=wi(e),this._subscribe()}_debounce;_currentSubscription=null;constructor(){}ngAfterContentInit(){!this._currentSubscription&&!this.disabled&&this._subscribe()}ngOnDestroy(){this._unsubscribe()}_subscribe(){this._unsubscribe();let e=this._contentObserver.observe(this._elementRef);this._currentSubscription=(this.debounce?e.pipe(Xi(this.debounce)):e).subscribe(this.event)}_unsubscribe(){this._currentSubscription?.unsubscribe()}static \u0275fac=function(i){return new(i||n)};static \u0275dir=Y({type:n,selectors:[["","cdkObserveContent",""]],inputs:{disabled:[2,"cdkObserveContentDisabled","disabled",oe],debounce:"debounce"},outputs:{event:"cdkObserveContent"},exportAs:["cdkObserveContent"]})}return n})(),Vh=(()=>{class n{static \u0275fac=function(i){return new(i||n)};static \u0275mod=Ce({type:n});static \u0275inj=be({providers:[RI]})}return n})();var LI=new b("liveAnnouncerElement",{providedIn:"root",factory:()=>null}),VI=new b("LIVE_ANNOUNCER_DEFAULT_OPTIONS"),IV=0,m_=(()=>{class n{_ngZone=f(L);_defaultOptions=f(VI,{optional:!0});_liveElement;_document=f(le);_sanitizer=f(Mv);_previousTimeout;_currentPromise;_currentResolve;constructor(){let e=f(LI,{optional:!0});this._liveElement=e||this._createLiveElement()}announce(e,...i){let r=this._defaultOptions,o,s;return i.length===1&&typeof i[0]=="number"?s=i[0]:[o,s]=i,this.clear(),clearTimeout(this._previousTimeout),o||(o=r&&r.politeness?r.politeness:"polite"),s==null&&r&&(s=r.duration),this._liveElement.setAttribute("aria-live",o),this._liveElement.id&&this._exposeAnnouncerToModals(this._liveElement.id),this._ngZone.runOutsideAngular(()=>(this._currentPromise||(this._currentPromise=new Promise(a=>this._currentResolve=a)),clearTimeout(this._previousTimeout),this._previousTimeout=setTimeout(()=>{!e||typeof e=="string"?this._liveElement.textContent=e:MI(this._liveElement,e,this._sanitizer),typeof s=="number"&&(this._previousTimeout=setTimeout(()=>this.clear(),s)),this._currentResolve?.(),this._currentPromise=this._currentResolve=void 0},100),this._currentPromise))}clear(){this._liveElement&&(this._liveElement.textContent="")}ngOnDestroy(){clearTimeout(this._previousTimeout),this._liveElement?.remove(),this._liveElement=null,this._currentResolve?.(),this._currentPromise=this._currentResolve=void 0}_createLiveElement(){let e="cdk-live-announcer-element",i=this._document.getElementsByClassName(e),r=this._document.createElement("div");for(let o=0;o<i.length;o++)i[o].remove();return r.classList.add(e),r.classList.add("cdk-visually-hidden"),r.setAttribute("aria-atomic","true"),r.setAttribute("aria-live","polite"),r.id=`cdk-live-announcer-${IV++}`,this._document.body.appendChild(r),r}_exposeAnnouncerToModals(e){let i=this._document.querySelectorAll('body > .cdk-overlay-container [aria-modal="true"]');for(let r=0;r<i.length;r++){let o=i[r],s=o.getAttribute("aria-owns");s?s.indexOf(e)===-1&&o.setAttribute("aria-owns",s+" "+e):o.setAttribute("aria-owns",e)}}static \u0275fac=function(i){return new(i||n)};static \u0275prov=C({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})();var uo=(function(n){return n[n.NONE=0]="NONE",n[n.BLACK_ON_WHITE=1]="BLACK_ON_WHITE",n[n.WHITE_ON_BLACK=2]="WHITE_ON_BLACK",n})(uo||{}),PI="cdk-high-contrast-black-on-white",FI="cdk-high-contrast-white-on-black",p_="cdk-high-contrast-active",BI=(()=>{class n{_platform=f(He);_hasCheckedHighContrastMode=!1;_document=f(le);_breakpointSubscription;constructor(){this._breakpointSubscription=f(h_).observe("(forced-colors: active)").subscribe(()=>{this._hasCheckedHighContrastMode&&(this._hasCheckedHighContrastMode=!1,this._applyBodyHighContrastModeCssClasses())})}getHighContrastMode(){if(!this._platform.isBrowser)return uo.NONE;let e=this._document.createElement("div");e.style.backgroundColor="rgb(1,2,3)",e.style.position="absolute",this._document.body.appendChild(e);let i=this._document.defaultView||window,r=i&&i.getComputedStyle?i.getComputedStyle(e):null,o=(r&&r.backgroundColor||"").replace(/ /g,"");switch(e.remove(),o){case"rgb(0,0,0)":case"rgb(45,50,54)":case"rgb(32,32,32)":return uo.WHITE_ON_BLACK;case"rgb(255,255,255)":case"rgb(255,250,239)":return uo.BLACK_ON_WHITE}return uo.NONE}ngOnDestroy(){this._breakpointSubscription.unsubscribe()}_applyBodyHighContrastModeCssClasses(){if(!this._hasCheckedHighContrastMode&&this._platform.isBrowser&&this._document.body){let e=this._document.body.classList;e.remove(p_,PI,FI),this._hasCheckedHighContrastMode=!0;let i=this.getHighContrastMode();i===uo.BLACK_ON_WHITE?e.add(p_,PI):i===uo.WHITE_ON_BLACK&&e.add(p_,FI)}}static \u0275fac=function(i){return new(i||n)};static \u0275prov=C({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})(),g_=(()=>{class n{constructor(){f(BI)._applyBodyHighContrastModeCssClasses()}static \u0275fac=function(i){return new(i||n)};static \u0275mod=Ce({type:n});static \u0275inj=be({imports:[Vh]})}return n})();var xV=200,Bh=class{_letterKeyStream=new D;_items=[];_selectedItemIndex=-1;_pressedLetters=[];_skipPredicateFn;_selectedItem=new D;selectedItem=this._selectedItem;constructor(t,e){let i=typeof e?.debounceInterval=="number"?e.debounceInterval:xV;e?.skipPredicate&&(this._skipPredicateFn=e.skipPredicate),this.setItems(t),this._setupKeyHandler(i)}destroy(){this._pressedLetters=[],this._letterKeyStream.complete(),this._selectedItem.complete()}setCurrentSelectedItemIndex(t){this._selectedItemIndex=t}setItems(t){this._items=t}handleKey(t){let e=t.keyCode;t.key&&t.key.length===1?this._letterKeyStream.next(t.key.toLocaleUpperCase()):(e>=65&&e<=90||e>=48&&e<=57)&&this._letterKeyStream.next(String.fromCharCode(e))}isTyping(){return this._pressedLetters.length>0}reset(){this._pressedLetters=[]}_setupKeyHandler(t){this._letterKeyStream.pipe(Dt(e=>this._pressedLetters.push(e)),Xi(t),_e(()=>this._pressedLetters.length>0),ue(()=>this._pressedLetters.join("").toLocaleUpperCase())).subscribe(e=>{for(let i=1;i<this._items.length+1;i++){let r=(this._selectedItemIndex+i)%this._items.length,o=this._items[r];if(!this._skipPredicateFn?.(o)&&o.getLabel?.().toLocaleUpperCase().trim().indexOf(e)===0){this._selectedItem.next(o);break}}this._pressedLetters=[]})}};function Yt(n,...t){return t.length?t.some(e=>n[e]):n.altKey||n.shiftKey||n.ctrlKey||n.metaKey}var Fa=class{_items;_activeItemIndex=O(-1);_activeItem=O(null);_wrap=!1;_typeaheadSubscription=H.EMPTY;_itemChangesSubscription;_vertical=!0;_horizontal=null;_allowedModifierKeys=[];_homeAndEnd=!1;_pageUpAndDown={enabled:!1,delta:10};_effectRef;_typeahead;_skipPredicateFn=t=>t.disabled;constructor(t,e){this._items=t,t instanceof ui?this._itemChangesSubscription=t.changes.subscribe(i=>this._itemsChanged(i.toArray())):qo(t)&&(this._effectRef=cr(()=>this._itemsChanged(t()),{injector:e}))}tabOut=new D;change=new D;skipPredicate(t){return this._skipPredicateFn=t,this}withWrap(t=!0){return this._wrap=t,this}withVerticalOrientation(t=!0){return this._vertical=t,this}withHorizontalOrientation(t){return this._horizontal=t,this}withAllowedModifierKeys(t){return this._allowedModifierKeys=t,this}withTypeAhead(t=200){this._typeaheadSubscription.unsubscribe();let e=this._getItemsArray();return this._typeahead=new Bh(e,{debounceInterval:typeof t=="number"?t:void 0,skipPredicate:i=>this._skipPredicateFn(i)}),this._typeaheadSubscription=this._typeahead.selectedItem.subscribe(i=>{this.setActiveItem(i)}),this}cancelTypeahead(){return this._typeahead?.reset(),this}withHomeAndEnd(t=!0){return this._homeAndEnd=t,this}withPageUpDown(t=!0,e=10){return this._pageUpAndDown={enabled:t,delta:e},this}setActiveItem(t){let e=this._activeItem();this.updateActiveItem(t),this._activeItem()!==e&&this.change.next(this._activeItemIndex())}onKeydown(t){let e=t.keyCode,r=["altKey","ctrlKey","metaKey","shiftKey"].every(o=>!t[o]||this._allowedModifierKeys.indexOf(o)>-1);switch(e){case 9:this.tabOut.next();return;case 40:if(this._vertical&&r){this.setNextItemActive();break}else return;case 38:if(this._vertical&&r){this.setPreviousItemActive();break}else return;case 39:if(this._horizontal&&r){this._horizontal==="rtl"?this.setPreviousItemActive():this.setNextItemActive();break}else return;case 37:if(this._horizontal&&r){this._horizontal==="rtl"?this.setNextItemActive():this.setPreviousItemActive();break}else return;case 36:if(this._homeAndEnd&&r){this.setFirstItemActive();break}else return;case 35:if(this._homeAndEnd&&r){this.setLastItemActive();break}else return;case 33:if(this._pageUpAndDown.enabled&&r){let o=this._activeItemIndex()-this._pageUpAndDown.delta;this._setActiveItemByIndex(o>0?o:0,1);break}else return;case 34:if(this._pageUpAndDown.enabled&&r){let o=this._activeItemIndex()+this._pageUpAndDown.delta,s=this._getItemsArray().length;this._setActiveItemByIndex(o<s?o:s-1,-1);break}else return;default:(r||Yt(t,"shiftKey"))&&this._typeahead?.handleKey(t);return}this._typeahead?.reset(),t.preventDefault()}get activeItemIndex(){return this._activeItemIndex()}get activeItem(){return this._activeItem()}isTyping(){return!!this._typeahead&&this._typeahead.isTyping()}setFirstItemActive(){this._setActiveItemByIndex(0,1)}setLastItemActive(){this._setActiveItemByIndex(this._getItemsArray().length-1,-1)}setNextItemActive(){this._activeItemIndex()<0?this.setFirstItemActive():this._setActiveItemByDelta(1)}setPreviousItemActive(){this._activeItemIndex()<0&&this._wrap?this.setLastItemActive():this._setActiveItemByDelta(-1)}updateActiveItem(t){let e=this._getItemsArray(),i=typeof t=="number"?t:e.indexOf(t),r=e[i];this._activeItem.set(r??null),this._activeItemIndex.set(i),this._typeahead?.setCurrentSelectedItemIndex(i)}destroy(){this._typeaheadSubscription.unsubscribe(),this._itemChangesSubscription?.unsubscribe(),this._effectRef?.destroy(),this._typeahead?.destroy(),this.tabOut.complete(),this.change.complete()}_setActiveItemByDelta(t){this._wrap?this._setActiveInWrapMode(t):this._setActiveInDefaultMode(t)}_setActiveInWrapMode(t){let e=this._getItemsArray();for(let i=1;i<=e.length;i++){let r=(this._activeItemIndex()+t*i+e.length)%e.length,o=e[r];if(!this._skipPredicateFn(o)){this.setActiveItem(r);return}}}_setActiveInDefaultMode(t){this._setActiveItemByIndex(this._activeItemIndex()+t,t)}_setActiveItemByIndex(t,e){let i=this._getItemsArray();if(i[t]){for(;this._skipPredicateFn(i[t]);)if(t+=e,!i[t])return;this.setActiveItem(t)}}_getItemsArray(){return qo(this._items)?this._items():this._items instanceof ui?this._items.toArray():this._items}_itemsChanged(t){this._typeahead?.setItems(t);let e=this._activeItem();if(e){let i=t.indexOf(e);i>-1&&i!==this._activeItemIndex()&&(this._activeItemIndex.set(i),this._typeahead?.setCurrentSelectedItemIndex(i))}}};var Wc=class extends Fa{setActiveItem(t){this.activeItem&&this.activeItem.setInactiveStyles(),super.setActiveItem(t),this.activeItem&&this.activeItem.setActiveStyles()}};var ps=class extends Fa{_origin="program";setFocusOrigin(t){return this._origin=t,this}setActiveItem(t){super.setActiveItem(t),this.activeItem&&this.activeItem.focus(this._origin)}};var y_={},Zt=class n{_appId=f(Zr);static _infix=`a${Math.floor(Math.random()*1e5).toString()}`;getId(t,e=!1){return this._appId!=="ng"&&(t+=this._appId),y_.hasOwnProperty(t)||(y_[t]=0),`${t}${e?n._infix+"-":""}${y_[t]++}`}static \u0275fac=function(e){return new(e||n)};static \u0275prov=C({token:n,factory:n.\u0275fac,providedIn:"root"})};var HI=" ";function __(n,t,e){let i=Uh(n,t);e=e.trim(),!i.some(r=>r.trim()===e)&&(i.push(e),n.setAttribute(t,i.join(HI)))}function Hh(n,t,e){let i=Uh(n,t);e=e.trim();let r=i.filter(o=>o!==e);r.length?n.setAttribute(t,r.join(HI)):n.removeAttribute(t)}function Uh(n,t){return n.getAttribute(t)?.match(/\S+/g)??[]}var $I="cdk-describedby-message",jh="cdk-describedby-host",b_=0,zI=(()=>{class n{_platform=f(He);_document=f(le);_messageRegistry=new Map;_messagesContainer=null;_id=`${b_++}`;constructor(){f(Cn).load(jc),this._id=f(Zr)+"-"+b_++}describe(e,i,r){if(!this._canBeDescribed(e,i))return;let o=v_(i,r);typeof i!="string"?(UI(i,this._id),this._messageRegistry.set(o,{messageElement:i,referenceCount:0})):this._messageRegistry.has(o)||this._createMessageElement(i,r),this._isElementDescribedByMessage(e,o)||this._addMessageReference(e,o)}removeDescription(e,i,r){if(!i||!this._isElementNode(e))return;let o=v_(i,r);if(this._isElementDescribedByMessage(e,o)&&this._removeMessageReference(e,o),typeof i=="string"){let s=this._messageRegistry.get(o);s&&s.referenceCount===0&&this._deleteMessageElement(o)}this._messagesContainer?.childNodes.length===0&&(this._messagesContainer.remove(),this._messagesContainer=null)}ngOnDestroy(){let e=this._document.querySelectorAll(`[${jh}="${this._id}"]`);for(let i=0;i<e.length;i++)this._removeCdkDescribedByReferenceIds(e[i]),e[i].removeAttribute(jh);this._messagesContainer?.remove(),this._messagesContainer=null,this._messageRegistry.clear()}_createMessageElement(e,i){let r=this._document.createElement("div");UI(r,this._id),r.textContent=e,i&&r.setAttribute("role",i),this._createMessagesContainer(),this._messagesContainer.appendChild(r),this._messageRegistry.set(v_(e,i),{messageElement:r,referenceCount:0})}_deleteMessageElement(e){this._messageRegistry.get(e)?.messageElement?.remove(),this._messageRegistry.delete(e)}_createMessagesContainer(){if(this._messagesContainer)return;let e="cdk-describedby-message-container",i=this._document.querySelectorAll(`.${e}[platform="server"]`);for(let o=0;o<i.length;o++)i[o].remove();let r=this._document.createElement("div");r.style.visibility="hidden",r.classList.add(e),r.classList.add("cdk-visually-hidden"),this._platform.isBrowser||r.setAttribute("platform","server"),this._document.body.appendChild(r),this._messagesContainer=r}_removeCdkDescribedByReferenceIds(e){let i=Uh(e,"aria-describedby").filter(r=>r.indexOf($I)!=0);e.setAttribute("aria-describedby",i.join(" "))}_addMessageReference(e,i){let r=this._messageRegistry.get(i);__(e,"aria-describedby",r.messageElement.id),e.setAttribute(jh,this._id),r.referenceCount++}_removeMessageReference(e,i){let r=this._messageRegistry.get(i);r.referenceCount--,Hh(e,"aria-describedby",r.messageElement.id),e.removeAttribute(jh)}_isElementDescribedByMessage(e,i){let r=Uh(e,"aria-describedby"),o=this._messageRegistry.get(i),s=o&&o.messageElement.id;return!!s&&r.indexOf(s)!=-1}_canBeDescribed(e,i){if(!this._isElementNode(e))return!1;if(i&&typeof i=="object")return!0;let r=i==null?"":`${i}`.trim(),o=e.getAttribute("aria-label");return r?!o||o.trim()!==r:!1}_isElementNode(e){return e.nodeType===this._document.ELEMENT_NODE}static \u0275fac=function(i){return new(i||n)};static \u0275prov=C({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})();function v_(n,t){return typeof n=="string"?`${t||""}/${n}`:n}function UI(n,t){n.id||(n.id=`${$I}-${t}-${b_++}`)}var MV=new b("cdk-dir-doc",{providedIn:"root",factory:()=>f(le)}),kV=/^(ar|ckb|dv|he|iw|fa|nqo|ps|sd|ug|ur|yi|.*[-_](Adlm|Arab|Hebr|Nkoo|Rohg|Thaa))(?!.*[-_](Latn|Cyrl)($|-|_))($|-|_)/i;function WI(n){let t=n?.toLowerCase()||"";return t==="auto"&&typeof navigator<"u"&&navigator?.language?kV.test(navigator.language)?"rtl":"ltr":t==="rtl"?"rtl":"ltr"}var Bt=(()=>{class n{get value(){return this.valueSignal()}valueSignal=O("ltr");change=new F;constructor(){let e=f(MV,{optional:!0});if(e){let i=e.body?e.body.dir:null,r=e.documentElement?e.documentElement.dir:null;this.valueSignal.set(WI(i||r||"ltr"))}}ngOnDestroy(){this.change.complete()}static \u0275fac=function(i){return new(i||n)};static \u0275prov=C({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})();var pt=(()=>{class n{static \u0275fac=function(i){return new(i||n)};static \u0275mod=Ce({type:n});static \u0275inj=be({})}return n})();var $h=class{};function GI(n){return n&&typeof n.connect=="function"&&!(n instanceof il)}var zh=class extends $h{_data;constructor(t){super(),this._data=t}connect(){return En(this._data)?this._data:M(this._data)}disconnect(){}},Gc=(function(n){return n[n.REPLACED=0]="REPLACED",n[n.INSERTED=1]="INSERTED",n[n.MOVED=2]="MOVED",n[n.REMOVED=3]="REMOVED",n})(Gc||{}),Wh=class{viewCacheSize=20;_viewCache=[];applyChanges(t,e,i,r,o){t.forEachOperation((s,a,l)=>{let c,d;if(s.previousIndex==null){let u=()=>i(s,a,l);c=this._insertView(u,l,e,r(s)),d=c?Gc.INSERTED:Gc.REPLACED}else l==null?(this._detachAndCacheView(a,e),d=Gc.REMOVED):(c=this._moveView(a,l,e,r(s)),d=Gc.MOVED);o&&o({context:c?.context,operation:d,record:s})})}detach(){for(let t of this._viewCache)t.destroy();this._viewCache=[]}_insertView(t,e,i,r){let o=this._insertViewFromCache(e,i);if(o){o.context.$implicit=r;return}let s=t();return i.createEmbeddedView(s.templateRef,s.context,s.index)}_detachAndCacheView(t,e){let i=e.detach(t);this._maybeCacheView(i,e)}_moveView(t,e,i,r){let o=i.get(t);return i.move(o,e),o.context.$implicit=r,o}_maybeCacheView(t,e){if(this._viewCache.length<this.viewCacheSize)this._viewCache.push(t);else{let i=e.indexOf(t);i===-1?t.destroy():e.remove(i)}}_insertViewFromCache(t,e){let i=this._viewCache.pop();return i&&e.insert(i,t),i||null}};var qc=class{_multiple;_emitChanges;compareWith;_selection=new Set;_deselectedToEmit=[];_selectedToEmit=[];_selected=null;get selected(){return this._selected||(this._selected=Array.from(this._selection.values())),this._selected}changed=new D;constructor(t=!1,e,i=!0,r){this._multiple=t,this._emitChanges=i,this.compareWith=r,e&&e.length&&(t?e.forEach(o=>this._markSelected(o)):this._markSelected(e[0]),this._selectedToEmit.length=0)}select(...t){this._verifyValueAssignment(t),t.forEach(i=>this._markSelected(i));let e=this._hasQueuedChanges();return this._emitChangeEvent(),e}deselect(...t){this._verifyValueAssignment(t),t.forEach(i=>this._unmarkSelected(i));let e=this._hasQueuedChanges();return this._emitChangeEvent(),e}setSelection(...t){this._verifyValueAssignment(t);let e=this.selected,i=new Set(t.map(o=>this._getConcreteValue(o)));t.forEach(o=>this._markSelected(o)),e.filter(o=>!i.has(this._getConcreteValue(o,i))).forEach(o=>this._unmarkSelected(o));let r=this._hasQueuedChanges();return this._emitChangeEvent(),r}toggle(t){return this.isSelected(t)?this.deselect(t):this.select(t)}clear(t=!0){this._unmarkAll();let e=this._hasQueuedChanges();return t&&this._emitChangeEvent(),e}isSelected(t){return this._selection.has(this._getConcreteValue(t))}isEmpty(){return this._selection.size===0}hasValue(){return!this.isEmpty()}sort(t){this._multiple&&this.selected&&this._selected.sort(t)}isMultipleSelection(){return this._multiple}_emitChangeEvent(){this._selected=null,(this._selectedToEmit.length||this._deselectedToEmit.length)&&(this.changed.next({source:this,added:this._selectedToEmit,removed:this._deselectedToEmit}),this._deselectedToEmit=[],this._selectedToEmit=[])}_markSelected(t){t=this._getConcreteValue(t),this.isSelected(t)||(this._multiple||this._unmarkAll(),this.isSelected(t)||this._selection.add(t),this._emitChanges&&this._selectedToEmit.push(t))}_unmarkSelected(t){t=this._getConcreteValue(t),this.isSelected(t)&&(this._selection.delete(t),this._emitChanges&&this._deselectedToEmit.push(t))}_unmarkAll(){this.isEmpty()||this._selection.forEach(t=>this._unmarkSelected(t))}_verifyValueAssignment(t){t.length>1&&this._multiple}_hasQueuedChanges(){return!!(this._deselectedToEmit.length||this._selectedToEmit.length)}_getConcreteValue(t,e){if(this.compareWith){e=e??this._selection;for(let i of e)if(this.compareWith(t,i))return i;return t}else return t}};function C_(){return typeof __karma__<"u"&&!!__karma__||typeof jasmine<"u"&&!!jasmine||typeof jest<"u"&&!!jest||typeof Mocha<"u"&&!!Mocha}function mt(n){return n==null?"":typeof n=="string"?n:`${n}px`}var Si=(function(n){return n[n.NORMAL=0]="NORMAL",n[n.NEGATED=1]="NEGATED",n[n.INVERTED=2]="INVERTED",n})(Si||{}),Gh,ms;function qh(){if(ms==null){if(typeof document!="object"||!document||typeof Element!="function"||!Element)return ms=!1,ms;if(document.documentElement?.style&&"scrollBehavior"in document.documentElement.style)ms=!0;else{let n=Element.prototype.scrollTo;n?ms=!/\{\s*\[native code\]\s*\}/.test(n.toString()):ms=!1}}return ms}function La(){if(typeof document!="object"||!document)return Si.NORMAL;if(Gh==null){let n=document.createElement("div"),t=n.style;n.dir="rtl",t.width="1px",t.overflow="auto",t.visibility="hidden",t.pointerEvents="none",t.position="absolute";let e=document.createElement("div"),i=e.style;i.width="2px",i.height="1px",n.appendChild(e),document.body.appendChild(n),Gh=Si.NORMAL,n.scrollLeft===0&&(n.scrollLeft=1,Gh=n.scrollLeft===0?Si.NEGATED:Si.INVERTED),n.remove()}return Gh}var AV=["contentWrapper"],RV=["*"],YI=new b("VIRTUAL_SCROLL_STRATEGY"),D_=class{_scrolledIndexChange=new D;scrolledIndexChange=this._scrolledIndexChange.pipe(Ls());_viewport=null;_itemSize;_minBufferPx;_maxBufferPx;constructor(t,e,i){this._itemSize=t,this._minBufferPx=e,this._maxBufferPx=i}attach(t){this._viewport=t,this._updateTotalContentSize(),this._updateRenderedRange()}detach(){this._scrolledIndexChange.complete(),this._viewport=null}updateItemAndBufferSize(t,e,i){i<e,this._itemSize=t,this._minBufferPx=e,this._maxBufferPx=i,this._updateTotalContentSize(),this._updateRenderedRange()}onContentScrolled(){this._updateRenderedRange()}onDataLengthChanged(){this._updateTotalContentSize(),this._updateRenderedRange()}onContentRendered(){}onRenderedOffsetChanged(){}scrollToIndex(t,e){this._viewport&&this._viewport.scrollToOffset(t*this._itemSize,e)}_updateTotalContentSize(){this._viewport&&this._viewport.setTotalContentSize(this._viewport.getDataLength()*this._itemSize)}_updateRenderedRange(){if(!this._viewport)return;let t=this._viewport.getRenderedRange(),e={start:t.start,end:t.end},i=this._viewport.getViewportSize(),r=this._viewport.getDataLength(),o=this._viewport.measureScrollOffset(),s=this._itemSize>0?o/this._itemSize:0;if(e.end>r){let l=Math.ceil(i/this._itemSize),c=Math.max(0,Math.min(s,r-l));s!=c&&(s=c,o=c*this._itemSize,e.start=Math.floor(s)),e.end=Math.max(0,Math.min(r,e.start+l))}let a=o-e.start*this._itemSize;if(a<this._minBufferPx&&e.start!=0){let l=Math.ceil((this._maxBufferPx-a)/this._itemSize);e.start=Math.max(0,e.start-l),e.end=Math.min(r,Math.ceil(s+(i+this._minBufferPx)/this._itemSize))}else{let l=e.end*this._itemSize-(o+i);if(l<this._minBufferPx&&e.end!=r){let c=Math.ceil((this._maxBufferPx-l)/this._itemSize);c>0&&(e.end=Math.min(r,e.end+c),e.start=Math.max(0,Math.floor(s-this._minBufferPx/this._itemSize)))}}this._viewport.setRenderedRange(e),this._viewport.setRenderedContentOffset(Math.round(this._itemSize*e.start)),this._scrolledIndexChange.next(Math.floor(s))}};function OV(n){return n._scrollStrategy}var E_=(()=>{class n{get itemSize(){return this._itemSize}set itemSize(e){this._itemSize=wi(e)}_itemSize=20;get minBufferPx(){return this._minBufferPx}set minBufferPx(e){this._minBufferPx=wi(e)}_minBufferPx=100;get maxBufferPx(){return this._maxBufferPx}set maxBufferPx(e){this._maxBufferPx=wi(e)}_maxBufferPx=200;_scrollStrategy=new D_(this.itemSize,this.minBufferPx,this.maxBufferPx);ngOnChanges(){this._scrollStrategy.updateItemAndBufferSize(this.itemSize,this.minBufferPx,this.maxBufferPx)}static \u0275fac=function(i){return new(i||n)};static \u0275dir=Y({type:n,selectors:[["cdk-virtual-scroll-viewport","itemSize",""]],inputs:{itemSize:"itemSize",minBufferPx:"minBufferPx",maxBufferPx:"maxBufferPx"},features:[bt([{provide:YI,useFactory:OV,deps:[nr(()=>n)]}]),It]})}return n})(),NV=20,fo=(()=>{class n{_ngZone=f(L);_platform=f(He);_renderer=f(zt).createRenderer(null,null);_cleanupGlobalListener;constructor(){}_scrolled=new D;_scrolledCount=0;scrollContainers=new Map;register(e){this.scrollContainers.has(e)||this.scrollContainers.set(e,e.elementScrolled().subscribe(()=>this._scrolled.next(e)))}deregister(e){let i=this.scrollContainers.get(e);i&&(i.unsubscribe(),this.scrollContainers.delete(e))}scrolled(e=NV){return this._platform.isBrowser?new U(i=>{this._cleanupGlobalListener||(this._cleanupGlobalListener=this._ngZone.runOutsideAngular(()=>this._renderer.listen("document","scroll",()=>this._scrolled.next())));let r=e>0?this._scrolled.pipe(ul(e)).subscribe(i):this._scrolled.subscribe(i);return this._scrolledCount++,()=>{r.unsubscribe(),this._scrolledCount--,this._scrolledCount||(this._cleanupGlobalListener?.(),this._cleanupGlobalListener=void 0)}}):M()}ngOnDestroy(){this._cleanupGlobalListener?.(),this._cleanupGlobalListener=void 0,this.scrollContainers.forEach((e,i)=>this.deregister(i)),this._scrolled.complete()}ancestorScrolled(e,i){let r=this.getAncestorScrollContainers(e);return this.scrolled(i).pipe(_e(o=>!o||r.indexOf(o)>-1))}getAncestorScrollContainers(e){let i=[];return this.scrollContainers.forEach((r,o)=>{this._scrollableContainsElement(o,e)&&i.push(o)}),i}_scrollableContainsElement(e,i){let r=ei(i),o=e.getElementRef().nativeElement;do if(r==o)return!0;while(r=r.parentElement);return!1}static \u0275fac=function(i){return new(i||n)};static \u0275prov=C({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})(),Kc=(()=>{class n{elementRef=f(z);scrollDispatcher=f(fo);ngZone=f(L);dir=f(Bt,{optional:!0});_scrollElement=this.elementRef.nativeElement;_destroyed=new D;_renderer=f(yt);_cleanupScroll;_elementScrolled=new D;constructor(){}ngOnInit(){this._cleanupScroll=this.ngZone.runOutsideAngular(()=>this._renderer.listen(this._scrollElement,"scroll",e=>this._elementScrolled.next(e))),this.scrollDispatcher.register(this)}ngOnDestroy(){this._cleanupScroll?.(),this._elementScrolled.complete(),this.scrollDispatcher.deregister(this),this._destroyed.next(),this._destroyed.complete()}elementScrolled(){return this._elementScrolled}getElementRef(){return this.elementRef}scrollTo(e){let i=this.elementRef.nativeElement,r=this.dir&&this.dir.value=="rtl";e.left==null&&(e.left=r?e.end:e.start),e.right==null&&(e.right=r?e.start:e.end),e.bottom!=null&&(e.top=i.scrollHeight-i.clientHeight-e.bottom),r&&La()!=Si.NORMAL?(e.left!=null&&(e.right=i.scrollWidth-i.clientWidth-e.left),La()==Si.INVERTED?e.left=e.right:La()==Si.NEGATED&&(e.left=e.right?-e.right:e.right)):e.right!=null&&(e.left=i.scrollWidth-i.clientWidth-e.right),this._applyScrollToOptions(e)}_applyScrollToOptions(e){let i=this.elementRef.nativeElement;qh()?i.scrollTo(e):(e.top!=null&&(i.scrollTop=e.top),e.left!=null&&(i.scrollLeft=e.left))}measureScrollOffset(e){let i="left",r="right",o=this.elementRef.nativeElement;if(e=="top")return o.scrollTop;if(e=="bottom")return o.scrollHeight-o.clientHeight-o.scrollTop;let s=this.dir&&this.dir.value=="rtl";return e=="start"?e=s?r:i:e=="end"&&(e=s?i:r),s&&La()==Si.INVERTED?e==i?o.scrollWidth-o.clientWidth-o.scrollLeft:o.scrollLeft:s&&La()==Si.NEGATED?e==i?o.scrollLeft+o.scrollWidth-o.clientWidth:-o.scrollLeft:e==i?o.scrollLeft:o.scrollWidth-o.clientWidth-o.scrollLeft}static \u0275fac=function(i){return new(i||n)};static \u0275dir=Y({type:n,selectors:[["","cdk-scrollable",""],["","cdkScrollable",""]]})}return n})(),PV=20,ti=(()=>{class n{_platform=f(He);_listeners;_viewportSize=null;_change=new D;_document=f(le);constructor(){let e=f(L),i=f(zt).createRenderer(null,null);e.runOutsideAngular(()=>{if(this._platform.isBrowser){let r=o=>this._change.next(o);this._listeners=[i.listen("window","resize",r),i.listen("window","orientationchange",r)]}this.change().subscribe(()=>this._viewportSize=null)})}ngOnDestroy(){this._listeners?.forEach(e=>e()),this._change.complete()}getViewportSize(){this._viewportSize||this._updateViewportSize();let e={width:this._viewportSize.width,height:this._viewportSize.height};return this._platform.isBrowser||(this._viewportSize=null),e}getViewportRect(){let e=this.getViewportScrollPosition(),{width:i,height:r}=this.getViewportSize();return{top:e.top,left:e.left,bottom:e.top+r,right:e.left+i,height:r,width:i}}getViewportScrollPosition(){if(!this._platform.isBrowser)return{top:0,left:0};let e=this._document,i=this._getWindow(),r=e.documentElement,o=r.getBoundingClientRect(),s=-o.top||e.body?.scrollTop||i.scrollY||r.scrollTop||0,a=-o.left||e.body?.scrollLeft||i.scrollX||r.scrollLeft||0;return{top:s,left:a}}change(e=PV){return e>0?this._change.pipe(ul(e)):this._change}_getWindow(){return this._document.defaultView||window}_updateViewportSize(){let e=this._getWindow();this._viewportSize=this._platform.isBrowser?{width:e.innerWidth,height:e.innerHeight}:{width:0,height:0}}static \u0275fac=function(i){return new(i||n)};static \u0275prov=C({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})(),qI=new b("VIRTUAL_SCROLLABLE"),FV=(()=>{class n extends Kc{constructor(){super()}measureViewportSize(e){let i=this.elementRef.nativeElement;return e==="horizontal"?i.clientWidth:i.clientHeight}static \u0275fac=function(i){return new(i||n)};static \u0275dir=Y({type:n,features:[St]})}return n})();function LV(n,t){return n.start==t.start&&n.end==t.end}var VV=typeof requestAnimationFrame<"u"?nm:tm,ZI=new b("CDK_VIRTUAL_SCROLL_VIEWPORT"),w_=(()=>{class n extends FV{elementRef=f(z);_changeDetectorRef=f(et);_scrollStrategy=f(YI,{optional:!0});scrollable=f(qI,{optional:!0});_platform=f(He);_detachedSubject=new D;_renderedRangeSubject=new D;_renderedContentOffsetSubject=new D;get orientation(){return this._orientation}set orientation(e){this._orientation!==e&&(this._orientation=e,this._calculateSpacerSize())}_orientation="vertical";appendOnly=!1;scrolledIndexChange=new U(e=>this._scrollStrategy.scrolledIndexChange.subscribe(i=>Promise.resolve().then(()=>this.ngZone.run(()=>e.next(i)))));_contentWrapper;renderedRangeStream=this._renderedRangeSubject;renderedContentOffset=this._renderedContentOffsetSubject.pipe(_e(e=>e!==null),Ls());_totalContentSize=0;_totalContentWidth=O("");_totalContentHeight=O("");_renderedContentTransform;_renderedRange={start:0,end:0};_dataLength=0;_viewportSize=0;_forOf=null;_renderedContentOffset=0;_renderedContentOffsetNeedsRewrite=!1;_changeDetectionNeeded=O(!1);_runAfterChangeDetection=[];_viewportChanges=H.EMPTY;_injector=f(re);_isDestroyed=!1;constructor(){super();let e=f(ti);this._scrollStrategy,this._viewportChanges=e.change().subscribe(()=>{this.checkViewportSize()}),this.scrollable||(this.elementRef.nativeElement.classList.add("cdk-virtual-scrollable"),this.scrollable=this);let i=cr(()=>{this._changeDetectionNeeded()&&this._doChangeDetection()},{injector:f(nn).injector});f(st).onDestroy(()=>{i.destroy()})}ngOnInit(){this._platform.isBrowser&&(this.scrollable===this&&super.ngOnInit(),this.ngZone.runOutsideAngular(()=>Promise.resolve().then(()=>{this._measureViewportSize(),this._scrollStrategy.attach(this),this.scrollable.elementScrolled().pipe(dt(null),ul(0,VV),K(this._destroyed)).subscribe(()=>this._scrollStrategy.onContentScrolled()),this._markChangeDetectionNeeded()})))}ngOnDestroy(){this.detach(),this._scrollStrategy.detach(),this._renderedRangeSubject.complete(),this._detachedSubject.complete(),this._viewportChanges.unsubscribe(),this._isDestroyed=!0,super.ngOnDestroy()}attach(e){this._forOf,this.ngZone.runOutsideAngular(()=>{this._forOf=e,this._forOf.dataStream.pipe(K(this._detachedSubject)).subscribe(i=>{let r=i.length;r!==this._dataLength&&(this._dataLength=r,this._scrollStrategy.onDataLengthChanged()),this._doChangeDetection()})})}detach(){this._forOf=null,this._detachedSubject.next()}getDataLength(){return this._dataLength}getViewportSize(){return this._viewportSize}getRenderedRange(){return this._renderedRange}measureBoundingClientRectWithScrollOffset(e){return this.getElementRef().nativeElement.getBoundingClientRect()[e]}setTotalContentSize(e){this._totalContentSize!==e&&(this._totalContentSize=e,this._calculateSpacerSize(),this._markChangeDetectionNeeded())}setRenderedRange(e){LV(this._renderedRange,e)||(this.appendOnly&&(e={start:0,end:Math.max(this._renderedRange.end,e.end)}),this._renderedRangeSubject.next(this._renderedRange=e),this._markChangeDetectionNeeded(()=>this._scrollStrategy.onContentRendered()))}getOffsetToRenderedContentStart(){return this._renderedContentOffsetNeedsRewrite?null:this._renderedContentOffset}setRenderedContentOffset(e,i="to-start"){e=this.appendOnly&&i==="to-start"?0:e;let r=this.dir&&this.dir.value=="rtl",o=this.orientation=="horizontal",s=o?"X":"Y",l=`translate${s}(${Number((o&&r?-1:1)*e)}px)`;this._renderedContentOffset=e,i==="to-end"&&(l+=` translate${s}(-100%)`,this._renderedContentOffsetNeedsRewrite=!0),this._renderedContentTransform!=l&&(this._renderedContentTransform=l,this._markChangeDetectionNeeded(()=>{this._renderedContentOffsetNeedsRewrite?(this._renderedContentOffset-=this.measureRenderedContentSize(),this._renderedContentOffsetNeedsRewrite=!1,this.setRenderedContentOffset(this._renderedContentOffset)):this._scrollStrategy.onRenderedOffsetChanged()}))}scrollToOffset(e,i="auto"){let r={behavior:i};this.orientation==="horizontal"?r.start=e:r.top=e,this.scrollable.scrollTo(r)}scrollToIndex(e,i="auto"){this._scrollStrategy.scrollToIndex(e,i)}measureScrollOffset(e){let i;return this.scrollable==this?i=r=>super.measureScrollOffset(r):i=r=>this.scrollable.measureScrollOffset(r),Math.max(0,i(e??(this.orientation==="horizontal"?"start":"top"))-this.measureViewportOffset())}measureViewportOffset(e){let i,r="left",o="right",s=this.dir?.value=="rtl";e=="start"?i=s?o:r:e=="end"?i=s?r:o:e?i=e:i=this.orientation==="horizontal"?"left":"top";let a=this.scrollable.measureBoundingClientRectWithScrollOffset(i);return this.elementRef.nativeElement.getBoundingClientRect()[i]-a}measureRenderedContentSize(){let e=this._contentWrapper.nativeElement;return this.orientation==="horizontal"?e.offsetWidth:e.offsetHeight}measureRangeSize(e){return this._forOf?this._forOf.measureRangeSize(e,this.orientation):0}checkViewportSize(){this._measureViewportSize(),this._scrollStrategy.onDataLengthChanged()}_measureViewportSize(){this._viewportSize=this.scrollable.measureViewportSize(this.orientation)}_markChangeDetectionNeeded(e){e&&this._runAfterChangeDetection.push(e),!Ae(this._changeDetectionNeeded)&&this.ngZone.runOutsideAngular(()=>{Promise.resolve().then(()=>{this.ngZone.run(()=>{this._changeDetectionNeeded.set(!0)})})})}_doChangeDetection(){this._isDestroyed||this.ngZone.run(()=>{this._changeDetectorRef.markForCheck(),this._contentWrapper.nativeElement.style.transform=this._renderedContentTransform,this._renderedContentOffsetSubject.next(this.getOffsetToRenderedContentStart()),wt(()=>{this._changeDetectionNeeded.set(!1);let e=this._runAfterChangeDetection;this._runAfterChangeDetection=[];for(let i of e)i()},{injector:this._injector})})}_calculateSpacerSize(){this._totalContentHeight.set(this.orientation==="horizontal"?"":`${this._totalContentSize}px`),this._totalContentWidth.set(this.orientation==="horizontal"?`${this._totalContentSize}px`:"")}static \u0275fac=function(i){return new(i||n)};static \u0275cmp=J({type:n,selectors:[["cdk-virtual-scroll-viewport"]],viewQuery:function(i,r){if(i&1&&vt(AV,7),i&2){let o;W(o=G())&&(r._contentWrapper=o.first)}},hostAttrs:[1,"cdk-virtual-scroll-viewport"],hostVars:4,hostBindings:function(i,r){i&2&&ye("cdk-virtual-scroll-orientation-horizontal",r.orientation==="horizontal")("cdk-virtual-scroll-orientation-vertical",r.orientation!=="horizontal")},inputs:{orientation:"orientation",appendOnly:[2,"appendOnly","appendOnly",oe]},outputs:{scrolledIndexChange:"scrolledIndexChange"},features:[bt([{provide:Kc,useFactory:()=>f(qI,{optional:!0})||f(n)},{provide:ZI,useExisting:n}]),St],ngContentSelectors:RV,decls:4,vars:4,consts:[["contentWrapper",""],[1,"cdk-virtual-scroll-content-wrapper"],[1,"cdk-virtual-scroll-spacer"]],template:function(i,r){i&1&&(Ft(),Me(0,"div",1,0),Ve(2),ke(),Ko(3,"div",2)),i&2&&(_(3),sa("width",r._totalContentWidth())("height",r._totalContentHeight()))},styles:[`cdk-virtual-scroll-viewport {
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
`],encapsulation:2,changeDetection:0})}return n})();function KI(n,t,e){let i=e;if(!i.getBoundingClientRect)return 0;let r=i.getBoundingClientRect();return n==="horizontal"?t==="start"?r.left:r.right:t==="start"?r.top:r.bottom}var S_=(()=>{class n{_viewContainerRef=f(ht);_template=f(Tt);_differs=f(Ef);_viewRepeater=new Wh;_viewport=f(ZI,{skipSelf:!0});viewChange=new D;_dataSourceChanges=new D;get cdkVirtualForOf(){return this._cdkVirtualForOf}set cdkVirtualForOf(e){this._cdkVirtualForOf=e,GI(e)?this._dataSourceChanges.next(e):this._dataSourceChanges.next(new zh(En(e)?e:Array.from(e||[])))}_cdkVirtualForOf;get cdkVirtualForTrackBy(){return this._cdkVirtualForTrackBy}set cdkVirtualForTrackBy(e){this._needsUpdate=!0,this._cdkVirtualForTrackBy=e?(i,r)=>e(i+(this._renderedRange?this._renderedRange.start:0),r):void 0}_cdkVirtualForTrackBy;set cdkVirtualForTemplate(e){e&&(this._needsUpdate=!0,this._template=e)}get cdkVirtualForTemplateCacheSize(){return this._viewRepeater.viewCacheSize}set cdkVirtualForTemplateCacheSize(e){this._viewRepeater.viewCacheSize=wi(e)}dataStream=this._dataSourceChanges.pipe(dt(null),fl(),ut(([e,i])=>this._changeDataSource(e,i)),hl(1));_differ=null;_data=[];_renderedItems=[];_renderedRange={start:0,end:0};_needsUpdate=!1;_destroyed=new D;constructor(){let e=f(L);this.dataStream.subscribe(i=>{this._data=i,this._onRenderedDataChange()}),this._viewport.renderedRangeStream.pipe(K(this._destroyed)).subscribe(i=>{this._renderedRange=i,this.viewChange.observers.length&&e.run(()=>this.viewChange.next(this._renderedRange)),this._onRenderedDataChange()}),this._viewport.attach(this)}measureRangeSize(e,i){if(e.start>=e.end)return 0;e.start<this._renderedRange.start||e.end>this._renderedRange.end;let r=e.start-this._renderedRange.start,o=e.end-e.start,s,a;for(let l=0;l<o;l++){let c=this._viewContainerRef.get(l+r);if(c&&c.rootNodes.length){s=a=c.rootNodes[0];break}}for(let l=o-1;l>-1;l--){let c=this._viewContainerRef.get(l+r);if(c&&c.rootNodes.length){a=c.rootNodes[c.rootNodes.length-1];break}}return s&&a?KI(i,"end",a)-KI(i,"start",s):0}ngDoCheck(){if(this._differ&&this._needsUpdate){let e=this._differ.diff(this._renderedItems);e?this._applyChanges(e):this._updateContext(),this._needsUpdate=!1}}ngOnDestroy(){this._viewport.detach(),this._dataSourceChanges.next(void 0),this._dataSourceChanges.complete(),this.viewChange.complete(),this._destroyed.next(),this._destroyed.complete(),this._viewRepeater.detach()}_onRenderedDataChange(){this._renderedRange&&(this._renderedItems=this._data.slice(this._renderedRange.start,this._renderedRange.end),this._differ||(this._differ=this._differs.find(this._renderedItems).create((e,i)=>this.cdkVirtualForTrackBy?this.cdkVirtualForTrackBy(e,i):i)),this._needsUpdate=!0)}_changeDataSource(e,i){return e&&e.disconnect(this),this._needsUpdate=!0,i?i.connect(this):M()}_updateContext(){let e=this._data.length,i=this._viewContainerRef.length;for(;i--;){let r=this._viewContainerRef.get(i);r.context.index=this._renderedRange.start+i,r.context.count=e,this._updateComputedContextProperties(r.context),r.detectChanges()}}_applyChanges(e){this._viewRepeater.applyChanges(e,this._viewContainerRef,(o,s,a)=>this._getEmbeddedViewArgs(o,a),o=>o.item),e.forEachIdentityChange(o=>{let s=this._viewContainerRef.get(o.currentIndex);s.context.$implicit=o.item});let i=this._data.length,r=this._viewContainerRef.length;for(;r--;){let o=this._viewContainerRef.get(r);o.context.index=this._renderedRange.start+r,o.context.count=i,this._updateComputedContextProperties(o.context)}}_updateComputedContextProperties(e){e.first=e.index===0,e.last=e.index===e.count-1,e.even=e.index%2===0,e.odd=!e.even}_getEmbeddedViewArgs(e,i){return{templateRef:this._template,context:{$implicit:e.item,cdkVirtualForOf:this._cdkVirtualForOf,index:-1,count:-1,first:!1,last:!1,odd:!1,even:!1},index:i}}static ngTemplateContextGuard(e,i){return!0}static \u0275fac=function(i){return new(i||n)};static \u0275dir=Y({type:n,selectors:[["","cdkVirtualFor","","cdkVirtualForOf",""]],inputs:{cdkVirtualForOf:"cdkVirtualForOf",cdkVirtualForTrackBy:"cdkVirtualForTrackBy",cdkVirtualForTemplate:"cdkVirtualForTemplate",cdkVirtualForTemplateCacheSize:"cdkVirtualForTemplateCacheSize"}})}return n})();var Ir=(()=>{class n{static \u0275fac=function(i){return new(i||n)};static \u0275mod=Ce({type:n});static \u0275inj=be({})}return n})(),Yc=(()=>{class n{static \u0275fac=function(i){return new(i||n)};static \u0275mod=Ce({type:n});static \u0275inj=be({imports:[pt,Ir,pt,Ir]})}return n})();var Zc=class{_attachedHost=null;attach(t){return this._attachedHost=t,t.attach(this)}detach(){let t=this._attachedHost;t!=null&&(this._attachedHost=null,t.detach())}get isAttached(){return this._attachedHost!=null}setAttachedHost(t){this._attachedHost=t}},Xc=class extends Zc{component;viewContainerRef;injector;projectableNodes;bindings;constructor(t,e,i,r,o){super(),this.component=t,this.viewContainerRef=e,this.injector=i,this.projectableNodes=r,this.bindings=o||null}},zi=class extends Zc{templateRef;viewContainerRef;context;injector;constructor(t,e,i,r){super(),this.templateRef=t,this.viewContainerRef=e,this.context=i,this.injector=r}get origin(){return this.templateRef.elementRef}attach(t,e=this.context){return this.context=e,super.attach(t)}detach(){return this.context=void 0,super.detach()}},T_=class extends Zc{element;constructor(t){super(),this.element=t instanceof z?t.nativeElement:t}},Kh=class{_attachedPortal=null;_disposeFn=null;_isDisposed=!1;hasAttached(){return!!this._attachedPortal}attach(t){if(t instanceof Xc)return this._attachedPortal=t,this.attachComponentPortal(t);if(t instanceof zi)return this._attachedPortal=t,this.attachTemplatePortal(t);if(this.attachDomPortal&&t instanceof T_)return this._attachedPortal=t,this.attachDomPortal(t)}attachDomPortal=null;detach(){this._attachedPortal&&(this._attachedPortal.setAttachedHost(null),this._attachedPortal=null),this._invokeDisposeFn()}dispose(){this.hasAttached()&&this.detach(),this._invokeDisposeFn(),this._isDisposed=!0}setDisposeFn(t){this._disposeFn=t}_invokeDisposeFn(){this._disposeFn&&(this._disposeFn(),this._disposeFn=null)}},Qc=class extends Kh{outletElement;_appRef;_defaultInjector;constructor(t,e,i){super(),this.outletElement=t,this._appRef=e,this._defaultInjector=i}attachComponentPortal(t){let e;if(t.viewContainerRef){let i=t.injector||t.viewContainerRef.injector,r=i.get(Fi,null,{optional:!0})||void 0;e=t.viewContainerRef.createComponent(t.component,{index:t.viewContainerRef.length,injector:i,ngModuleRef:r,projectableNodes:t.projectableNodes||void 0,bindings:t.bindings||void 0}),this.setDisposeFn(()=>e.destroy())}else{let i=this._appRef,r=t.injector||this._defaultInjector||re.NULL,o=r.get($e,i.injector);e=wf(t.component,{elementInjector:r,environmentInjector:o,projectableNodes:t.projectableNodes||void 0,bindings:t.bindings||void 0}),i.attachView(e.hostView),this.setDisposeFn(()=>{i.viewCount>0&&i.detachView(e.hostView),e.destroy()})}return this.outletElement.appendChild(this._getComponentRootNode(e)),this._attachedPortal=t,e}attachTemplatePortal(t){let e=t.viewContainerRef,i=e.createEmbeddedView(t.templateRef,t.context,{injector:t.injector});return i.rootNodes.forEach(r=>this.outletElement.appendChild(r)),i.detectChanges(),this.setDisposeFn(()=>{let r=e.indexOf(i);r!==-1&&e.remove(r)}),this._attachedPortal=t,i}attachDomPortal=t=>{let e=t.element;e.parentNode;let i=this.outletElement.ownerDocument.createComment("dom-portal");e.parentNode.insertBefore(i,e),this.outletElement.appendChild(e),this._attachedPortal=t,super.setDisposeFn(()=>{i.parentNode&&i.parentNode.replaceChild(e,i)})};dispose(){super.dispose(),this.outletElement.remove()}_getComponentRootNode(t){return t.hostView.rootNodes[0]}},XI=(()=>{class n extends zi{constructor(){let e=f(Tt),i=f(ht);super(e,i)}static \u0275fac=function(i){return new(i||n)};static \u0275dir=Y({type:n,selectors:[["","cdkPortal",""]],exportAs:["cdkPortal"],features:[St]})}return n})(),I_=(()=>{class n extends Kh{_moduleRef=f(Fi,{optional:!0});_document=f(le);_viewContainerRef=f(ht);_isInitialized=!1;_attachedRef=null;constructor(){super()}get portal(){return this._attachedPortal}set portal(e){this.hasAttached()&&!e&&!this._isInitialized||(this.hasAttached()&&super.detach(),e&&super.attach(e),this._attachedPortal=e||null)}attached=new F;get attachedRef(){return this._attachedRef}ngOnInit(){this._isInitialized=!0}ngOnDestroy(){super.dispose(),this._attachedRef=this._attachedPortal=null}attachComponentPortal(e){e.setAttachedHost(this);let i=e.viewContainerRef!=null?e.viewContainerRef:this._viewContainerRef,r=i.createComponent(e.component,{index:i.length,injector:e.injector||i.injector,projectableNodes:e.projectableNodes||void 0,ngModuleRef:this._moduleRef||void 0,bindings:e.bindings||void 0});return i!==this._viewContainerRef&&this._getRootNode().appendChild(r.hostView.rootNodes[0]),super.setDisposeFn(()=>r.destroy()),this._attachedPortal=e,this._attachedRef=r,this.attached.emit(r),r}attachTemplatePortal(e){e.setAttachedHost(this);let i=this._viewContainerRef.createEmbeddedView(e.templateRef,e.context,{injector:e.injector});return super.setDisposeFn(()=>this._viewContainerRef.clear()),this._attachedPortal=e,this._attachedRef=i,this.attached.emit(i),i}attachDomPortal=e=>{let i=e.element;i.parentNode;let r=this._document.createComment("dom-portal");e.setAttachedHost(this),i.parentNode.insertBefore(r,i),this._getRootNode().appendChild(i),this._attachedPortal=e,super.setDisposeFn(()=>{r.parentNode&&r.parentNode.replaceChild(i,r)})};_getRootNode(){let e=this._viewContainerRef.element.nativeElement;return e.nodeType===e.ELEMENT_NODE?e:e.parentNode}static \u0275fac=function(i){return new(i||n)};static \u0275dir=Y({type:n,selectors:[["","cdkPortalOutlet",""]],inputs:{portal:[0,"cdkPortalOutlet","portal"]},outputs:{attached:"attached"},exportAs:["cdkPortalOutlet"],features:[St]})}return n})(),QI=(()=>{class n{static \u0275fac=function(i){return new(i||n)};static \u0275mod=Ce({type:n});static \u0275inj=be({})}return n})();var JI=qh();function sx(n){return new Yh(n.get(ti),n.get(le))}var Yh=class{_viewportRuler;_previousHTMLStyles={top:"",left:""};_previousScrollPosition;_isEnabled=!1;_document;constructor(t,e){this._viewportRuler=t,this._document=e}attach(){}enable(){if(this._canBeEnabled()){let t=this._document.documentElement;this._previousScrollPosition=this._viewportRuler.getViewportScrollPosition(),this._previousHTMLStyles.left=t.style.left||"",this._previousHTMLStyles.top=t.style.top||"",t.style.left=mt(-this._previousScrollPosition.left),t.style.top=mt(-this._previousScrollPosition.top),t.classList.add("cdk-global-scrollblock"),this._isEnabled=!0}}disable(){if(this._isEnabled){let t=this._document.documentElement,e=this._document.body,i=t.style,r=e.style,o=i.scrollBehavior||"",s=r.scrollBehavior||"";this._isEnabled=!1,i.left=this._previousHTMLStyles.left,i.top=this._previousHTMLStyles.top,t.classList.remove("cdk-global-scrollblock"),JI&&(i.scrollBehavior=r.scrollBehavior="auto"),window.scroll(this._previousScrollPosition.left,this._previousScrollPosition.top),JI&&(i.scrollBehavior=o,r.scrollBehavior=s)}}_canBeEnabled(){if(this._document.documentElement.classList.contains("cdk-global-scrollblock")||this._isEnabled)return!1;let e=this._document.documentElement,i=this._viewportRuler.getViewportSize();return e.scrollHeight>i.height||e.scrollWidth>i.width}};function ax(n,t){return new Zh(n.get(fo),n.get(L),n.get(ti),t)}var Zh=class{_scrollDispatcher;_ngZone;_viewportRuler;_config;_scrollSubscription=null;_overlayRef;_initialScrollPosition;constructor(t,e,i,r){this._scrollDispatcher=t,this._ngZone=e,this._viewportRuler=i,this._config=r}attach(t){this._overlayRef,this._overlayRef=t}enable(){if(this._scrollSubscription)return;let t=this._scrollDispatcher.scrolled(0).pipe(_e(e=>!e||!this._overlayRef.overlayElement.contains(e.getElementRef().nativeElement)));this._config&&this._config.threshold&&this._config.threshold>1?(this._initialScrollPosition=this._viewportRuler.getViewportScrollPosition().top,this._scrollSubscription=t.subscribe(()=>{let e=this._viewportRuler.getViewportScrollPosition().top;Math.abs(e-this._initialScrollPosition)>this._config.threshold?this._detach():this._overlayRef.updatePosition()})):this._scrollSubscription=t.subscribe(this._detach)}disable(){this._scrollSubscription&&(this._scrollSubscription.unsubscribe(),this._scrollSubscription=null)}detach(){this.disable(),this._overlayRef=null}_detach=()=>{this.disable(),this._overlayRef.hasAttached()&&this._ngZone.run(()=>this._overlayRef.detach())}};var Jc=class{enable(){}disable(){}attach(){}};function x_(n,t){return t.some(e=>{let i=n.bottom<e.top,r=n.top>e.bottom,o=n.right<e.left,s=n.left>e.right;return i||r||o||s})}function ex(n,t){return t.some(e=>{let i=n.top<e.top,r=n.bottom>e.bottom,o=n.left<e.left,s=n.right>e.right;return i||r||o||s})}function xr(n,t){return new Xh(n.get(fo),n.get(ti),n.get(L),t)}var Xh=class{_scrollDispatcher;_viewportRuler;_ngZone;_config;_scrollSubscription=null;_overlayRef;constructor(t,e,i,r){this._scrollDispatcher=t,this._viewportRuler=e,this._ngZone=i,this._config=r}attach(t){this._overlayRef,this._overlayRef=t}enable(){if(!this._scrollSubscription){let t=this._config?this._config.scrollThrottle:0;this._scrollSubscription=this._scrollDispatcher.scrolled(t).subscribe(()=>{if(this._overlayRef.updatePosition(),this._config&&this._config.autoClose){let e=this._overlayRef.overlayElement.getBoundingClientRect(),{width:i,height:r}=this._viewportRuler.getViewportSize();x_(e,[{width:i,height:r,bottom:r,right:i,top:0,left:0}])&&(this.disable(),this._ngZone.run(()=>this._overlayRef.detach()))}})}}disable(){this._scrollSubscription&&(this._scrollSubscription.unsubscribe(),this._scrollSubscription=null)}detach(){this.disable(),this._overlayRef=null}},lx=(()=>{class n{_injector=f(re);constructor(){}noop=()=>new Jc;close=e=>ax(this._injector,e);block=()=>sx(this._injector);reposition=e=>xr(this._injector,e);static \u0275fac=function(i){return new(i||n)};static \u0275prov=C({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})(),ys=class{positionStrategy;scrollStrategy=new Jc;panelClass="";hasBackdrop=!1;backdropClass="cdk-overlay-dark-backdrop";disableAnimations;width;height;minWidth;minHeight;maxWidth;maxHeight;direction;disposeOnNavigation=!1;usePopover;eventPredicate;constructor(t){if(t){let e=Object.keys(t);for(let i of e)t[i]!==void 0&&(this[i]=t[i])}}};var Qh=class{connectionPair;scrollableViewProperties;constructor(t,e){this.connectionPair=t,this.scrollableViewProperties=e}};var cx=(()=>{class n{_attachedOverlays=[];_document=f(le);_isAttached=!1;constructor(){}ngOnDestroy(){this.detach()}add(e){this.remove(e),this._attachedOverlays.push(e)}remove(e){let i=this._attachedOverlays.indexOf(e);i>-1&&this._attachedOverlays.splice(i,1),this._attachedOverlays.length===0&&this.detach()}canReceiveEvent(e,i,r){return r.observers.length<1?!1:e.eventPredicate?e.eventPredicate(i):!0}static \u0275fac=function(i){return new(i||n)};static \u0275prov=C({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})(),dx=(()=>{class n extends cx{_ngZone=f(L);_renderer=f(zt).createRenderer(null,null);_cleanupKeydown;add(e){super.add(e),this._isAttached||(this._ngZone.runOutsideAngular(()=>{this._cleanupKeydown=this._renderer.listen("body","keydown",this._keydownListener)}),this._isAttached=!0)}detach(){this._isAttached&&(this._cleanupKeydown?.(),this._isAttached=!1)}_keydownListener=e=>{let i=this._attachedOverlays;for(let r=i.length-1;r>-1;r--){let o=i[r];if(this.canReceiveEvent(o,e,o._keydownEvents)){this._ngZone.run(()=>o._keydownEvents.next(e));break}}};static \u0275fac=(()=>{let e;return function(r){return(e||(e=hn(n)))(r||n)}})();static \u0275prov=C({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})(),ux=(()=>{class n extends cx{_platform=f(He);_ngZone=f(L);_renderer=f(zt).createRenderer(null,null);_cursorOriginalValue;_cursorStyleIsSet=!1;_pointerDownEventTarget=null;_cleanups;add(e){if(super.add(e),!this._isAttached){let i=this._document.body,r={capture:!0},o=this._renderer;this._cleanups=this._ngZone.runOutsideAngular(()=>[o.listen(i,"pointerdown",this._pointerDownListener,r),o.listen(i,"click",this._clickListener,r),o.listen(i,"auxclick",this._clickListener,r),o.listen(i,"contextmenu",this._clickListener,r)]),this._platform.IOS&&!this._cursorStyleIsSet&&(this._cursorOriginalValue=i.style.cursor,i.style.cursor="pointer",this._cursorStyleIsSet=!0),this._isAttached=!0}}detach(){this._isAttached&&(this._cleanups?.forEach(e=>e()),this._cleanups=void 0,this._platform.IOS&&this._cursorStyleIsSet&&(this._document.body.style.cursor=this._cursorOriginalValue,this._cursorStyleIsSet=!1),this._isAttached=!1)}_pointerDownListener=e=>{this._pointerDownEventTarget=dn(e)};_clickListener=e=>{let i=dn(e),r=e.type==="click"&&this._pointerDownEventTarget?this._pointerDownEventTarget:i;this._pointerDownEventTarget=null;let o=this._attachedOverlays.slice();for(let s=o.length-1;s>-1;s--){let a=o[s],l=a._outsidePointerEvents;if(!(!a.hasAttached()||!this.canReceiveEvent(a,e,l))){if(tx(a.overlayElement,i)||tx(a.overlayElement,r))break;this._ngZone?this._ngZone.run(()=>l.next(e)):l.next(e)}}};static \u0275fac=(()=>{let e;return function(r){return(e||(e=hn(n)))(r||n)}})();static \u0275prov=C({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})();function tx(n,t){let e=typeof ShadowRoot<"u"&&ShadowRoot,i=t;for(;i;){if(i===n)return!0;i=e&&i instanceof ShadowRoot?i.host:i.parentNode}return!1}var fx=(()=>{class n{static \u0275fac=function(i){return new(i||n)};static \u0275cmp=J({type:n,selectors:[["ng-component"]],hostAttrs:["cdk-overlay-style-loader",""],decls:0,vars:0,template:function(i,r){},styles:[`.cdk-overlay-container, .cdk-global-overlay-wrapper {
  pointer-events: none;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
}

.cdk-overlay-container {
  position: fixed;
}
@layer cdk-overlay {
  .cdk-overlay-container {
    z-index: 1000;
  }
}
.cdk-overlay-container:empty {
  display: none;
}

.cdk-global-overlay-wrapper {
  display: flex;
  position: absolute;
}
@layer cdk-overlay {
  .cdk-global-overlay-wrapper {
    z-index: 1000;
  }
}

.cdk-overlay-pane {
  position: absolute;
  pointer-events: auto;
  box-sizing: border-box;
  display: flex;
  max-width: 100%;
  max-height: 100%;
}
@layer cdk-overlay {
  .cdk-overlay-pane {
    z-index: 1000;
  }
}

.cdk-overlay-backdrop {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  pointer-events: auto;
  -webkit-tap-highlight-color: transparent;
  opacity: 0;
  touch-action: manipulation;
}
@layer cdk-overlay {
  .cdk-overlay-backdrop {
    z-index: 1000;
    transition: opacity 400ms cubic-bezier(0.25, 0.8, 0.25, 1);
  }
}
@media (prefers-reduced-motion) {
  .cdk-overlay-backdrop {
    transition-duration: 1ms;
  }
}

.cdk-overlay-backdrop-showing {
  opacity: 1;
}
@media (forced-colors: active) {
  .cdk-overlay-backdrop-showing {
    opacity: 0.6;
  }
}

@layer cdk-overlay {
  .cdk-overlay-dark-backdrop {
    background: rgba(0, 0, 0, 0.32);
  }
}

.cdk-overlay-transparent-backdrop {
  transition: visibility 1ms linear, opacity 1ms linear;
  visibility: hidden;
  opacity: 1;
}
.cdk-overlay-transparent-backdrop.cdk-overlay-backdrop-showing, .cdk-high-contrast-active .cdk-overlay-transparent-backdrop {
  opacity: 0;
  visibility: visible;
}

.cdk-overlay-backdrop-noop-animation {
  transition: none;
}

.cdk-overlay-connected-position-bounding-box {
  position: absolute;
  display: flex;
  flex-direction: column;
  min-width: 1px;
  min-height: 1px;
}
@layer cdk-overlay {
  .cdk-overlay-connected-position-bounding-box {
    z-index: 1000;
  }
}

.cdk-global-scrollblock {
  position: fixed;
  width: 100%;
  overflow-y: scroll;
}

.cdk-overlay-popover {
  background: none;
  border: none;
  padding: 0;
  outline: 0;
  overflow: visible;
  position: fixed;
  pointer-events: none;
  white-space: normal;
  color: inherit;
  text-decoration: none;
  width: 100%;
  height: 100%;
  inset: auto;
  top: 0;
  left: 0;
}
.cdk-overlay-popover::backdrop {
  display: none;
}
.cdk-overlay-popover .cdk-overlay-backdrop {
  position: fixed;
  z-index: auto;
}
`],encapsulation:2,changeDetection:0})}return n})(),hx=(()=>{class n{_platform=f(He);_containerElement;_document=f(le);_styleLoader=f(Cn);constructor(){}ngOnDestroy(){this._containerElement?.remove()}getContainerElement(){return this._loadStyles(),this._containerElement||this._createContainer(),this._containerElement}_createContainer(){let e="cdk-overlay-container";if(this._platform.isBrowser||C_()){let r=this._document.querySelectorAll(`.${e}[platform="server"], .${e}[platform="test"]`);for(let o=0;o<r.length;o++)r[o].remove()}let i=this._document.createElement("div");i.classList.add(e),C_()?i.setAttribute("platform","test"):this._platform.isBrowser||i.setAttribute("platform","server"),this._document.body.appendChild(i),this._containerElement=i}_loadStyles(){this._styleLoader.load(fx)}static \u0275fac=function(i){return new(i||n)};static \u0275prov=C({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})(),M_=class{_renderer;_ngZone;element;_cleanupClick;_cleanupTransitionEnd;_fallbackTimeout;constructor(t,e,i,r){this._renderer=e,this._ngZone=i,this.element=t.createElement("div"),this.element.classList.add("cdk-overlay-backdrop"),this._cleanupClick=e.listen(this.element,"click",r)}detach(){this._ngZone.runOutsideAngular(()=>{let t=this.element;clearTimeout(this._fallbackTimeout),this._cleanupTransitionEnd?.(),this._cleanupTransitionEnd=this._renderer.listen(t,"transitionend",this.dispose),this._fallbackTimeout=setTimeout(this.dispose,500),t.style.pointerEvents="none",t.classList.remove("cdk-overlay-backdrop-showing")})}dispose=()=>{clearTimeout(this._fallbackTimeout),this._cleanupClick?.(),this._cleanupTransitionEnd?.(),this._cleanupClick=this._cleanupTransitionEnd=this._fallbackTimeout=void 0,this.element.remove()}};function k_(n){return n&&n.nodeType===1}var Jh=class{_portalOutlet;_host;_pane;_config;_ngZone;_keyboardDispatcher;_document;_location;_outsideClickDispatcher;_animationsDisabled;_injector;_renderer;_backdropClick=new D;_attachments=new D;_detachments=new D;_positionStrategy;_scrollStrategy;_locationChanges=H.EMPTY;_backdropRef=null;_detachContentMutationObserver;_detachContentAfterRenderRef;_disposed=!1;_previousHostParent;_keydownEvents=new D;_outsidePointerEvents=new D;_afterNextRenderRef;constructor(t,e,i,r,o,s,a,l,c,d=!1,u,h){this._portalOutlet=t,this._host=e,this._pane=i,this._config=r,this._ngZone=o,this._keyboardDispatcher=s,this._document=a,this._location=l,this._outsideClickDispatcher=c,this._animationsDisabled=d,this._injector=u,this._renderer=h,r.scrollStrategy&&(this._scrollStrategy=r.scrollStrategy,this._scrollStrategy.attach(this)),this._positionStrategy=r.positionStrategy}get overlayElement(){return this._pane}get backdropElement(){return this._backdropRef?.element||null}get hostElement(){return this._host}get eventPredicate(){return this._config?.eventPredicate||null}attach(t){if(this._disposed)return null;this._attachHost();let e=this._portalOutlet.attach(t);return this._positionStrategy?.attach(this),this._updateStackingOrder(),this._updateElementSize(),this._updateElementDirection(),this._scrollStrategy&&this._scrollStrategy.enable(),this._afterNextRenderRef?.destroy(),this._afterNextRenderRef=wt(()=>{this.hasAttached()&&this.updatePosition()},{injector:this._injector}),this._togglePointerEvents(!0),this._config.hasBackdrop&&this._attachBackdrop(),this._config.panelClass&&this._toggleClasses(this._pane,this._config.panelClass,!0),this._attachments.next(),this._completeDetachContent(),this._keyboardDispatcher.add(this),this._config.disposeOnNavigation&&(this._locationChanges=this._location.subscribe(()=>this.dispose())),this._outsideClickDispatcher.add(this),typeof e?.onDestroy=="function"&&e.onDestroy(()=>{this.hasAttached()&&this._ngZone.runOutsideAngular(()=>Promise.resolve().then(()=>this.detach()))}),e}detach(){if(!this.hasAttached())return;this.detachBackdrop(),this._togglePointerEvents(!1),this._positionStrategy&&this._positionStrategy.detach&&this._positionStrategy.detach(),this._scrollStrategy&&this._scrollStrategy.disable();let t=this._portalOutlet.detach();return this._detachments.next(),this._completeDetachContent(),this._keyboardDispatcher.remove(this),this._detachContentWhenEmpty(),this._locationChanges.unsubscribe(),this._outsideClickDispatcher.remove(this),t}dispose(){if(this._disposed)return;let t=this.hasAttached();this._positionStrategy&&this._positionStrategy.dispose(),this._disposeScrollStrategy(),this._backdropRef?.dispose(),this._locationChanges.unsubscribe(),this._keyboardDispatcher.remove(this),this._portalOutlet.dispose(),this._attachments.complete(),this._backdropClick.complete(),this._keydownEvents.complete(),this._outsidePointerEvents.complete(),this._outsideClickDispatcher.remove(this),this._host?.remove(),this._afterNextRenderRef?.destroy(),this._previousHostParent=this._pane=this._host=this._backdropRef=null,t&&this._detachments.next(),this._detachments.complete(),this._completeDetachContent(),this._disposed=!0}hasAttached(){return this._portalOutlet.hasAttached()}backdropClick(){return this._backdropClick}attachments(){return this._attachments}detachments(){return this._detachments}keydownEvents(){return this._keydownEvents}outsidePointerEvents(){return this._outsidePointerEvents}getConfig(){return this._config}updatePosition(){this._positionStrategy&&this._positionStrategy.apply()}updatePositionStrategy(t){t!==this._positionStrategy&&(this._positionStrategy&&this._positionStrategy.dispose(),this._positionStrategy=t,this.hasAttached()&&(t.attach(this),this.updatePosition()))}updateSize(t){this._config=g(g({},this._config),t),this._updateElementSize()}setDirection(t){this._config=V(g({},this._config),{direction:t}),this._updateElementDirection()}addPanelClass(t){this._pane&&this._toggleClasses(this._pane,t,!0)}removePanelClass(t){this._pane&&this._toggleClasses(this._pane,t,!1)}getDirection(){let t=this._config.direction;return t?typeof t=="string"?t:t.value:"ltr"}updateScrollStrategy(t){t!==this._scrollStrategy&&(this._disposeScrollStrategy(),this._scrollStrategy=t,this.hasAttached()&&(t.attach(this),t.enable()))}_updateElementDirection(){this._host.setAttribute("dir",this.getDirection())}_updateElementSize(){if(!this._pane)return;let t=this._pane.style;t.width=mt(this._config.width),t.height=mt(this._config.height),t.minWidth=mt(this._config.minWidth),t.minHeight=mt(this._config.minHeight),t.maxWidth=mt(this._config.maxWidth),t.maxHeight=mt(this._config.maxHeight)}_togglePointerEvents(t){this._pane.style.pointerEvents=t?"":"none"}_attachHost(){if(!this._host.parentElement){let t=this._config.usePopover?this._positionStrategy?.getPopoverInsertionPoint?.():null;k_(t)?t.after(this._host):t?.type==="parent"?t.element.appendChild(this._host):this._previousHostParent?.appendChild(this._host)}if(this._config.usePopover)try{this._host.showPopover()}catch{}}_attachBackdrop(){let t="cdk-overlay-backdrop-showing";this._backdropRef?.dispose(),this._backdropRef=new M_(this._document,this._renderer,this._ngZone,e=>{this._backdropClick.next(e)}),this._animationsDisabled&&this._backdropRef.element.classList.add("cdk-overlay-backdrop-noop-animation"),this._config.backdropClass&&this._toggleClasses(this._backdropRef.element,this._config.backdropClass,!0),this._config.usePopover?this._host.prepend(this._backdropRef.element):this._host.parentElement.insertBefore(this._backdropRef.element,this._host),!this._animationsDisabled&&typeof requestAnimationFrame<"u"?this._ngZone.runOutsideAngular(()=>{requestAnimationFrame(()=>this._backdropRef?.element.classList.add(t))}):this._backdropRef.element.classList.add(t)}_updateStackingOrder(){!this._config.usePopover&&this._host.nextSibling&&this._host.parentNode.appendChild(this._host)}detachBackdrop(){this._animationsDisabled?(this._backdropRef?.dispose(),this._backdropRef=null):this._backdropRef?.detach()}_toggleClasses(t,e,i){let r=Na(e||[]).filter(o=>!!o);r.length&&(i?t.classList.add(...r):t.classList.remove(...r))}_detachContentWhenEmpty(){let t=!1;try{this._detachContentAfterRenderRef=wt(()=>{t=!0,this._detachContent()},{injector:this._injector})}catch(e){if(t)throw e;this._detachContent()}globalThis.MutationObserver&&this._pane&&(this._detachContentMutationObserver||=new globalThis.MutationObserver(()=>{this._detachContent()}),this._detachContentMutationObserver.observe(this._pane,{childList:!0}))}_detachContent(){(!this._pane||!this._host||this._pane.children.length===0)&&(this._pane&&this._config.panelClass&&this._toggleClasses(this._pane,this._config.panelClass,!1),this._host&&this._host.parentElement&&(this._previousHostParent=this._host.parentElement,this._host.remove()),this._completeDetachContent())}_completeDetachContent(){this._detachContentAfterRenderRef?.destroy(),this._detachContentAfterRenderRef=void 0,this._detachContentMutationObserver?.disconnect()}_disposeScrollStrategy(){let t=this._scrollStrategy;t?.disable(),t?.detach?.()}},nx="cdk-overlay-connected-position-bounding-box",jV=/([A-Za-z%]+)$/;function vs(n,t){return new ep(t,n.get(ti),n.get(le),n.get(He),n.get(hx))}var ep=class{_viewportRuler;_document;_platform;_overlayContainer;_overlayRef;_isInitialRender=!1;_lastBoundingBoxSize={width:0,height:0};_isPushed=!1;_canPush=!0;_growAfterOpen=!1;_hasFlexibleDimensions=!0;_positionLocked=!1;_originRect;_overlayRect;_viewportRect;_containerRect;_viewportMargin=0;_scrollables=[];_preferredPositions=[];_origin;_pane;_isDisposed=!1;_boundingBox=null;_lastPosition=null;_lastScrollVisibility=null;_positionChanges=new D;_resizeSubscription=H.EMPTY;_offsetX=0;_offsetY=0;_transformOriginSelector;_appliedPanelClasses=[];_previousPushAmount=null;_popoverLocation="global";positionChanges=this._positionChanges;get positions(){return this._preferredPositions}constructor(t,e,i,r,o){this._viewportRuler=e,this._document=i,this._platform=r,this._overlayContainer=o,this.setOrigin(t)}attach(t){this._overlayRef&&this._overlayRef,this._validatePositions(),t.hostElement.classList.add(nx),this._overlayRef=t,this._boundingBox=t.hostElement,this._pane=t.overlayElement,this._isDisposed=!1,this._isInitialRender=!0,this._lastPosition=null,this._resizeSubscription.unsubscribe(),this._resizeSubscription=this._viewportRuler.change().subscribe(()=>{this._isInitialRender=!0,this.apply()})}apply(){if(this._isDisposed||!this._platform.isBrowser)return;if(!this._isInitialRender&&this._positionLocked&&this._lastPosition){this.reapplyLastPosition();return}this._clearPanelClasses(),this._resetOverlayElementStyles(),this._resetBoundingBoxStyles(),this._viewportRect=this._getNarrowedViewportRect(),this._originRect=this._getOriginRect(),this._overlayRect=this._pane.getBoundingClientRect(),this._containerRect=this._getContainerRect();let t=this._originRect,e=this._overlayRect,i=this._viewportRect,r=this._containerRect,o=[],s;for(let a of this._preferredPositions){let l=this._getOriginPoint(t,r,a),c=this._getOverlayPoint(l,e,a),d=this._getOverlayFit(c,e,i,a);if(d.isCompletelyWithinViewport){this._isPushed=!1,this._applyPosition(a,l);return}if(this._canFitWithFlexibleDimensions(d,c,i)){o.push({position:a,origin:l,overlayRect:e,boundingBoxRect:this._calculateBoundingBoxRect(l,a)});continue}(!s||s.overlayFit.visibleArea<d.visibleArea)&&(s={overlayFit:d,overlayPoint:c,originPoint:l,position:a,overlayRect:e})}if(o.length){let a=null,l=-1;for(let c of o){let d=c.boundingBoxRect.width*c.boundingBoxRect.height*(c.position.weight||1);d>l&&(l=d,a=c)}this._isPushed=!1,this._applyPosition(a.position,a.origin);return}if(this._canPush){this._isPushed=!0,this._applyPosition(s.position,s.originPoint);return}this._applyPosition(s.position,s.originPoint)}detach(){this._clearPanelClasses(),this._lastPosition=null,this._previousPushAmount=null,this._resizeSubscription.unsubscribe()}dispose(){this._isDisposed||(this._boundingBox&&gs(this._boundingBox.style,{top:"",left:"",right:"",bottom:"",height:"",width:"",alignItems:"",justifyContent:""}),this._pane&&this._resetOverlayElementStyles(),this._overlayRef&&this._overlayRef.hostElement.classList.remove(nx),this.detach(),this._positionChanges.complete(),this._overlayRef=this._boundingBox=null,this._isDisposed=!0)}reapplyLastPosition(){if(this._isDisposed||!this._platform.isBrowser)return;let t=this._lastPosition;t?(this._originRect=this._getOriginRect(),this._overlayRect=this._pane.getBoundingClientRect(),this._viewportRect=this._getNarrowedViewportRect(),this._containerRect=this._getContainerRect(),this._applyPosition(t,this._getOriginPoint(this._originRect,this._containerRect,t))):this.apply()}withScrollableContainers(t){return this._scrollables=t,this}withPositions(t){return this._preferredPositions=t,t.indexOf(this._lastPosition)===-1&&(this._lastPosition=null),this._validatePositions(),this}withViewportMargin(t){return this._viewportMargin=t,this}withFlexibleDimensions(t=!0){return this._hasFlexibleDimensions=t,this}withGrowAfterOpen(t=!0){return this._growAfterOpen=t,this}withPush(t=!0){return this._canPush=t,this}withLockedPosition(t=!0){return this._positionLocked=t,this}setOrigin(t){return this._origin=t,this}withDefaultOffsetX(t){return this._offsetX=t,this}withDefaultOffsetY(t){return this._offsetY=t,this}withTransformOriginOn(t){return this._transformOriginSelector=t,this}withPopoverLocation(t){return this._popoverLocation=t,this}getPopoverInsertionPoint(){return this._popoverLocation==="global"?null:this._popoverLocation!=="inline"?this._popoverLocation:this._origin instanceof z?this._origin.nativeElement:k_(this._origin)?this._origin:null}_getOriginPoint(t,e,i){let r;if(i.originX=="center")r=t.left+t.width/2;else{let s=this._isRtl()?t.right:t.left,a=this._isRtl()?t.left:t.right;r=i.originX=="start"?s:a}e.left<0&&(r-=e.left);let o;return i.originY=="center"?o=t.top+t.height/2:o=i.originY=="top"?t.top:t.bottom,e.top<0&&(o-=e.top),{x:r,y:o}}_getOverlayPoint(t,e,i){let r;i.overlayX=="center"?r=-e.width/2:i.overlayX==="start"?r=this._isRtl()?-e.width:0:r=this._isRtl()?0:-e.width;let o;return i.overlayY=="center"?o=-e.height/2:o=i.overlayY=="top"?0:-e.height,{x:t.x+r,y:t.y+o}}_getOverlayFit(t,e,i,r){let o=rx(e),{x:s,y:a}=t,l=this._getOffset(r,"x"),c=this._getOffset(r,"y");l&&(s+=l),c&&(a+=c);let d=0-s,u=s+o.width-i.width,h=0-a,p=a+o.height-i.height,m=this._subtractOverflows(o.width,d,u),w=this._subtractOverflows(o.height,h,p),k=m*w;return{visibleArea:k,isCompletelyWithinViewport:o.width*o.height===k,fitsInViewportVertically:w===o.height,fitsInViewportHorizontally:m==o.width}}_canFitWithFlexibleDimensions(t,e,i){if(this._hasFlexibleDimensions){let r=i.bottom-e.y,o=i.right-e.x,s=ix(this._overlayRef.getConfig().minHeight),a=ix(this._overlayRef.getConfig().minWidth),l=t.fitsInViewportVertically||s!=null&&s<=r,c=t.fitsInViewportHorizontally||a!=null&&a<=o;return l&&c}return!1}_pushOverlayOnScreen(t,e,i){if(this._previousPushAmount&&this._positionLocked)return{x:t.x+this._previousPushAmount.x,y:t.y+this._previousPushAmount.y};let r=rx(e),o=this._viewportRect,s=Math.max(t.x+r.width-o.width,0),a=Math.max(t.y+r.height-o.height,0),l=Math.max(o.top-i.top-t.y,0),c=Math.max(o.left-i.left-t.x,0),d=0,u=0;return r.width<=o.width?d=c||-s:d=t.x<this._getViewportMarginStart()?o.left-i.left-t.x:0,r.height<=o.height?u=l||-a:u=t.y<this._getViewportMarginTop()?o.top-i.top-t.y:0,this._previousPushAmount={x:d,y:u},{x:t.x+d,y:t.y+u}}_applyPosition(t,e){if(this._setTransformOrigin(t),this._setOverlayElementStyles(e,t),this._setBoundingBoxStyles(e,t),t.panelClass&&this._addPanelClasses(t.panelClass),this._positionChanges.observers.length){let i=this._getScrollVisibility();if(t!==this._lastPosition||!this._lastScrollVisibility||!UV(this._lastScrollVisibility,i)){let r=new Qh(t,i);this._positionChanges.next(r)}this._lastScrollVisibility=i}this._lastPosition=t,this._isInitialRender=!1}_setTransformOrigin(t){if(!this._transformOriginSelector)return;let e=this._boundingBox.querySelectorAll(this._transformOriginSelector),i,r=t.overlayY;t.overlayX==="center"?i="center":this._isRtl()?i=t.overlayX==="start"?"right":"left":i=t.overlayX==="start"?"left":"right";for(let o=0;o<e.length;o++)e[o].style.transformOrigin=`${i} ${r}`}_calculateBoundingBoxRect(t,e){let i=this._viewportRect,r=this._isRtl(),o,s,a;if(e.overlayY==="top")s=t.y,o=i.height-s+this._getViewportMarginBottom();else if(e.overlayY==="bottom")a=i.height-t.y+this._getViewportMarginTop()+this._getViewportMarginBottom(),o=i.height-a+this._getViewportMarginTop();else{let p=Math.min(i.bottom-t.y+i.top,t.y),m=this._lastBoundingBoxSize.height;o=p*2,s=t.y-p,o>m&&!this._isInitialRender&&!this._growAfterOpen&&(s=t.y-m/2)}let l=e.overlayX==="start"&&!r||e.overlayX==="end"&&r,c=e.overlayX==="end"&&!r||e.overlayX==="start"&&r,d,u,h;if(c)h=i.width-t.x+this._getViewportMarginStart()+this._getViewportMarginEnd(),d=t.x-this._getViewportMarginStart();else if(l)u=t.x,d=i.right-t.x-this._getViewportMarginEnd();else{let p=Math.min(i.right-t.x+i.left,t.x),m=this._lastBoundingBoxSize.width;d=p*2,u=t.x-p,d>m&&!this._isInitialRender&&!this._growAfterOpen&&(u=t.x-m/2)}return{top:s,left:u,bottom:a,right:h,width:d,height:o}}_setBoundingBoxStyles(t,e){let i=this._calculateBoundingBoxRect(t,e);!this._isInitialRender&&!this._growAfterOpen&&(i.height=Math.min(i.height,this._lastBoundingBoxSize.height),i.width=Math.min(i.width,this._lastBoundingBoxSize.width));let r={};if(this._hasExactPosition())r.top=r.left="0",r.bottom=r.right="auto",r.maxHeight=r.maxWidth="",r.width=r.height="100%";else{let o=this._overlayRef.getConfig().maxHeight,s=this._overlayRef.getConfig().maxWidth;r.width=mt(i.width),r.height=mt(i.height),r.top=mt(i.top)||"auto",r.bottom=mt(i.bottom)||"auto",r.left=mt(i.left)||"auto",r.right=mt(i.right)||"auto",e.overlayX==="center"?r.alignItems="center":r.alignItems=e.overlayX==="end"?"flex-end":"flex-start",e.overlayY==="center"?r.justifyContent="center":r.justifyContent=e.overlayY==="bottom"?"flex-end":"flex-start",o&&(r.maxHeight=mt(o)),s&&(r.maxWidth=mt(s))}this._lastBoundingBoxSize=i,gs(this._boundingBox.style,r)}_resetBoundingBoxStyles(){gs(this._boundingBox.style,{top:"0",left:"0",right:"0",bottom:"0",height:"",width:"",alignItems:"",justifyContent:""})}_resetOverlayElementStyles(){gs(this._pane.style,{top:"",left:"",bottom:"",right:"",position:"",transform:""})}_setOverlayElementStyles(t,e){let i={},r=this._hasExactPosition(),o=this._hasFlexibleDimensions,s=this._overlayRef.getConfig();if(r){let d=this._viewportRuler.getViewportScrollPosition();gs(i,this._getExactOverlayY(e,t,d)),gs(i,this._getExactOverlayX(e,t,d))}else i.position="static";let a="",l=this._getOffset(e,"x"),c=this._getOffset(e,"y");l&&(a+=`translateX(${l}px) `),c&&(a+=`translateY(${c}px)`),i.transform=a.trim(),s.maxHeight&&(r?i.maxHeight=mt(s.maxHeight):o&&(i.maxHeight="")),s.maxWidth&&(r?i.maxWidth=mt(s.maxWidth):o&&(i.maxWidth="")),gs(this._pane.style,i)}_getExactOverlayY(t,e,i){let r={top:"",bottom:""},o=this._getOverlayPoint(e,this._overlayRect,t);if(this._isPushed&&(o=this._pushOverlayOnScreen(o,this._overlayRect,i)),t.overlayY==="bottom"){let s=this._document.documentElement.clientHeight;r.bottom=`${s-(o.y+this._overlayRect.height)}px`}else r.top=mt(o.y);return r}_getExactOverlayX(t,e,i){let r={left:"",right:""},o=this._getOverlayPoint(e,this._overlayRect,t);this._isPushed&&(o=this._pushOverlayOnScreen(o,this._overlayRect,i));let s;if(this._isRtl()?s=t.overlayX==="end"?"left":"right":s=t.overlayX==="end"?"right":"left",s==="right"){let a=this._document.documentElement.clientWidth;r.right=`${a-(o.x+this._overlayRect.width)}px`}else r.left=mt(o.x);return r}_getScrollVisibility(){let t=this._getOriginRect(),e=this._pane.getBoundingClientRect(),i=this._scrollables.map(r=>r.getElementRef().nativeElement.getBoundingClientRect());return{isOriginClipped:ex(t,i),isOriginOutsideView:x_(t,i),isOverlayClipped:ex(e,i),isOverlayOutsideView:x_(e,i)}}_subtractOverflows(t,...e){return e.reduce((i,r)=>i-Math.max(r,0),t)}_getNarrowedViewportRect(){let t=this._document.documentElement.clientWidth,e=this._document.documentElement.clientHeight,i=this._viewportRuler.getViewportScrollPosition();return{top:i.top+this._getViewportMarginTop(),left:i.left+this._getViewportMarginStart(),right:i.left+t-this._getViewportMarginEnd(),bottom:i.top+e-this._getViewportMarginBottom(),width:t-this._getViewportMarginStart()-this._getViewportMarginEnd(),height:e-this._getViewportMarginTop()-this._getViewportMarginBottom()}}_isRtl(){return this._overlayRef.getDirection()==="rtl"}_hasExactPosition(){return!this._hasFlexibleDimensions||this._isPushed}_getOffset(t,e){return e==="x"?t.offsetX==null?this._offsetX:t.offsetX:t.offsetY==null?this._offsetY:t.offsetY}_validatePositions(){}_addPanelClasses(t){this._pane&&Na(t).forEach(e=>{e!==""&&this._appliedPanelClasses.indexOf(e)===-1&&(this._appliedPanelClasses.push(e),this._pane.classList.add(e))})}_clearPanelClasses(){this._pane&&(this._appliedPanelClasses.forEach(t=>{this._pane.classList.remove(t)}),this._appliedPanelClasses=[])}_getViewportMarginStart(){return typeof this._viewportMargin=="number"?this._viewportMargin:this._viewportMargin?.start??0}_getViewportMarginEnd(){return typeof this._viewportMargin=="number"?this._viewportMargin:this._viewportMargin?.end??0}_getViewportMarginTop(){return typeof this._viewportMargin=="number"?this._viewportMargin:this._viewportMargin?.top??0}_getViewportMarginBottom(){return typeof this._viewportMargin=="number"?this._viewportMargin:this._viewportMargin?.bottom??0}_getOriginRect(){let t=this._origin;if(t instanceof z)return t.nativeElement.getBoundingClientRect();if(t instanceof Element)return t.getBoundingClientRect();let e=t.width||0,i=t.height||0;return{top:t.y,bottom:t.y+i,left:t.x,right:t.x+e,height:i,width:e}}_getContainerRect(){let t=this._overlayRef.getConfig().usePopover&&this._popoverLocation!=="global",e=this._overlayContainer.getContainerElement();t&&(e.style.display="block");let i=e.getBoundingClientRect();return t&&(e.style.display=""),i}};function gs(n,t){for(let e in t)t.hasOwnProperty(e)&&(n[e]=t[e]);return n}function ix(n){if(typeof n!="number"&&n!=null){let[t,e]=n.split(jV);return!e||e==="px"?parseFloat(t):null}return n||null}function rx(n){return{top:Math.floor(n.top),right:Math.floor(n.right),bottom:Math.floor(n.bottom),left:Math.floor(n.left),width:Math.floor(n.width),height:Math.floor(n.height)}}function UV(n,t){return n===t?!0:n.isOriginClipped===t.isOriginClipped&&n.isOriginOutsideView===t.isOriginOutsideView&&n.isOverlayClipped===t.isOverlayClipped&&n.isOverlayOutsideView===t.isOverlayOutsideView}var ox="cdk-global-overlay-wrapper";function px(n){return new tp}var tp=class{_overlayRef;_cssPosition="static";_topOffset="";_bottomOffset="";_alignItems="";_xPosition="";_xOffset="";_width="";_height="";_isDisposed=!1;attach(t){let e=t.getConfig();this._overlayRef=t,this._width&&!e.width&&t.updateSize({width:this._width}),this._height&&!e.height&&t.updateSize({height:this._height}),t.hostElement.classList.add(ox),this._isDisposed=!1}top(t=""){return this._bottomOffset="",this._topOffset=t,this._alignItems="flex-start",this}left(t=""){return this._xOffset=t,this._xPosition="left",this}bottom(t=""){return this._topOffset="",this._bottomOffset=t,this._alignItems="flex-end",this}right(t=""){return this._xOffset=t,this._xPosition="right",this}start(t=""){return this._xOffset=t,this._xPosition="start",this}end(t=""){return this._xOffset=t,this._xPosition="end",this}width(t=""){return this._overlayRef?this._overlayRef.updateSize({width:t}):this._width=t,this}height(t=""){return this._overlayRef?this._overlayRef.updateSize({height:t}):this._height=t,this}centerHorizontally(t=""){return this.left(t),this._xPosition="center",this}centerVertically(t=""){return this.top(t),this._alignItems="center",this}apply(){if(!this._overlayRef||!this._overlayRef.hasAttached())return;let t=this._overlayRef.overlayElement.style,e=this._overlayRef.hostElement.style,i=this._overlayRef.getConfig(),{width:r,height:o,maxWidth:s,maxHeight:a}=i,l=(r==="100%"||r==="100vw")&&(!s||s==="100%"||s==="100vw"),c=(o==="100%"||o==="100vh")&&(!a||a==="100%"||a==="100vh"),d=this._xPosition,u=this._xOffset,h=this._overlayRef.getConfig().direction==="rtl",p="",m="",w="";l?w="flex-start":d==="center"?(w="center",h?m=u:p=u):h?d==="left"||d==="end"?(w="flex-end",p=u):(d==="right"||d==="start")&&(w="flex-start",m=u):d==="left"||d==="start"?(w="flex-start",p=u):(d==="right"||d==="end")&&(w="flex-end",m=u),t.position=this._cssPosition,t.marginLeft=l?"0":p,t.marginTop=c?"0":this._topOffset,t.marginBottom=this._bottomOffset,t.marginRight=l?"0":m,e.justifyContent=w,e.alignItems=c?"flex-start":this._alignItems}dispose(){if(this._isDisposed||!this._overlayRef)return;let t=this._overlayRef.overlayElement.style,e=this._overlayRef.hostElement,i=e.style;e.classList.remove(ox),i.justifyContent=i.alignItems=t.marginTop=t.marginBottom=t.marginLeft=t.marginRight=t.position="",this._overlayRef=null,this._isDisposed=!0}},mx=(()=>{class n{_injector=f(re);constructor(){}global(){return px()}flexibleConnectedTo(e){return vs(this._injector,e)}static \u0275fac=function(i){return new(i||n)};static \u0275prov=C({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})(),ed=new b("OVERLAY_DEFAULT_CONFIG");function bs(n,t){n.get(Cn).load(fx);let e=n.get(hx),i=n.get(le),r=n.get(Zt),o=n.get(nn),s=n.get(Bt),a=n.get(yt,null,{optional:!0})||n.get(zt).createRenderer(null,null),l=new ys(t),c=n.get(ed,null,{optional:!0})?.usePopover??!0;l.direction=l.direction||s.value,"showPopover"in i.body?l.usePopover=t?.usePopover??c:l.usePopover=!1;let d=i.createElement("div"),u=i.createElement("div");d.id=r.getId("cdk-overlay-"),d.classList.add("cdk-overlay-pane"),u.appendChild(d),l.usePopover&&(u.setAttribute("popover","manual"),u.classList.add("cdk-overlay-popover"));let h=l.usePopover?l.positionStrategy?.getPopoverInsertionPoint?.():null;return k_(h)?h.after(u):h?.type==="parent"?h.element.appendChild(u):e.getContainerElement().appendChild(u),new Jh(new Qc(d,o,n),u,d,l,n.get(L),n.get(dx),i,n.get(yr),n.get(ux),t?.disableAnimations??n.get(Hl,null,{optional:!0})==="NoopAnimations",n.get($e),a)}var gx=(()=>{class n{scrollStrategies=f(lx);_positionBuilder=f(mx);_injector=f(re);constructor(){}create(e){return bs(this._injector,e)}position(){return this._positionBuilder}static \u0275fac=function(i){return new(i||n)};static \u0275prov=C({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})(),HV=[{originX:"start",originY:"bottom",overlayX:"start",overlayY:"top"},{originX:"start",originY:"top",overlayX:"start",overlayY:"bottom"},{originX:"end",originY:"top",overlayX:"end",overlayY:"bottom"},{originX:"end",originY:"bottom",overlayX:"end",overlayY:"top"}],$V=new b("cdk-connected-overlay-scroll-strategy",{providedIn:"root",factory:()=>{let n=f(re);return()=>xr(n)}}),Va=(()=>{class n{elementRef=f(z);constructor(){}static \u0275fac=function(i){return new(i||n)};static \u0275dir=Y({type:n,selectors:[["","cdk-overlay-origin",""],["","overlay-origin",""],["","cdkOverlayOrigin",""]],exportAs:["cdkOverlayOrigin"]})}return n})(),yx=new b("cdk-connected-overlay-default-config"),np=(()=>{class n{_dir=f(Bt,{optional:!0});_injector=f(re);_overlayRef;_templatePortal;_backdropSubscription=H.EMPTY;_attachSubscription=H.EMPTY;_detachSubscription=H.EMPTY;_positionSubscription=H.EMPTY;_offsetX;_offsetY;_position;_scrollStrategyFactory=f($V);_ngZone=f(L);origin;positions;positionStrategy;get offsetX(){return this._offsetX}set offsetX(e){this._offsetX=e,this._position&&this._updatePositionStrategy(this._position)}get offsetY(){return this._offsetY}set offsetY(e){this._offsetY=e,this._position&&this._updatePositionStrategy(this._position)}width;height;minWidth;minHeight;backdropClass;panelClass;viewportMargin=0;scrollStrategy;open=!1;disableClose=!1;transformOriginSelector;hasBackdrop=!1;lockPosition=!1;flexibleDimensions=!1;growAfterOpen=!1;push=!1;disposeOnNavigation=!1;usePopover;matchWidth=!1;set _config(e){typeof e!="string"&&this._assignConfig(e)}backdropClick=new F;positionChange=new F;attach=new F;detach=new F;overlayKeydown=new F;overlayOutsideClick=new F;constructor(){let e=f(Tt),i=f(ht),r=f(yx,{optional:!0}),o=f(ed,{optional:!0});this.usePopover=o?.usePopover===!1?null:"global",this._templatePortal=new zi(e,i),this.scrollStrategy=this._scrollStrategyFactory(),r&&this._assignConfig(r)}get overlayRef(){return this._overlayRef}get dir(){return this._dir?this._dir.value:"ltr"}ngOnDestroy(){this._attachSubscription.unsubscribe(),this._detachSubscription.unsubscribe(),this._backdropSubscription.unsubscribe(),this._positionSubscription.unsubscribe(),this._overlayRef?.dispose()}ngOnChanges(e){this._position&&(this._updatePositionStrategy(this._position),this._overlayRef?.updateSize({width:this._getWidth(),minWidth:this.minWidth,height:this.height,minHeight:this.minHeight}),e.origin&&this.open&&this._position.apply()),e.open&&(this.open?this.attachOverlay():this.detachOverlay())}_createOverlay(){(!this.positions||!this.positions.length)&&(this.positions=HV);let e=this._overlayRef=bs(this._injector,this._buildConfig());this._attachSubscription=e.attachments().subscribe(()=>this.attach.emit()),this._detachSubscription=e.detachments().subscribe(()=>this.detach.emit()),e.keydownEvents().subscribe(i=>{this.overlayKeydown.next(i),i.keyCode===27&&!this.disableClose&&!Yt(i)&&(i.preventDefault(),this.detachOverlay())}),this._overlayRef.outsidePointerEvents().subscribe(i=>{let r=this._getOriginElement(),o=dn(i);(!r||r!==o&&!r.contains(o))&&this.overlayOutsideClick.next(i)})}_buildConfig(){let e=this._position=this.positionStrategy||this._createPositionStrategy(),i=new ys({direction:this._dir||"ltr",positionStrategy:e,scrollStrategy:this.scrollStrategy,hasBackdrop:this.hasBackdrop,disposeOnNavigation:this.disposeOnNavigation,usePopover:!!this.usePopover});return(this.height||this.height===0)&&(i.height=this.height),(this.minWidth||this.minWidth===0)&&(i.minWidth=this.minWidth),(this.minHeight||this.minHeight===0)&&(i.minHeight=this.minHeight),this.backdropClass&&(i.backdropClass=this.backdropClass),this.panelClass&&(i.panelClass=this.panelClass),i}_updatePositionStrategy(e){let i=this.positions.map(r=>({originX:r.originX,originY:r.originY,overlayX:r.overlayX,overlayY:r.overlayY,offsetX:r.offsetX||this.offsetX,offsetY:r.offsetY||this.offsetY,panelClass:r.panelClass||void 0}));return e.setOrigin(this._getOrigin()).withPositions(i).withFlexibleDimensions(this.flexibleDimensions).withPush(this.push).withGrowAfterOpen(this.growAfterOpen).withViewportMargin(this.viewportMargin).withLockedPosition(this.lockPosition).withTransformOriginOn(this.transformOriginSelector).withPopoverLocation(this.usePopover===null?"global":this.usePopover)}_createPositionStrategy(){let e=vs(this._injector,this._getOrigin());return this._updatePositionStrategy(e),e}_getOrigin(){return this.origin instanceof Va?this.origin.elementRef:this.origin}_getOriginElement(){return this.origin instanceof Va?this.origin.elementRef.nativeElement:this.origin instanceof z?this.origin.nativeElement:typeof Element<"u"&&this.origin instanceof Element?this.origin:null}_getWidth(){return this.width?this.width:this.matchWidth?this._getOriginElement()?.getBoundingClientRect?.().width:void 0}attachOverlay(){this._overlayRef||this._createOverlay();let e=this._overlayRef;e.getConfig().hasBackdrop=this.hasBackdrop,e.updateSize({width:this._getWidth()}),e.hasAttached()||e.attach(this._templatePortal),this.hasBackdrop?this._backdropSubscription=e.backdropClick().subscribe(i=>this.backdropClick.emit(i)):this._backdropSubscription.unsubscribe(),this._positionSubscription.unsubscribe(),this.positionChange.observers.length>0&&(this._positionSubscription=this._position.positionChanges.pipe(am(()=>this.positionChange.observers.length>0)).subscribe(i=>{this._ngZone.run(()=>this.positionChange.emit(i)),this.positionChange.observers.length===0&&this._positionSubscription.unsubscribe()})),this.open=!0}detachOverlay(){this._overlayRef?.detach(),this._backdropSubscription.unsubscribe(),this._positionSubscription.unsubscribe(),this.open=!1}_assignConfig(e){this.origin=e.origin??this.origin,this.positions=e.positions??this.positions,this.positionStrategy=e.positionStrategy??this.positionStrategy,this.offsetX=e.offsetX??this.offsetX,this.offsetY=e.offsetY??this.offsetY,this.width=e.width??this.width,this.height=e.height??this.height,this.minWidth=e.minWidth??this.minWidth,this.minHeight=e.minHeight??this.minHeight,this.backdropClass=e.backdropClass??this.backdropClass,this.panelClass=e.panelClass??this.panelClass,this.viewportMargin=e.viewportMargin??this.viewportMargin,this.scrollStrategy=e.scrollStrategy??this.scrollStrategy,this.disableClose=e.disableClose??this.disableClose,this.transformOriginSelector=e.transformOriginSelector??this.transformOriginSelector,this.hasBackdrop=e.hasBackdrop??this.hasBackdrop,this.lockPosition=e.lockPosition??this.lockPosition,this.flexibleDimensions=e.flexibleDimensions??this.flexibleDimensions,this.growAfterOpen=e.growAfterOpen??this.growAfterOpen,this.push=e.push??this.push,this.disposeOnNavigation=e.disposeOnNavigation??this.disposeOnNavigation,this.usePopover=e.usePopover??this.usePopover,this.matchWidth=e.matchWidth??this.matchWidth}static \u0275fac=function(i){return new(i||n)};static \u0275dir=Y({type:n,selectors:[["","cdk-connected-overlay",""],["","connected-overlay",""],["","cdkConnectedOverlay",""]],inputs:{origin:[0,"cdkConnectedOverlayOrigin","origin"],positions:[0,"cdkConnectedOverlayPositions","positions"],positionStrategy:[0,"cdkConnectedOverlayPositionStrategy","positionStrategy"],offsetX:[0,"cdkConnectedOverlayOffsetX","offsetX"],offsetY:[0,"cdkConnectedOverlayOffsetY","offsetY"],width:[0,"cdkConnectedOverlayWidth","width"],height:[0,"cdkConnectedOverlayHeight","height"],minWidth:[0,"cdkConnectedOverlayMinWidth","minWidth"],minHeight:[0,"cdkConnectedOverlayMinHeight","minHeight"],backdropClass:[0,"cdkConnectedOverlayBackdropClass","backdropClass"],panelClass:[0,"cdkConnectedOverlayPanelClass","panelClass"],viewportMargin:[0,"cdkConnectedOverlayViewportMargin","viewportMargin"],scrollStrategy:[0,"cdkConnectedOverlayScrollStrategy","scrollStrategy"],open:[0,"cdkConnectedOverlayOpen","open"],disableClose:[0,"cdkConnectedOverlayDisableClose","disableClose"],transformOriginSelector:[0,"cdkConnectedOverlayTransformOriginOn","transformOriginSelector"],hasBackdrop:[2,"cdkConnectedOverlayHasBackdrop","hasBackdrop",oe],lockPosition:[2,"cdkConnectedOverlayLockPosition","lockPosition",oe],flexibleDimensions:[2,"cdkConnectedOverlayFlexibleDimensions","flexibleDimensions",oe],growAfterOpen:[2,"cdkConnectedOverlayGrowAfterOpen","growAfterOpen",oe],push:[2,"cdkConnectedOverlayPush","push",oe],disposeOnNavigation:[2,"cdkConnectedOverlayDisposeOnNavigation","disposeOnNavigation",oe],usePopover:[0,"cdkConnectedOverlayUsePopover","usePopover"],matchWidth:[2,"cdkConnectedOverlayMatchWidth","matchWidth",oe],_config:[0,"cdkConnectedOverlay","_config"]},outputs:{backdropClick:"backdropClick",positionChange:"positionChange",attach:"attach",detach:"detach",overlayKeydown:"overlayKeydown",overlayOutsideClick:"overlayOutsideClick"},exportAs:["cdkConnectedOverlay"],features:[It]})}return n})(),_s=(()=>{class n{static \u0275fac=function(i){return new(i||n)};static \u0275mod=Ce({type:n});static \u0275inj=be({providers:[gx],imports:[pt,QI,Yc,Yc]})}return n})();function O_(n){return n==null||N_(n)===0}function N_(n){return n==null?null:Array.isArray(n)||typeof n=="string"?n.length:n instanceof Set?n.size:null}var wx=new b(""),Sx=new b(""),zV=/^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,rp=class{static min(t){return WV(t)}static max(t){return GV(t)}static required(t){return qV(t)}static requiredTrue(t){return KV(t)}static email(t){return YV(t)}static minLength(t){return ZV(t)}static maxLength(t){return XV(t)}static pattern(t){return QV(t)}static nullValidator(t){return Tx()}static compose(t){return Rx(t)}static composeAsync(t){return Ox(t)}};function WV(n){return t=>{if(t.value==null||n==null)return null;let e=parseFloat(t.value);return!isNaN(e)&&e<n?{min:{min:n,actual:t.value}}:null}}function GV(n){return t=>{if(t.value==null||n==null)return null;let e=parseFloat(t.value);return!isNaN(e)&&e>n?{max:{max:n,actual:t.value}}:null}}function qV(n){return O_(n.value)?{required:!0}:null}function KV(n){return n.value===!0?null:{required:!0}}function YV(n){return O_(n.value)||zV.test(n.value)?null:{email:!0}}function ZV(n){return t=>{let e=t.value?.length??N_(t.value);return e===null||e===0?null:e<n?{minlength:{requiredLength:n,actualLength:e}}:null}}function XV(n){return t=>{let e=t.value?.length??N_(t.value);return e!==null&&e>n?{maxlength:{requiredLength:n,actualLength:e}}:null}}function QV(n){if(!n)return Tx;let t,e;return typeof n=="string"?(e="",n.charAt(0)!=="^"&&(e+="^"),e+=n,n.charAt(n.length-1)!=="$"&&(e+="$"),t=new RegExp(e)):(e=n.toString(),t=n),i=>{if(O_(i.value))return null;let r=i.value;return t.test(r)?null:{pattern:{requiredPattern:e,actualValue:r}}}}function Tx(n){return null}function Ix(n){return n!=null}function xx(n){return Xr(n)?Ze(n):n}function Mx(n){let t={};return n.forEach(e=>{t=e!=null?g(g({},t),e):t}),Object.keys(t).length===0?null:t}function kx(n,t){return t.map(e=>e(n))}function JV(n){return!n.validate}function Ax(n){return n.map(t=>JV(t)?t:e=>t.validate(e))}function Rx(n){if(!n)return null;let t=n.filter(Ix);return t.length==0?null:function(e){return Mx(kx(e,t))}}function P_(n){return n!=null?Rx(Ax(n)):null}function Ox(n){if(!n)return null;let t=n.filter(Ix);return t.length==0?null:function(e){let i=kx(e,t).map(xx);return Fs(i).pipe(ue(Mx))}}function F_(n){return n!=null?Ox(Ax(n)):null}function vx(n,t){return n===null?[t]:Array.isArray(n)?[...n,t]:[n,t]}function Nx(n){return n._rawValidators}function Px(n){return n._rawAsyncValidators}function A_(n){return n?Array.isArray(n)?n:[n]:[]}function op(n,t){return Array.isArray(n)?n.includes(t):n===t}function bx(n,t){let e=A_(t);return A_(n).forEach(r=>{op(e,r)||e.push(r)}),e}function _x(n,t){return A_(t).filter(e=>!op(n,e))}var sp=class{get value(){return this.control?this.control.value:null}get valid(){return this.control?this.control.valid:null}get invalid(){return this.control?this.control.invalid:null}get pending(){return this.control?this.control.pending:null}get disabled(){return this.control?this.control.disabled:null}get enabled(){return this.control?this.control.enabled:null}get errors(){return this.control?this.control.errors:null}get pristine(){return this.control?this.control.pristine:null}get dirty(){return this.control?this.control.dirty:null}get touched(){return this.control?this.control.touched:null}get status(){return this.control?this.control.status:null}get untouched(){return this.control?this.control.untouched:null}get statusChanges(){return this.control?this.control.statusChanges:null}get valueChanges(){return this.control?this.control.valueChanges:null}get path(){return null}_composedValidatorFn;_composedAsyncValidatorFn;_rawValidators=[];_rawAsyncValidators=[];_setValidators(t){this._rawValidators=t||[],this._composedValidatorFn=P_(this._rawValidators)}_setAsyncValidators(t){this._rawAsyncValidators=t||[],this._composedAsyncValidatorFn=F_(this._rawAsyncValidators)}get validator(){return this._composedValidatorFn||null}get asyncValidator(){return this._composedAsyncValidatorFn||null}_onDestroyCallbacks=[];_registerOnDestroy(t){this._onDestroyCallbacks.push(t)}_invokeOnDestroyCallbacks(){this._onDestroyCallbacks.forEach(t=>t()),this._onDestroyCallbacks=[]}reset(t=void 0){this.control?.reset(t)}hasError(t,e){return this.control?this.control.hasError(t,e):!1}getError(t,e){return this.control?this.control.getError(t,e):null}},Ha=class extends sp{name;get formDirective(){return null}get path(){return null}},ap=class extends sp{_parent=null;name=null;valueAccessor=null};var td="VALID",ip="INVALID",ja="PENDING",nd="DISABLED",ho=class{},lp=class extends ho{value;source;constructor(t,e){super(),this.value=t,this.source=e}},rd=class extends ho{pristine;source;constructor(t,e){super(),this.pristine=t,this.source=e}},od=class extends ho{touched;source;constructor(t,e){super(),this.touched=t,this.source=e}},Ua=class extends ho{status;source;constructor(t,e){super(),this.status=t,this.source=e}},cp=class extends ho{source;constructor(t){super(),this.source=t}},dp=class extends ho{source;constructor(t){super(),this.source=t}};function Fx(n){return(mp(n)?n.validators:n)||null}function eB(n){return Array.isArray(n)?P_(n):n||null}function Lx(n,t){return(mp(t)?t.asyncValidators:n)||null}function tB(n){return Array.isArray(n)?F_(n):n||null}function mp(n){return n!=null&&!Array.isArray(n)&&typeof n=="object"}function nB(n,t,e){let i=n.controls;if(!(t?Object.keys(i):i).length)throw new S(1e3,"");if(!i[e])throw new S(1001,"")}function iB(n,t,e){n._forEachChild((i,r)=>{if(e[r]===void 0)throw new S(-1002,"")})}var up=class{_pendingDirty=!1;_hasOwnPendingAsyncValidator=null;_pendingTouched=!1;_onCollectionChange=()=>{};_updateOn;_parent=null;_asyncValidationSubscription;_composedValidatorFn;_composedAsyncValidatorFn;_rawValidators;_rawAsyncValidators;value;constructor(t,e){this._assignValidators(t),this._assignAsyncValidators(e)}get validator(){return this._composedValidatorFn}set validator(t){this._rawValidators=this._composedValidatorFn=t}get asyncValidator(){return this._composedAsyncValidatorFn}set asyncValidator(t){this._rawAsyncValidators=this._composedAsyncValidatorFn=t}get parent(){return this._parent}get status(){return Ae(this.statusReactive)}set status(t){Ae(()=>this.statusReactive.set(t))}_status=ve(()=>this.statusReactive());statusReactive=O(void 0);get valid(){return this.status===td}get invalid(){return this.status===ip}get pending(){return this.status===ja}get disabled(){return this.status===nd}get enabled(){return this.status!==nd}errors;get pristine(){return Ae(this.pristineReactive)}set pristine(t){Ae(()=>this.pristineReactive.set(t))}_pristine=ve(()=>this.pristineReactive());pristineReactive=O(!0);get dirty(){return!this.pristine}get touched(){return Ae(this.touchedReactive)}set touched(t){Ae(()=>this.touchedReactive.set(t))}_touched=ve(()=>this.touchedReactive());touchedReactive=O(!1);get untouched(){return!this.touched}_events=new D;events=this._events.asObservable();valueChanges;statusChanges;get updateOn(){return this._updateOn?this._updateOn:this.parent?this.parent.updateOn:"change"}setValidators(t){this._assignValidators(t)}setAsyncValidators(t){this._assignAsyncValidators(t)}addValidators(t){this.setValidators(bx(t,this._rawValidators))}addAsyncValidators(t){this.setAsyncValidators(bx(t,this._rawAsyncValidators))}removeValidators(t){this.setValidators(_x(t,this._rawValidators))}removeAsyncValidators(t){this.setAsyncValidators(_x(t,this._rawAsyncValidators))}hasValidator(t){return op(this._rawValidators,t)}hasAsyncValidator(t){return op(this._rawAsyncValidators,t)}clearValidators(){this.validator=null}clearAsyncValidators(){this.asyncValidator=null}markAsTouched(t={}){let e=this.touched===!1;this.touched=!0;let i=t.sourceControl??this;t.onlySelf||this._parent?.markAsTouched(V(g({},t),{sourceControl:i})),e&&t.emitEvent!==!1&&this._events.next(new od(!0,i))}markAllAsDirty(t={}){this.markAsDirty({onlySelf:!0,emitEvent:t.emitEvent,sourceControl:this}),this._forEachChild(e=>e.markAllAsDirty(t))}markAllAsTouched(t={}){this.markAsTouched({onlySelf:!0,emitEvent:t.emitEvent,sourceControl:this}),this._forEachChild(e=>e.markAllAsTouched(t))}markAsUntouched(t={}){let e=this.touched===!0;this.touched=!1,this._pendingTouched=!1;let i=t.sourceControl??this;this._forEachChild(r=>{r.markAsUntouched({onlySelf:!0,emitEvent:t.emitEvent,sourceControl:i})}),t.onlySelf||this._parent?._updateTouched(t,i),e&&t.emitEvent!==!1&&this._events.next(new od(!1,i))}markAsDirty(t={}){let e=this.pristine===!0;this.pristine=!1;let i=t.sourceControl??this;t.onlySelf||this._parent?.markAsDirty(V(g({},t),{sourceControl:i})),e&&t.emitEvent!==!1&&this._events.next(new rd(!1,i))}markAsPristine(t={}){let e=this.pristine===!1;this.pristine=!0,this._pendingDirty=!1;let i=t.sourceControl??this;this._forEachChild(r=>{r.markAsPristine({onlySelf:!0,emitEvent:t.emitEvent})}),t.onlySelf||this._parent?._updatePristine(t,i),e&&t.emitEvent!==!1&&this._events.next(new rd(!0,i))}markAsPending(t={}){this.status=ja;let e=t.sourceControl??this;t.emitEvent!==!1&&(this._events.next(new Ua(this.status,e)),this.statusChanges.emit(this.status)),t.onlySelf||this._parent?.markAsPending(V(g({},t),{sourceControl:e}))}disable(t={}){let e=this._parentMarkedDirty(t.onlySelf);this.status=nd,this.errors=null,this._forEachChild(r=>{r.disable(V(g({},t),{onlySelf:!0}))}),this._updateValue();let i=t.sourceControl??this;t.emitEvent!==!1&&(this._events.next(new lp(this.value,i)),this._events.next(new Ua(this.status,i)),this.valueChanges.emit(this.value),this.statusChanges.emit(this.status)),this._updateAncestors(V(g({},t),{skipPristineCheck:e}),this),this._onDisabledChange.forEach(r=>r(!0))}enable(t={}){let e=this._parentMarkedDirty(t.onlySelf);this.status=td,this._forEachChild(i=>{i.enable(V(g({},t),{onlySelf:!0}))}),this.updateValueAndValidity({onlySelf:!0,emitEvent:t.emitEvent}),this._updateAncestors(V(g({},t),{skipPristineCheck:e}),this),this._onDisabledChange.forEach(i=>i(!1))}_updateAncestors(t,e){t.onlySelf||(this._parent?.updateValueAndValidity(t),t.skipPristineCheck||this._parent?._updatePristine({},e),this._parent?._updateTouched({},e))}setParent(t){this._parent=t}getRawValue(){return this.value}updateValueAndValidity(t={}){if(this._setInitialStatus(),this._updateValue(),this.enabled){let i=this._cancelExistingSubscription();this.errors=this._runValidator(),this.status=this._calculateStatus(),(this.status===td||this.status===ja)&&this._runAsyncValidator(i,t.emitEvent)}let e=t.sourceControl??this;t.emitEvent!==!1&&(this._events.next(new lp(this.value,e)),this._events.next(new Ua(this.status,e)),this.valueChanges.emit(this.value),this.statusChanges.emit(this.status)),t.onlySelf||this._parent?.updateValueAndValidity(V(g({},t),{sourceControl:e}))}_updateTreeValidity(t={emitEvent:!0}){this._forEachChild(e=>e._updateTreeValidity(t)),this.updateValueAndValidity({onlySelf:!0,emitEvent:t.emitEvent})}_setInitialStatus(){this.status=this._allControlsDisabled()?nd:td}_runValidator(){return this.validator?this.validator(this):null}_runAsyncValidator(t,e){if(this.asyncValidator){this.status=ja,this._hasOwnPendingAsyncValidator={emitEvent:e!==!1,shouldHaveEmitted:t!==!1};let i=xx(this.asyncValidator(this));this._asyncValidationSubscription=i.subscribe(r=>{this._hasOwnPendingAsyncValidator=null,this.setErrors(r,{emitEvent:e,shouldHaveEmitted:t})})}}_cancelExistingSubscription(){if(this._asyncValidationSubscription){this._asyncValidationSubscription.unsubscribe();let t=(this._hasOwnPendingAsyncValidator?.emitEvent||this._hasOwnPendingAsyncValidator?.shouldHaveEmitted)??!1;return this._hasOwnPendingAsyncValidator=null,t}return!1}setErrors(t,e={}){this.errors=t,this._updateControlsErrors(e.emitEvent!==!1,this,e.shouldHaveEmitted)}get(t){let e=t;return e==null||(Array.isArray(e)||(e=e.split(".")),e.length===0)?null:e.reduce((i,r)=>i&&i._find(r),this)}getError(t,e){let i=e?this.get(e):this;return i?.errors?i.errors[t]:null}hasError(t,e){return!!this.getError(t,e)}get root(){let t=this;for(;t._parent;)t=t._parent;return t}_updateControlsErrors(t,e,i){this.status=this._calculateStatus(),t&&this.statusChanges.emit(this.status),(t||i)&&this._events.next(new Ua(this.status,e)),this._parent&&this._parent._updateControlsErrors(t,e,i)}_initObservables(){this.valueChanges=new F,this.statusChanges=new F}_calculateStatus(){return this._allControlsDisabled()?nd:this.errors?ip:this._hasOwnPendingAsyncValidator||this._anyControlsHaveStatus(ja)?ja:this._anyControlsHaveStatus(ip)?ip:td}_anyControlsHaveStatus(t){return this._anyControls(e=>e.status===t)}_anyControlsDirty(){return this._anyControls(t=>t.dirty)}_anyControlsTouched(){return this._anyControls(t=>t.touched)}_updatePristine(t,e){let i=!this._anyControlsDirty(),r=this.pristine!==i;this.pristine=i,t.onlySelf||this._parent?._updatePristine(t,e),r&&this._events.next(new rd(this.pristine,e))}_updateTouched(t={},e){this.touched=this._anyControlsTouched(),this._events.next(new od(this.touched,e)),t.onlySelf||this._parent?._updateTouched(t,e)}_onDisabledChange=[];_registerOnCollectionChange(t){this._onCollectionChange=t}_setUpdateStrategy(t){mp(t)&&t.updateOn!=null&&(this._updateOn=t.updateOn)}_parentMarkedDirty(t){return!t&&!!this._parent?.dirty&&!this._parent._anyControlsDirty()}_find(t){return null}_assignValidators(t){this._rawValidators=Array.isArray(t)?t.slice():t,this._composedValidatorFn=eB(this._rawValidators)}_assignAsyncValidators(t){this._rawAsyncValidators=Array.isArray(t)?t.slice():t,this._composedAsyncValidatorFn=tB(this._rawAsyncValidators)}},fp=class extends up{constructor(t,e,i){super(Fx(e),Lx(i,e)),this.controls=t,this._initObservables(),this._setUpdateStrategy(e),this._setUpControls(),this.updateValueAndValidity({onlySelf:!0,emitEvent:!!this.asyncValidator})}controls;registerControl(t,e){return this.controls[t]?this.controls[t]:(this.controls[t]=e,e.setParent(this),e._registerOnCollectionChange(this._onCollectionChange),e)}addControl(t,e,i={}){this.registerControl(t,e),this.updateValueAndValidity({emitEvent:i.emitEvent}),this._onCollectionChange()}removeControl(t,e={}){this.controls[t]&&this.controls[t]._registerOnCollectionChange(()=>{}),delete this.controls[t],this.updateValueAndValidity({emitEvent:e.emitEvent}),this._onCollectionChange()}setControl(t,e,i={}){this.controls[t]&&this.controls[t]._registerOnCollectionChange(()=>{}),delete this.controls[t],e&&this.registerControl(t,e),this.updateValueAndValidity({emitEvent:i.emitEvent}),this._onCollectionChange()}contains(t){return this.controls.hasOwnProperty(t)&&this.controls[t].enabled}setValue(t,e={}){iB(this,!0,t),Object.keys(t).forEach(i=>{nB(this,!0,i),this.controls[i].setValue(t[i],{onlySelf:!0,emitEvent:e.emitEvent})}),this.updateValueAndValidity(e)}patchValue(t,e={}){t!=null&&(Object.keys(t).forEach(i=>{let r=this.controls[i];r&&r.patchValue(t[i],{onlySelf:!0,emitEvent:e.emitEvent})}),this.updateValueAndValidity(e))}reset(t={},e={}){this._forEachChild((i,r)=>{i.reset(t?t[r]:null,V(g({},e),{onlySelf:!0}))}),this._updatePristine(e,this),this._updateTouched(e,this),this.updateValueAndValidity(e),e?.emitEvent!==!1&&this._events.next(new dp(this))}getRawValue(){return this._reduceChildren({},(t,e,i)=>(t[i]=e.getRawValue(),t))}_syncPendingControls(){let t=this._reduceChildren(!1,(e,i)=>i._syncPendingControls()?!0:e);return t&&this.updateValueAndValidity({onlySelf:!0}),t}_forEachChild(t){Object.keys(this.controls).forEach(e=>{let i=this.controls[e];i&&t(i,e)})}_setUpControls(){this._forEachChild(t=>{t.setParent(this),t._registerOnCollectionChange(this._onCollectionChange)})}_updateValue(){this.value=this._reduceValue()}_anyControls(t){for(let[e,i]of Object.entries(this.controls))if(this.contains(e)&&t(i))return!0;return!1}_reduceValue(){let t={};return this._reduceChildren(t,(e,i,r)=>((i.enabled||this.disabled)&&(e[r]=i.value),e))}_reduceChildren(t,e){let i=t;return this._forEachChild((r,o)=>{i=e(i,r,o)}),i}_allControlsDisabled(){for(let t of Object.keys(this.controls))if(this.controls[t].enabled)return!1;return Object.keys(this.controls).length>0||this.disabled}_find(t){return this.controls.hasOwnProperty(t)?this.controls[t]:null}};var Vx=new b("",{factory:()=>Bx}),Bx="always";function R_(n,t,e=Bx){L_(n,t),t.valueAccessor.writeValue(n.value),(n.disabled||e==="always")&&t.valueAccessor.setDisabledState?.(n.disabled),oB(n,t),aB(n,t),sB(n,t),rB(n,t)}function Cx(n,t,e=!0){let i=()=>{};t?.valueAccessor?.registerOnChange(i),t?.valueAccessor?.registerOnTouched(i),pp(n,t),n&&(t._invokeOnDestroyCallbacks(),n._registerOnCollectionChange(()=>{}))}function hp(n,t){n.forEach(e=>{e.registerOnValidatorChange&&e.registerOnValidatorChange(t)})}function rB(n,t){if(t.valueAccessor.setDisabledState){let e=i=>{t.valueAccessor.setDisabledState(i)};n.registerOnDisabledChange(e),t._registerOnDestroy(()=>{n._unregisterOnDisabledChange(e)})}}function L_(n,t){let e=Nx(n);t.validator!==null?n.setValidators(vx(e,t.validator)):typeof e=="function"&&n.setValidators([e]);let i=Px(n);t.asyncValidator!==null?n.setAsyncValidators(vx(i,t.asyncValidator)):typeof i=="function"&&n.setAsyncValidators([i]);let r=()=>n.updateValueAndValidity();hp(t._rawValidators,r),hp(t._rawAsyncValidators,r)}function pp(n,t){let e=!1;if(n!==null){if(t.validator!==null){let r=Nx(n);if(Array.isArray(r)&&r.length>0){let o=r.filter(s=>s!==t.validator);o.length!==r.length&&(e=!0,n.setValidators(o))}}if(t.asyncValidator!==null){let r=Px(n);if(Array.isArray(r)&&r.length>0){let o=r.filter(s=>s!==t.asyncValidator);o.length!==r.length&&(e=!0,n.setAsyncValidators(o))}}}let i=()=>{};return hp(t._rawValidators,i),hp(t._rawAsyncValidators,i),e}function oB(n,t){t.valueAccessor.registerOnChange(e=>{n._pendingValue=e,n._pendingChange=!0,n._pendingDirty=!0,n.updateOn==="change"&&jx(n,t)})}function sB(n,t){t.valueAccessor.registerOnTouched(()=>{n._pendingTouched=!0,n.updateOn==="blur"&&n._pendingChange&&jx(n,t),n.updateOn!=="submit"&&n.markAsTouched()})}function jx(n,t){n._pendingDirty&&n.markAsDirty(),n.setValue(n._pendingValue,{emitModelToViewChange:!1}),t.viewToModelUpdate(n._pendingValue),n._pendingChange=!1}function aB(n,t){let e=(i,r)=>{t.valueAccessor.writeValue(i),r&&t.viewToModelUpdate(i)};n.registerOnChange(e),t._registerOnDestroy(()=>{n._unregisterOnChange(e)})}function Ux(n,t){n==null,L_(n,t)}function lB(n,t){return pp(n,t)}function Hx(n,t){n._syncPendingControls(),t.forEach(e=>{let i=e.control;i.updateOn==="submit"&&i._pendingChange&&(e.viewToModelUpdate(i._pendingValue),i._pendingChange=!1)})}function cB(n,t){let e=n.indexOf(t);e>-1&&n.splice(e,1)}var dB={provide:Ha,useExisting:nr(()=>V_)},id=Promise.resolve(),V_=(()=>{class n extends Ha{callSetDisabledState;get submitted(){return Ae(this.submittedReactive)}_submitted=ve(()=>this.submittedReactive());submittedReactive=O(!1);_directives=new Set;form;ngSubmit=new F;options;constructor(e,i,r){super(),this.callSetDisabledState=r,this.form=new fp({},P_(e),F_(i))}ngAfterViewInit(){this._setUpdateStrategy()}get formDirective(){return this}get control(){return this.form}get path(){return[]}get controls(){return this.form.controls}addControl(e){id.then(()=>{let i=this._findContainer(e.path);e.control=i.registerControl(e.name,e.control),R_(e.control,e,this.callSetDisabledState),e.control.updateValueAndValidity({emitEvent:!1}),this._directives.add(e)})}getControl(e){return this.form.get(e.path)}removeControl(e){id.then(()=>{this._findContainer(e.path)?.removeControl(e.name),this._directives.delete(e)})}addFormGroup(e){id.then(()=>{let i=this._findContainer(e.path),r=new fp({});Ux(r,e),i.registerControl(e.name,r),r.updateValueAndValidity({emitEvent:!1})})}removeFormGroup(e){id.then(()=>{this._findContainer(e.path)?.removeControl?.(e.name)})}getFormGroup(e){return this.form.get(e.path)}updateModel(e,i){id.then(()=>{this.form.get(e.path).setValue(i)})}setValue(e){this.control.setValue(e)}onSubmit(e){return this.submittedReactive.set(!0),Hx(this.form,this._directives),this.ngSubmit.emit(e),this.form._events.next(new cp(this.control)),e?.target?.method==="dialog"}onReset(){this.resetForm()}resetForm(e=void 0){this.form.reset(e),this.submittedReactive.set(!1)}_setUpdateStrategy(){this.options&&this.options.updateOn!=null&&(this.form._updateOn=this.options.updateOn)}_findContainer(e){return e.pop(),e.length?this.form.get(e):this.form}static \u0275fac=function(i){return new(i||n)(Je(wx,10),Je(Sx,10),Je(Vx,8))};static \u0275dir=Y({type:n,selectors:[["form",3,"ngNoForm","",3,"formGroup","",3,"formArray",""],["ng-form"],["","ngForm",""]],hostBindings:function(i,r){i&1&&fe("submit",function(s){return r.onSubmit(s)})("reset",function(){return r.onReset()})},inputs:{options:[0,"ngFormOptions","options"]},outputs:{ngSubmit:"ngSubmit"},exportAs:["ngForm"],standalone:!1,features:[bt([dB]),St]})}return n})();function Dx(n,t){let e=n.indexOf(t);e>-1&&n.splice(e,1)}function Ex(n){return typeof n=="object"&&n!==null&&Object.keys(n).length===2&&"value"in n&&"disabled"in n}var uB=class extends up{defaultValue=null;_onChange=[];_pendingValue;_pendingChange=!1;constructor(t=null,e,i){super(Fx(e),Lx(i,e)),this._applyFormState(t),this._setUpdateStrategy(e),this._initObservables(),this.updateValueAndValidity({onlySelf:!0,emitEvent:!!this.asyncValidator}),mp(e)&&(e.nonNullable||e.initialValueIsDefault)&&(Ex(t)?this.defaultValue=t.value:this.defaultValue=t)}setValue(t,e={}){this.value=this._pendingValue=t,this._onChange.length&&e.emitModelToViewChange!==!1&&this._onChange.forEach(i=>i(this.value,e.emitViewToModelChange!==!1)),this.updateValueAndValidity(e)}patchValue(t,e={}){this.setValue(t,e)}reset(t=this.defaultValue,e={}){this._applyFormState(t),this.markAsPristine(e),this.markAsUntouched(e),this.setValue(this.value,e),e.overwriteDefaultValue&&(this.defaultValue=this.value),this._pendingChange=!1,e?.emitEvent!==!1&&this._events.next(new dp(this))}_updateValue(){}_anyControls(t){return!1}_allControlsDisabled(){return this.disabled}registerOnChange(t){this._onChange.push(t)}_unregisterOnChange(t){Dx(this._onChange,t)}registerOnDisabledChange(t){this._onDisabledChange.push(t)}_unregisterOnDisabledChange(t){Dx(this._onDisabledChange,t)}_forEachChild(t){}_syncPendingControls(){return this.updateOn==="submit"&&(this._pendingDirty&&this.markAsDirty(),this._pendingTouched&&this.markAsTouched(),this._pendingChange)?(this.setValue(this._pendingValue,{onlySelf:!0,emitModelToViewChange:!1}),!0):!1}_applyFormState(t){Ex(t)?(this.value=this._pendingValue=t.value,t.disabled?this.disable({onlySelf:!0,emitEvent:!1}):this.enable({onlySelf:!0,emitEvent:!1})):this.value=this._pendingValue=t}};var fB=n=>n instanceof uB;var hB=(()=>{class n extends Ha{callSetDisabledState;get submitted(){return Ae(this._submittedReactive)}set submitted(e){this._submittedReactive.set(e)}_submitted=ve(()=>this._submittedReactive());_submittedReactive=O(!1);_oldForm;_onCollectionChange=()=>this._updateDomValue();directives=[];constructor(e,i,r){super(),this.callSetDisabledState=r,this._setValidators(e),this._setAsyncValidators(i)}ngOnChanges(e){this.onChanges(e)}ngOnDestroy(){this.onDestroy()}onChanges(e){this._checkFormPresent(),e.hasOwnProperty("form")&&(this._updateValidators(),this._updateDomValue(),this._updateRegistrations(),this._oldForm=this.form)}onDestroy(){this.form&&(pp(this.form,this),this.form._onCollectionChange===this._onCollectionChange&&this.form._registerOnCollectionChange(()=>{}))}get formDirective(){return this}get path(){return[]}addControl(e){let i=this.form.get(e.path);return R_(i,e,this.callSetDisabledState),i.updateValueAndValidity({emitEvent:!1}),this.directives.push(e),i}getControl(e){return this.form.get(e.path)}removeControl(e){Cx(e.control||null,e,!1),cB(this.directives,e)}addFormGroup(e){this._setUpFormContainer(e)}removeFormGroup(e){this._cleanUpFormContainer(e)}getFormGroup(e){return this.form.get(e.path)}getFormArray(e){return this.form.get(e.path)}addFormArray(e){this._setUpFormContainer(e)}removeFormArray(e){this._cleanUpFormContainer(e)}updateModel(e,i){this.form.get(e.path).setValue(i)}onReset(){this.resetForm()}resetForm(e=void 0,i={}){this.form.reset(e,i),this._submittedReactive.set(!1)}onSubmit(e){return this.submitted=!0,Hx(this.form,this.directives),this.ngSubmit.emit(e),this.form._events.next(new cp(this.control)),e?.target?.method==="dialog"}_updateDomValue(){this.directives.forEach(e=>{let i=e.control,r=this.form.get(e.path);i!==r&&(Cx(i||null,e),fB(r)&&(R_(r,e,this.callSetDisabledState),e.control=r))}),this.form._updateTreeValidity({emitEvent:!1})}_setUpFormContainer(e){let i=this.form.get(e.path);Ux(i,e),i.updateValueAndValidity({emitEvent:!1})}_cleanUpFormContainer(e){let i=this.form?.get(e.path);i&&lB(i,e)&&i.updateValueAndValidity({emitEvent:!1})}_updateRegistrations(){this.form._registerOnCollectionChange(this._onCollectionChange),this._oldForm?._registerOnCollectionChange(()=>{})}_updateValidators(){L_(this.form,this),this._oldForm&&pp(this._oldForm,this)}_checkFormPresent(){this.form}static \u0275fac=function(i){return new(i||n)(Je(wx,10),Je(Sx,10),Je(Vx,8))};static \u0275dir=Y({type:n,features:[St,It]})}return n})();var pB={provide:Ha,useExisting:nr(()=>B_)},B_=(()=>{class n extends hB{form=null;ngSubmit=new F;get control(){return this.form}static \u0275fac=(()=>{let e;return function(r){return(e||(e=hn(n)))(r||n)}})();static \u0275dir=Y({type:n,selectors:[["","formGroup",""]],hostBindings:function(i,r){i&1&&fe("submit",function(s){return r.onSubmit(s)})("reset",function(){return r.onReset()})},inputs:{form:[0,"formGroup","form"]},outputs:{ngSubmit:"ngSubmit"},exportAs:["ngForm"],standalone:!1,features:[bt([pB]),St]})}return n})();function sd(n){return n!=null&&`${n}`!="false"}var j_=class{_box;_destroyed=new D;_resizeSubject=new D;_resizeObserver;_elementObservables=new Map;constructor(t){this._box=t,typeof ResizeObserver<"u"&&(this._resizeObserver=new ResizeObserver(e=>this._resizeSubject.next(e)))}observe(t){return this._elementObservables.has(t)||this._elementObservables.set(t,new U(e=>{let i=this._resizeSubject.subscribe(e);return this._resizeObserver?.observe(t,{box:this._box}),()=>{this._resizeObserver?.unobserve(t),i.unsubscribe(),this._elementObservables.delete(t)}}).pipe(_e(e=>e.some(i=>i.target===t)),hl({bufferSize:1,refCount:!0}),K(this._destroyed))),this._elementObservables.get(t)}destroy(){this._destroyed.next(),this._destroyed.complete(),this._resizeSubject.complete(),this._elementObservables.clear()}},gp=(()=>{class n{_cleanupErrorListener;_observers=new Map;_ngZone=f(L);constructor(){typeof ResizeObserver<"u"}ngOnDestroy(){for(let[,e]of this._observers)e.destroy();this._observers.clear(),this._cleanupErrorListener?.()}observe(e,i){let r=i?.box||"content-box";return this._observers.has(r)||this._observers.set(r,new j_(r)),this._observers.get(r).observe(e)}static \u0275fac=function(i){return new(i||n)};static \u0275prov=C({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})();var mB=new b("MATERIAL_ANIMATIONS"),$x=null;function gB(){return f(mB,{optional:!0})?.animationsDisabled||f(Hl,{optional:!0})==="NoopAnimations"?"di-disabled":($x??=f(Pa).matchMedia("(prefers-reduced-motion)").matches,$x?"reduced-motion":"enabled")}function At(){return gB()!=="enabled"}var yB=["notch"],vB=["matFormFieldNotchedOutline",""],bB=["*"],zx=["iconPrefixContainer"],Wx=["textPrefixContainer"],Gx=["iconSuffixContainer"],qx=["textSuffixContainer"],_B=["textField"],CB=["*",[["mat-label"]],[["","matPrefix",""],["","matIconPrefix",""]],[["","matTextPrefix",""]],[["","matTextSuffix",""]],[["","matSuffix",""],["","matIconSuffix",""]],[["mat-error"],["","matError",""]],[["mat-hint",3,"align","end"]],[["mat-hint","align","end"]]],DB=["*","mat-label","[matPrefix], [matIconPrefix]","[matTextPrefix]","[matTextSuffix]","[matSuffix], [matIconSuffix]","mat-error, [matError]","mat-hint:not([align='end'])","mat-hint[align='end']"];function EB(n,t){n&1&&me(0,"span",21)}function wB(n,t){if(n&1&&(y(0,"label",20),Ve(1,1),ee(2,EB,1,0,"span",21),v()),n&2){let e=R(2);ge("floating",e._shouldLabelFloat())("monitorResize",e._hasOutline())("id",e._labelId),Le("for",e._control.disableAutomaticLabeling?null:e._control.id),_(2),te(!e.hideRequiredMarker&&e._control.required?2:-1)}}function SB(n,t){if(n&1&&ee(0,wB,3,5,"label",20),n&2){let e=R();te(e._hasFloatingLabel()?0:-1)}}function TB(n,t){n&1&&me(0,"div",7)}function IB(n,t){}function xB(n,t){if(n&1&&Wt(0,IB,0,0,"ng-template",13),n&2){R(2);let e=gi(1);ge("ngTemplateOutlet",e)}}function MB(n,t){if(n&1&&(y(0,"div",9),ee(1,xB,1,1,null,13),v()),n&2){let e=R();ge("matFormFieldNotchedOutlineOpen",e._shouldLabelFloat()),_(),te(e._forceDisplayInfixLabel()?-1:1)}}function kB(n,t){n&1&&(y(0,"div",10,2),Ve(2,2),v())}function AB(n,t){n&1&&(y(0,"div",11,3),Ve(2,3),v())}function RB(n,t){}function OB(n,t){if(n&1&&Wt(0,RB,0,0,"ng-template",13),n&2){R();let e=gi(1);ge("ngTemplateOutlet",e)}}function NB(n,t){n&1&&(y(0,"div",14,4),Ve(2,4),v())}function PB(n,t){n&1&&(y(0,"div",15,5),Ve(2,5),v())}function FB(n,t){n&1&&me(0,"div",16)}function LB(n,t){n&1&&(y(0,"div",18),Ve(1,6),v())}function VB(n,t){if(n&1&&(y(0,"mat-hint",22),E(1),v()),n&2){let e=R(2);ge("id",e._hintLabelId),_(),Fe(e.hintLabel)}}function BB(n,t){if(n&1&&(y(0,"div",19),ee(1,VB,2,2,"mat-hint",22),Ve(2,7),me(3,"div",23),Ve(4,8),v()),n&2){let e=R();_(),te(e.hintLabel?1:-1)}}var U_=(()=>{class n{static \u0275fac=function(i){return new(i||n)};static \u0275dir=Y({type:n,selectors:[["mat-label"]]})}return n})(),jB=new b("MatError");var H_=(()=>{class n{align="start";id=f(Zt).getId("mat-mdc-hint-");static \u0275fac=function(i){return new(i||n)};static \u0275dir=Y({type:n,selectors:[["mat-hint"]],hostAttrs:[1,"mat-mdc-form-field-hint","mat-mdc-form-field-bottom-align"],hostVars:4,hostBindings:function(i,r){i&2&&(Jr("id",r.id),Le("align",null),ye("mat-mdc-form-field-hint-end",r.align==="end"))},inputs:{align:"align",id:"id"}})}return n})(),UB=new b("MatPrefix");var HB=new b("MatSuffix");var eM=new b("FloatingLabelParent"),Kx=(()=>{class n{_elementRef=f(z);get floating(){return this._floating}set floating(e){this._floating=e,this.monitorResize&&this._handleResize()}_floating=!1;get monitorResize(){return this._monitorResize}set monitorResize(e){this._monitorResize=e,this._monitorResize?this._subscribeToResize():this._resizeSubscription.unsubscribe()}_monitorResize=!1;_resizeObserver=f(gp);_ngZone=f(L);_parent=f(eM);_resizeSubscription=new H;constructor(){}ngOnDestroy(){this._resizeSubscription.unsubscribe()}getWidth(){return $B(this._elementRef.nativeElement)}get element(){return this._elementRef.nativeElement}_handleResize(){setTimeout(()=>this._parent._handleLabelResized())}_subscribeToResize(){this._resizeSubscription.unsubscribe(),this._ngZone.runOutsideAngular(()=>{this._resizeSubscription=this._resizeObserver.observe(this._elementRef.nativeElement,{box:"border-box"}).subscribe(()=>this._handleResize())})}static \u0275fac=function(i){return new(i||n)};static \u0275dir=Y({type:n,selectors:[["label","matFormFieldFloatingLabel",""]],hostAttrs:[1,"mdc-floating-label","mat-mdc-floating-label"],hostVars:2,hostBindings:function(i,r){i&2&&ye("mdc-floating-label--float-above",r.floating)},inputs:{floating:"floating",monitorResize:"monitorResize"}})}return n})();function $B(n){let t=n;if(t.offsetParent!==null)return t.scrollWidth;let e=t.cloneNode(!0);e.style.setProperty("position","absolute"),e.style.setProperty("transform","translate(-9999px, -9999px)"),document.documentElement.appendChild(e);let i=e.scrollWidth;return e.remove(),i}var Yx="mdc-line-ripple--active",yp="mdc-line-ripple--deactivating",Zx=(()=>{class n{_elementRef=f(z);_cleanupTransitionEnd;constructor(){let e=f(L),i=f(yt);e.runOutsideAngular(()=>{this._cleanupTransitionEnd=i.listen(this._elementRef.nativeElement,"transitionend",this._handleTransitionEnd)})}activate(){let e=this._elementRef.nativeElement.classList;e.remove(yp),e.add(Yx)}deactivate(){this._elementRef.nativeElement.classList.add(yp)}_handleTransitionEnd=e=>{let i=this._elementRef.nativeElement.classList,r=i.contains(yp);e.propertyName==="opacity"&&r&&i.remove(Yx,yp)};ngOnDestroy(){this._cleanupTransitionEnd()}static \u0275fac=function(i){return new(i||n)};static \u0275dir=Y({type:n,selectors:[["div","matFormFieldLineRipple",""]],hostAttrs:[1,"mdc-line-ripple"]})}return n})(),Xx=(()=>{class n{_elementRef=f(z);_ngZone=f(L);open=!1;_notch;ngAfterViewInit(){let e=this._elementRef.nativeElement,i=e.querySelector(".mdc-floating-label");i?(e.classList.add("mdc-notched-outline--upgraded"),typeof requestAnimationFrame=="function"&&(i.style.transitionDuration="0s",this._ngZone.runOutsideAngular(()=>{requestAnimationFrame(()=>i.style.transitionDuration="")}))):e.classList.add("mdc-notched-outline--no-label")}_setNotchWidth(e){let i=this._notch.nativeElement;!this.open||!e?i.style.width="":i.style.width=`calc(${e}px * var(--mat-mdc-form-field-floating-label-scale, 0.75) + 9px)`}_setMaxWidth(e){this._notch.nativeElement.style.setProperty("--mat-form-field-notch-max-width",`calc(100% - ${e}px)`)}static \u0275fac=function(i){return new(i||n)};static \u0275cmp=J({type:n,selectors:[["div","matFormFieldNotchedOutline",""]],viewQuery:function(i,r){if(i&1&&vt(yB,5),i&2){let o;W(o=G())&&(r._notch=o.first)}},hostAttrs:[1,"mdc-notched-outline"],hostVars:2,hostBindings:function(i,r){i&2&&ye("mdc-notched-outline--notched",r.open)},inputs:{open:[0,"matFormFieldNotchedOutlineOpen","open"]},attrs:vB,ngContentSelectors:bB,decls:5,vars:0,consts:[["notch",""],[1,"mat-mdc-notch-piece","mdc-notched-outline__leading"],[1,"mat-mdc-notch-piece","mdc-notched-outline__notch"],[1,"mat-mdc-notch-piece","mdc-notched-outline__trailing"]],template:function(i,r){i&1&&(Ft(),Ko(0,"div",1),Me(1,"div",2,0),Ve(3),ke(),Ko(4,"div",3))},encapsulation:2,changeDetection:0})}return n})(),$_=(()=>{class n{value=null;stateChanges;id;placeholder;ngControl=null;focused=!1;empty=!1;shouldLabelFloat=!1;required=!1;disabled=!1;errorState=!1;controlType;autofilled;userAriaDescribedBy;disableAutomaticLabeling;describedByIds;static \u0275fac=function(i){return new(i||n)};static \u0275dir=Y({type:n})}return n})();var z_=new b("MatFormField"),zB=new b("MAT_FORM_FIELD_DEFAULT_OPTIONS"),Qx="fill",WB="auto",Jx="fixed",GB="translateY(-50%)",tM=(()=>{class n{_elementRef=f(z);_changeDetectorRef=f(et);_platform=f(He);_idGenerator=f(Zt);_ngZone=f(L);_defaults=f(zB,{optional:!0});_currentDirection;_textField;_iconPrefixContainer;_textPrefixContainer;_iconSuffixContainer;_textSuffixContainer;_floatingLabel;_notchedOutline;_lineRipple;_iconPrefixContainerSignal=Xl("iconPrefixContainer");_textPrefixContainerSignal=Xl("textPrefixContainer");_iconSuffixContainerSignal=Xl("iconSuffixContainer");_textSuffixContainerSignal=Xl("textSuffixContainer");_prefixSuffixContainers=ve(()=>[this._iconPrefixContainerSignal(),this._textPrefixContainerSignal(),this._iconSuffixContainerSignal(),this._textSuffixContainerSignal()].map(e=>e?.nativeElement).filter(e=>e!==void 0));_formFieldControl;_prefixChildren;_suffixChildren;_errorChildren;_hintChildren;_labelChild=aS(U_);get hideRequiredMarker(){return this._hideRequiredMarker}set hideRequiredMarker(e){this._hideRequiredMarker=sd(e)}_hideRequiredMarker=!1;color="primary";get floatLabel(){return this._floatLabel||this._defaults?.floatLabel||WB}set floatLabel(e){e!==this._floatLabel&&(this._floatLabel=e,this._changeDetectorRef.markForCheck())}_floatLabel;get appearance(){return this._appearanceSignal()}set appearance(e){let i=e||this._defaults?.appearance||Qx;this._appearanceSignal.set(i)}_appearanceSignal=O(Qx);get subscriptSizing(){return this._subscriptSizing||this._defaults?.subscriptSizing||Jx}set subscriptSizing(e){this._subscriptSizing=e||this._defaults?.subscriptSizing||Jx}_subscriptSizing=null;get hintLabel(){return this._hintLabel}set hintLabel(e){this._hintLabel=e,this._processHints()}_hintLabel="";_hasIconPrefix=!1;_hasTextPrefix=!1;_hasIconSuffix=!1;_hasTextSuffix=!1;_labelId=this._idGenerator.getId("mat-mdc-form-field-label-");_hintLabelId=this._idGenerator.getId("mat-mdc-hint-");_describedByIds;get _control(){return this._explicitFormFieldControl||this._formFieldControl}set _control(e){this._explicitFormFieldControl=e}_destroyed=new D;_isFocused=null;_explicitFormFieldControl;_previousControl=null;_previousControlValidatorFn=null;_stateChanges;_valueChanges;_describedByChanges;_outlineLabelOffsetResizeObserver=null;_animationsDisabled=At();constructor(){let e=this._defaults,i=f(Bt);e&&(e.appearance&&(this.appearance=e.appearance),this._hideRequiredMarker=!!e?.hideRequiredMarker,e.color&&(this.color=e.color)),cr(()=>this._currentDirection=i.valueSignal()),this._syncOutlineLabelOffset()}ngAfterViewInit(){this._updateFocusState(),this._animationsDisabled||this._ngZone.runOutsideAngular(()=>{setTimeout(()=>{this._elementRef.nativeElement.classList.add("mat-form-field-animations-enabled")},300)}),this._changeDetectorRef.detectChanges()}ngAfterContentInit(){this._assertFormFieldControl(),this._initializeSubscript(),this._initializePrefixAndSuffix()}ngAfterContentChecked(){this._assertFormFieldControl(),this._control!==this._previousControl&&(this._initializeControl(this._previousControl),this._control.ngControl&&this._control.ngControl.control&&(this._previousControlValidatorFn=this._control.ngControl.control.validator),this._previousControl=this._control),this._control.ngControl&&this._control.ngControl.control&&this._control.ngControl.control.validator!==this._previousControlValidatorFn&&this._changeDetectorRef.markForCheck()}ngOnDestroy(){this._outlineLabelOffsetResizeObserver?.disconnect(),this._stateChanges?.unsubscribe(),this._valueChanges?.unsubscribe(),this._describedByChanges?.unsubscribe(),this._destroyed.next(),this._destroyed.complete()}getLabelId=ve(()=>this._hasFloatingLabel()?this._labelId:null);getConnectedOverlayOrigin(){return this._textField||this._elementRef}_animateAndLockLabel(){this._hasFloatingLabel()&&(this.floatLabel="always")}_initializeControl(e){let i=this._control,r="mat-mdc-form-field-type-";e&&this._elementRef.nativeElement.classList.remove(r+e.controlType),i.controlType&&this._elementRef.nativeElement.classList.add(r+i.controlType),this._stateChanges?.unsubscribe(),this._stateChanges=i.stateChanges.subscribe(()=>{this._updateFocusState(),this._changeDetectorRef.markForCheck()}),this._describedByChanges?.unsubscribe(),this._describedByChanges=i.stateChanges.pipe(dt([void 0,void 0]),ue(()=>[i.errorState,i.userAriaDescribedBy]),fl(),_e(([[o,s],[a,l]])=>o!==a||s!==l)).subscribe(()=>this._syncDescribedByIds()),this._valueChanges?.unsubscribe(),i.ngControl&&i.ngControl.valueChanges&&(this._valueChanges=i.ngControl.valueChanges.pipe(K(this._destroyed)).subscribe(()=>this._changeDetectorRef.markForCheck()))}_checkPrefixAndSuffixTypes(){this._hasIconPrefix=!!this._prefixChildren.find(e=>!e._isText),this._hasTextPrefix=!!this._prefixChildren.find(e=>e._isText),this._hasIconSuffix=!!this._suffixChildren.find(e=>!e._isText),this._hasTextSuffix=!!this._suffixChildren.find(e=>e._isText)}_initializePrefixAndSuffix(){this._checkPrefixAndSuffixTypes(),Qt(this._prefixChildren.changes,this._suffixChildren.changes).subscribe(()=>{this._checkPrefixAndSuffixTypes(),this._changeDetectorRef.markForCheck()})}_initializeSubscript(){this._hintChildren.changes.subscribe(()=>{this._processHints(),this._changeDetectorRef.markForCheck()}),this._errorChildren.changes.subscribe(()=>{this._syncDescribedByIds(),this._changeDetectorRef.markForCheck()}),this._validateHints(),this._syncDescribedByIds()}_assertFormFieldControl(){this._control}_updateFocusState(){let e=this._control.focused;e&&!this._isFocused?(this._isFocused=!0,this._lineRipple?.activate()):!e&&(this._isFocused||this._isFocused===null)&&(this._isFocused=!1,this._lineRipple?.deactivate()),this._elementRef.nativeElement.classList.toggle("mat-focused",e),this._textField?.nativeElement.classList.toggle("mdc-text-field--focused",e)}_syncOutlineLabelOffset(){dS({earlyRead:()=>{if(this._appearanceSignal()!=="outline")return this._outlineLabelOffsetResizeObserver?.disconnect(),null;if(globalThis.ResizeObserver){this._outlineLabelOffsetResizeObserver||=new globalThis.ResizeObserver(()=>{this._writeOutlinedLabelStyles(this._getOutlinedLabelOffset())});for(let e of this._prefixSuffixContainers())this._outlineLabelOffsetResizeObserver.observe(e,{box:"border-box"})}return this._getOutlinedLabelOffset()},write:e=>this._writeOutlinedLabelStyles(e())})}_shouldAlwaysFloat(){return this.floatLabel==="always"}_hasOutline(){return this.appearance==="outline"}_forceDisplayInfixLabel(){return!this._platform.isBrowser&&this._prefixChildren.length&&!this._shouldLabelFloat()}_hasFloatingLabel=ve(()=>!!this._labelChild());_shouldLabelFloat(){return this._hasFloatingLabel()?this._control.shouldLabelFloat||this._shouldAlwaysFloat():!1}_shouldForward(e){let i=this._control?this._control.ngControl:null;return i&&i[e]}_getSubscriptMessageType(){return this._errorChildren&&this._errorChildren.length>0&&this._control.errorState?"error":"hint"}_handleLabelResized(){this._refreshOutlineNotchWidth()}_refreshOutlineNotchWidth(){!this._hasOutline()||!this._floatingLabel||!this._shouldLabelFloat()?this._notchedOutline?._setNotchWidth(0):this._notchedOutline?._setNotchWidth(this._floatingLabel.getWidth())}_processHints(){this._validateHints(),this._syncDescribedByIds()}_validateHints(){this._hintChildren}_syncDescribedByIds(){if(this._control){let e=[];if(this._control.userAriaDescribedBy&&typeof this._control.userAriaDescribedBy=="string"&&e.push(...this._control.userAriaDescribedBy.split(" ")),this._getSubscriptMessageType()==="hint"){let o=this._hintChildren?this._hintChildren.find(a=>a.align==="start"):null,s=this._hintChildren?this._hintChildren.find(a=>a.align==="end"):null;o?e.push(o.id):this._hintLabel&&e.push(this._hintLabelId),s&&e.push(s.id)}else this._errorChildren&&e.push(...this._errorChildren.map(o=>o.id));let i=this._control.describedByIds,r;if(i){let o=this._describedByIds||e;r=e.concat(i.filter(s=>s&&!o.includes(s)))}else r=e;this._control.setDescribedByIds(r),this._describedByIds=e}}_getOutlinedLabelOffset(){if(!this._hasOutline()||!this._floatingLabel)return null;if(!this._iconPrefixContainer&&!this._textPrefixContainer)return["",null];if(!this._isAttachedToDom())return null;let e=this._iconPrefixContainer?.nativeElement,i=this._textPrefixContainer?.nativeElement,r=this._iconSuffixContainer?.nativeElement,o=this._textSuffixContainer?.nativeElement,s=e?.getBoundingClientRect().width??0,a=i?.getBoundingClientRect().width??0,l=r?.getBoundingClientRect().width??0,c=o?.getBoundingClientRect().width??0,d=this._currentDirection==="rtl"?"-1":"1",u=`${s+a}px`,p=`calc(${d} * (${u} + var(--mat-mdc-form-field-label-offset-x, 0px)))`,m=`var(--mat-mdc-form-field-label-transform, ${GB} translateX(${p}))`,w=s+a+l+c;return[m,w]}_writeOutlinedLabelStyles(e){if(e!==null){let[i,r]=e;this._floatingLabel&&(this._floatingLabel.element.style.transform=i),r!==null&&this._notchedOutline?._setMaxWidth(r)}}_isAttachedToDom(){let e=this._elementRef.nativeElement;if(e.getRootNode){let i=e.getRootNode();return i&&i!==e}return document.documentElement.contains(e)}static \u0275fac=function(i){return new(i||n)};static \u0275cmp=J({type:n,selectors:[["mat-form-field"]],contentQueries:function(i,r,o){if(i&1&&(mf(o,r._labelChild,U_,5),In(o,$_,5)(o,UB,5)(o,HB,5)(o,jB,5)(o,H_,5)),i&2){yf();let s;W(s=G())&&(r._formFieldControl=s.first),W(s=G())&&(r._prefixChildren=s),W(s=G())&&(r._suffixChildren=s),W(s=G())&&(r._errorChildren=s),W(s=G())&&(r._hintChildren=s)}},viewQuery:function(i,r){if(i&1&&(gf(r._iconPrefixContainerSignal,zx,5)(r._textPrefixContainerSignal,Wx,5)(r._iconSuffixContainerSignal,Gx,5)(r._textSuffixContainerSignal,qx,5),vt(_B,5)(zx,5)(Wx,5)(Gx,5)(qx,5)(Kx,5)(Xx,5)(Zx,5)),i&2){yf(4);let o;W(o=G())&&(r._textField=o.first),W(o=G())&&(r._iconPrefixContainer=o.first),W(o=G())&&(r._textPrefixContainer=o.first),W(o=G())&&(r._iconSuffixContainer=o.first),W(o=G())&&(r._textSuffixContainer=o.first),W(o=G())&&(r._floatingLabel=o.first),W(o=G())&&(r._notchedOutline=o.first),W(o=G())&&(r._lineRipple=o.first)}},hostAttrs:[1,"mat-mdc-form-field"],hostVars:38,hostBindings:function(i,r){i&2&&ye("mat-mdc-form-field-label-always-float",r._shouldAlwaysFloat())("mat-mdc-form-field-has-icon-prefix",r._hasIconPrefix)("mat-mdc-form-field-has-icon-suffix",r._hasIconSuffix)("mat-form-field-invalid",r._control.errorState)("mat-form-field-disabled",r._control.disabled)("mat-form-field-autofilled",r._control.autofilled)("mat-form-field-appearance-fill",r.appearance=="fill")("mat-form-field-appearance-outline",r.appearance=="outline")("mat-form-field-hide-placeholder",r._hasFloatingLabel()&&!r._shouldLabelFloat())("mat-primary",r.color!=="accent"&&r.color!=="warn")("mat-accent",r.color==="accent")("mat-warn",r.color==="warn")("ng-untouched",r._shouldForward("untouched"))("ng-touched",r._shouldForward("touched"))("ng-pristine",r._shouldForward("pristine"))("ng-dirty",r._shouldForward("dirty"))("ng-valid",r._shouldForward("valid"))("ng-invalid",r._shouldForward("invalid"))("ng-pending",r._shouldForward("pending"))},inputs:{hideRequiredMarker:"hideRequiredMarker",color:"color",floatLabel:"floatLabel",appearance:"appearance",subscriptSizing:"subscriptSizing",hintLabel:"hintLabel"},exportAs:["matFormField"],features:[bt([{provide:z_,useExisting:n},{provide:eM,useExisting:n}])],ngContentSelectors:DB,decls:18,vars:21,consts:[["labelTemplate",""],["textField",""],["iconPrefixContainer",""],["textPrefixContainer",""],["textSuffixContainer",""],["iconSuffixContainer",""],[1,"mat-mdc-text-field-wrapper","mdc-text-field",3,"click"],[1,"mat-mdc-form-field-focus-overlay"],[1,"mat-mdc-form-field-flex"],["matFormFieldNotchedOutline","",3,"matFormFieldNotchedOutlineOpen"],[1,"mat-mdc-form-field-icon-prefix"],[1,"mat-mdc-form-field-text-prefix"],[1,"mat-mdc-form-field-infix"],[3,"ngTemplateOutlet"],[1,"mat-mdc-form-field-text-suffix"],[1,"mat-mdc-form-field-icon-suffix"],["matFormFieldLineRipple",""],["aria-atomic","true","aria-live","polite",1,"mat-mdc-form-field-subscript-wrapper","mat-mdc-form-field-bottom-align"],[1,"mat-mdc-form-field-error-wrapper"],[1,"mat-mdc-form-field-hint-wrapper"],["matFormFieldFloatingLabel","",3,"floating","monitorResize","id"],["aria-hidden","true",1,"mat-mdc-form-field-required-marker","mdc-floating-label--required"],[3,"id"],[1,"mat-mdc-form-field-hint-spacer"]],template:function(i,r){if(i&1&&(Ft(CB),Wt(0,SB,1,1,"ng-template",null,0,Wy),y(2,"div",6,1),fe("click",function(s){return r._control.onContainerClick(s)}),ee(4,TB,1,0,"div",7),y(5,"div",8),ee(6,MB,2,2,"div",9),ee(7,kB,3,0,"div",10),ee(8,AB,3,0,"div",11),y(9,"div",12),ee(10,OB,1,1,null,13),Ve(11),v(),ee(12,NB,3,0,"div",14),ee(13,PB,3,0,"div",15),v(),ee(14,FB,1,0,"div",16),v(),y(15,"div",17),ee(16,LB,2,0,"div",18)(17,BB,5,1,"div",19),v()),i&2){let o;_(2),ye("mdc-text-field--filled",!r._hasOutline())("mdc-text-field--outlined",r._hasOutline())("mdc-text-field--no-label",!r._hasFloatingLabel())("mdc-text-field--disabled",r._control.disabled)("mdc-text-field--invalid",r._control.errorState),_(2),te(!r._hasOutline()&&!r._control.disabled?4:-1),_(2),te(r._hasOutline()?6:-1),_(),te(r._hasIconPrefix?7:-1),_(),te(r._hasTextPrefix?8:-1),_(2),te(!r._hasOutline()||r._forceDisplayInfixLabel()?10:-1),_(2),te(r._hasTextSuffix?12:-1),_(),te(r._hasIconSuffix?13:-1),_(),te(r._hasOutline()?-1:14),_(),ye("mat-mdc-form-field-subscript-dynamic-size",r.subscriptSizing==="dynamic");let s=r._getSubscriptMessageType();_(),te((o=s)==="error"?16:o==="hint"?17:-1)}},dependencies:[Kx,Xx,fv,Zx,H_],styles:[`.mdc-text-field {
  display: inline-flex;
  align-items: baseline;
  padding: 0 16px;
  position: relative;
  box-sizing: border-box;
  overflow: hidden;
  will-change: opacity, transform, color;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}

.mdc-text-field__input {
  width: 100%;
  min-width: 0;
  border: none;
  border-radius: 0;
  background: none;
  padding: 0;
  -moz-appearance: none;
  -webkit-appearance: none;
  height: 28px;
}
.mdc-text-field__input::-webkit-calendar-picker-indicator, .mdc-text-field__input::-webkit-search-cancel-button {
  display: none;
}
.mdc-text-field__input::-ms-clear {
  display: none;
}
.mdc-text-field__input:focus {
  outline: none;
}
.mdc-text-field__input:invalid {
  box-shadow: none;
}
.mdc-text-field__input::placeholder {
  opacity: 0;
}
.mdc-text-field__input::-moz-placeholder {
  opacity: 0;
}
.mdc-text-field__input::-webkit-input-placeholder {
  opacity: 0;
}
.mdc-text-field__input:-ms-input-placeholder {
  opacity: 0;
}
.mdc-text-field--no-label .mdc-text-field__input::placeholder, .mdc-text-field--focused .mdc-text-field__input::placeholder {
  opacity: 1;
}
.mdc-text-field--no-label .mdc-text-field__input::-moz-placeholder, .mdc-text-field--focused .mdc-text-field__input::-moz-placeholder {
  opacity: 1;
}
.mdc-text-field--no-label .mdc-text-field__input::-webkit-input-placeholder, .mdc-text-field--focused .mdc-text-field__input::-webkit-input-placeholder {
  opacity: 1;
}
.mdc-text-field--no-label .mdc-text-field__input:-ms-input-placeholder, .mdc-text-field--focused .mdc-text-field__input:-ms-input-placeholder {
  opacity: 1;
}
.mdc-text-field--disabled:not(.mdc-text-field--no-label) .mdc-text-field__input.mat-mdc-input-disabled-interactive::placeholder {
  opacity: 0;
}
.mdc-text-field--disabled:not(.mdc-text-field--no-label) .mdc-text-field__input.mat-mdc-input-disabled-interactive::-moz-placeholder {
  opacity: 0;
}
.mdc-text-field--disabled:not(.mdc-text-field--no-label) .mdc-text-field__input.mat-mdc-input-disabled-interactive::-webkit-input-placeholder {
  opacity: 0;
}
.mdc-text-field--disabled:not(.mdc-text-field--no-label) .mdc-text-field__input.mat-mdc-input-disabled-interactive:-ms-input-placeholder {
  opacity: 0;
}
.mdc-text-field--outlined .mdc-text-field__input, .mdc-text-field--filled.mdc-text-field--no-label .mdc-text-field__input {
  height: 100%;
}
.mdc-text-field--outlined .mdc-text-field__input {
  display: flex;
  border: none !important;
  background-color: transparent;
}
.mdc-text-field--disabled .mdc-text-field__input {
  pointer-events: auto;
}
.mdc-text-field--filled:not(.mdc-text-field--disabled) .mdc-text-field__input {
  color: var(--mat-form-field-filled-input-text-color, var(--mat-sys-on-surface));
  caret-color: var(--mat-form-field-filled-caret-color, var(--mat-sys-primary));
}
.mdc-text-field--filled:not(.mdc-text-field--disabled) .mdc-text-field__input::placeholder {
  color: var(--mat-form-field-filled-input-text-placeholder-color, var(--mat-sys-on-surface-variant));
}
.mdc-text-field--filled:not(.mdc-text-field--disabled) .mdc-text-field__input::-moz-placeholder {
  color: var(--mat-form-field-filled-input-text-placeholder-color, var(--mat-sys-on-surface-variant));
}
.mdc-text-field--filled:not(.mdc-text-field--disabled) .mdc-text-field__input::-webkit-input-placeholder {
  color: var(--mat-form-field-filled-input-text-placeholder-color, var(--mat-sys-on-surface-variant));
}
.mdc-text-field--filled:not(.mdc-text-field--disabled) .mdc-text-field__input:-ms-input-placeholder {
  color: var(--mat-form-field-filled-input-text-placeholder-color, var(--mat-sys-on-surface-variant));
}
.mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-text-field__input {
  color: var(--mat-form-field-outlined-input-text-color, var(--mat-sys-on-surface));
  caret-color: var(--mat-form-field-outlined-caret-color, var(--mat-sys-primary));
}
.mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-text-field__input::placeholder {
  color: var(--mat-form-field-outlined-input-text-placeholder-color, var(--mat-sys-on-surface-variant));
}
.mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-text-field__input::-moz-placeholder {
  color: var(--mat-form-field-outlined-input-text-placeholder-color, var(--mat-sys-on-surface-variant));
}
.mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-text-field__input::-webkit-input-placeholder {
  color: var(--mat-form-field-outlined-input-text-placeholder-color, var(--mat-sys-on-surface-variant));
}
.mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-text-field__input:-ms-input-placeholder {
  color: var(--mat-form-field-outlined-input-text-placeholder-color, var(--mat-sys-on-surface-variant));
}
.mdc-text-field--filled.mdc-text-field--invalid:not(.mdc-text-field--disabled) .mdc-text-field__input {
  caret-color: var(--mat-form-field-filled-error-caret-color, var(--mat-sys-error));
}
.mdc-text-field--outlined.mdc-text-field--invalid:not(.mdc-text-field--disabled) .mdc-text-field__input {
  caret-color: var(--mat-form-field-outlined-error-caret-color, var(--mat-sys-error));
}
.mdc-text-field--filled.mdc-text-field--disabled .mdc-text-field__input {
  color: var(--mat-form-field-filled-disabled-input-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
.mdc-text-field--outlined.mdc-text-field--disabled .mdc-text-field__input {
  color: var(--mat-form-field-outlined-disabled-input-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
@media (forced-colors: active) {
  .mdc-text-field--disabled .mdc-text-field__input {
    background-color: Window;
  }
}

.mdc-text-field--filled {
  height: 56px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
  border-top-left-radius: var(--mat-form-field-filled-container-shape, var(--mat-sys-corner-extra-small));
  border-top-right-radius: var(--mat-form-field-filled-container-shape, var(--mat-sys-corner-extra-small));
}
.mdc-text-field--filled:not(.mdc-text-field--disabled) {
  background-color: var(--mat-form-field-filled-container-color, var(--mat-sys-surface-variant));
}
.mdc-text-field--filled.mdc-text-field--disabled {
  background-color: var(--mat-form-field-filled-disabled-container-color, color-mix(in srgb, var(--mat-sys-on-surface) 4%, transparent));
}

.mdc-text-field--outlined {
  height: 56px;
  overflow: visible;
  padding-right: max(16px, var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small)));
  padding-left: max(16px, var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small)) + 4px);
}
[dir=rtl] .mdc-text-field--outlined {
  padding-right: max(16px, var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small)) + 4px);
  padding-left: max(16px, var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small)));
}

.mdc-floating-label {
  position: absolute;
  left: 0;
  transform-origin: left top;
  line-height: 1.15rem;
  text-align: left;
  text-overflow: ellipsis;
  white-space: nowrap;
  cursor: text;
  overflow: hidden;
  will-change: transform;
}
[dir=rtl] .mdc-floating-label {
  right: 0;
  left: auto;
  transform-origin: right top;
  text-align: right;
}
.mdc-text-field .mdc-floating-label {
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
}
.mdc-notched-outline .mdc-floating-label {
  display: inline-block;
  position: relative;
  max-width: 100%;
}
.mdc-text-field--outlined .mdc-floating-label {
  left: 4px;
  right: auto;
}
[dir=rtl] .mdc-text-field--outlined .mdc-floating-label {
  left: auto;
  right: 4px;
}
.mdc-text-field--filled .mdc-floating-label {
  left: 16px;
  right: auto;
}
[dir=rtl] .mdc-text-field--filled .mdc-floating-label {
  left: auto;
  right: 16px;
}
.mdc-text-field--disabled .mdc-floating-label {
  cursor: default;
}
@media (forced-colors: active) {
  .mdc-text-field--disabled .mdc-floating-label {
    z-index: 1;
  }
}
.mdc-text-field--filled.mdc-text-field--no-label .mdc-floating-label {
  display: none;
}
.mdc-text-field--filled:not(.mdc-text-field--disabled) .mdc-floating-label {
  color: var(--mat-form-field-filled-label-text-color, var(--mat-sys-on-surface-variant));
}
.mdc-text-field--filled:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-floating-label {
  color: var(--mat-form-field-filled-focus-label-text-color, var(--mat-sys-primary));
}
.mdc-text-field--filled:not(.mdc-text-field--disabled):not(.mdc-text-field--focused):hover .mdc-floating-label {
  color: var(--mat-form-field-filled-hover-label-text-color, var(--mat-sys-on-surface-variant));
}
.mdc-text-field--filled.mdc-text-field--disabled .mdc-floating-label {
  color: var(--mat-form-field-filled-disabled-label-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
.mdc-text-field--filled:not(.mdc-text-field--disabled).mdc-text-field--invalid .mdc-floating-label {
  color: var(--mat-form-field-filled-error-label-text-color, var(--mat-sys-error));
}
.mdc-text-field--filled:not(.mdc-text-field--disabled).mdc-text-field--invalid.mdc-text-field--focused .mdc-floating-label {
  color: var(--mat-form-field-filled-error-focus-label-text-color, var(--mat-sys-error));
}
.mdc-text-field--filled:not(.mdc-text-field--disabled).mdc-text-field--invalid:not(.mdc-text-field--disabled):hover .mdc-floating-label {
  color: var(--mat-form-field-filled-error-hover-label-text-color, var(--mat-sys-on-error-container));
}
.mdc-text-field--filled .mdc-floating-label {
  font-family: var(--mat-form-field-filled-label-text-font, var(--mat-sys-body-large-font));
  font-size: var(--mat-form-field-filled-label-text-size, var(--mat-sys-body-large-size));
  font-weight: var(--mat-form-field-filled-label-text-weight, var(--mat-sys-body-large-weight));
  letter-spacing: var(--mat-form-field-filled-label-text-tracking, var(--mat-sys-body-large-tracking));
}
.mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-floating-label {
  color: var(--mat-form-field-outlined-label-text-color, var(--mat-sys-on-surface-variant));
}
.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-floating-label {
  color: var(--mat-form-field-outlined-focus-label-text-color, var(--mat-sys-primary));
}
.mdc-text-field--outlined:not(.mdc-text-field--disabled):not(.mdc-text-field--focused):hover .mdc-floating-label {
  color: var(--mat-form-field-outlined-hover-label-text-color, var(--mat-sys-on-surface));
}
.mdc-text-field--outlined.mdc-text-field--disabled .mdc-floating-label {
  color: var(--mat-form-field-outlined-disabled-label-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--invalid .mdc-floating-label {
  color: var(--mat-form-field-outlined-error-label-text-color, var(--mat-sys-error));
}
.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--invalid.mdc-text-field--focused .mdc-floating-label {
  color: var(--mat-form-field-outlined-error-focus-label-text-color, var(--mat-sys-error));
}
.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--invalid:not(.mdc-text-field--disabled):hover .mdc-floating-label {
  color: var(--mat-form-field-outlined-error-hover-label-text-color, var(--mat-sys-on-error-container));
}
.mdc-text-field--outlined .mdc-floating-label {
  font-family: var(--mat-form-field-outlined-label-text-font, var(--mat-sys-body-large-font));
  font-size: var(--mat-form-field-outlined-label-text-size, var(--mat-sys-body-large-size));
  font-weight: var(--mat-form-field-outlined-label-text-weight, var(--mat-sys-body-large-weight));
  letter-spacing: var(--mat-form-field-outlined-label-text-tracking, var(--mat-sys-body-large-tracking));
}

.mdc-floating-label--float-above {
  cursor: auto;
  transform: translateY(-106%) scale(0.75);
}
.mdc-text-field--filled .mdc-floating-label--float-above {
  transform: translateY(-106%) scale(0.75);
}
.mdc-text-field--outlined .mdc-floating-label--float-above {
  transform: translateY(-37.25px) scale(1);
  font-size: 0.75rem;
}
.mdc-notched-outline .mdc-floating-label--float-above {
  text-overflow: clip;
}
.mdc-notched-outline--upgraded .mdc-floating-label--float-above {
  max-width: 133.3333333333%;
}
.mdc-text-field--outlined.mdc-notched-outline--upgraded .mdc-floating-label--float-above, .mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above {
  transform: translateY(-34.75px) scale(0.75);
}
.mdc-text-field--outlined.mdc-notched-outline--upgraded .mdc-floating-label--float-above, .mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above {
  font-size: 1rem;
}

.mdc-floating-label--required:not(.mdc-floating-label--hide-required-marker)::after {
  margin-left: 1px;
  margin-right: 0;
  content: "*";
}
[dir=rtl] .mdc-floating-label--required:not(.mdc-floating-label--hide-required-marker)::after {
  margin-left: 0;
  margin-right: 1px;
}

.mdc-notched-outline {
  display: flex;
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  box-sizing: border-box;
  width: 100%;
  max-width: 100%;
  height: 100%;
  text-align: left;
  pointer-events: none;
}
[dir=rtl] .mdc-notched-outline {
  text-align: right;
}
.mdc-text-field--outlined .mdc-notched-outline {
  z-index: 1;
}

.mat-mdc-notch-piece {
  box-sizing: border-box;
  height: 100%;
  pointer-events: none;
  border: none;
  border-top: 1px solid;
  border-bottom: 1px solid;
}
.mdc-text-field--focused .mat-mdc-notch-piece {
  border-width: 2px;
}
.mdc-text-field--outlined:not(.mdc-text-field--disabled) .mat-mdc-notch-piece {
  border-color: var(--mat-form-field-outlined-outline-color, var(--mat-sys-outline));
  border-width: var(--mat-form-field-outlined-outline-width, 1px);
}
.mdc-text-field--outlined:not(.mdc-text-field--disabled):not(.mdc-text-field--focused):hover .mat-mdc-notch-piece {
  border-color: var(--mat-form-field-outlined-hover-outline-color, var(--mat-sys-on-surface));
}
.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--focused .mat-mdc-notch-piece {
  border-color: var(--mat-form-field-outlined-focus-outline-color, var(--mat-sys-primary));
}
.mdc-text-field--outlined.mdc-text-field--disabled .mat-mdc-notch-piece {
  border-color: var(--mat-form-field-outlined-disabled-outline-color, color-mix(in srgb, var(--mat-sys-on-surface) 12%, transparent));
}
.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--invalid .mat-mdc-notch-piece {
  border-color: var(--mat-form-field-outlined-error-outline-color, var(--mat-sys-error));
}
.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--invalid:not(.mdc-text-field--focused):hover .mdc-notched-outline .mat-mdc-notch-piece {
  border-color: var(--mat-form-field-outlined-error-hover-outline-color, var(--mat-sys-on-error-container));
}
.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--invalid.mdc-text-field--focused .mat-mdc-notch-piece {
  border-color: var(--mat-form-field-outlined-error-focus-outline-color, var(--mat-sys-error));
}
.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-notched-outline .mat-mdc-notch-piece {
  border-width: var(--mat-form-field-outlined-focus-outline-width, 2px);
}

.mdc-notched-outline__leading {
  border-left: 1px solid;
  border-right: none;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  border-top-left-radius: var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small));
  border-bottom-left-radius: var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small));
}
.mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__leading {
  width: max(12px, var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small)));
}
[dir=rtl] .mdc-notched-outline__leading {
  border-left: none;
  border-right: 1px solid;
  border-bottom-left-radius: 0;
  border-top-left-radius: 0;
  border-top-right-radius: var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small));
  border-bottom-right-radius: var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small));
}

.mdc-notched-outline__trailing {
  flex-grow: 1;
  border-left: none;
  border-right: 1px solid;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  border-top-right-radius: var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small));
  border-bottom-right-radius: var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small));
}
[dir=rtl] .mdc-notched-outline__trailing {
  border-left: 1px solid;
  border-right: none;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  border-top-left-radius: var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small));
  border-bottom-left-radius: var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small));
}

.mdc-notched-outline__notch {
  flex: 0 0 auto;
  width: auto;
}
.mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__notch {
  max-width: min(var(--mat-form-field-notch-max-width, 100%), calc(100% - max(12px, var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small))) * 2));
}
.mdc-text-field--outlined .mdc-notched-outline--notched .mdc-notched-outline__notch {
  max-width: min(100%, calc(100% - max(12px, var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small))) * 2));
}
.mdc-text-field--outlined .mdc-notched-outline--notched .mdc-notched-outline__notch {
  padding-top: 1px;
}
.mdc-text-field--focused.mdc-text-field--outlined .mdc-notched-outline--notched .mdc-notched-outline__notch {
  padding-top: 2px;
}
.mdc-notched-outline--notched .mdc-notched-outline__notch {
  padding-left: 0;
  padding-right: 8px;
  border-top: none;
}
[dir=rtl] .mdc-notched-outline--notched .mdc-notched-outline__notch {
  padding-left: 8px;
  padding-right: 0;
}
.mdc-notched-outline--no-label .mdc-notched-outline__notch {
  display: none;
}

.mdc-line-ripple::before, .mdc-line-ripple::after {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  border-bottom-style: solid;
  content: "";
}
.mdc-line-ripple::before {
  z-index: 1;
  border-bottom-width: var(--mat-form-field-filled-active-indicator-height, 1px);
}
.mdc-text-field--filled:not(.mdc-text-field--disabled) .mdc-line-ripple::before {
  border-bottom-color: var(--mat-form-field-filled-active-indicator-color, var(--mat-sys-on-surface-variant));
}
.mdc-text-field--filled:not(.mdc-text-field--disabled):not(.mdc-text-field--focused):hover .mdc-line-ripple::before {
  border-bottom-color: var(--mat-form-field-filled-hover-active-indicator-color, var(--mat-sys-on-surface));
}
.mdc-text-field--filled.mdc-text-field--disabled .mdc-line-ripple::before {
  border-bottom-color: var(--mat-form-field-filled-disabled-active-indicator-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
.mdc-text-field--filled:not(.mdc-text-field--disabled).mdc-text-field--invalid .mdc-line-ripple::before {
  border-bottom-color: var(--mat-form-field-filled-error-active-indicator-color, var(--mat-sys-error));
}
.mdc-text-field--filled:not(.mdc-text-field--disabled).mdc-text-field--invalid:not(.mdc-text-field--focused):hover .mdc-line-ripple::before {
  border-bottom-color: var(--mat-form-field-filled-error-hover-active-indicator-color, var(--mat-sys-on-error-container));
}
.mdc-line-ripple::after {
  transform: scaleX(0);
  opacity: 0;
  z-index: 2;
}
.mdc-text-field--filled .mdc-line-ripple::after {
  border-bottom-width: var(--mat-form-field-filled-focus-active-indicator-height, 2px);
}
.mdc-text-field--filled:not(.mdc-text-field--disabled) .mdc-line-ripple::after {
  border-bottom-color: var(--mat-form-field-filled-focus-active-indicator-color, var(--mat-sys-primary));
}
.mdc-text-field--filled.mdc-text-field--invalid:not(.mdc-text-field--disabled) .mdc-line-ripple::after {
  border-bottom-color: var(--mat-form-field-filled-error-focus-active-indicator-color, var(--mat-sys-error));
}

.mdc-line-ripple--active::after {
  transform: scaleX(1);
  opacity: 1;
}

.mdc-line-ripple--deactivating::after {
  opacity: 0;
}

.mdc-text-field--disabled {
  pointer-events: none;
}

.mat-mdc-form-field-textarea-control {
  vertical-align: middle;
  resize: vertical;
  box-sizing: border-box;
  height: auto;
  margin: 0;
  padding: 0;
  border: none;
  overflow: auto;
}

.mat-mdc-form-field-input-control.mat-mdc-form-field-input-control {
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  font: inherit;
  letter-spacing: inherit;
  text-decoration: inherit;
  text-transform: inherit;
  border: none;
}

.mat-mdc-form-field .mat-mdc-floating-label.mdc-floating-label {
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  line-height: normal;
  pointer-events: all;
  will-change: auto;
}

.mat-mdc-form-field:not(.mat-form-field-disabled) .mat-mdc-floating-label.mdc-floating-label {
  cursor: inherit;
}

.mdc-text-field--no-label:not(.mdc-text-field--textarea) .mat-mdc-form-field-input-control.mdc-text-field__input,
.mat-mdc-text-field-wrapper .mat-mdc-form-field-input-control {
  height: auto;
}

.mat-mdc-text-field-wrapper .mat-mdc-form-field-input-control.mdc-text-field__input[type=color] {
  height: 23px;
}

.mat-mdc-text-field-wrapper {
  height: auto;
  flex: auto;
  will-change: auto;
}

.mat-mdc-form-field-has-icon-prefix .mat-mdc-text-field-wrapper {
  padding-left: 0;
  --mat-mdc-form-field-label-offset-x: -16px;
}

.mat-mdc-form-field-has-icon-suffix .mat-mdc-text-field-wrapper {
  padding-right: 0;
}

[dir=rtl] .mat-mdc-text-field-wrapper {
  padding-left: 16px;
  padding-right: 16px;
}
[dir=rtl] .mat-mdc-form-field-has-icon-suffix .mat-mdc-text-field-wrapper {
  padding-left: 0;
}
[dir=rtl] .mat-mdc-form-field-has-icon-prefix .mat-mdc-text-field-wrapper {
  padding-right: 0;
}

.mat-form-field-disabled .mdc-text-field__input::placeholder {
  color: var(--mat-form-field-disabled-input-text-placeholder-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
.mat-form-field-disabled .mdc-text-field__input::-moz-placeholder {
  color: var(--mat-form-field-disabled-input-text-placeholder-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
.mat-form-field-disabled .mdc-text-field__input::-webkit-input-placeholder {
  color: var(--mat-form-field-disabled-input-text-placeholder-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
.mat-form-field-disabled .mdc-text-field__input:-ms-input-placeholder {
  color: var(--mat-form-field-disabled-input-text-placeholder-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}

.mat-mdc-form-field-label-always-float .mdc-text-field__input::placeholder {
  transition-delay: 40ms;
  transition-duration: 110ms;
  opacity: 1;
}

.mat-mdc-text-field-wrapper .mat-mdc-form-field-infix .mat-mdc-floating-label {
  left: auto;
  right: auto;
}

.mat-mdc-text-field-wrapper.mdc-text-field--outlined .mdc-text-field__input {
  display: inline-block;
}

.mat-mdc-form-field .mat-mdc-text-field-wrapper.mdc-text-field .mdc-notched-outline__notch {
  padding-top: 0;
}

.mat-mdc-form-field.mat-mdc-form-field.mat-mdc-form-field.mat-mdc-form-field.mat-mdc-form-field.mat-mdc-form-field .mdc-notched-outline__notch {
  border-left: 1px solid transparent;
}

[dir=rtl] .mat-mdc-form-field.mat-mdc-form-field.mat-mdc-form-field.mat-mdc-form-field.mat-mdc-form-field.mat-mdc-form-field .mdc-notched-outline__notch {
  border-left: none;
  border-right: 1px solid transparent;
}

.mat-mdc-form-field-infix {
  min-height: var(--mat-form-field-container-height, 56px);
  padding-top: var(--mat-form-field-filled-with-label-container-padding-top, 24px);
  padding-bottom: var(--mat-form-field-filled-with-label-container-padding-bottom, 8px);
}
.mdc-text-field--outlined .mat-mdc-form-field-infix, .mdc-text-field--no-label .mat-mdc-form-field-infix {
  padding-top: var(--mat-form-field-container-vertical-padding, 16px);
  padding-bottom: var(--mat-form-field-container-vertical-padding, 16px);
}

.mat-mdc-text-field-wrapper .mat-mdc-form-field-flex .mat-mdc-floating-label {
  top: calc(var(--mat-form-field-container-height, 56px) / 2);
}

.mdc-text-field--filled .mat-mdc-floating-label {
  display: var(--mat-form-field-filled-label-display, block);
}

.mat-mdc-text-field-wrapper.mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above {
  --mat-mdc-form-field-label-transform: translateY(calc(calc(6.75px + var(--mat-form-field-container-height, 56px) / 2) * -1))
    scale(var(--mat-mdc-form-field-floating-label-scale, 0.75));
  transform: var(--mat-mdc-form-field-label-transform);
}

@keyframes _mat-form-field-subscript-animation {
  from {
    opacity: 0;
    transform: translateY(-5px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.mat-mdc-form-field-subscript-wrapper {
  box-sizing: border-box;
  width: 100%;
  position: relative;
}

.mat-mdc-form-field-hint-wrapper,
.mat-mdc-form-field-error-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  padding: 0 16px;
  opacity: 1;
  transform: translateY(0);
  animation: _mat-form-field-subscript-animation 0ms cubic-bezier(0.55, 0, 0.55, 0.2);
}

.mat-mdc-form-field-subscript-dynamic-size .mat-mdc-form-field-hint-wrapper,
.mat-mdc-form-field-subscript-dynamic-size .mat-mdc-form-field-error-wrapper {
  position: static;
}

.mat-mdc-form-field-bottom-align::before {
  content: "";
  display: inline-block;
  height: 16px;
}

.mat-mdc-form-field-bottom-align.mat-mdc-form-field-subscript-dynamic-size::before {
  content: unset;
}

.mat-mdc-form-field-hint-end {
  order: 1;
}

.mat-mdc-form-field-hint-wrapper {
  display: flex;
}

.mat-mdc-form-field-hint-spacer {
  flex: 1 0 1em;
}

.mat-mdc-form-field-error {
  display: block;
  color: var(--mat-form-field-error-text-color, var(--mat-sys-error));
}

.mat-mdc-form-field-subscript-wrapper,
.mat-mdc-form-field-bottom-align::before {
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  font-family: var(--mat-form-field-subscript-text-font, var(--mat-sys-body-small-font));
  line-height: var(--mat-form-field-subscript-text-line-height, var(--mat-sys-body-small-line-height));
  font-size: var(--mat-form-field-subscript-text-size, var(--mat-sys-body-small-size));
  letter-spacing: var(--mat-form-field-subscript-text-tracking, var(--mat-sys-body-small-tracking));
  font-weight: var(--mat-form-field-subscript-text-weight, var(--mat-sys-body-small-weight));
}

.mat-mdc-form-field-focus-overlay {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  opacity: 0;
  pointer-events: none;
  background-color: var(--mat-form-field-state-layer-color, var(--mat-sys-on-surface));
}
.mat-mdc-text-field-wrapper:hover .mat-mdc-form-field-focus-overlay {
  opacity: var(--mat-form-field-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity));
}
.mat-mdc-form-field.mat-focused .mat-mdc-form-field-focus-overlay {
  opacity: var(--mat-form-field-focus-state-layer-opacity, 0);
}

select.mat-mdc-form-field-input-control {
  -moz-appearance: none;
  -webkit-appearance: none;
  background-color: transparent;
  display: inline-flex;
  box-sizing: border-box;
}
select.mat-mdc-form-field-input-control:not(:disabled) {
  cursor: pointer;
}
select.mat-mdc-form-field-input-control:not(.mat-mdc-native-select-inline) option {
  color: var(--mat-form-field-select-option-text-color, var(--mat-sys-neutral10));
}
select.mat-mdc-form-field-input-control:not(.mat-mdc-native-select-inline) option:disabled {
  color: var(--mat-form-field-select-disabled-option-text-color, color-mix(in srgb, var(--mat-sys-neutral10) 38%, transparent));
}

.mat-mdc-form-field-type-mat-native-select .mat-mdc-form-field-infix::after {
  content: "";
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-top: 5px solid;
  position: absolute;
  right: 0;
  top: 50%;
  margin-top: -2.5px;
  pointer-events: none;
  color: var(--mat-form-field-enabled-select-arrow-color, var(--mat-sys-on-surface-variant));
}
[dir=rtl] .mat-mdc-form-field-type-mat-native-select .mat-mdc-form-field-infix::after {
  right: auto;
  left: 0;
}
.mat-mdc-form-field-type-mat-native-select.mat-focused .mat-mdc-form-field-infix::after {
  color: var(--mat-form-field-focus-select-arrow-color, var(--mat-sys-primary));
}
.mat-mdc-form-field-type-mat-native-select.mat-form-field-disabled .mat-mdc-form-field-infix::after {
  color: var(--mat-form-field-disabled-select-arrow-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
.mat-mdc-form-field-type-mat-native-select .mat-mdc-form-field-input-control {
  padding-right: 15px;
}
[dir=rtl] .mat-mdc-form-field-type-mat-native-select .mat-mdc-form-field-input-control {
  padding-right: 0;
  padding-left: 15px;
}

@media (forced-colors: active) {
  .mat-form-field-appearance-fill .mat-mdc-text-field-wrapper {
    outline: solid 1px;
  }
}
@media (forced-colors: active) {
  .mat-form-field-appearance-fill.mat-form-field-disabled .mat-mdc-text-field-wrapper {
    outline-color: GrayText;
  }
}

@media (forced-colors: active) {
  .mat-form-field-appearance-fill.mat-focused .mat-mdc-text-field-wrapper {
    outline: dashed 3px;
  }
}

@media (forced-colors: active) {
  .mat-mdc-form-field.mat-focused .mdc-notched-outline {
    border: dashed 3px;
  }
}

.mat-mdc-form-field-input-control[type=date], .mat-mdc-form-field-input-control[type=datetime], .mat-mdc-form-field-input-control[type=datetime-local], .mat-mdc-form-field-input-control[type=month], .mat-mdc-form-field-input-control[type=week], .mat-mdc-form-field-input-control[type=time] {
  line-height: 1;
}
.mat-mdc-form-field-input-control::-webkit-datetime-edit {
  line-height: 1;
  padding: 0;
  margin-bottom: -2px;
}

.mat-mdc-form-field {
  --mat-mdc-form-field-floating-label-scale: 0.75;
  display: inline-flex;
  flex-direction: column;
  min-width: 0;
  text-align: left;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  font-family: var(--mat-form-field-container-text-font, var(--mat-sys-body-large-font));
  line-height: var(--mat-form-field-container-text-line-height, var(--mat-sys-body-large-line-height));
  font-size: var(--mat-form-field-container-text-size, var(--mat-sys-body-large-size));
  letter-spacing: var(--mat-form-field-container-text-tracking, var(--mat-sys-body-large-tracking));
  font-weight: var(--mat-form-field-container-text-weight, var(--mat-sys-body-large-weight));
}
.mat-mdc-form-field .mdc-text-field--outlined .mdc-floating-label--float-above {
  font-size: calc(var(--mat-form-field-outlined-label-text-populated-size) * var(--mat-mdc-form-field-floating-label-scale));
}
.mat-mdc-form-field .mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above {
  font-size: var(--mat-form-field-outlined-label-text-populated-size);
}
[dir=rtl] .mat-mdc-form-field {
  text-align: right;
}

.mat-mdc-form-field-flex {
  display: inline-flex;
  align-items: baseline;
  box-sizing: border-box;
  width: 100%;
}

.mat-mdc-text-field-wrapper {
  width: 100%;
  z-index: 0;
}

.mat-mdc-form-field-icon-prefix,
.mat-mdc-form-field-icon-suffix {
  align-self: center;
  line-height: 0;
  pointer-events: auto;
  position: relative;
  z-index: 1;
}
.mat-mdc-form-field-icon-prefix > .mat-icon,
.mat-mdc-form-field-icon-suffix > .mat-icon {
  padding: 0 12px;
  box-sizing: content-box;
}

.mat-mdc-form-field-icon-prefix {
  color: var(--mat-form-field-leading-icon-color, var(--mat-sys-on-surface-variant));
}
.mat-form-field-disabled .mat-mdc-form-field-icon-prefix {
  color: var(--mat-form-field-disabled-leading-icon-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}

.mat-mdc-form-field-icon-suffix {
  color: var(--mat-form-field-trailing-icon-color, var(--mat-sys-on-surface-variant));
}
.mat-form-field-disabled .mat-mdc-form-field-icon-suffix {
  color: var(--mat-form-field-disabled-trailing-icon-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
.mat-form-field-invalid .mat-mdc-form-field-icon-suffix {
  color: var(--mat-form-field-error-trailing-icon-color, var(--mat-sys-error));
}
.mat-form-field-invalid:not(.mat-focused):not(.mat-form-field-disabled) .mat-mdc-text-field-wrapper:hover .mat-mdc-form-field-icon-suffix {
  color: var(--mat-form-field-error-hover-trailing-icon-color, var(--mat-sys-on-error-container));
}
.mat-form-field-invalid.mat-focused .mat-mdc-text-field-wrapper .mat-mdc-form-field-icon-suffix {
  color: var(--mat-form-field-error-focus-trailing-icon-color, var(--mat-sys-error));
}

.mat-mdc-form-field-icon-prefix,
[dir=rtl] .mat-mdc-form-field-icon-suffix {
  padding: 0 4px 0 0;
}

.mat-mdc-form-field-icon-suffix,
[dir=rtl] .mat-mdc-form-field-icon-prefix {
  padding: 0 0 0 4px;
}

.mat-mdc-form-field-subscript-wrapper .mat-icon,
.mat-mdc-form-field label .mat-icon {
  width: 1em;
  height: 1em;
  font-size: inherit;
}

.mat-mdc-form-field-infix {
  flex: auto;
  min-width: 0;
  width: 180px;
  position: relative;
  box-sizing: border-box;
}
.mat-mdc-form-field-infix:has(textarea[cols]) {
  width: auto;
}

.mat-mdc-form-field .mdc-notched-outline__notch {
  margin-left: -1px;
  -webkit-clip-path: inset(-9em -999em -9em 1px);
  clip-path: inset(-9em -999em -9em 1px);
}
[dir=rtl] .mat-mdc-form-field .mdc-notched-outline__notch {
  margin-left: 0;
  margin-right: -1px;
  -webkit-clip-path: inset(-9em 1px -9em -999em);
  clip-path: inset(-9em 1px -9em -999em);
}

.mat-mdc-form-field.mat-form-field-animations-enabled .mdc-floating-label {
  transition: transform 150ms cubic-bezier(0.4, 0, 0.2, 1), color 150ms cubic-bezier(0.4, 0, 0.2, 1);
}
.mat-mdc-form-field.mat-form-field-animations-enabled .mdc-text-field__input {
  transition: opacity 150ms cubic-bezier(0.4, 0, 0.2, 1);
}
.mat-mdc-form-field.mat-form-field-animations-enabled .mdc-text-field__input::placeholder {
  transition: opacity 67ms cubic-bezier(0.4, 0, 0.2, 1);
}
.mat-mdc-form-field.mat-form-field-animations-enabled .mdc-text-field__input::-moz-placeholder {
  transition: opacity 67ms cubic-bezier(0.4, 0, 0.2, 1);
}
.mat-mdc-form-field.mat-form-field-animations-enabled .mdc-text-field__input::-webkit-input-placeholder {
  transition: opacity 67ms cubic-bezier(0.4, 0, 0.2, 1);
}
.mat-mdc-form-field.mat-form-field-animations-enabled .mdc-text-field__input:-ms-input-placeholder {
  transition: opacity 67ms cubic-bezier(0.4, 0, 0.2, 1);
}
.mat-mdc-form-field.mat-form-field-animations-enabled.mdc-text-field--no-label .mdc-text-field__input::placeholder, .mat-mdc-form-field.mat-form-field-animations-enabled.mdc-text-field--focused .mdc-text-field__input::placeholder {
  transition-delay: 40ms;
  transition-duration: 110ms;
}
.mat-mdc-form-field.mat-form-field-animations-enabled.mdc-text-field--no-label .mdc-text-field__input::-moz-placeholder, .mat-mdc-form-field.mat-form-field-animations-enabled.mdc-text-field--focused .mdc-text-field__input::-moz-placeholder {
  transition-delay: 40ms;
  transition-duration: 110ms;
}
.mat-mdc-form-field.mat-form-field-animations-enabled.mdc-text-field--no-label .mdc-text-field__input::-webkit-input-placeholder, .mat-mdc-form-field.mat-form-field-animations-enabled.mdc-text-field--focused .mdc-text-field__input::-webkit-input-placeholder {
  transition-delay: 40ms;
  transition-duration: 110ms;
}
.mat-mdc-form-field.mat-form-field-animations-enabled.mdc-text-field--no-label .mdc-text-field__input:-ms-input-placeholder, .mat-mdc-form-field.mat-form-field-animations-enabled.mdc-text-field--focused .mdc-text-field__input:-ms-input-placeholder {
  transition-delay: 40ms;
  transition-duration: 110ms;
}
.mat-mdc-form-field.mat-form-field-animations-enabled .mdc-text-field--filled:not(.mdc-ripple-upgraded):focus .mdc-text-field__ripple::before {
  transition-duration: 75ms;
}
.mat-mdc-form-field.mat-form-field-animations-enabled .mdc-line-ripple::after {
  transition: transform 180ms cubic-bezier(0.4, 0, 0.2, 1), opacity 180ms cubic-bezier(0.4, 0, 0.2, 1);
}
.mat-mdc-form-field.mat-form-field-animations-enabled .mat-mdc-form-field-hint-wrapper,
.mat-mdc-form-field.mat-form-field-animations-enabled .mat-mdc-form-field-error-wrapper {
  animation-duration: 300ms;
}

.mdc-notched-outline .mdc-floating-label {
  max-width: calc(100% + 1px);
}

.mdc-notched-outline--upgraded .mdc-floating-label--float-above {
  max-width: calc(133.3333333333% + 1px);
}
`],encapsulation:2,changeDetection:0})}return n})();var ni=(function(n){return n[n.FADING_IN=0]="FADING_IN",n[n.VISIBLE=1]="VISIBLE",n[n.FADING_OUT=2]="FADING_OUT",n[n.HIDDEN=3]="HIDDEN",n})(ni||{}),W_=class{_renderer;element;config;_animationForciblyDisabledThroughCss;state=ni.HIDDEN;constructor(t,e,i,r=!1){this._renderer=t,this.element=e,this.config=i,this._animationForciblyDisabledThroughCss=r}fadeOut(){this._renderer.fadeOutRipple(this)}},nM=Oa({passive:!0,capture:!0}),G_=class{_events=new Map;addHandler(t,e,i,r){let o=this._events.get(e);if(o){let s=o.get(i);s?s.add(r):o.set(i,new Set([r]))}else this._events.set(e,new Map([[i,new Set([r])]])),t.runOutsideAngular(()=>{document.addEventListener(e,this._delegateEventHandler,nM)})}removeHandler(t,e,i){let r=this._events.get(t);if(!r)return;let o=r.get(e);o&&(o.delete(i),o.size===0&&r.delete(e),r.size===0&&(this._events.delete(t),document.removeEventListener(t,this._delegateEventHandler,nM)))}_delegateEventHandler=t=>{let e=dn(t);e&&this._events.get(t.type)?.forEach((i,r)=>{(r===e||r.contains(e))&&i.forEach(o=>o.handleEvent(t))})}},iM={enterDuration:225,exitDuration:150},qB=800,rM=Oa({passive:!0,capture:!0}),oM=["mousedown","touchstart"],sM=["mouseup","mouseleave","touchend","touchcancel"],KB=(()=>{class n{static \u0275fac=function(i){return new(i||n)};static \u0275cmp=J({type:n,selectors:[["ng-component"]],hostAttrs:["mat-ripple-style-loader",""],decls:0,vars:0,template:function(i,r){},styles:[`.mat-ripple {
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
`],encapsulation:2,changeDetection:0})}return n})(),q_=class n{_target;_ngZone;_platform;_containerElement;_triggerElement=null;_isPointerDown=!1;_activeRipples=new Map;_mostRecentTransientRipple=null;_lastTouchStartEvent;_pointerUpEventsRegistered=!1;_containerRect=null;static _eventManager=new G_;constructor(t,e,i,r,o){this._target=t,this._ngZone=e,this._platform=r,r.isBrowser&&(this._containerElement=ei(i)),o&&o.get(Cn).load(KB)}fadeInRipple(t,e,i={}){let r=this._containerRect=this._containerRect||this._containerElement.getBoundingClientRect(),o=g(g({},iM),i.animation);i.centered&&(t=r.left+r.width/2,e=r.top+r.height/2);let s=i.radius||YB(t,e,r),a=t-r.left,l=e-r.top,c=o.enterDuration,d=document.createElement("div");d.classList.add("mat-ripple-element"),d.style.left=`${a-s}px`,d.style.top=`${l-s}px`,d.style.height=`${s*2}px`,d.style.width=`${s*2}px`,i.color!=null&&(d.style.backgroundColor=i.color),d.style.transitionDuration=`${c}ms`,this._containerElement.appendChild(d);let u=window.getComputedStyle(d),h=u.transitionProperty,p=u.transitionDuration,m=h==="none"||p==="0s"||p==="0s, 0s"||r.width===0&&r.height===0,w=new W_(this,d,i,m);d.style.transform="scale3d(1, 1, 1)",w.state=ni.FADING_IN,i.persistent||(this._mostRecentTransientRipple=w);let k=null;return!m&&(c||o.exitDuration)&&this._ngZone.runOutsideAngular(()=>{let N=()=>{k&&(k.fallbackTimer=null),clearTimeout(nt),this._finishRippleTransition(w)},De=()=>this._destroyRipple(w),nt=setTimeout(De,c+100);d.addEventListener("transitionend",N),d.addEventListener("transitioncancel",De),k={onTransitionEnd:N,onTransitionCancel:De,fallbackTimer:nt}}),this._activeRipples.set(w,k),(m||!c)&&this._finishRippleTransition(w),w}fadeOutRipple(t){if(t.state===ni.FADING_OUT||t.state===ni.HIDDEN)return;let e=t.element,i=g(g({},iM),t.config.animation);e.style.transitionDuration=`${i.exitDuration}ms`,e.style.opacity="0",t.state=ni.FADING_OUT,(t._animationForciblyDisabledThroughCss||!i.exitDuration)&&this._finishRippleTransition(t)}fadeOutAll(){this._getActiveRipples().forEach(t=>t.fadeOut())}fadeOutAllNonPersistent(){this._getActiveRipples().forEach(t=>{t.config.persistent||t.fadeOut()})}setupTriggerEvents(t){let e=ei(t);!this._platform.isBrowser||!e||e===this._triggerElement||(this._removeTriggerEvents(),this._triggerElement=e,oM.forEach(i=>{n._eventManager.addHandler(this._ngZone,i,e,this)}))}handleEvent(t){t.type==="mousedown"?this._onMousedown(t):t.type==="touchstart"?this._onTouchStart(t):this._onPointerUp(),this._pointerUpEventsRegistered||(this._ngZone.runOutsideAngular(()=>{sM.forEach(e=>{this._triggerElement.addEventListener(e,this,rM)})}),this._pointerUpEventsRegistered=!0)}_finishRippleTransition(t){t.state===ni.FADING_IN?this._startFadeOutTransition(t):t.state===ni.FADING_OUT&&this._destroyRipple(t)}_startFadeOutTransition(t){let e=t===this._mostRecentTransientRipple,{persistent:i}=t.config;t.state=ni.VISIBLE,!i&&(!e||!this._isPointerDown)&&t.fadeOut()}_destroyRipple(t){let e=this._activeRipples.get(t)??null;this._activeRipples.delete(t),this._activeRipples.size||(this._containerRect=null),t===this._mostRecentTransientRipple&&(this._mostRecentTransientRipple=null),t.state=ni.HIDDEN,e!==null&&(t.element.removeEventListener("transitionend",e.onTransitionEnd),t.element.removeEventListener("transitioncancel",e.onTransitionCancel),e.fallbackTimer!==null&&clearTimeout(e.fallbackTimer)),t.element.remove()}_onMousedown(t){let e=us(t),i=this._lastTouchStartEvent&&Date.now()<this._lastTouchStartEvent+qB;!this._target.rippleDisabled&&!e&&!i&&(this._isPointerDown=!0,this.fadeInRipple(t.clientX,t.clientY,this._target.rippleConfig))}_onTouchStart(t){if(!this._target.rippleDisabled&&!fs(t)){this._lastTouchStartEvent=Date.now(),this._isPointerDown=!0;let e=t.changedTouches;if(e)for(let i=0;i<e.length;i++)this.fadeInRipple(e[i].clientX,e[i].clientY,this._target.rippleConfig)}}_onPointerUp(){this._isPointerDown&&(this._isPointerDown=!1,this._getActiveRipples().forEach(t=>{let e=t.state===ni.VISIBLE||t.config.terminateOnPointerUp&&t.state===ni.FADING_IN;!t.config.persistent&&e&&t.fadeOut()}))}_getActiveRipples(){return Array.from(this._activeRipples.keys())}_removeTriggerEvents(){let t=this._triggerElement;t&&(oM.forEach(e=>n._eventManager.removeHandler(e,t,this)),this._pointerUpEventsRegistered&&(sM.forEach(e=>t.removeEventListener(e,this,rM)),this._pointerUpEventsRegistered=!1))}};function YB(n,t,e){let i=Math.max(Math.abs(n-e.left),Math.abs(n-e.right)),r=Math.max(Math.abs(t-e.top),Math.abs(t-e.bottom));return Math.sqrt(i*i+r*r)}var aM=new b("mat-ripple-global-options"),Cs=(()=>{class n{_elementRef=f(z);_animationsDisabled=At();color;unbounded=!1;centered=!1;radius=0;animation;get disabled(){return this._disabled}set disabled(e){e&&this.fadeOutAllNonPersistent(),this._disabled=e,this._setupTriggerEventsIfEnabled()}_disabled=!1;get trigger(){return this._trigger||this._elementRef.nativeElement}set trigger(e){this._trigger=e,this._setupTriggerEventsIfEnabled()}_trigger;_rippleRenderer;_globalOptions;_isInitialized=!1;constructor(){let e=f(L),i=f(He),r=f(aM,{optional:!0}),o=f(re);this._globalOptions=r||{},this._rippleRenderer=new q_(this,e,this._elementRef,i,o)}ngOnInit(){this._isInitialized=!0,this._setupTriggerEventsIfEnabled()}ngOnDestroy(){this._rippleRenderer._removeTriggerEvents()}fadeOutAll(){this._rippleRenderer.fadeOutAll()}fadeOutAllNonPersistent(){this._rippleRenderer.fadeOutAllNonPersistent()}get rippleConfig(){return{centered:this.centered,radius:this.radius,color:this.color,animation:g(g(g({},this._globalOptions.animation),this._animationsDisabled?{enterDuration:0,exitDuration:0}:{}),this.animation),terminateOnPointerUp:this._globalOptions.terminateOnPointerUp}}get rippleDisabled(){return this.disabled||!!this._globalOptions.disabled}_setupTriggerEventsIfEnabled(){!this.disabled&&this._isInitialized&&this._rippleRenderer.setupTriggerEvents(this.trigger)}launch(e,i=0,r){return typeof e=="number"?this._rippleRenderer.fadeInRipple(e,i,g(g({},this.rippleConfig),r)):this._rippleRenderer.fadeInRipple(0,0,g(g({},this.rippleConfig),e))}static \u0275fac=function(i){return new(i||n)};static \u0275dir=Y({type:n,selectors:[["","mat-ripple",""],["","matRipple",""]],hostAttrs:[1,"mat-ripple"],hostVars:2,hostBindings:function(i,r){i&2&&ye("mat-ripple-unbounded",r.unbounded)},inputs:{color:[0,"matRippleColor","color"],unbounded:[0,"matRippleUnbounded","unbounded"],centered:[0,"matRippleCentered","centered"],radius:[0,"matRippleRadius","radius"],animation:[0,"matRippleAnimation","animation"],disabled:[0,"matRippleDisabled","disabled"],trigger:[0,"matRippleTrigger","trigger"]},exportAs:["matRipple"]})}return n})();var lM=(()=>{class n{_animationsDisabled=At();state="unchecked";disabled=!1;appearance="full";constructor(){}static \u0275fac=function(i){return new(i||n)};static \u0275cmp=J({type:n,selectors:[["mat-pseudo-checkbox"]],hostAttrs:[1,"mat-pseudo-checkbox"],hostVars:12,hostBindings:function(i,r){i&2&&ye("mat-pseudo-checkbox-indeterminate",r.state==="indeterminate")("mat-pseudo-checkbox-checked",r.state==="checked")("mat-pseudo-checkbox-disabled",r.disabled)("mat-pseudo-checkbox-minimal",r.appearance==="minimal")("mat-pseudo-checkbox-full",r.appearance==="full")("_mat-animation-noopable",r._animationsDisabled)},inputs:{state:"state",disabled:"disabled",appearance:"appearance"},decls:0,vars:0,template:function(i,r){},styles:[`.mat-pseudo-checkbox {
  border-radius: 2px;
  cursor: pointer;
  display: inline-block;
  vertical-align: middle;
  box-sizing: border-box;
  position: relative;
  flex-shrink: 0;
  transition: border-color 90ms cubic-bezier(0, 0, 0.2, 0.1), background-color 90ms cubic-bezier(0, 0, 0.2, 0.1);
}
.mat-pseudo-checkbox::after {
  position: absolute;
  opacity: 0;
  content: "";
  border-bottom: 2px solid currentColor;
  transition: opacity 90ms cubic-bezier(0, 0, 0.2, 0.1);
}
.mat-pseudo-checkbox._mat-animation-noopable {
  transition: none !important;
  animation: none !important;
}
.mat-pseudo-checkbox._mat-animation-noopable::after {
  transition: none;
}

.mat-pseudo-checkbox-disabled {
  cursor: default;
}

.mat-pseudo-checkbox-indeterminate::after {
  left: 1px;
  opacity: 1;
  border-radius: 2px;
}

.mat-pseudo-checkbox-checked::after {
  left: 1px;
  border-left: 2px solid currentColor;
  transform: rotate(-45deg);
  opacity: 1;
  box-sizing: content-box;
}

.mat-pseudo-checkbox-minimal.mat-pseudo-checkbox-checked::after, .mat-pseudo-checkbox-minimal.mat-pseudo-checkbox-indeterminate::after {
  color: var(--mat-pseudo-checkbox-minimal-selected-checkmark-color, var(--mat-sys-primary));
}
.mat-pseudo-checkbox-minimal.mat-pseudo-checkbox-checked.mat-pseudo-checkbox-disabled::after, .mat-pseudo-checkbox-minimal.mat-pseudo-checkbox-indeterminate.mat-pseudo-checkbox-disabled::after {
  color: var(--mat-pseudo-checkbox-minimal-disabled-selected-checkmark-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}

.mat-pseudo-checkbox-full {
  border-color: var(--mat-pseudo-checkbox-full-unselected-icon-color, var(--mat-sys-on-surface-variant));
  border-width: 2px;
  border-style: solid;
}
.mat-pseudo-checkbox-full.mat-pseudo-checkbox-disabled {
  border-color: var(--mat-pseudo-checkbox-full-disabled-unselected-icon-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
.mat-pseudo-checkbox-full.mat-pseudo-checkbox-checked, .mat-pseudo-checkbox-full.mat-pseudo-checkbox-indeterminate {
  background-color: var(--mat-pseudo-checkbox-full-selected-icon-color, var(--mat-sys-primary));
  border-color: transparent;
}
.mat-pseudo-checkbox-full.mat-pseudo-checkbox-checked::after, .mat-pseudo-checkbox-full.mat-pseudo-checkbox-indeterminate::after {
  color: var(--mat-pseudo-checkbox-full-selected-checkmark-color, var(--mat-sys-on-primary));
}
.mat-pseudo-checkbox-full.mat-pseudo-checkbox-checked.mat-pseudo-checkbox-disabled, .mat-pseudo-checkbox-full.mat-pseudo-checkbox-indeterminate.mat-pseudo-checkbox-disabled {
  background-color: var(--mat-pseudo-checkbox-full-disabled-selected-icon-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
.mat-pseudo-checkbox-full.mat-pseudo-checkbox-checked.mat-pseudo-checkbox-disabled::after, .mat-pseudo-checkbox-full.mat-pseudo-checkbox-indeterminate.mat-pseudo-checkbox-disabled::after {
  color: var(--mat-pseudo-checkbox-full-disabled-selected-checkmark-color, var(--mat-sys-surface));
}

.mat-pseudo-checkbox {
  width: 18px;
  height: 18px;
}

.mat-pseudo-checkbox-minimal.mat-pseudo-checkbox-checked::after {
  width: 14px;
  height: 6px;
  transform-origin: center;
  top: -4.2426406871px;
  left: 0;
  bottom: 0;
  right: 0;
  margin: auto;
}
.mat-pseudo-checkbox-minimal.mat-pseudo-checkbox-indeterminate::after {
  top: 8px;
  width: 16px;
}

.mat-pseudo-checkbox-full.mat-pseudo-checkbox-checked::after {
  width: 10px;
  height: 4px;
  transform-origin: center;
  top: -2.8284271247px;
  left: 0;
  bottom: 0;
  right: 0;
  margin: auto;
}
.mat-pseudo-checkbox-full.mat-pseudo-checkbox-indeterminate::after {
  top: 6px;
  width: 12px;
}
`],encapsulation:2,changeDetection:0})}return n})();var $a=(()=>{class n{static \u0275fac=function(i){return new(i||n)};static \u0275cmp=J({type:n,selectors:[["structural-styles"]],decls:0,vars:0,template:function(i,r){},styles:[`.mat-focus-indicator {
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
`],encapsulation:2,changeDetection:0})}return n})();var ZB=["text"],XB=[[["mat-icon"]],"*"],QB=["mat-icon","*"];function JB(n,t){if(n&1&&me(0,"mat-pseudo-checkbox",1),n&2){let e=R();ge("disabled",e.disabled)("state",e.selected?"checked":"unchecked")}}function ej(n,t){if(n&1&&me(0,"mat-pseudo-checkbox",3),n&2){let e=R();ge("disabled",e.disabled)}}function tj(n,t){if(n&1&&(y(0,"span",4),E(1),v()),n&2){let e=R();_(),lt("(",e.group.label,")")}}var Y_=new b("MAT_OPTION_PARENT_COMPONENT"),Z_=new b("MatOptgroup");var K_=class{source;isUserInput;constructor(t,e=!1){this.source=t,this.isUserInput=e}},za=(()=>{class n{_element=f(z);_changeDetectorRef=f(et);_parent=f(Y_,{optional:!0});group=f(Z_,{optional:!0});_signalDisableRipple=!1;_selected=!1;_active=!1;_mostRecentViewValue="";get multiple(){return this._parent&&this._parent.multiple}get selected(){return this._selected}value;id=f(Zt).getId("mat-option-");get disabled(){return this.group&&this.group.disabled||this._disabled()}set disabled(e){this._disabled.set(e)}_disabled=O(!1);get disableRipple(){return this._signalDisableRipple?this._parent.disableRipple():!!this._parent?.disableRipple}get hideSingleSelectionIndicator(){return!!(this._parent&&this._parent.hideSingleSelectionIndicator)}onSelectionChange=new F;_text;_stateChanges=new D;constructor(){let e=f(Cn);e.load($a),e.load(jc),this._signalDisableRipple=!!this._parent&&qo(this._parent.disableRipple)}get active(){return this._active}get viewValue(){return(this._text?.nativeElement.textContent||"").trim()}select(e=!0){this._selected||(this._selected=!0,this._changeDetectorRef.markForCheck(),e&&this._emitSelectionChangeEvent())}deselect(e=!0){this._selected&&(this._selected=!1,this._changeDetectorRef.markForCheck(),e&&this._emitSelectionChangeEvent())}focus(e,i){let r=this._getHostElement();typeof r.focus=="function"&&r.focus(i)}setActiveStyles(){this._active||(this._active=!0,this._changeDetectorRef.markForCheck())}setInactiveStyles(){this._active&&(this._active=!1,this._changeDetectorRef.markForCheck())}getLabel(){return this.viewValue}_handleKeydown(e){(e.keyCode===13||e.keyCode===32)&&!Yt(e)&&(this._selectViaInteraction(),e.preventDefault())}_selectViaInteraction(){this.disabled||(this._selected=this.multiple?!this._selected:!0,this._changeDetectorRef.markForCheck(),this._emitSelectionChangeEvent(!0))}_getTabIndex(){return this.disabled?"-1":"0"}_getHostElement(){return this._element.nativeElement}ngAfterViewChecked(){if(this._selected){let e=this.viewValue;e!==this._mostRecentViewValue&&(this._mostRecentViewValue&&this._stateChanges.next(),this._mostRecentViewValue=e)}}ngOnDestroy(){this._stateChanges.complete()}_emitSelectionChangeEvent(e=!1){this.onSelectionChange.emit(new K_(this,e))}static \u0275fac=function(i){return new(i||n)};static \u0275cmp=J({type:n,selectors:[["mat-option"]],viewQuery:function(i,r){if(i&1&&vt(ZB,7),i&2){let o;W(o=G())&&(r._text=o.first)}},hostAttrs:["role","option",1,"mat-mdc-option","mdc-list-item"],hostVars:11,hostBindings:function(i,r){i&1&&fe("click",function(){return r._selectViaInteraction()})("keydown",function(s){return r._handleKeydown(s)}),i&2&&(Jr("id",r.id),Le("aria-selected",r.selected)("aria-disabled",r.disabled.toString()),ye("mdc-list-item--selected",r.selected)("mat-mdc-option-multiple",r.multiple)("mat-mdc-option-active",r.active)("mdc-list-item--disabled",r.disabled))},inputs:{value:"value",id:"id",disabled:[2,"disabled","disabled",oe]},outputs:{onSelectionChange:"onSelectionChange"},exportAs:["matOption"],ngContentSelectors:QB,decls:8,vars:5,consts:[["text",""],["aria-hidden","true",1,"mat-mdc-option-pseudo-checkbox",3,"disabled","state"],[1,"mdc-list-item__primary-text"],["state","checked","aria-hidden","true","appearance","minimal",1,"mat-mdc-option-pseudo-checkbox",3,"disabled"],[1,"cdk-visually-hidden"],["aria-hidden","true","mat-ripple","",1,"mat-mdc-option-ripple","mat-focus-indicator",3,"matRippleTrigger","matRippleDisabled"]],template:function(i,r){i&1&&(Ft(XB),ee(0,JB,1,2,"mat-pseudo-checkbox",1),Ve(1),y(2,"span",2,0),Ve(4,1),v(),ee(5,ej,1,1,"mat-pseudo-checkbox",3),ee(6,tj,2,1,"span",4),me(7,"div",5)),i&2&&(te(r.multiple?0:-1),_(5),te(!r.multiple&&r.selected&&!r.hideSingleSelectionIndicator?5:-1),_(),te(r.group&&r.group._inert?6:-1),_(),ge("matRippleTrigger",r._getHostElement())("matRippleDisabled",r.disabled||r.disableRipple))},dependencies:[lM,Cs],styles:[`.mat-mdc-option {
  -webkit-user-select: none;
  user-select: none;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  display: flex;
  position: relative;
  align-items: center;
  justify-content: flex-start;
  overflow: hidden;
  min-height: 48px;
  padding: 0 16px;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  color: var(--mat-option-label-text-color, var(--mat-sys-on-surface));
  font-family: var(--mat-option-label-text-font, var(--mat-sys-label-large-font));
  line-height: var(--mat-option-label-text-line-height, var(--mat-sys-label-large-line-height));
  font-size: var(--mat-option-label-text-size, var(--mat-sys-body-large-size));
  letter-spacing: var(--mat-option-label-text-tracking, var(--mat-sys-label-large-tracking));
  font-weight: var(--mat-option-label-text-weight, var(--mat-sys-body-large-weight));
}
.mat-mdc-option:hover:not(.mdc-list-item--disabled) {
  background-color: var(--mat-option-hover-state-layer-color, color-mix(in srgb, var(--mat-sys-on-surface) calc(var(--mat-sys-hover-state-layer-opacity) * 100%), transparent));
}
.mat-mdc-option:focus.mdc-list-item, .mat-mdc-option.mat-mdc-option-active.mdc-list-item {
  background-color: var(--mat-option-focus-state-layer-color, color-mix(in srgb, var(--mat-sys-on-surface) calc(var(--mat-sys-focus-state-layer-opacity) * 100%), transparent));
  outline: 0;
}
.mat-mdc-option.mdc-list-item--selected:not(.mdc-list-item--disabled):not(.mat-mdc-option-active, .mat-mdc-option-multiple, :focus, :hover) {
  background-color: var(--mat-option-selected-state-layer-color, var(--mat-sys-secondary-container));
}
.mat-mdc-option.mdc-list-item--selected:not(.mdc-list-item--disabled):not(.mat-mdc-option-active, .mat-mdc-option-multiple, :focus, :hover) .mdc-list-item__primary-text {
  color: var(--mat-option-selected-state-label-text-color, var(--mat-sys-on-secondary-container));
}
.mat-mdc-option .mat-pseudo-checkbox {
  --mat-pseudo-checkbox-minimal-selected-checkmark-color: var(--mat-option-selected-state-label-text-color, var(--mat-sys-on-secondary-container));
}
.mat-mdc-option.mdc-list-item {
  align-items: center;
  background: transparent;
}
.mat-mdc-option.mdc-list-item--disabled {
  cursor: default;
  pointer-events: none;
}
.mat-mdc-option.mdc-list-item--disabled .mat-mdc-option-pseudo-checkbox, .mat-mdc-option.mdc-list-item--disabled .mdc-list-item__primary-text, .mat-mdc-option.mdc-list-item--disabled > mat-icon {
  opacity: 0.38;
}
.mat-mdc-optgroup .mat-mdc-option:not(.mat-mdc-option-multiple) {
  padding-left: 32px;
}
[dir=rtl] .mat-mdc-optgroup .mat-mdc-option:not(.mat-mdc-option-multiple) {
  padding-left: 16px;
  padding-right: 32px;
}
.mat-mdc-option .mat-icon,
.mat-mdc-option .mat-pseudo-checkbox-full {
  margin-right: 16px;
  flex-shrink: 0;
}
[dir=rtl] .mat-mdc-option .mat-icon,
[dir=rtl] .mat-mdc-option .mat-pseudo-checkbox-full {
  margin-right: 0;
  margin-left: 16px;
}
.mat-mdc-option .mat-pseudo-checkbox-minimal {
  margin-left: 16px;
  flex-shrink: 0;
}
[dir=rtl] .mat-mdc-option .mat-pseudo-checkbox-minimal {
  margin-right: 16px;
  margin-left: 0;
}
.mat-mdc-option .mat-mdc-option-ripple {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  pointer-events: none;
}
.mat-mdc-option .mdc-list-item__primary-text {
  white-space: normal;
  font-size: inherit;
  font-weight: inherit;
  letter-spacing: inherit;
  line-height: inherit;
  font-family: inherit;
  text-decoration: inherit;
  text-transform: inherit;
  margin-right: auto;
}
[dir=rtl] .mat-mdc-option .mdc-list-item__primary-text {
  margin-right: 0;
  margin-left: auto;
}
@media (forced-colors: active) {
  .mat-mdc-option.mdc-list-item--selected:not(:has(.mat-mdc-option-pseudo-checkbox))::after {
    content: "";
    position: absolute;
    top: 50%;
    right: 16px;
    transform: translateY(-50%);
    width: 10px;
    height: 0;
    border-bottom: solid 10px;
    border-radius: 10px;
  }
  [dir=rtl] .mat-mdc-option.mdc-list-item--selected:not(:has(.mat-mdc-option-pseudo-checkbox))::after {
    right: auto;
    left: 16px;
  }
}

.mat-mdc-option-multiple {
  --mat-list-list-item-selected-container-color: var(--mat-list-list-item-container-color, transparent);
}

.mat-mdc-option-active .mat-focus-indicator::before {
  content: "";
}
`],encapsulation:2,changeDetection:0})}return n})();function cM(n,t,e){if(e.length){let i=t.toArray(),r=e.toArray(),o=0;for(let s=0;s<n+1;s++)i[s].group&&i[s].group===r[o]&&o++;return o}return 0}function dM(n,t,e,i){return n<e?n:n+t>e+i?Math.max(0,n-i+t):e}var uM=(()=>{class n{isErrorState(e,i){return!!(e&&e.invalid&&(e.touched||i&&i.submitted))}static \u0275fac=function(i){return new(i||n)};static \u0275prov=C({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})();var vp=class{_defaultMatcher;ngControl;_parentFormGroup;_parentForm;_stateChanges;errorState=!1;matcher;constructor(t,e,i,r,o){this._defaultMatcher=t,this.ngControl=e,this._parentFormGroup=i,this._parentForm=r,this._stateChanges=o}updateErrorState(){let t=this.errorState,e=this._parentFormGroup||this._parentForm,i=this.matcher||this._defaultMatcher,r=this.ngControl?this.ngControl.control:null,o=i?.isErrorState(r,e)??!1;o!==t&&(this.errorState=o,this._stateChanges.next())}};var fM=(()=>{class n{static \u0275fac=function(i){return new(i||n)};static \u0275mod=Ce({type:n});static \u0275inj=be({imports:[Vh,tM,pt]})}return n})();var bp=(()=>{class n{static \u0275fac=function(i){return new(i||n)};static \u0275mod=Ce({type:n});static \u0275inj=be({imports:[pt]})}return n})();var hM=(()=>{class n{static \u0275fac=function(i){return new(i||n)};static \u0275mod=Ce({type:n});static \u0275inj=be({imports:[pt]})}return n})();var X_=(()=>{class n{static \u0275fac=function(i){return new(i||n)};static \u0275mod=Ce({type:n});static \u0275inj=be({imports:[bp,hM,za,pt]})}return n})();var nj=["trigger"],ij=["panel"],rj=[[["mat-select-trigger"]],"*"],oj=["mat-select-trigger","*"];function sj(n,t){if(n&1&&(y(0,"span",4),E(1),v()),n&2){let e=R();_(),Fe(e.placeholder)}}function aj(n,t){n&1&&Ve(0)}function lj(n,t){if(n&1&&(y(0,"span",11),E(1),v()),n&2){let e=R(2);_(),Fe(e.triggerValue)}}function cj(n,t){if(n&1&&(y(0,"span",5),ee(1,aj,1,0)(2,lj,2,1,"span",11),v()),n&2){let e=R();_(),te(e.customTrigger?1:2)}}function dj(n,t){if(n&1){let e=Pt();y(0,"div",12,1),fe("keydown",function(r){We(e);let o=R();return Ge(o._handleKeydown(r))}),Ve(2,1),v()}if(n&2){let e=R();xn(e.panelClass),ye("mat-select-panel-animations-enabled",!e._animationsDisabled)("mat-primary",(e._parentFormField==null?null:e._parentFormField.color)==="primary")("mat-accent",(e._parentFormField==null?null:e._parentFormField.color)==="accent")("mat-warn",(e._parentFormField==null?null:e._parentFormField.color)==="warn")("mat-undefined",!(e._parentFormField!=null&&e._parentFormField.color)),Le("id",e.id+"-panel")("aria-multiselectable",e.multiple)("aria-label",e.ariaLabel||null)("aria-labelledby",e._getPanelAriaLabelledby())}}var uj=new b("mat-select-scroll-strategy",{providedIn:"root",factory:()=>{let n=f(re);return()=>xr(n)}}),fj=new b("MAT_SELECT_CONFIG"),hj=new b("MatSelectTrigger"),Q_=class{source;value;constructor(t,e){this.source=t,this.value=e}},pM=(()=>{class n{_viewportRuler=f(ti);_changeDetectorRef=f(et);_elementRef=f(z);_dir=f(Bt,{optional:!0});_idGenerator=f(Zt);_renderer=f(yt);_parentFormField=f(z_,{optional:!0});ngControl=f(ap,{self:!0,optional:!0});_liveAnnouncer=f(m_);_defaultOptions=f(fj,{optional:!0});_animationsDisabled=At();_popoverLocation;_initialized=new D;_cleanupDetach;options;optionGroups;customTrigger;_positions=[{originX:"start",originY:"bottom",overlayX:"start",overlayY:"top"},{originX:"end",originY:"bottom",overlayX:"end",overlayY:"top"},{originX:"start",originY:"top",overlayX:"start",overlayY:"bottom",panelClass:"mat-mdc-select-panel-above"},{originX:"end",originY:"top",overlayX:"end",overlayY:"bottom",panelClass:"mat-mdc-select-panel-above"}];_scrollOptionIntoView(e){let i=this.options.toArray()[e];if(i){let r=this.panel.nativeElement,o=cM(e,this.options,this.optionGroups),s=i._getHostElement();e===0&&o===1?r.scrollTop=0:r.scrollTop=dM(s.offsetTop,s.offsetHeight,r.scrollTop,r.offsetHeight)}}_positioningSettled(){this._scrollOptionIntoView(this._keyManager.activeItemIndex||0)}_getChangeEvent(e){return new Q_(this,e)}_scrollStrategyFactory=f(uj);_panelOpen=!1;_compareWith=(e,i)=>e===i;_uid=this._idGenerator.getId("mat-select-");_triggerAriaLabelledBy=null;_previousControl;_destroy=new D;_errorStateTracker;stateChanges=new D;disableAutomaticLabeling=!0;userAriaDescribedBy;_selectionModel;_keyManager;_preferredOverlayOrigin;_overlayWidth;_onChange=()=>{};_onTouched=()=>{};_valueId=this._idGenerator.getId("mat-select-value-");_scrollStrategy;_overlayPanelClass=this._defaultOptions?.overlayPanelClass||"";get focused(){return this._focused||this._panelOpen}_focused=!1;controlType="mat-select";trigger;panel;_overlayDir;panelClass;disabled=!1;get disableRipple(){return this._disableRipple()}set disableRipple(e){this._disableRipple.set(e)}_disableRipple=O(!1);tabIndex=0;get hideSingleSelectionIndicator(){return this._hideSingleSelectionIndicator}set hideSingleSelectionIndicator(e){this._hideSingleSelectionIndicator=e,this._syncParentProperties()}_hideSingleSelectionIndicator=this._defaultOptions?.hideSingleSelectionIndicator??!1;get placeholder(){return this._placeholder}set placeholder(e){this._placeholder=e,this.stateChanges.next()}_placeholder;get required(){return this._required??this.ngControl?.control?.hasValidator(rp.required)??!1}set required(e){this._required=e,this.stateChanges.next()}_required;get multiple(){return this._multiple}set multiple(e){this._selectionModel,this._multiple=e}_multiple=!1;disableOptionCentering=this._defaultOptions?.disableOptionCentering??!1;get compareWith(){return this._compareWith}set compareWith(e){this._compareWith=e,this._selectionModel&&this._initializeSelection()}get value(){return this._value}set value(e){this._assignValue(e)&&this._onChange(e)}_value;ariaLabel="";ariaLabelledby;get errorStateMatcher(){return this._errorStateTracker.matcher}set errorStateMatcher(e){this._errorStateTracker.matcher=e}typeaheadDebounceInterval;sortComparator;get id(){return this._id}set id(e){this._id=e||this._uid,this.stateChanges.next()}_id;get errorState(){return this._errorStateTracker.errorState}set errorState(e){this._errorStateTracker.errorState=e}panelWidth=this._defaultOptions&&typeof this._defaultOptions.panelWidth<"u"?this._defaultOptions.panelWidth:"auto";canSelectNullableOptions=this._defaultOptions?.canSelectNullableOptions??!1;optionSelectionChanges=Io(()=>{let e=this.options;return e?e.changes.pipe(dt(e),ut(()=>Qt(...e.map(i=>i.onSelectionChange)))):this._initialized.pipe(ut(()=>this.optionSelectionChanges))});openedChange=new F;_openedStream=this.openedChange.pipe(_e(e=>e),ue(()=>{}));_closedStream=this.openedChange.pipe(_e(e=>!e),ue(()=>{}));selectionChange=new F;valueChange=new F;constructor(){let e=f(uM),i=f(V_,{optional:!0}),r=f(B_,{optional:!0}),o=f(new Zo("tabindex"),{optional:!0}),s=f(ed,{optional:!0});this.ngControl&&(this.ngControl.valueAccessor=this),this._defaultOptions?.typeaheadDebounceInterval!=null&&(this.typeaheadDebounceInterval=this._defaultOptions.typeaheadDebounceInterval),this._errorStateTracker=new vp(e,this.ngControl,r,i,this.stateChanges),this._scrollStrategy=this._scrollStrategyFactory(),this.tabIndex=o==null?0:parseInt(o)||0,this._popoverLocation=s?.usePopover===!1?null:"inline",this.id=this.id}ngOnInit(){this._selectionModel=new qc(this.multiple),this.stateChanges.next(),this._viewportRuler.change().pipe(K(this._destroy)).subscribe(()=>{this.panelOpen&&(this._overlayWidth=this._getOverlayWidth(this._preferredOverlayOrigin),this._changeDetectorRef.detectChanges())})}ngAfterContentInit(){this._initialized.next(),this._initialized.complete(),this._initKeyManager(),this._selectionModel.changed.pipe(K(this._destroy)).subscribe(e=>{e.added.forEach(i=>i.select()),e.removed.forEach(i=>i.deselect())}),this.options.changes.pipe(dt(null),K(this._destroy)).subscribe(()=>{this._resetOptions(),this._initializeSelection()})}ngDoCheck(){let e=this._getTriggerAriaLabelledby(),i=this.ngControl;if(e!==this._triggerAriaLabelledBy){let r=this._elementRef.nativeElement;this._triggerAriaLabelledBy=e,e?r.setAttribute("aria-labelledby",e):r.removeAttribute("aria-labelledby")}i&&(this._previousControl!==i.control&&(this._previousControl!==void 0&&i.disabled!==null&&i.disabled!==this.disabled&&(this.disabled=i.disabled),this._previousControl=i.control),this.updateErrorState())}ngOnChanges(e){(e.disabled||e.userAriaDescribedBy)&&this.stateChanges.next(),e.typeaheadDebounceInterval&&this._keyManager&&this._keyManager.withTypeAhead(this.typeaheadDebounceInterval),e.panelClass&&this.panelClass instanceof Set&&(this.panelClass=Array.from(this.panelClass))}ngOnDestroy(){this._cleanupDetach?.(),this._keyManager?.destroy(),this._destroy.next(),this._destroy.complete(),this.stateChanges.complete(),this._clearFromModal()}toggle(){this.panelOpen?this.close():this.open()}open(){this._canOpen()&&(this._parentFormField&&(this._preferredOverlayOrigin=this._parentFormField.getConnectedOverlayOrigin()),this._cleanupDetach?.(),this._overlayWidth=this._getOverlayWidth(this._preferredOverlayOrigin),this._applyModalPanelOwnership(),this._panelOpen=!0,this._overlayDir.positionChange.pipe(gt(1)).subscribe(()=>{this._changeDetectorRef.detectChanges(),this._positioningSettled()}),this._overlayDir.attachOverlay(),this._keyManager.withHorizontalOrientation(null),this._highlightCorrectOption(),this._changeDetectorRef.markForCheck(),this.stateChanges.next(),Promise.resolve().then(()=>this.openedChange.emit(!0)))}_trackedModal=null;_applyModalPanelOwnership(){let e=this._elementRef.nativeElement.closest('body > .cdk-overlay-container [aria-modal="true"]');if(!e)return;let i=`${this.id}-panel`;this._trackedModal&&Hh(this._trackedModal,"aria-owns",i),__(e,"aria-owns",i),this._trackedModal=e}_clearFromModal(){if(!this._trackedModal)return;let e=`${this.id}-panel`;Hh(this._trackedModal,"aria-owns",e),this._trackedModal=null}close(){this._panelOpen&&(this._panelOpen=!1,this._exitAndDetach(),this._keyManager.withHorizontalOrientation(this._isRtl()?"rtl":"ltr"),this._changeDetectorRef.markForCheck(),this._onTouched(),this.stateChanges.next(),Promise.resolve().then(()=>this.openedChange.emit(!1)))}_exitAndDetach(){if(this._animationsDisabled||!this.panel){this._detachOverlay();return}this._cleanupDetach?.(),this._cleanupDetach=()=>{i(),clearTimeout(r),this._cleanupDetach=void 0};let e=this.panel.nativeElement,i=this._renderer.listen(e,"animationend",o=>{o.animationName==="_mat-select-exit"&&(this._cleanupDetach?.(),this._detachOverlay())}),r=setTimeout(()=>{this._cleanupDetach?.(),this._detachOverlay()},200);e.classList.add("mat-select-panel-exit")}_detachOverlay(){this._overlayDir.detachOverlay(),this._changeDetectorRef.markForCheck()}writeValue(e){this._assignValue(e)}registerOnChange(e){this._onChange=e}registerOnTouched(e){this._onTouched=e}setDisabledState(e){this.disabled=e,this._changeDetectorRef.markForCheck(),this.stateChanges.next()}get panelOpen(){return this._panelOpen}get selected(){return this.multiple?this._selectionModel?.selected||[]:this._selectionModel?.selected[0]}get triggerValue(){if(this.empty)return"";if(this._multiple){let e=this._selectionModel.selected.map(i=>i.viewValue);return this._isRtl()&&e.reverse(),e.join(", ")}return this._selectionModel.selected[0].viewValue}updateErrorState(){this._errorStateTracker.updateErrorState()}_isRtl(){return this._dir?this._dir.value==="rtl":!1}_handleKeydown(e){this.disabled||(this.panelOpen?this._handleOpenKeydown(e):this._handleClosedKeydown(e))}_handleClosedKeydown(e){let i=e.keyCode,r=i===40||i===38||i===37||i===39,o=i===13||i===32,s=this._keyManager;if(!s.isTyping()&&o&&!Yt(e)||(this.multiple||e.altKey)&&r)e.preventDefault(),this.open();else if(!this.multiple){let a=this.selected;s.onKeydown(e);let l=this.selected;l&&a!==l&&this._liveAnnouncer.announce(l.viewValue,1e4)}}_handleOpenKeydown(e){let i=this._keyManager,r=e.keyCode,o=r===40||r===38,s=i.isTyping();if(o&&e.altKey)e.preventDefault(),this.close();else if(!s&&(r===13||r===32)&&i.activeItem&&!Yt(e))e.preventDefault(),i.activeItem._selectViaInteraction();else if(!s&&this._multiple&&r===65&&e.ctrlKey){e.preventDefault();let a=this.options.some(l=>!l.disabled&&!l.selected);this.options.forEach(l=>{l.disabled||(a?l.select():l.deselect())})}else{let a=i.activeItemIndex;i.onKeydown(e),this._multiple&&o&&e.shiftKey&&i.activeItem&&i.activeItemIndex!==a&&i.activeItem._selectViaInteraction()}}_handleOverlayKeydown(e){e.keyCode===27&&!Yt(e)&&(e.preventDefault(),this.close())}_onFocus(){this.disabled||(this._focused=!0,this.stateChanges.next())}_onBlur(){this._focused=!1,this._keyManager?.cancelTypeahead(),!this.disabled&&!this.panelOpen&&(this._onTouched(),this._changeDetectorRef.markForCheck(),this.stateChanges.next())}get empty(){return!this._selectionModel||this._selectionModel.isEmpty()}_initializeSelection(){Promise.resolve().then(()=>{this.ngControl&&(this._value=this.ngControl.value),this._setSelectionByValue(this._value),this.stateChanges.next()})}_setSelectionByValue(e){if(this.options.forEach(i=>i.setInactiveStyles()),this._selectionModel.clear(),this.multiple&&e)Array.isArray(e),e.forEach(i=>this._selectOptionByValue(i)),this._sortValues();else{let i=this._selectOptionByValue(e);i?this._keyManager.updateActiveItem(i):this.panelOpen||this._keyManager.updateActiveItem(-1)}this._changeDetectorRef.markForCheck()}_selectOptionByValue(e){let i=this.options.find(r=>{if(this._selectionModel.isSelected(r))return!1;try{return(r.value!=null||this.canSelectNullableOptions)&&this._compareWith(r.value,e)}catch{return!1}});return i&&this._selectionModel.select(i),i}_assignValue(e){return e!==this._value||this._multiple&&Array.isArray(e)?(this.options&&this._setSelectionByValue(e),this._value=e,!0):!1}_skipPredicate=e=>this.panelOpen?!1:e.disabled;_getOverlayWidth(e){return this.panelWidth==="auto"?(e instanceof Va?e.elementRef:e||this._elementRef).nativeElement.getBoundingClientRect().width:this.panelWidth===null?"":this.panelWidth}_syncParentProperties(){if(this.options)for(let e of this.options)e._changeDetectorRef.markForCheck()}_initKeyManager(){this._keyManager=new Wc(this.options).withTypeAhead(this.typeaheadDebounceInterval).withVerticalOrientation().withHorizontalOrientation(this._isRtl()?"rtl":"ltr").withHomeAndEnd().withPageUpDown().withAllowedModifierKeys(["shiftKey"]).skipPredicate(this._skipPredicate),this._keyManager.tabOut.subscribe(()=>{this.panelOpen&&(!this.multiple&&this._keyManager.activeItem&&this._keyManager.activeItem._selectViaInteraction(),this.focus(),this.close())}),this._keyManager.change.subscribe(()=>{this._panelOpen&&this.panel?this._scrollOptionIntoView(this._keyManager.activeItemIndex||0):!this._panelOpen&&!this.multiple&&this._keyManager.activeItem&&this._keyManager.activeItem._selectViaInteraction()})}_resetOptions(){let e=Qt(this.options.changes,this._destroy);this.optionSelectionChanges.pipe(K(e)).subscribe(i=>{this._onSelect(i.source,i.isUserInput),i.isUserInput&&!this.multiple&&this._panelOpen&&(this.close(),this.focus())}),Qt(...this.options.map(i=>i._stateChanges)).pipe(K(e)).subscribe(()=>{this._changeDetectorRef.detectChanges(),this.stateChanges.next()})}_onSelect(e,i){let r=this._selectionModel.isSelected(e);!this.canSelectNullableOptions&&e.value==null&&!this._multiple?(e.deselect(),this._selectionModel.clear(),this.value!=null&&this._propagateChanges(e.value)):(r!==e.selected&&(e.selected?this._selectionModel.select(e):this._selectionModel.deselect(e)),i&&this._keyManager.setActiveItem(e),this.multiple&&(this._sortValues(),i&&this.focus())),r!==this._selectionModel.isSelected(e)&&this._propagateChanges(),this.stateChanges.next()}_sortValues(){if(this.multiple){let e=this.options.toArray();this._selectionModel.sort((i,r)=>this.sortComparator?this.sortComparator(i,r,e):e.indexOf(i)-e.indexOf(r)),this.stateChanges.next()}}_propagateChanges(e){let i;this.multiple?i=this.selected.map(r=>r.value):i=this.selected?this.selected.value:e,this._value=i,this.valueChange.emit(i),this._onChange(i),this.selectionChange.emit(this._getChangeEvent(i)),this._changeDetectorRef.markForCheck()}_highlightCorrectOption(){if(this._keyManager)if(this.empty){let e=-1;for(let i=0;i<this.options.length;i++)if(!this.options.get(i).disabled){e=i;break}this._keyManager.setActiveItem(e)}else this._keyManager.setActiveItem(this._selectionModel.selected[0])}_canOpen(){return!this._panelOpen&&!this.disabled&&this.options?.length>0&&!!this._overlayDir}focus(e){this._elementRef.nativeElement.focus(e)}_getPanelAriaLabelledby(){if(this.ariaLabel)return null;let e=this._parentFormField?.getLabelId()||null,i=e?e+" ":"";return this.ariaLabelledby?i+this.ariaLabelledby:e}_getAriaActiveDescendant(){return this.panelOpen&&this._keyManager&&this._keyManager.activeItem?this._keyManager.activeItem.id:null}_getTriggerAriaLabelledby(){if(this.ariaLabel)return null;let e=this._parentFormField?.getLabelId()||"";return this.ariaLabelledby&&(e+=" "+this.ariaLabelledby),e||(e=this._valueId),e}get describedByIds(){return this._elementRef.nativeElement.getAttribute("aria-describedby")?.split(" ")||[]}setDescribedByIds(e){let i=this._elementRef.nativeElement;e.length?i.setAttribute("aria-describedby",e.join(" ")):i.removeAttribute("aria-describedby")}onContainerClick(e){let i=dn(e);i&&(i.tagName==="MAT-OPTION"||i.classList.contains("cdk-overlay-backdrop")||i.closest(".mat-mdc-select-panel"))||(this.focus(),this.open())}get shouldLabelFloat(){return this.panelOpen||!this.empty||this.focused&&!!this.placeholder}static \u0275fac=function(i){return new(i||n)};static \u0275cmp=J({type:n,selectors:[["mat-select"]],contentQueries:function(i,r,o){if(i&1&&In(o,hj,5)(o,za,5)(o,Z_,5),i&2){let s;W(s=G())&&(r.customTrigger=s.first),W(s=G())&&(r.options=s),W(s=G())&&(r.optionGroups=s)}},viewQuery:function(i,r){if(i&1&&vt(nj,5)(ij,5)(np,5),i&2){let o;W(o=G())&&(r.trigger=o.first),W(o=G())&&(r.panel=o.first),W(o=G())&&(r._overlayDir=o.first)}},hostAttrs:["role","combobox","aria-haspopup","listbox",1,"mat-mdc-select"],hostVars:21,hostBindings:function(i,r){i&1&&fe("keydown",function(s){return r._handleKeydown(s)})("focus",function(){return r._onFocus()})("blur",function(){return r._onBlur()}),i&2&&(Le("id",r.id)("tabindex",r.disabled?-1:r.tabIndex)("aria-controls",r.panelOpen?r.id+"-panel":null)("aria-expanded",r.panelOpen)("aria-label",r.ariaLabel||null)("aria-required",r.required.toString())("aria-disabled",r.disabled.toString())("aria-invalid",r.errorState)("aria-activedescendant",r._getAriaActiveDescendant()),ye("mat-mdc-select-disabled",r.disabled)("mat-mdc-select-invalid",r.errorState)("mat-mdc-select-required",r.required)("mat-mdc-select-empty",r.empty)("mat-mdc-select-multiple",r.multiple)("mat-select-open",r.panelOpen))},inputs:{userAriaDescribedBy:[0,"aria-describedby","userAriaDescribedBy"],panelClass:"panelClass",disabled:[2,"disabled","disabled",oe],disableRipple:[2,"disableRipple","disableRipple",oe],tabIndex:[2,"tabIndex","tabIndex",e=>e==null?0:Xo(e)],hideSingleSelectionIndicator:[2,"hideSingleSelectionIndicator","hideSingleSelectionIndicator",oe],placeholder:"placeholder",required:[2,"required","required",oe],multiple:[2,"multiple","multiple",oe],disableOptionCentering:[2,"disableOptionCentering","disableOptionCentering",oe],compareWith:"compareWith",value:"value",ariaLabel:[0,"aria-label","ariaLabel"],ariaLabelledby:[0,"aria-labelledby","ariaLabelledby"],errorStateMatcher:"errorStateMatcher",typeaheadDebounceInterval:[2,"typeaheadDebounceInterval","typeaheadDebounceInterval",Xo],sortComparator:"sortComparator",id:"id",panelWidth:"panelWidth",canSelectNullableOptions:[2,"canSelectNullableOptions","canSelectNullableOptions",oe]},outputs:{openedChange:"openedChange",_openedStream:"opened",_closedStream:"closed",selectionChange:"selectionChange",valueChange:"valueChange"},exportAs:["matSelect"],features:[bt([{provide:$_,useExisting:n},{provide:Y_,useExisting:n}]),It],ngContentSelectors:oj,decls:11,vars:10,consts:[["fallbackOverlayOrigin","cdkOverlayOrigin","trigger",""],["panel",""],["cdk-overlay-origin","",1,"mat-mdc-select-trigger",3,"click"],[1,"mat-mdc-select-value"],[1,"mat-mdc-select-placeholder","mat-mdc-select-min-line"],[1,"mat-mdc-select-value-text"],[1,"mat-mdc-select-arrow-wrapper"],[1,"mat-mdc-select-arrow"],["viewBox","0 0 24 24","width","24px","height","24px","focusable","false","aria-hidden","true"],["d","M7 10l5 5 5-5z"],["cdk-connected-overlay","","cdkConnectedOverlayHasBackdrop","","cdkConnectedOverlayBackdropClass","cdk-overlay-transparent-backdrop",3,"detach","backdropClick","overlayKeydown","cdkConnectedOverlayDisableClose","cdkConnectedOverlayPanelClass","cdkConnectedOverlayScrollStrategy","cdkConnectedOverlayOrigin","cdkConnectedOverlayPositions","cdkConnectedOverlayWidth","cdkConnectedOverlayFlexibleDimensions","cdkConnectedOverlayUsePopover"],[1,"mat-mdc-select-min-line"],["role","listbox","tabindex","-1",1,"mat-mdc-select-panel","mdc-menu-surface","mdc-menu-surface--open",3,"keydown"]],template:function(i,r){if(i&1&&(Ft(rj),y(0,"div",2,0),fe("click",function(){return r.open()}),y(3,"div",3),ee(4,sj,2,1,"span",4)(5,cj,3,1,"span",5),v(),y(6,"div",6)(7,"div",7),li(),y(8,"svg",8),me(9,"path",9),v()()()(),Wt(10,dj,3,16,"ng-template",10),fe("detach",function(){return r.close()})("backdropClick",function(){return r.close()})("overlayKeydown",function(s){return r._handleOverlayKeydown(s)})),i&2){let o=gi(1);_(3),Le("id",r._valueId),_(),te(r.empty?4:5),_(6),ge("cdkConnectedOverlayDisableClose",!0)("cdkConnectedOverlayPanelClass",r._overlayPanelClass)("cdkConnectedOverlayScrollStrategy",r._scrollStrategy)("cdkConnectedOverlayOrigin",r._preferredOverlayOrigin||o)("cdkConnectedOverlayPositions",r._positions)("cdkConnectedOverlayWidth",r._overlayWidth)("cdkConnectedOverlayFlexibleDimensions",!0)("cdkConnectedOverlayUsePopover",r._popoverLocation)}},dependencies:[Va,np],styles:[`@keyframes _mat-select-enter {
  from {
    opacity: 0;
    transform: scaleY(0.8);
  }
  to {
    opacity: 1;
    transform: none;
  }
}
@keyframes _mat-select-exit {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
.mat-mdc-select {
  display: inline-block;
  width: 100%;
  outline: none;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  color: var(--mat-select-enabled-trigger-text-color, var(--mat-sys-on-surface));
  font-family: var(--mat-select-trigger-text-font, var(--mat-sys-body-large-font));
  line-height: var(--mat-select-trigger-text-line-height, var(--mat-sys-body-large-line-height));
  font-size: var(--mat-select-trigger-text-size, var(--mat-sys-body-large-size));
  font-weight: var(--mat-select-trigger-text-weight, var(--mat-sys-body-large-weight));
  letter-spacing: var(--mat-select-trigger-text-tracking, var(--mat-sys-body-large-tracking));
}

div.mat-mdc-select-panel {
  box-shadow: var(--mat-select-container-elevation-shadow, 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12));
}

.mat-mdc-select-disabled {
  color: var(--mat-select-disabled-trigger-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
.mat-mdc-select-disabled .mat-mdc-select-placeholder {
  color: var(--mat-select-disabled-trigger-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}

.mat-mdc-select-trigger {
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  position: relative;
  box-sizing: border-box;
  width: 100%;
}
.mat-mdc-select-disabled .mat-mdc-select-trigger {
  -webkit-user-select: none;
  user-select: none;
  cursor: default;
}

.mat-mdc-select-value {
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.mat-mdc-select-value-text {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.mat-mdc-select-arrow-wrapper {
  height: 24px;
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
}
.mat-form-field-appearance-fill .mdc-text-field--no-label .mat-mdc-select-arrow-wrapper {
  transform: none;
}

.mat-mdc-form-field .mat-mdc-select.mat-mdc-select-invalid .mat-mdc-select-arrow,
.mat-form-field-invalid:not(.mat-form-field-disabled) .mat-mdc-form-field-infix::after {
  color: var(--mat-select-invalid-arrow-color, var(--mat-sys-error));
}

.mat-mdc-select-arrow {
  width: 10px;
  height: 5px;
  position: relative;
  color: var(--mat-select-enabled-arrow-color, var(--mat-sys-on-surface-variant));
}
.mat-mdc-form-field.mat-focused .mat-mdc-select-arrow {
  color: var(--mat-select-focused-arrow-color, var(--mat-sys-primary));
}
.mat-mdc-form-field .mat-mdc-select.mat-mdc-select-disabled .mat-mdc-select-arrow {
  color: var(--mat-select-disabled-arrow-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
.mat-select-open .mat-mdc-select-arrow {
  transform: rotate(180deg);
}
.mat-form-field-animations-enabled .mat-mdc-select-arrow {
  transition: transform 80ms linear;
}
.mat-mdc-select-arrow svg {
  fill: currentColor;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
@media (forced-colors: active) {
  .mat-mdc-select-arrow svg {
    fill: CanvasText;
  }
  .mat-mdc-select-disabled .mat-mdc-select-arrow svg {
    fill: GrayText;
  }
}

div.mat-mdc-select-panel {
  width: 100%;
  max-height: 275px;
  outline: 0;
  overflow: auto;
  padding: 8px 0;
  box-sizing: border-box;
  transform-origin: top center;
  border-radius: 0 0 4px 4px;
  position: relative;
  background-color: var(--mat-select-panel-background-color, var(--mat-sys-surface-container));
}
.mat-mdc-select-panel-above div.mat-mdc-select-panel {
  border-radius: 4px 4px 0 0;
  transform-origin: bottom center;
}
@media (forced-colors: active) {
  div.mat-mdc-select-panel {
    outline: solid 1px;
  }
}

.mat-select-panel-animations-enabled {
  animation: _mat-select-enter 120ms cubic-bezier(0, 0, 0.2, 1);
}
.mat-select-panel-animations-enabled.mat-select-panel-exit {
  animation: _mat-select-exit 100ms linear;
}

.mat-mdc-select-placeholder {
  transition: color 400ms 133.3333333333ms cubic-bezier(0.25, 0.8, 0.25, 1);
  color: var(--mat-select-placeholder-text-color, var(--mat-sys-on-surface-variant));
}
.mat-mdc-form-field:not(.mat-form-field-animations-enabled) .mat-mdc-select-placeholder, ._mat-animation-noopable .mat-mdc-select-placeholder {
  transition: none;
}
.mat-form-field-hide-placeholder .mat-mdc-select-placeholder {
  color: transparent;
  -webkit-text-fill-color: transparent;
  transition: none;
  display: block;
}

.mat-mdc-form-field-type-mat-select:not(.mat-form-field-disabled) .mat-mdc-text-field-wrapper {
  cursor: pointer;
}
.mat-mdc-form-field-type-mat-select.mat-form-field-appearance-fill .mat-mdc-floating-label {
  max-width: calc(100% - 18px);
}
.mat-mdc-form-field-type-mat-select.mat-form-field-appearance-fill .mdc-floating-label--float-above {
  max-width: calc(100% / 0.75 - 24px);
}
.mat-mdc-form-field-type-mat-select.mat-form-field-appearance-outline .mdc-notched-outline__notch {
  max-width: calc(100% - 60px);
}
.mat-mdc-form-field-type-mat-select.mat-form-field-appearance-outline .mdc-text-field--label-floating .mdc-notched-outline__notch {
  max-width: calc(100% - 24px);
}

.mat-mdc-select-min-line:empty::before {
  content: " ";
  white-space: pre;
  width: 1px;
  display: inline-block;
  visibility: hidden;
}

.mat-form-field-appearance-fill .mat-mdc-select-arrow-wrapper {
  transform: var(--mat-select-arrow-transform, translateY(-8px));
}
`],encapsulation:2,changeDetection:0})}return n})();var mM=(()=>{class n{static \u0275fac=function(i){return new(i||n)};static \u0275mod=Ce({type:n});static \u0275inj=be({imports:[_s,X_,pt,Ir,fM,X_]})}return n})();var iC=["*"];function mj(n,t){n&1&&Ve(0)}var gj=["tabListContainer"],yj=["tabList"],vj=["tabListInner"],bj=["nextPaginator"],_j=["previousPaginator"],Cj=["content"];function Dj(n,t){}var Ej=["tabBodyWrapper"],wj=["tabHeader"];function Sj(n,t){}function Tj(n,t){if(n&1&&Wt(0,Sj,0,0,"ng-template",12),n&2){let e=R().$implicit;ge("cdkPortalOutlet",e.templateLabel)}}function Ij(n,t){if(n&1&&E(0),n&2){let e=R().$implicit;Fe(e.textLabel)}}function xj(n,t){if(n&1){let e=Pt();y(0,"div",7,2),fe("click",function(){let r=We(e),o=r.$implicit,s=r.$index,a=R(),l=gi(1);return Ge(a._handleClick(o,l,s))})("cdkFocusChange",function(r){let o=We(e).$index,s=R();return Ge(s._tabFocusChanged(r,o))}),me(2,"span",8)(3,"div",9),y(4,"span",10)(5,"span",11),ee(6,Tj,1,1,null,12)(7,Ij,1,1),v()()()}if(n&2){let e=t.$implicit,i=t.$index,r=gi(1),o=R();xn(e.labelClass),ye("mdc-tab--active",o.selectedIndex===i),ge("id",o._getTabLabelId(e,i))("disabled",e.disabled)("fitInkBarToContent",o.fitInkBarToContent),Le("tabIndex",o._getTabIndex(i))("aria-posinset",i+1)("aria-setsize",o._tabs.length)("aria-controls",o._getTabContentId(i))("aria-selected",o.selectedIndex===i)("aria-label",e.ariaLabel||null)("aria-labelledby",!e.ariaLabel&&e.ariaLabelledby?e.ariaLabelledby:null),_(3),ge("matRippleTrigger",r)("matRippleDisabled",e.disabled||o.disableRipple),_(3),te(e.templateLabel?6:7)}}function Mj(n,t){n&1&&Ve(0)}function kj(n,t){if(n&1){let e=Pt();y(0,"mat-tab-body",13),fe("_onCentered",function(){We(e);let r=R();return Ge(r._removeTabBodyWrapperHeight())})("_onCentering",function(r){We(e);let o=R();return Ge(o._setTabBodyWrapperHeight(r))})("_beforeCentering",function(r){We(e);let o=R();return Ge(o._bodyCentered(r))}),v()}if(n&2){let e=t.$implicit,i=t.$index,r=R();xn(e.bodyClass),ge("id",r._getTabContentId(i))("content",e.content)("position",e.position)("animationDuration",r.animationDuration)("preserveContent",r.preserveContent),Le("tabindex",r.contentTabIndex!=null&&r.selectedIndex===i?r.contentTabIndex:null)("aria-labelledby",r._getTabLabelId(e,i))("aria-hidden",r.selectedIndex!==i)}}var Aj=new b("MatTabContent"),Rj=(()=>{class n{template=f(Tt);constructor(){}static \u0275fac=function(i){return new(i||n)};static \u0275dir=Y({type:n,selectors:[["","matTabContent",""]],features:[bt([{provide:Aj,useExisting:n}])]})}return n})(),Oj=new b("MatTabLabel"),bM=new b("MAT_TAB"),rC=(()=>{class n extends XI{_closestTab=f(bM,{optional:!0});static \u0275fac=(()=>{let e;return function(r){return(e||(e=hn(n)))(r||n)}})();static \u0275dir=Y({type:n,selectors:[["","mat-tab-label",""],["","matTabLabel",""]],features:[bt([{provide:Oj,useExisting:n}]),St]})}return n})(),_M=new b("MAT_TAB_GROUP"),oC=(()=>{class n{_viewContainerRef=f(ht);_closestTabGroup=f(_M,{optional:!0});disabled=!1;get templateLabel(){return this._templateLabel}set templateLabel(e){this._setTemplateLabelInput(e)}_templateLabel;_explicitContent=void 0;_implicitContent;textLabel="";ariaLabel;ariaLabelledby;labelClass;bodyClass;id=null;_contentPortal=null;get content(){return this._contentPortal}_stateChanges=new D;position=null;origin=null;isActive=!1;constructor(){f(Cn).load($a)}ngOnChanges(e){(e.hasOwnProperty("textLabel")||e.hasOwnProperty("disabled"))&&this._stateChanges.next()}ngOnDestroy(){this._stateChanges.complete()}ngOnInit(){this._contentPortal=new zi(this._explicitContent||this._implicitContent,this._viewContainerRef)}_setTemplateLabelInput(e){e&&e._closestTab===this&&(this._templateLabel=e)}static \u0275fac=function(i){return new(i||n)};static \u0275cmp=J({type:n,selectors:[["mat-tab"]],contentQueries:function(i,r,o){if(i&1&&In(o,rC,5)(o,Rj,7,Tt),i&2){let s;W(s=G())&&(r.templateLabel=s.first),W(s=G())&&(r._explicitContent=s.first)}},viewQuery:function(i,r){if(i&1&&vt(Tt,7),i&2){let o;W(o=G())&&(r._implicitContent=o.first)}},hostAttrs:["hidden",""],hostVars:1,hostBindings:function(i,r){i&2&&Le("id",null)},inputs:{disabled:[2,"disabled","disabled",oe],textLabel:[0,"label","textLabel"],ariaLabel:[0,"aria-label","ariaLabel"],ariaLabelledby:[0,"aria-labelledby","ariaLabelledby"],labelClass:"labelClass",bodyClass:"bodyClass",id:"id"},exportAs:["matTab"],features:[bt([{provide:bM,useExisting:n}]),It],ngContentSelectors:iC,decls:1,vars:0,template:function(i,r){i&1&&(Ft(),ra(0,mj,1,0,"ng-template"))},encapsulation:2})}return n})(),J_="mdc-tab-indicator--active",gM="mdc-tab-indicator--no-transition",eC=class{_items;_currentItem;constructor(t){this._items=t}hide(){this._items.forEach(t=>t.deactivateInkBar()),this._currentItem=void 0}alignToElement(t){let e=this._items.find(r=>r.elementRef.nativeElement===t),i=this._currentItem;if(e!==i&&(i?.deactivateInkBar(),e)){let r=i?.elementRef.nativeElement.getBoundingClientRect?.();e.activateInkBar(r),this._currentItem=e}}},Nj=(()=>{class n{_elementRef=f(z);_inkBarElement=null;_inkBarContentElement=null;_fitToContent=!1;get fitInkBarToContent(){return this._fitToContent}set fitInkBarToContent(e){this._fitToContent!==e&&(this._fitToContent=e,this._inkBarElement&&this._appendInkBarElement())}activateInkBar(e){let i=this._elementRef.nativeElement;if(!e||!i.getBoundingClientRect||!this._inkBarContentElement){i.classList.add(J_);return}let r=i.getBoundingClientRect(),o=e.width/r.width,s=e.left-r.left;i.classList.add(gM),this._inkBarContentElement.style.setProperty("transform",`translateX(${s}px) scaleX(${o})`),i.getBoundingClientRect(),i.classList.remove(gM),i.classList.add(J_),this._inkBarContentElement.style.setProperty("transform","")}deactivateInkBar(){this._elementRef.nativeElement.classList.remove(J_)}ngOnInit(){this._createInkBarElement()}ngOnDestroy(){this._inkBarElement?.remove(),this._inkBarElement=this._inkBarContentElement=null}_createInkBarElement(){let e=this._elementRef.nativeElement.ownerDocument||document,i=this._inkBarElement=e.createElement("span"),r=this._inkBarContentElement=e.createElement("span");i.className="mdc-tab-indicator",r.className="mdc-tab-indicator__content mdc-tab-indicator__content--underline",i.appendChild(this._inkBarContentElement),this._appendInkBarElement()}_appendInkBarElement(){this._inkBarElement;let e=this._fitToContent?this._elementRef.nativeElement.querySelector(".mdc-tab__content"):this._elementRef.nativeElement;e.appendChild(this._inkBarElement)}static \u0275fac=function(i){return new(i||n)};static \u0275dir=Y({type:n,inputs:{fitInkBarToContent:[2,"fitInkBarToContent","fitInkBarToContent",oe]}})}return n})();var CM=(()=>{class n extends Nj{elementRef=f(z);disabled=!1;focus(){this.elementRef.nativeElement.focus()}getOffsetLeft(){return this.elementRef.nativeElement.offsetLeft}getOffsetWidth(){return this.elementRef.nativeElement.offsetWidth}static \u0275fac=(()=>{let e;return function(r){return(e||(e=hn(n)))(r||n)}})();static \u0275dir=Y({type:n,selectors:[["","matTabLabelWrapper",""]],hostVars:3,hostBindings:function(i,r){i&2&&(Le("aria-disabled",!!r.disabled),ye("mat-mdc-tab-disabled",r.disabled))},inputs:{disabled:[2,"disabled","disabled",oe]},features:[St]})}return n})(),yM={passive:!0},Pj=650,Fj=100,Lj=(()=>{class n{_elementRef=f(z);_changeDetectorRef=f(et);_viewportRuler=f(ti);_dir=f(Bt,{optional:!0});_ngZone=f(L);_platform=f(He);_sharedResizeObserver=f(gp);_injector=f(re);_renderer=f(yt);_animationsDisabled=At();_eventCleanups;_scrollDistance=0;_selectedIndexChanged=!1;_destroyed=new D;_showPaginationControls=!1;_disableScrollAfter=!0;_disableScrollBefore=!0;_tabLabelCount;_scrollDistanceChanged=!1;_keyManager;_currentTextContent;_stopScrolling=new D;disablePagination=!1;get selectedIndex(){return this._selectedIndex}set selectedIndex(e){let i=isNaN(e)?0:e;this._selectedIndex!=i&&(this._selectedIndexChanged=!0,this._selectedIndex=i,this._keyManager&&this._keyManager.updateActiveItem(i))}_selectedIndex=0;selectFocusedIndex=new F;indexFocused=new F;constructor(){this._eventCleanups=this._ngZone.runOutsideAngular(()=>[this._renderer.listen(this._elementRef.nativeElement,"mouseleave",()=>this._stopInterval())])}ngAfterViewInit(){this._eventCleanups.push(this._renderer.listen(this._previousPaginator.nativeElement,"touchstart",()=>this._handlePaginatorPress("before"),yM),this._renderer.listen(this._nextPaginator.nativeElement,"touchstart",()=>this._handlePaginatorPress("after"),yM))}ngAfterContentInit(){let e=this._dir?this._dir.change:M("ltr"),i=this._sharedResizeObserver.observe(this._elementRef.nativeElement).pipe(Xi(32),K(this._destroyed)),r=this._viewportRuler.change(150).pipe(K(this._destroyed)),o=()=>{this.updatePagination(),this._alignInkBarToSelectedTab()};this._keyManager=new ps(this._items).withHorizontalOrientation(this._getLayoutDirection()).withHomeAndEnd().withWrap().skipPredicate(()=>!1),this._keyManager.updateActiveItem(Math.max(this._selectedIndex,0)),wt(o,{injector:this._injector}),Qt(e,r,i,this._items.changes,this._itemsResized()).pipe(K(this._destroyed)).subscribe(()=>{this._ngZone.run(()=>{Promise.resolve().then(()=>{this._scrollDistance=Math.max(0,Math.min(this._getMaxScrollDistance(),this._scrollDistance)),o()})}),this._keyManager?.withHorizontalOrientation(this._getLayoutDirection())}),this._keyManager.change.subscribe(s=>{this.indexFocused.emit(s),this._setTabFocus(s)})}_itemsResized(){return typeof ResizeObserver!="function"?je:this._items.changes.pipe(dt(this._items),ut(e=>new U(i=>this._ngZone.runOutsideAngular(()=>{let r=new ResizeObserver(o=>i.next(o));return e.forEach(o=>r.observe(o.elementRef.nativeElement)),()=>{r.disconnect()}}))),xo(1),_e(e=>e.some(i=>i.contentRect.width>0&&i.contentRect.height>0)))}ngAfterContentChecked(){this._tabLabelCount!=this._items.length&&(this.updatePagination(),this._tabLabelCount=this._items.length,this._changeDetectorRef.markForCheck()),this._selectedIndexChanged&&(this._scrollToLabel(this._selectedIndex),this._checkScrollingControls(),this._alignInkBarToSelectedTab(),this._selectedIndexChanged=!1,this._changeDetectorRef.markForCheck()),this._scrollDistanceChanged&&(this._updateTabScrollPosition(),this._scrollDistanceChanged=!1,this._changeDetectorRef.markForCheck())}ngOnDestroy(){this._eventCleanups.forEach(e=>e()),this._keyManager?.destroy(),this._destroyed.next(),this._destroyed.complete(),this._stopScrolling.complete()}_handleKeydown(e){if(!Yt(e))switch(e.keyCode){case 13:case 32:if(this.focusIndex!==this.selectedIndex){let i=this._items.get(this.focusIndex);i&&!i.disabled&&(this.selectFocusedIndex.emit(this.focusIndex),this._itemSelected(e))}break;default:this._keyManager?.onKeydown(e)}}_onContentChanges(){let e=this._elementRef.nativeElement.textContent;e!==this._currentTextContent&&(this._currentTextContent=e||"",this._ngZone.run(()=>{this.updatePagination(),this._alignInkBarToSelectedTab(),this._changeDetectorRef.markForCheck()}))}updatePagination(){this._checkPaginationEnabled(),this._checkScrollingControls(),this._updateTabScrollPosition()}get focusIndex(){return this._keyManager?this._keyManager.activeItemIndex:0}set focusIndex(e){!this._isValidIndex(e)||this.focusIndex===e||!this._keyManager||this._keyManager.setActiveItem(e)}_isValidIndex(e){return this._items?!!this._items.toArray()[e]:!0}_setTabFocus(e){if(this._showPaginationControls&&this._scrollToLabel(e),this._items&&this._items.length){this._items.toArray()[e].focus();let i=this._tabListContainer.nativeElement;this._getLayoutDirection()=="ltr"?i.scrollLeft=0:i.scrollLeft=i.scrollWidth-i.offsetWidth}}_getLayoutDirection(){return this._dir&&this._dir.value==="rtl"?"rtl":"ltr"}_updateTabScrollPosition(){if(this.disablePagination)return;let e=this.scrollDistance,i=this._getLayoutDirection()==="ltr"?-e:e;this._tabList.nativeElement.style.transform=`translateX(${Math.round(i)}px)`,(this._platform.TRIDENT||this._platform.EDGE)&&(this._tabListContainer.nativeElement.scrollLeft=0)}get scrollDistance(){return this._scrollDistance}set scrollDistance(e){this._scrollTo(e)}_scrollHeader(e){let i=this._tabListContainer.nativeElement.offsetWidth,r=(e=="before"?-1:1)*i/3;return this._scrollTo(this._scrollDistance+r)}_handlePaginatorClick(e){this._stopInterval(),this._scrollHeader(e)}_scrollToLabel(e){if(this.disablePagination)return;let i=this._items?this._items.toArray()[e]:null;if(!i)return;let r=this._tabListContainer.nativeElement.offsetWidth,{offsetLeft:o,offsetWidth:s}=i.elementRef.nativeElement,a,l;this._getLayoutDirection()=="ltr"?(a=o,l=a+s):(l=this._tabListInner.nativeElement.offsetWidth-o,a=l-s);let c=this.scrollDistance,d=this.scrollDistance+r;a<c?this.scrollDistance-=c-a:l>d&&(this.scrollDistance+=Math.min(l-d,a-c))}_checkPaginationEnabled(){if(this.disablePagination)this._showPaginationControls=!1;else{let e=this._tabListInner.nativeElement.scrollWidth,i=this._elementRef.nativeElement.offsetWidth,r=e-i>=5;r||(this.scrollDistance=0),r!==this._showPaginationControls&&(this._showPaginationControls=r,this._changeDetectorRef.markForCheck())}}_checkScrollingControls(){this.disablePagination?this._disableScrollAfter=this._disableScrollBefore=!0:(this._disableScrollBefore=this.scrollDistance==0,this._disableScrollAfter=this.scrollDistance==this._getMaxScrollDistance(),this._changeDetectorRef.markForCheck())}_getMaxScrollDistance(){let e=this._tabListInner.nativeElement.scrollWidth,i=this._tabListContainer.nativeElement.offsetWidth;return e-i||0}_alignInkBarToSelectedTab(){let e=this._items&&this._items.length?this._items.toArray()[this.selectedIndex]:null,i=e?e.elementRef.nativeElement:null;i?this._inkBar.alignToElement(i):this._inkBar.hide()}_stopInterval(){this._stopScrolling.next()}_handlePaginatorPress(e,i){i&&i.button!=null&&i.button!==0||(this._stopInterval(),dl(Pj,Fj).pipe(K(Qt(this._stopScrolling,this._destroyed))).subscribe(()=>{let{maxScrollDistance:r,distance:o}=this._scrollHeader(e);(o===0||o>=r)&&this._stopInterval()}))}_scrollTo(e){if(this.disablePagination)return{maxScrollDistance:0,distance:0};let i=this._getMaxScrollDistance();return this._scrollDistance=Math.max(0,Math.min(i,e)),this._scrollDistanceChanged=!0,this._checkScrollingControls(),{maxScrollDistance:i,distance:this._scrollDistance}}static \u0275fac=function(i){return new(i||n)};static \u0275dir=Y({type:n,inputs:{disablePagination:[2,"disablePagination","disablePagination",oe],selectedIndex:[2,"selectedIndex","selectedIndex",Xo]},outputs:{selectFocusedIndex:"selectFocusedIndex",indexFocused:"indexFocused"}})}return n})(),Vj=(()=>{class n extends Lj{_items;_tabListContainer;_tabList;_tabListInner;_nextPaginator;_previousPaginator;_inkBar;ariaLabel;ariaLabelledby;disableRipple=!1;ngAfterContentInit(){this._inkBar=new eC(this._items),super.ngAfterContentInit()}_itemSelected(e){e.preventDefault()}static \u0275fac=(()=>{let e;return function(r){return(e||(e=hn(n)))(r||n)}})();static \u0275cmp=J({type:n,selectors:[["mat-tab-header"]],contentQueries:function(i,r,o){if(i&1&&In(o,CM,4),i&2){let s;W(s=G())&&(r._items=s)}},viewQuery:function(i,r){if(i&1&&vt(gj,7)(yj,7)(vj,7)(bj,5)(_j,5),i&2){let o;W(o=G())&&(r._tabListContainer=o.first),W(o=G())&&(r._tabList=o.first),W(o=G())&&(r._tabListInner=o.first),W(o=G())&&(r._nextPaginator=o.first),W(o=G())&&(r._previousPaginator=o.first)}},hostAttrs:[1,"mat-mdc-tab-header"],hostVars:4,hostBindings:function(i,r){i&2&&ye("mat-mdc-tab-header-pagination-controls-enabled",r._showPaginationControls)("mat-mdc-tab-header-rtl",r._getLayoutDirection()=="rtl")},inputs:{ariaLabel:[0,"aria-label","ariaLabel"],ariaLabelledby:[0,"aria-labelledby","ariaLabelledby"],disableRipple:[2,"disableRipple","disableRipple",oe]},features:[St],ngContentSelectors:iC,decls:13,vars:10,consts:[["previousPaginator",""],["tabListContainer",""],["tabList",""],["tabListInner",""],["nextPaginator",""],["mat-ripple","",1,"mat-mdc-tab-header-pagination","mat-mdc-tab-header-pagination-before",3,"click","mousedown","touchend","matRippleDisabled"],[1,"mat-mdc-tab-header-pagination-chevron"],[1,"mat-mdc-tab-label-container",3,"keydown"],["role","tablist",1,"mat-mdc-tab-list",3,"cdkObserveContent"],[1,"mat-mdc-tab-labels"],["mat-ripple","",1,"mat-mdc-tab-header-pagination","mat-mdc-tab-header-pagination-after",3,"mousedown","click","touchend","matRippleDisabled"]],template:function(i,r){i&1&&(Ft(),y(0,"div",5,0),fe("click",function(){return r._handlePaginatorClick("before")})("mousedown",function(s){return r._handlePaginatorPress("before",s)})("touchend",function(){return r._stopInterval()}),me(2,"div",6),v(),y(3,"div",7,1),fe("keydown",function(s){return r._handleKeydown(s)}),y(5,"div",8,2),fe("cdkObserveContent",function(){return r._onContentChanges()}),y(7,"div",9,3),Ve(9),v()()(),y(10,"div",10,4),fe("mousedown",function(s){return r._handlePaginatorPress("after",s)})("click",function(){return r._handlePaginatorClick("after")})("touchend",function(){return r._stopInterval()}),me(12,"div",6),v()),i&2&&(ye("mat-mdc-tab-header-pagination-disabled",r._disableScrollBefore),ge("matRippleDisabled",r._disableScrollBefore||r.disableRipple),_(3),ye("_mat-animation-noopable",r._animationsDisabled),_(2),Le("aria-label",r.ariaLabel||null)("aria-labelledby",r.ariaLabelledby||null),_(5),ye("mat-mdc-tab-header-pagination-disabled",r._disableScrollAfter),ge("matRippleDisabled",r._disableScrollAfter||r.disableRipple))},dependencies:[Cs,NI],styles:[`.mat-mdc-tab-header {
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
`],encapsulation:2})}return n})(),Bj=new b("MAT_TABS_CONFIG"),vM=(()=>{class n extends I_{_host=f(tC);_ngZone=f(L);_centeringSub=H.EMPTY;_leavingSub=H.EMPTY;constructor(){super()}ngOnInit(){super.ngOnInit(),this._centeringSub=this._host._beforeCentering.pipe(dt(this._host._isCenterPosition())).subscribe(e=>{this._host._content&&e&&!this.hasAttached()&&this._ngZone.run(()=>{Promise.resolve().then(),this.attach(this._host._content)})}),this._leavingSub=this._host._afterLeavingCenter.subscribe(()=>{this._host.preserveContent||this._ngZone.run(()=>this.detach())})}ngOnDestroy(){super.ngOnDestroy(),this._centeringSub.unsubscribe(),this._leavingSub.unsubscribe()}static \u0275fac=function(i){return new(i||n)};static \u0275dir=Y({type:n,selectors:[["","matTabBodyHost",""]],features:[St]})}return n})(),tC=(()=>{class n{_elementRef=f(z);_dir=f(Bt,{optional:!0});_ngZone=f(L);_injector=f(re);_renderer=f(yt);_diAnimationsDisabled=At();_eventCleanups;_initialized=!1;_fallbackTimer;_positionIndex;_dirChangeSubscription=H.EMPTY;_position;_previousPosition;_onCentering=new F;_beforeCentering=new F;_afterLeavingCenter=new F;_onCentered=new F(!0);_portalHost;_contentElement;_content;animationDuration="500ms";preserveContent=!1;set position(e){this._positionIndex=e,this._computePositionAnimationState()}constructor(){if(this._dir){let e=f(et);this._dirChangeSubscription=this._dir.change.subscribe(i=>{this._computePositionAnimationState(i),e.markForCheck()})}}ngOnInit(){this._bindTransitionEvents(),this._position==="center"&&(this._setActiveClass(!0),wt(()=>this._onCentering.emit(this._elementRef.nativeElement.clientHeight),{injector:this._injector})),this._initialized=!0}ngOnDestroy(){clearTimeout(this._fallbackTimer),this._eventCleanups?.forEach(e=>e()),this._dirChangeSubscription.unsubscribe()}_bindTransitionEvents(){this._ngZone.runOutsideAngular(()=>{let e=this._elementRef.nativeElement,i=r=>{r.target===this._contentElement?.nativeElement&&(this._elementRef.nativeElement.classList.remove("mat-tab-body-animating"),r.type==="transitionend"&&this._transitionDone())};this._eventCleanups=[this._renderer.listen(e,"transitionstart",r=>{r.target===this._contentElement?.nativeElement&&(this._elementRef.nativeElement.classList.add("mat-tab-body-animating"),this._transitionStarted())}),this._renderer.listen(e,"transitionend",i),this._renderer.listen(e,"transitioncancel",i)]})}_transitionStarted(){clearTimeout(this._fallbackTimer);let e=this._position==="center";this._beforeCentering.emit(e),e&&this._onCentering.emit(this._elementRef.nativeElement.clientHeight)}_transitionDone(){this._position==="center"?this._onCentered.emit():this._previousPosition==="center"&&this._afterLeavingCenter.emit()}_setActiveClass(e){this._elementRef.nativeElement.classList.toggle("mat-mdc-tab-body-active",e)}_getLayoutDirection(){return this._dir&&this._dir.value==="rtl"?"rtl":"ltr"}_isCenterPosition(){return this._positionIndex===0}_computePositionAnimationState(e=this._getLayoutDirection()){this._previousPosition=this._position,this._positionIndex<0?this._position=e=="ltr"?"left":"right":this._positionIndex>0?this._position=e=="ltr"?"right":"left":this._position="center",this._animationsDisabled()?this._simulateTransitionEvents():this._initialized&&(this._position==="center"||this._previousPosition==="center")&&(clearTimeout(this._fallbackTimer),this._fallbackTimer=this._ngZone.runOutsideAngular(()=>setTimeout(()=>this._simulateTransitionEvents(),100)))}_simulateTransitionEvents(){this._transitionStarted(),wt(()=>this._transitionDone(),{injector:this._injector})}_animationsDisabled(){return this._diAnimationsDisabled||this.animationDuration==="0ms"||this.animationDuration==="0s"}static \u0275fac=function(i){return new(i||n)};static \u0275cmp=J({type:n,selectors:[["mat-tab-body"]],viewQuery:function(i,r){if(i&1&&vt(vM,5)(Cj,5),i&2){let o;W(o=G())&&(r._portalHost=o.first),W(o=G())&&(r._contentElement=o.first)}},hostAttrs:[1,"mat-mdc-tab-body"],hostVars:1,hostBindings:function(i,r){i&2&&Le("inert",r._position==="center"?null:"")},inputs:{_content:[0,"content","_content"],animationDuration:"animationDuration",preserveContent:"preserveContent",position:"position"},outputs:{_onCentering:"_onCentering",_beforeCentering:"_beforeCentering",_onCentered:"_onCentered"},decls:3,vars:6,consts:[["content",""],["cdkScrollable","",1,"mat-mdc-tab-body-content"],["matTabBodyHost",""]],template:function(i,r){i&1&&(y(0,"div",1,0),Wt(2,Dj,0,0,"ng-template",2),v()),i&2&&ye("mat-tab-body-content-left",r._position==="left")("mat-tab-body-content-right",r._position==="right")("mat-tab-body-content-can-animate",r._position==="center"||r._previousPosition==="center")},dependencies:[vM,Kc],styles:[`.mat-mdc-tab-body {
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
`],encapsulation:2})}return n})(),DM=(()=>{class n{_elementRef=f(z);_changeDetectorRef=f(et);_ngZone=f(L);_tabsSubscription=H.EMPTY;_tabLabelSubscription=H.EMPTY;_tabBodySubscription=H.EMPTY;_diAnimationsDisabled=At();_allTabs;_tabBodies;_tabBodyWrapper;_tabHeader;_tabs=new ui;_indexToSelect=0;_lastFocusedTabIndex=null;_tabBodyWrapperHeight=0;color;get fitInkBarToContent(){return this._fitInkBarToContent}set fitInkBarToContent(e){this._fitInkBarToContent=e,this._changeDetectorRef.markForCheck()}_fitInkBarToContent=!1;stretchTabs=!0;alignTabs=null;dynamicHeight=!1;get selectedIndex(){return this._selectedIndex}set selectedIndex(e){this._indexToSelect=isNaN(e)?null:e}_selectedIndex=null;headerPosition="above";get animationDuration(){return this._animationDuration}set animationDuration(e){let i=e+"";this._animationDuration=/^\d+$/.test(i)?e+"ms":i}_animationDuration;get contentTabIndex(){return this._contentTabIndex}set contentTabIndex(e){this._contentTabIndex=isNaN(e)?null:e}_contentTabIndex=null;disablePagination=!1;disableRipple=!1;preserveContent=!1;get backgroundColor(){return this._backgroundColor}set backgroundColor(e){let i=this._elementRef.nativeElement.classList;i.remove("mat-tabs-with-background",`mat-background-${this.backgroundColor}`),e&&i.add("mat-tabs-with-background",`mat-background-${e}`),this._backgroundColor=e}_backgroundColor;ariaLabel;ariaLabelledby;selectedIndexChange=new F;focusChange=new F;animationDone=new F;selectedTabChange=new F(!0);_groupId;_isServer=!f(He).isBrowser;constructor(){let e=f(Bj,{optional:!0});this._groupId=f(Zt).getId("mat-tab-group-"),this.animationDuration=e&&e.animationDuration?e.animationDuration:"500ms",this.disablePagination=e&&e.disablePagination!=null?e.disablePagination:!1,this.dynamicHeight=e&&e.dynamicHeight!=null?e.dynamicHeight:!1,e?.contentTabIndex!=null&&(this.contentTabIndex=e.contentTabIndex),this.preserveContent=!!e?.preserveContent,this.fitInkBarToContent=e&&e.fitInkBarToContent!=null?e.fitInkBarToContent:!1,this.stretchTabs=e&&e.stretchTabs!=null?e.stretchTabs:!0,this.alignTabs=e&&e.alignTabs!=null?e.alignTabs:null}ngAfterContentChecked(){let e=this._indexToSelect=this._clampTabIndex(this._indexToSelect);if(this._selectedIndex!=e){let i=this._selectedIndex==null;if(!i){this.selectedTabChange.emit(this._createChangeEvent(e));let r=this._tabBodyWrapper.nativeElement;r.style.minHeight=r.clientHeight+"px"}Promise.resolve().then(()=>{this._tabs.forEach((r,o)=>r.isActive=o===e),i||(this.selectedIndexChange.emit(e),this._tabBodyWrapper.nativeElement.style.minHeight="")})}this._tabs.forEach((i,r)=>{i.position=r-e,this._selectedIndex!=null&&i.position==0&&!i.origin&&(i.origin=e-this._selectedIndex)}),this._selectedIndex!==e&&(this._selectedIndex=e,this._lastFocusedTabIndex=null,this._changeDetectorRef.markForCheck())}ngAfterContentInit(){this._subscribeToAllTabChanges(),this._subscribeToTabLabels(),this._tabsSubscription=this._tabs.changes.subscribe(()=>{let e=this._clampTabIndex(this._indexToSelect);if(e===this._selectedIndex){let i=this._tabs.toArray(),r;for(let o=0;o<i.length;o++)if(i[o].isActive){this._indexToSelect=this._selectedIndex=o,this._lastFocusedTabIndex=null,r=i[o];break}!r&&i[e]&&Promise.resolve().then(()=>{i[e].isActive=!0,this.selectedTabChange.emit(this._createChangeEvent(e))})}this._changeDetectorRef.markForCheck()})}ngAfterViewInit(){this._tabBodySubscription=this._tabBodies.changes.subscribe(()=>this._bodyCentered(!0))}_subscribeToAllTabChanges(){this._allTabs.changes.pipe(dt(this._allTabs)).subscribe(e=>{this._tabs.reset(e.filter(i=>i._closestTabGroup===this||!i._closestTabGroup)),this._tabs.notifyOnChanges()})}ngOnDestroy(){this._tabs.destroy(),this._tabsSubscription.unsubscribe(),this._tabLabelSubscription.unsubscribe(),this._tabBodySubscription.unsubscribe()}realignInkBar(){this._tabHeader&&this._tabHeader._alignInkBarToSelectedTab()}updatePagination(){this._tabHeader&&this._tabHeader.updatePagination()}focusTab(e){let i=this._tabHeader;i&&(i.focusIndex=e)}_focusChanged(e){this._lastFocusedTabIndex=e,this.focusChange.emit(this._createChangeEvent(e))}_createChangeEvent(e){let i=new nC;return i.index=e,this._tabs&&this._tabs.length&&(i.tab=this._tabs.toArray()[e]),i}_subscribeToTabLabels(){this._tabLabelSubscription&&this._tabLabelSubscription.unsubscribe(),this._tabLabelSubscription=Qt(...this._tabs.map(e=>e._stateChanges)).subscribe(()=>this._changeDetectorRef.markForCheck())}_clampTabIndex(e){return Math.min(this._tabs.length-1,Math.max(e||0,0))}_getTabLabelId(e,i){return e.id||`${this._groupId}-label-${i}`}_getTabContentId(e){return`${this._groupId}-content-${e}`}_setTabBodyWrapperHeight(e){if(!this.dynamicHeight||!this._tabBodyWrapperHeight){this._tabBodyWrapperHeight=e;return}let i=this._tabBodyWrapper.nativeElement;i.style.height=this._tabBodyWrapperHeight+"px",this._tabBodyWrapper.nativeElement.offsetHeight&&(i.style.height=e+"px")}_removeTabBodyWrapperHeight(){let e=this._tabBodyWrapper.nativeElement;this._tabBodyWrapperHeight=e.clientHeight,e.style.height="",this._ngZone.run(()=>this.animationDone.emit())}_handleClick(e,i,r){i.focusIndex=r,e.disabled||(this.selectedIndex=r)}_getTabIndex(e){let i=this._lastFocusedTabIndex??this.selectedIndex;return e===i?0:-1}_tabFocusChanged(e,i){e&&e!=="mouse"&&e!=="touch"&&(this._tabHeader.focusIndex=i)}_bodyCentered(e){e&&this._tabBodies?.forEach((i,r)=>i._setActiveClass(r===this._selectedIndex))}_animationsDisabled(){return this._diAnimationsDisabled||this.animationDuration==="0"||this.animationDuration==="0ms"}static \u0275fac=function(i){return new(i||n)};static \u0275cmp=J({type:n,selectors:[["mat-tab-group"]],contentQueries:function(i,r,o){if(i&1&&In(o,oC,5),i&2){let s;W(s=G())&&(r._allTabs=s)}},viewQuery:function(i,r){if(i&1&&vt(Ej,5)(wj,5)(tC,5),i&2){let o;W(o=G())&&(r._tabBodyWrapper=o.first),W(o=G())&&(r._tabHeader=o.first),W(o=G())&&(r._tabBodies=o)}},hostAttrs:[1,"mat-mdc-tab-group"],hostVars:11,hostBindings:function(i,r){i&2&&(Le("mat-align-tabs",r.alignTabs),xn("mat-"+(r.color||"primary")),sa("--mat-tab-animation-duration",r.animationDuration),ye("mat-mdc-tab-group-dynamic-height",r.dynamicHeight)("mat-mdc-tab-group-inverted-header",r.headerPosition==="below")("mat-mdc-tab-group-stretch-tabs",r.stretchTabs))},inputs:{color:"color",fitInkBarToContent:[2,"fitInkBarToContent","fitInkBarToContent",oe],stretchTabs:[2,"mat-stretch-tabs","stretchTabs",oe],alignTabs:[0,"mat-align-tabs","alignTabs"],dynamicHeight:[2,"dynamicHeight","dynamicHeight",oe],selectedIndex:[2,"selectedIndex","selectedIndex",Xo],headerPosition:"headerPosition",animationDuration:"animationDuration",contentTabIndex:[2,"contentTabIndex","contentTabIndex",Xo],disablePagination:[2,"disablePagination","disablePagination",oe],disableRipple:[2,"disableRipple","disableRipple",oe],preserveContent:[2,"preserveContent","preserveContent",oe],backgroundColor:"backgroundColor",ariaLabel:[0,"aria-label","ariaLabel"],ariaLabelledby:[0,"aria-labelledby","ariaLabelledby"]},outputs:{selectedIndexChange:"selectedIndexChange",focusChange:"focusChange",animationDone:"animationDone",selectedTabChange:"selectedTabChange"},exportAs:["matTabGroup"],features:[bt([{provide:_M,useExisting:n}])],ngContentSelectors:iC,decls:9,vars:8,consts:[["tabHeader",""],["tabBodyWrapper",""],["tabNode",""],[3,"indexFocused","selectFocusedIndex","selectedIndex","disableRipple","disablePagination","aria-label","aria-labelledby"],["role","tab","matTabLabelWrapper","","cdkMonitorElementFocus","",1,"mdc-tab","mat-mdc-tab","mat-focus-indicator",3,"id","mdc-tab--active","class","disabled","fitInkBarToContent"],[1,"mat-mdc-tab-body-wrapper"],["role","tabpanel",3,"id","class","content","position","animationDuration","preserveContent"],["role","tab","matTabLabelWrapper","","cdkMonitorElementFocus","",1,"mdc-tab","mat-mdc-tab","mat-focus-indicator",3,"click","cdkFocusChange","id","disabled","fitInkBarToContent"],[1,"mdc-tab__ripple"],["mat-ripple","",1,"mat-mdc-tab-ripple",3,"matRippleTrigger","matRippleDisabled"],[1,"mdc-tab__content"],[1,"mdc-tab__text-label"],[3,"cdkPortalOutlet"],["role","tabpanel",3,"_onCentered","_onCentering","_beforeCentering","id","content","position","animationDuration","preserveContent"]],template:function(i,r){i&1&&(Ft(),y(0,"mat-tab-header",3,0),fe("indexFocused",function(s){return r._focusChanged(s)})("selectFocusedIndex",function(s){return r.selectedIndex=s}),pi(2,xj,8,17,"div",4,Qr),v(),ee(4,Mj,1,0),y(5,"div",5,1),pi(7,kj,1,10,"mat-tab-body",6,Qr),v()),i&2&&(ge("selectedIndex",r.selectedIndex||0)("disableRipple",r.disableRipple)("disablePagination",r.disablePagination),pf("aria-label",r.ariaLabel)("aria-labelledby",r.ariaLabelledby),_(2),mi(r._tabs),_(2),te(r._isServer?4:-1),_(),ye("_mat-animation-noopable",r._animationsDisabled()),_(2),mi(r._tabs))},dependencies:[Vj,CM,f_,Cs,I_,tC],styles:[`.mdc-tab {
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
`],encapsulation:2})}return n})(),nC=class{index;tab};var EM=(()=>{class n{static \u0275fac=function(i){return new(i||n)};static \u0275mod=Ce({type:n});static \u0275inj=be({imports:[pt]})}return n})();var Uj=["tooltip"],Hj=20;var $j=new b("mat-tooltip-scroll-strategy",{providedIn:"root",factory:()=>{let n=f(re);return()=>xr(n,{scrollThrottle:Hj})}}),zj=new b("mat-tooltip-default-options",{providedIn:"root",factory:()=>({showDelay:0,hideDelay:0,touchendHideDelay:1500})});var wM="tooltip-panel",Wj={passive:!0},Gj=8,qj=8,Kj=24,Yj=200,Ti=(()=>{class n{_elementRef=f(z);_ngZone=f(L);_platform=f(He);_ariaDescriber=f(zI);_focusMonitor=f(co);_dir=f(Bt);_injector=f(re);_viewContainerRef=f(ht);_mediaMatcher=f(Pa);_document=f(le);_renderer=f(yt);_animationsDisabled=At();_defaultOptions=f(zj,{optional:!0});_overlayRef=null;_tooltipInstance=null;_overlayPanelClass;_portal;_position="below";_positionAtOrigin=!1;_disabled=!1;_tooltipClass;_viewInitialized=!1;_pointerExitEventsInitialized=!1;_tooltipComponent=SM;_viewportMargin=8;_currentPosition;_cssClassPrefix="mat-mdc";_ariaDescriptionPending=!1;_dirSubscribed=!1;get position(){return this._position}set position(e){e!==this._position&&(this._position=e,this._overlayRef&&(this._updatePosition(this._overlayRef),this._tooltipInstance?.show(0),this._overlayRef.updatePosition()))}get positionAtOrigin(){return this._positionAtOrigin}set positionAtOrigin(e){this._positionAtOrigin=sd(e),this._detach(),this._overlayRef=null}get disabled(){return this._disabled}set disabled(e){let i=sd(e);this._disabled!==i&&(this._disabled=i,i?this.hide(0):this._setupPointerEnterEventsIfNeeded(),this._syncAriaDescription(this.message))}get showDelay(){return this._showDelay}set showDelay(e){this._showDelay=wi(e)}_showDelay;get hideDelay(){return this._hideDelay}set hideDelay(e){this._hideDelay=wi(e),this._tooltipInstance&&(this._tooltipInstance._mouseLeaveHideDelay=this._hideDelay)}_hideDelay;touchGestures="auto";get message(){return this._message}set message(e){let i=this._message;this._message=e!=null?String(e).trim():"",!this._message&&this._isTooltipVisible()?this.hide(0):(this._setupPointerEnterEventsIfNeeded(),this._updateTooltipMessage()),this._syncAriaDescription(i)}_message="";get tooltipClass(){return this._tooltipClass}set tooltipClass(e){this._tooltipClass=e,this._tooltipInstance&&this._setTooltipClass(this._tooltipClass)}_eventCleanups=[];_touchstartTimeout=null;_destroyed=new D;_isDestroyed=!1;constructor(){let e=this._defaultOptions;e&&(this._showDelay=e.showDelay,this._hideDelay=e.hideDelay,e.position&&(this.position=e.position),e.positionAtOrigin&&(this.positionAtOrigin=e.positionAtOrigin),e.touchGestures&&(this.touchGestures=e.touchGestures),e.tooltipClass&&(this.tooltipClass=e.tooltipClass)),this._viewportMargin=Gj}ngAfterViewInit(){this._viewInitialized=!0,this._setupPointerEnterEventsIfNeeded(),this._focusMonitor.monitor(this._elementRef).pipe(K(this._destroyed)).subscribe(e=>{e?e==="keyboard"&&this._ngZone.run(()=>this.show()):this._ngZone.run(()=>this.hide(0))})}ngOnDestroy(){let e=this._elementRef.nativeElement;this._touchstartTimeout&&clearTimeout(this._touchstartTimeout),this._overlayRef&&(this._overlayRef.dispose(),this._tooltipInstance=null),this._eventCleanups.forEach(i=>i()),this._eventCleanups.length=0,this._destroyed.next(),this._destroyed.complete(),this._isDestroyed=!0,this._ariaDescriber.removeDescription(e,this.message,"tooltip"),this._focusMonitor.stopMonitoring(e)}show(e=this.showDelay,i){if(this.disabled||!this.message||this._isTooltipVisible()){this._tooltipInstance?._cancelPendingAnimations();return}let r=this._createOverlay(i);this._detach(),this._portal=this._portal||new Xc(this._tooltipComponent,this._viewContainerRef);let o=this._tooltipInstance=r.attach(this._portal).instance;o._triggerElement=this._elementRef.nativeElement,o._mouseLeaveHideDelay=this._hideDelay,o.afterHidden().pipe(K(this._destroyed)).subscribe(()=>this._detach()),this._setTooltipClass(this._tooltipClass),this._updateTooltipMessage(),o.show(e)}hide(e=this.hideDelay){let i=this._tooltipInstance;i&&(i.isVisible()?i.hide(e):(i._cancelPendingAnimations(),this._detach()))}toggle(e){this._isTooltipVisible()?this.hide():this.show(void 0,e)}_isTooltipVisible(){return!!this._tooltipInstance&&this._tooltipInstance.isVisible()}_createOverlay(e){if(this._overlayRef){let s=this._overlayRef.getConfig().positionStrategy;if((!this.positionAtOrigin||!e)&&s._origin instanceof z)return this._overlayRef;this._detach()}let i=this._injector.get(fo).getAncestorScrollContainers(this._elementRef),r=`${this._cssClassPrefix}-${wM}`,o=vs(this._injector,this.positionAtOrigin?e||this._elementRef:this._elementRef).withTransformOriginOn(`.${this._cssClassPrefix}-tooltip`).withFlexibleDimensions(!1).withViewportMargin(this._viewportMargin).withScrollableContainers(i).withPopoverLocation("global");return o.positionChanges.pipe(K(this._destroyed)).subscribe(s=>{this._updateCurrentPositionClass(s.connectionPair),this._tooltipInstance&&s.scrollableViewProperties.isOverlayClipped&&this._tooltipInstance.isVisible()&&this._ngZone.run(()=>this.hide(0))}),this._overlayRef=bs(this._injector,{direction:this._dir,positionStrategy:o,panelClass:this._overlayPanelClass?[...this._overlayPanelClass,r]:r,scrollStrategy:this._injector.get($j)(),disableAnimations:this._animationsDisabled,eventPredicate:this._overlayEventPredicate}),this._updatePosition(this._overlayRef),this._overlayRef.detachments().pipe(K(this._destroyed)).subscribe(()=>this._detach()),this._overlayRef.outsidePointerEvents().pipe(K(this._destroyed)).subscribe(()=>this._tooltipInstance?._handleBodyInteraction()),this._overlayRef.keydownEvents().pipe(K(this._destroyed)).subscribe(s=>{s.preventDefault(),s.stopPropagation(),this._ngZone.run(()=>this.hide(0))}),this._defaultOptions?.disableTooltipInteractivity&&this._overlayRef.addPanelClass(`${this._cssClassPrefix}-tooltip-panel-non-interactive`),this._dirSubscribed||(this._dirSubscribed=!0,this._dir.change.pipe(K(this._destroyed)).subscribe(()=>{this._overlayRef&&this._updatePosition(this._overlayRef)})),this._overlayRef}_detach(){this._overlayRef&&this._overlayRef.hasAttached()&&this._overlayRef.detach(),this._tooltipInstance=null}_updatePosition(e){let i=e.getConfig().positionStrategy,r=this._getOrigin(),o=this._getOverlayPosition();i.withPositions([this._addOffset(g(g({},r.main),o.main)),this._addOffset(g(g({},r.fallback),o.fallback))])}_addOffset(e){let i=qj,r=!this._dir||this._dir.value=="ltr";return e.originY==="top"?e.offsetY=-i:e.originY==="bottom"?e.offsetY=i:e.originX==="start"?e.offsetX=r?-i:i:e.originX==="end"&&(e.offsetX=r?i:-i),e}_getOrigin(){let e=!this._dir||this._dir.value=="ltr",i=this.position,r;i=="above"||i=="below"?r={originX:"center",originY:i=="above"?"top":"bottom"}:i=="before"||i=="left"&&e||i=="right"&&!e?r={originX:"start",originY:"center"}:(i=="after"||i=="right"&&e||i=="left"&&!e)&&(r={originX:"end",originY:"center"});let{x:o,y:s}=this._invertPosition(r.originX,r.originY);return{main:r,fallback:{originX:o,originY:s}}}_getOverlayPosition(){let e=!this._dir||this._dir.value=="ltr",i=this.position,r;i=="above"?r={overlayX:"center",overlayY:"bottom"}:i=="below"?r={overlayX:"center",overlayY:"top"}:i=="before"||i=="left"&&e||i=="right"&&!e?r={overlayX:"end",overlayY:"center"}:(i=="after"||i=="right"&&e||i=="left"&&!e)&&(r={overlayX:"start",overlayY:"center"});let{x:o,y:s}=this._invertPosition(r.overlayX,r.overlayY);return{main:r,fallback:{overlayX:o,overlayY:s}}}_updateTooltipMessage(){this._tooltipInstance&&(this._tooltipInstance.message=this.message,this._tooltipInstance._markForCheck(),wt(()=>{this._tooltipInstance&&this._overlayRef.updatePosition()},{injector:this._injector}))}_setTooltipClass(e){this._tooltipInstance&&(this._tooltipInstance.tooltipClass=e instanceof Set?Array.from(e):e,this._tooltipInstance._markForCheck())}_invertPosition(e,i){return this.position==="above"||this.position==="below"?i==="top"?i="bottom":i==="bottom"&&(i="top"):e==="end"?e="start":e==="start"&&(e="end"),{x:e,y:i}}_updateCurrentPositionClass(e){let{overlayY:i,originX:r,originY:o}=e,s;if(i==="center"?this._dir&&this._dir.value==="rtl"?s=r==="end"?"left":"right":s=r==="start"?"left":"right":s=i==="bottom"&&o==="top"?"above":"below",s!==this._currentPosition){let a=this._overlayRef;if(a){let l=`${this._cssClassPrefix}-${wM}-`;a.removePanelClass(l+this._currentPosition),a.addPanelClass(l+s)}this._currentPosition=s}}_setupPointerEnterEventsIfNeeded(){this._disabled||!this.message||!this._viewInitialized||this._eventCleanups.length||(this._isTouchPlatform()?this.touchGestures!=="off"&&(this._disableNativeGesturesIfNecessary(),this._addListener("touchstart",e=>{let i=e.targetTouches?.[0],r=i?{x:i.clientX,y:i.clientY}:void 0;this._setupPointerExitEventsIfNeeded(),this._touchstartTimeout&&clearTimeout(this._touchstartTimeout);let o=500;this._touchstartTimeout=setTimeout(()=>{this._touchstartTimeout=null,this.show(void 0,r)},this._defaultOptions?.touchLongPressShowDelay??o)})):this._addListener("mouseenter",e=>{this._setupPointerExitEventsIfNeeded();let i;e.x!==void 0&&e.y!==void 0&&(i=e),this.show(void 0,i)}))}_setupPointerExitEventsIfNeeded(){if(!this._pointerExitEventsInitialized){if(this._pointerExitEventsInitialized=!0,!this._isTouchPlatform())this._addListener("mouseleave",e=>{let i=e.relatedTarget;(!i||!this._overlayRef?.overlayElement.contains(i))&&this.hide()}),this._addListener("wheel",e=>{if(this._isTooltipVisible()){let i=this._document.elementFromPoint(e.clientX,e.clientY),r=this._elementRef.nativeElement;i!==r&&!r.contains(i)&&this.hide()}});else if(this.touchGestures!=="off"){this._disableNativeGesturesIfNecessary();let e=()=>{this._touchstartTimeout&&clearTimeout(this._touchstartTimeout),this.hide(this._defaultOptions?.touchendHideDelay)};this._addListener("touchend",e),this._addListener("touchcancel",e)}}}_addListener(e,i){this._eventCleanups.push(this._renderer.listen(this._elementRef.nativeElement,e,i,Wj))}_isTouchPlatform(){let e=this._defaultOptions?.detectHoverCapability;return typeof e=="function"?!e():this._platform.IOS||this._platform.ANDROID?!0:this._platform.isBrowser?!!e&&this._mediaMatcher.matchMedia("(any-hover: none)").matches:!1}_disableNativeGesturesIfNecessary(){let e=this.touchGestures;if(e!=="off"){let i=this._elementRef.nativeElement,r=i.style;(e==="on"||i.nodeName!=="INPUT"&&i.nodeName!=="TEXTAREA")&&(r.userSelect=r.msUserSelect=r.webkitUserSelect=r.MozUserSelect="none"),(e==="on"||!i.draggable)&&(r.webkitUserDrag="none"),r.touchAction="none",r.webkitTapHighlightColor="transparent"}}_syncAriaDescription(e){this._ariaDescriptionPending||(this._ariaDescriptionPending=!0,this._ariaDescriber.removeDescription(this._elementRef.nativeElement,e,"tooltip"),this._isDestroyed||wt({write:()=>{this._ariaDescriptionPending=!1,this.message&&!this.disabled&&this._ariaDescriber.describe(this._elementRef.nativeElement,this.message,"tooltip")}},{injector:this._injector}))}_overlayEventPredicate=e=>e.type==="keydown"?this._isTooltipVisible()&&e.keyCode===27&&!Yt(e):!0;static \u0275fac=function(i){return new(i||n)};static \u0275dir=Y({type:n,selectors:[["","matTooltip",""]],hostAttrs:[1,"mat-mdc-tooltip-trigger"],hostVars:2,hostBindings:function(i,r){i&2&&ye("mat-mdc-tooltip-disabled",r.disabled)},inputs:{position:[0,"matTooltipPosition","position"],positionAtOrigin:[0,"matTooltipPositionAtOrigin","positionAtOrigin"],disabled:[0,"matTooltipDisabled","disabled"],showDelay:[0,"matTooltipShowDelay","showDelay"],hideDelay:[0,"matTooltipHideDelay","hideDelay"],touchGestures:[0,"matTooltipTouchGestures","touchGestures"],message:[0,"matTooltip","message"],tooltipClass:[0,"matTooltipClass","tooltipClass"]},exportAs:["matTooltip"]})}return n})(),SM=(()=>{class n{_changeDetectorRef=f(et);_elementRef=f(z);_isMultiline=!1;message;tooltipClass;_showTimeoutId;_hideTimeoutId;_triggerElement;_mouseLeaveHideDelay;_animationsDisabled=At();_tooltip;_closeOnInteraction=!1;_isVisible=!1;_onHide=new D;_showAnimation="mat-mdc-tooltip-show";_hideAnimation="mat-mdc-tooltip-hide";constructor(){}show(e){this._hideTimeoutId!=null&&clearTimeout(this._hideTimeoutId),this._showTimeoutId=setTimeout(()=>{this._toggleVisibility(!0),this._showTimeoutId=void 0},e)}hide(e){this._showTimeoutId!=null&&clearTimeout(this._showTimeoutId),this._hideTimeoutId=setTimeout(()=>{this._toggleVisibility(!1),this._hideTimeoutId=void 0},e)}afterHidden(){return this._onHide}isVisible(){return this._isVisible}ngOnDestroy(){this._cancelPendingAnimations(),this._onHide.complete(),this._triggerElement=null}_handleBodyInteraction(){this._closeOnInteraction&&this.hide(0)}_markForCheck(){this._changeDetectorRef.markForCheck()}_handleMouseLeave({relatedTarget:e}){(!e||!this._triggerElement.contains(e))&&(this.isVisible()?this.hide(this._mouseLeaveHideDelay):this._finalizeAnimation(!1))}_onShow(){this._isMultiline=this._isTooltipMultiline(),this._markForCheck()}_isTooltipMultiline(){let e=this._elementRef.nativeElement.getBoundingClientRect();return e.height>Kj&&e.width>=Yj}_handleAnimationEnd({animationName:e}){(e===this._showAnimation||e===this._hideAnimation)&&this._finalizeAnimation(e===this._showAnimation)}_cancelPendingAnimations(){this._showTimeoutId!=null&&clearTimeout(this._showTimeoutId),this._hideTimeoutId!=null&&clearTimeout(this._hideTimeoutId),this._showTimeoutId=this._hideTimeoutId=void 0}_finalizeAnimation(e){e?this._closeOnInteraction=!0:this.isVisible()||this._onHide.next()}_toggleVisibility(e){let i=this._tooltip.nativeElement,r=this._showAnimation,o=this._hideAnimation;if(i.classList.remove(e?o:r),i.classList.add(e?r:o),this._isVisible!==e&&(this._isVisible=e,this._changeDetectorRef.markForCheck()),e&&!this._animationsDisabled&&typeof getComputedStyle=="function"){let s=getComputedStyle(i);(s.getPropertyValue("animation-duration")==="0s"||s.getPropertyValue("animation-name")==="none")&&(this._animationsDisabled=!0)}e&&this._onShow(),this._animationsDisabled&&(i.classList.add("_mat-animation-noopable"),this._finalizeAnimation(e))}static \u0275fac=function(i){return new(i||n)};static \u0275cmp=J({type:n,selectors:[["mat-tooltip-component"]],viewQuery:function(i,r){if(i&1&&vt(Uj,7),i&2){let o;W(o=G())&&(r._tooltip=o.first)}},hostAttrs:["aria-hidden","true"],hostBindings:function(i,r){i&1&&fe("mouseleave",function(s){return r._handleMouseLeave(s)})},decls:4,vars:5,consts:[["tooltip",""],[1,"mdc-tooltip","mat-mdc-tooltip",3,"animationend"],[1,"mat-mdc-tooltip-surface","mdc-tooltip__surface"]],template:function(i,r){i&1&&(Me(0,"div",1,0),oa("animationend",function(s){return r._handleAnimationEnd(s)}),Me(2,"div",2),E(3),ke()()),i&2&&(xn(r.tooltipClass),ye("mdc-tooltip--multiline",r._isMultiline),_(3),Fe(r.message))},styles:[`.mat-mdc-tooltip {
  position: relative;
  transform: scale(0);
  display: inline-flex;
}
.mat-mdc-tooltip::before {
  content: "";
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: -1;
  position: absolute;
}
.mat-mdc-tooltip-panel-below .mat-mdc-tooltip::before {
  top: -8px;
}
.mat-mdc-tooltip-panel-above .mat-mdc-tooltip::before {
  bottom: -8px;
}
.mat-mdc-tooltip-panel-right .mat-mdc-tooltip::before {
  left: -8px;
}
.mat-mdc-tooltip-panel-left .mat-mdc-tooltip::before {
  right: -8px;
}
.mat-mdc-tooltip._mat-animation-noopable {
  animation: none;
  transform: scale(1);
}

.mat-mdc-tooltip-surface {
  word-break: normal;
  overflow-wrap: anywhere;
  padding: 4px 8px;
  min-width: 40px;
  max-width: 200px;
  min-height: 24px;
  max-height: 40vh;
  box-sizing: border-box;
  overflow: hidden;
  text-align: center;
  will-change: transform, opacity;
  background-color: var(--mat-tooltip-container-color, var(--mat-sys-inverse-surface));
  color: var(--mat-tooltip-supporting-text-color, var(--mat-sys-inverse-on-surface));
  border-radius: var(--mat-tooltip-container-shape, var(--mat-sys-corner-extra-small));
  font-family: var(--mat-tooltip-supporting-text-font, var(--mat-sys-body-small-font));
  font-size: var(--mat-tooltip-supporting-text-size, var(--mat-sys-body-small-size));
  font-weight: var(--mat-tooltip-supporting-text-weight, var(--mat-sys-body-small-weight));
  line-height: var(--mat-tooltip-supporting-text-line-height, var(--mat-sys-body-small-line-height));
  letter-spacing: var(--mat-tooltip-supporting-text-tracking, var(--mat-sys-body-small-tracking));
}
.mat-mdc-tooltip-surface::before {
  position: absolute;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  border: 1px solid transparent;
  border-radius: inherit;
  content: "";
  pointer-events: none;
}
.mdc-tooltip--multiline .mat-mdc-tooltip-surface {
  text-align: left;
}
[dir=rtl] .mdc-tooltip--multiline .mat-mdc-tooltip-surface {
  text-align: right;
}

.mat-mdc-tooltip-panel {
  line-height: normal;
}
.mat-mdc-tooltip-panel.mat-mdc-tooltip-panel-non-interactive {
  pointer-events: none;
}

@keyframes mat-mdc-tooltip-show {
  0% {
    opacity: 0;
    transform: scale(0.8);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}
@keyframes mat-mdc-tooltip-hide {
  0% {
    opacity: 1;
    transform: scale(1);
  }
  100% {
    opacity: 0;
    transform: scale(0.8);
  }
}
.mat-mdc-tooltip-show {
  animation: mat-mdc-tooltip-show 150ms cubic-bezier(0, 0, 0.2, 1) forwards;
}

.mat-mdc-tooltip-hide {
  animation: mat-mdc-tooltip-hide 75ms cubic-bezier(0.4, 0, 1, 1) forwards;
}
`],encapsulation:2,changeDetection:0})}return n})();var Wi=(()=>{class n{static \u0275fac=function(i){return new(i||n)};static \u0275mod=Ce({type:n});static \u0275inj=be({imports:[g_,_s,pt,Ir]})}return n})();function TM(n){n||(n=f(st));let t=new U(e=>{if(n.destroyed){e.next();return}return n.onDestroy(e.next.bind(e))});return e=>e.pipe(K(t))}var jt=class{vault=e_(jt);bus=f(Ra);destroyRef=f(st);events=ve(()=>this.vault.state.value()??[]);totalEvents=ve(()=>this.events().length);constructor(){this.vault.initialize(),this.vault.fromStream(this.bus.pipeline$().pipe(_e(t=>!!t&&t.cell!==Da),TM(this.destroyRef)))}clearEvents(){this.vault.reset(),this.vault.replaceState({value:[]})}};x(jt,"\u0275fac",function(e){return new(e||jt)}),x(jt,"\u0275prov",C({token:jt,factory:jt.\u0275fac,providedIn:"root"})),jt=we([Jb(Da)],jt);function Zj(n,t){n&1&&(y(0,"section",1)(1,"h1",5),E(2,"Welcome to SDuX Vault DevTools"),v(),y(3,"p",6),E(4," Real-time pipeline visibility for your state management layer. Inspect events, trace state mutations, and diagnose errors \u2014 all in one place. "),v()())}function Xj(n,t){n&1&&(y(0,"section",2),E(1," Events only appear "),y(2,"strong"),E(3,"after this panel opens and a decorated @FeatureCell service is instantiated."),v(),E(4,". "),y(5,"p"),E(6," FeatureCells are lazyloaded and only activated when the service is instantiated. The DevTools "),y(7,"strong"),E(8,"will only"),v(),E(9," connect once an @FeatureCell is active. "),v(),y(10,"p"),E(11," Click on a route with a component using an injected @FeatureCell service to trigger events in your app. "),v()())}function Qj(){try{return chrome.runtime.getManifest().version}catch{return"dev"}}var ld=new b("EXTENSION_VERSION",{providedIn:"root",factory:Qj}),_p=class n{devtools=f(jt);version=f(ld);events=ve(()=>this.devtools.events());totalEvents=ve(()=>this.events()?.length);static \u0275fac=function(e){return new(e||n)};static \u0275cmp=J({type:n,selectors:[["sdux-devtools-splash-page"]],decls:5,vars:1,consts:[[1,"vault-devtools"],[1,"welcome"],[1,"warning"],[1,"vault-empty"],["src","/assets/brand/brand-landscape-dark.svg","alt","SDuX Vault logo","matTooltip","SDuX Vault",1,"logo"],[1,"welcome-title"],[1,"welcome-subtitle"]],template:function(e,i){e&1&&(y(0,"div",0),ee(1,Zj,5,0,"section",1)(2,Xj,12,0,"section",2),y(3,"section",3),me(4,"img",4),v()()),e&2&&(_(),te(i.totalEvents()?1:2))},dependencies:[Wi,Ti],styles:[".pointer[_ngcontent-%COMP%]{cursor:pointer}[_nghost-%COMP%]{display:block;width:100%;height:100%}.vault-devtools[_ngcontent-%COMP%]{width:100%;height:100%;min-height:0;display:flex;flex-direction:column;align-items:center;justify-content:center;overflow:hidden;border:none}.vault-devtools[_ngcontent-%COMP%]   .welcome[_ngcontent-%COMP%]{text-align:center;margin-bottom:1.5rem}.vault-devtools[_ngcontent-%COMP%]   .welcome[_ngcontent-%COMP%]   .welcome-title[_ngcontent-%COMP%]{margin:0 0 .25rem;font-size:1.5rem;font-weight:600}.vault-devtools[_ngcontent-%COMP%]   .welcome[_ngcontent-%COMP%]   .welcome-subtitle[_ngcontent-%COMP%]{margin:0;color:#94a3b8;font-weight:400;font-family:Inter,system-ui,sans-serif;font-size:.875rem;line-height:1.5}.vault-devtools[_ngcontent-%COMP%]   .warning[_ngcontent-%COMP%]{background-color:#fff263;border-left:4px solid #c49000;color:#000;padding:.5rem 1rem;border-radius:.3125rem;font-size:.875rem;text-align:center;margin-bottom:1.5rem}.vault-devtools[_ngcontent-%COMP%]   .vault-empty[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:center;text-align:center}.vault-devtools[_ngcontent-%COMP%]   .vault-empty[_ngcontent-%COMP%]   .logo[_ngcontent-%COMP%]{width:200px;height:auto;filter:drop-shadow(0 2px 4px rgba(0,0,0,.35));transition:opacity .25s ease}.vault-devtools[_ngcontent-%COMP%]   .vault-empty[_ngcontent-%COMP%]   .logo[_ngcontent-%COMP%]:hover{opacity:.9}"],changeDetection:0})};function Jj(n,t){if(n&1&&(y(0,"div",4)(1,"h4"),E(2,"State Value"),v(),y(3,"pre")(4,"code"),E(5),mr(6,"json"),v()()()),n&2){let e,i=R();_(5),Fe(Yo(6,1,(e=i.event().state)==null?null:e.value))}}function e2(n,t){if(n&1&&(y(0,"div",4)(1,"h4"),E(2,"Payload"),v(),y(3,"pre")(4,"code"),E(5),mr(6,"json"),v()()()),n&2){let e=R();_(5),Fe(Yo(6,1,e.event().payload))}}function t2(n,t){if(n&1&&(y(0,"div",6)(1,"h4"),E(2,"Error"),v(),y(3,"pre")(4,"code"),E(5),mr(6,"json"),v()()()),n&2){let e=R();_(5),Fe(Yo(6,1,e.event().error))}}var Cp=class n{event=Li.required();closeDetail=Df();static \u0275fac=function(e){return new(e||n)};static \u0275cmp=J({type:n,selectors:[["sdux-devtools-pipeline-event-detail"]],inputs:{event:[1,"event"]},outputs:{closeDetail:"closeDetail"},decls:40,vars:10,consts:[[1,"detail-panel"],[1,"detail-header"],["type","button","aria-label","Close detail panel","matTooltip","Close detail panel",1,"close-btn",3,"click"],[1,"detail-body"],[1,"detail-block"],[1,"kv"],[1,"detail-block","error-block"]],template:function(e,i){if(e&1&&(y(0,"div",0)(1,"div",1)(2,"h3"),E(3,"Event Detail"),v(),y(4,"button",2),fe("click",function(){return i.closeDetail.emit()}),E(5," \u2715 "),v()(),y(6,"div",3)(7,"div",4)(8,"ul",5)(9,"li")(10,"strong"),E(11,"key:"),v(),E(12),v(),y(13,"li")(14,"strong"),E(15,"type:"),v(),E(16),v(),y(17,"li")(18,"strong"),E(19,"boundary:"),v(),E(20),v(),y(21,"li")(22,"strong"),E(23,"event name:"),v(),E(24),v(),y(25,"li")(26,"strong"),E(27,"event id:"),v(),E(28),v(),y(29,"li")(30,"strong"),E(31,"trace id:"),v(),E(32),v(),y(33,"li")(34,"strong"),E(35,"source:"),v(),E(36),v()()(),ee(37,Jj,7,3,"div",4),ee(38,e2,7,3,"div",4),ee(39,t2,7,3,"div",6),v()()),e&2){let r;_(12),lt(" ",i.event().behaviorKey),_(4),lt(" ",i.event().type),_(4),lt(" ",i.event().boundary),_(4),lt(" ",i.event().name),_(4),lt(" ",i.event().id),_(4),lt(" ",i.event().traceId??"null"),_(4),lt(" ",i.event().source??"N/A"),_(),te((r=i.event().state)!=null&&r.value?37:-1),_(),te(i.event().payload?38:-1),_(),te(i.event().error?39:-1)}},dependencies:[la,Wi,Ti,gv],styles:[".pointer[_ngcontent-%COMP%]{cursor:pointer}[_nghost-%COMP%]{display:flex;flex-direction:column;height:100%;max-height:100%;overflow:hidden}.detail-panel[_ngcontent-%COMP%]{display:flex;flex-direction:column;flex:1;min-height:0;overflow:hidden;background-color:#0f172a}.detail-panel[_ngcontent-%COMP%]   .detail-header[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:space-between;padding:.5rem 1rem;border-bottom:1px solid #63a4ff;flex-shrink:0}.detail-panel[_ngcontent-%COMP%]   .detail-header[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]{color:#fff;font-weight:600;font-family:Inter,system-ui,sans-serif;font-size:1rem;margin:0}.detail-panel[_ngcontent-%COMP%]   .detail-header[_ngcontent-%COMP%]   .close-btn[_ngcontent-%COMP%]{background:none;border:none;color:#94a3b8;font-size:1rem;cursor:pointer;padding:.25rem;border-radius:.25rem;line-height:1}.detail-panel[_ngcontent-%COMP%]   .detail-header[_ngcontent-%COMP%]   .close-btn[_ngcontent-%COMP%]:hover{color:#fff;background-color:#63a4ff}.detail-panel[_ngcontent-%COMP%]   .detail-body[_ngcontent-%COMP%]{flex:1;min-height:0;overflow-y:auto;padding:1rem}.detail-panel[_ngcontent-%COMP%]   .detail-body[_ngcontent-%COMP%]::-webkit-scrollbar{width:6px}.detail-panel[_ngcontent-%COMP%]   .detail-body[_ngcontent-%COMP%]::-webkit-scrollbar-thumb{background-color:#63a4ff;border-radius:.25rem}.detail-panel[_ngcontent-%COMP%]   .detail-columns[_ngcontent-%COMP%]{display:grid;grid-template-columns:1fr 1fr;gap:1rem}@media(max-width:768px){.detail-panel[_ngcontent-%COMP%]   .detail-columns[_ngcontent-%COMP%]{grid-template-columns:1fr}}.detail-panel[_ngcontent-%COMP%]   .detail-block[_ngcontent-%COMP%]{margin-bottom:1rem}.detail-panel[_ngcontent-%COMP%]   .detail-block[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%]{color:#e2e8f0;font-weight:600;font-family:Inter,system-ui,sans-serif;font-size:1rem;margin-bottom:.25rem}.detail-panel[_ngcontent-%COMP%]   .detail-block[_ngcontent-%COMP%]   .kv[_ngcontent-%COMP%]{list-style:none;padding:0;margin:0 0 .25rem}.detail-panel[_ngcontent-%COMP%]   .detail-block[_ngcontent-%COMP%]   .kv[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]{margin-bottom:.25rem;font-size:.875rem}.detail-panel[_ngcontent-%COMP%]   .detail-block[_ngcontent-%COMP%]   pre[_ngcontent-%COMP%]{background-color:#2c3a4f;border:1px solid #63a4ff;border-radius:.3125rem;padding:.5rem;font-size:.75rem;white-space:pre-wrap;word-break:break-all;overflow-wrap:break-word;color:#e2e8f0}.detail-panel[_ngcontent-%COMP%]   .detail-block[_ngcontent-%COMP%]   pre[_ngcontent-%COMP%]::-webkit-scrollbar{width:6px}.detail-panel[_ngcontent-%COMP%]   .detail-block[_ngcontent-%COMP%]   pre[_ngcontent-%COMP%]::-webkit-scrollbar-thumb{background-color:#63a4ff;border-radius:.25rem}.detail-panel[_ngcontent-%COMP%]   .error-block[_ngcontent-%COMP%]   pre[_ngcontent-%COMP%]{background-color:#b71c1c;border-color:#ef5350}"],changeDetection:0})};function n2(n,t){if(n&1&&(y(0,"span",7),E(1),v()),n&2){let e=R(2);_(),Fe(e.behaviorName())}}function i2(n,t){n&1&&(y(0,"span",10),E(1,"\u25CF"),v())}function r2(n,t){n&1&&me(0,"span",11)}function o2(n,t){n&1&&(y(0,"span",12),E(1,"\u270E"),v())}function s2(n,t){n&1&&me(0,"span",11)}function a2(n,t){n&1&&(y(0,"span",13),E(1,"\u26A0"),v())}function l2(n,t){n&1&&me(0,"span",11)}function c2(n,t){if(n&1){let e=Pt();y(0,"div",1),fe("click",function(){We(e);let r=R();return Ge(r.selectEvent.emit(r.event()))})("keydown.enter",function(){We(e);let r=R();return Ge(r.selectEvent.emit(r.event()))})("keydown.space",function(r){We(e);let o=R();return o.selectEvent.emit(o.event()),Ge(r.preventDefault())}),y(1,"div",2)(2,"div",3),E(3),mr(4,"number"),v(),y(5,"div",4),E(6),v()(),y(7,"div",5),me(8,"div",6),y(9,"div")(10,"span",7),E(11),mr(12,"uppercase"),v(),ee(13,n2,2,1,"span",7),v(),y(14,"div",8)(15,"div",9),ee(16,i2,2,0,"span",10)(17,r2,1,0,"span",11),ee(18,o2,2,0,"span",12)(19,s2,1,0,"span",11),ee(20,a2,2,0,"span",13)(21,l2,1,0,"span",11),v(),y(22,"div",14),E(23),mr(24,"date"),v()()()()}if(n&2){let e,i=R();ye("event-row-error",!!i.event().error)("event-row-selected",i.selected()),_(3),lt(" ",vf(4,15,i.totalEvents(),"3.0")," "),_(3),Fe(i.event().cell),_(3),xn(zy("behavior-pills ",i.event().type)),_(2),Fe(Yo(12,18,i.event().type)),_(2),te(i.event().type==="controller"||i.event().type==="stage"?13:-1),_(3),te((e=i.event().state)!=null&&e.hasValue?16:17),_(2),te(i.event().payload?18:19),_(2),te(i.event().error?20:21),_(3),lt(" ",vf(24,20,i.event().timestamp,"HH:mm:ss.SSS")," ")}}var Dp=class n{event=Li.required();totalEvents=Li.required();selected=Li(!1);selectEvent=Df();parseBehaviorKey(){let t=this.event().behaviorKey;if(t.startsWith("SDUX::")){let i=t.split("::"),r=i[1],o=i[i.length-1];return[r.toUpperCase(),o.toUpperCase()]}return[t.replace(/^VAULT-/i,"").toUpperCase()]}behaviorName(){let t=this.event().behaviorKey;return t.startsWith("SDUX::")?t.split("::").pop().toUpperCase():t.replace(/^VAULT-/i,"").toUpperCase()}static \u0275fac=function(e){return new(e||n)};static \u0275cmp=J({type:n,selectors:[["sdux-devtools-pipeline-event"]],inputs:{event:[1,"event"],totalEvents:[1,"totalEvents"],selected:[1,"selected"]},outputs:{selectEvent:"selectEvent"},decls:1,vars:1,consts:[["matTooltip","Click for more details","role","button","tabindex","0",1,"event-row-header",3,"event-row-error","event-row-selected"],["matTooltip","Click for more details","role","button","tabindex","0",1,"event-row-header",3,"click","keydown.enter","keydown.space"],[1,"row-primary"],[1,"counter"],[1,"cell"],[1,"row-secondary"],[1,"row-spacer"],[1,"pill"],[1,"indicators-ts"],[1,"indicators"],["matTooltip","State","aria-hidden","true",1,"icon","active"],["aria-hidden","true",1,"icon-spacer"],["matTooltip","Payload","aria-hidden","true",1,"icon","payload"],["matTooltip","Error","aria-hidden","true",1,"icon","error"],[1,"ts"]],template:function(e,i){e&1&&ee(0,c2,25,23,"div",0),e&2&&te(i.event()?0:-1)},dependencies:[la,Wi,Ti,pv,yv,mv],styles:[".pointer[_ngcontent-%COMP%]{cursor:pointer}[_nghost-%COMP%]{display:block;overflow:hidden;background-color:#2c3a4f;border-radius:.3125rem;padding:.25rem .5rem;margin-bottom:.25rem}.event-row-header[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap;align-items:center;gap:.5rem;cursor:pointer}.event-row-header[_ngcontent-%COMP%]   .row-primary[_ngcontent-%COMP%], .event-row-header[_ngcontent-%COMP%]   .row-secondary[_ngcontent-%COMP%]{display:flex;align-items:center;gap:1rem}.event-row-header[_ngcontent-%COMP%]   .row-primary[_ngcontent-%COMP%]{flex-shrink:0}.event-row-header[_ngcontent-%COMP%]   .row-secondary[_ngcontent-%COMP%]{flex:1;min-width:0}.event-row-header[_ngcontent-%COMP%]   .row-secondary[_ngcontent-%COMP%]   .indicators-ts[_ngcontent-%COMP%]{margin-left:auto;display:flex;align-items:center}.event-row-header[_ngcontent-%COMP%]   .row-spacer[_ngcontent-%COMP%]{display:none}@media(max-width:768px){.event-row-header[_ngcontent-%COMP%]{flex-direction:column;align-items:stretch}.event-row-header[_ngcontent-%COMP%]   .row-primary[_ngcontent-%COMP%], .event-row-header[_ngcontent-%COMP%]   .row-secondary[_ngcontent-%COMP%]{width:100%}.event-row-header[_ngcontent-%COMP%]   .row-spacer[_ngcontent-%COMP%]{display:block;width:48px;flex-shrink:0}.event-row-header[_ngcontent-%COMP%]   .cell[_ngcontent-%COMP%]{min-width:200px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}}.event-row-header[_ngcontent-%COMP%]   .behavior-pills[_ngcontent-%COMP%]{display:flex;gap:2px}.event-row-header[_ngcontent-%COMP%]   .behavior-pills[_ngcontent-%COMP%]   .pill[_ngcontent-%COMP%]{color:#fff;font-weight:600;font-family:Inter,system-ui,sans-serif;font-size:.75rem;padding:.25rem .5rem;white-space:nowrap}.event-row-header[_ngcontent-%COMP%]   .behavior-pills[_ngcontent-%COMP%]   .pill[_ngcontent-%COMP%]:first-child{border-radius:.25rem 0 0 .25rem}.event-row-header[_ngcontent-%COMP%]   .behavior-pills[_ngcontent-%COMP%]   .pill[_ngcontent-%COMP%]:last-child{border-radius:0 .25rem .25rem 0}.event-row-header[_ngcontent-%COMP%]   .behavior-pills[_ngcontent-%COMP%]   .pill[_ngcontent-%COMP%]:only-child{border-radius:.25rem}.event-row-header[_ngcontent-%COMP%]   .behavior-pills.stage[_ngcontent-%COMP%]   .pill[_ngcontent-%COMP%]{background-color:#1976d2}.event-row-header[_ngcontent-%COMP%]   .behavior-pills.lifecycle[_ngcontent-%COMP%]   .pill[_ngcontent-%COMP%]{background-color:#388e3c}.event-row-header[_ngcontent-%COMP%]   .behavior-pills.controller[_ngcontent-%COMP%]   .pill[_ngcontent-%COMP%]{background-color:#fbc02d;color:#000}.event-row-header[_ngcontent-%COMP%]   .behavior-pills.conductor[_ngcontent-%COMP%]   .pill[_ngcontent-%COMP%]{background-color:#d32f2f}.event-row-header[_ngcontent-%COMP%]   .counter[_ngcontent-%COMP%]{color:#e2e8f0;font-weight:400;font-family:Inter,system-ui,sans-serif;font-size:.875rem;width:3rem;text-align:left}.event-row-header[_ngcontent-%COMP%]   .cell[_ngcontent-%COMP%]{color:#fff;font-weight:400;font-family:Inter,system-ui,sans-serif;font-weight:500;font-size:1rem;min-width:200px}.event-row-header[_ngcontent-%COMP%]   .indicators[_ngcontent-%COMP%]{display:flex;align-items:center;gap:.25rem}.event-row-header[_ngcontent-%COMP%]   .indicators[_ngcontent-%COMP%]   .icon[_ngcontent-%COMP%], .event-row-header[_ngcontent-%COMP%]   .indicators[_ngcontent-%COMP%]   .icon-spacer[_ngcontent-%COMP%]{display:inline-block;width:1em;font-size:1rem;text-align:center}.event-row-header[_ngcontent-%COMP%]   .indicators[_ngcontent-%COMP%]   .icon[_ngcontent-%COMP%]{transition:color .15s ease}.event-row-header[_ngcontent-%COMP%]   .indicators[_ngcontent-%COMP%]   .icon.active[_ngcontent-%COMP%]{color:#81c784}.event-row-header[_ngcontent-%COMP%]   .indicators[_ngcontent-%COMP%]   .icon.payload[_ngcontent-%COMP%]{color:#63a4ff}.event-row-header[_ngcontent-%COMP%]   .indicators[_ngcontent-%COMP%]   .icon.error[_ngcontent-%COMP%]{color:#d32f2f}.event-row-header.event-row-error[_ngcontent-%COMP%]{background-color:#d32f2f14;border-left:3px solid #d32f2f}.event-row-header.event-row-selected[_ngcontent-%COMP%]{background-color:#ffffff14;border-left:3px solid #1976d2}.event-row-header.event-row-selected.event-row-error[_ngcontent-%COMP%]{border-left-color:#d32f2f}.event-row-header[_ngcontent-%COMP%]   .ts[_ngcontent-%COMP%]{color:#e2e8f0;font-weight:400;font-family:Inter,system-ui,sans-serif;font-size:.75rem;white-space:nowrap}"],changeDetection:0})};function d2(n,t){if(n&1){let e=Pt();y(0,"div",5)(1,"sdux-devtools-pipeline-event",6),fe("selectEvent",function(r){We(e);let o=R(2);return Ge(o.selectEvent(r))}),v()()}if(n&2){let e,i=t.$implicit,r=t.index,o=R(2);_(),ge("event",i)("totalEvents",o.totalEvents()-r)("selected",((e=o.selectedEvent())==null?null:e.id)===i.id)}}function u2(n,t){if(n&1&&(y(0,"cdk-virtual-scroll-viewport",2),Wt(1,d2,2,3,"div",4),v()),n&2){let e=R();_(),ge("cdkVirtualForOf",e.reversedEvents())("cdkVirtualForTrackBy",e.trackById)}}function f2(n,t){if(n&1){let e=Pt();y(0,"aside",3)(1,"sdux-devtools-pipeline-event-detail",7),fe("closeDetail",function(){We(e);let r=R();return Ge(r.closeDetail())}),v()()}n&2&&(_(),ge("event",t))}var Ep=class n{events=Li.required();reversedEvents=ve(()=>[...this.events()].reverse());totalEvents=ve(()=>this.events().length);selectedEvent=O(null);trackById(t,e){return e.id}selectEvent(t){this.selectedEvent.set(t)}closeDetail(){this.selectedEvent.set(null)}static \u0275fac=function(e){return new(e||n)};static \u0275cmp=J({type:n,selectors:[["sdux-devtools-main-pipeline-panel"]],inputs:{events:[1,"events"]},decls:4,vars:2,consts:[[1,"pipeline-panel"],[1,"event-stream"],["itemSize","52","role","log","aria-label","Pipeline events",1,"event-list"],[1,"detail-pane"],["class","event-row",4,"cdkVirtualFor","cdkVirtualForOf","cdkVirtualForTrackBy"],[1,"event-row"],[3,"selectEvent","event","totalEvents","selected"],[3,"closeDetail","event"]],template:function(e,i){if(e&1&&(y(0,"div",0)(1,"section",1),ee(2,u2,2,2,"cdk-virtual-scroll-viewport",2),v(),ee(3,f2,2,1,"aside",3),v()),e&2){let r;_(2),te(i.reversedEvents()?2:-1),_(),te((r=i.selectedEvent())?3:-1,r)}},dependencies:[Yc,E_,S_,w_,Dp,Cp],styles:[".pointer[_ngcontent-%COMP%]{cursor:pointer}[_nghost-%COMP%]{display:block;height:100%;overflow:hidden}.pipeline-panel[_ngcontent-%COMP%]{display:flex;flex-direction:row;height:100%;overflow:hidden;padding:0;color:#e2e8f0;font-weight:400;font-family:Inter,system-ui,sans-serif}.pipeline-panel[_ngcontent-%COMP%]   .event-stream[_ngcontent-%COMP%]{flex:1;display:flex;flex-direction:column;min-height:0;min-width:0}.pipeline-panel[_ngcontent-%COMP%]   .event-stream[_ngcontent-%COMP%]   .event-list[_ngcontent-%COMP%]{flex:1;min-height:0;height:100%;overscroll-behavior:contain;margin-bottom:3rem}.pipeline-panel[_ngcontent-%COMP%]   .event-stream[_ngcontent-%COMP%]   .event-list[_ngcontent-%COMP%]   .cdk-virtual-scroll-content-wrapper[_ngcontent-%COMP%]{padding-bottom:2rem}.pipeline-panel[_ngcontent-%COMP%]   .event-stream[_ngcontent-%COMP%]   .event-list[_ngcontent-%COMP%]::-webkit-scrollbar{width:8px}.pipeline-panel[_ngcontent-%COMP%]   .event-stream[_ngcontent-%COMP%]   .event-list[_ngcontent-%COMP%]::-webkit-scrollbar-thumb{background-color:#63a4ff;border-radius:.25rem}.pipeline-panel[_ngcontent-%COMP%]   .detail-pane[_ngcontent-%COMP%]{width:400px;min-width:400px;flex-shrink:0;display:flex;flex-direction:column;border-left:1px solid #63a4ff;margin-bottom:3rem;min-height:0}.pipeline-panel[_ngcontent-%COMP%]   .detail-pane[_ngcontent-%COMP%]   sdux-devtools-pipeline-event-detail[_ngcontent-%COMP%]{display:flex;flex-direction:column;flex:1;min-height:0}.pipeline-panel[_ngcontent-%COMP%]   .detail-empty[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:center;height:100%}.pipeline-panel[_ngcontent-%COMP%]   .detail-empty[_ngcontent-%COMP%]   .detail-empty-text[_ngcontent-%COMP%]{color:#94a3b8;font-weight:400;font-family:Inter,system-ui,sans-serif;font-size:.875rem}@media(max-width:768px){.pipeline-panel[_ngcontent-%COMP%]{flex-direction:column;overflow:hidden}.pipeline-panel[_ngcontent-%COMP%]   .event-stream[_ngcontent-%COMP%]{height:100%;min-height:0;overflow:hidden}.pipeline-panel[_ngcontent-%COMP%]   .event-stream[_ngcontent-%COMP%]   .event-list[_ngcontent-%COMP%]{height:100%;margin-bottom:0}.pipeline-panel[_ngcontent-%COMP%]:has(.detail-pane)   .event-stream[_ngcontent-%COMP%]{height:35%}.pipeline-panel[_ngcontent-%COMP%]   .detail-pane[_ngcontent-%COMP%]{width:100%;min-width:0;flex:0 0 calc(55% - 20px);margin-top:.5rem;margin-bottom:0;border:1px solid #63a4ff;box-sizing:border-box;overflow:hidden}.pipeline-panel[_ngcontent-%COMP%]   .detail-pane[_ngcontent-%COMP%]   sdux-devtools-pipeline-event-detail[_ngcontent-%COMP%]{height:100%;flex:none}}.pipeline-panel[_ngcontent-%COMP%]   .event-row[_ngcontent-%COMP%]{display:block;padding:.5rem 0;border-bottom:1px solid #63a4ff}.pipeline-panel[_ngcontent-%COMP%]   .event-row[_ngcontent-%COMP%]:hover{background-color:#ffffff14}.pipeline-panel[_ngcontent-%COMP%]   .event-row-header[_ngcontent-%COMP%]{width:100%;display:grid;grid-template-columns:4rem 140px 1fr auto;align-items:center;gap:1rem}.pipeline-panel[_ngcontent-%COMP%]   .badge[_ngcontent-%COMP%]{color:#fff;font-weight:600;font-family:Inter,system-ui,sans-serif;font-size:.75rem;padding:.25rem .5rem;border-radius:.25rem;justify-self:start}.pipeline-panel[_ngcontent-%COMP%]   .badge.init[_ngcontent-%COMP%]{background-color:#388e3c}.pipeline-panel[_ngcontent-%COMP%]   .badge.patch[_ngcontent-%COMP%]{background-color:#fbc02d;color:#000}.pipeline-panel[_ngcontent-%COMP%]   .badge.error[_ngcontent-%COMP%]{background-color:#d32f2f}.pipeline-panel[_ngcontent-%COMP%]   .counter[_ngcontent-%COMP%]{color:#94a3b8;font-weight:400;font-family:Inter,system-ui,sans-serif;font-size:.875rem;width:3rem;text-align:left}.pipeline-panel[_ngcontent-%COMP%]   .cell[_ngcontent-%COMP%]{color:#94a3b8;font-weight:400;font-family:Inter,system-ui,sans-serif;font-weight:500;font-size:1rem;min-width:125px}.pipeline-panel[_ngcontent-%COMP%]   .ts[_ngcontent-%COMP%]{color:#94a3b8;font-weight:400;font-family:Inter,system-ui,sans-serif;font-size:.75rem;white-space:nowrap}.pipeline-panel[_ngcontent-%COMP%]   .event-details[_ngcontent-%COMP%]{grid-column:1/-1;margin-top:.25rem;padding-left:.5rem}.pipeline-panel[_ngcontent-%COMP%]   .event-details[_ngcontent-%COMP%]   summary[_ngcontent-%COMP%]{cursor:pointer;color:#1976d2;font-weight:400;font-family:Inter,system-ui,sans-serif;font-size:.875rem;margin-bottom:.25rem}.pipeline-panel[_ngcontent-%COMP%]   .event-details[_ngcontent-%COMP%]   summary[_ngcontent-%COMP%]:hover{text-decoration:underline}.pipeline-panel[_ngcontent-%COMP%]   .event-details[_ngcontent-%COMP%]   .detail-block[_ngcontent-%COMP%]{margin-bottom:1rem}.pipeline-panel[_ngcontent-%COMP%]   .event-details[_ngcontent-%COMP%]   .detail-block[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%]{color:#e2e8f0;font-weight:600;font-family:Inter,system-ui,sans-serif;font-size:1rem;margin-bottom:.25rem}.pipeline-panel[_ngcontent-%COMP%]   .event-details[_ngcontent-%COMP%]   .detail-block[_ngcontent-%COMP%]   .kv[_ngcontent-%COMP%]{list-style:none;padding:0;margin:0 0 .25rem}.pipeline-panel[_ngcontent-%COMP%]   .event-details[_ngcontent-%COMP%]   .detail-block[_ngcontent-%COMP%]   .kv[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]{margin-bottom:.25rem;font-size:.875rem}.pipeline-panel[_ngcontent-%COMP%]   .event-details[_ngcontent-%COMP%]   .detail-block[_ngcontent-%COMP%]   pre[_ngcontent-%COMP%]{background-color:#0f172a;border:1px solid #63a4ff;border-radius:.3125rem;padding:.5rem;font-size:.75rem;overflow-x:auto;color:#e2e8f0}.pipeline-panel[_ngcontent-%COMP%]   .event-details[_ngcontent-%COMP%]   .error-block[_ngcontent-%COMP%]   pre[_ngcontent-%COMP%]{background-color:#b71c1c;border-color:#ef5350}"],changeDetection:0})};function h2(n,t){if(n&1&&(y(0,"mat-option",4),E(1),v()),n&2){let e=t.$implicit;ge("value",e),_(),Fe(e)}}function p2(n,t){if(n&1&&(y(0,"mat-option",4),E(1),v()),n&2){let e=t.$implicit;ge("value",e),_(),Fe(e[0].toUpperCase()+e.slice(1))}}function m2(n,t){if(n&1&&(y(0,"mat-option",4),E(1),v()),n&2){let e=t.$implicit,i=R(2);ge("value",e),_(),Fe(i.displayKeyName(e))}}function g2(n,t){if(n&1){let e=Pt();y(0,"mat-select",14),fe("selectionChange",function(r){We(e);let o=R();return Ge(o.selectedKey.set(r.value))}),y(1,"mat-option",3),E(2,"All Keys"),v(),pi(3,m2,2,2,"mat-option",4,Qr),v()}if(n&2){let e=R();ge("value",e.selectedKey()),_(3),mi(e.keyNames())}}function y2(n,t){if(n&1&&(y(0,"span",8),E(1),v()),n&2){let e=R();_(),lt(" ",e.latestStateSize()," ")}}function v2(n,t){if(n&1){let e=Pt();y(0,"span",15),E(1),y(2,"button",16),fe("click",function(r){We(e);let o=R();return Ge(o.downloadAllEvents(r))}),li(),y(3,"svg",17),me(4,"path",18),v()()()}if(n&2){let e=R();_(),lt(" All Events (",e.totalEvents(),") ")}}function b2(n,t){if(n&1){let e=Pt();y(0,"span",15),E(1),y(2,"button",19),fe("click",function(r){We(e);let o=R();return Ge(o.downloadErrorEvents(r))}),li(),y(3,"svg",17),me(4,"path",18),v()()()}if(n&2){let e=R();_(),lt(" Error Events (",e.errorEvents().length,") ")}}var wp=class n{devtools=f(jt);version=f(ld);events=ve(()=>this.devtools.events());selectedCell=O("all");selectedType=O("all");selectedKey=O("all");cellNames=ve(()=>{let t=this.events()?.map(e=>e.cell)??[];return[...new Set(t)].sort()});typeNames=ve(()=>{let t=this.selectedCell(),e=this.events()??[];t!=="all"&&(e=e.filter(r=>r.cell===t));let i=e.map(r=>r.type);return[...new Set(i)].sort()});showKeyFilter=ve(()=>{let t=this.selectedType();return t==="stage"||t==="controller"});keyNames=ve(()=>{let t=this.selectedCell(),e=this.selectedType(),i=this.events()??[];t!=="all"&&(i=i.filter(o=>o.cell===t)),e!=="all"&&(i=i.filter(o=>o.type===e));let r=i.map(o=>o.behaviorKey);return[...new Set(r)].sort()});filteredEvents=ve(()=>{let t=this.selectedCell(),e=this.selectedType(),i=this.selectedKey(),r=this.events();return t!=="all"&&(r=r?.filter(o=>o.cell===t)??[]),e!=="all"&&(r=r?.filter(o=>o.type===e)??[]),i!=="all"&&(r=r?.filter(o=>o.behaviorKey===i)??[]),r});totalEvents=ve(()=>this.filteredEvents()?.length);errorEvents=ve(()=>this.filteredEvents()?.filter(t=>!!t.error)??[]);latestStateSize=ve(()=>{let t=this.events();if(!t?.length)return null;let e=new Map;for(let r of t)r.state?.hasValue&&e.set(r.cell,r);if(!e.size)return null;let i=0;for(let r of e.values())i+=new Blob([JSON.stringify(r.state.value)]).size;return i<1024?`${i} B`:i<1048576?`${(i/1024).toFixed(1)} KB`:`${(i/1048576).toFixed(1)} MB`});clearEvents(){this.selectedCell.set("all"),this.selectedType.set("all"),this.selectedKey.set("all"),this.devtools.clearEvents()}displayKeyName(t){let e=t.split("::");return e.length>1?e[e.length-1]:t}downloadAllEvents(t){t.stopPropagation(),this.downloadEvents(this.events(),"all-events")}downloadErrorEvents(t){t.stopPropagation(),this.downloadEvents(this.errorEvents(),"error-events")}downloadEvents(t,e){let i=new Blob([JSON.stringify(t,null,2)],{type:"application/json"}),r=document.createElement("a");r.href=URL.createObjectURL(i),r.download=`sdux-${e}-${Date.now()}.json`,r.click(),URL.revokeObjectURL(r.href)}static \u0275fac=function(e){return new(e||n)};static \u0275cmp=J({type:n,selectors:[["sdux-events"]],decls:26,vars:6,consts:[[1,"header"],[1,"title"],["aria-label","Filter by cell",1,"cell-filter",3,"selectionChange","value"],["value","all"],[3,"value"],["aria-label","Filter by event type",1,"cell-filter",3,"selectionChange","value"],["aria-label","Filter by key",1,"cell-filter",3,"value"],[1,"meta"],["matTooltip","Size of latest event state","aria-label","Size of latest event state",1,"state-size"],["type","button","matTooltip","Clear all events","aria-label","Clear all events",1,"btn-clear",3,"click"],["animationDuration","200ms",1,"vault-tabs"],["mat-tab-label",""],[1,"vault-tab-content"],[3,"events"],["aria-label","Filter by key",1,"cell-filter",3,"selectionChange","value"],[1,"tab-label"],["type","button","aria-label","Download all events","matTooltip","Download all events",1,"tab-download-btn",3,"click"],["xmlns","http://www.w3.org/2000/svg","viewBox","0 0 24 24","fill","currentColor","width","18","height","18",1,"download-icon"],["d","M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"],["type","button","aria-label","Download error events","matTooltip","Download error events",1,"tab-download-btn",3,"click"]],template:function(e,i){e&1&&(y(0,"header",0)(1,"div",1)(2,"mat-select",2),fe("selectionChange",function(o){return i.selectedCell.set(o.value)}),y(3,"mat-option",3),E(4,"View All"),v(),pi(5,h2,2,2,"mat-option",4,Qr),v(),y(7,"mat-select",5),fe("selectionChange",function(o){return i.selectedType.set(o.value),i.selectedKey.set("all")}),y(8,"mat-option",3),E(9,"All Types"),v(),pi(10,p2,2,2,"mat-option",4,Qr),v(),ee(12,g2,5,1,"mat-select",6),v(),y(13,"div",7),ee(14,y2,2,1,"span",8),y(15,"button",9),fe("click",function(){return i.clearEvents()}),E(16," Clear "),v()()(),y(17,"mat-tab-group",10)(18,"mat-tab"),Wt(19,v2,5,1,"ng-template",11),y(20,"section",12),me(21,"sdux-devtools-main-pipeline-panel",13),v()(),y(22,"mat-tab"),Wt(23,b2,5,1,"ng-template",11),y(24,"section",12),me(25,"sdux-devtools-main-pipeline-panel",13),v()()()),e&2&&(_(2),ge("value",i.selectedCell()),_(3),mi(i.cellNames()),_(2),ge("value",i.selectedType()),_(3),mi(i.typeNames()),_(2),te(i.showKeyFilter()?12:-1),_(2),te(i.latestStateSize()?14:-1),_(7),ge("events",i.filteredEvents()),_(4),ge("events",i.errorEvents()))},dependencies:[mM,pM,za,EM,rC,oC,DM,Wi,Ti,Ep],styles:['@charset "UTF-8";.pointer[_ngcontent-%COMP%]{cursor:pointer}[_nghost-%COMP%]{display:flex;flex-direction:column;flex:1;min-height:0;overflow:hidden}.header[_ngcontent-%COMP%]{display:flex;justify-content:space-between;align-items:center;margin-bottom:1rem}@media(max-width:768px){.header[_ngcontent-%COMP%]{flex-direction:column;align-items:stretch;gap:.5rem}}.header[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%]{display:flex;align-items:center;gap:.5rem}@media(max-width:1024px){.header[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%]{flex-wrap:wrap}}@media(max-width:768px){.header[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%]{flex-direction:column;align-items:stretch}}.header[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%]   .cell-filter[_ngcontent-%COMP%]{width:250px;color:#0f172a;font-weight:400;font-family:Inter,system-ui,sans-serif;background-color:#fff;border:1px solid #63a4ff;border-radius:.3125rem;padding:.25rem .5rem}.header[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%]   .subtitle[_ngcontent-%COMP%]{color:#94a3b8;font-weight:400;font-family:Inter,system-ui,sans-serif;font-size:1rem}@media(max-width:768px){.header[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%]   .subtitle[_ngcontent-%COMP%]{display:none}}.header[_ngcontent-%COMP%]   .meta[_ngcontent-%COMP%]{display:flex;align-items:center;gap:1rem}@media(max-width:768px){.header[_ngcontent-%COMP%]   .meta[_ngcontent-%COMP%]{justify-content:flex-end}}.header[_ngcontent-%COMP%]   .meta[_ngcontent-%COMP%]   .state-size[_ngcontent-%COMP%]{color:#94a3b8;font-weight:400;font-family:Inter,system-ui,sans-serif;font-size:.875rem;min-width:80px;text-align:right}.header[_ngcontent-%COMP%]   .meta[_ngcontent-%COMP%]   .event-count[_ngcontent-%COMP%]{color:#94a3b8;font-weight:400;font-family:Inter,system-ui,sans-serif;font-size:.875rem}.header[_ngcontent-%COMP%]   .meta[_ngcontent-%COMP%]   .btn-clear[_ngcontent-%COMP%]{height:40px!important;min-width:90px!important;display:flex;flex-direction:row;justify-content:center;align-items:center;color:#fff!important;background-color:transparent!important;border:1px solid #63a4ff!important;border-radius:.3125rem!important;font-size:.875rem!important;padding:.5rem;gap:.25rem;font-weight:600}.header[_ngcontent-%COMP%]   .meta[_ngcontent-%COMP%]   .btn-clear[_ngcontent-%COMP%]   .mat-icon[_ngcontent-%COMP%]{transform:scale(.75)}.header[_ngcontent-%COMP%]   .meta[_ngcontent-%COMP%]   .btn-clear[_ngcontent-%COMP%]{cursor:pointer;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.header[_ngcontent-%COMP%]   .meta[_ngcontent-%COMP%]   .btn-clear[_ngcontent-%COMP%]   .button-text[_ngcontent-%COMP%]{height:40px}.header[_ngcontent-%COMP%]   .meta[_ngcontent-%COMP%]   .btn-clear[_ngcontent-%COMP%]   .mat-icon[_ngcontent-%COMP%]{width:22px!important;height:22px!important;position:relative;padding-left:.25rem;padding-right:.25rem;gap:.25rem}.header[_ngcontent-%COMP%]   .meta[_ngcontent-%COMP%]   .btn-clear[_ngcontent-%COMP%]:focus{outline:none}.header[_ngcontent-%COMP%]   .meta[_ngcontent-%COMP%]   .btn-clear[_ngcontent-%COMP%]:hover{background-color:#ffffff14!important}.vault-tabs[_ngcontent-%COMP%]{flex:1;min-height:0;display:flex;flex-direction:column}.vault-tabs[_ngcontent-%COMP%]     .mat-mdc-tab-header{background-color:#0f172a;border-bottom:1px solid #63a4ff}.vault-tabs[_ngcontent-%COMP%]     .mat-mdc-tab-body-wrapper{flex:1;min-height:0;display:flex}.vault-tabs[_ngcontent-%COMP%]     .mat-mdc-tab-body{flex:1;min-height:0}.vault-tabs[_ngcontent-%COMP%]     .mat-mdc-tab-body .mat-mdc-tab-body-content{flex:1;min-height:0;overflow:hidden;display:flex;flex-direction:column}.vault-tab-content[_ngcontent-%COMP%]{flex:1;min-height:0;height:0;overflow:hidden;display:flex;flex-direction:column}.vault-tab-content[_ngcontent-%COMP%]   sdux-devtools-main-pipeline-panel[_ngcontent-%COMP%]{flex:1;min-height:0;height:0;overflow:hidden}@media(max-width:768px){.vault-tab-content[_ngcontent-%COMP%]{padding-right:.5rem}}.vault-tab-content[_ngcontent-%COMP%]::-webkit-scrollbar{width:8px}.vault-tab-content[_ngcontent-%COMP%]::-webkit-scrollbar-thumb{background-color:#63a4ff;border-radius:.25rem}.tab-label[_ngcontent-%COMP%]{display:flex;align-items:center;gap:.5rem}.tab-label[_ngcontent-%COMP%]   .tab-download-btn[_ngcontent-%COMP%]{display:inline-flex;align-items:center;justify-content:center;vertical-align:middle;background:none;border:none;color:#94a3b8;cursor:pointer;padding:.25rem;border-radius:.25rem;line-height:1}.tab-label[_ngcontent-%COMP%]   .tab-download-btn[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{font-size:1rem;width:1rem;height:1rem}.tab-label[_ngcontent-%COMP%]   .tab-download-btn[_ngcontent-%COMP%]:hover{color:#fff;background-color:#63a4ff}  .mat-mdc-tab-label-container{background-color:#fff;border-top-left-radius:.5rem;border-top-right-radius:.5rem}'],changeDetection:0})};var IM=[{path:"",component:_p},{path:"events",component:wp},{path:"configuration",component:Nh},{path:"**",redirectTo:""}];var xM={providers:[pg(),qy(),tb(IM,nb()),r_({logLevel:"error"}),i_(jt,{key:Da,initialState:[]},[Kn])]};var _2=["mat-menu-item",""],C2=[[["mat-icon"],["","matMenuItemIcon",""]],"*"],D2=["mat-icon, [matMenuItemIcon]","*"];function E2(n,t){n&1&&(li(),y(0,"svg",2),me(1,"polygon",3),v())}var w2=["*"];function S2(n,t){if(n&1){let e=Pt();Me(0,"div",0),oa("click",function(){We(e);let r=R();return Ge(r.closed.emit("click"))})("animationstart",function(r){We(e);let o=R();return Ge(o._onAnimationStart(r.animationName))})("animationend",function(r){We(e);let o=R();return Ge(o._onAnimationDone(r.animationName))})("animationcancel",function(r){We(e);let o=R();return Ge(o._onAnimationDone(r.animationName))}),Me(1,"div",1),Ve(2),ke()()}if(n&2){let e=R();xn(e._classList),ye("mat-menu-panel-animations-disabled",e._animationsDisabled)("mat-menu-panel-exit-animation",e._panelAnimationState==="void")("mat-menu-panel-animating",e._isAnimating()),Jr("id",e.panelId),Le("aria-label",e.ariaLabel||null)("aria-labelledby",e.ariaLabelledby||null)("aria-describedby",e.ariaDescribedby||null)}}var aC=new b("MAT_MENU_PANEL"),cd=(()=>{class n{_elementRef=f(z);_document=f(le);_focusMonitor=f(co);_parentMenu=f(aC,{optional:!0});_changeDetectorRef=f(et);role="menuitem";disabled=!1;disableRipple=!1;_hovered=new D;_focused=new D;_highlighted=!1;_triggersSubmenu=!1;constructor(){f(Cn).load($a),this._parentMenu?.addItem?.(this)}focus(e,i){this._focusMonitor&&e?this._focusMonitor.focusVia(this._getHostElement(),e,i):this._getHostElement().focus(i),this._focused.next(this)}ngAfterViewInit(){this._focusMonitor&&this._focusMonitor.monitor(this._elementRef,!1)}ngOnDestroy(){this._focusMonitor&&this._focusMonitor.stopMonitoring(this._elementRef),this._parentMenu&&this._parentMenu.removeItem&&this._parentMenu.removeItem(this),this._hovered.complete(),this._focused.complete()}_getTabIndex(){return this.disabled?"-1":"0"}_getHostElement(){return this._elementRef.nativeElement}_checkDisabled(e){this.disabled&&(e.preventDefault(),e.stopPropagation())}_handleMouseEnter(){this._hovered.next(this)}getLabel(){let e=this._elementRef.nativeElement.cloneNode(!0),i=e.querySelectorAll("mat-icon, .material-icons");for(let r=0;r<i.length;r++)i[r].remove();return e.textContent?.trim()||""}_setHighlighted(e){this._highlighted=e,this._changeDetectorRef.markForCheck()}_setTriggersSubmenu(e){this._triggersSubmenu=e,this._changeDetectorRef.markForCheck()}_hasFocus(){return this._document&&this._document.activeElement===this._getHostElement()}static \u0275fac=function(i){return new(i||n)};static \u0275cmp=J({type:n,selectors:[["","mat-menu-item",""]],hostAttrs:[1,"mat-mdc-menu-item","mat-focus-indicator"],hostVars:8,hostBindings:function(i,r){i&1&&fe("click",function(s){return r._checkDisabled(s)})("mouseenter",function(){return r._handleMouseEnter()}),i&2&&(Le("role",r.role)("tabindex",r._getTabIndex())("aria-disabled",r.disabled)("disabled",r.disabled||null),ye("mat-mdc-menu-item-highlighted",r._highlighted)("mat-mdc-menu-item-submenu-trigger",r._triggersSubmenu))},inputs:{role:"role",disabled:[2,"disabled","disabled",oe],disableRipple:[2,"disableRipple","disableRipple",oe]},exportAs:["matMenuItem"],attrs:_2,ngContentSelectors:D2,decls:5,vars:3,consts:[[1,"mat-mdc-menu-item-text"],["matRipple","",1,"mat-mdc-menu-ripple",3,"matRippleDisabled","matRippleTrigger"],["viewBox","0 0 5 10","focusable","false","aria-hidden","true",1,"mat-mdc-menu-submenu-icon"],["points","0,0 5,5 0,10"]],template:function(i,r){i&1&&(Ft(C2),Ve(0),y(1,"span",0),Ve(2,1),v(),me(3,"div",1),ee(4,E2,2,0,":svg:svg",2)),i&2&&(_(3),ge("matRippleDisabled",r.disableRipple||r.disabled)("matRippleTrigger",r._getHostElement()),_(),te(r._triggersSubmenu?4:-1))},dependencies:[Cs],encapsulation:2,changeDetection:0})}return n})();var T2=new b("MatMenuContent");var I2=new b("mat-menu-default-options",{providedIn:"root",factory:()=>({overlapTrigger:!1,xPosition:"after",yPosition:"below",backdropClass:"cdk-overlay-transparent-backdrop"})}),sC="_mat-menu-enter",Sp="_mat-menu-exit",Ga=(()=>{class n{_elementRef=f(z);_changeDetectorRef=f(et);_injector=f(re);_keyManager;_xPosition;_yPosition;_firstItemFocusRef;_exitFallbackTimeout;_animationsDisabled=At();_allItems;_directDescendantItems=new ui;_classList={};_panelAnimationState="void";_animationDone=new D;_isAnimating=O(!1);parentMenu;direction;overlayPanelClass;backdropClass;ariaLabel;ariaLabelledby;ariaDescribedby;get xPosition(){return this._xPosition}set xPosition(e){this._xPosition=e,this.setPositionClasses()}get yPosition(){return this._yPosition}set yPosition(e){this._yPosition=e,this.setPositionClasses()}templateRef;items;lazyContent;overlapTrigger=!1;hasBackdrop;set panelClass(e){let i=this._previousPanelClass,r=g({},this._classList);i&&i.length&&i.split(" ").forEach(o=>{r[o]=!1}),this._previousPanelClass=e,e&&e.length&&(e.split(" ").forEach(o=>{r[o]=!0}),this._elementRef.nativeElement.className=""),this._classList=r}_previousPanelClass;get classList(){return this.panelClass}set classList(e){this.panelClass=e}closed=new F;close=this.closed;panelId=f(Zt).getId("mat-menu-panel-");constructor(){let e=f(I2);this.overlayPanelClass=e.overlayPanelClass||"",this._xPosition=e.xPosition,this._yPosition=e.yPosition,this.backdropClass=e.backdropClass,this.overlapTrigger=e.overlapTrigger,this.hasBackdrop=e.hasBackdrop}ngOnInit(){this.setPositionClasses()}ngAfterContentInit(){this._updateDirectDescendants(),this._keyManager=new ps(this._directDescendantItems).withWrap().withTypeAhead().withHomeAndEnd(),this._keyManager.tabOut.subscribe(()=>this.closed.emit("tab")),this._directDescendantItems.changes.pipe(dt(this._directDescendantItems),ut(e=>Qt(...e.map(i=>i._focused)))).subscribe(e=>this._keyManager.updateActiveItem(e)),this._directDescendantItems.changes.subscribe(e=>{let i=this._keyManager;if(this._panelAnimationState==="enter"&&i.activeItem?._hasFocus()){let r=e.toArray(),o=Math.max(0,Math.min(r.length-1,i.activeItemIndex||0));r[o]&&!r[o].disabled?i.setActiveItem(o):i.setNextItemActive()}})}ngOnDestroy(){this._keyManager?.destroy(),this._directDescendantItems.destroy(),this.closed.complete(),this._firstItemFocusRef?.destroy(),clearTimeout(this._exitFallbackTimeout)}_hovered(){return this._directDescendantItems.changes.pipe(dt(this._directDescendantItems),ut(i=>Qt(...i.map(r=>r._hovered))))}addItem(e){}removeItem(e){}_handleKeydown(e){let i=e.keyCode,r=this._keyManager;switch(i){case 27:Yt(e)||(e.preventDefault(),this.closed.emit("keydown"));break;case 37:this.parentMenu&&this.direction==="ltr"&&this.closed.emit("keydown");break;case 39:this.parentMenu&&this.direction==="rtl"&&this.closed.emit("keydown");break;default:(i===38||i===40)&&r.setFocusOrigin("keyboard"),r.onKeydown(e);return}}focusFirstItem(e="program"){this._firstItemFocusRef?.destroy(),this._firstItemFocusRef=wt(()=>{let i=this._resolvePanel();if(!i||!i.contains(document.activeElement)){let r=this._keyManager;r.setFocusOrigin(e).setFirstItemActive(),!r.activeItem&&i&&i.focus()}},{injector:this._injector})}resetActiveItem(){this._keyManager.setActiveItem(-1)}setElevation(e){}setPositionClasses(e=this.xPosition,i=this.yPosition){this._classList=V(g({},this._classList),{"mat-menu-before":e==="before","mat-menu-after":e==="after","mat-menu-above":i==="above","mat-menu-below":i==="below"}),this._changeDetectorRef.markForCheck()}_onAnimationDone(e){let i=e===Sp;(i||e===sC)&&(i&&(clearTimeout(this._exitFallbackTimeout),this._exitFallbackTimeout=void 0),this._animationDone.next(i?"void":"enter"),this._isAnimating.set(!1))}_onAnimationStart(e){(e===sC||e===Sp)&&this._isAnimating.set(!0)}_setIsOpen(e){if(this._panelAnimationState=e?"enter":"void",e){if(this._keyManager.activeItemIndex===0){let i=this._resolvePanel();i&&(i.scrollTop=0)}}else this._animationsDisabled||(this._exitFallbackTimeout=setTimeout(()=>this._onAnimationDone(Sp),200));this._animationsDisabled&&setTimeout(()=>{this._onAnimationDone(e?sC:Sp)}),this._changeDetectorRef.markForCheck()}_updateDirectDescendants(){this._allItems.changes.pipe(dt(this._allItems)).subscribe(e=>{this._directDescendantItems.reset(e.filter(i=>i._parentMenu===this)),this._directDescendantItems.notifyOnChanges()})}_resolvePanel(){let e=null;return this._directDescendantItems.length&&(e=this._directDescendantItems.first._getHostElement().closest('[role="menu"]')),e}static \u0275fac=function(i){return new(i||n)};static \u0275cmp=J({type:n,selectors:[["mat-menu"]],contentQueries:function(i,r,o){if(i&1&&In(o,T2,5)(o,cd,5)(o,cd,4),i&2){let s;W(s=G())&&(r.lazyContent=s.first),W(s=G())&&(r._allItems=s),W(s=G())&&(r.items=s)}},viewQuery:function(i,r){if(i&1&&vt(Tt,5),i&2){let o;W(o=G())&&(r.templateRef=o.first)}},hostVars:3,hostBindings:function(i,r){i&2&&Le("aria-label",null)("aria-labelledby",null)("aria-describedby",null)},inputs:{backdropClass:"backdropClass",ariaLabel:[0,"aria-label","ariaLabel"],ariaLabelledby:[0,"aria-labelledby","ariaLabelledby"],ariaDescribedby:[0,"aria-describedby","ariaDescribedby"],xPosition:"xPosition",yPosition:"yPosition",overlapTrigger:[2,"overlapTrigger","overlapTrigger",oe],hasBackdrop:[2,"hasBackdrop","hasBackdrop",e=>e==null?null:oe(e)],panelClass:[0,"class","panelClass"],classList:"classList"},outputs:{closed:"closed",close:"close"},exportAs:["matMenu"],features:[bt([{provide:aC,useExisting:n}])],ngContentSelectors:w2,decls:1,vars:0,consts:[["tabindex","-1","role","menu",1,"mat-mdc-menu-panel",3,"click","animationstart","animationend","animationcancel","id"],[1,"mat-mdc-menu-content"]],template:function(i,r){i&1&&(Ft(),ra(0,S2,3,12,"ng-template"))},styles:[`mat-menu {
  display: none;
}

.mat-mdc-menu-content {
  margin: 0;
  padding: 8px 0;
  outline: 0;
}
.mat-mdc-menu-content,
.mat-mdc-menu-content .mat-mdc-menu-item .mat-mdc-menu-item-text {
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  flex: 1;
  white-space: normal;
  font-family: var(--mat-menu-item-label-text-font, var(--mat-sys-label-large-font));
  line-height: var(--mat-menu-item-label-text-line-height, var(--mat-sys-label-large-line-height));
  font-size: var(--mat-menu-item-label-text-size, var(--mat-sys-label-large-size));
  letter-spacing: var(--mat-menu-item-label-text-tracking, var(--mat-sys-label-large-tracking));
  font-weight: var(--mat-menu-item-label-text-weight, var(--mat-sys-label-large-weight));
}

@keyframes _mat-menu-enter {
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: none;
  }
}
@keyframes _mat-menu-exit {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
.mat-mdc-menu-panel {
  min-width: 112px;
  max-width: 280px;
  overflow: auto;
  box-sizing: border-box;
  outline: 0;
  animation: _mat-menu-enter 120ms cubic-bezier(0, 0, 0.2, 1);
  border-radius: var(--mat-menu-container-shape, var(--mat-sys-corner-extra-small));
  background-color: var(--mat-menu-container-color, var(--mat-sys-surface-container));
  box-shadow: var(--mat-menu-container-elevation-shadow, 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12));
  will-change: transform, opacity;
}
.mat-mdc-menu-panel.mat-menu-panel-exit-animation {
  animation: _mat-menu-exit 100ms 25ms linear forwards;
}
.mat-mdc-menu-panel.mat-menu-panel-animations-disabled {
  animation: none;
}
.mat-mdc-menu-panel.mat-menu-panel-animating {
  pointer-events: none;
}
.mat-mdc-menu-panel.mat-menu-panel-animating:has(.mat-mdc-menu-content:empty) {
  display: none;
}
@media (forced-colors: active) {
  .mat-mdc-menu-panel {
    outline: solid 1px;
  }
}
.mat-mdc-menu-panel .mat-divider {
  border-top-color: var(--mat-menu-divider-color, var(--mat-sys-surface-variant));
  margin-bottom: var(--mat-menu-divider-bottom-spacing, 8px);
  margin-top: var(--mat-menu-divider-top-spacing, 8px);
}

.mat-mdc-menu-item {
  display: flex;
  position: relative;
  align-items: center;
  justify-content: flex-start;
  overflow: hidden;
  padding: 0;
  cursor: pointer;
  width: 100%;
  text-align: left;
  box-sizing: border-box;
  color: inherit;
  font-size: inherit;
  background: none;
  text-decoration: none;
  margin: 0;
  min-height: 48px;
  padding-left: var(--mat-menu-item-leading-spacing, 12px);
  padding-right: var(--mat-menu-item-trailing-spacing, 12px);
  -webkit-user-select: none;
  user-select: none;
  cursor: pointer;
  outline: none;
  border: none;
  -webkit-tap-highlight-color: transparent;
}
.mat-mdc-menu-item::-moz-focus-inner {
  border: 0;
}
[dir=rtl] .mat-mdc-menu-item {
  padding-left: var(--mat-menu-item-trailing-spacing, 12px);
  padding-right: var(--mat-menu-item-leading-spacing, 12px);
}
.mat-mdc-menu-item:has(.material-icons, mat-icon, [matButtonIcon]) {
  padding-left: var(--mat-menu-item-with-icon-leading-spacing, 12px);
  padding-right: var(--mat-menu-item-with-icon-trailing-spacing, 12px);
}
[dir=rtl] .mat-mdc-menu-item:has(.material-icons, mat-icon, [matButtonIcon]) {
  padding-left: var(--mat-menu-item-with-icon-trailing-spacing, 12px);
  padding-right: var(--mat-menu-item-with-icon-leading-spacing, 12px);
}
.mat-mdc-menu-item, .mat-mdc-menu-item:visited, .mat-mdc-menu-item:link {
  color: var(--mat-menu-item-label-text-color, var(--mat-sys-on-surface));
}
.mat-mdc-menu-item .mat-icon-no-color,
.mat-mdc-menu-item .mat-mdc-menu-submenu-icon {
  color: var(--mat-menu-item-icon-color, var(--mat-sys-on-surface-variant));
}
.mat-mdc-menu-item[disabled] {
  cursor: default;
  opacity: 0.38;
}
.mat-mdc-menu-item[disabled]::after {
  display: block;
  position: absolute;
  content: "";
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}
.mat-mdc-menu-item:focus {
  outline: 0;
}
.mat-mdc-menu-item .mat-icon {
  flex-shrink: 0;
  margin-right: var(--mat-menu-item-spacing, 12px);
  height: var(--mat-menu-item-icon-size, 24px);
  width: var(--mat-menu-item-icon-size, 24px);
}
[dir=rtl] .mat-mdc-menu-item {
  text-align: right;
}
[dir=rtl] .mat-mdc-menu-item .mat-icon {
  margin-right: 0;
  margin-left: var(--mat-menu-item-spacing, 12px);
}
.mat-mdc-menu-item:not([disabled]):hover {
  background-color: var(--mat-menu-item-hover-state-layer-color, color-mix(in srgb, var(--mat-sys-on-surface) calc(var(--mat-sys-hover-state-layer-opacity) * 100%), transparent));
}
.mat-mdc-menu-item:not([disabled]).cdk-program-focused, .mat-mdc-menu-item:not([disabled]).cdk-keyboard-focused, .mat-mdc-menu-item:not([disabled]).mat-mdc-menu-item-highlighted {
  background-color: var(--mat-menu-item-focus-state-layer-color, color-mix(in srgb, var(--mat-sys-on-surface) calc(var(--mat-sys-focus-state-layer-opacity) * 100%), transparent));
}
@media (forced-colors: active) {
  .mat-mdc-menu-item {
    margin-top: 1px;
  }
}

.mat-mdc-menu-submenu-icon {
  width: var(--mat-menu-item-icon-size, 24px);
  height: 10px;
  fill: currentColor;
  padding-left: var(--mat-menu-item-spacing, 12px);
}
[dir=rtl] .mat-mdc-menu-submenu-icon {
  padding-right: var(--mat-menu-item-spacing, 12px);
  padding-left: 0;
}
[dir=rtl] .mat-mdc-menu-submenu-icon polygon {
  transform: scaleX(-1);
  transform-origin: center;
}
@media (forced-colors: active) {
  .mat-mdc-menu-submenu-icon {
    fill: CanvasText;
  }
}

.mat-mdc-menu-item .mat-mdc-menu-ripple {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  pointer-events: none;
}
`],encapsulation:2,changeDetection:0})}return n})(),x2=new b("mat-menu-scroll-strategy",{providedIn:"root",factory:()=>{let n=f(re);return()=>xr(n)}});var Wa=new WeakMap,M2=(()=>{class n{_canHaveBackdrop;_element=f(z);_viewContainerRef=f(ht);_menuItemInstance=f(cd,{optional:!0,self:!0});_dir=f(Bt,{optional:!0});_focusMonitor=f(co);_ngZone=f(L);_injector=f(re);_scrollStrategy=f(x2);_changeDetectorRef=f(et);_animationsDisabled=At();_portal;_overlayRef=null;_menuOpen=!1;_closingActionsSubscription=H.EMPTY;_menuCloseSubscription=H.EMPTY;_pendingRemoval;_parentMaterialMenu;_parentInnerPadding;_openedBy=void 0;get _menu(){return this._menuInternal}set _menu(e){e!==this._menuInternal&&(this._menuInternal=e,this._menuCloseSubscription.unsubscribe(),e&&(this._parentMaterialMenu,this._menuCloseSubscription=e.close.subscribe(i=>{this._destroyMenu(i),(i==="click"||i==="tab")&&this._parentMaterialMenu&&this._parentMaterialMenu.closed.emit(i)})),this._menuItemInstance?._setTriggersSubmenu(this._triggersSubmenu()))}_menuInternal=null;constructor(e){this._canHaveBackdrop=e;let i=f(aC,{optional:!0});this._parentMaterialMenu=i instanceof Ga?i:void 0}ngOnDestroy(){this._menu&&this._ownsMenu(this._menu)&&Wa.delete(this._menu),this._pendingRemoval?.unsubscribe(),this._menuCloseSubscription.unsubscribe(),this._closingActionsSubscription.unsubscribe(),this._overlayRef&&(this._overlayRef.dispose(),this._overlayRef=null)}get menuOpen(){return this._menuOpen}get dir(){return this._dir&&this._dir.value==="rtl"?"rtl":"ltr"}_triggersSubmenu(){return!!(this._menuItemInstance&&this._parentMaterialMenu&&this._menu)}_closeMenu(){this._menu?.close.emit()}_openMenu(e){if(this._triggerIsAriaDisabled())return;let i=this._menu;if(this._menuOpen||!i)return;this._pendingRemoval?.unsubscribe();let r=Wa.get(i);Wa.set(i,this),r&&r!==this&&r._closeMenu();let o=this._createOverlay(i),s=o.getConfig(),a=s.positionStrategy;this._setPosition(i,a),this._canHaveBackdrop?s.hasBackdrop=i.hasBackdrop==null?!this._triggersSubmenu():i.hasBackdrop:s.hasBackdrop=i.hasBackdrop??!1,o.hasAttached()||(o.attach(this._getPortal(i)),i.lazyContent?.attach(this.menuData)),this._closingActionsSubscription=this._menuClosingActions().subscribe(()=>this._closeMenu()),i.parentMenu=this._triggersSubmenu()?this._parentMaterialMenu:void 0,i.direction=this.dir,e&&i.focusFirstItem(this._openedBy||"program"),this._setIsMenuOpen(!0),i instanceof Ga&&(i._setIsOpen(!0),i._directDescendantItems.changes.pipe(K(i.close)).subscribe(()=>{a.withLockedPosition(!1).reapplyLastPosition(),a.withLockedPosition(!0)}))}focus(e,i){this._focusMonitor&&e?this._focusMonitor.focusVia(this._element,e,i):this._element.nativeElement.focus(i)}_destroyMenu(e){let i=this._overlayRef,r=this._menu;!i||!this.menuOpen||(this._closingActionsSubscription.unsubscribe(),this._pendingRemoval?.unsubscribe(),r instanceof Ga&&this._ownsMenu(r)?(this._pendingRemoval=r._animationDone.pipe(gt(1)).subscribe(()=>{i.detach(),Wa.has(r)||r.lazyContent?.detach()}),r._setIsOpen(!1)):(i.detach(),r?.lazyContent?.detach()),r&&this._ownsMenu(r)&&Wa.delete(r),this.restoreFocus&&(e==="keydown"||!this._openedBy||!this._triggersSubmenu())&&this.focus(this._openedBy),this._openedBy=void 0,this._setIsMenuOpen(!1))}_setIsMenuOpen(e){e!==this._menuOpen&&(this._menuOpen=e,this._menuOpen?this.menuOpened.emit():this.menuClosed.emit(),this._triggersSubmenu()&&this._menuItemInstance._setHighlighted(e),this._changeDetectorRef.markForCheck())}_createOverlay(e){if(!this._overlayRef){let i=this._getOverlayConfig(e);this._subscribeToPositions(e,i.positionStrategy),this._overlayRef=bs(this._injector,i),this._overlayRef.keydownEvents().subscribe(r=>{this._menu instanceof Ga&&this._menu._handleKeydown(r)})}return this._overlayRef}_getOverlayConfig(e){return new ys({positionStrategy:vs(this._injector,this._getOverlayOrigin()).withLockedPosition().withGrowAfterOpen().withTransformOriginOn(".mat-menu-panel, .mat-mdc-menu-panel"),backdropClass:e.backdropClass||"cdk-overlay-transparent-backdrop",panelClass:e.overlayPanelClass,scrollStrategy:this._scrollStrategy(),direction:this._dir||"ltr",disableAnimations:this._animationsDisabled})}_subscribeToPositions(e,i){e.setPositionClasses&&i.positionChanges.subscribe(r=>{this._ngZone.run(()=>{let o=r.connectionPair.overlayX==="start"?"after":"before",s=r.connectionPair.overlayY==="top"?"below":"above";e.setPositionClasses(o,s)})})}_setPosition(e,i){let[r,o]=e.xPosition==="before"?["end","start"]:["start","end"],[s,a]=e.yPosition==="above"?["bottom","top"]:["top","bottom"],[l,c]=[s,a],[d,u]=[r,o],h=0;if(this._triggersSubmenu()){if(u=r=e.xPosition==="before"?"start":"end",o=d=r==="end"?"start":"end",this._parentMaterialMenu){if(this._parentInnerPadding==null){let p=this._parentMaterialMenu.items.first;this._parentInnerPadding=p?p._getHostElement().offsetTop:0}h=s==="bottom"?this._parentInnerPadding:-this._parentInnerPadding}}else e.overlapTrigger||(l=s==="top"?"bottom":"top",c=a==="top"?"bottom":"top");i.withPositions([{originX:r,originY:l,overlayX:d,overlayY:s,offsetY:h},{originX:o,originY:l,overlayX:u,overlayY:s,offsetY:h},{originX:r,originY:c,overlayX:d,overlayY:a,offsetY:-h},{originX:o,originY:c,overlayX:u,overlayY:a,offsetY:-h}])}_menuClosingActions(){let e=this._getOutsideClickStream(this._overlayRef),i=this._overlayRef.detachments(),r=this._parentMaterialMenu?this._parentMaterialMenu.closed:M(),o=this._parentMaterialMenu?this._parentMaterialMenu._hovered().pipe(_e(s=>this._menuOpen&&s!==this._menuItemInstance)):M();return Qt(e,r,o,i)}_getPortal(e){return(!this._portal||this._portal.templateRef!==e.templateRef)&&(this._portal=new zi(e.templateRef,this._viewContainerRef)),this._portal}_ownsMenu(e){return Wa.get(e)===this}_triggerIsAriaDisabled(){return oe(this._element.nativeElement.getAttribute("aria-disabled"))}static \u0275fac=function(i){cf()};static \u0275dir=Y({type:n})}return n})(),MM=(()=>{class n extends M2{_cleanupTouchstart;_hoverSubscription=H.EMPTY;get _deprecatedMatMenuTriggerFor(){return this.menu}set _deprecatedMatMenuTriggerFor(e){this.menu=e}get menu(){return this._menu}set menu(e){this._menu=e}menuData;restoreFocus=!0;menuOpened=new F;onMenuOpen=this.menuOpened;menuClosed=new F;onMenuClose=this.menuClosed;constructor(){super(!0);let e=f(yt);this._cleanupTouchstart=e.listen(this._element.nativeElement,"touchstart",i=>{fs(i)||(this._openedBy="touch")},{passive:!0})}triggersSubmenu(){return super._triggersSubmenu()}toggleMenu(){return this.menuOpen?this.closeMenu():this.openMenu()}openMenu(){this._openMenu(!0)}closeMenu(){this._closeMenu()}updatePosition(){this._overlayRef?.updatePosition()}ngAfterContentInit(){this._handleHover()}ngOnDestroy(){super.ngOnDestroy(),this._cleanupTouchstart(),this._hoverSubscription.unsubscribe()}_getOverlayOrigin(){return this._element}_getOutsideClickStream(e){return e.backdropClick()}_handleMousedown(e){us(e)||(this._openedBy=e.button===0?"mouse":void 0,this.triggersSubmenu()&&e.preventDefault())}_handleKeydown(e){let i=e.keyCode;(i===13||i===32)&&(this._openedBy="keyboard"),this.triggersSubmenu()&&(i===39&&this.dir==="ltr"||i===37&&this.dir==="rtl")&&(this._openedBy="keyboard",this.openMenu())}_handleClick(e){this.triggersSubmenu()?(e.stopPropagation(),this.openMenu()):this.toggleMenu()}_handleHover(){this.triggersSubmenu()&&this._parentMaterialMenu&&(this._hoverSubscription=this._parentMaterialMenu._hovered().subscribe(e=>{e===this._menuItemInstance&&!e.disabled&&this._parentMaterialMenu?._panelAnimationState!=="void"&&(this._openedBy="mouse",this._openMenu(!1))}))}static \u0275fac=function(i){return new(i||n)};static \u0275dir=Y({type:n,selectors:[["","mat-menu-trigger-for",""],["","matMenuTriggerFor",""]],hostAttrs:[1,"mat-mdc-menu-trigger"],hostVars:3,hostBindings:function(i,r){i&1&&fe("click",function(s){return r._handleClick(s)})("mousedown",function(s){return r._handleMousedown(s)})("keydown",function(s){return r._handleKeydown(s)}),i&2&&Le("aria-haspopup",r.menu?"menu":null)("aria-expanded",r.menuOpen)("aria-controls",r.menuOpen?r.menu==null?null:r.menu.panelId:null)},inputs:{_deprecatedMatMenuTriggerFor:[0,"mat-menu-trigger-for","_deprecatedMatMenuTriggerFor"],menu:[0,"matMenuTriggerFor","menu"],menuData:[0,"matMenuTriggerData","menuData"],restoreFocus:[0,"matMenuTriggerRestoreFocus","restoreFocus"]},outputs:{menuOpened:"menuOpened",onMenuOpen:"onMenuOpen",menuClosed:"menuClosed",onMenuClose:"onMenuClose"},exportAs:["matMenuTrigger"],features:[St]})}return n})();var kM=(()=>{class n{static \u0275fac=function(i){return new(i||n)};static \u0275mod=Ce({type:n});static \u0275inj=be({imports:[bp,_s,pt,Ir]})}return n})();var Tp=class n{version=f(ld);static \u0275fac=function(e){return new(e||n)};static \u0275cmp=J({type:n,selectors:[["sdux-toolbar"]],decls:18,vars:2,consts:[["toolbarMenu","matMenu"],[1,"toolbar"],[1,"toolbar-brand"],["src","/assets/brand/brand-landscape-dark.svg","alt","SDuX Vault","matTooltip","SDuX Vault DevTools",1,"toolbar-logo"],[1,"toolbar-version"],["type","button","aria-label","Open menu","matTooltip","Menu",1,"toolbar-menu-btn",3,"matMenuTriggerFor"],["xmlns","http://www.w3.org/2000/svg","viewBox","0 0 24 24","fill","currentColor","width","24","height","24",1,"menu-icon"],["cx","12","cy","5","r","2"],["cx","12","cy","12","r","2"],["cx","12","cy","19","r","2"],["mat-menu-item","","routerLink","/"],["mat-menu-item","","routerLink","/events"],["mat-menu-item","","routerLink","/configuration"]],template:function(e,i){if(e&1&&(y(0,"div",1)(1,"div",2),me(2,"img",3),y(3,"span",4),E(4),v()(),y(5,"button",5),li(),y(6,"svg",6),me(7,"circle",7)(8,"circle",8)(9,"circle",9),v()(),bu(),y(10,"mat-menu",null,0)(12,"a",10),E(13,"Home"),v(),y(14,"a",11),E(15,"Events"),v(),y(16,"a",12),E(17,"Vault Configuration"),v()()()),e&2){let r=gi(11);_(4),lt("DevTools (v",i.version,")"),_(),ge("matMenuTriggerFor",r)}},dependencies:[kM,Ga,cd,MM,Wi,Ti,uh],styles:[".pointer[_ngcontent-%COMP%]{cursor:pointer}[_nghost-%COMP%]{display:block;width:100%}.toolbar[_ngcontent-%COMP%]{display:flex;justify-content:space-between;align-items:center;width:100%;margin-bottom:.5rem;padding-bottom:.5rem;border-bottom:1px solid #63a4ff}.toolbar[_ngcontent-%COMP%]   .toolbar-brand[_ngcontent-%COMP%]{display:flex;align-items:center;gap:.5rem}.toolbar[_ngcontent-%COMP%]   .toolbar-brand[_ngcontent-%COMP%]   .toolbar-logo[_ngcontent-%COMP%]{width:120px}.toolbar[_ngcontent-%COMP%]   .toolbar-brand[_ngcontent-%COMP%]   .toolbar-version[_ngcontent-%COMP%]{color:#94a3b8;font-weight:400;font-family:Inter,system-ui,sans-serif;font-size:1rem}@media(max-width:768px){.toolbar[_ngcontent-%COMP%]   .toolbar-brand[_ngcontent-%COMP%]   .toolbar-version[_ngcontent-%COMP%]{display:none}}.toolbar[_ngcontent-%COMP%]   .toolbar-menu-btn[_ngcontent-%COMP%]{background:transparent;border:none;color:inherit;display:flex;align-items:center;justify-content:center;cursor:pointer}.toolbar[_ngcontent-%COMP%]   .toolbar-menu-btn[_ngcontent-%COMP%]:hover{background-color:#ffffff14!important}.toolbar[_ngcontent-%COMP%]   .toolbar-menu-btn[_ngcontent-%COMP%]   .menu-icon[_ngcontent-%COMP%]{width:20px;height:20px}"],changeDetection:0})};var Ip=class n{static \u0275fac=function(e){return new(e||n)};static \u0275cmp=J({type:n,selectors:[["sdux-devtools-root"]],decls:5,vars:0,consts:[[1,"app-shell"],[1,"toolbar-wrapper"],[1,"router-container"]],template:function(e,i){e&1&&(y(0,"div",0)(1,"div",1),me(2,"sdux-toolbar"),v(),y(3,"div",2),me(4,"router-outlet"),v()())},dependencies:[Dc,Tp],styles:[".pointer[_ngcontent-%COMP%]{cursor:pointer}[_nghost-%COMP%]{display:block;height:100vh;overflow:hidden}.app-shell[_ngcontent-%COMP%]{display:flex;flex-direction:column;height:100%;padding:1rem;border-radius:0 0 .3125rem .3125rem;background-color:#1f2a3a;border:1px solid #63a4ff;color:#e2e8f0;font-weight:400;font-family:Inter,system-ui,sans-serif}.toolbar-wrapper[_ngcontent-%COMP%]{width:100%;flex-shrink:0}.router-container[_ngcontent-%COMP%]{flex:1;width:100%;min-height:0;overflow:hidden;display:flex;flex-direction:column}"],changeDetection:0})};xv(Ip,xM).catch(n=>console.error(n));
