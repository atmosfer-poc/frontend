export namespace IApplications {
  export enum ApplicationActionType {
    CONFIRM = 'CONFIRM',
    REJECT = 'REJECT'
  }

  export enum ApplicationStatusType {
    PENDING_HR = 'PENDING_HR',
    PENDING_TECH = 'PENDING_TECH',
    PENDING_FINANCE = 'PENDING_FINANCE',
    REJECTED = 'REJECTED'
  }
}
