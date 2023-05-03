import {Endpoints} from "@api/endpoints";
import {IDomain} from "@common/interfaces/domain";

export namespace YaniiMailClient {

    export const getDomainList = async () => {
        const response = await fetch(Endpoints.GET_DOMAIN_LIST, {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
            }),
        });
        return await response.json();
    };

    export const createDomain = async (data: IDomain.DomainModel) => {
        const response = await fetch(Endpoints.CREATE_DOMAIN, {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json',
            }),
            body: JSON.stringify(data)
        });
        return await response.json();
    }

    export const updateDomainStatus = async (data: IDomain.UpdateDomainStatusModel) => {
        const response = await fetch(Endpoints.UPDATE_DOMAIN, {
            method: 'PUT',
            headers: new Headers({
                'Content-Type': 'application/json',
            }),
            body: JSON.stringify(data)
        });
        try {
            return await response.json();
        } catch {
            return response;
        }
    }

    export const dnsCheck = async (data: IDomain.DomainModel) => {
        const response = await fetch(Endpoints.DNS_CHECK, {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json',
            }),
            body: JSON.stringify(data)
        });
        return await response.json();
    }

    export const dnsCheckAll = async (data: IDomain.DomainsModel) => {
        const response = await fetch(Endpoints.DNS_CHECK_ALL, {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json',
            }),
            body: JSON.stringify(data)
        });
        return await response.json();
    }

    export const deleteDomain = async (domain: string) => {
        const response = await fetch(Endpoints.GET_DOMAIN_LIST + "/" + domain, {
            method: 'DELETE',
            headers: new Headers({
                'Content-Type': 'application/json',
            }),
        });

        try {
            return await response.json();
        } catch {
            return response;
        }
    }
}
