import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IMyUser } from 'app/shared/model/my-user.model';

type EntityResponseType = HttpResponse<IMyUser>;
type EntityArrayResponseType = HttpResponse<IMyUser[]>;

@Injectable({ providedIn: 'root' })
export class MyUserService {
    public resourceUrl = SERVER_API_URL + 'api/my-users';

    constructor(protected http: HttpClient) {}

    create(myUser: IMyUser): Observable<EntityResponseType> {
        return this.http.post<IMyUser>(this.resourceUrl, myUser, { observe: 'response' });
    }

    update(myUser: IMyUser): Observable<EntityResponseType> {
        return this.http.put<IMyUser>(this.resourceUrl, myUser, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IMyUser>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IMyUser[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
