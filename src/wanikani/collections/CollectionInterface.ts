import {ResourceInterface} from "../resources/ResourceInterface";

export interface CollectionInterface {
    hasData: boolean;
    object: string;
    url: string;
    pages: {
        per_page: number,
        next_url: string,
        previous_url: string
    };
    total_count: number;
    data_updated_at: Date|null;
    data: ResourceInterface[];
}