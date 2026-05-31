var Lb=Object.defineProperty,KI=Object.defineProperties,YI=Object.getOwnPropertyDescriptor,ZI=Object.getOwnPropertyDescriptors;var Pb=Object.getOwnPropertySymbols;var XI=Object.prototype.hasOwnProperty,QI=Object.prototype.propertyIsEnumerable;var Fb=n=>{throw TypeError(n)};var Th=(n,t,e)=>t in n?Lb(n,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):n[t]=e,g=(n,t)=>{for(var e in t||={})XI.call(t,e)&&Th(n,e,t[e]);if(Pb)for(var e of Pb(t))QI.call(t,e)&&Th(n,e,t[e]);return n},W=(n,t)=>KI(n,ZI(t));var de=(n,t,e,r)=>{for(var i=r>1?void 0:r?YI(t,e):t,o=n.length-1,s;o>=0;o--)(s=n[o])&&(i=(r?s(t,e,i):s(i))||i);return r&&i&&Lb(t,e,i),i};var T=(n,t,e)=>Th(n,typeof t!="symbol"?t+"":t,e),Sh=(n,t,e)=>t.has(n)||Fb("Cannot "+e);var Ih=(n,t,e)=>(Sh(n,t,"read from private field"),e?e.call(n):t.get(n)),Jo=(n,t,e)=>t.has(n)?Fb("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(n):t.set(n,e),Mh=(n,t,e,r)=>(Sh(n,t,"write to private field"),r?r.call(n,e):t.set(n,e),e),Pr=(n,t,e)=>(Sh(n,t,"access private method"),e);var wt=null,wc=!1,xh=1,JI=null,ct=Symbol("SIGNAL");function N(n){let t=wt;return wt=n,t}function Tc(){return wt}var hi={version:0,lastCleanEpoch:0,dirty:!1,producers:void 0,producersTail:void 0,consumers:void 0,consumersTail:void 0,recomputing:!1,consumerAllowSignalWrites:!1,consumerIsAlwaysLive:!1,kind:"unknown",producerMustRecompute:()=>!1,producerRecomputeValue:()=>{},consumerMarkedDirty:()=>{},consumerOnSignalRead:()=>{}};function Xi(n){if(wc)throw new Error("");if(wt===null)return;wt.consumerOnSignalRead(n);let t=wt.producersTail;if(t!==void 0&&t.producer===n)return;let e,r=wt.recomputing;if(r&&(e=t!==void 0?t.nextProducer:wt.producers,e!==void 0&&e.producer===n)){wt.producersTail=e,e.lastReadVersion=n.version;return}let i=n.consumersTail;if(i!==void 0&&i.consumer===wt&&(!r||tM(i,wt)))return;let o=ts(wt),s={producer:n,consumer:wt,nextProducer:e,prevConsumer:i,lastReadVersion:n.version,nextConsumer:void 0};wt.producersTail=s,t!==void 0?t.nextProducer=s:wt.producers=s,o&&Ub(n,s)}function Bb(){xh++}function Qi(n){if(!(ts(n)&&!n.dirty)&&!(!n.dirty&&n.lastCleanEpoch===xh)){if(!n.producerMustRecompute(n)&&!Ca(n)){es(n);return}n.producerRecomputeValue(n),es(n)}}function Rh(n){if(n.consumers===void 0)return;let t=wc;wc=!0;try{for(let e=n.consumers;e!==void 0;e=e.nextConsumer){let r=e.consumer;r.dirty||eM(r)}}finally{wc=t}}function kh(){return wt?.consumerAllowSignalWrites!==!1}function eM(n){n.dirty=!0,Rh(n),n.consumerMarkedDirty?.(n)}function es(n){n.dirty=!1,n.lastCleanEpoch=xh}function pi(n){return n&&jb(n),N(n)}function jb(n){n.producersTail=void 0,n.recomputing=!0}function Ji(n,t){N(t),n&&Vb(n)}function Vb(n){n.recomputing=!1;let t=n.producersTail,e=t!==void 0?t.nextProducer:n.producers;if(e!==void 0){if(ts(n))do e=Ah(e);while(e!==void 0);t!==void 0?t.nextProducer=void 0:n.producers=void 0}}function Ca(n){for(let t=n.producers;t!==void 0;t=t.nextProducer){let e=t.producer,r=t.lastReadVersion;if(r!==e.version||(Qi(e),r!==e.version))return!0}return!1}function eo(n){if(ts(n)){let t=n.producers;for(;t!==void 0;)t=Ah(t)}n.producers=void 0,n.producersTail=void 0,n.consumers=void 0,n.consumersTail=void 0}function Ub(n,t){let e=n.consumersTail,r=ts(n);if(e!==void 0?(t.nextConsumer=e.nextConsumer,e.nextConsumer=t):(t.nextConsumer=void 0,n.consumers=t),t.prevConsumer=e,n.consumersTail=t,!r)for(let i=n.producers;i!==void 0;i=i.nextProducer)Ub(i.producer,i)}function Ah(n){let t=n.producer,e=n.nextProducer,r=n.nextConsumer,i=n.prevConsumer;if(n.nextConsumer=void 0,n.prevConsumer=void 0,r!==void 0?r.prevConsumer=i:t.consumersTail=i,i!==void 0)i.nextConsumer=r;else if(t.consumers=r,!ts(t)){let o=t.producers;for(;o!==void 0;)o=Ah(o)}return e}function ts(n){return n.consumerIsAlwaysLive||n.consumers!==void 0}function Da(n){JI?.(n)}function tM(n,t){let e=t.producersTail;if(e!==void 0){let r=t.producers;do{if(r===n)return!0;if(r===e)break;r=r.nextProducer}while(r!==void 0)}return!1}function Ea(n,t){return Object.is(n,t)}function Sc(n,t){let e=Object.create(nM);e.computation=n,t!==void 0&&(e.equal=t);let r=()=>{if(Qi(e),Xi(e),e.value===hr)throw e.error;return e.value};return r[ct]=e,Da(e),r}var Yi=Symbol("UNSET"),Zi=Symbol("COMPUTING"),hr=Symbol("ERRORED"),nM=W(g({},hi),{value:Yi,dirty:!0,error:null,equal:Ea,kind:"computed",producerMustRecompute(n){return n.value===Yi||n.value===Zi},producerRecomputeValue(n){if(n.value===Zi)throw new Error("");let t=n.value;n.value=Zi;let e=pi(n),r,i=!1;try{r=n.computation(),N(null),i=t!==Yi&&t!==hr&&r!==hr&&n.equal(t,r)}catch(o){r=hr,n.error=o}finally{Ji(n,e)}if(i){n.value=t;return}n.value=r,n.version++}});function rM(){throw new Error}var $b=rM;function Hb(n){$b(n)}function Oh(n){$b=n}var iM=null;function Nh(n,t){let e=Object.create(Mc);e.value=n,t!==void 0&&(e.equal=t);let r=()=>zb(e);return r[ct]=e,Da(e),[r,s=>to(e,s),s=>Ic(e,s)]}function zb(n){return Xi(n),n.value}function to(n,t){kh()||Hb(n),n.equal(n.value,t)||(n.value=t,oM(n))}function Ic(n,t){kh()||Hb(n),to(n,t(n.value))}var Mc=W(g({},hi),{equal:Ea,value:void 0,kind:"signal"});function oM(n){n.version++,Bb(),Rh(n),iM?.(n)}var Ph=W(g({},hi),{consumerIsAlwaysLive:!0,consumerAllowSignalWrites:!0,dirty:!0,kind:"effect"});function Lh(n){if(n.dirty=!1,n.version>0&&!Ca(n))return;n.version++;let t=pi(n);try{n.cleanup(),n.fn()}finally{Ji(n,t)}}function q(n){return typeof n=="function"}function ns(n){let e=n(r=>{Error.call(r),r.stack=new Error().stack});return e.prototype=Object.create(Error.prototype),e.prototype.constructor=e,e}var xc=ns(n=>function(e){n(this),this.message=e?`${e.length} errors occurred during unsubscription:
${e.map((r,i)=>`${i+1}) ${r.toString()}`).join(`
  `)}`:"",this.name="UnsubscriptionError",this.errors=e});function no(n,t){if(n){let e=n.indexOf(t);0<=e&&n.splice(e,1)}}var H=class n{constructor(t){this.initialTeardown=t,this.closed=!1,this._parentage=null,this._finalizers=null}unsubscribe(){let t;if(!this.closed){this.closed=!0;let{_parentage:e}=this;if(e)if(this._parentage=null,Array.isArray(e))for(let o of e)o.remove(this);else e.remove(this);let{initialTeardown:r}=this;if(q(r))try{r()}catch(o){t=o instanceof xc?o.errors:[o]}let{_finalizers:i}=this;if(i){this._finalizers=null;for(let o of i)try{Wb(o)}catch(s){t=t??[],s instanceof xc?t=[...t,...s.errors]:t.push(s)}}if(t)throw new xc(t)}}add(t){var e;if(t&&t!==this)if(this.closed)Wb(t);else{if(t instanceof n){if(t.closed||t._hasParent(this))return;t._addParent(this)}(this._finalizers=(e=this._finalizers)!==null&&e!==void 0?e:[]).push(t)}}_hasParent(t){let{_parentage:e}=this;return e===t||Array.isArray(e)&&e.includes(t)}_addParent(t){let{_parentage:e}=this;this._parentage=Array.isArray(e)?(e.push(t),e):e?[e,t]:t}_removeParent(t){let{_parentage:e}=this;e===t?this._parentage=null:Array.isArray(e)&&no(e,t)}remove(t){let{_finalizers:e}=this;e&&no(e,t),t instanceof n&&t._removeParent(this)}};H.EMPTY=(()=>{let n=new H;return n.closed=!0,n})();var Fh=H.EMPTY;function Rc(n){return n instanceof H||n&&"closed"in n&&q(n.remove)&&q(n.add)&&q(n.unsubscribe)}function Wb(n){q(n)?n():n.unsubscribe()}var zn={onUnhandledError:null,onStoppedNotification:null,Promise:void 0,useDeprecatedSynchronousErrorHandling:!1,useDeprecatedNextContext:!1};var rs={setTimeout(n,t,...e){let{delegate:r}=rs;return r?.setTimeout?r.setTimeout(n,t,...e):setTimeout(n,t,...e)},clearTimeout(n){let{delegate:t}=rs;return(t?.clearTimeout||clearTimeout)(n)},delegate:void 0};function kc(n){rs.setTimeout(()=>{let{onUnhandledError:t}=zn;if(t)t(n);else throw n})}function wa(){}var Gb=Bh("C",void 0,void 0);function qb(n){return Bh("E",void 0,n)}function Kb(n){return Bh("N",n,void 0)}function Bh(n,t,e){return{kind:n,value:t,error:e}}var ro=null;function is(n){if(zn.useDeprecatedSynchronousErrorHandling){let t=!ro;if(t&&(ro={errorThrown:!1,error:null}),n(),t){let{errorThrown:e,error:r}=ro;if(ro=null,e)throw r}}else n()}function Yb(n){zn.useDeprecatedSynchronousErrorHandling&&ro&&(ro.errorThrown=!0,ro.error=n)}var io=class extends H{constructor(t){super(),this.isStopped=!1,t?(this.destination=t,Rc(t)&&t.add(this)):this.destination=lM}static create(t,e,r){return new Wn(t,e,r)}next(t){this.isStopped?Vh(Kb(t),this):this._next(t)}error(t){this.isStopped?Vh(qb(t),this):(this.isStopped=!0,this._error(t))}complete(){this.isStopped?Vh(Gb,this):(this.isStopped=!0,this._complete())}unsubscribe(){this.closed||(this.isStopped=!0,super.unsubscribe(),this.destination=null)}_next(t){this.destination.next(t)}_error(t){try{this.destination.error(t)}finally{this.unsubscribe()}}_complete(){try{this.destination.complete()}finally{this.unsubscribe()}}},sM=Function.prototype.bind;function jh(n,t){return sM.call(n,t)}var Uh=class{constructor(t){this.partialObserver=t}next(t){let{partialObserver:e}=this;if(e.next)try{e.next(t)}catch(r){Ac(r)}}error(t){let{partialObserver:e}=this;if(e.error)try{e.error(t)}catch(r){Ac(r)}else Ac(t)}complete(){let{partialObserver:t}=this;if(t.complete)try{t.complete()}catch(e){Ac(e)}}},Wn=class extends io{constructor(t,e,r){super();let i;if(q(t)||!t)i={next:t??void 0,error:e??void 0,complete:r??void 0};else{let o;this&&zn.useDeprecatedNextContext?(o=Object.create(t),o.unsubscribe=()=>this.unsubscribe(),i={next:t.next&&jh(t.next,o),error:t.error&&jh(t.error,o),complete:t.complete&&jh(t.complete,o)}):i=t}this.destination=new Uh(i)}};function Ac(n){zn.useDeprecatedSynchronousErrorHandling?Yb(n):kc(n)}function aM(n){throw n}function Vh(n,t){let{onStoppedNotification:e}=zn;e&&rs.setTimeout(()=>e(n,t))}var lM={closed:!0,next:wa,error:aM,complete:wa};var os=typeof Symbol=="function"&&Symbol.observable||"@@observable";function rn(n){return n}function $h(...n){return Hh(n)}function Hh(n){return n.length===0?rn:n.length===1?n[0]:function(e){return n.reduce((r,i)=>i(r),e)}}var L=(()=>{class n{constructor(e){e&&(this._subscribe=e)}lift(e){let r=new n;return r.source=this,r.operator=e,r}subscribe(e,r,i){let o=uM(e)?e:new Wn(e,r,i);return is(()=>{let{operator:s,source:a}=this;o.add(s?s.call(o,a):a?this._subscribe(o):this._trySubscribe(o))}),o}_trySubscribe(e){try{return this._subscribe(e)}catch(r){e.error(r)}}forEach(e,r){return r=Zb(r),new r((i,o)=>{let s=new Wn({next:a=>{try{e(a)}catch(l){o(l),s.unsubscribe()}},error:o,complete:i});this.subscribe(s)})}_subscribe(e){var r;return(r=this.source)===null||r===void 0?void 0:r.subscribe(e)}[os](){return this}pipe(...e){return Hh(e)(this)}toPromise(e){return e=Zb(e),new e((r,i)=>{let o;this.subscribe(s=>o=s,s=>i(s),()=>r(o))})}}return n.create=t=>new n(t),n})();function Zb(n){var t;return(t=n??zn.Promise)!==null&&t!==void 0?t:Promise}function cM(n){return n&&q(n.next)&&q(n.error)&&q(n.complete)}function uM(n){return n&&n instanceof io||cM(n)&&Rc(n)}function zh(n){return q(n?.lift)}function Y(n){return t=>{if(zh(t))return t.lift(function(e){try{return n(e,this)}catch(r){this.error(r)}});throw new TypeError("Unable to lift unknown Observable type")}}function K(n,t,e,r,i){return new Wh(n,t,e,r,i)}var Wh=class extends io{constructor(t,e,r,i,o,s){super(t),this.onFinalize=o,this.shouldUnsubscribe=s,this._next=e?function(a){try{e(a)}catch(l){t.error(l)}}:super._next,this._error=i?function(a){try{i(a)}catch(l){t.error(l)}finally{this.unsubscribe()}}:super._error,this._complete=r?function(){try{r()}catch(a){t.error(a)}finally{this.unsubscribe()}}:super._complete}unsubscribe(){var t;if(!this.shouldUnsubscribe||this.shouldUnsubscribe()){let{closed:e}=this;super.unsubscribe(),!e&&((t=this.onFinalize)===null||t===void 0||t.call(this))}}};function Xb(){return Y((n,t)=>{let e=null;n._refCount++;let r=K(t,void 0,void 0,void 0,()=>{if(!n||n._refCount<=0||0<--n._refCount){e=null;return}let i=n._connection,o=e;e=null,i&&(!o||i===o)&&i.unsubscribe(),t.unsubscribe()});n.subscribe(r),r.closed||(e=n.connect())})}var Ta=class extends L{constructor(t,e){super(),this.source=t,this.subjectFactory=e,this._subject=null,this._refCount=0,this._connection=null,zh(t)&&(this.lift=t.lift)}_subscribe(t){return this.getSubject().subscribe(t)}getSubject(){let t=this._subject;return(!t||t.isStopped)&&(this._subject=this.subjectFactory()),this._subject}_teardown(){this._refCount=0;let{_connection:t}=this;this._subject=this._connection=null,t?.unsubscribe()}connect(){let t=this._connection;if(!t){t=this._connection=new H;let e=this.getSubject();t.add(this.source.subscribe(K(e,void 0,()=>{this._teardown(),e.complete()},r=>{this._teardown(),e.error(r)},()=>this._teardown()))),t.closed&&(this._connection=null,t=H.EMPTY)}return t}refCount(){return Xb()(this)}};var ss={schedule(n){let t=requestAnimationFrame,e=cancelAnimationFrame,{delegate:r}=ss;r&&(t=r.requestAnimationFrame,e=r.cancelAnimationFrame);let i=t(o=>{e=void 0,n(o)});return new H(()=>e?.(i))},requestAnimationFrame(...n){let{delegate:t}=ss;return(t?.requestAnimationFrame||requestAnimationFrame)(...n)},cancelAnimationFrame(...n){let{delegate:t}=ss;return(t?.cancelAnimationFrame||cancelAnimationFrame)(...n)},delegate:void 0};var Qb=ns(n=>function(){n(this),this.name="ObjectUnsubscribedError",this.message="object unsubscribed"});var C=(()=>{class n extends L{constructor(){super(),this.closed=!1,this.currentObservers=null,this.observers=[],this.isStopped=!1,this.hasError=!1,this.thrownError=null}lift(e){let r=new Oc(this,this);return r.operator=e,r}_throwIfClosed(){if(this.closed)throw new Qb}next(e){is(()=>{if(this._throwIfClosed(),!this.isStopped){this.currentObservers||(this.currentObservers=Array.from(this.observers));for(let r of this.currentObservers)r.next(e)}})}error(e){is(()=>{if(this._throwIfClosed(),!this.isStopped){this.hasError=this.isStopped=!0,this.thrownError=e;let{observers:r}=this;for(;r.length;)r.shift().error(e)}})}complete(){is(()=>{if(this._throwIfClosed(),!this.isStopped){this.isStopped=!0;let{observers:e}=this;for(;e.length;)e.shift().complete()}})}unsubscribe(){this.isStopped=this.closed=!0,this.observers=this.currentObservers=null}get observed(){var e;return((e=this.observers)===null||e===void 0?void 0:e.length)>0}_trySubscribe(e){return this._throwIfClosed(),super._trySubscribe(e)}_subscribe(e){return this._throwIfClosed(),this._checkFinalizedStatuses(e),this._innerSubscribe(e)}_innerSubscribe(e){let{hasError:r,isStopped:i,observers:o}=this;return r||i?Fh:(this.currentObservers=null,o.push(e),new H(()=>{this.currentObservers=null,no(o,e)}))}_checkFinalizedStatuses(e){let{hasError:r,thrownError:i,isStopped:o}=this;r?e.error(i):o&&e.complete()}asObservable(){let e=new L;return e.source=this,e}}return n.create=(t,e)=>new Oc(t,e),n})(),Oc=class extends C{constructor(t,e){super(),this.destination=t,this.source=e}next(t){var e,r;(r=(e=this.destination)===null||e===void 0?void 0:e.next)===null||r===void 0||r.call(e,t)}error(t){var e,r;(r=(e=this.destination)===null||e===void 0?void 0:e.error)===null||r===void 0||r.call(e,t)}complete(){var t,e;(e=(t=this.destination)===null||t===void 0?void 0:t.complete)===null||e===void 0||e.call(t)}_subscribe(t){var e,r;return(r=(e=this.source)===null||e===void 0?void 0:e.subscribe(t))!==null&&r!==void 0?r:Fh}};var Ge=class extends C{constructor(t){super(),this._value=t}get value(){return this.getValue()}_subscribe(t){let e=super._subscribe(t);return!e.closed&&t.next(this._value),e}getValue(){let{hasError:t,thrownError:e,_value:r}=this;if(t)throw e;return this._throwIfClosed(),r}next(t){super.next(this._value=t)}};var Sa={now(){return(Sa.delegate||Date).now()},delegate:void 0};var mi=class extends C{constructor(t=1/0,e=1/0,r=Sa){super(),this._bufferSize=t,this._windowTime=e,this._timestampProvider=r,this._buffer=[],this._infiniteTimeWindow=!0,this._infiniteTimeWindow=e===1/0,this._bufferSize=Math.max(1,t),this._windowTime=Math.max(1,e)}next(t){let{isStopped:e,_buffer:r,_infiniteTimeWindow:i,_timestampProvider:o,_windowTime:s}=this;e||(r.push(t),!i&&r.push(o.now()+s)),this._trimBuffer(),super.next(t)}_subscribe(t){this._throwIfClosed(),this._trimBuffer();let e=this._innerSubscribe(t),{_infiniteTimeWindow:r,_buffer:i}=this,o=i.slice();for(let s=0;s<o.length&&!t.closed;s+=r?1:2)t.next(o[s]);return this._checkFinalizedStatuses(t),e}_trimBuffer(){let{_bufferSize:t,_timestampProvider:e,_buffer:r,_infiniteTimeWindow:i}=this,o=(i?1:2)*t;if(t<1/0&&o<r.length&&r.splice(0,r.length-o),!i){let s=e.now(),a=0;for(let l=1;l<r.length&&r[l]<=s;l+=2)a=l;a&&r.splice(0,a+1)}}};var Nc=class extends H{constructor(t,e){super()}schedule(t,e=0){return this}};var Ia={setInterval(n,t,...e){let{delegate:r}=Ia;return r?.setInterval?r.setInterval(n,t,...e):setInterval(n,t,...e)},clearInterval(n){let{delegate:t}=Ia;return(t?.clearInterval||clearInterval)(n)},delegate:void 0};var gi=class extends Nc{constructor(t,e){super(t,e),this.scheduler=t,this.work=e,this.pending=!1}schedule(t,e=0){var r;if(this.closed)return this;this.state=t;let i=this.id,o=this.scheduler;return i!=null&&(this.id=this.recycleAsyncId(o,i,e)),this.pending=!0,this.delay=e,this.id=(r=this.id)!==null&&r!==void 0?r:this.requestAsyncId(o,this.id,e),this}requestAsyncId(t,e,r=0){return Ia.setInterval(t.flush.bind(t,this),r)}recycleAsyncId(t,e,r=0){if(r!=null&&this.delay===r&&this.pending===!1)return e;e!=null&&Ia.clearInterval(e)}execute(t,e){if(this.closed)return new Error("executing a cancelled action");this.pending=!1;let r=this._execute(t,e);if(r)return r;this.pending===!1&&this.id!=null&&(this.id=this.recycleAsyncId(this.scheduler,this.id,null))}_execute(t,e){let r=!1,i;try{this.work(t)}catch(o){r=!0,i=o||new Error("Scheduled action threw falsy error")}if(r)return this.unsubscribe(),i}unsubscribe(){if(!this.closed){let{id:t,scheduler:e}=this,{actions:r}=e;this.work=this.state=this.scheduler=null,this.pending=!1,no(r,this),t!=null&&(this.id=this.recycleAsyncId(e,t,null)),this.delay=null,super.unsubscribe()}}};var dM=1,Gh,qh={};function Jb(n){return n in qh?(delete qh[n],!0):!1}var e_={setImmediate(n){let t=dM++;return qh[t]=!0,Gh||(Gh=Promise.resolve()),Gh.then(()=>Jb(t)&&n()),t},clearImmediate(n){Jb(n)}};var{setImmediate:fM,clearImmediate:hM}=e_,Ma={setImmediate(...n){let{delegate:t}=Ma;return(t?.setImmediate||fM)(...n)},clearImmediate(n){let{delegate:t}=Ma;return(t?.clearImmediate||hM)(n)},delegate:void 0};var Pc=class extends gi{constructor(t,e){super(t,e),this.scheduler=t,this.work=e}requestAsyncId(t,e,r=0){return r!==null&&r>0?super.requestAsyncId(t,e,r):(t.actions.push(this),t._scheduled||(t._scheduled=Ma.setImmediate(t.flush.bind(t,void 0))))}recycleAsyncId(t,e,r=0){var i;if(r!=null?r>0:this.delay>0)return super.recycleAsyncId(t,e,r);let{actions:o}=t;e!=null&&((i=o[o.length-1])===null||i===void 0?void 0:i.id)!==e&&(Ma.clearImmediate(e),t._scheduled===e&&(t._scheduled=void 0))}};var as=class n{constructor(t,e=n.now){this.schedulerActionCtor=t,this.now=e}schedule(t,e=0,r){return new this.schedulerActionCtor(this,t).schedule(r,e)}};as.now=Sa.now;var yi=class extends as{constructor(t,e=as.now){super(t,e),this.actions=[],this._active=!1}flush(t){let{actions:e}=this;if(this._active){e.push(t);return}let r;this._active=!0;do if(r=t.execute(t.state,t.delay))break;while(t=e.shift());if(this._active=!1,r){for(;t=e.shift();)t.unsubscribe();throw r}}};var Lc=class extends yi{flush(t){this._active=!0;let e=this._scheduled;this._scheduled=void 0;let{actions:r}=this,i;t=t||r.shift();do if(i=t.execute(t.state,t.delay))break;while((t=r[0])&&t.id===e&&r.shift());if(this._active=!1,i){for(;(t=r[0])&&t.id===e&&r.shift();)t.unsubscribe();throw i}}};var Kh=new Lc(Pc);var xa=new yi(gi),t_=xa;var Fc=class extends gi{constructor(t,e){super(t,e),this.scheduler=t,this.work=e}requestAsyncId(t,e,r=0){return r!==null&&r>0?super.requestAsyncId(t,e,r):(t.actions.push(this),t._scheduled||(t._scheduled=ss.requestAnimationFrame(()=>t.flush(void 0))))}recycleAsyncId(t,e,r=0){var i;if(r!=null?r>0:this.delay>0)return super.recycleAsyncId(t,e,r);let{actions:o}=t;e!=null&&e===t._scheduled&&((i=o[o.length-1])===null||i===void 0?void 0:i.id)!==e&&(ss.cancelAnimationFrame(e),t._scheduled=void 0)}};var Bc=class extends yi{flush(t){this._active=!0;let e;t?e=t.id:(e=this._scheduled,this._scheduled=void 0);let{actions:r}=this,i;t=t||r.shift();do if(i=t.execute(t.state,t.delay))break;while((t=r[0])&&t.id===e&&r.shift());if(this._active=!1,i){for(;(t=r[0])&&t.id===e&&r.shift();)t.unsubscribe();throw i}}};var Yh=new Bc(Fc);var Se=new L(n=>n.complete());function jc(n){return n&&q(n.schedule)}function Zh(n){return n[n.length-1]}function Vc(n){return q(Zh(n))?n.pop():void 0}function pr(n){return jc(Zh(n))?n.pop():void 0}function n_(n,t){return typeof Zh(n)=="number"?n.pop():t}function Ra(n,t,e,r){var i=arguments.length,o=i<3?t:r===null?r=Object.getOwnPropertyDescriptor(t,e):r,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")o=Reflect.decorate(n,t,e,r);else for(var a=n.length-1;a>=0;a--)(s=n[a])&&(o=(i<3?s(o):i>3?s(t,e,o):s(t,e))||o);return i>3&&o&&Object.defineProperty(t,e,o),o}function i_(n,t,e,r){function i(o){return o instanceof e?o:new e(function(s){s(o)})}return new(e||(e=Promise))(function(o,s){function a(u){try{c(r.next(u))}catch(d){s(d)}}function l(u){try{c(r.throw(u))}catch(d){s(d)}}function c(u){u.done?o(u.value):i(u.value).then(a,l)}c((r=r.apply(n,t||[])).next())})}function r_(n){var t=typeof Symbol=="function"&&Symbol.iterator,e=t&&n[t],r=0;if(e)return e.call(n);if(n&&typeof n.length=="number")return{next:function(){return n&&r>=n.length&&(n=void 0),{value:n&&n[r++],done:!n}}};throw new TypeError(t?"Object is not iterable.":"Symbol.iterator is not defined.")}function oo(n){return this instanceof oo?(this.v=n,this):new oo(n)}function o_(n,t,e){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var r=e.apply(n,t||[]),i,o=[];return i=Object.create((typeof AsyncIterator=="function"?AsyncIterator:Object).prototype),a("next"),a("throw"),a("return",s),i[Symbol.asyncIterator]=function(){return this},i;function s(p){return function(m){return Promise.resolve(m).then(p,d)}}function a(p,m){r[p]&&(i[p]=function(_){return new Promise(function(M,k){o.push([p,_,M,k])>1||l(p,_)})},m&&(i[p]=m(i[p])))}function l(p,m){try{c(r[p](m))}catch(_){h(o[0][3],_)}}function c(p){p.value instanceof oo?Promise.resolve(p.value.v).then(u,d):h(o[0][2],p)}function u(p){l("next",p)}function d(p){l("throw",p)}function h(p,m){p(m),o.shift(),o.length&&l(o[0][0],o[0][1])}}function s_(n){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var t=n[Symbol.asyncIterator],e;return t?t.call(n):(n=typeof r_=="function"?r_(n):n[Symbol.iterator](),e={},r("next"),r("throw"),r("return"),e[Symbol.asyncIterator]=function(){return this},e);function r(o){e[o]=n[o]&&function(s){return new Promise(function(a,l){s=n[o](s),i(a,l,s.done,s.value)})}}function i(o,s,a,l){Promise.resolve(l).then(function(c){o({value:c,done:a})},s)}}var Uc=n=>n&&typeof n.length=="number"&&typeof n!="function";function $c(n){return q(n?.then)}function Hc(n){return q(n[os])}function zc(n){return Symbol.asyncIterator&&q(n?.[Symbol.asyncIterator])}function Wc(n){return new TypeError(`You provided ${n!==null&&typeof n=="object"?"an invalid object":`'${n}'`} where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.`)}function pM(){return typeof Symbol!="function"||!Symbol.iterator?"@@iterator":Symbol.iterator}var Gc=pM();function qc(n){return q(n?.[Gc])}function Kc(n){return o_(this,arguments,function*(){let e=n.getReader();try{for(;;){let{value:r,done:i}=yield oo(e.read());if(i)return yield oo(void 0);yield yield oo(r)}}finally{e.releaseLock()}})}function Yc(n){return q(n?.getReader)}function Ie(n){if(n instanceof L)return n;if(n!=null){if(Hc(n))return mM(n);if(Uc(n))return gM(n);if($c(n))return yM(n);if(zc(n))return a_(n);if(qc(n))return vM(n);if(Yc(n))return bM(n)}throw Wc(n)}function mM(n){return new L(t=>{let e=n[os]();if(q(e.subscribe))return e.subscribe(t);throw new TypeError("Provided object does not correctly implement Symbol.observable")})}function gM(n){return new L(t=>{for(let e=0;e<n.length&&!t.closed;e++)t.next(n[e]);t.complete()})}function yM(n){return new L(t=>{n.then(e=>{t.closed||(t.next(e),t.complete())},e=>t.error(e)).then(null,kc)})}function vM(n){return new L(t=>{for(let e of n)if(t.next(e),t.closed)return;t.complete()})}function a_(n){return new L(t=>{_M(n,t).catch(e=>t.error(e))})}function bM(n){return a_(Kc(n))}function _M(n,t){var e,r,i,o;return i_(this,void 0,void 0,function*(){try{for(e=s_(n);r=yield e.next(),!r.done;){let s=r.value;if(t.next(s),t.closed)return}}catch(s){i={error:s}}finally{try{r&&!r.done&&(o=e.return)&&(yield o.call(e))}finally{if(i)throw i.error}}t.complete()})}function qt(n,t,e,r=0,i=!1){let o=t.schedule(function(){e(),i?n.add(this.schedule(null,r)):this.unsubscribe()},r);if(n.add(o),!i)return o}function Zc(n,t=0){return Y((e,r)=>{e.subscribe(K(r,i=>qt(r,n,()=>r.next(i),t),()=>qt(r,n,()=>r.complete(),t),i=>qt(r,n,()=>r.error(i),t)))})}function Xc(n,t=0){return Y((e,r)=>{r.add(n.schedule(()=>e.subscribe(r),t))})}function l_(n,t){return Ie(n).pipe(Xc(t),Zc(t))}function c_(n,t){return Ie(n).pipe(Xc(t),Zc(t))}function u_(n,t){return new L(e=>{let r=0;return t.schedule(function(){r===n.length?e.complete():(e.next(n[r++]),e.closed||this.schedule())})})}function d_(n,t){return new L(e=>{let r;return qt(e,t,()=>{r=n[Gc](),qt(e,t,()=>{let i,o;try{({value:i,done:o}=r.next())}catch(s){e.error(s);return}o?e.complete():e.next(i)},0,!0)}),()=>q(r?.return)&&r.return()})}function Qc(n,t){if(!n)throw new Error("Iterable cannot be null");return new L(e=>{qt(e,t,()=>{let r=n[Symbol.asyncIterator]();qt(e,t,()=>{r.next().then(i=>{i.done?e.complete():e.next(i.value)})},0,!0)})})}function f_(n,t){return Qc(Kc(n),t)}function h_(n,t){if(n!=null){if(Hc(n))return l_(n,t);if(Uc(n))return u_(n,t);if($c(n))return c_(n,t);if(zc(n))return Qc(n,t);if(qc(n))return d_(n,t);if(Yc(n))return f_(n,t)}throw Wc(n)}function qe(n,t){return t?h_(n,t):Ie(n)}function I(...n){let t=pr(n);return qe(n,t)}function Xh(n,t){let e=q(n)?n:()=>n,r=i=>i.error(e());return new L(t?i=>t.schedule(r,0,i):r)}function on(n){return!!n&&(n instanceof L||q(n.lift)&&q(n.subscribe))}var Lr=ns(n=>function(){n(this),this.name="EmptyError",this.message="no elements in sequence"});function ls(n,t){let e=typeof t=="object";return new Promise((r,i)=>{let o=new Wn({next:s=>{r(s),o.unsubscribe()},error:i,complete:()=>{e?r(t.defaultValue):i(new Lr)}});n.subscribe(o)})}function p_(n){return n instanceof Date&&!isNaN(n)}function se(n,t){return Y((e,r)=>{let i=0;e.subscribe(K(r,o=>{r.next(n.call(t,o,i++))}))})}var{isArray:CM}=Array;function DM(n,t){return CM(t)?n(...t):n(t)}function Jc(n){return se(t=>DM(n,t))}var{isArray:EM}=Array,{getPrototypeOf:wM,prototype:TM,keys:SM}=Object;function eu(n){if(n.length===1){let t=n[0];if(EM(t))return{args:t,keys:null};if(IM(t)){let e=SM(t);return{args:e.map(r=>t[r]),keys:e}}}return{args:n,keys:null}}function IM(n){return n&&typeof n=="object"&&wM(n)===TM}function tu(n,t){return n.reduce((e,r,i)=>(e[r]=t[i],e),{})}function ka(...n){let t=pr(n),e=Vc(n),{args:r,keys:i}=eu(n);if(r.length===0)return qe([],t);let o=new L(MM(r,t,i?s=>tu(i,s):rn));return e?o.pipe(Jc(e)):o}function MM(n,t,e=rn){return r=>{m_(t,()=>{let{length:i}=n,o=new Array(i),s=i,a=i;for(let l=0;l<i;l++)m_(t,()=>{let c=qe(n[l],t),u=!1;c.subscribe(K(r,d=>{o[l]=d,u||(u=!0,a--),a||r.next(e(o.slice()))},()=>{--s||r.complete()}))},r)},r)}}function m_(n,t,e){n?qt(e,n,t):t()}function g_(n,t,e,r,i,o,s,a){let l=[],c=0,u=0,d=!1,h=()=>{d&&!l.length&&!c&&t.complete()},p=_=>c<r?m(_):l.push(_),m=_=>{o&&t.next(_),c++;let M=!1;Ie(e(_,u++)).subscribe(K(t,k=>{i?.(k),o?p(k):t.next(k)},()=>{M=!0},void 0,()=>{if(M)try{for(c--;l.length&&c<r;){let k=l.shift();s?qt(t,s,()=>m(k)):m(k)}h()}catch(k){t.error(k)}}))};return n.subscribe(K(t,p,()=>{d=!0,h()})),()=>{a?.()}}function Ot(n,t,e=1/0){return q(t)?Ot((r,i)=>se((o,s)=>t(r,o,i,s))(Ie(n(r,i))),e):(typeof t=="number"&&(e=t),Y((r,i)=>g_(r,i,n,e)))}function nu(n=1/0){return Ot(rn,n)}function y_(){return nu(1)}function vi(...n){return y_()(qe(n,pr(n)))}function Aa(n){return new L(t=>{Ie(n()).subscribe(t)})}function ru(...n){let t=Vc(n),{args:e,keys:r}=eu(n),i=new L(o=>{let{length:s}=e;if(!s){o.complete();return}let a=new Array(s),l=s,c=s;for(let u=0;u<s;u++){let d=!1;Ie(e[u]).subscribe(K(o,h=>{d||(d=!0,c--),a[u]=h},()=>l--,void 0,()=>{(!l||!d)&&(c||o.next(r?tu(r,a):a),o.complete())}))}});return t?i.pipe(Jc(t)):i}function Oa(n=0,t,e=t_){let r=-1;return t!=null&&(jc(t)?e=t:r=t),new L(i=>{let o=p_(n)?+n-e.now():n;o<0&&(o=0);let s=0;return e.schedule(function(){i.closed||(i.next(s++),0<=r?this.schedule(void 0,r):i.complete())},o)})}function Fr(...n){let t=pr(n),e=n_(n,1/0),r=n;return r.length?r.length===1?Ie(r[0]):nu(e)(qe(r,t)):Se}function ye(n,t){return Y((e,r)=>{let i=0;e.subscribe(K(r,o=>n.call(t,o,i++)&&r.next(o)))})}function v_(n){return Y((t,e)=>{let r=!1,i=null,o=null,s=!1,a=()=>{if(o?.unsubscribe(),o=null,r){r=!1;let c=i;i=null,e.next(c)}s&&e.complete()},l=()=>{o=null,s&&e.complete()};t.subscribe(K(e,c=>{r=!0,i=c,o||Ie(n(c)).subscribe(o=K(e,a,l))},()=>{s=!0,(!r||!o||o.closed)&&e.complete()}))})}function Na(n,t=xa){return v_(()=>Oa(n,t))}function Br(n){return Y((t,e)=>{let r=null,i=!1,o;r=t.subscribe(K(e,void 0,void 0,s=>{o=Ie(n(s,Br(n)(t))),r?(r.unsubscribe(),r=null,o.subscribe(e)):i=!0})),i&&(r.unsubscribe(),r=null,o.subscribe(e))})}function iu(n,t){return q(t)?Ot(n,t,1):Ot(n,1)}function jr(n,t=xa){return Y((e,r)=>{let i=null,o=null,s=null,a=()=>{if(i){i.unsubscribe(),i=null;let c=o;o=null,r.next(c)}};function l(){let c=s+n,u=t.now();if(u<c){i=this.schedule(void 0,c-u),r.add(i);return}a()}e.subscribe(K(r,c=>{o=c,s=t.now(),i||(i=t.schedule(l,n),r.add(i))},()=>{a(),r.complete()},void 0,()=>{o=i=null}))})}function b_(n){return Y((t,e)=>{let r=!1;t.subscribe(K(e,i=>{r=!0,e.next(i)},()=>{r||e.next(n),e.complete()}))})}function ut(n){return n<=0?()=>Se:Y((t,e)=>{let r=0;t.subscribe(K(e,i=>{++r<=n&&(e.next(i),n<=r&&e.complete())}))})}function cs(n,t=rn){return n=n??xM,Y((e,r)=>{let i,o=!0;e.subscribe(K(r,s=>{let a=t(s);(o||!n(i,a))&&(o=!1,i=a,r.next(s))}))})}function xM(n,t){return n===t}function __(n=RM){return Y((t,e)=>{let r=!1;t.subscribe(K(e,i=>{r=!0,e.next(i)},()=>r?e.complete():e.error(n())))})}function RM(){return new Lr}function Qh(n){return Y((t,e)=>{try{t.subscribe(e)}finally{e.add(n)}})}function Vr(n,t){let e=arguments.length>=2;return r=>r.pipe(n?ye((i,o)=>n(i,o,r)):rn,ut(1),e?b_(t):__(()=>new Lr))}function ou(n){return n<=0?()=>Se:Y((t,e)=>{let r=[];t.subscribe(K(e,i=>{r.push(i),n<r.length&&r.shift()},()=>{for(let i of r)e.next(i);e.complete()},void 0,()=>{r=null}))})}function Jh(){return Y((n,t)=>{let e,r=!1;n.subscribe(K(t,i=>{let o=e;e=i,r&&t.next([o,i]),r=!0}))})}function C_(n={}){let{connector:t=()=>new C,resetOnError:e=!0,resetOnComplete:r=!0,resetOnRefCountZero:i=!0}=n;return o=>{let s,a,l,c=0,u=!1,d=!1,h=()=>{a?.unsubscribe(),a=void 0},p=()=>{h(),s=l=void 0,u=d=!1},m=()=>{let _=s;p(),_?.unsubscribe()};return Y((_,M)=>{c++,!d&&!u&&h();let k=l=l??t();M.add(()=>{c--,c===0&&!d&&!u&&(a=ep(m,i))}),k.subscribe(M),!s&&c>0&&(s=new Wn({next:ae=>k.next(ae),error:ae=>{d=!0,h(),a=ep(p,e,ae),k.error(ae)},complete:()=>{u=!0,h(),a=ep(p,r),k.complete()}}),Ie(_).subscribe(s))})(o)}}function ep(n,t,...e){if(t===!0){n();return}if(t===!1)return;let r=new Wn({next:()=>{r.unsubscribe(),n()}});return Ie(t(...e)).subscribe(r)}function Pa(n,t,e){let r,i=!1;return n&&typeof n=="object"?{bufferSize:r=1/0,windowTime:t=1/0,refCount:i=!1,scheduler:e}=n:r=n??1/0,C_({connector:()=>new mi(r,t,e),resetOnError:!0,resetOnComplete:!1,resetOnRefCountZero:i})}function so(n){return ye((t,e)=>n<=e)}function Tt(...n){let t=pr(n);return Y((e,r)=>{(t?vi(n,e,t):vi(n,e)).subscribe(r)})}function dt(n,t){return Y((e,r)=>{let i=null,o=0,s=!1,a=()=>s&&!i&&r.complete();e.subscribe(K(r,l=>{i?.unsubscribe();let c=0,u=o++;Ie(n(l,u)).subscribe(i=K(r,d=>r.next(t?t(l,d,u,c++):d),()=>{i=null,a()}))},()=>{s=!0,a()}))})}function Q(n){return Y((t,e)=>{Ie(n).subscribe(K(e,()=>e.complete(),wa)),!e.closed&&t.subscribe(e)})}function ot(n,t,e){let r=q(n)||t||e?{next:n,error:t,complete:e}:n;return r?Y((i,o)=>{var s;(s=r.subscribe)===null||s===void 0||s.call(r);let a=!0;i.subscribe(K(o,l=>{var c;(c=r.next)===null||c===void 0||c.call(r,l),o.next(l)},()=>{var l;a=!1,(l=r.complete)===null||l===void 0||l.call(r),o.complete()},l=>{var c;a=!1,(c=r.error)===null||c===void 0||c.call(r,l),o.error(l)},()=>{var l,c;a&&((l=r.unsubscribe)===null||l===void 0||l.call(r)),(c=r.finalize)===null||c===void 0||c.call(r)}))}):rn}var tp;function su(){return tp}function mr(n){let t=tp;return tp=n,t}var D_=Symbol("NotFound");function us(n){return n===D_||n?.name==="\u0275NotFound"}function np(n,t,e){let r=Object.create(kM);r.source=n,r.computation=t,e!=null&&(r.equal=e);let o=()=>{if(Qi(r),Xi(r),r.value===hr)throw r.error;return r.value};return o[ct]=r,Da(r),o}function E_(n,t){Qi(n),to(n,t),es(n)}function w_(n,t){if(Qi(n),n.value===hr)throw n.error;Ic(n,t),es(n)}var kM=W(g({},hi),{value:Yi,dirty:!0,error:null,equal:Ea,kind:"linkedSignal",producerMustRecompute(n){return n.value===Yi||n.value===Zi},producerRecomputeValue(n){if(n.value===Zi)throw new Error("");let t=n.value;n.value=Zi;let e=pi(n),r,i=!1;try{let o=n.source(),s=t!==Yi&&t!==hr,a=s?{source:n.sourceValue,value:t}:void 0;r=n.computation(o,a),n.sourceValue=o,N(null),i=s&&r!==hr&&n.equal(t,r)}catch(o){r=hr,n.error=o}finally{Ji(n,e)}if(i){n.value=t;return}n.value=r,n.version++}});function T_(n){let t=N(null);try{return n()}finally{N(t)}}var hu="https://angular.dev/best-practices/security#preventing-cross-site-scripting-xss",S=class extends Error{code;constructor(t,e){super(Ei(t,e)),this.code=t}};function AM(n){return`NG0${Math.abs(n)}`}function Ei(n,t){return`${AM(n)}${t?": "+t:""}`}var $r=globalThis;function be(n){for(let t in n)if(n[t]===be)return t;throw Error("")}function R_(n,t){for(let e in t)t.hasOwnProperty(e)&&!n.hasOwnProperty(e)&&(n[e]=t[e])}function $a(n){if(typeof n=="string")return n;if(Array.isArray(n))return`[${n.map($a).join(", ")}]`;if(n==null)return""+n;let t=n.overriddenName||n.name;if(t)return`${t}`;let e=n.toString();if(e==null)return""+e;let r=e.indexOf(`
`);return r>=0?e.slice(0,r):e}function pu(n,t){return n?t?`${n} ${t}`:n:t||""}var OM=be({__forward_ref__:be});function fs(n){return n.__forward_ref__=fs,n}function yt(n){return mp(n)?n():n}function mp(n){return typeof n=="function"&&n.hasOwnProperty(OM)&&n.__forward_ref__===fs}function y(n){return{token:n.token,providedIn:n.providedIn||null,factory:n.factory,value:void 0}}function De(n){return{providers:n.providers||[],imports:n.imports||[]}}function Ha(n){return NM(n,mu)}function gp(n){return Ha(n)!==null}function NM(n,t){return n.hasOwnProperty(t)&&n[t]||null}function PM(n){let t=n?.[mu]??null;return t||null}function ip(n){return n&&n.hasOwnProperty(lu)?n[lu]:null}var mu=be({\u0275prov:be}),lu=be({\u0275inj:be}),v=class{_desc;ngMetadataName="InjectionToken";\u0275prov;constructor(t,e){this._desc=t,this.\u0275prov=void 0,typeof e=="number"?this.__NG_ELEMENT_ID__=e:e!==void 0&&(this.\u0275prov=y({token:this,providedIn:e.providedIn||"root",factory:e.factory}))}get multi(){return this}toString(){return`InjectionToken ${this._desc}`}};function yp(n){return n&&!!n.\u0275providers}var vp=be({\u0275cmp:be}),bp=be({\u0275dir:be}),_p=be({\u0275pipe:be}),Cp=be({\u0275mod:be}),Fa=be({\u0275fac:be}),fo=be({__NG_ELEMENT_ID__:be}),S_=be({__NG_ENV_ID__:be});function Dp(n){return gu(n,"@NgModule"),n[Cp]||null}function Hr(n){return gu(n,"@Component"),n[vp]||null}function Ep(n){return gu(n,"@Directive"),n[bp]||null}function k_(n){return gu(n,"@Pipe"),n[_p]||null}function gu(n,t){if(n==null)throw new S(-919,!1)}function yu(n){return typeof n=="string"?n:n==null?"":String(n)}var A_=be({ngErrorCode:be}),LM=be({ngErrorMessage:be}),FM=be({ngTokenPath:be});function wp(n,t){return O_("",-200,t)}function vu(n,t){throw new S(-201,!1)}function O_(n,t,e){let r=new S(t,n);return r[A_]=t,r[LM]=n,e&&(r[FM]=e),r}function BM(n){return n[A_]}var op;function N_(){return op}function Nt(n){let t=op;return op=n,t}function Tp(n,t,e){let r=Ha(n);if(r&&r.providedIn=="root")return r.value===void 0?r.value=r.factory():r.value;if(e&8)return null;if(t!==void 0)return t;vu(n,"")}var jM={},ao=jM,VM="__NG_DI_FLAG__",sp=class{injector;constructor(t){this.injector=t}retrieve(t,e){let r=lo(e)||0;try{return this.injector.get(t,r&8?null:ao,r)}catch(i){if(us(i))return i;throw i}}};function UM(n,t=0){let e=su();if(e===void 0)throw new S(-203,!1);if(e===null)return Tp(n,void 0,t);{let r=$M(t),i=e.retrieve(n,r);if(us(i)){if(r.optional)return null;throw i}return i}}function z(n,t=0){return(N_()||UM)(yt(n),t)}function f(n,t){return z(n,lo(t))}function lo(n){return typeof n>"u"||typeof n=="number"?n:0|(n.optional&&8)|(n.host&&1)|(n.self&&2)|(n.skipSelf&&4)}function $M(n){return{optional:!!(n&8),host:!!(n&1),self:!!(n&2),skipSelf:!!(n&4)}}function ap(n){let t=[];for(let e=0;e<n.length;e++){let r=yt(n[e]);if(Array.isArray(r)){if(r.length===0)throw new S(900,!1);let i,o=0;for(let s=0;s<r.length;s++){let a=r[s],l=HM(a);typeof l=="number"?l===-1?i=a.token:o|=l:i=a}t.push(z(i,o))}else t.push(z(r))}return t}function HM(n){return n[VM]}function bi(n,t){let e=n.hasOwnProperty(Fa);return e?n[Fa]:null}function P_(n,t,e){if(n.length!==t.length)return!1;for(let r=0;r<n.length;r++){let i=n[r],o=t[r];if(e&&(i=e(i),o=e(o)),o!==i)return!1}return!0}function L_(n){return n.flat(Number.POSITIVE_INFINITY)}function bu(n,t){n.forEach(e=>Array.isArray(e)?bu(e,t):t(e))}function Sp(n,t,e){t>=n.length?n.push(e):n.splice(t,0,e)}function za(n,t){return t>=n.length-1?n.pop():n.splice(t,1)[0]}function F_(n,t){let e=[];for(let r=0;r<n;r++)e.push(t);return e}function B_(n,t,e,r){let i=n.length;if(i==t)n.push(e,r);else if(i===1)n.push(r,n[0]),n[0]=e;else{for(i--,n.push(n[i-1],n[i]);i>t;){let o=i-2;n[i]=n[o],i--}n[t]=e,n[t+1]=r}}function _u(n,t,e){let r=hs(n,t);return r>=0?n[r|1]=e:(r=~r,B_(n,r,t,e)),r}function Cu(n,t){let e=hs(n,t);if(e>=0)return n[e|1]}function hs(n,t){return zM(n,t,1)}function zM(n,t,e){let r=0,i=n.length>>e;for(;i!==r;){let o=r+(i-r>>1),s=n[o<<e];if(t===s)return o<<e;s>t?i=o:r=o+1}return~(i<<e)}var wi={},Pt=[],ho=new v(""),Ip=new v("",-1),Mp=new v(""),Ba=class{get(t,e=ao){if(e===ao){let i=O_("",-201);throw i.name="\u0275NotFound",i}return e}};function Ti(n){return{\u0275providers:n}}function j_(n){return Ti([{provide:ho,multi:!0,useValue:n}])}function V_(...n){return{\u0275providers:xp(!0,n),\u0275fromNgModule:!0}}function xp(n,...t){let e=[],r=new Set,i,o=s=>{e.push(s)};return bu(t,s=>{let a=s;cu(a,o,[],r)&&(i||=[],i.push(a))}),i!==void 0&&U_(i,o),e}function U_(n,t){for(let e=0;e<n.length;e++){let{ngModule:r,providers:i}=n[e];Rp(i,o=>{t(o,r)})}}function cu(n,t,e,r){if(n=yt(n),!n)return!1;let i=null,o=ip(n),s=!o&&Hr(n);if(!o&&!s){let l=n.ngModule;if(o=ip(l),o)i=l;else return!1}else{if(s&&!s.standalone)return!1;i=n}let a=r.has(i);if(s){if(a)return!1;if(r.add(i),s.dependencies){let l=typeof s.dependencies=="function"?s.dependencies():s.dependencies;for(let c of l)cu(c,t,e,r)}}else if(o){if(o.imports!=null&&!a){r.add(i);let c;bu(o.imports,u=>{cu(u,t,e,r)&&(c||=[],c.push(u))}),c!==void 0&&U_(c,t)}if(!a){let c=bi(i)||(()=>new i);t({provide:i,useFactory:c,deps:Pt},i),t({provide:Mp,useValue:i,multi:!0},i),t({provide:ho,useValue:()=>z(i),multi:!0},i)}let l=o.providers;if(l!=null&&!a){let c=n;Rp(l,u=>{t(u,c)})}}else return!1;return i!==n&&n.providers!==void 0}function Rp(n,t){for(let e of n)yp(e)&&(e=e.\u0275providers),Array.isArray(e)?Rp(e,t):t(e)}var WM=be({provide:String,useValue:be});function $_(n){return n!==null&&typeof n=="object"&&WM in n}function GM(n){return!!(n&&n.useExisting)}function qM(n){return!!(n&&n.useFactory)}function co(n){return typeof n=="function"}function H_(n){return!!n.useClass}var Wa=new v(""),au={},I_={},rp;function ps(){return rp===void 0&&(rp=new Ba),rp}var ke=class{},uo=class extends ke{parent;source;scopes;records=new Map;_ngOnDestroyHooks=new Set;_onDestroyHooks=[];get destroyed(){return this._destroyed}_destroyed=!1;injectorDefTypes;constructor(t,e,r,i){super(),this.parent=e,this.source=r,this.scopes=i,cp(t,s=>this.processProvider(s)),this.records.set(Ip,ds(void 0,this)),i.has("environment")&&this.records.set(ke,ds(void 0,this));let o=this.records.get(Wa);o!=null&&typeof o.value=="string"&&this.scopes.add(o.value),this.injectorDefTypes=new Set(this.get(Mp,Pt,{self:!0}))}retrieve(t,e){let r=lo(e)||0;try{return this.get(t,ao,r)}catch(i){if(us(i))return i;throw i}}destroy(){La(this),this._destroyed=!0;let t=N(null);try{for(let r of this._ngOnDestroyHooks)r.ngOnDestroy();let e=this._onDestroyHooks;this._onDestroyHooks=[];for(let r of e)r()}finally{this.records.clear(),this._ngOnDestroyHooks.clear(),this.injectorDefTypes.clear(),N(t)}}onDestroy(t){return La(this),this._onDestroyHooks.push(t),()=>this.removeOnDestroy(t)}runInContext(t){La(this);let e=mr(this),r=Nt(void 0),i;try{return t()}finally{mr(e),Nt(r)}}get(t,e=ao,r){if(La(this),t.hasOwnProperty(S_))return t[S_](this);let i=lo(r),o,s=mr(this),a=Nt(void 0);try{if(!(i&4)){let c=this.records.get(t);if(c===void 0){let u=QM(t)&&Ha(t);u&&this.injectableDefInScope(u)?c=ds(lp(t),au):c=null,this.records.set(t,c)}if(c!=null)return this.hydrate(t,c,i)}let l=i&2?ps():this.parent;return e=i&8&&e===ao?null:e,l.get(t,e)}catch(l){let c=BM(l);throw c===-200||c===-201?new S(c,null):l}finally{Nt(a),mr(s)}}resolveInjectorInitializers(){let t=N(null),e=mr(this),r=Nt(void 0),i;try{let o=this.get(ho,Pt,{self:!0});for(let s of o)s()}finally{mr(e),Nt(r),N(t)}}toString(){return"R3Injector[...]"}processProvider(t){t=yt(t);let e=co(t)?t:yt(t&&t.provide),r=YM(t);if(!co(t)&&t.multi===!0){let i=this.records.get(e);i||(i=ds(void 0,au,!0),i.factory=()=>ap(i.multi),this.records.set(e,i)),e=t,i.multi.push(t)}this.records.set(e,r)}hydrate(t,e,r){let i=N(null);try{if(e.value===I_)throw wp("");return e.value===au&&(e.value=I_,e.value=e.factory(void 0,r)),typeof e.value=="object"&&e.value&&XM(e.value)&&this._ngOnDestroyHooks.add(e.value),e.value}finally{N(i)}}injectableDefInScope(t){if(!t.providedIn)return!1;let e=yt(t.providedIn);return typeof e=="string"?e==="any"||this.scopes.has(e):this.injectorDefTypes.has(e)}removeOnDestroy(t){let e=this._onDestroyHooks.indexOf(t);e!==-1&&this._onDestroyHooks.splice(e,1)}};function lp(n){let t=Ha(n),e=t!==null?t.factory:bi(n);if(e!==null)return e;if(n instanceof v)throw new S(-204,!1);if(n instanceof Function)return KM(n);throw new S(-204,!1)}function KM(n){if(n.length>0)throw new S(-204,!1);let e=PM(n);return e!==null?()=>e.factory(n):()=>new n}function YM(n){if($_(n))return ds(void 0,n.useValue);{let t=kp(n);return ds(t,au)}}function kp(n,t,e){let r;if(co(n)){let i=yt(n);return bi(i)||lp(i)}else if($_(n))r=()=>yt(n.useValue);else if(qM(n))r=()=>n.useFactory(...ap(n.deps||[]));else if(GM(n))r=(i,o)=>z(yt(n.useExisting),o!==void 0&&o&8?8:void 0);else{let i=yt(n&&(n.useClass||n.provide));if(ZM(n))r=()=>new i(...ap(n.deps));else return bi(i)||lp(i)}return r}function La(n){if(n.destroyed)throw new S(-205,!1)}function ds(n,t,e=!1){return{factory:n,value:t,multi:e?[]:void 0}}function ZM(n){return!!n.deps}function XM(n){return n!==null&&typeof n=="object"&&typeof n.ngOnDestroy=="function"}function QM(n){return typeof n=="function"||typeof n=="object"&&n.ngMetadataName==="InjectionToken"}function cp(n,t){for(let e of n)Array.isArray(e)?cp(e,t):e&&yp(e)?cp(e.\u0275providers,t):t(e)}function St(n,t){let e;n instanceof uo?(La(n),e=n):e=new sp(n);let r,i=mr(e),o=Nt(void 0);try{return t()}finally{mr(i),Nt(o)}}function z_(){return N_()!==void 0||su()!=null}var Gn=0,F=1,$=2,st=3,bn=4,Lt=5,po=6,ms=7,Ze=8,zr=9,qn=10,Ae=11,gs=12,Ap=13,mo=14,Ft=15,Si=16,go=17,gr=18,Wr=19,Op=20,Ur=21,Du=22,_i=23,sn=24,yo=25,Ii=26,Fe=27,W_=1,Np=6,Mi=7,Ga=8,vo=9,Ke=10;function Gr(n){return Array.isArray(n)&&typeof n[W_]=="object"}function Kn(n){return Array.isArray(n)&&n[W_]===!0}function Pp(n){return(n.flags&4)!==0}function yr(n){return n.componentOffset>-1}function qa(n){return(n.flags&1)===1}function vr(n){return!!n.template}function ys(n){return(n[$]&512)!==0}function bo(n){return(n[$]&256)===256}var Lp="svg",G_="math";function _n(n){for(;Array.isArray(n);)n=n[Gn];return n}function Fp(n,t){return _n(t[n])}function Cn(n,t){return _n(t[n.index])}function Eu(n,t){return n.data[t]}function wu(n,t){return n[t]}function Bp(n,t,e,r){e>=n.data.length&&(n.data[e]=null,n.blueprint[e]=null),t[e]=r}function Dn(n,t){let e=t[n];return Gr(e)?e:e[Gn]}function q_(n){return(n[$]&4)===4}function Tu(n){return(n[$]&128)===128}function K_(n){return Kn(n[st])}function an(n,t){return t==null?null:n[t]}function jp(n){n[go]=0}function Vp(n){n[$]&1024||(n[$]|=1024,Tu(n)&&_o(n))}function Y_(n,t){for(;n>0;)t=t[mo],n--;return t}function Ka(n){return!!(n[$]&9216||n[sn]?.dirty)}function Su(n){n[qn].changeDetectionScheduler?.notify(8),n[$]&64&&(n[$]|=1024),Ka(n)&&_o(n)}function _o(n){n[qn].changeDetectionScheduler?.notify(0);let t=Ci(n);for(;t!==null&&!(t[$]&8192||(t[$]|=8192,!Tu(t)));)t=Ci(t)}function Up(n,t){if(bo(n))throw new S(911,!1);n[Ur]===null&&(n[Ur]=[]),n[Ur].push(t)}function Z_(n,t){if(n[Ur]===null)return;let e=n[Ur].indexOf(t);e!==-1&&n[Ur].splice(e,1)}function Ci(n){let t=n[st];return Kn(t)?t[st]:t}function $p(n){return n[ms]??=[]}function Hp(n){return n.cleanup??=[]}function X_(n,t,e,r){let i=$p(t);i.push(e),n.firstCreatePass&&Hp(n).push(r,i.length-1)}var J={lFrame:lC(null),bindingsEnabled:!0,skipHydrationRootTNode:null};var up=!1;function Q_(){return J.lFrame.elementDepthCount}function J_(){J.lFrame.elementDepthCount++}function zp(){J.lFrame.elementDepthCount--}function Wp(){return J.bindingsEnabled}function Gp(){return J.skipHydrationRootTNode!==null}function qp(n){return J.skipHydrationRootTNode===n}function Kp(){J.skipHydrationRootTNode=null}function U(){return J.lFrame.lView}function Be(){return J.lFrame.tView}function Ve(n){return J.lFrame.contextLView=n,n[Ze]}function Ue(n){return J.lFrame.contextLView=null,n}function vt(){let n=Yp();for(;n!==null&&n.type===64;)n=n.parent;return n}function Yp(){return J.lFrame.currentTNode}function eC(){let n=J.lFrame,t=n.currentTNode;return n.isParent?t:t.parent}function vs(n,t){let e=J.lFrame;e.currentTNode=n,e.isParent=t}function Zp(){return J.lFrame.isParent}function Xp(){J.lFrame.isParent=!1}function tC(){return J.lFrame.contextLView}function Qp(){return up}function ja(n){let t=up;return up=n,t}function Jp(){let n=J.lFrame,t=n.bindingRootIndex;return t===-1&&(t=n.bindingRootIndex=n.tView.bindingStartIndex),t}function nC(n){return J.lFrame.bindingIndex=n}function xi(){return J.lFrame.bindingIndex++}function em(n){let t=J.lFrame,e=t.bindingIndex;return t.bindingIndex=t.bindingIndex+n,e}function rC(){return J.lFrame.inI18n}function iC(n,t){let e=J.lFrame;e.bindingIndex=e.bindingRootIndex=n,Iu(t)}function oC(){return J.lFrame.currentDirectiveIndex}function Iu(n){J.lFrame.currentDirectiveIndex=n}function sC(n){let t=J.lFrame.currentDirectiveIndex;return t===-1?null:n[t]}function tm(){return J.lFrame.currentQueryIndex}function Mu(n){J.lFrame.currentQueryIndex=n}function JM(n){let t=n[F];return t.type===2?t.declTNode:t.type===1?n[Lt]:null}function nm(n,t,e){if(e&4){let i=t,o=n;for(;i=i.parent,i===null&&!(e&1);)if(i=JM(o),i===null||(o=o[mo],i.type&10))break;if(i===null)return!1;t=i,n=o}let r=J.lFrame=aC();return r.currentTNode=t,r.lView=n,!0}function xu(n){let t=aC(),e=n[F];J.lFrame=t,t.currentTNode=e.firstChild,t.lView=n,t.tView=e,t.contextLView=n,t.bindingIndex=e.bindingStartIndex,t.inI18n=!1}function aC(){let n=J.lFrame,t=n===null?null:n.child;return t===null?lC(n):t}function lC(n){let t={currentTNode:null,isParent:!0,lView:null,tView:null,selectedIndex:-1,contextLView:null,elementDepthCount:0,currentNamespace:null,currentDirectiveIndex:-1,bindingRootIndex:-1,bindingIndex:-1,currentQueryIndex:0,parent:n,child:null,inI18n:!1};return n!==null&&(n.child=t),t}function cC(){let n=J.lFrame;return J.lFrame=n.parent,n.currentTNode=null,n.lView=null,n}var rm=cC;function Ru(){let n=cC();n.isParent=!0,n.tView=null,n.selectedIndex=-1,n.contextLView=null,n.elementDepthCount=0,n.currentDirectiveIndex=-1,n.currentNamespace=null,n.bindingRootIndex=-1,n.bindingIndex=-1,n.currentQueryIndex=0}function uC(n){return(J.lFrame.contextLView=Y_(n,J.lFrame.contextLView))[Ze]}function qr(){return J.lFrame.selectedIndex}function Ri(n){J.lFrame.selectedIndex=n}function Ya(){let n=J.lFrame;return Eu(n.tView,n.selectedIndex)}function Kr(){J.lFrame.currentNamespace=Lp}function ku(){e0()}function e0(){J.lFrame.currentNamespace=null}function dC(){return J.lFrame.currentNamespace}var fC=!0;function Au(){return fC}function Ou(n){fC=n}function dp(n,t=null,e=null,r){let i=im(n,t,e,r);return i.resolveInjectorInitializers(),i}function im(n,t=null,e=null,r,i=new Set){let o=[e||Pt,V_(n)],s;return new uo(o,t||ps(),s||null,i)}var ne=class n{static THROW_IF_NOT_FOUND=ao;static NULL=new Ba;static create(t,e){if(Array.isArray(t))return dp({name:""},e,t,"");{let r=t.name??"";return dp({name:r},t.parent,t.providers,r)}}static \u0275prov=y({token:n,providedIn:"any",factory:()=>z(Ip)});static __NG_ELEMENT_ID__=-1},Z=new v(""),tt=(()=>{class n{static __NG_ELEMENT_ID__=t0;static __NG_ENV_ID__=e=>e}return n})(),uu=class extends tt{_lView;constructor(t){super(),this._lView=t}get destroyed(){return bo(this._lView)}onDestroy(t){let e=this._lView;return Up(e,t),()=>Z_(e,t)}};function t0(){return new uu(U())}var hC=!1,pC=new v(""),ki=(()=>{class n{taskId=0;pendingTasks=new Set;destroyed=!1;pendingTask=new Ge(!1);debugTaskTracker=f(pC,{optional:!0});get hasPendingTasks(){return this.destroyed?!1:this.pendingTask.value}get hasPendingTasksObservable(){return this.destroyed?new L(e=>{e.next(!1),e.complete()}):this.pendingTask}add(){!this.hasPendingTasks&&!this.destroyed&&this.pendingTask.next(!0);let e=this.taskId++;return this.pendingTasks.add(e),this.debugTaskTracker?.add(e),e}has(e){return this.pendingTasks.has(e)}remove(e){this.pendingTasks.delete(e),this.debugTaskTracker?.remove(e),this.pendingTasks.size===0&&this.hasPendingTasks&&this.pendingTask.next(!1)}ngOnDestroy(){this.pendingTasks.clear(),this.hasPendingTasks&&this.pendingTask.next(!1),this.destroyed=!0,this.pendingTask.unsubscribe()}static \u0275prov=y({token:n,providedIn:"root",factory:()=>new n})}return n})(),fp=class extends C{__isAsync;destroyRef=void 0;pendingTasks=void 0;constructor(t=!1){super(),this.__isAsync=t,z_()&&(this.destroyRef=f(tt,{optional:!0})??void 0,this.pendingTasks=f(ki,{optional:!0})??void 0)}emit(t){let e=N(null);try{super.next(t)}finally{N(e)}}subscribe(t,e,r){let i=t,o=e||(()=>null),s=r;if(t&&typeof t=="object"){let l=t;i=l.next?.bind(l),o=l.error?.bind(l),s=l.complete?.bind(l)}this.__isAsync&&(o=this.wrapInTimeout(o),i&&(i=this.wrapInTimeout(i)),s&&(s=this.wrapInTimeout(s)));let a=super.subscribe({next:i,error:o,complete:s});return t instanceof H&&t.add(a),a}wrapInTimeout(t){return e=>{let r=this.pendingTasks?.add();setTimeout(()=>{try{t(e)}finally{r!==void 0&&this.pendingTasks?.remove(r)}})}}},te=fp;function du(...n){}function om(n){let t,e;function r(){n=du;try{e!==void 0&&typeof cancelAnimationFrame=="function"&&cancelAnimationFrame(e),t!==void 0&&clearTimeout(t)}catch{}}return t=setTimeout(()=>{n(),r()}),typeof requestAnimationFrame=="function"&&(e=requestAnimationFrame(()=>{n(),r()})),()=>r()}function mC(n){return queueMicrotask(()=>n()),()=>{n=du}}var sm="isAngularZone",Va=sm+"_ID",n0=0,j=class n{hasPendingMacrotasks=!1;hasPendingMicrotasks=!1;isStable=!0;onUnstable=new te(!1);onMicrotaskEmpty=new te(!1);onStable=new te(!1);onError=new te(!1);constructor(t){let{enableLongStackTrace:e=!1,shouldCoalesceEventChangeDetection:r=!1,shouldCoalesceRunChangeDetection:i=!1,scheduleInRootZone:o=hC}=t;if(typeof Zone>"u")throw new S(908,!1);Zone.assertZonePatched();let s=this;s._nesting=0,s._outer=s._inner=Zone.current,Zone.TaskTrackingZoneSpec&&(s._inner=s._inner.fork(new Zone.TaskTrackingZoneSpec)),e&&Zone.longStackTraceZoneSpec&&(s._inner=s._inner.fork(Zone.longStackTraceZoneSpec)),s.shouldCoalesceEventChangeDetection=!i&&r,s.shouldCoalesceRunChangeDetection=i,s.callbackScheduled=!1,s.scheduleInRootZone=o,o0(s)}static isInAngularZone(){return typeof Zone<"u"&&Zone.current.get(sm)===!0}static assertInAngularZone(){if(!n.isInAngularZone())throw new S(909,!1)}static assertNotInAngularZone(){if(n.isInAngularZone())throw new S(909,!1)}run(t,e,r){return this._inner.run(t,e,r)}runTask(t,e,r,i){let o=this._inner,s=o.scheduleEventTask("NgZoneEvent: "+i,t,r0,du,du);try{return o.runTask(s,e,r)}finally{o.cancelTask(s)}}runGuarded(t,e,r){return this._inner.runGuarded(t,e,r)}runOutsideAngular(t){return this._outer.run(t)}},r0={};function am(n){if(n._nesting==0&&!n.hasPendingMicrotasks&&!n.isStable)try{n._nesting++,n.onMicrotaskEmpty.emit(null)}finally{if(n._nesting--,!n.hasPendingMicrotasks)try{n.runOutsideAngular(()=>n.onStable.emit(null))}finally{n.isStable=!0}}}function i0(n){if(n.isCheckStableRunning||n.callbackScheduled)return;n.callbackScheduled=!0;function t(){om(()=>{n.callbackScheduled=!1,hp(n),n.isCheckStableRunning=!0,am(n),n.isCheckStableRunning=!1})}n.scheduleInRootZone?Zone.root.run(()=>{t()}):n._outer.run(()=>{t()}),hp(n)}function o0(n){let t=()=>{i0(n)},e=n0++;n._inner=n._inner.fork({name:"angular",properties:{[sm]:!0,[Va]:e,[Va+e]:!0},onInvokeTask:(r,i,o,s,a,l)=>{if(s0(l))return r.invokeTask(o,s,a,l);try{return M_(n),r.invokeTask(o,s,a,l)}finally{(n.shouldCoalesceEventChangeDetection&&s.type==="eventTask"||n.shouldCoalesceRunChangeDetection)&&t(),x_(n)}},onInvoke:(r,i,o,s,a,l,c)=>{try{return M_(n),r.invoke(o,s,a,l,c)}finally{n.shouldCoalesceRunChangeDetection&&!n.callbackScheduled&&!a0(l)&&t(),x_(n)}},onHasTask:(r,i,o,s)=>{r.hasTask(o,s),i===o&&(s.change=="microTask"?(n._hasPendingMicrotasks=s.microTask,hp(n),am(n)):s.change=="macroTask"&&(n.hasPendingMacrotasks=s.macroTask))},onHandleError:(r,i,o,s)=>(r.handleError(o,s),n.runOutsideAngular(()=>n.onError.emit(s)),!1)})}function hp(n){n._hasPendingMicrotasks||(n.shouldCoalesceEventChangeDetection||n.shouldCoalesceRunChangeDetection)&&n.callbackScheduled===!0?n.hasPendingMicrotasks=!0:n.hasPendingMicrotasks=!1}function M_(n){n._nesting++,n.isStable&&(n.isStable=!1,n.onUnstable.emit(null))}function x_(n){n._nesting--,am(n)}var Ua=class{hasPendingMicrotasks=!1;hasPendingMacrotasks=!1;isStable=!0;onUnstable=new te;onMicrotaskEmpty=new te;onStable=new te;onError=new te;run(t,e,r){return t.apply(e,r)}runGuarded(t,e,r){return t.apply(e,r)}runOutsideAngular(t){return t()}runTask(t,e,r,i){return t.apply(e,r)}};function s0(n){return gC(n,"__ignore_ng_zone__")}function a0(n){return gC(n,"__scheduler_tick__")}function gC(n,t){return!Array.isArray(n)||n.length!==1?!1:n[0]?.data?.[t]===!0}var vn=class{_console=console;handleError(t){this._console.error("ERROR",t)}},En=new v("",{factory:()=>{let n=f(j),t=f(ke),e;return r=>{n.runOutsideAngular(()=>{t.destroyed&&!e?setTimeout(()=>{throw r}):(e??=t.get(vn),e.handleError(r))})}}}),yC={provide:ho,useValue:()=>{let n=f(vn,{optional:!0})},multi:!0},l0=new v("",{factory:()=>{let n=f(Z).defaultView;if(!n)return;let t=f(En),e=o=>{t(o.reason),o.preventDefault()},r=o=>{o.error?t(o.error):t(new Error(o.message,{cause:o})),o.preventDefault()},i=()=>{n.addEventListener("unhandledrejection",e),n.addEventListener("error",r)};typeof Zone<"u"?Zone.root.run(i):i(),f(tt).onDestroy(()=>{n.removeEventListener("error",r),n.removeEventListener("unhandledrejection",e)})}});function lm(){return Ti([j_(()=>{f(l0)})])}function ee(n,t){let[e,r,i]=Nh(n,t?.equal),o=e,s=o[ct];return o.set=r,o.update=i,o.asReadonly=Nu.bind(o),o}function Nu(){let n=this[ct];if(n.readonlyFn===void 0){let t=()=>this();t[ct]=n,n.readonlyFn=t}return n.readonlyFn}var Za=(()=>{class n{view;node;constructor(e,r){this.view=e,this.node=r}static __NG_ELEMENT_ID__=c0}return n})();function c0(){return new Za(U(),vt())}var Di=class{},Xa=new v("",{factory:()=>!0});var cm=new v("");var Pu=(()=>{class n{static \u0275prov=y({token:n,providedIn:"root",factory:()=>new pp})}return n})(),pp=class{dirtyEffectCount=0;queues=new Map;add(t){this.enqueue(t),this.schedule(t)}schedule(t){t.dirty&&this.dirtyEffectCount++}remove(t){let e=t.zone,r=this.queues.get(e);r.has(t)&&(r.delete(t),t.dirty&&this.dirtyEffectCount--)}enqueue(t){let e=t.zone;this.queues.has(e)||this.queues.set(e,new Set);let r=this.queues.get(e);r.has(t)||r.add(t)}flush(){for(;this.dirtyEffectCount>0;){let t=!1;for(let[e,r]of this.queues)e===null?t||=this.flushQueue(r):t||=e.run(()=>this.flushQueue(r));t||(this.dirtyEffectCount=0)}}flushQueue(t){let e=!1;for(let r of t)r.dirty&&(this.dirtyEffectCount--,e=!0,r.run());return e}},fu=class{[ct];constructor(t){this[ct]=t}destroy(){this[ct].destroy()}};function Co(n,t){let e=t?.injector??f(ne),r=t?.manualCleanup!==!0?e.get(tt):null,i,o=e.get(Za,null,{optional:!0}),s=e.get(Di);return o!==null?(i=f0(o.view,s,n),r instanceof uu&&r._lView===o.view&&(r=null)):i=h0(n,e.get(Pu),s),i.injector=e,r!==null&&(i.onDestroyFns=[r.onDestroy(()=>i.destroy())]),new fu(i)}var vC=W(g({},Ph),{cleanupFns:void 0,zone:null,onDestroyFns:null,run(){let n=ja(!1);try{Lh(this)}finally{ja(n)}},cleanup(){if(!this.cleanupFns?.length)return;let n=N(null);try{for(;this.cleanupFns.length;)this.cleanupFns.pop()()}finally{this.cleanupFns=[],N(n)}}}),u0=W(g({},vC),{consumerMarkedDirty(){this.scheduler.schedule(this),this.notifier.notify(12)},destroy(){if(eo(this),this.onDestroyFns!==null)for(let n of this.onDestroyFns)n();this.cleanup(),this.scheduler.remove(this)}}),d0=W(g({},vC),{consumerMarkedDirty(){this.view[$]|=8192,_o(this.view),this.notifier.notify(13)},destroy(){if(eo(this),this.onDestroyFns!==null)for(let n of this.onDestroyFns)n();this.cleanup(),this.view[_i]?.delete(this)}});function f0(n,t,e){let r=Object.create(d0);return r.view=n,r.zone=typeof Zone<"u"?Zone.current:null,r.notifier=t,r.fn=bC(r,e),n[_i]??=new Set,n[_i].add(r),r.consumerMarkedDirty(r),r}function h0(n,t,e){let r=Object.create(u0);return r.fn=bC(r,n),r.scheduler=t,r.notifier=e,r.zone=typeof Zone<"u"?Zone.current:null,r.scheduler.add(r),r.notifier.notify(12),r}function bC(n,t){return()=>{t(e=>(n.cleanupFns??=[]).push(e))}}function al(n){return{toString:n}.toString()}function _0(n){return typeof n=="function"}function ZC(n,t,e,r){t!==null?t.applyValueToInputSignal(t,r):n[e]=r}var Hu=class{previousValue;currentValue;firstChange;constructor(t,e,r){this.previousValue=t,this.currentValue=e,this.firstChange=r}isFirstChange(){return this.firstChange}},Tn=(()=>{let n=()=>XC;return n.ngInherit=!0,n})();function XC(n){return n.type.prototype.ngOnChanges&&(n.setInput=D0),C0}function C0(){let n=JC(this),t=n?.current;if(t){let e=n.previous;if(e===wi)n.previous=t;else for(let r in t)e[r]=t[r];n.current=null,this.ngOnChanges(t)}}function D0(n,t,e,r,i){let o=this.declaredInputs[r],s=JC(n)||E0(n,{previous:wi,current:null}),a=s.current||(s.current={}),l=s.previous,c=l[o];a[o]=new Hu(c&&c.currentValue,e,l===wi),ZC(n,t,i,e)}var QC="__ngSimpleChanges__";function JC(n){return n[QC]||null}function E0(n,t){return n[QC]=t}var _C=[];var _e=function(n,t=null,e){for(let r=0;r<_C.length;r++){let i=_C[r];i(n,t,e)}},fe=(function(n){return n[n.TemplateCreateStart=0]="TemplateCreateStart",n[n.TemplateCreateEnd=1]="TemplateCreateEnd",n[n.TemplateUpdateStart=2]="TemplateUpdateStart",n[n.TemplateUpdateEnd=3]="TemplateUpdateEnd",n[n.LifecycleHookStart=4]="LifecycleHookStart",n[n.LifecycleHookEnd=5]="LifecycleHookEnd",n[n.OutputStart=6]="OutputStart",n[n.OutputEnd=7]="OutputEnd",n[n.BootstrapApplicationStart=8]="BootstrapApplicationStart",n[n.BootstrapApplicationEnd=9]="BootstrapApplicationEnd",n[n.BootstrapComponentStart=10]="BootstrapComponentStart",n[n.BootstrapComponentEnd=11]="BootstrapComponentEnd",n[n.ChangeDetectionStart=12]="ChangeDetectionStart",n[n.ChangeDetectionEnd=13]="ChangeDetectionEnd",n[n.ChangeDetectionSyncStart=14]="ChangeDetectionSyncStart",n[n.ChangeDetectionSyncEnd=15]="ChangeDetectionSyncEnd",n[n.AfterRenderHooksStart=16]="AfterRenderHooksStart",n[n.AfterRenderHooksEnd=17]="AfterRenderHooksEnd",n[n.ComponentStart=18]="ComponentStart",n[n.ComponentEnd=19]="ComponentEnd",n[n.DeferBlockStateStart=20]="DeferBlockStateStart",n[n.DeferBlockStateEnd=21]="DeferBlockStateEnd",n[n.DynamicComponentStart=22]="DynamicComponentStart",n[n.DynamicComponentEnd=23]="DynamicComponentEnd",n[n.HostBindingsUpdateStart=24]="HostBindingsUpdateStart",n[n.HostBindingsUpdateEnd=25]="HostBindingsUpdateEnd",n})(fe||{});function w0(n,t,e){let{ngOnChanges:r,ngOnInit:i,ngDoCheck:o}=t.type.prototype;if(r){let s=XC(t);(e.preOrderHooks??=[]).push(n,s),(e.preOrderCheckHooks??=[]).push(n,s)}i&&(e.preOrderHooks??=[]).push(0-n,i),o&&((e.preOrderHooks??=[]).push(n,o),(e.preOrderCheckHooks??=[]).push(n,o))}function eD(n,t){for(let e=t.directiveStart,r=t.directiveEnd;e<r;e++){let o=n.data[e].type.prototype,{ngAfterContentInit:s,ngAfterContentChecked:a,ngAfterViewInit:l,ngAfterViewChecked:c,ngOnDestroy:u}=o;s&&(n.contentHooks??=[]).push(-e,s),a&&((n.contentHooks??=[]).push(e,a),(n.contentCheckHooks??=[]).push(e,a)),l&&(n.viewHooks??=[]).push(-e,l),c&&((n.viewHooks??=[]).push(e,c),(n.viewCheckHooks??=[]).push(e,c)),u!=null&&(n.destroyHooks??=[]).push(e,u)}}function Bu(n,t,e){tD(n,t,3,e)}function ju(n,t,e,r){(n[$]&3)===e&&tD(n,t,e,r)}function um(n,t){let e=n[$];(e&3)===t&&(e&=16383,e+=1,n[$]=e)}function tD(n,t,e,r){let i=r!==void 0?n[go]&65535:0,o=r??-1,s=t.length-1,a=0;for(let l=i;l<s;l++)if(typeof t[l+1]=="number"){if(a=t[l],r!=null&&a>=r)break}else t[l]<0&&(n[go]+=65536),(a<o||o==-1)&&(T0(n,e,t,l),n[go]=(n[go]&4294901760)+l+2),l++}function CC(n,t){_e(fe.LifecycleHookStart,n,t);let e=N(null);try{t.call(n)}finally{N(e),_e(fe.LifecycleHookEnd,n,t)}}function T0(n,t,e,r){let i=e[r]<0,o=e[r+1],s=i?-e[r]:e[r],a=n[s];i?n[$]>>14<n[go]>>16&&(n[$]&3)===t&&(n[$]+=16384,CC(a,o)):CC(a,o)}var _s=-1,Eo=class{factory;name;injectImpl;resolving=!1;canSeeViewProviders;multi;componentProviders;index;providerFactory;constructor(t,e,r,i){this.factory=t,this.name=i,this.canSeeViewProviders=e,this.injectImpl=r}};function S0(n){return(n.flags&8)!==0}function I0(n){return(n.flags&16)!==0}function M0(n,t,e){let r=0;for(;r<e.length;){let i=e[r];if(typeof i=="number"){if(i!==0)break;r++;let o=e[r++],s=e[r++],a=e[r++];n.setAttribute(t,s,a,o)}else{let o=i,s=e[++r];x0(o)?n.setProperty(t,o,s):n.setAttribute(t,o,s),r++}}return r}function nD(n){return n===3||n===4||n===6}function x0(n){return n.charCodeAt(0)===64}function Cs(n,t){if(!(t===null||t.length===0))if(n===null||n.length===0)n=t.slice();else{let e=-1;for(let r=0;r<t.length;r++){let i=t[r];typeof i=="number"?e=i:e===0||(e===-1||e===2?DC(n,e,i,null,t[++r]):DC(n,e,i,null,null))}}return n}function DC(n,t,e,r,i){let o=0,s=n.length;if(t===-1)s=-1;else for(;o<n.length;){let a=n[o++];if(typeof a=="number"){if(a===t){s=-1;break}else if(a>t){s=o-1;break}}}for(;o<n.length;){let a=n[o];if(typeof a=="number")break;if(a===e){i!==null&&(n[o+1]=i);return}o++,i!==null&&o++}s!==-1&&(n.splice(s,0,t),o=s+1),n.splice(o++,0,e),i!==null&&n.splice(o++,0,i)}function rD(n){return n!==_s}function zu(n){return n&32767}function R0(n){return n>>16}function Wu(n,t){let e=R0(n),r=t;for(;e>0;)r=r[mo],e--;return r}var Cm=!0;function Gu(n){let t=Cm;return Cm=n,t}var k0=256,iD=k0-1,oD=5,A0=0,br={};function O0(n,t,e){let r;typeof e=="string"?r=e.charCodeAt(0)||0:e.hasOwnProperty(fo)&&(r=e[fo]),r==null&&(r=e[fo]=A0++);let i=r&iD,o=1<<i;t.data[n+(i>>oD)]|=o}function qu(n,t){let e=sD(n,t);if(e!==-1)return e;let r=t[F];r.firstCreatePass&&(n.injectorIndex=t.length,dm(r.data,n),dm(t,null),dm(r.blueprint,null));let i=Zm(n,t),o=n.injectorIndex;if(rD(i)){let s=zu(i),a=Wu(i,t),l=a[F].data;for(let c=0;c<8;c++)t[o+c]=a[s+c]|l[s+c]}return t[o+8]=i,o}function dm(n,t){n.push(0,0,0,0,0,0,0,0,t)}function sD(n,t){return n.injectorIndex===-1||n.parent&&n.parent.injectorIndex===n.injectorIndex||t[n.injectorIndex+8]===null?-1:n.injectorIndex}function Zm(n,t){if(n.parent&&n.parent.injectorIndex!==-1)return n.parent.injectorIndex;let e=0,r=null,i=t;for(;i!==null;){if(r=dD(i),r===null)return _s;if(e++,i=i[mo],r.injectorIndex!==-1)return r.injectorIndex|e<<16}return _s}function Dm(n,t,e){O0(n,t,e)}function N0(n,t){if(t==="class")return n.classes;if(t==="style")return n.styles;let e=n.attrs;if(e){let r=e.length,i=0;for(;i<r;){let o=e[i];if(nD(o))break;if(o===0)i=i+2;else if(typeof o=="number")for(i++;i<r&&typeof e[i]=="string";)i++;else{if(o===t)return e[i+1];i=i+2}}}return null}function aD(n,t,e){if(e&8||n!==void 0)return n;vu(t,"NodeInjector")}function lD(n,t,e,r){if(e&8&&r===void 0&&(r=null),(e&3)===0){let i=n[zr],o=Nt(void 0);try{return i?i.get(t,r,e&8):Tp(t,r,e&8)}finally{Nt(o)}}return aD(r,t,e)}function cD(n,t,e,r=0,i){if(n!==null){if(t[$]&2048&&!(r&2)){let s=B0(n,t,e,r,br);if(s!==br)return s}let o=uD(n,t,e,r,br);if(o!==br)return o}return lD(t,e,r,i)}function uD(n,t,e,r,i){let o=L0(e);if(typeof o=="function"){if(!nm(t,n,r))return r&1?aD(i,e,r):lD(t,e,r,i);try{let s;if(s=o(r),s==null&&!(r&8))vu(e);else return s}finally{rm()}}else if(typeof o=="number"){let s=null,a=sD(n,t),l=_s,c=r&1?t[Ft][Lt]:null;for((a===-1||r&4)&&(l=a===-1?Zm(n,t):t[a+8],l===_s||!wC(r,!1)?a=-1:(s=t[F],a=zu(l),t=Wu(l,t)));a!==-1;){let u=t[F];if(EC(o,a,u.data)){let d=P0(a,t,e,s,r,c);if(d!==br)return d}l=t[a+8],l!==_s&&wC(r,t[F].data[a+8]===c)&&EC(o,a,t)?(s=u,a=zu(l),t=Wu(l,t)):a=-1}}return i}function P0(n,t,e,r,i,o){let s=t[F],a=s.data[n+8],l=r==null?yr(a)&&Cm:r!=s&&(a.type&3)!==0,c=i&1&&o===a,u=Vu(a,s,e,l,c);return u!==null?nl(t,s,u,a,i):br}function Vu(n,t,e,r,i){let o=n.providerIndexes,s=t.data,a=o&1048575,l=n.directiveStart,c=n.directiveEnd,u=o>>20,d=r?a:a+u,h=i?a+u:c;for(let p=d;p<h;p++){let m=s[p];if(p<l&&e===m||p>=l&&m.type===e)return p}if(i){let p=s[l];if(p&&vr(p)&&p.type===e)return l}return null}function nl(n,t,e,r,i){let o=n[e],s=t.data;if(o instanceof Eo){let a=o;if(a.resolving)throw wp("");let l=Gu(a.canSeeViewProviders);a.resolving=!0;let c=s[e].type||s[e],u,d=a.injectImpl?Nt(a.injectImpl):null,h=nm(n,r,0);try{o=n[e]=a.factory(void 0,i,s,n,r),t.firstCreatePass&&e>=r.directiveStart&&w0(e,s[e],t)}finally{d!==null&&Nt(d),Gu(l),a.resolving=!1,rm()}}return o}function L0(n){if(typeof n=="string")return n.charCodeAt(0)||0;let t=n.hasOwnProperty(fo)?n[fo]:void 0;return typeof t=="number"?t>=0?t&iD:F0:t}function EC(n,t,e){let r=1<<n;return!!(e[t+(n>>oD)]&r)}function wC(n,t){return!(n&2)&&!(n&1&&t)}var Do=class{_tNode;_lView;constructor(t,e){this._tNode=t,this._lView=e}get(t,e,r){return cD(this._tNode,this._lView,t,lo(r),e)}};function F0(){return new Do(vt(),U())}function Sn(n){return al(()=>{let t=n.prototype.constructor,e=t[Fa]||Em(t),r=Object.prototype,i=Object.getPrototypeOf(n.prototype).constructor;for(;i&&i!==r;){let o=i[Fa]||Em(i);if(o&&o!==e)return o;i=Object.getPrototypeOf(i)}return o=>new o})}function Em(n){return mp(n)?()=>{let t=Em(yt(n));return t&&t()}:bi(n)}function B0(n,t,e,r,i){let o=n,s=t;for(;o!==null&&s!==null&&s[$]&2048&&!ys(s);){let a=uD(o,s,e,r|2,br);if(a!==br)return a;let l=o.parent;if(!l){let c=s[Op];if(c){let u=c.get(e,br,r&-5);if(u!==br)return u}l=dD(s),s=s[mo]}o=l}return i}function dD(n){let t=n[F],e=t.type;return e===2?t.declTNode:e===1?n[Lt]:null}function ll(n){return N0(vt(),n)}function j0(){return Ss(vt(),U())}function Ss(n,t){return new re(Cn(n,t))}var re=(()=>{class n{nativeElement;constructor(e){this.nativeElement=e}static __NG_ELEMENT_ID__=j0}return n})();function V0(n){return n instanceof re?n.nativeElement:n}function U0(){return this._results[Symbol.iterator]()}var Xn=class{_emitDistinctChangesOnly;dirty=!0;_onDirty=void 0;_results=[];_changesDetected=!1;_changes=void 0;length=0;first=void 0;last=void 0;get changes(){return this._changes??=new C}constructor(t=!1){this._emitDistinctChangesOnly=t}get(t){return this._results[t]}map(t){return this._results.map(t)}filter(t){return this._results.filter(t)}find(t){return this._results.find(t)}reduce(t,e){return this._results.reduce(t,e)}forEach(t){this._results.forEach(t)}some(t){return this._results.some(t)}toArray(){return this._results.slice()}toString(){return this._results.toString()}reset(t,e){this.dirty=!1;let r=L_(t);(this._changesDetected=!P_(this._results,r,e))&&(this._results=r,this.length=r.length,this.last=r[this.length-1],this.first=r[0])}notifyOnChanges(){this._changes!==void 0&&(this._changesDetected||!this._emitDistinctChangesOnly)&&this._changes.next(this)}onDirty(t){this._onDirty=t}setDirty(){this.dirty=!0,this._onDirty?.()}destroy(){this._changes!==void 0&&(this._changes.complete(),this._changes.unsubscribe())}[Symbol.iterator]=U0};function fD(n){return(n.flags&128)===128}var Xm=(function(n){return n[n.OnPush=0]="OnPush",n[n.Eager=1]="Eager",n[n.Default=1]="Default",n})(Xm||{}),hD=new Map,$0=0;function H0(){return $0++}function z0(n){hD.set(n[Wr],n)}function wm(n){hD.delete(n[Wr])}var TC="__ngContext__";function Ds(n,t){Gr(t)?(n[TC]=t[Wr],z0(t)):n[TC]=t}function pD(n){return gD(n[gs])}function mD(n){return gD(n[bn])}function gD(n){for(;n!==null&&!Kn(n);)n=n[bn];return n}var W0;function Qm(n){W0=n}var Oi=new v("",{factory:()=>G0}),G0="ng";var ld=new v(""),Io=new v("",{providedIn:"platform",factory:()=>"unknown"}),cl=new v(""),Is=new v("",{factory:()=>f(Z).body?.querySelector("[ngCspNonce]")?.getAttribute("ngCspNonce")||null});var yD="r";var vD="di";var bD=!1,_D=new v("",{factory:()=>bD});var SC=new WeakMap;function q0(n,t){if(n==null||typeof n!="object")return;let e=SC.get(n);e||(e=new WeakSet,SC.set(n,e)),e.add(t)}var K0=(n,t,e,r)=>{};function Y0(n,t,e,r){K0(n,t,e,r)}function cd(n){return(n.flags&32)===32}var Z0=()=>null;function CD(n,t,e=!1){return Z0(n,t,e)}function DD(n,t){let e=n.contentQueries;if(e!==null){let r=N(null);try{for(let i=0;i<e.length;i+=2){let o=e[i],s=e[i+1];if(s!==-1){let a=n.data[s];Mu(o),a.contentQueries(2,t[s],s)}}}finally{N(r)}}}function Tm(n,t,e){Mu(0);let r=N(null);try{t(n,e)}finally{N(r)}}function ED(n,t,e){if(Pp(t)){let r=N(null);try{let i=t.directiveStart,o=t.directiveEnd;for(let s=i;s<o;s++){let a=n.data[s];if(a.contentQueries){let l=e[s];a.contentQueries(1,l,s)}}}finally{N(r)}}}var Qn=(function(n){return n[n.Emulated=0]="Emulated",n[n.None=2]="None",n[n.ShadowDom=3]="ShadowDom",n[n.ExperimentalIsolatedShadowDom=4]="ExperimentalIsolatedShadowDom",n})(Qn||{});var Lu;function X0(){if(Lu===void 0&&(Lu=null,$r.trustedTypes))try{Lu=$r.trustedTypes.createPolicy("angular#unsafe-bypass",{createHTML:n=>n,createScript:n=>n,createScriptURL:n=>n})}catch{}return Lu}function IC(n){return X0()?.createScriptURL(n)||n}var Ku=class{changingThisBreaksApplicationSecurity;constructor(t){this.changingThisBreaksApplicationSecurity=t}toString(){return`SafeValue must use [property]=binding: ${this.changingThisBreaksApplicationSecurity} (see ${hu})`}};function ul(n){return n instanceof Ku?n.changingThisBreaksApplicationSecurity:n}function Jm(n,t){let e=wD(n);if(e!=null&&e!==t){if(e==="ResourceURL"&&t==="URL")return!0;throw new Error(`Required a safe ${t}, got a ${e} (see ${hu})`)}return e===t}function wD(n){return n instanceof Ku&&n.getTypeName()||null}var Q0=/^(?!javascript:)(?:[a-z0-9+.-]+:|[^&:\/?#]*(?:[\/?#]|$))/i;function TD(n){return n=String(n),n.match(Q0)?n:"unsafe:"+n}function J0(n,t){return n.createText(t)}function ex(n,t,e){n.setValue(t,e)}function SD(n,t,e){return n.createElement(t,e)}function Yu(n,t,e,r,i){n.insertBefore(t,e,r,i)}function ID(n,t,e){n.appendChild(t,e)}function MC(n,t,e,r,i){r!==null?Yu(n,t,e,r,i):ID(n,t,e)}function MD(n,t,e,r){n.removeChild(null,t,e,r)}function tx(n,t,e){n.setAttribute(t,"style",e)}function nx(n,t,e){e===""?n.removeAttribute(t,"class"):n.setAttribute(t,"class",e)}function xD(n,t,e){let{mergedAttrs:r,classes:i,styles:o}=e;r!==null&&M0(n,t,r),i!==null&&nx(n,t,i),o!==null&&tx(n,t,o)}var ud=(function(n){return n[n.NONE=0]="NONE",n[n.HTML=1]="HTML",n[n.STYLE=2]="STYLE",n[n.SCRIPT=3]="SCRIPT",n[n.URL=4]="URL",n[n.RESOURCE_URL=5]="RESOURCE_URL",n})(ud||{});function RD(n){let t=AD();return t?t.sanitize(ud.URL,n)||"":Jm(n,"URL")?ul(n):TD(yu(n))}function kD(n){let t=AD();if(t)return IC(t.sanitize(ud.RESOURCE_URL,n)||"");if(Jm(n,"ResourceURL"))return IC(ul(n));throw new S(904,!1)}var rx={embed:{src:!0},frame:{src:!0},iframe:{src:!0},media:{src:!0},script:{src:!0,href:!0,"xlink:href":!0},base:{href:!0},link:{href:!0},object:{data:!0,codebase:!0}};function ix(n,t){return rx[n]?.[t]===!0?kD:RD}function eg(n,t,e){return ix(t,e)(n)}function AD(){let n=U();return n&&n[qn].sanitizer}function OD(n){return n instanceof Function?n():n}function ox(n,t,e){let r=n.length;for(;;){let i=n.indexOf(t,e);if(i===-1)return i;if(i===0||n.charCodeAt(i-1)<=32){let o=t.length;if(i+o===r||n.charCodeAt(i+o)<=32)return i}e=i+1}}var ND="ng-template";function sx(n,t,e,r){let i=0;if(r){for(;i<t.length&&typeof t[i]=="string";i+=2)if(t[i]==="class"&&ox(t[i+1].toLowerCase(),e,0)!==-1)return!0}else if(tg(n))return!1;if(i=t.indexOf(1,i),i>-1){let o;for(;++i<t.length&&typeof(o=t[i])=="string";)if(o.toLowerCase()===e)return!0}return!1}function tg(n){return n.type===4&&n.value!==ND}function ax(n,t,e){let r=n.type===4&&!e?ND:n.value;return t===r}function lx(n,t,e){let r=4,i=n.attrs,o=i!==null?dx(i):0,s=!1;for(let a=0;a<t.length;a++){let l=t[a];if(typeof l=="number"){if(!s&&!Yn(r)&&!Yn(l))return!1;if(s&&Yn(l))continue;s=!1,r=l|r&1;continue}if(!s)if(r&4){if(r=2|r&1,l!==""&&!ax(n,l,e)||l===""&&t.length===1){if(Yn(r))return!1;s=!0}}else if(r&8){if(i===null||!sx(n,i,l,e)){if(Yn(r))return!1;s=!0}}else{let c=t[++a],u=cx(l,i,tg(n),e);if(u===-1){if(Yn(r))return!1;s=!0;continue}if(c!==""){let d;if(u>o?d="":d=i[u+1].toLowerCase(),r&2&&c!==d){if(Yn(r))return!1;s=!0}}}}return Yn(r)||s}function Yn(n){return(n&1)===0}function cx(n,t,e,r){if(t===null)return-1;let i=0;if(r||!e){let o=!1;for(;i<t.length;){let s=t[i];if(s===n)return i;if(s===3||s===6)o=!0;else if(s===1||s===2){let a=t[++i];for(;typeof a=="string";)a=t[++i];continue}else{if(s===4)break;if(s===0){i+=4;continue}}i+=o?1:2}return-1}else return fx(t,n)}function PD(n,t,e=!1){for(let r=0;r<t.length;r++)if(lx(n,t[r],e))return!0;return!1}function ux(n){let t=n.attrs;if(t!=null){let e=t.indexOf(5);if((e&1)===0)return t[e+1]}return null}function dx(n){for(let t=0;t<n.length;t++){let e=n[t];if(nD(e))return t}return n.length}function fx(n,t){let e=n.indexOf(4);if(e>-1)for(e++;e<n.length;){let r=n[e];if(typeof r=="number")return-1;if(r===t)return e;e++}return-1}function hx(n,t){e:for(let e=0;e<t.length;e++){let r=t[e];if(n.length===r.length){for(let i=0;i<n.length;i++)if(n[i]!==r[i])continue e;return!0}}return!1}function xC(n,t){return n?":not("+t.trim()+")":t}function px(n){let t=n[0],e=1,r=2,i="",o=!1;for(;e<n.length;){let s=n[e];if(typeof s=="string")if(r&2){let a=n[++e];i+="["+s+(a.length>0?'="'+a+'"':"")+"]"}else r&8?i+="."+s:r&4&&(i+=" "+s);else i!==""&&!Yn(s)&&(t+=xC(o,i),i=""),r=s,o=o||!Yn(r);e++}return i!==""&&(t+=xC(o,i)),t}function mx(n){return n.map(px).join(",")}function gx(n){let t=[],e=[],r=1,i=2;for(;r<n.length;){let o=n[r];if(typeof o=="string")i===2?o!==""&&t.push(o,n[++r]):i===8&&e.push(o);else{if(!Yn(i))break;i=o}r++}return e.length&&t.push(1,...e),t}var In={};function ng(n,t,e,r,i,o,s,a,l,c,u){let d=Fe+r,h=d+i,p=yx(d,h),m=typeof c=="function"?c():c;return p[F]={type:n,blueprint:p,template:e,queries:null,viewQuery:a,declTNode:t,data:p.slice().fill(null,d),bindingStartIndex:d,expandoStartIndex:h,hostBindingOpCodes:null,firstCreatePass:!0,firstUpdatePass:!0,staticViewQueries:!1,staticContentQueries:!1,preOrderHooks:null,preOrderCheckHooks:null,contentHooks:null,contentCheckHooks:null,viewHooks:null,viewCheckHooks:null,destroyHooks:null,cleanup:null,contentQueries:null,components:null,directiveRegistry:typeof o=="function"?o():o,pipeRegistry:typeof s=="function"?s():s,firstChild:null,schemas:l,consts:m,incompleteFirstPass:!1,ssrId:u}}function yx(n,t){let e=[];for(let r=0;r<t;r++)e.push(r<n?null:In);return e}function vx(n){let t=n.tView;return t===null||t.incompleteFirstPass?n.tView=ng(1,null,n.template,n.decls,n.vars,n.directiveDefs,n.pipeDefs,n.viewQuery,n.schemas,n.consts,n.id):t}function rg(n,t,e,r,i,o,s,a,l,c,u){let d=t.blueprint.slice();return d[Gn]=i,d[$]=r|4|128|8|64|1024,(c!==null||n&&n[$]&2048)&&(d[$]|=2048),jp(d),d[st]=d[mo]=n,d[Ze]=e,d[qn]=s||n&&n[qn],d[Ae]=a||n&&n[Ae],d[zr]=l||n&&n[zr]||null,d[Lt]=o,d[Wr]=H0(),d[po]=u,d[Op]=c,d[Ft]=t.type==2?n[Ft]:d,d}function bx(n,t,e){let r=Cn(t,n),i=vx(e),o=n[qn].rendererFactory,s=ig(n,rg(n,i,null,LD(e),r,t,null,o.createRenderer(r,e),null,null,null));return n[t.index]=s}function LD(n){let t=16;return n.signals?t=4096:n.onPush&&(t=64),t}function FD(n,t,e,r){if(e===0)return-1;let i=t.length;for(let o=0;o<e;o++)t.push(r),n.blueprint.push(r),n.data.push(null);return i}function ig(n,t){return n[gs]?n[Ap][bn]=t:n[gs]=t,n[Ap]=t,t}function R(n=1){BD(Be(),U(),qr()+n,!1)}function BD(n,t,e,r){if(!r)if((t[$]&3)===3){let o=n.preOrderCheckHooks;o!==null&&Bu(t,o,e)}else{let o=n.preOrderHooks;o!==null&&ju(t,o,0,e)}Ri(e)}var dd=(function(n){return n[n.None=0]="None",n[n.SignalBased=1]="SignalBased",n[n.HasDecoratorInputTransform=2]="HasDecoratorInputTransform",n})(dd||{});function Sm(n,t,e,r){let i=N(null);try{let[o,s,a]=n.inputs[e],l=null;(s&dd.SignalBased)!==0&&(l=t[o][ct]),l!==null&&l.transformFn!==void 0?r=l.transformFn(r):a!==null&&(r=a.call(t,r)),n.setInput!==null?n.setInput(t,l,r,e,o):ZC(t,l,o,r)}finally{N(i)}}var _r=(function(n){return n[n.Important=1]="Important",n[n.DashCase=2]="DashCase",n})(_r||{}),_x;function og(n,t){return _x(n,t)}var Lz=typeof document<"u"&&typeof document?.documentElement?.getAnimations=="function";var Im=new WeakMap,Ja=new WeakSet;function Cx(n,t){let e=Im.get(n);if(!e||e.length===0)return;let r=t.parentNode,i=t.previousSibling;for(let o=e.length-1;o>=0;o--){let s=e[o],a=s.parentNode;s===t?(e.splice(o,1),Ja.add(s),s.dispatchEvent(new CustomEvent("animationend",{detail:{cancel:!0}}))):(i&&s===i||a&&r&&a!==r)&&(e.splice(o,1),s.dispatchEvent(new CustomEvent("animationend",{detail:{cancel:!0}})),s.parentNode?.removeChild(s))}}function Dx(n,t){let e=Im.get(n);e?e.includes(t)||e.push(t):Im.set(n,[t])}var wo=new Set,fd=(function(n){return n[n.CHANGE_DETECTION=0]="CHANGE_DETECTION",n[n.AFTER_NEXT_RENDER=1]="AFTER_NEXT_RENDER",n})(fd||{}),Ni=new v(""),RC=new Set;function Yr(n){RC.has(n)||(RC.add(n),performance?.mark?.("mark_feature_usage",{detail:{feature:n}}))}var sg=(()=>{class n{impl=null;execute(){this.impl?.execute()}static \u0275prov=y({token:n,providedIn:"root",factory:()=>new n})}return n})(),jD=[0,1,2,3],VD=(()=>{class n{ngZone=f(j);scheduler=f(Di);errorHandler=f(vn,{optional:!0});sequences=new Set;deferredRegistrations=new Set;executing=!1;constructor(){f(Ni,{optional:!0})}execute(){let e=this.sequences.size>0;e&&_e(fe.AfterRenderHooksStart),this.executing=!0;for(let r of jD)for(let i of this.sequences)if(!(i.erroredOrDestroyed||!i.hooks[r]))try{i.pipelinedValue=this.ngZone.runOutsideAngular(()=>this.maybeTrace(()=>{let o=i.hooks[r];return o(i.pipelinedValue)},i.snapshot))}catch(o){i.erroredOrDestroyed=!0,this.errorHandler?.handleError(o)}this.executing=!1;for(let r of this.sequences)r.afterRun(),r.once&&(this.sequences.delete(r),r.destroy());for(let r of this.deferredRegistrations)this.sequences.add(r);this.deferredRegistrations.size>0&&this.scheduler.notify(7),this.deferredRegistrations.clear(),e&&_e(fe.AfterRenderHooksEnd)}register(e){let{view:r}=e;r!==void 0?((r[yo]??=[]).push(e),_o(r),r[$]|=8192):this.executing?this.deferredRegistrations.add(e):this.addSequence(e)}addSequence(e){this.sequences.add(e),this.scheduler.notify(7)}unregister(e){this.executing&&this.sequences.has(e)?(e.erroredOrDestroyed=!0,e.pipelinedValue=void 0,e.once=!0):(this.sequences.delete(e),this.deferredRegistrations.delete(e))}maybeTrace(e,r){return r?r.run(fd.AFTER_NEXT_RENDER,e):e()}static \u0275prov=y({token:n,providedIn:"root",factory:()=>new n})}return n})(),Zu=class{impl;hooks;view;once;snapshot;erroredOrDestroyed=!1;pipelinedValue=void 0;unregisterOnDestroy;constructor(t,e,r,i,o,s=null){this.impl=t,this.hooks=e,this.view=r,this.once=i,this.snapshot=s,this.unregisterOnDestroy=o?.onDestroy(()=>this.destroy())}afterRun(){this.erroredOrDestroyed=!1,this.pipelinedValue=void 0,this.snapshot?.dispose(),this.snapshot=null}destroy(){this.impl.unregister(this),this.unregisterOnDestroy?.();let t=this.view?.[yo];t&&(this.view[yo]=t.filter(e=>e!==this))}};function ft(n,t){let e=t?.injector??f(ne);return Yr("NgAfterNextRender"),wx(n,e,t,!0)}function Ex(n){return n instanceof Function?[void 0,void 0,n,void 0]:[n.earlyRead,n.write,n.mixedReadWrite,n.read]}function wx(n,t,e,r){let i=t.get(sg);i.impl??=t.get(VD);let o=t.get(Ni,null,{optional:!0}),s=e?.manualCleanup!==!0?t.get(tt):null,a=t.get(Za,null,{optional:!0}),l=new Zu(i.impl,Ex(n),a?.view,r,s,o?.snapshot(null));return i.impl.register(l),l}var UD=new v("",{factory:()=>({queue:new Set,isScheduled:!1,scheduler:null,injector:f(ke)})});function $D(n,t,e){let r=n.get(UD);if(Array.isArray(t))for(let i of t)r.queue.add(i),e?.detachedLeaveAnimationFns?.push(i);else r.queue.add(t),e?.detachedLeaveAnimationFns?.push(t);r.scheduler&&r.scheduler(n)}function Tx(n,t){let e=n.get(UD);if(t.detachedLeaveAnimationFns){for(let r of t.detachedLeaveAnimationFns)e.queue.delete(r);t.detachedLeaveAnimationFns=void 0}}function Sx(n,t){for(let[e,r]of t)$D(n,r.animateFns)}function kC(n,t,e,r){let i=n?.[Ii]?.enter;t!==null&&i&&i.has(e.index)&&Sx(r,i)}function bs(n,t,e,r,i,o,s,a){if(i!=null){let l,c=!1;Kn(i)?l=i:Gr(i)&&(c=!0,i=i[Gn]);let u=_n(i);n===0&&r!==null?(kC(a,r,o,e),s==null?ID(t,r,u):Yu(t,r,u,s||null,!0)):n===1&&r!==null?(kC(a,r,o,e),Yu(t,r,u,s||null,!0),Cx(o,u)):n===2?(a?.[Ii]?.leave?.has(o.index)&&Dx(o,u),Ja.delete(u),AC(a,o,e,d=>{if(Ja.has(u)){Ja.delete(u);return}MD(t,u,c,d)})):n===3&&(Ja.delete(u),AC(a,o,e,()=>{t.destroyNode(u)})),l!=null&&Fx(t,n,e,l,o,r,s)}}function Ix(n,t){HD(n,t),t[Gn]=null,t[Lt]=null}function Mx(n,t,e,r,i,o){r[Gn]=i,r[Lt]=t,pd(n,r,e,1,i,o)}function HD(n,t){t[qn].changeDetectionScheduler?.notify(9),pd(n,t,t[Ae],2,null,null)}function xx(n){let t=n[gs];if(!t)return fm(n[F],n);for(;t;){let e=null;if(Gr(t))e=t[gs];else{let r=t[Ke];r&&(e=r)}if(!e){for(;t&&!t[bn]&&t!==n;)Gr(t)&&fm(t[F],t),t=t[st];t===null&&(t=n),Gr(t)&&fm(t[F],t),e=t&&t[bn]}t=e}}function ag(n,t){let e=n[vo],r=e.indexOf(t);e.splice(r,1)}function hd(n,t){if(bo(t))return;let e=t[Ae];e.destroyNode&&pd(n,t,e,3,null,null),xx(t)}function fm(n,t){if(bo(t))return;let e=N(null);try{t[$]&=-129,t[$]|=256,t[sn]&&eo(t[sn]),Ax(n,t),kx(n,t),t[F].type===1&&t[Ae].destroy();let r=t[Si];if(r!==null&&Kn(t[st])){r!==t[st]&&ag(r,t);let i=t[gr];i!==null&&i.detachView(n)}wm(t)}finally{N(e)}}function AC(n,t,e,r){let i=n?.[Ii];if(i==null||i.leave==null||!i.leave.has(t.index))return r(!1);n&&wo.add(n[Wr]),$D(e,()=>{if(i.leave&&i.leave.has(t.index)){let s=i.leave.get(t.index),a=[];if(s){for(let l=0;l<s.animateFns.length;l++){let c=s.animateFns[l],{promise:u}=c();a.push(u)}i.detachedLeaveAnimationFns=void 0}i.running=Promise.allSettled(a),Rx(n,r)}else n&&wo.delete(n[Wr]),r(!1)},i)}function Rx(n,t){let e=n[Ii]?.running;if(e){e.then(()=>{n[Ii].running=void 0,wo.delete(n[Wr]),t(!0)});return}t(!1)}function kx(n,t){let e=n.cleanup,r=t[ms];if(e!==null)for(let s=0;s<e.length-1;s+=2)if(typeof e[s]=="string"){let a=e[s+3];a>=0?r[a]():r[-a].unsubscribe(),s+=2}else{let a=r[e[s+1]];e[s].call(a)}r!==null&&(t[ms]=null);let i=t[Ur];if(i!==null){t[Ur]=null;for(let s=0;s<i.length;s++){let a=i[s];a()}}let o=t[_i];if(o!==null){t[_i]=null;for(let s of o)s.destroy()}}function Ax(n,t){let e;if(n!=null&&(e=n.destroyHooks)!=null)for(let r=0;r<e.length;r+=2){let i=t[e[r]];if(!(i instanceof Eo)){let o=e[r+1];if(Array.isArray(o))for(let s=0;s<o.length;s+=2){let a=i[o[s]],l=o[s+1];_e(fe.LifecycleHookStart,a,l);try{l.call(a)}finally{_e(fe.LifecycleHookEnd,a,l)}}else{_e(fe.LifecycleHookStart,i,o);try{o.call(i)}finally{_e(fe.LifecycleHookEnd,i,o)}}}}}function zD(n,t,e){return Ox(n,t.parent,e)}function Ox(n,t,e){let r=t;for(;r!==null&&r.type&168;)t=r,r=t.parent;if(r===null)return e[Gn];if(yr(r)){let{encapsulation:i}=n.data[r.directiveStart+r.componentOffset];if(i===Qn.None||i===Qn.Emulated)return null}return Cn(r,e)}function WD(n,t,e){return Px(n,t,e)}function Nx(n,t,e){return n.type&40?Cn(n,e):null}var Px=Nx,OC;function lg(n,t,e,r){let i=zD(n,r,t),o=t[Ae],s=r.parent||t[Lt],a=WD(s,r,t);if(i!=null)if(Array.isArray(e))for(let l=0;l<e.length;l++)MC(o,i,e[l],a,!1);else MC(o,i,e,a,!1);OC!==void 0&&OC(o,r,t,e,i)}function el(n,t){if(t!==null){let e=t.type;if(e&3)return Cn(t,n);if(e&4)return Mm(-1,n[t.index]);if(e&8){let r=t.child;if(r!==null)return el(n,r);{let i=n[t.index];return Kn(i)?Mm(-1,i):_n(i)}}else{if(e&128)return el(n,t.next);if(e&32)return og(t,n)()||_n(n[t.index]);{let r=GD(n,t);if(r!==null){if(Array.isArray(r))return r[0];let i=Ci(n[Ft]);return el(i,r)}else return el(n,t.next)}}}return null}function GD(n,t){if(t!==null){let r=n[Ft][Lt],i=t.projection;return r.projection[i]}return null}function Mm(n,t){let e=Ke+n+1;if(e<t.length){let r=t[e],i=r[F].firstChild;if(i!==null)return el(r,i)}return t[Mi]}function cg(n,t,e,r,i,o,s){for(;e!=null;){let a=r[zr];if(e.type===128){e=e.next;continue}let l=r[e.index],c=e.type;if(s&&t===0&&(l&&Ds(_n(l),r),e.flags|=2),!cd(e))if(c&8)cg(n,t,e.child,r,i,o,!1),bs(t,n,a,i,l,e,o,r);else if(c&32){let u=og(e,r),d;for(;d=u();)bs(t,n,a,i,d,e,o,r);bs(t,n,a,i,l,e,o,r)}else c&16?qD(n,t,r,e,i,o):bs(t,n,a,i,l,e,o,r);e=s?e.projectionNext:e.next}}function pd(n,t,e,r,i,o){cg(e,r,n.firstChild,t,i,o,!1)}function Lx(n,t,e){let r=t[Ae],i=zD(n,e,t),o=e.parent||t[Lt],s=WD(o,e,t);qD(r,0,t,e,i,s)}function qD(n,t,e,r,i,o){let s=e[Ft],l=s[Lt].projection[r.projection];if(Array.isArray(l))for(let c=0;c<l.length;c++){let u=l[c];bs(t,n,e[zr],i,u,r,o,e)}else{let c=l,u=s[st];fD(r)&&(c.flags|=128),cg(n,t,c,u,i,o,!0)}}function Fx(n,t,e,r,i,o,s){let a=r[Mi],l=_n(r);a!==l&&bs(t,n,e,o,a,i,s);for(let c=Ke;c<r.length;c++){let u=r[c];pd(u[F],u,n,t,o,a)}}function Bx(n,t,e,r,i){if(t)i?n.addClass(e,r):n.removeClass(e,r);else{let o=r.indexOf("-")===-1?void 0:_r.DashCase;i==null?n.removeStyle(e,r,o):(typeof i=="string"&&i.endsWith("!important")&&(i=i.slice(0,-10),o|=_r.Important),n.setStyle(e,r,i,o))}}function KD(n,t,e,r,i){let o=qr(),s=r&2;try{Ri(-1),s&&t.length>Fe&&BD(n,t,Fe,!1);let a=s?fe.TemplateUpdateStart:fe.TemplateCreateStart;_e(a,i,e),e(r,i)}finally{Ri(o);let a=s?fe.TemplateUpdateEnd:fe.TemplateCreateEnd;_e(a,i,e)}}function ug(n,t,e){zx(n,t,e),(e.flags&64)===64&&Wx(n,t,e)}function md(n,t,e=Cn){let r=t.localNames;if(r!==null){let i=t.index+1;for(let o=0;o<r.length;o+=2){let s=r[o+1],a=s===-1?e(t,n):n[s];n[i++]=a}}}function jx(n,t,e,r){let o=r.get(_D,bD)||e===Qn.ShadowDom||e===Qn.ExperimentalIsolatedShadowDom,s=n.selectRootElement(t,o);return Vx(s),s}function Vx(n){Ux(n)}var Ux=()=>null;function $x(n){return n==="class"?"className":n==="for"?"htmlFor":n==="formaction"?"formAction":n==="innerHtml"?"innerHTML":n==="readonly"?"readOnly":n==="tabindex"?"tabIndex":n}function Hx(n,t,e,r,i,o){let s=t[F];if(gd(n,s,t,e,r)){yr(n)&&ZD(t,n.index);return}n.type&3&&(e=$x(e)),YD(n,t,e,r,i,o)}function YD(n,t,e,r,i,o){if(n.type&3){let s=Cn(n,t);r=o!=null?o(r,n.value||"",e):r,i.setProperty(s,e,r)}else n.type&12}function ZD(n,t){let e=Dn(t,n);e[$]&16||(e[$]|=64)}function zx(n,t,e){let r=e.directiveStart,i=e.directiveEnd;yr(e)&&bx(t,e,n.data[r+e.componentOffset]),n.firstCreatePass||qu(e,t);let o=e.initialInputs;for(let s=r;s<i;s++){let a=n.data[s],l=nl(t,n,s,e);if(Ds(l,t),o!==null&&Kx(t,s-r,l,a,e,o),vr(a)){let c=Dn(e.index,t);c[Ze]=nl(t,n,s,e)}}}function Wx(n,t,e){let r=e.directiveStart,i=e.directiveEnd,o=e.index,s=oC();try{Ri(o);for(let a=r;a<i;a++){let l=n.data[a],c=t[a];Iu(a),(l.hostBindings!==null||l.hostVars!==0||l.hostAttrs!==null)&&Gx(l,c)}}finally{Ri(-1),Iu(s)}}function Gx(n,t){n.hostBindings!==null&&n.hostBindings(1,t)}function XD(n,t){let e=n.directiveRegistry,r=null;if(e)for(let i=0;i<e.length;i++){let o=e[i];PD(t,o.selectors,!1)&&(r??=[],vr(o)?r.unshift(o):r.push(o))}return r}function qx(n,t,e,r,i,o){let s=Cn(n,t);QD(t[Ae],s,o,n.value,e,r,i)}function QD(n,t,e,r,i,o,s){if(o==null)n.removeAttribute(t,i,e);else{let a=s==null?yu(o):s(o,r||"",i);n.setAttribute(t,i,a,e)}}function Kx(n,t,e,r,i,o){let s=o[t];if(s!==null)for(let a=0;a<s.length;a+=2){let l=s[a],c=s[a+1];Sm(r,e,l,c)}}function JD(n,t,e,r,i){let o=Fe+e,s=t[F],a=i(s,t,n,r,e);t[o]=a,vs(n,!0);let l=n.type===2;return l?(xD(t[Ae],a,n),(Q_()===0||qa(n))&&Ds(a,t),J_()):Ds(a,t),Au()&&(!l||!cd(n))&&lg(s,t,a,n),n}function eE(n){let t=n;return Zp()?Xp():(t=t.parent,vs(t,!1)),t}function Yx(n,t){let e=n[zr];if(!e)return;let r;try{r=e.get(En,null)}catch{r=null}r?.(t)}function gd(n,t,e,r,i){let o=n.inputs?.[r],s=n.hostDirectiveInputs?.[r],a=!1;if(s)for(let l=0;l<s.length;l+=2){let c=s[l],u=s[l+1],d=t.data[c];Sm(d,e[c],u,i),a=!0}if(o)for(let l of o){let c=e[l],u=t.data[l];Sm(u,c,r,i),a=!0}return a}function Zx(n,t){let e=Dn(t,n),r=e[F];Xx(r,e);let i=e[Gn];i!==null&&e[po]===null&&(e[po]=CD(i,e[zr])),_e(fe.ComponentStart);try{dg(r,e,e[Ze])}finally{_e(fe.ComponentEnd,e[Ze])}}function Xx(n,t){for(let e=t.length;e<n.blueprint.length;e++)t.push(n.blueprint[e])}function dg(n,t,e){xu(t);try{let r=n.viewQuery;r!==null&&Tm(1,r,e);let i=n.template;i!==null&&KD(n,t,i,1,e),n.firstCreatePass&&(n.firstCreatePass=!1),t[gr]?.finishViewCreation(n),n.staticContentQueries&&DD(n,t),n.staticViewQueries&&Tm(2,n.viewQuery,e);let o=n.components;o!==null&&Qx(t,o)}catch(r){throw n.firstCreatePass&&(n.incompleteFirstPass=!0,n.firstCreatePass=!1),r}finally{t[$]&=-5,Ru()}}function Qx(n,t){for(let e=0;e<t.length;e++)Zx(n,t[e])}function dl(n,t,e,r){let i=N(null);try{let o=t.tView,a=n[$]&4096?4096:16,l=rg(n,o,e,a,null,t,null,null,r?.injector??null,r?.embeddedViewInjector??null,r?.dehydratedView??null),c=n[t.index];l[Si]=c;let u=n[gr];return u!==null&&(l[gr]=u.createEmbeddedView(o)),dg(o,l,e),l}finally{N(i)}}function Es(n,t){return!t||t.firstChild===null||fD(n)}function rl(n,t,e,r,i=!1){for(;e!==null;){if(e.type===128){e=i?e.projectionNext:e.next;continue}let o=t[e.index];o!==null&&r.push(_n(o)),Kn(o)&&tE(o,r);let s=e.type;if(s&8)rl(n,t,e.child,r);else if(s&32){let a=og(e,t),l;for(;l=a();)r.push(l)}else if(s&16){let a=GD(t,e);if(Array.isArray(a))r.push(...a);else{let l=Ci(t[Ft]);rl(l[F],l,a,r,!0)}}e=i?e.projectionNext:e.next}return r}function tE(n,t){for(let e=Ke;e<n.length;e++){let r=n[e],i=r[F].firstChild;i!==null&&rl(r[F],r,i,t)}n[Mi]!==n[Gn]&&t.push(n[Mi])}function nE(n){if(n[yo]!==null){for(let t of n[yo])t.impl.addSequence(t);n[yo].length=0}}var rE=[];function Jx(n){return n[sn]??eR(n)}function eR(n){let t=rE.pop()??Object.create(nR);return t.lView=n,t}function tR(n){n.lView[sn]!==n&&(n.lView=null,rE.push(n))}var nR=W(g({},hi),{consumerIsAlwaysLive:!0,kind:"template",consumerMarkedDirty:n=>{_o(n.lView)},consumerOnSignalRead(){this.lView[sn]=this}});function rR(n){let t=n[sn]??Object.create(iR);return t.lView=n,t}var iR=W(g({},hi),{consumerIsAlwaysLive:!0,kind:"template",consumerMarkedDirty:n=>{let t=Ci(n.lView);for(;t&&!iE(t[F]);)t=Ci(t);t&&Vp(t)},consumerOnSignalRead(){this.lView[sn]=this}});function iE(n){return n.type!==2}function oE(n){if(n[_i]===null)return;let t=!0;for(;t;){let e=!1;for(let r of n[_i])r.dirty&&(e=!0,r.zone===null||Zone.current===r.zone?r.run():r.zone.run(()=>r.run()));t=e&&!!(n[$]&8192)}}var oR=100;function sE(n,t=0){let r=n[qn].rendererFactory,i=!1;i||r.begin?.();try{sR(n,t)}finally{i||r.end?.()}}function sR(n,t){let e=Qp();try{ja(!0),xm(n,t);let r=0;for(;Ka(n);){if(r===oR)throw new S(103,!1);r++,xm(n,1)}}finally{ja(e)}}function aR(n,t,e,r){if(bo(t))return;let i=t[$],o=!1,s=!1;xu(t);let a=!0,l=null,c=null;o||(iE(n)?(c=Jx(t),l=pi(c)):Tc()===null?(a=!1,c=rR(t),l=pi(c)):t[sn]&&(eo(t[sn]),t[sn]=null));try{jp(t),nC(n.bindingStartIndex),e!==null&&KD(n,t,e,2,r);let u=(i&3)===3;if(!o)if(u){let p=n.preOrderCheckHooks;p!==null&&Bu(t,p,null)}else{let p=n.preOrderHooks;p!==null&&ju(t,p,0,null),um(t,0)}if(s||lR(t),oE(t),aE(t,0),n.contentQueries!==null&&DD(n,t),!o)if(u){let p=n.contentCheckHooks;p!==null&&Bu(t,p)}else{let p=n.contentHooks;p!==null&&ju(t,p,1),um(t,1)}uR(n,t);let d=n.components;d!==null&&cE(t,d,0);let h=n.viewQuery;if(h!==null&&Tm(2,h,r),!o)if(u){let p=n.viewCheckHooks;p!==null&&Bu(t,p)}else{let p=n.viewHooks;p!==null&&ju(t,p,2),um(t,2)}if(n.firstUpdatePass===!0&&(n.firstUpdatePass=!1),t[Du]){for(let p of t[Du])p();t[Du]=null}o||(nE(t),t[$]&=-73)}catch(u){throw o||_o(t),u}finally{c!==null&&(Ji(c,l),a&&tR(c)),Ru()}}function aE(n,t){for(let e=pD(n);e!==null;e=mD(e))for(let r=Ke;r<e.length;r++){let i=e[r];lE(i,t)}}function lR(n){for(let t=pD(n);t!==null;t=mD(t)){if(!(t[$]&2))continue;let e=t[vo];for(let r=0;r<e.length;r++){let i=e[r];Vp(i)}}}function cR(n,t,e){_e(fe.ComponentStart);let r=Dn(t,n);try{lE(r,e)}finally{_e(fe.ComponentEnd,r[Ze])}}function lE(n,t){Tu(n)&&xm(n,t)}function xm(n,t){let r=n[F],i=n[$],o=n[sn],s=!!(t===0&&i&16);if(s||=!!(i&64&&t===0),s||=!!(i&1024),s||=!!(o?.dirty&&Ca(o)),s||=!1,o&&(o.dirty=!1),n[$]&=-9217,s)aR(r,n,r.template,n[Ze]);else if(i&8192){let a=N(null);try{oE(n),aE(n,1);let l=r.components;l!==null&&cE(n,l,1),nE(n)}finally{N(a)}}}function cE(n,t,e){for(let r=0;r<t.length;r++)cR(n,t[r],e)}function uR(n,t){let e=n.hostBindingOpCodes;if(e!==null)try{for(let r=0;r<e.length;r++){let i=e[r];if(i<0)Ri(~i);else{let o=i,s=e[++r],a=e[++r];iC(s,o);let l=t[o];_e(fe.HostBindingsUpdateStart,l);try{a(2,l)}finally{_e(fe.HostBindingsUpdateEnd,l)}}}}finally{Ri(-1)}}function fg(n,t){let e=Qp()?64:1088;for(n[qn].changeDetectionScheduler?.notify(t);n;){n[$]|=e;let r=Ci(n);if(ys(n)&&!r)return n;n=r}return null}function uE(n,t,e,r){return[n,!0,0,t,null,r,null,e,null,null]}function dE(n,t){let e=Ke+t;if(e<n.length)return n[e]}function fl(n,t,e,r=!0){let i=t[F];if(dR(i,t,n,e),r){let s=Mm(e,n),a=t[Ae],l=a.parentNode(n[Mi]);l!==null&&Mx(i,n[Lt],a,t,l,s)}let o=t[po];o!==null&&o.firstChild!==null&&(o.firstChild=null)}function fE(n,t){let e=il(n,t);return e!==void 0&&hd(e[F],e),e}function il(n,t){if(n.length<=Ke)return;let e=Ke+t,r=n[e];if(r){let i=r[Si];i!==null&&i!==n&&ag(i,r),t>0&&(n[e-1][bn]=r[bn]);let o=za(n,Ke+t);Ix(r[F],r);let s=o[gr];s!==null&&s.detachView(o[F]),r[st]=null,r[bn]=null,r[$]&=-129}return r}function dR(n,t,e,r){let i=Ke+r,o=e.length;r>0&&(e[i-1][bn]=t),r<o-Ke?(t[bn]=e[i],Sp(e,Ke+r,t)):(e.push(t),t[bn]=null),t[st]=e;let s=t[Si];s!==null&&e!==s&&hE(s,t);let a=t[gr];a!==null&&a.insertView(n),Su(t),t[$]|=128}function hE(n,t){let e=n[vo],r=t[st];if(Gr(r))n[$]|=2;else{let i=r[st][Ft];t[Ft]!==i&&(n[$]|=2)}e===null?n[vo]=[t]:e.push(t)}var Ai=class{_lView;_cdRefInjectingView;_appRef=null;_attachedToViewContainer=!1;exhaustive;get rootNodes(){let t=this._lView,e=t[F];return rl(e,t,e.firstChild,[])}constructor(t,e){this._lView=t,this._cdRefInjectingView=e}get context(){return this._lView[Ze]}set context(t){this._lView[Ze]=t}get destroyed(){return bo(this._lView)}destroy(){if(this._appRef)this._appRef.detachView(this);else if(this._attachedToViewContainer){let t=this._lView[st];if(Kn(t)){let e=t[Ga],r=e?e.indexOf(this):-1;r>-1&&(il(t,r),za(e,r))}this._attachedToViewContainer=!1}hd(this._lView[F],this._lView)}onDestroy(t){Up(this._lView,t)}markForCheck(){fg(this._cdRefInjectingView||this._lView,4)}detach(){this._lView[$]&=-129}reattach(){Su(this._lView),this._lView[$]|=128}detectChanges(){this._lView[$]|=1024,sE(this._lView)}checkNoChanges(){}attachToViewContainerRef(){if(this._appRef)throw new S(902,!1);this._attachedToViewContainer=!0}detachFromAppRef(){this._appRef=null;let t=ys(this._lView),e=this._lView[Si];e!==null&&!t&&ag(e,this._lView),HD(this._lView[F],this._lView)}attachToAppRef(t){if(this._attachedToViewContainer)throw new S(902,!1);this._appRef=t;let e=ys(this._lView),r=this._lView[Si];r!==null&&!e&&hE(r,this._lView),Su(this._lView)}};var bt=(()=>{class n{_declarationLView;_declarationTContainer;elementRef;static __NG_ELEMENT_ID__=fR;constructor(e,r,i){this._declarationLView=e,this._declarationTContainer=r,this.elementRef=i}get ssrId(){return this._declarationTContainer.tView?.ssrId||null}createEmbeddedView(e,r){return this.createEmbeddedViewImpl(e,r)}createEmbeddedViewImpl(e,r,i){let o=dl(this._declarationLView,this._declarationTContainer,e,{embeddedViewInjector:r,dehydratedView:i});return new Ai(o)}}return n})();function fR(){return hg(vt(),U())}function hg(n,t){return n.type&4?new bt(t,n,Ss(n,t)):null}function Ms(n,t,e,r,i){let o=n.data[t];if(o===null)o=hR(n,t,e,r,i),rC()&&(o.flags|=32);else if(o.type&64){o.type=e,o.value=r,o.attrs=i;let s=eC();o.injectorIndex=s===null?-1:s.injectorIndex}return vs(o,!0),o}function hR(n,t,e,r,i){let o=Yp(),s=Zp(),a=s?o:o&&o.parent,l=n.data[t]=mR(n,a,e,t,r,i);return pR(n,l,o,s),l}function pR(n,t,e,r){n.firstChild===null&&(n.firstChild=t),e!==null&&(r?e.child==null&&t.parent!==null&&(e.child=t):e.next===null&&(e.next=t,t.prev=e))}function mR(n,t,e,r,i,o){let s=t?t.injectorIndex:-1,a=0;return Gp()&&(a|=128),{type:e,index:r,insertBeforeIndex:null,injectorIndex:s,directiveStart:-1,directiveEnd:-1,directiveStylingLast:-1,componentOffset:-1,controlDirectiveIndex:-1,customControlIndex:-1,propertyBindings:null,flags:a,providerIndexes:0,value:i,attrs:o,mergedAttrs:null,localNames:null,initialInputs:null,inputs:null,hostDirectiveInputs:null,outputs:null,hostDirectiveOutputs:null,directiveToIndex:null,tView:null,next:null,prev:null,projectionNext:null,child:null,parent:t,projection:null,styles:null,stylesWithoutHost:null,residualStyles:void 0,classes:null,classesWithoutHost:null,residualClasses:void 0,classBindings:0,styleBindings:0}}function gR(n){let t=n[Np]??[],r=n[st][Ae],i=[];for(let o of t)o.data[vD]!==void 0?i.push(o):yR(o,r);n[Np]=i}function yR(n,t){let e=0,r=n.firstChild;if(r){let i=n.data[yD];for(;e<i;){let o=r.nextSibling;MD(t,r,!1),r=o,e++}}}var vR=()=>null,bR=()=>null;function Xu(n,t){return vR(n,t)}function pE(n,t,e){return bR(n,t,e)}var mE=class{},yd=class{},Rm=class{resolveComponentFactory(t){throw new S(917,!1)}},hl=class{static NULL=new Rm},It=class{},Bt=(()=>{class n{destroyNode=null;static __NG_ELEMENT_ID__=()=>_R()}return n})();function _R(){let n=U(),t=vt(),e=Dn(t.index,n);return(Gr(e)?e:n)[Ae]}var gE=(()=>{class n{static \u0275prov=y({token:n,providedIn:"root",factory:()=>null})}return n})();var Uu={},km=class{injector;parentInjector;constructor(t,e){this.injector=t,this.parentInjector=e}get(t,e,r){let i=this.injector.get(t,Uu,r);return i!==Uu||e===Uu?i:this.parentInjector.get(t,e,r)}};function Qu(n,t,e){let r=e?n.styles:null,i=e?n.classes:null,o=0;if(t!==null)for(let s=0;s<t.length;s++){let a=t[s];if(typeof a=="number")o=a;else if(o==1)i=pu(i,a);else if(o==2){let l=a,c=t[++s];r=pu(r,l+": "+c+";")}}e?n.styles=r:n.stylesWithoutHost=r,e?n.classes=i:n.classesWithoutHost=i}function Mt(n,t=0){let e=U();if(e===null)return z(n,t);let r=vt();return cD(r,e,yt(n),t)}function vd(){let n="invalid";throw new Error(n)}function yE(n,t,e,r,i){let o=r===null?null:{"":-1},s=i(n,e);if(s!==null){let a=s,l=null,c=null;for(let u of s)if(u.resolveHostDirectives!==null){[a,l,c]=u.resolveHostDirectives(s);break}ER(n,t,e,a,o,l,c)}o!==null&&r!==null&&CR(e,r,o)}function CR(n,t,e){let r=n.localNames=[];for(let i=0;i<t.length;i+=2){let o=e[t[i+1]];if(o==null)throw new S(-301,!1);r.push(t[i],o)}}function DR(n,t,e){t.componentOffset=e,(n.components??=[]).push(t.index)}function ER(n,t,e,r,i,o,s){let a=r.length,l=null;for(let h=0;h<a;h++){let p=r[h];l===null&&vr(p)&&(l=p,DR(n,e,h)),Dm(qu(e,t),n,p.type)}xR(e,n.data.length,a),l?.viewProvidersResolver&&l.viewProvidersResolver(l);for(let h=0;h<a;h++){let p=r[h];p.providersResolver&&p.providersResolver(p)}let c=!1,u=!1,d=FD(n,t,a,null);a>0&&(e.directiveToIndex=new Map);for(let h=0;h<a;h++){let p=r[h];if(e.mergedAttrs=Cs(e.mergedAttrs,p.hostAttrs),TR(n,e,t,d,p),MR(d,p,i),s!==null&&s.has(p)){let[_,M]=s.get(p);e.directiveToIndex.set(p.type,[d,_+e.directiveStart,M+e.directiveStart])}else(o===null||!o.has(p))&&e.directiveToIndex.set(p.type,d);p.contentQueries!==null&&(e.flags|=4),(p.hostBindings!==null||p.hostAttrs!==null||p.hostVars!==0)&&(e.flags|=64);let m=p.type.prototype;!c&&(m.ngOnChanges||m.ngOnInit||m.ngDoCheck)&&((n.preOrderHooks??=[]).push(e.index),c=!0),!u&&(m.ngOnChanges||m.ngDoCheck)&&((n.preOrderCheckHooks??=[]).push(e.index),u=!0),d++}wR(n,e,o)}function wR(n,t,e){for(let r=t.directiveStart;r<t.directiveEnd;r++){let i=n.data[r];if(e===null||!e.has(i))NC(0,t,i,r),NC(1,t,i,r),LC(t,r,!1);else{let o=e.get(i);PC(0,t,o,r),PC(1,t,o,r),LC(t,r,!0)}}}function NC(n,t,e,r){let i=n===0?e.inputs:e.outputs;for(let o in i)if(i.hasOwnProperty(o)){let s;n===0?s=t.inputs??={}:s=t.outputs??={},s[o]??=[],s[o].push(r),vE(t,o)}}function PC(n,t,e,r){let i=n===0?e.inputs:e.outputs;for(let o in i)if(i.hasOwnProperty(o)){let s=i[o],a;n===0?a=t.hostDirectiveInputs??={}:a=t.hostDirectiveOutputs??={},a[s]??=[],a[s].push(r,o),vE(t,s)}}function vE(n,t){t==="class"?n.flags|=8:t==="style"&&(n.flags|=16)}function LC(n,t,e){let{attrs:r,inputs:i,hostDirectiveInputs:o}=n;if(r===null||!e&&i===null||e&&o===null||tg(n)){n.initialInputs??=[],n.initialInputs.push(null);return}let s=null,a=0;for(;a<r.length;){let l=r[a];if(l===0){a+=4;continue}else if(l===5){a+=2;continue}else if(typeof l=="number")break;if(!e&&i.hasOwnProperty(l)){let c=i[l];for(let u of c)if(u===t){s??=[],s.push(l,r[a+1]);break}}else if(e&&o.hasOwnProperty(l)){let c=o[l];for(let u=0;u<c.length;u+=2)if(c[u]===t){s??=[],s.push(c[u+1],r[a+1]);break}}a+=2}n.initialInputs??=[],n.initialInputs.push(s)}function TR(n,t,e,r,i){n.data[r]=i;let o=i.factory||(i.factory=bi(i.type,!0)),s=new Eo(o,vr(i),Mt,null);n.blueprint[r]=s,e[r]=s,SR(n,t,r,FD(n,e,i.hostVars,In),i)}function SR(n,t,e,r,i){let o=i.hostBindings;if(o){let s=n.hostBindingOpCodes;s===null&&(s=n.hostBindingOpCodes=[]);let a=~t.index;IR(s)!=a&&s.push(a),s.push(e,r,o)}}function IR(n){let t=n.length;for(;t>0;){let e=n[--t];if(typeof e=="number"&&e<0)return e}return 0}function MR(n,t,e){if(e){if(t.exportAs)for(let r=0;r<t.exportAs.length;r++)e[t.exportAs[r]]=n;vr(t)&&(e[""]=n)}}function xR(n,t,e){n.flags|=1,n.directiveStart=t,n.directiveEnd=t+e,n.providerIndexes=t}function bE(n,t,e,r,i,o,s,a){let l=t[F],c=l.consts,u=an(c,s),d=Ms(l,n,e,r,u);return o&&yE(l,t,d,an(c,a),i),d.mergedAttrs=Cs(d.mergedAttrs,d.attrs),d.attrs!==null&&Qu(d,d.attrs,!1),d.mergedAttrs!==null&&Qu(d,d.mergedAttrs,!0),l.queries!==null&&l.queries.elementStart(l,d),d}function _E(n,t){eD(n,t),Pp(t)&&n.queries.elementEnd(t)}function RR(n,t,e,r,i,o){let s=t.consts,a=an(s,i),l=Ms(t,n,e,r,a);if(l.mergedAttrs=Cs(l.mergedAttrs,l.attrs),o!=null){let c=an(s,o);l.localNames=[];for(let u=0;u<c.length;u+=2)l.localNames.push(c[u],-1)}return l.attrs!==null&&Qu(l,l.attrs,!1),l.mergedAttrs!==null&&Qu(l,l.mergedAttrs,!0),t.queries!==null&&t.queries.elementStart(t,l),l}function pg(n){return DE(n)?Array.isArray(n)||!(n instanceof Map)&&Symbol.iterator in n:!1}function CE(n,t){if(Array.isArray(n))for(let e=0;e<n.length;e++)t(n[e]);else{let e=n[Symbol.iterator](),r;for(;!(r=e.next()).done;)t(r.value)}}function DE(n){return n!==null&&(typeof n=="function"||typeof n=="object")}function EE(n,t,e){return n[t]=e}function wn(n,t,e){if(e===In)return!1;let r=n[t];return Object.is(r,e)?!1:(n[t]=e,!0)}function kR(n,t,e,r){let i=wn(n,t,e);return wn(n,t+1,r)||i}function $u(n,t,e){return function r(i){let o=r.__ngNativeEl__;o!==void 0&&q0(i,o);let s=yr(n)?Dn(n.index,t):t;fg(s,5);let a=t[Ze],l=FC(t,a,e,i),c=r.__ngNextListenerFn__;for(;c;)l=FC(t,a,c,i)&&l,c=c.__ngNextListenerFn__;return l}}function FC(n,t,e,r){let i=N(null);try{return _e(fe.OutputStart,t,e),e(r)!==!1}catch(o){return Yx(n,o),!1}finally{_e(fe.OutputEnd,t,e),N(i)}}function wE(n,t,e,r,i,o,s,a){let l=qa(n),c=!1,u=null;if(!r&&l&&(u=OR(t,e,o,n.index)),u!==null){let d=u.__ngLastListenerFn__||u;d.__ngNextListenerFn__=s,u.__ngLastListenerFn__=s,c=!0}else{let d=Cn(n,e),h=r?r(d):d;Y0(e,h,o,a),r||(a.__ngNativeEl__=d);let p=i.listen(h,o,a);if(!AR(o)){let m=r?_=>r(_n(_[n.index])):n.index;TE(m,t,e,o,a,p,!1)}}return c}function AR(n){return n.startsWith("animation")||n.startsWith("transition")}function OR(n,t,e,r){let i=n.cleanup;if(i!=null)for(let o=0;o<i.length-1;o+=2){let s=i[o];if(s===e&&i[o+1]===r){let a=t[ms],l=i[o+2];return a&&a.length>l?a[l]:null}typeof s=="string"&&(o+=2)}return null}function TE(n,t,e,r,i,o,s){let a=t.firstCreatePass?Hp(t):null,l=$p(e),c=l.length;l.push(i,o),a&&a.push(r,n,c,(c+1)*(s?-1:1))}function BC(n,t,e,r,i,o){let s=t[e],a=t[F],c=a.data[e].outputs[r],d=s[c].subscribe(o);TE(n.index,a,t,i,o,d,!0)}var Am=Symbol("BINDING");function SE(n){return n.debugInfo?.className||n.type.name||null}var Ju=class extends hl{ngModule;constructor(t){super(),this.ngModule=t}resolveComponentFactory(t){let e=Hr(t);return new To(e,this.ngModule)}};function NR(n){return Object.keys(n).map(t=>{let[e,r,i]=n[t],o={propName:e,templateName:t,isSignal:(r&dd.SignalBased)!==0};return i&&(o.transform=i),o})}function PR(n){return Object.keys(n).map(t=>({propName:n[t],templateName:t}))}function LR(n,t,e){let r=t instanceof ke?t:t?.injector;return r&&n.getStandaloneInjector!==null&&(r=n.getStandaloneInjector(r)||r),r?new km(e,r):e}function FR(n){let t=n.get(It,null);if(t===null)throw new S(407,!1);let e=n.get(gE,null),r=n.get(Di,null),i=n.get(Ni,null,{optional:!0});return{rendererFactory:t,sanitizer:e,changeDetectionScheduler:r,ngReflect:!1,tracingService:i}}function BR(n,t){let e=IE(n);return SD(t,e,e==="svg"?Lp:e==="math"?G_:null)}function IE(n){return(n.selectors[0][0]||"div").toLowerCase()}var To=class extends yd{componentDef;ngModule;selector;componentType;ngContentSelectors;isBoundToModule;cachedInputs=null;cachedOutputs=null;get inputs(){return this.cachedInputs??=NR(this.componentDef.inputs),this.cachedInputs}get outputs(){return this.cachedOutputs??=PR(this.componentDef.outputs),this.cachedOutputs}constructor(t,e){super(),this.componentDef=t,this.ngModule=e,this.componentType=t.type,this.selector=mx(t.selectors),this.ngContentSelectors=t.ngContentSelectors??[],this.isBoundToModule=!!e}create(t,e,r,i,o,s){_e(fe.DynamicComponentStart);let a=N(null);try{let l=this.componentDef,c=LR(l,i||this.ngModule,t),u=FR(c),d=u.tracingService;return d&&d.componentCreate?d.componentCreate(SE(l),()=>this.createComponentRef(u,c,e,r,o,s)):this.createComponentRef(u,c,e,r,o,s)}finally{N(a)}}createComponentRef(t,e,r,i,o,s){let a=this.componentDef,l=jR(i,a,s,o),c=t.rendererFactory.createRenderer(null,a),u=i?jx(c,i,a.encapsulation,e):BR(a,c),d=s?.some(jC)||o?.some(m=>typeof m!="function"&&m.bindings.some(jC)),h=rg(null,l,null,512|LD(a),null,null,t,c,e,null,CD(u,e,!0));h[Fe]=u,xu(h);let p=null;try{let m=bE(Fe,h,2,"#host",()=>l.directiveRegistry,!0,0);xD(c,u,m),Ds(u,h),ug(l,h,m),ED(l,m,h),_E(l,m),r!==void 0&&UR(m,this.ngContentSelectors,r),p=Dn(m.index,h),h[Ze]=p[Ze],dg(l,h,null)}catch(m){throw p!==null&&wm(p),wm(h),m}finally{_e(fe.DynamicComponentEnd),Ru()}return new ed(this.componentType,h,!!d)}};function jR(n,t,e,r){let i=n?["ng-version","21.2.13"]:gx(t.selectors[0]),o=null,s=null,a=0;if(e)for(let u of e)a+=u[Am].requiredVars,u.create&&(u.targetIdx=0,(o??=[]).push(u)),u.update&&(u.targetIdx=0,(s??=[]).push(u));if(r)for(let u=0;u<r.length;u++){let d=r[u];if(typeof d!="function")for(let h of d.bindings){a+=h[Am].requiredVars;let p=u+1;h.create&&(h.targetIdx=p,(o??=[]).push(h)),h.update&&(h.targetIdx=p,(s??=[]).push(h))}}let l=[t];if(r)for(let u of r){let d=typeof u=="function"?u:u.type,h=Ep(d);l.push(h)}return ng(0,null,VR(o,s),1,a,l,null,null,null,[i],null)}function VR(n,t){return!n&&!t?null:e=>{if(e&1&&n)for(let r of n)r.create();if(e&2&&t)for(let r of t)r.update()}}function jC(n){let t=n[Am].kind;return t==="input"||t==="twoWay"}var ed=class extends mE{_rootLView;_hasInputBindings;instance;hostView;changeDetectorRef;componentType;location;previousInputValues=null;_tNode;constructor(t,e,r){super(),this._rootLView=e,this._hasInputBindings=r,this._tNode=Eu(e[F],Fe),this.location=Ss(this._tNode,e),this.instance=Dn(this._tNode.index,e)[Ze],this.hostView=this.changeDetectorRef=new Ai(e,void 0),this.componentType=t}setInput(t,e){this._hasInputBindings;let r=this._tNode;if(this.previousInputValues??=new Map,this.previousInputValues.has(t)&&Object.is(this.previousInputValues.get(t),e))return;let i=this._rootLView,o=gd(r,i[F],i,t,e);this.previousInputValues.set(t,e);let s=Dn(r.index,i);fg(s,1)}get injector(){return new Do(this._tNode,this._rootLView)}destroy(){this.hostView.destroy()}onDestroy(t){this.hostView.onDestroy(t)}};function UR(n,t,e){let r=n.projection=[];for(let i=0;i<t.length;i++){let o=e[i];r.push(o!=null&&o.length?Array.from(o):null)}}var at=(()=>{class n{static __NG_ELEMENT_ID__=$R}return n})();function $R(){let n=vt();return ME(n,U())}var Om=class n extends at{_lContainer;_hostTNode;_hostLView;constructor(t,e,r){super(),this._lContainer=t,this._hostTNode=e,this._hostLView=r}get element(){return Ss(this._hostTNode,this._hostLView)}get injector(){return new Do(this._hostTNode,this._hostLView)}get parentInjector(){let t=Zm(this._hostTNode,this._hostLView);if(rD(t)){let e=Wu(t,this._hostLView),r=zu(t),i=e[F].data[r+8];return new Do(i,e)}else return new Do(null,this._hostLView)}clear(){for(;this.length>0;)this.remove(this.length-1)}get(t){let e=VC(this._lContainer);return e!==null&&e[t]||null}get length(){return this._lContainer.length-Ke}createEmbeddedView(t,e,r){let i,o;typeof r=="number"?i=r:r!=null&&(i=r.index,o=r.injector);let s=Xu(this._lContainer,t.ssrId),a=t.createEmbeddedViewImpl(e||{},o,s);return this.insertImpl(a,i,Es(this._hostTNode,s)),a}createComponent(t,e,r,i,o,s,a){let l=t&&!_0(t),c;if(l)c=e;else{let M=e||{};c=M.index,r=M.injector,i=M.projectableNodes,o=M.environmentInjector||M.ngModuleRef,s=M.directives,a=M.bindings}let u=l?t:new To(Hr(t)),d=r||this.parentInjector;if(!o&&u.ngModule==null){let k=(l?d:this.parentInjector).get(ke,null);k&&(o=k)}let h=Hr(u.componentType??{}),p=Xu(this._lContainer,h?.id??null),m=p?.firstChild??null,_=u.create(d,i,m,o,s,a);return this.insertImpl(_.hostView,c,Es(this._hostTNode,p)),_}insert(t,e){return this.insertImpl(t,e,!0)}insertImpl(t,e,r){let i=t._lView;if(K_(i)){let a=this.indexOf(t);if(a!==-1)this.detach(a);else{let l=i[st],c=new n(l,l[Lt],l[st]);c.detach(c.indexOf(t))}}let o=this._adjustIndex(e),s=this._lContainer;return fl(s,i,o,r),t.attachToViewContainerRef(),Sp(hm(s),o,t),t}move(t,e){return this.insert(t,e)}indexOf(t){let e=VC(this._lContainer);return e!==null?e.indexOf(t):-1}remove(t){let e=this._adjustIndex(t,-1),r=il(this._lContainer,e);r&&(za(hm(this._lContainer),e),hd(r[F],r))}detach(t){let e=this._adjustIndex(t,-1),r=il(this._lContainer,e);return r&&za(hm(this._lContainer),e)!=null?new Ai(r):null}_adjustIndex(t,e=0){return t??this.length+e}};function VC(n){return n[Ga]}function hm(n){return n[Ga]||(n[Ga]=[])}function ME(n,t){let e,r=t[n.index];return Kn(r)?e=r:(e=uE(r,t,null,n),t[n.index]=e,ig(t,e)),zR(e,t,n,r),new Om(e,n,t)}function HR(n,t){let e=n[Ae],r=e.createComment(""),i=Cn(t,n),o=e.parentNode(i);return Yu(e,o,r,e.nextSibling(i),!1),r}var zR=qR,WR=()=>!1;function GR(n,t,e){return WR(n,t,e)}function qR(n,t,e,r){if(n[Mi])return;let i;e.type&8?i=_n(r):i=HR(t,e),n[Mi]=i}var Nm=class n{queryList;matches=null;constructor(t){this.queryList=t}clone(){return new n(this.queryList)}setDirty(){this.queryList.setDirty()}},Pm=class n{queries;constructor(t=[]){this.queries=t}createEmbeddedView(t){let e=t.queries;if(e!==null){let r=t.contentQueries!==null?t.contentQueries[0]:e.length,i=[];for(let o=0;o<r;o++){let s=e.getByIndex(o),a=this.queries[s.indexInDeclarationView];i.push(a.clone())}return new n(i)}return null}insertView(t){this.dirtyQueriesWithMatches(t)}detachView(t){this.dirtyQueriesWithMatches(t)}finishViewCreation(t){this.dirtyQueriesWithMatches(t)}dirtyQueriesWithMatches(t){for(let e=0;e<this.queries.length;e++)mg(t,e).matches!==null&&this.queries[e].setDirty()}},td=class{flags;read;predicate;constructor(t,e,r=null){this.flags=e,this.read=r,typeof t=="string"?this.predicate=tk(t):this.predicate=t}},Lm=class n{queries;constructor(t=[]){this.queries=t}elementStart(t,e){for(let r=0;r<this.queries.length;r++)this.queries[r].elementStart(t,e)}elementEnd(t){for(let e=0;e<this.queries.length;e++)this.queries[e].elementEnd(t)}embeddedTView(t){let e=null;for(let r=0;r<this.length;r++){let i=e!==null?e.length:0,o=this.getByIndex(r).embeddedTView(t,i);o&&(o.indexInDeclarationView=r,e!==null?e.push(o):e=[o])}return e!==null?new n(e):null}template(t,e){for(let r=0;r<this.queries.length;r++)this.queries[r].template(t,e)}getByIndex(t){return this.queries[t]}get length(){return this.queries.length}track(t){this.queries.push(t)}},Fm=class n{metadata;matches=null;indexInDeclarationView=-1;crossesNgTemplate=!1;_declarationNodeIndex;_appliesToNextNode=!0;constructor(t,e=-1){this.metadata=t,this._declarationNodeIndex=e}elementStart(t,e){this.isApplyingToNode(e)&&this.matchTNode(t,e)}elementEnd(t){this._declarationNodeIndex===t.index&&(this._appliesToNextNode=!1)}template(t,e){this.elementStart(t,e)}embeddedTView(t,e){return this.isApplyingToNode(t)?(this.crossesNgTemplate=!0,this.addMatch(-t.index,e),new n(this.metadata)):null}isApplyingToNode(t){if(this._appliesToNextNode&&(this.metadata.flags&1)!==1){let e=this._declarationNodeIndex,r=t.parent;for(;r!==null&&r.type&8&&r.index!==e;)r=r.parent;return e===(r!==null?r.index:-1)}return this._appliesToNextNode}matchTNode(t,e){let r=this.metadata.predicate;if(Array.isArray(r))for(let i=0;i<r.length;i++){let o=r[i];this.matchTNodeWithReadOption(t,e,KR(e,o)),this.matchTNodeWithReadOption(t,e,Vu(e,t,o,!1,!1))}else r===bt?e.type&4&&this.matchTNodeWithReadOption(t,e,-1):this.matchTNodeWithReadOption(t,e,Vu(e,t,r,!1,!1))}matchTNodeWithReadOption(t,e,r){if(r!==null){let i=this.metadata.read;if(i!==null)if(i===re||i===at||i===bt&&e.type&4)this.addMatch(e.index,-2);else{let o=Vu(e,t,i,!1,!1);o!==null&&this.addMatch(e.index,o)}else this.addMatch(e.index,r)}}addMatch(t,e){this.matches===null?this.matches=[t,e]:this.matches.push(t,e)}};function KR(n,t){let e=n.localNames;if(e!==null){for(let r=0;r<e.length;r+=2)if(e[r]===t)return e[r+1]}return null}function YR(n,t){return n.type&11?Ss(n,t):n.type&4?hg(n,t):null}function ZR(n,t,e,r){return e===-1?YR(t,n):e===-2?XR(n,t,r):nl(n,n[F],e,t)}function XR(n,t,e){if(e===re)return Ss(t,n);if(e===bt)return hg(t,n);if(e===at)return ME(t,n)}function xE(n,t,e,r){let i=t[gr].queries[r];if(i.matches===null){let o=n.data,s=e.matches,a=[];for(let l=0;s!==null&&l<s.length;l+=2){let c=s[l];if(c<0)a.push(null);else{let u=o[c];a.push(ZR(t,u,s[l+1],e.metadata.read))}}i.matches=a}return i.matches}function Bm(n,t,e,r){let i=n.queries.getByIndex(e),o=i.matches;if(o!==null){let s=xE(n,t,i,e);for(let a=0;a<o.length;a+=2){let l=o[a];if(l>0)r.push(s[a/2]);else{let c=o[a+1],u=t[-l];for(let d=Ke;d<u.length;d++){let h=u[d];h[Si]===h[st]&&Bm(h[F],h,c,r)}if(u[vo]!==null){let d=u[vo];for(let h=0;h<d.length;h++){let p=d[h];Bm(p[F],p,c,r)}}}}}return r}function QR(n,t){return n[gr].queries[t].queryList}function RE(n,t,e){let r=new Xn((e&4)===4);return X_(n,t,r,r.destroy),(t[gr]??=new Pm).queries.push(new Nm(r))-1}function JR(n,t,e){let r=Be();return r.firstCreatePass&&(kE(r,new td(n,t,e),-1),(t&2)===2&&(r.staticViewQueries=!0)),RE(r,U(),t)}function ek(n,t,e,r){let i=Be();if(i.firstCreatePass){let o=vt();kE(i,new td(t,e,r),o.index),nk(i,n),(e&2)===2&&(i.staticContentQueries=!0)}return RE(i,U(),e)}function tk(n){return n.split(",").map(t=>t.trim())}function kE(n,t,e){n.queries===null&&(n.queries=new Lm),n.queries.track(new Fm(t,e))}function nk(n,t){let e=n.contentQueries||(n.contentQueries=[]),r=e.length?e[e.length-1]:-1;t!==r&&e.push(n.queries.length-1,t)}function mg(n,t){return n.queries.getByIndex(t)}function rk(n,t){let e=n[F],r=mg(e,t);return r.crossesNgTemplate?Bm(e,n,t,[]):xE(e,n,r,t)}var Cr=class{},bd=class{};var nd=class extends Cr{ngModuleType;_parent;_bootstrapComponents=[];_r3Injector;instance;destroyCbs=[];componentFactoryResolver=new Ju(this);constructor(t,e,r,i=!0){super(),this.ngModuleType=t,this._parent=e;let o=Dp(t);this._bootstrapComponents=OD(o.bootstrap),this._r3Injector=im(t,e,[{provide:Cr,useValue:this},{provide:hl,useValue:this.componentFactoryResolver},...r],$a(t),new Set(["environment"])),i&&this.resolveInjectorInitializers()}resolveInjectorInitializers(){this._r3Injector.resolveInjectorInitializers(),this.instance=this._r3Injector.get(this.ngModuleType)}get injector(){return this._r3Injector}destroy(){let t=this._r3Injector;!t.destroyed&&t.destroy(),this.destroyCbs.forEach(e=>e()),this.destroyCbs=null}onDestroy(t){this.destroyCbs.push(t)}},rd=class extends bd{moduleType;constructor(t){super(),this.moduleType=t}create(t){return new nd(this.moduleType,t,[])}};var ol=class extends Cr{injector;componentFactoryResolver=new Ju(this);instance=null;constructor(t){super();let e=new uo([...t.providers,{provide:Cr,useValue:this},{provide:hl,useValue:this.componentFactoryResolver}],t.parent||ps(),t.debugName,new Set(["environment"]));this.injector=e,t.runEnvironmentInitializers&&e.resolveInjectorInitializers()}destroy(){this.injector.destroy()}onDestroy(t){this.injector.onDestroy(t)}};function pl(n,t,e=null){return new ol({providers:n,parent:t,debugName:e,runEnvironmentInitializers:!0}).injector}var ik=(()=>{class n{_injector;cachedInjectors=new Map;constructor(e){this._injector=e}getOrCreateStandaloneInjector(e){if(!e.standalone)return null;if(!this.cachedInjectors.has(e)){let r=xp(!1,e.type),i=r.length>0?pl([r],this._injector,""):null;this.cachedInjectors.set(e,i)}return this.cachedInjectors.get(e)}ngOnDestroy(){try{for(let e of this.cachedInjectors.values())e!==null&&e.destroy()}finally{this.cachedInjectors.clear()}}static \u0275prov=y({token:n,providedIn:"environment",factory:()=>new n(z(ke))})}return n})();function oe(n){return al(()=>{let t=AE(n),e=W(g({},t),{decls:n.decls,vars:n.vars,template:n.template,consts:n.consts||null,ngContentSelectors:n.ngContentSelectors,onPush:n.changeDetection===Xm.OnPush,directiveDefs:null,pipeDefs:null,dependencies:t.standalone&&n.dependencies||null,getStandaloneInjector:t.standalone?i=>i.get(ik).getOrCreateStandaloneInjector(e):null,getExternalStyles:null,signals:n.signals??!1,data:n.data||{},encapsulation:n.encapsulation||Qn.Emulated,styles:n.styles||Pt,_:null,schemas:n.schemas||null,tView:null,id:""});t.standalone&&Yr("NgStandalone"),OE(e);let r=n.dependencies;return e.directiveDefs=UC(r,ok),e.pipeDefs=UC(r,k_),e.id=lk(e),e})}function ok(n){return Hr(n)||Ep(n)}function Me(n){return al(()=>({type:n.type,bootstrap:n.bootstrap||Pt,declarations:n.declarations||Pt,imports:n.imports||Pt,exports:n.exports||Pt,transitiveCompileScopes:null,schemas:n.schemas||null,id:n.id||null}))}function sk(n,t){if(n==null)return wi;let e={};for(let r in n)if(n.hasOwnProperty(r)){let i=n[r],o,s,a,l;Array.isArray(i)?(a=i[0],o=i[1],s=i[2]??o,l=i[3]||null):(o=i,s=i,a=dd.None,l=null),e[o]=[r,a,l],t[o]=s}return e}function ak(n){if(n==null)return wi;let t={};for(let e in n)n.hasOwnProperty(e)&&(t[n[e]]=e);return t}function le(n){return al(()=>{let t=AE(n);return OE(t),t})}function xs(n){return{type:n.type,name:n.name,factory:null,pure:n.pure!==!1,standalone:n.standalone??!0,onDestroy:n.type.prototype.ngOnDestroy||null}}function AE(n){let t={};return{type:n.type,providersResolver:null,viewProvidersResolver:null,factory:null,hostBindings:n.hostBindings||null,hostVars:n.hostVars||0,hostAttrs:n.hostAttrs||null,contentQueries:n.contentQueries||null,declaredInputs:t,inputConfig:n.inputs||wi,exportAs:n.exportAs||null,standalone:n.standalone??!0,signals:n.signals===!0,selectors:n.selectors||Pt,viewQuery:n.viewQuery||null,features:n.features||null,setInput:null,resolveHostDirectives:null,hostDirectives:null,controlDef:null,inputs:sk(n.inputs,t),outputs:ak(n.outputs),debugInfo:null}}function OE(n){n.features?.forEach(t=>t(n))}function UC(n,t){return n?()=>{let e=typeof n=="function"?n():n,r=[];for(let i of e){let o=t(i);o!==null&&r.push(o)}return r}:null}function lk(n){let t=0,e=typeof n.consts=="function"?"":n.consts,r=[n.selectors,n.ngContentSelectors,n.hostVars,n.hostAttrs,e,n.vars,n.decls,n.encapsulation,n.standalone,n.signals,n.exportAs,JSON.stringify(n.inputs),JSON.stringify(n.outputs),Object.getOwnPropertyNames(n.type.prototype),!!n.contentQueries,!!n.viewQuery];for(let o of r.join("|"))t=Math.imul(31,t)+o.charCodeAt(0)<<0;return t+=2147483648,"c"+t}function ck(n){return Object.getPrototypeOf(n.prototype).constructor}function jt(n){let t=ck(n.type),e=!0,r=[n];for(;t;){let i;if(vr(n))i=t.\u0275cmp||t.\u0275dir;else{if(t.\u0275cmp)throw new S(903,!1);i=t.\u0275dir}if(i){if(e){r.push(i);let s=n;s.inputs=pm(n.inputs),s.declaredInputs=pm(n.declaredInputs),s.outputs=pm(n.outputs);let a=i.hostBindings;a&&pk(n,a);let l=i.viewQuery,c=i.contentQueries;if(l&&fk(n,l),c&&hk(n,c),uk(n,i),R_(n.outputs,i.outputs),vr(i)&&i.data.animation){let u=n.data;u.animation=(u.animation||[]).concat(i.data.animation)}}let o=i.features;if(o)for(let s=0;s<o.length;s++){let a=o[s];a&&a.ngInherit&&a(n),a===jt&&(e=!1)}}t=Object.getPrototypeOf(t)}dk(r)}function uk(n,t){for(let e in t.inputs){if(!t.inputs.hasOwnProperty(e)||n.inputs.hasOwnProperty(e))continue;let r=t.inputs[e];r!==void 0&&(n.inputs[e]=r,n.declaredInputs[e]=t.declaredInputs[e])}}function dk(n){let t=0,e=null;for(let r=n.length-1;r>=0;r--){let i=n[r];i.hostVars=t+=i.hostVars,i.hostAttrs=Cs(i.hostAttrs,e=Cs(e,i.hostAttrs))}}function pm(n){return n===wi?{}:n===Pt?[]:n}function fk(n,t){let e=n.viewQuery;e?n.viewQuery=(r,i)=>{t(r,i),e(r,i)}:n.viewQuery=t}function hk(n,t){let e=n.contentQueries;e?n.contentQueries=(r,i,o)=>{t(r,i,o),e(r,i,o)}:n.contentQueries=t}function pk(n,t){let e=n.hostBindings;e?n.hostBindings=(r,i)=>{t(r,i),e(r,i)}:n.hostBindings=t}function NE(n,t,e,r,i,o,s,a){if(e.firstCreatePass){n.mergedAttrs=Cs(n.mergedAttrs,n.attrs);let u=n.tView=ng(2,n,i,o,s,e.directiveRegistry,e.pipeRegistry,null,e.schemas,e.consts,null);e.queries!==null&&(e.queries.template(e,n),u.queries=e.queries.embeddedTView(n))}a&&(n.flags|=a),vs(n,!1);let l=gk(e,t,n,r);Au()&&lg(e,t,l,n),Ds(l,t);let c=uE(l,t,l,n);t[r+Fe]=c,ig(t,c),GR(c,n,t)}function mk(n,t,e,r,i,o,s,a,l,c,u){let d=e+Fe,h;return t.firstCreatePass?(h=Ms(t,d,4,s||null,a||null),Wp()&&yE(t,n,h,an(t.consts,c),XD),eD(t,h)):h=t.data[d],NE(h,n,t,e,r,i,o,l),qa(h)&&ug(t,n,h),c!=null&&md(n,h,u),h}function ws(n,t,e,r,i,o,s,a,l,c,u){let d=e+Fe,h;if(t.firstCreatePass){if(h=Ms(t,d,4,s||null,a||null),c!=null){let p=an(t.consts,c);h.localNames=[];for(let m=0;m<p.length;m+=2)h.localNames.push(p[m],-1)}}else h=t.data[d];return NE(h,n,t,e,r,i,o,l),c!=null&&md(n,h,u),h}function Dr(n,t,e,r,i,o,s,a){let l=U(),c=Be(),u=an(c.consts,o);return mk(l,c,n,t,e,r,i,u,void 0,s,a),Dr}function Rs(n,t,e,r,i,o,s,a){let l=U(),c=Be(),u=an(c.consts,o);return ws(l,c,n,t,e,r,i,u,void 0,s,a),Rs}var gk=yk;function yk(n,t,e,r){return Ou(!0),t[Ae].createComment("")}var gg=(()=>{class n{log(e){console.log(e)}warn(e){console.warn(e)}static \u0275fac=function(r){return new(r||n)};static \u0275prov=y({token:n,factory:n.\u0275fac,providedIn:"platform"})}return n})();function ml(n){return typeof n=="function"&&n[ct]!==void 0}var yg=new v("");function ks(n){return!!n&&typeof n.then=="function"}function vg(n){return!!n&&typeof n.subscribe=="function"}var bg=new v("");function _d(n){return Ti([{provide:bg,multi:!0,useValue:n}])}var _g=(()=>{class n{resolve;reject;initialized=!1;done=!1;donePromise=new Promise((e,r)=>{this.resolve=e,this.reject=r});appInits=f(bg,{optional:!0})??[];injector=f(ne);constructor(){}runInitializers(){if(this.initialized)return;let e=[];for(let i of this.appInits){let o=St(this.injector,i);if(ks(o))e.push(o);else if(vg(o)){let s=new Promise((a,l)=>{o.subscribe({complete:a,error:l})});e.push(s)}}let r=()=>{this.done=!0,this.resolve()};Promise.all(e).then(()=>{r()}).catch(i=>{this.reject(i)}),e.length===0&&r(),this.initialized=!0}static \u0275fac=function(r){return new(r||n)};static \u0275prov=y({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})(),Cd=new v("");function PE(){Oh(()=>{let n="";throw new S(600,n)})}function LE(n){return n.isBoundToModule}var vk=10;var ln=(()=>{class n{_runningTick=!1;_destroyed=!1;_destroyListeners=[];_views=[];internalErrorHandler=f(En);afterRenderManager=f(sg);zonelessEnabled=f(Xa);rootEffectScheduler=f(Pu);dirtyFlags=0;tracingSnapshot=null;allTestViews=new Set;autoDetectTestViews=new Set;includeAllTestViews=!1;afterTick=new C;get allViews(){return[...(this.includeAllTestViews?this.allTestViews:this.autoDetectTestViews).keys(),...this._views]}get destroyed(){return this._destroyed}componentTypes=[];components=[];internalPendingTask=f(ki);get isStable(){return this.internalPendingTask.hasPendingTasksObservable.pipe(se(e=>!e))}constructor(){f(Ni,{optional:!0})}whenStable(){let e;return new Promise(r=>{e=this.isStable.subscribe({next:i=>{i&&r()}})}).finally(()=>{e.unsubscribe()})}_injector=f(ke);_rendererFactory=null;get injector(){return this._injector}bootstrap(e,r){return this.bootstrapImpl(e,r)}bootstrapImpl(e,r,i=ne.NULL){return this._injector.get(j).run(()=>{_e(fe.BootstrapComponentStart);let s=e instanceof yd;if(!this._injector.get(_g).done){let m="";throw new S(405,m)}let l;s?l=e:l=this._injector.get(hl).resolveComponentFactory(e),this.componentTypes.push(l.componentType);let c=LE(l)?void 0:this._injector.get(Cr),u=r||l.selector,d=l.create(i,[],u,c),h=d.location.nativeElement,p=d.injector.get(yg,null);return p?.registerApplication(h),d.onDestroy(()=>{this.detachView(d.hostView),tl(this.components,d),p?.unregisterApplication(h)}),this._loadComponent(d),_e(fe.BootstrapComponentEnd,d),d})}tick(){this.zonelessEnabled||(this.dirtyFlags|=1),this._tick()}_tick(){_e(fe.ChangeDetectionStart),this.tracingSnapshot!==null?this.tracingSnapshot.run(fd.CHANGE_DETECTION,this.tickImpl):this.tickImpl()}tickImpl=()=>{if(this._runningTick)throw _e(fe.ChangeDetectionEnd),new S(101,!1);let e=N(null);try{this._runningTick=!0,this.synchronize()}finally{this._runningTick=!1,this.tracingSnapshot?.dispose(),this.tracingSnapshot=null,N(e),this.afterTick.next(),_e(fe.ChangeDetectionEnd)}};synchronize(){this._rendererFactory===null&&!this._injector.destroyed&&(this._rendererFactory=this._injector.get(It,null,{optional:!0}));let e=0;for(;this.dirtyFlags!==0&&e++<vk;){_e(fe.ChangeDetectionSyncStart);try{this.synchronizeOnce()}finally{_e(fe.ChangeDetectionSyncEnd)}}}synchronizeOnce(){this.dirtyFlags&16&&(this.dirtyFlags&=-17,this.rootEffectScheduler.flush());let e=!1;if(this.dirtyFlags&7){let r=!!(this.dirtyFlags&1);this.dirtyFlags&=-8,this.dirtyFlags|=8;for(let{_lView:i}of this.allViews){if(!r&&!Ka(i))continue;let o=r&&!this.zonelessEnabled?0:1;sE(i,o),e=!0}if(this.dirtyFlags&=-5,this.syncDirtyFlagsWithViews(),this.dirtyFlags&23)return}e||(this._rendererFactory?.begin?.(),this._rendererFactory?.end?.()),this.dirtyFlags&8&&(this.dirtyFlags&=-9,this.afterRenderManager.execute()),this.syncDirtyFlagsWithViews()}syncDirtyFlagsWithViews(){if(this.allViews.some(({_lView:e})=>Ka(e))){this.dirtyFlags|=2;return}else this.dirtyFlags&=-8}attachView(e){let r=e;this._views.push(r),r.attachToAppRef(this)}detachView(e){let r=e;tl(this._views,r),r.detachFromAppRef()}_loadComponent(e){this.attachView(e.hostView);try{this.tick()}catch(i){this.internalErrorHandler(i)}this.components.push(e),this._injector.get(Cd,[]).forEach(i=>i(e))}ngOnDestroy(){if(!this._destroyed)try{this._destroyListeners.forEach(e=>e()),this._views.slice().forEach(e=>e.destroy())}finally{this._destroyed=!0,this._views=[],this._destroyListeners=[]}}onDestroy(e){return this._destroyListeners.push(e),()=>tl(this._destroyListeners,e)}destroy(){if(this._destroyed)throw new S(406,!1);let e=this._injector;e.destroy&&!e.destroyed&&e.destroy()}get viewCount(){return this._views.length}static \u0275fac=function(r){return new(r||n)};static \u0275prov=y({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})();function tl(n,t){let e=n.indexOf(t);e>-1&&n.splice(e,1)}function Dd(n,t){let e=U(),r=xi();if(wn(e,r,t)){let i=Be(),o=Ya();if(gd(o,i,e,n,t))yr(o)&&ZD(e,o.index);else{let a=Cn(o,e);QD(e[Ae],a,null,o.value,n,t,null)}}return Dd}function ht(n,t,e,r){let i=U(),o=xi();if(wn(i,o,t)){let s=Be(),a=Ya();qx(a,i,n,t,e,r)}return ht}var jm=class{destroy(t){}updateValue(t,e){}swap(t,e){let r=Math.min(t,e),i=Math.max(t,e),o=this.detach(i);if(i-r>1){let s=this.detach(r);this.attach(r,o),this.attach(i,s)}else this.attach(r,o)}move(t,e){this.attach(e,this.detach(t))}};function mm(n,t,e,r,i){return n===e&&Object.is(t,r)?1:Object.is(i(n,t),i(e,r))?-1:0}function bk(n,t,e,r){let i,o,s=0,a=n.length-1,l=void 0;if(Array.isArray(t)){N(r);let c=t.length-1;for(N(null);s<=a&&s<=c;){let u=n.at(s),d=t[s],h=mm(s,u,s,d,e);if(h!==0){h<0&&n.updateValue(s,d),s++;continue}let p=n.at(a),m=t[c],_=mm(a,p,c,m,e);if(_!==0){_<0&&n.updateValue(a,m),a--,c--;continue}let M=e(s,u),k=e(a,p),ae=e(s,d);if(Object.is(ae,k)){let ze=e(c,m);Object.is(ze,M)?(n.swap(s,a),n.updateValue(a,m),c--,a--):n.move(a,s),n.updateValue(s,d),s++;continue}if(i??=new id,o??=HC(n,s,a,e),Vm(n,i,s,ae))n.updateValue(s,d),s++,a++;else if(o.has(ae))i.set(M,n.detach(s)),a--;else{let ze=n.create(s,t[s]);n.attach(s,ze),s++,a++}}for(;s<=c;)$C(n,i,e,s,t[s]),s++}else if(t!=null){N(r);let c=t[Symbol.iterator]();N(null);let u=c.next();for(;!u.done&&s<=a;){let d=n.at(s),h=u.value,p=mm(s,d,s,h,e);if(p!==0)p<0&&n.updateValue(s,h),s++,u=c.next();else{i??=new id,o??=HC(n,s,a,e);let m=e(s,h);if(Vm(n,i,s,m))n.updateValue(s,h),s++,a++,u=c.next();else if(!o.has(m))n.attach(s,n.create(s,h)),s++,a++,u=c.next();else{let _=e(s,d);i.set(_,n.detach(s)),a--}}}for(;!u.done;)$C(n,i,e,n.length,u.value),u=c.next()}for(;s<=a;)n.destroy(n.detach(a--));i?.forEach(c=>{n.destroy(c)})}function Vm(n,t,e,r){return t!==void 0&&t.has(r)?(n.attach(e,t.get(r)),t.delete(r),!0):!1}function $C(n,t,e,r,i){if(Vm(n,t,r,e(r,i)))n.updateValue(r,i);else{let o=n.create(r,i);n.attach(r,o)}}function HC(n,t,e,r){let i=new Set;for(let o=t;o<=e;o++)i.add(r(o,n.at(o)));return i}var id=class{kvMap=new Map;_vMap=void 0;has(t){return this.kvMap.has(t)}delete(t){if(!this.has(t))return!1;let e=this.kvMap.get(t);return this._vMap!==void 0&&this._vMap.has(e)?(this.kvMap.set(t,this._vMap.get(e)),this._vMap.delete(e)):this.kvMap.delete(t),!0}get(t){return this.kvMap.get(t)}set(t,e){if(this.kvMap.has(t)){let r=this.kvMap.get(t);this._vMap===void 0&&(this._vMap=new Map);let i=this._vMap;for(;i.has(r);)r=i.get(r);i.set(r,e)}else this.kvMap.set(t,e)}forEach(t){for(let[e,r]of this.kvMap)if(t(r,e),this._vMap!==void 0){let i=this._vMap;for(;i.has(r);)r=i.get(r),t(r,e)}}};function Xe(n,t,e,r,i,o,s,a){Yr("NgControlFlow");let l=U(),c=Be(),u=an(c.consts,o);return ws(l,c,n,t,e,r,i,u,256,s,a),Cg}function Cg(n,t,e,r,i,o,s,a){Yr("NgControlFlow");let l=U(),c=Be(),u=an(c.consts,o);return ws(l,c,n,t,e,r,i,u,512,s,a),Cg}function Qe(n,t){Yr("NgControlFlow");let e=U(),r=xi(),i=e[r]!==In?e[r]:-1,o=i!==-1?od(e,Fe+i):void 0,s=0;if(wn(e,r,n)){let a=N(null);try{if(o!==void 0&&fE(o,s),n!==-1){let l=Fe+n,c=od(e,l),u=zm(e[F],l),d=pE(c,u,e),h=dl(e,u,t,{dehydratedView:d});fl(c,h,s,Es(u,d))}}finally{N(a)}}else if(o!==void 0){let a=dE(o,s);a!==void 0&&(a[Ze]=t)}}var Um=class{lContainer;$implicit;$index;constructor(t,e,r){this.lContainer=t,this.$implicit=e,this.$index=r}get $count(){return this.lContainer.length-Ke}};function Ed(n,t){return t}var $m=class{hasEmptyBlock;trackByFn;liveCollection;constructor(t,e,r){this.hasEmptyBlock=t,this.trackByFn=e,this.liveCollection=r}};function wd(n,t,e,r,i,o,s,a,l,c,u,d,h){Yr("NgControlFlow");let p=U(),m=Be(),_=l!==void 0,M=U(),k=a?s.bind(M[Ft][Ze]):s,ae=new $m(_,k);M[Fe+n]=ae,ws(p,m,n+1,t,e,r,i,an(m.consts,o),256),_&&ws(p,m,n+2,l,c,u,d,an(m.consts,h),512)}var Hm=class extends jm{lContainer;hostLView;templateTNode;operationsCounter=void 0;needsIndexUpdate=!1;constructor(t,e,r){super(),this.lContainer=t,this.hostLView=e,this.templateTNode=r}get length(){return this.lContainer.length-Ke}at(t){return this.getLView(t)[Ze].$implicit}attach(t,e){let r=e[po];this.needsIndexUpdate||=t!==this.length,fl(this.lContainer,e,t,Es(this.templateTNode,r)),_k(this.lContainer,t)}detach(t){return this.needsIndexUpdate||=t!==this.length-1,Ck(this.lContainer,t),Dk(this.lContainer,t)}create(t,e){let r=Xu(this.lContainer,this.templateTNode.tView.ssrId);return dl(this.hostLView,this.templateTNode,new Um(this.lContainer,e,t),{dehydratedView:r})}destroy(t){hd(t[F],t)}updateValue(t,e){this.getLView(t)[Ze].$implicit=e}reset(){this.needsIndexUpdate=!1}updateIndexes(){if(this.needsIndexUpdate)for(let t=0;t<this.length;t++)this.getLView(t)[Ze].$index=t}getLView(t){return Ek(this.lContainer,t)}};function Td(n){let t=N(null),e=qr();try{let r=U(),i=r[F],o=r[e],s=e+1,a=od(r,s);if(o.liveCollection===void 0){let c=zm(i,s);o.liveCollection=new Hm(a,r,c)}else o.liveCollection.reset();let l=o.liveCollection;if(bk(l,n,o.trackByFn,t),l.updateIndexes(),o.hasEmptyBlock){let c=xi(),u=l.length===0;if(wn(r,c,u)){let d=e+2,h=od(r,d);if(u){let p=zm(i,d),m=pE(h,p,r),_=dl(r,p,void 0,{dehydratedView:m});fl(h,_,0,Es(p,m))}else i.firstUpdatePass&&gR(h),fE(h,0)}}}finally{N(t)}}function od(n,t){return n[t]}function _k(n,t){if(n.length<=Ke)return;let e=Ke+t,r=n[e],i=r?r[Ii]:void 0;if(r&&i&&i.detachedLeaveAnimationFns&&i.detachedLeaveAnimationFns.length>0){let o=r[zr];Tx(o,i),wo.delete(r[Wr]),i.detachedLeaveAnimationFns=void 0}}function Ck(n,t){if(n.length<=Ke)return;let e=Ke+t,r=n[e],i=r?r[Ii]:void 0;i&&i.leave&&i.leave.size>0&&(i.detachedLeaveAnimationFns=[])}function Dk(n,t){return il(n,t)}function Ek(n,t){return dE(n,t)}function zm(n,t){return Eu(n,t)}function Je(n,t,e){let r=U(),i=xi();if(wn(r,i,t)){let o=Be(),s=Ya();Hx(s,r,n,t,r[Ae],e)}return Je}function Wm(n,t,e,r,i){gd(t,n,e,i?"class":"style",r)}function b(n,t,e,r){let i=U(),o=i[F],s=n+Fe,a=o.firstCreatePass?bE(s,i,2,t,XD,Wp(),e,r):o.data[s];if(yr(a)){let l=i[qn].tracingService;if(l&&l.componentCreate){let c=o.data[a.directiveStart+a.componentOffset];return l.componentCreate(SE(c),()=>(zC(n,t,i,a,r),b))}}return zC(n,t,i,a,r),b}function zC(n,t,e,r,i){if(JD(r,e,n,t,FE),qa(r)){let o=e[F];ug(o,e,r),ED(o,r,e)}i!=null&&md(e,r)}function D(){let n=Be(),t=vt(),e=eE(t);return n.firstCreatePass&&_E(n,e),qp(e)&&Kp(),zp(),e.classesWithoutHost!=null&&S0(e)&&Wm(n,e,U(),e.classesWithoutHost,!0),e.stylesWithoutHost!=null&&I0(e)&&Wm(n,e,U(),e.stylesWithoutHost,!1),D}function Ce(n,t,e,r){return b(n,t,e,r),D(),Ce}function Jn(n,t,e,r){let i=U(),o=i[F],s=n+Fe,a=o.firstCreatePass?RR(s,o,2,t,e,r):o.data[s];return JD(a,i,n,t,FE),r!=null&&md(i,a),Jn}function Zr(){let n=vt(),t=eE(n);return qp(t)&&Kp(),zp(),Zr}function Sd(n,t,e,r){return Jn(n,t,e,r),Zr(),Sd}var FE=(n,t,e,r,i)=>(Ou(!0),SD(t[Ae],r,dC()));function Kt(){return U()}function Id(n,t,e){let r=U(),i=xi();if(wn(r,i,t)){let o=Be(),s=Ya();YD(s,r,n,t,r[Ae],e)}return Id}var Qa=void 0;function wk(n){let t=Math.floor(Math.abs(n)),e=n.toString().replace(/^[^.]*\.?/,"").length;return t===1&&e===0?1:5}var Tk=["en",[["a","p"],["AM","PM"]],[["AM","PM"]],[["S","M","T","W","T","F","S"],["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],["Su","Mo","Tu","We","Th","Fr","Sa"]],Qa,[["J","F","M","A","M","J","J","A","S","O","N","D"],["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],["January","February","March","April","May","June","July","August","September","October","November","December"]],Qa,[["B","A"],["BC","AD"],["Before Christ","Anno Domini"]],0,[6,0],["M/d/yy","MMM d, y","MMMM d, y","EEEE, MMMM d, y"],["h:mm\u202Fa","h:mm:ss\u202Fa","h:mm:ss\u202Fa z","h:mm:ss\u202Fa zzzz"],["{1}, {0}",Qa,Qa,Qa],[".",",",";","%","+","-","E","\xD7","\u2030","\u221E","NaN",":"],["#,##0.###","#,##0%","\xA4#,##0.00","#E0"],"USD","$","US Dollar",{},"ltr",wk],gm={};function Yt(n){let t=Sk(n),e=WC(t);if(e)return e;let r=t.split("-")[0];if(e=WC(r),e)return e;if(r==="en")return Tk;throw new S(701,!1)}function WC(n){return n in gm||(gm[n]=$r.ng&&$r.ng.common&&$r.ng.common.locales&&$r.ng.common.locales[n]),gm[n]}var Ye=(function(n){return n[n.LocaleId=0]="LocaleId",n[n.DayPeriodsFormat=1]="DayPeriodsFormat",n[n.DayPeriodsStandalone=2]="DayPeriodsStandalone",n[n.DaysFormat=3]="DaysFormat",n[n.DaysStandalone=4]="DaysStandalone",n[n.MonthsFormat=5]="MonthsFormat",n[n.MonthsStandalone=6]="MonthsStandalone",n[n.Eras=7]="Eras",n[n.FirstDayOfWeek=8]="FirstDayOfWeek",n[n.WeekendRange=9]="WeekendRange",n[n.DateFormat=10]="DateFormat",n[n.TimeFormat=11]="TimeFormat",n[n.DateTimeFormat=12]="DateTimeFormat",n[n.NumberSymbols=13]="NumberSymbols",n[n.NumberFormats=14]="NumberFormats",n[n.CurrencyCode=15]="CurrencyCode",n[n.CurrencySymbol=16]="CurrencySymbol",n[n.CurrencyName=17]="CurrencyName",n[n.Currencies=18]="Currencies",n[n.Directionality=19]="Directionality",n[n.PluralCase=20]="PluralCase",n[n.ExtraData=21]="ExtraData",n})(Ye||{});function Sk(n){return n.toLowerCase().replace(/_/g,"-")}var gl="en-US";var Ik=gl;function BE(n){typeof n=="string"&&(Ik=n.toLowerCase().replace(/_/g,"-"))}function Ee(n,t,e){let r=U(),i=Be(),o=vt();return Mk(i,r,r[Ae],o,n,t,e),Ee}function As(n,t,e){let r=U(),i=Be(),o=vt();return(o.type&3||e)&&wE(o,i,r,e,r[Ae],n,t,$u(o,r,t)),As}function Mk(n,t,e,r,i,o,s){let a=!0,l=null;if((r.type&3||s)&&(l??=$u(r,t,o),wE(r,n,t,s,e,i,o,l)&&(a=!1)),a){let c=r.outputs?.[i],u=r.hostDirectiveOutputs?.[i];if(u&&u.length)for(let d=0;d<u.length;d+=2){let h=u[d],p=u[d+1];l??=$u(r,t,o),BC(r,t,h,p,i,l)}if(c&&c.length)for(let d of c)l??=$u(r,t,o),BC(r,t,d,i,i,l)}}function ce(n=1){return uC(n)}function xk(n,t){let e=null,r=ux(n);for(let i=0;i<t.length;i++){let o=t[i];if(o==="*"){e=i;continue}if(r===null?PD(n,o,!0):hx(r,o))return i}return e}function Er(n){let t=U()[Ft][Lt];if(!t.projection){let e=n?n.length:1,r=t.projection=F_(e,null),i=r.slice(),o=t.child;for(;o!==null;){if(o.type!==128){let s=n?xk(o,n):0;s!==null&&(i[s]?i[s].projectionNext=o:r[s]=o,i[s]=o)}o=o.next}}}function er(n,t=0,e,r,i,o){let s=U(),a=Be(),l=r?n+1:null;l!==null&&ws(s,a,l,r,i,o,null,e);let c=Ms(a,Fe+n,16,null,e||null);c.projection===null&&(c.projection=t),Xp();let d=!s[po]||Gp();s[Ft][Lt].projection[c.projection]===null&&l!==null?Rk(s,a,l):d&&!cd(c)&&Lx(a,s,c)}function Rk(n,t,e){let r=Fe+e,i=t.data[r],o=n[r],s=Xu(o,i.tView.ssrId),a=dl(n,i,void 0,{dehydratedView:s});fl(o,a,0,Es(i,s))}function Xr(n,t,e,r){return ek(n,t,e,r),Xr}function cn(n,t,e){return JR(n,t,e),cn}function xe(n){let t=U(),e=Be(),r=tm();Mu(r+1);let i=mg(e,r);if(n.dirty&&q_(t)===((i.metadata.flags&2)===2)){if(i.matches===null)n.reset([]);else{let o=rk(t,r);n.reset(o,V0),n.notifyOnChanges()}return!0}return!1}function Re(){return QR(U(),tm())}function Os(n){let t=tC();return wu(t,Fe+n)}function Fu(n,t){return n<<17|t<<2}function So(n){return n>>17&32767}function kk(n){return(n&2)==2}function Ak(n,t){return n&131071|t<<17}function Gm(n){return n|2}function Ts(n){return(n&131068)>>2}function ym(n,t){return n&-131069|t<<2}function Ok(n){return(n&1)===1}function qm(n){return n|1}function Nk(n,t,e,r,i,o){let s=o?t.classBindings:t.styleBindings,a=So(s),l=Ts(s);n[r]=e;let c=!1,u;if(Array.isArray(e)){let d=e;u=d[1],(u===null||hs(d,u)>0)&&(c=!0)}else u=e;if(i)if(l!==0){let h=So(n[a+1]);n[r+1]=Fu(h,a),h!==0&&(n[h+1]=ym(n[h+1],r)),n[a+1]=Ak(n[a+1],r)}else n[r+1]=Fu(a,0),a!==0&&(n[a+1]=ym(n[a+1],r)),a=r;else n[r+1]=Fu(l,0),a===0?a=r:n[l+1]=ym(n[l+1],r),l=r;c&&(n[r+1]=Gm(n[r+1])),GC(n,u,r,!0),GC(n,u,r,!1),Pk(t,u,n,r,o),s=Fu(a,l),o?t.classBindings=s:t.styleBindings=s}function Pk(n,t,e,r,i){let o=i?n.residualClasses:n.residualStyles;o!=null&&typeof t=="string"&&hs(o,t)>=0&&(e[r+1]=qm(e[r+1]))}function GC(n,t,e,r){let i=n[e+1],o=t===null,s=r?So(i):Ts(i),a=!1;for(;s!==0&&(a===!1||o);){let l=n[s],c=n[s+1];Lk(l,t)&&(a=!0,n[s+1]=r?qm(c):Gm(c)),s=r?So(c):Ts(c)}a&&(n[e+1]=r?Gm(i):qm(i))}function Lk(n,t){return n===null||t==null||(Array.isArray(n)?n[1]:n)===t?!0:Array.isArray(n)&&typeof t=="string"?hs(n,t)>=0:!1}var Zn={textEnd:0,key:0,keyEnd:0,value:0,valueEnd:0};function Fk(n){return n.substring(Zn.key,Zn.keyEnd)}function Bk(n){return jk(n),jE(n,VE(n,0,Zn.textEnd))}function jE(n,t){let e=Zn.textEnd;return e===t?-1:(t=Zn.keyEnd=Vk(n,Zn.key=t,e),VE(n,t,e))}function jk(n){Zn.key=0,Zn.keyEnd=0,Zn.value=0,Zn.valueEnd=0,Zn.textEnd=n.length}function VE(n,t,e){for(;t<e&&n.charCodeAt(t)<=32;)t++;return t}function Vk(n,t,e){for(;t<e&&n.charCodeAt(t)>32;)t++;return t}function Ns(n,t,e){return UE(n,t,e,!1),Ns}function je(n,t){return UE(n,t,null,!0),je}function tr(n){$k(Kk,Uk,n,!0)}function Uk(n,t){for(let e=Bk(t);e>=0;e=jE(t,e))_u(n,Fk(t),!0)}function UE(n,t,e,r){let i=U(),o=Be(),s=em(2);if(o.firstUpdatePass&&HE(o,n,s,r),t!==In&&wn(i,s,t)){let a=o.data[qr()];zE(o,a,i,i[Ae],n,i[s+1]=Zk(t,e),r,s)}}function $k(n,t,e,r){let i=Be(),o=em(2);i.firstUpdatePass&&HE(i,null,o,r);let s=U();if(e!==In&&wn(s,o,e)){let a=i.data[qr()];if(WE(a,r)&&!$E(i,o)){let l=r?a.classesWithoutHost:a.stylesWithoutHost;l!==null&&(e=pu(l,e||"")),Wm(i,a,s,e,r)}else Yk(i,a,s,s[Ae],s[o+1],s[o+1]=qk(n,t,e),r,o)}}function $E(n,t){return t>=n.expandoStartIndex}function HE(n,t,e,r){let i=n.data;if(i[e+1]===null){let o=i[qr()],s=$E(n,e);WE(o,r)&&t===null&&!s&&(t=!1),t=Hk(i,o,t,r),Nk(i,o,t,e,s,r)}}function Hk(n,t,e,r){let i=sC(n),o=r?t.residualClasses:t.residualStyles;if(i===null)(r?t.classBindings:t.styleBindings)===0&&(e=vm(null,n,t,e,r),e=sl(e,t.attrs,r),o=null);else{let s=t.directiveStylingLast;if(s===-1||n[s]!==i)if(e=vm(i,n,t,e,r),o===null){let l=zk(n,t,r);l!==void 0&&Array.isArray(l)&&(l=vm(null,n,t,l[1],r),l=sl(l,t.attrs,r),Wk(n,t,r,l))}else o=Gk(n,t,r)}return o!==void 0&&(r?t.residualClasses=o:t.residualStyles=o),e}function zk(n,t,e){let r=e?t.classBindings:t.styleBindings;if(Ts(r)!==0)return n[So(r)]}function Wk(n,t,e,r){let i=e?t.classBindings:t.styleBindings;n[So(i)]=r}function Gk(n,t,e){let r,i=t.directiveEnd;for(let o=1+t.directiveStylingLast;o<i;o++){let s=n[o].hostAttrs;r=sl(r,s,e)}return sl(r,t.attrs,e)}function vm(n,t,e,r,i){let o=null,s=e.directiveEnd,a=e.directiveStylingLast;for(a===-1?a=e.directiveStart:a++;a<s&&(o=t[a],r=sl(r,o.hostAttrs,i),o!==n);)a++;return n!==null&&(e.directiveStylingLast=a),r}function sl(n,t,e){let r=e?1:2,i=-1;if(t!==null)for(let o=0;o<t.length;o++){let s=t[o];typeof s=="number"?i=s:i===r&&(Array.isArray(n)||(n=n===void 0?[]:["",n]),_u(n,s,e?!0:t[++o]))}return n===void 0?null:n}function qk(n,t,e){if(e==null||e==="")return Pt;let r=[],i=ul(e);if(Array.isArray(i))for(let o=0;o<i.length;o++)n(r,i[o],!0);else if(i instanceof Set)for(let o of i)n(r,o,!0);else if(typeof i=="object")for(let o in i)i.hasOwnProperty(o)&&n(r,o,i[o]);else typeof i=="string"&&t(r,i);return r}function Kk(n,t,e){let r=String(t);r!==""&&!r.includes(" ")&&_u(n,r,e)}function Yk(n,t,e,r,i,o,s,a){i===In&&(i=Pt);let l=0,c=0,u=0<i.length?i[0]:null,d=0<o.length?o[0]:null;for(;u!==null||d!==null;){let h=l<i.length?i[l+1]:void 0,p=c<o.length?o[c+1]:void 0,m=null,_;u===d?(l+=2,c+=2,h!==p&&(m=d,_=p)):d===null||u!==null&&u<d?(l+=2,m=u):(c+=2,m=d,_=p),m!==null&&zE(n,t,e,r,m,_,s,a),u=l<i.length?i[l]:null,d=c<o.length?o[c]:null}}function zE(n,t,e,r,i,o,s,a){if(!(t.type&3))return;let l=n.data,c=l[a+1],u=Ok(c)?qC(l,t,e,i,Ts(c),s):void 0;if(!sd(u)){sd(o)||kk(c)&&(o=qC(l,null,e,i,a,s));let d=Fp(qr(),e);Bx(r,s,d,i,o)}}function qC(n,t,e,r,i,o){let s=t===null,a;for(;i>0;){let l=n[i],c=Array.isArray(l),u=c?l[1]:l,d=u===null,h=e[i+1];h===In&&(h=d?Pt:void 0);let p=d?Cu(h,r):u===r?h:void 0;if(c&&!sd(p)&&(p=Cu(l,r)),sd(p)&&(a=p,s))return a;let m=n[i+1];i=s?So(m):Ts(m)}if(t!==null){let l=o?t.residualClasses:t.residualStyles;l!=null&&(a=Cu(l,r))}return a}function sd(n){return n!==void 0}function Zk(n,t){return n==null||n===""||(typeof t=="string"?n=n+t:typeof n=="object"&&(n=$a(ul(n)))),n}function WE(n,t){return(n.flags&(t?8:16))!==0}function A(n,t=""){let e=U(),r=Be(),i=n+Fe,o=r.firstCreatePass?Ms(r,i,1,t,null):r.data[i],s=Xk(r,e,o,t);e[i]=s,Au()&&lg(r,e,s,o),vs(o,!1)}var Xk=(n,t,e,r)=>(Ou(!0),J0(t[Ae],r));function GE(n,t,e,r=""){return wn(n,xi(),e)?t+yu(e)+r:In}function Zt(n){return lt("",n),Zt}function lt(n,t,e){let r=U(),i=GE(r,n,t,e);return i!==In&&Qk(r,qr(),i),lt}function Qk(n,t,e){let r=Fp(t,n);ex(n[Ae],r,e)}function Dg(n,t,e=""){return GE(U(),n,t,e)}function KC(n,t,e){let r=Be();r.firstCreatePass&&qE(t,r.data,r.blueprint,vr(n),e)}function qE(n,t,e,r,i){if(n=yt(n),Array.isArray(n))for(let o=0;o<n.length;o++)qE(n[o],t,e,r,i);else{let o=Be(),s=U(),a=vt(),l=co(n)?n:yt(n.provide),c=kp(n),u=a.providerIndexes&1048575,d=a.directiveStart,h=a.providerIndexes>>20;if(co(n)||!n.multi){let p=new Eo(c,i,Mt,null),m=_m(l,t,i?u:u+h,d);m===-1?(Dm(qu(a,s),o,l),bm(o,n,t.length),t.push(l),a.directiveStart++,a.directiveEnd++,i&&(a.providerIndexes+=1048576),e.push(p),s.push(p)):(e[m]=p,s[m]=p)}else{let p=_m(l,t,u+h,d),m=_m(l,t,u,u+h),_=p>=0&&e[p],M=m>=0&&e[m];if(i&&!M||!i&&!_){Dm(qu(a,s),o,l);let k=tA(i?eA:Jk,e.length,i,r,c,n);!i&&M&&(e[m].providerFactory=k),bm(o,n,t.length,0),t.push(l),a.directiveStart++,a.directiveEnd++,i&&(a.providerIndexes+=1048576),e.push(k),s.push(k)}else{let k=KE(e[i?m:p],c,!i&&r);bm(o,n,p>-1?p:m,k)}!i&&r&&M&&e[m].componentProviders++}}}function bm(n,t,e,r){let i=co(t),o=H_(t);if(i||o){let l=(o?yt(t.useClass):t).prototype.ngOnDestroy;if(l){let c=n.destroyHooks||(n.destroyHooks=[]);if(!i&&t.multi){let u=c.indexOf(e);u===-1?c.push(e,[r,l]):c[u+1].push(r,l)}else c.push(e,l)}}}function KE(n,t,e){return e&&n.componentProviders++,n.multi.push(t)-1}function _m(n,t,e,r){for(let i=e;i<r;i++)if(t[i]===n)return i;return-1}function Jk(n,t,e,r,i){return Km(this.multi,[])}function eA(n,t,e,r,i){let o=this.multi,s;if(this.providerFactory){let a=this.providerFactory.componentProviders,l=nl(r,r[F],this.providerFactory.index,i);s=l.slice(0,a),Km(o,s);for(let c=a;c<l.length;c++)s.push(l[c])}else s=[],Km(o,s);return s}function Km(n,t){for(let e=0;e<n.length;e++){let r=n[e];t.push(r())}return t}function tA(n,t,e,r,i,o){let s=new Eo(n,e,Mt,null);return s.multi=[],s.index=t,s.componentProviders=0,KE(s,i,r&&!e),s}function Mn(n,t){return e=>{e.providersResolver=(r,i)=>KC(r,i?i(n):n,!1),t&&(e.viewProvidersResolver=(r,i)=>KC(r,i?i(t):t,!0))}}function YE(n,t){let e=n[t];return e===In?void 0:e}function nA(n,t,e,r,i,o){let s=t+e;return wn(n,s,i)?EE(n,s+1,o?r.call(o,i):r(i)):YE(n,s+1)}function rA(n,t,e,r,i,o,s){let a=t+e;return kR(n,a,i,o)?EE(n,a+2,s?r.call(s,i,o):r(i,o)):YE(n,a+2)}function Qr(n,t){let e=Be(),r,i=n+Fe;e.firstCreatePass?(r=iA(t,e.pipeRegistry),e.data[i]=r,r.onDestroy&&(e.destroyHooks??=[]).push(i,r.onDestroy)):r=e.data[i];let o=r.factory||(r.factory=bi(r.type,!0)),s,a=Nt(Mt);try{let l=Gu(!1),c=o();return Gu(l),Bp(e,U(),i,c),c}finally{Nt(a)}}function iA(n,t){if(t)for(let e=t.length-1;e>=0;e--){let r=t[e];if(n===r.name)return r}}function Mo(n,t,e){let r=n+Fe,i=U(),o=wu(i,r);return ZE(i,r)?nA(i,Jp(),t,o.transform,e,o):o.transform(e)}function Md(n,t,e,r){let i=n+Fe,o=U(),s=wu(o,i);return ZE(o,i)?rA(o,Jp(),t,s.transform,e,r,s):s.transform(e,r)}function ZE(n,t){return n[F].data[t].pure}var ad=class{ngModuleFactory;componentFactories;constructor(t,e){this.ngModuleFactory=t,this.componentFactories=e}},Eg=(()=>{class n{compileModuleSync(e){return new rd(e)}compileModuleAsync(e){return Promise.resolve(this.compileModuleSync(e))}compileModuleAndAllComponentsSync(e){let r=this.compileModuleSync(e),i=Dp(e),o=OD(i.declarations).reduce((s,a)=>{let l=Hr(a);return l&&s.push(new To(l)),s},[]);return new ad(r,o)}compileModuleAndAllComponentsAsync(e){return Promise.resolve(this.compileModuleAndAllComponentsSync(e))}clearCache(){}clearCacheFor(e){}getModuleId(e){}static \u0275fac=function(r){return new(r||n)};static \u0275prov=y({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})();var XE=(()=>{class n{applicationErrorHandler=f(En);appRef=f(ln);taskService=f(ki);ngZone=f(j);zonelessEnabled=f(Xa);tracing=f(Ni,{optional:!0});zoneIsDefined=typeof Zone<"u"&&!!Zone.root.run;schedulerTickApplyArgs=[{data:{__scheduler_tick__:!0}}];subscriptions=new H;angularZoneId=this.zoneIsDefined?this.ngZone._inner?.get(Va):null;scheduleInRootZone=!this.zonelessEnabled&&this.zoneIsDefined&&(f(cm,{optional:!0})??!1);cancelScheduledCallback=null;useMicrotaskScheduler=!1;runningTick=!1;pendingRenderTaskId=null;constructor(){this.subscriptions.add(this.appRef.afterTick.subscribe(()=>{let e=this.taskService.add();if(!this.runningTick&&(this.cleanup(),!this.zonelessEnabled||this.appRef.includeAllTestViews)){this.taskService.remove(e);return}this.switchToMicrotaskScheduler(),this.taskService.remove(e)})),this.subscriptions.add(this.ngZone.onUnstable.subscribe(()=>{this.runningTick||this.cleanup()}))}switchToMicrotaskScheduler(){this.ngZone.runOutsideAngular(()=>{let e=this.taskService.add();this.useMicrotaskScheduler=!0,queueMicrotask(()=>{this.useMicrotaskScheduler=!1,this.taskService.remove(e)})})}notify(e){if(!this.zonelessEnabled&&e===5)return;switch(e){case 0:{this.appRef.dirtyFlags|=2;break}case 3:case 2:case 4:case 5:case 1:{this.appRef.dirtyFlags|=4;break}case 6:{this.appRef.dirtyFlags|=2;break}case 12:{this.appRef.dirtyFlags|=16;break}case 13:{this.appRef.dirtyFlags|=2;break}case 11:break;default:this.appRef.dirtyFlags|=8}if(this.appRef.tracingSnapshot=this.tracing?.snapshot(this.appRef.tracingSnapshot)??null,!this.shouldScheduleTick())return;let r=this.useMicrotaskScheduler?mC:om;this.pendingRenderTaskId=this.taskService.add(),this.scheduleInRootZone?this.cancelScheduledCallback=Zone.root.run(()=>r(()=>this.tick())):this.cancelScheduledCallback=this.ngZone.runOutsideAngular(()=>r(()=>this.tick()))}shouldScheduleTick(){return!(this.appRef.destroyed||this.pendingRenderTaskId!==null||this.runningTick||this.appRef._runningTick||!this.zonelessEnabled&&this.zoneIsDefined&&Zone.current.get(Va+this.angularZoneId))}tick(){if(this.runningTick||this.appRef.destroyed)return;if(this.appRef.dirtyFlags===0){this.cleanup();return}!this.zonelessEnabled&&this.appRef.dirtyFlags&7&&(this.appRef.dirtyFlags|=1);let e=this.taskService.add();try{this.ngZone.run(()=>{this.runningTick=!0,this.appRef._tick()},void 0,this.schedulerTickApplyArgs)}catch(r){this.applicationErrorHandler(r)}finally{this.taskService.remove(e),this.cleanup()}}ngOnDestroy(){this.subscriptions.unsubscribe(),this.cleanup()}cleanup(){if(this.runningTick=!1,this.cancelScheduledCallback?.(),this.cancelScheduledCallback=null,this.pendingRenderTaskId!==null){let e=this.pendingRenderTaskId;this.pendingRenderTaskId=null,this.taskService.remove(e)}}static \u0275fac=function(r){return new(r||n)};static \u0275prov=y({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})();function wg(){return Yr("NgZoneless"),Ti([...Tg(),[]])}function Tg(){return[{provide:Di,useExisting:XE},{provide:j,useClass:Ua},{provide:Xa,useValue:!0}]}function oA(){return typeof $localize<"u"&&$localize.locale||gl}var Ps=new v("",{factory:()=>f(Ps,{optional:!0,skipSelf:!0})||oA()});var xd=class{destroyed=!1;listeners=null;errorHandler=f(vn,{optional:!0});destroyRef=f(tt);constructor(){this.destroyRef.onDestroy(()=>{this.destroyed=!0,this.listeners=null})}subscribe(t){if(this.destroyed)throw new S(953,!1);return(this.listeners??=[]).push(t),{unsubscribe:()=>{let e=this.listeners?.indexOf(t);e!==void 0&&e!==-1&&this.listeners?.splice(e,1)}}}emit(t){if(this.destroyed){console.warn(Ei(953,!1));return}if(this.listeners===null)return;let e=N(null);try{for(let r of this.listeners)try{r(t)}catch(i){this.errorHandler?.handleError(i)}}finally{N(e)}}};function $e(n){return T_(n)}function nt(n,t){return Sc(n,t?.equal)}var sA=n=>n;function Sg(n,t){if(typeof n=="function"){let e=np(n,sA,t?.equal);return QE(e,t?.debugName)}else{let e=np(n.source,n.computation,n.equal);return QE(e,n.debugName)}}function QE(n,t){let e=n[ct],r=n;return r.set=i=>E_(e,i),r.update=i=>w_(e,i),r.asReadonly=Nu.bind(n),r}var nw=Symbol("InputSignalNode#UNSET"),vA=W(g({},Mc),{transformFn:void 0,applyValueToInputSignal(n,t){to(n,t)}});function rw(n,t){let e=Object.create(vA);e.value=n,e.transformFn=t?.transform;function r(){if(Xi(e),e.value===nw){let i=null;throw new S(-950,i)}return e.value}return r[ct]=e,r}var vl=class{attributeName;constructor(t){this.attributeName=t}__NG_ELEMENT_ID__=()=>ll(this.attributeName);toString(){return`HostAttributeToken ${this.attributeName}`}};function Ad(n){return new xd}function JE(n,t){return rw(n,t)}function bA(n){return rw(nw,n)}var wr=(JE.required=bA,JE);var Ig=new v(""),_A=new v("");function yl(n){return!n.moduleRef}function CA(n){let t=yl(n)?n.r3Injector:n.moduleRef.injector,e=t.get(j);return e.run(()=>{yl(n)?n.r3Injector.resolveInjectorInitializers():n.moduleRef.resolveInjectorInitializers();let r=t.get(En),i;if(e.runOutsideAngular(()=>{i=e.onError.subscribe({next:r})}),yl(n)){let o=()=>t.destroy(),s=n.platformInjector.get(Ig);s.add(o),t.onDestroy(()=>{i.unsubscribe(),s.delete(o)})}else{let o=()=>n.moduleRef.destroy(),s=n.platformInjector.get(Ig);s.add(o),n.moduleRef.onDestroy(()=>{tl(n.allPlatformModules,n.moduleRef),i.unsubscribe(),s.delete(o)})}return EA(r,e,()=>{let o=t.get(ki),s=o.add(),a=t.get(_g);return a.runInitializers(),a.donePromise.then(()=>{let l=t.get(Ps,gl);if(BE(l||gl),!t.get(_A,!0))return yl(n)?t.get(ln):(n.allPlatformModules.push(n.moduleRef),n.moduleRef);if(yl(n)){let u=t.get(ln);return n.rootComponent!==void 0&&u.bootstrap(n.rootComponent),u}else return DA?.(n.moduleRef,n.allPlatformModules),n.moduleRef}).finally(()=>{o.remove(s)})})})}var DA;function EA(n,t,e){try{let r=e();return ks(r)?r.catch(i=>{throw t.runOutsideAngular(()=>n(i)),i}):r}catch(r){throw t.runOutsideAngular(()=>n(r)),r}}var Rd=null;function wA(n=[],t){return ne.create({name:t,providers:[{provide:Wa,useValue:"platform"},{provide:Ig,useValue:new Set([()=>Rd=null])},...n]})}function TA(n=[]){if(Rd)return Rd;let t=wA(n);return Rd=t,PE(),SA(t),t}function SA(n){let t=n.get(ld,null);St(n,()=>{t?.forEach(e=>e())})}var IA=1e4;var Kq=IA-1e3;var xt=(()=>{class n{static __NG_ELEMENT_ID__=MA}return n})();function MA(n){return xA(vt(),U(),(n&16)===16)}function xA(n,t,e){if(yr(n)&&!e){let r=Dn(n.index,t);return new Ai(r,r)}else if(n.type&175){let r=t[Ft];return new Ai(r,t)}return null}var Mg=class{supports(t){return pg(t)}create(t){return new xg(t)}},RA=(n,t)=>t,xg=class{length=0;collection;_linkedRecords=null;_unlinkedRecords=null;_previousItHead=null;_itHead=null;_itTail=null;_additionsHead=null;_additionsTail=null;_movesHead=null;_movesTail=null;_removalsHead=null;_removalsTail=null;_identityChangesHead=null;_identityChangesTail=null;_trackByFn;constructor(t){this._trackByFn=t||RA}forEachItem(t){let e;for(e=this._itHead;e!==null;e=e._next)t(e)}forEachOperation(t){let e=this._itHead,r=this._removalsHead,i=0,o=null;for(;e||r;){let s=!r||e&&e.currentIndex<ew(r,i,o)?e:r,a=ew(s,i,o),l=s.currentIndex;if(s===r)i--,r=r._nextRemoved;else if(e=e._next,s.previousIndex==null)i++;else{o||(o=[]);let c=a-i,u=l-i;if(c!=u){for(let h=0;h<c;h++){let p=h<o.length?o[h]:o[h]=0,m=p+h;u<=m&&m<c&&(o[h]=p+1)}let d=s.previousIndex;o[d]=u-c}}a!==l&&t(s,a,l)}}forEachPreviousItem(t){let e;for(e=this._previousItHead;e!==null;e=e._nextPrevious)t(e)}forEachAddedItem(t){let e;for(e=this._additionsHead;e!==null;e=e._nextAdded)t(e)}forEachMovedItem(t){let e;for(e=this._movesHead;e!==null;e=e._nextMoved)t(e)}forEachRemovedItem(t){let e;for(e=this._removalsHead;e!==null;e=e._nextRemoved)t(e)}forEachIdentityChange(t){let e;for(e=this._identityChangesHead;e!==null;e=e._nextIdentityChange)t(e)}diff(t){if(t==null&&(t=[]),!pg(t))throw new S(900,!1);return this.check(t)?this:null}onDestroy(){}check(t){this._reset();let e=this._itHead,r=!1,i,o,s;if(Array.isArray(t)){this.length=t.length;for(let a=0;a<this.length;a++)o=t[a],s=this._trackByFn(a,o),e===null||!Object.is(e.trackById,s)?(e=this._mismatch(e,o,s,a),r=!0):(r&&(e=this._verifyReinsertion(e,o,s,a)),Object.is(e.item,o)||this._addIdentityChange(e,o)),e=e._next}else i=0,CE(t,a=>{s=this._trackByFn(i,a),e===null||!Object.is(e.trackById,s)?(e=this._mismatch(e,a,s,i),r=!0):(r&&(e=this._verifyReinsertion(e,a,s,i)),Object.is(e.item,a)||this._addIdentityChange(e,a)),e=e._next,i++}),this.length=i;return this._truncate(e),this.collection=t,this.isDirty}get isDirty(){return this._additionsHead!==null||this._movesHead!==null||this._removalsHead!==null||this._identityChangesHead!==null}_reset(){if(this.isDirty){let t;for(t=this._previousItHead=this._itHead;t!==null;t=t._next)t._nextPrevious=t._next;for(t=this._additionsHead;t!==null;t=t._nextAdded)t.previousIndex=t.currentIndex;for(this._additionsHead=this._additionsTail=null,t=this._movesHead;t!==null;t=t._nextMoved)t.previousIndex=t.currentIndex;this._movesHead=this._movesTail=null,this._removalsHead=this._removalsTail=null,this._identityChangesHead=this._identityChangesTail=null}}_mismatch(t,e,r,i){let o;return t===null?o=this._itTail:(o=t._prev,this._remove(t)),t=this._unlinkedRecords===null?null:this._unlinkedRecords.get(r,null),t!==null?(Object.is(t.item,e)||this._addIdentityChange(t,e),this._reinsertAfter(t,o,i)):(t=this._linkedRecords===null?null:this._linkedRecords.get(r,i),t!==null?(Object.is(t.item,e)||this._addIdentityChange(t,e),this._moveAfter(t,o,i)):t=this._addAfter(new Rg(e,r),o,i)),t}_verifyReinsertion(t,e,r,i){let o=this._unlinkedRecords===null?null:this._unlinkedRecords.get(r,null);return o!==null?t=this._reinsertAfter(o,t._prev,i):t.currentIndex!=i&&(t.currentIndex=i,this._addToMoves(t,i)),t}_truncate(t){for(;t!==null;){let e=t._next;this._addToRemovals(this._unlink(t)),t=e}this._unlinkedRecords!==null&&this._unlinkedRecords.clear(),this._additionsTail!==null&&(this._additionsTail._nextAdded=null),this._movesTail!==null&&(this._movesTail._nextMoved=null),this._itTail!==null&&(this._itTail._next=null),this._removalsTail!==null&&(this._removalsTail._nextRemoved=null),this._identityChangesTail!==null&&(this._identityChangesTail._nextIdentityChange=null)}_reinsertAfter(t,e,r){this._unlinkedRecords!==null&&this._unlinkedRecords.remove(t);let i=t._prevRemoved,o=t._nextRemoved;return i===null?this._removalsHead=o:i._nextRemoved=o,o===null?this._removalsTail=i:o._prevRemoved=i,this._insertAfter(t,e,r),this._addToMoves(t,r),t}_moveAfter(t,e,r){return this._unlink(t),this._insertAfter(t,e,r),this._addToMoves(t,r),t}_addAfter(t,e,r){return this._insertAfter(t,e,r),this._additionsTail===null?this._additionsTail=this._additionsHead=t:this._additionsTail=this._additionsTail._nextAdded=t,t}_insertAfter(t,e,r){let i=e===null?this._itHead:e._next;return t._next=i,t._prev=e,i===null?this._itTail=t:i._prev=t,e===null?this._itHead=t:e._next=t,this._linkedRecords===null&&(this._linkedRecords=new kd),this._linkedRecords.put(t),t.currentIndex=r,t}_remove(t){return this._addToRemovals(this._unlink(t))}_unlink(t){this._linkedRecords!==null&&this._linkedRecords.remove(t);let e=t._prev,r=t._next;return e===null?this._itHead=r:e._next=r,r===null?this._itTail=e:r._prev=e,t}_addToMoves(t,e){return t.previousIndex===e||(this._movesTail===null?this._movesTail=this._movesHead=t:this._movesTail=this._movesTail._nextMoved=t),t}_addToRemovals(t){return this._unlinkedRecords===null&&(this._unlinkedRecords=new kd),this._unlinkedRecords.put(t),t.currentIndex=null,t._nextRemoved=null,this._removalsTail===null?(this._removalsTail=this._removalsHead=t,t._prevRemoved=null):(t._prevRemoved=this._removalsTail,this._removalsTail=this._removalsTail._nextRemoved=t),t}_addIdentityChange(t,e){return t.item=e,this._identityChangesTail===null?this._identityChangesTail=this._identityChangesHead=t:this._identityChangesTail=this._identityChangesTail._nextIdentityChange=t,t}},Rg=class{item;trackById;currentIndex=null;previousIndex=null;_nextPrevious=null;_prev=null;_next=null;_prevDup=null;_nextDup=null;_prevRemoved=null;_nextRemoved=null;_nextAdded=null;_nextMoved=null;_nextIdentityChange=null;constructor(t,e){this.item=t,this.trackById=e}},kg=class{_head=null;_tail=null;add(t){this._head===null?(this._head=this._tail=t,t._nextDup=null,t._prevDup=null):(this._tail._nextDup=t,t._prevDup=this._tail,t._nextDup=null,this._tail=t)}get(t,e){let r;for(r=this._head;r!==null;r=r._nextDup)if((e===null||e<=r.currentIndex)&&Object.is(r.trackById,t))return r;return null}remove(t){let e=t._prevDup,r=t._nextDup;return e===null?this._head=r:e._nextDup=r,r===null?this._tail=e:r._prevDup=e,this._head===null}},kd=class{map=new Map;put(t){let e=t.trackById,r=this.map.get(e);r||(r=new kg,this.map.set(e,r)),r.add(t)}get(t,e){let r=t,i=this.map.get(r);return i?i.get(t,e):null}remove(t){let e=t.trackById;return this.map.get(e).remove(t)&&this.map.delete(e),t}get isEmpty(){return this.map.size===0}clear(){this.map.clear()}};function ew(n,t,e){let r=n.previousIndex;if(r===null)return r;let i=0;return e&&r<e.length&&(i=e[r]),r+t+i}function tw(){return new Od([new Mg])}var Od=(()=>{class n{factories;static \u0275prov=y({token:n,providedIn:"root",factory:tw});constructor(e){this.factories=e}static create(e,r){if(r!=null){let i=r.factories.slice();e=e.concat(i)}return new n(e)}static extend(e){return{provide:n,useFactory:()=>{let r=f(n,{optional:!0,skipSelf:!0});return n.create(e,r||tw())}}}find(e){let r=this.factories.find(i=>i.supports(e));if(r!=null)return r;throw new S(901,!1)}}return n})();function iw(n){let{rootComponent:t,appProviders:e,platformProviders:r,platformRef:i}=n;_e(fe.BootstrapApplicationStart);try{let o=i?.injector??TA(r),s=[Tg(),yC,...e||[]],a=new ol({providers:s,parent:o,debugName:"",runEnvironmentInitializers:!1});return CA({r3Injector:a.injector,platformInjector:o,rootComponent:t})}catch(o){return Promise.reject(o)}finally{_e(fe.BootstrapApplicationEnd)}}function we(n){return typeof n=="boolean"?n:n!=null&&n!=="false"}function Nd(n,t=NaN){return!isNaN(parseFloat(n))&&!isNaN(Number(n))?Number(n):t}function Pd(n,t){let e=Hr(n),r=t.elementInjector||ps();return new To(e).create(r,t.projectableNodes,t.hostElement,t.environmentInjector,t.directives,t.bindings)}var ow=null;function Jr(){return ow}function Ag(n){ow??=n}var bl=class{},Ro=(()=>{class n{historyGo(e){throw new Error("")}static \u0275fac=function(r){return new(r||n)};static \u0275prov=y({token:n,factory:()=>f(sw),providedIn:"platform"})}return n})();var sw=(()=>{class n extends Ro{_location;_history;_doc=f(Z);constructor(){super(),this._location=window.location,this._history=window.history}getBaseHrefFromDOM(){return Jr().getBaseHref(this._doc)}onPopState(e){let r=Jr().getGlobalEventTarget(this._doc,"window");return r.addEventListener("popstate",e,!1),()=>r.removeEventListener("popstate",e)}onHashChange(e){let r=Jr().getGlobalEventTarget(this._doc,"window");return r.addEventListener("hashchange",e,!1),()=>r.removeEventListener("hashchange",e)}get href(){return this._location.href}get protocol(){return this._location.protocol}get hostname(){return this._location.hostname}get port(){return this._location.port}get pathname(){return this._location.pathname}get search(){return this._location.search}get hash(){return this._location.hash}set pathname(e){this._location.pathname=e}pushState(e,r,i){this._history.pushState(e,r,i)}replaceState(e,r,i){this._history.replaceState(e,r,i)}forward(){this._history.forward()}back(){this._history.back()}historyGo(e=0){this._history.go(e)}getState(){return this._history.state}static \u0275fac=function(r){return new(r||n)};static \u0275prov=y({token:n,factory:()=>new n,providedIn:"platform"})}return n})();function Ld(n,t){return n?t?n.endsWith("/")?t.startsWith("/")?n+t.slice(1):n+t:t.startsWith("/")?n+t:`${n}/${t}`:n:t}function aw(n){let t=n.search(/#|\?|$/);return n[t-1]==="/"?n.slice(0,t-1)+n.slice(t):n}function nr(n){return n&&n[0]!=="?"?`?${n}`:n}var Tr=(()=>{class n{historyGo(e){throw new Error("")}static \u0275fac=function(r){return new(r||n)};static \u0275prov=y({token:n,factory:()=>f(cw),providedIn:"root"})}return n})(),Og=new v(""),cw=(()=>{class n extends Tr{_platformLocation;_baseHref;_removeListenerFns=[];constructor(e,r){super(),this._platformLocation=e,this._baseHref=r??this._platformLocation.getBaseHrefFromDOM()??f(Z).location?.origin??""}ngOnDestroy(){for(;this._removeListenerFns.length;)this._removeListenerFns.pop()()}onPopState(e){this._removeListenerFns.push(this._platformLocation.onPopState(e),this._platformLocation.onHashChange(e))}getBaseHref(){return this._baseHref}prepareExternalUrl(e){return Ld(this._baseHref,e)}path(e=!1){let r=this._platformLocation.pathname+nr(this._platformLocation.search),i=this._platformLocation.hash;return i&&e?`${r}${i}`:r}pushState(e,r,i,o){let s=this.prepareExternalUrl(i+nr(o));this._platformLocation.pushState(e,r,s)}replaceState(e,r,i,o){let s=this.prepareExternalUrl(i+nr(o));this._platformLocation.replaceState(e,r,s)}forward(){this._platformLocation.forward()}back(){this._platformLocation.back()}getState(){return this._platformLocation.getState()}historyGo(e=0){this._platformLocation.historyGo?.(e)}static \u0275fac=function(r){return new(r||n)(z(Ro),z(Og,8))};static \u0275prov=y({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})();var ei=(()=>{class n{_subject=new C;_basePath;_locationStrategy;_urlChangeListeners=[];_urlChangeSubscription=null;constructor(e){this._locationStrategy=e;let r=this._locationStrategy.getBaseHref();this._basePath=OA(aw(lw(r))),this._locationStrategy.onPopState(i=>{this._subject.next({url:this.path(!0),pop:!0,state:i.state,type:i.type})})}ngOnDestroy(){this._urlChangeSubscription?.unsubscribe(),this._urlChangeListeners=[]}path(e=!1){return this.normalize(this._locationStrategy.path(e))}getState(){return this._locationStrategy.getState()}isCurrentPathEqualTo(e,r=""){return this.path()==this.normalize(e+nr(r))}normalize(e){return n.stripTrailingSlash(AA(this._basePath,lw(e)))}prepareExternalUrl(e){return e&&e[0]!=="/"&&(e="/"+e),this._locationStrategy.prepareExternalUrl(e)}go(e,r="",i=null){this._locationStrategy.pushState(i,"",e,r),this._notifyUrlChangeListeners(this.prepareExternalUrl(e+nr(r)),i)}replaceState(e,r="",i=null){this._locationStrategy.replaceState(i,"",e,r),this._notifyUrlChangeListeners(this.prepareExternalUrl(e+nr(r)),i)}forward(){this._locationStrategy.forward()}back(){this._locationStrategy.back()}historyGo(e=0){this._locationStrategy.historyGo?.(e)}onUrlChange(e){return this._urlChangeListeners.push(e),this._urlChangeSubscription??=this.subscribe(r=>{this._notifyUrlChangeListeners(r.url,r.state)}),()=>{let r=this._urlChangeListeners.indexOf(e);this._urlChangeListeners.splice(r,1),this._urlChangeListeners.length===0&&(this._urlChangeSubscription?.unsubscribe(),this._urlChangeSubscription=null)}}_notifyUrlChangeListeners(e="",r){this._urlChangeListeners.forEach(i=>i(e,r))}subscribe(e,r,i){return this._subject.subscribe({next:e,error:r??void 0,complete:i??void 0})}static normalizeQueryParams=nr;static joinWithSlash=Ld;static stripTrailingSlash=aw;static \u0275fac=function(r){return new(r||n)(z(Tr))};static \u0275prov=y({token:n,factory:()=>kA(),providedIn:"root"})}return n})();function kA(){return new ei(z(Tr))}function AA(n,t){if(!n||!t.startsWith(n))return t;let e=t.substring(n.length);return e===""||["/",";","?","#"].includes(e[0])?e:t}function lw(n){return n.replace(/\/index.html$/,"")}function OA(n){if(new RegExp("^(https?:)?//").test(n)){let[,e]=n.split(/\/\/[^\/]+/);return e}return n}var jg=(()=>{class n extends Tr{_platformLocation;_baseHref="";_removeListenerFns=[];constructor(e,r){super(),this._platformLocation=e,r!=null&&(this._baseHref=r)}ngOnDestroy(){for(;this._removeListenerFns.length;)this._removeListenerFns.pop()()}onPopState(e){this._removeListenerFns.push(this._platformLocation.onPopState(e),this._platformLocation.onHashChange(e))}getBaseHref(){return this._baseHref}path(e=!1){let r=this._platformLocation.hash??"#";return r.length>0?r.substring(1):r}prepareExternalUrl(e){let r=Ld(this._baseHref,e);return r.length>0?"#"+r:r}pushState(e,r,i,o){let s=this.prepareExternalUrl(i+nr(o))||this._platformLocation.pathname;this._platformLocation.pushState(e,r,s)}replaceState(e,r,i,o){let s=this.prepareExternalUrl(i+nr(o))||this._platformLocation.pathname;this._platformLocation.replaceState(e,r,s)}forward(){this._platformLocation.forward()}back(){this._platformLocation.back()}getState(){return this._platformLocation.getState()}historyGo(e=0){this._platformLocation.historyGo?.(e)}static \u0275fac=function(r){return new(r||n)(z(Ro),z(Og,8))};static \u0275prov=y({token:n,factory:n.\u0275fac})}return n})();var Vg=(function(n){return n[n.Decimal=0]="Decimal",n[n.Percent=1]="Percent",n[n.Currency=2]="Currency",n[n.Scientific=3]="Scientific",n})(Vg||{});var Rt=(function(n){return n[n.Format=0]="Format",n[n.Standalone=1]="Standalone",n})(Rt||{}),Te=(function(n){return n[n.Narrow=0]="Narrow",n[n.Abbreviated=1]="Abbreviated",n[n.Wide=2]="Wide",n[n.Short=3]="Short",n})(Te||{}),Xt=(function(n){return n[n.Short=0]="Short",n[n.Medium=1]="Medium",n[n.Long=2]="Long",n[n.Full=3]="Full",n})(Xt||{}),Qt={Decimal:0,Group:1,List:2,PercentSign:3,PlusSign:4,MinusSign:5,Exponential:6,SuperscriptingExponent:7,PerMille:8,Infinity:9,NaN:10,TimeSeparator:11,CurrencyDecimal:12,CurrencyGroup:13};function fw(n){return Yt(n)[Ye.LocaleId]}function hw(n,t,e){let r=Yt(n),i=[r[Ye.DayPeriodsFormat],r[Ye.DayPeriodsStandalone]],o=xn(i,t);return xn(o,e)}function pw(n,t,e){let r=Yt(n),i=[r[Ye.DaysFormat],r[Ye.DaysStandalone]],o=xn(i,t);return xn(o,e)}function mw(n,t,e){let r=Yt(n),i=[r[Ye.MonthsFormat],r[Ye.MonthsStandalone]],o=xn(i,t);return xn(o,e)}function gw(n,t){let r=Yt(n)[Ye.Eras];return xn(r,t)}function _l(n,t){let e=Yt(n);return xn(e[Ye.DateFormat],t)}function Cl(n,t){let e=Yt(n);return xn(e[Ye.TimeFormat],t)}function Dl(n,t){let r=Yt(n)[Ye.DateTimeFormat];return xn(r,t)}function Sr(n,t){let e=Yt(n),r=e[Ye.NumberSymbols][t];if(typeof r>"u"){if(t===Qt.CurrencyDecimal)return e[Ye.NumberSymbols][Qt.Decimal];if(t===Qt.CurrencyGroup)return e[Ye.NumberSymbols][Qt.Group]}return r}function yw(n,t){return Yt(n)[Ye.NumberFormats][t]}function vw(n){if(!n[Ye.ExtraData])throw new S(2303,!1)}function bw(n){let t=Yt(n);return vw(t),(t[Ye.ExtraData][2]||[]).map(r=>typeof r=="string"?Ng(r):[Ng(r[0]),Ng(r[1])])}function _w(n,t,e){let r=Yt(n);vw(r);let i=[r[Ye.ExtraData][0],r[Ye.ExtraData][1]],o=xn(i,t)||[];return xn(o,e)||[]}function xn(n,t){for(let e=t;e>-1;e--)if(typeof n[e]<"u")return n[e];throw new S(2304,!1)}function Ng(n){let[t,e]=n.split(":");return{hours:+t,minutes:+e}}var NA=/^(\d{4,})-?(\d\d)-?(\d\d)(?:T(\d\d)(?::?(\d\d)(?::?(\d\d)(?:\.(\d+))?)?)?(Z|([+-])(\d\d):?(\d\d))?)?$/,Fd={},PA=/((?:[^BEGHLMOSWYZabcdhmswyz']+)|(?:'(?:[^']|'')*')|(?:G{1,5}|y{1,4}|Y{1,4}|M{1,5}|L{1,5}|w{1,2}|W{1}|d{1,2}|E{1,6}|c{1,6}|a{1,5}|b{1,5}|B{1,5}|h{1,2}|H{1,2}|m{1,2}|s{1,2}|S{1,3}|z{1,4}|Z{1,5}|O{1,4}))([\s\S]*)/;function Cw(n,t,e,r){let i=zA(n);t=ti(e,t)||t;let s=[],a;for(;t;)if(a=PA.exec(t),a){s=s.concat(a.slice(1));let u=s.pop();if(!u)break;t=u}else{s.push(t);break}let l=i.getTimezoneOffset();r&&(l=Ew(r,l),i=HA(i,r));let c="";return s.forEach(u=>{let d=UA(u);c+=d?d(i,e,l):u==="''"?"'":u.replace(/(^'|'$)/g,"").replace(/''/g,"'")}),c}function $d(n,t,e){let r=new Date(0);return r.setFullYear(n,t,e),r.setHours(0,0,0),r}function ti(n,t){let e=fw(n);if(Fd[e]??={},Fd[e][t])return Fd[e][t];let r="";switch(t){case"shortDate":r=_l(n,Xt.Short);break;case"mediumDate":r=_l(n,Xt.Medium);break;case"longDate":r=_l(n,Xt.Long);break;case"fullDate":r=_l(n,Xt.Full);break;case"shortTime":r=Cl(n,Xt.Short);break;case"mediumTime":r=Cl(n,Xt.Medium);break;case"longTime":r=Cl(n,Xt.Long);break;case"fullTime":r=Cl(n,Xt.Full);break;case"short":let i=ti(n,"shortTime"),o=ti(n,"shortDate");r=Bd(Dl(n,Xt.Short),[i,o]);break;case"medium":let s=ti(n,"mediumTime"),a=ti(n,"mediumDate");r=Bd(Dl(n,Xt.Medium),[s,a]);break;case"long":let l=ti(n,"longTime"),c=ti(n,"longDate");r=Bd(Dl(n,Xt.Long),[l,c]);break;case"full":let u=ti(n,"fullTime"),d=ti(n,"fullDate");r=Bd(Dl(n,Xt.Full),[u,d]);break}return r&&(Fd[e][t]=r),r}function Bd(n,t){return t&&(n=n.replace(/\{([^}]+)}/g,function(e,r){return t!=null&&r in t?t[r]:e})),n}function rr(n,t,e="-",r,i){let o="";(n<0||i&&n<=0)&&(i?n=-n+1:(n=-n,o=e));let s=String(n);for(;s.length<t;)s="0"+s;return r&&(s=s.slice(s.length-t)),o+s}function LA(n,t){return rr(n,3).substring(0,t)}function rt(n,t,e=0,r=!1,i=!1){return function(o,s){let a=FA(n,o);if((e>0||a>-e)&&(a+=e),n===3)a===0&&e===-12&&(a=12);else if(n===6)return LA(a,t);let l=Sr(s,Qt.MinusSign);return rr(a,t,l,r,i)}}function FA(n,t){switch(n){case 0:return t.getFullYear();case 1:return t.getMonth();case 2:return t.getDate();case 3:return t.getHours();case 4:return t.getMinutes();case 5:return t.getSeconds();case 6:return t.getMilliseconds();case 7:return t.getDay();default:throw new S(2301,!1)}}function Oe(n,t,e=Rt.Format,r=!1){return function(i,o){return BA(i,o,n,t,e,r)}}function BA(n,t,e,r,i,o){switch(e){case 2:return mw(t,i,r)[n.getMonth()];case 1:return pw(t,i,r)[n.getDay()];case 0:let s=n.getHours(),a=n.getMinutes();if(o){let c=bw(t),u=_w(t,i,r),d=c.findIndex(h=>{if(Array.isArray(h)){let[p,m]=h,_=s>=p.hours&&a>=p.minutes,M=s<m.hours||s===m.hours&&a<m.minutes;if(p.hours<m.hours){if(_&&M)return!0}else if(_||M)return!0}else if(h.hours===s&&h.minutes===a)return!0;return!1});if(d!==-1)return u[d]}return hw(t,i,r)[s<12?0:1];case 3:return gw(t,r)[n.getFullYear()<=0?0:1];default:let l=e;throw new S(2302,!1)}}function jd(n){return function(t,e,r){let i=-1*r,o=Sr(e,Qt.MinusSign),s=i>0?Math.floor(i/60):Math.ceil(i/60);switch(n){case 0:return(i>=0?"+":"")+rr(s,2,o)+rr(Math.abs(i%60),2,o);case 1:return"GMT"+(i>=0?"+":"")+rr(s,1,o);case 2:return"GMT"+(i>=0?"+":"")+rr(s,2,o)+":"+rr(Math.abs(i%60),2,o);case 3:return r===0?"Z":(i>=0?"+":"")+rr(s,2,o)+":"+rr(Math.abs(i%60),2,o);default:throw new S(2310,!1)}}}var jA=0,Ud=4;function VA(n){let t=$d(n,jA,1).getDay();return $d(n,0,1+(t<=Ud?Ud:Ud+7)-t)}function Dw(n){let t=n.getDay(),e=t===0?-3:Ud-t;return $d(n.getFullYear(),n.getMonth(),n.getDate()+e)}function Pg(n,t=!1){return function(e,r){let i;if(t){let o=new Date(e.getFullYear(),e.getMonth(),1).getDay()-1,s=e.getDate();i=1+Math.floor((s+o)/7)}else{let o=Dw(e),s=VA(o.getFullYear()),a=o.getTime()-s.getTime();i=1+Math.round(a/6048e5)}return rr(i,n,Sr(r,Qt.MinusSign))}}function Vd(n,t=!1){return function(e,r){let o=Dw(e).getFullYear();return rr(o,n,Sr(r,Qt.MinusSign),t)}}var Lg={};function UA(n){if(Lg[n])return Lg[n];let t;switch(n){case"G":case"GG":case"GGG":t=Oe(3,Te.Abbreviated);break;case"GGGG":t=Oe(3,Te.Wide);break;case"GGGGG":t=Oe(3,Te.Narrow);break;case"y":t=rt(0,1,0,!1,!0);break;case"yy":t=rt(0,2,0,!0,!0);break;case"yyy":t=rt(0,3,0,!1,!0);break;case"yyyy":t=rt(0,4,0,!1,!0);break;case"Y":t=Vd(1);break;case"YY":t=Vd(2,!0);break;case"YYY":t=Vd(3);break;case"YYYY":t=Vd(4);break;case"M":case"L":t=rt(1,1,1);break;case"MM":case"LL":t=rt(1,2,1);break;case"MMM":t=Oe(2,Te.Abbreviated);break;case"MMMM":t=Oe(2,Te.Wide);break;case"MMMMM":t=Oe(2,Te.Narrow);break;case"LLL":t=Oe(2,Te.Abbreviated,Rt.Standalone);break;case"LLLL":t=Oe(2,Te.Wide,Rt.Standalone);break;case"LLLLL":t=Oe(2,Te.Narrow,Rt.Standalone);break;case"w":t=Pg(1);break;case"ww":t=Pg(2);break;case"W":t=Pg(1,!0);break;case"d":t=rt(2,1);break;case"dd":t=rt(2,2);break;case"c":case"cc":t=rt(7,1);break;case"ccc":t=Oe(1,Te.Abbreviated,Rt.Standalone);break;case"cccc":t=Oe(1,Te.Wide,Rt.Standalone);break;case"ccccc":t=Oe(1,Te.Narrow,Rt.Standalone);break;case"cccccc":t=Oe(1,Te.Short,Rt.Standalone);break;case"E":case"EE":case"EEE":t=Oe(1,Te.Abbreviated);break;case"EEEE":t=Oe(1,Te.Wide);break;case"EEEEE":t=Oe(1,Te.Narrow);break;case"EEEEEE":t=Oe(1,Te.Short);break;case"a":case"aa":case"aaa":t=Oe(0,Te.Abbreviated);break;case"aaaa":t=Oe(0,Te.Wide);break;case"aaaaa":t=Oe(0,Te.Narrow);break;case"b":case"bb":case"bbb":t=Oe(0,Te.Abbreviated,Rt.Standalone,!0);break;case"bbbb":t=Oe(0,Te.Wide,Rt.Standalone,!0);break;case"bbbbb":t=Oe(0,Te.Narrow,Rt.Standalone,!0);break;case"B":case"BB":case"BBB":t=Oe(0,Te.Abbreviated,Rt.Format,!0);break;case"BBBB":t=Oe(0,Te.Wide,Rt.Format,!0);break;case"BBBBB":t=Oe(0,Te.Narrow,Rt.Format,!0);break;case"h":t=rt(3,1,-12);break;case"hh":t=rt(3,2,-12);break;case"H":t=rt(3,1);break;case"HH":t=rt(3,2);break;case"m":t=rt(4,1);break;case"mm":t=rt(4,2);break;case"s":t=rt(5,1);break;case"ss":t=rt(5,2);break;case"S":t=rt(6,1);break;case"SS":t=rt(6,2);break;case"SSS":t=rt(6,3);break;case"Z":case"ZZ":case"ZZZ":t=jd(0);break;case"ZZZZZ":t=jd(3);break;case"O":case"OO":case"OOO":case"z":case"zz":case"zzz":t=jd(1);break;case"OOOO":case"ZZZZ":case"zzzz":t=jd(2);break;default:return null}return Lg[n]=t,t}function Ew(n,t){n=n.replace(/:/g,"");let e=Date.parse("Jan 01, 1970 00:00:00 "+n)/6e4;return isNaN(e)?t:e}function $A(n,t){return n=new Date(n.getTime()),n.setMinutes(n.getMinutes()+t),n}function HA(n,t,e){let i=n.getTimezoneOffset(),o=Ew(t,i);return $A(n,-1*(o-i))}function zA(n){if(uw(n))return n;if(typeof n=="number"&&!isNaN(n))return new Date(n);if(typeof n=="string"){if(n=n.trim(),/^(\d{4}(-\d{1,2}(-\d{1,2})?)?)$/.test(n)){let[i,o=1,s=1]=n.split("-").map(a=>+a);return $d(i,o-1,s)}let e=parseFloat(n);if(!isNaN(n-e))return new Date(e);let r;if(r=n.match(NA))return WA(r)}let t=new Date(n);if(!uw(t))throw new S(2311,!1);return t}function WA(n){let t=new Date(0),e=0,r=0,i=n[8]?t.setUTCFullYear:t.setFullYear,o=n[8]?t.setUTCHours:t.setHours;n[9]&&(e=Number(n[9]+n[10]),r=Number(n[9]+n[11])),i.call(t,Number(n[1]),Number(n[2])-1,Number(n[3]));let s=Number(n[4]||0)-e,a=Number(n[5]||0)-r,l=Number(n[6]||0),c=Math.floor(parseFloat("0."+(n[7]||0))*1e3);return o.call(t,s,a,l,c),t}function uw(n){return n instanceof Date&&!isNaN(n.valueOf())}var GA=/^(\d+)?\.((\d+)(-(\d+))?)?$/,dw=22,Hd=".",El="0",qA=";",KA=",",Fg="#";function YA(n,t,e,r,i,o,s=!1){let a="",l=!1;if(!isFinite(n))a=Sr(e,Qt.Infinity);else{let c=QA(n);s&&(c=XA(c));let u=t.minInt,d=t.minFrac,h=t.maxFrac;if(o){let ae=o.match(GA);if(ae===null)throw new S(2306,!1);let ze=ae[1],Nr=ae[3],Gi=ae[5];ze!=null&&(u=Bg(ze)),Nr!=null&&(d=Bg(Nr)),Gi!=null?h=Bg(Gi):Nr!=null&&d>h&&(h=d)}JA(c,d,h);let p=c.digits,m=c.integerLen,_=c.exponent,M=[];for(l=p.every(ae=>!ae);m<u;m++)p.unshift(0);for(;m<0;m++)p.unshift(0);m>0?M=p.splice(m,p.length):(M=p,p=[0]);let k=[];for(p.length>=t.lgSize&&k.unshift(p.splice(-t.lgSize,p.length).join(""));p.length>t.gSize;)k.unshift(p.splice(-t.gSize,p.length).join(""));p.length&&k.unshift(p.join("")),a=k.join(Sr(e,r)),M.length&&(a+=Sr(e,i)+M.join("")),_&&(a+=Sr(e,Qt.Exponential)+"+"+_)}return n<0&&!l?a=t.negPre+a+t.negSuf:a=t.posPre+a+t.posSuf,a}function ww(n,t,e){let r=yw(t,Vg.Decimal),i=ZA(r,Sr(t,Qt.MinusSign));return YA(n,i,t,Qt.Group,Qt.Decimal,e)}function ZA(n,t="-"){let e={minInt:1,minFrac:0,maxFrac:0,posPre:"",posSuf:"",negPre:"",negSuf:"",gSize:0,lgSize:0},r=n.split(qA),i=r[0],o=r[1],s=i.indexOf(Hd)!==-1?i.split(Hd):[i.substring(0,i.lastIndexOf(El)+1),i.substring(i.lastIndexOf(El)+1)],a=s[0],l=s[1]||"";e.posPre=a.substring(0,a.indexOf(Fg));for(let u=0;u<l.length;u++){let d=l.charAt(u);d===El?e.minFrac=e.maxFrac=u+1:d===Fg?e.maxFrac=u+1:e.posSuf+=d}let c=a.split(KA);if(e.gSize=c[1]?c[1].length:0,e.lgSize=c[2]||c[1]?(c[2]||c[1]).length:0,o){let u=i.length-e.posPre.length-e.posSuf.length,d=o.indexOf(Fg);e.negPre=o.substring(0,d).replace(/'/g,""),e.negSuf=o.slice(d+u).replace(/'/g,"")}else e.negPre=t+e.posPre,e.negSuf=e.posSuf;return e}function XA(n){if(n.digits[0]===0)return n;let t=n.digits.length-n.integerLen;return n.exponent?n.exponent+=2:(t===0?n.digits.push(0,0):t===1&&n.digits.push(0),n.integerLen+=2),n}function QA(n){let t=Math.abs(n)+"",e=0,r,i,o,s,a;for((i=t.indexOf(Hd))>-1&&(t=t.replace(Hd,"")),(o=t.search(/e/i))>0?(i<0&&(i=o),i+=+t.slice(o+1),t=t.substring(0,o)):i<0&&(i=t.length),o=0;t.charAt(o)===El;o++);if(o===(a=t.length))r=[0],i=1;else{for(a--;t.charAt(a)===El;)a--;for(i-=o,r=[],s=0;o<=a;o++,s++)r[s]=Number(t.charAt(o))}return i>dw&&(r=r.splice(0,dw-1),e=i-1,i=1),{digits:r,exponent:e,integerLen:i}}function JA(n,t,e){if(t>e)throw new S(2307,!1);let r=n.digits,i=r.length-n.integerLen,o=Math.min(Math.max(t,i),e),s=o+n.integerLen,a=r[s];if(s>0){r.splice(Math.max(n.integerLen,s));for(let d=s;d<r.length;d++)r[d]=0}else{i=Math.max(0,i),n.integerLen=1,r.length=Math.max(1,s=o+1),r[0]=0;for(let d=1;d<s;d++)r[d]=0}if(a>=5)if(s-1<0){for(let d=0;d>s;d--)r.unshift(0),n.integerLen++;r.unshift(1),n.integerLen++}else r[s-1]++;for(;i<Math.max(0,o);i++)r.push(0);let l=o!==0,c=t+n.integerLen,u=r.reduceRight(function(d,h,p,m){return h=h+d,m[p]=h<10?h:h-10,l&&(m[p]===0&&p>=c?m.pop():l=!1),h>=10?1:0},0);u&&(r.unshift(u),n.integerLen++)}function Bg(n){let t=parseInt(n);if(isNaN(t))throw new S(2305,!1);return t}function Ug(n,t){return new S(2100,!1)}var $g=(()=>{class n{transform(e){return e==null?null:(eO(n,e),e.toUpperCase())}static \u0275fac=function(r){return new(r||n)};static \u0275pipe=xs({name:"uppercase",type:n,pure:!0})}return n})();function eO(n,t){if(typeof t!="string")throw Ug(n,t)}var tO="mediumDate",Tw=new v(""),Sw=new v(""),Hg=(()=>{class n{locale;defaultTimezone;defaultOptions;constructor(e,r,i){this.locale=e,this.defaultTimezone=r,this.defaultOptions=i}transform(e,r,i,o){if(e==null||e===""||e!==e)return null;try{let s=r??this.defaultOptions?.dateFormat??tO,a=i??this.defaultOptions?.timezone??this.defaultTimezone??void 0;return Cw(e,s,o||this.locale,a)}catch(s){throw Ug(n,s.message)}}static \u0275fac=function(r){return new(r||n)(Mt(Ps,16),Mt(Tw,24),Mt(Sw,24))};static \u0275pipe=xs({name:"date",type:n,pure:!0})}return n})();var zg=(()=>{class n{transform(e){return JSON.stringify(e,null,2)}static \u0275fac=function(r){return new(r||n)};static \u0275pipe=xs({name:"json",type:n,pure:!1})}return n})();var Wg=(()=>{class n{_locale;constructor(e){this._locale=e}transform(e,r,i){if(!nO(e))return null;i||=this._locale;try{let o=rO(e);return ww(o,i,r)}catch(o){throw Ug(n,o.message)}}static \u0275fac=function(r){return new(r||n)(Mt(Ps,16))};static \u0275pipe=xs({name:"number",type:n,pure:!0})}return n})();function nO(n){return!(n==null||n===""||n!==n)}function rO(n){if(typeof n=="string"&&!isNaN(Number(n)-parseFloat(n)))return Number(n);if(typeof n!="number")throw new S(2309,!1);return n}var Ls=(()=>{class n{static \u0275fac=function(r){return new(r||n)};static \u0275mod=Me({type:n});static \u0275inj=De({})}return n})();function Gg(n,t){t=encodeURIComponent(t);for(let e of n.split(";")){let r=e.indexOf("="),[i,o]=r==-1?[e,""]:[e.slice(0,r),e.slice(r+1)];if(i.trim()===t)return decodeURIComponent(o)}return null}var wl=class{};var qg="browser";function Iw(n){return n===qg}var Tl=class{_doc;constructor(t){this._doc=t}manager},zd=(()=>{class n extends Tl{constructor(e){super(e)}supports(e){return!0}addEventListener(e,r,i,o){return e.addEventListener(r,i,o),()=>this.removeEventListener(e,r,i,o)}removeEventListener(e,r,i,o){return e.removeEventListener(r,i,o)}static \u0275fac=function(r){return new(r||n)(z(Z))};static \u0275prov=y({token:n,factory:n.\u0275fac})}return n})(),qd=new v(""),Qg=(()=>{class n{_zone;_plugins;_eventNameToPlugin=new Map;constructor(e,r){this._zone=r,e.forEach(s=>{s.manager=this});let i=e.filter(s=>!(s instanceof zd));this._plugins=i.slice().reverse();let o=e.find(s=>s instanceof zd);o&&this._plugins.push(o)}addEventListener(e,r,i,o){return this._findPluginFor(r).addEventListener(e,r,i,o)}getZone(){return this._zone}_findPluginFor(e){let r=this._eventNameToPlugin.get(e);if(r)return r;if(r=this._plugins.find(o=>o.supports(e)),!r)throw new S(5101,!1);return this._eventNameToPlugin.set(e,r),r}static \u0275fac=function(r){return new(r||n)(z(qd),z(j))};static \u0275prov=y({token:n,factory:n.\u0275fac})}return n})(),Yg="ng-app-id";function Mw(n){for(let t of n)t.remove()}function xw(n,t){let e=t.createElement("style");return e.textContent=n,e}function sO(n,t,e,r){let i=n.head?.querySelectorAll(`style[${Yg}="${t}"],link[${Yg}="${t}"]`);if(i)for(let o of i)o.removeAttribute(Yg),o instanceof HTMLLinkElement?r.set(o.href.slice(o.href.lastIndexOf("/")+1),{usage:0,elements:[o]}):o.textContent&&e.set(o.textContent,{usage:0,elements:[o]})}function Xg(n,t){let e=t.createElement("link");return e.setAttribute("rel","stylesheet"),e.setAttribute("href",n),e}var Jg=(()=>{class n{doc;appId;nonce;inline=new Map;external=new Map;hosts=new Set;constructor(e,r,i,o={}){this.doc=e,this.appId=r,this.nonce=i,sO(e,r,this.inline,this.external),this.hosts.add(e.head)}addStyles(e,r){for(let i of e)this.addUsage(i,this.inline,xw);r?.forEach(i=>this.addUsage(i,this.external,Xg))}removeStyles(e,r){for(let i of e)this.removeUsage(i,this.inline);r?.forEach(i=>this.removeUsage(i,this.external))}addUsage(e,r,i){let o=r.get(e);o?o.usage++:r.set(e,{usage:1,elements:[...this.hosts].map(s=>this.addElement(s,i(e,this.doc)))})}removeUsage(e,r){let i=r.get(e);i&&(i.usage--,i.usage<=0&&(Mw(i.elements),r.delete(e)))}ngOnDestroy(){for(let[,{elements:e}]of[...this.inline,...this.external])Mw(e);this.hosts.clear()}addHost(e){this.hosts.add(e);for(let[r,{elements:i}]of this.inline)i.push(this.addElement(e,xw(r,this.doc)));for(let[r,{elements:i}]of this.external)i.push(this.addElement(e,Xg(r,this.doc)))}removeHost(e){this.hosts.delete(e)}addElement(e,r){return this.nonce&&r.setAttribute("nonce",this.nonce),e.appendChild(r)}static \u0275fac=function(r){return new(r||n)(z(Z),z(Oi),z(Is,8),z(Io))};static \u0275prov=y({token:n,factory:n.\u0275fac})}return n})(),Zg={svg:"http://www.w3.org/2000/svg",xhtml:"http://www.w3.org/1999/xhtml",xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace",xmlns:"http://www.w3.org/2000/xmlns/",math:"http://www.w3.org/1998/Math/MathML"},ey=/%COMP%/g;var kw="%COMP%",aO=`_nghost-${kw}`,lO=`_ngcontent-${kw}`,cO=!0,uO=new v("",{factory:()=>cO});function dO(n){return lO.replace(ey,n)}function fO(n){return aO.replace(ey,n)}function Aw(n,t){return t.map(e=>e.replace(ey,n))}var ty=(()=>{class n{eventManager;sharedStylesHost;appId;removeStylesOnCompDestroy;doc;ngZone;nonce;tracingService;rendererByCompId=new Map;defaultRenderer;constructor(e,r,i,o,s,a,l=null,c=null){this.eventManager=e,this.sharedStylesHost=r,this.appId=i,this.removeStylesOnCompDestroy=o,this.doc=s,this.ngZone=a,this.nonce=l,this.tracingService=c,this.defaultRenderer=new Sl(e,s,a,this.tracingService)}createRenderer(e,r){if(!e||!r)return this.defaultRenderer;let i=this.getOrCreateRenderer(e,r);return i instanceof Gd?i.applyToHost(e):i instanceof Il&&i.applyStyles(),i}getOrCreateRenderer(e,r){let i=this.rendererByCompId,o=i.get(r.id);if(!o){let s=this.doc,a=this.ngZone,l=this.eventManager,c=this.sharedStylesHost,u=this.removeStylesOnCompDestroy,d=this.tracingService;switch(r.encapsulation){case Qn.Emulated:o=new Gd(l,c,r,this.appId,u,s,a,d);break;case Qn.ShadowDom:return new Wd(l,e,r,s,a,this.nonce,d,c);case Qn.ExperimentalIsolatedShadowDom:return new Wd(l,e,r,s,a,this.nonce,d);default:o=new Il(l,c,r,u,s,a,d);break}i.set(r.id,o)}return o}ngOnDestroy(){this.rendererByCompId.clear()}componentReplaced(e){this.rendererByCompId.delete(e)}static \u0275fac=function(r){return new(r||n)(z(Qg),z(Jg),z(Oi),z(uO),z(Z),z(j),z(Is),z(Ni,8))};static \u0275prov=y({token:n,factory:n.\u0275fac})}return n})(),Sl=class{eventManager;doc;ngZone;tracingService;data=Object.create(null);throwOnSyntheticProps=!0;constructor(t,e,r,i){this.eventManager=t,this.doc=e,this.ngZone=r,this.tracingService=i}destroy(){}destroyNode=null;createElement(t,e){return e?this.doc.createElementNS(Zg[e]||e,t):this.doc.createElement(t)}createComment(t){return this.doc.createComment(t)}createText(t){return this.doc.createTextNode(t)}appendChild(t,e){(Rw(t)?t.content:t).appendChild(e)}insertBefore(t,e,r){t&&(Rw(t)?t.content:t).insertBefore(e,r)}removeChild(t,e){e.remove()}selectRootElement(t,e){let r=typeof t=="string"?this.doc.querySelector(t):t;if(!r)throw new S(-5104,!1);return e||(r.textContent=""),r}parentNode(t){return t.parentNode}nextSibling(t){return t.nextSibling}setAttribute(t,e,r,i){if(i){e=i+":"+e;let o=Zg[i];o?t.setAttributeNS(o,e,r):t.setAttribute(e,r)}else t.setAttribute(e,r)}removeAttribute(t,e,r){if(r){let i=Zg[r];i?t.removeAttributeNS(i,e):t.removeAttribute(`${r}:${e}`)}else t.removeAttribute(e)}addClass(t,e){t.classList.add(e)}removeClass(t,e){t.classList.remove(e)}setStyle(t,e,r,i){i&(_r.DashCase|_r.Important)?t.style.setProperty(e,r,i&_r.Important?"important":""):t.style[e]=r}removeStyle(t,e,r){r&_r.DashCase?t.style.removeProperty(e):t.style[e]=""}setProperty(t,e,r){t!=null&&(t[e]=r)}setValue(t,e){t.nodeValue=e}listen(t,e,r,i){if(typeof t=="string"&&(t=Jr().getGlobalEventTarget(this.doc,t),!t))throw new S(5102,!1);let o=this.decoratePreventDefault(r);return this.tracingService?.wrapEventListener&&(o=this.tracingService.wrapEventListener(t,e,o)),this.eventManager.addEventListener(t,e,o,i)}decoratePreventDefault(t){return e=>{if(e==="__ngUnwrap__")return t;t(e)===!1&&e.preventDefault()}}};function Rw(n){return n.tagName==="TEMPLATE"&&n.content!==void 0}var Wd=class extends Sl{hostEl;sharedStylesHost;shadowRoot;constructor(t,e,r,i,o,s,a,l){super(t,i,o,a),this.hostEl=e,this.sharedStylesHost=l,this.shadowRoot=e.attachShadow({mode:"open"}),this.sharedStylesHost&&this.sharedStylesHost.addHost(this.shadowRoot);let c=r.styles;c=Aw(r.id,c);for(let d of c){let h=document.createElement("style");s&&h.setAttribute("nonce",s),h.textContent=d,this.shadowRoot.appendChild(h)}let u=r.getExternalStyles?.();if(u)for(let d of u){let h=Xg(d,i);s&&h.setAttribute("nonce",s),this.shadowRoot.appendChild(h)}}nodeOrShadowRoot(t){return t===this.hostEl?this.shadowRoot:t}appendChild(t,e){return super.appendChild(this.nodeOrShadowRoot(t),e)}insertBefore(t,e,r){return super.insertBefore(this.nodeOrShadowRoot(t),e,r)}removeChild(t,e){return super.removeChild(null,e)}parentNode(t){return this.nodeOrShadowRoot(super.parentNode(this.nodeOrShadowRoot(t)))}destroy(){this.sharedStylesHost&&this.sharedStylesHost.removeHost(this.shadowRoot)}},Il=class extends Sl{sharedStylesHost;removeStylesOnCompDestroy;styles;styleUrls;constructor(t,e,r,i,o,s,a,l){super(t,o,s,a),this.sharedStylesHost=e,this.removeStylesOnCompDestroy=i;let c=r.styles;this.styles=l?Aw(l,c):c,this.styleUrls=r.getExternalStyles?.(l)}applyStyles(){this.sharedStylesHost.addStyles(this.styles,this.styleUrls)}destroy(){this.removeStylesOnCompDestroy&&wo.size===0&&this.sharedStylesHost.removeStyles(this.styles,this.styleUrls)}},Gd=class extends Il{contentAttr;hostAttr;constructor(t,e,r,i,o,s,a,l){let c=i+"-"+r.id;super(t,e,r,o,s,a,l,c),this.contentAttr=dO(c),this.hostAttr=fO(c)}applyToHost(t){this.applyStyles(),this.setAttribute(t,this.hostAttr,"")}createElement(t,e){let r=super.createElement(t,e);return super.setAttribute(r,this.contentAttr,""),r}};var Kd=class n extends bl{supportsDOMEvents=!0;static makeCurrent(){Ag(new n)}onAndCancel(t,e,r,i){return t.addEventListener(e,r,i),()=>{t.removeEventListener(e,r,i)}}dispatchEvent(t,e){t.dispatchEvent(e)}remove(t){t.remove()}createElement(t,e){return e=e||this.getDefaultDocument(),e.createElement(t)}createHtmlDocument(){return document.implementation.createHTMLDocument("fakeTitle")}getDefaultDocument(){return document}isElementNode(t){return t.nodeType===Node.ELEMENT_NODE}isShadowRoot(t){return t instanceof DocumentFragment}getGlobalEventTarget(t,e){return e==="window"?window:e==="document"?t:e==="body"?t.body:null}getBaseHref(t){let e=hO();return e==null?null:pO(e)}resetBaseElement(){Ml=null}getUserAgent(){return window.navigator.userAgent}getCookie(t){return Gg(document.cookie,t)}},Ml=null;function hO(){return Ml=Ml||document.head.querySelector("base"),Ml?Ml.getAttribute("href"):null}function pO(n){return new URL(n,document.baseURI).pathname}var mO=(()=>{class n{build(){return new XMLHttpRequest}static \u0275fac=function(r){return new(r||n)};static \u0275prov=y({token:n,factory:n.\u0275fac})}return n})(),Ow=["alt","control","meta","shift"],gO={"\b":"Backspace","	":"Tab","\x7F":"Delete","\x1B":"Escape",Del:"Delete",Esc:"Escape",Left:"ArrowLeft",Right:"ArrowRight",Up:"ArrowUp",Down:"ArrowDown",Menu:"ContextMenu",Scroll:"ScrollLock",Win:"OS"},yO={alt:n=>n.altKey,control:n=>n.ctrlKey,meta:n=>n.metaKey,shift:n=>n.shiftKey},Nw=(()=>{class n extends Tl{constructor(e){super(e)}supports(e){return n.parseEventName(e)!=null}addEventListener(e,r,i,o){let s=n.parseEventName(r),a=n.eventCallback(s.fullKey,i,this.manager.getZone());return this.manager.getZone().runOutsideAngular(()=>Jr().onAndCancel(e,s.domEventName,a,o))}static parseEventName(e){let r=e.toLowerCase().split("."),i=r.shift();if(r.length===0||!(i==="keydown"||i==="keyup"))return null;let o=n._normalizeKey(r.pop()),s="",a=r.indexOf("code");if(a>-1&&(r.splice(a,1),s="code."),Ow.forEach(c=>{let u=r.indexOf(c);u>-1&&(r.splice(u,1),s+=c+".")}),s+=o,r.length!=0||o.length===0)return null;let l={};return l.domEventName=i,l.fullKey=s,l}static matchEventFullKeyCode(e,r){let i=gO[e.key]||e.key,o="";return r.indexOf("code.")>-1&&(i=e.code,o="code."),i==null||!i?!1:(i=i.toLowerCase(),i===" "?i="space":i==="."&&(i="dot"),Ow.forEach(s=>{if(s!==i){let a=yO[s];a(e)&&(o+=s+".")}}),o+=i,o===r)}static eventCallback(e,r,i){return o=>{n.matchEventFullKeyCode(o,e)&&i.runGuarded(()=>r(o))}}static _normalizeKey(e){return e==="esc"?"escape":e}static \u0275fac=function(r){return new(r||n)(z(Z))};static \u0275prov=y({token:n,factory:n.\u0275fac})}return n})();async function ny(n,t,e){let r=g({rootComponent:n},vO(t,e));return iw(r)}function vO(n,t){return{platformRef:t?.platformRef,appProviders:[...EO,...n?.providers??[]],platformProviders:DO}}function bO(){Kd.makeCurrent()}function _O(){return new vn}function CO(){return Qm(document),document}var DO=[{provide:Io,useValue:qg},{provide:ld,useValue:bO,multi:!0},{provide:Z,useFactory:CO}];var EO=[{provide:Wa,useValue:"root"},{provide:vn,useFactory:_O},{provide:qd,useClass:zd,multi:!0},{provide:qd,useClass:Nw,multi:!0},ty,Jg,Qg,{provide:It,useExisting:ty},{provide:wl,useClass:mO},[]];var Pw=(()=>{class n{_doc;constructor(e){this._doc=e}getTitle(){return this._doc.title}setTitle(e){this._doc.title=e||""}static \u0275fac=function(r){return new(r||n)(z(Z))};static \u0275prov=y({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})();var G="primary",$l=Symbol("RouteTitle"),ay=class{params;constructor(t){this.params=t||{}}has(t){return Object.prototype.hasOwnProperty.call(this.params,t)}get(t){if(this.has(t)){let e=this.params[t];return Array.isArray(e)?e[0]:e}return null}getAll(t){if(this.has(t)){let e=this.params[t];return Array.isArray(e)?e:[e]}return[]}get keys(){return Object.keys(this.params)}};function Ao(n){return new ay(n)}function ry(n,t,e){for(let r=0;r<n.length;r++){let i=n[r],o=t[r];if(i[0]===":")e[i.substring(1)]=o;else if(i!==o.path)return!1}return!0}function Hw(n,t,e){let r=e.path.split("/"),i=r.indexOf("**");if(i===-1){if(r.length>n.length||e.pathMatch==="full"&&(t.hasChildren()||r.length<n.length))return null;let l={},c=n.slice(0,r.length);return ry(r,c,l)?{consumed:c,posParams:l}:null}if(i!==r.lastIndexOf("**"))return null;let o=r.slice(0,i),s=r.slice(i+1);if(o.length+s.length>n.length||e.pathMatch==="full"&&t.hasChildren()&&e.path!=="**")return null;let a={};return!ry(o,n.slice(0,o.length),a)||!ry(s,n.slice(n.length-s.length),a)?null:{consumed:n,posParams:a}}function ef(n){return new Promise((t,e)=>{n.pipe(Vr()).subscribe({next:r=>t(r),error:r=>e(r)})})}function TO(n,t){if(n.length!==t.length)return!1;for(let e=0;e<n.length;++e)if(!Ir(n[e],t[e]))return!1;return!0}function Ir(n,t){let e=n?ly(n):void 0,r=t?ly(t):void 0;if(!e||!r||e.length!=r.length)return!1;let i;for(let o=0;o<e.length;o++)if(i=e[o],!zw(n[i],t[i]))return!1;return!0}function ly(n){return[...Object.keys(n),...Object.getOwnPropertySymbols(n)]}function zw(n,t){if(Array.isArray(n)&&Array.isArray(t)){if(n.length!==t.length)return!1;let e=[...n].sort(),r=[...t].sort();return e.every((i,o)=>r[o]===i)}else return n===t}function SO(n){return n.length>0?n[n.length-1]:null}function Po(n){return on(n)?n:ks(n)?qe(Promise.resolve(n)):I(n)}function Ww(n){return on(n)?ef(n):Promise.resolve(n)}var IO={exact:Kw,subset:Yw},Gw={exact:MO,subset:xO,ignored:()=>!0},qw={paths:"exact",fragment:"ignored",matrixParams:"ignored",queryParams:"exact"},cy={paths:"subset",fragment:"ignored",matrixParams:"ignored",queryParams:"subset"};function Lw(n,t,e){return IO[e.paths](n.root,t.root,e.matrixParams)&&Gw[e.queryParams](n.queryParams,t.queryParams)&&!(e.fragment==="exact"&&n.fragment!==t.fragment)}function MO(n,t){return Ir(n,t)}function Kw(n,t,e){if(!ko(n.segments,t.segments)||!Xd(n.segments,t.segments,e)||n.numberOfChildren!==t.numberOfChildren)return!1;for(let r in t.children)if(!n.children[r]||!Kw(n.children[r],t.children[r],e))return!1;return!0}function xO(n,t){return Object.keys(t).length<=Object.keys(n).length&&Object.keys(t).every(e=>zw(n[e],t[e]))}function Yw(n,t,e){return Zw(n,t,t.segments,e)}function Zw(n,t,e,r){if(n.segments.length>e.length){let i=n.segments.slice(0,e.length);return!(!ko(i,e)||t.hasChildren()||!Xd(i,e,r))}else if(n.segments.length===e.length){if(!ko(n.segments,e)||!Xd(n.segments,e,r))return!1;for(let i in t.children)if(!n.children[i]||!Yw(n.children[i],t.children[i],r))return!1;return!0}else{let i=e.slice(0,n.segments.length),o=e.slice(n.segments.length);return!ko(n.segments,i)||!Xd(n.segments,i,r)||!n.children[G]?!1:Zw(n.children[G],t,o,r)}}function Xd(n,t,e){return t.every((r,i)=>Gw[e](n[i].parameters,r.parameters))}var dn=class{root;queryParams;fragment;_queryParamMap;constructor(t=new ve([],{}),e={},r=null){this.root=t,this.queryParams=e,this.fragment=r}get queryParamMap(){return this._queryParamMap??=Ao(this.queryParams),this._queryParamMap}toString(){return AO.serialize(this)}},ve=class{segments;children;parent=null;constructor(t,e){this.segments=t,this.children=e,Object.values(e).forEach(r=>r.parent=this)}hasChildren(){return this.numberOfChildren>0}get numberOfChildren(){return Object.keys(this.children).length}toString(){return Qd(this)}},Pi=class{path;parameters;_parameterMap;constructor(t,e){this.path=t,this.parameters=e}get parameterMap(){return this._parameterMap??=Ao(this.parameters),this._parameterMap}toString(){return Qw(this)}};function RO(n,t){return ko(n,t)&&n.every((e,r)=>Ir(e.parameters,t[r].parameters))}function ko(n,t){return n.length!==t.length?!1:n.every((e,r)=>e.path===t[r].path)}function kO(n,t){let e=[];return Object.entries(n.children).forEach(([r,i])=>{r===G&&(e=e.concat(t(i,r)))}),Object.entries(n.children).forEach(([r,i])=>{r!==G&&(e=e.concat(t(i,r)))}),e}var Ws=(()=>{class n{static \u0275fac=function(r){return new(r||n)};static \u0275prov=y({token:n,factory:()=>new Li,providedIn:"root"})}return n})(),Li=class{parse(t){let e=new dy(t);return new dn(e.parseRootSegment(),e.parseQueryParams(),e.parseFragment())}serialize(t){let e=`/${xl(t.root,!0)}`,r=PO(t.queryParams),i=typeof t.fragment=="string"?`#${OO(t.fragment)}`:"";return`${e}${r}${i}`}},AO=new Li;function Qd(n){return n.segments.map(t=>Qw(t)).join("/")}function xl(n,t){if(!n.hasChildren())return Qd(n);if(t){let e=n.children[G]?xl(n.children[G],!1):"",r=[];return Object.entries(n.children).forEach(([i,o])=>{i!==G&&r.push(`${i}:${xl(o,!1)}`)}),r.length>0?`${e}(${r.join("//")})`:e}else{let e=kO(n,(r,i)=>i===G?[xl(n.children[G],!1)]:[`${i}:${xl(r,!1)}`]);return Object.keys(n.children).length===1&&n.children[G]!=null?`${Qd(n)}/${e[0]}`:`${Qd(n)}/(${e.join("//")})`}}function Xw(n){return encodeURIComponent(n).replace(/%40/g,"@").replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",")}function Yd(n){return Xw(n).replace(/%3B/gi,";")}function OO(n){return encodeURI(n)}function uy(n){return Xw(n).replace(/\(/g,"%28").replace(/\)/g,"%29").replace(/%26/gi,"&")}function Jd(n){return decodeURIComponent(n)}function Fw(n){return Jd(n.replace(/\+/g,"%20"))}function Qw(n){return`${uy(n.path)}${NO(n.parameters)}`}function NO(n){return Object.entries(n).map(([t,e])=>`;${uy(t)}=${uy(e)}`).join("")}function PO(n){let t=Object.entries(n).map(([e,r])=>Array.isArray(r)?r.map(i=>`${Yd(e)}=${Yd(i)}`).join("&"):`${Yd(e)}=${Yd(r)}`).filter(e=>e);return t.length?`?${t.join("&")}`:""}var LO=/^[^\/()?;#]+/;function iy(n){let t=n.match(LO);return t?t[0]:""}var FO=/^[^\/()?;=#]+/;function BO(n){let t=n.match(FO);return t?t[0]:""}var jO=/^[^=?&#]+/;function VO(n){let t=n.match(jO);return t?t[0]:""}var UO=/^[^&#]+/;function $O(n){let t=n.match(UO);return t?t[0]:""}var dy=class{url;remaining;constructor(t){this.url=t,this.remaining=t}parseRootSegment(){for(;this.consumeOptional("/"););return this.remaining===""||this.peekStartsWith("?")||this.peekStartsWith("#")?new ve([],{}):new ve([],this.parseChildren())}parseQueryParams(){let t={};if(this.consumeOptional("?"))do this.parseQueryParam(t);while(this.consumeOptional("&"));return t}parseFragment(){return this.consumeOptional("#")?decodeURIComponent(this.remaining):null}parseChildren(t=0){if(t>50)throw new S(4010,!1);if(this.remaining==="")return{};this.consumeOptional("/");let e=[];for(this.peekStartsWith("(")||e.push(this.parseSegment());this.peekStartsWith("/")&&!this.peekStartsWith("//")&&!this.peekStartsWith("/(");)this.capture("/"),e.push(this.parseSegment());let r={};this.peekStartsWith("/(")&&(this.capture("/"),r=this.parseParens(!0,t));let i={};return this.peekStartsWith("(")&&(i=this.parseParens(!1,t)),(e.length>0||Object.keys(r).length>0)&&(i[G]=new ve(e,r)),i}parseSegment(){let t=iy(this.remaining);if(t===""&&this.peekStartsWith(";"))throw new S(4009,!1);return this.capture(t),new Pi(Jd(t),this.parseMatrixParams())}parseMatrixParams(){let t={};for(;this.consumeOptional(";");)this.parseParam(t);return t}parseParam(t){let e=BO(this.remaining);if(!e)return;this.capture(e);let r="";if(this.consumeOptional("=")){let i=iy(this.remaining);i&&(r=i,this.capture(r))}t[Jd(e)]=Jd(r)}parseQueryParam(t){let e=VO(this.remaining);if(!e)return;this.capture(e);let r="";if(this.consumeOptional("=")){let s=$O(this.remaining);s&&(r=s,this.capture(r))}let i=Fw(e),o=Fw(r);if(t.hasOwnProperty(i)){let s=t[i];Array.isArray(s)||(s=[s],t[i]=s),s.push(o)}else t[i]=o}parseParens(t,e){let r={};for(this.capture("(");!this.consumeOptional(")")&&this.remaining.length>0;){let i=iy(this.remaining),o=this.remaining[i.length];if(o!=="/"&&o!==")"&&o!==";")throw new S(4010,!1);let s;i.indexOf(":")>-1?(s=i.slice(0,i.indexOf(":")),this.capture(s),this.capture(":")):t&&(s=G);let a=this.parseChildren(e+1);r[s??G]=Object.keys(a).length===1&&a[G]?a[G]:new ve([],a),this.consumeOptional("//")}return r}peekStartsWith(t){return this.remaining.startsWith(t)}consumeOptional(t){return this.peekStartsWith(t)?(this.remaining=this.remaining.substring(t.length),!0):!1}capture(t){if(!this.consumeOptional(t))throw new S(4011,!1)}};function Jw(n){return n.segments.length>0?new ve([],{[G]:n}):n}function eT(n){let t={};for(let[r,i]of Object.entries(n.children)){let o=eT(i);if(r===G&&o.segments.length===0&&o.hasChildren())for(let[s,a]of Object.entries(o.children))t[s]=a;else(o.segments.length>0||o.hasChildren())&&(t[r]=o)}let e=new ve(n.segments,t);return HO(e)}function HO(n){if(n.numberOfChildren===1&&n.children[G]){let t=n.children[G];return new ve(n.segments.concat(t.segments),t.children)}return n}function Fi(n){return n instanceof dn}function tT(n,t,e=null,r=null,i=new Li){let o=nT(n);return rT(o,t,e,r,i)}function nT(n){let t;function e(o){let s={};for(let l of o.children){let c=e(l);s[l.outlet]=c}let a=new ve(o.url,s);return o===n&&(t=a),a}let r=e(n.root),i=Jw(r);return t??i}function rT(n,t,e,r,i){let o=n;for(;o.parent;)o=o.parent;if(t.length===0)return oy(o,o,o,e,r,i);let s=zO(t);if(s.toRoot())return oy(o,o,new ve([],{}),e,r,i);let a=WO(s,o,n),l=a.processChildren?kl(a.segmentGroup,a.index,s.commands):oT(a.segmentGroup,a.index,s.commands);return oy(o,a.segmentGroup,l,e,r,i)}function tf(n){return typeof n=="object"&&n!=null&&!n.outlets&&!n.segmentPath}function Nl(n){return typeof n=="object"&&n!=null&&n.outlets}function Bw(n,t,e){n||="\u0275";let r=new dn;return r.queryParams={[n]:t},e.parse(e.serialize(r)).queryParams[n]}function oy(n,t,e,r,i,o){let s={};for(let[c,u]of Object.entries(r??{}))s[c]=Array.isArray(u)?u.map(d=>Bw(c,d,o)):Bw(c,u,o);let a;n===t?a=e:a=iT(n,t,e);let l=Jw(eT(a));return new dn(l,s,i)}function iT(n,t,e){let r={};return Object.entries(n.children).forEach(([i,o])=>{o===t?r[i]=e:r[i]=iT(o,t,e)}),new ve(n.segments,r)}var nf=class{isAbsolute;numberOfDoubleDots;commands;constructor(t,e,r){if(this.isAbsolute=t,this.numberOfDoubleDots=e,this.commands=r,t&&r.length>0&&tf(r[0]))throw new S(4003,!1);let i=r.find(Nl);if(i&&i!==SO(r))throw new S(4004,!1)}toRoot(){return this.isAbsolute&&this.commands.length===1&&this.commands[0]=="/"}};function zO(n){if(typeof n[0]=="string"&&n.length===1&&n[0]==="/")return new nf(!0,0,n);let t=0,e=!1,r=n.reduce((i,o,s)=>{if(typeof o=="object"&&o!=null){if(o.outlets){let a={};return Object.entries(o.outlets).forEach(([l,c])=>{a[l]=typeof c=="string"?c.split("/"):c}),[...i,{outlets:a}]}if(o.segmentPath)return[...i,o.segmentPath]}return typeof o!="string"?[...i,o]:s===0?(o.split("/").forEach((a,l)=>{l==0&&a==="."||(l==0&&a===""?e=!0:a===".."?t++:a!=""&&i.push(a))}),i):[...i,o]},[]);return new nf(e,t,r)}var Bs=class{segmentGroup;processChildren;index;constructor(t,e,r){this.segmentGroup=t,this.processChildren=e,this.index=r}};function WO(n,t,e){if(n.isAbsolute)return new Bs(t,!0,0);if(!e)return new Bs(t,!1,NaN);if(e.parent===null)return new Bs(e,!0,0);let r=tf(n.commands[0])?0:1,i=e.segments.length-1+r;return GO(e,i,n.numberOfDoubleDots)}function GO(n,t,e){let r=n,i=t,o=e;for(;o>i;){if(o-=i,r=r.parent,!r)throw new S(4005,!1);i=r.segments.length}return new Bs(r,!1,i-o)}function qO(n){return Nl(n[0])?n[0].outlets:{[G]:n}}function oT(n,t,e){if(n??=new ve([],{}),n.segments.length===0&&n.hasChildren())return kl(n,t,e);let r=KO(n,t,e),i=e.slice(r.commandIndex);if(r.match&&r.pathIndex<n.segments.length){let o=new ve(n.segments.slice(0,r.pathIndex),{});return o.children[G]=new ve(n.segments.slice(r.pathIndex),n.children),kl(o,0,i)}else return r.match&&i.length===0?new ve(n.segments,{}):r.match&&!n.hasChildren()?fy(n,t,e):r.match?kl(n,0,i):fy(n,t,e)}function kl(n,t,e){if(e.length===0)return new ve(n.segments,{});{let r=qO(e),i={};if(Object.keys(r).some(o=>o!==G)&&n.children[G]&&n.numberOfChildren===1&&n.children[G].segments.length===0){let o=kl(n.children[G],t,e);return new ve(n.segments,o.children)}return Object.entries(r).forEach(([o,s])=>{typeof s=="string"&&(s=[s]),s!==null&&(i[o]=oT(n.children[o],t,s))}),Object.entries(n.children).forEach(([o,s])=>{r[o]===void 0&&(i[o]=s)}),new ve(n.segments,i)}}function KO(n,t,e){let r=0,i=t,o={match:!1,pathIndex:0,commandIndex:0};for(;i<n.segments.length;){if(r>=e.length)return o;let s=n.segments[i],a=e[r];if(Nl(a))break;let l=`${a}`,c=r<e.length-1?e[r+1]:null;if(i>0&&l===void 0)break;if(l&&c&&typeof c=="object"&&c.outlets===void 0){if(!Vw(l,c,s))return o;r+=2}else{if(!Vw(l,{},s))return o;r++}i++}return{match:!0,pathIndex:i,commandIndex:r}}function fy(n,t,e){let r=n.segments.slice(0,t),i=0;for(;i<e.length;){let o=e[i];if(Nl(o)){let l=YO(o.outlets);return new ve(r,l)}if(i===0&&tf(e[0])){let l=n.segments[t];r.push(new Pi(l.path,jw(e[0]))),i++;continue}let s=Nl(o)?o.outlets[G]:`${o}`,a=i<e.length-1?e[i+1]:null;s&&a&&tf(a)?(r.push(new Pi(s,jw(a))),i+=2):(r.push(new Pi(s,{})),i++)}return new ve(r,{})}function YO(n){let t={};return Object.entries(n).forEach(([e,r])=>{typeof r=="string"&&(r=[r]),r!==null&&(t[e]=fy(new ve([],{}),0,r))}),t}function jw(n){let t={};return Object.entries(n).forEach(([e,r])=>t[e]=`${r}`),t}function Vw(n,t,e){return n==e.path&&Ir(t,e.parameters)}var Al="imperative",pt=(function(n){return n[n.NavigationStart=0]="NavigationStart",n[n.NavigationEnd=1]="NavigationEnd",n[n.NavigationCancel=2]="NavigationCancel",n[n.NavigationError=3]="NavigationError",n[n.RoutesRecognized=4]="RoutesRecognized",n[n.ResolveStart=5]="ResolveStart",n[n.ResolveEnd=6]="ResolveEnd",n[n.GuardsCheckStart=7]="GuardsCheckStart",n[n.GuardsCheckEnd=8]="GuardsCheckEnd",n[n.RouteConfigLoadStart=9]="RouteConfigLoadStart",n[n.RouteConfigLoadEnd=10]="RouteConfigLoadEnd",n[n.ChildActivationStart=11]="ChildActivationStart",n[n.ChildActivationEnd=12]="ChildActivationEnd",n[n.ActivationStart=13]="ActivationStart",n[n.ActivationEnd=14]="ActivationEnd",n[n.Scroll=15]="Scroll",n[n.NavigationSkipped=16]="NavigationSkipped",n})(pt||{}),fn=class{id;url;constructor(t,e){this.id=t,this.url=e}},Oo=class extends fn{type=pt.NavigationStart;navigationTrigger;restoredState;constructor(t,e,r="imperative",i=null){super(t,e),this.navigationTrigger=r,this.restoredState=i}toString(){return`NavigationStart(id: ${this.id}, url: '${this.url}')`}},Mr=class extends fn{urlAfterRedirects;type=pt.NavigationEnd;constructor(t,e,r){super(t,e),this.urlAfterRedirects=r}toString(){return`NavigationEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}')`}},kt=(function(n){return n[n.Redirect=0]="Redirect",n[n.SupersededByNewNavigation=1]="SupersededByNewNavigation",n[n.NoDataFromResolver=2]="NoDataFromResolver",n[n.GuardRejected=3]="GuardRejected",n[n.Aborted=4]="Aborted",n})(kt||{}),Pl=(function(n){return n[n.IgnoredSameUrlNavigation=0]="IgnoredSameUrlNavigation",n[n.IgnoredByUrlHandlingStrategy=1]="IgnoredByUrlHandlingStrategy",n})(Pl||{}),Rn=class extends fn{reason;code;type=pt.NavigationCancel;constructor(t,e,r,i){super(t,e),this.reason=r,this.code=i}toString(){return`NavigationCancel(id: ${this.id}, url: '${this.url}')`}};function sT(n){return n instanceof Rn&&(n.code===kt.Redirect||n.code===kt.SupersededByNewNavigation)}var ri=class extends fn{reason;code;type=pt.NavigationSkipped;constructor(t,e,r,i){super(t,e),this.reason=r,this.code=i}},No=class extends fn{error;target;type=pt.NavigationError;constructor(t,e,r,i){super(t,e),this.error=r,this.target=i}toString(){return`NavigationError(id: ${this.id}, url: '${this.url}', error: ${this.error})`}},Ll=class extends fn{urlAfterRedirects;state;type=pt.RoutesRecognized;constructor(t,e,r,i){super(t,e),this.urlAfterRedirects=r,this.state=i}toString(){return`RoutesRecognized(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`}},rf=class extends fn{urlAfterRedirects;state;type=pt.GuardsCheckStart;constructor(t,e,r,i){super(t,e),this.urlAfterRedirects=r,this.state=i}toString(){return`GuardsCheckStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`}},of=class extends fn{urlAfterRedirects;state;shouldActivate;type=pt.GuardsCheckEnd;constructor(t,e,r,i,o){super(t,e),this.urlAfterRedirects=r,this.state=i,this.shouldActivate=o}toString(){return`GuardsCheckEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state}, shouldActivate: ${this.shouldActivate})`}},sf=class extends fn{urlAfterRedirects;state;type=pt.ResolveStart;constructor(t,e,r,i){super(t,e),this.urlAfterRedirects=r,this.state=i}toString(){return`ResolveStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`}},af=class extends fn{urlAfterRedirects;state;type=pt.ResolveEnd;constructor(t,e,r,i){super(t,e),this.urlAfterRedirects=r,this.state=i}toString(){return`ResolveEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`}},lf=class{route;type=pt.RouteConfigLoadStart;constructor(t){this.route=t}toString(){return`RouteConfigLoadStart(path: ${this.route.path})`}},cf=class{route;type=pt.RouteConfigLoadEnd;constructor(t){this.route=t}toString(){return`RouteConfigLoadEnd(path: ${this.route.path})`}},uf=class{snapshot;type=pt.ChildActivationStart;constructor(t){this.snapshot=t}toString(){return`ChildActivationStart(path: '${this.snapshot.routeConfig&&this.snapshot.routeConfig.path||""}')`}},df=class{snapshot;type=pt.ChildActivationEnd;constructor(t){this.snapshot=t}toString(){return`ChildActivationEnd(path: '${this.snapshot.routeConfig&&this.snapshot.routeConfig.path||""}')`}},ff=class{snapshot;type=pt.ActivationStart;constructor(t){this.snapshot=t}toString(){return`ActivationStart(path: '${this.snapshot.routeConfig&&this.snapshot.routeConfig.path||""}')`}},hf=class{snapshot;type=pt.ActivationEnd;constructor(t){this.snapshot=t}toString(){return`ActivationEnd(path: '${this.snapshot.routeConfig&&this.snapshot.routeConfig.path||""}')`}};var Vs=class{},Fl=class{},Us=class{url;navigationBehaviorOptions;constructor(t,e){this.url=t,this.navigationBehaviorOptions=e}};function ZO(n){return!(n instanceof Vs)&&!(n instanceof Us)&&!(n instanceof Fl)}var pf=class{rootInjector;outlet=null;route=null;children;attachRef=null;get injector(){return this.route?.snapshot._environmentInjector??this.rootInjector}constructor(t){this.rootInjector=t,this.children=new Gs(this.rootInjector)}},Gs=(()=>{class n{rootInjector;contexts=new Map;constructor(e){this.rootInjector=e}onChildOutletCreated(e,r){let i=this.getOrCreateContext(e);i.outlet=r,this.contexts.set(e,i)}onChildOutletDestroyed(e){let r=this.getContext(e);r&&(r.outlet=null,r.attachRef=null)}onOutletDeactivated(){let e=this.contexts;return this.contexts=new Map,e}onOutletReAttached(e){this.contexts=e}getOrCreateContext(e){let r=this.getContext(e);return r||(r=new pf(this.rootInjector),this.contexts.set(e,r)),r}getContext(e){return this.contexts.get(e)||null}static \u0275fac=function(r){return new(r||n)(z(ke))};static \u0275prov=y({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})(),mf=class{_root;constructor(t){this._root=t}get root(){return this._root.value}parent(t){let e=this.pathFromRoot(t);return e.length>1?e[e.length-2]:null}children(t){let e=hy(t,this._root);return e?e.children.map(r=>r.value):[]}firstChild(t){let e=hy(t,this._root);return e&&e.children.length>0?e.children[0].value:null}siblings(t){let e=py(t,this._root);return e.length<2?[]:e[e.length-2].children.map(i=>i.value).filter(i=>i!==t)}pathFromRoot(t){return py(t,this._root).map(e=>e.value)}};function hy(n,t){if(n===t.value)return t;for(let e of t.children){let r=hy(n,e);if(r)return r}return null}function py(n,t){if(n===t.value)return[t];for(let e of t.children){let r=py(n,e);if(r.length)return r.unshift(t),r}return[]}var un=class{value;children;constructor(t,e){this.value=t,this.children=e}toString(){return`TreeNode(${this.value})`}};function Fs(n){let t={};return n&&n.children.forEach(e=>t[e.value.outlet]=e),t}var Bl=class extends mf{snapshot;constructor(t,e){super(t),this.snapshot=e,Ey(this,t)}toString(){return this.snapshot.toString()}};function aT(n,t){let e=XO(n,t),r=new Ge([new Pi("",{})]),i=new Ge({}),o=new Ge({}),s=new Ge({}),a=new Ge(""),l=new ii(r,i,s,a,o,G,n,e.root);return l.snapshot=e.root,new Bl(new un(l,[]),e)}function XO(n,t){let e={},r={},i={},s=new $s([],e,i,"",r,G,n,null,{},t);return new jl("",new un(s,[]))}var ii=class{urlSubject;paramsSubject;queryParamsSubject;fragmentSubject;dataSubject;outlet;component;snapshot;_futureSnapshot;_routerState;_paramMap;_queryParamMap;title;url;params;queryParams;fragment;data;constructor(t,e,r,i,o,s,a,l){this.urlSubject=t,this.paramsSubject=e,this.queryParamsSubject=r,this.fragmentSubject=i,this.dataSubject=o,this.outlet=s,this.component=a,this._futureSnapshot=l,this.title=this.dataSubject?.pipe(se(c=>c[$l]))??I(void 0),this.url=t,this.params=e,this.queryParams=r,this.fragment=i,this.data=o}get routeConfig(){return this._futureSnapshot.routeConfig}get root(){return this._routerState.root}get parent(){return this._routerState.parent(this)}get firstChild(){return this._routerState.firstChild(this)}get children(){return this._routerState.children(this)}get pathFromRoot(){return this._routerState.pathFromRoot(this)}get paramMap(){return this._paramMap??=this.params.pipe(se(t=>Ao(t))),this._paramMap}get queryParamMap(){return this._queryParamMap??=this.queryParams.pipe(se(t=>Ao(t))),this._queryParamMap}toString(){return this.snapshot?this.snapshot.toString():`Future(${this._futureSnapshot})`}};function Dy(n,t,e="emptyOnly"){let r,{routeConfig:i}=n;return t!==null&&(e==="always"||i?.path===""||!t.component&&!t.routeConfig?.loadComponent)?r={params:g(g({},t.params),n.params),data:g(g({},t.data),n.data),resolve:g(g(g(g({},n.data),t.data),i?.data),n._resolvedData)}:r={params:g({},n.params),data:g({},n.data),resolve:g(g({},n.data),n._resolvedData??{})},i&&cT(i)&&(r.resolve[$l]=i.title),r}var $s=class{url;params;queryParams;fragment;data;outlet;component;routeConfig;_resolve;_resolvedData;_routerState;_paramMap;_queryParamMap;_environmentInjector;get title(){return this.data?.[$l]}constructor(t,e,r,i,o,s,a,l,c,u){this.url=t,this.params=e,this.queryParams=r,this.fragment=i,this.data=o,this.outlet=s,this.component=a,this.routeConfig=l,this._resolve=c,this._environmentInjector=u}get root(){return this._routerState.root}get parent(){return this._routerState.parent(this)}get firstChild(){return this._routerState.firstChild(this)}get children(){return this._routerState.children(this)}get pathFromRoot(){return this._routerState.pathFromRoot(this)}get paramMap(){return this._paramMap??=Ao(this.params),this._paramMap}get queryParamMap(){return this._queryParamMap??=Ao(this.queryParams),this._queryParamMap}toString(){let t=this.url.map(r=>r.toString()).join("/"),e=this.routeConfig?this.routeConfig.path:"";return`Route(url:'${t}', path:'${e}')`}},jl=class extends mf{url;constructor(t,e){super(e),this.url=t,Ey(this,e)}toString(){return lT(this._root)}};function Ey(n,t){t.value._routerState=n,t.children.forEach(e=>Ey(n,e))}function lT(n){let t=n.children.length>0?` { ${n.children.map(lT).join(", ")} } `:"";return`${n.value}${t}`}function sy(n){if(n.snapshot){let t=n.snapshot,e=n._futureSnapshot;n.snapshot=e,Ir(t.queryParams,e.queryParams)||n.queryParamsSubject.next(e.queryParams),t.fragment!==e.fragment&&n.fragmentSubject.next(e.fragment),Ir(t.params,e.params)||n.paramsSubject.next(e.params),TO(t.url,e.url)||n.urlSubject.next(e.url),Ir(t.data,e.data)||n.dataSubject.next(e.data)}else n.snapshot=n._futureSnapshot,n.dataSubject.next(n._futureSnapshot.data)}function my(n,t){let e=Ir(n.params,t.params)&&RO(n.url,t.url),r=!n.parent!=!t.parent;return e&&!r&&(!n.parent||my(n.parent,t.parent))}function cT(n){return typeof n.title=="string"||n.title===null}var uT=new v(""),Hl=(()=>{class n{activated=null;get activatedComponentRef(){return this.activated}_activatedRoute=null;name=G;activateEvents=new te;deactivateEvents=new te;attachEvents=new te;detachEvents=new te;routerOutletData=wr();parentContexts=f(Gs);location=f(at);changeDetector=f(xt);inputBinder=f(bf,{optional:!0});supportsBindingToComponentInputs=!0;ngOnChanges(e){if(e.name){let{firstChange:r,previousValue:i}=e.name;if(r)return;this.isTrackedInParentContexts(i)&&(this.deactivate(),this.parentContexts.onChildOutletDestroyed(i)),this.initializeOutletWithName()}}ngOnDestroy(){this.isTrackedInParentContexts(this.name)&&this.parentContexts.onChildOutletDestroyed(this.name),this.inputBinder?.unsubscribeFromRouteData(this)}isTrackedInParentContexts(e){return this.parentContexts.getContext(e)?.outlet===this}ngOnInit(){this.initializeOutletWithName()}initializeOutletWithName(){if(this.parentContexts.onChildOutletCreated(this.name,this),this.activated)return;let e=this.parentContexts.getContext(this.name);e?.route&&(e.attachRef?this.attach(e.attachRef,e.route):this.activateWith(e.route,e.injector))}get isActivated(){return!!this.activated}get component(){if(!this.activated)throw new S(4012,!1);return this.activated.instance}get activatedRoute(){if(!this.activated)throw new S(4012,!1);return this._activatedRoute}get activatedRouteData(){return this._activatedRoute?this._activatedRoute.snapshot.data:{}}detach(){if(!this.activated)throw new S(4012,!1);this.location.detach();let e=this.activated;return this.activated=null,this._activatedRoute=null,this.detachEvents.emit(e.instance),e}attach(e,r){this.activated=e,this._activatedRoute=r,this.location.insert(e.hostView),this.inputBinder?.bindActivatedRouteToOutletComponent(this),this.attachEvents.emit(e.instance)}deactivate(){if(this.activated){let e=this.component;this.activated.destroy(),this.activated=null,this._activatedRoute=null,this.deactivateEvents.emit(e)}}activateWith(e,r){if(this.isActivated)throw new S(4013,!1);this._activatedRoute=e;let i=this.location,s=e.snapshot.component,a=this.parentContexts.getOrCreateContext(this.name).children,l=new gy(e,a,i.injector,this.routerOutletData);this.activated=i.createComponent(s,{index:i.length,injector:l,environmentInjector:r}),this.changeDetector.markForCheck(),this.inputBinder?.bindActivatedRouteToOutletComponent(this),this.activateEvents.emit(this.activated.instance)}static \u0275fac=function(r){return new(r||n)};static \u0275dir=le({type:n,selectors:[["router-outlet"]],inputs:{name:"name",routerOutletData:[1,"routerOutletData"]},outputs:{activateEvents:"activate",deactivateEvents:"deactivate",attachEvents:"attach",detachEvents:"detach"},exportAs:["outlet"],features:[Tn]})}return n})(),gy=class{route;childContexts;parent;outletData;constructor(t,e,r,i){this.route=t,this.childContexts=e,this.parent=r,this.outletData=i}get(t,e){return t===ii?this.route:t===Gs?this.childContexts:t===uT?this.outletData:this.parent.get(t,e)}},bf=new v("");var wy=(()=>{class n{static \u0275fac=function(r){return new(r||n)};static \u0275cmp=oe({type:n,selectors:[["ng-component"]],exportAs:["emptyRouterOutlet"],decls:1,vars:0,template:function(r,i){r&1&&Ce(0,"router-outlet")},dependencies:[Hl],encapsulation:2})}return n})();function Ty(n){let t=n.children&&n.children.map(Ty),e=t?W(g({},n),{children:t}):g({},n);return!e.component&&!e.loadComponent&&(t||e.loadChildren)&&e.outlet&&e.outlet!==G&&(e.component=wy),e}function QO(n,t,e){let r=Vl(n,t._root,e?e._root:void 0);return new Bl(r,t)}function Vl(n,t,e){if(e&&n.shouldReuseRoute(t.value,e.value.snapshot)){let r=e.value;r._futureSnapshot=t.value;let i=JO(n,t,e);return new un(r,i)}else{if(n.shouldAttach(t.value)){let o=n.retrieve(t.value);if(o!==null){let s=o.route;return s.value._futureSnapshot=t.value,s.children=t.children.map(a=>Vl(n,a)),s}}let r=eN(t.value),i=t.children.map(o=>Vl(n,o));return new un(r,i)}}function JO(n,t,e){return t.children.map(r=>{for(let i of e.children)if(n.shouldReuseRoute(r.value,i.value.snapshot))return Vl(n,r,i);return Vl(n,r)})}function eN(n){return new ii(new Ge(n.url),new Ge(n.params),new Ge(n.queryParams),new Ge(n.fragment),new Ge(n.data),n.outlet,n.component,n)}var Hs=class{redirectTo;navigationBehaviorOptions;constructor(t,e){this.redirectTo=t,this.navigationBehaviorOptions=e}},dT="ngNavigationCancelingError";function gf(n,t){let{redirectTo:e,navigationBehaviorOptions:r}=Fi(t)?{redirectTo:t,navigationBehaviorOptions:void 0}:t,i=fT(!1,kt.Redirect);return i.url=e,i.navigationBehaviorOptions=r,i}function fT(n,t){let e=new Error(`NavigationCancelingError: ${n||""}`);return e[dT]=!0,e.cancellationCode=t,e}function tN(n){return hT(n)&&Fi(n.url)}function hT(n){return!!n&&n[dT]}var yy=class{routeReuseStrategy;futureState;currState;forwardEvent;inputBindingEnabled;constructor(t,e,r,i,o){this.routeReuseStrategy=t,this.futureState=e,this.currState=r,this.forwardEvent=i,this.inputBindingEnabled=o}activate(t){let e=this.futureState._root,r=this.currState?this.currState._root:null;this.deactivateChildRoutes(e,r,t),sy(this.futureState.root),this.activateChildRoutes(e,r,t)}deactivateChildRoutes(t,e,r){let i=Fs(e);t.children.forEach(o=>{let s=o.value.outlet;this.deactivateRoutes(o,i[s],r),delete i[s]}),Object.values(i).forEach(o=>{this.deactivateRouteAndItsChildren(o,r)})}deactivateRoutes(t,e,r){let i=t.value,o=e?e.value:null;if(i===o)if(i.component){let s=r.getContext(i.outlet);s&&this.deactivateChildRoutes(t,e,s.children)}else this.deactivateChildRoutes(t,e,r);else o&&this.deactivateRouteAndItsChildren(e,r)}deactivateRouteAndItsChildren(t,e){t.value.component&&this.routeReuseStrategy.shouldDetach(t.value.snapshot)?this.detachAndStoreRouteSubtree(t,e):this.deactivateRouteAndOutlet(t,e)}detachAndStoreRouteSubtree(t,e){let r=e.getContext(t.value.outlet),i=r&&t.value.component?r.children:e,o=Fs(t);for(let s of Object.values(o))this.deactivateRouteAndItsChildren(s,i);if(r&&r.outlet){let s=r.outlet.detach(),a=r.children.onOutletDeactivated();this.routeReuseStrategy.store(t.value.snapshot,{componentRef:s,route:t,contexts:a})}}deactivateRouteAndOutlet(t,e){let r=e.getContext(t.value.outlet),i=r&&t.value.component?r.children:e,o=Fs(t);for(let s of Object.values(o))this.deactivateRouteAndItsChildren(s,i);r&&(r.outlet&&(r.outlet.deactivate(),r.children.onOutletDeactivated()),r.attachRef=null,r.route=null)}activateChildRoutes(t,e,r){let i=Fs(e);t.children.forEach(o=>{this.activateRoutes(o,i[o.value.outlet],r),this.forwardEvent(new hf(o.value.snapshot))}),t.children.length&&this.forwardEvent(new df(t.value.snapshot))}activateRoutes(t,e,r){let i=t.value,o=e?e.value:null;if(sy(i),i===o)if(i.component){let s=r.getOrCreateContext(i.outlet);this.activateChildRoutes(t,e,s.children)}else this.activateChildRoutes(t,e,r);else if(i.component){let s=r.getOrCreateContext(i.outlet);if(this.routeReuseStrategy.shouldAttach(i.snapshot)){let a=this.routeReuseStrategy.retrieve(i.snapshot);this.routeReuseStrategy.store(i.snapshot,null),s.children.onOutletReAttached(a.contexts),s.attachRef=a.componentRef,s.route=a.route.value,s.outlet&&s.outlet.attach(a.componentRef,a.route.value),sy(a.route.value),this.activateChildRoutes(t,null,s.children)}else s.attachRef=null,s.route=i,s.outlet&&s.outlet.activateWith(i,s.injector),this.activateChildRoutes(t,null,s.children)}else this.activateChildRoutes(t,null,r)}},yf=class{path;route;constructor(t){this.path=t,this.route=this.path[this.path.length-1]}},js=class{component;route;constructor(t,e){this.component=t,this.route=e}};function nN(n,t,e){let r=n._root,i=t?t._root:null;return Rl(r,i,e,[r.value])}function rN(n){let t=n.routeConfig?n.routeConfig.canActivateChild:null;return!t||t.length===0?null:{node:n,guards:t}}function qs(n,t){let e=Symbol(),r=t.get(n,e);return r===e?typeof n=="function"&&!gp(n)?n:t.get(n):r}function Rl(n,t,e,r,i={canDeactivateChecks:[],canActivateChecks:[]}){let o=Fs(t);return n.children.forEach(s=>{iN(s,o[s.value.outlet],e,r.concat([s.value]),i),delete o[s.value.outlet]}),Object.entries(o).forEach(([s,a])=>Ol(a,e.getContext(s),i)),i}function iN(n,t,e,r,i={canDeactivateChecks:[],canActivateChecks:[]}){let o=n.value,s=t?t.value:null,a=e?e.getContext(n.value.outlet):null;if(s&&o.routeConfig===s.routeConfig){let l=oN(s,o,o.routeConfig.runGuardsAndResolvers);l?i.canActivateChecks.push(new yf(r)):(o.data=s.data,o._resolvedData=s._resolvedData),o.component?Rl(n,t,a?a.children:null,r,i):Rl(n,t,e,r,i),l&&a&&a.outlet&&a.outlet.isActivated&&i.canDeactivateChecks.push(new js(a.outlet.component,s))}else s&&Ol(t,a,i),i.canActivateChecks.push(new yf(r)),o.component?Rl(n,null,a?a.children:null,r,i):Rl(n,null,e,r,i);return i}function oN(n,t,e){if(typeof e=="function")return St(t._environmentInjector,()=>e(n,t));switch(e){case"pathParamsChange":return!ko(n.url,t.url);case"pathParamsOrQueryParamsChange":return!ko(n.url,t.url)||!Ir(n.queryParams,t.queryParams);case"always":return!0;case"paramsOrQueryParamsChange":return!my(n,t)||!Ir(n.queryParams,t.queryParams);default:return!my(n,t)}}function Ol(n,t,e){let r=Fs(n),i=n.value;Object.entries(r).forEach(([o,s])=>{i.component?t?Ol(s,t.children.getContext(o),e):Ol(s,null,e):Ol(s,t,e)}),i.component?t&&t.outlet&&t.outlet.isActivated?e.canDeactivateChecks.push(new js(t.outlet.component,i)):e.canDeactivateChecks.push(new js(null,i)):e.canDeactivateChecks.push(new js(null,i))}function zl(n){return typeof n=="function"}function sN(n){return typeof n=="boolean"}function aN(n){return n&&zl(n.canLoad)}function lN(n){return n&&zl(n.canActivate)}function cN(n){return n&&zl(n.canActivateChild)}function uN(n){return n&&zl(n.canDeactivate)}function dN(n){return n&&zl(n.canMatch)}function pT(n){return n instanceof Lr||n?.name==="EmptyError"}var Zd=Symbol("INITIAL_VALUE");function zs(){return dt(n=>ka(n.map(t=>t.pipe(ut(1),Tt(Zd)))).pipe(se(t=>{for(let e of t)if(e!==!0){if(e===Zd)return Zd;if(e===!1||fN(e))return e}return!0}),ye(t=>t!==Zd),ut(1)))}function fN(n){return Fi(n)||n instanceof Hs}function mT(n){return n.aborted?I(void 0).pipe(ut(1)):new L(t=>{let e=()=>{t.next(),t.complete()};return n.addEventListener("abort",e),()=>n.removeEventListener("abort",e)})}function gT(n){return Q(mT(n))}function hN(n){return Ot(t=>{let{targetSnapshot:e,currentSnapshot:r,guards:{canActivateChecks:i,canDeactivateChecks:o}}=t;return o.length===0&&i.length===0?I(W(g({},t),{guardsResult:!0})):pN(o,e,r).pipe(Ot(s=>s&&sN(s)?mN(e,i,n):I(s)),se(s=>W(g({},t),{guardsResult:s})))})}function pN(n,t,e){return qe(n).pipe(Ot(r=>_N(r.component,r.route,e,t)),Vr(r=>r!==!0,!0))}function mN(n,t,e){return qe(t).pipe(iu(r=>vi(yN(r.route.parent,e),gN(r.route,e),bN(n,r.path),vN(n,r.route))),Vr(r=>r!==!0,!0))}function gN(n,t){return n!==null&&t&&t(new ff(n)),I(!0)}function yN(n,t){return n!==null&&t&&t(new uf(n)),I(!0)}function vN(n,t){let e=t.routeConfig?t.routeConfig.canActivate:null;if(!e||e.length===0)return I(!0);let r=e.map(i=>Aa(()=>{let o=t._environmentInjector,s=qs(i,o),a=lN(s)?s.canActivate(t,n):St(o,()=>s(t,n));return Po(a).pipe(Vr())}));return I(r).pipe(zs())}function bN(n,t){let e=t[t.length-1],i=t.slice(0,t.length-1).reverse().map(o=>rN(o)).filter(o=>o!==null).map(o=>Aa(()=>{let s=o.guards.map(a=>{let l=o.node._environmentInjector,c=qs(a,l),u=cN(c)?c.canActivateChild(e,n):St(l,()=>c(e,n));return Po(u).pipe(Vr())});return I(s).pipe(zs())}));return I(i).pipe(zs())}function _N(n,t,e,r){let i=t&&t.routeConfig?t.routeConfig.canDeactivate:null;if(!i||i.length===0)return I(!0);let o=i.map(s=>{let a=t._environmentInjector,l=qs(s,a),c=uN(l)?l.canDeactivate(n,t,e,r):St(a,()=>l(n,t,e,r));return Po(c).pipe(Vr())});return I(o).pipe(zs())}function CN(n,t,e,r,i){let o=t.canLoad;if(o===void 0||o.length===0)return I(!0);let s=o.map(a=>{let l=qs(a,n),c=aN(l)?l.canLoad(t,e):St(n,()=>l(t,e)),u=Po(c);return i?u.pipe(gT(i)):u});return I(s).pipe(zs(),yT(r))}function yT(n){return $h(ot(t=>{if(typeof t!="boolean")throw gf(n,t)}),se(t=>t===!0))}function DN(n,t,e,r,i,o){let s=t.canMatch;if(!s||s.length===0)return I(!0);let a=s.map(l=>{let c=qs(l,n),u=dN(c)?c.canMatch(t,e,i):St(n,()=>c(t,e,i));return Po(u).pipe(gT(o))});return I(a).pipe(zs(),yT(r))}var ni=class n extends Error{segmentGroup;constructor(t){super(),this.segmentGroup=t||null,Object.setPrototypeOf(this,n.prototype)}},Ul=class n extends Error{urlTree;constructor(t){super(),this.urlTree=t,Object.setPrototypeOf(this,n.prototype)}};function EN(n){throw new S(4e3,!1)}function wN(n){throw fT(!1,kt.GuardRejected)}var vy=class{urlSerializer;urlTree;constructor(t,e){this.urlSerializer=t,this.urlTree=e}async lineralizeSegments(t,e){let r=[],i=e.root;for(;;){if(r=r.concat(i.segments),i.numberOfChildren===0)return r;if(i.numberOfChildren>1||!i.children[G])throw EN(`${t.redirectTo}`);i=i.children[G]}}async applyRedirectCommands(t,e,r,i,o){let s=await TN(e,i,o);if(s instanceof dn)throw new Ul(s);let a=this.applyRedirectCreateUrlTree(s,this.urlSerializer.parse(s),t,r);if(s[0]==="/")throw new Ul(a);return a}applyRedirectCreateUrlTree(t,e,r,i){let o=this.createSegmentGroup(t,e.root,r,i);return new dn(o,this.createQueryParams(e.queryParams,this.urlTree.queryParams),e.fragment)}createQueryParams(t,e){let r={};return Object.entries(t).forEach(([i,o])=>{if(typeof o=="string"&&o[0]===":"){let a=o.substring(1);r[i]=e[a]}else r[i]=o}),r}createSegmentGroup(t,e,r,i){let o=this.createSegments(t,e.segments,r,i),s={};return Object.entries(e.children).forEach(([a,l])=>{s[a]=this.createSegmentGroup(t,l,r,i)}),new ve(o,s)}createSegments(t,e,r,i){return e.map(o=>o.path[0]===":"?this.findPosParam(t,o,i):this.findOrReturn(o,r))}findPosParam(t,e,r){let i=r[e.path.substring(1)];if(!i)throw new S(4001,!1);return i}findOrReturn(t,e){let r=0;for(let i of e){if(i.path===t.path)return e.splice(r),i;r++}return t}};function TN(n,t,e){if(typeof n=="string")return Promise.resolve(n);let r=n;return ef(Po(St(e,()=>r(t))))}function SN(n,t){return n.providers&&!n._injector&&(n._injector=pl(n.providers,t,`Route: ${n.path}`)),n._injector??t}function ir(n){return n.outlet||G}function IN(n,t){let e=n.filter(r=>ir(r)===t);return e.push(...n.filter(r=>ir(r)!==t)),e}var by={matched:!1,consumedSegments:[],remainingSegments:[],parameters:{},positionalParamSegments:{}};function vT(n){return{routeConfig:n.routeConfig,url:n.url,params:n.params,queryParams:n.queryParams,fragment:n.fragment,data:n.data,outlet:n.outlet,title:n.title,paramMap:n.paramMap,queryParamMap:n.queryParamMap}}function MN(n,t,e,r,i,o,s){let a=bT(n,t,e);if(!a.matched)return I(a);let l=vT(o(a));return r=SN(t,r),DN(r,t,e,i,l,s).pipe(se(c=>c===!0?a:g({},by)))}function bT(n,t,e){if(t.path==="")return t.pathMatch==="full"&&(n.hasChildren()||e.length>0)?g({},by):{matched:!0,consumedSegments:[],remainingSegments:e,parameters:{},positionalParamSegments:{}};let i=(t.matcher||Hw)(e,n,t);if(!i)return g({},by);let o={};Object.entries(i.posParams??{}).forEach(([a,l])=>{o[a]=l.path});let s=i.consumed.length>0?g(g({},o),i.consumed[i.consumed.length-1].parameters):o;return{matched:!0,consumedSegments:i.consumed,remainingSegments:e.slice(i.consumed.length),parameters:s,positionalParamSegments:i.posParams??{}}}function Uw(n,t,e,r,i){return e.length>0&&kN(n,e,r,i)?{segmentGroup:new ve(t,RN(r,new ve(e,n.children))),slicedSegments:[]}:e.length===0&&AN(n,e,r)?{segmentGroup:new ve(n.segments,xN(n,e,r,n.children)),slicedSegments:e}:{segmentGroup:new ve(n.segments,n.children),slicedSegments:e}}function xN(n,t,e,r){let i={};for(let o of e)if(_f(n,t,o)&&!r[ir(o)]){let s=new ve([],{});i[ir(o)]=s}return g(g({},r),i)}function RN(n,t){let e={};e[G]=t;for(let r of n)if(r.path===""&&ir(r)!==G){let i=new ve([],{});e[ir(r)]=i}return e}function kN(n,t,e,r){return e.some(i=>!_f(n,t,i)||!(ir(i)!==G)?!1:!(r!==void 0&&ir(i)===r))}function AN(n,t,e){return e.some(r=>_f(n,t,r))}function _f(n,t,e){return(n.hasChildren()||t.length>0)&&e.pathMatch==="full"?!1:e.path===""}function ON(n,t,e){return t.length===0&&!n.children[e]}var _y=class{};async function NN(n,t,e,r,i,o,s="emptyOnly",a){return new Cy(n,t,e,r,i,s,o,a).recognize()}var PN=31,Cy=class{injector;configLoader;rootComponentType;config;urlTree;paramsInheritanceStrategy;urlSerializer;abortSignal;applyRedirects;absoluteRedirectCount=0;allowRedirects=!0;constructor(t,e,r,i,o,s,a,l){this.injector=t,this.configLoader=e,this.rootComponentType=r,this.config=i,this.urlTree=o,this.paramsInheritanceStrategy=s,this.urlSerializer=a,this.abortSignal=l,this.applyRedirects=new vy(this.urlSerializer,this.urlTree)}noMatchError(t){return new S(4002,`'${t.segmentGroup}'`)}async recognize(){let t=Uw(this.urlTree.root,[],[],this.config).segmentGroup,{children:e,rootSnapshot:r}=await this.match(t),i=new un(r,e),o=new jl("",i),s=tT(r,[],this.urlTree.queryParams,this.urlTree.fragment);return s.queryParams=this.urlTree.queryParams,o.url=this.urlSerializer.serialize(s),{state:o,tree:s}}async match(t){let e=new $s([],Object.freeze({}),Object.freeze(g({},this.urlTree.queryParams)),this.urlTree.fragment,Object.freeze({}),G,this.rootComponentType,null,{},this.injector);try{return{children:await this.processSegmentGroup(this.injector,this.config,t,G,e),rootSnapshot:e}}catch(r){if(r instanceof Ul)return this.urlTree=r.urlTree,this.match(r.urlTree.root);throw r instanceof ni?this.noMatchError(r):r}}async processSegmentGroup(t,e,r,i,o){if(r.segments.length===0&&r.hasChildren())return this.processChildren(t,e,r,o);let s=await this.processSegment(t,e,r,r.segments,i,!0,o);return s instanceof un?[s]:[]}async processChildren(t,e,r,i){let o=[];for(let l of Object.keys(r.children))l==="primary"?o.unshift(l):o.push(l);let s=[];for(let l of o){let c=r.children[l],u=IN(e,l),d=await this.processSegmentGroup(t,u,c,l,i);s.push(...d)}let a=_T(s);return LN(a),a}async processSegment(t,e,r,i,o,s,a){for(let l of e)try{return await this.processSegmentAgainstRoute(l._injector??t,e,l,r,i,o,s,a)}catch(c){if(c instanceof ni||pT(c))continue;throw c}if(ON(r,i,o))return new _y;throw new ni(r)}async processSegmentAgainstRoute(t,e,r,i,o,s,a,l){if(ir(r)!==s&&(s===G||!_f(i,o,r)))throw new ni(i);if(r.redirectTo===void 0)return this.matchSegmentAgainstRoute(t,i,r,o,s,l);if(this.allowRedirects&&a)return this.expandSegmentAgainstRouteUsingRedirect(t,i,e,r,o,s,l);throw new ni(i)}async expandSegmentAgainstRouteUsingRedirect(t,e,r,i,o,s,a){let{matched:l,parameters:c,consumedSegments:u,positionalParamSegments:d,remainingSegments:h}=bT(e,i,o);if(!l)throw new ni(e);typeof i.redirectTo=="string"&&i.redirectTo[0]==="/"&&(this.absoluteRedirectCount++,this.absoluteRedirectCount>PN&&(this.allowRedirects=!1));let p=this.createSnapshot(t,i,o,c,a);if(this.abortSignal.aborted)throw new Error(this.abortSignal.reason);let m=await this.applyRedirects.applyRedirectCommands(u,i.redirectTo,d,vT(p),t),_=await this.applyRedirects.lineralizeSegments(i,m);return this.processSegment(t,r,e,_.concat(h),s,!1,a)}createSnapshot(t,e,r,i,o){let s=new $s(r,i,Object.freeze(g({},this.urlTree.queryParams)),this.urlTree.fragment,BN(e),ir(e),e.component??e._loadedComponent??null,e,jN(e),t),a=Dy(s,o,this.paramsInheritanceStrategy);return s.params=Object.freeze(a.params),s.data=Object.freeze(a.data),s}async matchSegmentAgainstRoute(t,e,r,i,o,s){if(this.abortSignal.aborted)throw new Error(this.abortSignal.reason);let a=ze=>this.createSnapshot(t,r,ze.consumedSegments,ze.parameters,s),l=await ef(MN(e,r,i,t,this.urlSerializer,a,this.abortSignal));if(r.path==="**"&&(e.children={}),!l?.matched)throw new ni(e);t=r._injector??t;let{routes:c}=await this.getChildConfig(t,r,i),u=r._loadedInjector??t,{parameters:d,consumedSegments:h,remainingSegments:p}=l,m=this.createSnapshot(t,r,h,d,s),{segmentGroup:_,slicedSegments:M}=Uw(e,h,p,c,o);if(M.length===0&&_.hasChildren()){let ze=await this.processChildren(u,c,_,m);return new un(m,ze)}if(c.length===0&&M.length===0)return new un(m,[]);let k=ir(r)===o,ae=await this.processSegment(u,c,_,M,k?G:o,!0,m);return new un(m,ae instanceof un?[ae]:[])}async getChildConfig(t,e,r){if(e.children)return{routes:e.children,injector:t};if(e.loadChildren){if(e._loadedRoutes!==void 0){let o=e._loadedNgModuleFactory;return o&&!e._loadedInjector&&(e._loadedInjector=o.create(t).injector),{routes:e._loadedRoutes,injector:e._loadedInjector}}if(this.abortSignal.aborted)throw new Error(this.abortSignal.reason);if(await ef(CN(t,e,r,this.urlSerializer,this.abortSignal))){let o=await this.configLoader.loadChildren(t,e);return e._loadedRoutes=o.routes,e._loadedInjector=o.injector,e._loadedNgModuleFactory=o.factory,o}throw wN(e)}return{routes:[],injector:t}}};function LN(n){n.sort((t,e)=>t.value.outlet===G?-1:e.value.outlet===G?1:t.value.outlet.localeCompare(e.value.outlet))}function FN(n){let t=n.value.routeConfig;return t&&t.path===""}function _T(n){let t=[],e=new Set;for(let r of n){if(!FN(r)){t.push(r);continue}let i=t.find(o=>r.value.routeConfig===o.value.routeConfig);i!==void 0?(i.children.push(...r.children),e.add(i)):t.push(r)}for(let r of e){let i=_T(r.children);t.push(new un(r.value,i))}return t.filter(r=>!e.has(r))}function BN(n){return n.data||{}}function jN(n){return n.resolve||{}}function VN(n,t,e,r,i,o,s){return Ot(async a=>{let{state:l,tree:c}=await NN(n,t,e,r,a.extractedUrl,i,o,s);return W(g({},a),{targetSnapshot:l,urlAfterRedirects:c})})}function UN(n){return Ot(t=>{let{targetSnapshot:e,guards:{canActivateChecks:r}}=t;if(!r.length)return I(t);let i=new Set(r.map(a=>a.route)),o=new Set;for(let a of i)if(!o.has(a))for(let l of CT(a))o.add(l);let s=0;return qe(o).pipe(iu(a=>i.has(a)?$N(a,e,n):(a.data=Dy(a,a.parent,n).resolve,I(void 0))),ot(()=>s++),ou(1),Ot(a=>s===o.size?I(t):Se))})}function CT(n){let t=n.children.map(e=>CT(e)).flat();return[n,...t]}function $N(n,t,e){let r=n.routeConfig,i=n._resolve;return r?.title!==void 0&&!cT(r)&&(i[$l]=r.title),Aa(()=>(n.data=Dy(n,n.parent,e).resolve,HN(i,n,t).pipe(se(o=>(n._resolvedData=o,n.data=g(g({},n.data),o),null)))))}function HN(n,t,e){let r=ly(n);if(r.length===0)return I({});let i={};return qe(r).pipe(Ot(o=>zN(n[o],t,e).pipe(Vr(),ot(s=>{if(s instanceof Hs)throw gf(new Li,s);i[o]=s}))),ou(1),se(()=>i),Br(o=>pT(o)?Se:Xh(o)))}function zN(n,t,e){let r=t._environmentInjector,i=qs(n,r),o=i.resolve?i.resolve(t,e):St(r,()=>i(t,e));return Po(o)}function $w(n){return dt(t=>{let e=n(t);return e?qe(e).pipe(se(()=>t)):I(t)})}var Sy=(()=>{class n{buildTitle(e){let r,i=e.root;for(;i!==void 0;)r=this.getResolvedTitleForRoute(i)??r,i=i.children.find(o=>o.outlet===G);return r}getResolvedTitleForRoute(e){return e.data[$l]}static \u0275fac=function(r){return new(r||n)};static \u0275prov=y({token:n,factory:()=>f(DT),providedIn:"root"})}return n})(),DT=(()=>{class n extends Sy{title;constructor(e){super(),this.title=e}updateTitle(e){let r=this.buildTitle(e);r!==void 0&&this.title.setTitle(r)}static \u0275fac=function(r){return new(r||n)(z(Pw))};static \u0275prov=y({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})(),Ks=new v("",{factory:()=>({})}),Wl=new v(""),ET=(()=>{class n{componentLoaders=new WeakMap;childrenLoaders=new WeakMap;onLoadStartListener;onLoadEndListener;compiler=f(Eg);async loadComponent(e,r){if(this.componentLoaders.get(r))return this.componentLoaders.get(r);if(r._loadedComponent)return Promise.resolve(r._loadedComponent);this.onLoadStartListener&&this.onLoadStartListener(r);let i=(async()=>{try{let o=await Ww(St(e,()=>r.loadComponent())),s=await ST(TT(o));return this.onLoadEndListener&&this.onLoadEndListener(r),r._loadedComponent=s,s}finally{this.componentLoaders.delete(r)}})();return this.componentLoaders.set(r,i),i}loadChildren(e,r){if(this.childrenLoaders.get(r))return this.childrenLoaders.get(r);if(r._loadedRoutes)return Promise.resolve({routes:r._loadedRoutes,injector:r._loadedInjector});this.onLoadStartListener&&this.onLoadStartListener(r);let i=(async()=>{try{let o=await wT(r,this.compiler,e,this.onLoadEndListener);return r._loadedRoutes=o.routes,r._loadedInjector=o.injector,r._loadedNgModuleFactory=o.factory,o}finally{this.childrenLoaders.delete(r)}})();return this.childrenLoaders.set(r,i),i}static \u0275fac=function(r){return new(r||n)};static \u0275prov=y({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})();async function wT(n,t,e,r){let i=await Ww(St(e,()=>n.loadChildren())),o=await ST(TT(i)),s;o instanceof bd||Array.isArray(o)?s=o:s=await t.compileModuleAsync(o),r&&r(n);let a,l,c=!1,u;return Array.isArray(s)?(l=s,c=!0):(a=s.create(e).injector,u=s,l=a.get(Wl,[],{optional:!0,self:!0}).flat()),{routes:l.map(Ty),injector:a,factory:u}}function WN(n){return n&&typeof n=="object"&&"default"in n}function TT(n){return WN(n)?n.default:n}async function ST(n){return n}var Cf=(()=>{class n{static \u0275fac=function(r){return new(r||n)};static \u0275prov=y({token:n,factory:()=>f(GN),providedIn:"root"})}return n})(),GN=(()=>{class n{shouldProcessUrl(e){return!0}extract(e){return e}merge(e,r){return e}static \u0275fac=function(r){return new(r||n)};static \u0275prov=y({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})(),IT=new v("");var qN=()=>{},MT=new v(""),xT=(()=>{class n{currentNavigation=ee(null,{equal:()=>!1});currentTransition=null;lastSuccessfulNavigation=ee(null);events=new C;transitionAbortWithErrorSubject=new C;configLoader=f(ET);environmentInjector=f(ke);destroyRef=f(tt);urlSerializer=f(Ws);rootContexts=f(Gs);location=f(ei);inputBindingEnabled=f(bf,{optional:!0})!==null;titleStrategy=f(Sy);options=f(Ks,{optional:!0})||{};paramsInheritanceStrategy=this.options.paramsInheritanceStrategy||"emptyOnly";urlHandlingStrategy=f(Cf);createViewTransition=f(IT,{optional:!0});navigationErrorHandler=f(MT,{optional:!0});navigationId=0;get hasRequestedNavigation(){return this.navigationId!==0}transitions;afterPreactivation=()=>I(void 0);rootComponentType=null;destroyed=!1;constructor(){let e=i=>this.events.next(new lf(i)),r=i=>this.events.next(new cf(i));this.configLoader.onLoadEndListener=r,this.configLoader.onLoadStartListener=e,this.destroyRef.onDestroy(()=>{this.destroyed=!0})}complete(){this.transitions?.complete()}handleNavigationRequest(e){let r=++this.navigationId;$e(()=>{this.transitions?.next(W(g({},e),{extractedUrl:this.urlHandlingStrategy.extract(e.rawUrl),targetSnapshot:null,targetRouterState:null,guards:{canActivateChecks:[],canDeactivateChecks:[]},guardsResult:null,id:r,routesRecognizeHandler:{},beforeActivateHandler:{}}))})}setupNavigations(e){return this.transitions=new Ge(null),this.transitions.pipe(ye(r=>r!==null),dt(r=>{let i=!1,o=new AbortController,s=()=>!i&&this.currentTransition?.id===r.id;return I(r).pipe(dt(a=>{if(this.navigationId>r.id)return this.cancelNavigationTransition(r,"",kt.SupersededByNewNavigation),Se;this.currentTransition=r;let l=this.lastSuccessfulNavigation();this.currentNavigation.set({id:a.id,initialUrl:a.rawUrl,extractedUrl:a.extractedUrl,targetBrowserUrl:typeof a.extras.browserUrl=="string"?this.urlSerializer.parse(a.extras.browserUrl):a.extras.browserUrl,trigger:a.source,extras:a.extras,previousNavigation:l?W(g({},l),{previousNavigation:null}):null,abort:()=>o.abort(),routesRecognizeHandler:a.routesRecognizeHandler,beforeActivateHandler:a.beforeActivateHandler});let c=!e.navigated||this.isUpdatingInternalState()||this.isUpdatedBrowserUrl(),u=a.extras.onSameUrlNavigation??e.onSameUrlNavigation;if(!c&&u!=="reload")return this.events.next(new ri(a.id,this.urlSerializer.serialize(a.rawUrl),"",Pl.IgnoredSameUrlNavigation)),a.resolve(!1),Se;if(this.urlHandlingStrategy.shouldProcessUrl(a.rawUrl))return I(a).pipe(dt(d=>(this.events.next(new Oo(d.id,this.urlSerializer.serialize(d.extractedUrl),d.source,d.restoredState)),d.id!==this.navigationId?Se:Promise.resolve(d))),VN(this.environmentInjector,this.configLoader,this.rootComponentType,e.config,this.urlSerializer,this.paramsInheritanceStrategy,o.signal),ot(d=>{r.targetSnapshot=d.targetSnapshot,r.urlAfterRedirects=d.urlAfterRedirects,this.currentNavigation.update(h=>(h.finalUrl=d.urlAfterRedirects,h)),this.events.next(new Fl)}),dt(d=>qe(r.routesRecognizeHandler.deferredHandle??I(void 0)).pipe(se(()=>d))),ot(()=>{let d=new Ll(a.id,this.urlSerializer.serialize(a.extractedUrl),this.urlSerializer.serialize(a.urlAfterRedirects),a.targetSnapshot);this.events.next(d)}));if(c&&this.urlHandlingStrategy.shouldProcessUrl(a.currentRawUrl)){let{id:d,extractedUrl:h,source:p,restoredState:m,extras:_}=a,M=new Oo(d,this.urlSerializer.serialize(h),p,m);this.events.next(M);let k=aT(this.rootComponentType,this.environmentInjector).snapshot;return this.currentTransition=r=W(g({},a),{targetSnapshot:k,urlAfterRedirects:h,extras:W(g({},_),{skipLocationChange:!1,replaceUrl:!1})}),this.currentNavigation.update(ae=>(ae.finalUrl=h,ae)),I(r)}else return this.events.next(new ri(a.id,this.urlSerializer.serialize(a.extractedUrl),"",Pl.IgnoredByUrlHandlingStrategy)),a.resolve(!1),Se}),se(a=>{let l=new rf(a.id,this.urlSerializer.serialize(a.extractedUrl),this.urlSerializer.serialize(a.urlAfterRedirects),a.targetSnapshot);return this.events.next(l),this.currentTransition=r=W(g({},a),{guards:nN(a.targetSnapshot,a.currentSnapshot,this.rootContexts)}),r}),hN(a=>this.events.next(a)),dt(a=>{if(r.guardsResult=a.guardsResult,a.guardsResult&&typeof a.guardsResult!="boolean")throw gf(this.urlSerializer,a.guardsResult);let l=new of(a.id,this.urlSerializer.serialize(a.extractedUrl),this.urlSerializer.serialize(a.urlAfterRedirects),a.targetSnapshot,!!a.guardsResult);if(this.events.next(l),!s())return Se;if(!a.guardsResult)return this.cancelNavigationTransition(a,"",kt.GuardRejected),Se;if(a.guards.canActivateChecks.length===0)return I(a);let c=new sf(a.id,this.urlSerializer.serialize(a.extractedUrl),this.urlSerializer.serialize(a.urlAfterRedirects),a.targetSnapshot);if(this.events.next(c),!s())return Se;let u=!1;return I(a).pipe(UN(this.paramsInheritanceStrategy),ot({next:()=>{u=!0;let d=new af(a.id,this.urlSerializer.serialize(a.extractedUrl),this.urlSerializer.serialize(a.urlAfterRedirects),a.targetSnapshot);this.events.next(d)},complete:()=>{u||this.cancelNavigationTransition(a,"",kt.NoDataFromResolver)}}))}),$w(a=>{let l=u=>{let d=[];if(u.routeConfig?._loadedComponent)u.component=u.routeConfig?._loadedComponent;else if(u.routeConfig?.loadComponent){let h=u._environmentInjector;d.push(this.configLoader.loadComponent(h,u.routeConfig).then(p=>{u.component=p}))}for(let h of u.children)d.push(...l(h));return d},c=l(a.targetSnapshot.root);return c.length===0?I(a):qe(Promise.all(c).then(()=>a))}),$w(()=>this.afterPreactivation()),dt(()=>{let{currentSnapshot:a,targetSnapshot:l}=r,c=this.createViewTransition?.(this.environmentInjector,a.root,l.root);return c?qe(c).pipe(se(()=>r)):I(r)}),ut(1),dt(a=>{let l=QO(e.routeReuseStrategy,a.targetSnapshot,a.currentRouterState);this.currentTransition=r=a=W(g({},a),{targetRouterState:l}),this.currentNavigation.update(u=>(u.targetRouterState=l,u)),this.events.next(new Vs);let c=r.beforeActivateHandler.deferredHandle;return c?qe(c.then(()=>a)):I(a)}),ot(a=>{new yy(e.routeReuseStrategy,r.targetRouterState,r.currentRouterState,l=>this.events.next(l),this.inputBindingEnabled).activate(this.rootContexts),s()&&(i=!0,this.currentNavigation.update(l=>(l.abort=qN,l)),this.lastSuccessfulNavigation.set($e(this.currentNavigation)),this.events.next(new Mr(a.id,this.urlSerializer.serialize(a.extractedUrl),this.urlSerializer.serialize(a.urlAfterRedirects))),this.titleStrategy?.updateTitle(a.targetRouterState.snapshot),a.resolve(!0))}),Q(mT(o.signal).pipe(ye(()=>!i&&!r.targetRouterState),ot(()=>{this.cancelNavigationTransition(r,o.signal.reason+"",kt.Aborted)}))),ot({complete:()=>{i=!0}}),Q(this.transitionAbortWithErrorSubject.pipe(ot(a=>{throw a}))),Qh(()=>{o.abort(),i||this.cancelNavigationTransition(r,"",kt.SupersededByNewNavigation),this.currentTransition?.id===r.id&&(this.currentNavigation.set(null),this.currentTransition=null)}),Br(a=>{if(i=!0,this.destroyed)return r.resolve(!1),Se;if(hT(a))this.events.next(new Rn(r.id,this.urlSerializer.serialize(r.extractedUrl),a.message,a.cancellationCode)),tN(a)?this.events.next(new Us(a.url,a.navigationBehaviorOptions)):r.resolve(!1);else{let l=new No(r.id,this.urlSerializer.serialize(r.extractedUrl),a,r.targetSnapshot??void 0);try{let c=St(this.environmentInjector,()=>this.navigationErrorHandler?.(l));if(c instanceof Hs){let{message:u,cancellationCode:d}=gf(this.urlSerializer,c);this.events.next(new Rn(r.id,this.urlSerializer.serialize(r.extractedUrl),u,d)),this.events.next(new Us(c.redirectTo,c.navigationBehaviorOptions))}else throw this.events.next(l),a}catch(c){this.options.resolveNavigationPromiseOnError?r.resolve(!1):r.reject(c)}}return Se}))}))}cancelNavigationTransition(e,r,i){let o=new Rn(e.id,this.urlSerializer.serialize(e.extractedUrl),r,i);this.events.next(o),e.resolve(!1)}isUpdatingInternalState(){return this.currentTransition?.extractedUrl.toString()!==this.currentTransition?.currentUrlTree.toString()}isUpdatedBrowserUrl(){let e=this.urlHandlingStrategy.extract(this.urlSerializer.parse(this.location.path(!0))),r=$e(this.currentNavigation),i=r?.targetBrowserUrl??r?.extractedUrl;return e.toString()!==i?.toString()&&!r?.extras.skipLocationChange}static \u0275fac=function(r){return new(r||n)};static \u0275prov=y({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})();function KN(n){return n!==Al}var RT=new v("");var kT=(()=>{class n{static \u0275fac=function(r){return new(r||n)};static \u0275prov=y({token:n,factory:()=>f(YN),providedIn:"root"})}return n})(),vf=class{shouldDetach(t){return!1}store(t,e){}shouldAttach(t){return!1}retrieve(t){return null}shouldReuseRoute(t,e){return t.routeConfig===e.routeConfig}shouldDestroyInjector(t){return!0}},YN=(()=>{class n extends vf{static \u0275fac=(()=>{let e;return function(i){return(e||(e=Sn(n)))(i||n)}})();static \u0275prov=y({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})(),Df=(()=>{class n{urlSerializer=f(Ws);options=f(Ks,{optional:!0})||{};canceledNavigationResolution=this.options.canceledNavigationResolution||"replace";location=f(ei);urlHandlingStrategy=f(Cf);urlUpdateStrategy=this.options.urlUpdateStrategy||"deferred";currentUrlTree=new dn;getCurrentUrlTree(){return this.currentUrlTree}rawUrlTree=this.currentUrlTree;getRawUrlTree(){return this.rawUrlTree}createBrowserPath({finalUrl:e,initialUrl:r,targetBrowserUrl:i}){let o=e!==void 0?this.urlHandlingStrategy.merge(e,r):r,s=i??o;return s instanceof dn?this.urlSerializer.serialize(s):s}routerUrlState(e){return e?.targetBrowserUrl===void 0||e?.finalUrl===void 0?{}:{\u0275routerUrl:this.urlSerializer.serialize(e.finalUrl)}}commitTransition({targetRouterState:e,finalUrl:r,initialUrl:i}){r&&e?(this.currentUrlTree=r,this.rawUrlTree=this.urlHandlingStrategy.merge(r,i),this.routerState=e):this.rawUrlTree=i}routerState=aT(null,f(ke));getRouterState(){return this.routerState}_stateMemento=this.createStateMemento();get stateMemento(){return this._stateMemento}updateStateMemento(){this._stateMemento=this.createStateMemento()}createStateMemento(){return{rawUrlTree:this.rawUrlTree,currentUrlTree:this.currentUrlTree,routerState:this.routerState}}restoredState(){return this.location.getState()}static \u0275fac=function(r){return new(r||n)};static \u0275prov=y({token:n,factory:()=>f(ZN),providedIn:"root"})}return n})(),ZN=(()=>{class n extends Df{currentPageId=0;lastSuccessfulId=-1;get browserPageId(){return this.canceledNavigationResolution!=="computed"?this.currentPageId:this.restoredState()?.\u0275routerPageId??this.currentPageId}registerNonRouterCurrentEntryChangeListener(e){return this.location.subscribe(r=>{r.type==="popstate"&&setTimeout(()=>{e(r.url,r.state,"popstate",{replaceUrl:!0})})})}handleRouterEvent(e,r){e instanceof Oo?this.updateStateMemento():e instanceof ri?this.commitTransition(r):e instanceof Ll?this.urlUpdateStrategy==="eager"&&(r.extras.skipLocationChange||this.setBrowserUrl(this.createBrowserPath(r),r)):e instanceof Vs?(this.commitTransition(r),this.urlUpdateStrategy==="deferred"&&!r.extras.skipLocationChange&&this.setBrowserUrl(this.createBrowserPath(r),r)):e instanceof Rn&&!sT(e)?this.restoreHistory(r):e instanceof No?this.restoreHistory(r,!0):e instanceof Mr&&(this.lastSuccessfulId=e.id,this.currentPageId=this.browserPageId)}setBrowserUrl(e,r){let{extras:i,id:o}=r,{replaceUrl:s,state:a}=i;if(this.location.isCurrentPathEqualTo(e)||s){let l=this.browserPageId,c=g(g({},a),this.generateNgRouterState(o,l,r));this.location.replaceState(e,"",c)}else{let l=g(g({},a),this.generateNgRouterState(o,this.browserPageId+1,r));this.location.go(e,"",l)}}restoreHistory(e,r=!1){if(this.canceledNavigationResolution==="computed"){let i=this.browserPageId,o=this.currentPageId-i;o!==0?this.location.historyGo(o):this.getCurrentUrlTree()===e.finalUrl&&o===0&&(this.resetInternalState(e),this.resetUrlToCurrentUrlTree())}else this.canceledNavigationResolution==="replace"&&(r&&this.resetInternalState(e),this.resetUrlToCurrentUrlTree())}resetInternalState({finalUrl:e}){this.routerState=this.stateMemento.routerState,this.currentUrlTree=this.stateMemento.currentUrlTree,this.rawUrlTree=this.urlHandlingStrategy.merge(this.currentUrlTree,e??this.rawUrlTree)}resetUrlToCurrentUrlTree(){this.location.replaceState(this.urlSerializer.serialize(this.getRawUrlTree()),"",this.generateNgRouterState(this.lastSuccessfulId,this.currentPageId))}generateNgRouterState(e,r,i){return this.canceledNavigationResolution==="computed"?g({navigationId:e,\u0275routerPageId:r},this.routerUrlState(i)):g({navigationId:e},this.routerUrlState(i))}static \u0275fac=(()=>{let e;return function(i){return(e||(e=Sn(n)))(i||n)}})();static \u0275prov=y({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})();function Iy(n,t){n.events.pipe(ye(e=>e instanceof Mr||e instanceof Rn||e instanceof No||e instanceof ri),se(e=>e instanceof Mr||e instanceof ri?0:(e instanceof Rn?e.code===kt.Redirect||e.code===kt.SupersededByNewNavigation:!1)?2:1),ye(e=>e!==2),ut(1)).subscribe(()=>{t()})}var Ys=(()=>{class n{get currentUrlTree(){return this.stateManager.getCurrentUrlTree()}get rawUrlTree(){return this.stateManager.getRawUrlTree()}disposed=!1;nonRouterCurrentEntryChangeSubscription;console=f(gg);stateManager=f(Df);options=f(Ks,{optional:!0})||{};pendingTasks=f(ki);urlUpdateStrategy=this.options.urlUpdateStrategy||"deferred";navigationTransitions=f(xT);urlSerializer=f(Ws);location=f(ei);urlHandlingStrategy=f(Cf);injector=f(ke);_events=new C;get events(){return this._events}get routerState(){return this.stateManager.getRouterState()}navigated=!1;routeReuseStrategy=f(kT);injectorCleanup=f(RT,{optional:!0});onSameUrlNavigation=this.options.onSameUrlNavigation||"ignore";config=f(Wl,{optional:!0})?.flat()??[];componentInputBindingEnabled=!!f(bf,{optional:!0});currentNavigation=this.navigationTransitions.currentNavigation.asReadonly();constructor(){this.resetConfig(this.config),this.navigationTransitions.setupNavigations(this).subscribe({error:e=>{}}),this.subscribeToNavigationEvents()}eventsSubscription=new H;subscribeToNavigationEvents(){let e=this.navigationTransitions.events.subscribe(r=>{try{let i=this.navigationTransitions.currentTransition,o=$e(this.navigationTransitions.currentNavigation);if(i!==null&&o!==null){if(this.stateManager.handleRouterEvent(r,o),r instanceof Rn&&r.code!==kt.Redirect&&r.code!==kt.SupersededByNewNavigation)this.navigated=!0;else if(r instanceof Mr)this.navigated=!0,this.injectorCleanup?.(this.routeReuseStrategy,this.routerState,this.config);else if(r instanceof Us){let s=r.navigationBehaviorOptions,a=this.urlHandlingStrategy.merge(r.url,i.currentRawUrl),l=g({scroll:i.extras.scroll,browserUrl:i.extras.browserUrl,info:i.extras.info,skipLocationChange:i.extras.skipLocationChange,replaceUrl:i.extras.replaceUrl||this.urlUpdateStrategy==="eager"||KN(i.source)},s);this.scheduleNavigation(a,Al,null,l,{resolve:i.resolve,reject:i.reject,promise:i.promise})}}ZO(r)&&this._events.next(r)}catch(i){this.navigationTransitions.transitionAbortWithErrorSubject.next(i)}});this.eventsSubscription.add(e)}resetRootComponentType(e){this.routerState.root.component=e,this.navigationTransitions.rootComponentType=e}initialNavigation(){this.setUpLocationChangeListener(),this.navigationTransitions.hasRequestedNavigation||this.navigateToSyncWithBrowser(this.location.path(!0),Al,this.stateManager.restoredState(),{replaceUrl:!0})}setUpLocationChangeListener(){this.nonRouterCurrentEntryChangeSubscription??=this.stateManager.registerNonRouterCurrentEntryChangeListener((e,r,i,o)=>{this.navigateToSyncWithBrowser(e,i,r,o)})}navigateToSyncWithBrowser(e,r,i,o){let s=i?.navigationId?i:null,a=i?.\u0275routerUrl??e;if(i?.\u0275routerUrl&&(o=W(g({},o),{browserUrl:e})),i){let c=g({},i);delete c.navigationId,delete c.\u0275routerPageId,delete c.\u0275routerUrl,Object.keys(c).length!==0&&(o.state=c)}let l=this.parseUrl(a);this.scheduleNavigation(l,r,s,o).catch(c=>{this.disposed||this.injector.get(En)(c)})}get url(){return this.serializeUrl(this.currentUrlTree)}getCurrentNavigation(){return $e(this.navigationTransitions.currentNavigation)}get lastSuccessfulNavigation(){return this.navigationTransitions.lastSuccessfulNavigation}resetConfig(e){this.config=e.map(Ty),this.navigated=!1}ngOnDestroy(){this.dispose()}dispose(){this._events.unsubscribe(),this.navigationTransitions.complete(),this.nonRouterCurrentEntryChangeSubscription?.unsubscribe(),this.nonRouterCurrentEntryChangeSubscription=void 0,this.disposed=!0,this.eventsSubscription.unsubscribe()}createUrlTree(e,r={}){let{relativeTo:i,queryParams:o,fragment:s,queryParamsHandling:a,preserveFragment:l}=r,c=l?this.currentUrlTree.fragment:s,u=null;switch(a??this.options.defaultQueryParamsHandling){case"merge":u=g(g({},this.currentUrlTree.queryParams),o);break;case"preserve":u=this.currentUrlTree.queryParams;break;default:u=o||null}u!==null&&(u=this.removeEmptyProps(u));let d;try{let h=i?i.snapshot:this.routerState.snapshot.root;d=nT(h)}catch{(typeof e[0]!="string"||e[0][0]!=="/")&&(e=[]),d=this.currentUrlTree.root}return rT(d,e,u,c??null,this.urlSerializer)}navigateByUrl(e,r={skipLocationChange:!1}){let i=Fi(e)?e:this.parseUrl(e),o=this.urlHandlingStrategy.merge(i,this.rawUrlTree);return this.scheduleNavigation(o,Al,null,r)}navigate(e,r={skipLocationChange:!1}){return XN(e),this.navigateByUrl(this.createUrlTree(e,r),r)}serializeUrl(e){return this.urlSerializer.serialize(e)}parseUrl(e){try{return this.urlSerializer.parse(e)}catch{return this.console.warn(Ei(4018,!1)),this.urlSerializer.parse("/")}}isActive(e,r){let i;if(r===!0?i=g({},qw):r===!1?i=g({},cy):i=g(g({},cy),r),Fi(e))return Lw(this.currentUrlTree,e,i);let o=this.parseUrl(e);return Lw(this.currentUrlTree,o,i)}removeEmptyProps(e){return Object.entries(e).reduce((r,[i,o])=>(o!=null&&(r[i]=o),r),{})}scheduleNavigation(e,r,i,o,s){if(this.disposed)return Promise.resolve(!1);let a,l,c;s?(a=s.resolve,l=s.reject,c=s.promise):c=new Promise((d,h)=>{a=d,l=h});let u=this.pendingTasks.add();return Iy(this,()=>{queueMicrotask(()=>this.pendingTasks.remove(u))}),this.navigationTransitions.handleNavigationRequest({source:r,restoredState:i,currentUrlTree:this.currentUrlTree,currentRawUrl:this.currentUrlTree,rawUrl:e,extras:o,resolve:a,reject:l,promise:c,currentSnapshot:this.routerState.snapshot,currentRouterState:this.routerState}),c.catch(Promise.reject.bind(Promise))}static \u0275fac=function(r){return new(r||n)};static \u0275prov=y({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})();function XN(n){for(let t=0;t<n.length;t++)if(n[t]==null)throw new S(4008,!1)}var eP=(()=>{class n{router=f(Ys);stateManager=f(Df);fragment=ee("");queryParams=ee({});path=ee("");serializer=f(Ws);constructor(){this.updateState(),this.router.events?.subscribe(e=>{e instanceof Mr&&this.updateState()})}updateState(){let{fragment:e,root:r,queryParams:i}=this.stateManager.getCurrentUrlTree();this.fragment.set(e),this.queryParams.set(i),this.path.set(this.serializer.serialize(new dn(r)))}static \u0275fac=function(r){return new(r||n)};static \u0275prov=y({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})(),Ef=(()=>{class n{router;route;tabIndexAttribute;renderer;el;locationStrategy;hrefAttributeValue=f(new vl("href"),{optional:!0});reactiveHref=Sg(()=>this.isAnchorElement?this.computeHref(this._urlTree()):this.hrefAttributeValue);get href(){return $e(this.reactiveHref)}set href(e){this.reactiveHref.set(e)}set target(e){this._target.set(e)}get target(){return $e(this._target)}_target=ee(void 0);set queryParams(e){this._queryParams.set(e)}get queryParams(){return $e(this._queryParams)}_queryParams=ee(void 0,{equal:()=>!1});set fragment(e){this._fragment.set(e)}get fragment(){return $e(this._fragment)}_fragment=ee(void 0);set queryParamsHandling(e){this._queryParamsHandling.set(e)}get queryParamsHandling(){return $e(this._queryParamsHandling)}_queryParamsHandling=ee(void 0);set state(e){this._state.set(e)}get state(){return $e(this._state)}_state=ee(void 0,{equal:()=>!1});set info(e){this._info.set(e)}get info(){return $e(this._info)}_info=ee(void 0,{equal:()=>!1});set relativeTo(e){this._relativeTo.set(e)}get relativeTo(){return $e(this._relativeTo)}_relativeTo=ee(void 0);set preserveFragment(e){this._preserveFragment.set(e)}get preserveFragment(){return $e(this._preserveFragment)}_preserveFragment=ee(!1);set skipLocationChange(e){this._skipLocationChange.set(e)}get skipLocationChange(){return $e(this._skipLocationChange)}_skipLocationChange=ee(!1);set replaceUrl(e){this._replaceUrl.set(e)}get replaceUrl(){return $e(this._replaceUrl)}_replaceUrl=ee(!1);isAnchorElement;onChanges=new C;applicationErrorHandler=f(En);options=f(Ks,{optional:!0});reactiveRouterState=f(eP);constructor(e,r,i,o,s,a){this.router=e,this.route=r,this.tabIndexAttribute=i,this.renderer=o,this.el=s,this.locationStrategy=a;let l=s.nativeElement.tagName?.toLowerCase();this.isAnchorElement=l==="a"||l==="area"||!!(typeof customElements=="object"&&customElements.get(l)?.observedAttributes?.includes?.("href"))}setTabIndexIfNotOnNativeEl(e){this.tabIndexAttribute!=null||this.isAnchorElement||this.applyAttributeValue("tabindex",e)}ngOnChanges(e){this.onChanges.next(this)}routerLinkInput=ee(null);set routerLink(e){e==null?(this.routerLinkInput.set(null),this.setTabIndexIfNotOnNativeEl(null)):(Fi(e)?this.routerLinkInput.set(e):this.routerLinkInput.set(Array.isArray(e)?e:[e]),this.setTabIndexIfNotOnNativeEl("0"))}onClick(e,r,i,o,s){let a=this._urlTree();if(a===null||this.isAnchorElement&&(e!==0||r||i||o||s||typeof this.target=="string"&&this.target!="_self"))return!0;let l={skipLocationChange:this.skipLocationChange,replaceUrl:this.replaceUrl,state:this.state,info:this.info};return this.router.navigateByUrl(a,l)?.catch(c=>{this.applicationErrorHandler(c)}),!this.isAnchorElement}ngOnDestroy(){}applyAttributeValue(e,r){let i=this.renderer,o=this.el.nativeElement;r!==null?i.setAttribute(o,e,r):i.removeAttribute(o,e)}_urlTree=nt(()=>{this.reactiveRouterState.path(),this._preserveFragment()&&this.reactiveRouterState.fragment();let e=i=>i==="preserve"||i==="merge";(e(this._queryParamsHandling())||e(this.options?.defaultQueryParamsHandling))&&this.reactiveRouterState.queryParams();let r=this.routerLinkInput();return r===null||!this.router.createUrlTree?null:Fi(r)?r:this.router.createUrlTree(r,{relativeTo:this._relativeTo()!==void 0?this._relativeTo():this.route,queryParams:this._queryParams(),fragment:this._fragment(),queryParamsHandling:this._queryParamsHandling(),preserveFragment:this._preserveFragment()})},{equal:(e,r)=>this.computeHref(e)===this.computeHref(r)});get urlTree(){return $e(this._urlTree)}computeHref(e){return e!==null&&this.locationStrategy?this.locationStrategy?.prepareExternalUrl(this.router.serializeUrl(e))??"":null}static \u0275fac=function(r){return new(r||n)(Mt(Ys),Mt(ii),ll("tabindex"),Mt(Bt),Mt(re),Mt(Tr))};static \u0275dir=le({type:n,selectors:[["","routerLink",""]],hostVars:2,hostBindings:function(r,i){r&1&&Ee("click",function(s){return i.onClick(s.button,s.ctrlKey,s.shiftKey,s.altKey,s.metaKey)}),r&2&&ht("href",i.reactiveHref(),eg)("target",i._target())},inputs:{target:"target",queryParams:"queryParams",fragment:"fragment",queryParamsHandling:"queryParamsHandling",state:"state",info:"info",relativeTo:"relativeTo",preserveFragment:[2,"preserveFragment","preserveFragment",we],skipLocationChange:[2,"skipLocationChange","skipLocationChange",we],replaceUrl:[2,"replaceUrl","replaceUrl",we],routerLink:"routerLink"},features:[Tn]})}return n})();var tP=new v("");function My(n,...t){return Ti([{provide:Wl,multi:!0,useValue:n},[],{provide:ii,useFactory:nP},{provide:Cd,multi:!0,useFactory:iP},t.map(e=>e.\u0275providers)])}function nP(){return f(Ys).routerState.root}function rP(n,t){return{\u0275kind:n,\u0275providers:t}}function iP(){let n=f(ne);return t=>{let e=n.get(ln);if(t!==e.components[0])return;let r=n.get(Ys),i=n.get(oP);n.get(sP)===1&&r.initialNavigation(),n.get(aP,null,{optional:!0})?.setUpPreloading(),n.get(tP,null,{optional:!0})?.init(),r.resetRootComponentType(e.componentTypes[0]),i.closed||(i.next(),i.complete(),i.unsubscribe())}}var oP=new v("",{factory:()=>new C}),sP=new v("",{factory:()=>1});var aP=new v("");function xy(){return rP(6,[{provide:Tr,useClass:jg}])}var AT={get active(){return typeof globalThis.jasmine<"u"||typeof globalThis.jest<"u"||typeof globalThis.vitest<"u"}};var Ry=null,xr={get active(){return Ry===!0},setDevMode(n){if(Ry!==null&&!AT.active)throw new Error("[vault] DevMode has already been initialized.");Ry=n}};var Lo=(n,t)=>{if(!xr.active||typeof globalThis>"u")return;let e=globalThis.sdux??={},r=e.debugWidget??={},i=r.versions??={};i[n]!==t&&(i[n]=t)};var X={CoreAfterTap:"coreAfterTap",CoreBeforeTap:"coreBeforeTap",ReplayGlobalError:"replayGlobalError",CoreError:"coreError",CoreErrorCallback:"coreErrorCallback",CoreState:"coreState",Encrypt:"encrypt",CoreEmitState:"coreEmitState",CoreLicense:"coreLicense",ErrorTransform:"errorTransform",Extension:"extension",Filter:"filter",FromObservable:"fromObservable",FromPromise:"fromPromise",FromStream:"fromStream",Interceptor:"interceptor",Merge:"merge",Operator:"operator",Persist:"persist",Reduce:"reduce",Resolve:"resolve",StepwiseFilter:"stepwiseFilter",StepwiseReducer:"stepwiseReducer",StepwiseResolve:"stepwiseResolve",TabSyncState:"tabSyncState"};var Gl={Error:"error",Warn:"warn",Log:"log",Debug:"debug"};var ky={Off:"off",Error:"error",Warn:"warn",Log:"log",Debug:"debug"};var lP=ky.Off,cP="[vault]";function Ay(n,...t){let e=OT();if(e===ky.Off)return;let r=[Gl.Error,Gl.Warn,Gl.Log,Gl.Debug];r.indexOf(n)<=r.indexOf(e)&&console[n](cP,...t)}var Fo=(...n)=>Ay("error",...n),B=(...n)=>Ay("warn",...n);var E=(...n)=>Ay("debug",...n);function OT(){return lP}var ql=class{constructor(t,e){this.behaviorCtx=e;this.key=t}critical;key;type=X.CoreErrorCallback;destroy(){B(`${this.key} - destroy "noop"`)}reset(){B(`${this.key} - reset "noop"`)}};function ge(n){try{return JSON.stringify(n,uP,2)}catch{return"[unserializable]"}}function uP(n,t){if(typeof t=="function")return"[Function]";if(t instanceof Error)return{message:t.message,stack:t.stack};if(t instanceof Map)return{map:Array.from(t.entries())};if(t instanceof Set)return{set:Array.from(t.values())};try{return JSON.stringify(t),t}catch{return"[Circular]"}}var NT=Symbol.for("BEHAVIOR_META");var Zs="vault::devtools::logging::feature::cell";var or=Symbol.for("VAULT_CLEAR_STATE");var kn=Symbol.for("VAULT_NOOP");function he(n){return function(t){t[NT]=n,n.type!==void 0&&(t.type=n.type),n.key!==void 0&&(t.key=n.key),n.critical!==void 0&&(t.critical=n.critical),n.resolveType!==void 0&&(t.resolveType=n.resolveType),n.wantsConfig!==void 0?t.wantsConfig=n.wantsConfig:t.wantsConfig=!1,n.configKey!==void 0&&(t.configKey=n.configKey),n.needsLicense!==void 0?t.needsLicense=n.needsLicense:t.needsLicense=!1,n.licenseId!==void 0&&(t.licenseId=n.licenseId)}}var hn={HttpResource:"http-resource",Observable:"observable",Promise:"promise",Value:"value"};var Vt={IncomingPipeline:"Incoming Pipeline",FinalizePipeline:"Finalize Pipeline",PipelineError:"Pipeline Error",PipelineDestroy:"Pipeline Destroy",PipelineReset:"Pipeline Reset",AbortController:"Abort Controller",DenyController:"Deny Controller",TabSync:"Tab Sync"};function pe(n,t){return dP("Behavior",n,t)}function dP(n,t,e){let r=i=>i.charAt(0).toUpperCase()+i.slice(1).replace(/[^A-Za-z0-9]/g,"");return`SDUX::${n}::${r(t)}::${r(e)}`}function Kl(n){return!!n&&typeof n=="object"&&typeof n.value=="function"}function _t(n,t){let e=Date.now();return n instanceof Error?{message:n.message||"Unexpected error",details:n.stack,raw:n,timestamp:e,featureCellKey:t}:typeof n=="string"?{message:n,details:n,raw:n,timestamp:e,featureCellKey:t}:{message:"Unexpected error",details:n,raw:n,timestamp:e,featureCellKey:t}}function Oy(n,t=new WeakSet){if(n===null||typeof n!="object")return n;let e=n;if(t.has(e))return n;t.add(e),Object.isFrozen(e)||Object.freeze(e);for(let r of Reflect.ownKeys(e)){let i=Object.getOwnPropertyDescriptor(e,r);i&&"value"in i&&Oy(i.value,t)}return n}var wf=n=>{if(n===null||typeof n!="object"||Object.isFrozen(n))return n;try{if(n instanceof Map||n instanceof Set||n instanceof WeakMap||n instanceof WeakSet)try{return structuredClone(n)}catch{return Oy(n)}return structuredClone(n)}catch{let t=Array.isArray(n)?[...n]:Object.assign(Object.create(Object.getPrototypeOf(n)),n);return Oy(t)}};var Ny=n=>n===kn,Py=n=>n===or;var Xs=n=>n===null,Bi=n=>n===void 0,Tf=n=>!Bi(n),Qs=n=>n==null,Sf=n=>typeof n=="function";var fP=n=>{if(n===null||typeof n!="object")return!1;let t=Object.getPrototypeOf(n);return t===Object.prototype||t===null},Yl=n=>{if(!fP(n))return!1;let t=n,e=Object.prototype.hasOwnProperty.call(t,"loading")||Object.prototype.hasOwnProperty.call(t,"value")||Object.prototype.hasOwnProperty.call(t,"error"),r=Object.keys(t).length===0;return e||r};function Js(n){return!!(n&&typeof n=="object"&&"value"in n&&"isLoading"in n&&"error"in n&&"hasValue"in n)}var Zl,Xl,If,PT,An=class{constructor(t,e){this.behaviorCtx=e;Jo(this,If);T(this,"type",An.type);T(this,"key");T(this,"critical",An.critical);Jo(this,Zl,!1);Jo(this,Xl,!1);this.key=t,Mh(this,Zl,xr.active)}computeMerge(t,e,r){let i=r?.clearUndefined??!1;return E(`${this.key} merge called (clear: ${i})`),Pr(this,If,PT).call(this,t,e),e===void 0&&!i?(E(`${this.key} computeMerge skipped. next="${e}" clear="${i}"`),t):e===void 0&&i?(E(`${this.key} computeMerge skipped. next="${e}" clear="${i}"`),or):Array.isArray(t)&&e!=null?(E(`${this.key} pushing T to State \u2192 return [...curr, next]`),[...t,e]):(E(`${this.key} non-array branch. return next`),e)}destroy(){B(`${this.key} - destroy "noop"`)}reset(){B(`${this.key} - reset "noop"`)}};Zl=new WeakMap,Xl=new WeakMap,If=new WeakSet,PT=function(t,e){if(Array.isArray(t)===!1&&t!=null&&e!==void 0&&t!==kn){let r=`[vault] ${this.key}: ArrayPushMerge received non-array current value. This behavior is intended for array state.`,i=ge({currentType:typeof t,currentValue:t,nextValue:e});Ih(this,Zl)&&!Ih(this,Xl)?(Mh(this,Xl,!0),console.warn(`One Time Warning: ${r}`,i),B(`One Time Warning: ${r}`,i)):B(r,i)}},T(An,"type"),T(An,"key"),T(An,"critical",!1),An=de([he({type:X.Merge,key:pe("Merge","ArrayPush"),critical:!0})],An);var Uy={get active(){return typeof globalThis.jasmine<"u"||typeof globalThis.jest<"u"||typeof globalThis.vitest<"u"}},Ly=null,Ct={get active(){return Ly===!0},setDevMode(n){if(Ly!==null&&!Uy.active)throw new Error("[vault] DevMode has already been initialized.");Ly=n}},Jl=(n,t)=>{if(!Ct.active||typeof globalThis>"u")return;let e=globalThis.sdux??={},r=e.debugWidget??={},i=r.versions??={};i[n]!==t&&(i[n]=t)},hP="@sdux-vault/shared",pP="0.9.1";Jl(hP,pP);var x={CoreAfterTap:"coreAfterTap",CoreBeforeTap:"coreBeforeTap",ReplayGlobalError:"replayGlobalError",CoreError:"coreError",CoreErrorCallback:"coreErrorCallback",CoreState:"coreState",Encrypt:"encrypt",CoreEmitState:"coreEmitState",CoreLicense:"coreLicense",ErrorTransform:"errorTransform",Extension:"extension",Filter:"filter",FromObservable:"fromObservable",FromPromise:"fromPromise",FromStream:"fromStream",Interceptor:"interceptor",Merge:"merge",Operator:"operator",Persist:"persist",Reduce:"reduce",Resolve:"resolve",StepwiseFilter:"stepwiseFilter",StepwiseReducer:"stepwiseReducer",StepwiseResolve:"stepwiseResolve",TabSyncState:"tabSyncState"},Mf={Error:"error",Warn:"warn",Log:"log",Debug:"debug"},LT={Off:"off",Error:"error",Warn:"warn",Log:"log",Debug:"debug"},FT=LT.Off,mP="[vault]";function $y(n,...t){let e=gP();if(e===LT.Off)return;let r=[Mf.Error,Mf.Warn,Mf.Log,Mf.Debug];r.indexOf(n)<=r.indexOf(e)&&console[n](mP,...t)}var Ut=(...n)=>$y("error",...n),He=(...n)=>$y("warn",...n);var Ne=(...n)=>$y("debug",...n);function BT(n){FT=n??"off"}function gP(){return FT}function yP(n){try{return JSON.stringify(n,vP,2)}catch{return"[unserializable]"}}function vP(n,t){if(typeof t=="function")return"[Function]";if(t instanceof Error)return{message:t.message,stack:t.stack};if(t instanceof Map)return{map:Array.from(t.entries())};if(t instanceof Set)return{set:Array.from(t.values())};try{return JSON.stringify(t),t}catch{return"[Circular]"}}var By=class{#t=new Ge(null);constructor(){Ne("[VaultPrivateErrorService] initialized (singleton instance created)")}setError(t){Ne(`[VaultPrivateErrorService] setError() ${yP(t)}`),this.#t.next(t)}getError(){return Ne("[VaultPrivateErrorService] getError() \u2192 observable subscribed"),this.#t.asObservable()}clear(){Ne("[VaultPrivateErrorService] clear() \u2192 error reset to null"),this.#t.next(null)}},Fy=null;function jT(){return Fy?Ne("[VaultPrivateErrorService] returning existing singleton instance"):(Ne("[VaultPrivateErrorService] creating new singleton instance"),Fy=new By),Fy}var kf=Symbol.for("BEHAVIOR_META"),Af=Symbol.for("CONTROLLER_META"),VT="vault::devtools::aggregate:feature::cell",UT="vault::devtools::logging::feature::cell",ec=Symbol.for("VAULT_CLEAR_STATE"),Hy=Symbol.for("VAULT_CONTINUE"),Of=Symbol.for("VAULT_NOOP"),zy=Symbol.for("VAULT_STOP");function $T(n){return function(t){t[kf]=n,n.type!==void 0&&(t.type=n.type),n.key!==void 0&&(t.key=n.key),n.critical!==void 0&&(t.critical=n.critical),n.resolveType!==void 0&&(t.resolveType=n.resolveType),n.wantsConfig!==void 0?t.wantsConfig=n.wantsConfig:t.wantsConfig=!1,n.configKey!==void 0&&(t.configKey=n.configKey),n.needsLicense!==void 0?t.needsLicense=n.needsLicense:t.needsLicense=!1,n.licenseId!==void 0&&(t.licenseId=n.licenseId)}}function Nf(n){return function(t){t[Af]=n,n.type!==void 0&&(t.type=n.type),n.key!==void 0&&(t.key=n.key),n.critical!==void 0&&(t.critical=n.critical),n.wantsConfig!==void 0?t.wantsConfig=n.wantsConfig:t.wantsConfig=!1,n.configKey!==void 0&&(t.configKey=n.configKey),n.needsLicense!==void 0?t.needsLicense=n.needsLicense:t.needsLicense=!1,n.licenseId!==void 0&&(t.licenseId=n.licenseId)}}var bP={Usage:"VaultErrorUsage",VaultError:"VaultError"},Wy={EncryptionIntegrity:"VaultErrorEncryptionIntegrity",License:"VaultErrorLicense",Usage:"VaultErrorUsage",VaultError:"VaultError"},xf=class extends Error{kind;constructor(t,e=Wy.VaultError,r=bP.VaultError){super(t),this.name=e,this.kind=r,Object.setPrototypeOf(this,new.target.prototype);let i=Error;typeof i.captureStackTrace=="function"&&i.captureStackTrace(this,new.target)}};var Gy={Encryption:"VaultErrorEncryption",License:"VaultErrorLicense",Promise:"VaultErrorUsagePromise",PromiseFactoryRequired:"VaultErrorUsagePromiseFactoryRequired",Usage:"VaultErrorUsage"},Ql=class extends xf{constructor(t,e=Gy.License){super(t,Wy.License,e)}},jy=class extends xf{constructor(t,e=Gy.Usage){super(t,Wy.Usage,e)}},Rf=class extends jy{constructor(){super(`Invalid incoming value: Promise detected.

Promises are eager and may resolve or reject before entering the Vault pipeline.

Use the following instead  a DeferredFactory value

This guarantees the promise is created and executed inside the pipeline.`,Gy.Promise)}};var sr={Attempt:"attempt",Failure:"failure",Finalize:"Finalize Pipeline",Success:"success",Vote:"vote"},mt={Abstain:"abstain",Abort:"abort",Deny:"deny"},ji={CoreAbstain:"coreAbstain",Error:"error",License:"license",Policy:"policy",ReplayGlobalError:"replayGlobalError",Stepwise:"stepwise",TabSync:"tabSync"},pn={Abort:"abort",Abstain:"abstain",Deny:"deny"},Jt={End:"end",Notification:"notification",Start:"start",Unknown:"unknown"},At={Conductor:"conductor",Controller:"controller",Lifecycle:"lifecycle",Stage:"stage",Unknown:"unknown"},On={Merge:"merge",Replace:"replace",Initialize:"initialize"},tc={HttpResource:"http-resource",Observable:"observable",Promise:"promise",Value:"value"};function qy(n,t){return HT("Behavior",n,t)}function HT(n,t,e){let r=i=>i.charAt(0).toUpperCase()+i.slice(1).replace(/[^A-Za-z0-9]/g,"");return`SDUX::${n}::${r(t)}::${r(e)}`}function Ky(n){return typeof n!="string"?!1:/^SDUX::(Behavior|Controller)::[A-Z][A-Za-z0-9]*::[A-Z][A-Za-z0-9]*$/.test(n)}function Pf(n,t){return HT("Controller",n,t)}function zT(n){return Ky(n)}function Bo(n,t){let e=Date.now();return n instanceof Error?{message:n.message||"Unexpected error",details:n.stack,raw:n,timestamp:e,featureCellKey:t}:typeof n=="string"?{message:n,details:n,raw:n,timestamp:e,featureCellKey:t}:{message:"Unexpected error",details:n,raw:n,timestamp:e,featureCellKey:t}}function Vy(n,t=new WeakSet){if(n===null||typeof n!="object")return n;let e=n;if(t.has(e))return n;t.add(e),Object.isFrozen(e)||Object.freeze(e);for(let r of Reflect.ownKeys(e)){let i=Object.getOwnPropertyDescriptor(e,r);i&&"value"in i&&Vy(i.value,t)}return n}var me=n=>{if(n===null||typeof n!="object"||Object.isFrozen(n))return n;try{if(n instanceof Map||n instanceof Set||n instanceof WeakMap||n instanceof WeakSet)try{return structuredClone(n)}catch{return Vy(n)}return structuredClone(n)}catch{let t=Array.isArray(n)?[...n]:Object.assign(Object.create(Object.getPrototypeOf(n)),n);return Vy(t)}},Vi=n=>n===Of,jo=n=>n===ec,Lf=n=>n===Hy;var nc=n=>n===void 0,Rr=n=>!nc(n),Ff=n=>n==null,ea=n=>typeof n=="function";var _P=n=>{if(n===null||typeof n!="object")return!1;let t=Object.getPrototypeOf(n);return t===Object.prototype||t===null},WT=n=>{if(!_P(n))return!1;let t=n,e=Object.prototype.hasOwnProperty.call(t,"loading")||Object.prototype.hasOwnProperty.call(t,"value")||Object.prototype.hasOwnProperty.call(t,"error"),r=Object.keys(t).length===0;return e||r};function Yy(n){return!!n&&(typeof n=="object"||typeof n=="function")&&typeof n.then=="function"}function Zy(n){return!!(n&&typeof n=="object"&&"value"in n&&"isLoading"in n&&"error"in n&&"hasValue"in n)}var CP="@sdux-vault/devtools",DP="0.9.1";Jl(CP,DP);var Xy=null;function rv(){return Xy||(Xy=new Jy),Xy}var Jy=class{#t=new C;constructor(){window.sdux??={},window.sdux.vaultEventBus=this}nextPipeline(t){Ct.active&&t&&this.#t.next(t)}pipeline$(){return this.#t.asObservable()}},Vo={Pipeline:"pipeline",System:"system",Unknown:"unknown",User:"ui"},ev=class{sub;events=[];errorCount=0;maxEvents=5e3;sequence=0;lastMonotonicByTrace=new Map;traceRefCount=new Map;lastGlobalTimestamp=0;start(t){let e=rv();if(!e||typeof e.pipeline$!="function"){console.warn("[SDUX] EventBus not available.");return}this.sub=e.pipeline$().subscribe(r=>{let i=this.enrichEvent(r),o=i.traceId??"__unknown";if(this.events.push(i),this.traceRefCount.set(o,(this.traceRefCount.get(o)??0)+1),this.isErrorEvent(i)&&this.errorCount++,this.events.length>this.maxEvents){let s=this.events.shift();s&&(this.isErrorEvent(s)&&(this.errorCount=Math.max(0,this.errorCount-1)),this.evictTrace(s.traceId??"__unknown"))}t?.()})}stop(){this.sub?.unsubscribe(),this.sub=void 0}clear(){this.events=[],this.errorCount=0,this.sequence=0,this.lastMonotonicByTrace.clear(),this.traceRefCount.clear(),this.lastGlobalTimestamp=0}evictTrace(t){let e=(this.traceRefCount.get(t)??1)-1;e<=0?(this.traceRefCount.delete(t),this.lastMonotonicByTrace.delete(t)):this.traceRefCount.set(t,e)}getEvents(){return[...this.events]}getErrorCount(){return this.errorCount}enrichEvent(t){let e=Date.now(),r=typeof performance<"u"&&performance.now?performance.now():0,i=t.traceId??"__unknown",o=this.lastMonotonicByTrace.get(i),s=typeof o=="number"?r-o:0;s<0&&(s=0),this.lastMonotonicByTrace.set(i,r);let a=this.detectScheduler(e),l=this.detectEventLoopPhase(s),c=this.detectSource(t),u=this.detectSource(t),d=this.hashStack();return W(g({},t),{sequenceNumber:++this.sequence,monotonicTimestamp:r,stageDurationMs:s,stackHash:d,scheduler:a,eventLoopPhase:l,latencyCategory:u,source:c})}detectScheduler(t){let e=t-this.lastGlobalTimestamp;return this.lastGlobalTimestamp=t,e<2?"microtask":e<16?"macrotask":"delayed"}detectEventLoopPhase(t){return t===0?"synchronous":t<2?"microtask":t<16?"macrotask":"blocked"}detectSource(t){switch(t.type){case At.Controller:return Vo.User;case At.Stage:return Vo.Pipeline;case At.Lifecycle:case At.Conductor:return Vo.System}return Vo.Unknown}hashStack(){try{let t=new Error().stack??"",e=0;for(let r=0;r<t.length;r++)e=(e<<5)-e+t.charCodeAt(r),e|=0;return`h${Math.abs(e)}`}catch{return"h0"}}isErrorEvent(t){return!!(t.error||typeof t.name=="string"&&t.name.includes("fatal"))}},EP=`
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

`,Qy=null;function wP(){return Qy||(Qy=new tv),Qy}var tv=class{serializeRegistry(){let t=globalThis?.sdux?.debugWidget?.getRegistry?.();if(!t)return;let e={valid:0,pending:0,revoked:0,timeout:0,notRequired:0},r=o=>{let s=String(o??"").toLowerCase();s==="valid"?e.valid++:s==="pending"?e.pending++:s==="revoked"?e.revoked++:s==="timeout"?e.timeout++:(s==="not-required"||s==="notrequired")&&e.notRequired++},i=Array.from(t.values()).map(o=>{let s=o.behaviors?Array.from(o.behaviors.values()):[],a=o.controllers?Array.from(o.controllers.values()):[];for(let l of s)r(l.validLicense);for(let l of a)r(l.validLicense);return{key:o.key,behaviorsRegistered:!!o.behaviorsRegistered,controllersRegistered:!!o.controllersRegistered,fluentApis:o.fluentApis??null,behaviors:s,controllers:a}});return{totalFeatureCells:i.length,licenseSummary:e,featureCells:i}}buildEventStats(t,e){let r=0,i=null,o={},s={},a={},l={},c={},u={},d={},h=[],p={},m=[],_={},M={},k={},ae=[],ze={},Nr=0,Gi=0,ga=0,fi=0,ya=0,va=0,Zo=0,Cb=0,Ch=0,Dh=0,Db=0,Eb=0,Eh={},wh=null,LI=[],wb=new Set,Tb=new Map,Sb=0,Ib=0,ba={},Mb=new Map,xb=new Map,Xo=null,Qo=null,qi={count:0,maxDuration:0};if(Array.isArray(e)&&e.length>0){qi.count=e.length;for(let w of e)w.duration>qi.maxDuration&&(qi.maxDuration=w.duration)}else if(typeof performance<"u"&&performance.getEntriesByType)try{let w=performance.getEntriesByType("longtask");qi.count=w.length;for(let P of w){let ue=P.duration??0;ue>qi.maxDuration&&(qi.maxDuration=ue)}}catch{}for(let w of t){if(!w?.name)continue;o[w.name]=(o[w.name]??0)+1,w.scheduler&&(s[w.scheduler]=(s[w.scheduler]??0)+1),w.eventLoopPhase&&(a[w.eventLoopPhase]=(a[w.eventLoopPhase]??0)+1),(w.error||String(w.name).includes("error"))&&Nr++,String(w.name).includes("abstain")&&ya++,String(w.name).includes("success")&&ga++,String(w.name).includes("noop")&&Gi++;let P=typeof w.monotonicTimestamp=="number"?w.monotonicTimestamp:typeof w.timestamp=="number"?w.timestamp:null;if(P!==null){if(i!==null){let V=P-i;V>r&&(r=V)}i=P}if(P!==null){LI.push(P),(Xo===null||P<Xo)&&(Xo=P),(Qo===null||P>Qo)&&(Qo=P);let V=Math.floor(P/16);_[V]=(_[V]??0)+1;let We=Math.floor(P/1e3);p[We]=(p[We]??0)+1}let ue=w.traceId??"__unknown";typeof w.timestamp=="number"&&(Mb.get(ue)===w.timestamp&&(Sb++,ba[ue]=(ba[ue]??0)+1),Mb.set(ue,w.timestamp)),l[ue]||(l[ue]={eventCount:0,firstTimestamp:P,lastTimestamp:P,durationMs:0,stageBreakdown:{},stageSequence:[]},c[ue]=[],wb.has(ue)&&va++,wb.add(ue));let it=l[ue];it.eventCount++;let gt=w.monotonicTimestamp;if(typeof gt=="number"){let V=xb.get(ue);V===gt&&Ib++,typeof V=="number"&&gt<V&&Zo++,xb.set(ue,gt)}if(P!==null&&(it.firstTimestamp=Math.min(it.firstTimestamp??P,P),it.lastTimestamp=Math.max(it.lastTimestamp??P,P),it.durationMs=it.lastTimestamp-it.firstTimestamp),typeof w.stageDurationMs=="number"){let V=w.name,We=w.stageDurationMs,yn=w.latencyCategory;yn===Vo.User?m.push(We):yn===Vo.System||(fi+=We,u[V]||(u[V]={count:0,total:0,max:0,min:1/0,avg:0,p95:0},d[V]=[]),u[V].count++,u[V].total+=We,u[V].max=Math.max(u[V].max,We),u[V].min=Math.min(u[V].min,We),d[V].push(We),it.stageBreakdown[V]=(it.stageBreakdown[V]??0)+We),yn===Vo.Pipeline&&c[ue].push(We),it.stageSequence.push({stage:V,durationMs:We})}if("payload"in w){let V=this.#t(w.payload);k[ue]=(k[ue]??0)+V,String(w.name).includes("persist")&&ae.push({traceId:ue,size:V}),V>5e4&&Ch++}if("state"in w){Db++;let V=this.#t(w.state);M[ue]=(M[ue]??0)+V,V>1e5&&Ch++;let We=0;try{We=this.#r(w.state)}catch{We=0}Dh=Math.max(Dh,We);let yn="",fr=null;try{yn=JSON.stringify(w.state)}catch(qI){fr=qI?.message||"Unknown serialization error",yn="__STATE_SERIALIZATION_ERROR__"}fr&&(Eb++,Eh[fr]=(Eh[fr]??0)+1);let Gt=this.#n(yn),Ki=Tb.get(ue);Ki===Gt&&Cb++,Ki&&Ki!==Gt&&h.push(Math.abs(V)),Tb.set(ue,Gt)}}let bc=Xo!==null&&Qo!==null?Qo-Xo:0,_c=null,Cc=0;for(let w in l){let P=l[w],ue=P.durationMs??0,it=P.eventCount??0;ze[w]=ue>2e3&&it<3,ue>Cc&&(Cc=ue,_c=w);let gt=c[w]??[];if(gt.length>0){let V=gt.slice().sort((Gt,Ki)=>Gt-Ki),We=gt.reduce((Gt,Ki)=>Gt+Ki,0)/gt.length,yn=V[Math.floor(V.length*.95)]??V[V.length-1],fr=V[V.length-1];P.meanStageDuration=We,P.p95StageDuration=yn,P.maxStageDuration=fr}if(!wh){let V=P.stageSequence??[];if(V.length>=6){let We=V.map(Gt=>Gt.stage),yn=We.slice(0,2).join("|"),fr=0;for(let Gt=0;Gt<We.length-1&&We.slice(Gt,Gt+2).join("|")===yn;Gt+=2)fr++;fr>=3&&(wh={detected:!0,traceId:w,repeatingPattern:yn.split("|"),repetitionCount:fr})}}}let FI=Math.max(0,bc-fi),BI=t.length>0?Sb/t.length:0,jI=t.length>0?Ib/t.length:0,Rb=null,kb=0;for(let w in ba){let P=ba[w];P>kb&&(kb=P,Rb=w)}let VI=bc>0?fi/bc:0;for(let w in u){let P=u[w];P.avg=P.count>0?P.total/P.count:0;let ue=d[w].sort((gt,V)=>gt-V),it=Math.floor(ue.length*.95);P.p95=ue[it]??0}let Dc=null,Ec=0;for(let w in u){let P=u[w].total;P>Ec&&(Ec=P,Dc=w)}let Ab=[];for(let w in l){let P=l[w],ue=P.stageSequence?.length?P.stageSequence:Object.entries(P.stageBreakdown??{}).map(([it,gt])=>({stage:it,durationMs:gt}));Ab.push({traceId:w,stages:ue})}let UI=Object.values(k).reduce((w,P)=>w+P,0)/Math.max(1,Object.keys(k).length),$I=h.length>0?h.reduce((w,P)=>w+P,0)/h.length:0,Ob;if(m.length>0){let w=m.slice().sort((gt,V)=>gt-V),P=m.reduce((gt,V)=>gt+V,0)/m.length,ue=w[Math.floor(w.length*.95)]??w[w.length-1],it=w[w.length-1];Ob={count:m.length,avgMs:P,p95Ms:ue,maxMs:it}}let HI=Math.max(...Object.values(p),0),zI=Object.keys(p).length>0?Db/Object.keys(p).length:0,WI=this.#e(M),_a={},Nb=50;for(let w in l){let P=l[w].eventCount??0;P>=Nb&&(_a[w]=P)}let GI=[ze&&Object.values(ze).some(Boolean)?{rank:1,type:"deadlock",id:"deadlockByTrace",evidence:"One or more traces match deadlock heuristics."}:null,Dc?{rank:2,type:"stage-bottleneck",id:Dc,evidence:`Stage has highest total compute time (${Math.round(Ec)}ms).`}:null,_c?{rank:3,type:"slowest-trace",id:_c,evidence:`Longest trace duration (${Math.round(Cc)}ms).`}:null,_a&&Object.keys(_a).length?{rank:4,type:"fanout",id:Object.keys(_a)[0],evidence:`Fan-out threshold exceeded (\u2265 ${Nb} events).`}:null,r>250?{rank:5,type:"stall",id:"maxIdleGapMs",evidence:`Large idle gap detected (${Math.round(r)}ms).`}:null].filter(Boolean);return{totalEvents:t.length,errorEvents:Nr,firstEventTimestamp:Xo,lastEventTimestamp:Qo,totalDurationMs:bc,longTaskStats:qi,eventTypes:o,traces:l,stageAggregates:u,schedulerDistribution:s,eventLoopPhaseDistribution:a,maxIdleGapMs:r,deadlockByTrace:ze,longestTraceId:_c,longestTraceDurationMs:Cc,traceFanOut:_a,diagnosticSummary:GI,stageBottleneck:Dc,stageBottleneckTimeMs:Ec,pipelineFlamegraph:Ab,burstAnalysis:{maxEventsPerFrame:Math.max(...Object.values(_),0)},suppressionStats:{suppressedCount:Gi,votePass:ga,voteAbstain:ya},structuralIntegrity:{duplicateTraceCount:va,outOfOrderCount:Zo},pipelineRecursion:wh,timingIntegrity:{timestampCollisionRate:BI,monotonicCollisionRate:jI,worstCollisionTrace:Rb,collisionsPerTrace:ba},stateAnalytics:{stateSizePerTrace:M,stateSerializationErrors:Eb,stateSerializationErrorMessages:Eh,avgPayloadSize:UI,repeatedIdenticalStateCount:Cb,largeObjectCount:Ch,deepNestingMaxDepth:Dh,persistPayloadSizeRanking:ae.sort((w,P)=>P.size-w.size).slice(0,10),stateEntropyScore:WI,avgStateDiffSize:$I,maxChurnPerSecond:HI,avgChurnPerSecond:zI},computeVsIdle:{totalComputeTimeMs:fi,estimatedIdleTimeMs:FI,computeRatio:VI},userLatencyDistribution:Ob}}#t(t){try{return new TextEncoder().encode(JSON.stringify(t)).length}catch{return 0}}#r(t,e=0){return t===null||typeof t!="object"?e:Math.max(e,...Object.values(t).map(r=>this.#r(r,e+1)))}#n(t){let e=0;for(let r=0;r<t.length;r++)e=(e<<5)-e+t.charCodeAt(r),e|=0;return`h${Math.abs(e)}`}#e(t){let e=Object.values(t);if(!e.length)return 0;let r=e.reduce((o,s)=>o+s,0)/e.length,i=e.reduce((o,s)=>o+Math.pow(s-r,2),0)/e.length;return Math.sqrt(i)}getEnvironmentInfo(){let t=navigator.userAgent,e=/chrome|crios|edg|opr/i.test(t),r=/safari/i.test(t)&&!e,i="unknown",o="unknown";/firefox/i.test(t)?(i="firefox",o=(t.match(/firefox\/(\d+)/i)??[])[1]??"unknown"):/edg/i.test(t)?(i="edge",o=(t.match(/edg\/(\d+)/i)??[])[1]??"unknown"):/opr/i.test(t)?(i="opera",o=(t.match(/opr\/(\d+)/i)??[])[1]??"unknown"):e?(i="chrome",o=(t.match(/(?:chrome|crios)\/(\d+)/i)??[])[1]??"unknown"):r&&(i="safari",o=(t.match(/version\/(\d+)/i)??[])[1]??"unknown");let s="unknown";/windows/i.test(t)?s="Windows":/iphone|ipad|ipod/i.test(t)?s="iOS":/android/i.test(t)?s="Android":/mac/i.test(t)?s="MacOS":/linux/i.test(t)&&(s="Linux");let a="desktop";return/mobile/i.test(t)&&(a="mobile"),/tablet|ipad/i.test(t)&&(a="tablet"),{url:location.href,referrer:typeof document<"u"&&document.referrer||null,userAgent:t,browser:i,browserVersion:o,os:s,platform:navigator.platform??"unknown",online:typeof navigator<"u"?navigator.onLine:void 0,deviceType:a,language:navigator.language??"unknown",timezone:Intl.DateTimeFormat().resolvedOptions().timeZone??"unknown",screenResolution:typeof screen<"u"?`${screen.width}x${screen.height}`:"unknown",viewport:typeof window<"u"?`${window.innerWidth}x${window.innerHeight}`:"unknown"}}};function GT(n){let t=new Blob([JSON.stringify(n,null,2)],{type:"application/json"}),e=document.createElement("a");e.href=URL.createObjectURL(t),e.download=`sdux-debug-${Date.now()}.json`,e.click(),URL.revokeObjectURL(e.href)}function TP(){let n=Date.now(),t=EP,e=new Blob([t],{type:"text/markdown"}),r=document.createElement("a");r.href=URL.createObjectURL(e),r.download=`sdux-debug-ai-assist-${n}.md`,r.click(),URL.revokeObjectURL(r.href)}function qT(n){let t=wP(),e=Date.now(),r=new Date(e).toISOString(),i=typeof performance<"u"&&performance.now?performance.now():null,o=typeof performance<"u"&&performance.getEntriesByType?performance.getEntriesByType("navigation")[0]:null,s;if(typeof performance<"u")try{s=performance.getEntriesByType("longtask")?.map(u=>({start:u.startTime,duration:u.duration}))}catch{}let a=t.serializeRegistry(),l=t.buildEventStats(n,s);return{timestamp:e,isoTime:r,highResolution:{monotonicNow:i,timeOrigin:typeof performance<"u"?performance.timeOrigin:null},runtime:{hardwareConcurrency:typeof navigator<"u"?navigator.hardwareConcurrency??null:null,deviceMemory:typeof navigator<"u"?navigator.deviceMemory??null:null,connectionType:typeof navigator<"u"?navigator.connection?.effectiveType??null:null},navigation:o?{type:o.type,domComplete:o.domComplete,loadEventEnd:o.loadEventEnd}:void 0,environment:t.getEnvironmentInfo(),longTasks:s,events:n,stats:l,versions:globalThis?.sdux?.debugWidget?.versions??{},registry:a}}function SP(n){let t=qT(n);GT(t);let i=`https://github.com/sdux-vault/vault/issues/new?template=issue_report.md&body=${encodeURIComponent(`## Issue Summary
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
`)}`;window.open(i,"_blank")}function IP(n,t=1){let e=new Blob([n],{type:"application/json"}),r=URL.createObjectURL(e),i=document.createElement("a");i.href=r,i.download=`sdux-pipeline-trace-x${t}-${Date.now()}.json`,i.click(),URL.revokeObjectURL(r)}var Ui={Begin:"B",End:"E",Instant:"I",Meta:"M",Complete:"X"};function MP(n,t=1){let e=[],r=new Map,i=new Map,o=0;e.push({name:"process_name",ph:Ui.Meta,pid:1,args:{name:"SDUX Pipeline Debugger"}}),e.push({name:"trace_scale",ph:Ui.Meta,pid:1,args:{scale:t}});let s=new Set,a=[...n].sort((c,u)=>{let d=c.sequenceNumber??0,h=u.sequenceNumber??0;return d-h}),l=new Map;if(a.length>0){let c=a[0].monotonicTimestamp??0,u=0,d=c;for(let h=0;h<a.length;h++){let p=a[h],m=p.monotonicTimestamp??d,_=p.sequenceNumber??h;if(h===0){l.set(_,0),d=m;continue}let M=Math.max(0,m-d),k;t<=1?k=Math.floor(M*1e3):M<=2?k=Math.floor(M*1e3*t):M<=16?k=Math.floor(M*1e3*Math.max(2,Math.floor(t/4))):k=1e3,u+=k,l.set(_,u),d=m}}for(let c=0;c<a.length;c++){let u=a[c],d=u.traceId??"main",h=u.sequenceNumber??c,p=l.get(h)??0,[m,_,M]=(u.name??"").split(":"),k=u.type,ae=`${d}:${k}:${m}:${M}`;if(s.has(d)||(s.add(d),e.push({name:"thread_name",ph:Ui.Meta,pid:1,tid:d,args:{name:`Pipeline ${d.slice(0,8)}`}})),i.has(d)||(i.set(d,o++),e.push({name:"thread_sort_index",ph:Ui.Meta,pid:1,tid:d,args:{sort_index:i.get(d)}})),u.boundary===Jt.Start){r.has(ae)||r.set(ae,[]),r.get(ae).push(p),e.push({name:M,cat:k,ph:Ui.Begin,ts:p,pid:1,tid:d,args:{cell:u.cell,behavior:u.behaviorKey,scheduler:u.scheduler,source:u.source,latency:u.latencyCategory}});continue}if(u.boundary===Jt.End){let fi=r.get(ae);if(fi&&fi.length){let ya=fi.pop(),va=50,Zo=p;Zo-ya<va&&(Zo=ya+va),e.push({name:M,cat:k,ph:Ui.End,ts:Zo,pid:1,tid:d})}continue}let ze=20*t,Nr=Math.max(0,p-ze),Gi=Nr===0?ze:p,ga=`${M}:${_} (synthetic)`;e.push({name:ga,cat:k,ph:Ui.Begin,ts:Nr,pid:1,tid:d,args:{synthetic:!0,actualDurationMs:0,note:"Synthetic span time added for visualization"}}),e.push({name:ga,cat:k,ph:Ui.End,ts:Gi,pid:1,tid:d,args:{synthetic:!0,actualDurationMs:0,note:"Synthetic time span added for visualization"}})}return JSON.stringify({traceEvents:e},null,2)}var nv=class extends HTMLElement{recorder=new ev;recording=!1;minimized=!0;exportMenuOpen=!1;dragOffsetX=0;dragOffsetY=0;dragging=!1;abortController=new AbortController;connectedCallback(){this.attachShadow({mode:"open"}),this.style.position="fixed",this.style.top="80px",this.style.right="20px",this.style.zIndex="999999";let t=localStorage.getItem("sdux-debug-state");if(t)try{let{left:e,top:r,minimized:i}=JSON.parse(t);e&&r&&(this.style.left=e,this.style.top=r,this.style.right="auto"),this.minimized=!!i}catch{}this.render(),document.addEventListener("sdux-license-resolved",()=>{this.updateButtonState()},{signal:this.abortController.signal})}disconnectedCallback(){this.abortController.abort(),this.timerInterval&&(clearInterval(this.timerInterval),this.timerInterval=null),this.recorder.stop(),this.recording=!1}render(){if(!this.shadowRoot)return;this.shadowRoot.innerHTML=`
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
  `,this.shadowRoot?.getElementById("aiAssist")?.addEventListener("click",()=>{TP()});let e=this.shadowRoot.getElementById("export"),r=this.shadowRoot.getElementById("exportMenu");e?.addEventListener("click",a=>{a.stopPropagation(),this.exportMenuOpen=!this.exportMenuOpen,r?.classList.toggle("open",this.exportMenuOpen)}),this.shadowRoot.getElementById("close")?.addEventListener("click",a=>{a.stopPropagation(),this.remove()}),this.updateButtonState(),this.shadowRoot.getElementById("help")?.addEventListener("click",a=>{a.stopPropagation(),this.openHelp()}),this.shadowRoot.getElementById("recordToggle")?.addEventListener("click",a=>{a.stopPropagation(),this.recording?this.stop():this.start(),this.updateRecordingUI()}),this.shadowRoot.getElementById("panel")?.addEventListener("pointerdown",a=>this.startDrag(a)),this.shadowRoot.getElementById("downloadDump")?.addEventListener("click",a=>{a.stopPropagation(),s(),this.downloadDebugDump()}),this.shadowRoot.getElementById("downloadTrace")?.addEventListener("click",a=>{a.stopPropagation(),s(),this.downloadTraceDump()}),this.shadowRoot.getElementById("downloadTrace1000")?.addEventListener("click",a=>{a.stopPropagation(),s(),this.downloadTraceDump(1e3)}),this.shadowRoot.getElementById("clear")?.addEventListener("click",a=>{a.stopPropagation(),this.clear()}),this.shadowRoot.getElementById("minimize")?.addEventListener("click",this.toggleMinimize),this.shadowRoot.getElementById("createIssue")?.addEventListener("click",a=>{a.stopPropagation(),this.createIssue()});let o=this.abortController.signal;document.addEventListener("pointermove",this.onDrag,{signal:o}),document.addEventListener("pointerup",this.stopDrag,{signal:o}),document.addEventListener("pointerdown",a=>{if(!this.exportMenuOpen)return;let l=a.composedPath();r&&!l.includes(r)&&s()},{signal:o});let s=()=>{r?.classList.remove("open"),this.exportMenuOpen=!1}}updateEventCount(){if(!this.shadowRoot)return;let t=this.shadowRoot.getElementById("eventCount"),e=this.shadowRoot.getElementById("eventErrorCount"),r=this.recorder.getEvents().length,i=this.recorder.getErrorCount();if(t&&(t.textContent=String(r)),e){let o=Number(e.textContent??"0");i>o&&(e.classList.remove("bump"),e.offsetWidth,e.classList.add("bump")),e.textContent=String(i)}}updateRecordingUI(){if(!this.shadowRoot)return;let t=this.shadowRoot.getElementById("recordToggle"),e=this.shadowRoot.querySelector(".record-dot"),r=this.shadowRoot.getElementById("sessionTimer"),i=this.shadowRoot.querySelector(".title-container");if(t&&(t.textContent=this.recording?"Stop":"Record"),!this.recording){e&&e.remove(),r&&(r.textContent="");return}if(!e&&i){let o=document.createElement("div");o.className="record-dot",i.insertBefore(o,i.children[1])}r&&(r.textContent=this.getSessionTime())}sessionStartTime=null;timerInterval=null;pausedDuration=0;pauseStart=null;startDrag(t){this.dragging=!0,this.dragOffsetX=t.clientX-this.offsetLeft,this.dragOffsetY=t.clientY-this.offsetTop}onDrag=t=>{this.dragging&&(this.style.left=`${t.clientX-this.dragOffsetX}px`,this.style.top=`${t.clientY-this.dragOffsetY}px`,this.style.right="auto")};stopDrag=()=>{this.dragging=!1,this.persistState()};toggleMinimize=t=>{t.stopPropagation(),this.minimized=!this.minimized,this.persistState(),this.render()};persistState(){localStorage.setItem("sdux-debug-state",JSON.stringify({left:this.style.left,top:this.style.top,minimized:this.minimized}))}updateButtonState(){if(!this.shadowRoot)return;let t=this.shadowRoot.getElementById("recordToggle"),e=this.shadowRoot.getElementById("export"),r=this.shadowRoot.getElementById("clear"),i=this.shadowRoot.getElementById("createIssue"),o=this.shadowRoot.getElementById("aiAssist"),s=this.recorder.getEvents().length>0,a=!!globalThis.sdux?.debugWidget?.aiAssistEnabled;t&&(t.disabled=!1);let l=!s||this.recording;e&&(e.disabled=l),i&&(i.disabled=l),r&&(r.disabled=l),o&&(o.disabled=l||!a)}start(){if(this.recording)return;let t=Date.now();this.sessionStartTime||(this.sessionStartTime=t),this.pauseStart&&(this.pausedDuration+=t-this.pauseStart,this.pauseStart=null),this.timerInterval=window.setInterval(()=>{let e=this.shadowRoot?.getElementById("sessionTimer");e&&(e.textContent=this.getSessionTime())},1e3),this.recorder.start(()=>{this.updateEventCount(),this.updateButtonState()}),this.recording=!0,this.updateRecordingUI(),this.updateButtonState(),console.info("[SDUX] Recording started")}getSessionTime(){if(!this.sessionStartTime)return"";let t=Date.now()-this.sessionStartTime-this.pausedDuration,e=Math.floor(t/1e3),r=Math.floor(e/60),i=e%60;return`${r}:${i.toString().padStart(2,"0")}`}stop(){this.recording&&(this.recorder.stop(),this.recording=!1,this.pauseStart=Date.now(),this.updateRecordingUI(),this.timerInterval&&(clearInterval(this.timerInterval),this.timerInterval=null),this.updateButtonState(),console.info("[SDUX] Recording stopped"))}downloadDebugDump(){let t=qT(this.recorder.getEvents());GT(t),console.info("[SDUX] Logging dump generated")}downloadTraceDump(t=1){let e=MP(this.recorder.getEvents(),t);IP(e,t),console.info("[SDUX] Trace dump generated")}createIssue(){SP(this.recorder.getEvents()),console.info("[SDUX] Issue dump generated and redirected")}clear(){if(!this.recorder.getEvents().length||!confirm("Clear all recorded events?"))return;this.recorder.clear(),this.sessionStartTime=null,this.pausedDuration=0,this.pauseStart=null;let t=this.shadowRoot?.getElementById("sessionTimer");t&&(t.textContent=""),this.updateEventCount(),this.updateButtonState(),console.info("[SDUX] Events cleared")}openHelp(){window.open("/docs/dev-tools/built-in-debugger","_blank","noopener,noreferrer")}};function xP(){if(!customElements.get("sdux-debug"))try{customElements.define("sdux-debug",nv)}catch{}if(document.querySelector("sdux-debug"))return;let n=document.createElement("sdux-debug");document.body.appendChild(n)}function KT(){if(!Ct.active||typeof window>"u"||(globalThis.sdux??={},globalThis.sdux.debugWidget??={},globalThis.sdux.debugWidget.injected))return;globalThis.sdux.debugWidget.injected=!0;let n=()=>xP();document.readyState==="loading"?document.addEventListener("DOMContentLoaded",n,{once:!0}):n()}var RP="@sdux-vault/engine",kP="0.28.1";Jl(RP,kP);var Dt="vault-conductor",jf,av=class{static{jf=this}controllerCtx;static type;static key;static critical;type=jf.type;critical=jf.critical;key;#t=!1;#r=!1;constructor(e,r){this.controllerCtx=r,this.key=e}handleMessage(e){switch(Ne(`${this.key} handleMessage received "${e.type}" for trace "${e.traceId}".`),e.type){case sr.Attempt:{let{ctx:r}=e;return this.#r?I(mt.Abort):r.operation===On.Initialize?I(mt.Abstain):I(this.#t?mt.Abstain:mt.Deny)}case sr.Finalize:return this.#t=!0,I();case sr.Success:return this.#t=!0,I();case sr.Failure:return e.ctx.operation===On.Initialize&&(this.#r=!0),I();default:return I(mt.Abstain)}}destroy(){He(`${this.key} - destroy noop`)}reset(){He(`${this.key} - reset noop`)}};av=jf=Ra([Nf({type:ji.CoreAbstain,key:Pf("Policy","CoreAbstain"),critical:!1})],av);var Vf,lv=class{static{Vf=this}controllerCtx;static type;static key;static critical;type=Vf.type;critical=Vf.critical;key;ctx;constructor(e,r){this.controllerCtx=r,this.key=e,this.ctx=r}handleMessage(e){return Ne(`${this.key} handleMessage received "${e.type}" for trace "${e.traceId}".`),e.type===sr.Failure?(Ne(`${this.key} ABORT \u2014 default failure handler for trace "${e.traceId}"`),this.ctx.requestAbort(e.traceId),I()):I(mt.Abstain)}destroy(){He(`${this.key} - destroy noop`)}reset(){He(`${this.key} - reset noop`)}};lv=Vf=Ra([Nf({type:ji.Error,key:Pf("Policy","CoreError"),critical:!1})],lv);var kr={RequireLicense:"requireLicense",ValidateLicense:"validateLicense",LicenseStatus:"licenseStatus",DescribeFeature:"describe-feature",DescribeBehaviors:"describe-behaviors",DescribeControllers:"describe-controllers"},$f=null;function AP(n,t){$f||($f=new cv(n,t))}function rc(){if(!$f)throw new Error("[vault] LicensingService not initialized.");return $f}var cv=class{events$;validation$;constructor(t,e){this.events$=t,this.validation$=e}describeFeature(t){t.type=kr.DescribeFeature,this.events$.next(t)}describeBehaviors(t){t.type=kr.DescribeBehaviors,this.events$.next(t)}describeControllers(t){t.type=kr.DescribeControllers,this.events$.next(t)}requestLicense(t,e){if(!e)throw new Error("[vault] Cannot register controller license without a key.");let r=this.#t();return this.events$.next({featureCellKey:t,key:e,licenseToken:r,type:kr.RequireLicense}),r}validateLicense(t,e,r,i){this.events$.next({featureCellKey:t,key:e,licenseToken:r,type:kr.ValidateLicense,valid:i})}#t(){let t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",e=r=>Array.from({length:r},()=>t[Math.floor(Math.random()*t.length)]).join("");return`${e(5)}-${e(5)}`}getLicenseValidation$(){return this.validation$}};var Uf,uv=class{static{Uf=this}controllerCtx;static type;static key;static critical;type=Uf.type;critical=Uf.critical;key;#t=null;#r;constructor(e,r){this.controllerCtx=r,this.key=e;let i=r.featureCellKey;this.#r=rc().getLicenseValidation$().pipe(ye(o=>o.featureCellKey===i)).subscribe(o=>{this.#t=o.approved,this.#r?.unsubscribe();let s=`${i}::license`;o.approved?r?.licenseApproved?.(s):r?.licenseDenied?.(s)})}handleMessage(e){return Ne(`${this.key} received "${e.type}" for trace "${e.traceId}".`),e.type===sr.Attempt?this.#t?I(mt.Abstain):this.#t===null?I(mt.Deny):I(mt.Abort):I()}destroy(){this.#r?.unsubscribe(),He(`${this.key} - destroy unsubscribe`)}reset(){He(`${this.key} - reset noop`)}};uv=Uf=Ra([Nf({type:ji.License,key:Pf("Policy","CoreLicense"),critical:!0})],uv);var dv=class{evaluateAttempt(t,e,r){if(t.length===0)return I(this.arbitrate(e.traceId,[mt.Abstain]));try{let i=t.map(o=>(r?.startControllerVote(e.ctx.featureCellKey,o.key,e.traceId),o.handleMessage(e).pipe(se(s=>s??mt.Abstain),ot(s=>{r?.endControllerVote(e.ctx.featureCellKey,o.key,e.traceId,s)}),Br(s=>(He("[vault:arbitrator] controller threw during attempt:",s),r?.endControllerVote(e.ctx.featureCellKey,o.key,e.traceId,mt.Deny),r?.controllerFailure(o.key,e.ctx,s),I(mt.Deny))))));return ru(i).pipe(se(o=>this.arbitrate(e.traceId,o)))}catch{return I(this.arbitrate(e.traceId,[mt.Deny]))}}notify(t,e){if(t.length===0)return I(void 0);try{let r=t.map(i=>i.handleMessage(e).pipe(se(()=>{}),Br(o=>(He("[vault:arbitrator] controller threw during notify:",o),I(void 0)))));return ru(r).pipe(se(()=>{}))}catch{return I(void 0)}}arbitrate(t,e){return e.includes(mt.Abort)?{traceId:t,outcome:pn.Abort}:e.includes(mt.Deny)?{traceId:t,outcome:pn.Deny}:e.every(s=>s===mt.Abstain)?{traceId:t,outcome:pn.Abstain}:(Ut("Unknown controller vote detected",{traceId:t,votes:e}),{traceId:t,outcome:pn.Deny})}},O={Boundary:"boundary",State:"state",Error:"error"},en={Never:"never",Optional:"optional",Required:"required"},OP={[O.Boundary]:{state:en.Never,payload:en.Optional,error:en.Never},[O.State]:{state:en.Required,payload:en.Optional,error:en.Never},[O.Error]:{state:en.Required,payload:en.Optional,error:en.Required}},NP={"stage:end:core-state":{category:O.State},"stage:end:core-emit-state":{category:O.State},"lifecycle:end:merge":{category:O.State},"lifecycle:end:replace":{category:O.State},"stage:end:compute-merge":{category:O.State},"stage:end:reducer":{category:O.State},"stage:end:resolve":{category:O.State},"lifecycle:notification:failure":{category:O.Error},"lifecycle:notification:runtime-error":{category:O.Error},"lifecycle:notification:warn":{category:O.Error},"lifecycle:notification:fatal":{category:O.Error},"conductor:start:abort":{category:O.Boundary},"conductor:start:deny":{category:O.Boundary},"conductor:start:revote":{category:O.Boundary},"controller:end:vote":{category:O.Boundary},"conductor:start:license-approved":{category:O.Boundary},"conductor:start:license-attempt":{category:O.Boundary},"controller:end:attempt":{category:O.Boundary},"controller:notification:finalize":{category:O.Boundary},"controller:notification:success":{category:O.Boundary},"controller:restart:restart-controller-attempt":{category:O.Boundary},"controller:start:attempt":{category:O.Boundary},"controller:start:vote":{category:O.Boundary},"lifecycle:end:initialized":{category:O.Boundary},"lifecycle:start:core-callback-error":{category:O.Boundary},"lifecycle:start:core-error":{category:O.Boundary},"lifecycle:start:core-state":{category:O.Boundary},"lifecycle:start:global-error":{category:O.Boundary},"lifecycle:start:initialized":{category:O.Boundary},"lifecycle:start:merge":{category:O.Boundary},"lifecycle:start:replace":{category:O.Boundary},"lifecycle:start:error-transform":{category:O.Boundary},"lifecycle:end:error-transform":{category:O.Boundary},"lifecycle:end:core-callback-error":{category:O.Boundary},"lifecycle:end:core-error":{category:O.Boundary},"lifecycle:end:global-error":{category:O.Boundary},"stage:end:after-tap":{category:O.Boundary},"stage:end:before-tap":{category:O.Boundary},"stage:end:encrypt":{category:O.Boundary},"stage:end:filter":{category:O.Boundary},"stage:end:load-persist":{category:O.Boundary},"stage:end:operator":{category:O.Boundary},"stage:end:persist":{category:O.Boundary},"stage:start:after-tap":{category:O.Boundary},"stage:start:before-tap":{category:O.Boundary},"stage:start:compute-merge":{category:O.Boundary},"stage:start:encrypt":{category:O.Boundary},"stage:start:filter":{category:O.Boundary},"stage:start:load-persist":{category:O.Boundary},"stage:start:operator":{category:O.Boundary},"stage:start:persist":{category:O.Boundary},"stage:start:reducer":{category:O.Boundary},"stage:start:resolve":{category:O.Boundary}},iv=null;function PP(){return iv||(iv=new fv),iv}var fv=class{globalInsightOverride=null;cellRegistry=new Map},hv=class{shared=PP();key=qy("DevTools","Telemetry");get globalInsightOverride(){return this.shared.globalInsightOverride}set globalInsightOverride(t){this.shared.globalInsightOverride=t}get cellRegistry(){return this.shared.cellRegistry}registerCell(t,e){let r=!!e;this.cellRegistry.set(t,{hasInsight:r,insights:r?[e]:[]})}activateGlobalInsights(t){this.globalInsightOverride=t}isChromeDevTools(t){return t===UT||t===VT}applyPolicy(t,e){let r=NP[t.name]?.category??O.Boundary,i=OP[r],o=!!e?.wantsState,s=!!e?.wantsPayload,a=!!e?.wantsErrors;return t.source||delete t.source,(!o||i.state===en.Never)&&delete t.state,(!s||i.payload===en.Never||i.payload===en.Optional&&t.payload===void 0)&&delete t.payload,!a||i.error===en.Never?delete t.error:i.error===en.Required&&(!s||t.payload===void 0)&&delete t.payload,t}},ov=null;function Ev(){return ov||(ov=new pv),ov}var pv=class extends hv{#t=rv();constructor(){super(),typeof window<"u"&&(window.sdux??={},window.sdux.vaultMonitorInstance=this)}#r(t){let e=t?.snapshot??t?.lastSnapshot??t?.state??{};return{isLoading:e.isLoading??!1,value:e.value??void 0,error:e.error??null,hasValue:e.hasValue??!!e.value}}startAfterTap(t,e,r){this.#e({cell:t,behaviorKey:e,name:"after-tap",ctx:r})}endAfterTap(t,e,r,i){this.#i({cell:t,behaviorKey:e,name:"after-tap",ctx:r,payload:i})}startBeforeTap(t,e,r){this.#e({cell:t,behaviorKey:e,name:"before-tap",ctx:r})}endBeforeTap(t,e,r,i){this.#i({cell:t,behaviorKey:e,name:"before-tap",ctx:r,payload:i})}startClearPersist(t,e,r){this.#a({cell:t,behaviorKey:e,name:"clear-persist",ctx:r})}endClearPersist(t,e,r){this.#l({cell:t,behaviorKey:e,name:"clear-persist",ctx:r})}startComputeMerge(t,e,r){this.#e({cell:t,behaviorKey:e,name:"compute-merge",ctx:r})}endComputeMerge(t,e,r){this.#i({cell:t,behaviorKey:e,name:"compute-merge",ctx:r})}notifyConductorDeny(t,e,r){this.#c({cell:t,behaviorKey:e,name:"deny",ctx:r})}conductorCrashed(t,e,r,i){let o=Bo(i,t),s="fatal";Ut(t,e,o),this.#s({cell:t,behaviorKey:e,name:s,ctx:r,payload:{message:"This has proven to be untested code in unit tests. So you win some type of prize. Please create a github issues and share your amazing gift to bring down a systm."},error:o})}conductorRevote(t,e,r){this.#s({cell:t,behaviorKey:e,name:"revote",ctx:r})}conductorAbort(t,e,r){this.#s({cell:t,behaviorKey:e,name:"abort",ctx:r})}conductorLicenseAttempt(t,e){this.#s({cell:t,behaviorKey:e,name:"license-attempt",ctx:{}})}conductorLicenseApproved(t,e){this.#s({cell:t,behaviorKey:e,name:"license-approved",ctx:{}})}conductorLicenseDenied(t,e){this.#s({cell:t,behaviorKey:e,name:"license-denied",ctx:{}})}startControllerAttempt(t,e,r){this.#d({cell:t,behaviorKey:e,name:"attempt",ctx:r})}endControllerAttempt(t,e,r,i){this.#u({cell:t,behaviorKey:e,name:"attempt",ctx:r,payload:i})}restartControllerAttempt(t,e,r,i){this.#f({cell:t,behaviorKey:e,name:"restart-attempt",ctx:r,payload:i})}controllerFailure(t,e,r){let i=Bo(r,t);this.#s({cell:e.featureCellKey,behaviorKey:t,name:"failure",ctx:e,error:i})}controllerFinalize(t,e){this.#s({cell:e.featureCellKey,behaviorKey:t,name:"finalize",ctx:e})}controllerSuccess(t,e){this.#s({cell:e.featureCellKey,behaviorKey:t,name:"success",ctx:e})}startControllerVote(t,e,r){this.#d({cell:t,behaviorKey:e,name:"vote",ctx:{traceId:r}})}endControllerVote(t,e,r,i){this.#u({cell:t,behaviorKey:e,name:"vote",ctx:{traceId:r},payload:i})}startConductorVote(t,e,r){this.#d({cell:t,behaviorKey:e,name:"vote",ctx:r})}endConductorVote(t,e,r,i){this.#u({cell:t,behaviorKey:e,name:"vote",ctx:r,payload:i})}startCoreCallbackError(t,e,r){this.#e({cell:t,behaviorKey:e,name:"core-callback-error",ctx:r})}endCoreCallbackError(t,e,r){this.#i({cell:t,behaviorKey:e,name:"core-callback-error",ctx:r})}startCoreEmitState(t,e,r){this.#e({cell:t,behaviorKey:e,name:"core-emit-state",ctx:r})}endCoreEmitState(t,e,r){this.#i({cell:t,behaviorKey:e,name:"core-emit-state",ctx:r})}startCoreError(t,e,r){this.#e({cell:t,behaviorKey:e,name:"core-error",ctx:r})}endCoreError(t,e,r){this.#i({cell:t,behaviorKey:e,name:"core-error",ctx:r})}startCoreState(t,e,r){this.#e({cell:t,behaviorKey:e,name:"core-state",ctx:r})}endCoreState(t,e,r){this.#i({cell:t,behaviorKey:e,name:"core-state",ctx:r})}startDecrypt(t,e,r){this.#e({cell:t,behaviorKey:e,name:"decrypt",ctx:r})}endDecrypt(t,e,r,i){this.#i({cell:t,behaviorKey:e,name:"decrypt",ctx:r,payload:i})}startDestroy(t,e,r){this.#a({cell:t,behaviorKey:e,name:"destroy",ctx:r})}endDestroy(t,e,r,i){this.#l({cell:t,behaviorKey:e,name:"destroy",ctx:r,payload:i})}startEncrypt(t,e,r){this.#e({cell:t,behaviorKey:e,name:"encrypt",ctx:r})}endEncrypt(t,e,r){this.#i({cell:t,behaviorKey:e,name:"encrypt",ctx:r})}runtimeError(t,e,r,i){let o=Bo(i,t);Ut(t,e,o),this.#s({cell:t,behaviorKey:e,name:"runtime-error",ctx:r,error:o})}startErrorTransform(t,e,r){this.#e({cell:t,behaviorKey:e,name:"error-transform",ctx:r})}endErrorTransform(t,e,r,i){this.#i({cell:t,behaviorKey:e,name:"error-transform",ctx:r,payload:i})}startFilter(t,e,r){this.#e({cell:t,behaviorKey:e,name:"filter",ctx:r})}endFilter(t,e,r){this.#i({cell:t,behaviorKey:e,name:"filter",ctx:r})}startGlobalError(t,e,r){this.#a({cell:t,behaviorKey:e,name:"global-error",ctx:r})}endGlobalError(t,e,r){this.#l({cell:t,behaviorKey:e,name:"global-error",ctx:r})}ingressSubscribed(t,e,r,i){this.#a({cell:t,behaviorKey:e,name:"ingress-subscribed",ctx:r,source:i})}ingressCompleted(t,e,r,i){this.#l({cell:t,behaviorKey:e,name:"ingress-completed",ctx:r,source:i})}startInitialized(t,e,r){this.#a({cell:t,behaviorKey:e,name:"initialized",ctx:r})}endInitialized(t,e,r){this.#l({cell:t,behaviorKey:e,name:"initialized",ctx:r})}startInterceptor(t,e,r){this.#e({cell:t,behaviorKey:e,name:"interceptor",ctx:r})}endInterceptor(t,e,r,i){this.#i({cell:t,behaviorKey:e,name:"interceptor",ctx:r,payload:i})}startLoadPersist(t,e,r){this.#e({cell:t,behaviorKey:e,name:"load-persist",ctx:r})}endLoadPersist(t,e,r,i){this.#i({cell:t,behaviorKey:e,name:"load-persist",ctx:r,payload:i})}startMerge(t,e,r){this.#a({cell:t,behaviorKey:e,name:"merge",ctx:r})}endMerge(t,e,r,i){this.#l({cell:t,behaviorKey:e,name:"merge",ctx:r,payload:i})}startOperator(t,e,r){this.#e({cell:t,behaviorKey:e,name:"operator",ctx:r})}endOperator(t,e,r,i){this.#i({cell:t,behaviorKey:e,name:"operator",ctx:r,payload:i})}startPersist(t,e,r){this.#e({cell:t,behaviorKey:e,name:"persist",ctx:r})}endPersist(t,e,r){this.#i({cell:t,behaviorKey:e,name:"persist",ctx:r})}startReducer(t,e,r){this.#e({cell:t,behaviorKey:e,name:"reducer",ctx:r})}endReducer(t,e,r){this.#i({cell:t,behaviorKey:e,name:"reducer",ctx:r})}startReplace(t,e,r){this.#a({cell:t,behaviorKey:e,name:"replace",ctx:r})}endReplace(t,e,r,i){this.#l({cell:t,behaviorKey:e,name:"replace",ctx:r,payload:i})}startReset(t,e,r){this.#a({cell:t,behaviorKey:e,name:"reset",ctx:r})}endReset(t,e,r,i){this.#l({cell:t,behaviorKey:e,name:"reset",ctx:r,payload:i})}startResolve(t,e,r){this.#e({cell:t,behaviorKey:e,name:"resolve",ctx:r})}endResolve(t,e,r){this.#i({cell:t,behaviorKey:e,name:"resolve",ctx:r})}startSetInitialValue(t,e,r){this.#a({cell:t,behaviorKey:e,name:"set-initial-value",ctx:r})}endSetInitialValue(t,e,r){this.#l({cell:t,behaviorKey:e,name:"set-initial-value",ctx:r})}startStepwise(t,e,r){this.#e({cell:t,behaviorKey:e,name:"stepwise",ctx:r})}endStepwise(t,e,r){this.#i({cell:t,behaviorKey:e,name:"stepwise",ctx:r})}warn(t,e,r,i){let o=Bo(i,t);He(t,e,o),this.#s({cell:t,behaviorKey:e,name:"warn",ctx:r,error:o})}#n(t){return t.name=`${t.type}:${t.boundary}:${t.name}`,t}#e(t){t.type=At.Stage,t.boundary=Jt.Start,this.#o(this.#n(t))}#i(t){t.type=At.Stage,t.boundary=Jt.End,this.#o(this.#n(t))}#a(t){t.type=At.Lifecycle,t.boundary=Jt.Start,this.#o(this.#n(t))}#l(t){t.type=At.Lifecycle,t.boundary=Jt.End,this.#o(this.#n(t))}#s(t){t.type=At.Lifecycle,t.boundary=Jt.Notification,this.#o(this.#n(t))}#c(t){t.type=At.Conductor,t.boundary=Jt.Notification,this.#o(this.#n(t))}#d(t){t.type=At.Controller,t.boundary=Jt.Start,this.#o(this.#n(t))}#u(t){t.type=At.Controller,t.boundary=Jt.End,this.#o(this.#n(t))}#f(t){t.type=At.Controller,t.boundary=Jt.Notification,this.#o(this.#n(t))}#o(t){let{cell:e,ctx:r,name:i,behaviorKey:o,source:s,error:a,payload:l,type:c,boundary:u}=t;if(this.isChromeDevTools(e)||!Ct.active)return;let d;if(this.globalInsightOverride)d=this.globalInsightOverride;else{let p=this.cellRegistry.get(e);if(!p||!p.hasInsight)return;d=p.insights[0]}let h={id:crypto.randomUUID(),cell:e,behaviorKey:o,name:i,timestamp:Date.now(),state:this.#r(r),type:c??At.Unknown,boundary:u??Jt.Unknown,payload:l,error:a,source:s};r.traceId&&(h.traceId=r.traceId),this.#t.nextPipeline(this.applyPolicy(h,d))}},Nn={Abort:"abort",Failure:"failure",LicenseApproved:"licenseApproved",LicenseDenied:"licenseDenied",Revote:"revote",Success:"success"},mv=class{controllers;events$;#t=new dv;#r=Ev();constructor(t,e){this.controllers=t,this.events$=e}evaluateAttempt(t){let e={type:sr.Attempt,traceId:t.traceId,ctx:t};return this.#t.evaluateAttempt(this.controllers,e,this.#r)}notifySuccess(t){if(!this.controllers.length)return;let e={type:sr.Success,traceId:t.traceId,ctx:t};this.#r.controllerSuccess("decision-engine",t),this.#t.notify(this.controllers,e).subscribe({complete:()=>{this.events$.closed||this.events$.next({traceId:t.traceId,type:Nn.Success})}})}notifyFailure(t,e){if(!this.controllers.length)return;let r={type:sr.Failure,traceId:t.traceId,ctx:t,error:e};this.#r.controllerFailure("decision-engine",t,e),this.#t.notify(this.controllers,r).subscribe({complete:()=>{this.events$.closed||this.events$.next({traceId:t.traceId,type:Nn.Failure})}})}notifyFinalize(t){if(!this.controllers.length)return;let e={type:sr.Finalize,traceId:t.traceId};this.#r.controllerFinalize("decision-engine",t),this.#t.notify(this.controllers,e).subscribe()}},Pe="vault-orchestrator",LP=new Set(["initialize","destroy","destroyed$","reset","reset$","reducers","operators","filters","interceptors","mergeState","replaceState","beforeTaps","afterTaps","key","state","cache","persist","encrypt","beforeTap","afterTap","hydrate"]),oi={NotRequired:"not-required",Pending:"pending",Revoked:"revoked",Timeout:"timeout",Valid:"valid"},FP=new Set(["SDUX::Behavior::Core::AfterTap","SDUX::Behavior::Core::ArrayMerge","SDUX::Behavior::Core::BeforeTap","SDUX::Behavior::Core::EmitState","SDUX::Behavior::Core::Error","SDUX::Behavior::Core::ErrorCallback","SDUX::Behavior::Core::Filter","SDUX::Behavior::Core::FromObservable","SDUX::Behavior::Core::FromPromise","SDUX::Behavior::Core::FromStream","SDUX::Behavior::Core::ObjectMerge","SDUX::Behavior::Core::Observable","SDUX::Behavior::Core::Promise","SDUX::Behavior::Core::Reducer","SDUX::Behavior::Core::State","SDUX::Behavior::Core::TabSyncState","SDUX::Behavior::Core::Value","SDUX::Behavior::Addon::DistinctUntilChanged","SDUX::Behavior::Cache::State","SDUX::Behavior::Core::Lookup","SDUX::Behavior::Core::Query","SDUX::Behavior::Encrypt::Aes256","SDUX::Behavior::Interceptor::GlobalErrorPause","SDUX::Behavior::Merge::ArrayAppend","SDUX::Behavior::Merge::ArrayPush","SDUX::Behavior::Merge::Deep","SDUX::Behavior::Persist::CookieStorage","SDUX::Behavior::Persist::LocalStorage","SDUX::Behavior::Persist::SessionStorage","SDUX::Behavior::Policy::StepwiseFilter","SDUX::Behavior::Policy::StepwiseReducer","SDUX::Behavior::Policy::StepwiseResolve","SDUX::Behavior::Core::License","SDUX::Controller::Policy::CoreAbstain","SDUX::Controller::Policy::CoreError","SDUX::Controller::Policy::CoreLicense","SDUX::Controller::Policy::TabSync","SDUX::Controller::Policy::Delay","SDUX::Controller::Policy::MaxFailures","SDUX::Controller::Policy::ReplayGlobalError","SDUX::Controller::Policy::Stepwise","SDUX::Controller::Policy::Throttle"]),XT="sdux-vault",BP="SDUX::Behavior::Core::License",$t=null;function QT(n={}){$t||($t=new gv(n))}var gv=class{#t;#r;#n=new Map;#e=new Map;#i=!1;#a=!1;#l;#s=new Map;#c=new C;#d=new mi;#u=new Map;#f;#o=new Map;constructor(t){AP(this.#c,this.#d.asObservable()),this.setVaultConfig(t),this.#C(t.licenses),this.#g(),this.#k()}setVaultConfig(t){let e={devMode:t.devMode??!1,logLevel:t.logLevel??"off"};this.#f=Object.freeze(e),Ct.setDevMode(this.#f.devMode),BT(this.#f.logLevel),this.#a=t.devMode?t.bypassLicensing??!1:!1,this.#l=t.licenseTimeoutMs??15e3,this.#x()}resetForTesting(){this.#t?.unsubscribe(),this.#t=void 0,this.#r?.unsubscribe(),this.#r=void 0,this.#f=void 0,this.resetFeatureCellRegistry(),this.#u.clear(),this.#n.clear()}resetFeatureCellRegistry(){this.#o.clear()}registerCellRuntime(t){this.#p(t)}registerBehaviors(t,e){let r=this.#p(t);r.behaviors=this.#h(e),r.behaviorsRegistered=!0}registerControllers(t,e){let r=this.#p(t);r.controllers=this.#h(e),r.controllersRegistered=!0}registerFluentApis(t,e){let r=this.#p(t);r.fluentApis=Object.freeze(e)}getLicensePayload(t){return this.#n.get(t)}isBypassLicensing(){return this.#a}isAuthorizedKey(t){return FP.has(t)}hasVaultLicense(){return this.#n.has(XT)}#C(t){if(t?.length)for(let e of t)e?.licenseId&&this.#n.set(e.licenseId,e.payload)}#h(t){return new Map(t.map(e=>{let r;this.#a?r=!1:r=e.needsLicense??!1;let i={key:e.key,type:e.type,critical:!!e.critical,needsLicense:r,validLicense:r?oi.Pending:oi.NotRequired};return[e.key,Object.freeze(i)]}))}#g(){this.#t=this.#c.subscribe(t=>{switch(t.type){case kr.DescribeFeature:{let e=t;this.registerFluentApis(e.featureCellKey,this.#R(e));break}case kr.DescribeBehaviors:{let e=t;this.registerBehaviors(e.featureCellKey,e.behaviors),this.#y(e.featureCellKey);break}case kr.DescribeControllers:{let e=t;this.registerControllers(e.featureCellKey,e.controllers),this.#y(e.featureCellKey);break}case kr.RequireLicense:{this.#E(t.featureCellKey),this.#S(t);return}case kr.ValidateLicense:{this.#T(t),this.#y(t.featureCellKey);return}}})}#E(t){if(!this.#l||this.#s.has(t))return;let e=setTimeout(()=>{this.#w(t),this.#s.delete(t)},this.#l);this.#s.set(t,e)}#w(t){let e=this.#o.get(t);if(!e)return;let r=[...e.behaviors?.values()??[],...e.controllers?.values()??[]],i=!1;for(let o of r)o.needsLicense&&o.validLicense===oi.Pending&&((e.behaviors?.has(o.key)?e.behaviors:e.controllers)?.set(o.key,Object.freeze(W(g({},o),{validLicense:oi.Timeout}))),i=!0);i&&this.#m(t,!1),this.#v(t)}#y(t){let e=this.#o.get(t);if(!e||!e.behaviorsRegistered||!e.controllersRegistered)return;let i=[...e.behaviors?.values()??[],...e.controllers?.values()??[]].filter(o=>o.needsLicense);if(i.length===0){this.#m(t,!0);return}if(i.some(o=>o.validLicense===oi.Revoked||o.validLicense===oi.Timeout)){this.#v(t),this.#m(t,!1);return}i.some(o=>o.validLicense===oi.Pending)||this.#m(t,!0)}#v(t){let e=this.#s.get(t);e&&(clearTimeout(e),this.#s.delete(t))}#m(t,e){this.#e.has(t)||(this.#e.set(t,e),this.#v(t),this.#u.set(t,e),this.#d.next({featureCellKey:t,approved:e}))}#T(t){let{featureCellKey:e,key:r,licenseToken:i,valid:o}=t;if(this.#e.has(t.featureCellKey))return;if(!r){He("Cannot validate license without a key.");return}let s=this.#o.get(e);s&&(this.#b(s.behaviors,r,i,o),this.#b(s.controllers,r,i,o),o&&r===BP&&this.#I())}#b(t,e,r,i){if(!t?.has(e))return;let o=t.get(e);if(o.needsLicense&&o.licenseId){if(o.licenseId!==r){He(`[vault] License key mismatch for "${e}".`);return}t.set(e,Object.freeze(W(g({},o),{validLicense:i?oi.Valid:oi.Revoked})))}}#S(t){let{featureCellKey:e,key:r,licenseToken:i}=t,o=this.#o.get(e);if(o){if(!r||typeof r!="string")throw new Error("[vault] Cannot register controller license without a key.");this.#D(o.behaviors,r,i),this.#D(o.controllers,r,i)}}#D(t,e,r){if(!t?.has(e))return;let i=t.get(e);i.needsLicense&&(i.licenseId||r&&t.set(e,Object.freeze(W(g({},i),{licenseId:r}))))}#x(){Ct.active&&!Uy.active&&console.error(`[vault] "Development Mode" is enabled outside of a test environment.
This can expose sensitive data because safeguards that normally remove or sanitize data are disabled.
You have explicitly disabled these safeguards and are responsible for ensuring production safety.
If this is intentional, you can safely ignore this message.`)}#R(t){let e=t?.fluentApis??{};return{filters:Array.isArray(e?.filters)?e.filters.length:0,reducers:Array.isArray(e?.reducers)?e.reducers.length:0,beforeTaps:Array.isArray(e?.beforeTaps)?e.beforeTaps.length:0,afterTaps:Array.isArray(e?.afterTaps)?e.afterTaps.length:0,emitStateCallbacks:Array.isArray(e?.emitStateCallbacks)?e.emitStateCallbacks.length:0,errorCallbacks:Array.isArray(e?.errorCallbacks)?e.errorCallbacks.length:0}}#p(t){return this.#o.has(t)||this.#o.set(t,{key:t,behaviorsRegistered:!1,controllersRegistered:!1}),this.#o.get(t)}#I(){this.#i||Ct.active&&(typeof document>"u"||(this.#i=!0,globalThis.sdux??={},globalThis.sdux.debugWidget??={},globalThis.sdux.debugWidget.aiAssistEnabled=!0,document.dispatchEvent(new CustomEvent("sdux-license-resolved"))))}#k(){Ct.active&&(typeof document>"u"||(globalThis.sdux??={},globalThis.sdux.debugWidget??={},globalThis.sdux.debugWidget.getRegistry=()=>this.getRegistrySnapshot(),KT()))}registerVaultSettled(t,e){let r=this.#p(t);r.vaultSettled=e}async awaitFeatureCellSettled(t){let e=this.#o.get(t);if(!e)throw new Error(`[vault] FeatureCell "${t}" not registered.`);typeof e.vaultSettled=="function"&&(await e.vaultSettled(),await Promise.resolve())}async awaitAllSettled(){for(let t of this.#o.values())typeof t.vaultSettled=="function"&&await t.vaultSettled();await Promise.resolve()}getRegistrySnapshot(){return new Map(this.#o)}};function JT(n){if(!$t)throw new Error("[vault] Vault not initialized.");if(!n)throw new Error("[vault] registerFeatureCell() requires a valid entry object.");if(!n.key||typeof n.key!="string")throw new Error('[vault] registerFeatureCell() requires a valid "key" (non-empty string).');$t.registerCellRuntime(n.key)}function eS(n){if(!$t)throw new Error("[vault] Vault not initialized.");if(typeof n!="string"||!n.trim())throw new Error("[vault] getLicensePayload() requires a valid licenseId.");return $t.getLicensePayload(n)}function jP(n,t){if(!$t)throw new Error("[vault] Vault not initialized.");if(!n||typeof n!="string")throw new Error('[vault] registerVaultSettled() requires a valid "key" (non-empty string).');typeof t=="function"&&$t.registerVaultSettled(n,t)}function tS(n){return $t?$t.isBypassLicensing()?!0:$t.isAuthorizedKey(n):!1}function nS(){return $t?$t.isBypassLicensing():!1}function wv(){return $t?$t.hasVaultLicense():!1}var yv=class{#t=!1;#r;#n;#e;constructor(t,e,r){this.#r=t,this.#n=e,this.#e=r}initializeBehaviors(t,e){if(this.#t)throw new Error(`[vault] VaultBehaviorRunner already initialized \u2014 cannot reissue core behavior ID for feature cell "${this.#r}".`);if(this.#t=!0,!t||t.length===0)return[];let r=new Set;return t.map(i=>{let o=!1;try{if(typeof i!="function")return;let s=i[kf];if(!s)throw o=!0,new Error(`[vault] Behavior "${i.name}" missing @VaultBehavior metadata.`);let a=s.key,l=s.type;if(!a)throw o=!0,new Error('[vault] Behavior metadata missing "key".');if(!wv()&&!tS(a)){Ne(`[vault] Unlicensed behavior "${a}" skipped during initialization.`);return}if(!l)throw o=!0,new Error(`[vault] Behavior metadata missing "type" for "${a}".`);let c;if(s.wantsConfig){if(!s.configKey)throw o=!0,new Error(`[vault] Behavior "${a}" declares wantsConfig but has no configKey.`);c=e.get(s.configKey)}let u;if(s.needsLicense&&!nS()){if(!s.licenseId)throw o=!0,new Error(`[vault] Behavior "${a}" declares needsLicense but has no licenseId.`);if(u=eS(s.licenseId),u===void 0)throw o=!0,new Error(`[vault] License "${s.licenseId}" required by behavior "${a}" is not registered in Vault config.`)}let d;try{let h={featureCellKey:this.#r,behaviorConfig:c,licensePayload:u};s.type===x.TabSyncState&&(h=W(g({},h),{lastSnapshot:this.#n,state$:this.#e})),d=new i(a,h)}catch(h){throw o=s.critical,h}if(!d.key)throw o=!0,new Error(`[vault] Behavior missing key for type "${l}". Every behavior must define a unique "key".`);if(!Ky(d.key))throw o=!0,new Error(`[vault] Behavior key "${d.key}" not valid format for "${l}" behavior.`);return d.key&&r.has(d.key)?(He(`[vault] Skipping duplicate behavior with key "${d.key}"`),null):(d.key&&r.add(d.key),d)}catch(s){if(o)throw s;return He(`[vault] Non-critical behavior initialization failed: ${s?.message}`),null}}).filter(i=>!!i)}applyBehaviorExtensions(t,e,r){for(let i of t){let o={featureCellKey:e.key,destroyed$:e.destroyed$,reset$:e.reset$,mergeState:e.mergeState,replaceState:e.replaceState,state$:e.state$,vaultMonitor:r},s=i.extendCellAPI?.(o);if(!(!s||typeof s!="object"))for(let[a,l]of Object.entries(s)){let c=e[a]!==void 0,u=Array.isArray(i.allowOverride)&&i.allowOverride.includes(a);if(LP.has(a))throw new Error(`[vault] Behavior "${i.key}" attempted to overwrite core FeatureCell method "${a}".`);if(c&&!u)throw new Error(`[vault] Behavior "${i.key}" attempted to redefine method "${a}" already provided by another behavior.`);c&&u&&(He(`[vault] Behavior "${i.key}" is overriding method "${a}" (explicitly allowed).`),delete e[a]),Object.defineProperty(e,a,{value:(...d)=>{try{return typeof l!="function"?void 0:l(...d)}catch(h){throw Ut(`[vault] Behavior extension "${a}" threw an error:`,h),h}},enumerable:!1,writable:!1,configurable:!0})}}}},VP=n=>n.type===x.ErrorTransform,UP=n=>n.type===x.CoreErrorCallback,$P=n=>n.type===x.CoreEmitState,na=n=>n===zy,sv=()=>crypto?.randomUUID?.()??Math.random().toString(36).slice(2,7),rS=n=>Vi(n)||na(n),HP={pro:`
-----BEGIN PUBLIC KEY-----
MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEAuXto+eRaFm9pObys/IEI ASwV1wgGvNGJsiyw/9hXsEd9mA76aQI1X9lpkZRKmBFovHdK2unPHFOPQM0k9vJo ieFMNXO9kmHn7UYZV98bDCcDTNURFHQ4SWlcAE/HEiNqcUb9LwotFbON7/mcthM8 QQQ4Lycdv+lm1uozQl8rl+i7FjfQzLaxJMuAkm9jFZK+ta6eoSy/lmXfhDem8RIo dE19aZWfY+LTXP9nn977XFah0z0S0D3NSvMv96gZsXTN2hTbFBl5dgDMAOW9R5OI wT6I+kGwrVqARXq2pTDHnZjqfO3a+rT4Lrb5/L58RjQ0EfA5puZ16EXGEUpOabqI KVT4Z/wv818P8eyat+LtTcy2G0zx/h0Fcz0QANzx3P9K7ezxeqdg4SsjkcNXRWZq PaJUhZHygN/Xuef9zfWwjuKobCBSdyyeXxF5XS0A0Y6NBmdhikyHc/YOY2iYupIt xiUvlHaq97B5wej3XcTmp4kmJUQyeQ8oD5Mj8Dmf69oa7vhI/ANNKWo9s8e7u7UX Dx74Eu3d8JBpACQ+Vvek6ZEGw+D0yCyLF6u/CaCw+cb2cBYAlM7jWZ5kpgsbQcWw YP2nbGV3OofcEspoEU704M4RW4v+nSRYrJbMEIJJ5Wuxk2/RuUgk/9uwgCHAvzXZ cmGomIf9dXZGoNhwT5uW1OECAwEAAQ==
-----END PUBLIC KEY-----
`,enterprise:`
-----BEGIN PUBLIC KEY----- MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEA6k4XHyV4WE6Bd/fizN4Q c3C37LtskNTJ1c3FVxcziygAFd+fotRfbLHctwtJJhuO6+Pv+c1SPjrPeJsWRw4M IN7QHcBQHPbQDW/Erd1XjA0OVNbxs3xLVjtgMuVcd2sKYPp4nJqIyz5WLMde7v1g 1k8knI+ISrym0h4GcjkNSaHK5QKKpK7n3dzOXrjo1P6h1uOVsGAHC/ErVMQNHrAu dKgY+SDVn87oPIrd2pJb5SotI6H8HzODM/CDsF58hk/eK4zApnrtDViVb1j3oNCk hdDOnN98VIgwcHzHYZOhPFM0TFwudpi57Yu/PJJztI7WbsjpxTyX3JPvwVeWJR+Z tt6NEQ5ZaoBghGgHGiuRbhKR5qoznwsMkfb2jUbpbgRTinmtEjFmpIYSnROCixjq W1neupzBDrNi+JfoVsTwiP8SbzxHXWksN0gLMfL235l1LDMS/IrI3RmhcRkhB/Pu vPuc+jhPkwpbXaM9vDkkPWK1dmRYHWo3atYCWoSdK2705woo19oT8Dxm9OXKT+nh HsdOI+k9asBCqe4kQHi3OJ4Raesa6bFWWxKFLeUNKSAt7clJKo7GhrovnHIIAbty gk7ULdwLIlpjwB5mVUBBCts5z9KznHo+pumNoeEA8FGqq374a+jEPOHWjsshA678 RDYeqeRbh2VNcy/OwlqH/MUCAwEAAQ==
-----END PUBLIC KEY-----
`,development:`
-----BEGIN PUBLIC KEY----- MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEAsAFRjQalSEZkCDPrdBEf IMQpY7ujGf4pqjuFk86rkZENr7kJ00RjVJxuhcafgygdmxVAhKS+d1WtsSAw6c9m AawI+sSyhAClB+wrwfuCrxt/ZlLbNMiMH5SD1YvoRaHstkLpMGbWnbsLDI+cCpaL hGKk+5LoJLikhf9ipBkGX8VSAT0xTMk06iaYtEV85H9cMWtfx7seyBw2Mps/8S6f Rtp3tLlbNJIyh9+5XjtkTqYNRWJtFW1rv75K9GN9dPVXrEXUGojqeV13G+z2R3Sr QvmhESkyC1DviZBxaYnEhpWoijJQFJUQ1DGRi29ugktYzf36Otw9gyz9jGb5MLNE W+meR2LdnbTBy83QNtaS5lCzNJVo2ohwbD+djblNVegH/Dr0rK4IHEYSgjdxjErY 6xqykJpKJ025CTU4kyI3aaaYB+l2CQMAKVAh2y2rgGyJSJnMDTR44aBIZ8rtTu2r wazjBJ/RiMr0OOkfBqEQPKZ6qzSWtBDebvD0iUyRAP8SXSdDo1DcaJNamLLmjIxr 3KCcwgJt2oLcdZZHKG3WbjqmIdp7tq03O4gajKJHd5GmyLWtHXKqBwaijAx9aNqr qDPWj/Qg/8C9qpSBs7EUod3slV6UhO4yEnb7FdD/O0o8mRMU0rtJ0KQTarpEh2bY MKVsYxByiFeAjUJUWLSqIX8CAwEAAQ==
-----END PUBLIC KEY-----
`},YT=!1;var zP={verify:async n=>{try{let t=n.indexOf(".");if(t===-1)return!1;let e=n.substring(0,t),r=n.substring(t+1),i=atob(e),o=JSON.parse(i),s=Uint8Array.from(atob(r),d=>d.charCodeAt(0)),a=o?.licenseType;if(!a)return!1;if(!Ct.active&&a==="development")return console.error("[sdux-vault] Development license token rejected in production environment."),!1;let l=HP[a];if(!l)return!1;let c=await WP(l),u=await crypto.subtle.verify({name:"RSASSA-PKCS1-v1_5",hash:"SHA-256"},c,s,new TextEncoder().encode(e));if(YT||(YT=!0,u?console.info(`[sdux-vault] License verified \u2014 organization: "${o.organization}", tier: "${o.licenseType}"`):console.warn(`[sdux-vault] License signature invalid \u2014 organization: "${o.organization}", tier: "${o.licenseType}"`),console.info("[sdux-vault] License organization:",o.organization),console.info("[sdux-vault] License domain:",o.domain),console.info("[sdux-vault] License type:",o.licenseType),console.info("[sdux-vault] License issuedAt:",Bf(o.issuedAt)),console.info("[sdux-vault] License expires:",Bf(o.expires))),u&&o.licenseType==="enterprise"&&typeof o.expires=="number"){let d=o.expires-Date.now();if(d<0)return console.error(`[sdux-vault] Enterprise license expired \u2014 organization: "${o.organization}", expired: ${Bf(o.expires)}`),!1;let h=360*60*60*1e3;d<=h&&console.warn(`[sdux-vault] Enterprise license expiring soon \u2014 organization: "${o.organization}", expires: ${Bf(o.expires)}`)}return u}catch(t){return console.error("[sdux-vault] License token verification failed:",t),!1}}};async function WP(n){let t=qP(GP(n));return crypto.subtle.importKey("spki",t,{name:"RSASSA-PKCS1-v1_5",hash:"SHA-256"},!1,["verify"])}function GP(n){let t=n.replace(/-----.*KEY-----/g,"").replace(/\s+/g,"");return atob(t)}function qP(n){let t=new ArrayBuffer(n.length),e=new Uint8Array(t);for(let r=0;r<n.length;r++)e[r]=n.charCodeAt(r);return t}function Bf(n){return typeof n=="string"?n:new Intl.DateTimeFormat("en-US",{month:"2-digit",day:"2-digit",year:"numeric"}).format(new Date(n))}async function KP(n){try{return n?await zP.verify(n):!1}catch{return!1}}var Tv=(()=>{class n{static needsLicense;static key;#t;#r;#n;#e;constructor(e){let r=this.constructor;if(typeof r.key!="string"||!r.key.trim())throw new Ql('LicensingClass requires a static "key". Did you forget @VaultBehavior or @VaultController?');this.#e=rc(),this.#n=r.key,this.#r=e.featureCellKey,r.needsLicense&&this.#i()}#i(){this.#t=this.#e.requestLicense(this.#r,this.#n)}validateLicense(e){if(!this.#t)throw new Ql(`validateLicense() called but no license was requested for "${this.#r}" and "${this.#n}".`);this.#e.validateLicense(this.#r,this.#n,this.#t,e)}}return n})(),vv=class extends Tv{behaviorCtx;static type;static key;static critical;static needsLicense;type=x.CoreLicense;critical=!0;key;constructor(t,e){super(e),this.behaviorCtx=e,this.key=t,KP(this.behaviorCtx.licensePayload).then(r=>this.validateLicense(r))}destroy(){He(`${this.key} - destroy noop`)}reset(){He(`${this.key} - reset noop`)}};vv=Ra([$T({type:x.CoreLicense,key:qy("Core","License"),critical:!0,needsLicense:!0,licenseId:XT})],vv);var bv=class{#t;#r;#n;#e;cellKey;decisionEngine;#i;#a;#l;#s;#c;#d;#u;privateErrorService=jT();#f=[];#o;#C;#h;vaultMonitor=Ev();constructor(t){this.#t=t.afterTapCallbacks??[],this.#r=t.beforeTapCallbacks??[],this.cellKey=t.cell?.key,this.#s=t.emitStateCallbacks??[],this.#u=t.errorCallbacks??[],this.#f=t.filterCallbacks??[],this.#o=t.initialState,this.#h=t.reducerCallbacks??[]}initializeOrchestrator(t){t.behaviors=t.behaviors??[],this.#b(t)}async initializeFeatureCell(t){await this.#H(t)}destroyBehaviors(t){this.#V(t)}resetBehaviors(t){this.#L(t)}async orchestrate(t,e){t.operation===On.Replace?await this.#k(t):await this.#F(t,e)}buildControllerCtx(t){return{traceId:t.traceId,featureCellKey:t.featureCellKey,snapshot:t.lastSnapshot,incoming:t.incoming,operation:t.operation}}normalizeIncoming(t){return t?Zy(t)||on(t)||ea(t)||ea(t)?t:WT(t)?me(t):{value:t}:null}controllerOutcomeNotification(t,e){switch(t){case pn.Abort:{this.#c.finalizeControllerAbort(e);break}case pn.Deny:{this.#c.finalizeControllerDeny(e);break}}}prepareIncoming(t,e,r){t=this.#g(t,e,r);let i=this.#c.preparePipelineIncoming(t);if(Vi(i)&&(this.vaultMonitor.startCoreState(this.cellKey,Pe,t),this.#M(t),this.vaultMonitor.endCoreState(this.cellKey,Pe,t)),jo(i)){this.vaultMonitor.startCoreState(this.cellKey,Pe,t),this.#L(t),this.#M(t),this.vaultMonitor.endCoreState(this.cellKey,Pe,t);return}return i}#g(t,e,r){return t.incoming=this.normalizeIncoming(e),t.resolveType=this.#$(e),t.operation=r,t}#E(t,e){let r=e.behaviors.filter(i=>i.type===x.Merge);if(r.length>1){let i=r.map(o=>o.key).join(", ");throw new Error(`SDuX Error: More than one MergeBehavior was provided. Only one merge strategy can be active per FeatureCell. Received: ${i}. Fix: Remove additional merge behaviors or combine them into a single behavior.`)}return r.length===1&&(t.push(r[0]),t=t.filter(i=>i.type!==x.Merge)),t}#w(t){let e=t.defaultBehaviors??[];return e=this.#y(e,t),e=this.#E(e,t),e=this.#v(e,t),e=this.#m(e),e}#y(t,e){return e?.errorCallbacks?.length===0?t.filter(r=>r.type!==x.CoreErrorCallback):t}#v(t,e){return e?.emitStateCallbacks?.length===0?t.filter(r=>r.type!==x.CoreEmitState):t}#m(t){return t=t?.filter(e=>e.type!==x.CoreLicense),wv()&&t.push(vv),t}#T(t){let e=t.map(r=>{let i=r[kf];return{key:r.key,type:i.type,critical:i.critical,needsLicense:i.needsLicense}});rc().describeBehaviors({featureCellKey:this.cellKey,behaviors:e})}#b(t){let e=this.#w(t),r=t.behaviors?.filter(a=>!(a.type===x.CoreAfterTap||a.type===x.CoreBeforeTap||a.type===x.CoreError||a.type===x.CoreErrorCallback||a.type===x.CoreEmitState||a.type===x.CoreLicense||a.type===x.CoreState||a.type===x.Filter||a.type===x.FromObservable||a.type===x.FromPromise||a.type===x.FromStream||a.type===x.Reduce||a.type===x.Resolve));t.operators=t.operators??[],t.interceptors=t.interceptors??[];let i=[...e,...r,...t.operators,...t.interceptors];i.some(a=>a.type===x.TabSyncState)&&(i=i.filter(a=>a.type!==x.CoreState));let s=new yv(this.cellKey,t.lastSnapshot,t.state$);this.#T(i),this.#n=s.initializeBehaviors(i,t.behaviorConfigs),this.#x(),this.#R(),this.#S(),this.#D(),s.applyBehaviorExtensions(this.#n,t.cell,this.vaultMonitor)}#S(){this.#e=this.#n.filter(t=>!(t.type===x.CoreState||t.type===x.TabSyncState||t.type===x.CoreEmitState||t.type===x.CoreError||t.type===x.ErrorTransform||t.type===x.CoreErrorCallback||t.type===x.Merge))}#D(){let t=this.#n.filter(i=>i.type===x.TabSyncState),e=this.#n.filter(i=>i.type===x.CoreState),r=t.length>0?t:e;if(r.length>1)throw new Error("Only one core state behavior can be registered for a FeatureCell.");this.#c=r[0]??null,this.#l=this.#n.filter(i=>$P(i))[0]}#x(){let t=this.#n.filter(e=>e.type===x.CoreError);if(t.length>1)throw new Error("Only one core error behavior can be registered for a FeatureCell.");this.#i=t[0]??null,this.#a=this.#n.filter(e=>UP(e))[0],this.#d=this.#n.filter(e=>VP(e))}#R(){let t=this.#n.filter(e=>e.type===x.Merge);this.#C=t[0]??null}async#p(t,e,r){let i=await this.#_(t,e,r);return jo(i)?ec:Vi(i)?Of:Hy}async#I(t,e){let r,i=await this.#p(x.StepwiseResolve,t,e);if(!Lf(i))return i;if(this.#B()){if(r=await this.#j(t,e),Vi(r))return Of}else r=e;r=await this.#_(x.Filter,t,r);let o=await this.#p(x.StepwiseFilter,t,r);if(!Lf(o))return o;await this.#_(x.CoreBeforeTap,t,me(r)),r=await this.#_(x.Reduce,t,r);let s=await this.#p(x.StepwiseReducer,t,r);if(!Lf(s))return s;await this.#_(x.CoreAfterTap,t,me(r));let a=me(r),l=a;return l=await this.#P(x.Encrypt,t,l),await this.#P(x.Persist,t,l),a}async#k(t){this.vaultMonitor.startReplace(this.cellKey,Pe,t),await this.#O(async()=>{let e;if(e=await this.#N(t),!na(e)){let r=await this.#_(x.Resolve,t,void 0);jo(r)?e=ec:e=await this.#I(t,r)}return this.#A(e,t)},t)}async#F(t,e){this.vaultMonitor.startMerge(this.cellKey,Pe,t),await this.#O(async()=>{let r=me(t.lastSnapshot.value),i;if(i=await this.#N(t),!na(i)){let o=await this.#_(x.Resolve,t,void 0),s=me(o);this.vaultMonitor.startComputeMerge(this.cellKey,Pe,t);let a=await this.#C.computeMerge(r,s,e);if(this.vaultMonitor.endComputeMerge(this.cellKey,Pe,t),jo(a))i=ec;else{let l=me(a);i=await this.#I(t,l)}}return await this.#A(i,t)},t)}async#A(t,e){let r;return na(t)?r={pipelinePaused:!0}:jo(t)?r={pipelineStateCleared:!0}:(nc(t)||Vi(t))&&(r={noop:!0}),e.operation===On.Replace?this.vaultMonitor.endReplace(this.cellKey,Pe,e,r):this.vaultMonitor.endMerge(this.cellKey,Pe,e,r),t}async#O(t,e){try{let r=await t();this.vaultMonitor.startCoreState(this.cellKey,Pe,e),na(r)?this.#c.finalizePipelineVaultStop(e):this.#c.finalizePipelineState(r,e),await this.#M(e),this.vaultMonitor.endCoreState(this.cellKey,Pe,e),this.decisionEngine?.notifySuccess(this.buildControllerCtx(e))}catch(r){let i=await this.#U(r,e);await this.decisionEngine?.notifyFailure(this.buildControllerCtx(e),i)}}async#_(t,e,r){let i;t===x.Resolve?i=this.#e.filter(o=>o.resolveType===e.resolveType&&o.type===t):i=this.#e.filter(o=>o.type===t);for(let o of i){let s;try{switch(t){case x.Resolve:typeof o.computeResolve=="function"&&(this.vaultMonitor.startResolve(this.cellKey,o.key,e),s=await o.computeResolve(e),Rr(s)&&(r=me(s)),this.vaultMonitor.endResolve(this.cellKey,o.key,e));break;case x.StepwiseResolve:case x.StepwiseFilter:case x.StepwiseReducer:if(typeof o.evaluateStepwise=="function"){this.vaultMonitor.startStepwise(this.cellKey,o.key,e);let a=me(e.lastSnapshot.value),l=me(r);s=await o.evaluateStepwise(a,l,e.featureCellKey),this.vaultMonitor.endStepwise(this.cellKey,o.key,e)}break;case x.Filter:if(typeof o.applyFilter=="function")for(let a of this.#f){this.vaultMonitor.startFilter(this.cellKey,o.key,e);let l=me(r),c=await o.applyFilter(l,a);this.vaultMonitor.endFilter(this.cellKey,o.key,e),Rr(c)&&(r=me(c))}break;case x.CoreBeforeTap:if(typeof o.applyBeforeTap=="function")for(let a of this.#r){this.vaultMonitor.startBeforeTap(this.cellKey,o.key,e);let l=me(r);await o.applyBeforeTap(l,a),this.vaultMonitor.endBeforeTap(this.cellKey,o.key,e)}break;case x.Reduce:if(typeof o.applyReducer=="function"){if(nc(r)&&this.#h.length>0)throw new Error(`[vault] Reducer stage received undefined state in FeatureCell "${this.cellKey}", but reducers are registered.`);for(let a of this.#h){this.vaultMonitor.startReducer(this.cellKey,o.key,e);let l=me(r),c=await o.applyReducer(l,a);this.vaultMonitor.endReducer(this.cellKey,o.key,e),Rr(c)&&(r=me(c))}}break;case x.CoreAfterTap:if(typeof o.applyAfterTap=="function")for(let a of this.#t){this.vaultMonitor.startAfterTap(this.cellKey,o.key,e);let l=me(r);await o.applyAfterTap(l,a),this.vaultMonitor.endAfterTap(this.cellKey,o.key,e)}break}}catch(a){throw this.vaultMonitor.runtimeError(this.cellKey,o.key,e,a),a}Rr(s)&&(r=me(s))}return r}async#N(t){let e=this.#e.filter(r=>r.type===x.Interceptor);for(let r of e)try{this.vaultMonitor.startInterceptor(this.cellKey,r.key,t),t.incoming=me(t.incoming);let i=await r.applyInterceptor(t);if(na(i))return this.vaultMonitor.endInterceptor(this.cellKey,r.key,t,{pipelinePaused:!0}),zy;this.vaultMonitor.endInterceptor(this.cellKey,r.key,t)}catch(i){throw this.vaultMonitor.runtimeError(this.cellKey,r.key,t,i),i}}#B(){return this.#e.filter(e=>e.type===x.Operator).length>0}async#j(t,e){let r=this.#e.filter(i=>i.type===x.Operator);for(let i of r)try{this.vaultMonitor.startOperator(this.cellKey,i.key,t);let o=me(e),s=await i.applyOperator(o);if(nc(s)){this.vaultMonitor.endOperator(this.cellKey,i.key,t,{noop:!0});return}e=me(s),this.vaultMonitor.endOperator(this.cellKey,i.key,t)}catch(o){throw this.vaultMonitor.runtimeError(this.cellKey,i.key,t,o),o}return e}async#P(t,e,r){let i;i=this.#e.filter(o=>o.type===t);for(let o of i)try{switch(t){case x.Encrypt:if(typeof o.encryptState=="function"){this.vaultMonitor.startEncrypt(this.cellKey,o.key,e);let s=me(r),a=await o.encryptState(e,s);this.vaultMonitor.endEncrypt(this.cellKey,o.key,e),Rr(a)&&(r=me(a))}break;case x.Persist:if(typeof o.persistState=="function"){this.vaultMonitor.startPersist(this.cellKey,o.key,e);let s=me(r);await o.persistState(s),this.vaultMonitor.endPersist(this.cellKey,o.key,e)}break}}catch(s){throw this.vaultMonitor.runtimeError(this.cellKey,o.key,e,s),s}return r}#V(t){for(let e of this.#n){this.vaultMonitor.startDestroy(this.cellKey,e.key,t);try{e.destroy?.(t),this.vaultMonitor.endDestroy(this.cellKey,e.key,t)}catch(r){Ut(`${e.key} destroy() failed`,r),this.vaultMonitor.endDestroy(this.cellKey,e.key,t,{destroyFailed:!0})}}}#L(t){for(let e of this.#n){this.vaultMonitor.startReset(this.cellKey,e.key,t);try{e.reset?.(t),this.vaultMonitor.endReset(this.cellKey,e.key,t)}catch(r){Ut(`${e.key} reset() failed`,r),this.vaultMonitor.endReset(this.cellKey,e.key,t,{resetFailed:!0})}}}async#M(t){if(this.#s?.length>0){let e=me(t.lastSnapshot);this.vaultMonitor.startCoreEmitState(this.cellKey,Pe,t);for(let r of this.#s)await this.#l.emitState(e,r);this.vaultMonitor.endCoreEmitState(this.cellKey,Pe,t)}}async#U(t,e){let r;try{this.vaultMonitor.startCoreError(this.cellKey,Pe,e),r=await this.#i.handleError(t,e.featureCellKey),Ne(`${this.cellKey} #runErrorBehaviors starting with base ResourceError: ${JSON.stringify(r)}`)}catch(i){Ut("[vault] Core error normalization failed",i),r=Bo(t,e.featureCellKey)}finally{this.vaultMonitor.endCoreError(this.cellKey,Pe,e)}for(let i of this.#d)try{this.vaultMonitor.startErrorTransform(this.cellKey,Pe,e);let o=await i.transformError(me(t),me(r),me(e.lastSnapshot));!Vi(o)&&!Ff(o)&&(r=o)}catch(o){Ut(`[vault] ErrorBehavior "${i.key}" threw during error handling`,o)}finally{this.vaultMonitor.endErrorTransform(this.cellKey,Pe,e,r)}try{this.vaultMonitor.startCoreState(this.cellKey,Pe,e),await this.#c.finalizePipelineError(r,e),await this.#M(e)}catch(i){Ut("[vault] Failed to finalize error state",i)}finally{this.vaultMonitor.endCoreState(this.cellKey,Pe,e)}try{this.vaultMonitor.startGlobalError(this.cellKey,Pe,e),await this.privateErrorService.setError(me(r))}catch(i){Ut("[vault] global error service",i)}finally{this.vaultMonitor.endGlobalError(this.cellKey,Pe,e)}if(this.#u?.length>0){this.vaultMonitor.startCoreCallbackError(this.cellKey,Pe,e);for(let i of this.#u)try{await this.#a.callbackError(me(r),me(e.lastSnapshot),i)}catch(o){Ut("[vault] Error callback threw during error handling",o)}this.vaultMonitor.endCoreCallbackError(this.cellKey,Pe,e)}return Ne(`${this.cellKey} #runErrorBehaviors completed with final ResourceError: ${JSON.stringify(r)}`),r}#$(t){if(Zy(t))return tc.HttpResource;if(on(t))return tc.Observable;if(ea(t)||ea(t?.value))return tc.Promise;if(Yy(t)||Yy(t?.value))throw new Rf;return tc.Value}async#H(t){let e={value:void 0,loading:!1,error:null},r;if(ea(this.#o))r=this.#o;else{let i=this.#z();if(i.length>0){let o=await this.#W(t,i);Rr(o)&&(Ne("Persisted data loaded from storage"),r=o)}else Ff(this.#o)||(this.vaultMonitor.startSetInitialValue(this.cellKey,Pe,t),Ne("Initialized data loaded from descriptor.initial"),r=this.#o,this.vaultMonitor.endSetInitialValue(this.cellKey,Pe,t))}e.value=r,Ff(e.value)?this.decisionEngine?.notifySuccess(this.buildControllerCtx(t)):await this.orchestrate(this.#g(t,e,On.Replace))}#z(){return this.#e.filter(t=>t.type===x.Persist)}async#W(t,e){let r;for(let o of e)try{if(this.vaultMonitor.startLoadPersist(this.cellKey,o.key,t),r=await o.loadState?.(),Rr(r)){this.vaultMonitor.endLoadPersist(this.cellKey,o.key,t);break}else this.vaultMonitor.endLoadPersist(this.cellKey,o.key,t,{noop:!0})}catch(s){this.vaultMonitor.runtimeError(this.cellKey,o.key,t,s),He(`"[vault] persist.loadState()" for ${o.key} failed with ${s.message}`)}let i=this.#e.filter(o=>o.type===x.Encrypt);if(Rr(r)&&i.length>0)for(let o of i)try{this.vaultMonitor.startDecrypt(this.cellKey,o.key,t);let s=await o.decryptState?.(t,r);Rr(s)?(this.vaultMonitor.endDecrypt(this.cellKey,o.key,t),r=me(s)):this.vaultMonitor.endDecrypt(this.cellKey,o.key,t,{noop:!0})}catch(s){this.vaultMonitor.runtimeError(this.cellKey,o.key,t,s),He(`"[vault] encrypt.decryptState()" for ${o.key} failed with ${s.message}`);return}return r}},ta={Pending:"pending",Approved:"approved",Denied:"denied"},_v=class{#t=!1;#r;constructor(t){this.#r=t}initializeControllers(t,e,r){if(this.#t)throw new Error(`[vault] VaultControllerRunner already initialized \u2014 cannot reissue core controller ID for feature cell "${this.#r}".`);if(this.#t=!0,!t||t.length===0)return[];let i=new Set;return t.map(o=>{let s=!1;try{if(typeof o!="function")return;let a=o[Af];if(!a)throw s=!0,new Error(`[vault] Controller "${o.name}" missing @VaultController metadata.`);let l=a.key,c=a.type;if(!l)throw s=!0,new Error('[vault] Controller metadata missing "key".');if(!wv()&&!tS(l)){Ne(`[vault] Unlicensed controller "${l}" skipped during initialization.`);return}if(!c)throw s=!0,new Error(`[vault] Controller metadata missing "type" for "${l}".`);let u;if(a.wantsConfig){if(!a.configKey)throw s=!0,new Error(`[vault] Controller "${l}" declares wantsConfig but has no configKey.`);u=r.get(a.configKey)}let d;if(a.needsLicense&&!nS()){if(!a.licenseId)throw s=!0,new Error(`[vault] Controller "${l}" declares needsLicense but has no licenseId.`);if(d=eS(a.licenseId),d===void 0)throw s=!0,new Error(`[vault] License "${a.licenseId}" required by controller "${l}" is not registered in Vault config.`)}let h={featureCellKey:this.#r,requestRevote:m=>{e.next({traceId:m,type:Nn.Revote})},requestAbort:m=>{e.next({traceId:m,type:Nn.Abort})},controllerConfig:u,licensePayload:d};c===ji.License&&(h.licenseDenied=m=>{e.next({traceId:m,type:Nn.LicenseDenied})},h.licenseApproved=m=>{e.next({traceId:m,type:Nn.LicenseApproved})});let p=new o(l,h);if(!p.key)throw s=!0,new Error(`[vault] Controller missing key for type "${c}". Every controller must define a unique "key".`);if(!zT(p.key))throw s=!0,new Error(`[vault] Controller key "${p.key}" not valid format for "${c}" controller.`);return p.key&&i.has(p.key)?(He(`[vault] Skipping duplicate controller with key "${p.key}"`),null):(p.key&&i.add(p.key),p)}catch(a){if(s)throw a;return He(`[vault] Non-critical controller initialization failed: ${a?.message}`),null}}).filter(o=>!!o)}},Cv=class extends bv{#t=[];#r=[];#n=new C;#e=!1;#i=!1;#a=ta.Pending;#l=new C;constructor(t){super(t),rc().describeFeature({featureCellKey:t.cell.key,fluentApis:{filters:t.filterCallbacks,reducers:t.reducerCallbacks,beforeTaps:t.beforeTapCallbacks,afterTaps:t.afterTapCallbacks,emitStateCallbacks:t.emitStateCallbacks,errorCallbacks:t.errorCallbacks}}),Ct.active&&(this.vaultSettled=this.#D.bind(this)),this.#m(t),this.vaultMonitor.conductorLicenseAttempt(this.cellKey,`${this.cellKey}::license`),this.initializeOrchestrator(t)}initialize(t){let e=this.#h(t,On.Initialize,void 0);this.#d({behaviorCtx:e,controllerCtx:this.buildControllerCtx(e),options:void 0})}conduct(t,e,r,i){let o=this.#h(t,r,i),s=this.prepareIncoming(o,e,r);if(Vi(s)||jo(s))return;o.incoming=s;let a=this.buildControllerCtx(o);this.#d({behaviorCtx:o,controllerCtx:a,options:i})}reset(t){this.vaultMonitor.startReset(this.cellKey,Dt,t),t.traceId=t.traceId??sv(),this.#g(),this.resetBehaviors(t),this.#w(t),this.vaultMonitor.endReset(this.cellKey,Dt,t)}destroy(t){Ne(`${Dt} - destroy`),t.traceId=t.traceId??sv(),this.vaultMonitor.startDestroy(this.cellKey,Dt,t),this.#g(),this.destroyBehaviors(t),this.#E(t),this.#n.complete(),this.vaultMonitor.endDestroy(this.cellKey,Dt,t)}async#s(t,e){if(t.operation===On.Initialize){await this.initializeFeatureCell(t);return}if(t.operation===On.Replace||t.operation===On.Merge){await this.orchestrate(t,e);return}this.vaultMonitor.runtimeError(this.cellKey,Dt,t,new Error(`Unknown operation type: "${t.operation}"`)),this.#u(t)}#c(){queueMicrotask(()=>{this.#b()})}#d(t){this.#a===ta.Pending||this.#a===ta.Approved?(this.vaultMonitor.startControllerAttempt(this.cellKey,Dt,t.controllerCtx),this.#t.push(t),this.#a===ta.Approved?!this.#e&&this.#t.length===1?this.#o():this.#i&&this.#c():this.#c()):this.#c()}#u(t){let e=this.#t[0];!e||e.finalized||(e.finalized=!0,queueMicrotask(()=>{this.decisionEngine.notifyFinalize(t),this.#t.shift(),this.#e=!1,this.#S(),this.#o()}))}#f(t,e){this.vaultMonitor.restartControllerAttempt(this.cellKey,Dt,t,e),this.#e=!1}async#o(){if(this.#e||!this.#t.length)return;this.#e=!0;let t=this.#t[0];if(!t){this.#e=!1;return}try{let e=await ls(this.#T(t)),r=this.#t[0];if(!r){this.#e=!1;return}let{behaviorCtx:i,options:o}=r,s=!1;switch(e){case pn.Abstain:{Ne(`${this.cellKey} DecisionOutcome: "${pn.Abstain} received. Process Event dispatched.`),await this.#s(i,o);break}case pn.Abort:{this.controllerOutcomeNotification(pn.Abort,i),this.vaultMonitor.endControllerAttempt(this.cellKey,Dt,i,{status:e}),this.#u(i);break}case pn.Deny:{this.#b(),s=!0,this.#e=!1,this.vaultMonitor.notifyConductorDeny(this.cellKey,Dt,i),this.controllerOutcomeNotification(pn.Deny,i);break}}if(s)this.#i=!0;else return this.#i=!1,this.#o()}catch(e){Ut("[conductor] Unreachable subscription error",e),this.vaultMonitor.conductorCrashed(this.cellKey,Dt,t?.controllerCtx??{traceId:"unknown"},e),this.#t.shift(),this.#o()}}#C(){this.decisionEngine=new mv(this.#r,this.#n),this.#n.subscribe({next:t=>{if(t.type===Nn.LicenseDenied){this.vaultMonitor.conductorLicenseDenied(this.cellKey,`${this.cellKey}::license`),this.#a=ta.Denied;let r=new Error(`${this.cellKey} Conductor Decision Engine: The FeatureCell received a "License Denied". Pipeline is disabled.`);console.error(`[vault] ${r.message}`),Ne(r.message),this.privateErrorService.setError(Bo(r,this.cellKey)),this.#t.length=0;return}if(t.type===Nn.LicenseApproved){this.vaultMonitor.conductorLicenseApproved(this.cellKey,`${this.cellKey}::license`),this.#a=ta.Approved,Ne(`${this.cellKey} Conductor Decision Engine: License Approved.`),this.#o();return}let e=this.#t[0];if(e){if(e.controllerCtx.traceId!==t.traceId){Ne(`The head ctx is not the same as the event. ${e.controllerCtx.traceId} != ${t.traceId}`);return}switch(t.type){case Nn.Success:{this.vaultMonitor.endControllerAttempt(this.cellKey,Dt,e.controllerCtx,{status:"success"}),this.#u(e.controllerCtx);break}case Nn.Failure:{this.vaultMonitor.endControllerAttempt(this.cellKey,Dt,e.controllerCtx,{status:"failure"}),this.#f(e.behaviorCtx,t.type);break}case Nn.Abort:{this.vaultMonitor.conductorAbort(this.cellKey,Dt,e.controllerCtx),Ne(`${this.cellKey} Conductor Decision Engine: Abort request received for Behavior TraceId: ${e.controllerCtx.traceId}.`),this.#u(e.controllerCtx);break}case Nn.Revote:{Ne(`${this.cellKey} Conductor Decision Engine: Revote request received for Behavior TraceId: ${e.controllerCtx.traceId}.`),this.vaultMonitor.conductorRevote(this.cellKey,Dt,e.controllerCtx),this.#e=!1,Ne(`${this.cellKey} Conductor Decision Engine: processQueue event dispatched for Behavior TraceId: ${e.controllerCtx.traceId}.`),this.#o();break}}}}})}#h(t,e,r){let i=sv();return{destroyed$:t.destroyed$,reset$:t.reset$,state$:t.state$,featureCellKey:t.featureCellKey,state:t.state,lastSnapshot:t.lastSnapshot,options:r!=null?me(r):r,traceId:i,operation:e,resolveType:void 0,incoming:void 0}}#g(){this.#t.length=0,this.#e=!1}#E(t){for(let e of this.#r){this.vaultMonitor.startDestroy(this.cellKey,e.key,t);try{e.destroy?.(),this.vaultMonitor.endDestroy(this.cellKey,e.key,t)}catch(r){Ut(`${e.key} destroy() failed`,r),this.vaultMonitor.endDestroy(this.cellKey,e.key,t,{destroyFailed:!0})}}}#w(t){for(let e of this.#r){this.vaultMonitor.startReset(this.cellKey,e.key,t);try{e.reset?.(),this.vaultMonitor.endReset(this.cellKey,e.key,t)}catch(r){Ut(`${e.key} reset() failed`,r),this.vaultMonitor.endReset(this.cellKey,e.key,t,{resetFailed:!0})}}}#y(t,e){let r=e.controllers.filter(i=>i.type===ji.Error);if(r.length>1){let i=r.map(o=>o.key).join(", ");throw new Error(`SDuX Error: More than one ErrorController was provided. Only one error policy can be active per FeatureCell. Received: ${i}. Fix: Remove additional error controllers or combine them into a single controller.`)}r.length===1?t.push(r[0]):t.unshift(lv)}#v(t){return t.filter(e=>e.type===ji.License||e.type===ji.CoreAbstain?(Ne(`${this.cellKey} Conductor: Filtering out controller "${e.key}" of type "${e.type}" as it is reserved for internal use.`),!1):!0)}#m(t){t.controllers=t.controllers??[];let e=this.#v(t.controllers);this.#y(e,t),e.unshift(uv),e.unshift(av);let r=e.map(o=>{let s=o[Af];return{key:o.key,type:s.type,critical:s.critical,needsLicense:s.needsLicense}});rc().describeControllers({featureCellKey:this.cellKey,controllers:r});let i=new _v(t.cell.key);this.#r=i.initializeControllers(e,this.#n,t.behaviorConfigs),this.#C()}#T(t){return this.vaultMonitor.startConductorVote(this.cellKey,Dt,t.controllerCtx),this.decisionEngine.evaluateAttempt(t.controllerCtx)?.pipe(ot(e=>{this.vaultMonitor.endConductorVote(this.cellKey,Dt,t.controllerCtx,e)}),se(e=>e.outcome))}#b(){Ct.active&&this.#l.next()}#S(){!Ct.active||this.#t.length>0||queueMicrotask(()=>{this.#l.next()})}#D(){return ls(this.#l)}},mn="vault-feature-cell";function YP(n,t=[]){if(typeof n.initialState=="object"&&n.initialState!==null&&"data"in n.initialState)throw new Error(`[vault] Invalid FeatureCelldescriptorModel.initial for feature "${n.key}". Expected raw data (e.g., [] or {}), but received an object with resource fields { loading, data, error }. Pass plain data to avoid double-wrapping.`);if(t.filter(r=>r.type===x.Encrypt).length>1)throw new Error("[vault] FeatureCell cannot register multiple encryption behaviors.")}var Dv=class{featureCellConfiguration;defaultBehaviors;behaviors;controllers;#t=!1;#r;#n=!1;#e=Ev();cell;cellKey;ctx;destroyed$=new C;reset$=new C;state$=new C;constructor(t,e,r,i){this.featureCellConfiguration=t,this.defaultBehaviors=e,this.behaviors=r,this.controllers=i,this.cellKey=this.featureCellConfiguration.key,this.ctx=this.#i()}#i(){let t=this.destroyed$.asObservable(),e=this.state$,r=this.reset$.asObservable(),i={isLoading:!1,value:void 0,error:null,hasValue:!1},o={destroyed$:t,featureCellKey:this.cellKey,reset$:r,state$:e,get state(){let s=this.lastSnapshot;return{isLoading:s.isLoading,value:s.value,error:s.error,hasValue:s.hasValue}}};return Object.defineProperty(o,"lastSnapshot",{value:i,writable:!1,configurable:!1,enumerable:!0}),o}reset(){this.#e.startReset(this.cellKey,mn,this.ctx),He(`${mn}: reset`),this.#a(),this.reset$.next(),this.#r?.reset(this.ctx),this.#e.endReset(this.cellKey,mn,this.ctx)}destroy(){this.#e.startDestroy(this.cellKey,mn,this.ctx),He(`${mn}: destroy`),this.reset$.next(),this.reset$.complete(),this.#r?.destroy(this.ctx),this.destroyed$.next(),this.destroyed$.complete(),this.state$.complete(),this.#e.endDestroy(this.cellKey,mn,this.ctx)}#a(){if(this.#t){let t=`[vault] FeatureCell "${this.featureCellConfiguration.key}" encountered a critical initialization failure and is now in a corrupted state. Further use is blocked.`;throw this.#e.runtimeError(this.cellKey,mn,this.ctx,t),new Error(t)}if(!this.#n){let t=`[vault] FeatureCell "${this.featureCellConfiguration.key}" has not been initialized. You must call cell.initialize() before using state methods.`;throw this.#e.runtimeError(this.cellKey,mn,this.ctx,t),new Error(t)}}#l(t){if(this.#n){let e=`[vault] FeatureCell "${this.featureCellConfiguration.key}" already initialized.`;throw this.#e.runtimeError(this.cellKey,mn,this.ctx,e),new Error(e)}try{this.#e.registerCell(this.cellKey,this.featureCellConfiguration.insights),this.#e.startInitialized(this.cellKey,mn,this.ctx),YP(this.featureCellConfiguration,this.behaviors),this.#n=!0,this.#r=new Cv({afterTapCallbacks:t.afterTapCallbacks,beforeTapCallbacks:t.beforeTapCallbacks,behaviors:this.behaviors,behaviorConfigs:t.behaviorConfigs,cell:this.cell,defaultBehaviors:this.defaultBehaviors,controllers:this.controllers,emitStateCallbacks:t.emitStateCallbacks,errorCallbacks:t.errorCallbacks,filterCallbacks:t.filterFunctions,initialState:t.hydrate||this.featureCellConfiguration.initialState,interceptors:t.interceptors,lastSnapshot:this.ctx.lastSnapshot,operators:t.operators,reducerCallbacks:t.reducerFunctions,state$:this.state$}),this.#r.initialize(this.ctx),Ct.active&&(Object.defineProperty(this.cell,"vaultSettled",{enumerable:!1,configurable:!1,writable:!1,value:()=>this.#r.vaultSettled()}),jP(this.cellKey,this.#r.vaultSettled.bind(this.#r))),this.#e.endInitialized(this.cellKey,mn,this.ctx)}catch(e){throw this.#t=!0,this.#e.runtimeError(this.cellKey,mn,this.ctx,e),e}}#s(t){throw this.#t=!0,this.#e.runtimeError(this.cellKey,mn,this.ctx,t),new Error(t)}setup(){let t=[],e=[],r=[],i=[],o,s=[],a=[],l=[],c=[],u=new Map,d={behaviorConfigs:u,afterTaps:h=>(this.#n&&this.#s('Cannot call "afterTaps" after initialize(). Configuration must be done before initialization.'),Array.isArray(h)&&t.push(...h),d),beforeTaps:h=>(this.#n&&this.#s('Cannot call "beforeTaps" after initialize(). Configuration must be done before initialization.'),Array.isArray(h)&&e.push(...h),d),emitStates:h=>(this.#n&&this.#s('Cannot call "emitStates" after initialize(). Configuration must be done before initialization.'),Array.isArray(h)&&c.push(...h),d),errors:h=>(this.#n&&this.#s('Cannot call "errors" after initialize(). Configuration must be done before initialization.'),Array.isArray(h)&&r.push(...h),d),filters:h=>(this.#n&&this.#s('Cannot call "filters" after initialize(). Configuration must be done before initialization.'),Array.isArray(h)&&i.push(...h),d),hydrate:h=>(this.#n&&this.#s('Cannot call "hydrate" after initialize(). Configuration must be done before initialization.'),o=h,d),initialize:()=>{this.#l({afterTapCallbacks:t,beforeTapCallbacks:e,behaviorConfigs:u,emitStateCallbacks:c,errorCallbacks:r,filterFunctions:i,hydrate:o,interceptors:s,operators:a,reducerFunctions:l})},interceptors:h=>(this.#n&&this.#s('Cannot call "interceptors" after initialize(). Configuration must be done before initialization.'),Array.isArray(h)&&s.push(...h),d),operators:h=>(this.#n&&this.#s('Cannot call "operators" after initialize(). Configuration must be done before initialization.'),Array.isArray(h)&&a.push(...h),d),reducers:h=>(this.#n&&this.#s('Cannot call "reducers" after initialize(). Configuration must be done before initialization.'),Array.isArray(h)&&l.push(...h),d)};return d}mergeState(t,e){return this.#a(),this.#r.conduct(this.ctx,t,On.Merge,e)}replaceState(t,e){return this.#a(),this.#r.conduct(this.ctx,t,On.Replace,e)}},Hf=class extends Dv{constructor(t,e,r,i){super(t,e,r,i)}build(){let t=this.setup(),e=this.ctx,r={afterTaps:(...i)=>(t.afterTaps(...i),r),beforeTaps:(...i)=>(t.beforeTaps(...i),r),destroy:this.destroy.bind(this),destroyed$:this.destroyed$.asObservable(),errors:(...i)=>(t.errors(...i),r),filters:(...i)=>(t.filters(...i),r),hydrate:(...i)=>(t.hydrate(...i),r),initialize:t.initialize,interceptors:(...i)=>(t.interceptors(...i),r),key:this.cellKey,mergeState:this.mergeState.bind(this),operators:(...i)=>(t.operators(...i),r),reducers:(...i)=>(t.reducers(...i),r),emitStates:(...i)=>(t.emitStates(...i),r),replaceState:this.replaceState.bind(this),reset$:this.reset$.asObservable(),reset:this.reset.bind(this),state$:this.state$.asObservable(),get state(){return{isLoading:e.lastSnapshot.isLoading,value:e.lastSnapshot.value,error:e.lastSnapshot.error,hasValue:e.lastSnapshot.hasValue}}};return this.cell=r,this.behaviors.forEach(i=>{i?.installFluentApi?.(this.cell,t.behaviorConfigs)}),this.controllers.forEach(i=>{i?.installFluentApi?.(this.cell,t.behaviorConfigs)}),Object.defineProperty(r,"ctx",{value:this.ctx,enumerable:!1,writable:!1}),Object.defineProperty(r,"key",{value:this.featureCellConfiguration.key,enumerable:!1,writable:!1}),r}},Uo=new Map,ZT=new Map;function ZP(n,t){if(t){if(Uo.has(n)){if(!Ct.active){let r=Uo.get(n);throw new Error(`[vault] Duplicate FeatureCell key detected: "${n}". Each FeatureCell must have a unique key. Existing token: "${r?.key}"`)}return Uo.get(n)}let e={key:n};return Uo.set(n,e),e}if(!Uo.has(n))throw new Error(`[vault] FeatureCell token not found for key "${n}". You must call provideFeatureCell() before retrieving this FeatureCell.`);if(ZT.has(n)){if(!Ct.active)throw new Error(`[vault] FeatureCell "${n}" can only be owned by a single consumer.`);return Uo.get(n)}return ZT.set(n,!0),Uo.get(n)}function iS(n){return ZP(n,!0)}var ic={FEATURE_CELL_KEY:"vault:feature-cell-key",FEATURE_CELL_STATE:"vault:feature-cell-state"};function Sv(n){return function(t){t[ic.FEATURE_CELL_KEY]=n,t[ic.FEATURE_CELL_STATE]=null}}var $o=new Map,oS=new Map;function sS(n,t){let e=$o.get(n);if(t){if($o.has(n)){if(!xr.active)throw new Error(`[vault] Duplicate FeatureCell key detected: "${n}". Each FeatureCell must have a unique key. Existing token: "${n}"`);return $o.get(n)}return e=new v(`FEATURE_CELL:${n}`),$o.set(n,e),e}else{if(!$o.has(n))throw new Error(`[vault] FeatureCell token not found for key "${n}". You must call provideFeatureCell() before retrieving this FeatureCell.`);if(oS.has(n)){if(!xr.active)throw new Error(`[vault] FeatureCell "${n}" can only be injected into a single decorated @FeatureCell service.`);return $o.get(n)}return oS.set(n,!0),$o.get(n)}}function aS(n){return sS(n,!0)}function lS(n){return sS(n,!1)}function Iv(n){let t=n;if(!t)throw new Error("injectVault() must be called inside a @FeatureCell()-decorated service and must be given the class reference.");let e=t[ic.FEATURE_CELL_KEY];if(!e)throw new Error("injectVault() must be called inside a @FeatureCell()-decorated service.");let r=lS(e);return f(r)}var XP="@sdux-vault/core",QP="0.9.0";Lo(XP,QP);var Mv="external";var ar=class extends Tv{constructor(e,r){super(r);this.behaviorCtx=r;this.key=e}type=ar.type;critical=ar.critical;key;commitState(e,r,i){E(`${this.key} commitState called with: ${ge(r)}`);try{if(!!r&&Object.keys(r).length>0){let a=wf(r);Object.assign(e.lastSnapshot,a),e.lastSnapshot.hasValue=e.lastSnapshot.value!==void 0&&e.lastSnapshot.value!==null}let s={snapshot:wf(e.lastSnapshot),type:i};e.options&&(s.options=e.options),e.state$.next(s)}catch(o){Fo(`${this.key} an error occurred updating the state`,o)}}preparePipelineIncoming(e){let r=e.incoming,i={};return Qs(r)||Yl(r)&&Xs(r.value)?(this.commitState(e,null,Vt.IncomingPipeline),or):Yl(r)&&Bi(r.value)?(Qs(r.loading)||(i.isLoading=r.loading),Tf(r.error)&&(i.error=Xs(r.error)?null:_t(r.error,Mv)),this.commitState(e,i,Vt.IncomingPipeline),kn):(Js(r)?i.isLoading=!0:Yl(r)&&(Qs(r?.loading)||(i.isLoading=r.loading),Tf(r?.error)&&(i.error=Xs(r.error)?null:_t(r.error,Mv))),Object.keys(i).length>0&&this.commitState(e,i,Vt.IncomingPipeline),r)}finalizePipelineState(e,r){if(E(`${this.key} - finalizeVaultState`),Js(r.incoming)&&this.commitState(r,{isLoading:!1},Vt.FinalizePipeline),Ny(e)){this.commitState(r,null,Vt.FinalizePipeline);return}if(Xs(e)||Py(e)){this.commitState(r,{value:void 0},Vt.FinalizePipeline);return}!Qs(e)&&!rS(e)&&this.commitState(r,{value:e},Vt.FinalizePipeline)}finalizePipelineVaultStop(e){E(`${this.key} - finalizePipelineVaultStop`),this.commitState(e,null,Vt.FinalizePipeline)}finalizePipelineError(e,r){E(`${this.key} - finalizePipelineError`),this.commitState(r,{error:e,value:r.lastSnapshot.value,isLoading:!1},Vt.PipelineError)}finalizeControllerAbort(e){E(`${this.key} - finalizeAbort`),this.commitState(e,{isLoading:!1},Vt.AbortController)}finalizeControllerDeny(e){E(`${this.key} - finalizeDeny`),this.commitState(e,{isLoading:!1},Vt.DenyController)}destroy(e){B(`${this.key} - destroy`),this.commitState(e,{isLoading:!1,value:void 0,error:null},Vt.PipelineDestroy)}reset(e){B(`${this.key} - reset`),this.commitState(e,{isLoading:!1,value:void 0,error:null},Vt.PipelineReset)}};T(ar,"type"),T(ar,"critical"),ar=de([he({type:X.CoreState,key:pe("Core","State"),critical:!0})],ar);var lr=class extends ql{critical=lr.critical;constructor(t,e){super(t,e)}async callbackError(t,e,r){if(typeof r!="function")B(`${this.key} handleError skipped - "${r}" is not a function.`);else try{await r(t,e)}catch(i){B(`${this.key} oldschoolCallback threw: ${i}`)}}};T(lr,"type"),T(lr,"key"),T(lr,"critical"),lr=de([he({type:X.CoreErrorCallback,key:pe("Core","ErrorCallback"),critical:!0})],lr);var si=class{constructor(t,e){this.behaviorCtx=e;this.key=t}critical=!0;key;type=X.CoreError;handleError(t,e){return _t(t,e)}destroy(){B(`${this.key} - destroy "noop"`)}reset(){B(`${this.key} - reset "noop"`)}};T(si,"type"),T(si,"key"),T(si,"critical"),si=de([he({type:X.CoreError,key:pe("Core","Error"),critical:!0})],si);var Pn,cS,uS,dS,zf,ai=class{constructor(t,e){this.behaviorCtx=e;Jo(this,Pn);T(this,"type",X.Filter);T(this,"critical",!0);T(this,"key");this.key=t}applyFilter(t,e){if(E(`${this.key} applyFilter called with "${ge(t)}".`),t===void 0){E(`${this.key} applyFilter skipped - not a valid plain state. The current type is ${typeof t}. Undefined returned.`);return}if(typeof e!="function")return E(`${this.key} applyFilter skipped. The filter type is ${typeof e}. "${ge(t)}" returned.`),t;let r;try{r=e(t)}catch(i){throw Fo(`${this.key} filter execution failed`,i.message),i}return r===void 0?(E(`${this.key} Filter returned undefined. state rejected.`),kn):(Pr(this,Pn,cS).call(this,t,r)||Pr(this,Pn,uS).call(this,t,r)||(Pr(this,Pn,dS).call(this,t,r),E(`${this.key} applyFilter returned with "${ge(r)}".`)),r)}destroy(){B(`${this.key} - destroy "noop"`)}reset(){B(`${this.key} - reset "noop"`)}};Pn=new WeakSet,cS=function(t,e){if(Array.isArray(t)){if(!Array.isArray(e))throw Pr(this,Pn,zf).call(this,t,e),new Error("[vault] Filter returned non-array for array input.");return!0}return!1},uS=function(t,e){if(t!==null&&typeof t=="object"){if(typeof e!="object"||e===null||Array.isArray(e))throw Pr(this,Pn,zf).call(this,t,e),new Error("[vault] Filter returned invalid object for object input.");return!0}return!1},dS=function(t,e){if(typeof e!=typeof t)throw Pr(this,Pn,zf).call(this,t,e),new Error(`[vault] Filter returned a value of incorrect type. Expected "${typeof t}", got "${typeof e}".`)},zf=function(t,e){E(`${this.key} The types not aligned. Current type: "${typeof t}". Next type: ${typeof e}. "${ge(e)}" returned.`)},T(ai,"type"),T(ai,"key"),T(ai,"critical"),ai=de([he({type:X.Filter,key:pe("Core","Filter"),critical:!0})],ai);var Ln=class{constructor(t,e){this.behaviorCtx=e;this.key=t}type=Ln.type;key;critical=Ln.critical;computeMerge(t,e,r){let i=t,o=e,s=r?.clearUndefined??!1;return E(`${this.key} merge called (clear: ${s})`),o===void 0&&!s?(E(`${this.key} computeMerge skipped. The next value "${o}" and clear is "${s}`),i):o===void 0&&s?(E(`${this.key} computeMerge skipped. The next value "${o}" and clear is "${s}`),or):Array.isArray(i)&&Array.isArray(o)?(E(`${this.key} merging array. Return clone of next`),[...o]):(E(`${this.key} non-array branch. Return next`),o)}destroy(){B(`${this.key} - destroy "noop"`)}reset(){B(`${this.key} - reset "noop"`)}};T(Ln,"type"),T(Ln,"key"),T(Ln,"critical",!0),Ln=de([he({type:X.Merge,key:pe("Core","ArrayMerge"),critical:!0})],Ln);function fS(n){n.fromObservable=function(t){return t}}var Ht=class{constructor(t,e){this.behaviorCtx=e;this.key=t}type=Ht.type;key;critical=Ht.critical;resolveType=Ht.resolveType;extendCellAPI(t){return{fromObservable:e=>new L(r=>{E(`${this.key} fromObservable called.`);let i=t.destroyed$??Se,o=t.reset$??Se,s=e.pipe(Q(o),Q(i),ut(1)).subscribe({next:a=>{E(`${this.key} fromObservable emitted value "${ge(a)}".`),r.next({loading:!1,value:a,error:null})},error:a=>{let l=_t(a,t.featureCellKey);r.error(l),E(`${this.key} fromObservable emitted error "${l.message}".`)},complete:()=>{r.complete(),E(`${this.key} fromObservable completed.`)}});return()=>{s.unsubscribe(),E(`${this.key} fromObservable subscription unsubscribed.`)}})}}destroy(){B(`${this.key} - destroy "noop"`)}reset(){B(`${this.key} - reset "noop"`)}};T(Ht,"extension",fS),T(Ht,"type"),T(Ht,"key"),T(Ht,"resolveType"),T(Ht,"critical"),Ht=de([he({type:X.FromObservable,key:pe("Core","FromObservable"),critical:!1,resolveType:hn.Observable})],Ht);function hS(n){n.fromDeferred=function(t){throw new Error("[vault] fromDeferred() behavior not installed")},n.fromPromise=function(t){throw new Error("[vault] fromPromise() behavior not installed")}}var zt=class{constructor(t,e){this.behaviorCtx=e;this.key=t}type=zt.type;key;critical=zt.critical;resolveType=zt.resolveType;extendCellAPI(t){let e=r=>new Promise((i,o)=>{if(E(`${this.key} fromPromise called.`),Bi(r)){i({loading:!1,value:void 0,error:null});return}if(!Kl(r)){let a=r;i({loading:a?.loading??!1,value:void 0,error:a?.error??null});return}let s;try{s=r.value?.()}catch(a){let l=_t(a,t.featureCellKey);o(l);return}Promise.resolve(s).then(a=>{E(`${this.key} fromPromise resolved value: ${ge(a)}`),i({loading:r.loading??!1,value:a,error:r.error??null})}).catch(a=>{let l=_t(a,t.featureCellKey);o(l)})});return{fromPromise:r=>e(r),fromDeferred:r=>e(r)}}destroy(){B(`${this.key} - destroy "noop"`)}reset(){B(`${this.key} - reset "noop"`)}};T(zt,"extension",hS),T(zt,"type"),T(zt,"key"),T(zt,"critical"),T(zt,"resolveType"),zt=de([he({type:X.FromPromise,key:pe("Core","FromPromise"),critical:!1,resolveType:hn.Promise})],zt);var li=class{constructor(t,e){this.behaviorCtx=e;this.key=t}critical=!0;type=X.Reduce;key;applyReducer(t,e){return E(`${this.key} applyReducer called with "${ge(t)}".`),typeof e!="function"?(E(`${this.key} applyReducer skipped - reducer is not a function.`),t):e(t)}destroy(){B(`${this.key} - destroy "noop"`)}reset(){B(`${this.key} - reset "noop"`)}};T(li,"type"),T(li,"key"),T(li,"critical"),li=de([he({type:X.Reduce,key:pe("Core","Reducer"),critical:!0})],li);var Fn=class{constructor(t,e){this.behaviorCtx=e;this.key=t}type=X.Resolve;key;critical=!1;resolveType=Fn.resolveType;async computeResolve(t){let e=t.incoming;if(E(`${this.key} computeResolve called with incoming: ${ge(e)}`),!on(e)){E(`${this.key} computeResolve skipped \u2014 incoming is not an Observable.`);return}E(`${this.key} computeResolve detected Observable input.`);let r=e,i=t.reset$??Se,o=t.destroyed$??Se;try{let s=await ls(r.pipe(Q(i),Q(o),ut(1)));return E(`${this.key} computeResolve resolved value: ${ge(s)}`),s}catch(s){let a=_t(s,t.featureCellKey);throw E(`${this.key} computeResolve caught error: ${a.message}`),a}}destroy(){B(`${this.key} - destroy "noop"`)}reset(){B(`${this.key} - reset "noop"`)}};T(Fn,"type"),T(Fn,"key"),T(Fn,"critical"),T(Fn,"resolveType"),Fn=de([he({type:X.Resolve,key:pe("Core","Observable"),critical:!1,resolveType:hn.Observable})],Fn);var tn=class{constructor(t,e){this.behaviorCtx=e;this.key=t}type=tn.type;key;critical=tn.critical;resolveType=tn.resolveType;async computeResolve(t){let e=t.incoming;if(E(`${this.key} computeResolve promise called with incoming: ${ge(e)}`),!(Kl(e)||Sf(e))||Bi(e)){E(`${this.key} computeResolve skipped \u2014 incoming is not a deferred factory.`);return}E(`${this.key} computeResolve detected Promise input.`);try{let r;return Sf(e)?r=await e?.():r=await e.value?.(),E(`${this.key} computeResolve resolved value: ${ge(r)}`),r}catch(r){let i=_t(r,t.featureCellKey);throw E(`${this.key} computeResolve caught error: ${i.message}`),i}}destroy(){B(`${this.key} - destroy "noop"`)}reset(){B(`${this.key} - reset "noop"`)}};T(tn,"type"),T(tn,"key"),T(tn,"critical"),T(tn,"resolveType"),tn=de([he({type:X.Resolve,key:pe("Core","Promise"),critical:!1,resolveType:hn.Promise})],tn);var nn=class{constructor(t,e){this.behaviorCtx=e;this.key=t}type=nn.type;critical=nn.critical;key;resolveType=nn.resolveType;async computeResolve(t){E(`${this.key} computeResolve called with "${ge(t.incoming)}".`);let e=t.incoming;if(!e||Js(e)){E(`${this.key} computeResolve skipped - not a valid plain state.`);return}let{value:r}=e;if(r===void 0){E(`${this.key} value is undefined and resolution skipped.`);return}return r===null?(E(`${this.key} value is null and clear state returned.`),or):Array.isArray(r)?(E(`${this.key} array value detected and cloned.`),[...r]):typeof r=="object"?(E(`${this.key} object value detected and cloned.`),g({},r)):(E(`${this.key} primitive value detected and returned.`),r)}destroy(){B(`${this.key} - destroy "noop"`)}reset(){B(`${this.key} - reset "noop"`)}};T(nn,"type"),T(nn,"key"),T(nn,"critical"),T(nn,"resolveType"),nn=de([he({type:X.Resolve,key:pe("Core","Value"),critical:!0,resolveType:hn.Value})],nn);function pS(n){n.fromStream=function(t,e){}}var Wt=class{constructor(t,e){this.behaviorCtx=e;this.key=t}type=Wt.type;key;critical=Wt.critical;resolveType=Wt.resolveType;extendCellAPI(t){return{fromStream:(e,r)=>{let{autoResetError:i=!0}=r??{};E(`${this.key} fromStream called.`),E(`${this.key} fromStream options resolved (autoResetError=${i}).`),t.vaultMonitor.ingressSubscribed(t.featureCellKey,this.key,t,"fromStream"),E(`${this.key} fromStream subscription started.`),e.pipe(Q(t.destroyed$)).subscribe({next:o=>{E(`${this.key} subscription.next called.`),E(`${this.key} incoming value received: "${ge(o)}".`),i&&E(`${this.key} autoResetError enabled \u2192 clearing error.`);let s=i?{value:o,error:null}:{value:o};t.mergeState(s),E(`${this.key} mergeState invoked from stream.next.`)},error:o=>{E(`${this.key} subscription.error called.`);let s=_t(o,this.key);E(`${this.key} stream error converted to VaultError: "${s.message}".`),t.mergeState({error:s}),E(`${this.key} mergeState invoked from stream.error.`)},complete:()=>{E(`${this.key} subscription.complete called.`),t.vaultMonitor.ingressCompleted(t.featureCellKey,this.key,t,"fromStream"),E(`${this.key} fromStream completed.`)}})}}}destroy(){B(`${this.key} - destroy "noop"`)}reset(){B(`${this.key} - reset "noop"`)}};T(Wt,"extension",pS),T(Wt,"type"),T(Wt,"key"),T(Wt,"critical"),T(Wt,"resolveType"),Wt=de([he({type:X.FromStream,key:pe("Core","FromStream"),critical:!1,resolveType:hn.Observable})],Wt);var ci=class{constructor(t,e){this.behaviorCtx=e;this.key=t}type=X.CoreEmitState;critical=!0;key;emitState(t,e){if(E(`${this.key} emitState called with "${ge(t)}".`),typeof e!="function")return E(`${this.key} emitState skipped. The emitState type is ${typeof e}. "${ge(t)}" returned.`),kn;try{e(t)}catch(r){return Fo(`${this.key} emitState execution failed`,ge(r)),kn}}destroy(){B(`${this.key} - destroy "noop"`)}reset(){B(`${this.key} - reset "noop"`)}};T(ci,"type"),T(ci,"key"),T(ci,"critical"),ci=de([he({type:X.CoreEmitState,key:pe("Core","EmitState"),critical:!0})],ci);var ra=class{constructor(t,e){this.behaviorCtx=e;this.key=t}static type;static key;static critical=!0;critical=!0;key;type;executeTap(t,e){E(`${this.key} executeTap called with "${ge(t)}".`),typeof e!="function"&&E(`${this.key} executeTap skipped - tap is not a function. Type is "${typeof e}".`),e(t)}destroy(){B(`${this.key} - destroy "noop"`)}reset(){B(`${this.key} - reset "noop"`)}};var ia=class extends ra{type=X.CoreAfterTap;applyAfterTap(t,e){this.executeTap(t,e)}};ia=de([he({type:X.CoreAfterTap,key:pe("Core","AfterTap"),critical:!0})],ia);var oa=class extends ra{type=X.CoreBeforeTap;applyBeforeTap(t,e){this.executeTap(t,e)}};oa=de([he({type:X.CoreBeforeTap,key:pe("Core","BeforeTap"),critical:!0})],oa);function xv(n,t=[],e=[]){return iS(n.key),JT({key:n.key}),new Hf(n,JP(),t,e).build()}function JP(){return[ia,oa,si,ai,Ht,zt,Wt,Fn,tn,li,nn,ar,lr,Ln,ci]}var Wf=class{constructor(t){this.core=t;this.#t.add(this.core.state$.subscribe(e=>{this.#e.set(e?.snapshot?.isLoading??!1),this.#n.set(e?.snapshot?.error??null),this.#r.set(e?.snapshot?.value??void 0)})),this.#a.onDestroy(()=>this.destroy())}#t=new H;#r=ee(void 0);#n=ee(null);#e=ee(!1);#i=nt(()=>{let t=this.#r();return t!=null});#a=f(tt);build(){let t=this.core;return Object.defineProperty(t,"state",{configurable:!0,enumerable:!0,get:()=>({isLoading:this.#e.asReadonly(),value:this.#r.asReadonly(),error:this.#n.asReadonly(),hasValue:this.#i})}),t}destroy(){this.core.destroy(),this.#t.unsubscribe()}};function Rv(n,t,e=[],r=[]){return[{provide:aS(t.key),useFactory:()=>{let o=xv(t,e,r);return new Wf(o).build()}},n]}function kv(n={}){return _d(()=>{QT(n)})}var eL="@sdux-vault/angular",tL="0.11.0";Lo(eL,tL);var oc=class{_attachedHost=null;attach(t){return this._attachedHost=t,t.attach(this)}detach(){let t=this._attachedHost;t!=null&&(this._attachedHost=null,t.detach())}get isAttached(){return this._attachedHost!=null}setAttachedHost(t){this._attachedHost=t}},sc=class extends oc{component;viewContainerRef;injector;projectableNodes;bindings;constructor(t,e,r,i,o){super(),this.component=t,this.viewContainerRef=e,this.injector=r,this.projectableNodes=i,this.bindings=o||null}},ui=class extends oc{templateRef;viewContainerRef;context;injector;constructor(t,e,r,i){super(),this.templateRef=t,this.viewContainerRef=e,this.context=r,this.injector=i}get origin(){return this.templateRef.elementRef}attach(t,e=this.context){return this.context=e,super.attach(t)}detach(){return this.context=void 0,super.detach()}},Av=class extends oc{element;constructor(t){super(),this.element=t instanceof re?t.nativeElement:t}},Gf=class{_attachedPortal=null;_disposeFn=null;_isDisposed=!1;hasAttached(){return!!this._attachedPortal}attach(t){if(t instanceof sc)return this._attachedPortal=t,this.attachComponentPortal(t);if(t instanceof ui)return this._attachedPortal=t,this.attachTemplatePortal(t);if(this.attachDomPortal&&t instanceof Av)return this._attachedPortal=t,this.attachDomPortal(t)}attachDomPortal=null;detach(){this._attachedPortal&&(this._attachedPortal.setAttachedHost(null),this._attachedPortal=null),this._invokeDisposeFn()}dispose(){this.hasAttached()&&this.detach(),this._invokeDisposeFn(),this._isDisposed=!0}setDisposeFn(t){this._disposeFn=t}_invokeDisposeFn(){this._disposeFn&&(this._disposeFn(),this._disposeFn=null)}},ac=class extends Gf{outletElement;_appRef;_defaultInjector;constructor(t,e,r){super(),this.outletElement=t,this._appRef=e,this._defaultInjector=r}attachComponentPortal(t){let e;if(t.viewContainerRef){let r=t.injector||t.viewContainerRef.injector,i=r.get(Cr,null,{optional:!0})||void 0;e=t.viewContainerRef.createComponent(t.component,{index:t.viewContainerRef.length,injector:r,ngModuleRef:i,projectableNodes:t.projectableNodes||void 0,bindings:t.bindings||void 0}),this.setDisposeFn(()=>e.destroy())}else{let r=this._appRef,i=t.injector||this._defaultInjector||ne.NULL,o=i.get(ke,r.injector);e=Pd(t.component,{elementInjector:i,environmentInjector:o,projectableNodes:t.projectableNodes||void 0,bindings:t.bindings||void 0}),r.attachView(e.hostView),this.setDisposeFn(()=>{r.viewCount>0&&r.detachView(e.hostView),e.destroy()})}return this.outletElement.appendChild(this._getComponentRootNode(e)),this._attachedPortal=t,e}attachTemplatePortal(t){let e=t.viewContainerRef,r=e.createEmbeddedView(t.templateRef,t.context,{injector:t.injector});return r.rootNodes.forEach(i=>this.outletElement.appendChild(i)),r.detectChanges(),this.setDisposeFn(()=>{let i=e.indexOf(r);i!==-1&&e.remove(i)}),this._attachedPortal=t,r}attachDomPortal=t=>{let e=t.element;e.parentNode;let r=this.outletElement.ownerDocument.createComment("dom-portal");e.parentNode.insertBefore(r,e),this.outletElement.appendChild(e),this._attachedPortal=t,super.setDisposeFn(()=>{r.parentNode&&r.parentNode.replaceChild(e,r)})};dispose(){super.dispose(),this.outletElement.remove()}_getComponentRootNode(t){return t.hostView.rootNodes[0]}},mS=(()=>{class n extends ui{constructor(){let e=f(bt),r=f(at);super(e,r)}static \u0275fac=function(r){return new(r||n)};static \u0275dir=le({type:n,selectors:[["","cdkPortal",""]],exportAs:["cdkPortal"],features:[jt]})}return n})(),Ov=(()=>{class n extends Gf{_moduleRef=f(Cr,{optional:!0});_document=f(Z);_viewContainerRef=f(at);_isInitialized=!1;_attachedRef=null;constructor(){super()}get portal(){return this._attachedPortal}set portal(e){this.hasAttached()&&!e&&!this._isInitialized||(this.hasAttached()&&super.detach(),e&&super.attach(e),this._attachedPortal=e||null)}attached=new te;get attachedRef(){return this._attachedRef}ngOnInit(){this._isInitialized=!0}ngOnDestroy(){super.dispose(),this._attachedRef=this._attachedPortal=null}attachComponentPortal(e){e.setAttachedHost(this);let r=e.viewContainerRef!=null?e.viewContainerRef:this._viewContainerRef,i=r.createComponent(e.component,{index:r.length,injector:e.injector||r.injector,projectableNodes:e.projectableNodes||void 0,ngModuleRef:this._moduleRef||void 0,bindings:e.bindings||void 0});return r!==this._viewContainerRef&&this._getRootNode().appendChild(i.hostView.rootNodes[0]),super.setDisposeFn(()=>i.destroy()),this._attachedPortal=e,this._attachedRef=i,this.attached.emit(i),i}attachTemplatePortal(e){e.setAttachedHost(this);let r=this._viewContainerRef.createEmbeddedView(e.templateRef,e.context,{injector:e.injector});return super.setDisposeFn(()=>this._viewContainerRef.clear()),this._attachedPortal=e,this._attachedRef=r,this.attached.emit(r),r}attachDomPortal=e=>{let r=e.element;r.parentNode;let i=this._document.createComment("dom-portal");e.setAttachedHost(this),r.parentNode.insertBefore(i,r),this._getRootNode().appendChild(r),this._attachedPortal=e,super.setDisposeFn(()=>{i.parentNode&&i.parentNode.replaceChild(r,i)})};_getRootNode(){let e=this._viewContainerRef.element.nativeElement;return e.nodeType===e.ELEMENT_NODE?e:e.parentNode}static \u0275fac=function(r){return new(r||n)};static \u0275dir=le({type:n,selectors:[["","cdkPortalOutlet",""]],inputs:{portal:[0,"cdkPortalOutlet","portal"]},outputs:{attached:"attached"},exportAs:["cdkPortalOutlet"],features:[jt]})}return n})(),gS=(()=>{class n{static \u0275fac=function(r){return new(r||n)};static \u0275mod=Me({type:n});static \u0275inj=De({})}return n})();var qf=new WeakMap,Bn=(()=>{class n{_appRef;_injector=f(ne);_environmentInjector=f(ke);load(e){let r=this._appRef=this._appRef||this._injector.get(ln),i=qf.get(r);i||(i={loaders:new Set,refs:[]},qf.set(r,i),r.onDestroy(()=>{qf.get(r)?.refs.forEach(o=>o.destroy()),qf.delete(r)})),i.loaders.has(e)||(i.loaders.add(e),i.refs.push(Pd(e,{environmentInjector:this._environmentInjector})))}static \u0275fac=function(r){return new(r||n)};static \u0275prov=y({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})();var yS=(()=>{class n{static \u0275fac=function(r){return new(r||n)};static \u0275cmp=oe({type:n,selectors:[["ng-component"]],exportAs:["cdkVisuallyHidden"],decls:0,vars:0,template:function(r,i){},styles:[`.cdk-visually-hidden {
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
`],encapsulation:2,changeDetection:0})}return n})();var Kf=(()=>{class n{static \u0275fac=function(r){return new(r||n)};static \u0275cmp=oe({type:n,selectors:[["structural-styles"]],decls:0,vars:0,template:function(r,i){},styles:[`.mat-focus-indicator {
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
`],encapsulation:2,changeDetection:0})}return n})();function Ho(n){return n.buttons===0||n.detail===0}function zo(n){let t=n.touches&&n.touches[0]||n.changedTouches&&n.changedTouches[0];return!!t&&t.identifier===-1&&(t.radiusX==null||t.radiusX===1)&&(t.radiusY==null||t.radiusY===1)}var Nv;function vS(){if(Nv==null){let n=typeof document<"u"?document.head:null;Nv=!!(n&&(n.createShadowRoot||n.attachShadow))}return Nv}function Pv(n){if(vS()){let t=n.getRootNode?n.getRootNode():null;if(typeof ShadowRoot<"u"&&ShadowRoot&&t instanceof ShadowRoot)return t}return null}function jn(n){return n.composedPath?n.composedPath()[0]:n.target}var Lv;try{Lv=typeof Intl<"u"&&Intl.v8BreakIterator}catch{Lv=!1}var Le=(()=>{class n{_platformId=f(Io);isBrowser=this._platformId?Iw(this._platformId):typeof document=="object"&&!!document;EDGE=this.isBrowser&&/(edge)/i.test(navigator.userAgent);TRIDENT=this.isBrowser&&/(msie|trident)/i.test(navigator.userAgent);BLINK=this.isBrowser&&!!(window.chrome||Lv)&&typeof CSS<"u"&&!this.EDGE&&!this.TRIDENT;WEBKIT=this.isBrowser&&/AppleWebKit/i.test(navigator.userAgent)&&!this.BLINK&&!this.EDGE&&!this.TRIDENT;IOS=this.isBrowser&&/iPad|iPhone|iPod/.test(navigator.userAgent)&&!("MSStream"in window);FIREFOX=this.isBrowser&&/(firefox|minefield)/i.test(navigator.userAgent);ANDROID=this.isBrowser&&/android/i.test(navigator.userAgent)&&!this.TRIDENT;SAFARI=this.isBrowser&&/safari/i.test(navigator.userAgent)&&this.WEBKIT;constructor(){}static \u0275fac=function(r){return new(r||n)};static \u0275prov=y({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})();var lc;function bS(){if(lc==null&&typeof window<"u")try{window.addEventListener("test",null,Object.defineProperty({},"passive",{get:()=>lc=!0}))}finally{lc=lc||!1}return lc}function sa(n){return bS()?n:!!n.capture}function cr(n,t=0){return _S(n)?Number(n):arguments.length===2?t:0}function _S(n){return!isNaN(parseFloat(n))&&!isNaN(Number(n))}function Vn(n){return n instanceof re?n.nativeElement:n}var CS=new v("cdk-input-modality-detector-options"),DS={ignoreKeys:[18,17,224,91,16]},ES=650,Fv={passive:!0,capture:!0},wS=(()=>{class n{_platform=f(Le);_listenerCleanups;modalityDetected;modalityChanged;get mostRecentModality(){return this._modality.value}_mostRecentTarget=null;_modality=new Ge(null);_options;_lastTouchMs=0;_onKeydown=e=>{this._options?.ignoreKeys?.some(r=>r===e.keyCode)||(this._modality.next("keyboard"),this._mostRecentTarget=jn(e))};_onMousedown=e=>{Date.now()-this._lastTouchMs<ES||(this._modality.next(Ho(e)?"keyboard":"mouse"),this._mostRecentTarget=jn(e))};_onTouchstart=e=>{if(zo(e)){this._modality.next("keyboard");return}this._lastTouchMs=Date.now(),this._modality.next("touch"),this._mostRecentTarget=jn(e)};constructor(){let e=f(j),r=f(Z),i=f(CS,{optional:!0});if(this._options=g(g({},DS),i),this.modalityDetected=this._modality.pipe(so(1)),this.modalityChanged=this.modalityDetected.pipe(cs()),this._platform.isBrowser){let o=f(It).createRenderer(null,null);this._listenerCleanups=e.runOutsideAngular(()=>[o.listen(r,"keydown",this._onKeydown,Fv),o.listen(r,"mousedown",this._onMousedown,Fv),o.listen(r,"touchstart",this._onTouchstart,Fv)])}}ngOnDestroy(){this._modality.complete(),this._listenerCleanups?.forEach(e=>e())}static \u0275fac=function(r){return new(r||n)};static \u0275prov=y({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})(),cc=(function(n){return n[n.IMMEDIATE=0]="IMMEDIATE",n[n.EVENTUAL=1]="EVENTUAL",n})(cc||{}),TS=new v("cdk-focus-monitor-default-options"),Yf=sa({passive:!0,capture:!0}),$i=(()=>{class n{_ngZone=f(j);_platform=f(Le);_inputModalityDetector=f(wS);_origin=null;_lastFocusOrigin=null;_windowFocused=!1;_windowFocusTimeoutId;_originTimeoutId;_originFromTouchInteraction=!1;_elementInfo=new Map;_monitoredElementCount=0;_rootNodeFocusListenerCount=new Map;_detectionMode;_windowFocusListener=()=>{this._windowFocused=!0,this._windowFocusTimeoutId=setTimeout(()=>this._windowFocused=!1)};_document=f(Z);_stopInputModalityDetector=new C;constructor(){let e=f(TS,{optional:!0});this._detectionMode=e?.detectionMode||cc.IMMEDIATE}_rootNodeFocusAndBlurListener=e=>{let r=jn(e);for(let i=r;i;i=i.parentElement)e.type==="focus"?this._onFocus(e,i):this._onBlur(e,i)};monitor(e,r=!1){let i=Vn(e);if(!this._platform.isBrowser||i.nodeType!==1)return I();let o=Pv(i)||this._document,s=this._elementInfo.get(i);if(s)return r&&(s.checkChildren=!0),s.subject;let a={checkChildren:r,subject:new C,rootNode:o};return this._elementInfo.set(i,a),this._registerGlobalListeners(a),a.subject}stopMonitoring(e){let r=Vn(e),i=this._elementInfo.get(r);i&&(i.subject.complete(),this._setClasses(r),this._elementInfo.delete(r),this._removeGlobalListeners(i))}focusVia(e,r,i){let o=Vn(e),s=this._document.activeElement;o===s?this._getClosestElementsInfo(o).forEach(([a,l])=>this._originChanged(a,r,l)):(this._setOrigin(r),typeof o.focus=="function"&&o.focus(i))}ngOnDestroy(){this._elementInfo.forEach((e,r)=>this.stopMonitoring(r))}_getWindow(){return this._document.defaultView||window}_getFocusOrigin(e){return this._origin?this._originFromTouchInteraction?this._shouldBeAttributedToTouch(e)?"touch":"program":this._origin:this._windowFocused&&this._lastFocusOrigin?this._lastFocusOrigin:e&&this._isLastInteractionFromInputLabel(e)?"mouse":"program"}_shouldBeAttributedToTouch(e){return this._detectionMode===cc.EVENTUAL||!!e?.contains(this._inputModalityDetector._mostRecentTarget)}_setClasses(e,r){e.classList.toggle("cdk-focused",!!r),e.classList.toggle("cdk-touch-focused",r==="touch"),e.classList.toggle("cdk-keyboard-focused",r==="keyboard"),e.classList.toggle("cdk-mouse-focused",r==="mouse"),e.classList.toggle("cdk-program-focused",r==="program")}_setOrigin(e,r=!1){this._ngZone.runOutsideAngular(()=>{if(this._origin=e,this._originFromTouchInteraction=e==="touch"&&r,this._detectionMode===cc.IMMEDIATE){clearTimeout(this._originTimeoutId);let i=this._originFromTouchInteraction?ES:1;this._originTimeoutId=setTimeout(()=>this._origin=null,i)}})}_onFocus(e,r){let i=this._elementInfo.get(r),o=jn(e);!i||!i.checkChildren&&r!==o||this._originChanged(r,this._getFocusOrigin(o),i)}_onBlur(e,r){let i=this._elementInfo.get(r);!i||i.checkChildren&&e.relatedTarget instanceof Node&&r.contains(e.relatedTarget)||(this._setClasses(r),this._emitOrigin(i,null))}_emitOrigin(e,r){e.subject.observers.length&&this._ngZone.run(()=>e.subject.next(r))}_registerGlobalListeners(e){if(!this._platform.isBrowser)return;let r=e.rootNode,i=this._rootNodeFocusListenerCount.get(r)||0;i||this._ngZone.runOutsideAngular(()=>{r.addEventListener("focus",this._rootNodeFocusAndBlurListener,Yf),r.addEventListener("blur",this._rootNodeFocusAndBlurListener,Yf)}),this._rootNodeFocusListenerCount.set(r,i+1),++this._monitoredElementCount===1&&(this._ngZone.runOutsideAngular(()=>{this._getWindow().addEventListener("focus",this._windowFocusListener)}),this._inputModalityDetector.modalityDetected.pipe(Q(this._stopInputModalityDetector)).subscribe(o=>{this._setOrigin(o,!0)}))}_removeGlobalListeners(e){let r=e.rootNode;if(this._rootNodeFocusListenerCount.has(r)){let i=this._rootNodeFocusListenerCount.get(r);i>1?this._rootNodeFocusListenerCount.set(r,i-1):(r.removeEventListener("focus",this._rootNodeFocusAndBlurListener,Yf),r.removeEventListener("blur",this._rootNodeFocusAndBlurListener,Yf),this._rootNodeFocusListenerCount.delete(r))}--this._monitoredElementCount||(this._getWindow().removeEventListener("focus",this._windowFocusListener),this._stopInputModalityDetector.next(),clearTimeout(this._windowFocusTimeoutId),clearTimeout(this._originTimeoutId))}_originChanged(e,r,i){this._setClasses(e,r),this._emitOrigin(i,r),this._lastFocusOrigin=r}_getClosestElementsInfo(e){let r=[];return this._elementInfo.forEach((i,o)=>{(o===e||i.checkChildren&&o.contains(e))&&r.push([o,i])}),r}_isLastInteractionFromInputLabel(e){let{_mostRecentTarget:r,mostRecentModality:i}=this._inputModalityDetector;if(i!=="mouse"||!r||r===e||e.nodeName!=="INPUT"&&e.nodeName!=="TEXTAREA"||e.disabled)return!1;let o=e.labels;if(o){for(let s=0;s<o.length;s++)if(o[s].contains(r))return!0}return!1}static \u0275fac=function(r){return new(r||n)};static \u0275prov=y({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})(),Bv=(()=>{class n{_elementRef=f(re);_focusMonitor=f($i);_monitorSubscription;_focusOrigin=null;cdkFocusChange=new te;constructor(){}get focusOrigin(){return this._focusOrigin}ngAfterViewInit(){let e=this._elementRef.nativeElement;this._monitorSubscription=this._focusMonitor.monitor(e,e.nodeType===1&&e.hasAttribute("cdkMonitorSubtreeFocus")).subscribe(r=>{this._focusOrigin=r,this.cdkFocusChange.emit(r)})}ngOnDestroy(){this._focusMonitor.stopMonitoring(this._elementRef),this._monitorSubscription?.unsubscribe()}static \u0275fac=function(r){return new(r||n)};static \u0275dir=le({type:n,selectors:[["","cdkMonitorElementFocus",""],["","cdkMonitorSubtreeFocus",""]],outputs:{cdkFocusChange:"cdkFocusChange"},exportAs:["cdkMonitorFocus"]})}return n})();function aa(n){return Array.isArray(n)?n:[n]}var SS=new Set,Wo,la=(()=>{class n{_platform=f(Le);_nonce=f(Is,{optional:!0});_matchMedia;constructor(){this._matchMedia=this._platform.isBrowser&&window.matchMedia?window.matchMedia.bind(window):rL}matchMedia(e){return(this._platform.WEBKIT||this._platform.BLINK)&&nL(e,this._nonce),this._matchMedia(e)}static \u0275fac=function(r){return new(r||n)};static \u0275prov=y({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})();function nL(n,t){if(!SS.has(n))try{Wo||(Wo=document.createElement("style"),t&&Wo.setAttribute("nonce",t),Wo.setAttribute("type","text/css"),document.head.appendChild(Wo)),Wo.sheet&&(Wo.sheet.insertRule(`@media ${n} {body{ }}`,0),SS.add(n))}catch(e){console.error(e)}}function rL(n){return{matches:n==="all"||n==="",media:n,addListener:()=>{},removeListener:()=>{}}}var jv=(()=>{class n{_mediaMatcher=f(la);_zone=f(j);_queries=new Map;_destroySubject=new C;constructor(){}ngOnDestroy(){this._destroySubject.next(),this._destroySubject.complete()}isMatched(e){return IS(aa(e)).some(i=>this._registerQuery(i).mql.matches)}observe(e){let i=IS(aa(e)).map(s=>this._registerQuery(s).observable),o=ka(i);return o=vi(o.pipe(ut(1)),o.pipe(so(1),jr(0))),o.pipe(se(s=>{let a={matches:!1,breakpoints:{}};return s.forEach(({matches:l,query:c})=>{a.matches=a.matches||l,a.breakpoints[c]=l}),a}))}_registerQuery(e){if(this._queries.has(e))return this._queries.get(e);let r=this._mediaMatcher.matchMedia(e),o={observable:new L(s=>{let a=l=>this._zone.run(()=>s.next(l));return r.addListener(a),()=>{r.removeListener(a)}}).pipe(Tt(r),se(({matches:s})=>({query:e,matches:s})),Q(this._destroySubject)),mql:r};return this._queries.set(e,o),o}static \u0275fac=function(r){return new(r||n)};static \u0275prov=y({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})();function IS(n){return n.map(t=>t.split(",")).reduce((t,e)=>t.concat(e)).map(t=>t.trim())}function iL(n){if(n.type==="characterData"&&n.target instanceof Comment)return!0;if(n.type==="childList"){for(let t=0;t<n.addedNodes.length;t++)if(!(n.addedNodes[t]instanceof Comment))return!1;for(let t=0;t<n.removedNodes.length;t++)if(!(n.removedNodes[t]instanceof Comment))return!1;return!0}return!1}var MS=(()=>{class n{create(e){return typeof MutationObserver>"u"?null:new MutationObserver(e)}static \u0275fac=function(r){return new(r||n)};static \u0275prov=y({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})(),xS=(()=>{class n{_mutationObserverFactory=f(MS);_observedElements=new Map;_ngZone=f(j);constructor(){}ngOnDestroy(){this._observedElements.forEach((e,r)=>this._cleanupObserver(r))}observe(e){let r=Vn(e);return new L(i=>{let s=this._observeElement(r).pipe(se(a=>a.filter(l=>!iL(l))),ye(a=>!!a.length)).subscribe(a=>{this._ngZone.run(()=>{i.next(a)})});return()=>{s.unsubscribe(),this._unobserveElement(r)}})}_observeElement(e){return this._ngZone.runOutsideAngular(()=>{if(this._observedElements.has(e))this._observedElements.get(e).count++;else{let r=new C,i=this._mutationObserverFactory.create(o=>r.next(o));i&&i.observe(e,{characterData:!0,childList:!0,subtree:!0}),this._observedElements.set(e,{observer:i,stream:r,count:1})}return this._observedElements.get(e).stream})}_unobserveElement(e){this._observedElements.has(e)&&(this._observedElements.get(e).count--,this._observedElements.get(e).count||this._cleanupObserver(e))}_cleanupObserver(e){if(this._observedElements.has(e)){let{observer:r,stream:i}=this._observedElements.get(e);r&&r.disconnect(),i.complete(),this._observedElements.delete(e)}}static \u0275fac=function(r){return new(r||n)};static \u0275prov=y({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})(),RS=(()=>{class n{_contentObserver=f(xS);_elementRef=f(re);event=new te;get disabled(){return this._disabled}set disabled(e){this._disabled=e,this._disabled?this._unsubscribe():this._subscribe()}_disabled=!1;get debounce(){return this._debounce}set debounce(e){this._debounce=cr(e),this._subscribe()}_debounce;_currentSubscription=null;constructor(){}ngAfterContentInit(){!this._currentSubscription&&!this.disabled&&this._subscribe()}ngOnDestroy(){this._unsubscribe()}_subscribe(){this._unsubscribe();let e=this._contentObserver.observe(this._elementRef);this._currentSubscription=(this.debounce?e.pipe(jr(this.debounce)):e).subscribe(this.event)}_unsubscribe(){this._currentSubscription?.unsubscribe()}static \u0275fac=function(r){return new(r||n)};static \u0275dir=le({type:n,selectors:[["","cdkObserveContent",""]],inputs:{disabled:[2,"cdkObserveContentDisabled","disabled",we],debounce:"debounce"},outputs:{event:"cdkObserveContent"},exportAs:["cdkObserveContent"]})}return n})(),kS=(()=>{class n{static \u0275fac=function(r){return new(r||n)};static \u0275mod=Me({type:n});static \u0275inj=De({providers:[MS]})}return n})();var Hi=(function(n){return n[n.NONE=0]="NONE",n[n.BLACK_ON_WHITE=1]="BLACK_ON_WHITE",n[n.WHITE_ON_BLACK=2]="WHITE_ON_BLACK",n})(Hi||{}),AS="cdk-high-contrast-black-on-white",OS="cdk-high-contrast-white-on-black",Vv="cdk-high-contrast-active",NS=(()=>{class n{_platform=f(Le);_hasCheckedHighContrastMode=!1;_document=f(Z);_breakpointSubscription;constructor(){this._breakpointSubscription=f(jv).observe("(forced-colors: active)").subscribe(()=>{this._hasCheckedHighContrastMode&&(this._hasCheckedHighContrastMode=!1,this._applyBodyHighContrastModeCssClasses())})}getHighContrastMode(){if(!this._platform.isBrowser)return Hi.NONE;let e=this._document.createElement("div");e.style.backgroundColor="rgb(1,2,3)",e.style.position="absolute",this._document.body.appendChild(e);let r=this._document.defaultView||window,i=r&&r.getComputedStyle?r.getComputedStyle(e):null,o=(i&&i.backgroundColor||"").replace(/ /g,"");switch(e.remove(),o){case"rgb(0,0,0)":case"rgb(45,50,54)":case"rgb(32,32,32)":return Hi.WHITE_ON_BLACK;case"rgb(255,255,255)":case"rgb(255,250,239)":return Hi.BLACK_ON_WHITE}return Hi.NONE}ngOnDestroy(){this._breakpointSubscription.unsubscribe()}_applyBodyHighContrastModeCssClasses(){if(!this._hasCheckedHighContrastMode&&this._platform.isBrowser&&this._document.body){let e=this._document.body.classList;e.remove(Vv,AS,OS),this._hasCheckedHighContrastMode=!0;let r=this.getHighContrastMode();r===Hi.BLACK_ON_WHITE?e.add(Vv,AS):r===Hi.WHITE_ON_BLACK&&e.add(Vv,OS)}}static \u0275fac=function(r){return new(r||n)};static \u0275prov=y({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})(),Uv=(()=>{class n{constructor(){f(NS)._applyBodyHighContrastModeCssClasses()}static \u0275fac=function(r){return new(r||n)};static \u0275mod=Me({type:n});static \u0275inj=De({imports:[kS]})}return n})();var oL=200,Zf=class{_letterKeyStream=new C;_items=[];_selectedItemIndex=-1;_pressedLetters=[];_skipPredicateFn;_selectedItem=new C;selectedItem=this._selectedItem;constructor(t,e){let r=typeof e?.debounceInterval=="number"?e.debounceInterval:oL;e?.skipPredicate&&(this._skipPredicateFn=e.skipPredicate),this.setItems(t),this._setupKeyHandler(r)}destroy(){this._pressedLetters=[],this._letterKeyStream.complete(),this._selectedItem.complete()}setCurrentSelectedItemIndex(t){this._selectedItemIndex=t}setItems(t){this._items=t}handleKey(t){let e=t.keyCode;t.key&&t.key.length===1?this._letterKeyStream.next(t.key.toLocaleUpperCase()):(e>=65&&e<=90||e>=48&&e<=57)&&this._letterKeyStream.next(String.fromCharCode(e))}isTyping(){return this._pressedLetters.length>0}reset(){this._pressedLetters=[]}_setupKeyHandler(t){this._letterKeyStream.pipe(ot(e=>this._pressedLetters.push(e)),jr(t),ye(()=>this._pressedLetters.length>0),se(()=>this._pressedLetters.join("").toLocaleUpperCase())).subscribe(e=>{for(let r=1;r<this._items.length+1;r++){let i=(this._selectedItemIndex+r)%this._items.length,o=this._items[i];if(!this._skipPredicateFn?.(o)&&o.getLabel?.().toLocaleUpperCase().trim().indexOf(e)===0){this._selectedItem.next(o);break}}this._pressedLetters=[]})}};function zi(n,...t){return t.length?t.some(e=>n[e]):n.altKey||n.shiftKey||n.ctrlKey||n.metaKey}var Xf=class{_items;_activeItemIndex=ee(-1);_activeItem=ee(null);_wrap=!1;_typeaheadSubscription=H.EMPTY;_itemChangesSubscription;_vertical=!0;_horizontal=null;_allowedModifierKeys=[];_homeAndEnd=!1;_pageUpAndDown={enabled:!1,delta:10};_effectRef;_typeahead;_skipPredicateFn=t=>t.disabled;constructor(t,e){this._items=t,t instanceof Xn?this._itemChangesSubscription=t.changes.subscribe(r=>this._itemsChanged(r.toArray())):ml(t)&&(this._effectRef=Co(()=>this._itemsChanged(t()),{injector:e}))}tabOut=new C;change=new C;skipPredicate(t){return this._skipPredicateFn=t,this}withWrap(t=!0){return this._wrap=t,this}withVerticalOrientation(t=!0){return this._vertical=t,this}withHorizontalOrientation(t){return this._horizontal=t,this}withAllowedModifierKeys(t){return this._allowedModifierKeys=t,this}withTypeAhead(t=200){this._typeaheadSubscription.unsubscribe();let e=this._getItemsArray();return this._typeahead=new Zf(e,{debounceInterval:typeof t=="number"?t:void 0,skipPredicate:r=>this._skipPredicateFn(r)}),this._typeaheadSubscription=this._typeahead.selectedItem.subscribe(r=>{this.setActiveItem(r)}),this}cancelTypeahead(){return this._typeahead?.reset(),this}withHomeAndEnd(t=!0){return this._homeAndEnd=t,this}withPageUpDown(t=!0,e=10){return this._pageUpAndDown={enabled:t,delta:e},this}setActiveItem(t){let e=this._activeItem();this.updateActiveItem(t),this._activeItem()!==e&&this.change.next(this._activeItemIndex())}onKeydown(t){let e=t.keyCode,i=["altKey","ctrlKey","metaKey","shiftKey"].every(o=>!t[o]||this._allowedModifierKeys.indexOf(o)>-1);switch(e){case 9:this.tabOut.next();return;case 40:if(this._vertical&&i){this.setNextItemActive();break}else return;case 38:if(this._vertical&&i){this.setPreviousItemActive();break}else return;case 39:if(this._horizontal&&i){this._horizontal==="rtl"?this.setPreviousItemActive():this.setNextItemActive();break}else return;case 37:if(this._horizontal&&i){this._horizontal==="rtl"?this.setNextItemActive():this.setPreviousItemActive();break}else return;case 36:if(this._homeAndEnd&&i){this.setFirstItemActive();break}else return;case 35:if(this._homeAndEnd&&i){this.setLastItemActive();break}else return;case 33:if(this._pageUpAndDown.enabled&&i){let o=this._activeItemIndex()-this._pageUpAndDown.delta;this._setActiveItemByIndex(o>0?o:0,1);break}else return;case 34:if(this._pageUpAndDown.enabled&&i){let o=this._activeItemIndex()+this._pageUpAndDown.delta,s=this._getItemsArray().length;this._setActiveItemByIndex(o<s?o:s-1,-1);break}else return;default:(i||zi(t,"shiftKey"))&&this._typeahead?.handleKey(t);return}this._typeahead?.reset(),t.preventDefault()}get activeItemIndex(){return this._activeItemIndex()}get activeItem(){return this._activeItem()}isTyping(){return!!this._typeahead&&this._typeahead.isTyping()}setFirstItemActive(){this._setActiveItemByIndex(0,1)}setLastItemActive(){this._setActiveItemByIndex(this._getItemsArray().length-1,-1)}setNextItemActive(){this._activeItemIndex()<0?this.setFirstItemActive():this._setActiveItemByDelta(1)}setPreviousItemActive(){this._activeItemIndex()<0&&this._wrap?this.setLastItemActive():this._setActiveItemByDelta(-1)}updateActiveItem(t){let e=this._getItemsArray(),r=typeof t=="number"?t:e.indexOf(t),i=e[r];this._activeItem.set(i??null),this._activeItemIndex.set(r),this._typeahead?.setCurrentSelectedItemIndex(r)}destroy(){this._typeaheadSubscription.unsubscribe(),this._itemChangesSubscription?.unsubscribe(),this._effectRef?.destroy(),this._typeahead?.destroy(),this.tabOut.complete(),this.change.complete()}_setActiveItemByDelta(t){this._wrap?this._setActiveInWrapMode(t):this._setActiveInDefaultMode(t)}_setActiveInWrapMode(t){let e=this._getItemsArray();for(let r=1;r<=e.length;r++){let i=(this._activeItemIndex()+t*r+e.length)%e.length,o=e[i];if(!this._skipPredicateFn(o)){this.setActiveItem(i);return}}}_setActiveInDefaultMode(t){this._setActiveItemByIndex(this._activeItemIndex()+t,t)}_setActiveItemByIndex(t,e){let r=this._getItemsArray();if(r[t]){for(;this._skipPredicateFn(r[t]);)if(t+=e,!r[t])return;this.setActiveItem(t)}}_getItemsArray(){return ml(this._items)?this._items():this._items instanceof Xn?this._items.toArray():this._items}_itemsChanged(t){this._typeahead?.setItems(t);let e=this._activeItem();if(e){let r=t.indexOf(e);r>-1&&r!==this._activeItemIndex()&&(this._activeItemIndex.set(r),this._typeahead?.setCurrentSelectedItemIndex(r))}}};var Go=class extends Xf{_origin="program";setFocusOrigin(t){return this._origin=t,this}setActiveItem(t){super.setActiveItem(t),this.activeItem&&this.activeItem.focus(this._origin)}};var zv={},di=class n{_appId=f(Oi);static _infix=`a${Math.floor(Math.random()*1e5).toString()}`;getId(t,e=!1){return this._appId!=="ng"&&(t+=this._appId),zv.hasOwnProperty(t)||(zv[t]=0),`${t}${e?n._infix+"-":""}${zv[t]++}`}static \u0275fac=function(e){return new(e||n)};static \u0275prov=y({token:n,factory:n.\u0275fac,providedIn:"root"})};var BS=" ";function sL(n,t,e){let r=Jf(n,t);e=e.trim(),!r.some(i=>i.trim()===e)&&(r.push(e),n.setAttribute(t,r.join(BS)))}function aL(n,t,e){let r=Jf(n,t);e=e.trim();let i=r.filter(o=>o!==e);i.length?n.setAttribute(t,i.join(BS)):n.removeAttribute(t)}function Jf(n,t){return n.getAttribute(t)?.match(/\S+/g)??[]}var jS="cdk-describedby-message",Qf="cdk-describedby-host",Gv=0,VS=(()=>{class n{_platform=f(Le);_document=f(Z);_messageRegistry=new Map;_messagesContainer=null;_id=`${Gv++}`;constructor(){f(Bn).load(yS),this._id=f(Oi)+"-"+Gv++}describe(e,r,i){if(!this._canBeDescribed(e,r))return;let o=Wv(r,i);typeof r!="string"?(FS(r,this._id),this._messageRegistry.set(o,{messageElement:r,referenceCount:0})):this._messageRegistry.has(o)||this._createMessageElement(r,i),this._isElementDescribedByMessage(e,o)||this._addMessageReference(e,o)}removeDescription(e,r,i){if(!r||!this._isElementNode(e))return;let o=Wv(r,i);if(this._isElementDescribedByMessage(e,o)&&this._removeMessageReference(e,o),typeof r=="string"){let s=this._messageRegistry.get(o);s&&s.referenceCount===0&&this._deleteMessageElement(o)}this._messagesContainer?.childNodes.length===0&&(this._messagesContainer.remove(),this._messagesContainer=null)}ngOnDestroy(){let e=this._document.querySelectorAll(`[${Qf}="${this._id}"]`);for(let r=0;r<e.length;r++)this._removeCdkDescribedByReferenceIds(e[r]),e[r].removeAttribute(Qf);this._messagesContainer?.remove(),this._messagesContainer=null,this._messageRegistry.clear()}_createMessageElement(e,r){let i=this._document.createElement("div");FS(i,this._id),i.textContent=e,r&&i.setAttribute("role",r),this._createMessagesContainer(),this._messagesContainer.appendChild(i),this._messageRegistry.set(Wv(e,r),{messageElement:i,referenceCount:0})}_deleteMessageElement(e){this._messageRegistry.get(e)?.messageElement?.remove(),this._messageRegistry.delete(e)}_createMessagesContainer(){if(this._messagesContainer)return;let e="cdk-describedby-message-container",r=this._document.querySelectorAll(`.${e}[platform="server"]`);for(let o=0;o<r.length;o++)r[o].remove();let i=this._document.createElement("div");i.style.visibility="hidden",i.classList.add(e),i.classList.add("cdk-visually-hidden"),this._platform.isBrowser||i.setAttribute("platform","server"),this._document.body.appendChild(i),this._messagesContainer=i}_removeCdkDescribedByReferenceIds(e){let r=Jf(e,"aria-describedby").filter(i=>i.indexOf(jS)!=0);e.setAttribute("aria-describedby",r.join(" "))}_addMessageReference(e,r){let i=this._messageRegistry.get(r);sL(e,"aria-describedby",i.messageElement.id),e.setAttribute(Qf,this._id),i.referenceCount++}_removeMessageReference(e,r){let i=this._messageRegistry.get(r);i.referenceCount--,aL(e,"aria-describedby",i.messageElement.id),e.removeAttribute(Qf)}_isElementDescribedByMessage(e,r){let i=Jf(e,"aria-describedby"),o=this._messageRegistry.get(r),s=o&&o.messageElement.id;return!!s&&i.indexOf(s)!=-1}_canBeDescribed(e,r){if(!this._isElementNode(e))return!1;if(r&&typeof r=="object")return!0;let i=r==null?"":`${r}`.trim(),o=e.getAttribute("aria-label");return i?!o||o.trim()!==i:!1}_isElementNode(e){return e.nodeType===this._document.ELEMENT_NODE}static \u0275fac=function(r){return new(r||n)};static \u0275prov=y({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})();function Wv(n,t){return typeof n=="string"?`${t||""}/${n}`:n}function FS(n,t){n.id||(n.id=`${jS}-${t}-${Gv++}`)}var lL=new v("cdk-dir-doc",{providedIn:"root",factory:()=>f(Z)}),cL=/^(ar|ckb|dv|he|iw|fa|nqo|ps|sd|ug|ur|yi|.*[-_](Adlm|Arab|Hebr|Nkoo|Rohg|Thaa))(?!.*[-_](Latn|Cyrl)($|-|_))($|-|_)/i;function US(n){let t=n?.toLowerCase()||"";return t==="auto"&&typeof navigator<"u"&&navigator?.language?cL.test(navigator.language)?"rtl":"ltr":t==="rtl"?"rtl":"ltr"}var Un=(()=>{class n{get value(){return this.valueSignal()}valueSignal=ee("ltr");change=new te;constructor(){let e=f(lL,{optional:!0});if(e){let r=e.body?e.body.dir:null,i=e.documentElement?e.documentElement.dir:null;this.valueSignal.set(US(r||i||"ltr"))}}ngOnDestroy(){this.change.complete()}static \u0275fac=function(r){return new(r||n)};static \u0275prov=y({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})();var gn=(()=>{class n{static \u0275fac=function(r){return new(r||n)};static \u0275mod=Me({type:n});static \u0275inj=De({})}return n})();var qv=class{_box;_destroyed=new C;_resizeSubject=new C;_resizeObserver;_elementObservables=new Map;constructor(t){this._box=t,typeof ResizeObserver<"u"&&(this._resizeObserver=new ResizeObserver(e=>this._resizeSubject.next(e)))}observe(t){return this._elementObservables.has(t)||this._elementObservables.set(t,new L(e=>{let r=this._resizeSubject.subscribe(e);return this._resizeObserver?.observe(t,{box:this._box}),()=>{this._resizeObserver?.unobserve(t),r.unsubscribe(),this._elementObservables.delete(t)}}).pipe(ye(e=>e.some(r=>r.target===t)),Pa({bufferSize:1,refCount:!0}),Q(this._destroyed))),this._elementObservables.get(t)}destroy(){this._destroyed.next(),this._destroyed.complete(),this._resizeSubject.complete(),this._elementObservables.clear()}},$S=(()=>{class n{_cleanupErrorListener;_observers=new Map;_ngZone=f(j);constructor(){typeof ResizeObserver<"u"}ngOnDestroy(){for(let[,e]of this._observers)e.destroy();this._observers.clear(),this._cleanupErrorListener?.()}observe(e,r){let i=r?.box||"content-box";return this._observers.has(i)||this._observers.set(i,new qv(i)),this._observers.get(i).observe(e)}static \u0275fac=function(r){return new(r||n)};static \u0275prov=y({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})();var ur=(function(n){return n[n.NORMAL=0]="NORMAL",n[n.NEGATED=1]="NEGATED",n[n.INVERTED=2]="INVERTED",n})(ur||{}),eh,qo;function th(){if(qo==null){if(typeof document!="object"||!document||typeof Element!="function"||!Element)return qo=!1,qo;if(document.documentElement?.style&&"scrollBehavior"in document.documentElement.style)qo=!0;else{let n=Element.prototype.scrollTo;n?qo=!/\{\s*\[native code\]\s*\}/.test(n.toString()):qo=!1}}return qo}function ca(){if(typeof document!="object"||!document)return ur.NORMAL;if(eh==null){let n=document.createElement("div"),t=n.style;n.dir="rtl",t.width="1px",t.overflow="auto",t.visibility="hidden",t.pointerEvents="none",t.position="absolute";let e=document.createElement("div"),r=e.style;r.width="2px",r.height="1px",n.appendChild(e),document.body.appendChild(n),eh=ur.NORMAL,n.scrollLeft===0&&(n.scrollLeft=1,eh=n.scrollLeft===0?ur.NEGATED:ur.INVERTED),n.remove()}return eh}function Kv(){return typeof __karma__<"u"&&!!__karma__||typeof jasmine<"u"&&!!jasmine||typeof jest<"u"&&!!jest||typeof Mocha<"u"&&!!Mocha}var nh=class{};function HS(n){return n&&typeof n.connect=="function"&&!(n instanceof Ta)}var rh=class extends nh{_data;constructor(t){super(),this._data=t}connect(){return on(this._data)?this._data:I(this._data)}disconnect(){}},uc=(function(n){return n[n.REPLACED=0]="REPLACED",n[n.INSERTED=1]="INSERTED",n[n.MOVED=2]="MOVED",n[n.REMOVED=3]="REMOVED",n})(uc||{}),ih=class{viewCacheSize=20;_viewCache=[];applyChanges(t,e,r,i,o){t.forEachOperation((s,a,l)=>{let c,u;if(s.previousIndex==null){let d=()=>r(s,a,l);c=this._insertView(d,l,e,i(s)),u=c?uc.INSERTED:uc.REPLACED}else l==null?(this._detachAndCacheView(a,e),u=uc.REMOVED):(c=this._moveView(a,l,e,i(s)),u=uc.MOVED);o&&o({context:c?.context,operation:u,record:s})})}detach(){for(let t of this._viewCache)t.destroy();this._viewCache=[]}_insertView(t,e,r,i){let o=this._insertViewFromCache(e,r);if(o){o.context.$implicit=i;return}let s=t();return r.createEmbeddedView(s.templateRef,s.context,s.index)}_detachAndCacheView(t,e){let r=e.detach(t);this._maybeCacheView(r,e)}_moveView(t,e,r,i){let o=r.get(t);return r.move(o,e),o.context.$implicit=i,o}_maybeCacheView(t,e){if(this._viewCache.length<this.viewCacheSize)this._viewCache.push(t);else{let r=e.indexOf(t);r===-1?t.destroy():e.remove(r)}}_insertViewFromCache(t,e){let r=this._viewCache.pop();return r&&e.insert(r,t),r||null}};var uL=["contentWrapper"],dL=["*"],GS=new v("VIRTUAL_SCROLL_STRATEGY"),Yv=class{_scrolledIndexChange=new C;scrolledIndexChange=this._scrolledIndexChange.pipe(cs());_viewport=null;_itemSize;_minBufferPx;_maxBufferPx;constructor(t,e,r){this._itemSize=t,this._minBufferPx=e,this._maxBufferPx=r}attach(t){this._viewport=t,this._updateTotalContentSize(),this._updateRenderedRange()}detach(){this._scrolledIndexChange.complete(),this._viewport=null}updateItemAndBufferSize(t,e,r){r<e,this._itemSize=t,this._minBufferPx=e,this._maxBufferPx=r,this._updateTotalContentSize(),this._updateRenderedRange()}onContentScrolled(){this._updateRenderedRange()}onDataLengthChanged(){this._updateTotalContentSize(),this._updateRenderedRange()}onContentRendered(){}onRenderedOffsetChanged(){}scrollToIndex(t,e){this._viewport&&this._viewport.scrollToOffset(t*this._itemSize,e)}_updateTotalContentSize(){this._viewport&&this._viewport.setTotalContentSize(this._viewport.getDataLength()*this._itemSize)}_updateRenderedRange(){if(!this._viewport)return;let t=this._viewport.getRenderedRange(),e={start:t.start,end:t.end},r=this._viewport.getViewportSize(),i=this._viewport.getDataLength(),o=this._viewport.measureScrollOffset(),s=this._itemSize>0?o/this._itemSize:0;if(e.end>i){let l=Math.ceil(r/this._itemSize),c=Math.max(0,Math.min(s,i-l));s!=c&&(s=c,o=c*this._itemSize,e.start=Math.floor(s)),e.end=Math.max(0,Math.min(i,e.start+l))}let a=o-e.start*this._itemSize;if(a<this._minBufferPx&&e.start!=0){let l=Math.ceil((this._maxBufferPx-a)/this._itemSize);e.start=Math.max(0,e.start-l),e.end=Math.min(i,Math.ceil(s+(r+this._minBufferPx)/this._itemSize))}else{let l=e.end*this._itemSize-(o+r);if(l<this._minBufferPx&&e.end!=i){let c=Math.ceil((this._maxBufferPx-l)/this._itemSize);c>0&&(e.end=Math.min(i,e.end+c),e.start=Math.max(0,Math.floor(s-this._minBufferPx/this._itemSize)))}}this._viewport.setRenderedRange(e),this._viewport.setRenderedContentOffset(Math.round(this._itemSize*e.start)),this._scrolledIndexChange.next(Math.floor(s))}};function fL(n){return n._scrollStrategy}var Zv=(()=>{class n{get itemSize(){return this._itemSize}set itemSize(e){this._itemSize=cr(e)}_itemSize=20;get minBufferPx(){return this._minBufferPx}set minBufferPx(e){this._minBufferPx=cr(e)}_minBufferPx=100;get maxBufferPx(){return this._maxBufferPx}set maxBufferPx(e){this._maxBufferPx=cr(e)}_maxBufferPx=200;_scrollStrategy=new Yv(this.itemSize,this.minBufferPx,this.maxBufferPx);ngOnChanges(){this._scrollStrategy.updateItemAndBufferSize(this.itemSize,this.minBufferPx,this.maxBufferPx)}static \u0275fac=function(r){return new(r||n)};static \u0275dir=le({type:n,selectors:[["cdk-virtual-scroll-viewport","itemSize",""]],inputs:{itemSize:"itemSize",minBufferPx:"minBufferPx",maxBufferPx:"maxBufferPx"},features:[Mn([{provide:GS,useFactory:fL,deps:[fs(()=>n)]}]),Tn]})}return n})(),hL=20,Wi=(()=>{class n{_ngZone=f(j);_platform=f(Le);_renderer=f(It).createRenderer(null,null);_cleanupGlobalListener;constructor(){}_scrolled=new C;_scrolledCount=0;scrollContainers=new Map;register(e){this.scrollContainers.has(e)||this.scrollContainers.set(e,e.elementScrolled().subscribe(()=>this._scrolled.next(e)))}deregister(e){let r=this.scrollContainers.get(e);r&&(r.unsubscribe(),this.scrollContainers.delete(e))}scrolled(e=hL){return this._platform.isBrowser?new L(r=>{this._cleanupGlobalListener||(this._cleanupGlobalListener=this._ngZone.runOutsideAngular(()=>this._renderer.listen("document","scroll",()=>this._scrolled.next())));let i=e>0?this._scrolled.pipe(Na(e)).subscribe(r):this._scrolled.subscribe(r);return this._scrolledCount++,()=>{i.unsubscribe(),this._scrolledCount--,this._scrolledCount||(this._cleanupGlobalListener?.(),this._cleanupGlobalListener=void 0)}}):I()}ngOnDestroy(){this._cleanupGlobalListener?.(),this._cleanupGlobalListener=void 0,this.scrollContainers.forEach((e,r)=>this.deregister(r)),this._scrolled.complete()}ancestorScrolled(e,r){let i=this.getAncestorScrollContainers(e);return this.scrolled(r).pipe(ye(o=>!o||i.indexOf(o)>-1))}getAncestorScrollContainers(e){let r=[];return this.scrollContainers.forEach((i,o)=>{this._scrollableContainsElement(o,e)&&r.push(o)}),r}_scrollableContainsElement(e,r){let i=Vn(r),o=e.getElementRef().nativeElement;do if(i==o)return!0;while(i=i.parentElement);return!1}static \u0275fac=function(r){return new(r||n)};static \u0275prov=y({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})(),dc=(()=>{class n{elementRef=f(re);scrollDispatcher=f(Wi);ngZone=f(j);dir=f(Un,{optional:!0});_scrollElement=this.elementRef.nativeElement;_destroyed=new C;_renderer=f(Bt);_cleanupScroll;_elementScrolled=new C;constructor(){}ngOnInit(){this._cleanupScroll=this.ngZone.runOutsideAngular(()=>this._renderer.listen(this._scrollElement,"scroll",e=>this._elementScrolled.next(e))),this.scrollDispatcher.register(this)}ngOnDestroy(){this._cleanupScroll?.(),this._elementScrolled.complete(),this.scrollDispatcher.deregister(this),this._destroyed.next(),this._destroyed.complete()}elementScrolled(){return this._elementScrolled}getElementRef(){return this.elementRef}scrollTo(e){let r=this.elementRef.nativeElement,i=this.dir&&this.dir.value=="rtl";e.left==null&&(e.left=i?e.end:e.start),e.right==null&&(e.right=i?e.start:e.end),e.bottom!=null&&(e.top=r.scrollHeight-r.clientHeight-e.bottom),i&&ca()!=ur.NORMAL?(e.left!=null&&(e.right=r.scrollWidth-r.clientWidth-e.left),ca()==ur.INVERTED?e.left=e.right:ca()==ur.NEGATED&&(e.left=e.right?-e.right:e.right)):e.right!=null&&(e.left=r.scrollWidth-r.clientWidth-e.right),this._applyScrollToOptions(e)}_applyScrollToOptions(e){let r=this.elementRef.nativeElement;th()?r.scrollTo(e):(e.top!=null&&(r.scrollTop=e.top),e.left!=null&&(r.scrollLeft=e.left))}measureScrollOffset(e){let r="left",i="right",o=this.elementRef.nativeElement;if(e=="top")return o.scrollTop;if(e=="bottom")return o.scrollHeight-o.clientHeight-o.scrollTop;let s=this.dir&&this.dir.value=="rtl";return e=="start"?e=s?i:r:e=="end"&&(e=s?r:i),s&&ca()==ur.INVERTED?e==r?o.scrollWidth-o.clientWidth-o.scrollLeft:o.scrollLeft:s&&ca()==ur.NEGATED?e==r?o.scrollLeft+o.scrollWidth-o.clientWidth:-o.scrollLeft:e==r?o.scrollLeft:o.scrollWidth-o.clientWidth-o.scrollLeft}static \u0275fac=function(r){return new(r||n)};static \u0275dir=le({type:n,selectors:[["","cdk-scrollable",""],["","cdkScrollable",""]]})}return n})(),pL=20,Ar=(()=>{class n{_platform=f(Le);_listeners;_viewportSize=null;_change=new C;_document=f(Z);constructor(){let e=f(j),r=f(It).createRenderer(null,null);e.runOutsideAngular(()=>{if(this._platform.isBrowser){let i=o=>this._change.next(o);this._listeners=[r.listen("window","resize",i),r.listen("window","orientationchange",i)]}this.change().subscribe(()=>this._viewportSize=null)})}ngOnDestroy(){this._listeners?.forEach(e=>e()),this._change.complete()}getViewportSize(){this._viewportSize||this._updateViewportSize();let e={width:this._viewportSize.width,height:this._viewportSize.height};return this._platform.isBrowser||(this._viewportSize=null),e}getViewportRect(){let e=this.getViewportScrollPosition(),{width:r,height:i}=this.getViewportSize();return{top:e.top,left:e.left,bottom:e.top+i,right:e.left+r,height:i,width:r}}getViewportScrollPosition(){if(!this._platform.isBrowser)return{top:0,left:0};let e=this._document,r=this._getWindow(),i=e.documentElement,o=i.getBoundingClientRect(),s=-o.top||e.body?.scrollTop||r.scrollY||i.scrollTop||0,a=-o.left||e.body?.scrollLeft||r.scrollX||i.scrollLeft||0;return{top:s,left:a}}change(e=pL){return e>0?this._change.pipe(Na(e)):this._change}_getWindow(){return this._document.defaultView||window}_updateViewportSize(){let e=this._getWindow();this._viewportSize=this._platform.isBrowser?{width:e.innerWidth,height:e.innerHeight}:{width:0,height:0}}static \u0275fac=function(r){return new(r||n)};static \u0275prov=y({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})(),zS=new v("VIRTUAL_SCROLLABLE"),mL=(()=>{class n extends dc{constructor(){super()}measureViewportSize(e){let r=this.elementRef.nativeElement;return e==="horizontal"?r.clientWidth:r.clientHeight}static \u0275fac=function(r){return new(r||n)};static \u0275dir=le({type:n,features:[jt]})}return n})();function gL(n,t){return n.start==t.start&&n.end==t.end}var yL=typeof requestAnimationFrame<"u"?Yh:Kh,qS=new v("CDK_VIRTUAL_SCROLL_VIEWPORT"),Xv=(()=>{class n extends mL{elementRef=f(re);_changeDetectorRef=f(xt);_scrollStrategy=f(GS,{optional:!0});scrollable=f(zS,{optional:!0});_platform=f(Le);_detachedSubject=new C;_renderedRangeSubject=new C;_renderedContentOffsetSubject=new C;get orientation(){return this._orientation}set orientation(e){this._orientation!==e&&(this._orientation=e,this._calculateSpacerSize())}_orientation="vertical";appendOnly=!1;scrolledIndexChange=new L(e=>this._scrollStrategy.scrolledIndexChange.subscribe(r=>Promise.resolve().then(()=>this.ngZone.run(()=>e.next(r)))));_contentWrapper;renderedRangeStream=this._renderedRangeSubject;renderedContentOffset=this._renderedContentOffsetSubject.pipe(ye(e=>e!==null),cs());_totalContentSize=0;_totalContentWidth=ee("");_totalContentHeight=ee("");_renderedContentTransform;_renderedRange={start:0,end:0};_dataLength=0;_viewportSize=0;_forOf=null;_renderedContentOffset=0;_renderedContentOffsetNeedsRewrite=!1;_changeDetectionNeeded=ee(!1);_runAfterChangeDetection=[];_viewportChanges=H.EMPTY;_injector=f(ne);_isDestroyed=!1;constructor(){super();let e=f(Ar);this._scrollStrategy,this._viewportChanges=e.change().subscribe(()=>{this.checkViewportSize()}),this.scrollable||(this.elementRef.nativeElement.classList.add("cdk-virtual-scrollable"),this.scrollable=this);let r=Co(()=>{this._changeDetectionNeeded()&&this._doChangeDetection()},{injector:f(ln).injector});f(tt).onDestroy(()=>{r.destroy()})}ngOnInit(){this._platform.isBrowser&&(this.scrollable===this&&super.ngOnInit(),this.ngZone.runOutsideAngular(()=>Promise.resolve().then(()=>{this._measureViewportSize(),this._scrollStrategy.attach(this),this.scrollable.elementScrolled().pipe(Tt(null),Na(0,yL),Q(this._destroyed)).subscribe(()=>this._scrollStrategy.onContentScrolled()),this._markChangeDetectionNeeded()})))}ngOnDestroy(){this.detach(),this._scrollStrategy.detach(),this._renderedRangeSubject.complete(),this._detachedSubject.complete(),this._viewportChanges.unsubscribe(),this._isDestroyed=!0,super.ngOnDestroy()}attach(e){this._forOf,this.ngZone.runOutsideAngular(()=>{this._forOf=e,this._forOf.dataStream.pipe(Q(this._detachedSubject)).subscribe(r=>{let i=r.length;i!==this._dataLength&&(this._dataLength=i,this._scrollStrategy.onDataLengthChanged()),this._doChangeDetection()})})}detach(){this._forOf=null,this._detachedSubject.next()}getDataLength(){return this._dataLength}getViewportSize(){return this._viewportSize}getRenderedRange(){return this._renderedRange}measureBoundingClientRectWithScrollOffset(e){return this.getElementRef().nativeElement.getBoundingClientRect()[e]}setTotalContentSize(e){this._totalContentSize!==e&&(this._totalContentSize=e,this._calculateSpacerSize(),this._markChangeDetectionNeeded())}setRenderedRange(e){gL(this._renderedRange,e)||(this.appendOnly&&(e={start:0,end:Math.max(this._renderedRange.end,e.end)}),this._renderedRangeSubject.next(this._renderedRange=e),this._markChangeDetectionNeeded(()=>this._scrollStrategy.onContentRendered()))}getOffsetToRenderedContentStart(){return this._renderedContentOffsetNeedsRewrite?null:this._renderedContentOffset}setRenderedContentOffset(e,r="to-start"){e=this.appendOnly&&r==="to-start"?0:e;let i=this.dir&&this.dir.value=="rtl",o=this.orientation=="horizontal",s=o?"X":"Y",l=`translate${s}(${Number((o&&i?-1:1)*e)}px)`;this._renderedContentOffset=e,r==="to-end"&&(l+=` translate${s}(-100%)`,this._renderedContentOffsetNeedsRewrite=!0),this._renderedContentTransform!=l&&(this._renderedContentTransform=l,this._markChangeDetectionNeeded(()=>{this._renderedContentOffsetNeedsRewrite?(this._renderedContentOffset-=this.measureRenderedContentSize(),this._renderedContentOffsetNeedsRewrite=!1,this.setRenderedContentOffset(this._renderedContentOffset)):this._scrollStrategy.onRenderedOffsetChanged()}))}scrollToOffset(e,r="auto"){let i={behavior:r};this.orientation==="horizontal"?i.start=e:i.top=e,this.scrollable.scrollTo(i)}scrollToIndex(e,r="auto"){this._scrollStrategy.scrollToIndex(e,r)}measureScrollOffset(e){let r;return this.scrollable==this?r=i=>super.measureScrollOffset(i):r=i=>this.scrollable.measureScrollOffset(i),Math.max(0,r(e??(this.orientation==="horizontal"?"start":"top"))-this.measureViewportOffset())}measureViewportOffset(e){let r,i="left",o="right",s=this.dir?.value=="rtl";e=="start"?r=s?o:i:e=="end"?r=s?i:o:e?r=e:r=this.orientation==="horizontal"?"left":"top";let a=this.scrollable.measureBoundingClientRectWithScrollOffset(r);return this.elementRef.nativeElement.getBoundingClientRect()[r]-a}measureRenderedContentSize(){let e=this._contentWrapper.nativeElement;return this.orientation==="horizontal"?e.offsetWidth:e.offsetHeight}measureRangeSize(e){return this._forOf?this._forOf.measureRangeSize(e,this.orientation):0}checkViewportSize(){this._measureViewportSize(),this._scrollStrategy.onDataLengthChanged()}_measureViewportSize(){this._viewportSize=this.scrollable.measureViewportSize(this.orientation)}_markChangeDetectionNeeded(e){e&&this._runAfterChangeDetection.push(e),!$e(this._changeDetectionNeeded)&&this.ngZone.runOutsideAngular(()=>{Promise.resolve().then(()=>{this.ngZone.run(()=>{this._changeDetectionNeeded.set(!0)})})})}_doChangeDetection(){this._isDestroyed||this.ngZone.run(()=>{this._changeDetectorRef.markForCheck(),this._contentWrapper.nativeElement.style.transform=this._renderedContentTransform,this._renderedContentOffsetSubject.next(this.getOffsetToRenderedContentStart()),ft(()=>{this._changeDetectionNeeded.set(!1);let e=this._runAfterChangeDetection;this._runAfterChangeDetection=[];for(let r of e)r()},{injector:this._injector})})}_calculateSpacerSize(){this._totalContentHeight.set(this.orientation==="horizontal"?"":`${this._totalContentSize}px`),this._totalContentWidth.set(this.orientation==="horizontal"?`${this._totalContentSize}px`:"")}static \u0275fac=function(r){return new(r||n)};static \u0275cmp=oe({type:n,selectors:[["cdk-virtual-scroll-viewport"]],viewQuery:function(r,i){if(r&1&&cn(uL,7),r&2){let o;xe(o=Re())&&(i._contentWrapper=o.first)}},hostAttrs:[1,"cdk-virtual-scroll-viewport"],hostVars:4,hostBindings:function(r,i){r&2&&je("cdk-virtual-scroll-orientation-horizontal",i.orientation==="horizontal")("cdk-virtual-scroll-orientation-vertical",i.orientation!=="horizontal")},inputs:{orientation:"orientation",appendOnly:[2,"appendOnly","appendOnly",we]},outputs:{scrolledIndexChange:"scrolledIndexChange"},features:[Mn([{provide:dc,useFactory:()=>f(zS,{optional:!0})||f(n)},{provide:qS,useExisting:n}]),jt],ngContentSelectors:dL,decls:4,vars:4,consts:[["contentWrapper",""],[1,"cdk-virtual-scroll-content-wrapper"],[1,"cdk-virtual-scroll-spacer"]],template:function(r,i){r&1&&(Er(),Jn(0,"div",1,0),er(2),Zr(),Sd(3,"div",2)),r&2&&(R(3),Ns("width",i._totalContentWidth())("height",i._totalContentHeight()))},styles:[`cdk-virtual-scroll-viewport {
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
`],encapsulation:2,changeDetection:0})}return n})();function WS(n,t,e){let r=e;if(!r.getBoundingClientRect)return 0;let i=r.getBoundingClientRect();return n==="horizontal"?t==="start"?i.left:i.right:t==="start"?i.top:i.bottom}var Qv=(()=>{class n{_viewContainerRef=f(at);_template=f(bt);_differs=f(Od);_viewRepeater=new ih;_viewport=f(qS,{skipSelf:!0});viewChange=new C;_dataSourceChanges=new C;get cdkVirtualForOf(){return this._cdkVirtualForOf}set cdkVirtualForOf(e){this._cdkVirtualForOf=e,HS(e)?this._dataSourceChanges.next(e):this._dataSourceChanges.next(new rh(on(e)?e:Array.from(e||[])))}_cdkVirtualForOf;get cdkVirtualForTrackBy(){return this._cdkVirtualForTrackBy}set cdkVirtualForTrackBy(e){this._needsUpdate=!0,this._cdkVirtualForTrackBy=e?(r,i)=>e(r+(this._renderedRange?this._renderedRange.start:0),i):void 0}_cdkVirtualForTrackBy;set cdkVirtualForTemplate(e){e&&(this._needsUpdate=!0,this._template=e)}get cdkVirtualForTemplateCacheSize(){return this._viewRepeater.viewCacheSize}set cdkVirtualForTemplateCacheSize(e){this._viewRepeater.viewCacheSize=cr(e)}dataStream=this._dataSourceChanges.pipe(Tt(null),Jh(),dt(([e,r])=>this._changeDataSource(e,r)),Pa(1));_differ=null;_data=[];_renderedItems=[];_renderedRange={start:0,end:0};_needsUpdate=!1;_destroyed=new C;constructor(){let e=f(j);this.dataStream.subscribe(r=>{this._data=r,this._onRenderedDataChange()}),this._viewport.renderedRangeStream.pipe(Q(this._destroyed)).subscribe(r=>{this._renderedRange=r,this.viewChange.observers.length&&e.run(()=>this.viewChange.next(this._renderedRange)),this._onRenderedDataChange()}),this._viewport.attach(this)}measureRangeSize(e,r){if(e.start>=e.end)return 0;e.start<this._renderedRange.start||e.end>this._renderedRange.end;let i=e.start-this._renderedRange.start,o=e.end-e.start,s,a;for(let l=0;l<o;l++){let c=this._viewContainerRef.get(l+i);if(c&&c.rootNodes.length){s=a=c.rootNodes[0];break}}for(let l=o-1;l>-1;l--){let c=this._viewContainerRef.get(l+i);if(c&&c.rootNodes.length){a=c.rootNodes[c.rootNodes.length-1];break}}return s&&a?WS(r,"end",a)-WS(r,"start",s):0}ngDoCheck(){if(this._differ&&this._needsUpdate){let e=this._differ.diff(this._renderedItems);e?this._applyChanges(e):this._updateContext(),this._needsUpdate=!1}}ngOnDestroy(){this._viewport.detach(),this._dataSourceChanges.next(void 0),this._dataSourceChanges.complete(),this.viewChange.complete(),this._destroyed.next(),this._destroyed.complete(),this._viewRepeater.detach()}_onRenderedDataChange(){this._renderedRange&&(this._renderedItems=this._data.slice(this._renderedRange.start,this._renderedRange.end),this._differ||(this._differ=this._differs.find(this._renderedItems).create((e,r)=>this.cdkVirtualForTrackBy?this.cdkVirtualForTrackBy(e,r):r)),this._needsUpdate=!0)}_changeDataSource(e,r){return e&&e.disconnect(this),this._needsUpdate=!0,r?r.connect(this):I()}_updateContext(){let e=this._data.length,r=this._viewContainerRef.length;for(;r--;){let i=this._viewContainerRef.get(r);i.context.index=this._renderedRange.start+r,i.context.count=e,this._updateComputedContextProperties(i.context),i.detectChanges()}}_applyChanges(e){this._viewRepeater.applyChanges(e,this._viewContainerRef,(o,s,a)=>this._getEmbeddedViewArgs(o,a),o=>o.item),e.forEachIdentityChange(o=>{let s=this._viewContainerRef.get(o.currentIndex);s.context.$implicit=o.item});let r=this._data.length,i=this._viewContainerRef.length;for(;i--;){let o=this._viewContainerRef.get(i);o.context.index=this._renderedRange.start+i,o.context.count=r,this._updateComputedContextProperties(o.context)}}_updateComputedContextProperties(e){e.first=e.index===0,e.last=e.index===e.count-1,e.even=e.index%2===0,e.odd=!e.even}_getEmbeddedViewArgs(e,r){return{templateRef:this._template,context:{$implicit:e.item,cdkVirtualForOf:this._cdkVirtualForOf,index:-1,count:-1,first:!1,last:!1,odd:!1,even:!1},index:r}}static ngTemplateContextGuard(e,r){return!0}static \u0275fac=function(r){return new(r||n)};static \u0275dir=le({type:n,selectors:[["","cdkVirtualFor","","cdkVirtualForOf",""]],inputs:{cdkVirtualForOf:"cdkVirtualForOf",cdkVirtualForTrackBy:"cdkVirtualForTrackBy",cdkVirtualForTemplate:"cdkVirtualForTemplate",cdkVirtualForTemplateCacheSize:"cdkVirtualForTemplateCacheSize"}})}return n})();var Ko=(()=>{class n{static \u0275fac=function(r){return new(r||n)};static \u0275mod=Me({type:n});static \u0275inj=De({})}return n})(),fc=(()=>{class n{static \u0275fac=function(r){return new(r||n)};static \u0275mod=Me({type:n});static \u0275inj=De({imports:[gn,Ko,gn,Ko]})}return n})();var bL=new v("MATERIAL_ANIMATIONS"),KS=null;function _L(){return f(bL,{optional:!0})?.animationsDisabled||f(cl,{optional:!0})==="NoopAnimations"?"di-disabled":(KS??=f(la).matchMedia("(prefers-reduced-motion)").matches,KS?"reduced-motion":"enabled")}function $n(){return _L()!=="enabled"}function et(n){return n==null?"":typeof n=="string"?n:`${n}px`}function Jv(n){return n!=null&&`${n}`!="false"}var Hn=(function(n){return n[n.FADING_IN=0]="FADING_IN",n[n.VISIBLE=1]="VISIBLE",n[n.FADING_OUT=2]="FADING_OUT",n[n.HIDDEN=3]="HIDDEN",n})(Hn||{}),eb=class{_renderer;element;config;_animationForciblyDisabledThroughCss;state=Hn.HIDDEN;constructor(t,e,r,i=!1){this._renderer=t,this.element=e,this.config=r,this._animationForciblyDisabledThroughCss=i}fadeOut(){this._renderer.fadeOutRipple(this)}},YS=sa({passive:!0,capture:!0}),tb=class{_events=new Map;addHandler(t,e,r,i){let o=this._events.get(e);if(o){let s=o.get(r);s?s.add(i):o.set(r,new Set([i]))}else this._events.set(e,new Map([[r,new Set([i])]])),t.runOutsideAngular(()=>{document.addEventListener(e,this._delegateEventHandler,YS)})}removeHandler(t,e,r){let i=this._events.get(t);if(!i)return;let o=i.get(e);o&&(o.delete(r),o.size===0&&i.delete(e),i.size===0&&(this._events.delete(t),document.removeEventListener(t,this._delegateEventHandler,YS)))}_delegateEventHandler=t=>{let e=jn(t);e&&this._events.get(t.type)?.forEach((r,i)=>{(i===e||i.contains(e))&&r.forEach(o=>o.handleEvent(t))})}},ZS={enterDuration:225,exitDuration:150},CL=800,XS=sa({passive:!0,capture:!0}),QS=["mousedown","touchstart"],JS=["mouseup","mouseleave","touchend","touchcancel"],DL=(()=>{class n{static \u0275fac=function(r){return new(r||n)};static \u0275cmp=oe({type:n,selectors:[["ng-component"]],hostAttrs:["mat-ripple-style-loader",""],decls:0,vars:0,template:function(r,i){},styles:[`.mat-ripple {
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
`],encapsulation:2,changeDetection:0})}return n})(),nb=class n{_target;_ngZone;_platform;_containerElement;_triggerElement=null;_isPointerDown=!1;_activeRipples=new Map;_mostRecentTransientRipple=null;_lastTouchStartEvent;_pointerUpEventsRegistered=!1;_containerRect=null;static _eventManager=new tb;constructor(t,e,r,i,o){this._target=t,this._ngZone=e,this._platform=i,i.isBrowser&&(this._containerElement=Vn(r)),o&&o.get(Bn).load(DL)}fadeInRipple(t,e,r={}){let i=this._containerRect=this._containerRect||this._containerElement.getBoundingClientRect(),o=g(g({},ZS),r.animation);r.centered&&(t=i.left+i.width/2,e=i.top+i.height/2);let s=r.radius||EL(t,e,i),a=t-i.left,l=e-i.top,c=o.enterDuration,u=document.createElement("div");u.classList.add("mat-ripple-element"),u.style.left=`${a-s}px`,u.style.top=`${l-s}px`,u.style.height=`${s*2}px`,u.style.width=`${s*2}px`,r.color!=null&&(u.style.backgroundColor=r.color),u.style.transitionDuration=`${c}ms`,this._containerElement.appendChild(u);let d=window.getComputedStyle(u),h=d.transitionProperty,p=d.transitionDuration,m=h==="none"||p==="0s"||p==="0s, 0s"||i.width===0&&i.height===0,_=new eb(this,u,r,m);u.style.transform="scale3d(1, 1, 1)",_.state=Hn.FADING_IN,r.persistent||(this._mostRecentTransientRipple=_);let M=null;return!m&&(c||o.exitDuration)&&this._ngZone.runOutsideAngular(()=>{let k=()=>{M&&(M.fallbackTimer=null),clearTimeout(ze),this._finishRippleTransition(_)},ae=()=>this._destroyRipple(_),ze=setTimeout(ae,c+100);u.addEventListener("transitionend",k),u.addEventListener("transitioncancel",ae),M={onTransitionEnd:k,onTransitionCancel:ae,fallbackTimer:ze}}),this._activeRipples.set(_,M),(m||!c)&&this._finishRippleTransition(_),_}fadeOutRipple(t){if(t.state===Hn.FADING_OUT||t.state===Hn.HIDDEN)return;let e=t.element,r=g(g({},ZS),t.config.animation);e.style.transitionDuration=`${r.exitDuration}ms`,e.style.opacity="0",t.state=Hn.FADING_OUT,(t._animationForciblyDisabledThroughCss||!r.exitDuration)&&this._finishRippleTransition(t)}fadeOutAll(){this._getActiveRipples().forEach(t=>t.fadeOut())}fadeOutAllNonPersistent(){this._getActiveRipples().forEach(t=>{t.config.persistent||t.fadeOut()})}setupTriggerEvents(t){let e=Vn(t);!this._platform.isBrowser||!e||e===this._triggerElement||(this._removeTriggerEvents(),this._triggerElement=e,QS.forEach(r=>{n._eventManager.addHandler(this._ngZone,r,e,this)}))}handleEvent(t){t.type==="mousedown"?this._onMousedown(t):t.type==="touchstart"?this._onTouchStart(t):this._onPointerUp(),this._pointerUpEventsRegistered||(this._ngZone.runOutsideAngular(()=>{JS.forEach(e=>{this._triggerElement.addEventListener(e,this,XS)})}),this._pointerUpEventsRegistered=!0)}_finishRippleTransition(t){t.state===Hn.FADING_IN?this._startFadeOutTransition(t):t.state===Hn.FADING_OUT&&this._destroyRipple(t)}_startFadeOutTransition(t){let e=t===this._mostRecentTransientRipple,{persistent:r}=t.config;t.state=Hn.VISIBLE,!r&&(!e||!this._isPointerDown)&&t.fadeOut()}_destroyRipple(t){let e=this._activeRipples.get(t)??null;this._activeRipples.delete(t),this._activeRipples.size||(this._containerRect=null),t===this._mostRecentTransientRipple&&(this._mostRecentTransientRipple=null),t.state=Hn.HIDDEN,e!==null&&(t.element.removeEventListener("transitionend",e.onTransitionEnd),t.element.removeEventListener("transitioncancel",e.onTransitionCancel),e.fallbackTimer!==null&&clearTimeout(e.fallbackTimer)),t.element.remove()}_onMousedown(t){let e=Ho(t),r=this._lastTouchStartEvent&&Date.now()<this._lastTouchStartEvent+CL;!this._target.rippleDisabled&&!e&&!r&&(this._isPointerDown=!0,this.fadeInRipple(t.clientX,t.clientY,this._target.rippleConfig))}_onTouchStart(t){if(!this._target.rippleDisabled&&!zo(t)){this._lastTouchStartEvent=Date.now(),this._isPointerDown=!0;let e=t.changedTouches;if(e)for(let r=0;r<e.length;r++)this.fadeInRipple(e[r].clientX,e[r].clientY,this._target.rippleConfig)}}_onPointerUp(){this._isPointerDown&&(this._isPointerDown=!1,this._getActiveRipples().forEach(t=>{let e=t.state===Hn.VISIBLE||t.config.terminateOnPointerUp&&t.state===Hn.FADING_IN;!t.config.persistent&&e&&t.fadeOut()}))}_getActiveRipples(){return Array.from(this._activeRipples.keys())}_removeTriggerEvents(){let t=this._triggerElement;t&&(QS.forEach(e=>n._eventManager.removeHandler(e,t,this)),this._pointerUpEventsRegistered&&(JS.forEach(e=>t.removeEventListener(e,this,XS)),this._pointerUpEventsRegistered=!1))}};function EL(n,t,e){let r=Math.max(Math.abs(n-e.left),Math.abs(n-e.right)),i=Math.max(Math.abs(t-e.top),Math.abs(t-e.bottom));return Math.sqrt(r*r+i*i)}var eI=new v("mat-ripple-global-options"),hc=(()=>{class n{_elementRef=f(re);_animationsDisabled=$n();color;unbounded=!1;centered=!1;radius=0;animation;get disabled(){return this._disabled}set disabled(e){e&&this.fadeOutAllNonPersistent(),this._disabled=e,this._setupTriggerEventsIfEnabled()}_disabled=!1;get trigger(){return this._trigger||this._elementRef.nativeElement}set trigger(e){this._trigger=e,this._setupTriggerEventsIfEnabled()}_trigger;_rippleRenderer;_globalOptions;_isInitialized=!1;constructor(){let e=f(j),r=f(Le),i=f(eI,{optional:!0}),o=f(ne);this._globalOptions=i||{},this._rippleRenderer=new nb(this,e,this._elementRef,r,o)}ngOnInit(){this._isInitialized=!0,this._setupTriggerEventsIfEnabled()}ngOnDestroy(){this._rippleRenderer._removeTriggerEvents()}fadeOutAll(){this._rippleRenderer.fadeOutAll()}fadeOutAllNonPersistent(){this._rippleRenderer.fadeOutAllNonPersistent()}get rippleConfig(){return{centered:this.centered,radius:this.radius,color:this.color,animation:g(g(g({},this._globalOptions.animation),this._animationsDisabled?{enterDuration:0,exitDuration:0}:{}),this.animation),terminateOnPointerUp:this._globalOptions.terminateOnPointerUp}}get rippleDisabled(){return this.disabled||!!this._globalOptions.disabled}_setupTriggerEventsIfEnabled(){!this.disabled&&this._isInitialized&&this._rippleRenderer.setupTriggerEvents(this.trigger)}launch(e,r=0,i){return typeof e=="number"?this._rippleRenderer.fadeInRipple(e,r,g(g({},this.rippleConfig),i)):this._rippleRenderer.fadeInRipple(0,0,g(g({},this.rippleConfig),e))}static \u0275fac=function(r){return new(r||n)};static \u0275dir=le({type:n,selectors:[["","mat-ripple",""],["","matRipple",""]],hostAttrs:[1,"mat-ripple"],hostVars:2,hostBindings:function(r,i){r&2&&je("mat-ripple-unbounded",i.unbounded)},inputs:{color:[0,"matRippleColor","color"],unbounded:[0,"matRippleUnbounded","unbounded"],centered:[0,"matRippleCentered","centered"],radius:[0,"matRippleRadius","radius"],animation:[0,"matRippleAnimation","animation"],disabled:[0,"matRippleDisabled","disabled"],trigger:[0,"matRippleTrigger","trigger"]},exportAs:["matRipple"]})}return n})();var cb=["*"];function wL(n,t){n&1&&er(0)}var TL=["tabListContainer"],SL=["tabList"],IL=["tabListInner"],ML=["nextPaginator"],xL=["previousPaginator"],RL=["content"];function kL(n,t){}var AL=["tabBodyWrapper"],OL=["tabHeader"];function NL(n,t){}function PL(n,t){if(n&1&&Dr(0,NL,0,0,"ng-template",12),n&2){let e=ce().$implicit;Je("cdkPortalOutlet",e.templateLabel)}}function LL(n,t){if(n&1&&A(0),n&2){let e=ce().$implicit;Zt(e.textLabel)}}function FL(n,t){if(n&1){let e=Kt();b(0,"div",7,2),Ee("click",function(){let i=Ve(e),o=i.$implicit,s=i.$index,a=ce(),l=Os(1);return Ue(a._handleClick(o,l,s))})("cdkFocusChange",function(i){let o=Ve(e).$index,s=ce();return Ue(s._tabFocusChanged(i,o))}),Ce(2,"span",8)(3,"div",9),b(4,"span",10)(5,"span",11),Xe(6,PL,1,1,null,12)(7,LL,1,1),D()()()}if(n&2){let e=t.$implicit,r=t.$index,i=Os(1),o=ce();tr(e.labelClass),je("mdc-tab--active",o.selectedIndex===r),Je("id",o._getTabLabelId(e,r))("disabled",e.disabled)("fitInkBarToContent",o.fitInkBarToContent),ht("tabIndex",o._getTabIndex(r))("aria-posinset",r+1)("aria-setsize",o._tabs.length)("aria-controls",o._getTabContentId(r))("aria-selected",o.selectedIndex===r)("aria-label",e.ariaLabel||null)("aria-labelledby",!e.ariaLabel&&e.ariaLabelledby?e.ariaLabelledby:null),R(3),Je("matRippleTrigger",i)("matRippleDisabled",e.disabled||o.disableRipple),R(3),Qe(e.templateLabel?6:7)}}function BL(n,t){n&1&&er(0)}function jL(n,t){if(n&1){let e=Kt();b(0,"mat-tab-body",13),Ee("_onCentered",function(){Ve(e);let i=ce();return Ue(i._removeTabBodyWrapperHeight())})("_onCentering",function(i){Ve(e);let o=ce();return Ue(o._setTabBodyWrapperHeight(i))})("_beforeCentering",function(i){Ve(e);let o=ce();return Ue(o._bodyCentered(i))}),D()}if(n&2){let e=t.$implicit,r=t.$index,i=ce();tr(e.bodyClass),Je("id",i._getTabContentId(r))("content",e.content)("position",e.position)("animationDuration",i.animationDuration)("preserveContent",i.preserveContent),ht("tabindex",i.contentTabIndex!=null&&i.selectedIndex===r?i.contentTabIndex:null)("aria-labelledby",i._getTabLabelId(e,r))("aria-hidden",i.selectedIndex!==r)}}var VL=new v("MatTabContent"),UL=(()=>{class n{template=f(bt);constructor(){}static \u0275fac=function(r){return new(r||n)};static \u0275dir=le({type:n,selectors:[["","matTabContent",""]],features:[Mn([{provide:VL,useExisting:n}])]})}return n})(),$L=new v("MatTabLabel"),iI=new v("MAT_TAB"),ub=(()=>{class n extends mS{_closestTab=f(iI,{optional:!0});static \u0275fac=(()=>{let e;return function(i){return(e||(e=Sn(n)))(i||n)}})();static \u0275dir=le({type:n,selectors:[["","mat-tab-label",""],["","matTabLabel",""]],features:[Mn([{provide:$L,useExisting:n}]),jt]})}return n})(),oI=new v("MAT_TAB_GROUP"),db=(()=>{class n{_viewContainerRef=f(at);_closestTabGroup=f(oI,{optional:!0});disabled=!1;get templateLabel(){return this._templateLabel}set templateLabel(e){this._setTemplateLabelInput(e)}_templateLabel;_explicitContent=void 0;_implicitContent;textLabel="";ariaLabel;ariaLabelledby;labelClass;bodyClass;id=null;_contentPortal=null;get content(){return this._contentPortal}_stateChanges=new C;position=null;origin=null;isActive=!1;constructor(){f(Bn).load(Kf)}ngOnChanges(e){(e.hasOwnProperty("textLabel")||e.hasOwnProperty("disabled"))&&this._stateChanges.next()}ngOnDestroy(){this._stateChanges.complete()}ngOnInit(){this._contentPortal=new ui(this._explicitContent||this._implicitContent,this._viewContainerRef)}_setTemplateLabelInput(e){e&&e._closestTab===this&&(this._templateLabel=e)}static \u0275fac=function(r){return new(r||n)};static \u0275cmp=oe({type:n,selectors:[["mat-tab"]],contentQueries:function(r,i,o){if(r&1&&Xr(o,ub,5)(o,UL,7,bt),r&2){let s;xe(s=Re())&&(i.templateLabel=s.first),xe(s=Re())&&(i._explicitContent=s.first)}},viewQuery:function(r,i){if(r&1&&cn(bt,7),r&2){let o;xe(o=Re())&&(i._implicitContent=o.first)}},hostAttrs:["hidden",""],hostVars:1,hostBindings:function(r,i){r&2&&ht("id",null)},inputs:{disabled:[2,"disabled","disabled",we],textLabel:[0,"label","textLabel"],ariaLabel:[0,"aria-label","ariaLabel"],ariaLabelledby:[0,"aria-labelledby","ariaLabelledby"],labelClass:"labelClass",bodyClass:"bodyClass",id:"id"},exportAs:["matTab"],features:[Mn([{provide:iI,useExisting:n}]),Tn],ngContentSelectors:cb,decls:1,vars:0,template:function(r,i){r&1&&(Er(),Rs(0,wL,1,0,"ng-template"))},encapsulation:2})}return n})(),rb="mdc-tab-indicator--active",tI="mdc-tab-indicator--no-transition",ib=class{_items;_currentItem;constructor(t){this._items=t}hide(){this._items.forEach(t=>t.deactivateInkBar()),this._currentItem=void 0}alignToElement(t){let e=this._items.find(i=>i.elementRef.nativeElement===t),r=this._currentItem;if(e!==r&&(r?.deactivateInkBar(),e)){let i=r?.elementRef.nativeElement.getBoundingClientRect?.();e.activateInkBar(i),this._currentItem=e}}},HL=(()=>{class n{_elementRef=f(re);_inkBarElement=null;_inkBarContentElement=null;_fitToContent=!1;get fitInkBarToContent(){return this._fitToContent}set fitInkBarToContent(e){this._fitToContent!==e&&(this._fitToContent=e,this._inkBarElement&&this._appendInkBarElement())}activateInkBar(e){let r=this._elementRef.nativeElement;if(!e||!r.getBoundingClientRect||!this._inkBarContentElement){r.classList.add(rb);return}let i=r.getBoundingClientRect(),o=e.width/i.width,s=e.left-i.left;r.classList.add(tI),this._inkBarContentElement.style.setProperty("transform",`translateX(${s}px) scaleX(${o})`),r.getBoundingClientRect(),r.classList.remove(tI),r.classList.add(rb),this._inkBarContentElement.style.setProperty("transform","")}deactivateInkBar(){this._elementRef.nativeElement.classList.remove(rb)}ngOnInit(){this._createInkBarElement()}ngOnDestroy(){this._inkBarElement?.remove(),this._inkBarElement=this._inkBarContentElement=null}_createInkBarElement(){let e=this._elementRef.nativeElement.ownerDocument||document,r=this._inkBarElement=e.createElement("span"),i=this._inkBarContentElement=e.createElement("span");r.className="mdc-tab-indicator",i.className="mdc-tab-indicator__content mdc-tab-indicator__content--underline",r.appendChild(this._inkBarContentElement),this._appendInkBarElement()}_appendInkBarElement(){this._inkBarElement;let e=this._fitToContent?this._elementRef.nativeElement.querySelector(".mdc-tab__content"):this._elementRef.nativeElement;e.appendChild(this._inkBarElement)}static \u0275fac=function(r){return new(r||n)};static \u0275dir=le({type:n,inputs:{fitInkBarToContent:[2,"fitInkBarToContent","fitInkBarToContent",we]}})}return n})();var sI=(()=>{class n extends HL{elementRef=f(re);disabled=!1;focus(){this.elementRef.nativeElement.focus()}getOffsetLeft(){return this.elementRef.nativeElement.offsetLeft}getOffsetWidth(){return this.elementRef.nativeElement.offsetWidth}static \u0275fac=(()=>{let e;return function(i){return(e||(e=Sn(n)))(i||n)}})();static \u0275dir=le({type:n,selectors:[["","matTabLabelWrapper",""]],hostVars:3,hostBindings:function(r,i){r&2&&(ht("aria-disabled",!!i.disabled),je("mat-mdc-tab-disabled",i.disabled))},inputs:{disabled:[2,"disabled","disabled",we]},features:[jt]})}return n})(),nI={passive:!0},zL=650,WL=100,GL=(()=>{class n{_elementRef=f(re);_changeDetectorRef=f(xt);_viewportRuler=f(Ar);_dir=f(Un,{optional:!0});_ngZone=f(j);_platform=f(Le);_sharedResizeObserver=f($S);_injector=f(ne);_renderer=f(Bt);_animationsDisabled=$n();_eventCleanups;_scrollDistance=0;_selectedIndexChanged=!1;_destroyed=new C;_showPaginationControls=!1;_disableScrollAfter=!0;_disableScrollBefore=!0;_tabLabelCount;_scrollDistanceChanged=!1;_keyManager;_currentTextContent;_stopScrolling=new C;disablePagination=!1;get selectedIndex(){return this._selectedIndex}set selectedIndex(e){let r=isNaN(e)?0:e;this._selectedIndex!=r&&(this._selectedIndexChanged=!0,this._selectedIndex=r,this._keyManager&&this._keyManager.updateActiveItem(r))}_selectedIndex=0;selectFocusedIndex=new te;indexFocused=new te;constructor(){this._eventCleanups=this._ngZone.runOutsideAngular(()=>[this._renderer.listen(this._elementRef.nativeElement,"mouseleave",()=>this._stopInterval())])}ngAfterViewInit(){this._eventCleanups.push(this._renderer.listen(this._previousPaginator.nativeElement,"touchstart",()=>this._handlePaginatorPress("before"),nI),this._renderer.listen(this._nextPaginator.nativeElement,"touchstart",()=>this._handlePaginatorPress("after"),nI))}ngAfterContentInit(){let e=this._dir?this._dir.change:I("ltr"),r=this._sharedResizeObserver.observe(this._elementRef.nativeElement).pipe(jr(32),Q(this._destroyed)),i=this._viewportRuler.change(150).pipe(Q(this._destroyed)),o=()=>{this.updatePagination(),this._alignInkBarToSelectedTab()};this._keyManager=new Go(this._items).withHorizontalOrientation(this._getLayoutDirection()).withHomeAndEnd().withWrap().skipPredicate(()=>!1),this._keyManager.updateActiveItem(Math.max(this._selectedIndex,0)),ft(o,{injector:this._injector}),Fr(e,i,r,this._items.changes,this._itemsResized()).pipe(Q(this._destroyed)).subscribe(()=>{this._ngZone.run(()=>{Promise.resolve().then(()=>{this._scrollDistance=Math.max(0,Math.min(this._getMaxScrollDistance(),this._scrollDistance)),o()})}),this._keyManager?.withHorizontalOrientation(this._getLayoutDirection())}),this._keyManager.change.subscribe(s=>{this.indexFocused.emit(s),this._setTabFocus(s)})}_itemsResized(){return typeof ResizeObserver!="function"?Se:this._items.changes.pipe(Tt(this._items),dt(e=>new L(r=>this._ngZone.runOutsideAngular(()=>{let i=new ResizeObserver(o=>r.next(o));return e.forEach(o=>i.observe(o.elementRef.nativeElement)),()=>{i.disconnect()}}))),so(1),ye(e=>e.some(r=>r.contentRect.width>0&&r.contentRect.height>0)))}ngAfterContentChecked(){this._tabLabelCount!=this._items.length&&(this.updatePagination(),this._tabLabelCount=this._items.length,this._changeDetectorRef.markForCheck()),this._selectedIndexChanged&&(this._scrollToLabel(this._selectedIndex),this._checkScrollingControls(),this._alignInkBarToSelectedTab(),this._selectedIndexChanged=!1,this._changeDetectorRef.markForCheck()),this._scrollDistanceChanged&&(this._updateTabScrollPosition(),this._scrollDistanceChanged=!1,this._changeDetectorRef.markForCheck())}ngOnDestroy(){this._eventCleanups.forEach(e=>e()),this._keyManager?.destroy(),this._destroyed.next(),this._destroyed.complete(),this._stopScrolling.complete()}_handleKeydown(e){if(!zi(e))switch(e.keyCode){case 13:case 32:if(this.focusIndex!==this.selectedIndex){let r=this._items.get(this.focusIndex);r&&!r.disabled&&(this.selectFocusedIndex.emit(this.focusIndex),this._itemSelected(e))}break;default:this._keyManager?.onKeydown(e)}}_onContentChanges(){let e=this._elementRef.nativeElement.textContent;e!==this._currentTextContent&&(this._currentTextContent=e||"",this._ngZone.run(()=>{this.updatePagination(),this._alignInkBarToSelectedTab(),this._changeDetectorRef.markForCheck()}))}updatePagination(){this._checkPaginationEnabled(),this._checkScrollingControls(),this._updateTabScrollPosition()}get focusIndex(){return this._keyManager?this._keyManager.activeItemIndex:0}set focusIndex(e){!this._isValidIndex(e)||this.focusIndex===e||!this._keyManager||this._keyManager.setActiveItem(e)}_isValidIndex(e){return this._items?!!this._items.toArray()[e]:!0}_setTabFocus(e){if(this._showPaginationControls&&this._scrollToLabel(e),this._items&&this._items.length){this._items.toArray()[e].focus();let r=this._tabListContainer.nativeElement;this._getLayoutDirection()=="ltr"?r.scrollLeft=0:r.scrollLeft=r.scrollWidth-r.offsetWidth}}_getLayoutDirection(){return this._dir&&this._dir.value==="rtl"?"rtl":"ltr"}_updateTabScrollPosition(){if(this.disablePagination)return;let e=this.scrollDistance,r=this._getLayoutDirection()==="ltr"?-e:e;this._tabList.nativeElement.style.transform=`translateX(${Math.round(r)}px)`,(this._platform.TRIDENT||this._platform.EDGE)&&(this._tabListContainer.nativeElement.scrollLeft=0)}get scrollDistance(){return this._scrollDistance}set scrollDistance(e){this._scrollTo(e)}_scrollHeader(e){let r=this._tabListContainer.nativeElement.offsetWidth,i=(e=="before"?-1:1)*r/3;return this._scrollTo(this._scrollDistance+i)}_handlePaginatorClick(e){this._stopInterval(),this._scrollHeader(e)}_scrollToLabel(e){if(this.disablePagination)return;let r=this._items?this._items.toArray()[e]:null;if(!r)return;let i=this._tabListContainer.nativeElement.offsetWidth,{offsetLeft:o,offsetWidth:s}=r.elementRef.nativeElement,a,l;this._getLayoutDirection()=="ltr"?(a=o,l=a+s):(l=this._tabListInner.nativeElement.offsetWidth-o,a=l-s);let c=this.scrollDistance,u=this.scrollDistance+i;a<c?this.scrollDistance-=c-a:l>u&&(this.scrollDistance+=Math.min(l-u,a-c))}_checkPaginationEnabled(){if(this.disablePagination)this._showPaginationControls=!1;else{let e=this._tabListInner.nativeElement.scrollWidth,r=this._elementRef.nativeElement.offsetWidth,i=e-r>=5;i||(this.scrollDistance=0),i!==this._showPaginationControls&&(this._showPaginationControls=i,this._changeDetectorRef.markForCheck())}}_checkScrollingControls(){this.disablePagination?this._disableScrollAfter=this._disableScrollBefore=!0:(this._disableScrollBefore=this.scrollDistance==0,this._disableScrollAfter=this.scrollDistance==this._getMaxScrollDistance(),this._changeDetectorRef.markForCheck())}_getMaxScrollDistance(){let e=this._tabListInner.nativeElement.scrollWidth,r=this._tabListContainer.nativeElement.offsetWidth;return e-r||0}_alignInkBarToSelectedTab(){let e=this._items&&this._items.length?this._items.toArray()[this.selectedIndex]:null,r=e?e.elementRef.nativeElement:null;r?this._inkBar.alignToElement(r):this._inkBar.hide()}_stopInterval(){this._stopScrolling.next()}_handlePaginatorPress(e,r){r&&r.button!=null&&r.button!==0||(this._stopInterval(),Oa(zL,WL).pipe(Q(Fr(this._stopScrolling,this._destroyed))).subscribe(()=>{let{maxScrollDistance:i,distance:o}=this._scrollHeader(e);(o===0||o>=i)&&this._stopInterval()}))}_scrollTo(e){if(this.disablePagination)return{maxScrollDistance:0,distance:0};let r=this._getMaxScrollDistance();return this._scrollDistance=Math.max(0,Math.min(r,e)),this._scrollDistanceChanged=!0,this._checkScrollingControls(),{maxScrollDistance:r,distance:this._scrollDistance}}static \u0275fac=function(r){return new(r||n)};static \u0275dir=le({type:n,inputs:{disablePagination:[2,"disablePagination","disablePagination",we],selectedIndex:[2,"selectedIndex","selectedIndex",Nd]},outputs:{selectFocusedIndex:"selectFocusedIndex",indexFocused:"indexFocused"}})}return n})(),qL=(()=>{class n extends GL{_items;_tabListContainer;_tabList;_tabListInner;_nextPaginator;_previousPaginator;_inkBar;ariaLabel;ariaLabelledby;disableRipple=!1;ngAfterContentInit(){this._inkBar=new ib(this._items),super.ngAfterContentInit()}_itemSelected(e){e.preventDefault()}static \u0275fac=(()=>{let e;return function(i){return(e||(e=Sn(n)))(i||n)}})();static \u0275cmp=oe({type:n,selectors:[["mat-tab-header"]],contentQueries:function(r,i,o){if(r&1&&Xr(o,sI,4),r&2){let s;xe(s=Re())&&(i._items=s)}},viewQuery:function(r,i){if(r&1&&cn(TL,7)(SL,7)(IL,7)(ML,5)(xL,5),r&2){let o;xe(o=Re())&&(i._tabListContainer=o.first),xe(o=Re())&&(i._tabList=o.first),xe(o=Re())&&(i._tabListInner=o.first),xe(o=Re())&&(i._nextPaginator=o.first),xe(o=Re())&&(i._previousPaginator=o.first)}},hostAttrs:[1,"mat-mdc-tab-header"],hostVars:4,hostBindings:function(r,i){r&2&&je("mat-mdc-tab-header-pagination-controls-enabled",i._showPaginationControls)("mat-mdc-tab-header-rtl",i._getLayoutDirection()=="rtl")},inputs:{ariaLabel:[0,"aria-label","ariaLabel"],ariaLabelledby:[0,"aria-labelledby","ariaLabelledby"],disableRipple:[2,"disableRipple","disableRipple",we]},features:[jt],ngContentSelectors:cb,decls:13,vars:10,consts:[["previousPaginator",""],["tabListContainer",""],["tabList",""],["tabListInner",""],["nextPaginator",""],["mat-ripple","",1,"mat-mdc-tab-header-pagination","mat-mdc-tab-header-pagination-before",3,"click","mousedown","touchend","matRippleDisabled"],[1,"mat-mdc-tab-header-pagination-chevron"],[1,"mat-mdc-tab-label-container",3,"keydown"],["role","tablist",1,"mat-mdc-tab-list",3,"cdkObserveContent"],[1,"mat-mdc-tab-labels"],["mat-ripple","",1,"mat-mdc-tab-header-pagination","mat-mdc-tab-header-pagination-after",3,"mousedown","click","touchend","matRippleDisabled"]],template:function(r,i){r&1&&(Er(),b(0,"div",5,0),Ee("click",function(){return i._handlePaginatorClick("before")})("mousedown",function(s){return i._handlePaginatorPress("before",s)})("touchend",function(){return i._stopInterval()}),Ce(2,"div",6),D(),b(3,"div",7,1),Ee("keydown",function(s){return i._handleKeydown(s)}),b(5,"div",8,2),Ee("cdkObserveContent",function(){return i._onContentChanges()}),b(7,"div",9,3),er(9),D()()(),b(10,"div",10,4),Ee("mousedown",function(s){return i._handlePaginatorPress("after",s)})("click",function(){return i._handlePaginatorClick("after")})("touchend",function(){return i._stopInterval()}),Ce(12,"div",6),D()),r&2&&(je("mat-mdc-tab-header-pagination-disabled",i._disableScrollBefore),Je("matRippleDisabled",i._disableScrollBefore||i.disableRipple),R(3),je("_mat-animation-noopable",i._animationsDisabled),R(2),ht("aria-label",i.ariaLabel||null)("aria-labelledby",i.ariaLabelledby||null),R(5),je("mat-mdc-tab-header-pagination-disabled",i._disableScrollAfter),Je("matRippleDisabled",i._disableScrollAfter||i.disableRipple))},dependencies:[hc,RS],styles:[`.mat-mdc-tab-header {
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
`],encapsulation:2})}return n})(),KL=new v("MAT_TABS_CONFIG"),rI=(()=>{class n extends Ov{_host=f(ob);_ngZone=f(j);_centeringSub=H.EMPTY;_leavingSub=H.EMPTY;constructor(){super()}ngOnInit(){super.ngOnInit(),this._centeringSub=this._host._beforeCentering.pipe(Tt(this._host._isCenterPosition())).subscribe(e=>{this._host._content&&e&&!this.hasAttached()&&this._ngZone.run(()=>{Promise.resolve().then(),this.attach(this._host._content)})}),this._leavingSub=this._host._afterLeavingCenter.subscribe(()=>{this._host.preserveContent||this._ngZone.run(()=>this.detach())})}ngOnDestroy(){super.ngOnDestroy(),this._centeringSub.unsubscribe(),this._leavingSub.unsubscribe()}static \u0275fac=function(r){return new(r||n)};static \u0275dir=le({type:n,selectors:[["","matTabBodyHost",""]],features:[jt]})}return n})(),ob=(()=>{class n{_elementRef=f(re);_dir=f(Un,{optional:!0});_ngZone=f(j);_injector=f(ne);_renderer=f(Bt);_diAnimationsDisabled=$n();_eventCleanups;_initialized=!1;_fallbackTimer;_positionIndex;_dirChangeSubscription=H.EMPTY;_position;_previousPosition;_onCentering=new te;_beforeCentering=new te;_afterLeavingCenter=new te;_onCentered=new te(!0);_portalHost;_contentElement;_content;animationDuration="500ms";preserveContent=!1;set position(e){this._positionIndex=e,this._computePositionAnimationState()}constructor(){if(this._dir){let e=f(xt);this._dirChangeSubscription=this._dir.change.subscribe(r=>{this._computePositionAnimationState(r),e.markForCheck()})}}ngOnInit(){this._bindTransitionEvents(),this._position==="center"&&(this._setActiveClass(!0),ft(()=>this._onCentering.emit(this._elementRef.nativeElement.clientHeight),{injector:this._injector})),this._initialized=!0}ngOnDestroy(){clearTimeout(this._fallbackTimer),this._eventCleanups?.forEach(e=>e()),this._dirChangeSubscription.unsubscribe()}_bindTransitionEvents(){this._ngZone.runOutsideAngular(()=>{let e=this._elementRef.nativeElement,r=i=>{i.target===this._contentElement?.nativeElement&&(this._elementRef.nativeElement.classList.remove("mat-tab-body-animating"),i.type==="transitionend"&&this._transitionDone())};this._eventCleanups=[this._renderer.listen(e,"transitionstart",i=>{i.target===this._contentElement?.nativeElement&&(this._elementRef.nativeElement.classList.add("mat-tab-body-animating"),this._transitionStarted())}),this._renderer.listen(e,"transitionend",r),this._renderer.listen(e,"transitioncancel",r)]})}_transitionStarted(){clearTimeout(this._fallbackTimer);let e=this._position==="center";this._beforeCentering.emit(e),e&&this._onCentering.emit(this._elementRef.nativeElement.clientHeight)}_transitionDone(){this._position==="center"?this._onCentered.emit():this._previousPosition==="center"&&this._afterLeavingCenter.emit()}_setActiveClass(e){this._elementRef.nativeElement.classList.toggle("mat-mdc-tab-body-active",e)}_getLayoutDirection(){return this._dir&&this._dir.value==="rtl"?"rtl":"ltr"}_isCenterPosition(){return this._positionIndex===0}_computePositionAnimationState(e=this._getLayoutDirection()){this._previousPosition=this._position,this._positionIndex<0?this._position=e=="ltr"?"left":"right":this._positionIndex>0?this._position=e=="ltr"?"right":"left":this._position="center",this._animationsDisabled()?this._simulateTransitionEvents():this._initialized&&(this._position==="center"||this._previousPosition==="center")&&(clearTimeout(this._fallbackTimer),this._fallbackTimer=this._ngZone.runOutsideAngular(()=>setTimeout(()=>this._simulateTransitionEvents(),100)))}_simulateTransitionEvents(){this._transitionStarted(),ft(()=>this._transitionDone(),{injector:this._injector})}_animationsDisabled(){return this._diAnimationsDisabled||this.animationDuration==="0ms"||this.animationDuration==="0s"}static \u0275fac=function(r){return new(r||n)};static \u0275cmp=oe({type:n,selectors:[["mat-tab-body"]],viewQuery:function(r,i){if(r&1&&cn(rI,5)(RL,5),r&2){let o;xe(o=Re())&&(i._portalHost=o.first),xe(o=Re())&&(i._contentElement=o.first)}},hostAttrs:[1,"mat-mdc-tab-body"],hostVars:1,hostBindings:function(r,i){r&2&&ht("inert",i._position==="center"?null:"")},inputs:{_content:[0,"content","_content"],animationDuration:"animationDuration",preserveContent:"preserveContent",position:"position"},outputs:{_onCentering:"_onCentering",_beforeCentering:"_beforeCentering",_onCentered:"_onCentered"},decls:3,vars:6,consts:[["content",""],["cdkScrollable","",1,"mat-mdc-tab-body-content"],["matTabBodyHost",""]],template:function(r,i){r&1&&(b(0,"div",1,0),Dr(2,kL,0,0,"ng-template",2),D()),r&2&&je("mat-tab-body-content-left",i._position==="left")("mat-tab-body-content-right",i._position==="right")("mat-tab-body-content-can-animate",i._position==="center"||i._previousPosition==="center")},dependencies:[rI,dc],styles:[`.mat-mdc-tab-body {
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
`],encapsulation:2})}return n})(),aI=(()=>{class n{_elementRef=f(re);_changeDetectorRef=f(xt);_ngZone=f(j);_tabsSubscription=H.EMPTY;_tabLabelSubscription=H.EMPTY;_tabBodySubscription=H.EMPTY;_diAnimationsDisabled=$n();_allTabs;_tabBodies;_tabBodyWrapper;_tabHeader;_tabs=new Xn;_indexToSelect=0;_lastFocusedTabIndex=null;_tabBodyWrapperHeight=0;color;get fitInkBarToContent(){return this._fitInkBarToContent}set fitInkBarToContent(e){this._fitInkBarToContent=e,this._changeDetectorRef.markForCheck()}_fitInkBarToContent=!1;stretchTabs=!0;alignTabs=null;dynamicHeight=!1;get selectedIndex(){return this._selectedIndex}set selectedIndex(e){this._indexToSelect=isNaN(e)?null:e}_selectedIndex=null;headerPosition="above";get animationDuration(){return this._animationDuration}set animationDuration(e){let r=e+"";this._animationDuration=/^\d+$/.test(r)?e+"ms":r}_animationDuration;get contentTabIndex(){return this._contentTabIndex}set contentTabIndex(e){this._contentTabIndex=isNaN(e)?null:e}_contentTabIndex=null;disablePagination=!1;disableRipple=!1;preserveContent=!1;get backgroundColor(){return this._backgroundColor}set backgroundColor(e){let r=this._elementRef.nativeElement.classList;r.remove("mat-tabs-with-background",`mat-background-${this.backgroundColor}`),e&&r.add("mat-tabs-with-background",`mat-background-${e}`),this._backgroundColor=e}_backgroundColor;ariaLabel;ariaLabelledby;selectedIndexChange=new te;focusChange=new te;animationDone=new te;selectedTabChange=new te(!0);_groupId;_isServer=!f(Le).isBrowser;constructor(){let e=f(KL,{optional:!0});this._groupId=f(di).getId("mat-tab-group-"),this.animationDuration=e&&e.animationDuration?e.animationDuration:"500ms",this.disablePagination=e&&e.disablePagination!=null?e.disablePagination:!1,this.dynamicHeight=e&&e.dynamicHeight!=null?e.dynamicHeight:!1,e?.contentTabIndex!=null&&(this.contentTabIndex=e.contentTabIndex),this.preserveContent=!!e?.preserveContent,this.fitInkBarToContent=e&&e.fitInkBarToContent!=null?e.fitInkBarToContent:!1,this.stretchTabs=e&&e.stretchTabs!=null?e.stretchTabs:!0,this.alignTabs=e&&e.alignTabs!=null?e.alignTabs:null}ngAfterContentChecked(){let e=this._indexToSelect=this._clampTabIndex(this._indexToSelect);if(this._selectedIndex!=e){let r=this._selectedIndex==null;if(!r){this.selectedTabChange.emit(this._createChangeEvent(e));let i=this._tabBodyWrapper.nativeElement;i.style.minHeight=i.clientHeight+"px"}Promise.resolve().then(()=>{this._tabs.forEach((i,o)=>i.isActive=o===e),r||(this.selectedIndexChange.emit(e),this._tabBodyWrapper.nativeElement.style.minHeight="")})}this._tabs.forEach((r,i)=>{r.position=i-e,this._selectedIndex!=null&&r.position==0&&!r.origin&&(r.origin=e-this._selectedIndex)}),this._selectedIndex!==e&&(this._selectedIndex=e,this._lastFocusedTabIndex=null,this._changeDetectorRef.markForCheck())}ngAfterContentInit(){this._subscribeToAllTabChanges(),this._subscribeToTabLabels(),this._tabsSubscription=this._tabs.changes.subscribe(()=>{let e=this._clampTabIndex(this._indexToSelect);if(e===this._selectedIndex){let r=this._tabs.toArray(),i;for(let o=0;o<r.length;o++)if(r[o].isActive){this._indexToSelect=this._selectedIndex=o,this._lastFocusedTabIndex=null,i=r[o];break}!i&&r[e]&&Promise.resolve().then(()=>{r[e].isActive=!0,this.selectedTabChange.emit(this._createChangeEvent(e))})}this._changeDetectorRef.markForCheck()})}ngAfterViewInit(){this._tabBodySubscription=this._tabBodies.changes.subscribe(()=>this._bodyCentered(!0))}_subscribeToAllTabChanges(){this._allTabs.changes.pipe(Tt(this._allTabs)).subscribe(e=>{this._tabs.reset(e.filter(r=>r._closestTabGroup===this||!r._closestTabGroup)),this._tabs.notifyOnChanges()})}ngOnDestroy(){this._tabs.destroy(),this._tabsSubscription.unsubscribe(),this._tabLabelSubscription.unsubscribe(),this._tabBodySubscription.unsubscribe()}realignInkBar(){this._tabHeader&&this._tabHeader._alignInkBarToSelectedTab()}updatePagination(){this._tabHeader&&this._tabHeader.updatePagination()}focusTab(e){let r=this._tabHeader;r&&(r.focusIndex=e)}_focusChanged(e){this._lastFocusedTabIndex=e,this.focusChange.emit(this._createChangeEvent(e))}_createChangeEvent(e){let r=new sb;return r.index=e,this._tabs&&this._tabs.length&&(r.tab=this._tabs.toArray()[e]),r}_subscribeToTabLabels(){this._tabLabelSubscription&&this._tabLabelSubscription.unsubscribe(),this._tabLabelSubscription=Fr(...this._tabs.map(e=>e._stateChanges)).subscribe(()=>this._changeDetectorRef.markForCheck())}_clampTabIndex(e){return Math.min(this._tabs.length-1,Math.max(e||0,0))}_getTabLabelId(e,r){return e.id||`${this._groupId}-label-${r}`}_getTabContentId(e){return`${this._groupId}-content-${e}`}_setTabBodyWrapperHeight(e){if(!this.dynamicHeight||!this._tabBodyWrapperHeight){this._tabBodyWrapperHeight=e;return}let r=this._tabBodyWrapper.nativeElement;r.style.height=this._tabBodyWrapperHeight+"px",this._tabBodyWrapper.nativeElement.offsetHeight&&(r.style.height=e+"px")}_removeTabBodyWrapperHeight(){let e=this._tabBodyWrapper.nativeElement;this._tabBodyWrapperHeight=e.clientHeight,e.style.height="",this._ngZone.run(()=>this.animationDone.emit())}_handleClick(e,r,i){r.focusIndex=i,e.disabled||(this.selectedIndex=i)}_getTabIndex(e){let r=this._lastFocusedTabIndex??this.selectedIndex;return e===r?0:-1}_tabFocusChanged(e,r){e&&e!=="mouse"&&e!=="touch"&&(this._tabHeader.focusIndex=r)}_bodyCentered(e){e&&this._tabBodies?.forEach((r,i)=>r._setActiveClass(i===this._selectedIndex))}_animationsDisabled(){return this._diAnimationsDisabled||this.animationDuration==="0"||this.animationDuration==="0ms"}static \u0275fac=function(r){return new(r||n)};static \u0275cmp=oe({type:n,selectors:[["mat-tab-group"]],contentQueries:function(r,i,o){if(r&1&&Xr(o,db,5),r&2){let s;xe(s=Re())&&(i._allTabs=s)}},viewQuery:function(r,i){if(r&1&&cn(AL,5)(OL,5)(ob,5),r&2){let o;xe(o=Re())&&(i._tabBodyWrapper=o.first),xe(o=Re())&&(i._tabHeader=o.first),xe(o=Re())&&(i._tabBodies=o)}},hostAttrs:[1,"mat-mdc-tab-group"],hostVars:11,hostBindings:function(r,i){r&2&&(ht("mat-align-tabs",i.alignTabs),tr("mat-"+(i.color||"primary")),Ns("--mat-tab-animation-duration",i.animationDuration),je("mat-mdc-tab-group-dynamic-height",i.dynamicHeight)("mat-mdc-tab-group-inverted-header",i.headerPosition==="below")("mat-mdc-tab-group-stretch-tabs",i.stretchTabs))},inputs:{color:"color",fitInkBarToContent:[2,"fitInkBarToContent","fitInkBarToContent",we],stretchTabs:[2,"mat-stretch-tabs","stretchTabs",we],alignTabs:[0,"mat-align-tabs","alignTabs"],dynamicHeight:[2,"dynamicHeight","dynamicHeight",we],selectedIndex:[2,"selectedIndex","selectedIndex",Nd],headerPosition:"headerPosition",animationDuration:"animationDuration",contentTabIndex:[2,"contentTabIndex","contentTabIndex",Nd],disablePagination:[2,"disablePagination","disablePagination",we],disableRipple:[2,"disableRipple","disableRipple",we],preserveContent:[2,"preserveContent","preserveContent",we],backgroundColor:"backgroundColor",ariaLabel:[0,"aria-label","ariaLabel"],ariaLabelledby:[0,"aria-labelledby","ariaLabelledby"]},outputs:{selectedIndexChange:"selectedIndexChange",focusChange:"focusChange",animationDone:"animationDone",selectedTabChange:"selectedTabChange"},exportAs:["matTabGroup"],features:[Mn([{provide:oI,useExisting:n}])],ngContentSelectors:cb,decls:9,vars:8,consts:[["tabHeader",""],["tabBodyWrapper",""],["tabNode",""],[3,"indexFocused","selectFocusedIndex","selectedIndex","disableRipple","disablePagination","aria-label","aria-labelledby"],["role","tab","matTabLabelWrapper","","cdkMonitorElementFocus","",1,"mdc-tab","mat-mdc-tab","mat-focus-indicator",3,"id","mdc-tab--active","class","disabled","fitInkBarToContent"],[1,"mat-mdc-tab-body-wrapper"],["role","tabpanel",3,"id","class","content","position","animationDuration","preserveContent"],["role","tab","matTabLabelWrapper","","cdkMonitorElementFocus","",1,"mdc-tab","mat-mdc-tab","mat-focus-indicator",3,"click","cdkFocusChange","id","disabled","fitInkBarToContent"],[1,"mdc-tab__ripple"],["mat-ripple","",1,"mat-mdc-tab-ripple",3,"matRippleTrigger","matRippleDisabled"],[1,"mdc-tab__content"],[1,"mdc-tab__text-label"],[3,"cdkPortalOutlet"],["role","tabpanel",3,"_onCentered","_onCentering","_beforeCentering","id","content","position","animationDuration","preserveContent"]],template:function(r,i){r&1&&(Er(),b(0,"mat-tab-header",3,0),Ee("indexFocused",function(s){return i._focusChanged(s)})("selectFocusedIndex",function(s){return i.selectedIndex=s}),wd(2,FL,8,17,"div",4,Ed),D(),Xe(4,BL,1,0),b(5,"div",5,1),wd(7,jL,1,10,"mat-tab-body",6,Ed),D()),r&2&&(Je("selectedIndex",i.selectedIndex||0)("disableRipple",i.disableRipple)("disablePagination",i.disablePagination),Dd("aria-label",i.ariaLabel)("aria-labelledby",i.ariaLabelledby),R(2),Td(i._tabs),R(2),Qe(i._isServer?4:-1),R(),je("_mat-animation-noopable",i._animationsDisabled()),R(2),Td(i._tabs))},dependencies:[qL,sI,Bv,hc,Ov,ob],styles:[`.mdc-tab {
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
`],encapsulation:2})}return n})(),sb=class{index;tab};var lI=(()=>{class n{static \u0275fac=function(r){return new(r||n)};static \u0275mod=Me({type:n});static \u0275inj=De({imports:[gn]})}return n})();var cI=th();function gI(n){return new oh(n.get(Ar),n.get(Z))}var oh=class{_viewportRuler;_previousHTMLStyles={top:"",left:""};_previousScrollPosition;_isEnabled=!1;_document;constructor(t,e){this._viewportRuler=t,this._document=e}attach(){}enable(){if(this._canBeEnabled()){let t=this._document.documentElement;this._previousScrollPosition=this._viewportRuler.getViewportScrollPosition(),this._previousHTMLStyles.left=t.style.left||"",this._previousHTMLStyles.top=t.style.top||"",t.style.left=et(-this._previousScrollPosition.left),t.style.top=et(-this._previousScrollPosition.top),t.classList.add("cdk-global-scrollblock"),this._isEnabled=!0}}disable(){if(this._isEnabled){let t=this._document.documentElement,e=this._document.body,r=t.style,i=e.style,o=r.scrollBehavior||"",s=i.scrollBehavior||"";this._isEnabled=!1,r.left=this._previousHTMLStyles.left,r.top=this._previousHTMLStyles.top,t.classList.remove("cdk-global-scrollblock"),cI&&(r.scrollBehavior=i.scrollBehavior="auto"),window.scroll(this._previousScrollPosition.left,this._previousScrollPosition.top),cI&&(r.scrollBehavior=o,i.scrollBehavior=s)}}_canBeEnabled(){if(this._document.documentElement.classList.contains("cdk-global-scrollblock")||this._isEnabled)return!1;let e=this._document.documentElement,r=this._viewportRuler.getViewportSize();return e.scrollHeight>r.height||e.scrollWidth>r.width}};function yI(n,t){return new sh(n.get(Wi),n.get(j),n.get(Ar),t)}var sh=class{_scrollDispatcher;_ngZone;_viewportRuler;_config;_scrollSubscription=null;_overlayRef;_initialScrollPosition;constructor(t,e,r,i){this._scrollDispatcher=t,this._ngZone=e,this._viewportRuler=r,this._config=i}attach(t){this._overlayRef,this._overlayRef=t}enable(){if(this._scrollSubscription)return;let t=this._scrollDispatcher.scrolled(0).pipe(ye(e=>!e||!this._overlayRef.overlayElement.contains(e.getElementRef().nativeElement)));this._config&&this._config.threshold&&this._config.threshold>1?(this._initialScrollPosition=this._viewportRuler.getViewportScrollPosition().top,this._scrollSubscription=t.subscribe(()=>{let e=this._viewportRuler.getViewportScrollPosition().top;Math.abs(e-this._initialScrollPosition)>this._config.threshold?this._detach():this._overlayRef.updatePosition()})):this._scrollSubscription=t.subscribe(this._detach)}disable(){this._scrollSubscription&&(this._scrollSubscription.unsubscribe(),this._scrollSubscription=null)}detach(){this.disable(),this._overlayRef=null}_detach=()=>{this.disable(),this._overlayRef.hasAttached()&&this._ngZone.run(()=>this._overlayRef.detach())}};var pc=class{enable(){}disable(){}attach(){}};function fb(n,t){return t.some(e=>{let r=n.bottom<e.top,i=n.top>e.bottom,o=n.right<e.left,s=n.left>e.right;return r||i||o||s})}function uI(n,t){return t.some(e=>{let r=n.top<e.top,i=n.bottom>e.bottom,o=n.left<e.left,s=n.right>e.right;return r||i||o||s})}function da(n,t){return new ah(n.get(Wi),n.get(Ar),n.get(j),t)}var ah=class{_scrollDispatcher;_viewportRuler;_ngZone;_config;_scrollSubscription=null;_overlayRef;constructor(t,e,r,i){this._scrollDispatcher=t,this._viewportRuler=e,this._ngZone=r,this._config=i}attach(t){this._overlayRef,this._overlayRef=t}enable(){if(!this._scrollSubscription){let t=this._config?this._config.scrollThrottle:0;this._scrollSubscription=this._scrollDispatcher.scrolled(t).subscribe(()=>{if(this._overlayRef.updatePosition(),this._config&&this._config.autoClose){let e=this._overlayRef.overlayElement.getBoundingClientRect(),{width:r,height:i}=this._viewportRuler.getViewportSize();fb(e,[{width:r,height:i,bottom:i,right:r,top:0,left:0}])&&(this.disable(),this._ngZone.run(()=>this._overlayRef.detach()))}})}}disable(){this._scrollSubscription&&(this._scrollSubscription.unsubscribe(),this._scrollSubscription=null)}detach(){this.disable(),this._overlayRef=null}},vI=(()=>{class n{_injector=f(ne);constructor(){}noop=()=>new pc;close=e=>yI(this._injector,e);block=()=>gI(this._injector);reposition=e=>da(this._injector,e);static \u0275fac=function(r){return new(r||n)};static \u0275prov=y({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})(),ua=class{positionStrategy;scrollStrategy=new pc;panelClass="";hasBackdrop=!1;backdropClass="cdk-overlay-dark-backdrop";disableAnimations;width;height;minWidth;minHeight;maxWidth;maxHeight;direction;disposeOnNavigation=!1;usePopover;eventPredicate;constructor(t){if(t){let e=Object.keys(t);for(let r of e)t[r]!==void 0&&(this[r]=t[r])}}};var lh=class{connectionPair;scrollableViewProperties;constructor(t,e){this.connectionPair=t,this.scrollableViewProperties=e}};var bI=(()=>{class n{_attachedOverlays=[];_document=f(Z);_isAttached=!1;constructor(){}ngOnDestroy(){this.detach()}add(e){this.remove(e),this._attachedOverlays.push(e)}remove(e){let r=this._attachedOverlays.indexOf(e);r>-1&&this._attachedOverlays.splice(r,1),this._attachedOverlays.length===0&&this.detach()}canReceiveEvent(e,r,i){return i.observers.length<1?!1:e.eventPredicate?e.eventPredicate(r):!0}static \u0275fac=function(r){return new(r||n)};static \u0275prov=y({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})(),_I=(()=>{class n extends bI{_ngZone=f(j);_renderer=f(It).createRenderer(null,null);_cleanupKeydown;add(e){super.add(e),this._isAttached||(this._ngZone.runOutsideAngular(()=>{this._cleanupKeydown=this._renderer.listen("body","keydown",this._keydownListener)}),this._isAttached=!0)}detach(){this._isAttached&&(this._cleanupKeydown?.(),this._isAttached=!1)}_keydownListener=e=>{let r=this._attachedOverlays;for(let i=r.length-1;i>-1;i--){let o=r[i];if(this.canReceiveEvent(o,e,o._keydownEvents)){this._ngZone.run(()=>o._keydownEvents.next(e));break}}};static \u0275fac=(()=>{let e;return function(i){return(e||(e=Sn(n)))(i||n)}})();static \u0275prov=y({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})(),CI=(()=>{class n extends bI{_platform=f(Le);_ngZone=f(j);_renderer=f(It).createRenderer(null,null);_cursorOriginalValue;_cursorStyleIsSet=!1;_pointerDownEventTarget=null;_cleanups;add(e){if(super.add(e),!this._isAttached){let r=this._document.body,i={capture:!0},o=this._renderer;this._cleanups=this._ngZone.runOutsideAngular(()=>[o.listen(r,"pointerdown",this._pointerDownListener,i),o.listen(r,"click",this._clickListener,i),o.listen(r,"auxclick",this._clickListener,i),o.listen(r,"contextmenu",this._clickListener,i)]),this._platform.IOS&&!this._cursorStyleIsSet&&(this._cursorOriginalValue=r.style.cursor,r.style.cursor="pointer",this._cursorStyleIsSet=!0),this._isAttached=!0}}detach(){this._isAttached&&(this._cleanups?.forEach(e=>e()),this._cleanups=void 0,this._platform.IOS&&this._cursorStyleIsSet&&(this._document.body.style.cursor=this._cursorOriginalValue,this._cursorStyleIsSet=!1),this._isAttached=!1)}_pointerDownListener=e=>{this._pointerDownEventTarget=jn(e)};_clickListener=e=>{let r=jn(e),i=e.type==="click"&&this._pointerDownEventTarget?this._pointerDownEventTarget:r;this._pointerDownEventTarget=null;let o=this._attachedOverlays.slice();for(let s=o.length-1;s>-1;s--){let a=o[s],l=a._outsidePointerEvents;if(!(!a.hasAttached()||!this.canReceiveEvent(a,e,l))){if(dI(a.overlayElement,r)||dI(a.overlayElement,i))break;this._ngZone?this._ngZone.run(()=>l.next(e)):l.next(e)}}};static \u0275fac=(()=>{let e;return function(i){return(e||(e=Sn(n)))(i||n)}})();static \u0275prov=y({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})();function dI(n,t){let e=typeof ShadowRoot<"u"&&ShadowRoot,r=t;for(;r;){if(r===n)return!0;r=e&&r instanceof ShadowRoot?r.host:r.parentNode}return!1}var DI=(()=>{class n{static \u0275fac=function(r){return new(r||n)};static \u0275cmp=oe({type:n,selectors:[["ng-component"]],hostAttrs:["cdk-overlay-style-loader",""],decls:0,vars:0,template:function(r,i){},styles:[`.cdk-overlay-container, .cdk-global-overlay-wrapper {
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
`],encapsulation:2,changeDetection:0})}return n})(),EI=(()=>{class n{_platform=f(Le);_containerElement;_document=f(Z);_styleLoader=f(Bn);constructor(){}ngOnDestroy(){this._containerElement?.remove()}getContainerElement(){return this._loadStyles(),this._containerElement||this._createContainer(),this._containerElement}_createContainer(){let e="cdk-overlay-container";if(this._platform.isBrowser||Kv()){let i=this._document.querySelectorAll(`.${e}[platform="server"], .${e}[platform="test"]`);for(let o=0;o<i.length;o++)i[o].remove()}let r=this._document.createElement("div");r.classList.add(e),Kv()?r.setAttribute("platform","test"):this._platform.isBrowser||r.setAttribute("platform","server"),this._document.body.appendChild(r),this._containerElement=r}_loadStyles(){this._styleLoader.load(DI)}static \u0275fac=function(r){return new(r||n)};static \u0275prov=y({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})(),hb=class{_renderer;_ngZone;element;_cleanupClick;_cleanupTransitionEnd;_fallbackTimeout;constructor(t,e,r,i){this._renderer=e,this._ngZone=r,this.element=t.createElement("div"),this.element.classList.add("cdk-overlay-backdrop"),this._cleanupClick=e.listen(this.element,"click",i)}detach(){this._ngZone.runOutsideAngular(()=>{let t=this.element;clearTimeout(this._fallbackTimeout),this._cleanupTransitionEnd?.(),this._cleanupTransitionEnd=this._renderer.listen(t,"transitionend",this.dispose),this._fallbackTimeout=setTimeout(this.dispose,500),t.style.pointerEvents="none",t.classList.remove("cdk-overlay-backdrop-showing")})}dispose=()=>{clearTimeout(this._fallbackTimeout),this._cleanupClick?.(),this._cleanupTransitionEnd?.(),this._cleanupClick=this._cleanupTransitionEnd=this._fallbackTimeout=void 0,this.element.remove()}};function pb(n){return n&&n.nodeType===1}var ch=class{_portalOutlet;_host;_pane;_config;_ngZone;_keyboardDispatcher;_document;_location;_outsideClickDispatcher;_animationsDisabled;_injector;_renderer;_backdropClick=new C;_attachments=new C;_detachments=new C;_positionStrategy;_scrollStrategy;_locationChanges=H.EMPTY;_backdropRef=null;_detachContentMutationObserver;_detachContentAfterRenderRef;_disposed=!1;_previousHostParent;_keydownEvents=new C;_outsidePointerEvents=new C;_afterNextRenderRef;constructor(t,e,r,i,o,s,a,l,c,u=!1,d,h){this._portalOutlet=t,this._host=e,this._pane=r,this._config=i,this._ngZone=o,this._keyboardDispatcher=s,this._document=a,this._location=l,this._outsideClickDispatcher=c,this._animationsDisabled=u,this._injector=d,this._renderer=h,i.scrollStrategy&&(this._scrollStrategy=i.scrollStrategy,this._scrollStrategy.attach(this)),this._positionStrategy=i.positionStrategy}get overlayElement(){return this._pane}get backdropElement(){return this._backdropRef?.element||null}get hostElement(){return this._host}get eventPredicate(){return this._config?.eventPredicate||null}attach(t){if(this._disposed)return null;this._attachHost();let e=this._portalOutlet.attach(t);return this._positionStrategy?.attach(this),this._updateStackingOrder(),this._updateElementSize(),this._updateElementDirection(),this._scrollStrategy&&this._scrollStrategy.enable(),this._afterNextRenderRef?.destroy(),this._afterNextRenderRef=ft(()=>{this.hasAttached()&&this.updatePosition()},{injector:this._injector}),this._togglePointerEvents(!0),this._config.hasBackdrop&&this._attachBackdrop(),this._config.panelClass&&this._toggleClasses(this._pane,this._config.panelClass,!0),this._attachments.next(),this._completeDetachContent(),this._keyboardDispatcher.add(this),this._config.disposeOnNavigation&&(this._locationChanges=this._location.subscribe(()=>this.dispose())),this._outsideClickDispatcher.add(this),typeof e?.onDestroy=="function"&&e.onDestroy(()=>{this.hasAttached()&&this._ngZone.runOutsideAngular(()=>Promise.resolve().then(()=>this.detach()))}),e}detach(){if(!this.hasAttached())return;this.detachBackdrop(),this._togglePointerEvents(!1),this._positionStrategy&&this._positionStrategy.detach&&this._positionStrategy.detach(),this._scrollStrategy&&this._scrollStrategy.disable();let t=this._portalOutlet.detach();return this._detachments.next(),this._completeDetachContent(),this._keyboardDispatcher.remove(this),this._detachContentWhenEmpty(),this._locationChanges.unsubscribe(),this._outsideClickDispatcher.remove(this),t}dispose(){if(this._disposed)return;let t=this.hasAttached();this._positionStrategy&&this._positionStrategy.dispose(),this._disposeScrollStrategy(),this._backdropRef?.dispose(),this._locationChanges.unsubscribe(),this._keyboardDispatcher.remove(this),this._portalOutlet.dispose(),this._attachments.complete(),this._backdropClick.complete(),this._keydownEvents.complete(),this._outsidePointerEvents.complete(),this._outsideClickDispatcher.remove(this),this._host?.remove(),this._afterNextRenderRef?.destroy(),this._previousHostParent=this._pane=this._host=this._backdropRef=null,t&&this._detachments.next(),this._detachments.complete(),this._completeDetachContent(),this._disposed=!0}hasAttached(){return this._portalOutlet.hasAttached()}backdropClick(){return this._backdropClick}attachments(){return this._attachments}detachments(){return this._detachments}keydownEvents(){return this._keydownEvents}outsidePointerEvents(){return this._outsidePointerEvents}getConfig(){return this._config}updatePosition(){this._positionStrategy&&this._positionStrategy.apply()}updatePositionStrategy(t){t!==this._positionStrategy&&(this._positionStrategy&&this._positionStrategy.dispose(),this._positionStrategy=t,this.hasAttached()&&(t.attach(this),this.updatePosition()))}updateSize(t){this._config=g(g({},this._config),t),this._updateElementSize()}setDirection(t){this._config=W(g({},this._config),{direction:t}),this._updateElementDirection()}addPanelClass(t){this._pane&&this._toggleClasses(this._pane,t,!0)}removePanelClass(t){this._pane&&this._toggleClasses(this._pane,t,!1)}getDirection(){let t=this._config.direction;return t?typeof t=="string"?t:t.value:"ltr"}updateScrollStrategy(t){t!==this._scrollStrategy&&(this._disposeScrollStrategy(),this._scrollStrategy=t,this.hasAttached()&&(t.attach(this),t.enable()))}_updateElementDirection(){this._host.setAttribute("dir",this.getDirection())}_updateElementSize(){if(!this._pane)return;let t=this._pane.style;t.width=et(this._config.width),t.height=et(this._config.height),t.minWidth=et(this._config.minWidth),t.minHeight=et(this._config.minHeight),t.maxWidth=et(this._config.maxWidth),t.maxHeight=et(this._config.maxHeight)}_togglePointerEvents(t){this._pane.style.pointerEvents=t?"":"none"}_attachHost(){if(!this._host.parentElement){let t=this._config.usePopover?this._positionStrategy?.getPopoverInsertionPoint?.():null;pb(t)?t.after(this._host):t?.type==="parent"?t.element.appendChild(this._host):this._previousHostParent?.appendChild(this._host)}if(this._config.usePopover)try{this._host.showPopover()}catch{}}_attachBackdrop(){let t="cdk-overlay-backdrop-showing";this._backdropRef?.dispose(),this._backdropRef=new hb(this._document,this._renderer,this._ngZone,e=>{this._backdropClick.next(e)}),this._animationsDisabled&&this._backdropRef.element.classList.add("cdk-overlay-backdrop-noop-animation"),this._config.backdropClass&&this._toggleClasses(this._backdropRef.element,this._config.backdropClass,!0),this._config.usePopover?this._host.prepend(this._backdropRef.element):this._host.parentElement.insertBefore(this._backdropRef.element,this._host),!this._animationsDisabled&&typeof requestAnimationFrame<"u"?this._ngZone.runOutsideAngular(()=>{requestAnimationFrame(()=>this._backdropRef?.element.classList.add(t))}):this._backdropRef.element.classList.add(t)}_updateStackingOrder(){!this._config.usePopover&&this._host.nextSibling&&this._host.parentNode.appendChild(this._host)}detachBackdrop(){this._animationsDisabled?(this._backdropRef?.dispose(),this._backdropRef=null):this._backdropRef?.detach()}_toggleClasses(t,e,r){let i=aa(e||[]).filter(o=>!!o);i.length&&(r?t.classList.add(...i):t.classList.remove(...i))}_detachContentWhenEmpty(){let t=!1;try{this._detachContentAfterRenderRef=ft(()=>{t=!0,this._detachContent()},{injector:this._injector})}catch(e){if(t)throw e;this._detachContent()}globalThis.MutationObserver&&this._pane&&(this._detachContentMutationObserver||=new globalThis.MutationObserver(()=>{this._detachContent()}),this._detachContentMutationObserver.observe(this._pane,{childList:!0}))}_detachContent(){(!this._pane||!this._host||this._pane.children.length===0)&&(this._pane&&this._config.panelClass&&this._toggleClasses(this._pane,this._config.panelClass,!1),this._host&&this._host.parentElement&&(this._previousHostParent=this._host.parentElement,this._host.remove()),this._completeDetachContent())}_completeDetachContent(){this._detachContentAfterRenderRef?.destroy(),this._detachContentAfterRenderRef=void 0,this._detachContentMutationObserver?.disconnect()}_disposeScrollStrategy(){let t=this._scrollStrategy;t?.disable(),t?.detach?.()}},fI="cdk-overlay-connected-position-bounding-box",ZL=/([A-Za-z%]+)$/;function fa(n,t){return new uh(t,n.get(Ar),n.get(Z),n.get(Le),n.get(EI))}var uh=class{_viewportRuler;_document;_platform;_overlayContainer;_overlayRef;_isInitialRender=!1;_lastBoundingBoxSize={width:0,height:0};_isPushed=!1;_canPush=!0;_growAfterOpen=!1;_hasFlexibleDimensions=!0;_positionLocked=!1;_originRect;_overlayRect;_viewportRect;_containerRect;_viewportMargin=0;_scrollables=[];_preferredPositions=[];_origin;_pane;_isDisposed=!1;_boundingBox=null;_lastPosition=null;_lastScrollVisibility=null;_positionChanges=new C;_resizeSubscription=H.EMPTY;_offsetX=0;_offsetY=0;_transformOriginSelector;_appliedPanelClasses=[];_previousPushAmount=null;_popoverLocation="global";positionChanges=this._positionChanges;get positions(){return this._preferredPositions}constructor(t,e,r,i,o){this._viewportRuler=e,this._document=r,this._platform=i,this._overlayContainer=o,this.setOrigin(t)}attach(t){this._overlayRef&&this._overlayRef,this._validatePositions(),t.hostElement.classList.add(fI),this._overlayRef=t,this._boundingBox=t.hostElement,this._pane=t.overlayElement,this._isDisposed=!1,this._isInitialRender=!0,this._lastPosition=null,this._resizeSubscription.unsubscribe(),this._resizeSubscription=this._viewportRuler.change().subscribe(()=>{this._isInitialRender=!0,this.apply()})}apply(){if(this._isDisposed||!this._platform.isBrowser)return;if(!this._isInitialRender&&this._positionLocked&&this._lastPosition){this.reapplyLastPosition();return}this._clearPanelClasses(),this._resetOverlayElementStyles(),this._resetBoundingBoxStyles(),this._viewportRect=this._getNarrowedViewportRect(),this._originRect=this._getOriginRect(),this._overlayRect=this._pane.getBoundingClientRect(),this._containerRect=this._getContainerRect();let t=this._originRect,e=this._overlayRect,r=this._viewportRect,i=this._containerRect,o=[],s;for(let a of this._preferredPositions){let l=this._getOriginPoint(t,i,a),c=this._getOverlayPoint(l,e,a),u=this._getOverlayFit(c,e,r,a);if(u.isCompletelyWithinViewport){this._isPushed=!1,this._applyPosition(a,l);return}if(this._canFitWithFlexibleDimensions(u,c,r)){o.push({position:a,origin:l,overlayRect:e,boundingBoxRect:this._calculateBoundingBoxRect(l,a)});continue}(!s||s.overlayFit.visibleArea<u.visibleArea)&&(s={overlayFit:u,overlayPoint:c,originPoint:l,position:a,overlayRect:e})}if(o.length){let a=null,l=-1;for(let c of o){let u=c.boundingBoxRect.width*c.boundingBoxRect.height*(c.position.weight||1);u>l&&(l=u,a=c)}this._isPushed=!1,this._applyPosition(a.position,a.origin);return}if(this._canPush){this._isPushed=!0,this._applyPosition(s.position,s.originPoint);return}this._applyPosition(s.position,s.originPoint)}detach(){this._clearPanelClasses(),this._lastPosition=null,this._previousPushAmount=null,this._resizeSubscription.unsubscribe()}dispose(){this._isDisposed||(this._boundingBox&&Yo(this._boundingBox.style,{top:"",left:"",right:"",bottom:"",height:"",width:"",alignItems:"",justifyContent:""}),this._pane&&this._resetOverlayElementStyles(),this._overlayRef&&this._overlayRef.hostElement.classList.remove(fI),this.detach(),this._positionChanges.complete(),this._overlayRef=this._boundingBox=null,this._isDisposed=!0)}reapplyLastPosition(){if(this._isDisposed||!this._platform.isBrowser)return;let t=this._lastPosition;t?(this._originRect=this._getOriginRect(),this._overlayRect=this._pane.getBoundingClientRect(),this._viewportRect=this._getNarrowedViewportRect(),this._containerRect=this._getContainerRect(),this._applyPosition(t,this._getOriginPoint(this._originRect,this._containerRect,t))):this.apply()}withScrollableContainers(t){return this._scrollables=t,this}withPositions(t){return this._preferredPositions=t,t.indexOf(this._lastPosition)===-1&&(this._lastPosition=null),this._validatePositions(),this}withViewportMargin(t){return this._viewportMargin=t,this}withFlexibleDimensions(t=!0){return this._hasFlexibleDimensions=t,this}withGrowAfterOpen(t=!0){return this._growAfterOpen=t,this}withPush(t=!0){return this._canPush=t,this}withLockedPosition(t=!0){return this._positionLocked=t,this}setOrigin(t){return this._origin=t,this}withDefaultOffsetX(t){return this._offsetX=t,this}withDefaultOffsetY(t){return this._offsetY=t,this}withTransformOriginOn(t){return this._transformOriginSelector=t,this}withPopoverLocation(t){return this._popoverLocation=t,this}getPopoverInsertionPoint(){return this._popoverLocation==="global"?null:this._popoverLocation!=="inline"?this._popoverLocation:this._origin instanceof re?this._origin.nativeElement:pb(this._origin)?this._origin:null}_getOriginPoint(t,e,r){let i;if(r.originX=="center")i=t.left+t.width/2;else{let s=this._isRtl()?t.right:t.left,a=this._isRtl()?t.left:t.right;i=r.originX=="start"?s:a}e.left<0&&(i-=e.left);let o;return r.originY=="center"?o=t.top+t.height/2:o=r.originY=="top"?t.top:t.bottom,e.top<0&&(o-=e.top),{x:i,y:o}}_getOverlayPoint(t,e,r){let i;r.overlayX=="center"?i=-e.width/2:r.overlayX==="start"?i=this._isRtl()?-e.width:0:i=this._isRtl()?0:-e.width;let o;return r.overlayY=="center"?o=-e.height/2:o=r.overlayY=="top"?0:-e.height,{x:t.x+i,y:t.y+o}}_getOverlayFit(t,e,r,i){let o=pI(e),{x:s,y:a}=t,l=this._getOffset(i,"x"),c=this._getOffset(i,"y");l&&(s+=l),c&&(a+=c);let u=0-s,d=s+o.width-r.width,h=0-a,p=a+o.height-r.height,m=this._subtractOverflows(o.width,u,d),_=this._subtractOverflows(o.height,h,p),M=m*_;return{visibleArea:M,isCompletelyWithinViewport:o.width*o.height===M,fitsInViewportVertically:_===o.height,fitsInViewportHorizontally:m==o.width}}_canFitWithFlexibleDimensions(t,e,r){if(this._hasFlexibleDimensions){let i=r.bottom-e.y,o=r.right-e.x,s=hI(this._overlayRef.getConfig().minHeight),a=hI(this._overlayRef.getConfig().minWidth),l=t.fitsInViewportVertically||s!=null&&s<=i,c=t.fitsInViewportHorizontally||a!=null&&a<=o;return l&&c}return!1}_pushOverlayOnScreen(t,e,r){if(this._previousPushAmount&&this._positionLocked)return{x:t.x+this._previousPushAmount.x,y:t.y+this._previousPushAmount.y};let i=pI(e),o=this._viewportRect,s=Math.max(t.x+i.width-o.width,0),a=Math.max(t.y+i.height-o.height,0),l=Math.max(o.top-r.top-t.y,0),c=Math.max(o.left-r.left-t.x,0),u=0,d=0;return i.width<=o.width?u=c||-s:u=t.x<this._getViewportMarginStart()?o.left-r.left-t.x:0,i.height<=o.height?d=l||-a:d=t.y<this._getViewportMarginTop()?o.top-r.top-t.y:0,this._previousPushAmount={x:u,y:d},{x:t.x+u,y:t.y+d}}_applyPosition(t,e){if(this._setTransformOrigin(t),this._setOverlayElementStyles(e,t),this._setBoundingBoxStyles(e,t),t.panelClass&&this._addPanelClasses(t.panelClass),this._positionChanges.observers.length){let r=this._getScrollVisibility();if(t!==this._lastPosition||!this._lastScrollVisibility||!XL(this._lastScrollVisibility,r)){let i=new lh(t,r);this._positionChanges.next(i)}this._lastScrollVisibility=r}this._lastPosition=t,this._isInitialRender=!1}_setTransformOrigin(t){if(!this._transformOriginSelector)return;let e=this._boundingBox.querySelectorAll(this._transformOriginSelector),r,i=t.overlayY;t.overlayX==="center"?r="center":this._isRtl()?r=t.overlayX==="start"?"right":"left":r=t.overlayX==="start"?"left":"right";for(let o=0;o<e.length;o++)e[o].style.transformOrigin=`${r} ${i}`}_calculateBoundingBoxRect(t,e){let r=this._viewportRect,i=this._isRtl(),o,s,a;if(e.overlayY==="top")s=t.y,o=r.height-s+this._getViewportMarginBottom();else if(e.overlayY==="bottom")a=r.height-t.y+this._getViewportMarginTop()+this._getViewportMarginBottom(),o=r.height-a+this._getViewportMarginTop();else{let p=Math.min(r.bottom-t.y+r.top,t.y),m=this._lastBoundingBoxSize.height;o=p*2,s=t.y-p,o>m&&!this._isInitialRender&&!this._growAfterOpen&&(s=t.y-m/2)}let l=e.overlayX==="start"&&!i||e.overlayX==="end"&&i,c=e.overlayX==="end"&&!i||e.overlayX==="start"&&i,u,d,h;if(c)h=r.width-t.x+this._getViewportMarginStart()+this._getViewportMarginEnd(),u=t.x-this._getViewportMarginStart();else if(l)d=t.x,u=r.right-t.x-this._getViewportMarginEnd();else{let p=Math.min(r.right-t.x+r.left,t.x),m=this._lastBoundingBoxSize.width;u=p*2,d=t.x-p,u>m&&!this._isInitialRender&&!this._growAfterOpen&&(d=t.x-m/2)}return{top:s,left:d,bottom:a,right:h,width:u,height:o}}_setBoundingBoxStyles(t,e){let r=this._calculateBoundingBoxRect(t,e);!this._isInitialRender&&!this._growAfterOpen&&(r.height=Math.min(r.height,this._lastBoundingBoxSize.height),r.width=Math.min(r.width,this._lastBoundingBoxSize.width));let i={};if(this._hasExactPosition())i.top=i.left="0",i.bottom=i.right="auto",i.maxHeight=i.maxWidth="",i.width=i.height="100%";else{let o=this._overlayRef.getConfig().maxHeight,s=this._overlayRef.getConfig().maxWidth;i.width=et(r.width),i.height=et(r.height),i.top=et(r.top)||"auto",i.bottom=et(r.bottom)||"auto",i.left=et(r.left)||"auto",i.right=et(r.right)||"auto",e.overlayX==="center"?i.alignItems="center":i.alignItems=e.overlayX==="end"?"flex-end":"flex-start",e.overlayY==="center"?i.justifyContent="center":i.justifyContent=e.overlayY==="bottom"?"flex-end":"flex-start",o&&(i.maxHeight=et(o)),s&&(i.maxWidth=et(s))}this._lastBoundingBoxSize=r,Yo(this._boundingBox.style,i)}_resetBoundingBoxStyles(){Yo(this._boundingBox.style,{top:"0",left:"0",right:"0",bottom:"0",height:"",width:"",alignItems:"",justifyContent:""})}_resetOverlayElementStyles(){Yo(this._pane.style,{top:"",left:"",bottom:"",right:"",position:"",transform:""})}_setOverlayElementStyles(t,e){let r={},i=this._hasExactPosition(),o=this._hasFlexibleDimensions,s=this._overlayRef.getConfig();if(i){let u=this._viewportRuler.getViewportScrollPosition();Yo(r,this._getExactOverlayY(e,t,u)),Yo(r,this._getExactOverlayX(e,t,u))}else r.position="static";let a="",l=this._getOffset(e,"x"),c=this._getOffset(e,"y");l&&(a+=`translateX(${l}px) `),c&&(a+=`translateY(${c}px)`),r.transform=a.trim(),s.maxHeight&&(i?r.maxHeight=et(s.maxHeight):o&&(r.maxHeight="")),s.maxWidth&&(i?r.maxWidth=et(s.maxWidth):o&&(r.maxWidth="")),Yo(this._pane.style,r)}_getExactOverlayY(t,e,r){let i={top:"",bottom:""},o=this._getOverlayPoint(e,this._overlayRect,t);if(this._isPushed&&(o=this._pushOverlayOnScreen(o,this._overlayRect,r)),t.overlayY==="bottom"){let s=this._document.documentElement.clientHeight;i.bottom=`${s-(o.y+this._overlayRect.height)}px`}else i.top=et(o.y);return i}_getExactOverlayX(t,e,r){let i={left:"",right:""},o=this._getOverlayPoint(e,this._overlayRect,t);this._isPushed&&(o=this._pushOverlayOnScreen(o,this._overlayRect,r));let s;if(this._isRtl()?s=t.overlayX==="end"?"left":"right":s=t.overlayX==="end"?"right":"left",s==="right"){let a=this._document.documentElement.clientWidth;i.right=`${a-(o.x+this._overlayRect.width)}px`}else i.left=et(o.x);return i}_getScrollVisibility(){let t=this._getOriginRect(),e=this._pane.getBoundingClientRect(),r=this._scrollables.map(i=>i.getElementRef().nativeElement.getBoundingClientRect());return{isOriginClipped:uI(t,r),isOriginOutsideView:fb(t,r),isOverlayClipped:uI(e,r),isOverlayOutsideView:fb(e,r)}}_subtractOverflows(t,...e){return e.reduce((r,i)=>r-Math.max(i,0),t)}_getNarrowedViewportRect(){let t=this._document.documentElement.clientWidth,e=this._document.documentElement.clientHeight,r=this._viewportRuler.getViewportScrollPosition();return{top:r.top+this._getViewportMarginTop(),left:r.left+this._getViewportMarginStart(),right:r.left+t-this._getViewportMarginEnd(),bottom:r.top+e-this._getViewportMarginBottom(),width:t-this._getViewportMarginStart()-this._getViewportMarginEnd(),height:e-this._getViewportMarginTop()-this._getViewportMarginBottom()}}_isRtl(){return this._overlayRef.getDirection()==="rtl"}_hasExactPosition(){return!this._hasFlexibleDimensions||this._isPushed}_getOffset(t,e){return e==="x"?t.offsetX==null?this._offsetX:t.offsetX:t.offsetY==null?this._offsetY:t.offsetY}_validatePositions(){}_addPanelClasses(t){this._pane&&aa(t).forEach(e=>{e!==""&&this._appliedPanelClasses.indexOf(e)===-1&&(this._appliedPanelClasses.push(e),this._pane.classList.add(e))})}_clearPanelClasses(){this._pane&&(this._appliedPanelClasses.forEach(t=>{this._pane.classList.remove(t)}),this._appliedPanelClasses=[])}_getViewportMarginStart(){return typeof this._viewportMargin=="number"?this._viewportMargin:this._viewportMargin?.start??0}_getViewportMarginEnd(){return typeof this._viewportMargin=="number"?this._viewportMargin:this._viewportMargin?.end??0}_getViewportMarginTop(){return typeof this._viewportMargin=="number"?this._viewportMargin:this._viewportMargin?.top??0}_getViewportMarginBottom(){return typeof this._viewportMargin=="number"?this._viewportMargin:this._viewportMargin?.bottom??0}_getOriginRect(){let t=this._origin;if(t instanceof re)return t.nativeElement.getBoundingClientRect();if(t instanceof Element)return t.getBoundingClientRect();let e=t.width||0,r=t.height||0;return{top:t.y,bottom:t.y+r,left:t.x,right:t.x+e,height:r,width:e}}_getContainerRect(){let t=this._overlayRef.getConfig().usePopover&&this._popoverLocation!=="global",e=this._overlayContainer.getContainerElement();t&&(e.style.display="block");let r=e.getBoundingClientRect();return t&&(e.style.display=""),r}};function Yo(n,t){for(let e in t)t.hasOwnProperty(e)&&(n[e]=t[e]);return n}function hI(n){if(typeof n!="number"&&n!=null){let[t,e]=n.split(ZL);return!e||e==="px"?parseFloat(t):null}return n||null}function pI(n){return{top:Math.floor(n.top),right:Math.floor(n.right),bottom:Math.floor(n.bottom),left:Math.floor(n.left),width:Math.floor(n.width),height:Math.floor(n.height)}}function XL(n,t){return n===t?!0:n.isOriginClipped===t.isOriginClipped&&n.isOriginOutsideView===t.isOriginOutsideView&&n.isOverlayClipped===t.isOverlayClipped&&n.isOverlayOutsideView===t.isOverlayOutsideView}var mI="cdk-global-overlay-wrapper";function wI(n){return new dh}var dh=class{_overlayRef;_cssPosition="static";_topOffset="";_bottomOffset="";_alignItems="";_xPosition="";_xOffset="";_width="";_height="";_isDisposed=!1;attach(t){let e=t.getConfig();this._overlayRef=t,this._width&&!e.width&&t.updateSize({width:this._width}),this._height&&!e.height&&t.updateSize({height:this._height}),t.hostElement.classList.add(mI),this._isDisposed=!1}top(t=""){return this._bottomOffset="",this._topOffset=t,this._alignItems="flex-start",this}left(t=""){return this._xOffset=t,this._xPosition="left",this}bottom(t=""){return this._topOffset="",this._bottomOffset=t,this._alignItems="flex-end",this}right(t=""){return this._xOffset=t,this._xPosition="right",this}start(t=""){return this._xOffset=t,this._xPosition="start",this}end(t=""){return this._xOffset=t,this._xPosition="end",this}width(t=""){return this._overlayRef?this._overlayRef.updateSize({width:t}):this._width=t,this}height(t=""){return this._overlayRef?this._overlayRef.updateSize({height:t}):this._height=t,this}centerHorizontally(t=""){return this.left(t),this._xPosition="center",this}centerVertically(t=""){return this.top(t),this._alignItems="center",this}apply(){if(!this._overlayRef||!this._overlayRef.hasAttached())return;let t=this._overlayRef.overlayElement.style,e=this._overlayRef.hostElement.style,r=this._overlayRef.getConfig(),{width:i,height:o,maxWidth:s,maxHeight:a}=r,l=(i==="100%"||i==="100vw")&&(!s||s==="100%"||s==="100vw"),c=(o==="100%"||o==="100vh")&&(!a||a==="100%"||a==="100vh"),u=this._xPosition,d=this._xOffset,h=this._overlayRef.getConfig().direction==="rtl",p="",m="",_="";l?_="flex-start":u==="center"?(_="center",h?m=d:p=d):h?u==="left"||u==="end"?(_="flex-end",p=d):(u==="right"||u==="start")&&(_="flex-start",m=d):u==="left"||u==="start"?(_="flex-start",p=d):(u==="right"||u==="end")&&(_="flex-end",m=d),t.position=this._cssPosition,t.marginLeft=l?"0":p,t.marginTop=c?"0":this._topOffset,t.marginBottom=this._bottomOffset,t.marginRight=l?"0":m,e.justifyContent=_,e.alignItems=c?"flex-start":this._alignItems}dispose(){if(this._isDisposed||!this._overlayRef)return;let t=this._overlayRef.overlayElement.style,e=this._overlayRef.hostElement,r=e.style;e.classList.remove(mI),r.justifyContent=r.alignItems=t.marginTop=t.marginBottom=t.marginLeft=t.marginRight=t.position="",this._overlayRef=null,this._isDisposed=!0}},TI=(()=>{class n{_injector=f(ne);constructor(){}global(){return wI()}flexibleConnectedTo(e){return fa(this._injector,e)}static \u0275fac=function(r){return new(r||n)};static \u0275prov=y({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})(),SI=new v("OVERLAY_DEFAULT_CONFIG");function ha(n,t){n.get(Bn).load(DI);let e=n.get(EI),r=n.get(Z),i=n.get(di),o=n.get(ln),s=n.get(Un),a=n.get(Bt,null,{optional:!0})||n.get(It).createRenderer(null,null),l=new ua(t),c=n.get(SI,null,{optional:!0})?.usePopover??!0;l.direction=l.direction||s.value,"showPopover"in r.body?l.usePopover=t?.usePopover??c:l.usePopover=!1;let u=r.createElement("div"),d=r.createElement("div");u.id=i.getId("cdk-overlay-"),u.classList.add("cdk-overlay-pane"),d.appendChild(u),l.usePopover&&(d.setAttribute("popover","manual"),d.classList.add("cdk-overlay-popover"));let h=l.usePopover?l.positionStrategy?.getPopoverInsertionPoint?.():null;return pb(h)?h.after(d):h?.type==="parent"?h.element.appendChild(d):e.getContainerElement().appendChild(d),new ch(new ac(u,o,n),d,u,l,n.get(j),n.get(_I),r,n.get(ei),n.get(CI),t?.disableAnimations??n.get(cl,null,{optional:!0})==="NoopAnimations",n.get(ke),a)}var II=(()=>{class n{scrollStrategies=f(vI);_positionBuilder=f(TI);_injector=f(ne);constructor(){}create(e){return ha(this._injector,e)}position(){return this._positionBuilder}static \u0275fac=function(r){return new(r||n)};static \u0275prov=y({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})();var mc=(()=>{class n{static \u0275fac=function(r){return new(r||n)};static \u0275mod=Me({type:n});static \u0275inj=De({providers:[II],imports:[gn,gS,fc,fc]})}return n})();var QL=["tooltip"],JL=20;var eF=new v("mat-tooltip-scroll-strategy",{providedIn:"root",factory:()=>{let n=f(ne);return()=>da(n,{scrollThrottle:JL})}}),tF=new v("mat-tooltip-default-options",{providedIn:"root",factory:()=>({showDelay:0,hideDelay:0,touchendHideDelay:1500})});var MI="tooltip-panel",nF={passive:!0},rF=8,iF=8,oF=24,sF=200,dr=(()=>{class n{_elementRef=f(re);_ngZone=f(j);_platform=f(Le);_ariaDescriber=f(VS);_focusMonitor=f($i);_dir=f(Un);_injector=f(ne);_viewContainerRef=f(at);_mediaMatcher=f(la);_document=f(Z);_renderer=f(Bt);_animationsDisabled=$n();_defaultOptions=f(tF,{optional:!0});_overlayRef=null;_tooltipInstance=null;_overlayPanelClass;_portal;_position="below";_positionAtOrigin=!1;_disabled=!1;_tooltipClass;_viewInitialized=!1;_pointerExitEventsInitialized=!1;_tooltipComponent=xI;_viewportMargin=8;_currentPosition;_cssClassPrefix="mat-mdc";_ariaDescriptionPending=!1;_dirSubscribed=!1;get position(){return this._position}set position(e){e!==this._position&&(this._position=e,this._overlayRef&&(this._updatePosition(this._overlayRef),this._tooltipInstance?.show(0),this._overlayRef.updatePosition()))}get positionAtOrigin(){return this._positionAtOrigin}set positionAtOrigin(e){this._positionAtOrigin=Jv(e),this._detach(),this._overlayRef=null}get disabled(){return this._disabled}set disabled(e){let r=Jv(e);this._disabled!==r&&(this._disabled=r,r?this.hide(0):this._setupPointerEnterEventsIfNeeded(),this._syncAriaDescription(this.message))}get showDelay(){return this._showDelay}set showDelay(e){this._showDelay=cr(e)}_showDelay;get hideDelay(){return this._hideDelay}set hideDelay(e){this._hideDelay=cr(e),this._tooltipInstance&&(this._tooltipInstance._mouseLeaveHideDelay=this._hideDelay)}_hideDelay;touchGestures="auto";get message(){return this._message}set message(e){let r=this._message;this._message=e!=null?String(e).trim():"",!this._message&&this._isTooltipVisible()?this.hide(0):(this._setupPointerEnterEventsIfNeeded(),this._updateTooltipMessage()),this._syncAriaDescription(r)}_message="";get tooltipClass(){return this._tooltipClass}set tooltipClass(e){this._tooltipClass=e,this._tooltipInstance&&this._setTooltipClass(this._tooltipClass)}_eventCleanups=[];_touchstartTimeout=null;_destroyed=new C;_isDestroyed=!1;constructor(){let e=this._defaultOptions;e&&(this._showDelay=e.showDelay,this._hideDelay=e.hideDelay,e.position&&(this.position=e.position),e.positionAtOrigin&&(this.positionAtOrigin=e.positionAtOrigin),e.touchGestures&&(this.touchGestures=e.touchGestures),e.tooltipClass&&(this.tooltipClass=e.tooltipClass)),this._viewportMargin=rF}ngAfterViewInit(){this._viewInitialized=!0,this._setupPointerEnterEventsIfNeeded(),this._focusMonitor.monitor(this._elementRef).pipe(Q(this._destroyed)).subscribe(e=>{e?e==="keyboard"&&this._ngZone.run(()=>this.show()):this._ngZone.run(()=>this.hide(0))})}ngOnDestroy(){let e=this._elementRef.nativeElement;this._touchstartTimeout&&clearTimeout(this._touchstartTimeout),this._overlayRef&&(this._overlayRef.dispose(),this._tooltipInstance=null),this._eventCleanups.forEach(r=>r()),this._eventCleanups.length=0,this._destroyed.next(),this._destroyed.complete(),this._isDestroyed=!0,this._ariaDescriber.removeDescription(e,this.message,"tooltip"),this._focusMonitor.stopMonitoring(e)}show(e=this.showDelay,r){if(this.disabled||!this.message||this._isTooltipVisible()){this._tooltipInstance?._cancelPendingAnimations();return}let i=this._createOverlay(r);this._detach(),this._portal=this._portal||new sc(this._tooltipComponent,this._viewContainerRef);let o=this._tooltipInstance=i.attach(this._portal).instance;o._triggerElement=this._elementRef.nativeElement,o._mouseLeaveHideDelay=this._hideDelay,o.afterHidden().pipe(Q(this._destroyed)).subscribe(()=>this._detach()),this._setTooltipClass(this._tooltipClass),this._updateTooltipMessage(),o.show(e)}hide(e=this.hideDelay){let r=this._tooltipInstance;r&&(r.isVisible()?r.hide(e):(r._cancelPendingAnimations(),this._detach()))}toggle(e){this._isTooltipVisible()?this.hide():this.show(void 0,e)}_isTooltipVisible(){return!!this._tooltipInstance&&this._tooltipInstance.isVisible()}_createOverlay(e){if(this._overlayRef){let s=this._overlayRef.getConfig().positionStrategy;if((!this.positionAtOrigin||!e)&&s._origin instanceof re)return this._overlayRef;this._detach()}let r=this._injector.get(Wi).getAncestorScrollContainers(this._elementRef),i=`${this._cssClassPrefix}-${MI}`,o=fa(this._injector,this.positionAtOrigin?e||this._elementRef:this._elementRef).withTransformOriginOn(`.${this._cssClassPrefix}-tooltip`).withFlexibleDimensions(!1).withViewportMargin(this._viewportMargin).withScrollableContainers(r).withPopoverLocation("global");return o.positionChanges.pipe(Q(this._destroyed)).subscribe(s=>{this._updateCurrentPositionClass(s.connectionPair),this._tooltipInstance&&s.scrollableViewProperties.isOverlayClipped&&this._tooltipInstance.isVisible()&&this._ngZone.run(()=>this.hide(0))}),this._overlayRef=ha(this._injector,{direction:this._dir,positionStrategy:o,panelClass:this._overlayPanelClass?[...this._overlayPanelClass,i]:i,scrollStrategy:this._injector.get(eF)(),disableAnimations:this._animationsDisabled,eventPredicate:this._overlayEventPredicate}),this._updatePosition(this._overlayRef),this._overlayRef.detachments().pipe(Q(this._destroyed)).subscribe(()=>this._detach()),this._overlayRef.outsidePointerEvents().pipe(Q(this._destroyed)).subscribe(()=>this._tooltipInstance?._handleBodyInteraction()),this._overlayRef.keydownEvents().pipe(Q(this._destroyed)).subscribe(s=>{s.preventDefault(),s.stopPropagation(),this._ngZone.run(()=>this.hide(0))}),this._defaultOptions?.disableTooltipInteractivity&&this._overlayRef.addPanelClass(`${this._cssClassPrefix}-tooltip-panel-non-interactive`),this._dirSubscribed||(this._dirSubscribed=!0,this._dir.change.pipe(Q(this._destroyed)).subscribe(()=>{this._overlayRef&&this._updatePosition(this._overlayRef)})),this._overlayRef}_detach(){this._overlayRef&&this._overlayRef.hasAttached()&&this._overlayRef.detach(),this._tooltipInstance=null}_updatePosition(e){let r=e.getConfig().positionStrategy,i=this._getOrigin(),o=this._getOverlayPosition();r.withPositions([this._addOffset(g(g({},i.main),o.main)),this._addOffset(g(g({},i.fallback),o.fallback))])}_addOffset(e){let r=iF,i=!this._dir||this._dir.value=="ltr";return e.originY==="top"?e.offsetY=-r:e.originY==="bottom"?e.offsetY=r:e.originX==="start"?e.offsetX=i?-r:r:e.originX==="end"&&(e.offsetX=i?r:-r),e}_getOrigin(){let e=!this._dir||this._dir.value=="ltr",r=this.position,i;r=="above"||r=="below"?i={originX:"center",originY:r=="above"?"top":"bottom"}:r=="before"||r=="left"&&e||r=="right"&&!e?i={originX:"start",originY:"center"}:(r=="after"||r=="right"&&e||r=="left"&&!e)&&(i={originX:"end",originY:"center"});let{x:o,y:s}=this._invertPosition(i.originX,i.originY);return{main:i,fallback:{originX:o,originY:s}}}_getOverlayPosition(){let e=!this._dir||this._dir.value=="ltr",r=this.position,i;r=="above"?i={overlayX:"center",overlayY:"bottom"}:r=="below"?i={overlayX:"center",overlayY:"top"}:r=="before"||r=="left"&&e||r=="right"&&!e?i={overlayX:"end",overlayY:"center"}:(r=="after"||r=="right"&&e||r=="left"&&!e)&&(i={overlayX:"start",overlayY:"center"});let{x:o,y:s}=this._invertPosition(i.overlayX,i.overlayY);return{main:i,fallback:{overlayX:o,overlayY:s}}}_updateTooltipMessage(){this._tooltipInstance&&(this._tooltipInstance.message=this.message,this._tooltipInstance._markForCheck(),ft(()=>{this._tooltipInstance&&this._overlayRef.updatePosition()},{injector:this._injector}))}_setTooltipClass(e){this._tooltipInstance&&(this._tooltipInstance.tooltipClass=e instanceof Set?Array.from(e):e,this._tooltipInstance._markForCheck())}_invertPosition(e,r){return this.position==="above"||this.position==="below"?r==="top"?r="bottom":r==="bottom"&&(r="top"):e==="end"?e="start":e==="start"&&(e="end"),{x:e,y:r}}_updateCurrentPositionClass(e){let{overlayY:r,originX:i,originY:o}=e,s;if(r==="center"?this._dir&&this._dir.value==="rtl"?s=i==="end"?"left":"right":s=i==="start"?"left":"right":s=r==="bottom"&&o==="top"?"above":"below",s!==this._currentPosition){let a=this._overlayRef;if(a){let l=`${this._cssClassPrefix}-${MI}-`;a.removePanelClass(l+this._currentPosition),a.addPanelClass(l+s)}this._currentPosition=s}}_setupPointerEnterEventsIfNeeded(){this._disabled||!this.message||!this._viewInitialized||this._eventCleanups.length||(this._isTouchPlatform()?this.touchGestures!=="off"&&(this._disableNativeGesturesIfNecessary(),this._addListener("touchstart",e=>{let r=e.targetTouches?.[0],i=r?{x:r.clientX,y:r.clientY}:void 0;this._setupPointerExitEventsIfNeeded(),this._touchstartTimeout&&clearTimeout(this._touchstartTimeout);let o=500;this._touchstartTimeout=setTimeout(()=>{this._touchstartTimeout=null,this.show(void 0,i)},this._defaultOptions?.touchLongPressShowDelay??o)})):this._addListener("mouseenter",e=>{this._setupPointerExitEventsIfNeeded();let r;e.x!==void 0&&e.y!==void 0&&(r=e),this.show(void 0,r)}))}_setupPointerExitEventsIfNeeded(){if(!this._pointerExitEventsInitialized){if(this._pointerExitEventsInitialized=!0,!this._isTouchPlatform())this._addListener("mouseleave",e=>{let r=e.relatedTarget;(!r||!this._overlayRef?.overlayElement.contains(r))&&this.hide()}),this._addListener("wheel",e=>{if(this._isTooltipVisible()){let r=this._document.elementFromPoint(e.clientX,e.clientY),i=this._elementRef.nativeElement;r!==i&&!i.contains(r)&&this.hide()}});else if(this.touchGestures!=="off"){this._disableNativeGesturesIfNecessary();let e=()=>{this._touchstartTimeout&&clearTimeout(this._touchstartTimeout),this.hide(this._defaultOptions?.touchendHideDelay)};this._addListener("touchend",e),this._addListener("touchcancel",e)}}}_addListener(e,r){this._eventCleanups.push(this._renderer.listen(this._elementRef.nativeElement,e,r,nF))}_isTouchPlatform(){let e=this._defaultOptions?.detectHoverCapability;return typeof e=="function"?!e():this._platform.IOS||this._platform.ANDROID?!0:this._platform.isBrowser?!!e&&this._mediaMatcher.matchMedia("(any-hover: none)").matches:!1}_disableNativeGesturesIfNecessary(){let e=this.touchGestures;if(e!=="off"){let r=this._elementRef.nativeElement,i=r.style;(e==="on"||r.nodeName!=="INPUT"&&r.nodeName!=="TEXTAREA")&&(i.userSelect=i.msUserSelect=i.webkitUserSelect=i.MozUserSelect="none"),(e==="on"||!r.draggable)&&(i.webkitUserDrag="none"),i.touchAction="none",i.webkitTapHighlightColor="transparent"}}_syncAriaDescription(e){this._ariaDescriptionPending||(this._ariaDescriptionPending=!0,this._ariaDescriber.removeDescription(this._elementRef.nativeElement,e,"tooltip"),this._isDestroyed||ft({write:()=>{this._ariaDescriptionPending=!1,this.message&&!this.disabled&&this._ariaDescriber.describe(this._elementRef.nativeElement,this.message,"tooltip")}},{injector:this._injector}))}_overlayEventPredicate=e=>e.type==="keydown"?this._isTooltipVisible()&&e.keyCode===27&&!zi(e):!0;static \u0275fac=function(r){return new(r||n)};static \u0275dir=le({type:n,selectors:[["","matTooltip",""]],hostAttrs:[1,"mat-mdc-tooltip-trigger"],hostVars:2,hostBindings:function(r,i){r&2&&je("mat-mdc-tooltip-disabled",i.disabled)},inputs:{position:[0,"matTooltipPosition","position"],positionAtOrigin:[0,"matTooltipPositionAtOrigin","positionAtOrigin"],disabled:[0,"matTooltipDisabled","disabled"],showDelay:[0,"matTooltipShowDelay","showDelay"],hideDelay:[0,"matTooltipHideDelay","hideDelay"],touchGestures:[0,"matTooltipTouchGestures","touchGestures"],message:[0,"matTooltip","message"],tooltipClass:[0,"matTooltipClass","tooltipClass"]},exportAs:["matTooltip"]})}return n})(),xI=(()=>{class n{_changeDetectorRef=f(xt);_elementRef=f(re);_isMultiline=!1;message;tooltipClass;_showTimeoutId;_hideTimeoutId;_triggerElement;_mouseLeaveHideDelay;_animationsDisabled=$n();_tooltip;_closeOnInteraction=!1;_isVisible=!1;_onHide=new C;_showAnimation="mat-mdc-tooltip-show";_hideAnimation="mat-mdc-tooltip-hide";constructor(){}show(e){this._hideTimeoutId!=null&&clearTimeout(this._hideTimeoutId),this._showTimeoutId=setTimeout(()=>{this._toggleVisibility(!0),this._showTimeoutId=void 0},e)}hide(e){this._showTimeoutId!=null&&clearTimeout(this._showTimeoutId),this._hideTimeoutId=setTimeout(()=>{this._toggleVisibility(!1),this._hideTimeoutId=void 0},e)}afterHidden(){return this._onHide}isVisible(){return this._isVisible}ngOnDestroy(){this._cancelPendingAnimations(),this._onHide.complete(),this._triggerElement=null}_handleBodyInteraction(){this._closeOnInteraction&&this.hide(0)}_markForCheck(){this._changeDetectorRef.markForCheck()}_handleMouseLeave({relatedTarget:e}){(!e||!this._triggerElement.contains(e))&&(this.isVisible()?this.hide(this._mouseLeaveHideDelay):this._finalizeAnimation(!1))}_onShow(){this._isMultiline=this._isTooltipMultiline(),this._markForCheck()}_isTooltipMultiline(){let e=this._elementRef.nativeElement.getBoundingClientRect();return e.height>oF&&e.width>=sF}_handleAnimationEnd({animationName:e}){(e===this._showAnimation||e===this._hideAnimation)&&this._finalizeAnimation(e===this._showAnimation)}_cancelPendingAnimations(){this._showTimeoutId!=null&&clearTimeout(this._showTimeoutId),this._hideTimeoutId!=null&&clearTimeout(this._hideTimeoutId),this._showTimeoutId=this._hideTimeoutId=void 0}_finalizeAnimation(e){e?this._closeOnInteraction=!0:this.isVisible()||this._onHide.next()}_toggleVisibility(e){let r=this._tooltip.nativeElement,i=this._showAnimation,o=this._hideAnimation;if(r.classList.remove(e?o:i),r.classList.add(e?i:o),this._isVisible!==e&&(this._isVisible=e,this._changeDetectorRef.markForCheck()),e&&!this._animationsDisabled&&typeof getComputedStyle=="function"){let s=getComputedStyle(r);(s.getPropertyValue("animation-duration")==="0s"||s.getPropertyValue("animation-name")==="none")&&(this._animationsDisabled=!0)}e&&this._onShow(),this._animationsDisabled&&(r.classList.add("_mat-animation-noopable"),this._finalizeAnimation(e))}static \u0275fac=function(r){return new(r||n)};static \u0275cmp=oe({type:n,selectors:[["mat-tooltip-component"]],viewQuery:function(r,i){if(r&1&&cn(QL,7),r&2){let o;xe(o=Re())&&(i._tooltip=o.first)}},hostAttrs:["aria-hidden","true"],hostBindings:function(r,i){r&1&&Ee("mouseleave",function(s){return i._handleMouseLeave(s)})},decls:4,vars:5,consts:[["tooltip",""],[1,"mdc-tooltip","mat-mdc-tooltip",3,"animationend"],[1,"mat-mdc-tooltip-surface","mdc-tooltip__surface"]],template:function(r,i){r&1&&(Jn(0,"div",1,0),As("animationend",function(s){return i._handleAnimationEnd(s)}),Jn(2,"div",2),A(3),Zr()()),r&2&&(tr(i.tooltipClass),je("mdc-tooltip--multiline",i._isMultiline),R(3),Zt(i.message))},styles:[`.mat-mdc-tooltip {
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
`],encapsulation:2,changeDetection:0})}return n})();var Or=(()=>{class n{static \u0275fac=function(r){return new(r||n)};static \u0275mod=Me({type:n});static \u0275inj=De({imports:[Uv,mc,gn,Ko]})}return n})();function RI(n){n||(n=f(tt));let t=new L(e=>{if(n.destroyed){e.next();return}return n.onDestroy(e.next.bind(e))});return e=>e.pipe(Q(t))}var aF="@sdux-vault/devtools",lF="0.9.2";Lo(aF,lF);var gb=null;function vb(){return gb||(gb=new yb),gb}var yb=class{#t=new C;constructor(){window.sdux??={},window.sdux.vaultEventBus=this}nextPipeline(t){xr.active&&t&&this.#t.next(t)}pipeline$(){return this.#t.asObservable()}};var fh=class n{constructor(t){this.zone=t;this.isChromeExtension=typeof chrome<"u"&&!!chrome?.runtime?.connect,this.isChromeExtension&&this.#i()}#t=new C;isChromeExtension;#r=vb();#n=null;#e=null;static RECONNECT_DELAY_MS=1e3;pipeline$(){return this.isChromeExtension?this.#t.asObservable():this.#r.pipeline$()}listenPipeline(t){let e=this.pipeline$().subscribe(t);return()=>e.unsubscribe()}#i(){this.#n=chrome.runtime.connect({name:"vault-devtools"}),this.#n.onMessage.addListener(t=>{t?.type&&(t.type==="VAULT_PIPELINE_EVENT"?this.zone.run(()=>{this.#t.next(t.event)}):console.warn(`[Vault DevTools] Unhandled message type: "${t.type}"`))}),this.#n.onDisconnect.addListener(()=>{this.#n=null,this.#a()})}#a(){this.#e!=null&&clearTimeout(this.#e),this.#e=setTimeout(()=>{this.#e=null,this.#i()},n.RECONNECT_DELAY_MS)}static \u0275fac=function(e){return new(e||n)(z(j))};static \u0275prov=y({token:n,factory:n.\u0275fac,providedIn:"root"})};var Et=class{vault=Iv(Et);bus=f(fh);destroyRef=f(tt);events=nt(()=>this.vault.state.value()??[]);totalEvents=nt(()=>this.events().length);constructor(){this.vault.initialize(),this.vault.fromStream(this.bus.pipeline$().pipe(ye(t=>!!t&&t.cell!==Zs),RI(this.destroyRef)))}clearEvents(){this.vault.reset(),this.vault.replaceState({value:[]})}};T(Et,"\u0275fac",function(e){return new(e||Et)}),T(Et,"\u0275prov",y({token:Et,factory:Et.\u0275fac,providedIn:"root"})),Et=de([Sv(Zs)],Et);function cF(n,t){n&1&&(b(0,"section",1)(1,"h1",5),A(2,"Welcome to SDuX Vault DevTools"),D(),b(3,"p",6),A(4," Real-time pipeline visibility for your state management layer. Inspect events, trace state mutations, and diagnose errors \u2014 all in one place. "),D()())}function uF(n,t){n&1&&(b(0,"section",2),A(1," Events only appear "),b(2,"strong"),A(3,"after this panel opens and a decorated @FeatureCell service is instantiated."),D(),A(4,". "),b(5,"p"),A(6," FeatureCells are lazyloaded and only activated when the service is instantiated. The DevTools "),b(7,"strong"),A(8,"will only"),D(),A(9," connect once an @FeatureCell is active. "),D(),b(10,"p"),A(11," Click on a route with a component using an injected @FeatureCell service to trigger events in your app. "),D()())}function dF(){try{return chrome.runtime.getManifest().version}catch{return"dev"}}var yc=new v("EXTENSION_VERSION",{providedIn:"root",factory:dF}),hh=class n{devtools=f(Et);version=f(yc);events=nt(()=>this.devtools.events());totalEvents=nt(()=>this.events()?.length);static \u0275fac=function(e){return new(e||n)};static \u0275cmp=oe({type:n,selectors:[["sdux-devtools-splash-page"]],decls:5,vars:1,consts:[[1,"vault-devtools"],[1,"welcome"],[1,"warning"],[1,"vault-empty"],["src","/assets/brand/brand-landscape-dark.svg","alt","SDuX Vault logo","matTooltip","SDuX Vault",1,"logo"],[1,"welcome-title"],[1,"welcome-subtitle"]],template:function(e,r){e&1&&(b(0,"div",0),Xe(1,cF,5,0,"section",1)(2,uF,12,0,"section",2),b(3,"section",3),Ce(4,"img",4),D()()),e&2&&(R(),Qe(r.totalEvents()?1:2))},dependencies:[Or,dr],styles:[".pointer[_ngcontent-%COMP%]{cursor:pointer}[_nghost-%COMP%]{display:block;width:100%;height:100%}.vault-devtools[_ngcontent-%COMP%]{width:100%;height:100%;min-height:0;display:flex;flex-direction:column;align-items:center;justify-content:center;overflow:hidden;border:none}.vault-devtools[_ngcontent-%COMP%]   .welcome[_ngcontent-%COMP%]{text-align:center;margin-bottom:1.5rem}.vault-devtools[_ngcontent-%COMP%]   .welcome[_ngcontent-%COMP%]   .welcome-title[_ngcontent-%COMP%]{margin:0 0 .25rem;font-size:1.5rem;font-weight:600}.vault-devtools[_ngcontent-%COMP%]   .welcome[_ngcontent-%COMP%]   .welcome-subtitle[_ngcontent-%COMP%]{margin:0;color:#94a3b8;font-weight:400;font-family:Inter,system-ui,sans-serif;font-size:.875rem;line-height:1.5}.vault-devtools[_ngcontent-%COMP%]   .warning[_ngcontent-%COMP%]{background-color:#fff263;border-left:4px solid #c49000;color:#000;padding:.5rem 1rem;border-radius:.3125rem;font-size:.875rem;text-align:center;margin-bottom:1.5rem}.vault-devtools[_ngcontent-%COMP%]   .vault-empty[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:center;text-align:center}.vault-devtools[_ngcontent-%COMP%]   .vault-empty[_ngcontent-%COMP%]   .logo[_ngcontent-%COMP%]{width:200px;height:auto;filter:drop-shadow(0 2px 4px rgba(0,0,0,.35));transition:opacity .25s ease}.vault-devtools[_ngcontent-%COMP%]   .vault-empty[_ngcontent-%COMP%]   .logo[_ngcontent-%COMP%]:hover{opacity:.9}"],changeDetection:0})};function fF(n,t){if(n&1&&(b(0,"div",4)(1,"h4"),A(2,"State Value"),D(),b(3,"pre")(4,"code"),A(5),Qr(6,"json"),D()()()),n&2){let e,r=ce();R(5),Zt(Mo(6,1,(e=r.event().state)==null?null:e.value))}}function hF(n,t){if(n&1&&(b(0,"div",4)(1,"h4"),A(2,"Payload"),D(),b(3,"pre")(4,"code"),A(5),Qr(6,"json"),D()()()),n&2){let e=ce();R(5),Zt(Mo(6,1,e.event().payload))}}function pF(n,t){if(n&1&&(b(0,"div",6)(1,"h4"),A(2,"Error"),D(),b(3,"pre")(4,"code"),A(5),Qr(6,"json"),D()()()),n&2){let e=ce();R(5),Zt(Mo(6,1,e.event().error))}}var ph=class n{event=wr.required();closeDetail=Ad();static \u0275fac=function(e){return new(e||n)};static \u0275cmp=oe({type:n,selectors:[["sdux-devtools-pipeline-event-detail"]],inputs:{event:[1,"event"]},outputs:{closeDetail:"closeDetail"},decls:40,vars:10,consts:[[1,"detail-panel"],[1,"detail-header"],["type","button","aria-label","Close detail panel","matTooltip","Close detail panel",1,"close-btn",3,"click"],[1,"detail-body"],[1,"detail-block"],[1,"kv"],[1,"detail-block","error-block"]],template:function(e,r){if(e&1&&(b(0,"div",0)(1,"div",1)(2,"h3"),A(3,"Event Detail"),D(),b(4,"button",2),Ee("click",function(){return r.closeDetail.emit()}),A(5," \u2715 "),D()(),b(6,"div",3)(7,"div",4)(8,"ul",5)(9,"li")(10,"strong"),A(11,"key:"),D(),A(12),D(),b(13,"li")(14,"strong"),A(15,"type:"),D(),A(16),D(),b(17,"li")(18,"strong"),A(19,"boundary:"),D(),A(20),D(),b(21,"li")(22,"strong"),A(23,"event name:"),D(),A(24),D(),b(25,"li")(26,"strong"),A(27,"event id:"),D(),A(28),D(),b(29,"li")(30,"strong"),A(31,"trace id:"),D(),A(32),D(),b(33,"li")(34,"strong"),A(35,"source:"),D(),A(36),D()()(),Xe(37,fF,7,3,"div",4),Xe(38,hF,7,3,"div",4),Xe(39,pF,7,3,"div",6),D()()),e&2){let i;R(12),lt(" ",r.event().behaviorKey),R(4),lt(" ",r.event().type),R(4),lt(" ",r.event().boundary),R(4),lt(" ",r.event().name),R(4),lt(" ",r.event().id),R(4),lt(" ",r.event().traceId??"null"),R(4),lt(" ",r.event().source??"N/A"),R(),Qe((i=r.event().state)!=null&&i.value?37:-1),R(),Qe(r.event().payload?38:-1),R(),Qe(r.event().error?39:-1)}},dependencies:[Ls,Or,dr,zg],styles:[".pointer[_ngcontent-%COMP%]{cursor:pointer}[_nghost-%COMP%]{display:flex;flex-direction:column;height:100%;max-height:100%;overflow:hidden}.detail-panel[_ngcontent-%COMP%]{display:flex;flex-direction:column;flex:1;min-height:0;overflow:hidden;background-color:#0f172a}.detail-panel[_ngcontent-%COMP%]   .detail-header[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:space-between;padding:.5rem 1rem;border-bottom:1px solid #63a4ff;flex-shrink:0}.detail-panel[_ngcontent-%COMP%]   .detail-header[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]{color:#fff;font-weight:600;font-family:Inter,system-ui,sans-serif;font-size:1rem;margin:0}.detail-panel[_ngcontent-%COMP%]   .detail-header[_ngcontent-%COMP%]   .close-btn[_ngcontent-%COMP%]{background:none;border:none;color:#94a3b8;font-size:1rem;cursor:pointer;padding:.25rem;border-radius:.25rem;line-height:1}.detail-panel[_ngcontent-%COMP%]   .detail-header[_ngcontent-%COMP%]   .close-btn[_ngcontent-%COMP%]:hover{color:#fff;background-color:#63a4ff}.detail-panel[_ngcontent-%COMP%]   .detail-body[_ngcontent-%COMP%]{flex:1;min-height:0;overflow-y:auto;padding:1rem}.detail-panel[_ngcontent-%COMP%]   .detail-body[_ngcontent-%COMP%]::-webkit-scrollbar{width:6px}.detail-panel[_ngcontent-%COMP%]   .detail-body[_ngcontent-%COMP%]::-webkit-scrollbar-thumb{background-color:#63a4ff;border-radius:.25rem}.detail-panel[_ngcontent-%COMP%]   .detail-columns[_ngcontent-%COMP%]{display:grid;grid-template-columns:1fr 1fr;gap:1rem}@media(max-width:768px){.detail-panel[_ngcontent-%COMP%]   .detail-columns[_ngcontent-%COMP%]{grid-template-columns:1fr}}.detail-panel[_ngcontent-%COMP%]   .detail-block[_ngcontent-%COMP%]{margin-bottom:1rem}.detail-panel[_ngcontent-%COMP%]   .detail-block[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%]{color:#e2e8f0;font-weight:600;font-family:Inter,system-ui,sans-serif;font-size:1rem;margin-bottom:.25rem}.detail-panel[_ngcontent-%COMP%]   .detail-block[_ngcontent-%COMP%]   .kv[_ngcontent-%COMP%]{list-style:none;padding:0;margin:0 0 .25rem}.detail-panel[_ngcontent-%COMP%]   .detail-block[_ngcontent-%COMP%]   .kv[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]{margin-bottom:.25rem;font-size:.875rem}.detail-panel[_ngcontent-%COMP%]   .detail-block[_ngcontent-%COMP%]   pre[_ngcontent-%COMP%]{background-color:#2c3a4f;border:1px solid #63a4ff;border-radius:.3125rem;padding:.5rem;font-size:.75rem;white-space:pre-wrap;word-break:break-all;overflow-wrap:break-word;color:#e2e8f0}.detail-panel[_ngcontent-%COMP%]   .detail-block[_ngcontent-%COMP%]   pre[_ngcontent-%COMP%]::-webkit-scrollbar{width:6px}.detail-panel[_ngcontent-%COMP%]   .detail-block[_ngcontent-%COMP%]   pre[_ngcontent-%COMP%]::-webkit-scrollbar-thumb{background-color:#63a4ff;border-radius:.25rem}.detail-panel[_ngcontent-%COMP%]   .error-block[_ngcontent-%COMP%]   pre[_ngcontent-%COMP%]{background-color:#b71c1c;border-color:#ef5350}"],changeDetection:0})};function mF(n,t){if(n&1&&(b(0,"span",7),A(1),D()),n&2){let e=ce(2);R(),Zt(e.behaviorName())}}function gF(n,t){n&1&&(b(0,"span",10),A(1,"\u25CF"),D())}function yF(n,t){n&1&&Ce(0,"span",11)}function vF(n,t){n&1&&(b(0,"span",12),A(1,"\u270E"),D())}function bF(n,t){n&1&&Ce(0,"span",11)}function _F(n,t){n&1&&(b(0,"span",13),A(1,"\u26A0"),D())}function CF(n,t){n&1&&Ce(0,"span",11)}function DF(n,t){if(n&1){let e=Kt();b(0,"div",1),Ee("click",function(){Ve(e);let i=ce();return Ue(i.selectEvent.emit(i.event()))})("keydown.enter",function(){Ve(e);let i=ce();return Ue(i.selectEvent.emit(i.event()))})("keydown.space",function(i){Ve(e);let o=ce();return o.selectEvent.emit(o.event()),Ue(i.preventDefault())}),b(1,"div",2)(2,"div",3),A(3),Qr(4,"number"),D(),b(5,"div",4),A(6),D()(),b(7,"div",5),Ce(8,"div",6),b(9,"div")(10,"span",7),A(11),Qr(12,"uppercase"),D(),Xe(13,mF,2,1,"span",7),D(),b(14,"div",8)(15,"div",9),Xe(16,gF,2,0,"span",10)(17,yF,1,0,"span",11),Xe(18,vF,2,0,"span",12)(19,bF,1,0,"span",11),Xe(20,_F,2,0,"span",13)(21,CF,1,0,"span",11),D(),b(22,"div",14),A(23),Qr(24,"date"),D()()()()}if(n&2){let e,r=ce();je("event-row-error",!!r.event().error)("event-row-selected",r.selected()),R(3),lt(" ",Md(4,15,r.totalEvents(),"3.0")," "),R(3),Zt(r.event().cell),R(3),tr(Dg("behavior-pills ",r.event().type)),R(2),Zt(Mo(12,18,r.event().type)),R(2),Qe(r.event().type==="controller"||r.event().type==="stage"?13:-1),R(3),Qe((e=r.event().state)!=null&&e.hasValue?16:17),R(2),Qe(r.event().payload?18:19),R(2),Qe(r.event().error?20:21),R(3),lt(" ",Md(24,20,r.event().timestamp,"HH:mm:ss.SSS")," ")}}var mh=class n{event=wr.required();totalEvents=wr.required();selected=wr(!1);selectEvent=Ad();parseBehaviorKey(){let t=this.event().behaviorKey;if(t.startsWith("SDUX::")){let r=t.split("::"),i=r[1],o=r[r.length-1];return[i.toUpperCase(),o.toUpperCase()]}return[t.replace(/^VAULT-/i,"").toUpperCase()]}behaviorName(){let t=this.event().behaviorKey;return t.startsWith("SDUX::")?t.split("::").pop().toUpperCase():t.replace(/^VAULT-/i,"").toUpperCase()}static \u0275fac=function(e){return new(e||n)};static \u0275cmp=oe({type:n,selectors:[["sdux-devtools-pipeline-event"]],inputs:{event:[1,"event"],totalEvents:[1,"totalEvents"],selected:[1,"selected"]},outputs:{selectEvent:"selectEvent"},decls:1,vars:1,consts:[["matTooltip","Click for more details","role","button","tabindex","0",1,"event-row-header",3,"event-row-error","event-row-selected"],["matTooltip","Click for more details","role","button","tabindex","0",1,"event-row-header",3,"click","keydown.enter","keydown.space"],[1,"row-primary"],[1,"counter"],[1,"cell"],[1,"row-secondary"],[1,"row-spacer"],[1,"pill"],[1,"indicators-ts"],[1,"indicators"],["matTooltip","State","aria-hidden","true",1,"icon","active"],["aria-hidden","true",1,"icon-spacer"],["matTooltip","Payload","aria-hidden","true",1,"icon","payload"],["matTooltip","Error","aria-hidden","true",1,"icon","error"],[1,"ts"]],template:function(e,r){e&1&&Xe(0,DF,25,23,"div",0),e&2&&Qe(r.event()?0:-1)},dependencies:[Ls,Or,dr,$g,Wg,Hg],styles:[".pointer[_ngcontent-%COMP%]{cursor:pointer}[_nghost-%COMP%]{display:block;overflow:hidden;background-color:#2c3a4f;border-radius:.3125rem;padding:.25rem .5rem;margin-bottom:.25rem}.event-row-header[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap;align-items:center;gap:.5rem;cursor:pointer}.event-row-header[_ngcontent-%COMP%]   .row-primary[_ngcontent-%COMP%], .event-row-header[_ngcontent-%COMP%]   .row-secondary[_ngcontent-%COMP%]{display:flex;align-items:center;gap:1rem}.event-row-header[_ngcontent-%COMP%]   .row-primary[_ngcontent-%COMP%]{flex-shrink:0}.event-row-header[_ngcontent-%COMP%]   .row-secondary[_ngcontent-%COMP%]{flex:1;min-width:0}.event-row-header[_ngcontent-%COMP%]   .row-secondary[_ngcontent-%COMP%]   .indicators-ts[_ngcontent-%COMP%]{margin-left:auto;display:flex;align-items:center}.event-row-header[_ngcontent-%COMP%]   .row-spacer[_ngcontent-%COMP%]{display:none}@media(max-width:768px){.event-row-header[_ngcontent-%COMP%]{flex-direction:column;align-items:stretch}.event-row-header[_ngcontent-%COMP%]   .row-primary[_ngcontent-%COMP%], .event-row-header[_ngcontent-%COMP%]   .row-secondary[_ngcontent-%COMP%]{width:100%}.event-row-header[_ngcontent-%COMP%]   .row-spacer[_ngcontent-%COMP%]{display:block;width:4.25rem;flex-shrink:0}.event-row-header[_ngcontent-%COMP%]   .cell[_ngcontent-%COMP%]{min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}}.event-row-header[_ngcontent-%COMP%]   .behavior-pills[_ngcontent-%COMP%]{display:flex;gap:2px}.event-row-header[_ngcontent-%COMP%]   .behavior-pills[_ngcontent-%COMP%]   .pill[_ngcontent-%COMP%]{color:#fff;font-weight:600;font-family:Inter,system-ui,sans-serif;font-size:.75rem;padding:.25rem .5rem;white-space:nowrap}.event-row-header[_ngcontent-%COMP%]   .behavior-pills[_ngcontent-%COMP%]   .pill[_ngcontent-%COMP%]:first-child{border-radius:.25rem 0 0 .25rem}.event-row-header[_ngcontent-%COMP%]   .behavior-pills[_ngcontent-%COMP%]   .pill[_ngcontent-%COMP%]:last-child{border-radius:0 .25rem .25rem 0}.event-row-header[_ngcontent-%COMP%]   .behavior-pills[_ngcontent-%COMP%]   .pill[_ngcontent-%COMP%]:only-child{border-radius:.25rem}.event-row-header[_ngcontent-%COMP%]   .behavior-pills.stage[_ngcontent-%COMP%]   .pill[_ngcontent-%COMP%]{background-color:#1976d2}.event-row-header[_ngcontent-%COMP%]   .behavior-pills.lifecycle[_ngcontent-%COMP%]   .pill[_ngcontent-%COMP%]{background-color:#388e3c}.event-row-header[_ngcontent-%COMP%]   .behavior-pills.controller[_ngcontent-%COMP%]   .pill[_ngcontent-%COMP%]{background-color:#fbc02d;color:#000}.event-row-header[_ngcontent-%COMP%]   .behavior-pills.conductor[_ngcontent-%COMP%]   .pill[_ngcontent-%COMP%]{background-color:#d32f2f}.event-row-header[_ngcontent-%COMP%]   .counter[_ngcontent-%COMP%]{color:#e2e8f0;font-weight:400;font-family:Inter,system-ui,sans-serif;font-size:.875rem;width:3rem;text-align:left}.event-row-header[_ngcontent-%COMP%]   .cell[_ngcontent-%COMP%]{color:#fff;font-weight:400;font-family:Inter,system-ui,sans-serif;font-weight:500;font-size:1rem}.event-row-header[_ngcontent-%COMP%]   .indicators[_ngcontent-%COMP%]{display:flex;align-items:center;gap:.25rem}.event-row-header[_ngcontent-%COMP%]   .indicators[_ngcontent-%COMP%]   .icon[_ngcontent-%COMP%], .event-row-header[_ngcontent-%COMP%]   .indicators[_ngcontent-%COMP%]   .icon-spacer[_ngcontent-%COMP%]{display:inline-block;width:1em;font-size:1rem;text-align:center}.event-row-header[_ngcontent-%COMP%]   .indicators[_ngcontent-%COMP%]   .icon[_ngcontent-%COMP%]{transition:color .15s ease}.event-row-header[_ngcontent-%COMP%]   .indicators[_ngcontent-%COMP%]   .icon.active[_ngcontent-%COMP%]{color:#81c784}.event-row-header[_ngcontent-%COMP%]   .indicators[_ngcontent-%COMP%]   .icon.payload[_ngcontent-%COMP%]{color:#63a4ff}.event-row-header[_ngcontent-%COMP%]   .indicators[_ngcontent-%COMP%]   .icon.error[_ngcontent-%COMP%]{color:#d32f2f}.event-row-header.event-row-error[_ngcontent-%COMP%]{background-color:#d32f2f14;border-left:3px solid #d32f2f}.event-row-header.event-row-selected[_ngcontent-%COMP%]{background-color:#ffffff14;border-left:3px solid #1976d2}.event-row-header.event-row-selected.event-row-error[_ngcontent-%COMP%]{border-left-color:#d32f2f}.event-row-header[_ngcontent-%COMP%]   .ts[_ngcontent-%COMP%]{color:#e2e8f0;font-weight:400;font-family:Inter,system-ui,sans-serif;font-size:.75rem;white-space:nowrap}"],changeDetection:0})};function EF(n,t){if(n&1){let e=Kt();b(0,"div",5)(1,"sdux-devtools-pipeline-event",6),Ee("selectEvent",function(i){Ve(e);let o=ce(2);return Ue(o.selectEvent(i))}),D()()}if(n&2){let e,r=t.$implicit,i=t.index,o=ce(2);R(),Je("event",r)("totalEvents",o.totalEvents()-i)("selected",((e=o.selectedEvent())==null?null:e.id)===r.id)}}function wF(n,t){if(n&1&&(b(0,"cdk-virtual-scroll-viewport",2),Dr(1,EF,2,3,"div",4),D()),n&2){let e=ce();R(),Je("cdkVirtualForOf",e.reversedEvents())("cdkVirtualForTrackBy",e.trackById)}}function TF(n,t){if(n&1){let e=Kt();b(0,"aside",3)(1,"sdux-devtools-pipeline-event-detail",7),Ee("closeDetail",function(){Ve(e);let i=ce();return Ue(i.closeDetail())}),D()()}n&2&&(R(),Je("event",t))}var gh=class n{events=wr.required();reversedEvents=nt(()=>[...this.events()].reverse());totalEvents=nt(()=>this.events().length);selectedEvent=ee(null);trackById(t,e){return e.id}selectEvent(t){this.selectedEvent.set(t)}closeDetail(){this.selectedEvent.set(null)}static \u0275fac=function(e){return new(e||n)};static \u0275cmp=oe({type:n,selectors:[["sdux-devtools-main-pipeline-panel"]],inputs:{events:[1,"events"]},decls:4,vars:2,consts:[[1,"pipeline-panel"],[1,"event-stream"],["itemSize","52","role","log","aria-label","Pipeline events",1,"event-list"],[1,"detail-pane"],["class","event-row",4,"cdkVirtualFor","cdkVirtualForOf","cdkVirtualForTrackBy"],[1,"event-row"],[3,"selectEvent","event","totalEvents","selected"],[3,"closeDetail","event"]],template:function(e,r){if(e&1&&(b(0,"div",0)(1,"section",1),Xe(2,wF,2,2,"cdk-virtual-scroll-viewport",2),D(),Xe(3,TF,2,1,"aside",3),D()),e&2){let i;R(2),Qe(r.reversedEvents()?2:-1),R(),Qe((i=r.selectedEvent())?3:-1,i)}},dependencies:[fc,Zv,Qv,Xv,mh,ph],styles:[".pointer[_ngcontent-%COMP%]{cursor:pointer}[_nghost-%COMP%]{display:block;height:100%;overflow:hidden}.pipeline-panel[_ngcontent-%COMP%]{display:flex;flex-direction:row;height:100%;overflow:hidden;padding:0;color:#e2e8f0;font-weight:400;font-family:Inter,system-ui,sans-serif}.pipeline-panel[_ngcontent-%COMP%]   .event-stream[_ngcontent-%COMP%]{flex:1;display:flex;flex-direction:column;min-height:0;min-width:0}.pipeline-panel[_ngcontent-%COMP%]   .event-stream[_ngcontent-%COMP%]   .event-list[_ngcontent-%COMP%]{flex:1;min-height:0;height:100%;overscroll-behavior:contain;margin-bottom:3rem}.pipeline-panel[_ngcontent-%COMP%]   .event-stream[_ngcontent-%COMP%]   .event-list[_ngcontent-%COMP%]   .cdk-virtual-scroll-content-wrapper[_ngcontent-%COMP%]{padding-bottom:2rem}.pipeline-panel[_ngcontent-%COMP%]   .event-stream[_ngcontent-%COMP%]   .event-list[_ngcontent-%COMP%]::-webkit-scrollbar{width:8px}.pipeline-panel[_ngcontent-%COMP%]   .event-stream[_ngcontent-%COMP%]   .event-list[_ngcontent-%COMP%]::-webkit-scrollbar-thumb{background-color:#63a4ff;border-radius:.25rem}.pipeline-panel[_ngcontent-%COMP%]   .detail-pane[_ngcontent-%COMP%]{width:400px;min-width:400px;flex-shrink:0;display:flex;flex-direction:column;border-left:1px solid #63a4ff;margin-bottom:3rem;min-height:0}.pipeline-panel[_ngcontent-%COMP%]   .detail-pane[_ngcontent-%COMP%]   sdux-devtools-pipeline-event-detail[_ngcontent-%COMP%]{display:flex;flex-direction:column;flex:1;min-height:0}.pipeline-panel[_ngcontent-%COMP%]   .detail-empty[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:center;height:100%}.pipeline-panel[_ngcontent-%COMP%]   .detail-empty[_ngcontent-%COMP%]   .detail-empty-text[_ngcontent-%COMP%]{color:#94a3b8;font-weight:400;font-family:Inter,system-ui,sans-serif;font-size:.875rem}@media(max-width:768px){.pipeline-panel[_ngcontent-%COMP%]{flex-direction:column;overflow:hidden}.pipeline-panel[_ngcontent-%COMP%]   .event-stream[_ngcontent-%COMP%]{height:100%;min-height:0;overflow:hidden}.pipeline-panel[_ngcontent-%COMP%]   .event-stream[_ngcontent-%COMP%]   .event-list[_ngcontent-%COMP%]{height:100%;margin-bottom:0}.pipeline-panel[_ngcontent-%COMP%]:has(.detail-pane)   .event-stream[_ngcontent-%COMP%]{height:35%}.pipeline-panel[_ngcontent-%COMP%]   .detail-pane[_ngcontent-%COMP%]{width:100%;min-width:0;flex:0 0 calc(55% - 20px);margin-top:.5rem;margin-bottom:0;border:1px solid #63a4ff;box-sizing:border-box;overflow:hidden}.pipeline-panel[_ngcontent-%COMP%]   .detail-pane[_ngcontent-%COMP%]   sdux-devtools-pipeline-event-detail[_ngcontent-%COMP%]{height:100%;flex:none}}.pipeline-panel[_ngcontent-%COMP%]   .event-row[_ngcontent-%COMP%]{display:block;padding:.5rem 0;border-bottom:1px solid #63a4ff}.pipeline-panel[_ngcontent-%COMP%]   .event-row[_ngcontent-%COMP%]:hover{background-color:#ffffff14}.pipeline-panel[_ngcontent-%COMP%]   .event-row-header[_ngcontent-%COMP%]{width:100%;display:grid;grid-template-columns:4rem 140px 1fr auto;align-items:center;gap:1rem}.pipeline-panel[_ngcontent-%COMP%]   .badge[_ngcontent-%COMP%]{color:#fff;font-weight:600;font-family:Inter,system-ui,sans-serif;font-size:.75rem;padding:.25rem .5rem;border-radius:.25rem;justify-self:start}.pipeline-panel[_ngcontent-%COMP%]   .badge.init[_ngcontent-%COMP%]{background-color:#388e3c}.pipeline-panel[_ngcontent-%COMP%]   .badge.patch[_ngcontent-%COMP%]{background-color:#fbc02d;color:#000}.pipeline-panel[_ngcontent-%COMP%]   .badge.error[_ngcontent-%COMP%]{background-color:#d32f2f}.pipeline-panel[_ngcontent-%COMP%]   .counter[_ngcontent-%COMP%]{color:#94a3b8;font-weight:400;font-family:Inter,system-ui,sans-serif;font-size:.875rem;width:3rem;text-align:left}.pipeline-panel[_ngcontent-%COMP%]   .cell[_ngcontent-%COMP%]{color:#94a3b8;font-weight:400;font-family:Inter,system-ui,sans-serif;font-weight:500;font-size:1rem;min-width:125px}.pipeline-panel[_ngcontent-%COMP%]   .ts[_ngcontent-%COMP%]{color:#94a3b8;font-weight:400;font-family:Inter,system-ui,sans-serif;font-size:.75rem;white-space:nowrap}.pipeline-panel[_ngcontent-%COMP%]   .event-details[_ngcontent-%COMP%]{grid-column:1/-1;margin-top:.25rem;padding-left:.5rem}.pipeline-panel[_ngcontent-%COMP%]   .event-details[_ngcontent-%COMP%]   summary[_ngcontent-%COMP%]{cursor:pointer;color:#1976d2;font-weight:400;font-family:Inter,system-ui,sans-serif;font-size:.875rem;margin-bottom:.25rem}.pipeline-panel[_ngcontent-%COMP%]   .event-details[_ngcontent-%COMP%]   summary[_ngcontent-%COMP%]:hover{text-decoration:underline}.pipeline-panel[_ngcontent-%COMP%]   .event-details[_ngcontent-%COMP%]   .detail-block[_ngcontent-%COMP%]{margin-bottom:1rem}.pipeline-panel[_ngcontent-%COMP%]   .event-details[_ngcontent-%COMP%]   .detail-block[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%]{color:#e2e8f0;font-weight:600;font-family:Inter,system-ui,sans-serif;font-size:1rem;margin-bottom:.25rem}.pipeline-panel[_ngcontent-%COMP%]   .event-details[_ngcontent-%COMP%]   .detail-block[_ngcontent-%COMP%]   .kv[_ngcontent-%COMP%]{list-style:none;padding:0;margin:0 0 .25rem}.pipeline-panel[_ngcontent-%COMP%]   .event-details[_ngcontent-%COMP%]   .detail-block[_ngcontent-%COMP%]   .kv[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]{margin-bottom:.25rem;font-size:.875rem}.pipeline-panel[_ngcontent-%COMP%]   .event-details[_ngcontent-%COMP%]   .detail-block[_ngcontent-%COMP%]   pre[_ngcontent-%COMP%]{background-color:#0f172a;border:1px solid #63a4ff;border-radius:.3125rem;padding:.5rem;font-size:.75rem;overflow-x:auto;color:#e2e8f0}.pipeline-panel[_ngcontent-%COMP%]   .event-details[_ngcontent-%COMP%]   .error-block[_ngcontent-%COMP%]   pre[_ngcontent-%COMP%]{background-color:#b71c1c;border-color:#ef5350}"],changeDetection:0})};function SF(n,t){if(n&1){let e=Kt();b(0,"span",12),A(1," All Events "),b(2,"button",13),Ee("click",function(i){Ve(e);let o=ce();return Ue(o.downloadAllEvents(i))}),Kr(),b(3,"svg",14),Ce(4,"path",15),D()()()}}function IF(n,t){if(n&1){let e=Kt();b(0,"span",12),A(1," Error Events "),b(2,"button",16),Ee("click",function(i){Ve(e);let o=ce();return Ue(o.downloadErrorEvents(i))}),Kr(),b(3,"svg",14),Ce(4,"path",15),D()()()}}var yh=class n{devtools=f(Et);version=f(yc);events=nt(()=>this.devtools.events());totalEvents=nt(()=>this.events()?.length);errorEvents=nt(()=>this.events()?.filter(t=>!!t.error)??[]);clearEvents(){this.devtools.clearEvents()}downloadAllEvents(t){t.stopPropagation(),this.downloadEvents(this.events(),"all-events")}downloadErrorEvents(t){t.stopPropagation(),this.downloadEvents(this.errorEvents(),"error-events")}downloadEvents(t,e){let r=new Blob([JSON.stringify(t,null,2)],{type:"application/json"}),i=document.createElement("a");i.href=URL.createObjectURL(r),i.download=`sdux-${e}-${Date.now()}.json`,i.click(),URL.revokeObjectURL(i.href)}static \u0275fac=function(e){return new(e||n)};static \u0275cmp=oe({type:n,selectors:[["sdux-events"]],decls:20,vars:4,consts:[[1,"header"],[1,"title"],["matTooltip","SDuX Vault DevTools",1,"logo"],["src","/assets/brand/brand-landscape-dark.svg","alt","SDuX Vault"],[1,"subtitle"],[1,"meta"],["matTooltip","Total pipeline events captured","aria-label","Total pipeline events captured",1,"event-count"],["type","button","matTooltip","Clear all events","aria-label","Clear all events",1,"btn-clear",3,"click"],["animationDuration","200ms",1,"vault-tabs"],["mat-tab-label",""],[1,"vault-tab-content"],[3,"events"],[1,"tab-label"],["type","button","aria-label","Download all events","matTooltip","Download all events",1,"tab-download-btn",3,"click"],["xmlns","http://www.w3.org/2000/svg","viewBox","0 0 24 24","fill","currentColor","width","18","height","18",1,"download-icon"],["d","M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"],["type","button","aria-label","Download error events","matTooltip","Download error events",1,"tab-download-btn",3,"click"]],template:function(e,r){e&1&&(b(0,"header",0)(1,"div",1)(2,"div",2),Ce(3,"img",3),D(),b(4,"span",4),A(5),D()(),b(6,"div",5)(7,"span",6),A(8),D(),b(9,"button",7),Ee("click",function(){return r.clearEvents()}),A(10," Clear "),D()()(),b(11,"mat-tab-group",8)(12,"mat-tab"),Dr(13,SF,5,0,"ng-template",9),b(14,"section",10),Ce(15,"sdux-devtools-main-pipeline-panel",11),D()(),b(16,"mat-tab"),Dr(17,IF,5,0,"ng-template",9),b(18,"section",10),Ce(19,"sdux-devtools-main-pipeline-panel",11),D()()()),e&2&&(R(5),lt("DevTools (v",r.version,")"),R(3),lt(" ",r.totalEvents()," events "),R(7),Je("events",r.events()),R(4),Je("events",r.errorEvents()))},dependencies:[lI,ub,db,aI,Or,dr,gh],styles:['@charset "UTF-8";.pointer[_ngcontent-%COMP%]{cursor:pointer}[_nghost-%COMP%]{display:flex;flex-direction:column;flex:1;min-height:0;overflow:hidden}.header[_ngcontent-%COMP%]{display:flex;justify-content:space-between;align-items:center;margin-bottom:1rem;border-bottom:1px solid #63a4ff}.header[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%]{display:flex;align-items:center;gap:.5rem}.header[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%]   .logo[_ngcontent-%COMP%]{width:120px}.header[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%]   .subtitle[_ngcontent-%COMP%]{color:#94a3b8;font-weight:400;font-family:Inter,system-ui,sans-serif;font-size:1rem}@media(max-width:768px){.header[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%]   .subtitle[_ngcontent-%COMP%]{display:none}}.header[_ngcontent-%COMP%]   .meta[_ngcontent-%COMP%]{display:flex;align-items:center;gap:1rem}.header[_ngcontent-%COMP%]   .meta[_ngcontent-%COMP%]   .event-count[_ngcontent-%COMP%]{color:#94a3b8;font-weight:400;font-family:Inter,system-ui,sans-serif;font-size:.875rem}.header[_ngcontent-%COMP%]   .meta[_ngcontent-%COMP%]   .btn-clear[_ngcontent-%COMP%]{height:40px!important;min-width:90px!important;display:flex;flex-direction:row;justify-content:center;align-items:center;color:#fff!important;background-color:transparent!important;border:1px solid #63a4ff!important;border-radius:.3125rem!important;font-size:.875rem!important;padding:.5rem;gap:.25rem;font-weight:600}.header[_ngcontent-%COMP%]   .meta[_ngcontent-%COMP%]   .btn-clear[_ngcontent-%COMP%]   .mat-icon[_ngcontent-%COMP%]{transform:scale(.75)}.header[_ngcontent-%COMP%]   .meta[_ngcontent-%COMP%]   .btn-clear[_ngcontent-%COMP%]{cursor:pointer;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.header[_ngcontent-%COMP%]   .meta[_ngcontent-%COMP%]   .btn-clear[_ngcontent-%COMP%]   .button-text[_ngcontent-%COMP%]{height:40px}.header[_ngcontent-%COMP%]   .meta[_ngcontent-%COMP%]   .btn-clear[_ngcontent-%COMP%]   .mat-icon[_ngcontent-%COMP%]{width:22px!important;height:22px!important;position:relative;padding-left:.25rem;padding-right:.25rem;gap:.25rem}.header[_ngcontent-%COMP%]   .meta[_ngcontent-%COMP%]   .btn-clear[_ngcontent-%COMP%]:focus{outline:none}.header[_ngcontent-%COMP%]   .meta[_ngcontent-%COMP%]   .btn-clear[_ngcontent-%COMP%]:hover{background-color:#ffffff14!important}.vault-tabs[_ngcontent-%COMP%]{flex:1;min-height:0;display:flex;flex-direction:column}.vault-tabs[_ngcontent-%COMP%]     .mat-mdc-tab-header{background-color:#0f172a;border-bottom:1px solid #63a4ff}.vault-tabs[_ngcontent-%COMP%]     .mat-mdc-tab-body-wrapper{flex:1;min-height:0;display:flex}.vault-tabs[_ngcontent-%COMP%]     .mat-mdc-tab-body{flex:1;min-height:0}.vault-tabs[_ngcontent-%COMP%]     .mat-mdc-tab-body .mat-mdc-tab-body-content{flex:1;min-height:0;overflow:hidden;display:flex;flex-direction:column}.vault-tab-content[_ngcontent-%COMP%]{flex:1;min-height:0;height:0;overflow:hidden;display:flex;flex-direction:column}.vault-tab-content[_ngcontent-%COMP%]   sdux-devtools-main-pipeline-panel[_ngcontent-%COMP%]{flex:1;min-height:0;height:0;overflow:hidden}@media(max-width:768px){.vault-tab-content[_ngcontent-%COMP%]{padding-right:.5rem}}.vault-tab-content[_ngcontent-%COMP%]::-webkit-scrollbar{width:8px}.vault-tab-content[_ngcontent-%COMP%]::-webkit-scrollbar-thumb{background-color:#63a4ff;border-radius:.25rem}.tab-label[_ngcontent-%COMP%]{display:flex;align-items:center;gap:.5rem}.tab-label[_ngcontent-%COMP%]   .tab-download-btn[_ngcontent-%COMP%]{display:inline-flex;align-items:center;justify-content:center;vertical-align:middle;background:none;border:none;color:#94a3b8;cursor:pointer;padding:.25rem;border-radius:.25rem;line-height:1}.tab-label[_ngcontent-%COMP%]   .tab-download-btn[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{font-size:1rem;width:1rem;height:1rem}.tab-label[_ngcontent-%COMP%]   .tab-download-btn[_ngcontent-%COMP%]:hover{color:#fff;background-color:#63a4ff}  .mat-mdc-tab-label-container{background-color:#fff;border-top-left-radius:.5rem;border-top-right-radius:.5rem}'],changeDetection:0})};var kI=[{path:"",component:hh},{path:"events",component:yh},{path:"**",redirectTo:""}];var AI={providers:[lm(),wg(),My(kI,xy()),kv({logLevel:"error"}),Rv(Et,{key:Zs,initialState:[]},[An])]};var OI=(()=>{class n{static \u0275fac=function(r){return new(r||n)};static \u0275mod=Me({type:n});static \u0275inj=De({imports:[gn]})}return n})();var MF=["mat-menu-item",""],xF=[[["mat-icon"],["","matMenuItemIcon",""]],"*"],RF=["mat-icon, [matMenuItemIcon]","*"];function kF(n,t){n&1&&(Kr(),b(0,"svg",2),Ce(1,"polygon",3),D())}var AF=["*"];function OF(n,t){if(n&1){let e=Kt();Jn(0,"div",0),As("click",function(){Ve(e);let i=ce();return Ue(i.closed.emit("click"))})("animationstart",function(i){Ve(e);let o=ce();return Ue(o._onAnimationStart(i.animationName))})("animationend",function(i){Ve(e);let o=ce();return Ue(o._onAnimationDone(i.animationName))})("animationcancel",function(i){Ve(e);let o=ce();return Ue(o._onAnimationDone(i.animationName))}),Jn(1,"div",1),er(2),Zr()()}if(n&2){let e=ce();tr(e._classList),je("mat-menu-panel-animations-disabled",e._animationsDisabled)("mat-menu-panel-exit-animation",e._panelAnimationState==="void")("mat-menu-panel-animating",e._isAnimating()),Id("id",e.panelId),ht("aria-label",e.ariaLabel||null)("aria-labelledby",e.ariaLabelledby||null)("aria-describedby",e.ariaDescribedby||null)}}var _b=new v("MAT_MENU_PANEL"),vc=(()=>{class n{_elementRef=f(re);_document=f(Z);_focusMonitor=f($i);_parentMenu=f(_b,{optional:!0});_changeDetectorRef=f(xt);role="menuitem";disabled=!1;disableRipple=!1;_hovered=new C;_focused=new C;_highlighted=!1;_triggersSubmenu=!1;constructor(){f(Bn).load(Kf),this._parentMenu?.addItem?.(this)}focus(e,r){this._focusMonitor&&e?this._focusMonitor.focusVia(this._getHostElement(),e,r):this._getHostElement().focus(r),this._focused.next(this)}ngAfterViewInit(){this._focusMonitor&&this._focusMonitor.monitor(this._elementRef,!1)}ngOnDestroy(){this._focusMonitor&&this._focusMonitor.stopMonitoring(this._elementRef),this._parentMenu&&this._parentMenu.removeItem&&this._parentMenu.removeItem(this),this._hovered.complete(),this._focused.complete()}_getTabIndex(){return this.disabled?"-1":"0"}_getHostElement(){return this._elementRef.nativeElement}_checkDisabled(e){this.disabled&&(e.preventDefault(),e.stopPropagation())}_handleMouseEnter(){this._hovered.next(this)}getLabel(){let e=this._elementRef.nativeElement.cloneNode(!0),r=e.querySelectorAll("mat-icon, .material-icons");for(let i=0;i<r.length;i++)r[i].remove();return e.textContent?.trim()||""}_setHighlighted(e){this._highlighted=e,this._changeDetectorRef.markForCheck()}_setTriggersSubmenu(e){this._triggersSubmenu=e,this._changeDetectorRef.markForCheck()}_hasFocus(){return this._document&&this._document.activeElement===this._getHostElement()}static \u0275fac=function(r){return new(r||n)};static \u0275cmp=oe({type:n,selectors:[["","mat-menu-item",""]],hostAttrs:[1,"mat-mdc-menu-item","mat-focus-indicator"],hostVars:8,hostBindings:function(r,i){r&1&&Ee("click",function(s){return i._checkDisabled(s)})("mouseenter",function(){return i._handleMouseEnter()}),r&2&&(ht("role",i.role)("tabindex",i._getTabIndex())("aria-disabled",i.disabled)("disabled",i.disabled||null),je("mat-mdc-menu-item-highlighted",i._highlighted)("mat-mdc-menu-item-submenu-trigger",i._triggersSubmenu))},inputs:{role:"role",disabled:[2,"disabled","disabled",we],disableRipple:[2,"disableRipple","disableRipple",we]},exportAs:["matMenuItem"],attrs:MF,ngContentSelectors:RF,decls:5,vars:3,consts:[[1,"mat-mdc-menu-item-text"],["matRipple","",1,"mat-mdc-menu-ripple",3,"matRippleDisabled","matRippleTrigger"],["viewBox","0 0 5 10","focusable","false","aria-hidden","true",1,"mat-mdc-menu-submenu-icon"],["points","0,0 5,5 0,10"]],template:function(r,i){r&1&&(Er(xF),er(0),b(1,"span",0),er(2,1),D(),Ce(3,"div",1),Xe(4,kF,2,0,":svg:svg",2)),r&2&&(R(3),Je("matRippleDisabled",i.disableRipple||i.disabled)("matRippleTrigger",i._getHostElement()),R(),Qe(i._triggersSubmenu?4:-1))},dependencies:[hc],encapsulation:2,changeDetection:0})}return n})();var NF=new v("MatMenuContent");var PF=new v("mat-menu-default-options",{providedIn:"root",factory:()=>({overlapTrigger:!1,xPosition:"after",yPosition:"below",backdropClass:"cdk-overlay-transparent-backdrop"})}),bb="_mat-menu-enter",vh="_mat-menu-exit",ma=(()=>{class n{_elementRef=f(re);_changeDetectorRef=f(xt);_injector=f(ne);_keyManager;_xPosition;_yPosition;_firstItemFocusRef;_exitFallbackTimeout;_animationsDisabled=$n();_allItems;_directDescendantItems=new Xn;_classList={};_panelAnimationState="void";_animationDone=new C;_isAnimating=ee(!1);parentMenu;direction;overlayPanelClass;backdropClass;ariaLabel;ariaLabelledby;ariaDescribedby;get xPosition(){return this._xPosition}set xPosition(e){this._xPosition=e,this.setPositionClasses()}get yPosition(){return this._yPosition}set yPosition(e){this._yPosition=e,this.setPositionClasses()}templateRef;items;lazyContent;overlapTrigger=!1;hasBackdrop;set panelClass(e){let r=this._previousPanelClass,i=g({},this._classList);r&&r.length&&r.split(" ").forEach(o=>{i[o]=!1}),this._previousPanelClass=e,e&&e.length&&(e.split(" ").forEach(o=>{i[o]=!0}),this._elementRef.nativeElement.className=""),this._classList=i}_previousPanelClass;get classList(){return this.panelClass}set classList(e){this.panelClass=e}closed=new te;close=this.closed;panelId=f(di).getId("mat-menu-panel-");constructor(){let e=f(PF);this.overlayPanelClass=e.overlayPanelClass||"",this._xPosition=e.xPosition,this._yPosition=e.yPosition,this.backdropClass=e.backdropClass,this.overlapTrigger=e.overlapTrigger,this.hasBackdrop=e.hasBackdrop}ngOnInit(){this.setPositionClasses()}ngAfterContentInit(){this._updateDirectDescendants(),this._keyManager=new Go(this._directDescendantItems).withWrap().withTypeAhead().withHomeAndEnd(),this._keyManager.tabOut.subscribe(()=>this.closed.emit("tab")),this._directDescendantItems.changes.pipe(Tt(this._directDescendantItems),dt(e=>Fr(...e.map(r=>r._focused)))).subscribe(e=>this._keyManager.updateActiveItem(e)),this._directDescendantItems.changes.subscribe(e=>{let r=this._keyManager;if(this._panelAnimationState==="enter"&&r.activeItem?._hasFocus()){let i=e.toArray(),o=Math.max(0,Math.min(i.length-1,r.activeItemIndex||0));i[o]&&!i[o].disabled?r.setActiveItem(o):r.setNextItemActive()}})}ngOnDestroy(){this._keyManager?.destroy(),this._directDescendantItems.destroy(),this.closed.complete(),this._firstItemFocusRef?.destroy(),clearTimeout(this._exitFallbackTimeout)}_hovered(){return this._directDescendantItems.changes.pipe(Tt(this._directDescendantItems),dt(r=>Fr(...r.map(i=>i._hovered))))}addItem(e){}removeItem(e){}_handleKeydown(e){let r=e.keyCode,i=this._keyManager;switch(r){case 27:zi(e)||(e.preventDefault(),this.closed.emit("keydown"));break;case 37:this.parentMenu&&this.direction==="ltr"&&this.closed.emit("keydown");break;case 39:this.parentMenu&&this.direction==="rtl"&&this.closed.emit("keydown");break;default:(r===38||r===40)&&i.setFocusOrigin("keyboard"),i.onKeydown(e);return}}focusFirstItem(e="program"){this._firstItemFocusRef?.destroy(),this._firstItemFocusRef=ft(()=>{let r=this._resolvePanel();if(!r||!r.contains(document.activeElement)){let i=this._keyManager;i.setFocusOrigin(e).setFirstItemActive(),!i.activeItem&&r&&r.focus()}},{injector:this._injector})}resetActiveItem(){this._keyManager.setActiveItem(-1)}setElevation(e){}setPositionClasses(e=this.xPosition,r=this.yPosition){this._classList=W(g({},this._classList),{"mat-menu-before":e==="before","mat-menu-after":e==="after","mat-menu-above":r==="above","mat-menu-below":r==="below"}),this._changeDetectorRef.markForCheck()}_onAnimationDone(e){let r=e===vh;(r||e===bb)&&(r&&(clearTimeout(this._exitFallbackTimeout),this._exitFallbackTimeout=void 0),this._animationDone.next(r?"void":"enter"),this._isAnimating.set(!1))}_onAnimationStart(e){(e===bb||e===vh)&&this._isAnimating.set(!0)}_setIsOpen(e){if(this._panelAnimationState=e?"enter":"void",e){if(this._keyManager.activeItemIndex===0){let r=this._resolvePanel();r&&(r.scrollTop=0)}}else this._animationsDisabled||(this._exitFallbackTimeout=setTimeout(()=>this._onAnimationDone(vh),200));this._animationsDisabled&&setTimeout(()=>{this._onAnimationDone(e?bb:vh)}),this._changeDetectorRef.markForCheck()}_updateDirectDescendants(){this._allItems.changes.pipe(Tt(this._allItems)).subscribe(e=>{this._directDescendantItems.reset(e.filter(r=>r._parentMenu===this)),this._directDescendantItems.notifyOnChanges()})}_resolvePanel(){let e=null;return this._directDescendantItems.length&&(e=this._directDescendantItems.first._getHostElement().closest('[role="menu"]')),e}static \u0275fac=function(r){return new(r||n)};static \u0275cmp=oe({type:n,selectors:[["mat-menu"]],contentQueries:function(r,i,o){if(r&1&&Xr(o,NF,5)(o,vc,5)(o,vc,4),r&2){let s;xe(s=Re())&&(i.lazyContent=s.first),xe(s=Re())&&(i._allItems=s),xe(s=Re())&&(i.items=s)}},viewQuery:function(r,i){if(r&1&&cn(bt,5),r&2){let o;xe(o=Re())&&(i.templateRef=o.first)}},hostVars:3,hostBindings:function(r,i){r&2&&ht("aria-label",null)("aria-labelledby",null)("aria-describedby",null)},inputs:{backdropClass:"backdropClass",ariaLabel:[0,"aria-label","ariaLabel"],ariaLabelledby:[0,"aria-labelledby","ariaLabelledby"],ariaDescribedby:[0,"aria-describedby","ariaDescribedby"],xPosition:"xPosition",yPosition:"yPosition",overlapTrigger:[2,"overlapTrigger","overlapTrigger",we],hasBackdrop:[2,"hasBackdrop","hasBackdrop",e=>e==null?null:we(e)],panelClass:[0,"class","panelClass"],classList:"classList"},outputs:{closed:"closed",close:"close"},exportAs:["matMenu"],features:[Mn([{provide:_b,useExisting:n}])],ngContentSelectors:AF,decls:1,vars:0,consts:[["tabindex","-1","role","menu",1,"mat-mdc-menu-panel",3,"click","animationstart","animationend","animationcancel","id"],[1,"mat-mdc-menu-content"]],template:function(r,i){r&1&&(Er(),Rs(0,OF,3,12,"ng-template"))},styles:[`mat-menu {
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
`],encapsulation:2,changeDetection:0})}return n})(),LF=new v("mat-menu-scroll-strategy",{providedIn:"root",factory:()=>{let n=f(ne);return()=>da(n)}});var pa=new WeakMap,FF=(()=>{class n{_canHaveBackdrop;_element=f(re);_viewContainerRef=f(at);_menuItemInstance=f(vc,{optional:!0,self:!0});_dir=f(Un,{optional:!0});_focusMonitor=f($i);_ngZone=f(j);_injector=f(ne);_scrollStrategy=f(LF);_changeDetectorRef=f(xt);_animationsDisabled=$n();_portal;_overlayRef=null;_menuOpen=!1;_closingActionsSubscription=H.EMPTY;_menuCloseSubscription=H.EMPTY;_pendingRemoval;_parentMaterialMenu;_parentInnerPadding;_openedBy=void 0;get _menu(){return this._menuInternal}set _menu(e){e!==this._menuInternal&&(this._menuInternal=e,this._menuCloseSubscription.unsubscribe(),e&&(this._parentMaterialMenu,this._menuCloseSubscription=e.close.subscribe(r=>{this._destroyMenu(r),(r==="click"||r==="tab")&&this._parentMaterialMenu&&this._parentMaterialMenu.closed.emit(r)})),this._menuItemInstance?._setTriggersSubmenu(this._triggersSubmenu()))}_menuInternal=null;constructor(e){this._canHaveBackdrop=e;let r=f(_b,{optional:!0});this._parentMaterialMenu=r instanceof ma?r:void 0}ngOnDestroy(){this._menu&&this._ownsMenu(this._menu)&&pa.delete(this._menu),this._pendingRemoval?.unsubscribe(),this._menuCloseSubscription.unsubscribe(),this._closingActionsSubscription.unsubscribe(),this._overlayRef&&(this._overlayRef.dispose(),this._overlayRef=null)}get menuOpen(){return this._menuOpen}get dir(){return this._dir&&this._dir.value==="rtl"?"rtl":"ltr"}_triggersSubmenu(){return!!(this._menuItemInstance&&this._parentMaterialMenu&&this._menu)}_closeMenu(){this._menu?.close.emit()}_openMenu(e){if(this._triggerIsAriaDisabled())return;let r=this._menu;if(this._menuOpen||!r)return;this._pendingRemoval?.unsubscribe();let i=pa.get(r);pa.set(r,this),i&&i!==this&&i._closeMenu();let o=this._createOverlay(r),s=o.getConfig(),a=s.positionStrategy;this._setPosition(r,a),this._canHaveBackdrop?s.hasBackdrop=r.hasBackdrop==null?!this._triggersSubmenu():r.hasBackdrop:s.hasBackdrop=r.hasBackdrop??!1,o.hasAttached()||(o.attach(this._getPortal(r)),r.lazyContent?.attach(this.menuData)),this._closingActionsSubscription=this._menuClosingActions().subscribe(()=>this._closeMenu()),r.parentMenu=this._triggersSubmenu()?this._parentMaterialMenu:void 0,r.direction=this.dir,e&&r.focusFirstItem(this._openedBy||"program"),this._setIsMenuOpen(!0),r instanceof ma&&(r._setIsOpen(!0),r._directDescendantItems.changes.pipe(Q(r.close)).subscribe(()=>{a.withLockedPosition(!1).reapplyLastPosition(),a.withLockedPosition(!0)}))}focus(e,r){this._focusMonitor&&e?this._focusMonitor.focusVia(this._element,e,r):this._element.nativeElement.focus(r)}_destroyMenu(e){let r=this._overlayRef,i=this._menu;!r||!this.menuOpen||(this._closingActionsSubscription.unsubscribe(),this._pendingRemoval?.unsubscribe(),i instanceof ma&&this._ownsMenu(i)?(this._pendingRemoval=i._animationDone.pipe(ut(1)).subscribe(()=>{r.detach(),pa.has(i)||i.lazyContent?.detach()}),i._setIsOpen(!1)):(r.detach(),i?.lazyContent?.detach()),i&&this._ownsMenu(i)&&pa.delete(i),this.restoreFocus&&(e==="keydown"||!this._openedBy||!this._triggersSubmenu())&&this.focus(this._openedBy),this._openedBy=void 0,this._setIsMenuOpen(!1))}_setIsMenuOpen(e){e!==this._menuOpen&&(this._menuOpen=e,this._menuOpen?this.menuOpened.emit():this.menuClosed.emit(),this._triggersSubmenu()&&this._menuItemInstance._setHighlighted(e),this._changeDetectorRef.markForCheck())}_createOverlay(e){if(!this._overlayRef){let r=this._getOverlayConfig(e);this._subscribeToPositions(e,r.positionStrategy),this._overlayRef=ha(this._injector,r),this._overlayRef.keydownEvents().subscribe(i=>{this._menu instanceof ma&&this._menu._handleKeydown(i)})}return this._overlayRef}_getOverlayConfig(e){return new ua({positionStrategy:fa(this._injector,this._getOverlayOrigin()).withLockedPosition().withGrowAfterOpen().withTransformOriginOn(".mat-menu-panel, .mat-mdc-menu-panel"),backdropClass:e.backdropClass||"cdk-overlay-transparent-backdrop",panelClass:e.overlayPanelClass,scrollStrategy:this._scrollStrategy(),direction:this._dir||"ltr",disableAnimations:this._animationsDisabled})}_subscribeToPositions(e,r){e.setPositionClasses&&r.positionChanges.subscribe(i=>{this._ngZone.run(()=>{let o=i.connectionPair.overlayX==="start"?"after":"before",s=i.connectionPair.overlayY==="top"?"below":"above";e.setPositionClasses(o,s)})})}_setPosition(e,r){let[i,o]=e.xPosition==="before"?["end","start"]:["start","end"],[s,a]=e.yPosition==="above"?["bottom","top"]:["top","bottom"],[l,c]=[s,a],[u,d]=[i,o],h=0;if(this._triggersSubmenu()){if(d=i=e.xPosition==="before"?"start":"end",o=u=i==="end"?"start":"end",this._parentMaterialMenu){if(this._parentInnerPadding==null){let p=this._parentMaterialMenu.items.first;this._parentInnerPadding=p?p._getHostElement().offsetTop:0}h=s==="bottom"?this._parentInnerPadding:-this._parentInnerPadding}}else e.overlapTrigger||(l=s==="top"?"bottom":"top",c=a==="top"?"bottom":"top");r.withPositions([{originX:i,originY:l,overlayX:u,overlayY:s,offsetY:h},{originX:o,originY:l,overlayX:d,overlayY:s,offsetY:h},{originX:i,originY:c,overlayX:u,overlayY:a,offsetY:-h},{originX:o,originY:c,overlayX:d,overlayY:a,offsetY:-h}])}_menuClosingActions(){let e=this._getOutsideClickStream(this._overlayRef),r=this._overlayRef.detachments(),i=this._parentMaterialMenu?this._parentMaterialMenu.closed:I(),o=this._parentMaterialMenu?this._parentMaterialMenu._hovered().pipe(ye(s=>this._menuOpen&&s!==this._menuItemInstance)):I();return Fr(e,i,o,r)}_getPortal(e){return(!this._portal||this._portal.templateRef!==e.templateRef)&&(this._portal=new ui(e.templateRef,this._viewContainerRef)),this._portal}_ownsMenu(e){return pa.get(e)===this}_triggerIsAriaDisabled(){return we(this._element.nativeElement.getAttribute("aria-disabled"))}static \u0275fac=function(r){vd()};static \u0275dir=le({type:n})}return n})(),NI=(()=>{class n extends FF{_cleanupTouchstart;_hoverSubscription=H.EMPTY;get _deprecatedMatMenuTriggerFor(){return this.menu}set _deprecatedMatMenuTriggerFor(e){this.menu=e}get menu(){return this._menu}set menu(e){this._menu=e}menuData;restoreFocus=!0;menuOpened=new te;onMenuOpen=this.menuOpened;menuClosed=new te;onMenuClose=this.menuClosed;constructor(){super(!0);let e=f(Bt);this._cleanupTouchstart=e.listen(this._element.nativeElement,"touchstart",r=>{zo(r)||(this._openedBy="touch")},{passive:!0})}triggersSubmenu(){return super._triggersSubmenu()}toggleMenu(){return this.menuOpen?this.closeMenu():this.openMenu()}openMenu(){this._openMenu(!0)}closeMenu(){this._closeMenu()}updatePosition(){this._overlayRef?.updatePosition()}ngAfterContentInit(){this._handleHover()}ngOnDestroy(){super.ngOnDestroy(),this._cleanupTouchstart(),this._hoverSubscription.unsubscribe()}_getOverlayOrigin(){return this._element}_getOutsideClickStream(e){return e.backdropClick()}_handleMousedown(e){Ho(e)||(this._openedBy=e.button===0?"mouse":void 0,this.triggersSubmenu()&&e.preventDefault())}_handleKeydown(e){let r=e.keyCode;(r===13||r===32)&&(this._openedBy="keyboard"),this.triggersSubmenu()&&(r===39&&this.dir==="ltr"||r===37&&this.dir==="rtl")&&(this._openedBy="keyboard",this.openMenu())}_handleClick(e){this.triggersSubmenu()?(e.stopPropagation(),this.openMenu()):this.toggleMenu()}_handleHover(){this.triggersSubmenu()&&this._parentMaterialMenu&&(this._hoverSubscription=this._parentMaterialMenu._hovered().subscribe(e=>{e===this._menuItemInstance&&!e.disabled&&this._parentMaterialMenu?._panelAnimationState!=="void"&&(this._openedBy="mouse",this._openMenu(!1))}))}static \u0275fac=function(r){return new(r||n)};static \u0275dir=le({type:n,selectors:[["","mat-menu-trigger-for",""],["","matMenuTriggerFor",""]],hostAttrs:[1,"mat-mdc-menu-trigger"],hostVars:3,hostBindings:function(r,i){r&1&&Ee("click",function(s){return i._handleClick(s)})("mousedown",function(s){return i._handleMousedown(s)})("keydown",function(s){return i._handleKeydown(s)}),r&2&&ht("aria-haspopup",i.menu?"menu":null)("aria-expanded",i.menuOpen)("aria-controls",i.menuOpen?i.menu==null?null:i.menu.panelId:null)},inputs:{_deprecatedMatMenuTriggerFor:[0,"mat-menu-trigger-for","_deprecatedMatMenuTriggerFor"],menu:[0,"matMenuTriggerFor","menu"],menuData:[0,"matMenuTriggerData","menuData"],restoreFocus:[0,"matMenuTriggerRestoreFocus","restoreFocus"]},outputs:{menuOpened:"menuOpened",onMenuOpen:"onMenuOpen",menuClosed:"menuClosed",onMenuClose:"onMenuClose"},exportAs:["matMenuTrigger"],features:[jt]})}return n})();var PI=(()=>{class n{static \u0275fac=function(r){return new(r||n)};static \u0275mod=Me({type:n});static \u0275inj=De({imports:[OI,mc,gn,Ko]})}return n})();var bh=class n{version=f(yc);static \u0275fac=function(e){return new(e||n)};static \u0275cmp=oe({type:n,selectors:[["sdux-toolbar"]],decls:16,vars:2,consts:[["toolbarMenu","matMenu"],[1,"toolbar"],[1,"toolbar-brand"],["src","/assets/brand/brand-landscape-dark.svg","alt","SDuX Vault","matTooltip","SDuX Vault DevTools",1,"toolbar-logo"],[1,"toolbar-version"],["type","button","aria-label","Open menu","matTooltip","Menu",1,"toolbar-menu-btn",3,"matMenuTriggerFor"],["xmlns","http://www.w3.org/2000/svg","viewBox","0 0 24 24","fill","currentColor","width","24","height","24",1,"menu-icon"],["cx","12","cy","5","r","2"],["cx","12","cy","12","r","2"],["cx","12","cy","19","r","2"],["mat-menu-item","","routerLink","/"],["mat-menu-item","","routerLink","/events"]],template:function(e,r){if(e&1&&(b(0,"div",1)(1,"div",2),Ce(2,"img",3),b(3,"span",4),A(4),D()(),b(5,"button",5),Kr(),b(6,"svg",6),Ce(7,"circle",7)(8,"circle",8)(9,"circle",9),D()(),ku(),b(10,"mat-menu",null,0)(12,"a",10),A(13,"Home"),D(),b(14,"a",11),A(15,"Events"),D()()()),e&2){let i=Os(11);R(4),lt("DevTools (v",r.version,")"),R(),Je("matMenuTriggerFor",i)}},dependencies:[PI,ma,vc,NI,Or,dr,Ef],styles:[".pointer[_ngcontent-%COMP%]{cursor:pointer}[_nghost-%COMP%]{display:block;width:100%}.toolbar[_ngcontent-%COMP%]{display:flex;justify-content:space-between;align-items:center;width:100%;margin-bottom:.5rem;padding-bottom:.5rem;border-bottom:1px solid #63a4ff}.toolbar[_ngcontent-%COMP%]   .toolbar-brand[_ngcontent-%COMP%]{display:flex;align-items:center;gap:.5rem}.toolbar[_ngcontent-%COMP%]   .toolbar-brand[_ngcontent-%COMP%]   .toolbar-logo[_ngcontent-%COMP%]{width:120px}.toolbar[_ngcontent-%COMP%]   .toolbar-brand[_ngcontent-%COMP%]   .toolbar-version[_ngcontent-%COMP%]{color:#94a3b8;font-weight:400;font-family:Inter,system-ui,sans-serif;font-size:1rem}@media(max-width:768px){.toolbar[_ngcontent-%COMP%]   .toolbar-brand[_ngcontent-%COMP%]   .toolbar-version[_ngcontent-%COMP%]{display:none}}.toolbar[_ngcontent-%COMP%]   .toolbar-menu-btn[_ngcontent-%COMP%]{background:transparent;border:none;color:inherit;display:flex;align-items:center;justify-content:center;cursor:pointer}.toolbar[_ngcontent-%COMP%]   .toolbar-menu-btn[_ngcontent-%COMP%]:hover{background-color:#ffffff14!important}.toolbar[_ngcontent-%COMP%]   .toolbar-menu-btn[_ngcontent-%COMP%]   .menu-icon[_ngcontent-%COMP%]{width:20px;height:20px}"],changeDetection:0})};var _h=class n{static \u0275fac=function(e){return new(e||n)};static \u0275cmp=oe({type:n,selectors:[["sdux-devtools-root"]],decls:5,vars:0,consts:[[1,"app-shell"],[1,"toolbar-wrapper"],[1,"router-container"]],template:function(e,r){e&1&&(b(0,"div",0)(1,"div",1),Ce(2,"sdux-toolbar"),D(),b(3,"div",2),Ce(4,"router-outlet"),D()())},dependencies:[Hl,bh],styles:[".pointer[_ngcontent-%COMP%]{cursor:pointer}[_nghost-%COMP%]{display:block;height:100vh}.app-shell[_ngcontent-%COMP%]{display:flex;flex-direction:column;height:100%;padding:1rem;background-color:#1f2a3a;border:1px solid #63a4ff;color:#e2e8f0;font-weight:400;font-family:Inter,system-ui,sans-serif}.toolbar-wrapper[_ngcontent-%COMP%]{width:100%;flex-shrink:0}.router-container[_ngcontent-%COMP%]{flex:1;width:100%;min-height:0;overflow:hidden;display:flex;flex-direction:column}"],changeDetection:0})};ny(_h,AI).catch(n=>console.error(n));
