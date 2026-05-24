// @Component({
//   selector: 'sdux-builder-docs-outlet',
//   standalone: true,
//   template: ` <ng-container #host /> `
// })
// export class BuilderDocsOutletComponent {
//   @ViewChild('host', { read: ViewContainerRef })
//   private host!: ViewContainerRef;

//   render(definition: BehaviorDefinition) {
//     this.host.clear();

//     if (!definition.docComponent) return;

//     const ref = this.host.createComponent(definition.docComponent);

//     // Optional: pass context
//     if ('type' in ref.instance) {
//       ref.instance.type = definition.id.includes('push') ? 'push' : 'default';
//     }
//   }
// }
