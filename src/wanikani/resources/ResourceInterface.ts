export interface ResourceInterface {
    hasNewData: boolean;
    object: string;
    url: string;
    data_updated_at: Date|null;
}