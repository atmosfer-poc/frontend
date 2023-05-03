export namespace IDomain {
  export interface DomainModel {
    domain: string;
  }

  export interface DomainsModel {
    domains: string[];
  }

  export enum DomainStatusType {
    ACTIVE = "ACTIVE",
    LOCKED = "LOCKED",
    CLOSED = "CLOSED",
  }

  export interface UpdateDomainStatusModel {
    status: DomainStatusType;
    domain: string;
  }

  export interface DnsCheck {
    status: string;
    host: string;
    type: string;
    value: string;
    info: string;
  }

  export interface DnsCheckResource {
    dnsCheck: IDomain.DnsCheck;
    mx: IDomain.DnsCheck;
    spf: IDomain.DnsCheck;
    dkim: IDomain.DnsCheck;
    mobile: IDomain.DnsCheck;
    mobile1: IDomain.DnsCheck;
  }

  export interface SearchDomainResource {
    id: number;
    partnerId: number;
    organizationId: number;
    domain: string;
    accountCount: number;
    status: string;
    notificationEmail: string;
    notificationSms: string[];
    insertTime: number;
    dnsStatus: string;
    suiteAccountId: number;
  }

  export interface CreateDomainResource {
    id?: number;
    partnerId?: number;
    organizationId?: number;
    domain?: string;
    status?: string;
    notificationEmail?: string;
    notificationSms?: string[];
    insertTime?: number;
    suiteAccountId?: number;
  }
}
