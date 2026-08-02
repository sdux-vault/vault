import type { StackBlitzExampleShape } from '../shapes/stackblitz-example.shape';

/** StackBlitz tutorial example group definitions. */
export function createTutorialExampleGroups() {
  const groups = [
    {
      heading: 'Tutorial',
      tutorialOnly: true,
      id: 'tutorial',
      description:
        'Tutorial examples — explore finished tutorial implementations and launch them directly in StackBlitz.',
      examples: [
        {
          title: 'Chapter 1: Display Character',
          id: 'display-character',
          exampleName: 'display-character-example',
          displayCopyIcon: false,
          description: `Demonstrates the completed <strong>Display Character</strong> tutorial example — a standalone component reads one selected record from FeatureCell state through a service boundary. Launch the live example directly in StackBlitz.`,
          languages: [{ name: 'Angular', key: 'angular' }]
        },
        {
          title: 'Chapter 2: Display Characters',
          id: 'display-characters',
          exampleName: 'display-characters-example',
          displayCopyIcon: false,
          description: `Demonstrates the completed <strong>Display Characters</strong> tutorial example — a standalone component reads a character collection from FeatureCell state, lets the user choose a record from a dropdown, and renders the selected details through a service boundary. Launch the live example directly in StackBlitz.`,
          languages: [{ name: 'Angular', key: 'angular' }]
        },
        {
          title: 'Chapter 3: Add/Edit Characters',
          id: 'add-edit-characters',
          exampleName: 'add-edit-characters-example',
          displayCopyIcon: false,
          description: `Demonstrates the completed <strong>Add/Edit Characters</strong> tutorial example — a standalone component reads a character collection from FeatureCell state, lets the user select a record, add a new character, and update an existing one through a service-owned SDuX boundary. Launch the live example directly in StackBlitz.`,
          languages: [{ name: 'Angular', key: 'angular' }]
        },
        {
          title: 'Chapter 4: Delete Characters',
          id: 'delete-characters',
          exampleName: 'delete-characters-example',
          displayCopyIcon: false,
          description: `Demonstrates the completed <strong>Delete Characters</strong> tutorial example — a standalone component reads a character collection from FeatureCell state, lets the user stage and confirm deletion of a selected record, and keeps the actual state update inside the same service-owned SDuX boundary used throughout the earlier tutorial flows. Launch the live example directly in StackBlitz.`,
          languages: [{ name: 'Angular', key: 'angular' }]
        },
        {
          title: 'Chapter 5: Lifecycle',
          id: 'lifecycle-tutorial',
          exampleName: 'lifecycle-tutorial-example',
          displayCopyIcon: false,
          description: `Demonstrates the completed <strong>Lifecycle</strong> tutorial example — a standalone component keeps the same service-owned character collection, shows the difference between persisting <strong>null</strong> and calling <strong>reset()</strong>, and then finalizes the FeatureCell with <strong>destroy()</strong> without moving lifecycle control into the template. Launch the live example directly in StackBlitz.`,
          languages: [{ name: 'Angular', key: 'angular' }]
        },
        {
          title: 'Chapter 6: Filters and Reducers',
          id: 'filters-and-reducers-tutorial',
          exampleName: 'filters-and-reducers-tutorial-example',
          displayCopyIcon: false,
          description: `Demonstrates the completed <strong>Filters and Reducers</strong> tutorial example — a standalone component keeps the same service-owned character collection, refines candidate State with a Filter after Resolve, then applies three Reducers to derive force-sensitive display labels, sort the collection by last name, and build full-name display values before the template renders them. Launch the live example directly in StackBlitz.`,
          languages: [{ name: 'Angular', key: 'angular' }]
        },
        {
          title: 'Chapter 7: Errors',
          id: 'errors-tutorial',
          exampleName: 'errors-tutorial-example',
          displayCopyIcon: false,
          description: `Demonstrates the completed <strong>Errors</strong> tutorial example — a standalone component keeps the same service-owned character collection, arms an intentional Filter-stage failure, observes the singleton global Vault error service, and displays the finalized <strong>errors()</strong> emission without moving error ownership into the template. Launch the live example directly in StackBlitz.`,
          languages: [{ name: 'Angular', key: 'angular' }]
        },
        {
          title: 'Chapter 8: Async Input',
          id: 'async-input-tutorial',
          exampleName: 'async-input-tutorial-example',
          displayCopyIcon: false,
          description: `Demonstrates the completed <strong>Async Input</strong> tutorial example — a standalone component keeps the same service-owned character collection, hydrates initial State, and resolves Promise, Observable, and Angular HTTP Resource inputs through the service-owned FeatureCell pipeline while the template reflects loading and error State. Launch the live example directly in StackBlitz.`,
          languages: [{ name: 'Angular', key: 'angular' }]
        },
        {
          title: 'Chapter 9: Delay Controller',
          id: 'delay-tutorial',
          exampleName: 'delay-tutorial-example',
          displayCopyIcon: false,
          description: `Demonstrates the completed <strong>Delay Controller</strong> tutorial example — a standalone component keeps the same service-owned character collection, configures a fixed execution pause, and makes the elapsed interval visible while every pipeline attempt continues unchanged after the delay. Launch the live example directly in StackBlitz.`,
          languages: [{ name: 'Angular', key: 'angular' }]
        },
        {
          title: 'Chapter 10: Encrypt and Persist',
          id: 'encrypt-and-persist-tutorial',
          exampleName: 'encrypt-and-persist-tutorial-example',
          displayCopyIcon: false,
          description: `Demonstrates the completed <strong>Encrypt and Persist</strong> tutorial example — a standalone component encrypts finalized FeatureCell state with AES-256-GCM, persists the encrypted envelope in tab-scoped session storage, and observes simulated Filter-stage failures through both the global error service and the fluent API <strong>errors()</strong> callback. Launch the live example directly in StackBlitz.`,
          languages: [{ name: 'Angular', key: 'angular' }]
        },
        {
          title: 'Chapter 11: State Introspection',
          id: 'state-introspection-tutorial',
          exampleName: 'state-introspection-tutorial-example',
          displayCopyIcon: false,
          description: `Demonstrates the completed <strong>State Introspection</strong> tutorial example — a standalone component exposes raw StateSnapshot and StateSnapshot$ values, observes Before Taps and After Taps, renders finalized State Emission, and captures an Initial State baseline through a service-owned FeatureCell boundary. Launch the live example directly in StackBlitz.`,
          languages: [{ name: 'Angular', key: 'angular' }]
        }
      ] satisfies StackBlitzExampleShape[]
    }
  ];

  return groups.map((group) => ({
    ...group,
    examples: [...group.examples].sort((a, b) => a.title.localeCompare(b.title))
  }));
}
