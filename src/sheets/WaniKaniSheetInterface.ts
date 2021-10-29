import {ResourceInterface} from "../wanikani/resources/ResourceInterface";
import {BaseSheetInterface} from "./BaseSheetInterface";

export interface WaniKaniSheetInterface extends BaseSheetInterface {
    update(resource: ResourceInterface): void;
}