var lb=Object.defineProperty,sI=Object.defineProperties,aI=Object.getOwnPropertyDescriptor,lI=Object.getOwnPropertyDescriptors;var ab=Object.getOwnPropertySymbols;var cI=Object.prototype.hasOwnProperty,uI=Object.prototype.propertyIsEnumerable;var cb=n=>{throw TypeError(n)};var Jf=(n,t,e)=>t in n?lb(n,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):n[t]=e,g=(n,t)=>{for(var e in t||={})cI.call(t,e)&&Jf(n,e,t[e]);if(ab)for(var e of ab(t))uI.call(t,e)&&Jf(n,e,t[e]);return n},Y=(n,t)=>sI(n,lI(t));var oe=(n,t,e,r)=>{for(var i=r>1?void 0:r?aI(t,e):t,o=n.length-1,s;o>=0;o--)(s=n[o])&&(i=(r?s(t,e,i):s(i))||i);return r&&i&&lb(t,e,i),i};var D=(n,t,e)=>Jf(n,typeof t!="symbol"?t+"":t,e),eh=(n,t,e)=>t.has(n)||cb("Cannot "+e);var th=(n,t,e)=>(eh(n,t,"read from private field"),e?e.call(n):t.get(n)),No=(n,t,e)=>t.has(n)?cb("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(n):t.set(n,e),nh=(n,t,e,r)=>(eh(n,t,"write to private field"),r?r.call(n,e):t.set(n,e),e),Er=(n,t,e)=>(eh(n,t,"access private method"),e);var pt=null,Ql=!1,rh=1,dI=null,mt=Symbol("SIGNAL");function O(n){let t=pt;return pt=n,t}function nc(){return pt}var Ri={version:0,lastCleanEpoch:0,dirty:!1,producers:void 0,producersTail:void 0,consumers:void 0,consumersTail:void 0,recomputing:!1,consumerAllowSignalWrites:!1,consumerIsAlwaysLive:!1,kind:"unknown",producerMustRecompute:()=>!1,producerRecomputeValue:()=>{},consumerMarkedDirty:()=>{},consumerOnSignalRead:()=>{}};function Po(n){if(Ql)throw new Error("");if(pt===null)return;pt.consumerOnSignalRead(n);let t=pt.producersTail;if(t!==void 0&&t.producer===n)return;let e,r=pt.recomputing;if(r&&(e=t!==void 0?t.nextProducer:pt.producers,e!==void 0&&e.producer===n)){pt.producersTail=e,e.lastReadVersion=n.version;return}let i=n.consumersTail;if(i!==void 0&&i.consumer===pt&&(!r||hI(i,pt)))return;let o=Fo(pt),s={producer:n,consumer:pt,nextProducer:e,prevConsumer:i,lastReadVersion:n.version,nextConsumer:void 0};pt.producersTail=s,t!==void 0?t.nextProducer=s:pt.producers=s,o&&hb(n,s)}function ub(){rh++}function rc(n){if(!(Fo(n)&&!n.dirty)&&!(!n.dirty&&n.lastCleanEpoch===rh)){if(!n.producerMustRecompute(n)&&!Xs(n)){tc(n);return}n.producerRecomputeValue(n),tc(n)}}function ih(n){if(n.consumers===void 0)return;let t=Ql;Ql=!0;try{for(let e=n.consumers;e!==void 0;e=e.nextConsumer){let r=e.consumer;r.dirty||fI(r)}}finally{Ql=t}}function oh(){return pt?.consumerAllowSignalWrites!==!1}function fI(n){n.dirty=!0,ih(n),n.consumerMarkedDirty?.(n)}function tc(n){n.dirty=!1,n.lastCleanEpoch=rh}function Ai(n){return n&&db(n),O(n)}function db(n){n.producersTail=void 0,n.recomputing=!0}function Lo(n,t){O(t),n&&fb(n)}function fb(n){n.recomputing=!1;let t=n.producersTail,e=t!==void 0?t.nextProducer:n.producers;if(e!==void 0){if(Fo(n))do e=sh(e);while(e!==void 0);t!==void 0?t.nextProducer=void 0:n.producers=void 0}}function Xs(n){for(let t=n.producers;t!==void 0;t=t.nextProducer){let e=t.producer,r=t.lastReadVersion;if(r!==e.version||(rc(e),r!==e.version))return!0}return!1}function ki(n){if(Fo(n)){let t=n.producers;for(;t!==void 0;)t=sh(t)}n.producers=void 0,n.producersTail=void 0,n.consumers=void 0,n.consumersTail=void 0}function hb(n,t){let e=n.consumersTail,r=Fo(n);if(e!==void 0?(t.nextConsumer=e.nextConsumer,e.nextConsumer=t):(t.nextConsumer=void 0,n.consumers=t),t.prevConsumer=e,n.consumersTail=t,!r)for(let i=n.producers;i!==void 0;i=i.nextProducer)hb(i.producer,i)}function sh(n){let t=n.producer,e=n.nextProducer,r=n.nextConsumer,i=n.prevConsumer;if(n.nextConsumer=void 0,n.prevConsumer=void 0,r!==void 0?r.prevConsumer=i:t.consumersTail=i,i!==void 0)i.nextConsumer=r;else if(t.consumers=r,!Fo(t)){let o=t.producers;for(;o!==void 0;)o=sh(o)}return e}function Fo(n){return n.consumerIsAlwaysLive||n.consumers!==void 0}function ic(n){dI?.(n)}function hI(n,t){let e=t.producersTail;if(e!==void 0){let r=t.producers;do{if(r===n)return!0;if(r===e)break;r=r.nextProducer}while(r!==void 0)}return!1}function oc(n,t){return Object.is(n,t)}function sc(n,t){let e=Object.create(pI);e.computation=n,t!==void 0&&(e.equal=t);let r=()=>{if(rc(e),Po(e),e.value===Zs)throw e.error;return e.value};return r[mt]=e,ic(e),r}var Jl=Symbol("UNSET"),ec=Symbol("COMPUTING"),Zs=Symbol("ERRORED"),pI=Y(g({},Ri),{value:Jl,dirty:!0,error:null,equal:oc,kind:"computed",producerMustRecompute(n){return n.value===Jl||n.value===ec},producerRecomputeValue(n){if(n.value===ec)throw new Error("");let t=n.value;n.value=ec;let e=Ai(n),r,i=!1;try{r=n.computation(),O(null),i=t!==Jl&&t!==Zs&&r!==Zs&&n.equal(t,r)}catch(o){r=Zs,n.error=o}finally{Lo(n,e)}if(i){n.value=t;return}n.value=r,n.version++}});function mI(){throw new Error}var pb=mI;function mb(n){pb(n)}function ah(n){pb=n}var gI=null;function lh(n,t){let e=Object.create(ac);e.value=n,t!==void 0&&(e.equal=t);let r=()=>gb(e);return r[mt]=e,ic(e),[r,s=>Bo(e,s),s=>ch(e,s)]}function gb(n){return Po(n),n.value}function Bo(n,t){oh()||mb(n),n.equal(n.value,t)||(n.value=t,yI(n))}function ch(n,t){oh()||mb(n),Bo(n,t(n.value))}var ac=Y(g({},Ri),{equal:oc,value:void 0,kind:"signal"});function yI(n){n.version++,ub(),ih(n),gI?.(n)}var uh=Y(g({},Ri),{consumerIsAlwaysLive:!0,consumerAllowSignalWrites:!0,dirty:!0,kind:"effect"});function dh(n){if(n.dirty=!1,n.version>0&&!Xs(n))return;n.version++;let t=Ai(n);try{n.cleanup(),n.fn()}finally{Lo(n,t)}}function W(n){return typeof n=="function"}function jo(n){let e=n(r=>{Error.call(r),r.stack=new Error().stack});return e.prototype=Object.create(Error.prototype),e.prototype.constructor=e,e}var lc=jo(n=>function(e){n(this),this.message=e?`${e.length} errors occurred during unsubscription:
${e.map((r,i)=>`${i+1}) ${r.toString()}`).join(`
  `)}`:"",this.name="UnsubscriptionError",this.errors=e});function Oi(n,t){if(n){let e=n.indexOf(t);0<=e&&n.splice(e,1)}}var Z=class n{constructor(t){this.initialTeardown=t,this.closed=!1,this._parentage=null,this._finalizers=null}unsubscribe(){let t;if(!this.closed){this.closed=!0;let{_parentage:e}=this;if(e)if(this._parentage=null,Array.isArray(e))for(let o of e)o.remove(this);else e.remove(this);let{initialTeardown:r}=this;if(W(r))try{r()}catch(o){t=o instanceof lc?o.errors:[o]}let{_finalizers:i}=this;if(i){this._finalizers=null;for(let o of i)try{yb(o)}catch(s){t=t??[],s instanceof lc?t=[...t,...s.errors]:t.push(s)}}if(t)throw new lc(t)}}add(t){var e;if(t&&t!==this)if(this.closed)yb(t);else{if(t instanceof n){if(t.closed||t._hasParent(this))return;t._addParent(this)}(this._finalizers=(e=this._finalizers)!==null&&e!==void 0?e:[]).push(t)}}_hasParent(t){let{_parentage:e}=this;return e===t||Array.isArray(e)&&e.includes(t)}_addParent(t){let{_parentage:e}=this;this._parentage=Array.isArray(e)?(e.push(t),e):e?[e,t]:t}_removeParent(t){let{_parentage:e}=this;e===t?this._parentage=null:Array.isArray(e)&&Oi(e,t)}remove(t){let{_finalizers:e}=this;e&&Oi(e,t),t instanceof n&&t._removeParent(this)}};Z.EMPTY=(()=>{let n=new Z;return n.closed=!0,n})();var fh=Z.EMPTY;function cc(n){return n instanceof Z||n&&"closed"in n&&W(n.remove)&&W(n.add)&&W(n.unsubscribe)}function yb(n){W(n)?n():n.unsubscribe()}var Rn={onUnhandledError:null,onStoppedNotification:null,Promise:void 0,useDeprecatedSynchronousErrorHandling:!1,useDeprecatedNextContext:!1};var Vo={setTimeout(n,t,...e){let{delegate:r}=Vo;return r?.setTimeout?r.setTimeout(n,t,...e):setTimeout(n,t,...e)},clearTimeout(n){let{delegate:t}=Vo;return(t?.clearTimeout||clearTimeout)(n)},delegate:void 0};function uc(n){Vo.setTimeout(()=>{let{onUnhandledError:t}=Rn;if(t)t(n);else throw n})}function Qs(){}var vb=hh("C",void 0,void 0);function bb(n){return hh("E",void 0,n)}function _b(n){return hh("N",n,void 0)}function hh(n,t,e){return{kind:n,value:t,error:e}}var Ni=null;function Uo(n){if(Rn.useDeprecatedSynchronousErrorHandling){let t=!Ni;if(t&&(Ni={errorThrown:!1,error:null}),n(),t){let{errorThrown:e,error:r}=Ni;if(Ni=null,e)throw r}}else n()}function Cb(n){Rn.useDeprecatedSynchronousErrorHandling&&Ni&&(Ni.errorThrown=!0,Ni.error=n)}var Pi=class extends Z{constructor(t){super(),this.isStopped=!1,t?(this.destination=t,cc(t)&&t.add(this)):this.destination=_I}static create(t,e,r){return new An(t,e,r)}next(t){this.isStopped?mh(_b(t),this):this._next(t)}error(t){this.isStopped?mh(bb(t),this):(this.isStopped=!0,this._error(t))}complete(){this.isStopped?mh(vb,this):(this.isStopped=!0,this._complete())}unsubscribe(){this.closed||(this.isStopped=!0,super.unsubscribe(),this.destination=null)}_next(t){this.destination.next(t)}_error(t){try{this.destination.error(t)}finally{this.unsubscribe()}}_complete(){try{this.destination.complete()}finally{this.unsubscribe()}}},vI=Function.prototype.bind;function ph(n,t){return vI.call(n,t)}var gh=class{constructor(t){this.partialObserver=t}next(t){let{partialObserver:e}=this;if(e.next)try{e.next(t)}catch(r){dc(r)}}error(t){let{partialObserver:e}=this;if(e.error)try{e.error(t)}catch(r){dc(r)}else dc(t)}complete(){let{partialObserver:t}=this;if(t.complete)try{t.complete()}catch(e){dc(e)}}},An=class extends Pi{constructor(t,e,r){super();let i;if(W(t)||!t)i={next:t??void 0,error:e??void 0,complete:r??void 0};else{let o;this&&Rn.useDeprecatedNextContext?(o=Object.create(t),o.unsubscribe=()=>this.unsubscribe(),i={next:t.next&&ph(t.next,o),error:t.error&&ph(t.error,o),complete:t.complete&&ph(t.complete,o)}):i=t}this.destination=new gh(i)}};function dc(n){Rn.useDeprecatedSynchronousErrorHandling?Cb(n):uc(n)}function bI(n){throw n}function mh(n,t){let{onStoppedNotification:e}=Rn;e&&Vo.setTimeout(()=>e(n,t))}var _I={closed:!0,next:Qs,error:bI,complete:Qs};var $o=typeof Symbol=="function"&&Symbol.observable||"@@observable";function Yt(n){return n}function yh(...n){return vh(n)}function vh(n){return n.length===0?Yt:n.length===1?n[0]:function(e){return n.reduce((r,i)=>i(r),e)}}var N=(()=>{class n{constructor(e){e&&(this._subscribe=e)}lift(e){let r=new n;return r.source=this,r.operator=e,r}subscribe(e,r,i){let o=EI(e)?e:new An(e,r,i);return Uo(()=>{let{operator:s,source:a}=this;o.add(s?s.call(o,a):a?this._subscribe(o):this._trySubscribe(o))}),o}_trySubscribe(e){try{return this._subscribe(e)}catch(r){e.error(r)}}forEach(e,r){return r=Eb(r),new r((i,o)=>{let s=new An({next:a=>{try{e(a)}catch(l){o(l),s.unsubscribe()}},error:o,complete:i});this.subscribe(s)})}_subscribe(e){var r;return(r=this.source)===null||r===void 0?void 0:r.subscribe(e)}[$o](){return this}pipe(...e){return vh(e)(this)}toPromise(e){return e=Eb(e),new e((r,i)=>{let o;this.subscribe(s=>o=s,s=>i(s),()=>r(o))})}}return n.create=t=>new n(t),n})();function Eb(n){var t;return(t=n??Rn.Promise)!==null&&t!==void 0?t:Promise}function CI(n){return n&&W(n.next)&&W(n.error)&&W(n.complete)}function EI(n){return n&&n instanceof Pi||CI(n)&&cc(n)}function bh(n){return W(n?.lift)}function q(n){return t=>{if(bh(t))return t.lift(function(e){try{return n(e,this)}catch(r){this.error(r)}});throw new TypeError("Unable to lift unknown Observable type")}}function G(n,t,e,r,i){return new _h(n,t,e,r,i)}var _h=class extends Pi{constructor(t,e,r,i,o,s){super(t),this.onFinalize=o,this.shouldUnsubscribe=s,this._next=e?function(a){try{e(a)}catch(l){t.error(l)}}:super._next,this._error=i?function(a){try{i(a)}catch(l){t.error(l)}finally{this.unsubscribe()}}:super._error,this._complete=r?function(){try{r()}catch(a){t.error(a)}finally{this.unsubscribe()}}:super._complete}unsubscribe(){var t;if(!this.shouldUnsubscribe||this.shouldUnsubscribe()){let{closed:e}=this;super.unsubscribe(),!e&&((t=this.onFinalize)===null||t===void 0||t.call(this))}}};function Db(){return q((n,t)=>{let e=null;n._refCount++;let r=G(t,void 0,void 0,void 0,()=>{if(!n||n._refCount<=0||0<--n._refCount){e=null;return}let i=n._connection,o=e;e=null,i&&(!o||i===o)&&i.unsubscribe(),t.unsubscribe()});n.subscribe(r),r.closed||(e=n.connect())})}var Js=class extends N{constructor(t,e){super(),this.source=t,this.subjectFactory=e,this._subject=null,this._refCount=0,this._connection=null,bh(t)&&(this.lift=t.lift)}_subscribe(t){return this.getSubject().subscribe(t)}getSubject(){let t=this._subject;return(!t||t.isStopped)&&(this._subject=this.subjectFactory()),this._subject}_teardown(){this._refCount=0;let{_connection:t}=this;this._subject=this._connection=null,t?.unsubscribe()}connect(){let t=this._connection;if(!t){t=this._connection=new Z;let e=this.getSubject();t.add(this.source.subscribe(G(e,void 0,()=>{this._teardown(),e.complete()},r=>{this._teardown(),e.error(r)},()=>this._teardown()))),t.closed&&(this._connection=null,t=Z.EMPTY)}return t}refCount(){return Db()(this)}};var Ho={schedule(n){let t=requestAnimationFrame,e=cancelAnimationFrame,{delegate:r}=Ho;r&&(t=r.requestAnimationFrame,e=r.cancelAnimationFrame);let i=t(o=>{e=void 0,n(o)});return new Z(()=>e?.(i))},requestAnimationFrame(...n){let{delegate:t}=Ho;return(t?.requestAnimationFrame||requestAnimationFrame)(...n)},cancelAnimationFrame(...n){let{delegate:t}=Ho;return(t?.cancelAnimationFrame||cancelAnimationFrame)(...n)},delegate:void 0};var wb=jo(n=>function(){n(this),this.name="ObjectUnsubscribedError",this.message="object unsubscribed"});var C=(()=>{class n extends N{constructor(){super(),this.closed=!1,this.currentObservers=null,this.observers=[],this.isStopped=!1,this.hasError=!1,this.thrownError=null}lift(e){let r=new fc(this,this);return r.operator=e,r}_throwIfClosed(){if(this.closed)throw new wb}next(e){Uo(()=>{if(this._throwIfClosed(),!this.isStopped){this.currentObservers||(this.currentObservers=Array.from(this.observers));for(let r of this.currentObservers)r.next(e)}})}error(e){Uo(()=>{if(this._throwIfClosed(),!this.isStopped){this.hasError=this.isStopped=!0,this.thrownError=e;let{observers:r}=this;for(;r.length;)r.shift().error(e)}})}complete(){Uo(()=>{if(this._throwIfClosed(),!this.isStopped){this.isStopped=!0;let{observers:e}=this;for(;e.length;)e.shift().complete()}})}unsubscribe(){this.isStopped=this.closed=!0,this.observers=this.currentObservers=null}get observed(){var e;return((e=this.observers)===null||e===void 0?void 0:e.length)>0}_trySubscribe(e){return this._throwIfClosed(),super._trySubscribe(e)}_subscribe(e){return this._throwIfClosed(),this._checkFinalizedStatuses(e),this._innerSubscribe(e)}_innerSubscribe(e){let{hasError:r,isStopped:i,observers:o}=this;return r||i?fh:(this.currentObservers=null,o.push(e),new Z(()=>{this.currentObservers=null,Oi(o,e)}))}_checkFinalizedStatuses(e){let{hasError:r,thrownError:i,isStopped:o}=this;r?e.error(i):o&&e.complete()}asObservable(){let e=new N;return e.source=this,e}}return n.create=(t,e)=>new fc(t,e),n})(),fc=class extends C{constructor(t,e){super(),this.destination=t,this.source=e}next(t){var e,r;(r=(e=this.destination)===null||e===void 0?void 0:e.next)===null||r===void 0||r.call(e,t)}error(t){var e,r;(r=(e=this.destination)===null||e===void 0?void 0:e.error)===null||r===void 0||r.call(e,t)}complete(){var t,e;(e=(t=this.destination)===null||t===void 0?void 0:t.complete)===null||e===void 0||e.call(t)}_subscribe(t){var e,r;return(r=(e=this.source)===null||e===void 0?void 0:e.subscribe(t))!==null&&r!==void 0?r:fh}};var Fe=class extends C{constructor(t){super(),this._value=t}get value(){return this.getValue()}_subscribe(t){let e=super._subscribe(t);return!e.closed&&t.next(this._value),e}getValue(){let{hasError:t,thrownError:e,_value:r}=this;if(t)throw e;return this._throwIfClosed(),r}next(t){super.next(this._value=t)}};var ea={now(){return(ea.delegate||Date).now()},delegate:void 0};var Qr=class extends C{constructor(t=1/0,e=1/0,r=ea){super(),this._bufferSize=t,this._windowTime=e,this._timestampProvider=r,this._buffer=[],this._infiniteTimeWindow=!0,this._infiniteTimeWindow=e===1/0,this._bufferSize=Math.max(1,t),this._windowTime=Math.max(1,e)}next(t){let{isStopped:e,_buffer:r,_infiniteTimeWindow:i,_timestampProvider:o,_windowTime:s}=this;e||(r.push(t),!i&&r.push(o.now()+s)),this._trimBuffer(),super.next(t)}_subscribe(t){this._throwIfClosed(),this._trimBuffer();let e=this._innerSubscribe(t),{_infiniteTimeWindow:r,_buffer:i}=this,o=i.slice();for(let s=0;s<o.length&&!t.closed;s+=r?1:2)t.next(o[s]);return this._checkFinalizedStatuses(t),e}_trimBuffer(){let{_bufferSize:t,_timestampProvider:e,_buffer:r,_infiniteTimeWindow:i}=this,o=(i?1:2)*t;if(t<1/0&&o<r.length&&r.splice(0,r.length-o),!i){let s=e.now(),a=0;for(let l=1;l<r.length&&r[l]<=s;l+=2)a=l;a&&r.splice(0,a+1)}}};var hc=class extends Z{constructor(t,e){super()}schedule(t,e=0){return this}};var ta={setInterval(n,t,...e){let{delegate:r}=ta;return r?.setInterval?r.setInterval(n,t,...e):setInterval(n,t,...e)},clearInterval(n){let{delegate:t}=ta;return(t?.clearInterval||clearInterval)(n)},delegate:void 0};var Jr=class extends hc{constructor(t,e){super(t,e),this.scheduler=t,this.work=e,this.pending=!1}schedule(t,e=0){var r;if(this.closed)return this;this.state=t;let i=this.id,o=this.scheduler;return i!=null&&(this.id=this.recycleAsyncId(o,i,e)),this.pending=!0,this.delay=e,this.id=(r=this.id)!==null&&r!==void 0?r:this.requestAsyncId(o,this.id,e),this}requestAsyncId(t,e,r=0){return ta.setInterval(t.flush.bind(t,this),r)}recycleAsyncId(t,e,r=0){if(r!=null&&this.delay===r&&this.pending===!1)return e;e!=null&&ta.clearInterval(e)}execute(t,e){if(this.closed)return new Error("executing a cancelled action");this.pending=!1;let r=this._execute(t,e);if(r)return r;this.pending===!1&&this.id!=null&&(this.id=this.recycleAsyncId(this.scheduler,this.id,null))}_execute(t,e){let r=!1,i;try{this.work(t)}catch(o){r=!0,i=o||new Error("Scheduled action threw falsy error")}if(r)return this.unsubscribe(),i}unsubscribe(){if(!this.closed){let{id:t,scheduler:e}=this,{actions:r}=e;this.work=this.state=this.scheduler=null,this.pending=!1,Oi(r,this),t!=null&&(this.id=this.recycleAsyncId(e,t,null)),this.delay=null,super.unsubscribe()}}};var DI=1,Ch,Eh={};function Tb(n){return n in Eh?(delete Eh[n],!0):!1}var Sb={setImmediate(n){let t=DI++;return Eh[t]=!0,Ch||(Ch=Promise.resolve()),Ch.then(()=>Tb(t)&&n()),t},clearImmediate(n){Tb(n)}};var{setImmediate:wI,clearImmediate:TI}=Sb,na={setImmediate(...n){let{delegate:t}=na;return(t?.setImmediate||wI)(...n)},clearImmediate(n){let{delegate:t}=na;return(t?.clearImmediate||TI)(n)},delegate:void 0};var pc=class extends Jr{constructor(t,e){super(t,e),this.scheduler=t,this.work=e}requestAsyncId(t,e,r=0){return r!==null&&r>0?super.requestAsyncId(t,e,r):(t.actions.push(this),t._scheduled||(t._scheduled=na.setImmediate(t.flush.bind(t,void 0))))}recycleAsyncId(t,e,r=0){var i;if(r!=null?r>0:this.delay>0)return super.recycleAsyncId(t,e,r);let{actions:o}=t;e!=null&&((i=o[o.length-1])===null||i===void 0?void 0:i.id)!==e&&(na.clearImmediate(e),t._scheduled===e&&(t._scheduled=void 0))}};var zo=class n{constructor(t,e=n.now){this.schedulerActionCtor=t,this.now=e}schedule(t,e=0,r){return new this.schedulerActionCtor(this,t).schedule(r,e)}};zo.now=ea.now;var ei=class extends zo{constructor(t,e=zo.now){super(t,e),this.actions=[],this._active=!1}flush(t){let{actions:e}=this;if(this._active){e.push(t);return}let r;this._active=!0;do if(r=t.execute(t.state,t.delay))break;while(t=e.shift());if(this._active=!1,r){for(;t=e.shift();)t.unsubscribe();throw r}}};var mc=class extends ei{flush(t){this._active=!0;let e=this._scheduled;this._scheduled=void 0;let{actions:r}=this,i;t=t||r.shift();do if(i=t.execute(t.state,t.delay))break;while((t=r[0])&&t.id===e&&r.shift());if(this._active=!1,i){for(;(t=r[0])&&t.id===e&&r.shift();)t.unsubscribe();throw i}}};var Dh=new mc(pc);var ra=new ei(Jr),Ib=ra;var gc=class extends Jr{constructor(t,e){super(t,e),this.scheduler=t,this.work=e}requestAsyncId(t,e,r=0){return r!==null&&r>0?super.requestAsyncId(t,e,r):(t.actions.push(this),t._scheduled||(t._scheduled=Ho.requestAnimationFrame(()=>t.flush(void 0))))}recycleAsyncId(t,e,r=0){var i;if(r!=null?r>0:this.delay>0)return super.recycleAsyncId(t,e,r);let{actions:o}=t;e!=null&&e===t._scheduled&&((i=o[o.length-1])===null||i===void 0?void 0:i.id)!==e&&(Ho.cancelAnimationFrame(e),t._scheduled=void 0)}};var yc=class extends ei{flush(t){this._active=!0;let e;t?e=t.id:(e=this._scheduled,this._scheduled=void 0);let{actions:r}=this,i;t=t||r.shift();do if(i=t.execute(t.state,t.delay))break;while((t=r[0])&&t.id===e&&r.shift());if(this._active=!1,i){for(;(t=r[0])&&t.id===e&&r.shift();)t.unsubscribe();throw i}}};var wh=new yc(gc);var Ce=new N(n=>n.complete());function vc(n){return n&&W(n.schedule)}function Th(n){return n[n.length-1]}function bc(n){return W(Th(n))?n.pop():void 0}function er(n){return vc(Th(n))?n.pop():void 0}function Mb(n,t){return typeof Th(n)=="number"?n.pop():t}function ia(n,t,e,r){var i=arguments.length,o=i<3?t:r===null?r=Object.getOwnPropertyDescriptor(t,e):r,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")o=Reflect.decorate(n,t,e,r);else for(var a=n.length-1;a>=0;a--)(s=n[a])&&(o=(i<3?s(o):i>3?s(t,e,o):s(t,e))||o);return i>3&&o&&Object.defineProperty(t,e,o),o}function Rb(n,t,e,r){function i(o){return o instanceof e?o:new e(function(s){s(o)})}return new(e||(e=Promise))(function(o,s){function a(u){try{c(r.next(u))}catch(d){s(d)}}function l(u){try{c(r.throw(u))}catch(d){s(d)}}function c(u){u.done?o(u.value):i(u.value).then(a,l)}c((r=r.apply(n,t||[])).next())})}function xb(n){var t=typeof Symbol=="function"&&Symbol.iterator,e=t&&n[t],r=0;if(e)return e.call(n);if(n&&typeof n.length=="number")return{next:function(){return n&&r>=n.length&&(n=void 0),{value:n&&n[r++],done:!n}}};throw new TypeError(t?"Object is not iterable.":"Symbol.iterator is not defined.")}function Li(n){return this instanceof Li?(this.v=n,this):new Li(n)}function Ab(n,t,e){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var r=e.apply(n,t||[]),i,o=[];return i=Object.create((typeof AsyncIterator=="function"?AsyncIterator:Object).prototype),a("next"),a("throw"),a("return",s),i[Symbol.asyncIterator]=function(){return this},i;function s(p){return function(m){return Promise.resolve(m).then(p,d)}}function a(p,m){r[p]&&(i[p]=function(v){return new Promise(function(I,R){o.push([p,v,I,R])>1||l(p,v)})},m&&(i[p]=m(i[p])))}function l(p,m){try{c(r[p](m))}catch(v){f(o[0][3],v)}}function c(p){p.value instanceof Li?Promise.resolve(p.value.v).then(u,d):f(o[0][2],p)}function u(p){l("next",p)}function d(p){l("throw",p)}function f(p,m){p(m),o.shift(),o.length&&l(o[0][0],o[0][1])}}function kb(n){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var t=n[Symbol.asyncIterator],e;return t?t.call(n):(n=typeof xb=="function"?xb(n):n[Symbol.iterator](),e={},r("next"),r("throw"),r("return"),e[Symbol.asyncIterator]=function(){return this},e);function r(o){e[o]=n[o]&&function(s){return new Promise(function(a,l){s=n[o](s),i(a,l,s.done,s.value)})}}function i(o,s,a,l){Promise.resolve(l).then(function(c){o({value:c,done:a})},s)}}var _c=n=>n&&typeof n.length=="number"&&typeof n!="function";function Cc(n){return W(n?.then)}function Ec(n){return W(n[$o])}function Dc(n){return Symbol.asyncIterator&&W(n?.[Symbol.asyncIterator])}function wc(n){return new TypeError(`You provided ${n!==null&&typeof n=="object"?"an invalid object":`'${n}'`} where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.`)}function SI(){return typeof Symbol!="function"||!Symbol.iterator?"@@iterator":Symbol.iterator}var Tc=SI();function Sc(n){return W(n?.[Tc])}function Ic(n){return Ab(this,arguments,function*(){let e=n.getReader();try{for(;;){let{value:r,done:i}=yield Li(e.read());if(i)return yield Li(void 0);yield yield Li(r)}}finally{e.releaseLock()}})}function Mc(n){return W(n?.getReader)}function Ee(n){if(n instanceof N)return n;if(n!=null){if(Ec(n))return II(n);if(_c(n))return MI(n);if(Cc(n))return xI(n);if(Dc(n))return Ob(n);if(Sc(n))return RI(n);if(Mc(n))return AI(n)}throw wc(n)}function II(n){return new N(t=>{let e=n[$o]();if(W(e.subscribe))return e.subscribe(t);throw new TypeError("Provided object does not correctly implement Symbol.observable")})}function MI(n){return new N(t=>{for(let e=0;e<n.length&&!t.closed;e++)t.next(n[e]);t.complete()})}function xI(n){return new N(t=>{n.then(e=>{t.closed||(t.next(e),t.complete())},e=>t.error(e)).then(null,uc)})}function RI(n){return new N(t=>{for(let e of n)if(t.next(e),t.closed)return;t.complete()})}function Ob(n){return new N(t=>{kI(n,t).catch(e=>t.error(e))})}function AI(n){return Ob(Ic(n))}function kI(n,t){var e,r,i,o;return Rb(this,void 0,void 0,function*(){try{for(e=kb(n);r=yield e.next(),!r.done;){let s=r.value;if(t.next(s),t.closed)return}}catch(s){i={error:s}}finally{try{r&&!r.done&&(o=e.return)&&(yield o.call(e))}finally{if(i)throw i.error}}t.complete()})}function Vt(n,t,e,r=0,i=!1){let o=t.schedule(function(){e(),i?n.add(this.schedule(null,r)):this.unsubscribe()},r);if(n.add(o),!i)return o}function xc(n,t=0){return q((e,r)=>{e.subscribe(G(r,i=>Vt(r,n,()=>r.next(i),t),()=>Vt(r,n,()=>r.complete(),t),i=>Vt(r,n,()=>r.error(i),t)))})}function Rc(n,t=0){return q((e,r)=>{r.add(n.schedule(()=>e.subscribe(r),t))})}function Nb(n,t){return Ee(n).pipe(Rc(t),xc(t))}function Pb(n,t){return Ee(n).pipe(Rc(t),xc(t))}function Lb(n,t){return new N(e=>{let r=0;return t.schedule(function(){r===n.length?e.complete():(e.next(n[r++]),e.closed||this.schedule())})})}function Fb(n,t){return new N(e=>{let r;return Vt(e,t,()=>{r=n[Tc](),Vt(e,t,()=>{let i,o;try{({value:i,done:o}=r.next())}catch(s){e.error(s);return}o?e.complete():e.next(i)},0,!0)}),()=>W(r?.return)&&r.return()})}function Ac(n,t){if(!n)throw new Error("Iterable cannot be null");return new N(e=>{Vt(e,t,()=>{let r=n[Symbol.asyncIterator]();Vt(e,t,()=>{r.next().then(i=>{i.done?e.complete():e.next(i.value)})},0,!0)})})}function Bb(n,t){return Ac(Ic(n),t)}function jb(n,t){if(n!=null){if(Ec(n))return Nb(n,t);if(_c(n))return Lb(n,t);if(Cc(n))return Pb(n,t);if(Dc(n))return Ac(n,t);if(Sc(n))return Fb(n,t);if(Mc(n))return Bb(n,t)}throw wc(n)}function Be(n,t){return t?jb(n,t):Ee(n)}function x(...n){let t=er(n);return Be(n,t)}function Sh(n,t){let e=W(n)?n:()=>n,r=i=>i.error(e());return new N(t?i=>t.schedule(r,0,i):r)}function Zt(n){return!!n&&(n instanceof N||W(n.lift)&&W(n.subscribe))}var Dr=jo(n=>function(){n(this),this.name="EmptyError",this.message="no elements in sequence"});function Wo(n,t){let e=typeof t=="object";return new Promise((r,i)=>{let o=new An({next:s=>{r(s),o.unsubscribe()},error:i,complete:()=>{e?r(t.defaultValue):i(new Dr)}});n.subscribe(o)})}function Vb(n){return n instanceof Date&&!isNaN(n)}function ee(n,t){return q((e,r)=>{let i=0;e.subscribe(G(r,o=>{r.next(n.call(t,o,i++))}))})}var{isArray:OI}=Array;function NI(n,t){return OI(t)?n(...t):n(t)}function kc(n){return ee(t=>NI(n,t))}var{isArray:PI}=Array,{getPrototypeOf:LI,prototype:FI,keys:BI}=Object;function Oc(n){if(n.length===1){let t=n[0];if(PI(t))return{args:t,keys:null};if(jI(t)){let e=BI(t);return{args:e.map(r=>t[r]),keys:e}}}return{args:n,keys:null}}function jI(n){return n&&typeof n=="object"&&LI(n)===FI}function Nc(n,t){return n.reduce((e,r,i)=>(e[r]=t[i],e),{})}function oa(...n){let t=er(n),e=bc(n),{args:r,keys:i}=Oc(n);if(r.length===0)return Be([],t);let o=new N(VI(r,t,i?s=>Nc(i,s):Yt));return e?o.pipe(kc(e)):o}function VI(n,t,e=Yt){return r=>{Ub(t,()=>{let{length:i}=n,o=new Array(i),s=i,a=i;for(let l=0;l<i;l++)Ub(t,()=>{let c=Be(n[l],t),u=!1;c.subscribe(G(r,d=>{o[l]=d,u||(u=!0,a--),a||r.next(e(o.slice()))},()=>{--s||r.complete()}))},r)},r)}}function Ub(n,t,e){n?Vt(e,n,t):t()}function $b(n,t,e,r,i,o,s,a){let l=[],c=0,u=0,d=!1,f=()=>{d&&!l.length&&!c&&t.complete()},p=v=>c<r?m(v):l.push(v),m=v=>{o&&t.next(v),c++;let I=!1;Ee(e(v,u++)).subscribe(G(t,R=>{i?.(R),o?p(R):t.next(R)},()=>{I=!0},void 0,()=>{if(I)try{for(c--;l.length&&c<r;){let R=l.shift();s?Vt(t,s,()=>m(R)):m(R)}f()}catch(R){t.error(R)}}))};return n.subscribe(G(t,p,()=>{d=!0,f()})),()=>{a?.()}}function Tt(n,t,e=1/0){return W(t)?Tt((r,i)=>ee((o,s)=>t(r,o,i,s))(Ee(n(r,i))),e):(typeof t=="number"&&(e=t),q((r,i)=>$b(r,i,n,e)))}function Pc(n=1/0){return Tt(Yt,n)}function Hb(){return Pc(1)}function ti(...n){return Hb()(Be(n,er(n)))}function sa(n){return new N(t=>{Ee(n()).subscribe(t)})}function Lc(...n){let t=bc(n),{args:e,keys:r}=Oc(n),i=new N(o=>{let{length:s}=e;if(!s){o.complete();return}let a=new Array(s),l=s,c=s;for(let u=0;u<s;u++){let d=!1;Ee(e[u]).subscribe(G(o,f=>{d||(d=!0,c--),a[u]=f},()=>l--,void 0,()=>{(!l||!d)&&(c||o.next(r?Nc(r,a):a),o.complete())}))}});return t?i.pipe(kc(t)):i}function aa(n=0,t,e=Ib){let r=-1;return t!=null&&(vc(t)?e=t:r=t),new N(i=>{let o=Vb(n)?+n-e.now():n;o<0&&(o=0);let s=0;return e.schedule(function(){i.closed||(i.next(s++),0<=r?this.schedule(void 0,r):i.complete())},o)})}function la(...n){let t=er(n),e=Mb(n,1/0),r=n;return r.length?r.length===1?Ee(r[0]):Pc(e)(Be(r,t)):Ce}function be(n,t){return q((e,r)=>{let i=0;e.subscribe(G(r,o=>n.call(t,o,i++)&&r.next(o)))})}function zb(n){return q((t,e)=>{let r=!1,i=null,o=null,s=!1,a=()=>{if(o?.unsubscribe(),o=null,r){r=!1;let c=i;i=null,e.next(c)}s&&e.complete()},l=()=>{o=null,s&&e.complete()};t.subscribe(G(e,c=>{r=!0,i=c,o||Ee(n(c)).subscribe(o=G(e,a,l))},()=>{s=!0,(!r||!o||o.closed)&&e.complete()}))})}function ca(n,t=ra){return zb(()=>aa(n,t))}function wr(n){return q((t,e)=>{let r=null,i=!1,o;r=t.subscribe(G(e,void 0,void 0,s=>{o=Ee(n(s,wr(n)(t))),r?(r.unsubscribe(),r=null,o.subscribe(e)):i=!0})),i&&(r.unsubscribe(),r=null,o.subscribe(e))})}function Fc(n,t){return W(t)?Tt(n,t,1):Tt(n,1)}function Tr(n,t=ra){return q((e,r)=>{let i=null,o=null,s=null,a=()=>{if(i){i.unsubscribe(),i=null;let c=o;o=null,r.next(c)}};function l(){let c=s+n,u=t.now();if(u<c){i=this.schedule(void 0,c-u),r.add(i);return}a()}e.subscribe(G(r,c=>{o=c,s=t.now(),i||(i=t.schedule(l,n),r.add(i))},()=>{a(),r.complete()},void 0,()=>{o=i=null}))})}function Wb(n){return q((t,e)=>{let r=!1;t.subscribe(G(e,i=>{r=!0,e.next(i)},()=>{r||e.next(n),e.complete()}))})}function gt(n){return n<=0?()=>Ce:q((t,e)=>{let r=0;t.subscribe(G(e,i=>{++r<=n&&(e.next(i),n<=r&&e.complete())}))})}function Go(n,t=Yt){return n=n??UI,q((e,r)=>{let i,o=!0;e.subscribe(G(r,s=>{let a=t(s);(o||!n(i,a))&&(o=!1,i=a,r.next(s))}))})}function UI(n,t){return n===t}function Gb(n=$I){return q((t,e)=>{let r=!1;t.subscribe(G(e,i=>{r=!0,e.next(i)},()=>r?e.complete():e.error(n())))})}function $I(){return new Dr}function Ih(n){return q((t,e)=>{try{t.subscribe(e)}finally{e.add(n)}})}function Sr(n,t){let e=arguments.length>=2;return r=>r.pipe(n?be((i,o)=>n(i,o,r)):Yt,gt(1),e?Wb(t):Gb(()=>new Dr))}function Bc(n){return n<=0?()=>Ce:q((t,e)=>{let r=[];t.subscribe(G(e,i=>{r.push(i),n<r.length&&r.shift()},()=>{for(let i of r)e.next(i);e.complete()},void 0,()=>{r=null}))})}function Mh(){return q((n,t)=>{let e,r=!1;n.subscribe(G(t,i=>{let o=e;e=i,r&&t.next([o,i]),r=!0}))})}function qb(n={}){let{connector:t=()=>new C,resetOnError:e=!0,resetOnComplete:r=!0,resetOnRefCountZero:i=!0}=n;return o=>{let s,a,l,c=0,u=!1,d=!1,f=()=>{a?.unsubscribe(),a=void 0},p=()=>{f(),s=l=void 0,u=d=!1},m=()=>{let v=s;p(),v?.unsubscribe()};return q((v,I)=>{c++,!d&&!u&&f();let R=l=l??t();I.add(()=>{c--,c===0&&!d&&!u&&(a=xh(m,i))}),R.subscribe(I),!s&&c>0&&(s=new An({next:te=>R.next(te),error:te=>{d=!0,f(),a=xh(p,e,te),R.error(te)},complete:()=>{u=!0,f(),a=xh(p,r),R.complete()}}),Ee(v).subscribe(s))})(o)}}function xh(n,t,...e){if(t===!0){n();return}if(t===!1)return;let r=new An({next:()=>{r.unsubscribe(),n()}});return Ee(t(...e)).subscribe(r)}function ua(n,t,e){let r,i=!1;return n&&typeof n=="object"?{bufferSize:r=1/0,windowTime:t=1/0,refCount:i=!1,scheduler:e}=n:r=n??1/0,qb({connector:()=>new Qr(r,t,e),resetOnError:!0,resetOnComplete:!1,resetOnRefCountZero:i})}function Fi(n){return be((t,e)=>n<=e)}function an(...n){let t=er(n);return q((e,r)=>{(t?ti(n,e,t):ti(n,e)).subscribe(r)})}function St(n,t){return q((e,r)=>{let i=null,o=0,s=!1,a=()=>s&&!i&&r.complete();e.subscribe(G(r,l=>{i?.unsubscribe();let c=0,u=o++;Ee(n(l,u)).subscribe(i=G(r,d=>r.next(t?t(l,d,u,c++):d),()=>{i=null,a()}))},()=>{s=!0,a()}))})}function J(n){return q((t,e)=>{Ee(n).subscribe(G(e,()=>e.complete(),Qs)),!e.closed&&t.subscribe(e)})}function Xe(n,t,e){let r=W(n)||t||e?{next:n,error:t,complete:e}:n;return r?q((i,o)=>{var s;(s=r.subscribe)===null||s===void 0||s.call(r);let a=!0;i.subscribe(G(o,l=>{var c;(c=r.next)===null||c===void 0||c.call(r,l),o.next(l)},()=>{var l;a=!1,(l=r.complete)===null||l===void 0||l.call(r),o.complete()},l=>{var c;a=!1,(c=r.error)===null||c===void 0||c.call(r,l),o.error(l)},()=>{var l,c;a&&((l=r.unsubscribe)===null||l===void 0||l.call(r)),(c=r.finalize)===null||c===void 0||c.call(r)}))}):Yt}var Rh;function jc(){return Rh}function tr(n){let t=Rh;return Rh=n,t}var Kb=Symbol("NotFound");function qo(n){return n===Kb||n?.name==="\u0275NotFound"}function Yb(n){let t=O(null);try{return n()}finally{O(t)}}var Hh="https://angular.dev/best-practices/security#preventing-cross-site-scripting-xss",T=class extends Error{code;constructor(t,e){super(si(t,e)),this.code=t}};function HI(n){return`NG0${Math.abs(n)}`}function si(n,t){return`${HI(n)}${t?": "+t:""}`}var $i=globalThis;function pe(n){for(let t in n)if(n[t]===pe)return t;throw Error("")}function e_(n,t){for(let e in t)t.hasOwnProperty(e)&&!n.hasOwnProperty(e)&&(n[e]=t[e])}function ya(n){if(typeof n=="string")return n;if(Array.isArray(n))return`[${n.map(ya).join(", ")}]`;if(n==null)return""+n;let t=n.overriddenName||n.name;if(t)return`${t}`;let e=n.toString();if(e==null)return""+e;let r=e.indexOf(`
`);return r>=0?e.slice(0,r):e}function Gc(n,t){return n?t?`${n} ${t}`:n:t||""}var zI=pe({__forward_ref__:pe});function Yo(n){return n.__forward_ref__=Yo,n}function at(n){return zh(n)?n():n}function zh(n){return typeof n=="function"&&n.hasOwnProperty(zI)&&n.__forward_ref__===Yo}function y(n){return{token:n.token,providedIn:n.providedIn||null,factory:n.factory,value:void 0}}function Ae(n){return{providers:n.providers||[],imports:n.imports||[]}}function va(n){return WI(n,qc)}function Wh(n){return va(n)!==null}function WI(n,t){return n.hasOwnProperty(t)&&n[t]||null}function GI(n){let t=n?.[qc]??null;return t||null}function kh(n){return n&&n.hasOwnProperty(Uc)?n[Uc]:null}var qc=pe({\u0275prov:pe}),Uc=pe({\u0275inj:pe}),b=class{_desc;ngMetadataName="InjectionToken";\u0275prov;constructor(t,e){this._desc=t,this.\u0275prov=void 0,typeof e=="number"?this.__NG_ELEMENT_ID__=e:e!==void 0&&(this.\u0275prov=y({token:this,providedIn:e.providedIn||"root",factory:e.factory}))}get multi(){return this}toString(){return`InjectionToken ${this._desc}`}};function Gh(n){return n&&!!n.\u0275providers}var qh=pe({\u0275cmp:pe}),Kh=pe({\u0275dir:pe}),Yh=pe({\u0275pipe:pe}),Zh=pe({\u0275mod:pe}),fa=pe({\u0275fac:pe}),Hi=pe({__NG_ELEMENT_ID__:pe}),Zb=pe({__NG_ENV_ID__:pe});function Xh(n){return Kc(n,"@NgModule"),n[Zh]||null}function Mr(n){return Kc(n,"@Component"),n[qh]||null}function Qh(n){return Kc(n,"@Directive"),n[Kh]||null}function t_(n){return Kc(n,"@Pipe"),n[Yh]||null}function Kc(n,t){if(n==null)throw new T(-919,!1)}function Jh(n){return typeof n=="string"?n:n==null?"":String(n)}var n_=pe({ngErrorCode:pe}),qI=pe({ngErrorMessage:pe}),KI=pe({ngTokenPath:pe});function ep(n,t){return r_("",-200,t)}function Yc(n,t){throw new T(-201,!1)}function r_(n,t,e){let r=new T(t,n);return r[n_]=t,r[qI]=n,e&&(r[KI]=e),r}function YI(n){return n[n_]}var Oh;function i_(){return Oh}function It(n){let t=Oh;return Oh=n,t}function tp(n,t,e){let r=va(n);if(r&&r.providedIn=="root")return r.value===void 0?r.value=r.factory():r.value;if(e&8)return null;if(t!==void 0)return t;Yc(n,"")}var ZI={},Bi=ZI,XI="__NG_DI_FLAG__",Nh=class{injector;constructor(t){this.injector=t}retrieve(t,e){let r=ji(e)||0;try{return this.injector.get(t,r&8?null:Bi,r)}catch(i){if(qo(i))return i;throw i}}};function QI(n,t=0){let e=jc();if(e===void 0)throw new T(-203,!1);if(e===null)return tp(n,void 0,t);{let r=JI(t),i=e.retrieve(n,r);if(qo(i)){if(r.optional)return null;throw i}return i}}function H(n,t=0){return(i_()||QI)(at(n),t)}function h(n,t){return H(n,ji(t))}function ji(n){return typeof n>"u"||typeof n=="number"?n:0|(n.optional&&8)|(n.host&&1)|(n.self&&2)|(n.skipSelf&&4)}function JI(n){return{optional:!!(n&8),host:!!(n&1),self:!!(n&2),skipSelf:!!(n&4)}}function Ph(n){let t=[];for(let e=0;e<n.length;e++){let r=at(n[e]);if(Array.isArray(r)){if(r.length===0)throw new T(900,!1);let i,o=0;for(let s=0;s<r.length;s++){let a=r[s],l=eM(a);typeof l=="number"?l===-1?i=a.token:o|=l:i=a}t.push(H(i,o))}else t.push(H(r))}return t}function eM(n){return n[XI]}function ni(n,t){let e=n.hasOwnProperty(fa);return e?n[fa]:null}function o_(n,t,e){if(n.length!==t.length)return!1;for(let r=0;r<n.length;r++){let i=n[r],o=t[r];if(e&&(i=e(i),o=e(o)),o!==i)return!1}return!0}function s_(n){return n.flat(Number.POSITIVE_INFINITY)}function Zc(n,t){n.forEach(e=>Array.isArray(e)?Zc(e,t):t(e))}function np(n,t,e){t>=n.length?n.push(e):n.splice(t,0,e)}function ba(n,t){return t>=n.length-1?n.pop():n.splice(t,1)[0]}function a_(n,t){let e=[];for(let r=0;r<n;r++)e.push(t);return e}function l_(n,t,e,r){let i=n.length;if(i==t)n.push(e,r);else if(i===1)n.push(r,n[0]),n[0]=e;else{for(i--,n.push(n[i-1],n[i]);i>t;){let o=i-2;n[i]=n[o],i--}n[t]=e,n[t+1]=r}}function Xc(n,t,e){let r=Zo(n,t);return r>=0?n[r|1]=e:(r=~r,l_(n,r,t,e)),r}function Qc(n,t){let e=Zo(n,t);if(e>=0)return n[e|1]}function Zo(n,t){return tM(n,t,1)}function tM(n,t,e){let r=0,i=n.length>>e;for(;i!==r;){let o=r+(i-r>>1),s=n[o<<e];if(t===s)return o<<e;s>t?i=o:r=o+1}return~(i<<e)}var ai={},Mt=[],zi=new b(""),rp=new b("",-1),ip=new b(""),ha=class{get(t,e=Bi){if(e===Bi){let i=r_("",-201);throw i.name="\u0275NotFound",i}return e}};function li(n){return{\u0275providers:n}}function c_(n){return li([{provide:zi,multi:!0,useValue:n}])}function u_(...n){return{\u0275providers:op(!0,n),\u0275fromNgModule:!0}}function op(n,...t){let e=[],r=new Set,i,o=s=>{e.push(s)};return Zc(t,s=>{let a=s;$c(a,o,[],r)&&(i||=[],i.push(a))}),i!==void 0&&d_(i,o),e}function d_(n,t){for(let e=0;e<n.length;e++){let{ngModule:r,providers:i}=n[e];sp(i,o=>{t(o,r)})}}function $c(n,t,e,r){if(n=at(n),!n)return!1;let i=null,o=kh(n),s=!o&&Mr(n);if(!o&&!s){let l=n.ngModule;if(o=kh(l),o)i=l;else return!1}else{if(s&&!s.standalone)return!1;i=n}let a=r.has(i);if(s){if(a)return!1;if(r.add(i),s.dependencies){let l=typeof s.dependencies=="function"?s.dependencies():s.dependencies;for(let c of l)$c(c,t,e,r)}}else if(o){if(o.imports!=null&&!a){r.add(i);let c;Zc(o.imports,u=>{$c(u,t,e,r)&&(c||=[],c.push(u))}),c!==void 0&&d_(c,t)}if(!a){let c=ni(i)||(()=>new i);t({provide:i,useFactory:c,deps:Mt},i),t({provide:ip,useValue:i,multi:!0},i),t({provide:zi,useValue:()=>H(i),multi:!0},i)}let l=o.providers;if(l!=null&&!a){let c=n;sp(l,u=>{t(u,c)})}}else return!1;return i!==n&&n.providers!==void 0}function sp(n,t){for(let e of n)Gh(e)&&(e=e.\u0275providers),Array.isArray(e)?sp(e,t):t(e)}var nM=pe({provide:String,useValue:pe});function f_(n){return n!==null&&typeof n=="object"&&nM in n}function rM(n){return!!(n&&n.useExisting)}function iM(n){return!!(n&&n.useFactory)}function Vi(n){return typeof n=="function"}function h_(n){return!!n.useClass}var _a=new b(""),Vc={},Xb={},Ah;function Xo(){return Ah===void 0&&(Ah=new ha),Ah}var Se=class{},Ui=class extends Se{parent;source;scopes;records=new Map;_ngOnDestroyHooks=new Set;_onDestroyHooks=[];get destroyed(){return this._destroyed}_destroyed=!1;injectorDefTypes;constructor(t,e,r,i){super(),this.parent=e,this.source=r,this.scopes=i,Fh(t,s=>this.processProvider(s)),this.records.set(rp,Ko(void 0,this)),i.has("environment")&&this.records.set(Se,Ko(void 0,this));let o=this.records.get(_a);o!=null&&typeof o.value=="string"&&this.scopes.add(o.value),this.injectorDefTypes=new Set(this.get(ip,Mt,{self:!0}))}retrieve(t,e){let r=ji(e)||0;try{return this.get(t,Bi,r)}catch(i){if(qo(i))return i;throw i}}destroy(){da(this),this._destroyed=!0;let t=O(null);try{for(let r of this._ngOnDestroyHooks)r.ngOnDestroy();let e=this._onDestroyHooks;this._onDestroyHooks=[];for(let r of e)r()}finally{this.records.clear(),this._ngOnDestroyHooks.clear(),this.injectorDefTypes.clear(),O(t)}}onDestroy(t){return da(this),this._onDestroyHooks.push(t),()=>this.removeOnDestroy(t)}runInContext(t){da(this);let e=tr(this),r=It(void 0),i;try{return t()}finally{tr(e),It(r)}}get(t,e=Bi,r){if(da(this),t.hasOwnProperty(Zb))return t[Zb](this);let i=ji(r),o,s=tr(this),a=It(void 0);try{if(!(i&4)){let c=this.records.get(t);if(c===void 0){let u=cM(t)&&va(t);u&&this.injectableDefInScope(u)?c=Ko(Lh(t),Vc):c=null,this.records.set(t,c)}if(c!=null)return this.hydrate(t,c,i)}let l=i&2?Xo():this.parent;return e=i&8&&e===Bi?null:e,l.get(t,e)}catch(l){let c=YI(l);throw c===-200||c===-201?new T(c,null):l}finally{It(a),tr(s)}}resolveInjectorInitializers(){let t=O(null),e=tr(this),r=It(void 0),i;try{let o=this.get(zi,Mt,{self:!0});for(let s of o)s()}finally{tr(e),It(r),O(t)}}toString(){return"R3Injector[...]"}processProvider(t){t=at(t);let e=Vi(t)?t:at(t&&t.provide),r=sM(t);if(!Vi(t)&&t.multi===!0){let i=this.records.get(e);i||(i=Ko(void 0,Vc,!0),i.factory=()=>Ph(i.multi),this.records.set(e,i)),e=t,i.multi.push(t)}this.records.set(e,r)}hydrate(t,e,r){let i=O(null);try{if(e.value===Xb)throw ep("");return e.value===Vc&&(e.value=Xb,e.value=e.factory(void 0,r)),typeof e.value=="object"&&e.value&&lM(e.value)&&this._ngOnDestroyHooks.add(e.value),e.value}finally{O(i)}}injectableDefInScope(t){if(!t.providedIn)return!1;let e=at(t.providedIn);return typeof e=="string"?e==="any"||this.scopes.has(e):this.injectorDefTypes.has(e)}removeOnDestroy(t){let e=this._onDestroyHooks.indexOf(t);e!==-1&&this._onDestroyHooks.splice(e,1)}};function Lh(n){let t=va(n),e=t!==null?t.factory:ni(n);if(e!==null)return e;if(n instanceof b)throw new T(-204,!1);if(n instanceof Function)return oM(n);throw new T(-204,!1)}function oM(n){if(n.length>0)throw new T(-204,!1);let e=GI(n);return e!==null?()=>e.factory(n):()=>new n}function sM(n){if(f_(n))return Ko(void 0,n.useValue);{let t=ap(n);return Ko(t,Vc)}}function ap(n,t,e){let r;if(Vi(n)){let i=at(n);return ni(i)||Lh(i)}else if(f_(n))r=()=>at(n.useValue);else if(iM(n))r=()=>n.useFactory(...Ph(n.deps||[]));else if(rM(n))r=(i,o)=>H(at(n.useExisting),o!==void 0&&o&8?8:void 0);else{let i=at(n&&(n.useClass||n.provide));if(aM(n))r=()=>new i(...Ph(n.deps));else return ni(i)||Lh(i)}return r}function da(n){if(n.destroyed)throw new T(-205,!1)}function Ko(n,t,e=!1){return{factory:n,value:t,multi:e?[]:void 0}}function aM(n){return!!n.deps}function lM(n){return n!==null&&typeof n=="object"&&typeof n.ngOnDestroy=="function"}function cM(n){return typeof n=="function"||typeof n=="object"&&n.ngMetadataName==="InjectionToken"}function Fh(n,t){for(let e of n)Array.isArray(e)?Fh(e,t):e&&Gh(e)?Fh(e.\u0275providers,t):t(e)}function yt(n,t){let e;n instanceof Ui?(da(n),e=n):e=new Nh(n);let r,i=tr(e),o=It(void 0);try{return t()}finally{tr(i),It(o)}}function p_(){return i_()!==void 0||jc()!=null}var kn=0,L=1,U=2,Qe=3,cn=4,xt=5,Wi=6,Qo=7,He=8,xr=9,nr=10,Ie=11,Jo=12,lp=13,Gi=14,Rt=15,ci=16,qi=17,rr=18,Rr=19,cp=20,Ir=21,Jc=22,ri=23,Xt=24,Ki=25,ui=26,xe=27,m_=1,up=6,di=7,Ca=8,Yi=9,je=10;function Ar(n){return Array.isArray(n)&&typeof n[m_]=="object"}function On(n){return Array.isArray(n)&&n[m_]===!0}function dp(n){return(n.flags&4)!==0}function ir(n){return n.componentOffset>-1}function Ea(n){return(n.flags&1)===1}function or(n){return!!n.template}function es(n){return(n[U]&512)!==0}function Zi(n){return(n[U]&256)===256}var fp="svg",g_="math";function un(n){for(;Array.isArray(n);)n=n[kn];return n}function hp(n,t){return un(t[n])}function dn(n,t){return un(t[n.index])}function eu(n,t){return n.data[t]}function tu(n,t){return n[t]}function pp(n,t,e,r){e>=n.data.length&&(n.data[e]=null,n.blueprint[e]=null),t[e]=r}function fn(n,t){let e=t[n];return Ar(e)?e:e[kn]}function y_(n){return(n[U]&4)===4}function nu(n){return(n[U]&128)===128}function v_(n){return On(n[Qe])}function Qt(n,t){return t==null?null:n[t]}function mp(n){n[qi]=0}function gp(n){n[U]&1024||(n[U]|=1024,nu(n)&&Xi(n))}function b_(n,t){for(;n>0;)t=t[Gi],n--;return t}function Da(n){return!!(n[U]&9216||n[Xt]?.dirty)}function ru(n){n[nr].changeDetectionScheduler?.notify(8),n[U]&64&&(n[U]|=1024),Da(n)&&Xi(n)}function Xi(n){n[nr].changeDetectionScheduler?.notify(0);let t=ii(n);for(;t!==null&&!(t[U]&8192||(t[U]|=8192,!nu(t)));)t=ii(t)}function yp(n,t){if(Zi(n))throw new T(911,!1);n[Ir]===null&&(n[Ir]=[]),n[Ir].push(t)}function __(n,t){if(n[Ir]===null)return;let e=n[Ir].indexOf(t);e!==-1&&n[Ir].splice(e,1)}function ii(n){let t=n[Qe];return On(t)?t[Qe]:t}function vp(n){return n[Qo]??=[]}function bp(n){return n.cleanup??=[]}function C_(n,t,e,r){let i=vp(t);i.push(e),n.firstCreatePass&&bp(n).push(r,i.length-1)}var X={lFrame:k_(null),bindingsEnabled:!0,skipHydrationRootTNode:null};var Bh=!1;function E_(){return X.lFrame.elementDepthCount}function D_(){X.lFrame.elementDepthCount++}function _p(){X.lFrame.elementDepthCount--}function Cp(){return X.bindingsEnabled}function Ep(){return X.skipHydrationRootTNode!==null}function Dp(n){return X.skipHydrationRootTNode===n}function wp(){X.skipHydrationRootTNode=null}function $(){return X.lFrame.lView}function ke(){return X.lFrame.tView}function nt(n){return X.lFrame.contextLView=n,n[He]}function rt(n){return X.lFrame.contextLView=null,n}function vt(){let n=Tp();for(;n!==null&&n.type===64;)n=n.parent;return n}function Tp(){return X.lFrame.currentTNode}function w_(){let n=X.lFrame,t=n.currentTNode;return n.isParent?t:t.parent}function ts(n,t){let e=X.lFrame;e.currentTNode=n,e.isParent=t}function Sp(){return X.lFrame.isParent}function Ip(){X.lFrame.isParent=!1}function T_(){return X.lFrame.contextLView}function Mp(){return Bh}function pa(n){let t=Bh;return Bh=n,t}function xp(){let n=X.lFrame,t=n.bindingRootIndex;return t===-1&&(t=n.bindingRootIndex=n.tView.bindingStartIndex),t}function S_(n){return X.lFrame.bindingIndex=n}function Qi(){return X.lFrame.bindingIndex++}function Rp(n){let t=X.lFrame,e=t.bindingIndex;return t.bindingIndex=t.bindingIndex+n,e}function I_(){return X.lFrame.inI18n}function M_(n,t){let e=X.lFrame;e.bindingIndex=e.bindingRootIndex=n,iu(t)}function x_(){return X.lFrame.currentDirectiveIndex}function iu(n){X.lFrame.currentDirectiveIndex=n}function R_(n){let t=X.lFrame.currentDirectiveIndex;return t===-1?null:n[t]}function Ap(){return X.lFrame.currentQueryIndex}function ou(n){X.lFrame.currentQueryIndex=n}function uM(n){let t=n[L];return t.type===2?t.declTNode:t.type===1?n[xt]:null}function kp(n,t,e){if(e&4){let i=t,o=n;for(;i=i.parent,i===null&&!(e&1);)if(i=uM(o),i===null||(o=o[Gi],i.type&10))break;if(i===null)return!1;t=i,n=o}let r=X.lFrame=A_();return r.currentTNode=t,r.lView=n,!0}function su(n){let t=A_(),e=n[L];X.lFrame=t,t.currentTNode=e.firstChild,t.lView=n,t.tView=e,t.contextLView=n,t.bindingIndex=e.bindingStartIndex,t.inI18n=!1}function A_(){let n=X.lFrame,t=n===null?null:n.child;return t===null?k_(n):t}function k_(n){let t={currentTNode:null,isParent:!0,lView:null,tView:null,selectedIndex:-1,contextLView:null,elementDepthCount:0,currentNamespace:null,currentDirectiveIndex:-1,bindingRootIndex:-1,bindingIndex:-1,currentQueryIndex:0,parent:n,child:null,inI18n:!1};return n!==null&&(n.child=t),t}function O_(){let n=X.lFrame;return X.lFrame=n.parent,n.currentTNode=null,n.lView=null,n}var Op=O_;function au(){let n=O_();n.isParent=!0,n.tView=null,n.selectedIndex=-1,n.contextLView=null,n.elementDepthCount=0,n.currentDirectiveIndex=-1,n.currentNamespace=null,n.bindingRootIndex=-1,n.bindingIndex=-1,n.currentQueryIndex=0}function N_(n){return(X.lFrame.contextLView=b_(n,X.lFrame.contextLView))[He]}function kr(){return X.lFrame.selectedIndex}function fi(n){X.lFrame.selectedIndex=n}function lu(){let n=X.lFrame;return eu(n.tView,n.selectedIndex)}function wa(){X.lFrame.currentNamespace=fp}function P_(){return X.lFrame.currentNamespace}var L_=!0;function cu(){return L_}function uu(n){L_=n}function jh(n,t=null,e=null,r){let i=Np(n,t,e,r);return i.resolveInjectorInitializers(),i}function Np(n,t=null,e=null,r,i=new Set){let o=[e||Mt,u_(n)],s;return new Ui(o,t||Xo(),s||null,i)}var re=class n{static THROW_IF_NOT_FOUND=Bi;static NULL=new ha;static create(t,e){if(Array.isArray(t))return jh({name:""},e,t,"");{let r=t.name??"";return jh({name:r},t.parent,t.providers,r)}}static \u0275prov=y({token:n,providedIn:"any",factory:()=>H(rp)});static __NG_ELEMENT_ID__=-1},Q=new b(""),Ke=(()=>{class n{static __NG_ELEMENT_ID__=dM;static __NG_ENV_ID__=e=>e}return n})(),Hc=class extends Ke{_lView;constructor(t){super(),this._lView=t}get destroyed(){return Zi(this._lView)}onDestroy(t){let e=this._lView;return yp(e,t),()=>__(e,t)}};function dM(){return new Hc($())}var F_=!1,B_=new b(""),hi=(()=>{class n{taskId=0;pendingTasks=new Set;destroyed=!1;pendingTask=new Fe(!1);debugTaskTracker=h(B_,{optional:!0});get hasPendingTasks(){return this.destroyed?!1:this.pendingTask.value}get hasPendingTasksObservable(){return this.destroyed?new N(e=>{e.next(!1),e.complete()}):this.pendingTask}add(){!this.hasPendingTasks&&!this.destroyed&&this.pendingTask.next(!0);let e=this.taskId++;return this.pendingTasks.add(e),this.debugTaskTracker?.add(e),e}has(e){return this.pendingTasks.has(e)}remove(e){this.pendingTasks.delete(e),this.debugTaskTracker?.remove(e),this.pendingTasks.size===0&&this.hasPendingTasks&&this.pendingTask.next(!1)}ngOnDestroy(){this.pendingTasks.clear(),this.hasPendingTasks&&this.pendingTask.next(!1),this.destroyed=!0,this.pendingTask.unsubscribe()}static \u0275prov=y({token:n,providedIn:"root",factory:()=>new n})}return n})(),Vh=class extends C{__isAsync;destroyRef=void 0;pendingTasks=void 0;constructor(t=!1){super(),this.__isAsync=t,p_()&&(this.destroyRef=h(Ke,{optional:!0})??void 0,this.pendingTasks=h(hi,{optional:!0})??void 0)}emit(t){let e=O(null);try{super.next(t)}finally{O(e)}}subscribe(t,e,r){let i=t,o=e||(()=>null),s=r;if(t&&typeof t=="object"){let l=t;i=l.next?.bind(l),o=l.error?.bind(l),s=l.complete?.bind(l)}this.__isAsync&&(o=this.wrapInTimeout(o),i&&(i=this.wrapInTimeout(i)),s&&(s=this.wrapInTimeout(s)));let a=super.subscribe({next:i,error:o,complete:s});return t instanceof Z&&t.add(a),a}wrapInTimeout(t){return e=>{let r=this.pendingTasks?.add();setTimeout(()=>{try{t(e)}finally{r!==void 0&&this.pendingTasks?.remove(r)}})}}},ne=Vh;function zc(...n){}function Pp(n){let t,e;function r(){n=zc;try{e!==void 0&&typeof cancelAnimationFrame=="function"&&cancelAnimationFrame(e),t!==void 0&&clearTimeout(t)}catch{}}return t=setTimeout(()=>{n(),r()}),typeof requestAnimationFrame=="function"&&(e=requestAnimationFrame(()=>{n(),r()})),()=>r()}function j_(n){return queueMicrotask(()=>n()),()=>{n=zc}}var Lp="isAngularZone",ma=Lp+"_ID",fM=0,V=class n{hasPendingMacrotasks=!1;hasPendingMicrotasks=!1;isStable=!0;onUnstable=new ne(!1);onMicrotaskEmpty=new ne(!1);onStable=new ne(!1);onError=new ne(!1);constructor(t){let{enableLongStackTrace:e=!1,shouldCoalesceEventChangeDetection:r=!1,shouldCoalesceRunChangeDetection:i=!1,scheduleInRootZone:o=F_}=t;if(typeof Zone>"u")throw new T(908,!1);Zone.assertZonePatched();let s=this;s._nesting=0,s._outer=s._inner=Zone.current,Zone.TaskTrackingZoneSpec&&(s._inner=s._inner.fork(new Zone.TaskTrackingZoneSpec)),e&&Zone.longStackTraceZoneSpec&&(s._inner=s._inner.fork(Zone.longStackTraceZoneSpec)),s.shouldCoalesceEventChangeDetection=!i&&r,s.shouldCoalesceRunChangeDetection=i,s.callbackScheduled=!1,s.scheduleInRootZone=o,mM(s)}static isInAngularZone(){return typeof Zone<"u"&&Zone.current.get(Lp)===!0}static assertInAngularZone(){if(!n.isInAngularZone())throw new T(909,!1)}static assertNotInAngularZone(){if(n.isInAngularZone())throw new T(909,!1)}run(t,e,r){return this._inner.run(t,e,r)}runTask(t,e,r,i){let o=this._inner,s=o.scheduleEventTask("NgZoneEvent: "+i,t,hM,zc,zc);try{return o.runTask(s,e,r)}finally{o.cancelTask(s)}}runGuarded(t,e,r){return this._inner.runGuarded(t,e,r)}runOutsideAngular(t){return this._outer.run(t)}},hM={};function Fp(n){if(n._nesting==0&&!n.hasPendingMicrotasks&&!n.isStable)try{n._nesting++,n.onMicrotaskEmpty.emit(null)}finally{if(n._nesting--,!n.hasPendingMicrotasks)try{n.runOutsideAngular(()=>n.onStable.emit(null))}finally{n.isStable=!0}}}function pM(n){if(n.isCheckStableRunning||n.callbackScheduled)return;n.callbackScheduled=!0;function t(){Pp(()=>{n.callbackScheduled=!1,Uh(n),n.isCheckStableRunning=!0,Fp(n),n.isCheckStableRunning=!1})}n.scheduleInRootZone?Zone.root.run(()=>{t()}):n._outer.run(()=>{t()}),Uh(n)}function mM(n){let t=()=>{pM(n)},e=fM++;n._inner=n._inner.fork({name:"angular",properties:{[Lp]:!0,[ma]:e,[ma+e]:!0},onInvokeTask:(r,i,o,s,a,l)=>{if(gM(l))return r.invokeTask(o,s,a,l);try{return Qb(n),r.invokeTask(o,s,a,l)}finally{(n.shouldCoalesceEventChangeDetection&&s.type==="eventTask"||n.shouldCoalesceRunChangeDetection)&&t(),Jb(n)}},onInvoke:(r,i,o,s,a,l,c)=>{try{return Qb(n),r.invoke(o,s,a,l,c)}finally{n.shouldCoalesceRunChangeDetection&&!n.callbackScheduled&&!yM(l)&&t(),Jb(n)}},onHasTask:(r,i,o,s)=>{r.hasTask(o,s),i===o&&(s.change=="microTask"?(n._hasPendingMicrotasks=s.microTask,Uh(n),Fp(n)):s.change=="macroTask"&&(n.hasPendingMacrotasks=s.macroTask))},onHandleError:(r,i,o,s)=>(r.handleError(o,s),n.runOutsideAngular(()=>n.onError.emit(s)),!1)})}function Uh(n){n._hasPendingMicrotasks||(n.shouldCoalesceEventChangeDetection||n.shouldCoalesceRunChangeDetection)&&n.callbackScheduled===!0?n.hasPendingMicrotasks=!0:n.hasPendingMicrotasks=!1}function Qb(n){n._nesting++,n.isStable&&(n.isStable=!1,n.onUnstable.emit(null))}function Jb(n){n._nesting--,Fp(n)}var ga=class{hasPendingMicrotasks=!1;hasPendingMacrotasks=!1;isStable=!0;onUnstable=new ne;onMicrotaskEmpty=new ne;onStable=new ne;onError=new ne;run(t,e,r){return t.apply(e,r)}runGuarded(t,e,r){return t.apply(e,r)}runOutsideAngular(t){return t()}runTask(t,e,r,i){return t.apply(e,r)}};function gM(n){return V_(n,"__ignore_ng_zone__")}function yM(n){return V_(n,"__scheduler_tick__")}function V_(n,t){return!Array.isArray(n)||n.length!==1?!1:n[0]?.data?.[t]===!0}var ln=class{_console=console;handleError(t){this._console.error("ERROR",t)}},Nn=new b("",{factory:()=>{let n=h(V),t=h(Se),e;return r=>{n.runOutsideAngular(()=>{t.destroyed&&!e?setTimeout(()=>{throw r}):(e??=t.get(ln),e.handleError(r))})}}}),U_={provide:zi,useValue:()=>{let n=h(ln,{optional:!0})},multi:!0},vM=new b("",{factory:()=>{let n=h(Q).defaultView;if(!n)return;let t=h(Nn),e=o=>{t(o.reason),o.preventDefault()},r=o=>{o.error?t(o.error):t(new Error(o.message,{cause:o})),o.preventDefault()},i=()=>{n.addEventListener("unhandledrejection",e),n.addEventListener("error",r)};typeof Zone<"u"?Zone.root.run(i):i(),h(Ke).onDestroy(()=>{n.removeEventListener("error",r),n.removeEventListener("unhandledrejection",e)})}});function Bp(){return li([c_(()=>{h(vM)})])}function Re(n,t){let[e,r,i]=lh(n,t?.equal),o=e,s=o[mt];return o.set=r,o.update=i,o.asReadonly=jp.bind(o),o}function jp(){let n=this[mt];if(n.readonlyFn===void 0){let t=()=>this();t[mt]=n,n.readonlyFn=t}return n.readonlyFn}var Ta=(()=>{class n{view;node;constructor(e,r){this.view=e,this.node=r}static __NG_ELEMENT_ID__=bM}return n})();function bM(){return new Ta($(),vt())}var oi=class{},Sa=new b("",{factory:()=>!0});var Vp=new b("");var du=(()=>{class n{static \u0275prov=y({token:n,providedIn:"root",factory:()=>new $h})}return n})(),$h=class{dirtyEffectCount=0;queues=new Map;add(t){this.enqueue(t),this.schedule(t)}schedule(t){t.dirty&&this.dirtyEffectCount++}remove(t){let e=t.zone,r=this.queues.get(e);r.has(t)&&(r.delete(t),t.dirty&&this.dirtyEffectCount--)}enqueue(t){let e=t.zone;this.queues.has(e)||this.queues.set(e,new Set);let r=this.queues.get(e);r.has(t)||r.add(t)}flush(){for(;this.dirtyEffectCount>0;){let t=!1;for(let[e,r]of this.queues)e===null?t||=this.flushQueue(r):t||=e.run(()=>this.flushQueue(r));t||(this.dirtyEffectCount=0)}}flushQueue(t){let e=!1;for(let r of t)r.dirty&&(this.dirtyEffectCount--,e=!0,r.run());return e}},Wc=class{[mt];constructor(t){this[mt]=t}destroy(){this[mt].destroy()}};function Ji(n,t){let e=t?.injector??h(re),r=t?.manualCleanup!==!0?e.get(Ke):null,i,o=e.get(Ta,null,{optional:!0}),s=e.get(oi);return o!==null?(i=EM(o.view,s,n),r instanceof Hc&&r._lView===o.view&&(r=null)):i=DM(n,e.get(du),s),i.injector=e,r!==null&&(i.onDestroyFns=[r.onDestroy(()=>i.destroy())]),new Wc(i)}var $_=Y(g({},uh),{cleanupFns:void 0,zone:null,onDestroyFns:null,run(){let n=pa(!1);try{dh(this)}finally{pa(n)}},cleanup(){if(!this.cleanupFns?.length)return;let n=O(null);try{for(;this.cleanupFns.length;)this.cleanupFns.pop()()}finally{this.cleanupFns=[],O(n)}}}),_M=Y(g({},$_),{consumerMarkedDirty(){this.scheduler.schedule(this),this.notifier.notify(12)},destroy(){if(ki(this),this.onDestroyFns!==null)for(let n of this.onDestroyFns)n();this.cleanup(),this.scheduler.remove(this)}}),CM=Y(g({},$_),{consumerMarkedDirty(){this.view[U]|=8192,Xi(this.view),this.notifier.notify(13)},destroy(){if(ki(this),this.onDestroyFns!==null)for(let n of this.onDestroyFns)n();this.cleanup(),this.view[ri]?.delete(this)}});function EM(n,t,e){let r=Object.create(CM);return r.view=n,r.zone=typeof Zone<"u"?Zone.current:null,r.notifier=t,r.fn=H_(r,e),n[ri]??=new Set,n[ri].add(r),r.consumerMarkedDirty(r),r}function DM(n,t,e){let r=Object.create(_M);return r.fn=H_(r,n),r.scheduler=t,r.notifier=e,r.zone=typeof Zone<"u"?Zone.current:null,r.scheduler.add(r),r.notifier.notify(12),r}function H_(n,t){return()=>{t(e=>(n.cleanupFns??=[]).push(e))}}function La(n){return{toString:n}.toString()}function AM(n){return typeof n=="function"}function bC(n,t,e,r){t!==null?t.applyValueToInputSignal(t,r):n[e]=r}var vu=class{previousValue;currentValue;firstChange;constructor(t,e,r){this.previousValue=t,this.currentValue=e,this.firstChange=r}isFirstChange(){return this.firstChange}},cr=(()=>{let n=()=>_C;return n.ngInherit=!0,n})();function _C(n){return n.type.prototype.ngOnChanges&&(n.setInput=OM),kM}function kM(){let n=EC(this),t=n?.current;if(t){let e=n.previous;if(e===ai)n.previous=t;else for(let r in t)e[r]=t[r];n.current=null,this.ngOnChanges(t)}}function OM(n,t,e,r,i){let o=this.declaredInputs[r],s=EC(n)||NM(n,{previous:ai,current:null}),a=s.current||(s.current={}),l=s.previous,c=l[o];a[o]=new vu(c&&c.currentValue,e,l===ai),bC(n,t,i,e)}var CC="__ngSimpleChanges__";function EC(n){return n[CC]||null}function NM(n,t){return n[CC]=t}var z_=[];var me=function(n,t=null,e){for(let r=0;r<z_.length;r++){let i=z_[r];i(n,t,e)}},ae=(function(n){return n[n.TemplateCreateStart=0]="TemplateCreateStart",n[n.TemplateCreateEnd=1]="TemplateCreateEnd",n[n.TemplateUpdateStart=2]="TemplateUpdateStart",n[n.TemplateUpdateEnd=3]="TemplateUpdateEnd",n[n.LifecycleHookStart=4]="LifecycleHookStart",n[n.LifecycleHookEnd=5]="LifecycleHookEnd",n[n.OutputStart=6]="OutputStart",n[n.OutputEnd=7]="OutputEnd",n[n.BootstrapApplicationStart=8]="BootstrapApplicationStart",n[n.BootstrapApplicationEnd=9]="BootstrapApplicationEnd",n[n.BootstrapComponentStart=10]="BootstrapComponentStart",n[n.BootstrapComponentEnd=11]="BootstrapComponentEnd",n[n.ChangeDetectionStart=12]="ChangeDetectionStart",n[n.ChangeDetectionEnd=13]="ChangeDetectionEnd",n[n.ChangeDetectionSyncStart=14]="ChangeDetectionSyncStart",n[n.ChangeDetectionSyncEnd=15]="ChangeDetectionSyncEnd",n[n.AfterRenderHooksStart=16]="AfterRenderHooksStart",n[n.AfterRenderHooksEnd=17]="AfterRenderHooksEnd",n[n.ComponentStart=18]="ComponentStart",n[n.ComponentEnd=19]="ComponentEnd",n[n.DeferBlockStateStart=20]="DeferBlockStateStart",n[n.DeferBlockStateEnd=21]="DeferBlockStateEnd",n[n.DynamicComponentStart=22]="DynamicComponentStart",n[n.DynamicComponentEnd=23]="DynamicComponentEnd",n[n.HostBindingsUpdateStart=24]="HostBindingsUpdateStart",n[n.HostBindingsUpdateEnd=25]="HostBindingsUpdateEnd",n})(ae||{});function PM(n,t,e){let{ngOnChanges:r,ngOnInit:i,ngDoCheck:o}=t.type.prototype;if(r){let s=_C(t);(e.preOrderHooks??=[]).push(n,s),(e.preOrderCheckHooks??=[]).push(n,s)}i&&(e.preOrderHooks??=[]).push(0-n,i),o&&((e.preOrderHooks??=[]).push(n,o),(e.preOrderCheckHooks??=[]).push(n,o))}function DC(n,t){for(let e=t.directiveStart,r=t.directiveEnd;e<r;e++){let o=n.data[e].type.prototype,{ngAfterContentInit:s,ngAfterContentChecked:a,ngAfterViewInit:l,ngAfterViewChecked:c,ngOnDestroy:u}=o;s&&(n.contentHooks??=[]).push(-e,s),a&&((n.contentHooks??=[]).push(e,a),(n.contentCheckHooks??=[]).push(e,a)),l&&(n.viewHooks??=[]).push(-e,l),c&&((n.viewHooks??=[]).push(e,c),(n.viewCheckHooks??=[]).push(e,c)),u!=null&&(n.destroyHooks??=[]).push(e,u)}}function hu(n,t,e){wC(n,t,3,e)}function pu(n,t,e,r){(n[U]&3)===e&&wC(n,t,e,r)}function Up(n,t){let e=n[U];(e&3)===t&&(e&=16383,e+=1,n[U]=e)}function wC(n,t,e,r){let i=r!==void 0?n[qi]&65535:0,o=r??-1,s=t.length-1,a=0;for(let l=i;l<s;l++)if(typeof t[l+1]=="number"){if(a=t[l],r!=null&&a>=r)break}else t[l]<0&&(n[qi]+=65536),(a<o||o==-1)&&(LM(n,e,t,l),n[qi]=(n[qi]&4294901760)+l+2),l++}function W_(n,t){me(ae.LifecycleHookStart,n,t);let e=O(null);try{t.call(n)}finally{O(e),me(ae.LifecycleHookEnd,n,t)}}function LM(n,t,e,r){let i=e[r]<0,o=e[r+1],s=i?-e[r]:e[r],a=n[s];i?n[U]>>14<n[qi]>>16&&(n[U]&3)===t&&(n[U]+=16384,W_(a,o)):W_(a,o)}var rs=-1,to=class{factory;name;injectImpl;resolving=!1;canSeeViewProviders;multi;componentProviders;index;providerFactory;constructor(t,e,r,i){this.factory=t,this.name=i,this.canSeeViewProviders=e,this.injectImpl=r}};function FM(n){return(n.flags&8)!==0}function BM(n){return(n.flags&16)!==0}function jM(n,t,e){let r=0;for(;r<e.length;){let i=e[r];if(typeof i=="number"){if(i!==0)break;r++;let o=e[r++],s=e[r++],a=e[r++];n.setAttribute(t,s,a,o)}else{let o=i,s=e[++r];UM(o)?n.setProperty(t,o,s):n.setAttribute(t,o,s),r++}}return r}function VM(n){return n===3||n===4||n===6}function UM(n){return n.charCodeAt(0)===64}function is(n,t){if(!(t===null||t.length===0))if(n===null||n.length===0)n=t.slice();else{let e=-1;for(let r=0;r<t.length;r++){let i=t[r];typeof i=="number"?e=i:e===0||(e===-1||e===2?G_(n,e,i,null,t[++r]):G_(n,e,i,null,null))}}return n}function G_(n,t,e,r,i){let o=0,s=n.length;if(t===-1)s=-1;else for(;o<n.length;){let a=n[o++];if(typeof a=="number"){if(a===t){s=-1;break}else if(a>t){s=o-1;break}}}for(;o<n.length;){let a=n[o];if(typeof a=="number")break;if(a===e){i!==null&&(n[o+1]=i);return}o++,i!==null&&o++}s!==-1&&(n.splice(s,0,t),o=s+1),n.splice(o++,0,e),i!==null&&n.splice(o++,0,i)}function TC(n){return n!==rs}function bu(n){return n&32767}function $M(n){return n>>16}function _u(n,t){let e=$M(n),r=t;for(;e>0;)r=r[Gi],e--;return r}var Qp=!0;function Cu(n){let t=Qp;return Qp=n,t}var HM=256,SC=HM-1,IC=5,zM=0,sr={};function WM(n,t,e){let r;typeof e=="string"?r=e.charCodeAt(0)||0:e.hasOwnProperty(Hi)&&(r=e[Hi]),r==null&&(r=e[Hi]=zM++);let i=r&SC,o=1<<i;t.data[n+(i>>IC)]|=o}function Eu(n,t){let e=MC(n,t);if(e!==-1)return e;let r=t[L];r.firstCreatePass&&(n.injectorIndex=t.length,$p(r.data,n),$p(t,null),$p(r.blueprint,null));let i=Mm(n,t),o=n.injectorIndex;if(TC(i)){let s=bu(i),a=_u(i,t),l=a[L].data;for(let c=0;c<8;c++)t[o+c]=a[s+c]|l[s+c]}return t[o+8]=i,o}function $p(n,t){n.push(0,0,0,0,0,0,0,0,t)}function MC(n,t){return n.injectorIndex===-1||n.parent&&n.parent.injectorIndex===n.injectorIndex||t[n.injectorIndex+8]===null?-1:n.injectorIndex}function Mm(n,t){if(n.parent&&n.parent.injectorIndex!==-1)return n.parent.injectorIndex;let e=0,r=null,i=t;for(;i!==null;){if(r=OC(i),r===null)return rs;if(e++,i=i[Gi],r.injectorIndex!==-1)return r.injectorIndex|e<<16}return rs}function Jp(n,t,e){WM(n,t,e)}function xC(n,t,e){if(e&8||n!==void 0)return n;Yc(t,"NodeInjector")}function RC(n,t,e,r){if(e&8&&r===void 0&&(r=null),(e&3)===0){let i=n[xr],o=It(void 0);try{return i?i.get(t,r,e&8):tp(t,r,e&8)}finally{It(o)}}return xC(r,t,e)}function AC(n,t,e,r=0,i){if(n!==null){if(t[U]&2048&&!(r&2)){let s=YM(n,t,e,r,sr);if(s!==sr)return s}let o=kC(n,t,e,r,sr);if(o!==sr)return o}return RC(t,e,r,i)}function kC(n,t,e,r,i){let o=qM(e);if(typeof o=="function"){if(!kp(t,n,r))return r&1?xC(i,e,r):RC(t,e,r,i);try{let s;if(s=o(r),s==null&&!(r&8))Yc(e);else return s}finally{Op()}}else if(typeof o=="number"){let s=null,a=MC(n,t),l=rs,c=r&1?t[Rt][xt]:null;for((a===-1||r&4)&&(l=a===-1?Mm(n,t):t[a+8],l===rs||!K_(r,!1)?a=-1:(s=t[L],a=bu(l),t=_u(l,t)));a!==-1;){let u=t[L];if(q_(o,a,u.data)){let d=GM(a,t,e,s,r,c);if(d!==sr)return d}l=t[a+8],l!==rs&&K_(r,t[L].data[a+8]===c)&&q_(o,a,t)?(s=u,a=bu(l),t=_u(l,t)):a=-1}}return i}function GM(n,t,e,r,i,o){let s=t[L],a=s.data[n+8],l=r==null?ir(a)&&Qp:r!=s&&(a.type&3)!==0,c=i&1&&o===a,u=mu(a,s,e,l,c);return u!==null?Aa(t,s,u,a,i):sr}function mu(n,t,e,r,i){let o=n.providerIndexes,s=t.data,a=o&1048575,l=n.directiveStart,c=n.directiveEnd,u=o>>20,d=r?a:a+u,f=i?a+u:c;for(let p=d;p<f;p++){let m=s[p];if(p<l&&e===m||p>=l&&m.type===e)return p}if(i){let p=s[l];if(p&&or(p)&&p.type===e)return l}return null}function Aa(n,t,e,r,i){let o=n[e],s=t.data;if(o instanceof to){let a=o;if(a.resolving)throw ep("");let l=Cu(a.canSeeViewProviders);a.resolving=!0;let c=s[e].type||s[e],u,d=a.injectImpl?It(a.injectImpl):null,f=kp(n,r,0);try{o=n[e]=a.factory(void 0,i,s,n,r),t.firstCreatePass&&e>=r.directiveStart&&PM(e,s[e],t)}finally{d!==null&&It(d),Cu(l),a.resolving=!1,Op()}}return o}function qM(n){if(typeof n=="string")return n.charCodeAt(0)||0;let t=n.hasOwnProperty(Hi)?n[Hi]:void 0;return typeof t=="number"?t>=0?t&SC:KM:t}function q_(n,t,e){let r=1<<n;return!!(e[t+(n>>IC)]&r)}function K_(n,t){return!(n&2)&&!(n&1&&t)}var eo=class{_tNode;_lView;constructor(t,e){this._tNode=t,this._lView=e}get(t,e,r){return AC(this._tNode,this._lView,t,ji(r),e)}};function KM(){return new eo(vt(),$())}function hn(n){return La(()=>{let t=n.prototype.constructor,e=t[fa]||em(t),r=Object.prototype,i=Object.getPrototypeOf(n.prototype).constructor;for(;i&&i!==r;){let o=i[fa]||em(i);if(o&&o!==e)return o;i=Object.getPrototypeOf(i)}return o=>new o})}function em(n){return zh(n)?()=>{let t=em(at(n));return t&&t()}:ni(n)}function YM(n,t,e,r,i){let o=n,s=t;for(;o!==null&&s!==null&&s[U]&2048&&!es(s);){let a=kC(o,s,e,r|2,sr);if(a!==sr)return a;let l=o.parent;if(!l){let c=s[cp];if(c){let u=c.get(e,sr,r&-5);if(u!==sr)return u}l=OC(s),s=s[Gi]}o=l}return i}function OC(n){let t=n[L],e=t.type;return e===2?t.declTNode:e===1?n[xt]:null}function ZM(){return cs(vt(),$())}function cs(n,t){return new le(dn(n,t))}var le=(()=>{class n{nativeElement;constructor(e){this.nativeElement=e}static __NG_ELEMENT_ID__=ZM}return n})();function XM(n){return n instanceof le?n.nativeElement:n}function QM(){return this._results[Symbol.iterator]()}var Or=class{_emitDistinctChangesOnly;dirty=!0;_onDirty=void 0;_results=[];_changesDetected=!1;_changes=void 0;length=0;first=void 0;last=void 0;get changes(){return this._changes??=new C}constructor(t=!1){this._emitDistinctChangesOnly=t}get(t){return this._results[t]}map(t){return this._results.map(t)}filter(t){return this._results.filter(t)}find(t){return this._results.find(t)}reduce(t,e){return this._results.reduce(t,e)}forEach(t){this._results.forEach(t)}some(t){return this._results.some(t)}toArray(){return this._results.slice()}toString(){return this._results.toString()}reset(t,e){this.dirty=!1;let r=s_(t);(this._changesDetected=!o_(this._results,r,e))&&(this._results=r,this.length=r.length,this.last=r[this.length-1],this.first=r[0])}notifyOnChanges(){this._changes!==void 0&&(this._changesDetected||!this._emitDistinctChangesOnly)&&this._changes.next(this)}onDirty(t){this._onDirty=t}setDirty(){this.dirty=!0,this._onDirty?.()}destroy(){this._changes!==void 0&&(this._changes.complete(),this._changes.unsubscribe())}[Symbol.iterator]=QM};function NC(n){return(n.flags&128)===128}var xm=(function(n){return n[n.OnPush=0]="OnPush",n[n.Eager=1]="Eager",n[n.Default=1]="Default",n})(xm||{}),PC=new Map,JM=0;function e0(){return JM++}function t0(n){PC.set(n[Rr],n)}function tm(n){PC.delete(n[Rr])}var Y_="__ngContext__";function os(n,t){Ar(t)?(n[Y_]=t[Rr],t0(t)):n[Y_]=t}function LC(n){return BC(n[Jo])}function FC(n){return BC(n[cn])}function BC(n){for(;n!==null&&!On(n);)n=n[cn];return n}var n0;function Rm(n){n0=n}var mi=new b("",{factory:()=>r0}),r0="ng";var Lu=new b(""),oo=new b("",{providedIn:"platform",factory:()=>"unknown"}),Fa=new b(""),us=new b("",{factory:()=>h(Q).body?.querySelector("[ngCspNonce]")?.getAttribute("ngCspNonce")||null});var jC="r";var VC="di";var UC=!1,$C=new b("",{factory:()=>UC});var Z_=new WeakMap;function i0(n,t){if(n==null||typeof n!="object")return;let e=Z_.get(n);e||(e=new WeakSet,Z_.set(n,e)),e.add(t)}var o0=(n,t,e,r)=>{};function s0(n,t,e,r){o0(n,t,e,r)}function Fu(n){return(n.flags&32)===32}var a0=()=>null;function HC(n,t,e=!1){return a0(n,t,e)}function zC(n,t){let e=n.contentQueries;if(e!==null){let r=O(null);try{for(let i=0;i<e.length;i+=2){let o=e[i],s=e[i+1];if(s!==-1){let a=n.data[s];ou(o),a.contentQueries(2,t[s],s)}}}finally{O(r)}}}function nm(n,t,e){ou(0);let r=O(null);try{t(n,e)}finally{O(r)}}function WC(n,t,e){if(dp(t)){let r=O(null);try{let i=t.directiveStart,o=t.directiveEnd;for(let s=i;s<o;s++){let a=n.data[s];if(a.contentQueries){let l=e[s];a.contentQueries(1,l,s)}}}finally{O(r)}}}var Fn=(function(n){return n[n.Emulated=0]="Emulated",n[n.None=2]="None",n[n.ShadowDom=3]="ShadowDom",n[n.ExperimentalIsolatedShadowDom=4]="ExperimentalIsolatedShadowDom",n})(Fn||{});var rm=class{changingThisBreaksApplicationSecurity;constructor(t){this.changingThisBreaksApplicationSecurity=t}toString(){return`SafeValue must use [property]=binding: ${this.changingThisBreaksApplicationSecurity} (see ${Hh})`}};function Am(n){return n instanceof rm?n.changingThisBreaksApplicationSecurity:n}function l0(n,t){return n.createText(t)}function c0(n,t,e){n.setValue(t,e)}function GC(n,t,e){return n.createElement(t,e)}function Du(n,t,e,r,i){n.insertBefore(t,e,r,i)}function qC(n,t,e){n.appendChild(t,e)}function X_(n,t,e,r,i){r!==null?Du(n,t,e,r,i):qC(n,t,e)}function KC(n,t,e,r){n.removeChild(null,t,e,r)}function u0(n,t,e){n.setAttribute(t,"style",e)}function d0(n,t,e){e===""?n.removeAttribute(t,"class"):n.setAttribute(t,"class",e)}function YC(n,t,e){let{mergedAttrs:r,classes:i,styles:o}=e;r!==null&&jM(n,t,r),i!==null&&d0(n,t,i),o!==null&&u0(n,t,o)}function ZC(n){return n instanceof Function?n():n}function f0(n,t,e){let r=n.length;for(;;){let i=n.indexOf(t,e);if(i===-1)return i;if(i===0||n.charCodeAt(i-1)<=32){let o=t.length;if(i+o===r||n.charCodeAt(i+o)<=32)return i}e=i+1}}var XC="ng-template";function h0(n,t,e,r){let i=0;if(r){for(;i<t.length&&typeof t[i]=="string";i+=2)if(t[i]==="class"&&f0(t[i+1].toLowerCase(),e,0)!==-1)return!0}else if(km(n))return!1;if(i=t.indexOf(1,i),i>-1){let o;for(;++i<t.length&&typeof(o=t[i])=="string";)if(o.toLowerCase()===e)return!0}return!1}function km(n){return n.type===4&&n.value!==XC}function p0(n,t,e){let r=n.type===4&&!e?XC:n.value;return t===r}function m0(n,t,e){let r=4,i=n.attrs,o=i!==null?v0(i):0,s=!1;for(let a=0;a<t.length;a++){let l=t[a];if(typeof l=="number"){if(!s&&!Pn(r)&&!Pn(l))return!1;if(s&&Pn(l))continue;s=!1,r=l|r&1;continue}if(!s)if(r&4){if(r=2|r&1,l!==""&&!p0(n,l,e)||l===""&&t.length===1){if(Pn(r))return!1;s=!0}}else if(r&8){if(i===null||!h0(n,i,l,e)){if(Pn(r))return!1;s=!0}}else{let c=t[++a],u=g0(l,i,km(n),e);if(u===-1){if(Pn(r))return!1;s=!0;continue}if(c!==""){let d;if(u>o?d="":d=i[u+1].toLowerCase(),r&2&&c!==d){if(Pn(r))return!1;s=!0}}}}return Pn(r)||s}function Pn(n){return(n&1)===0}function g0(n,t,e,r){if(t===null)return-1;let i=0;if(r||!e){let o=!1;for(;i<t.length;){let s=t[i];if(s===n)return i;if(s===3||s===6)o=!0;else if(s===1||s===2){let a=t[++i];for(;typeof a=="string";)a=t[++i];continue}else{if(s===4)break;if(s===0){i+=4;continue}}i+=o?1:2}return-1}else return b0(t,n)}function QC(n,t,e=!1){for(let r=0;r<t.length;r++)if(m0(n,t[r],e))return!0;return!1}function y0(n){let t=n.attrs;if(t!=null){let e=t.indexOf(5);if((e&1)===0)return t[e+1]}return null}function v0(n){for(let t=0;t<n.length;t++){let e=n[t];if(VM(e))return t}return n.length}function b0(n,t){let e=n.indexOf(4);if(e>-1)for(e++;e<n.length;){let r=n[e];if(typeof r=="number")return-1;if(r===t)return e;e++}return-1}function _0(n,t){e:for(let e=0;e<t.length;e++){let r=t[e];if(n.length===r.length){for(let i=0;i<n.length;i++)if(n[i]!==r[i])continue e;return!0}}return!1}function Q_(n,t){return n?":not("+t.trim()+")":t}function C0(n){let t=n[0],e=1,r=2,i="",o=!1;for(;e<n.length;){let s=n[e];if(typeof s=="string")if(r&2){let a=n[++e];i+="["+s+(a.length>0?'="'+a+'"':"")+"]"}else r&8?i+="."+s:r&4&&(i+=" "+s);else i!==""&&!Pn(s)&&(t+=Q_(o,i),i=""),r=s,o=o||!Pn(r);e++}return i!==""&&(t+=Q_(o,i)),t}function E0(n){return n.map(C0).join(",")}function D0(n){let t=[],e=[],r=1,i=2;for(;r<n.length;){let o=n[r];if(typeof o=="string")i===2?o!==""&&t.push(o,n[++r]):i===8&&e.push(o);else{if(!Pn(i))break;i=o}r++}return e.length&&t.push(1,...e),t}var pn={};function Om(n,t,e,r,i,o,s,a,l,c,u){let d=xe+r,f=d+i,p=w0(d,f),m=typeof c=="function"?c():c;return p[L]={type:n,blueprint:p,template:e,queries:null,viewQuery:a,declTNode:t,data:p.slice().fill(null,d),bindingStartIndex:d,expandoStartIndex:f,hostBindingOpCodes:null,firstCreatePass:!0,firstUpdatePass:!0,staticViewQueries:!1,staticContentQueries:!1,preOrderHooks:null,preOrderCheckHooks:null,contentHooks:null,contentCheckHooks:null,viewHooks:null,viewCheckHooks:null,destroyHooks:null,cleanup:null,contentQueries:null,components:null,directiveRegistry:typeof o=="function"?o():o,pipeRegistry:typeof s=="function"?s():s,firstChild:null,schemas:l,consts:m,incompleteFirstPass:!1,ssrId:u}}function w0(n,t){let e=[];for(let r=0;r<t;r++)e.push(r<n?null:pn);return e}function T0(n){let t=n.tView;return t===null||t.incompleteFirstPass?n.tView=Om(1,null,n.template,n.decls,n.vars,n.directiveDefs,n.pipeDefs,n.viewQuery,n.schemas,n.consts,n.id):t}function Nm(n,t,e,r,i,o,s,a,l,c,u){let d=t.blueprint.slice();return d[kn]=i,d[U]=r|4|128|8|64|1024,(c!==null||n&&n[U]&2048)&&(d[U]|=2048),mp(d),d[Qe]=d[Gi]=n,d[He]=e,d[nr]=s||n&&n[nr],d[Ie]=a||n&&n[Ie],d[xr]=l||n&&n[xr]||null,d[xt]=o,d[Rr]=e0(),d[Wi]=u,d[cp]=c,d[Rt]=t.type==2?n[Rt]:d,d}function S0(n,t,e){let r=dn(t,n),i=T0(e),o=n[nr].rendererFactory,s=Pm(n,Nm(n,i,null,JC(e),r,t,null,o.createRenderer(r,e),null,null,null));return n[t.index]=s}function JC(n){let t=16;return n.signals?t=4096:n.onPush&&(t=64),t}function eE(n,t,e,r){if(e===0)return-1;let i=t.length;for(let o=0;o<e;o++)t.push(r),n.blueprint.push(r),n.data.push(null);return i}function Pm(n,t){return n[Jo]?n[lp][cn]=t:n[Jo]=t,n[lp]=t,t}function P(n=1){tE(ke(),$(),kr()+n,!1)}function tE(n,t,e,r){if(!r)if((t[U]&3)===3){let o=n.preOrderCheckHooks;o!==null&&hu(t,o,e)}else{let o=n.preOrderHooks;o!==null&&pu(t,o,0,e)}fi(e)}var Bu=(function(n){return n[n.None=0]="None",n[n.SignalBased=1]="SignalBased",n[n.HasDecoratorInputTransform=2]="HasDecoratorInputTransform",n})(Bu||{});function im(n,t,e,r){let i=O(null);try{let[o,s,a]=n.inputs[e],l=null;(s&Bu.SignalBased)!==0&&(l=t[o][mt]),l!==null&&l.transformFn!==void 0?r=l.transformFn(r):a!==null&&(r=a.call(t,r)),n.setInput!==null?n.setInput(t,l,r,e,o):bC(t,l,o,r)}finally{O(i)}}var ar=(function(n){return n[n.Important=1]="Important",n[n.DashCase=2]="DashCase",n})(ar||{}),I0;function Lm(n,t){return I0(n,t)}var j2=typeof document<"u"&&typeof document?.documentElement?.getAnimations=="function";var om=new WeakMap,Ma=new WeakSet;function M0(n,t){let e=om.get(n);if(!e||e.length===0)return;let r=t.parentNode,i=t.previousSibling;for(let o=e.length-1;o>=0;o--){let s=e[o],a=s.parentNode;s===t?(e.splice(o,1),Ma.add(s),s.dispatchEvent(new CustomEvent("animationend",{detail:{cancel:!0}}))):(i&&s===i||a&&r&&a!==r)&&(e.splice(o,1),s.dispatchEvent(new CustomEvent("animationend",{detail:{cancel:!0}})),s.parentNode?.removeChild(s))}}function x0(n,t){let e=om.get(n);e?e.includes(t)||e.push(t):om.set(n,[t])}var no=new Set,ju=(function(n){return n[n.CHANGE_DETECTION=0]="CHANGE_DETECTION",n[n.AFTER_NEXT_RENDER=1]="AFTER_NEXT_RENDER",n})(ju||{}),gi=new b(""),J_=new Set;function Nr(n){J_.has(n)||(J_.add(n),performance?.mark?.("mark_feature_usage",{detail:{feature:n}}))}var Fm=(()=>{class n{impl=null;execute(){this.impl?.execute()}static \u0275prov=y({token:n,providedIn:"root",factory:()=>new n})}return n})(),nE=[0,1,2,3],rE=(()=>{class n{ngZone=h(V);scheduler=h(oi);errorHandler=h(ln,{optional:!0});sequences=new Set;deferredRegistrations=new Set;executing=!1;constructor(){h(gi,{optional:!0})}execute(){let e=this.sequences.size>0;e&&me(ae.AfterRenderHooksStart),this.executing=!0;for(let r of nE)for(let i of this.sequences)if(!(i.erroredOrDestroyed||!i.hooks[r]))try{i.pipelinedValue=this.ngZone.runOutsideAngular(()=>this.maybeTrace(()=>{let o=i.hooks[r];return o(i.pipelinedValue)},i.snapshot))}catch(o){i.erroredOrDestroyed=!0,this.errorHandler?.handleError(o)}this.executing=!1;for(let r of this.sequences)r.afterRun(),r.once&&(this.sequences.delete(r),r.destroy());for(let r of this.deferredRegistrations)this.sequences.add(r);this.deferredRegistrations.size>0&&this.scheduler.notify(7),this.deferredRegistrations.clear(),e&&me(ae.AfterRenderHooksEnd)}register(e){let{view:r}=e;r!==void 0?((r[Ki]??=[]).push(e),Xi(r),r[U]|=8192):this.executing?this.deferredRegistrations.add(e):this.addSequence(e)}addSequence(e){this.sequences.add(e),this.scheduler.notify(7)}unregister(e){this.executing&&this.sequences.has(e)?(e.erroredOrDestroyed=!0,e.pipelinedValue=void 0,e.once=!0):(this.sequences.delete(e),this.deferredRegistrations.delete(e))}maybeTrace(e,r){return r?r.run(ju.AFTER_NEXT_RENDER,e):e()}static \u0275prov=y({token:n,providedIn:"root",factory:()=>new n})}return n})(),wu=class{impl;hooks;view;once;snapshot;erroredOrDestroyed=!1;pipelinedValue=void 0;unregisterOnDestroy;constructor(t,e,r,i,o,s=null){this.impl=t,this.hooks=e,this.view=r,this.once=i,this.snapshot=s,this.unregisterOnDestroy=o?.onDestroy(()=>this.destroy())}afterRun(){this.erroredOrDestroyed=!1,this.pipelinedValue=void 0,this.snapshot?.dispose(),this.snapshot=null}destroy(){this.impl.unregister(this),this.unregisterOnDestroy?.();let t=this.view?.[Ki];t&&(this.view[Ki]=t.filter(e=>e!==this))}};function _t(n,t){let e=t?.injector??h(re);return Nr("NgAfterNextRender"),A0(n,e,t,!0)}function R0(n){return n instanceof Function?[void 0,void 0,n,void 0]:[n.earlyRead,n.write,n.mixedReadWrite,n.read]}function A0(n,t,e,r){let i=t.get(Fm);i.impl??=t.get(rE);let o=t.get(gi,null,{optional:!0}),s=e?.manualCleanup!==!0?t.get(Ke):null,a=t.get(Ta,null,{optional:!0}),l=new wu(i.impl,R0(n),a?.view,r,s,o?.snapshot(null));return i.impl.register(l),l}var iE=new b("",{factory:()=>({queue:new Set,isScheduled:!1,scheduler:null,injector:h(Se)})});function oE(n,t,e){let r=n.get(iE);if(Array.isArray(t))for(let i of t)r.queue.add(i),e?.detachedLeaveAnimationFns?.push(i);else r.queue.add(t),e?.detachedLeaveAnimationFns?.push(t);r.scheduler&&r.scheduler(n)}function k0(n,t){let e=n.get(iE);if(t.detachedLeaveAnimationFns){for(let r of t.detachedLeaveAnimationFns)e.queue.delete(r);t.detachedLeaveAnimationFns=void 0}}function O0(n,t){for(let[e,r]of t)oE(n,r.animateFns)}function eC(n,t,e,r){let i=n?.[ui]?.enter;t!==null&&i&&i.has(e.index)&&O0(r,i)}function ns(n,t,e,r,i,o,s,a){if(i!=null){let l,c=!1;On(i)?l=i:Ar(i)&&(c=!0,i=i[kn]);let u=un(i);n===0&&r!==null?(eC(a,r,o,e),s==null?qC(t,r,u):Du(t,r,u,s||null,!0)):n===1&&r!==null?(eC(a,r,o,e),Du(t,r,u,s||null,!0),M0(o,u)):n===2?(a?.[ui]?.leave?.has(o.index)&&x0(o,u),Ma.delete(u),tC(a,o,e,d=>{if(Ma.has(u)){Ma.delete(u);return}KC(t,u,c,d)})):n===3&&(Ma.delete(u),tC(a,o,e,()=>{t.destroyNode(u)})),l!=null&&z0(t,n,e,l,o,r,s)}}function N0(n,t){sE(n,t),t[kn]=null,t[xt]=null}function P0(n,t,e,r,i,o){r[kn]=i,r[xt]=t,Uu(n,r,e,1,i,o)}function sE(n,t){t[nr].changeDetectionScheduler?.notify(9),Uu(n,t,t[Ie],2,null,null)}function L0(n){let t=n[Jo];if(!t)return Hp(n[L],n);for(;t;){let e=null;if(Ar(t))e=t[Jo];else{let r=t[je];r&&(e=r)}if(!e){for(;t&&!t[cn]&&t!==n;)Ar(t)&&Hp(t[L],t),t=t[Qe];t===null&&(t=n),Ar(t)&&Hp(t[L],t),e=t&&t[cn]}t=e}}function Bm(n,t){let e=n[Yi],r=e.indexOf(t);e.splice(r,1)}function Vu(n,t){if(Zi(t))return;let e=t[Ie];e.destroyNode&&Uu(n,t,e,3,null,null),L0(t)}function Hp(n,t){if(Zi(t))return;let e=O(null);try{t[U]&=-129,t[U]|=256,t[Xt]&&ki(t[Xt]),j0(n,t),B0(n,t),t[L].type===1&&t[Ie].destroy();let r=t[ci];if(r!==null&&On(t[Qe])){r!==t[Qe]&&Bm(r,t);let i=t[rr];i!==null&&i.detachView(n)}tm(t)}finally{O(e)}}function tC(n,t,e,r){let i=n?.[ui];if(i==null||i.leave==null||!i.leave.has(t.index))return r(!1);n&&no.add(n[Rr]),oE(e,()=>{if(i.leave&&i.leave.has(t.index)){let s=i.leave.get(t.index),a=[];if(s){for(let l=0;l<s.animateFns.length;l++){let c=s.animateFns[l],{promise:u}=c();a.push(u)}i.detachedLeaveAnimationFns=void 0}i.running=Promise.allSettled(a),F0(n,r)}else n&&no.delete(n[Rr]),r(!1)},i)}function F0(n,t){let e=n[ui]?.running;if(e){e.then(()=>{n[ui].running=void 0,no.delete(n[Rr]),t(!0)});return}t(!1)}function B0(n,t){let e=n.cleanup,r=t[Qo];if(e!==null)for(let s=0;s<e.length-1;s+=2)if(typeof e[s]=="string"){let a=e[s+3];a>=0?r[a]():r[-a].unsubscribe(),s+=2}else{let a=r[e[s+1]];e[s].call(a)}r!==null&&(t[Qo]=null);let i=t[Ir];if(i!==null){t[Ir]=null;for(let s=0;s<i.length;s++){let a=i[s];a()}}let o=t[ri];if(o!==null){t[ri]=null;for(let s of o)s.destroy()}}function j0(n,t){let e;if(n!=null&&(e=n.destroyHooks)!=null)for(let r=0;r<e.length;r+=2){let i=t[e[r]];if(!(i instanceof to)){let o=e[r+1];if(Array.isArray(o))for(let s=0;s<o.length;s+=2){let a=i[o[s]],l=o[s+1];me(ae.LifecycleHookStart,a,l);try{l.call(a)}finally{me(ae.LifecycleHookEnd,a,l)}}else{me(ae.LifecycleHookStart,i,o);try{o.call(i)}finally{me(ae.LifecycleHookEnd,i,o)}}}}}function aE(n,t,e){return V0(n,t.parent,e)}function V0(n,t,e){let r=t;for(;r!==null&&r.type&168;)t=r,r=t.parent;if(r===null)return e[kn];if(ir(r)){let{encapsulation:i}=n.data[r.directiveStart+r.componentOffset];if(i===Fn.None||i===Fn.Emulated)return null}return dn(r,e)}function lE(n,t,e){return $0(n,t,e)}function U0(n,t,e){return n.type&40?dn(n,e):null}var $0=U0,nC;function jm(n,t,e,r){let i=aE(n,r,t),o=t[Ie],s=r.parent||t[xt],a=lE(s,r,t);if(i!=null)if(Array.isArray(e))for(let l=0;l<e.length;l++)X_(o,i,e[l],a,!1);else X_(o,i,e,a,!1);nC!==void 0&&nC(o,r,t,e,i)}function xa(n,t){if(t!==null){let e=t.type;if(e&3)return dn(t,n);if(e&4)return sm(-1,n[t.index]);if(e&8){let r=t.child;if(r!==null)return xa(n,r);{let i=n[t.index];return On(i)?sm(-1,i):un(i)}}else{if(e&128)return xa(n,t.next);if(e&32)return Lm(t,n)()||un(n[t.index]);{let r=cE(n,t);if(r!==null){if(Array.isArray(r))return r[0];let i=ii(n[Rt]);return xa(i,r)}else return xa(n,t.next)}}}return null}function cE(n,t){if(t!==null){let r=n[Rt][xt],i=t.projection;return r.projection[i]}return null}function sm(n,t){let e=je+n+1;if(e<t.length){let r=t[e],i=r[L].firstChild;if(i!==null)return xa(r,i)}return t[di]}function Vm(n,t,e,r,i,o,s){for(;e!=null;){let a=r[xr];if(e.type===128){e=e.next;continue}let l=r[e.index],c=e.type;if(s&&t===0&&(l&&os(un(l),r),e.flags|=2),!Fu(e))if(c&8)Vm(n,t,e.child,r,i,o,!1),ns(t,n,a,i,l,e,o,r);else if(c&32){let u=Lm(e,r),d;for(;d=u();)ns(t,n,a,i,d,e,o,r);ns(t,n,a,i,l,e,o,r)}else c&16?uE(n,t,r,e,i,o):ns(t,n,a,i,l,e,o,r);e=s?e.projectionNext:e.next}}function Uu(n,t,e,r,i,o){Vm(e,r,n.firstChild,t,i,o,!1)}function H0(n,t,e){let r=t[Ie],i=aE(n,e,t),o=e.parent||t[xt],s=lE(o,e,t);uE(r,0,t,e,i,s)}function uE(n,t,e,r,i,o){let s=e[Rt],l=s[xt].projection[r.projection];if(Array.isArray(l))for(let c=0;c<l.length;c++){let u=l[c];ns(t,n,e[xr],i,u,r,o,e)}else{let c=l,u=s[Qe];NC(r)&&(c.flags|=128),Vm(n,t,c,u,i,o,!0)}}function z0(n,t,e,r,i,o,s){let a=r[di],l=un(r);a!==l&&ns(t,n,e,o,a,i,s);for(let c=je;c<r.length;c++){let u=r[c];Uu(u[L],u,n,t,o,a)}}function W0(n,t,e,r,i){if(t)i?n.addClass(e,r):n.removeClass(e,r);else{let o=r.indexOf("-")===-1?void 0:ar.DashCase;i==null?n.removeStyle(e,r,o):(typeof i=="string"&&i.endsWith("!important")&&(i=i.slice(0,-10),o|=ar.Important),n.setStyle(e,r,i,o))}}function dE(n,t,e,r,i){let o=kr(),s=r&2;try{fi(-1),s&&t.length>xe&&tE(n,t,xe,!1);let a=s?ae.TemplateUpdateStart:ae.TemplateCreateStart;me(a,i,e),e(r,i)}finally{fi(o);let a=s?ae.TemplateUpdateEnd:ae.TemplateCreateEnd;me(a,i,e)}}function Um(n,t,e){Q0(n,t,e),(e.flags&64)===64&&J0(n,t,e)}function $u(n,t,e=dn){let r=t.localNames;if(r!==null){let i=t.index+1;for(let o=0;o<r.length;o+=2){let s=r[o+1],a=s===-1?e(t,n):n[s];n[i++]=a}}}function G0(n,t,e,r){let o=r.get($C,UC)||e===Fn.ShadowDom||e===Fn.ExperimentalIsolatedShadowDom,s=n.selectRootElement(t,o);return q0(s),s}function q0(n){K0(n)}var K0=()=>null;function Y0(n){return n==="class"?"className":n==="for"?"htmlFor":n==="formaction"?"formAction":n==="innerHtml"?"innerHTML":n==="readonly"?"readOnly":n==="tabindex"?"tabIndex":n}function Z0(n,t,e,r,i,o){let s=t[L];if(Hu(n,s,t,e,r)){ir(n)&&fE(t,n.index);return}n.type&3&&(e=Y0(e)),X0(n,t,e,r,i,o)}function X0(n,t,e,r,i,o){if(n.type&3){let s=dn(n,t);r=o!=null?o(r,n.value||"",e):r,i.setProperty(s,e,r)}else n.type&12}function fE(n,t){let e=fn(t,n);e[U]&16||(e[U]|=64)}function Q0(n,t,e){let r=e.directiveStart,i=e.directiveEnd;ir(e)&&S0(t,e,n.data[r+e.componentOffset]),n.firstCreatePass||Eu(e,t);let o=e.initialInputs;for(let s=r;s<i;s++){let a=n.data[s],l=Aa(t,n,s,e);if(os(l,t),o!==null&&nx(t,s-r,l,a,e,o),or(a)){let c=fn(e.index,t);c[He]=Aa(t,n,s,e)}}}function J0(n,t,e){let r=e.directiveStart,i=e.directiveEnd,o=e.index,s=x_();try{fi(o);for(let a=r;a<i;a++){let l=n.data[a],c=t[a];iu(a),(l.hostBindings!==null||l.hostVars!==0||l.hostAttrs!==null)&&ex(l,c)}}finally{fi(-1),iu(s)}}function ex(n,t){n.hostBindings!==null&&n.hostBindings(1,t)}function hE(n,t){let e=n.directiveRegistry,r=null;if(e)for(let i=0;i<e.length;i++){let o=e[i];QC(t,o.selectors,!1)&&(r??=[],or(o)?r.unshift(o):r.push(o))}return r}function tx(n,t,e,r,i,o){let s=dn(n,t);pE(t[Ie],s,o,n.value,e,r,i)}function pE(n,t,e,r,i,o,s){if(o==null)n.removeAttribute(t,i,e);else{let a=s==null?Jh(o):s(o,r||"",i);n.setAttribute(t,i,a,e)}}function nx(n,t,e,r,i,o){let s=o[t];if(s!==null)for(let a=0;a<s.length;a+=2){let l=s[a],c=s[a+1];im(r,e,l,c)}}function mE(n,t,e,r,i){let o=xe+e,s=t[L],a=i(s,t,n,r,e);t[o]=a,ts(n,!0);let l=n.type===2;return l?(YC(t[Ie],a,n),(E_()===0||Ea(n))&&os(a,t),D_()):os(a,t),cu()&&(!l||!Fu(n))&&jm(s,t,a,n),n}function gE(n){let t=n;return Sp()?Ip():(t=t.parent,ts(t,!1)),t}function rx(n,t){let e=n[xr];if(!e)return;let r;try{r=e.get(Nn,null)}catch{r=null}r?.(t)}function Hu(n,t,e,r,i){let o=n.inputs?.[r],s=n.hostDirectiveInputs?.[r],a=!1;if(s)for(let l=0;l<s.length;l+=2){let c=s[l],u=s[l+1],d=t.data[c];im(d,e[c],u,i),a=!0}if(o)for(let l of o){let c=e[l],u=t.data[l];im(u,c,r,i),a=!0}return a}function ix(n,t){let e=fn(t,n),r=e[L];ox(r,e);let i=e[kn];i!==null&&e[Wi]===null&&(e[Wi]=HC(i,e[xr])),me(ae.ComponentStart);try{$m(r,e,e[He])}finally{me(ae.ComponentEnd,e[He])}}function ox(n,t){for(let e=t.length;e<n.blueprint.length;e++)t.push(n.blueprint[e])}function $m(n,t,e){su(t);try{let r=n.viewQuery;r!==null&&nm(1,r,e);let i=n.template;i!==null&&dE(n,t,i,1,e),n.firstCreatePass&&(n.firstCreatePass=!1),t[rr]?.finishViewCreation(n),n.staticContentQueries&&zC(n,t),n.staticViewQueries&&nm(2,n.viewQuery,e);let o=n.components;o!==null&&sx(t,o)}catch(r){throw n.firstCreatePass&&(n.incompleteFirstPass=!0,n.firstCreatePass=!1),r}finally{t[U]&=-5,au()}}function sx(n,t){for(let e=0;e<t.length;e++)ix(n,t[e])}function Ba(n,t,e,r){let i=O(null);try{let o=t.tView,a=n[U]&4096?4096:16,l=Nm(n,o,e,a,null,t,null,null,r?.injector??null,r?.embeddedViewInjector??null,r?.dehydratedView??null),c=n[t.index];l[ci]=c;let u=n[rr];return u!==null&&(l[rr]=u.createEmbeddedView(o)),$m(o,l,e),l}finally{O(i)}}function ss(n,t){return!t||t.firstChild===null||NC(n)}function ka(n,t,e,r,i=!1){for(;e!==null;){if(e.type===128){e=i?e.projectionNext:e.next;continue}let o=t[e.index];o!==null&&r.push(un(o)),On(o)&&yE(o,r);let s=e.type;if(s&8)ka(n,t,e.child,r);else if(s&32){let a=Lm(e,t),l;for(;l=a();)r.push(l)}else if(s&16){let a=cE(t,e);if(Array.isArray(a))r.push(...a);else{let l=ii(t[Rt]);ka(l[L],l,a,r,!0)}}e=i?e.projectionNext:e.next}return r}function yE(n,t){for(let e=je;e<n.length;e++){let r=n[e],i=r[L].firstChild;i!==null&&ka(r[L],r,i,t)}n[di]!==n[kn]&&t.push(n[di])}function vE(n){if(n[Ki]!==null){for(let t of n[Ki])t.impl.addSequence(t);n[Ki].length=0}}var bE=[];function ax(n){return n[Xt]??lx(n)}function lx(n){let t=bE.pop()??Object.create(ux);return t.lView=n,t}function cx(n){n.lView[Xt]!==n&&(n.lView=null,bE.push(n))}var ux=Y(g({},Ri),{consumerIsAlwaysLive:!0,kind:"template",consumerMarkedDirty:n=>{Xi(n.lView)},consumerOnSignalRead(){this.lView[Xt]=this}});function dx(n){let t=n[Xt]??Object.create(fx);return t.lView=n,t}var fx=Y(g({},Ri),{consumerIsAlwaysLive:!0,kind:"template",consumerMarkedDirty:n=>{let t=ii(n.lView);for(;t&&!_E(t[L]);)t=ii(t);t&&gp(t)},consumerOnSignalRead(){this.lView[Xt]=this}});function _E(n){return n.type!==2}function CE(n){if(n[ri]===null)return;let t=!0;for(;t;){let e=!1;for(let r of n[ri])r.dirty&&(e=!0,r.zone===null||Zone.current===r.zone?r.run():r.zone.run(()=>r.run()));t=e&&!!(n[U]&8192)}}var hx=100;function EE(n,t=0){let r=n[nr].rendererFactory,i=!1;i||r.begin?.();try{px(n,t)}finally{i||r.end?.()}}function px(n,t){let e=Mp();try{pa(!0),am(n,t);let r=0;for(;Da(n);){if(r===hx)throw new T(103,!1);r++,am(n,1)}}finally{pa(e)}}function mx(n,t,e,r){if(Zi(t))return;let i=t[U],o=!1,s=!1;su(t);let a=!0,l=null,c=null;o||(_E(n)?(c=ax(t),l=Ai(c)):nc()===null?(a=!1,c=dx(t),l=Ai(c)):t[Xt]&&(ki(t[Xt]),t[Xt]=null));try{mp(t),S_(n.bindingStartIndex),e!==null&&dE(n,t,e,2,r);let u=(i&3)===3;if(!o)if(u){let p=n.preOrderCheckHooks;p!==null&&hu(t,p,null)}else{let p=n.preOrderHooks;p!==null&&pu(t,p,0,null),Up(t,0)}if(s||gx(t),CE(t),DE(t,0),n.contentQueries!==null&&zC(n,t),!o)if(u){let p=n.contentCheckHooks;p!==null&&hu(t,p)}else{let p=n.contentHooks;p!==null&&pu(t,p,1),Up(t,1)}vx(n,t);let d=n.components;d!==null&&TE(t,d,0);let f=n.viewQuery;if(f!==null&&nm(2,f,r),!o)if(u){let p=n.viewCheckHooks;p!==null&&hu(t,p)}else{let p=n.viewHooks;p!==null&&pu(t,p,2),Up(t,2)}if(n.firstUpdatePass===!0&&(n.firstUpdatePass=!1),t[Jc]){for(let p of t[Jc])p();t[Jc]=null}o||(vE(t),t[U]&=-73)}catch(u){throw o||Xi(t),u}finally{c!==null&&(Lo(c,l),a&&cx(c)),au()}}function DE(n,t){for(let e=LC(n);e!==null;e=FC(e))for(let r=je;r<e.length;r++){let i=e[r];wE(i,t)}}function gx(n){for(let t=LC(n);t!==null;t=FC(t)){if(!(t[U]&2))continue;let e=t[Yi];for(let r=0;r<e.length;r++){let i=e[r];gp(i)}}}function yx(n,t,e){me(ae.ComponentStart);let r=fn(t,n);try{wE(r,e)}finally{me(ae.ComponentEnd,r[He])}}function wE(n,t){nu(n)&&am(n,t)}function am(n,t){let r=n[L],i=n[U],o=n[Xt],s=!!(t===0&&i&16);if(s||=!!(i&64&&t===0),s||=!!(i&1024),s||=!!(o?.dirty&&Xs(o)),s||=!1,o&&(o.dirty=!1),n[U]&=-9217,s)mx(r,n,r.template,n[He]);else if(i&8192){let a=O(null);try{CE(n),DE(n,1);let l=r.components;l!==null&&TE(n,l,1),vE(n)}finally{O(a)}}}function TE(n,t,e){for(let r=0;r<t.length;r++)yx(n,t[r],e)}function vx(n,t){let e=n.hostBindingOpCodes;if(e!==null)try{for(let r=0;r<e.length;r++){let i=e[r];if(i<0)fi(~i);else{let o=i,s=e[++r],a=e[++r];M_(s,o);let l=t[o];me(ae.HostBindingsUpdateStart,l);try{a(2,l)}finally{me(ae.HostBindingsUpdateEnd,l)}}}}finally{fi(-1)}}function Hm(n,t){let e=Mp()?64:1088;for(n[nr].changeDetectionScheduler?.notify(t);n;){n[U]|=e;let r=ii(n);if(es(n)&&!r)return n;n=r}return null}function SE(n,t,e,r){return[n,!0,0,t,null,r,null,e,null,null]}function IE(n,t){let e=je+t;if(e<n.length)return n[e]}function ja(n,t,e,r=!0){let i=t[L];if(bx(i,t,n,e),r){let s=sm(e,n),a=t[Ie],l=a.parentNode(n[di]);l!==null&&P0(i,n[xt],a,t,l,s)}let o=t[Wi];o!==null&&o.firstChild!==null&&(o.firstChild=null)}function ME(n,t){let e=Oa(n,t);return e!==void 0&&Vu(e[L],e),e}function Oa(n,t){if(n.length<=je)return;let e=je+t,r=n[e];if(r){let i=r[ci];i!==null&&i!==n&&Bm(i,r),t>0&&(n[e-1][cn]=r[cn]);let o=ba(n,je+t);N0(r[L],r);let s=o[rr];s!==null&&s.detachView(o[L]),r[Qe]=null,r[cn]=null,r[U]&=-129}return r}function bx(n,t,e,r){let i=je+r,o=e.length;r>0&&(e[i-1][cn]=t),r<o-je?(t[cn]=e[i],np(e,je+r,t)):(e.push(t),t[cn]=null),t[Qe]=e;let s=t[ci];s!==null&&e!==s&&xE(s,t);let a=t[rr];a!==null&&a.insertView(n),ru(t),t[U]|=128}function xE(n,t){let e=n[Yi],r=t[Qe];if(Ar(r))n[U]|=2;else{let i=r[Qe][Rt];t[Rt]!==i&&(n[U]|=2)}e===null?n[Yi]=[t]:e.push(t)}var pi=class{_lView;_cdRefInjectingView;_appRef=null;_attachedToViewContainer=!1;exhaustive;get rootNodes(){let t=this._lView,e=t[L];return ka(e,t,e.firstChild,[])}constructor(t,e){this._lView=t,this._cdRefInjectingView=e}get context(){return this._lView[He]}set context(t){this._lView[He]=t}get destroyed(){return Zi(this._lView)}destroy(){if(this._appRef)this._appRef.detachView(this);else if(this._attachedToViewContainer){let t=this._lView[Qe];if(On(t)){let e=t[Ca],r=e?e.indexOf(this):-1;r>-1&&(Oa(t,r),ba(e,r))}this._attachedToViewContainer=!1}Vu(this._lView[L],this._lView)}onDestroy(t){yp(this._lView,t)}markForCheck(){Hm(this._cdRefInjectingView||this._lView,4)}detach(){this._lView[U]&=-129}reattach(){ru(this._lView),this._lView[U]|=128}detectChanges(){this._lView[U]|=1024,EE(this._lView)}checkNoChanges(){}attachToViewContainerRef(){if(this._appRef)throw new T(902,!1);this._attachedToViewContainer=!0}detachFromAppRef(){this._appRef=null;let t=es(this._lView),e=this._lView[ci];e!==null&&!t&&Bm(e,this._lView),sE(this._lView[L],this._lView)}attachToAppRef(t){if(this._attachedToViewContainer)throw new T(902,!1);this._appRef=t;let e=es(this._lView),r=this._lView[ci];r!==null&&!e&&xE(r,this._lView),ru(this._lView)}};var At=(()=>{class n{_declarationLView;_declarationTContainer;elementRef;static __NG_ELEMENT_ID__=_x;constructor(e,r,i){this._declarationLView=e,this._declarationTContainer=r,this.elementRef=i}get ssrId(){return this._declarationTContainer.tView?.ssrId||null}createEmbeddedView(e,r){return this.createEmbeddedViewImpl(e,r)}createEmbeddedViewImpl(e,r,i){let o=Ba(this._declarationLView,this._declarationTContainer,e,{embeddedViewInjector:r,dehydratedView:i});return new pi(o)}}return n})();function _x(){return zm(vt(),$())}function zm(n,t){return n.type&4?new At(t,n,cs(n,t)):null}function ds(n,t,e,r,i){let o=n.data[t];if(o===null)o=Cx(n,t,e,r,i),I_()&&(o.flags|=32);else if(o.type&64){o.type=e,o.value=r,o.attrs=i;let s=w_();o.injectorIndex=s===null?-1:s.injectorIndex}return ts(o,!0),o}function Cx(n,t,e,r,i){let o=Tp(),s=Sp(),a=s?o:o&&o.parent,l=n.data[t]=Dx(n,a,e,t,r,i);return Ex(n,l,o,s),l}function Ex(n,t,e,r){n.firstChild===null&&(n.firstChild=t),e!==null&&(r?e.child==null&&t.parent!==null&&(e.child=t):e.next===null&&(e.next=t,t.prev=e))}function Dx(n,t,e,r,i,o){let s=t?t.injectorIndex:-1,a=0;return Ep()&&(a|=128),{type:e,index:r,insertBeforeIndex:null,injectorIndex:s,directiveStart:-1,directiveEnd:-1,directiveStylingLast:-1,componentOffset:-1,controlDirectiveIndex:-1,customControlIndex:-1,propertyBindings:null,flags:a,providerIndexes:0,value:i,attrs:o,mergedAttrs:null,localNames:null,initialInputs:null,inputs:null,hostDirectiveInputs:null,outputs:null,hostDirectiveOutputs:null,directiveToIndex:null,tView:null,next:null,prev:null,projectionNext:null,child:null,parent:t,projection:null,styles:null,stylesWithoutHost:null,residualStyles:void 0,classes:null,classesWithoutHost:null,residualClasses:void 0,classBindings:0,styleBindings:0}}function wx(n){let t=n[up]??[],r=n[Qe][Ie],i=[];for(let o of t)o.data[VC]!==void 0?i.push(o):Tx(o,r);n[up]=i}function Tx(n,t){let e=0,r=n.firstChild;if(r){let i=n.data[jC];for(;e<i;){let o=r.nextSibling;KC(t,r,!1),r=o,e++}}}var Sx=()=>null,Ix=()=>null;function Tu(n,t){return Sx(n,t)}function RE(n,t,e){return Ix(n,t,e)}var AE=class{},zu=class{},lm=class{resolveComponentFactory(t){throw new T(917,!1)}},Va=class{static NULL=new lm},bt=class{},jn=(()=>{class n{destroyNode=null;static __NG_ELEMENT_ID__=()=>Mx()}return n})();function Mx(){let n=$(),t=vt(),e=fn(t.index,n);return(Ar(e)?e:n)[Ie]}var kE=(()=>{class n{static \u0275prov=y({token:n,providedIn:"root",factory:()=>null})}return n})();var gu={},cm=class{injector;parentInjector;constructor(t,e){this.injector=t,this.parentInjector=e}get(t,e,r){let i=this.injector.get(t,gu,r);return i!==gu||e===gu?i:this.parentInjector.get(t,e,r)}};function Su(n,t,e){let r=e?n.styles:null,i=e?n.classes:null,o=0;if(t!==null)for(let s=0;s<t.length;s++){let a=t[s];if(typeof a=="number")o=a;else if(o==1)i=Gc(i,a);else if(o==2){let l=a,c=t[++s];r=Gc(r,l+": "+c+";")}}e?n.styles=r:n.stylesWithoutHost=r,e?n.classes=i:n.classesWithoutHost=i}function ur(n,t=0){let e=$();if(e===null)return H(n,t);let r=vt();return AC(r,e,at(n),t)}function OE(n,t,e,r,i){let o=r===null?null:{"":-1},s=i(n,e);if(s!==null){let a=s,l=null,c=null;for(let u of s)if(u.resolveHostDirectives!==null){[a,l,c]=u.resolveHostDirectives(s);break}Ax(n,t,e,a,o,l,c)}o!==null&&r!==null&&xx(e,r,o)}function xx(n,t,e){let r=n.localNames=[];for(let i=0;i<t.length;i+=2){let o=e[t[i+1]];if(o==null)throw new T(-301,!1);r.push(t[i],o)}}function Rx(n,t,e){t.componentOffset=e,(n.components??=[]).push(t.index)}function Ax(n,t,e,r,i,o,s){let a=r.length,l=null;for(let f=0;f<a;f++){let p=r[f];l===null&&or(p)&&(l=p,Rx(n,e,f)),Jp(Eu(e,t),n,p.type)}Fx(e,n.data.length,a),l?.viewProvidersResolver&&l.viewProvidersResolver(l);for(let f=0;f<a;f++){let p=r[f];p.providersResolver&&p.providersResolver(p)}let c=!1,u=!1,d=eE(n,t,a,null);a>0&&(e.directiveToIndex=new Map);for(let f=0;f<a;f++){let p=r[f];if(e.mergedAttrs=is(e.mergedAttrs,p.hostAttrs),Ox(n,e,t,d,p),Lx(d,p,i),s!==null&&s.has(p)){let[v,I]=s.get(p);e.directiveToIndex.set(p.type,[d,v+e.directiveStart,I+e.directiveStart])}else(o===null||!o.has(p))&&e.directiveToIndex.set(p.type,d);p.contentQueries!==null&&(e.flags|=4),(p.hostBindings!==null||p.hostAttrs!==null||p.hostVars!==0)&&(e.flags|=64);let m=p.type.prototype;!c&&(m.ngOnChanges||m.ngOnInit||m.ngDoCheck)&&((n.preOrderHooks??=[]).push(e.index),c=!0),!u&&(m.ngOnChanges||m.ngDoCheck)&&((n.preOrderCheckHooks??=[]).push(e.index),u=!0),d++}kx(n,e,o)}function kx(n,t,e){for(let r=t.directiveStart;r<t.directiveEnd;r++){let i=n.data[r];if(e===null||!e.has(i))rC(0,t,i,r),rC(1,t,i,r),oC(t,r,!1);else{let o=e.get(i);iC(0,t,o,r),iC(1,t,o,r),oC(t,r,!0)}}}function rC(n,t,e,r){let i=n===0?e.inputs:e.outputs;for(let o in i)if(i.hasOwnProperty(o)){let s;n===0?s=t.inputs??={}:s=t.outputs??={},s[o]??=[],s[o].push(r),NE(t,o)}}function iC(n,t,e,r){let i=n===0?e.inputs:e.outputs;for(let o in i)if(i.hasOwnProperty(o)){let s=i[o],a;n===0?a=t.hostDirectiveInputs??={}:a=t.hostDirectiveOutputs??={},a[s]??=[],a[s].push(r,o),NE(t,s)}}function NE(n,t){t==="class"?n.flags|=8:t==="style"&&(n.flags|=16)}function oC(n,t,e){let{attrs:r,inputs:i,hostDirectiveInputs:o}=n;if(r===null||!e&&i===null||e&&o===null||km(n)){n.initialInputs??=[],n.initialInputs.push(null);return}let s=null,a=0;for(;a<r.length;){let l=r[a];if(l===0){a+=4;continue}else if(l===5){a+=2;continue}else if(typeof l=="number")break;if(!e&&i.hasOwnProperty(l)){let c=i[l];for(let u of c)if(u===t){s??=[],s.push(l,r[a+1]);break}}else if(e&&o.hasOwnProperty(l)){let c=o[l];for(let u=0;u<c.length;u+=2)if(c[u]===t){s??=[],s.push(c[u+1],r[a+1]);break}}a+=2}n.initialInputs??=[],n.initialInputs.push(s)}function Ox(n,t,e,r,i){n.data[r]=i;let o=i.factory||(i.factory=ni(i.type,!0)),s=new to(o,or(i),ur,null);n.blueprint[r]=s,e[r]=s,Nx(n,t,r,eE(n,e,i.hostVars,pn),i)}function Nx(n,t,e,r,i){let o=i.hostBindings;if(o){let s=n.hostBindingOpCodes;s===null&&(s=n.hostBindingOpCodes=[]);let a=~t.index;Px(s)!=a&&s.push(a),s.push(e,r,o)}}function Px(n){let t=n.length;for(;t>0;){let e=n[--t];if(typeof e=="number"&&e<0)return e}return 0}function Lx(n,t,e){if(e){if(t.exportAs)for(let r=0;r<t.exportAs.length;r++)e[t.exportAs[r]]=n;or(t)&&(e[""]=n)}}function Fx(n,t,e){n.flags|=1,n.directiveStart=t,n.directiveEnd=t+e,n.providerIndexes=t}function PE(n,t,e,r,i,o,s,a){let l=t[L],c=l.consts,u=Qt(c,s),d=ds(l,n,e,r,u);return o&&OE(l,t,d,Qt(c,a),i),d.mergedAttrs=is(d.mergedAttrs,d.attrs),d.attrs!==null&&Su(d,d.attrs,!1),d.mergedAttrs!==null&&Su(d,d.mergedAttrs,!0),l.queries!==null&&l.queries.elementStart(l,d),d}function LE(n,t){DC(n,t),dp(t)&&n.queries.elementEnd(t)}function Bx(n,t,e,r,i,o){let s=t.consts,a=Qt(s,i),l=ds(t,n,e,r,a);if(l.mergedAttrs=is(l.mergedAttrs,l.attrs),o!=null){let c=Qt(s,o);l.localNames=[];for(let u=0;u<c.length;u+=2)l.localNames.push(c[u],-1)}return l.attrs!==null&&Su(l,l.attrs,!1),l.mergedAttrs!==null&&Su(l,l.mergedAttrs,!0),t.queries!==null&&t.queries.elementStart(t,l),l}function Wm(n){return BE(n)?Array.isArray(n)||!(n instanceof Map)&&Symbol.iterator in n:!1}function FE(n,t){if(Array.isArray(n))for(let e=0;e<n.length;e++)t(n[e]);else{let e=n[Symbol.iterator](),r;for(;!(r=e.next()).done;)t(r.value)}}function BE(n){return n!==null&&(typeof n=="function"||typeof n=="object")}function jE(n,t,e){return n[t]=e}function Bn(n,t,e){if(e===pn)return!1;let r=n[t];return Object.is(r,e)?!1:(n[t]=e,!0)}function jx(n,t,e,r){let i=Bn(n,t,e);return Bn(n,t+1,r)||i}function yu(n,t,e){return function r(i){let o=r.__ngNativeEl__;o!==void 0&&i0(i,o);let s=ir(n)?fn(n.index,t):t;Hm(s,5);let a=t[He],l=sC(t,a,e,i),c=r.__ngNextListenerFn__;for(;c;)l=sC(t,a,c,i)&&l,c=c.__ngNextListenerFn__;return l}}function sC(n,t,e,r){let i=O(null);try{return me(ae.OutputStart,t,e),e(r)!==!1}catch(o){return rx(n,o),!1}finally{me(ae.OutputEnd,t,e),O(i)}}function VE(n,t,e,r,i,o,s,a){let l=Ea(n),c=!1,u=null;if(!r&&l&&(u=Ux(t,e,o,n.index)),u!==null){let d=u.__ngLastListenerFn__||u;d.__ngNextListenerFn__=s,u.__ngLastListenerFn__=s,c=!0}else{let d=dn(n,e),f=r?r(d):d;s0(e,f,o,a),r||(a.__ngNativeEl__=d);let p=i.listen(f,o,a);if(!Vx(o)){let m=r?v=>r(un(v[n.index])):n.index;UE(m,t,e,o,a,p,!1)}}return c}function Vx(n){return n.startsWith("animation")||n.startsWith("transition")}function Ux(n,t,e,r){let i=n.cleanup;if(i!=null)for(let o=0;o<i.length-1;o+=2){let s=i[o];if(s===e&&i[o+1]===r){let a=t[Qo],l=i[o+2];return a&&a.length>l?a[l]:null}typeof s=="string"&&(o+=2)}return null}function UE(n,t,e,r,i,o,s){let a=t.firstCreatePass?bp(t):null,l=vp(e),c=l.length;l.push(i,o),a&&a.push(r,n,c,(c+1)*(s?-1:1))}function aC(n,t,e,r,i,o){let s=t[e],a=t[L],c=a.data[e].outputs[r],d=s[c].subscribe(o);UE(n.index,a,t,i,o,d,!0)}var um=Symbol("BINDING");function $E(n){return n.debugInfo?.className||n.type.name||null}var Iu=class extends Va{ngModule;constructor(t){super(),this.ngModule=t}resolveComponentFactory(t){let e=Mr(t);return new ro(e,this.ngModule)}};function $x(n){return Object.keys(n).map(t=>{let[e,r,i]=n[t],o={propName:e,templateName:t,isSignal:(r&Bu.SignalBased)!==0};return i&&(o.transform=i),o})}function Hx(n){return Object.keys(n).map(t=>({propName:n[t],templateName:t}))}function zx(n,t,e){let r=t instanceof Se?t:t?.injector;return r&&n.getStandaloneInjector!==null&&(r=n.getStandaloneInjector(r)||r),r?new cm(e,r):e}function Wx(n){let t=n.get(bt,null);if(t===null)throw new T(407,!1);let e=n.get(kE,null),r=n.get(oi,null),i=n.get(gi,null,{optional:!0});return{rendererFactory:t,sanitizer:e,changeDetectionScheduler:r,ngReflect:!1,tracingService:i}}function Gx(n,t){let e=HE(n);return GC(t,e,e==="svg"?fp:e==="math"?g_:null)}function HE(n){return(n.selectors[0][0]||"div").toLowerCase()}var ro=class extends zu{componentDef;ngModule;selector;componentType;ngContentSelectors;isBoundToModule;cachedInputs=null;cachedOutputs=null;get inputs(){return this.cachedInputs??=$x(this.componentDef.inputs),this.cachedInputs}get outputs(){return this.cachedOutputs??=Hx(this.componentDef.outputs),this.cachedOutputs}constructor(t,e){super(),this.componentDef=t,this.ngModule=e,this.componentType=t.type,this.selector=E0(t.selectors),this.ngContentSelectors=t.ngContentSelectors??[],this.isBoundToModule=!!e}create(t,e,r,i,o,s){me(ae.DynamicComponentStart);let a=O(null);try{let l=this.componentDef,c=zx(l,i||this.ngModule,t),u=Wx(c),d=u.tracingService;return d&&d.componentCreate?d.componentCreate($E(l),()=>this.createComponentRef(u,c,e,r,o,s)):this.createComponentRef(u,c,e,r,o,s)}finally{O(a)}}createComponentRef(t,e,r,i,o,s){let a=this.componentDef,l=qx(i,a,s,o),c=t.rendererFactory.createRenderer(null,a),u=i?G0(c,i,a.encapsulation,e):Gx(a,c),d=s?.some(lC)||o?.some(m=>typeof m!="function"&&m.bindings.some(lC)),f=Nm(null,l,null,512|JC(a),null,null,t,c,e,null,HC(u,e,!0));f[xe]=u,su(f);let p=null;try{let m=PE(xe,f,2,"#host",()=>l.directiveRegistry,!0,0);YC(c,u,m),os(u,f),Um(l,f,m),WC(l,m,f),LE(l,m),r!==void 0&&Yx(m,this.ngContentSelectors,r),p=fn(m.index,f),f[He]=p[He],$m(l,f,null)}catch(m){throw p!==null&&tm(p),tm(f),m}finally{me(ae.DynamicComponentEnd),au()}return new Mu(this.componentType,f,!!d)}};function qx(n,t,e,r){let i=n?["ng-version","21.2.13"]:D0(t.selectors[0]),o=null,s=null,a=0;if(e)for(let u of e)a+=u[um].requiredVars,u.create&&(u.targetIdx=0,(o??=[]).push(u)),u.update&&(u.targetIdx=0,(s??=[]).push(u));if(r)for(let u=0;u<r.length;u++){let d=r[u];if(typeof d!="function")for(let f of d.bindings){a+=f[um].requiredVars;let p=u+1;f.create&&(f.targetIdx=p,(o??=[]).push(f)),f.update&&(f.targetIdx=p,(s??=[]).push(f))}}let l=[t];if(r)for(let u of r){let d=typeof u=="function"?u:u.type,f=Qh(d);l.push(f)}return Om(0,null,Kx(o,s),1,a,l,null,null,null,[i],null)}function Kx(n,t){return!n&&!t?null:e=>{if(e&1&&n)for(let r of n)r.create();if(e&2&&t)for(let r of t)r.update()}}function lC(n){let t=n[um].kind;return t==="input"||t==="twoWay"}var Mu=class extends AE{_rootLView;_hasInputBindings;instance;hostView;changeDetectorRef;componentType;location;previousInputValues=null;_tNode;constructor(t,e,r){super(),this._rootLView=e,this._hasInputBindings=r,this._tNode=eu(e[L],xe),this.location=cs(this._tNode,e),this.instance=fn(this._tNode.index,e)[He],this.hostView=this.changeDetectorRef=new pi(e,void 0),this.componentType=t}setInput(t,e){this._hasInputBindings;let r=this._tNode;if(this.previousInputValues??=new Map,this.previousInputValues.has(t)&&Object.is(this.previousInputValues.get(t),e))return;let i=this._rootLView,o=Hu(r,i[L],i,t,e);this.previousInputValues.set(t,e);let s=fn(r.index,i);Hm(s,1)}get injector(){return new eo(this._tNode,this._rootLView)}destroy(){this.hostView.destroy()}onDestroy(t){this.hostView.onDestroy(t)}};function Yx(n,t,e){let r=n.projection=[];for(let i=0;i<t.length;i++){let o=e[i];r.push(o!=null&&o.length?Array.from(o):null)}}var lt=(()=>{class n{static __NG_ELEMENT_ID__=Zx}return n})();function Zx(){let n=vt();return zE(n,$())}var dm=class n extends lt{_lContainer;_hostTNode;_hostLView;constructor(t,e,r){super(),this._lContainer=t,this._hostTNode=e,this._hostLView=r}get element(){return cs(this._hostTNode,this._hostLView)}get injector(){return new eo(this._hostTNode,this._hostLView)}get parentInjector(){let t=Mm(this._hostTNode,this._hostLView);if(TC(t)){let e=_u(t,this._hostLView),r=bu(t),i=e[L].data[r+8];return new eo(i,e)}else return new eo(null,this._hostLView)}clear(){for(;this.length>0;)this.remove(this.length-1)}get(t){let e=cC(this._lContainer);return e!==null&&e[t]||null}get length(){return this._lContainer.length-je}createEmbeddedView(t,e,r){let i,o;typeof r=="number"?i=r:r!=null&&(i=r.index,o=r.injector);let s=Tu(this._lContainer,t.ssrId),a=t.createEmbeddedViewImpl(e||{},o,s);return this.insertImpl(a,i,ss(this._hostTNode,s)),a}createComponent(t,e,r,i,o,s,a){let l=t&&!AM(t),c;if(l)c=e;else{let I=e||{};c=I.index,r=I.injector,i=I.projectableNodes,o=I.environmentInjector||I.ngModuleRef,s=I.directives,a=I.bindings}let u=l?t:new ro(Mr(t)),d=r||this.parentInjector;if(!o&&u.ngModule==null){let R=(l?d:this.parentInjector).get(Se,null);R&&(o=R)}let f=Mr(u.componentType??{}),p=Tu(this._lContainer,f?.id??null),m=p?.firstChild??null,v=u.create(d,i,m,o,s,a);return this.insertImpl(v.hostView,c,ss(this._hostTNode,p)),v}insert(t,e){return this.insertImpl(t,e,!0)}insertImpl(t,e,r){let i=t._lView;if(v_(i)){let a=this.indexOf(t);if(a!==-1)this.detach(a);else{let l=i[Qe],c=new n(l,l[xt],l[Qe]);c.detach(c.indexOf(t))}}let o=this._adjustIndex(e),s=this._lContainer;return ja(s,i,o,r),t.attachToViewContainerRef(),np(zp(s),o,t),t}move(t,e){return this.insert(t,e)}indexOf(t){let e=cC(this._lContainer);return e!==null?e.indexOf(t):-1}remove(t){let e=this._adjustIndex(t,-1),r=Oa(this._lContainer,e);r&&(ba(zp(this._lContainer),e),Vu(r[L],r))}detach(t){let e=this._adjustIndex(t,-1),r=Oa(this._lContainer,e);return r&&ba(zp(this._lContainer),e)!=null?new pi(r):null}_adjustIndex(t,e=0){return t??this.length+e}};function cC(n){return n[Ca]}function zp(n){return n[Ca]||(n[Ca]=[])}function zE(n,t){let e,r=t[n.index];return On(r)?e=r:(e=SE(r,t,null,n),t[n.index]=e,Pm(t,e)),Qx(e,t,n,r),new dm(e,n,t)}function Xx(n,t){let e=n[Ie],r=e.createComment(""),i=dn(t,n),o=e.parentNode(i);return Du(e,o,r,e.nextSibling(i),!1),r}var Qx=tR,Jx=()=>!1;function eR(n,t,e){return Jx(n,t,e)}function tR(n,t,e,r){if(n[di])return;let i;e.type&8?i=un(r):i=Xx(t,e),n[di]=i}var fm=class n{queryList;matches=null;constructor(t){this.queryList=t}clone(){return new n(this.queryList)}setDirty(){this.queryList.setDirty()}},hm=class n{queries;constructor(t=[]){this.queries=t}createEmbeddedView(t){let e=t.queries;if(e!==null){let r=t.contentQueries!==null?t.contentQueries[0]:e.length,i=[];for(let o=0;o<r;o++){let s=e.getByIndex(o),a=this.queries[s.indexInDeclarationView];i.push(a.clone())}return new n(i)}return null}insertView(t){this.dirtyQueriesWithMatches(t)}detachView(t){this.dirtyQueriesWithMatches(t)}finishViewCreation(t){this.dirtyQueriesWithMatches(t)}dirtyQueriesWithMatches(t){for(let e=0;e<this.queries.length;e++)Gm(t,e).matches!==null&&this.queries[e].setDirty()}},xu=class{flags;read;predicate;constructor(t,e,r=null){this.flags=e,this.read=r,typeof t=="string"?this.predicate=cR(t):this.predicate=t}},pm=class n{queries;constructor(t=[]){this.queries=t}elementStart(t,e){for(let r=0;r<this.queries.length;r++)this.queries[r].elementStart(t,e)}elementEnd(t){for(let e=0;e<this.queries.length;e++)this.queries[e].elementEnd(t)}embeddedTView(t){let e=null;for(let r=0;r<this.length;r++){let i=e!==null?e.length:0,o=this.getByIndex(r).embeddedTView(t,i);o&&(o.indexInDeclarationView=r,e!==null?e.push(o):e=[o])}return e!==null?new n(e):null}template(t,e){for(let r=0;r<this.queries.length;r++)this.queries[r].template(t,e)}getByIndex(t){return this.queries[t]}get length(){return this.queries.length}track(t){this.queries.push(t)}},mm=class n{metadata;matches=null;indexInDeclarationView=-1;crossesNgTemplate=!1;_declarationNodeIndex;_appliesToNextNode=!0;constructor(t,e=-1){this.metadata=t,this._declarationNodeIndex=e}elementStart(t,e){this.isApplyingToNode(e)&&this.matchTNode(t,e)}elementEnd(t){this._declarationNodeIndex===t.index&&(this._appliesToNextNode=!1)}template(t,e){this.elementStart(t,e)}embeddedTView(t,e){return this.isApplyingToNode(t)?(this.crossesNgTemplate=!0,this.addMatch(-t.index,e),new n(this.metadata)):null}isApplyingToNode(t){if(this._appliesToNextNode&&(this.metadata.flags&1)!==1){let e=this._declarationNodeIndex,r=t.parent;for(;r!==null&&r.type&8&&r.index!==e;)r=r.parent;return e===(r!==null?r.index:-1)}return this._appliesToNextNode}matchTNode(t,e){let r=this.metadata.predicate;if(Array.isArray(r))for(let i=0;i<r.length;i++){let o=r[i];this.matchTNodeWithReadOption(t,e,nR(e,o)),this.matchTNodeWithReadOption(t,e,mu(e,t,o,!1,!1))}else r===At?e.type&4&&this.matchTNodeWithReadOption(t,e,-1):this.matchTNodeWithReadOption(t,e,mu(e,t,r,!1,!1))}matchTNodeWithReadOption(t,e,r){if(r!==null){let i=this.metadata.read;if(i!==null)if(i===le||i===lt||i===At&&e.type&4)this.addMatch(e.index,-2);else{let o=mu(e,t,i,!1,!1);o!==null&&this.addMatch(e.index,o)}else this.addMatch(e.index,r)}}addMatch(t,e){this.matches===null?this.matches=[t,e]:this.matches.push(t,e)}};function nR(n,t){let e=n.localNames;if(e!==null){for(let r=0;r<e.length;r+=2)if(e[r]===t)return e[r+1]}return null}function rR(n,t){return n.type&11?cs(n,t):n.type&4?zm(n,t):null}function iR(n,t,e,r){return e===-1?rR(t,n):e===-2?oR(n,t,r):Aa(n,n[L],e,t)}function oR(n,t,e){if(e===le)return cs(t,n);if(e===At)return zm(t,n);if(e===lt)return zE(t,n)}function WE(n,t,e,r){let i=t[rr].queries[r];if(i.matches===null){let o=n.data,s=e.matches,a=[];for(let l=0;s!==null&&l<s.length;l+=2){let c=s[l];if(c<0)a.push(null);else{let u=o[c];a.push(iR(t,u,s[l+1],e.metadata.read))}}i.matches=a}return i.matches}function gm(n,t,e,r){let i=n.queries.getByIndex(e),o=i.matches;if(o!==null){let s=WE(n,t,i,e);for(let a=0;a<o.length;a+=2){let l=o[a];if(l>0)r.push(s[a/2]);else{let c=o[a+1],u=t[-l];for(let d=je;d<u.length;d++){let f=u[d];f[ci]===f[Qe]&&gm(f[L],f,c,r)}if(u[Yi]!==null){let d=u[Yi];for(let f=0;f<d.length;f++){let p=d[f];gm(p[L],p,c,r)}}}}}return r}function sR(n,t){return n[rr].queries[t].queryList}function GE(n,t,e){let r=new Or((e&4)===4);return C_(n,t,r,r.destroy),(t[rr]??=new hm).queries.push(new fm(r))-1}function aR(n,t,e){let r=ke();return r.firstCreatePass&&(qE(r,new xu(n,t,e),-1),(t&2)===2&&(r.staticViewQueries=!0)),GE(r,$(),t)}function lR(n,t,e,r){let i=ke();if(i.firstCreatePass){let o=vt();qE(i,new xu(t,e,r),o.index),uR(i,n),(e&2)===2&&(i.staticContentQueries=!0)}return GE(i,$(),e)}function cR(n){return n.split(",").map(t=>t.trim())}function qE(n,t,e){n.queries===null&&(n.queries=new pm),n.queries.track(new mm(t,e))}function uR(n,t){let e=n.contentQueries||(n.contentQueries=[]),r=e.length?e[e.length-1]:-1;t!==r&&e.push(n.queries.length-1,t)}function Gm(n,t){return n.queries.getByIndex(t)}function dR(n,t){let e=n[L],r=Gm(e,t);return r.crossesNgTemplate?gm(e,n,t,[]):WE(e,n,r,t)}var lr=class{},Wu=class{};var Ru=class extends lr{ngModuleType;_parent;_bootstrapComponents=[];_r3Injector;instance;destroyCbs=[];componentFactoryResolver=new Iu(this);constructor(t,e,r,i=!0){super(),this.ngModuleType=t,this._parent=e;let o=Xh(t);this._bootstrapComponents=ZC(o.bootstrap),this._r3Injector=Np(t,e,[{provide:lr,useValue:this},{provide:Va,useValue:this.componentFactoryResolver},...r],ya(t),new Set(["environment"])),i&&this.resolveInjectorInitializers()}resolveInjectorInitializers(){this._r3Injector.resolveInjectorInitializers(),this.instance=this._r3Injector.get(this.ngModuleType)}get injector(){return this._r3Injector}destroy(){let t=this._r3Injector;!t.destroyed&&t.destroy(),this.destroyCbs.forEach(e=>e()),this.destroyCbs=null}onDestroy(t){this.destroyCbs.push(t)}},Au=class extends Wu{moduleType;constructor(t){super(),this.moduleType=t}create(t){return new Ru(this.moduleType,t,[])}};var Na=class extends lr{injector;componentFactoryResolver=new Iu(this);instance=null;constructor(t){super();let e=new Ui([...t.providers,{provide:lr,useValue:this},{provide:Va,useValue:this.componentFactoryResolver}],t.parent||Xo(),t.debugName,new Set(["environment"]));this.injector=e,t.runEnvironmentInitializers&&e.resolveInjectorInitializers()}destroy(){this.injector.destroy()}onDestroy(t){this.injector.onDestroy(t)}};function Ua(n,t,e=null){return new Na({providers:n,parent:t,debugName:e,runEnvironmentInitializers:!0}).injector}var fR=(()=>{class n{_injector;cachedInjectors=new Map;constructor(e){this._injector=e}getOrCreateStandaloneInjector(e){if(!e.standalone)return null;if(!this.cachedInjectors.has(e)){let r=op(!1,e.type),i=r.length>0?Ua([r],this._injector,""):null;this.cachedInjectors.set(e,i)}return this.cachedInjectors.get(e)}ngOnDestroy(){try{for(let e of this.cachedInjectors.values())e!==null&&e.destroy()}finally{this.cachedInjectors.clear()}}static \u0275prov=y({token:n,providedIn:"environment",factory:()=>new n(H(Se))})}return n})();function ge(n){return La(()=>{let t=KE(n),e=Y(g({},t),{decls:n.decls,vars:n.vars,template:n.template,consts:n.consts||null,ngContentSelectors:n.ngContentSelectors,onPush:n.changeDetection===xm.OnPush,directiveDefs:null,pipeDefs:null,dependencies:t.standalone&&n.dependencies||null,getStandaloneInjector:t.standalone?i=>i.get(fR).getOrCreateStandaloneInjector(e):null,getExternalStyles:null,signals:n.signals??!1,data:n.data||{},encapsulation:n.encapsulation||Fn.Emulated,styles:n.styles||Mt,_:null,schemas:n.schemas||null,tView:null,id:""});t.standalone&&Nr("NgStandalone"),YE(e);let r=n.dependencies;return e.directiveDefs=uC(r,hR),e.pipeDefs=uC(r,t_),e.id=gR(e),e})}function hR(n){return Mr(n)||Qh(n)}function Ve(n){return La(()=>({type:n.type,bootstrap:n.bootstrap||Mt,declarations:n.declarations||Mt,imports:n.imports||Mt,exports:n.exports||Mt,transitiveCompileScopes:null,schemas:n.schemas||null,id:n.id||null}))}function pR(n,t){if(n==null)return ai;let e={};for(let r in n)if(n.hasOwnProperty(r)){let i=n[r],o,s,a,l;Array.isArray(i)?(a=i[0],o=i[1],s=i[2]??o,l=i[3]||null):(o=i,s=i,a=Bu.None,l=null),e[o]=[r,a,l],t[o]=s}return e}function mR(n){if(n==null)return ai;let t={};for(let e in n)n.hasOwnProperty(e)&&(t[n[e]]=e);return t}function ye(n){return La(()=>{let t=KE(n);return YE(t),t})}function fs(n){return{type:n.type,name:n.name,factory:null,pure:n.pure!==!1,standalone:n.standalone??!0,onDestroy:n.type.prototype.ngOnDestroy||null}}function KE(n){let t={};return{type:n.type,providersResolver:null,viewProvidersResolver:null,factory:null,hostBindings:n.hostBindings||null,hostVars:n.hostVars||0,hostAttrs:n.hostAttrs||null,contentQueries:n.contentQueries||null,declaredInputs:t,inputConfig:n.inputs||ai,exportAs:n.exportAs||null,standalone:n.standalone??!0,signals:n.signals===!0,selectors:n.selectors||Mt,viewQuery:n.viewQuery||null,features:n.features||null,setInput:null,resolveHostDirectives:null,hostDirectives:null,controlDef:null,inputs:pR(n.inputs,t),outputs:mR(n.outputs),debugInfo:null}}function YE(n){n.features?.forEach(t=>t(n))}function uC(n,t){return n?()=>{let e=typeof n=="function"?n():n,r=[];for(let i of e){let o=t(i);o!==null&&r.push(o)}return r}:null}function gR(n){let t=0,e=typeof n.consts=="function"?"":n.consts,r=[n.selectors,n.ngContentSelectors,n.hostVars,n.hostAttrs,e,n.vars,n.decls,n.encapsulation,n.standalone,n.signals,n.exportAs,JSON.stringify(n.inputs),JSON.stringify(n.outputs),Object.getOwnPropertyNames(n.type.prototype),!!n.contentQueries,!!n.viewQuery];for(let o of r.join("|"))t=Math.imul(31,t)+o.charCodeAt(0)<<0;return t+=2147483648,"c"+t}function yR(n){return Object.getPrototypeOf(n.prototype).constructor}function Jt(n){let t=yR(n.type),e=!0,r=[n];for(;t;){let i;if(or(n))i=t.\u0275cmp||t.\u0275dir;else{if(t.\u0275cmp)throw new T(903,!1);i=t.\u0275dir}if(i){if(e){r.push(i);let s=n;s.inputs=Wp(n.inputs),s.declaredInputs=Wp(n.declaredInputs),s.outputs=Wp(n.outputs);let a=i.hostBindings;a&&ER(n,a);let l=i.viewQuery,c=i.contentQueries;if(l&&_R(n,l),c&&CR(n,c),vR(n,i),e_(n.outputs,i.outputs),or(i)&&i.data.animation){let u=n.data;u.animation=(u.animation||[]).concat(i.data.animation)}}let o=i.features;if(o)for(let s=0;s<o.length;s++){let a=o[s];a&&a.ngInherit&&a(n),a===Jt&&(e=!1)}}t=Object.getPrototypeOf(t)}bR(r)}function vR(n,t){for(let e in t.inputs){if(!t.inputs.hasOwnProperty(e)||n.inputs.hasOwnProperty(e))continue;let r=t.inputs[e];r!==void 0&&(n.inputs[e]=r,n.declaredInputs[e]=t.declaredInputs[e])}}function bR(n){let t=0,e=null;for(let r=n.length-1;r>=0;r--){let i=n[r];i.hostVars=t+=i.hostVars,i.hostAttrs=is(i.hostAttrs,e=is(e,i.hostAttrs))}}function Wp(n){return n===ai?{}:n===Mt?[]:n}function _R(n,t){let e=n.viewQuery;e?n.viewQuery=(r,i)=>{t(r,i),e(r,i)}:n.viewQuery=t}function CR(n,t){let e=n.contentQueries;e?n.contentQueries=(r,i,o)=>{t(r,i,o),e(r,i,o)}:n.contentQueries=t}function ER(n,t){let e=n.hostBindings;e?n.hostBindings=(r,i)=>{t(r,i),e(r,i)}:n.hostBindings=t}function ZE(n,t,e,r,i,o,s,a){if(e.firstCreatePass){n.mergedAttrs=is(n.mergedAttrs,n.attrs);let u=n.tView=Om(2,n,i,o,s,e.directiveRegistry,e.pipeRegistry,null,e.schemas,e.consts,null);e.queries!==null&&(e.queries.template(e,n),u.queries=e.queries.embeddedTView(n))}a&&(n.flags|=a),ts(n,!1);let l=wR(e,t,n,r);cu()&&jm(e,t,l,n),os(l,t);let c=SE(l,t,l,n);t[r+xe]=c,Pm(t,c),eR(c,n,t)}function DR(n,t,e,r,i,o,s,a,l,c,u){let d=e+xe,f;return t.firstCreatePass?(f=ds(t,d,4,s||null,a||null),Cp()&&OE(t,n,f,Qt(t.consts,c),hE),DC(t,f)):f=t.data[d],ZE(f,n,t,e,r,i,o,l),Ea(f)&&Um(t,n,f),c!=null&&$u(n,f,u),f}function as(n,t,e,r,i,o,s,a,l,c,u){let d=e+xe,f;if(t.firstCreatePass){if(f=ds(t,d,4,s||null,a||null),c!=null){let p=Qt(t.consts,c);f.localNames=[];for(let m=0;m<p.length;m+=2)f.localNames.push(p[m],-1)}}else f=t.data[d];return ZE(f,n,t,e,r,i,o,l),c!=null&&$u(n,f,u),f}function dr(n,t,e,r,i,o,s,a){let l=$(),c=ke(),u=Qt(c.consts,o);return DR(l,c,n,t,e,r,i,u,void 0,s,a),dr}function Gu(n,t,e,r,i,o,s,a){let l=$(),c=ke(),u=Qt(c.consts,o);return as(l,c,n,t,e,r,i,u,void 0,s,a),Gu}var wR=TR;function TR(n,t,e,r){return uu(!0),t[Ie].createComment("")}var qm=(()=>{class n{log(e){console.log(e)}warn(e){console.warn(e)}static \u0275fac=function(r){return new(r||n)};static \u0275prov=y({token:n,factory:n.\u0275fac,providedIn:"platform"})}return n})();function $a(n){return typeof n=="function"&&n[mt]!==void 0}var Km=new b("");function hs(n){return!!n&&typeof n.then=="function"}function Ym(n){return!!n&&typeof n.subscribe=="function"}var Zm=new b("");function qu(n){return li([{provide:Zm,multi:!0,useValue:n}])}var Xm=(()=>{class n{resolve;reject;initialized=!1;done=!1;donePromise=new Promise((e,r)=>{this.resolve=e,this.reject=r});appInits=h(Zm,{optional:!0})??[];injector=h(re);constructor(){}runInitializers(){if(this.initialized)return;let e=[];for(let i of this.appInits){let o=yt(this.injector,i);if(hs(o))e.push(o);else if(Ym(o)){let s=new Promise((a,l)=>{o.subscribe({complete:a,error:l})});e.push(s)}}let r=()=>{this.done=!0,this.resolve()};Promise.all(e).then(()=>{r()}).catch(i=>{this.reject(i)}),e.length===0&&r(),this.initialized=!0}static \u0275fac=function(r){return new(r||n)};static \u0275prov=y({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})(),Ku=new b("");function XE(){ah(()=>{let n="";throw new T(600,n)})}function QE(n){return n.isBoundToModule}var SR=10;var mn=(()=>{class n{_runningTick=!1;_destroyed=!1;_destroyListeners=[];_views=[];internalErrorHandler=h(Nn);afterRenderManager=h(Fm);zonelessEnabled=h(Sa);rootEffectScheduler=h(du);dirtyFlags=0;tracingSnapshot=null;allTestViews=new Set;autoDetectTestViews=new Set;includeAllTestViews=!1;afterTick=new C;get allViews(){return[...(this.includeAllTestViews?this.allTestViews:this.autoDetectTestViews).keys(),...this._views]}get destroyed(){return this._destroyed}componentTypes=[];components=[];internalPendingTask=h(hi);get isStable(){return this.internalPendingTask.hasPendingTasksObservable.pipe(ee(e=>!e))}constructor(){h(gi,{optional:!0})}whenStable(){let e;return new Promise(r=>{e=this.isStable.subscribe({next:i=>{i&&r()}})}).finally(()=>{e.unsubscribe()})}_injector=h(Se);_rendererFactory=null;get injector(){return this._injector}bootstrap(e,r){return this.bootstrapImpl(e,r)}bootstrapImpl(e,r,i=re.NULL){return this._injector.get(V).run(()=>{me(ae.BootstrapComponentStart);let s=e instanceof zu;if(!this._injector.get(Xm).done){let m="";throw new T(405,m)}let l;s?l=e:l=this._injector.get(Va).resolveComponentFactory(e),this.componentTypes.push(l.componentType);let c=QE(l)?void 0:this._injector.get(lr),u=r||l.selector,d=l.create(i,[],u,c),f=d.location.nativeElement,p=d.injector.get(Km,null);return p?.registerApplication(f),d.onDestroy(()=>{this.detachView(d.hostView),Ra(this.components,d),p?.unregisterApplication(f)}),this._loadComponent(d),me(ae.BootstrapComponentEnd,d),d})}tick(){this.zonelessEnabled||(this.dirtyFlags|=1),this._tick()}_tick(){me(ae.ChangeDetectionStart),this.tracingSnapshot!==null?this.tracingSnapshot.run(ju.CHANGE_DETECTION,this.tickImpl):this.tickImpl()}tickImpl=()=>{if(this._runningTick)throw me(ae.ChangeDetectionEnd),new T(101,!1);let e=O(null);try{this._runningTick=!0,this.synchronize()}finally{this._runningTick=!1,this.tracingSnapshot?.dispose(),this.tracingSnapshot=null,O(e),this.afterTick.next(),me(ae.ChangeDetectionEnd)}};synchronize(){this._rendererFactory===null&&!this._injector.destroyed&&(this._rendererFactory=this._injector.get(bt,null,{optional:!0}));let e=0;for(;this.dirtyFlags!==0&&e++<SR;){me(ae.ChangeDetectionSyncStart);try{this.synchronizeOnce()}finally{me(ae.ChangeDetectionSyncEnd)}}}synchronizeOnce(){this.dirtyFlags&16&&(this.dirtyFlags&=-17,this.rootEffectScheduler.flush());let e=!1;if(this.dirtyFlags&7){let r=!!(this.dirtyFlags&1);this.dirtyFlags&=-8,this.dirtyFlags|=8;for(let{_lView:i}of this.allViews){if(!r&&!Da(i))continue;let o=r&&!this.zonelessEnabled?0:1;EE(i,o),e=!0}if(this.dirtyFlags&=-5,this.syncDirtyFlagsWithViews(),this.dirtyFlags&23)return}e||(this._rendererFactory?.begin?.(),this._rendererFactory?.end?.()),this.dirtyFlags&8&&(this.dirtyFlags&=-9,this.afterRenderManager.execute()),this.syncDirtyFlagsWithViews()}syncDirtyFlagsWithViews(){if(this.allViews.some(({_lView:e})=>Da(e))){this.dirtyFlags|=2;return}else this.dirtyFlags&=-8}attachView(e){let r=e;this._views.push(r),r.attachToAppRef(this)}detachView(e){let r=e;Ra(this._views,r),r.detachFromAppRef()}_loadComponent(e){this.attachView(e.hostView);try{this.tick()}catch(i){this.internalErrorHandler(i)}this.components.push(e),this._injector.get(Ku,[]).forEach(i=>i(e))}ngOnDestroy(){if(!this._destroyed)try{this._destroyListeners.forEach(e=>e()),this._views.slice().forEach(e=>e.destroy())}finally{this._destroyed=!0,this._views=[],this._destroyListeners=[]}}onDestroy(e){return this._destroyListeners.push(e),()=>Ra(this._destroyListeners,e)}destroy(){if(this._destroyed)throw new T(406,!1);let e=this._injector;e.destroy&&!e.destroyed&&e.destroy()}get viewCount(){return this._views.length}static \u0275fac=function(r){return new(r||n)};static \u0275prov=y({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})();function Ra(n,t){let e=n.indexOf(t);e>-1&&n.splice(e,1)}function Yu(n,t){let e=$(),r=Qi();if(Bn(e,r,t)){let i=ke(),o=lu();if(Hu(o,i,e,n,t))ir(o)&&fE(e,o.index);else{let a=dn(o,e);pE(e[Ie],a,null,o.value,n,t,null)}}return Yu}function Vn(n,t,e,r){let i=$(),o=Qi();if(Bn(i,o,t)){let s=ke(),a=lu();tx(a,i,n,t,e,r)}return Vn}var ym=class{destroy(t){}updateValue(t,e){}swap(t,e){let r=Math.min(t,e),i=Math.max(t,e),o=this.detach(i);if(i-r>1){let s=this.detach(r);this.attach(r,o),this.attach(i,s)}else this.attach(r,o)}move(t,e){this.attach(e,this.detach(t))}};function Gp(n,t,e,r,i){return n===e&&Object.is(t,r)?1:Object.is(i(n,t),i(e,r))?-1:0}function IR(n,t,e,r){let i,o,s=0,a=n.length-1,l=void 0;if(Array.isArray(t)){O(r);let c=t.length-1;for(O(null);s<=a&&s<=c;){let u=n.at(s),d=t[s],f=Gp(s,u,s,d,e);if(f!==0){f<0&&n.updateValue(s,d),s++;continue}let p=n.at(a),m=t[c],v=Gp(a,p,c,m,e);if(v!==0){v<0&&n.updateValue(a,m),a--,c--;continue}let I=e(s,u),R=e(a,p),te=e(s,d);if(Object.is(te,R)){let Pe=e(c,m);Object.is(Pe,I)?(n.swap(s,a),n.updateValue(a,m),c--,a--):n.move(a,s),n.updateValue(s,d),s++;continue}if(i??=new ku,o??=fC(n,s,a,e),vm(n,i,s,te))n.updateValue(s,d),s++,a++;else if(o.has(te))i.set(I,n.detach(s)),a--;else{let Pe=n.create(s,t[s]);n.attach(s,Pe),s++,a++}}for(;s<=c;)dC(n,i,e,s,t[s]),s++}else if(t!=null){O(r);let c=t[Symbol.iterator]();O(null);let u=c.next();for(;!u.done&&s<=a;){let d=n.at(s),f=u.value,p=Gp(s,d,s,f,e);if(p!==0)p<0&&n.updateValue(s,f),s++,u=c.next();else{i??=new ku,o??=fC(n,s,a,e);let m=e(s,f);if(vm(n,i,s,m))n.updateValue(s,f),s++,a++,u=c.next();else if(!o.has(m))n.attach(s,n.create(s,f)),s++,a++,u=c.next();else{let v=e(s,d);i.set(v,n.detach(s)),a--}}}for(;!u.done;)dC(n,i,e,n.length,u.value),u=c.next()}for(;s<=a;)n.destroy(n.detach(a--));i?.forEach(c=>{n.destroy(c)})}function vm(n,t,e,r){return t!==void 0&&t.has(r)?(n.attach(e,t.get(r)),t.delete(r),!0):!1}function dC(n,t,e,r,i){if(vm(n,t,r,e(r,i)))n.updateValue(r,i);else{let o=n.create(r,i);n.attach(r,o)}}function fC(n,t,e,r){let i=new Set;for(let o=t;o<=e;o++)i.add(r(o,n.at(o)));return i}var ku=class{kvMap=new Map;_vMap=void 0;has(t){return this.kvMap.has(t)}delete(t){if(!this.has(t))return!1;let e=this.kvMap.get(t);return this._vMap!==void 0&&this._vMap.has(e)?(this.kvMap.set(t,this._vMap.get(e)),this._vMap.delete(e)):this.kvMap.delete(t),!0}get(t){return this.kvMap.get(t)}set(t,e){if(this.kvMap.has(t)){let r=this.kvMap.get(t);this._vMap===void 0&&(this._vMap=new Map);let i=this._vMap;for(;i.has(r);)r=i.get(r);i.set(r,e)}else this.kvMap.set(t,e)}forEach(t){for(let[e,r]of this.kvMap)if(t(r,e),this._vMap!==void 0){let i=this._vMap;for(;i.has(r);)r=i.get(r),t(r,e)}}};function Je(n,t,e,r,i,o,s,a){Nr("NgControlFlow");let l=$(),c=ke(),u=Qt(c.consts,o);return as(l,c,n,t,e,r,i,u,256,s,a),Qm}function Qm(n,t,e,r,i,o,s,a){Nr("NgControlFlow");let l=$(),c=ke(),u=Qt(c.consts,o);return as(l,c,n,t,e,r,i,u,512,s,a),Qm}function et(n,t){Nr("NgControlFlow");let e=$(),r=Qi(),i=e[r]!==pn?e[r]:-1,o=i!==-1?Ou(e,xe+i):void 0,s=0;if(Bn(e,r,n)){let a=O(null);try{if(o!==void 0&&ME(o,s),n!==-1){let l=xe+n,c=Ou(e,l),u=Em(e[L],l),d=RE(c,u,e),f=Ba(e,u,t,{dehydratedView:d});ja(c,f,s,ss(u,d))}}finally{O(a)}}else if(o!==void 0){let a=IE(o,s);a!==void 0&&(a[He]=t)}}var bm=class{lContainer;$implicit;$index;constructor(t,e,r){this.lContainer=t,this.$implicit=e,this.$index=r}get $count(){return this.lContainer.length-je}};function Zu(n,t){return t}var _m=class{hasEmptyBlock;trackByFn;liveCollection;constructor(t,e,r){this.hasEmptyBlock=t,this.trackByFn=e,this.liveCollection=r}};function Xu(n,t,e,r,i,o,s,a,l,c,u,d,f){Nr("NgControlFlow");let p=$(),m=ke(),v=l!==void 0,I=$(),R=a?s.bind(I[Rt][He]):s,te=new _m(v,R);I[xe+n]=te,as(p,m,n+1,t,e,r,i,Qt(m.consts,o),256),v&&as(p,m,n+2,l,c,u,d,Qt(m.consts,f),512)}var Cm=class extends ym{lContainer;hostLView;templateTNode;operationsCounter=void 0;needsIndexUpdate=!1;constructor(t,e,r){super(),this.lContainer=t,this.hostLView=e,this.templateTNode=r}get length(){return this.lContainer.length-je}at(t){return this.getLView(t)[He].$implicit}attach(t,e){let r=e[Wi];this.needsIndexUpdate||=t!==this.length,ja(this.lContainer,e,t,ss(this.templateTNode,r)),MR(this.lContainer,t)}detach(t){return this.needsIndexUpdate||=t!==this.length-1,xR(this.lContainer,t),RR(this.lContainer,t)}create(t,e){let r=Tu(this.lContainer,this.templateTNode.tView.ssrId);return Ba(this.hostLView,this.templateTNode,new bm(this.lContainer,e,t),{dehydratedView:r})}destroy(t){Vu(t[L],t)}updateValue(t,e){this.getLView(t)[He].$implicit=e}reset(){this.needsIndexUpdate=!1}updateIndexes(){if(this.needsIndexUpdate)for(let t=0;t<this.length;t++)this.getLView(t)[He].$index=t}getLView(t){return AR(this.lContainer,t)}};function Qu(n){let t=O(null),e=kr();try{let r=$(),i=r[L],o=r[e],s=e+1,a=Ou(r,s);if(o.liveCollection===void 0){let c=Em(i,s);o.liveCollection=new Cm(a,r,c)}else o.liveCollection.reset();let l=o.liveCollection;if(IR(l,n,o.trackByFn,t),l.updateIndexes(),o.hasEmptyBlock){let c=Qi(),u=l.length===0;if(Bn(r,c,u)){let d=e+2,f=Ou(r,d);if(u){let p=Em(i,d),m=RE(f,p,r),v=Ba(r,p,void 0,{dehydratedView:m});ja(f,v,0,ss(p,m))}else i.firstUpdatePass&&wx(f),ME(f,0)}}}finally{O(t)}}function Ou(n,t){return n[t]}function MR(n,t){if(n.length<=je)return;let e=je+t,r=n[e],i=r?r[ui]:void 0;if(r&&i&&i.detachedLeaveAnimationFns&&i.detachedLeaveAnimationFns.length>0){let o=r[xr];k0(o,i),no.delete(r[Rr]),i.detachedLeaveAnimationFns=void 0}}function xR(n,t){if(n.length<=je)return;let e=je+t,r=n[e],i=r?r[ui]:void 0;i&&i.leave&&i.leave.size>0&&(i.detachedLeaveAnimationFns=[])}function RR(n,t){return Oa(n,t)}function AR(n,t){return IE(n,t)}function Em(n,t){return eu(n,t)}function ct(n,t,e){let r=$(),i=Qi();if(Bn(r,i,t)){let o=ke(),s=lu();Z0(s,r,n,t,r[Ie],e)}return ct}function Dm(n,t,e,r,i){Hu(t,n,e,i?"class":"style",r)}function w(n,t,e,r){let i=$(),o=i[L],s=n+xe,a=o.firstCreatePass?PE(s,i,2,t,hE,Cp(),e,r):o.data[s];if(ir(a)){let l=i[nr].tracingService;if(l&&l.componentCreate){let c=o.data[a.directiveStart+a.componentOffset];return l.componentCreate($E(c),()=>(hC(n,t,i,a,r),w))}}return hC(n,t,i,a,r),w}function hC(n,t,e,r,i){if(mE(r,e,n,t,JE),Ea(r)){let o=e[L];Um(o,e,r),WC(o,r,e)}i!=null&&$u(e,r)}function S(){let n=ke(),t=vt(),e=gE(t);return n.firstCreatePass&&LE(n,e),Dp(e)&&wp(),_p(),e.classesWithoutHost!=null&&FM(e)&&Dm(n,e,$(),e.classesWithoutHost,!0),e.stylesWithoutHost!=null&&BM(e)&&Dm(n,e,$(),e.stylesWithoutHost,!1),S}function Ue(n,t,e,r){return w(n,t,e,r),S(),Ue}function yi(n,t,e,r){let i=$(),o=i[L],s=n+xe,a=o.firstCreatePass?Bx(s,o,2,t,e,r):o.data[s];return mE(a,i,n,t,JE),r!=null&&$u(i,a),yi}function so(){let n=vt(),t=gE(n);return Dp(t)&&wp(),_p(),so}function Ju(n,t,e,r){return yi(n,t,e,r),so(),Ju}var JE=(n,t,e,r,i)=>(uu(!0),GC(t[Ie],r,P_()));function gn(){return $()}var Ia=void 0;function kR(n){let t=Math.floor(Math.abs(n)),e=n.toString().replace(/^[^.]*\.?/,"").length;return t===1&&e===0?1:5}var OR=["en",[["a","p"],["AM","PM"]],[["AM","PM"]],[["S","M","T","W","T","F","S"],["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],["Su","Mo","Tu","We","Th","Fr","Sa"]],Ia,[["J","F","M","A","M","J","J","A","S","O","N","D"],["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],["January","February","March","April","May","June","July","August","September","October","November","December"]],Ia,[["B","A"],["BC","AD"],["Before Christ","Anno Domini"]],0,[6,0],["M/d/yy","MMM d, y","MMMM d, y","EEEE, MMMM d, y"],["h:mm\u202Fa","h:mm:ss\u202Fa","h:mm:ss\u202Fa z","h:mm:ss\u202Fa zzzz"],["{1}, {0}",Ia,Ia,Ia],[".",",",";","%","+","-","E","\xD7","\u2030","\u221E","NaN",":"],["#,##0.###","#,##0%","\xA4#,##0.00","#E0"],"USD","$","US Dollar",{},"ltr",kR],qp={};function Ut(n){let t=NR(n),e=pC(t);if(e)return e;let r=t.split("-")[0];if(e=pC(r),e)return e;if(r==="en")return OR;throw new T(701,!1)}function pC(n){return n in qp||(qp[n]=$i.ng&&$i.ng.common&&$i.ng.common.locales&&$i.ng.common.locales[n]),qp[n]}var $e=(function(n){return n[n.LocaleId=0]="LocaleId",n[n.DayPeriodsFormat=1]="DayPeriodsFormat",n[n.DayPeriodsStandalone=2]="DayPeriodsStandalone",n[n.DaysFormat=3]="DaysFormat",n[n.DaysStandalone=4]="DaysStandalone",n[n.MonthsFormat=5]="MonthsFormat",n[n.MonthsStandalone=6]="MonthsStandalone",n[n.Eras=7]="Eras",n[n.FirstDayOfWeek=8]="FirstDayOfWeek",n[n.WeekendRange=9]="WeekendRange",n[n.DateFormat=10]="DateFormat",n[n.TimeFormat=11]="TimeFormat",n[n.DateTimeFormat=12]="DateTimeFormat",n[n.NumberSymbols=13]="NumberSymbols",n[n.NumberFormats=14]="NumberFormats",n[n.CurrencyCode=15]="CurrencyCode",n[n.CurrencySymbol=16]="CurrencySymbol",n[n.CurrencyName=17]="CurrencyName",n[n.Currencies=18]="Currencies",n[n.Directionality=19]="Directionality",n[n.PluralCase=20]="PluralCase",n[n.ExtraData=21]="ExtraData",n})($e||{});function NR(n){return n.toLowerCase().replace(/_/g,"-")}var Ha="en-US";var PR=Ha;function eD(n){typeof n=="string"&&(PR=n.toLowerCase().replace(/_/g,"-"))}function Oe(n,t,e){let r=$(),i=ke(),o=vt();return LR(i,r,r[Ie],o,n,t,e),Oe}function ed(n,t,e){let r=$(),i=ke(),o=vt();return(o.type&3||e)&&VE(o,i,r,e,r[Ie],n,t,yu(o,r,t)),ed}function LR(n,t,e,r,i,o,s){let a=!0,l=null;if((r.type&3||s)&&(l??=yu(r,t,o),VE(r,n,t,s,e,i,o,l)&&(a=!1)),a){let c=r.outputs?.[i],u=r.hostDirectiveOutputs?.[i];if(u&&u.length)for(let d=0;d<u.length;d+=2){let f=u[d],p=u[d+1];l??=yu(r,t,o),aC(r,t,f,p,i,l)}if(c&&c.length)for(let d of c)l??=yu(r,t,o),aC(r,t,d,i,i,l)}}function ve(n=1){return N_(n)}function FR(n,t){let e=null,r=y0(n);for(let i=0;i<t.length;i++){let o=t[i];if(o==="*"){e=i;continue}if(r===null?QC(n,o,!0):_0(r,o))return i}return e}function ao(n){let t=$()[Rt][xt];if(!t.projection){let e=n?n.length:1,r=t.projection=a_(e,null),i=r.slice(),o=t.child;for(;o!==null;){if(o.type!==128){let s=n?FR(o,n):0;s!==null&&(i[s]?i[s].projectionNext=o:r[s]=o,i[s]=o)}o=o.next}}}function lo(n,t=0,e,r,i,o){let s=$(),a=ke(),l=r?n+1:null;l!==null&&as(s,a,l,r,i,o,null,e);let c=ds(a,xe+n,16,null,e||null);c.projection===null&&(c.projection=t),Ip();let d=!s[Wi]||Ep();s[Rt][xt].projection[c.projection]===null&&l!==null?BR(s,a,l):d&&!Fu(c)&&H0(a,s,c)}function BR(n,t,e){let r=xe+e,i=t.data[r],o=n[r],s=Tu(o,i.tView.ssrId),a=Ba(n,i,void 0,{dehydratedView:s});ja(o,a,0,ss(i,s))}function ps(n,t,e,r){return lR(n,t,e,r),ps}function Un(n,t,e){return aR(n,t,e),Un}function ze(n){let t=$(),e=ke(),r=Ap();ou(r+1);let i=Gm(e,r);if(n.dirty&&y_(t)===((i.metadata.flags&2)===2)){if(i.matches===null)n.reset([]);else{let o=dR(t,r);n.reset(o,XM),n.notifyOnChanges()}return!0}return!1}function We(){return sR($(),Ap())}function td(n){let t=T_();return tu(t,xe+n)}function fu(n,t){return n<<17|t<<2}function io(n){return n>>17&32767}function jR(n){return(n&2)==2}function VR(n,t){return n&131071|t<<17}function wm(n){return n|2}function ls(n){return(n&131068)>>2}function Kp(n,t){return n&-131069|t<<2}function UR(n){return(n&1)===1}function Tm(n){return n|1}function $R(n,t,e,r,i,o){let s=o?t.classBindings:t.styleBindings,a=io(s),l=ls(s);n[r]=e;let c=!1,u;if(Array.isArray(e)){let d=e;u=d[1],(u===null||Zo(d,u)>0)&&(c=!0)}else u=e;if(i)if(l!==0){let f=io(n[a+1]);n[r+1]=fu(f,a),f!==0&&(n[f+1]=Kp(n[f+1],r)),n[a+1]=VR(n[a+1],r)}else n[r+1]=fu(a,0),a!==0&&(n[a+1]=Kp(n[a+1],r)),a=r;else n[r+1]=fu(l,0),a===0?a=r:n[l+1]=Kp(n[l+1],r),l=r;c&&(n[r+1]=wm(n[r+1])),mC(n,u,r,!0),mC(n,u,r,!1),HR(t,u,n,r,o),s=fu(a,l),o?t.classBindings=s:t.styleBindings=s}function HR(n,t,e,r,i){let o=i?n.residualClasses:n.residualStyles;o!=null&&typeof t=="string"&&Zo(o,t)>=0&&(e[r+1]=Tm(e[r+1]))}function mC(n,t,e,r){let i=n[e+1],o=t===null,s=r?io(i):ls(i),a=!1;for(;s!==0&&(a===!1||o);){let l=n[s],c=n[s+1];zR(l,t)&&(a=!0,n[s+1]=r?Tm(c):wm(c)),s=r?io(c):ls(c)}a&&(n[e+1]=r?wm(i):Tm(i))}function zR(n,t){return n===null||t==null||(Array.isArray(n)?n[1]:n)===t?!0:Array.isArray(n)&&typeof t=="string"?Zo(n,t)>=0:!1}var Ln={textEnd:0,key:0,keyEnd:0,value:0,valueEnd:0};function WR(n){return n.substring(Ln.key,Ln.keyEnd)}function GR(n){return qR(n),tD(n,nD(n,0,Ln.textEnd))}function tD(n,t){let e=Ln.textEnd;return e===t?-1:(t=Ln.keyEnd=KR(n,Ln.key=t,e),nD(n,t,e))}function qR(n){Ln.key=0,Ln.keyEnd=0,Ln.value=0,Ln.valueEnd=0,Ln.textEnd=n.length}function nD(n,t,e){for(;t<e&&n.charCodeAt(t)<=32;)t++;return t}function KR(n,t,e){for(;t<e&&n.charCodeAt(t)>32;)t++;return t}function ms(n,t,e){return rD(n,t,e,!1),ms}function Ge(n,t){return rD(n,t,null,!0),Ge}function Pr(n){ZR(nA,YR,n,!0)}function YR(n,t){for(let e=GR(t);e>=0;e=tD(t,e))Xc(n,WR(t),!0)}function rD(n,t,e,r){let i=$(),o=ke(),s=Rp(2);if(o.firstUpdatePass&&oD(o,n,s,r),t!==pn&&Bn(i,s,t)){let a=o.data[kr()];sD(o,a,i,i[Ie],n,i[s+1]=iA(t,e),r,s)}}function ZR(n,t,e,r){let i=ke(),o=Rp(2);i.firstUpdatePass&&oD(i,null,o,r);let s=$();if(e!==pn&&Bn(s,o,e)){let a=i.data[kr()];if(aD(a,r)&&!iD(i,o)){let l=r?a.classesWithoutHost:a.stylesWithoutHost;l!==null&&(e=Gc(l,e||"")),Dm(i,a,s,e,r)}else rA(i,a,s,s[Ie],s[o+1],s[o+1]=tA(n,t,e),r,o)}}function iD(n,t){return t>=n.expandoStartIndex}function oD(n,t,e,r){let i=n.data;if(i[e+1]===null){let o=i[kr()],s=iD(n,e);aD(o,r)&&t===null&&!s&&(t=!1),t=XR(i,o,t,r),$R(i,o,t,e,s,r)}}function XR(n,t,e,r){let i=R_(n),o=r?t.residualClasses:t.residualStyles;if(i===null)(r?t.classBindings:t.styleBindings)===0&&(e=Yp(null,n,t,e,r),e=Pa(e,t.attrs,r),o=null);else{let s=t.directiveStylingLast;if(s===-1||n[s]!==i)if(e=Yp(i,n,t,e,r),o===null){let l=QR(n,t,r);l!==void 0&&Array.isArray(l)&&(l=Yp(null,n,t,l[1],r),l=Pa(l,t.attrs,r),JR(n,t,r,l))}else o=eA(n,t,r)}return o!==void 0&&(r?t.residualClasses=o:t.residualStyles=o),e}function QR(n,t,e){let r=e?t.classBindings:t.styleBindings;if(ls(r)!==0)return n[io(r)]}function JR(n,t,e,r){let i=e?t.classBindings:t.styleBindings;n[io(i)]=r}function eA(n,t,e){let r,i=t.directiveEnd;for(let o=1+t.directiveStylingLast;o<i;o++){let s=n[o].hostAttrs;r=Pa(r,s,e)}return Pa(r,t.attrs,e)}function Yp(n,t,e,r,i){let o=null,s=e.directiveEnd,a=e.directiveStylingLast;for(a===-1?a=e.directiveStart:a++;a<s&&(o=t[a],r=Pa(r,o.hostAttrs,i),o!==n);)a++;return n!==null&&(e.directiveStylingLast=a),r}function Pa(n,t,e){let r=e?1:2,i=-1;if(t!==null)for(let o=0;o<t.length;o++){let s=t[o];typeof s=="number"?i=s:i===r&&(Array.isArray(n)||(n=n===void 0?[]:["",n]),Xc(n,s,e?!0:t[++o]))}return n===void 0?null:n}function tA(n,t,e){if(e==null||e==="")return Mt;let r=[],i=Am(e);if(Array.isArray(i))for(let o=0;o<i.length;o++)n(r,i[o],!0);else if(i instanceof Set)for(let o of i)n(r,o,!0);else if(typeof i=="object")for(let o in i)i.hasOwnProperty(o)&&n(r,o,i[o]);else typeof i=="string"&&t(r,i);return r}function nA(n,t,e){let r=String(t);r!==""&&!r.includes(" ")&&Xc(n,r,e)}function rA(n,t,e,r,i,o,s,a){i===pn&&(i=Mt);let l=0,c=0,u=0<i.length?i[0]:null,d=0<o.length?o[0]:null;for(;u!==null||d!==null;){let f=l<i.length?i[l+1]:void 0,p=c<o.length?o[c+1]:void 0,m=null,v;u===d?(l+=2,c+=2,f!==p&&(m=d,v=p)):d===null||u!==null&&u<d?(l+=2,m=u):(c+=2,m=d,v=p),m!==null&&sD(n,t,e,r,m,v,s,a),u=l<i.length?i[l]:null,d=c<o.length?o[c]:null}}function sD(n,t,e,r,i,o,s,a){if(!(t.type&3))return;let l=n.data,c=l[a+1],u=UR(c)?gC(l,t,e,i,ls(c),s):void 0;if(!Nu(u)){Nu(o)||jR(c)&&(o=gC(l,null,e,i,a,s));let d=hp(kr(),e);W0(r,s,d,i,o)}}function gC(n,t,e,r,i,o){let s=t===null,a;for(;i>0;){let l=n[i],c=Array.isArray(l),u=c?l[1]:l,d=u===null,f=e[i+1];f===pn&&(f=d?Mt:void 0);let p=d?Qc(f,r):u===r?f:void 0;if(c&&!Nu(p)&&(p=Qc(l,r)),Nu(p)&&(a=p,s))return a;let m=n[i+1];i=s?io(m):ls(m)}if(t!==null){let l=o?t.residualClasses:t.residualStyles;l!=null&&(a=Qc(l,r))}return a}function Nu(n){return n!==void 0}function iA(n,t){return n==null||n===""||(typeof t=="string"?n=n+t:typeof n=="object"&&(n=ya(Am(n)))),n}function aD(n,t){return(n.flags&(t?8:16))!==0}function B(n,t=""){let e=$(),r=ke(),i=n+xe,o=r.firstCreatePass?ds(r,i,1,t,null):r.data[i],s=oA(r,e,o,t);e[i]=s,cu()&&jm(r,e,s,o),ts(o,!1)}var oA=(n,t,e,r)=>(uu(!0),l0(t[Ie],r));function lD(n,t,e,r=""){return Bn(n,Qi(),e)?t+Jh(e)+r:pn}function $t(n){return ut("",n),$t}function ut(n,t,e){let r=$(),i=lD(r,n,t,e);return i!==pn&&sA(r,kr(),i),ut}function sA(n,t,e){let r=hp(t,n);c0(n[Ie],r,e)}function Jm(n,t,e=""){return lD($(),n,t,e)}function yC(n,t,e){let r=ke();r.firstCreatePass&&cD(t,r.data,r.blueprint,or(n),e)}function cD(n,t,e,r,i){if(n=at(n),Array.isArray(n))for(let o=0;o<n.length;o++)cD(n[o],t,e,r,i);else{let o=ke(),s=$(),a=vt(),l=Vi(n)?n:at(n.provide),c=ap(n),u=a.providerIndexes&1048575,d=a.directiveStart,f=a.providerIndexes>>20;if(Vi(n)||!n.multi){let p=new to(c,i,ur,null),m=Xp(l,t,i?u:u+f,d);m===-1?(Jp(Eu(a,s),o,l),Zp(o,n,t.length),t.push(l),a.directiveStart++,a.directiveEnd++,i&&(a.providerIndexes+=1048576),e.push(p),s.push(p)):(e[m]=p,s[m]=p)}else{let p=Xp(l,t,u+f,d),m=Xp(l,t,u,u+f),v=p>=0&&e[p],I=m>=0&&e[m];if(i&&!I||!i&&!v){Jp(Eu(a,s),o,l);let R=cA(i?lA:aA,e.length,i,r,c,n);!i&&I&&(e[m].providerFactory=R),Zp(o,n,t.length,0),t.push(l),a.directiveStart++,a.directiveEnd++,i&&(a.providerIndexes+=1048576),e.push(R),s.push(R)}else{let R=uD(e[i?m:p],c,!i&&r);Zp(o,n,p>-1?p:m,R)}!i&&r&&I&&e[m].componentProviders++}}}function Zp(n,t,e,r){let i=Vi(t),o=h_(t);if(i||o){let l=(o?at(t.useClass):t).prototype.ngOnDestroy;if(l){let c=n.destroyHooks||(n.destroyHooks=[]);if(!i&&t.multi){let u=c.indexOf(e);u===-1?c.push(e,[r,l]):c[u+1].push(r,l)}else c.push(e,l)}}}function uD(n,t,e){return e&&n.componentProviders++,n.multi.push(t)-1}function Xp(n,t,e,r){for(let i=e;i<r;i++)if(t[i]===n)return i;return-1}function aA(n,t,e,r,i){return Sm(this.multi,[])}function lA(n,t,e,r,i){let o=this.multi,s;if(this.providerFactory){let a=this.providerFactory.componentProviders,l=Aa(r,r[L],this.providerFactory.index,i);s=l.slice(0,a),Sm(o,s);for(let c=a;c<l.length;c++)s.push(l[c])}else s=[],Sm(o,s);return s}function Sm(n,t){for(let e=0;e<n.length;e++){let r=n[e];t.push(r())}return t}function cA(n,t,e,r,i,o){let s=new to(n,e,ur,null);return s.multi=[],s.index=t,s.componentProviders=0,uD(s,i,r&&!e),s}function fr(n,t){return e=>{e.providersResolver=(r,i)=>yC(r,i?i(n):n,!1),t&&(e.viewProvidersResolver=(r,i)=>yC(r,i?i(t):t,!0))}}function dD(n,t){let e=n[t];return e===pn?void 0:e}function uA(n,t,e,r,i,o){let s=t+e;return Bn(n,s,i)?jE(n,s+1,o?r.call(o,i):r(i)):dD(n,s+1)}function dA(n,t,e,r,i,o,s){let a=t+e;return jx(n,a,i,o)?jE(n,a+2,s?r.call(s,i,o):r(i,o)):dD(n,a+2)}function Lr(n,t){let e=ke(),r,i=n+xe;e.firstCreatePass?(r=fA(t,e.pipeRegistry),e.data[i]=r,r.onDestroy&&(e.destroyHooks??=[]).push(i,r.onDestroy)):r=e.data[i];let o=r.factory||(r.factory=ni(r.type,!0)),s,a=It(ur);try{let l=Cu(!1),c=o();return Cu(l),pp(e,$(),i,c),c}finally{It(a)}}function fA(n,t){if(t)for(let e=t.length-1;e>=0;e--){let r=t[e];if(n===r.name)return r}}function co(n,t,e){let r=n+xe,i=$(),o=tu(i,r);return fD(i,r)?uA(i,xp(),t,o.transform,e,o):o.transform(e)}function nd(n,t,e,r){let i=n+xe,o=$(),s=tu(o,i);return fD(o,i)?dA(o,xp(),t,s.transform,e,r,s):s.transform(e,r)}function fD(n,t){return n[L].data[t].pure}var Pu=class{ngModuleFactory;componentFactories;constructor(t,e){this.ngModuleFactory=t,this.componentFactories=e}},eg=(()=>{class n{compileModuleSync(e){return new Au(e)}compileModuleAsync(e){return Promise.resolve(this.compileModuleSync(e))}compileModuleAndAllComponentsSync(e){let r=this.compileModuleSync(e),i=Xh(e),o=ZC(i.declarations).reduce((s,a)=>{let l=Mr(a);return l&&s.push(new ro(l)),s},[]);return new Pu(r,o)}compileModuleAndAllComponentsAsync(e){return Promise.resolve(this.compileModuleAndAllComponentsSync(e))}clearCache(){}clearCacheFor(e){}getModuleId(e){}static \u0275fac=function(r){return new(r||n)};static \u0275prov=y({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})();var hD=(()=>{class n{applicationErrorHandler=h(Nn);appRef=h(mn);taskService=h(hi);ngZone=h(V);zonelessEnabled=h(Sa);tracing=h(gi,{optional:!0});zoneIsDefined=typeof Zone<"u"&&!!Zone.root.run;schedulerTickApplyArgs=[{data:{__scheduler_tick__:!0}}];subscriptions=new Z;angularZoneId=this.zoneIsDefined?this.ngZone._inner?.get(ma):null;scheduleInRootZone=!this.zonelessEnabled&&this.zoneIsDefined&&(h(Vp,{optional:!0})??!1);cancelScheduledCallback=null;useMicrotaskScheduler=!1;runningTick=!1;pendingRenderTaskId=null;constructor(){this.subscriptions.add(this.appRef.afterTick.subscribe(()=>{let e=this.taskService.add();if(!this.runningTick&&(this.cleanup(),!this.zonelessEnabled||this.appRef.includeAllTestViews)){this.taskService.remove(e);return}this.switchToMicrotaskScheduler(),this.taskService.remove(e)})),this.subscriptions.add(this.ngZone.onUnstable.subscribe(()=>{this.runningTick||this.cleanup()}))}switchToMicrotaskScheduler(){this.ngZone.runOutsideAngular(()=>{let e=this.taskService.add();this.useMicrotaskScheduler=!0,queueMicrotask(()=>{this.useMicrotaskScheduler=!1,this.taskService.remove(e)})})}notify(e){if(!this.zonelessEnabled&&e===5)return;switch(e){case 0:{this.appRef.dirtyFlags|=2;break}case 3:case 2:case 4:case 5:case 1:{this.appRef.dirtyFlags|=4;break}case 6:{this.appRef.dirtyFlags|=2;break}case 12:{this.appRef.dirtyFlags|=16;break}case 13:{this.appRef.dirtyFlags|=2;break}case 11:break;default:this.appRef.dirtyFlags|=8}if(this.appRef.tracingSnapshot=this.tracing?.snapshot(this.appRef.tracingSnapshot)??null,!this.shouldScheduleTick())return;let r=this.useMicrotaskScheduler?j_:Pp;this.pendingRenderTaskId=this.taskService.add(),this.scheduleInRootZone?this.cancelScheduledCallback=Zone.root.run(()=>r(()=>this.tick())):this.cancelScheduledCallback=this.ngZone.runOutsideAngular(()=>r(()=>this.tick()))}shouldScheduleTick(){return!(this.appRef.destroyed||this.pendingRenderTaskId!==null||this.runningTick||this.appRef._runningTick||!this.zonelessEnabled&&this.zoneIsDefined&&Zone.current.get(ma+this.angularZoneId))}tick(){if(this.runningTick||this.appRef.destroyed)return;if(this.appRef.dirtyFlags===0){this.cleanup();return}!this.zonelessEnabled&&this.appRef.dirtyFlags&7&&(this.appRef.dirtyFlags|=1);let e=this.taskService.add();try{this.ngZone.run(()=>{this.runningTick=!0,this.appRef._tick()},void 0,this.schedulerTickApplyArgs)}catch(r){this.applicationErrorHandler(r)}finally{this.taskService.remove(e),this.cleanup()}}ngOnDestroy(){this.subscriptions.unsubscribe(),this.cleanup()}cleanup(){if(this.runningTick=!1,this.cancelScheduledCallback?.(),this.cancelScheduledCallback=null,this.pendingRenderTaskId!==null){let e=this.pendingRenderTaskId;this.pendingRenderTaskId=null,this.taskService.remove(e)}}static \u0275fac=function(r){return new(r||n)};static \u0275prov=y({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})();function tg(){return Nr("NgZoneless"),li([...ng(),[]])}function ng(){return[{provide:oi,useExisting:hD},{provide:V,useClass:ga},{provide:Sa,useValue:!0}]}function hA(){return typeof $localize<"u"&&$localize.locale||Ha}var gs=new b("",{factory:()=>h(gs,{optional:!0,skipSelf:!0})||hA()});var rd=class{destroyed=!1;listeners=null;errorHandler=h(ln,{optional:!0});destroyRef=h(Ke);constructor(){this.destroyRef.onDestroy(()=>{this.destroyed=!0,this.listeners=null})}subscribe(t){if(this.destroyed)throw new T(953,!1);return(this.listeners??=[]).push(t),{unsubscribe:()=>{let e=this.listeners?.indexOf(t);e!==void 0&&e!==-1&&this.listeners?.splice(e,1)}}}emit(t){if(this.destroyed){console.warn(si(953,!1));return}if(this.listeners===null)return;let e=O(null);try{for(let r of this.listeners)try{r(t)}catch(i){this.errorHandler?.handleError(i)}}finally{O(e)}}};function $n(n){return Yb(n)}function Ct(n,t){return sc(n,t?.equal)}var yD=Symbol("InputSignalNode#UNSET"),IA=Y(g({},ac),{transformFn:void 0,applyValueToInputSignal(n,t){Bo(n,t)}});function vD(n,t){let e=Object.create(IA);e.value=n,e.transformFn=t?.transform;function r(){if(Po(e),e.value===yD){let i=null;throw new T(-950,i)}return e.value}return r[mt]=e,r}function sd(n){return new rd}function pD(n,t){return vD(n,t)}function MA(n){return vD(yD,n)}var hr=(pD.required=MA,pD);var rg=new b(""),xA=new b("");function za(n){return!n.moduleRef}function RA(n){let t=za(n)?n.r3Injector:n.moduleRef.injector,e=t.get(V);return e.run(()=>{za(n)?n.r3Injector.resolveInjectorInitializers():n.moduleRef.resolveInjectorInitializers();let r=t.get(Nn),i;if(e.runOutsideAngular(()=>{i=e.onError.subscribe({next:r})}),za(n)){let o=()=>t.destroy(),s=n.platformInjector.get(rg);s.add(o),t.onDestroy(()=>{i.unsubscribe(),s.delete(o)})}else{let o=()=>n.moduleRef.destroy(),s=n.platformInjector.get(rg);s.add(o),n.moduleRef.onDestroy(()=>{Ra(n.allPlatformModules,n.moduleRef),i.unsubscribe(),s.delete(o)})}return kA(r,e,()=>{let o=t.get(hi),s=o.add(),a=t.get(Xm);return a.runInitializers(),a.donePromise.then(()=>{let l=t.get(gs,Ha);if(eD(l||Ha),!t.get(xA,!0))return za(n)?t.get(mn):(n.allPlatformModules.push(n.moduleRef),n.moduleRef);if(za(n)){let u=t.get(mn);return n.rootComponent!==void 0&&u.bootstrap(n.rootComponent),u}else return AA?.(n.moduleRef,n.allPlatformModules),n.moduleRef}).finally(()=>{o.remove(s)})})})}var AA;function kA(n,t,e){try{let r=e();return hs(r)?r.catch(i=>{throw t.runOutsideAngular(()=>n(i)),i}):r}catch(r){throw t.runOutsideAngular(()=>n(r)),r}}var id=null;function OA(n=[],t){return re.create({name:t,providers:[{provide:_a,useValue:"platform"},{provide:rg,useValue:new Set([()=>id=null])},...n]})}function NA(n=[]){if(id)return id;let t=OA(n);return id=t,XE(),PA(t),t}function PA(n){let t=n.get(Lu,null);yt(n,()=>{t?.forEach(e=>e())})}var LA=1e4;var cq=LA-1e3;var Hn=(()=>{class n{static __NG_ELEMENT_ID__=FA}return n})();function FA(n){return BA(vt(),$(),(n&16)===16)}function BA(n,t,e){if(ir(n)&&!e){let r=fn(n.index,t);return new pi(r,r)}else if(n.type&175){let r=t[Rt];return new pi(r,t)}return null}var ig=class{supports(t){return Wm(t)}create(t){return new og(t)}},jA=(n,t)=>t,og=class{length=0;collection;_linkedRecords=null;_unlinkedRecords=null;_previousItHead=null;_itHead=null;_itTail=null;_additionsHead=null;_additionsTail=null;_movesHead=null;_movesTail=null;_removalsHead=null;_removalsTail=null;_identityChangesHead=null;_identityChangesTail=null;_trackByFn;constructor(t){this._trackByFn=t||jA}forEachItem(t){let e;for(e=this._itHead;e!==null;e=e._next)t(e)}forEachOperation(t){let e=this._itHead,r=this._removalsHead,i=0,o=null;for(;e||r;){let s=!r||e&&e.currentIndex<mD(r,i,o)?e:r,a=mD(s,i,o),l=s.currentIndex;if(s===r)i--,r=r._nextRemoved;else if(e=e._next,s.previousIndex==null)i++;else{o||(o=[]);let c=a-i,u=l-i;if(c!=u){for(let f=0;f<c;f++){let p=f<o.length?o[f]:o[f]=0,m=p+f;u<=m&&m<c&&(o[f]=p+1)}let d=s.previousIndex;o[d]=u-c}}a!==l&&t(s,a,l)}}forEachPreviousItem(t){let e;for(e=this._previousItHead;e!==null;e=e._nextPrevious)t(e)}forEachAddedItem(t){let e;for(e=this._additionsHead;e!==null;e=e._nextAdded)t(e)}forEachMovedItem(t){let e;for(e=this._movesHead;e!==null;e=e._nextMoved)t(e)}forEachRemovedItem(t){let e;for(e=this._removalsHead;e!==null;e=e._nextRemoved)t(e)}forEachIdentityChange(t){let e;for(e=this._identityChangesHead;e!==null;e=e._nextIdentityChange)t(e)}diff(t){if(t==null&&(t=[]),!Wm(t))throw new T(900,!1);return this.check(t)?this:null}onDestroy(){}check(t){this._reset();let e=this._itHead,r=!1,i,o,s;if(Array.isArray(t)){this.length=t.length;for(let a=0;a<this.length;a++)o=t[a],s=this._trackByFn(a,o),e===null||!Object.is(e.trackById,s)?(e=this._mismatch(e,o,s,a),r=!0):(r&&(e=this._verifyReinsertion(e,o,s,a)),Object.is(e.item,o)||this._addIdentityChange(e,o)),e=e._next}else i=0,FE(t,a=>{s=this._trackByFn(i,a),e===null||!Object.is(e.trackById,s)?(e=this._mismatch(e,a,s,i),r=!0):(r&&(e=this._verifyReinsertion(e,a,s,i)),Object.is(e.item,a)||this._addIdentityChange(e,a)),e=e._next,i++}),this.length=i;return this._truncate(e),this.collection=t,this.isDirty}get isDirty(){return this._additionsHead!==null||this._movesHead!==null||this._removalsHead!==null||this._identityChangesHead!==null}_reset(){if(this.isDirty){let t;for(t=this._previousItHead=this._itHead;t!==null;t=t._next)t._nextPrevious=t._next;for(t=this._additionsHead;t!==null;t=t._nextAdded)t.previousIndex=t.currentIndex;for(this._additionsHead=this._additionsTail=null,t=this._movesHead;t!==null;t=t._nextMoved)t.previousIndex=t.currentIndex;this._movesHead=this._movesTail=null,this._removalsHead=this._removalsTail=null,this._identityChangesHead=this._identityChangesTail=null}}_mismatch(t,e,r,i){let o;return t===null?o=this._itTail:(o=t._prev,this._remove(t)),t=this._unlinkedRecords===null?null:this._unlinkedRecords.get(r,null),t!==null?(Object.is(t.item,e)||this._addIdentityChange(t,e),this._reinsertAfter(t,o,i)):(t=this._linkedRecords===null?null:this._linkedRecords.get(r,i),t!==null?(Object.is(t.item,e)||this._addIdentityChange(t,e),this._moveAfter(t,o,i)):t=this._addAfter(new sg(e,r),o,i)),t}_verifyReinsertion(t,e,r,i){let o=this._unlinkedRecords===null?null:this._unlinkedRecords.get(r,null);return o!==null?t=this._reinsertAfter(o,t._prev,i):t.currentIndex!=i&&(t.currentIndex=i,this._addToMoves(t,i)),t}_truncate(t){for(;t!==null;){let e=t._next;this._addToRemovals(this._unlink(t)),t=e}this._unlinkedRecords!==null&&this._unlinkedRecords.clear(),this._additionsTail!==null&&(this._additionsTail._nextAdded=null),this._movesTail!==null&&(this._movesTail._nextMoved=null),this._itTail!==null&&(this._itTail._next=null),this._removalsTail!==null&&(this._removalsTail._nextRemoved=null),this._identityChangesTail!==null&&(this._identityChangesTail._nextIdentityChange=null)}_reinsertAfter(t,e,r){this._unlinkedRecords!==null&&this._unlinkedRecords.remove(t);let i=t._prevRemoved,o=t._nextRemoved;return i===null?this._removalsHead=o:i._nextRemoved=o,o===null?this._removalsTail=i:o._prevRemoved=i,this._insertAfter(t,e,r),this._addToMoves(t,r),t}_moveAfter(t,e,r){return this._unlink(t),this._insertAfter(t,e,r),this._addToMoves(t,r),t}_addAfter(t,e,r){return this._insertAfter(t,e,r),this._additionsTail===null?this._additionsTail=this._additionsHead=t:this._additionsTail=this._additionsTail._nextAdded=t,t}_insertAfter(t,e,r){let i=e===null?this._itHead:e._next;return t._next=i,t._prev=e,i===null?this._itTail=t:i._prev=t,e===null?this._itHead=t:e._next=t,this._linkedRecords===null&&(this._linkedRecords=new od),this._linkedRecords.put(t),t.currentIndex=r,t}_remove(t){return this._addToRemovals(this._unlink(t))}_unlink(t){this._linkedRecords!==null&&this._linkedRecords.remove(t);let e=t._prev,r=t._next;return e===null?this._itHead=r:e._next=r,r===null?this._itTail=e:r._prev=e,t}_addToMoves(t,e){return t.previousIndex===e||(this._movesTail===null?this._movesTail=this._movesHead=t:this._movesTail=this._movesTail._nextMoved=t),t}_addToRemovals(t){return this._unlinkedRecords===null&&(this._unlinkedRecords=new od),this._unlinkedRecords.put(t),t.currentIndex=null,t._nextRemoved=null,this._removalsTail===null?(this._removalsTail=this._removalsHead=t,t._prevRemoved=null):(t._prevRemoved=this._removalsTail,this._removalsTail=this._removalsTail._nextRemoved=t),t}_addIdentityChange(t,e){return t.item=e,this._identityChangesTail===null?this._identityChangesTail=this._identityChangesHead=t:this._identityChangesTail=this._identityChangesTail._nextIdentityChange=t,t}},sg=class{item;trackById;currentIndex=null;previousIndex=null;_nextPrevious=null;_prev=null;_next=null;_prevDup=null;_nextDup=null;_prevRemoved=null;_nextRemoved=null;_nextAdded=null;_nextMoved=null;_nextIdentityChange=null;constructor(t,e){this.item=t,this.trackById=e}},ag=class{_head=null;_tail=null;add(t){this._head===null?(this._head=this._tail=t,t._nextDup=null,t._prevDup=null):(this._tail._nextDup=t,t._prevDup=this._tail,t._nextDup=null,this._tail=t)}get(t,e){let r;for(r=this._head;r!==null;r=r._nextDup)if((e===null||e<=r.currentIndex)&&Object.is(r.trackById,t))return r;return null}remove(t){let e=t._prevDup,r=t._nextDup;return e===null?this._head=r:e._nextDup=r,r===null?this._tail=e:r._prevDup=e,this._head===null}},od=class{map=new Map;put(t){let e=t.trackById,r=this.map.get(e);r||(r=new ag,this.map.set(e,r)),r.add(t)}get(t,e){let r=t,i=this.map.get(r);return i?i.get(t,e):null}remove(t){let e=t.trackById;return this.map.get(e).remove(t)&&this.map.delete(e),t}get isEmpty(){return this.map.size===0}clear(){this.map.clear()}};function mD(n,t,e){let r=n.previousIndex;if(r===null)return r;let i=0;return e&&r<e.length&&(i=e[r]),r+t+i}function gD(){return new ad([new ig])}var ad=(()=>{class n{factories;static \u0275prov=y({token:n,providedIn:"root",factory:gD});constructor(e){this.factories=e}static create(e,r){if(r!=null){let i=r.factories.slice();e=e.concat(i)}return new n(e)}static extend(e){return{provide:n,useFactory:()=>{let r=h(n,{optional:!0,skipSelf:!0});return n.create(e,r||gD())}}}find(e){let r=this.factories.find(i=>i.supports(e));if(r!=null)return r;throw new T(901,!1)}}return n})();function bD(n){let{rootComponent:t,appProviders:e,platformProviders:r,platformRef:i}=n;me(ae.BootstrapApplicationStart);try{let o=i?.injector??NA(r),s=[ng(),U_,...e||[]],a=new Na({providers:s,parent:o,debugName:"",runEnvironmentInitializers:!1});return RA({r3Injector:a.injector,platformInjector:o,rootComponent:t})}catch(o){return Promise.reject(o)}finally{me(ae.BootstrapApplicationEnd)}}function tt(n){return typeof n=="boolean"?n:n!=null&&n!=="false"}function ld(n,t=NaN){return!isNaN(parseFloat(n))&&!isNaN(Number(n))?Number(n):t}function cd(n,t){let e=Mr(n),r=t.elementInjector||Xo();return new ro(e).create(r,t.projectableNodes,t.hostElement,t.environmentInjector,t.directives,t.bindings)}var _D=null;function Fr(){return _D}function lg(n){_D??=n}var Ga=class{},uo=(()=>{class n{historyGo(e){throw new Error("")}static \u0275fac=function(r){return new(r||n)};static \u0275prov=y({token:n,factory:()=>h(CD),providedIn:"platform"})}return n})();var CD=(()=>{class n extends uo{_location;_history;_doc=h(Q);constructor(){super(),this._location=window.location,this._history=window.history}getBaseHrefFromDOM(){return Fr().getBaseHref(this._doc)}onPopState(e){let r=Fr().getGlobalEventTarget(this._doc,"window");return r.addEventListener("popstate",e,!1),()=>r.removeEventListener("popstate",e)}onHashChange(e){let r=Fr().getGlobalEventTarget(this._doc,"window");return r.addEventListener("hashchange",e,!1),()=>r.removeEventListener("hashchange",e)}get href(){return this._location.href}get protocol(){return this._location.protocol}get hostname(){return this._location.hostname}get port(){return this._location.port}get pathname(){return this._location.pathname}get search(){return this._location.search}get hash(){return this._location.hash}set pathname(e){this._location.pathname=e}pushState(e,r,i){this._history.pushState(e,r,i)}replaceState(e,r,i){this._history.replaceState(e,r,i)}forward(){this._history.forward()}back(){this._history.back()}historyGo(e=0){this._history.go(e)}getState(){return this._history.state}static \u0275fac=function(r){return new(r||n)};static \u0275prov=y({token:n,factory:()=>new n,providedIn:"platform"})}return n})();function ud(n,t){return n?t?n.endsWith("/")?t.startsWith("/")?n+t.slice(1):n+t:t.startsWith("/")?n+t:`${n}/${t}`:n:t}function ED(n){let t=n.search(/#|\?|$/);return n[t-1]==="/"?n.slice(0,t-1)+n.slice(t):n}function zn(n){return n&&n[0]!=="?"?`?${n}`:n}var vi=(()=>{class n{historyGo(e){throw new Error("")}static \u0275fac=function(r){return new(r||n)};static \u0275prov=y({token:n,factory:()=>h(wD),providedIn:"root"})}return n})(),cg=new b(""),wD=(()=>{class n extends vi{_platformLocation;_baseHref;_removeListenerFns=[];constructor(e,r){super(),this._platformLocation=e,this._baseHref=r??this._platformLocation.getBaseHrefFromDOM()??h(Q).location?.origin??""}ngOnDestroy(){for(;this._removeListenerFns.length;)this._removeListenerFns.pop()()}onPopState(e){this._removeListenerFns.push(this._platformLocation.onPopState(e),this._platformLocation.onHashChange(e))}getBaseHref(){return this._baseHref}prepareExternalUrl(e){return ud(this._baseHref,e)}path(e=!1){let r=this._platformLocation.pathname+zn(this._platformLocation.search),i=this._platformLocation.hash;return i&&e?`${r}${i}`:r}pushState(e,r,i,o){let s=this.prepareExternalUrl(i+zn(o));this._platformLocation.pushState(e,r,s)}replaceState(e,r,i,o){let s=this.prepareExternalUrl(i+zn(o));this._platformLocation.replaceState(e,r,s)}forward(){this._platformLocation.forward()}back(){this._platformLocation.back()}getState(){return this._platformLocation.getState()}historyGo(e=0){this._platformLocation.historyGo?.(e)}static \u0275fac=function(r){return new(r||n)(H(uo),H(cg,8))};static \u0275prov=y({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})();var Br=(()=>{class n{_subject=new C;_basePath;_locationStrategy;_urlChangeListeners=[];_urlChangeSubscription=null;constructor(e){this._locationStrategy=e;let r=this._locationStrategy.getBaseHref();this._basePath=$A(ED(DD(r))),this._locationStrategy.onPopState(i=>{this._subject.next({url:this.path(!0),pop:!0,state:i.state,type:i.type})})}ngOnDestroy(){this._urlChangeSubscription?.unsubscribe(),this._urlChangeListeners=[]}path(e=!1){return this.normalize(this._locationStrategy.path(e))}getState(){return this._locationStrategy.getState()}isCurrentPathEqualTo(e,r=""){return this.path()==this.normalize(e+zn(r))}normalize(e){return n.stripTrailingSlash(UA(this._basePath,DD(e)))}prepareExternalUrl(e){return e&&e[0]!=="/"&&(e="/"+e),this._locationStrategy.prepareExternalUrl(e)}go(e,r="",i=null){this._locationStrategy.pushState(i,"",e,r),this._notifyUrlChangeListeners(this.prepareExternalUrl(e+zn(r)),i)}replaceState(e,r="",i=null){this._locationStrategy.replaceState(i,"",e,r),this._notifyUrlChangeListeners(this.prepareExternalUrl(e+zn(r)),i)}forward(){this._locationStrategy.forward()}back(){this._locationStrategy.back()}historyGo(e=0){this._locationStrategy.historyGo?.(e)}onUrlChange(e){return this._urlChangeListeners.push(e),this._urlChangeSubscription??=this.subscribe(r=>{this._notifyUrlChangeListeners(r.url,r.state)}),()=>{let r=this._urlChangeListeners.indexOf(e);this._urlChangeListeners.splice(r,1),this._urlChangeListeners.length===0&&(this._urlChangeSubscription?.unsubscribe(),this._urlChangeSubscription=null)}}_notifyUrlChangeListeners(e="",r){this._urlChangeListeners.forEach(i=>i(e,r))}subscribe(e,r,i){return this._subject.subscribe({next:e,error:r??void 0,complete:i??void 0})}static normalizeQueryParams=zn;static joinWithSlash=ud;static stripTrailingSlash=ED;static \u0275fac=function(r){return new(r||n)(H(vi))};static \u0275prov=y({token:n,factory:()=>VA(),providedIn:"root"})}return n})();function VA(){return new Br(H(vi))}function UA(n,t){if(!n||!t.startsWith(n))return t;let e=t.substring(n.length);return e===""||["/",";","?","#"].includes(e[0])?e:t}function DD(n){return n.replace(/\/index.html$/,"")}function $A(n){if(new RegExp("^(https?:)?//").test(n)){let[,e]=n.split(/\/\/[^\/]+/);return e}return n}var mg=(()=>{class n extends vi{_platformLocation;_baseHref="";_removeListenerFns=[];constructor(e,r){super(),this._platformLocation=e,r!=null&&(this._baseHref=r)}ngOnDestroy(){for(;this._removeListenerFns.length;)this._removeListenerFns.pop()()}onPopState(e){this._removeListenerFns.push(this._platformLocation.onPopState(e),this._platformLocation.onHashChange(e))}getBaseHref(){return this._baseHref}path(e=!1){let r=this._platformLocation.hash??"#";return r.length>0?r.substring(1):r}prepareExternalUrl(e){let r=ud(this._baseHref,e);return r.length>0?"#"+r:r}pushState(e,r,i,o){let s=this.prepareExternalUrl(i+zn(o))||this._platformLocation.pathname;this._platformLocation.pushState(e,r,s)}replaceState(e,r,i,o){let s=this.prepareExternalUrl(i+zn(o))||this._platformLocation.pathname;this._platformLocation.replaceState(e,r,s)}forward(){this._platformLocation.forward()}back(){this._platformLocation.back()}getState(){return this._platformLocation.getState()}historyGo(e=0){this._platformLocation.historyGo?.(e)}static \u0275fac=function(r){return new(r||n)(H(uo),H(cg,8))};static \u0275prov=y({token:n,factory:n.\u0275fac})}return n})();var gg=(function(n){return n[n.Decimal=0]="Decimal",n[n.Percent=1]="Percent",n[n.Currency=2]="Currency",n[n.Scientific=3]="Scientific",n})(gg||{});var Et=(function(n){return n[n.Format=0]="Format",n[n.Standalone=1]="Standalone",n})(Et||{}),_e=(function(n){return n[n.Narrow=0]="Narrow",n[n.Abbreviated=1]="Abbreviated",n[n.Wide=2]="Wide",n[n.Short=3]="Short",n})(_e||{}),Ht=(function(n){return n[n.Short=0]="Short",n[n.Medium=1]="Medium",n[n.Long=2]="Long",n[n.Full=3]="Full",n})(Ht||{}),zt={Decimal:0,Group:1,List:2,PercentSign:3,PlusSign:4,MinusSign:5,Exponential:6,SuperscriptingExponent:7,PerMille:8,Infinity:9,NaN:10,TimeSeparator:11,CurrencyDecimal:12,CurrencyGroup:13};function ID(n){return Ut(n)[$e.LocaleId]}function MD(n,t,e){let r=Ut(n),i=[r[$e.DayPeriodsFormat],r[$e.DayPeriodsStandalone]],o=yn(i,t);return yn(o,e)}function xD(n,t,e){let r=Ut(n),i=[r[$e.DaysFormat],r[$e.DaysStandalone]],o=yn(i,t);return yn(o,e)}function RD(n,t,e){let r=Ut(n),i=[r[$e.MonthsFormat],r[$e.MonthsStandalone]],o=yn(i,t);return yn(o,e)}function AD(n,t){let r=Ut(n)[$e.Eras];return yn(r,t)}function qa(n,t){let e=Ut(n);return yn(e[$e.DateFormat],t)}function Ka(n,t){let e=Ut(n);return yn(e[$e.TimeFormat],t)}function Ya(n,t){let r=Ut(n)[$e.DateTimeFormat];return yn(r,t)}function pr(n,t){let e=Ut(n),r=e[$e.NumberSymbols][t];if(typeof r>"u"){if(t===zt.CurrencyDecimal)return e[$e.NumberSymbols][zt.Decimal];if(t===zt.CurrencyGroup)return e[$e.NumberSymbols][zt.Group]}return r}function kD(n,t){return Ut(n)[$e.NumberFormats][t]}function OD(n){if(!n[$e.ExtraData])throw new T(2303,!1)}function ND(n){let t=Ut(n);return OD(t),(t[$e.ExtraData][2]||[]).map(r=>typeof r=="string"?ug(r):[ug(r[0]),ug(r[1])])}function PD(n,t,e){let r=Ut(n);OD(r);let i=[r[$e.ExtraData][0],r[$e.ExtraData][1]],o=yn(i,t)||[];return yn(o,e)||[]}function yn(n,t){for(let e=t;e>-1;e--)if(typeof n[e]<"u")return n[e];throw new T(2304,!1)}function ug(n){let[t,e]=n.split(":");return{hours:+t,minutes:+e}}var HA=/^(\d{4,})-?(\d\d)-?(\d\d)(?:T(\d\d)(?::?(\d\d)(?::?(\d\d)(?:\.(\d+))?)?)?(Z|([+-])(\d\d):?(\d\d))?)?$/,dd={},zA=/((?:[^BEGHLMOSWYZabcdhmswyz']+)|(?:'(?:[^']|'')*')|(?:G{1,5}|y{1,4}|Y{1,4}|M{1,5}|L{1,5}|w{1,2}|W{1}|d{1,2}|E{1,6}|c{1,6}|a{1,5}|b{1,5}|B{1,5}|h{1,2}|H{1,2}|m{1,2}|s{1,2}|S{1,3}|z{1,4}|Z{1,5}|O{1,4}))([\s\S]*)/;function LD(n,t,e,r){let i=JA(n);t=jr(e,t)||t;let s=[],a;for(;t;)if(a=zA.exec(t),a){s=s.concat(a.slice(1));let u=s.pop();if(!u)break;t=u}else{s.push(t);break}let l=i.getTimezoneOffset();r&&(l=BD(r,l),i=QA(i,r));let c="";return s.forEach(u=>{let d=ZA(u);c+=d?d(i,e,l):u==="''"?"'":u.replace(/(^'|'$)/g,"").replace(/''/g,"'")}),c}function gd(n,t,e){let r=new Date(0);return r.setFullYear(n,t,e),r.setHours(0,0,0),r}function jr(n,t){let e=ID(n);if(dd[e]??={},dd[e][t])return dd[e][t];let r="";switch(t){case"shortDate":r=qa(n,Ht.Short);break;case"mediumDate":r=qa(n,Ht.Medium);break;case"longDate":r=qa(n,Ht.Long);break;case"fullDate":r=qa(n,Ht.Full);break;case"shortTime":r=Ka(n,Ht.Short);break;case"mediumTime":r=Ka(n,Ht.Medium);break;case"longTime":r=Ka(n,Ht.Long);break;case"fullTime":r=Ka(n,Ht.Full);break;case"short":let i=jr(n,"shortTime"),o=jr(n,"shortDate");r=fd(Ya(n,Ht.Short),[i,o]);break;case"medium":let s=jr(n,"mediumTime"),a=jr(n,"mediumDate");r=fd(Ya(n,Ht.Medium),[s,a]);break;case"long":let l=jr(n,"longTime"),c=jr(n,"longDate");r=fd(Ya(n,Ht.Long),[l,c]);break;case"full":let u=jr(n,"fullTime"),d=jr(n,"fullDate");r=fd(Ya(n,Ht.Full),[u,d]);break}return r&&(dd[e][t]=r),r}function fd(n,t){return t&&(n=n.replace(/\{([^}]+)}/g,function(e,r){return t!=null&&r in t?t[r]:e})),n}function Wn(n,t,e="-",r,i){let o="";(n<0||i&&n<=0)&&(i?n=-n+1:(n=-n,o=e));let s=String(n);for(;s.length<t;)s="0"+s;return r&&(s=s.slice(s.length-t)),o+s}function WA(n,t){return Wn(n,3).substring(0,t)}function Ye(n,t,e=0,r=!1,i=!1){return function(o,s){let a=GA(n,o);if((e>0||a>-e)&&(a+=e),n===3)a===0&&e===-12&&(a=12);else if(n===6)return WA(a,t);let l=pr(s,zt.MinusSign);return Wn(a,t,l,r,i)}}function GA(n,t){switch(n){case 0:return t.getFullYear();case 1:return t.getMonth();case 2:return t.getDate();case 3:return t.getHours();case 4:return t.getMinutes();case 5:return t.getSeconds();case 6:return t.getMilliseconds();case 7:return t.getDay();default:throw new T(2301,!1)}}function De(n,t,e=Et.Format,r=!1){return function(i,o){return qA(i,o,n,t,e,r)}}function qA(n,t,e,r,i,o){switch(e){case 2:return RD(t,i,r)[n.getMonth()];case 1:return xD(t,i,r)[n.getDay()];case 0:let s=n.getHours(),a=n.getMinutes();if(o){let c=ND(t),u=PD(t,i,r),d=c.findIndex(f=>{if(Array.isArray(f)){let[p,m]=f,v=s>=p.hours&&a>=p.minutes,I=s<m.hours||s===m.hours&&a<m.minutes;if(p.hours<m.hours){if(v&&I)return!0}else if(v||I)return!0}else if(f.hours===s&&f.minutes===a)return!0;return!1});if(d!==-1)return u[d]}return MD(t,i,r)[s<12?0:1];case 3:return AD(t,r)[n.getFullYear()<=0?0:1];default:let l=e;throw new T(2302,!1)}}function hd(n){return function(t,e,r){let i=-1*r,o=pr(e,zt.MinusSign),s=i>0?Math.floor(i/60):Math.ceil(i/60);switch(n){case 0:return(i>=0?"+":"")+Wn(s,2,o)+Wn(Math.abs(i%60),2,o);case 1:return"GMT"+(i>=0?"+":"")+Wn(s,1,o);case 2:return"GMT"+(i>=0?"+":"")+Wn(s,2,o)+":"+Wn(Math.abs(i%60),2,o);case 3:return r===0?"Z":(i>=0?"+":"")+Wn(s,2,o)+":"+Wn(Math.abs(i%60),2,o);default:throw new T(2310,!1)}}}var KA=0,md=4;function YA(n){let t=gd(n,KA,1).getDay();return gd(n,0,1+(t<=md?md:md+7)-t)}function FD(n){let t=n.getDay(),e=t===0?-3:md-t;return gd(n.getFullYear(),n.getMonth(),n.getDate()+e)}function dg(n,t=!1){return function(e,r){let i;if(t){let o=new Date(e.getFullYear(),e.getMonth(),1).getDay()-1,s=e.getDate();i=1+Math.floor((s+o)/7)}else{let o=FD(e),s=YA(o.getFullYear()),a=o.getTime()-s.getTime();i=1+Math.round(a/6048e5)}return Wn(i,n,pr(r,zt.MinusSign))}}function pd(n,t=!1){return function(e,r){let o=FD(e).getFullYear();return Wn(o,n,pr(r,zt.MinusSign),t)}}var fg={};function ZA(n){if(fg[n])return fg[n];let t;switch(n){case"G":case"GG":case"GGG":t=De(3,_e.Abbreviated);break;case"GGGG":t=De(3,_e.Wide);break;case"GGGGG":t=De(3,_e.Narrow);break;case"y":t=Ye(0,1,0,!1,!0);break;case"yy":t=Ye(0,2,0,!0,!0);break;case"yyy":t=Ye(0,3,0,!1,!0);break;case"yyyy":t=Ye(0,4,0,!1,!0);break;case"Y":t=pd(1);break;case"YY":t=pd(2,!0);break;case"YYY":t=pd(3);break;case"YYYY":t=pd(4);break;case"M":case"L":t=Ye(1,1,1);break;case"MM":case"LL":t=Ye(1,2,1);break;case"MMM":t=De(2,_e.Abbreviated);break;case"MMMM":t=De(2,_e.Wide);break;case"MMMMM":t=De(2,_e.Narrow);break;case"LLL":t=De(2,_e.Abbreviated,Et.Standalone);break;case"LLLL":t=De(2,_e.Wide,Et.Standalone);break;case"LLLLL":t=De(2,_e.Narrow,Et.Standalone);break;case"w":t=dg(1);break;case"ww":t=dg(2);break;case"W":t=dg(1,!0);break;case"d":t=Ye(2,1);break;case"dd":t=Ye(2,2);break;case"c":case"cc":t=Ye(7,1);break;case"ccc":t=De(1,_e.Abbreviated,Et.Standalone);break;case"cccc":t=De(1,_e.Wide,Et.Standalone);break;case"ccccc":t=De(1,_e.Narrow,Et.Standalone);break;case"cccccc":t=De(1,_e.Short,Et.Standalone);break;case"E":case"EE":case"EEE":t=De(1,_e.Abbreviated);break;case"EEEE":t=De(1,_e.Wide);break;case"EEEEE":t=De(1,_e.Narrow);break;case"EEEEEE":t=De(1,_e.Short);break;case"a":case"aa":case"aaa":t=De(0,_e.Abbreviated);break;case"aaaa":t=De(0,_e.Wide);break;case"aaaaa":t=De(0,_e.Narrow);break;case"b":case"bb":case"bbb":t=De(0,_e.Abbreviated,Et.Standalone,!0);break;case"bbbb":t=De(0,_e.Wide,Et.Standalone,!0);break;case"bbbbb":t=De(0,_e.Narrow,Et.Standalone,!0);break;case"B":case"BB":case"BBB":t=De(0,_e.Abbreviated,Et.Format,!0);break;case"BBBB":t=De(0,_e.Wide,Et.Format,!0);break;case"BBBBB":t=De(0,_e.Narrow,Et.Format,!0);break;case"h":t=Ye(3,1,-12);break;case"hh":t=Ye(3,2,-12);break;case"H":t=Ye(3,1);break;case"HH":t=Ye(3,2);break;case"m":t=Ye(4,1);break;case"mm":t=Ye(4,2);break;case"s":t=Ye(5,1);break;case"ss":t=Ye(5,2);break;case"S":t=Ye(6,1);break;case"SS":t=Ye(6,2);break;case"SSS":t=Ye(6,3);break;case"Z":case"ZZ":case"ZZZ":t=hd(0);break;case"ZZZZZ":t=hd(3);break;case"O":case"OO":case"OOO":case"z":case"zz":case"zzz":t=hd(1);break;case"OOOO":case"ZZZZ":case"zzzz":t=hd(2);break;default:return null}return fg[n]=t,t}function BD(n,t){n=n.replace(/:/g,"");let e=Date.parse("Jan 01, 1970 00:00:00 "+n)/6e4;return isNaN(e)?t:e}function XA(n,t){return n=new Date(n.getTime()),n.setMinutes(n.getMinutes()+t),n}function QA(n,t,e){let i=n.getTimezoneOffset(),o=BD(t,i);return XA(n,-1*(o-i))}function JA(n){if(TD(n))return n;if(typeof n=="number"&&!isNaN(n))return new Date(n);if(typeof n=="string"){if(n=n.trim(),/^(\d{4}(-\d{1,2}(-\d{1,2})?)?)$/.test(n)){let[i,o=1,s=1]=n.split("-").map(a=>+a);return gd(i,o-1,s)}let e=parseFloat(n);if(!isNaN(n-e))return new Date(e);let r;if(r=n.match(HA))return ek(r)}let t=new Date(n);if(!TD(t))throw new T(2311,!1);return t}function ek(n){let t=new Date(0),e=0,r=0,i=n[8]?t.setUTCFullYear:t.setFullYear,o=n[8]?t.setUTCHours:t.setHours;n[9]&&(e=Number(n[9]+n[10]),r=Number(n[9]+n[11])),i.call(t,Number(n[1]),Number(n[2])-1,Number(n[3]));let s=Number(n[4]||0)-e,a=Number(n[5]||0)-r,l=Number(n[6]||0),c=Math.floor(parseFloat("0."+(n[7]||0))*1e3);return o.call(t,s,a,l,c),t}function TD(n){return n instanceof Date&&!isNaN(n.valueOf())}var tk=/^(\d+)?\.((\d+)(-(\d+))?)?$/,SD=22,yd=".",Za="0",nk=";",rk=",",hg="#";function ik(n,t,e,r,i,o,s=!1){let a="",l=!1;if(!isFinite(n))a=pr(e,zt.Infinity);else{let c=ak(n);s&&(c=sk(c));let u=t.minInt,d=t.minFrac,f=t.maxFrac;if(o){let te=o.match(tk);if(te===null)throw new T(2306,!1);let Pe=te[1],Cr=te[3],Ii=te[5];Pe!=null&&(u=pg(Pe)),Cr!=null&&(d=pg(Cr)),Ii!=null?f=pg(Ii):Cr!=null&&d>f&&(f=d)}lk(c,d,f);let p=c.digits,m=c.integerLen,v=c.exponent,I=[];for(l=p.every(te=>!te);m<u;m++)p.unshift(0);for(;m<0;m++)p.unshift(0);m>0?I=p.splice(m,p.length):(I=p,p=[0]);let R=[];for(p.length>=t.lgSize&&R.unshift(p.splice(-t.lgSize,p.length).join(""));p.length>t.gSize;)R.unshift(p.splice(-t.gSize,p.length).join(""));p.length&&R.unshift(p.join("")),a=R.join(pr(e,r)),I.length&&(a+=pr(e,i)+I.join("")),v&&(a+=pr(e,zt.Exponential)+"+"+v)}return n<0&&!l?a=t.negPre+a+t.negSuf:a=t.posPre+a+t.posSuf,a}function jD(n,t,e){let r=kD(t,gg.Decimal),i=ok(r,pr(t,zt.MinusSign));return ik(n,i,t,zt.Group,zt.Decimal,e)}function ok(n,t="-"){let e={minInt:1,minFrac:0,maxFrac:0,posPre:"",posSuf:"",negPre:"",negSuf:"",gSize:0,lgSize:0},r=n.split(nk),i=r[0],o=r[1],s=i.indexOf(yd)!==-1?i.split(yd):[i.substring(0,i.lastIndexOf(Za)+1),i.substring(i.lastIndexOf(Za)+1)],a=s[0],l=s[1]||"";e.posPre=a.substring(0,a.indexOf(hg));for(let u=0;u<l.length;u++){let d=l.charAt(u);d===Za?e.minFrac=e.maxFrac=u+1:d===hg?e.maxFrac=u+1:e.posSuf+=d}let c=a.split(rk);if(e.gSize=c[1]?c[1].length:0,e.lgSize=c[2]||c[1]?(c[2]||c[1]).length:0,o){let u=i.length-e.posPre.length-e.posSuf.length,d=o.indexOf(hg);e.negPre=o.substring(0,d).replace(/'/g,""),e.negSuf=o.slice(d+u).replace(/'/g,"")}else e.negPre=t+e.posPre,e.negSuf=e.posSuf;return e}function sk(n){if(n.digits[0]===0)return n;let t=n.digits.length-n.integerLen;return n.exponent?n.exponent+=2:(t===0?n.digits.push(0,0):t===1&&n.digits.push(0),n.integerLen+=2),n}function ak(n){let t=Math.abs(n)+"",e=0,r,i,o,s,a;for((i=t.indexOf(yd))>-1&&(t=t.replace(yd,"")),(o=t.search(/e/i))>0?(i<0&&(i=o),i+=+t.slice(o+1),t=t.substring(0,o)):i<0&&(i=t.length),o=0;t.charAt(o)===Za;o++);if(o===(a=t.length))r=[0],i=1;else{for(a--;t.charAt(a)===Za;)a--;for(i-=o,r=[],s=0;o<=a;o++,s++)r[s]=Number(t.charAt(o))}return i>SD&&(r=r.splice(0,SD-1),e=i-1,i=1),{digits:r,exponent:e,integerLen:i}}function lk(n,t,e){if(t>e)throw new T(2307,!1);let r=n.digits,i=r.length-n.integerLen,o=Math.min(Math.max(t,i),e),s=o+n.integerLen,a=r[s];if(s>0){r.splice(Math.max(n.integerLen,s));for(let d=s;d<r.length;d++)r[d]=0}else{i=Math.max(0,i),n.integerLen=1,r.length=Math.max(1,s=o+1),r[0]=0;for(let d=1;d<s;d++)r[d]=0}if(a>=5)if(s-1<0){for(let d=0;d>s;d--)r.unshift(0),n.integerLen++;r.unshift(1),n.integerLen++}else r[s-1]++;for(;i<Math.max(0,o);i++)r.push(0);let l=o!==0,c=t+n.integerLen,u=r.reduceRight(function(d,f,p,m){return f=f+d,m[p]=f<10?f:f-10,l&&(m[p]===0&&p>=c?m.pop():l=!1),f>=10?1:0},0);u&&(r.unshift(u),n.integerLen++)}function pg(n){let t=parseInt(n);if(isNaN(t))throw new T(2305,!1);return t}function yg(n,t){return new T(2100,!1)}var vg=(()=>{class n{transform(e){return e==null?null:(ck(n,e),e.toUpperCase())}static \u0275fac=function(r){return new(r||n)};static \u0275pipe=fs({name:"uppercase",type:n,pure:!0})}return n})();function ck(n,t){if(typeof t!="string")throw yg(n,t)}var uk="mediumDate",VD=new b(""),UD=new b(""),bg=(()=>{class n{locale;defaultTimezone;defaultOptions;constructor(e,r,i){this.locale=e,this.defaultTimezone=r,this.defaultOptions=i}transform(e,r,i,o){if(e==null||e===""||e!==e)return null;try{let s=r??this.defaultOptions?.dateFormat??uk,a=i??this.defaultOptions?.timezone??this.defaultTimezone??void 0;return LD(e,s,o||this.locale,a)}catch(s){throw yg(n,s.message)}}static \u0275fac=function(r){return new(r||n)(ur(gs,16),ur(VD,24),ur(UD,24))};static \u0275pipe=fs({name:"date",type:n,pure:!0})}return n})();var _g=(()=>{class n{transform(e){return JSON.stringify(e,null,2)}static \u0275fac=function(r){return new(r||n)};static \u0275pipe=fs({name:"json",type:n,pure:!1})}return n})();var Cg=(()=>{class n{_locale;constructor(e){this._locale=e}transform(e,r,i){if(!dk(e))return null;i||=this._locale;try{let o=fk(e);return jD(o,i,r)}catch(o){throw yg(n,o.message)}}static \u0275fac=function(r){return new(r||n)(ur(gs,16))};static \u0275pipe=fs({name:"number",type:n,pure:!0})}return n})();function dk(n){return!(n==null||n===""||n!==n)}function fk(n){if(typeof n=="string"&&!isNaN(Number(n)-parseFloat(n)))return Number(n);if(typeof n!="number")throw new T(2309,!1);return n}var ys=(()=>{class n{static \u0275fac=function(r){return new(r||n)};static \u0275mod=Ve({type:n});static \u0275inj=Ae({})}return n})();function Eg(n,t){t=encodeURIComponent(t);for(let e of n.split(";")){let r=e.indexOf("="),[i,o]=r==-1?[e,""]:[e.slice(0,r),e.slice(r+1)];if(i.trim()===t)return decodeURIComponent(o)}return null}var Xa=class{};var Dg="browser";function $D(n){return n===Dg}var Qa=class{_doc;constructor(t){this._doc=t}manager},vd=(()=>{class n extends Qa{constructor(e){super(e)}supports(e){return!0}addEventListener(e,r,i,o){return e.addEventListener(r,i,o),()=>this.removeEventListener(e,r,i,o)}removeEventListener(e,r,i,o){return e.removeEventListener(r,i,o)}static \u0275fac=function(r){return new(r||n)(H(Q))};static \u0275prov=y({token:n,factory:n.\u0275fac})}return n})(),Cd=new b(""),Ig=(()=>{class n{_zone;_plugins;_eventNameToPlugin=new Map;constructor(e,r){this._zone=r,e.forEach(s=>{s.manager=this});let i=e.filter(s=>!(s instanceof vd));this._plugins=i.slice().reverse();let o=e.find(s=>s instanceof vd);o&&this._plugins.push(o)}addEventListener(e,r,i,o){return this._findPluginFor(r).addEventListener(e,r,i,o)}getZone(){return this._zone}_findPluginFor(e){let r=this._eventNameToPlugin.get(e);if(r)return r;if(r=this._plugins.find(o=>o.supports(e)),!r)throw new T(5101,!1);return this._eventNameToPlugin.set(e,r),r}static \u0275fac=function(r){return new(r||n)(H(Cd),H(V))};static \u0275prov=y({token:n,factory:n.\u0275fac})}return n})(),wg="ng-app-id";function zD(n){for(let t of n)t.remove()}function WD(n,t){let e=t.createElement("style");return e.textContent=n,e}function mk(n,t,e,r){let i=n.head?.querySelectorAll(`style[${wg}="${t}"],link[${wg}="${t}"]`);if(i)for(let o of i)o.removeAttribute(wg),o instanceof HTMLLinkElement?r.set(o.href.slice(o.href.lastIndexOf("/")+1),{usage:0,elements:[o]}):o.textContent&&e.set(o.textContent,{usage:0,elements:[o]})}function Sg(n,t){let e=t.createElement("link");return e.setAttribute("rel","stylesheet"),e.setAttribute("href",n),e}var Mg=(()=>{class n{doc;appId;nonce;inline=new Map;external=new Map;hosts=new Set;constructor(e,r,i,o={}){this.doc=e,this.appId=r,this.nonce=i,mk(e,r,this.inline,this.external),this.hosts.add(e.head)}addStyles(e,r){for(let i of e)this.addUsage(i,this.inline,WD);r?.forEach(i=>this.addUsage(i,this.external,Sg))}removeStyles(e,r){for(let i of e)this.removeUsage(i,this.inline);r?.forEach(i=>this.removeUsage(i,this.external))}addUsage(e,r,i){let o=r.get(e);o?o.usage++:r.set(e,{usage:1,elements:[...this.hosts].map(s=>this.addElement(s,i(e,this.doc)))})}removeUsage(e,r){let i=r.get(e);i&&(i.usage--,i.usage<=0&&(zD(i.elements),r.delete(e)))}ngOnDestroy(){for(let[,{elements:e}]of[...this.inline,...this.external])zD(e);this.hosts.clear()}addHost(e){this.hosts.add(e);for(let[r,{elements:i}]of this.inline)i.push(this.addElement(e,WD(r,this.doc)));for(let[r,{elements:i}]of this.external)i.push(this.addElement(e,Sg(r,this.doc)))}removeHost(e){this.hosts.delete(e)}addElement(e,r){return this.nonce&&r.setAttribute("nonce",this.nonce),e.appendChild(r)}static \u0275fac=function(r){return new(r||n)(H(Q),H(mi),H(us,8),H(oo))};static \u0275prov=y({token:n,factory:n.\u0275fac})}return n})(),Tg={svg:"http://www.w3.org/2000/svg",xhtml:"http://www.w3.org/1999/xhtml",xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace",xmlns:"http://www.w3.org/2000/xmlns/",math:"http://www.w3.org/1998/Math/MathML"},xg=/%COMP%/g;var qD="%COMP%",gk=`_nghost-${qD}`,yk=`_ngcontent-${qD}`,vk=!0,bk=new b("",{factory:()=>vk});function _k(n){return yk.replace(xg,n)}function Ck(n){return gk.replace(xg,n)}function KD(n,t){return t.map(e=>e.replace(xg,n))}var Rg=(()=>{class n{eventManager;sharedStylesHost;appId;removeStylesOnCompDestroy;doc;ngZone;nonce;tracingService;rendererByCompId=new Map;defaultRenderer;constructor(e,r,i,o,s,a,l=null,c=null){this.eventManager=e,this.sharedStylesHost=r,this.appId=i,this.removeStylesOnCompDestroy=o,this.doc=s,this.ngZone=a,this.nonce=l,this.tracingService=c,this.defaultRenderer=new Ja(e,s,a,this.tracingService)}createRenderer(e,r){if(!e||!r)return this.defaultRenderer;let i=this.getOrCreateRenderer(e,r);return i instanceof _d?i.applyToHost(e):i instanceof el&&i.applyStyles(),i}getOrCreateRenderer(e,r){let i=this.rendererByCompId,o=i.get(r.id);if(!o){let s=this.doc,a=this.ngZone,l=this.eventManager,c=this.sharedStylesHost,u=this.removeStylesOnCompDestroy,d=this.tracingService;switch(r.encapsulation){case Fn.Emulated:o=new _d(l,c,r,this.appId,u,s,a,d);break;case Fn.ShadowDom:return new bd(l,e,r,s,a,this.nonce,d,c);case Fn.ExperimentalIsolatedShadowDom:return new bd(l,e,r,s,a,this.nonce,d);default:o=new el(l,c,r,u,s,a,d);break}i.set(r.id,o)}return o}ngOnDestroy(){this.rendererByCompId.clear()}componentReplaced(e){this.rendererByCompId.delete(e)}static \u0275fac=function(r){return new(r||n)(H(Ig),H(Mg),H(mi),H(bk),H(Q),H(V),H(us),H(gi,8))};static \u0275prov=y({token:n,factory:n.\u0275fac})}return n})(),Ja=class{eventManager;doc;ngZone;tracingService;data=Object.create(null);throwOnSyntheticProps=!0;constructor(t,e,r,i){this.eventManager=t,this.doc=e,this.ngZone=r,this.tracingService=i}destroy(){}destroyNode=null;createElement(t,e){return e?this.doc.createElementNS(Tg[e]||e,t):this.doc.createElement(t)}createComment(t){return this.doc.createComment(t)}createText(t){return this.doc.createTextNode(t)}appendChild(t,e){(GD(t)?t.content:t).appendChild(e)}insertBefore(t,e,r){t&&(GD(t)?t.content:t).insertBefore(e,r)}removeChild(t,e){e.remove()}selectRootElement(t,e){let r=typeof t=="string"?this.doc.querySelector(t):t;if(!r)throw new T(-5104,!1);return e||(r.textContent=""),r}parentNode(t){return t.parentNode}nextSibling(t){return t.nextSibling}setAttribute(t,e,r,i){if(i){e=i+":"+e;let o=Tg[i];o?t.setAttributeNS(o,e,r):t.setAttribute(e,r)}else t.setAttribute(e,r)}removeAttribute(t,e,r){if(r){let i=Tg[r];i?t.removeAttributeNS(i,e):t.removeAttribute(`${r}:${e}`)}else t.removeAttribute(e)}addClass(t,e){t.classList.add(e)}removeClass(t,e){t.classList.remove(e)}setStyle(t,e,r,i){i&(ar.DashCase|ar.Important)?t.style.setProperty(e,r,i&ar.Important?"important":""):t.style[e]=r}removeStyle(t,e,r){r&ar.DashCase?t.style.removeProperty(e):t.style[e]=""}setProperty(t,e,r){t!=null&&(t[e]=r)}setValue(t,e){t.nodeValue=e}listen(t,e,r,i){if(typeof t=="string"&&(t=Fr().getGlobalEventTarget(this.doc,t),!t))throw new T(5102,!1);let o=this.decoratePreventDefault(r);return this.tracingService?.wrapEventListener&&(o=this.tracingService.wrapEventListener(t,e,o)),this.eventManager.addEventListener(t,e,o,i)}decoratePreventDefault(t){return e=>{if(e==="__ngUnwrap__")return t;t(e)===!1&&e.preventDefault()}}};function GD(n){return n.tagName==="TEMPLATE"&&n.content!==void 0}var bd=class extends Ja{hostEl;sharedStylesHost;shadowRoot;constructor(t,e,r,i,o,s,a,l){super(t,i,o,a),this.hostEl=e,this.sharedStylesHost=l,this.shadowRoot=e.attachShadow({mode:"open"}),this.sharedStylesHost&&this.sharedStylesHost.addHost(this.shadowRoot);let c=r.styles;c=KD(r.id,c);for(let d of c){let f=document.createElement("style");s&&f.setAttribute("nonce",s),f.textContent=d,this.shadowRoot.appendChild(f)}let u=r.getExternalStyles?.();if(u)for(let d of u){let f=Sg(d,i);s&&f.setAttribute("nonce",s),this.shadowRoot.appendChild(f)}}nodeOrShadowRoot(t){return t===this.hostEl?this.shadowRoot:t}appendChild(t,e){return super.appendChild(this.nodeOrShadowRoot(t),e)}insertBefore(t,e,r){return super.insertBefore(this.nodeOrShadowRoot(t),e,r)}removeChild(t,e){return super.removeChild(null,e)}parentNode(t){return this.nodeOrShadowRoot(super.parentNode(this.nodeOrShadowRoot(t)))}destroy(){this.sharedStylesHost&&this.sharedStylesHost.removeHost(this.shadowRoot)}},el=class extends Ja{sharedStylesHost;removeStylesOnCompDestroy;styles;styleUrls;constructor(t,e,r,i,o,s,a,l){super(t,o,s,a),this.sharedStylesHost=e,this.removeStylesOnCompDestroy=i;let c=r.styles;this.styles=l?KD(l,c):c,this.styleUrls=r.getExternalStyles?.(l)}applyStyles(){this.sharedStylesHost.addStyles(this.styles,this.styleUrls)}destroy(){this.removeStylesOnCompDestroy&&no.size===0&&this.sharedStylesHost.removeStyles(this.styles,this.styleUrls)}},_d=class extends el{contentAttr;hostAttr;constructor(t,e,r,i,o,s,a,l){let c=i+"-"+r.id;super(t,e,r,o,s,a,l,c),this.contentAttr=_k(c),this.hostAttr=Ck(c)}applyToHost(t){this.applyStyles(),this.setAttribute(t,this.hostAttr,"")}createElement(t,e){let r=super.createElement(t,e);return super.setAttribute(r,this.contentAttr,""),r}};var Ed=class n extends Ga{supportsDOMEvents=!0;static makeCurrent(){lg(new n)}onAndCancel(t,e,r,i){return t.addEventListener(e,r,i),()=>{t.removeEventListener(e,r,i)}}dispatchEvent(t,e){t.dispatchEvent(e)}remove(t){t.remove()}createElement(t,e){return e=e||this.getDefaultDocument(),e.createElement(t)}createHtmlDocument(){return document.implementation.createHTMLDocument("fakeTitle")}getDefaultDocument(){return document}isElementNode(t){return t.nodeType===Node.ELEMENT_NODE}isShadowRoot(t){return t instanceof DocumentFragment}getGlobalEventTarget(t,e){return e==="window"?window:e==="document"?t:e==="body"?t.body:null}getBaseHref(t){let e=Ek();return e==null?null:Dk(e)}resetBaseElement(){tl=null}getUserAgent(){return window.navigator.userAgent}getCookie(t){return Eg(document.cookie,t)}},tl=null;function Ek(){return tl=tl||document.head.querySelector("base"),tl?tl.getAttribute("href"):null}function Dk(n){return new URL(n,document.baseURI).pathname}var wk=(()=>{class n{build(){return new XMLHttpRequest}static \u0275fac=function(r){return new(r||n)};static \u0275prov=y({token:n,factory:n.\u0275fac})}return n})(),YD=["alt","control","meta","shift"],Tk={"\b":"Backspace","	":"Tab","\x7F":"Delete","\x1B":"Escape",Del:"Delete",Esc:"Escape",Left:"ArrowLeft",Right:"ArrowRight",Up:"ArrowUp",Down:"ArrowDown",Menu:"ContextMenu",Scroll:"ScrollLock",Win:"OS"},Sk={alt:n=>n.altKey,control:n=>n.ctrlKey,meta:n=>n.metaKey,shift:n=>n.shiftKey},ZD=(()=>{class n extends Qa{constructor(e){super(e)}supports(e){return n.parseEventName(e)!=null}addEventListener(e,r,i,o){let s=n.parseEventName(r),a=n.eventCallback(s.fullKey,i,this.manager.getZone());return this.manager.getZone().runOutsideAngular(()=>Fr().onAndCancel(e,s.domEventName,a,o))}static parseEventName(e){let r=e.toLowerCase().split("."),i=r.shift();if(r.length===0||!(i==="keydown"||i==="keyup"))return null;let o=n._normalizeKey(r.pop()),s="",a=r.indexOf("code");if(a>-1&&(r.splice(a,1),s="code."),YD.forEach(c=>{let u=r.indexOf(c);u>-1&&(r.splice(u,1),s+=c+".")}),s+=o,r.length!=0||o.length===0)return null;let l={};return l.domEventName=i,l.fullKey=s,l}static matchEventFullKeyCode(e,r){let i=Tk[e.key]||e.key,o="";return r.indexOf("code.")>-1&&(i=e.code,o="code."),i==null||!i?!1:(i=i.toLowerCase(),i===" "?i="space":i==="."&&(i="dot"),YD.forEach(s=>{if(s!==i){let a=Sk[s];a(e)&&(o+=s+".")}}),o+=i,o===r)}static eventCallback(e,r,i){return o=>{n.matchEventFullKeyCode(o,e)&&i.runGuarded(()=>r(o))}}static _normalizeKey(e){return e==="esc"?"escape":e}static \u0275fac=function(r){return new(r||n)(H(Q))};static \u0275prov=y({token:n,factory:n.\u0275fac})}return n})();async function Ag(n,t,e){let r=g({rootComponent:n},Ik(t,e));return bD(r)}function Ik(n,t){return{platformRef:t?.platformRef,appProviders:[...kk,...n?.providers??[]],platformProviders:Ak}}function Mk(){Ed.makeCurrent()}function xk(){return new ln}function Rk(){return Rm(document),document}var Ak=[{provide:oo,useValue:Dg},{provide:Lu,useValue:Mk,multi:!0},{provide:Q,useFactory:Rk}];var kk=[{provide:_a,useValue:"root"},{provide:ln,useFactory:xk},{provide:Cd,useClass:vd,multi:!0},{provide:Cd,useClass:ZD,multi:!0},Rg,Mg,Ig,{provide:bt,useExisting:Rg},{provide:Xa,useClass:wk},[]];var XD=(()=>{class n{_doc;constructor(e){this._doc=e}getTitle(){return this._doc.title}setTitle(e){this._doc.title=e||""}static \u0275fac=function(r){return new(r||n)(H(Q))};static \u0275prov=y({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})();var z="primary",ml=Symbol("RouteTitle"),Lg=class{params;constructor(t){this.params=t||{}}has(t){return Object.prototype.hasOwnProperty.call(this.params,t)}get(t){if(this.has(t)){let e=this.params[t];return Array.isArray(e)?e[0]:e}return null}getAll(t){if(this.has(t)){let e=this.params[t];return Array.isArray(e)?e:[e]}return[]}get keys(){return Object.keys(this.params)}};function ho(n){return new Lg(n)}function kg(n,t,e){for(let r=0;r<n.length;r++){let i=n[r],o=t[r];if(i[0]===":")e[i.substring(1)]=o;else if(i!==o.path)return!1}return!0}function ow(n,t,e){let r=e.path.split("/"),i=r.indexOf("**");if(i===-1){if(r.length>n.length||e.pathMatch==="full"&&(t.hasChildren()||r.length<n.length))return null;let l={},c=n.slice(0,r.length);return kg(r,c,l)?{consumed:c,posParams:l}:null}if(i!==r.lastIndexOf("**"))return null;let o=r.slice(0,i),s=r.slice(i+1);if(o.length+s.length>n.length||e.pathMatch==="full"&&t.hasChildren()&&e.path!=="**")return null;let a={};return!kg(o,n.slice(0,o.length),a)||!kg(s,n.slice(n.length-s.length),a)?null:{consumed:n,posParams:a}}function Md(n){return new Promise((t,e)=>{n.pipe(Sr()).subscribe({next:r=>t(r),error:r=>e(r)})})}function Nk(n,t){if(n.length!==t.length)return!1;for(let e=0;e<n.length;++e)if(!mr(n[e],t[e]))return!1;return!0}function mr(n,t){let e=n?Fg(n):void 0,r=t?Fg(t):void 0;if(!e||!r||e.length!=r.length)return!1;let i;for(let o=0;o<e.length;o++)if(i=e[o],!sw(n[i],t[i]))return!1;return!0}function Fg(n){return[...Object.keys(n),...Object.getOwnPropertySymbols(n)]}function sw(n,t){if(Array.isArray(n)&&Array.isArray(t)){if(n.length!==t.length)return!1;let e=[...n].sort(),r=[...t].sort();return e.every((i,o)=>r[o]===i)}else return n===t}function Pk(n){return n.length>0?n[n.length-1]:null}function go(n){return Zt(n)?n:hs(n)?Be(Promise.resolve(n)):x(n)}function aw(n){return Zt(n)?Md(n):Promise.resolve(n)}var Lk={exact:uw,subset:dw},lw={exact:Fk,subset:Bk,ignored:()=>!0},cw={paths:"exact",fragment:"ignored",matrixParams:"ignored",queryParams:"exact"},Bg={paths:"subset",fragment:"ignored",matrixParams:"ignored",queryParams:"subset"};function QD(n,t,e){return Lk[e.paths](n.root,t.root,e.matrixParams)&&lw[e.queryParams](n.queryParams,t.queryParams)&&!(e.fragment==="exact"&&n.fragment!==t.fragment)}function Fk(n,t){return mr(n,t)}function uw(n,t,e){if(!fo(n.segments,t.segments)||!Td(n.segments,t.segments,e)||n.numberOfChildren!==t.numberOfChildren)return!1;for(let r in t.children)if(!n.children[r]||!uw(n.children[r],t.children[r],e))return!1;return!0}function Bk(n,t){return Object.keys(t).length<=Object.keys(n).length&&Object.keys(t).every(e=>sw(n[e],t[e]))}function dw(n,t,e){return fw(n,t,t.segments,e)}function fw(n,t,e,r){if(n.segments.length>e.length){let i=n.segments.slice(0,e.length);return!(!fo(i,e)||t.hasChildren()||!Td(i,e,r))}else if(n.segments.length===e.length){if(!fo(n.segments,e)||!Td(n.segments,e,r))return!1;for(let i in t.children)if(!n.children[i]||!dw(n.children[i],t.children[i],r))return!1;return!0}else{let i=e.slice(0,n.segments.length),o=e.slice(n.segments.length);return!fo(n.segments,i)||!Td(n.segments,i,r)||!n.children[z]?!1:fw(n.children[z],t,o,r)}}function Td(n,t,e){return t.every((r,i)=>lw[e](n[i].parameters,r.parameters))}var bn=class{root;queryParams;fragment;_queryParamMap;constructor(t=new he([],{}),e={},r=null){this.root=t,this.queryParams=e,this.fragment=r}get queryParamMap(){return this._queryParamMap??=ho(this.queryParams),this._queryParamMap}toString(){return Uk.serialize(this)}},he=class{segments;children;parent=null;constructor(t,e){this.segments=t,this.children=e,Object.values(e).forEach(r=>r.parent=this)}hasChildren(){return this.numberOfChildren>0}get numberOfChildren(){return Object.keys(this.children).length}toString(){return Sd(this)}},bi=class{path;parameters;_parameterMap;constructor(t,e){this.path=t,this.parameters=e}get parameterMap(){return this._parameterMap??=ho(this.parameters),this._parameterMap}toString(){return pw(this)}};function jk(n,t){return fo(n,t)&&n.every((e,r)=>mr(e.parameters,t[r].parameters))}function fo(n,t){return n.length!==t.length?!1:n.every((e,r)=>e.path===t[r].path)}function Vk(n,t){let e=[];return Object.entries(n.children).forEach(([r,i])=>{r===z&&(e=e.concat(t(i,r)))}),Object.entries(n.children).forEach(([r,i])=>{r!==z&&(e=e.concat(t(i,r)))}),e}var gl=(()=>{class n{static \u0275fac=function(r){return new(r||n)};static \u0275prov=y({token:n,factory:()=>new _i,providedIn:"root"})}return n})(),_i=class{parse(t){let e=new Vg(t);return new bn(e.parseRootSegment(),e.parseQueryParams(),e.parseFragment())}serialize(t){let e=`/${nl(t.root,!0)}`,r=zk(t.queryParams),i=typeof t.fragment=="string"?`#${$k(t.fragment)}`:"";return`${e}${r}${i}`}},Uk=new _i;function Sd(n){return n.segments.map(t=>pw(t)).join("/")}function nl(n,t){if(!n.hasChildren())return Sd(n);if(t){let e=n.children[z]?nl(n.children[z],!1):"",r=[];return Object.entries(n.children).forEach(([i,o])=>{i!==z&&r.push(`${i}:${nl(o,!1)}`)}),r.length>0?`${e}(${r.join("//")})`:e}else{let e=Vk(n,(r,i)=>i===z?[nl(n.children[z],!1)]:[`${i}:${nl(r,!1)}`]);return Object.keys(n.children).length===1&&n.children[z]!=null?`${Sd(n)}/${e[0]}`:`${Sd(n)}/(${e.join("//")})`}}function hw(n){return encodeURIComponent(n).replace(/%40/g,"@").replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",")}function Dd(n){return hw(n).replace(/%3B/gi,";")}function $k(n){return encodeURI(n)}function jg(n){return hw(n).replace(/\(/g,"%28").replace(/\)/g,"%29").replace(/%26/gi,"&")}function Id(n){return decodeURIComponent(n)}function JD(n){return Id(n.replace(/\+/g,"%20"))}function pw(n){return`${jg(n.path)}${Hk(n.parameters)}`}function Hk(n){return Object.entries(n).map(([t,e])=>`;${jg(t)}=${jg(e)}`).join("")}function zk(n){let t=Object.entries(n).map(([e,r])=>Array.isArray(r)?r.map(i=>`${Dd(e)}=${Dd(i)}`).join("&"):`${Dd(e)}=${Dd(r)}`).filter(e=>e);return t.length?`?${t.join("&")}`:""}var Wk=/^[^\/()?;#]+/;function Og(n){let t=n.match(Wk);return t?t[0]:""}var Gk=/^[^\/()?;=#]+/;function qk(n){let t=n.match(Gk);return t?t[0]:""}var Kk=/^[^=?&#]+/;function Yk(n){let t=n.match(Kk);return t?t[0]:""}var Zk=/^[^&#]+/;function Xk(n){let t=n.match(Zk);return t?t[0]:""}var Vg=class{url;remaining;constructor(t){this.url=t,this.remaining=t}parseRootSegment(){for(;this.consumeOptional("/"););return this.remaining===""||this.peekStartsWith("?")||this.peekStartsWith("#")?new he([],{}):new he([],this.parseChildren())}parseQueryParams(){let t={};if(this.consumeOptional("?"))do this.parseQueryParam(t);while(this.consumeOptional("&"));return t}parseFragment(){return this.consumeOptional("#")?decodeURIComponent(this.remaining):null}parseChildren(t=0){if(t>50)throw new T(4010,!1);if(this.remaining==="")return{};this.consumeOptional("/");let e=[];for(this.peekStartsWith("(")||e.push(this.parseSegment());this.peekStartsWith("/")&&!this.peekStartsWith("//")&&!this.peekStartsWith("/(");)this.capture("/"),e.push(this.parseSegment());let r={};this.peekStartsWith("/(")&&(this.capture("/"),r=this.parseParens(!0,t));let i={};return this.peekStartsWith("(")&&(i=this.parseParens(!1,t)),(e.length>0||Object.keys(r).length>0)&&(i[z]=new he(e,r)),i}parseSegment(){let t=Og(this.remaining);if(t===""&&this.peekStartsWith(";"))throw new T(4009,!1);return this.capture(t),new bi(Id(t),this.parseMatrixParams())}parseMatrixParams(){let t={};for(;this.consumeOptional(";");)this.parseParam(t);return t}parseParam(t){let e=qk(this.remaining);if(!e)return;this.capture(e);let r="";if(this.consumeOptional("=")){let i=Og(this.remaining);i&&(r=i,this.capture(r))}t[Id(e)]=Id(r)}parseQueryParam(t){let e=Yk(this.remaining);if(!e)return;this.capture(e);let r="";if(this.consumeOptional("=")){let s=Xk(this.remaining);s&&(r=s,this.capture(r))}let i=JD(e),o=JD(r);if(t.hasOwnProperty(i)){let s=t[i];Array.isArray(s)||(s=[s],t[i]=s),s.push(o)}else t[i]=o}parseParens(t,e){let r={};for(this.capture("(");!this.consumeOptional(")")&&this.remaining.length>0;){let i=Og(this.remaining),o=this.remaining[i.length];if(o!=="/"&&o!==")"&&o!==";")throw new T(4010,!1);let s;i.indexOf(":")>-1?(s=i.slice(0,i.indexOf(":")),this.capture(s),this.capture(":")):t&&(s=z);let a=this.parseChildren(e+1);r[s??z]=Object.keys(a).length===1&&a[z]?a[z]:new he([],a),this.consumeOptional("//")}return r}peekStartsWith(t){return this.remaining.startsWith(t)}consumeOptional(t){return this.peekStartsWith(t)?(this.remaining=this.remaining.substring(t.length),!0):!1}capture(t){if(!this.consumeOptional(t))throw new T(4011,!1)}};function mw(n){return n.segments.length>0?new he([],{[z]:n}):n}function gw(n){let t={};for(let[r,i]of Object.entries(n.children)){let o=gw(i);if(r===z&&o.segments.length===0&&o.hasChildren())for(let[s,a]of Object.entries(o.children))t[s]=a;else(o.segments.length>0||o.hasChildren())&&(t[r]=o)}let e=new he(n.segments,t);return Qk(e)}function Qk(n){if(n.numberOfChildren===1&&n.children[z]){let t=n.children[z];return new he(n.segments.concat(t.segments),t.children)}return n}function Cs(n){return n instanceof bn}function yw(n,t,e=null,r=null,i=new _i){let o=vw(n);return bw(o,t,e,r,i)}function vw(n){let t;function e(o){let s={};for(let l of o.children){let c=e(l);s[l.outlet]=c}let a=new he(o.url,s);return o===n&&(t=a),a}let r=e(n.root),i=mw(r);return t??i}function bw(n,t,e,r,i){let o=n;for(;o.parent;)o=o.parent;if(t.length===0)return Ng(o,o,o,e,r,i);let s=Jk(t);if(s.toRoot())return Ng(o,o,new he([],{}),e,r,i);let a=eO(s,o,n),l=a.processChildren?il(a.segmentGroup,a.index,s.commands):Cw(a.segmentGroup,a.index,s.commands);return Ng(o,a.segmentGroup,l,e,r,i)}function xd(n){return typeof n=="object"&&n!=null&&!n.outlets&&!n.segmentPath}function al(n){return typeof n=="object"&&n!=null&&n.outlets}function ew(n,t,e){n||="\u0275";let r=new bn;return r.queryParams={[n]:t},e.parse(e.serialize(r)).queryParams[n]}function Ng(n,t,e,r,i,o){let s={};for(let[c,u]of Object.entries(r??{}))s[c]=Array.isArray(u)?u.map(d=>ew(c,d,o)):ew(c,u,o);let a;n===t?a=e:a=_w(n,t,e);let l=mw(gw(a));return new bn(l,s,i)}function _w(n,t,e){let r={};return Object.entries(n.children).forEach(([i,o])=>{o===t?r[i]=e:r[i]=_w(o,t,e)}),new he(n.segments,r)}var Rd=class{isAbsolute;numberOfDoubleDots;commands;constructor(t,e,r){if(this.isAbsolute=t,this.numberOfDoubleDots=e,this.commands=r,t&&r.length>0&&xd(r[0]))throw new T(4003,!1);let i=r.find(al);if(i&&i!==Pk(r))throw new T(4004,!1)}toRoot(){return this.isAbsolute&&this.commands.length===1&&this.commands[0]=="/"}};function Jk(n){if(typeof n[0]=="string"&&n.length===1&&n[0]==="/")return new Rd(!0,0,n);let t=0,e=!1,r=n.reduce((i,o,s)=>{if(typeof o=="object"&&o!=null){if(o.outlets){let a={};return Object.entries(o.outlets).forEach(([l,c])=>{a[l]=typeof c=="string"?c.split("/"):c}),[...i,{outlets:a}]}if(o.segmentPath)return[...i,o.segmentPath]}return typeof o!="string"?[...i,o]:s===0?(o.split("/").forEach((a,l)=>{l==0&&a==="."||(l==0&&a===""?e=!0:a===".."?t++:a!=""&&i.push(a))}),i):[...i,o]},[]);return new Rd(e,t,r)}var bs=class{segmentGroup;processChildren;index;constructor(t,e,r){this.segmentGroup=t,this.processChildren=e,this.index=r}};function eO(n,t,e){if(n.isAbsolute)return new bs(t,!0,0);if(!e)return new bs(t,!1,NaN);if(e.parent===null)return new bs(e,!0,0);let r=xd(n.commands[0])?0:1,i=e.segments.length-1+r;return tO(e,i,n.numberOfDoubleDots)}function tO(n,t,e){let r=n,i=t,o=e;for(;o>i;){if(o-=i,r=r.parent,!r)throw new T(4005,!1);i=r.segments.length}return new bs(r,!1,i-o)}function nO(n){return al(n[0])?n[0].outlets:{[z]:n}}function Cw(n,t,e){if(n??=new he([],{}),n.segments.length===0&&n.hasChildren())return il(n,t,e);let r=rO(n,t,e),i=e.slice(r.commandIndex);if(r.match&&r.pathIndex<n.segments.length){let o=new he(n.segments.slice(0,r.pathIndex),{});return o.children[z]=new he(n.segments.slice(r.pathIndex),n.children),il(o,0,i)}else return r.match&&i.length===0?new he(n.segments,{}):r.match&&!n.hasChildren()?Ug(n,t,e):r.match?il(n,0,i):Ug(n,t,e)}function il(n,t,e){if(e.length===0)return new he(n.segments,{});{let r=nO(e),i={};if(Object.keys(r).some(o=>o!==z)&&n.children[z]&&n.numberOfChildren===1&&n.children[z].segments.length===0){let o=il(n.children[z],t,e);return new he(n.segments,o.children)}return Object.entries(r).forEach(([o,s])=>{typeof s=="string"&&(s=[s]),s!==null&&(i[o]=Cw(n.children[o],t,s))}),Object.entries(n.children).forEach(([o,s])=>{r[o]===void 0&&(i[o]=s)}),new he(n.segments,i)}}function rO(n,t,e){let r=0,i=t,o={match:!1,pathIndex:0,commandIndex:0};for(;i<n.segments.length;){if(r>=e.length)return o;let s=n.segments[i],a=e[r];if(al(a))break;let l=`${a}`,c=r<e.length-1?e[r+1]:null;if(i>0&&l===void 0)break;if(l&&c&&typeof c=="object"&&c.outlets===void 0){if(!nw(l,c,s))return o;r+=2}else{if(!nw(l,{},s))return o;r++}i++}return{match:!0,pathIndex:i,commandIndex:r}}function Ug(n,t,e){let r=n.segments.slice(0,t),i=0;for(;i<e.length;){let o=e[i];if(al(o)){let l=iO(o.outlets);return new he(r,l)}if(i===0&&xd(e[0])){let l=n.segments[t];r.push(new bi(l.path,tw(e[0]))),i++;continue}let s=al(o)?o.outlets[z]:`${o}`,a=i<e.length-1?e[i+1]:null;s&&a&&xd(a)?(r.push(new bi(s,tw(a))),i+=2):(r.push(new bi(s,{})),i++)}return new he(r,{})}function iO(n){let t={};return Object.entries(n).forEach(([e,r])=>{typeof r=="string"&&(r=[r]),r!==null&&(t[e]=Ug(new he([],{}),0,r))}),t}function tw(n){let t={};return Object.entries(n).forEach(([e,r])=>t[e]=`${r}`),t}function nw(n,t,e){return n==e.path&&mr(t,e.parameters)}var ol="imperative",it=(function(n){return n[n.NavigationStart=0]="NavigationStart",n[n.NavigationEnd=1]="NavigationEnd",n[n.NavigationCancel=2]="NavigationCancel",n[n.NavigationError=3]="NavigationError",n[n.RoutesRecognized=4]="RoutesRecognized",n[n.ResolveStart=5]="ResolveStart",n[n.ResolveEnd=6]="ResolveEnd",n[n.GuardsCheckStart=7]="GuardsCheckStart",n[n.GuardsCheckEnd=8]="GuardsCheckEnd",n[n.RouteConfigLoadStart=9]="RouteConfigLoadStart",n[n.RouteConfigLoadEnd=10]="RouteConfigLoadEnd",n[n.ChildActivationStart=11]="ChildActivationStart",n[n.ChildActivationEnd=12]="ChildActivationEnd",n[n.ActivationStart=13]="ActivationStart",n[n.ActivationEnd=14]="ActivationEnd",n[n.Scroll=15]="Scroll",n[n.NavigationSkipped=16]="NavigationSkipped",n})(it||{}),tn=class{id;url;constructor(t,e){this.id=t,this.url=e}},po=class extends tn{type=it.NavigationStart;navigationTrigger;restoredState;constructor(t,e,r="imperative",i=null){super(t,e),this.navigationTrigger=r,this.restoredState=i}toString(){return`NavigationStart(id: ${this.id}, url: '${this.url}')`}},Ur=class extends tn{urlAfterRedirects;type=it.NavigationEnd;constructor(t,e,r){super(t,e),this.urlAfterRedirects=r}toString(){return`NavigationEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}')`}},Dt=(function(n){return n[n.Redirect=0]="Redirect",n[n.SupersededByNewNavigation=1]="SupersededByNewNavigation",n[n.NoDataFromResolver=2]="NoDataFromResolver",n[n.GuardRejected=3]="GuardRejected",n[n.Aborted=4]="Aborted",n})(Dt||{}),ll=(function(n){return n[n.IgnoredSameUrlNavigation=0]="IgnoredSameUrlNavigation",n[n.IgnoredByUrlHandlingStrategy=1]="IgnoredByUrlHandlingStrategy",n})(ll||{}),vn=class extends tn{reason;code;type=it.NavigationCancel;constructor(t,e,r,i){super(t,e),this.reason=r,this.code=i}toString(){return`NavigationCancel(id: ${this.id}, url: '${this.url}')`}};function Ew(n){return n instanceof vn&&(n.code===Dt.Redirect||n.code===Dt.SupersededByNewNavigation)}var $r=class extends tn{reason;code;type=it.NavigationSkipped;constructor(t,e,r,i){super(t,e),this.reason=r,this.code=i}},mo=class extends tn{error;target;type=it.NavigationError;constructor(t,e,r,i){super(t,e),this.error=r,this.target=i}toString(){return`NavigationError(id: ${this.id}, url: '${this.url}', error: ${this.error})`}},cl=class extends tn{urlAfterRedirects;state;type=it.RoutesRecognized;constructor(t,e,r,i){super(t,e),this.urlAfterRedirects=r,this.state=i}toString(){return`RoutesRecognized(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`}},Ad=class extends tn{urlAfterRedirects;state;type=it.GuardsCheckStart;constructor(t,e,r,i){super(t,e),this.urlAfterRedirects=r,this.state=i}toString(){return`GuardsCheckStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`}},kd=class extends tn{urlAfterRedirects;state;shouldActivate;type=it.GuardsCheckEnd;constructor(t,e,r,i,o){super(t,e),this.urlAfterRedirects=r,this.state=i,this.shouldActivate=o}toString(){return`GuardsCheckEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state}, shouldActivate: ${this.shouldActivate})`}},Od=class extends tn{urlAfterRedirects;state;type=it.ResolveStart;constructor(t,e,r,i){super(t,e),this.urlAfterRedirects=r,this.state=i}toString(){return`ResolveStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`}},Nd=class extends tn{urlAfterRedirects;state;type=it.ResolveEnd;constructor(t,e,r,i){super(t,e),this.urlAfterRedirects=r,this.state=i}toString(){return`ResolveEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`}},Pd=class{route;type=it.RouteConfigLoadStart;constructor(t){this.route=t}toString(){return`RouteConfigLoadStart(path: ${this.route.path})`}},Ld=class{route;type=it.RouteConfigLoadEnd;constructor(t){this.route=t}toString(){return`RouteConfigLoadEnd(path: ${this.route.path})`}},Fd=class{snapshot;type=it.ChildActivationStart;constructor(t){this.snapshot=t}toString(){return`ChildActivationStart(path: '${this.snapshot.routeConfig&&this.snapshot.routeConfig.path||""}')`}},Bd=class{snapshot;type=it.ChildActivationEnd;constructor(t){this.snapshot=t}toString(){return`ChildActivationEnd(path: '${this.snapshot.routeConfig&&this.snapshot.routeConfig.path||""}')`}},jd=class{snapshot;type=it.ActivationStart;constructor(t){this.snapshot=t}toString(){return`ActivationStart(path: '${this.snapshot.routeConfig&&this.snapshot.routeConfig.path||""}')`}},Vd=class{snapshot;type=it.ActivationEnd;constructor(t){this.snapshot=t}toString(){return`ActivationEnd(path: '${this.snapshot.routeConfig&&this.snapshot.routeConfig.path||""}')`}};var Es=class{},ul=class{},Ds=class{url;navigationBehaviorOptions;constructor(t,e){this.url=t,this.navigationBehaviorOptions=e}};function oO(n){return!(n instanceof Es)&&!(n instanceof Ds)&&!(n instanceof ul)}var Ud=class{rootInjector;outlet=null;route=null;children;attachRef=null;get injector(){return this.route?.snapshot._environmentInjector??this.rootInjector}constructor(t){this.rootInjector=t,this.children=new Is(this.rootInjector)}},Is=(()=>{class n{rootInjector;contexts=new Map;constructor(e){this.rootInjector=e}onChildOutletCreated(e,r){let i=this.getOrCreateContext(e);i.outlet=r,this.contexts.set(e,i)}onChildOutletDestroyed(e){let r=this.getContext(e);r&&(r.outlet=null,r.attachRef=null)}onOutletDeactivated(){let e=this.contexts;return this.contexts=new Map,e}onOutletReAttached(e){this.contexts=e}getOrCreateContext(e){let r=this.getContext(e);return r||(r=new Ud(this.rootInjector),this.contexts.set(e,r)),r}getContext(e){return this.contexts.get(e)||null}static \u0275fac=function(r){return new(r||n)(H(Se))};static \u0275prov=y({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})(),$d=class{_root;constructor(t){this._root=t}get root(){return this._root.value}parent(t){let e=this.pathFromRoot(t);return e.length>1?e[e.length-2]:null}children(t){let e=$g(t,this._root);return e?e.children.map(r=>r.value):[]}firstChild(t){let e=$g(t,this._root);return e&&e.children.length>0?e.children[0].value:null}siblings(t){let e=Hg(t,this._root);return e.length<2?[]:e[e.length-2].children.map(i=>i.value).filter(i=>i!==t)}pathFromRoot(t){return Hg(t,this._root).map(e=>e.value)}};function $g(n,t){if(n===t.value)return t;for(let e of t.children){let r=$g(n,e);if(r)return r}return null}function Hg(n,t){if(n===t.value)return[t];for(let e of t.children){let r=Hg(n,e);if(r.length)return r.unshift(t),r}return[]}var en=class{value;children;constructor(t,e){this.value=t,this.children=e}toString(){return`TreeNode(${this.value})`}};function vs(n){let t={};return n&&n.children.forEach(e=>t[e.value.outlet]=e),t}var dl=class extends $d{snapshot;constructor(t,e){super(t),this.snapshot=e,Qg(this,t)}toString(){return this.snapshot.toString()}};function Dw(n,t){let e=sO(n,t),r=new Fe([new bi("",{})]),i=new Fe({}),o=new Fe({}),s=new Fe({}),a=new Fe(""),l=new Ci(r,i,s,a,o,z,n,e.root);return l.snapshot=e.root,new dl(new en(l,[]),e)}function sO(n,t){let e={},r={},i={},s=new ws([],e,i,"",r,z,n,null,{},t);return new fl("",new en(s,[]))}var Ci=class{urlSubject;paramsSubject;queryParamsSubject;fragmentSubject;dataSubject;outlet;component;snapshot;_futureSnapshot;_routerState;_paramMap;_queryParamMap;title;url;params;queryParams;fragment;data;constructor(t,e,r,i,o,s,a,l){this.urlSubject=t,this.paramsSubject=e,this.queryParamsSubject=r,this.fragmentSubject=i,this.dataSubject=o,this.outlet=s,this.component=a,this._futureSnapshot=l,this.title=this.dataSubject?.pipe(ee(c=>c[ml]))??x(void 0),this.url=t,this.params=e,this.queryParams=r,this.fragment=i,this.data=o}get routeConfig(){return this._futureSnapshot.routeConfig}get root(){return this._routerState.root}get parent(){return this._routerState.parent(this)}get firstChild(){return this._routerState.firstChild(this)}get children(){return this._routerState.children(this)}get pathFromRoot(){return this._routerState.pathFromRoot(this)}get paramMap(){return this._paramMap??=this.params.pipe(ee(t=>ho(t))),this._paramMap}get queryParamMap(){return this._queryParamMap??=this.queryParams.pipe(ee(t=>ho(t))),this._queryParamMap}toString(){return this.snapshot?this.snapshot.toString():`Future(${this._futureSnapshot})`}};function Xg(n,t,e="emptyOnly"){let r,{routeConfig:i}=n;return t!==null&&(e==="always"||i?.path===""||!t.component&&!t.routeConfig?.loadComponent)?r={params:g(g({},t.params),n.params),data:g(g({},t.data),n.data),resolve:g(g(g(g({},n.data),t.data),i?.data),n._resolvedData)}:r={params:g({},n.params),data:g({},n.data),resolve:g(g({},n.data),n._resolvedData??{})},i&&Tw(i)&&(r.resolve[ml]=i.title),r}var ws=class{url;params;queryParams;fragment;data;outlet;component;routeConfig;_resolve;_resolvedData;_routerState;_paramMap;_queryParamMap;_environmentInjector;get title(){return this.data?.[ml]}constructor(t,e,r,i,o,s,a,l,c,u){this.url=t,this.params=e,this.queryParams=r,this.fragment=i,this.data=o,this.outlet=s,this.component=a,this.routeConfig=l,this._resolve=c,this._environmentInjector=u}get root(){return this._routerState.root}get parent(){return this._routerState.parent(this)}get firstChild(){return this._routerState.firstChild(this)}get children(){return this._routerState.children(this)}get pathFromRoot(){return this._routerState.pathFromRoot(this)}get paramMap(){return this._paramMap??=ho(this.params),this._paramMap}get queryParamMap(){return this._queryParamMap??=ho(this.queryParams),this._queryParamMap}toString(){let t=this.url.map(r=>r.toString()).join("/"),e=this.routeConfig?this.routeConfig.path:"";return`Route(url:'${t}', path:'${e}')`}},fl=class extends $d{url;constructor(t,e){super(e),this.url=t,Qg(this,e)}toString(){return ww(this._root)}};function Qg(n,t){t.value._routerState=n,t.children.forEach(e=>Qg(n,e))}function ww(n){let t=n.children.length>0?` { ${n.children.map(ww).join(", ")} } `:"";return`${n.value}${t}`}function Pg(n){if(n.snapshot){let t=n.snapshot,e=n._futureSnapshot;n.snapshot=e,mr(t.queryParams,e.queryParams)||n.queryParamsSubject.next(e.queryParams),t.fragment!==e.fragment&&n.fragmentSubject.next(e.fragment),mr(t.params,e.params)||n.paramsSubject.next(e.params),Nk(t.url,e.url)||n.urlSubject.next(e.url),mr(t.data,e.data)||n.dataSubject.next(e.data)}else n.snapshot=n._futureSnapshot,n.dataSubject.next(n._futureSnapshot.data)}function zg(n,t){let e=mr(n.params,t.params)&&jk(n.url,t.url),r=!n.parent!=!t.parent;return e&&!r&&(!n.parent||zg(n.parent,t.parent))}function Tw(n){return typeof n.title=="string"||n.title===null}var Sw=new b(""),yl=(()=>{class n{activated=null;get activatedComponentRef(){return this.activated}_activatedRoute=null;name=z;activateEvents=new ne;deactivateEvents=new ne;attachEvents=new ne;detachEvents=new ne;routerOutletData=hr();parentContexts=h(Is);location=h(lt);changeDetector=h(Hn);inputBinder=h(Gd,{optional:!0});supportsBindingToComponentInputs=!0;ngOnChanges(e){if(e.name){let{firstChange:r,previousValue:i}=e.name;if(r)return;this.isTrackedInParentContexts(i)&&(this.deactivate(),this.parentContexts.onChildOutletDestroyed(i)),this.initializeOutletWithName()}}ngOnDestroy(){this.isTrackedInParentContexts(this.name)&&this.parentContexts.onChildOutletDestroyed(this.name),this.inputBinder?.unsubscribeFromRouteData(this)}isTrackedInParentContexts(e){return this.parentContexts.getContext(e)?.outlet===this}ngOnInit(){this.initializeOutletWithName()}initializeOutletWithName(){if(this.parentContexts.onChildOutletCreated(this.name,this),this.activated)return;let e=this.parentContexts.getContext(this.name);e?.route&&(e.attachRef?this.attach(e.attachRef,e.route):this.activateWith(e.route,e.injector))}get isActivated(){return!!this.activated}get component(){if(!this.activated)throw new T(4012,!1);return this.activated.instance}get activatedRoute(){if(!this.activated)throw new T(4012,!1);return this._activatedRoute}get activatedRouteData(){return this._activatedRoute?this._activatedRoute.snapshot.data:{}}detach(){if(!this.activated)throw new T(4012,!1);this.location.detach();let e=this.activated;return this.activated=null,this._activatedRoute=null,this.detachEvents.emit(e.instance),e}attach(e,r){this.activated=e,this._activatedRoute=r,this.location.insert(e.hostView),this.inputBinder?.bindActivatedRouteToOutletComponent(this),this.attachEvents.emit(e.instance)}deactivate(){if(this.activated){let e=this.component;this.activated.destroy(),this.activated=null,this._activatedRoute=null,this.deactivateEvents.emit(e)}}activateWith(e,r){if(this.isActivated)throw new T(4013,!1);this._activatedRoute=e;let i=this.location,s=e.snapshot.component,a=this.parentContexts.getOrCreateContext(this.name).children,l=new Wg(e,a,i.injector,this.routerOutletData);this.activated=i.createComponent(s,{index:i.length,injector:l,environmentInjector:r}),this.changeDetector.markForCheck(),this.inputBinder?.bindActivatedRouteToOutletComponent(this),this.activateEvents.emit(this.activated.instance)}static \u0275fac=function(r){return new(r||n)};static \u0275dir=ye({type:n,selectors:[["router-outlet"]],inputs:{name:"name",routerOutletData:[1,"routerOutletData"]},outputs:{activateEvents:"activate",deactivateEvents:"deactivate",attachEvents:"attach",detachEvents:"detach"},exportAs:["outlet"],features:[cr]})}return n})(),Wg=class{route;childContexts;parent;outletData;constructor(t,e,r,i){this.route=t,this.childContexts=e,this.parent=r,this.outletData=i}get(t,e){return t===Ci?this.route:t===Is?this.childContexts:t===Sw?this.outletData:this.parent.get(t,e)}},Gd=new b("");var Jg=(()=>{class n{static \u0275fac=function(r){return new(r||n)};static \u0275cmp=ge({type:n,selectors:[["ng-component"]],exportAs:["emptyRouterOutlet"],decls:1,vars:0,template:function(r,i){r&1&&Ue(0,"router-outlet")},dependencies:[yl],encapsulation:2})}return n})();function ey(n){let t=n.children&&n.children.map(ey),e=t?Y(g({},n),{children:t}):g({},n);return!e.component&&!e.loadComponent&&(t||e.loadChildren)&&e.outlet&&e.outlet!==z&&(e.component=Jg),e}function aO(n,t,e){let r=hl(n,t._root,e?e._root:void 0);return new dl(r,t)}function hl(n,t,e){if(e&&n.shouldReuseRoute(t.value,e.value.snapshot)){let r=e.value;r._futureSnapshot=t.value;let i=lO(n,t,e);return new en(r,i)}else{if(n.shouldAttach(t.value)){let o=n.retrieve(t.value);if(o!==null){let s=o.route;return s.value._futureSnapshot=t.value,s.children=t.children.map(a=>hl(n,a)),s}}let r=cO(t.value),i=t.children.map(o=>hl(n,o));return new en(r,i)}}function lO(n,t,e){return t.children.map(r=>{for(let i of e.children)if(n.shouldReuseRoute(r.value,i.value.snapshot))return hl(n,r,i);return hl(n,r)})}function cO(n){return new Ci(new Fe(n.url),new Fe(n.params),new Fe(n.queryParams),new Fe(n.fragment),new Fe(n.data),n.outlet,n.component,n)}var Ts=class{redirectTo;navigationBehaviorOptions;constructor(t,e){this.redirectTo=t,this.navigationBehaviorOptions=e}},Iw="ngNavigationCancelingError";function Hd(n,t){let{redirectTo:e,navigationBehaviorOptions:r}=Cs(t)?{redirectTo:t,navigationBehaviorOptions:void 0}:t,i=Mw(!1,Dt.Redirect);return i.url=e,i.navigationBehaviorOptions=r,i}function Mw(n,t){let e=new Error(`NavigationCancelingError: ${n||""}`);return e[Iw]=!0,e.cancellationCode=t,e}function uO(n){return xw(n)&&Cs(n.url)}function xw(n){return!!n&&n[Iw]}var Gg=class{routeReuseStrategy;futureState;currState;forwardEvent;inputBindingEnabled;constructor(t,e,r,i,o){this.routeReuseStrategy=t,this.futureState=e,this.currState=r,this.forwardEvent=i,this.inputBindingEnabled=o}activate(t){let e=this.futureState._root,r=this.currState?this.currState._root:null;this.deactivateChildRoutes(e,r,t),Pg(this.futureState.root),this.activateChildRoutes(e,r,t)}deactivateChildRoutes(t,e,r){let i=vs(e);t.children.forEach(o=>{let s=o.value.outlet;this.deactivateRoutes(o,i[s],r),delete i[s]}),Object.values(i).forEach(o=>{this.deactivateRouteAndItsChildren(o,r)})}deactivateRoutes(t,e,r){let i=t.value,o=e?e.value:null;if(i===o)if(i.component){let s=r.getContext(i.outlet);s&&this.deactivateChildRoutes(t,e,s.children)}else this.deactivateChildRoutes(t,e,r);else o&&this.deactivateRouteAndItsChildren(e,r)}deactivateRouteAndItsChildren(t,e){t.value.component&&this.routeReuseStrategy.shouldDetach(t.value.snapshot)?this.detachAndStoreRouteSubtree(t,e):this.deactivateRouteAndOutlet(t,e)}detachAndStoreRouteSubtree(t,e){let r=e.getContext(t.value.outlet),i=r&&t.value.component?r.children:e,o=vs(t);for(let s of Object.values(o))this.deactivateRouteAndItsChildren(s,i);if(r&&r.outlet){let s=r.outlet.detach(),a=r.children.onOutletDeactivated();this.routeReuseStrategy.store(t.value.snapshot,{componentRef:s,route:t,contexts:a})}}deactivateRouteAndOutlet(t,e){let r=e.getContext(t.value.outlet),i=r&&t.value.component?r.children:e,o=vs(t);for(let s of Object.values(o))this.deactivateRouteAndItsChildren(s,i);r&&(r.outlet&&(r.outlet.deactivate(),r.children.onOutletDeactivated()),r.attachRef=null,r.route=null)}activateChildRoutes(t,e,r){let i=vs(e);t.children.forEach(o=>{this.activateRoutes(o,i[o.value.outlet],r),this.forwardEvent(new Vd(o.value.snapshot))}),t.children.length&&this.forwardEvent(new Bd(t.value.snapshot))}activateRoutes(t,e,r){let i=t.value,o=e?e.value:null;if(Pg(i),i===o)if(i.component){let s=r.getOrCreateContext(i.outlet);this.activateChildRoutes(t,e,s.children)}else this.activateChildRoutes(t,e,r);else if(i.component){let s=r.getOrCreateContext(i.outlet);if(this.routeReuseStrategy.shouldAttach(i.snapshot)){let a=this.routeReuseStrategy.retrieve(i.snapshot);this.routeReuseStrategy.store(i.snapshot,null),s.children.onOutletReAttached(a.contexts),s.attachRef=a.componentRef,s.route=a.route.value,s.outlet&&s.outlet.attach(a.componentRef,a.route.value),Pg(a.route.value),this.activateChildRoutes(t,null,s.children)}else s.attachRef=null,s.route=i,s.outlet&&s.outlet.activateWith(i,s.injector),this.activateChildRoutes(t,null,s.children)}else this.activateChildRoutes(t,null,r)}},zd=class{path;route;constructor(t){this.path=t,this.route=this.path[this.path.length-1]}},_s=class{component;route;constructor(t,e){this.component=t,this.route=e}};function dO(n,t,e){let r=n._root,i=t?t._root:null;return rl(r,i,e,[r.value])}function fO(n){let t=n.routeConfig?n.routeConfig.canActivateChild:null;return!t||t.length===0?null:{node:n,guards:t}}function Ms(n,t){let e=Symbol(),r=t.get(n,e);return r===e?typeof n=="function"&&!Wh(n)?n:t.get(n):r}function rl(n,t,e,r,i={canDeactivateChecks:[],canActivateChecks:[]}){let o=vs(t);return n.children.forEach(s=>{hO(s,o[s.value.outlet],e,r.concat([s.value]),i),delete o[s.value.outlet]}),Object.entries(o).forEach(([s,a])=>sl(a,e.getContext(s),i)),i}function hO(n,t,e,r,i={canDeactivateChecks:[],canActivateChecks:[]}){let o=n.value,s=t?t.value:null,a=e?e.getContext(n.value.outlet):null;if(s&&o.routeConfig===s.routeConfig){let l=pO(s,o,o.routeConfig.runGuardsAndResolvers);l?i.canActivateChecks.push(new zd(r)):(o.data=s.data,o._resolvedData=s._resolvedData),o.component?rl(n,t,a?a.children:null,r,i):rl(n,t,e,r,i),l&&a&&a.outlet&&a.outlet.isActivated&&i.canDeactivateChecks.push(new _s(a.outlet.component,s))}else s&&sl(t,a,i),i.canActivateChecks.push(new zd(r)),o.component?rl(n,null,a?a.children:null,r,i):rl(n,null,e,r,i);return i}function pO(n,t,e){if(typeof e=="function")return yt(t._environmentInjector,()=>e(n,t));switch(e){case"pathParamsChange":return!fo(n.url,t.url);case"pathParamsOrQueryParamsChange":return!fo(n.url,t.url)||!mr(n.queryParams,t.queryParams);case"always":return!0;case"paramsOrQueryParamsChange":return!zg(n,t)||!mr(n.queryParams,t.queryParams);default:return!zg(n,t)}}function sl(n,t,e){let r=vs(n),i=n.value;Object.entries(r).forEach(([o,s])=>{i.component?t?sl(s,t.children.getContext(o),e):sl(s,null,e):sl(s,t,e)}),i.component?t&&t.outlet&&t.outlet.isActivated?e.canDeactivateChecks.push(new _s(t.outlet.component,i)):e.canDeactivateChecks.push(new _s(null,i)):e.canDeactivateChecks.push(new _s(null,i))}function vl(n){return typeof n=="function"}function mO(n){return typeof n=="boolean"}function gO(n){return n&&vl(n.canLoad)}function yO(n){return n&&vl(n.canActivate)}function vO(n){return n&&vl(n.canActivateChild)}function bO(n){return n&&vl(n.canDeactivate)}function _O(n){return n&&vl(n.canMatch)}function Rw(n){return n instanceof Dr||n?.name==="EmptyError"}var wd=Symbol("INITIAL_VALUE");function Ss(){return St(n=>oa(n.map(t=>t.pipe(gt(1),an(wd)))).pipe(ee(t=>{for(let e of t)if(e!==!0){if(e===wd)return wd;if(e===!1||CO(e))return e}return!0}),be(t=>t!==wd),gt(1)))}function CO(n){return Cs(n)||n instanceof Ts}function Aw(n){return n.aborted?x(void 0).pipe(gt(1)):new N(t=>{let e=()=>{t.next(),t.complete()};return n.addEventListener("abort",e),()=>n.removeEventListener("abort",e)})}function kw(n){return J(Aw(n))}function EO(n){return Tt(t=>{let{targetSnapshot:e,currentSnapshot:r,guards:{canActivateChecks:i,canDeactivateChecks:o}}=t;return o.length===0&&i.length===0?x(Y(g({},t),{guardsResult:!0})):DO(o,e,r).pipe(Tt(s=>s&&mO(s)?wO(e,i,n):x(s)),ee(s=>Y(g({},t),{guardsResult:s})))})}function DO(n,t,e){return Be(n).pipe(Tt(r=>xO(r.component,r.route,e,t)),Sr(r=>r!==!0,!0))}function wO(n,t,e){return Be(t).pipe(Fc(r=>ti(SO(r.route.parent,e),TO(r.route,e),MO(n,r.path),IO(n,r.route))),Sr(r=>r!==!0,!0))}function TO(n,t){return n!==null&&t&&t(new jd(n)),x(!0)}function SO(n,t){return n!==null&&t&&t(new Fd(n)),x(!0)}function IO(n,t){let e=t.routeConfig?t.routeConfig.canActivate:null;if(!e||e.length===0)return x(!0);let r=e.map(i=>sa(()=>{let o=t._environmentInjector,s=Ms(i,o),a=yO(s)?s.canActivate(t,n):yt(o,()=>s(t,n));return go(a).pipe(Sr())}));return x(r).pipe(Ss())}function MO(n,t){let e=t[t.length-1],i=t.slice(0,t.length-1).reverse().map(o=>fO(o)).filter(o=>o!==null).map(o=>sa(()=>{let s=o.guards.map(a=>{let l=o.node._environmentInjector,c=Ms(a,l),u=vO(c)?c.canActivateChild(e,n):yt(l,()=>c(e,n));return go(u).pipe(Sr())});return x(s).pipe(Ss())}));return x(i).pipe(Ss())}function xO(n,t,e,r){let i=t&&t.routeConfig?t.routeConfig.canDeactivate:null;if(!i||i.length===0)return x(!0);let o=i.map(s=>{let a=t._environmentInjector,l=Ms(s,a),c=bO(l)?l.canDeactivate(n,t,e,r):yt(a,()=>l(n,t,e,r));return go(c).pipe(Sr())});return x(o).pipe(Ss())}function RO(n,t,e,r,i){let o=t.canLoad;if(o===void 0||o.length===0)return x(!0);let s=o.map(a=>{let l=Ms(a,n),c=gO(l)?l.canLoad(t,e):yt(n,()=>l(t,e)),u=go(c);return i?u.pipe(kw(i)):u});return x(s).pipe(Ss(),Ow(r))}function Ow(n){return yh(Xe(t=>{if(typeof t!="boolean")throw Hd(n,t)}),ee(t=>t===!0))}function AO(n,t,e,r,i,o){let s=t.canMatch;if(!s||s.length===0)return x(!0);let a=s.map(l=>{let c=Ms(l,n),u=_O(c)?c.canMatch(t,e,i):yt(n,()=>c(t,e,i));return go(u).pipe(kw(o))});return x(a).pipe(Ss(),Ow(r))}var Vr=class n extends Error{segmentGroup;constructor(t){super(),this.segmentGroup=t||null,Object.setPrototypeOf(this,n.prototype)}},pl=class n extends Error{urlTree;constructor(t){super(),this.urlTree=t,Object.setPrototypeOf(this,n.prototype)}};function kO(n){throw new T(4e3,!1)}function OO(n){throw Mw(!1,Dt.GuardRejected)}var qg=class{urlSerializer;urlTree;constructor(t,e){this.urlSerializer=t,this.urlTree=e}async lineralizeSegments(t,e){let r=[],i=e.root;for(;;){if(r=r.concat(i.segments),i.numberOfChildren===0)return r;if(i.numberOfChildren>1||!i.children[z])throw kO(`${t.redirectTo}`);i=i.children[z]}}async applyRedirectCommands(t,e,r,i,o){let s=await NO(e,i,o);if(s instanceof bn)throw new pl(s);let a=this.applyRedirectCreateUrlTree(s,this.urlSerializer.parse(s),t,r);if(s[0]==="/")throw new pl(a);return a}applyRedirectCreateUrlTree(t,e,r,i){let o=this.createSegmentGroup(t,e.root,r,i);return new bn(o,this.createQueryParams(e.queryParams,this.urlTree.queryParams),e.fragment)}createQueryParams(t,e){let r={};return Object.entries(t).forEach(([i,o])=>{if(typeof o=="string"&&o[0]===":"){let a=o.substring(1);r[i]=e[a]}else r[i]=o}),r}createSegmentGroup(t,e,r,i){let o=this.createSegments(t,e.segments,r,i),s={};return Object.entries(e.children).forEach(([a,l])=>{s[a]=this.createSegmentGroup(t,l,r,i)}),new he(o,s)}createSegments(t,e,r,i){return e.map(o=>o.path[0]===":"?this.findPosParam(t,o,i):this.findOrReturn(o,r))}findPosParam(t,e,r){let i=r[e.path.substring(1)];if(!i)throw new T(4001,!1);return i}findOrReturn(t,e){let r=0;for(let i of e){if(i.path===t.path)return e.splice(r),i;r++}return t}};function NO(n,t,e){if(typeof n=="string")return Promise.resolve(n);let r=n;return Md(go(yt(e,()=>r(t))))}function PO(n,t){return n.providers&&!n._injector&&(n._injector=Ua(n.providers,t,`Route: ${n.path}`)),n._injector??t}function Gn(n){return n.outlet||z}function LO(n,t){let e=n.filter(r=>Gn(r)===t);return e.push(...n.filter(r=>Gn(r)!==t)),e}var Kg={matched:!1,consumedSegments:[],remainingSegments:[],parameters:{},positionalParamSegments:{}};function Nw(n){return{routeConfig:n.routeConfig,url:n.url,params:n.params,queryParams:n.queryParams,fragment:n.fragment,data:n.data,outlet:n.outlet,title:n.title,paramMap:n.paramMap,queryParamMap:n.queryParamMap}}function FO(n,t,e,r,i,o,s){let a=Pw(n,t,e);if(!a.matched)return x(a);let l=Nw(o(a));return r=PO(t,r),AO(r,t,e,i,l,s).pipe(ee(c=>c===!0?a:g({},Kg)))}function Pw(n,t,e){if(t.path==="")return t.pathMatch==="full"&&(n.hasChildren()||e.length>0)?g({},Kg):{matched:!0,consumedSegments:[],remainingSegments:e,parameters:{},positionalParamSegments:{}};let i=(t.matcher||ow)(e,n,t);if(!i)return g({},Kg);let o={};Object.entries(i.posParams??{}).forEach(([a,l])=>{o[a]=l.path});let s=i.consumed.length>0?g(g({},o),i.consumed[i.consumed.length-1].parameters):o;return{matched:!0,consumedSegments:i.consumed,remainingSegments:e.slice(i.consumed.length),parameters:s,positionalParamSegments:i.posParams??{}}}function rw(n,t,e,r,i){return e.length>0&&VO(n,e,r,i)?{segmentGroup:new he(t,jO(r,new he(e,n.children))),slicedSegments:[]}:e.length===0&&UO(n,e,r)?{segmentGroup:new he(n.segments,BO(n,e,r,n.children)),slicedSegments:e}:{segmentGroup:new he(n.segments,n.children),slicedSegments:e}}function BO(n,t,e,r){let i={};for(let o of e)if(qd(n,t,o)&&!r[Gn(o)]){let s=new he([],{});i[Gn(o)]=s}return g(g({},r),i)}function jO(n,t){let e={};e[z]=t;for(let r of n)if(r.path===""&&Gn(r)!==z){let i=new he([],{});e[Gn(r)]=i}return e}function VO(n,t,e,r){return e.some(i=>!qd(n,t,i)||!(Gn(i)!==z)?!1:!(r!==void 0&&Gn(i)===r))}function UO(n,t,e){return e.some(r=>qd(n,t,r))}function qd(n,t,e){return(n.hasChildren()||t.length>0)&&e.pathMatch==="full"?!1:e.path===""}function $O(n,t,e){return t.length===0&&!n.children[e]}var Yg=class{};async function HO(n,t,e,r,i,o,s="emptyOnly",a){return new Zg(n,t,e,r,i,s,o,a).recognize()}var zO=31,Zg=class{injector;configLoader;rootComponentType;config;urlTree;paramsInheritanceStrategy;urlSerializer;abortSignal;applyRedirects;absoluteRedirectCount=0;allowRedirects=!0;constructor(t,e,r,i,o,s,a,l){this.injector=t,this.configLoader=e,this.rootComponentType=r,this.config=i,this.urlTree=o,this.paramsInheritanceStrategy=s,this.urlSerializer=a,this.abortSignal=l,this.applyRedirects=new qg(this.urlSerializer,this.urlTree)}noMatchError(t){return new T(4002,`'${t.segmentGroup}'`)}async recognize(){let t=rw(this.urlTree.root,[],[],this.config).segmentGroup,{children:e,rootSnapshot:r}=await this.match(t),i=new en(r,e),o=new fl("",i),s=yw(r,[],this.urlTree.queryParams,this.urlTree.fragment);return s.queryParams=this.urlTree.queryParams,o.url=this.urlSerializer.serialize(s),{state:o,tree:s}}async match(t){let e=new ws([],Object.freeze({}),Object.freeze(g({},this.urlTree.queryParams)),this.urlTree.fragment,Object.freeze({}),z,this.rootComponentType,null,{},this.injector);try{return{children:await this.processSegmentGroup(this.injector,this.config,t,z,e),rootSnapshot:e}}catch(r){if(r instanceof pl)return this.urlTree=r.urlTree,this.match(r.urlTree.root);throw r instanceof Vr?this.noMatchError(r):r}}async processSegmentGroup(t,e,r,i,o){if(r.segments.length===0&&r.hasChildren())return this.processChildren(t,e,r,o);let s=await this.processSegment(t,e,r,r.segments,i,!0,o);return s instanceof en?[s]:[]}async processChildren(t,e,r,i){let o=[];for(let l of Object.keys(r.children))l==="primary"?o.unshift(l):o.push(l);let s=[];for(let l of o){let c=r.children[l],u=LO(e,l),d=await this.processSegmentGroup(t,u,c,l,i);s.push(...d)}let a=Lw(s);return WO(a),a}async processSegment(t,e,r,i,o,s,a){for(let l of e)try{return await this.processSegmentAgainstRoute(l._injector??t,e,l,r,i,o,s,a)}catch(c){if(c instanceof Vr||Rw(c))continue;throw c}if($O(r,i,o))return new Yg;throw new Vr(r)}async processSegmentAgainstRoute(t,e,r,i,o,s,a,l){if(Gn(r)!==s&&(s===z||!qd(i,o,r)))throw new Vr(i);if(r.redirectTo===void 0)return this.matchSegmentAgainstRoute(t,i,r,o,s,l);if(this.allowRedirects&&a)return this.expandSegmentAgainstRouteUsingRedirect(t,i,e,r,o,s,l);throw new Vr(i)}async expandSegmentAgainstRouteUsingRedirect(t,e,r,i,o,s,a){let{matched:l,parameters:c,consumedSegments:u,positionalParamSegments:d,remainingSegments:f}=Pw(e,i,o);if(!l)throw new Vr(e);typeof i.redirectTo=="string"&&i.redirectTo[0]==="/"&&(this.absoluteRedirectCount++,this.absoluteRedirectCount>zO&&(this.allowRedirects=!1));let p=this.createSnapshot(t,i,o,c,a);if(this.abortSignal.aborted)throw new Error(this.abortSignal.reason);let m=await this.applyRedirects.applyRedirectCommands(u,i.redirectTo,d,Nw(p),t),v=await this.applyRedirects.lineralizeSegments(i,m);return this.processSegment(t,r,e,v.concat(f),s,!1,a)}createSnapshot(t,e,r,i,o){let s=new ws(r,i,Object.freeze(g({},this.urlTree.queryParams)),this.urlTree.fragment,qO(e),Gn(e),e.component??e._loadedComponent??null,e,KO(e),t),a=Xg(s,o,this.paramsInheritanceStrategy);return s.params=Object.freeze(a.params),s.data=Object.freeze(a.data),s}async matchSegmentAgainstRoute(t,e,r,i,o,s){if(this.abortSignal.aborted)throw new Error(this.abortSignal.reason);let a=Pe=>this.createSnapshot(t,r,Pe.consumedSegments,Pe.parameters,s),l=await Md(FO(e,r,i,t,this.urlSerializer,a,this.abortSignal));if(r.path==="**"&&(e.children={}),!l?.matched)throw new Vr(e);t=r._injector??t;let{routes:c}=await this.getChildConfig(t,r,i),u=r._loadedInjector??t,{parameters:d,consumedSegments:f,remainingSegments:p}=l,m=this.createSnapshot(t,r,f,d,s),{segmentGroup:v,slicedSegments:I}=rw(e,f,p,c,o);if(I.length===0&&v.hasChildren()){let Pe=await this.processChildren(u,c,v,m);return new en(m,Pe)}if(c.length===0&&I.length===0)return new en(m,[]);let R=Gn(r)===o,te=await this.processSegment(u,c,v,I,R?z:o,!0,m);return new en(m,te instanceof en?[te]:[])}async getChildConfig(t,e,r){if(e.children)return{routes:e.children,injector:t};if(e.loadChildren){if(e._loadedRoutes!==void 0){let o=e._loadedNgModuleFactory;return o&&!e._loadedInjector&&(e._loadedInjector=o.create(t).injector),{routes:e._loadedRoutes,injector:e._loadedInjector}}if(this.abortSignal.aborted)throw new Error(this.abortSignal.reason);if(await Md(RO(t,e,r,this.urlSerializer,this.abortSignal))){let o=await this.configLoader.loadChildren(t,e);return e._loadedRoutes=o.routes,e._loadedInjector=o.injector,e._loadedNgModuleFactory=o.factory,o}throw OO(e)}return{routes:[],injector:t}}};function WO(n){n.sort((t,e)=>t.value.outlet===z?-1:e.value.outlet===z?1:t.value.outlet.localeCompare(e.value.outlet))}function GO(n){let t=n.value.routeConfig;return t&&t.path===""}function Lw(n){let t=[],e=new Set;for(let r of n){if(!GO(r)){t.push(r);continue}let i=t.find(o=>r.value.routeConfig===o.value.routeConfig);i!==void 0?(i.children.push(...r.children),e.add(i)):t.push(r)}for(let r of e){let i=Lw(r.children);t.push(new en(r.value,i))}return t.filter(r=>!e.has(r))}function qO(n){return n.data||{}}function KO(n){return n.resolve||{}}function YO(n,t,e,r,i,o,s){return Tt(async a=>{let{state:l,tree:c}=await HO(n,t,e,r,a.extractedUrl,i,o,s);return Y(g({},a),{targetSnapshot:l,urlAfterRedirects:c})})}function ZO(n){return Tt(t=>{let{targetSnapshot:e,guards:{canActivateChecks:r}}=t;if(!r.length)return x(t);let i=new Set(r.map(a=>a.route)),o=new Set;for(let a of i)if(!o.has(a))for(let l of Fw(a))o.add(l);let s=0;return Be(o).pipe(Fc(a=>i.has(a)?XO(a,e,n):(a.data=Xg(a,a.parent,n).resolve,x(void 0))),Xe(()=>s++),Bc(1),Tt(a=>s===o.size?x(t):Ce))})}function Fw(n){let t=n.children.map(e=>Fw(e)).flat();return[n,...t]}function XO(n,t,e){let r=n.routeConfig,i=n._resolve;return r?.title!==void 0&&!Tw(r)&&(i[ml]=r.title),sa(()=>(n.data=Xg(n,n.parent,e).resolve,QO(i,n,t).pipe(ee(o=>(n._resolvedData=o,n.data=g(g({},n.data),o),null)))))}function QO(n,t,e){let r=Fg(n);if(r.length===0)return x({});let i={};return Be(r).pipe(Tt(o=>JO(n[o],t,e).pipe(Sr(),Xe(s=>{if(s instanceof Ts)throw Hd(new _i,s);i[o]=s}))),Bc(1),ee(()=>i),wr(o=>Rw(o)?Ce:Sh(o)))}function JO(n,t,e){let r=t._environmentInjector,i=Ms(n,r),o=i.resolve?i.resolve(t,e):yt(r,()=>i(t,e));return go(o)}function iw(n){return St(t=>{let e=n(t);return e?Be(e).pipe(ee(()=>t)):x(t)})}var ty=(()=>{class n{buildTitle(e){let r,i=e.root;for(;i!==void 0;)r=this.getResolvedTitleForRoute(i)??r,i=i.children.find(o=>o.outlet===z);return r}getResolvedTitleForRoute(e){return e.data[ml]}static \u0275fac=function(r){return new(r||n)};static \u0275prov=y({token:n,factory:()=>h(Bw),providedIn:"root"})}return n})(),Bw=(()=>{class n extends ty{title;constructor(e){super(),this.title=e}updateTitle(e){let r=this.buildTitle(e);r!==void 0&&this.title.setTitle(r)}static \u0275fac=function(r){return new(r||n)(H(XD))};static \u0275prov=y({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})(),bl=new b("",{factory:()=>({})}),_l=new b(""),jw=(()=>{class n{componentLoaders=new WeakMap;childrenLoaders=new WeakMap;onLoadStartListener;onLoadEndListener;compiler=h(eg);async loadComponent(e,r){if(this.componentLoaders.get(r))return this.componentLoaders.get(r);if(r._loadedComponent)return Promise.resolve(r._loadedComponent);this.onLoadStartListener&&this.onLoadStartListener(r);let i=(async()=>{try{let o=await aw(yt(e,()=>r.loadComponent())),s=await $w(Uw(o));return this.onLoadEndListener&&this.onLoadEndListener(r),r._loadedComponent=s,s}finally{this.componentLoaders.delete(r)}})();return this.componentLoaders.set(r,i),i}loadChildren(e,r){if(this.childrenLoaders.get(r))return this.childrenLoaders.get(r);if(r._loadedRoutes)return Promise.resolve({routes:r._loadedRoutes,injector:r._loadedInjector});this.onLoadStartListener&&this.onLoadStartListener(r);let i=(async()=>{try{let o=await Vw(r,this.compiler,e,this.onLoadEndListener);return r._loadedRoutes=o.routes,r._loadedInjector=o.injector,r._loadedNgModuleFactory=o.factory,o}finally{this.childrenLoaders.delete(r)}})();return this.childrenLoaders.set(r,i),i}static \u0275fac=function(r){return new(r||n)};static \u0275prov=y({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})();async function Vw(n,t,e,r){let i=await aw(yt(e,()=>n.loadChildren())),o=await $w(Uw(i)),s;o instanceof Wu||Array.isArray(o)?s=o:s=await t.compileModuleAsync(o),r&&r(n);let a,l,c=!1,u;return Array.isArray(s)?(l=s,c=!0):(a=s.create(e).injector,u=s,l=a.get(_l,[],{optional:!0,self:!0}).flat()),{routes:l.map(ey),injector:a,factory:u}}function eN(n){return n&&typeof n=="object"&&"default"in n}function Uw(n){return eN(n)?n.default:n}async function $w(n){return n}var Kd=(()=>{class n{static \u0275fac=function(r){return new(r||n)};static \u0275prov=y({token:n,factory:()=>h(tN),providedIn:"root"})}return n})(),tN=(()=>{class n{shouldProcessUrl(e){return!0}extract(e){return e}merge(e,r){return e}static \u0275fac=function(r){return new(r||n)};static \u0275prov=y({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})(),Hw=new b("");var nN=()=>{},zw=new b(""),Ww=(()=>{class n{currentNavigation=Re(null,{equal:()=>!1});currentTransition=null;lastSuccessfulNavigation=Re(null);events=new C;transitionAbortWithErrorSubject=new C;configLoader=h(jw);environmentInjector=h(Se);destroyRef=h(Ke);urlSerializer=h(gl);rootContexts=h(Is);location=h(Br);inputBindingEnabled=h(Gd,{optional:!0})!==null;titleStrategy=h(ty);options=h(bl,{optional:!0})||{};paramsInheritanceStrategy=this.options.paramsInheritanceStrategy||"emptyOnly";urlHandlingStrategy=h(Kd);createViewTransition=h(Hw,{optional:!0});navigationErrorHandler=h(zw,{optional:!0});navigationId=0;get hasRequestedNavigation(){return this.navigationId!==0}transitions;afterPreactivation=()=>x(void 0);rootComponentType=null;destroyed=!1;constructor(){let e=i=>this.events.next(new Pd(i)),r=i=>this.events.next(new Ld(i));this.configLoader.onLoadEndListener=r,this.configLoader.onLoadStartListener=e,this.destroyRef.onDestroy(()=>{this.destroyed=!0})}complete(){this.transitions?.complete()}handleNavigationRequest(e){let r=++this.navigationId;$n(()=>{this.transitions?.next(Y(g({},e),{extractedUrl:this.urlHandlingStrategy.extract(e.rawUrl),targetSnapshot:null,targetRouterState:null,guards:{canActivateChecks:[],canDeactivateChecks:[]},guardsResult:null,id:r,routesRecognizeHandler:{},beforeActivateHandler:{}}))})}setupNavigations(e){return this.transitions=new Fe(null),this.transitions.pipe(be(r=>r!==null),St(r=>{let i=!1,o=new AbortController,s=()=>!i&&this.currentTransition?.id===r.id;return x(r).pipe(St(a=>{if(this.navigationId>r.id)return this.cancelNavigationTransition(r,"",Dt.SupersededByNewNavigation),Ce;this.currentTransition=r;let l=this.lastSuccessfulNavigation();this.currentNavigation.set({id:a.id,initialUrl:a.rawUrl,extractedUrl:a.extractedUrl,targetBrowserUrl:typeof a.extras.browserUrl=="string"?this.urlSerializer.parse(a.extras.browserUrl):a.extras.browserUrl,trigger:a.source,extras:a.extras,previousNavigation:l?Y(g({},l),{previousNavigation:null}):null,abort:()=>o.abort(),routesRecognizeHandler:a.routesRecognizeHandler,beforeActivateHandler:a.beforeActivateHandler});let c=!e.navigated||this.isUpdatingInternalState()||this.isUpdatedBrowserUrl(),u=a.extras.onSameUrlNavigation??e.onSameUrlNavigation;if(!c&&u!=="reload")return this.events.next(new $r(a.id,this.urlSerializer.serialize(a.rawUrl),"",ll.IgnoredSameUrlNavigation)),a.resolve(!1),Ce;if(this.urlHandlingStrategy.shouldProcessUrl(a.rawUrl))return x(a).pipe(St(d=>(this.events.next(new po(d.id,this.urlSerializer.serialize(d.extractedUrl),d.source,d.restoredState)),d.id!==this.navigationId?Ce:Promise.resolve(d))),YO(this.environmentInjector,this.configLoader,this.rootComponentType,e.config,this.urlSerializer,this.paramsInheritanceStrategy,o.signal),Xe(d=>{r.targetSnapshot=d.targetSnapshot,r.urlAfterRedirects=d.urlAfterRedirects,this.currentNavigation.update(f=>(f.finalUrl=d.urlAfterRedirects,f)),this.events.next(new ul)}),St(d=>Be(r.routesRecognizeHandler.deferredHandle??x(void 0)).pipe(ee(()=>d))),Xe(()=>{let d=new cl(a.id,this.urlSerializer.serialize(a.extractedUrl),this.urlSerializer.serialize(a.urlAfterRedirects),a.targetSnapshot);this.events.next(d)}));if(c&&this.urlHandlingStrategy.shouldProcessUrl(a.currentRawUrl)){let{id:d,extractedUrl:f,source:p,restoredState:m,extras:v}=a,I=new po(d,this.urlSerializer.serialize(f),p,m);this.events.next(I);let R=Dw(this.rootComponentType,this.environmentInjector).snapshot;return this.currentTransition=r=Y(g({},a),{targetSnapshot:R,urlAfterRedirects:f,extras:Y(g({},v),{skipLocationChange:!1,replaceUrl:!1})}),this.currentNavigation.update(te=>(te.finalUrl=f,te)),x(r)}else return this.events.next(new $r(a.id,this.urlSerializer.serialize(a.extractedUrl),"",ll.IgnoredByUrlHandlingStrategy)),a.resolve(!1),Ce}),ee(a=>{let l=new Ad(a.id,this.urlSerializer.serialize(a.extractedUrl),this.urlSerializer.serialize(a.urlAfterRedirects),a.targetSnapshot);return this.events.next(l),this.currentTransition=r=Y(g({},a),{guards:dO(a.targetSnapshot,a.currentSnapshot,this.rootContexts)}),r}),EO(a=>this.events.next(a)),St(a=>{if(r.guardsResult=a.guardsResult,a.guardsResult&&typeof a.guardsResult!="boolean")throw Hd(this.urlSerializer,a.guardsResult);let l=new kd(a.id,this.urlSerializer.serialize(a.extractedUrl),this.urlSerializer.serialize(a.urlAfterRedirects),a.targetSnapshot,!!a.guardsResult);if(this.events.next(l),!s())return Ce;if(!a.guardsResult)return this.cancelNavigationTransition(a,"",Dt.GuardRejected),Ce;if(a.guards.canActivateChecks.length===0)return x(a);let c=new Od(a.id,this.urlSerializer.serialize(a.extractedUrl),this.urlSerializer.serialize(a.urlAfterRedirects),a.targetSnapshot);if(this.events.next(c),!s())return Ce;let u=!1;return x(a).pipe(ZO(this.paramsInheritanceStrategy),Xe({next:()=>{u=!0;let d=new Nd(a.id,this.urlSerializer.serialize(a.extractedUrl),this.urlSerializer.serialize(a.urlAfterRedirects),a.targetSnapshot);this.events.next(d)},complete:()=>{u||this.cancelNavigationTransition(a,"",Dt.NoDataFromResolver)}}))}),iw(a=>{let l=u=>{let d=[];if(u.routeConfig?._loadedComponent)u.component=u.routeConfig?._loadedComponent;else if(u.routeConfig?.loadComponent){let f=u._environmentInjector;d.push(this.configLoader.loadComponent(f,u.routeConfig).then(p=>{u.component=p}))}for(let f of u.children)d.push(...l(f));return d},c=l(a.targetSnapshot.root);return c.length===0?x(a):Be(Promise.all(c).then(()=>a))}),iw(()=>this.afterPreactivation()),St(()=>{let{currentSnapshot:a,targetSnapshot:l}=r,c=this.createViewTransition?.(this.environmentInjector,a.root,l.root);return c?Be(c).pipe(ee(()=>r)):x(r)}),gt(1),St(a=>{let l=aO(e.routeReuseStrategy,a.targetSnapshot,a.currentRouterState);this.currentTransition=r=a=Y(g({},a),{targetRouterState:l}),this.currentNavigation.update(u=>(u.targetRouterState=l,u)),this.events.next(new Es);let c=r.beforeActivateHandler.deferredHandle;return c?Be(c.then(()=>a)):x(a)}),Xe(a=>{new Gg(e.routeReuseStrategy,r.targetRouterState,r.currentRouterState,l=>this.events.next(l),this.inputBindingEnabled).activate(this.rootContexts),s()&&(i=!0,this.currentNavigation.update(l=>(l.abort=nN,l)),this.lastSuccessfulNavigation.set($n(this.currentNavigation)),this.events.next(new Ur(a.id,this.urlSerializer.serialize(a.extractedUrl),this.urlSerializer.serialize(a.urlAfterRedirects))),this.titleStrategy?.updateTitle(a.targetRouterState.snapshot),a.resolve(!0))}),J(Aw(o.signal).pipe(be(()=>!i&&!r.targetRouterState),Xe(()=>{this.cancelNavigationTransition(r,o.signal.reason+"",Dt.Aborted)}))),Xe({complete:()=>{i=!0}}),J(this.transitionAbortWithErrorSubject.pipe(Xe(a=>{throw a}))),Ih(()=>{o.abort(),i||this.cancelNavigationTransition(r,"",Dt.SupersededByNewNavigation),this.currentTransition?.id===r.id&&(this.currentNavigation.set(null),this.currentTransition=null)}),wr(a=>{if(i=!0,this.destroyed)return r.resolve(!1),Ce;if(xw(a))this.events.next(new vn(r.id,this.urlSerializer.serialize(r.extractedUrl),a.message,a.cancellationCode)),uO(a)?this.events.next(new Ds(a.url,a.navigationBehaviorOptions)):r.resolve(!1);else{let l=new mo(r.id,this.urlSerializer.serialize(r.extractedUrl),a,r.targetSnapshot??void 0);try{let c=yt(this.environmentInjector,()=>this.navigationErrorHandler?.(l));if(c instanceof Ts){let{message:u,cancellationCode:d}=Hd(this.urlSerializer,c);this.events.next(new vn(r.id,this.urlSerializer.serialize(r.extractedUrl),u,d)),this.events.next(new Ds(c.redirectTo,c.navigationBehaviorOptions))}else throw this.events.next(l),a}catch(c){this.options.resolveNavigationPromiseOnError?r.resolve(!1):r.reject(c)}}return Ce}))}))}cancelNavigationTransition(e,r,i){let o=new vn(e.id,this.urlSerializer.serialize(e.extractedUrl),r,i);this.events.next(o),e.resolve(!1)}isUpdatingInternalState(){return this.currentTransition?.extractedUrl.toString()!==this.currentTransition?.currentUrlTree.toString()}isUpdatedBrowserUrl(){let e=this.urlHandlingStrategy.extract(this.urlSerializer.parse(this.location.path(!0))),r=$n(this.currentNavigation),i=r?.targetBrowserUrl??r?.extractedUrl;return e.toString()!==i?.toString()&&!r?.extras.skipLocationChange}static \u0275fac=function(r){return new(r||n)};static \u0275prov=y({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})();function rN(n){return n!==ol}var Gw=new b("");var qw=(()=>{class n{static \u0275fac=function(r){return new(r||n)};static \u0275prov=y({token:n,factory:()=>h(iN),providedIn:"root"})}return n})(),Wd=class{shouldDetach(t){return!1}store(t,e){}shouldAttach(t){return!1}retrieve(t){return null}shouldReuseRoute(t,e){return t.routeConfig===e.routeConfig}shouldDestroyInjector(t){return!0}},iN=(()=>{class n extends Wd{static \u0275fac=(()=>{let e;return function(i){return(e||(e=hn(n)))(i||n)}})();static \u0275prov=y({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})(),ny=(()=>{class n{urlSerializer=h(gl);options=h(bl,{optional:!0})||{};canceledNavigationResolution=this.options.canceledNavigationResolution||"replace";location=h(Br);urlHandlingStrategy=h(Kd);urlUpdateStrategy=this.options.urlUpdateStrategy||"deferred";currentUrlTree=new bn;getCurrentUrlTree(){return this.currentUrlTree}rawUrlTree=this.currentUrlTree;getRawUrlTree(){return this.rawUrlTree}createBrowserPath({finalUrl:e,initialUrl:r,targetBrowserUrl:i}){let o=e!==void 0?this.urlHandlingStrategy.merge(e,r):r,s=i??o;return s instanceof bn?this.urlSerializer.serialize(s):s}routerUrlState(e){return e?.targetBrowserUrl===void 0||e?.finalUrl===void 0?{}:{\u0275routerUrl:this.urlSerializer.serialize(e.finalUrl)}}commitTransition({targetRouterState:e,finalUrl:r,initialUrl:i}){r&&e?(this.currentUrlTree=r,this.rawUrlTree=this.urlHandlingStrategy.merge(r,i),this.routerState=e):this.rawUrlTree=i}routerState=Dw(null,h(Se));getRouterState(){return this.routerState}_stateMemento=this.createStateMemento();get stateMemento(){return this._stateMemento}updateStateMemento(){this._stateMemento=this.createStateMemento()}createStateMemento(){return{rawUrlTree:this.rawUrlTree,currentUrlTree:this.currentUrlTree,routerState:this.routerState}}restoredState(){return this.location.getState()}static \u0275fac=function(r){return new(r||n)};static \u0275prov=y({token:n,factory:()=>h(oN),providedIn:"root"})}return n})(),oN=(()=>{class n extends ny{currentPageId=0;lastSuccessfulId=-1;get browserPageId(){return this.canceledNavigationResolution!=="computed"?this.currentPageId:this.restoredState()?.\u0275routerPageId??this.currentPageId}registerNonRouterCurrentEntryChangeListener(e){return this.location.subscribe(r=>{r.type==="popstate"&&setTimeout(()=>{e(r.url,r.state,"popstate",{replaceUrl:!0})})})}handleRouterEvent(e,r){e instanceof po?this.updateStateMemento():e instanceof $r?this.commitTransition(r):e instanceof cl?this.urlUpdateStrategy==="eager"&&(r.extras.skipLocationChange||this.setBrowserUrl(this.createBrowserPath(r),r)):e instanceof Es?(this.commitTransition(r),this.urlUpdateStrategy==="deferred"&&!r.extras.skipLocationChange&&this.setBrowserUrl(this.createBrowserPath(r),r)):e instanceof vn&&!Ew(e)?this.restoreHistory(r):e instanceof mo?this.restoreHistory(r,!0):e instanceof Ur&&(this.lastSuccessfulId=e.id,this.currentPageId=this.browserPageId)}setBrowserUrl(e,r){let{extras:i,id:o}=r,{replaceUrl:s,state:a}=i;if(this.location.isCurrentPathEqualTo(e)||s){let l=this.browserPageId,c=g(g({},a),this.generateNgRouterState(o,l,r));this.location.replaceState(e,"",c)}else{let l=g(g({},a),this.generateNgRouterState(o,this.browserPageId+1,r));this.location.go(e,"",l)}}restoreHistory(e,r=!1){if(this.canceledNavigationResolution==="computed"){let i=this.browserPageId,o=this.currentPageId-i;o!==0?this.location.historyGo(o):this.getCurrentUrlTree()===e.finalUrl&&o===0&&(this.resetInternalState(e),this.resetUrlToCurrentUrlTree())}else this.canceledNavigationResolution==="replace"&&(r&&this.resetInternalState(e),this.resetUrlToCurrentUrlTree())}resetInternalState({finalUrl:e}){this.routerState=this.stateMemento.routerState,this.currentUrlTree=this.stateMemento.currentUrlTree,this.rawUrlTree=this.urlHandlingStrategy.merge(this.currentUrlTree,e??this.rawUrlTree)}resetUrlToCurrentUrlTree(){this.location.replaceState(this.urlSerializer.serialize(this.getRawUrlTree()),"",this.generateNgRouterState(this.lastSuccessfulId,this.currentPageId))}generateNgRouterState(e,r,i){return this.canceledNavigationResolution==="computed"?g({navigationId:e,\u0275routerPageId:r},this.routerUrlState(i)):g({navigationId:e},this.routerUrlState(i))}static \u0275fac=(()=>{let e;return function(i){return(e||(e=hn(n)))(i||n)}})();static \u0275prov=y({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})();function ry(n,t){n.events.pipe(be(e=>e instanceof Ur||e instanceof vn||e instanceof mo||e instanceof $r),ee(e=>e instanceof Ur||e instanceof $r?0:(e instanceof vn?e.code===Dt.Redirect||e.code===Dt.SupersededByNewNavigation:!1)?2:1),be(e=>e!==2),gt(1)).subscribe(()=>{t()})}var Yd=(()=>{class n{get currentUrlTree(){return this.stateManager.getCurrentUrlTree()}get rawUrlTree(){return this.stateManager.getRawUrlTree()}disposed=!1;nonRouterCurrentEntryChangeSubscription;console=h(qm);stateManager=h(ny);options=h(bl,{optional:!0})||{};pendingTasks=h(hi);urlUpdateStrategy=this.options.urlUpdateStrategy||"deferred";navigationTransitions=h(Ww);urlSerializer=h(gl);location=h(Br);urlHandlingStrategy=h(Kd);injector=h(Se);_events=new C;get events(){return this._events}get routerState(){return this.stateManager.getRouterState()}navigated=!1;routeReuseStrategy=h(qw);injectorCleanup=h(Gw,{optional:!0});onSameUrlNavigation=this.options.onSameUrlNavigation||"ignore";config=h(_l,{optional:!0})?.flat()??[];componentInputBindingEnabled=!!h(Gd,{optional:!0});currentNavigation=this.navigationTransitions.currentNavigation.asReadonly();constructor(){this.resetConfig(this.config),this.navigationTransitions.setupNavigations(this).subscribe({error:e=>{}}),this.subscribeToNavigationEvents()}eventsSubscription=new Z;subscribeToNavigationEvents(){let e=this.navigationTransitions.events.subscribe(r=>{try{let i=this.navigationTransitions.currentTransition,o=$n(this.navigationTransitions.currentNavigation);if(i!==null&&o!==null){if(this.stateManager.handleRouterEvent(r,o),r instanceof vn&&r.code!==Dt.Redirect&&r.code!==Dt.SupersededByNewNavigation)this.navigated=!0;else if(r instanceof Ur)this.navigated=!0,this.injectorCleanup?.(this.routeReuseStrategy,this.routerState,this.config);else if(r instanceof Ds){let s=r.navigationBehaviorOptions,a=this.urlHandlingStrategy.merge(r.url,i.currentRawUrl),l=g({scroll:i.extras.scroll,browserUrl:i.extras.browserUrl,info:i.extras.info,skipLocationChange:i.extras.skipLocationChange,replaceUrl:i.extras.replaceUrl||this.urlUpdateStrategy==="eager"||rN(i.source)},s);this.scheduleNavigation(a,ol,null,l,{resolve:i.resolve,reject:i.reject,promise:i.promise})}}oO(r)&&this._events.next(r)}catch(i){this.navigationTransitions.transitionAbortWithErrorSubject.next(i)}});this.eventsSubscription.add(e)}resetRootComponentType(e){this.routerState.root.component=e,this.navigationTransitions.rootComponentType=e}initialNavigation(){this.setUpLocationChangeListener(),this.navigationTransitions.hasRequestedNavigation||this.navigateToSyncWithBrowser(this.location.path(!0),ol,this.stateManager.restoredState(),{replaceUrl:!0})}setUpLocationChangeListener(){this.nonRouterCurrentEntryChangeSubscription??=this.stateManager.registerNonRouterCurrentEntryChangeListener((e,r,i,o)=>{this.navigateToSyncWithBrowser(e,i,r,o)})}navigateToSyncWithBrowser(e,r,i,o){let s=i?.navigationId?i:null,a=i?.\u0275routerUrl??e;if(i?.\u0275routerUrl&&(o=Y(g({},o),{browserUrl:e})),i){let c=g({},i);delete c.navigationId,delete c.\u0275routerPageId,delete c.\u0275routerUrl,Object.keys(c).length!==0&&(o.state=c)}let l=this.parseUrl(a);this.scheduleNavigation(l,r,s,o).catch(c=>{this.disposed||this.injector.get(Nn)(c)})}get url(){return this.serializeUrl(this.currentUrlTree)}getCurrentNavigation(){return $n(this.navigationTransitions.currentNavigation)}get lastSuccessfulNavigation(){return this.navigationTransitions.lastSuccessfulNavigation}resetConfig(e){this.config=e.map(ey),this.navigated=!1}ngOnDestroy(){this.dispose()}dispose(){this._events.unsubscribe(),this.navigationTransitions.complete(),this.nonRouterCurrentEntryChangeSubscription?.unsubscribe(),this.nonRouterCurrentEntryChangeSubscription=void 0,this.disposed=!0,this.eventsSubscription.unsubscribe()}createUrlTree(e,r={}){let{relativeTo:i,queryParams:o,fragment:s,queryParamsHandling:a,preserveFragment:l}=r,c=l?this.currentUrlTree.fragment:s,u=null;switch(a??this.options.defaultQueryParamsHandling){case"merge":u=g(g({},this.currentUrlTree.queryParams),o);break;case"preserve":u=this.currentUrlTree.queryParams;break;default:u=o||null}u!==null&&(u=this.removeEmptyProps(u));let d;try{let f=i?i.snapshot:this.routerState.snapshot.root;d=vw(f)}catch{(typeof e[0]!="string"||e[0][0]!=="/")&&(e=[]),d=this.currentUrlTree.root}return bw(d,e,u,c??null,this.urlSerializer)}navigateByUrl(e,r={skipLocationChange:!1}){let i=Cs(e)?e:this.parseUrl(e),o=this.urlHandlingStrategy.merge(i,this.rawUrlTree);return this.scheduleNavigation(o,ol,null,r)}navigate(e,r={skipLocationChange:!1}){return sN(e),this.navigateByUrl(this.createUrlTree(e,r),r)}serializeUrl(e){return this.urlSerializer.serialize(e)}parseUrl(e){try{return this.urlSerializer.parse(e)}catch{return this.console.warn(si(4018,!1)),this.urlSerializer.parse("/")}}isActive(e,r){let i;if(r===!0?i=g({},cw):r===!1?i=g({},Bg):i=g(g({},Bg),r),Cs(e))return QD(this.currentUrlTree,e,i);let o=this.parseUrl(e);return QD(this.currentUrlTree,o,i)}removeEmptyProps(e){return Object.entries(e).reduce((r,[i,o])=>(o!=null&&(r[i]=o),r),{})}scheduleNavigation(e,r,i,o,s){if(this.disposed)return Promise.resolve(!1);let a,l,c;s?(a=s.resolve,l=s.reject,c=s.promise):c=new Promise((d,f)=>{a=d,l=f});let u=this.pendingTasks.add();return ry(this,()=>{queueMicrotask(()=>this.pendingTasks.remove(u))}),this.navigationTransitions.handleNavigationRequest({source:r,restoredState:i,currentUrlTree:this.currentUrlTree,currentRawUrl:this.currentUrlTree,rawUrl:e,extras:o,resolve:a,reject:l,promise:c,currentSnapshot:this.routerState.snapshot,currentRouterState:this.routerState}),c.catch(Promise.reject.bind(Promise))}static \u0275fac=function(r){return new(r||n)};static \u0275prov=y({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})();function sN(n){for(let t=0;t<n.length;t++)if(n[t]==null)throw new T(4008,!1)}var uN=new b("");function iy(n,...t){return li([{provide:_l,multi:!0,useValue:n},[],{provide:Ci,useFactory:dN},{provide:Ku,multi:!0,useFactory:hN},t.map(e=>e.\u0275providers)])}function dN(){return h(Yd).routerState.root}function fN(n,t){return{\u0275kind:n,\u0275providers:t}}function hN(){let n=h(re);return t=>{let e=n.get(mn);if(t!==e.components[0])return;let r=n.get(Yd),i=n.get(pN);n.get(mN)===1&&r.initialNavigation(),n.get(gN,null,{optional:!0})?.setUpPreloading(),n.get(uN,null,{optional:!0})?.init(),r.resetRootComponentType(e.componentTypes[0]),i.closed||(i.next(),i.complete(),i.unsubscribe())}}var pN=new b("",{factory:()=>new C}),mN=new b("",{factory:()=>1});var gN=new b("");function oy(){return fN(6,[{provide:vi,useClass:mg}])}var Kw={get active(){return typeof globalThis.jasmine<"u"||typeof globalThis.jest<"u"||typeof globalThis.vitest<"u"}};var sy=null,gr={get active(){return sy===!0},setDevMode(n){if(sy!==null&&!Kw.active)throw new Error("[vault] DevMode has already been initialized.");sy=n}};var yo=(n,t)=>{if(!gr.active||typeof globalThis>"u")return;let e=globalThis.sdux??={},r=e.debugWidget??={},i=r.versions??={};i[n]!==t&&(i[n]=t)};var K={CoreAfterTap:"coreAfterTap",CoreBeforeTap:"coreBeforeTap",ReplayGlobalError:"replayGlobalError",CoreError:"coreError",CoreErrorCallback:"coreErrorCallback",CoreState:"coreState",Encrypt:"encrypt",CoreEmitState:"coreEmitState",CoreLicense:"coreLicense",ErrorTransform:"errorTransform",Extension:"extension",Filter:"filter",FromObservable:"fromObservable",FromPromise:"fromPromise",FromStream:"fromStream",Interceptor:"interceptor",Merge:"merge",Operator:"operator",Persist:"persist",Reduce:"reduce",Resolve:"resolve",StepwiseFilter:"stepwiseFilter",StepwiseReducer:"stepwiseReducer",StepwiseResolve:"stepwiseResolve",TabSyncState:"tabSyncState"};var Cl={Error:"error",Warn:"warn",Log:"log",Debug:"debug"};var ay={Off:"off",Error:"error",Warn:"warn",Log:"log",Debug:"debug"};var vN=ay.Off,bN="[vault]";function ly(n,...t){let e=Yw();if(e===ay.Off)return;let r=[Cl.Error,Cl.Warn,Cl.Log,Cl.Debug];r.indexOf(n)<=r.indexOf(e)&&console[n](bN,...t)}var vo=(...n)=>ly("error",...n),F=(...n)=>ly("warn",...n);var _=(...n)=>ly("debug",...n);function Yw(){return vN}var El=class{constructor(t,e){this.behaviorCtx=e;this.key=t}critical;key;type=K.CoreErrorCallback;destroy(){F(`${this.key} - destroy "noop"`)}reset(){F(`${this.key} - reset "noop"`)}};function fe(n){try{return JSON.stringify(n,_N,2)}catch{return"[unserializable]"}}function _N(n,t){if(typeof t=="function")return"[Function]";if(t instanceof Error)return{message:t.message,stack:t.stack};if(t instanceof Map)return{map:Array.from(t.entries())};if(t instanceof Set)return{set:Array.from(t.values())};try{return JSON.stringify(t),t}catch{return"[Circular]"}}var Zw=Symbol.for("BEHAVIOR_META");var xs="vault::devtools::logging::feature::cell";var qn=Symbol.for("VAULT_CLEAR_STATE");var _n=Symbol.for("VAULT_NOOP");function ce(n){return function(t){t[Zw]=n,n.type!==void 0&&(t.type=n.type),n.key!==void 0&&(t.key=n.key),n.critical!==void 0&&(t.critical=n.critical),n.resolveType!==void 0&&(t.resolveType=n.resolveType),n.wantsConfig!==void 0?t.wantsConfig=n.wantsConfig:t.wantsConfig=!1,n.configKey!==void 0&&(t.configKey=n.configKey),n.needsLicense!==void 0?t.needsLicense=n.needsLicense:t.needsLicense=!1,n.licenseId!==void 0&&(t.licenseId=n.licenseId)}}var nn={HttpResource:"http-resource",Observable:"observable",Promise:"promise",Value:"value"};var kt={IncomingPipeline:"Incoming Pipeline",FinalizePipeline:"Finalize Pipeline",PipelineError:"Pipeline Error",PipelineDestroy:"Pipeline Destroy",PipelineReset:"Pipeline Reset",AbortController:"Abort Controller",DenyController:"Deny Controller",TabSync:"Tab Sync"};function ue(n,t){return CN("Behavior",n,t)}function CN(n,t,e){let r=i=>i.charAt(0).toUpperCase()+i.slice(1).replace(/[^A-Za-z0-9]/g,"");return`SDUX::${n}::${r(t)}::${r(e)}`}function Dl(n){return!!n&&typeof n=="object"&&typeof n.value=="function"}function dt(n,t){let e=Date.now();return n instanceof Error?{message:n.message||"Unexpected error",details:n.stack,raw:n,timestamp:e,featureCellKey:t}:typeof n=="string"?{message:n,details:n,raw:n,timestamp:e,featureCellKey:t}:{message:"Unexpected error",details:n,raw:n,timestamp:e,featureCellKey:t}}function cy(n,t=new WeakSet){if(n===null||typeof n!="object")return n;let e=n;if(t.has(e))return n;t.add(e),Object.isFrozen(e)||Object.freeze(e);for(let r of Reflect.ownKeys(e)){let i=Object.getOwnPropertyDescriptor(e,r);i&&"value"in i&&cy(i.value,t)}return n}var Zd=n=>{if(n===null||typeof n!="object"||Object.isFrozen(n))return n;try{if(n instanceof Map||n instanceof Set||n instanceof WeakMap||n instanceof WeakSet)try{return structuredClone(n)}catch{return cy(n)}return structuredClone(n)}catch{let t=Array.isArray(n)?[...n]:Object.assign(Object.create(Object.getPrototypeOf(n)),n);return cy(t)}};var uy=n=>n===_n,dy=n=>n===qn;var Rs=n=>n===null,Ei=n=>n===void 0,Xd=n=>!Ei(n),As=n=>n==null,Qd=n=>typeof n=="function";var EN=n=>{if(n===null||typeof n!="object")return!1;let t=Object.getPrototypeOf(n);return t===Object.prototype||t===null},wl=n=>{if(!EN(n))return!1;let t=n,e=Object.prototype.hasOwnProperty.call(t,"loading")||Object.prototype.hasOwnProperty.call(t,"value")||Object.prototype.hasOwnProperty.call(t,"error"),r=Object.keys(t).length===0;return e||r};function ks(n){return!!(n&&typeof n=="object"&&"value"in n&&"isLoading"in n&&"error"in n&&"hasValue"in n)}var Tl,Sl,Jd,Xw,Cn=class{constructor(t,e){this.behaviorCtx=e;No(this,Jd);D(this,"type",Cn.type);D(this,"key");D(this,"critical",Cn.critical);No(this,Tl,!1);No(this,Sl,!1);this.key=t,nh(this,Tl,gr.active)}computeMerge(t,e,r){let i=r?.clearUndefined??!1;return _(`${this.key} merge called (clear: ${i})`),Er(this,Jd,Xw).call(this,t,e),e===void 0&&!i?(_(`${this.key} computeMerge skipped. next="${e}" clear="${i}"`),t):e===void 0&&i?(_(`${this.key} computeMerge skipped. next="${e}" clear="${i}"`),qn):Array.isArray(t)&&e!=null?(_(`${this.key} pushing T to State \u2192 return [...curr, next]`),[...t,e]):(_(`${this.key} non-array branch. return next`),e)}destroy(){F(`${this.key} - destroy "noop"`)}reset(){F(`${this.key} - reset "noop"`)}};Tl=new WeakMap,Sl=new WeakMap,Jd=new WeakSet,Xw=function(t,e){if(Array.isArray(t)===!1&&t!=null&&e!==void 0&&t!==_n){let r=`[vault] ${this.key}: ArrayPushMerge received non-array current value. This behavior is intended for array state.`,i=fe({currentType:typeof t,currentValue:t,nextValue:e});th(this,Tl)&&!th(this,Sl)?(nh(this,Sl,!0),console.warn(`One Time Warning: ${r}`,i),F(`One Time Warning: ${r}`,i)):F(r,i)}},D(Cn,"type"),D(Cn,"key"),D(Cn,"critical",!1),Cn=oe([ce({type:K.Merge,key:ue("Merge","ArrayPush"),critical:!0})],Cn);var yy={get active(){return typeof globalThis.jasmine<"u"||typeof globalThis.jest<"u"||typeof globalThis.vitest<"u"}},fy=null,ft={get active(){return fy===!0},setDevMode(n){if(fy!==null&&!yy.active)throw new Error("[vault] DevMode has already been initialized.");fy=n}},Ml=(n,t)=>{if(!ft.active||typeof globalThis>"u")return;let e=globalThis.sdux??={},r=e.debugWidget??={},i=r.versions??={};i[n]!==t&&(i[n]=t)},DN="@sdux-vault/shared",wN="0.9.1";Ml(DN,wN);var M={CoreAfterTap:"coreAfterTap",CoreBeforeTap:"coreBeforeTap",ReplayGlobalError:"replayGlobalError",CoreError:"coreError",CoreErrorCallback:"coreErrorCallback",CoreState:"coreState",Encrypt:"encrypt",CoreEmitState:"coreEmitState",CoreLicense:"coreLicense",ErrorTransform:"errorTransform",Extension:"extension",Filter:"filter",FromObservable:"fromObservable",FromPromise:"fromPromise",FromStream:"fromStream",Interceptor:"interceptor",Merge:"merge",Operator:"operator",Persist:"persist",Reduce:"reduce",Resolve:"resolve",StepwiseFilter:"stepwiseFilter",StepwiseReducer:"stepwiseReducer",StepwiseResolve:"stepwiseResolve",TabSyncState:"tabSyncState"},ef={Error:"error",Warn:"warn",Log:"log",Debug:"debug"},Qw={Off:"off",Error:"error",Warn:"warn",Log:"log",Debug:"debug"},Jw=Qw.Off,TN="[vault]";function vy(n,...t){let e=SN();if(e===Qw.Off)return;let r=[ef.Error,ef.Warn,ef.Log,ef.Debug];r.indexOf(n)<=r.indexOf(e)&&console[n](TN,...t)}var Ot=(...n)=>vy("error",...n),Ne=(...n)=>vy("warn",...n);var we=(...n)=>vy("debug",...n);function eT(n){Jw=n??"off"}function SN(){return Jw}function IN(n){try{return JSON.stringify(n,MN,2)}catch{return"[unserializable]"}}function MN(n,t){if(typeof t=="function")return"[Function]";if(t instanceof Error)return{message:t.message,stack:t.stack};if(t instanceof Map)return{map:Array.from(t.entries())};if(t instanceof Set)return{set:Array.from(t.values())};try{return JSON.stringify(t),t}catch{return"[Circular]"}}var py=class{#t=new Fe(null);constructor(){we("[VaultPrivateErrorService] initialized (singleton instance created)")}setError(t){we(`[VaultPrivateErrorService] setError() ${IN(t)}`),this.#t.next(t)}getError(){return we("[VaultPrivateErrorService] getError() \u2192 observable subscribed"),this.#t.asObservable()}clear(){we("[VaultPrivateErrorService] clear() \u2192 error reset to null"),this.#t.next(null)}},hy=null;function tT(){return hy?we("[VaultPrivateErrorService] returning existing singleton instance"):(we("[VaultPrivateErrorService] creating new singleton instance"),hy=new py),hy}var rf=Symbol.for("BEHAVIOR_META"),of=Symbol.for("CONTROLLER_META"),nT="vault::devtools::aggregate:feature::cell",rT="vault::devtools::logging::feature::cell",xl=Symbol.for("VAULT_CLEAR_STATE"),by=Symbol.for("VAULT_CONTINUE"),sf=Symbol.for("VAULT_NOOP"),_y=Symbol.for("VAULT_STOP");function iT(n){return function(t){t[rf]=n,n.type!==void 0&&(t.type=n.type),n.key!==void 0&&(t.key=n.key),n.critical!==void 0&&(t.critical=n.critical),n.resolveType!==void 0&&(t.resolveType=n.resolveType),n.wantsConfig!==void 0?t.wantsConfig=n.wantsConfig:t.wantsConfig=!1,n.configKey!==void 0&&(t.configKey=n.configKey),n.needsLicense!==void 0?t.needsLicense=n.needsLicense:t.needsLicense=!1,n.licenseId!==void 0&&(t.licenseId=n.licenseId)}}function af(n){return function(t){t[of]=n,n.type!==void 0&&(t.type=n.type),n.key!==void 0&&(t.key=n.key),n.critical!==void 0&&(t.critical=n.critical),n.wantsConfig!==void 0?t.wantsConfig=n.wantsConfig:t.wantsConfig=!1,n.configKey!==void 0&&(t.configKey=n.configKey),n.needsLicense!==void 0?t.needsLicense=n.needsLicense:t.needsLicense=!1,n.licenseId!==void 0&&(t.licenseId=n.licenseId)}}var xN={Usage:"VaultErrorUsage",VaultError:"VaultError"},Cy={EncryptionIntegrity:"VaultErrorEncryptionIntegrity",License:"VaultErrorLicense",Usage:"VaultErrorUsage",VaultError:"VaultError"},tf=class extends Error{kind;constructor(t,e=Cy.VaultError,r=xN.VaultError){super(t),this.name=e,this.kind=r,Object.setPrototypeOf(this,new.target.prototype);let i=Error;typeof i.captureStackTrace=="function"&&i.captureStackTrace(this,new.target)}};var Ey={Encryption:"VaultErrorEncryption",License:"VaultErrorLicense",Promise:"VaultErrorUsagePromise",PromiseFactoryRequired:"VaultErrorUsagePromiseFactoryRequired",Usage:"VaultErrorUsage"},Il=class extends tf{constructor(t,e=Ey.License){super(t,Cy.License,e)}},my=class extends tf{constructor(t,e=Ey.Usage){super(t,Cy.Usage,e)}},nf=class extends my{constructor(){super(`Invalid incoming value: Promise detected.

Promises are eager and may resolve or reject before entering the Vault pipeline.

Use the following instead  a DeferredFactory value

This guarantees the promise is created and executed inside the pipeline.`,Ey.Promise)}};var Kn={Attempt:"attempt",Failure:"failure",Finalize:"Finalize Pipeline",Success:"success",Vote:"vote"},ot={Abstain:"abstain",Abort:"abort",Deny:"deny"},Di={CoreAbstain:"coreAbstain",Error:"error",License:"license",Policy:"policy",ReplayGlobalError:"replayGlobalError",Stepwise:"stepwise",TabSync:"tabSync"},rn={Abort:"abort",Abstain:"abstain",Deny:"deny"},Wt={End:"end",Notification:"notification",Start:"start",Unknown:"unknown"},wt={Conductor:"conductor",Controller:"controller",Lifecycle:"lifecycle",Stage:"stage",Unknown:"unknown"},En={Merge:"merge",Replace:"replace",Initialize:"initialize"},Rl={HttpResource:"http-resource",Observable:"observable",Promise:"promise",Value:"value"};function Dy(n,t){return oT("Behavior",n,t)}function oT(n,t,e){let r=i=>i.charAt(0).toUpperCase()+i.slice(1).replace(/[^A-Za-z0-9]/g,"");return`SDUX::${n}::${r(t)}::${r(e)}`}function wy(n){return typeof n!="string"?!1:/^SDUX::(Behavior|Controller)::[A-Z][A-Za-z0-9]*::[A-Z][A-Za-z0-9]*$/.test(n)}function lf(n,t){return oT("Controller",n,t)}function sT(n){return wy(n)}function bo(n,t){let e=Date.now();return n instanceof Error?{message:n.message||"Unexpected error",details:n.stack,raw:n,timestamp:e,featureCellKey:t}:typeof n=="string"?{message:n,details:n,raw:n,timestamp:e,featureCellKey:t}:{message:"Unexpected error",details:n,raw:n,timestamp:e,featureCellKey:t}}function gy(n,t=new WeakSet){if(n===null||typeof n!="object")return n;let e=n;if(t.has(e))return n;t.add(e),Object.isFrozen(e)||Object.freeze(e);for(let r of Reflect.ownKeys(e)){let i=Object.getOwnPropertyDescriptor(e,r);i&&"value"in i&&gy(i.value,t)}return n}var de=n=>{if(n===null||typeof n!="object"||Object.isFrozen(n))return n;try{if(n instanceof Map||n instanceof Set||n instanceof WeakMap||n instanceof WeakSet)try{return structuredClone(n)}catch{return gy(n)}return structuredClone(n)}catch{let t=Array.isArray(n)?[...n]:Object.assign(Object.create(Object.getPrototypeOf(n)),n);return gy(t)}},wi=n=>n===sf,_o=n=>n===xl,cf=n=>n===by;var Al=n=>n===void 0,yr=n=>!Al(n),uf=n=>n==null,Os=n=>typeof n=="function";var RN=n=>{if(n===null||typeof n!="object")return!1;let t=Object.getPrototypeOf(n);return t===Object.prototype||t===null},aT=n=>{if(!RN(n))return!1;let t=n,e=Object.prototype.hasOwnProperty.call(t,"loading")||Object.prototype.hasOwnProperty.call(t,"value")||Object.prototype.hasOwnProperty.call(t,"error"),r=Object.keys(t).length===0;return e||r};function Ty(n){return!!n&&(typeof n=="object"||typeof n=="function")&&typeof n.then=="function"}function Sy(n){return!!(n&&typeof n=="object"&&"value"in n&&"isLoading"in n&&"error"in n&&"hasValue"in n)}var AN="@sdux-vault/devtools",kN="0.9.1";Ml(AN,kN);var Iy=null;function Oy(){return Iy||(Iy=new xy),Iy}var xy=class{#t=new C;constructor(){window.sdux??={},window.sdux.vaultEventBus=this}nextPipeline(t){ft.active&&t&&this.#t.next(t)}pipeline$(){return this.#t.asObservable()}},Co={Pipeline:"pipeline",System:"system",Unknown:"unknown",User:"ui"},Ry=class{sub;events=[];errorCount=0;maxEvents=5e3;sequence=0;lastMonotonicByTrace=new Map;traceRefCount=new Map;lastGlobalTimestamp=0;start(t){let e=Oy();if(!e||typeof e.pipeline$!="function"){console.warn("[SDUX] EventBus not available.");return}this.sub=e.pipeline$().subscribe(r=>{let i=this.enrichEvent(r),o=i.traceId??"__unknown";if(this.events.push(i),this.traceRefCount.set(o,(this.traceRefCount.get(o)??0)+1),this.isErrorEvent(i)&&this.errorCount++,this.events.length>this.maxEvents){let s=this.events.shift();s&&(this.isErrorEvent(s)&&(this.errorCount=Math.max(0,this.errorCount-1)),this.evictTrace(s.traceId??"__unknown"))}t?.()})}stop(){this.sub?.unsubscribe(),this.sub=void 0}clear(){this.events=[],this.errorCount=0,this.sequence=0,this.lastMonotonicByTrace.clear(),this.traceRefCount.clear(),this.lastGlobalTimestamp=0}evictTrace(t){let e=(this.traceRefCount.get(t)??1)-1;e<=0?(this.traceRefCount.delete(t),this.lastMonotonicByTrace.delete(t)):this.traceRefCount.set(t,e)}getEvents(){return[...this.events]}getErrorCount(){return this.errorCount}enrichEvent(t){let e=Date.now(),r=typeof performance<"u"&&performance.now?performance.now():0,i=t.traceId??"__unknown",o=this.lastMonotonicByTrace.get(i),s=typeof o=="number"?r-o:0;s<0&&(s=0),this.lastMonotonicByTrace.set(i,r);let a=this.detectScheduler(e),l=this.detectEventLoopPhase(s),c=this.detectSource(t),u=this.detectSource(t),d=this.hashStack();return Y(g({},t),{sequenceNumber:++this.sequence,monotonicTimestamp:r,stageDurationMs:s,stackHash:d,scheduler:a,eventLoopPhase:l,latencyCategory:u,source:c})}detectScheduler(t){let e=t-this.lastGlobalTimestamp;return this.lastGlobalTimestamp=t,e<2?"microtask":e<16?"macrotask":"delayed"}detectEventLoopPhase(t){return t===0?"synchronous":t<2?"microtask":t<16?"macrotask":"blocked"}detectSource(t){switch(t.type){case wt.Controller:return Co.User;case wt.Stage:return Co.Pipeline;case wt.Lifecycle:case wt.Conductor:return Co.System}return Co.Unknown}hashStack(){try{let t=new Error().stack??"",e=0;for(let r=0;r<t.length;r++)e=(e<<5)-e+t.charCodeAt(r),e|=0;return`h${Math.abs(e)}`}catch{return"h0"}}isErrorEvent(t){return!!(t.error||typeof t.name=="string"&&t.name.includes("fatal"))}},ON=`
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

`,My=null;function NN(){return My||(My=new Ay),My}var Ay=class{serializeRegistry(){let t=globalThis?.sdux?.debugWidget?.getRegistry?.();if(!t)return;let e={valid:0,pending:0,revoked:0,timeout:0,notRequired:0},r=o=>{let s=String(o??"").toLowerCase();s==="valid"?e.valid++:s==="pending"?e.pending++:s==="revoked"?e.revoked++:s==="timeout"?e.timeout++:(s==="not-required"||s==="notrequired")&&e.notRequired++},i=Array.from(t.values()).map(o=>{let s=o.behaviors?Array.from(o.behaviors.values()):[],a=o.controllers?Array.from(o.controllers.values()):[];for(let l of s)r(l.validLicense);for(let l of a)r(l.validLicense);return{key:o.key,behaviorsRegistered:!!o.behaviorsRegistered,controllersRegistered:!!o.controllersRegistered,fluentApis:o.fluentApis??null,behaviors:s,controllers:a}});return{totalFeatureCells:i.length,licenseSummary:e,featureCells:i}}buildEventStats(t,e){let r=0,i=null,o={},s={},a={},l={},c={},u={},d={},f=[],p={},m=[],v={},I={},R={},te=[],Pe={},Cr=0,Ii=0,Ws=0,Xr=0,Gs=0,qs=0,Ao=0,qv=0,Yf=0,Zf=0,Kv=0,Yv=0,Xf={},Qf=null,KS=[],Zv=new Set,Xv=new Map,Qv=0,Jv=0,Ks={},eb=new Map,tb=new Map,ko=null,Oo=null,Mi={count:0,maxDuration:0};if(Array.isArray(e)&&e.length>0){Mi.count=e.length;for(let E of e)E.duration>Mi.maxDuration&&(Mi.maxDuration=E.duration)}else if(typeof performance<"u"&&performance.getEntriesByType)try{let E=performance.getEntriesByType("longtask");Mi.count=E.length;for(let k of E){let ie=k.duration??0;ie>Mi.maxDuration&&(Mi.maxDuration=ie)}}catch{}for(let E of t){if(!E?.name)continue;o[E.name]=(o[E.name]??0)+1,E.scheduler&&(s[E.scheduler]=(s[E.scheduler]??0)+1),E.eventLoopPhase&&(a[E.eventLoopPhase]=(a[E.eventLoopPhase]??0)+1),(E.error||String(E.name).includes("error"))&&Cr++,String(E.name).includes("abstain")&&Gs++,String(E.name).includes("success")&&Ws++,String(E.name).includes("noop")&&Ii++;let k=typeof E.monotonicTimestamp=="number"?E.monotonicTimestamp:typeof E.timestamp=="number"?E.timestamp:null;if(k!==null){if(i!==null){let j=k-i;j>r&&(r=j)}i=k}if(k!==null){KS.push(k),(ko===null||k<ko)&&(ko=k),(Oo===null||k>Oo)&&(Oo=k);let j=Math.floor(k/16);v[j]=(v[j]??0)+1;let Le=Math.floor(k/1e3);p[Le]=(p[Le]??0)+1}let ie=E.traceId??"__unknown";typeof E.timestamp=="number"&&(eb.get(ie)===E.timestamp&&(Qv++,Ks[ie]=(Ks[ie]??0)+1),eb.set(ie,E.timestamp)),l[ie]||(l[ie]={eventCount:0,firstTimestamp:k,lastTimestamp:k,durationMs:0,stageBreakdown:{},stageSequence:[]},c[ie]=[],Zv.has(ie)&&qs++,Zv.add(ie));let Ze=l[ie];Ze.eventCount++;let st=E.monotonicTimestamp;if(typeof st=="number"){let j=tb.get(ie);j===st&&Jv++,typeof j=="number"&&st<j&&Ao++,tb.set(ie,st)}if(k!==null&&(Ze.firstTimestamp=Math.min(Ze.firstTimestamp??k,k),Ze.lastTimestamp=Math.max(Ze.lastTimestamp??k,k),Ze.durationMs=Ze.lastTimestamp-Ze.firstTimestamp),typeof E.stageDurationMs=="number"){let j=E.name,Le=E.stageDurationMs,sn=E.latencyCategory;sn===Co.User?m.push(Le):sn===Co.System||(Xr+=Le,u[j]||(u[j]={count:0,total:0,max:0,min:1/0,avg:0,p95:0},d[j]=[]),u[j].count++,u[j].total+=Le,u[j].max=Math.max(u[j].max,Le),u[j].min=Math.min(u[j].min,Le),d[j].push(Le),Ze.stageBreakdown[j]=(Ze.stageBreakdown[j]??0)+Le),sn===Co.Pipeline&&c[ie].push(Le),Ze.stageSequence.push({stage:j,durationMs:Le})}if("payload"in E){let j=this.#t(E.payload);R[ie]=(R[ie]??0)+j,String(E.name).includes("persist")&&te.push({traceId:ie,size:j}),j>5e4&&Yf++}if("state"in E){Kv++;let j=this.#t(E.state);I[ie]=(I[ie]??0)+j,j>1e5&&Yf++;let Le=0;try{Le=this.#r(E.state)}catch{Le=0}Zf=Math.max(Zf,Le);let sn="",Jn=null;try{sn=JSON.stringify(E.state)}catch(oI){Jn=oI?.message||"Unknown serialization error",sn="__STATE_SERIALIZATION_ERROR__"}Jn&&(Yv++,Xf[Jn]=(Xf[Jn]??0)+1);let jt=this.#n(sn),xi=Xv.get(ie);xi===jt&&qv++,xi&&xi!==jt&&f.push(Math.abs(j)),Xv.set(ie,jt)}}let ql=ko!==null&&Oo!==null?Oo-ko:0,Kl=null,Yl=0;for(let E in l){let k=l[E],ie=k.durationMs??0,Ze=k.eventCount??0;Pe[E]=ie>2e3&&Ze<3,ie>Yl&&(Yl=ie,Kl=E);let st=c[E]??[];if(st.length>0){let j=st.slice().sort((jt,xi)=>jt-xi),Le=st.reduce((jt,xi)=>jt+xi,0)/st.length,sn=j[Math.floor(j.length*.95)]??j[j.length-1],Jn=j[j.length-1];k.meanStageDuration=Le,k.p95StageDuration=sn,k.maxStageDuration=Jn}if(!Qf){let j=k.stageSequence??[];if(j.length>=6){let Le=j.map(jt=>jt.stage),sn=Le.slice(0,2).join("|"),Jn=0;for(let jt=0;jt<Le.length-1&&Le.slice(jt,jt+2).join("|")===sn;jt+=2)Jn++;Jn>=3&&(Qf={detected:!0,traceId:E,repeatingPattern:sn.split("|"),repetitionCount:Jn})}}}let YS=Math.max(0,ql-Xr),ZS=t.length>0?Qv/t.length:0,XS=t.length>0?Jv/t.length:0,nb=null,rb=0;for(let E in Ks){let k=Ks[E];k>rb&&(rb=k,nb=E)}let QS=ql>0?Xr/ql:0;for(let E in u){let k=u[E];k.avg=k.count>0?k.total/k.count:0;let ie=d[E].sort((st,j)=>st-j),Ze=Math.floor(ie.length*.95);k.p95=ie[Ze]??0}let Zl=null,Xl=0;for(let E in u){let k=u[E].total;k>Xl&&(Xl=k,Zl=E)}let ib=[];for(let E in l){let k=l[E],ie=k.stageSequence?.length?k.stageSequence:Object.entries(k.stageBreakdown??{}).map(([Ze,st])=>({stage:Ze,durationMs:st}));ib.push({traceId:E,stages:ie})}let JS=Object.values(R).reduce((E,k)=>E+k,0)/Math.max(1,Object.keys(R).length),eI=f.length>0?f.reduce((E,k)=>E+k,0)/f.length:0,ob;if(m.length>0){let E=m.slice().sort((st,j)=>st-j),k=m.reduce((st,j)=>st+j,0)/m.length,ie=E[Math.floor(E.length*.95)]??E[E.length-1],Ze=E[E.length-1];ob={count:m.length,avgMs:k,p95Ms:ie,maxMs:Ze}}let tI=Math.max(...Object.values(p),0),nI=Object.keys(p).length>0?Kv/Object.keys(p).length:0,rI=this.#e(I),Ys={},sb=50;for(let E in l){let k=l[E].eventCount??0;k>=sb&&(Ys[E]=k)}let iI=[Pe&&Object.values(Pe).some(Boolean)?{rank:1,type:"deadlock",id:"deadlockByTrace",evidence:"One or more traces match deadlock heuristics."}:null,Zl?{rank:2,type:"stage-bottleneck",id:Zl,evidence:`Stage has highest total compute time (${Math.round(Xl)}ms).`}:null,Kl?{rank:3,type:"slowest-trace",id:Kl,evidence:`Longest trace duration (${Math.round(Yl)}ms).`}:null,Ys&&Object.keys(Ys).length?{rank:4,type:"fanout",id:Object.keys(Ys)[0],evidence:`Fan-out threshold exceeded (\u2265 ${sb} events).`}:null,r>250?{rank:5,type:"stall",id:"maxIdleGapMs",evidence:`Large idle gap detected (${Math.round(r)}ms).`}:null].filter(Boolean);return{totalEvents:t.length,errorEvents:Cr,firstEventTimestamp:ko,lastEventTimestamp:Oo,totalDurationMs:ql,longTaskStats:Mi,eventTypes:o,traces:l,stageAggregates:u,schedulerDistribution:s,eventLoopPhaseDistribution:a,maxIdleGapMs:r,deadlockByTrace:Pe,longestTraceId:Kl,longestTraceDurationMs:Yl,traceFanOut:Ys,diagnosticSummary:iI,stageBottleneck:Zl,stageBottleneckTimeMs:Xl,pipelineFlamegraph:ib,burstAnalysis:{maxEventsPerFrame:Math.max(...Object.values(v),0)},suppressionStats:{suppressedCount:Ii,votePass:Ws,voteAbstain:Gs},structuralIntegrity:{duplicateTraceCount:qs,outOfOrderCount:Ao},pipelineRecursion:Qf,timingIntegrity:{timestampCollisionRate:ZS,monotonicCollisionRate:XS,worstCollisionTrace:nb,collisionsPerTrace:Ks},stateAnalytics:{stateSizePerTrace:I,stateSerializationErrors:Yv,stateSerializationErrorMessages:Xf,avgPayloadSize:JS,repeatedIdenticalStateCount:qv,largeObjectCount:Yf,deepNestingMaxDepth:Zf,persistPayloadSizeRanking:te.sort((E,k)=>k.size-E.size).slice(0,10),stateEntropyScore:rI,avgStateDiffSize:eI,maxChurnPerSecond:tI,avgChurnPerSecond:nI},computeVsIdle:{totalComputeTimeMs:Xr,estimatedIdleTimeMs:YS,computeRatio:QS},userLatencyDistribution:ob}}#t(t){try{return new TextEncoder().encode(JSON.stringify(t)).length}catch{return 0}}#r(t,e=0){return t===null||typeof t!="object"?e:Math.max(e,...Object.values(t).map(r=>this.#r(r,e+1)))}#n(t){let e=0;for(let r=0;r<t.length;r++)e=(e<<5)-e+t.charCodeAt(r),e|=0;return`h${Math.abs(e)}`}#e(t){let e=Object.values(t);if(!e.length)return 0;let r=e.reduce((o,s)=>o+s,0)/e.length,i=e.reduce((o,s)=>o+Math.pow(s-r,2),0)/e.length;return Math.sqrt(i)}getEnvironmentInfo(){let t=navigator.userAgent,e=/chrome|crios|edg|opr/i.test(t),r=/safari/i.test(t)&&!e,i="unknown",o="unknown";/firefox/i.test(t)?(i="firefox",o=(t.match(/firefox\/(\d+)/i)??[])[1]??"unknown"):/edg/i.test(t)?(i="edge",o=(t.match(/edg\/(\d+)/i)??[])[1]??"unknown"):/opr/i.test(t)?(i="opera",o=(t.match(/opr\/(\d+)/i)??[])[1]??"unknown"):e?(i="chrome",o=(t.match(/(?:chrome|crios)\/(\d+)/i)??[])[1]??"unknown"):r&&(i="safari",o=(t.match(/version\/(\d+)/i)??[])[1]??"unknown");let s="unknown";/windows/i.test(t)?s="Windows":/iphone|ipad|ipod/i.test(t)?s="iOS":/android/i.test(t)?s="Android":/mac/i.test(t)?s="MacOS":/linux/i.test(t)&&(s="Linux");let a="desktop";return/mobile/i.test(t)&&(a="mobile"),/tablet|ipad/i.test(t)&&(a="tablet"),{url:location.href,referrer:typeof document<"u"&&document.referrer||null,userAgent:t,browser:i,browserVersion:o,os:s,platform:navigator.platform??"unknown",online:typeof navigator<"u"?navigator.onLine:void 0,deviceType:a,language:navigator.language??"unknown",timezone:Intl.DateTimeFormat().resolvedOptions().timeZone??"unknown",screenResolution:typeof screen<"u"?`${screen.width}x${screen.height}`:"unknown",viewport:typeof window<"u"?`${window.innerWidth}x${window.innerHeight}`:"unknown"}}};function lT(n){let t=new Blob([JSON.stringify(n,null,2)],{type:"application/json"}),e=document.createElement("a");e.href=URL.createObjectURL(t),e.download=`sdux-debug-${Date.now()}.json`,e.click(),URL.revokeObjectURL(e.href)}function PN(){let n=Date.now(),t=ON,e=new Blob([t],{type:"text/markdown"}),r=document.createElement("a");r.href=URL.createObjectURL(e),r.download=`sdux-debug-ai-assist-${n}.md`,r.click(),URL.revokeObjectURL(r.href)}function cT(n){let t=NN(),e=Date.now(),r=new Date(e).toISOString(),i=typeof performance<"u"&&performance.now?performance.now():null,o=typeof performance<"u"&&performance.getEntriesByType?performance.getEntriesByType("navigation")[0]:null,s;if(typeof performance<"u")try{s=performance.getEntriesByType("longtask")?.map(u=>({start:u.startTime,duration:u.duration}))}catch{}let a=t.serializeRegistry(),l=t.buildEventStats(n,s);return{timestamp:e,isoTime:r,highResolution:{monotonicNow:i,timeOrigin:typeof performance<"u"?performance.timeOrigin:null},runtime:{hardwareConcurrency:typeof navigator<"u"?navigator.hardwareConcurrency??null:null,deviceMemory:typeof navigator<"u"?navigator.deviceMemory??null:null,connectionType:typeof navigator<"u"?navigator.connection?.effectiveType??null:null},navigation:o?{type:o.type,domComplete:o.domComplete,loadEventEnd:o.loadEventEnd}:void 0,environment:t.getEnvironmentInfo(),longTasks:s,events:n,stats:l,versions:globalThis?.sdux?.debugWidget?.versions??{},registry:a}}function LN(n){let t=cT(n);lT(t);let i=`https://github.com/sdux-vault/vault/issues/new?template=issue_report.md&body=${encodeURIComponent(`## Issue Summary
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
`)}`;window.open(i,"_blank")}function FN(n,t=1){let e=new Blob([n],{type:"application/json"}),r=URL.createObjectURL(e),i=document.createElement("a");i.href=r,i.download=`sdux-pipeline-trace-x${t}-${Date.now()}.json`,i.click(),URL.revokeObjectURL(r)}var Ti={Begin:"B",End:"E",Instant:"I",Meta:"M",Complete:"X"};function BN(n,t=1){let e=[],r=new Map,i=new Map,o=0;e.push({name:"process_name",ph:Ti.Meta,pid:1,args:{name:"SDUX Pipeline Debugger"}}),e.push({name:"trace_scale",ph:Ti.Meta,pid:1,args:{scale:t}});let s=new Set,a=[...n].sort((c,u)=>{let d=c.sequenceNumber??0,f=u.sequenceNumber??0;return d-f}),l=new Map;if(a.length>0){let c=a[0].monotonicTimestamp??0,u=0,d=c;for(let f=0;f<a.length;f++){let p=a[f],m=p.monotonicTimestamp??d,v=p.sequenceNumber??f;if(f===0){l.set(v,0),d=m;continue}let I=Math.max(0,m-d),R;t<=1?R=Math.floor(I*1e3):I<=2?R=Math.floor(I*1e3*t):I<=16?R=Math.floor(I*1e3*Math.max(2,Math.floor(t/4))):R=1e3,u+=R,l.set(v,u),d=m}}for(let c=0;c<a.length;c++){let u=a[c],d=u.traceId??"main",f=u.sequenceNumber??c,p=l.get(f)??0,[m,v,I]=(u.name??"").split(":"),R=u.type,te=`${d}:${R}:${m}:${I}`;if(s.has(d)||(s.add(d),e.push({name:"thread_name",ph:Ti.Meta,pid:1,tid:d,args:{name:`Pipeline ${d.slice(0,8)}`}})),i.has(d)||(i.set(d,o++),e.push({name:"thread_sort_index",ph:Ti.Meta,pid:1,tid:d,args:{sort_index:i.get(d)}})),u.boundary===Wt.Start){r.has(te)||r.set(te,[]),r.get(te).push(p),e.push({name:I,cat:R,ph:Ti.Begin,ts:p,pid:1,tid:d,args:{cell:u.cell,behavior:u.behaviorKey,scheduler:u.scheduler,source:u.source,latency:u.latencyCategory}});continue}if(u.boundary===Wt.End){let Xr=r.get(te);if(Xr&&Xr.length){let Gs=Xr.pop(),qs=50,Ao=p;Ao-Gs<qs&&(Ao=Gs+qs),e.push({name:I,cat:R,ph:Ti.End,ts:Ao,pid:1,tid:d})}continue}let Pe=20*t,Cr=Math.max(0,p-Pe),Ii=Cr===0?Pe:p,Ws=`${I}:${v} (synthetic)`;e.push({name:Ws,cat:R,ph:Ti.Begin,ts:Cr,pid:1,tid:d,args:{synthetic:!0,actualDurationMs:0,note:"Synthetic span time added for visualization"}}),e.push({name:Ws,cat:R,ph:Ti.End,ts:Ii,pid:1,tid:d,args:{synthetic:!0,actualDurationMs:0,note:"Synthetic time span added for visualization"}})}return JSON.stringify({traceEvents:e},null,2)}var ky=class extends HTMLElement{recorder=new Ry;recording=!1;minimized=!0;exportMenuOpen=!1;dragOffsetX=0;dragOffsetY=0;dragging=!1;abortController=new AbortController;connectedCallback(){this.attachShadow({mode:"open"}),this.style.position="fixed",this.style.top="80px",this.style.right="20px",this.style.zIndex="999999";let t=localStorage.getItem("sdux-debug-state");if(t)try{let{left:e,top:r,minimized:i}=JSON.parse(t);e&&r&&(this.style.left=e,this.style.top=r,this.style.right="auto"),this.minimized=!!i}catch{}this.render(),document.addEventListener("sdux-license-resolved",()=>{this.updateButtonState()},{signal:this.abortController.signal})}disconnectedCallback(){this.abortController.abort(),this.timerInterval&&(clearInterval(this.timerInterval),this.timerInterval=null),this.recorder.stop(),this.recording=!1}render(){if(!this.shadowRoot)return;this.shadowRoot.innerHTML=`
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
  `,this.shadowRoot?.getElementById("aiAssist")?.addEventListener("click",()=>{PN()});let e=this.shadowRoot.getElementById("export"),r=this.shadowRoot.getElementById("exportMenu");e?.addEventListener("click",a=>{a.stopPropagation(),this.exportMenuOpen=!this.exportMenuOpen,r?.classList.toggle("open",this.exportMenuOpen)}),this.shadowRoot.getElementById("close")?.addEventListener("click",a=>{a.stopPropagation(),this.remove()}),this.updateButtonState(),this.shadowRoot.getElementById("help")?.addEventListener("click",a=>{a.stopPropagation(),this.openHelp()}),this.shadowRoot.getElementById("recordToggle")?.addEventListener("click",a=>{a.stopPropagation(),this.recording?this.stop():this.start(),this.updateRecordingUI()}),this.shadowRoot.getElementById("panel")?.addEventListener("pointerdown",a=>this.startDrag(a)),this.shadowRoot.getElementById("downloadDump")?.addEventListener("click",a=>{a.stopPropagation(),s(),this.downloadDebugDump()}),this.shadowRoot.getElementById("downloadTrace")?.addEventListener("click",a=>{a.stopPropagation(),s(),this.downloadTraceDump()}),this.shadowRoot.getElementById("downloadTrace1000")?.addEventListener("click",a=>{a.stopPropagation(),s(),this.downloadTraceDump(1e3)}),this.shadowRoot.getElementById("clear")?.addEventListener("click",a=>{a.stopPropagation(),this.clear()}),this.shadowRoot.getElementById("minimize")?.addEventListener("click",this.toggleMinimize),this.shadowRoot.getElementById("createIssue")?.addEventListener("click",a=>{a.stopPropagation(),this.createIssue()});let o=this.abortController.signal;document.addEventListener("pointermove",this.onDrag,{signal:o}),document.addEventListener("pointerup",this.stopDrag,{signal:o}),document.addEventListener("pointerdown",a=>{if(!this.exportMenuOpen)return;let l=a.composedPath();r&&!l.includes(r)&&s()},{signal:o});let s=()=>{r?.classList.remove("open"),this.exportMenuOpen=!1}}updateEventCount(){if(!this.shadowRoot)return;let t=this.shadowRoot.getElementById("eventCount"),e=this.shadowRoot.getElementById("eventErrorCount"),r=this.recorder.getEvents().length,i=this.recorder.getErrorCount();if(t&&(t.textContent=String(r)),e){let o=Number(e.textContent??"0");i>o&&(e.classList.remove("bump"),e.offsetWidth,e.classList.add("bump")),e.textContent=String(i)}}updateRecordingUI(){if(!this.shadowRoot)return;let t=this.shadowRoot.getElementById("recordToggle"),e=this.shadowRoot.querySelector(".record-dot"),r=this.shadowRoot.getElementById("sessionTimer"),i=this.shadowRoot.querySelector(".title-container");if(t&&(t.textContent=this.recording?"Stop":"Record"),!this.recording){e&&e.remove(),r&&(r.textContent="");return}if(!e&&i){let o=document.createElement("div");o.className="record-dot",i.insertBefore(o,i.children[1])}r&&(r.textContent=this.getSessionTime())}sessionStartTime=null;timerInterval=null;pausedDuration=0;pauseStart=null;startDrag(t){this.dragging=!0,this.dragOffsetX=t.clientX-this.offsetLeft,this.dragOffsetY=t.clientY-this.offsetTop}onDrag=t=>{this.dragging&&(this.style.left=`${t.clientX-this.dragOffsetX}px`,this.style.top=`${t.clientY-this.dragOffsetY}px`,this.style.right="auto")};stopDrag=()=>{this.dragging=!1,this.persistState()};toggleMinimize=t=>{t.stopPropagation(),this.minimized=!this.minimized,this.persistState(),this.render()};persistState(){localStorage.setItem("sdux-debug-state",JSON.stringify({left:this.style.left,top:this.style.top,minimized:this.minimized}))}updateButtonState(){if(!this.shadowRoot)return;let t=this.shadowRoot.getElementById("recordToggle"),e=this.shadowRoot.getElementById("export"),r=this.shadowRoot.getElementById("clear"),i=this.shadowRoot.getElementById("createIssue"),o=this.shadowRoot.getElementById("aiAssist"),s=this.recorder.getEvents().length>0,a=!!globalThis.sdux?.debugWidget?.aiAssistEnabled;t&&(t.disabled=!1);let l=!s||this.recording;e&&(e.disabled=l),i&&(i.disabled=l),r&&(r.disabled=l),o&&(o.disabled=l||!a)}start(){if(this.recording)return;let t=Date.now();this.sessionStartTime||(this.sessionStartTime=t),this.pauseStart&&(this.pausedDuration+=t-this.pauseStart,this.pauseStart=null),this.timerInterval=window.setInterval(()=>{let e=this.shadowRoot?.getElementById("sessionTimer");e&&(e.textContent=this.getSessionTime())},1e3),this.recorder.start(()=>{this.updateEventCount(),this.updateButtonState()}),this.recording=!0,this.updateRecordingUI(),this.updateButtonState(),console.info("[SDUX] Recording started")}getSessionTime(){if(!this.sessionStartTime)return"";let t=Date.now()-this.sessionStartTime-this.pausedDuration,e=Math.floor(t/1e3),r=Math.floor(e/60),i=e%60;return`${r}:${i.toString().padStart(2,"0")}`}stop(){this.recording&&(this.recorder.stop(),this.recording=!1,this.pauseStart=Date.now(),this.updateRecordingUI(),this.timerInterval&&(clearInterval(this.timerInterval),this.timerInterval=null),this.updateButtonState(),console.info("[SDUX] Recording stopped"))}downloadDebugDump(){let t=cT(this.recorder.getEvents());lT(t),console.info("[SDUX] Logging dump generated")}downloadTraceDump(t=1){let e=BN(this.recorder.getEvents(),t);FN(e,t),console.info("[SDUX] Trace dump generated")}createIssue(){LN(this.recorder.getEvents()),console.info("[SDUX] Issue dump generated and redirected")}clear(){if(!this.recorder.getEvents().length||!confirm("Clear all recorded events?"))return;this.recorder.clear(),this.sessionStartTime=null,this.pausedDuration=0,this.pauseStart=null;let t=this.shadowRoot?.getElementById("sessionTimer");t&&(t.textContent=""),this.updateEventCount(),this.updateButtonState(),console.info("[SDUX] Events cleared")}openHelp(){window.open("/docs/dev-tools/built-in-debugger","_blank","noopener,noreferrer")}};function jN(){if(!customElements.get("sdux-debug"))try{customElements.define("sdux-debug",ky)}catch{}if(document.querySelector("sdux-debug"))return;let n=document.createElement("sdux-debug");document.body.appendChild(n)}function uT(){if(!ft.active||typeof window>"u"||(globalThis.sdux??={},globalThis.sdux.debugWidget??={},globalThis.sdux.debugWidget.injected))return;globalThis.sdux.debugWidget.injected=!0;let n=()=>jN();document.readyState==="loading"?document.addEventListener("DOMContentLoaded",n,{once:!0}):n()}var VN="@sdux-vault/engine",UN="0.28.1";Ml(VN,UN);var ht="vault-conductor",ff,Fy=class{static{ff=this}controllerCtx;static type;static key;static critical;type=ff.type;critical=ff.critical;key;#t=!1;#r=!1;constructor(e,r){this.controllerCtx=r,this.key=e}handleMessage(e){switch(we(`${this.key} handleMessage received "${e.type}" for trace "${e.traceId}".`),e.type){case Kn.Attempt:{let{ctx:r}=e;return this.#r?x(ot.Abort):r.operation===En.Initialize?x(ot.Abstain):x(this.#t?ot.Abstain:ot.Deny)}case Kn.Finalize:return this.#t=!0,x();case Kn.Success:return this.#t=!0,x();case Kn.Failure:return e.ctx.operation===En.Initialize&&(this.#r=!0),x();default:return x(ot.Abstain)}}destroy(){Ne(`${this.key} - destroy noop`)}reset(){Ne(`${this.key} - reset noop`)}};Fy=ff=ia([af({type:Di.CoreAbstain,key:lf("Policy","CoreAbstain"),critical:!1})],Fy);var hf,By=class{static{hf=this}controllerCtx;static type;static key;static critical;type=hf.type;critical=hf.critical;key;ctx;constructor(e,r){this.controllerCtx=r,this.key=e,this.ctx=r}handleMessage(e){return we(`${this.key} handleMessage received "${e.type}" for trace "${e.traceId}".`),e.type===Kn.Failure?(we(`${this.key} ABORT \u2014 default failure handler for trace "${e.traceId}"`),this.ctx.requestAbort(e.traceId),x()):x(ot.Abstain)}destroy(){Ne(`${this.key} - destroy noop`)}reset(){Ne(`${this.key} - reset noop`)}};By=hf=ia([af({type:Di.Error,key:lf("Policy","CoreError"),critical:!1})],By);var vr={RequireLicense:"requireLicense",ValidateLicense:"validateLicense",LicenseStatus:"licenseStatus",DescribeFeature:"describe-feature",DescribeBehaviors:"describe-behaviors",DescribeControllers:"describe-controllers"},mf=null;function $N(n,t){mf||(mf=new jy(n,t))}function kl(){if(!mf)throw new Error("[vault] LicensingService not initialized.");return mf}var jy=class{events$;validation$;constructor(t,e){this.events$=t,this.validation$=e}describeFeature(t){t.type=vr.DescribeFeature,this.events$.next(t)}describeBehaviors(t){t.type=vr.DescribeBehaviors,this.events$.next(t)}describeControllers(t){t.type=vr.DescribeControllers,this.events$.next(t)}requestLicense(t,e){if(!e)throw new Error("[vault] Cannot register controller license without a key.");let r=this.#t();return this.events$.next({featureCellKey:t,key:e,licenseToken:r,type:vr.RequireLicense}),r}validateLicense(t,e,r,i){this.events$.next({featureCellKey:t,key:e,licenseToken:r,type:vr.ValidateLicense,valid:i})}#t(){let t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",e=r=>Array.from({length:r},()=>t[Math.floor(Math.random()*t.length)]).join("");return`${e(5)}-${e(5)}`}getLicenseValidation$(){return this.validation$}};var pf,Vy=class{static{pf=this}controllerCtx;static type;static key;static critical;type=pf.type;critical=pf.critical;key;#t=null;#r;constructor(e,r){this.controllerCtx=r,this.key=e;let i=r.featureCellKey;this.#r=kl().getLicenseValidation$().pipe(be(o=>o.featureCellKey===i)).subscribe(o=>{this.#t=o.approved,this.#r?.unsubscribe();let s=`${i}::license`;o.approved?r?.licenseApproved?.(s):r?.licenseDenied?.(s)})}handleMessage(e){return we(`${this.key} received "${e.type}" for trace "${e.traceId}".`),e.type===Kn.Attempt?this.#t?x(ot.Abstain):this.#t===null?x(ot.Deny):x(ot.Abort):x()}destroy(){this.#r?.unsubscribe(),Ne(`${this.key} - destroy unsubscribe`)}reset(){Ne(`${this.key} - reset noop`)}};Vy=pf=ia([af({type:Di.License,key:lf("Policy","CoreLicense"),critical:!0})],Vy);var Uy=class{evaluateAttempt(t,e,r){if(t.length===0)return x(this.arbitrate(e.traceId,[ot.Abstain]));try{let i=t.map(o=>(r?.startControllerVote(e.ctx.featureCellKey,o.key,e.traceId),o.handleMessage(e).pipe(ee(s=>s??ot.Abstain),Xe(s=>{r?.endControllerVote(e.ctx.featureCellKey,o.key,e.traceId,s)}),wr(s=>(Ne("[vault:arbitrator] controller threw during attempt:",s),r?.endControllerVote(e.ctx.featureCellKey,o.key,e.traceId,ot.Deny),r?.controllerFailure(o.key,e.ctx,s),x(ot.Deny))))));return Lc(i).pipe(ee(o=>this.arbitrate(e.traceId,o)))}catch{return x(this.arbitrate(e.traceId,[ot.Deny]))}}notify(t,e){if(t.length===0)return x(void 0);try{let r=t.map(i=>i.handleMessage(e).pipe(ee(()=>{}),wr(o=>(Ne("[vault:arbitrator] controller threw during notify:",o),x(void 0)))));return Lc(r).pipe(ee(()=>{}))}catch{return x(void 0)}}arbitrate(t,e){return e.includes(ot.Abort)?{traceId:t,outcome:rn.Abort}:e.includes(ot.Deny)?{traceId:t,outcome:rn.Deny}:e.every(s=>s===ot.Abstain)?{traceId:t,outcome:rn.Abstain}:(Ot("Unknown controller vote detected",{traceId:t,votes:e}),{traceId:t,outcome:rn.Deny})}},A={Boundary:"boundary",State:"state",Error:"error"},Gt={Never:"never",Optional:"optional",Required:"required"},HN={[A.Boundary]:{state:Gt.Never,payload:Gt.Optional,error:Gt.Never},[A.State]:{state:Gt.Required,payload:Gt.Optional,error:Gt.Never},[A.Error]:{state:Gt.Required,payload:Gt.Optional,error:Gt.Required}},zN={"stage:end:core-state":{category:A.State},"stage:end:core-emit-state":{category:A.State},"lifecycle:end:merge":{category:A.State},"lifecycle:end:replace":{category:A.State},"stage:end:compute-merge":{category:A.State},"stage:end:reducer":{category:A.State},"stage:end:resolve":{category:A.State},"lifecycle:notification:failure":{category:A.Error},"lifecycle:notification:runtime-error":{category:A.Error},"lifecycle:notification:warn":{category:A.Error},"lifecycle:notification:fatal":{category:A.Error},"conductor:start:abort":{category:A.Boundary},"conductor:start:deny":{category:A.Boundary},"conductor:start:revote":{category:A.Boundary},"controller:end:vote":{category:A.Boundary},"conductor:start:license-approved":{category:A.Boundary},"conductor:start:license-attempt":{category:A.Boundary},"controller:end:attempt":{category:A.Boundary},"controller:notification:finalize":{category:A.Boundary},"controller:notification:success":{category:A.Boundary},"controller:restart:restart-controller-attempt":{category:A.Boundary},"controller:start:attempt":{category:A.Boundary},"controller:start:vote":{category:A.Boundary},"lifecycle:end:initialized":{category:A.Boundary},"lifecycle:start:core-callback-error":{category:A.Boundary},"lifecycle:start:core-error":{category:A.Boundary},"lifecycle:start:core-state":{category:A.Boundary},"lifecycle:start:global-error":{category:A.Boundary},"lifecycle:start:initialized":{category:A.Boundary},"lifecycle:start:merge":{category:A.Boundary},"lifecycle:start:replace":{category:A.Boundary},"lifecycle:start:error-transform":{category:A.Boundary},"lifecycle:end:error-transform":{category:A.Boundary},"lifecycle:end:core-callback-error":{category:A.Boundary},"lifecycle:end:core-error":{category:A.Boundary},"lifecycle:end:global-error":{category:A.Boundary},"stage:end:after-tap":{category:A.Boundary},"stage:end:before-tap":{category:A.Boundary},"stage:end:encrypt":{category:A.Boundary},"stage:end:filter":{category:A.Boundary},"stage:end:load-persist":{category:A.Boundary},"stage:end:operator":{category:A.Boundary},"stage:end:persist":{category:A.Boundary},"stage:start:after-tap":{category:A.Boundary},"stage:start:before-tap":{category:A.Boundary},"stage:start:compute-merge":{category:A.Boundary},"stage:start:encrypt":{category:A.Boundary},"stage:start:filter":{category:A.Boundary},"stage:start:load-persist":{category:A.Boundary},"stage:start:operator":{category:A.Boundary},"stage:start:persist":{category:A.Boundary},"stage:start:reducer":{category:A.Boundary},"stage:start:resolve":{category:A.Boundary}},Ny=null;function WN(){return Ny||(Ny=new $y),Ny}var $y=class{globalInsightOverride=null;cellRegistry=new Map},Hy=class{shared=WN();key=Dy("DevTools","Telemetry");get globalInsightOverride(){return this.shared.globalInsightOverride}set globalInsightOverride(t){this.shared.globalInsightOverride=t}get cellRegistry(){return this.shared.cellRegistry}registerCell(t,e){let r=!!e;this.cellRegistry.set(t,{hasInsight:r,insights:r?[e]:[]})}activateGlobalInsights(t){this.globalInsightOverride=t}isChromeDevTools(t){return t===rT||t===nT}applyPolicy(t,e){let r=zN[t.name]?.category??A.Boundary,i=HN[r],o=!!e?.wantsState,s=!!e?.wantsPayload,a=!!e?.wantsErrors;return t.source||delete t.source,(!o||i.state===Gt.Never)&&delete t.state,(!s||i.payload===Gt.Never||i.payload===Gt.Optional&&t.payload===void 0)&&delete t.payload,!a||i.error===Gt.Never?delete t.error:i.error===Gt.Required&&(!s||t.payload===void 0)&&delete t.payload,t}},Py=null;function Jy(){return Py||(Py=new zy),Py}var zy=class extends Hy{#t=Oy();constructor(){super(),typeof window<"u"&&(window.sdux??={},window.sdux.vaultMonitorInstance=this)}#r(t){let e=t?.snapshot??t?.lastSnapshot??t?.state??{};return{isLoading:e.isLoading??!1,value:e.value??void 0,error:e.error??null,hasValue:e.hasValue??!!e.value}}startAfterTap(t,e,r){this.#e({cell:t,behaviorKey:e,name:"after-tap",ctx:r})}endAfterTap(t,e,r,i){this.#i({cell:t,behaviorKey:e,name:"after-tap",ctx:r,payload:i})}startBeforeTap(t,e,r){this.#e({cell:t,behaviorKey:e,name:"before-tap",ctx:r})}endBeforeTap(t,e,r,i){this.#i({cell:t,behaviorKey:e,name:"before-tap",ctx:r,payload:i})}startClearPersist(t,e,r){this.#a({cell:t,behaviorKey:e,name:"clear-persist",ctx:r})}endClearPersist(t,e,r){this.#l({cell:t,behaviorKey:e,name:"clear-persist",ctx:r})}startComputeMerge(t,e,r){this.#e({cell:t,behaviorKey:e,name:"compute-merge",ctx:r})}endComputeMerge(t,e,r){this.#i({cell:t,behaviorKey:e,name:"compute-merge",ctx:r})}notifyConductorDeny(t,e,r){this.#c({cell:t,behaviorKey:e,name:"deny",ctx:r})}conductorCrashed(t,e,r,i){let o=bo(i,t),s="fatal";Ot(t,e,o),this.#s({cell:t,behaviorKey:e,name:s,ctx:r,payload:{message:"This has proven to be untested code in unit tests. So you win some type of prize. Please create a github issues and share your amazing gift to bring down a systm."},error:o})}conductorRevote(t,e,r){this.#s({cell:t,behaviorKey:e,name:"revote",ctx:r})}conductorAbort(t,e,r){this.#s({cell:t,behaviorKey:e,name:"abort",ctx:r})}conductorLicenseAttempt(t,e){this.#s({cell:t,behaviorKey:e,name:"license-attempt",ctx:{}})}conductorLicenseApproved(t,e){this.#s({cell:t,behaviorKey:e,name:"license-approved",ctx:{}})}conductorLicenseDenied(t,e){this.#s({cell:t,behaviorKey:e,name:"license-denied",ctx:{}})}startControllerAttempt(t,e,r){this.#d({cell:t,behaviorKey:e,name:"attempt",ctx:r})}endControllerAttempt(t,e,r,i){this.#u({cell:t,behaviorKey:e,name:"attempt",ctx:r,payload:i})}restartControllerAttempt(t,e,r,i){this.#f({cell:t,behaviorKey:e,name:"restart-attempt",ctx:r,payload:i})}controllerFailure(t,e,r){let i=bo(r,t);this.#s({cell:e.featureCellKey,behaviorKey:t,name:"failure",ctx:e,error:i})}controllerFinalize(t,e){this.#s({cell:e.featureCellKey,behaviorKey:t,name:"finalize",ctx:e})}controllerSuccess(t,e){this.#s({cell:e.featureCellKey,behaviorKey:t,name:"success",ctx:e})}startControllerVote(t,e,r){this.#d({cell:t,behaviorKey:e,name:"vote",ctx:{traceId:r}})}endControllerVote(t,e,r,i){this.#u({cell:t,behaviorKey:e,name:"vote",ctx:{traceId:r},payload:i})}startConductorVote(t,e,r){this.#d({cell:t,behaviorKey:e,name:"vote",ctx:r})}endConductorVote(t,e,r,i){this.#u({cell:t,behaviorKey:e,name:"vote",ctx:r,payload:i})}startCoreCallbackError(t,e,r){this.#e({cell:t,behaviorKey:e,name:"core-callback-error",ctx:r})}endCoreCallbackError(t,e,r){this.#i({cell:t,behaviorKey:e,name:"core-callback-error",ctx:r})}startCoreEmitState(t,e,r){this.#e({cell:t,behaviorKey:e,name:"core-emit-state",ctx:r})}endCoreEmitState(t,e,r){this.#i({cell:t,behaviorKey:e,name:"core-emit-state",ctx:r})}startCoreError(t,e,r){this.#e({cell:t,behaviorKey:e,name:"core-error",ctx:r})}endCoreError(t,e,r){this.#i({cell:t,behaviorKey:e,name:"core-error",ctx:r})}startCoreState(t,e,r){this.#e({cell:t,behaviorKey:e,name:"core-state",ctx:r})}endCoreState(t,e,r){this.#i({cell:t,behaviorKey:e,name:"core-state",ctx:r})}startDecrypt(t,e,r){this.#e({cell:t,behaviorKey:e,name:"decrypt",ctx:r})}endDecrypt(t,e,r,i){this.#i({cell:t,behaviorKey:e,name:"decrypt",ctx:r,payload:i})}startDestroy(t,e,r){this.#a({cell:t,behaviorKey:e,name:"destroy",ctx:r})}endDestroy(t,e,r,i){this.#l({cell:t,behaviorKey:e,name:"destroy",ctx:r,payload:i})}startEncrypt(t,e,r){this.#e({cell:t,behaviorKey:e,name:"encrypt",ctx:r})}endEncrypt(t,e,r){this.#i({cell:t,behaviorKey:e,name:"encrypt",ctx:r})}runtimeError(t,e,r,i){let o=bo(i,t);Ot(t,e,o),this.#s({cell:t,behaviorKey:e,name:"runtime-error",ctx:r,error:o})}startErrorTransform(t,e,r){this.#e({cell:t,behaviorKey:e,name:"error-transform",ctx:r})}endErrorTransform(t,e,r,i){this.#i({cell:t,behaviorKey:e,name:"error-transform",ctx:r,payload:i})}startFilter(t,e,r){this.#e({cell:t,behaviorKey:e,name:"filter",ctx:r})}endFilter(t,e,r){this.#i({cell:t,behaviorKey:e,name:"filter",ctx:r})}startGlobalError(t,e,r){this.#a({cell:t,behaviorKey:e,name:"global-error",ctx:r})}endGlobalError(t,e,r){this.#l({cell:t,behaviorKey:e,name:"global-error",ctx:r})}ingressSubscribed(t,e,r,i){this.#a({cell:t,behaviorKey:e,name:"ingress-subscribed",ctx:r,source:i})}ingressCompleted(t,e,r,i){this.#l({cell:t,behaviorKey:e,name:"ingress-completed",ctx:r,source:i})}startInitialized(t,e,r){this.#a({cell:t,behaviorKey:e,name:"initialized",ctx:r})}endInitialized(t,e,r){this.#l({cell:t,behaviorKey:e,name:"initialized",ctx:r})}startInterceptor(t,e,r){this.#e({cell:t,behaviorKey:e,name:"interceptor",ctx:r})}endInterceptor(t,e,r,i){this.#i({cell:t,behaviorKey:e,name:"interceptor",ctx:r,payload:i})}startLoadPersist(t,e,r){this.#e({cell:t,behaviorKey:e,name:"load-persist",ctx:r})}endLoadPersist(t,e,r,i){this.#i({cell:t,behaviorKey:e,name:"load-persist",ctx:r,payload:i})}startMerge(t,e,r){this.#a({cell:t,behaviorKey:e,name:"merge",ctx:r})}endMerge(t,e,r,i){this.#l({cell:t,behaviorKey:e,name:"merge",ctx:r,payload:i})}startOperator(t,e,r){this.#e({cell:t,behaviorKey:e,name:"operator",ctx:r})}endOperator(t,e,r,i){this.#i({cell:t,behaviorKey:e,name:"operator",ctx:r,payload:i})}startPersist(t,e,r){this.#e({cell:t,behaviorKey:e,name:"persist",ctx:r})}endPersist(t,e,r){this.#i({cell:t,behaviorKey:e,name:"persist",ctx:r})}startReducer(t,e,r){this.#e({cell:t,behaviorKey:e,name:"reducer",ctx:r})}endReducer(t,e,r){this.#i({cell:t,behaviorKey:e,name:"reducer",ctx:r})}startReplace(t,e,r){this.#a({cell:t,behaviorKey:e,name:"replace",ctx:r})}endReplace(t,e,r,i){this.#l({cell:t,behaviorKey:e,name:"replace",ctx:r,payload:i})}startReset(t,e,r){this.#a({cell:t,behaviorKey:e,name:"reset",ctx:r})}endReset(t,e,r,i){this.#l({cell:t,behaviorKey:e,name:"reset",ctx:r,payload:i})}startResolve(t,e,r){this.#e({cell:t,behaviorKey:e,name:"resolve",ctx:r})}endResolve(t,e,r){this.#i({cell:t,behaviorKey:e,name:"resolve",ctx:r})}startSetInitialValue(t,e,r){this.#a({cell:t,behaviorKey:e,name:"set-initial-value",ctx:r})}endSetInitialValue(t,e,r){this.#l({cell:t,behaviorKey:e,name:"set-initial-value",ctx:r})}startStepwise(t,e,r){this.#e({cell:t,behaviorKey:e,name:"stepwise",ctx:r})}endStepwise(t,e,r){this.#i({cell:t,behaviorKey:e,name:"stepwise",ctx:r})}warn(t,e,r,i){let o=bo(i,t);Ne(t,e,o),this.#s({cell:t,behaviorKey:e,name:"warn",ctx:r,error:o})}#n(t){return t.name=`${t.type}:${t.boundary}:${t.name}`,t}#e(t){t.type=wt.Stage,t.boundary=Wt.Start,this.#o(this.#n(t))}#i(t){t.type=wt.Stage,t.boundary=Wt.End,this.#o(this.#n(t))}#a(t){t.type=wt.Lifecycle,t.boundary=Wt.Start,this.#o(this.#n(t))}#l(t){t.type=wt.Lifecycle,t.boundary=Wt.End,this.#o(this.#n(t))}#s(t){t.type=wt.Lifecycle,t.boundary=Wt.Notification,this.#o(this.#n(t))}#c(t){t.type=wt.Conductor,t.boundary=Wt.Notification,this.#o(this.#n(t))}#d(t){t.type=wt.Controller,t.boundary=Wt.Start,this.#o(this.#n(t))}#u(t){t.type=wt.Controller,t.boundary=Wt.End,this.#o(this.#n(t))}#f(t){t.type=wt.Controller,t.boundary=Wt.Notification,this.#o(this.#n(t))}#o(t){let{cell:e,ctx:r,name:i,behaviorKey:o,source:s,error:a,payload:l,type:c,boundary:u}=t;if(this.isChromeDevTools(e)||!ft.active)return;let d;if(this.globalInsightOverride)d=this.globalInsightOverride;else{let p=this.cellRegistry.get(e);if(!p||!p.hasInsight)return;d=p.insights[0]}let f={id:crypto.randomUUID(),cell:e,behaviorKey:o,name:i,timestamp:Date.now(),state:this.#r(r),type:c??wt.Unknown,boundary:u??Wt.Unknown,payload:l,error:a,source:s};r.traceId&&(f.traceId=r.traceId),this.#t.nextPipeline(this.applyPolicy(f,d))}},Dn={Abort:"abort",Failure:"failure",LicenseApproved:"licenseApproved",LicenseDenied:"licenseDenied",Revote:"revote",Success:"success"},Wy=class{controllers;events$;#t=new Uy;#r=Jy();constructor(t,e){this.controllers=t,this.events$=e}evaluateAttempt(t){let e={type:Kn.Attempt,traceId:t.traceId,ctx:t};return this.#t.evaluateAttempt(this.controllers,e,this.#r)}notifySuccess(t){if(!this.controllers.length)return;let e={type:Kn.Success,traceId:t.traceId,ctx:t};this.#r.controllerSuccess("decision-engine",t),this.#t.notify(this.controllers,e).subscribe({complete:()=>{this.events$.closed||this.events$.next({traceId:t.traceId,type:Dn.Success})}})}notifyFailure(t,e){if(!this.controllers.length)return;let r={type:Kn.Failure,traceId:t.traceId,ctx:t,error:e};this.#r.controllerFailure("decision-engine",t,e),this.#t.notify(this.controllers,r).subscribe({complete:()=>{this.events$.closed||this.events$.next({traceId:t.traceId,type:Dn.Failure})}})}notifyFinalize(t){if(!this.controllers.length)return;let e={type:Kn.Finalize,traceId:t.traceId};this.#r.controllerFinalize("decision-engine",t),this.#t.notify(this.controllers,e).subscribe()}},Te="vault-orchestrator",GN=new Set(["initialize","destroy","destroyed$","reset","reset$","reducers","operators","filters","interceptors","mergeState","replaceState","beforeTaps","afterTaps","key","state","cache","persist","encrypt","beforeTap","afterTap","hydrate"]),Hr={NotRequired:"not-required",Pending:"pending",Revoked:"revoked",Timeout:"timeout",Valid:"valid"},qN=new Set(["SDUX::Behavior::Core::AfterTap","SDUX::Behavior::Core::ArrayMerge","SDUX::Behavior::Core::BeforeTap","SDUX::Behavior::Core::EmitState","SDUX::Behavior::Core::Error","SDUX::Behavior::Core::ErrorCallback","SDUX::Behavior::Core::Filter","SDUX::Behavior::Core::FromObservable","SDUX::Behavior::Core::FromPromise","SDUX::Behavior::Core::FromStream","SDUX::Behavior::Core::ObjectMerge","SDUX::Behavior::Core::Observable","SDUX::Behavior::Core::Promise","SDUX::Behavior::Core::Reducer","SDUX::Behavior::Core::State","SDUX::Behavior::Core::TabSyncState","SDUX::Behavior::Core::Value","SDUX::Behavior::Addon::DistinctUntilChanged","SDUX::Behavior::Cache::State","SDUX::Behavior::Core::Lookup","SDUX::Behavior::Core::Query","SDUX::Behavior::Encrypt::Aes256","SDUX::Behavior::Interceptor::GlobalErrorPause","SDUX::Behavior::Merge::ArrayAppend","SDUX::Behavior::Merge::ArrayPush","SDUX::Behavior::Merge::Deep","SDUX::Behavior::Persist::CookieStorage","SDUX::Behavior::Persist::LocalStorage","SDUX::Behavior::Persist::SessionStorage","SDUX::Behavior::Policy::StepwiseFilter","SDUX::Behavior::Policy::StepwiseReducer","SDUX::Behavior::Policy::StepwiseResolve","SDUX::Behavior::Core::License","SDUX::Controller::Policy::CoreAbstain","SDUX::Controller::Policy::CoreError","SDUX::Controller::Policy::CoreLicense","SDUX::Controller::Policy::TabSync","SDUX::Controller::Policy::Delay","SDUX::Controller::Policy::MaxFailures","SDUX::Controller::Policy::ReplayGlobalError","SDUX::Controller::Policy::Stepwise","SDUX::Controller::Policy::Throttle"]),hT="sdux-vault",KN="SDUX::Behavior::Core::License",Nt=null;function pT(n={}){Nt||(Nt=new Gy(n))}var Gy=class{#t;#r;#n=new Map;#e=new Map;#i=!1;#a=!1;#l;#s=new Map;#c=new C;#d=new Qr;#u=new Map;#f;#o=new Map;constructor(t){$N(this.#c,this.#d.asObservable()),this.setVaultConfig(t),this.#C(t.licenses),this.#g(),this.#A()}setVaultConfig(t){let e={devMode:t.devMode??!1,logLevel:t.logLevel??"off"};this.#f=Object.freeze(e),ft.setDevMode(this.#f.devMode),eT(this.#f.logLevel),this.#a=t.devMode?t.bypassLicensing??!1:!1,this.#l=t.licenseTimeoutMs??15e3,this.#x()}resetForTesting(){this.#t?.unsubscribe(),this.#t=void 0,this.#r?.unsubscribe(),this.#r=void 0,this.#f=void 0,this.resetFeatureCellRegistry(),this.#u.clear(),this.#n.clear()}resetFeatureCellRegistry(){this.#o.clear()}registerCellRuntime(t){this.#p(t)}registerBehaviors(t,e){let r=this.#p(t);r.behaviors=this.#h(e),r.behaviorsRegistered=!0}registerControllers(t,e){let r=this.#p(t);r.controllers=this.#h(e),r.controllersRegistered=!0}registerFluentApis(t,e){let r=this.#p(t);r.fluentApis=Object.freeze(e)}getLicensePayload(t){return this.#n.get(t)}isBypassLicensing(){return this.#a}isAuthorizedKey(t){return qN.has(t)}hasVaultLicense(){return this.#n.has(hT)}#C(t){if(t?.length)for(let e of t)e?.licenseId&&this.#n.set(e.licenseId,e.payload)}#h(t){return new Map(t.map(e=>{let r;this.#a?r=!1:r=e.needsLicense??!1;let i={key:e.key,type:e.type,critical:!!e.critical,needsLicense:r,validLicense:r?Hr.Pending:Hr.NotRequired};return[e.key,Object.freeze(i)]}))}#g(){this.#t=this.#c.subscribe(t=>{switch(t.type){case vr.DescribeFeature:{let e=t;this.registerFluentApis(e.featureCellKey,this.#R(e));break}case vr.DescribeBehaviors:{let e=t;this.registerBehaviors(e.featureCellKey,e.behaviors),this.#y(e.featureCellKey);break}case vr.DescribeControllers:{let e=t;this.registerControllers(e.featureCellKey,e.controllers),this.#y(e.featureCellKey);break}case vr.RequireLicense:{this.#D(t.featureCellKey),this.#S(t);return}case vr.ValidateLicense:{this.#T(t),this.#y(t.featureCellKey);return}}})}#D(t){if(!this.#l||this.#s.has(t))return;let e=setTimeout(()=>{this.#w(t),this.#s.delete(t)},this.#l);this.#s.set(t,e)}#w(t){let e=this.#o.get(t);if(!e)return;let r=[...e.behaviors?.values()??[],...e.controllers?.values()??[]],i=!1;for(let o of r)o.needsLicense&&o.validLicense===Hr.Pending&&((e.behaviors?.has(o.key)?e.behaviors:e.controllers)?.set(o.key,Object.freeze(Y(g({},o),{validLicense:Hr.Timeout}))),i=!0);i&&this.#m(t,!1),this.#v(t)}#y(t){let e=this.#o.get(t);if(!e||!e.behaviorsRegistered||!e.controllersRegistered)return;let i=[...e.behaviors?.values()??[],...e.controllers?.values()??[]].filter(o=>o.needsLicense);if(i.length===0){this.#m(t,!0);return}if(i.some(o=>o.validLicense===Hr.Revoked||o.validLicense===Hr.Timeout)){this.#v(t),this.#m(t,!1);return}i.some(o=>o.validLicense===Hr.Pending)||this.#m(t,!0)}#v(t){let e=this.#s.get(t);e&&(clearTimeout(e),this.#s.delete(t))}#m(t,e){this.#e.has(t)||(this.#e.set(t,e),this.#v(t),this.#u.set(t,e),this.#d.next({featureCellKey:t,approved:e}))}#T(t){let{featureCellKey:e,key:r,licenseToken:i,valid:o}=t;if(this.#e.has(t.featureCellKey))return;if(!r){Ne("Cannot validate license without a key.");return}let s=this.#o.get(e);s&&(this.#b(s.behaviors,r,i,o),this.#b(s.controllers,r,i,o),o&&r===KN&&this.#I())}#b(t,e,r,i){if(!t?.has(e))return;let o=t.get(e);if(o.needsLicense&&o.licenseId){if(o.licenseId!==r){Ne(`[vault] License key mismatch for "${e}".`);return}t.set(e,Object.freeze(Y(g({},o),{validLicense:i?Hr.Valid:Hr.Revoked})))}}#S(t){let{featureCellKey:e,key:r,licenseToken:i}=t,o=this.#o.get(e);if(o){if(!r||typeof r!="string")throw new Error("[vault] Cannot register controller license without a key.");this.#E(o.behaviors,r,i),this.#E(o.controllers,r,i)}}#E(t,e,r){if(!t?.has(e))return;let i=t.get(e);i.needsLicense&&(i.licenseId||r&&t.set(e,Object.freeze(Y(g({},i),{licenseId:r}))))}#x(){ft.active&&!yy.active&&console.error(`[vault] "Development Mode" is enabled outside of a test environment.
This can expose sensitive data because safeguards that normally remove or sanitize data are disabled.
You have explicitly disabled these safeguards and are responsible for ensuring production safety.
If this is intentional, you can safely ignore this message.`)}#R(t){let e=t?.fluentApis??{};return{filters:Array.isArray(e?.filters)?e.filters.length:0,reducers:Array.isArray(e?.reducers)?e.reducers.length:0,beforeTaps:Array.isArray(e?.beforeTaps)?e.beforeTaps.length:0,afterTaps:Array.isArray(e?.afterTaps)?e.afterTaps.length:0,emitStateCallbacks:Array.isArray(e?.emitStateCallbacks)?e.emitStateCallbacks.length:0,errorCallbacks:Array.isArray(e?.errorCallbacks)?e.errorCallbacks.length:0}}#p(t){return this.#o.has(t)||this.#o.set(t,{key:t,behaviorsRegistered:!1,controllersRegistered:!1}),this.#o.get(t)}#I(){this.#i||ft.active&&(typeof document>"u"||(this.#i=!0,globalThis.sdux??={},globalThis.sdux.debugWidget??={},globalThis.sdux.debugWidget.aiAssistEnabled=!0,document.dispatchEvent(new CustomEvent("sdux-license-resolved"))))}#A(){ft.active&&(typeof document>"u"||(globalThis.sdux??={},globalThis.sdux.debugWidget??={},globalThis.sdux.debugWidget.getRegistry=()=>this.getRegistrySnapshot(),uT()))}registerVaultSettled(t,e){let r=this.#p(t);r.vaultSettled=e}async awaitFeatureCellSettled(t){let e=this.#o.get(t);if(!e)throw new Error(`[vault] FeatureCell "${t}" not registered.`);typeof e.vaultSettled=="function"&&(await e.vaultSettled(),await Promise.resolve())}async awaitAllSettled(){for(let t of this.#o.values())typeof t.vaultSettled=="function"&&await t.vaultSettled();await Promise.resolve()}getRegistrySnapshot(){return new Map(this.#o)}};function mT(n){if(!Nt)throw new Error("[vault] Vault not initialized.");if(!n)throw new Error("[vault] registerFeatureCell() requires a valid entry object.");if(!n.key||typeof n.key!="string")throw new Error('[vault] registerFeatureCell() requires a valid "key" (non-empty string).');Nt.registerCellRuntime(n.key)}function gT(n){if(!Nt)throw new Error("[vault] Vault not initialized.");if(typeof n!="string"||!n.trim())throw new Error("[vault] getLicensePayload() requires a valid licenseId.");return Nt.getLicensePayload(n)}function YN(n,t){if(!Nt)throw new Error("[vault] Vault not initialized.");if(!n||typeof n!="string")throw new Error('[vault] registerVaultSettled() requires a valid "key" (non-empty string).');typeof t=="function"&&Nt.registerVaultSettled(n,t)}function yT(n){return Nt?Nt.isBypassLicensing()?!0:Nt.isAuthorizedKey(n):!1}function vT(){return Nt?Nt.isBypassLicensing():!1}function ev(){return Nt?Nt.hasVaultLicense():!1}var qy=class{#t=!1;#r;#n;#e;constructor(t,e,r){this.#r=t,this.#n=e,this.#e=r}initializeBehaviors(t,e){if(this.#t)throw new Error(`[vault] VaultBehaviorRunner already initialized \u2014 cannot reissue core behavior ID for feature cell "${this.#r}".`);if(this.#t=!0,!t||t.length===0)return[];let r=new Set;return t.map(i=>{let o=!1;try{if(typeof i!="function")return;let s=i[rf];if(!s)throw o=!0,new Error(`[vault] Behavior "${i.name}" missing @VaultBehavior metadata.`);let a=s.key,l=s.type;if(!a)throw o=!0,new Error('[vault] Behavior metadata missing "key".');if(!ev()&&!yT(a)){we(`[vault] Unlicensed behavior "${a}" skipped during initialization.`);return}if(!l)throw o=!0,new Error(`[vault] Behavior metadata missing "type" for "${a}".`);let c;if(s.wantsConfig){if(!s.configKey)throw o=!0,new Error(`[vault] Behavior "${a}" declares wantsConfig but has no configKey.`);c=e.get(s.configKey)}let u;if(s.needsLicense&&!vT()){if(!s.licenseId)throw o=!0,new Error(`[vault] Behavior "${a}" declares needsLicense but has no licenseId.`);if(u=gT(s.licenseId),u===void 0)throw o=!0,new Error(`[vault] License "${s.licenseId}" required by behavior "${a}" is not registered in Vault config.`)}let d;try{let f={featureCellKey:this.#r,behaviorConfig:c,licensePayload:u};s.type===M.TabSyncState&&(f=Y(g({},f),{lastSnapshot:this.#n,state$:this.#e})),d=new i(a,f)}catch(f){throw o=s.critical,f}if(!d.key)throw o=!0,new Error(`[vault] Behavior missing key for type "${l}". Every behavior must define a unique "key".`);if(!wy(d.key))throw o=!0,new Error(`[vault] Behavior key "${d.key}" not valid format for "${l}" behavior.`);return d.key&&r.has(d.key)?(Ne(`[vault] Skipping duplicate behavior with key "${d.key}"`),null):(d.key&&r.add(d.key),d)}catch(s){if(o)throw s;return Ne(`[vault] Non-critical behavior initialization failed: ${s?.message}`),null}}).filter(i=>!!i)}applyBehaviorExtensions(t,e,r){for(let i of t){let o={featureCellKey:e.key,destroyed$:e.destroyed$,reset$:e.reset$,mergeState:e.mergeState,replaceState:e.replaceState,state$:e.state$,vaultMonitor:r},s=i.extendCellAPI?.(o);if(!(!s||typeof s!="object"))for(let[a,l]of Object.entries(s)){let c=e[a]!==void 0,u=Array.isArray(i.allowOverride)&&i.allowOverride.includes(a);if(GN.has(a))throw new Error(`[vault] Behavior "${i.key}" attempted to overwrite core FeatureCell method "${a}".`);if(c&&!u)throw new Error(`[vault] Behavior "${i.key}" attempted to redefine method "${a}" already provided by another behavior.`);c&&u&&(Ne(`[vault] Behavior "${i.key}" is overriding method "${a}" (explicitly allowed).`),delete e[a]),Object.defineProperty(e,a,{value:(...d)=>{try{return typeof l!="function"?void 0:l(...d)}catch(f){throw Ot(`[vault] Behavior extension "${a}" threw an error:`,f),f}},enumerable:!1,writable:!1,configurable:!0})}}}},ZN=n=>n.type===M.ErrorTransform,XN=n=>n.type===M.CoreErrorCallback,QN=n=>n.type===M.CoreEmitState,Ps=n=>n===_y,Ly=()=>crypto?.randomUUID?.()??Math.random().toString(36).slice(2,7),bT=n=>wi(n)||Ps(n),JN={pro:`
-----BEGIN PUBLIC KEY-----
MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEAuXto+eRaFm9pObys/IEI ASwV1wgGvNGJsiyw/9hXsEd9mA76aQI1X9lpkZRKmBFovHdK2unPHFOPQM0k9vJo ieFMNXO9kmHn7UYZV98bDCcDTNURFHQ4SWlcAE/HEiNqcUb9LwotFbON7/mcthM8 QQQ4Lycdv+lm1uozQl8rl+i7FjfQzLaxJMuAkm9jFZK+ta6eoSy/lmXfhDem8RIo dE19aZWfY+LTXP9nn977XFah0z0S0D3NSvMv96gZsXTN2hTbFBl5dgDMAOW9R5OI wT6I+kGwrVqARXq2pTDHnZjqfO3a+rT4Lrb5/L58RjQ0EfA5puZ16EXGEUpOabqI KVT4Z/wv818P8eyat+LtTcy2G0zx/h0Fcz0QANzx3P9K7ezxeqdg4SsjkcNXRWZq PaJUhZHygN/Xuef9zfWwjuKobCBSdyyeXxF5XS0A0Y6NBmdhikyHc/YOY2iYupIt xiUvlHaq97B5wej3XcTmp4kmJUQyeQ8oD5Mj8Dmf69oa7vhI/ANNKWo9s8e7u7UX Dx74Eu3d8JBpACQ+Vvek6ZEGw+D0yCyLF6u/CaCw+cb2cBYAlM7jWZ5kpgsbQcWw YP2nbGV3OofcEspoEU704M4RW4v+nSRYrJbMEIJJ5Wuxk2/RuUgk/9uwgCHAvzXZ cmGomIf9dXZGoNhwT5uW1OECAwEAAQ==
-----END PUBLIC KEY-----
`,enterprise:`
-----BEGIN PUBLIC KEY----- MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEA6k4XHyV4WE6Bd/fizN4Q c3C37LtskNTJ1c3FVxcziygAFd+fotRfbLHctwtJJhuO6+Pv+c1SPjrPeJsWRw4M IN7QHcBQHPbQDW/Erd1XjA0OVNbxs3xLVjtgMuVcd2sKYPp4nJqIyz5WLMde7v1g 1k8knI+ISrym0h4GcjkNSaHK5QKKpK7n3dzOXrjo1P6h1uOVsGAHC/ErVMQNHrAu dKgY+SDVn87oPIrd2pJb5SotI6H8HzODM/CDsF58hk/eK4zApnrtDViVb1j3oNCk hdDOnN98VIgwcHzHYZOhPFM0TFwudpi57Yu/PJJztI7WbsjpxTyX3JPvwVeWJR+Z tt6NEQ5ZaoBghGgHGiuRbhKR5qoznwsMkfb2jUbpbgRTinmtEjFmpIYSnROCixjq W1neupzBDrNi+JfoVsTwiP8SbzxHXWksN0gLMfL235l1LDMS/IrI3RmhcRkhB/Pu vPuc+jhPkwpbXaM9vDkkPWK1dmRYHWo3atYCWoSdK2705woo19oT8Dxm9OXKT+nh HsdOI+k9asBCqe4kQHi3OJ4Raesa6bFWWxKFLeUNKSAt7clJKo7GhrovnHIIAbty gk7ULdwLIlpjwB5mVUBBCts5z9KznHo+pumNoeEA8FGqq374a+jEPOHWjsshA678 RDYeqeRbh2VNcy/OwlqH/MUCAwEAAQ==
-----END PUBLIC KEY-----
`,development:`
-----BEGIN PUBLIC KEY----- MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEAsAFRjQalSEZkCDPrdBEf IMQpY7ujGf4pqjuFk86rkZENr7kJ00RjVJxuhcafgygdmxVAhKS+d1WtsSAw6c9m AawI+sSyhAClB+wrwfuCrxt/ZlLbNMiMH5SD1YvoRaHstkLpMGbWnbsLDI+cCpaL hGKk+5LoJLikhf9ipBkGX8VSAT0xTMk06iaYtEV85H9cMWtfx7seyBw2Mps/8S6f Rtp3tLlbNJIyh9+5XjtkTqYNRWJtFW1rv75K9GN9dPVXrEXUGojqeV13G+z2R3Sr QvmhESkyC1DviZBxaYnEhpWoijJQFJUQ1DGRi29ugktYzf36Otw9gyz9jGb5MLNE W+meR2LdnbTBy83QNtaS5lCzNJVo2ohwbD+djblNVegH/Dr0rK4IHEYSgjdxjErY 6xqykJpKJ025CTU4kyI3aaaYB+l2CQMAKVAh2y2rgGyJSJnMDTR44aBIZ8rtTu2r wazjBJ/RiMr0OOkfBqEQPKZ6qzSWtBDebvD0iUyRAP8SXSdDo1DcaJNamLLmjIxr 3KCcwgJt2oLcdZZHKG3WbjqmIdp7tq03O4gajKJHd5GmyLWtHXKqBwaijAx9aNqr qDPWj/Qg/8C9qpSBs7EUod3slV6UhO4yEnb7FdD/O0o8mRMU0rtJ0KQTarpEh2bY MKVsYxByiFeAjUJUWLSqIX8CAwEAAQ==
-----END PUBLIC KEY-----
`},dT=!1;var eP={verify:async n=>{try{let t=n.indexOf(".");if(t===-1)return!1;let e=n.substring(0,t),r=n.substring(t+1),i=atob(e),o=JSON.parse(i),s=Uint8Array.from(atob(r),d=>d.charCodeAt(0)),a=o?.licenseType;if(!a)return!1;if(!ft.active&&a==="development")return console.error("[sdux-vault] Development license token rejected in production environment."),!1;let l=JN[a];if(!l)return!1;let c=await tP(l),u=await crypto.subtle.verify({name:"RSASSA-PKCS1-v1_5",hash:"SHA-256"},c,s,new TextEncoder().encode(e));if(dT||(dT=!0,u?console.info(`[sdux-vault] License verified \u2014 organization: "${o.organization}", tier: "${o.licenseType}"`):console.warn(`[sdux-vault] License signature invalid \u2014 organization: "${o.organization}", tier: "${o.licenseType}"`),console.info("[sdux-vault] License organization:",o.organization),console.info("[sdux-vault] License domain:",o.domain),console.info("[sdux-vault] License type:",o.licenseType),console.info("[sdux-vault] License issuedAt:",df(o.issuedAt)),console.info("[sdux-vault] License expires:",df(o.expires))),u&&o.licenseType==="enterprise"&&typeof o.expires=="number"){let d=o.expires-Date.now();if(d<0)return console.error(`[sdux-vault] Enterprise license expired \u2014 organization: "${o.organization}", expired: ${df(o.expires)}`),!1;let f=360*60*60*1e3;d<=f&&console.warn(`[sdux-vault] Enterprise license expiring soon \u2014 organization: "${o.organization}", expires: ${df(o.expires)}`)}return u}catch(t){return console.error("[sdux-vault] License token verification failed:",t),!1}}};async function tP(n){let t=rP(nP(n));return crypto.subtle.importKey("spki",t,{name:"RSASSA-PKCS1-v1_5",hash:"SHA-256"},!1,["verify"])}function nP(n){let t=n.replace(/-----.*KEY-----/g,"").replace(/\s+/g,"");return atob(t)}function rP(n){let t=new ArrayBuffer(n.length),e=new Uint8Array(t);for(let r=0;r<n.length;r++)e[r]=n.charCodeAt(r);return t}function df(n){return typeof n=="string"?n:new Intl.DateTimeFormat("en-US",{month:"2-digit",day:"2-digit",year:"numeric"}).format(new Date(n))}async function iP(n){try{return n?await eP.verify(n):!1}catch{return!1}}var tv=(()=>{class n{static needsLicense;static key;#t;#r;#n;#e;constructor(e){let r=this.constructor;if(typeof r.key!="string"||!r.key.trim())throw new Il('LicensingClass requires a static "key". Did you forget @VaultBehavior or @VaultController?');this.#e=kl(),this.#n=r.key,this.#r=e.featureCellKey,r.needsLicense&&this.#i()}#i(){this.#t=this.#e.requestLicense(this.#r,this.#n)}validateLicense(e){if(!this.#t)throw new Il(`validateLicense() called but no license was requested for "${this.#r}" and "${this.#n}".`);this.#e.validateLicense(this.#r,this.#n,this.#t,e)}}return n})(),Ky=class extends tv{behaviorCtx;static type;static key;static critical;static needsLicense;type=M.CoreLicense;critical=!0;key;constructor(t,e){super(e),this.behaviorCtx=e,this.key=t,iP(this.behaviorCtx.licensePayload).then(r=>this.validateLicense(r))}destroy(){Ne(`${this.key} - destroy noop`)}reset(){Ne(`${this.key} - reset noop`)}};Ky=ia([iT({type:M.CoreLicense,key:Dy("Core","License"),critical:!0,needsLicense:!0,licenseId:hT})],Ky);var Yy=class{#t;#r;#n;#e;cellKey;decisionEngine;#i;#a;#l;#s;#c;#d;#u;privateErrorService=tT();#f=[];#o;#C;#h;vaultMonitor=Jy();constructor(t){this.#t=t.afterTapCallbacks??[],this.#r=t.beforeTapCallbacks??[],this.cellKey=t.cell?.key,this.#s=t.emitStateCallbacks??[],this.#u=t.errorCallbacks??[],this.#f=t.filterCallbacks??[],this.#o=t.initialState,this.#h=t.reducerCallbacks??[]}initializeOrchestrator(t){t.behaviors=t.behaviors??[],this.#b(t)}async initializeFeatureCell(t){await this.#H(t)}destroyBehaviors(t){this.#V(t)}resetBehaviors(t){this.#L(t)}async orchestrate(t,e){t.operation===En.Replace?await this.#A(t):await this.#F(t,e)}buildControllerCtx(t){return{traceId:t.traceId,featureCellKey:t.featureCellKey,snapshot:t.lastSnapshot,incoming:t.incoming,operation:t.operation}}normalizeIncoming(t){return t?Sy(t)||Zt(t)||Os(t)||Os(t)?t:aT(t)?de(t):{value:t}:null}controllerOutcomeNotification(t,e){switch(t){case rn.Abort:{this.#c.finalizeControllerAbort(e);break}case rn.Deny:{this.#c.finalizeControllerDeny(e);break}}}prepareIncoming(t,e,r){t=this.#g(t,e,r);let i=this.#c.preparePipelineIncoming(t);if(wi(i)&&(this.vaultMonitor.startCoreState(this.cellKey,Te,t),this.#M(t),this.vaultMonitor.endCoreState(this.cellKey,Te,t)),_o(i)){this.vaultMonitor.startCoreState(this.cellKey,Te,t),this.#L(t),this.#M(t),this.vaultMonitor.endCoreState(this.cellKey,Te,t);return}return i}#g(t,e,r){return t.incoming=this.normalizeIncoming(e),t.resolveType=this.#$(e),t.operation=r,t}#D(t,e){let r=e.behaviors.filter(i=>i.type===M.Merge);if(r.length>1){let i=r.map(o=>o.key).join(", ");throw new Error(`SDuX Error: More than one MergeBehavior was provided. Only one merge strategy can be active per FeatureCell. Received: ${i}. Fix: Remove additional merge behaviors or combine them into a single behavior.`)}return r.length===1&&(t.push(r[0]),t=t.filter(i=>i.type!==M.Merge)),t}#w(t){let e=t.defaultBehaviors??[];return e=this.#y(e,t),e=this.#D(e,t),e=this.#v(e,t),e=this.#m(e),e}#y(t,e){return e?.errorCallbacks?.length===0?t.filter(r=>r.type!==M.CoreErrorCallback):t}#v(t,e){return e?.emitStateCallbacks?.length===0?t.filter(r=>r.type!==M.CoreEmitState):t}#m(t){return t=t?.filter(e=>e.type!==M.CoreLicense),ev()&&t.push(Ky),t}#T(t){let e=t.map(r=>{let i=r[rf];return{key:r.key,type:i.type,critical:i.critical,needsLicense:i.needsLicense}});kl().describeBehaviors({featureCellKey:this.cellKey,behaviors:e})}#b(t){let e=this.#w(t),r=t.behaviors?.filter(a=>!(a.type===M.CoreAfterTap||a.type===M.CoreBeforeTap||a.type===M.CoreError||a.type===M.CoreErrorCallback||a.type===M.CoreEmitState||a.type===M.CoreLicense||a.type===M.CoreState||a.type===M.Filter||a.type===M.FromObservable||a.type===M.FromPromise||a.type===M.FromStream||a.type===M.Reduce||a.type===M.Resolve));t.operators=t.operators??[],t.interceptors=t.interceptors??[];let i=[...e,...r,...t.operators,...t.interceptors];i.some(a=>a.type===M.TabSyncState)&&(i=i.filter(a=>a.type!==M.CoreState));let s=new qy(this.cellKey,t.lastSnapshot,t.state$);this.#T(i),this.#n=s.initializeBehaviors(i,t.behaviorConfigs),this.#x(),this.#R(),this.#S(),this.#E(),s.applyBehaviorExtensions(this.#n,t.cell,this.vaultMonitor)}#S(){this.#e=this.#n.filter(t=>!(t.type===M.CoreState||t.type===M.TabSyncState||t.type===M.CoreEmitState||t.type===M.CoreError||t.type===M.ErrorTransform||t.type===M.CoreErrorCallback||t.type===M.Merge))}#E(){let t=this.#n.filter(i=>i.type===M.TabSyncState),e=this.#n.filter(i=>i.type===M.CoreState),r=t.length>0?t:e;if(r.length>1)throw new Error("Only one core state behavior can be registered for a FeatureCell.");this.#c=r[0]??null,this.#l=this.#n.filter(i=>QN(i))[0]}#x(){let t=this.#n.filter(e=>e.type===M.CoreError);if(t.length>1)throw new Error("Only one core error behavior can be registered for a FeatureCell.");this.#i=t[0]??null,this.#a=this.#n.filter(e=>XN(e))[0],this.#d=this.#n.filter(e=>ZN(e))}#R(){let t=this.#n.filter(e=>e.type===M.Merge);this.#C=t[0]??null}async#p(t,e,r){let i=await this.#_(t,e,r);return _o(i)?xl:wi(i)?sf:by}async#I(t,e){let r,i=await this.#p(M.StepwiseResolve,t,e);if(!cf(i))return i;if(this.#B()){if(r=await this.#j(t,e),wi(r))return sf}else r=e;r=await this.#_(M.Filter,t,r);let o=await this.#p(M.StepwiseFilter,t,r);if(!cf(o))return o;await this.#_(M.CoreBeforeTap,t,de(r)),r=await this.#_(M.Reduce,t,r);let s=await this.#p(M.StepwiseReducer,t,r);if(!cf(s))return s;await this.#_(M.CoreAfterTap,t,de(r));let a=de(r),l=a;return l=await this.#P(M.Encrypt,t,l),await this.#P(M.Persist,t,l),a}async#A(t){this.vaultMonitor.startReplace(this.cellKey,Te,t),await this.#O(async()=>{let e;if(e=await this.#N(t),!Ps(e)){let r=await this.#_(M.Resolve,t,void 0);_o(r)?e=xl:e=await this.#I(t,r)}return this.#k(e,t)},t)}async#F(t,e){this.vaultMonitor.startMerge(this.cellKey,Te,t),await this.#O(async()=>{let r=de(t.lastSnapshot.value),i;if(i=await this.#N(t),!Ps(i)){let o=await this.#_(M.Resolve,t,void 0),s=de(o);this.vaultMonitor.startComputeMerge(this.cellKey,Te,t);let a=await this.#C.computeMerge(r,s,e);if(this.vaultMonitor.endComputeMerge(this.cellKey,Te,t),_o(a))i=xl;else{let l=de(a);i=await this.#I(t,l)}}return await this.#k(i,t)},t)}async#k(t,e){let r;return Ps(t)?r={pipelinePaused:!0}:_o(t)?r={pipelineStateCleared:!0}:(Al(t)||wi(t))&&(r={noop:!0}),e.operation===En.Replace?this.vaultMonitor.endReplace(this.cellKey,Te,e,r):this.vaultMonitor.endMerge(this.cellKey,Te,e,r),t}async#O(t,e){try{let r=await t();this.vaultMonitor.startCoreState(this.cellKey,Te,e),Ps(r)?this.#c.finalizePipelineVaultStop(e):this.#c.finalizePipelineState(r,e),await this.#M(e),this.vaultMonitor.endCoreState(this.cellKey,Te,e),this.decisionEngine?.notifySuccess(this.buildControllerCtx(e))}catch(r){let i=await this.#U(r,e);await this.decisionEngine?.notifyFailure(this.buildControllerCtx(e),i)}}async#_(t,e,r){let i;t===M.Resolve?i=this.#e.filter(o=>o.resolveType===e.resolveType&&o.type===t):i=this.#e.filter(o=>o.type===t);for(let o of i){let s;try{switch(t){case M.Resolve:typeof o.computeResolve=="function"&&(this.vaultMonitor.startResolve(this.cellKey,o.key,e),s=await o.computeResolve(e),yr(s)&&(r=de(s)),this.vaultMonitor.endResolve(this.cellKey,o.key,e));break;case M.StepwiseResolve:case M.StepwiseFilter:case M.StepwiseReducer:if(typeof o.evaluateStepwise=="function"){this.vaultMonitor.startStepwise(this.cellKey,o.key,e);let a=de(e.lastSnapshot.value),l=de(r);s=await o.evaluateStepwise(a,l,e.featureCellKey),this.vaultMonitor.endStepwise(this.cellKey,o.key,e)}break;case M.Filter:if(typeof o.applyFilter=="function")for(let a of this.#f){this.vaultMonitor.startFilter(this.cellKey,o.key,e);let l=de(r),c=await o.applyFilter(l,a);this.vaultMonitor.endFilter(this.cellKey,o.key,e),yr(c)&&(r=de(c))}break;case M.CoreBeforeTap:if(typeof o.applyBeforeTap=="function")for(let a of this.#r){this.vaultMonitor.startBeforeTap(this.cellKey,o.key,e);let l=de(r);await o.applyBeforeTap(l,a),this.vaultMonitor.endBeforeTap(this.cellKey,o.key,e)}break;case M.Reduce:if(typeof o.applyReducer=="function"){if(Al(r)&&this.#h.length>0)throw new Error(`[vault] Reducer stage received undefined state in FeatureCell "${this.cellKey}", but reducers are registered.`);for(let a of this.#h){this.vaultMonitor.startReducer(this.cellKey,o.key,e);let l=de(r),c=await o.applyReducer(l,a);this.vaultMonitor.endReducer(this.cellKey,o.key,e),yr(c)&&(r=de(c))}}break;case M.CoreAfterTap:if(typeof o.applyAfterTap=="function")for(let a of this.#t){this.vaultMonitor.startAfterTap(this.cellKey,o.key,e);let l=de(r);await o.applyAfterTap(l,a),this.vaultMonitor.endAfterTap(this.cellKey,o.key,e)}break}}catch(a){throw this.vaultMonitor.runtimeError(this.cellKey,o.key,e,a),a}yr(s)&&(r=de(s))}return r}async#N(t){let e=this.#e.filter(r=>r.type===M.Interceptor);for(let r of e)try{this.vaultMonitor.startInterceptor(this.cellKey,r.key,t),t.incoming=de(t.incoming);let i=await r.applyInterceptor(t);if(Ps(i))return this.vaultMonitor.endInterceptor(this.cellKey,r.key,t,{pipelinePaused:!0}),_y;this.vaultMonitor.endInterceptor(this.cellKey,r.key,t)}catch(i){throw this.vaultMonitor.runtimeError(this.cellKey,r.key,t,i),i}}#B(){return this.#e.filter(e=>e.type===M.Operator).length>0}async#j(t,e){let r=this.#e.filter(i=>i.type===M.Operator);for(let i of r)try{this.vaultMonitor.startOperator(this.cellKey,i.key,t);let o=de(e),s=await i.applyOperator(o);if(Al(s)){this.vaultMonitor.endOperator(this.cellKey,i.key,t,{noop:!0});return}e=de(s),this.vaultMonitor.endOperator(this.cellKey,i.key,t)}catch(o){throw this.vaultMonitor.runtimeError(this.cellKey,i.key,t,o),o}return e}async#P(t,e,r){let i;i=this.#e.filter(o=>o.type===t);for(let o of i)try{switch(t){case M.Encrypt:if(typeof o.encryptState=="function"){this.vaultMonitor.startEncrypt(this.cellKey,o.key,e);let s=de(r),a=await o.encryptState(e,s);this.vaultMonitor.endEncrypt(this.cellKey,o.key,e),yr(a)&&(r=de(a))}break;case M.Persist:if(typeof o.persistState=="function"){this.vaultMonitor.startPersist(this.cellKey,o.key,e);let s=de(r);await o.persistState(s),this.vaultMonitor.endPersist(this.cellKey,o.key,e)}break}}catch(s){throw this.vaultMonitor.runtimeError(this.cellKey,o.key,e,s),s}return r}#V(t){for(let e of this.#n){this.vaultMonitor.startDestroy(this.cellKey,e.key,t);try{e.destroy?.(t),this.vaultMonitor.endDestroy(this.cellKey,e.key,t)}catch(r){Ot(`${e.key} destroy() failed`,r),this.vaultMonitor.endDestroy(this.cellKey,e.key,t,{destroyFailed:!0})}}}#L(t){for(let e of this.#n){this.vaultMonitor.startReset(this.cellKey,e.key,t);try{e.reset?.(t),this.vaultMonitor.endReset(this.cellKey,e.key,t)}catch(r){Ot(`${e.key} reset() failed`,r),this.vaultMonitor.endReset(this.cellKey,e.key,t,{resetFailed:!0})}}}async#M(t){if(this.#s?.length>0){let e=de(t.lastSnapshot);this.vaultMonitor.startCoreEmitState(this.cellKey,Te,t);for(let r of this.#s)await this.#l.emitState(e,r);this.vaultMonitor.endCoreEmitState(this.cellKey,Te,t)}}async#U(t,e){let r;try{this.vaultMonitor.startCoreError(this.cellKey,Te,e),r=await this.#i.handleError(t,e.featureCellKey),we(`${this.cellKey} #runErrorBehaviors starting with base ResourceError: ${JSON.stringify(r)}`)}catch(i){Ot("[vault] Core error normalization failed",i),r=bo(t,e.featureCellKey)}finally{this.vaultMonitor.endCoreError(this.cellKey,Te,e)}for(let i of this.#d)try{this.vaultMonitor.startErrorTransform(this.cellKey,Te,e);let o=await i.transformError(de(t),de(r),de(e.lastSnapshot));!wi(o)&&!uf(o)&&(r=o)}catch(o){Ot(`[vault] ErrorBehavior "${i.key}" threw during error handling`,o)}finally{this.vaultMonitor.endErrorTransform(this.cellKey,Te,e,r)}try{this.vaultMonitor.startCoreState(this.cellKey,Te,e),await this.#c.finalizePipelineError(r,e),await this.#M(e)}catch(i){Ot("[vault] Failed to finalize error state",i)}finally{this.vaultMonitor.endCoreState(this.cellKey,Te,e)}try{this.vaultMonitor.startGlobalError(this.cellKey,Te,e),await this.privateErrorService.setError(de(r))}catch(i){Ot("[vault] global error service",i)}finally{this.vaultMonitor.endGlobalError(this.cellKey,Te,e)}if(this.#u?.length>0){this.vaultMonitor.startCoreCallbackError(this.cellKey,Te,e);for(let i of this.#u)try{await this.#a.callbackError(de(r),de(e.lastSnapshot),i)}catch(o){Ot("[vault] Error callback threw during error handling",o)}this.vaultMonitor.endCoreCallbackError(this.cellKey,Te,e)}return we(`${this.cellKey} #runErrorBehaviors completed with final ResourceError: ${JSON.stringify(r)}`),r}#$(t){if(Sy(t))return Rl.HttpResource;if(Zt(t))return Rl.Observable;if(Os(t)||Os(t?.value))return Rl.Promise;if(Ty(t)||Ty(t?.value))throw new nf;return Rl.Value}async#H(t){let e={value:void 0,loading:!1,error:null},r;if(Os(this.#o))r=this.#o;else{let i=this.#z();if(i.length>0){let o=await this.#W(t,i);yr(o)&&(we("Persisted data loaded from storage"),r=o)}else uf(this.#o)||(this.vaultMonitor.startSetInitialValue(this.cellKey,Te,t),we("Initialized data loaded from descriptor.initial"),r=this.#o,this.vaultMonitor.endSetInitialValue(this.cellKey,Te,t))}e.value=r,uf(e.value)?this.decisionEngine?.notifySuccess(this.buildControllerCtx(t)):await this.orchestrate(this.#g(t,e,En.Replace))}#z(){return this.#e.filter(t=>t.type===M.Persist)}async#W(t,e){let r;for(let o of e)try{if(this.vaultMonitor.startLoadPersist(this.cellKey,o.key,t),r=await o.loadState?.(),yr(r)){this.vaultMonitor.endLoadPersist(this.cellKey,o.key,t);break}else this.vaultMonitor.endLoadPersist(this.cellKey,o.key,t,{noop:!0})}catch(s){this.vaultMonitor.runtimeError(this.cellKey,o.key,t,s),Ne(`"[vault] persist.loadState()" for ${o.key} failed with ${s.message}`)}let i=this.#e.filter(o=>o.type===M.Encrypt);if(yr(r)&&i.length>0)for(let o of i)try{this.vaultMonitor.startDecrypt(this.cellKey,o.key,t);let s=await o.decryptState?.(t,r);yr(s)?(this.vaultMonitor.endDecrypt(this.cellKey,o.key,t),r=de(s)):this.vaultMonitor.endDecrypt(this.cellKey,o.key,t,{noop:!0})}catch(s){this.vaultMonitor.runtimeError(this.cellKey,o.key,t,s),Ne(`"[vault] encrypt.decryptState()" for ${o.key} failed with ${s.message}`);return}return r}},Ns={Pending:"pending",Approved:"approved",Denied:"denied"},Zy=class{#t=!1;#r;constructor(t){this.#r=t}initializeControllers(t,e,r){if(this.#t)throw new Error(`[vault] VaultControllerRunner already initialized \u2014 cannot reissue core controller ID for feature cell "${this.#r}".`);if(this.#t=!0,!t||t.length===0)return[];let i=new Set;return t.map(o=>{let s=!1;try{if(typeof o!="function")return;let a=o[of];if(!a)throw s=!0,new Error(`[vault] Controller "${o.name}" missing @VaultController metadata.`);let l=a.key,c=a.type;if(!l)throw s=!0,new Error('[vault] Controller metadata missing "key".');if(!ev()&&!yT(l)){we(`[vault] Unlicensed controller "${l}" skipped during initialization.`);return}if(!c)throw s=!0,new Error(`[vault] Controller metadata missing "type" for "${l}".`);let u;if(a.wantsConfig){if(!a.configKey)throw s=!0,new Error(`[vault] Controller "${l}" declares wantsConfig but has no configKey.`);u=r.get(a.configKey)}let d;if(a.needsLicense&&!vT()){if(!a.licenseId)throw s=!0,new Error(`[vault] Controller "${l}" declares needsLicense but has no licenseId.`);if(d=gT(a.licenseId),d===void 0)throw s=!0,new Error(`[vault] License "${a.licenseId}" required by controller "${l}" is not registered in Vault config.`)}let f={featureCellKey:this.#r,requestRevote:m=>{e.next({traceId:m,type:Dn.Revote})},requestAbort:m=>{e.next({traceId:m,type:Dn.Abort})},controllerConfig:u,licensePayload:d};c===Di.License&&(f.licenseDenied=m=>{e.next({traceId:m,type:Dn.LicenseDenied})},f.licenseApproved=m=>{e.next({traceId:m,type:Dn.LicenseApproved})});let p=new o(l,f);if(!p.key)throw s=!0,new Error(`[vault] Controller missing key for type "${c}". Every controller must define a unique "key".`);if(!sT(p.key))throw s=!0,new Error(`[vault] Controller key "${p.key}" not valid format for "${c}" controller.`);return p.key&&i.has(p.key)?(Ne(`[vault] Skipping duplicate controller with key "${p.key}"`),null):(p.key&&i.add(p.key),p)}catch(a){if(s)throw a;return Ne(`[vault] Non-critical controller initialization failed: ${a?.message}`),null}}).filter(o=>!!o)}},Xy=class extends Yy{#t=[];#r=[];#n=new C;#e=!1;#i=!1;#a=Ns.Pending;#l=new C;constructor(t){super(t),kl().describeFeature({featureCellKey:t.cell.key,fluentApis:{filters:t.filterCallbacks,reducers:t.reducerCallbacks,beforeTaps:t.beforeTapCallbacks,afterTaps:t.afterTapCallbacks,emitStateCallbacks:t.emitStateCallbacks,errorCallbacks:t.errorCallbacks}}),ft.active&&(this.vaultSettled=this.#E.bind(this)),this.#m(t),this.vaultMonitor.conductorLicenseAttempt(this.cellKey,`${this.cellKey}::license`),this.initializeOrchestrator(t)}initialize(t){let e=this.#h(t,En.Initialize,void 0);this.#d({behaviorCtx:e,controllerCtx:this.buildControllerCtx(e),options:void 0})}conduct(t,e,r,i){let o=this.#h(t,r,i),s=this.prepareIncoming(o,e,r);if(wi(s)||_o(s))return;o.incoming=s;let a=this.buildControllerCtx(o);this.#d({behaviorCtx:o,controllerCtx:a,options:i})}reset(t){this.vaultMonitor.startReset(this.cellKey,ht,t),t.traceId=t.traceId??Ly(),this.#g(),this.resetBehaviors(t),this.#w(t),this.vaultMonitor.endReset(this.cellKey,ht,t)}destroy(t){we(`${ht} - destroy`),t.traceId=t.traceId??Ly(),this.vaultMonitor.startDestroy(this.cellKey,ht,t),this.#g(),this.destroyBehaviors(t),this.#D(t),this.#n.complete(),this.vaultMonitor.endDestroy(this.cellKey,ht,t)}async#s(t,e){if(t.operation===En.Initialize){await this.initializeFeatureCell(t);return}if(t.operation===En.Replace||t.operation===En.Merge){await this.orchestrate(t,e);return}this.vaultMonitor.runtimeError(this.cellKey,ht,t,new Error(`Unknown operation type: "${t.operation}"`)),this.#u(t)}#c(){queueMicrotask(()=>{this.#b()})}#d(t){this.#a===Ns.Pending||this.#a===Ns.Approved?(this.vaultMonitor.startControllerAttempt(this.cellKey,ht,t.controllerCtx),this.#t.push(t),this.#a===Ns.Approved?!this.#e&&this.#t.length===1?this.#o():this.#i&&this.#c():this.#c()):this.#c()}#u(t){let e=this.#t[0];!e||e.finalized||(e.finalized=!0,queueMicrotask(()=>{this.decisionEngine.notifyFinalize(t),this.#t.shift(),this.#e=!1,this.#S(),this.#o()}))}#f(t,e){this.vaultMonitor.restartControllerAttempt(this.cellKey,ht,t,e),this.#e=!1}async#o(){if(this.#e||!this.#t.length)return;this.#e=!0;let t=this.#t[0];if(!t){this.#e=!1;return}try{let e=await Wo(this.#T(t)),r=this.#t[0];if(!r){this.#e=!1;return}let{behaviorCtx:i,options:o}=r,s=!1;switch(e){case rn.Abstain:{we(`${this.cellKey} DecisionOutcome: "${rn.Abstain} received. Process Event dispatched.`),await this.#s(i,o);break}case rn.Abort:{this.controllerOutcomeNotification(rn.Abort,i),this.vaultMonitor.endControllerAttempt(this.cellKey,ht,i,{status:e}),this.#u(i);break}case rn.Deny:{this.#b(),s=!0,this.#e=!1,this.vaultMonitor.notifyConductorDeny(this.cellKey,ht,i),this.controllerOutcomeNotification(rn.Deny,i);break}}if(s)this.#i=!0;else return this.#i=!1,this.#o()}catch(e){Ot("[conductor] Unreachable subscription error",e),this.vaultMonitor.conductorCrashed(this.cellKey,ht,t?.controllerCtx??{traceId:"unknown"},e),this.#t.shift(),this.#o()}}#C(){this.decisionEngine=new Wy(this.#r,this.#n),this.#n.subscribe({next:t=>{if(t.type===Dn.LicenseDenied){this.vaultMonitor.conductorLicenseDenied(this.cellKey,`${this.cellKey}::license`),this.#a=Ns.Denied;let r=new Error(`${this.cellKey} Conductor Decision Engine: The FeatureCell received a "License Denied". Pipeline is disabled.`);console.error(`[vault] ${r.message}`),we(r.message),this.privateErrorService.setError(bo(r,this.cellKey)),this.#t.length=0;return}if(t.type===Dn.LicenseApproved){this.vaultMonitor.conductorLicenseApproved(this.cellKey,`${this.cellKey}::license`),this.#a=Ns.Approved,we(`${this.cellKey} Conductor Decision Engine: License Approved.`),this.#o();return}let e=this.#t[0];if(e){if(e.controllerCtx.traceId!==t.traceId){we(`The head ctx is not the same as the event. ${e.controllerCtx.traceId} != ${t.traceId}`);return}switch(t.type){case Dn.Success:{this.vaultMonitor.endControllerAttempt(this.cellKey,ht,e.controllerCtx,{status:"success"}),this.#u(e.controllerCtx);break}case Dn.Failure:{this.vaultMonitor.endControllerAttempt(this.cellKey,ht,e.controllerCtx,{status:"failure"}),this.#f(e.behaviorCtx,t.type);break}case Dn.Abort:{this.vaultMonitor.conductorAbort(this.cellKey,ht,e.controllerCtx),we(`${this.cellKey} Conductor Decision Engine: Abort request received for Behavior TraceId: ${e.controllerCtx.traceId}.`),this.#u(e.controllerCtx);break}case Dn.Revote:{we(`${this.cellKey} Conductor Decision Engine: Revote request received for Behavior TraceId: ${e.controllerCtx.traceId}.`),this.vaultMonitor.conductorRevote(this.cellKey,ht,e.controllerCtx),this.#e=!1,we(`${this.cellKey} Conductor Decision Engine: processQueue event dispatched for Behavior TraceId: ${e.controllerCtx.traceId}.`),this.#o();break}}}}})}#h(t,e,r){let i=Ly();return{destroyed$:t.destroyed$,reset$:t.reset$,state$:t.state$,featureCellKey:t.featureCellKey,state:t.state,lastSnapshot:t.lastSnapshot,options:r!=null?de(r):r,traceId:i,operation:e,resolveType:void 0,incoming:void 0}}#g(){this.#t.length=0,this.#e=!1}#D(t){for(let e of this.#r){this.vaultMonitor.startDestroy(this.cellKey,e.key,t);try{e.destroy?.(),this.vaultMonitor.endDestroy(this.cellKey,e.key,t)}catch(r){Ot(`${e.key} destroy() failed`,r),this.vaultMonitor.endDestroy(this.cellKey,e.key,t,{destroyFailed:!0})}}}#w(t){for(let e of this.#r){this.vaultMonitor.startReset(this.cellKey,e.key,t);try{e.reset?.(),this.vaultMonitor.endReset(this.cellKey,e.key,t)}catch(r){Ot(`${e.key} reset() failed`,r),this.vaultMonitor.endReset(this.cellKey,e.key,t,{resetFailed:!0})}}}#y(t,e){let r=e.controllers.filter(i=>i.type===Di.Error);if(r.length>1){let i=r.map(o=>o.key).join(", ");throw new Error(`SDuX Error: More than one ErrorController was provided. Only one error policy can be active per FeatureCell. Received: ${i}. Fix: Remove additional error controllers or combine them into a single controller.`)}r.length===1?t.push(r[0]):t.unshift(By)}#v(t){return t.filter(e=>e.type===Di.License||e.type===Di.CoreAbstain?(we(`${this.cellKey} Conductor: Filtering out controller "${e.key}" of type "${e.type}" as it is reserved for internal use.`),!1):!0)}#m(t){t.controllers=t.controllers??[];let e=this.#v(t.controllers);this.#y(e,t),e.unshift(Vy),e.unshift(Fy);let r=e.map(o=>{let s=o[of];return{key:o.key,type:s.type,critical:s.critical,needsLicense:s.needsLicense}});kl().describeControllers({featureCellKey:this.cellKey,controllers:r});let i=new Zy(t.cell.key);this.#r=i.initializeControllers(e,this.#n,t.behaviorConfigs),this.#C()}#T(t){return this.vaultMonitor.startConductorVote(this.cellKey,ht,t.controllerCtx),this.decisionEngine.evaluateAttempt(t.controllerCtx)?.pipe(Xe(e=>{this.vaultMonitor.endConductorVote(this.cellKey,ht,t.controllerCtx,e)}),ee(e=>e.outcome))}#b(){ft.active&&this.#l.next()}#S(){!ft.active||this.#t.length>0||queueMicrotask(()=>{this.#l.next()})}#E(){return Wo(this.#l)}},on="vault-feature-cell";function oP(n,t=[]){if(typeof n.initialState=="object"&&n.initialState!==null&&"data"in n.initialState)throw new Error(`[vault] Invalid FeatureCelldescriptorModel.initial for feature "${n.key}". Expected raw data (e.g., [] or {}), but received an object with resource fields { loading, data, error }. Pass plain data to avoid double-wrapping.`);if(t.filter(r=>r.type===M.Encrypt).length>1)throw new Error("[vault] FeatureCell cannot register multiple encryption behaviors.")}var Qy=class{featureCellConfiguration;defaultBehaviors;behaviors;controllers;#t=!1;#r;#n=!1;#e=Jy();cell;cellKey;ctx;destroyed$=new C;reset$=new C;state$=new C;constructor(t,e,r,i){this.featureCellConfiguration=t,this.defaultBehaviors=e,this.behaviors=r,this.controllers=i,this.cellKey=this.featureCellConfiguration.key,this.ctx=this.#i()}#i(){let t=this.destroyed$.asObservable(),e=this.state$,r=this.reset$.asObservable(),i={isLoading:!1,value:void 0,error:null,hasValue:!1},o={destroyed$:t,featureCellKey:this.cellKey,reset$:r,state$:e,get state(){let s=this.lastSnapshot;return{isLoading:s.isLoading,value:s.value,error:s.error,hasValue:s.hasValue}}};return Object.defineProperty(o,"lastSnapshot",{value:i,writable:!1,configurable:!1,enumerable:!0}),o}reset(){this.#e.startReset(this.cellKey,on,this.ctx),Ne(`${on}: reset`),this.#a(),this.reset$.next(),this.#r?.reset(this.ctx),this.#e.endReset(this.cellKey,on,this.ctx)}destroy(){this.#e.startDestroy(this.cellKey,on,this.ctx),Ne(`${on}: destroy`),this.reset$.next(),this.reset$.complete(),this.#r?.destroy(this.ctx),this.destroyed$.next(),this.destroyed$.complete(),this.state$.complete(),this.#e.endDestroy(this.cellKey,on,this.ctx)}#a(){if(this.#t){let t=`[vault] FeatureCell "${this.featureCellConfiguration.key}" encountered a critical initialization failure and is now in a corrupted state. Further use is blocked.`;throw this.#e.runtimeError(this.cellKey,on,this.ctx,t),new Error(t)}if(!this.#n){let t=`[vault] FeatureCell "${this.featureCellConfiguration.key}" has not been initialized. You must call cell.initialize() before using state methods.`;throw this.#e.runtimeError(this.cellKey,on,this.ctx,t),new Error(t)}}#l(t){if(this.#n){let e=`[vault] FeatureCell "${this.featureCellConfiguration.key}" already initialized.`;throw this.#e.runtimeError(this.cellKey,on,this.ctx,e),new Error(e)}try{this.#e.registerCell(this.cellKey,this.featureCellConfiguration.insights),this.#e.startInitialized(this.cellKey,on,this.ctx),oP(this.featureCellConfiguration,this.behaviors),this.#n=!0,this.#r=new Xy({afterTapCallbacks:t.afterTapCallbacks,beforeTapCallbacks:t.beforeTapCallbacks,behaviors:this.behaviors,behaviorConfigs:t.behaviorConfigs,cell:this.cell,defaultBehaviors:this.defaultBehaviors,controllers:this.controllers,emitStateCallbacks:t.emitStateCallbacks,errorCallbacks:t.errorCallbacks,filterCallbacks:t.filterFunctions,initialState:t.hydrate||this.featureCellConfiguration.initialState,interceptors:t.interceptors,lastSnapshot:this.ctx.lastSnapshot,operators:t.operators,reducerCallbacks:t.reducerFunctions,state$:this.state$}),this.#r.initialize(this.ctx),ft.active&&(Object.defineProperty(this.cell,"vaultSettled",{enumerable:!1,configurable:!1,writable:!1,value:()=>this.#r.vaultSettled()}),YN(this.cellKey,this.#r.vaultSettled.bind(this.#r))),this.#e.endInitialized(this.cellKey,on,this.ctx)}catch(e){throw this.#t=!0,this.#e.runtimeError(this.cellKey,on,this.ctx,e),e}}#s(t){throw this.#t=!0,this.#e.runtimeError(this.cellKey,on,this.ctx,t),new Error(t)}setup(){let t=[],e=[],r=[],i=[],o,s=[],a=[],l=[],c=[],u=new Map,d={behaviorConfigs:u,afterTaps:f=>(this.#n&&this.#s('Cannot call "afterTaps" after initialize(). Configuration must be done before initialization.'),Array.isArray(f)&&t.push(...f),d),beforeTaps:f=>(this.#n&&this.#s('Cannot call "beforeTaps" after initialize(). Configuration must be done before initialization.'),Array.isArray(f)&&e.push(...f),d),emitStates:f=>(this.#n&&this.#s('Cannot call "emitStates" after initialize(). Configuration must be done before initialization.'),Array.isArray(f)&&c.push(...f),d),errors:f=>(this.#n&&this.#s('Cannot call "errors" after initialize(). Configuration must be done before initialization.'),Array.isArray(f)&&r.push(...f),d),filters:f=>(this.#n&&this.#s('Cannot call "filters" after initialize(). Configuration must be done before initialization.'),Array.isArray(f)&&i.push(...f),d),hydrate:f=>(this.#n&&this.#s('Cannot call "hydrate" after initialize(). Configuration must be done before initialization.'),o=f,d),initialize:()=>{this.#l({afterTapCallbacks:t,beforeTapCallbacks:e,behaviorConfigs:u,emitStateCallbacks:c,errorCallbacks:r,filterFunctions:i,hydrate:o,interceptors:s,operators:a,reducerFunctions:l})},interceptors:f=>(this.#n&&this.#s('Cannot call "interceptors" after initialize(). Configuration must be done before initialization.'),Array.isArray(f)&&s.push(...f),d),operators:f=>(this.#n&&this.#s('Cannot call "operators" after initialize(). Configuration must be done before initialization.'),Array.isArray(f)&&a.push(...f),d),reducers:f=>(this.#n&&this.#s('Cannot call "reducers" after initialize(). Configuration must be done before initialization.'),Array.isArray(f)&&l.push(...f),d)};return d}mergeState(t,e){return this.#a(),this.#r.conduct(this.ctx,t,En.Merge,e)}replaceState(t,e){return this.#a(),this.#r.conduct(this.ctx,t,En.Replace,e)}},gf=class extends Qy{constructor(t,e,r,i){super(t,e,r,i)}build(){let t=this.setup(),e=this.ctx,r={afterTaps:(...i)=>(t.afterTaps(...i),r),beforeTaps:(...i)=>(t.beforeTaps(...i),r),destroy:this.destroy.bind(this),destroyed$:this.destroyed$.asObservable(),errors:(...i)=>(t.errors(...i),r),filters:(...i)=>(t.filters(...i),r),hydrate:(...i)=>(t.hydrate(...i),r),initialize:t.initialize,interceptors:(...i)=>(t.interceptors(...i),r),key:this.cellKey,mergeState:this.mergeState.bind(this),operators:(...i)=>(t.operators(...i),r),reducers:(...i)=>(t.reducers(...i),r),emitStates:(...i)=>(t.emitStates(...i),r),replaceState:this.replaceState.bind(this),reset$:this.reset$.asObservable(),reset:this.reset.bind(this),state$:this.state$.asObservable(),get state(){return{isLoading:e.lastSnapshot.isLoading,value:e.lastSnapshot.value,error:e.lastSnapshot.error,hasValue:e.lastSnapshot.hasValue}}};return this.cell=r,this.behaviors.forEach(i=>{i?.installFluentApi?.(this.cell,t.behaviorConfigs)}),this.controllers.forEach(i=>{i?.installFluentApi?.(this.cell,t.behaviorConfigs)}),Object.defineProperty(r,"ctx",{value:this.ctx,enumerable:!1,writable:!1}),Object.defineProperty(r,"key",{value:this.featureCellConfiguration.key,enumerable:!1,writable:!1}),r}},Eo=new Map,fT=new Map;function sP(n,t){if(t){if(Eo.has(n)){if(!ft.active){let r=Eo.get(n);throw new Error(`[vault] Duplicate FeatureCell key detected: "${n}". Each FeatureCell must have a unique key. Existing token: "${r?.key}"`)}return Eo.get(n)}let e={key:n};return Eo.set(n,e),e}if(!Eo.has(n))throw new Error(`[vault] FeatureCell token not found for key "${n}". You must call provideFeatureCell() before retrieving this FeatureCell.`);if(fT.has(n)){if(!ft.active)throw new Error(`[vault] FeatureCell "${n}" can only be owned by a single consumer.`);return Eo.get(n)}return fT.set(n,!0),Eo.get(n)}function _T(n){return sP(n,!0)}var Ol={FEATURE_CELL_KEY:"vault:feature-cell-key",FEATURE_CELL_STATE:"vault:feature-cell-state"};function nv(n){return function(t){t[Ol.FEATURE_CELL_KEY]=n,t[Ol.FEATURE_CELL_STATE]=null}}var Do=new Map,CT=new Map;function ET(n,t){let e=Do.get(n);if(t){if(Do.has(n)){if(!gr.active)throw new Error(`[vault] Duplicate FeatureCell key detected: "${n}". Each FeatureCell must have a unique key. Existing token: "${n}"`);return Do.get(n)}return e=new b(`FEATURE_CELL:${n}`),Do.set(n,e),e}else{if(!Do.has(n))throw new Error(`[vault] FeatureCell token not found for key "${n}". You must call provideFeatureCell() before retrieving this FeatureCell.`);if(CT.has(n)){if(!gr.active)throw new Error(`[vault] FeatureCell "${n}" can only be injected into a single decorated @FeatureCell service.`);return Do.get(n)}return CT.set(n,!0),Do.get(n)}}function DT(n){return ET(n,!0)}function wT(n){return ET(n,!1)}function rv(n){let t=n;if(!t)throw new Error("injectVault() must be called inside a @FeatureCell()-decorated service and must be given the class reference.");let e=t[Ol.FEATURE_CELL_KEY];if(!e)throw new Error("injectVault() must be called inside a @FeatureCell()-decorated service.");let r=wT(e);return h(r)}var aP="@sdux-vault/core",lP="0.9.0";yo(aP,lP);var iv="external";var Yn=class extends tv{constructor(e,r){super(r);this.behaviorCtx=r;this.key=e}type=Yn.type;critical=Yn.critical;key;commitState(e,r,i){_(`${this.key} commitState called with: ${fe(r)}`);try{if(!!r&&Object.keys(r).length>0){let a=Zd(r);Object.assign(e.lastSnapshot,a),e.lastSnapshot.hasValue=e.lastSnapshot.value!==void 0&&e.lastSnapshot.value!==null}let s={snapshot:Zd(e.lastSnapshot),type:i};e.options&&(s.options=e.options),e.state$.next(s)}catch(o){vo(`${this.key} an error occurred updating the state`,o)}}preparePipelineIncoming(e){let r=e.incoming,i={};return As(r)||wl(r)&&Rs(r.value)?(this.commitState(e,null,kt.IncomingPipeline),qn):wl(r)&&Ei(r.value)?(As(r.loading)||(i.isLoading=r.loading),Xd(r.error)&&(i.error=Rs(r.error)?null:dt(r.error,iv)),this.commitState(e,i,kt.IncomingPipeline),_n):(ks(r)?i.isLoading=!0:wl(r)&&(As(r?.loading)||(i.isLoading=r.loading),Xd(r?.error)&&(i.error=Rs(r.error)?null:dt(r.error,iv))),Object.keys(i).length>0&&this.commitState(e,i,kt.IncomingPipeline),r)}finalizePipelineState(e,r){if(_(`${this.key} - finalizeVaultState`),ks(r.incoming)&&this.commitState(r,{isLoading:!1},kt.FinalizePipeline),uy(e)){this.commitState(r,null,kt.FinalizePipeline);return}if(Rs(e)||dy(e)){this.commitState(r,{value:void 0},kt.FinalizePipeline);return}!As(e)&&!bT(e)&&this.commitState(r,{value:e},kt.FinalizePipeline)}finalizePipelineVaultStop(e){_(`${this.key} - finalizePipelineVaultStop`),this.commitState(e,null,kt.FinalizePipeline)}finalizePipelineError(e,r){_(`${this.key} - finalizePipelineError`),this.commitState(r,{error:e,value:r.lastSnapshot.value,isLoading:!1},kt.PipelineError)}finalizeControllerAbort(e){_(`${this.key} - finalizeAbort`),this.commitState(e,{isLoading:!1},kt.AbortController)}finalizeControllerDeny(e){_(`${this.key} - finalizeDeny`),this.commitState(e,{isLoading:!1},kt.DenyController)}destroy(e){F(`${this.key} - destroy`),this.commitState(e,{isLoading:!1,value:void 0,error:null},kt.PipelineDestroy)}reset(e){F(`${this.key} - reset`),this.commitState(e,{isLoading:!1,value:void 0,error:null},kt.PipelineReset)}};D(Yn,"type"),D(Yn,"critical"),Yn=oe([ce({type:K.CoreState,key:ue("Core","State"),critical:!0})],Yn);var Zn=class extends El{critical=Zn.critical;constructor(t,e){super(t,e)}async callbackError(t,e,r){if(typeof r!="function")F(`${this.key} handleError skipped - "${r}" is not a function.`);else try{await r(t,e)}catch(i){F(`${this.key} oldschoolCallback threw: ${i}`)}}};D(Zn,"type"),D(Zn,"key"),D(Zn,"critical"),Zn=oe([ce({type:K.CoreErrorCallback,key:ue("Core","ErrorCallback"),critical:!0})],Zn);var zr=class{constructor(t,e){this.behaviorCtx=e;this.key=t}critical=!0;key;type=K.CoreError;handleError(t,e){return dt(t,e)}destroy(){F(`${this.key} - destroy "noop"`)}reset(){F(`${this.key} - reset "noop"`)}};D(zr,"type"),D(zr,"key"),D(zr,"critical"),zr=oe([ce({type:K.CoreError,key:ue("Core","Error"),critical:!0})],zr);var wn,TT,ST,IT,yf,Wr=class{constructor(t,e){this.behaviorCtx=e;No(this,wn);D(this,"type",K.Filter);D(this,"critical",!0);D(this,"key");this.key=t}applyFilter(t,e){if(_(`${this.key} applyFilter called with "${fe(t)}".`),t===void 0){_(`${this.key} applyFilter skipped - not a valid plain state. The current type is ${typeof t}. Undefined returned.`);return}if(typeof e!="function")return _(`${this.key} applyFilter skipped. The filter type is ${typeof e}. "${fe(t)}" returned.`),t;let r;try{r=e(t)}catch(i){throw vo(`${this.key} filter execution failed`,i.message),i}return r===void 0?(_(`${this.key} Filter returned undefined. state rejected.`),_n):(Er(this,wn,TT).call(this,t,r)||Er(this,wn,ST).call(this,t,r)||(Er(this,wn,IT).call(this,t,r),_(`${this.key} applyFilter returned with "${fe(r)}".`)),r)}destroy(){F(`${this.key} - destroy "noop"`)}reset(){F(`${this.key} - reset "noop"`)}};wn=new WeakSet,TT=function(t,e){if(Array.isArray(t)){if(!Array.isArray(e))throw Er(this,wn,yf).call(this,t,e),new Error("[vault] Filter returned non-array for array input.");return!0}return!1},ST=function(t,e){if(t!==null&&typeof t=="object"){if(typeof e!="object"||e===null||Array.isArray(e))throw Er(this,wn,yf).call(this,t,e),new Error("[vault] Filter returned invalid object for object input.");return!0}return!1},IT=function(t,e){if(typeof e!=typeof t)throw Er(this,wn,yf).call(this,t,e),new Error(`[vault] Filter returned a value of incorrect type. Expected "${typeof t}", got "${typeof e}".`)},yf=function(t,e){_(`${this.key} The types not aligned. Current type: "${typeof t}". Next type: ${typeof e}. "${fe(e)}" returned.`)},D(Wr,"type"),D(Wr,"key"),D(Wr,"critical"),Wr=oe([ce({type:K.Filter,key:ue("Core","Filter"),critical:!0})],Wr);var Tn=class{constructor(t,e){this.behaviorCtx=e;this.key=t}type=Tn.type;key;critical=Tn.critical;computeMerge(t,e,r){let i=t,o=e,s=r?.clearUndefined??!1;return _(`${this.key} merge called (clear: ${s})`),o===void 0&&!s?(_(`${this.key} computeMerge skipped. The next value "${o}" and clear is "${s}`),i):o===void 0&&s?(_(`${this.key} computeMerge skipped. The next value "${o}" and clear is "${s}`),qn):Array.isArray(i)&&Array.isArray(o)?(_(`${this.key} merging array. Return clone of next`),[...o]):(_(`${this.key} non-array branch. Return next`),o)}destroy(){F(`${this.key} - destroy "noop"`)}reset(){F(`${this.key} - reset "noop"`)}};D(Tn,"type"),D(Tn,"key"),D(Tn,"critical",!0),Tn=oe([ce({type:K.Merge,key:ue("Core","ArrayMerge"),critical:!0})],Tn);function MT(n){n.fromObservable=function(t){return t}}var Pt=class{constructor(t,e){this.behaviorCtx=e;this.key=t}type=Pt.type;key;critical=Pt.critical;resolveType=Pt.resolveType;extendCellAPI(t){return{fromObservable:e=>new N(r=>{_(`${this.key} fromObservable called.`);let i=t.destroyed$??Ce,o=t.reset$??Ce,s=e.pipe(J(o),J(i),gt(1)).subscribe({next:a=>{_(`${this.key} fromObservable emitted value "${fe(a)}".`),r.next({loading:!1,value:a,error:null})},error:a=>{let l=dt(a,t.featureCellKey);r.error(l),_(`${this.key} fromObservable emitted error "${l.message}".`)},complete:()=>{r.complete(),_(`${this.key} fromObservable completed.`)}});return()=>{s.unsubscribe(),_(`${this.key} fromObservable subscription unsubscribed.`)}})}}destroy(){F(`${this.key} - destroy "noop"`)}reset(){F(`${this.key} - reset "noop"`)}};D(Pt,"extension",MT),D(Pt,"type"),D(Pt,"key"),D(Pt,"resolveType"),D(Pt,"critical"),Pt=oe([ce({type:K.FromObservable,key:ue("Core","FromObservable"),critical:!1,resolveType:nn.Observable})],Pt);function xT(n){n.fromDeferred=function(t){throw new Error("[vault] fromDeferred() behavior not installed")},n.fromPromise=function(t){throw new Error("[vault] fromPromise() behavior not installed")}}var Lt=class{constructor(t,e){this.behaviorCtx=e;this.key=t}type=Lt.type;key;critical=Lt.critical;resolveType=Lt.resolveType;extendCellAPI(t){let e=r=>new Promise((i,o)=>{if(_(`${this.key} fromPromise called.`),Ei(r)){i({loading:!1,value:void 0,error:null});return}if(!Dl(r)){let a=r;i({loading:a?.loading??!1,value:void 0,error:a?.error??null});return}let s;try{s=r.value?.()}catch(a){let l=dt(a,t.featureCellKey);o(l);return}Promise.resolve(s).then(a=>{_(`${this.key} fromPromise resolved value: ${fe(a)}`),i({loading:r.loading??!1,value:a,error:r.error??null})}).catch(a=>{let l=dt(a,t.featureCellKey);o(l)})});return{fromPromise:r=>e(r),fromDeferred:r=>e(r)}}destroy(){F(`${this.key} - destroy "noop"`)}reset(){F(`${this.key} - reset "noop"`)}};D(Lt,"extension",xT),D(Lt,"type"),D(Lt,"key"),D(Lt,"critical"),D(Lt,"resolveType"),Lt=oe([ce({type:K.FromPromise,key:ue("Core","FromPromise"),critical:!1,resolveType:nn.Promise})],Lt);var Gr=class{constructor(t,e){this.behaviorCtx=e;this.key=t}critical=!0;type=K.Reduce;key;applyReducer(t,e){return _(`${this.key} applyReducer called with "${fe(t)}".`),typeof e!="function"?(_(`${this.key} applyReducer skipped - reducer is not a function.`),t):e(t)}destroy(){F(`${this.key} - destroy "noop"`)}reset(){F(`${this.key} - reset "noop"`)}};D(Gr,"type"),D(Gr,"key"),D(Gr,"critical"),Gr=oe([ce({type:K.Reduce,key:ue("Core","Reducer"),critical:!0})],Gr);var Sn=class{constructor(t,e){this.behaviorCtx=e;this.key=t}type=K.Resolve;key;critical=!1;resolveType=Sn.resolveType;async computeResolve(t){let e=t.incoming;if(_(`${this.key} computeResolve called with incoming: ${fe(e)}`),!Zt(e)){_(`${this.key} computeResolve skipped \u2014 incoming is not an Observable.`);return}_(`${this.key} computeResolve detected Observable input.`);let r=e,i=t.reset$??Ce,o=t.destroyed$??Ce;try{let s=await Wo(r.pipe(J(i),J(o),gt(1)));return _(`${this.key} computeResolve resolved value: ${fe(s)}`),s}catch(s){let a=dt(s,t.featureCellKey);throw _(`${this.key} computeResolve caught error: ${a.message}`),a}}destroy(){F(`${this.key} - destroy "noop"`)}reset(){F(`${this.key} - reset "noop"`)}};D(Sn,"type"),D(Sn,"key"),D(Sn,"critical"),D(Sn,"resolveType"),Sn=oe([ce({type:K.Resolve,key:ue("Core","Observable"),critical:!1,resolveType:nn.Observable})],Sn);var qt=class{constructor(t,e){this.behaviorCtx=e;this.key=t}type=qt.type;key;critical=qt.critical;resolveType=qt.resolveType;async computeResolve(t){let e=t.incoming;if(_(`${this.key} computeResolve promise called with incoming: ${fe(e)}`),!(Dl(e)||Qd(e))||Ei(e)){_(`${this.key} computeResolve skipped \u2014 incoming is not a deferred factory.`);return}_(`${this.key} computeResolve detected Promise input.`);try{let r;return Qd(e)?r=await e?.():r=await e.value?.(),_(`${this.key} computeResolve resolved value: ${fe(r)}`),r}catch(r){let i=dt(r,t.featureCellKey);throw _(`${this.key} computeResolve caught error: ${i.message}`),i}}destroy(){F(`${this.key} - destroy "noop"`)}reset(){F(`${this.key} - reset "noop"`)}};D(qt,"type"),D(qt,"key"),D(qt,"critical"),D(qt,"resolveType"),qt=oe([ce({type:K.Resolve,key:ue("Core","Promise"),critical:!1,resolveType:nn.Promise})],qt);var Kt=class{constructor(t,e){this.behaviorCtx=e;this.key=t}type=Kt.type;critical=Kt.critical;key;resolveType=Kt.resolveType;async computeResolve(t){_(`${this.key} computeResolve called with "${fe(t.incoming)}".`);let e=t.incoming;if(!e||ks(e)){_(`${this.key} computeResolve skipped - not a valid plain state.`);return}let{value:r}=e;if(r===void 0){_(`${this.key} value is undefined and resolution skipped.`);return}return r===null?(_(`${this.key} value is null and clear state returned.`),qn):Array.isArray(r)?(_(`${this.key} array value detected and cloned.`),[...r]):typeof r=="object"?(_(`${this.key} object value detected and cloned.`),g({},r)):(_(`${this.key} primitive value detected and returned.`),r)}destroy(){F(`${this.key} - destroy "noop"`)}reset(){F(`${this.key} - reset "noop"`)}};D(Kt,"type"),D(Kt,"key"),D(Kt,"critical"),D(Kt,"resolveType"),Kt=oe([ce({type:K.Resolve,key:ue("Core","Value"),critical:!0,resolveType:nn.Value})],Kt);function RT(n){n.fromStream=function(t,e){}}var Ft=class{constructor(t,e){this.behaviorCtx=e;this.key=t}type=Ft.type;key;critical=Ft.critical;resolveType=Ft.resolveType;extendCellAPI(t){return{fromStream:(e,r)=>{let{autoResetError:i=!0}=r??{};_(`${this.key} fromStream called.`),_(`${this.key} fromStream options resolved (autoResetError=${i}).`),t.vaultMonitor.ingressSubscribed(t.featureCellKey,this.key,t,"fromStream"),_(`${this.key} fromStream subscription started.`),e.pipe(J(t.destroyed$)).subscribe({next:o=>{_(`${this.key} subscription.next called.`),_(`${this.key} incoming value received: "${fe(o)}".`),i&&_(`${this.key} autoResetError enabled \u2192 clearing error.`);let s=i?{value:o,error:null}:{value:o};t.mergeState(s),_(`${this.key} mergeState invoked from stream.next.`)},error:o=>{_(`${this.key} subscription.error called.`);let s=dt(o,this.key);_(`${this.key} stream error converted to VaultError: "${s.message}".`),t.mergeState({error:s}),_(`${this.key} mergeState invoked from stream.error.`)},complete:()=>{_(`${this.key} subscription.complete called.`),t.vaultMonitor.ingressCompleted(t.featureCellKey,this.key,t,"fromStream"),_(`${this.key} fromStream completed.`)}})}}}destroy(){F(`${this.key} - destroy "noop"`)}reset(){F(`${this.key} - reset "noop"`)}};D(Ft,"extension",RT),D(Ft,"type"),D(Ft,"key"),D(Ft,"critical"),D(Ft,"resolveType"),Ft=oe([ce({type:K.FromStream,key:ue("Core","FromStream"),critical:!1,resolveType:nn.Observable})],Ft);var qr=class{constructor(t,e){this.behaviorCtx=e;this.key=t}type=K.CoreEmitState;critical=!0;key;emitState(t,e){if(_(`${this.key} emitState called with "${fe(t)}".`),typeof e!="function")return _(`${this.key} emitState skipped. The emitState type is ${typeof e}. "${fe(t)}" returned.`),_n;try{e(t)}catch(r){return vo(`${this.key} emitState execution failed`,fe(r)),_n}}destroy(){F(`${this.key} - destroy "noop"`)}reset(){F(`${this.key} - reset "noop"`)}};D(qr,"type"),D(qr,"key"),D(qr,"critical"),qr=oe([ce({type:K.CoreEmitState,key:ue("Core","EmitState"),critical:!0})],qr);var Ls=class{constructor(t,e){this.behaviorCtx=e;this.key=t}static type;static key;static critical=!0;critical=!0;key;type;executeTap(t,e){_(`${this.key} executeTap called with "${fe(t)}".`),typeof e!="function"&&_(`${this.key} executeTap skipped - tap is not a function. Type is "${typeof e}".`),e(t)}destroy(){F(`${this.key} - destroy "noop"`)}reset(){F(`${this.key} - reset "noop"`)}};var Fs=class extends Ls{type=K.CoreAfterTap;applyAfterTap(t,e){this.executeTap(t,e)}};Fs=oe([ce({type:K.CoreAfterTap,key:ue("Core","AfterTap"),critical:!0})],Fs);var Bs=class extends Ls{type=K.CoreBeforeTap;applyBeforeTap(t,e){this.executeTap(t,e)}};Bs=oe([ce({type:K.CoreBeforeTap,key:ue("Core","BeforeTap"),critical:!0})],Bs);function ov(n,t=[],e=[]){return _T(n.key),mT({key:n.key}),new gf(n,cP(),t,e).build()}function cP(){return[Fs,Bs,zr,Wr,Pt,Lt,Ft,Sn,qt,Gr,Kt,Yn,Zn,Tn,qr]}var vf=class{constructor(t){this.core=t;this.#t.add(this.core.state$.subscribe(e=>{this.#e.set(e?.snapshot?.isLoading??!1),this.#n.set(e?.snapshot?.error??null),this.#r.set(e?.snapshot?.value??void 0)})),this.#a.onDestroy(()=>this.destroy())}#t=new Z;#r=Re(void 0);#n=Re(null);#e=Re(!1);#i=Ct(()=>{let t=this.#r();return t!=null});#a=h(Ke);build(){let t=this.core;return Object.defineProperty(t,"state",{configurable:!0,enumerable:!0,get:()=>({isLoading:this.#e.asReadonly(),value:this.#r.asReadonly(),error:this.#n.asReadonly(),hasValue:this.#i})}),t}destroy(){this.core.destroy(),this.#t.unsubscribe()}};function sv(n,t,e=[],r=[]){return[{provide:DT(t.key),useFactory:()=>{let o=ov(t,e,r);return new vf(o).build()}},n]}function av(n={}){return qu(()=>{pT(n)})}var uP="@sdux-vault/angular",dP="0.11.0";yo(uP,dP);var Nl=class{_attachedHost=null;attach(t){return this._attachedHost=t,t.attach(this)}detach(){let t=this._attachedHost;t!=null&&(this._attachedHost=null,t.detach())}get isAttached(){return this._attachedHost!=null}setAttachedHost(t){this._attachedHost=t}},Pl=class extends Nl{component;viewContainerRef;injector;projectableNodes;bindings;constructor(t,e,r,i,o){super(),this.component=t,this.viewContainerRef=e,this.injector=r,this.projectableNodes=i,this.bindings=o||null}},wo=class extends Nl{templateRef;viewContainerRef;context;injector;constructor(t,e,r,i){super(),this.templateRef=t,this.viewContainerRef=e,this.context=r,this.injector=i}get origin(){return this.templateRef.elementRef}attach(t,e=this.context){return this.context=e,super.attach(t)}detach(){return this.context=void 0,super.detach()}},lv=class extends Nl{element;constructor(t){super(),this.element=t instanceof le?t.nativeElement:t}},bf=class{_attachedPortal=null;_disposeFn=null;_isDisposed=!1;hasAttached(){return!!this._attachedPortal}attach(t){if(t instanceof Pl)return this._attachedPortal=t,this.attachComponentPortal(t);if(t instanceof wo)return this._attachedPortal=t,this.attachTemplatePortal(t);if(this.attachDomPortal&&t instanceof lv)return this._attachedPortal=t,this.attachDomPortal(t)}attachDomPortal=null;detach(){this._attachedPortal&&(this._attachedPortal.setAttachedHost(null),this._attachedPortal=null),this._invokeDisposeFn()}dispose(){this.hasAttached()&&this.detach(),this._invokeDisposeFn(),this._isDisposed=!0}setDisposeFn(t){this._disposeFn=t}_invokeDisposeFn(){this._disposeFn&&(this._disposeFn(),this._disposeFn=null)}},_f=class extends bf{outletElement;_appRef;_defaultInjector;constructor(t,e,r){super(),this.outletElement=t,this._appRef=e,this._defaultInjector=r}attachComponentPortal(t){let e;if(t.viewContainerRef){let r=t.injector||t.viewContainerRef.injector,i=r.get(lr,null,{optional:!0})||void 0;e=t.viewContainerRef.createComponent(t.component,{index:t.viewContainerRef.length,injector:r,ngModuleRef:i,projectableNodes:t.projectableNodes||void 0,bindings:t.bindings||void 0}),this.setDisposeFn(()=>e.destroy())}else{let r=this._appRef,i=t.injector||this._defaultInjector||re.NULL,o=i.get(Se,r.injector);e=cd(t.component,{elementInjector:i,environmentInjector:o,projectableNodes:t.projectableNodes||void 0,bindings:t.bindings||void 0}),r.attachView(e.hostView),this.setDisposeFn(()=>{r.viewCount>0&&r.detachView(e.hostView),e.destroy()})}return this.outletElement.appendChild(this._getComponentRootNode(e)),this._attachedPortal=t,e}attachTemplatePortal(t){let e=t.viewContainerRef,r=e.createEmbeddedView(t.templateRef,t.context,{injector:t.injector});return r.rootNodes.forEach(i=>this.outletElement.appendChild(i)),r.detectChanges(),this.setDisposeFn(()=>{let i=e.indexOf(r);i!==-1&&e.remove(i)}),this._attachedPortal=t,r}attachDomPortal=t=>{let e=t.element;e.parentNode;let r=this.outletElement.ownerDocument.createComment("dom-portal");e.parentNode.insertBefore(r,e),this.outletElement.appendChild(e),this._attachedPortal=t,super.setDisposeFn(()=>{r.parentNode&&r.parentNode.replaceChild(e,r)})};dispose(){super.dispose(),this.outletElement.remove()}_getComponentRootNode(t){return t.hostView.rootNodes[0]}},AT=(()=>{class n extends wo{constructor(){let e=h(At),r=h(lt);super(e,r)}static \u0275fac=function(r){return new(r||n)};static \u0275dir=ye({type:n,selectors:[["","cdkPortal",""]],exportAs:["cdkPortal"],features:[Jt]})}return n})(),cv=(()=>{class n extends bf{_moduleRef=h(lr,{optional:!0});_document=h(Q);_viewContainerRef=h(lt);_isInitialized=!1;_attachedRef=null;constructor(){super()}get portal(){return this._attachedPortal}set portal(e){this.hasAttached()&&!e&&!this._isInitialized||(this.hasAttached()&&super.detach(),e&&super.attach(e),this._attachedPortal=e||null)}attached=new ne;get attachedRef(){return this._attachedRef}ngOnInit(){this._isInitialized=!0}ngOnDestroy(){super.dispose(),this._attachedRef=this._attachedPortal=null}attachComponentPortal(e){e.setAttachedHost(this);let r=e.viewContainerRef!=null?e.viewContainerRef:this._viewContainerRef,i=r.createComponent(e.component,{index:r.length,injector:e.injector||r.injector,projectableNodes:e.projectableNodes||void 0,ngModuleRef:this._moduleRef||void 0,bindings:e.bindings||void 0});return r!==this._viewContainerRef&&this._getRootNode().appendChild(i.hostView.rootNodes[0]),super.setDisposeFn(()=>i.destroy()),this._attachedPortal=e,this._attachedRef=i,this.attached.emit(i),i}attachTemplatePortal(e){e.setAttachedHost(this);let r=this._viewContainerRef.createEmbeddedView(e.templateRef,e.context,{injector:e.injector});return super.setDisposeFn(()=>this._viewContainerRef.clear()),this._attachedPortal=e,this._attachedRef=r,this.attached.emit(r),r}attachDomPortal=e=>{let r=e.element;r.parentNode;let i=this._document.createComment("dom-portal");e.setAttachedHost(this),r.parentNode.insertBefore(i,r),this._getRootNode().appendChild(r),this._attachedPortal=e,super.setDisposeFn(()=>{i.parentNode&&i.parentNode.replaceChild(r,i)})};_getRootNode(){let e=this._viewContainerRef.element.nativeElement;return e.nodeType===e.ELEMENT_NODE?e:e.parentNode}static \u0275fac=function(r){return new(r||n)};static \u0275dir=ye({type:n,selectors:[["","cdkPortalOutlet",""]],inputs:{portal:[0,"cdkPortalOutlet","portal"]},outputs:{attached:"attached"},exportAs:["cdkPortalOutlet"],features:[Jt]})}return n})(),kT=(()=>{class n{static \u0275fac=function(r){return new(r||n)};static \u0275mod=Ve({type:n});static \u0275inj=Ae({})}return n})();var Cf=new WeakMap,br=(()=>{class n{_appRef;_injector=h(re);_environmentInjector=h(Se);load(e){let r=this._appRef=this._appRef||this._injector.get(mn),i=Cf.get(r);i||(i={loaders:new Set,refs:[]},Cf.set(r,i),r.onDestroy(()=>{Cf.get(r)?.refs.forEach(o=>o.destroy()),Cf.delete(r)})),i.loaders.has(e)||(i.loaders.add(e),i.refs.push(cd(e,{environmentInjector:this._environmentInjector})))}static \u0275fac=function(r){return new(r||n)};static \u0275prov=y({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})();var OT=(()=>{class n{static \u0275fac=function(r){return new(r||n)};static \u0275cmp=ge({type:n,selectors:[["ng-component"]],exportAs:["cdkVisuallyHidden"],decls:0,vars:0,template:function(r,i){},styles:[`.cdk-visually-hidden {
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
`],encapsulation:2,changeDetection:0})}return n})();var NT=(()=>{class n{static \u0275fac=function(r){return new(r||n)};static \u0275cmp=ge({type:n,selectors:[["structural-styles"]],decls:0,vars:0,template:function(r,i){},styles:[`.mat-focus-indicator {
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
`],encapsulation:2,changeDetection:0})}return n})();function Ll(n){return n.buttons===0||n.detail===0}function Fl(n){let t=n.touches&&n.touches[0]||n.changedTouches&&n.changedTouches[0];return!!t&&t.identifier===-1&&(t.radiusX==null||t.radiusX===1)&&(t.radiusY==null||t.radiusY===1)}var uv;function PT(){if(uv==null){let n=typeof document<"u"?document.head:null;uv=!!(n&&(n.createShadowRoot||n.attachShadow))}return uv}function dv(n){if(PT()){let t=n.getRootNode?n.getRootNode():null;if(typeof ShadowRoot<"u"&&ShadowRoot&&t instanceof ShadowRoot)return t}return null}function In(n){return n.composedPath?n.composedPath()[0]:n.target}var fv;try{fv=typeof Intl<"u"&&Intl.v8BreakIterator}catch{fv=!1}var Me=(()=>{class n{_platformId=h(oo);isBrowser=this._platformId?$D(this._platformId):typeof document=="object"&&!!document;EDGE=this.isBrowser&&/(edge)/i.test(navigator.userAgent);TRIDENT=this.isBrowser&&/(msie|trident)/i.test(navigator.userAgent);BLINK=this.isBrowser&&!!(window.chrome||fv)&&typeof CSS<"u"&&!this.EDGE&&!this.TRIDENT;WEBKIT=this.isBrowser&&/AppleWebKit/i.test(navigator.userAgent)&&!this.BLINK&&!this.EDGE&&!this.TRIDENT;IOS=this.isBrowser&&/iPad|iPhone|iPod/.test(navigator.userAgent)&&!("MSStream"in window);FIREFOX=this.isBrowser&&/(firefox|minefield)/i.test(navigator.userAgent);ANDROID=this.isBrowser&&/android/i.test(navigator.userAgent)&&!this.TRIDENT;SAFARI=this.isBrowser&&/safari/i.test(navigator.userAgent)&&this.WEBKIT;constructor(){}static \u0275fac=function(r){return new(r||n)};static \u0275prov=y({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})();var Bl;function LT(){if(Bl==null&&typeof window<"u")try{window.addEventListener("test",null,Object.defineProperty({},"passive",{get:()=>Bl=!0}))}finally{Bl=Bl||!1}return Bl}function js(n){return LT()?n:!!n.capture}function Xn(n,t=0){return FT(n)?Number(n):arguments.length===2?t:0}function FT(n){return!isNaN(parseFloat(n))&&!isNaN(Number(n))}function Mn(n){return n instanceof le?n.nativeElement:n}var BT=new b("cdk-input-modality-detector-options"),jT={ignoreKeys:[18,17,224,91,16]},VT=650,hv={passive:!0,capture:!0},UT=(()=>{class n{_platform=h(Me);_listenerCleanups;modalityDetected;modalityChanged;get mostRecentModality(){return this._modality.value}_mostRecentTarget=null;_modality=new Fe(null);_options;_lastTouchMs=0;_onKeydown=e=>{this._options?.ignoreKeys?.some(r=>r===e.keyCode)||(this._modality.next("keyboard"),this._mostRecentTarget=In(e))};_onMousedown=e=>{Date.now()-this._lastTouchMs<VT||(this._modality.next(Ll(e)?"keyboard":"mouse"),this._mostRecentTarget=In(e))};_onTouchstart=e=>{if(Fl(e)){this._modality.next("keyboard");return}this._lastTouchMs=Date.now(),this._modality.next("touch"),this._mostRecentTarget=In(e)};constructor(){let e=h(V),r=h(Q),i=h(BT,{optional:!0});if(this._options=g(g({},jT),i),this.modalityDetected=this._modality.pipe(Fi(1)),this.modalityChanged=this.modalityDetected.pipe(Go()),this._platform.isBrowser){let o=h(bt).createRenderer(null,null);this._listenerCleanups=e.runOutsideAngular(()=>[o.listen(r,"keydown",this._onKeydown,hv),o.listen(r,"mousedown",this._onMousedown,hv),o.listen(r,"touchstart",this._onTouchstart,hv)])}}ngOnDestroy(){this._modality.complete(),this._listenerCleanups?.forEach(e=>e())}static \u0275fac=function(r){return new(r||n)};static \u0275prov=y({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})(),jl=(function(n){return n[n.IMMEDIATE=0]="IMMEDIATE",n[n.EVENTUAL=1]="EVENTUAL",n})(jl||{}),$T=new b("cdk-focus-monitor-default-options"),Ef=js({passive:!0,capture:!0}),Vl=(()=>{class n{_ngZone=h(V);_platform=h(Me);_inputModalityDetector=h(UT);_origin=null;_lastFocusOrigin=null;_windowFocused=!1;_windowFocusTimeoutId;_originTimeoutId;_originFromTouchInteraction=!1;_elementInfo=new Map;_monitoredElementCount=0;_rootNodeFocusListenerCount=new Map;_detectionMode;_windowFocusListener=()=>{this._windowFocused=!0,this._windowFocusTimeoutId=setTimeout(()=>this._windowFocused=!1)};_document=h(Q);_stopInputModalityDetector=new C;constructor(){let e=h($T,{optional:!0});this._detectionMode=e?.detectionMode||jl.IMMEDIATE}_rootNodeFocusAndBlurListener=e=>{let r=In(e);for(let i=r;i;i=i.parentElement)e.type==="focus"?this._onFocus(e,i):this._onBlur(e,i)};monitor(e,r=!1){let i=Mn(e);if(!this._platform.isBrowser||i.nodeType!==1)return x();let o=dv(i)||this._document,s=this._elementInfo.get(i);if(s)return r&&(s.checkChildren=!0),s.subject;let a={checkChildren:r,subject:new C,rootNode:o};return this._elementInfo.set(i,a),this._registerGlobalListeners(a),a.subject}stopMonitoring(e){let r=Mn(e),i=this._elementInfo.get(r);i&&(i.subject.complete(),this._setClasses(r),this._elementInfo.delete(r),this._removeGlobalListeners(i))}focusVia(e,r,i){let o=Mn(e),s=this._document.activeElement;o===s?this._getClosestElementsInfo(o).forEach(([a,l])=>this._originChanged(a,r,l)):(this._setOrigin(r),typeof o.focus=="function"&&o.focus(i))}ngOnDestroy(){this._elementInfo.forEach((e,r)=>this.stopMonitoring(r))}_getWindow(){return this._document.defaultView||window}_getFocusOrigin(e){return this._origin?this._originFromTouchInteraction?this._shouldBeAttributedToTouch(e)?"touch":"program":this._origin:this._windowFocused&&this._lastFocusOrigin?this._lastFocusOrigin:e&&this._isLastInteractionFromInputLabel(e)?"mouse":"program"}_shouldBeAttributedToTouch(e){return this._detectionMode===jl.EVENTUAL||!!e?.contains(this._inputModalityDetector._mostRecentTarget)}_setClasses(e,r){e.classList.toggle("cdk-focused",!!r),e.classList.toggle("cdk-touch-focused",r==="touch"),e.classList.toggle("cdk-keyboard-focused",r==="keyboard"),e.classList.toggle("cdk-mouse-focused",r==="mouse"),e.classList.toggle("cdk-program-focused",r==="program")}_setOrigin(e,r=!1){this._ngZone.runOutsideAngular(()=>{if(this._origin=e,this._originFromTouchInteraction=e==="touch"&&r,this._detectionMode===jl.IMMEDIATE){clearTimeout(this._originTimeoutId);let i=this._originFromTouchInteraction?VT:1;this._originTimeoutId=setTimeout(()=>this._origin=null,i)}})}_onFocus(e,r){let i=this._elementInfo.get(r),o=In(e);!i||!i.checkChildren&&r!==o||this._originChanged(r,this._getFocusOrigin(o),i)}_onBlur(e,r){let i=this._elementInfo.get(r);!i||i.checkChildren&&e.relatedTarget instanceof Node&&r.contains(e.relatedTarget)||(this._setClasses(r),this._emitOrigin(i,null))}_emitOrigin(e,r){e.subject.observers.length&&this._ngZone.run(()=>e.subject.next(r))}_registerGlobalListeners(e){if(!this._platform.isBrowser)return;let r=e.rootNode,i=this._rootNodeFocusListenerCount.get(r)||0;i||this._ngZone.runOutsideAngular(()=>{r.addEventListener("focus",this._rootNodeFocusAndBlurListener,Ef),r.addEventListener("blur",this._rootNodeFocusAndBlurListener,Ef)}),this._rootNodeFocusListenerCount.set(r,i+1),++this._monitoredElementCount===1&&(this._ngZone.runOutsideAngular(()=>{this._getWindow().addEventListener("focus",this._windowFocusListener)}),this._inputModalityDetector.modalityDetected.pipe(J(this._stopInputModalityDetector)).subscribe(o=>{this._setOrigin(o,!0)}))}_removeGlobalListeners(e){let r=e.rootNode;if(this._rootNodeFocusListenerCount.has(r)){let i=this._rootNodeFocusListenerCount.get(r);i>1?this._rootNodeFocusListenerCount.set(r,i-1):(r.removeEventListener("focus",this._rootNodeFocusAndBlurListener,Ef),r.removeEventListener("blur",this._rootNodeFocusAndBlurListener,Ef),this._rootNodeFocusListenerCount.delete(r))}--this._monitoredElementCount||(this._getWindow().removeEventListener("focus",this._windowFocusListener),this._stopInputModalityDetector.next(),clearTimeout(this._windowFocusTimeoutId),clearTimeout(this._originTimeoutId))}_originChanged(e,r,i){this._setClasses(e,r),this._emitOrigin(i,r),this._lastFocusOrigin=r}_getClosestElementsInfo(e){let r=[];return this._elementInfo.forEach((i,o)=>{(o===e||i.checkChildren&&o.contains(e))&&r.push([o,i])}),r}_isLastInteractionFromInputLabel(e){let{_mostRecentTarget:r,mostRecentModality:i}=this._inputModalityDetector;if(i!=="mouse"||!r||r===e||e.nodeName!=="INPUT"&&e.nodeName!=="TEXTAREA"||e.disabled)return!1;let o=e.labels;if(o){for(let s=0;s<o.length;s++)if(o[s].contains(r))return!0}return!1}static \u0275fac=function(r){return new(r||n)};static \u0275prov=y({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})(),pv=(()=>{class n{_elementRef=h(le);_focusMonitor=h(Vl);_monitorSubscription;_focusOrigin=null;cdkFocusChange=new ne;constructor(){}get focusOrigin(){return this._focusOrigin}ngAfterViewInit(){let e=this._elementRef.nativeElement;this._monitorSubscription=this._focusMonitor.monitor(e,e.nodeType===1&&e.hasAttribute("cdkMonitorSubtreeFocus")).subscribe(r=>{this._focusOrigin=r,this.cdkFocusChange.emit(r)})}ngOnDestroy(){this._focusMonitor.stopMonitoring(this._elementRef),this._monitorSubscription?.unsubscribe()}static \u0275fac=function(r){return new(r||n)};static \u0275dir=ye({type:n,selectors:[["","cdkMonitorElementFocus",""],["","cdkMonitorSubtreeFocus",""]],outputs:{cdkFocusChange:"cdkFocusChange"},exportAs:["cdkMonitorFocus"]})}return n})();function Vs(n){return Array.isArray(n)?n:[n]}var HT=new Set,To,Us=(()=>{class n{_platform=h(Me);_nonce=h(us,{optional:!0});_matchMedia;constructor(){this._matchMedia=this._platform.isBrowser&&window.matchMedia?window.matchMedia.bind(window):hP}matchMedia(e){return(this._platform.WEBKIT||this._platform.BLINK)&&fP(e,this._nonce),this._matchMedia(e)}static \u0275fac=function(r){return new(r||n)};static \u0275prov=y({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})();function fP(n,t){if(!HT.has(n))try{To||(To=document.createElement("style"),t&&To.setAttribute("nonce",t),To.setAttribute("type","text/css"),document.head.appendChild(To)),To.sheet&&(To.sheet.insertRule(`@media ${n} {body{ }}`,0),HT.add(n))}catch(e){console.error(e)}}function hP(n){return{matches:n==="all"||n==="",media:n,addListener:()=>{},removeListener:()=>{}}}var mv=(()=>{class n{_mediaMatcher=h(Us);_zone=h(V);_queries=new Map;_destroySubject=new C;constructor(){}ngOnDestroy(){this._destroySubject.next(),this._destroySubject.complete()}isMatched(e){return zT(Vs(e)).some(i=>this._registerQuery(i).mql.matches)}observe(e){let i=zT(Vs(e)).map(s=>this._registerQuery(s).observable),o=oa(i);return o=ti(o.pipe(gt(1)),o.pipe(Fi(1),Tr(0))),o.pipe(ee(s=>{let a={matches:!1,breakpoints:{}};return s.forEach(({matches:l,query:c})=>{a.matches=a.matches||l,a.breakpoints[c]=l}),a}))}_registerQuery(e){if(this._queries.has(e))return this._queries.get(e);let r=this._mediaMatcher.matchMedia(e),o={observable:new N(s=>{let a=l=>this._zone.run(()=>s.next(l));return r.addListener(a),()=>{r.removeListener(a)}}).pipe(an(r),ee(({matches:s})=>({query:e,matches:s})),J(this._destroySubject)),mql:r};return this._queries.set(e,o),o}static \u0275fac=function(r){return new(r||n)};static \u0275prov=y({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})();function zT(n){return n.map(t=>t.split(",")).reduce((t,e)=>t.concat(e)).map(t=>t.trim())}function pP(n){if(n.type==="characterData"&&n.target instanceof Comment)return!0;if(n.type==="childList"){for(let t=0;t<n.addedNodes.length;t++)if(!(n.addedNodes[t]instanceof Comment))return!1;for(let t=0;t<n.removedNodes.length;t++)if(!(n.removedNodes[t]instanceof Comment))return!1;return!0}return!1}var WT=(()=>{class n{create(e){return typeof MutationObserver>"u"?null:new MutationObserver(e)}static \u0275fac=function(r){return new(r||n)};static \u0275prov=y({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})(),GT=(()=>{class n{_mutationObserverFactory=h(WT);_observedElements=new Map;_ngZone=h(V);constructor(){}ngOnDestroy(){this._observedElements.forEach((e,r)=>this._cleanupObserver(r))}observe(e){let r=Mn(e);return new N(i=>{let s=this._observeElement(r).pipe(ee(a=>a.filter(l=>!pP(l))),be(a=>!!a.length)).subscribe(a=>{this._ngZone.run(()=>{i.next(a)})});return()=>{s.unsubscribe(),this._unobserveElement(r)}})}_observeElement(e){return this._ngZone.runOutsideAngular(()=>{if(this._observedElements.has(e))this._observedElements.get(e).count++;else{let r=new C,i=this._mutationObserverFactory.create(o=>r.next(o));i&&i.observe(e,{characterData:!0,childList:!0,subtree:!0}),this._observedElements.set(e,{observer:i,stream:r,count:1})}return this._observedElements.get(e).stream})}_unobserveElement(e){this._observedElements.has(e)&&(this._observedElements.get(e).count--,this._observedElements.get(e).count||this._cleanupObserver(e))}_cleanupObserver(e){if(this._observedElements.has(e)){let{observer:r,stream:i}=this._observedElements.get(e);r&&r.disconnect(),i.complete(),this._observedElements.delete(e)}}static \u0275fac=function(r){return new(r||n)};static \u0275prov=y({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})(),qT=(()=>{class n{_contentObserver=h(GT);_elementRef=h(le);event=new ne;get disabled(){return this._disabled}set disabled(e){this._disabled=e,this._disabled?this._unsubscribe():this._subscribe()}_disabled=!1;get debounce(){return this._debounce}set debounce(e){this._debounce=Xn(e),this._subscribe()}_debounce;_currentSubscription=null;constructor(){}ngAfterContentInit(){!this._currentSubscription&&!this.disabled&&this._subscribe()}ngOnDestroy(){this._unsubscribe()}_subscribe(){this._unsubscribe();let e=this._contentObserver.observe(this._elementRef);this._currentSubscription=(this.debounce?e.pipe(Tr(this.debounce)):e).subscribe(this.event)}_unsubscribe(){this._currentSubscription?.unsubscribe()}static \u0275fac=function(r){return new(r||n)};static \u0275dir=ye({type:n,selectors:[["","cdkObserveContent",""]],inputs:{disabled:[2,"cdkObserveContentDisabled","disabled",tt],debounce:"debounce"},outputs:{event:"cdkObserveContent"},exportAs:["cdkObserveContent"]})}return n})(),KT=(()=>{class n{static \u0275fac=function(r){return new(r||n)};static \u0275mod=Ve({type:n});static \u0275inj=Ae({providers:[WT]})}return n})();var Si=(function(n){return n[n.NONE=0]="NONE",n[n.BLACK_ON_WHITE=1]="BLACK_ON_WHITE",n[n.WHITE_ON_BLACK=2]="WHITE_ON_BLACK",n})(Si||{}),YT="cdk-high-contrast-black-on-white",ZT="cdk-high-contrast-white-on-black",gv="cdk-high-contrast-active",XT=(()=>{class n{_platform=h(Me);_hasCheckedHighContrastMode=!1;_document=h(Q);_breakpointSubscription;constructor(){this._breakpointSubscription=h(mv).observe("(forced-colors: active)").subscribe(()=>{this._hasCheckedHighContrastMode&&(this._hasCheckedHighContrastMode=!1,this._applyBodyHighContrastModeCssClasses())})}getHighContrastMode(){if(!this._platform.isBrowser)return Si.NONE;let e=this._document.createElement("div");e.style.backgroundColor="rgb(1,2,3)",e.style.position="absolute",this._document.body.appendChild(e);let r=this._document.defaultView||window,i=r&&r.getComputedStyle?r.getComputedStyle(e):null,o=(i&&i.backgroundColor||"").replace(/ /g,"");switch(e.remove(),o){case"rgb(0,0,0)":case"rgb(45,50,54)":case"rgb(32,32,32)":return Si.WHITE_ON_BLACK;case"rgb(255,255,255)":case"rgb(255,250,239)":return Si.BLACK_ON_WHITE}return Si.NONE}ngOnDestroy(){this._breakpointSubscription.unsubscribe()}_applyBodyHighContrastModeCssClasses(){if(!this._hasCheckedHighContrastMode&&this._platform.isBrowser&&this._document.body){let e=this._document.body.classList;e.remove(gv,YT,ZT),this._hasCheckedHighContrastMode=!0;let r=this.getHighContrastMode();r===Si.BLACK_ON_WHITE?e.add(gv,YT):r===Si.WHITE_ON_BLACK&&e.add(gv,ZT)}}static \u0275fac=function(r){return new(r||n)};static \u0275prov=y({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})(),yv=(()=>{class n{constructor(){h(XT)._applyBodyHighContrastModeCssClasses()}static \u0275fac=function(r){return new(r||n)};static \u0275mod=Ve({type:n});static \u0275inj=Ae({imports:[KT]})}return n})();var mP=200,Df=class{_letterKeyStream=new C;_items=[];_selectedItemIndex=-1;_pressedLetters=[];_skipPredicateFn;_selectedItem=new C;selectedItem=this._selectedItem;constructor(t,e){let r=typeof e?.debounceInterval=="number"?e.debounceInterval:mP;e?.skipPredicate&&(this._skipPredicateFn=e.skipPredicate),this.setItems(t),this._setupKeyHandler(r)}destroy(){this._pressedLetters=[],this._letterKeyStream.complete(),this._selectedItem.complete()}setCurrentSelectedItemIndex(t){this._selectedItemIndex=t}setItems(t){this._items=t}handleKey(t){let e=t.keyCode;t.key&&t.key.length===1?this._letterKeyStream.next(t.key.toLocaleUpperCase()):(e>=65&&e<=90||e>=48&&e<=57)&&this._letterKeyStream.next(String.fromCharCode(e))}isTyping(){return this._pressedLetters.length>0}reset(){this._pressedLetters=[]}_setupKeyHandler(t){this._letterKeyStream.pipe(Xe(e=>this._pressedLetters.push(e)),Tr(t),be(()=>this._pressedLetters.length>0),ee(()=>this._pressedLetters.join("").toLocaleUpperCase())).subscribe(e=>{for(let r=1;r<this._items.length+1;r++){let i=(this._selectedItemIndex+r)%this._items.length,o=this._items[i];if(!this._skipPredicateFn?.(o)&&o.getLabel?.().toLocaleUpperCase().trim().indexOf(e)===0){this._selectedItem.next(o);break}}this._pressedLetters=[]})}};function $s(n,...t){return t.length?t.some(e=>n[e]):n.altKey||n.shiftKey||n.ctrlKey||n.metaKey}var wf=class{_items;_activeItemIndex=Re(-1);_activeItem=Re(null);_wrap=!1;_typeaheadSubscription=Z.EMPTY;_itemChangesSubscription;_vertical=!0;_horizontal=null;_allowedModifierKeys=[];_homeAndEnd=!1;_pageUpAndDown={enabled:!1,delta:10};_effectRef;_typeahead;_skipPredicateFn=t=>t.disabled;constructor(t,e){this._items=t,t instanceof Or?this._itemChangesSubscription=t.changes.subscribe(r=>this._itemsChanged(r.toArray())):$a(t)&&(this._effectRef=Ji(()=>this._itemsChanged(t()),{injector:e}))}tabOut=new C;change=new C;skipPredicate(t){return this._skipPredicateFn=t,this}withWrap(t=!0){return this._wrap=t,this}withVerticalOrientation(t=!0){return this._vertical=t,this}withHorizontalOrientation(t){return this._horizontal=t,this}withAllowedModifierKeys(t){return this._allowedModifierKeys=t,this}withTypeAhead(t=200){this._typeaheadSubscription.unsubscribe();let e=this._getItemsArray();return this._typeahead=new Df(e,{debounceInterval:typeof t=="number"?t:void 0,skipPredicate:r=>this._skipPredicateFn(r)}),this._typeaheadSubscription=this._typeahead.selectedItem.subscribe(r=>{this.setActiveItem(r)}),this}cancelTypeahead(){return this._typeahead?.reset(),this}withHomeAndEnd(t=!0){return this._homeAndEnd=t,this}withPageUpDown(t=!0,e=10){return this._pageUpAndDown={enabled:t,delta:e},this}setActiveItem(t){let e=this._activeItem();this.updateActiveItem(t),this._activeItem()!==e&&this.change.next(this._activeItemIndex())}onKeydown(t){let e=t.keyCode,i=["altKey","ctrlKey","metaKey","shiftKey"].every(o=>!t[o]||this._allowedModifierKeys.indexOf(o)>-1);switch(e){case 9:this.tabOut.next();return;case 40:if(this._vertical&&i){this.setNextItemActive();break}else return;case 38:if(this._vertical&&i){this.setPreviousItemActive();break}else return;case 39:if(this._horizontal&&i){this._horizontal==="rtl"?this.setPreviousItemActive():this.setNextItemActive();break}else return;case 37:if(this._horizontal&&i){this._horizontal==="rtl"?this.setNextItemActive():this.setPreviousItemActive();break}else return;case 36:if(this._homeAndEnd&&i){this.setFirstItemActive();break}else return;case 35:if(this._homeAndEnd&&i){this.setLastItemActive();break}else return;case 33:if(this._pageUpAndDown.enabled&&i){let o=this._activeItemIndex()-this._pageUpAndDown.delta;this._setActiveItemByIndex(o>0?o:0,1);break}else return;case 34:if(this._pageUpAndDown.enabled&&i){let o=this._activeItemIndex()+this._pageUpAndDown.delta,s=this._getItemsArray().length;this._setActiveItemByIndex(o<s?o:s-1,-1);break}else return;default:(i||$s(t,"shiftKey"))&&this._typeahead?.handleKey(t);return}this._typeahead?.reset(),t.preventDefault()}get activeItemIndex(){return this._activeItemIndex()}get activeItem(){return this._activeItem()}isTyping(){return!!this._typeahead&&this._typeahead.isTyping()}setFirstItemActive(){this._setActiveItemByIndex(0,1)}setLastItemActive(){this._setActiveItemByIndex(this._getItemsArray().length-1,-1)}setNextItemActive(){this._activeItemIndex()<0?this.setFirstItemActive():this._setActiveItemByDelta(1)}setPreviousItemActive(){this._activeItemIndex()<0&&this._wrap?this.setLastItemActive():this._setActiveItemByDelta(-1)}updateActiveItem(t){let e=this._getItemsArray(),r=typeof t=="number"?t:e.indexOf(t),i=e[r];this._activeItem.set(i??null),this._activeItemIndex.set(r),this._typeahead?.setCurrentSelectedItemIndex(r)}destroy(){this._typeaheadSubscription.unsubscribe(),this._itemChangesSubscription?.unsubscribe(),this._effectRef?.destroy(),this._typeahead?.destroy(),this.tabOut.complete(),this.change.complete()}_setActiveItemByDelta(t){this._wrap?this._setActiveInWrapMode(t):this._setActiveInDefaultMode(t)}_setActiveInWrapMode(t){let e=this._getItemsArray();for(let r=1;r<=e.length;r++){let i=(this._activeItemIndex()+t*r+e.length)%e.length,o=e[i];if(!this._skipPredicateFn(o)){this.setActiveItem(i);return}}}_setActiveInDefaultMode(t){this._setActiveItemByIndex(this._activeItemIndex()+t,t)}_setActiveItemByIndex(t,e){let r=this._getItemsArray();if(r[t]){for(;this._skipPredicateFn(r[t]);)if(t+=e,!r[t])return;this.setActiveItem(t)}}_getItemsArray(){return $a(this._items)?this._items():this._items instanceof Or?this._items.toArray():this._items}_itemsChanged(t){this._typeahead?.setItems(t);let e=this._activeItem();if(e){let r=t.indexOf(e);r>-1&&r!==this._activeItemIndex()&&(this._activeItemIndex.set(r),this._typeahead?.setCurrentSelectedItemIndex(r))}}};var Ul=class extends wf{_origin="program";setFocusOrigin(t){return this._origin=t,this}setActiveItem(t){super.setActiveItem(t),this.activeItem&&this.activeItem.focus(this._origin)}};var vv={},So=class n{_appId=h(mi);static _infix=`a${Math.floor(Math.random()*1e5).toString()}`;getId(t,e=!1){return this._appId!=="ng"&&(t+=this._appId),vv.hasOwnProperty(t)||(vv[t]=0),`${t}${e?n._infix+"-":""}${vv[t]++}`}static \u0275fac=function(e){return new(e||n)};static \u0275prov=y({token:n,factory:n.\u0275fac,providedIn:"root"})};var JT=" ";function gP(n,t,e){let r=Sf(n,t);e=e.trim(),!r.some(i=>i.trim()===e)&&(r.push(e),n.setAttribute(t,r.join(JT)))}function yP(n,t,e){let r=Sf(n,t);e=e.trim();let i=r.filter(o=>o!==e);i.length?n.setAttribute(t,i.join(JT)):n.removeAttribute(t)}function Sf(n,t){return n.getAttribute(t)?.match(/\S+/g)??[]}var eS="cdk-describedby-message",Tf="cdk-describedby-host",_v=0,tS=(()=>{class n{_platform=h(Me);_document=h(Q);_messageRegistry=new Map;_messagesContainer=null;_id=`${_v++}`;constructor(){h(br).load(OT),this._id=h(mi)+"-"+_v++}describe(e,r,i){if(!this._canBeDescribed(e,r))return;let o=bv(r,i);typeof r!="string"?(QT(r,this._id),this._messageRegistry.set(o,{messageElement:r,referenceCount:0})):this._messageRegistry.has(o)||this._createMessageElement(r,i),this._isElementDescribedByMessage(e,o)||this._addMessageReference(e,o)}removeDescription(e,r,i){if(!r||!this._isElementNode(e))return;let o=bv(r,i);if(this._isElementDescribedByMessage(e,o)&&this._removeMessageReference(e,o),typeof r=="string"){let s=this._messageRegistry.get(o);s&&s.referenceCount===0&&this._deleteMessageElement(o)}this._messagesContainer?.childNodes.length===0&&(this._messagesContainer.remove(),this._messagesContainer=null)}ngOnDestroy(){let e=this._document.querySelectorAll(`[${Tf}="${this._id}"]`);for(let r=0;r<e.length;r++)this._removeCdkDescribedByReferenceIds(e[r]),e[r].removeAttribute(Tf);this._messagesContainer?.remove(),this._messagesContainer=null,this._messageRegistry.clear()}_createMessageElement(e,r){let i=this._document.createElement("div");QT(i,this._id),i.textContent=e,r&&i.setAttribute("role",r),this._createMessagesContainer(),this._messagesContainer.appendChild(i),this._messageRegistry.set(bv(e,r),{messageElement:i,referenceCount:0})}_deleteMessageElement(e){this._messageRegistry.get(e)?.messageElement?.remove(),this._messageRegistry.delete(e)}_createMessagesContainer(){if(this._messagesContainer)return;let e="cdk-describedby-message-container",r=this._document.querySelectorAll(`.${e}[platform="server"]`);for(let o=0;o<r.length;o++)r[o].remove();let i=this._document.createElement("div");i.style.visibility="hidden",i.classList.add(e),i.classList.add("cdk-visually-hidden"),this._platform.isBrowser||i.setAttribute("platform","server"),this._document.body.appendChild(i),this._messagesContainer=i}_removeCdkDescribedByReferenceIds(e){let r=Sf(e,"aria-describedby").filter(i=>i.indexOf(eS)!=0);e.setAttribute("aria-describedby",r.join(" "))}_addMessageReference(e,r){let i=this._messageRegistry.get(r);gP(e,"aria-describedby",i.messageElement.id),e.setAttribute(Tf,this._id),i.referenceCount++}_removeMessageReference(e,r){let i=this._messageRegistry.get(r);i.referenceCount--,yP(e,"aria-describedby",i.messageElement.id),e.removeAttribute(Tf)}_isElementDescribedByMessage(e,r){let i=Sf(e,"aria-describedby"),o=this._messageRegistry.get(r),s=o&&o.messageElement.id;return!!s&&i.indexOf(s)!=-1}_canBeDescribed(e,r){if(!this._isElementNode(e))return!1;if(r&&typeof r=="object")return!0;let i=r==null?"":`${r}`.trim(),o=e.getAttribute("aria-label");return i?!o||o.trim()!==i:!1}_isElementNode(e){return e.nodeType===this._document.ELEMENT_NODE}static \u0275fac=function(r){return new(r||n)};static \u0275prov=y({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})();function bv(n,t){return typeof n=="string"?`${t||""}/${n}`:n}function QT(n,t){n.id||(n.id=`${eS}-${t}-${_v++}`)}var vP=new b("cdk-dir-doc",{providedIn:"root",factory:()=>h(Q)}),bP=/^(ar|ckb|dv|he|iw|fa|nqo|ps|sd|ug|ur|yi|.*[-_](Adlm|Arab|Hebr|Nkoo|Rohg|Thaa))(?!.*[-_](Latn|Cyrl)($|-|_))($|-|_)/i;function nS(n){let t=n?.toLowerCase()||"";return t==="auto"&&typeof navigator<"u"&&navigator?.language?bP.test(navigator.language)?"rtl":"ltr":t==="rtl"?"rtl":"ltr"}var _r=(()=>{class n{get value(){return this.valueSignal()}valueSignal=Re("ltr");change=new ne;constructor(){let e=h(vP,{optional:!0});if(e){let r=e.body?e.body.dir:null,i=e.documentElement?e.documentElement.dir:null;this.valueSignal.set(nS(r||i||"ltr"))}}ngOnDestroy(){this.change.complete()}static \u0275fac=function(r){return new(r||n)};static \u0275prov=y({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})();var Kr=(()=>{class n{static \u0275fac=function(r){return new(r||n)};static \u0275mod=Ve({type:n});static \u0275inj=Ae({})}return n})();var Cv=class{_box;_destroyed=new C;_resizeSubject=new C;_resizeObserver;_elementObservables=new Map;constructor(t){this._box=t,typeof ResizeObserver<"u"&&(this._resizeObserver=new ResizeObserver(e=>this._resizeSubject.next(e)))}observe(t){return this._elementObservables.has(t)||this._elementObservables.set(t,new N(e=>{let r=this._resizeSubject.subscribe(e);return this._resizeObserver?.observe(t,{box:this._box}),()=>{this._resizeObserver?.unobserve(t),r.unsubscribe(),this._elementObservables.delete(t)}}).pipe(be(e=>e.some(r=>r.target===t)),ua({bufferSize:1,refCount:!0}),J(this._destroyed))),this._elementObservables.get(t)}destroy(){this._destroyed.next(),this._destroyed.complete(),this._resizeSubject.complete(),this._elementObservables.clear()}},rS=(()=>{class n{_cleanupErrorListener;_observers=new Map;_ngZone=h(V);constructor(){typeof ResizeObserver<"u"}ngOnDestroy(){for(let[,e]of this._observers)e.destroy();this._observers.clear(),this._cleanupErrorListener?.()}observe(e,r){let i=r?.box||"content-box";return this._observers.has(i)||this._observers.set(i,new Cv(i)),this._observers.get(i).observe(e)}static \u0275fac=function(r){return new(r||n)};static \u0275prov=y({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})();var Qn=(function(n){return n[n.NORMAL=0]="NORMAL",n[n.NEGATED=1]="NEGATED",n[n.INVERTED=2]="INVERTED",n})(Qn||{}),If,Io;function Mf(){if(Io==null){if(typeof document!="object"||!document||typeof Element!="function"||!Element)return Io=!1,Io;if(document.documentElement?.style&&"scrollBehavior"in document.documentElement.style)Io=!0;else{let n=Element.prototype.scrollTo;n?Io=!/\{\s*\[native code\]\s*\}/.test(n.toString()):Io=!1}}return Io}function Hs(){if(typeof document!="object"||!document)return Qn.NORMAL;if(If==null){let n=document.createElement("div"),t=n.style;n.dir="rtl",t.width="1px",t.overflow="auto",t.visibility="hidden",t.pointerEvents="none",t.position="absolute";let e=document.createElement("div"),r=e.style;r.width="2px",r.height="1px",n.appendChild(e),document.body.appendChild(n),If=Qn.NORMAL,n.scrollLeft===0&&(n.scrollLeft=1,If=n.scrollLeft===0?Qn.NEGATED:Qn.INVERTED),n.remove()}return If}function Ev(){return typeof __karma__<"u"&&!!__karma__||typeof jasmine<"u"&&!!jasmine||typeof jest<"u"&&!!jest||typeof Mocha<"u"&&!!Mocha}var xf=class{};function iS(n){return n&&typeof n.connect=="function"&&!(n instanceof Js)}var Rf=class extends xf{_data;constructor(t){super(),this._data=t}connect(){return Zt(this._data)?this._data:x(this._data)}disconnect(){}},$l=(function(n){return n[n.REPLACED=0]="REPLACED",n[n.INSERTED=1]="INSERTED",n[n.MOVED=2]="MOVED",n[n.REMOVED=3]="REMOVED",n})($l||{}),Af=class{viewCacheSize=20;_viewCache=[];applyChanges(t,e,r,i,o){t.forEachOperation((s,a,l)=>{let c,u;if(s.previousIndex==null){let d=()=>r(s,a,l);c=this._insertView(d,l,e,i(s)),u=c?$l.INSERTED:$l.REPLACED}else l==null?(this._detachAndCacheView(a,e),u=$l.REMOVED):(c=this._moveView(a,l,e,i(s)),u=$l.MOVED);o&&o({context:c?.context,operation:u,record:s})})}detach(){for(let t of this._viewCache)t.destroy();this._viewCache=[]}_insertView(t,e,r,i){let o=this._insertViewFromCache(e,r);if(o){o.context.$implicit=i;return}let s=t();return r.createEmbeddedView(s.templateRef,s.context,s.index)}_detachAndCacheView(t,e){let r=e.detach(t);this._maybeCacheView(r,e)}_moveView(t,e,r,i){let o=r.get(t);return r.move(o,e),o.context.$implicit=i,o}_maybeCacheView(t,e){if(this._viewCache.length<this.viewCacheSize)this._viewCache.push(t);else{let r=e.indexOf(t);r===-1?t.destroy():e.remove(r)}}_insertViewFromCache(t,e){let r=this._viewCache.pop();return r&&e.insert(r,t),r||null}};var _P=["contentWrapper"],CP=["*"],aS=new b("VIRTUAL_SCROLL_STRATEGY"),Dv=class{_scrolledIndexChange=new C;scrolledIndexChange=this._scrolledIndexChange.pipe(Go());_viewport=null;_itemSize;_minBufferPx;_maxBufferPx;constructor(t,e,r){this._itemSize=t,this._minBufferPx=e,this._maxBufferPx=r}attach(t){this._viewport=t,this._updateTotalContentSize(),this._updateRenderedRange()}detach(){this._scrolledIndexChange.complete(),this._viewport=null}updateItemAndBufferSize(t,e,r){r<e,this._itemSize=t,this._minBufferPx=e,this._maxBufferPx=r,this._updateTotalContentSize(),this._updateRenderedRange()}onContentScrolled(){this._updateRenderedRange()}onDataLengthChanged(){this._updateTotalContentSize(),this._updateRenderedRange()}onContentRendered(){}onRenderedOffsetChanged(){}scrollToIndex(t,e){this._viewport&&this._viewport.scrollToOffset(t*this._itemSize,e)}_updateTotalContentSize(){this._viewport&&this._viewport.setTotalContentSize(this._viewport.getDataLength()*this._itemSize)}_updateRenderedRange(){if(!this._viewport)return;let t=this._viewport.getRenderedRange(),e={start:t.start,end:t.end},r=this._viewport.getViewportSize(),i=this._viewport.getDataLength(),o=this._viewport.measureScrollOffset(),s=this._itemSize>0?o/this._itemSize:0;if(e.end>i){let l=Math.ceil(r/this._itemSize),c=Math.max(0,Math.min(s,i-l));s!=c&&(s=c,o=c*this._itemSize,e.start=Math.floor(s)),e.end=Math.max(0,Math.min(i,e.start+l))}let a=o-e.start*this._itemSize;if(a<this._minBufferPx&&e.start!=0){let l=Math.ceil((this._maxBufferPx-a)/this._itemSize);e.start=Math.max(0,e.start-l),e.end=Math.min(i,Math.ceil(s+(r+this._minBufferPx)/this._itemSize))}else{let l=e.end*this._itemSize-(o+r);if(l<this._minBufferPx&&e.end!=i){let c=Math.ceil((this._maxBufferPx-l)/this._itemSize);c>0&&(e.end=Math.min(i,e.end+c),e.start=Math.max(0,Math.floor(s-this._minBufferPx/this._itemSize)))}}this._viewport.setRenderedRange(e),this._viewport.setRenderedContentOffset(Math.round(this._itemSize*e.start)),this._scrolledIndexChange.next(Math.floor(s))}};function EP(n){return n._scrollStrategy}var wv=(()=>{class n{get itemSize(){return this._itemSize}set itemSize(e){this._itemSize=Xn(e)}_itemSize=20;get minBufferPx(){return this._minBufferPx}set minBufferPx(e){this._minBufferPx=Xn(e)}_minBufferPx=100;get maxBufferPx(){return this._maxBufferPx}set maxBufferPx(e){this._maxBufferPx=Xn(e)}_maxBufferPx=200;_scrollStrategy=new Dv(this.itemSize,this.minBufferPx,this.maxBufferPx);ngOnChanges(){this._scrollStrategy.updateItemAndBufferSize(this.itemSize,this.minBufferPx,this.maxBufferPx)}static \u0275fac=function(r){return new(r||n)};static \u0275dir=ye({type:n,selectors:[["cdk-virtual-scroll-viewport","itemSize",""]],inputs:{itemSize:"itemSize",minBufferPx:"minBufferPx",maxBufferPx:"maxBufferPx"},features:[fr([{provide:aS,useFactory:EP,deps:[Yo(()=>n)]}]),cr]})}return n})(),DP=20,Mo=(()=>{class n{_ngZone=h(V);_platform=h(Me);_renderer=h(bt).createRenderer(null,null);_cleanupGlobalListener;constructor(){}_scrolled=new C;_scrolledCount=0;scrollContainers=new Map;register(e){this.scrollContainers.has(e)||this.scrollContainers.set(e,e.elementScrolled().subscribe(()=>this._scrolled.next(e)))}deregister(e){let r=this.scrollContainers.get(e);r&&(r.unsubscribe(),this.scrollContainers.delete(e))}scrolled(e=DP){return this._platform.isBrowser?new N(r=>{this._cleanupGlobalListener||(this._cleanupGlobalListener=this._ngZone.runOutsideAngular(()=>this._renderer.listen("document","scroll",()=>this._scrolled.next())));let i=e>0?this._scrolled.pipe(ca(e)).subscribe(r):this._scrolled.subscribe(r);return this._scrolledCount++,()=>{i.unsubscribe(),this._scrolledCount--,this._scrolledCount||(this._cleanupGlobalListener?.(),this._cleanupGlobalListener=void 0)}}):x()}ngOnDestroy(){this._cleanupGlobalListener?.(),this._cleanupGlobalListener=void 0,this.scrollContainers.forEach((e,r)=>this.deregister(r)),this._scrolled.complete()}ancestorScrolled(e,r){let i=this.getAncestorScrollContainers(e);return this.scrolled(r).pipe(be(o=>!o||i.indexOf(o)>-1))}getAncestorScrollContainers(e){let r=[];return this.scrollContainers.forEach((i,o)=>{this._scrollableContainsElement(o,e)&&r.push(o)}),r}_scrollableContainsElement(e,r){let i=Mn(r),o=e.getElementRef().nativeElement;do if(i==o)return!0;while(i=i.parentElement);return!1}static \u0275fac=function(r){return new(r||n)};static \u0275prov=y({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})(),zl=(()=>{class n{elementRef=h(le);scrollDispatcher=h(Mo);ngZone=h(V);dir=h(_r,{optional:!0});_scrollElement=this.elementRef.nativeElement;_destroyed=new C;_renderer=h(jn);_cleanupScroll;_elementScrolled=new C;constructor(){}ngOnInit(){this._cleanupScroll=this.ngZone.runOutsideAngular(()=>this._renderer.listen(this._scrollElement,"scroll",e=>this._elementScrolled.next(e))),this.scrollDispatcher.register(this)}ngOnDestroy(){this._cleanupScroll?.(),this._elementScrolled.complete(),this.scrollDispatcher.deregister(this),this._destroyed.next(),this._destroyed.complete()}elementScrolled(){return this._elementScrolled}getElementRef(){return this.elementRef}scrollTo(e){let r=this.elementRef.nativeElement,i=this.dir&&this.dir.value=="rtl";e.left==null&&(e.left=i?e.end:e.start),e.right==null&&(e.right=i?e.start:e.end),e.bottom!=null&&(e.top=r.scrollHeight-r.clientHeight-e.bottom),i&&Hs()!=Qn.NORMAL?(e.left!=null&&(e.right=r.scrollWidth-r.clientWidth-e.left),Hs()==Qn.INVERTED?e.left=e.right:Hs()==Qn.NEGATED&&(e.left=e.right?-e.right:e.right)):e.right!=null&&(e.left=r.scrollWidth-r.clientWidth-e.right),this._applyScrollToOptions(e)}_applyScrollToOptions(e){let r=this.elementRef.nativeElement;Mf()?r.scrollTo(e):(e.top!=null&&(r.scrollTop=e.top),e.left!=null&&(r.scrollLeft=e.left))}measureScrollOffset(e){let r="left",i="right",o=this.elementRef.nativeElement;if(e=="top")return o.scrollTop;if(e=="bottom")return o.scrollHeight-o.clientHeight-o.scrollTop;let s=this.dir&&this.dir.value=="rtl";return e=="start"?e=s?i:r:e=="end"&&(e=s?r:i),s&&Hs()==Qn.INVERTED?e==r?o.scrollWidth-o.clientWidth-o.scrollLeft:o.scrollLeft:s&&Hs()==Qn.NEGATED?e==r?o.scrollLeft+o.scrollWidth-o.clientWidth:-o.scrollLeft:e==r?o.scrollLeft:o.scrollWidth-o.clientWidth-o.scrollLeft}static \u0275fac=function(r){return new(r||n)};static \u0275dir=ye({type:n,selectors:[["","cdk-scrollable",""],["","cdkScrollable",""]]})}return n})(),wP=20,Yr=(()=>{class n{_platform=h(Me);_listeners;_viewportSize=null;_change=new C;_document=h(Q);constructor(){let e=h(V),r=h(bt).createRenderer(null,null);e.runOutsideAngular(()=>{if(this._platform.isBrowser){let i=o=>this._change.next(o);this._listeners=[r.listen("window","resize",i),r.listen("window","orientationchange",i)]}this.change().subscribe(()=>this._viewportSize=null)})}ngOnDestroy(){this._listeners?.forEach(e=>e()),this._change.complete()}getViewportSize(){this._viewportSize||this._updateViewportSize();let e={width:this._viewportSize.width,height:this._viewportSize.height};return this._platform.isBrowser||(this._viewportSize=null),e}getViewportRect(){let e=this.getViewportScrollPosition(),{width:r,height:i}=this.getViewportSize();return{top:e.top,left:e.left,bottom:e.top+i,right:e.left+r,height:i,width:r}}getViewportScrollPosition(){if(!this._platform.isBrowser)return{top:0,left:0};let e=this._document,r=this._getWindow(),i=e.documentElement,o=i.getBoundingClientRect(),s=-o.top||e.body?.scrollTop||r.scrollY||i.scrollTop||0,a=-o.left||e.body?.scrollLeft||r.scrollX||i.scrollLeft||0;return{top:s,left:a}}change(e=wP){return e>0?this._change.pipe(ca(e)):this._change}_getWindow(){return this._document.defaultView||window}_updateViewportSize(){let e=this._getWindow();this._viewportSize=this._platform.isBrowser?{width:e.innerWidth,height:e.innerHeight}:{width:0,height:0}}static \u0275fac=function(r){return new(r||n)};static \u0275prov=y({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})(),oS=new b("VIRTUAL_SCROLLABLE"),TP=(()=>{class n extends zl{constructor(){super()}measureViewportSize(e){let r=this.elementRef.nativeElement;return e==="horizontal"?r.clientWidth:r.clientHeight}static \u0275fac=function(r){return new(r||n)};static \u0275dir=ye({type:n,features:[Jt]})}return n})();function SP(n,t){return n.start==t.start&&n.end==t.end}var IP=typeof requestAnimationFrame<"u"?wh:Dh,lS=new b("CDK_VIRTUAL_SCROLL_VIEWPORT"),Tv=(()=>{class n extends TP{elementRef=h(le);_changeDetectorRef=h(Hn);_scrollStrategy=h(aS,{optional:!0});scrollable=h(oS,{optional:!0});_platform=h(Me);_detachedSubject=new C;_renderedRangeSubject=new C;_renderedContentOffsetSubject=new C;get orientation(){return this._orientation}set orientation(e){this._orientation!==e&&(this._orientation=e,this._calculateSpacerSize())}_orientation="vertical";appendOnly=!1;scrolledIndexChange=new N(e=>this._scrollStrategy.scrolledIndexChange.subscribe(r=>Promise.resolve().then(()=>this.ngZone.run(()=>e.next(r)))));_contentWrapper;renderedRangeStream=this._renderedRangeSubject;renderedContentOffset=this._renderedContentOffsetSubject.pipe(be(e=>e!==null),Go());_totalContentSize=0;_totalContentWidth=Re("");_totalContentHeight=Re("");_renderedContentTransform;_renderedRange={start:0,end:0};_dataLength=0;_viewportSize=0;_forOf=null;_renderedContentOffset=0;_renderedContentOffsetNeedsRewrite=!1;_changeDetectionNeeded=Re(!1);_runAfterChangeDetection=[];_viewportChanges=Z.EMPTY;_injector=h(re);_isDestroyed=!1;constructor(){super();let e=h(Yr);this._scrollStrategy,this._viewportChanges=e.change().subscribe(()=>{this.checkViewportSize()}),this.scrollable||(this.elementRef.nativeElement.classList.add("cdk-virtual-scrollable"),this.scrollable=this);let r=Ji(()=>{this._changeDetectionNeeded()&&this._doChangeDetection()},{injector:h(mn).injector});h(Ke).onDestroy(()=>{r.destroy()})}ngOnInit(){this._platform.isBrowser&&(this.scrollable===this&&super.ngOnInit(),this.ngZone.runOutsideAngular(()=>Promise.resolve().then(()=>{this._measureViewportSize(),this._scrollStrategy.attach(this),this.scrollable.elementScrolled().pipe(an(null),ca(0,IP),J(this._destroyed)).subscribe(()=>this._scrollStrategy.onContentScrolled()),this._markChangeDetectionNeeded()})))}ngOnDestroy(){this.detach(),this._scrollStrategy.detach(),this._renderedRangeSubject.complete(),this._detachedSubject.complete(),this._viewportChanges.unsubscribe(),this._isDestroyed=!0,super.ngOnDestroy()}attach(e){this._forOf,this.ngZone.runOutsideAngular(()=>{this._forOf=e,this._forOf.dataStream.pipe(J(this._detachedSubject)).subscribe(r=>{let i=r.length;i!==this._dataLength&&(this._dataLength=i,this._scrollStrategy.onDataLengthChanged()),this._doChangeDetection()})})}detach(){this._forOf=null,this._detachedSubject.next()}getDataLength(){return this._dataLength}getViewportSize(){return this._viewportSize}getRenderedRange(){return this._renderedRange}measureBoundingClientRectWithScrollOffset(e){return this.getElementRef().nativeElement.getBoundingClientRect()[e]}setTotalContentSize(e){this._totalContentSize!==e&&(this._totalContentSize=e,this._calculateSpacerSize(),this._markChangeDetectionNeeded())}setRenderedRange(e){SP(this._renderedRange,e)||(this.appendOnly&&(e={start:0,end:Math.max(this._renderedRange.end,e.end)}),this._renderedRangeSubject.next(this._renderedRange=e),this._markChangeDetectionNeeded(()=>this._scrollStrategy.onContentRendered()))}getOffsetToRenderedContentStart(){return this._renderedContentOffsetNeedsRewrite?null:this._renderedContentOffset}setRenderedContentOffset(e,r="to-start"){e=this.appendOnly&&r==="to-start"?0:e;let i=this.dir&&this.dir.value=="rtl",o=this.orientation=="horizontal",s=o?"X":"Y",l=`translate${s}(${Number((o&&i?-1:1)*e)}px)`;this._renderedContentOffset=e,r==="to-end"&&(l+=` translate${s}(-100%)`,this._renderedContentOffsetNeedsRewrite=!0),this._renderedContentTransform!=l&&(this._renderedContentTransform=l,this._markChangeDetectionNeeded(()=>{this._renderedContentOffsetNeedsRewrite?(this._renderedContentOffset-=this.measureRenderedContentSize(),this._renderedContentOffsetNeedsRewrite=!1,this.setRenderedContentOffset(this._renderedContentOffset)):this._scrollStrategy.onRenderedOffsetChanged()}))}scrollToOffset(e,r="auto"){let i={behavior:r};this.orientation==="horizontal"?i.start=e:i.top=e,this.scrollable.scrollTo(i)}scrollToIndex(e,r="auto"){this._scrollStrategy.scrollToIndex(e,r)}measureScrollOffset(e){let r;return this.scrollable==this?r=i=>super.measureScrollOffset(i):r=i=>this.scrollable.measureScrollOffset(i),Math.max(0,r(e??(this.orientation==="horizontal"?"start":"top"))-this.measureViewportOffset())}measureViewportOffset(e){let r,i="left",o="right",s=this.dir?.value=="rtl";e=="start"?r=s?o:i:e=="end"?r=s?i:o:e?r=e:r=this.orientation==="horizontal"?"left":"top";let a=this.scrollable.measureBoundingClientRectWithScrollOffset(r);return this.elementRef.nativeElement.getBoundingClientRect()[r]-a}measureRenderedContentSize(){let e=this._contentWrapper.nativeElement;return this.orientation==="horizontal"?e.offsetWidth:e.offsetHeight}measureRangeSize(e){return this._forOf?this._forOf.measureRangeSize(e,this.orientation):0}checkViewportSize(){this._measureViewportSize(),this._scrollStrategy.onDataLengthChanged()}_measureViewportSize(){this._viewportSize=this.scrollable.measureViewportSize(this.orientation)}_markChangeDetectionNeeded(e){e&&this._runAfterChangeDetection.push(e),!$n(this._changeDetectionNeeded)&&this.ngZone.runOutsideAngular(()=>{Promise.resolve().then(()=>{this.ngZone.run(()=>{this._changeDetectionNeeded.set(!0)})})})}_doChangeDetection(){this._isDestroyed||this.ngZone.run(()=>{this._changeDetectorRef.markForCheck(),this._contentWrapper.nativeElement.style.transform=this._renderedContentTransform,this._renderedContentOffsetSubject.next(this.getOffsetToRenderedContentStart()),_t(()=>{this._changeDetectionNeeded.set(!1);let e=this._runAfterChangeDetection;this._runAfterChangeDetection=[];for(let r of e)r()},{injector:this._injector})})}_calculateSpacerSize(){this._totalContentHeight.set(this.orientation==="horizontal"?"":`${this._totalContentSize}px`),this._totalContentWidth.set(this.orientation==="horizontal"?`${this._totalContentSize}px`:"")}static \u0275fac=function(r){return new(r||n)};static \u0275cmp=ge({type:n,selectors:[["cdk-virtual-scroll-viewport"]],viewQuery:function(r,i){if(r&1&&Un(_P,7),r&2){let o;ze(o=We())&&(i._contentWrapper=o.first)}},hostAttrs:[1,"cdk-virtual-scroll-viewport"],hostVars:4,hostBindings:function(r,i){r&2&&Ge("cdk-virtual-scroll-orientation-horizontal",i.orientation==="horizontal")("cdk-virtual-scroll-orientation-vertical",i.orientation!=="horizontal")},inputs:{orientation:"orientation",appendOnly:[2,"appendOnly","appendOnly",tt]},outputs:{scrolledIndexChange:"scrolledIndexChange"},features:[fr([{provide:zl,useFactory:()=>h(oS,{optional:!0})||h(n)},{provide:lS,useExisting:n}]),Jt],ngContentSelectors:CP,decls:4,vars:4,consts:[["contentWrapper",""],[1,"cdk-virtual-scroll-content-wrapper"],[1,"cdk-virtual-scroll-spacer"]],template:function(r,i){r&1&&(ao(),yi(0,"div",1,0),lo(2),so(),Ju(3,"div",2)),r&2&&(P(3),ms("width",i._totalContentWidth())("height",i._totalContentHeight()))},styles:[`cdk-virtual-scroll-viewport {
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
`],encapsulation:2,changeDetection:0})}return n})();function sS(n,t,e){let r=e;if(!r.getBoundingClientRect)return 0;let i=r.getBoundingClientRect();return n==="horizontal"?t==="start"?i.left:i.right:t==="start"?i.top:i.bottom}var Sv=(()=>{class n{_viewContainerRef=h(lt);_template=h(At);_differs=h(ad);_viewRepeater=new Af;_viewport=h(lS,{skipSelf:!0});viewChange=new C;_dataSourceChanges=new C;get cdkVirtualForOf(){return this._cdkVirtualForOf}set cdkVirtualForOf(e){this._cdkVirtualForOf=e,iS(e)?this._dataSourceChanges.next(e):this._dataSourceChanges.next(new Rf(Zt(e)?e:Array.from(e||[])))}_cdkVirtualForOf;get cdkVirtualForTrackBy(){return this._cdkVirtualForTrackBy}set cdkVirtualForTrackBy(e){this._needsUpdate=!0,this._cdkVirtualForTrackBy=e?(r,i)=>e(r+(this._renderedRange?this._renderedRange.start:0),i):void 0}_cdkVirtualForTrackBy;set cdkVirtualForTemplate(e){e&&(this._needsUpdate=!0,this._template=e)}get cdkVirtualForTemplateCacheSize(){return this._viewRepeater.viewCacheSize}set cdkVirtualForTemplateCacheSize(e){this._viewRepeater.viewCacheSize=Xn(e)}dataStream=this._dataSourceChanges.pipe(an(null),Mh(),St(([e,r])=>this._changeDataSource(e,r)),ua(1));_differ=null;_data=[];_renderedItems=[];_renderedRange={start:0,end:0};_needsUpdate=!1;_destroyed=new C;constructor(){let e=h(V);this.dataStream.subscribe(r=>{this._data=r,this._onRenderedDataChange()}),this._viewport.renderedRangeStream.pipe(J(this._destroyed)).subscribe(r=>{this._renderedRange=r,this.viewChange.observers.length&&e.run(()=>this.viewChange.next(this._renderedRange)),this._onRenderedDataChange()}),this._viewport.attach(this)}measureRangeSize(e,r){if(e.start>=e.end)return 0;e.start<this._renderedRange.start||e.end>this._renderedRange.end;let i=e.start-this._renderedRange.start,o=e.end-e.start,s,a;for(let l=0;l<o;l++){let c=this._viewContainerRef.get(l+i);if(c&&c.rootNodes.length){s=a=c.rootNodes[0];break}}for(let l=o-1;l>-1;l--){let c=this._viewContainerRef.get(l+i);if(c&&c.rootNodes.length){a=c.rootNodes[c.rootNodes.length-1];break}}return s&&a?sS(r,"end",a)-sS(r,"start",s):0}ngDoCheck(){if(this._differ&&this._needsUpdate){let e=this._differ.diff(this._renderedItems);e?this._applyChanges(e):this._updateContext(),this._needsUpdate=!1}}ngOnDestroy(){this._viewport.detach(),this._dataSourceChanges.next(void 0),this._dataSourceChanges.complete(),this.viewChange.complete(),this._destroyed.next(),this._destroyed.complete(),this._viewRepeater.detach()}_onRenderedDataChange(){this._renderedRange&&(this._renderedItems=this._data.slice(this._renderedRange.start,this._renderedRange.end),this._differ||(this._differ=this._differs.find(this._renderedItems).create((e,r)=>this.cdkVirtualForTrackBy?this.cdkVirtualForTrackBy(e,r):r)),this._needsUpdate=!0)}_changeDataSource(e,r){return e&&e.disconnect(this),this._needsUpdate=!0,r?r.connect(this):x()}_updateContext(){let e=this._data.length,r=this._viewContainerRef.length;for(;r--;){let i=this._viewContainerRef.get(r);i.context.index=this._renderedRange.start+r,i.context.count=e,this._updateComputedContextProperties(i.context),i.detectChanges()}}_applyChanges(e){this._viewRepeater.applyChanges(e,this._viewContainerRef,(o,s,a)=>this._getEmbeddedViewArgs(o,a),o=>o.item),e.forEachIdentityChange(o=>{let s=this._viewContainerRef.get(o.currentIndex);s.context.$implicit=o.item});let r=this._data.length,i=this._viewContainerRef.length;for(;i--;){let o=this._viewContainerRef.get(i);o.context.index=this._renderedRange.start+i,o.context.count=r,this._updateComputedContextProperties(o.context)}}_updateComputedContextProperties(e){e.first=e.index===0,e.last=e.index===e.count-1,e.even=e.index%2===0,e.odd=!e.even}_getEmbeddedViewArgs(e,r){return{templateRef:this._template,context:{$implicit:e.item,cdkVirtualForOf:this._cdkVirtualForOf,index:-1,count:-1,first:!1,last:!1,odd:!1,even:!1},index:r}}static ngTemplateContextGuard(e,r){return!0}static \u0275fac=function(r){return new(r||n)};static \u0275dir=ye({type:n,selectors:[["","cdkVirtualFor","","cdkVirtualForOf",""]],inputs:{cdkVirtualForOf:"cdkVirtualForOf",cdkVirtualForTrackBy:"cdkVirtualForTrackBy",cdkVirtualForTemplate:"cdkVirtualForTemplate",cdkVirtualForTemplateCacheSize:"cdkVirtualForTemplateCacheSize"}})}return n})();var Hl=(()=>{class n{static \u0275fac=function(r){return new(r||n)};static \u0275mod=Ve({type:n});static \u0275inj=Ae({})}return n})(),Wl=(()=>{class n{static \u0275fac=function(r){return new(r||n)};static \u0275mod=Ve({type:n});static \u0275inj=Ae({imports:[Kr,Hl,Kr,Hl]})}return n})();var xP=new b("MATERIAL_ANIMATIONS"),cS=null;function RP(){return h(xP,{optional:!0})?.animationsDisabled||h(Fa,{optional:!0})==="NoopAnimations"?"di-disabled":(cS??=h(Us).matchMedia("(prefers-reduced-motion)").matches,cS?"reduced-motion":"enabled")}function Zr(){return RP()!=="enabled"}function qe(n){return n==null?"":typeof n=="string"?n:`${n}px`}function Iv(n){return n!=null&&`${n}`!="false"}var xn=(function(n){return n[n.FADING_IN=0]="FADING_IN",n[n.VISIBLE=1]="VISIBLE",n[n.FADING_OUT=2]="FADING_OUT",n[n.HIDDEN=3]="HIDDEN",n})(xn||{}),Mv=class{_renderer;element;config;_animationForciblyDisabledThroughCss;state=xn.HIDDEN;constructor(t,e,r,i=!1){this._renderer=t,this.element=e,this.config=r,this._animationForciblyDisabledThroughCss=i}fadeOut(){this._renderer.fadeOutRipple(this)}},uS=js({passive:!0,capture:!0}),xv=class{_events=new Map;addHandler(t,e,r,i){let o=this._events.get(e);if(o){let s=o.get(r);s?s.add(i):o.set(r,new Set([i]))}else this._events.set(e,new Map([[r,new Set([i])]])),t.runOutsideAngular(()=>{document.addEventListener(e,this._delegateEventHandler,uS)})}removeHandler(t,e,r){let i=this._events.get(t);if(!i)return;let o=i.get(e);o&&(o.delete(r),o.size===0&&i.delete(e),i.size===0&&(this._events.delete(t),document.removeEventListener(t,this._delegateEventHandler,uS)))}_delegateEventHandler=t=>{let e=In(t);e&&this._events.get(t.type)?.forEach((r,i)=>{(i===e||i.contains(e))&&r.forEach(o=>o.handleEvent(t))})}},dS={enterDuration:225,exitDuration:150},AP=800,fS=js({passive:!0,capture:!0}),hS=["mousedown","touchstart"],pS=["mouseup","mouseleave","touchend","touchcancel"],kP=(()=>{class n{static \u0275fac=function(r){return new(r||n)};static \u0275cmp=ge({type:n,selectors:[["ng-component"]],hostAttrs:["mat-ripple-style-loader",""],decls:0,vars:0,template:function(r,i){},styles:[`.mat-ripple {
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
`],encapsulation:2,changeDetection:0})}return n})(),Rv=class n{_target;_ngZone;_platform;_containerElement;_triggerElement=null;_isPointerDown=!1;_activeRipples=new Map;_mostRecentTransientRipple=null;_lastTouchStartEvent;_pointerUpEventsRegistered=!1;_containerRect=null;static _eventManager=new xv;constructor(t,e,r,i,o){this._target=t,this._ngZone=e,this._platform=i,i.isBrowser&&(this._containerElement=Mn(r)),o&&o.get(br).load(kP)}fadeInRipple(t,e,r={}){let i=this._containerRect=this._containerRect||this._containerElement.getBoundingClientRect(),o=g(g({},dS),r.animation);r.centered&&(t=i.left+i.width/2,e=i.top+i.height/2);let s=r.radius||OP(t,e,i),a=t-i.left,l=e-i.top,c=o.enterDuration,u=document.createElement("div");u.classList.add("mat-ripple-element"),u.style.left=`${a-s}px`,u.style.top=`${l-s}px`,u.style.height=`${s*2}px`,u.style.width=`${s*2}px`,r.color!=null&&(u.style.backgroundColor=r.color),u.style.transitionDuration=`${c}ms`,this._containerElement.appendChild(u);let d=window.getComputedStyle(u),f=d.transitionProperty,p=d.transitionDuration,m=f==="none"||p==="0s"||p==="0s, 0s"||i.width===0&&i.height===0,v=new Mv(this,u,r,m);u.style.transform="scale3d(1, 1, 1)",v.state=xn.FADING_IN,r.persistent||(this._mostRecentTransientRipple=v);let I=null;return!m&&(c||o.exitDuration)&&this._ngZone.runOutsideAngular(()=>{let R=()=>{I&&(I.fallbackTimer=null),clearTimeout(Pe),this._finishRippleTransition(v)},te=()=>this._destroyRipple(v),Pe=setTimeout(te,c+100);u.addEventListener("transitionend",R),u.addEventListener("transitioncancel",te),I={onTransitionEnd:R,onTransitionCancel:te,fallbackTimer:Pe}}),this._activeRipples.set(v,I),(m||!c)&&this._finishRippleTransition(v),v}fadeOutRipple(t){if(t.state===xn.FADING_OUT||t.state===xn.HIDDEN)return;let e=t.element,r=g(g({},dS),t.config.animation);e.style.transitionDuration=`${r.exitDuration}ms`,e.style.opacity="0",t.state=xn.FADING_OUT,(t._animationForciblyDisabledThroughCss||!r.exitDuration)&&this._finishRippleTransition(t)}fadeOutAll(){this._getActiveRipples().forEach(t=>t.fadeOut())}fadeOutAllNonPersistent(){this._getActiveRipples().forEach(t=>{t.config.persistent||t.fadeOut()})}setupTriggerEvents(t){let e=Mn(t);!this._platform.isBrowser||!e||e===this._triggerElement||(this._removeTriggerEvents(),this._triggerElement=e,hS.forEach(r=>{n._eventManager.addHandler(this._ngZone,r,e,this)}))}handleEvent(t){t.type==="mousedown"?this._onMousedown(t):t.type==="touchstart"?this._onTouchStart(t):this._onPointerUp(),this._pointerUpEventsRegistered||(this._ngZone.runOutsideAngular(()=>{pS.forEach(e=>{this._triggerElement.addEventListener(e,this,fS)})}),this._pointerUpEventsRegistered=!0)}_finishRippleTransition(t){t.state===xn.FADING_IN?this._startFadeOutTransition(t):t.state===xn.FADING_OUT&&this._destroyRipple(t)}_startFadeOutTransition(t){let e=t===this._mostRecentTransientRipple,{persistent:r}=t.config;t.state=xn.VISIBLE,!r&&(!e||!this._isPointerDown)&&t.fadeOut()}_destroyRipple(t){let e=this._activeRipples.get(t)??null;this._activeRipples.delete(t),this._activeRipples.size||(this._containerRect=null),t===this._mostRecentTransientRipple&&(this._mostRecentTransientRipple=null),t.state=xn.HIDDEN,e!==null&&(t.element.removeEventListener("transitionend",e.onTransitionEnd),t.element.removeEventListener("transitioncancel",e.onTransitionCancel),e.fallbackTimer!==null&&clearTimeout(e.fallbackTimer)),t.element.remove()}_onMousedown(t){let e=Ll(t),r=this._lastTouchStartEvent&&Date.now()<this._lastTouchStartEvent+AP;!this._target.rippleDisabled&&!e&&!r&&(this._isPointerDown=!0,this.fadeInRipple(t.clientX,t.clientY,this._target.rippleConfig))}_onTouchStart(t){if(!this._target.rippleDisabled&&!Fl(t)){this._lastTouchStartEvent=Date.now(),this._isPointerDown=!0;let e=t.changedTouches;if(e)for(let r=0;r<e.length;r++)this.fadeInRipple(e[r].clientX,e[r].clientY,this._target.rippleConfig)}}_onPointerUp(){this._isPointerDown&&(this._isPointerDown=!1,this._getActiveRipples().forEach(t=>{let e=t.state===xn.VISIBLE||t.config.terminateOnPointerUp&&t.state===xn.FADING_IN;!t.config.persistent&&e&&t.fadeOut()}))}_getActiveRipples(){return Array.from(this._activeRipples.keys())}_removeTriggerEvents(){let t=this._triggerElement;t&&(hS.forEach(e=>n._eventManager.removeHandler(e,t,this)),this._pointerUpEventsRegistered&&(pS.forEach(e=>t.removeEventListener(e,this,fS)),this._pointerUpEventsRegistered=!1))}};function OP(n,t,e){let r=Math.max(Math.abs(n-e.left),Math.abs(n-e.right)),i=Math.max(Math.abs(t-e.top),Math.abs(t-e.bottom));return Math.sqrt(r*r+i*i)}var mS=new b("mat-ripple-global-options"),Av=(()=>{class n{_elementRef=h(le);_animationsDisabled=Zr();color;unbounded=!1;centered=!1;radius=0;animation;get disabled(){return this._disabled}set disabled(e){e&&this.fadeOutAllNonPersistent(),this._disabled=e,this._setupTriggerEventsIfEnabled()}_disabled=!1;get trigger(){return this._trigger||this._elementRef.nativeElement}set trigger(e){this._trigger=e,this._setupTriggerEventsIfEnabled()}_trigger;_rippleRenderer;_globalOptions;_isInitialized=!1;constructor(){let e=h(V),r=h(Me),i=h(mS,{optional:!0}),o=h(re);this._globalOptions=i||{},this._rippleRenderer=new Rv(this,e,this._elementRef,r,o)}ngOnInit(){this._isInitialized=!0,this._setupTriggerEventsIfEnabled()}ngOnDestroy(){this._rippleRenderer._removeTriggerEvents()}fadeOutAll(){this._rippleRenderer.fadeOutAll()}fadeOutAllNonPersistent(){this._rippleRenderer.fadeOutAllNonPersistent()}get rippleConfig(){return{centered:this.centered,radius:this.radius,color:this.color,animation:g(g(g({},this._globalOptions.animation),this._animationsDisabled?{enterDuration:0,exitDuration:0}:{}),this.animation),terminateOnPointerUp:this._globalOptions.terminateOnPointerUp}}get rippleDisabled(){return this.disabled||!!this._globalOptions.disabled}_setupTriggerEventsIfEnabled(){!this.disabled&&this._isInitialized&&this._rippleRenderer.setupTriggerEvents(this.trigger)}launch(e,r=0,i){return typeof e=="number"?this._rippleRenderer.fadeInRipple(e,r,g(g({},this.rippleConfig),i)):this._rippleRenderer.fadeInRipple(0,0,g(g({},this.rippleConfig),e))}static \u0275fac=function(r){return new(r||n)};static \u0275dir=ye({type:n,selectors:[["","mat-ripple",""],["","matRipple",""]],hostAttrs:[1,"mat-ripple"],hostVars:2,hostBindings:function(r,i){r&2&&Ge("mat-ripple-unbounded",i.unbounded)},inputs:{color:[0,"matRippleColor","color"],unbounded:[0,"matRippleUnbounded","unbounded"],centered:[0,"matRippleCentered","centered"],radius:[0,"matRippleRadius","radius"],animation:[0,"matRippleAnimation","animation"],disabled:[0,"matRippleDisabled","disabled"],trigger:[0,"matRippleTrigger","trigger"]},exportAs:["matRipple"]})}return n})();var Lv=["*"];function LP(n,t){n&1&&lo(0)}var FP=["tabListContainer"],BP=["tabList"],jP=["tabListInner"],VP=["nextPaginator"],UP=["previousPaginator"],$P=["content"];function HP(n,t){}var zP=["tabBodyWrapper"],WP=["tabHeader"];function GP(n,t){}function qP(n,t){if(n&1&&dr(0,GP,0,0,"ng-template",12),n&2){let e=ve().$implicit;ct("cdkPortalOutlet",e.templateLabel)}}function KP(n,t){if(n&1&&B(0),n&2){let e=ve().$implicit;$t(e.textLabel)}}function YP(n,t){if(n&1){let e=gn();w(0,"div",7,2),Oe("click",function(){let i=nt(e),o=i.$implicit,s=i.$index,a=ve(),l=td(1);return rt(a._handleClick(o,l,s))})("cdkFocusChange",function(i){let o=nt(e).$index,s=ve();return rt(s._tabFocusChanged(i,o))}),Ue(2,"span",8)(3,"div",9),w(4,"span",10)(5,"span",11),Je(6,qP,1,1,null,12)(7,KP,1,1),S()()()}if(n&2){let e=t.$implicit,r=t.$index,i=td(1),o=ve();Pr(e.labelClass),Ge("mdc-tab--active",o.selectedIndex===r),ct("id",o._getTabLabelId(e,r))("disabled",e.disabled)("fitInkBarToContent",o.fitInkBarToContent),Vn("tabIndex",o._getTabIndex(r))("aria-posinset",r+1)("aria-setsize",o._tabs.length)("aria-controls",o._getTabContentId(r))("aria-selected",o.selectedIndex===r)("aria-label",e.ariaLabel||null)("aria-labelledby",!e.ariaLabel&&e.ariaLabelledby?e.ariaLabelledby:null),P(3),ct("matRippleTrigger",i)("matRippleDisabled",e.disabled||o.disableRipple),P(3),et(e.templateLabel?6:7)}}function ZP(n,t){n&1&&lo(0)}function XP(n,t){if(n&1){let e=gn();w(0,"mat-tab-body",13),Oe("_onCentered",function(){nt(e);let i=ve();return rt(i._removeTabBodyWrapperHeight())})("_onCentering",function(i){nt(e);let o=ve();return rt(o._setTabBodyWrapperHeight(i))})("_beforeCentering",function(i){nt(e);let o=ve();return rt(o._bodyCentered(i))}),S()}if(n&2){let e=t.$implicit,r=t.$index,i=ve();Pr(e.bodyClass),ct("id",i._getTabContentId(r))("content",e.content)("position",e.position)("animationDuration",i.animationDuration)("preserveContent",i.preserveContent),Vn("tabindex",i.contentTabIndex!=null&&i.selectedIndex===r?i.contentTabIndex:null)("aria-labelledby",i._getTabLabelId(e,r))("aria-hidden",i.selectedIndex!==r)}}var QP=new b("MatTabContent"),JP=(()=>{class n{template=h(At);constructor(){}static \u0275fac=function(r){return new(r||n)};static \u0275dir=ye({type:n,selectors:[["","matTabContent",""]],features:[fr([{provide:QP,useExisting:n}])]})}return n})(),eL=new b("MatTabLabel"),bS=new b("MAT_TAB"),Fv=(()=>{class n extends AT{_closestTab=h(bS,{optional:!0});static \u0275fac=(()=>{let e;return function(i){return(e||(e=hn(n)))(i||n)}})();static \u0275dir=ye({type:n,selectors:[["","mat-tab-label",""],["","matTabLabel",""]],features:[fr([{provide:eL,useExisting:n}]),Jt]})}return n})(),_S=new b("MAT_TAB_GROUP"),Bv=(()=>{class n{_viewContainerRef=h(lt);_closestTabGroup=h(_S,{optional:!0});disabled=!1;get templateLabel(){return this._templateLabel}set templateLabel(e){this._setTemplateLabelInput(e)}_templateLabel;_explicitContent=void 0;_implicitContent;textLabel="";ariaLabel;ariaLabelledby;labelClass;bodyClass;id=null;_contentPortal=null;get content(){return this._contentPortal}_stateChanges=new C;position=null;origin=null;isActive=!1;constructor(){h(br).load(NT)}ngOnChanges(e){(e.hasOwnProperty("textLabel")||e.hasOwnProperty("disabled"))&&this._stateChanges.next()}ngOnDestroy(){this._stateChanges.complete()}ngOnInit(){this._contentPortal=new wo(this._explicitContent||this._implicitContent,this._viewContainerRef)}_setTemplateLabelInput(e){e&&e._closestTab===this&&(this._templateLabel=e)}static \u0275fac=function(r){return new(r||n)};static \u0275cmp=ge({type:n,selectors:[["mat-tab"]],contentQueries:function(r,i,o){if(r&1&&ps(o,Fv,5)(o,JP,7,At),r&2){let s;ze(s=We())&&(i.templateLabel=s.first),ze(s=We())&&(i._explicitContent=s.first)}},viewQuery:function(r,i){if(r&1&&Un(At,7),r&2){let o;ze(o=We())&&(i._implicitContent=o.first)}},hostAttrs:["hidden",""],hostVars:1,hostBindings:function(r,i){r&2&&Vn("id",null)},inputs:{disabled:[2,"disabled","disabled",tt],textLabel:[0,"label","textLabel"],ariaLabel:[0,"aria-label","ariaLabel"],ariaLabelledby:[0,"aria-labelledby","ariaLabelledby"],labelClass:"labelClass",bodyClass:"bodyClass",id:"id"},exportAs:["matTab"],features:[fr([{provide:bS,useExisting:n}]),cr],ngContentSelectors:Lv,decls:1,vars:0,template:function(r,i){r&1&&(ao(),Gu(0,LP,1,0,"ng-template"))},encapsulation:2})}return n})(),kv="mdc-tab-indicator--active",gS="mdc-tab-indicator--no-transition",Ov=class{_items;_currentItem;constructor(t){this._items=t}hide(){this._items.forEach(t=>t.deactivateInkBar()),this._currentItem=void 0}alignToElement(t){let e=this._items.find(i=>i.elementRef.nativeElement===t),r=this._currentItem;if(e!==r&&(r?.deactivateInkBar(),e)){let i=r?.elementRef.nativeElement.getBoundingClientRect?.();e.activateInkBar(i),this._currentItem=e}}},tL=(()=>{class n{_elementRef=h(le);_inkBarElement=null;_inkBarContentElement=null;_fitToContent=!1;get fitInkBarToContent(){return this._fitToContent}set fitInkBarToContent(e){this._fitToContent!==e&&(this._fitToContent=e,this._inkBarElement&&this._appendInkBarElement())}activateInkBar(e){let r=this._elementRef.nativeElement;if(!e||!r.getBoundingClientRect||!this._inkBarContentElement){r.classList.add(kv);return}let i=r.getBoundingClientRect(),o=e.width/i.width,s=e.left-i.left;r.classList.add(gS),this._inkBarContentElement.style.setProperty("transform",`translateX(${s}px) scaleX(${o})`),r.getBoundingClientRect(),r.classList.remove(gS),r.classList.add(kv),this._inkBarContentElement.style.setProperty("transform","")}deactivateInkBar(){this._elementRef.nativeElement.classList.remove(kv)}ngOnInit(){this._createInkBarElement()}ngOnDestroy(){this._inkBarElement?.remove(),this._inkBarElement=this._inkBarContentElement=null}_createInkBarElement(){let e=this._elementRef.nativeElement.ownerDocument||document,r=this._inkBarElement=e.createElement("span"),i=this._inkBarContentElement=e.createElement("span");r.className="mdc-tab-indicator",i.className="mdc-tab-indicator__content mdc-tab-indicator__content--underline",r.appendChild(this._inkBarContentElement),this._appendInkBarElement()}_appendInkBarElement(){this._inkBarElement;let e=this._fitToContent?this._elementRef.nativeElement.querySelector(".mdc-tab__content"):this._elementRef.nativeElement;e.appendChild(this._inkBarElement)}static \u0275fac=function(r){return new(r||n)};static \u0275dir=ye({type:n,inputs:{fitInkBarToContent:[2,"fitInkBarToContent","fitInkBarToContent",tt]}})}return n})();var CS=(()=>{class n extends tL{elementRef=h(le);disabled=!1;focus(){this.elementRef.nativeElement.focus()}getOffsetLeft(){return this.elementRef.nativeElement.offsetLeft}getOffsetWidth(){return this.elementRef.nativeElement.offsetWidth}static \u0275fac=(()=>{let e;return function(i){return(e||(e=hn(n)))(i||n)}})();static \u0275dir=ye({type:n,selectors:[["","matTabLabelWrapper",""]],hostVars:3,hostBindings:function(r,i){r&2&&(Vn("aria-disabled",!!i.disabled),Ge("mat-mdc-tab-disabled",i.disabled))},inputs:{disabled:[2,"disabled","disabled",tt]},features:[Jt]})}return n})(),yS={passive:!0},nL=650,rL=100,iL=(()=>{class n{_elementRef=h(le);_changeDetectorRef=h(Hn);_viewportRuler=h(Yr);_dir=h(_r,{optional:!0});_ngZone=h(V);_platform=h(Me);_sharedResizeObserver=h(rS);_injector=h(re);_renderer=h(jn);_animationsDisabled=Zr();_eventCleanups;_scrollDistance=0;_selectedIndexChanged=!1;_destroyed=new C;_showPaginationControls=!1;_disableScrollAfter=!0;_disableScrollBefore=!0;_tabLabelCount;_scrollDistanceChanged=!1;_keyManager;_currentTextContent;_stopScrolling=new C;disablePagination=!1;get selectedIndex(){return this._selectedIndex}set selectedIndex(e){let r=isNaN(e)?0:e;this._selectedIndex!=r&&(this._selectedIndexChanged=!0,this._selectedIndex=r,this._keyManager&&this._keyManager.updateActiveItem(r))}_selectedIndex=0;selectFocusedIndex=new ne;indexFocused=new ne;constructor(){this._eventCleanups=this._ngZone.runOutsideAngular(()=>[this._renderer.listen(this._elementRef.nativeElement,"mouseleave",()=>this._stopInterval())])}ngAfterViewInit(){this._eventCleanups.push(this._renderer.listen(this._previousPaginator.nativeElement,"touchstart",()=>this._handlePaginatorPress("before"),yS),this._renderer.listen(this._nextPaginator.nativeElement,"touchstart",()=>this._handlePaginatorPress("after"),yS))}ngAfterContentInit(){let e=this._dir?this._dir.change:x("ltr"),r=this._sharedResizeObserver.observe(this._elementRef.nativeElement).pipe(Tr(32),J(this._destroyed)),i=this._viewportRuler.change(150).pipe(J(this._destroyed)),o=()=>{this.updatePagination(),this._alignInkBarToSelectedTab()};this._keyManager=new Ul(this._items).withHorizontalOrientation(this._getLayoutDirection()).withHomeAndEnd().withWrap().skipPredicate(()=>!1),this._keyManager.updateActiveItem(Math.max(this._selectedIndex,0)),_t(o,{injector:this._injector}),la(e,i,r,this._items.changes,this._itemsResized()).pipe(J(this._destroyed)).subscribe(()=>{this._ngZone.run(()=>{Promise.resolve().then(()=>{this._scrollDistance=Math.max(0,Math.min(this._getMaxScrollDistance(),this._scrollDistance)),o()})}),this._keyManager?.withHorizontalOrientation(this._getLayoutDirection())}),this._keyManager.change.subscribe(s=>{this.indexFocused.emit(s),this._setTabFocus(s)})}_itemsResized(){return typeof ResizeObserver!="function"?Ce:this._items.changes.pipe(an(this._items),St(e=>new N(r=>this._ngZone.runOutsideAngular(()=>{let i=new ResizeObserver(o=>r.next(o));return e.forEach(o=>i.observe(o.elementRef.nativeElement)),()=>{i.disconnect()}}))),Fi(1),be(e=>e.some(r=>r.contentRect.width>0&&r.contentRect.height>0)))}ngAfterContentChecked(){this._tabLabelCount!=this._items.length&&(this.updatePagination(),this._tabLabelCount=this._items.length,this._changeDetectorRef.markForCheck()),this._selectedIndexChanged&&(this._scrollToLabel(this._selectedIndex),this._checkScrollingControls(),this._alignInkBarToSelectedTab(),this._selectedIndexChanged=!1,this._changeDetectorRef.markForCheck()),this._scrollDistanceChanged&&(this._updateTabScrollPosition(),this._scrollDistanceChanged=!1,this._changeDetectorRef.markForCheck())}ngOnDestroy(){this._eventCleanups.forEach(e=>e()),this._keyManager?.destroy(),this._destroyed.next(),this._destroyed.complete(),this._stopScrolling.complete()}_handleKeydown(e){if(!$s(e))switch(e.keyCode){case 13:case 32:if(this.focusIndex!==this.selectedIndex){let r=this._items.get(this.focusIndex);r&&!r.disabled&&(this.selectFocusedIndex.emit(this.focusIndex),this._itemSelected(e))}break;default:this._keyManager?.onKeydown(e)}}_onContentChanges(){let e=this._elementRef.nativeElement.textContent;e!==this._currentTextContent&&(this._currentTextContent=e||"",this._ngZone.run(()=>{this.updatePagination(),this._alignInkBarToSelectedTab(),this._changeDetectorRef.markForCheck()}))}updatePagination(){this._checkPaginationEnabled(),this._checkScrollingControls(),this._updateTabScrollPosition()}get focusIndex(){return this._keyManager?this._keyManager.activeItemIndex:0}set focusIndex(e){!this._isValidIndex(e)||this.focusIndex===e||!this._keyManager||this._keyManager.setActiveItem(e)}_isValidIndex(e){return this._items?!!this._items.toArray()[e]:!0}_setTabFocus(e){if(this._showPaginationControls&&this._scrollToLabel(e),this._items&&this._items.length){this._items.toArray()[e].focus();let r=this._tabListContainer.nativeElement;this._getLayoutDirection()=="ltr"?r.scrollLeft=0:r.scrollLeft=r.scrollWidth-r.offsetWidth}}_getLayoutDirection(){return this._dir&&this._dir.value==="rtl"?"rtl":"ltr"}_updateTabScrollPosition(){if(this.disablePagination)return;let e=this.scrollDistance,r=this._getLayoutDirection()==="ltr"?-e:e;this._tabList.nativeElement.style.transform=`translateX(${Math.round(r)}px)`,(this._platform.TRIDENT||this._platform.EDGE)&&(this._tabListContainer.nativeElement.scrollLeft=0)}get scrollDistance(){return this._scrollDistance}set scrollDistance(e){this._scrollTo(e)}_scrollHeader(e){let r=this._tabListContainer.nativeElement.offsetWidth,i=(e=="before"?-1:1)*r/3;return this._scrollTo(this._scrollDistance+i)}_handlePaginatorClick(e){this._stopInterval(),this._scrollHeader(e)}_scrollToLabel(e){if(this.disablePagination)return;let r=this._items?this._items.toArray()[e]:null;if(!r)return;let i=this._tabListContainer.nativeElement.offsetWidth,{offsetLeft:o,offsetWidth:s}=r.elementRef.nativeElement,a,l;this._getLayoutDirection()=="ltr"?(a=o,l=a+s):(l=this._tabListInner.nativeElement.offsetWidth-o,a=l-s);let c=this.scrollDistance,u=this.scrollDistance+i;a<c?this.scrollDistance-=c-a:l>u&&(this.scrollDistance+=Math.min(l-u,a-c))}_checkPaginationEnabled(){if(this.disablePagination)this._showPaginationControls=!1;else{let e=this._tabListInner.nativeElement.scrollWidth,r=this._elementRef.nativeElement.offsetWidth,i=e-r>=5;i||(this.scrollDistance=0),i!==this._showPaginationControls&&(this._showPaginationControls=i,this._changeDetectorRef.markForCheck())}}_checkScrollingControls(){this.disablePagination?this._disableScrollAfter=this._disableScrollBefore=!0:(this._disableScrollBefore=this.scrollDistance==0,this._disableScrollAfter=this.scrollDistance==this._getMaxScrollDistance(),this._changeDetectorRef.markForCheck())}_getMaxScrollDistance(){let e=this._tabListInner.nativeElement.scrollWidth,r=this._tabListContainer.nativeElement.offsetWidth;return e-r||0}_alignInkBarToSelectedTab(){let e=this._items&&this._items.length?this._items.toArray()[this.selectedIndex]:null,r=e?e.elementRef.nativeElement:null;r?this._inkBar.alignToElement(r):this._inkBar.hide()}_stopInterval(){this._stopScrolling.next()}_handlePaginatorPress(e,r){r&&r.button!=null&&r.button!==0||(this._stopInterval(),aa(nL,rL).pipe(J(la(this._stopScrolling,this._destroyed))).subscribe(()=>{let{maxScrollDistance:i,distance:o}=this._scrollHeader(e);(o===0||o>=i)&&this._stopInterval()}))}_scrollTo(e){if(this.disablePagination)return{maxScrollDistance:0,distance:0};let r=this._getMaxScrollDistance();return this._scrollDistance=Math.max(0,Math.min(r,e)),this._scrollDistanceChanged=!0,this._checkScrollingControls(),{maxScrollDistance:r,distance:this._scrollDistance}}static \u0275fac=function(r){return new(r||n)};static \u0275dir=ye({type:n,inputs:{disablePagination:[2,"disablePagination","disablePagination",tt],selectedIndex:[2,"selectedIndex","selectedIndex",ld]},outputs:{selectFocusedIndex:"selectFocusedIndex",indexFocused:"indexFocused"}})}return n})(),oL=(()=>{class n extends iL{_items;_tabListContainer;_tabList;_tabListInner;_nextPaginator;_previousPaginator;_inkBar;ariaLabel;ariaLabelledby;disableRipple=!1;ngAfterContentInit(){this._inkBar=new Ov(this._items),super.ngAfterContentInit()}_itemSelected(e){e.preventDefault()}static \u0275fac=(()=>{let e;return function(i){return(e||(e=hn(n)))(i||n)}})();static \u0275cmp=ge({type:n,selectors:[["mat-tab-header"]],contentQueries:function(r,i,o){if(r&1&&ps(o,CS,4),r&2){let s;ze(s=We())&&(i._items=s)}},viewQuery:function(r,i){if(r&1&&Un(FP,7)(BP,7)(jP,7)(VP,5)(UP,5),r&2){let o;ze(o=We())&&(i._tabListContainer=o.first),ze(o=We())&&(i._tabList=o.first),ze(o=We())&&(i._tabListInner=o.first),ze(o=We())&&(i._nextPaginator=o.first),ze(o=We())&&(i._previousPaginator=o.first)}},hostAttrs:[1,"mat-mdc-tab-header"],hostVars:4,hostBindings:function(r,i){r&2&&Ge("mat-mdc-tab-header-pagination-controls-enabled",i._showPaginationControls)("mat-mdc-tab-header-rtl",i._getLayoutDirection()=="rtl")},inputs:{ariaLabel:[0,"aria-label","ariaLabel"],ariaLabelledby:[0,"aria-labelledby","ariaLabelledby"],disableRipple:[2,"disableRipple","disableRipple",tt]},features:[Jt],ngContentSelectors:Lv,decls:13,vars:10,consts:[["previousPaginator",""],["tabListContainer",""],["tabList",""],["tabListInner",""],["nextPaginator",""],["mat-ripple","",1,"mat-mdc-tab-header-pagination","mat-mdc-tab-header-pagination-before",3,"click","mousedown","touchend","matRippleDisabled"],[1,"mat-mdc-tab-header-pagination-chevron"],[1,"mat-mdc-tab-label-container",3,"keydown"],["role","tablist",1,"mat-mdc-tab-list",3,"cdkObserveContent"],[1,"mat-mdc-tab-labels"],["mat-ripple","",1,"mat-mdc-tab-header-pagination","mat-mdc-tab-header-pagination-after",3,"mousedown","click","touchend","matRippleDisabled"]],template:function(r,i){r&1&&(ao(),w(0,"div",5,0),Oe("click",function(){return i._handlePaginatorClick("before")})("mousedown",function(s){return i._handlePaginatorPress("before",s)})("touchend",function(){return i._stopInterval()}),Ue(2,"div",6),S(),w(3,"div",7,1),Oe("keydown",function(s){return i._handleKeydown(s)}),w(5,"div",8,2),Oe("cdkObserveContent",function(){return i._onContentChanges()}),w(7,"div",9,3),lo(9),S()()(),w(10,"div",10,4),Oe("mousedown",function(s){return i._handlePaginatorPress("after",s)})("click",function(){return i._handlePaginatorClick("after")})("touchend",function(){return i._stopInterval()}),Ue(12,"div",6),S()),r&2&&(Ge("mat-mdc-tab-header-pagination-disabled",i._disableScrollBefore),ct("matRippleDisabled",i._disableScrollBefore||i.disableRipple),P(3),Ge("_mat-animation-noopable",i._animationsDisabled),P(2),Vn("aria-label",i.ariaLabel||null)("aria-labelledby",i.ariaLabelledby||null),P(5),Ge("mat-mdc-tab-header-pagination-disabled",i._disableScrollAfter),ct("matRippleDisabled",i._disableScrollAfter||i.disableRipple))},dependencies:[Av,qT],styles:[`.mat-mdc-tab-header {
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
`],encapsulation:2})}return n})(),sL=new b("MAT_TABS_CONFIG"),vS=(()=>{class n extends cv{_host=h(Nv);_ngZone=h(V);_centeringSub=Z.EMPTY;_leavingSub=Z.EMPTY;constructor(){super()}ngOnInit(){super.ngOnInit(),this._centeringSub=this._host._beforeCentering.pipe(an(this._host._isCenterPosition())).subscribe(e=>{this._host._content&&e&&!this.hasAttached()&&this._ngZone.run(()=>{Promise.resolve().then(),this.attach(this._host._content)})}),this._leavingSub=this._host._afterLeavingCenter.subscribe(()=>{this._host.preserveContent||this._ngZone.run(()=>this.detach())})}ngOnDestroy(){super.ngOnDestroy(),this._centeringSub.unsubscribe(),this._leavingSub.unsubscribe()}static \u0275fac=function(r){return new(r||n)};static \u0275dir=ye({type:n,selectors:[["","matTabBodyHost",""]],features:[Jt]})}return n})(),Nv=(()=>{class n{_elementRef=h(le);_dir=h(_r,{optional:!0});_ngZone=h(V);_injector=h(re);_renderer=h(jn);_diAnimationsDisabled=Zr();_eventCleanups;_initialized=!1;_fallbackTimer;_positionIndex;_dirChangeSubscription=Z.EMPTY;_position;_previousPosition;_onCentering=new ne;_beforeCentering=new ne;_afterLeavingCenter=new ne;_onCentered=new ne(!0);_portalHost;_contentElement;_content;animationDuration="500ms";preserveContent=!1;set position(e){this._positionIndex=e,this._computePositionAnimationState()}constructor(){if(this._dir){let e=h(Hn);this._dirChangeSubscription=this._dir.change.subscribe(r=>{this._computePositionAnimationState(r),e.markForCheck()})}}ngOnInit(){this._bindTransitionEvents(),this._position==="center"&&(this._setActiveClass(!0),_t(()=>this._onCentering.emit(this._elementRef.nativeElement.clientHeight),{injector:this._injector})),this._initialized=!0}ngOnDestroy(){clearTimeout(this._fallbackTimer),this._eventCleanups?.forEach(e=>e()),this._dirChangeSubscription.unsubscribe()}_bindTransitionEvents(){this._ngZone.runOutsideAngular(()=>{let e=this._elementRef.nativeElement,r=i=>{i.target===this._contentElement?.nativeElement&&(this._elementRef.nativeElement.classList.remove("mat-tab-body-animating"),i.type==="transitionend"&&this._transitionDone())};this._eventCleanups=[this._renderer.listen(e,"transitionstart",i=>{i.target===this._contentElement?.nativeElement&&(this._elementRef.nativeElement.classList.add("mat-tab-body-animating"),this._transitionStarted())}),this._renderer.listen(e,"transitionend",r),this._renderer.listen(e,"transitioncancel",r)]})}_transitionStarted(){clearTimeout(this._fallbackTimer);let e=this._position==="center";this._beforeCentering.emit(e),e&&this._onCentering.emit(this._elementRef.nativeElement.clientHeight)}_transitionDone(){this._position==="center"?this._onCentered.emit():this._previousPosition==="center"&&this._afterLeavingCenter.emit()}_setActiveClass(e){this._elementRef.nativeElement.classList.toggle("mat-mdc-tab-body-active",e)}_getLayoutDirection(){return this._dir&&this._dir.value==="rtl"?"rtl":"ltr"}_isCenterPosition(){return this._positionIndex===0}_computePositionAnimationState(e=this._getLayoutDirection()){this._previousPosition=this._position,this._positionIndex<0?this._position=e=="ltr"?"left":"right":this._positionIndex>0?this._position=e=="ltr"?"right":"left":this._position="center",this._animationsDisabled()?this._simulateTransitionEvents():this._initialized&&(this._position==="center"||this._previousPosition==="center")&&(clearTimeout(this._fallbackTimer),this._fallbackTimer=this._ngZone.runOutsideAngular(()=>setTimeout(()=>this._simulateTransitionEvents(),100)))}_simulateTransitionEvents(){this._transitionStarted(),_t(()=>this._transitionDone(),{injector:this._injector})}_animationsDisabled(){return this._diAnimationsDisabled||this.animationDuration==="0ms"||this.animationDuration==="0s"}static \u0275fac=function(r){return new(r||n)};static \u0275cmp=ge({type:n,selectors:[["mat-tab-body"]],viewQuery:function(r,i){if(r&1&&Un(vS,5)($P,5),r&2){let o;ze(o=We())&&(i._portalHost=o.first),ze(o=We())&&(i._contentElement=o.first)}},hostAttrs:[1,"mat-mdc-tab-body"],hostVars:1,hostBindings:function(r,i){r&2&&Vn("inert",i._position==="center"?null:"")},inputs:{_content:[0,"content","_content"],animationDuration:"animationDuration",preserveContent:"preserveContent",position:"position"},outputs:{_onCentering:"_onCentering",_beforeCentering:"_beforeCentering",_onCentered:"_onCentered"},decls:3,vars:6,consts:[["content",""],["cdkScrollable","",1,"mat-mdc-tab-body-content"],["matTabBodyHost",""]],template:function(r,i){r&1&&(w(0,"div",1,0),dr(2,HP,0,0,"ng-template",2),S()),r&2&&Ge("mat-tab-body-content-left",i._position==="left")("mat-tab-body-content-right",i._position==="right")("mat-tab-body-content-can-animate",i._position==="center"||i._previousPosition==="center")},dependencies:[vS,zl],styles:[`.mat-mdc-tab-body {
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
`],encapsulation:2})}return n})(),ES=(()=>{class n{_elementRef=h(le);_changeDetectorRef=h(Hn);_ngZone=h(V);_tabsSubscription=Z.EMPTY;_tabLabelSubscription=Z.EMPTY;_tabBodySubscription=Z.EMPTY;_diAnimationsDisabled=Zr();_allTabs;_tabBodies;_tabBodyWrapper;_tabHeader;_tabs=new Or;_indexToSelect=0;_lastFocusedTabIndex=null;_tabBodyWrapperHeight=0;color;get fitInkBarToContent(){return this._fitInkBarToContent}set fitInkBarToContent(e){this._fitInkBarToContent=e,this._changeDetectorRef.markForCheck()}_fitInkBarToContent=!1;stretchTabs=!0;alignTabs=null;dynamicHeight=!1;get selectedIndex(){return this._selectedIndex}set selectedIndex(e){this._indexToSelect=isNaN(e)?null:e}_selectedIndex=null;headerPosition="above";get animationDuration(){return this._animationDuration}set animationDuration(e){let r=e+"";this._animationDuration=/^\d+$/.test(r)?e+"ms":r}_animationDuration;get contentTabIndex(){return this._contentTabIndex}set contentTabIndex(e){this._contentTabIndex=isNaN(e)?null:e}_contentTabIndex=null;disablePagination=!1;disableRipple=!1;preserveContent=!1;get backgroundColor(){return this._backgroundColor}set backgroundColor(e){let r=this._elementRef.nativeElement.classList;r.remove("mat-tabs-with-background",`mat-background-${this.backgroundColor}`),e&&r.add("mat-tabs-with-background",`mat-background-${e}`),this._backgroundColor=e}_backgroundColor;ariaLabel;ariaLabelledby;selectedIndexChange=new ne;focusChange=new ne;animationDone=new ne;selectedTabChange=new ne(!0);_groupId;_isServer=!h(Me).isBrowser;constructor(){let e=h(sL,{optional:!0});this._groupId=h(So).getId("mat-tab-group-"),this.animationDuration=e&&e.animationDuration?e.animationDuration:"500ms",this.disablePagination=e&&e.disablePagination!=null?e.disablePagination:!1,this.dynamicHeight=e&&e.dynamicHeight!=null?e.dynamicHeight:!1,e?.contentTabIndex!=null&&(this.contentTabIndex=e.contentTabIndex),this.preserveContent=!!e?.preserveContent,this.fitInkBarToContent=e&&e.fitInkBarToContent!=null?e.fitInkBarToContent:!1,this.stretchTabs=e&&e.stretchTabs!=null?e.stretchTabs:!0,this.alignTabs=e&&e.alignTabs!=null?e.alignTabs:null}ngAfterContentChecked(){let e=this._indexToSelect=this._clampTabIndex(this._indexToSelect);if(this._selectedIndex!=e){let r=this._selectedIndex==null;if(!r){this.selectedTabChange.emit(this._createChangeEvent(e));let i=this._tabBodyWrapper.nativeElement;i.style.minHeight=i.clientHeight+"px"}Promise.resolve().then(()=>{this._tabs.forEach((i,o)=>i.isActive=o===e),r||(this.selectedIndexChange.emit(e),this._tabBodyWrapper.nativeElement.style.minHeight="")})}this._tabs.forEach((r,i)=>{r.position=i-e,this._selectedIndex!=null&&r.position==0&&!r.origin&&(r.origin=e-this._selectedIndex)}),this._selectedIndex!==e&&(this._selectedIndex=e,this._lastFocusedTabIndex=null,this._changeDetectorRef.markForCheck())}ngAfterContentInit(){this._subscribeToAllTabChanges(),this._subscribeToTabLabels(),this._tabsSubscription=this._tabs.changes.subscribe(()=>{let e=this._clampTabIndex(this._indexToSelect);if(e===this._selectedIndex){let r=this._tabs.toArray(),i;for(let o=0;o<r.length;o++)if(r[o].isActive){this._indexToSelect=this._selectedIndex=o,this._lastFocusedTabIndex=null,i=r[o];break}!i&&r[e]&&Promise.resolve().then(()=>{r[e].isActive=!0,this.selectedTabChange.emit(this._createChangeEvent(e))})}this._changeDetectorRef.markForCheck()})}ngAfterViewInit(){this._tabBodySubscription=this._tabBodies.changes.subscribe(()=>this._bodyCentered(!0))}_subscribeToAllTabChanges(){this._allTabs.changes.pipe(an(this._allTabs)).subscribe(e=>{this._tabs.reset(e.filter(r=>r._closestTabGroup===this||!r._closestTabGroup)),this._tabs.notifyOnChanges()})}ngOnDestroy(){this._tabs.destroy(),this._tabsSubscription.unsubscribe(),this._tabLabelSubscription.unsubscribe(),this._tabBodySubscription.unsubscribe()}realignInkBar(){this._tabHeader&&this._tabHeader._alignInkBarToSelectedTab()}updatePagination(){this._tabHeader&&this._tabHeader.updatePagination()}focusTab(e){let r=this._tabHeader;r&&(r.focusIndex=e)}_focusChanged(e){this._lastFocusedTabIndex=e,this.focusChange.emit(this._createChangeEvent(e))}_createChangeEvent(e){let r=new Pv;return r.index=e,this._tabs&&this._tabs.length&&(r.tab=this._tabs.toArray()[e]),r}_subscribeToTabLabels(){this._tabLabelSubscription&&this._tabLabelSubscription.unsubscribe(),this._tabLabelSubscription=la(...this._tabs.map(e=>e._stateChanges)).subscribe(()=>this._changeDetectorRef.markForCheck())}_clampTabIndex(e){return Math.min(this._tabs.length-1,Math.max(e||0,0))}_getTabLabelId(e,r){return e.id||`${this._groupId}-label-${r}`}_getTabContentId(e){return`${this._groupId}-content-${e}`}_setTabBodyWrapperHeight(e){if(!this.dynamicHeight||!this._tabBodyWrapperHeight){this._tabBodyWrapperHeight=e;return}let r=this._tabBodyWrapper.nativeElement;r.style.height=this._tabBodyWrapperHeight+"px",this._tabBodyWrapper.nativeElement.offsetHeight&&(r.style.height=e+"px")}_removeTabBodyWrapperHeight(){let e=this._tabBodyWrapper.nativeElement;this._tabBodyWrapperHeight=e.clientHeight,e.style.height="",this._ngZone.run(()=>this.animationDone.emit())}_handleClick(e,r,i){r.focusIndex=i,e.disabled||(this.selectedIndex=i)}_getTabIndex(e){let r=this._lastFocusedTabIndex??this.selectedIndex;return e===r?0:-1}_tabFocusChanged(e,r){e&&e!=="mouse"&&e!=="touch"&&(this._tabHeader.focusIndex=r)}_bodyCentered(e){e&&this._tabBodies?.forEach((r,i)=>r._setActiveClass(i===this._selectedIndex))}_animationsDisabled(){return this._diAnimationsDisabled||this.animationDuration==="0"||this.animationDuration==="0ms"}static \u0275fac=function(r){return new(r||n)};static \u0275cmp=ge({type:n,selectors:[["mat-tab-group"]],contentQueries:function(r,i,o){if(r&1&&ps(o,Bv,5),r&2){let s;ze(s=We())&&(i._allTabs=s)}},viewQuery:function(r,i){if(r&1&&Un(zP,5)(WP,5)(Nv,5),r&2){let o;ze(o=We())&&(i._tabBodyWrapper=o.first),ze(o=We())&&(i._tabHeader=o.first),ze(o=We())&&(i._tabBodies=o)}},hostAttrs:[1,"mat-mdc-tab-group"],hostVars:11,hostBindings:function(r,i){r&2&&(Vn("mat-align-tabs",i.alignTabs),Pr("mat-"+(i.color||"primary")),ms("--mat-tab-animation-duration",i.animationDuration),Ge("mat-mdc-tab-group-dynamic-height",i.dynamicHeight)("mat-mdc-tab-group-inverted-header",i.headerPosition==="below")("mat-mdc-tab-group-stretch-tabs",i.stretchTabs))},inputs:{color:"color",fitInkBarToContent:[2,"fitInkBarToContent","fitInkBarToContent",tt],stretchTabs:[2,"mat-stretch-tabs","stretchTabs",tt],alignTabs:[0,"mat-align-tabs","alignTabs"],dynamicHeight:[2,"dynamicHeight","dynamicHeight",tt],selectedIndex:[2,"selectedIndex","selectedIndex",ld],headerPosition:"headerPosition",animationDuration:"animationDuration",contentTabIndex:[2,"contentTabIndex","contentTabIndex",ld],disablePagination:[2,"disablePagination","disablePagination",tt],disableRipple:[2,"disableRipple","disableRipple",tt],preserveContent:[2,"preserveContent","preserveContent",tt],backgroundColor:"backgroundColor",ariaLabel:[0,"aria-label","ariaLabel"],ariaLabelledby:[0,"aria-labelledby","ariaLabelledby"]},outputs:{selectedIndexChange:"selectedIndexChange",focusChange:"focusChange",animationDone:"animationDone",selectedTabChange:"selectedTabChange"},exportAs:["matTabGroup"],features:[fr([{provide:_S,useExisting:n}])],ngContentSelectors:Lv,decls:9,vars:8,consts:[["tabHeader",""],["tabBodyWrapper",""],["tabNode",""],[3,"indexFocused","selectFocusedIndex","selectedIndex","disableRipple","disablePagination","aria-label","aria-labelledby"],["role","tab","matTabLabelWrapper","","cdkMonitorElementFocus","",1,"mdc-tab","mat-mdc-tab","mat-focus-indicator",3,"id","mdc-tab--active","class","disabled","fitInkBarToContent"],[1,"mat-mdc-tab-body-wrapper"],["role","tabpanel",3,"id","class","content","position","animationDuration","preserveContent"],["role","tab","matTabLabelWrapper","","cdkMonitorElementFocus","",1,"mdc-tab","mat-mdc-tab","mat-focus-indicator",3,"click","cdkFocusChange","id","disabled","fitInkBarToContent"],[1,"mdc-tab__ripple"],["mat-ripple","",1,"mat-mdc-tab-ripple",3,"matRippleTrigger","matRippleDisabled"],[1,"mdc-tab__content"],[1,"mdc-tab__text-label"],[3,"cdkPortalOutlet"],["role","tabpanel",3,"_onCentered","_onCentering","_beforeCentering","id","content","position","animationDuration","preserveContent"]],template:function(r,i){r&1&&(ao(),w(0,"mat-tab-header",3,0),Oe("indexFocused",function(s){return i._focusChanged(s)})("selectFocusedIndex",function(s){return i.selectedIndex=s}),Xu(2,YP,8,17,"div",4,Zu),S(),Je(4,ZP,1,0),w(5,"div",5,1),Xu(7,XP,1,10,"mat-tab-body",6,Zu),S()),r&2&&(ct("selectedIndex",i.selectedIndex||0)("disableRipple",i.disableRipple)("disablePagination",i.disablePagination),Yu("aria-label",i.ariaLabel)("aria-labelledby",i.ariaLabelledby),P(2),Qu(i._tabs),P(2),et(i._isServer?4:-1),P(),Ge("_mat-animation-noopable",i._animationsDisabled()),P(2),Qu(i._tabs))},dependencies:[oL,CS,pv,Av,cv,Nv],styles:[`.mdc-tab {
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
`],encapsulation:2})}return n})(),Pv=class{index;tab};var DS=(()=>{class n{static \u0275fac=function(r){return new(r||n)};static \u0275mod=Ve({type:n});static \u0275inj=Ae({imports:[Kr]})}return n})();var wS=Mf();function AS(n){return new kf(n.get(Yr),n.get(Q))}var kf=class{_viewportRuler;_previousHTMLStyles={top:"",left:""};_previousScrollPosition;_isEnabled=!1;_document;constructor(t,e){this._viewportRuler=t,this._document=e}attach(){}enable(){if(this._canBeEnabled()){let t=this._document.documentElement;this._previousScrollPosition=this._viewportRuler.getViewportScrollPosition(),this._previousHTMLStyles.left=t.style.left||"",this._previousHTMLStyles.top=t.style.top||"",t.style.left=qe(-this._previousScrollPosition.left),t.style.top=qe(-this._previousScrollPosition.top),t.classList.add("cdk-global-scrollblock"),this._isEnabled=!0}}disable(){if(this._isEnabled){let t=this._document.documentElement,e=this._document.body,r=t.style,i=e.style,o=r.scrollBehavior||"",s=i.scrollBehavior||"";this._isEnabled=!1,r.left=this._previousHTMLStyles.left,r.top=this._previousHTMLStyles.top,t.classList.remove("cdk-global-scrollblock"),wS&&(r.scrollBehavior=i.scrollBehavior="auto"),window.scroll(this._previousScrollPosition.left,this._previousScrollPosition.top),wS&&(r.scrollBehavior=o,i.scrollBehavior=s)}}_canBeEnabled(){if(this._document.documentElement.classList.contains("cdk-global-scrollblock")||this._isEnabled)return!1;let e=this._document.documentElement,r=this._viewportRuler.getViewportSize();return e.scrollHeight>r.height||e.scrollWidth>r.width}};function kS(n,t){return new Of(n.get(Mo),n.get(V),n.get(Yr),t)}var Of=class{_scrollDispatcher;_ngZone;_viewportRuler;_config;_scrollSubscription=null;_overlayRef;_initialScrollPosition;constructor(t,e,r,i){this._scrollDispatcher=t,this._ngZone=e,this._viewportRuler=r,this._config=i}attach(t){this._overlayRef,this._overlayRef=t}enable(){if(this._scrollSubscription)return;let t=this._scrollDispatcher.scrolled(0).pipe(be(e=>!e||!this._overlayRef.overlayElement.contains(e.getElementRef().nativeElement)));this._config&&this._config.threshold&&this._config.threshold>1?(this._initialScrollPosition=this._viewportRuler.getViewportScrollPosition().top,this._scrollSubscription=t.subscribe(()=>{let e=this._viewportRuler.getViewportScrollPosition().top;Math.abs(e-this._initialScrollPosition)>this._config.threshold?this._detach():this._overlayRef.updatePosition()})):this._scrollSubscription=t.subscribe(this._detach)}disable(){this._scrollSubscription&&(this._scrollSubscription.unsubscribe(),this._scrollSubscription=null)}detach(){this.disable(),this._overlayRef=null}_detach=()=>{this.disable(),this._overlayRef.hasAttached()&&this._ngZone.run(()=>this._overlayRef.detach())}};var Gl=class{enable(){}disable(){}attach(){}};function jv(n,t){return t.some(e=>{let r=n.bottom<e.top,i=n.top>e.bottom,o=n.right<e.left,s=n.left>e.right;return r||i||o||s})}function TS(n,t){return t.some(e=>{let r=n.top<e.top,i=n.bottom>e.bottom,o=n.left<e.left,s=n.right>e.right;return r||i||o||s})}function Vf(n,t){return new Nf(n.get(Mo),n.get(Yr),n.get(V),t)}var Nf=class{_scrollDispatcher;_viewportRuler;_ngZone;_config;_scrollSubscription=null;_overlayRef;constructor(t,e,r,i){this._scrollDispatcher=t,this._viewportRuler=e,this._ngZone=r,this._config=i}attach(t){this._overlayRef,this._overlayRef=t}enable(){if(!this._scrollSubscription){let t=this._config?this._config.scrollThrottle:0;this._scrollSubscription=this._scrollDispatcher.scrolled(t).subscribe(()=>{if(this._overlayRef.updatePosition(),this._config&&this._config.autoClose){let e=this._overlayRef.overlayElement.getBoundingClientRect(),{width:r,height:i}=this._viewportRuler.getViewportSize();jv(e,[{width:r,height:i,bottom:i,right:r,top:0,left:0}])&&(this.disable(),this._ngZone.run(()=>this._overlayRef.detach()))}})}}disable(){this._scrollSubscription&&(this._scrollSubscription.unsubscribe(),this._scrollSubscription=null)}detach(){this.disable(),this._overlayRef=null}},OS=(()=>{class n{_injector=h(re);constructor(){}noop=()=>new Gl;close=e=>kS(this._injector,e);block=()=>AS(this._injector);reposition=e=>Vf(this._injector,e);static \u0275fac=function(r){return new(r||n)};static \u0275prov=y({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})(),Pf=class{positionStrategy;scrollStrategy=new Gl;panelClass="";hasBackdrop=!1;backdropClass="cdk-overlay-dark-backdrop";disableAnimations;width;height;minWidth;minHeight;maxWidth;maxHeight;direction;disposeOnNavigation=!1;usePopover;eventPredicate;constructor(t){if(t){let e=Object.keys(t);for(let r of e)t[r]!==void 0&&(this[r]=t[r])}}};var Lf=class{connectionPair;scrollableViewProperties;constructor(t,e){this.connectionPair=t,this.scrollableViewProperties=e}};var NS=(()=>{class n{_attachedOverlays=[];_document=h(Q);_isAttached=!1;constructor(){}ngOnDestroy(){this.detach()}add(e){this.remove(e),this._attachedOverlays.push(e)}remove(e){let r=this._attachedOverlays.indexOf(e);r>-1&&this._attachedOverlays.splice(r,1),this._attachedOverlays.length===0&&this.detach()}canReceiveEvent(e,r,i){return i.observers.length<1?!1:e.eventPredicate?e.eventPredicate(r):!0}static \u0275fac=function(r){return new(r||n)};static \u0275prov=y({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})(),PS=(()=>{class n extends NS{_ngZone=h(V);_renderer=h(bt).createRenderer(null,null);_cleanupKeydown;add(e){super.add(e),this._isAttached||(this._ngZone.runOutsideAngular(()=>{this._cleanupKeydown=this._renderer.listen("body","keydown",this._keydownListener)}),this._isAttached=!0)}detach(){this._isAttached&&(this._cleanupKeydown?.(),this._isAttached=!1)}_keydownListener=e=>{let r=this._attachedOverlays;for(let i=r.length-1;i>-1;i--){let o=r[i];if(this.canReceiveEvent(o,e,o._keydownEvents)){this._ngZone.run(()=>o._keydownEvents.next(e));break}}};static \u0275fac=(()=>{let e;return function(i){return(e||(e=hn(n)))(i||n)}})();static \u0275prov=y({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})(),LS=(()=>{class n extends NS{_platform=h(Me);_ngZone=h(V);_renderer=h(bt).createRenderer(null,null);_cursorOriginalValue;_cursorStyleIsSet=!1;_pointerDownEventTarget=null;_cleanups;add(e){if(super.add(e),!this._isAttached){let r=this._document.body,i={capture:!0},o=this._renderer;this._cleanups=this._ngZone.runOutsideAngular(()=>[o.listen(r,"pointerdown",this._pointerDownListener,i),o.listen(r,"click",this._clickListener,i),o.listen(r,"auxclick",this._clickListener,i),o.listen(r,"contextmenu",this._clickListener,i)]),this._platform.IOS&&!this._cursorStyleIsSet&&(this._cursorOriginalValue=r.style.cursor,r.style.cursor="pointer",this._cursorStyleIsSet=!0),this._isAttached=!0}}detach(){this._isAttached&&(this._cleanups?.forEach(e=>e()),this._cleanups=void 0,this._platform.IOS&&this._cursorStyleIsSet&&(this._document.body.style.cursor=this._cursorOriginalValue,this._cursorStyleIsSet=!1),this._isAttached=!1)}_pointerDownListener=e=>{this._pointerDownEventTarget=In(e)};_clickListener=e=>{let r=In(e),i=e.type==="click"&&this._pointerDownEventTarget?this._pointerDownEventTarget:r;this._pointerDownEventTarget=null;let o=this._attachedOverlays.slice();for(let s=o.length-1;s>-1;s--){let a=o[s],l=a._outsidePointerEvents;if(!(!a.hasAttached()||!this.canReceiveEvent(a,e,l))){if(SS(a.overlayElement,r)||SS(a.overlayElement,i))break;this._ngZone?this._ngZone.run(()=>l.next(e)):l.next(e)}}};static \u0275fac=(()=>{let e;return function(i){return(e||(e=hn(n)))(i||n)}})();static \u0275prov=y({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})();function SS(n,t){let e=typeof ShadowRoot<"u"&&ShadowRoot,r=t;for(;r;){if(r===n)return!0;r=e&&r instanceof ShadowRoot?r.host:r.parentNode}return!1}var FS=(()=>{class n{static \u0275fac=function(r){return new(r||n)};static \u0275cmp=ge({type:n,selectors:[["ng-component"]],hostAttrs:["cdk-overlay-style-loader",""],decls:0,vars:0,template:function(r,i){},styles:[`.cdk-overlay-container, .cdk-global-overlay-wrapper {
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
`],encapsulation:2,changeDetection:0})}return n})(),BS=(()=>{class n{_platform=h(Me);_containerElement;_document=h(Q);_styleLoader=h(br);constructor(){}ngOnDestroy(){this._containerElement?.remove()}getContainerElement(){return this._loadStyles(),this._containerElement||this._createContainer(),this._containerElement}_createContainer(){let e="cdk-overlay-container";if(this._platform.isBrowser||Ev()){let i=this._document.querySelectorAll(`.${e}[platform="server"], .${e}[platform="test"]`);for(let o=0;o<i.length;o++)i[o].remove()}let r=this._document.createElement("div");r.classList.add(e),Ev()?r.setAttribute("platform","test"):this._platform.isBrowser||r.setAttribute("platform","server"),this._document.body.appendChild(r),this._containerElement=r}_loadStyles(){this._styleLoader.load(FS)}static \u0275fac=function(r){return new(r||n)};static \u0275prov=y({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})(),Vv=class{_renderer;_ngZone;element;_cleanupClick;_cleanupTransitionEnd;_fallbackTimeout;constructor(t,e,r,i){this._renderer=e,this._ngZone=r,this.element=t.createElement("div"),this.element.classList.add("cdk-overlay-backdrop"),this._cleanupClick=e.listen(this.element,"click",i)}detach(){this._ngZone.runOutsideAngular(()=>{let t=this.element;clearTimeout(this._fallbackTimeout),this._cleanupTransitionEnd?.(),this._cleanupTransitionEnd=this._renderer.listen(t,"transitionend",this.dispose),this._fallbackTimeout=setTimeout(this.dispose,500),t.style.pointerEvents="none",t.classList.remove("cdk-overlay-backdrop-showing")})}dispose=()=>{clearTimeout(this._fallbackTimeout),this._cleanupClick?.(),this._cleanupTransitionEnd?.(),this._cleanupClick=this._cleanupTransitionEnd=this._fallbackTimeout=void 0,this.element.remove()}};function Uv(n){return n&&n.nodeType===1}var Ff=class{_portalOutlet;_host;_pane;_config;_ngZone;_keyboardDispatcher;_document;_location;_outsideClickDispatcher;_animationsDisabled;_injector;_renderer;_backdropClick=new C;_attachments=new C;_detachments=new C;_positionStrategy;_scrollStrategy;_locationChanges=Z.EMPTY;_backdropRef=null;_detachContentMutationObserver;_detachContentAfterRenderRef;_disposed=!1;_previousHostParent;_keydownEvents=new C;_outsidePointerEvents=new C;_afterNextRenderRef;constructor(t,e,r,i,o,s,a,l,c,u=!1,d,f){this._portalOutlet=t,this._host=e,this._pane=r,this._config=i,this._ngZone=o,this._keyboardDispatcher=s,this._document=a,this._location=l,this._outsideClickDispatcher=c,this._animationsDisabled=u,this._injector=d,this._renderer=f,i.scrollStrategy&&(this._scrollStrategy=i.scrollStrategy,this._scrollStrategy.attach(this)),this._positionStrategy=i.positionStrategy}get overlayElement(){return this._pane}get backdropElement(){return this._backdropRef?.element||null}get hostElement(){return this._host}get eventPredicate(){return this._config?.eventPredicate||null}attach(t){if(this._disposed)return null;this._attachHost();let e=this._portalOutlet.attach(t);return this._positionStrategy?.attach(this),this._updateStackingOrder(),this._updateElementSize(),this._updateElementDirection(),this._scrollStrategy&&this._scrollStrategy.enable(),this._afterNextRenderRef?.destroy(),this._afterNextRenderRef=_t(()=>{this.hasAttached()&&this.updatePosition()},{injector:this._injector}),this._togglePointerEvents(!0),this._config.hasBackdrop&&this._attachBackdrop(),this._config.panelClass&&this._toggleClasses(this._pane,this._config.panelClass,!0),this._attachments.next(),this._completeDetachContent(),this._keyboardDispatcher.add(this),this._config.disposeOnNavigation&&(this._locationChanges=this._location.subscribe(()=>this.dispose())),this._outsideClickDispatcher.add(this),typeof e?.onDestroy=="function"&&e.onDestroy(()=>{this.hasAttached()&&this._ngZone.runOutsideAngular(()=>Promise.resolve().then(()=>this.detach()))}),e}detach(){if(!this.hasAttached())return;this.detachBackdrop(),this._togglePointerEvents(!1),this._positionStrategy&&this._positionStrategy.detach&&this._positionStrategy.detach(),this._scrollStrategy&&this._scrollStrategy.disable();let t=this._portalOutlet.detach();return this._detachments.next(),this._completeDetachContent(),this._keyboardDispatcher.remove(this),this._detachContentWhenEmpty(),this._locationChanges.unsubscribe(),this._outsideClickDispatcher.remove(this),t}dispose(){if(this._disposed)return;let t=this.hasAttached();this._positionStrategy&&this._positionStrategy.dispose(),this._disposeScrollStrategy(),this._backdropRef?.dispose(),this._locationChanges.unsubscribe(),this._keyboardDispatcher.remove(this),this._portalOutlet.dispose(),this._attachments.complete(),this._backdropClick.complete(),this._keydownEvents.complete(),this._outsidePointerEvents.complete(),this._outsideClickDispatcher.remove(this),this._host?.remove(),this._afterNextRenderRef?.destroy(),this._previousHostParent=this._pane=this._host=this._backdropRef=null,t&&this._detachments.next(),this._detachments.complete(),this._completeDetachContent(),this._disposed=!0}hasAttached(){return this._portalOutlet.hasAttached()}backdropClick(){return this._backdropClick}attachments(){return this._attachments}detachments(){return this._detachments}keydownEvents(){return this._keydownEvents}outsidePointerEvents(){return this._outsidePointerEvents}getConfig(){return this._config}updatePosition(){this._positionStrategy&&this._positionStrategy.apply()}updatePositionStrategy(t){t!==this._positionStrategy&&(this._positionStrategy&&this._positionStrategy.dispose(),this._positionStrategy=t,this.hasAttached()&&(t.attach(this),this.updatePosition()))}updateSize(t){this._config=g(g({},this._config),t),this._updateElementSize()}setDirection(t){this._config=Y(g({},this._config),{direction:t}),this._updateElementDirection()}addPanelClass(t){this._pane&&this._toggleClasses(this._pane,t,!0)}removePanelClass(t){this._pane&&this._toggleClasses(this._pane,t,!1)}getDirection(){let t=this._config.direction;return t?typeof t=="string"?t:t.value:"ltr"}updateScrollStrategy(t){t!==this._scrollStrategy&&(this._disposeScrollStrategy(),this._scrollStrategy=t,this.hasAttached()&&(t.attach(this),t.enable()))}_updateElementDirection(){this._host.setAttribute("dir",this.getDirection())}_updateElementSize(){if(!this._pane)return;let t=this._pane.style;t.width=qe(this._config.width),t.height=qe(this._config.height),t.minWidth=qe(this._config.minWidth),t.minHeight=qe(this._config.minHeight),t.maxWidth=qe(this._config.maxWidth),t.maxHeight=qe(this._config.maxHeight)}_togglePointerEvents(t){this._pane.style.pointerEvents=t?"":"none"}_attachHost(){if(!this._host.parentElement){let t=this._config.usePopover?this._positionStrategy?.getPopoverInsertionPoint?.():null;Uv(t)?t.after(this._host):t?.type==="parent"?t.element.appendChild(this._host):this._previousHostParent?.appendChild(this._host)}if(this._config.usePopover)try{this._host.showPopover()}catch{}}_attachBackdrop(){let t="cdk-overlay-backdrop-showing";this._backdropRef?.dispose(),this._backdropRef=new Vv(this._document,this._renderer,this._ngZone,e=>{this._backdropClick.next(e)}),this._animationsDisabled&&this._backdropRef.element.classList.add("cdk-overlay-backdrop-noop-animation"),this._config.backdropClass&&this._toggleClasses(this._backdropRef.element,this._config.backdropClass,!0),this._config.usePopover?this._host.prepend(this._backdropRef.element):this._host.parentElement.insertBefore(this._backdropRef.element,this._host),!this._animationsDisabled&&typeof requestAnimationFrame<"u"?this._ngZone.runOutsideAngular(()=>{requestAnimationFrame(()=>this._backdropRef?.element.classList.add(t))}):this._backdropRef.element.classList.add(t)}_updateStackingOrder(){!this._config.usePopover&&this._host.nextSibling&&this._host.parentNode.appendChild(this._host)}detachBackdrop(){this._animationsDisabled?(this._backdropRef?.dispose(),this._backdropRef=null):this._backdropRef?.detach()}_toggleClasses(t,e,r){let i=Vs(e||[]).filter(o=>!!o);i.length&&(r?t.classList.add(...i):t.classList.remove(...i))}_detachContentWhenEmpty(){let t=!1;try{this._detachContentAfterRenderRef=_t(()=>{t=!0,this._detachContent()},{injector:this._injector})}catch(e){if(t)throw e;this._detachContent()}globalThis.MutationObserver&&this._pane&&(this._detachContentMutationObserver||=new globalThis.MutationObserver(()=>{this._detachContent()}),this._detachContentMutationObserver.observe(this._pane,{childList:!0}))}_detachContent(){(!this._pane||!this._host||this._pane.children.length===0)&&(this._pane&&this._config.panelClass&&this._toggleClasses(this._pane,this._config.panelClass,!1),this._host&&this._host.parentElement&&(this._previousHostParent=this._host.parentElement,this._host.remove()),this._completeDetachContent())}_completeDetachContent(){this._detachContentAfterRenderRef?.destroy(),this._detachContentAfterRenderRef=void 0,this._detachContentMutationObserver?.disconnect()}_disposeScrollStrategy(){let t=this._scrollStrategy;t?.disable(),t?.detach?.()}},IS="cdk-overlay-connected-position-bounding-box",lL=/([A-Za-z%]+)$/;function Uf(n,t){return new Bf(t,n.get(Yr),n.get(Q),n.get(Me),n.get(BS))}var Bf=class{_viewportRuler;_document;_platform;_overlayContainer;_overlayRef;_isInitialRender=!1;_lastBoundingBoxSize={width:0,height:0};_isPushed=!1;_canPush=!0;_growAfterOpen=!1;_hasFlexibleDimensions=!0;_positionLocked=!1;_originRect;_overlayRect;_viewportRect;_containerRect;_viewportMargin=0;_scrollables=[];_preferredPositions=[];_origin;_pane;_isDisposed=!1;_boundingBox=null;_lastPosition=null;_lastScrollVisibility=null;_positionChanges=new C;_resizeSubscription=Z.EMPTY;_offsetX=0;_offsetY=0;_transformOriginSelector;_appliedPanelClasses=[];_previousPushAmount=null;_popoverLocation="global";positionChanges=this._positionChanges;get positions(){return this._preferredPositions}constructor(t,e,r,i,o){this._viewportRuler=e,this._document=r,this._platform=i,this._overlayContainer=o,this.setOrigin(t)}attach(t){this._overlayRef&&this._overlayRef,this._validatePositions(),t.hostElement.classList.add(IS),this._overlayRef=t,this._boundingBox=t.hostElement,this._pane=t.overlayElement,this._isDisposed=!1,this._isInitialRender=!0,this._lastPosition=null,this._resizeSubscription.unsubscribe(),this._resizeSubscription=this._viewportRuler.change().subscribe(()=>{this._isInitialRender=!0,this.apply()})}apply(){if(this._isDisposed||!this._platform.isBrowser)return;if(!this._isInitialRender&&this._positionLocked&&this._lastPosition){this.reapplyLastPosition();return}this._clearPanelClasses(),this._resetOverlayElementStyles(),this._resetBoundingBoxStyles(),this._viewportRect=this._getNarrowedViewportRect(),this._originRect=this._getOriginRect(),this._overlayRect=this._pane.getBoundingClientRect(),this._containerRect=this._getContainerRect();let t=this._originRect,e=this._overlayRect,r=this._viewportRect,i=this._containerRect,o=[],s;for(let a of this._preferredPositions){let l=this._getOriginPoint(t,i,a),c=this._getOverlayPoint(l,e,a),u=this._getOverlayFit(c,e,r,a);if(u.isCompletelyWithinViewport){this._isPushed=!1,this._applyPosition(a,l);return}if(this._canFitWithFlexibleDimensions(u,c,r)){o.push({position:a,origin:l,overlayRect:e,boundingBoxRect:this._calculateBoundingBoxRect(l,a)});continue}(!s||s.overlayFit.visibleArea<u.visibleArea)&&(s={overlayFit:u,overlayPoint:c,originPoint:l,position:a,overlayRect:e})}if(o.length){let a=null,l=-1;for(let c of o){let u=c.boundingBoxRect.width*c.boundingBoxRect.height*(c.position.weight||1);u>l&&(l=u,a=c)}this._isPushed=!1,this._applyPosition(a.position,a.origin);return}if(this._canPush){this._isPushed=!0,this._applyPosition(s.position,s.originPoint);return}this._applyPosition(s.position,s.originPoint)}detach(){this._clearPanelClasses(),this._lastPosition=null,this._previousPushAmount=null,this._resizeSubscription.unsubscribe()}dispose(){this._isDisposed||(this._boundingBox&&xo(this._boundingBox.style,{top:"",left:"",right:"",bottom:"",height:"",width:"",alignItems:"",justifyContent:""}),this._pane&&this._resetOverlayElementStyles(),this._overlayRef&&this._overlayRef.hostElement.classList.remove(IS),this.detach(),this._positionChanges.complete(),this._overlayRef=this._boundingBox=null,this._isDisposed=!0)}reapplyLastPosition(){if(this._isDisposed||!this._platform.isBrowser)return;let t=this._lastPosition;t?(this._originRect=this._getOriginRect(),this._overlayRect=this._pane.getBoundingClientRect(),this._viewportRect=this._getNarrowedViewportRect(),this._containerRect=this._getContainerRect(),this._applyPosition(t,this._getOriginPoint(this._originRect,this._containerRect,t))):this.apply()}withScrollableContainers(t){return this._scrollables=t,this}withPositions(t){return this._preferredPositions=t,t.indexOf(this._lastPosition)===-1&&(this._lastPosition=null),this._validatePositions(),this}withViewportMargin(t){return this._viewportMargin=t,this}withFlexibleDimensions(t=!0){return this._hasFlexibleDimensions=t,this}withGrowAfterOpen(t=!0){return this._growAfterOpen=t,this}withPush(t=!0){return this._canPush=t,this}withLockedPosition(t=!0){return this._positionLocked=t,this}setOrigin(t){return this._origin=t,this}withDefaultOffsetX(t){return this._offsetX=t,this}withDefaultOffsetY(t){return this._offsetY=t,this}withTransformOriginOn(t){return this._transformOriginSelector=t,this}withPopoverLocation(t){return this._popoverLocation=t,this}getPopoverInsertionPoint(){return this._popoverLocation==="global"?null:this._popoverLocation!=="inline"?this._popoverLocation:this._origin instanceof le?this._origin.nativeElement:Uv(this._origin)?this._origin:null}_getOriginPoint(t,e,r){let i;if(r.originX=="center")i=t.left+t.width/2;else{let s=this._isRtl()?t.right:t.left,a=this._isRtl()?t.left:t.right;i=r.originX=="start"?s:a}e.left<0&&(i-=e.left);let o;return r.originY=="center"?o=t.top+t.height/2:o=r.originY=="top"?t.top:t.bottom,e.top<0&&(o-=e.top),{x:i,y:o}}_getOverlayPoint(t,e,r){let i;r.overlayX=="center"?i=-e.width/2:r.overlayX==="start"?i=this._isRtl()?-e.width:0:i=this._isRtl()?0:-e.width;let o;return r.overlayY=="center"?o=-e.height/2:o=r.overlayY=="top"?0:-e.height,{x:t.x+i,y:t.y+o}}_getOverlayFit(t,e,r,i){let o=xS(e),{x:s,y:a}=t,l=this._getOffset(i,"x"),c=this._getOffset(i,"y");l&&(s+=l),c&&(a+=c);let u=0-s,d=s+o.width-r.width,f=0-a,p=a+o.height-r.height,m=this._subtractOverflows(o.width,u,d),v=this._subtractOverflows(o.height,f,p),I=m*v;return{visibleArea:I,isCompletelyWithinViewport:o.width*o.height===I,fitsInViewportVertically:v===o.height,fitsInViewportHorizontally:m==o.width}}_canFitWithFlexibleDimensions(t,e,r){if(this._hasFlexibleDimensions){let i=r.bottom-e.y,o=r.right-e.x,s=MS(this._overlayRef.getConfig().minHeight),a=MS(this._overlayRef.getConfig().minWidth),l=t.fitsInViewportVertically||s!=null&&s<=i,c=t.fitsInViewportHorizontally||a!=null&&a<=o;return l&&c}return!1}_pushOverlayOnScreen(t,e,r){if(this._previousPushAmount&&this._positionLocked)return{x:t.x+this._previousPushAmount.x,y:t.y+this._previousPushAmount.y};let i=xS(e),o=this._viewportRect,s=Math.max(t.x+i.width-o.width,0),a=Math.max(t.y+i.height-o.height,0),l=Math.max(o.top-r.top-t.y,0),c=Math.max(o.left-r.left-t.x,0),u=0,d=0;return i.width<=o.width?u=c||-s:u=t.x<this._getViewportMarginStart()?o.left-r.left-t.x:0,i.height<=o.height?d=l||-a:d=t.y<this._getViewportMarginTop()?o.top-r.top-t.y:0,this._previousPushAmount={x:u,y:d},{x:t.x+u,y:t.y+d}}_applyPosition(t,e){if(this._setTransformOrigin(t),this._setOverlayElementStyles(e,t),this._setBoundingBoxStyles(e,t),t.panelClass&&this._addPanelClasses(t.panelClass),this._positionChanges.observers.length){let r=this._getScrollVisibility();if(t!==this._lastPosition||!this._lastScrollVisibility||!cL(this._lastScrollVisibility,r)){let i=new Lf(t,r);this._positionChanges.next(i)}this._lastScrollVisibility=r}this._lastPosition=t,this._isInitialRender=!1}_setTransformOrigin(t){if(!this._transformOriginSelector)return;let e=this._boundingBox.querySelectorAll(this._transformOriginSelector),r,i=t.overlayY;t.overlayX==="center"?r="center":this._isRtl()?r=t.overlayX==="start"?"right":"left":r=t.overlayX==="start"?"left":"right";for(let o=0;o<e.length;o++)e[o].style.transformOrigin=`${r} ${i}`}_calculateBoundingBoxRect(t,e){let r=this._viewportRect,i=this._isRtl(),o,s,a;if(e.overlayY==="top")s=t.y,o=r.height-s+this._getViewportMarginBottom();else if(e.overlayY==="bottom")a=r.height-t.y+this._getViewportMarginTop()+this._getViewportMarginBottom(),o=r.height-a+this._getViewportMarginTop();else{let p=Math.min(r.bottom-t.y+r.top,t.y),m=this._lastBoundingBoxSize.height;o=p*2,s=t.y-p,o>m&&!this._isInitialRender&&!this._growAfterOpen&&(s=t.y-m/2)}let l=e.overlayX==="start"&&!i||e.overlayX==="end"&&i,c=e.overlayX==="end"&&!i||e.overlayX==="start"&&i,u,d,f;if(c)f=r.width-t.x+this._getViewportMarginStart()+this._getViewportMarginEnd(),u=t.x-this._getViewportMarginStart();else if(l)d=t.x,u=r.right-t.x-this._getViewportMarginEnd();else{let p=Math.min(r.right-t.x+r.left,t.x),m=this._lastBoundingBoxSize.width;u=p*2,d=t.x-p,u>m&&!this._isInitialRender&&!this._growAfterOpen&&(d=t.x-m/2)}return{top:s,left:d,bottom:a,right:f,width:u,height:o}}_setBoundingBoxStyles(t,e){let r=this._calculateBoundingBoxRect(t,e);!this._isInitialRender&&!this._growAfterOpen&&(r.height=Math.min(r.height,this._lastBoundingBoxSize.height),r.width=Math.min(r.width,this._lastBoundingBoxSize.width));let i={};if(this._hasExactPosition())i.top=i.left="0",i.bottom=i.right="auto",i.maxHeight=i.maxWidth="",i.width=i.height="100%";else{let o=this._overlayRef.getConfig().maxHeight,s=this._overlayRef.getConfig().maxWidth;i.width=qe(r.width),i.height=qe(r.height),i.top=qe(r.top)||"auto",i.bottom=qe(r.bottom)||"auto",i.left=qe(r.left)||"auto",i.right=qe(r.right)||"auto",e.overlayX==="center"?i.alignItems="center":i.alignItems=e.overlayX==="end"?"flex-end":"flex-start",e.overlayY==="center"?i.justifyContent="center":i.justifyContent=e.overlayY==="bottom"?"flex-end":"flex-start",o&&(i.maxHeight=qe(o)),s&&(i.maxWidth=qe(s))}this._lastBoundingBoxSize=r,xo(this._boundingBox.style,i)}_resetBoundingBoxStyles(){xo(this._boundingBox.style,{top:"0",left:"0",right:"0",bottom:"0",height:"",width:"",alignItems:"",justifyContent:""})}_resetOverlayElementStyles(){xo(this._pane.style,{top:"",left:"",bottom:"",right:"",position:"",transform:""})}_setOverlayElementStyles(t,e){let r={},i=this._hasExactPosition(),o=this._hasFlexibleDimensions,s=this._overlayRef.getConfig();if(i){let u=this._viewportRuler.getViewportScrollPosition();xo(r,this._getExactOverlayY(e,t,u)),xo(r,this._getExactOverlayX(e,t,u))}else r.position="static";let a="",l=this._getOffset(e,"x"),c=this._getOffset(e,"y");l&&(a+=`translateX(${l}px) `),c&&(a+=`translateY(${c}px)`),r.transform=a.trim(),s.maxHeight&&(i?r.maxHeight=qe(s.maxHeight):o&&(r.maxHeight="")),s.maxWidth&&(i?r.maxWidth=qe(s.maxWidth):o&&(r.maxWidth="")),xo(this._pane.style,r)}_getExactOverlayY(t,e,r){let i={top:"",bottom:""},o=this._getOverlayPoint(e,this._overlayRect,t);if(this._isPushed&&(o=this._pushOverlayOnScreen(o,this._overlayRect,r)),t.overlayY==="bottom"){let s=this._document.documentElement.clientHeight;i.bottom=`${s-(o.y+this._overlayRect.height)}px`}else i.top=qe(o.y);return i}_getExactOverlayX(t,e,r){let i={left:"",right:""},o=this._getOverlayPoint(e,this._overlayRect,t);this._isPushed&&(o=this._pushOverlayOnScreen(o,this._overlayRect,r));let s;if(this._isRtl()?s=t.overlayX==="end"?"left":"right":s=t.overlayX==="end"?"right":"left",s==="right"){let a=this._document.documentElement.clientWidth;i.right=`${a-(o.x+this._overlayRect.width)}px`}else i.left=qe(o.x);return i}_getScrollVisibility(){let t=this._getOriginRect(),e=this._pane.getBoundingClientRect(),r=this._scrollables.map(i=>i.getElementRef().nativeElement.getBoundingClientRect());return{isOriginClipped:TS(t,r),isOriginOutsideView:jv(t,r),isOverlayClipped:TS(e,r),isOverlayOutsideView:jv(e,r)}}_subtractOverflows(t,...e){return e.reduce((r,i)=>r-Math.max(i,0),t)}_getNarrowedViewportRect(){let t=this._document.documentElement.clientWidth,e=this._document.documentElement.clientHeight,r=this._viewportRuler.getViewportScrollPosition();return{top:r.top+this._getViewportMarginTop(),left:r.left+this._getViewportMarginStart(),right:r.left+t-this._getViewportMarginEnd(),bottom:r.top+e-this._getViewportMarginBottom(),width:t-this._getViewportMarginStart()-this._getViewportMarginEnd(),height:e-this._getViewportMarginTop()-this._getViewportMarginBottom()}}_isRtl(){return this._overlayRef.getDirection()==="rtl"}_hasExactPosition(){return!this._hasFlexibleDimensions||this._isPushed}_getOffset(t,e){return e==="x"?t.offsetX==null?this._offsetX:t.offsetX:t.offsetY==null?this._offsetY:t.offsetY}_validatePositions(){}_addPanelClasses(t){this._pane&&Vs(t).forEach(e=>{e!==""&&this._appliedPanelClasses.indexOf(e)===-1&&(this._appliedPanelClasses.push(e),this._pane.classList.add(e))})}_clearPanelClasses(){this._pane&&(this._appliedPanelClasses.forEach(t=>{this._pane.classList.remove(t)}),this._appliedPanelClasses=[])}_getViewportMarginStart(){return typeof this._viewportMargin=="number"?this._viewportMargin:this._viewportMargin?.start??0}_getViewportMarginEnd(){return typeof this._viewportMargin=="number"?this._viewportMargin:this._viewportMargin?.end??0}_getViewportMarginTop(){return typeof this._viewportMargin=="number"?this._viewportMargin:this._viewportMargin?.top??0}_getViewportMarginBottom(){return typeof this._viewportMargin=="number"?this._viewportMargin:this._viewportMargin?.bottom??0}_getOriginRect(){let t=this._origin;if(t instanceof le)return t.nativeElement.getBoundingClientRect();if(t instanceof Element)return t.getBoundingClientRect();let e=t.width||0,r=t.height||0;return{top:t.y,bottom:t.y+r,left:t.x,right:t.x+e,height:r,width:e}}_getContainerRect(){let t=this._overlayRef.getConfig().usePopover&&this._popoverLocation!=="global",e=this._overlayContainer.getContainerElement();t&&(e.style.display="block");let r=e.getBoundingClientRect();return t&&(e.style.display=""),r}};function xo(n,t){for(let e in t)t.hasOwnProperty(e)&&(n[e]=t[e]);return n}function MS(n){if(typeof n!="number"&&n!=null){let[t,e]=n.split(lL);return!e||e==="px"?parseFloat(t):null}return n||null}function xS(n){return{top:Math.floor(n.top),right:Math.floor(n.right),bottom:Math.floor(n.bottom),left:Math.floor(n.left),width:Math.floor(n.width),height:Math.floor(n.height)}}function cL(n,t){return n===t?!0:n.isOriginClipped===t.isOriginClipped&&n.isOriginOutsideView===t.isOriginOutsideView&&n.isOverlayClipped===t.isOverlayClipped&&n.isOverlayOutsideView===t.isOverlayOutsideView}var RS="cdk-global-overlay-wrapper";function jS(n){return new jf}var jf=class{_overlayRef;_cssPosition="static";_topOffset="";_bottomOffset="";_alignItems="";_xPosition="";_xOffset="";_width="";_height="";_isDisposed=!1;attach(t){let e=t.getConfig();this._overlayRef=t,this._width&&!e.width&&t.updateSize({width:this._width}),this._height&&!e.height&&t.updateSize({height:this._height}),t.hostElement.classList.add(RS),this._isDisposed=!1}top(t=""){return this._bottomOffset="",this._topOffset=t,this._alignItems="flex-start",this}left(t=""){return this._xOffset=t,this._xPosition="left",this}bottom(t=""){return this._topOffset="",this._bottomOffset=t,this._alignItems="flex-end",this}right(t=""){return this._xOffset=t,this._xPosition="right",this}start(t=""){return this._xOffset=t,this._xPosition="start",this}end(t=""){return this._xOffset=t,this._xPosition="end",this}width(t=""){return this._overlayRef?this._overlayRef.updateSize({width:t}):this._width=t,this}height(t=""){return this._overlayRef?this._overlayRef.updateSize({height:t}):this._height=t,this}centerHorizontally(t=""){return this.left(t),this._xPosition="center",this}centerVertically(t=""){return this.top(t),this._alignItems="center",this}apply(){if(!this._overlayRef||!this._overlayRef.hasAttached())return;let t=this._overlayRef.overlayElement.style,e=this._overlayRef.hostElement.style,r=this._overlayRef.getConfig(),{width:i,height:o,maxWidth:s,maxHeight:a}=r,l=(i==="100%"||i==="100vw")&&(!s||s==="100%"||s==="100vw"),c=(o==="100%"||o==="100vh")&&(!a||a==="100%"||a==="100vh"),u=this._xPosition,d=this._xOffset,f=this._overlayRef.getConfig().direction==="rtl",p="",m="",v="";l?v="flex-start":u==="center"?(v="center",f?m=d:p=d):f?u==="left"||u==="end"?(v="flex-end",p=d):(u==="right"||u==="start")&&(v="flex-start",m=d):u==="left"||u==="start"?(v="flex-start",p=d):(u==="right"||u==="end")&&(v="flex-end",m=d),t.position=this._cssPosition,t.marginLeft=l?"0":p,t.marginTop=c?"0":this._topOffset,t.marginBottom=this._bottomOffset,t.marginRight=l?"0":m,e.justifyContent=v,e.alignItems=c?"flex-start":this._alignItems}dispose(){if(this._isDisposed||!this._overlayRef)return;let t=this._overlayRef.overlayElement.style,e=this._overlayRef.hostElement,r=e.style;e.classList.remove(RS),r.justifyContent=r.alignItems=t.marginTop=t.marginBottom=t.marginLeft=t.marginRight=t.position="",this._overlayRef=null,this._isDisposed=!0}},VS=(()=>{class n{_injector=h(re);constructor(){}global(){return jS()}flexibleConnectedTo(e){return Uf(this._injector,e)}static \u0275fac=function(r){return new(r||n)};static \u0275prov=y({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})(),US=new b("OVERLAY_DEFAULT_CONFIG");function $f(n,t){n.get(br).load(FS);let e=n.get(BS),r=n.get(Q),i=n.get(So),o=n.get(mn),s=n.get(_r),a=n.get(jn,null,{optional:!0})||n.get(bt).createRenderer(null,null),l=new Pf(t),c=n.get(US,null,{optional:!0})?.usePopover??!0;l.direction=l.direction||s.value,"showPopover"in r.body?l.usePopover=t?.usePopover??c:l.usePopover=!1;let u=r.createElement("div"),d=r.createElement("div");u.id=i.getId("cdk-overlay-"),u.classList.add("cdk-overlay-pane"),d.appendChild(u),l.usePopover&&(d.setAttribute("popover","manual"),d.classList.add("cdk-overlay-popover"));let f=l.usePopover?l.positionStrategy?.getPopoverInsertionPoint?.():null;return Uv(f)?f.after(d):f?.type==="parent"?f.element.appendChild(d):e.getContainerElement().appendChild(d),new Ff(new _f(u,o,n),d,u,l,n.get(V),n.get(PS),r,n.get(Br),n.get(LS),t?.disableAnimations??n.get(Fa,null,{optional:!0})==="NoopAnimations",n.get(Se),a)}var $S=(()=>{class n{scrollStrategies=h(OS);_positionBuilder=h(VS);_injector=h(re);constructor(){}create(e){return $f(this._injector,e)}position(){return this._positionBuilder}static \u0275fac=function(r){return new(r||n)};static \u0275prov=y({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})();var $v=(()=>{class n{static \u0275fac=function(r){return new(r||n)};static \u0275mod=Ve({type:n});static \u0275inj=Ae({providers:[$S],imports:[Kr,kT,Wl,Wl]})}return n})();var dL=["tooltip"],fL=20;var hL=new b("mat-tooltip-scroll-strategy",{providedIn:"root",factory:()=>{let n=h(re);return()=>Vf(n,{scrollThrottle:fL})}}),pL=new b("mat-tooltip-default-options",{providedIn:"root",factory:()=>({showDelay:0,hideDelay:0,touchendHideDelay:1500})});var HS="tooltip-panel",mL={passive:!0},gL=8,yL=8,vL=24,bL=200,Ro=(()=>{class n{_elementRef=h(le);_ngZone=h(V);_platform=h(Me);_ariaDescriber=h(tS);_focusMonitor=h(Vl);_dir=h(_r);_injector=h(re);_viewContainerRef=h(lt);_mediaMatcher=h(Us);_document=h(Q);_renderer=h(jn);_animationsDisabled=Zr();_defaultOptions=h(pL,{optional:!0});_overlayRef=null;_tooltipInstance=null;_overlayPanelClass;_portal;_position="below";_positionAtOrigin=!1;_disabled=!1;_tooltipClass;_viewInitialized=!1;_pointerExitEventsInitialized=!1;_tooltipComponent=zS;_viewportMargin=8;_currentPosition;_cssClassPrefix="mat-mdc";_ariaDescriptionPending=!1;_dirSubscribed=!1;get position(){return this._position}set position(e){e!==this._position&&(this._position=e,this._overlayRef&&(this._updatePosition(this._overlayRef),this._tooltipInstance?.show(0),this._overlayRef.updatePosition()))}get positionAtOrigin(){return this._positionAtOrigin}set positionAtOrigin(e){this._positionAtOrigin=Iv(e),this._detach(),this._overlayRef=null}get disabled(){return this._disabled}set disabled(e){let r=Iv(e);this._disabled!==r&&(this._disabled=r,r?this.hide(0):this._setupPointerEnterEventsIfNeeded(),this._syncAriaDescription(this.message))}get showDelay(){return this._showDelay}set showDelay(e){this._showDelay=Xn(e)}_showDelay;get hideDelay(){return this._hideDelay}set hideDelay(e){this._hideDelay=Xn(e),this._tooltipInstance&&(this._tooltipInstance._mouseLeaveHideDelay=this._hideDelay)}_hideDelay;touchGestures="auto";get message(){return this._message}set message(e){let r=this._message;this._message=e!=null?String(e).trim():"",!this._message&&this._isTooltipVisible()?this.hide(0):(this._setupPointerEnterEventsIfNeeded(),this._updateTooltipMessage()),this._syncAriaDescription(r)}_message="";get tooltipClass(){return this._tooltipClass}set tooltipClass(e){this._tooltipClass=e,this._tooltipInstance&&this._setTooltipClass(this._tooltipClass)}_eventCleanups=[];_touchstartTimeout=null;_destroyed=new C;_isDestroyed=!1;constructor(){let e=this._defaultOptions;e&&(this._showDelay=e.showDelay,this._hideDelay=e.hideDelay,e.position&&(this.position=e.position),e.positionAtOrigin&&(this.positionAtOrigin=e.positionAtOrigin),e.touchGestures&&(this.touchGestures=e.touchGestures),e.tooltipClass&&(this.tooltipClass=e.tooltipClass)),this._viewportMargin=gL}ngAfterViewInit(){this._viewInitialized=!0,this._setupPointerEnterEventsIfNeeded(),this._focusMonitor.monitor(this._elementRef).pipe(J(this._destroyed)).subscribe(e=>{e?e==="keyboard"&&this._ngZone.run(()=>this.show()):this._ngZone.run(()=>this.hide(0))})}ngOnDestroy(){let e=this._elementRef.nativeElement;this._touchstartTimeout&&clearTimeout(this._touchstartTimeout),this._overlayRef&&(this._overlayRef.dispose(),this._tooltipInstance=null),this._eventCleanups.forEach(r=>r()),this._eventCleanups.length=0,this._destroyed.next(),this._destroyed.complete(),this._isDestroyed=!0,this._ariaDescriber.removeDescription(e,this.message,"tooltip"),this._focusMonitor.stopMonitoring(e)}show(e=this.showDelay,r){if(this.disabled||!this.message||this._isTooltipVisible()){this._tooltipInstance?._cancelPendingAnimations();return}let i=this._createOverlay(r);this._detach(),this._portal=this._portal||new Pl(this._tooltipComponent,this._viewContainerRef);let o=this._tooltipInstance=i.attach(this._portal).instance;o._triggerElement=this._elementRef.nativeElement,o._mouseLeaveHideDelay=this._hideDelay,o.afterHidden().pipe(J(this._destroyed)).subscribe(()=>this._detach()),this._setTooltipClass(this._tooltipClass),this._updateTooltipMessage(),o.show(e)}hide(e=this.hideDelay){let r=this._tooltipInstance;r&&(r.isVisible()?r.hide(e):(r._cancelPendingAnimations(),this._detach()))}toggle(e){this._isTooltipVisible()?this.hide():this.show(void 0,e)}_isTooltipVisible(){return!!this._tooltipInstance&&this._tooltipInstance.isVisible()}_createOverlay(e){if(this._overlayRef){let s=this._overlayRef.getConfig().positionStrategy;if((!this.positionAtOrigin||!e)&&s._origin instanceof le)return this._overlayRef;this._detach()}let r=this._injector.get(Mo).getAncestorScrollContainers(this._elementRef),i=`${this._cssClassPrefix}-${HS}`,o=Uf(this._injector,this.positionAtOrigin?e||this._elementRef:this._elementRef).withTransformOriginOn(`.${this._cssClassPrefix}-tooltip`).withFlexibleDimensions(!1).withViewportMargin(this._viewportMargin).withScrollableContainers(r).withPopoverLocation("global");return o.positionChanges.pipe(J(this._destroyed)).subscribe(s=>{this._updateCurrentPositionClass(s.connectionPair),this._tooltipInstance&&s.scrollableViewProperties.isOverlayClipped&&this._tooltipInstance.isVisible()&&this._ngZone.run(()=>this.hide(0))}),this._overlayRef=$f(this._injector,{direction:this._dir,positionStrategy:o,panelClass:this._overlayPanelClass?[...this._overlayPanelClass,i]:i,scrollStrategy:this._injector.get(hL)(),disableAnimations:this._animationsDisabled,eventPredicate:this._overlayEventPredicate}),this._updatePosition(this._overlayRef),this._overlayRef.detachments().pipe(J(this._destroyed)).subscribe(()=>this._detach()),this._overlayRef.outsidePointerEvents().pipe(J(this._destroyed)).subscribe(()=>this._tooltipInstance?._handleBodyInteraction()),this._overlayRef.keydownEvents().pipe(J(this._destroyed)).subscribe(s=>{s.preventDefault(),s.stopPropagation(),this._ngZone.run(()=>this.hide(0))}),this._defaultOptions?.disableTooltipInteractivity&&this._overlayRef.addPanelClass(`${this._cssClassPrefix}-tooltip-panel-non-interactive`),this._dirSubscribed||(this._dirSubscribed=!0,this._dir.change.pipe(J(this._destroyed)).subscribe(()=>{this._overlayRef&&this._updatePosition(this._overlayRef)})),this._overlayRef}_detach(){this._overlayRef&&this._overlayRef.hasAttached()&&this._overlayRef.detach(),this._tooltipInstance=null}_updatePosition(e){let r=e.getConfig().positionStrategy,i=this._getOrigin(),o=this._getOverlayPosition();r.withPositions([this._addOffset(g(g({},i.main),o.main)),this._addOffset(g(g({},i.fallback),o.fallback))])}_addOffset(e){let r=yL,i=!this._dir||this._dir.value=="ltr";return e.originY==="top"?e.offsetY=-r:e.originY==="bottom"?e.offsetY=r:e.originX==="start"?e.offsetX=i?-r:r:e.originX==="end"&&(e.offsetX=i?r:-r),e}_getOrigin(){let e=!this._dir||this._dir.value=="ltr",r=this.position,i;r=="above"||r=="below"?i={originX:"center",originY:r=="above"?"top":"bottom"}:r=="before"||r=="left"&&e||r=="right"&&!e?i={originX:"start",originY:"center"}:(r=="after"||r=="right"&&e||r=="left"&&!e)&&(i={originX:"end",originY:"center"});let{x:o,y:s}=this._invertPosition(i.originX,i.originY);return{main:i,fallback:{originX:o,originY:s}}}_getOverlayPosition(){let e=!this._dir||this._dir.value=="ltr",r=this.position,i;r=="above"?i={overlayX:"center",overlayY:"bottom"}:r=="below"?i={overlayX:"center",overlayY:"top"}:r=="before"||r=="left"&&e||r=="right"&&!e?i={overlayX:"end",overlayY:"center"}:(r=="after"||r=="right"&&e||r=="left"&&!e)&&(i={overlayX:"start",overlayY:"center"});let{x:o,y:s}=this._invertPosition(i.overlayX,i.overlayY);return{main:i,fallback:{overlayX:o,overlayY:s}}}_updateTooltipMessage(){this._tooltipInstance&&(this._tooltipInstance.message=this.message,this._tooltipInstance._markForCheck(),_t(()=>{this._tooltipInstance&&this._overlayRef.updatePosition()},{injector:this._injector}))}_setTooltipClass(e){this._tooltipInstance&&(this._tooltipInstance.tooltipClass=e instanceof Set?Array.from(e):e,this._tooltipInstance._markForCheck())}_invertPosition(e,r){return this.position==="above"||this.position==="below"?r==="top"?r="bottom":r==="bottom"&&(r="top"):e==="end"?e="start":e==="start"&&(e="end"),{x:e,y:r}}_updateCurrentPositionClass(e){let{overlayY:r,originX:i,originY:o}=e,s;if(r==="center"?this._dir&&this._dir.value==="rtl"?s=i==="end"?"left":"right":s=i==="start"?"left":"right":s=r==="bottom"&&o==="top"?"above":"below",s!==this._currentPosition){let a=this._overlayRef;if(a){let l=`${this._cssClassPrefix}-${HS}-`;a.removePanelClass(l+this._currentPosition),a.addPanelClass(l+s)}this._currentPosition=s}}_setupPointerEnterEventsIfNeeded(){this._disabled||!this.message||!this._viewInitialized||this._eventCleanups.length||(this._isTouchPlatform()?this.touchGestures!=="off"&&(this._disableNativeGesturesIfNecessary(),this._addListener("touchstart",e=>{let r=e.targetTouches?.[0],i=r?{x:r.clientX,y:r.clientY}:void 0;this._setupPointerExitEventsIfNeeded(),this._touchstartTimeout&&clearTimeout(this._touchstartTimeout);let o=500;this._touchstartTimeout=setTimeout(()=>{this._touchstartTimeout=null,this.show(void 0,i)},this._defaultOptions?.touchLongPressShowDelay??o)})):this._addListener("mouseenter",e=>{this._setupPointerExitEventsIfNeeded();let r;e.x!==void 0&&e.y!==void 0&&(r=e),this.show(void 0,r)}))}_setupPointerExitEventsIfNeeded(){if(!this._pointerExitEventsInitialized){if(this._pointerExitEventsInitialized=!0,!this._isTouchPlatform())this._addListener("mouseleave",e=>{let r=e.relatedTarget;(!r||!this._overlayRef?.overlayElement.contains(r))&&this.hide()}),this._addListener("wheel",e=>{if(this._isTooltipVisible()){let r=this._document.elementFromPoint(e.clientX,e.clientY),i=this._elementRef.nativeElement;r!==i&&!i.contains(r)&&this.hide()}});else if(this.touchGestures!=="off"){this._disableNativeGesturesIfNecessary();let e=()=>{this._touchstartTimeout&&clearTimeout(this._touchstartTimeout),this.hide(this._defaultOptions?.touchendHideDelay)};this._addListener("touchend",e),this._addListener("touchcancel",e)}}}_addListener(e,r){this._eventCleanups.push(this._renderer.listen(this._elementRef.nativeElement,e,r,mL))}_isTouchPlatform(){let e=this._defaultOptions?.detectHoverCapability;return typeof e=="function"?!e():this._platform.IOS||this._platform.ANDROID?!0:this._platform.isBrowser?!!e&&this._mediaMatcher.matchMedia("(any-hover: none)").matches:!1}_disableNativeGesturesIfNecessary(){let e=this.touchGestures;if(e!=="off"){let r=this._elementRef.nativeElement,i=r.style;(e==="on"||r.nodeName!=="INPUT"&&r.nodeName!=="TEXTAREA")&&(i.userSelect=i.msUserSelect=i.webkitUserSelect=i.MozUserSelect="none"),(e==="on"||!r.draggable)&&(i.webkitUserDrag="none"),i.touchAction="none",i.webkitTapHighlightColor="transparent"}}_syncAriaDescription(e){this._ariaDescriptionPending||(this._ariaDescriptionPending=!0,this._ariaDescriber.removeDescription(this._elementRef.nativeElement,e,"tooltip"),this._isDestroyed||_t({write:()=>{this._ariaDescriptionPending=!1,this.message&&!this.disabled&&this._ariaDescriber.describe(this._elementRef.nativeElement,this.message,"tooltip")}},{injector:this._injector}))}_overlayEventPredicate=e=>e.type==="keydown"?this._isTooltipVisible()&&e.keyCode===27&&!$s(e):!0;static \u0275fac=function(r){return new(r||n)};static \u0275dir=ye({type:n,selectors:[["","matTooltip",""]],hostAttrs:[1,"mat-mdc-tooltip-trigger"],hostVars:2,hostBindings:function(r,i){r&2&&Ge("mat-mdc-tooltip-disabled",i.disabled)},inputs:{position:[0,"matTooltipPosition","position"],positionAtOrigin:[0,"matTooltipPositionAtOrigin","positionAtOrigin"],disabled:[0,"matTooltipDisabled","disabled"],showDelay:[0,"matTooltipShowDelay","showDelay"],hideDelay:[0,"matTooltipHideDelay","hideDelay"],touchGestures:[0,"matTooltipTouchGestures","touchGestures"],message:[0,"matTooltip","message"],tooltipClass:[0,"matTooltipClass","tooltipClass"]},exportAs:["matTooltip"]})}return n})(),zS=(()=>{class n{_changeDetectorRef=h(Hn);_elementRef=h(le);_isMultiline=!1;message;tooltipClass;_showTimeoutId;_hideTimeoutId;_triggerElement;_mouseLeaveHideDelay;_animationsDisabled=Zr();_tooltip;_closeOnInteraction=!1;_isVisible=!1;_onHide=new C;_showAnimation="mat-mdc-tooltip-show";_hideAnimation="mat-mdc-tooltip-hide";constructor(){}show(e){this._hideTimeoutId!=null&&clearTimeout(this._hideTimeoutId),this._showTimeoutId=setTimeout(()=>{this._toggleVisibility(!0),this._showTimeoutId=void 0},e)}hide(e){this._showTimeoutId!=null&&clearTimeout(this._showTimeoutId),this._hideTimeoutId=setTimeout(()=>{this._toggleVisibility(!1),this._hideTimeoutId=void 0},e)}afterHidden(){return this._onHide}isVisible(){return this._isVisible}ngOnDestroy(){this._cancelPendingAnimations(),this._onHide.complete(),this._triggerElement=null}_handleBodyInteraction(){this._closeOnInteraction&&this.hide(0)}_markForCheck(){this._changeDetectorRef.markForCheck()}_handleMouseLeave({relatedTarget:e}){(!e||!this._triggerElement.contains(e))&&(this.isVisible()?this.hide(this._mouseLeaveHideDelay):this._finalizeAnimation(!1))}_onShow(){this._isMultiline=this._isTooltipMultiline(),this._markForCheck()}_isTooltipMultiline(){let e=this._elementRef.nativeElement.getBoundingClientRect();return e.height>vL&&e.width>=bL}_handleAnimationEnd({animationName:e}){(e===this._showAnimation||e===this._hideAnimation)&&this._finalizeAnimation(e===this._showAnimation)}_cancelPendingAnimations(){this._showTimeoutId!=null&&clearTimeout(this._showTimeoutId),this._hideTimeoutId!=null&&clearTimeout(this._hideTimeoutId),this._showTimeoutId=this._hideTimeoutId=void 0}_finalizeAnimation(e){e?this._closeOnInteraction=!0:this.isVisible()||this._onHide.next()}_toggleVisibility(e){let r=this._tooltip.nativeElement,i=this._showAnimation,o=this._hideAnimation;if(r.classList.remove(e?o:i),r.classList.add(e?i:o),this._isVisible!==e&&(this._isVisible=e,this._changeDetectorRef.markForCheck()),e&&!this._animationsDisabled&&typeof getComputedStyle=="function"){let s=getComputedStyle(r);(s.getPropertyValue("animation-duration")==="0s"||s.getPropertyValue("animation-name")==="none")&&(this._animationsDisabled=!0)}e&&this._onShow(),this._animationsDisabled&&(r.classList.add("_mat-animation-noopable"),this._finalizeAnimation(e))}static \u0275fac=function(r){return new(r||n)};static \u0275cmp=ge({type:n,selectors:[["mat-tooltip-component"]],viewQuery:function(r,i){if(r&1&&Un(dL,7),r&2){let o;ze(o=We())&&(i._tooltip=o.first)}},hostAttrs:["aria-hidden","true"],hostBindings:function(r,i){r&1&&Oe("mouseleave",function(s){return i._handleMouseLeave(s)})},decls:4,vars:5,consts:[["tooltip",""],[1,"mdc-tooltip","mat-mdc-tooltip",3,"animationend"],[1,"mat-mdc-tooltip-surface","mdc-tooltip__surface"]],template:function(r,i){r&1&&(yi(0,"div",1,0),ed("animationend",function(s){return i._handleAnimationEnd(s)}),yi(2,"div",2),B(3),so()()),r&2&&(Pr(i.tooltipClass),Ge("mdc-tooltip--multiline",i._isMultiline),P(3),$t(i.message))},styles:[`.mat-mdc-tooltip {
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
`],encapsulation:2,changeDetection:0})}return n})();var zs=(()=>{class n{static \u0275fac=function(r){return new(r||n)};static \u0275mod=Ve({type:n});static \u0275inj=Ae({imports:[yv,$v,Kr,Hl]})}return n})();function _L(n,t){if(n&1&&(w(0,"div",4)(1,"h4"),B(2,"State Value"),S(),w(3,"pre")(4,"code"),B(5),Lr(6,"json"),S()()()),n&2){let e,r=ve();P(5),$t(co(6,1,(e=r.event().state)==null?null:e.value))}}function CL(n,t){if(n&1&&(w(0,"div",4)(1,"h4"),B(2,"Payload"),S(),w(3,"pre")(4,"code"),B(5),Lr(6,"json"),S()()()),n&2){let e=ve();P(5),$t(co(6,1,e.event().payload))}}function EL(n,t){if(n&1&&(w(0,"div",6)(1,"h4"),B(2,"Error"),S(),w(3,"pre")(4,"code"),B(5),Lr(6,"json"),S()()()),n&2){let e=ve();P(5),$t(co(6,1,e.event().error))}}var Hf=class n{event=hr.required();closeDetail=sd();static \u0275fac=function(e){return new(e||n)};static \u0275cmp=ge({type:n,selectors:[["sdux-devtools-pipeline-event-detail"]],inputs:{event:[1,"event"]},outputs:{closeDetail:"closeDetail"},decls:40,vars:10,consts:[[1,"detail-panel"],[1,"detail-header"],["type","button","aria-label","Close detail panel","matTooltip","Close detail panel",1,"close-btn",3,"click"],[1,"detail-body"],[1,"detail-block"],[1,"kv"],[1,"detail-block","error-block"]],template:function(e,r){if(e&1&&(w(0,"div",0)(1,"div",1)(2,"h3"),B(3,"Event Detail"),S(),w(4,"button",2),Oe("click",function(){return r.closeDetail.emit()}),B(5," \u2715 "),S()(),w(6,"div",3)(7,"div",4)(8,"ul",5)(9,"li")(10,"strong"),B(11,"key:"),S(),B(12),S(),w(13,"li")(14,"strong"),B(15,"type:"),S(),B(16),S(),w(17,"li")(18,"strong"),B(19,"boundary:"),S(),B(20),S(),w(21,"li")(22,"strong"),B(23,"event name:"),S(),B(24),S(),w(25,"li")(26,"strong"),B(27,"event id:"),S(),B(28),S(),w(29,"li")(30,"strong"),B(31,"trace id:"),S(),B(32),S(),w(33,"li")(34,"strong"),B(35,"source:"),S(),B(36),S()()(),Je(37,_L,7,3,"div",4),Je(38,CL,7,3,"div",4),Je(39,EL,7,3,"div",6),S()()),e&2){let i;P(12),ut(" ",r.event().behaviorKey),P(4),ut(" ",r.event().type),P(4),ut(" ",r.event().boundary),P(4),ut(" ",r.event().name),P(4),ut(" ",r.event().id),P(4),ut(" ",r.event().traceId??"null"),P(4),ut(" ",r.event().source??"N/A"),P(),et((i=r.event().state)!=null&&i.value?37:-1),P(),et(r.event().payload?38:-1),P(),et(r.event().error?39:-1)}},dependencies:[ys,zs,Ro,_g],styles:[".pointer[_ngcontent-%COMP%]{cursor:pointer}[_nghost-%COMP%]{display:flex;flex-direction:column;height:100%;max-height:100%;overflow:hidden}.detail-panel[_ngcontent-%COMP%]{display:flex;flex-direction:column;flex:1;min-height:0;overflow:hidden;background-color:#0f172a}.detail-panel[_ngcontent-%COMP%]   .detail-header[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:space-between;padding:.5rem 1rem;border-bottom:1px solid #63a4ff;flex-shrink:0}.detail-panel[_ngcontent-%COMP%]   .detail-header[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]{color:#fff;font-weight:600;font-family:Inter,system-ui,sans-serif;font-size:1rem;margin:0}.detail-panel[_ngcontent-%COMP%]   .detail-header[_ngcontent-%COMP%]   .close-btn[_ngcontent-%COMP%]{background:none;border:none;color:#94a3b8;font-size:1rem;cursor:pointer;padding:.25rem;border-radius:.25rem;line-height:1}.detail-panel[_ngcontent-%COMP%]   .detail-header[_ngcontent-%COMP%]   .close-btn[_ngcontent-%COMP%]:hover{color:#fff;background-color:#63a4ff}.detail-panel[_ngcontent-%COMP%]   .detail-body[_ngcontent-%COMP%]{flex:1;min-height:0;overflow-y:auto;padding:1rem}.detail-panel[_ngcontent-%COMP%]   .detail-body[_ngcontent-%COMP%]::-webkit-scrollbar{width:6px}.detail-panel[_ngcontent-%COMP%]   .detail-body[_ngcontent-%COMP%]::-webkit-scrollbar-thumb{background-color:#63a4ff;border-radius:.25rem}.detail-panel[_ngcontent-%COMP%]   .detail-columns[_ngcontent-%COMP%]{display:grid;grid-template-columns:1fr 1fr;gap:1rem}@media(max-width:768px){.detail-panel[_ngcontent-%COMP%]   .detail-columns[_ngcontent-%COMP%]{grid-template-columns:1fr}}.detail-panel[_ngcontent-%COMP%]   .detail-block[_ngcontent-%COMP%]{margin-bottom:1rem}.detail-panel[_ngcontent-%COMP%]   .detail-block[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%]{color:#e2e8f0;font-weight:600;font-family:Inter,system-ui,sans-serif;font-size:1rem;margin-bottom:.25rem}.detail-panel[_ngcontent-%COMP%]   .detail-block[_ngcontent-%COMP%]   .kv[_ngcontent-%COMP%]{list-style:none;padding:0;margin:0 0 .25rem}.detail-panel[_ngcontent-%COMP%]   .detail-block[_ngcontent-%COMP%]   .kv[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]{margin-bottom:.25rem;font-size:.875rem}.detail-panel[_ngcontent-%COMP%]   .detail-block[_ngcontent-%COMP%]   pre[_ngcontent-%COMP%]{background-color:#2c3a4f;border:1px solid #63a4ff;border-radius:.3125rem;padding:.5rem;font-size:.75rem;white-space:pre-wrap;word-break:break-all;overflow-wrap:break-word;color:#e2e8f0}.detail-panel[_ngcontent-%COMP%]   .detail-block[_ngcontent-%COMP%]   pre[_ngcontent-%COMP%]::-webkit-scrollbar{width:6px}.detail-panel[_ngcontent-%COMP%]   .detail-block[_ngcontent-%COMP%]   pre[_ngcontent-%COMP%]::-webkit-scrollbar-thumb{background-color:#63a4ff;border-radius:.25rem}.detail-panel[_ngcontent-%COMP%]   .error-block[_ngcontent-%COMP%]   pre[_ngcontent-%COMP%]{background-color:#b71c1c;border-color:#ef5350}"],changeDetection:0})};function DL(n,t){if(n&1&&(w(0,"span",7),B(1),S()),n&2){let e=ve(2);P(),$t(e.behaviorName())}}function wL(n,t){n&1&&(w(0,"span",10),B(1,"\u25CF"),S())}function TL(n,t){n&1&&Ue(0,"span",11)}function SL(n,t){n&1&&(w(0,"span",12),B(1,"\u270E"),S())}function IL(n,t){n&1&&Ue(0,"span",11)}function ML(n,t){n&1&&(w(0,"span",13),B(1,"\u26A0"),S())}function xL(n,t){n&1&&Ue(0,"span",11)}function RL(n,t){if(n&1){let e=gn();w(0,"div",1),Oe("click",function(){nt(e);let i=ve();return rt(i.selectEvent.emit(i.event()))})("keydown.enter",function(){nt(e);let i=ve();return rt(i.selectEvent.emit(i.event()))})("keydown.space",function(i){nt(e);let o=ve();return o.selectEvent.emit(o.event()),rt(i.preventDefault())}),w(1,"div",2)(2,"div",3),B(3),Lr(4,"number"),S(),w(5,"div",4),B(6),S()(),w(7,"div",5),Ue(8,"div",6),w(9,"div")(10,"span",7),B(11),Lr(12,"uppercase"),S(),Je(13,DL,2,1,"span",7),S(),w(14,"div",8)(15,"div",9),Je(16,wL,2,0,"span",10)(17,TL,1,0,"span",11),Je(18,SL,2,0,"span",12)(19,IL,1,0,"span",11),Je(20,ML,2,0,"span",13)(21,xL,1,0,"span",11),S(),w(22,"div",14),B(23),Lr(24,"date"),S()()()()}if(n&2){let e,r=ve();Ge("event-row-error",!!r.event().error)("event-row-selected",r.selected()),P(3),ut(" ",nd(4,15,r.totalEvents(),"3.0")," "),P(3),$t(r.event().cell),P(3),Pr(Jm("behavior-pills ",r.event().type)),P(2),$t(co(12,18,r.event().type)),P(2),et(r.event().type==="controller"||r.event().type==="stage"?13:-1),P(3),et((e=r.event().state)!=null&&e.hasValue?16:17),P(2),et(r.event().payload?18:19),P(2),et(r.event().error?20:21),P(3),ut(" ",nd(24,20,r.event().timestamp,"HH:mm:ss.SSS")," ")}}var zf=class n{event=hr.required();totalEvents=hr.required();selected=hr(!1);selectEvent=sd();parseBehaviorKey(){let t=this.event().behaviorKey;if(t.startsWith("SDUX::")){let r=t.split("::"),i=r[1],o=r[r.length-1];return[i.toUpperCase(),o.toUpperCase()]}return[t.replace(/^VAULT-/i,"").toUpperCase()]}behaviorName(){let t=this.event().behaviorKey;return t.startsWith("SDUX::")?t.split("::").pop().toUpperCase():t.replace(/^VAULT-/i,"").toUpperCase()}static \u0275fac=function(e){return new(e||n)};static \u0275cmp=ge({type:n,selectors:[["sdux-devtools-pipeline-event"]],inputs:{event:[1,"event"],totalEvents:[1,"totalEvents"],selected:[1,"selected"]},outputs:{selectEvent:"selectEvent"},decls:1,vars:1,consts:[["matTooltip","Click for more details","role","button","tabindex","0",1,"event-row-header",3,"event-row-error","event-row-selected"],["matTooltip","Click for more details","role","button","tabindex","0",1,"event-row-header",3,"click","keydown.enter","keydown.space"],[1,"row-primary"],[1,"counter"],[1,"cell"],[1,"row-secondary"],[1,"row-spacer"],[1,"pill"],[1,"indicators-ts"],[1,"indicators"],["matTooltip","State","aria-hidden","true",1,"icon","active"],["aria-hidden","true",1,"icon-spacer"],["matTooltip","Payload","aria-hidden","true",1,"icon","payload"],["matTooltip","Error","aria-hidden","true",1,"icon","error"],[1,"ts"]],template:function(e,r){e&1&&Je(0,RL,25,23,"div",0),e&2&&et(r.event()?0:-1)},dependencies:[ys,zs,Ro,vg,Cg,bg],styles:[".pointer[_ngcontent-%COMP%]{cursor:pointer}[_nghost-%COMP%]{display:block;overflow:hidden;background-color:#2c3a4f;border-radius:.3125rem;padding:.25rem .5rem;margin-bottom:.25rem}.event-row-header[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap;align-items:center;gap:.5rem;cursor:pointer}.event-row-header[_ngcontent-%COMP%]   .row-primary[_ngcontent-%COMP%], .event-row-header[_ngcontent-%COMP%]   .row-secondary[_ngcontent-%COMP%]{display:flex;align-items:center;gap:1rem}.event-row-header[_ngcontent-%COMP%]   .row-primary[_ngcontent-%COMP%]{flex-shrink:0}.event-row-header[_ngcontent-%COMP%]   .row-secondary[_ngcontent-%COMP%]{flex:1;min-width:0}.event-row-header[_ngcontent-%COMP%]   .row-secondary[_ngcontent-%COMP%]   .indicators-ts[_ngcontent-%COMP%]{margin-left:auto;display:flex;align-items:center}.event-row-header[_ngcontent-%COMP%]   .row-spacer[_ngcontent-%COMP%]{display:none}@media(max-width:768px){.event-row-header[_ngcontent-%COMP%]{flex-direction:column;align-items:stretch}.event-row-header[_ngcontent-%COMP%]   .row-primary[_ngcontent-%COMP%], .event-row-header[_ngcontent-%COMP%]   .row-secondary[_ngcontent-%COMP%]{width:100%}.event-row-header[_ngcontent-%COMP%]   .row-spacer[_ngcontent-%COMP%]{display:block;width:4.25rem;flex-shrink:0}.event-row-header[_ngcontent-%COMP%]   .cell[_ngcontent-%COMP%]{min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}}.event-row-header[_ngcontent-%COMP%]   .behavior-pills[_ngcontent-%COMP%]{display:flex;gap:2px}.event-row-header[_ngcontent-%COMP%]   .behavior-pills[_ngcontent-%COMP%]   .pill[_ngcontent-%COMP%]{color:#fff;font-weight:600;font-family:Inter,system-ui,sans-serif;font-size:.75rem;padding:.25rem .5rem;white-space:nowrap}.event-row-header[_ngcontent-%COMP%]   .behavior-pills[_ngcontent-%COMP%]   .pill[_ngcontent-%COMP%]:first-child{border-radius:.25rem 0 0 .25rem}.event-row-header[_ngcontent-%COMP%]   .behavior-pills[_ngcontent-%COMP%]   .pill[_ngcontent-%COMP%]:last-child{border-radius:0 .25rem .25rem 0}.event-row-header[_ngcontent-%COMP%]   .behavior-pills[_ngcontent-%COMP%]   .pill[_ngcontent-%COMP%]:only-child{border-radius:.25rem}.event-row-header[_ngcontent-%COMP%]   .behavior-pills.stage[_ngcontent-%COMP%]   .pill[_ngcontent-%COMP%]{background-color:#1976d2}.event-row-header[_ngcontent-%COMP%]   .behavior-pills.lifecycle[_ngcontent-%COMP%]   .pill[_ngcontent-%COMP%]{background-color:#388e3c}.event-row-header[_ngcontent-%COMP%]   .behavior-pills.controller[_ngcontent-%COMP%]   .pill[_ngcontent-%COMP%]{background-color:#fbc02d;color:#000}.event-row-header[_ngcontent-%COMP%]   .behavior-pills.conductor[_ngcontent-%COMP%]   .pill[_ngcontent-%COMP%]{background-color:#d32f2f}.event-row-header[_ngcontent-%COMP%]   .counter[_ngcontent-%COMP%]{color:#e2e8f0;font-weight:400;font-family:Inter,system-ui,sans-serif;font-size:.875rem;width:3rem;text-align:left}.event-row-header[_ngcontent-%COMP%]   .cell[_ngcontent-%COMP%]{color:#fff;font-weight:400;font-family:Inter,system-ui,sans-serif;font-weight:500;font-size:1rem}.event-row-header[_ngcontent-%COMP%]   .indicators[_ngcontent-%COMP%]{display:flex;align-items:center;gap:.25rem}.event-row-header[_ngcontent-%COMP%]   .indicators[_ngcontent-%COMP%]   .icon[_ngcontent-%COMP%], .event-row-header[_ngcontent-%COMP%]   .indicators[_ngcontent-%COMP%]   .icon-spacer[_ngcontent-%COMP%]{display:inline-block;width:1em;font-size:1rem;text-align:center}.event-row-header[_ngcontent-%COMP%]   .indicators[_ngcontent-%COMP%]   .icon[_ngcontent-%COMP%]{transition:color .15s ease}.event-row-header[_ngcontent-%COMP%]   .indicators[_ngcontent-%COMP%]   .icon.active[_ngcontent-%COMP%]{color:#81c784}.event-row-header[_ngcontent-%COMP%]   .indicators[_ngcontent-%COMP%]   .icon.payload[_ngcontent-%COMP%]{color:#63a4ff}.event-row-header[_ngcontent-%COMP%]   .indicators[_ngcontent-%COMP%]   .icon.error[_ngcontent-%COMP%]{color:#d32f2f}.event-row-header.event-row-error[_ngcontent-%COMP%]{background-color:#d32f2f14;border-left:3px solid #d32f2f}.event-row-header.event-row-selected[_ngcontent-%COMP%]{background-color:#ffffff14;border-left:3px solid #1976d2}.event-row-header.event-row-selected.event-row-error[_ngcontent-%COMP%]{border-left-color:#d32f2f}.event-row-header[_ngcontent-%COMP%]   .ts[_ngcontent-%COMP%]{color:#e2e8f0;font-weight:400;font-family:Inter,system-ui,sans-serif;font-size:.75rem;white-space:nowrap}"],changeDetection:0})};function AL(n,t){if(n&1){let e=gn();w(0,"div",5)(1,"sdux-devtools-pipeline-event",6),Oe("selectEvent",function(i){nt(e);let o=ve(2);return rt(o.selectEvent(i))}),S()()}if(n&2){let e,r=t.$implicit,i=t.index,o=ve(2);P(),ct("event",r)("totalEvents",o.totalEvents()-i)("selected",((e=o.selectedEvent())==null?null:e.id)===r.id)}}function kL(n,t){if(n&1&&(w(0,"cdk-virtual-scroll-viewport",2),dr(1,AL,2,3,"div",4),S()),n&2){let e=ve();P(),ct("cdkVirtualForOf",e.reversedEvents())("cdkVirtualForTrackBy",e.trackById)}}function OL(n,t){if(n&1){let e=gn();w(0,"aside",3)(1,"sdux-devtools-pipeline-event-detail",7),Oe("closeDetail",function(){nt(e);let i=ve();return rt(i.closeDetail())}),S()()}n&2&&(P(),ct("event",t))}var Wf=class n{events=hr.required();reversedEvents=Ct(()=>[...this.events()].reverse());totalEvents=Ct(()=>this.events().length);selectedEvent=Re(null);trackById(t,e){return e.id}selectEvent(t){this.selectedEvent.set(t)}closeDetail(){this.selectedEvent.set(null)}static \u0275fac=function(e){return new(e||n)};static \u0275cmp=ge({type:n,selectors:[["sdux-devtools-main-pipeline-panel"]],inputs:{events:[1,"events"]},decls:4,vars:2,consts:[[1,"pipeline-panel"],[1,"event-stream"],["itemSize","52","role","log","aria-label","Pipeline events",1,"event-list"],[1,"detail-pane"],["class","event-row",4,"cdkVirtualFor","cdkVirtualForOf","cdkVirtualForTrackBy"],[1,"event-row"],[3,"selectEvent","event","totalEvents","selected"],[3,"closeDetail","event"]],template:function(e,r){if(e&1&&(w(0,"div",0)(1,"section",1),Je(2,kL,2,2,"cdk-virtual-scroll-viewport",2),S(),Je(3,OL,2,1,"aside",3),S()),e&2){let i;P(2),et(r.reversedEvents()?2:-1),P(),et((i=r.selectedEvent())?3:-1,i)}},dependencies:[Wl,wv,Sv,Tv,zf,Hf],styles:[".pointer[_ngcontent-%COMP%]{cursor:pointer}[_nghost-%COMP%]{display:block;height:100%;overflow:hidden}.pipeline-panel[_ngcontent-%COMP%]{display:flex;flex-direction:row;height:100%;overflow:hidden;padding:0;color:#e2e8f0;font-weight:400;font-family:Inter,system-ui,sans-serif}.pipeline-panel[_ngcontent-%COMP%]   .event-stream[_ngcontent-%COMP%]{flex:1;display:flex;flex-direction:column;min-height:0;min-width:0}.pipeline-panel[_ngcontent-%COMP%]   .event-stream[_ngcontent-%COMP%]   .event-list[_ngcontent-%COMP%]{flex:1;min-height:0;height:100%;overscroll-behavior:contain;margin-bottom:3rem}.pipeline-panel[_ngcontent-%COMP%]   .event-stream[_ngcontent-%COMP%]   .event-list[_ngcontent-%COMP%]   .cdk-virtual-scroll-content-wrapper[_ngcontent-%COMP%]{padding-bottom:2rem}.pipeline-panel[_ngcontent-%COMP%]   .event-stream[_ngcontent-%COMP%]   .event-list[_ngcontent-%COMP%]::-webkit-scrollbar{width:8px}.pipeline-panel[_ngcontent-%COMP%]   .event-stream[_ngcontent-%COMP%]   .event-list[_ngcontent-%COMP%]::-webkit-scrollbar-thumb{background-color:#63a4ff;border-radius:.25rem}.pipeline-panel[_ngcontent-%COMP%]   .detail-pane[_ngcontent-%COMP%]{width:400px;min-width:400px;flex-shrink:0;display:flex;flex-direction:column;border-left:1px solid #63a4ff;margin-bottom:3rem;min-height:0}.pipeline-panel[_ngcontent-%COMP%]   .detail-pane[_ngcontent-%COMP%]   sdux-devtools-pipeline-event-detail[_ngcontent-%COMP%]{display:flex;flex-direction:column;flex:1;min-height:0}.pipeline-panel[_ngcontent-%COMP%]   .detail-empty[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:center;height:100%}.pipeline-panel[_ngcontent-%COMP%]   .detail-empty[_ngcontent-%COMP%]   .detail-empty-text[_ngcontent-%COMP%]{color:#94a3b8;font-weight:400;font-family:Inter,system-ui,sans-serif;font-size:.875rem}@media(max-width:768px){.pipeline-panel[_ngcontent-%COMP%]{flex-direction:column;overflow:hidden}.pipeline-panel[_ngcontent-%COMP%]   .event-stream[_ngcontent-%COMP%]{height:100%;min-height:0;overflow:hidden}.pipeline-panel[_ngcontent-%COMP%]   .event-stream[_ngcontent-%COMP%]   .event-list[_ngcontent-%COMP%]{height:100%;margin-bottom:0}.pipeline-panel[_ngcontent-%COMP%]:has(.detail-pane)   .event-stream[_ngcontent-%COMP%]{height:35%}.pipeline-panel[_ngcontent-%COMP%]   .detail-pane[_ngcontent-%COMP%]{width:100%;min-width:0;flex:0 0 calc(55% - 20px);margin-top:.5rem;margin-bottom:0;border:1px solid #63a4ff;box-sizing:border-box;overflow:hidden}.pipeline-panel[_ngcontent-%COMP%]   .detail-pane[_ngcontent-%COMP%]   sdux-devtools-pipeline-event-detail[_ngcontent-%COMP%]{height:100%;flex:none}}.pipeline-panel[_ngcontent-%COMP%]   .event-row[_ngcontent-%COMP%]{display:block;padding:.5rem 0;border-bottom:1px solid #63a4ff}.pipeline-panel[_ngcontent-%COMP%]   .event-row[_ngcontent-%COMP%]:hover{background-color:#ffffff14}.pipeline-panel[_ngcontent-%COMP%]   .event-row-header[_ngcontent-%COMP%]{width:100%;display:grid;grid-template-columns:4rem 140px 1fr auto;align-items:center;gap:1rem}.pipeline-panel[_ngcontent-%COMP%]   .badge[_ngcontent-%COMP%]{color:#fff;font-weight:600;font-family:Inter,system-ui,sans-serif;font-size:.75rem;padding:.25rem .5rem;border-radius:.25rem;justify-self:start}.pipeline-panel[_ngcontent-%COMP%]   .badge.init[_ngcontent-%COMP%]{background-color:#388e3c}.pipeline-panel[_ngcontent-%COMP%]   .badge.patch[_ngcontent-%COMP%]{background-color:#fbc02d;color:#000}.pipeline-panel[_ngcontent-%COMP%]   .badge.error[_ngcontent-%COMP%]{background-color:#d32f2f}.pipeline-panel[_ngcontent-%COMP%]   .counter[_ngcontent-%COMP%]{color:#94a3b8;font-weight:400;font-family:Inter,system-ui,sans-serif;font-size:.875rem;width:3rem;text-align:left}.pipeline-panel[_ngcontent-%COMP%]   .cell[_ngcontent-%COMP%]{color:#94a3b8;font-weight:400;font-family:Inter,system-ui,sans-serif;font-weight:500;font-size:1rem;min-width:125px}.pipeline-panel[_ngcontent-%COMP%]   .ts[_ngcontent-%COMP%]{color:#94a3b8;font-weight:400;font-family:Inter,system-ui,sans-serif;font-size:.75rem;white-space:nowrap}.pipeline-panel[_ngcontent-%COMP%]   .event-details[_ngcontent-%COMP%]{grid-column:1/-1;margin-top:.25rem;padding-left:.5rem}.pipeline-panel[_ngcontent-%COMP%]   .event-details[_ngcontent-%COMP%]   summary[_ngcontent-%COMP%]{cursor:pointer;color:#1976d2;font-weight:400;font-family:Inter,system-ui,sans-serif;font-size:.875rem;margin-bottom:.25rem}.pipeline-panel[_ngcontent-%COMP%]   .event-details[_ngcontent-%COMP%]   summary[_ngcontent-%COMP%]:hover{text-decoration:underline}.pipeline-panel[_ngcontent-%COMP%]   .event-details[_ngcontent-%COMP%]   .detail-block[_ngcontent-%COMP%]{margin-bottom:1rem}.pipeline-panel[_ngcontent-%COMP%]   .event-details[_ngcontent-%COMP%]   .detail-block[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%]{color:#e2e8f0;font-weight:600;font-family:Inter,system-ui,sans-serif;font-size:1rem;margin-bottom:.25rem}.pipeline-panel[_ngcontent-%COMP%]   .event-details[_ngcontent-%COMP%]   .detail-block[_ngcontent-%COMP%]   .kv[_ngcontent-%COMP%]{list-style:none;padding:0;margin:0 0 .25rem}.pipeline-panel[_ngcontent-%COMP%]   .event-details[_ngcontent-%COMP%]   .detail-block[_ngcontent-%COMP%]   .kv[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]{margin-bottom:.25rem;font-size:.875rem}.pipeline-panel[_ngcontent-%COMP%]   .event-details[_ngcontent-%COMP%]   .detail-block[_ngcontent-%COMP%]   pre[_ngcontent-%COMP%]{background-color:#0f172a;border:1px solid #63a4ff;border-radius:.3125rem;padding:.5rem;font-size:.75rem;overflow-x:auto;color:#e2e8f0}.pipeline-panel[_ngcontent-%COMP%]   .event-details[_ngcontent-%COMP%]   .error-block[_ngcontent-%COMP%]   pre[_ngcontent-%COMP%]{background-color:#b71c1c;border-color:#ef5350}"],changeDetection:0})};function WS(n){n||(n=h(Ke));let t=new N(e=>{if(n.destroyed){e.next();return}return n.onDestroy(e.next.bind(e))});return e=>e.pipe(J(t))}var NL="@sdux-vault/devtools",PL="0.9.2";yo(NL,PL);var zv=null;function Gv(){return zv||(zv=new Wv),zv}var Wv=class{#t=new C;constructor(){window.sdux??={},window.sdux.vaultEventBus=this}nextPipeline(t){gr.active&&t&&this.#t.next(t)}pipeline$(){return this.#t.asObservable()}};var Gf=class n{constructor(t){this.zone=t;this.isChromeExtension=typeof chrome<"u"&&!!chrome?.runtime?.connect,this.isChromeExtension&&this.#i()}#t=new C;isChromeExtension;#r=Gv();#n=null;#e=null;static RECONNECT_DELAY_MS=1e3;pipeline$(){return this.isChromeExtension?this.#t.asObservable():this.#r.pipeline$()}listenPipeline(t){let e=this.pipeline$().subscribe(t);return()=>e.unsubscribe()}#i(){this.#n=chrome.runtime.connect({name:"vault-devtools"}),this.#n.onMessage.addListener(t=>{t?.type&&(t.type==="VAULT_PIPELINE_EVENT"?this.zone.run(()=>{this.#t.next(t.event)}):console.warn(`[Vault DevTools] Unhandled message type: "${t.type}"`))}),this.#n.onDisconnect.addListener(()=>{this.#n=null,this.#a()})}#a(){this.#e!=null&&clearTimeout(this.#e),this.#e=setTimeout(()=>{this.#e=null,this.#i()},n.RECONNECT_DELAY_MS)}static \u0275fac=function(e){return new(e||n)(H(V))};static \u0275prov=y({token:n,factory:n.\u0275fac,providedIn:"root"})};var Bt=class{vault=rv(Bt);bus=h(Gf);destroyRef=h(Ke);events=Ct(()=>this.vault.state.value()??[]);totalEvents=Ct(()=>this.events().length);constructor(){this.vault.initialize(),this.vault.fromStream(this.bus.pipeline$().pipe(be(t=>!!t&&t.cell!==xs),WS(this.destroyRef)))}clearEvents(){this.vault.reset(),this.vault.replaceState({value:[]})}};D(Bt,"\u0275fac",function(e){return new(e||Bt)}),D(Bt,"\u0275prov",y({token:Bt,factory:Bt.\u0275fac,providedIn:"root"})),Bt=oe([nv(xs)],Bt);function LL(n,t){if(n&1){let e=gn();w(0,"span",13),B(1," All Events "),w(2,"button",14),Oe("click",function(i){nt(e);let o=ve(2);return rt(o.downloadAllEvents(i))}),wa(),w(3,"svg",15),Ue(4,"path",16),S()()()}}function FL(n,t){if(n&1){let e=gn();w(0,"span",13),B(1," Error Events "),w(2,"button",17),Oe("click",function(i){nt(e);let o=ve(2);return rt(o.downloadErrorEvents(i))}),wa(),w(3,"svg",15),Ue(4,"path",16),S()()()}}function BL(n,t){if(n&1&&(w(0,"mat-tab-group",9)(1,"mat-tab"),dr(2,LL,5,0,"ng-template",10),w(3,"section",11),Ue(4,"sdux-devtools-main-pipeline-panel",12),S()(),w(5,"mat-tab"),dr(6,FL,5,0,"ng-template",10),w(7,"section",11),Ue(8,"sdux-devtools-main-pipeline-panel",12),S()()()),n&2){let e=ve();P(4),ct("events",e.events()),P(4),ct("events",e.errorEvents())}}function jL(n,t){n&1&&(w(0,"section",18),B(1," Events only appear "),w(2,"strong"),B(3,"after this panel opens and a decorated @FeatureCell service is instantiated."),S(),B(4,". "),w(5,"p"),B(6," FeatureCells are lazyloaded and only activated when the service is instantiated. The DevTools "),w(7,"strong"),B(8,"will only"),S(),B(9," connect once an @FeatureCell is active. "),S(),w(10,"p"),B(11," Click on a route with a component using an injected @FeatureCell service to trigger events in your app. "),S()(),w(12,"section",19),Ue(13,"img",20),S())}function VL(){try{return chrome.runtime.getManifest().version}catch{return"dev"}}var UL=new b("EXTENSION_VERSION",{providedIn:"root",factory:VL}),qf=class n{devtools=h(Bt);version=h(UL);events=Ct(()=>this.devtools.events());totalEvents=Ct(()=>this.events()?.length);errorEvents=Ct(()=>this.events()?.filter(t=>!!t.error)??[]);clearEvents(){this.devtools.clearEvents()}downloadAllEvents(t){t.stopPropagation(),this.downloadEvents(this.events(),"all-events")}downloadErrorEvents(t){t.stopPropagation(),this.downloadEvents(this.errorEvents(),"error-events")}downloadEvents(t,e){let r=new Blob([JSON.stringify(t,null,2)],{type:"application/json"}),i=document.createElement("a");i.href=URL.createObjectURL(r),i.download=`sdux-${e}-${Date.now()}.json`,i.click(),URL.revokeObjectURL(i.href)}static \u0275fac=function(e){return new(e||n)};static \u0275cmp=ge({type:n,selectors:[["sdux-devtools-splash-page"]],decls:14,vars:3,consts:[[1,"vault-devtools"],[1,"header"],[1,"title"],["matTooltip","SDuX Vault DevTools",1,"logo"],["src","/assets/brand/brand-landscape-dark.svg","alt","SDuX Vault"],[1,"subtitle"],[1,"meta"],["matTooltip","Total pipeline events captured","aria-label","Total pipeline events captured",1,"event-count"],["type","button","matTooltip","Clear all events","aria-label","Clear all events",1,"btn-clear",3,"click"],["animationDuration","200ms",1,"vault-tabs"],["mat-tab-label",""],[1,"vault-tab-content"],[3,"events"],[1,"tab-label"],["type","button","aria-label","Download all events","matTooltip","Download all events",1,"tab-download-btn",3,"click"],["xmlns","http://www.w3.org/2000/svg","viewBox","0 0 24 24","fill","currentColor","width","18","height","18",1,"download-icon"],["d","M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"],["type","button","aria-label","Download error events","matTooltip","Download error events",1,"tab-download-btn",3,"click"],[1,"warning"],[1,"vault-empty"],["src","/assets/brand/brand-landscape-dark.svg","alt","SDuX Vault logo","matTooltip","SDuX Vault",1,"logo"]],template:function(e,r){e&1&&(w(0,"div",0)(1,"header",1)(2,"div",2)(3,"div",3),Ue(4,"img",4),S(),w(5,"span",5),B(6),S()(),w(7,"div",6)(8,"span",7),B(9),S(),w(10,"button",8),Oe("click",function(){return r.clearEvents()}),B(11," Clear "),S()()(),Je(12,BL,9,2,"mat-tab-group",9)(13,jL,14,0),S()),e&2&&(P(6),ut("DevTools (v",r.version,")"),P(3),ut(" ",r.totalEvents()," events "),P(3),et(r.totalEvents()?12:13))},dependencies:[DS,Fv,Bv,ES,zs,Ro,Wf],styles:['@charset "UTF-8";.pointer[_ngcontent-%COMP%]{cursor:pointer}[_nghost-%COMP%]{display:block;height:100vh}.vault-devtools[_ngcontent-%COMP%]{height:100vh;min-height:0;display:flex;flex-direction:column;padding:1rem;overflow:hidden;background-color:#1f2a3a;border:1px solid #63a4ff;color:#e2e8f0;font-weight:400;font-family:Inter,system-ui,sans-serif;border:none}@media(max-width:768px){.vault-devtools[_ngcontent-%COMP%]{padding:1rem 1rem 0}}.vault-devtools[_ngcontent-%COMP%]   .header[_ngcontent-%COMP%]{display:flex;justify-content:space-between;align-items:center;margin-bottom:1rem;border-bottom:1px solid #63a4ff}.vault-devtools[_ngcontent-%COMP%]   .header[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%]{display:flex;align-items:center;gap:.5rem}.vault-devtools[_ngcontent-%COMP%]   .header[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%]   .logo[_ngcontent-%COMP%]{width:120px}.vault-devtools[_ngcontent-%COMP%]   .header[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%]   .subtitle[_ngcontent-%COMP%]{color:#94a3b8;font-weight:400;font-family:Inter,system-ui,sans-serif;font-size:1rem}@media(max-width:768px){.vault-devtools[_ngcontent-%COMP%]   .header[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%]   .subtitle[_ngcontent-%COMP%]{display:none}}.vault-devtools[_ngcontent-%COMP%]   .header[_ngcontent-%COMP%]   .meta[_ngcontent-%COMP%]{display:flex;align-items:center;gap:1rem}.vault-devtools[_ngcontent-%COMP%]   .header[_ngcontent-%COMP%]   .meta[_ngcontent-%COMP%]   .event-count[_ngcontent-%COMP%]{color:#94a3b8;font-weight:400;font-family:Inter,system-ui,sans-serif;font-size:.875rem}.vault-devtools[_ngcontent-%COMP%]   .header[_ngcontent-%COMP%]   .meta[_ngcontent-%COMP%]   .btn-clear[_ngcontent-%COMP%]{height:40px!important;min-width:90px!important;display:flex;flex-direction:row;justify-content:center;align-items:center;color:#fff!important;background-color:transparent!important;border:1px solid #63a4ff!important;border-radius:.3125rem!important;font-size:.875rem!important;padding:.5rem;gap:.25rem;font-weight:600}.vault-devtools[_ngcontent-%COMP%]   .header[_ngcontent-%COMP%]   .meta[_ngcontent-%COMP%]   .btn-clear[_ngcontent-%COMP%]   .mat-icon[_ngcontent-%COMP%]{transform:scale(.75)}.vault-devtools[_ngcontent-%COMP%]   .header[_ngcontent-%COMP%]   .meta[_ngcontent-%COMP%]   .btn-clear[_ngcontent-%COMP%]{cursor:pointer;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.vault-devtools[_ngcontent-%COMP%]   .header[_ngcontent-%COMP%]   .meta[_ngcontent-%COMP%]   .btn-clear[_ngcontent-%COMP%]   .button-text[_ngcontent-%COMP%]{height:40px}.vault-devtools[_ngcontent-%COMP%]   .header[_ngcontent-%COMP%]   .meta[_ngcontent-%COMP%]   .btn-clear[_ngcontent-%COMP%]   .mat-icon[_ngcontent-%COMP%]{width:22px!important;height:22px!important;position:relative;padding-left:.25rem;padding-right:.25rem;gap:.25rem}.vault-devtools[_ngcontent-%COMP%]   .header[_ngcontent-%COMP%]   .meta[_ngcontent-%COMP%]   .btn-clear[_ngcontent-%COMP%]:focus{outline:none}.vault-devtools[_ngcontent-%COMP%]   .header[_ngcontent-%COMP%]   .meta[_ngcontent-%COMP%]   .btn-clear[_ngcontent-%COMP%]:hover{background-color:#ffffff14!important}.vault-devtools[_ngcontent-%COMP%]   .warning[_ngcontent-%COMP%]{background-color:#fff263;border-left:4px solid #c49000;color:#000;padding:.5rem 1rem;border-radius:.3125rem;margin-bottom:1rem;font-size:.875rem}.vault-devtools[_ngcontent-%COMP%]   .vault-tabs[_ngcontent-%COMP%]{flex:1;min-height:0;display:flex;flex-direction:column}.vault-devtools[_ngcontent-%COMP%]   .vault-tabs[_ngcontent-%COMP%]     .mat-mdc-tab-header{background-color:#0f172a;border-bottom:1px solid #63a4ff}.vault-devtools[_ngcontent-%COMP%]   .vault-tabs[_ngcontent-%COMP%]     .mat-mdc-tab-body-wrapper{flex:1;min-height:0;display:flex}.vault-devtools[_ngcontent-%COMP%]   .vault-tabs[_ngcontent-%COMP%]     .mat-mdc-tab-body{flex:1;min-height:0}.vault-devtools[_ngcontent-%COMP%]   .vault-tabs[_ngcontent-%COMP%]     .mat-mdc-tab-body .mat-mdc-tab-body-content{flex:1;min-height:0;overflow:hidden;display:flex;flex-direction:column}.vault-devtools[_ngcontent-%COMP%]   .vault-tab-content[_ngcontent-%COMP%]{flex:1;min-height:0;height:0;overflow:hidden;display:flex;flex-direction:column}.vault-devtools[_ngcontent-%COMP%]   .vault-tab-content[_ngcontent-%COMP%]   sdux-devtools-main-pipeline-panel[_ngcontent-%COMP%]{flex:1;min-height:0;overflow:hidden}@media(max-width:768px){.vault-devtools[_ngcontent-%COMP%]   .vault-tab-content[_ngcontent-%COMP%]{padding-right:.5rem}}.vault-devtools[_ngcontent-%COMP%]   .vault-tab-content[_ngcontent-%COMP%]::-webkit-scrollbar{width:8px}.vault-devtools[_ngcontent-%COMP%]   .vault-tab-content[_ngcontent-%COMP%]::-webkit-scrollbar-thumb{background-color:#63a4ff;border-radius:.25rem}.vault-devtools[_ngcontent-%COMP%]   .vault-empty[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center}.vault-devtools[_ngcontent-%COMP%]   .vault-empty[_ngcontent-%COMP%]   .logo[_ngcontent-%COMP%]{width:200px;height:auto;filter:drop-shadow(0 2px 4px rgba(0,0,0,.35));transition:opacity .25s ease}.vault-devtools[_ngcontent-%COMP%]   .vault-empty[_ngcontent-%COMP%]   .logo[_ngcontent-%COMP%]:hover{opacity:.9}.vault-devtools[_ngcontent-%COMP%]   .tab-label[_ngcontent-%COMP%]{display:flex;align-items:center;gap:.5rem}.vault-devtools[_ngcontent-%COMP%]   .tab-label[_ngcontent-%COMP%]   .tab-download-btn[_ngcontent-%COMP%]{display:inline-flex;align-items:center;justify-content:center;vertical-align:middle;background:none;border:none;color:#94a3b8;cursor:pointer;padding:.25rem;border-radius:.25rem;line-height:1}.vault-devtools[_ngcontent-%COMP%]   .tab-label[_ngcontent-%COMP%]   .tab-download-btn[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{font-size:1rem;width:1rem;height:1rem}.vault-devtools[_ngcontent-%COMP%]   .tab-label[_ngcontent-%COMP%]   .tab-download-btn[_ngcontent-%COMP%]:hover{color:#fff;background-color:#63a4ff}  .mat-mdc-tab-label-container{background-color:#fff;border-top-left-radius:.5rem;border-top-right-radius:.5rem}'],changeDetection:0})};var GS=[{path:"",component:qf},{path:"**",redirectTo:""}];var qS={providers:[Bp(),tg(),iy(GS,oy()),av({logLevel:"error"}),sv(Bt,{key:xs,initialState:[]},[Cn])]};var Kf=class n{static \u0275fac=function(e){return new(e||n)};static \u0275cmp=ge({type:n,selectors:[["sdux-devtools-root"]],decls:2,vars:0,consts:[[1,"router-container"]],template:function(e,r){e&1&&(w(0,"div",0),Ue(1,"router-outlet"),S())},dependencies:[yl],styles:[".router-container[_ngcontent-%COMP%]{height:100%}[_nghost-%COMP%]{display:block;height:100%}"],changeDetection:0})};Ag(Kf,qS).catch(n=>console.error(n));
