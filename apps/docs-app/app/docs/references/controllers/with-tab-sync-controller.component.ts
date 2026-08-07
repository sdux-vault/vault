/**
 * AUTO-GENERATED DOCUMENTATION COMPONENT
 * Symbol: <a href="/docs/pipeline/controllers/with-tab-sync-controller">withTabSyncController</a>
 */

import { Component, ViewEncapsulation } from '@angular/core';
import {
  BrandNameComponent,
  PackageNameComponent
} from '@sdux-vault/ui/web-components';

@Component({
  selector: 'sdux-with-tab-sync-controller',
  standalone: true,
  imports: [BrandNameComponent, PackageNameComponent],
  template: `<div class="docs-container">
    <div class="header">
      <h2>
        <a href="/docs/pipeline/controllers/with-tab-sync-controller"
          >withTabSyncController</a
        >
      </h2>
    </div>
    <header class="docs-header">
      <div class="lead">
        Controller that coordinates initial cross-tab state negotiation for Tab
        Sync.<br /><br />
        On the first pipeline attempt, this controller sends a snapshot request
        to other tabs via BroadcastChannel. If a peer responds with a snapshot
        within the negotiation timeout, the controller denies the initial
        conduct and commands the behavior to commit the cached snapshot. If no
        peer responds, the controller abstains and commands the behavior to
        proceed normally.<br /><br />
        After the first conduct, the controller abstains on all subsequent
        attempts and responds to snapshot requests from newly opened tabs.<br /><br />
      </div>
    </header>
    <section class="section">
      <div class="section-title">Installation</div>
      <div class="section-body">
        <p>
          Part of the
          <strong><sdux-package-name [package]="'core'" /></strong> project.
        </p>

        <pre
          class="code-inline"><code class="language-ts">npm install <sdux-package-name [package]="'core'" /></code></pre>
      </div>
    </section>
    <section class="section">
      <div class="section-title">Constructor</div>
      <div class="section-body">
        <table aria-label="Constructor">
          <thead>
            <tr>
              <th scope="col" class="column-300">Signature</th>
              <th scope="col" class="column-auto">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <strong>constructor</strong>
                <p>inputs:</p>
                <ul>
                  <li>key: string</li>
                  <li>
                    controllerCtx:
                    <a href="/docs/references/contexts/controller-class-context"
                      >ControllerClassContext</a
                    >
                  </li>
                </ul>
              </td>
              <td>Creates a new tab sync controller instance.<br /><br /></td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
    <section class="section">
      <div class="section-title">Methods</div>
      <div class="section-body">
        <table aria-label="Methods">
          <thead>
            <tr>
              <th scope="col" class="column-300">Method</th>
              <th scope="col" class="column-auto">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <strong>#handleSnapshotRequest</strong>
                <p class="modifiers">#private</p>

                <p>returns: void</p>
              </td>
              <td>
                Handles a snapshot request from a new tab by commanding the
                behavior to send its current snapshot.<br /><br />
              </td>
            </tr>
            <tr>
              <td>
                <strong>#onChannelMessage</strong>
                <p class="modifiers">#private</p>
                <p>inputs:</p>
                <ul>
                  <li>message: TabSyncChannelMessageShape</li>
                </ul>
                <p>returns: void</p>
              </td>
              <td>
                Handles incoming BroadcastChannel messages from other tabs&#39;
                controllers.<br /><br />
              </td>
            </tr>
            <tr>
              <td>
                <strong>#openChannel</strong>
                <p class="modifiers">#private</p>

                <p>returns: void</p>
              </td>
              <td>
                Opens the BroadcastChannel for cross-tab controller
                negotiation.<br /><br />
              </td>
            </tr>
            <tr>
              <td>
                <strong>#readPeerEntries</strong>
                <p class="modifiers">#private</p>

                <p>returns: TabSyncRegistryEntryShape[]</p>
              </td>
              <td>
                Returns all non-stale peer entries from the registry, excluding
                this tab.<br /><br />
              </td>
            </tr>
            <tr>
              <td>
                <strong>#readRegistryRaw</strong>
                <p class="modifiers">#private</p>

                <p>returns: TabSyncRegistryEntryShape[]</p>
              </td>
              <td>
                Reads the raw registry array from localStorage.<br /><br />
              </td>
            </tr>
            <tr>
              <td>
                <strong>#refreshRegistryTimestamp</strong>
                <p class="modifiers">#private</p>

                <p>returns: void</p>
              </td>
              <td>
                Updates this tab&#39;s timestamp in the registry to the current
                time.<br /><br />
              </td>
            </tr>
            <tr>
              <td>
                <strong>#registerInRegistry</strong>
                <p class="modifiers">#private</p>

                <p>returns: void</p>
              </td>
              <td>
                Writes this tab&#39;s entry into the localStorage tab registry
                and registers a beforeunload listener.<br /><br />
              </td>
            </tr>
            <tr>
              <td>
                <strong>#removeFromRegistry</strong>
                <p class="modifiers">#private</p>

                <p>returns: void</p>
              </td>
              <td>
                Removes this tab&#39;s entry from the localStorage tab registry
                and unregisters the beforeunload listener.<br /><br />
              </td>
            </tr>
            <tr>
              <td>
                <strong>#requestSnapshot</strong>
                <p class="modifiers">#private</p>

                <p>returns: void</p>
              </td>
              <td>
                Sends a snapshot request on the BroadcastChannel to all peer
                tabs.<br /><br />
              </td>
            </tr>
            <tr>
              <td>
                <strong>#sendSnapshotResponse</strong>
                <p class="modifiers">#private</p>
                <p>inputs:</p>
                <ul>
                  <li>
                    snapshot:
                    <a href="/docs/references/shapes/state-snapshot-shape"
                      >StateSnapshotShape</a
                    >
                  </li>
                </ul>
                <p>returns: void</p>
              </td>
              <td>
                Sends a snapshot response on the BroadcastChannel to peer
                tabs.<br /><br />
              </td>
            </tr>
            <tr>
              <td>
                <strong>#startHeartbeat</strong>
                <p class="modifiers">#private</p>

                <p>returns: void</p>
              </td>
              <td>
                Starts a periodic timer that refreshes this tab&#39;s timestamp
                in the registry.<br /><br />
              </td>
            </tr>
            <tr>
              <td>
                <strong>#stopHeartbeat</strong>
                <p class="modifiers">#private</p>

                <p>returns: void</p>
              </td>
              <td>Stops the heartbeat timer.<br /><br /></td>
            </tr>
            <tr>
              <td>
                <strong>#subscribeToBusNotifications</strong>
                <p class="modifiers">#private</p>

                <p>returns: void</p>
              </td>
              <td>
                Subscribes to behavior notifications on the bus to receive peer
                snapshot signals.<br /><br />
              </td>
            </tr>
            <tr>
              <td>
                <strong>#subscribeToSnapshotReady</strong>
                <p class="modifiers">#private</p>

                <p>returns: void</p>
              </td>
              <td>
                Subscribes to SnapshotReady notifications and forwards the
                snapshot to peer tabs.<br /><br />
              </td>
            </tr>
            <tr>
              <td>
                <strong>destroy</strong>

                <p>returns: void</p>
              </td>
              <td>
                Cleans up controller resources, removes the tab from the
                registry, and closes the channel.<br /><br />
              </td>
            </tr>
            <tr>
              <td>
                <strong>handleMessage</strong>

                <p>inputs:</p>
                <ul>
                  <li>
                    message:
                    <a href="/docs/references/types/controller-message-shape"
                      >ControllerMessageShape</a
                    >
                  </li>
                </ul>
                <p>
                  returns: Observable&lt;<a
                    href="/docs/references/types/controller-vote"
                    >ControllerVote</a
                  >&gt;
                </p>
              </td>
              <td>
                Handles controller admission messages and performs cross-tab
                negotiation on the first attempt.<br /><br />
              </td>
            </tr>
            <tr>
              <td>
                <strong>reset</strong>

                <p>returns: void</p>
              </td>
              <td>Resets controller negotiation state.<br /><br /></td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
    <section class="section">
      <div class="section-title">Properties</div>
      <div class="section-body">
        <table aria-label="Properties">
          <thead>
            <tr>
              <th scope="col" class="column-300">Property</th>
              <th scope="col" class="column-auto">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="column-300">
                <strong>#bus</strong>
                <p class="modifiers">readonly</p>
                <p class="type">type: unknown</p>
                <p class="default">default: TabSyncBusService()</p>
              </td>
              <td class="column-auto">
                Shared bus service used for controller-to-behavior
                communication.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>#busSubscription</strong>

                <p class="type">type: Subscription | null</p>
                <p class="default">default: null</p>
              </td>
              <td class="column-auto">
                Subscription to bus notification events.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>#channel</strong>

                <p class="type">type: BroadcastChannel | null</p>
                <p class="default">default: null</p>
              </td>
              <td class="column-auto">
                BroadcastChannel used for cross-tab controller negotiation.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>#featureCellKey</strong>
                <p class="modifiers">readonly</p>
                <p class="type">type: string</p>
              </td>
              <td class="column-auto">
                Feature cell key scoping this controller instance.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>#heartbeatTimer</strong>

                <p class="type">type: ReturnType | null</p>
                <p class="default">default: null</p>
              </td>
              <td class="column-auto">
                Interval handle for the registry heartbeat timer.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>#negotiated</strong>

                <p class="type">type: unknown</p>
                <p class="default">default: false</p>
              </td>
              <td class="column-auto">
                Whether the initial cross-tab negotiation has completed.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>#peerSnapshot$</strong>
                <p class="modifiers">readonly</p>
                <p class="type">type: unknown</p>
                <p class="default">default: new Subject&gt;()</p>
              </td>
              <td class="column-auto">
                Subject emitting peer snapshots received during negotiation.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>#registryKey</strong>
                <p class="modifiers">readonly</p>
                <p class="type">type: string</p>
              </td>
              <td class="column-auto">
                localStorage key used for the cross-tab registry.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>#settling</strong>

                <p class="type">type: unknown</p>
                <p class="default">default: false</p>
              </td>
              <td class="column-auto">
                Whether the controller is in a post-sync settling phase.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>#snapshotReadySubscription</strong>

                <p class="type">type: Subscription | null</p>
                <p class="default">default: null</p>
              </td>
              <td class="column-auto">
                Subscription to snapshot-ready notifications from the local
                behavior.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>#unloadHandler</strong>

                <p class="type">type: unknown | null</p>
                <p class="default">default: null</p>
              </td>
              <td class="column-auto">
                Cached beforeunload handler reference for cleanup on destroy.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>critical</strong>
                <p class="modifiers">static, readonly</p>
                <p class="type">type: boolean</p>
              </td>
              <td class="column-auto">
                Indicates that this controller is non-critical in the
                pipeline.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>critical</strong>
                <p class="modifiers">readonly</p>
                <p class="type">type: unknown</p>
                <p class="default">
                  default:
                  <a href="/docs/pipeline/controllers/with-tab-sync-controller"
                    >withTabSyncController</a
                  >.critical
                </p>
              </td>
              <td class="column-auto">
                Indicates whether this controller is critical for pipeline
                execution.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>key</strong>
                <p class="modifiers">readonly</p>
                <p class="type">type: string</p>
              </td>
              <td class="column-auto">
                Unique controller key for this instance.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>licenseId</strong>
                <p class="modifiers">static, readonly</p>
                <p class="type">type: string</p>
              </td>
              <td class="column-auto">
                License identifier used for license validation.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>tabId</strong>
                <p class="modifiers">readonly</p>
                <p class="type">type: string</p>
              </td>
              <td class="column-auto">
                Unique identifier for the current browser tab.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>type</strong>
                <p class="modifiers">static, readonly</p>
                <p class="type">
                  type:
                  <a href="/docs/references/types/controller-type"
                    >ControllerType</a
                  >
                </p>
              </td>
              <td class="column-auto">
                Static controller type identifier assigned by the decorator.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>type</strong>
                <p class="modifiers">readonly</p>
                <p class="type">type: unknown</p>
                <p class="default">
                  default:
                  <a href="/docs/pipeline/controllers/with-tab-sync-controller"
                    >withTabSyncController</a
                  >.type
                </p>
              </td>
              <td class="column-auto">
                Instance-level controller type identifier.<br /><br />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
    <div class="documentation">
      <p>
        The <sdux-brand-name [tm]="true" /> documentation is central in
        providing world-class support for our users.
      </p>
      <p>
        This reference API documentation is generated from @jsdoc-annotated
        source code using @compodoc, with AI-assisted comments reviewed by a
        human prior to publication.
      </p>
    </div>
  </div>`,
  styleUrl: '../../scss/documentation.scss',
  encapsulation: ViewEncapsulation.None
})
export class withTabSyncControllerComponent {}
