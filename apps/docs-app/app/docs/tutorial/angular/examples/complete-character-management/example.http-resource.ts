import { httpResource } from '@angular/common/http';
import type { HttpResourceRef } from '@angular/common/http';
import type { Injector } from '@angular/core';
import { StarWarsCharacterState } from '../../../examples/star-wars-character.state';

/** Public SWAPI endpoint that returns the complete Star Wars people collection. */
const SWAPI_PEOPLE_URL = 'https://swapi.info/api/people';

/** Minimal response fields required from each SWAPI person. */
interface SwapiPerson {
  /** Canonical full name used to match the tutorial's selected characters. */
  readonly name: string;

  /** Canonical resource URL whose final path segment supplies the character ID. */
  readonly url: string;
}

/** Tutorial metadata not supplied by SWAPI's people response. */
interface HttpResourceCharacter {
  /** Canonical SWAPI name used to locate the remote record. */
  readonly apiName: string;

  /** Given or display name used by the tutorial's character model. */
  readonly name: string;

  /** Family name evaluated by the tutorial's filter and sorting reducer. */
  readonly lastName: string;

  /** Domain-specific allegiance derived by the tutorial application. */
  readonly faction: string;

  /** Domain-specific Force classification derived by the tutorial application. */
  readonly isForceSensitive: boolean;
}

/**
 * Characters selected from the remote response for the HTTP Resource example.
 * Faction and Force sensitivity are application metadata because SWAPI does not
 * include either field in its people representation.
 */
const HTTP_RESOURCE_CHARACTERS: readonly HttpResourceCharacter[] = [
  {
    apiName: 'Han Solo',
    name: 'Han',
    lastName: 'Solo',
    faction: 'Rebel Alliance',
    isForceSensitive: false
  },
  {
    apiName: 'Yoda',
    name: 'Yoda',
    lastName: 'unknown',
    faction: 'Jedi Order',
    isForceSensitive: true
  },
  {
    apiName: 'Lando Calrissian',
    name: 'Lando',
    lastName: 'Calrissian',
    faction: 'Rebel Alliance',
    isForceSensitive: false
  }
];

/**
 * Converts the untrusted HTTP payload into the tutorial's character State.
 * The adapter retains only the selected people, derives their numeric identities
 * from canonical URLs, and rejects incomplete responses before they enter Vault.
 * @param value - Raw JSON value returned by the SWAPI people endpoint.
 * @returns Three detached characters matching `StarWarsCharacterState`.
 */
function parseStarWarsCharacters(
  value: unknown
): readonly StarWarsCharacterState[] {
  if (!Array.isArray(value)) {
    throw new Error('The SWAPI people response must be an array.');
  }

  const peopleByName = new Map<string, SwapiPerson>();

  for (const person of value) {
    if (
      typeof person === 'object' &&
      person !== null &&
      'name' in person &&
      typeof person.name === 'string' &&
      'url' in person &&
      typeof person.url === 'string'
    ) {
      peopleByName.set(person.name, { name: person.name, url: person.url });
    }
  }

  return HTTP_RESOURCE_CHARACTERS.map(({ apiName, ...metadata }) => {
    const person = peopleByName.get(apiName);
    const idMatch = person?.url.match(/\/people\/(\d+)\/?$/);
    const id = Number(idMatch?.[1]);

    if (!person || !Number.isInteger(id)) {
      throw new Error(`The SWAPI response is missing ${apiName}.`);
    }

    return { id, ...metadata };
  });
}

/**
 * Creates Angular HTTP resources for the remote-data teaching example.
 * Keeping resource construction behind this singleton separates transport and
 * response adaptation from the FeatureCell service that owns application State.
 */
class ExampleHttpResource {
  /**
   * Starts a GET request and adapts its response to the FeatureCell collection type.
   * No default value is configured: while the request is pending, the resource value
   * remains `undefined`, allowing Vault's HTTP Resource Resolve stage to represent the
   * complete loading interval before forwarding the parsed collection downstream.
   * @param injector - Angular injector used to create and manage the HTTP resource.
   * @returns A resource whose eventual value is the selected Star Wars collection.
   */
  getResource(
    injector: Injector
  ): HttpResourceRef<readonly StarWarsCharacterState[] | undefined> {
    return httpResource<readonly StarWarsCharacterState[]>(
      () => SWAPI_PEOPLE_URL,
      {
        injector,
        parse: parseStarWarsCharacters
      }
    );
  }
}

/** Shared HTTP resource factory used by the complete character-management example. */
export const exampleHttpResource = new ExampleHttpResource();
