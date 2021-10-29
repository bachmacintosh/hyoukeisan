import {ResourceInterface} from "./ResourceInterface";
import {Client} from "../client";
import {WaniKaniApiSheet} from "../../sheets/WaniKaniApiSheet";

export class User implements ResourceInterface {
    _hasNewData: boolean;
    _object: string;
    _url: string;
    _data_updated_at: Date|null;
    _data: {
        username: string,
        profile_url: string,
        level: number,
        started_at: Date,
        current_vacation_started_at: Date|null,
        subscription: {
            active: boolean,
            type: string,
            max_level_granted: number,
            period_ends_at: Date|null
        },
        preferences: {
            default_voice_actor_id: number,
            lessons_autoplay_audio: boolean,
            lessons_batch_size: number,
            lessons_presentation_order: string,
            reviews_autoplay_audio: boolean,
            reviews_display_srs_indicator: boolean
        }
    };

    get hasNewData() {
        return this._hasNewData;
    }

    get object() {
        return this._object;
    }

    get url() {
        return this._url;
    }

    get data_updated_at() {
        return this._data_updated_at;
    }

    get data() {
        return this._data;
    }

    public constructor() {
        const apiSheet = new WaniKaniApiSheet;
        const wk = new Client('user', apiSheet.getUserEtag());
        wk.fetch();
        if (wk.status === 200) {
            this._hasNewData = true;
            apiSheet.setUserEtag(wk.etag);
            const body = wk.body;
            const u = Object(body);
            const sub = Object(u.data)['subscription'];
            const prefs = Object(u.data)['preferences'];

            this._object = <string>u.object;
            this._url = <string>u.url;
            this._data_updated_at = <Date|null>u.data_updated_at;
            this._data = {
                username: Object(u.data)['username'],
                profile_url: Object(u.data)['profile_url'],
                level: Object(u.data)['level'],
                started_at: new Date(Object(u.data)['started_at']),
                current_vacation_started_at: <Date|null>Object(u.data)['current_vacation_started_at'],
                subscription: {
                    active: Object(sub)['active'],
                    type: Object(sub)['type'],
                    max_level_granted: Object(sub)['max_level_granted'],
                    period_ends_at: Object(sub)['period_ends_at']
                },
                preferences: {
                    default_voice_actor_id: Object(prefs)['default_voice_actor_id'],
                    lessons_autoplay_audio: Object(prefs)['lessons_autoplay_audio'],
                    lessons_batch_size: Object(prefs)['lessons_batch_size'],
                    lessons_presentation_order: Object(prefs)['lessons_presentation_order'],
                    reviews_autoplay_audio: Object(prefs)['reviews_autoplay_audio'],
                    reviews_display_srs_indicator: Object(prefs)['reviews_display_srs_indicator']
                }
            };
        } else {
            this._hasNewData = false;
            this._object = '';
            this._url = '';
            this._data_updated_at = null;
            this._data = {
                username: '',
                profile_url: '',
                level: 0,
                started_at: new Date(),
                current_vacation_started_at: null,
                subscription: {
                    active: false,
                    type: '',
                    max_level_granted: 0,
                    period_ends_at: null
                },
                preferences: {
                    default_voice_actor_id: 0,
                    lessons_autoplay_audio: false,
                    lessons_batch_size: 0,
                    lessons_presentation_order: '',
                    reviews_autoplay_audio: false,
                    reviews_display_srs_indicator: false
                }
            };
        }
    }
}