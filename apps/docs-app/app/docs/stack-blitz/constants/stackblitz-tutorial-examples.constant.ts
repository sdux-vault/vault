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
        }
      ] satisfies StackBlitzExampleShape[]
    }
  ];

  return groups.map((group) => ({
    ...group,
    examples: [...group.examples].sort((a, b) => a.title.localeCompare(b.title))
  }));
}
