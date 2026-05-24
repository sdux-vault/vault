export interface SignUpRegisteredShape {
  /**
   * organizationName
   *
   * @description Name of the organization being created
   */
  organizationName: string;

  organizationUuid: string;

  token: string;

  active: boolean;
}
