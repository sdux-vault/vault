var MC=Object.defineProperty,KI=Object.defineProperties,YI=Object.getOwnPropertyDescriptor,ZI=Object.getOwnPropertyDescriptors;var TC=Object.getOwnPropertySymbols;var XI=Object.prototype.hasOwnProperty,QI=Object.prototype.propertyIsEnumerable;var IC=n=>{throw TypeError(n)};var Fh=(n,t,e)=>t in n?MC(n,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):n[t]=e,b=(n,t)=>{for(var e in t||={})XI.call(t,e)&&Fh(n,e,t[e]);if(TC)for(var e of TC(t))QI.call(t,e)&&Fh(n,e,t[e]);return n},$=(n,t)=>KI(n,ZI(t));var Se=(n,t,e,i)=>{for(var r=i>1?void 0:i?YI(t,e):t,o=n.length-1,s;o>=0;o--)(s=n[o])&&(r=(i?s(t,e,r):s(r))||r);return i&&r&&MC(t,e,r),r};var I=(n,t,e)=>Fh(n,typeof t!="symbol"?t+"":t,e),Lh=(n,t,e)=>t.has(n)||IC("Cannot "+e);var Vh=(n,t,e)=>(Lh(n,t,"read from private field"),e?e.call(n):t.get(n)),Is=(n,t,e)=>t.has(n)?IC("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(n):t.set(n,e),Bh=(n,t,e,i)=>(Lh(n,t,"write to private field"),i?i.call(n,e):t.set(n,e),e),Zi=(n,t,e)=>(Lh(n,t,"access private method"),e);var Ht=null,yd=!1,jh=1,JI=null,ct=Symbol("SIGNAL");function z(n){let t=Ht;return Ht=n,t}function vd(){return Ht}var Rr={version:0,lastCleanEpoch:0,dirty:!1,producers:void 0,producersTail:void 0,consumers:void 0,consumersTail:void 0,recomputing:!1,consumerAllowSignalWrites:!1,consumerIsAlwaysLive:!1,kind:"unknown",producerMustRecompute:()=>!1,producerRecomputeValue:()=>{},consumerMarkedDirty:()=>{},consumerOnSignalRead:()=>{}};function Pr(n){if(yd)throw new Error("");if(Ht===null)return;Ht.consumerOnSignalRead(n);let t=Ht.producersTail;if(t!==void 0&&t.producer===n)return;let e,i=Ht.recomputing;if(i&&(e=t!==void 0?t.nextProducer:Ht.producers,e!==void 0&&e.producer===n)){Ht.producersTail=e,e.lastReadVersion=n.version;return}let r=n.consumersTail;if(r!==void 0&&r.consumer===Ht&&(!i||tk(r,Ht)))return;let o=Os(Ht),s={producer:n,consumer:Ht,nextProducer:e,prevConsumer:r,lastReadVersion:n.version,nextConsumer:void 0};Ht.producersTail=s,t!==void 0?t.nextProducer=s:Ht.producers=s,o&&RC(n,s)}function kC(){jh++}function wo(n){if(!(Os(n)&&!n.dirty)&&!(!n.dirty&&n.lastCleanEpoch===jh)){if(!n.producerMustRecompute(n)&&!As(n)){ks(n);return}n.producerRecomputeValue(n),ks(n)}}function Uh(n){if(n.consumers===void 0)return;let t=yd;yd=!0;try{for(let e=n.consumers;e!==void 0;e=e.nextConsumer){let i=e.consumer;i.dirty||ek(i)}}finally{yd=t}}function Hh(){return Ht?.consumerAllowSignalWrites!==!1}function ek(n){n.dirty=!0,Uh(n),n.consumerMarkedDirty?.(n)}function ks(n){n.dirty=!1,n.lastCleanEpoch=jh}function Xi(n){return n&&AC(n),z(n)}function AC(n){n.producersTail=void 0,n.recomputing=!0}function Nr(n,t){z(t),n&&OC(n)}function OC(n){n.recomputing=!1;let t=n.producersTail,e=t!==void 0?t.nextProducer:n.producers;if(e!==void 0){if(Os(n))do e=$h(e);while(e!==void 0);t!==void 0?t.nextProducer=void 0:n.producers=void 0}}function As(n){for(let t=n.producers;t!==void 0;t=t.nextProducer){let e=t.producer,i=t.lastReadVersion;if(i!==e.version||(wo(e),i!==e.version))return!0}return!1}function Fr(n){if(Os(n)){let t=n.producers;for(;t!==void 0;)t=$h(t)}n.producers=void 0,n.producersTail=void 0,n.consumers=void 0,n.consumersTail=void 0}function RC(n,t){let e=n.consumersTail,i=Os(n);if(e!==void 0?(t.nextConsumer=e.nextConsumer,e.nextConsumer=t):(t.nextConsumer=void 0,n.consumers=t),t.prevConsumer=e,n.consumersTail=t,!i)for(let r=n.producers;r!==void 0;r=r.nextProducer)RC(r.producer,r)}function $h(n){let t=n.producer,e=n.nextProducer,i=n.nextConsumer,r=n.prevConsumer;if(n.nextConsumer=void 0,n.prevConsumer=void 0,i!==void 0?i.prevConsumer=r:t.consumersTail=r,r!==void 0)r.nextConsumer=i;else if(t.consumers=i,!Os(t)){let o=t.producers;for(;o!==void 0;)o=$h(o)}return e}function Os(n){return n.consumerIsAlwaysLive||n.consumers!==void 0}function tl(n){JI?.(n)}function tk(n,t){let e=t.producersTail;if(e!==void 0){let i=t.producers;do{if(i===n)return!0;if(i===e)break;i=i.nextProducer}while(i!==void 0)}return!1}function nl(n,t){return Object.is(n,t)}function il(n,t){let e=Object.create(nk);e.computation=n,t!==void 0&&(e.equal=t);let i=()=>{if(wo(e),Pr(e),e.value===Oi)throw e.error;return e.value};return i[ct]=e,tl(e),i}var Do=Symbol("UNSET"),Eo=Symbol("COMPUTING"),Oi=Symbol("ERRORED"),nk=$(b({},Rr),{value:Do,dirty:!0,error:null,equal:nl,kind:"computed",producerMustRecompute(n){return n.value===Do||n.value===Eo},producerRecomputeValue(n){if(n.value===Eo)throw new Error("");let t=n.value;n.value=Eo;let e=Xi(n),i,r=!1;try{i=n.computation(),z(null),r=t!==Do&&t!==Oi&&i!==Oi&&n.equal(t,i)}catch(o){i=Oi,n.error=o}finally{Nr(n,e)}if(r){n.value=t;return}n.value=i,n.version++}});function ik(){throw new Error}var PC=ik;function NC(n){PC(n)}function zh(n){PC=n}var rk=null;function Wh(n,t){let e=Object.create(rl);e.value=n,t!==void 0&&(e.equal=t);let i=()=>FC(e);return i[ct]=e,tl(e),[i,s=>So(e,s),s=>_d(e,s)]}function FC(n){return Pr(n),n.value}function So(n,t){Hh()||NC(n),n.equal(n.value,t)||(n.value=t,ok(n))}function _d(n,t){Hh()||NC(n),So(n,t(n.value))}var rl=$(b({},Rr),{equal:nl,value:void 0,kind:"signal"});function ok(n){n.version++,kC(),Uh(n),rk?.(n)}var Gh=$(b({},Rr),{consumerIsAlwaysLive:!0,consumerAllowSignalWrites:!0,dirty:!0,kind:"effect"});function qh(n){if(n.dirty=!1,n.version>0&&!As(n))return;n.version++;let t=Xi(n);try{n.cleanup(),n.fn()}finally{Nr(n,t)}}function ge(n){return typeof n=="function"}function Rs(n){let e=n(i=>{Error.call(i),i.stack=new Error().stack});return e.prototype=Object.create(Error.prototype),e.prototype.constructor=e,e}var bd=Rs(n=>function(e){n(this),this.message=e?`${e.length} errors occurred during unsubscription:
${e.map((i,r)=>`${r+1}) ${i.toString()}`).join(`
  `)}`:"",this.name="UnsubscriptionError",this.errors=e});function xo(n,t){if(n){let e=n.indexOf(t);0<=e&&n.splice(e,1)}}var Z=class n{constructor(t){this.initialTeardown=t,this.closed=!1,this._parentage=null,this._finalizers=null}unsubscribe(){let t;if(!this.closed){this.closed=!0;let{_parentage:e}=this;if(e)if(this._parentage=null,Array.isArray(e))for(let o of e)o.remove(this);else e.remove(this);let{initialTeardown:i}=this;if(ge(i))try{i()}catch(o){t=o instanceof bd?o.errors:[o]}let{_finalizers:r}=this;if(r){this._finalizers=null;for(let o of r)try{LC(o)}catch(s){t=t??[],s instanceof bd?t=[...t,...s.errors]:t.push(s)}}if(t)throw new bd(t)}}add(t){var e;if(t&&t!==this)if(this.closed)LC(t);else{if(t instanceof n){if(t.closed||t._hasParent(this))return;t._addParent(this)}(this._finalizers=(e=this._finalizers)!==null&&e!==void 0?e:[]).push(t)}}_hasParent(t){let{_parentage:e}=this;return e===t||Array.isArray(e)&&e.includes(t)}_addParent(t){let{_parentage:e}=this;this._parentage=Array.isArray(e)?(e.push(t),e):e?[e,t]:t}_removeParent(t){let{_parentage:e}=this;e===t?this._parentage=null:Array.isArray(e)&&xo(e,t)}remove(t){let{_finalizers:e}=this;e&&xo(e,t),t instanceof n&&t._removeParent(this)}};Z.EMPTY=(()=>{let n=new Z;return n.closed=!0,n})();var Kh=Z.EMPTY;function Cd(n){return n instanceof Z||n&&"closed"in n&&ge(n.remove)&&ge(n.add)&&ge(n.unsubscribe)}function LC(n){ge(n)?n():n.unsubscribe()}var ci={onUnhandledError:null,onStoppedNotification:null,Promise:void 0,useDeprecatedSynchronousErrorHandling:!1,useDeprecatedNextContext:!1};var Ps={setTimeout(n,t,...e){let{delegate:i}=Ps;return i?.setTimeout?i.setTimeout(n,t,...e):setTimeout(n,t,...e)},clearTimeout(n){let{delegate:t}=Ps;return(t?.clearTimeout||clearTimeout)(n)},delegate:void 0};function Dd(n){Ps.setTimeout(()=>{let{onUnhandledError:t}=ci;if(t)t(n);else throw n})}function ol(){}var VC=Yh("C",void 0,void 0);function BC(n){return Yh("E",void 0,n)}function jC(n){return Yh("N",n,void 0)}function Yh(n,t,e){return{kind:n,value:t,error:e}}var To=null;function Ns(n){if(ci.useDeprecatedSynchronousErrorHandling){let t=!To;if(t&&(To={errorThrown:!1,error:null}),n(),t){let{errorThrown:e,error:i}=To;if(To=null,e)throw i}}else n()}function UC(n){ci.useDeprecatedSynchronousErrorHandling&&To&&(To.errorThrown=!0,To.error=n)}var Mo=class extends Z{constructor(t){super(),this.isStopped=!1,t?(this.destination=t,Cd(t)&&t.add(this)):this.destination=lk}static create(t,e,i){return new di(t,e,i)}next(t){this.isStopped?Xh(jC(t),this):this._next(t)}error(t){this.isStopped?Xh(BC(t),this):(this.isStopped=!0,this._error(t))}complete(){this.isStopped?Xh(VC,this):(this.isStopped=!0,this._complete())}unsubscribe(){this.closed||(this.isStopped=!0,super.unsubscribe(),this.destination=null)}_next(t){this.destination.next(t)}_error(t){try{this.destination.error(t)}finally{this.unsubscribe()}}_complete(){try{this.destination.complete()}finally{this.unsubscribe()}}},sk=Function.prototype.bind;function Zh(n,t){return sk.call(n,t)}var Qh=class{constructor(t){this.partialObserver=t}next(t){let{partialObserver:e}=this;if(e.next)try{e.next(t)}catch(i){Ed(i)}}error(t){let{partialObserver:e}=this;if(e.error)try{e.error(t)}catch(i){Ed(i)}else Ed(t)}complete(){let{partialObserver:t}=this;if(t.complete)try{t.complete()}catch(e){Ed(e)}}},di=class extends Mo{constructor(t,e,i){super();let r;if(ge(t)||!t)r={next:t??void 0,error:e??void 0,complete:i??void 0};else{let o;this&&ci.useDeprecatedNextContext?(o=Object.create(t),o.unsubscribe=()=>this.unsubscribe(),r={next:t.next&&Zh(t.next,o),error:t.error&&Zh(t.error,o),complete:t.complete&&Zh(t.complete,o)}):r=t}this.destination=new Qh(r)}};function Ed(n){ci.useDeprecatedSynchronousErrorHandling?UC(n):Dd(n)}function ak(n){throw n}function Xh(n,t){let{onStoppedNotification:e}=ci;e&&Ps.setTimeout(()=>e(n,t))}var lk={closed:!0,next:ol,error:ak,complete:ol};var Fs=typeof Symbol=="function"&&Symbol.observable||"@@observable";function Tn(n){return n}function Jh(...n){return em(n)}function em(n){return n.length===0?Tn:n.length===1?n[0]:function(e){return n.reduce((i,r)=>r(i),e)}}var q=(()=>{class n{constructor(e){e&&(this._subscribe=e)}lift(e){let i=new n;return i.source=this,i.operator=e,i}subscribe(e,i,r){let o=dk(e)?e:new di(e,i,r);return Ns(()=>{let{operator:s,source:a}=this;o.add(s?s.call(o,a):a?this._subscribe(o):this._trySubscribe(o))}),o}_trySubscribe(e){try{return this._subscribe(e)}catch(i){e.error(i)}}forEach(e,i){return i=HC(i),new i((r,o)=>{let s=new di({next:a=>{try{e(a)}catch(l){o(l),s.unsubscribe()}},error:o,complete:r});this.subscribe(s)})}_subscribe(e){var i;return(i=this.source)===null||i===void 0?void 0:i.subscribe(e)}[Fs](){return this}pipe(...e){return em(e)(this)}toPromise(e){return e=HC(e),new e((i,r)=>{let o;this.subscribe(s=>o=s,s=>r(s),()=>i(o))})}}return n.create=t=>new n(t),n})();function HC(n){var t;return(t=n??ci.Promise)!==null&&t!==void 0?t:Promise}function ck(n){return n&&ge(n.next)&&ge(n.error)&&ge(n.complete)}function dk(n){return n&&n instanceof Mo||ck(n)&&Cd(n)}function tm(n){return ge(n?.lift)}function pe(n){return t=>{if(tm(t))return t.lift(function(e){try{return n(e,this)}catch(i){this.error(i)}});throw new TypeError("Unable to lift unknown Observable type")}}function ue(n,t,e,i,r){return new nm(n,t,e,i,r)}var nm=class extends Mo{constructor(t,e,i,r,o,s){super(t),this.onFinalize=o,this.shouldUnsubscribe=s,this._next=e?function(a){try{e(a)}catch(l){t.error(l)}}:super._next,this._error=r?function(a){try{r(a)}catch(l){t.error(l)}finally{this.unsubscribe()}}:super._error,this._complete=i?function(){try{i()}catch(a){t.error(a)}finally{this.unsubscribe()}}:super._complete}unsubscribe(){var t;if(!this.shouldUnsubscribe||this.shouldUnsubscribe()){let{closed:e}=this;super.unsubscribe(),!e&&((t=this.onFinalize)===null||t===void 0||t.call(this))}}};function $C(){return pe((n,t)=>{let e=null;n._refCount++;let i=ue(t,void 0,void 0,void 0,()=>{if(!n||n._refCount<=0||0<--n._refCount){e=null;return}let r=n._connection,o=e;e=null,r&&(!o||r===o)&&r.unsubscribe(),t.unsubscribe()});n.subscribe(i),i.closed||(e=n.connect())})}var sl=class extends q{constructor(t,e){super(),this.source=t,this.subjectFactory=e,this._subject=null,this._refCount=0,this._connection=null,tm(t)&&(this.lift=t.lift)}_subscribe(t){return this.getSubject().subscribe(t)}getSubject(){let t=this._subject;return(!t||t.isStopped)&&(this._subject=this.subjectFactory()),this._subject}_teardown(){this._refCount=0;let{_connection:t}=this;this._subject=this._connection=null,t?.unsubscribe()}connect(){let t=this._connection;if(!t){t=this._connection=new Z;let e=this.getSubject();t.add(this.source.subscribe(ue(e,void 0,()=>{this._teardown(),e.complete()},i=>{this._teardown(),e.error(i)},()=>this._teardown()))),t.closed&&(this._connection=null,t=Z.EMPTY)}return t}refCount(){return $C()(this)}};var Ls={schedule(n){let t=requestAnimationFrame,e=cancelAnimationFrame,{delegate:i}=Ls;i&&(t=i.requestAnimationFrame,e=i.cancelAnimationFrame);let r=t(o=>{e=void 0,n(o)});return new Z(()=>e?.(r))},requestAnimationFrame(...n){let{delegate:t}=Ls;return(t?.requestAnimationFrame||requestAnimationFrame)(...n)},cancelAnimationFrame(...n){let{delegate:t}=Ls;return(t?.cancelAnimationFrame||cancelAnimationFrame)(...n)},delegate:void 0};var zC=Rs(n=>function(){n(this),this.name="ObjectUnsubscribedError",this.message="object unsubscribed"});var E=(()=>{class n extends q{constructor(){super(),this.closed=!1,this.currentObservers=null,this.observers=[],this.isStopped=!1,this.hasError=!1,this.thrownError=null}lift(e){let i=new wd(this,this);return i.operator=e,i}_throwIfClosed(){if(this.closed)throw new zC}next(e){Ns(()=>{if(this._throwIfClosed(),!this.isStopped){this.currentObservers||(this.currentObservers=Array.from(this.observers));for(let i of this.currentObservers)i.next(e)}})}error(e){Ns(()=>{if(this._throwIfClosed(),!this.isStopped){this.hasError=this.isStopped=!0,this.thrownError=e;let{observers:i}=this;for(;i.length;)i.shift().error(e)}})}complete(){Ns(()=>{if(this._throwIfClosed(),!this.isStopped){this.isStopped=!0;let{observers:e}=this;for(;e.length;)e.shift().complete()}})}unsubscribe(){this.isStopped=this.closed=!0,this.observers=this.currentObservers=null}get observed(){var e;return((e=this.observers)===null||e===void 0?void 0:e.length)>0}_trySubscribe(e){return this._throwIfClosed(),super._trySubscribe(e)}_subscribe(e){return this._throwIfClosed(),this._checkFinalizedStatuses(e),this._innerSubscribe(e)}_innerSubscribe(e){let{hasError:i,isStopped:r,observers:o}=this;return i||r?Kh:(this.currentObservers=null,o.push(e),new Z(()=>{this.currentObservers=null,xo(o,e)}))}_checkFinalizedStatuses(e){let{hasError:i,thrownError:r,isStopped:o}=this;i?e.error(r):o&&e.complete()}asObservable(){let e=new q;return e.source=this,e}}return n.create=(t,e)=>new wd(t,e),n})(),wd=class extends E{constructor(t,e){super(),this.destination=t,this.source=e}next(t){var e,i;(i=(e=this.destination)===null||e===void 0?void 0:e.next)===null||i===void 0||i.call(e,t)}error(t){var e,i;(i=(e=this.destination)===null||e===void 0?void 0:e.error)===null||i===void 0||i.call(e,t)}complete(){var t,e;(e=(t=this.destination)===null||t===void 0?void 0:t.complete)===null||e===void 0||e.call(t)}_subscribe(t){var e,i;return(i=(e=this.source)===null||e===void 0?void 0:e.subscribe(t))!==null&&i!==void 0?i:Kh}};var ot=class extends E{constructor(t){super(),this._value=t}get value(){return this.getValue()}_subscribe(t){let e=super._subscribe(t);return!e.closed&&t.next(this._value),e}getValue(){let{hasError:t,thrownError:e,_value:i}=this;if(t)throw e;return this._throwIfClosed(),i}next(t){super.next(this._value=t)}};var al={now(){return(al.delegate||Date).now()},delegate:void 0};var Lr=class extends E{constructor(t=1/0,e=1/0,i=al){super(),this._bufferSize=t,this._windowTime=e,this._timestampProvider=i,this._buffer=[],this._infiniteTimeWindow=!0,this._infiniteTimeWindow=e===1/0,this._bufferSize=Math.max(1,t),this._windowTime=Math.max(1,e)}next(t){let{isStopped:e,_buffer:i,_infiniteTimeWindow:r,_timestampProvider:o,_windowTime:s}=this;e||(i.push(t),!r&&i.push(o.now()+s)),this._trimBuffer(),super.next(t)}_subscribe(t){this._throwIfClosed(),this._trimBuffer();let e=this._innerSubscribe(t),{_infiniteTimeWindow:i,_buffer:r}=this,o=r.slice();for(let s=0;s<o.length&&!t.closed;s+=i?1:2)t.next(o[s]);return this._checkFinalizedStatuses(t),e}_trimBuffer(){let{_bufferSize:t,_timestampProvider:e,_buffer:i,_infiniteTimeWindow:r}=this,o=(r?1:2)*t;if(t<1/0&&o<i.length&&i.splice(0,i.length-o),!r){let s=e.now(),a=0;for(let l=1;l<i.length&&i[l]<=s;l+=2)a=l;a&&i.splice(0,a+1)}}};var Sd=class extends Z{constructor(t,e){super()}schedule(t,e=0){return this}};var ll={setInterval(n,t,...e){let{delegate:i}=ll;return i?.setInterval?i.setInterval(n,t,...e):setInterval(n,t,...e)},clearInterval(n){let{delegate:t}=ll;return(t?.clearInterval||clearInterval)(n)},delegate:void 0};var Vr=class extends Sd{constructor(t,e){super(t,e),this.scheduler=t,this.work=e,this.pending=!1}schedule(t,e=0){var i;if(this.closed)return this;this.state=t;let r=this.id,o=this.scheduler;return r!=null&&(this.id=this.recycleAsyncId(o,r,e)),this.pending=!0,this.delay=e,this.id=(i=this.id)!==null&&i!==void 0?i:this.requestAsyncId(o,this.id,e),this}requestAsyncId(t,e,i=0){return ll.setInterval(t.flush.bind(t,this),i)}recycleAsyncId(t,e,i=0){if(i!=null&&this.delay===i&&this.pending===!1)return e;e!=null&&ll.clearInterval(e)}execute(t,e){if(this.closed)return new Error("executing a cancelled action");this.pending=!1;let i=this._execute(t,e);if(i)return i;this.pending===!1&&this.id!=null&&(this.id=this.recycleAsyncId(this.scheduler,this.id,null))}_execute(t,e){let i=!1,r;try{this.work(t)}catch(o){i=!0,r=o||new Error("Scheduled action threw falsy error")}if(i)return this.unsubscribe(),r}unsubscribe(){if(!this.closed){let{id:t,scheduler:e}=this,{actions:i}=e;this.work=this.state=this.scheduler=null,this.pending=!1,xo(i,this),t!=null&&(this.id=this.recycleAsyncId(e,t,null)),this.delay=null,super.unsubscribe()}}};var uk=1,im,rm={};function WC(n){return n in rm?(delete rm[n],!0):!1}var GC={setImmediate(n){let t=uk++;return rm[t]=!0,im||(im=Promise.resolve()),im.then(()=>WC(t)&&n()),t},clearImmediate(n){WC(n)}};var{setImmediate:fk,clearImmediate:pk}=GC,cl={setImmediate(...n){let{delegate:t}=cl;return(t?.setImmediate||fk)(...n)},clearImmediate(n){let{delegate:t}=cl;return(t?.clearImmediate||pk)(n)},delegate:void 0};var xd=class extends Vr{constructor(t,e){super(t,e),this.scheduler=t,this.work=e}requestAsyncId(t,e,i=0){return i!==null&&i>0?super.requestAsyncId(t,e,i):(t.actions.push(this),t._scheduled||(t._scheduled=cl.setImmediate(t.flush.bind(t,void 0))))}recycleAsyncId(t,e,i=0){var r;if(i!=null?i>0:this.delay>0)return super.recycleAsyncId(t,e,i);let{actions:o}=t;e!=null&&((r=o[o.length-1])===null||r===void 0?void 0:r.id)!==e&&(cl.clearImmediate(e),t._scheduled===e&&(t._scheduled=void 0))}};var Vs=class n{constructor(t,e=n.now){this.schedulerActionCtor=t,this.now=e}schedule(t,e=0,i){return new this.schedulerActionCtor(this,t).schedule(i,e)}};Vs.now=al.now;var Br=class extends Vs{constructor(t,e=Vs.now){super(t,e),this.actions=[],this._active=!1}flush(t){let{actions:e}=this;if(this._active){e.push(t);return}let i;this._active=!0;do if(i=t.execute(t.state,t.delay))break;while(t=e.shift());if(this._active=!1,i){for(;t=e.shift();)t.unsubscribe();throw i}}};var Td=class extends Br{flush(t){this._active=!0;let e=this._scheduled;this._scheduled=void 0;let{actions:i}=this,r;t=t||i.shift();do if(r=t.execute(t.state,t.delay))break;while((t=i[0])&&t.id===e&&i.shift());if(this._active=!1,r){for(;(t=i[0])&&t.id===e&&i.shift();)t.unsubscribe();throw r}}};var om=new Td(xd);var dl=new Br(Vr),qC=dl;var Md=class extends Vr{constructor(t,e){super(t,e),this.scheduler=t,this.work=e}requestAsyncId(t,e,i=0){return i!==null&&i>0?super.requestAsyncId(t,e,i):(t.actions.push(this),t._scheduled||(t._scheduled=Ls.requestAnimationFrame(()=>t.flush(void 0))))}recycleAsyncId(t,e,i=0){var r;if(i!=null?i>0:this.delay>0)return super.recycleAsyncId(t,e,i);let{actions:o}=t;e!=null&&e===t._scheduled&&((r=o[o.length-1])===null||r===void 0?void 0:r.id)!==e&&(Ls.cancelAnimationFrame(e),t._scheduled=void 0)}};var Id=class extends Br{flush(t){this._active=!0;let e;t?e=t.id:(e=this._scheduled,this._scheduled=void 0);let{actions:i}=this,r;t=t||i.shift();do if(r=t.execute(t.state,t.delay))break;while((t=i[0])&&t.id===e&&i.shift());if(this._active=!1,r){for(;(t=i[0])&&t.id===e&&i.shift();)t.unsubscribe();throw r}}};var sm=new Id(Md);var He=new q(n=>n.complete());function kd(n){return n&&ge(n.schedule)}function am(n){return n[n.length-1]}function Ad(n){return ge(am(n))?n.pop():void 0}function Ri(n){return kd(am(n))?n.pop():void 0}function KC(n,t){return typeof am(n)=="number"?n.pop():t}function ul(n,t,e,i){var r=arguments.length,o=r<3?t:i===null?i=Object.getOwnPropertyDescriptor(t,e):i,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")o=Reflect.decorate(n,t,e,i);else for(var a=n.length-1;a>=0;a--)(s=n[a])&&(o=(r<3?s(o):r>3?s(t,e,o):s(t,e))||o);return r>3&&o&&Object.defineProperty(t,e,o),o}function ZC(n,t,e,i){function r(o){return o instanceof e?o:new e(function(s){s(o)})}return new(e||(e=Promise))(function(o,s){function a(d){try{c(i.next(d))}catch(u){s(u)}}function l(d){try{c(i.throw(d))}catch(u){s(u)}}function c(d){d.done?o(d.value):r(d.value).then(a,l)}c((i=i.apply(n,t||[])).next())})}function YC(n){var t=typeof Symbol=="function"&&Symbol.iterator,e=t&&n[t],i=0;if(e)return e.call(n);if(n&&typeof n.length=="number")return{next:function(){return n&&i>=n.length&&(n=void 0),{value:n&&n[i++],done:!n}}};throw new TypeError(t?"Object is not iterable.":"Symbol.iterator is not defined.")}function Io(n){return this instanceof Io?(this.v=n,this):new Io(n)}function XC(n,t,e){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var i=e.apply(n,t||[]),r,o=[];return r=Object.create((typeof AsyncIterator=="function"?AsyncIterator:Object).prototype),a("next"),a("throw"),a("return",s),r[Symbol.asyncIterator]=function(){return this},r;function s(g){return function(_){return Promise.resolve(_).then(g,u)}}function a(g,_){i[g]&&(r[g]=function(S){return new Promise(function(O,V){o.push([g,S,O,V])>1||l(g,S)})},_&&(r[g]=_(r[g])))}function l(g,_){try{c(i[g](_))}catch(S){p(o[0][3],S)}}function c(g){g.value instanceof Io?Promise.resolve(g.value.v).then(d,u):p(o[0][2],g)}function d(g){l("next",g)}function u(g){l("throw",g)}function p(g,_){g(_),o.shift(),o.length&&l(o[0][0],o[0][1])}}function QC(n){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var t=n[Symbol.asyncIterator],e;return t?t.call(n):(n=typeof YC=="function"?YC(n):n[Symbol.iterator](),e={},i("next"),i("throw"),i("return"),e[Symbol.asyncIterator]=function(){return this},e);function i(o){e[o]=n[o]&&function(s){return new Promise(function(a,l){s=n[o](s),r(a,l,s.done,s.value)})}}function r(o,s,a,l){Promise.resolve(l).then(function(c){o({value:c,done:a})},s)}}var Od=n=>n&&typeof n.length=="number"&&typeof n!="function";function Rd(n){return ge(n?.then)}function Pd(n){return ge(n[Fs])}function Nd(n){return Symbol.asyncIterator&&ge(n?.[Symbol.asyncIterator])}function Fd(n){return new TypeError(`You provided ${n!==null&&typeof n=="object"?"an invalid object":`'${n}'`} where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.`)}function hk(){return typeof Symbol!="function"||!Symbol.iterator?"@@iterator":Symbol.iterator}var Ld=hk();function Vd(n){return ge(n?.[Ld])}function Bd(n){return XC(this,arguments,function*(){let e=n.getReader();try{for(;;){let{value:i,done:r}=yield Io(e.read());if(r)return yield Io(void 0);yield yield Io(i)}}finally{e.releaseLock()}})}function jd(n){return ge(n?.getReader)}function $e(n){if(n instanceof q)return n;if(n!=null){if(Pd(n))return mk(n);if(Od(n))return gk(n);if(Rd(n))return yk(n);if(Nd(n))return JC(n);if(Vd(n))return vk(n);if(jd(n))return _k(n)}throw Fd(n)}function mk(n){return new q(t=>{let e=n[Fs]();if(ge(e.subscribe))return e.subscribe(t);throw new TypeError("Provided object does not correctly implement Symbol.observable")})}function gk(n){return new q(t=>{for(let e=0;e<n.length&&!t.closed;e++)t.next(n[e]);t.complete()})}function yk(n){return new q(t=>{n.then(e=>{t.closed||(t.next(e),t.complete())},e=>t.error(e)).then(null,Dd)})}function vk(n){return new q(t=>{for(let e of n)if(t.next(e),t.closed)return;t.complete()})}function JC(n){return new q(t=>{bk(n,t).catch(e=>t.error(e))})}function _k(n){return JC(Bd(n))}function bk(n,t){var e,i,r,o;return ZC(this,void 0,void 0,function*(){try{for(e=QC(n);i=yield e.next(),!i.done;){let s=i.value;if(t.next(s),t.closed)return}}catch(s){r={error:s}}finally{try{i&&!i.done&&(o=e.return)&&(yield o.call(e))}finally{if(r)throw r.error}}t.complete()})}function hn(n,t,e,i=0,r=!1){let o=t.schedule(function(){e(),r?n.add(this.schedule(null,i)):this.unsubscribe()},i);if(n.add(o),!r)return o}function Ud(n,t=0){return pe((e,i)=>{e.subscribe(ue(i,r=>hn(i,n,()=>i.next(r),t),()=>hn(i,n,()=>i.complete(),t),r=>hn(i,n,()=>i.error(r),t)))})}function Hd(n,t=0){return pe((e,i)=>{i.add(n.schedule(()=>e.subscribe(i),t))})}function eD(n,t){return $e(n).pipe(Hd(t),Ud(t))}function tD(n,t){return $e(n).pipe(Hd(t),Ud(t))}function nD(n,t){return new q(e=>{let i=0;return t.schedule(function(){i===n.length?e.complete():(e.next(n[i++]),e.closed||this.schedule())})})}function iD(n,t){return new q(e=>{let i;return hn(e,t,()=>{i=n[Ld](),hn(e,t,()=>{let r,o;try{({value:r,done:o}=i.next())}catch(s){e.error(s);return}o?e.complete():e.next(r)},0,!0)}),()=>ge(i?.return)&&i.return()})}function $d(n,t){if(!n)throw new Error("Iterable cannot be null");return new q(e=>{hn(e,t,()=>{let i=n[Symbol.asyncIterator]();hn(e,t,()=>{i.next().then(r=>{r.done?e.complete():e.next(r.value)})},0,!0)})})}function rD(n,t){return $d(Bd(n),t)}function oD(n,t){if(n!=null){if(Pd(n))return eD(n,t);if(Od(n))return nD(n,t);if(Rd(n))return tD(n,t);if(Nd(n))return $d(n,t);if(Vd(n))return iD(n,t);if(jd(n))return rD(n,t)}throw Fd(n)}function Xe(n,t){return t?oD(n,t):$e(n)}function A(...n){let t=Ri(n);return Xe(n,t)}function lm(n,t){let e=ge(n)?n:()=>n,i=r=>r.error(e());return new q(t?r=>t.schedule(i,0,r):i)}function Mn(n){return!!n&&(n instanceof q||ge(n.lift)&&ge(n.subscribe))}var Qi=Rs(n=>function(){n(this),this.name="EmptyError",this.message="no elements in sequence"});function Bs(n,t){let e=typeof t=="object";return new Promise((i,r)=>{let o=new di({next:s=>{i(s),o.unsubscribe()},error:r,complete:()=>{e?i(t.defaultValue):r(new Qi)}});n.subscribe(o)})}function sD(n){return n instanceof Date&&!isNaN(n)}function ye(n,t){return pe((e,i)=>{let r=0;e.subscribe(ue(i,o=>{i.next(n.call(t,o,r++))}))})}var{isArray:Ck}=Array;function Dk(n,t){return Ck(t)?n(...t):n(t)}function zd(n){return ye(t=>Dk(n,t))}var{isArray:Ek}=Array,{getPrototypeOf:wk,prototype:Sk,keys:xk}=Object;function Wd(n){if(n.length===1){let t=n[0];if(Ek(t))return{args:t,keys:null};if(Tk(t)){let e=xk(t);return{args:e.map(i=>t[i]),keys:e}}}return{args:n,keys:null}}function Tk(n){return n&&typeof n=="object"&&wk(n)===Sk}function Gd(n,t){return n.reduce((e,i,r)=>(e[i]=t[r],e),{})}function fl(...n){let t=Ri(n),e=Ad(n),{args:i,keys:r}=Wd(n);if(i.length===0)return Xe([],t);let o=new q(Mk(i,t,r?s=>Gd(r,s):Tn));return e?o.pipe(zd(e)):o}function Mk(n,t,e=Tn){return i=>{aD(t,()=>{let{length:r}=n,o=new Array(r),s=r,a=r;for(let l=0;l<r;l++)aD(t,()=>{let c=Xe(n[l],t),d=!1;c.subscribe(ue(i,u=>{o[l]=u,d||(d=!0,a--),a||i.next(e(o.slice()))},()=>{--s||i.complete()}))},i)},i)}}function aD(n,t,e){n?hn(e,n,t):t()}function lD(n,t,e,i,r,o,s,a){let l=[],c=0,d=0,u=!1,p=()=>{u&&!l.length&&!c&&t.complete()},g=S=>c<i?_(S):l.push(S),_=S=>{o&&t.next(S),c++;let O=!1;$e(e(S,d++)).subscribe(ue(t,V=>{r?.(V),o?g(V):t.next(V)},()=>{O=!0},void 0,()=>{if(O)try{for(c--;l.length&&c<i;){let V=l.shift();s?hn(t,s,()=>_(V)):_(V)}p()}catch(V){t.error(V)}}))};return n.subscribe(ue(t,g,()=>{u=!0,p()})),()=>{a?.()}}function Qt(n,t,e=1/0){return ge(t)?Qt((i,r)=>ye((o,s)=>t(i,o,r,s))($e(n(i,r))),e):(typeof t=="number"&&(e=t),pe((i,r)=>lD(i,r,n,e)))}function qd(n=1/0){return Qt(Tn,n)}function cD(){return qd(1)}function jr(...n){return cD()(Xe(n,Ri(n)))}function ko(n){return new q(t=>{$e(n()).subscribe(t)})}function js(...n){let t=Ad(n),{args:e,keys:i}=Wd(n),r=new q(o=>{let{length:s}=e;if(!s){o.complete();return}let a=new Array(s),l=s,c=s;for(let d=0;d<s;d++){let u=!1;$e(e[d]).subscribe(ue(o,p=>{u||(u=!0,c--),a[d]=p},()=>l--,void 0,()=>{(!l||!u)&&(c||o.next(i?Gd(i,a):a),o.complete())}))}});return t?r.pipe(zd(t)):r}function pl(n=0,t,e=qC){let i=-1;return t!=null&&(kd(t)?e=t:i=t),new q(r=>{let o=sD(n)?+n-e.now():n;o<0&&(o=0);let s=0;return e.schedule(function(){r.closed||(r.next(s++),0<=i?this.schedule(void 0,i):r.complete())},o)})}function Jt(...n){let t=Ri(n),e=KC(n,1/0),i=n;return i.length?i.length===1?$e(i[0]):qd(e)(Xe(i,t)):He}function Ce(n,t){return pe((e,i)=>{let r=0;e.subscribe(ue(i,o=>n.call(t,o,r++)&&i.next(o)))})}function dD(n){return pe((t,e)=>{let i=!1,r=null,o=null,s=!1,a=()=>{if(o?.unsubscribe(),o=null,i){i=!1;let c=r;r=null,e.next(c)}s&&e.complete()},l=()=>{o=null,s&&e.complete()};t.subscribe(ue(e,c=>{i=!0,r=c,o||$e(n(c)).subscribe(o=ue(e,a,l))},()=>{s=!0,(!i||!o||o.closed)&&e.complete()}))})}function hl(n,t=dl){return dD(()=>pl(n,t))}function Ji(n){return pe((t,e)=>{let i=null,r=!1,o;i=t.subscribe(ue(e,void 0,void 0,s=>{o=$e(n(s,Ji(n)(t))),i?(i.unsubscribe(),i=null,o.subscribe(e)):r=!0})),r&&(i.unsubscribe(),i=null,o.subscribe(e))})}function Kd(n,t){return ge(t)?Qt(n,t,1):Qt(n,1)}function er(n,t=dl){return pe((e,i)=>{let r=null,o=null,s=null,a=()=>{if(r){r.unsubscribe(),r=null;let c=o;o=null,i.next(c)}};function l(){let c=s+n,d=t.now();if(d<c){r=this.schedule(void 0,c-d),i.add(r);return}a()}e.subscribe(ue(i,c=>{o=c,s=t.now(),r||(r=t.schedule(l,n),i.add(r))},()=>{a(),i.complete()},void 0,()=>{o=r=null}))})}function uD(n){return pe((t,e)=>{let i=!1;t.subscribe(ue(e,r=>{i=!0,e.next(r)},()=>{i||e.next(n),e.complete()}))})}function yt(n){return n<=0?()=>He:pe((t,e)=>{let i=0;t.subscribe(ue(e,r=>{++i<=n&&(e.next(r),n<=i&&e.complete())}))})}function Us(n,t=Tn){return n=n??Ik,pe((e,i)=>{let r,o=!0;e.subscribe(ue(i,s=>{let a=t(s);(o||!n(r,a))&&(o=!1,r=a,i.next(s))}))})}function Ik(n,t){return n===t}function fD(n=kk){return pe((t,e)=>{let i=!1;t.subscribe(ue(e,r=>{i=!0,e.next(r)},()=>i?e.complete():e.error(n())))})}function kk(){return new Qi}function cm(n){return pe((t,e)=>{try{t.subscribe(e)}finally{e.add(n)}})}function tr(n,t){let e=arguments.length>=2;return i=>i.pipe(n?Ce((r,o)=>n(r,o,i)):Tn,yt(1),e?uD(t):fD(()=>new Qi))}function Yd(n){return n<=0?()=>He:pe((t,e)=>{let i=[];t.subscribe(ue(e,r=>{i.push(r),n<i.length&&i.shift()},()=>{for(let r of i)e.next(r);e.complete()},void 0,()=>{i=null}))})}function ml(){return pe((n,t)=>{let e,i=!1;n.subscribe(ue(t,r=>{let o=e;e=r,i&&t.next([o,r]),i=!0}))})}function pD(n={}){let{connector:t=()=>new E,resetOnError:e=!0,resetOnComplete:i=!0,resetOnRefCountZero:r=!0}=n;return o=>{let s,a,l,c=0,d=!1,u=!1,p=()=>{a?.unsubscribe(),a=void 0},g=()=>{p(),s=l=void 0,d=u=!1},_=()=>{let S=s;g(),S?.unsubscribe()};return pe((S,O)=>{c++,!u&&!d&&p();let V=l=l??t();O.add(()=>{c--,c===0&&!u&&!d&&(a=dm(_,r))}),V.subscribe(O),!s&&c>0&&(s=new di({next:Ee=>V.next(Ee),error:Ee=>{u=!0,p(),a=dm(g,e,Ee),V.error(Ee)},complete:()=>{d=!0,p(),a=dm(g,i),V.complete()}}),$e(S).subscribe(s))})(o)}}function dm(n,t,...e){if(t===!0){n();return}if(t===!1)return;let i=new di({next:()=>{i.unsubscribe(),n()}});return $e(t(...e)).subscribe(i)}function gl(n,t,e){let i,r=!1;return n&&typeof n=="object"?{bufferSize:i=1/0,windowTime:t=1/0,refCount:r=!1,scheduler:e}=n:i=n??1/0,pD({connector:()=>new Lr(i,t,e),resetOnError:!0,resetOnComplete:!1,resetOnRefCountZero:r})}function Ao(n){return Ce((t,e)=>n<=e)}function dt(...n){let t=Ri(n);return pe((e,i)=>{(t?jr(n,e,t):jr(n,e)).subscribe(i)})}function ut(n,t){return pe((e,i)=>{let r=null,o=0,s=!1,a=()=>s&&!r&&i.complete();e.subscribe(ue(i,l=>{r?.unsubscribe();let c=0,d=o++;$e(n(l,d)).subscribe(r=ue(i,u=>i.next(t?t(l,u,d,c++):u),()=>{r=null,a()}))},()=>{s=!0,a()}))})}function ne(n){return pe((t,e)=>{$e(n).subscribe(ue(e,()=>e.complete(),ol)),!e.closed&&t.subscribe(e)})}function um(n,t=!1){return pe((e,i)=>{let r=0;e.subscribe(ue(i,o=>{let s=n(o,r++);(s||t)&&i.next(o),!s&&i.complete()}))})}function wt(n,t,e){let i=ge(n)||t||e?{next:n,error:t,complete:e}:n;return i?pe((r,o)=>{var s;(s=i.subscribe)===null||s===void 0||s.call(i);let a=!0;r.subscribe(ue(o,l=>{var c;(c=i.next)===null||c===void 0||c.call(i,l),o.next(l)},()=>{var l;a=!1,(l=i.complete)===null||l===void 0||l.call(i),o.complete()},l=>{var c;a=!1,(c=i.error)===null||c===void 0||c.call(i,l),o.error(l)},()=>{var l,c;a&&((l=i.unsubscribe)===null||l===void 0||l.call(i)),(c=i.finalize)===null||c===void 0||c.call(i)}))}):Tn}var fm;function Zd(){return fm}function Pi(n){let t=fm;return fm=n,t}var hD=Symbol("NotFound");function Hs(n){return n===hD||n?.name==="\u0275NotFound"}function pm(n,t,e){let i=Object.create(Ak);i.source=n,i.computation=t,e!=null&&(i.equal=e);let o=()=>{if(wo(i),Pr(i),i.value===Oi)throw i.error;return i.value};return o[ct]=i,tl(i),o}function mD(n,t){wo(n),So(n,t),ks(n)}function gD(n,t){if(wo(n),n.value===Oi)throw n.error;_d(n,t),ks(n)}var Ak=$(b({},Rr),{value:Do,dirty:!0,error:null,equal:nl,kind:"linkedSignal",producerMustRecompute(n){return n.value===Do||n.value===Eo},producerRecomputeValue(n){if(n.value===Eo)throw new Error("");let t=n.value;n.value=Eo;let e=Xi(n),i,r=!1;try{let o=n.source(),s=t!==Do&&t!==Oi,a=s?{source:n.sourceValue,value:t}:void 0;i=n.computation(o,a),n.sourceValue=o,z(null),r=s&&i!==Oi&&n.equal(t,i)}catch(o){i=Oi,n.error=o}finally{Nr(n,e)}if(r){n.value=t;return}n.value=i,n.version++}});function yD(n){let t=z(null);try{return n()}finally{z(t)}}var iu="https://angular.dev/best-practices/security#preventing-cross-site-scripting-xss",x=class extends Error{code;constructor(t,e){super(rr(t,e)),this.code=t}};function Ok(n){return`NG0${Math.abs(n)}`}function rr(n,t){return`${Ok(n)}${t?": "+t:""}`}var Hn=globalThis;function Pe(n){for(let t in n)if(n[t]===Pe)return t;throw Error("")}function DD(n,t){for(let e in t)t.hasOwnProperty(e)&&!n.hasOwnProperty(e)&&(n[e]=t[e])}function El(n){if(typeof n=="string")return n;if(Array.isArray(n))return`[${n.map(El).join(", ")}]`;if(n==null)return""+n;let t=n.overriddenName||n.name;if(t)return`${t}`;let e=n.toString();if(e==null)return""+e;let i=e.indexOf(`
`);return i>=0?e.slice(0,i):e}function ru(n,t){return n?t?`${n} ${t}`:n:t||""}var Rk=Pe({__forward_ref__:Pe});function or(n){return n.__forward_ref__=or,n}function Pt(n){return xm(n)?n():n}function xm(n){return typeof n=="function"&&n.hasOwnProperty(Rk)&&n.__forward_ref__===or}function D(n){return{token:n.token,providedIn:n.providedIn||null,factory:n.factory,value:void 0}}function be(n){return{providers:n.providers||[],imports:n.imports||[]}}function wl(n){return Pk(n,ou)}function Tm(n){return wl(n)!==null}function Pk(n,t){return n.hasOwnProperty(t)&&n[t]||null}function Nk(n){let t=n?.[ou]??null;return t||null}function mm(n){return n&&n.hasOwnProperty(Qd)?n[Qd]:null}var ou=Pe({\u0275prov:Pe}),Qd=Pe({\u0275inj:Pe}),C=class{_desc;ngMetadataName="InjectionToken";\u0275prov;constructor(t,e){this._desc=t,this.\u0275prov=void 0,typeof e=="number"?this.__NG_ELEMENT_ID__=e:e!==void 0&&(this.\u0275prov=D({token:this,providedIn:e.providedIn||"root",factory:e.factory}))}get multi(){return this}toString(){return`InjectionToken ${this._desc}`}};function Mm(n){return n&&!!n.\u0275providers}var Im=Pe({\u0275cmp:Pe}),km=Pe({\u0275dir:Pe}),Am=Pe({\u0275pipe:Pe}),Om=Pe({\u0275mod:Pe}),vl=Pe({\u0275fac:Pe}),Fo=Pe({__NG_ELEMENT_ID__:Pe}),vD=Pe({__NG_ENV_ID__:Pe});function Rm(n){return su(n,"@NgModule"),n[Om]||null}function sr(n){return su(n,"@Component"),n[Im]||null}function Pm(n){return su(n,"@Directive"),n[km]||null}function ED(n){return su(n,"@Pipe"),n[Am]||null}function su(n,t){if(n==null)throw new x(-919,!1)}function au(n){return typeof n=="string"?n:n==null?"":String(n)}var wD=Pe({ngErrorCode:Pe}),Fk=Pe({ngErrorMessage:Pe}),Lk=Pe({ngTokenPath:Pe});function Nm(n,t){return SD("",-200,t)}function lu(n,t){throw new x(-201,!1)}function SD(n,t,e){let i=new x(t,n);return i[wD]=t,i[Fk]=n,e&&(i[Lk]=e),i}function Vk(n){return n[wD]}var gm;function xD(){return gm}function en(n){let t=gm;return gm=n,t}function Fm(n,t,e){let i=wl(n);if(i&&i.providedIn=="root")return i.value===void 0?i.value=i.factory():i.value;if(e&8)return null;if(t!==void 0)return t;lu(n,"")}var Bk={},Oo=Bk,jk="__NG_DI_FLAG__",ym=class{injector;constructor(t){this.injector=t}retrieve(t,e){let i=Ro(e)||0;try{return this.injector.get(t,i&8?null:Oo,i)}catch(r){if(Hs(r))return r;throw r}}};function Uk(n,t=0){let e=Zd();if(e===void 0)throw new x(-203,!1);if(e===null)return Fm(n,void 0,t);{let i=Hk(t),r=e.retrieve(n,i);if(Hs(r)){if(i.optional)return null;throw r}return r}}function se(n,t=0){return(xD()||Uk)(Pt(n),t)}function f(n,t){return se(n,Ro(t))}function Ro(n){return typeof n>"u"||typeof n=="number"?n:0|(n.optional&&8)|(n.host&&1)|(n.self&&2)|(n.skipSelf&&4)}function Hk(n){return{optional:!!(n&8),host:!!(n&1),self:!!(n&2),skipSelf:!!(n&4)}}function vm(n){let t=[];for(let e=0;e<n.length;e++){let i=Pt(n[e]);if(Array.isArray(i)){if(i.length===0)throw new x(900,!1);let r,o=0;for(let s=0;s<i.length;s++){let a=i[s],l=$k(a);typeof l=="number"?l===-1?r=a.token:o|=l:r=a}t.push(se(r,o))}else t.push(se(i))}return t}function $k(n){return n[jk]}function Ur(n,t){let e=n.hasOwnProperty(vl);return e?n[vl]:null}function TD(n,t,e){if(n.length!==t.length)return!1;for(let i=0;i<n.length;i++){let r=n[i],o=t[i];if(e&&(r=e(r),o=e(o)),o!==r)return!1}return!0}function MD(n){return n.flat(Number.POSITIVE_INFINITY)}function cu(n,t){n.forEach(e=>Array.isArray(e)?cu(e,t):t(e))}function Lm(n,t,e){t>=n.length?n.push(e):n.splice(t,0,e)}function Sl(n,t){return t>=n.length-1?n.pop():n.splice(t,1)[0]}function ID(n,t){let e=[];for(let i=0;i<n;i++)e.push(t);return e}function kD(n,t,e,i){let r=n.length;if(r==t)n.push(e,i);else if(r===1)n.push(i,n[0]),n[0]=e;else{for(r--,n.push(n[r-1],n[r]);r>t;){let o=r-2;n[r]=n[o],r--}n[t]=e,n[t+1]=i}}function du(n,t,e){let i=zs(n,t);return i>=0?n[i|1]=e:(i=~i,kD(n,i,t,e)),i}function uu(n,t){let e=zs(n,t);if(e>=0)return n[e|1]}function zs(n,t){return zk(n,t,1)}function zk(n,t,e){let i=0,r=n.length>>e;for(;r!==i;){let o=i+(r-i>>1),s=n[o<<e];if(t===s)return o<<e;s>t?r=o:i=o+1}return~(r<<e)}var zr={},$t=[],Wr=new C(""),Vm=new C("",-1),Bm=new C(""),_l=class{get(t,e=Oo){if(e===Oo){let r=SD("",-201);throw r.name="\u0275NotFound",r}return e}};function ar(n){return{\u0275providers:n}}function AD(n){return ar([{provide:Wr,multi:!0,useValue:n}])}function OD(...n){return{\u0275providers:jm(!0,n),\u0275fromNgModule:!0}}function jm(n,...t){let e=[],i=new Set,r,o=s=>{e.push(s)};return cu(t,s=>{let a=s;Jd(a,o,[],i)&&(r||=[],r.push(a))}),r!==void 0&&RD(r,o),e}function RD(n,t){for(let e=0;e<n.length;e++){let{ngModule:i,providers:r}=n[e];Um(r,o=>{t(o,i)})}}function Jd(n,t,e,i){if(n=Pt(n),!n)return!1;let r=null,o=mm(n),s=!o&&sr(n);if(!o&&!s){let l=n.ngModule;if(o=mm(l),o)r=l;else return!1}else{if(s&&!s.standalone)return!1;r=n}let a=i.has(r);if(s){if(a)return!1;if(i.add(r),s.dependencies){let l=typeof s.dependencies=="function"?s.dependencies():s.dependencies;for(let c of l)Jd(c,t,e,i)}}else if(o){if(o.imports!=null&&!a){i.add(r);let c;cu(o.imports,d=>{Jd(d,t,e,i)&&(c||=[],c.push(d))}),c!==void 0&&RD(c,t)}if(!a){let c=Ur(r)||(()=>new r);t({provide:r,useFactory:c,deps:$t},r),t({provide:Bm,useValue:r,multi:!0},r),t({provide:Wr,useValue:()=>se(r),multi:!0},r)}let l=o.providers;if(l!=null&&!a){let c=n;Um(l,d=>{t(d,c)})}}else return!1;return r!==n&&n.providers!==void 0}function Um(n,t){for(let e of n)Mm(e)&&(e=e.\u0275providers),Array.isArray(e)?Um(e,t):t(e)}var Wk=Pe({provide:String,useValue:Pe});function PD(n){return n!==null&&typeof n=="object"&&Wk in n}function Gk(n){return!!(n&&n.useExisting)}function qk(n){return!!(n&&n.useFactory)}function Po(n){return typeof n=="function"}function ND(n){return!!n.useClass}var xl=new C(""),Xd={},_D={},hm;function Ws(){return hm===void 0&&(hm=new _l),hm}var We=class{},No=class extends We{parent;source;scopes;records=new Map;_ngOnDestroyHooks=new Set;_onDestroyHooks=[];get destroyed(){return this._destroyed}_destroyed=!1;injectorDefTypes;constructor(t,e,i,r){super(),this.parent=e,this.source=i,this.scopes=r,bm(t,s=>this.processProvider(s)),this.records.set(Vm,$s(void 0,this)),r.has("environment")&&this.records.set(We,$s(void 0,this));let o=this.records.get(xl);o!=null&&typeof o.value=="string"&&this.scopes.add(o.value),this.injectorDefTypes=new Set(this.get(Bm,$t,{self:!0}))}retrieve(t,e){let i=Ro(e)||0;try{return this.get(t,Oo,i)}catch(r){if(Hs(r))return r;throw r}}destroy(){yl(this),this._destroyed=!0;let t=z(null);try{for(let i of this._ngOnDestroyHooks)i.ngOnDestroy();let e=this._onDestroyHooks;this._onDestroyHooks=[];for(let i of e)i()}finally{this.records.clear(),this._ngOnDestroyHooks.clear(),this.injectorDefTypes.clear(),z(t)}}onDestroy(t){return yl(this),this._onDestroyHooks.push(t),()=>this.removeOnDestroy(t)}runInContext(t){yl(this);let e=Pi(this),i=en(void 0),r;try{return t()}finally{Pi(e),en(i)}}get(t,e=Oo,i){if(yl(this),t.hasOwnProperty(vD))return t[vD](this);let r=Ro(i),o,s=Pi(this),a=en(void 0);try{if(!(r&4)){let c=this.records.get(t);if(c===void 0){let d=Qk(t)&&wl(t);d&&this.injectableDefInScope(d)?c=$s(_m(t),Xd):c=null,this.records.set(t,c)}if(c!=null)return this.hydrate(t,c,r)}let l=r&2?Ws():this.parent;return e=r&8&&e===Oo?null:e,l.get(t,e)}catch(l){let c=Vk(l);throw c===-200||c===-201?new x(c,null):l}finally{en(a),Pi(s)}}resolveInjectorInitializers(){let t=z(null),e=Pi(this),i=en(void 0),r;try{let o=this.get(Wr,$t,{self:!0});for(let s of o)s()}finally{Pi(e),en(i),z(t)}}toString(){return"R3Injector[...]"}processProvider(t){t=Pt(t);let e=Po(t)?t:Pt(t&&t.provide),i=Yk(t);if(!Po(t)&&t.multi===!0){let r=this.records.get(e);r||(r=$s(void 0,Xd,!0),r.factory=()=>vm(r.multi),this.records.set(e,r)),e=t,r.multi.push(t)}this.records.set(e,i)}hydrate(t,e,i){let r=z(null);try{if(e.value===_D)throw Nm("");return e.value===Xd&&(e.value=_D,e.value=e.factory(void 0,i)),typeof e.value=="object"&&e.value&&Xk(e.value)&&this._ngOnDestroyHooks.add(e.value),e.value}finally{z(r)}}injectableDefInScope(t){if(!t.providedIn)return!1;let e=Pt(t.providedIn);return typeof e=="string"?e==="any"||this.scopes.has(e):this.injectorDefTypes.has(e)}removeOnDestroy(t){let e=this._onDestroyHooks.indexOf(t);e!==-1&&this._onDestroyHooks.splice(e,1)}};function _m(n){let t=wl(n),e=t!==null?t.factory:Ur(n);if(e!==null)return e;if(n instanceof C)throw new x(-204,!1);if(n instanceof Function)return Kk(n);throw new x(-204,!1)}function Kk(n){if(n.length>0)throw new x(-204,!1);let e=Nk(n);return e!==null?()=>e.factory(n):()=>new n}function Yk(n){if(PD(n))return $s(void 0,n.useValue);{let t=Hm(n);return $s(t,Xd)}}function Hm(n,t,e){let i;if(Po(n)){let r=Pt(n);return Ur(r)||_m(r)}else if(PD(n))i=()=>Pt(n.useValue);else if(qk(n))i=()=>n.useFactory(...vm(n.deps||[]));else if(Gk(n))i=(r,o)=>se(Pt(n.useExisting),o!==void 0&&o&8?8:void 0);else{let r=Pt(n&&(n.useClass||n.provide));if(Zk(n))i=()=>new r(...vm(n.deps));else return Ur(r)||_m(r)}return i}function yl(n){if(n.destroyed)throw new x(-205,!1)}function $s(n,t,e=!1){return{factory:n,value:t,multi:e?[]:void 0}}function Zk(n){return!!n.deps}function Xk(n){return n!==null&&typeof n=="object"&&typeof n.ngOnDestroy=="function"}function Qk(n){return typeof n=="function"||typeof n=="object"&&n.ngMetadataName==="InjectionToken"}function bm(n,t){for(let e of n)Array.isArray(e)?bm(e,t):e&&Mm(e)?bm(e.\u0275providers,t):t(e)}function zt(n,t){let e;n instanceof No?(yl(n),e=n):e=new ym(n);let i,r=Pi(e),o=en(void 0);try{return t()}finally{Pi(r),en(o)}}function FD(){return xD()!==void 0||Zd()!=null}var ui=0,X=1,ae=2,St=3,$n=4,tn=5,Lo=6,Gs=7,ft=8,lr=9,fi=10,Ge=11,qs=12,$m=13,Vo=14,nn=15,Gr=16,Bo=17,Ni=18,cr=19,zm=20,nr=21,fu=22,Hr=23,In=24,jo=25,qr=26,Qe=27,LD=1,Wm=6,Kr=7,Tl=8,Uo=9,st=10;function dr(n){return Array.isArray(n)&&typeof n[LD]=="object"}function pi(n){return Array.isArray(n)&&n[LD]===!0}function Gm(n){return(n.flags&4)!==0}function Fi(n){return n.componentOffset>-1}function Ml(n){return(n.flags&1)===1}function Li(n){return!!n.template}function Ks(n){return(n[ae]&512)!==0}function Ho(n){return(n[ae]&256)===256}var qm="svg",VD="math";function zn(n){for(;Array.isArray(n);)n=n[ui];return n}function Km(n,t){return zn(t[n])}function Wn(n,t){return zn(t[n.index])}function pu(n,t){return n.data[t]}function hu(n,t){return n[t]}function Ym(n,t,e,i){e>=n.data.length&&(n.data[e]=null,n.blueprint[e]=null),t[e]=i}function Gn(n,t){let e=t[n];return dr(e)?e:e[ui]}function BD(n){return(n[ae]&4)===4}function mu(n){return(n[ae]&128)===128}function jD(n){return pi(n[St])}function kn(n,t){return t==null?null:n[t]}function Zm(n){n[Bo]=0}function Xm(n){n[ae]&1024||(n[ae]|=1024,mu(n)&&$o(n))}function UD(n,t){for(;n>0;)t=t[Vo],n--;return t}function Il(n){return!!(n[ae]&9216||n[In]?.dirty)}function gu(n){n[fi].changeDetectionScheduler?.notify(8),n[ae]&64&&(n[ae]|=1024),Il(n)&&$o(n)}function $o(n){n[fi].changeDetectionScheduler?.notify(0);let t=$r(n);for(;t!==null&&!(t[ae]&8192||(t[ae]|=8192,!mu(t)));)t=$r(t)}function Qm(n,t){if(Ho(n))throw new x(911,!1);n[nr]===null&&(n[nr]=[]),n[nr].push(t)}function HD(n,t){if(n[nr]===null)return;let e=n[nr].indexOf(t);e!==-1&&n[nr].splice(e,1)}function $r(n){let t=n[St];return pi(t)?t[St]:t}function Jm(n){return n[Gs]??=[]}function eg(n){return n.cleanup??=[]}function $D(n,t,e,i){let r=Jm(t);r.push(e),n.firstCreatePass&&eg(n).push(i,r.length-1)}var ve={lFrame:e0(null),bindingsEnabled:!0,skipHydrationRootTNode:null};var Cm=!1;function zD(){return ve.lFrame.elementDepthCount}function WD(){ve.lFrame.elementDepthCount++}function tg(){ve.lFrame.elementDepthCount--}function ng(){return ve.bindingsEnabled}function ig(){return ve.skipHydrationRootTNode!==null}function rg(n){return ve.skipHydrationRootTNode===n}function og(){ve.skipHydrationRootTNode=null}function oe(){return ve.lFrame.lView}function Je(){return ve.lFrame.tView}function Le(n){return ve.lFrame.contextLView=n,n[ft]}function Ve(n){return ve.lFrame.contextLView=null,n}function Nt(){let n=sg();for(;n!==null&&n.type===64;)n=n.parent;return n}function sg(){return ve.lFrame.currentTNode}function GD(){let n=ve.lFrame,t=n.currentTNode;return n.isParent?t:t.parent}function Ys(n,t){let e=ve.lFrame;e.currentTNode=n,e.isParent=t}function ag(){return ve.lFrame.isParent}function lg(){ve.lFrame.isParent=!1}function qD(){return ve.lFrame.contextLView}function cg(){return Cm}function bl(n){let t=Cm;return Cm=n,t}function dg(){let n=ve.lFrame,t=n.bindingRootIndex;return t===-1&&(t=n.bindingRootIndex=n.tView.bindingStartIndex),t}function KD(n){return ve.lFrame.bindingIndex=n}function Yr(){return ve.lFrame.bindingIndex++}function ug(n){let t=ve.lFrame,e=t.bindingIndex;return t.bindingIndex=t.bindingIndex+n,e}function YD(){return ve.lFrame.inI18n}function ZD(n,t){let e=ve.lFrame;e.bindingIndex=e.bindingRootIndex=n,yu(t)}function XD(){return ve.lFrame.currentDirectiveIndex}function yu(n){ve.lFrame.currentDirectiveIndex=n}function QD(n){let t=ve.lFrame.currentDirectiveIndex;return t===-1?null:n[t]}function vu(){return ve.lFrame.currentQueryIndex}function kl(n){ve.lFrame.currentQueryIndex=n}function Jk(n){let t=n[X];return t.type===2?t.declTNode:t.type===1?n[tn]:null}function fg(n,t,e){if(e&4){let r=t,o=n;for(;r=r.parent,r===null&&!(e&1);)if(r=Jk(o),r===null||(o=o[Vo],r.type&10))break;if(r===null)return!1;t=r,n=o}let i=ve.lFrame=JD();return i.currentTNode=t,i.lView=n,!0}function _u(n){let t=JD(),e=n[X];ve.lFrame=t,t.currentTNode=e.firstChild,t.lView=n,t.tView=e,t.contextLView=n,t.bindingIndex=e.bindingStartIndex,t.inI18n=!1}function JD(){let n=ve.lFrame,t=n===null?null:n.child;return t===null?e0(n):t}function e0(n){let t={currentTNode:null,isParent:!0,lView:null,tView:null,selectedIndex:-1,contextLView:null,elementDepthCount:0,currentNamespace:null,currentDirectiveIndex:-1,bindingRootIndex:-1,bindingIndex:-1,currentQueryIndex:0,parent:n,child:null,inI18n:!1};return n!==null&&(n.child=t),t}function t0(){let n=ve.lFrame;return ve.lFrame=n.parent,n.currentTNode=null,n.lView=null,n}var pg=t0;function bu(){let n=t0();n.isParent=!0,n.tView=null,n.selectedIndex=-1,n.contextLView=null,n.elementDepthCount=0,n.currentDirectiveIndex=-1,n.currentNamespace=null,n.bindingRootIndex=-1,n.bindingIndex=-1,n.currentQueryIndex=0}function n0(n){return(ve.lFrame.contextLView=UD(n,ve.lFrame.contextLView))[ft]}function ur(){return ve.lFrame.selectedIndex}function Zr(n){ve.lFrame.selectedIndex=n}function Al(){let n=ve.lFrame;return pu(n.tView,n.selectedIndex)}function hi(){ve.lFrame.currentNamespace=qm}function Cu(){eA()}function eA(){ve.lFrame.currentNamespace=null}function hg(){return ve.lFrame.currentNamespace}var i0=!0;function Du(){return i0}function Eu(n){i0=n}function Dm(n,t=null,e=null,i){let r=mg(n,t,e,i);return r.resolveInjectorInitializers(),r}function mg(n,t=null,e=null,i,r=new Set){let o=[e||$t,OD(n)],s;return new No(o,t||Ws(),s||null,r)}var le=class n{static THROW_IF_NOT_FOUND=Oo;static NULL=new _l;static create(t,e){if(Array.isArray(t))return Dm({name:""},e,t,"");{let i=t.name??"";return Dm({name:i},t.parent,t.providers,i)}}static \u0275prov=D({token:n,providedIn:"any",factory:()=>se(Vm)});static __NG_ELEMENT_ID__=-1},he=new C(""),at=(()=>{class n{static __NG_ELEMENT_ID__=tA;static __NG_ENV_ID__=e=>e}return n})(),eu=class extends at{_lView;constructor(t){super(),this._lView=t}get destroyed(){return Ho(this._lView)}onDestroy(t){let e=this._lView;return Qm(e,t),()=>HD(e,t)}};function tA(){return new eu(oe())}var r0=!1,o0=new C(""),Xr=(()=>{class n{taskId=0;pendingTasks=new Set;destroyed=!1;pendingTask=new ot(!1);debugTaskTracker=f(o0,{optional:!0});get hasPendingTasks(){return this.destroyed?!1:this.pendingTask.value}get hasPendingTasksObservable(){return this.destroyed?new q(e=>{e.next(!1),e.complete()}):this.pendingTask}add(){!this.hasPendingTasks&&!this.destroyed&&this.pendingTask.next(!0);let e=this.taskId++;return this.pendingTasks.add(e),this.debugTaskTracker?.add(e),e}has(e){return this.pendingTasks.has(e)}remove(e){this.pendingTasks.delete(e),this.debugTaskTracker?.remove(e),this.pendingTasks.size===0&&this.hasPendingTasks&&this.pendingTask.next(!1)}ngOnDestroy(){this.pendingTasks.clear(),this.hasPendingTasks&&this.pendingTask.next(!1),this.destroyed=!0,this.pendingTask.unsubscribe()}static \u0275prov=D({token:n,providedIn:"root",factory:()=>new n})}return n})(),Em=class extends E{__isAsync;destroyRef=void 0;pendingTasks=void 0;constructor(t=!1){super(),this.__isAsync=t,FD()&&(this.destroyRef=f(at,{optional:!0})??void 0,this.pendingTasks=f(Xr,{optional:!0})??void 0)}emit(t){let e=z(null);try{super.next(t)}finally{z(e)}}subscribe(t,e,i){let r=t,o=e||(()=>null),s=i;if(t&&typeof t=="object"){let l=t;r=l.next?.bind(l),o=l.error?.bind(l),s=l.complete?.bind(l)}this.__isAsync&&(o=this.wrapInTimeout(o),r&&(r=this.wrapInTimeout(r)),s&&(s=this.wrapInTimeout(s)));let a=super.subscribe({next:r,error:o,complete:s});return t instanceof Z&&t.add(a),a}wrapInTimeout(t){return e=>{let i=this.pendingTasks?.add();setTimeout(()=>{try{t(e)}finally{i!==void 0&&this.pendingTasks?.remove(i)}})}}},j=Em;function tu(...n){}function gg(n){let t,e;function i(){n=tu;try{e!==void 0&&typeof cancelAnimationFrame=="function"&&cancelAnimationFrame(e),t!==void 0&&clearTimeout(t)}catch{}}return t=setTimeout(()=>{n(),i()}),typeof requestAnimationFrame=="function"&&(e=requestAnimationFrame(()=>{n(),i()})),()=>i()}function s0(n){return queueMicrotask(()=>n()),()=>{n=tu}}var yg="isAngularZone",Cl=yg+"_ID",nA=0,U=class n{hasPendingMacrotasks=!1;hasPendingMicrotasks=!1;isStable=!0;onUnstable=new j(!1);onMicrotaskEmpty=new j(!1);onStable=new j(!1);onError=new j(!1);constructor(t){let{enableLongStackTrace:e=!1,shouldCoalesceEventChangeDetection:i=!1,shouldCoalesceRunChangeDetection:r=!1,scheduleInRootZone:o=r0}=t;if(typeof Zone>"u")throw new x(908,!1);Zone.assertZonePatched();let s=this;s._nesting=0,s._outer=s._inner=Zone.current,Zone.TaskTrackingZoneSpec&&(s._inner=s._inner.fork(new Zone.TaskTrackingZoneSpec)),e&&Zone.longStackTraceZoneSpec&&(s._inner=s._inner.fork(Zone.longStackTraceZoneSpec)),s.shouldCoalesceEventChangeDetection=!r&&i,s.shouldCoalesceRunChangeDetection=r,s.callbackScheduled=!1,s.scheduleInRootZone=o,oA(s)}static isInAngularZone(){return typeof Zone<"u"&&Zone.current.get(yg)===!0}static assertInAngularZone(){if(!n.isInAngularZone())throw new x(909,!1)}static assertNotInAngularZone(){if(n.isInAngularZone())throw new x(909,!1)}run(t,e,i){return this._inner.run(t,e,i)}runTask(t,e,i,r){let o=this._inner,s=o.scheduleEventTask("NgZoneEvent: "+r,t,iA,tu,tu);try{return o.runTask(s,e,i)}finally{o.cancelTask(s)}}runGuarded(t,e,i){return this._inner.runGuarded(t,e,i)}runOutsideAngular(t){return this._outer.run(t)}},iA={};function vg(n){if(n._nesting==0&&!n.hasPendingMicrotasks&&!n.isStable)try{n._nesting++,n.onMicrotaskEmpty.emit(null)}finally{if(n._nesting--,!n.hasPendingMicrotasks)try{n.runOutsideAngular(()=>n.onStable.emit(null))}finally{n.isStable=!0}}}function rA(n){if(n.isCheckStableRunning||n.callbackScheduled)return;n.callbackScheduled=!0;function t(){gg(()=>{n.callbackScheduled=!1,wm(n),n.isCheckStableRunning=!0,vg(n),n.isCheckStableRunning=!1})}n.scheduleInRootZone?Zone.root.run(()=>{t()}):n._outer.run(()=>{t()}),wm(n)}function oA(n){let t=()=>{rA(n)},e=nA++;n._inner=n._inner.fork({name:"angular",properties:{[yg]:!0,[Cl]:e,[Cl+e]:!0},onInvokeTask:(i,r,o,s,a,l)=>{if(sA(l))return i.invokeTask(o,s,a,l);try{return bD(n),i.invokeTask(o,s,a,l)}finally{(n.shouldCoalesceEventChangeDetection&&s.type==="eventTask"||n.shouldCoalesceRunChangeDetection)&&t(),CD(n)}},onInvoke:(i,r,o,s,a,l,c)=>{try{return bD(n),i.invoke(o,s,a,l,c)}finally{n.shouldCoalesceRunChangeDetection&&!n.callbackScheduled&&!aA(l)&&t(),CD(n)}},onHasTask:(i,r,o,s)=>{i.hasTask(o,s),r===o&&(s.change=="microTask"?(n._hasPendingMicrotasks=s.microTask,wm(n),vg(n)):s.change=="macroTask"&&(n.hasPendingMacrotasks=s.macroTask))},onHandleError:(i,r,o,s)=>(i.handleError(o,s),n.runOutsideAngular(()=>n.onError.emit(s)),!1)})}function wm(n){n._hasPendingMicrotasks||(n.shouldCoalesceEventChangeDetection||n.shouldCoalesceRunChangeDetection)&&n.callbackScheduled===!0?n.hasPendingMicrotasks=!0:n.hasPendingMicrotasks=!1}function bD(n){n._nesting++,n.isStable&&(n.isStable=!1,n.onUnstable.emit(null))}function CD(n){n._nesting--,vg(n)}var Dl=class{hasPendingMicrotasks=!1;hasPendingMacrotasks=!1;isStable=!0;onUnstable=new j;onMicrotaskEmpty=new j;onStable=new j;onError=new j;run(t,e,i){return t.apply(e,i)}runGuarded(t,e,i){return t.apply(e,i)}runOutsideAngular(t){return t()}runTask(t,e,i,r){return t.apply(e,i)}};function sA(n){return a0(n,"__ignore_ng_zone__")}function aA(n){return a0(n,"__scheduler_tick__")}function a0(n,t){return!Array.isArray(n)||n.length!==1?!1:n[0]?.data?.[t]===!0}var Un=class{_console=console;handleError(t){this._console.error("ERROR",t)}},qn=new C("",{factory:()=>{let n=f(U),t=f(We),e;return i=>{n.runOutsideAngular(()=>{t.destroyed&&!e?setTimeout(()=>{throw i}):(e??=t.get(Un),e.handleError(i))})}}}),l0={provide:Wr,useValue:()=>{let n=f(Un,{optional:!0})},multi:!0},lA=new C("",{factory:()=>{let n=f(he).defaultView;if(!n)return;let t=f(qn),e=o=>{t(o.reason),o.preventDefault()},i=o=>{o.error?t(o.error):t(new Error(o.message,{cause:o})),o.preventDefault()},r=()=>{n.addEventListener("unhandledrejection",e),n.addEventListener("error",i)};typeof Zone<"u"?Zone.root.run(r):r(),f(at).onDestroy(()=>{n.removeEventListener("error",i),n.removeEventListener("unhandledrejection",e)})}});function _g(){return ar([AD(()=>{f(lA)})])}function P(n,t){let[e,i,r]=Wh(n,t?.equal),o=e,s=o[ct];return o.set=i,o.update=r,o.asReadonly=wu.bind(o),o}function wu(){let n=this[ct];if(n.readonlyFn===void 0){let t=()=>this();t[ct]=n,n.readonlyFn=t}return n.readonlyFn}var Zs=(()=>{class n{view;node;constructor(e,i){this.view=e,this.node=i}static __NG_ELEMENT_ID__=cA}return n})();function cA(){return new Zs(oe(),Nt())}var ir=class{},Ol=new C("",{factory:()=>!0});var bg=new C("");var Su=(()=>{class n{static \u0275prov=D({token:n,providedIn:"root",factory:()=>new Sm})}return n})(),Sm=class{dirtyEffectCount=0;queues=new Map;add(t){this.enqueue(t),this.schedule(t)}schedule(t){t.dirty&&this.dirtyEffectCount++}remove(t){let e=t.zone,i=this.queues.get(e);i.has(t)&&(i.delete(t),t.dirty&&this.dirtyEffectCount--)}enqueue(t){let e=t.zone;this.queues.has(e)||this.queues.set(e,new Set);let i=this.queues.get(e);i.has(t)||i.add(t)}flush(){for(;this.dirtyEffectCount>0;){let t=!1;for(let[e,i]of this.queues)e===null?t||=this.flushQueue(i):t||=e.run(()=>this.flushQueue(i));t||(this.dirtyEffectCount=0)}}flushQueue(t){let e=!1;for(let i of t)i.dirty&&(this.dirtyEffectCount--,e=!0,i.run());return e}},nu=class{[ct];constructor(t){this[ct]=t}destroy(){this[ct].destroy()}};function fr(n,t){let e=t?.injector??f(le),i=t?.manualCleanup!==!0?e.get(at):null,r,o=e.get(Zs,null,{optional:!0}),s=e.get(ir);return o!==null?(r=fA(o.view,s,n),i instanceof eu&&i._lView===o.view&&(i=null)):r=pA(n,e.get(Su),s),r.injector=e,i!==null&&(r.onDestroyFns=[i.onDestroy(()=>r.destroy())]),new nu(r)}var c0=$(b({},Gh),{cleanupFns:void 0,zone:null,onDestroyFns:null,run(){let n=bl(!1);try{qh(this)}finally{bl(n)}},cleanup(){if(!this.cleanupFns?.length)return;let n=z(null);try{for(;this.cleanupFns.length;)this.cleanupFns.pop()()}finally{this.cleanupFns=[],z(n)}}}),dA=$(b({},c0),{consumerMarkedDirty(){this.scheduler.schedule(this),this.notifier.notify(12)},destroy(){if(Fr(this),this.onDestroyFns!==null)for(let n of this.onDestroyFns)n();this.cleanup(),this.scheduler.remove(this)}}),uA=$(b({},c0),{consumerMarkedDirty(){this.view[ae]|=8192,$o(this.view),this.notifier.notify(13)},destroy(){if(Fr(this),this.onDestroyFns!==null)for(let n of this.onDestroyFns)n();this.cleanup(),this.view[Hr]?.delete(this)}});function fA(n,t,e){let i=Object.create(uA);return i.view=n,i.zone=typeof Zone<"u"?Zone.current:null,i.notifier=t,i.fn=d0(i,e),n[Hr]??=new Set,n[Hr].add(i),i.consumerMarkedDirty(i),i}function pA(n,t,e){let i=Object.create(dA);return i.fn=d0(i,n),i.scheduler=t,i.notifier=e,i.zone=typeof Zone<"u"?Zone.current:null,i.scheduler.add(i),i.notifier.notify(12),i}function d0(n,t){return()=>{t(e=>(n.cleanupFns??=[]).push(e))}}function $l(n){return{toString:n}.toString()}function bA(n){return typeof n=="function"}function W0(n,t,e,i){t!==null?t.applyValueToInputSignal(t,i):n[e]=i}var Nu=class{previousValue;currentValue;firstChange;constructor(t,e,i){this.previousValue=t,this.currentValue=e,this.firstChange=i}isFirstChange(){return this.firstChange}},It=(()=>{let n=()=>G0;return n.ngInherit=!0,n})();function G0(n){return n.type.prototype.ngOnChanges&&(n.setInput=DA),CA}function CA(){let n=K0(this),t=n?.current;if(t){let e=n.previous;if(e===zr)n.previous=t;else for(let i in t)e[i]=t[i];n.current=null,this.ngOnChanges(t)}}function DA(n,t,e,i,r){let o=this.declaredInputs[i],s=K0(n)||EA(n,{previous:zr,current:null}),a=s.current||(s.current={}),l=s.previous,c=l[o];a[o]=new Nu(c&&c.currentValue,e,l===zr),W0(n,t,r,e)}var q0="__ngSimpleChanges__";function K0(n){return n[q0]||null}function EA(n,t){return n[q0]=t}var u0=[];var Ne=function(n,t=null,e){for(let i=0;i<u0.length;i++){let r=u0[i];r(n,t,e)}},xe=(function(n){return n[n.TemplateCreateStart=0]="TemplateCreateStart",n[n.TemplateCreateEnd=1]="TemplateCreateEnd",n[n.TemplateUpdateStart=2]="TemplateUpdateStart",n[n.TemplateUpdateEnd=3]="TemplateUpdateEnd",n[n.LifecycleHookStart=4]="LifecycleHookStart",n[n.LifecycleHookEnd=5]="LifecycleHookEnd",n[n.OutputStart=6]="OutputStart",n[n.OutputEnd=7]="OutputEnd",n[n.BootstrapApplicationStart=8]="BootstrapApplicationStart",n[n.BootstrapApplicationEnd=9]="BootstrapApplicationEnd",n[n.BootstrapComponentStart=10]="BootstrapComponentStart",n[n.BootstrapComponentEnd=11]="BootstrapComponentEnd",n[n.ChangeDetectionStart=12]="ChangeDetectionStart",n[n.ChangeDetectionEnd=13]="ChangeDetectionEnd",n[n.ChangeDetectionSyncStart=14]="ChangeDetectionSyncStart",n[n.ChangeDetectionSyncEnd=15]="ChangeDetectionSyncEnd",n[n.AfterRenderHooksStart=16]="AfterRenderHooksStart",n[n.AfterRenderHooksEnd=17]="AfterRenderHooksEnd",n[n.ComponentStart=18]="ComponentStart",n[n.ComponentEnd=19]="ComponentEnd",n[n.DeferBlockStateStart=20]="DeferBlockStateStart",n[n.DeferBlockStateEnd=21]="DeferBlockStateEnd",n[n.DynamicComponentStart=22]="DynamicComponentStart",n[n.DynamicComponentEnd=23]="DynamicComponentEnd",n[n.HostBindingsUpdateStart=24]="HostBindingsUpdateStart",n[n.HostBindingsUpdateEnd=25]="HostBindingsUpdateEnd",n})(xe||{});function wA(n,t,e){let{ngOnChanges:i,ngOnInit:r,ngDoCheck:o}=t.type.prototype;if(i){let s=G0(t);(e.preOrderHooks??=[]).push(n,s),(e.preOrderCheckHooks??=[]).push(n,s)}r&&(e.preOrderHooks??=[]).push(0-n,r),o&&((e.preOrderHooks??=[]).push(n,o),(e.preOrderCheckHooks??=[]).push(n,o))}function Y0(n,t){for(let e=t.directiveStart,i=t.directiveEnd;e<i;e++){let o=n.data[e].type.prototype,{ngAfterContentInit:s,ngAfterContentChecked:a,ngAfterViewInit:l,ngAfterViewChecked:c,ngOnDestroy:d}=o;s&&(n.contentHooks??=[]).push(-e,s),a&&((n.contentHooks??=[]).push(e,a),(n.contentCheckHooks??=[]).push(e,a)),l&&(n.viewHooks??=[]).push(-e,l),c&&((n.viewHooks??=[]).push(e,c),(n.viewCheckHooks??=[]).push(e,c)),d!=null&&(n.destroyHooks??=[]).push(e,d)}}function ku(n,t,e){Z0(n,t,3,e)}function Au(n,t,e,i){(n[ae]&3)===e&&Z0(n,t,e,i)}function Cg(n,t){let e=n[ae];(e&3)===t&&(e&=16383,e+=1,n[ae]=e)}function Z0(n,t,e,i){let r=i!==void 0?n[Bo]&65535:0,o=i??-1,s=t.length-1,a=0;for(let l=r;l<s;l++)if(typeof t[l+1]=="number"){if(a=t[l],i!=null&&a>=i)break}else t[l]<0&&(n[Bo]+=65536),(a<o||o==-1)&&(SA(n,e,t,l),n[Bo]=(n[Bo]&4294901760)+l+2),l++}function f0(n,t){Ne(xe.LifecycleHookStart,n,t);let e=z(null);try{t.call(n)}finally{z(e),Ne(xe.LifecycleHookEnd,n,t)}}function SA(n,t,e,i){let r=e[i]<0,o=e[i+1],s=r?-e[i]:e[i],a=n[s];r?n[ae]>>14<n[Bo]>>16&&(n[ae]&3)===t&&(n[ae]+=16384,f0(a,o)):f0(a,o)}var Qs=-1,Wo=class{factory;name;injectImpl;resolving=!1;canSeeViewProviders;multi;componentProviders;index;providerFactory;constructor(t,e,i,r){this.factory=t,this.name=r,this.canSeeViewProviders=e,this.injectImpl=i}};function xA(n){return(n.flags&8)!==0}function TA(n){return(n.flags&16)!==0}function MA(n,t,e){let i=0;for(;i<e.length;){let r=e[i];if(typeof r=="number"){if(r!==0)break;i++;let o=e[i++],s=e[i++],a=e[i++];n.setAttribute(t,s,a,o)}else{let o=r,s=e[++i];IA(o)?n.setProperty(t,o,s):n.setAttribute(t,o,s),i++}}return i}function X0(n){return n===3||n===4||n===6}function IA(n){return n.charCodeAt(0)===64}function Js(n,t){if(!(t===null||t.length===0))if(n===null||n.length===0)n=t.slice();else{let e=-1;for(let i=0;i<t.length;i++){let r=t[i];typeof r=="number"?e=r:e===0||(e===-1||e===2?p0(n,e,r,null,t[++i]):p0(n,e,r,null,null))}}return n}function p0(n,t,e,i,r){let o=0,s=n.length;if(t===-1)s=-1;else for(;o<n.length;){let a=n[o++];if(typeof a=="number"){if(a===t){s=-1;break}else if(a>t){s=o-1;break}}}for(;o<n.length;){let a=n[o];if(typeof a=="number")break;if(a===e){r!==null&&(n[o+1]=r);return}o++,r!==null&&o++}s!==-1&&(n.splice(s,0,t),o=s+1),n.splice(o++,0,e),r!==null&&n.splice(o++,0,r)}function Q0(n){return n!==Qs}function Fu(n){return n&32767}function kA(n){return n>>16}function Lu(n,t){let e=kA(n),i=t;for(;e>0;)i=i[Vo],e--;return i}var Og=!0;function Vu(n){let t=Og;return Og=n,t}var AA=256,J0=AA-1,eE=5,OA=0,Vi={};function RA(n,t,e){let i;typeof e=="string"?i=e.charCodeAt(0)||0:e.hasOwnProperty(Fo)&&(i=e[Fo]),i==null&&(i=e[Fo]=OA++);let r=i&J0,o=1<<r;t.data[n+(r>>eE)]|=o}function Bu(n,t){let e=tE(n,t);if(e!==-1)return e;let i=t[X];i.firstCreatePass&&(n.injectorIndex=t.length,Dg(i.data,n),Dg(t,null),Dg(i.blueprint,null));let r=my(n,t),o=n.injectorIndex;if(Q0(r)){let s=Fu(r),a=Lu(r,t),l=a[X].data;for(let c=0;c<8;c++)t[o+c]=a[s+c]|l[s+c]}return t[o+8]=r,o}function Dg(n,t){n.push(0,0,0,0,0,0,0,0,t)}function tE(n,t){return n.injectorIndex===-1||n.parent&&n.parent.injectorIndex===n.injectorIndex||t[n.injectorIndex+8]===null?-1:n.injectorIndex}function my(n,t){if(n.parent&&n.parent.injectorIndex!==-1)return n.parent.injectorIndex;let e=0,i=null,r=t;for(;r!==null;){if(i=sE(r),i===null)return Qs;if(e++,r=r[Vo],i.injectorIndex!==-1)return i.injectorIndex|e<<16}return Qs}function Rg(n,t,e){RA(n,t,e)}function PA(n,t){if(t==="class")return n.classes;if(t==="style")return n.styles;let e=n.attrs;if(e){let i=e.length,r=0;for(;r<i;){let o=e[r];if(X0(o))break;if(o===0)r=r+2;else if(typeof o=="number")for(r++;r<i&&typeof e[r]=="string";)r++;else{if(o===t)return e[r+1];r=r+2}}}return null}function nE(n,t,e){if(e&8||n!==void 0)return n;lu(t,"NodeInjector")}function iE(n,t,e,i){if(e&8&&i===void 0&&(i=null),(e&3)===0){let r=n[lr],o=en(void 0);try{return r?r.get(t,i,e&8):Fm(t,i,e&8)}finally{en(o)}}return nE(i,t,e)}function rE(n,t,e,i=0,r){if(n!==null){if(t[ae]&2048&&!(i&2)){let s=VA(n,t,e,i,Vi);if(s!==Vi)return s}let o=oE(n,t,e,i,Vi);if(o!==Vi)return o}return iE(t,e,i,r)}function oE(n,t,e,i,r){let o=FA(e);if(typeof o=="function"){if(!fg(t,n,i))return i&1?nE(r,e,i):iE(t,e,i,r);try{let s;if(s=o(i),s==null&&!(i&8))lu(e);else return s}finally{pg()}}else if(typeof o=="number"){let s=null,a=tE(n,t),l=Qs,c=i&1?t[nn][tn]:null;for((a===-1||i&4)&&(l=a===-1?my(n,t):t[a+8],l===Qs||!m0(i,!1)?a=-1:(s=t[X],a=Fu(l),t=Lu(l,t)));a!==-1;){let d=t[X];if(h0(o,a,d.data)){let u=NA(a,t,e,s,i,c);if(u!==Vi)return u}l=t[a+8],l!==Qs&&m0(i,t[X].data[a+8]===c)&&h0(o,a,t)?(s=d,a=Fu(l),t=Lu(l,t)):a=-1}}return r}function NA(n,t,e,i,r,o){let s=t[X],a=s.data[n+8],l=i==null?Fi(a)&&Og:i!=s&&(a.type&3)!==0,c=r&1&&o===a,d=Ou(a,s,e,l,c);return d!==null?Ll(t,s,d,a,r):Vi}function Ou(n,t,e,i,r){let o=n.providerIndexes,s=t.data,a=o&1048575,l=n.directiveStart,c=n.directiveEnd,d=o>>20,u=i?a:a+d,p=r?a+d:c;for(let g=u;g<p;g++){let _=s[g];if(g<l&&e===_||g>=l&&_.type===e)return g}if(r){let g=s[l];if(g&&Li(g)&&g.type===e)return l}return null}function Ll(n,t,e,i,r){let o=n[e],s=t.data;if(o instanceof Wo){let a=o;if(a.resolving)throw Nm("");let l=Vu(a.canSeeViewProviders);a.resolving=!0;let c=s[e].type||s[e],d,u=a.injectImpl?en(a.injectImpl):null,p=fg(n,i,0);try{o=n[e]=a.factory(void 0,r,s,n,i),t.firstCreatePass&&e>=i.directiveStart&&wA(e,s[e],t)}finally{u!==null&&en(u),Vu(l),a.resolving=!1,pg()}}return o}function FA(n){if(typeof n=="string")return n.charCodeAt(0)||0;let t=n.hasOwnProperty(Fo)?n[Fo]:void 0;return typeof t=="number"?t>=0?t&J0:LA:t}function h0(n,t,e){let i=1<<n;return!!(e[t+(n>>eE)]&i)}function m0(n,t){return!(n&2)&&!(n&1&&t)}var zo=class{_tNode;_lView;constructor(t,e){this._tNode=t,this._lView=e}get(t,e,i){return rE(this._tNode,this._lView,t,Ro(i),e)}};function LA(){return new zo(Nt(),oe())}function mn(n){return $l(()=>{let t=n.prototype.constructor,e=t[vl]||Pg(t),i=Object.prototype,r=Object.getPrototypeOf(n.prototype).constructor;for(;r&&r!==i;){let o=r[vl]||Pg(r);if(o&&o!==e)return o;r=Object.getPrototypeOf(r)}return o=>new o})}function Pg(n){return xm(n)?()=>{let t=Pg(Pt(n));return t&&t()}:Ur(n)}function VA(n,t,e,i,r){let o=n,s=t;for(;o!==null&&s!==null&&s[ae]&2048&&!Ks(s);){let a=oE(o,s,e,i|2,Vi);if(a!==Vi)return a;let l=o.parent;if(!l){let c=s[zm];if(c){let d=c.get(e,Vi,i&-5);if(d!==Vi)return d}l=sE(s),s=s[Vo]}o=l}return r}function sE(n){let t=n[X],e=t.type;return e===2?t.declTNode:e===1?n[tn]:null}function zl(n){return PA(Nt(),n)}function BA(){return ra(Nt(),oe())}function ra(n,t){return new Q(Wn(n,t))}var Q=(()=>{class n{nativeElement;constructor(e){this.nativeElement=e}static __NG_ELEMENT_ID__=BA}return n})();function aE(n){return n instanceof Q?n.nativeElement:n}function jA(){return this._results[Symbol.iterator]()}var yi=class{_emitDistinctChangesOnly;dirty=!0;_onDirty=void 0;_results=[];_changesDetected=!1;_changes=void 0;length=0;first=void 0;last=void 0;get changes(){return this._changes??=new E}constructor(t=!1){this._emitDistinctChangesOnly=t}get(t){return this._results[t]}map(t){return this._results.map(t)}filter(t){return this._results.filter(t)}find(t){return this._results.find(t)}reduce(t,e){return this._results.reduce(t,e)}forEach(t){this._results.forEach(t)}some(t){return this._results.some(t)}toArray(){return this._results.slice()}toString(){return this._results.toString()}reset(t,e){this.dirty=!1;let i=MD(t);(this._changesDetected=!TD(this._results,i,e))&&(this._results=i,this.length=i.length,this.last=i[this.length-1],this.first=i[0])}notifyOnChanges(){this._changes!==void 0&&(this._changesDetected||!this._emitDistinctChangesOnly)&&this._changes.next(this)}onDirty(t){this._onDirty=t}setDirty(){this.dirty=!0,this._onDirty?.()}destroy(){this._changes!==void 0&&(this._changes.complete(),this._changes.unsubscribe())}[Symbol.iterator]=jA};function lE(n){return(n.flags&128)===128}var gy=(function(n){return n[n.OnPush=0]="OnPush",n[n.Eager=1]="Eager",n[n.Default=1]="Default",n})(gy||{}),cE=new Map,UA=0;function HA(){return UA++}function $A(n){cE.set(n[cr],n)}function Ng(n){cE.delete(n[cr])}var g0="__ngContext__";function ea(n,t){dr(t)?(n[g0]=t[cr],$A(t)):n[g0]=t}function dE(n){return fE(n[qs])}function uE(n){return fE(n[$n])}function fE(n){for(;n!==null&&!pi(n);)n=n[$n];return n}var zA;function yy(n){zA=n}var Jr=new C("",{factory:()=>WA}),WA="ng";var Qu=new C(""),Yo=new C("",{providedIn:"platform",factory:()=>"unknown"}),Wl=new C(""),oa=new C("",{factory:()=>f(he).body?.querySelector("[ngCspNonce]")?.getAttribute("ngCspNonce")||null});var pE="r";var hE="di";var mE=!1,gE=new C("",{factory:()=>mE});var y0=new WeakMap;function GA(n,t){if(n==null||typeof n!="object")return;let e=y0.get(n);e||(e=new WeakSet,y0.set(n,e)),e.add(t)}var qA=(n,t,e,i)=>{};function KA(n,t,e,i){qA(n,t,e,i)}function Ju(n){return(n.flags&32)===32}var YA=()=>null;function yE(n,t,e=!1){return YA(n,t,e)}function vE(n,t){let e=n.contentQueries;if(e!==null){let i=z(null);try{for(let r=0;r<e.length;r+=2){let o=e[r],s=e[r+1];if(s!==-1){let a=n.data[s];kl(o),a.contentQueries(2,t[s],s)}}}finally{z(i)}}}function Fg(n,t,e){kl(0);let i=z(null);try{t(n,e)}finally{z(i)}}function _E(n,t,e){if(Gm(t)){let i=z(null);try{let r=t.directiveStart,o=t.directiveEnd;for(let s=r;s<o;s++){let a=n.data[s];if(a.contentQueries){let l=e[s];a.contentQueries(1,l,s)}}}finally{z(i)}}}var vi=(function(n){return n[n.Emulated=0]="Emulated",n[n.None=2]="None",n[n.ShadowDom=3]="ShadowDom",n[n.ExperimentalIsolatedShadowDom=4]="ExperimentalIsolatedShadowDom",n})(vi||{});var xu;function ZA(){if(xu===void 0&&(xu=null,Hn.trustedTypes))try{xu=Hn.trustedTypes.createPolicy("angular",{createHTML:n=>n,createScript:n=>n,createScriptURL:n=>n})}catch{}return xu}function ef(n){return ZA()?.createHTML(n)||n}var Tu;function XA(){if(Tu===void 0&&(Tu=null,Hn.trustedTypes))try{Tu=Hn.trustedTypes.createPolicy("angular#unsafe-bypass",{createHTML:n=>n,createScript:n=>n,createScriptURL:n=>n})}catch{}return Tu}function v0(n){return XA()?.createScriptURL(n)||n}var pr=class{changingThisBreaksApplicationSecurity;constructor(t){this.changingThisBreaksApplicationSecurity=t}toString(){return`SafeValue must use [property]=binding: ${this.changingThisBreaksApplicationSecurity} (see ${iu})`}},Lg=class extends pr{getTypeName(){return"HTML"}},Vg=class extends pr{getTypeName(){return"Style"}},Bg=class extends pr{getTypeName(){return"Script"}},jg=class extends pr{getTypeName(){return"URL"}},Ug=class extends pr{getTypeName(){return"ResourceURL"}};function _i(n){return n instanceof pr?n.changingThisBreaksApplicationSecurity:n}function hr(n,t){let e=bE(n);if(e!=null&&e!==t){if(e==="ResourceURL"&&t==="URL")return!0;throw new Error(`Required a safe ${t}, got a ${e} (see ${iu})`)}return e===t}function bE(n){return n instanceof pr&&n.getTypeName()||null}function vy(n){return new Lg(n)}function _y(n){return new Vg(n)}function by(n){return new Bg(n)}function Cy(n){return new jg(n)}function Dy(n){return new Ug(n)}function QA(n){let t=new $g(n);return JA()?new Hg(t):t}var Hg=class{inertDocumentHelper;constructor(t){this.inertDocumentHelper=t}getInertBodyElement(t){t="<body><remove></remove>"+t;try{let e=new window.DOMParser().parseFromString(ef(t),"text/html").body;return e===null?this.inertDocumentHelper.getInertBodyElement(t):(e.firstChild?.remove(),e)}catch{return null}}},$g=class{defaultDoc;inertDocument;constructor(t){this.defaultDoc=t,this.inertDocument=this.defaultDoc.implementation.createHTMLDocument("sanitization-inert")}getInertBodyElement(t){let e=this.inertDocument.createElement("template");return e.innerHTML=ef(t),e}};function JA(){try{return!!new window.DOMParser().parseFromString(ef(""),"text/html")}catch{return!1}}var eO=/^(?!javascript:)(?:[a-z0-9+.-]+:|[^&:\/?#]*(?:[\/?#]|$))/i;function Gl(n){return n=String(n),n.match(eO)?n:"unsafe:"+n}function mr(n){let t={};for(let e of n.split(","))t[e]=!0;return t}function ql(...n){let t={};for(let e of n)for(let i in e)e.hasOwnProperty(i)&&(t[i]=!0);return t}var CE=mr("area,br,col,hr,img,wbr"),DE=mr("colgroup,dd,dt,li,p,tbody,td,tfoot,th,thead,tr"),EE=mr("rp,rt"),tO=ql(EE,DE),nO=ql(DE,mr("address,article,aside,blockquote,caption,center,del,details,dialog,dir,div,dl,figure,figcaption,footer,h1,h2,h3,h4,h5,h6,header,hgroup,hr,ins,main,map,menu,nav,ol,pre,section,summary,table,ul")),iO=ql(EE,mr("a,abbr,acronym,audio,b,bdi,bdo,big,br,cite,code,del,dfn,em,font,i,img,ins,kbd,label,map,mark,picture,q,ruby,rp,rt,s,samp,small,source,span,strike,strong,sub,sup,time,track,tt,u,var,video")),_0=ql(CE,nO,iO,tO),wE=mr("background,cite,href,itemtype,longdesc,poster,src,xlink:href"),rO=mr("abbr,accesskey,align,alt,autoplay,axis,bgcolor,border,cellpadding,cellspacing,class,clear,color,cols,colspan,compact,controls,coords,datetime,default,dir,download,face,headers,height,hidden,hreflang,hspace,ismap,itemscope,itemprop,kind,label,lang,language,loop,media,muted,nohref,nowrap,open,preload,rel,rev,role,rows,rowspan,rules,scope,scrolling,shape,size,sizes,span,srclang,srcset,start,summary,tabindex,target,title,translate,type,usemap,valign,value,vspace,width"),oO=mr("aria-activedescendant,aria-atomic,aria-autocomplete,aria-busy,aria-checked,aria-colcount,aria-colindex,aria-colspan,aria-controls,aria-current,aria-describedby,aria-details,aria-disabled,aria-dropeffect,aria-errormessage,aria-expanded,aria-flowto,aria-grabbed,aria-haspopup,aria-hidden,aria-invalid,aria-keyshortcuts,aria-label,aria-labelledby,aria-level,aria-live,aria-modal,aria-multiline,aria-multiselectable,aria-orientation,aria-owns,aria-placeholder,aria-posinset,aria-pressed,aria-readonly,aria-relevant,aria-required,aria-roledescription,aria-rowcount,aria-rowindex,aria-rowspan,aria-selected,aria-setsize,aria-sort,aria-valuemax,aria-valuemin,aria-valuenow,aria-valuetext"),sO=ql(wE,rO,oO),aO=mr("script,style,template"),zg=class{sanitizedSomething=!1;buf=[];sanitizeChildren(t){let e=t.firstChild,i=!0,r=[];for(;e;){if(e.nodeType===Node.ELEMENT_NODE?i=this.startElement(e):e.nodeType===Node.TEXT_NODE?this.chars(e.nodeValue):this.sanitizedSomething=!0,i&&e.firstChild){r.push(e),e=dO(e);continue}for(;e;){e.nodeType===Node.ELEMENT_NODE&&this.endElement(e);let o=cO(e);if(o){e=o;break}e=r.pop()}}return this.buf.join("")}startElement(t){let e=b0(t).toLowerCase();if(!_0.hasOwnProperty(e))return this.sanitizedSomething=!0,!aO.hasOwnProperty(e);this.buf.push("<"),this.buf.push(e);let i=t.attributes;for(let r=0;r<i.length;r++){let o=i.item(r),s=o.name,a=s.toLowerCase();if(!sO.hasOwnProperty(a)){this.sanitizedSomething=!0;continue}let l=o.value;wE[a]&&(l=Gl(l)),this.buf.push(" ",s,'="',C0(l),'"')}return this.buf.push(">"),!0}endElement(t){let e=b0(t).toLowerCase();_0.hasOwnProperty(e)&&!CE.hasOwnProperty(e)&&(this.buf.push("</"),this.buf.push(e),this.buf.push(">"))}chars(t){this.buf.push(C0(t))}};function lO(n,t){return(n.compareDocumentPosition(t)&Node.DOCUMENT_POSITION_CONTAINED_BY)!==Node.DOCUMENT_POSITION_CONTAINED_BY}function cO(n){let t=n.nextSibling;if(t&&n!==t.previousSibling)throw SE(t);return t}function dO(n){let t=n.firstChild;if(t&&lO(n,t))throw SE(t);return t}function b0(n){let t=n.nodeName;return typeof t=="string"?t:"FORM"}function SE(n){return new Error(`Failed to sanitize html because the element is clobbered: ${n.outerHTML}`)}var uO=/[\uD800-\uDBFF][\uDC00-\uDFFF]/g,fO=/([^\#-~ |!])/g;function C0(n){return n.replace(/&/g,"&amp;").replace(uO,function(t){let e=t.charCodeAt(0),i=t.charCodeAt(1);return"&#"+((e-55296)*1024+(i-56320)+65536)+";"}).replace(fO,function(t){return"&#"+t.charCodeAt(0)+";"}).replace(/</g,"&lt;").replace(/>/g,"&gt;")}var Mu;function Ey(n,t){let e=null;try{Mu=Mu||QA(n);let i=t?String(t):"";e=Mu.getInertBodyElement(i);let r=5,o=i;do{if(r===0)throw new Error("Failed to sanitize html because the input is unstable");r--,i=o,o=e.innerHTML,e=Mu.getInertBodyElement(i)}while(i!==o);let a=new zg().sanitizeChildren(D0(e)||e);return ef(a)}finally{if(e){let i=D0(e)||e;for(;i.firstChild;)i.firstChild.remove()}}}function D0(n){return"content"in n&&pO(n)?n.content:null}function pO(n){return n.nodeType===Node.ELEMENT_NODE&&n.nodeName==="TEMPLATE"}function hO(n,t){return n.createText(t)}function mO(n,t,e){n.setValue(t,e)}function xE(n,t,e){return n.createElement(t,e)}function ju(n,t,e,i,r){n.insertBefore(t,e,i,r)}function TE(n,t,e){n.appendChild(t,e)}function E0(n,t,e,i,r){i!==null?ju(n,t,e,i,r):TE(n,t,e)}function ME(n,t,e,i){n.removeChild(null,t,e,i)}function gO(n,t,e){n.setAttribute(t,"style",e)}function yO(n,t,e){e===""?n.removeAttribute(t,"class"):n.setAttribute(t,"class",e)}function IE(n,t,e){let{mergedAttrs:i,classes:r,styles:o}=e;i!==null&&MA(n,t,i),r!==null&&yO(n,t,r),o!==null&&gO(n,t,o)}var An=(function(n){return n[n.NONE=0]="NONE",n[n.HTML=1]="HTML",n[n.STYLE=2]="STYLE",n[n.SCRIPT=3]="SCRIPT",n[n.URL=4]="URL",n[n.RESOURCE_URL=5]="RESOURCE_URL",n[n.ATTRIBUTE_NO_BINDING=6]="ATTRIBUTE_NO_BINDING",n})(An||{});function kE(n){let t=OE();return t?t.sanitize(An.URL,n)||"":hr(n,"URL")?_i(n):Gl(au(n))}function AE(n){let t=OE();if(t)return v0(t.sanitize(An.RESOURCE_URL,n)||"");if(hr(n,"ResourceURL"))return v0(_i(n));throw new x(904,!1)}var vO={embed:{src:!0},frame:{src:!0},iframe:{src:!0},media:{src:!0},base:{href:!0},link:{href:!0},object:{data:!0,codebase:!0}};function _O(n,t){return vO[n.toLowerCase()]?.[t.toLowerCase()]===!0?AE:kE}function wy(n,t,e){return _O(t,e)(n)}function OE(){let n=oe();return n&&n[fi].sanitizer}function RE(n){return n instanceof Function?n():n}function bO(n,t,e){let i=n.length;for(;;){let r=n.indexOf(t,e);if(r===-1)return r;if(r===0||n.charCodeAt(r-1)<=32){let o=t.length;if(r+o===i||n.charCodeAt(r+o)<=32)return r}e=r+1}}var PE="ng-template";function CO(n,t,e,i){let r=0;if(i){for(;r<t.length&&typeof t[r]=="string";r+=2)if(t[r]==="class"&&bO(t[r+1].toLowerCase(),e,0)!==-1)return!0}else if(Sy(n))return!1;if(r=t.indexOf(1,r),r>-1){let o;for(;++r<t.length&&typeof(o=t[r])=="string";)if(o.toLowerCase()===e)return!0}return!1}function Sy(n){return n.type===4&&n.value!==PE}function DO(n,t,e){let i=n.type===4&&!e?PE:n.value;return t===i}function EO(n,t,e){let i=4,r=n.attrs,o=r!==null?xO(r):0,s=!1;for(let a=0;a<t.length;a++){let l=t[a];if(typeof l=="number"){if(!s&&!mi(i)&&!mi(l))return!1;if(s&&mi(l))continue;s=!1,i=l|i&1;continue}if(!s)if(i&4){if(i=2|i&1,l!==""&&!DO(n,l,e)||l===""&&t.length===1){if(mi(i))return!1;s=!0}}else if(i&8){if(r===null||!CO(n,r,l,e)){if(mi(i))return!1;s=!0}}else{let c=t[++a],d=wO(l,r,Sy(n),e);if(d===-1){if(mi(i))return!1;s=!0;continue}if(c!==""){let u;if(d>o?u="":u=r[d+1].toLowerCase(),i&2&&c!==u){if(mi(i))return!1;s=!0}}}}return mi(i)||s}function mi(n){return(n&1)===0}function wO(n,t,e,i){if(t===null)return-1;let r=0;if(i||!e){let o=!1;for(;r<t.length;){let s=t[r];if(s===n)return r;if(s===3||s===6)o=!0;else if(s===1||s===2){let a=t[++r];for(;typeof a=="string";)a=t[++r];continue}else{if(s===4)break;if(s===0){r+=4;continue}}r+=o?1:2}return-1}else return TO(t,n)}function NE(n,t,e=!1){for(let i=0;i<t.length;i++)if(EO(n,t[i],e))return!0;return!1}function SO(n){let t=n.attrs;if(t!=null){let e=t.indexOf(5);if((e&1)===0)return t[e+1]}return null}function xO(n){for(let t=0;t<n.length;t++){let e=n[t];if(X0(e))return t}return n.length}function TO(n,t){let e=n.indexOf(4);if(e>-1)for(e++;e<n.length;){let i=n[e];if(typeof i=="number")return-1;if(i===t)return e;e++}return-1}function MO(n,t){e:for(let e=0;e<t.length;e++){let i=t[e];if(n.length===i.length){for(let r=0;r<n.length;r++)if(n[r]!==i[r])continue e;return!0}}return!1}function w0(n,t){return n?":not("+t.trim()+")":t}function IO(n){let t=n[0],e=1,i=2,r="",o=!1;for(;e<n.length;){let s=n[e];if(typeof s=="string")if(i&2){let a=n[++e];r+="["+s+(a.length>0?'="'+a+'"':"")+"]"}else i&8?r+="."+s:i&4&&(r+=" "+s);else r!==""&&!mi(s)&&(t+=w0(o,r),r=""),i=s,o=o||!mi(i);e++}return r!==""&&(t+=w0(o,r)),t}function kO(n){return n.map(IO).join(",")}function AO(n){let t=[],e=[],i=1,r=2;for(;i<n.length;){let o=n[i];if(typeof o=="string")r===2?o!==""&&t.push(o,n[++i]):r===8&&e.push(o);else{if(!mi(r))break;r=o}i++}return e.length&&t.push(1,...e),t}var Yn={};function xy(n,t,e,i,r,o,s,a,l,c,d){let u=Qe+i,p=u+r,g=OO(u,p),_=typeof c=="function"?c():c;return g[X]={type:n,blueprint:g,template:e,queries:null,viewQuery:a,declTNode:t,data:g.slice().fill(null,u),bindingStartIndex:u,expandoStartIndex:p,hostBindingOpCodes:null,firstCreatePass:!0,firstUpdatePass:!0,staticViewQueries:!1,staticContentQueries:!1,preOrderHooks:null,preOrderCheckHooks:null,contentHooks:null,contentCheckHooks:null,viewHooks:null,viewCheckHooks:null,destroyHooks:null,cleanup:null,contentQueries:null,components:null,directiveRegistry:typeof o=="function"?o():o,pipeRegistry:typeof s=="function"?s():s,firstChild:null,schemas:l,consts:_,incompleteFirstPass:!1,ssrId:d}}function OO(n,t){let e=[];for(let i=0;i<t;i++)e.push(i<n?null:Yn);return e}function RO(n){let t=n.tView;return t===null||t.incompleteFirstPass?n.tView=xy(1,null,n.template,n.decls,n.vars,n.directiveDefs,n.pipeDefs,n.viewQuery,n.schemas,n.consts,n.id):t}function Ty(n,t,e,i,r,o,s,a,l,c,d){let u=t.blueprint.slice();return u[ui]=r,u[ae]=i|4|128|8|64|1024,(c!==null||n&&n[ae]&2048)&&(u[ae]|=2048),Zm(u),u[St]=u[Vo]=n,u[ft]=e,u[fi]=s||n&&n[fi],u[Ge]=a||n&&n[Ge],u[lr]=l||n&&n[lr]||null,u[tn]=o,u[cr]=HA(),u[Lo]=d,u[zm]=c,u[nn]=t.type==2?n[nn]:u,u}function PO(n,t,e){let i=Wn(t,n),r=RO(e),o=n[fi].rendererFactory,s=My(n,Ty(n,r,null,FE(e),i,t,null,o.createRenderer(i,e),null,null,null));return n[t.index]=s}function FE(n){let t=16;return n.signals?t=4096:n.onPush&&(t=64),t}function LE(n,t,e,i){if(e===0)return-1;let r=t.length;for(let o=0;o<e;o++)t.push(i),n.blueprint.push(i),n.data.push(null);return r}function My(n,t){return n[qs]?n[$m][$n]=t:n[qs]=t,n[$m]=t,t}function y(n=1){VE(Je(),oe(),ur()+n,!1)}function VE(n,t,e,i){if(!i)if((t[ae]&3)===3){let o=n.preOrderCheckHooks;o!==null&&ku(t,o,e)}else{let o=n.preOrderHooks;o!==null&&Au(t,o,0,e)}Zr(e)}var tf=(function(n){return n[n.None=0]="None",n[n.SignalBased=1]="SignalBased",n[n.HasDecoratorInputTransform=2]="HasDecoratorInputTransform",n})(tf||{});function Wg(n,t,e,i){let r=z(null);try{let[o,s,a]=n.inputs[e],l=null;(s&tf.SignalBased)!==0&&(l=t[o][ct]),l!==null&&l.transformFn!==void 0?i=l.transformFn(i):a!==null&&(i=a.call(t,i)),n.setInput!==null?n.setInput(t,l,i,e,o):W0(t,l,o,i)}finally{z(r)}}var Bi=(function(n){return n[n.Important=1]="Important",n[n.DashCase=2]="DashCase",n})(Bi||{}),NO;function Iy(n,t){return NO(n,t)}var gG=typeof document<"u"&&typeof document?.documentElement?.getAnimations=="function";var Gg=new WeakMap,Pl=new WeakSet;function FO(n,t){let e=Gg.get(n);if(!e||e.length===0)return;let i=t.parentNode,r=t.previousSibling;for(let o=e.length-1;o>=0;o--){let s=e[o],a=s.parentNode;s===t?(e.splice(o,1),Pl.add(s),s.dispatchEvent(new CustomEvent("animationend",{detail:{cancel:!0}}))):(r&&s===r||a&&i&&a!==i)&&(e.splice(o,1),s.dispatchEvent(new CustomEvent("animationend",{detail:{cancel:!0}})),s.parentNode?.removeChild(s))}}function LO(n,t){let e=Gg.get(n);e?e.includes(t)||e.push(t):Gg.set(n,[t])}var Go=new Set,nf=(function(n){return n[n.CHANGE_DETECTION=0]="CHANGE_DETECTION",n[n.AFTER_NEXT_RENDER=1]="AFTER_NEXT_RENDER",n})(nf||{}),gr=new C(""),S0=new Set;function yr(n){S0.has(n)||(S0.add(n),performance?.mark?.("mark_feature_usage",{detail:{feature:n}}))}var rf=(()=>{class n{impl=null;execute(){this.impl?.execute()}static \u0275prov=D({token:n,providedIn:"root",factory:()=>new n})}return n})(),ky=[0,1,2,3],Ay=(()=>{class n{ngZone=f(U);scheduler=f(ir);errorHandler=f(Un,{optional:!0});sequences=new Set;deferredRegistrations=new Set;executing=!1;constructor(){f(gr,{optional:!0})}execute(){let e=this.sequences.size>0;e&&Ne(xe.AfterRenderHooksStart),this.executing=!0;for(let i of ky)for(let r of this.sequences)if(!(r.erroredOrDestroyed||!r.hooks[i]))try{r.pipelinedValue=this.ngZone.runOutsideAngular(()=>this.maybeTrace(()=>{let o=r.hooks[i];return o(r.pipelinedValue)},r.snapshot))}catch(o){r.erroredOrDestroyed=!0,this.errorHandler?.handleError(o)}this.executing=!1;for(let i of this.sequences)i.afterRun(),i.once&&(this.sequences.delete(i),i.destroy());for(let i of this.deferredRegistrations)this.sequences.add(i);this.deferredRegistrations.size>0&&this.scheduler.notify(7),this.deferredRegistrations.clear(),e&&Ne(xe.AfterRenderHooksEnd)}register(e){let{view:i}=e;i!==void 0?((i[jo]??=[]).push(e),$o(i),i[ae]|=8192):this.executing?this.deferredRegistrations.add(e):this.addSequence(e)}addSequence(e){this.sequences.add(e),this.scheduler.notify(7)}unregister(e){this.executing&&this.sequences.has(e)?(e.erroredOrDestroyed=!0,e.pipelinedValue=void 0,e.once=!0):(this.sequences.delete(e),this.deferredRegistrations.delete(e))}maybeTrace(e,i){return i?i.run(nf.AFTER_NEXT_RENDER,e):e()}static \u0275prov=D({token:n,providedIn:"root",factory:()=>new n})}return n})(),Vl=class{impl;hooks;view;once;snapshot;erroredOrDestroyed=!1;pipelinedValue=void 0;unregisterOnDestroy;constructor(t,e,i,r,o,s=null){this.impl=t,this.hooks=e,this.view=i,this.once=r,this.snapshot=s,this.unregisterOnDestroy=o?.onDestroy(()=>this.destroy())}afterRun(){this.erroredOrDestroyed=!1,this.pipelinedValue=void 0,this.snapshot?.dispose(),this.snapshot=null}destroy(){this.impl.unregister(this),this.unregisterOnDestroy?.();let t=this.view?.[jo];t&&(this.view[jo]=t.filter(e=>e!==this))}};function xt(n,t){let e=t?.injector??f(le);return yr("NgAfterNextRender"),BO(n,e,t,!0)}function VO(n){return n instanceof Function?[void 0,void 0,n,void 0]:[n.earlyRead,n.write,n.mixedReadWrite,n.read]}function BO(n,t,e,i){let r=t.get(rf);r.impl??=t.get(Ay);let o=t.get(gr,null,{optional:!0}),s=e?.manualCleanup!==!0?t.get(at):null,a=t.get(Zs,null,{optional:!0}),l=new Vl(r.impl,VO(n),a?.view,i,s,o?.snapshot(null));return r.impl.register(l),l}var BE=new C("",{factory:()=>({queue:new Set,isScheduled:!1,scheduler:null,injector:f(We)})});function jE(n,t,e){let i=n.get(BE);if(Array.isArray(t))for(let r of t)i.queue.add(r),e?.detachedLeaveAnimationFns?.push(r);else i.queue.add(t),e?.detachedLeaveAnimationFns?.push(t);i.scheduler&&i.scheduler(n)}function jO(n,t){let e=n.get(BE);if(t.detachedLeaveAnimationFns){for(let i of t.detachedLeaveAnimationFns)e.queue.delete(i);t.detachedLeaveAnimationFns=void 0}}function UO(n,t){for(let[e,i]of t)jE(n,i.animateFns)}function x0(n,t,e,i){let r=n?.[qr]?.enter;t!==null&&r&&r.has(e.index)&&UO(i,r)}function Xs(n,t,e,i,r,o,s,a){if(r!=null){let l,c=!1;pi(r)?l=r:dr(r)&&(c=!0,r=r[ui]);let d=zn(r);n===0&&i!==null?(x0(a,i,o,e),s==null?TE(t,i,d):ju(t,i,d,s||null,!0)):n===1&&i!==null?(x0(a,i,o,e),ju(t,i,d,s||null,!0),FO(o,d)):n===2?(a?.[qr]?.leave?.has(o.index)&&LO(o,d),Pl.delete(d),T0(a,o,e,u=>{if(Pl.has(d)){Pl.delete(d);return}ME(t,d,c,u)})):n===3&&(Pl.delete(d),T0(a,o,e,()=>{t.destroyNode(d)})),l!=null&&QO(t,n,e,l,o,i,s)}}function HO(n,t){UE(n,t),t[ui]=null,t[tn]=null}function $O(n,t,e,i,r,o){i[ui]=r,i[tn]=t,sf(n,i,e,1,r,o)}function UE(n,t){t[fi].changeDetectionScheduler?.notify(9),sf(n,t,t[Ge],2,null,null)}function zO(n){let t=n[qs];if(!t)return Eg(n[X],n);for(;t;){let e=null;if(dr(t))e=t[qs];else{let i=t[st];i&&(e=i)}if(!e){for(;t&&!t[$n]&&t!==n;)dr(t)&&Eg(t[X],t),t=t[St];t===null&&(t=n),dr(t)&&Eg(t[X],t),e=t&&t[$n]}t=e}}function Oy(n,t){let e=n[Uo],i=e.indexOf(t);e.splice(i,1)}function of(n,t){if(Ho(t))return;let e=t[Ge];e.destroyNode&&sf(n,t,e,3,null,null),zO(t)}function Eg(n,t){if(Ho(t))return;let e=z(null);try{t[ae]&=-129,t[ae]|=256,t[In]&&Fr(t[In]),qO(n,t),GO(n,t),t[X].type===1&&t[Ge].destroy();let i=t[Gr];if(i!==null&&pi(t[St])){i!==t[St]&&Oy(i,t);let r=t[Ni];r!==null&&r.detachView(n)}Ng(t)}finally{z(e)}}function T0(n,t,e,i){let r=n?.[qr];if(r==null||r.leave==null||!r.leave.has(t.index))return i(!1);n&&Go.add(n[cr]),jE(e,()=>{if(r.leave&&r.leave.has(t.index)){let s=r.leave.get(t.index),a=[];if(s){for(let l=0;l<s.animateFns.length;l++){let c=s.animateFns[l],{promise:d}=c();a.push(d)}r.detachedLeaveAnimationFns=void 0}r.running=Promise.allSettled(a),WO(n,i)}else n&&Go.delete(n[cr]),i(!1)},r)}function WO(n,t){let e=n[qr]?.running;if(e){e.then(()=>{n[qr].running=void 0,Go.delete(n[cr]),t(!0)});return}t(!1)}function GO(n,t){let e=n.cleanup,i=t[Gs];if(e!==null)for(let s=0;s<e.length-1;s+=2)if(typeof e[s]=="string"){let a=e[s+3];a>=0?i[a]():i[-a].unsubscribe(),s+=2}else{let a=i[e[s+1]];e[s].call(a)}i!==null&&(t[Gs]=null);let r=t[nr];if(r!==null){t[nr]=null;for(let s=0;s<r.length;s++){let a=r[s];a()}}let o=t[Hr];if(o!==null){t[Hr]=null;for(let s of o)s.destroy()}}function qO(n,t){let e;if(n!=null&&(e=n.destroyHooks)!=null)for(let i=0;i<e.length;i+=2){let r=t[e[i]];if(!(r instanceof Wo)){let o=e[i+1];if(Array.isArray(o))for(let s=0;s<o.length;s+=2){let a=r[o[s]],l=o[s+1];Ne(xe.LifecycleHookStart,a,l);try{l.call(a)}finally{Ne(xe.LifecycleHookEnd,a,l)}}else{Ne(xe.LifecycleHookStart,r,o);try{o.call(r)}finally{Ne(xe.LifecycleHookEnd,r,o)}}}}}function HE(n,t,e){return KO(n,t.parent,e)}function KO(n,t,e){let i=t;for(;i!==null&&i.type&168;)t=i,i=t.parent;if(i===null)return e[ui];if(Fi(i)){let{encapsulation:r}=n.data[i.directiveStart+i.componentOffset];if(r===vi.None||r===vi.Emulated)return null}return Wn(i,e)}function $E(n,t,e){return ZO(n,t,e)}function YO(n,t,e){return n.type&40?Wn(n,e):null}var ZO=YO,M0;function Ry(n,t,e,i){let r=HE(n,i,t),o=t[Ge],s=i.parent||t[tn],a=$E(s,i,t);if(r!=null)if(Array.isArray(e))for(let l=0;l<e.length;l++)E0(o,r,e[l],a,!1);else E0(o,r,e,a,!1);M0!==void 0&&M0(o,i,t,e,r)}function Nl(n,t){if(t!==null){let e=t.type;if(e&3)return Wn(t,n);if(e&4)return qg(-1,n[t.index]);if(e&8){let i=t.child;if(i!==null)return Nl(n,i);{let r=n[t.index];return pi(r)?qg(-1,r):zn(r)}}else{if(e&128)return Nl(n,t.next);if(e&32)return Iy(t,n)()||zn(n[t.index]);{let i=zE(n,t);if(i!==null){if(Array.isArray(i))return i[0];let r=$r(n[nn]);return Nl(r,i)}else return Nl(n,t.next)}}}return null}function zE(n,t){if(t!==null){let i=n[nn][tn],r=t.projection;return i.projection[r]}return null}function qg(n,t){let e=st+n+1;if(e<t.length){let i=t[e],r=i[X].firstChild;if(r!==null)return Nl(i,r)}return t[Kr]}function Py(n,t,e,i,r,o,s){for(;e!=null;){let a=i[lr];if(e.type===128){e=e.next;continue}let l=i[e.index],c=e.type;if(s&&t===0&&(l&&ea(zn(l),i),e.flags|=2),!Ju(e))if(c&8)Py(n,t,e.child,i,r,o,!1),Xs(t,n,a,r,l,e,o,i);else if(c&32){let d=Iy(e,i),u;for(;u=d();)Xs(t,n,a,r,u,e,o,i);Xs(t,n,a,r,l,e,o,i)}else c&16?WE(n,t,i,e,r,o):Xs(t,n,a,r,l,e,o,i);e=s?e.projectionNext:e.next}}function sf(n,t,e,i,r,o){Py(e,i,n.firstChild,t,r,o,!1)}function XO(n,t,e){let i=t[Ge],r=HE(n,e,t),o=e.parent||t[tn],s=$E(o,e,t);WE(i,0,t,e,r,s)}function WE(n,t,e,i,r,o){let s=e[nn],l=s[tn].projection[i.projection];if(Array.isArray(l))for(let c=0;c<l.length;c++){let d=l[c];Xs(t,n,e[lr],r,d,i,o,e)}else{let c=l,d=s[St];lE(i)&&(c.flags|=128),Py(n,t,c,d,r,o,!0)}}function QO(n,t,e,i,r,o,s){let a=i[Kr],l=zn(i);a!==l&&Xs(t,n,e,o,a,r,s);for(let c=st;c<i.length;c++){let d=i[c];sf(d[X],d,n,t,o,a)}}function JO(n,t,e,i,r){if(t)r?n.addClass(e,i):n.removeClass(e,i);else{let o=i.indexOf("-")===-1?void 0:Bi.DashCase;r==null?n.removeStyle(e,i,o):(typeof r=="string"&&r.endsWith("!important")&&(r=r.slice(0,-10),o|=Bi.Important),n.setStyle(e,i,r,o))}}function GE(n,t,e,i,r){let o=ur(),s=i&2;try{Zr(-1),s&&t.length>Qe&&VE(n,t,Qe,!1);let a=s?xe.TemplateUpdateStart:xe.TemplateCreateStart;Ne(a,r,e),e(i,r)}finally{Zr(o);let a=s?xe.TemplateUpdateEnd:xe.TemplateCreateEnd;Ne(a,r,e)}}function Ny(n,t,e){oR(n,t,e),(e.flags&64)===64&&sR(n,t,e)}function af(n,t,e=Wn){let i=t.localNames;if(i!==null){let r=t.index+1;for(let o=0;o<i.length;o+=2){let s=i[o+1],a=s===-1?e(t,n):n[s];n[r++]=a}}}function eR(n,t,e,i){let o=i.get(gE,mE)||e===vi.ShadowDom||e===vi.ExperimentalIsolatedShadowDom,s=n.selectRootElement(t,o);if(s.tagName.toLowerCase()==="script")throw new x(905,!1);return tR(s),s}function tR(n){nR(n)}var nR=()=>null;function iR(n){return n==="class"?"className":n==="for"?"htmlFor":n==="formaction"?"formAction":n==="innerHtml"?"innerHTML":n==="readonly"?"readOnly":n==="tabindex"?"tabIndex":n}function rR(n,t,e,i,r,o){let s=t[X];if(lf(n,s,t,e,i)){Fi(n)&&KE(t,n.index);return}n.type&3&&(e=iR(e)),qE(n,t,e,i,r,o)}function qE(n,t,e,i,r,o){if(n.type&3){let s=Wn(n,t);i=o!=null?o(i,n.value||"",e):i,r.setProperty(s,e,i)}else n.type&12}function KE(n,t){let e=Gn(t,n);e[ae]&16||(e[ae]|=64)}function oR(n,t,e){let i=e.directiveStart,r=e.directiveEnd;Fi(e)&&PO(t,e,n.data[i+e.componentOffset]),n.firstCreatePass||Bu(e,t);let o=e.initialInputs;for(let s=i;s<r;s++){let a=n.data[s],l=Ll(t,n,s,e);if(ea(l,t),o!==null&&cR(t,s-i,l,a,e,o),Li(a)){let c=Gn(e.index,t);c[ft]=Ll(t,n,s,e)}}}function sR(n,t,e){let i=e.directiveStart,r=e.directiveEnd,o=e.index,s=XD();try{Zr(o);for(let a=i;a<r;a++){let l=n.data[a],c=t[a];yu(a),(l.hostBindings!==null||l.hostVars!==0||l.hostAttrs!==null)&&aR(l,c)}}finally{Zr(-1),yu(s)}}function aR(n,t){n.hostBindings!==null&&n.hostBindings(1,t)}function YE(n,t){let e=n.directiveRegistry,i=null;if(e)for(let r=0;r<e.length;r++){let o=e[r];NE(t,o.selectors,!1)&&(i??=[],Li(o)?i.unshift(o):i.push(o))}return i}function lR(n,t,e,i,r,o){let s=Wn(n,t);ZE(t[Ge],s,o,n.value,e,i,r)}function ZE(n,t,e,i,r,o,s){if(o==null)n.removeAttribute(t,r,e);else{let a=s==null?au(o):s(o,i||"",r);n.setAttribute(t,r,a,e)}}function cR(n,t,e,i,r,o){let s=o[t];if(s!==null)for(let a=0;a<s.length;a+=2){let l=s[a],c=s[a+1];Wg(i,e,l,c)}}function XE(n,t,e,i,r){let o=Qe+e,s=t[X],a=r(s,t,n,i,e);t[o]=a,Ys(n,!0);let l=n.type===2;return l?(IE(t[Ge],a,n),(zD()===0||Ml(n))&&ea(a,t),WD()):ea(a,t),Du()&&(!l||!Ju(n))&&Ry(s,t,a,n),n}function QE(n){let t=n;return ag()?lg():(t=t.parent,Ys(t,!1)),t}function dR(n,t){let e=n[lr];if(!e)return;let i;try{i=e.get(qn,null)}catch{i=null}i?.(t)}function lf(n,t,e,i,r){let o=n.inputs?.[i],s=n.hostDirectiveInputs?.[i],a=!1;if(s)for(let l=0;l<s.length;l+=2){let c=s[l],d=s[l+1],u=t.data[c];Wg(u,e[c],d,r),a=!0}if(o)for(let l of o){let c=e[l],d=t.data[l];Wg(d,c,i,r),a=!0}return a}function uR(n,t){let e=Gn(t,n),i=e[X];fR(i,e);let r=e[ui];r!==null&&e[Lo]===null&&(e[Lo]=yE(r,e[lr])),Ne(xe.ComponentStart);try{Fy(i,e,e[ft])}finally{Ne(xe.ComponentEnd,e[ft])}}function fR(n,t){for(let e=t.length;e<n.blueprint.length;e++)t.push(n.blueprint[e])}function Fy(n,t,e){_u(t);try{let i=n.viewQuery;i!==null&&Fg(1,i,e);let r=n.template;r!==null&&GE(n,t,r,1,e),n.firstCreatePass&&(n.firstCreatePass=!1),t[Ni]?.finishViewCreation(n),n.staticContentQueries&&vE(n,t),n.staticViewQueries&&Fg(2,n.viewQuery,e);let o=n.components;o!==null&&pR(t,o)}catch(i){throw n.firstCreatePass&&(n.incompleteFirstPass=!0,n.firstCreatePass=!1),i}finally{t[ae]&=-5,bu()}}function pR(n,t){for(let e=0;e<t.length;e++)uR(n,t[e])}function Kl(n,t,e,i){let r=z(null);try{let o=t.tView,a=n[ae]&4096?4096:16,l=Ty(n,o,e,a,null,t,null,null,i?.injector??null,i?.embeddedViewInjector??null,i?.dehydratedView??null),c=n[t.index];l[Gr]=c;let d=n[Ni];return d!==null&&(l[Ni]=d.createEmbeddedView(o)),Fy(o,l,e),l}finally{z(r)}}function ta(n,t){return!t||t.firstChild===null||lE(n)}function Bl(n,t,e,i,r=!1){for(;e!==null;){if(e.type===128){e=r?e.projectionNext:e.next;continue}let o=t[e.index];o!==null&&i.push(zn(o)),pi(o)&&JE(o,i);let s=e.type;if(s&8)Bl(n,t,e.child,i);else if(s&32){let a=Iy(e,t),l;for(;l=a();)i.push(l)}else if(s&16){let a=zE(t,e);if(Array.isArray(a))i.push(...a);else{let l=$r(t[nn]);Bl(l[X],l,a,i,!0)}}e=r?e.projectionNext:e.next}return i}function JE(n,t){for(let e=st;e<n.length;e++){let i=n[e],r=i[X].firstChild;r!==null&&Bl(i[X],i,r,t)}n[Kr]!==n[ui]&&t.push(n[Kr])}function ew(n){if(n[jo]!==null){for(let t of n[jo])t.impl.addSequence(t);n[jo].length=0}}var tw=[];function hR(n){return n[In]??mR(n)}function mR(n){let t=tw.pop()??Object.create(yR);return t.lView=n,t}function gR(n){n.lView[In]!==n&&(n.lView=null,tw.push(n))}var yR=$(b({},Rr),{consumerIsAlwaysLive:!0,kind:"template",consumerMarkedDirty:n=>{$o(n.lView)},consumerOnSignalRead(){this.lView[In]=this}});function vR(n){let t=n[In]??Object.create(_R);return t.lView=n,t}var _R=$(b({},Rr),{consumerIsAlwaysLive:!0,kind:"template",consumerMarkedDirty:n=>{let t=$r(n.lView);for(;t&&!nw(t[X]);)t=$r(t);t&&Xm(t)},consumerOnSignalRead(){this.lView[In]=this}});function nw(n){return n.type!==2}function iw(n){if(n[Hr]===null)return;let t=!0;for(;t;){let e=!1;for(let i of n[Hr])i.dirty&&(e=!0,i.zone===null||Zone.current===i.zone?i.run():i.zone.run(()=>i.run()));t=e&&!!(n[ae]&8192)}}var bR=100;function rw(n,t=0){let i=n[fi].rendererFactory,r=!1;r||i.begin?.();try{CR(n,t)}finally{r||i.end?.()}}function CR(n,t){let e=cg();try{bl(!0),Kg(n,t);let i=0;for(;Il(n);){if(i===bR)throw new x(103,!1);i++,Kg(n,1)}}finally{bl(e)}}function DR(n,t,e,i){if(Ho(t))return;let r=t[ae],o=!1,s=!1;_u(t);let a=!0,l=null,c=null;o||(nw(n)?(c=hR(t),l=Xi(c)):vd()===null?(a=!1,c=vR(t),l=Xi(c)):t[In]&&(Fr(t[In]),t[In]=null));try{Zm(t),KD(n.bindingStartIndex),e!==null&&GE(n,t,e,2,i);let d=(r&3)===3;if(!o)if(d){let g=n.preOrderCheckHooks;g!==null&&ku(t,g,null)}else{let g=n.preOrderHooks;g!==null&&Au(t,g,0,null),Cg(t,0)}if(s||ER(t),iw(t),ow(t,0),n.contentQueries!==null&&vE(n,t),!o)if(d){let g=n.contentCheckHooks;g!==null&&ku(t,g)}else{let g=n.contentHooks;g!==null&&Au(t,g,1),Cg(t,1)}SR(n,t);let u=n.components;u!==null&&aw(t,u,0);let p=n.viewQuery;if(p!==null&&Fg(2,p,i),!o)if(d){let g=n.viewCheckHooks;g!==null&&ku(t,g)}else{let g=n.viewHooks;g!==null&&Au(t,g,2),Cg(t,2)}if(n.firstUpdatePass===!0&&(n.firstUpdatePass=!1),t[fu]){for(let g of t[fu])g();t[fu]=null}o||(ew(t),t[ae]&=-73)}catch(d){throw o||$o(t),d}finally{c!==null&&(Nr(c,l),a&&gR(c)),bu()}}function ow(n,t){for(let e=dE(n);e!==null;e=uE(e))for(let i=st;i<e.length;i++){let r=e[i];sw(r,t)}}function ER(n){for(let t=dE(n);t!==null;t=uE(t)){if(!(t[ae]&2))continue;let e=t[Uo];for(let i=0;i<e.length;i++){let r=e[i];Xm(r)}}}function wR(n,t,e){Ne(xe.ComponentStart);let i=Gn(t,n);try{sw(i,e)}finally{Ne(xe.ComponentEnd,i[ft])}}function sw(n,t){mu(n)&&Kg(n,t)}function Kg(n,t){let i=n[X],r=n[ae],o=n[In],s=!!(t===0&&r&16);if(s||=!!(r&64&&t===0),s||=!!(r&1024),s||=!!(o?.dirty&&As(o)),s||=!1,o&&(o.dirty=!1),n[ae]&=-9217,s)DR(i,n,i.template,n[ft]);else if(r&8192){let a=z(null);try{iw(n),ow(n,1);let l=i.components;l!==null&&aw(n,l,1),ew(n)}finally{z(a)}}}function aw(n,t,e){for(let i=0;i<t.length;i++)wR(n,t[i],e)}function SR(n,t){let e=n.hostBindingOpCodes;if(e!==null)try{for(let i=0;i<e.length;i++){let r=e[i];if(r<0)Zr(~r);else{let o=r,s=e[++i],a=e[++i];ZD(s,o);let l=t[o];Ne(xe.HostBindingsUpdateStart,l);try{a(2,l)}finally{Ne(xe.HostBindingsUpdateEnd,l)}}}}finally{Zr(-1)}}function Ly(n,t){let e=cg()?64:1088;for(n[fi].changeDetectionScheduler?.notify(t);n;){n[ae]|=e;let i=$r(n);if(Ks(n)&&!i)return n;n=i}return null}function lw(n,t,e,i){return[n,!0,0,t,null,i,null,e,null,null]}function cw(n,t){let e=st+t;if(e<n.length)return n[e]}function Yl(n,t,e,i=!0){let r=t[X];if(xR(r,t,n,e),i){let s=qg(e,n),a=t[Ge],l=a.parentNode(n[Kr]);l!==null&&$O(r,n[tn],a,t,l,s)}let o=t[Lo];o!==null&&o.firstChild!==null&&(o.firstChild=null)}function dw(n,t){let e=jl(n,t);return e!==void 0&&of(e[X],e),e}function jl(n,t){if(n.length<=st)return;let e=st+t,i=n[e];if(i){let r=i[Gr];r!==null&&r!==n&&Oy(r,i),t>0&&(n[e-1][$n]=i[$n]);let o=Sl(n,st+t);HO(i[X],i);let s=o[Ni];s!==null&&s.detachView(o[X]),i[St]=null,i[$n]=null,i[ae]&=-129}return i}function xR(n,t,e,i){let r=st+i,o=e.length;i>0&&(e[r-1][$n]=t),i<o-st?(t[$n]=e[r],Lm(e,st+i,t)):(e.push(t),t[$n]=null),t[St]=e;let s=t[Gr];s!==null&&e!==s&&uw(s,t);let a=t[Ni];a!==null&&a.insertView(n),gu(t),t[ae]|=128}function uw(n,t){let e=n[Uo],i=t[St];if(dr(i))n[ae]|=2;else{let r=i[St][nn];t[nn]!==r&&(n[ae]|=2)}e===null?n[Uo]=[t]:e.push(t)}var Qr=class{_lView;_cdRefInjectingView;_appRef=null;_attachedToViewContainer=!1;exhaustive;get rootNodes(){let t=this._lView,e=t[X];return Bl(e,t,e.firstChild,[])}constructor(t,e){this._lView=t,this._cdRefInjectingView=e}get context(){return this._lView[ft]}set context(t){this._lView[ft]=t}get destroyed(){return Ho(this._lView)}destroy(){if(this._appRef)this._appRef.detachView(this);else if(this._attachedToViewContainer){let t=this._lView[St];if(pi(t)){let e=t[Tl],i=e?e.indexOf(this):-1;i>-1&&(jl(t,i),Sl(e,i))}this._attachedToViewContainer=!1}of(this._lView[X],this._lView)}onDestroy(t){Qm(this._lView,t)}markForCheck(){Ly(this._cdRefInjectingView||this._lView,4)}detach(){this._lView[ae]&=-129}reattach(){gu(this._lView),this._lView[ae]|=128}detectChanges(){this._lView[ae]|=1024,rw(this._lView)}checkNoChanges(){}attachToViewContainerRef(){if(this._appRef)throw new x(902,!1);this._attachedToViewContainer=!0}detachFromAppRef(){this._appRef=null;let t=Ks(this._lView),e=this._lView[Gr];e!==null&&!t&&Oy(e,this._lView),UE(this._lView[X],this._lView)}attachToAppRef(t){if(this._attachedToViewContainer)throw new x(902,!1);this._appRef=t;let e=Ks(this._lView),i=this._lView[Gr];i!==null&&!e&&uw(i,this._lView),gu(this._lView)}};var Mt=(()=>{class n{_declarationLView;_declarationTContainer;elementRef;static __NG_ELEMENT_ID__=TR;constructor(e,i,r){this._declarationLView=e,this._declarationTContainer=i,this.elementRef=r}get ssrId(){return this._declarationTContainer.tView?.ssrId||null}createEmbeddedView(e,i){return this.createEmbeddedViewImpl(e,i)}createEmbeddedViewImpl(e,i,r){let o=Kl(this._declarationLView,this._declarationTContainer,e,{embeddedViewInjector:i,dehydratedView:r});return new Qr(o)}}return n})();function TR(){return cf(Nt(),oe())}function cf(n,t){return n.type&4?new Mt(t,n,ra(n,t)):null}function sa(n,t,e,i,r){let o=n.data[t];if(o===null)o=MR(n,t,e,i,r),YD()&&(o.flags|=32);else if(o.type&64){o.type=e,o.value=i,o.attrs=r;let s=GD();o.injectorIndex=s===null?-1:s.injectorIndex}return Ys(o,!0),o}function MR(n,t,e,i,r){let o=sg(),s=ag(),a=s?o:o&&o.parent,l=n.data[t]=kR(n,a,e,t,i,r);return IR(n,l,o,s),l}function IR(n,t,e,i){n.firstChild===null&&(n.firstChild=t),e!==null&&(i?e.child==null&&t.parent!==null&&(e.child=t):e.next===null&&(e.next=t,t.prev=e))}function kR(n,t,e,i,r,o){let s=t?t.injectorIndex:-1,a=0;return ig()&&(a|=128),{type:e,index:i,insertBeforeIndex:null,injectorIndex:s,directiveStart:-1,directiveEnd:-1,directiveStylingLast:-1,componentOffset:-1,controlDirectiveIndex:-1,customControlIndex:-1,propertyBindings:null,flags:a,providerIndexes:0,value:r,namespace:hg(),attrs:o,mergedAttrs:null,localNames:null,initialInputs:null,inputs:null,hostDirectiveInputs:null,outputs:null,hostDirectiveOutputs:null,directiveToIndex:null,tView:null,next:null,prev:null,projectionNext:null,child:null,parent:t,projection:null,styles:null,stylesWithoutHost:null,residualStyles:void 0,classes:null,classesWithoutHost:null,residualClasses:void 0,classBindings:0,styleBindings:0}}function AR(n){let t=n[Wm]??[],i=n[St][Ge],r=[];for(let o of t)o.data[hE]!==void 0?r.push(o):OR(o,i);n[Wm]=r}function OR(n,t){let e=0,i=n.firstChild;if(i){let r=n.data[pE];for(;e<r;){let o=i.nextSibling;ME(t,i,!1),i=o,e++}}}var RR=()=>null,PR=()=>null;function Uu(n,t){return RR(n,t)}function fw(n,t,e){return PR(n,t,e)}var pw=class{},df=class{},Yg=class{resolveComponentFactory(t){throw new x(917,!1)}},Zl=class{static NULL=new Yg},Wt=class{},vt=(()=>{class n{destroyNode=null;static __NG_ELEMENT_ID__=()=>NR()}return n})();function NR(){let n=oe(),t=Nt(),e=Gn(t.index,n);return(dr(e)?e:n)[Ge]}var hw=(()=>{class n{static \u0275prov=D({token:n,providedIn:"root",factory:()=>null})}return n})();var Ru={},Zg=class{injector;parentInjector;constructor(t,e){this.injector=t,this.parentInjector=e}get(t,e,i){let r=this.injector.get(t,Ru,i);return r!==Ru||e===Ru?r:this.parentInjector.get(t,e,i)}};function Hu(n,t,e){let i=e?n.styles:null,r=e?n.classes:null,o=0;if(t!==null)for(let s=0;s<t.length;s++){let a=t[s];if(typeof a=="number")o=a;else if(o==1)r=ru(r,a);else if(o==2){let l=a,c=t[++s];i=ru(i,l+": "+c+";")}}e?n.styles=i:n.stylesWithoutHost=i,e?n.classes=r:n.classesWithoutHost=r}function et(n,t=0){let e=oe();if(e===null)return se(n,t);let i=Nt();return rE(i,e,Pt(n),t)}function uf(){let n="invalid";throw new Error(n)}function mw(n,t,e,i,r){let o=i===null?null:{"":-1},s=r(n,e);if(s!==null){let a=s,l=null,c=null;for(let d of s)if(d.resolveHostDirectives!==null){[a,l,c]=d.resolveHostDirectives(s);break}VR(n,t,e,a,o,l,c)}o!==null&&i!==null&&FR(e,i,o)}function FR(n,t,e){let i=n.localNames=[];for(let r=0;r<t.length;r+=2){let o=e[t[r+1]];if(o==null)throw new x(-301,!1);i.push(t[r],o)}}function LR(n,t,e){t.componentOffset=e,(n.components??=[]).push(t.index)}function VR(n,t,e,i,r,o,s){let a=i.length,l=null;for(let p=0;p<a;p++){let g=i[p];l===null&&Li(g)&&(l=g,LR(n,e,p)),Rg(Bu(e,t),n,g.type)}zR(e,n.data.length,a),l?.viewProvidersResolver&&l.viewProvidersResolver(l);for(let p=0;p<a;p++){let g=i[p];g.providersResolver&&g.providersResolver(g)}let c=!1,d=!1,u=LE(n,t,a,null);a>0&&(e.directiveToIndex=new Map);for(let p=0;p<a;p++){let g=i[p];if(e.mergedAttrs=Js(e.mergedAttrs,g.hostAttrs),jR(n,e,t,u,g),$R(u,g,r),s!==null&&s.has(g)){let[S,O]=s.get(g);e.directiveToIndex.set(g.type,[u,S+e.directiveStart,O+e.directiveStart])}else(o===null||!o.has(g))&&e.directiveToIndex.set(g.type,u);g.contentQueries!==null&&(e.flags|=4),(g.hostBindings!==null||g.hostAttrs!==null||g.hostVars!==0)&&(e.flags|=64);let _=g.type.prototype;!c&&(_.ngOnChanges||_.ngOnInit||_.ngDoCheck)&&((n.preOrderHooks??=[]).push(e.index),c=!0),!d&&(_.ngOnChanges||_.ngDoCheck)&&((n.preOrderCheckHooks??=[]).push(e.index),d=!0),u++}BR(n,e,o)}function BR(n,t,e){for(let i=t.directiveStart;i<t.directiveEnd;i++){let r=n.data[i];if(e===null||!e.has(r))I0(0,t,r,i),I0(1,t,r,i),A0(t,i,!1);else{let o=e.get(r);k0(0,t,o,i),k0(1,t,o,i),A0(t,i,!0)}}}function I0(n,t,e,i){let r=n===0?e.inputs:e.outputs;for(let o in r)if(r.hasOwnProperty(o)){let s;n===0?s=t.inputs??={}:s=t.outputs??={},s[o]??=[],s[o].push(i),gw(t,o)}}function k0(n,t,e,i){let r=n===0?e.inputs:e.outputs;for(let o in r)if(r.hasOwnProperty(o)){let s=r[o],a;n===0?a=t.hostDirectiveInputs??={}:a=t.hostDirectiveOutputs??={},a[s]??=[],a[s].push(i,o),gw(t,s)}}function gw(n,t){t==="class"?n.flags|=8:t==="style"&&(n.flags|=16)}function A0(n,t,e){let{attrs:i,inputs:r,hostDirectiveInputs:o}=n;if(i===null||!e&&r===null||e&&o===null||Sy(n)){n.initialInputs??=[],n.initialInputs.push(null);return}let s=null,a=0;for(;a<i.length;){let l=i[a];if(l===0){a+=4;continue}else if(l===5){a+=2;continue}else if(typeof l=="number")break;if(!e&&r.hasOwnProperty(l)){let c=r[l];for(let d of c)if(d===t){s??=[],s.push(l,i[a+1]);break}}else if(e&&o.hasOwnProperty(l)){let c=o[l];for(let d=0;d<c.length;d+=2)if(c[d]===t){s??=[],s.push(c[d+1],i[a+1]);break}}a+=2}n.initialInputs??=[],n.initialInputs.push(s)}function jR(n,t,e,i,r){n.data[i]=r;let o=r.factory||(r.factory=Ur(r.type,!0)),s=new Wo(o,Li(r),et,null);n.blueprint[i]=s,e[i]=s,UR(n,t,i,LE(n,e,r.hostVars,Yn),r)}function UR(n,t,e,i,r){let o=r.hostBindings;if(o){let s=n.hostBindingOpCodes;s===null&&(s=n.hostBindingOpCodes=[]);let a=~t.index;HR(s)!=a&&s.push(a),s.push(e,i,o)}}function HR(n){let t=n.length;for(;t>0;){let e=n[--t];if(typeof e=="number"&&e<0)return e}return 0}function $R(n,t,e){if(e){if(t.exportAs)for(let i=0;i<t.exportAs.length;i++)e[t.exportAs[i]]=n;Li(t)&&(e[""]=n)}}function zR(n,t,e){n.flags|=1,n.directiveStart=t,n.directiveEnd=t+e,n.providerIndexes=t}function yw(n,t,e,i,r,o,s,a){let l=t[X],c=l.consts,d=kn(c,s),u=sa(l,n,e,i,d);return o&&mw(l,t,u,kn(c,a),r),u.mergedAttrs=Js(u.mergedAttrs,u.attrs),u.attrs!==null&&Hu(u,u.attrs,!1),u.mergedAttrs!==null&&Hu(u,u.mergedAttrs,!0),l.queries!==null&&l.queries.elementStart(l,u),u}function vw(n,t){Y0(n,t),Gm(t)&&n.queries.elementEnd(t)}function WR(n,t,e,i,r,o){let s=t.consts,a=kn(s,r),l=sa(t,n,e,i,a);if(l.mergedAttrs=Js(l.mergedAttrs,l.attrs),o!=null){let c=kn(s,o);l.localNames=[];for(let d=0;d<c.length;d+=2)l.localNames.push(c[d],-1)}return l.attrs!==null&&Hu(l,l.attrs,!1),l.mergedAttrs!==null&&Hu(l,l.mergedAttrs,!0),t.queries!==null&&t.queries.elementStart(t,l),l}function Vy(n){return bw(n)?Array.isArray(n)||!(n instanceof Map)&&Symbol.iterator in n:!1}function _w(n,t){if(Array.isArray(n))for(let e=0;e<n.length;e++)t(n[e]);else{let e=n[Symbol.iterator](),i;for(;!(i=e.next()).done;)t(i.value)}}function bw(n){return n!==null&&(typeof n=="function"||typeof n=="object")}function Cw(n,t,e){return n[t]=e}function Kn(n,t,e){if(e===Yn)return!1;let i=n[t];return Object.is(i,e)?!1:(n[t]=e,!0)}function GR(n,t,e,i){let r=Kn(n,t,e);return Kn(n,t+1,i)||r}function Pu(n,t,e){return function i(r){let o=i.__ngNativeEl__;o!==void 0&&GA(r,o);let s=Fi(n)?Gn(n.index,t):t;Ly(s,5);let a=t[ft],l=O0(t,a,e,r),c=i.__ngNextListenerFn__;for(;c;)l=O0(t,a,c,r)&&l,c=c.__ngNextListenerFn__;return l}}function O0(n,t,e,i){let r=z(null);try{return Ne(xe.OutputStart,t,e),e(i)!==!1}catch(o){return dR(n,o),!1}finally{Ne(xe.OutputEnd,t,e),z(r)}}function Dw(n,t,e,i,r,o,s,a){let l=Ml(n),c=!1,d=null;if(!i&&l&&(d=KR(t,e,o,n.index)),d!==null){let u=d.__ngLastListenerFn__||d;u.__ngNextListenerFn__=s,d.__ngLastListenerFn__=s,c=!0}else{let u=Wn(n,e),p=i?i(u):u;KA(e,p,o,a),i||(a.__ngNativeEl__=u);let g=r.listen(p,o,a);if(!qR(o)){let _=i?S=>i(zn(S[n.index])):n.index;Ew(_,t,e,o,a,g,!1)}}return c}function qR(n){return n.startsWith("animation")||n.startsWith("transition")}function KR(n,t,e,i){let r=n.cleanup;if(r!=null)for(let o=0;o<r.length-1;o+=2){let s=r[o];if(s===e&&r[o+1]===i){let a=t[Gs],l=r[o+2];return a&&a.length>l?a[l]:null}typeof s=="string"&&(o+=2)}return null}function Ew(n,t,e,i,r,o,s){let a=t.firstCreatePass?eg(t):null,l=Jm(e),c=l.length;l.push(r,o),a&&a.push(i,n,c,(c+1)*(s?-1:1))}function R0(n,t,e,i,r,o){let s=t[e],a=t[X],c=a.data[e].outputs[i],u=s[c].subscribe(o);Ew(n.index,a,t,r,o,u,!0)}var Xg=Symbol("BINDING");function ww(n){return n.debugInfo?.className||n.type.name||null}var $u=class extends Zl{ngModule;constructor(t){super(),this.ngModule=t}resolveComponentFactory(t){let e=sr(t);return new qo(e,this.ngModule)}};function YR(n){return Object.keys(n).map(t=>{let[e,i,r]=n[t],o={propName:e,templateName:t,isSignal:(i&tf.SignalBased)!==0};return r&&(o.transform=r),o})}function ZR(n){return Object.keys(n).map(t=>({propName:n[t],templateName:t}))}function XR(n,t,e){let i=t instanceof We?t:t?.injector;return i&&n.getStandaloneInjector!==null&&(i=n.getStandaloneInjector(i)||i),i?new Zg(e,i):e}function QR(n){let t=n.get(Wt,null);if(t===null)throw new x(407,!1);let e=n.get(hw,null),i=n.get(ir,null),r=n.get(gr,null,{optional:!0});return{rendererFactory:t,sanitizer:e,changeDetectionScheduler:i,ngReflect:!1,tracingService:r}}function JR(n,t){let e=Sw(n);return xE(t,e,e==="svg"?qm:e==="math"?VD:null)}function Sw(n){return(n.selectors[0][0]||"div").toLowerCase()}var qo=class extends df{componentDef;ngModule;selector;componentType;ngContentSelectors;isBoundToModule;cachedInputs=null;cachedOutputs=null;get inputs(){return this.cachedInputs??=YR(this.componentDef.inputs),this.cachedInputs}get outputs(){return this.cachedOutputs??=ZR(this.componentDef.outputs),this.cachedOutputs}constructor(t,e){super(),this.componentDef=t,this.ngModule=e,this.componentType=t.type,this.selector=kO(t.selectors),this.ngContentSelectors=t.ngContentSelectors??[],this.isBoundToModule=!!e}create(t,e,i,r,o,s){Ne(xe.DynamicComponentStart);let a=z(null);try{let l=this.componentDef,c=XR(l,r||this.ngModule,t),d=QR(c),u=d.tracingService;return u&&u.componentCreate?u.componentCreate(ww(l),()=>this.createComponentRef(d,c,e,i,o,s)):this.createComponentRef(d,c,e,i,o,s)}finally{z(a)}}createComponentRef(t,e,i,r,o,s){let a=this.componentDef,l=eP(r,a,s,o),c=t.rendererFactory.createRenderer(null,a),d=r?eR(c,r,a.encapsulation,e):JR(a,c),u=s?.some(P0)||o?.some(_=>typeof _!="function"&&_.bindings.some(P0)),p=Ty(null,l,null,512|FE(a),null,null,t,c,e,null,yE(d,e,!0));p[Qe]=d,_u(p);let g=null;try{let _=yw(Qe,p,2,"#host",()=>l.directiveRegistry,!0,0);IE(c,d,_),ea(d,p),Ny(l,p,_),_E(l,_,p),vw(l,_),i!==void 0&&nP(_,this.ngContentSelectors,i),g=Gn(_.index,p),p[ft]=g[ft],Fy(l,p,null)}catch(_){throw g!==null&&Ng(g),Ng(p),_}finally{Ne(xe.DynamicComponentEnd),bu()}return new zu(this.componentType,p,!!u)}};function eP(n,t,e,i){let r=n?["ng-version","21.2.15"]:AO(t.selectors[0]),o=null,s=null,a=0;if(e)for(let d of e)a+=d[Xg].requiredVars,d.create&&(d.targetIdx=0,(o??=[]).push(d)),d.update&&(d.targetIdx=0,(s??=[]).push(d));if(i)for(let d=0;d<i.length;d++){let u=i[d];if(typeof u!="function")for(let p of u.bindings){a+=p[Xg].requiredVars;let g=d+1;p.create&&(p.targetIdx=g,(o??=[]).push(p)),p.update&&(p.targetIdx=g,(s??=[]).push(p))}}let l=[t];if(i)for(let d of i){let u=typeof d=="function"?d:d.type,p=Pm(u);l.push(p)}return xy(0,null,tP(o,s),1,a,l,null,null,null,[r],null)}function tP(n,t){return!n&&!t?null:e=>{if(e&1&&n)for(let i of n)i.create();if(e&2&&t)for(let i of t)i.update()}}function P0(n){let t=n[Xg].kind;return t==="input"||t==="twoWay"}var zu=class extends pw{_rootLView;_hasInputBindings;instance;hostView;changeDetectorRef;componentType;location;previousInputValues=null;_tNode;constructor(t,e,i){super(),this._rootLView=e,this._hasInputBindings=i,this._tNode=pu(e[X],Qe),this.location=ra(this._tNode,e),this.instance=Gn(this._tNode.index,e)[ft],this.hostView=this.changeDetectorRef=new Qr(e,void 0),this.componentType=t}setInput(t,e){this._hasInputBindings;let i=this._tNode;if(this.previousInputValues??=new Map,this.previousInputValues.has(t)&&Object.is(this.previousInputValues.get(t),e))return;let r=this._rootLView,o=lf(i,r[X],r,t,e);this.previousInputValues.set(t,e);let s=Gn(i.index,r);Ly(s,1)}get injector(){return new zo(this._tNode,this._rootLView)}destroy(){this.hostView.destroy()}onDestroy(t){this.hostView.onDestroy(t)}};function nP(n,t,e){let i=n.projection=[];for(let r=0;r<t.length;r++){let o=e[r];i.push(o!=null&&o.length?Array.from(o):null)}}var pt=(()=>{class n{static __NG_ELEMENT_ID__=iP}return n})();function iP(){let n=Nt();return xw(n,oe())}var Qg=class n extends pt{_lContainer;_hostTNode;_hostLView;constructor(t,e,i){super(),this._lContainer=t,this._hostTNode=e,this._hostLView=i}get element(){return ra(this._hostTNode,this._hostLView)}get injector(){return new zo(this._hostTNode,this._hostLView)}get parentInjector(){let t=my(this._hostTNode,this._hostLView);if(Q0(t)){let e=Lu(t,this._hostLView),i=Fu(t),r=e[X].data[i+8];return new zo(r,e)}else return new zo(null,this._hostLView)}clear(){for(;this.length>0;)this.remove(this.length-1)}get(t){let e=N0(this._lContainer);return e!==null&&e[t]||null}get length(){return this._lContainer.length-st}createEmbeddedView(t,e,i){let r,o;typeof i=="number"?r=i:i!=null&&(r=i.index,o=i.injector);let s=Uu(this._lContainer,t.ssrId),a=t.createEmbeddedViewImpl(e||{},o,s);return this.insertImpl(a,r,ta(this._hostTNode,s)),a}createComponent(t,e,i,r,o,s,a){let l=t&&!bA(t),c;if(l)c=e;else{let O=e||{};c=O.index,i=O.injector,r=O.projectableNodes,o=O.environmentInjector||O.ngModuleRef,s=O.directives,a=O.bindings}let d=l?t:new qo(sr(t)),u=i||this.parentInjector;if(!o&&d.ngModule==null){let V=(l?u:this.parentInjector).get(We,null);V&&(o=V)}let p=sr(d.componentType??{}),g=Uu(this._lContainer,p?.id??null),_=g?.firstChild??null,S=d.create(u,r,_,o,s,a);return this.insertImpl(S.hostView,c,ta(this._hostTNode,g)),S}insert(t,e){return this.insertImpl(t,e,!0)}insertImpl(t,e,i){let r=t._lView;if(jD(r)){let a=this.indexOf(t);if(a!==-1)this.detach(a);else{let l=r[St],c=new n(l,l[tn],l[St]);c.detach(c.indexOf(t))}}let o=this._adjustIndex(e),s=this._lContainer;return Yl(s,r,o,i),t.attachToViewContainerRef(),Lm(wg(s),o,t),t}move(t,e){return this.insert(t,e)}indexOf(t){let e=N0(this._lContainer);return e!==null?e.indexOf(t):-1}remove(t){let e=this._adjustIndex(t,-1),i=jl(this._lContainer,e);i&&(Sl(wg(this._lContainer),e),of(i[X],i))}detach(t){let e=this._adjustIndex(t,-1),i=jl(this._lContainer,e);return i&&Sl(wg(this._lContainer),e)!=null?new Qr(i):null}_adjustIndex(t,e=0){return t??this.length+e}};function N0(n){return n[Tl]}function wg(n){return n[Tl]||(n[Tl]=[])}function xw(n,t){let e,i=t[n.index];return pi(i)?e=i:(e=lw(i,t,null,n),t[n.index]=e,My(t,e)),oP(e,t,n,i),new Qg(e,n,t)}function rP(n,t){let e=n[Ge],i=e.createComment(""),r=Wn(t,n),o=e.parentNode(r);return ju(e,o,i,e.nextSibling(r),!1),i}var oP=lP,sP=()=>!1;function aP(n,t,e){return sP(n,t,e)}function lP(n,t,e,i){if(n[Kr])return;let r;e.type&8?r=zn(i):r=rP(t,e),n[Kr]=r}var Jg=class n{queryList;matches=null;constructor(t){this.queryList=t}clone(){return new n(this.queryList)}setDirty(){this.queryList.setDirty()}},ey=class n{queries;constructor(t=[]){this.queries=t}createEmbeddedView(t){let e=t.queries;if(e!==null){let i=t.contentQueries!==null?t.contentQueries[0]:e.length,r=[];for(let o=0;o<i;o++){let s=e.getByIndex(o),a=this.queries[s.indexInDeclarationView];r.push(a.clone())}return new n(r)}return null}insertView(t){this.dirtyQueriesWithMatches(t)}detachView(t){this.dirtyQueriesWithMatches(t)}finishViewCreation(t){this.dirtyQueriesWithMatches(t)}dirtyQueriesWithMatches(t){for(let e=0;e<this.queries.length;e++)jy(t,e).matches!==null&&this.queries[e].setDirty()}},Wu=class{flags;read;predicate;constructor(t,e,i=null){this.flags=e,this.read=i,typeof t=="string"?this.predicate=pP(t):this.predicate=t}},ty=class n{queries;constructor(t=[]){this.queries=t}elementStart(t,e){for(let i=0;i<this.queries.length;i++)this.queries[i].elementStart(t,e)}elementEnd(t){for(let e=0;e<this.queries.length;e++)this.queries[e].elementEnd(t)}embeddedTView(t){let e=null;for(let i=0;i<this.length;i++){let r=e!==null?e.length:0,o=this.getByIndex(i).embeddedTView(t,r);o&&(o.indexInDeclarationView=i,e!==null?e.push(o):e=[o])}return e!==null?new n(e):null}template(t,e){for(let i=0;i<this.queries.length;i++)this.queries[i].template(t,e)}getByIndex(t){return this.queries[t]}get length(){return this.queries.length}track(t){this.queries.push(t)}},ny=class n{metadata;matches=null;indexInDeclarationView=-1;crossesNgTemplate=!1;_declarationNodeIndex;_appliesToNextNode=!0;constructor(t,e=-1){this.metadata=t,this._declarationNodeIndex=e}elementStart(t,e){this.isApplyingToNode(e)&&this.matchTNode(t,e)}elementEnd(t){this._declarationNodeIndex===t.index&&(this._appliesToNextNode=!1)}template(t,e){this.elementStart(t,e)}embeddedTView(t,e){return this.isApplyingToNode(t)?(this.crossesNgTemplate=!0,this.addMatch(-t.index,e),new n(this.metadata)):null}isApplyingToNode(t){if(this._appliesToNextNode&&(this.metadata.flags&1)!==1){let e=this._declarationNodeIndex,i=t.parent;for(;i!==null&&i.type&8&&i.index!==e;)i=i.parent;return e===(i!==null?i.index:-1)}return this._appliesToNextNode}matchTNode(t,e){let i=this.metadata.predicate;if(Array.isArray(i))for(let r=0;r<i.length;r++){let o=i[r];this.matchTNodeWithReadOption(t,e,cP(e,o)),this.matchTNodeWithReadOption(t,e,Ou(e,t,o,!1,!1))}else i===Mt?e.type&4&&this.matchTNodeWithReadOption(t,e,-1):this.matchTNodeWithReadOption(t,e,Ou(e,t,i,!1,!1))}matchTNodeWithReadOption(t,e,i){if(i!==null){let r=this.metadata.read;if(r!==null)if(r===Q||r===pt||r===Mt&&e.type&4)this.addMatch(e.index,-2);else{let o=Ou(e,t,r,!1,!1);o!==null&&this.addMatch(e.index,o)}else this.addMatch(e.index,i)}}addMatch(t,e){this.matches===null?this.matches=[t,e]:this.matches.push(t,e)}};function cP(n,t){let e=n.localNames;if(e!==null){for(let i=0;i<e.length;i+=2)if(e[i]===t)return e[i+1]}return null}function dP(n,t){return n.type&11?ra(n,t):n.type&4?cf(n,t):null}function uP(n,t,e,i){return e===-1?dP(t,n):e===-2?fP(n,t,i):Ll(n,n[X],e,t)}function fP(n,t,e){if(e===Q)return ra(t,n);if(e===Mt)return cf(t,n);if(e===pt)return xw(t,n)}function Tw(n,t,e,i){let r=t[Ni].queries[i];if(r.matches===null){let o=n.data,s=e.matches,a=[];for(let l=0;s!==null&&l<s.length;l+=2){let c=s[l];if(c<0)a.push(null);else{let d=o[c];a.push(uP(t,d,s[l+1],e.metadata.read))}}r.matches=a}return r.matches}function iy(n,t,e,i){let r=n.queries.getByIndex(e),o=r.matches;if(o!==null){let s=Tw(n,t,r,e);for(let a=0;a<o.length;a+=2){let l=o[a];if(l>0)i.push(s[a/2]);else{let c=o[a+1],d=t[-l];for(let u=st;u<d.length;u++){let p=d[u];p[Gr]===p[St]&&iy(p[X],p,c,i)}if(d[Uo]!==null){let u=d[Uo];for(let p=0;p<u.length;p++){let g=u[p];iy(g[X],g,c,i)}}}}}return i}function By(n,t){return n[Ni].queries[t].queryList}function Mw(n,t,e){let i=new yi((e&4)===4);return $D(n,t,i,i.destroy),(t[Ni]??=new ey).queries.push(new Jg(i))-1}function Iw(n,t,e){let i=Je();return i.firstCreatePass&&(Aw(i,new Wu(n,t,e),-1),(t&2)===2&&(i.staticViewQueries=!0)),Mw(i,oe(),t)}function kw(n,t,e,i){let r=Je();if(r.firstCreatePass){let o=Nt();Aw(r,new Wu(t,e,i),o.index),hP(r,n),(e&2)===2&&(r.staticContentQueries=!0)}return Mw(r,oe(),e)}function pP(n){return n.split(",").map(t=>t.trim())}function Aw(n,t,e){n.queries===null&&(n.queries=new ty),n.queries.track(new ny(t,e))}function hP(n,t){let e=n.contentQueries||(n.contentQueries=[]),i=e.length?e[e.length-1]:-1;t!==i&&e.push(n.queries.length-1,t)}function jy(n,t){return n.queries.getByIndex(t)}function Ow(n,t){let e=n[X],i=jy(e,t);return i.crossesNgTemplate?iy(e,n,t,[]):Tw(e,n,i,t)}function Rw(n,t,e){let i,r=il(()=>{i._dirtyCounter();let o=mP(i,n);if(t&&o===void 0)throw new x(-951,!1);return o});return i=r[ct],i._dirtyCounter=P(0),i._flatValue=void 0,r}function Uy(n){return Rw(!0,!1,n)}function Hy(n){return Rw(!0,!0,n)}function Pw(n,t){let e=n[ct];e._lView=oe(),e._queryIndex=t,e._queryList=By(e._lView,t),e._queryList.onDirty(()=>e._dirtyCounter.update(i=>i+1))}function mP(n,t){let e=n._lView,i=n._queryIndex;if(e===void 0||i===void 0||e[ae]&4)return t?void 0:$t;let r=By(e,i),o=Ow(e,i);return r.reset(o,aE),t?r.first:r._changesDetected||n._flatValue===void 0?n._flatValue=r.toArray():n._flatValue}var ji=class{},ff=class{};var Gu=class extends ji{ngModuleType;_parent;_bootstrapComponents=[];_r3Injector;instance;destroyCbs=[];componentFactoryResolver=new $u(this);constructor(t,e,i,r=!0){super(),this.ngModuleType=t,this._parent=e;let o=Rm(t);this._bootstrapComponents=RE(o.bootstrap),this._r3Injector=mg(t,e,[{provide:ji,useValue:this},{provide:Zl,useValue:this.componentFactoryResolver},...i],El(t),new Set(["environment"])),r&&this.resolveInjectorInitializers()}resolveInjectorInitializers(){this._r3Injector.resolveInjectorInitializers(),this.instance=this._r3Injector.get(this.ngModuleType)}get injector(){return this._r3Injector}destroy(){let t=this._r3Injector;!t.destroyed&&t.destroy(),this.destroyCbs.forEach(e=>e()),this.destroyCbs=null}onDestroy(t){this.destroyCbs.push(t)}},qu=class extends ff{moduleType;constructor(t){super(),this.moduleType=t}create(t){return new Gu(this.moduleType,t,[])}};var Ul=class extends ji{injector;componentFactoryResolver=new $u(this);instance=null;constructor(t){super();let e=new No([...t.providers,{provide:ji,useValue:this},{provide:Zl,useValue:this.componentFactoryResolver}],t.parent||Ws(),t.debugName,new Set(["environment"]));this.injector=e,t.runEnvironmentInitializers&&e.resolveInjectorInitializers()}destroy(){this.injector.destroy()}onDestroy(t){this.injector.onDestroy(t)}};function Xl(n,t,e=null){return new Ul({providers:n,parent:t,debugName:e,runEnvironmentInitializers:!0}).injector}var gP=(()=>{class n{_injector;cachedInjectors=new Map;constructor(e){this._injector=e}getOrCreateStandaloneInjector(e){if(!e.standalone)return null;if(!this.cachedInjectors.has(e)){let i=jm(!1,e.type),r=i.length>0?Xl([i],this._injector,""):null;this.cachedInjectors.set(e,r)}return this.cachedInjectors.get(e)}ngOnDestroy(){try{for(let e of this.cachedInjectors.values())e!==null&&e.destroy()}finally{this.cachedInjectors.clear()}}static \u0275prov=D({token:n,providedIn:"environment",factory:()=>new n(se(We))})}return n})();function G(n){return $l(()=>{let t=Nw(n),e=$(b({},t),{decls:n.decls,vars:n.vars,template:n.template,consts:n.consts||null,ngContentSelectors:n.ngContentSelectors,onPush:n.changeDetection===gy.OnPush,directiveDefs:null,pipeDefs:null,dependencies:t.standalone&&n.dependencies||null,getStandaloneInjector:t.standalone?r=>r.get(gP).getOrCreateStandaloneInjector(e):null,getExternalStyles:null,signals:n.signals??!1,data:n.data||{},encapsulation:n.encapsulation||vi.Emulated,styles:n.styles||$t,_:null,schemas:n.schemas||null,tView:null,id:""});t.standalone&&yr("NgStandalone"),Fw(e);let i=n.dependencies;return e.directiveDefs=F0(i,yP),e.pipeDefs=F0(i,ED),e.id=bP(e),e})}function yP(n){return sr(n)||Pm(n)}function De(n){return $l(()=>({type:n.type,bootstrap:n.bootstrap||$t,declarations:n.declarations||$t,imports:n.imports||$t,exports:n.exports||$t,transitiveCompileScopes:null,schemas:n.schemas||null,id:n.id||null}))}function vP(n,t){if(n==null)return zr;let e={};for(let i in n)if(n.hasOwnProperty(i)){let r=n[i],o,s,a,l;Array.isArray(r)?(a=r[0],o=r[1],s=r[2]??o,l=r[3]||null):(o=r,s=r,a=tf.None,l=null),e[o]=[i,a,l],t[o]=s}return e}function _P(n){if(n==null)return zr;let t={};for(let e in n)n.hasOwnProperty(e)&&(t[n[e]]=e);return t}function ie(n){return $l(()=>{let t=Nw(n);return Fw(t),t})}function aa(n){return{type:n.type,name:n.name,factory:null,pure:n.pure!==!1,standalone:n.standalone??!0,onDestroy:n.type.prototype.ngOnDestroy||null}}function Nw(n){let t={};return{type:n.type,providersResolver:null,viewProvidersResolver:null,factory:null,hostBindings:n.hostBindings||null,hostVars:n.hostVars||0,hostAttrs:n.hostAttrs||null,contentQueries:n.contentQueries||null,declaredInputs:t,inputConfig:n.inputs||zr,exportAs:n.exportAs||null,standalone:n.standalone??!0,signals:n.signals===!0,selectors:n.selectors||$t,viewQuery:n.viewQuery||null,features:n.features||null,setInput:null,resolveHostDirectives:null,hostDirectives:null,controlDef:null,inputs:vP(n.inputs,t),outputs:_P(n.outputs),debugInfo:null}}function Fw(n){n.features?.forEach(t=>t(n))}function F0(n,t){return n?()=>{let e=typeof n=="function"?n():n,i=[];for(let r of e){let o=t(r);o!==null&&i.push(o)}return i}:null}function bP(n){let t=0,e=typeof n.consts=="function"?"":n.consts,i=[n.selectors,n.ngContentSelectors,n.hostVars,n.hostAttrs,e,n.vars,n.decls,n.encapsulation,n.standalone,n.signals,n.exportAs,JSON.stringify(n.inputs),JSON.stringify(n.outputs),Object.getOwnPropertyNames(n.type.prototype),!!n.contentQueries,!!n.viewQuery];for(let o of i.join("|"))t=Math.imul(31,t)+o.charCodeAt(0)<<0;return t+=2147483648,"c"+t}function CP(n){return Object.getPrototypeOf(n.prototype).constructor}function Tt(n){let t=CP(n.type),e=!0,i=[n];for(;t;){let r;if(Li(n))r=t.\u0275cmp||t.\u0275dir;else{if(t.\u0275cmp)throw new x(903,!1);r=t.\u0275dir}if(r){if(e){i.push(r);let s=n;s.inputs=Sg(n.inputs),s.declaredInputs=Sg(n.declaredInputs),s.outputs=Sg(n.outputs);let a=r.hostBindings;a&&xP(n,a);let l=r.viewQuery,c=r.contentQueries;if(l&&wP(n,l),c&&SP(n,c),DP(n,r),DD(n.outputs,r.outputs),Li(r)&&r.data.animation){let d=n.data;d.animation=(d.animation||[]).concat(r.data.animation)}}let o=r.features;if(o)for(let s=0;s<o.length;s++){let a=o[s];a&&a.ngInherit&&a(n),a===Tt&&(e=!1)}}t=Object.getPrototypeOf(t)}EP(i)}function DP(n,t){for(let e in t.inputs){if(!t.inputs.hasOwnProperty(e)||n.inputs.hasOwnProperty(e))continue;let i=t.inputs[e];i!==void 0&&(n.inputs[e]=i,n.declaredInputs[e]=t.declaredInputs[e])}}function EP(n){let t=0,e=null;for(let i=n.length-1;i>=0;i--){let r=n[i];r.hostVars=t+=r.hostVars,r.hostAttrs=Js(r.hostAttrs,e=Js(e,r.hostAttrs))}}function Sg(n){return n===zr?{}:n===$t?[]:n}function wP(n,t){let e=n.viewQuery;e?n.viewQuery=(i,r)=>{t(i,r),e(i,r)}:n.viewQuery=t}function SP(n,t){let e=n.contentQueries;e?n.contentQueries=(i,r,o)=>{t(i,r,o),e(i,r,o)}:n.contentQueries=t}function xP(n,t){let e=n.hostBindings;e?n.hostBindings=(i,r)=>{t(i,r),e(i,r)}:n.hostBindings=t}function Lw(n,t,e,i,r,o,s,a){if(e.firstCreatePass){n.mergedAttrs=Js(n.mergedAttrs,n.attrs);let d=n.tView=xy(2,n,r,o,s,e.directiveRegistry,e.pipeRegistry,null,e.schemas,e.consts,null);e.queries!==null&&(e.queries.template(e,n),d.queries=e.queries.embeddedTView(n))}a&&(n.flags|=a),Ys(n,!1);let l=MP(e,t,n,i);Du()&&Ry(e,t,l,n),ea(l,t);let c=lw(l,t,l,n);t[i+Qe]=c,My(t,c),aP(c,n,t)}function TP(n,t,e,i,r,o,s,a,l,c,d){let u=e+Qe,p;return t.firstCreatePass?(p=sa(t,u,4,s||null,a||null),ng()&&mw(t,n,p,kn(t.consts,c),YE),Y0(t,p)):p=t.data[u],Lw(p,n,t,e,i,r,o,l),Ml(p)&&Ny(t,n,p),c!=null&&af(n,p,d),p}function na(n,t,e,i,r,o,s,a,l,c,d){let u=e+Qe,p;if(t.firstCreatePass){if(p=sa(t,u,4,s||null,a||null),c!=null){let g=kn(t.consts,c);p.localNames=[];for(let _=0;_<g.length;_+=2)p.localNames.push(g[_],-1)}}else p=t.data[u];return Lw(p,n,t,e,i,r,o,l),c!=null&&af(n,p,d),p}function Gt(n,t,e,i,r,o,s,a){let l=oe(),c=Je(),d=kn(c.consts,o);return TP(l,c,n,t,e,i,r,d,void 0,s,a),Gt}function la(n,t,e,i,r,o,s,a){let l=oe(),c=Je(),d=kn(c.consts,o);return na(l,c,n,t,e,i,r,d,void 0,s,a),la}var MP=IP;function IP(n,t,e,i){return Eu(!0),t[Ge].createComment("")}var pf=(()=>{class n{log(e){console.log(e)}warn(e){console.warn(e)}static \u0275fac=function(i){return new(i||n)};static \u0275prov=D({token:n,factory:n.\u0275fac,providedIn:"platform"})}return n})();function Zo(n){return typeof n=="function"&&n[ct]!==void 0}var $y=new C("");function eo(n){return!!n&&typeof n.then=="function"}function zy(n){return!!n&&typeof n.subscribe=="function"}var Wy=new C("");function hf(n){return ar([{provide:Wy,multi:!0,useValue:n}])}var Gy=(()=>{class n{resolve;reject;initialized=!1;done=!1;donePromise=new Promise((e,i)=>{this.resolve=e,this.reject=i});appInits=f(Wy,{optional:!0})??[];injector=f(le);constructor(){}runInitializers(){if(this.initialized)return;let e=[];for(let r of this.appInits){let o=zt(this.injector,r);if(eo(o))e.push(o);else if(zy(o)){let s=new Promise((a,l)=>{o.subscribe({complete:a,error:l})});e.push(s)}}let i=()=>{this.done=!0,this.resolve()};Promise.all(e).then(()=>{i()}).catch(r=>{this.reject(r)}),e.length===0&&i(),this.initialized=!0}static \u0275fac=function(i){return new(i||n)};static \u0275prov=D({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})(),mf=new C("");function Vw(){zh(()=>{let n="";throw new x(600,n)})}function Bw(n){return n.isBoundToModule}var kP=10;var rn=(()=>{class n{_runningTick=!1;_destroyed=!1;_destroyListeners=[];_views=[];internalErrorHandler=f(qn);afterRenderManager=f(rf);zonelessEnabled=f(Ol);rootEffectScheduler=f(Su);dirtyFlags=0;tracingSnapshot=null;allTestViews=new Set;autoDetectTestViews=new Set;includeAllTestViews=!1;afterTick=new E;get allViews(){return[...(this.includeAllTestViews?this.allTestViews:this.autoDetectTestViews).keys(),...this._views]}get destroyed(){return this._destroyed}componentTypes=[];components=[];internalPendingTask=f(Xr);get isStable(){return this.internalPendingTask.hasPendingTasksObservable.pipe(ye(e=>!e))}constructor(){f(gr,{optional:!0})}whenStable(){let e;return new Promise(i=>{e=this.isStable.subscribe({next:r=>{r&&i()}})}).finally(()=>{e.unsubscribe()})}_injector=f(We);_rendererFactory=null;get injector(){return this._injector}bootstrap(e,i){return this.bootstrapImpl(e,i)}bootstrapImpl(e,i,r=le.NULL){return this._injector.get(U).run(()=>{Ne(xe.BootstrapComponentStart);let s=e instanceof df;if(!this._injector.get(Gy).done){let _="";throw new x(405,_)}let l;s?l=e:l=this._injector.get(Zl).resolveComponentFactory(e),this.componentTypes.push(l.componentType);let c=Bw(l)?void 0:this._injector.get(ji),d=i||l.selector,u=l.create(r,[],d,c),p=u.location.nativeElement,g=u.injector.get($y,null);return g?.registerApplication(p),u.onDestroy(()=>{this.detachView(u.hostView),Fl(this.components,u),g?.unregisterApplication(p)}),this._loadComponent(u),Ne(xe.BootstrapComponentEnd,u),u})}tick(){this.zonelessEnabled||(this.dirtyFlags|=1),this._tick()}_tick(){Ne(xe.ChangeDetectionStart),this.tracingSnapshot!==null?this.tracingSnapshot.run(nf.CHANGE_DETECTION,this.tickImpl):this.tickImpl()}tickImpl=()=>{if(this._runningTick)throw Ne(xe.ChangeDetectionEnd),new x(101,!1);let e=z(null);try{this._runningTick=!0,this.synchronize()}finally{this._runningTick=!1,this.tracingSnapshot?.dispose(),this.tracingSnapshot=null,z(e),this.afterTick.next(),Ne(xe.ChangeDetectionEnd)}};synchronize(){this._rendererFactory===null&&!this._injector.destroyed&&(this._rendererFactory=this._injector.get(Wt,null,{optional:!0}));let e=0;for(;this.dirtyFlags!==0&&e++<kP;){Ne(xe.ChangeDetectionSyncStart);try{this.synchronizeOnce()}finally{Ne(xe.ChangeDetectionSyncEnd)}}}synchronizeOnce(){this.dirtyFlags&16&&(this.dirtyFlags&=-17,this.rootEffectScheduler.flush());let e=!1;if(this.dirtyFlags&7){let i=!!(this.dirtyFlags&1);this.dirtyFlags&=-8,this.dirtyFlags|=8;for(let{_lView:r}of this.allViews){if(!i&&!Il(r))continue;let o=i&&!this.zonelessEnabled?0:1;rw(r,o),e=!0}if(this.dirtyFlags&=-5,this.syncDirtyFlagsWithViews(),this.dirtyFlags&23)return}e||(this._rendererFactory?.begin?.(),this._rendererFactory?.end?.()),this.dirtyFlags&8&&(this.dirtyFlags&=-9,this.afterRenderManager.execute()),this.syncDirtyFlagsWithViews()}syncDirtyFlagsWithViews(){if(this.allViews.some(({_lView:e})=>Il(e))){this.dirtyFlags|=2;return}else this.dirtyFlags&=-8}attachView(e){let i=e;this._views.push(i),i.attachToAppRef(this)}detachView(e){let i=e;Fl(this._views,i),i.detachFromAppRef()}_loadComponent(e){this.attachView(e.hostView);try{this.tick()}catch(r){this.internalErrorHandler(r)}this.components.push(e),this._injector.get(mf,[]).forEach(r=>r(e))}ngOnDestroy(){if(!this._destroyed)try{this._destroyListeners.forEach(e=>e()),this._views.slice().forEach(e=>e.destroy())}finally{this._destroyed=!0,this._views=[],this._destroyListeners=[]}}onDestroy(e){return this._destroyListeners.push(e),()=>Fl(this._destroyListeners,e)}destroy(){if(this._destroyed)throw new x(406,!1);let e=this._injector;e.destroy&&!e.destroyed&&e.destroy()}get viewCount(){return this._views.length}static \u0275fac=function(i){return new(i||n)};static \u0275prov=D({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})();function Fl(n,t){let e=n.indexOf(t);e>-1&&n.splice(e,1)}function gf(n,t){let e=oe(),i=Yr();if(Kn(e,i,t)){let r=Je(),o=Al();if(lf(o,r,e,n,t))Fi(o)&&KE(e,o.index);else{let a=Wn(o,e);ZE(e[Ge],a,null,o.value,n,t,null)}}return gf}function Fe(n,t,e,i){let r=oe(),o=Yr();if(Kn(r,o,t)){let s=Je(),a=Al();lR(a,r,n,t,e,i)}return Fe}var ry=class{destroy(t){}updateValue(t,e){}swap(t,e){let i=Math.min(t,e),r=Math.max(t,e),o=this.detach(r);if(r-i>1){let s=this.detach(i);this.attach(i,o),this.attach(r,s)}else this.attach(i,o)}move(t,e){this.attach(e,this.detach(t))}};function xg(n,t,e,i,r){return n===e&&Object.is(t,i)?1:Object.is(r(n,t),r(e,i))?-1:0}function AP(n,t,e,i){let r,o,s=0,a=n.length-1,l=void 0;if(Array.isArray(t)){z(i);let c=t.length-1;for(z(null);s<=a&&s<=c;){let d=n.at(s),u=t[s],p=xg(s,d,s,u,e);if(p!==0){p<0&&n.updateValue(s,u),s++;continue}let g=n.at(a),_=t[c],S=xg(a,g,c,_,e);if(S!==0){S<0&&n.updateValue(a,_),a--,c--;continue}let O=e(s,d),V=e(a,g),Ee=e(s,u);if(Object.is(Ee,V)){let it=e(c,_);Object.is(it,O)?(n.swap(s,a),n.updateValue(a,_),c--,a--):n.move(a,s),n.updateValue(s,u),s++;continue}if(r??=new Ku,o??=V0(n,s,a,e),oy(n,r,s,Ee))n.updateValue(s,u),s++,a++;else if(o.has(Ee))r.set(O,n.detach(s)),a--;else{let it=n.create(s,t[s]);n.attach(s,it),s++,a++}}for(;s<=c;)L0(n,r,e,s,t[s]),s++}else if(t!=null){z(i);let c=t[Symbol.iterator]();z(null);let d=c.next();for(;!d.done&&s<=a;){let u=n.at(s),p=d.value,g=xg(s,u,s,p,e);if(g!==0)g<0&&n.updateValue(s,p),s++,d=c.next();else{r??=new Ku,o??=V0(n,s,a,e);let _=e(s,p);if(oy(n,r,s,_))n.updateValue(s,p),s++,a++,d=c.next();else if(!o.has(_))n.attach(s,n.create(s,p)),s++,a++,d=c.next();else{let S=e(s,u);r.set(S,n.detach(s)),a--}}}for(;!d.done;)L0(n,r,e,n.length,d.value),d=c.next()}for(;s<=a;)n.destroy(n.detach(a--));r?.forEach(c=>{n.destroy(c)})}function oy(n,t,e,i){return t!==void 0&&t.has(i)?(n.attach(e,t.get(i)),t.delete(i),!0):!1}function L0(n,t,e,i,r){if(oy(n,t,i,e(i,r)))n.updateValue(i,r);else{let o=n.create(i,r);n.attach(i,o)}}function V0(n,t,e,i){let r=new Set;for(let o=t;o<=e;o++)r.add(i(o,n.at(o)));return r}var Ku=class{kvMap=new Map;_vMap=void 0;has(t){return this.kvMap.has(t)}delete(t){if(!this.has(t))return!1;let e=this.kvMap.get(t);return this._vMap!==void 0&&this._vMap.has(e)?(this.kvMap.set(t,this._vMap.get(e)),this._vMap.delete(e)):this.kvMap.delete(t),!0}get(t){return this.kvMap.get(t)}set(t,e){if(this.kvMap.has(t)){let i=this.kvMap.get(t);this._vMap===void 0&&(this._vMap=new Map);let r=this._vMap;for(;r.has(i);)i=r.get(i);r.set(i,e)}else this.kvMap.set(t,e)}forEach(t){for(let[e,i]of this.kvMap)if(t(i,e),this._vMap!==void 0){let r=this._vMap;for(;r.has(i);)i=r.get(i),t(i,e)}}};function N(n,t,e,i,r,o,s,a){yr("NgControlFlow");let l=oe(),c=Je(),d=kn(c.consts,o);return na(l,c,n,t,e,i,r,d,256,s,a),qy}function qy(n,t,e,i,r,o,s,a){yr("NgControlFlow");let l=oe(),c=Je(),d=kn(c.consts,o);return na(l,c,n,t,e,i,r,d,512,s,a),qy}function F(n,t){yr("NgControlFlow");let e=oe(),i=Yr(),r=e[i]!==Yn?e[i]:-1,o=r!==-1?Yu(e,Qe+r):void 0,s=0;if(Kn(e,i,n)){let a=z(null);try{if(o!==void 0&&dw(o,s),n!==-1){let l=Qe+n,c=Yu(e,l),d=cy(e[X],l),u=fw(c,d,e),p=Kl(e,d,t,{dehydratedView:u});Yl(c,p,s,ta(d,u))}}finally{z(a)}}else if(o!==void 0){let a=cw(o,s);a!==void 0&&(a[ft]=t)}}var sy=class{lContainer;$implicit;$index;constructor(t,e,i){this.lContainer=t,this.$implicit=e,this.$index=i}get $count(){return this.lContainer.length-st}};function Ky(n){return n}function to(n,t){return t}var ay=class{hasEmptyBlock;trackByFn;liveCollection;constructor(t,e,i){this.hasEmptyBlock=t,this.trackByFn=e,this.liveCollection=i}};function Be(n,t,e,i,r,o,s,a,l,c,d,u,p){yr("NgControlFlow");let g=oe(),_=Je(),S=l!==void 0,O=oe(),V=a?s.bind(O[nn][ft]):s,Ee=new ay(S,V);O[Qe+n]=Ee,na(g,_,n+1,t,e,i,r,kn(_.consts,o),256),S&&na(g,_,n+2,l,c,d,u,kn(_.consts,p),512)}var ly=class extends ry{lContainer;hostLView;templateTNode;operationsCounter=void 0;needsIndexUpdate=!1;constructor(t,e,i){super(),this.lContainer=t,this.hostLView=e,this.templateTNode=i}get length(){return this.lContainer.length-st}at(t){return this.getLView(t)[ft].$implicit}attach(t,e){let i=e[Lo];this.needsIndexUpdate||=t!==this.length,Yl(this.lContainer,e,t,ta(this.templateTNode,i)),OP(this.lContainer,t)}detach(t){return this.needsIndexUpdate||=t!==this.length-1,RP(this.lContainer,t),PP(this.lContainer,t)}create(t,e){let i=Uu(this.lContainer,this.templateTNode.tView.ssrId);return Kl(this.hostLView,this.templateTNode,new sy(this.lContainer,e,t),{dehydratedView:i})}destroy(t){of(t[X],t)}updateValue(t,e){this.getLView(t)[ft].$implicit=e}reset(){this.needsIndexUpdate=!1}updateIndexes(){if(this.needsIndexUpdate)for(let t=0;t<this.length;t++)this.getLView(t)[ft].$index=t}getLView(t){return NP(this.lContainer,t)}};function je(n){let t=z(null),e=ur();try{let i=oe(),r=i[X],o=i[e],s=e+1,a=Yu(i,s);if(o.liveCollection===void 0){let c=cy(r,s);o.liveCollection=new ly(a,i,c)}else o.liveCollection.reset();let l=o.liveCollection;if(AP(l,n,o.trackByFn,t),l.updateIndexes(),o.hasEmptyBlock){let c=Yr(),d=l.length===0;if(Kn(i,c,d)){let u=e+2,p=Yu(i,u);if(d){let g=cy(r,u),_=fw(p,g,i),S=Kl(i,g,void 0,{dehydratedView:_});Yl(p,S,0,ta(g,_))}else r.firstUpdatePass&&AR(p),dw(p,0)}}}finally{z(t)}}function Yu(n,t){return n[t]}function OP(n,t){if(n.length<=st)return;let e=st+t,i=n[e],r=i?i[qr]:void 0;if(i&&r&&r.detachedLeaveAnimationFns&&r.detachedLeaveAnimationFns.length>0){let o=i[lr];jO(o,r),Go.delete(i[cr]),r.detachedLeaveAnimationFns=void 0}}function RP(n,t){if(n.length<=st)return;let e=st+t,i=n[e],r=i?i[qr]:void 0;r&&r.leave&&r.leave.size>0&&(r.detachedLeaveAnimationFns=[])}function PP(n,t){return jl(n,t)}function NP(n,t){return cw(n,t)}function cy(n,t){return pu(n,t)}function fe(n,t,e){let i=oe(),r=Yr();if(Kn(i,r,t)){let o=Je(),s=Al();rR(s,i,n,t,i[Ge],e)}return fe}function dy(n,t,e,i,r){lf(t,n,e,r?"class":"style",i)}function h(n,t,e,i){let r=oe(),o=r[X],s=n+Qe,a=o.firstCreatePass?yw(s,r,2,t,YE,ng(),e,i):o.data[s];if(Fi(a)){let l=r[fi].tracingService;if(l&&l.componentCreate){let c=o.data[a.directiveStart+a.componentOffset];return l.componentCreate(ww(c),()=>(B0(n,t,r,a,i),h))}}return B0(n,t,r,a,i),h}function B0(n,t,e,i,r){if(XE(i,e,n,t,jw),Ml(i)){let o=e[X];Ny(o,e,i),_E(o,i,e)}r!=null&&af(e,i)}function m(){let n=Je(),t=Nt(),e=QE(t);return n.firstCreatePass&&vw(n,e),rg(e)&&og(),tg(),e.classesWithoutHost!=null&&xA(e)&&dy(n,e,oe(),e.classesWithoutHost,!0),e.stylesWithoutHost!=null&&TA(e)&&dy(n,e,oe(),e.stylesWithoutHost,!1),m}function _e(n,t,e,i){return h(n,t,e,i),m(),_e}function gn(n,t,e,i){let r=oe(),o=r[X],s=n+Qe,a=o.firstCreatePass?WR(s,o,2,t,e,i):o.data[s];return XE(a,r,n,t,jw),i!=null&&af(r,a),gn}function Zn(){let n=Nt(),t=QE(n);return rg(t)&&og(),tg(),Zn}function Xo(n,t,e,i){return gn(n,t,e,i),Zn(),Xo}var jw=(n,t,e,i,r)=>(Eu(!0),xE(t[Ge],i,hg()));function _t(){return oe()}function no(n,t,e){let i=oe(),r=Yr();if(Kn(i,r,t)){let o=Je(),s=Al();qE(s,i,n,t,i[Ge],e)}return no}var Rl=void 0;function FP(n){let t=Math.floor(Math.abs(n)),e=n.toString().replace(/^[^.]*\.?/,"").length;return t===1&&e===0?1:5}var LP=["en",[["a","p"],["AM","PM"]],[["AM","PM"]],[["S","M","T","W","T","F","S"],["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],["Su","Mo","Tu","We","Th","Fr","Sa"]],Rl,[["J","F","M","A","M","J","J","A","S","O","N","D"],["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],["January","February","March","April","May","June","July","August","September","October","November","December"]],Rl,[["B","A"],["BC","AD"],["Before Christ","Anno Domini"]],0,[6,0],["M/d/yy","MMM d, y","MMMM d, y","EEEE, MMMM d, y"],["h:mm\u202Fa","h:mm:ss\u202Fa","h:mm:ss\u202Fa z","h:mm:ss\u202Fa zzzz"],["{1}, {0}",Rl,Rl,Rl],[".",",",";","%","+","-","E","\xD7","\u2030","\u221E","NaN",":"],["#,##0.###","#,##0%","\xA4#,##0.00","#E0"],"USD","$","US Dollar",{},"ltr",FP],Tg={};function yn(n){let t=VP(n),e=j0(t);if(e)return e;let i=t.split("-")[0];if(e=j0(i),e)return e;if(i==="en")return LP;throw new x(701,!1)}function j0(n){return n in Tg||(Tg[n]=Hn.ng&&Hn.ng.common&&Hn.ng.common.locales&&Hn.ng.common.locales[n]),Tg[n]}var lt=(function(n){return n[n.LocaleId=0]="LocaleId",n[n.DayPeriodsFormat=1]="DayPeriodsFormat",n[n.DayPeriodsStandalone=2]="DayPeriodsStandalone",n[n.DaysFormat=3]="DaysFormat",n[n.DaysStandalone=4]="DaysStandalone",n[n.MonthsFormat=5]="MonthsFormat",n[n.MonthsStandalone=6]="MonthsStandalone",n[n.Eras=7]="Eras",n[n.FirstDayOfWeek=8]="FirstDayOfWeek",n[n.WeekendRange=9]="WeekendRange",n[n.DateFormat=10]="DateFormat",n[n.TimeFormat=11]="TimeFormat",n[n.DateTimeFormat=12]="DateTimeFormat",n[n.NumberSymbols=13]="NumberSymbols",n[n.NumberFormats=14]="NumberFormats",n[n.CurrencyCode=15]="CurrencyCode",n[n.CurrencySymbol=16]="CurrencySymbol",n[n.CurrencyName=17]="CurrencyName",n[n.Currencies=18]="Currencies",n[n.Directionality=19]="Directionality",n[n.PluralCase=20]="PluralCase",n[n.ExtraData=21]="ExtraData",n})(lt||{});function VP(n){return n.toLowerCase().replace(/_/g,"-")}var Ql="en-US";var BP=Ql;function Uw(n){typeof n=="string"&&(BP=n.toLowerCase().replace(/_/g,"-"))}function K(n,t,e){let i=oe(),r=Je(),o=Nt();return jP(r,i,i[Ge],o,n,t,e),K}function ca(n,t,e){let i=oe(),r=Je(),o=Nt();return(o.type&3||e)&&Dw(o,r,i,e,i[Ge],n,t,Pu(o,i,t)),ca}function jP(n,t,e,i,r,o,s){let a=!0,l=null;if((i.type&3||s)&&(l??=Pu(i,t,o),Dw(i,n,t,s,e,r,o,l)&&(a=!1)),a){let c=i.outputs?.[r],d=i.hostDirectiveOutputs?.[r];if(d&&d.length)for(let u=0;u<d.length;u+=2){let p=d[u],g=d[u+1];l??=Pu(i,t,o),R0(i,t,p,g,r,l)}if(c&&c.length)for(let u of c)l??=Pu(i,t,o),R0(i,t,u,r,r,l)}}function w(n=1){return n0(n)}function UP(n,t){let e=null,i=SO(n);for(let r=0;r<t.length;r++){let o=t[r];if(o==="*"){e=r;continue}if(i===null?NE(n,o,!0):MO(i,o))return r}return e}function ht(n){let t=oe()[nn][tn];if(!t.projection){let e=n?n.length:1,i=t.projection=ID(e,null),r=i.slice(),o=t.child;for(;o!==null;){if(o.type!==128){let s=n?UP(o,n):0;s!==null&&(r[s]?r[s].projectionNext=o:i[s]=o,r[s]=o)}o=o.next}}}function ke(n,t=0,e,i,r,o){let s=oe(),a=Je(),l=i?n+1:null;l!==null&&na(s,a,l,i,r,o,null,e);let c=sa(a,Qe+n,16,null,e||null);c.projection===null&&(c.projection=t),lg();let u=!s[Lo]||ig();s[nn][tn].projection[c.projection]===null&&l!==null?HP(s,a,l):u&&!Ju(c)&&XO(a,s,c)}function HP(n,t,e){let i=Qe+e,r=t.data[i],o=n[i],s=Uu(o,r.tView.ssrId),a=Kl(n,r,void 0,{dehydratedView:s});Yl(o,a,0,ta(r,s))}function On(n,t,e,i){return kw(n,t,e,i),On}function bt(n,t,e){return Iw(n,t,e),bt}function J(n){let t=oe(),e=Je(),i=vu();kl(i+1);let r=jy(e,i);if(n.dirty&&BD(t)===((r.metadata.flags&2)===2)){if(r.matches===null)n.reset([]);else{let o=Ow(t,i);n.reset(o,aE),n.notifyOnChanges()}return!0}return!1}function ee(){return By(oe(),vu())}function yf(n,t,e,i,r){return Pw(t,kw(n,e,i,r)),yf}function vf(n,t,e,i){return Pw(n,Iw(t,e,i)),vf}function _f(n=1){kl(vu()+n)}function bi(n){let t=qD();return hu(t,Qe+n)}function Iu(n,t){return n<<17|t<<2}function Ko(n){return n>>17&32767}function $P(n){return(n&2)==2}function zP(n,t){return n&131071|t<<17}function uy(n){return n|2}function ia(n){return(n&131068)>>2}function Mg(n,t){return n&-131069|t<<2}function WP(n){return(n&1)===1}function fy(n){return n|1}function GP(n,t,e,i,r,o){let s=o?t.classBindings:t.styleBindings,a=Ko(s),l=ia(s);n[i]=e;let c=!1,d;if(Array.isArray(e)){let u=e;d=u[1],(d===null||zs(u,d)>0)&&(c=!0)}else d=e;if(r)if(l!==0){let p=Ko(n[a+1]);n[i+1]=Iu(p,a),p!==0&&(n[p+1]=Mg(n[p+1],i)),n[a+1]=zP(n[a+1],i)}else n[i+1]=Iu(a,0),a!==0&&(n[a+1]=Mg(n[a+1],i)),a=i;else n[i+1]=Iu(l,0),a===0?a=i:n[l+1]=Mg(n[l+1],i),l=i;c&&(n[i+1]=uy(n[i+1])),U0(n,d,i,!0),U0(n,d,i,!1),qP(t,d,n,i,o),s=Iu(a,l),o?t.classBindings=s:t.styleBindings=s}function qP(n,t,e,i,r){let o=r?n.residualClasses:n.residualStyles;o!=null&&typeof t=="string"&&zs(o,t)>=0&&(e[i+1]=fy(e[i+1]))}function U0(n,t,e,i){let r=n[e+1],o=t===null,s=i?Ko(r):ia(r),a=!1;for(;s!==0&&(a===!1||o);){let l=n[s],c=n[s+1];KP(l,t)&&(a=!0,n[s+1]=i?fy(c):uy(c)),s=i?Ko(c):ia(c)}a&&(n[e+1]=i?uy(r):fy(r))}function KP(n,t){return n===null||t==null||(Array.isArray(n)?n[1]:n)===t?!0:Array.isArray(n)&&typeof t=="string"?zs(n,t)>=0:!1}var gi={textEnd:0,key:0,keyEnd:0,value:0,valueEnd:0};function YP(n){return n.substring(gi.key,gi.keyEnd)}function ZP(n){return XP(n),Hw(n,$w(n,0,gi.textEnd))}function Hw(n,t){let e=gi.textEnd;return e===t?-1:(t=gi.keyEnd=QP(n,gi.key=t,e),$w(n,t,e))}function XP(n){gi.key=0,gi.keyEnd=0,gi.value=0,gi.valueEnd=0,gi.textEnd=n.length}function $w(n,t,e){for(;t<e&&n.charCodeAt(t)<=32;)t++;return t}function QP(n,t,e){for(;t<e&&n.charCodeAt(t)>32;)t++;return t}function da(n,t,e){return zw(n,t,e,!1),da}function ce(n,t){return zw(n,t,null,!0),ce}function Rn(n){eN(sN,JP,n,!0)}function JP(n,t){for(let e=ZP(t);e>=0;e=Hw(t,e))du(n,YP(t),!0)}function zw(n,t,e,i){let r=oe(),o=Je(),s=ug(2);if(o.firstUpdatePass&&Gw(o,n,s,i),t!==Yn&&Kn(r,s,t)){let a=o.data[ur()];qw(o,a,r,r[Ge],n,r[s+1]=lN(t,e),i,s)}}function eN(n,t,e,i){let r=Je(),o=ug(2);r.firstUpdatePass&&Gw(r,null,o,i);let s=oe();if(e!==Yn&&Kn(s,o,e)){let a=r.data[ur()];if(Kw(a,i)&&!Ww(r,o)){let l=i?a.classesWithoutHost:a.stylesWithoutHost;l!==null&&(e=ru(l,e||"")),dy(r,a,s,e,i)}else aN(r,a,s,s[Ge],s[o+1],s[o+1]=oN(n,t,e),i,o)}}function Ww(n,t){return t>=n.expandoStartIndex}function Gw(n,t,e,i){let r=n.data;if(r[e+1]===null){let o=r[ur()],s=Ww(n,e);Kw(o,i)&&t===null&&!s&&(t=!1),t=tN(r,o,t,i),GP(r,o,t,e,s,i)}}function tN(n,t,e,i){let r=QD(n),o=i?t.residualClasses:t.residualStyles;if(r===null)(i?t.classBindings:t.styleBindings)===0&&(e=Ig(null,n,t,e,i),e=Hl(e,t.attrs,i),o=null);else{let s=t.directiveStylingLast;if(s===-1||n[s]!==r)if(e=Ig(r,n,t,e,i),o===null){let l=nN(n,t,i);l!==void 0&&Array.isArray(l)&&(l=Ig(null,n,t,l[1],i),l=Hl(l,t.attrs,i),iN(n,t,i,l))}else o=rN(n,t,i)}return o!==void 0&&(i?t.residualClasses=o:t.residualStyles=o),e}function nN(n,t,e){let i=e?t.classBindings:t.styleBindings;if(ia(i)!==0)return n[Ko(i)]}function iN(n,t,e,i){let r=e?t.classBindings:t.styleBindings;n[Ko(r)]=i}function rN(n,t,e){let i,r=t.directiveEnd;for(let o=1+t.directiveStylingLast;o<r;o++){let s=n[o].hostAttrs;i=Hl(i,s,e)}return Hl(i,t.attrs,e)}function Ig(n,t,e,i,r){let o=null,s=e.directiveEnd,a=e.directiveStylingLast;for(a===-1?a=e.directiveStart:a++;a<s&&(o=t[a],i=Hl(i,o.hostAttrs,r),o!==n);)a++;return n!==null&&(e.directiveStylingLast=a),i}function Hl(n,t,e){let i=e?1:2,r=-1;if(t!==null)for(let o=0;o<t.length;o++){let s=t[o];typeof s=="number"?r=s:r===i&&(Array.isArray(n)||(n=n===void 0?[]:["",n]),du(n,s,e?!0:t[++o]))}return n===void 0?null:n}function oN(n,t,e){if(e==null||e==="")return $t;let i=[],r=_i(e);if(Array.isArray(r))for(let o=0;o<r.length;o++)n(i,r[o],!0);else if(r instanceof Set)for(let o of r)n(i,o,!0);else if(typeof r=="object")for(let o in r)r.hasOwnProperty(o)&&n(i,o,r[o]);else typeof r=="string"&&t(i,r);return i}function sN(n,t,e){let i=String(t);i!==""&&!i.includes(" ")&&du(n,i,e)}function aN(n,t,e,i,r,o,s,a){r===Yn&&(r=$t);let l=0,c=0,d=0<r.length?r[0]:null,u=0<o.length?o[0]:null;for(;d!==null||u!==null;){let p=l<r.length?r[l+1]:void 0,g=c<o.length?o[c+1]:void 0,_=null,S;d===u?(l+=2,c+=2,p!==g&&(_=u,S=g)):u===null||d!==null&&d<u?(l+=2,_=d):(c+=2,_=u,S=g),_!==null&&qw(n,t,e,i,_,S,s,a),d=l<r.length?r[l]:null,u=c<o.length?o[c]:null}}function qw(n,t,e,i,r,o,s,a){if(!(t.type&3))return;let l=n.data,c=l[a+1],d=WP(c)?H0(l,t,e,r,ia(c),s):void 0;if(!Zu(d)){Zu(o)||$P(c)&&(o=H0(l,null,e,r,a,s));let u=Km(ur(),e);JO(i,s,u,r,o)}}function H0(n,t,e,i,r,o){let s=t===null,a;for(;r>0;){let l=n[r],c=Array.isArray(l),d=c?l[1]:l,u=d===null,p=e[r+1];p===Yn&&(p=u?$t:void 0);let g=u?uu(p,i):d===i?p:void 0;if(c&&!Zu(g)&&(g=uu(l,i)),Zu(g)&&(a=g,s))return a;let _=n[r+1];r=s?Ko(_):ia(_)}if(t!==null){let l=o?t.residualClasses:t.residualStyles;l!=null&&(a=uu(l,i))}return a}function Zu(n){return n!==void 0}function lN(n,t){return n==null||n===""||(typeof t=="string"?n=n+t:typeof n=="object"&&(n=El(_i(n)))),n}function Kw(n,t){return(n.flags&(t?8:16))!==0}function v(n,t=""){let e=oe(),i=Je(),r=n+Qe,o=i.firstCreatePass?sa(i,r,1,t,null):i.data[r],s=cN(i,e,o,t);e[r]=s,Du()&&Ry(i,e,s,o),Ys(o,!1)}var cN=(n,t,e,i)=>(Eu(!0),hO(t[Ge],i));function Yw(n,t,e,i=""){return Kn(n,Yr(),e)?t+au(e)+i:Yn}function k(n){return Ze("",n),k}function Ze(n,t,e){let i=oe(),r=Yw(i,n,t,e);return r!==Yn&&dN(i,ur(),r),Ze}function dN(n,t,e){let i=Km(t,n);mO(n[Ge],i,e)}function Yy(n,t,e=""){return Yw(oe(),n,t,e)}function $0(n,t,e){let i=Je();i.firstCreatePass&&Zw(t,i.data,i.blueprint,Li(n),e)}function Zw(n,t,e,i,r){if(n=Pt(n),Array.isArray(n))for(let o=0;o<n.length;o++)Zw(n[o],t,e,i,r);else{let o=Je(),s=oe(),a=Nt(),l=Po(n)?n:Pt(n.provide),c=Hm(n),d=a.providerIndexes&1048575,u=a.directiveStart,p=a.providerIndexes>>20;if(Po(n)||!n.multi){let g=new Wo(c,r,et,null),_=Ag(l,t,r?d:d+p,u);_===-1?(Rg(Bu(a,s),o,l),kg(o,n,t.length),t.push(l),a.directiveStart++,a.directiveEnd++,r&&(a.providerIndexes+=1048576),e.push(g),s.push(g)):(e[_]=g,s[_]=g)}else{let g=Ag(l,t,d+p,u),_=Ag(l,t,d,d+p),S=g>=0&&e[g],O=_>=0&&e[_];if(r&&!O||!r&&!S){Rg(Bu(a,s),o,l);let V=pN(r?fN:uN,e.length,r,i,c,n);!r&&O&&(e[_].providerFactory=V),kg(o,n,t.length,0),t.push(l),a.directiveStart++,a.directiveEnd++,r&&(a.providerIndexes+=1048576),e.push(V),s.push(V)}else{let V=Xw(e[r?_:g],c,!r&&i);kg(o,n,g>-1?g:_,V)}!r&&i&&O&&e[_].componentProviders++}}}function kg(n,t,e,i){let r=Po(t),o=ND(t);if(r||o){let l=(o?Pt(t.useClass):t).prototype.ngOnDestroy;if(l){let c=n.destroyHooks||(n.destroyHooks=[]);if(!r&&t.multi){let d=c.indexOf(e);d===-1?c.push(e,[i,l]):c[d+1].push(i,l)}else c.push(e,l)}}}function Xw(n,t,e){return e&&n.componentProviders++,n.multi.push(t)-1}function Ag(n,t,e,i){for(let r=e;r<i;r++)if(t[r]===n)return r;return-1}function uN(n,t,e,i,r){return py(this.multi,[])}function fN(n,t,e,i,r){let o=this.multi,s;if(this.providerFactory){let a=this.providerFactory.componentProviders,l=Ll(i,i[X],this.providerFactory.index,r);s=l.slice(0,a),py(o,s);for(let c=a;c<l.length;c++)s.push(l[c])}else s=[],py(o,s);return s}function py(n,t){for(let e=0;e<n.length;e++){let i=n[e];t.push(i())}return t}function pN(n,t,e,i,r,o){let s=new Wo(n,e,et,null);return s.multi=[],s.index=t,s.componentProviders=0,Xw(s,r,i&&!e),s}function Ct(n,t){return e=>{e.providersResolver=(i,r)=>$0(i,r?r(n):n,!1),t&&(e.viewProvidersResolver=(i,r)=>$0(i,r?r(t):t,!0))}}function Qw(n,t){let e=n[t];return e===Yn?void 0:e}function hN(n,t,e,i,r,o){let s=t+e;return Kn(n,s,r)?Cw(n,s+1,o?i.call(o,r):i(r)):Qw(n,s+1)}function mN(n,t,e,i,r,o,s){let a=t+e;return GR(n,a,r,o)?Cw(n,a+2,s?i.call(s,r,o):i(r,o)):Qw(n,a+2)}function vr(n,t){let e=Je(),i,r=n+Qe;e.firstCreatePass?(i=gN(t,e.pipeRegistry),e.data[r]=i,i.onDestroy&&(e.destroyHooks??=[]).push(r,i.onDestroy)):i=e.data[r];let o=i.factory||(i.factory=Ur(i.type,!0)),s,a=en(et);try{let l=Vu(!1),c=o();return Vu(l),Ym(e,oe(),r,c),c}finally{en(a)}}function gN(n,t){if(t)for(let e=t.length-1;e>=0;e--){let i=t[e];if(n===i.name)return i}}function Qo(n,t,e){let i=n+Qe,r=oe(),o=hu(r,i);return Jw(r,i)?hN(r,dg(),t,o.transform,e,o):o.transform(e)}function bf(n,t,e,i){let r=n+Qe,o=oe(),s=hu(o,r);return Jw(o,r)?mN(o,dg(),t,s.transform,e,i,s):s.transform(e,i)}function Jw(n,t){return n[X].data[t].pure}function Zy(n,t){return cf(n,t)}var Xu=class{ngModuleFactory;componentFactories;constructor(t,e){this.ngModuleFactory=t,this.componentFactories=e}},Xy=(()=>{class n{compileModuleSync(e){return new qu(e)}compileModuleAsync(e){return Promise.resolve(this.compileModuleSync(e))}compileModuleAndAllComponentsSync(e){let i=this.compileModuleSync(e),r=Rm(e),o=RE(r.declarations).reduce((s,a)=>{let l=sr(a);return l&&s.push(new qo(l)),s},[]);return new Xu(i,o)}compileModuleAndAllComponentsAsync(e){return Promise.resolve(this.compileModuleAndAllComponentsSync(e))}clearCache(){}clearCacheFor(e){}getModuleId(e){}static \u0275fac=function(i){return new(i||n)};static \u0275prov=D({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})();var eS=(()=>{class n{applicationErrorHandler=f(qn);appRef=f(rn);taskService=f(Xr);ngZone=f(U);zonelessEnabled=f(Ol);tracing=f(gr,{optional:!0});zoneIsDefined=typeof Zone<"u"&&!!Zone.root.run;schedulerTickApplyArgs=[{data:{__scheduler_tick__:!0}}];subscriptions=new Z;angularZoneId=this.zoneIsDefined?this.ngZone._inner?.get(Cl):null;scheduleInRootZone=!this.zonelessEnabled&&this.zoneIsDefined&&(f(bg,{optional:!0})??!1);cancelScheduledCallback=null;useMicrotaskScheduler=!1;runningTick=!1;pendingRenderTaskId=null;constructor(){this.subscriptions.add(this.appRef.afterTick.subscribe(()=>{let e=this.taskService.add();if(!this.runningTick&&(this.cleanup(),!this.zonelessEnabled||this.appRef.includeAllTestViews)){this.taskService.remove(e);return}this.switchToMicrotaskScheduler(),this.taskService.remove(e)})),this.subscriptions.add(this.ngZone.onUnstable.subscribe(()=>{this.runningTick||this.cleanup()}))}switchToMicrotaskScheduler(){this.ngZone.runOutsideAngular(()=>{let e=this.taskService.add();this.useMicrotaskScheduler=!0,queueMicrotask(()=>{this.useMicrotaskScheduler=!1,this.taskService.remove(e)})})}notify(e){if(!this.zonelessEnabled&&e===5)return;switch(e){case 0:{this.appRef.dirtyFlags|=2;break}case 3:case 2:case 4:case 5:case 1:{this.appRef.dirtyFlags|=4;break}case 6:{this.appRef.dirtyFlags|=2;break}case 12:{this.appRef.dirtyFlags|=16;break}case 13:{this.appRef.dirtyFlags|=2;break}case 11:break;default:this.appRef.dirtyFlags|=8}if(this.appRef.tracingSnapshot=this.tracing?.snapshot(this.appRef.tracingSnapshot)??null,!this.shouldScheduleTick())return;let i=this.useMicrotaskScheduler?s0:gg;this.pendingRenderTaskId=this.taskService.add(),this.scheduleInRootZone?this.cancelScheduledCallback=Zone.root.run(()=>i(()=>this.tick())):this.cancelScheduledCallback=this.ngZone.runOutsideAngular(()=>i(()=>this.tick()))}shouldScheduleTick(){return!(this.appRef.destroyed||this.pendingRenderTaskId!==null||this.runningTick||this.appRef._runningTick||!this.zonelessEnabled&&this.zoneIsDefined&&Zone.current.get(Cl+this.angularZoneId))}tick(){if(this.runningTick||this.appRef.destroyed)return;if(this.appRef.dirtyFlags===0){this.cleanup();return}!this.zonelessEnabled&&this.appRef.dirtyFlags&7&&(this.appRef.dirtyFlags|=1);let e=this.taskService.add();try{this.ngZone.run(()=>{this.runningTick=!0,this.appRef._tick()},void 0,this.schedulerTickApplyArgs)}catch(i){this.applicationErrorHandler(i)}finally{this.taskService.remove(e),this.cleanup()}}ngOnDestroy(){this.subscriptions.unsubscribe(),this.cleanup()}cleanup(){if(this.runningTick=!1,this.cancelScheduledCallback?.(),this.cancelScheduledCallback=null,this.pendingRenderTaskId!==null){let e=this.pendingRenderTaskId;this.pendingRenderTaskId=null,this.taskService.remove(e)}}static \u0275fac=function(i){return new(i||n)};static \u0275prov=D({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})();function Qy(){return yr("NgZoneless"),ar([...Jy(),[]])}function Jy(){return[{provide:ir,useExisting:eS},{provide:U,useClass:Dl},{provide:Ol,useValue:!0}]}function yN(){return typeof $localize<"u"&&$localize.locale||Ql}var ua=new C("",{factory:()=>f(ua,{optional:!0,skipSelf:!0})||yN()});var Cf=class{destroyed=!1;listeners=null;errorHandler=f(Un,{optional:!0});destroyRef=f(at);constructor(){this.destroyRef.onDestroy(()=>{this.destroyed=!0,this.listeners=null})}subscribe(t){if(this.destroyed)throw new x(953,!1);return(this.listeners??=[]).push(t),{unsubscribe:()=>{let e=this.listeners?.indexOf(t);e!==void 0&&e!==-1&&this.listeners?.splice(e,1)}}}emit(t){if(this.destroyed){console.warn(rr(953,!1));return}if(this.listeners===null)return;let e=z(null);try{for(let i of this.listeners)try{i(t)}catch(r){this.errorHandler?.handleError(r)}}finally{z(e)}}};function Ae(n){return yD(n)}function L(n,t){return il(n,t?.equal)}var vN=n=>n;function ev(n,t){if(typeof n=="function"){let e=pm(n,vN,t?.equal);return tS(e,t?.debugName)}else{let e=pm(n.source,n.computation,n.equal);return tS(e,n.debugName)}}function tS(n,t){let e=n[ct],i=n;return i.set=r=>mD(e,r),i.update=r=>gD(e,r),i.asReadonly=wu.bind(n),i}var cS=Symbol("InputSignalNode#UNSET"),AN=$(b({},rl),{transformFn:void 0,applyValueToInputSignal(n,t){So(n,t)}});function dS(n,t){let e=Object.create(AN);e.value=n,e.transformFn=t?.transform;function i(){if(Pr(e),e.value===cS){let r=null;throw new x(-950,r)}return e.value}return i[ct]=e,i}var Jo=class{attributeName;constructor(t){this.attributeName=t}__NG_ELEMENT_ID__=()=>zl(this.attributeName);toString(){return`HostAttributeToken ${this.attributeName}`}};function io(n){return new Cf}function nS(n,t){return dS(n,t)}function ON(n){return dS(cS,n)}var Ft=(nS.required=ON,nS);function iS(n,t){return Uy(t)}function RN(n,t){return Hy(t)}var ec=(iS.required=RN,iS);function rS(n,t){return Uy(t)}function PN(n,t){return Hy(t)}var uS=(rS.required=PN,rS);var nv=new C(""),NN=new C("");function Jl(n){return!n.moduleRef}function FN(n){let t=Jl(n)?n.r3Injector:n.moduleRef.injector,e=t.get(U);return e.run(()=>{Jl(n)?n.r3Injector.resolveInjectorInitializers():n.moduleRef.resolveInjectorInitializers();let i=t.get(qn),r;if(e.runOutsideAngular(()=>{r=e.onError.subscribe({next:i})}),Jl(n)){let o=()=>t.destroy(),s=n.platformInjector.get(nv);s.add(o),t.onDestroy(()=>{r.unsubscribe(),s.delete(o)})}else{let o=()=>n.moduleRef.destroy(),s=n.platformInjector.get(nv);s.add(o),n.moduleRef.onDestroy(()=>{Fl(n.allPlatformModules,n.moduleRef),r.unsubscribe(),s.delete(o)})}return VN(i,e,()=>{let o=t.get(Xr),s=o.add(),a=t.get(Gy);return a.runInitializers(),a.donePromise.then(()=>{let l=t.get(ua,Ql);if(Uw(l||Ql),!t.get(NN,!0))return Jl(n)?t.get(rn):(n.allPlatformModules.push(n.moduleRef),n.moduleRef);if(Jl(n)){let d=t.get(rn);return n.rootComponent!==void 0&&d.bootstrap(n.rootComponent),d}else return LN?.(n.moduleRef,n.allPlatformModules),n.moduleRef}).finally(()=>{o.remove(s)})})})}var LN;function VN(n,t,e){try{let i=e();return eo(i)?i.catch(r=>{throw t.runOutsideAngular(()=>n(r)),r}):i}catch(i){throw t.runOutsideAngular(()=>n(i)),i}}var Df=null;function BN(n=[],t){return le.create({name:t,providers:[{provide:xl,useValue:"platform"},{provide:nv,useValue:new Set([()=>Df=null])},...n]})}function jN(n=[]){if(Df)return Df;let t=BN(n);return Df=t,Vw(),UN(t),t}function UN(n){let t=n.get(Qu,null);zt(n,()=>{t?.forEach(e=>e())})}var HN=1e4;var fY=HN-1e3;var tt=(()=>{class n{static __NG_ELEMENT_ID__=$N}return n})();function $N(n){return zN(Nt(),oe(),(n&16)===16)}function zN(n,t,e){if(Fi(n)&&!e){let i=Gn(n.index,t);return new Qr(i,i)}else if(n.type&175){let i=t[nn];return new Qr(i,t)}return null}var iv=class{supports(t){return Vy(t)}create(t){return new rv(t)}},WN=(n,t)=>t,rv=class{length=0;collection;_linkedRecords=null;_unlinkedRecords=null;_previousItHead=null;_itHead=null;_itTail=null;_additionsHead=null;_additionsTail=null;_movesHead=null;_movesTail=null;_removalsHead=null;_removalsTail=null;_identityChangesHead=null;_identityChangesTail=null;_trackByFn;constructor(t){this._trackByFn=t||WN}forEachItem(t){let e;for(e=this._itHead;e!==null;e=e._next)t(e)}forEachOperation(t){let e=this._itHead,i=this._removalsHead,r=0,o=null;for(;e||i;){let s=!i||e&&e.currentIndex<oS(i,r,o)?e:i,a=oS(s,r,o),l=s.currentIndex;if(s===i)r--,i=i._nextRemoved;else if(e=e._next,s.previousIndex==null)r++;else{o||(o=[]);let c=a-r,d=l-r;if(c!=d){for(let p=0;p<c;p++){let g=p<o.length?o[p]:o[p]=0,_=g+p;d<=_&&_<c&&(o[p]=g+1)}let u=s.previousIndex;o[u]=d-c}}a!==l&&t(s,a,l)}}forEachPreviousItem(t){let e;for(e=this._previousItHead;e!==null;e=e._nextPrevious)t(e)}forEachAddedItem(t){let e;for(e=this._additionsHead;e!==null;e=e._nextAdded)t(e)}forEachMovedItem(t){let e;for(e=this._movesHead;e!==null;e=e._nextMoved)t(e)}forEachRemovedItem(t){let e;for(e=this._removalsHead;e!==null;e=e._nextRemoved)t(e)}forEachIdentityChange(t){let e;for(e=this._identityChangesHead;e!==null;e=e._nextIdentityChange)t(e)}diff(t){if(t==null&&(t=[]),!Vy(t))throw new x(900,!1);return this.check(t)?this:null}onDestroy(){}check(t){this._reset();let e=this._itHead,i=!1,r,o,s;if(Array.isArray(t)){this.length=t.length;for(let a=0;a<this.length;a++)o=t[a],s=this._trackByFn(a,o),e===null||!Object.is(e.trackById,s)?(e=this._mismatch(e,o,s,a),i=!0):(i&&(e=this._verifyReinsertion(e,o,s,a)),Object.is(e.item,o)||this._addIdentityChange(e,o)),e=e._next}else r=0,_w(t,a=>{s=this._trackByFn(r,a),e===null||!Object.is(e.trackById,s)?(e=this._mismatch(e,a,s,r),i=!0):(i&&(e=this._verifyReinsertion(e,a,s,r)),Object.is(e.item,a)||this._addIdentityChange(e,a)),e=e._next,r++}),this.length=r;return this._truncate(e),this.collection=t,this.isDirty}get isDirty(){return this._additionsHead!==null||this._movesHead!==null||this._removalsHead!==null||this._identityChangesHead!==null}_reset(){if(this.isDirty){let t;for(t=this._previousItHead=this._itHead;t!==null;t=t._next)t._nextPrevious=t._next;for(t=this._additionsHead;t!==null;t=t._nextAdded)t.previousIndex=t.currentIndex;for(this._additionsHead=this._additionsTail=null,t=this._movesHead;t!==null;t=t._nextMoved)t.previousIndex=t.currentIndex;this._movesHead=this._movesTail=null,this._removalsHead=this._removalsTail=null,this._identityChangesHead=this._identityChangesTail=null}}_mismatch(t,e,i,r){let o;return t===null?o=this._itTail:(o=t._prev,this._remove(t)),t=this._unlinkedRecords===null?null:this._unlinkedRecords.get(i,null),t!==null?(Object.is(t.item,e)||this._addIdentityChange(t,e),this._reinsertAfter(t,o,r)):(t=this._linkedRecords===null?null:this._linkedRecords.get(i,r),t!==null?(Object.is(t.item,e)||this._addIdentityChange(t,e),this._moveAfter(t,o,r)):t=this._addAfter(new ov(e,i),o,r)),t}_verifyReinsertion(t,e,i,r){let o=this._unlinkedRecords===null?null:this._unlinkedRecords.get(i,null);return o!==null?t=this._reinsertAfter(o,t._prev,r):t.currentIndex!=r&&(t.currentIndex=r,this._addToMoves(t,r)),t}_truncate(t){for(;t!==null;){let e=t._next;this._addToRemovals(this._unlink(t)),t=e}this._unlinkedRecords!==null&&this._unlinkedRecords.clear(),this._additionsTail!==null&&(this._additionsTail._nextAdded=null),this._movesTail!==null&&(this._movesTail._nextMoved=null),this._itTail!==null&&(this._itTail._next=null),this._removalsTail!==null&&(this._removalsTail._nextRemoved=null),this._identityChangesTail!==null&&(this._identityChangesTail._nextIdentityChange=null)}_reinsertAfter(t,e,i){this._unlinkedRecords!==null&&this._unlinkedRecords.remove(t);let r=t._prevRemoved,o=t._nextRemoved;return r===null?this._removalsHead=o:r._nextRemoved=o,o===null?this._removalsTail=r:o._prevRemoved=r,this._insertAfter(t,e,i),this._addToMoves(t,i),t}_moveAfter(t,e,i){return this._unlink(t),this._insertAfter(t,e,i),this._addToMoves(t,i),t}_addAfter(t,e,i){return this._insertAfter(t,e,i),this._additionsTail===null?this._additionsTail=this._additionsHead=t:this._additionsTail=this._additionsTail._nextAdded=t,t}_insertAfter(t,e,i){let r=e===null?this._itHead:e._next;return t._next=r,t._prev=e,r===null?this._itTail=t:r._prev=t,e===null?this._itHead=t:e._next=t,this._linkedRecords===null&&(this._linkedRecords=new Ef),this._linkedRecords.put(t),t.currentIndex=i,t}_remove(t){return this._addToRemovals(this._unlink(t))}_unlink(t){this._linkedRecords!==null&&this._linkedRecords.remove(t);let e=t._prev,i=t._next;return e===null?this._itHead=i:e._next=i,i===null?this._itTail=e:i._prev=e,t}_addToMoves(t,e){return t.previousIndex===e||(this._movesTail===null?this._movesTail=this._movesHead=t:this._movesTail=this._movesTail._nextMoved=t),t}_addToRemovals(t){return this._unlinkedRecords===null&&(this._unlinkedRecords=new Ef),this._unlinkedRecords.put(t),t.currentIndex=null,t._nextRemoved=null,this._removalsTail===null?(this._removalsTail=this._removalsHead=t,t._prevRemoved=null):(t._prevRemoved=this._removalsTail,this._removalsTail=this._removalsTail._nextRemoved=t),t}_addIdentityChange(t,e){return t.item=e,this._identityChangesTail===null?this._identityChangesTail=this._identityChangesHead=t:this._identityChangesTail=this._identityChangesTail._nextIdentityChange=t,t}},ov=class{item;trackById;currentIndex=null;previousIndex=null;_nextPrevious=null;_prev=null;_next=null;_prevDup=null;_nextDup=null;_prevRemoved=null;_nextRemoved=null;_nextAdded=null;_nextMoved=null;_nextIdentityChange=null;constructor(t,e){this.item=t,this.trackById=e}},sv=class{_head=null;_tail=null;add(t){this._head===null?(this._head=this._tail=t,t._nextDup=null,t._prevDup=null):(this._tail._nextDup=t,t._prevDup=this._tail,t._nextDup=null,this._tail=t)}get(t,e){let i;for(i=this._head;i!==null;i=i._nextDup)if((e===null||e<=i.currentIndex)&&Object.is(i.trackById,t))return i;return null}remove(t){let e=t._prevDup,i=t._nextDup;return e===null?this._head=i:e._nextDup=i,i===null?this._tail=e:i._prevDup=e,this._head===null}},Ef=class{map=new Map;put(t){let e=t.trackById,i=this.map.get(e);i||(i=new sv,this.map.set(e,i)),i.add(t)}get(t,e){let i=t,r=this.map.get(i);return r?r.get(t,e):null}remove(t){let e=t.trackById;return this.map.get(e).remove(t)&&this.map.delete(e),t}get isEmpty(){return this.map.size===0}clear(){this.map.clear()}};function oS(n,t,e){let i=n.previousIndex;if(i===null)return i;let r=0;return e&&i<e.length&&(r=e[i]),i+t+r}function sS(){return new wf([new iv])}var wf=(()=>{class n{factories;static \u0275prov=D({token:n,providedIn:"root",factory:sS});constructor(e){this.factories=e}static create(e,i){if(i!=null){let r=i.factories.slice();e=e.concat(r)}return new n(e)}static extend(e){return{provide:n,useFactory:()=>{let i=f(n,{optional:!0,skipSelf:!0});return n.create(e,i||sS())}}}find(e){let i=this.factories.find(r=>r.supports(e));if(i!=null)return i;throw new x(901,!1)}}return n})();function fS(n){let{rootComponent:t,appProviders:e,platformProviders:i,platformRef:r}=n;Ne(xe.BootstrapApplicationStart);try{let o=r?.injector??jN(i),s=[Jy(),l0,...e||[]],a=new Ul({providers:s,parent:o,debugName:"",runEnvironmentInitializers:!1});return FN({r3Injector:a.injector,platformInjector:o,rootComponent:t})}catch(o){return Promise.reject(o)}finally{Ne(xe.BootstrapApplicationEnd)}}function de(n){return typeof n=="boolean"?n:n!=null&&n!=="false"}function es(n,t=NaN){return!isNaN(parseFloat(n))&&!isNaN(Number(n))?Number(n):t}var tv=Symbol("NOT_SET"),pS=new Set,GN=$(b({},rl),{kind:"afterRenderEffectPhase",consumerIsAlwaysLive:!0,consumerAllowSignalWrites:!0,value:tv,cleanup:null,consumerMarkedDirty(){if(this.sequence.impl.executing){if(this.sequence.lastPhase===null||this.sequence.lastPhase<this.phase)return;this.sequence.erroredOrDestroyed=!0}this.sequence.scheduler.notify(7)},phaseFn(n){if(this.sequence.lastPhase=this.phase,!this.dirty)return this.signal;if(this.dirty=!1,this.value!==tv&&!As(this))return this.signal;try{for(let r of this.cleanup??pS)r()}finally{this.cleanup?.clear()}let t=[];n!==void 0&&t.push(n),t.push(this.registerCleanupFn);let e=Xi(this),i;try{i=this.userFn.apply(null,t)}finally{Nr(this,e)}return(this.value===tv||!this.equal(this.value,i))&&(this.value=i,this.version++),this.signal}}),av=class extends Vl{scheduler;lastPhase=null;nodes=[void 0,void 0,void 0,void 0];onDestroyFns=null;constructor(t,e,i,r,o,s=null){super(t,[void 0,void 0,void 0,void 0],i,!1,o.get(at),s),this.scheduler=r;for(let a of ky){let l=e[a];if(l===void 0)continue;let c=Object.create(GN);c.sequence=this,c.phase=a,c.userFn=l,c.dirty=!0,c.signal=()=>(Pr(c),c.value),c.signal[ct]=c,c.registerCleanupFn=d=>(c.cleanup??=new Set).add(d),this.nodes[a]=c,this.hooks[a]=d=>c.phaseFn(d)}}afterRun(){super.afterRun(),this.lastPhase=null}destroy(){if(this.onDestroyFns!==null)for(let t of this.onDestroyFns)t();super.destroy();for(let t of this.nodes)if(t)try{for(let e of t.cleanup??pS)e()}finally{Fr(t)}}};function hS(n,t){let e=t?.injector??f(le),i=e.get(ir),r=e.get(rf),o=e.get(gr,null,{optional:!0});r.impl??=e.get(Ay);let s=n;typeof s=="function"&&(s={mixedReadWrite:n});let a=e.get(Zs,null,{optional:!0}),l=new av(r.impl,[s.earlyRead,s.write,s.mixedReadWrite,s.read],a?.view,i,e,o?.snapshot(null));return r.impl.register(l),l}function Sf(n,t){let e=sr(n),i=t.elementInjector||Ws();return new qo(e).create(i,t.projectableNodes,t.hostElement,t.environmentInjector,t.directives,t.bindings)}var mS=null;function _r(){return mS}function lv(n){mS??=n}var tc=class{},ts=(()=>{class n{historyGo(e){throw new Error("")}static \u0275fac=function(i){return new(i||n)};static \u0275prov=D({token:n,factory:()=>f(gS),providedIn:"platform"})}return n})();var gS=(()=>{class n extends ts{_location;_history;_doc=f(he);constructor(){super(),this._location=window.location,this._history=window.history}getBaseHrefFromDOM(){return _r().getBaseHref(this._doc)}onPopState(e){let i=_r().getGlobalEventTarget(this._doc,"window");return i.addEventListener("popstate",e,!1),()=>i.removeEventListener("popstate",e)}onHashChange(e){let i=_r().getGlobalEventTarget(this._doc,"window");return i.addEventListener("hashchange",e,!1),()=>i.removeEventListener("hashchange",e)}get href(){return this._location.href}get protocol(){return this._location.protocol}get hostname(){return this._location.hostname}get port(){return this._location.port}get pathname(){return this._location.pathname}get search(){return this._location.search}get hash(){return this._location.hash}set pathname(e){this._location.pathname=e}pushState(e,i,r){this._history.pushState(e,i,r)}replaceState(e,i,r){this._history.replaceState(e,i,r)}forward(){this._history.forward()}back(){this._history.back()}historyGo(e=0){this._history.go(e)}getState(){return this._history.state}static \u0275fac=function(i){return new(i||n)};static \u0275prov=D({token:n,factory:()=>new n,providedIn:"platform"})}return n})();function xf(n,t){return n?t?n.endsWith("/")?t.startsWith("/")?n+t.slice(1):n+t:t.startsWith("/")?n+t:`${n}/${t}`:n:t}function yS(n){let t=n.search(/#|\?|$/);return n[t-1]==="/"?n.slice(0,t-1)+n.slice(t):n}function Di(n){return n&&n[0]!=="?"?`?${n}`:n}var Ui=(()=>{class n{historyGo(e){throw new Error("")}static \u0275fac=function(i){return new(i||n)};static \u0275prov=D({token:n,factory:()=>f(_S),providedIn:"root"})}return n})(),cv=new C(""),_S=(()=>{class n extends Ui{_platformLocation;_baseHref;_removeListenerFns=[];constructor(e,i){super(),this._platformLocation=e,this._baseHref=i??this._platformLocation.getBaseHrefFromDOM()??f(he).location?.origin??""}ngOnDestroy(){for(;this._removeListenerFns.length;)this._removeListenerFns.pop()()}onPopState(e){this._removeListenerFns.push(this._platformLocation.onPopState(e),this._platformLocation.onHashChange(e))}getBaseHref(){return this._baseHref}prepareExternalUrl(e){return xf(this._baseHref,e)}path(e=!1){let i=this._platformLocation.pathname+Di(this._platformLocation.search),r=this._platformLocation.hash;return r&&e?`${i}${r}`:i}pushState(e,i,r,o){let s=this.prepareExternalUrl(r+Di(o));this._platformLocation.pushState(e,i,s)}replaceState(e,i,r,o){let s=this.prepareExternalUrl(r+Di(o));this._platformLocation.replaceState(e,i,s)}forward(){this._platformLocation.forward()}back(){this._platformLocation.back()}getState(){return this._platformLocation.getState()}historyGo(e=0){this._platformLocation.historyGo?.(e)}static \u0275fac=function(i){return new(i||n)(se(ts),se(cv,8))};static \u0275prov=D({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})();var br=(()=>{class n{_subject=new E;_basePath;_locationStrategy;_urlChangeListeners=[];_urlChangeSubscription=null;constructor(e){this._locationStrategy=e;let i=this._locationStrategy.getBaseHref();this._basePath=YN(yS(vS(i))),this._locationStrategy.onPopState(r=>{this._subject.next({url:this.path(!0),pop:!0,state:r.state,type:r.type})})}ngOnDestroy(){this._urlChangeSubscription?.unsubscribe(),this._urlChangeListeners=[]}path(e=!1){return this.normalize(this._locationStrategy.path(e))}getState(){return this._locationStrategy.getState()}isCurrentPathEqualTo(e,i=""){return this.path()==this.normalize(e+Di(i))}normalize(e){return n.stripTrailingSlash(KN(this._basePath,vS(e)))}prepareExternalUrl(e){return e&&e[0]!=="/"&&(e="/"+e),this._locationStrategy.prepareExternalUrl(e)}go(e,i="",r=null){this._locationStrategy.pushState(r,"",e,i),this._notifyUrlChangeListeners(this.prepareExternalUrl(e+Di(i)),r)}replaceState(e,i="",r=null){this._locationStrategy.replaceState(r,"",e,i),this._notifyUrlChangeListeners(this.prepareExternalUrl(e+Di(i)),r)}forward(){this._locationStrategy.forward()}back(){this._locationStrategy.back()}historyGo(e=0){this._locationStrategy.historyGo?.(e)}onUrlChange(e){return this._urlChangeListeners.push(e),this._urlChangeSubscription??=this.subscribe(i=>{this._notifyUrlChangeListeners(i.url,i.state)}),()=>{let i=this._urlChangeListeners.indexOf(e);this._urlChangeListeners.splice(i,1),this._urlChangeListeners.length===0&&(this._urlChangeSubscription?.unsubscribe(),this._urlChangeSubscription=null)}}_notifyUrlChangeListeners(e="",i){this._urlChangeListeners.forEach(r=>r(e,i))}subscribe(e,i,r){return this._subject.subscribe({next:e,error:i??void 0,complete:r??void 0})}static normalizeQueryParams=Di;static joinWithSlash=xf;static stripTrailingSlash=yS;static \u0275fac=function(i){return new(i||n)(se(Ui))};static \u0275prov=D({token:n,factory:()=>qN(),providedIn:"root"})}return n})();function qN(){return new br(se(Ui))}function KN(n,t){if(!n||!t.startsWith(n))return t;let e=t.substring(n.length);return e===""||["/",";","?","#"].includes(e[0])?e:t}function vS(n){return n.replace(/\/index.html$/,"")}function YN(n){if(new RegExp("^(https?:)?//").test(n)){let[,e]=n.split(/\/\/[^\/]+/);return e}return n}var mv=(()=>{class n extends Ui{_platformLocation;_baseHref="";_removeListenerFns=[];constructor(e,i){super(),this._platformLocation=e,i!=null&&(this._baseHref=i)}ngOnDestroy(){for(;this._removeListenerFns.length;)this._removeListenerFns.pop()()}onPopState(e){this._removeListenerFns.push(this._platformLocation.onPopState(e),this._platformLocation.onHashChange(e))}getBaseHref(){return this._baseHref}path(e=!1){let i=this._platformLocation.hash??"#";return i.length>0?i.substring(1):i}prepareExternalUrl(e){let i=xf(this._baseHref,e);return i.length>0?"#"+i:i}pushState(e,i,r,o){let s=this.prepareExternalUrl(r+Di(o))||this._platformLocation.pathname;this._platformLocation.pushState(e,i,s)}replaceState(e,i,r,o){let s=this.prepareExternalUrl(r+Di(o))||this._platformLocation.pathname;this._platformLocation.replaceState(e,i,s)}forward(){this._platformLocation.forward()}back(){this._platformLocation.back()}getState(){return this._platformLocation.getState()}historyGo(e=0){this._platformLocation.historyGo?.(e)}static \u0275fac=function(i){return new(i||n)(se(ts),se(cv,8))};static \u0275prov=D({token:n,factory:n.\u0275fac})}return n})();var gv=(function(n){return n[n.Decimal=0]="Decimal",n[n.Percent=1]="Percent",n[n.Currency=2]="Currency",n[n.Scientific=3]="Scientific",n})(gv||{});var qt=(function(n){return n[n.Format=0]="Format",n[n.Standalone=1]="Standalone",n})(qt||{}),Ue=(function(n){return n[n.Narrow=0]="Narrow",n[n.Abbreviated=1]="Abbreviated",n[n.Wide=2]="Wide",n[n.Short=3]="Short",n})(Ue||{}),vn=(function(n){return n[n.Short=0]="Short",n[n.Medium=1]="Medium",n[n.Long=2]="Long",n[n.Full=3]="Full",n})(vn||{}),_n={Decimal:0,Group:1,List:2,PercentSign:3,PlusSign:4,MinusSign:5,Exponential:6,SuperscriptingExponent:7,PerMille:8,Infinity:9,NaN:10,TimeSeparator:11,CurrencyDecimal:12,CurrencyGroup:13};function DS(n){return yn(n)[lt.LocaleId]}function ES(n,t,e){let i=yn(n),r=[i[lt.DayPeriodsFormat],i[lt.DayPeriodsStandalone]],o=Xn(r,t);return Xn(o,e)}function wS(n,t,e){let i=yn(n),r=[i[lt.DaysFormat],i[lt.DaysStandalone]],o=Xn(r,t);return Xn(o,e)}function SS(n,t,e){let i=yn(n),r=[i[lt.MonthsFormat],i[lt.MonthsStandalone]],o=Xn(r,t);return Xn(o,e)}function xS(n,t){let i=yn(n)[lt.Eras];return Xn(i,t)}function nc(n,t){let e=yn(n);return Xn(e[lt.DateFormat],t)}function ic(n,t){let e=yn(n);return Xn(e[lt.TimeFormat],t)}function rc(n,t){let i=yn(n)[lt.DateTimeFormat];return Xn(i,t)}function Hi(n,t){let e=yn(n),i=e[lt.NumberSymbols][t];if(typeof i>"u"){if(t===_n.CurrencyDecimal)return e[lt.NumberSymbols][_n.Decimal];if(t===_n.CurrencyGroup)return e[lt.NumberSymbols][_n.Group]}return i}function TS(n,t){return yn(n)[lt.NumberFormats][t]}function MS(n){if(!n[lt.ExtraData])throw new x(2303,!1)}function IS(n){let t=yn(n);return MS(t),(t[lt.ExtraData][2]||[]).map(i=>typeof i=="string"?dv(i):[dv(i[0]),dv(i[1])])}function kS(n,t,e){let i=yn(n);MS(i);let r=[i[lt.ExtraData][0],i[lt.ExtraData][1]],o=Xn(r,t)||[];return Xn(o,e)||[]}function Xn(n,t){for(let e=t;e>-1;e--)if(typeof n[e]<"u")return n[e];throw new x(2304,!1)}function dv(n){let[t,e]=n.split(":");return{hours:+t,minutes:+e}}var ZN=/^(\d{4,})-?(\d\d)-?(\d\d)(?:T(\d\d)(?::?(\d\d)(?::?(\d\d)(?:\.(\d+))?)?)?(Z|([+-])(\d\d):?(\d\d))?)?$/,Tf={},XN=/((?:[^BEGHLMOSWYZabcdhmswyz']+)|(?:'(?:[^']|'')*')|(?:G{1,5}|y{1,4}|Y{1,4}|M{1,5}|L{1,5}|w{1,2}|W{1}|d{1,2}|E{1,6}|c{1,6}|a{1,5}|b{1,5}|B{1,5}|h{1,2}|H{1,2}|m{1,2}|s{1,2}|S{1,3}|z{1,4}|Z{1,5}|O{1,4}))([\s\S]*)/;function AS(n,t,e,i){let r=s1(n);t=Cr(e,t)||t;let s=[],a;for(;t;)if(a=XN.exec(t),a){s=s.concat(a.slice(1));let d=s.pop();if(!d)break;t=d}else{s.push(t);break}let l=r.getTimezoneOffset();i&&(l=RS(i,l),r=o1(r,i));let c="";return s.forEach(d=>{let u=i1(d);c+=u?u(r,e,l):d==="''"?"'":d.replace(/(^'|'$)/g,"").replace(/''/g,"'")}),c}function Of(n,t,e){let i=new Date(0);return i.setFullYear(n,t,e),i.setHours(0,0,0),i}function Cr(n,t){let e=DS(n);if(Tf[e]??={},Tf[e][t])return Tf[e][t];let i="";switch(t){case"shortDate":i=nc(n,vn.Short);break;case"mediumDate":i=nc(n,vn.Medium);break;case"longDate":i=nc(n,vn.Long);break;case"fullDate":i=nc(n,vn.Full);break;case"shortTime":i=ic(n,vn.Short);break;case"mediumTime":i=ic(n,vn.Medium);break;case"longTime":i=ic(n,vn.Long);break;case"fullTime":i=ic(n,vn.Full);break;case"short":let r=Cr(n,"shortTime"),o=Cr(n,"shortDate");i=Mf(rc(n,vn.Short),[r,o]);break;case"medium":let s=Cr(n,"mediumTime"),a=Cr(n,"mediumDate");i=Mf(rc(n,vn.Medium),[s,a]);break;case"long":let l=Cr(n,"longTime"),c=Cr(n,"longDate");i=Mf(rc(n,vn.Long),[l,c]);break;case"full":let d=Cr(n,"fullTime"),u=Cr(n,"fullDate");i=Mf(rc(n,vn.Full),[d,u]);break}return i&&(Tf[e][t]=i),i}function Mf(n,t){return t&&(n=n.replace(/\{([^}]+)}/g,function(e,i){return t!=null&&i in t?t[i]:e})),n}function Ei(n,t,e="-",i,r){let o="";(n<0||r&&n<=0)&&(r?n=-n+1:(n=-n,o=e));let s=String(n);for(;s.length<t;)s="0"+s;return i&&(s=s.slice(s.length-t)),o+s}function QN(n,t){return Ei(n,3).substring(0,t)}function Dt(n,t,e=0,i=!1,r=!1){return function(o,s){let a=JN(n,o);if((e>0||a>-e)&&(a+=e),n===3)a===0&&e===-12&&(a=12);else if(n===6)return QN(a,t);let l=Hi(s,_n.MinusSign);return Ei(a,t,l,i,r)}}function JN(n,t){switch(n){case 0:return t.getFullYear();case 1:return t.getMonth();case 2:return t.getDate();case 3:return t.getHours();case 4:return t.getMinutes();case 5:return t.getSeconds();case 6:return t.getMilliseconds();case 7:return t.getDay();default:throw new x(2301,!1)}}function qe(n,t,e=qt.Format,i=!1){return function(r,o){return e1(r,o,n,t,e,i)}}function e1(n,t,e,i,r,o){switch(e){case 2:return SS(t,r,i)[n.getMonth()];case 1:return wS(t,r,i)[n.getDay()];case 0:let s=n.getHours(),a=n.getMinutes();if(o){let c=IS(t),d=kS(t,r,i),u=c.findIndex(p=>{if(Array.isArray(p)){let[g,_]=p,S=s>=g.hours&&a>=g.minutes,O=s<_.hours||s===_.hours&&a<_.minutes;if(g.hours<_.hours){if(S&&O)return!0}else if(S||O)return!0}else if(p.hours===s&&p.minutes===a)return!0;return!1});if(u!==-1)return d[u]}return ES(t,r,i)[s<12?0:1];case 3:return xS(t,i)[n.getFullYear()<=0?0:1];default:let l=e;throw new x(2302,!1)}}function If(n){return function(t,e,i){let r=-1*i,o=Hi(e,_n.MinusSign),s=r>0?Math.floor(r/60):Math.ceil(r/60);switch(n){case 0:return(r>=0?"+":"")+Ei(s,2,o)+Ei(Math.abs(r%60),2,o);case 1:return"GMT"+(r>=0?"+":"")+Ei(s,1,o);case 2:return"GMT"+(r>=0?"+":"")+Ei(s,2,o)+":"+Ei(Math.abs(r%60),2,o);case 3:return i===0?"Z":(r>=0?"+":"")+Ei(s,2,o)+":"+Ei(Math.abs(r%60),2,o);default:throw new x(2310,!1)}}}var t1=0,Af=4;function n1(n){let t=Of(n,t1,1).getDay();return Of(n,0,1+(t<=Af?Af:Af+7)-t)}function OS(n){let t=n.getDay(),e=t===0?-3:Af-t;return Of(n.getFullYear(),n.getMonth(),n.getDate()+e)}function uv(n,t=!1){return function(e,i){let r;if(t){let o=new Date(e.getFullYear(),e.getMonth(),1).getDay()-1,s=e.getDate();r=1+Math.floor((s+o)/7)}else{let o=OS(e),s=n1(o.getFullYear()),a=o.getTime()-s.getTime();r=1+Math.round(a/6048e5)}return Ei(r,n,Hi(i,_n.MinusSign))}}function kf(n,t=!1){return function(e,i){let o=OS(e).getFullYear();return Ei(o,n,Hi(i,_n.MinusSign),t)}}var fv={};function i1(n){if(fv[n])return fv[n];let t;switch(n){case"G":case"GG":case"GGG":t=qe(3,Ue.Abbreviated);break;case"GGGG":t=qe(3,Ue.Wide);break;case"GGGGG":t=qe(3,Ue.Narrow);break;case"y":t=Dt(0,1,0,!1,!0);break;case"yy":t=Dt(0,2,0,!0,!0);break;case"yyy":t=Dt(0,3,0,!1,!0);break;case"yyyy":t=Dt(0,4,0,!1,!0);break;case"Y":t=kf(1);break;case"YY":t=kf(2,!0);break;case"YYY":t=kf(3);break;case"YYYY":t=kf(4);break;case"M":case"L":t=Dt(1,1,1);break;case"MM":case"LL":t=Dt(1,2,1);break;case"MMM":t=qe(2,Ue.Abbreviated);break;case"MMMM":t=qe(2,Ue.Wide);break;case"MMMMM":t=qe(2,Ue.Narrow);break;case"LLL":t=qe(2,Ue.Abbreviated,qt.Standalone);break;case"LLLL":t=qe(2,Ue.Wide,qt.Standalone);break;case"LLLLL":t=qe(2,Ue.Narrow,qt.Standalone);break;case"w":t=uv(1);break;case"ww":t=uv(2);break;case"W":t=uv(1,!0);break;case"d":t=Dt(2,1);break;case"dd":t=Dt(2,2);break;case"c":case"cc":t=Dt(7,1);break;case"ccc":t=qe(1,Ue.Abbreviated,qt.Standalone);break;case"cccc":t=qe(1,Ue.Wide,qt.Standalone);break;case"ccccc":t=qe(1,Ue.Narrow,qt.Standalone);break;case"cccccc":t=qe(1,Ue.Short,qt.Standalone);break;case"E":case"EE":case"EEE":t=qe(1,Ue.Abbreviated);break;case"EEEE":t=qe(1,Ue.Wide);break;case"EEEEE":t=qe(1,Ue.Narrow);break;case"EEEEEE":t=qe(1,Ue.Short);break;case"a":case"aa":case"aaa":t=qe(0,Ue.Abbreviated);break;case"aaaa":t=qe(0,Ue.Wide);break;case"aaaaa":t=qe(0,Ue.Narrow);break;case"b":case"bb":case"bbb":t=qe(0,Ue.Abbreviated,qt.Standalone,!0);break;case"bbbb":t=qe(0,Ue.Wide,qt.Standalone,!0);break;case"bbbbb":t=qe(0,Ue.Narrow,qt.Standalone,!0);break;case"B":case"BB":case"BBB":t=qe(0,Ue.Abbreviated,qt.Format,!0);break;case"BBBB":t=qe(0,Ue.Wide,qt.Format,!0);break;case"BBBBB":t=qe(0,Ue.Narrow,qt.Format,!0);break;case"h":t=Dt(3,1,-12);break;case"hh":t=Dt(3,2,-12);break;case"H":t=Dt(3,1);break;case"HH":t=Dt(3,2);break;case"m":t=Dt(4,1);break;case"mm":t=Dt(4,2);break;case"s":t=Dt(5,1);break;case"ss":t=Dt(5,2);break;case"S":t=Dt(6,1);break;case"SS":t=Dt(6,2);break;case"SSS":t=Dt(6,3);break;case"Z":case"ZZ":case"ZZZ":t=If(0);break;case"ZZZZZ":t=If(3);break;case"O":case"OO":case"OOO":case"z":case"zz":case"zzz":t=If(1);break;case"OOOO":case"ZZZZ":case"zzzz":t=If(2);break;default:return null}return fv[n]=t,t}function RS(n,t){n=n.replace(/:/g,"");let e=Date.parse("Jan 01, 1970 00:00:00 "+n)/6e4;return isNaN(e)?t:e}function r1(n,t){return n=new Date(n.getTime()),n.setMinutes(n.getMinutes()+t),n}function o1(n,t,e){let r=n.getTimezoneOffset(),o=RS(t,r);return r1(n,-1*(o-r))}function s1(n){if(bS(n))return n;if(typeof n=="number"&&!isNaN(n))return new Date(n);if(typeof n=="string"){if(n=n.trim(),/^(\d{4}(-\d{1,2}(-\d{1,2})?)?)$/.test(n)){let[r,o=1,s=1]=n.split("-").map(a=>+a);return Of(r,o-1,s)}let e=parseFloat(n);if(!isNaN(n-e))return new Date(e);let i;if(i=n.match(ZN))return a1(i)}let t=new Date(n);if(!bS(t))throw new x(2311,!1);return t}function a1(n){let t=new Date(0),e=0,i=0,r=n[8]?t.setUTCFullYear:t.setFullYear,o=n[8]?t.setUTCHours:t.setHours;n[9]&&(e=Number(n[9]+n[10]),i=Number(n[9]+n[11])),r.call(t,Number(n[1]),Number(n[2])-1,Number(n[3]));let s=Number(n[4]||0)-e,a=Number(n[5]||0)-i,l=Number(n[6]||0),c=Math.floor(parseFloat("0."+(n[7]||0))*1e3);return o.call(t,s,a,l,c),t}function bS(n){return n instanceof Date&&!isNaN(n.valueOf())}var l1=/^(\d+)?\.((\d+)(-(\d+))?)?$/,CS=22,Rf=".",oc="0",c1=";",d1=",",pv="#";function u1(n,t,e,i,r,o,s=!1){let a="",l=!1;if(!isFinite(n))a=Hi(e,_n.Infinity);else{let c=h1(n);s&&(c=p1(c));let d=t.minInt,u=t.minFrac,p=t.maxFrac;if(o){let Ee=o.match(l1);if(Ee===null)throw new x(2306,!1);let it=Ee[1],Ki=Ee[3],_o=Ee[5];it!=null&&(d=hv(it)),Ki!=null&&(u=hv(Ki)),_o!=null?p=hv(_o):Ki!=null&&u>p&&(p=u);let Yi=100;if(d>Yi||u>Yi||p>Yi)throw new x(2306,!1)}m1(c,u,p);let g=c.digits,_=c.integerLen,S=c.exponent,O=[];for(l=g.every(Ee=>!Ee);_<d;_++)g.unshift(0);for(;_<0;_++)g.unshift(0);_>0?O=g.splice(_,g.length):(O=g,g=[0]);let V=[];for(g.length>=t.lgSize&&V.unshift(g.splice(-t.lgSize,g.length).join(""));g.length>t.gSize;)V.unshift(g.splice(-t.gSize,g.length).join(""));g.length&&V.unshift(g.join("")),a=V.join(Hi(e,i)),O.length&&(a+=Hi(e,r)+O.join("")),S&&(a+=Hi(e,_n.Exponential)+"+"+S)}return n<0&&!l?a=t.negPre+a+t.negSuf:a=t.posPre+a+t.posSuf,a}function PS(n,t,e){let i=TS(t,gv.Decimal),r=f1(i,Hi(t,_n.MinusSign));return u1(n,r,t,_n.Group,_n.Decimal,e)}function f1(n,t="-"){let e={minInt:1,minFrac:0,maxFrac:0,posPre:"",posSuf:"",negPre:"",negSuf:"",gSize:0,lgSize:0},i=n.split(c1),r=i[0],o=i[1],s=r.indexOf(Rf)!==-1?r.split(Rf):[r.substring(0,r.lastIndexOf(oc)+1),r.substring(r.lastIndexOf(oc)+1)],a=s[0],l=s[1]||"";e.posPre=a.substring(0,a.indexOf(pv));for(let d=0;d<l.length;d++){let u=l.charAt(d);u===oc?e.minFrac=e.maxFrac=d+1:u===pv?e.maxFrac=d+1:e.posSuf+=u}let c=a.split(d1);if(e.gSize=c[1]?c[1].length:0,e.lgSize=c[2]||c[1]?(c[2]||c[1]).length:0,o){let d=r.length-e.posPre.length-e.posSuf.length,u=o.indexOf(pv);e.negPre=o.substring(0,u).replace(/'/g,""),e.negSuf=o.slice(u+d).replace(/'/g,"")}else e.negPre=t+e.posPre,e.negSuf=e.posSuf;return e}function p1(n){if(n.digits[0]===0)return n;let t=n.digits.length-n.integerLen;return n.exponent?n.exponent+=2:(t===0?n.digits.push(0,0):t===1&&n.digits.push(0),n.integerLen+=2),n}function h1(n){let t=Math.abs(n)+"",e=0,i,r,o,s,a;for((r=t.indexOf(Rf))>-1&&(t=t.replace(Rf,"")),(o=t.search(/e/i))>0?(r<0&&(r=o),r+=+t.slice(o+1),t=t.substring(0,o)):r<0&&(r=t.length),o=0;t.charAt(o)===oc;o++);if(o===(a=t.length))i=[0],r=1;else{for(a--;t.charAt(a)===oc;)a--;for(r-=o,i=[],s=0;o<=a;o++,s++)i[s]=Number(t.charAt(o))}return r>CS&&(i=i.splice(0,CS-1),e=r-1,r=1),{digits:i,exponent:e,integerLen:r}}function m1(n,t,e){if(t>e)throw new x(2307,!1);let i=n.digits,r=i.length-n.integerLen,o=Math.min(Math.max(t,r),e),s=o+n.integerLen,a=i[s];if(s>0){i.splice(Math.max(n.integerLen,s));for(let u=s;u<i.length;u++)i[u]=0}else{r=Math.max(0,r),n.integerLen=1,i.length=Math.max(1,s=o+1),i[0]=0;for(let u=1;u<s;u++)i[u]=0}if(a>=5)if(s-1<0){for(let u=0;u>s;u--)i.unshift(0),n.integerLen++;i.unshift(1),n.integerLen++}else i[s-1]++;for(;r<Math.max(0,o);r++)i.push(0);let l=o!==0,c=t+n.integerLen,d=i.reduceRight(function(u,p,g,_){return p=p+u,_[g]=p<10?p:p-10,l&&(_[g]===0&&g>=c?_.pop():l=!1),p>=10?1:0},0);d&&(i.unshift(d),n.integerLen++)}function hv(n){let t=parseInt(n);if(isNaN(t))throw new x(2305,!1);return t}var yv=(()=>{class n{_viewContainerRef;_viewRef=null;ngTemplateOutletContext=null;ngTemplateOutlet=null;ngTemplateOutletInjector=null;injector=f(le);constructor(e){this._viewContainerRef=e}ngOnChanges(e){if(this._shouldRecreateView(e)){let i=this._viewContainerRef;if(this._viewRef&&i.remove(i.indexOf(this._viewRef)),!this.ngTemplateOutlet){this._viewRef=null;return}let r=this._createContextForwardProxy();this._viewRef=i.createEmbeddedView(this.ngTemplateOutlet,r,{injector:this._getInjector()})}}_getInjector(){return this.ngTemplateOutletInjector==="outlet"?this.injector:this.ngTemplateOutletInjector??void 0}_shouldRecreateView(e){return!!e.ngTemplateOutlet||!!e.ngTemplateOutletInjector}_createContextForwardProxy(){return new Proxy({},{set:(e,i,r)=>this.ngTemplateOutletContext?Reflect.set(this.ngTemplateOutletContext,i,r):!1,get:(e,i,r)=>{if(this.ngTemplateOutletContext)return Reflect.get(this.ngTemplateOutletContext,i,r)}})}static \u0275fac=function(i){return new(i||n)(et(pt))};static \u0275dir=ie({type:n,selectors:[["","ngTemplateOutlet",""]],inputs:{ngTemplateOutletContext:"ngTemplateOutletContext",ngTemplateOutlet:"ngTemplateOutlet",ngTemplateOutletInjector:"ngTemplateOutletInjector"},features:[It]})}return n})();function vv(n,t){return new x(2100,!1)}var _v=(()=>{class n{transform(e){return e==null?null:(g1(n,e),e.toUpperCase())}static \u0275fac=function(i){return new(i||n)};static \u0275pipe=aa({name:"uppercase",type:n,pure:!0})}return n})();function g1(n,t){if(typeof t!="string")throw vv(n,t)}var y1="mediumDate",NS=new C(""),FS=new C(""),bv=(()=>{class n{locale;defaultTimezone;defaultOptions;constructor(e,i,r){this.locale=e,this.defaultTimezone=i,this.defaultOptions=r}transform(e,i,r,o){if(e==null||e===""||e!==e)return null;try{let s=i??this.defaultOptions?.dateFormat??y1,a=r??this.defaultOptions?.timezone??this.defaultTimezone??void 0;return AS(e,s,o||this.locale,a)}catch(s){throw vv(n,s.message)}}static \u0275fac=function(i){return new(i||n)(et(ua,16),et(NS,24),et(FS,24))};static \u0275pipe=aa({name:"date",type:n,pure:!0})}return n})();var Cv=(()=>{class n{transform(e){return JSON.stringify(e,null,2)}static \u0275fac=function(i){return new(i||n)};static \u0275pipe=aa({name:"json",type:n,pure:!1})}return n})();var Dv=(()=>{class n{_locale;constructor(e){this._locale=e}transform(e,i,r){if(!v1(e))return null;r||=this._locale;try{let o=_1(e);return PS(o,r,i)}catch(o){throw vv(n,o.message)}}static \u0275fac=function(i){return new(i||n)(et(ua,16))};static \u0275pipe=aa({name:"number",type:n,pure:!0})}return n})();function v1(n){return!(n==null||n===""||n!==n)}function _1(n){if(typeof n=="string"&&!isNaN(Number(n)-parseFloat(n)))return Number(n);if(typeof n!="number")throw new x(2309,!1);return n}var fa=(()=>{class n{static \u0275fac=function(i){return new(i||n)};static \u0275mod=De({type:n});static \u0275inj=be({})}return n})();function Ev(n,t){t=encodeURIComponent(t);for(let e of n.split(";")){let i=e.indexOf("="),[r,o]=i==-1?[e,""]:[e.slice(0,i),e.slice(i+1)];if(r.trim()===t)return decodeURIComponent(o)}return null}var sc=class{};var wv="browser";function LS(n){return n===wv}var ac=class{_doc;constructor(t){this._doc=t}manager},Pf=(()=>{class n extends ac{constructor(e){super(e)}supports(e){return!0}addEventListener(e,i,r,o){return e.addEventListener(i,r,o),()=>this.removeEventListener(e,i,r,o)}removeEventListener(e,i,r,o){return e.removeEventListener(i,r,o)}static \u0275fac=function(i){return new(i||n)(se(he))};static \u0275prov=D({token:n,factory:n.\u0275fac})}return n})(),Lf=new C(""),Iv=(()=>{class n{_zone;_plugins;_eventNameToPlugin=new Map;constructor(e,i){this._zone=i,e.forEach(s=>{s.manager=this});let r=e.filter(s=>!(s instanceof Pf));this._plugins=r.slice().reverse();let o=e.find(s=>s instanceof Pf);o&&this._plugins.push(o)}addEventListener(e,i,r,o){return this._findPluginFor(i).addEventListener(e,i,r,o)}getZone(){return this._zone}_findPluginFor(e){let i=this._eventNameToPlugin.get(e);if(i)return i;if(i=this._plugins.find(o=>o.supports(e)),!i)throw new x(5101,!1);return this._eventNameToPlugin.set(e,i),i}static \u0275fac=function(i){return new(i||n)(se(Lf),se(U))};static \u0275prov=D({token:n,factory:n.\u0275fac})}return n})(),xv="ng-app-id";function VS(n){for(let t of n)t.remove()}function BS(n,t){let e=t.createElement("style");return e.textContent=n,e}function D1(n,t,e,i){let r=n.head?.querySelectorAll(`style[${xv}="${t}"],link[${xv}="${t}"]`);if(r)for(let o of r)o.removeAttribute(xv),o instanceof HTMLLinkElement?i.set(o.href.slice(o.href.lastIndexOf("/")+1),{usage:0,elements:[o]}):o.textContent&&e.set(o.textContent,{usage:0,elements:[o]})}function Mv(n,t){let e=t.createElement("link");return e.setAttribute("rel","stylesheet"),e.setAttribute("href",n),e}var kv=(()=>{class n{doc;appId;nonce;inline=new Map;external=new Map;hosts=new Set;constructor(e,i,r,o={}){this.doc=e,this.appId=i,this.nonce=r,D1(e,i,this.inline,this.external),this.hosts.add(e.head)}addStyles(e,i){for(let r of e)this.addUsage(r,this.inline,BS);i?.forEach(r=>this.addUsage(r,this.external,Mv))}removeStyles(e,i){for(let r of e)this.removeUsage(r,this.inline);i?.forEach(r=>this.removeUsage(r,this.external))}addUsage(e,i,r){let o=i.get(e);o?o.usage++:i.set(e,{usage:1,elements:[...this.hosts].map(s=>this.addElement(s,r(e,this.doc)))})}removeUsage(e,i){let r=i.get(e);r&&(r.usage--,r.usage<=0&&(VS(r.elements),i.delete(e)))}ngOnDestroy(){for(let[,{elements:e}]of[...this.inline,...this.external])VS(e);this.hosts.clear()}addHost(e){this.hosts.add(e);for(let[i,{elements:r}]of this.inline)r.push(this.addElement(e,BS(i,this.doc)));for(let[i,{elements:r}]of this.external)r.push(this.addElement(e,Mv(i,this.doc)))}removeHost(e){this.hosts.delete(e)}addElement(e,i){return this.nonce&&i.setAttribute("nonce",this.nonce),e.appendChild(i)}static \u0275fac=function(i){return new(i||n)(se(he),se(Jr),se(oa,8),se(Yo))};static \u0275prov=D({token:n,factory:n.\u0275fac})}return n})(),Tv={svg:"http://www.w3.org/2000/svg",xhtml:"http://www.w3.org/1999/xhtml",xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace",xmlns:"http://www.w3.org/2000/xmlns/",math:"http://www.w3.org/1998/Math/MathML"},Av=/%COMP%/g;var US="%COMP%",E1=`_nghost-${US}`,w1=`_ngcontent-${US}`,S1=!0,x1=new C("",{factory:()=>S1});function T1(n){return w1.replace(Av,n)}function M1(n){return E1.replace(Av,n)}function HS(n,t){return t.map(e=>e.replace(Av,n))}var Ov=(()=>{class n{eventManager;sharedStylesHost;appId;removeStylesOnCompDestroy;doc;ngZone;nonce;tracingService;rendererByCompId=new Map;defaultRenderer;constructor(e,i,r,o,s,a,l=null,c=null){this.eventManager=e,this.sharedStylesHost=i,this.appId=r,this.removeStylesOnCompDestroy=o,this.doc=s,this.ngZone=a,this.nonce=l,this.tracingService=c,this.defaultRenderer=new lc(e,s,a,this.tracingService)}createRenderer(e,i){if(!e||!i)return this.defaultRenderer;let r=this.getOrCreateRenderer(e,i);return r instanceof Ff?r.applyToHost(e):r instanceof cc&&r.applyStyles(),r}getOrCreateRenderer(e,i){let r=this.rendererByCompId,o=r.get(i.id);if(!o){let s=this.doc,a=this.ngZone,l=this.eventManager,c=this.sharedStylesHost,d=this.removeStylesOnCompDestroy,u=this.tracingService;switch(i.encapsulation){case vi.Emulated:o=new Ff(l,c,i,this.appId,d,s,a,u);break;case vi.ShadowDom:return new Nf(l,e,i,s,a,this.nonce,u,c);case vi.ExperimentalIsolatedShadowDom:return new Nf(l,e,i,s,a,this.nonce,u);default:o=new cc(l,c,i,d,s,a,u);break}r.set(i.id,o)}return o}ngOnDestroy(){this.rendererByCompId.clear()}componentReplaced(e){this.rendererByCompId.delete(e)}static \u0275fac=function(i){return new(i||n)(se(Iv),se(kv),se(Jr),se(x1),se(he),se(U),se(oa),se(gr,8))};static \u0275prov=D({token:n,factory:n.\u0275fac})}return n})(),lc=class{eventManager;doc;ngZone;tracingService;data=Object.create(null);throwOnSyntheticProps=!0;constructor(t,e,i,r){this.eventManager=t,this.doc=e,this.ngZone=i,this.tracingService=r}destroy(){}destroyNode=null;createElement(t,e){return e?this.doc.createElementNS(Tv[e]||e,t):this.doc.createElement(t)}createComment(t){return this.doc.createComment(t)}createText(t){return this.doc.createTextNode(t)}appendChild(t,e){(jS(t)?t.content:t).appendChild(e)}insertBefore(t,e,i){t&&(jS(t)?t.content:t).insertBefore(e,i)}removeChild(t,e){e.remove()}selectRootElement(t,e){let i=typeof t=="string"?this.doc.querySelector(t):t;if(!i)throw new x(-5104,!1);return e||(i.textContent=""),i}parentNode(t){return t.parentNode}nextSibling(t){return t.nextSibling}setAttribute(t,e,i,r){if(r){e=r+":"+e;let o=Tv[r];o?t.setAttributeNS(o,e,i):t.setAttribute(e,i)}else t.setAttribute(e,i)}removeAttribute(t,e,i){if(i){let r=Tv[i];r?t.removeAttributeNS(r,e):t.removeAttribute(`${i}:${e}`)}else t.removeAttribute(e)}addClass(t,e){t.classList.add(e)}removeClass(t,e){t.classList.remove(e)}setStyle(t,e,i,r){r&(Bi.DashCase|Bi.Important)?t.style.setProperty(e,i,r&Bi.Important?"important":""):t.style[e]=i}removeStyle(t,e,i){i&Bi.DashCase?t.style.removeProperty(e):t.style[e]=""}setProperty(t,e,i){t!=null&&(t[e]=i)}setValue(t,e){t.nodeValue=e}listen(t,e,i,r){if(typeof t=="string"&&(t=_r().getGlobalEventTarget(this.doc,t),!t))throw new x(5102,!1);let o=this.decoratePreventDefault(i);return this.tracingService?.wrapEventListener&&(o=this.tracingService.wrapEventListener(t,e,o)),this.eventManager.addEventListener(t,e,o,r)}decoratePreventDefault(t){return e=>{if(e==="__ngUnwrap__")return t;t(e)===!1&&e.preventDefault()}}};function jS(n){return n.tagName==="TEMPLATE"&&n.content!==void 0}var Nf=class extends lc{hostEl;sharedStylesHost;shadowRoot;constructor(t,e,i,r,o,s,a,l){super(t,r,o,a),this.hostEl=e,this.sharedStylesHost=l,this.shadowRoot=e.attachShadow({mode:"open"}),this.sharedStylesHost&&this.sharedStylesHost.addHost(this.shadowRoot);let c=i.styles;c=HS(i.id,c);for(let u of c){let p=document.createElement("style");s&&p.setAttribute("nonce",s),p.textContent=u,this.shadowRoot.appendChild(p)}let d=i.getExternalStyles?.();if(d)for(let u of d){let p=Mv(u,r);s&&p.setAttribute("nonce",s),this.shadowRoot.appendChild(p)}}nodeOrShadowRoot(t){return t===this.hostEl?this.shadowRoot:t}appendChild(t,e){return super.appendChild(this.nodeOrShadowRoot(t),e)}insertBefore(t,e,i){return super.insertBefore(this.nodeOrShadowRoot(t),e,i)}removeChild(t,e){return super.removeChild(null,e)}parentNode(t){return this.nodeOrShadowRoot(super.parentNode(this.nodeOrShadowRoot(t)))}destroy(){this.sharedStylesHost&&this.sharedStylesHost.removeHost(this.shadowRoot)}},cc=class extends lc{sharedStylesHost;removeStylesOnCompDestroy;styles;styleUrls;constructor(t,e,i,r,o,s,a,l){super(t,o,s,a),this.sharedStylesHost=e,this.removeStylesOnCompDestroy=r;let c=i.styles;this.styles=l?HS(l,c):c,this.styleUrls=i.getExternalStyles?.(l)}applyStyles(){this.sharedStylesHost.addStyles(this.styles,this.styleUrls)}destroy(){this.removeStylesOnCompDestroy&&Go.size===0&&this.sharedStylesHost.removeStyles(this.styles,this.styleUrls)}},Ff=class extends cc{contentAttr;hostAttr;constructor(t,e,i,r,o,s,a,l){let c=r+"-"+i.id;super(t,e,i,o,s,a,l,c),this.contentAttr=T1(c),this.hostAttr=M1(c)}applyToHost(t){this.applyStyles(),this.setAttribute(t,this.hostAttr,"")}createElement(t,e){let i=super.createElement(t,e);return super.setAttribute(i,this.contentAttr,""),i}};var Vf=class n extends tc{supportsDOMEvents=!0;static makeCurrent(){lv(new n)}onAndCancel(t,e,i,r){return t.addEventListener(e,i,r),()=>{t.removeEventListener(e,i,r)}}dispatchEvent(t,e){t.dispatchEvent(e)}remove(t){t.remove()}createElement(t,e){return e=e||this.getDefaultDocument(),e.createElement(t)}createHtmlDocument(){return document.implementation.createHTMLDocument("fakeTitle")}getDefaultDocument(){return document}isElementNode(t){return t.nodeType===Node.ELEMENT_NODE}isShadowRoot(t){return t instanceof DocumentFragment}getGlobalEventTarget(t,e){return e==="window"?window:e==="document"?t:e==="body"?t.body:null}getBaseHref(t){let e=I1();return e==null?null:k1(e)}resetBaseElement(){dc=null}getUserAgent(){return window.navigator.userAgent}getCookie(t){return Ev(document.cookie,t)}},dc=null;function I1(){return dc=dc||document.head.querySelector("base"),dc?dc.getAttribute("href"):null}function k1(n){return new URL(n,document.baseURI).pathname}var A1=(()=>{class n{build(){return new XMLHttpRequest}static \u0275fac=function(i){return new(i||n)};static \u0275prov=D({token:n,factory:n.\u0275fac})}return n})(),$S=["alt","control","meta","shift"],O1={"\b":"Backspace","	":"Tab","\x7F":"Delete","\x1B":"Escape",Del:"Delete",Esc:"Escape",Left:"ArrowLeft",Right:"ArrowRight",Up:"ArrowUp",Down:"ArrowDown",Menu:"ContextMenu",Scroll:"ScrollLock",Win:"OS"},R1={alt:n=>n.altKey,control:n=>n.ctrlKey,meta:n=>n.metaKey,shift:n=>n.shiftKey},zS=(()=>{class n extends ac{constructor(e){super(e)}supports(e){return n.parseEventName(e)!=null}addEventListener(e,i,r,o){let s=n.parseEventName(i),a=n.eventCallback(s.fullKey,r,this.manager.getZone());return this.manager.getZone().runOutsideAngular(()=>_r().onAndCancel(e,s.domEventName,a,o))}static parseEventName(e){let i=e.toLowerCase().split("."),r=i.shift();if(i.length===0||!(r==="keydown"||r==="keyup"))return null;let o=n._normalizeKey(i.pop()),s="",a=i.indexOf("code");if(a>-1&&(i.splice(a,1),s="code."),$S.forEach(c=>{let d=i.indexOf(c);d>-1&&(i.splice(d,1),s+=c+".")}),s+=o,i.length!=0||o.length===0)return null;let l={};return l.domEventName=r,l.fullKey=s,l}static matchEventFullKeyCode(e,i){let r=O1[e.key]||e.key,o="";return i.indexOf("code.")>-1&&(r=e.code,o="code."),r==null||!r?!1:(r=r.toLowerCase(),r===" "?r="space":r==="."&&(r="dot"),$S.forEach(s=>{if(s!==r){let a=R1[s];a(e)&&(o+=s+".")}}),o+=r,o===i)}static eventCallback(e,i,r){return o=>{n.matchEventFullKeyCode(o,e)&&r.runGuarded(()=>i(o))}}static _normalizeKey(e){return e==="esc"?"escape":e}static \u0275fac=function(i){return new(i||n)(se(he))};static \u0275prov=D({token:n,factory:n.\u0275fac})}return n})();async function Rv(n,t,e){let i=b({rootComponent:n},P1(t,e));return fS(i)}function P1(n,t){return{platformRef:t?.platformRef,appProviders:[...B1,...n?.providers??[]],platformProviders:V1}}function N1(){Vf.makeCurrent()}function F1(){return new Un}function L1(){return yy(document),document}var V1=[{provide:Yo,useValue:wv},{provide:Qu,useValue:N1,multi:!0},{provide:he,useFactory:L1}];var B1=[{provide:xl,useValue:"root"},{provide:Un,useFactory:F1},{provide:Lf,useClass:Pf,multi:!0},{provide:Lf,useClass:zS,multi:!0},Ov,kv,Iv,{provide:Wt,useExisting:Ov},{provide:sc,useClass:A1},[]];var WS=(()=>{class n{_doc;constructor(e){this._doc=e}getTitle(){return this._doc.title}setTitle(e){this._doc.title=e||""}static \u0275fac=function(i){return new(i||n)(se(he))};static \u0275prov=D({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})();var Pv=(()=>{class n{static \u0275fac=function(i){return new(i||n)};static \u0275prov=D({token:n,factory:function(i){let r=null;return i?r=new(i||n):r=se(j1),r},providedIn:"root"})}return n})(),j1=(()=>{class n extends Pv{_doc;constructor(e){super(),this._doc=e}sanitize(e,i){if(i==null)return null;switch(e){case An.NONE:return i;case An.HTML:return hr(i,"HTML")?_i(i):Ey(this._doc,String(i)).toString();case An.STYLE:return hr(i,"Style")?_i(i):i;case An.SCRIPT:if(hr(i,"Script"))return _i(i);throw new x(5200,!1);case An.URL:return hr(i,"URL")?_i(i):Gl(String(i));case An.RESOURCE_URL:if(hr(i,"ResourceURL"))return _i(i);throw new x(5201,!1);default:throw new x(5202,!1)}}bypassSecurityTrustHtml(e){return vy(e)}bypassSecurityTrustStyle(e){return _y(e)}bypassSecurityTrustScript(e){return by(e)}bypassSecurityTrustUrl(e){return Cy(e)}bypassSecurityTrustResourceUrl(e){return Dy(e)}static \u0275fac=function(i){return new(i||n)(se(he))};static \u0275prov=D({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})();var me="primary",wc=Symbol("RouteTitle"),Bv=class{params;constructor(t){this.params=t||{}}has(t){return Object.prototype.hasOwnProperty.call(this.params,t)}get(t){if(this.has(t)){let e=this.params[t];return Array.isArray(e)?e[0]:e}return null}getAll(t){if(this.has(t)){let e=this.params[t];return Array.isArray(e)?e:[e]}return[]}get keys(){return Object.keys(this.params)}};function is(n){return new Bv(n)}function Nv(n,t,e){for(let i=0;i<n.length;i++){let r=n[i],o=t[i];if(r[0]===":")e[r.substring(1)]=o;else if(r!==o.path)return!1}return!0}function JS(n,t,e){let i=e.path.split("/"),r=i.indexOf("**");if(r===-1){if(i.length>n.length||e.pathMatch==="full"&&(t.hasChildren()||i.length<n.length))return null;let l={},c=n.slice(0,i.length);return Nv(i,c,l)?{consumed:c,posParams:l}:null}if(r!==i.lastIndexOf("**"))return null;let o=i.slice(0,r),s=i.slice(r+1);if(o.length+s.length>n.length||e.pathMatch==="full"&&t.hasChildren()&&e.path!=="**")return null;let a={};return!Nv(o,n.slice(0,o.length),a)||!Nv(s,n.slice(n.length-s.length),a)?null:{consumed:n,posParams:a}}function zf(n){return new Promise((t,e)=>{n.pipe(tr()).subscribe({next:i=>t(i),error:i=>e(i)})})}function H1(n,t){if(n.length!==t.length)return!1;for(let e=0;e<n.length;++e)if(!$i(n[e],t[e]))return!1;return!0}function $i(n,t){let e=n?jv(n):void 0,i=t?jv(t):void 0;if(!e||!i||e.length!=i.length)return!1;let r;for(let o=0;o<e.length;o++)if(r=e[o],!ex(n[r],t[r]))return!1;return!0}function jv(n){return[...Object.keys(n),...Object.getOwnPropertySymbols(n)]}function ex(n,t){if(Array.isArray(n)&&Array.isArray(t)){if(n.length!==t.length)return!1;let e=[...n].sort(),i=[...t].sort();return e.every((r,o)=>i[o]===r)}else return n===t}function $1(n){return n.length>0?n[n.length-1]:null}function ss(n){return Mn(n)?n:eo(n)?Xe(Promise.resolve(n)):A(n)}function tx(n){return Mn(n)?zf(n):Promise.resolve(n)}var z1={exact:rx,subset:ox},nx={exact:W1,subset:G1,ignored:()=>!0},ix={paths:"exact",fragment:"ignored",matrixParams:"ignored",queryParams:"exact"},Uv={paths:"subset",fragment:"ignored",matrixParams:"ignored",queryParams:"subset"};function GS(n,t,e){return z1[e.paths](n.root,t.root,e.matrixParams)&&nx[e.queryParams](n.queryParams,t.queryParams)&&!(e.fragment==="exact"&&n.fragment!==t.fragment)}function W1(n,t){return $i(n,t)}function rx(n,t,e){if(!ns(n.segments,t.segments)||!Uf(n.segments,t.segments,e)||n.numberOfChildren!==t.numberOfChildren)return!1;for(let i in t.children)if(!n.children[i]||!rx(n.children[i],t.children[i],e))return!1;return!0}function G1(n,t){return Object.keys(t).length<=Object.keys(n).length&&Object.keys(t).every(e=>ex(n[e],t[e]))}function ox(n,t,e){return sx(n,t,t.segments,e)}function sx(n,t,e,i){if(n.segments.length>e.length){let r=n.segments.slice(0,e.length);return!(!ns(r,e)||t.hasChildren()||!Uf(r,e,i))}else if(n.segments.length===e.length){if(!ns(n.segments,e)||!Uf(n.segments,e,i))return!1;for(let r in t.children)if(!n.children[r]||!ox(n.children[r],t.children[r],i))return!1;return!0}else{let r=e.slice(0,n.segments.length),o=e.slice(n.segments.length);return!ns(n.segments,r)||!Uf(n.segments,r,i)||!n.children[me]?!1:sx(n.children[me],t,o,i)}}function Uf(n,t,e){return t.every((i,r)=>nx[e](n[r].parameters,i.parameters))}var Nn=class{root;queryParams;fragment;_queryParamMap;constructor(t=new Re([],{}),e={},i=null){this.root=t,this.queryParams=e,this.fragment=i}get queryParamMap(){return this._queryParamMap??=is(this.queryParams),this._queryParamMap}toString(){return Y1.serialize(this)}},Re=class{segments;children;parent=null;constructor(t,e){this.segments=t,this.children=e,Object.values(e).forEach(i=>i.parent=this)}hasChildren(){return this.numberOfChildren>0}get numberOfChildren(){return Object.keys(this.children).length}toString(){return Hf(this)}},ro=class{path;parameters;_parameterMap;constructor(t,e){this.path=t,this.parameters=e}get parameterMap(){return this._parameterMap??=is(this.parameters),this._parameterMap}toString(){return lx(this)}};function q1(n,t){return ns(n,t)&&n.every((e,i)=>$i(e.parameters,t[i].parameters))}function ns(n,t){return n.length!==t.length?!1:n.every((e,i)=>e.path===t[i].path)}function K1(n,t){let e=[];return Object.entries(n.children).forEach(([i,r])=>{i===me&&(e=e.concat(t(r,i)))}),Object.entries(n.children).forEach(([i,r])=>{i!==me&&(e=e.concat(t(r,i)))}),e}var Ca=(()=>{class n{static \u0275fac=function(i){return new(i||n)};static \u0275prov=D({token:n,factory:()=>new oo,providedIn:"root"})}return n})(),oo=class{parse(t){let e=new $v(t);return new Nn(e.parseRootSegment(),e.parseQueryParams(),e.parseFragment())}serialize(t){let e=`/${uc(t.root,!0)}`,i=Q1(t.queryParams),r=typeof t.fragment=="string"?`#${Z1(t.fragment)}`:"";return`${e}${i}${r}`}},Y1=new oo;function Hf(n){return n.segments.map(t=>lx(t)).join("/")}function uc(n,t){if(!n.hasChildren())return Hf(n);if(t){let e=n.children[me]?uc(n.children[me],!1):"",i=[];return Object.entries(n.children).forEach(([r,o])=>{r!==me&&i.push(`${r}:${uc(o,!1)}`)}),i.length>0?`${e}(${i.join("//")})`:e}else{let e=K1(n,(i,r)=>r===me?[uc(n.children[me],!1)]:[`${r}:${uc(i,!1)}`]);return Object.keys(n.children).length===1&&n.children[me]!=null?`${Hf(n)}/${e[0]}`:`${Hf(n)}/(${e.join("//")})`}}function ax(n){return encodeURIComponent(n).replace(/%40/g,"@").replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",")}function Bf(n){return ax(n).replace(/%3B/gi,";")}function Z1(n){return encodeURI(n)}function Hv(n){return ax(n).replace(/\(/g,"%28").replace(/\)/g,"%29").replace(/%26/gi,"&")}function $f(n){return decodeURIComponent(n)}function qS(n){return $f(n.replace(/\+/g,"%20"))}function lx(n){return`${Hv(n.path)}${X1(n.parameters)}`}function X1(n){return Object.entries(n).map(([t,e])=>`;${Hv(t)}=${Hv(e)}`).join("")}function Q1(n){let t=Object.entries(n).map(([e,i])=>Array.isArray(i)?i.map(r=>`${Bf(e)}=${Bf(r)}`).join("&"):`${Bf(e)}=${Bf(i)}`).filter(e=>e);return t.length?`?${t.join("&")}`:""}var J1=/^[^\/()?;#]+/;function Fv(n){let t=n.match(J1);return t?t[0]:""}var eF=/^[^\/()?;=#]+/;function tF(n){let t=n.match(eF);return t?t[0]:""}var nF=/^[^=?&#]+/;function iF(n){let t=n.match(nF);return t?t[0]:""}var rF=/^[^&#]+/;function oF(n){let t=n.match(rF);return t?t[0]:""}var $v=class{url;remaining;constructor(t){this.url=t,this.remaining=t}parseRootSegment(){for(;this.consumeOptional("/"););return this.remaining===""||this.peekStartsWith("?")||this.peekStartsWith("#")?new Re([],{}):new Re([],this.parseChildren())}parseQueryParams(){let t={};if(this.consumeOptional("?"))do this.parseQueryParam(t);while(this.consumeOptional("&"));return t}parseFragment(){return this.consumeOptional("#")?decodeURIComponent(this.remaining):null}parseChildren(t=0){if(t>50)throw new x(4010,!1);if(this.remaining==="")return{};this.consumeOptional("/");let e=[];for(this.peekStartsWith("(")||e.push(this.parseSegment());this.peekStartsWith("/")&&!this.peekStartsWith("//")&&!this.peekStartsWith("/(");)this.capture("/"),e.push(this.parseSegment());let i={};this.peekStartsWith("/(")&&(this.capture("/"),i=this.parseParens(!0,t));let r={};return this.peekStartsWith("(")&&(r=this.parseParens(!1,t)),(e.length>0||Object.keys(i).length>0)&&(r[me]=new Re(e,i)),r}parseSegment(){let t=Fv(this.remaining);if(t===""&&this.peekStartsWith(";"))throw new x(4009,!1);return this.capture(t),new ro($f(t),this.parseMatrixParams())}parseMatrixParams(){let t={};for(;this.consumeOptional(";");)this.parseParam(t);return t}parseParam(t){let e=tF(this.remaining);if(!e)return;this.capture(e);let i="";if(this.consumeOptional("=")){let r=Fv(this.remaining);r&&(i=r,this.capture(i))}t[$f(e)]=$f(i)}parseQueryParam(t){let e=iF(this.remaining);if(!e)return;this.capture(e);let i="";if(this.consumeOptional("=")){let s=oF(this.remaining);s&&(i=s,this.capture(i))}let r=qS(e),o=qS(i);if(t.hasOwnProperty(r)){let s=t[r];Array.isArray(s)||(s=[s],t[r]=s),s.push(o)}else t[r]=o}parseParens(t,e){let i={};for(this.capture("(");!this.consumeOptional(")")&&this.remaining.length>0;){let r=Fv(this.remaining),o=this.remaining[r.length];if(o!=="/"&&o!==")"&&o!==";")throw new x(4010,!1);let s;r.indexOf(":")>-1?(s=r.slice(0,r.indexOf(":")),this.capture(s),this.capture(":")):t&&(s=me);let a=this.parseChildren(e+1);i[s??me]=Object.keys(a).length===1&&a[me]?a[me]:new Re([],a),this.consumeOptional("//")}return i}peekStartsWith(t){return this.remaining.startsWith(t)}consumeOptional(t){return this.peekStartsWith(t)?(this.remaining=this.remaining.substring(t.length),!0):!1}capture(t){if(!this.consumeOptional(t))throw new x(4011,!1)}};function cx(n){return n.segments.length>0?new Re([],{[me]:n}):n}function dx(n){let t={};for(let[i,r]of Object.entries(n.children)){let o=dx(r);if(i===me&&o.segments.length===0&&o.hasChildren())for(let[s,a]of Object.entries(o.children))t[s]=a;else(o.segments.length>0||o.hasChildren())&&(t[i]=o)}let e=new Re(n.segments,t);return sF(e)}function sF(n){if(n.numberOfChildren===1&&n.children[me]){let t=n.children[me];return new Re(n.segments.concat(t.segments),t.children)}return n}function so(n){return n instanceof Nn}function ux(n,t,e=null,i=null,r=new oo){let o=fx(n);return px(o,t,e,i,r)}function fx(n){let t;function e(o){let s={};for(let l of o.children){let c=e(l);s[l.outlet]=c}let a=new Re(o.url,s);return o===n&&(t=a),a}let i=e(n.root),r=cx(i);return t??r}function px(n,t,e,i,r){let o=n;for(;o.parent;)o=o.parent;if(t.length===0)return Lv(o,o,o,e,i,r);let s=aF(t);if(s.toRoot())return Lv(o,o,new Re([],{}),e,i,r);let a=lF(s,o,n),l=a.processChildren?pc(a.segmentGroup,a.index,s.commands):mx(a.segmentGroup,a.index,s.commands);return Lv(o,a.segmentGroup,l,e,i,r)}function Wf(n){return typeof n=="object"&&n!=null&&!n.outlets&&!n.segmentPath}function gc(n){return typeof n=="object"&&n!=null&&n.outlets}function KS(n,t,e){n||="\u0275";let i=new Nn;return i.queryParams={[n]:t},e.parse(e.serialize(i)).queryParams[n]}function Lv(n,t,e,i,r,o){let s={};for(let[c,d]of Object.entries(i??{}))s[c]=Array.isArray(d)?d.map(u=>KS(c,u,o)):KS(c,d,o);let a;n===t?a=e:a=hx(n,t,e);let l=cx(dx(a));return new Nn(l,s,r)}function hx(n,t,e){let i={};return Object.entries(n.children).forEach(([r,o])=>{o===t?i[r]=e:i[r]=hx(o,t,e)}),new Re(n.segments,i)}var Gf=class{isAbsolute;numberOfDoubleDots;commands;constructor(t,e,i){if(this.isAbsolute=t,this.numberOfDoubleDots=e,this.commands=i,t&&i.length>0&&Wf(i[0]))throw new x(4003,!1);let r=i.find(gc);if(r&&r!==$1(i))throw new x(4004,!1)}toRoot(){return this.isAbsolute&&this.commands.length===1&&this.commands[0]=="/"}};function aF(n){if(typeof n[0]=="string"&&n.length===1&&n[0]==="/")return new Gf(!0,0,n);let t=0,e=!1,i=n.reduce((r,o,s)=>{if(typeof o=="object"&&o!=null){if(o.outlets){let a={};return Object.entries(o.outlets).forEach(([l,c])=>{a[l]=typeof c=="string"?c.split("/"):c}),[...r,{outlets:a}]}if(o.segmentPath)return[...r,o.segmentPath]}return typeof o!="string"?[...r,o]:s===0?(o.split("/").forEach((a,l)=>{l==0&&a==="."||(l==0&&a===""?e=!0:a===".."?t++:a!=""&&r.push(a))}),r):[...r,o]},[]);return new Gf(e,t,i)}var ha=class{segmentGroup;processChildren;index;constructor(t,e,i){this.segmentGroup=t,this.processChildren=e,this.index=i}};function lF(n,t,e){if(n.isAbsolute)return new ha(t,!0,0);if(!e)return new ha(t,!1,NaN);if(e.parent===null)return new ha(e,!0,0);let i=Wf(n.commands[0])?0:1,r=e.segments.length-1+i;return cF(e,r,n.numberOfDoubleDots)}function cF(n,t,e){let i=n,r=t,o=e;for(;o>r;){if(o-=r,i=i.parent,!i)throw new x(4005,!1);r=i.segments.length}return new ha(i,!1,r-o)}function dF(n){return gc(n[0])?n[0].outlets:{[me]:n}}function mx(n,t,e){if(n??=new Re([],{}),n.segments.length===0&&n.hasChildren())return pc(n,t,e);let i=uF(n,t,e),r=e.slice(i.commandIndex);if(i.match&&i.pathIndex<n.segments.length){let o=new Re(n.segments.slice(0,i.pathIndex),{});return o.children[me]=new Re(n.segments.slice(i.pathIndex),n.children),pc(o,0,r)}else return i.match&&r.length===0?new Re(n.segments,{}):i.match&&!n.hasChildren()?zv(n,t,e):i.match?pc(n,0,r):zv(n,t,e)}function pc(n,t,e){if(e.length===0)return new Re(n.segments,{});{let i=dF(e),r={};if(Object.keys(i).some(o=>o!==me)&&n.children[me]&&n.numberOfChildren===1&&n.children[me].segments.length===0){let o=pc(n.children[me],t,e);return new Re(n.segments,o.children)}return Object.entries(i).forEach(([o,s])=>{typeof s=="string"&&(s=[s]),s!==null&&(r[o]=mx(n.children[o],t,s))}),Object.entries(n.children).forEach(([o,s])=>{i[o]===void 0&&(r[o]=s)}),new Re(n.segments,r)}}function uF(n,t,e){let i=0,r=t,o={match:!1,pathIndex:0,commandIndex:0};for(;r<n.segments.length;){if(i>=e.length)return o;let s=n.segments[r],a=e[i];if(gc(a))break;let l=`${a}`,c=i<e.length-1?e[i+1]:null;if(r>0&&l===void 0)break;if(l&&c&&typeof c=="object"&&c.outlets===void 0){if(!ZS(l,c,s))return o;i+=2}else{if(!ZS(l,{},s))return o;i++}r++}return{match:!0,pathIndex:r,commandIndex:i}}function zv(n,t,e){let i=n.segments.slice(0,t),r=0;for(;r<e.length;){let o=e[r];if(gc(o)){let l=fF(o.outlets);return new Re(i,l)}if(r===0&&Wf(e[0])){let l=n.segments[t];i.push(new ro(l.path,YS(e[0]))),r++;continue}let s=gc(o)?o.outlets[me]:`${o}`,a=r<e.length-1?e[r+1]:null;s&&a&&Wf(a)?(i.push(new ro(s,YS(a))),r+=2):(i.push(new ro(s,{})),r++)}return new Re(i,{})}function fF(n){let t={};return Object.entries(n).forEach(([e,i])=>{typeof i=="string"&&(i=[i]),i!==null&&(t[e]=zv(new Re([],{}),0,i))}),t}function YS(n){let t={};return Object.entries(n).forEach(([e,i])=>t[e]=`${i}`),t}function ZS(n,t,e){return n==e.path&&$i(t,e.parameters)}var hc="imperative",kt=(function(n){return n[n.NavigationStart=0]="NavigationStart",n[n.NavigationEnd=1]="NavigationEnd",n[n.NavigationCancel=2]="NavigationCancel",n[n.NavigationError=3]="NavigationError",n[n.RoutesRecognized=4]="RoutesRecognized",n[n.ResolveStart=5]="ResolveStart",n[n.ResolveEnd=6]="ResolveEnd",n[n.GuardsCheckStart=7]="GuardsCheckStart",n[n.GuardsCheckEnd=8]="GuardsCheckEnd",n[n.RouteConfigLoadStart=9]="RouteConfigLoadStart",n[n.RouteConfigLoadEnd=10]="RouteConfigLoadEnd",n[n.ChildActivationStart=11]="ChildActivationStart",n[n.ChildActivationEnd=12]="ChildActivationEnd",n[n.ActivationStart=13]="ActivationStart",n[n.ActivationEnd=14]="ActivationEnd",n[n.Scroll=15]="Scroll",n[n.NavigationSkipped=16]="NavigationSkipped",n})(kt||{}),Fn=class{id;url;constructor(t,e){this.id=t,this.url=e}},rs=class extends Fn{type=kt.NavigationStart;navigationTrigger;restoredState;constructor(t,e,i="imperative",r=null){super(t,e),this.navigationTrigger=i,this.restoredState=r}toString(){return`NavigationStart(id: ${this.id}, url: '${this.url}')`}},zi=class extends Fn{urlAfterRedirects;type=kt.NavigationEnd;constructor(t,e,i){super(t,e),this.urlAfterRedirects=i}toString(){return`NavigationEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}')`}},Kt=(function(n){return n[n.Redirect=0]="Redirect",n[n.SupersededByNewNavigation=1]="SupersededByNewNavigation",n[n.NoDataFromResolver=2]="NoDataFromResolver",n[n.GuardRejected=3]="GuardRejected",n[n.Aborted=4]="Aborted",n})(Kt||{}),yc=(function(n){return n[n.IgnoredSameUrlNavigation=0]="IgnoredSameUrlNavigation",n[n.IgnoredByUrlHandlingStrategy=1]="IgnoredByUrlHandlingStrategy",n})(yc||{}),Qn=class extends Fn{reason;code;type=kt.NavigationCancel;constructor(t,e,i,r){super(t,e),this.reason=i,this.code=r}toString(){return`NavigationCancel(id: ${this.id}, url: '${this.url}')`}};function gx(n){return n instanceof Qn&&(n.code===Kt.Redirect||n.code===Kt.SupersededByNewNavigation)}var Er=class extends Fn{reason;code;type=kt.NavigationSkipped;constructor(t,e,i,r){super(t,e),this.reason=i,this.code=r}},os=class extends Fn{error;target;type=kt.NavigationError;constructor(t,e,i,r){super(t,e),this.error=i,this.target=r}toString(){return`NavigationError(id: ${this.id}, url: '${this.url}', error: ${this.error})`}},vc=class extends Fn{urlAfterRedirects;state;type=kt.RoutesRecognized;constructor(t,e,i,r){super(t,e),this.urlAfterRedirects=i,this.state=r}toString(){return`RoutesRecognized(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`}},qf=class extends Fn{urlAfterRedirects;state;type=kt.GuardsCheckStart;constructor(t,e,i,r){super(t,e),this.urlAfterRedirects=i,this.state=r}toString(){return`GuardsCheckStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`}},Kf=class extends Fn{urlAfterRedirects;state;shouldActivate;type=kt.GuardsCheckEnd;constructor(t,e,i,r,o){super(t,e),this.urlAfterRedirects=i,this.state=r,this.shouldActivate=o}toString(){return`GuardsCheckEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state}, shouldActivate: ${this.shouldActivate})`}},Yf=class extends Fn{urlAfterRedirects;state;type=kt.ResolveStart;constructor(t,e,i,r){super(t,e),this.urlAfterRedirects=i,this.state=r}toString(){return`ResolveStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`}},Zf=class extends Fn{urlAfterRedirects;state;type=kt.ResolveEnd;constructor(t,e,i,r){super(t,e),this.urlAfterRedirects=i,this.state=r}toString(){return`ResolveEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`}},Xf=class{route;type=kt.RouteConfigLoadStart;constructor(t){this.route=t}toString(){return`RouteConfigLoadStart(path: ${this.route.path})`}},Qf=class{route;type=kt.RouteConfigLoadEnd;constructor(t){this.route=t}toString(){return`RouteConfigLoadEnd(path: ${this.route.path})`}},Jf=class{snapshot;type=kt.ChildActivationStart;constructor(t){this.snapshot=t}toString(){return`ChildActivationStart(path: '${this.snapshot.routeConfig&&this.snapshot.routeConfig.path||""}')`}},ep=class{snapshot;type=kt.ChildActivationEnd;constructor(t){this.snapshot=t}toString(){return`ChildActivationEnd(path: '${this.snapshot.routeConfig&&this.snapshot.routeConfig.path||""}')`}},tp=class{snapshot;type=kt.ActivationStart;constructor(t){this.snapshot=t}toString(){return`ActivationStart(path: '${this.snapshot.routeConfig&&this.snapshot.routeConfig.path||""}')`}},np=class{snapshot;type=kt.ActivationEnd;constructor(t){this.snapshot=t}toString(){return`ActivationEnd(path: '${this.snapshot.routeConfig&&this.snapshot.routeConfig.path||""}')`}};var ga=class{},_c=class{},ya=class{url;navigationBehaviorOptions;constructor(t,e){this.url=t,this.navigationBehaviorOptions=e}};function pF(n){return!(n instanceof ga)&&!(n instanceof ya)&&!(n instanceof _c)}var ip=class{rootInjector;outlet=null;route=null;children;attachRef=null;get injector(){return this.route?.snapshot._environmentInjector??this.rootInjector}constructor(t){this.rootInjector=t,this.children=new Da(this.rootInjector)}},Da=(()=>{class n{rootInjector;contexts=new Map;constructor(e){this.rootInjector=e}onChildOutletCreated(e,i){let r=this.getOrCreateContext(e);r.outlet=i,this.contexts.set(e,r)}onChildOutletDestroyed(e){let i=this.getContext(e);i&&(i.outlet=null,i.attachRef=null)}onOutletDeactivated(){let e=this.contexts;return this.contexts=new Map,e}onOutletReAttached(e){this.contexts=e}getOrCreateContext(e){let i=this.getContext(e);return i||(i=new ip(this.rootInjector),this.contexts.set(e,i)),i}getContext(e){return this.contexts.get(e)||null}static \u0275fac=function(i){return new(i||n)(se(We))};static \u0275prov=D({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})(),rp=class{_root;constructor(t){this._root=t}get root(){return this._root.value}parent(t){let e=this.pathFromRoot(t);return e.length>1?e[e.length-2]:null}children(t){let e=Wv(t,this._root);return e?e.children.map(i=>i.value):[]}firstChild(t){let e=Wv(t,this._root);return e&&e.children.length>0?e.children[0].value:null}siblings(t){let e=Gv(t,this._root);return e.length<2?[]:e[e.length-2].children.map(r=>r.value).filter(r=>r!==t)}pathFromRoot(t){return Gv(t,this._root).map(e=>e.value)}};function Wv(n,t){if(n===t.value)return t;for(let e of t.children){let i=Wv(n,e);if(i)return i}return null}function Gv(n,t){if(n===t.value)return[t];for(let e of t.children){let i=Gv(n,e);if(i.length)return i.unshift(t),i}return[]}var Pn=class{value;children;constructor(t,e){this.value=t,this.children=e}toString(){return`TreeNode(${this.value})`}};function pa(n){let t={};return n&&n.children.forEach(e=>t[e.value.outlet]=e),t}var bc=class extends rp{snapshot;constructor(t,e){super(t),this.snapshot=e,t_(this,t)}toString(){return this.snapshot.toString()}};function yx(n,t){let e=hF(n,t),i=new ot([new ro("",{})]),r=new ot({}),o=new ot({}),s=new ot({}),a=new ot(""),l=new wr(i,r,s,a,o,me,n,e.root);return l.snapshot=e.root,new bc(new Pn(l,[]),e)}function hF(n,t){let e={},i={},r={},s=new va([],e,r,"",i,me,n,null,{},t);return new Cc("",new Pn(s,[]))}var wr=class{urlSubject;paramsSubject;queryParamsSubject;fragmentSubject;dataSubject;outlet;component;snapshot;_futureSnapshot;_routerState;_paramMap;_queryParamMap;title;url;params;queryParams;fragment;data;constructor(t,e,i,r,o,s,a,l){this.urlSubject=t,this.paramsSubject=e,this.queryParamsSubject=i,this.fragmentSubject=r,this.dataSubject=o,this.outlet=s,this.component=a,this._futureSnapshot=l,this.title=this.dataSubject?.pipe(ye(c=>c[wc]))??A(void 0),this.url=t,this.params=e,this.queryParams=i,this.fragment=r,this.data=o}get routeConfig(){return this._futureSnapshot.routeConfig}get root(){return this._routerState.root}get parent(){return this._routerState.parent(this)}get firstChild(){return this._routerState.firstChild(this)}get children(){return this._routerState.children(this)}get pathFromRoot(){return this._routerState.pathFromRoot(this)}get paramMap(){return this._paramMap??=this.params.pipe(ye(t=>is(t))),this._paramMap}get queryParamMap(){return this._queryParamMap??=this.queryParams.pipe(ye(t=>is(t))),this._queryParamMap}toString(){return this.snapshot?this.snapshot.toString():`Future(${this._futureSnapshot})`}};function e_(n,t,e="emptyOnly"){let i,{routeConfig:r}=n;return t!==null&&(e==="always"||r?.path===""||!t.component&&!t.routeConfig?.loadComponent)?i={params:b(b({},t.params),n.params),data:b(b({},t.data),n.data),resolve:b(b(b(b({},n.data),t.data),r?.data),n._resolvedData)}:i={params:b({},n.params),data:b({},n.data),resolve:b(b({},n.data),n._resolvedData??{})},r&&_x(r)&&(i.resolve[wc]=r.title),i}var va=class{url;params;queryParams;fragment;data;outlet;component;routeConfig;_resolve;_resolvedData;_routerState;_paramMap;_queryParamMap;_environmentInjector;get title(){return this.data?.[wc]}constructor(t,e,i,r,o,s,a,l,c,d){this.url=t,this.params=e,this.queryParams=i,this.fragment=r,this.data=o,this.outlet=s,this.component=a,this.routeConfig=l,this._resolve=c,this._environmentInjector=d}get root(){return this._routerState.root}get parent(){return this._routerState.parent(this)}get firstChild(){return this._routerState.firstChild(this)}get children(){return this._routerState.children(this)}get pathFromRoot(){return this._routerState.pathFromRoot(this)}get paramMap(){return this._paramMap??=is(this.params),this._paramMap}get queryParamMap(){return this._queryParamMap??=is(this.queryParams),this._queryParamMap}toString(){let t=this.url.map(i=>i.toString()).join("/"),e=this.routeConfig?this.routeConfig.path:"";return`Route(url:'${t}', path:'${e}')`}},Cc=class extends rp{url;constructor(t,e){super(e),this.url=t,t_(this,e)}toString(){return vx(this._root)}};function t_(n,t){t.value._routerState=n,t.children.forEach(e=>t_(n,e))}function vx(n){let t=n.children.length>0?` { ${n.children.map(vx).join(", ")} } `:"";return`${n.value}${t}`}function Vv(n){if(n.snapshot){let t=n.snapshot,e=n._futureSnapshot;n.snapshot=e,$i(t.queryParams,e.queryParams)||n.queryParamsSubject.next(e.queryParams),t.fragment!==e.fragment&&n.fragmentSubject.next(e.fragment),$i(t.params,e.params)||n.paramsSubject.next(e.params),H1(t.url,e.url)||n.urlSubject.next(e.url),$i(t.data,e.data)||n.dataSubject.next(e.data)}else n.snapshot=n._futureSnapshot,n.dataSubject.next(n._futureSnapshot.data)}function qv(n,t){let e=$i(n.params,t.params)&&q1(n.url,t.url),i=!n.parent!=!t.parent;return e&&!i&&(!n.parent||qv(n.parent,t.parent))}function _x(n){return typeof n.title=="string"||n.title===null}var bx=new C(""),Sc=(()=>{class n{activated=null;get activatedComponentRef(){return this.activated}_activatedRoute=null;name=me;activateEvents=new j;deactivateEvents=new j;attachEvents=new j;detachEvents=new j;routerOutletData=Ft();parentContexts=f(Da);location=f(pt);changeDetector=f(tt);inputBinder=f(lp,{optional:!0});supportsBindingToComponentInputs=!0;ngOnChanges(e){if(e.name){let{firstChange:i,previousValue:r}=e.name;if(i)return;this.isTrackedInParentContexts(r)&&(this.deactivate(),this.parentContexts.onChildOutletDestroyed(r)),this.initializeOutletWithName()}}ngOnDestroy(){this.isTrackedInParentContexts(this.name)&&this.parentContexts.onChildOutletDestroyed(this.name),this.inputBinder?.unsubscribeFromRouteData(this)}isTrackedInParentContexts(e){return this.parentContexts.getContext(e)?.outlet===this}ngOnInit(){this.initializeOutletWithName()}initializeOutletWithName(){if(this.parentContexts.onChildOutletCreated(this.name,this),this.activated)return;let e=this.parentContexts.getContext(this.name);e?.route&&(e.attachRef?this.attach(e.attachRef,e.route):this.activateWith(e.route,e.injector))}get isActivated(){return!!this.activated}get component(){if(!this.activated)throw new x(4012,!1);return this.activated.instance}get activatedRoute(){if(!this.activated)throw new x(4012,!1);return this._activatedRoute}get activatedRouteData(){return this._activatedRoute?this._activatedRoute.snapshot.data:{}}detach(){if(!this.activated)throw new x(4012,!1);this.location.detach();let e=this.activated;return this.activated=null,this._activatedRoute=null,this.detachEvents.emit(e.instance),e}attach(e,i){this.activated=e,this._activatedRoute=i,this.location.insert(e.hostView),this.inputBinder?.bindActivatedRouteToOutletComponent(this),this.attachEvents.emit(e.instance)}deactivate(){if(this.activated){let e=this.component;this.activated.destroy(),this.activated=null,this._activatedRoute=null,this.deactivateEvents.emit(e)}}activateWith(e,i){if(this.isActivated)throw new x(4013,!1);this._activatedRoute=e;let r=this.location,s=e.snapshot.component,a=this.parentContexts.getOrCreateContext(this.name).children,l=new Kv(e,a,r.injector,this.routerOutletData);this.activated=r.createComponent(s,{index:r.length,injector:l,environmentInjector:i}),this.changeDetector.markForCheck(),this.inputBinder?.bindActivatedRouteToOutletComponent(this),this.activateEvents.emit(this.activated.instance)}static \u0275fac=function(i){return new(i||n)};static \u0275dir=ie({type:n,selectors:[["router-outlet"]],inputs:{name:"name",routerOutletData:[1,"routerOutletData"]},outputs:{activateEvents:"activate",deactivateEvents:"deactivate",attachEvents:"attach",detachEvents:"detach"},exportAs:["outlet"],features:[It]})}return n})(),Kv=class{route;childContexts;parent;outletData;constructor(t,e,i,r){this.route=t,this.childContexts=e,this.parent=i,this.outletData=r}get(t,e){return t===wr?this.route:t===Da?this.childContexts:t===bx?this.outletData:this.parent.get(t,e)}},lp=new C("");var n_=(()=>{class n{static \u0275fac=function(i){return new(i||n)};static \u0275cmp=G({type:n,selectors:[["ng-component"]],exportAs:["emptyRouterOutlet"],decls:1,vars:0,template:function(i,r){i&1&&_e(0,"router-outlet")},dependencies:[Sc],encapsulation:2})}return n})();function i_(n){let t=n.children&&n.children.map(i_),e=t?$(b({},n),{children:t}):b({},n);return!e.component&&!e.loadComponent&&(t||e.loadChildren)&&e.outlet&&e.outlet!==me&&(e.component=n_),e}function mF(n,t,e){let i=Dc(n,t._root,e?e._root:void 0);return new bc(i,t)}function Dc(n,t,e){if(e&&n.shouldReuseRoute(t.value,e.value.snapshot)){let i=e.value;i._futureSnapshot=t.value;let r=gF(n,t,e);return new Pn(i,r)}else{if(n.shouldAttach(t.value)){let o=n.retrieve(t.value);if(o!==null){let s=o.route;return s.value._futureSnapshot=t.value,s.children=t.children.map(a=>Dc(n,a)),s}}let i=yF(t.value),r=t.children.map(o=>Dc(n,o));return new Pn(i,r)}}function gF(n,t,e){return t.children.map(i=>{for(let r of e.children)if(n.shouldReuseRoute(i.value,r.value.snapshot))return Dc(n,i,r);return Dc(n,i)})}function yF(n){return new wr(new ot(n.url),new ot(n.params),new ot(n.queryParams),new ot(n.fragment),new ot(n.data),n.outlet,n.component,n)}var _a=class{redirectTo;navigationBehaviorOptions;constructor(t,e){this.redirectTo=t,this.navigationBehaviorOptions=e}},Cx="ngNavigationCancelingError";function op(n,t){let{redirectTo:e,navigationBehaviorOptions:i}=so(t)?{redirectTo:t,navigationBehaviorOptions:void 0}:t,r=Dx(!1,Kt.Redirect);return r.url=e,r.navigationBehaviorOptions=i,r}function Dx(n,t){let e=new Error(`NavigationCancelingError: ${n||""}`);return e[Cx]=!0,e.cancellationCode=t,e}function vF(n){return Ex(n)&&so(n.url)}function Ex(n){return!!n&&n[Cx]}var Yv=class{routeReuseStrategy;futureState;currState;forwardEvent;inputBindingEnabled;constructor(t,e,i,r,o){this.routeReuseStrategy=t,this.futureState=e,this.currState=i,this.forwardEvent=r,this.inputBindingEnabled=o}activate(t){let e=this.futureState._root,i=this.currState?this.currState._root:null;this.deactivateChildRoutes(e,i,t),Vv(this.futureState.root),this.activateChildRoutes(e,i,t)}deactivateChildRoutes(t,e,i){let r=pa(e);t.children.forEach(o=>{let s=o.value.outlet;this.deactivateRoutes(o,r[s],i),delete r[s]}),Object.values(r).forEach(o=>{this.deactivateRouteAndItsChildren(o,i)})}deactivateRoutes(t,e,i){let r=t.value,o=e?e.value:null;if(r===o)if(r.component){let s=i.getContext(r.outlet);s&&this.deactivateChildRoutes(t,e,s.children)}else this.deactivateChildRoutes(t,e,i);else o&&this.deactivateRouteAndItsChildren(e,i)}deactivateRouteAndItsChildren(t,e){t.value.component&&this.routeReuseStrategy.shouldDetach(t.value.snapshot)?this.detachAndStoreRouteSubtree(t,e):this.deactivateRouteAndOutlet(t,e)}detachAndStoreRouteSubtree(t,e){let i=e.getContext(t.value.outlet),r=i&&t.value.component?i.children:e,o=pa(t);for(let s of Object.values(o))this.deactivateRouteAndItsChildren(s,r);if(i&&i.outlet){let s=i.outlet.detach(),a=i.children.onOutletDeactivated();this.routeReuseStrategy.store(t.value.snapshot,{componentRef:s,route:t,contexts:a})}}deactivateRouteAndOutlet(t,e){let i=e.getContext(t.value.outlet),r=i&&t.value.component?i.children:e,o=pa(t);for(let s of Object.values(o))this.deactivateRouteAndItsChildren(s,r);i&&(i.outlet&&(i.outlet.deactivate(),i.children.onOutletDeactivated()),i.attachRef=null,i.route=null)}activateChildRoutes(t,e,i){let r=pa(e);t.children.forEach(o=>{this.activateRoutes(o,r[o.value.outlet],i),this.forwardEvent(new np(o.value.snapshot))}),t.children.length&&this.forwardEvent(new ep(t.value.snapshot))}activateRoutes(t,e,i){let r=t.value,o=e?e.value:null;if(Vv(r),r===o)if(r.component){let s=i.getOrCreateContext(r.outlet);this.activateChildRoutes(t,e,s.children)}else this.activateChildRoutes(t,e,i);else if(r.component){let s=i.getOrCreateContext(r.outlet);if(this.routeReuseStrategy.shouldAttach(r.snapshot)){let a=this.routeReuseStrategy.retrieve(r.snapshot);this.routeReuseStrategy.store(r.snapshot,null),s.children.onOutletReAttached(a.contexts),s.attachRef=a.componentRef,s.route=a.route.value,s.outlet&&s.outlet.attach(a.componentRef,a.route.value),Vv(a.route.value),this.activateChildRoutes(t,null,s.children)}else s.attachRef=null,s.route=r,s.outlet&&s.outlet.activateWith(r,s.injector),this.activateChildRoutes(t,null,s.children)}else this.activateChildRoutes(t,null,i)}},sp=class{path;route;constructor(t){this.path=t,this.route=this.path[this.path.length-1]}},ma=class{component;route;constructor(t,e){this.component=t,this.route=e}};function _F(n,t,e){let i=n._root,r=t?t._root:null;return fc(i,r,e,[i.value])}function bF(n){let t=n.routeConfig?n.routeConfig.canActivateChild:null;return!t||t.length===0?null:{node:n,guards:t}}function Ea(n,t){let e=Symbol(),i=t.get(n,e);return i===e?typeof n=="function"&&!Tm(n)?n:t.get(n):i}function fc(n,t,e,i,r={canDeactivateChecks:[],canActivateChecks:[]}){let o=pa(t);return n.children.forEach(s=>{CF(s,o[s.value.outlet],e,i.concat([s.value]),r),delete o[s.value.outlet]}),Object.entries(o).forEach(([s,a])=>mc(a,e.getContext(s),r)),r}function CF(n,t,e,i,r={canDeactivateChecks:[],canActivateChecks:[]}){let o=n.value,s=t?t.value:null,a=e?e.getContext(n.value.outlet):null;if(s&&o.routeConfig===s.routeConfig){let l=DF(s,o,o.routeConfig.runGuardsAndResolvers);l?r.canActivateChecks.push(new sp(i)):(o.data=s.data,o._resolvedData=s._resolvedData),o.component?fc(n,t,a?a.children:null,i,r):fc(n,t,e,i,r),l&&a&&a.outlet&&a.outlet.isActivated&&r.canDeactivateChecks.push(new ma(a.outlet.component,s))}else s&&mc(t,a,r),r.canActivateChecks.push(new sp(i)),o.component?fc(n,null,a?a.children:null,i,r):fc(n,null,e,i,r);return r}function DF(n,t,e){if(typeof e=="function")return zt(t._environmentInjector,()=>e(n,t));switch(e){case"pathParamsChange":return!ns(n.url,t.url);case"pathParamsOrQueryParamsChange":return!ns(n.url,t.url)||!$i(n.queryParams,t.queryParams);case"always":return!0;case"paramsOrQueryParamsChange":return!qv(n,t)||!$i(n.queryParams,t.queryParams);default:return!qv(n,t)}}function mc(n,t,e){let i=pa(n),r=n.value;Object.entries(i).forEach(([o,s])=>{r.component?t?mc(s,t.children.getContext(o),e):mc(s,null,e):mc(s,t,e)}),r.component?t&&t.outlet&&t.outlet.isActivated?e.canDeactivateChecks.push(new ma(t.outlet.component,r)):e.canDeactivateChecks.push(new ma(null,r)):e.canDeactivateChecks.push(new ma(null,r))}function xc(n){return typeof n=="function"}function EF(n){return typeof n=="boolean"}function wF(n){return n&&xc(n.canLoad)}function SF(n){return n&&xc(n.canActivate)}function xF(n){return n&&xc(n.canActivateChild)}function TF(n){return n&&xc(n.canDeactivate)}function MF(n){return n&&xc(n.canMatch)}function wx(n){return n instanceof Qi||n?.name==="EmptyError"}var jf=Symbol("INITIAL_VALUE");function ba(){return ut(n=>fl(n.map(t=>t.pipe(yt(1),dt(jf)))).pipe(ye(t=>{for(let e of t)if(e!==!0){if(e===jf)return jf;if(e===!1||IF(e))return e}return!0}),Ce(t=>t!==jf),yt(1)))}function IF(n){return so(n)||n instanceof _a}function Sx(n){return n.aborted?A(void 0).pipe(yt(1)):new q(t=>{let e=()=>{t.next(),t.complete()};return n.addEventListener("abort",e),()=>n.removeEventListener("abort",e)})}function xx(n){return ne(Sx(n))}function kF(n){return Qt(t=>{let{targetSnapshot:e,currentSnapshot:i,guards:{canActivateChecks:r,canDeactivateChecks:o}}=t;return o.length===0&&r.length===0?A($(b({},t),{guardsResult:!0})):AF(o,e,i).pipe(Qt(s=>s&&EF(s)?OF(e,r,n):A(s)),ye(s=>$(b({},t),{guardsResult:s})))})}function AF(n,t,e){return Xe(n).pipe(Qt(i=>LF(i.component,i.route,e,t)),tr(i=>i!==!0,!0))}function OF(n,t,e){return Xe(t).pipe(Kd(i=>jr(PF(i.route.parent,e),RF(i.route,e),FF(n,i.path),NF(n,i.route))),tr(i=>i!==!0,!0))}function RF(n,t){return n!==null&&t&&t(new tp(n)),A(!0)}function PF(n,t){return n!==null&&t&&t(new Jf(n)),A(!0)}function NF(n,t){let e=t.routeConfig?t.routeConfig.canActivate:null;if(!e||e.length===0)return A(!0);let i=e.map(r=>ko(()=>{let o=t._environmentInjector,s=Ea(r,o),a=SF(s)?s.canActivate(t,n):zt(o,()=>s(t,n));return ss(a).pipe(tr())}));return A(i).pipe(ba())}function FF(n,t){let e=t[t.length-1],r=t.slice(0,t.length-1).reverse().map(o=>bF(o)).filter(o=>o!==null).map(o=>ko(()=>{let s=o.guards.map(a=>{let l=o.node._environmentInjector,c=Ea(a,l),d=xF(c)?c.canActivateChild(e,n):zt(l,()=>c(e,n));return ss(d).pipe(tr())});return A(s).pipe(ba())}));return A(r).pipe(ba())}function LF(n,t,e,i){let r=t&&t.routeConfig?t.routeConfig.canDeactivate:null;if(!r||r.length===0)return A(!0);let o=r.map(s=>{let a=t._environmentInjector,l=Ea(s,a),c=TF(l)?l.canDeactivate(n,t,e,i):zt(a,()=>l(n,t,e,i));return ss(c).pipe(tr())});return A(o).pipe(ba())}function VF(n,t,e,i,r){let o=t.canLoad;if(o===void 0||o.length===0)return A(!0);let s=o.map(a=>{let l=Ea(a,n),c=wF(l)?l.canLoad(t,e):zt(n,()=>l(t,e)),d=ss(c);return r?d.pipe(xx(r)):d});return A(s).pipe(ba(),Tx(i))}function Tx(n){return Jh(wt(t=>{if(typeof t!="boolean")throw op(n,t)}),ye(t=>t===!0))}function BF(n,t,e,i,r,o){let s=t.canMatch;if(!s||s.length===0)return A(!0);let a=s.map(l=>{let c=Ea(l,n),d=MF(c)?c.canMatch(t,e,r):zt(n,()=>c(t,e,r));return ss(d).pipe(xx(o))});return A(a).pipe(ba(),Tx(i))}var Dr=class n extends Error{segmentGroup;constructor(t){super(),this.segmentGroup=t||null,Object.setPrototypeOf(this,n.prototype)}},Ec=class n extends Error{urlTree;constructor(t){super(),this.urlTree=t,Object.setPrototypeOf(this,n.prototype)}};function jF(n){throw new x(4e3,!1)}function UF(n){throw Dx(!1,Kt.GuardRejected)}var Zv=class{urlSerializer;urlTree;constructor(t,e){this.urlSerializer=t,this.urlTree=e}async lineralizeSegments(t,e){let i=[],r=e.root;for(;;){if(i=i.concat(r.segments),r.numberOfChildren===0)return i;if(r.numberOfChildren>1||!r.children[me])throw jF(`${t.redirectTo}`);r=r.children[me]}}async applyRedirectCommands(t,e,i,r,o){let s=await HF(e,r,o);if(s instanceof Nn)throw new Ec(s);let a=this.applyRedirectCreateUrlTree(s,this.urlSerializer.parse(s),t,i);if(s[0]==="/")throw new Ec(a);return a}applyRedirectCreateUrlTree(t,e,i,r){let o=this.createSegmentGroup(t,e.root,i,r);return new Nn(o,this.createQueryParams(e.queryParams,this.urlTree.queryParams),e.fragment)}createQueryParams(t,e){let i={};return Object.entries(t).forEach(([r,o])=>{if(typeof o=="string"&&o[0]===":"){let a=o.substring(1);i[r]=e[a]}else i[r]=o}),i}createSegmentGroup(t,e,i,r){let o=this.createSegments(t,e.segments,i,r),s={};return Object.entries(e.children).forEach(([a,l])=>{s[a]=this.createSegmentGroup(t,l,i,r)}),new Re(o,s)}createSegments(t,e,i,r){return e.map(o=>o.path[0]===":"?this.findPosParam(t,o,r):this.findOrReturn(o,i))}findPosParam(t,e,i){let r=i[e.path.substring(1)];if(!r)throw new x(4001,!1);return r}findOrReturn(t,e){let i=0;for(let r of e){if(r.path===t.path)return e.splice(i),r;i++}return t}};function HF(n,t,e){if(typeof n=="string")return Promise.resolve(n);let i=n;return zf(ss(zt(e,()=>i(t))))}function $F(n,t){return n.providers&&!n._injector&&(n._injector=Xl(n.providers,t,`Route: ${n.path}`)),n._injector??t}function wi(n){return n.outlet||me}function zF(n,t){let e=n.filter(i=>wi(i)===t);return e.push(...n.filter(i=>wi(i)!==t)),e}var Xv={matched:!1,consumedSegments:[],remainingSegments:[],parameters:{},positionalParamSegments:{}};function Mx(n){return{routeConfig:n.routeConfig,url:n.url,params:n.params,queryParams:n.queryParams,fragment:n.fragment,data:n.data,outlet:n.outlet,title:n.title,paramMap:n.paramMap,queryParamMap:n.queryParamMap}}function WF(n,t,e,i,r,o,s){let a=Ix(n,t,e);if(!a.matched)return A(a);let l=Mx(o(a));return i=$F(t,i),BF(i,t,e,r,l,s).pipe(ye(c=>c===!0?a:b({},Xv)))}function Ix(n,t,e){if(t.path==="")return t.pathMatch==="full"&&(n.hasChildren()||e.length>0)?b({},Xv):{matched:!0,consumedSegments:[],remainingSegments:e,parameters:{},positionalParamSegments:{}};let r=(t.matcher||JS)(e,n,t);if(!r)return b({},Xv);let o={};Object.entries(r.posParams??{}).forEach(([a,l])=>{o[a]=l.path});let s=r.consumed.length>0?b(b({},o),r.consumed[r.consumed.length-1].parameters):o;return{matched:!0,consumedSegments:r.consumed,remainingSegments:e.slice(r.consumed.length),parameters:s,positionalParamSegments:r.posParams??{}}}function XS(n,t,e,i,r){return e.length>0&&KF(n,e,i,r)?{segmentGroup:new Re(t,qF(i,new Re(e,n.children))),slicedSegments:[]}:e.length===0&&YF(n,e,i)?{segmentGroup:new Re(n.segments,GF(n,e,i,n.children)),slicedSegments:e}:{segmentGroup:new Re(n.segments,n.children),slicedSegments:e}}function GF(n,t,e,i){let r={};for(let o of e)if(cp(n,t,o)&&!i[wi(o)]){let s=new Re([],{});r[wi(o)]=s}return b(b({},i),r)}function qF(n,t){let e={};e[me]=t;for(let i of n)if(i.path===""&&wi(i)!==me){let r=new Re([],{});e[wi(i)]=r}return e}function KF(n,t,e,i){return e.some(r=>!cp(n,t,r)||!(wi(r)!==me)?!1:!(i!==void 0&&wi(r)===i))}function YF(n,t,e){return e.some(i=>cp(n,t,i))}function cp(n,t,e){return(n.hasChildren()||t.length>0)&&e.pathMatch==="full"?!1:e.path===""}function ZF(n,t,e){return t.length===0&&!n.children[e]}var Qv=class{};async function XF(n,t,e,i,r,o,s="emptyOnly",a){return new Jv(n,t,e,i,r,s,o,a).recognize()}var QF=31,Jv=class{injector;configLoader;rootComponentType;config;urlTree;paramsInheritanceStrategy;urlSerializer;abortSignal;applyRedirects;absoluteRedirectCount=0;allowRedirects=!0;constructor(t,e,i,r,o,s,a,l){this.injector=t,this.configLoader=e,this.rootComponentType=i,this.config=r,this.urlTree=o,this.paramsInheritanceStrategy=s,this.urlSerializer=a,this.abortSignal=l,this.applyRedirects=new Zv(this.urlSerializer,this.urlTree)}noMatchError(t){return new x(4002,`'${t.segmentGroup}'`)}async recognize(){let t=XS(this.urlTree.root,[],[],this.config).segmentGroup,{children:e,rootSnapshot:i}=await this.match(t),r=new Pn(i,e),o=new Cc("",r),s=ux(i,[],this.urlTree.queryParams,this.urlTree.fragment);return s.queryParams=this.urlTree.queryParams,o.url=this.urlSerializer.serialize(s),{state:o,tree:s}}async match(t){let e=new va([],Object.freeze({}),Object.freeze(b({},this.urlTree.queryParams)),this.urlTree.fragment,Object.freeze({}),me,this.rootComponentType,null,{},this.injector);try{return{children:await this.processSegmentGroup(this.injector,this.config,t,me,e),rootSnapshot:e}}catch(i){if(i instanceof Ec)return this.urlTree=i.urlTree,this.match(i.urlTree.root);throw i instanceof Dr?this.noMatchError(i):i}}async processSegmentGroup(t,e,i,r,o){if(i.segments.length===0&&i.hasChildren())return this.processChildren(t,e,i,o);let s=await this.processSegment(t,e,i,i.segments,r,!0,o);return s instanceof Pn?[s]:[]}async processChildren(t,e,i,r){let o=[];for(let l of Object.keys(i.children))l==="primary"?o.unshift(l):o.push(l);let s=[];for(let l of o){let c=i.children[l],d=zF(e,l),u=await this.processSegmentGroup(t,d,c,l,r);s.push(...u)}let a=kx(s);return JF(a),a}async processSegment(t,e,i,r,o,s,a){for(let l of e)try{return await this.processSegmentAgainstRoute(l._injector??t,e,l,i,r,o,s,a)}catch(c){if(c instanceof Dr||wx(c))continue;throw c}if(ZF(i,r,o))return new Qv;throw new Dr(i)}async processSegmentAgainstRoute(t,e,i,r,o,s,a,l){if(wi(i)!==s&&(s===me||!cp(r,o,i)))throw new Dr(r);if(i.redirectTo===void 0)return this.matchSegmentAgainstRoute(t,r,i,o,s,l);if(this.allowRedirects&&a)return this.expandSegmentAgainstRouteUsingRedirect(t,r,e,i,o,s,l);throw new Dr(r)}async expandSegmentAgainstRouteUsingRedirect(t,e,i,r,o,s,a){let{matched:l,parameters:c,consumedSegments:d,positionalParamSegments:u,remainingSegments:p}=Ix(e,r,o);if(!l)throw new Dr(e);typeof r.redirectTo=="string"&&r.redirectTo[0]==="/"&&(this.absoluteRedirectCount++,this.absoluteRedirectCount>QF&&(this.allowRedirects=!1));let g=this.createSnapshot(t,r,o,c,a);if(this.abortSignal.aborted)throw new Error(this.abortSignal.reason);let _=await this.applyRedirects.applyRedirectCommands(d,r.redirectTo,u,Mx(g),t),S=await this.applyRedirects.lineralizeSegments(r,_);return this.processSegment(t,i,e,S.concat(p),s,!1,a)}createSnapshot(t,e,i,r,o){let s=new va(i,r,Object.freeze(b({},this.urlTree.queryParams)),this.urlTree.fragment,tL(e),wi(e),e.component??e._loadedComponent??null,e,nL(e),t),a=e_(s,o,this.paramsInheritanceStrategy);return s.params=Object.freeze(a.params),s.data=Object.freeze(a.data),s}async matchSegmentAgainstRoute(t,e,i,r,o,s){if(this.abortSignal.aborted)throw new Error(this.abortSignal.reason);let a=it=>this.createSnapshot(t,i,it.consumedSegments,it.parameters,s),l=await zf(WF(e,i,r,t,this.urlSerializer,a,this.abortSignal));if(i.path==="**"&&(e.children={}),!l?.matched)throw new Dr(e);t=i._injector??t;let{routes:c}=await this.getChildConfig(t,i,r),d=i._loadedInjector??t,{parameters:u,consumedSegments:p,remainingSegments:g}=l,_=this.createSnapshot(t,i,p,u,s),{segmentGroup:S,slicedSegments:O}=XS(e,p,g,c,o);if(O.length===0&&S.hasChildren()){let it=await this.processChildren(d,c,S,_);return new Pn(_,it)}if(c.length===0&&O.length===0)return new Pn(_,[]);let V=wi(i)===o,Ee=await this.processSegment(d,c,S,O,V?me:o,!0,_);return new Pn(_,Ee instanceof Pn?[Ee]:[])}async getChildConfig(t,e,i){if(e.children)return{routes:e.children,injector:t};if(e.loadChildren){if(e._loadedRoutes!==void 0){let o=e._loadedNgModuleFactory;return o&&!e._loadedInjector&&(e._loadedInjector=o.create(t).injector),{routes:e._loadedRoutes,injector:e._loadedInjector}}if(this.abortSignal.aborted)throw new Error(this.abortSignal.reason);if(await zf(VF(t,e,i,this.urlSerializer,this.abortSignal))){let o=await this.configLoader.loadChildren(t,e);return e._loadedRoutes=o.routes,e._loadedInjector=o.injector,e._loadedNgModuleFactory=o.factory,o}throw UF(e)}return{routes:[],injector:t}}};function JF(n){n.sort((t,e)=>t.value.outlet===me?-1:e.value.outlet===me?1:t.value.outlet.localeCompare(e.value.outlet))}function eL(n){let t=n.value.routeConfig;return t&&t.path===""}function kx(n){let t=[],e=new Set;for(let i of n){if(!eL(i)){t.push(i);continue}let r=t.find(o=>i.value.routeConfig===o.value.routeConfig);r!==void 0?(r.children.push(...i.children),e.add(r)):t.push(i)}for(let i of e){let r=kx(i.children);t.push(new Pn(i.value,r))}return t.filter(i=>!e.has(i))}function tL(n){return n.data||{}}function nL(n){return n.resolve||{}}function iL(n,t,e,i,r,o,s){return Qt(async a=>{let{state:l,tree:c}=await XF(n,t,e,i,a.extractedUrl,r,o,s);return $(b({},a),{targetSnapshot:l,urlAfterRedirects:c})})}function rL(n){return Qt(t=>{let{targetSnapshot:e,guards:{canActivateChecks:i}}=t;if(!i.length)return A(t);let r=new Set(i.map(a=>a.route)),o=new Set;for(let a of r)if(!o.has(a))for(let l of Ax(a))o.add(l);let s=0;return Xe(o).pipe(Kd(a=>r.has(a)?oL(a,e,n):(a.data=e_(a,a.parent,n).resolve,A(void 0))),wt(()=>s++),Yd(1),Qt(a=>s===o.size?A(t):He))})}function Ax(n){let t=n.children.map(e=>Ax(e)).flat();return[n,...t]}function oL(n,t,e){let i=n.routeConfig,r=n._resolve;return i?.title!==void 0&&!_x(i)&&(r[wc]=i.title),ko(()=>(n.data=e_(n,n.parent,e).resolve,sL(r,n,t).pipe(ye(o=>(n._resolvedData=o,n.data=b(b({},n.data),o),null)))))}function sL(n,t,e){let i=jv(n);if(i.length===0)return A({});let r={};return Xe(i).pipe(Qt(o=>aL(n[o],t,e).pipe(tr(),wt(s=>{if(s instanceof _a)throw op(new oo,s);r[o]=s}))),Yd(1),ye(()=>r),Ji(o=>wx(o)?He:lm(o)))}function aL(n,t,e){let i=t._environmentInjector,r=Ea(n,i),o=r.resolve?r.resolve(t,e):zt(i,()=>r(t,e));return ss(o)}function QS(n){return ut(t=>{let e=n(t);return e?Xe(e).pipe(ye(()=>t)):A(t)})}var r_=(()=>{class n{buildTitle(e){let i,r=e.root;for(;r!==void 0;)i=this.getResolvedTitleForRoute(r)??i,r=r.children.find(o=>o.outlet===me);return i}getResolvedTitleForRoute(e){return e.data[wc]}static \u0275fac=function(i){return new(i||n)};static \u0275prov=D({token:n,factory:()=>f(Ox),providedIn:"root"})}return n})(),Ox=(()=>{class n extends r_{title;constructor(e){super(),this.title=e}updateTitle(e){let i=this.buildTitle(e);i!==void 0&&this.title.setTitle(i)}static \u0275fac=function(i){return new(i||n)(se(WS))};static \u0275prov=D({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})(),wa=new C("",{factory:()=>({})}),Tc=new C(""),Rx=(()=>{class n{componentLoaders=new WeakMap;childrenLoaders=new WeakMap;onLoadStartListener;onLoadEndListener;compiler=f(Xy);async loadComponent(e,i){if(this.componentLoaders.get(i))return this.componentLoaders.get(i);if(i._loadedComponent)return Promise.resolve(i._loadedComponent);this.onLoadStartListener&&this.onLoadStartListener(i);let r=(async()=>{try{let o=await tx(zt(e,()=>i.loadComponent())),s=await Fx(Nx(o));return this.onLoadEndListener&&this.onLoadEndListener(i),i._loadedComponent=s,s}finally{this.componentLoaders.delete(i)}})();return this.componentLoaders.set(i,r),r}loadChildren(e,i){if(this.childrenLoaders.get(i))return this.childrenLoaders.get(i);if(i._loadedRoutes)return Promise.resolve({routes:i._loadedRoutes,injector:i._loadedInjector});this.onLoadStartListener&&this.onLoadStartListener(i);let r=(async()=>{try{let o=await Px(i,this.compiler,e,this.onLoadEndListener);return i._loadedRoutes=o.routes,i._loadedInjector=o.injector,i._loadedNgModuleFactory=o.factory,o}finally{this.childrenLoaders.delete(i)}})();return this.childrenLoaders.set(i,r),r}static \u0275fac=function(i){return new(i||n)};static \u0275prov=D({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})();async function Px(n,t,e,i){let r=await tx(zt(e,()=>n.loadChildren())),o=await Fx(Nx(r)),s;o instanceof ff||Array.isArray(o)?s=o:s=await t.compileModuleAsync(o),i&&i(n);let a,l,c=!1,d;return Array.isArray(s)?(l=s,c=!0):(a=s.create(e).injector,d=s,l=a.get(Tc,[],{optional:!0,self:!0}).flat()),{routes:l.map(i_),injector:a,factory:d}}function lL(n){return n&&typeof n=="object"&&"default"in n}function Nx(n){return lL(n)?n.default:n}async function Fx(n){return n}var dp=(()=>{class n{static \u0275fac=function(i){return new(i||n)};static \u0275prov=D({token:n,factory:()=>f(cL),providedIn:"root"})}return n})(),cL=(()=>{class n{shouldProcessUrl(e){return!0}extract(e){return e}merge(e,i){return e}static \u0275fac=function(i){return new(i||n)};static \u0275prov=D({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})(),Lx=new C("");var dL=()=>{},Vx=new C(""),Bx=(()=>{class n{currentNavigation=P(null,{equal:()=>!1});currentTransition=null;lastSuccessfulNavigation=P(null);events=new E;transitionAbortWithErrorSubject=new E;configLoader=f(Rx);environmentInjector=f(We);destroyRef=f(at);urlSerializer=f(Ca);rootContexts=f(Da);location=f(br);inputBindingEnabled=f(lp,{optional:!0})!==null;titleStrategy=f(r_);options=f(wa,{optional:!0})||{};paramsInheritanceStrategy=this.options.paramsInheritanceStrategy||"emptyOnly";urlHandlingStrategy=f(dp);createViewTransition=f(Lx,{optional:!0});navigationErrorHandler=f(Vx,{optional:!0});navigationId=0;get hasRequestedNavigation(){return this.navigationId!==0}transitions;afterPreactivation=()=>A(void 0);rootComponentType=null;destroyed=!1;constructor(){let e=r=>this.events.next(new Xf(r)),i=r=>this.events.next(new Qf(r));this.configLoader.onLoadEndListener=i,this.configLoader.onLoadStartListener=e,this.destroyRef.onDestroy(()=>{this.destroyed=!0})}complete(){this.transitions?.complete()}handleNavigationRequest(e){let i=++this.navigationId;Ae(()=>{this.transitions?.next($(b({},e),{extractedUrl:this.urlHandlingStrategy.extract(e.rawUrl),targetSnapshot:null,targetRouterState:null,guards:{canActivateChecks:[],canDeactivateChecks:[]},guardsResult:null,id:i,routesRecognizeHandler:{},beforeActivateHandler:{}}))})}setupNavigations(e){return this.transitions=new ot(null),this.transitions.pipe(Ce(i=>i!==null),ut(i=>{let r=!1,o=new AbortController,s=()=>!r&&this.currentTransition?.id===i.id;return A(i).pipe(ut(a=>{if(this.navigationId>i.id)return this.cancelNavigationTransition(i,"",Kt.SupersededByNewNavigation),He;this.currentTransition=i;let l=this.lastSuccessfulNavigation();this.currentNavigation.set({id:a.id,initialUrl:a.rawUrl,extractedUrl:a.extractedUrl,targetBrowserUrl:typeof a.extras.browserUrl=="string"?this.urlSerializer.parse(a.extras.browserUrl):a.extras.browserUrl,trigger:a.source,extras:a.extras,previousNavigation:l?$(b({},l),{previousNavigation:null}):null,abort:()=>o.abort(),routesRecognizeHandler:a.routesRecognizeHandler,beforeActivateHandler:a.beforeActivateHandler});let c=!e.navigated||this.isUpdatingInternalState()||this.isUpdatedBrowserUrl(),d=a.extras.onSameUrlNavigation??e.onSameUrlNavigation;if(!c&&d!=="reload")return this.events.next(new Er(a.id,this.urlSerializer.serialize(a.rawUrl),"",yc.IgnoredSameUrlNavigation)),a.resolve(!1),He;if(this.urlHandlingStrategy.shouldProcessUrl(a.rawUrl))return A(a).pipe(ut(u=>(this.events.next(new rs(u.id,this.urlSerializer.serialize(u.extractedUrl),u.source,u.restoredState)),u.id!==this.navigationId?He:Promise.resolve(u))),iL(this.environmentInjector,this.configLoader,this.rootComponentType,e.config,this.urlSerializer,this.paramsInheritanceStrategy,o.signal),wt(u=>{i.targetSnapshot=u.targetSnapshot,i.urlAfterRedirects=u.urlAfterRedirects,this.currentNavigation.update(p=>(p.finalUrl=u.urlAfterRedirects,p)),this.events.next(new _c)}),ut(u=>Xe(i.routesRecognizeHandler.deferredHandle??A(void 0)).pipe(ye(()=>u))),wt(()=>{let u=new vc(a.id,this.urlSerializer.serialize(a.extractedUrl),this.urlSerializer.serialize(a.urlAfterRedirects),a.targetSnapshot);this.events.next(u)}));if(c&&this.urlHandlingStrategy.shouldProcessUrl(a.currentRawUrl)){let{id:u,extractedUrl:p,source:g,restoredState:_,extras:S}=a,O=new rs(u,this.urlSerializer.serialize(p),g,_);this.events.next(O);let V=yx(this.rootComponentType,this.environmentInjector).snapshot;return this.currentTransition=i=$(b({},a),{targetSnapshot:V,urlAfterRedirects:p,extras:$(b({},S),{skipLocationChange:!1,replaceUrl:!1})}),this.currentNavigation.update(Ee=>(Ee.finalUrl=p,Ee)),A(i)}else return this.events.next(new Er(a.id,this.urlSerializer.serialize(a.extractedUrl),"",yc.IgnoredByUrlHandlingStrategy)),a.resolve(!1),He}),ye(a=>{let l=new qf(a.id,this.urlSerializer.serialize(a.extractedUrl),this.urlSerializer.serialize(a.urlAfterRedirects),a.targetSnapshot);return this.events.next(l),this.currentTransition=i=$(b({},a),{guards:_F(a.targetSnapshot,a.currentSnapshot,this.rootContexts)}),i}),kF(a=>this.events.next(a)),ut(a=>{if(i.guardsResult=a.guardsResult,a.guardsResult&&typeof a.guardsResult!="boolean")throw op(this.urlSerializer,a.guardsResult);let l=new Kf(a.id,this.urlSerializer.serialize(a.extractedUrl),this.urlSerializer.serialize(a.urlAfterRedirects),a.targetSnapshot,!!a.guardsResult);if(this.events.next(l),!s())return He;if(!a.guardsResult)return this.cancelNavigationTransition(a,"",Kt.GuardRejected),He;if(a.guards.canActivateChecks.length===0)return A(a);let c=new Yf(a.id,this.urlSerializer.serialize(a.extractedUrl),this.urlSerializer.serialize(a.urlAfterRedirects),a.targetSnapshot);if(this.events.next(c),!s())return He;let d=!1;return A(a).pipe(rL(this.paramsInheritanceStrategy),wt({next:()=>{d=!0;let u=new Zf(a.id,this.urlSerializer.serialize(a.extractedUrl),this.urlSerializer.serialize(a.urlAfterRedirects),a.targetSnapshot);this.events.next(u)},complete:()=>{d||this.cancelNavigationTransition(a,"",Kt.NoDataFromResolver)}}))}),QS(a=>{let l=d=>{let u=[];if(d.routeConfig?._loadedComponent)d.component=d.routeConfig?._loadedComponent;else if(d.routeConfig?.loadComponent){let p=d._environmentInjector;u.push(this.configLoader.loadComponent(p,d.routeConfig).then(g=>{d.component=g}))}for(let p of d.children)u.push(...l(p));return u},c=l(a.targetSnapshot.root);return c.length===0?A(a):Xe(Promise.all(c).then(()=>a))}),QS(()=>this.afterPreactivation()),ut(()=>{let{currentSnapshot:a,targetSnapshot:l}=i,c=this.createViewTransition?.(this.environmentInjector,a.root,l.root);return c?Xe(c).pipe(ye(()=>i)):A(i)}),yt(1),ut(a=>{let l=mF(e.routeReuseStrategy,a.targetSnapshot,a.currentRouterState);this.currentTransition=i=a=$(b({},a),{targetRouterState:l}),this.currentNavigation.update(d=>(d.targetRouterState=l,d)),this.events.next(new ga);let c=i.beforeActivateHandler.deferredHandle;return c?Xe(c.then(()=>a)):A(a)}),wt(a=>{new Yv(e.routeReuseStrategy,i.targetRouterState,i.currentRouterState,l=>this.events.next(l),this.inputBindingEnabled).activate(this.rootContexts),s()&&(r=!0,this.currentNavigation.update(l=>(l.abort=dL,l)),this.lastSuccessfulNavigation.set(Ae(this.currentNavigation)),this.events.next(new zi(a.id,this.urlSerializer.serialize(a.extractedUrl),this.urlSerializer.serialize(a.urlAfterRedirects))),this.titleStrategy?.updateTitle(a.targetRouterState.snapshot),a.resolve(!0))}),ne(Sx(o.signal).pipe(Ce(()=>!r&&!i.targetRouterState),wt(()=>{this.cancelNavigationTransition(i,o.signal.reason+"",Kt.Aborted)}))),wt({complete:()=>{r=!0}}),ne(this.transitionAbortWithErrorSubject.pipe(wt(a=>{throw a}))),cm(()=>{o.abort(),r||this.cancelNavigationTransition(i,"",Kt.SupersededByNewNavigation),this.currentTransition?.id===i.id&&(this.currentNavigation.set(null),this.currentTransition=null)}),Ji(a=>{if(r=!0,this.destroyed)return i.resolve(!1),He;if(Ex(a))this.events.next(new Qn(i.id,this.urlSerializer.serialize(i.extractedUrl),a.message,a.cancellationCode)),vF(a)?this.events.next(new ya(a.url,a.navigationBehaviorOptions)):i.resolve(!1);else{let l=new os(i.id,this.urlSerializer.serialize(i.extractedUrl),a,i.targetSnapshot??void 0);try{let c=zt(this.environmentInjector,()=>this.navigationErrorHandler?.(l));if(c instanceof _a){let{message:d,cancellationCode:u}=op(this.urlSerializer,c);this.events.next(new Qn(i.id,this.urlSerializer.serialize(i.extractedUrl),d,u)),this.events.next(new ya(c.redirectTo,c.navigationBehaviorOptions))}else throw this.events.next(l),a}catch(c){this.options.resolveNavigationPromiseOnError?i.resolve(!1):i.reject(c)}}return He}))}))}cancelNavigationTransition(e,i,r){let o=new Qn(e.id,this.urlSerializer.serialize(e.extractedUrl),i,r);this.events.next(o),e.resolve(!1)}isUpdatingInternalState(){return this.currentTransition?.extractedUrl.toString()!==this.currentTransition?.currentUrlTree.toString()}isUpdatedBrowserUrl(){let e=this.urlHandlingStrategy.extract(this.urlSerializer.parse(this.location.path(!0))),i=Ae(this.currentNavigation),r=i?.targetBrowserUrl??i?.extractedUrl;return e.toString()!==r?.toString()&&!i?.extras.skipLocationChange}static \u0275fac=function(i){return new(i||n)};static \u0275prov=D({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})();function uL(n){return n!==hc}var jx=new C("");var Ux=(()=>{class n{static \u0275fac=function(i){return new(i||n)};static \u0275prov=D({token:n,factory:()=>f(fL),providedIn:"root"})}return n})(),ap=class{shouldDetach(t){return!1}store(t,e){}shouldAttach(t){return!1}retrieve(t){return null}shouldReuseRoute(t,e){return t.routeConfig===e.routeConfig}shouldDestroyInjector(t){return!0}},fL=(()=>{class n extends ap{static \u0275fac=(()=>{let e;return function(r){return(e||(e=mn(n)))(r||n)}})();static \u0275prov=D({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})(),up=(()=>{class n{urlSerializer=f(Ca);options=f(wa,{optional:!0})||{};canceledNavigationResolution=this.options.canceledNavigationResolution||"replace";location=f(br);urlHandlingStrategy=f(dp);urlUpdateStrategy=this.options.urlUpdateStrategy||"deferred";currentUrlTree=new Nn;getCurrentUrlTree(){return this.currentUrlTree}rawUrlTree=this.currentUrlTree;getRawUrlTree(){return this.rawUrlTree}createBrowserPath({finalUrl:e,initialUrl:i,targetBrowserUrl:r}){let o=e!==void 0?this.urlHandlingStrategy.merge(e,i):i,s=r??o;return s instanceof Nn?this.urlSerializer.serialize(s):s}routerUrlState(e){return e?.targetBrowserUrl===void 0||e?.finalUrl===void 0?{}:{\u0275routerUrl:this.urlSerializer.serialize(e.finalUrl)}}commitTransition({targetRouterState:e,finalUrl:i,initialUrl:r}){i&&e?(this.currentUrlTree=i,this.rawUrlTree=this.urlHandlingStrategy.merge(i,r),this.routerState=e):this.rawUrlTree=r}routerState=yx(null,f(We));getRouterState(){return this.routerState}_stateMemento=this.createStateMemento();get stateMemento(){return this._stateMemento}updateStateMemento(){this._stateMemento=this.createStateMemento()}createStateMemento(){return{rawUrlTree:this.rawUrlTree,currentUrlTree:this.currentUrlTree,routerState:this.routerState}}restoredState(){return this.location.getState()}static \u0275fac=function(i){return new(i||n)};static \u0275prov=D({token:n,factory:()=>f(pL),providedIn:"root"})}return n})(),pL=(()=>{class n extends up{currentPageId=0;lastSuccessfulId=-1;get browserPageId(){return this.canceledNavigationResolution!=="computed"?this.currentPageId:this.restoredState()?.\u0275routerPageId??this.currentPageId}registerNonRouterCurrentEntryChangeListener(e){return this.location.subscribe(i=>{i.type==="popstate"&&setTimeout(()=>{e(i.url,i.state,"popstate",{replaceUrl:!0})})})}handleRouterEvent(e,i){e instanceof rs?this.updateStateMemento():e instanceof Er?this.commitTransition(i):e instanceof vc?this.urlUpdateStrategy==="eager"&&(i.extras.skipLocationChange||this.setBrowserUrl(this.createBrowserPath(i),i)):e instanceof ga?(this.commitTransition(i),this.urlUpdateStrategy==="deferred"&&!i.extras.skipLocationChange&&this.setBrowserUrl(this.createBrowserPath(i),i)):e instanceof Qn&&!gx(e)?this.restoreHistory(i):e instanceof os?this.restoreHistory(i,!0):e instanceof zi&&(this.lastSuccessfulId=e.id,this.currentPageId=this.browserPageId)}setBrowserUrl(e,i){let{extras:r,id:o}=i,{replaceUrl:s,state:a}=r;if(this.location.isCurrentPathEqualTo(e)||s){let l=this.browserPageId,c=b(b({},a),this.generateNgRouterState(o,l,i));this.location.replaceState(e,"",c)}else{let l=b(b({},a),this.generateNgRouterState(o,this.browserPageId+1,i));this.location.go(e,"",l)}}restoreHistory(e,i=!1){if(this.canceledNavigationResolution==="computed"){let r=this.browserPageId,o=this.currentPageId-r;o!==0?this.location.historyGo(o):this.getCurrentUrlTree()===e.finalUrl&&o===0&&(this.resetInternalState(e),this.resetUrlToCurrentUrlTree())}else this.canceledNavigationResolution==="replace"&&(i&&this.resetInternalState(e),this.resetUrlToCurrentUrlTree())}resetInternalState({finalUrl:e}){this.routerState=this.stateMemento.routerState,this.currentUrlTree=this.stateMemento.currentUrlTree,this.rawUrlTree=this.urlHandlingStrategy.merge(this.currentUrlTree,e??this.rawUrlTree)}resetUrlToCurrentUrlTree(){this.location.replaceState(this.urlSerializer.serialize(this.getRawUrlTree()),"",this.generateNgRouterState(this.lastSuccessfulId,this.currentPageId))}generateNgRouterState(e,i,r){return this.canceledNavigationResolution==="computed"?b({navigationId:e,\u0275routerPageId:i},this.routerUrlState(r)):b({navigationId:e},this.routerUrlState(r))}static \u0275fac=(()=>{let e;return function(r){return(e||(e=mn(n)))(r||n)}})();static \u0275prov=D({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})();function o_(n,t){n.events.pipe(Ce(e=>e instanceof zi||e instanceof Qn||e instanceof os||e instanceof Er),ye(e=>e instanceof zi||e instanceof Er?0:(e instanceof Qn?e.code===Kt.Redirect||e.code===Kt.SupersededByNewNavigation:!1)?2:1),Ce(e=>e!==2),yt(1)).subscribe(()=>{t()})}var Sa=(()=>{class n{get currentUrlTree(){return this.stateManager.getCurrentUrlTree()}get rawUrlTree(){return this.stateManager.getRawUrlTree()}disposed=!1;nonRouterCurrentEntryChangeSubscription;console=f(pf);stateManager=f(up);options=f(wa,{optional:!0})||{};pendingTasks=f(Xr);urlUpdateStrategy=this.options.urlUpdateStrategy||"deferred";navigationTransitions=f(Bx);urlSerializer=f(Ca);location=f(br);urlHandlingStrategy=f(dp);injector=f(We);_events=new E;get events(){return this._events}get routerState(){return this.stateManager.getRouterState()}navigated=!1;routeReuseStrategy=f(Ux);injectorCleanup=f(jx,{optional:!0});onSameUrlNavigation=this.options.onSameUrlNavigation||"ignore";config=f(Tc,{optional:!0})?.flat()??[];componentInputBindingEnabled=!!f(lp,{optional:!0});currentNavigation=this.navigationTransitions.currentNavigation.asReadonly();constructor(){this.resetConfig(this.config),this.navigationTransitions.setupNavigations(this).subscribe({error:e=>{}}),this.subscribeToNavigationEvents()}eventsSubscription=new Z;subscribeToNavigationEvents(){let e=this.navigationTransitions.events.subscribe(i=>{try{let r=this.navigationTransitions.currentTransition,o=Ae(this.navigationTransitions.currentNavigation);if(r!==null&&o!==null){if(this.stateManager.handleRouterEvent(i,o),i instanceof Qn&&i.code!==Kt.Redirect&&i.code!==Kt.SupersededByNewNavigation)this.navigated=!0;else if(i instanceof zi)this.navigated=!0,this.injectorCleanup?.(this.routeReuseStrategy,this.routerState,this.config);else if(i instanceof ya){let s=i.navigationBehaviorOptions,a=this.urlHandlingStrategy.merge(i.url,r.currentRawUrl),l=b({scroll:r.extras.scroll,browserUrl:r.extras.browserUrl,info:r.extras.info,skipLocationChange:r.extras.skipLocationChange,replaceUrl:r.extras.replaceUrl||this.urlUpdateStrategy==="eager"||uL(r.source)},s);this.scheduleNavigation(a,hc,null,l,{resolve:r.resolve,reject:r.reject,promise:r.promise})}}pF(i)&&this._events.next(i)}catch(r){this.navigationTransitions.transitionAbortWithErrorSubject.next(r)}});this.eventsSubscription.add(e)}resetRootComponentType(e){this.routerState.root.component=e,this.navigationTransitions.rootComponentType=e}initialNavigation(){this.setUpLocationChangeListener(),this.navigationTransitions.hasRequestedNavigation||this.navigateToSyncWithBrowser(this.location.path(!0),hc,this.stateManager.restoredState(),{replaceUrl:!0})}setUpLocationChangeListener(){this.nonRouterCurrentEntryChangeSubscription??=this.stateManager.registerNonRouterCurrentEntryChangeListener((e,i,r,o)=>{this.navigateToSyncWithBrowser(e,r,i,o)})}navigateToSyncWithBrowser(e,i,r,o){let s=r?.navigationId?r:null,a=r?.\u0275routerUrl??e;if(r?.\u0275routerUrl&&(o=$(b({},o),{browserUrl:e})),r){let c=b({},r);delete c.navigationId,delete c.\u0275routerPageId,delete c.\u0275routerUrl,Object.keys(c).length!==0&&(o.state=c)}let l=this.parseUrl(a);this.scheduleNavigation(l,i,s,o).catch(c=>{this.disposed||this.injector.get(qn)(c)})}get url(){return this.serializeUrl(this.currentUrlTree)}getCurrentNavigation(){return Ae(this.navigationTransitions.currentNavigation)}get lastSuccessfulNavigation(){return this.navigationTransitions.lastSuccessfulNavigation}resetConfig(e){this.config=e.map(i_),this.navigated=!1}ngOnDestroy(){this.dispose()}dispose(){this._events.unsubscribe(),this.navigationTransitions.complete(),this.nonRouterCurrentEntryChangeSubscription?.unsubscribe(),this.nonRouterCurrentEntryChangeSubscription=void 0,this.disposed=!0,this.eventsSubscription.unsubscribe()}createUrlTree(e,i={}){let{relativeTo:r,queryParams:o,fragment:s,queryParamsHandling:a,preserveFragment:l}=i,c=l?this.currentUrlTree.fragment:s,d=null;switch(a??this.options.defaultQueryParamsHandling){case"merge":d=b(b({},this.currentUrlTree.queryParams),o);break;case"preserve":d=this.currentUrlTree.queryParams;break;default:d=o||null}d!==null&&(d=this.removeEmptyProps(d));let u;try{let p=r?r.snapshot:this.routerState.snapshot.root;u=fx(p)}catch{(typeof e[0]!="string"||e[0][0]!=="/")&&(e=[]),u=this.currentUrlTree.root}return px(u,e,d,c??null,this.urlSerializer)}navigateByUrl(e,i={skipLocationChange:!1}){let r=so(e)?e:this.parseUrl(e),o=this.urlHandlingStrategy.merge(r,this.rawUrlTree);return this.scheduleNavigation(o,hc,null,i)}navigate(e,i={skipLocationChange:!1}){return hL(e),this.navigateByUrl(this.createUrlTree(e,i),i)}serializeUrl(e){return this.urlSerializer.serialize(e)}parseUrl(e){try{return this.urlSerializer.parse(e)}catch{return this.console.warn(rr(4018,!1)),this.urlSerializer.parse("/")}}isActive(e,i){let r;if(i===!0?r=b({},ix):i===!1?r=b({},Uv):r=b(b({},Uv),i),so(e))return GS(this.currentUrlTree,e,r);let o=this.parseUrl(e);return GS(this.currentUrlTree,o,r)}removeEmptyProps(e){return Object.entries(e).reduce((i,[r,o])=>(o!=null&&(i[r]=o),i),{})}scheduleNavigation(e,i,r,o,s){if(this.disposed)return Promise.resolve(!1);let a,l,c;s?(a=s.resolve,l=s.reject,c=s.promise):c=new Promise((u,p)=>{a=u,l=p});let d=this.pendingTasks.add();return o_(this,()=>{queueMicrotask(()=>this.pendingTasks.remove(d))}),this.navigationTransitions.handleNavigationRequest({source:i,restoredState:r,currentUrlTree:this.currentUrlTree,currentRawUrl:this.currentUrlTree,rawUrl:e,extras:o,resolve:a,reject:l,promise:c,currentSnapshot:this.routerState.snapshot,currentRouterState:this.routerState}),c.catch(Promise.reject.bind(Promise))}static \u0275fac=function(i){return new(i||n)};static \u0275prov=D({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})();function hL(n){for(let t=0;t<n.length;t++)if(n[t]==null)throw new x(4008,!1)}var yL=(()=>{class n{router=f(Sa);stateManager=f(up);fragment=P("");queryParams=P({});path=P("");serializer=f(Ca);constructor(){this.updateState(),this.router.events?.subscribe(e=>{e instanceof zi&&this.updateState()})}updateState(){let{fragment:e,root:i,queryParams:r}=this.stateManager.getCurrentUrlTree();this.fragment.set(e),this.queryParams.set(r),this.path.set(this.serializer.serialize(new Nn(i)))}static \u0275fac=function(i){return new(i||n)};static \u0275prov=D({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})(),fp=(()=>{class n{router;route;tabIndexAttribute;renderer;el;locationStrategy;hrefAttributeValue=f(new Jo("href"),{optional:!0});reactiveHref=ev(()=>this.isAnchorElement?this.computeHref(this._urlTree()):this.hrefAttributeValue);get href(){return Ae(this.reactiveHref)}set href(e){this.reactiveHref.set(e)}set target(e){this._target.set(e)}get target(){return Ae(this._target)}_target=P(void 0);set queryParams(e){this._queryParams.set(e)}get queryParams(){return Ae(this._queryParams)}_queryParams=P(void 0,{equal:()=>!1});set fragment(e){this._fragment.set(e)}get fragment(){return Ae(this._fragment)}_fragment=P(void 0);set queryParamsHandling(e){this._queryParamsHandling.set(e)}get queryParamsHandling(){return Ae(this._queryParamsHandling)}_queryParamsHandling=P(void 0);set state(e){this._state.set(e)}get state(){return Ae(this._state)}_state=P(void 0,{equal:()=>!1});set info(e){this._info.set(e)}get info(){return Ae(this._info)}_info=P(void 0,{equal:()=>!1});set relativeTo(e){this._relativeTo.set(e)}get relativeTo(){return Ae(this._relativeTo)}_relativeTo=P(void 0);set preserveFragment(e){this._preserveFragment.set(e)}get preserveFragment(){return Ae(this._preserveFragment)}_preserveFragment=P(!1);set skipLocationChange(e){this._skipLocationChange.set(e)}get skipLocationChange(){return Ae(this._skipLocationChange)}_skipLocationChange=P(!1);set replaceUrl(e){this._replaceUrl.set(e)}get replaceUrl(){return Ae(this._replaceUrl)}_replaceUrl=P(!1);isAnchorElement;onChanges=new E;applicationErrorHandler=f(qn);options=f(wa,{optional:!0});reactiveRouterState=f(yL);constructor(e,i,r,o,s,a){this.router=e,this.route=i,this.tabIndexAttribute=r,this.renderer=o,this.el=s,this.locationStrategy=a;let l=s.nativeElement.tagName?.toLowerCase();this.isAnchorElement=l==="a"||l==="area"||!!(typeof customElements=="object"&&customElements.get(l)?.observedAttributes?.includes?.("href"))}setTabIndexIfNotOnNativeEl(e){this.tabIndexAttribute!=null||this.isAnchorElement||this.applyAttributeValue("tabindex",e)}ngOnChanges(e){this.onChanges.next(this)}routerLinkInput=P(null);set routerLink(e){e==null?(this.routerLinkInput.set(null),this.setTabIndexIfNotOnNativeEl(null)):(so(e)?this.routerLinkInput.set(e):this.routerLinkInput.set(Array.isArray(e)?e:[e]),this.setTabIndexIfNotOnNativeEl("0"))}onClick(e,i,r,o,s){let a=this._urlTree();if(a===null||this.isAnchorElement&&(e!==0||i||r||o||s||typeof this.target=="string"&&this.target!="_self"))return!0;let l={skipLocationChange:this.skipLocationChange,replaceUrl:this.replaceUrl,state:this.state,info:this.info};return this.router.navigateByUrl(a,l)?.catch(c=>{this.applicationErrorHandler(c)}),!this.isAnchorElement}ngOnDestroy(){}applyAttributeValue(e,i){let r=this.renderer,o=this.el.nativeElement;i!==null?r.setAttribute(o,e,i):r.removeAttribute(o,e)}_urlTree=L(()=>{this.reactiveRouterState.path(),this._preserveFragment()&&this.reactiveRouterState.fragment();let e=r=>r==="preserve"||r==="merge";(e(this._queryParamsHandling())||e(this.options?.defaultQueryParamsHandling))&&this.reactiveRouterState.queryParams();let i=this.routerLinkInput();return i===null||!this.router.createUrlTree?null:so(i)?i:this.router.createUrlTree(i,{relativeTo:this._relativeTo()!==void 0?this._relativeTo():this.route,queryParams:this._queryParams(),fragment:this._fragment(),queryParamsHandling:this._queryParamsHandling(),preserveFragment:this._preserveFragment()})},{equal:(e,i)=>this.computeHref(e)===this.computeHref(i)});get urlTree(){return Ae(this._urlTree)}computeHref(e){return e!==null&&this.locationStrategy?this.locationStrategy?.prepareExternalUrl(this.router.serializeUrl(e))??"":null}static \u0275fac=function(i){return new(i||n)(et(Sa),et(wr),zl("tabindex"),et(vt),et(Q),et(Ui))};static \u0275dir=ie({type:n,selectors:[["","routerLink",""]],hostVars:2,hostBindings:function(i,r){i&1&&K("click",function(s){return r.onClick(s.button,s.ctrlKey,s.shiftKey,s.altKey,s.metaKey)}),i&2&&Fe("href",r.reactiveHref(),wy)("target",r._target())},inputs:{target:"target",queryParams:"queryParams",fragment:"fragment",queryParamsHandling:"queryParamsHandling",state:"state",info:"info",relativeTo:"relativeTo",preserveFragment:[2,"preserveFragment","preserveFragment",de],skipLocationChange:[2,"skipLocationChange","skipLocationChange",de],replaceUrl:[2,"replaceUrl","replaceUrl",de],routerLink:"routerLink"},features:[It]})}return n})();var vL=new C("");function s_(n,...t){return ar([{provide:Tc,multi:!0,useValue:n},[],{provide:wr,useFactory:_L},{provide:mf,multi:!0,useFactory:CL},t.map(e=>e.\u0275providers)])}function _L(){return f(Sa).routerState.root}function bL(n,t){return{\u0275kind:n,\u0275providers:t}}function CL(){let n=f(le);return t=>{let e=n.get(rn);if(t!==e.components[0])return;let i=n.get(Sa),r=n.get(DL);n.get(EL)===1&&i.initialNavigation(),n.get(wL,null,{optional:!0})?.setUpPreloading(),n.get(vL,null,{optional:!0})?.init(),i.resetRootComponentType(e.componentTypes[0]),r.closed||(r.next(),r.complete(),r.unsubscribe())}}var DL=new C("",{factory:()=>new E}),EL=new C("",{factory:()=>1});var wL=new C("");function a_(){return bL(6,[{provide:Ui,useClass:mv}])}var as=(n,t)=>{if(typeof globalThis>"u")return;let e=globalThis.sdux??={},i=e.versions??={};i[n]!==t&&(i[n]=t)};var H={CoreAfterTap:"coreAfterTap",CoreBeforeTap:"coreBeforeTap",CoreError:"coreError",CoreErrorCallback:"coreErrorCallback",CoreState:"coreState",Encrypt:"encrypt",CoreEmitState:"coreEmitState",CoreLicense:"coreLicense",ErrorTransform:"errorTransform",Extension:"extension",Filter:"filter",FromObservable:"fromObservable",FromPromise:"fromPromise",FromStream:"fromStream",Interceptor:"interceptor",Merge:"merge",Operator:"operator",Persist:"persist",Reduce:"reduce",Resolve:"resolve",StepwiseFilter:"stepwiseFilter",StepwiseReducer:"stepwiseReducer",StepwiseResolve:"stepwiseResolve",TabSyncState:"tabSyncState"};var Mc={Error:"error",Warn:"warn",Log:"log",Debug:"debug"};var l_={Off:"off",Error:"error",Warn:"warn",Log:"log",Debug:"debug"};var SL=l_.Off,xL="[vault]";function c_(n,...t){let e=Hx();if(e===l_.Off)return;let i=[Mc.Error,Mc.Warn,Mc.Log,Mc.Debug];i.indexOf(n)<=i.indexOf(e)&&console[n](xL,...t)}var ls=(...n)=>c_("error",...n),te=(...n)=>c_("warn",...n);var T=(...n)=>c_("debug",...n);function Hx(){return SL}var Ic=class{constructor(t,e){this.behaviorCtx=e;this.key=t}critical;key;type=H.CoreErrorCallback;destroy(){te(`${this.key} - destroy "noop"`)}reset(){te(`${this.key} - reset "noop"`)}};function Oe(n){try{return JSON.stringify(n,TL,2)}catch{return"[unserializable]"}}function TL(n,t){if(typeof t=="function")return"[Function]";if(t instanceof Error)return{message:t.message,stack:t.stack};if(t instanceof Map)return{map:Array.from(t.entries())};if(t instanceof Set)return{set:Array.from(t.values())};try{return JSON.stringify(t),t}catch{return"[Circular]"}}var $x=Symbol.for("BEHAVIOR_META");var xa="vault::devtools::logging::feature::cell";var Si=Symbol.for("VAULT_CLEAR_STATE");var Jn=Symbol.for("VAULT_NOOP");function Te(n){return function(t){t[$x]=n,n.type!==void 0&&(t.type=n.type),n.key!==void 0&&(t.key=n.key),n.critical!==void 0&&(t.critical=n.critical),n.resolveType!==void 0&&(t.resolveType=n.resolveType),n.wantsConfig!==void 0?t.wantsConfig=n.wantsConfig:t.wantsConfig=!1,n.configKey!==void 0&&(t.configKey=n.configKey),n.needsLicense!==void 0?t.needsLicense=n.needsLicense:t.needsLicense=!1,n.licenseId!==void 0&&(t.licenseId=n.licenseId)}}var Ln={HttpResource:"http-resource",Observable:"observable",Promise:"promise",Value:"value"};var on={IncomingPipeline:"Incoming Pipeline",FinalizePipeline:"Finalize Pipeline",PipelineError:"Pipeline Error",PipelineDestroy:"Pipeline Destroy",PipelineReset:"Pipeline Reset",AbortController:"Abort Controller",DenyController:"Deny Controller",TabSync:"Tab Sync"};function Me(n,t){return ML("Behavior",n,t)}function ML(n,t,e){let i=r=>r.charAt(0).toUpperCase()+r.slice(1).replace(/[^A-Za-z0-9]/g,"");return`SDUX::${n}::${i(t)}::${i(e)}`}function kc(n){return!!n&&typeof n=="object"&&typeof n.value=="function"}var zx={get active(){return typeof globalThis.jasmine<"u"||typeof globalThis.jest<"u"||typeof globalThis.vitest<"u"}};var d_=null,ao={get active(){return d_===!0},setDevMode(n){if(d_!==null&&!zx.active)throw new Error("[vault] DevMode has already been initialized.");d_=n}};function Lt(n,t){let e=Date.now();return n instanceof Error?{message:n.message||"Unexpected error",details:n.stack,raw:n,timestamp:e,featureCellKey:t}:typeof n=="string"?{message:n,details:n,raw:n,timestamp:e,featureCellKey:t}:{message:"Unexpected error",details:n,raw:n,timestamp:e,featureCellKey:t}}function u_(n,t=new WeakSet){if(n===null||typeof n!="object")return n;let e=n;if(t.has(e))return n;t.add(e),Object.isFrozen(e)||Object.freeze(e);for(let i of Reflect.ownKeys(e)){let r=Object.getOwnPropertyDescriptor(e,i);r&&"value"in r&&u_(r.value,t)}return n}var pp=n=>{if(n===null||typeof n!="object"||Object.isFrozen(n))return n;try{if(n instanceof Map||n instanceof Set||n instanceof WeakMap||n instanceof WeakSet)try{return structuredClone(n)}catch{return u_(n)}return structuredClone(n)}catch{let t=Array.isArray(n)?[...n]:Object.assign(Object.create(Object.getPrototypeOf(n)),n);return u_(t)}};var f_=n=>n===Jn,p_=n=>n===Si;var Ta=n=>n===null,lo=n=>n===void 0,hp=n=>!lo(n),Ma=n=>n==null,mp=n=>typeof n=="function";var IL=n=>{if(n===null||typeof n!="object")return!1;let t=Object.getPrototypeOf(n);return t===Object.prototype||t===null},Ac=n=>{if(!IL(n))return!1;let t=n,e=Object.prototype.hasOwnProperty.call(t,"loading")||Object.prototype.hasOwnProperty.call(t,"value")||Object.prototype.hasOwnProperty.call(t,"error"),i=Object.keys(t).length===0;return e||i};function Ia(n){return!!(n&&typeof n=="object"&&"value"in n&&"isLoading"in n&&"error"in n&&"hasValue"in n)}var Oc,Rc,gp,Wx,ei=class{constructor(t,e){this.behaviorCtx=e;Is(this,gp);I(this,"type",ei.type);I(this,"key");I(this,"critical",ei.critical);Is(this,Oc,!1);Is(this,Rc,!1);this.key=t,Bh(this,Oc,ao.active)}computeMerge(t,e,i){let r=i?.clearUndefined??!1;return T(`${this.key} merge called (clear: ${r})`),Zi(this,gp,Wx).call(this,t,e),e===void 0&&!r?(T(`${this.key} computeMerge skipped. next="${e}" clear="${r}"`),t):e===void 0&&r?(T(`${this.key} computeMerge skipped. next="${e}" clear="${r}"`),Si):Array.isArray(t)&&e!=null?(T(`${this.key} pushing T to State \u2192 return [...curr, next]`),[...t,e]):(T(`${this.key} non-array branch. return next`),e)}destroy(){te(`${this.key} - destroy "noop"`)}reset(){te(`${this.key} - reset "noop"`)}};Oc=new WeakMap,Rc=new WeakMap,gp=new WeakSet,Wx=function(t,e){if(Array.isArray(t)===!1&&t!=null&&e!==void 0&&t!==Jn){let i=`[vault] ${this.key}: ArrayPushMerge received non-array current value. This behavior is intended for array state.`,r=Oe({currentType:typeof t,currentValue:t,nextValue:e});Vh(this,Oc)&&!Vh(this,Rc)?(Bh(this,Rc,!0),console.warn(`One Time Warning: ${i}`,r),te(`One Time Warning: ${i}`,r)):te(i,r)}},I(ei,"type"),I(ei,"key"),I(ei,"critical",!1),ei=Se([Te({type:H.Merge,key:Me("Merge","ArrayPush"),critical:!0})],ei);var Nc=(n,t)=>{if(typeof globalThis>"u")return;let e=globalThis.sdux??={},i=e.versions??={};i[n]!==t&&(i[n]=t)},kL="@sdux-vault/shared",AL="0.9.3";Nc(kL,AL);var R={CoreAfterTap:"coreAfterTap",CoreBeforeTap:"coreBeforeTap",ReplayGlobalError:"replayGlobalError",CoreError:"coreError",CoreErrorCallback:"coreErrorCallback",CoreState:"coreState",Encrypt:"encrypt",CoreEmitState:"coreEmitState",CoreLicense:"coreLicense",ErrorTransform:"errorTransform",Extension:"extension",Filter:"filter",FromObservable:"fromObservable",FromPromise:"fromPromise",FromStream:"fromStream",Interceptor:"interceptor",Merge:"merge",Operator:"operator",Persist:"persist",Reduce:"reduce",Resolve:"resolve",StepwiseFilter:"stepwiseFilter",StepwiseReducer:"stepwiseReducer",StepwiseResolve:"stepwiseResolve",TabSyncState:"tabSyncState"},yp={Error:"error",Warn:"warn",Log:"log",Debug:"debug"},Gx={Off:"off",Error:"error",Warn:"warn",Log:"log",Debug:"debug"},qx=Gx.Off,OL="[vault]";function __(n,...t){let e=RL();if(e===Gx.Off)return;let i=[yp.Error,yp.Warn,yp.Log,yp.Debug];i.indexOf(n)<=i.indexOf(e)&&console[n](OL,...t)}var sn=(...n)=>__("error",...n),nt=(...n)=>__("warn",...n);var Ke=(...n)=>__("debug",...n);function Kx(n){qx=n??"off"}function RL(){return qx}function PL(n){try{return JSON.stringify(n,NL,2)}catch{return"[unserializable]"}}function NL(n,t){if(typeof t=="function")return"[Function]";if(t instanceof Error)return{message:t.message,stack:t.stack};if(t instanceof Map)return{map:Array.from(t.entries())};if(t instanceof Set)return{set:Array.from(t.values())};try{return JSON.stringify(t),t}catch{return"[Circular]"}}var g_=class{#t=new ot(null);constructor(){Ke("[VaultPrivateErrorService] initialized (singleton instance created)")}setError(t){Ke(`[VaultPrivateErrorService] setError() ${PL(t)}`),this.#t.next(t)}getError(){return Ke("[VaultPrivateErrorService] getError() \u2192 observable subscribed"),this.#t.asObservable()}clear(){Ke("[VaultPrivateErrorService] clear() \u2192 error reset to null"),this.#t.next(null)}},h_=null;function Yx(){return h_?Ke("[VaultPrivateErrorService] returning existing singleton instance"):(Ke("[VaultPrivateErrorService] creating new singleton instance"),h_=new g_),h_}var bp=Symbol.for("BEHAVIOR_META"),Cp=Symbol.for("CONTROLLER_META"),Zx="vault::devtools::aggregate:feature::cell",Xx="vault::devtools::logging::feature::cell",Fc=Symbol.for("VAULT_CLEAR_STATE"),b_=Symbol.for("VAULT_CONTINUE"),Dp=Symbol.for("VAULT_NOOP"),C_=Symbol.for("VAULT_STOP");function Qx(n){return function(t){t[bp]=n,n.type!==void 0&&(t.type=n.type),n.key!==void 0&&(t.key=n.key),n.critical!==void 0&&(t.critical=n.critical),n.resolveType!==void 0&&(t.resolveType=n.resolveType),n.wantsConfig!==void 0?t.wantsConfig=n.wantsConfig:t.wantsConfig=!1,n.configKey!==void 0&&(t.configKey=n.configKey),n.needsLicense!==void 0?t.needsLicense=n.needsLicense:t.needsLicense=!1,n.licenseId!==void 0&&(t.licenseId=n.licenseId)}}function Ep(n){return function(t){t[Cp]=n,n.type!==void 0&&(t.type=n.type),n.key!==void 0&&(t.key=n.key),n.critical!==void 0&&(t.critical=n.critical),n.wantsConfig!==void 0?t.wantsConfig=n.wantsConfig:t.wantsConfig=!1,n.configKey!==void 0&&(t.configKey=n.configKey),n.needsLicense!==void 0?t.needsLicense=n.needsLicense:t.needsLicense=!1,n.licenseId!==void 0&&(t.licenseId=n.licenseId)}}var FL={Usage:"VaultErrorUsage",VaultError:"VaultError"},D_={EncryptionIntegrity:"VaultErrorEncryptionIntegrity",License:"VaultErrorLicense",Usage:"VaultErrorUsage",VaultError:"VaultError"},vp=class extends Error{kind;constructor(t,e=D_.VaultError,i=FL.VaultError){super(t),this.name=e,this.kind=i,Object.setPrototypeOf(this,new.target.prototype);let r=Error;typeof r.captureStackTrace=="function"&&r.captureStackTrace(this,new.target)}};var E_={Encryption:"VaultErrorEncryption",License:"VaultErrorLicense",Promise:"VaultErrorUsagePromise",PromiseFactoryRequired:"VaultErrorUsagePromiseFactoryRequired",Usage:"VaultErrorUsage"},Pc=class extends vp{constructor(t,e=E_.License){super(t,D_.License,e)}},y_=class extends vp{constructor(t,e=E_.Usage){super(t,D_.Usage,e)}},_p=class extends y_{constructor(){super(`Invalid incoming value: Promise detected.

Promises are eager and may resolve or reject before entering the Vault pipeline.

Use the following instead  a DeferredFactory value

This guarantees the promise is created and executed inside the pipeline.`,E_.Promise)}};var xi={Attempt:"attempt",Failure:"failure",Finalize:"Finalize Pipeline",Success:"success",Vote:"vote"},At={Abstain:"abstain",Abort:"abort",Deny:"deny"},co={CoreAbstain:"coreAbstain",Error:"error",License:"license",Policy:"policy",ReplayGlobalError:"replayGlobalError",Stepwise:"stepwise",TabSync:"tabSync"},Vn={Abort:"abort",Abstain:"abstain",Deny:"deny"},bn={End:"end",Notification:"notification",Start:"start",Unknown:"unknown"},Yt={Conductor:"conductor",Controller:"controller",Lifecycle:"lifecycle",Stage:"stage",Unknown:"unknown"},ti={Merge:"merge",Replace:"replace",Initialize:"initialize"},Lc={HttpResource:"http-resource",Observable:"observable",Promise:"promise",Value:"value"};function w_(n,t){return Jx("Behavior",n,t)}function Jx(n,t,e){let i=r=>r.charAt(0).toUpperCase()+r.slice(1).replace(/[^A-Za-z0-9]/g,"");return`SDUX::${n}::${i(t)}::${i(e)}`}function S_(n){return typeof n!="string"?!1:/^SDUX::(Behavior|Controller)::[A-Z][A-Za-z0-9]*::[A-Z][A-Za-z0-9]*$/.test(n)}function wp(n,t){return Jx("Controller",n,t)}function eT(n){return S_(n)}var x_={get active(){return typeof globalThis.jasmine<"u"||typeof globalThis.jest<"u"||typeof globalThis.vitest<"u"}},m_=null,Vt={get active(){return m_===!0},setDevMode(n){if(m_!==null&&!x_.active)throw new Error("[vault] DevMode has already been initialized.");m_=n}};function cs(n,t){let e=Date.now();return n instanceof Error?{message:n.message||"Unexpected error",details:n.stack,raw:n,timestamp:e,featureCellKey:t}:typeof n=="string"?{message:n,details:n,raw:n,timestamp:e,featureCellKey:t}:{message:"Unexpected error",details:n,raw:n,timestamp:e,featureCellKey:t}}function v_(n,t=new WeakSet){if(n===null||typeof n!="object")return n;let e=n;if(t.has(e))return n;t.add(e),Object.isFrozen(e)||Object.freeze(e);for(let i of Reflect.ownKeys(e)){let r=Object.getOwnPropertyDescriptor(e,i);r&&"value"in r&&v_(r.value,t)}return n}var Ie=n=>{if(n===null||typeof n!="object"||Object.isFrozen(n))return n;try{if(n instanceof Map||n instanceof Set||n instanceof WeakMap||n instanceof WeakSet)try{return structuredClone(n)}catch{return v_(n)}return structuredClone(n)}catch{let t=Array.isArray(n)?[...n]:Object.assign(Object.create(Object.getPrototypeOf(n)),n);return v_(t)}},uo=n=>n===Dp,ds=n=>n===Fc,Sp=n=>n===b_;var Vc=n=>n===void 0,Wi=n=>!Vc(n),xp=n=>n==null,ka=n=>typeof n=="function";var LL=n=>{if(n===null||typeof n!="object")return!1;let t=Object.getPrototypeOf(n);return t===Object.prototype||t===null},tT=n=>{if(!LL(n))return!1;let t=n,e=Object.prototype.hasOwnProperty.call(t,"loading")||Object.prototype.hasOwnProperty.call(t,"value")||Object.prototype.hasOwnProperty.call(t,"error"),i=Object.keys(t).length===0;return e||i};function T_(n){return!!n&&(typeof n=="object"||typeof n=="function")&&typeof n.then=="function"}function M_(n){return!!(n&&typeof n=="object"&&"value"in n&&"isLoading"in n&&"error"in n&&"hasValue"in n)}var VL="@sdux-vault/devtools",BL="0.9.2";Nc(VL,BL);var I_=null;function N_(){return I_||(I_=new A_),I_}var A_=class{#t=new E;constructor(){window.sdux??={},window.sdux.vaultEventBus=this}nextPipeline(t){Vt.active&&t&&this.#t.next(t)}pipeline$(){return this.#t.asObservable()}},us={Pipeline:"pipeline",System:"system",Unknown:"unknown",User:"ui"},O_=class{sub;events=[];errorCount=0;maxEvents=5e3;sequence=0;lastMonotonicByTrace=new Map;traceRefCount=new Map;lastGlobalTimestamp=0;start(t){let e=N_();if(!e||typeof e.pipeline$!="function"){console.warn("[SDUX] EventBus not available.");return}this.sub=e.pipeline$().subscribe(i=>{let r=this.enrichEvent(i),o=r.traceId??"__unknown";if(this.events.push(r),this.traceRefCount.set(o,(this.traceRefCount.get(o)??0)+1),this.isErrorEvent(r)&&this.errorCount++,this.events.length>this.maxEvents){let s=this.events.shift();s&&(this.isErrorEvent(s)&&(this.errorCount=Math.max(0,this.errorCount-1)),this.evictTrace(s.traceId??"__unknown"))}t?.()})}stop(){this.sub?.unsubscribe(),this.sub=void 0}clear(){this.events=[],this.errorCount=0,this.sequence=0,this.lastMonotonicByTrace.clear(),this.traceRefCount.clear(),this.lastGlobalTimestamp=0}evictTrace(t){let e=(this.traceRefCount.get(t)??1)-1;e<=0?(this.traceRefCount.delete(t),this.lastMonotonicByTrace.delete(t)):this.traceRefCount.set(t,e)}getEvents(){return[...this.events]}getErrorCount(){return this.errorCount}enrichEvent(t){let e=Date.now(),i=typeof performance<"u"&&performance.now?performance.now():0,r=t.traceId??"__unknown",o=this.lastMonotonicByTrace.get(r),s=typeof o=="number"?i-o:0;s<0&&(s=0),this.lastMonotonicByTrace.set(r,i);let a=this.detectScheduler(e),l=this.detectEventLoopPhase(s),c=this.detectSource(t),d=this.detectSource(t),u=this.hashStack();return $(b({},t),{sequenceNumber:++this.sequence,monotonicTimestamp:i,stageDurationMs:s,stackHash:u,scheduler:a,eventLoopPhase:l,latencyCategory:d,source:c})}detectScheduler(t){let e=t-this.lastGlobalTimestamp;return this.lastGlobalTimestamp=t,e<2?"microtask":e<16?"macrotask":"delayed"}detectEventLoopPhase(t){return t===0?"synchronous":t<2?"microtask":t<16?"macrotask":"blocked"}detectSource(t){switch(t.type){case Yt.Controller:return us.User;case Yt.Stage:return us.Pipeline;case Yt.Lifecycle:case Yt.Conductor:return us.System}return us.Unknown}hashStack(){try{let t=new Error().stack??"",e=0;for(let i=0;i<t.length;i++)e=(e<<5)-e+t.charCodeAt(i),e|=0;return`h${Math.abs(e)}`}catch{return"h0"}}isErrorEvent(t){return!!(t.error||typeof t.name=="string"&&t.name.includes("fatal"))}},jL=`
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

`,k_=null;function UL(){return k_||(k_=new R_),k_}var R_=class{serializeRegistry(){let t=globalThis?.sdux?.getRegistry?.();if(!t)return;let e={valid:0,pending:0,revoked:0,timeout:0,notRequired:0},i=o=>{let s=String(o??"").toLowerCase();s==="valid"?e.valid++:s==="pending"?e.pending++:s==="revoked"?e.revoked++:s==="timeout"?e.timeout++:(s==="not-required"||s==="notrequired")&&e.notRequired++},r=Array.from(t.values()).map(o=>{let s=o.behaviors?Array.from(o.behaviors.values()):[],a=o.controllers?Array.from(o.controllers.values()):[];for(let l of s)i(l.validLicense);for(let l of a)i(l.validLicense);return{key:o.key,behaviorsRegistered:!!o.behaviorsRegistered,controllersRegistered:!!o.controllersRegistered,fluentApis:o.fluentApis??null,behaviors:s,controllers:a}});return{totalFeatureCells:r.length,licenseSummary:e,featureCells:r}}buildEventStats(t,e){let i=0,r=null,o={},s={},a={},l={},c={},d={},u={},p=[],g={},_=[],S={},O={},V={},Ee=[],it={},Ki=0,_o=0,Yi=0,Or=0,Xa=0,Qa=0,xs=0,pC=0,Oh=0,Rh=0,hC=0,mC=0,Ph={},Nh=null,FI=[],gC=new Set,yC=new Map,vC=0,_C=0,Ja={},bC=new Map,CC=new Map,Ts=null,Ms=null,bo={count:0,maxDuration:0};if(Array.isArray(e)&&e.length>0){bo.count=e.length;for(let M of e)M.duration>bo.maxDuration&&(bo.maxDuration=M.duration)}else if(typeof performance<"u"&&performance.getEntriesByType)try{let M=performance.getEntriesByType("longtask");bo.count=M.length;for(let W of M){let we=W.duration??0;we>bo.maxDuration&&(bo.maxDuration=we)}}catch{}for(let M of t){if(!M?.name)continue;o[M.name]=(o[M.name]??0)+1,M.scheduler&&(s[M.scheduler]=(s[M.scheduler]??0)+1),M.eventLoopPhase&&(a[M.eventLoopPhase]=(a[M.eventLoopPhase]??0)+1),(M.error||String(M.name).includes("error"))&&Ki++,String(M.name).includes("abstain")&&Xa++,String(M.name).includes("success")&&Yi++,String(M.name).includes("noop")&&_o++;let W=typeof M.monotonicTimestamp=="number"?M.monotonicTimestamp:typeof M.timestamp=="number"?M.timestamp:null;if(W!==null){if(r!==null){let re=W-r;re>i&&(i=re)}r=W}if(W!==null){FI.push(W),(Ts===null||W<Ts)&&(Ts=W),(Ms===null||W>Ms)&&(Ms=W);let re=Math.floor(W/16);S[re]=(S[re]??0)+1;let rt=Math.floor(W/1e3);g[rt]=(g[rt]??0)+1}let we=M.traceId??"__unknown";typeof M.timestamp=="number"&&(bC.get(we)===M.timestamp&&(vC++,Ja[we]=(Ja[we]??0)+1),bC.set(we,M.timestamp)),l[we]||(l[we]={eventCount:0,firstTimestamp:W,lastTimestamp:W,durationMs:0,stageBreakdown:{},stageSequence:[]},c[we]=[],gC.has(we)&&Qa++,gC.add(we));let Et=l[we];Et.eventCount++;let Rt=M.monotonicTimestamp;if(typeof Rt=="number"){let re=CC.get(we);re===Rt&&_C++,typeof re=="number"&&Rt<re&&xs++,CC.set(we,Rt)}if(W!==null&&(Et.firstTimestamp=Math.min(Et.firstTimestamp??W,W),Et.lastTimestamp=Math.max(Et.lastTimestamp??W,W),Et.durationMs=Et.lastTimestamp-Et.firstTimestamp),typeof M.stageDurationMs=="number"){let re=M.name,rt=M.stageDurationMs,jn=M.latencyCategory;jn===us.User?_.push(rt):jn===us.System||(Or+=rt,d[re]||(d[re]={count:0,total:0,max:0,min:1/0,avg:0,p95:0},u[re]=[]),d[re].count++,d[re].total+=rt,d[re].max=Math.max(d[re].max,rt),d[re].min=Math.min(d[re].min,rt),u[re].push(rt),Et.stageBreakdown[re]=(Et.stageBreakdown[re]??0)+rt),jn===us.Pipeline&&c[we].push(rt),Et.stageSequence.push({stage:re,durationMs:rt})}if("payload"in M){let re=this.#t(M.payload);V[we]=(V[we]??0)+re,String(M.name).includes("persist")&&Ee.push({traceId:we,size:re}),re>5e4&&Oh++}if("state"in M){hC++;let re=this.#t(M.state);O[we]=(O[we]??0)+re,re>1e5&&Oh++;let rt=0;try{rt=this.#i(M.state)}catch{rt=0}Rh=Math.max(Rh,rt);let jn="",Ai=null;try{jn=JSON.stringify(M.state)}catch(qI){Ai=qI?.message||"Unknown serialization error",jn="__STATE_SERIALIZATION_ERROR__"}Ai&&(mC++,Ph[Ai]=(Ph[Ai]??0)+1);let pn=this.#n(jn),Co=yC.get(we);Co===pn&&pC++,Co&&Co!==pn&&p.push(Math.abs(re)),yC.set(we,pn)}}let fd=Ts!==null&&Ms!==null?Ms-Ts:0,pd=null,hd=0;for(let M in l){let W=l[M],we=W.durationMs??0,Et=W.eventCount??0;it[M]=we>2e3&&Et<3,we>hd&&(hd=we,pd=M);let Rt=c[M]??[];if(Rt.length>0){let re=Rt.slice().sort((pn,Co)=>pn-Co),rt=Rt.reduce((pn,Co)=>pn+Co,0)/Rt.length,jn=re[Math.floor(re.length*.95)]??re[re.length-1],Ai=re[re.length-1];W.meanStageDuration=rt,W.p95StageDuration=jn,W.maxStageDuration=Ai}if(!Nh){let re=W.stageSequence??[];if(re.length>=6){let rt=re.map(pn=>pn.stage),jn=rt.slice(0,2).join("|"),Ai=0;for(let pn=0;pn<rt.length-1&&rt.slice(pn,pn+2).join("|")===jn;pn+=2)Ai++;Ai>=3&&(Nh={detected:!0,traceId:M,repeatingPattern:jn.split("|"),repetitionCount:Ai})}}}let LI=Math.max(0,fd-Or),VI=t.length>0?vC/t.length:0,BI=t.length>0?_C/t.length:0,DC=null,EC=0;for(let M in Ja){let W=Ja[M];W>EC&&(EC=W,DC=M)}let jI=fd>0?Or/fd:0;for(let M in d){let W=d[M];W.avg=W.count>0?W.total/W.count:0;let we=u[M].sort((Rt,re)=>Rt-re),Et=Math.floor(we.length*.95);W.p95=we[Et]??0}let md=null,gd=0;for(let M in d){let W=d[M].total;W>gd&&(gd=W,md=M)}let wC=[];for(let M in l){let W=l[M],we=W.stageSequence?.length?W.stageSequence:Object.entries(W.stageBreakdown??{}).map(([Et,Rt])=>({stage:Et,durationMs:Rt}));wC.push({traceId:M,stages:we})}let UI=Object.values(V).reduce((M,W)=>M+W,0)/Math.max(1,Object.keys(V).length),HI=p.length>0?p.reduce((M,W)=>M+W,0)/p.length:0,SC;if(_.length>0){let M=_.slice().sort((Rt,re)=>Rt-re),W=_.reduce((Rt,re)=>Rt+re,0)/_.length,we=M[Math.floor(M.length*.95)]??M[M.length-1],Et=M[M.length-1];SC={count:_.length,avgMs:W,p95Ms:we,maxMs:Et}}let $I=Math.max(...Object.values(g),0),zI=Object.keys(g).length>0?hC/Object.keys(g).length:0,WI=this.#e(O),el={},xC=50;for(let M in l){let W=l[M].eventCount??0;W>=xC&&(el[M]=W)}let GI=[it&&Object.values(it).some(Boolean)?{rank:1,type:"deadlock",id:"deadlockByTrace",evidence:"One or more traces match deadlock heuristics."}:null,md?{rank:2,type:"stage-bottleneck",id:md,evidence:`Stage has highest total compute time (${Math.round(gd)}ms).`}:null,pd?{rank:3,type:"slowest-trace",id:pd,evidence:`Longest trace duration (${Math.round(hd)}ms).`}:null,el&&Object.keys(el).length?{rank:4,type:"fanout",id:Object.keys(el)[0],evidence:`Fan-out threshold exceeded (\u2265 ${xC} events).`}:null,i>250?{rank:5,type:"stall",id:"maxIdleGapMs",evidence:`Large idle gap detected (${Math.round(i)}ms).`}:null].filter(Boolean);return{totalEvents:t.length,errorEvents:Ki,firstEventTimestamp:Ts,lastEventTimestamp:Ms,totalDurationMs:fd,longTaskStats:bo,eventTypes:o,traces:l,stageAggregates:d,schedulerDistribution:s,eventLoopPhaseDistribution:a,maxIdleGapMs:i,deadlockByTrace:it,longestTraceId:pd,longestTraceDurationMs:hd,traceFanOut:el,diagnosticSummary:GI,stageBottleneck:md,stageBottleneckTimeMs:gd,pipelineFlamegraph:wC,burstAnalysis:{maxEventsPerFrame:Math.max(...Object.values(S),0)},suppressionStats:{suppressedCount:_o,votePass:Yi,voteAbstain:Xa},structuralIntegrity:{duplicateTraceCount:Qa,outOfOrderCount:xs},pipelineRecursion:Nh,timingIntegrity:{timestampCollisionRate:VI,monotonicCollisionRate:BI,worstCollisionTrace:DC,collisionsPerTrace:Ja},stateAnalytics:{stateSizePerTrace:O,stateSerializationErrors:mC,stateSerializationErrorMessages:Ph,avgPayloadSize:UI,repeatedIdenticalStateCount:pC,largeObjectCount:Oh,deepNestingMaxDepth:Rh,persistPayloadSizeRanking:Ee.sort((M,W)=>W.size-M.size).slice(0,10),stateEntropyScore:WI,avgStateDiffSize:HI,maxChurnPerSecond:$I,avgChurnPerSecond:zI},computeVsIdle:{totalComputeTimeMs:Or,estimatedIdleTimeMs:LI,computeRatio:jI},userLatencyDistribution:SC}}#t(t){try{return new TextEncoder().encode(JSON.stringify(t)).length}catch{return 0}}#i(t,e=0){return t===null||typeof t!="object"?e:Math.max(e,...Object.values(t).map(i=>this.#i(i,e+1)))}#n(t){let e=0;for(let i=0;i<t.length;i++)e=(e<<5)-e+t.charCodeAt(i),e|=0;return`h${Math.abs(e)}`}#e(t){let e=Object.values(t);if(!e.length)return 0;let i=e.reduce((o,s)=>o+s,0)/e.length,r=e.reduce((o,s)=>o+Math.pow(s-i,2),0)/e.length;return Math.sqrt(r)}getEnvironmentInfo(){let t=navigator.userAgent,e=/chrome|crios|edg|opr/i.test(t),i=/safari/i.test(t)&&!e,r="unknown",o="unknown";/firefox/i.test(t)?(r="firefox",o=(t.match(/firefox\/(\d+)/i)??[])[1]??"unknown"):/edg/i.test(t)?(r="edge",o=(t.match(/edg\/(\d+)/i)??[])[1]??"unknown"):/opr/i.test(t)?(r="opera",o=(t.match(/opr\/(\d+)/i)??[])[1]??"unknown"):e?(r="chrome",o=(t.match(/(?:chrome|crios)\/(\d+)/i)??[])[1]??"unknown"):i&&(r="safari",o=(t.match(/version\/(\d+)/i)??[])[1]??"unknown");let s="unknown";/windows/i.test(t)?s="Windows":/iphone|ipad|ipod/i.test(t)?s="iOS":/android/i.test(t)?s="Android":/mac/i.test(t)?s="MacOS":/linux/i.test(t)&&(s="Linux");let a="desktop";return/mobile/i.test(t)&&(a="mobile"),/tablet|ipad/i.test(t)&&(a="tablet"),{url:location.href,referrer:typeof document<"u"&&document.referrer||null,userAgent:t,browser:r,browserVersion:o,os:s,platform:navigator.platform??"unknown",online:typeof navigator<"u"?navigator.onLine:void 0,deviceType:a,language:navigator.language??"unknown",timezone:Intl.DateTimeFormat().resolvedOptions().timeZone??"unknown",screenResolution:typeof screen<"u"?`${screen.width}x${screen.height}`:"unknown",viewport:typeof window<"u"?`${window.innerWidth}x${window.innerHeight}`:"unknown"}}};function nT(n){let t=new Blob([JSON.stringify(n,null,2)],{type:"application/json"}),e=document.createElement("a");e.href=URL.createObjectURL(t),e.download=`sdux-debug-${Date.now()}.json`,e.click(),URL.revokeObjectURL(e.href)}function HL(){let n=Date.now(),t=jL,e=new Blob([t],{type:"text/markdown"}),i=document.createElement("a");i.href=URL.createObjectURL(e),i.download=`sdux-debug-ai-assist-${n}.md`,i.click(),URL.revokeObjectURL(i.href)}function iT(n){let t=UL(),e=Date.now(),i=new Date(e).toISOString(),r=typeof performance<"u"&&performance.now?performance.now():null,o=typeof performance<"u"&&performance.getEntriesByType?performance.getEntriesByType("navigation")[0]:null,s;if(typeof performance<"u")try{s=performance.getEntriesByType("longtask")?.map(d=>({start:d.startTime,duration:d.duration}))}catch{}let a=t.serializeRegistry(),l=t.buildEventStats(n,s);return{timestamp:e,isoTime:i,highResolution:{monotonicNow:r,timeOrigin:typeof performance<"u"?performance.timeOrigin:null},runtime:{hardwareConcurrency:typeof navigator<"u"?navigator.hardwareConcurrency??null:null,deviceMemory:typeof navigator<"u"?navigator.deviceMemory??null:null,connectionType:typeof navigator<"u"?navigator.connection?.effectiveType??null:null},navigation:o?{type:o.type,domComplete:o.domComplete,loadEventEnd:o.loadEventEnd}:void 0,environment:t.getEnvironmentInfo(),longTasks:s,events:n,stats:l,versions:globalThis?.sdux?.versions??{},registry:a}}function $L(n){let t=iT(n);nT(t);let r=`https://github.com/sdux-vault/vault/issues/new?template=issue_report.md&body=${encodeURIComponent(`## Issue Summary
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
`)}`;window.open(r,"_blank")}function zL(n,t=1){let e=new Blob([n],{type:"application/json"}),i=URL.createObjectURL(e),r=document.createElement("a");r.href=i,r.download=`sdux-pipeline-trace-x${t}-${Date.now()}.json`,r.click(),URL.revokeObjectURL(i)}var fo={Begin:"B",End:"E",Instant:"I",Meta:"M",Complete:"X"};function WL(n,t=1){let e=[],i=new Map,r=new Map,o=0;e.push({name:"process_name",ph:fo.Meta,pid:1,args:{name:"SDUX Pipeline Debugger"}}),e.push({name:"trace_scale",ph:fo.Meta,pid:1,args:{scale:t}});let s=new Set,a=[...n].sort((c,d)=>{let u=c.sequenceNumber??0,p=d.sequenceNumber??0;return u-p}),l=new Map;if(a.length>0){let c=a[0].monotonicTimestamp??0,d=0,u=c;for(let p=0;p<a.length;p++){let g=a[p],_=g.monotonicTimestamp??u,S=g.sequenceNumber??p;if(p===0){l.set(S,0),u=_;continue}let O=Math.max(0,_-u),V;t<=1?V=Math.floor(O*1e3):O<=2?V=Math.floor(O*1e3*t):O<=16?V=Math.floor(O*1e3*Math.max(2,Math.floor(t/4))):V=1e3,d+=V,l.set(S,d),u=_}}for(let c=0;c<a.length;c++){let d=a[c],u=d.traceId??"main",p=d.sequenceNumber??c,g=l.get(p)??0,[_,S,O]=(d.name??"").split(":"),V=d.type,Ee=`${u}:${V}:${_}:${O}`;if(s.has(u)||(s.add(u),e.push({name:"thread_name",ph:fo.Meta,pid:1,tid:u,args:{name:`Pipeline ${u.slice(0,8)}`}})),r.has(u)||(r.set(u,o++),e.push({name:"thread_sort_index",ph:fo.Meta,pid:1,tid:u,args:{sort_index:r.get(u)}})),d.boundary===bn.Start){i.has(Ee)||i.set(Ee,[]),i.get(Ee).push(g),e.push({name:O,cat:V,ph:fo.Begin,ts:g,pid:1,tid:u,args:{cell:d.cell,behavior:d.behaviorKey,scheduler:d.scheduler,source:d.source,latency:d.latencyCategory}});continue}if(d.boundary===bn.End){let Or=i.get(Ee);if(Or&&Or.length){let Xa=Or.pop(),Qa=50,xs=g;xs-Xa<Qa&&(xs=Xa+Qa),e.push({name:O,cat:V,ph:fo.End,ts:xs,pid:1,tid:u})}continue}let it=20*t,Ki=Math.max(0,g-it),_o=Ki===0?it:g,Yi=`${O}:${S} (synthetic)`;e.push({name:Yi,cat:V,ph:fo.Begin,ts:Ki,pid:1,tid:u,args:{synthetic:!0,actualDurationMs:0,note:"Synthetic span time added for visualization"}}),e.push({name:Yi,cat:V,ph:fo.End,ts:_o,pid:1,tid:u,args:{synthetic:!0,actualDurationMs:0,note:"Synthetic time span added for visualization"}})}return JSON.stringify({traceEvents:e},null,2)}var P_=class extends HTMLElement{recorder=new O_;recording=!1;minimized=!0;exportMenuOpen=!1;dragOffsetX=0;dragOffsetY=0;dragging=!1;abortController=new AbortController;connectedCallback(){this.attachShadow({mode:"open"}),this.style.position="fixed",this.style.top="80px",this.style.right="20px",this.style.zIndex="999999";let t=localStorage.getItem("sdux-debug-state");if(t)try{let{left:e,top:i,minimized:r}=JSON.parse(t);e&&i&&(this.style.left=e,this.style.top=i,this.style.right="auto"),this.minimized=!!r}catch{}this.render(),document.addEventListener("sdux-license-resolved",()=>{this.updateButtonState()},{signal:this.abortController.signal})}disconnectedCallback(){this.abortController.abort(),this.timerInterval&&(clearInterval(this.timerInterval),this.timerInterval=null),this.recorder.stop(),this.recording=!1}render(){if(!this.shadowRoot)return;this.shadowRoot.innerHTML=`
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
  `,this.shadowRoot?.getElementById("aiAssist")?.addEventListener("click",()=>{HL()});let e=this.shadowRoot.getElementById("export"),i=this.shadowRoot.getElementById("exportMenu");e?.addEventListener("click",a=>{a.stopPropagation(),this.exportMenuOpen=!this.exportMenuOpen,i?.classList.toggle("open",this.exportMenuOpen)}),this.shadowRoot.getElementById("close")?.addEventListener("click",a=>{a.stopPropagation(),this.remove()}),this.updateButtonState(),this.shadowRoot.getElementById("help")?.addEventListener("click",a=>{a.stopPropagation(),this.openHelp()}),this.shadowRoot.getElementById("recordToggle")?.addEventListener("click",a=>{a.stopPropagation(),this.recording?this.stop():this.start(),this.updateRecordingUI()}),this.shadowRoot.getElementById("panel")?.addEventListener("pointerdown",a=>this.startDrag(a)),this.shadowRoot.getElementById("downloadDump")?.addEventListener("click",a=>{a.stopPropagation(),s(),this.downloadDebugDump()}),this.shadowRoot.getElementById("downloadTrace")?.addEventListener("click",a=>{a.stopPropagation(),s(),this.downloadTraceDump()}),this.shadowRoot.getElementById("downloadTrace1000")?.addEventListener("click",a=>{a.stopPropagation(),s(),this.downloadTraceDump(1e3)}),this.shadowRoot.getElementById("clear")?.addEventListener("click",a=>{a.stopPropagation(),this.clear()}),this.shadowRoot.getElementById("minimize")?.addEventListener("click",this.toggleMinimize),this.shadowRoot.getElementById("createIssue")?.addEventListener("click",a=>{a.stopPropagation(),this.createIssue()});let o=this.abortController.signal;document.addEventListener("pointermove",this.onDrag,{signal:o}),document.addEventListener("pointerup",this.stopDrag,{signal:o}),document.addEventListener("pointerdown",a=>{if(!this.exportMenuOpen)return;let l=a.composedPath();i&&!l.includes(i)&&s()},{signal:o});let s=()=>{i?.classList.remove("open"),this.exportMenuOpen=!1}}updateEventCount(){if(!this.shadowRoot)return;let t=this.shadowRoot.getElementById("eventCount"),e=this.shadowRoot.getElementById("eventErrorCount"),i=this.recorder.getEvents().length,r=this.recorder.getErrorCount();if(t&&(t.textContent=String(i)),e){let o=Number(e.textContent??"0");r>o&&(e.classList.remove("bump"),e.offsetWidth,e.classList.add("bump")),e.textContent=String(r)}}updateRecordingUI(){if(!this.shadowRoot)return;let t=this.shadowRoot.getElementById("recordToggle"),e=this.shadowRoot.querySelector(".record-dot"),i=this.shadowRoot.getElementById("sessionTimer"),r=this.shadowRoot.querySelector(".title-container");if(t&&(t.textContent=this.recording?"Stop":"Record"),!this.recording){e&&e.remove(),i&&(i.textContent="");return}if(!e&&r){let o=document.createElement("div");o.className="record-dot",r.insertBefore(o,r.children[1])}i&&(i.textContent=this.getSessionTime())}sessionStartTime=null;timerInterval=null;pausedDuration=0;pauseStart=null;startDrag(t){this.dragging=!0,this.dragOffsetX=t.clientX-this.offsetLeft,this.dragOffsetY=t.clientY-this.offsetTop}onDrag=t=>{this.dragging&&(this.style.left=`${t.clientX-this.dragOffsetX}px`,this.style.top=`${t.clientY-this.dragOffsetY}px`,this.style.right="auto")};stopDrag=()=>{this.dragging=!1,this.persistState()};toggleMinimize=t=>{t.stopPropagation(),this.minimized=!this.minimized,this.persistState(),this.render()};persistState(){localStorage.setItem("sdux-debug-state",JSON.stringify({left:this.style.left,top:this.style.top,minimized:this.minimized}))}updateButtonState(){if(!this.shadowRoot)return;let t=this.shadowRoot.getElementById("recordToggle"),e=this.shadowRoot.getElementById("export"),i=this.shadowRoot.getElementById("clear"),r=this.shadowRoot.getElementById("createIssue"),o=this.shadowRoot.getElementById("aiAssist"),s=this.recorder.getEvents().length>0,a=!!globalThis.sdux?.debugWidget?.aiAssistEnabled;t&&(t.disabled=!1);let l=!s||this.recording;e&&(e.disabled=l),r&&(r.disabled=l),i&&(i.disabled=l),o&&(o.disabled=l||!a)}start(){if(this.recording)return;let t=Date.now();this.sessionStartTime||(this.sessionStartTime=t),this.pauseStart&&(this.pausedDuration+=t-this.pauseStart,this.pauseStart=null),this.timerInterval=window.setInterval(()=>{let e=this.shadowRoot?.getElementById("sessionTimer");e&&(e.textContent=this.getSessionTime())},1e3),this.recorder.start(()=>{this.updateEventCount(),this.updateButtonState()}),this.recording=!0,this.updateRecordingUI(),this.updateButtonState(),console.info("[SDUX] Recording started")}getSessionTime(){if(!this.sessionStartTime)return"";let t=Date.now()-this.sessionStartTime-this.pausedDuration,e=Math.floor(t/1e3),i=Math.floor(e/60),r=e%60;return`${i}:${r.toString().padStart(2,"0")}`}stop(){this.recording&&(this.recorder.stop(),this.recording=!1,this.pauseStart=Date.now(),this.updateRecordingUI(),this.timerInterval&&(clearInterval(this.timerInterval),this.timerInterval=null),this.updateButtonState(),console.info("[SDUX] Recording stopped"))}downloadDebugDump(){let t=iT(this.recorder.getEvents());nT(t),console.info("[SDUX] Logging dump generated")}downloadTraceDump(t=1){let e=WL(this.recorder.getEvents(),t);zL(e,t),console.info("[SDUX] Trace dump generated")}createIssue(){$L(this.recorder.getEvents()),console.info("[SDUX] Issue dump generated and redirected")}clear(){if(!this.recorder.getEvents().length||!confirm("Clear all recorded events?"))return;this.recorder.clear(),this.sessionStartTime=null,this.pausedDuration=0,this.pauseStart=null;let t=this.shadowRoot?.getElementById("sessionTimer");t&&(t.textContent=""),this.updateEventCount(),this.updateButtonState(),console.info("[SDUX] Events cleared")}openHelp(){window.open("/docs/dev-tools/built-in-debugger","_blank","noopener,noreferrer")}};function GL(){if(!customElements.get("sdux-debug"))try{customElements.define("sdux-debug",P_)}catch{}if(document.querySelector("sdux-debug"))return;let n=document.createElement("sdux-debug");document.body.appendChild(n)}function rT(){if(!Vt.active||typeof window>"u"||(globalThis.sdux??={},globalThis.sdux.debugWidget??={},globalThis.sdux.debugWidget.injected))return;globalThis.sdux.debugWidget.injected=!0;let n=()=>GL();document.readyState==="loading"?document.addEventListener("DOMContentLoaded",n,{once:!0}):n()}var qL="@sdux-vault/engine",KL="0.28.1";Nc(qL,KL);var Bt="vault-conductor",Mp,B_=class{static{Mp=this}controllerCtx;static type;static key;static critical;type=Mp.type;critical=Mp.critical;key;#t=!1;#i=!1;constructor(e,i){this.controllerCtx=i,this.key=e}handleMessage(e){switch(Ke(`${this.key} handleMessage received "${e.type}" for trace "${e.traceId}".`),e.type){case xi.Attempt:{let{ctx:i}=e;return this.#i?A(At.Abort):i.operation===ti.Initialize?A(At.Abstain):A(this.#t?At.Abstain:At.Deny)}case xi.Finalize:return this.#t=!0,A();case xi.Success:return this.#t=!0,A();case xi.Failure:return e.ctx.operation===ti.Initialize&&(this.#i=!0),A();default:return A(At.Abstain)}}destroy(){nt(`${this.key} - destroy noop`)}reset(){nt(`${this.key} - reset noop`)}};B_=Mp=ul([Ep({type:co.CoreAbstain,key:wp("Policy","CoreAbstain"),critical:!1})],B_);var Ip,j_=class{static{Ip=this}controllerCtx;static type;static key;static critical;type=Ip.type;critical=Ip.critical;key;ctx;constructor(e,i){this.controllerCtx=i,this.key=e,this.ctx=i}handleMessage(e){return Ke(`${this.key} handleMessage received "${e.type}" for trace "${e.traceId}".`),e.type===xi.Failure?(Ke(`${this.key} ABORT \u2014 default failure handler for trace "${e.traceId}"`),this.ctx.requestAbort(e.traceId),A()):A(At.Abstain)}destroy(){nt(`${this.key} - destroy noop`)}reset(){nt(`${this.key} - reset noop`)}};j_=Ip=ul([Ep({type:co.Error,key:wp("Policy","CoreError"),critical:!1})],j_);var Gi={RequireLicense:"requireLicense",ValidateLicense:"validateLicense",LicenseStatus:"licenseStatus",DescribeFeature:"describe-feature",DescribeBehaviors:"describe-behaviors",DescribeControllers:"describe-controllers"},Ap=null;function YL(n,t){Ap||(Ap=new U_(n,t))}function Bc(){if(!Ap)throw new Error("[vault] LicensingService not initialized.");return Ap}var U_=class{events$;validation$;constructor(t,e){this.events$=t,this.validation$=e}describeFeature(t){t.type=Gi.DescribeFeature,this.events$.next(t)}describeBehaviors(t){t.type=Gi.DescribeBehaviors,this.events$.next(t)}describeControllers(t){t.type=Gi.DescribeControllers,this.events$.next(t)}requestLicense(t,e){if(!e)throw new Error("[vault] Cannot register controller license without a key.");let i=this.#t();return this.events$.next({featureCellKey:t,key:e,licenseToken:i,type:Gi.RequireLicense}),i}validateLicense(t,e,i,r){this.events$.next({featureCellKey:t,key:e,licenseToken:i,type:Gi.ValidateLicense,valid:r})}#t(){let t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",e=i=>Array.from({length:i},()=>t[Math.floor(Math.random()*t.length)]).join("");return`${e(5)}-${e(5)}`}getLicenseValidation$(){return this.validation$}};var kp,H_=class{static{kp=this}controllerCtx;static type;static key;static critical;type=kp.type;critical=kp.critical;key;#t=null;#i;constructor(e,i){this.controllerCtx=i,this.key=e;let r=i.featureCellKey;this.#i=Bc().getLicenseValidation$().pipe(Ce(o=>o.featureCellKey===r)).subscribe(o=>{this.#t=o.approved,this.#i?.unsubscribe();let s=`${r}::license`;o.approved?i?.licenseApproved?.(s):i?.licenseDenied?.(s)})}handleMessage(e){return Ke(`${this.key} received "${e.type}" for trace "${e.traceId}".`),e.type===xi.Attempt?this.#t?A(At.Abstain):this.#t===null?A(At.Deny):A(At.Abort):A()}destroy(){this.#i?.unsubscribe(),nt(`${this.key} - destroy unsubscribe`)}reset(){nt(`${this.key} - reset noop`)}};H_=kp=ul([Ep({type:co.License,key:wp("Policy","CoreLicense"),critical:!0})],H_);var $_=class{evaluateAttempt(t,e,i){if(t.length===0)return A(this.arbitrate(e.traceId,[At.Abstain]));try{let r=t.map(o=>(i?.startControllerVote(e.ctx.featureCellKey,o.key,e.traceId),o.handleMessage(e).pipe(ye(s=>s??At.Abstain),wt(s=>{i?.endControllerVote(e.ctx.featureCellKey,o.key,e.traceId,s)}),Ji(s=>(nt("[vault:arbitrator] controller threw during attempt:",s),i?.endControllerVote(e.ctx.featureCellKey,o.key,e.traceId,At.Deny),i?.controllerFailure(o.key,e.ctx,s),A(At.Deny))))));return js(r).pipe(ye(o=>this.arbitrate(e.traceId,o)))}catch{return A(this.arbitrate(e.traceId,[At.Deny]))}}notify(t,e){if(t.length===0)return A(void 0);try{let i=t.map(r=>r.handleMessage(e).pipe(ye(()=>{}),Ji(o=>(nt("[vault:arbitrator] controller threw during notify:",o),A(void 0)))));return js(i).pipe(ye(()=>{}))}catch{return A(void 0)}}arbitrate(t,e){return e.includes(At.Abort)?{traceId:t,outcome:Vn.Abort}:e.includes(At.Deny)?{traceId:t,outcome:Vn.Deny}:e.every(s=>s===At.Abstain)?{traceId:t,outcome:Vn.Abstain}:(sn("Unknown controller vote detected",{traceId:t,votes:e}),{traceId:t,outcome:Vn.Deny})}},B={Boundary:"boundary",State:"state",Error:"error"},Cn={Never:"never",Optional:"optional",Required:"required"},ZL={[B.Boundary]:{state:Cn.Never,payload:Cn.Optional,error:Cn.Never},[B.State]:{state:Cn.Required,payload:Cn.Optional,error:Cn.Never},[B.Error]:{state:Cn.Required,payload:Cn.Optional,error:Cn.Required}},XL={"stage:end:core-state":{category:B.State},"stage:end:core-emit-state":{category:B.State},"lifecycle:end:merge":{category:B.State},"lifecycle:end:replace":{category:B.State},"stage:end:compute-merge":{category:B.State},"stage:end:reducer":{category:B.State},"stage:end:resolve":{category:B.State},"lifecycle:notification:failure":{category:B.Error},"lifecycle:notification:runtime-error":{category:B.Error},"lifecycle:notification:warn":{category:B.Error},"lifecycle:notification:fatal":{category:B.Error},"conductor:start:abort":{category:B.Boundary},"conductor:start:deny":{category:B.Boundary},"conductor:start:revote":{category:B.Boundary},"controller:end:vote":{category:B.Boundary},"conductor:start:license-approved":{category:B.Boundary},"conductor:start:license-attempt":{category:B.Boundary},"controller:end:attempt":{category:B.Boundary},"controller:notification:finalize":{category:B.Boundary},"controller:notification:success":{category:B.Boundary},"controller:restart:restart-controller-attempt":{category:B.Boundary},"controller:start:attempt":{category:B.Boundary},"controller:start:vote":{category:B.Boundary},"lifecycle:end:initialized":{category:B.Boundary},"lifecycle:start:core-callback-error":{category:B.Boundary},"lifecycle:start:core-error":{category:B.Boundary},"lifecycle:start:core-state":{category:B.Boundary},"lifecycle:start:global-error":{category:B.Boundary},"lifecycle:start:initialized":{category:B.Boundary},"lifecycle:start:merge":{category:B.Boundary},"lifecycle:start:replace":{category:B.Boundary},"lifecycle:start:error-transform":{category:B.Boundary},"lifecycle:end:error-transform":{category:B.Boundary},"lifecycle:end:core-callback-error":{category:B.Boundary},"lifecycle:end:core-error":{category:B.Boundary},"lifecycle:end:global-error":{category:B.Boundary},"stage:end:after-tap":{category:B.Boundary},"stage:end:before-tap":{category:B.Boundary},"stage:end:encrypt":{category:B.Boundary},"stage:end:filter":{category:B.Boundary},"stage:end:load-persist":{category:B.Boundary},"stage:end:operator":{category:B.Boundary},"stage:end:persist":{category:B.Boundary},"stage:start:after-tap":{category:B.Boundary},"stage:start:before-tap":{category:B.Boundary},"stage:start:compute-merge":{category:B.Boundary},"stage:start:encrypt":{category:B.Boundary},"stage:start:filter":{category:B.Boundary},"stage:start:load-persist":{category:B.Boundary},"stage:start:operator":{category:B.Boundary},"stage:start:persist":{category:B.Boundary},"stage:start:reducer":{category:B.Boundary},"stage:start:resolve":{category:B.Boundary}},F_=null;function QL(){return F_||(F_=new z_),F_}var z_=class{globalInsightOverride=null;cellRegistry=new Map},W_=class{shared=QL();key=w_("DevTools","Telemetry");get globalInsightOverride(){return this.shared.globalInsightOverride}set globalInsightOverride(t){this.shared.globalInsightOverride=t}get cellRegistry(){return this.shared.cellRegistry}registerCell(t,e){let i=!!e;this.cellRegistry.set(t,{hasInsight:i,insights:i?[e]:[]})}activateGlobalInsights(t){this.globalInsightOverride=t}isChromeDevTools(t){return t===Xx||t===Zx}applyPolicy(t,e){let i=XL[t.name]?.category??B.Boundary,r=ZL[i],o=!!e?.wantsState,s=!!e?.wantsPayload,a=!!e?.wantsErrors;return t.source||delete t.source,(!o||r.state===Cn.Never)&&delete t.state,(!s||r.payload===Cn.Never||r.payload===Cn.Optional&&t.payload===void 0)&&delete t.payload,!a||r.error===Cn.Never?delete t.error:r.error===Cn.Required&&(!s||t.payload===void 0)&&delete t.payload,t}},L_=null;function tb(){return L_||(L_=new G_),L_}var G_=class extends W_{#t=N_();constructor(){super(),typeof window<"u"&&(window.sdux??={},window.sdux.vaultMonitorInstance=this)}#i(t){let e=t?.snapshot??t?.lastSnapshot??t?.state??{};return{isLoading:e.isLoading??!1,value:e.value??void 0,error:e.error??null,hasValue:e.hasValue??!!e.value}}startAfterTap(t,e,i){this.#e({cell:t,behaviorKey:e,name:"after-tap",ctx:i})}endAfterTap(t,e,i,r){this.#r({cell:t,behaviorKey:e,name:"after-tap",ctx:i,payload:r})}startBeforeTap(t,e,i){this.#e({cell:t,behaviorKey:e,name:"before-tap",ctx:i})}endBeforeTap(t,e,i,r){this.#r({cell:t,behaviorKey:e,name:"before-tap",ctx:i,payload:r})}startClearPersist(t,e,i){this.#a({cell:t,behaviorKey:e,name:"clear-persist",ctx:i})}endClearPersist(t,e,i){this.#l({cell:t,behaviorKey:e,name:"clear-persist",ctx:i})}startComputeMerge(t,e,i){this.#e({cell:t,behaviorKey:e,name:"compute-merge",ctx:i})}endComputeMerge(t,e,i){this.#r({cell:t,behaviorKey:e,name:"compute-merge",ctx:i})}notifyConductorDeny(t,e,i){this.#c({cell:t,behaviorKey:e,name:"deny",ctx:i})}conductorCrashed(t,e,i,r){let o=cs(r,t),s="fatal";sn(t,e,o),this.#o({cell:t,behaviorKey:e,name:s,ctx:i,payload:{message:"This has proven to be untested code in unit tests. So you win some type of prize. Please create a github issues and share your amazing gift to bring down a systm."},error:o})}conductorRevote(t,e,i){this.#o({cell:t,behaviorKey:e,name:"revote",ctx:i})}conductorAbort(t,e,i){this.#o({cell:t,behaviorKey:e,name:"abort",ctx:i})}conductorLicenseAttempt(t,e){this.#o({cell:t,behaviorKey:e,name:"license-attempt",ctx:{}})}conductorLicenseApproved(t,e){this.#o({cell:t,behaviorKey:e,name:"license-approved",ctx:{}})}conductorLicenseDenied(t,e){this.#o({cell:t,behaviorKey:e,name:"license-denied",ctx:{}})}startControllerAttempt(t,e,i){this.#u({cell:t,behaviorKey:e,name:"attempt",ctx:i})}endControllerAttempt(t,e,i,r){this.#d({cell:t,behaviorKey:e,name:"attempt",ctx:i,payload:r})}restartControllerAttempt(t,e,i,r){this.#f({cell:t,behaviorKey:e,name:"restart-attempt",ctx:i,payload:r})}controllerFailure(t,e,i){let r=cs(i,t);this.#o({cell:e.featureCellKey,behaviorKey:t,name:"failure",ctx:e,error:r})}controllerFinalize(t,e){this.#o({cell:e.featureCellKey,behaviorKey:t,name:"finalize",ctx:e})}controllerSuccess(t,e){this.#o({cell:e.featureCellKey,behaviorKey:t,name:"success",ctx:e})}startControllerVote(t,e,i){this.#u({cell:t,behaviorKey:e,name:"vote",ctx:{traceId:i}})}endControllerVote(t,e,i,r){this.#d({cell:t,behaviorKey:e,name:"vote",ctx:{traceId:i},payload:r})}startConductorVote(t,e,i){this.#u({cell:t,behaviorKey:e,name:"vote",ctx:i})}endConductorVote(t,e,i,r){this.#d({cell:t,behaviorKey:e,name:"vote",ctx:i,payload:r})}startCoreCallbackError(t,e,i){this.#e({cell:t,behaviorKey:e,name:"core-callback-error",ctx:i})}endCoreCallbackError(t,e,i){this.#r({cell:t,behaviorKey:e,name:"core-callback-error",ctx:i})}startCoreEmitState(t,e,i){this.#e({cell:t,behaviorKey:e,name:"core-emit-state",ctx:i})}endCoreEmitState(t,e,i){this.#r({cell:t,behaviorKey:e,name:"core-emit-state",ctx:i})}startCoreError(t,e,i){this.#e({cell:t,behaviorKey:e,name:"core-error",ctx:i})}endCoreError(t,e,i){this.#r({cell:t,behaviorKey:e,name:"core-error",ctx:i})}startCoreState(t,e,i){this.#e({cell:t,behaviorKey:e,name:"core-state",ctx:i})}endCoreState(t,e,i){this.#r({cell:t,behaviorKey:e,name:"core-state",ctx:i})}startDecrypt(t,e,i){this.#e({cell:t,behaviorKey:e,name:"decrypt",ctx:i})}endDecrypt(t,e,i,r){this.#r({cell:t,behaviorKey:e,name:"decrypt",ctx:i,payload:r})}startDestroy(t,e,i){this.#a({cell:t,behaviorKey:e,name:"destroy",ctx:i})}endDestroy(t,e,i,r){this.#l({cell:t,behaviorKey:e,name:"destroy",ctx:i,payload:r})}startEncrypt(t,e,i){this.#e({cell:t,behaviorKey:e,name:"encrypt",ctx:i})}endEncrypt(t,e,i){this.#r({cell:t,behaviorKey:e,name:"encrypt",ctx:i})}runtimeError(t,e,i,r){let o=cs(r,t);sn(t,e,o),this.#o({cell:t,behaviorKey:e,name:"runtime-error",ctx:i,error:o})}startErrorTransform(t,e,i){this.#e({cell:t,behaviorKey:e,name:"error-transform",ctx:i})}endErrorTransform(t,e,i,r){this.#r({cell:t,behaviorKey:e,name:"error-transform",ctx:i,payload:r})}startFilter(t,e,i){this.#e({cell:t,behaviorKey:e,name:"filter",ctx:i})}endFilter(t,e,i){this.#r({cell:t,behaviorKey:e,name:"filter",ctx:i})}startGlobalError(t,e,i){this.#a({cell:t,behaviorKey:e,name:"global-error",ctx:i})}endGlobalError(t,e,i){this.#l({cell:t,behaviorKey:e,name:"global-error",ctx:i})}ingressSubscribed(t,e,i,r){this.#a({cell:t,behaviorKey:e,name:"ingress-subscribed",ctx:i,source:r})}ingressCompleted(t,e,i,r){this.#l({cell:t,behaviorKey:e,name:"ingress-completed",ctx:i,source:r})}startInitialized(t,e,i){this.#a({cell:t,behaviorKey:e,name:"initialized",ctx:i})}endInitialized(t,e,i){this.#l({cell:t,behaviorKey:e,name:"initialized",ctx:i})}startInterceptor(t,e,i){this.#e({cell:t,behaviorKey:e,name:"interceptor",ctx:i})}endInterceptor(t,e,i,r){this.#r({cell:t,behaviorKey:e,name:"interceptor",ctx:i,payload:r})}startLoadPersist(t,e,i){this.#e({cell:t,behaviorKey:e,name:"load-persist",ctx:i})}endLoadPersist(t,e,i,r){this.#r({cell:t,behaviorKey:e,name:"load-persist",ctx:i,payload:r})}startMerge(t,e,i){this.#a({cell:t,behaviorKey:e,name:"merge",ctx:i})}endMerge(t,e,i,r){this.#l({cell:t,behaviorKey:e,name:"merge",ctx:i,payload:r})}startOperator(t,e,i){this.#e({cell:t,behaviorKey:e,name:"operator",ctx:i})}endOperator(t,e,i,r){this.#r({cell:t,behaviorKey:e,name:"operator",ctx:i,payload:r})}startPersist(t,e,i){this.#e({cell:t,behaviorKey:e,name:"persist",ctx:i})}endPersist(t,e,i){this.#r({cell:t,behaviorKey:e,name:"persist",ctx:i})}startReducer(t,e,i){this.#e({cell:t,behaviorKey:e,name:"reducer",ctx:i})}endReducer(t,e,i){this.#r({cell:t,behaviorKey:e,name:"reducer",ctx:i})}startReplace(t,e,i){this.#a({cell:t,behaviorKey:e,name:"replace",ctx:i})}endReplace(t,e,i,r){this.#l({cell:t,behaviorKey:e,name:"replace",ctx:i,payload:r})}startReset(t,e,i){this.#a({cell:t,behaviorKey:e,name:"reset",ctx:i})}endReset(t,e,i,r){this.#l({cell:t,behaviorKey:e,name:"reset",ctx:i,payload:r})}startResolve(t,e,i){this.#e({cell:t,behaviorKey:e,name:"resolve",ctx:i})}endResolve(t,e,i){this.#r({cell:t,behaviorKey:e,name:"resolve",ctx:i})}startSetInitialValue(t,e,i){this.#a({cell:t,behaviorKey:e,name:"set-initial-value",ctx:i})}endSetInitialValue(t,e,i){this.#l({cell:t,behaviorKey:e,name:"set-initial-value",ctx:i})}startStepwise(t,e,i){this.#e({cell:t,behaviorKey:e,name:"stepwise",ctx:i})}endStepwise(t,e,i){this.#r({cell:t,behaviorKey:e,name:"stepwise",ctx:i})}warn(t,e,i,r){let o=cs(r,t);nt(t,e,o),this.#o({cell:t,behaviorKey:e,name:"warn",ctx:i,error:o})}#n(t){return t.name=`${t.type}:${t.boundary}:${t.name}`,t}#e(t){t.type=Yt.Stage,t.boundary=bn.Start,this.#s(this.#n(t))}#r(t){t.type=Yt.Stage,t.boundary=bn.End,this.#s(this.#n(t))}#a(t){t.type=Yt.Lifecycle,t.boundary=bn.Start,this.#s(this.#n(t))}#l(t){t.type=Yt.Lifecycle,t.boundary=bn.End,this.#s(this.#n(t))}#o(t){t.type=Yt.Lifecycle,t.boundary=bn.Notification,this.#s(this.#n(t))}#c(t){t.type=Yt.Conductor,t.boundary=bn.Notification,this.#s(this.#n(t))}#u(t){t.type=Yt.Controller,t.boundary=bn.Start,this.#s(this.#n(t))}#d(t){t.type=Yt.Controller,t.boundary=bn.End,this.#s(this.#n(t))}#f(t){t.type=Yt.Controller,t.boundary=bn.Notification,this.#s(this.#n(t))}#s(t){let{cell:e,ctx:i,name:r,behaviorKey:o,source:s,error:a,payload:l,type:c,boundary:d}=t;if(this.isChromeDevTools(e)||!Vt.active)return;let u;if(this.globalInsightOverride)u=this.globalInsightOverride;else{let g=this.cellRegistry.get(e);if(!g||!g.hasInsight)return;u=g.insights[0]}let p={id:crypto.randomUUID(),cell:e,behaviorKey:o,name:r,timestamp:Date.now(),state:this.#i(i),type:c??Yt.Unknown,boundary:d??bn.Unknown,payload:l,error:a,source:s};i.traceId&&(p.traceId=i.traceId),this.#t.nextPipeline(this.applyPolicy(p,u))}},ni={Abort:"abort",Failure:"failure",LicenseApproved:"licenseApproved",LicenseDenied:"licenseDenied",Revote:"revote",Success:"success"},q_=class{controllers;events$;#t=new $_;#i=tb();constructor(t,e){this.controllers=t,this.events$=e}evaluateAttempt(t){let e={type:xi.Attempt,traceId:t.traceId,ctx:t};return this.#t.evaluateAttempt(this.controllers,e,this.#i)}notifySuccess(t){if(!this.controllers.length)return;let e={type:xi.Success,traceId:t.traceId,ctx:t};this.#i.controllerSuccess("decision-engine",t),this.#t.notify(this.controllers,e).subscribe({complete:()=>{this.events$.closed||this.events$.next({traceId:t.traceId,type:ni.Success})}})}notifyFailure(t,e){if(!this.controllers.length)return;let i={type:xi.Failure,traceId:t.traceId,ctx:t,error:e};this.#i.controllerFailure("decision-engine",t,e),this.#t.notify(this.controllers,i).subscribe({complete:()=>{this.events$.closed||this.events$.next({traceId:t.traceId,type:ni.Failure})}})}notifyFinalize(t){if(!this.controllers.length)return;let e={type:xi.Finalize,traceId:t.traceId};this.#i.controllerFinalize("decision-engine",t),this.#t.notify(this.controllers,e).subscribe()}},Ye="vault-orchestrator",JL=new Set(["initialize","destroy","destroyed$","reset","reset$","reducers","operators","filters","interceptors","mergeState","replaceState","beforeTaps","afterTaps","key","state","cache","persist","encrypt","beforeTap","afterTap","hydrate"]),Sr={NotRequired:"not-required",Pending:"pending",Revoked:"revoked",Timeout:"timeout",Valid:"valid"},eV=new Set(["SDUX::Behavior::Core::AfterTap","SDUX::Behavior::Core::ArrayMerge","SDUX::Behavior::Core::BeforeTap","SDUX::Behavior::Core::EmitState","SDUX::Behavior::Core::Error","SDUX::Behavior::Core::ErrorCallback","SDUX::Behavior::Core::Filter","SDUX::Behavior::Core::FromObservable","SDUX::Behavior::Core::FromPromise","SDUX::Behavior::Core::FromStream","SDUX::Behavior::Core::ObjectMerge","SDUX::Behavior::Core::Observable","SDUX::Behavior::Core::Promise","SDUX::Behavior::Core::Reducer","SDUX::Behavior::Core::State","SDUX::Behavior::Core::TabSyncState","SDUX::Behavior::Core::Value","SDUX::Behavior::Addon::DistinctUntilChanged","SDUX::Behavior::Cache::State","SDUX::Behavior::Core::Lookup","SDUX::Behavior::Core::Query","SDUX::Behavior::Encrypt::Aes256","SDUX::Behavior::Interceptor::GlobalErrorPause","SDUX::Behavior::Merge::ArrayAppend","SDUX::Behavior::Merge::ArrayPush","SDUX::Behavior::Merge::Deep","SDUX::Behavior::Persist::CookieStorage","SDUX::Behavior::Persist::LocalStorage","SDUX::Behavior::Persist::SessionStorage","SDUX::Behavior::Policy::StepwiseFilter","SDUX::Behavior::Policy::StepwiseReducer","SDUX::Behavior::Policy::StepwiseResolve","SDUX::Behavior::Core::License","SDUX::Controller::Policy::CoreAbstain","SDUX::Controller::Policy::CoreError","SDUX::Controller::Policy::CoreLicense","SDUX::Controller::Policy::TabSync","SDUX::Controller::Policy::Delay","SDUX::Controller::Policy::MaxFailures","SDUX::Controller::Policy::ReplayGlobalError","SDUX::Controller::Policy::Stepwise","SDUX::Controller::Policy::Throttle"]),aT="sdux-vault",tV="SDUX::Behavior::Core::License",an=null;function lT(n={}){an||(an=new K_(n))}var K_=class{#t;#i;#n=new Map;#e=new Map;#r=!1;#a=!1;#l;#o=new Map;#c=new E;#u=new Lr;#d=new Map;#f;#s=new Map;constructor(t){YL(this.#c,this.#u.asObservable()),this.setVaultConfig(t),this.#C(t.licenses),this.#g(),this.#A(),this.#O()}setVaultConfig(t){let e={devMode:t.devMode??!1,logLevel:t.logLevel??"off"};this.#f=Object.freeze(e),Vt.setDevMode(this.#f.devMode),Kx(this.#f.logLevel),this.#a=t.devMode?t.bypassLicensing??!1:!1,this.#l=t.licenseTimeoutMs??15e3,this.#I()}resetForTesting(){this.#t?.unsubscribe(),this.#t=void 0,this.#i?.unsubscribe(),this.#i=void 0,this.#f=void 0,this.resetFeatureCellRegistry(),this.#d.clear(),this.#n.clear()}resetFeatureCellRegistry(){this.#s.clear()}registerCellRuntime(t){this.#h(t)}registerBehaviors(t,e){let i=this.#h(t);i.behaviors=this.#p(e),i.behaviorsRegistered=!0}registerControllers(t,e){let i=this.#h(t);i.controllers=this.#p(e),i.controllersRegistered=!0}registerFluentApis(t,e){let i=this.#h(t);i.fluentApis=Object.freeze(e)}getLicensePayload(t){return this.#n.get(t)}isBypassLicensing(){return this.#a}isAuthorizedKey(t){return eV.has(t)}hasVaultLicense(){return this.#n.has(aT)}#C(t){if(t?.length)for(let e of t)e?.licenseId&&this.#n.set(e.licenseId,e.payload)}#p(t){return new Map(t.map(e=>{let i;this.#a?i=!1:i=e.needsLicense??!1;let r={key:e.key,type:e.type,critical:!!e.critical,needsLicense:i,validLicense:i?Sr.Pending:Sr.NotRequired};return[e.key,Object.freeze(r)]}))}#g(){this.#t=this.#c.subscribe(t=>{switch(t.type){case Gi.DescribeFeature:{let e=t;this.registerFluentApis(e.featureCellKey,this.#k(e));break}case Gi.DescribeBehaviors:{let e=t;this.registerBehaviors(e.featureCellKey,e.behaviors),this.#y(e.featureCellKey);break}case Gi.DescribeControllers:{let e=t;this.registerControllers(e.featureCellKey,e.controllers),this.#y(e.featureCellKey);break}case Gi.RequireLicense:{this.#E(t.featureCellKey),this.#x(t);return}case Gi.ValidateLicense:{this.#S(t),this.#y(t.featureCellKey);return}}})}#E(t){if(!this.#l||this.#o.has(t))return;let e=setTimeout(()=>{this.#w(t),this.#o.delete(t)},this.#l);this.#o.set(t,e)}#w(t){let e=this.#s.get(t);if(!e)return;let i=[...e.behaviors?.values()??[],...e.controllers?.values()??[]],r=!1;for(let o of i)o.needsLicense&&o.validLicense===Sr.Pending&&((e.behaviors?.has(o.key)?e.behaviors:e.controllers)?.set(o.key,Object.freeze($(b({},o),{validLicense:Sr.Timeout}))),r=!0);r&&this.#m(t,!1),this.#v(t)}#y(t){let e=this.#s.get(t);if(!e||!e.behaviorsRegistered||!e.controllersRegistered)return;let r=[...e.behaviors?.values()??[],...e.controllers?.values()??[]].filter(o=>o.needsLicense);if(r.length===0){this.#m(t,!0);return}if(r.some(o=>o.validLicense===Sr.Revoked||o.validLicense===Sr.Timeout)){this.#v(t),this.#m(t,!1);return}r.some(o=>o.validLicense===Sr.Pending)||this.#m(t,!0)}#v(t){let e=this.#o.get(t);e&&(clearTimeout(e),this.#o.delete(t))}#m(t,e){this.#e.has(t)||(this.#e.set(t,e),this.#v(t),this.#d.set(t,e),this.#u.next({featureCellKey:t,approved:e}))}#S(t){let{featureCellKey:e,key:i,licenseToken:r,valid:o}=t;if(this.#e.has(t.featureCellKey))return;if(!i){nt("Cannot validate license without a key.");return}let s=this.#s.get(e);s&&(this.#_(s.behaviors,i,r,o),this.#_(s.controllers,i,r,o),o&&i===tV&&this.#T())}#_(t,e,i,r){if(!t?.has(e))return;let o=t.get(e);if(o.needsLicense&&o.licenseId){if(o.licenseId!==i){nt(`[vault] License key mismatch for "${e}".`);return}t.set(e,Object.freeze($(b({},o),{validLicense:r?Sr.Valid:Sr.Revoked})))}}#x(t){let{featureCellKey:e,key:i,licenseToken:r}=t,o=this.#s.get(e);if(o){if(!i||typeof i!="string")throw new Error("[vault] Cannot register controller license without a key.");this.#D(o.behaviors,i,r),this.#D(o.controllers,i,r)}}#D(t,e,i){if(!t?.has(e))return;let r=t.get(e);r.needsLicense&&(r.licenseId||i&&t.set(e,Object.freeze($(b({},r),{licenseId:i}))))}#I(){Vt.active&&!x_.active&&console.error(`[vault] "Development Mode" is enabled outside of a test environment.
This can expose sensitive data because safeguards that normally remove or sanitize data are disabled.
You have explicitly disabled these safeguards and are responsible for ensuring production safety.
If this is intentional, you can safely ignore this message.`)}#k(t){let e=t?.fluentApis??{};return{filters:Array.isArray(e?.filters)?e.filters.length:0,reducers:Array.isArray(e?.reducers)?e.reducers.length:0,beforeTaps:Array.isArray(e?.beforeTaps)?e.beforeTaps.length:0,afterTaps:Array.isArray(e?.afterTaps)?e.afterTaps.length:0,interceptors:Array.isArray(e?.interceptors)?e.interceptors.length:0,operators:Array.isArray(e?.operators)?e.operators.length:0,emitStateCallbacks:Array.isArray(e?.emitStateCallbacks)?e.emitStateCallbacks.length:0,errorCallbacks:Array.isArray(e?.errorCallbacks)?e.errorCallbacks.length:0}}#h(t){return this.#s.has(t)||this.#s.set(t,{key:t,behaviorsRegistered:!1,controllersRegistered:!1}),this.#s.get(t)}#T(){this.#r||Vt.active&&(typeof document>"u"||(this.#r=!0,globalThis.sdux??={},globalThis.sdux.debugWidget??={},globalThis.sdux.debugWidget.aiAssistEnabled=!0,document.dispatchEvent(new CustomEvent("sdux-license-resolved"))))}#A(){Vt.active&&(typeof globalThis>"u"||(globalThis.sdux??={},globalThis.sdux.getRegistry=()=>this.getRegistrySnapshot()))}#O(){Vt.active&&(typeof document>"u"||(globalThis.sdux??={},globalThis.sdux.debugWidget??={},rT()))}registerVaultSettled(t,e){let i=this.#h(t);i.vaultSettled=e}async awaitFeatureCellSettled(t){let e=this.#s.get(t);if(!e)throw new Error(`[vault] FeatureCell "${t}" not registered.`);typeof e.vaultSettled=="function"&&(await e.vaultSettled(),await Promise.resolve())}async awaitAllSettled(){for(let t of this.#s.values())typeof t.vaultSettled=="function"&&await t.vaultSettled();await Promise.resolve()}getRegistrySnapshot(){return new Map(this.#s)}};function cT(n){if(!an)throw new Error("[vault] Vault not initialized.");if(!n)throw new Error("[vault] registerFeatureCell() requires a valid entry object.");if(!n.key||typeof n.key!="string")throw new Error('[vault] registerFeatureCell() requires a valid "key" (non-empty string).');an.registerCellRuntime(n.key)}function dT(n){if(!an)throw new Error("[vault] Vault not initialized.");if(typeof n!="string"||!n.trim())throw new Error("[vault] getLicensePayload() requires a valid licenseId.");return an.getLicensePayload(n)}function nV(n,t){if(!an)throw new Error("[vault] Vault not initialized.");if(!n||typeof n!="string")throw new Error('[vault] registerVaultSettled() requires a valid "key" (non-empty string).');typeof t=="function"&&an.registerVaultSettled(n,t)}function uT(n){return an?an.isBypassLicensing()?!0:an.isAuthorizedKey(n):!1}function fT(){return an?an.isBypassLicensing():!1}function nb(){return an?an.hasVaultLicense():!1}var Y_=class{#t=!1;#i;#n;#e;constructor(t,e,i){this.#i=t,this.#n=e,this.#e=i}initializeBehaviors(t,e){if(this.#t)throw new Error(`[vault] VaultBehaviorRunner already initialized \u2014 cannot reissue core behavior ID for feature cell "${this.#i}".`);if(this.#t=!0,!t||t.length===0)return[];let i=new Set;return t.map(r=>{let o=!1;try{if(typeof r!="function")return;let s=r[bp];if(!s)throw o=!0,new Error(`[vault] Behavior "${r.name}" missing @VaultBehavior metadata.`);let a=s.key,l=s.type;if(!a)throw o=!0,new Error('[vault] Behavior metadata missing "key".');if(!nb()&&!uT(a)){Ke(`[vault] Unlicensed behavior "${a}" skipped during initialization.`);return}if(!l)throw o=!0,new Error(`[vault] Behavior metadata missing "type" for "${a}".`);let c;if(s.wantsConfig){if(!s.configKey)throw o=!0,new Error(`[vault] Behavior "${a}" declares wantsConfig but has no configKey.`);c=e.get(s.configKey)}let d;if(s.needsLicense&&!fT()){if(!s.licenseId)throw o=!0,new Error(`[vault] Behavior "${a}" declares needsLicense but has no licenseId.`);if(d=dT(s.licenseId),d===void 0)throw o=!0,new Error(`[vault] License "${s.licenseId}" required by behavior "${a}" is not registered in Vault config.`)}let u;try{let p={featureCellKey:this.#i,behaviorConfig:c,licensePayload:d};s.type===R.TabSyncState&&(p=$(b({},p),{lastSnapshot:this.#n,state$:this.#e})),u=new r(a,p)}catch(p){throw o=s.critical,p}if(!u.key)throw o=!0,new Error(`[vault] Behavior missing key for type "${l}". Every behavior must define a unique "key".`);if(!S_(u.key))throw o=!0,new Error(`[vault] Behavior key "${u.key}" not valid format for "${l}" behavior.`);return u.key&&i.has(u.key)?(nt(`[vault] Skipping duplicate behavior with key "${u.key}"`),null):(u.key&&i.add(u.key),u)}catch(s){if(o)throw s;return nt(`[vault] Non-critical behavior initialization failed: ${s?.message}`),null}}).filter(r=>!!r)}applyBehaviorExtensions(t,e,i){for(let r of t){let o={featureCellKey:e.key,destroyed$:e.destroyed$,reset$:e.reset$,mergeState:e.mergeState,replaceState:e.replaceState,state$:e.state$,vaultMonitor:i},s=r.extendCellAPI?.(o);if(!(!s||typeof s!="object"))for(let[a,l]of Object.entries(s)){let c=e[a]!==void 0,d=Array.isArray(r.allowOverride)&&r.allowOverride.includes(a);if(JL.has(a))throw new Error(`[vault] Behavior "${r.key}" attempted to overwrite core FeatureCell method "${a}".`);if(c&&!d)throw new Error(`[vault] Behavior "${r.key}" attempted to redefine method "${a}" already provided by another behavior.`);c&&d&&(nt(`[vault] Behavior "${r.key}" is overriding method "${a}" (explicitly allowed).`),delete e[a]),Object.defineProperty(e,a,{value:(...u)=>{try{return typeof l!="function"?void 0:l(...u)}catch(p){throw sn(`[vault] Behavior extension "${a}" threw an error:`,p),p}},enumerable:!1,writable:!1,configurable:!0})}}}},iV=n=>n.type===R.ErrorTransform,rV=n=>n.type===R.CoreErrorCallback,oV=n=>n.type===R.CoreEmitState,Oa=n=>n===C_,V_=()=>crypto?.randomUUID?.()??Math.random().toString(36).slice(2,7),pT=n=>uo(n)||Oa(n),sV={pro:`
-----BEGIN PUBLIC KEY-----
MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEAuXto+eRaFm9pObys/IEI ASwV1wgGvNGJsiyw/9hXsEd9mA76aQI1X9lpkZRKmBFovHdK2unPHFOPQM0k9vJo ieFMNXO9kmHn7UYZV98bDCcDTNURFHQ4SWlcAE/HEiNqcUb9LwotFbON7/mcthM8 QQQ4Lycdv+lm1uozQl8rl+i7FjfQzLaxJMuAkm9jFZK+ta6eoSy/lmXfhDem8RIo dE19aZWfY+LTXP9nn977XFah0z0S0D3NSvMv96gZsXTN2hTbFBl5dgDMAOW9R5OI wT6I+kGwrVqARXq2pTDHnZjqfO3a+rT4Lrb5/L58RjQ0EfA5puZ16EXGEUpOabqI KVT4Z/wv818P8eyat+LtTcy2G0zx/h0Fcz0QANzx3P9K7ezxeqdg4SsjkcNXRWZq PaJUhZHygN/Xuef9zfWwjuKobCBSdyyeXxF5XS0A0Y6NBmdhikyHc/YOY2iYupIt xiUvlHaq97B5wej3XcTmp4kmJUQyeQ8oD5Mj8Dmf69oa7vhI/ANNKWo9s8e7u7UX Dx74Eu3d8JBpACQ+Vvek6ZEGw+D0yCyLF6u/CaCw+cb2cBYAlM7jWZ5kpgsbQcWw YP2nbGV3OofcEspoEU704M4RW4v+nSRYrJbMEIJJ5Wuxk2/RuUgk/9uwgCHAvzXZ cmGomIf9dXZGoNhwT5uW1OECAwEAAQ==
-----END PUBLIC KEY-----
`,enterprise:`
-----BEGIN PUBLIC KEY----- MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEA6k4XHyV4WE6Bd/fizN4Q c3C37LtskNTJ1c3FVxcziygAFd+fotRfbLHctwtJJhuO6+Pv+c1SPjrPeJsWRw4M IN7QHcBQHPbQDW/Erd1XjA0OVNbxs3xLVjtgMuVcd2sKYPp4nJqIyz5WLMde7v1g 1k8knI+ISrym0h4GcjkNSaHK5QKKpK7n3dzOXrjo1P6h1uOVsGAHC/ErVMQNHrAu dKgY+SDVn87oPIrd2pJb5SotI6H8HzODM/CDsF58hk/eK4zApnrtDViVb1j3oNCk hdDOnN98VIgwcHzHYZOhPFM0TFwudpi57Yu/PJJztI7WbsjpxTyX3JPvwVeWJR+Z tt6NEQ5ZaoBghGgHGiuRbhKR5qoznwsMkfb2jUbpbgRTinmtEjFmpIYSnROCixjq W1neupzBDrNi+JfoVsTwiP8SbzxHXWksN0gLMfL235l1LDMS/IrI3RmhcRkhB/Pu vPuc+jhPkwpbXaM9vDkkPWK1dmRYHWo3atYCWoSdK2705woo19oT8Dxm9OXKT+nh HsdOI+k9asBCqe4kQHi3OJ4Raesa6bFWWxKFLeUNKSAt7clJKo7GhrovnHIIAbty gk7ULdwLIlpjwB5mVUBBCts5z9KznHo+pumNoeEA8FGqq374a+jEPOHWjsshA678 RDYeqeRbh2VNcy/OwlqH/MUCAwEAAQ==
-----END PUBLIC KEY-----
`,development:`
-----BEGIN PUBLIC KEY----- MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEAsAFRjQalSEZkCDPrdBEf IMQpY7ujGf4pqjuFk86rkZENr7kJ00RjVJxuhcafgygdmxVAhKS+d1WtsSAw6c9m AawI+sSyhAClB+wrwfuCrxt/ZlLbNMiMH5SD1YvoRaHstkLpMGbWnbsLDI+cCpaL hGKk+5LoJLikhf9ipBkGX8VSAT0xTMk06iaYtEV85H9cMWtfx7seyBw2Mps/8S6f Rtp3tLlbNJIyh9+5XjtkTqYNRWJtFW1rv75K9GN9dPVXrEXUGojqeV13G+z2R3Sr QvmhESkyC1DviZBxaYnEhpWoijJQFJUQ1DGRi29ugktYzf36Otw9gyz9jGb5MLNE W+meR2LdnbTBy83QNtaS5lCzNJVo2ohwbD+djblNVegH/Dr0rK4IHEYSgjdxjErY 6xqykJpKJ025CTU4kyI3aaaYB+l2CQMAKVAh2y2rgGyJSJnMDTR44aBIZ8rtTu2r wazjBJ/RiMr0OOkfBqEQPKZ6qzSWtBDebvD0iUyRAP8SXSdDo1DcaJNamLLmjIxr 3KCcwgJt2oLcdZZHKG3WbjqmIdp7tq03O4gajKJHd5GmyLWtHXKqBwaijAx9aNqr qDPWj/Qg/8C9qpSBs7EUod3slV6UhO4yEnb7FdD/O0o8mRMU0rtJ0KQTarpEh2bY MKVsYxByiFeAjUJUWLSqIX8CAwEAAQ==
-----END PUBLIC KEY-----
`},oT=!1;var aV={verify:async n=>{try{let t=n.indexOf(".");if(t===-1)return!1;let e=n.substring(0,t),i=n.substring(t+1),r=atob(e),o=JSON.parse(r),s=Uint8Array.from(atob(i),u=>u.charCodeAt(0)),a=o?.licenseType;if(!a)return!1;if(!Vt.active&&a==="development")return console.error("[sdux-vault] Development license token rejected in production environment."),!1;let l=sV[a];if(!l)return!1;let c=await lV(l),d=await crypto.subtle.verify({name:"RSASSA-PKCS1-v1_5",hash:"SHA-256"},c,s,new TextEncoder().encode(e));if(oT||(oT=!0,d?console.info(`[sdux-vault] License verified \u2014 organization: "${o.organization}", tier: "${o.licenseType}"`):console.warn(`[sdux-vault] License signature invalid \u2014 organization: "${o.organization}", tier: "${o.licenseType}"`),console.info("[sdux-vault] License organization:",o.organization),console.info("[sdux-vault] License domain:",o.domain),console.info("[sdux-vault] License type:",o.licenseType),console.info("[sdux-vault] License issuedAt:",Tp(o.issuedAt)),console.info("[sdux-vault] License expires:",Tp(o.expires))),d&&o.licenseType==="enterprise"&&typeof o.expires=="number"){let u=o.expires-Date.now();if(u<0)return console.error(`[sdux-vault] Enterprise license expired \u2014 organization: "${o.organization}", expired: ${Tp(o.expires)}`),!1;let p=360*60*60*1e3;u<=p&&console.warn(`[sdux-vault] Enterprise license expiring soon \u2014 organization: "${o.organization}", expires: ${Tp(o.expires)}`)}return d}catch(t){return console.error("[sdux-vault] License token verification failed:",t),!1}}};async function lV(n){let t=dV(cV(n));return crypto.subtle.importKey("spki",t,{name:"RSASSA-PKCS1-v1_5",hash:"SHA-256"},!1,["verify"])}function cV(n){let t=n.replace(/-----.*KEY-----/g,"").replace(/\s+/g,"");return atob(t)}function dV(n){let t=new ArrayBuffer(n.length),e=new Uint8Array(t);for(let i=0;i<n.length;i++)e[i]=n.charCodeAt(i);return t}function Tp(n){return typeof n=="string"?n:new Intl.DateTimeFormat("en-US",{month:"2-digit",day:"2-digit",year:"numeric"}).format(new Date(n))}async function uV(n){try{return n?await aV.verify(n):!1}catch{return!1}}var ib=(()=>{class n{static needsLicense;static key;#t;#i;#n;#e;constructor(e){let i=this.constructor;if(typeof i.key!="string"||!i.key.trim())throw new Pc('LicensingClass requires a static "key". Did you forget @VaultBehavior or @VaultController?');this.#e=Bc(),this.#n=i.key,this.#i=e.featureCellKey,i.needsLicense&&this.#r()}#r(){this.#t=this.#e.requestLicense(this.#i,this.#n)}validateLicense(e){if(!this.#t)throw new Pc(`validateLicense() called but no license was requested for "${this.#i}" and "${this.#n}".`);this.#e.validateLicense(this.#i,this.#n,this.#t,e)}}return n})(),Z_=class extends ib{behaviorCtx;static type;static key;static critical;static needsLicense;type=R.CoreLicense;critical=!0;key;constructor(t,e){super(e),this.behaviorCtx=e,this.key=t,uV(this.behaviorCtx.licensePayload).then(i=>this.validateLicense(i))}destroy(){nt(`${this.key} - destroy noop`)}reset(){nt(`${this.key} - reset noop`)}};Z_=ul([Qx({type:R.CoreLicense,key:w_("Core","License"),critical:!0,needsLicense:!0,licenseId:aT})],Z_);var X_=class{#t;#i;#n;#e;cellKey;decisionEngine;#r;#a;#l;#o;#c;#u;#d;privateErrorService=Yx();#f=[];#s;#C;#p;vaultMonitor=tb();constructor(t){this.#t=t.afterTapCallbacks??[],this.#i=t.beforeTapCallbacks??[],this.cellKey=t.cell?.key,this.#o=t.emitStateCallbacks??[],this.#d=t.errorCallbacks??[],this.#f=t.filterCallbacks??[],this.#s=t.initialState,this.#p=t.reducerCallbacks??[]}initializeOrchestrator(t){t.behaviors=t.behaviors??[],this.#_(t)}async initializeFeatureCell(t){await this.#$(t)}destroyBehaviors(t){this.#j(t)}resetBehaviors(t){this.#L(t)}async orchestrate(t,e){t.operation===ti.Replace?await this.#A(t):await this.#O(t,e)}buildControllerCtx(t){return{traceId:t.traceId,featureCellKey:t.featureCellKey,snapshot:t.lastSnapshot,incoming:t.incoming,operation:t.operation}}normalizeIncoming(t){return t?M_(t)||Mn(t)||ka(t)||ka(t)?t:tT(t)?Ie(t):{value:t}:null}controllerOutcomeNotification(t,e){switch(t){case Vn.Abort:{this.#c.finalizeControllerAbort(e);break}case Vn.Deny:{this.#c.finalizeControllerDeny(e);break}}}prepareIncoming(t,e,i){t=this.#g(t,e,i);let r=this.#c.preparePipelineIncoming(t);if(uo(r)&&(this.vaultMonitor.startCoreState(this.cellKey,Ye,t),this.#M(t),this.vaultMonitor.endCoreState(this.cellKey,Ye,t)),ds(r)){this.vaultMonitor.startCoreState(this.cellKey,Ye,t),this.#L(t),this.#M(t),this.vaultMonitor.endCoreState(this.cellKey,Ye,t);return}return r}#g(t,e,i){return t.incoming=this.normalizeIncoming(e),t.resolveType=this.#H(e),t.operation=i,t}#E(t,e){let i=e.behaviors.filter(r=>r.type===R.Merge);if(i.length>1){let r=i.map(o=>o.key).join(", ");throw new Error(`SDuX Error: More than one MergeBehavior was provided. Only one merge strategy can be active per FeatureCell. Received: ${r}. Fix: Remove additional merge behaviors or combine them into a single behavior.`)}return i.length===1&&(t.push(i[0]),t=t.filter(r=>r.type!==R.Merge)),t}#w(t){let e=t.defaultBehaviors??[];return e=this.#y(e,t),e=this.#E(e,t),e=this.#v(e,t),e=this.#m(e),e}#y(t,e){return e?.errorCallbacks?.length===0?t.filter(i=>i.type!==R.CoreErrorCallback):t}#v(t,e){return e?.emitStateCallbacks?.length===0?t.filter(i=>i.type!==R.CoreEmitState):t}#m(t){return t=t?.filter(e=>e.type!==R.CoreLicense),nb()&&t.push(Z_),t}#S(t){let e=t.map(i=>{let r=i[bp];return{key:i.key,type:r.type,critical:r.critical,needsLicense:r.needsLicense}});Bc().describeBehaviors({featureCellKey:this.cellKey,behaviors:e})}#_(t){let e=this.#w(t),i=t.behaviors?.filter(a=>!(a.type===R.CoreAfterTap||a.type===R.CoreBeforeTap||a.type===R.CoreError||a.type===R.CoreErrorCallback||a.type===R.CoreEmitState||a.type===R.CoreLicense||a.type===R.CoreState||a.type===R.Filter||a.type===R.FromObservable||a.type===R.FromPromise||a.type===R.FromStream||a.type===R.Reduce||a.type===R.Resolve));t.operators=t.operators??[],t.interceptors=t.interceptors??[];let r=[...e,...i,...t.operators,...t.interceptors];r.some(a=>a.type===R.TabSyncState)&&(r=r.filter(a=>a.type!==R.CoreState));let s=new Y_(this.cellKey,t.lastSnapshot,t.state$);this.#S(r),this.#n=s.initializeBehaviors(r,t.behaviorConfigs),this.#I(),this.#k(),this.#x(),this.#D(),s.applyBehaviorExtensions(this.#n,t.cell,this.vaultMonitor)}#x(){this.#e=this.#n.filter(t=>!(t.type===R.CoreState||t.type===R.TabSyncState||t.type===R.CoreEmitState||t.type===R.CoreError||t.type===R.ErrorTransform||t.type===R.CoreErrorCallback||t.type===R.Merge))}#D(){let t=this.#n.filter(r=>r.type===R.TabSyncState),e=this.#n.filter(r=>r.type===R.CoreState),i=t.length>0?t:e;if(i.length>1)throw new Error("Only one core state behavior can be registered for a FeatureCell.");this.#c=i[0]??null,this.#l=this.#n.filter(r=>oV(r))[0]}#I(){let t=this.#n.filter(e=>e.type===R.CoreError);if(t.length>1)throw new Error("Only one core error behavior can be registered for a FeatureCell.");this.#r=t[0]??null,this.#a=this.#n.filter(e=>rV(e))[0],this.#u=this.#n.filter(e=>iV(e))}#k(){let t=this.#n.filter(e=>e.type===R.Merge);this.#C=t[0]??null}async#h(t,e,i){let r=await this.#b(t,e,i);return ds(r)?Fc:uo(r)?Dp:b_}async#T(t,e){let i,r=await this.#h(R.StepwiseResolve,t,e);if(!Sp(r))return r;if(this.#V()){if(i=await this.#B(t,e),uo(i))return Dp}else i=e;i=await this.#b(R.Filter,t,i);let o=await this.#h(R.StepwiseFilter,t,i);if(!Sp(o))return o;await this.#b(R.CoreBeforeTap,t,Ie(i)),i=await this.#b(R.Reduce,t,i);let s=await this.#h(R.StepwiseReducer,t,i);if(!Sp(s))return s;await this.#b(R.CoreAfterTap,t,Ie(i));let a=Ie(i),l=a;return l=await this.#F(R.Encrypt,t,l),await this.#F(R.Persist,t,l),a}async#A(t){this.vaultMonitor.startReplace(this.cellKey,Ye,t),await this.#P(async()=>{let e;if(e=await this.#N(t),!Oa(e)){let i=await this.#b(R.Resolve,t,void 0);ds(i)?e=Fc:e=await this.#T(t,i)}return this.#R(e,t)},t)}async#O(t,e){this.vaultMonitor.startMerge(this.cellKey,Ye,t),await this.#P(async()=>{let i=Ie(t.lastSnapshot.value),r;if(r=await this.#N(t),!Oa(r)){let o=await this.#b(R.Resolve,t,void 0),s=Ie(o);this.vaultMonitor.startComputeMerge(this.cellKey,Ye,t);let a=await this.#C.computeMerge(i,s,e);if(this.vaultMonitor.endComputeMerge(this.cellKey,Ye,t),ds(a))r=Fc;else{let l=Ie(a);r=await this.#T(t,l)}}return await this.#R(r,t)},t)}async#R(t,e){let i;return Oa(t)?i={pipelinePaused:!0}:ds(t)?i={pipelineStateCleared:!0}:(Vc(t)||uo(t))&&(i={noop:!0}),e.operation===ti.Replace?this.vaultMonitor.endReplace(this.cellKey,Ye,e,i):this.vaultMonitor.endMerge(this.cellKey,Ye,e,i),t}async#P(t,e){try{let i=await t();this.vaultMonitor.startCoreState(this.cellKey,Ye,e),Oa(i)?this.#c.finalizePipelineVaultStop(e):this.#c.finalizePipelineState(i,e),await this.#M(e),this.vaultMonitor.endCoreState(this.cellKey,Ye,e),this.decisionEngine?.notifySuccess(this.buildControllerCtx(e))}catch(i){let r=await this.#U(i,e);await this.decisionEngine?.notifyFailure(this.buildControllerCtx(e),r)}}async#b(t,e,i){let r;t===R.Resolve?r=this.#e.filter(o=>o.resolveType===e.resolveType&&o.type===t):r=this.#e.filter(o=>o.type===t);for(let o of r){let s;try{switch(t){case R.Resolve:typeof o.computeResolve=="function"&&(this.vaultMonitor.startResolve(this.cellKey,o.key,e),s=await o.computeResolve(e),Wi(s)&&(i=Ie(s)),this.vaultMonitor.endResolve(this.cellKey,o.key,e));break;case R.StepwiseResolve:case R.StepwiseFilter:case R.StepwiseReducer:if(typeof o.evaluateStepwise=="function"){this.vaultMonitor.startStepwise(this.cellKey,o.key,e);let a=Ie(e.lastSnapshot.value),l=Ie(i);s=await o.evaluateStepwise(a,l,e.featureCellKey),this.vaultMonitor.endStepwise(this.cellKey,o.key,e)}break;case R.Filter:if(typeof o.applyFilter=="function")for(let a of this.#f){this.vaultMonitor.startFilter(this.cellKey,o.key,e);let l=Ie(i),c=await o.applyFilter(l,a);this.vaultMonitor.endFilter(this.cellKey,o.key,e),Wi(c)&&(i=Ie(c))}break;case R.CoreBeforeTap:if(typeof o.applyBeforeTap=="function")for(let a of this.#i){this.vaultMonitor.startBeforeTap(this.cellKey,o.key,e);let l=Ie(i);await o.applyBeforeTap(l,a),this.vaultMonitor.endBeforeTap(this.cellKey,o.key,e)}break;case R.Reduce:if(typeof o.applyReducer=="function"){if(Vc(i)&&this.#p.length>0)throw new Error(`[vault] Reducer stage received undefined state in FeatureCell "${this.cellKey}", but reducers are registered.`);for(let a of this.#p){this.vaultMonitor.startReducer(this.cellKey,o.key,e);let l=Ie(i),c=await o.applyReducer(l,a);this.vaultMonitor.endReducer(this.cellKey,o.key,e),Wi(c)&&(i=Ie(c))}}break;case R.CoreAfterTap:if(typeof o.applyAfterTap=="function")for(let a of this.#t){this.vaultMonitor.startAfterTap(this.cellKey,o.key,e);let l=Ie(i);await o.applyAfterTap(l,a),this.vaultMonitor.endAfterTap(this.cellKey,o.key,e)}break}}catch(a){throw this.vaultMonitor.runtimeError(this.cellKey,o.key,e,a),a}Wi(s)&&(i=Ie(s))}return i}async#N(t){let e=this.#e.filter(i=>i.type===R.Interceptor);for(let i of e)try{this.vaultMonitor.startInterceptor(this.cellKey,i.key,t),t.incoming=Ie(t.incoming);let r=await i.applyInterceptor(t);if(Oa(r))return this.vaultMonitor.endInterceptor(this.cellKey,i.key,t,{pipelinePaused:!0}),C_;this.vaultMonitor.endInterceptor(this.cellKey,i.key,t)}catch(r){throw this.vaultMonitor.runtimeError(this.cellKey,i.key,t,r),r}}#V(){return this.#e.filter(e=>e.type===R.Operator).length>0}async#B(t,e){let i=this.#e.filter(r=>r.type===R.Operator);for(let r of i)try{this.vaultMonitor.startOperator(this.cellKey,r.key,t);let o=Ie(e),s=await r.applyOperator(o);if(Vc(s)){this.vaultMonitor.endOperator(this.cellKey,r.key,t,{noop:!0});return}e=Ie(s),this.vaultMonitor.endOperator(this.cellKey,r.key,t)}catch(o){throw this.vaultMonitor.runtimeError(this.cellKey,r.key,t,o),o}return e}async#F(t,e,i){let r;r=this.#e.filter(o=>o.type===t);for(let o of r)try{switch(t){case R.Encrypt:if(typeof o.encryptState=="function"){this.vaultMonitor.startEncrypt(this.cellKey,o.key,e);let s=Ie(i),a=await o.encryptState(e,s);this.vaultMonitor.endEncrypt(this.cellKey,o.key,e),Wi(a)&&(i=Ie(a))}break;case R.Persist:if(typeof o.persistState=="function"){this.vaultMonitor.startPersist(this.cellKey,o.key,e);let s=Ie(i);await o.persistState(s),this.vaultMonitor.endPersist(this.cellKey,o.key,e)}break}}catch(s){throw this.vaultMonitor.runtimeError(this.cellKey,o.key,e,s),s}return i}#j(t){for(let e of this.#n){this.vaultMonitor.startDestroy(this.cellKey,e.key,t);try{e.destroy?.(t),this.vaultMonitor.endDestroy(this.cellKey,e.key,t)}catch(i){sn(`${e.key} destroy() failed`,i),this.vaultMonitor.endDestroy(this.cellKey,e.key,t,{destroyFailed:!0})}}}#L(t){for(let e of this.#n){this.vaultMonitor.startReset(this.cellKey,e.key,t);try{e.reset?.(t),this.vaultMonitor.endReset(this.cellKey,e.key,t)}catch(i){sn(`${e.key} reset() failed`,i),this.vaultMonitor.endReset(this.cellKey,e.key,t,{resetFailed:!0})}}}async#M(t){if(this.#o?.length>0){let e=Ie(t.lastSnapshot);this.vaultMonitor.startCoreEmitState(this.cellKey,Ye,t);for(let i of this.#o)await this.#l.emitState(e,i);this.vaultMonitor.endCoreEmitState(this.cellKey,Ye,t)}}async#U(t,e){let i;try{this.vaultMonitor.startCoreError(this.cellKey,Ye,e),i=await this.#r.handleError(t,e.featureCellKey),Ke(`${this.cellKey} #runErrorBehaviors starting with base ResourceError: ${JSON.stringify(i)}`)}catch(r){sn("[vault] Core error normalization failed",r),i=cs(t,e.featureCellKey)}finally{this.vaultMonitor.endCoreError(this.cellKey,Ye,e)}for(let r of this.#u)try{this.vaultMonitor.startErrorTransform(this.cellKey,Ye,e);let o=await r.transformError(Ie(t),Ie(i),Ie(e.lastSnapshot));!uo(o)&&!xp(o)&&(i=o)}catch(o){sn(`[vault] ErrorBehavior "${r.key}" threw during error handling`,o)}finally{this.vaultMonitor.endErrorTransform(this.cellKey,Ye,e,i)}try{this.vaultMonitor.startCoreState(this.cellKey,Ye,e),await this.#c.finalizePipelineError(i,e),await this.#M(e)}catch(r){sn("[vault] Failed to finalize error state",r)}finally{this.vaultMonitor.endCoreState(this.cellKey,Ye,e)}try{this.vaultMonitor.startGlobalError(this.cellKey,Ye,e),await this.privateErrorService.setError(Ie(i))}catch(r){sn("[vault] global error service",r)}finally{this.vaultMonitor.endGlobalError(this.cellKey,Ye,e)}if(this.#d?.length>0){this.vaultMonitor.startCoreCallbackError(this.cellKey,Ye,e);for(let r of this.#d)try{await this.#a.callbackError(Ie(i),Ie(e.lastSnapshot),r)}catch(o){sn("[vault] Error callback threw during error handling",o)}this.vaultMonitor.endCoreCallbackError(this.cellKey,Ye,e)}return Ke(`${this.cellKey} #runErrorBehaviors completed with final ResourceError: ${JSON.stringify(i)}`),i}#H(t){if(M_(t))return Lc.HttpResource;if(Mn(t))return Lc.Observable;if(ka(t)||ka(t?.value))return Lc.Promise;if(T_(t)||T_(t?.value))throw new _p;return Lc.Value}async#$(t){let e={value:void 0,loading:!1,error:null},i;if(ka(this.#s))i=this.#s;else{let r=this.#z();if(r.length>0){let o=await this.#W(t,r);Wi(o)&&(Ke("Persisted data loaded from storage"),i=o)}else xp(this.#s)||(this.vaultMonitor.startSetInitialValue(this.cellKey,Ye,t),Ke("Initialized data loaded from descriptor.initial"),i=this.#s,this.vaultMonitor.endSetInitialValue(this.cellKey,Ye,t))}e.value=i,xp(e.value)?this.decisionEngine?.notifySuccess(this.buildControllerCtx(t)):await this.orchestrate(this.#g(t,e,ti.Replace))}#z(){return this.#e.filter(t=>t.type===R.Persist)}async#W(t,e){let i;for(let o of e)try{if(this.vaultMonitor.startLoadPersist(this.cellKey,o.key,t),i=await o.loadState?.(),Wi(i)){this.vaultMonitor.endLoadPersist(this.cellKey,o.key,t);break}else this.vaultMonitor.endLoadPersist(this.cellKey,o.key,t,{noop:!0})}catch(s){this.vaultMonitor.runtimeError(this.cellKey,o.key,t,s),nt(`"[vault] persist.loadState()" for ${o.key} failed with ${s.message}`)}let r=this.#e.filter(o=>o.type===R.Encrypt);if(Wi(i)&&r.length>0)for(let o of r)try{this.vaultMonitor.startDecrypt(this.cellKey,o.key,t);let s=await o.decryptState?.(t,i);Wi(s)?(this.vaultMonitor.endDecrypt(this.cellKey,o.key,t),i=Ie(s)):this.vaultMonitor.endDecrypt(this.cellKey,o.key,t,{noop:!0})}catch(s){this.vaultMonitor.runtimeError(this.cellKey,o.key,t,s),nt(`"[vault] encrypt.decryptState()" for ${o.key} failed with ${s.message}`);return}return i}},Aa={Pending:"pending",Approved:"approved",Denied:"denied"},Q_=class{#t=!1;#i;constructor(t){this.#i=t}initializeControllers(t,e,i){if(this.#t)throw new Error(`[vault] VaultControllerRunner already initialized \u2014 cannot reissue core controller ID for feature cell "${this.#i}".`);if(this.#t=!0,!t||t.length===0)return[];let r=new Set;return t.map(o=>{let s=!1;try{if(typeof o!="function")return;let a=o[Cp];if(!a)throw s=!0,new Error(`[vault] Controller "${o.name}" missing @VaultController metadata.`);let l=a.key,c=a.type;if(!l)throw s=!0,new Error('[vault] Controller metadata missing "key".');if(!nb()&&!uT(l)){Ke(`[vault] Unlicensed controller "${l}" skipped during initialization.`);return}if(!c)throw s=!0,new Error(`[vault] Controller metadata missing "type" for "${l}".`);let d;if(a.wantsConfig){if(!a.configKey)throw s=!0,new Error(`[vault] Controller "${l}" declares wantsConfig but has no configKey.`);d=i.get(a.configKey)}let u;if(a.needsLicense&&!fT()){if(!a.licenseId)throw s=!0,new Error(`[vault] Controller "${l}" declares needsLicense but has no licenseId.`);if(u=dT(a.licenseId),u===void 0)throw s=!0,new Error(`[vault] License "${a.licenseId}" required by controller "${l}" is not registered in Vault config.`)}let p={featureCellKey:this.#i,requestRevote:_=>{e.next({traceId:_,type:ni.Revote})},requestAbort:_=>{e.next({traceId:_,type:ni.Abort})},controllerConfig:d,licensePayload:u};c===co.License&&(p.licenseDenied=_=>{e.next({traceId:_,type:ni.LicenseDenied})},p.licenseApproved=_=>{e.next({traceId:_,type:ni.LicenseApproved})});let g=new o(l,p);if(!g.key)throw s=!0,new Error(`[vault] Controller missing key for type "${c}". Every controller must define a unique "key".`);if(!eT(g.key))throw s=!0,new Error(`[vault] Controller key "${g.key}" not valid format for "${c}" controller.`);return g.key&&r.has(g.key)?(nt(`[vault] Skipping duplicate controller with key "${g.key}"`),null):(g.key&&r.add(g.key),g)}catch(a){if(s)throw a;return nt(`[vault] Non-critical controller initialization failed: ${a?.message}`),null}}).filter(o=>!!o)}},J_=class extends X_{#t=[];#i=[];#n=new E;#e=!1;#r=!1;#a=Aa.Pending;#l=new E;constructor(t){super(t),Bc().describeFeature({featureCellKey:t.cell.key,fluentApis:{filters:t.filterCallbacks,reducers:t.reducerCallbacks,beforeTaps:t.beforeTapCallbacks,afterTaps:t.afterTapCallbacks,interceptors:t.interceptors,operators:t.operators,emitStateCallbacks:t.emitStateCallbacks,errorCallbacks:t.errorCallbacks}}),Vt.active&&(this.vaultSettled=this.#D.bind(this)),this.#m(t),this.vaultMonitor.conductorLicenseAttempt(this.cellKey,`${this.cellKey}::license`),this.initializeOrchestrator(t)}initialize(t){let e=this.#p(t,ti.Initialize,void 0);this.#u({behaviorCtx:e,controllerCtx:this.buildControllerCtx(e),options:void 0})}conduct(t,e,i,r){let o=this.#p(t,i,r),s=this.prepareIncoming(o,e,i);if(uo(s)||ds(s))return;o.incoming=s;let a=this.buildControllerCtx(o);this.#u({behaviorCtx:o,controllerCtx:a,options:r})}reset(t){this.vaultMonitor.startReset(this.cellKey,Bt,t),t.traceId=t.traceId??V_(),this.#g(),this.resetBehaviors(t),this.#w(t),this.vaultMonitor.endReset(this.cellKey,Bt,t)}destroy(t){Ke(`${Bt} - destroy`),t.traceId=t.traceId??V_(),this.vaultMonitor.startDestroy(this.cellKey,Bt,t),this.#g(),this.destroyBehaviors(t),this.#E(t),this.#n.complete(),this.vaultMonitor.endDestroy(this.cellKey,Bt,t)}async#o(t,e){if(t.operation===ti.Initialize){await this.initializeFeatureCell(t);return}if(t.operation===ti.Replace||t.operation===ti.Merge){await this.orchestrate(t,e);return}this.vaultMonitor.runtimeError(this.cellKey,Bt,t,new Error(`Unknown operation type: "${t.operation}"`)),this.#d(t)}#c(){queueMicrotask(()=>{this.#_()})}#u(t){this.#a===Aa.Pending||this.#a===Aa.Approved?(this.vaultMonitor.startControllerAttempt(this.cellKey,Bt,t.controllerCtx),this.#t.push(t),this.#a===Aa.Approved?!this.#e&&this.#t.length===1?this.#s():this.#r&&this.#c():this.#c()):this.#c()}#d(t){let e=this.#t[0];!e||e.finalized||(e.finalized=!0,queueMicrotask(()=>{this.decisionEngine.notifyFinalize(t),this.#t.shift(),this.#e=!1,this.#x(),this.#s()}))}#f(t,e){this.vaultMonitor.restartControllerAttempt(this.cellKey,Bt,t,e),this.#e=!1}async#s(){if(this.#e||!this.#t.length)return;this.#e=!0;let t=this.#t[0];if(!t){this.#e=!1;return}try{let e=await Bs(this.#S(t)),i=this.#t[0];if(!i){this.#e=!1;return}let{behaviorCtx:r,options:o}=i,s=!1;switch(e){case Vn.Abstain:{Ke(`${this.cellKey} DecisionOutcome: "${Vn.Abstain} received. Process Event dispatched.`),await this.#o(r,o);break}case Vn.Abort:{this.controllerOutcomeNotification(Vn.Abort,r),this.vaultMonitor.endControllerAttempt(this.cellKey,Bt,r,{status:e}),this.#d(r);break}case Vn.Deny:{this.#_(),s=!0,this.#e=!1,this.vaultMonitor.notifyConductorDeny(this.cellKey,Bt,r),this.controllerOutcomeNotification(Vn.Deny,r);break}}if(s)this.#r=!0;else return this.#r=!1,this.#s()}catch(e){sn("[conductor] Unreachable subscription error",e),this.vaultMonitor.conductorCrashed(this.cellKey,Bt,t?.controllerCtx??{traceId:"unknown"},e),this.#t.shift(),this.#s()}}#C(){this.decisionEngine=new q_(this.#i,this.#n),this.#n.subscribe({next:t=>{if(t.type===ni.LicenseDenied){this.vaultMonitor.conductorLicenseDenied(this.cellKey,`${this.cellKey}::license`),this.#a=Aa.Denied;let i=new Error(`${this.cellKey} Conductor Decision Engine: The FeatureCell received a "License Denied". Pipeline is disabled.`);console.error(`[vault] ${i.message}`),Ke(i.message),this.privateErrorService.setError(cs(i,this.cellKey)),this.#t.length=0;return}if(t.type===ni.LicenseApproved){this.vaultMonitor.conductorLicenseApproved(this.cellKey,`${this.cellKey}::license`),this.#a=Aa.Approved,Ke(`${this.cellKey} Conductor Decision Engine: License Approved.`),this.#s();return}let e=this.#t[0];if(e){if(e.controllerCtx.traceId!==t.traceId){Ke(`The head ctx is not the same as the event. ${e.controllerCtx.traceId} != ${t.traceId}`);return}switch(t.type){case ni.Success:{this.vaultMonitor.endControllerAttempt(this.cellKey,Bt,e.controllerCtx,{status:"success"}),this.#d(e.controllerCtx);break}case ni.Failure:{this.vaultMonitor.endControllerAttempt(this.cellKey,Bt,e.controllerCtx,{status:"failure"}),this.#f(e.behaviorCtx,t.type);break}case ni.Abort:{this.vaultMonitor.conductorAbort(this.cellKey,Bt,e.controllerCtx),Ke(`${this.cellKey} Conductor Decision Engine: Abort request received for Behavior TraceId: ${e.controllerCtx.traceId}.`),this.#d(e.controllerCtx);break}case ni.Revote:{Ke(`${this.cellKey} Conductor Decision Engine: Revote request received for Behavior TraceId: ${e.controllerCtx.traceId}.`),this.vaultMonitor.conductorRevote(this.cellKey,Bt,e.controllerCtx),this.#e=!1,Ke(`${this.cellKey} Conductor Decision Engine: processQueue event dispatched for Behavior TraceId: ${e.controllerCtx.traceId}.`),this.#s();break}}}}})}#p(t,e,i){let r=V_();return{destroyed$:t.destroyed$,reset$:t.reset$,state$:t.state$,featureCellKey:t.featureCellKey,state:t.state,lastSnapshot:t.lastSnapshot,options:i!=null?Ie(i):i,traceId:r,operation:e,resolveType:void 0,incoming:void 0}}#g(){this.#t.length=0,this.#e=!1}#E(t){for(let e of this.#i){this.vaultMonitor.startDestroy(this.cellKey,e.key,t);try{e.destroy?.(),this.vaultMonitor.endDestroy(this.cellKey,e.key,t)}catch(i){sn(`${e.key} destroy() failed`,i),this.vaultMonitor.endDestroy(this.cellKey,e.key,t,{destroyFailed:!0})}}}#w(t){for(let e of this.#i){this.vaultMonitor.startReset(this.cellKey,e.key,t);try{e.reset?.(),this.vaultMonitor.endReset(this.cellKey,e.key,t)}catch(i){sn(`${e.key} reset() failed`,i),this.vaultMonitor.endReset(this.cellKey,e.key,t,{resetFailed:!0})}}}#y(t,e){let i=e.controllers.filter(r=>r.type===co.Error);if(i.length>1){let r=i.map(o=>o.key).join(", ");throw new Error(`SDuX Error: More than one ErrorController was provided. Only one error policy can be active per FeatureCell. Received: ${r}. Fix: Remove additional error controllers or combine them into a single controller.`)}i.length===1?t.push(i[0]):t.unshift(j_)}#v(t){return t.filter(e=>e.type===co.License||e.type===co.CoreAbstain?(Ke(`${this.cellKey} Conductor: Filtering out controller "${e.key}" of type "${e.type}" as it is reserved for internal use.`),!1):!0)}#m(t){t.controllers=t.controllers??[];let e=this.#v(t.controllers);this.#y(e,t),e.unshift(H_),e.unshift(B_);let i=e.map(o=>{let s=o[Cp];return{key:o.key,type:s.type,critical:s.critical,needsLicense:s.needsLicense}});Bc().describeControllers({featureCellKey:this.cellKey,controllers:i});let r=new Q_(t.cell.key);this.#i=r.initializeControllers(e,this.#n,t.behaviorConfigs),this.#C()}#S(t){return this.vaultMonitor.startConductorVote(this.cellKey,Bt,t.controllerCtx),this.decisionEngine.evaluateAttempt(t.controllerCtx)?.pipe(wt(e=>{this.vaultMonitor.endConductorVote(this.cellKey,Bt,t.controllerCtx,e)}),ye(e=>e.outcome))}#_(){Vt.active&&this.#l.next()}#x(){!Vt.active||this.#t.length>0||queueMicrotask(()=>{this.#l.next()})}#D(){return Bs(this.#l)}},Bn="vault-feature-cell";function fV(n,t=[]){if(typeof n.initialState=="object"&&n.initialState!==null&&"data"in n.initialState)throw new Error(`[vault] Invalid FeatureCelldescriptorModel.initial for feature "${n.key}". Expected raw data (e.g., [] or {}), but received an object with resource fields { loading, data, error }. Pass plain data to avoid double-wrapping.`);if(t.filter(i=>i.type===R.Encrypt).length>1)throw new Error("[vault] FeatureCell cannot register multiple encryption behaviors.")}var eb=class{featureCellConfiguration;defaultBehaviors;behaviors;controllers;#t=!1;#i;#n=!1;#e=tb();cell;cellKey;ctx;destroyed$=new E;reset$=new E;state$=new E;constructor(t,e,i,r){this.featureCellConfiguration=t,this.defaultBehaviors=e,this.behaviors=i,this.controllers=r,this.cellKey=this.featureCellConfiguration.key,this.ctx=this.#r()}#r(){let t=this.destroyed$.asObservable(),e=this.state$,i=this.reset$.asObservable(),r={isLoading:!1,value:void 0,error:null,hasValue:!1},o={destroyed$:t,featureCellKey:this.cellKey,reset$:i,state$:e,get state(){let s=this.lastSnapshot;return{isLoading:s.isLoading,value:s.value,error:s.error,hasValue:s.hasValue}}};return Object.defineProperty(o,"lastSnapshot",{value:r,writable:!1,configurable:!1,enumerable:!0}),o}reset(){this.#e.startReset(this.cellKey,Bn,this.ctx),nt(`${Bn}: reset`),this.#a(),this.reset$.next(),this.#i?.reset(this.ctx),this.#e.endReset(this.cellKey,Bn,this.ctx)}destroy(){this.#e.startDestroy(this.cellKey,Bn,this.ctx),nt(`${Bn}: destroy`),this.reset$.next(),this.reset$.complete(),this.#i?.destroy(this.ctx),this.destroyed$.next(),this.destroyed$.complete(),this.state$.complete(),this.#e.endDestroy(this.cellKey,Bn,this.ctx)}#a(){if(this.#t){let t=`[vault] FeatureCell "${this.featureCellConfiguration.key}" encountered a critical initialization failure and is now in a corrupted state. Further use is blocked.`;throw this.#e.runtimeError(this.cellKey,Bn,this.ctx,t),new Error(t)}if(!this.#n){let t=`[vault] FeatureCell "${this.featureCellConfiguration.key}" has not been initialized. You must call cell.initialize() before using state methods.`;throw this.#e.runtimeError(this.cellKey,Bn,this.ctx,t),new Error(t)}}#l(t){if(this.#n){let e=`[vault] FeatureCell "${this.featureCellConfiguration.key}" already initialized.`;throw this.#e.runtimeError(this.cellKey,Bn,this.ctx,e),new Error(e)}try{this.#e.registerCell(this.cellKey,this.featureCellConfiguration.insights),this.#e.startInitialized(this.cellKey,Bn,this.ctx),fV(this.featureCellConfiguration,this.behaviors),this.#n=!0,this.#i=new J_({afterTapCallbacks:t.afterTapCallbacks,beforeTapCallbacks:t.beforeTapCallbacks,behaviors:this.behaviors,behaviorConfigs:t.behaviorConfigs,cell:this.cell,defaultBehaviors:this.defaultBehaviors,controllers:this.controllers,emitStateCallbacks:t.emitStateCallbacks,errorCallbacks:t.errorCallbacks,filterCallbacks:t.filterFunctions,initialState:t.hydrate||this.featureCellConfiguration.initialState,interceptors:t.interceptors,lastSnapshot:this.ctx.lastSnapshot,operators:t.operators,reducerCallbacks:t.reducerFunctions,state$:this.state$}),this.#i.initialize(this.ctx),Vt.active&&(Object.defineProperty(this.cell,"vaultSettled",{enumerable:!1,configurable:!1,writable:!1,value:()=>this.#i.vaultSettled()}),nV(this.cellKey,this.#i.vaultSettled.bind(this.#i))),this.#e.endInitialized(this.cellKey,Bn,this.ctx)}catch(e){throw this.#t=!0,this.#e.runtimeError(this.cellKey,Bn,this.ctx,e),e}}#o(t){throw this.#t=!0,this.#e.runtimeError(this.cellKey,Bn,this.ctx,t),new Error(t)}setup(){let t=[],e=[],i=[],r=[],o,s=[],a=[],l=[],c=[],d=new Map,u={behaviorConfigs:d,afterTaps:p=>(this.#n&&this.#o('Cannot call "afterTaps" after initialize(). Configuration must be done before initialization.'),Array.isArray(p)&&t.push(...p),u),beforeTaps:p=>(this.#n&&this.#o('Cannot call "beforeTaps" after initialize(). Configuration must be done before initialization.'),Array.isArray(p)&&e.push(...p),u),emitStates:p=>(this.#n&&this.#o('Cannot call "emitStates" after initialize(). Configuration must be done before initialization.'),Array.isArray(p)&&c.push(...p),u),errors:p=>(this.#n&&this.#o('Cannot call "errors" after initialize(). Configuration must be done before initialization.'),Array.isArray(p)&&i.push(...p),u),filters:p=>(this.#n&&this.#o('Cannot call "filters" after initialize(). Configuration must be done before initialization.'),Array.isArray(p)&&r.push(...p),u),hydrate:p=>(this.#n&&this.#o('Cannot call "hydrate" after initialize(). Configuration must be done before initialization.'),o=p,u),initialize:()=>{this.#l({afterTapCallbacks:t,beforeTapCallbacks:e,behaviorConfigs:d,emitStateCallbacks:c,errorCallbacks:i,filterFunctions:r,hydrate:o,interceptors:s,operators:a,reducerFunctions:l})},interceptors:p=>(this.#n&&this.#o('Cannot call "interceptors" after initialize(). Configuration must be done before initialization.'),Array.isArray(p)&&s.push(...p),u),operators:p=>(this.#n&&this.#o('Cannot call "operators" after initialize(). Configuration must be done before initialization.'),Array.isArray(p)&&a.push(...p),u),reducers:p=>(this.#n&&this.#o('Cannot call "reducers" after initialize(). Configuration must be done before initialization.'),Array.isArray(p)&&l.push(...p),u)};return u}mergeState(t,e){return this.#a(),this.#i.conduct(this.ctx,t,ti.Merge,e)}replaceState(t,e){return this.#a(),this.#i.conduct(this.ctx,t,ti.Replace,e)}},Op=class extends eb{constructor(t,e,i,r){super(t,e,i,r)}build(){let t=this.setup(),e=this.ctx,i={afterTaps:(...r)=>(t.afterTaps(...r),i),beforeTaps:(...r)=>(t.beforeTaps(...r),i),destroy:this.destroy.bind(this),destroyed$:this.destroyed$.asObservable(),errors:(...r)=>(t.errors(...r),i),filters:(...r)=>(t.filters(...r),i),hydrate:(...r)=>(t.hydrate(...r),i),initialize:t.initialize,interceptors:(...r)=>(t.interceptors(...r),i),key:this.cellKey,mergeState:this.mergeState.bind(this),operators:(...r)=>(t.operators(...r),i),reducers:(...r)=>(t.reducers(...r),i),emitStates:(...r)=>(t.emitStates(...r),i),replaceState:this.replaceState.bind(this),reset$:this.reset$.asObservable(),reset:this.reset.bind(this),state$:this.state$.asObservable(),get state(){return{isLoading:e.lastSnapshot.isLoading,value:e.lastSnapshot.value,error:e.lastSnapshot.error,hasValue:e.lastSnapshot.hasValue}}};return this.cell=i,this.behaviors.forEach(r=>{r?.installFluentApi?.(this.cell,t.behaviorConfigs)}),this.controllers.forEach(r=>{r?.installFluentApi?.(this.cell,t.behaviorConfigs)}),Object.defineProperty(i,"ctx",{value:this.ctx,enumerable:!1,writable:!1}),Object.defineProperty(i,"key",{value:this.featureCellConfiguration.key,enumerable:!1,writable:!1}),i}},fs=new Map,sT=new Map;function pV(n,t){if(t){if(fs.has(n)){if(!Vt.active){let i=fs.get(n);throw new Error(`[vault] Duplicate FeatureCell key detected: "${n}". Each FeatureCell must have a unique key. Existing token: "${i?.key}"`)}return fs.get(n)}let e={key:n};return fs.set(n,e),e}if(!fs.has(n))throw new Error(`[vault] FeatureCell token not found for key "${n}". You must call provideFeatureCell() before retrieving this FeatureCell.`);if(sT.has(n)){if(!Vt.active)throw new Error(`[vault] FeatureCell "${n}" can only be owned by a single consumer.`);return fs.get(n)}return sT.set(n,!0),fs.get(n)}function hT(n){return pV(n,!0)}var jc={FEATURE_CELL_KEY:"vault:feature-cell-key",FEATURE_CELL_STATE:"vault:feature-cell-state"};function rb(n){return function(t){t[jc.FEATURE_CELL_KEY]=n,t[jc.FEATURE_CELL_STATE]=null}}var ps=new Map,mT=new Map;function gT(n,t){let e=ps.get(n);if(t){if(ps.has(n)){if(!ao.active)throw new Error(`[vault] Duplicate FeatureCell key detected: "${n}". Each FeatureCell must have a unique key. Existing token: "${n}"`);return ps.get(n)}return e=new C(`FEATURE_CELL:${n}`),ps.set(n,e),e}else{if(!ps.has(n))throw new Error(`[vault] FeatureCell token not found for key "${n}". You must call provideFeatureCell() before retrieving this FeatureCell.`);if(mT.has(n)){if(!ao.active)throw new Error(`[vault] FeatureCell "${n}" can only be injected into a single decorated @FeatureCell service.`);return ps.get(n)}return mT.set(n,!0),ps.get(n)}}function yT(n){return gT(n,!0)}function vT(n){return gT(n,!1)}function ob(n){let t=n;if(!t)throw new Error("injectVault() must be called inside a @FeatureCell()-decorated service and must be given the class reference.");let e=t[jc.FEATURE_CELL_KEY];if(!e)throw new Error("injectVault() must be called inside a @FeatureCell()-decorated service.");let i=vT(e);return f(i)}var hV="@sdux-vault/core",mV="0.9.0";as(hV,mV);var sb="external";var Ti=class extends ib{constructor(e,i){super(i);this.behaviorCtx=i;this.key=e}type=Ti.type;critical=Ti.critical;key;commitState(e,i,r){T(`${this.key} commitState called with: ${Oe(i)}`);try{if(!!i&&Object.keys(i).length>0){let a=pp(i);Object.assign(e.lastSnapshot,a),e.lastSnapshot.hasValue=e.lastSnapshot.value!==void 0&&e.lastSnapshot.value!==null}let s={snapshot:pp(e.lastSnapshot),type:r};e.options&&(s.options=e.options),e.state$.next(s)}catch(o){ls(`${this.key} an error occurred updating the state`,o)}}preparePipelineIncoming(e){let i=e.incoming,r={};return Ma(i)||Ac(i)&&Ta(i.value)?(this.commitState(e,null,on.IncomingPipeline),Si):Ac(i)&&lo(i.value)?(Ma(i.loading)||(r.isLoading=i.loading),hp(i.error)&&(r.error=Ta(i.error)?null:Lt(i.error,sb)),this.commitState(e,r,on.IncomingPipeline),Jn):(Ia(i)?r.isLoading=!0:Ac(i)&&(Ma(i?.loading)||(r.isLoading=i.loading),hp(i?.error)&&(r.error=Ta(i.error)?null:Lt(i.error,sb))),Object.keys(r).length>0&&this.commitState(e,r,on.IncomingPipeline),i)}finalizePipelineState(e,i){if(T(`${this.key} - finalizeVaultState`),Ia(i.incoming)&&this.commitState(i,{isLoading:!1},on.FinalizePipeline),f_(e)){this.commitState(i,null,on.FinalizePipeline);return}if(Ta(e)||p_(e)){this.commitState(i,{value:void 0},on.FinalizePipeline);return}!Ma(e)&&!pT(e)&&this.commitState(i,{value:e},on.FinalizePipeline)}finalizePipelineVaultStop(e){T(`${this.key} - finalizePipelineVaultStop`),this.commitState(e,null,on.FinalizePipeline)}finalizePipelineError(e,i){T(`${this.key} - finalizePipelineError`),this.commitState(i,{error:e,value:i.lastSnapshot.value,isLoading:!1},on.PipelineError)}finalizeControllerAbort(e){T(`${this.key} - finalizeAbort`),this.commitState(e,{isLoading:!1},on.AbortController)}finalizeControllerDeny(e){T(`${this.key} - finalizeDeny`),this.commitState(e,{isLoading:!1},on.DenyController)}destroy(e){te(`${this.key} - destroy`),this.commitState(e,{isLoading:!1,value:void 0,error:null},on.PipelineDestroy)}reset(e){te(`${this.key} - reset`),this.commitState(e,{isLoading:!1,value:void 0,error:null},on.PipelineReset)}};I(Ti,"type"),I(Ti,"critical"),Ti=Se([Te({type:H.CoreState,key:Me("Core","State"),critical:!0})],Ti);var Mi=class extends Ic{critical=Mi.critical;constructor(t,e){super(t,e)}async callbackError(t,e,i){if(typeof i!="function")te(`${this.key} handleError skipped - "${i}" is not a function.`);else try{await i(t,e)}catch(r){te(`${this.key} oldschoolCallback threw: ${r}`)}}};I(Mi,"type"),I(Mi,"key"),I(Mi,"critical"),Mi=Se([Te({type:H.CoreErrorCallback,key:Me("Core","ErrorCallback"),critical:!0})],Mi);var xr=class{constructor(t,e){this.behaviorCtx=e;this.key=t}critical=!0;key;type=H.CoreError;handleError(t,e){return Lt(t,e)}destroy(){te(`${this.key} - destroy "noop"`)}reset(){te(`${this.key} - reset "noop"`)}};I(xr,"type"),I(xr,"key"),I(xr,"critical"),xr=Se([Te({type:H.CoreError,key:Me("Core","Error"),critical:!0})],xr);var ii,_T,bT,CT,Rp,Tr=class{constructor(t,e){this.behaviorCtx=e;Is(this,ii);I(this,"type",H.Filter);I(this,"critical",!0);I(this,"key");this.key=t}applyFilter(t,e){if(T(`${this.key} applyFilter called with "${Oe(t)}".`),t===void 0){T(`${this.key} applyFilter skipped - not a valid plain state. The current type is ${typeof t}. Undefined returned.`);return}if(typeof e!="function")return T(`${this.key} applyFilter skipped. The filter type is ${typeof e}. "${Oe(t)}" returned.`),t;let i;try{i=e(t)}catch(r){throw ls(`${this.key} filter execution failed`,r.message),r}return i===void 0?(T(`${this.key} Filter returned undefined. state rejected.`),Jn):(Zi(this,ii,_T).call(this,t,i)||Zi(this,ii,bT).call(this,t,i)||(Zi(this,ii,CT).call(this,t,i),T(`${this.key} applyFilter returned with "${Oe(i)}".`)),i)}destroy(){te(`${this.key} - destroy "noop"`)}reset(){te(`${this.key} - reset "noop"`)}};ii=new WeakSet,_T=function(t,e){if(Array.isArray(t)){if(!Array.isArray(e))throw Zi(this,ii,Rp).call(this,t,e),new Error("[vault] Filter returned non-array for array input.");return!0}return!1},bT=function(t,e){if(t!==null&&typeof t=="object"){if(typeof e!="object"||e===null||Array.isArray(e))throw Zi(this,ii,Rp).call(this,t,e),new Error("[vault] Filter returned invalid object for object input.");return!0}return!1},CT=function(t,e){if(typeof e!=typeof t)throw Zi(this,ii,Rp).call(this,t,e),new Error(`[vault] Filter returned a value of incorrect type. Expected "${typeof t}", got "${typeof e}".`)},Rp=function(t,e){T(`${this.key} The types not aligned. Current type: "${typeof t}". Next type: ${typeof e}. "${Oe(e)}" returned.`)},I(Tr,"type"),I(Tr,"key"),I(Tr,"critical"),Tr=Se([Te({type:H.Filter,key:Me("Core","Filter"),critical:!0})],Tr);var ri=class{constructor(t,e){this.behaviorCtx=e;this.key=t}type=ri.type;key;critical=ri.critical;computeMerge(t,e,i){let r=t,o=e,s=i?.clearUndefined??!1;return T(`${this.key} merge called (clear: ${s})`),o===void 0&&!s?(T(`${this.key} computeMerge skipped. The next value "${o}" and clear is "${s}`),r):o===void 0&&s?(T(`${this.key} computeMerge skipped. The next value "${o}" and clear is "${s}`),Si):Array.isArray(r)&&Array.isArray(o)?(T(`${this.key} merging array. Return clone of next`),[...o]):(T(`${this.key} non-array branch. Return next`),o)}destroy(){te(`${this.key} - destroy "noop"`)}reset(){te(`${this.key} - reset "noop"`)}};I(ri,"type"),I(ri,"key"),I(ri,"critical",!0),ri=Se([Te({type:H.Merge,key:Me("Core","ArrayMerge"),critical:!0})],ri);function DT(n){n.fromObservable=function(t){return t}}var ln=class{constructor(t,e){this.behaviorCtx=e;this.key=t}type=ln.type;key;critical=ln.critical;resolveType=ln.resolveType;extendCellAPI(t){return{fromObservable:e=>new q(i=>{T(`${this.key} fromObservable called.`);let r=t.destroyed$??He,o=t.reset$??He,s=e.pipe(ne(o),ne(r),yt(1)).subscribe({next:a=>{T(`${this.key} fromObservable emitted value "${Oe(a)}".`),i.next({loading:!1,value:a,error:null})},error:a=>{let l=Lt(a,t.featureCellKey);i.error(l),T(`${this.key} fromObservable emitted error "${l.message}".`)},complete:()=>{i.complete(),T(`${this.key} fromObservable completed.`)}});return()=>{s.unsubscribe(),T(`${this.key} fromObservable subscription unsubscribed.`)}})}}destroy(){te(`${this.key} - destroy "noop"`)}reset(){te(`${this.key} - reset "noop"`)}};I(ln,"extension",DT),I(ln,"type"),I(ln,"key"),I(ln,"resolveType"),I(ln,"critical"),ln=Se([Te({type:H.FromObservable,key:Me("Core","FromObservable"),critical:!1,resolveType:Ln.Observable})],ln);function ET(n){n.fromDeferred=function(t){throw new Error("[vault] fromDeferred() behavior not installed")},n.fromPromise=function(t){throw new Error("[vault] fromPromise() behavior not installed")}}var cn=class{constructor(t,e){this.behaviorCtx=e;this.key=t}type=cn.type;key;critical=cn.critical;resolveType=cn.resolveType;extendCellAPI(t){let e=i=>new Promise((r,o)=>{if(T(`${this.key} fromPromise called.`),lo(i)){r({loading:!1,value:void 0,error:null});return}if(!kc(i)){let a=i;r({loading:a?.loading??!1,value:void 0,error:a?.error??null});return}let s;try{s=i.value?.()}catch(a){let l=Lt(a,t.featureCellKey);o(l);return}Promise.resolve(s).then(a=>{T(`${this.key} fromPromise resolved value: ${Oe(a)}`),r({loading:i.loading??!1,value:a,error:i.error??null})}).catch(a=>{let l=Lt(a,t.featureCellKey);o(l)})});return{fromPromise:i=>e(i),fromDeferred:i=>e(i)}}destroy(){te(`${this.key} - destroy "noop"`)}reset(){te(`${this.key} - reset "noop"`)}};I(cn,"extension",ET),I(cn,"type"),I(cn,"key"),I(cn,"critical"),I(cn,"resolveType"),cn=Se([Te({type:H.FromPromise,key:Me("Core","FromPromise"),critical:!1,resolveType:Ln.Promise})],cn);var Mr=class{constructor(t,e){this.behaviorCtx=e;this.key=t}critical=!0;type=H.Reduce;key;applyReducer(t,e){return T(`${this.key} applyReducer called with "${Oe(t)}".`),typeof e!="function"?(T(`${this.key} applyReducer skipped - reducer is not a function.`),t):e(t)}destroy(){te(`${this.key} - destroy "noop"`)}reset(){te(`${this.key} - reset "noop"`)}};I(Mr,"type"),I(Mr,"key"),I(Mr,"critical"),Mr=Se([Te({type:H.Reduce,key:Me("Core","Reducer"),critical:!0})],Mr);var oi=class{constructor(t,e){this.behaviorCtx=e;this.key=t}type=H.Resolve;key;critical=!1;resolveType=oi.resolveType;async computeResolve(t){let e=t.incoming;if(T(`${this.key} computeResolve called with incoming: ${Oe(e)}`),!Mn(e)){T(`${this.key} computeResolve skipped \u2014 incoming is not an Observable.`);return}T(`${this.key} computeResolve detected Observable input.`);let i=e,r=t.reset$??He,o=t.destroyed$??He;try{let s=await Bs(i.pipe(ne(r),ne(o),yt(1)));return T(`${this.key} computeResolve resolved value: ${Oe(s)}`),s}catch(s){let a=Lt(s,t.featureCellKey);throw T(`${this.key} computeResolve caught error: ${a.message}`),a}}destroy(){te(`${this.key} - destroy "noop"`)}reset(){te(`${this.key} - reset "noop"`)}};I(oi,"type"),I(oi,"key"),I(oi,"critical"),I(oi,"resolveType"),oi=Se([Te({type:H.Resolve,key:Me("Core","Observable"),critical:!1,resolveType:Ln.Observable})],oi);var Dn=class{constructor(t,e){this.behaviorCtx=e;this.key=t}type=Dn.type;key;critical=Dn.critical;resolveType=Dn.resolveType;async computeResolve(t){let e=t.incoming;if(T(`${this.key} computeResolve promise called with incoming: ${Oe(e)}`),!(kc(e)||mp(e))||lo(e)){T(`${this.key} computeResolve skipped \u2014 incoming is not a deferred factory.`);return}T(`${this.key} computeResolve detected Promise input.`);try{let i;return mp(e)?i=await e?.():i=await e.value?.(),T(`${this.key} computeResolve resolved value: ${Oe(i)}`),i}catch(i){let r=Lt(i,t.featureCellKey);throw T(`${this.key} computeResolve caught error: ${r.message}`),r}}destroy(){te(`${this.key} - destroy "noop"`)}reset(){te(`${this.key} - reset "noop"`)}};I(Dn,"type"),I(Dn,"key"),I(Dn,"critical"),I(Dn,"resolveType"),Dn=Se([Te({type:H.Resolve,key:Me("Core","Promise"),critical:!1,resolveType:Ln.Promise})],Dn);var En=class{constructor(t,e){this.behaviorCtx=e;this.key=t}type=En.type;critical=En.critical;key;resolveType=En.resolveType;async computeResolve(t){T(`${this.key} computeResolve called with "${Oe(t.incoming)}".`);let e=t.incoming;if(!e||Ia(e)){T(`${this.key} computeResolve skipped - not a valid plain state.`);return}let{value:i}=e;if(i===void 0){T(`${this.key} value is undefined and resolution skipped.`);return}return i===null?(T(`${this.key} value is null and clear state returned.`),Si):Array.isArray(i)?(T(`${this.key} array value detected and cloned.`),[...i]):typeof i=="object"?(T(`${this.key} object value detected and cloned.`),b({},i)):(T(`${this.key} primitive value detected and returned.`),i)}destroy(){te(`${this.key} - destroy "noop"`)}reset(){te(`${this.key} - reset "noop"`)}};I(En,"type"),I(En,"key"),I(En,"critical"),I(En,"resolveType"),En=Se([Te({type:H.Resolve,key:Me("Core","Value"),critical:!0,resolveType:Ln.Value})],En);function wT(n){n.fromStream=function(t,e){}}var dn=class{constructor(t,e){this.behaviorCtx=e;this.key=t}type=dn.type;key;critical=dn.critical;resolveType=dn.resolveType;extendCellAPI(t){return{fromStream:(e,i)=>{let{autoResetError:r=!0}=i??{};T(`${this.key} fromStream called.`),T(`${this.key} fromStream options resolved (autoResetError=${r}).`),t.vaultMonitor.ingressSubscribed(t.featureCellKey,this.key,t,"fromStream"),T(`${this.key} fromStream subscription started.`),e.pipe(ne(t.destroyed$)).subscribe({next:o=>{T(`${this.key} subscription.next called.`),T(`${this.key} incoming value received: "${Oe(o)}".`),r&&T(`${this.key} autoResetError enabled \u2192 clearing error.`);let s=r?{value:o,error:null}:{value:o};t.mergeState(s),T(`${this.key} mergeState invoked from stream.next.`)},error:o=>{T(`${this.key} subscription.error called.`);let s=Lt(o,this.key);T(`${this.key} stream error converted to VaultError: "${s.message}".`),t.mergeState({error:s}),T(`${this.key} mergeState invoked from stream.error.`)},complete:()=>{T(`${this.key} subscription.complete called.`),t.vaultMonitor.ingressCompleted(t.featureCellKey,this.key,t,"fromStream"),T(`${this.key} fromStream completed.`)}})}}}destroy(){te(`${this.key} - destroy "noop"`)}reset(){te(`${this.key} - reset "noop"`)}};I(dn,"extension",wT),I(dn,"type"),I(dn,"key"),I(dn,"critical"),I(dn,"resolveType"),dn=Se([Te({type:H.FromStream,key:Me("Core","FromStream"),critical:!1,resolveType:Ln.Observable})],dn);var Ir=class{constructor(t,e){this.behaviorCtx=e;this.key=t}type=H.CoreEmitState;critical=!0;key;emitState(t,e){if(T(`${this.key} emitState called with "${Oe(t)}".`),typeof e!="function")return T(`${this.key} emitState skipped. The emitState type is ${typeof e}. "${Oe(t)}" returned.`),Jn;try{e(t)}catch(i){return ls(`${this.key} emitState execution failed`,Oe(i)),Jn}}destroy(){te(`${this.key} - destroy "noop"`)}reset(){te(`${this.key} - reset "noop"`)}};I(Ir,"type"),I(Ir,"key"),I(Ir,"critical"),Ir=Se([Te({type:H.CoreEmitState,key:Me("Core","EmitState"),critical:!0})],Ir);var Ra=class{constructor(t,e){this.behaviorCtx=e;this.key=t}static type;static key;static critical=!0;critical=!0;key;type;executeTap(t,e){T(`${this.key} executeTap called with "${Oe(t)}".`),typeof e!="function"&&T(`${this.key} executeTap skipped - tap is not a function. Type is "${typeof e}".`),e(t)}destroy(){te(`${this.key} - destroy "noop"`)}reset(){te(`${this.key} - reset "noop"`)}};var Pa=class extends Ra{type=H.CoreAfterTap;applyAfterTap(t,e){this.executeTap(t,e)}};Pa=Se([Te({type:H.CoreAfterTap,key:Me("Core","AfterTap"),critical:!0})],Pa);var Na=class extends Ra{type=H.CoreBeforeTap;applyBeforeTap(t,e){this.executeTap(t,e)}};Na=Se([Te({type:H.CoreBeforeTap,key:Me("Core","BeforeTap"),critical:!0})],Na);function ab(n,t=[],e=[]){return hT(n.key),cT({key:n.key}),new Op(n,gV(),t,e).build()}function gV(){return[Pa,Na,xr,Tr,ln,cn,dn,oi,Dn,Mr,En,Ti,Mi,ri,Ir]}var Pp=class{constructor(t){this.core=t;this.#t.add(this.core.state$.subscribe(e=>{this.#e.set(e?.snapshot?.isLoading??!1),this.#n.set(e?.snapshot?.error??null),this.#i.set(e?.snapshot?.value??void 0)})),this.#a.onDestroy(()=>this.destroy())}#t=new Z;#i=P(void 0);#n=P(null);#e=P(!1);#r=L(()=>{let t=this.#i();return t!=null});#a=f(at);build(){let t=this.core;return Object.defineProperty(t,"state",{configurable:!0,enumerable:!0,get:()=>({isLoading:this.#e.asReadonly(),value:this.#i.asReadonly(),error:this.#n.asReadonly(),hasValue:this.#r})}),t}destroy(){this.core.destroy(),this.#t.unsubscribe()}};function lb(n,t,e=[],i=[]){return[{provide:yT(t.key),useFactory:()=>{let o=ab(t,e,i);return new Pp(o).build()}},n]}function cb(n={}){return hf(()=>{lT(n)})}var yV="@sdux-vault/angular",vV="0.11.0";as(yV,vV);var _V="@sdux-vault/devtools",bV="0.9.2";as(_V,bV);var db=null;function fb(){return db||(db=new ub),db}var ub=class{#t=new E;constructor(){window.sdux??={},window.sdux.vaultEventBus=this}nextPipeline(t){ao.active&&t&&this.#t.next(t)}pipeline$(){return this.#t.asObservable()}};var Fa=class n{constructor(t){this.zone=t;this.isChromeExtension=typeof chrome<"u"&&!!chrome?.runtime?.connect,this.isChromeExtension&&this.#r()}#t=new E;vaultConfig=P(null);isChromeExtension;#i=fb();#n=null;#e=null;static RECONNECT_DELAY_MS=1e3;refreshLocalConfig(){this.#l()}pipeline$(){return this.isChromeExtension?this.#t.asObservable():this.#i.pipeline$()}listenPipeline(t){let e=this.pipeline$().subscribe(t);return()=>e.unsubscribe()}#r(){this.#n=chrome.runtime.connect({name:"vault-devtools"}),this.#n.onMessage.addListener(t=>{if(t?.type)switch(t.type){case"VAULT_PIPELINE_EVENT":this.zone.run(()=>{this.#t.next(t.event)});break;case"VAULT_CONFIG":this.zone.run(()=>{this.#o(t.config)});break;default:console.warn(`[Vault DevTools] Unhandled message type: "${t.type}"`)}}),this.#n.onDisconnect.addListener(()=>{this.#n=null,this.#a()})}#a(){this.#e!=null&&clearTimeout(this.#e),this.#e=setTimeout(()=>{this.#e=null,this.#r()},n.RECONNECT_DELAY_MS)}#l(){let t=globalThis.sdux;if(!t)return;let e=t.versions??{},i=null;if(typeof t.getRegistry=="function")try{let r=t.getRegistry();r&&(i=Array.from(r.values()).map(o=>({key:o.key,behaviorsRegistered:!!o.behaviorsRegistered,controllersRegistered:!!o.controllersRegistered,fluentApis:o.fluentApis??null,behaviors:o.behaviors?Array.from(o.behaviors.values()):[],controllers:o.controllers?Array.from(o.controllers.values()):[]})))}catch{}this.#o({versions:e,registry:i})}#o(t){let e=this.vaultConfig();this.vaultConfig.set({versions:b(b({},e?.versions),t.versions),registry:t.registry??e?.registry??null})}static \u0275fac=function(e){return new(e||n)(se(U))};static \u0275prov=D({token:n,factory:n.\u0275fac,providedIn:"root"})};function Ii(n,t=0){return ST(n)?Number(n):arguments.length===2?t:0}function ST(n){return!isNaN(parseFloat(n))&&!isNaN(Number(n))}function si(n){return n instanceof Q?n.nativeElement:n}function La(n){return Array.isArray(n)?n:[n]}function mt(n){return n==null?"":typeof n=="string"?n:`${n}px`}function Uc(n){return n!=null&&`${n}`!="false"}function Zt(n,...t){return t.length?t.some(e=>n[e]):n.altKey||n.shiftKey||n.ctrlKey||n.metaKey}var pb;try{pb=typeof Intl<"u"&&Intl.v8BreakIterator}catch{pb=!1}var ze=(()=>{class n{_platformId=f(Yo);isBrowser=this._platformId?LS(this._platformId):typeof document=="object"&&!!document;EDGE=this.isBrowser&&/(edge)/i.test(navigator.userAgent);TRIDENT=this.isBrowser&&/(msie|trident)/i.test(navigator.userAgent);BLINK=this.isBrowser&&!!(window.chrome||pb)&&typeof CSS<"u"&&!this.EDGE&&!this.TRIDENT;WEBKIT=this.isBrowser&&/AppleWebKit/i.test(navigator.userAgent)&&!this.BLINK&&!this.EDGE&&!this.TRIDENT;IOS=this.isBrowser&&/iPad|iPhone|iPod/.test(navigator.userAgent)&&!("MSStream"in window);FIREFOX=this.isBrowser&&/(firefox|minefield)/i.test(navigator.userAgent);ANDROID=this.isBrowser&&/android/i.test(navigator.userAgent)&&!this.TRIDENT;SAFARI=this.isBrowser&&/safari/i.test(navigator.userAgent)&&this.WEBKIT;constructor(){}static \u0275fac=function(i){return new(i||n)};static \u0275prov=D({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})();var ki=(function(n){return n[n.NORMAL=0]="NORMAL",n[n.NEGATED=1]="NEGATED",n[n.INVERTED=2]="INVERTED",n})(ki||{}),Np,hs;function Fp(){if(hs==null){if(typeof document!="object"||!document||typeof Element!="function"||!Element)return hs=!1,hs;if(document.documentElement?.style&&"scrollBehavior"in document.documentElement.style)hs=!0;else{let n=Element.prototype.scrollTo;n?hs=!/\{\s*\[native code\]\s*\}/.test(n.toString()):hs=!1}}return hs}function Va(){if(typeof document!="object"||!document)return ki.NORMAL;if(Np==null){let n=document.createElement("div"),t=n.style;n.dir="rtl",t.width="1px",t.overflow="auto",t.visibility="hidden",t.pointerEvents="none",t.position="absolute";let e=document.createElement("div"),i=e.style;i.width="2px",i.height="1px",n.appendChild(e),document.body.appendChild(n),Np=ki.NORMAL,n.scrollLeft===0&&(n.scrollLeft=1,Np=n.scrollLeft===0?ki.NEGATED:ki.INVERTED),n.remove()}return Np}var hb;function xT(){if(hb==null){let n=typeof document<"u"?document.head:null;hb=!!(n&&(n.createShadowRoot||n.attachShadow))}return hb}function mb(n){if(xT()){let t=n.getRootNode?n.getRootNode():null;if(typeof ShadowRoot<"u"&&ShadowRoot&&t instanceof ShadowRoot)return t}return null}function un(n){return n.composedPath?n.composedPath()[0]:n.target}function gb(){return typeof __karma__<"u"&&!!__karma__||typeof jasmine<"u"&&!!jasmine||typeof jest<"u"&&!!jest||typeof Mocha<"u"&&!!Mocha}var Hc;function TT(){if(Hc==null&&typeof window<"u")try{window.addEventListener("test",null,Object.defineProperty({},"passive",{get:()=>Hc=!0}))}finally{Hc=Hc||!1}return Hc}function Ba(n){return TT()?n:!!n.capture}function ms(n){return n.buttons===0||n.detail===0}function gs(n){let t=n.touches&&n.touches[0]||n.changedTouches&&n.changedTouches[0];return!!t&&t.identifier===-1&&(t.radiusX==null||t.radiusX===1)&&(t.radiusY==null||t.radiusY===1)}var MT=new C("cdk-input-modality-detector-options"),IT={ignoreKeys:[18,17,224,91,16]},kT=650,yb={passive:!0,capture:!0},AT=(()=>{class n{_platform=f(ze);_listenerCleanups;modalityDetected;modalityChanged;get mostRecentModality(){return this._modality.value}_mostRecentTarget=null;_modality=new ot(null);_options;_lastTouchMs=0;_onKeydown=e=>{this._options?.ignoreKeys?.some(i=>i===e.keyCode)||(this._modality.next("keyboard"),this._mostRecentTarget=un(e))};_onMousedown=e=>{Date.now()-this._lastTouchMs<kT||(this._modality.next(ms(e)?"keyboard":"mouse"),this._mostRecentTarget=un(e))};_onTouchstart=e=>{if(gs(e)){this._modality.next("keyboard");return}this._lastTouchMs=Date.now(),this._modality.next("touch"),this._mostRecentTarget=un(e)};constructor(){let e=f(U),i=f(he),r=f(MT,{optional:!0});if(this._options=b(b({},IT),r),this.modalityDetected=this._modality.pipe(Ao(1)),this.modalityChanged=this.modalityDetected.pipe(Us()),this._platform.isBrowser){let o=f(Wt).createRenderer(null,null);this._listenerCleanups=e.runOutsideAngular(()=>[o.listen(i,"keydown",this._onKeydown,yb),o.listen(i,"mousedown",this._onMousedown,yb),o.listen(i,"touchstart",this._onTouchstart,yb)])}}ngOnDestroy(){this._modality.complete(),this._listenerCleanups?.forEach(e=>e())}static \u0275fac=function(i){return new(i||n)};static \u0275prov=D({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})(),$c=(function(n){return n[n.IMMEDIATE=0]="IMMEDIATE",n[n.EVENTUAL=1]="EVENTUAL",n})($c||{}),OT=new C("cdk-focus-monitor-default-options"),Lp=Ba({passive:!0,capture:!0}),po=(()=>{class n{_ngZone=f(U);_platform=f(ze);_inputModalityDetector=f(AT);_origin=null;_lastFocusOrigin=null;_windowFocused=!1;_windowFocusTimeoutId;_originTimeoutId;_originFromTouchInteraction=!1;_elementInfo=new Map;_monitoredElementCount=0;_rootNodeFocusListenerCount=new Map;_detectionMode;_windowFocusListener=()=>{this._windowFocused=!0,this._windowFocusTimeoutId=setTimeout(()=>this._windowFocused=!1)};_document=f(he);_stopInputModalityDetector=new E;constructor(){let e=f(OT,{optional:!0});this._detectionMode=e?.detectionMode||$c.IMMEDIATE}_rootNodeFocusAndBlurListener=e=>{let i=un(e);for(let r=i;r;r=r.parentElement)e.type==="focus"?this._onFocus(e,r):this._onBlur(e,r)};monitor(e,i=!1){let r=si(e);if(!this._platform.isBrowser||r.nodeType!==1)return A();let o=mb(r)||this._document,s=this._elementInfo.get(r);if(s)return i&&(s.checkChildren=!0),s.subject;let a={checkChildren:i,subject:new E,rootNode:o};return this._elementInfo.set(r,a),this._registerGlobalListeners(a),a.subject}stopMonitoring(e){let i=si(e),r=this._elementInfo.get(i);r&&(r.subject.complete(),this._setClasses(i),this._elementInfo.delete(i),this._removeGlobalListeners(r))}focusVia(e,i,r){let o=si(e),s=this._document.activeElement;o===s?this._getClosestElementsInfo(o).forEach(([a,l])=>this._originChanged(a,i,l)):(this._setOrigin(i),typeof o.focus=="function"&&o.focus(r))}ngOnDestroy(){this._elementInfo.forEach((e,i)=>this.stopMonitoring(i))}_getWindow(){return this._document.defaultView||window}_getFocusOrigin(e){return this._origin?this._originFromTouchInteraction?this._shouldBeAttributedToTouch(e)?"touch":"program":this._origin:this._windowFocused&&this._lastFocusOrigin?this._lastFocusOrigin:e&&this._isLastInteractionFromInputLabel(e)?"mouse":"program"}_shouldBeAttributedToTouch(e){return this._detectionMode===$c.EVENTUAL||!!e?.contains(this._inputModalityDetector._mostRecentTarget)}_setClasses(e,i){e.classList.toggle("cdk-focused",!!i),e.classList.toggle("cdk-touch-focused",i==="touch"),e.classList.toggle("cdk-keyboard-focused",i==="keyboard"),e.classList.toggle("cdk-mouse-focused",i==="mouse"),e.classList.toggle("cdk-program-focused",i==="program")}_setOrigin(e,i=!1){this._ngZone.runOutsideAngular(()=>{if(this._origin=e,this._originFromTouchInteraction=e==="touch"&&i,this._detectionMode===$c.IMMEDIATE){clearTimeout(this._originTimeoutId);let r=this._originFromTouchInteraction?kT:1;this._originTimeoutId=setTimeout(()=>this._origin=null,r)}})}_onFocus(e,i){let r=this._elementInfo.get(i),o=un(e);!r||!r.checkChildren&&i!==o||this._originChanged(i,this._getFocusOrigin(o),r)}_onBlur(e,i){let r=this._elementInfo.get(i);!r||r.checkChildren&&e.relatedTarget instanceof Node&&i.contains(e.relatedTarget)||(this._setClasses(i),this._emitOrigin(r,null))}_emitOrigin(e,i){e.subject.observers.length&&this._ngZone.run(()=>e.subject.next(i))}_registerGlobalListeners(e){if(!this._platform.isBrowser)return;let i=e.rootNode,r=this._rootNodeFocusListenerCount.get(i)||0;r||this._ngZone.runOutsideAngular(()=>{i.addEventListener("focus",this._rootNodeFocusAndBlurListener,Lp),i.addEventListener("blur",this._rootNodeFocusAndBlurListener,Lp)}),this._rootNodeFocusListenerCount.set(i,r+1),++this._monitoredElementCount===1&&(this._ngZone.runOutsideAngular(()=>{this._getWindow().addEventListener("focus",this._windowFocusListener)}),this._inputModalityDetector.modalityDetected.pipe(ne(this._stopInputModalityDetector)).subscribe(o=>{this._setOrigin(o,!0)}))}_removeGlobalListeners(e){let i=e.rootNode;if(this._rootNodeFocusListenerCount.has(i)){let r=this._rootNodeFocusListenerCount.get(i);r>1?this._rootNodeFocusListenerCount.set(i,r-1):(i.removeEventListener("focus",this._rootNodeFocusAndBlurListener,Lp),i.removeEventListener("blur",this._rootNodeFocusAndBlurListener,Lp),this._rootNodeFocusListenerCount.delete(i))}--this._monitoredElementCount||(this._getWindow().removeEventListener("focus",this._windowFocusListener),this._stopInputModalityDetector.next(),clearTimeout(this._windowFocusTimeoutId),clearTimeout(this._originTimeoutId))}_originChanged(e,i,r){this._setClasses(e,i),this._emitOrigin(r,i),this._lastFocusOrigin=i}_getClosestElementsInfo(e){let i=[];return this._elementInfo.forEach((r,o)=>{(o===e||r.checkChildren&&o.contains(e))&&i.push([o,r])}),i}_isLastInteractionFromInputLabel(e){let{_mostRecentTarget:i,mostRecentModality:r}=this._inputModalityDetector;if(r!=="mouse"||!i||i===e||e.nodeName!=="INPUT"&&e.nodeName!=="TEXTAREA"||e.disabled)return!1;let o=e.labels;if(o){for(let s=0;s<o.length;s++)if(o[s].contains(i))return!0}return!1}static \u0275fac=function(i){return new(i||n)};static \u0275prov=D({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})(),vb=(()=>{class n{_elementRef=f(Q);_focusMonitor=f(po);_monitorSubscription;_focusOrigin=null;cdkFocusChange=new j;constructor(){}get focusOrigin(){return this._focusOrigin}ngAfterViewInit(){let e=this._elementRef.nativeElement;this._monitorSubscription=this._focusMonitor.monitor(e,e.nodeType===1&&e.hasAttribute("cdkMonitorSubtreeFocus")).subscribe(i=>{this._focusOrigin=i,this.cdkFocusChange.emit(i)})}ngOnDestroy(){this._focusMonitor.stopMonitoring(this._elementRef),this._monitorSubscription?.unsubscribe()}static \u0275fac=function(i){return new(i||n)};static \u0275dir=ie({type:n,selectors:[["","cdkMonitorElementFocus",""],["","cdkMonitorSubtreeFocus",""]],outputs:{cdkFocusChange:"cdkFocusChange"},exportAs:["cdkMonitorFocus"]})}return n})();var Vp=new WeakMap,wn=(()=>{class n{_appRef;_injector=f(le);_environmentInjector=f(We);load(e){let i=this._appRef=this._appRef||this._injector.get(rn),r=Vp.get(i);r||(r={loaders:new Set,refs:[]},Vp.set(i,r),i.onDestroy(()=>{Vp.get(i)?.refs.forEach(o=>o.destroy()),Vp.delete(i)})),r.loaders.has(e)||(r.loaders.add(e),r.refs.push(Sf(e,{environmentInjector:this._environmentInjector})))}static \u0275fac=function(i){return new(i||n)};static \u0275prov=D({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})();var zc=(()=>{class n{static \u0275fac=function(i){return new(i||n)};static \u0275cmp=G({type:n,selectors:[["ng-component"]],exportAs:["cdkVisuallyHidden"],decls:0,vars:0,template:function(i,r){},styles:[`.cdk-visually-hidden {
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
`],encapsulation:2,changeDetection:0})}return n})(),Bp;function CV(){if(Bp===void 0&&(Bp=null,typeof window<"u")){let n=window;n.trustedTypes!==void 0&&(Bp=n.trustedTypes.createPolicy("angular#components",{createHTML:t=>t}))}return Bp}function DV(n){return CV()?.createHTML(n)||n}function RT(n,t,e){let i=e.sanitize(An.HTML,t);n.innerHTML=DV(i||"")}var PT=new Set,ys,ja=(()=>{class n{_platform=f(ze);_nonce=f(oa,{optional:!0});_matchMedia;constructor(){this._matchMedia=this._platform.isBrowser&&window.matchMedia?window.matchMedia.bind(window):wV}matchMedia(e){return(this._platform.WEBKIT||this._platform.BLINK)&&EV(e,this._nonce),this._matchMedia(e)}static \u0275fac=function(i){return new(i||n)};static \u0275prov=D({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})();function EV(n,t){if(!PT.has(n))try{ys||(ys=document.createElement("style"),t&&ys.setAttribute("nonce",t),ys.setAttribute("type","text/css"),document.head.appendChild(ys)),ys.sheet&&(ys.sheet.insertRule(`@media ${n} {body{ }}`,0),PT.add(n))}catch(e){console.error(e)}}function wV(n){return{matches:n==="all"||n==="",media:n,addListener:()=>{},removeListener:()=>{}}}var _b=(()=>{class n{_mediaMatcher=f(ja);_zone=f(U);_queries=new Map;_destroySubject=new E;constructor(){}ngOnDestroy(){this._destroySubject.next(),this._destroySubject.complete()}isMatched(e){return NT(La(e)).some(r=>this._registerQuery(r).mql.matches)}observe(e){let r=NT(La(e)).map(s=>this._registerQuery(s).observable),o=fl(r);return o=jr(o.pipe(yt(1)),o.pipe(Ao(1),er(0))),o.pipe(ye(s=>{let a={matches:!1,breakpoints:{}};return s.forEach(({matches:l,query:c})=>{a.matches=a.matches||l,a.breakpoints[c]=l}),a}))}_registerQuery(e){if(this._queries.has(e))return this._queries.get(e);let i=this._mediaMatcher.matchMedia(e),o={observable:new q(s=>{let a=l=>this._zone.run(()=>s.next(l));return i.addListener(a),()=>{i.removeListener(a)}}).pipe(dt(i),ye(({matches:s})=>({query:e,matches:s})),ne(this._destroySubject)),mql:i};return this._queries.set(e,o),o}static \u0275fac=function(i){return new(i||n)};static \u0275prov=D({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})();function NT(n){return n.map(t=>t.split(",")).reduce((t,e)=>t.concat(e)).map(t=>t.trim())}function SV(n){if(n.type==="characterData"&&n.target instanceof Comment)return!0;if(n.type==="childList"){for(let t=0;t<n.addedNodes.length;t++)if(!(n.addedNodes[t]instanceof Comment))return!1;for(let t=0;t<n.removedNodes.length;t++)if(!(n.removedNodes[t]instanceof Comment))return!1;return!0}return!1}var FT=(()=>{class n{create(e){return typeof MutationObserver>"u"?null:new MutationObserver(e)}static \u0275fac=function(i){return new(i||n)};static \u0275prov=D({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})(),LT=(()=>{class n{_mutationObserverFactory=f(FT);_observedElements=new Map;_ngZone=f(U);constructor(){}ngOnDestroy(){this._observedElements.forEach((e,i)=>this._cleanupObserver(i))}observe(e){let i=si(e);return new q(r=>{let s=this._observeElement(i).pipe(ye(a=>a.filter(l=>!SV(l))),Ce(a=>!!a.length)).subscribe(a=>{this._ngZone.run(()=>{r.next(a)})});return()=>{s.unsubscribe(),this._unobserveElement(i)}})}_observeElement(e){return this._ngZone.runOutsideAngular(()=>{if(this._observedElements.has(e))this._observedElements.get(e).count++;else{let i=new E,r=this._mutationObserverFactory.create(o=>i.next(o));r&&r.observe(e,{characterData:!0,childList:!0,subtree:!0}),this._observedElements.set(e,{observer:r,stream:i,count:1})}return this._observedElements.get(e).stream})}_unobserveElement(e){this._observedElements.has(e)&&(this._observedElements.get(e).count--,this._observedElements.get(e).count||this._cleanupObserver(e))}_cleanupObserver(e){if(this._observedElements.has(e)){let{observer:i,stream:r}=this._observedElements.get(e);i&&i.disconnect(),r.complete(),this._observedElements.delete(e)}}static \u0275fac=function(i){return new(i||n)};static \u0275prov=D({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})(),VT=(()=>{class n{_contentObserver=f(LT);_elementRef=f(Q);event=new j;get disabled(){return this._disabled}set disabled(e){this._disabled=e,this._disabled?this._unsubscribe():this._subscribe()}_disabled=!1;get debounce(){return this._debounce}set debounce(e){this._debounce=Ii(e),this._subscribe()}_debounce;_currentSubscription=null;constructor(){}ngAfterContentInit(){!this._currentSubscription&&!this.disabled&&this._subscribe()}ngOnDestroy(){this._unsubscribe()}_subscribe(){this._unsubscribe();let e=this._contentObserver.observe(this._elementRef);this._currentSubscription=(this.debounce?e.pipe(er(this.debounce)):e).subscribe(this.event)}_unsubscribe(){this._currentSubscription?.unsubscribe()}static \u0275fac=function(i){return new(i||n)};static \u0275dir=ie({type:n,selectors:[["","cdkObserveContent",""]],inputs:{disabled:[2,"cdkObserveContentDisabled","disabled",de],debounce:"debounce"},outputs:{event:"cdkObserveContent"},exportAs:["cdkObserveContent"]})}return n})(),jp=(()=>{class n{static \u0275fac=function(i){return new(i||n)};static \u0275mod=De({type:n});static \u0275inj=be({providers:[FT]})}return n})();var UT=new C("liveAnnouncerElement",{providedIn:"root",factory:()=>null}),HT=new C("LIVE_ANNOUNCER_DEFAULT_OPTIONS"),xV=0,Cb=(()=>{class n{_ngZone=f(U);_defaultOptions=f(HT,{optional:!0});_liveElement;_document=f(he);_sanitizer=f(Pv);_previousTimeout;_currentPromise;_currentResolve;constructor(){let e=f(UT,{optional:!0});this._liveElement=e||this._createLiveElement()}announce(e,...i){let r=this._defaultOptions,o,s;return i.length===1&&typeof i[0]=="number"?s=i[0]:[o,s]=i,this.clear(),clearTimeout(this._previousTimeout),o||(o=r&&r.politeness?r.politeness:"polite"),s==null&&r&&(s=r.duration),this._liveElement.setAttribute("aria-live",o),this._liveElement.id&&this._exposeAnnouncerToModals(this._liveElement.id),this._ngZone.runOutsideAngular(()=>(this._currentPromise||(this._currentPromise=new Promise(a=>this._currentResolve=a)),clearTimeout(this._previousTimeout),this._previousTimeout=setTimeout(()=>{!e||typeof e=="string"?this._liveElement.textContent=e:RT(this._liveElement,e,this._sanitizer),typeof s=="number"&&(this._previousTimeout=setTimeout(()=>this.clear(),s)),this._currentResolve?.(),this._currentPromise=this._currentResolve=void 0},100),this._currentPromise))}clear(){this._liveElement&&(this._liveElement.textContent="")}ngOnDestroy(){clearTimeout(this._previousTimeout),this._liveElement?.remove(),this._liveElement=null,this._currentResolve?.(),this._currentPromise=this._currentResolve=void 0}_createLiveElement(){let e="cdk-live-announcer-element",i=this._document.getElementsByClassName(e),r=this._document.createElement("div");for(let o=0;o<i.length;o++)i[o].remove();return r.classList.add(e),r.classList.add("cdk-visually-hidden"),r.setAttribute("aria-atomic","true"),r.setAttribute("aria-live","polite"),r.id=`cdk-live-announcer-${xV++}`,this._document.body.appendChild(r),r}_exposeAnnouncerToModals(e){let i=this._document.querySelectorAll('body > .cdk-overlay-container [aria-modal="true"]');for(let r=0;r<i.length;r++){let o=i[r],s=o.getAttribute("aria-owns");s?s.indexOf(e)===-1&&o.setAttribute("aria-owns",s+" "+e):o.setAttribute("aria-owns",e)}}static \u0275fac=function(i){return new(i||n)};static \u0275prov=D({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})();var ho=(function(n){return n[n.NONE=0]="NONE",n[n.BLACK_ON_WHITE=1]="BLACK_ON_WHITE",n[n.WHITE_ON_BLACK=2]="WHITE_ON_BLACK",n})(ho||{}),BT="cdk-high-contrast-black-on-white",jT="cdk-high-contrast-white-on-black",bb="cdk-high-contrast-active",$T=(()=>{class n{_platform=f(ze);_hasCheckedHighContrastMode=!1;_document=f(he);_breakpointSubscription;constructor(){this._breakpointSubscription=f(_b).observe("(forced-colors: active)").subscribe(()=>{this._hasCheckedHighContrastMode&&(this._hasCheckedHighContrastMode=!1,this._applyBodyHighContrastModeCssClasses())})}getHighContrastMode(){if(!this._platform.isBrowser)return ho.NONE;let e=this._document.createElement("div");e.style.backgroundColor="rgb(1,2,3)",e.style.position="absolute",this._document.body.appendChild(e);let i=this._document.defaultView||window,r=i&&i.getComputedStyle?i.getComputedStyle(e):null,o=(r&&r.backgroundColor||"").replace(/ /g,"");switch(e.remove(),o){case"rgb(0,0,0)":case"rgb(45,50,54)":case"rgb(32,32,32)":return ho.WHITE_ON_BLACK;case"rgb(255,255,255)":case"rgb(255,250,239)":return ho.BLACK_ON_WHITE}return ho.NONE}ngOnDestroy(){this._breakpointSubscription.unsubscribe()}_applyBodyHighContrastModeCssClasses(){if(!this._hasCheckedHighContrastMode&&this._platform.isBrowser&&this._document.body){let e=this._document.body.classList;e.remove(bb,BT,jT),this._hasCheckedHighContrastMode=!0;let i=this.getHighContrastMode();i===ho.BLACK_ON_WHITE?e.add(bb,BT):i===ho.WHITE_ON_BLACK&&e.add(bb,jT)}}static \u0275fac=function(i){return new(i||n)};static \u0275prov=D({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})(),Db=(()=>{class n{constructor(){f($T)._applyBodyHighContrastModeCssClasses()}static \u0275fac=function(i){return new(i||n)};static \u0275mod=De({type:n});static \u0275inj=be({imports:[jp]})}return n})();var TV=200,Up=class{_letterKeyStream=new E;_items=[];_selectedItemIndex=-1;_pressedLetters=[];_skipPredicateFn;_selectedItem=new E;selectedItem=this._selectedItem;constructor(t,e){let i=typeof e?.debounceInterval=="number"?e.debounceInterval:TV;e?.skipPredicate&&(this._skipPredicateFn=e.skipPredicate),this.setItems(t),this._setupKeyHandler(i)}destroy(){this._pressedLetters=[],this._letterKeyStream.complete(),this._selectedItem.complete()}setCurrentSelectedItemIndex(t){this._selectedItemIndex=t}setItems(t){this._items=t}handleKey(t){let e=t.keyCode;t.key&&t.key.length===1?this._letterKeyStream.next(t.key.toLocaleUpperCase()):(e>=65&&e<=90||e>=48&&e<=57)&&this._letterKeyStream.next(String.fromCharCode(e))}isTyping(){return this._pressedLetters.length>0}reset(){this._pressedLetters=[]}_setupKeyHandler(t){this._letterKeyStream.pipe(wt(e=>this._pressedLetters.push(e)),er(t),Ce(()=>this._pressedLetters.length>0),ye(()=>this._pressedLetters.join("").toLocaleUpperCase())).subscribe(e=>{for(let i=1;i<this._items.length+1;i++){let r=(this._selectedItemIndex+i)%this._items.length,o=this._items[r];if(!this._skipPredicateFn?.(o)&&o.getLabel?.().toLocaleUpperCase().trim().indexOf(e)===0){this._selectedItem.next(o);break}}this._pressedLetters=[]})}};var Ua=class{_items;_activeItemIndex=P(-1);_activeItem=P(null);_wrap=!1;_typeaheadSubscription=Z.EMPTY;_itemChangesSubscription;_vertical=!0;_horizontal=null;_allowedModifierKeys=[];_homeAndEnd=!1;_pageUpAndDown={enabled:!1,delta:10};_effectRef;_typeahead;_skipPredicateFn=t=>t.disabled;constructor(t,e){this._items=t,t instanceof yi?this._itemChangesSubscription=t.changes.subscribe(i=>this._itemsChanged(i.toArray())):Zo(t)&&(this._effectRef=fr(()=>this._itemsChanged(t()),{injector:e}))}tabOut=new E;change=new E;skipPredicate(t){return this._skipPredicateFn=t,this}withWrap(t=!0){return this._wrap=t,this}withVerticalOrientation(t=!0){return this._vertical=t,this}withHorizontalOrientation(t){return this._horizontal=t,this}withAllowedModifierKeys(t){return this._allowedModifierKeys=t,this}withTypeAhead(t=200){this._typeaheadSubscription.unsubscribe();let e=this._getItemsArray();return this._typeahead=new Up(e,{debounceInterval:typeof t=="number"?t:void 0,skipPredicate:i=>this._skipPredicateFn(i)}),this._typeaheadSubscription=this._typeahead.selectedItem.subscribe(i=>{this.setActiveItem(i)}),this}cancelTypeahead(){return this._typeahead?.reset(),this}withHomeAndEnd(t=!0){return this._homeAndEnd=t,this}withPageUpDown(t=!0,e=10){return this._pageUpAndDown={enabled:t,delta:e},this}setActiveItem(t){let e=this._activeItem();this.updateActiveItem(t),this._activeItem()!==e&&this.change.next(this._activeItemIndex())}onKeydown(t){let e=t.keyCode,r=["altKey","ctrlKey","metaKey","shiftKey"].every(o=>!t[o]||this._allowedModifierKeys.indexOf(o)>-1);switch(e){case 9:this.tabOut.next();return;case 40:if(this._vertical&&r){this.setNextItemActive();break}else return;case 38:if(this._vertical&&r){this.setPreviousItemActive();break}else return;case 39:if(this._horizontal&&r){this._horizontal==="rtl"?this.setPreviousItemActive():this.setNextItemActive();break}else return;case 37:if(this._horizontal&&r){this._horizontal==="rtl"?this.setNextItemActive():this.setPreviousItemActive();break}else return;case 36:if(this._homeAndEnd&&r){this.setFirstItemActive();break}else return;case 35:if(this._homeAndEnd&&r){this.setLastItemActive();break}else return;case 33:if(this._pageUpAndDown.enabled&&r){let o=this._activeItemIndex()-this._pageUpAndDown.delta;this._setActiveItemByIndex(o>0?o:0,1);break}else return;case 34:if(this._pageUpAndDown.enabled&&r){let o=this._activeItemIndex()+this._pageUpAndDown.delta,s=this._getItemsArray().length;this._setActiveItemByIndex(o<s?o:s-1,-1);break}else return;default:(r||Zt(t,"shiftKey"))&&this._typeahead?.handleKey(t);return}this._typeahead?.reset(),t.preventDefault()}get activeItemIndex(){return this._activeItemIndex()}get activeItem(){return this._activeItem()}isTyping(){return!!this._typeahead&&this._typeahead.isTyping()}setFirstItemActive(){this._setActiveItemByIndex(0,1)}setLastItemActive(){this._setActiveItemByIndex(this._getItemsArray().length-1,-1)}setNextItemActive(){this._activeItemIndex()<0?this.setFirstItemActive():this._setActiveItemByDelta(1)}setPreviousItemActive(){this._activeItemIndex()<0&&this._wrap?this.setLastItemActive():this._setActiveItemByDelta(-1)}updateActiveItem(t){let e=this._getItemsArray(),i=typeof t=="number"?t:e.indexOf(t),r=e[i];this._activeItem.set(r??null),this._activeItemIndex.set(i),this._typeahead?.setCurrentSelectedItemIndex(i)}destroy(){this._typeaheadSubscription.unsubscribe(),this._itemChangesSubscription?.unsubscribe(),this._effectRef?.destroy(),this._typeahead?.destroy(),this.tabOut.complete(),this.change.complete()}_setActiveItemByDelta(t){this._wrap?this._setActiveInWrapMode(t):this._setActiveInDefaultMode(t)}_setActiveInWrapMode(t){let e=this._getItemsArray();for(let i=1;i<=e.length;i++){let r=(this._activeItemIndex()+t*i+e.length)%e.length,o=e[r];if(!this._skipPredicateFn(o)){this.setActiveItem(r);return}}}_setActiveInDefaultMode(t){this._setActiveItemByIndex(this._activeItemIndex()+t,t)}_setActiveItemByIndex(t,e){let i=this._getItemsArray();if(i[t]){for(;this._skipPredicateFn(i[t]);)if(t+=e,!i[t])return;this.setActiveItem(t)}}_getItemsArray(){return Zo(this._items)?this._items():this._items instanceof yi?this._items.toArray():this._items}_itemsChanged(t){this._typeahead?.setItems(t);let e=this._activeItem();if(e){let i=t.indexOf(e);i>-1&&i!==this._activeItemIndex()&&(this._activeItemIndex.set(i),this._typeahead?.setCurrentSelectedItemIndex(i))}}};var Yc=class extends Ua{setActiveItem(t){this.activeItem&&this.activeItem.setInactiveStyles(),super.setActiveItem(t),this.activeItem&&this.activeItem.setActiveStyles()}};var vs=class extends Ua{_origin="program";setFocusOrigin(t){return this._origin=t,this}setActiveItem(t){super.setActiveItem(t),this.activeItem&&this.activeItem.focus(this._origin)}};var Eb={},Xt=class n{_appId=f(Jr);static _infix=`a${Math.floor(Math.random()*1e5).toString()}`;getId(t,e=!1){return this._appId!=="ng"&&(t+=this._appId),Eb.hasOwnProperty(t)||(Eb[t]=0),`${t}${e?n._infix+"-":""}${Eb[t]++}`}static \u0275fac=function(e){return new(e||n)};static \u0275prov=D({token:n,factory:n.\u0275fac,providedIn:"root"})};var GT=" ";function xb(n,t,e){let i=$p(n,t);e=e.trim(),!i.some(r=>r.trim()===e)&&(i.push(e),n.setAttribute(t,i.join(GT)))}function zp(n,t,e){let i=$p(n,t);e=e.trim();let r=i.filter(o=>o!==e);r.length?n.setAttribute(t,r.join(GT)):n.removeAttribute(t)}function $p(n,t){return n.getAttribute(t)?.match(/\S+/g)??[]}var qT="cdk-describedby-message",Hp="cdk-describedby-host",Sb=0,KT=(()=>{class n{_platform=f(ze);_document=f(he);_messageRegistry=new Map;_messagesContainer=null;_id=`${Sb++}`;constructor(){f(wn).load(zc),this._id=f(Jr)+"-"+Sb++}describe(e,i,r){if(!this._canBeDescribed(e,i))return;let o=wb(i,r);typeof i!="string"?(WT(i,this._id),this._messageRegistry.set(o,{messageElement:i,referenceCount:0})):this._messageRegistry.has(o)||this._createMessageElement(i,r),this._isElementDescribedByMessage(e,o)||this._addMessageReference(e,o)}removeDescription(e,i,r){if(!i||!this._isElementNode(e))return;let o=wb(i,r);if(this._isElementDescribedByMessage(e,o)&&this._removeMessageReference(e,o),typeof i=="string"){let s=this._messageRegistry.get(o);s&&s.referenceCount===0&&this._deleteMessageElement(o)}this._messagesContainer?.childNodes.length===0&&(this._messagesContainer.remove(),this._messagesContainer=null)}ngOnDestroy(){let e=this._document.querySelectorAll(`[${Hp}="${this._id}"]`);for(let i=0;i<e.length;i++)this._removeCdkDescribedByReferenceIds(e[i]),e[i].removeAttribute(Hp);this._messagesContainer?.remove(),this._messagesContainer=null,this._messageRegistry.clear()}_createMessageElement(e,i){let r=this._document.createElement("div");WT(r,this._id),r.textContent=e,i&&r.setAttribute("role",i),this._createMessagesContainer(),this._messagesContainer.appendChild(r),this._messageRegistry.set(wb(e,i),{messageElement:r,referenceCount:0})}_deleteMessageElement(e){this._messageRegistry.get(e)?.messageElement?.remove(),this._messageRegistry.delete(e)}_createMessagesContainer(){if(this._messagesContainer)return;let e="cdk-describedby-message-container",i=this._document.querySelectorAll(`.${e}[platform="server"]`);for(let o=0;o<i.length;o++)i[o].remove();let r=this._document.createElement("div");r.style.visibility="hidden",r.classList.add(e),r.classList.add("cdk-visually-hidden"),this._platform.isBrowser||r.setAttribute("platform","server"),this._document.body.appendChild(r),this._messagesContainer=r}_removeCdkDescribedByReferenceIds(e){let i=$p(e,"aria-describedby").filter(r=>r.indexOf(qT)!=0);e.setAttribute("aria-describedby",i.join(" "))}_addMessageReference(e,i){let r=this._messageRegistry.get(i);xb(e,"aria-describedby",r.messageElement.id),e.setAttribute(Hp,this._id),r.referenceCount++}_removeMessageReference(e,i){let r=this._messageRegistry.get(i);r.referenceCount--,zp(e,"aria-describedby",r.messageElement.id),e.removeAttribute(Hp)}_isElementDescribedByMessage(e,i){let r=$p(e,"aria-describedby"),o=this._messageRegistry.get(i),s=o&&o.messageElement.id;return!!s&&r.indexOf(s)!=-1}_canBeDescribed(e,i){if(!this._isElementNode(e))return!1;if(i&&typeof i=="object")return!0;let r=i==null?"":`${i}`.trim(),o=e.getAttribute("aria-label");return r?!o||o.trim()!==r:!1}_isElementNode(e){return e.nodeType===this._document.ELEMENT_NODE}static \u0275fac=function(i){return new(i||n)};static \u0275prov=D({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})();function wb(n,t){return typeof n=="string"?`${t||""}/${n}`:n}function WT(n,t){n.id||(n.id=`${qT}-${t}-${Sb++}`)}var MV=new C("cdk-dir-doc",{providedIn:"root",factory:()=>f(he)}),IV=/^(ar|ckb|dv|he|iw|fa|nqo|ps|sd|ug|ur|yi|.*[-_](Adlm|Arab|Hebr|Nkoo|Rohg|Thaa))(?!.*[-_](Latn|Cyrl)($|-|_))($|-|_)/i;function YT(n){let t=n?.toLowerCase()||"";return t==="auto"&&typeof navigator<"u"&&navigator?.language?IV.test(navigator.language)?"rtl":"ltr":t==="rtl"?"rtl":"ltr"}var jt=(()=>{class n{get value(){return this.valueSignal()}valueSignal=P("ltr");change=new j;constructor(){let e=f(MV,{optional:!0});if(e){let i=e.body?e.body.dir:null,r=e.documentElement?e.documentElement.dir:null;this.valueSignal.set(YT(i||r||"ltr"))}}ngOnDestroy(){this.change.complete()}static \u0275fac=function(i){return new(i||n)};static \u0275prov=D({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})();var gt=(()=>{class n{static \u0275fac=function(i){return new(i||n)};static \u0275mod=De({type:n});static \u0275inj=be({})}return n})();var Wp=class{};function ZT(n){return n&&typeof n.connect=="function"&&!(n instanceof sl)}var Gp=class extends Wp{_data;constructor(t){super(),this._data=t}connect(){return Mn(this._data)?this._data:A(this._data)}disconnect(){}},Zc=(function(n){return n[n.REPLACED=0]="REPLACED",n[n.INSERTED=1]="INSERTED",n[n.MOVED=2]="MOVED",n[n.REMOVED=3]="REMOVED",n})(Zc||{}),qp=class{viewCacheSize=20;_viewCache=[];applyChanges(t,e,i,r,o){t.forEachOperation((s,a,l)=>{let c,d;if(s.previousIndex==null){let u=()=>i(s,a,l);c=this._insertView(u,l,e,r(s)),d=c?Zc.INSERTED:Zc.REPLACED}else l==null?(this._detachAndCacheView(a,e),d=Zc.REMOVED):(c=this._moveView(a,l,e,r(s)),d=Zc.MOVED);o&&o({context:c?.context,operation:d,record:s})})}detach(){for(let t of this._viewCache)t.destroy();this._viewCache=[]}_insertView(t,e,i,r){let o=this._insertViewFromCache(e,i);if(o){o.context.$implicit=r;return}let s=t();return i.createEmbeddedView(s.templateRef,s.context,s.index)}_detachAndCacheView(t,e){let i=e.detach(t);this._maybeCacheView(i,e)}_moveView(t,e,i,r){let o=i.get(t);return i.move(o,e),o.context.$implicit=r,o}_maybeCacheView(t,e){if(this._viewCache.length<this.viewCacheSize)this._viewCache.push(t);else{let i=e.indexOf(t);i===-1?t.destroy():e.remove(i)}}_insertViewFromCache(t,e){let i=this._viewCache.pop();return i&&e.insert(i,t),i||null}};var kV=["contentWrapper"],AV=["*"],JT=new C("VIRTUAL_SCROLL_STRATEGY"),Tb=class{_scrolledIndexChange=new E;scrolledIndexChange=this._scrolledIndexChange.pipe(Us());_viewport=null;_itemSize;_minBufferPx;_maxBufferPx;constructor(t,e,i){this._itemSize=t,this._minBufferPx=e,this._maxBufferPx=i}attach(t){this._viewport=t,this._updateTotalContentSize(),this._updateRenderedRange()}detach(){this._scrolledIndexChange.complete(),this._viewport=null}updateItemAndBufferSize(t,e,i){i<e,this._itemSize=t,this._minBufferPx=e,this._maxBufferPx=i,this._updateTotalContentSize(),this._updateRenderedRange()}onContentScrolled(){this._updateRenderedRange()}onDataLengthChanged(){this._updateTotalContentSize(),this._updateRenderedRange()}onContentRendered(){}onRenderedOffsetChanged(){}scrollToIndex(t,e){this._viewport&&this._viewport.scrollToOffset(t*this._itemSize,e)}_updateTotalContentSize(){this._viewport&&this._viewport.setTotalContentSize(this._viewport.getDataLength()*this._itemSize)}_updateRenderedRange(){if(!this._viewport)return;let t=this._viewport.getRenderedRange(),e={start:t.start,end:t.end},i=this._viewport.getViewportSize(),r=this._viewport.getDataLength(),o=this._viewport.measureScrollOffset(),s=this._itemSize>0?o/this._itemSize:0;if(e.end>r){let l=Math.ceil(i/this._itemSize),c=Math.max(0,Math.min(s,r-l));s!=c&&(s=c,o=c*this._itemSize,e.start=Math.floor(s)),e.end=Math.max(0,Math.min(r,e.start+l))}let a=o-e.start*this._itemSize;if(a<this._minBufferPx&&e.start!=0){let l=Math.ceil((this._maxBufferPx-a)/this._itemSize);e.start=Math.max(0,e.start-l),e.end=Math.min(r,Math.ceil(s+(i+this._minBufferPx)/this._itemSize))}else{let l=e.end*this._itemSize-(o+i);if(l<this._minBufferPx&&e.end!=r){let c=Math.ceil((this._maxBufferPx-l)/this._itemSize);c>0&&(e.end=Math.min(r,e.end+c),e.start=Math.max(0,Math.floor(s-this._minBufferPx/this._itemSize)))}}this._viewport.setRenderedRange(e),this._viewport.setRenderedContentOffset(Math.round(this._itemSize*e.start)),this._scrolledIndexChange.next(Math.floor(s))}};function OV(n){return n._scrollStrategy}var Mb=(()=>{class n{get itemSize(){return this._itemSize}set itemSize(e){this._itemSize=Ii(e)}_itemSize=20;get minBufferPx(){return this._minBufferPx}set minBufferPx(e){this._minBufferPx=Ii(e)}_minBufferPx=100;get maxBufferPx(){return this._maxBufferPx}set maxBufferPx(e){this._maxBufferPx=Ii(e)}_maxBufferPx=200;_scrollStrategy=new Tb(this.itemSize,this.minBufferPx,this.maxBufferPx);ngOnChanges(){this._scrollStrategy.updateItemAndBufferSize(this.itemSize,this.minBufferPx,this.maxBufferPx)}static \u0275fac=function(i){return new(i||n)};static \u0275dir=ie({type:n,selectors:[["cdk-virtual-scroll-viewport","itemSize",""]],inputs:{itemSize:"itemSize",minBufferPx:"minBufferPx",maxBufferPx:"maxBufferPx"},features:[Ct([{provide:JT,useFactory:OV,deps:[or(()=>n)]}]),It]})}return n})(),RV=20,mo=(()=>{class n{_ngZone=f(U);_platform=f(ze);_renderer=f(Wt).createRenderer(null,null);_cleanupGlobalListener;constructor(){}_scrolled=new E;_scrolledCount=0;scrollContainers=new Map;register(e){this.scrollContainers.has(e)||this.scrollContainers.set(e,e.elementScrolled().subscribe(()=>this._scrolled.next(e)))}deregister(e){let i=this.scrollContainers.get(e);i&&(i.unsubscribe(),this.scrollContainers.delete(e))}scrolled(e=RV){return this._platform.isBrowser?new q(i=>{this._cleanupGlobalListener||(this._cleanupGlobalListener=this._ngZone.runOutsideAngular(()=>this._renderer.listen("document","scroll",()=>this._scrolled.next())));let r=e>0?this._scrolled.pipe(hl(e)).subscribe(i):this._scrolled.subscribe(i);return this._scrolledCount++,()=>{r.unsubscribe(),this._scrolledCount--,this._scrolledCount||(this._cleanupGlobalListener?.(),this._cleanupGlobalListener=void 0)}}):A()}ngOnDestroy(){this._cleanupGlobalListener?.(),this._cleanupGlobalListener=void 0,this.scrollContainers.forEach((e,i)=>this.deregister(i)),this._scrolled.complete()}ancestorScrolled(e,i){let r=this.getAncestorScrollContainers(e);return this.scrolled(i).pipe(Ce(o=>!o||r.indexOf(o)>-1))}getAncestorScrollContainers(e){let i=[];return this.scrollContainers.forEach((r,o)=>{this._scrollableContainsElement(o,e)&&i.push(o)}),i}_scrollableContainsElement(e,i){let r=si(i),o=e.getElementRef().nativeElement;do if(r==o)return!0;while(r=r.parentElement);return!1}static \u0275fac=function(i){return new(i||n)};static \u0275prov=D({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})(),Xc=(()=>{class n{elementRef=f(Q);scrollDispatcher=f(mo);ngZone=f(U);dir=f(jt,{optional:!0});_scrollElement=this.elementRef.nativeElement;_destroyed=new E;_renderer=f(vt);_cleanupScroll;_elementScrolled=new E;constructor(){}ngOnInit(){this._cleanupScroll=this.ngZone.runOutsideAngular(()=>this._renderer.listen(this._scrollElement,"scroll",e=>this._elementScrolled.next(e))),this.scrollDispatcher.register(this)}ngOnDestroy(){this._cleanupScroll?.(),this._elementScrolled.complete(),this.scrollDispatcher.deregister(this),this._destroyed.next(),this._destroyed.complete()}elementScrolled(){return this._elementScrolled}getElementRef(){return this.elementRef}scrollTo(e){let i=this.elementRef.nativeElement,r=this.dir&&this.dir.value=="rtl";e.left==null&&(e.left=r?e.end:e.start),e.right==null&&(e.right=r?e.start:e.end),e.bottom!=null&&(e.top=i.scrollHeight-i.clientHeight-e.bottom),r&&Va()!=ki.NORMAL?(e.left!=null&&(e.right=i.scrollWidth-i.clientWidth-e.left),Va()==ki.INVERTED?e.left=e.right:Va()==ki.NEGATED&&(e.left=e.right?-e.right:e.right)):e.right!=null&&(e.left=i.scrollWidth-i.clientWidth-e.right),this._applyScrollToOptions(e)}_applyScrollToOptions(e){let i=this.elementRef.nativeElement;Fp()?i.scrollTo(e):(e.top!=null&&(i.scrollTop=e.top),e.left!=null&&(i.scrollLeft=e.left))}measureScrollOffset(e){let i="left",r="right",o=this.elementRef.nativeElement;if(e=="top")return o.scrollTop;if(e=="bottom")return o.scrollHeight-o.clientHeight-o.scrollTop;let s=this.dir&&this.dir.value=="rtl";return e=="start"?e=s?r:i:e=="end"&&(e=s?i:r),s&&Va()==ki.INVERTED?e==i?o.scrollWidth-o.clientWidth-o.scrollLeft:o.scrollLeft:s&&Va()==ki.NEGATED?e==i?o.scrollLeft+o.scrollWidth-o.clientWidth:-o.scrollLeft:e==i?o.scrollLeft:o.scrollWidth-o.clientWidth-o.scrollLeft}static \u0275fac=function(i){return new(i||n)};static \u0275dir=ie({type:n,selectors:[["","cdk-scrollable",""],["","cdkScrollable",""]]})}return n})(),PV=20,ai=(()=>{class n{_platform=f(ze);_listeners;_viewportSize=null;_change=new E;_document=f(he);constructor(){let e=f(U),i=f(Wt).createRenderer(null,null);e.runOutsideAngular(()=>{if(this._platform.isBrowser){let r=o=>this._change.next(o);this._listeners=[i.listen("window","resize",r),i.listen("window","orientationchange",r)]}this.change().subscribe(()=>this._viewportSize=null)})}ngOnDestroy(){this._listeners?.forEach(e=>e()),this._change.complete()}getViewportSize(){this._viewportSize||this._updateViewportSize();let e={width:this._viewportSize.width,height:this._viewportSize.height};return this._platform.isBrowser||(this._viewportSize=null),e}getViewportRect(){let e=this.getViewportScrollPosition(),{width:i,height:r}=this.getViewportSize();return{top:e.top,left:e.left,bottom:e.top+r,right:e.left+i,height:r,width:i}}getViewportScrollPosition(){if(!this._platform.isBrowser)return{top:0,left:0};let e=this._document,i=this._getWindow(),r=e.documentElement,o=r.getBoundingClientRect(),s=-o.top||e.body?.scrollTop||i.scrollY||r.scrollTop||0,a=-o.left||e.body?.scrollLeft||i.scrollX||r.scrollLeft||0;return{top:s,left:a}}change(e=PV){return e>0?this._change.pipe(hl(e)):this._change}_getWindow(){return this._document.defaultView||window}_updateViewportSize(){let e=this._getWindow();this._viewportSize=this._platform.isBrowser?{width:e.innerWidth,height:e.innerHeight}:{width:0,height:0}}static \u0275fac=function(i){return new(i||n)};static \u0275prov=D({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})(),XT=new C("VIRTUAL_SCROLLABLE"),NV=(()=>{class n extends Xc{constructor(){super()}measureViewportSize(e){let i=this.elementRef.nativeElement;return e==="horizontal"?i.clientWidth:i.clientHeight}static \u0275fac=function(i){return new(i||n)};static \u0275dir=ie({type:n,features:[Tt]})}return n})();function FV(n,t){return n.start==t.start&&n.end==t.end}var LV=typeof requestAnimationFrame<"u"?sm:om,eM=new C("CDK_VIRTUAL_SCROLL_VIEWPORT"),Ib=(()=>{class n extends NV{elementRef=f(Q);_changeDetectorRef=f(tt);_scrollStrategy=f(JT,{optional:!0});scrollable=f(XT,{optional:!0});_platform=f(ze);_detachedSubject=new E;_renderedRangeSubject=new E;_renderedContentOffsetSubject=new E;get orientation(){return this._orientation}set orientation(e){this._orientation!==e&&(this._orientation=e,this._calculateSpacerSize())}_orientation="vertical";appendOnly=!1;scrolledIndexChange=new q(e=>this._scrollStrategy.scrolledIndexChange.subscribe(i=>Promise.resolve().then(()=>this.ngZone.run(()=>e.next(i)))));_contentWrapper;renderedRangeStream=this._renderedRangeSubject;renderedContentOffset=this._renderedContentOffsetSubject.pipe(Ce(e=>e!==null),Us());_totalContentSize=0;_totalContentWidth=P("");_totalContentHeight=P("");_renderedContentTransform;_renderedRange={start:0,end:0};_dataLength=0;_viewportSize=0;_forOf=null;_renderedContentOffset=0;_renderedContentOffsetNeedsRewrite=!1;_changeDetectionNeeded=P(!1);_runAfterChangeDetection=[];_viewportChanges=Z.EMPTY;_injector=f(le);_isDestroyed=!1;constructor(){super();let e=f(ai);this._scrollStrategy,this._viewportChanges=e.change().subscribe(()=>{this.checkViewportSize()}),this.scrollable||(this.elementRef.nativeElement.classList.add("cdk-virtual-scrollable"),this.scrollable=this);let i=fr(()=>{this._changeDetectionNeeded()&&this._doChangeDetection()},{injector:f(rn).injector});f(at).onDestroy(()=>{i.destroy()})}ngOnInit(){this._platform.isBrowser&&(this.scrollable===this&&super.ngOnInit(),this.ngZone.runOutsideAngular(()=>Promise.resolve().then(()=>{this._measureViewportSize(),this._scrollStrategy.attach(this),this.scrollable.elementScrolled().pipe(dt(null),hl(0,LV),ne(this._destroyed)).subscribe(()=>this._scrollStrategy.onContentScrolled()),this._markChangeDetectionNeeded()})))}ngOnDestroy(){this.detach(),this._scrollStrategy.detach(),this._renderedRangeSubject.complete(),this._detachedSubject.complete(),this._viewportChanges.unsubscribe(),this._isDestroyed=!0,super.ngOnDestroy()}attach(e){this._forOf,this.ngZone.runOutsideAngular(()=>{this._forOf=e,this._forOf.dataStream.pipe(ne(this._detachedSubject)).subscribe(i=>{let r=i.length;r!==this._dataLength&&(this._dataLength=r,this._scrollStrategy.onDataLengthChanged()),this._doChangeDetection()})})}detach(){this._forOf=null,this._detachedSubject.next()}getDataLength(){return this._dataLength}getViewportSize(){return this._viewportSize}getRenderedRange(){return this._renderedRange}measureBoundingClientRectWithScrollOffset(e){return this.getElementRef().nativeElement.getBoundingClientRect()[e]}setTotalContentSize(e){this._totalContentSize!==e&&(this._totalContentSize=e,this._calculateSpacerSize(),this._markChangeDetectionNeeded())}setRenderedRange(e){FV(this._renderedRange,e)||(this.appendOnly&&(e={start:0,end:Math.max(this._renderedRange.end,e.end)}),this._renderedRangeSubject.next(this._renderedRange=e),this._markChangeDetectionNeeded(()=>this._scrollStrategy.onContentRendered()))}getOffsetToRenderedContentStart(){return this._renderedContentOffsetNeedsRewrite?null:this._renderedContentOffset}setRenderedContentOffset(e,i="to-start"){e=this.appendOnly&&i==="to-start"?0:e;let r=this.dir&&this.dir.value=="rtl",o=this.orientation=="horizontal",s=o?"X":"Y",l=`translate${s}(${Number((o&&r?-1:1)*e)}px)`;this._renderedContentOffset=e,i==="to-end"&&(l+=` translate${s}(-100%)`,this._renderedContentOffsetNeedsRewrite=!0),this._renderedContentTransform!=l&&(this._renderedContentTransform=l,this._markChangeDetectionNeeded(()=>{this._renderedContentOffsetNeedsRewrite?(this._renderedContentOffset-=this.measureRenderedContentSize(),this._renderedContentOffsetNeedsRewrite=!1,this.setRenderedContentOffset(this._renderedContentOffset)):this._scrollStrategy.onRenderedOffsetChanged()}))}scrollToOffset(e,i="auto"){let r={behavior:i};this.orientation==="horizontal"?r.start=e:r.top=e,this.scrollable.scrollTo(r)}scrollToIndex(e,i="auto"){this._scrollStrategy.scrollToIndex(e,i)}measureScrollOffset(e){let i;return this.scrollable==this?i=r=>super.measureScrollOffset(r):i=r=>this.scrollable.measureScrollOffset(r),Math.max(0,i(e??(this.orientation==="horizontal"?"start":"top"))-this.measureViewportOffset())}measureViewportOffset(e){let i,r="left",o="right",s=this.dir?.value=="rtl";e=="start"?i=s?o:r:e=="end"?i=s?r:o:e?i=e:i=this.orientation==="horizontal"?"left":"top";let a=this.scrollable.measureBoundingClientRectWithScrollOffset(i);return this.elementRef.nativeElement.getBoundingClientRect()[i]-a}measureRenderedContentSize(){let e=this._contentWrapper.nativeElement;return this.orientation==="horizontal"?e.offsetWidth:e.offsetHeight}measureRangeSize(e){return this._forOf?this._forOf.measureRangeSize(e,this.orientation):0}checkViewportSize(){this._measureViewportSize(),this._scrollStrategy.onDataLengthChanged()}_measureViewportSize(){this._viewportSize=this.scrollable.measureViewportSize(this.orientation)}_markChangeDetectionNeeded(e){e&&this._runAfterChangeDetection.push(e),!Ae(this._changeDetectionNeeded)&&this.ngZone.runOutsideAngular(()=>{Promise.resolve().then(()=>{this.ngZone.run(()=>{this._changeDetectionNeeded.set(!0)})})})}_doChangeDetection(){this._isDestroyed||this.ngZone.run(()=>{this._changeDetectorRef.markForCheck(),this._contentWrapper.nativeElement.style.transform=this._renderedContentTransform,this._renderedContentOffsetSubject.next(this.getOffsetToRenderedContentStart()),xt(()=>{this._changeDetectionNeeded.set(!1);let e=this._runAfterChangeDetection;this._runAfterChangeDetection=[];for(let i of e)i()},{injector:this._injector})})}_calculateSpacerSize(){this._totalContentHeight.set(this.orientation==="horizontal"?"":`${this._totalContentSize}px`),this._totalContentWidth.set(this.orientation==="horizontal"?`${this._totalContentSize}px`:"")}static \u0275fac=function(i){return new(i||n)};static \u0275cmp=G({type:n,selectors:[["cdk-virtual-scroll-viewport"]],viewQuery:function(i,r){if(i&1&&bt(kV,7),i&2){let o;J(o=ee())&&(r._contentWrapper=o.first)}},hostAttrs:[1,"cdk-virtual-scroll-viewport"],hostVars:4,hostBindings:function(i,r){i&2&&ce("cdk-virtual-scroll-orientation-horizontal",r.orientation==="horizontal")("cdk-virtual-scroll-orientation-vertical",r.orientation!=="horizontal")},inputs:{orientation:"orientation",appendOnly:[2,"appendOnly","appendOnly",de]},outputs:{scrolledIndexChange:"scrolledIndexChange"},features:[Ct([{provide:Xc,useFactory:()=>f(XT,{optional:!0})||f(n)},{provide:eM,useExisting:n}]),Tt],ngContentSelectors:AV,decls:4,vars:4,consts:[["contentWrapper",""],[1,"cdk-virtual-scroll-content-wrapper"],[1,"cdk-virtual-scroll-spacer"]],template:function(i,r){i&1&&(ht(),gn(0,"div",1,0),ke(2),Zn(),Xo(3,"div",2)),i&2&&(y(3),da("width",r._totalContentWidth())("height",r._totalContentHeight()))},styles:[`cdk-virtual-scroll-viewport {
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
`],encapsulation:2,changeDetection:0})}return n})();function QT(n,t,e){let i=e;if(!i.getBoundingClientRect)return 0;let r=i.getBoundingClientRect();return n==="horizontal"?t==="start"?r.left:r.right:t==="start"?r.top:r.bottom}var kb=(()=>{class n{_viewContainerRef=f(pt);_template=f(Mt);_differs=f(wf);_viewRepeater=new qp;_viewport=f(eM,{skipSelf:!0});viewChange=new E;_dataSourceChanges=new E;get cdkVirtualForOf(){return this._cdkVirtualForOf}set cdkVirtualForOf(e){this._cdkVirtualForOf=e,ZT(e)?this._dataSourceChanges.next(e):this._dataSourceChanges.next(new Gp(Mn(e)?e:Array.from(e||[])))}_cdkVirtualForOf;get cdkVirtualForTrackBy(){return this._cdkVirtualForTrackBy}set cdkVirtualForTrackBy(e){this._needsUpdate=!0,this._cdkVirtualForTrackBy=e?(i,r)=>e(i+(this._renderedRange?this._renderedRange.start:0),r):void 0}_cdkVirtualForTrackBy;set cdkVirtualForTemplate(e){e&&(this._needsUpdate=!0,this._template=e)}get cdkVirtualForTemplateCacheSize(){return this._viewRepeater.viewCacheSize}set cdkVirtualForTemplateCacheSize(e){this._viewRepeater.viewCacheSize=Ii(e)}dataStream=this._dataSourceChanges.pipe(dt(null),ml(),ut(([e,i])=>this._changeDataSource(e,i)),gl(1));_differ=null;_data=[];_renderedItems=[];_renderedRange={start:0,end:0};_needsUpdate=!1;_destroyed=new E;constructor(){let e=f(U);this.dataStream.subscribe(i=>{this._data=i,this._onRenderedDataChange()}),this._viewport.renderedRangeStream.pipe(ne(this._destroyed)).subscribe(i=>{this._renderedRange=i,this.viewChange.observers.length&&e.run(()=>this.viewChange.next(this._renderedRange)),this._onRenderedDataChange()}),this._viewport.attach(this)}measureRangeSize(e,i){if(e.start>=e.end)return 0;e.start<this._renderedRange.start||e.end>this._renderedRange.end;let r=e.start-this._renderedRange.start,o=e.end-e.start,s,a;for(let l=0;l<o;l++){let c=this._viewContainerRef.get(l+r);if(c&&c.rootNodes.length){s=a=c.rootNodes[0];break}}for(let l=o-1;l>-1;l--){let c=this._viewContainerRef.get(l+r);if(c&&c.rootNodes.length){a=c.rootNodes[c.rootNodes.length-1];break}}return s&&a?QT(i,"end",a)-QT(i,"start",s):0}ngDoCheck(){if(this._differ&&this._needsUpdate){let e=this._differ.diff(this._renderedItems);e?this._applyChanges(e):this._updateContext(),this._needsUpdate=!1}}ngOnDestroy(){this._viewport.detach(),this._dataSourceChanges.next(void 0),this._dataSourceChanges.complete(),this.viewChange.complete(),this._destroyed.next(),this._destroyed.complete(),this._viewRepeater.detach()}_onRenderedDataChange(){this._renderedRange&&(this._renderedItems=this._data.slice(this._renderedRange.start,this._renderedRange.end),this._differ||(this._differ=this._differs.find(this._renderedItems).create((e,i)=>this.cdkVirtualForTrackBy?this.cdkVirtualForTrackBy(e,i):i)),this._needsUpdate=!0)}_changeDataSource(e,i){return e&&e.disconnect(this),this._needsUpdate=!0,i?i.connect(this):A()}_updateContext(){let e=this._data.length,i=this._viewContainerRef.length;for(;i--;){let r=this._viewContainerRef.get(i);r.context.index=this._renderedRange.start+i,r.context.count=e,this._updateComputedContextProperties(r.context),r.detectChanges()}}_applyChanges(e){this._viewRepeater.applyChanges(e,this._viewContainerRef,(o,s,a)=>this._getEmbeddedViewArgs(o,a),o=>o.item),e.forEachIdentityChange(o=>{let s=this._viewContainerRef.get(o.currentIndex);s.context.$implicit=o.item});let i=this._data.length,r=this._viewContainerRef.length;for(;r--;){let o=this._viewContainerRef.get(r);o.context.index=this._renderedRange.start+r,o.context.count=i,this._updateComputedContextProperties(o.context)}}_updateComputedContextProperties(e){e.first=e.index===0,e.last=e.index===e.count-1,e.even=e.index%2===0,e.odd=!e.even}_getEmbeddedViewArgs(e,i){return{templateRef:this._template,context:{$implicit:e.item,cdkVirtualForOf:this._cdkVirtualForOf,index:-1,count:-1,first:!1,last:!1,odd:!1,even:!1},index:i}}static ngTemplateContextGuard(e,i){return!0}static \u0275fac=function(i){return new(i||n)};static \u0275dir=ie({type:n,selectors:[["","cdkVirtualFor","","cdkVirtualForOf",""]],inputs:{cdkVirtualForOf:"cdkVirtualForOf",cdkVirtualForTrackBy:"cdkVirtualForTrackBy",cdkVirtualForTemplate:"cdkVirtualForTemplate",cdkVirtualForTemplateCacheSize:"cdkVirtualForTemplateCacheSize"}})}return n})();var kr=(()=>{class n{static \u0275fac=function(i){return new(i||n)};static \u0275mod=De({type:n});static \u0275inj=be({})}return n})(),Qc=(()=>{class n{static \u0275fac=function(i){return new(i||n)};static \u0275mod=De({type:n});static \u0275inj=be({imports:[gt,kr,gt,kr]})}return n})();var Jc=class{_attachedHost=null;attach(t){return this._attachedHost=t,t.attach(this)}detach(){let t=this._attachedHost;t!=null&&(this._attachedHost=null,t.detach())}get isAttached(){return this._attachedHost!=null}setAttachedHost(t){this._attachedHost=t}},ed=class extends Jc{component;viewContainerRef;injector;projectableNodes;bindings;constructor(t,e,i,r,o){super(),this.component=t,this.viewContainerRef=e,this.injector=i,this.projectableNodes=r,this.bindings=o||null}},qi=class extends Jc{templateRef;viewContainerRef;context;injector;constructor(t,e,i,r){super(),this.templateRef=t,this.viewContainerRef=e,this.context=i,this.injector=r}get origin(){return this.templateRef.elementRef}attach(t,e=this.context){return this.context=e,super.attach(t)}detach(){return this.context=void 0,super.detach()}},Ab=class extends Jc{element;constructor(t){super(),this.element=t instanceof Q?t.nativeElement:t}},Kp=class{_attachedPortal=null;_disposeFn=null;_isDisposed=!1;hasAttached(){return!!this._attachedPortal}attach(t){if(t instanceof ed)return this._attachedPortal=t,this.attachComponentPortal(t);if(t instanceof qi)return this._attachedPortal=t,this.attachTemplatePortal(t);if(this.attachDomPortal&&t instanceof Ab)return this._attachedPortal=t,this.attachDomPortal(t)}attachDomPortal=null;detach(){this._attachedPortal&&(this._attachedPortal.setAttachedHost(null),this._attachedPortal=null),this._invokeDisposeFn()}dispose(){this.hasAttached()&&this.detach(),this._invokeDisposeFn(),this._isDisposed=!0}setDisposeFn(t){this._disposeFn=t}_invokeDisposeFn(){this._disposeFn&&(this._disposeFn(),this._disposeFn=null)}},td=class extends Kp{outletElement;_appRef;_defaultInjector;constructor(t,e,i){super(),this.outletElement=t,this._appRef=e,this._defaultInjector=i}attachComponentPortal(t){let e;if(t.viewContainerRef){let i=t.injector||t.viewContainerRef.injector,r=i.get(ji,null,{optional:!0})||void 0;e=t.viewContainerRef.createComponent(t.component,{index:t.viewContainerRef.length,injector:i,ngModuleRef:r,projectableNodes:t.projectableNodes||void 0,bindings:t.bindings||void 0}),this.setDisposeFn(()=>e.destroy())}else{let i=this._appRef,r=t.injector||this._defaultInjector||le.NULL,o=r.get(We,i.injector);e=Sf(t.component,{elementInjector:r,environmentInjector:o,projectableNodes:t.projectableNodes||void 0,bindings:t.bindings||void 0}),i.attachView(e.hostView),this.setDisposeFn(()=>{i.viewCount>0&&i.detachView(e.hostView),e.destroy()})}return this.outletElement.appendChild(this._getComponentRootNode(e)),this._attachedPortal=t,e}attachTemplatePortal(t){let e=t.viewContainerRef,i=e.createEmbeddedView(t.templateRef,t.context,{injector:t.injector});return i.rootNodes.forEach(r=>this.outletElement.appendChild(r)),i.detectChanges(),this.setDisposeFn(()=>{let r=e.indexOf(i);r!==-1&&e.remove(r)}),this._attachedPortal=t,i}attachDomPortal=t=>{let e=t.element;e.parentNode;let i=this.outletElement.ownerDocument.createComment("dom-portal");e.parentNode.insertBefore(i,e),this.outletElement.appendChild(e),this._attachedPortal=t,super.setDisposeFn(()=>{i.parentNode&&i.parentNode.replaceChild(e,i)})};dispose(){super.dispose(),this.outletElement.remove()}_getComponentRootNode(t){return t.hostView.rootNodes[0]}},tM=(()=>{class n extends qi{constructor(){let e=f(Mt),i=f(pt);super(e,i)}static \u0275fac=function(i){return new(i||n)};static \u0275dir=ie({type:n,selectors:[["","cdkPortal",""]],exportAs:["cdkPortal"],features:[Tt]})}return n})(),Ob=(()=>{class n extends Kp{_moduleRef=f(ji,{optional:!0});_document=f(he);_viewContainerRef=f(pt);_isInitialized=!1;_attachedRef=null;constructor(){super()}get portal(){return this._attachedPortal}set portal(e){this.hasAttached()&&!e&&!this._isInitialized||(this.hasAttached()&&super.detach(),e&&super.attach(e),this._attachedPortal=e||null)}attached=new j;get attachedRef(){return this._attachedRef}ngOnInit(){this._isInitialized=!0}ngOnDestroy(){super.dispose(),this._attachedRef=this._attachedPortal=null}attachComponentPortal(e){e.setAttachedHost(this);let i=e.viewContainerRef!=null?e.viewContainerRef:this._viewContainerRef,r=i.createComponent(e.component,{index:i.length,injector:e.injector||i.injector,projectableNodes:e.projectableNodes||void 0,ngModuleRef:this._moduleRef||void 0,bindings:e.bindings||void 0});return i!==this._viewContainerRef&&this._getRootNode().appendChild(r.hostView.rootNodes[0]),super.setDisposeFn(()=>r.destroy()),this._attachedPortal=e,this._attachedRef=r,this.attached.emit(r),r}attachTemplatePortal(e){e.setAttachedHost(this);let i=this._viewContainerRef.createEmbeddedView(e.templateRef,e.context,{injector:e.injector});return super.setDisposeFn(()=>this._viewContainerRef.clear()),this._attachedPortal=e,this._attachedRef=i,this.attached.emit(i),i}attachDomPortal=e=>{let i=e.element;i.parentNode;let r=this._document.createComment("dom-portal");e.setAttachedHost(this),i.parentNode.insertBefore(r,i),this._getRootNode().appendChild(i),this._attachedPortal=e,super.setDisposeFn(()=>{r.parentNode&&r.parentNode.replaceChild(i,r)})};_getRootNode(){let e=this._viewContainerRef.element.nativeElement;return e.nodeType===e.ELEMENT_NODE?e:e.parentNode}static \u0275fac=function(i){return new(i||n)};static \u0275dir=ie({type:n,selectors:[["","cdkPortalOutlet",""]],inputs:{portal:[0,"cdkPortalOutlet","portal"]},outputs:{attached:"attached"},exportAs:["cdkPortalOutlet"],features:[Tt]})}return n})(),nM=(()=>{class n{static \u0275fac=function(i){return new(i||n)};static \u0275mod=De({type:n});static \u0275inj=be({})}return n})();var iM=Fp();function dM(n){return new Yp(n.get(ai),n.get(he))}var Yp=class{_viewportRuler;_previousHTMLStyles={top:"",left:""};_previousScrollPosition;_isEnabled=!1;_document;constructor(t,e){this._viewportRuler=t,this._document=e}attach(){}enable(){if(this._canBeEnabled()){let t=this._document.documentElement;this._previousScrollPosition=this._viewportRuler.getViewportScrollPosition(),this._previousHTMLStyles.left=t.style.left||"",this._previousHTMLStyles.top=t.style.top||"",t.style.left=mt(-this._previousScrollPosition.left),t.style.top=mt(-this._previousScrollPosition.top),t.classList.add("cdk-global-scrollblock"),this._isEnabled=!0}}disable(){if(this._isEnabled){let t=this._document.documentElement,e=this._document.body,i=t.style,r=e.style,o=i.scrollBehavior||"",s=r.scrollBehavior||"";this._isEnabled=!1,i.left=this._previousHTMLStyles.left,i.top=this._previousHTMLStyles.top,t.classList.remove("cdk-global-scrollblock"),iM&&(i.scrollBehavior=r.scrollBehavior="auto"),window.scroll(this._previousScrollPosition.left,this._previousScrollPosition.top),iM&&(i.scrollBehavior=o,r.scrollBehavior=s)}}_canBeEnabled(){if(this._document.documentElement.classList.contains("cdk-global-scrollblock")||this._isEnabled)return!1;let e=this._document.documentElement,i=this._viewportRuler.getViewportSize();return e.scrollHeight>i.height||e.scrollWidth>i.width}};function uM(n,t){return new Zp(n.get(mo),n.get(U),n.get(ai),t)}var Zp=class{_scrollDispatcher;_ngZone;_viewportRuler;_config;_scrollSubscription=null;_overlayRef;_initialScrollPosition;constructor(t,e,i,r){this._scrollDispatcher=t,this._ngZone=e,this._viewportRuler=i,this._config=r}attach(t){this._overlayRef,this._overlayRef=t}enable(){if(this._scrollSubscription)return;let t=this._scrollDispatcher.scrolled(0).pipe(Ce(e=>!e||!this._overlayRef.overlayElement.contains(e.getElementRef().nativeElement)));this._config&&this._config.threshold&&this._config.threshold>1?(this._initialScrollPosition=this._viewportRuler.getViewportScrollPosition().top,this._scrollSubscription=t.subscribe(()=>{let e=this._viewportRuler.getViewportScrollPosition().top;Math.abs(e-this._initialScrollPosition)>this._config.threshold?this._detach():this._overlayRef.updatePosition()})):this._scrollSubscription=t.subscribe(this._detach)}disable(){this._scrollSubscription&&(this._scrollSubscription.unsubscribe(),this._scrollSubscription=null)}detach(){this.disable(),this._overlayRef=null}_detach=()=>{this.disable(),this._overlayRef.hasAttached()&&this._ngZone.run(()=>this._overlayRef.detach())}};var nd=class{enable(){}disable(){}attach(){}};function Rb(n,t){return t.some(e=>{let i=n.bottom<e.top,r=n.top>e.bottom,o=n.right<e.left,s=n.left>e.right;return i||r||o||s})}function rM(n,t){return t.some(e=>{let i=n.top<e.top,r=n.bottom>e.bottom,o=n.left<e.left,s=n.right>e.right;return i||r||o||s})}function Ar(n,t){return new Xp(n.get(mo),n.get(ai),n.get(U),t)}var Xp=class{_scrollDispatcher;_viewportRuler;_ngZone;_config;_scrollSubscription=null;_overlayRef;constructor(t,e,i,r){this._scrollDispatcher=t,this._viewportRuler=e,this._ngZone=i,this._config=r}attach(t){this._overlayRef,this._overlayRef=t}enable(){if(!this._scrollSubscription){let t=this._config?this._config.scrollThrottle:0;this._scrollSubscription=this._scrollDispatcher.scrolled(t).subscribe(()=>{if(this._overlayRef.updatePosition(),this._config&&this._config.autoClose){let e=this._overlayRef.overlayElement.getBoundingClientRect(),{width:i,height:r}=this._viewportRuler.getViewportSize();Rb(e,[{width:i,height:r,bottom:r,right:i,top:0,left:0}])&&(this.disable(),this._ngZone.run(()=>this._overlayRef.detach()))}})}}disable(){this._scrollSubscription&&(this._scrollSubscription.unsubscribe(),this._scrollSubscription=null)}detach(){this.disable(),this._overlayRef=null}},fM=(()=>{class n{_injector=f(le);constructor(){}noop=()=>new nd;close=e=>uM(this._injector,e);block=()=>dM(this._injector);reposition=e=>Ar(this._injector,e);static \u0275fac=function(i){return new(i||n)};static \u0275prov=D({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})(),bs=class{positionStrategy;scrollStrategy=new nd;panelClass="";hasBackdrop=!1;backdropClass="cdk-overlay-dark-backdrop";disableAnimations;width;height;minWidth;minHeight;maxWidth;maxHeight;direction;disposeOnNavigation=!1;usePopover;eventPredicate;constructor(t){if(t){let e=Object.keys(t);for(let i of e)t[i]!==void 0&&(this[i]=t[i])}}};var Qp=class{connectionPair;scrollableViewProperties;constructor(t,e){this.connectionPair=t,this.scrollableViewProperties=e}};var pM=(()=>{class n{_attachedOverlays=[];_document=f(he);_isAttached=!1;constructor(){}ngOnDestroy(){this.detach()}add(e){this.remove(e),this._attachedOverlays.push(e)}remove(e){let i=this._attachedOverlays.indexOf(e);i>-1&&this._attachedOverlays.splice(i,1),this._attachedOverlays.length===0&&this.detach()}canReceiveEvent(e,i,r){return r.observers.length<1?!1:e.eventPredicate?e.eventPredicate(i):!0}static \u0275fac=function(i){return new(i||n)};static \u0275prov=D({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})(),hM=(()=>{class n extends pM{_ngZone=f(U);_renderer=f(Wt).createRenderer(null,null);_cleanupKeydown;add(e){super.add(e),this._isAttached||(this._ngZone.runOutsideAngular(()=>{this._cleanupKeydown=this._renderer.listen("body","keydown",this._keydownListener)}),this._isAttached=!0)}detach(){this._isAttached&&(this._cleanupKeydown?.(),this._isAttached=!1)}_keydownListener=e=>{let i=this._attachedOverlays;for(let r=i.length-1;r>-1;r--){let o=i[r];if(this.canReceiveEvent(o,e,o._keydownEvents)){this._ngZone.run(()=>o._keydownEvents.next(e));break}}};static \u0275fac=(()=>{let e;return function(r){return(e||(e=mn(n)))(r||n)}})();static \u0275prov=D({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})(),mM=(()=>{class n extends pM{_platform=f(ze);_ngZone=f(U);_renderer=f(Wt).createRenderer(null,null);_cursorOriginalValue;_cursorStyleIsSet=!1;_pointerDownEventTarget=null;_cleanups;add(e){if(super.add(e),!this._isAttached){let i=this._document.body,r={capture:!0},o=this._renderer;this._cleanups=this._ngZone.runOutsideAngular(()=>[o.listen(i,"pointerdown",this._pointerDownListener,r),o.listen(i,"click",this._clickListener,r),o.listen(i,"auxclick",this._clickListener,r),o.listen(i,"contextmenu",this._clickListener,r)]),this._platform.IOS&&!this._cursorStyleIsSet&&(this._cursorOriginalValue=i.style.cursor,i.style.cursor="pointer",this._cursorStyleIsSet=!0),this._isAttached=!0}}detach(){this._isAttached&&(this._cleanups?.forEach(e=>e()),this._cleanups=void 0,this._platform.IOS&&this._cursorStyleIsSet&&(this._document.body.style.cursor=this._cursorOriginalValue,this._cursorStyleIsSet=!1),this._isAttached=!1)}_pointerDownListener=e=>{this._pointerDownEventTarget=un(e)};_clickListener=e=>{let i=un(e),r=e.type==="click"&&this._pointerDownEventTarget?this._pointerDownEventTarget:i;this._pointerDownEventTarget=null;let o=this._attachedOverlays.slice();for(let s=o.length-1;s>-1;s--){let a=o[s],l=a._outsidePointerEvents;if(!(!a.hasAttached()||!this.canReceiveEvent(a,e,l))){if(oM(a.overlayElement,i)||oM(a.overlayElement,r))break;this._ngZone?this._ngZone.run(()=>l.next(e)):l.next(e)}}};static \u0275fac=(()=>{let e;return function(r){return(e||(e=mn(n)))(r||n)}})();static \u0275prov=D({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})();function oM(n,t){let e=typeof ShadowRoot<"u"&&ShadowRoot,i=t;for(;i;){if(i===n)return!0;i=e&&i instanceof ShadowRoot?i.host:i.parentNode}return!1}var gM=(()=>{class n{static \u0275fac=function(i){return new(i||n)};static \u0275cmp=G({type:n,selectors:[["ng-component"]],hostAttrs:["cdk-overlay-style-loader",""],decls:0,vars:0,template:function(i,r){},styles:[`.cdk-overlay-container, .cdk-global-overlay-wrapper {
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
`],encapsulation:2,changeDetection:0})}return n})(),yM=(()=>{class n{_platform=f(ze);_containerElement;_document=f(he);_styleLoader=f(wn);constructor(){}ngOnDestroy(){this._containerElement?.remove()}getContainerElement(){return this._loadStyles(),this._containerElement||this._createContainer(),this._containerElement}_createContainer(){let e="cdk-overlay-container";if(this._platform.isBrowser||gb()){let r=this._document.querySelectorAll(`.${e}[platform="server"], .${e}[platform="test"]`);for(let o=0;o<r.length;o++)r[o].remove()}let i=this._document.createElement("div");i.classList.add(e),gb()?i.setAttribute("platform","test"):this._platform.isBrowser||i.setAttribute("platform","server"),this._document.body.appendChild(i),this._containerElement=i}_loadStyles(){this._styleLoader.load(gM)}static \u0275fac=function(i){return new(i||n)};static \u0275prov=D({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})(),Pb=class{_renderer;_ngZone;element;_cleanupClick;_cleanupTransitionEnd;_fallbackTimeout;constructor(t,e,i,r){this._renderer=e,this._ngZone=i,this.element=t.createElement("div"),this.element.classList.add("cdk-overlay-backdrop"),this._cleanupClick=e.listen(this.element,"click",r)}detach(){this._ngZone.runOutsideAngular(()=>{let t=this.element;clearTimeout(this._fallbackTimeout),this._cleanupTransitionEnd?.(),this._cleanupTransitionEnd=this._renderer.listen(t,"transitionend",this.dispose),this._fallbackTimeout=setTimeout(this.dispose,500),t.style.pointerEvents="none",t.classList.remove("cdk-overlay-backdrop-showing")})}dispose=()=>{clearTimeout(this._fallbackTimeout),this._cleanupClick?.(),this._cleanupTransitionEnd?.(),this._cleanupClick=this._cleanupTransitionEnd=this._fallbackTimeout=void 0,this.element.remove()}};function Nb(n){return n&&n.nodeType===1}var Jp=class{_portalOutlet;_host;_pane;_config;_ngZone;_keyboardDispatcher;_document;_location;_outsideClickDispatcher;_animationsDisabled;_injector;_renderer;_backdropClick=new E;_attachments=new E;_detachments=new E;_positionStrategy;_scrollStrategy;_locationChanges=Z.EMPTY;_backdropRef=null;_detachContentMutationObserver;_detachContentAfterRenderRef;_disposed=!1;_previousHostParent;_keydownEvents=new E;_outsidePointerEvents=new E;_afterNextRenderRef;constructor(t,e,i,r,o,s,a,l,c,d=!1,u,p){this._portalOutlet=t,this._host=e,this._pane=i,this._config=r,this._ngZone=o,this._keyboardDispatcher=s,this._document=a,this._location=l,this._outsideClickDispatcher=c,this._animationsDisabled=d,this._injector=u,this._renderer=p,r.scrollStrategy&&(this._scrollStrategy=r.scrollStrategy,this._scrollStrategy.attach(this)),this._positionStrategy=r.positionStrategy}get overlayElement(){return this._pane}get backdropElement(){return this._backdropRef?.element||null}get hostElement(){return this._host}get eventPredicate(){return this._config?.eventPredicate||null}attach(t){if(this._disposed)return null;this._attachHost();let e=this._portalOutlet.attach(t);return this._positionStrategy?.attach(this),this._updateStackingOrder(),this._updateElementSize(),this._updateElementDirection(),this._scrollStrategy&&this._scrollStrategy.enable(),this._afterNextRenderRef?.destroy(),this._afterNextRenderRef=xt(()=>{this.hasAttached()&&this.updatePosition()},{injector:this._injector}),this._togglePointerEvents(!0),this._config.hasBackdrop&&this._attachBackdrop(),this._config.panelClass&&this._toggleClasses(this._pane,this._config.panelClass,!0),this._attachments.next(),this._completeDetachContent(),this._keyboardDispatcher.add(this),this._config.disposeOnNavigation&&(this._locationChanges=this._location.subscribe(()=>this.dispose())),this._outsideClickDispatcher.add(this),typeof e?.onDestroy=="function"&&e.onDestroy(()=>{this.hasAttached()&&this._ngZone.runOutsideAngular(()=>Promise.resolve().then(()=>this.detach()))}),e}detach(){if(!this.hasAttached())return;this.detachBackdrop(),this._togglePointerEvents(!1),this._positionStrategy&&this._positionStrategy.detach&&this._positionStrategy.detach(),this._scrollStrategy&&this._scrollStrategy.disable();let t=this._portalOutlet.detach();return this._detachments.next(),this._completeDetachContent(),this._keyboardDispatcher.remove(this),this._detachContentWhenEmpty(),this._locationChanges.unsubscribe(),this._outsideClickDispatcher.remove(this),t}dispose(){if(this._disposed)return;let t=this.hasAttached();this._positionStrategy&&this._positionStrategy.dispose(),this._disposeScrollStrategy(),this._backdropRef?.dispose(),this._locationChanges.unsubscribe(),this._keyboardDispatcher.remove(this),this._portalOutlet.dispose(),this._attachments.complete(),this._backdropClick.complete(),this._keydownEvents.complete(),this._outsidePointerEvents.complete(),this._outsideClickDispatcher.remove(this),this._host?.remove(),this._afterNextRenderRef?.destroy(),this._previousHostParent=this._pane=this._host=this._backdropRef=null,t&&this._detachments.next(),this._detachments.complete(),this._completeDetachContent(),this._disposed=!0}hasAttached(){return this._portalOutlet.hasAttached()}backdropClick(){return this._backdropClick}attachments(){return this._attachments}detachments(){return this._detachments}keydownEvents(){return this._keydownEvents}outsidePointerEvents(){return this._outsidePointerEvents}getConfig(){return this._config}updatePosition(){this._positionStrategy&&this._positionStrategy.apply()}updatePositionStrategy(t){t!==this._positionStrategy&&(this._positionStrategy&&this._positionStrategy.dispose(),this._positionStrategy=t,this.hasAttached()&&(t.attach(this),this.updatePosition()))}updateSize(t){this._config=b(b({},this._config),t),this._updateElementSize()}setDirection(t){this._config=$(b({},this._config),{direction:t}),this._updateElementDirection()}addPanelClass(t){this._pane&&this._toggleClasses(this._pane,t,!0)}removePanelClass(t){this._pane&&this._toggleClasses(this._pane,t,!1)}getDirection(){let t=this._config.direction;return t?typeof t=="string"?t:t.value:"ltr"}updateScrollStrategy(t){t!==this._scrollStrategy&&(this._disposeScrollStrategy(),this._scrollStrategy=t,this.hasAttached()&&(t.attach(this),t.enable()))}_updateElementDirection(){this._host.setAttribute("dir",this.getDirection())}_updateElementSize(){if(!this._pane)return;let t=this._pane.style;t.width=mt(this._config.width),t.height=mt(this._config.height),t.minWidth=mt(this._config.minWidth),t.minHeight=mt(this._config.minHeight),t.maxWidth=mt(this._config.maxWidth),t.maxHeight=mt(this._config.maxHeight)}_togglePointerEvents(t){this._pane.style.pointerEvents=t?"":"none"}_attachHost(){if(!this._host.parentElement){let t=this._config.usePopover?this._positionStrategy?.getPopoverInsertionPoint?.():null;Nb(t)?t.after(this._host):t?.type==="parent"?t.element.appendChild(this._host):this._previousHostParent?.appendChild(this._host)}if(this._config.usePopover)try{this._host.showPopover()}catch{}}_attachBackdrop(){let t="cdk-overlay-backdrop-showing";this._backdropRef?.dispose(),this._backdropRef=new Pb(this._document,this._renderer,this._ngZone,e=>{this._backdropClick.next(e)}),this._animationsDisabled&&this._backdropRef.element.classList.add("cdk-overlay-backdrop-noop-animation"),this._config.backdropClass&&this._toggleClasses(this._backdropRef.element,this._config.backdropClass,!0),this._config.usePopover?this._host.prepend(this._backdropRef.element):this._host.parentElement.insertBefore(this._backdropRef.element,this._host),!this._animationsDisabled&&typeof requestAnimationFrame<"u"?this._ngZone.runOutsideAngular(()=>{requestAnimationFrame(()=>this._backdropRef?.element.classList.add(t))}):this._backdropRef.element.classList.add(t)}_updateStackingOrder(){!this._config.usePopover&&this._host.nextSibling&&this._host.parentNode.appendChild(this._host)}detachBackdrop(){this._animationsDisabled?(this._backdropRef?.dispose(),this._backdropRef=null):this._backdropRef?.detach()}_toggleClasses(t,e,i){let r=La(e||[]).filter(o=>!!o);r.length&&(i?t.classList.add(...r):t.classList.remove(...r))}_detachContentWhenEmpty(){let t=!1;try{this._detachContentAfterRenderRef=xt(()=>{t=!0,this._detachContent()},{injector:this._injector})}catch(e){if(t)throw e;this._detachContent()}globalThis.MutationObserver&&this._pane&&(this._detachContentMutationObserver||=new globalThis.MutationObserver(()=>{this._detachContent()}),this._detachContentMutationObserver.observe(this._pane,{childList:!0}))}_detachContent(){(!this._pane||!this._host||this._pane.children.length===0)&&(this._pane&&this._config.panelClass&&this._toggleClasses(this._pane,this._config.panelClass,!1),this._host&&this._host.parentElement&&(this._previousHostParent=this._host.parentElement,this._host.remove()),this._completeDetachContent())}_completeDetachContent(){this._detachContentAfterRenderRef?.destroy(),this._detachContentAfterRenderRef=void 0,this._detachContentMutationObserver?.disconnect()}_disposeScrollStrategy(){let t=this._scrollStrategy;t?.disable(),t?.detach?.()}},sM="cdk-overlay-connected-position-bounding-box",BV=/([A-Za-z%]+)$/;function Cs(n,t){return new eh(t,n.get(ai),n.get(he),n.get(ze),n.get(yM))}var eh=class{_viewportRuler;_document;_platform;_overlayContainer;_overlayRef;_isInitialRender=!1;_lastBoundingBoxSize={width:0,height:0};_isPushed=!1;_canPush=!0;_growAfterOpen=!1;_hasFlexibleDimensions=!0;_positionLocked=!1;_originRect;_overlayRect;_viewportRect;_containerRect;_viewportMargin=0;_scrollables=[];_preferredPositions=[];_origin;_pane;_isDisposed=!1;_boundingBox=null;_lastPosition=null;_lastScrollVisibility=null;_positionChanges=new E;_resizeSubscription=Z.EMPTY;_offsetX=0;_offsetY=0;_transformOriginSelector;_appliedPanelClasses=[];_previousPushAmount=null;_popoverLocation="global";positionChanges=this._positionChanges;get positions(){return this._preferredPositions}constructor(t,e,i,r,o){this._viewportRuler=e,this._document=i,this._platform=r,this._overlayContainer=o,this.setOrigin(t)}attach(t){this._overlayRef&&this._overlayRef,this._validatePositions(),t.hostElement.classList.add(sM),this._overlayRef=t,this._boundingBox=t.hostElement,this._pane=t.overlayElement,this._isDisposed=!1,this._isInitialRender=!0,this._lastPosition=null,this._resizeSubscription.unsubscribe(),this._resizeSubscription=this._viewportRuler.change().subscribe(()=>{this._isInitialRender=!0,this.apply()})}apply(){if(this._isDisposed||!this._platform.isBrowser)return;if(!this._isInitialRender&&this._positionLocked&&this._lastPosition){this.reapplyLastPosition();return}this._clearPanelClasses(),this._resetOverlayElementStyles(),this._resetBoundingBoxStyles(),this._viewportRect=this._getNarrowedViewportRect(),this._originRect=this._getOriginRect(),this._overlayRect=this._pane.getBoundingClientRect(),this._containerRect=this._getContainerRect();let t=this._originRect,e=this._overlayRect,i=this._viewportRect,r=this._containerRect,o=[],s;for(let a of this._preferredPositions){let l=this._getOriginPoint(t,r,a),c=this._getOverlayPoint(l,e,a),d=this._getOverlayFit(c,e,i,a);if(d.isCompletelyWithinViewport){this._isPushed=!1,this._applyPosition(a,l);return}if(this._canFitWithFlexibleDimensions(d,c,i)){o.push({position:a,origin:l,overlayRect:e,boundingBoxRect:this._calculateBoundingBoxRect(l,a)});continue}(!s||s.overlayFit.visibleArea<d.visibleArea)&&(s={overlayFit:d,overlayPoint:c,originPoint:l,position:a,overlayRect:e})}if(o.length){let a=null,l=-1;for(let c of o){let d=c.boundingBoxRect.width*c.boundingBoxRect.height*(c.position.weight||1);d>l&&(l=d,a=c)}this._isPushed=!1,this._applyPosition(a.position,a.origin);return}if(this._canPush){this._isPushed=!0,this._applyPosition(s.position,s.originPoint);return}this._applyPosition(s.position,s.originPoint)}detach(){this._clearPanelClasses(),this._lastPosition=null,this._previousPushAmount=null,this._resizeSubscription.unsubscribe()}dispose(){this._isDisposed||(this._boundingBox&&_s(this._boundingBox.style,{top:"",left:"",right:"",bottom:"",height:"",width:"",alignItems:"",justifyContent:""}),this._pane&&this._resetOverlayElementStyles(),this._overlayRef&&this._overlayRef.hostElement.classList.remove(sM),this.detach(),this._positionChanges.complete(),this._overlayRef=this._boundingBox=null,this._isDisposed=!0)}reapplyLastPosition(){if(this._isDisposed||!this._platform.isBrowser)return;let t=this._lastPosition;t?(this._originRect=this._getOriginRect(),this._overlayRect=this._pane.getBoundingClientRect(),this._viewportRect=this._getNarrowedViewportRect(),this._containerRect=this._getContainerRect(),this._applyPosition(t,this._getOriginPoint(this._originRect,this._containerRect,t))):this.apply()}withScrollableContainers(t){return this._scrollables=t,this}withPositions(t){return this._preferredPositions=t,t.indexOf(this._lastPosition)===-1&&(this._lastPosition=null),this._validatePositions(),this}withViewportMargin(t){return this._viewportMargin=t,this}withFlexibleDimensions(t=!0){return this._hasFlexibleDimensions=t,this}withGrowAfterOpen(t=!0){return this._growAfterOpen=t,this}withPush(t=!0){return this._canPush=t,this}withLockedPosition(t=!0){return this._positionLocked=t,this}setOrigin(t){return this._origin=t,this}withDefaultOffsetX(t){return this._offsetX=t,this}withDefaultOffsetY(t){return this._offsetY=t,this}withTransformOriginOn(t){return this._transformOriginSelector=t,this}withPopoverLocation(t){return this._popoverLocation=t,this}getPopoverInsertionPoint(){return this._popoverLocation==="global"?null:this._popoverLocation!=="inline"?this._popoverLocation:this._origin instanceof Q?this._origin.nativeElement:Nb(this._origin)?this._origin:null}_getOriginPoint(t,e,i){let r;if(i.originX=="center")r=t.left+t.width/2;else{let s=this._isRtl()?t.right:t.left,a=this._isRtl()?t.left:t.right;r=i.originX=="start"?s:a}e.left<0&&(r-=e.left);let o;return i.originY=="center"?o=t.top+t.height/2:o=i.originY=="top"?t.top:t.bottom,e.top<0&&(o-=e.top),{x:r,y:o}}_getOverlayPoint(t,e,i){let r;i.overlayX=="center"?r=-e.width/2:i.overlayX==="start"?r=this._isRtl()?-e.width:0:r=this._isRtl()?0:-e.width;let o;return i.overlayY=="center"?o=-e.height/2:o=i.overlayY=="top"?0:-e.height,{x:t.x+r,y:t.y+o}}_getOverlayFit(t,e,i,r){let o=lM(e),{x:s,y:a}=t,l=this._getOffset(r,"x"),c=this._getOffset(r,"y");l&&(s+=l),c&&(a+=c);let d=0-s,u=s+o.width-i.width,p=0-a,g=a+o.height-i.height,_=this._subtractOverflows(o.width,d,u),S=this._subtractOverflows(o.height,p,g),O=_*S;return{visibleArea:O,isCompletelyWithinViewport:o.width*o.height===O,fitsInViewportVertically:S===o.height,fitsInViewportHorizontally:_==o.width}}_canFitWithFlexibleDimensions(t,e,i){if(this._hasFlexibleDimensions){let r=i.bottom-e.y,o=i.right-e.x,s=aM(this._overlayRef.getConfig().minHeight),a=aM(this._overlayRef.getConfig().minWidth),l=t.fitsInViewportVertically||s!=null&&s<=r,c=t.fitsInViewportHorizontally||a!=null&&a<=o;return l&&c}return!1}_pushOverlayOnScreen(t,e,i){if(this._previousPushAmount&&this._positionLocked)return{x:t.x+this._previousPushAmount.x,y:t.y+this._previousPushAmount.y};let r=lM(e),o=this._viewportRect,s=Math.max(t.x+r.width-o.width,0),a=Math.max(t.y+r.height-o.height,0),l=Math.max(o.top-i.top-t.y,0),c=Math.max(o.left-i.left-t.x,0),d=0,u=0;return r.width<=o.width?d=c||-s:d=t.x<this._getViewportMarginStart()?o.left-i.left-t.x:0,r.height<=o.height?u=l||-a:u=t.y<this._getViewportMarginTop()?o.top-i.top-t.y:0,this._previousPushAmount={x:d,y:u},{x:t.x+d,y:t.y+u}}_applyPosition(t,e){if(this._setTransformOrigin(t),this._setOverlayElementStyles(e,t),this._setBoundingBoxStyles(e,t),t.panelClass&&this._addPanelClasses(t.panelClass),this._positionChanges.observers.length){let i=this._getScrollVisibility();if(t!==this._lastPosition||!this._lastScrollVisibility||!jV(this._lastScrollVisibility,i)){let r=new Qp(t,i);this._positionChanges.next(r)}this._lastScrollVisibility=i}this._lastPosition=t,this._isInitialRender=!1}_setTransformOrigin(t){if(!this._transformOriginSelector)return;let e=this._boundingBox.querySelectorAll(this._transformOriginSelector),i,r=t.overlayY;t.overlayX==="center"?i="center":this._isRtl()?i=t.overlayX==="start"?"right":"left":i=t.overlayX==="start"?"left":"right";for(let o=0;o<e.length;o++)e[o].style.transformOrigin=`${i} ${r}`}_calculateBoundingBoxRect(t,e){let i=this._viewportRect,r=this._isRtl(),o,s,a;if(e.overlayY==="top")s=t.y,o=i.height-s+this._getViewportMarginBottom();else if(e.overlayY==="bottom")a=i.height-t.y+this._getViewportMarginTop()+this._getViewportMarginBottom(),o=i.height-a+this._getViewportMarginTop();else{let g=Math.min(i.bottom-t.y+i.top,t.y),_=this._lastBoundingBoxSize.height;o=g*2,s=t.y-g,o>_&&!this._isInitialRender&&!this._growAfterOpen&&(s=t.y-_/2)}let l=e.overlayX==="start"&&!r||e.overlayX==="end"&&r,c=e.overlayX==="end"&&!r||e.overlayX==="start"&&r,d,u,p;if(c)p=i.width-t.x+this._getViewportMarginStart()+this._getViewportMarginEnd(),d=t.x-this._getViewportMarginStart();else if(l)u=t.x,d=i.right-t.x-this._getViewportMarginEnd();else{let g=Math.min(i.right-t.x+i.left,t.x),_=this._lastBoundingBoxSize.width;d=g*2,u=t.x-g,d>_&&!this._isInitialRender&&!this._growAfterOpen&&(u=t.x-_/2)}return{top:s,left:u,bottom:a,right:p,width:d,height:o}}_setBoundingBoxStyles(t,e){let i=this._calculateBoundingBoxRect(t,e);!this._isInitialRender&&!this._growAfterOpen&&(i.height=Math.min(i.height,this._lastBoundingBoxSize.height),i.width=Math.min(i.width,this._lastBoundingBoxSize.width));let r={};if(this._hasExactPosition())r.top=r.left="0",r.bottom=r.right="auto",r.maxHeight=r.maxWidth="",r.width=r.height="100%";else{let o=this._overlayRef.getConfig().maxHeight,s=this._overlayRef.getConfig().maxWidth;r.width=mt(i.width),r.height=mt(i.height),r.top=mt(i.top)||"auto",r.bottom=mt(i.bottom)||"auto",r.left=mt(i.left)||"auto",r.right=mt(i.right)||"auto",e.overlayX==="center"?r.alignItems="center":r.alignItems=e.overlayX==="end"?"flex-end":"flex-start",e.overlayY==="center"?r.justifyContent="center":r.justifyContent=e.overlayY==="bottom"?"flex-end":"flex-start",o&&(r.maxHeight=mt(o)),s&&(r.maxWidth=mt(s))}this._lastBoundingBoxSize=i,_s(this._boundingBox.style,r)}_resetBoundingBoxStyles(){_s(this._boundingBox.style,{top:"0",left:"0",right:"0",bottom:"0",height:"",width:"",alignItems:"",justifyContent:""})}_resetOverlayElementStyles(){_s(this._pane.style,{top:"",left:"",bottom:"",right:"",position:"",transform:""})}_setOverlayElementStyles(t,e){let i={},r=this._hasExactPosition(),o=this._hasFlexibleDimensions,s=this._overlayRef.getConfig();if(r){let d=this._viewportRuler.getViewportScrollPosition();_s(i,this._getExactOverlayY(e,t,d)),_s(i,this._getExactOverlayX(e,t,d))}else i.position="static";let a="",l=this._getOffset(e,"x"),c=this._getOffset(e,"y");l&&(a+=`translateX(${l}px) `),c&&(a+=`translateY(${c}px)`),i.transform=a.trim(),s.maxHeight&&(r?i.maxHeight=mt(s.maxHeight):o&&(i.maxHeight="")),s.maxWidth&&(r?i.maxWidth=mt(s.maxWidth):o&&(i.maxWidth="")),_s(this._pane.style,i)}_getExactOverlayY(t,e,i){let r={top:"",bottom:""},o=this._getOverlayPoint(e,this._overlayRect,t);if(this._isPushed&&(o=this._pushOverlayOnScreen(o,this._overlayRect,i)),t.overlayY==="bottom"){let s=this._document.documentElement.clientHeight;r.bottom=`${s-(o.y+this._overlayRect.height)}px`}else r.top=mt(o.y);return r}_getExactOverlayX(t,e,i){let r={left:"",right:""},o=this._getOverlayPoint(e,this._overlayRect,t);this._isPushed&&(o=this._pushOverlayOnScreen(o,this._overlayRect,i));let s;if(this._isRtl()?s=t.overlayX==="end"?"left":"right":s=t.overlayX==="end"?"right":"left",s==="right"){let a=this._document.documentElement.clientWidth;r.right=`${a-(o.x+this._overlayRect.width)}px`}else r.left=mt(o.x);return r}_getScrollVisibility(){let t=this._getOriginRect(),e=this._pane.getBoundingClientRect(),i=this._scrollables.map(r=>r.getElementRef().nativeElement.getBoundingClientRect());return{isOriginClipped:rM(t,i),isOriginOutsideView:Rb(t,i),isOverlayClipped:rM(e,i),isOverlayOutsideView:Rb(e,i)}}_subtractOverflows(t,...e){return e.reduce((i,r)=>i-Math.max(r,0),t)}_getNarrowedViewportRect(){let t=this._document.documentElement.clientWidth,e=this._document.documentElement.clientHeight,i=this._viewportRuler.getViewportScrollPosition();return{top:i.top+this._getViewportMarginTop(),left:i.left+this._getViewportMarginStart(),right:i.left+t-this._getViewportMarginEnd(),bottom:i.top+e-this._getViewportMarginBottom(),width:t-this._getViewportMarginStart()-this._getViewportMarginEnd(),height:e-this._getViewportMarginTop()-this._getViewportMarginBottom()}}_isRtl(){return this._overlayRef.getDirection()==="rtl"}_hasExactPosition(){return!this._hasFlexibleDimensions||this._isPushed}_getOffset(t,e){return e==="x"?t.offsetX==null?this._offsetX:t.offsetX:t.offsetY==null?this._offsetY:t.offsetY}_validatePositions(){}_addPanelClasses(t){this._pane&&La(t).forEach(e=>{e!==""&&this._appliedPanelClasses.indexOf(e)===-1&&(this._appliedPanelClasses.push(e),this._pane.classList.add(e))})}_clearPanelClasses(){this._pane&&(this._appliedPanelClasses.forEach(t=>{this._pane.classList.remove(t)}),this._appliedPanelClasses=[])}_getViewportMarginStart(){return typeof this._viewportMargin=="number"?this._viewportMargin:this._viewportMargin?.start??0}_getViewportMarginEnd(){return typeof this._viewportMargin=="number"?this._viewportMargin:this._viewportMargin?.end??0}_getViewportMarginTop(){return typeof this._viewportMargin=="number"?this._viewportMargin:this._viewportMargin?.top??0}_getViewportMarginBottom(){return typeof this._viewportMargin=="number"?this._viewportMargin:this._viewportMargin?.bottom??0}_getOriginRect(){let t=this._origin;if(t instanceof Q)return t.nativeElement.getBoundingClientRect();if(t instanceof Element)return t.getBoundingClientRect();let e=t.width||0,i=t.height||0;return{top:t.y,bottom:t.y+i,left:t.x,right:t.x+e,height:i,width:e}}_getContainerRect(){let t=this._overlayRef.getConfig().usePopover&&this._popoverLocation!=="global",e=this._overlayContainer.getContainerElement();t&&(e.style.display="block");let i=e.getBoundingClientRect();return t&&(e.style.display=""),i}};function _s(n,t){for(let e in t)t.hasOwnProperty(e)&&(n[e]=t[e]);return n}function aM(n){if(typeof n!="number"&&n!=null){let[t,e]=n.split(BV);return!e||e==="px"?parseFloat(t):null}return n||null}function lM(n){return{top:Math.floor(n.top),right:Math.floor(n.right),bottom:Math.floor(n.bottom),left:Math.floor(n.left),width:Math.floor(n.width),height:Math.floor(n.height)}}function jV(n,t){return n===t?!0:n.isOriginClipped===t.isOriginClipped&&n.isOriginOutsideView===t.isOriginOutsideView&&n.isOverlayClipped===t.isOverlayClipped&&n.isOverlayOutsideView===t.isOverlayOutsideView}var cM="cdk-global-overlay-wrapper";function vM(n){return new th}var th=class{_overlayRef;_cssPosition="static";_topOffset="";_bottomOffset="";_alignItems="";_xPosition="";_xOffset="";_width="";_height="";_isDisposed=!1;attach(t){let e=t.getConfig();this._overlayRef=t,this._width&&!e.width&&t.updateSize({width:this._width}),this._height&&!e.height&&t.updateSize({height:this._height}),t.hostElement.classList.add(cM),this._isDisposed=!1}top(t=""){return this._bottomOffset="",this._topOffset=t,this._alignItems="flex-start",this}left(t=""){return this._xOffset=t,this._xPosition="left",this}bottom(t=""){return this._topOffset="",this._bottomOffset=t,this._alignItems="flex-end",this}right(t=""){return this._xOffset=t,this._xPosition="right",this}start(t=""){return this._xOffset=t,this._xPosition="start",this}end(t=""){return this._xOffset=t,this._xPosition="end",this}width(t=""){return this._overlayRef?this._overlayRef.updateSize({width:t}):this._width=t,this}height(t=""){return this._overlayRef?this._overlayRef.updateSize({height:t}):this._height=t,this}centerHorizontally(t=""){return this.left(t),this._xPosition="center",this}centerVertically(t=""){return this.top(t),this._alignItems="center",this}apply(){if(!this._overlayRef||!this._overlayRef.hasAttached())return;let t=this._overlayRef.overlayElement.style,e=this._overlayRef.hostElement.style,i=this._overlayRef.getConfig(),{width:r,height:o,maxWidth:s,maxHeight:a}=i,l=(r==="100%"||r==="100vw")&&(!s||s==="100%"||s==="100vw"),c=(o==="100%"||o==="100vh")&&(!a||a==="100%"||a==="100vh"),d=this._xPosition,u=this._xOffset,p=this._overlayRef.getConfig().direction==="rtl",g="",_="",S="";l?S="flex-start":d==="center"?(S="center",p?_=u:g=u):p?d==="left"||d==="end"?(S="flex-end",g=u):(d==="right"||d==="start")&&(S="flex-start",_=u):d==="left"||d==="start"?(S="flex-start",g=u):(d==="right"||d==="end")&&(S="flex-end",_=u),t.position=this._cssPosition,t.marginLeft=l?"0":g,t.marginTop=c?"0":this._topOffset,t.marginBottom=this._bottomOffset,t.marginRight=l?"0":_,e.justifyContent=S,e.alignItems=c?"flex-start":this._alignItems}dispose(){if(this._isDisposed||!this._overlayRef)return;let t=this._overlayRef.overlayElement.style,e=this._overlayRef.hostElement,i=e.style;e.classList.remove(cM),i.justifyContent=i.alignItems=t.marginTop=t.marginBottom=t.marginLeft=t.marginRight=t.position="",this._overlayRef=null,this._isDisposed=!0}},_M=(()=>{class n{_injector=f(le);constructor(){}global(){return vM()}flexibleConnectedTo(e){return Cs(this._injector,e)}static \u0275fac=function(i){return new(i||n)};static \u0275prov=D({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})(),id=new C("OVERLAY_DEFAULT_CONFIG");function Ds(n,t){n.get(wn).load(gM);let e=n.get(yM),i=n.get(he),r=n.get(Xt),o=n.get(rn),s=n.get(jt),a=n.get(vt,null,{optional:!0})||n.get(Wt).createRenderer(null,null),l=new bs(t),c=n.get(id,null,{optional:!0})?.usePopover??!0;l.direction=l.direction||s.value,"showPopover"in i.body?l.usePopover=t?.usePopover??c:l.usePopover=!1;let d=i.createElement("div"),u=i.createElement("div");d.id=r.getId("cdk-overlay-"),d.classList.add("cdk-overlay-pane"),u.appendChild(d),l.usePopover&&(u.setAttribute("popover","manual"),u.classList.add("cdk-overlay-popover"));let p=l.usePopover?l.positionStrategy?.getPopoverInsertionPoint?.():null;return Nb(p)?p.after(u):p?.type==="parent"?p.element.appendChild(u):e.getContainerElement().appendChild(u),new Jp(new td(d,o,n),u,d,l,n.get(U),n.get(hM),i,n.get(br),n.get(mM),t?.disableAnimations??n.get(Wl,null,{optional:!0})==="NoopAnimations",n.get(We),a)}var bM=(()=>{class n{scrollStrategies=f(fM);_positionBuilder=f(_M);_injector=f(le);constructor(){}create(e){return Ds(this._injector,e)}position(){return this._positionBuilder}static \u0275fac=function(i){return new(i||n)};static \u0275prov=D({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})(),UV=[{originX:"start",originY:"bottom",overlayX:"start",overlayY:"top"},{originX:"start",originY:"top",overlayX:"start",overlayY:"bottom"},{originX:"end",originY:"top",overlayX:"end",overlayY:"bottom"},{originX:"end",originY:"bottom",overlayX:"end",overlayY:"top"}],HV=new C("cdk-connected-overlay-scroll-strategy",{providedIn:"root",factory:()=>{let n=f(le);return()=>Ar(n)}}),Ha=(()=>{class n{elementRef=f(Q);constructor(){}static \u0275fac=function(i){return new(i||n)};static \u0275dir=ie({type:n,selectors:[["","cdk-overlay-origin",""],["","overlay-origin",""],["","cdkOverlayOrigin",""]],exportAs:["cdkOverlayOrigin"]})}return n})(),CM=new C("cdk-connected-overlay-default-config"),nh=(()=>{class n{_dir=f(jt,{optional:!0});_injector=f(le);_overlayRef;_templatePortal;_backdropSubscription=Z.EMPTY;_attachSubscription=Z.EMPTY;_detachSubscription=Z.EMPTY;_positionSubscription=Z.EMPTY;_offsetX;_offsetY;_position;_scrollStrategyFactory=f(HV);_ngZone=f(U);origin;positions;positionStrategy;get offsetX(){return this._offsetX}set offsetX(e){this._offsetX=e,this._position&&this._updatePositionStrategy(this._position)}get offsetY(){return this._offsetY}set offsetY(e){this._offsetY=e,this._position&&this._updatePositionStrategy(this._position)}width;height;minWidth;minHeight;backdropClass;panelClass;viewportMargin=0;scrollStrategy;open=!1;disableClose=!1;transformOriginSelector;hasBackdrop=!1;lockPosition=!1;flexibleDimensions=!1;growAfterOpen=!1;push=!1;disposeOnNavigation=!1;usePopover;matchWidth=!1;set _config(e){typeof e!="string"&&this._assignConfig(e)}backdropClick=new j;positionChange=new j;attach=new j;detach=new j;overlayKeydown=new j;overlayOutsideClick=new j;constructor(){let e=f(Mt),i=f(pt),r=f(CM,{optional:!0}),o=f(id,{optional:!0});this.usePopover=o?.usePopover===!1?null:"global",this._templatePortal=new qi(e,i),this.scrollStrategy=this._scrollStrategyFactory(),r&&this._assignConfig(r)}get overlayRef(){return this._overlayRef}get dir(){return this._dir?this._dir.value:"ltr"}ngOnDestroy(){this._attachSubscription.unsubscribe(),this._detachSubscription.unsubscribe(),this._backdropSubscription.unsubscribe(),this._positionSubscription.unsubscribe(),this._overlayRef?.dispose()}ngOnChanges(e){this._position&&(this._updatePositionStrategy(this._position),this._overlayRef?.updateSize({width:this._getWidth(),minWidth:this.minWidth,height:this.height,minHeight:this.minHeight}),e.origin&&this.open&&this._position.apply()),e.open&&(this.open?this.attachOverlay():this.detachOverlay())}_createOverlay(){(!this.positions||!this.positions.length)&&(this.positions=UV);let e=this._overlayRef=Ds(this._injector,this._buildConfig());this._attachSubscription=e.attachments().subscribe(()=>this.attach.emit()),this._detachSubscription=e.detachments().subscribe(()=>this.detach.emit()),e.keydownEvents().subscribe(i=>{this.overlayKeydown.next(i),i.keyCode===27&&!this.disableClose&&!Zt(i)&&(i.preventDefault(),this.detachOverlay())}),this._overlayRef.outsidePointerEvents().subscribe(i=>{let r=this._getOriginElement(),o=un(i);(!r||r!==o&&!r.contains(o))&&this.overlayOutsideClick.next(i)})}_buildConfig(){let e=this._position=this.positionStrategy||this._createPositionStrategy(),i=new bs({direction:this._dir||"ltr",positionStrategy:e,scrollStrategy:this.scrollStrategy,hasBackdrop:this.hasBackdrop,disposeOnNavigation:this.disposeOnNavigation,usePopover:!!this.usePopover});return(this.height||this.height===0)&&(i.height=this.height),(this.minWidth||this.minWidth===0)&&(i.minWidth=this.minWidth),(this.minHeight||this.minHeight===0)&&(i.minHeight=this.minHeight),this.backdropClass&&(i.backdropClass=this.backdropClass),this.panelClass&&(i.panelClass=this.panelClass),i}_updatePositionStrategy(e){let i=this.positions.map(r=>({originX:r.originX,originY:r.originY,overlayX:r.overlayX,overlayY:r.overlayY,offsetX:r.offsetX||this.offsetX,offsetY:r.offsetY||this.offsetY,panelClass:r.panelClass||void 0}));return e.setOrigin(this._getOrigin()).withPositions(i).withFlexibleDimensions(this.flexibleDimensions).withPush(this.push).withGrowAfterOpen(this.growAfterOpen).withViewportMargin(this.viewportMargin).withLockedPosition(this.lockPosition).withTransformOriginOn(this.transformOriginSelector).withPopoverLocation(this.usePopover===null?"global":this.usePopover)}_createPositionStrategy(){let e=Cs(this._injector,this._getOrigin());return this._updatePositionStrategy(e),e}_getOrigin(){return this.origin instanceof Ha?this.origin.elementRef:this.origin}_getOriginElement(){return this.origin instanceof Ha?this.origin.elementRef.nativeElement:this.origin instanceof Q?this.origin.nativeElement:typeof Element<"u"&&this.origin instanceof Element?this.origin:null}_getWidth(){return this.width?this.width:this.matchWidth?this._getOriginElement()?.getBoundingClientRect?.().width:void 0}attachOverlay(){this._overlayRef||this._createOverlay();let e=this._overlayRef;e.getConfig().hasBackdrop=this.hasBackdrop,e.updateSize({width:this._getWidth()}),e.hasAttached()||e.attach(this._templatePortal),this.hasBackdrop?this._backdropSubscription=e.backdropClick().subscribe(i=>this.backdropClick.emit(i)):this._backdropSubscription.unsubscribe(),this._positionSubscription.unsubscribe(),this.positionChange.observers.length>0&&(this._positionSubscription=this._position.positionChanges.pipe(um(()=>this.positionChange.observers.length>0)).subscribe(i=>{this._ngZone.run(()=>this.positionChange.emit(i)),this.positionChange.observers.length===0&&this._positionSubscription.unsubscribe()})),this.open=!0}detachOverlay(){this._overlayRef?.detach(),this._backdropSubscription.unsubscribe(),this._positionSubscription.unsubscribe(),this.open=!1}_assignConfig(e){this.origin=e.origin??this.origin,this.positions=e.positions??this.positions,this.positionStrategy=e.positionStrategy??this.positionStrategy,this.offsetX=e.offsetX??this.offsetX,this.offsetY=e.offsetY??this.offsetY,this.width=e.width??this.width,this.height=e.height??this.height,this.minWidth=e.minWidth??this.minWidth,this.minHeight=e.minHeight??this.minHeight,this.backdropClass=e.backdropClass??this.backdropClass,this.panelClass=e.panelClass??this.panelClass,this.viewportMargin=e.viewportMargin??this.viewportMargin,this.scrollStrategy=e.scrollStrategy??this.scrollStrategy,this.disableClose=e.disableClose??this.disableClose,this.transformOriginSelector=e.transformOriginSelector??this.transformOriginSelector,this.hasBackdrop=e.hasBackdrop??this.hasBackdrop,this.lockPosition=e.lockPosition??this.lockPosition,this.flexibleDimensions=e.flexibleDimensions??this.flexibleDimensions,this.growAfterOpen=e.growAfterOpen??this.growAfterOpen,this.push=e.push??this.push,this.disposeOnNavigation=e.disposeOnNavigation??this.disposeOnNavigation,this.usePopover=e.usePopover??this.usePopover,this.matchWidth=e.matchWidth??this.matchWidth}static \u0275fac=function(i){return new(i||n)};static \u0275dir=ie({type:n,selectors:[["","cdk-connected-overlay",""],["","connected-overlay",""],["","cdkConnectedOverlay",""]],inputs:{origin:[0,"cdkConnectedOverlayOrigin","origin"],positions:[0,"cdkConnectedOverlayPositions","positions"],positionStrategy:[0,"cdkConnectedOverlayPositionStrategy","positionStrategy"],offsetX:[0,"cdkConnectedOverlayOffsetX","offsetX"],offsetY:[0,"cdkConnectedOverlayOffsetY","offsetY"],width:[0,"cdkConnectedOverlayWidth","width"],height:[0,"cdkConnectedOverlayHeight","height"],minWidth:[0,"cdkConnectedOverlayMinWidth","minWidth"],minHeight:[0,"cdkConnectedOverlayMinHeight","minHeight"],backdropClass:[0,"cdkConnectedOverlayBackdropClass","backdropClass"],panelClass:[0,"cdkConnectedOverlayPanelClass","panelClass"],viewportMargin:[0,"cdkConnectedOverlayViewportMargin","viewportMargin"],scrollStrategy:[0,"cdkConnectedOverlayScrollStrategy","scrollStrategy"],open:[0,"cdkConnectedOverlayOpen","open"],disableClose:[0,"cdkConnectedOverlayDisableClose","disableClose"],transformOriginSelector:[0,"cdkConnectedOverlayTransformOriginOn","transformOriginSelector"],hasBackdrop:[2,"cdkConnectedOverlayHasBackdrop","hasBackdrop",de],lockPosition:[2,"cdkConnectedOverlayLockPosition","lockPosition",de],flexibleDimensions:[2,"cdkConnectedOverlayFlexibleDimensions","flexibleDimensions",de],growAfterOpen:[2,"cdkConnectedOverlayGrowAfterOpen","growAfterOpen",de],push:[2,"cdkConnectedOverlayPush","push",de],disposeOnNavigation:[2,"cdkConnectedOverlayDisposeOnNavigation","disposeOnNavigation",de],usePopover:[0,"cdkConnectedOverlayUsePopover","usePopover"],matchWidth:[2,"cdkConnectedOverlayMatchWidth","matchWidth",de],_config:[0,"cdkConnectedOverlay","_config"]},outputs:{backdropClick:"backdropClick",positionChange:"positionChange",attach:"attach",detach:"detach",overlayKeydown:"overlayKeydown",overlayOutsideClick:"overlayOutsideClick"},exportAs:["cdkConnectedOverlay"],features:[It]})}return n})(),Es=(()=>{class n{static \u0275fac=function(i){return new(i||n)};static \u0275mod=De({type:n});static \u0275inj=be({providers:[bM],imports:[gt,nM,Qc,Qc]})}return n})();var $V=new C("MATERIAL_ANIMATIONS"),DM=null;function zV(){return f($V,{optional:!0})?.animationsDisabled||f(Wl,{optional:!0})==="NoopAnimations"?"di-disabled":(DM??=f(ja).matchMedia("(prefers-reduced-motion)").matches,DM?"reduced-motion":"enabled")}function Ot(){return zV()!=="enabled"}var WV=["tooltip"],GV=20;var qV=new C("mat-tooltip-scroll-strategy",{providedIn:"root",factory:()=>{let n=f(le);return()=>Ar(n,{scrollThrottle:GV})}}),KV=new C("mat-tooltip-default-options",{providedIn:"root",factory:()=>({showDelay:0,hideDelay:0,touchendHideDelay:1500})});var EM="tooltip-panel",YV={passive:!0},ZV=8,XV=8,QV=24,JV=200,fn=(()=>{class n{_elementRef=f(Q);_ngZone=f(U);_platform=f(ze);_ariaDescriber=f(KT);_focusMonitor=f(po);_dir=f(jt);_injector=f(le);_viewContainerRef=f(pt);_mediaMatcher=f(ja);_document=f(he);_renderer=f(vt);_animationsDisabled=Ot();_defaultOptions=f(KV,{optional:!0});_overlayRef=null;_tooltipInstance=null;_overlayPanelClass;_portal;_position="below";_positionAtOrigin=!1;_disabled=!1;_tooltipClass;_viewInitialized=!1;_pointerExitEventsInitialized=!1;_tooltipComponent=wM;_viewportMargin=8;_currentPosition;_cssClassPrefix="mat-mdc";_ariaDescriptionPending=!1;_dirSubscribed=!1;get position(){return this._position}set position(e){e!==this._position&&(this._position=e,this._overlayRef&&(this._updatePosition(this._overlayRef),this._tooltipInstance?.show(0),this._overlayRef.updatePosition()))}get positionAtOrigin(){return this._positionAtOrigin}set positionAtOrigin(e){this._positionAtOrigin=Uc(e),this._detach(),this._overlayRef=null}get disabled(){return this._disabled}set disabled(e){let i=Uc(e);this._disabled!==i&&(this._disabled=i,i?this.hide(0):this._setupPointerEnterEventsIfNeeded(),this._syncAriaDescription(this.message))}get showDelay(){return this._showDelay}set showDelay(e){this._showDelay=Ii(e)}_showDelay;get hideDelay(){return this._hideDelay}set hideDelay(e){this._hideDelay=Ii(e),this._tooltipInstance&&(this._tooltipInstance._mouseLeaveHideDelay=this._hideDelay)}_hideDelay;touchGestures="auto";get message(){return this._message}set message(e){let i=this._message;this._message=e!=null?String(e).trim():"",!this._message&&this._isTooltipVisible()?this.hide(0):(this._setupPointerEnterEventsIfNeeded(),this._updateTooltipMessage()),this._syncAriaDescription(i)}_message="";get tooltipClass(){return this._tooltipClass}set tooltipClass(e){this._tooltipClass=e,this._tooltipInstance&&this._setTooltipClass(this._tooltipClass)}_eventCleanups=[];_touchstartTimeout=null;_destroyed=new E;_isDestroyed=!1;constructor(){let e=this._defaultOptions;e&&(this._showDelay=e.showDelay,this._hideDelay=e.hideDelay,e.position&&(this.position=e.position),e.positionAtOrigin&&(this.positionAtOrigin=e.positionAtOrigin),e.touchGestures&&(this.touchGestures=e.touchGestures),e.tooltipClass&&(this.tooltipClass=e.tooltipClass)),this._viewportMargin=ZV}ngAfterViewInit(){this._viewInitialized=!0,this._setupPointerEnterEventsIfNeeded(),this._focusMonitor.monitor(this._elementRef).pipe(ne(this._destroyed)).subscribe(e=>{e?e==="keyboard"&&this._ngZone.run(()=>this.show()):this._ngZone.run(()=>this.hide(0))})}ngOnDestroy(){let e=this._elementRef.nativeElement;this._touchstartTimeout&&clearTimeout(this._touchstartTimeout),this._overlayRef&&(this._overlayRef.dispose(),this._tooltipInstance=null),this._eventCleanups.forEach(i=>i()),this._eventCleanups.length=0,this._destroyed.next(),this._destroyed.complete(),this._isDestroyed=!0,this._ariaDescriber.removeDescription(e,this.message,"tooltip"),this._focusMonitor.stopMonitoring(e)}show(e=this.showDelay,i){if(this.disabled||!this.message||this._isTooltipVisible()){this._tooltipInstance?._cancelPendingAnimations();return}let r=this._createOverlay(i);this._detach(),this._portal=this._portal||new ed(this._tooltipComponent,this._viewContainerRef);let o=this._tooltipInstance=r.attach(this._portal).instance;o._triggerElement=this._elementRef.nativeElement,o._mouseLeaveHideDelay=this._hideDelay,o.afterHidden().pipe(ne(this._destroyed)).subscribe(()=>this._detach()),this._setTooltipClass(this._tooltipClass),this._updateTooltipMessage(),o.show(e)}hide(e=this.hideDelay){let i=this._tooltipInstance;i&&(i.isVisible()?i.hide(e):(i._cancelPendingAnimations(),this._detach()))}toggle(e){this._isTooltipVisible()?this.hide():this.show(void 0,e)}_isTooltipVisible(){return!!this._tooltipInstance&&this._tooltipInstance.isVisible()}_createOverlay(e){if(this._overlayRef){let s=this._overlayRef.getConfig().positionStrategy;if((!this.positionAtOrigin||!e)&&s._origin instanceof Q)return this._overlayRef;this._detach()}let i=this._injector.get(mo).getAncestorScrollContainers(this._elementRef),r=`${this._cssClassPrefix}-${EM}`,o=Cs(this._injector,this.positionAtOrigin?e||this._elementRef:this._elementRef).withTransformOriginOn(`.${this._cssClassPrefix}-tooltip`).withFlexibleDimensions(!1).withViewportMargin(this._viewportMargin).withScrollableContainers(i).withPopoverLocation("global");return o.positionChanges.pipe(ne(this._destroyed)).subscribe(s=>{this._updateCurrentPositionClass(s.connectionPair),this._tooltipInstance&&s.scrollableViewProperties.isOverlayClipped&&this._tooltipInstance.isVisible()&&this._ngZone.run(()=>this.hide(0))}),this._overlayRef=Ds(this._injector,{direction:this._dir,positionStrategy:o,panelClass:this._overlayPanelClass?[...this._overlayPanelClass,r]:r,scrollStrategy:this._injector.get(qV)(),disableAnimations:this._animationsDisabled,eventPredicate:this._overlayEventPredicate}),this._updatePosition(this._overlayRef),this._overlayRef.detachments().pipe(ne(this._destroyed)).subscribe(()=>this._detach()),this._overlayRef.outsidePointerEvents().pipe(ne(this._destroyed)).subscribe(()=>this._tooltipInstance?._handleBodyInteraction()),this._overlayRef.keydownEvents().pipe(ne(this._destroyed)).subscribe(s=>{s.preventDefault(),s.stopPropagation(),this._ngZone.run(()=>this.hide(0))}),this._defaultOptions?.disableTooltipInteractivity&&this._overlayRef.addPanelClass(`${this._cssClassPrefix}-tooltip-panel-non-interactive`),this._dirSubscribed||(this._dirSubscribed=!0,this._dir.change.pipe(ne(this._destroyed)).subscribe(()=>{this._overlayRef&&this._updatePosition(this._overlayRef)})),this._overlayRef}_detach(){this._overlayRef&&this._overlayRef.hasAttached()&&this._overlayRef.detach(),this._tooltipInstance=null}_updatePosition(e){let i=e.getConfig().positionStrategy,r=this._getOrigin(),o=this._getOverlayPosition();i.withPositions([this._addOffset(b(b({},r.main),o.main)),this._addOffset(b(b({},r.fallback),o.fallback))])}_addOffset(e){let i=XV,r=!this._dir||this._dir.value=="ltr";return e.originY==="top"?e.offsetY=-i:e.originY==="bottom"?e.offsetY=i:e.originX==="start"?e.offsetX=r?-i:i:e.originX==="end"&&(e.offsetX=r?i:-i),e}_getOrigin(){let e=!this._dir||this._dir.value=="ltr",i=this.position,r;i=="above"||i=="below"?r={originX:"center",originY:i=="above"?"top":"bottom"}:i=="before"||i=="left"&&e||i=="right"&&!e?r={originX:"start",originY:"center"}:(i=="after"||i=="right"&&e||i=="left"&&!e)&&(r={originX:"end",originY:"center"});let{x:o,y:s}=this._invertPosition(r.originX,r.originY);return{main:r,fallback:{originX:o,originY:s}}}_getOverlayPosition(){let e=!this._dir||this._dir.value=="ltr",i=this.position,r;i=="above"?r={overlayX:"center",overlayY:"bottom"}:i=="below"?r={overlayX:"center",overlayY:"top"}:i=="before"||i=="left"&&e||i=="right"&&!e?r={overlayX:"end",overlayY:"center"}:(i=="after"||i=="right"&&e||i=="left"&&!e)&&(r={overlayX:"start",overlayY:"center"});let{x:o,y:s}=this._invertPosition(r.overlayX,r.overlayY);return{main:r,fallback:{overlayX:o,overlayY:s}}}_updateTooltipMessage(){this._tooltipInstance&&(this._tooltipInstance.message=this.message,this._tooltipInstance._markForCheck(),xt(()=>{this._tooltipInstance&&this._overlayRef.updatePosition()},{injector:this._injector}))}_setTooltipClass(e){this._tooltipInstance&&(this._tooltipInstance.tooltipClass=e instanceof Set?Array.from(e):e,this._tooltipInstance._markForCheck())}_invertPosition(e,i){return this.position==="above"||this.position==="below"?i==="top"?i="bottom":i==="bottom"&&(i="top"):e==="end"?e="start":e==="start"&&(e="end"),{x:e,y:i}}_updateCurrentPositionClass(e){let{overlayY:i,originX:r,originY:o}=e,s;if(i==="center"?this._dir&&this._dir.value==="rtl"?s=r==="end"?"left":"right":s=r==="start"?"left":"right":s=i==="bottom"&&o==="top"?"above":"below",s!==this._currentPosition){let a=this._overlayRef;if(a){let l=`${this._cssClassPrefix}-${EM}-`;a.removePanelClass(l+this._currentPosition),a.addPanelClass(l+s)}this._currentPosition=s}}_setupPointerEnterEventsIfNeeded(){this._disabled||!this.message||!this._viewInitialized||this._eventCleanups.length||(this._isTouchPlatform()?this.touchGestures!=="off"&&(this._disableNativeGesturesIfNecessary(),this._addListener("touchstart",e=>{let i=e.targetTouches?.[0],r=i?{x:i.clientX,y:i.clientY}:void 0;this._setupPointerExitEventsIfNeeded(),this._touchstartTimeout&&clearTimeout(this._touchstartTimeout);let o=500;this._touchstartTimeout=setTimeout(()=>{this._touchstartTimeout=null,this.show(void 0,r)},this._defaultOptions?.touchLongPressShowDelay??o)})):this._addListener("mouseenter",e=>{this._setupPointerExitEventsIfNeeded();let i;e.x!==void 0&&e.y!==void 0&&(i=e),this.show(void 0,i)}))}_setupPointerExitEventsIfNeeded(){if(!this._pointerExitEventsInitialized){if(this._pointerExitEventsInitialized=!0,!this._isTouchPlatform())this._addListener("mouseleave",e=>{let i=e.relatedTarget;(!i||!this._overlayRef?.overlayElement.contains(i))&&this.hide()}),this._addListener("wheel",e=>{if(this._isTooltipVisible()){let i=this._document.elementFromPoint(e.clientX,e.clientY),r=this._elementRef.nativeElement;i!==r&&!r.contains(i)&&this.hide()}});else if(this.touchGestures!=="off"){this._disableNativeGesturesIfNecessary();let e=()=>{this._touchstartTimeout&&clearTimeout(this._touchstartTimeout),this.hide(this._defaultOptions?.touchendHideDelay)};this._addListener("touchend",e),this._addListener("touchcancel",e)}}}_addListener(e,i){this._eventCleanups.push(this._renderer.listen(this._elementRef.nativeElement,e,i,YV))}_isTouchPlatform(){let e=this._defaultOptions?.detectHoverCapability;return typeof e=="function"?!e():this._platform.IOS||this._platform.ANDROID?!0:this._platform.isBrowser?!!e&&this._mediaMatcher.matchMedia("(any-hover: none)").matches:!1}_disableNativeGesturesIfNecessary(){let e=this.touchGestures;if(e!=="off"){let i=this._elementRef.nativeElement,r=i.style;(e==="on"||i.nodeName!=="INPUT"&&i.nodeName!=="TEXTAREA")&&(r.userSelect=r.msUserSelect=r.webkitUserSelect=r.MozUserSelect="none"),(e==="on"||!i.draggable)&&(r.webkitUserDrag="none"),r.touchAction="none",r.webkitTapHighlightColor="transparent"}}_syncAriaDescription(e){this._ariaDescriptionPending||(this._ariaDescriptionPending=!0,this._ariaDescriber.removeDescription(this._elementRef.nativeElement,e,"tooltip"),this._isDestroyed||xt({write:()=>{this._ariaDescriptionPending=!1,this.message&&!this.disabled&&this._ariaDescriber.describe(this._elementRef.nativeElement,this.message,"tooltip")}},{injector:this._injector}))}_overlayEventPredicate=e=>e.type==="keydown"?this._isTooltipVisible()&&e.keyCode===27&&!Zt(e):!0;static \u0275fac=function(i){return new(i||n)};static \u0275dir=ie({type:n,selectors:[["","matTooltip",""]],hostAttrs:[1,"mat-mdc-tooltip-trigger"],hostVars:2,hostBindings:function(i,r){i&2&&ce("mat-mdc-tooltip-disabled",r.disabled)},inputs:{position:[0,"matTooltipPosition","position"],positionAtOrigin:[0,"matTooltipPositionAtOrigin","positionAtOrigin"],disabled:[0,"matTooltipDisabled","disabled"],showDelay:[0,"matTooltipShowDelay","showDelay"],hideDelay:[0,"matTooltipHideDelay","hideDelay"],touchGestures:[0,"matTooltipTouchGestures","touchGestures"],message:[0,"matTooltip","message"],tooltipClass:[0,"matTooltipClass","tooltipClass"]},exportAs:["matTooltip"]})}return n})(),wM=(()=>{class n{_changeDetectorRef=f(tt);_elementRef=f(Q);_isMultiline=!1;message;tooltipClass;_showTimeoutId;_hideTimeoutId;_triggerElement;_mouseLeaveHideDelay;_animationsDisabled=Ot();_tooltip;_closeOnInteraction=!1;_isVisible=!1;_onHide=new E;_showAnimation="mat-mdc-tooltip-show";_hideAnimation="mat-mdc-tooltip-hide";constructor(){}show(e){this._hideTimeoutId!=null&&clearTimeout(this._hideTimeoutId),this._showTimeoutId=setTimeout(()=>{this._toggleVisibility(!0),this._showTimeoutId=void 0},e)}hide(e){this._showTimeoutId!=null&&clearTimeout(this._showTimeoutId),this._hideTimeoutId=setTimeout(()=>{this._toggleVisibility(!1),this._hideTimeoutId=void 0},e)}afterHidden(){return this._onHide}isVisible(){return this._isVisible}ngOnDestroy(){this._cancelPendingAnimations(),this._onHide.complete(),this._triggerElement=null}_handleBodyInteraction(){this._closeOnInteraction&&this.hide(0)}_markForCheck(){this._changeDetectorRef.markForCheck()}_handleMouseLeave({relatedTarget:e}){(!e||!this._triggerElement.contains(e))&&(this.isVisible()?this.hide(this._mouseLeaveHideDelay):this._finalizeAnimation(!1))}_onShow(){this._isMultiline=this._isTooltipMultiline(),this._markForCheck()}_isTooltipMultiline(){let e=this._elementRef.nativeElement.getBoundingClientRect();return e.height>QV&&e.width>=JV}_handleAnimationEnd({animationName:e}){(e===this._showAnimation||e===this._hideAnimation)&&this._finalizeAnimation(e===this._showAnimation)}_cancelPendingAnimations(){this._showTimeoutId!=null&&clearTimeout(this._showTimeoutId),this._hideTimeoutId!=null&&clearTimeout(this._hideTimeoutId),this._showTimeoutId=this._hideTimeoutId=void 0}_finalizeAnimation(e){e?this._closeOnInteraction=!0:this.isVisible()||this._onHide.next()}_toggleVisibility(e){let i=this._tooltip.nativeElement,r=this._showAnimation,o=this._hideAnimation;if(i.classList.remove(e?o:r),i.classList.add(e?r:o),this._isVisible!==e&&(this._isVisible=e,this._changeDetectorRef.markForCheck()),e&&!this._animationsDisabled&&typeof getComputedStyle=="function"){let s=getComputedStyle(i);(s.getPropertyValue("animation-duration")==="0s"||s.getPropertyValue("animation-name")==="none")&&(this._animationsDisabled=!0)}e&&this._onShow(),this._animationsDisabled&&(i.classList.add("_mat-animation-noopable"),this._finalizeAnimation(e))}static \u0275fac=function(i){return new(i||n)};static \u0275cmp=G({type:n,selectors:[["mat-tooltip-component"]],viewQuery:function(i,r){if(i&1&&bt(WV,7),i&2){let o;J(o=ee())&&(r._tooltip=o.first)}},hostAttrs:["aria-hidden","true"],hostBindings:function(i,r){i&1&&K("mouseleave",function(s){return r._handleMouseLeave(s)})},decls:4,vars:5,consts:[["tooltip",""],[1,"mdc-tooltip","mat-mdc-tooltip",3,"animationend"],[1,"mat-mdc-tooltip-surface","mdc-tooltip__surface"]],template:function(i,r){i&1&&(gn(0,"div",1,0),ca("animationend",function(s){return r._handleAnimationEnd(s)}),gn(2,"div",2),v(3),Zn()()),i&2&&(Rn(r.tooltipClass),ce("mdc-tooltip--multiline",r._isMultiline),y(3),k(r.message))},styles:[`.mat-mdc-tooltip {
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
`],encapsulation:2,changeDetection:0})}return n})();var Sn=(()=>{class n{static \u0275fac=function(i){return new(i||n)};static \u0275mod=De({type:n});static \u0275inj=be({imports:[Db,Es,gt,kr]})}return n})();var eB=["*"],ih=class n{title=Ft.required();closeDetail=io();static \u0275fac=function(e){return new(e||n)};static \u0275cmp=G({type:n,selectors:[["sdux-devtools-detail-pane"]],inputs:{title:[1,"title"]},outputs:{closeDetail:"closeDetail"},ngContentSelectors:eB,decls:8,vars:1,consts:[[1,"detail-panel"],[1,"detail-header"],["type","button","aria-label","Close detail panel","matTooltip","Close detail panel",1,"close-btn",3,"click"],[1,"detail-body"]],template:function(e,i){e&1&&(ht(),h(0,"div",0)(1,"div",1)(2,"h3"),v(3),m(),h(4,"button",2),K("click",function(){return i.closeDetail.emit()}),v(5," \u2715 "),m()(),h(6,"div",3),ke(7),m()()),e&2&&(y(3),k(i.title()))},dependencies:[Sn,fn],styles:[".pointer[_ngcontent-%COMP%]{cursor:pointer}[_nghost-%COMP%]{display:flex;flex-direction:column;height:100%;max-height:100%;overflow:hidden}.detail-panel[_ngcontent-%COMP%]{display:flex;flex-direction:column;flex:1;min-height:0;overflow:hidden;background-color:#0f172a}.detail-panel[_ngcontent-%COMP%]   .detail-header[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:space-between;padding:.5rem 1rem;border-bottom:1px solid #63a4ff;flex-shrink:0}.detail-panel[_ngcontent-%COMP%]   .detail-header[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]{color:#fff;font-weight:600;font-family:Inter,system-ui,sans-serif;font-size:1rem;margin:0}.detail-panel[_ngcontent-%COMP%]   .detail-header[_ngcontent-%COMP%]   .close-btn[_ngcontent-%COMP%]{background:none;border:none;color:#94a3b8;font-size:1rem;cursor:pointer;padding:.25rem;border-radius:.25rem;line-height:1}.detail-panel[_ngcontent-%COMP%]   .detail-header[_ngcontent-%COMP%]   .close-btn[_ngcontent-%COMP%]:hover{color:#fff;background-color:#63a4ff}.detail-panel[_ngcontent-%COMP%]   .detail-body[_ngcontent-%COMP%]{flex:1;min-height:0;overflow-y:auto;padding:1rem}.detail-panel[_ngcontent-%COMP%]   .detail-body[_ngcontent-%COMP%]::-webkit-scrollbar{width:6px}.detail-panel[_ngcontent-%COMP%]   .detail-body[_ngcontent-%COMP%]::-webkit-scrollbar-thumb{background-color:#63a4ff;border-radius:.25rem}"],changeDetection:0})};var tB=["*"];function nB(n,t){n&1&&(h(0,"div",4),ke(1),m())}var rh=class n{label=Ft.required();tooltip=Ft("");expanded=P(!1);toggle(){this.expanded.update(t=>!t)}static \u0275fac=function(e){return new(e||n)};static \u0275cmp=G({type:n,selectors:[["sdux-devtools-pipeline-collapsible"]],inputs:{label:[1,"label"],tooltip:[1,"tooltip"]},ngContentSelectors:tB,decls:7,vars:8,consts:[[1,"pipeline-collapsible-wrapper"],["tabindex","0","role","button",1,"pipeline-collapsible-header",3,"click","keydown.enter","keydown.space","matTooltip"],[1,"pipeline-label"],["aria-hidden","true",1,"pipeline-chevron"],[1,"pipeline-collapsible-content"]],template:function(e,i){e&1&&(ht(),h(0,"div",0)(1,"div",1),K("click",function(){return i.toggle()})("keydown.enter",function(){return i.toggle()})("keydown.space",function(){return i.toggle()}),h(2,"span",2),v(3),m(),h(4,"span",3),v(5,"\u25B8"),m()(),N(6,nB,2,0,"div",4),m()),e&2&&(ce("pipeline-collapsible-expanded",i.expanded()),y(),fe("matTooltip",i.tooltip()),Fe("aria-expanded",i.expanded()),y(2),k(i.label()),y(),ce("pipeline-chevron-expanded",i.expanded()),y(2),F(i.expanded()?6:-1))},dependencies:[Sn,fn],styles:[`.pointer{cursor:pointer}sdux-devtools-pipeline-collapsible{display:flex;flex-direction:column;align-items:center;align-self:stretch;width:100%;box-sizing:border-box}sdux-devtools-pipeline-collapsible .pipeline-collapsible-wrapper{width:100%;padding:.25rem .5rem;border:1px solid #63a4ff;border-radius:.3125rem;background-color:#2c3a4f}sdux-devtools-pipeline-collapsible .pipeline-collapsible-header{display:flex;align-items:center;justify-content:space-between;cursor:pointer;-webkit-user-select:none;user-select:none}sdux-devtools-pipeline-collapsible .pipeline-collapsible-header .pipeline-label{color:#e2e8f0;font-weight:600;font-family:Inter,system-ui,sans-serif;font-size:.875rem;flex:1;text-align:center}sdux-devtools-pipeline-collapsible .pipeline-collapsible-content{display:flex;flex-direction:column;align-items:center;padding:0 .5rem .25rem}sdux-devtools-pipeline-collapsible .pipeline-collapsible-content .pipeline-node{width:100%}sdux-devtools-pipeline-collapsible .pipeline-collapsible-content sdux-devtools-pipeline-collapsible{width:100%}sdux-devtools-pipeline-collapsible .pipeline-chevron{color:#94a3b8;font-weight:400;font-family:Inter,system-ui,sans-serif;font-size:1.25rem;transition:transform .2s ease;display:inline-block}sdux-devtools-pipeline-collapsible .pipeline-chevron-expanded{transform:rotate(90deg)}
`],encapsulation:2,changeDetection:0})};var xn=(n,t)=>t.key,SM=(n,t)=>t.label;function iB(n,t){if(n&1&&(h(0,"div",6)(1,"span",7),v(2,"\u25BC"),m()(),h(3,"div",24)(4,"span",5),v(5),m(),h(6,"span",25),v(7),m()()),n&2){let e=t.$implicit,i=w();y(5),k(i.vaultKeyName(e.key)),y(2),k(i.vaultKeyDomain(e.key))}}function rB(n,t){if(n&1&&(h(0,"div",6)(1,"span",7),v(2,"\u25BC"),m()(),h(3,"div",24)(4,"span",5),v(5),m(),h(6,"span",25),v(7),m()()),n&2){let e=t.$implicit,i=w();y(5),k(i.vaultKeyName(e.key)),y(2),k(i.vaultKeyDomain(e.key))}}function oB(n,t){if(n&1&&(h(0,"div",6)(1,"span",7),v(2,"\u25BC"),m()(),h(3,"div",26)(4,"span",5),v(5),m(),h(6,"span",25),v(7),m()()),n&2){let e=t.$implicit;y(3),ce("pipeline-active",e.count>0),y(2),k(e.label),y(2),k(e.count)}}function sB(n,t){if(n&1&&(h(0,"div",6)(1,"span",7),v(2,"\u25BC"),m()(),h(3,"div",24)(4,"span",5),v(5),m(),h(6,"span",25),v(7),m()()),n&2){let e=t.$implicit,i=w();y(5),k(i.vaultKeyName(e.key)),y(2),k(i.vaultKeyDomain(e.key))}}function aB(n,t){if(n&1&&(h(0,"div",6)(1,"span",7),v(2,"\u25BC"),m()(),h(3,"div",24)(4,"span",5),v(5),m(),h(6,"span",25),v(7),m()()),n&2){let e=t.$implicit,i=w();y(5),k(i.vaultKeyName(e.key)),y(2),k(i.vaultKeyDomain(e.key))}}function lB(n,t){if(n&1&&(h(0,"div",6)(1,"span",7),v(2,"\u25BC"),m()(),h(3,"div",24)(4,"span",5),v(5),m(),h(6,"span",25),v(7),m()()),n&2){let e=t.$implicit,i=w();y(5),k(i.vaultKeyName(e.key)),y(2),k(i.vaultKeyDomain(e.key))}}function cB(n,t){if(n&1&&(h(0,"div",6)(1,"span",7),v(2,"\u25BC"),m()(),h(3,"div",24)(4,"span",5),v(5,"Operators"),m(),h(6,"span",25),v(7),m()()),n&2){let e,i=w();y(7),k((e=i.cell().fluentApis)==null?null:e.operators)}}function dB(n,t){if(n&1&&(h(0,"div",6)(1,"span",7),v(2,"\u25BC"),m()(),h(3,"div",24)(4,"span",5),v(5,"Filters"),m(),h(6,"span",25),v(7),m()()),n&2){let e,i=w();y(7),k((e=i.cell().fluentApis)==null?null:e.filters)}}function uB(n,t){if(n&1&&(h(0,"div",6)(1,"span",7),v(2,"\u25BC"),m()(),h(3,"div",24)(4,"span",5),v(5),m(),h(6,"span",25),v(7),m()()),n&2){let e=t.$implicit,i=w();y(5),k(i.vaultKeyName(e.key)),y(2),k(i.vaultKeyDomain(e.key))}}function fB(n,t){if(n&1&&(h(0,"div",6)(1,"span",7),v(2,"\u25BC"),m()(),h(3,"div",24)(4,"span",5),v(5,"Before Taps"),m(),h(6,"span",25),v(7),m()()),n&2){let e,i=w();y(7),k((e=i.cell().fluentApis)==null?null:e.beforeTaps)}}function pB(n,t){if(n&1&&(h(0,"div",6)(1,"span",7),v(2,"\u25BC"),m()(),h(3,"div",24)(4,"span",5),v(5,"Reducers"),m(),h(6,"span",25),v(7),m()()),n&2){let e,i=w();y(7),k((e=i.cell().fluentApis)==null?null:e.reducers)}}function hB(n,t){if(n&1&&(h(0,"div",6)(1,"span",7),v(2,"\u25BC"),m()(),h(3,"div",24)(4,"span",5),v(5),m(),h(6,"span",25),v(7),m()()),n&2){let e=t.$implicit,i=w();y(5),k(i.vaultKeyName(e.key)),y(2),k(i.vaultKeyDomain(e.key))}}function mB(n,t){if(n&1&&(h(0,"div",6)(1,"span",7),v(2,"\u25BC"),m()(),h(3,"div",24)(4,"span",5),v(5,"After Taps"),m(),h(6,"span",25),v(7),m()()),n&2){let e,i=w();y(7),k((e=i.cell().fluentApis)==null?null:e.afterTaps)}}function gB(n,t){if(n&1&&(h(0,"div",6)(1,"span",7),v(2,"\u25BC"),m()(),h(3,"div",24)(4,"span",5),v(5),m(),h(6,"span",25),v(7),m()()),n&2){let e=t.$implicit,i=w();y(5),k(i.vaultKeyName(e.key)),y(2),k(i.vaultKeyDomain(e.key))}}function yB(n,t){if(n&1&&(h(0,"div",6)(1,"span",7),v(2,"\u25BC"),m()(),h(3,"div",24)(4,"span",5),v(5),m(),h(6,"span",25),v(7),m()()),n&2){let e=t.$implicit,i=w();y(5),k(i.vaultKeyName(e.key)),y(2),k(i.vaultKeyDomain(e.key))}}function vB(n,t){if(n&1&&(h(0,"div",6)(1,"span",7),v(2,"\u25BC"),m()(),h(3,"div",24)(4,"span",5),v(5),m(),h(6,"span",25),v(7),m()()),n&2){let e=t.$implicit,i=w();y(5),k(i.vaultKeyName(e.key)),y(2),k(i.vaultKeyDomain(e.key))}}function _B(n,t){if(n&1&&(h(0,"div",6)(1,"span",7),v(2,"\u25BC"),m()(),h(3,"div",24)(4,"span",5),v(5),m(),h(6,"span",25),v(7),m()()),n&2){let e=t.$implicit,i=w(2);y(5),k(i.vaultKeyName(e.key)),y(2),k(i.vaultKeyDomain(e.key))}}function bB(n,t){if(n&1&&(h(0,"div",6)(1,"span",7),v(2,"\u25BC"),m()(),h(3,"sdux-devtools-pipeline-collapsible",27),Be(4,_B,8,2,null,null,xn),m()),n&2){let e=w();y(4),je(e.extensionBehaviors())}}function CB(n,t){if(n&1&&(h(0,"div",6)(1,"span",7),v(2,"\u25BC"),m()(),h(3,"div",24)(4,"span",5),v(5),m(),h(6,"span",25),v(7),m()()),n&2){let e=w().$implicit;y(5),k(e.label),y(2),k(e.count)}}function DB(n,t){if(n&1&&N(0,CB,8,2),n&2){let e=t.$implicit;F(e.count>0?0:-1)}}function EB(n,t){if(n&1&&(h(0,"div",6)(1,"span",7),v(2,"\u25BC"),m()(),h(3,"div",24)(4,"span",5),v(5),m(),h(6,"span",25),v(7),m()()),n&2){let e=t.$implicit,i=w(2);y(5),k(i.vaultKeyName(e.key)),y(2),k(i.vaultKeyDomain(e.key))}}function wB(n,t){if(n&1&&(h(0,"div",6)(1,"span",7),v(2,"\u25BC"),m()(),h(3,"sdux-devtools-pipeline-collapsible",28),Be(4,EB,8,2,null,null,xn),m()),n&2){let e=w();y(4),je(e.errorTransformBehaviors())}}function SB(n,t){if(n&1&&(h(0,"li",29)(1,"span",30),v(2),m(),h(3,"span",31),v(4),m()()),n&2){let e=t.$implicit;y(2),k(e.key),y(2),k(e.type)}}function xB(n,t){if(n&1&&(h(0,"ul",22),Be(1,SB,5,2,"li",29,xn),m()),n&2){let e=w();y(),je(e.behaviors())}}function TB(n,t){n&1&&(h(0,"p",23),v(1,"No behaviors registered."),m())}function MB(n,t){if(n&1&&(h(0,"li",29)(1,"span",30),v(2),m(),h(3,"span",31),v(4),m()()),n&2){let e=t.$implicit;y(2),k(e.key),y(2),k(e.type)}}function IB(n,t){if(n&1&&(h(0,"ul",22),Be(1,MB,5,2,"li",29,xn),m()),n&2){let e=w();y(),je(e.controllers())}}function kB(n,t){n&1&&(h(0,"p",23),v(1,"No controllers registered."),m())}var oh=class n{cell=Ft.required();closeDetail=io();behaviors=L(()=>this.cell().behaviors??[]);controllers=L(()=>this.cell().controllers??[]);coreControllers=L(()=>{let t=new Set(["CoreAbstain","CoreLicense","CoreError"]);return this.controllers().filter(e=>t.has(this.vaultKeyName(e.key)))});nonCoreControllers=L(()=>{let t=new Set(["CoreAbstain","CoreLicense","CoreError"]);return this.controllers().filter(e=>!t.has(this.vaultKeyName(e.key)))});cellKey=L(()=>this.cell().key??"");vaultKeyName(t){let e=t.split("::");return e.length===4?e[3]:t}vaultKeyDomain(t){let e=t.split("::");return e.length===4?e[2]:""}preResolveStages=L(()=>[{label:"Interceptors",count:this.cell().fluentApis?.interceptors??0}]);resolveBehaviors=L(()=>this.behaviors().filter(t=>t.type===H.Resolve));fromObservableBehaviors=L(()=>this.behaviors().filter(t=>t.type===H.FromObservable));fromPromiseBehaviors=L(()=>this.behaviors().filter(t=>t.type===H.FromPromise));fromStreamBehaviors=L(()=>this.behaviors().filter(t=>t.type===H.FromStream));mergeBehaviors=L(()=>this.behaviors().filter(t=>t.type===H.Merge));stepwiseResolveBehaviors=L(()=>this.behaviors().filter(t=>t.type===H.StepwiseResolve));stepwiseFilterBehaviors=L(()=>this.behaviors().filter(t=>t.type===H.StepwiseFilter));stepwiseReducerBehaviors=L(()=>this.behaviors().filter(t=>t.type===H.StepwiseReducer));encryptBehaviors=L(()=>this.behaviors().filter(t=>t.type===H.Encrypt));persistBehaviors=L(()=>this.behaviors().filter(t=>t.type===H.Persist));coreStateBehaviors=L(()=>this.behaviors().filter(t=>t.type===H.CoreState));errorTransformBehaviors=L(()=>this.behaviors().filter(t=>t.type===H.ErrorTransform));extensionBehaviors=L(()=>this.behaviors().filter(t=>t.type===H.Extension));postResolveStages=L(()=>{let t=this.cell().fluentApis;return[{label:"Emit State",count:t?.emitStateCallbacks??0},{label:"Error Callbacks",count:t?.errorCallbacks??0}]});static \u0275fac=function(e){return new(e||n)};static \u0275cmp=G({type:n,selectors:[["sdux-devtools-registry-detail"]],inputs:{cell:[1,"cell"]},outputs:{closeDetail:"closeDetail"},decls:111,vars:12,consts:[[3,"closeDetail","title"],[1,"pipeline-section"],[1,"section-heading"],[1,"pipeline-flow"],[1,"pipeline-node","pipeline-start"],[1,"pipeline-label"],["aria-hidden","true",1,"pipeline-connector"],[1,"pipeline-arrow"],["label","Conductor","tooltip","Expand to see conductor internals"],["label","Policy Layer","tooltip","Expand to see queue and controller policies",1,"policy-layer"],["label","Controllers","tooltip","Expand to see registered controllers"],["label","Core","tooltip","Expand to see core controllers"],["label","Orchestrator","tooltip","Expand to see orchestrator pipeline"],["label","Pre-Processing Layer","tooltip","Expand to see pre-processing interceptors",1,"pre-processing-layer"],["label","Processing Layer","tooltip","Expand to see processing pipeline",1,"processing-layer"],["label","Resolve","tooltip","Expand to see resolve behaviors"],["label","Output Layer","tooltip","Expand to see output behaviors",1,"output-layer"],["label","Post-Processing Layer","tooltip","Expand to see post-processing pipeline",1,"post-processing-layer"],[1,"pipeline-node","pipeline-end"],[1,"entity-section"],[1,"entity-title"],[1,"entity-count"],[1,"entity-list"],[1,"entity-empty"],[1,"pipeline-node","pipeline-active"],[1,"pipeline-count"],[1,"pipeline-node"],["label","Extensions","tooltip","Expand to see extension behaviors"],["label","ErrorTransform","tooltip","Expand to see error transform behaviors"],[1,"entity-item"],[1,"entity-key"],[1,"entity-type"]],template:function(e,i){if(e&1&&(h(0,"sdux-devtools-detail-pane",0),K("closeDetail",function(){return i.closeDetail.emit()}),h(1,"section",1)(2,"h4",2),v(3,"Pipeline Flow"),m(),h(4,"div",3)(5,"div",4)(6,"span",5),v(7,"Incoming Value"),m()(),h(8,"div",6)(9,"span",7),v(10,"\u25BC"),m()(),h(11,"sdux-devtools-pipeline-collapsible",8)(12,"div",6)(13,"span",7),v(14,"\u25BC"),m()(),h(15,"sdux-devtools-pipeline-collapsible",9)(16,"div",6)(17,"span",7),v(18,"\u25BC"),m()(),h(19,"div",4)(20,"span",5),v(21,"Queue"),m()(),h(22,"div",6)(23,"span",7),v(24,"\u25BC"),m()(),h(25,"sdux-devtools-pipeline-collapsible",10)(26,"div",6)(27,"span",7),v(28,"\u25BC"),m()(),h(29,"sdux-devtools-pipeline-collapsible",11),Be(30,iB,8,2,null,null,xn),m(),Be(32,rB,8,2,null,null,xn),m()()(),h(34,"div",6)(35,"span",7),v(36,"\u25BC"),m()(),h(37,"sdux-devtools-pipeline-collapsible",12)(38,"div",6)(39,"span",7),v(40,"\u25BC"),m()(),h(41,"sdux-devtools-pipeline-collapsible",13),Be(42,oB,8,4,null,null,SM),m(),h(44,"div",6)(45,"span",7),v(46,"\u25BC"),m()(),h(47,"sdux-devtools-pipeline-collapsible",14)(48,"div",6)(49,"span",7),v(50,"\u25BC"),m()(),h(51,"sdux-devtools-pipeline-collapsible",15),Be(52,sB,8,2,null,null,xn),m(),h(54,"div",6)(55,"span",7),v(56,"\u25BC"),m()(),h(57,"div",4)(58,"span",5),v(59,"Replace/Merge"),m()(),Be(60,aB,8,2,null,null,xn),Be(62,lB,8,2,null,null,xn),N(64,cB,8,1),N(65,dB,8,1),Be(66,uB,8,2,null,null,xn),N(68,fB,8,1),N(69,pB,8,1),Be(70,hB,8,2,null,null,xn),N(72,mB,8,1),m(),h(73,"div",6)(74,"span",7),v(75,"\u25BC"),m()(),h(76,"sdux-devtools-pipeline-collapsible",16),Be(77,gB,8,2,null,null,xn),Be(79,yB,8,2,null,null,xn),m(),h(81,"div",6)(82,"span",7),v(83,"\u25BC"),m()(),h(84,"sdux-devtools-pipeline-collapsible",17),Be(85,vB,8,2,null,null,xn),N(87,bB,6,0),Be(88,DB,1,1,null,null,SM),N(90,wB,6,0),m()(),h(91,"div",6)(92,"span",7),v(93,"\u25BC"),m()(),h(94,"div",18)(95,"span",5),v(96,"StateSnapshot"),m()()()(),h(97,"section",19)(98,"h4",20),v(99," Behaviors "),h(100,"span",21),v(101),m()(),N(102,xB,3,0,"ul",22)(103,TB,2,0,"p",23),m(),h(104,"section",19)(105,"h4",20),v(106," Controllers "),h(107,"span",21),v(108),m()(),N(109,IB,3,0,"ul",22)(110,kB,2,0,"p",23),m()()),e&2){let r,o,s,a,l;fe("title",i.cellKey()),y(30),je(i.coreControllers()),y(2),je(i.nonCoreControllers()),y(10),je(i.preResolveStages()),y(10),je(i.resolveBehaviors()),y(8),je(i.mergeBehaviors()),y(2),je(i.stepwiseResolveBehaviors()),y(2),F((r=i.cell().fluentApis)!=null&&r.operators?64:-1),y(),F((o=i.cell().fluentApis)!=null&&o.filters?65:-1),y(),je(i.stepwiseFilterBehaviors()),y(2),F((s=i.cell().fluentApis)!=null&&s.beforeTaps?68:-1),y(),F((a=i.cell().fluentApis)!=null&&a.reducers?69:-1),y(),je(i.stepwiseReducerBehaviors()),y(2),F((l=i.cell().fluentApis)!=null&&l.afterTaps?72:-1),y(5),je(i.encryptBehaviors()),y(2),je(i.persistBehaviors()),y(6),je(i.coreStateBehaviors()),y(2),F(i.extensionBehaviors().length>0?87:-1),y(),je(i.postResolveStages()),y(2),F(i.errorTransformBehaviors().length>0?90:-1),y(11),Ze("(",i.behaviors().length,")"),y(),F(i.behaviors().length?102:103),y(6),Ze("(",i.controllers().length,")"),y(),F(i.controllers().length?109:110)}},dependencies:[ih,rh],styles:[".pointer[_ngcontent-%COMP%]{cursor:pointer}.pipeline-section[_ngcontent-%COMP%]{margin-bottom:1.5rem}.pipeline-section[_ngcontent-%COMP%]   .section-heading[_ngcontent-%COMP%]{color:#e2e8f0;font-weight:600;font-family:Inter,system-ui,sans-serif;font-size:1rem;margin:0 0 .5rem}.pipeline-section[_ngcontent-%COMP%]   .pipeline-flow[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:center;gap:0}.pipeline-section[_ngcontent-%COMP%]   .pipeline-flow[_ngcontent-%COMP%]   sdux-devtools-pipeline-collapsible[_ngcontent-%COMP%]{width:100%}.pipeline-section[_ngcontent-%COMP%]   .pipeline-flow[_ngcontent-%COMP%]   sdux-devtools-pipeline-collapsible.policy-layer[_ngcontent-%COMP%]    >.pipeline-collapsible-wrapper{background:#f2e9d8}.pipeline-section[_ngcontent-%COMP%]   .pipeline-flow[_ngcontent-%COMP%]   sdux-devtools-pipeline-collapsible.policy-layer[_ngcontent-%COMP%]    >.pipeline-collapsible-wrapper>.pipeline-collapsible-header>.pipeline-label{color:#000}.pipeline-section[_ngcontent-%COMP%]   .pipeline-flow[_ngcontent-%COMP%]   sdux-devtools-pipeline-collapsible.pre-processing-layer[_ngcontent-%COMP%]    >.pipeline-collapsible-wrapper{background:#f2e9d8}.pipeline-section[_ngcontent-%COMP%]   .pipeline-flow[_ngcontent-%COMP%]   sdux-devtools-pipeline-collapsible.pre-processing-layer[_ngcontent-%COMP%]    >.pipeline-collapsible-wrapper>.pipeline-collapsible-header>.pipeline-label{color:#000}.pipeline-section[_ngcontent-%COMP%]   .pipeline-flow[_ngcontent-%COMP%]   sdux-devtools-pipeline-collapsible.processing-layer[_ngcontent-%COMP%]    >.pipeline-collapsible-wrapper{background:#f2e9d8}.pipeline-section[_ngcontent-%COMP%]   .pipeline-flow[_ngcontent-%COMP%]   sdux-devtools-pipeline-collapsible.processing-layer[_ngcontent-%COMP%]    >.pipeline-collapsible-wrapper>.pipeline-collapsible-header>.pipeline-label{color:#000}.pipeline-section[_ngcontent-%COMP%]   .pipeline-flow[_ngcontent-%COMP%]   sdux-devtools-pipeline-collapsible.output-layer[_ngcontent-%COMP%]    >.pipeline-collapsible-wrapper{background:#f2e9d8}.pipeline-section[_ngcontent-%COMP%]   .pipeline-flow[_ngcontent-%COMP%]   sdux-devtools-pipeline-collapsible.output-layer[_ngcontent-%COMP%]    >.pipeline-collapsible-wrapper>.pipeline-collapsible-header>.pipeline-label{color:#000}.pipeline-section[_ngcontent-%COMP%]   .pipeline-flow[_ngcontent-%COMP%]   sdux-devtools-pipeline-collapsible.post-processing-layer[_ngcontent-%COMP%]    >.pipeline-collapsible-wrapper{background:#f2e9d8}.pipeline-section[_ngcontent-%COMP%]   .pipeline-flow[_ngcontent-%COMP%]   sdux-devtools-pipeline-collapsible.post-processing-layer[_ngcontent-%COMP%]    >.pipeline-collapsible-wrapper>.pipeline-collapsible-header>.pipeline-label{color:#000}.pipeline-section[_ngcontent-%COMP%]   .pipeline-flow[_ngcontent-%COMP%]   .pipeline-connector[_ngcontent-%COMP%]{display:flex;justify-content:center}.pipeline-section[_ngcontent-%COMP%]   .pipeline-flow[_ngcontent-%COMP%]   .pipeline-connector[_ngcontent-%COMP%]   .pipeline-arrow[_ngcontent-%COMP%]{color:#64748b;font-weight:400;font-family:Inter,system-ui,sans-serif;font-size:.75rem;line-height:1}.pipeline-section[_ngcontent-%COMP%]   .pipeline-flow[_ngcontent-%COMP%]   .pipeline-node[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:space-between;width:100%;padding:.25rem .5rem;border:1px solid #63a4ff;border-radius:.3125rem;background-color:#1f2a3a}.pipeline-section[_ngcontent-%COMP%]   .pipeline-flow[_ngcontent-%COMP%]   .pipeline-node[_ngcontent-%COMP%]   .pipeline-label[_ngcontent-%COMP%]{color:#94a3b8;font-weight:400;font-family:Inter,system-ui,sans-serif;font-size:.875rem}.pipeline-section[_ngcontent-%COMP%]   .pipeline-flow[_ngcontent-%COMP%]   .pipeline-node[_ngcontent-%COMP%]   .pipeline-count[_ngcontent-%COMP%]{color:#64748b;font-weight:400;font-family:Inter,system-ui,sans-serif;font-size:.75rem}.pipeline-section[_ngcontent-%COMP%]   .pipeline-flow[_ngcontent-%COMP%]   .pipeline-node.pipeline-active[_ngcontent-%COMP%]{border-color:#1976d2;background-color:color-mix(in srgb,#1976d2 22%,#1f2a3a)}.pipeline-section[_ngcontent-%COMP%]   .pipeline-flow[_ngcontent-%COMP%]   .pipeline-node.pipeline-active[_ngcontent-%COMP%]   .pipeline-label[_ngcontent-%COMP%]{color:#e2e8f0;font-weight:400;font-family:Inter,system-ui,sans-serif}.pipeline-section[_ngcontent-%COMP%]   .pipeline-flow[_ngcontent-%COMP%]   .pipeline-node.pipeline-active[_ngcontent-%COMP%]   .pipeline-count[_ngcontent-%COMP%]{color:#63a4ff;font-weight:400;font-family:Inter,system-ui,sans-serif;font-weight:600}.pipeline-section[_ngcontent-%COMP%]   .pipeline-flow[_ngcontent-%COMP%]   .pipeline-node.pipeline-start[_ngcontent-%COMP%], .pipeline-section[_ngcontent-%COMP%]   .pipeline-flow[_ngcontent-%COMP%]   .pipeline-node.pipeline-end[_ngcontent-%COMP%]{justify-content:center;background-color:#2c3a4f;border-color:#63a4ff}.pipeline-section[_ngcontent-%COMP%]   .pipeline-flow[_ngcontent-%COMP%]   .pipeline-node.pipeline-start[_ngcontent-%COMP%]   .pipeline-label[_ngcontent-%COMP%], .pipeline-section[_ngcontent-%COMP%]   .pipeline-flow[_ngcontent-%COMP%]   .pipeline-node.pipeline-end[_ngcontent-%COMP%]   .pipeline-label[_ngcontent-%COMP%]{color:#e2e8f0;font-weight:600;font-family:Inter,system-ui,sans-serif;font-size:.875rem}.entity-section[_ngcontent-%COMP%]{margin-bottom:1.5rem}.entity-section[_ngcontent-%COMP%]   .entity-title[_ngcontent-%COMP%]{color:#e2e8f0;font-weight:600;font-family:Inter,system-ui,sans-serif;font-size:1rem;margin:0 0 .5rem}.entity-section[_ngcontent-%COMP%]   .entity-title[_ngcontent-%COMP%]   .entity-count[_ngcontent-%COMP%]{color:#94a3b8;font-family:Inter,system-ui,sans-serif;font-weight:400;font-size:.875rem}.entity-section[_ngcontent-%COMP%]   .entity-list[_ngcontent-%COMP%]{list-style:none;padding:0;margin:0}.entity-section[_ngcontent-%COMP%]   .entity-list[_ngcontent-%COMP%]   .entity-item[_ngcontent-%COMP%]{display:flex;justify-content:space-between;align-items:center;padding:.25rem .5rem;border-bottom:1px solid #63a4ff}.entity-section[_ngcontent-%COMP%]   .entity-list[_ngcontent-%COMP%]   .entity-item[_ngcontent-%COMP%]:last-child{border-bottom:none}.entity-section[_ngcontent-%COMP%]   .entity-list[_ngcontent-%COMP%]   .entity-item[_ngcontent-%COMP%]   .entity-key[_ngcontent-%COMP%]{color:#e2e8f0;font-weight:400;font-family:Inter,system-ui,sans-serif;font-size:.875rem;word-break:break-all;flex:1;margin-right:.5rem}.entity-section[_ngcontent-%COMP%]   .entity-list[_ngcontent-%COMP%]   .entity-item[_ngcontent-%COMP%]   .entity-type[_ngcontent-%COMP%]{color:#94a3b8;font-weight:400;font-family:Inter,system-ui,sans-serif;font-size:.75rem;white-space:nowrap}.entity-section[_ngcontent-%COMP%]   .entity-empty[_ngcontent-%COMP%]{color:#94a3b8;font-weight:400;font-family:Inter,system-ui,sans-serif;font-size:.875rem;font-style:italic}"],changeDetection:0})};var AB=(n,t)=>t[0];function OB(n,t){if(n&1&&(h(0,"tr")(1,"td"),v(2),m(),h(3,"td"),v(4),m()()),n&2){let e=t.$implicit;y(2),k(e[0]),y(2),k(e[1])}}function RB(n,t){if(n&1&&(h(0,"table",5)(1,"thead")(2,"tr")(3,"th"),v(4,"Package"),m(),h(5,"th"),v(6,"Version"),m()()(),h(7,"tbody"),Be(8,OB,5,2,"tr",null,AB),m()()),n&2){let e=w();y(8),je(e.versions())}}function PB(n,t){n&1&&(h(0,"p",6),v(1,"No version data available."),m())}function NB(n,t){if(n&1){let e=_t();h(0,"tr",10),K("click",function(){let r=Le(e).$implicit,o=w(2);return Ve(o.selectCell(r))}),h(1,"td"),v(2),m(),h(3,"td"),v(4),m(),h(5,"td"),v(6),m()()}if(n&2){let e=t.$implicit,i=w(2);ce("selected",i.selectedCell()===e),y(2),k(e.key),y(2),k(e.behaviors.length),y(2),k(e.controllers.length)}}function FB(n,t){if(n&1&&(h(0,"table",7)(1,"thead")(2,"tr")(3,"th"),v(4,"Cell Key"),m(),h(5,"th"),v(6,"Behaviors"),m(),h(7,"th"),v(8,"Controllers"),m()()(),h(9,"tbody"),Be(10,NB,7,5,"tr",9,Ky),m()()),n&2){let e=w();y(10),je(e.registry())}}function LB(n,t){n&1&&(h(0,"p",6),v(1,"No registry data available."),m())}function VB(n,t){if(n&1){let e=_t();h(0,"aside",8)(1,"sdux-devtools-registry-detail",11),K("closeDetail",function(){Le(e);let r=w();return Ve(r.closeDetail())}),m()()}n&2&&(y(),fe("cell",t))}var sh=class n{insight=f(Fa);constructor(){this.insight.refreshLocalConfig()}versions=L(()=>{let t=this.insight.vaultConfig();return t?.versions?Object.entries(t.versions).sort(([e],[i])=>e.localeCompare(i)):[]});registry=L(()=>this.insight.vaultConfig()?.registry??[]);selectedCell=P(null);selectCell(t){this.selectedCell.set(t)}closeDetail(){this.selectedCell.set(null)}static \u0275fac=function(e){return new(e||n)};static \u0275cmp=G({type:n,selectors:[["sdux-devtools-configuration"]],decls:15,vars:3,consts:[[1,"configuration-layout"],[1,"configuration-content"],[1,"title"],[1,"section"],[1,"section-title"],[1,"versions-table"],[1,"empty"],[1,"registry-table"],[1,"detail-pane"],[1,"registry-row",3,"selected"],[1,"registry-row",3,"click"],[3,"closeDetail","cell"]],template:function(e,i){if(e&1&&(h(0,"div",0)(1,"section",1)(2,"h2",2),v(3,"Vault Configuration"),m(),h(4,"section",3)(5,"h3",4),v(6,"Package Versions"),m(),N(7,RB,10,0,"table",5)(8,PB,2,0,"p",6),m(),h(9,"section",3)(10,"h3",4),v(11,"FeatureCell Registry"),m(),N(12,FB,12,0,"table",7)(13,LB,2,0,"p",6),m()(),N(14,VB,2,1,"aside",8),m()),e&2){let r;y(7),F(i.versions().length?7:8),y(5),F(i.registry().length?12:13),y(2),F((r=i.selectedCell())?14:-1,r)}},dependencies:[oh],styles:[".pointer[_ngcontent-%COMP%]{cursor:pointer}[_nghost-%COMP%]{display:flex;flex-direction:column;flex:1;min-height:0;overflow:hidden}.configuration-layout[_ngcontent-%COMP%]{display:flex;flex-direction:row;flex:1;min-height:0;overflow:hidden}.configuration-layout[_ngcontent-%COMP%]   .configuration-content[_ngcontent-%COMP%]{flex:1;min-width:0;overflow:auto;padding:1rem}.configuration-layout[_ngcontent-%COMP%]   .configuration-content[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%]{color:#e2e8f0;font-weight:400;font-family:Inter,system-ui,sans-serif;font-size:1.125rem;margin:0 0 1rem}.configuration-layout[_ngcontent-%COMP%]   .configuration-content[_ngcontent-%COMP%]   .section[_ngcontent-%COMP%]{margin-bottom:1.5rem}.configuration-layout[_ngcontent-%COMP%]   .configuration-content[_ngcontent-%COMP%]   .section[_ngcontent-%COMP%]   .section-title[_ngcontent-%COMP%]{color:#e2e8f0;font-weight:400;font-family:Inter,system-ui,sans-serif;font-size:1rem;margin:0 0 .5rem}.configuration-layout[_ngcontent-%COMP%]   .configuration-content[_ngcontent-%COMP%]   .versions-table[_ngcontent-%COMP%], .configuration-layout[_ngcontent-%COMP%]   .configuration-content[_ngcontent-%COMP%]   .registry-table[_ngcontent-%COMP%]{width:100%;border-collapse:collapse}.configuration-layout[_ngcontent-%COMP%]   .configuration-content[_ngcontent-%COMP%]   .versions-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%], .configuration-layout[_ngcontent-%COMP%]   .configuration-content[_ngcontent-%COMP%]   .versions-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%], .configuration-layout[_ngcontent-%COMP%]   .configuration-content[_ngcontent-%COMP%]   .registry-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%], .configuration-layout[_ngcontent-%COMP%]   .configuration-content[_ngcontent-%COMP%]   .registry-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]{color:#94a3b8;font-weight:400;font-family:Inter,system-ui,sans-serif;font-size:.875rem;text-align:left;padding:.25rem .5rem;border-bottom:1px solid #63a4ff}.configuration-layout[_ngcontent-%COMP%]   .configuration-content[_ngcontent-%COMP%]   .versions-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%], .configuration-layout[_ngcontent-%COMP%]   .configuration-content[_ngcontent-%COMP%]   .registry-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]{color:#e2e8f0;font-weight:400;font-family:Inter,system-ui,sans-serif;font-weight:600}.configuration-layout[_ngcontent-%COMP%]   .configuration-content[_ngcontent-%COMP%]   .registry-row[_ngcontent-%COMP%]{cursor:pointer}.configuration-layout[_ngcontent-%COMP%]   .configuration-content[_ngcontent-%COMP%]   .registry-row[_ngcontent-%COMP%]:hover{background-color:#63a4ff}.configuration-layout[_ngcontent-%COMP%]   .configuration-content[_ngcontent-%COMP%]   .registry-row[_ngcontent-%COMP%]:hover   td[_ngcontent-%COMP%]{color:#e2e8f0;font-weight:400;font-family:Inter,system-ui,sans-serif}.configuration-layout[_ngcontent-%COMP%]   .configuration-content[_ngcontent-%COMP%]   .registry-row.selected[_ngcontent-%COMP%]{background-color:#2c3a4f}.configuration-layout[_ngcontent-%COMP%]   .configuration-content[_ngcontent-%COMP%]   .registry-row.selected[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]{color:#e2e8f0;font-weight:400;font-family:Inter,system-ui,sans-serif}.configuration-layout[_ngcontent-%COMP%]   .configuration-content[_ngcontent-%COMP%]   .empty[_ngcontent-%COMP%]{color:#94a3b8;font-weight:400;font-family:Inter,system-ui,sans-serif;font-size:.875rem;font-style:italic}.configuration-layout[_ngcontent-%COMP%]   .detail-pane[_ngcontent-%COMP%]{width:400px;min-width:400px;flex-shrink:0;display:flex;flex-direction:column;border-left:1px solid #63a4ff;min-height:0}.configuration-layout[_ngcontent-%COMP%]   .detail-pane[_ngcontent-%COMP%]   sdux-devtools-registry-detail[_ngcontent-%COMP%]{display:flex;flex-direction:column;flex:1;min-height:0}@media(max-width:768px){.configuration-layout[_ngcontent-%COMP%]{flex-direction:column}.configuration-layout[_ngcontent-%COMP%]   .configuration-content[_ngcontent-%COMP%]{flex:none;max-height:50%}.configuration-layout[_ngcontent-%COMP%]   .detail-pane[_ngcontent-%COMP%]{width:100%;min-width:0;border-left:none;border-top:1px solid #63a4ff;flex:1}}"],changeDetection:0})};var rd=class{_multiple;_emitChanges;compareWith;_selection=new Set;_deselectedToEmit=[];_selectedToEmit=[];_selected=null;get selected(){return this._selected||(this._selected=Array.from(this._selection.values())),this._selected}changed=new E;constructor(t=!1,e,i=!0,r){this._multiple=t,this._emitChanges=i,this.compareWith=r,e&&e.length&&(t?e.forEach(o=>this._markSelected(o)):this._markSelected(e[0]),this._selectedToEmit.length=0)}select(...t){this._verifyValueAssignment(t),t.forEach(i=>this._markSelected(i));let e=this._hasQueuedChanges();return this._emitChangeEvent(),e}deselect(...t){this._verifyValueAssignment(t),t.forEach(i=>this._unmarkSelected(i));let e=this._hasQueuedChanges();return this._emitChangeEvent(),e}setSelection(...t){this._verifyValueAssignment(t);let e=this.selected,i=new Set(t.map(o=>this._getConcreteValue(o)));t.forEach(o=>this._markSelected(o)),e.filter(o=>!i.has(this._getConcreteValue(o,i))).forEach(o=>this._unmarkSelected(o));let r=this._hasQueuedChanges();return this._emitChangeEvent(),r}toggle(t){return this.isSelected(t)?this.deselect(t):this.select(t)}clear(t=!0){this._unmarkAll();let e=this._hasQueuedChanges();return t&&this._emitChangeEvent(),e}isSelected(t){return this._selection.has(this._getConcreteValue(t))}isEmpty(){return this._selection.size===0}hasValue(){return!this.isEmpty()}sort(t){this._multiple&&this.selected&&this._selected.sort(t)}isMultipleSelection(){return this._multiple}_emitChangeEvent(){this._selected=null,(this._selectedToEmit.length||this._deselectedToEmit.length)&&(this.changed.next({source:this,added:this._selectedToEmit,removed:this._deselectedToEmit}),this._deselectedToEmit=[],this._selectedToEmit=[])}_markSelected(t){t=this._getConcreteValue(t),this.isSelected(t)||(this._multiple||this._unmarkAll(),this.isSelected(t)||this._selection.add(t),this._emitChanges&&this._selectedToEmit.push(t))}_unmarkSelected(t){t=this._getConcreteValue(t),this.isSelected(t)&&(this._selection.delete(t),this._emitChanges&&this._deselectedToEmit.push(t))}_unmarkAll(){this.isEmpty()||this._selection.forEach(t=>this._unmarkSelected(t))}_verifyValueAssignment(t){t.length>1&&this._multiple}_hasQueuedChanges(){return!!(this._deselectedToEmit.length||this._selectedToEmit.length)}_getConcreteValue(t,e){if(this.compareWith){e=e??this._selection;for(let i of e)if(this.compareWith(t,i))return i;return t}else return t}};function Vb(n){return n==null||Bb(n)===0}function Bb(n){return n==null?null:Array.isArray(n)||typeof n=="string"?n.length:n instanceof Set?n.size:null}var OM=new C(""),RM=new C(""),BB=/^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,lh=class{static min(t){return jB(t)}static max(t){return UB(t)}static required(t){return HB(t)}static requiredTrue(t){return $B(t)}static email(t){return zB(t)}static minLength(t){return WB(t)}static maxLength(t){return GB(t)}static pattern(t){return qB(t)}static nullValidator(t){return PM()}static compose(t){return jM(t)}static composeAsync(t){return UM(t)}};function jB(n){return t=>{if(t.value==null||n==null)return null;let e=parseFloat(t.value);return!isNaN(e)&&e<n?{min:{min:n,actual:t.value}}:null}}function UB(n){return t=>{if(t.value==null||n==null)return null;let e=parseFloat(t.value);return!isNaN(e)&&e>n?{max:{max:n,actual:t.value}}:null}}function HB(n){return Vb(n.value)?{required:!0}:null}function $B(n){return n.value===!0?null:{required:!0}}function zB(n){return Vb(n.value)||BB.test(n.value)?null:{email:!0}}function WB(n){return t=>{let e=t.value?.length??Bb(t.value);return e===null||e===0?null:e<n?{minlength:{requiredLength:n,actualLength:e}}:null}}function GB(n){return t=>{let e=t.value?.length??Bb(t.value);return e!==null&&e>n?{maxlength:{requiredLength:n,actualLength:e}}:null}}function qB(n){if(!n)return PM;let t,e;return typeof n=="string"?(e="",n.charAt(0)!=="^"&&(e+="^"),e+=n,n.charAt(n.length-1)!=="$"&&(e+="$"),t=new RegExp(e)):(e=n.toString(),t=n),i=>{if(Vb(i.value))return null;let r=i.value;return t.test(r)?null:{pattern:{requiredPattern:e,actualValue:r}}}}function PM(n){return null}function NM(n){return n!=null}function FM(n){return eo(n)?Xe(n):n}function LM(n){let t={};return n.forEach(e=>{t=e!=null?b(b({},t),e):t}),Object.keys(t).length===0?null:t}function VM(n,t){return t.map(e=>e(n))}function KB(n){return!n.validate}function BM(n){return n.map(t=>KB(t)?t:e=>t.validate(e))}function jM(n){if(!n)return null;let t=n.filter(NM);return t.length==0?null:function(e){return LM(VM(e,t))}}function jb(n){return n!=null?jM(BM(n)):null}function UM(n){if(!n)return null;let t=n.filter(NM);return t.length==0?null:function(e){let i=VM(e,t).map(FM);return js(i).pipe(ye(LM))}}function Ub(n){return n!=null?UM(BM(n)):null}function xM(n,t){return n===null?[t]:Array.isArray(n)?[...n,t]:[n,t]}function HM(n){return n._rawValidators}function $M(n){return n._rawAsyncValidators}function Fb(n){return n?Array.isArray(n)?n:[n]:[]}function ch(n,t){return Array.isArray(n)?n.includes(t):n===t}function TM(n,t){let e=Fb(t);return Fb(n).forEach(r=>{ch(e,r)||e.push(r)}),e}function MM(n,t){return Fb(t).filter(e=>!ch(n,e))}var dh=class{get value(){return this.control?this.control.value:null}get valid(){return this.control?this.control.valid:null}get invalid(){return this.control?this.control.invalid:null}get pending(){return this.control?this.control.pending:null}get disabled(){return this.control?this.control.disabled:null}get enabled(){return this.control?this.control.enabled:null}get errors(){return this.control?this.control.errors:null}get pristine(){return this.control?this.control.pristine:null}get dirty(){return this.control?this.control.dirty:null}get touched(){return this.control?this.control.touched:null}get status(){return this.control?this.control.status:null}get untouched(){return this.control?this.control.untouched:null}get statusChanges(){return this.control?this.control.statusChanges:null}get valueChanges(){return this.control?this.control.valueChanges:null}get path(){return null}_composedValidatorFn;_composedAsyncValidatorFn;_rawValidators=[];_rawAsyncValidators=[];_setValidators(t){this._rawValidators=t||[],this._composedValidatorFn=jb(this._rawValidators)}_setAsyncValidators(t){this._rawAsyncValidators=t||[],this._composedAsyncValidatorFn=Ub(this._rawAsyncValidators)}get validator(){return this._composedValidatorFn||null}get asyncValidator(){return this._composedAsyncValidatorFn||null}_onDestroyCallbacks=[];_registerOnDestroy(t){this._onDestroyCallbacks.push(t)}_invokeOnDestroyCallbacks(){this._onDestroyCallbacks.forEach(t=>t()),this._onDestroyCallbacks=[]}reset(t=void 0){this.control?.reset(t)}hasError(t,e){return this.control?this.control.hasError(t,e):!1}getError(t,e){return this.control?this.control.getError(t,e):null}},Ga=class extends dh{name;get formDirective(){return null}get path(){return null}},uh=class extends dh{_parent=null;name=null;valueAccessor=null};var od="VALID",ah="INVALID",za="PENDING",sd="DISABLED",go=class{},fh=class extends go{value;source;constructor(t,e){super(),this.value=t,this.source=e}},ld=class extends go{pristine;source;constructor(t,e){super(),this.pristine=t,this.source=e}},cd=class extends go{touched;source;constructor(t,e){super(),this.touched=t,this.source=e}},Wa=class extends go{status;source;constructor(t,e){super(),this.status=t,this.source=e}},ph=class extends go{source;constructor(t){super(),this.source=t}},hh=class extends go{source;constructor(t){super(),this.source=t}};function zM(n){return(_h(n)?n.validators:n)||null}function YB(n){return Array.isArray(n)?jb(n):n||null}function WM(n,t){return(_h(t)?t.asyncValidators:n)||null}function ZB(n){return Array.isArray(n)?Ub(n):n||null}function _h(n){return n!=null&&!Array.isArray(n)&&typeof n=="object"}function XB(n,t,e){let i=n.controls;if(!(t?Object.keys(i):i).length)throw new x(1e3,"");if(!i[e])throw new x(1001,"")}function QB(n,t,e){n._forEachChild((i,r)=>{if(e[r]===void 0)throw new x(-1002,"")})}var mh=class{_pendingDirty=!1;_hasOwnPendingAsyncValidator=null;_pendingTouched=!1;_onCollectionChange=()=>{};_updateOn;_parent=null;_asyncValidationSubscription;_composedValidatorFn;_composedAsyncValidatorFn;_rawValidators;_rawAsyncValidators;value;constructor(t,e){this._assignValidators(t),this._assignAsyncValidators(e)}get validator(){return this._composedValidatorFn}set validator(t){this._rawValidators=this._composedValidatorFn=t}get asyncValidator(){return this._composedAsyncValidatorFn}set asyncValidator(t){this._rawAsyncValidators=this._composedAsyncValidatorFn=t}get parent(){return this._parent}get status(){return Ae(this.statusReactive)}set status(t){Ae(()=>this.statusReactive.set(t))}_status=L(()=>this.statusReactive());statusReactive=P(void 0);get valid(){return this.status===od}get invalid(){return this.status===ah}get pending(){return this.status===za}get disabled(){return this.status===sd}get enabled(){return this.status!==sd}errors;get pristine(){return Ae(this.pristineReactive)}set pristine(t){Ae(()=>this.pristineReactive.set(t))}_pristine=L(()=>this.pristineReactive());pristineReactive=P(!0);get dirty(){return!this.pristine}get touched(){return Ae(this.touchedReactive)}set touched(t){Ae(()=>this.touchedReactive.set(t))}_touched=L(()=>this.touchedReactive());touchedReactive=P(!1);get untouched(){return!this.touched}_events=new E;events=this._events.asObservable();valueChanges;statusChanges;get updateOn(){return this._updateOn?this._updateOn:this.parent?this.parent.updateOn:"change"}setValidators(t){this._assignValidators(t)}setAsyncValidators(t){this._assignAsyncValidators(t)}addValidators(t){this.setValidators(TM(t,this._rawValidators))}addAsyncValidators(t){this.setAsyncValidators(TM(t,this._rawAsyncValidators))}removeValidators(t){this.setValidators(MM(t,this._rawValidators))}removeAsyncValidators(t){this.setAsyncValidators(MM(t,this._rawAsyncValidators))}hasValidator(t){return ch(this._rawValidators,t)}hasAsyncValidator(t){return ch(this._rawAsyncValidators,t)}clearValidators(){this.validator=null}clearAsyncValidators(){this.asyncValidator=null}markAsTouched(t={}){let e=this.touched===!1;this.touched=!0;let i=t.sourceControl??this;t.onlySelf||this._parent?.markAsTouched($(b({},t),{sourceControl:i})),e&&t.emitEvent!==!1&&this._events.next(new cd(!0,i))}markAllAsDirty(t={}){this.markAsDirty({onlySelf:!0,emitEvent:t.emitEvent,sourceControl:this}),this._forEachChild(e=>e.markAllAsDirty(t))}markAllAsTouched(t={}){this.markAsTouched({onlySelf:!0,emitEvent:t.emitEvent,sourceControl:this}),this._forEachChild(e=>e.markAllAsTouched(t))}markAsUntouched(t={}){let e=this.touched===!0;this.touched=!1,this._pendingTouched=!1;let i=t.sourceControl??this;this._forEachChild(r=>{r.markAsUntouched({onlySelf:!0,emitEvent:t.emitEvent,sourceControl:i})}),t.onlySelf||this._parent?._updateTouched(t,i),e&&t.emitEvent!==!1&&this._events.next(new cd(!1,i))}markAsDirty(t={}){let e=this.pristine===!0;this.pristine=!1;let i=t.sourceControl??this;t.onlySelf||this._parent?.markAsDirty($(b({},t),{sourceControl:i})),e&&t.emitEvent!==!1&&this._events.next(new ld(!1,i))}markAsPristine(t={}){let e=this.pristine===!1;this.pristine=!0,this._pendingDirty=!1;let i=t.sourceControl??this;this._forEachChild(r=>{r.markAsPristine({onlySelf:!0,emitEvent:t.emitEvent})}),t.onlySelf||this._parent?._updatePristine(t,i),e&&t.emitEvent!==!1&&this._events.next(new ld(!0,i))}markAsPending(t={}){this.status=za;let e=t.sourceControl??this;t.emitEvent!==!1&&(this._events.next(new Wa(this.status,e)),this.statusChanges.emit(this.status)),t.onlySelf||this._parent?.markAsPending($(b({},t),{sourceControl:e}))}disable(t={}){let e=this._parentMarkedDirty(t.onlySelf);this.status=sd,this.errors=null,this._forEachChild(r=>{r.disable($(b({},t),{onlySelf:!0}))}),this._updateValue();let i=t.sourceControl??this;t.emitEvent!==!1&&(this._events.next(new fh(this.value,i)),this._events.next(new Wa(this.status,i)),this.valueChanges.emit(this.value),this.statusChanges.emit(this.status)),this._updateAncestors($(b({},t),{skipPristineCheck:e}),this),this._onDisabledChange.forEach(r=>r(!0))}enable(t={}){let e=this._parentMarkedDirty(t.onlySelf);this.status=od,this._forEachChild(i=>{i.enable($(b({},t),{onlySelf:!0}))}),this.updateValueAndValidity({onlySelf:!0,emitEvent:t.emitEvent}),this._updateAncestors($(b({},t),{skipPristineCheck:e}),this),this._onDisabledChange.forEach(i=>i(!1))}_updateAncestors(t,e){t.onlySelf||(this._parent?.updateValueAndValidity(t),t.skipPristineCheck||this._parent?._updatePristine({},e),this._parent?._updateTouched({},e))}setParent(t){this._parent=t}getRawValue(){return this.value}updateValueAndValidity(t={}){if(this._setInitialStatus(),this._updateValue(),this.enabled){let i=this._cancelExistingSubscription();this.errors=this._runValidator(),this.status=this._calculateStatus(),(this.status===od||this.status===za)&&this._runAsyncValidator(i,t.emitEvent)}let e=t.sourceControl??this;t.emitEvent!==!1&&(this._events.next(new fh(this.value,e)),this._events.next(new Wa(this.status,e)),this.valueChanges.emit(this.value),this.statusChanges.emit(this.status)),t.onlySelf||this._parent?.updateValueAndValidity($(b({},t),{sourceControl:e}))}_updateTreeValidity(t={emitEvent:!0}){this._forEachChild(e=>e._updateTreeValidity(t)),this.updateValueAndValidity({onlySelf:!0,emitEvent:t.emitEvent})}_setInitialStatus(){this.status=this._allControlsDisabled()?sd:od}_runValidator(){return this.validator?this.validator(this):null}_runAsyncValidator(t,e){if(this.asyncValidator){this.status=za,this._hasOwnPendingAsyncValidator={emitEvent:e!==!1,shouldHaveEmitted:t!==!1};let i=FM(this.asyncValidator(this));this._asyncValidationSubscription=i.subscribe(r=>{this._hasOwnPendingAsyncValidator=null,this.setErrors(r,{emitEvent:e,shouldHaveEmitted:t})})}}_cancelExistingSubscription(){if(this._asyncValidationSubscription){this._asyncValidationSubscription.unsubscribe();let t=(this._hasOwnPendingAsyncValidator?.emitEvent||this._hasOwnPendingAsyncValidator?.shouldHaveEmitted)??!1;return this._hasOwnPendingAsyncValidator=null,t}return!1}setErrors(t,e={}){this.errors=t,this._updateControlsErrors(e.emitEvent!==!1,this,e.shouldHaveEmitted)}get(t){let e=t;return e==null||(Array.isArray(e)||(e=e.split(".")),e.length===0)?null:e.reduce((i,r)=>i&&i._find(r),this)}getError(t,e){let i=e?this.get(e):this;return i?.errors?i.errors[t]:null}hasError(t,e){return!!this.getError(t,e)}get root(){let t=this;for(;t._parent;)t=t._parent;return t}_updateControlsErrors(t,e,i){this.status=this._calculateStatus(),t&&this.statusChanges.emit(this.status),(t||i)&&this._events.next(new Wa(this.status,e)),this._parent&&this._parent._updateControlsErrors(t,e,i)}_initObservables(){this.valueChanges=new j,this.statusChanges=new j}_calculateStatus(){return this._allControlsDisabled()?sd:this.errors?ah:this._hasOwnPendingAsyncValidator||this._anyControlsHaveStatus(za)?za:this._anyControlsHaveStatus(ah)?ah:od}_anyControlsHaveStatus(t){return this._anyControls(e=>e.status===t)}_anyControlsDirty(){return this._anyControls(t=>t.dirty)}_anyControlsTouched(){return this._anyControls(t=>t.touched)}_updatePristine(t,e){let i=!this._anyControlsDirty(),r=this.pristine!==i;this.pristine=i,t.onlySelf||this._parent?._updatePristine(t,e),r&&this._events.next(new ld(this.pristine,e))}_updateTouched(t={},e){this.touched=this._anyControlsTouched(),this._events.next(new cd(this.touched,e)),t.onlySelf||this._parent?._updateTouched(t,e)}_onDisabledChange=[];_registerOnCollectionChange(t){this._onCollectionChange=t}_setUpdateStrategy(t){_h(t)&&t.updateOn!=null&&(this._updateOn=t.updateOn)}_parentMarkedDirty(t){return!t&&!!this._parent?.dirty&&!this._parent._anyControlsDirty()}_find(t){return null}_assignValidators(t){this._rawValidators=Array.isArray(t)?t.slice():t,this._composedValidatorFn=YB(this._rawValidators)}_assignAsyncValidators(t){this._rawAsyncValidators=Array.isArray(t)?t.slice():t,this._composedAsyncValidatorFn=ZB(this._rawAsyncValidators)}},gh=class extends mh{constructor(t,e,i){super(zM(e),WM(i,e)),this.controls=t,this._initObservables(),this._setUpdateStrategy(e),this._setUpControls(),this.updateValueAndValidity({onlySelf:!0,emitEvent:!!this.asyncValidator})}controls;registerControl(t,e){return this.controls[t]?this.controls[t]:(this.controls[t]=e,e.setParent(this),e._registerOnCollectionChange(this._onCollectionChange),e)}addControl(t,e,i={}){this.registerControl(t,e),this.updateValueAndValidity({emitEvent:i.emitEvent}),this._onCollectionChange()}removeControl(t,e={}){this.controls[t]&&this.controls[t]._registerOnCollectionChange(()=>{}),delete this.controls[t],this.updateValueAndValidity({emitEvent:e.emitEvent}),this._onCollectionChange()}setControl(t,e,i={}){this.controls[t]&&this.controls[t]._registerOnCollectionChange(()=>{}),delete this.controls[t],e&&this.registerControl(t,e),this.updateValueAndValidity({emitEvent:i.emitEvent}),this._onCollectionChange()}contains(t){return this.controls.hasOwnProperty(t)&&this.controls[t].enabled}setValue(t,e={}){QB(this,!0,t),Object.keys(t).forEach(i=>{XB(this,!0,i),this.controls[i].setValue(t[i],{onlySelf:!0,emitEvent:e.emitEvent})}),this.updateValueAndValidity(e)}patchValue(t,e={}){t!=null&&(Object.keys(t).forEach(i=>{let r=this.controls[i];r&&r.patchValue(t[i],{onlySelf:!0,emitEvent:e.emitEvent})}),this.updateValueAndValidity(e))}reset(t={},e={}){this._forEachChild((i,r)=>{i.reset(t?t[r]:null,$(b({},e),{onlySelf:!0}))}),this._updatePristine(e,this),this._updateTouched(e,this),this.updateValueAndValidity(e),e?.emitEvent!==!1&&this._events.next(new hh(this))}getRawValue(){return this._reduceChildren({},(t,e,i)=>(t[i]=e.getRawValue(),t))}_syncPendingControls(){let t=this._reduceChildren(!1,(e,i)=>i._syncPendingControls()?!0:e);return t&&this.updateValueAndValidity({onlySelf:!0}),t}_forEachChild(t){Object.keys(this.controls).forEach(e=>{let i=this.controls[e];i&&t(i,e)})}_setUpControls(){this._forEachChild(t=>{t.setParent(this),t._registerOnCollectionChange(this._onCollectionChange)})}_updateValue(){this.value=this._reduceValue()}_anyControls(t){for(let[e,i]of Object.entries(this.controls))if(this.contains(e)&&t(i))return!0;return!1}_reduceValue(){let t={};return this._reduceChildren(t,(e,i,r)=>((i.enabled||this.disabled)&&(e[r]=i.value),e))}_reduceChildren(t,e){let i=t;return this._forEachChild((r,o)=>{i=e(i,r,o)}),i}_allControlsDisabled(){for(let t of Object.keys(this.controls))if(this.controls[t].enabled)return!1;return Object.keys(this.controls).length>0||this.disabled}_find(t){return this.controls.hasOwnProperty(t)?this.controls[t]:null}};var GM=new C("",{factory:()=>qM}),qM="always";function Lb(n,t,e=qM){Hb(n,t),t.valueAccessor.writeValue(n.value),(n.disabled||e==="always")&&t.valueAccessor.setDisabledState?.(n.disabled),e2(n,t),n2(n,t),t2(n,t),JB(n,t)}function IM(n,t,e=!0){let i=()=>{};t?.valueAccessor?.registerOnChange(i),t?.valueAccessor?.registerOnTouched(i),vh(n,t),n&&(t._invokeOnDestroyCallbacks(),n._registerOnCollectionChange(()=>{}))}function yh(n,t){n.forEach(e=>{e.registerOnValidatorChange&&e.registerOnValidatorChange(t)})}function JB(n,t){if(t.valueAccessor.setDisabledState){let e=i=>{t.valueAccessor.setDisabledState(i)};n.registerOnDisabledChange(e),t._registerOnDestroy(()=>{n._unregisterOnDisabledChange(e)})}}function Hb(n,t){let e=HM(n);t.validator!==null?n.setValidators(xM(e,t.validator)):typeof e=="function"&&n.setValidators([e]);let i=$M(n);t.asyncValidator!==null?n.setAsyncValidators(xM(i,t.asyncValidator)):typeof i=="function"&&n.setAsyncValidators([i]);let r=()=>n.updateValueAndValidity();yh(t._rawValidators,r),yh(t._rawAsyncValidators,r)}function vh(n,t){let e=!1;if(n!==null){if(t.validator!==null){let r=HM(n);if(Array.isArray(r)&&r.length>0){let o=r.filter(s=>s!==t.validator);o.length!==r.length&&(e=!0,n.setValidators(o))}}if(t.asyncValidator!==null){let r=$M(n);if(Array.isArray(r)&&r.length>0){let o=r.filter(s=>s!==t.asyncValidator);o.length!==r.length&&(e=!0,n.setAsyncValidators(o))}}}let i=()=>{};return yh(t._rawValidators,i),yh(t._rawAsyncValidators,i),e}function e2(n,t){t.valueAccessor.registerOnChange(e=>{n._pendingValue=e,n._pendingChange=!0,n._pendingDirty=!0,n.updateOn==="change"&&KM(n,t)})}function t2(n,t){t.valueAccessor.registerOnTouched(()=>{n._pendingTouched=!0,n.updateOn==="blur"&&n._pendingChange&&KM(n,t),n.updateOn!=="submit"&&n.markAsTouched()})}function KM(n,t){n._pendingDirty&&n.markAsDirty(),n.setValue(n._pendingValue,{emitModelToViewChange:!1}),t.viewToModelUpdate(n._pendingValue),n._pendingChange=!1}function n2(n,t){let e=(i,r)=>{t.valueAccessor.writeValue(i),r&&t.viewToModelUpdate(i)};n.registerOnChange(e),t._registerOnDestroy(()=>{n._unregisterOnChange(e)})}function YM(n,t){n==null,Hb(n,t)}function i2(n,t){return vh(n,t)}function ZM(n,t){n._syncPendingControls(),t.forEach(e=>{let i=e.control;i.updateOn==="submit"&&i._pendingChange&&(e.viewToModelUpdate(i._pendingValue),i._pendingChange=!1)})}function r2(n,t){let e=n.indexOf(t);e>-1&&n.splice(e,1)}var o2={provide:Ga,useExisting:or(()=>$b)},ad=Promise.resolve(),$b=(()=>{class n extends Ga{callSetDisabledState;get submitted(){return Ae(this.submittedReactive)}_submitted=L(()=>this.submittedReactive());submittedReactive=P(!1);_directives=new Set;form;ngSubmit=new j;options;constructor(e,i,r){super(),this.callSetDisabledState=r,this.form=new gh({},jb(e),Ub(i))}ngAfterViewInit(){this._setUpdateStrategy()}get formDirective(){return this}get control(){return this.form}get path(){return[]}get controls(){return this.form.controls}addControl(e){ad.then(()=>{let i=this._findContainer(e.path);e.control=i.registerControl(e.name,e.control),Lb(e.control,e,this.callSetDisabledState),e.control.updateValueAndValidity({emitEvent:!1}),this._directives.add(e)})}getControl(e){return this.form.get(e.path)}removeControl(e){ad.then(()=>{this._findContainer(e.path)?.removeControl(e.name),this._directives.delete(e)})}addFormGroup(e){ad.then(()=>{let i=this._findContainer(e.path),r=new gh({});YM(r,e),i.registerControl(e.name,r),r.updateValueAndValidity({emitEvent:!1})})}removeFormGroup(e){ad.then(()=>{this._findContainer(e.path)?.removeControl?.(e.name)})}getFormGroup(e){return this.form.get(e.path)}updateModel(e,i){ad.then(()=>{this.form.get(e.path).setValue(i)})}setValue(e){this.control.setValue(e)}onSubmit(e){return this.submittedReactive.set(!0),ZM(this.form,this._directives),this.ngSubmit.emit(e),this.form._events.next(new ph(this.control)),e?.target?.method==="dialog"}onReset(){this.resetForm()}resetForm(e=void 0){this.form.reset(e),this.submittedReactive.set(!1)}_setUpdateStrategy(){this.options&&this.options.updateOn!=null&&(this.form._updateOn=this.options.updateOn)}_findContainer(e){return e.pop(),e.length?this.form.get(e):this.form}static \u0275fac=function(i){return new(i||n)(et(OM,10),et(RM,10),et(GM,8))};static \u0275dir=ie({type:n,selectors:[["form",3,"ngNoForm","",3,"formGroup","",3,"formArray",""],["ng-form"],["","ngForm",""]],hostBindings:function(i,r){i&1&&K("submit",function(s){return r.onSubmit(s)})("reset",function(){return r.onReset()})},inputs:{options:[0,"ngFormOptions","options"]},outputs:{ngSubmit:"ngSubmit"},exportAs:["ngForm"],standalone:!1,features:[Ct([o2]),Tt]})}return n})();function kM(n,t){let e=n.indexOf(t);e>-1&&n.splice(e,1)}function AM(n){return typeof n=="object"&&n!==null&&Object.keys(n).length===2&&"value"in n&&"disabled"in n}var s2=class extends mh{defaultValue=null;_onChange=[];_pendingValue;_pendingChange=!1;constructor(t=null,e,i){super(zM(e),WM(i,e)),this._applyFormState(t),this._setUpdateStrategy(e),this._initObservables(),this.updateValueAndValidity({onlySelf:!0,emitEvent:!!this.asyncValidator}),_h(e)&&(e.nonNullable||e.initialValueIsDefault)&&(AM(t)?this.defaultValue=t.value:this.defaultValue=t)}setValue(t,e={}){this.value=this._pendingValue=t,this._onChange.length&&e.emitModelToViewChange!==!1&&this._onChange.forEach(i=>i(this.value,e.emitViewToModelChange!==!1)),this.updateValueAndValidity(e)}patchValue(t,e={}){this.setValue(t,e)}reset(t=this.defaultValue,e={}){this._applyFormState(t),this.markAsPristine(e),this.markAsUntouched(e),this.setValue(this.value,e),e.overwriteDefaultValue&&(this.defaultValue=this.value),this._pendingChange=!1,e?.emitEvent!==!1&&this._events.next(new hh(this))}_updateValue(){}_anyControls(t){return!1}_allControlsDisabled(){return this.disabled}registerOnChange(t){this._onChange.push(t)}_unregisterOnChange(t){kM(this._onChange,t)}registerOnDisabledChange(t){this._onDisabledChange.push(t)}_unregisterOnDisabledChange(t){kM(this._onDisabledChange,t)}_forEachChild(t){}_syncPendingControls(){return this.updateOn==="submit"&&(this._pendingDirty&&this.markAsDirty(),this._pendingTouched&&this.markAsTouched(),this._pendingChange)?(this.setValue(this._pendingValue,{onlySelf:!0,emitModelToViewChange:!1}),!0):!1}_applyFormState(t){AM(t)?(this.value=this._pendingValue=t.value,t.disabled?this.disable({onlySelf:!0,emitEvent:!1}):this.enable({onlySelf:!0,emitEvent:!1})):this.value=this._pendingValue=t}};var a2=n=>n instanceof s2;var l2=(()=>{class n extends Ga{callSetDisabledState;get submitted(){return Ae(this._submittedReactive)}set submitted(e){this._submittedReactive.set(e)}_submitted=L(()=>this._submittedReactive());_submittedReactive=P(!1);_oldForm;_onCollectionChange=()=>this._updateDomValue();directives=[];constructor(e,i,r){super(),this.callSetDisabledState=r,this._setValidators(e),this._setAsyncValidators(i)}ngOnChanges(e){this.onChanges(e)}ngOnDestroy(){this.onDestroy()}onChanges(e){this._checkFormPresent(),e.hasOwnProperty("form")&&(this._updateValidators(),this._updateDomValue(),this._updateRegistrations(),this._oldForm=this.form)}onDestroy(){this.form&&(vh(this.form,this),this.form._onCollectionChange===this._onCollectionChange&&this.form._registerOnCollectionChange(()=>{}))}get formDirective(){return this}get path(){return[]}addControl(e){let i=this.form.get(e.path);return Lb(i,e,this.callSetDisabledState),i.updateValueAndValidity({emitEvent:!1}),this.directives.push(e),i}getControl(e){return this.form.get(e.path)}removeControl(e){IM(e.control||null,e,!1),r2(this.directives,e)}addFormGroup(e){this._setUpFormContainer(e)}removeFormGroup(e){this._cleanUpFormContainer(e)}getFormGroup(e){return this.form.get(e.path)}getFormArray(e){return this.form.get(e.path)}addFormArray(e){this._setUpFormContainer(e)}removeFormArray(e){this._cleanUpFormContainer(e)}updateModel(e,i){this.form.get(e.path).setValue(i)}onReset(){this.resetForm()}resetForm(e=void 0,i={}){this.form.reset(e,i),this._submittedReactive.set(!1)}onSubmit(e){return this.submitted=!0,ZM(this.form,this.directives),this.ngSubmit.emit(e),this.form._events.next(new ph(this.control)),e?.target?.method==="dialog"}_updateDomValue(){this.directives.forEach(e=>{let i=e.control,r=this.form.get(e.path);i!==r&&(IM(i||null,e),a2(r)&&(Lb(r,e,this.callSetDisabledState),e.control=r))}),this.form._updateTreeValidity({emitEvent:!1})}_setUpFormContainer(e){let i=this.form.get(e.path);YM(i,e),i.updateValueAndValidity({emitEvent:!1})}_cleanUpFormContainer(e){let i=this.form?.get(e.path);i&&i2(i,e)&&i.updateValueAndValidity({emitEvent:!1})}_updateRegistrations(){this.form._registerOnCollectionChange(this._onCollectionChange),this._oldForm?._registerOnCollectionChange(()=>{})}_updateValidators(){Hb(this.form,this),this._oldForm&&vh(this._oldForm,this)}_checkFormPresent(){this.form}static \u0275fac=function(i){return new(i||n)(et(OM,10),et(RM,10),et(GM,8))};static \u0275dir=ie({type:n,features:[Tt,It]})}return n})();var c2={provide:Ga,useExisting:or(()=>zb)},zb=(()=>{class n extends l2{form=null;ngSubmit=new j;get control(){return this.form}static \u0275fac=(()=>{let e;return function(r){return(e||(e=mn(n)))(r||n)}})();static \u0275dir=ie({type:n,selectors:[["","formGroup",""]],hostBindings:function(i,r){i&1&&K("submit",function(s){return r.onSubmit(s)})("reset",function(){return r.onReset()})},inputs:{form:[0,"formGroup","form"]},outputs:{ngSubmit:"ngSubmit"},exportAs:["ngForm"],standalone:!1,features:[Ct([c2]),Tt]})}return n})();var Wb=class{_box;_destroyed=new E;_resizeSubject=new E;_resizeObserver;_elementObservables=new Map;constructor(t){this._box=t,typeof ResizeObserver<"u"&&(this._resizeObserver=new ResizeObserver(e=>this._resizeSubject.next(e)))}observe(t){return this._elementObservables.has(t)||this._elementObservables.set(t,new q(e=>{let i=this._resizeSubject.subscribe(e);return this._resizeObserver?.observe(t,{box:this._box}),()=>{this._resizeObserver?.unobserve(t),i.unsubscribe(),this._elementObservables.delete(t)}}).pipe(Ce(e=>e.some(i=>i.target===t)),gl({bufferSize:1,refCount:!0}),ne(this._destroyed))),this._elementObservables.get(t)}destroy(){this._destroyed.next(),this._destroyed.complete(),this._resizeSubject.complete(),this._elementObservables.clear()}},bh=(()=>{class n{_cleanupErrorListener;_observers=new Map;_ngZone=f(U);constructor(){typeof ResizeObserver<"u"}ngOnDestroy(){for(let[,e]of this._observers)e.destroy();this._observers.clear(),this._cleanupErrorListener?.()}observe(e,i){let r=i?.box||"content-box";return this._observers.has(r)||this._observers.set(r,new Wb(r)),this._observers.get(r).observe(e)}static \u0275fac=function(i){return new(i||n)};static \u0275prov=D({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})();var d2=["notch"],u2=["matFormFieldNotchedOutline",""],f2=["*"],XM=["iconPrefixContainer"],QM=["textPrefixContainer"],JM=["iconSuffixContainer"],eI=["textSuffixContainer"],p2=["textField"],h2=["*",[["mat-label"]],[["","matPrefix",""],["","matIconPrefix",""]],[["","matTextPrefix",""]],[["","matTextSuffix",""]],[["","matSuffix",""],["","matIconSuffix",""]],[["mat-error"],["","matError",""]],[["mat-hint",3,"align","end"]],[["mat-hint","align","end"]]],m2=["*","mat-label","[matPrefix], [matIconPrefix]","[matTextPrefix]","[matTextSuffix]","[matSuffix], [matIconSuffix]","mat-error, [matError]","mat-hint:not([align='end'])","mat-hint[align='end']"];function g2(n,t){n&1&&_e(0,"span",21)}function y2(n,t){if(n&1&&(h(0,"label",20),ke(1,1),N(2,g2,1,0,"span",21),m()),n&2){let e=w(2);fe("floating",e._shouldLabelFloat())("monitorResize",e._hasOutline())("id",e._labelId),Fe("for",e._control.disableAutomaticLabeling?null:e._control.id),y(2),F(!e.hideRequiredMarker&&e._control.required?2:-1)}}function v2(n,t){if(n&1&&N(0,y2,3,5,"label",20),n&2){let e=w();F(e._hasFloatingLabel()?0:-1)}}function _2(n,t){n&1&&_e(0,"div",7)}function b2(n,t){}function C2(n,t){if(n&1&&Gt(0,b2,0,0,"ng-template",13),n&2){w(2);let e=bi(1);fe("ngTemplateOutlet",e)}}function D2(n,t){if(n&1&&(h(0,"div",9),N(1,C2,1,1,null,13),m()),n&2){let e=w();fe("matFormFieldNotchedOutlineOpen",e._shouldLabelFloat()),y(),F(e._forceDisplayInfixLabel()?-1:1)}}function E2(n,t){n&1&&(h(0,"div",10,2),ke(2,2),m())}function w2(n,t){n&1&&(h(0,"div",11,3),ke(2,3),m())}function S2(n,t){}function x2(n,t){if(n&1&&Gt(0,S2,0,0,"ng-template",13),n&2){w();let e=bi(1);fe("ngTemplateOutlet",e)}}function T2(n,t){n&1&&(h(0,"div",14,4),ke(2,4),m())}function M2(n,t){n&1&&(h(0,"div",15,5),ke(2,5),m())}function I2(n,t){n&1&&_e(0,"div",16)}function k2(n,t){n&1&&(h(0,"div",18),ke(1,6),m())}function A2(n,t){if(n&1&&(h(0,"mat-hint",22),v(1),m()),n&2){let e=w(2);fe("id",e._hintLabelId),y(),k(e.hintLabel)}}function O2(n,t){if(n&1&&(h(0,"div",19),N(1,A2,2,2,"mat-hint",22),ke(2,7),_e(3,"div",23),ke(4,8),m()),n&2){let e=w();y(),F(e.hintLabel?1:-1)}}var Gb=(()=>{class n{static \u0275fac=function(i){return new(i||n)};static \u0275dir=ie({type:n,selectors:[["mat-label"]]})}return n})(),R2=new C("MatError");var qb=(()=>{class n{align="start";id=f(Xt).getId("mat-mdc-hint-");static \u0275fac=function(i){return new(i||n)};static \u0275dir=ie({type:n,selectors:[["mat-hint"]],hostAttrs:[1,"mat-mdc-form-field-hint","mat-mdc-form-field-bottom-align"],hostVars:4,hostBindings:function(i,r){i&2&&(no("id",r.id),Fe("align",null),ce("mat-mdc-form-field-hint-end",r.align==="end"))},inputs:{align:"align",id:"id"}})}return n})(),P2=new C("MatPrefix");var N2=new C("MatSuffix");var aI=new C("FloatingLabelParent"),tI=(()=>{class n{_elementRef=f(Q);get floating(){return this._floating}set floating(e){this._floating=e,this.monitorResize&&this._handleResize()}_floating=!1;get monitorResize(){return this._monitorResize}set monitorResize(e){this._monitorResize=e,this._monitorResize?this._subscribeToResize():this._resizeSubscription.unsubscribe()}_monitorResize=!1;_resizeObserver=f(bh);_ngZone=f(U);_parent=f(aI);_resizeSubscription=new Z;constructor(){}ngOnDestroy(){this._resizeSubscription.unsubscribe()}getWidth(){return F2(this._elementRef.nativeElement)}get element(){return this._elementRef.nativeElement}_handleResize(){setTimeout(()=>this._parent._handleLabelResized())}_subscribeToResize(){this._resizeSubscription.unsubscribe(),this._ngZone.runOutsideAngular(()=>{this._resizeSubscription=this._resizeObserver.observe(this._elementRef.nativeElement,{box:"border-box"}).subscribe(()=>this._handleResize())})}static \u0275fac=function(i){return new(i||n)};static \u0275dir=ie({type:n,selectors:[["label","matFormFieldFloatingLabel",""]],hostAttrs:[1,"mdc-floating-label","mat-mdc-floating-label"],hostVars:2,hostBindings:function(i,r){i&2&&ce("mdc-floating-label--float-above",r.floating)},inputs:{floating:"floating",monitorResize:"monitorResize"}})}return n})();function F2(n){let t=n;if(t.offsetParent!==null)return t.scrollWidth;let e=t.cloneNode(!0);e.style.setProperty("position","absolute"),e.style.setProperty("transform","translate(-9999px, -9999px)"),document.documentElement.appendChild(e);let i=e.scrollWidth;return e.remove(),i}var nI="mdc-line-ripple--active",Ch="mdc-line-ripple--deactivating",iI=(()=>{class n{_elementRef=f(Q);_cleanupTransitionEnd;constructor(){let e=f(U),i=f(vt);e.runOutsideAngular(()=>{this._cleanupTransitionEnd=i.listen(this._elementRef.nativeElement,"transitionend",this._handleTransitionEnd)})}activate(){let e=this._elementRef.nativeElement.classList;e.remove(Ch),e.add(nI)}deactivate(){this._elementRef.nativeElement.classList.add(Ch)}_handleTransitionEnd=e=>{let i=this._elementRef.nativeElement.classList,r=i.contains(Ch);e.propertyName==="opacity"&&r&&i.remove(nI,Ch)};ngOnDestroy(){this._cleanupTransitionEnd()}static \u0275fac=function(i){return new(i||n)};static \u0275dir=ie({type:n,selectors:[["div","matFormFieldLineRipple",""]],hostAttrs:[1,"mdc-line-ripple"]})}return n})(),rI=(()=>{class n{_elementRef=f(Q);_ngZone=f(U);open=!1;_notch;ngAfterViewInit(){let e=this._elementRef.nativeElement,i=e.querySelector(".mdc-floating-label");i?(e.classList.add("mdc-notched-outline--upgraded"),typeof requestAnimationFrame=="function"&&(i.style.transitionDuration="0s",this._ngZone.runOutsideAngular(()=>{requestAnimationFrame(()=>i.style.transitionDuration="")}))):e.classList.add("mdc-notched-outline--no-label")}_setNotchWidth(e){let i=this._notch.nativeElement;!this.open||!e?i.style.width="":i.style.width=`calc(${e}px * var(--mat-mdc-form-field-floating-label-scale, 0.75) + 9px)`}_setMaxWidth(e){this._notch.nativeElement.style.setProperty("--mat-form-field-notch-max-width",`calc(100% - ${e}px)`)}static \u0275fac=function(i){return new(i||n)};static \u0275cmp=G({type:n,selectors:[["div","matFormFieldNotchedOutline",""]],viewQuery:function(i,r){if(i&1&&bt(d2,5),i&2){let o;J(o=ee())&&(r._notch=o.first)}},hostAttrs:[1,"mdc-notched-outline"],hostVars:2,hostBindings:function(i,r){i&2&&ce("mdc-notched-outline--notched",r.open)},inputs:{open:[0,"matFormFieldNotchedOutlineOpen","open"]},attrs:u2,ngContentSelectors:f2,decls:5,vars:0,consts:[["notch",""],[1,"mat-mdc-notch-piece","mdc-notched-outline__leading"],[1,"mat-mdc-notch-piece","mdc-notched-outline__notch"],[1,"mat-mdc-notch-piece","mdc-notched-outline__trailing"]],template:function(i,r){i&1&&(ht(),Xo(0,"div",1),gn(1,"div",2,0),ke(3),Zn(),Xo(4,"div",3))},encapsulation:2,changeDetection:0})}return n})(),Kb=(()=>{class n{value=null;stateChanges;id;placeholder;ngControl=null;focused=!1;empty=!1;shouldLabelFloat=!1;required=!1;disabled=!1;errorState=!1;controlType;autofilled;userAriaDescribedBy;disableAutomaticLabeling;describedByIds;static \u0275fac=function(i){return new(i||n)};static \u0275dir=ie({type:n})}return n})();var Yb=new C("MatFormField"),L2=new C("MAT_FORM_FIELD_DEFAULT_OPTIONS"),oI="fill",V2="auto",sI="fixed",B2="translateY(-50%)",lI=(()=>{class n{_elementRef=f(Q);_changeDetectorRef=f(tt);_platform=f(ze);_idGenerator=f(Xt);_ngZone=f(U);_defaults=f(L2,{optional:!0});_currentDirection;_textField;_iconPrefixContainer;_textPrefixContainer;_iconSuffixContainer;_textSuffixContainer;_floatingLabel;_notchedOutline;_lineRipple;_iconPrefixContainerSignal=ec("iconPrefixContainer");_textPrefixContainerSignal=ec("textPrefixContainer");_iconSuffixContainerSignal=ec("iconSuffixContainer");_textSuffixContainerSignal=ec("textSuffixContainer");_prefixSuffixContainers=L(()=>[this._iconPrefixContainerSignal(),this._textPrefixContainerSignal(),this._iconSuffixContainerSignal(),this._textSuffixContainerSignal()].map(e=>e?.nativeElement).filter(e=>e!==void 0));_formFieldControl;_prefixChildren;_suffixChildren;_errorChildren;_hintChildren;_labelChild=uS(Gb);get hideRequiredMarker(){return this._hideRequiredMarker}set hideRequiredMarker(e){this._hideRequiredMarker=Uc(e)}_hideRequiredMarker=!1;color="primary";get floatLabel(){return this._floatLabel||this._defaults?.floatLabel||V2}set floatLabel(e){e!==this._floatLabel&&(this._floatLabel=e,this._changeDetectorRef.markForCheck())}_floatLabel;get appearance(){return this._appearanceSignal()}set appearance(e){let i=e||this._defaults?.appearance||oI;this._appearanceSignal.set(i)}_appearanceSignal=P(oI);get subscriptSizing(){return this._subscriptSizing||this._defaults?.subscriptSizing||sI}set subscriptSizing(e){this._subscriptSizing=e||this._defaults?.subscriptSizing||sI}_subscriptSizing=null;get hintLabel(){return this._hintLabel}set hintLabel(e){this._hintLabel=e,this._processHints()}_hintLabel="";_hasIconPrefix=!1;_hasTextPrefix=!1;_hasIconSuffix=!1;_hasTextSuffix=!1;_labelId=this._idGenerator.getId("mat-mdc-form-field-label-");_hintLabelId=this._idGenerator.getId("mat-mdc-hint-");_describedByIds;get _control(){return this._explicitFormFieldControl||this._formFieldControl}set _control(e){this._explicitFormFieldControl=e}_destroyed=new E;_isFocused=null;_explicitFormFieldControl;_previousControl=null;_previousControlValidatorFn=null;_stateChanges;_valueChanges;_describedByChanges;_outlineLabelOffsetResizeObserver=null;_animationsDisabled=Ot();constructor(){let e=this._defaults,i=f(jt);e&&(e.appearance&&(this.appearance=e.appearance),this._hideRequiredMarker=!!e?.hideRequiredMarker,e.color&&(this.color=e.color)),fr(()=>this._currentDirection=i.valueSignal()),this._syncOutlineLabelOffset()}ngAfterViewInit(){this._updateFocusState(),this._animationsDisabled||this._ngZone.runOutsideAngular(()=>{setTimeout(()=>{this._elementRef.nativeElement.classList.add("mat-form-field-animations-enabled")},300)}),this._changeDetectorRef.detectChanges()}ngAfterContentInit(){this._assertFormFieldControl(),this._initializeSubscript(),this._initializePrefixAndSuffix()}ngAfterContentChecked(){this._assertFormFieldControl(),this._control!==this._previousControl&&(this._initializeControl(this._previousControl),this._control.ngControl&&this._control.ngControl.control&&(this._previousControlValidatorFn=this._control.ngControl.control.validator),this._previousControl=this._control),this._control.ngControl&&this._control.ngControl.control&&this._control.ngControl.control.validator!==this._previousControlValidatorFn&&this._changeDetectorRef.markForCheck()}ngOnDestroy(){this._outlineLabelOffsetResizeObserver?.disconnect(),this._stateChanges?.unsubscribe(),this._valueChanges?.unsubscribe(),this._describedByChanges?.unsubscribe(),this._destroyed.next(),this._destroyed.complete()}getLabelId=L(()=>this._hasFloatingLabel()?this._labelId:null);getConnectedOverlayOrigin(){return this._textField||this._elementRef}_animateAndLockLabel(){this._hasFloatingLabel()&&(this.floatLabel="always")}_initializeControl(e){let i=this._control,r="mat-mdc-form-field-type-";e&&this._elementRef.nativeElement.classList.remove(r+e.controlType),i.controlType&&this._elementRef.nativeElement.classList.add(r+i.controlType),this._stateChanges?.unsubscribe(),this._stateChanges=i.stateChanges.subscribe(()=>{this._updateFocusState(),this._changeDetectorRef.markForCheck()}),this._describedByChanges?.unsubscribe(),this._describedByChanges=i.stateChanges.pipe(dt([void 0,void 0]),ye(()=>[i.errorState,i.userAriaDescribedBy]),ml(),Ce(([[o,s],[a,l]])=>o!==a||s!==l)).subscribe(()=>this._syncDescribedByIds()),this._valueChanges?.unsubscribe(),i.ngControl&&i.ngControl.valueChanges&&(this._valueChanges=i.ngControl.valueChanges.pipe(ne(this._destroyed)).subscribe(()=>this._changeDetectorRef.markForCheck()))}_checkPrefixAndSuffixTypes(){this._hasIconPrefix=!!this._prefixChildren.find(e=>!e._isText),this._hasTextPrefix=!!this._prefixChildren.find(e=>e._isText),this._hasIconSuffix=!!this._suffixChildren.find(e=>!e._isText),this._hasTextSuffix=!!this._suffixChildren.find(e=>e._isText)}_initializePrefixAndSuffix(){this._checkPrefixAndSuffixTypes(),Jt(this._prefixChildren.changes,this._suffixChildren.changes).subscribe(()=>{this._checkPrefixAndSuffixTypes(),this._changeDetectorRef.markForCheck()})}_initializeSubscript(){this._hintChildren.changes.subscribe(()=>{this._processHints(),this._changeDetectorRef.markForCheck()}),this._errorChildren.changes.subscribe(()=>{this._syncDescribedByIds(),this._changeDetectorRef.markForCheck()}),this._validateHints(),this._syncDescribedByIds()}_assertFormFieldControl(){this._control}_updateFocusState(){let e=this._control.focused;e&&!this._isFocused?(this._isFocused=!0,this._lineRipple?.activate()):!e&&(this._isFocused||this._isFocused===null)&&(this._isFocused=!1,this._lineRipple?.deactivate()),this._elementRef.nativeElement.classList.toggle("mat-focused",e),this._textField?.nativeElement.classList.toggle("mdc-text-field--focused",e)}_syncOutlineLabelOffset(){hS({earlyRead:()=>{if(this._appearanceSignal()!=="outline")return this._outlineLabelOffsetResizeObserver?.disconnect(),null;if(globalThis.ResizeObserver){this._outlineLabelOffsetResizeObserver||=new globalThis.ResizeObserver(()=>{this._writeOutlinedLabelStyles(this._getOutlinedLabelOffset())});for(let e of this._prefixSuffixContainers())this._outlineLabelOffsetResizeObserver.observe(e,{box:"border-box"})}return this._getOutlinedLabelOffset()},write:e=>this._writeOutlinedLabelStyles(e())})}_shouldAlwaysFloat(){return this.floatLabel==="always"}_hasOutline(){return this.appearance==="outline"}_forceDisplayInfixLabel(){return!this._platform.isBrowser&&this._prefixChildren.length&&!this._shouldLabelFloat()}_hasFloatingLabel=L(()=>!!this._labelChild());_shouldLabelFloat(){return this._hasFloatingLabel()?this._control.shouldLabelFloat||this._shouldAlwaysFloat():!1}_shouldForward(e){let i=this._control?this._control.ngControl:null;return i&&i[e]}_getSubscriptMessageType(){return this._errorChildren&&this._errorChildren.length>0&&this._control.errorState?"error":"hint"}_handleLabelResized(){this._refreshOutlineNotchWidth()}_refreshOutlineNotchWidth(){!this._hasOutline()||!this._floatingLabel||!this._shouldLabelFloat()?this._notchedOutline?._setNotchWidth(0):this._notchedOutline?._setNotchWidth(this._floatingLabel.getWidth())}_processHints(){this._validateHints(),this._syncDescribedByIds()}_validateHints(){this._hintChildren}_syncDescribedByIds(){if(this._control){let e=[];if(this._control.userAriaDescribedBy&&typeof this._control.userAriaDescribedBy=="string"&&e.push(...this._control.userAriaDescribedBy.split(" ")),this._getSubscriptMessageType()==="hint"){let o=this._hintChildren?this._hintChildren.find(a=>a.align==="start"):null,s=this._hintChildren?this._hintChildren.find(a=>a.align==="end"):null;o?e.push(o.id):this._hintLabel&&e.push(this._hintLabelId),s&&e.push(s.id)}else this._errorChildren&&e.push(...this._errorChildren.map(o=>o.id));let i=this._control.describedByIds,r;if(i){let o=this._describedByIds||e;r=e.concat(i.filter(s=>s&&!o.includes(s)))}else r=e;this._control.setDescribedByIds(r),this._describedByIds=e}}_getOutlinedLabelOffset(){if(!this._hasOutline()||!this._floatingLabel)return null;if(!this._iconPrefixContainer&&!this._textPrefixContainer)return["",null];if(!this._isAttachedToDom())return null;let e=this._iconPrefixContainer?.nativeElement,i=this._textPrefixContainer?.nativeElement,r=this._iconSuffixContainer?.nativeElement,o=this._textSuffixContainer?.nativeElement,s=e?.getBoundingClientRect().width??0,a=i?.getBoundingClientRect().width??0,l=r?.getBoundingClientRect().width??0,c=o?.getBoundingClientRect().width??0,d=this._currentDirection==="rtl"?"-1":"1",u=`${s+a}px`,g=`calc(${d} * (${u} + var(--mat-mdc-form-field-label-offset-x, 0px)))`,_=`var(--mat-mdc-form-field-label-transform, ${B2} translateX(${g}))`,S=s+a+l+c;return[_,S]}_writeOutlinedLabelStyles(e){if(e!==null){let[i,r]=e;this._floatingLabel&&(this._floatingLabel.element.style.transform=i),r!==null&&this._notchedOutline?._setMaxWidth(r)}}_isAttachedToDom(){let e=this._elementRef.nativeElement;if(e.getRootNode){let i=e.getRootNode();return i&&i!==e}return document.documentElement.contains(e)}static \u0275fac=function(i){return new(i||n)};static \u0275cmp=G({type:n,selectors:[["mat-form-field"]],contentQueries:function(i,r,o){if(i&1&&(yf(o,r._labelChild,Gb,5),On(o,Kb,5)(o,P2,5)(o,N2,5)(o,R2,5)(o,qb,5)),i&2){_f();let s;J(s=ee())&&(r._formFieldControl=s.first),J(s=ee())&&(r._prefixChildren=s),J(s=ee())&&(r._suffixChildren=s),J(s=ee())&&(r._errorChildren=s),J(s=ee())&&(r._hintChildren=s)}},viewQuery:function(i,r){if(i&1&&(vf(r._iconPrefixContainerSignal,XM,5)(r._textPrefixContainerSignal,QM,5)(r._iconSuffixContainerSignal,JM,5)(r._textSuffixContainerSignal,eI,5),bt(p2,5)(XM,5)(QM,5)(JM,5)(eI,5)(tI,5)(rI,5)(iI,5)),i&2){_f(4);let o;J(o=ee())&&(r._textField=o.first),J(o=ee())&&(r._iconPrefixContainer=o.first),J(o=ee())&&(r._textPrefixContainer=o.first),J(o=ee())&&(r._iconSuffixContainer=o.first),J(o=ee())&&(r._textSuffixContainer=o.first),J(o=ee())&&(r._floatingLabel=o.first),J(o=ee())&&(r._notchedOutline=o.first),J(o=ee())&&(r._lineRipple=o.first)}},hostAttrs:[1,"mat-mdc-form-field"],hostVars:38,hostBindings:function(i,r){i&2&&ce("mat-mdc-form-field-label-always-float",r._shouldAlwaysFloat())("mat-mdc-form-field-has-icon-prefix",r._hasIconPrefix)("mat-mdc-form-field-has-icon-suffix",r._hasIconSuffix)("mat-form-field-invalid",r._control.errorState)("mat-form-field-disabled",r._control.disabled)("mat-form-field-autofilled",r._control.autofilled)("mat-form-field-appearance-fill",r.appearance=="fill")("mat-form-field-appearance-outline",r.appearance=="outline")("mat-form-field-hide-placeholder",r._hasFloatingLabel()&&!r._shouldLabelFloat())("mat-primary",r.color!=="accent"&&r.color!=="warn")("mat-accent",r.color==="accent")("mat-warn",r.color==="warn")("ng-untouched",r._shouldForward("untouched"))("ng-touched",r._shouldForward("touched"))("ng-pristine",r._shouldForward("pristine"))("ng-dirty",r._shouldForward("dirty"))("ng-valid",r._shouldForward("valid"))("ng-invalid",r._shouldForward("invalid"))("ng-pending",r._shouldForward("pending"))},inputs:{hideRequiredMarker:"hideRequiredMarker",color:"color",floatLabel:"floatLabel",appearance:"appearance",subscriptSizing:"subscriptSizing",hintLabel:"hintLabel"},exportAs:["matFormField"],features:[Ct([{provide:Yb,useExisting:n},{provide:aI,useExisting:n}])],ngContentSelectors:m2,decls:18,vars:21,consts:[["labelTemplate",""],["textField",""],["iconPrefixContainer",""],["textPrefixContainer",""],["textSuffixContainer",""],["iconSuffixContainer",""],[1,"mat-mdc-text-field-wrapper","mdc-text-field",3,"click"],[1,"mat-mdc-form-field-focus-overlay"],[1,"mat-mdc-form-field-flex"],["matFormFieldNotchedOutline","",3,"matFormFieldNotchedOutlineOpen"],[1,"mat-mdc-form-field-icon-prefix"],[1,"mat-mdc-form-field-text-prefix"],[1,"mat-mdc-form-field-infix"],[3,"ngTemplateOutlet"],[1,"mat-mdc-form-field-text-suffix"],[1,"mat-mdc-form-field-icon-suffix"],["matFormFieldLineRipple",""],["aria-atomic","true","aria-live","polite",1,"mat-mdc-form-field-subscript-wrapper","mat-mdc-form-field-bottom-align"],[1,"mat-mdc-form-field-error-wrapper"],[1,"mat-mdc-form-field-hint-wrapper"],["matFormFieldFloatingLabel","",3,"floating","monitorResize","id"],["aria-hidden","true",1,"mat-mdc-form-field-required-marker","mdc-floating-label--required"],[3,"id"],[1,"mat-mdc-form-field-hint-spacer"]],template:function(i,r){if(i&1&&(ht(h2),Gt(0,v2,1,1,"ng-template",null,0,Zy),h(2,"div",6,1),K("click",function(s){return r._control.onContainerClick(s)}),N(4,_2,1,0,"div",7),h(5,"div",8),N(6,D2,2,2,"div",9),N(7,E2,3,0,"div",10),N(8,w2,3,0,"div",11),h(9,"div",12),N(10,x2,1,1,null,13),ke(11),m(),N(12,T2,3,0,"div",14),N(13,M2,3,0,"div",15),m(),N(14,I2,1,0,"div",16),m(),h(15,"div",17),N(16,k2,2,0,"div",18)(17,O2,5,1,"div",19),m()),i&2){let o;y(2),ce("mdc-text-field--filled",!r._hasOutline())("mdc-text-field--outlined",r._hasOutline())("mdc-text-field--no-label",!r._hasFloatingLabel())("mdc-text-field--disabled",r._control.disabled)("mdc-text-field--invalid",r._control.errorState),y(2),F(!r._hasOutline()&&!r._control.disabled?4:-1),y(2),F(r._hasOutline()?6:-1),y(),F(r._hasIconPrefix?7:-1),y(),F(r._hasTextPrefix?8:-1),y(2),F(!r._hasOutline()||r._forceDisplayInfixLabel()?10:-1),y(2),F(r._hasTextSuffix?12:-1),y(),F(r._hasIconSuffix?13:-1),y(),F(r._hasOutline()?-1:14),y(),ce("mat-mdc-form-field-subscript-dynamic-size",r.subscriptSizing==="dynamic");let s=r._getSubscriptMessageType();y(),F((o=s)==="error"?16:o==="hint"?17:-1)}},dependencies:[tI,rI,yv,iI,qb],styles:[`.mdc-text-field {
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
`],encapsulation:2,changeDetection:0})}return n})();var li=(function(n){return n[n.FADING_IN=0]="FADING_IN",n[n.VISIBLE=1]="VISIBLE",n[n.FADING_OUT=2]="FADING_OUT",n[n.HIDDEN=3]="HIDDEN",n})(li||{}),Zb=class{_renderer;element;config;_animationForciblyDisabledThroughCss;state=li.HIDDEN;constructor(t,e,i,r=!1){this._renderer=t,this.element=e,this.config=i,this._animationForciblyDisabledThroughCss=r}fadeOut(){this._renderer.fadeOutRipple(this)}},cI=Ba({passive:!0,capture:!0}),Xb=class{_events=new Map;addHandler(t,e,i,r){let o=this._events.get(e);if(o){let s=o.get(i);s?s.add(r):o.set(i,new Set([r]))}else this._events.set(e,new Map([[i,new Set([r])]])),t.runOutsideAngular(()=>{document.addEventListener(e,this._delegateEventHandler,cI)})}removeHandler(t,e,i){let r=this._events.get(t);if(!r)return;let o=r.get(e);o&&(o.delete(i),o.size===0&&r.delete(e),r.size===0&&(this._events.delete(t),document.removeEventListener(t,this._delegateEventHandler,cI)))}_delegateEventHandler=t=>{let e=un(t);e&&this._events.get(t.type)?.forEach((i,r)=>{(r===e||r.contains(e))&&i.forEach(o=>o.handleEvent(t))})}},dI={enterDuration:225,exitDuration:150},j2=800,uI=Ba({passive:!0,capture:!0}),fI=["mousedown","touchstart"],pI=["mouseup","mouseleave","touchend","touchcancel"],U2=(()=>{class n{static \u0275fac=function(i){return new(i||n)};static \u0275cmp=G({type:n,selectors:[["ng-component"]],hostAttrs:["mat-ripple-style-loader",""],decls:0,vars:0,template:function(i,r){},styles:[`.mat-ripple {
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
`],encapsulation:2,changeDetection:0})}return n})(),Qb=class n{_target;_ngZone;_platform;_containerElement;_triggerElement=null;_isPointerDown=!1;_activeRipples=new Map;_mostRecentTransientRipple=null;_lastTouchStartEvent;_pointerUpEventsRegistered=!1;_containerRect=null;static _eventManager=new Xb;constructor(t,e,i,r,o){this._target=t,this._ngZone=e,this._platform=r,r.isBrowser&&(this._containerElement=si(i)),o&&o.get(wn).load(U2)}fadeInRipple(t,e,i={}){let r=this._containerRect=this._containerRect||this._containerElement.getBoundingClientRect(),o=b(b({},dI),i.animation);i.centered&&(t=r.left+r.width/2,e=r.top+r.height/2);let s=i.radius||H2(t,e,r),a=t-r.left,l=e-r.top,c=o.enterDuration,d=document.createElement("div");d.classList.add("mat-ripple-element"),d.style.left=`${a-s}px`,d.style.top=`${l-s}px`,d.style.height=`${s*2}px`,d.style.width=`${s*2}px`,i.color!=null&&(d.style.backgroundColor=i.color),d.style.transitionDuration=`${c}ms`,this._containerElement.appendChild(d);let u=window.getComputedStyle(d),p=u.transitionProperty,g=u.transitionDuration,_=p==="none"||g==="0s"||g==="0s, 0s"||r.width===0&&r.height===0,S=new Zb(this,d,i,_);d.style.transform="scale3d(1, 1, 1)",S.state=li.FADING_IN,i.persistent||(this._mostRecentTransientRipple=S);let O=null;return!_&&(c||o.exitDuration)&&this._ngZone.runOutsideAngular(()=>{let V=()=>{O&&(O.fallbackTimer=null),clearTimeout(it),this._finishRippleTransition(S)},Ee=()=>this._destroyRipple(S),it=setTimeout(Ee,c+100);d.addEventListener("transitionend",V),d.addEventListener("transitioncancel",Ee),O={onTransitionEnd:V,onTransitionCancel:Ee,fallbackTimer:it}}),this._activeRipples.set(S,O),(_||!c)&&this._finishRippleTransition(S),S}fadeOutRipple(t){if(t.state===li.FADING_OUT||t.state===li.HIDDEN)return;let e=t.element,i=b(b({},dI),t.config.animation);e.style.transitionDuration=`${i.exitDuration}ms`,e.style.opacity="0",t.state=li.FADING_OUT,(t._animationForciblyDisabledThroughCss||!i.exitDuration)&&this._finishRippleTransition(t)}fadeOutAll(){this._getActiveRipples().forEach(t=>t.fadeOut())}fadeOutAllNonPersistent(){this._getActiveRipples().forEach(t=>{t.config.persistent||t.fadeOut()})}setupTriggerEvents(t){let e=si(t);!this._platform.isBrowser||!e||e===this._triggerElement||(this._removeTriggerEvents(),this._triggerElement=e,fI.forEach(i=>{n._eventManager.addHandler(this._ngZone,i,e,this)}))}handleEvent(t){t.type==="mousedown"?this._onMousedown(t):t.type==="touchstart"?this._onTouchStart(t):this._onPointerUp(),this._pointerUpEventsRegistered||(this._ngZone.runOutsideAngular(()=>{pI.forEach(e=>{this._triggerElement.addEventListener(e,this,uI)})}),this._pointerUpEventsRegistered=!0)}_finishRippleTransition(t){t.state===li.FADING_IN?this._startFadeOutTransition(t):t.state===li.FADING_OUT&&this._destroyRipple(t)}_startFadeOutTransition(t){let e=t===this._mostRecentTransientRipple,{persistent:i}=t.config;t.state=li.VISIBLE,!i&&(!e||!this._isPointerDown)&&t.fadeOut()}_destroyRipple(t){let e=this._activeRipples.get(t)??null;this._activeRipples.delete(t),this._activeRipples.size||(this._containerRect=null),t===this._mostRecentTransientRipple&&(this._mostRecentTransientRipple=null),t.state=li.HIDDEN,e!==null&&(t.element.removeEventListener("transitionend",e.onTransitionEnd),t.element.removeEventListener("transitioncancel",e.onTransitionCancel),e.fallbackTimer!==null&&clearTimeout(e.fallbackTimer)),t.element.remove()}_onMousedown(t){let e=ms(t),i=this._lastTouchStartEvent&&Date.now()<this._lastTouchStartEvent+j2;!this._target.rippleDisabled&&!e&&!i&&(this._isPointerDown=!0,this.fadeInRipple(t.clientX,t.clientY,this._target.rippleConfig))}_onTouchStart(t){if(!this._target.rippleDisabled&&!gs(t)){this._lastTouchStartEvent=Date.now(),this._isPointerDown=!0;let e=t.changedTouches;if(e)for(let i=0;i<e.length;i++)this.fadeInRipple(e[i].clientX,e[i].clientY,this._target.rippleConfig)}}_onPointerUp(){this._isPointerDown&&(this._isPointerDown=!1,this._getActiveRipples().forEach(t=>{let e=t.state===li.VISIBLE||t.config.terminateOnPointerUp&&t.state===li.FADING_IN;!t.config.persistent&&e&&t.fadeOut()}))}_getActiveRipples(){return Array.from(this._activeRipples.keys())}_removeTriggerEvents(){let t=this._triggerElement;t&&(fI.forEach(e=>n._eventManager.removeHandler(e,t,this)),this._pointerUpEventsRegistered&&(pI.forEach(e=>t.removeEventListener(e,this,uI)),this._pointerUpEventsRegistered=!1))}};function H2(n,t,e){let i=Math.max(Math.abs(n-e.left),Math.abs(n-e.right)),r=Math.max(Math.abs(t-e.top),Math.abs(t-e.bottom));return Math.sqrt(i*i+r*r)}var hI=new C("mat-ripple-global-options"),Ss=(()=>{class n{_elementRef=f(Q);_animationsDisabled=Ot();color;unbounded=!1;centered=!1;radius=0;animation;get disabled(){return this._disabled}set disabled(e){e&&this.fadeOutAllNonPersistent(),this._disabled=e,this._setupTriggerEventsIfEnabled()}_disabled=!1;get trigger(){return this._trigger||this._elementRef.nativeElement}set trigger(e){this._trigger=e,this._setupTriggerEventsIfEnabled()}_trigger;_rippleRenderer;_globalOptions;_isInitialized=!1;constructor(){let e=f(U),i=f(ze),r=f(hI,{optional:!0}),o=f(le);this._globalOptions=r||{},this._rippleRenderer=new Qb(this,e,this._elementRef,i,o)}ngOnInit(){this._isInitialized=!0,this._setupTriggerEventsIfEnabled()}ngOnDestroy(){this._rippleRenderer._removeTriggerEvents()}fadeOutAll(){this._rippleRenderer.fadeOutAll()}fadeOutAllNonPersistent(){this._rippleRenderer.fadeOutAllNonPersistent()}get rippleConfig(){return{centered:this.centered,radius:this.radius,color:this.color,animation:b(b(b({},this._globalOptions.animation),this._animationsDisabled?{enterDuration:0,exitDuration:0}:{}),this.animation),terminateOnPointerUp:this._globalOptions.terminateOnPointerUp}}get rippleDisabled(){return this.disabled||!!this._globalOptions.disabled}_setupTriggerEventsIfEnabled(){!this.disabled&&this._isInitialized&&this._rippleRenderer.setupTriggerEvents(this.trigger)}launch(e,i=0,r){return typeof e=="number"?this._rippleRenderer.fadeInRipple(e,i,b(b({},this.rippleConfig),r)):this._rippleRenderer.fadeInRipple(0,0,b(b({},this.rippleConfig),e))}static \u0275fac=function(i){return new(i||n)};static \u0275dir=ie({type:n,selectors:[["","mat-ripple",""],["","matRipple",""]],hostAttrs:[1,"mat-ripple"],hostVars:2,hostBindings:function(i,r){i&2&&ce("mat-ripple-unbounded",r.unbounded)},inputs:{color:[0,"matRippleColor","color"],unbounded:[0,"matRippleUnbounded","unbounded"],centered:[0,"matRippleCentered","centered"],radius:[0,"matRippleRadius","radius"],animation:[0,"matRippleAnimation","animation"],disabled:[0,"matRippleDisabled","disabled"],trigger:[0,"matRippleTrigger","trigger"]},exportAs:["matRipple"]})}return n})();var mI=(()=>{class n{_animationsDisabled=Ot();state="unchecked";disabled=!1;appearance="full";constructor(){}static \u0275fac=function(i){return new(i||n)};static \u0275cmp=G({type:n,selectors:[["mat-pseudo-checkbox"]],hostAttrs:[1,"mat-pseudo-checkbox"],hostVars:12,hostBindings:function(i,r){i&2&&ce("mat-pseudo-checkbox-indeterminate",r.state==="indeterminate")("mat-pseudo-checkbox-checked",r.state==="checked")("mat-pseudo-checkbox-disabled",r.disabled)("mat-pseudo-checkbox-minimal",r.appearance==="minimal")("mat-pseudo-checkbox-full",r.appearance==="full")("_mat-animation-noopable",r._animationsDisabled)},inputs:{state:"state",disabled:"disabled",appearance:"appearance"},decls:0,vars:0,template:function(i,r){},styles:[`.mat-pseudo-checkbox {
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
`],encapsulation:2,changeDetection:0})}return n})();var qa=(()=>{class n{static \u0275fac=function(i){return new(i||n)};static \u0275cmp=G({type:n,selectors:[["structural-styles"]],decls:0,vars:0,template:function(i,r){},styles:[`.mat-focus-indicator {
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
`],encapsulation:2,changeDetection:0})}return n})();var $2=["text"],z2=[[["mat-icon"]],"*"],W2=["mat-icon","*"];function G2(n,t){if(n&1&&_e(0,"mat-pseudo-checkbox",1),n&2){let e=w();fe("disabled",e.disabled)("state",e.selected?"checked":"unchecked")}}function q2(n,t){if(n&1&&_e(0,"mat-pseudo-checkbox",3),n&2){let e=w();fe("disabled",e.disabled)}}function K2(n,t){if(n&1&&(h(0,"span",4),v(1),m()),n&2){let e=w();y(),Ze("(",e.group.label,")")}}var eC=new C("MAT_OPTION_PARENT_COMPONENT"),tC=new C("MatOptgroup");var Jb=class{source;isUserInput;constructor(t,e=!1){this.source=t,this.isUserInput=e}},Ka=(()=>{class n{_element=f(Q);_changeDetectorRef=f(tt);_parent=f(eC,{optional:!0});group=f(tC,{optional:!0});_signalDisableRipple=!1;_selected=!1;_active=!1;_mostRecentViewValue="";get multiple(){return this._parent&&this._parent.multiple}get selected(){return this._selected}value;id=f(Xt).getId("mat-option-");get disabled(){return this.group&&this.group.disabled||this._disabled()}set disabled(e){this._disabled.set(e)}_disabled=P(!1);get disableRipple(){return this._signalDisableRipple?this._parent.disableRipple():!!this._parent?.disableRipple}get hideSingleSelectionIndicator(){return!!(this._parent&&this._parent.hideSingleSelectionIndicator)}onSelectionChange=new j;_text;_stateChanges=new E;constructor(){let e=f(wn);e.load(qa),e.load(zc),this._signalDisableRipple=!!this._parent&&Zo(this._parent.disableRipple)}get active(){return this._active}get viewValue(){return(this._text?.nativeElement.textContent||"").trim()}select(e=!0){this._selected||(this._selected=!0,this._changeDetectorRef.markForCheck(),e&&this._emitSelectionChangeEvent())}deselect(e=!0){this._selected&&(this._selected=!1,this._changeDetectorRef.markForCheck(),e&&this._emitSelectionChangeEvent())}focus(e,i){let r=this._getHostElement();typeof r.focus=="function"&&r.focus(i)}setActiveStyles(){this._active||(this._active=!0,this._changeDetectorRef.markForCheck())}setInactiveStyles(){this._active&&(this._active=!1,this._changeDetectorRef.markForCheck())}getLabel(){return this.viewValue}_handleKeydown(e){(e.keyCode===13||e.keyCode===32)&&!Zt(e)&&(this._selectViaInteraction(),e.preventDefault())}_selectViaInteraction(){this.disabled||(this._selected=this.multiple?!this._selected:!0,this._changeDetectorRef.markForCheck(),this._emitSelectionChangeEvent(!0))}_getTabIndex(){return this.disabled?"-1":"0"}_getHostElement(){return this._element.nativeElement}ngAfterViewChecked(){if(this._selected){let e=this.viewValue;e!==this._mostRecentViewValue&&(this._mostRecentViewValue&&this._stateChanges.next(),this._mostRecentViewValue=e)}}ngOnDestroy(){this._stateChanges.complete()}_emitSelectionChangeEvent(e=!1){this.onSelectionChange.emit(new Jb(this,e))}static \u0275fac=function(i){return new(i||n)};static \u0275cmp=G({type:n,selectors:[["mat-option"]],viewQuery:function(i,r){if(i&1&&bt($2,7),i&2){let o;J(o=ee())&&(r._text=o.first)}},hostAttrs:["role","option",1,"mat-mdc-option","mdc-list-item"],hostVars:11,hostBindings:function(i,r){i&1&&K("click",function(){return r._selectViaInteraction()})("keydown",function(s){return r._handleKeydown(s)}),i&2&&(no("id",r.id),Fe("aria-selected",r.selected)("aria-disabled",r.disabled.toString()),ce("mdc-list-item--selected",r.selected)("mat-mdc-option-multiple",r.multiple)("mat-mdc-option-active",r.active)("mdc-list-item--disabled",r.disabled))},inputs:{value:"value",id:"id",disabled:[2,"disabled","disabled",de]},outputs:{onSelectionChange:"onSelectionChange"},exportAs:["matOption"],ngContentSelectors:W2,decls:8,vars:5,consts:[["text",""],["aria-hidden","true",1,"mat-mdc-option-pseudo-checkbox",3,"disabled","state"],[1,"mdc-list-item__primary-text"],["state","checked","aria-hidden","true","appearance","minimal",1,"mat-mdc-option-pseudo-checkbox",3,"disabled"],[1,"cdk-visually-hidden"],["aria-hidden","true","mat-ripple","",1,"mat-mdc-option-ripple","mat-focus-indicator",3,"matRippleTrigger","matRippleDisabled"]],template:function(i,r){i&1&&(ht(z2),N(0,G2,1,2,"mat-pseudo-checkbox",1),ke(1),h(2,"span",2,0),ke(4,1),m(),N(5,q2,1,1,"mat-pseudo-checkbox",3),N(6,K2,2,1,"span",4),_e(7,"div",5)),i&2&&(F(r.multiple?0:-1),y(5),F(!r.multiple&&r.selected&&!r.hideSingleSelectionIndicator?5:-1),y(),F(r.group&&r.group._inert?6:-1),y(),fe("matRippleTrigger",r._getHostElement())("matRippleDisabled",r.disabled||r.disableRipple))},dependencies:[mI,Ss],styles:[`.mat-mdc-option {
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
`],encapsulation:2,changeDetection:0})}return n})();function gI(n,t,e){if(e.length){let i=t.toArray(),r=e.toArray(),o=0;for(let s=0;s<n+1;s++)i[s].group&&i[s].group===r[o]&&o++;return o}return 0}function yI(n,t,e,i){return n<e?n:n+t>e+i?Math.max(0,n-i+t):e}var vI=(()=>{class n{isErrorState(e,i){return!!(e&&e.invalid&&(e.touched||i&&i.submitted))}static \u0275fac=function(i){return new(i||n)};static \u0275prov=D({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})();var Dh=class{_defaultMatcher;ngControl;_parentFormGroup;_parentForm;_stateChanges;errorState=!1;matcher;constructor(t,e,i,r,o){this._defaultMatcher=t,this.ngControl=e,this._parentFormGroup=i,this._parentForm=r,this._stateChanges=o}updateErrorState(){let t=this.errorState,e=this._parentFormGroup||this._parentForm,i=this.matcher||this._defaultMatcher,r=this.ngControl?this.ngControl.control:null,o=i?.isErrorState(r,e)??!1;o!==t&&(this.errorState=o,this._stateChanges.next())}};var _I=(()=>{class n{static \u0275fac=function(i){return new(i||n)};static \u0275mod=De({type:n});static \u0275inj=be({imports:[jp,lI,gt]})}return n})();var Eh=(()=>{class n{static \u0275fac=function(i){return new(i||n)};static \u0275mod=De({type:n});static \u0275inj=be({imports:[gt]})}return n})();var bI=(()=>{class n{static \u0275fac=function(i){return new(i||n)};static \u0275mod=De({type:n});static \u0275inj=be({imports:[gt]})}return n})();var nC=(()=>{class n{static \u0275fac=function(i){return new(i||n)};static \u0275mod=De({type:n});static \u0275inj=be({imports:[Eh,bI,Ka,gt]})}return n})();var Y2=["trigger"],Z2=["panel"],X2=[[["mat-select-trigger"]],"*"],Q2=["mat-select-trigger","*"];function J2(n,t){if(n&1&&(h(0,"span",4),v(1),m()),n&2){let e=w();y(),k(e.placeholder)}}function ej(n,t){n&1&&ke(0)}function tj(n,t){if(n&1&&(h(0,"span",11),v(1),m()),n&2){let e=w(2);y(),k(e.triggerValue)}}function nj(n,t){if(n&1&&(h(0,"span",5),N(1,ej,1,0)(2,tj,2,1,"span",11),m()),n&2){let e=w();y(),F(e.customTrigger?1:2)}}function ij(n,t){if(n&1){let e=_t();h(0,"div",12,1),K("keydown",function(r){Le(e);let o=w();return Ve(o._handleKeydown(r))}),ke(2,1),m()}if(n&2){let e=w();Rn(e.panelClass),ce("mat-select-panel-animations-enabled",!e._animationsDisabled)("mat-primary",(e._parentFormField==null?null:e._parentFormField.color)==="primary")("mat-accent",(e._parentFormField==null?null:e._parentFormField.color)==="accent")("mat-warn",(e._parentFormField==null?null:e._parentFormField.color)==="warn")("mat-undefined",!(e._parentFormField!=null&&e._parentFormField.color)),Fe("id",e.id+"-panel")("aria-multiselectable",e.multiple)("aria-label",e.ariaLabel||null)("aria-labelledby",e._getPanelAriaLabelledby())}}var rj=new C("mat-select-scroll-strategy",{providedIn:"root",factory:()=>{let n=f(le);return()=>Ar(n)}}),oj=new C("MAT_SELECT_CONFIG"),sj=new C("MatSelectTrigger"),iC=class{source;value;constructor(t,e){this.source=t,this.value=e}},CI=(()=>{class n{_viewportRuler=f(ai);_changeDetectorRef=f(tt);_elementRef=f(Q);_dir=f(jt,{optional:!0});_idGenerator=f(Xt);_renderer=f(vt);_parentFormField=f(Yb,{optional:!0});ngControl=f(uh,{self:!0,optional:!0});_liveAnnouncer=f(Cb);_defaultOptions=f(oj,{optional:!0});_animationsDisabled=Ot();_popoverLocation;_initialized=new E;_cleanupDetach;options;optionGroups;customTrigger;_positions=[{originX:"start",originY:"bottom",overlayX:"start",overlayY:"top"},{originX:"end",originY:"bottom",overlayX:"end",overlayY:"top"},{originX:"start",originY:"top",overlayX:"start",overlayY:"bottom",panelClass:"mat-mdc-select-panel-above"},{originX:"end",originY:"top",overlayX:"end",overlayY:"bottom",panelClass:"mat-mdc-select-panel-above"}];_scrollOptionIntoView(e){let i=this.options.toArray()[e];if(i){let r=this.panel.nativeElement,o=gI(e,this.options,this.optionGroups),s=i._getHostElement();e===0&&o===1?r.scrollTop=0:r.scrollTop=yI(s.offsetTop,s.offsetHeight,r.scrollTop,r.offsetHeight)}}_positioningSettled(){this._scrollOptionIntoView(this._keyManager.activeItemIndex||0)}_getChangeEvent(e){return new iC(this,e)}_scrollStrategyFactory=f(rj);_panelOpen=!1;_compareWith=(e,i)=>e===i;_uid=this._idGenerator.getId("mat-select-");_triggerAriaLabelledBy=null;_previousControl;_destroy=new E;_errorStateTracker;stateChanges=new E;disableAutomaticLabeling=!0;userAriaDescribedBy;_selectionModel;_keyManager;_preferredOverlayOrigin;_overlayWidth;_onChange=()=>{};_onTouched=()=>{};_valueId=this._idGenerator.getId("mat-select-value-");_scrollStrategy;_overlayPanelClass=this._defaultOptions?.overlayPanelClass||"";get focused(){return this._focused||this._panelOpen}_focused=!1;controlType="mat-select";trigger;panel;_overlayDir;panelClass;disabled=!1;get disableRipple(){return this._disableRipple()}set disableRipple(e){this._disableRipple.set(e)}_disableRipple=P(!1);tabIndex=0;get hideSingleSelectionIndicator(){return this._hideSingleSelectionIndicator}set hideSingleSelectionIndicator(e){this._hideSingleSelectionIndicator=e,this._syncParentProperties()}_hideSingleSelectionIndicator=this._defaultOptions?.hideSingleSelectionIndicator??!1;get placeholder(){return this._placeholder}set placeholder(e){this._placeholder=e,this.stateChanges.next()}_placeholder;get required(){return this._required??this.ngControl?.control?.hasValidator(lh.required)??!1}set required(e){this._required=e,this.stateChanges.next()}_required;get multiple(){return this._multiple}set multiple(e){this._selectionModel,this._multiple=e}_multiple=!1;disableOptionCentering=this._defaultOptions?.disableOptionCentering??!1;get compareWith(){return this._compareWith}set compareWith(e){this._compareWith=e,this._selectionModel&&this._initializeSelection()}get value(){return this._value}set value(e){this._assignValue(e)&&this._onChange(e)}_value;ariaLabel="";ariaLabelledby;get errorStateMatcher(){return this._errorStateTracker.matcher}set errorStateMatcher(e){this._errorStateTracker.matcher=e}typeaheadDebounceInterval;sortComparator;get id(){return this._id}set id(e){this._id=e||this._uid,this.stateChanges.next()}_id;get errorState(){return this._errorStateTracker.errorState}set errorState(e){this._errorStateTracker.errorState=e}panelWidth=this._defaultOptions&&typeof this._defaultOptions.panelWidth<"u"?this._defaultOptions.panelWidth:"auto";canSelectNullableOptions=this._defaultOptions?.canSelectNullableOptions??!1;optionSelectionChanges=ko(()=>{let e=this.options;return e?e.changes.pipe(dt(e),ut(()=>Jt(...e.map(i=>i.onSelectionChange)))):this._initialized.pipe(ut(()=>this.optionSelectionChanges))});openedChange=new j;_openedStream=this.openedChange.pipe(Ce(e=>e),ye(()=>{}));_closedStream=this.openedChange.pipe(Ce(e=>!e),ye(()=>{}));selectionChange=new j;valueChange=new j;constructor(){let e=f(vI),i=f($b,{optional:!0}),r=f(zb,{optional:!0}),o=f(new Jo("tabindex"),{optional:!0}),s=f(id,{optional:!0});this.ngControl&&(this.ngControl.valueAccessor=this),this._defaultOptions?.typeaheadDebounceInterval!=null&&(this.typeaheadDebounceInterval=this._defaultOptions.typeaheadDebounceInterval),this._errorStateTracker=new Dh(e,this.ngControl,r,i,this.stateChanges),this._scrollStrategy=this._scrollStrategyFactory(),this.tabIndex=o==null?0:parseInt(o)||0,this._popoverLocation=s?.usePopover===!1?null:"inline",this.id=this.id}ngOnInit(){this._selectionModel=new rd(this.multiple),this.stateChanges.next(),this._viewportRuler.change().pipe(ne(this._destroy)).subscribe(()=>{this.panelOpen&&(this._overlayWidth=this._getOverlayWidth(this._preferredOverlayOrigin),this._changeDetectorRef.detectChanges())})}ngAfterContentInit(){this._initialized.next(),this._initialized.complete(),this._initKeyManager(),this._selectionModel.changed.pipe(ne(this._destroy)).subscribe(e=>{e.added.forEach(i=>i.select()),e.removed.forEach(i=>i.deselect())}),this.options.changes.pipe(dt(null),ne(this._destroy)).subscribe(()=>{this._resetOptions(),this._initializeSelection()})}ngDoCheck(){let e=this._getTriggerAriaLabelledby(),i=this.ngControl;if(e!==this._triggerAriaLabelledBy){let r=this._elementRef.nativeElement;this._triggerAriaLabelledBy=e,e?r.setAttribute("aria-labelledby",e):r.removeAttribute("aria-labelledby")}i&&(this._previousControl!==i.control&&(this._previousControl!==void 0&&i.disabled!==null&&i.disabled!==this.disabled&&(this.disabled=i.disabled),this._previousControl=i.control),this.updateErrorState())}ngOnChanges(e){(e.disabled||e.userAriaDescribedBy)&&this.stateChanges.next(),e.typeaheadDebounceInterval&&this._keyManager&&this._keyManager.withTypeAhead(this.typeaheadDebounceInterval),e.panelClass&&this.panelClass instanceof Set&&(this.panelClass=Array.from(this.panelClass))}ngOnDestroy(){this._cleanupDetach?.(),this._keyManager?.destroy(),this._destroy.next(),this._destroy.complete(),this.stateChanges.complete(),this._clearFromModal()}toggle(){this.panelOpen?this.close():this.open()}open(){this._canOpen()&&(this._parentFormField&&(this._preferredOverlayOrigin=this._parentFormField.getConnectedOverlayOrigin()),this._cleanupDetach?.(),this._overlayWidth=this._getOverlayWidth(this._preferredOverlayOrigin),this._applyModalPanelOwnership(),this._panelOpen=!0,this._overlayDir.positionChange.pipe(yt(1)).subscribe(()=>{this._changeDetectorRef.detectChanges(),this._positioningSettled()}),this._overlayDir.attachOverlay(),this._keyManager.withHorizontalOrientation(null),this._highlightCorrectOption(),this._changeDetectorRef.markForCheck(),this.stateChanges.next(),Promise.resolve().then(()=>this.openedChange.emit(!0)))}_trackedModal=null;_applyModalPanelOwnership(){let e=this._elementRef.nativeElement.closest('body > .cdk-overlay-container [aria-modal="true"]');if(!e)return;let i=`${this.id}-panel`;this._trackedModal&&zp(this._trackedModal,"aria-owns",i),xb(e,"aria-owns",i),this._trackedModal=e}_clearFromModal(){if(!this._trackedModal)return;let e=`${this.id}-panel`;zp(this._trackedModal,"aria-owns",e),this._trackedModal=null}close(){this._panelOpen&&(this._panelOpen=!1,this._exitAndDetach(),this._keyManager.withHorizontalOrientation(this._isRtl()?"rtl":"ltr"),this._changeDetectorRef.markForCheck(),this._onTouched(),this.stateChanges.next(),Promise.resolve().then(()=>this.openedChange.emit(!1)))}_exitAndDetach(){if(this._animationsDisabled||!this.panel){this._detachOverlay();return}this._cleanupDetach?.(),this._cleanupDetach=()=>{i(),clearTimeout(r),this._cleanupDetach=void 0};let e=this.panel.nativeElement,i=this._renderer.listen(e,"animationend",o=>{o.animationName==="_mat-select-exit"&&(this._cleanupDetach?.(),this._detachOverlay())}),r=setTimeout(()=>{this._cleanupDetach?.(),this._detachOverlay()},200);e.classList.add("mat-select-panel-exit")}_detachOverlay(){this._overlayDir.detachOverlay(),this._changeDetectorRef.markForCheck()}writeValue(e){this._assignValue(e)}registerOnChange(e){this._onChange=e}registerOnTouched(e){this._onTouched=e}setDisabledState(e){this.disabled=e,this._changeDetectorRef.markForCheck(),this.stateChanges.next()}get panelOpen(){return this._panelOpen}get selected(){return this.multiple?this._selectionModel?.selected||[]:this._selectionModel?.selected[0]}get triggerValue(){if(this.empty)return"";if(this._multiple){let e=this._selectionModel.selected.map(i=>i.viewValue);return this._isRtl()&&e.reverse(),e.join(", ")}return this._selectionModel.selected[0].viewValue}updateErrorState(){this._errorStateTracker.updateErrorState()}_isRtl(){return this._dir?this._dir.value==="rtl":!1}_handleKeydown(e){this.disabled||(this.panelOpen?this._handleOpenKeydown(e):this._handleClosedKeydown(e))}_handleClosedKeydown(e){let i=e.keyCode,r=i===40||i===38||i===37||i===39,o=i===13||i===32,s=this._keyManager;if(!s.isTyping()&&o&&!Zt(e)||(this.multiple||e.altKey)&&r)e.preventDefault(),this.open();else if(!this.multiple){let a=this.selected;s.onKeydown(e);let l=this.selected;l&&a!==l&&this._liveAnnouncer.announce(l.viewValue,1e4)}}_handleOpenKeydown(e){let i=this._keyManager,r=e.keyCode,o=r===40||r===38,s=i.isTyping();if(o&&e.altKey)e.preventDefault(),this.close();else if(!s&&(r===13||r===32)&&i.activeItem&&!Zt(e))e.preventDefault(),i.activeItem._selectViaInteraction();else if(!s&&this._multiple&&r===65&&e.ctrlKey){e.preventDefault();let a=this.options.some(l=>!l.disabled&&!l.selected);this.options.forEach(l=>{l.disabled||(a?l.select():l.deselect())})}else{let a=i.activeItemIndex;i.onKeydown(e),this._multiple&&o&&e.shiftKey&&i.activeItem&&i.activeItemIndex!==a&&i.activeItem._selectViaInteraction()}}_handleOverlayKeydown(e){e.keyCode===27&&!Zt(e)&&(e.preventDefault(),this.close())}_onFocus(){this.disabled||(this._focused=!0,this.stateChanges.next())}_onBlur(){this._focused=!1,this._keyManager?.cancelTypeahead(),!this.disabled&&!this.panelOpen&&(this._onTouched(),this._changeDetectorRef.markForCheck(),this.stateChanges.next())}get empty(){return!this._selectionModel||this._selectionModel.isEmpty()}_initializeSelection(){Promise.resolve().then(()=>{this.ngControl&&(this._value=this.ngControl.value),this._setSelectionByValue(this._value),this.stateChanges.next()})}_setSelectionByValue(e){if(this.options.forEach(i=>i.setInactiveStyles()),this._selectionModel.clear(),this.multiple&&e)Array.isArray(e),e.forEach(i=>this._selectOptionByValue(i)),this._sortValues();else{let i=this._selectOptionByValue(e);i?this._keyManager.updateActiveItem(i):this.panelOpen||this._keyManager.updateActiveItem(-1)}this._changeDetectorRef.markForCheck()}_selectOptionByValue(e){let i=this.options.find(r=>{if(this._selectionModel.isSelected(r))return!1;try{return(r.value!=null||this.canSelectNullableOptions)&&this._compareWith(r.value,e)}catch{return!1}});return i&&this._selectionModel.select(i),i}_assignValue(e){return e!==this._value||this._multiple&&Array.isArray(e)?(this.options&&this._setSelectionByValue(e),this._value=e,!0):!1}_skipPredicate=e=>this.panelOpen?!1:e.disabled;_getOverlayWidth(e){return this.panelWidth==="auto"?(e instanceof Ha?e.elementRef:e||this._elementRef).nativeElement.getBoundingClientRect().width:this.panelWidth===null?"":this.panelWidth}_syncParentProperties(){if(this.options)for(let e of this.options)e._changeDetectorRef.markForCheck()}_initKeyManager(){this._keyManager=new Yc(this.options).withTypeAhead(this.typeaheadDebounceInterval).withVerticalOrientation().withHorizontalOrientation(this._isRtl()?"rtl":"ltr").withHomeAndEnd().withPageUpDown().withAllowedModifierKeys(["shiftKey"]).skipPredicate(this._skipPredicate),this._keyManager.tabOut.subscribe(()=>{this.panelOpen&&(!this.multiple&&this._keyManager.activeItem&&this._keyManager.activeItem._selectViaInteraction(),this.focus(),this.close())}),this._keyManager.change.subscribe(()=>{this._panelOpen&&this.panel?this._scrollOptionIntoView(this._keyManager.activeItemIndex||0):!this._panelOpen&&!this.multiple&&this._keyManager.activeItem&&this._keyManager.activeItem._selectViaInteraction()})}_resetOptions(){let e=Jt(this.options.changes,this._destroy);this.optionSelectionChanges.pipe(ne(e)).subscribe(i=>{this._onSelect(i.source,i.isUserInput),i.isUserInput&&!this.multiple&&this._panelOpen&&(this.close(),this.focus())}),Jt(...this.options.map(i=>i._stateChanges)).pipe(ne(e)).subscribe(()=>{this._changeDetectorRef.detectChanges(),this.stateChanges.next()})}_onSelect(e,i){let r=this._selectionModel.isSelected(e);!this.canSelectNullableOptions&&e.value==null&&!this._multiple?(e.deselect(),this._selectionModel.clear(),this.value!=null&&this._propagateChanges(e.value)):(r!==e.selected&&(e.selected?this._selectionModel.select(e):this._selectionModel.deselect(e)),i&&this._keyManager.setActiveItem(e),this.multiple&&(this._sortValues(),i&&this.focus())),r!==this._selectionModel.isSelected(e)&&this._propagateChanges(),this.stateChanges.next()}_sortValues(){if(this.multiple){let e=this.options.toArray();this._selectionModel.sort((i,r)=>this.sortComparator?this.sortComparator(i,r,e):e.indexOf(i)-e.indexOf(r)),this.stateChanges.next()}}_propagateChanges(e){let i;this.multiple?i=this.selected.map(r=>r.value):i=this.selected?this.selected.value:e,this._value=i,this.valueChange.emit(i),this._onChange(i),this.selectionChange.emit(this._getChangeEvent(i)),this._changeDetectorRef.markForCheck()}_highlightCorrectOption(){if(this._keyManager)if(this.empty){let e=-1;for(let i=0;i<this.options.length;i++)if(!this.options.get(i).disabled){e=i;break}this._keyManager.setActiveItem(e)}else this._keyManager.setActiveItem(this._selectionModel.selected[0])}_canOpen(){return!this._panelOpen&&!this.disabled&&this.options?.length>0&&!!this._overlayDir}focus(e){this._elementRef.nativeElement.focus(e)}_getPanelAriaLabelledby(){if(this.ariaLabel)return null;let e=this._parentFormField?.getLabelId()||null,i=e?e+" ":"";return this.ariaLabelledby?i+this.ariaLabelledby:e}_getAriaActiveDescendant(){return this.panelOpen&&this._keyManager&&this._keyManager.activeItem?this._keyManager.activeItem.id:null}_getTriggerAriaLabelledby(){if(this.ariaLabel)return null;let e=this._parentFormField?.getLabelId()||"";return this.ariaLabelledby&&(e+=" "+this.ariaLabelledby),e||(e=this._valueId),e}get describedByIds(){return this._elementRef.nativeElement.getAttribute("aria-describedby")?.split(" ")||[]}setDescribedByIds(e){let i=this._elementRef.nativeElement;e.length?i.setAttribute("aria-describedby",e.join(" ")):i.removeAttribute("aria-describedby")}onContainerClick(e){let i=un(e);i&&(i.tagName==="MAT-OPTION"||i.classList.contains("cdk-overlay-backdrop")||i.closest(".mat-mdc-select-panel"))||(this.focus(),this.open())}get shouldLabelFloat(){return this.panelOpen||!this.empty||this.focused&&!!this.placeholder}static \u0275fac=function(i){return new(i||n)};static \u0275cmp=G({type:n,selectors:[["mat-select"]],contentQueries:function(i,r,o){if(i&1&&On(o,sj,5)(o,Ka,5)(o,tC,5),i&2){let s;J(s=ee())&&(r.customTrigger=s.first),J(s=ee())&&(r.options=s),J(s=ee())&&(r.optionGroups=s)}},viewQuery:function(i,r){if(i&1&&bt(Y2,5)(Z2,5)(nh,5),i&2){let o;J(o=ee())&&(r.trigger=o.first),J(o=ee())&&(r.panel=o.first),J(o=ee())&&(r._overlayDir=o.first)}},hostAttrs:["role","combobox","aria-haspopup","listbox",1,"mat-mdc-select"],hostVars:21,hostBindings:function(i,r){i&1&&K("keydown",function(s){return r._handleKeydown(s)})("focus",function(){return r._onFocus()})("blur",function(){return r._onBlur()}),i&2&&(Fe("id",r.id)("tabindex",r.disabled?-1:r.tabIndex)("aria-controls",r.panelOpen?r.id+"-panel":null)("aria-expanded",r.panelOpen)("aria-label",r.ariaLabel||null)("aria-required",r.required.toString())("aria-disabled",r.disabled.toString())("aria-invalid",r.errorState)("aria-activedescendant",r._getAriaActiveDescendant()),ce("mat-mdc-select-disabled",r.disabled)("mat-mdc-select-invalid",r.errorState)("mat-mdc-select-required",r.required)("mat-mdc-select-empty",r.empty)("mat-mdc-select-multiple",r.multiple)("mat-select-open",r.panelOpen))},inputs:{userAriaDescribedBy:[0,"aria-describedby","userAriaDescribedBy"],panelClass:"panelClass",disabled:[2,"disabled","disabled",de],disableRipple:[2,"disableRipple","disableRipple",de],tabIndex:[2,"tabIndex","tabIndex",e=>e==null?0:es(e)],hideSingleSelectionIndicator:[2,"hideSingleSelectionIndicator","hideSingleSelectionIndicator",de],placeholder:"placeholder",required:[2,"required","required",de],multiple:[2,"multiple","multiple",de],disableOptionCentering:[2,"disableOptionCentering","disableOptionCentering",de],compareWith:"compareWith",value:"value",ariaLabel:[0,"aria-label","ariaLabel"],ariaLabelledby:[0,"aria-labelledby","ariaLabelledby"],errorStateMatcher:"errorStateMatcher",typeaheadDebounceInterval:[2,"typeaheadDebounceInterval","typeaheadDebounceInterval",es],sortComparator:"sortComparator",id:"id",panelWidth:"panelWidth",canSelectNullableOptions:[2,"canSelectNullableOptions","canSelectNullableOptions",de]},outputs:{openedChange:"openedChange",_openedStream:"opened",_closedStream:"closed",selectionChange:"selectionChange",valueChange:"valueChange"},exportAs:["matSelect"],features:[Ct([{provide:Kb,useExisting:n},{provide:eC,useExisting:n}]),It],ngContentSelectors:Q2,decls:11,vars:10,consts:[["fallbackOverlayOrigin","cdkOverlayOrigin","trigger",""],["panel",""],["cdk-overlay-origin","",1,"mat-mdc-select-trigger",3,"click"],[1,"mat-mdc-select-value"],[1,"mat-mdc-select-placeholder","mat-mdc-select-min-line"],[1,"mat-mdc-select-value-text"],[1,"mat-mdc-select-arrow-wrapper"],[1,"mat-mdc-select-arrow"],["viewBox","0 0 24 24","width","24px","height","24px","focusable","false","aria-hidden","true"],["d","M7 10l5 5 5-5z"],["cdk-connected-overlay","","cdkConnectedOverlayHasBackdrop","","cdkConnectedOverlayBackdropClass","cdk-overlay-transparent-backdrop",3,"detach","backdropClick","overlayKeydown","cdkConnectedOverlayDisableClose","cdkConnectedOverlayPanelClass","cdkConnectedOverlayScrollStrategy","cdkConnectedOverlayOrigin","cdkConnectedOverlayPositions","cdkConnectedOverlayWidth","cdkConnectedOverlayFlexibleDimensions","cdkConnectedOverlayUsePopover"],[1,"mat-mdc-select-min-line"],["role","listbox","tabindex","-1",1,"mat-mdc-select-panel","mdc-menu-surface","mdc-menu-surface--open",3,"keydown"]],template:function(i,r){if(i&1&&(ht(X2),h(0,"div",2,0),K("click",function(){return r.open()}),h(3,"div",3),N(4,J2,2,1,"span",4)(5,nj,3,1,"span",5),m(),h(6,"div",6)(7,"div",7),hi(),h(8,"svg",8),_e(9,"path",9),m()()()(),Gt(10,ij,3,16,"ng-template",10),K("detach",function(){return r.close()})("backdropClick",function(){return r.close()})("overlayKeydown",function(s){return r._handleOverlayKeydown(s)})),i&2){let o=bi(1);y(3),Fe("id",r._valueId),y(),F(r.empty?4:5),y(6),fe("cdkConnectedOverlayDisableClose",!0)("cdkConnectedOverlayPanelClass",r._overlayPanelClass)("cdkConnectedOverlayScrollStrategy",r._scrollStrategy)("cdkConnectedOverlayOrigin",r._preferredOverlayOrigin||o)("cdkConnectedOverlayPositions",r._positions)("cdkConnectedOverlayWidth",r._overlayWidth)("cdkConnectedOverlayFlexibleDimensions",!0)("cdkConnectedOverlayUsePopover",r._popoverLocation)}},dependencies:[Ha,nh],styles:[`@keyframes _mat-select-enter {
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
`],encapsulation:2,changeDetection:0})}return n})();var DI=(()=>{class n{static \u0275fac=function(i){return new(i||n)};static \u0275mod=De({type:n});static \u0275inj=be({imports:[Es,nC,gt,kr,_I,nC]})}return n})();var lC=["*"];function lj(n,t){n&1&&ke(0)}var cj=["tabListContainer"],dj=["tabList"],uj=["tabListInner"],fj=["nextPaginator"],pj=["previousPaginator"],hj=["content"];function mj(n,t){}var gj=["tabBodyWrapper"],yj=["tabHeader"];function vj(n,t){}function _j(n,t){if(n&1&&Gt(0,vj,0,0,"ng-template",12),n&2){let e=w().$implicit;fe("cdkPortalOutlet",e.templateLabel)}}function bj(n,t){if(n&1&&v(0),n&2){let e=w().$implicit;k(e.textLabel)}}function Cj(n,t){if(n&1){let e=_t();h(0,"div",7,2),K("click",function(){let r=Le(e),o=r.$implicit,s=r.$index,a=w(),l=bi(1);return Ve(a._handleClick(o,l,s))})("cdkFocusChange",function(r){let o=Le(e).$index,s=w();return Ve(s._tabFocusChanged(r,o))}),_e(2,"span",8)(3,"div",9),h(4,"span",10)(5,"span",11),N(6,_j,1,1,null,12)(7,bj,1,1),m()()()}if(n&2){let e=t.$implicit,i=t.$index,r=bi(1),o=w();Rn(e.labelClass),ce("mdc-tab--active",o.selectedIndex===i),fe("id",o._getTabLabelId(e,i))("disabled",e.disabled)("fitInkBarToContent",o.fitInkBarToContent),Fe("tabIndex",o._getTabIndex(i))("aria-posinset",i+1)("aria-setsize",o._tabs.length)("aria-controls",o._getTabContentId(i))("aria-selected",o.selectedIndex===i)("aria-label",e.ariaLabel||null)("aria-labelledby",!e.ariaLabel&&e.ariaLabelledby?e.ariaLabelledby:null),y(3),fe("matRippleTrigger",r)("matRippleDisabled",e.disabled||o.disableRipple),y(3),F(e.templateLabel?6:7)}}function Dj(n,t){n&1&&ke(0)}function Ej(n,t){if(n&1){let e=_t();h(0,"mat-tab-body",13),K("_onCentered",function(){Le(e);let r=w();return Ve(r._removeTabBodyWrapperHeight())})("_onCentering",function(r){Le(e);let o=w();return Ve(o._setTabBodyWrapperHeight(r))})("_beforeCentering",function(r){Le(e);let o=w();return Ve(o._bodyCentered(r))}),m()}if(n&2){let e=t.$implicit,i=t.$index,r=w();Rn(e.bodyClass),fe("id",r._getTabContentId(i))("content",e.content)("position",e.position)("animationDuration",r.animationDuration)("preserveContent",r.preserveContent),Fe("tabindex",r.contentTabIndex!=null&&r.selectedIndex===i?r.contentTabIndex:null)("aria-labelledby",r._getTabLabelId(e,i))("aria-hidden",r.selectedIndex!==i)}}var wj=new C("MatTabContent"),Sj=(()=>{class n{template=f(Mt);constructor(){}static \u0275fac=function(i){return new(i||n)};static \u0275dir=ie({type:n,selectors:[["","matTabContent",""]],features:[Ct([{provide:wj,useExisting:n}])]})}return n})(),xj=new C("MatTabLabel"),xI=new C("MAT_TAB"),cC=(()=>{class n extends tM{_closestTab=f(xI,{optional:!0});static \u0275fac=(()=>{let e;return function(r){return(e||(e=mn(n)))(r||n)}})();static \u0275dir=ie({type:n,selectors:[["","mat-tab-label",""],["","matTabLabel",""]],features:[Ct([{provide:xj,useExisting:n}]),Tt]})}return n})(),TI=new C("MAT_TAB_GROUP"),dC=(()=>{class n{_viewContainerRef=f(pt);_closestTabGroup=f(TI,{optional:!0});disabled=!1;get templateLabel(){return this._templateLabel}set templateLabel(e){this._setTemplateLabelInput(e)}_templateLabel;_explicitContent=void 0;_implicitContent;textLabel="";ariaLabel;ariaLabelledby;labelClass;bodyClass;id=null;_contentPortal=null;get content(){return this._contentPortal}_stateChanges=new E;position=null;origin=null;isActive=!1;constructor(){f(wn).load(qa)}ngOnChanges(e){(e.hasOwnProperty("textLabel")||e.hasOwnProperty("disabled"))&&this._stateChanges.next()}ngOnDestroy(){this._stateChanges.complete()}ngOnInit(){this._contentPortal=new qi(this._explicitContent||this._implicitContent,this._viewContainerRef)}_setTemplateLabelInput(e){e&&e._closestTab===this&&(this._templateLabel=e)}static \u0275fac=function(i){return new(i||n)};static \u0275cmp=G({type:n,selectors:[["mat-tab"]],contentQueries:function(i,r,o){if(i&1&&On(o,cC,5)(o,Sj,7,Mt),i&2){let s;J(s=ee())&&(r.templateLabel=s.first),J(s=ee())&&(r._explicitContent=s.first)}},viewQuery:function(i,r){if(i&1&&bt(Mt,7),i&2){let o;J(o=ee())&&(r._implicitContent=o.first)}},hostAttrs:["hidden",""],hostVars:1,hostBindings:function(i,r){i&2&&Fe("id",null)},inputs:{disabled:[2,"disabled","disabled",de],textLabel:[0,"label","textLabel"],ariaLabel:[0,"aria-label","ariaLabel"],ariaLabelledby:[0,"aria-labelledby","ariaLabelledby"],labelClass:"labelClass",bodyClass:"bodyClass",id:"id"},exportAs:["matTab"],features:[Ct([{provide:xI,useExisting:n}]),It],ngContentSelectors:lC,decls:1,vars:0,template:function(i,r){i&1&&(ht(),la(0,lj,1,0,"ng-template"))},encapsulation:2})}return n})(),rC="mdc-tab-indicator--active",EI="mdc-tab-indicator--no-transition",oC=class{_items;_currentItem;constructor(t){this._items=t}hide(){this._items.forEach(t=>t.deactivateInkBar()),this._currentItem=void 0}alignToElement(t){let e=this._items.find(r=>r.elementRef.nativeElement===t),i=this._currentItem;if(e!==i&&(i?.deactivateInkBar(),e)){let r=i?.elementRef.nativeElement.getBoundingClientRect?.();e.activateInkBar(r),this._currentItem=e}}},Tj=(()=>{class n{_elementRef=f(Q);_inkBarElement=null;_inkBarContentElement=null;_fitToContent=!1;get fitInkBarToContent(){return this._fitToContent}set fitInkBarToContent(e){this._fitToContent!==e&&(this._fitToContent=e,this._inkBarElement&&this._appendInkBarElement())}activateInkBar(e){let i=this._elementRef.nativeElement;if(!e||!i.getBoundingClientRect||!this._inkBarContentElement){i.classList.add(rC);return}let r=i.getBoundingClientRect(),o=e.width/r.width,s=e.left-r.left;i.classList.add(EI),this._inkBarContentElement.style.setProperty("transform",`translateX(${s}px) scaleX(${o})`),i.getBoundingClientRect(),i.classList.remove(EI),i.classList.add(rC),this._inkBarContentElement.style.setProperty("transform","")}deactivateInkBar(){this._elementRef.nativeElement.classList.remove(rC)}ngOnInit(){this._createInkBarElement()}ngOnDestroy(){this._inkBarElement?.remove(),this._inkBarElement=this._inkBarContentElement=null}_createInkBarElement(){let e=this._elementRef.nativeElement.ownerDocument||document,i=this._inkBarElement=e.createElement("span"),r=this._inkBarContentElement=e.createElement("span");i.className="mdc-tab-indicator",r.className="mdc-tab-indicator__content mdc-tab-indicator__content--underline",i.appendChild(this._inkBarContentElement),this._appendInkBarElement()}_appendInkBarElement(){this._inkBarElement;let e=this._fitToContent?this._elementRef.nativeElement.querySelector(".mdc-tab__content"):this._elementRef.nativeElement;e.appendChild(this._inkBarElement)}static \u0275fac=function(i){return new(i||n)};static \u0275dir=ie({type:n,inputs:{fitInkBarToContent:[2,"fitInkBarToContent","fitInkBarToContent",de]}})}return n})();var MI=(()=>{class n extends Tj{elementRef=f(Q);disabled=!1;focus(){this.elementRef.nativeElement.focus()}getOffsetLeft(){return this.elementRef.nativeElement.offsetLeft}getOffsetWidth(){return this.elementRef.nativeElement.offsetWidth}static \u0275fac=(()=>{let e;return function(r){return(e||(e=mn(n)))(r||n)}})();static \u0275dir=ie({type:n,selectors:[["","matTabLabelWrapper",""]],hostVars:3,hostBindings:function(i,r){i&2&&(Fe("aria-disabled",!!r.disabled),ce("mat-mdc-tab-disabled",r.disabled))},inputs:{disabled:[2,"disabled","disabled",de]},features:[Tt]})}return n})(),wI={passive:!0},Mj=650,Ij=100,kj=(()=>{class n{_elementRef=f(Q);_changeDetectorRef=f(tt);_viewportRuler=f(ai);_dir=f(jt,{optional:!0});_ngZone=f(U);_platform=f(ze);_sharedResizeObserver=f(bh);_injector=f(le);_renderer=f(vt);_animationsDisabled=Ot();_eventCleanups;_scrollDistance=0;_selectedIndexChanged=!1;_destroyed=new E;_showPaginationControls=!1;_disableScrollAfter=!0;_disableScrollBefore=!0;_tabLabelCount;_scrollDistanceChanged=!1;_keyManager;_currentTextContent;_stopScrolling=new E;disablePagination=!1;get selectedIndex(){return this._selectedIndex}set selectedIndex(e){let i=isNaN(e)?0:e;this._selectedIndex!=i&&(this._selectedIndexChanged=!0,this._selectedIndex=i,this._keyManager&&this._keyManager.updateActiveItem(i))}_selectedIndex=0;selectFocusedIndex=new j;indexFocused=new j;constructor(){this._eventCleanups=this._ngZone.runOutsideAngular(()=>[this._renderer.listen(this._elementRef.nativeElement,"mouseleave",()=>this._stopInterval())])}ngAfterViewInit(){this._eventCleanups.push(this._renderer.listen(this._previousPaginator.nativeElement,"touchstart",()=>this._handlePaginatorPress("before"),wI),this._renderer.listen(this._nextPaginator.nativeElement,"touchstart",()=>this._handlePaginatorPress("after"),wI))}ngAfterContentInit(){let e=this._dir?this._dir.change:A("ltr"),i=this._sharedResizeObserver.observe(this._elementRef.nativeElement).pipe(er(32),ne(this._destroyed)),r=this._viewportRuler.change(150).pipe(ne(this._destroyed)),o=()=>{this.updatePagination(),this._alignInkBarToSelectedTab()};this._keyManager=new vs(this._items).withHorizontalOrientation(this._getLayoutDirection()).withHomeAndEnd().withWrap().skipPredicate(()=>!1),this._keyManager.updateActiveItem(Math.max(this._selectedIndex,0)),xt(o,{injector:this._injector}),Jt(e,r,i,this._items.changes,this._itemsResized()).pipe(ne(this._destroyed)).subscribe(()=>{this._ngZone.run(()=>{Promise.resolve().then(()=>{this._scrollDistance=Math.max(0,Math.min(this._getMaxScrollDistance(),this._scrollDistance)),o()})}),this._keyManager?.withHorizontalOrientation(this._getLayoutDirection())}),this._keyManager.change.subscribe(s=>{this.indexFocused.emit(s),this._setTabFocus(s)})}_itemsResized(){return typeof ResizeObserver!="function"?He:this._items.changes.pipe(dt(this._items),ut(e=>new q(i=>this._ngZone.runOutsideAngular(()=>{let r=new ResizeObserver(o=>i.next(o));return e.forEach(o=>r.observe(o.elementRef.nativeElement)),()=>{r.disconnect()}}))),Ao(1),Ce(e=>e.some(i=>i.contentRect.width>0&&i.contentRect.height>0)))}ngAfterContentChecked(){this._tabLabelCount!=this._items.length&&(this.updatePagination(),this._tabLabelCount=this._items.length,this._changeDetectorRef.markForCheck()),this._selectedIndexChanged&&(this._scrollToLabel(this._selectedIndex),this._checkScrollingControls(),this._alignInkBarToSelectedTab(),this._selectedIndexChanged=!1,this._changeDetectorRef.markForCheck()),this._scrollDistanceChanged&&(this._updateTabScrollPosition(),this._scrollDistanceChanged=!1,this._changeDetectorRef.markForCheck())}ngOnDestroy(){this._eventCleanups.forEach(e=>e()),this._keyManager?.destroy(),this._destroyed.next(),this._destroyed.complete(),this._stopScrolling.complete()}_handleKeydown(e){if(!Zt(e))switch(e.keyCode){case 13:case 32:if(this.focusIndex!==this.selectedIndex){let i=this._items.get(this.focusIndex);i&&!i.disabled&&(this.selectFocusedIndex.emit(this.focusIndex),this._itemSelected(e))}break;default:this._keyManager?.onKeydown(e)}}_onContentChanges(){let e=this._elementRef.nativeElement.textContent;e!==this._currentTextContent&&(this._currentTextContent=e||"",this._ngZone.run(()=>{this.updatePagination(),this._alignInkBarToSelectedTab(),this._changeDetectorRef.markForCheck()}))}updatePagination(){this._checkPaginationEnabled(),this._checkScrollingControls(),this._updateTabScrollPosition()}get focusIndex(){return this._keyManager?this._keyManager.activeItemIndex:0}set focusIndex(e){!this._isValidIndex(e)||this.focusIndex===e||!this._keyManager||this._keyManager.setActiveItem(e)}_isValidIndex(e){return this._items?!!this._items.toArray()[e]:!0}_setTabFocus(e){if(this._showPaginationControls&&this._scrollToLabel(e),this._items&&this._items.length){this._items.toArray()[e].focus();let i=this._tabListContainer.nativeElement;this._getLayoutDirection()=="ltr"?i.scrollLeft=0:i.scrollLeft=i.scrollWidth-i.offsetWidth}}_getLayoutDirection(){return this._dir&&this._dir.value==="rtl"?"rtl":"ltr"}_updateTabScrollPosition(){if(this.disablePagination)return;let e=this.scrollDistance,i=this._getLayoutDirection()==="ltr"?-e:e;this._tabList.nativeElement.style.transform=`translateX(${Math.round(i)}px)`,(this._platform.TRIDENT||this._platform.EDGE)&&(this._tabListContainer.nativeElement.scrollLeft=0)}get scrollDistance(){return this._scrollDistance}set scrollDistance(e){this._scrollTo(e)}_scrollHeader(e){let i=this._tabListContainer.nativeElement.offsetWidth,r=(e=="before"?-1:1)*i/3;return this._scrollTo(this._scrollDistance+r)}_handlePaginatorClick(e){this._stopInterval(),this._scrollHeader(e)}_scrollToLabel(e){if(this.disablePagination)return;let i=this._items?this._items.toArray()[e]:null;if(!i)return;let r=this._tabListContainer.nativeElement.offsetWidth,{offsetLeft:o,offsetWidth:s}=i.elementRef.nativeElement,a,l;this._getLayoutDirection()=="ltr"?(a=o,l=a+s):(l=this._tabListInner.nativeElement.offsetWidth-o,a=l-s);let c=this.scrollDistance,d=this.scrollDistance+r;a<c?this.scrollDistance-=c-a:l>d&&(this.scrollDistance+=Math.min(l-d,a-c))}_checkPaginationEnabled(){if(this.disablePagination)this._showPaginationControls=!1;else{let e=this._tabListInner.nativeElement.scrollWidth,i=this._elementRef.nativeElement.offsetWidth,r=e-i>=5;r||(this.scrollDistance=0),r!==this._showPaginationControls&&(this._showPaginationControls=r,this._changeDetectorRef.markForCheck())}}_checkScrollingControls(){this.disablePagination?this._disableScrollAfter=this._disableScrollBefore=!0:(this._disableScrollBefore=this.scrollDistance==0,this._disableScrollAfter=this.scrollDistance==this._getMaxScrollDistance(),this._changeDetectorRef.markForCheck())}_getMaxScrollDistance(){let e=this._tabListInner.nativeElement.scrollWidth,i=this._tabListContainer.nativeElement.offsetWidth;return e-i||0}_alignInkBarToSelectedTab(){let e=this._items&&this._items.length?this._items.toArray()[this.selectedIndex]:null,i=e?e.elementRef.nativeElement:null;i?this._inkBar.alignToElement(i):this._inkBar.hide()}_stopInterval(){this._stopScrolling.next()}_handlePaginatorPress(e,i){i&&i.button!=null&&i.button!==0||(this._stopInterval(),pl(Mj,Ij).pipe(ne(Jt(this._stopScrolling,this._destroyed))).subscribe(()=>{let{maxScrollDistance:r,distance:o}=this._scrollHeader(e);(o===0||o>=r)&&this._stopInterval()}))}_scrollTo(e){if(this.disablePagination)return{maxScrollDistance:0,distance:0};let i=this._getMaxScrollDistance();return this._scrollDistance=Math.max(0,Math.min(i,e)),this._scrollDistanceChanged=!0,this._checkScrollingControls(),{maxScrollDistance:i,distance:this._scrollDistance}}static \u0275fac=function(i){return new(i||n)};static \u0275dir=ie({type:n,inputs:{disablePagination:[2,"disablePagination","disablePagination",de],selectedIndex:[2,"selectedIndex","selectedIndex",es]},outputs:{selectFocusedIndex:"selectFocusedIndex",indexFocused:"indexFocused"}})}return n})(),Aj=(()=>{class n extends kj{_items;_tabListContainer;_tabList;_tabListInner;_nextPaginator;_previousPaginator;_inkBar;ariaLabel;ariaLabelledby;disableRipple=!1;ngAfterContentInit(){this._inkBar=new oC(this._items),super.ngAfterContentInit()}_itemSelected(e){e.preventDefault()}static \u0275fac=(()=>{let e;return function(r){return(e||(e=mn(n)))(r||n)}})();static \u0275cmp=G({type:n,selectors:[["mat-tab-header"]],contentQueries:function(i,r,o){if(i&1&&On(o,MI,4),i&2){let s;J(s=ee())&&(r._items=s)}},viewQuery:function(i,r){if(i&1&&bt(cj,7)(dj,7)(uj,7)(fj,5)(pj,5),i&2){let o;J(o=ee())&&(r._tabListContainer=o.first),J(o=ee())&&(r._tabList=o.first),J(o=ee())&&(r._tabListInner=o.first),J(o=ee())&&(r._nextPaginator=o.first),J(o=ee())&&(r._previousPaginator=o.first)}},hostAttrs:[1,"mat-mdc-tab-header"],hostVars:4,hostBindings:function(i,r){i&2&&ce("mat-mdc-tab-header-pagination-controls-enabled",r._showPaginationControls)("mat-mdc-tab-header-rtl",r._getLayoutDirection()=="rtl")},inputs:{ariaLabel:[0,"aria-label","ariaLabel"],ariaLabelledby:[0,"aria-labelledby","ariaLabelledby"],disableRipple:[2,"disableRipple","disableRipple",de]},features:[Tt],ngContentSelectors:lC,decls:13,vars:10,consts:[["previousPaginator",""],["tabListContainer",""],["tabList",""],["tabListInner",""],["nextPaginator",""],["mat-ripple","",1,"mat-mdc-tab-header-pagination","mat-mdc-tab-header-pagination-before",3,"click","mousedown","touchend","matRippleDisabled"],[1,"mat-mdc-tab-header-pagination-chevron"],[1,"mat-mdc-tab-label-container",3,"keydown"],["role","tablist",1,"mat-mdc-tab-list",3,"cdkObserveContent"],[1,"mat-mdc-tab-labels"],["mat-ripple","",1,"mat-mdc-tab-header-pagination","mat-mdc-tab-header-pagination-after",3,"mousedown","click","touchend","matRippleDisabled"]],template:function(i,r){i&1&&(ht(),h(0,"div",5,0),K("click",function(){return r._handlePaginatorClick("before")})("mousedown",function(s){return r._handlePaginatorPress("before",s)})("touchend",function(){return r._stopInterval()}),_e(2,"div",6),m(),h(3,"div",7,1),K("keydown",function(s){return r._handleKeydown(s)}),h(5,"div",8,2),K("cdkObserveContent",function(){return r._onContentChanges()}),h(7,"div",9,3),ke(9),m()()(),h(10,"div",10,4),K("mousedown",function(s){return r._handlePaginatorPress("after",s)})("click",function(){return r._handlePaginatorClick("after")})("touchend",function(){return r._stopInterval()}),_e(12,"div",6),m()),i&2&&(ce("mat-mdc-tab-header-pagination-disabled",r._disableScrollBefore),fe("matRippleDisabled",r._disableScrollBefore||r.disableRipple),y(3),ce("_mat-animation-noopable",r._animationsDisabled),y(2),Fe("aria-label",r.ariaLabel||null)("aria-labelledby",r.ariaLabelledby||null),y(5),ce("mat-mdc-tab-header-pagination-disabled",r._disableScrollAfter),fe("matRippleDisabled",r._disableScrollAfter||r.disableRipple))},dependencies:[Ss,VT],styles:[`.mat-mdc-tab-header {
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
`],encapsulation:2})}return n})(),Oj=new C("MAT_TABS_CONFIG"),SI=(()=>{class n extends Ob{_host=f(sC);_ngZone=f(U);_centeringSub=Z.EMPTY;_leavingSub=Z.EMPTY;constructor(){super()}ngOnInit(){super.ngOnInit(),this._centeringSub=this._host._beforeCentering.pipe(dt(this._host._isCenterPosition())).subscribe(e=>{this._host._content&&e&&!this.hasAttached()&&this._ngZone.run(()=>{Promise.resolve().then(),this.attach(this._host._content)})}),this._leavingSub=this._host._afterLeavingCenter.subscribe(()=>{this._host.preserveContent||this._ngZone.run(()=>this.detach())})}ngOnDestroy(){super.ngOnDestroy(),this._centeringSub.unsubscribe(),this._leavingSub.unsubscribe()}static \u0275fac=function(i){return new(i||n)};static \u0275dir=ie({type:n,selectors:[["","matTabBodyHost",""]],features:[Tt]})}return n})(),sC=(()=>{class n{_elementRef=f(Q);_dir=f(jt,{optional:!0});_ngZone=f(U);_injector=f(le);_renderer=f(vt);_diAnimationsDisabled=Ot();_eventCleanups;_initialized=!1;_fallbackTimer;_positionIndex;_dirChangeSubscription=Z.EMPTY;_position;_previousPosition;_onCentering=new j;_beforeCentering=new j;_afterLeavingCenter=new j;_onCentered=new j(!0);_portalHost;_contentElement;_content;animationDuration="500ms";preserveContent=!1;set position(e){this._positionIndex=e,this._computePositionAnimationState()}constructor(){if(this._dir){let e=f(tt);this._dirChangeSubscription=this._dir.change.subscribe(i=>{this._computePositionAnimationState(i),e.markForCheck()})}}ngOnInit(){this._bindTransitionEvents(),this._position==="center"&&(this._setActiveClass(!0),xt(()=>this._onCentering.emit(this._elementRef.nativeElement.clientHeight),{injector:this._injector})),this._initialized=!0}ngOnDestroy(){clearTimeout(this._fallbackTimer),this._eventCleanups?.forEach(e=>e()),this._dirChangeSubscription.unsubscribe()}_bindTransitionEvents(){this._ngZone.runOutsideAngular(()=>{let e=this._elementRef.nativeElement,i=r=>{r.target===this._contentElement?.nativeElement&&(this._elementRef.nativeElement.classList.remove("mat-tab-body-animating"),r.type==="transitionend"&&this._transitionDone())};this._eventCleanups=[this._renderer.listen(e,"transitionstart",r=>{r.target===this._contentElement?.nativeElement&&(this._elementRef.nativeElement.classList.add("mat-tab-body-animating"),this._transitionStarted())}),this._renderer.listen(e,"transitionend",i),this._renderer.listen(e,"transitioncancel",i)]})}_transitionStarted(){clearTimeout(this._fallbackTimer);let e=this._position==="center";this._beforeCentering.emit(e),e&&this._onCentering.emit(this._elementRef.nativeElement.clientHeight)}_transitionDone(){this._position==="center"?this._onCentered.emit():this._previousPosition==="center"&&this._afterLeavingCenter.emit()}_setActiveClass(e){this._elementRef.nativeElement.classList.toggle("mat-mdc-tab-body-active",e)}_getLayoutDirection(){return this._dir&&this._dir.value==="rtl"?"rtl":"ltr"}_isCenterPosition(){return this._positionIndex===0}_computePositionAnimationState(e=this._getLayoutDirection()){this._previousPosition=this._position,this._positionIndex<0?this._position=e=="ltr"?"left":"right":this._positionIndex>0?this._position=e=="ltr"?"right":"left":this._position="center",this._animationsDisabled()?this._simulateTransitionEvents():this._initialized&&(this._position==="center"||this._previousPosition==="center")&&(clearTimeout(this._fallbackTimer),this._fallbackTimer=this._ngZone.runOutsideAngular(()=>setTimeout(()=>this._simulateTransitionEvents(),100)))}_simulateTransitionEvents(){this._transitionStarted(),xt(()=>this._transitionDone(),{injector:this._injector})}_animationsDisabled(){return this._diAnimationsDisabled||this.animationDuration==="0ms"||this.animationDuration==="0s"}static \u0275fac=function(i){return new(i||n)};static \u0275cmp=G({type:n,selectors:[["mat-tab-body"]],viewQuery:function(i,r){if(i&1&&bt(SI,5)(hj,5),i&2){let o;J(o=ee())&&(r._portalHost=o.first),J(o=ee())&&(r._contentElement=o.first)}},hostAttrs:[1,"mat-mdc-tab-body"],hostVars:1,hostBindings:function(i,r){i&2&&Fe("inert",r._position==="center"?null:"")},inputs:{_content:[0,"content","_content"],animationDuration:"animationDuration",preserveContent:"preserveContent",position:"position"},outputs:{_onCentering:"_onCentering",_beforeCentering:"_beforeCentering",_onCentered:"_onCentered"},decls:3,vars:6,consts:[["content",""],["cdkScrollable","",1,"mat-mdc-tab-body-content"],["matTabBodyHost",""]],template:function(i,r){i&1&&(h(0,"div",1,0),Gt(2,mj,0,0,"ng-template",2),m()),i&2&&ce("mat-tab-body-content-left",r._position==="left")("mat-tab-body-content-right",r._position==="right")("mat-tab-body-content-can-animate",r._position==="center"||r._previousPosition==="center")},dependencies:[SI,Xc],styles:[`.mat-mdc-tab-body {
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
`],encapsulation:2})}return n})(),II=(()=>{class n{_elementRef=f(Q);_changeDetectorRef=f(tt);_ngZone=f(U);_tabsSubscription=Z.EMPTY;_tabLabelSubscription=Z.EMPTY;_tabBodySubscription=Z.EMPTY;_diAnimationsDisabled=Ot();_allTabs;_tabBodies;_tabBodyWrapper;_tabHeader;_tabs=new yi;_indexToSelect=0;_lastFocusedTabIndex=null;_tabBodyWrapperHeight=0;color;get fitInkBarToContent(){return this._fitInkBarToContent}set fitInkBarToContent(e){this._fitInkBarToContent=e,this._changeDetectorRef.markForCheck()}_fitInkBarToContent=!1;stretchTabs=!0;alignTabs=null;dynamicHeight=!1;get selectedIndex(){return this._selectedIndex}set selectedIndex(e){this._indexToSelect=isNaN(e)?null:e}_selectedIndex=null;headerPosition="above";get animationDuration(){return this._animationDuration}set animationDuration(e){let i=e+"";this._animationDuration=/^\d+$/.test(i)?e+"ms":i}_animationDuration;get contentTabIndex(){return this._contentTabIndex}set contentTabIndex(e){this._contentTabIndex=isNaN(e)?null:e}_contentTabIndex=null;disablePagination=!1;disableRipple=!1;preserveContent=!1;get backgroundColor(){return this._backgroundColor}set backgroundColor(e){let i=this._elementRef.nativeElement.classList;i.remove("mat-tabs-with-background",`mat-background-${this.backgroundColor}`),e&&i.add("mat-tabs-with-background",`mat-background-${e}`),this._backgroundColor=e}_backgroundColor;ariaLabel;ariaLabelledby;selectedIndexChange=new j;focusChange=new j;animationDone=new j;selectedTabChange=new j(!0);_groupId;_isServer=!f(ze).isBrowser;constructor(){let e=f(Oj,{optional:!0});this._groupId=f(Xt).getId("mat-tab-group-"),this.animationDuration=e&&e.animationDuration?e.animationDuration:"500ms",this.disablePagination=e&&e.disablePagination!=null?e.disablePagination:!1,this.dynamicHeight=e&&e.dynamicHeight!=null?e.dynamicHeight:!1,e?.contentTabIndex!=null&&(this.contentTabIndex=e.contentTabIndex),this.preserveContent=!!e?.preserveContent,this.fitInkBarToContent=e&&e.fitInkBarToContent!=null?e.fitInkBarToContent:!1,this.stretchTabs=e&&e.stretchTabs!=null?e.stretchTabs:!0,this.alignTabs=e&&e.alignTabs!=null?e.alignTabs:null}ngAfterContentChecked(){let e=this._indexToSelect=this._clampTabIndex(this._indexToSelect);if(this._selectedIndex!=e){let i=this._selectedIndex==null;if(!i){this.selectedTabChange.emit(this._createChangeEvent(e));let r=this._tabBodyWrapper.nativeElement;r.style.minHeight=r.clientHeight+"px"}Promise.resolve().then(()=>{this._tabs.forEach((r,o)=>r.isActive=o===e),i||(this.selectedIndexChange.emit(e),this._tabBodyWrapper.nativeElement.style.minHeight="")})}this._tabs.forEach((i,r)=>{i.position=r-e,this._selectedIndex!=null&&i.position==0&&!i.origin&&(i.origin=e-this._selectedIndex)}),this._selectedIndex!==e&&(this._selectedIndex=e,this._lastFocusedTabIndex=null,this._changeDetectorRef.markForCheck())}ngAfterContentInit(){this._subscribeToAllTabChanges(),this._subscribeToTabLabels(),this._tabsSubscription=this._tabs.changes.subscribe(()=>{let e=this._clampTabIndex(this._indexToSelect);if(e===this._selectedIndex){let i=this._tabs.toArray(),r;for(let o=0;o<i.length;o++)if(i[o].isActive){this._indexToSelect=this._selectedIndex=o,this._lastFocusedTabIndex=null,r=i[o];break}!r&&i[e]&&Promise.resolve().then(()=>{i[e].isActive=!0,this.selectedTabChange.emit(this._createChangeEvent(e))})}this._changeDetectorRef.markForCheck()})}ngAfterViewInit(){this._tabBodySubscription=this._tabBodies.changes.subscribe(()=>this._bodyCentered(!0))}_subscribeToAllTabChanges(){this._allTabs.changes.pipe(dt(this._allTabs)).subscribe(e=>{this._tabs.reset(e.filter(i=>i._closestTabGroup===this||!i._closestTabGroup)),this._tabs.notifyOnChanges()})}ngOnDestroy(){this._tabs.destroy(),this._tabsSubscription.unsubscribe(),this._tabLabelSubscription.unsubscribe(),this._tabBodySubscription.unsubscribe()}realignInkBar(){this._tabHeader&&this._tabHeader._alignInkBarToSelectedTab()}updatePagination(){this._tabHeader&&this._tabHeader.updatePagination()}focusTab(e){let i=this._tabHeader;i&&(i.focusIndex=e)}_focusChanged(e){this._lastFocusedTabIndex=e,this.focusChange.emit(this._createChangeEvent(e))}_createChangeEvent(e){let i=new aC;return i.index=e,this._tabs&&this._tabs.length&&(i.tab=this._tabs.toArray()[e]),i}_subscribeToTabLabels(){this._tabLabelSubscription&&this._tabLabelSubscription.unsubscribe(),this._tabLabelSubscription=Jt(...this._tabs.map(e=>e._stateChanges)).subscribe(()=>this._changeDetectorRef.markForCheck())}_clampTabIndex(e){return Math.min(this._tabs.length-1,Math.max(e||0,0))}_getTabLabelId(e,i){return e.id||`${this._groupId}-label-${i}`}_getTabContentId(e){return`${this._groupId}-content-${e}`}_setTabBodyWrapperHeight(e){if(!this.dynamicHeight||!this._tabBodyWrapperHeight){this._tabBodyWrapperHeight=e;return}let i=this._tabBodyWrapper.nativeElement;i.style.height=this._tabBodyWrapperHeight+"px",this._tabBodyWrapper.nativeElement.offsetHeight&&(i.style.height=e+"px")}_removeTabBodyWrapperHeight(){let e=this._tabBodyWrapper.nativeElement;this._tabBodyWrapperHeight=e.clientHeight,e.style.height="",this._ngZone.run(()=>this.animationDone.emit())}_handleClick(e,i,r){i.focusIndex=r,e.disabled||(this.selectedIndex=r)}_getTabIndex(e){let i=this._lastFocusedTabIndex??this.selectedIndex;return e===i?0:-1}_tabFocusChanged(e,i){e&&e!=="mouse"&&e!=="touch"&&(this._tabHeader.focusIndex=i)}_bodyCentered(e){e&&this._tabBodies?.forEach((i,r)=>i._setActiveClass(r===this._selectedIndex))}_animationsDisabled(){return this._diAnimationsDisabled||this.animationDuration==="0"||this.animationDuration==="0ms"}static \u0275fac=function(i){return new(i||n)};static \u0275cmp=G({type:n,selectors:[["mat-tab-group"]],contentQueries:function(i,r,o){if(i&1&&On(o,dC,5),i&2){let s;J(s=ee())&&(r._allTabs=s)}},viewQuery:function(i,r){if(i&1&&bt(gj,5)(yj,5)(sC,5),i&2){let o;J(o=ee())&&(r._tabBodyWrapper=o.first),J(o=ee())&&(r._tabHeader=o.first),J(o=ee())&&(r._tabBodies=o)}},hostAttrs:[1,"mat-mdc-tab-group"],hostVars:11,hostBindings:function(i,r){i&2&&(Fe("mat-align-tabs",r.alignTabs),Rn("mat-"+(r.color||"primary")),da("--mat-tab-animation-duration",r.animationDuration),ce("mat-mdc-tab-group-dynamic-height",r.dynamicHeight)("mat-mdc-tab-group-inverted-header",r.headerPosition==="below")("mat-mdc-tab-group-stretch-tabs",r.stretchTabs))},inputs:{color:"color",fitInkBarToContent:[2,"fitInkBarToContent","fitInkBarToContent",de],stretchTabs:[2,"mat-stretch-tabs","stretchTabs",de],alignTabs:[0,"mat-align-tabs","alignTabs"],dynamicHeight:[2,"dynamicHeight","dynamicHeight",de],selectedIndex:[2,"selectedIndex","selectedIndex",es],headerPosition:"headerPosition",animationDuration:"animationDuration",contentTabIndex:[2,"contentTabIndex","contentTabIndex",es],disablePagination:[2,"disablePagination","disablePagination",de],disableRipple:[2,"disableRipple","disableRipple",de],preserveContent:[2,"preserveContent","preserveContent",de],backgroundColor:"backgroundColor",ariaLabel:[0,"aria-label","ariaLabel"],ariaLabelledby:[0,"aria-labelledby","ariaLabelledby"]},outputs:{selectedIndexChange:"selectedIndexChange",focusChange:"focusChange",animationDone:"animationDone",selectedTabChange:"selectedTabChange"},exportAs:["matTabGroup"],features:[Ct([{provide:TI,useExisting:n}])],ngContentSelectors:lC,decls:9,vars:8,consts:[["tabHeader",""],["tabBodyWrapper",""],["tabNode",""],[3,"indexFocused","selectFocusedIndex","selectedIndex","disableRipple","disablePagination","aria-label","aria-labelledby"],["role","tab","matTabLabelWrapper","","cdkMonitorElementFocus","",1,"mdc-tab","mat-mdc-tab","mat-focus-indicator",3,"id","mdc-tab--active","class","disabled","fitInkBarToContent"],[1,"mat-mdc-tab-body-wrapper"],["role","tabpanel",3,"id","class","content","position","animationDuration","preserveContent"],["role","tab","matTabLabelWrapper","","cdkMonitorElementFocus","",1,"mdc-tab","mat-mdc-tab","mat-focus-indicator",3,"click","cdkFocusChange","id","disabled","fitInkBarToContent"],[1,"mdc-tab__ripple"],["mat-ripple","",1,"mat-mdc-tab-ripple",3,"matRippleTrigger","matRippleDisabled"],[1,"mdc-tab__content"],[1,"mdc-tab__text-label"],[3,"cdkPortalOutlet"],["role","tabpanel",3,"_onCentered","_onCentering","_beforeCentering","id","content","position","animationDuration","preserveContent"]],template:function(i,r){i&1&&(ht(),h(0,"mat-tab-header",3,0),K("indexFocused",function(s){return r._focusChanged(s)})("selectFocusedIndex",function(s){return r.selectedIndex=s}),Be(2,Cj,8,17,"div",4,to),m(),N(4,Dj,1,0),h(5,"div",5,1),Be(7,Ej,1,10,"mat-tab-body",6,to),m()),i&2&&(fe("selectedIndex",r.selectedIndex||0)("disableRipple",r.disableRipple)("disablePagination",r.disablePagination),gf("aria-label",r.ariaLabel)("aria-labelledby",r.ariaLabelledby),y(2),je(r._tabs),y(2),F(r._isServer?4:-1),y(),ce("_mat-animation-noopable",r._animationsDisabled()),y(2),je(r._tabs))},dependencies:[Aj,MI,vb,Ss,Ob,sC],styles:[`.mdc-tab {
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
`],encapsulation:2})}return n})(),aC=class{index;tab};var kI=(()=>{class n{static \u0275fac=function(i){return new(i||n)};static \u0275mod=De({type:n});static \u0275inj=be({imports:[gt]})}return n})();function AI(n){n||(n=f(at));let t=new q(e=>{if(n.destroyed){e.next();return}return n.onDestroy(e.next.bind(e))});return e=>e.pipe(ne(t))}var Ut=class{vault=ob(Ut);bus=f(Fa);destroyRef=f(at);events=L(()=>this.vault.state.value()??[]);totalEvents=L(()=>this.events().length);constructor(){this.vault.initialize(),this.vault.fromStream(this.bus.pipeline$().pipe(Ce(t=>!!t&&t.cell!==xa),AI(this.destroyRef)))}clearEvents(){this.vault.reset(),this.vault.replaceState({value:[]})}};I(Ut,"\u0275fac",function(e){return new(e||Ut)}),I(Ut,"\u0275prov",D({token:Ut,factory:Ut.\u0275fac,providedIn:"root"})),Ut=Se([rb(xa)],Ut);function Pj(n,t){n&1&&(h(0,"section",1)(1,"h1",5),v(2,"Welcome to SDuX Vault DevTools"),m(),h(3,"p",6),v(4," Real-time pipeline visibility for your state management layer. Inspect events, trace state mutations, and diagnose errors \u2014 all in one place. "),m()())}function Nj(n,t){n&1&&(h(0,"section",2),v(1," Events only appear "),h(2,"strong"),v(3,"after this panel opens and a decorated @FeatureCell service is instantiated."),m(),v(4,". "),h(5,"p"),v(6," FeatureCells are lazyloaded and only activated when the service is instantiated. The DevTools "),h(7,"strong"),v(8,"will only"),m(),v(9," connect once an @FeatureCell is active. "),m(),h(10,"p"),v(11," Click on a route with a component using an injected @FeatureCell service to trigger events in your app. "),m()())}function Fj(){try{return chrome.runtime.getManifest().version}catch{return"dev"}}var dd=new C("EXTENSION_VERSION",{providedIn:"root",factory:Fj}),wh=class n{devtools=f(Ut);version=f(dd);events=L(()=>this.devtools.events());totalEvents=L(()=>this.events()?.length);static \u0275fac=function(e){return new(e||n)};static \u0275cmp=G({type:n,selectors:[["sdux-devtools-splash-page"]],decls:5,vars:1,consts:[[1,"vault-devtools"],[1,"welcome"],[1,"warning"],[1,"vault-empty"],["src","/assets/brand/brand-landscape-dark.svg","alt","SDuX Vault logo","matTooltip","SDuX Vault",1,"logo"],[1,"welcome-title"],[1,"welcome-subtitle"]],template:function(e,i){e&1&&(h(0,"div",0),N(1,Pj,5,0,"section",1)(2,Nj,12,0,"section",2),h(3,"section",3),_e(4,"img",4),m()()),e&2&&(y(),F(i.totalEvents()?1:2))},dependencies:[Sn,fn],styles:[".pointer[_ngcontent-%COMP%]{cursor:pointer}[_nghost-%COMP%]{display:block;width:100%;height:100%}.vault-devtools[_ngcontent-%COMP%]{width:100%;height:100%;min-height:0;display:flex;flex-direction:column;align-items:center;justify-content:center;overflow:hidden;border:none}.vault-devtools[_ngcontent-%COMP%]   .welcome[_ngcontent-%COMP%]{text-align:center;margin-bottom:1.5rem}.vault-devtools[_ngcontent-%COMP%]   .welcome[_ngcontent-%COMP%]   .welcome-title[_ngcontent-%COMP%]{margin:0 0 .25rem;font-size:1.5rem;font-weight:600}.vault-devtools[_ngcontent-%COMP%]   .welcome[_ngcontent-%COMP%]   .welcome-subtitle[_ngcontent-%COMP%]{margin:0;color:#94a3b8;font-weight:400;font-family:Inter,system-ui,sans-serif;font-size:.875rem;line-height:1.5}.vault-devtools[_ngcontent-%COMP%]   .warning[_ngcontent-%COMP%]{background-color:#fff263;border-left:4px solid #c49000;color:#000;padding:.5rem 1rem;border-radius:.3125rem;font-size:.875rem;text-align:center;margin-bottom:1.5rem}.vault-devtools[_ngcontent-%COMP%]   .vault-empty[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:center;text-align:center}.vault-devtools[_ngcontent-%COMP%]   .vault-empty[_ngcontent-%COMP%]   .logo[_ngcontent-%COMP%]{width:200px;height:auto;filter:drop-shadow(0 2px 4px rgba(0,0,0,.35));transition:opacity .25s ease}.vault-devtools[_ngcontent-%COMP%]   .vault-empty[_ngcontent-%COMP%]   .logo[_ngcontent-%COMP%]:hover{opacity:.9}"],changeDetection:0})};function Lj(n,t){if(n&1&&(h(0,"div",4)(1,"h4"),v(2,"State Value"),m(),h(3,"pre")(4,"code"),v(5),vr(6,"json"),m()()()),n&2){let e,i=w();y(5),k(Qo(6,1,(e=i.event().state)==null?null:e.value))}}function Vj(n,t){if(n&1&&(h(0,"div",4)(1,"h4"),v(2,"Payload"),m(),h(3,"pre")(4,"code"),v(5),vr(6,"json"),m()()()),n&2){let e=w();y(5),k(Qo(6,1,e.event().payload))}}function Bj(n,t){if(n&1&&(h(0,"div",6)(1,"h4"),v(2,"Error"),m(),h(3,"pre")(4,"code"),v(5),vr(6,"json"),m()()()),n&2){let e=w();y(5),k(Qo(6,1,e.event().error))}}var Sh=class n{event=Ft.required();closeDetail=io();static \u0275fac=function(e){return new(e||n)};static \u0275cmp=G({type:n,selectors:[["sdux-devtools-pipeline-event-detail"]],inputs:{event:[1,"event"]},outputs:{closeDetail:"closeDetail"},decls:40,vars:10,consts:[[1,"detail-panel"],[1,"detail-header"],["type","button","aria-label","Close detail panel","matTooltip","Close detail panel",1,"close-btn",3,"click"],[1,"detail-body"],[1,"detail-block"],[1,"kv"],[1,"detail-block","error-block"]],template:function(e,i){if(e&1&&(h(0,"div",0)(1,"div",1)(2,"h3"),v(3,"Event Detail"),m(),h(4,"button",2),K("click",function(){return i.closeDetail.emit()}),v(5," \u2715 "),m()(),h(6,"div",3)(7,"div",4)(8,"ul",5)(9,"li")(10,"strong"),v(11,"key:"),m(),v(12),m(),h(13,"li")(14,"strong"),v(15,"type:"),m(),v(16),m(),h(17,"li")(18,"strong"),v(19,"boundary:"),m(),v(20),m(),h(21,"li")(22,"strong"),v(23,"event name:"),m(),v(24),m(),h(25,"li")(26,"strong"),v(27,"event id:"),m(),v(28),m(),h(29,"li")(30,"strong"),v(31,"trace id:"),m(),v(32),m(),h(33,"li")(34,"strong"),v(35,"source:"),m(),v(36),m()()(),N(37,Lj,7,3,"div",4),N(38,Vj,7,3,"div",4),N(39,Bj,7,3,"div",6),m()()),e&2){let r;y(12),Ze(" ",i.event().behaviorKey),y(4),Ze(" ",i.event().type),y(4),Ze(" ",i.event().boundary),y(4),Ze(" ",i.event().name),y(4),Ze(" ",i.event().id),y(4),Ze(" ",i.event().traceId??"null"),y(4),Ze(" ",i.event().source??"N/A"),y(),F((r=i.event().state)!=null&&r.value?37:-1),y(),F(i.event().payload?38:-1),y(),F(i.event().error?39:-1)}},dependencies:[fa,Sn,fn,Cv],styles:[".pointer[_ngcontent-%COMP%]{cursor:pointer}[_nghost-%COMP%]{display:flex;flex-direction:column;height:100%;max-height:100%;overflow:hidden}.detail-panel[_ngcontent-%COMP%]{display:flex;flex-direction:column;flex:1;min-height:0;overflow:hidden;background-color:#0f172a}.detail-panel[_ngcontent-%COMP%]   .detail-header[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:space-between;padding:.5rem 1rem;border-bottom:1px solid #63a4ff;flex-shrink:0}.detail-panel[_ngcontent-%COMP%]   .detail-header[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]{color:#fff;font-weight:600;font-family:Inter,system-ui,sans-serif;font-size:1rem;margin:0}.detail-panel[_ngcontent-%COMP%]   .detail-header[_ngcontent-%COMP%]   .close-btn[_ngcontent-%COMP%]{background:none;border:none;color:#94a3b8;font-size:1rem;cursor:pointer;padding:.25rem;border-radius:.25rem;line-height:1}.detail-panel[_ngcontent-%COMP%]   .detail-header[_ngcontent-%COMP%]   .close-btn[_ngcontent-%COMP%]:hover{color:#fff;background-color:#63a4ff}.detail-panel[_ngcontent-%COMP%]   .detail-body[_ngcontent-%COMP%]{flex:1;min-height:0;overflow-y:auto;padding:1rem}.detail-panel[_ngcontent-%COMP%]   .detail-body[_ngcontent-%COMP%]::-webkit-scrollbar{width:6px}.detail-panel[_ngcontent-%COMP%]   .detail-body[_ngcontent-%COMP%]::-webkit-scrollbar-thumb{background-color:#63a4ff;border-radius:.25rem}.detail-panel[_ngcontent-%COMP%]   .detail-columns[_ngcontent-%COMP%]{display:grid;grid-template-columns:1fr 1fr;gap:1rem}@media(max-width:768px){.detail-panel[_ngcontent-%COMP%]   .detail-columns[_ngcontent-%COMP%]{grid-template-columns:1fr}}.detail-panel[_ngcontent-%COMP%]   .detail-block[_ngcontent-%COMP%]{margin-bottom:1rem}.detail-panel[_ngcontent-%COMP%]   .detail-block[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%]{color:#e2e8f0;font-weight:600;font-family:Inter,system-ui,sans-serif;font-size:1rem;margin-bottom:.25rem}.detail-panel[_ngcontent-%COMP%]   .detail-block[_ngcontent-%COMP%]   .kv[_ngcontent-%COMP%]{list-style:none;padding:0;margin:0 0 .25rem}.detail-panel[_ngcontent-%COMP%]   .detail-block[_ngcontent-%COMP%]   .kv[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]{margin-bottom:.25rem;font-size:.875rem}.detail-panel[_ngcontent-%COMP%]   .detail-block[_ngcontent-%COMP%]   pre[_ngcontent-%COMP%]{background-color:#2c3a4f;border:1px solid #63a4ff;border-radius:.3125rem;padding:.5rem;font-size:.75rem;white-space:pre-wrap;word-break:break-all;overflow-wrap:break-word;color:#e2e8f0}.detail-panel[_ngcontent-%COMP%]   .detail-block[_ngcontent-%COMP%]   pre[_ngcontent-%COMP%]::-webkit-scrollbar{width:6px}.detail-panel[_ngcontent-%COMP%]   .detail-block[_ngcontent-%COMP%]   pre[_ngcontent-%COMP%]::-webkit-scrollbar-thumb{background-color:#63a4ff;border-radius:.25rem}.detail-panel[_ngcontent-%COMP%]   .error-block[_ngcontent-%COMP%]   pre[_ngcontent-%COMP%]{background-color:#b71c1c;border-color:#ef5350}"],changeDetection:0})};function jj(n,t){if(n&1&&(h(0,"span",7),v(1),m()),n&2){let e=w(2);y(),k(e.behaviorName())}}function Uj(n,t){n&1&&(h(0,"span",10),v(1,"\u25CF"),m())}function Hj(n,t){n&1&&_e(0,"span",11)}function $j(n,t){n&1&&(h(0,"span",12),v(1,"\u270E"),m())}function zj(n,t){n&1&&_e(0,"span",11)}function Wj(n,t){n&1&&(h(0,"span",13),v(1,"\u26A0"),m())}function Gj(n,t){n&1&&_e(0,"span",11)}function qj(n,t){if(n&1){let e=_t();h(0,"div",1),K("click",function(){Le(e);let r=w();return Ve(r.selectEvent.emit(r.event()))})("keydown.enter",function(){Le(e);let r=w();return Ve(r.selectEvent.emit(r.event()))})("keydown.space",function(r){Le(e);let o=w();return o.selectEvent.emit(o.event()),Ve(r.preventDefault())}),h(1,"div",2)(2,"div",3),v(3),vr(4,"number"),m(),h(5,"div",4),v(6),m()(),h(7,"div",5),_e(8,"div",6),h(9,"div")(10,"span",7),v(11),vr(12,"uppercase"),m(),N(13,jj,2,1,"span",7),m(),h(14,"div",8)(15,"div",9),N(16,Uj,2,0,"span",10)(17,Hj,1,0,"span",11),N(18,$j,2,0,"span",12)(19,zj,1,0,"span",11),N(20,Wj,2,0,"span",13)(21,Gj,1,0,"span",11),m(),h(22,"div",14),v(23),vr(24,"date"),m()()()()}if(n&2){let e,i=w();ce("event-row-error",!!i.event().error)("event-row-selected",i.selected()),y(3),Ze(" ",bf(4,15,i.totalEvents(),"3.0")," "),y(3),k(i.event().cell),y(3),Rn(Yy("behavior-pills ",i.event().type)),y(2),k(Qo(12,18,i.event().type)),y(2),F(i.event().type==="controller"||i.event().type==="stage"?13:-1),y(3),F((e=i.event().state)!=null&&e.hasValue?16:17),y(2),F(i.event().payload?18:19),y(2),F(i.event().error?20:21),y(3),Ze(" ",bf(24,20,i.event().timestamp,"HH:mm:ss.SSS")," ")}}var xh=class n{event=Ft.required();totalEvents=Ft.required();selected=Ft(!1);selectEvent=io();parseBehaviorKey(){let t=this.event().behaviorKey;if(t.startsWith("SDUX::")){let i=t.split("::"),r=i[1],o=i[i.length-1];return[r.toUpperCase(),o.toUpperCase()]}return[t.replace(/^VAULT-/i,"").toUpperCase()]}behaviorName(){let t=this.event().behaviorKey;return t.startsWith("SDUX::")?t.split("::").pop().toUpperCase():t.replace(/^VAULT-/i,"").toUpperCase()}static \u0275fac=function(e){return new(e||n)};static \u0275cmp=G({type:n,selectors:[["sdux-devtools-pipeline-event"]],inputs:{event:[1,"event"],totalEvents:[1,"totalEvents"],selected:[1,"selected"]},outputs:{selectEvent:"selectEvent"},decls:1,vars:1,consts:[["matTooltip","Click for more details","role","button","tabindex","0",1,"event-row-header",3,"event-row-error","event-row-selected"],["matTooltip","Click for more details","role","button","tabindex","0",1,"event-row-header",3,"click","keydown.enter","keydown.space"],[1,"row-primary"],[1,"counter"],[1,"cell"],[1,"row-secondary"],[1,"row-spacer"],[1,"pill"],[1,"indicators-ts"],[1,"indicators"],["matTooltip","State","aria-hidden","true",1,"icon","active"],["aria-hidden","true",1,"icon-spacer"],["matTooltip","Payload","aria-hidden","true",1,"icon","payload"],["matTooltip","Error","aria-hidden","true",1,"icon","error"],[1,"ts"]],template:function(e,i){e&1&&N(0,qj,25,23,"div",0),e&2&&F(i.event()?0:-1)},dependencies:[fa,Sn,fn,_v,Dv,bv],styles:[".pointer[_ngcontent-%COMP%]{cursor:pointer}[_nghost-%COMP%]{display:block;overflow:hidden;background-color:#2c3a4f;border-radius:.3125rem;padding:.25rem .5rem;margin-bottom:.25rem}.event-row-header[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap;align-items:center;gap:.5rem;cursor:pointer}.event-row-header[_ngcontent-%COMP%]   .row-primary[_ngcontent-%COMP%], .event-row-header[_ngcontent-%COMP%]   .row-secondary[_ngcontent-%COMP%]{display:flex;align-items:center;gap:1rem}.event-row-header[_ngcontent-%COMP%]   .row-primary[_ngcontent-%COMP%]{flex-shrink:0}.event-row-header[_ngcontent-%COMP%]   .row-secondary[_ngcontent-%COMP%]{flex:1;min-width:0}.event-row-header[_ngcontent-%COMP%]   .row-secondary[_ngcontent-%COMP%]   .indicators-ts[_ngcontent-%COMP%]{margin-left:auto;display:flex;align-items:center}.event-row-header[_ngcontent-%COMP%]   .row-spacer[_ngcontent-%COMP%]{display:none}@media(max-width:768px){.event-row-header[_ngcontent-%COMP%]{flex-direction:column;align-items:stretch}.event-row-header[_ngcontent-%COMP%]   .row-primary[_ngcontent-%COMP%], .event-row-header[_ngcontent-%COMP%]   .row-secondary[_ngcontent-%COMP%]{width:100%}.event-row-header[_ngcontent-%COMP%]   .row-spacer[_ngcontent-%COMP%]{display:block;width:48px;flex-shrink:0}.event-row-header[_ngcontent-%COMP%]   .cell[_ngcontent-%COMP%]{min-width:200px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}}.event-row-header[_ngcontent-%COMP%]   .behavior-pills[_ngcontent-%COMP%]{display:flex;gap:2px}.event-row-header[_ngcontent-%COMP%]   .behavior-pills[_ngcontent-%COMP%]   .pill[_ngcontent-%COMP%]{color:#fff;font-weight:600;font-family:Inter,system-ui,sans-serif;font-size:.75rem;padding:.25rem .5rem;white-space:nowrap}.event-row-header[_ngcontent-%COMP%]   .behavior-pills[_ngcontent-%COMP%]   .pill[_ngcontent-%COMP%]:first-child{border-radius:.25rem 0 0 .25rem}.event-row-header[_ngcontent-%COMP%]   .behavior-pills[_ngcontent-%COMP%]   .pill[_ngcontent-%COMP%]:last-child{border-radius:0 .25rem .25rem 0}.event-row-header[_ngcontent-%COMP%]   .behavior-pills[_ngcontent-%COMP%]   .pill[_ngcontent-%COMP%]:only-child{border-radius:.25rem}.event-row-header[_ngcontent-%COMP%]   .behavior-pills.stage[_ngcontent-%COMP%]   .pill[_ngcontent-%COMP%]{background-color:#1976d2}.event-row-header[_ngcontent-%COMP%]   .behavior-pills.lifecycle[_ngcontent-%COMP%]   .pill[_ngcontent-%COMP%]{background-color:#388e3c}.event-row-header[_ngcontent-%COMP%]   .behavior-pills.controller[_ngcontent-%COMP%]   .pill[_ngcontent-%COMP%]{background-color:#fbc02d;color:#000}.event-row-header[_ngcontent-%COMP%]   .behavior-pills.conductor[_ngcontent-%COMP%]   .pill[_ngcontent-%COMP%]{background-color:#d32f2f}.event-row-header[_ngcontent-%COMP%]   .counter[_ngcontent-%COMP%]{color:#e2e8f0;font-weight:400;font-family:Inter,system-ui,sans-serif;font-size:.875rem;width:3rem;text-align:left}.event-row-header[_ngcontent-%COMP%]   .cell[_ngcontent-%COMP%]{color:#fff;font-weight:400;font-family:Inter,system-ui,sans-serif;font-weight:500;font-size:1rem;min-width:200px}.event-row-header[_ngcontent-%COMP%]   .indicators[_ngcontent-%COMP%]{display:flex;align-items:center;gap:.25rem}.event-row-header[_ngcontent-%COMP%]   .indicators[_ngcontent-%COMP%]   .icon[_ngcontent-%COMP%], .event-row-header[_ngcontent-%COMP%]   .indicators[_ngcontent-%COMP%]   .icon-spacer[_ngcontent-%COMP%]{display:inline-block;width:1em;font-size:1rem;text-align:center}.event-row-header[_ngcontent-%COMP%]   .indicators[_ngcontent-%COMP%]   .icon[_ngcontent-%COMP%]{transition:color .15s ease}.event-row-header[_ngcontent-%COMP%]   .indicators[_ngcontent-%COMP%]   .icon.active[_ngcontent-%COMP%]{color:#81c784}.event-row-header[_ngcontent-%COMP%]   .indicators[_ngcontent-%COMP%]   .icon.payload[_ngcontent-%COMP%]{color:#63a4ff}.event-row-header[_ngcontent-%COMP%]   .indicators[_ngcontent-%COMP%]   .icon.error[_ngcontent-%COMP%]{color:#d32f2f}.event-row-header.event-row-error[_ngcontent-%COMP%]{background-color:#d32f2f14;border-left:3px solid #d32f2f}.event-row-header.event-row-selected[_ngcontent-%COMP%]{background-color:#ffffff14;border-left:3px solid #1976d2}.event-row-header.event-row-selected.event-row-error[_ngcontent-%COMP%]{border-left-color:#d32f2f}.event-row-header[_ngcontent-%COMP%]   .ts[_ngcontent-%COMP%]{color:#e2e8f0;font-weight:400;font-family:Inter,system-ui,sans-serif;font-size:.75rem;white-space:nowrap}"],changeDetection:0})};function Kj(n,t){if(n&1){let e=_t();h(0,"div",5)(1,"sdux-devtools-pipeline-event",6),K("selectEvent",function(r){Le(e);let o=w(2);return Ve(o.selectEvent(r))}),m()()}if(n&2){let e,i=t.$implicit,r=t.index,o=w(2);y(),fe("event",i)("totalEvents",o.totalEvents()-r)("selected",((e=o.selectedEvent())==null?null:e.id)===i.id)}}function Yj(n,t){if(n&1&&(h(0,"cdk-virtual-scroll-viewport",2),Gt(1,Kj,2,3,"div",4),m()),n&2){let e=w();y(),fe("cdkVirtualForOf",e.reversedEvents())("cdkVirtualForTrackBy",e.trackById)}}function Zj(n,t){if(n&1){let e=_t();h(0,"aside",3)(1,"sdux-devtools-pipeline-event-detail",7),K("closeDetail",function(){Le(e);let r=w();return Ve(r.closeDetail())}),m()()}n&2&&(y(),fe("event",t))}var Th=class n{events=Ft.required();reversedEvents=L(()=>[...this.events()].reverse());totalEvents=L(()=>this.events().length);selectedEvent=P(null);trackById(t,e){return e.id}selectEvent(t){this.selectedEvent.set(t)}closeDetail(){this.selectedEvent.set(null)}static \u0275fac=function(e){return new(e||n)};static \u0275cmp=G({type:n,selectors:[["sdux-devtools-main-pipeline-panel"]],inputs:{events:[1,"events"]},decls:4,vars:2,consts:[[1,"pipeline-panel"],[1,"event-stream"],["itemSize","52","role","log","aria-label","Pipeline events",1,"event-list"],[1,"detail-pane"],["class","event-row",4,"cdkVirtualFor","cdkVirtualForOf","cdkVirtualForTrackBy"],[1,"event-row"],[3,"selectEvent","event","totalEvents","selected"],[3,"closeDetail","event"]],template:function(e,i){if(e&1&&(h(0,"div",0)(1,"section",1),N(2,Yj,2,2,"cdk-virtual-scroll-viewport",2),m(),N(3,Zj,2,1,"aside",3),m()),e&2){let r;y(2),F(i.reversedEvents()?2:-1),y(),F((r=i.selectedEvent())?3:-1,r)}},dependencies:[Qc,Mb,kb,Ib,xh,Sh],styles:[".pointer[_ngcontent-%COMP%]{cursor:pointer}[_nghost-%COMP%]{display:block;height:100%;overflow:hidden}.pipeline-panel[_ngcontent-%COMP%]{display:flex;flex-direction:row;height:100%;overflow:hidden;padding:0;color:#e2e8f0;font-weight:400;font-family:Inter,system-ui,sans-serif}.pipeline-panel[_ngcontent-%COMP%]   .event-stream[_ngcontent-%COMP%]{flex:1;display:flex;flex-direction:column;min-height:0;min-width:0}.pipeline-panel[_ngcontent-%COMP%]   .event-stream[_ngcontent-%COMP%]   .event-list[_ngcontent-%COMP%]{flex:1;min-height:0;height:100%;overscroll-behavior:contain;margin-bottom:3rem}.pipeline-panel[_ngcontent-%COMP%]   .event-stream[_ngcontent-%COMP%]   .event-list[_ngcontent-%COMP%]   .cdk-virtual-scroll-content-wrapper[_ngcontent-%COMP%]{padding-bottom:2rem}.pipeline-panel[_ngcontent-%COMP%]   .event-stream[_ngcontent-%COMP%]   .event-list[_ngcontent-%COMP%]::-webkit-scrollbar{width:8px}.pipeline-panel[_ngcontent-%COMP%]   .event-stream[_ngcontent-%COMP%]   .event-list[_ngcontent-%COMP%]::-webkit-scrollbar-thumb{background-color:#63a4ff;border-radius:.25rem}.pipeline-panel[_ngcontent-%COMP%]   .detail-pane[_ngcontent-%COMP%]{width:400px;min-width:400px;flex-shrink:0;display:flex;flex-direction:column;border-left:1px solid #63a4ff;margin-bottom:3rem;min-height:0}.pipeline-panel[_ngcontent-%COMP%]   .detail-pane[_ngcontent-%COMP%]   sdux-devtools-pipeline-event-detail[_ngcontent-%COMP%]{display:flex;flex-direction:column;flex:1;min-height:0}.pipeline-panel[_ngcontent-%COMP%]   .detail-empty[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:center;height:100%}.pipeline-panel[_ngcontent-%COMP%]   .detail-empty[_ngcontent-%COMP%]   .detail-empty-text[_ngcontent-%COMP%]{color:#94a3b8;font-weight:400;font-family:Inter,system-ui,sans-serif;font-size:.875rem}@media(max-width:768px){.pipeline-panel[_ngcontent-%COMP%]{flex-direction:column;overflow:hidden}.pipeline-panel[_ngcontent-%COMP%]   .event-stream[_ngcontent-%COMP%]{height:100%;min-height:0;overflow:hidden}.pipeline-panel[_ngcontent-%COMP%]   .event-stream[_ngcontent-%COMP%]   .event-list[_ngcontent-%COMP%]{height:100%;margin-bottom:0}.pipeline-panel[_ngcontent-%COMP%]:has(.detail-pane)   .event-stream[_ngcontent-%COMP%]{height:35%}.pipeline-panel[_ngcontent-%COMP%]   .detail-pane[_ngcontent-%COMP%]{width:100%;min-width:0;flex:0 0 calc(55% - 20px);margin-top:.5rem;margin-bottom:0;border:1px solid #63a4ff;box-sizing:border-box;overflow:hidden}.pipeline-panel[_ngcontent-%COMP%]   .detail-pane[_ngcontent-%COMP%]   sdux-devtools-pipeline-event-detail[_ngcontent-%COMP%]{height:100%;flex:none}}.pipeline-panel[_ngcontent-%COMP%]   .event-row[_ngcontent-%COMP%]{display:block;padding:.5rem 0;border-bottom:1px solid #63a4ff}.pipeline-panel[_ngcontent-%COMP%]   .event-row[_ngcontent-%COMP%]:hover{background-color:#ffffff14}.pipeline-panel[_ngcontent-%COMP%]   .event-row-header[_ngcontent-%COMP%]{width:100%;display:grid;grid-template-columns:4rem 140px 1fr auto;align-items:center;gap:1rem}.pipeline-panel[_ngcontent-%COMP%]   .badge[_ngcontent-%COMP%]{color:#fff;font-weight:600;font-family:Inter,system-ui,sans-serif;font-size:.75rem;padding:.25rem .5rem;border-radius:.25rem;justify-self:start}.pipeline-panel[_ngcontent-%COMP%]   .badge.init[_ngcontent-%COMP%]{background-color:#388e3c}.pipeline-panel[_ngcontent-%COMP%]   .badge.patch[_ngcontent-%COMP%]{background-color:#fbc02d;color:#000}.pipeline-panel[_ngcontent-%COMP%]   .badge.error[_ngcontent-%COMP%]{background-color:#d32f2f}.pipeline-panel[_ngcontent-%COMP%]   .counter[_ngcontent-%COMP%]{color:#94a3b8;font-weight:400;font-family:Inter,system-ui,sans-serif;font-size:.875rem;width:3rem;text-align:left}.pipeline-panel[_ngcontent-%COMP%]   .cell[_ngcontent-%COMP%]{color:#94a3b8;font-weight:400;font-family:Inter,system-ui,sans-serif;font-weight:500;font-size:1rem;min-width:125px}.pipeline-panel[_ngcontent-%COMP%]   .ts[_ngcontent-%COMP%]{color:#94a3b8;font-weight:400;font-family:Inter,system-ui,sans-serif;font-size:.75rem;white-space:nowrap}.pipeline-panel[_ngcontent-%COMP%]   .event-details[_ngcontent-%COMP%]{grid-column:1/-1;margin-top:.25rem;padding-left:.5rem}.pipeline-panel[_ngcontent-%COMP%]   .event-details[_ngcontent-%COMP%]   summary[_ngcontent-%COMP%]{cursor:pointer;color:#1976d2;font-weight:400;font-family:Inter,system-ui,sans-serif;font-size:.875rem;margin-bottom:.25rem}.pipeline-panel[_ngcontent-%COMP%]   .event-details[_ngcontent-%COMP%]   summary[_ngcontent-%COMP%]:hover{text-decoration:underline}.pipeline-panel[_ngcontent-%COMP%]   .event-details[_ngcontent-%COMP%]   .detail-block[_ngcontent-%COMP%]{margin-bottom:1rem}.pipeline-panel[_ngcontent-%COMP%]   .event-details[_ngcontent-%COMP%]   .detail-block[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%]{color:#e2e8f0;font-weight:600;font-family:Inter,system-ui,sans-serif;font-size:1rem;margin-bottom:.25rem}.pipeline-panel[_ngcontent-%COMP%]   .event-details[_ngcontent-%COMP%]   .detail-block[_ngcontent-%COMP%]   .kv[_ngcontent-%COMP%]{list-style:none;padding:0;margin:0 0 .25rem}.pipeline-panel[_ngcontent-%COMP%]   .event-details[_ngcontent-%COMP%]   .detail-block[_ngcontent-%COMP%]   .kv[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]{margin-bottom:.25rem;font-size:.875rem}.pipeline-panel[_ngcontent-%COMP%]   .event-details[_ngcontent-%COMP%]   .detail-block[_ngcontent-%COMP%]   pre[_ngcontent-%COMP%]{background-color:#0f172a;border:1px solid #63a4ff;border-radius:.3125rem;padding:.5rem;font-size:.75rem;overflow-x:auto;color:#e2e8f0}.pipeline-panel[_ngcontent-%COMP%]   .event-details[_ngcontent-%COMP%]   .error-block[_ngcontent-%COMP%]   pre[_ngcontent-%COMP%]{background-color:#b71c1c;border-color:#ef5350}"],changeDetection:0})};function Xj(n,t){if(n&1&&(h(0,"mat-option",4),v(1),m()),n&2){let e=t.$implicit;fe("value",e),y(),k(e)}}function Qj(n,t){if(n&1&&(h(0,"mat-option",4),v(1),m()),n&2){let e=t.$implicit,i=w();fe("value",e),y(),k(i.capitalize(e))}}function Jj(n,t){if(n&1&&(h(0,"mat-option",4),v(1),m()),n&2){let e=t.$implicit,i=w(2);fe("value",e),y(),k(i.displayKeyName(e))}}function eU(n,t){if(n&1){let e=_t();h(0,"mat-select",14),K("selectionChange",function(r){Le(e);let o=w();return Ve(o.selectedKey.set(r.value))}),h(1,"mat-option",3),v(2,"All Keys"),m(),Be(3,Jj,2,2,"mat-option",4,to),m()}if(n&2){let e=w();fe("value",e.selectedKey()),y(3),je(e.keyNames())}}function tU(n,t){if(n&1&&(h(0,"span",8),v(1),m()),n&2){let e=w();y(),Ze(" ",e.latestStateSize()," ")}}function nU(n,t){if(n&1){let e=_t();h(0,"span",15),v(1),h(2,"button",16),K("click",function(r){Le(e);let o=w();return Ve(o.downloadAllEvents(r))}),hi(),h(3,"svg",17),_e(4,"path",18),m()()()}if(n&2){let e=w();y(),Ze(" All Events (",e.totalEvents(),") ")}}function iU(n,t){if(n&1){let e=_t();h(0,"span",15),v(1),h(2,"button",19),K("click",function(r){Le(e);let o=w();return Ve(o.downloadErrorEvents(r))}),hi(),h(3,"svg",17),_e(4,"path",18),m()()()}if(n&2){let e=w();y(),Ze(" Error Events (",e.errorEvents().length,") ")}}var Mh=class n{devtools=f(Ut);version=f(dd);events=L(()=>this.devtools.events());selectedCell=P("all");selectedType=P("all");selectedKey=P("all");cellNames=L(()=>{let t=this.events()?.map(e=>e.cell)??[];return[...new Set(t)].sort()});typeNames=L(()=>{let t=this.selectedCell(),e=this.events()??[];t!=="all"&&(e=e.filter(r=>r.cell===t));let i=e.map(r=>r.type);return[...new Set(i)].sort()});showKeyFilter=L(()=>{let t=this.selectedType();return t==="stage"||t==="controller"});keyNames=L(()=>{let t=this.selectedCell(),e=this.selectedType(),i=this.events()??[];t!=="all"&&(i=i.filter(o=>o.cell===t)),e!=="all"&&(i=i.filter(o=>o.type===e));let r=i.map(o=>o.behaviorKey);return[...new Set(r)].sort()});filteredEvents=L(()=>{let t=this.selectedCell(),e=this.selectedType(),i=this.selectedKey(),r=this.events();return t!=="all"&&(r=r?.filter(o=>o.cell===t)??[]),e!=="all"&&(r=r?.filter(o=>o.type===e)??[]),i!=="all"&&(r=r?.filter(o=>o.behaviorKey===i)??[]),r});totalEvents=L(()=>this.filteredEvents()?.length);errorEvents=L(()=>this.filteredEvents()?.filter(t=>!!t.error)??[]);latestStateSize=L(()=>{let t=this.events();if(!t?.length)return null;let e=new Map;for(let r of t)r.state?.hasValue&&e.set(r.cell,r);if(!e.size)return null;let i=0;for(let r of e.values())i+=new Blob([JSON.stringify(r.state.value)]).size;return i<1024?`${i} B`:i<1048576?`${(i/1024).toFixed(1)} KB`:`${(i/1048576).toFixed(1)} MB`});clearEvents(){this.selectedCell.set("all"),this.selectedType.set("all"),this.selectedKey.set("all"),this.devtools.clearEvents()}displayKeyName(t){let e=t.split("::");return e.length>1?e[e.length-1]:t}capitalize(t){return t[0].toUpperCase()+t.slice(1)}downloadAllEvents(t){t.stopPropagation(),this.downloadEvents(this.events(),"all-events")}downloadErrorEvents(t){t.stopPropagation(),this.downloadEvents(this.errorEvents(),"error-events")}downloadEvents(t,e){let i=new Blob([JSON.stringify(t,null,2)],{type:"application/json"}),r=document.createElement("a");r.href=URL.createObjectURL(i),r.download=`sdux-${e}-${Date.now()}.json`,r.click(),URL.revokeObjectURL(r.href)}static \u0275fac=function(e){return new(e||n)};static \u0275cmp=G({type:n,selectors:[["sdux-events"]],decls:26,vars:6,consts:[[1,"header"],[1,"title"],["aria-label","Filter by cell",1,"cell-filter",3,"selectionChange","value"],["value","all"],[3,"value"],["aria-label","Filter by event type",1,"cell-filter",3,"selectionChange","value"],["aria-label","Filter by key",1,"cell-filter",3,"value"],[1,"meta"],["matTooltip","Size of latest event state","aria-label","Size of latest event state",1,"state-size"],["type","button","matTooltip","Clear all events","aria-label","Clear all events",1,"btn-clear",3,"click"],["animationDuration","200ms",1,"vault-tabs"],["mat-tab-label",""],[1,"vault-tab-content"],[3,"events"],["aria-label","Filter by key",1,"cell-filter",3,"selectionChange","value"],[1,"tab-label"],["type","button","aria-label","Download all events","matTooltip","Download all events",1,"tab-download-btn",3,"click"],["xmlns","http://www.w3.org/2000/svg","viewBox","0 0 24 24","fill","currentColor","width","18","height","18",1,"download-icon"],["d","M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"],["type","button","aria-label","Download error events","matTooltip","Download error events",1,"tab-download-btn",3,"click"]],template:function(e,i){e&1&&(h(0,"header",0)(1,"div",1)(2,"mat-select",2),K("selectionChange",function(o){return i.selectedCell.set(o.value)}),h(3,"mat-option",3),v(4,"View All"),m(),Be(5,Xj,2,2,"mat-option",4,to),m(),h(7,"mat-select",5),K("selectionChange",function(o){return i.selectedType.set(o.value),i.selectedKey.set("all")}),h(8,"mat-option",3),v(9,"All Types"),m(),Be(10,Qj,2,2,"mat-option",4,to),m(),N(12,eU,5,1,"mat-select",6),m(),h(13,"div",7),N(14,tU,2,1,"span",8),h(15,"button",9),K("click",function(){return i.clearEvents()}),v(16," Clear "),m()()(),h(17,"mat-tab-group",10)(18,"mat-tab"),Gt(19,nU,5,1,"ng-template",11),h(20,"section",12),_e(21,"sdux-devtools-main-pipeline-panel",13),m()(),h(22,"mat-tab"),Gt(23,iU,5,1,"ng-template",11),h(24,"section",12),_e(25,"sdux-devtools-main-pipeline-panel",13),m()()()),e&2&&(y(2),fe("value",i.selectedCell()),y(3),je(i.cellNames()),y(2),fe("value",i.selectedType()),y(3),je(i.typeNames()),y(2),F(i.showKeyFilter()?12:-1),y(2),F(i.latestStateSize()?14:-1),y(7),fe("events",i.filteredEvents()),y(4),fe("events",i.errorEvents()))},dependencies:[DI,CI,Ka,kI,cC,dC,II,Sn,fn,Th],styles:['@charset "UTF-8";.pointer[_ngcontent-%COMP%]{cursor:pointer}[_nghost-%COMP%]{display:flex;flex-direction:column;flex:1;min-height:0;overflow:hidden}.header[_ngcontent-%COMP%]{display:flex;justify-content:space-between;align-items:center;margin-bottom:1rem}@media(max-width:768px){.header[_ngcontent-%COMP%]{flex-direction:column;align-items:stretch;gap:.5rem}}.header[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%]{display:flex;align-items:center;gap:.5rem}@media(max-width:1024px){.header[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%]{flex-wrap:wrap}}@media(max-width:768px){.header[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%]{flex-direction:column;align-items:stretch}}.header[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%]   .cell-filter[_ngcontent-%COMP%]{width:250px;color:#0f172a;font-weight:400;font-family:Inter,system-ui,sans-serif;background-color:#fff;border:1px solid #63a4ff;border-radius:.3125rem;padding:.25rem .5rem}.header[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%]   .subtitle[_ngcontent-%COMP%]{color:#94a3b8;font-weight:400;font-family:Inter,system-ui,sans-serif;font-size:1rem}@media(max-width:768px){.header[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%]   .subtitle[_ngcontent-%COMP%]{display:none}}.header[_ngcontent-%COMP%]   .meta[_ngcontent-%COMP%]{display:flex;align-items:center;gap:1rem}@media(max-width:768px){.header[_ngcontent-%COMP%]   .meta[_ngcontent-%COMP%]{justify-content:flex-end}}.header[_ngcontent-%COMP%]   .meta[_ngcontent-%COMP%]   .state-size[_ngcontent-%COMP%]{color:#94a3b8;font-weight:400;font-family:Inter,system-ui,sans-serif;font-size:.875rem;min-width:80px;text-align:right}.header[_ngcontent-%COMP%]   .meta[_ngcontent-%COMP%]   .event-count[_ngcontent-%COMP%]{color:#94a3b8;font-weight:400;font-family:Inter,system-ui,sans-serif;font-size:.875rem}.header[_ngcontent-%COMP%]   .meta[_ngcontent-%COMP%]   .btn-clear[_ngcontent-%COMP%]{height:40px!important;min-width:90px!important;display:flex;flex-direction:row;justify-content:center;align-items:center;color:#fff!important;background-color:transparent!important;border:1px solid #63a4ff!important;border-radius:.3125rem!important;font-size:.875rem!important;padding:.5rem;gap:.25rem;font-weight:600}.header[_ngcontent-%COMP%]   .meta[_ngcontent-%COMP%]   .btn-clear[_ngcontent-%COMP%]   .mat-icon[_ngcontent-%COMP%]{transform:scale(.75)}.header[_ngcontent-%COMP%]   .meta[_ngcontent-%COMP%]   .btn-clear[_ngcontent-%COMP%]{cursor:pointer;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.header[_ngcontent-%COMP%]   .meta[_ngcontent-%COMP%]   .btn-clear[_ngcontent-%COMP%]   .button-text[_ngcontent-%COMP%]{height:40px}.header[_ngcontent-%COMP%]   .meta[_ngcontent-%COMP%]   .btn-clear[_ngcontent-%COMP%]   .mat-icon[_ngcontent-%COMP%]{width:22px!important;height:22px!important;position:relative;padding-left:.25rem;padding-right:.25rem;gap:.25rem}.header[_ngcontent-%COMP%]   .meta[_ngcontent-%COMP%]   .btn-clear[_ngcontent-%COMP%]:focus{outline:none}.header[_ngcontent-%COMP%]   .meta[_ngcontent-%COMP%]   .btn-clear[_ngcontent-%COMP%]:hover{background-color:#ffffff14!important}.vault-tabs[_ngcontent-%COMP%]{flex:1;min-height:0;display:flex;flex-direction:column}.vault-tabs[_ngcontent-%COMP%]     .mat-mdc-tab-header{background-color:#0f172a;border-bottom:1px solid #63a4ff}.vault-tabs[_ngcontent-%COMP%]     .mat-mdc-tab-body-wrapper{flex:1;min-height:0;display:flex}.vault-tabs[_ngcontent-%COMP%]     .mat-mdc-tab-body{flex:1;min-height:0}.vault-tabs[_ngcontent-%COMP%]     .mat-mdc-tab-body .mat-mdc-tab-body-content{flex:1;min-height:0;overflow:hidden;display:flex;flex-direction:column}.vault-tab-content[_ngcontent-%COMP%]{flex:1;min-height:0;height:0;overflow:hidden;display:flex;flex-direction:column}.vault-tab-content[_ngcontent-%COMP%]   sdux-devtools-main-pipeline-panel[_ngcontent-%COMP%]{flex:1;min-height:0;height:0;overflow:hidden}@media(max-width:768px){.vault-tab-content[_ngcontent-%COMP%]{padding-right:.5rem}}.vault-tab-content[_ngcontent-%COMP%]::-webkit-scrollbar{width:8px}.vault-tab-content[_ngcontent-%COMP%]::-webkit-scrollbar-thumb{background-color:#63a4ff;border-radius:.25rem}.tab-label[_ngcontent-%COMP%]{display:flex;align-items:center;gap:.5rem}.tab-label[_ngcontent-%COMP%]   .tab-download-btn[_ngcontent-%COMP%]{display:inline-flex;align-items:center;justify-content:center;vertical-align:middle;background:none;border:none;color:#94a3b8;cursor:pointer;padding:.25rem;border-radius:.25rem;line-height:1}.tab-label[_ngcontent-%COMP%]   .tab-download-btn[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{font-size:1rem;width:1rem;height:1rem}.tab-label[_ngcontent-%COMP%]   .tab-download-btn[_ngcontent-%COMP%]:hover{color:#fff;background-color:#63a4ff}  .mat-mdc-tab-label-container{background-color:#fff;border-top-left-radius:.5rem;border-top-right-radius:.5rem}'],changeDetection:0})};var OI=[{path:"",component:wh},{path:"events",component:Mh},{path:"configuration",component:sh},{path:"**",redirectTo:""}];var RI={providers:[_g(),Qy(),s_(OI,a_()),cb({logLevel:"error"}),lb(Ut,{key:xa,initialState:[]},[ei])]};var rU=["mat-menu-item",""],oU=[[["mat-icon"],["","matMenuItemIcon",""]],"*"],sU=["mat-icon, [matMenuItemIcon]","*"];function aU(n,t){n&1&&(hi(),h(0,"svg",2),_e(1,"polygon",3),m())}var lU=["*"];function cU(n,t){if(n&1){let e=_t();gn(0,"div",0),ca("click",function(){Le(e);let r=w();return Ve(r.closed.emit("click"))})("animationstart",function(r){Le(e);let o=w();return Ve(o._onAnimationStart(r.animationName))})("animationend",function(r){Le(e);let o=w();return Ve(o._onAnimationDone(r.animationName))})("animationcancel",function(r){Le(e);let o=w();return Ve(o._onAnimationDone(r.animationName))}),gn(1,"div",1),ke(2),Zn()()}if(n&2){let e=w();Rn(e._classList),ce("mat-menu-panel-animations-disabled",e._animationsDisabled)("mat-menu-panel-exit-animation",e._panelAnimationState==="void")("mat-menu-panel-animating",e._isAnimating()),no("id",e.panelId),Fe("aria-label",e.ariaLabel||null)("aria-labelledby",e.ariaLabelledby||null)("aria-describedby",e.ariaDescribedby||null)}}var fC=new C("MAT_MENU_PANEL"),ud=(()=>{class n{_elementRef=f(Q);_document=f(he);_focusMonitor=f(po);_parentMenu=f(fC,{optional:!0});_changeDetectorRef=f(tt);role="menuitem";disabled=!1;disableRipple=!1;_hovered=new E;_focused=new E;_highlighted=!1;_triggersSubmenu=!1;constructor(){f(wn).load(qa),this._parentMenu?.addItem?.(this)}focus(e,i){this._focusMonitor&&e?this._focusMonitor.focusVia(this._getHostElement(),e,i):this._getHostElement().focus(i),this._focused.next(this)}ngAfterViewInit(){this._focusMonitor&&this._focusMonitor.monitor(this._elementRef,!1)}ngOnDestroy(){this._focusMonitor&&this._focusMonitor.stopMonitoring(this._elementRef),this._parentMenu&&this._parentMenu.removeItem&&this._parentMenu.removeItem(this),this._hovered.complete(),this._focused.complete()}_getTabIndex(){return this.disabled?"-1":"0"}_getHostElement(){return this._elementRef.nativeElement}_checkDisabled(e){this.disabled&&(e.preventDefault(),e.stopPropagation())}_handleMouseEnter(){this._hovered.next(this)}getLabel(){let e=this._elementRef.nativeElement.cloneNode(!0),i=e.querySelectorAll("mat-icon, .material-icons");for(let r=0;r<i.length;r++)i[r].remove();return e.textContent?.trim()||""}_setHighlighted(e){this._highlighted=e,this._changeDetectorRef.markForCheck()}_setTriggersSubmenu(e){this._triggersSubmenu=e,this._changeDetectorRef.markForCheck()}_hasFocus(){return this._document&&this._document.activeElement===this._getHostElement()}static \u0275fac=function(i){return new(i||n)};static \u0275cmp=G({type:n,selectors:[["","mat-menu-item",""]],hostAttrs:[1,"mat-mdc-menu-item","mat-focus-indicator"],hostVars:8,hostBindings:function(i,r){i&1&&K("click",function(s){return r._checkDisabled(s)})("mouseenter",function(){return r._handleMouseEnter()}),i&2&&(Fe("role",r.role)("tabindex",r._getTabIndex())("aria-disabled",r.disabled)("disabled",r.disabled||null),ce("mat-mdc-menu-item-highlighted",r._highlighted)("mat-mdc-menu-item-submenu-trigger",r._triggersSubmenu))},inputs:{role:"role",disabled:[2,"disabled","disabled",de],disableRipple:[2,"disableRipple","disableRipple",de]},exportAs:["matMenuItem"],attrs:rU,ngContentSelectors:sU,decls:5,vars:3,consts:[[1,"mat-mdc-menu-item-text"],["matRipple","",1,"mat-mdc-menu-ripple",3,"matRippleDisabled","matRippleTrigger"],["viewBox","0 0 5 10","focusable","false","aria-hidden","true",1,"mat-mdc-menu-submenu-icon"],["points","0,0 5,5 0,10"]],template:function(i,r){i&1&&(ht(oU),ke(0),h(1,"span",0),ke(2,1),m(),_e(3,"div",1),N(4,aU,2,0,":svg:svg",2)),i&2&&(y(3),fe("matRippleDisabled",r.disableRipple||r.disabled)("matRippleTrigger",r._getHostElement()),y(),F(r._triggersSubmenu?4:-1))},dependencies:[Ss],encapsulation:2,changeDetection:0})}return n})();var dU=new C("MatMenuContent");var uU=new C("mat-menu-default-options",{providedIn:"root",factory:()=>({overlapTrigger:!1,xPosition:"after",yPosition:"below",backdropClass:"cdk-overlay-transparent-backdrop"})}),uC="_mat-menu-enter",Ih="_mat-menu-exit",Za=(()=>{class n{_elementRef=f(Q);_changeDetectorRef=f(tt);_injector=f(le);_keyManager;_xPosition;_yPosition;_firstItemFocusRef;_exitFallbackTimeout;_animationsDisabled=Ot();_allItems;_directDescendantItems=new yi;_classList={};_panelAnimationState="void";_animationDone=new E;_isAnimating=P(!1);parentMenu;direction;overlayPanelClass;backdropClass;ariaLabel;ariaLabelledby;ariaDescribedby;get xPosition(){return this._xPosition}set xPosition(e){this._xPosition=e,this.setPositionClasses()}get yPosition(){return this._yPosition}set yPosition(e){this._yPosition=e,this.setPositionClasses()}templateRef;items;lazyContent;overlapTrigger=!1;hasBackdrop;set panelClass(e){let i=this._previousPanelClass,r=b({},this._classList);i&&i.length&&i.split(" ").forEach(o=>{r[o]=!1}),this._previousPanelClass=e,e&&e.length&&(e.split(" ").forEach(o=>{r[o]=!0}),this._elementRef.nativeElement.className=""),this._classList=r}_previousPanelClass;get classList(){return this.panelClass}set classList(e){this.panelClass=e}closed=new j;close=this.closed;panelId=f(Xt).getId("mat-menu-panel-");constructor(){let e=f(uU);this.overlayPanelClass=e.overlayPanelClass||"",this._xPosition=e.xPosition,this._yPosition=e.yPosition,this.backdropClass=e.backdropClass,this.overlapTrigger=e.overlapTrigger,this.hasBackdrop=e.hasBackdrop}ngOnInit(){this.setPositionClasses()}ngAfterContentInit(){this._updateDirectDescendants(),this._keyManager=new vs(this._directDescendantItems).withWrap().withTypeAhead().withHomeAndEnd(),this._keyManager.tabOut.subscribe(()=>this.closed.emit("tab")),this._directDescendantItems.changes.pipe(dt(this._directDescendantItems),ut(e=>Jt(...e.map(i=>i._focused)))).subscribe(e=>this._keyManager.updateActiveItem(e)),this._directDescendantItems.changes.subscribe(e=>{let i=this._keyManager;if(this._panelAnimationState==="enter"&&i.activeItem?._hasFocus()){let r=e.toArray(),o=Math.max(0,Math.min(r.length-1,i.activeItemIndex||0));r[o]&&!r[o].disabled?i.setActiveItem(o):i.setNextItemActive()}})}ngOnDestroy(){this._keyManager?.destroy(),this._directDescendantItems.destroy(),this.closed.complete(),this._firstItemFocusRef?.destroy(),clearTimeout(this._exitFallbackTimeout)}_hovered(){return this._directDescendantItems.changes.pipe(dt(this._directDescendantItems),ut(i=>Jt(...i.map(r=>r._hovered))))}addItem(e){}removeItem(e){}_handleKeydown(e){let i=e.keyCode,r=this._keyManager;switch(i){case 27:Zt(e)||(e.preventDefault(),this.closed.emit("keydown"));break;case 37:this.parentMenu&&this.direction==="ltr"&&this.closed.emit("keydown");break;case 39:this.parentMenu&&this.direction==="rtl"&&this.closed.emit("keydown");break;default:(i===38||i===40)&&r.setFocusOrigin("keyboard"),r.onKeydown(e);return}}focusFirstItem(e="program"){this._firstItemFocusRef?.destroy(),this._firstItemFocusRef=xt(()=>{let i=this._resolvePanel();if(!i||!i.contains(document.activeElement)){let r=this._keyManager;r.setFocusOrigin(e).setFirstItemActive(),!r.activeItem&&i&&i.focus()}},{injector:this._injector})}resetActiveItem(){this._keyManager.setActiveItem(-1)}setElevation(e){}setPositionClasses(e=this.xPosition,i=this.yPosition){this._classList=$(b({},this._classList),{"mat-menu-before":e==="before","mat-menu-after":e==="after","mat-menu-above":i==="above","mat-menu-below":i==="below"}),this._changeDetectorRef.markForCheck()}_onAnimationDone(e){let i=e===Ih;(i||e===uC)&&(i&&(clearTimeout(this._exitFallbackTimeout),this._exitFallbackTimeout=void 0),this._animationDone.next(i?"void":"enter"),this._isAnimating.set(!1))}_onAnimationStart(e){(e===uC||e===Ih)&&this._isAnimating.set(!0)}_setIsOpen(e){if(this._panelAnimationState=e?"enter":"void",e){if(this._keyManager.activeItemIndex===0){let i=this._resolvePanel();i&&(i.scrollTop=0)}}else this._animationsDisabled||(this._exitFallbackTimeout=setTimeout(()=>this._onAnimationDone(Ih),200));this._animationsDisabled&&setTimeout(()=>{this._onAnimationDone(e?uC:Ih)}),this._changeDetectorRef.markForCheck()}_updateDirectDescendants(){this._allItems.changes.pipe(dt(this._allItems)).subscribe(e=>{this._directDescendantItems.reset(e.filter(i=>i._parentMenu===this)),this._directDescendantItems.notifyOnChanges()})}_resolvePanel(){let e=null;return this._directDescendantItems.length&&(e=this._directDescendantItems.first._getHostElement().closest('[role="menu"]')),e}static \u0275fac=function(i){return new(i||n)};static \u0275cmp=G({type:n,selectors:[["mat-menu"]],contentQueries:function(i,r,o){if(i&1&&On(o,dU,5)(o,ud,5)(o,ud,4),i&2){let s;J(s=ee())&&(r.lazyContent=s.first),J(s=ee())&&(r._allItems=s),J(s=ee())&&(r.items=s)}},viewQuery:function(i,r){if(i&1&&bt(Mt,5),i&2){let o;J(o=ee())&&(r.templateRef=o.first)}},hostVars:3,hostBindings:function(i,r){i&2&&Fe("aria-label",null)("aria-labelledby",null)("aria-describedby",null)},inputs:{backdropClass:"backdropClass",ariaLabel:[0,"aria-label","ariaLabel"],ariaLabelledby:[0,"aria-labelledby","ariaLabelledby"],ariaDescribedby:[0,"aria-describedby","ariaDescribedby"],xPosition:"xPosition",yPosition:"yPosition",overlapTrigger:[2,"overlapTrigger","overlapTrigger",de],hasBackdrop:[2,"hasBackdrop","hasBackdrop",e=>e==null?null:de(e)],panelClass:[0,"class","panelClass"],classList:"classList"},outputs:{closed:"closed",close:"close"},exportAs:["matMenu"],features:[Ct([{provide:fC,useExisting:n}])],ngContentSelectors:lU,decls:1,vars:0,consts:[["tabindex","-1","role","menu",1,"mat-mdc-menu-panel",3,"click","animationstart","animationend","animationcancel","id"],[1,"mat-mdc-menu-content"]],template:function(i,r){i&1&&(ht(),la(0,cU,3,12,"ng-template"))},styles:[`mat-menu {
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
`],encapsulation:2,changeDetection:0})}return n})(),fU=new C("mat-menu-scroll-strategy",{providedIn:"root",factory:()=>{let n=f(le);return()=>Ar(n)}});var Ya=new WeakMap,pU=(()=>{class n{_canHaveBackdrop;_element=f(Q);_viewContainerRef=f(pt);_menuItemInstance=f(ud,{optional:!0,self:!0});_dir=f(jt,{optional:!0});_focusMonitor=f(po);_ngZone=f(U);_injector=f(le);_scrollStrategy=f(fU);_changeDetectorRef=f(tt);_animationsDisabled=Ot();_portal;_overlayRef=null;_menuOpen=!1;_closingActionsSubscription=Z.EMPTY;_menuCloseSubscription=Z.EMPTY;_pendingRemoval;_parentMaterialMenu;_parentInnerPadding;_openedBy=void 0;get _menu(){return this._menuInternal}set _menu(e){e!==this._menuInternal&&(this._menuInternal=e,this._menuCloseSubscription.unsubscribe(),e&&(this._parentMaterialMenu,this._menuCloseSubscription=e.close.subscribe(i=>{this._destroyMenu(i),(i==="click"||i==="tab")&&this._parentMaterialMenu&&this._parentMaterialMenu.closed.emit(i)})),this._menuItemInstance?._setTriggersSubmenu(this._triggersSubmenu()))}_menuInternal=null;constructor(e){this._canHaveBackdrop=e;let i=f(fC,{optional:!0});this._parentMaterialMenu=i instanceof Za?i:void 0}ngOnDestroy(){this._menu&&this._ownsMenu(this._menu)&&Ya.delete(this._menu),this._pendingRemoval?.unsubscribe(),this._menuCloseSubscription.unsubscribe(),this._closingActionsSubscription.unsubscribe(),this._overlayRef&&(this._overlayRef.dispose(),this._overlayRef=null)}get menuOpen(){return this._menuOpen}get dir(){return this._dir&&this._dir.value==="rtl"?"rtl":"ltr"}_triggersSubmenu(){return!!(this._menuItemInstance&&this._parentMaterialMenu&&this._menu)}_closeMenu(){this._menu?.close.emit()}_openMenu(e){if(this._triggerIsAriaDisabled())return;let i=this._menu;if(this._menuOpen||!i)return;this._pendingRemoval?.unsubscribe();let r=Ya.get(i);Ya.set(i,this),r&&r!==this&&r._closeMenu();let o=this._createOverlay(i),s=o.getConfig(),a=s.positionStrategy;this._setPosition(i,a),this._canHaveBackdrop?s.hasBackdrop=i.hasBackdrop==null?!this._triggersSubmenu():i.hasBackdrop:s.hasBackdrop=i.hasBackdrop??!1,o.hasAttached()||(o.attach(this._getPortal(i)),i.lazyContent?.attach(this.menuData)),this._closingActionsSubscription=this._menuClosingActions().subscribe(()=>this._closeMenu()),i.parentMenu=this._triggersSubmenu()?this._parentMaterialMenu:void 0,i.direction=this.dir,e&&i.focusFirstItem(this._openedBy||"program"),this._setIsMenuOpen(!0),i instanceof Za&&(i._setIsOpen(!0),i._directDescendantItems.changes.pipe(ne(i.close)).subscribe(()=>{a.withLockedPosition(!1).reapplyLastPosition(),a.withLockedPosition(!0)}))}focus(e,i){this._focusMonitor&&e?this._focusMonitor.focusVia(this._element,e,i):this._element.nativeElement.focus(i)}_destroyMenu(e){let i=this._overlayRef,r=this._menu;!i||!this.menuOpen||(this._closingActionsSubscription.unsubscribe(),this._pendingRemoval?.unsubscribe(),r instanceof Za&&this._ownsMenu(r)?(this._pendingRemoval=r._animationDone.pipe(yt(1)).subscribe(()=>{i.detach(),Ya.has(r)||r.lazyContent?.detach()}),r._setIsOpen(!1)):(i.detach(),r?.lazyContent?.detach()),r&&this._ownsMenu(r)&&Ya.delete(r),this.restoreFocus&&(e==="keydown"||!this._openedBy||!this._triggersSubmenu())&&this.focus(this._openedBy),this._openedBy=void 0,this._setIsMenuOpen(!1))}_setIsMenuOpen(e){e!==this._menuOpen&&(this._menuOpen=e,this._menuOpen?this.menuOpened.emit():this.menuClosed.emit(),this._triggersSubmenu()&&this._menuItemInstance._setHighlighted(e),this._changeDetectorRef.markForCheck())}_createOverlay(e){if(!this._overlayRef){let i=this._getOverlayConfig(e);this._subscribeToPositions(e,i.positionStrategy),this._overlayRef=Ds(this._injector,i),this._overlayRef.keydownEvents().subscribe(r=>{this._menu instanceof Za&&this._menu._handleKeydown(r)})}return this._overlayRef}_getOverlayConfig(e){return new bs({positionStrategy:Cs(this._injector,this._getOverlayOrigin()).withLockedPosition().withGrowAfterOpen().withTransformOriginOn(".mat-menu-panel, .mat-mdc-menu-panel"),backdropClass:e.backdropClass||"cdk-overlay-transparent-backdrop",panelClass:e.overlayPanelClass,scrollStrategy:this._scrollStrategy(),direction:this._dir||"ltr",disableAnimations:this._animationsDisabled})}_subscribeToPositions(e,i){e.setPositionClasses&&i.positionChanges.subscribe(r=>{this._ngZone.run(()=>{let o=r.connectionPair.overlayX==="start"?"after":"before",s=r.connectionPair.overlayY==="top"?"below":"above";e.setPositionClasses(o,s)})})}_setPosition(e,i){let[r,o]=e.xPosition==="before"?["end","start"]:["start","end"],[s,a]=e.yPosition==="above"?["bottom","top"]:["top","bottom"],[l,c]=[s,a],[d,u]=[r,o],p=0;if(this._triggersSubmenu()){if(u=r=e.xPosition==="before"?"start":"end",o=d=r==="end"?"start":"end",this._parentMaterialMenu){if(this._parentInnerPadding==null){let g=this._parentMaterialMenu.items.first;this._parentInnerPadding=g?g._getHostElement().offsetTop:0}p=s==="bottom"?this._parentInnerPadding:-this._parentInnerPadding}}else e.overlapTrigger||(l=s==="top"?"bottom":"top",c=a==="top"?"bottom":"top");i.withPositions([{originX:r,originY:l,overlayX:d,overlayY:s,offsetY:p},{originX:o,originY:l,overlayX:u,overlayY:s,offsetY:p},{originX:r,originY:c,overlayX:d,overlayY:a,offsetY:-p},{originX:o,originY:c,overlayX:u,overlayY:a,offsetY:-p}])}_menuClosingActions(){let e=this._getOutsideClickStream(this._overlayRef),i=this._overlayRef.detachments(),r=this._parentMaterialMenu?this._parentMaterialMenu.closed:A(),o=this._parentMaterialMenu?this._parentMaterialMenu._hovered().pipe(Ce(s=>this._menuOpen&&s!==this._menuItemInstance)):A();return Jt(e,r,o,i)}_getPortal(e){return(!this._portal||this._portal.templateRef!==e.templateRef)&&(this._portal=new qi(e.templateRef,this._viewContainerRef)),this._portal}_ownsMenu(e){return Ya.get(e)===this}_triggerIsAriaDisabled(){return de(this._element.nativeElement.getAttribute("aria-disabled"))}static \u0275fac=function(i){uf()};static \u0275dir=ie({type:n})}return n})(),PI=(()=>{class n extends pU{_cleanupTouchstart;_hoverSubscription=Z.EMPTY;get _deprecatedMatMenuTriggerFor(){return this.menu}set _deprecatedMatMenuTriggerFor(e){this.menu=e}get menu(){return this._menu}set menu(e){this._menu=e}menuData;restoreFocus=!0;menuOpened=new j;onMenuOpen=this.menuOpened;menuClosed=new j;onMenuClose=this.menuClosed;constructor(){super(!0);let e=f(vt);this._cleanupTouchstart=e.listen(this._element.nativeElement,"touchstart",i=>{gs(i)||(this._openedBy="touch")},{passive:!0})}triggersSubmenu(){return super._triggersSubmenu()}toggleMenu(){return this.menuOpen?this.closeMenu():this.openMenu()}openMenu(){this._openMenu(!0)}closeMenu(){this._closeMenu()}updatePosition(){this._overlayRef?.updatePosition()}ngAfterContentInit(){this._handleHover()}ngOnDestroy(){super.ngOnDestroy(),this._cleanupTouchstart(),this._hoverSubscription.unsubscribe()}_getOverlayOrigin(){return this._element}_getOutsideClickStream(e){return e.backdropClick()}_handleMousedown(e){ms(e)||(this._openedBy=e.button===0?"mouse":void 0,this.triggersSubmenu()&&e.preventDefault())}_handleKeydown(e){let i=e.keyCode;(i===13||i===32)&&(this._openedBy="keyboard"),this.triggersSubmenu()&&(i===39&&this.dir==="ltr"||i===37&&this.dir==="rtl")&&(this._openedBy="keyboard",this.openMenu())}_handleClick(e){this.triggersSubmenu()?(e.stopPropagation(),this.openMenu()):this.toggleMenu()}_handleHover(){this.triggersSubmenu()&&this._parentMaterialMenu&&(this._hoverSubscription=this._parentMaterialMenu._hovered().subscribe(e=>{e===this._menuItemInstance&&!e.disabled&&this._parentMaterialMenu?._panelAnimationState!=="void"&&(this._openedBy="mouse",this._openMenu(!1))}))}static \u0275fac=function(i){return new(i||n)};static \u0275dir=ie({type:n,selectors:[["","mat-menu-trigger-for",""],["","matMenuTriggerFor",""]],hostAttrs:[1,"mat-mdc-menu-trigger"],hostVars:3,hostBindings:function(i,r){i&1&&K("click",function(s){return r._handleClick(s)})("mousedown",function(s){return r._handleMousedown(s)})("keydown",function(s){return r._handleKeydown(s)}),i&2&&Fe("aria-haspopup",r.menu?"menu":null)("aria-expanded",r.menuOpen)("aria-controls",r.menuOpen?r.menu==null?null:r.menu.panelId:null)},inputs:{_deprecatedMatMenuTriggerFor:[0,"mat-menu-trigger-for","_deprecatedMatMenuTriggerFor"],menu:[0,"matMenuTriggerFor","menu"],menuData:[0,"matMenuTriggerData","menuData"],restoreFocus:[0,"matMenuTriggerRestoreFocus","restoreFocus"]},outputs:{menuOpened:"menuOpened",onMenuOpen:"onMenuOpen",menuClosed:"menuClosed",onMenuClose:"onMenuClose"},exportAs:["matMenuTrigger"],features:[Tt]})}return n})();var NI=(()=>{class n{static \u0275fac=function(i){return new(i||n)};static \u0275mod=De({type:n});static \u0275inj=be({imports:[Eh,Es,gt,kr]})}return n})();var kh=class n{version=f(dd);static \u0275fac=function(e){return new(e||n)};static \u0275cmp=G({type:n,selectors:[["sdux-toolbar"]],decls:18,vars:2,consts:[["toolbarMenu","matMenu"],[1,"toolbar"],[1,"toolbar-brand"],["src","/assets/brand/brand-landscape-dark.svg","alt","SDuX Vault","matTooltip","SDuX Vault DevTools",1,"toolbar-logo"],[1,"toolbar-version"],["type","button","aria-label","Open menu","matTooltip","Menu",1,"toolbar-menu-btn",3,"matMenuTriggerFor"],["xmlns","http://www.w3.org/2000/svg","viewBox","0 0 24 24","fill","currentColor","width","24","height","24",1,"menu-icon"],["cx","12","cy","5","r","2"],["cx","12","cy","12","r","2"],["cx","12","cy","19","r","2"],["mat-menu-item","","routerLink","/"],["mat-menu-item","","routerLink","/events"],["mat-menu-item","","routerLink","/configuration"]],template:function(e,i){if(e&1&&(h(0,"div",1)(1,"div",2),_e(2,"img",3),h(3,"span",4),v(4),m()(),h(5,"button",5),hi(),h(6,"svg",6),_e(7,"circle",7)(8,"circle",8)(9,"circle",9),m()(),Cu(),h(10,"mat-menu",null,0)(12,"a",10),v(13,"Home"),m(),h(14,"a",11),v(15,"Events"),m(),h(16,"a",12),v(17,"Vault Configuration"),m()()()),e&2){let r=bi(11);y(4),Ze("DevTools (v",i.version,")"),y(),fe("matMenuTriggerFor",r)}},dependencies:[NI,Za,ud,PI,Sn,fn,fp],styles:[".pointer[_ngcontent-%COMP%]{cursor:pointer}[_nghost-%COMP%]{display:block;width:100%}.toolbar[_ngcontent-%COMP%]{display:flex;justify-content:space-between;align-items:center;width:100%;margin-bottom:.5rem;padding-bottom:.5rem;border-bottom:1px solid #63a4ff}.toolbar[_ngcontent-%COMP%]   .toolbar-brand[_ngcontent-%COMP%]{display:flex;align-items:center;gap:.5rem}.toolbar[_ngcontent-%COMP%]   .toolbar-brand[_ngcontent-%COMP%]   .toolbar-logo[_ngcontent-%COMP%]{width:120px}.toolbar[_ngcontent-%COMP%]   .toolbar-brand[_ngcontent-%COMP%]   .toolbar-version[_ngcontent-%COMP%]{color:#94a3b8;font-weight:400;font-family:Inter,system-ui,sans-serif;font-size:1rem}@media(max-width:768px){.toolbar[_ngcontent-%COMP%]   .toolbar-brand[_ngcontent-%COMP%]   .toolbar-version[_ngcontent-%COMP%]{display:none}}.toolbar[_ngcontent-%COMP%]   .toolbar-menu-btn[_ngcontent-%COMP%]{background:transparent;border:none;color:inherit;display:flex;align-items:center;justify-content:center;cursor:pointer}.toolbar[_ngcontent-%COMP%]   .toolbar-menu-btn[_ngcontent-%COMP%]:hover{background-color:#ffffff14!important}.toolbar[_ngcontent-%COMP%]   .toolbar-menu-btn[_ngcontent-%COMP%]   .menu-icon[_ngcontent-%COMP%]{width:20px;height:20px}"],changeDetection:0})};var Ah=class n{static \u0275fac=function(e){return new(e||n)};static \u0275cmp=G({type:n,selectors:[["sdux-devtools-root"]],decls:5,vars:0,consts:[[1,"app-shell"],[1,"toolbar-wrapper"],[1,"router-container"]],template:function(e,i){e&1&&(h(0,"div",0)(1,"div",1),_e(2,"sdux-toolbar"),m(),h(3,"div",2),_e(4,"router-outlet"),m()())},dependencies:[Sc,kh],styles:[".pointer[_ngcontent-%COMP%]{cursor:pointer}[_nghost-%COMP%]{display:block;height:100vh;overflow:hidden}.app-shell[_ngcontent-%COMP%]{display:flex;flex-direction:column;height:100%;padding:1rem;border-radius:0 0 .3125rem .3125rem;background-color:#1f2a3a;border:1px solid #63a4ff;color:#e2e8f0;font-weight:400;font-family:Inter,system-ui,sans-serif}.toolbar-wrapper[_ngcontent-%COMP%]{width:100%;flex-shrink:0}.router-container[_ngcontent-%COMP%]{flex:1;width:100%;min-height:0;overflow:hidden;display:flex;flex-direction:column}"],changeDetection:0})};Rv(Ah,RI).catch(n=>console.error(n));
