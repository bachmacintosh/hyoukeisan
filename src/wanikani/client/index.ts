import {ClientInterface} from "./ClientInterface";
import {WaniKaniApiSheet} from "../../sheets/WaniKaniApiSheet";

export class Client implements ClientInterface {
    _baseUrl: string;
    _version: string;
    _allowedUris: string[];
    _endpoint: string;
    _etag: string;
    _body: Record<string, unknown>;
    _status: number;

    public constructor(endpoint: string, etag: string) {
        this._baseUrl = 'https://api.wanikani.com/v2/';
        this._version = '20170710';
        this._allowedUris = [
            'assignments',
            'level_progressions',
            'resets',
            'reviews',
            'review_statistics',
            'spaced_repetition_systems',
            'study_materials',
            'subjects',
            'summary',
            'user',
            'voice_actors'
        ];
        if(this._allowedUris.includes(endpoint)) {
            this._endpoint = endpoint;
        } else {
            throw new Error('WaniKani Client -- Invalid Endpoint');
        }
        this._etag = etag;
        this._body = {};
        this._status = 0;
    }

    public fetch() {
        const response = this.get();
        const headers = response.getHeaders();
        if (response.getResponseCode() === 200) {
            this._etag = Object(headers)['ETag'];
            this._body = JSON.parse(response.getContentText());
            this._status = response.getResponseCode();
        } else {
            this._body = {'error': 'Error ' + response.getResponseCode()};
            this._status = response.getResponseCode();
        }
    }

    private get() {
        const path = this._baseUrl + this._endpoint;
        const apiSheet = new WaniKaniApiSheet;
        let headers: Record<string, string>;
        if (this._etag === '') {
            headers = {
                'Authorization': 'Bearer ' + apiSheet.getAccessToken(),
                'Wanikani-Revision': this._version
            };
        } else {
            headers = {
                'Authorization': 'Bearer ' + apiSheet.getAccessToken(),
                'Wanikani-Revision': this._version,
                'If-None-Match': this._etag
            };
        }
        const options = {
            'headers': headers,
            'muteHttpExceptions': true
        };
        return UrlFetchApp.fetch(path, options);
    }

    get baseUrl() {
        return this._baseUrl;
    }

    get version() {
        return this._version;
    }

    get allowedUris() {
        return this._allowedUris;
    }

    get endpoint() {
        return this._endpoint;
    }

    set endpoint(endpoint: string) {
        if(this._allowedUris.includes(endpoint)) {
            this._endpoint = endpoint;
        } else {
            throw new Error('WaniKani Client -- Invalid Endpoint');
        }
    }

    get etag() {
        return this._etag;
    }

    set etag(etag: string) {
        this._etag = etag;
    }

    get body() {
        return this._body;
    }

    get status() {
        return this._status;
    }
}